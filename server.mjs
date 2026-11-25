import http from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import wsPackage from './dist/vendor/ws.cjs';

const { WebSocketServer, WebSocket } = wsPackage;
const here = fileURLToPath(new URL('.', import.meta.url));
const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const port = Number(portIndex < 0 ? 4816 : args[portIndex + 1]);
if (!Number.isInteger(port) || port < 1024 || port > 65535 || args.some((x, i) => x !== '--port' && i !== portIndex + 1)) {
  console.error('Usage: node server.mjs [--port 4816]'); process.exit(1);
}
const hosts = new Set([`127.0.0.1:${port}`, `localhost:${port}`, `[::1]:${port}`]);
const assets = new Map();
for (const [url, file, type] of [
  ['/', 'dist/index.html', 'text/html; charset=utf-8'],
  ['/app.js', 'dist/app.js', 'text/javascript; charset=utf-8'],
  ['/style.css', 'dist/style.css', 'text/css; charset=utf-8'],
  ['/vendor/session-worker.js', 'dist/vendor/session-worker.js', 'text/javascript; charset=utf-8'],
  ['/favicon.svg', 'dist/favicon.svg', 'image/svg+xml']
]) assets.set(url, { data: readFileSync(here + file), type });
const appHash = createHash('sha256').update(assets.get('/app.js').data).digest('base64');
const cssHash = createHash('sha256').update(assets.get('/style.css').data).digest('base64');
const rooms = new Map();
const ipBuckets = new Map();
const MAX_FRAME = 8192;
const TTL = 15 * 60_000;
const MAX_BUFFER = 65536;

function rate(ip, key, max, window = 60_000) {
  const now = Date.now();
  let buckets = ipBuckets.get(ip);
  if (!buckets) { if (ipBuckets.size >= 128) return false; buckets = {}; ipBuckets.set(ip, buckets); }
  if (!buckets[key] || now - buckets[key].start > window) buckets[key] = { start: now, n: 0 };
  return ++buckets[key].n <= max;
}
function validHost(req) { return hosts.has(req.headers.host) && !req.headers['x-forwarded-host']; }
function validOrigin(req, required = false) {
  const origin = req.headers.origin;
  return (!required && !origin) || origin === `http://${req.headers.host}`;
}
// Presentation-only: the exact query `?capture=1` serves the same shell (the app hides prototype labels client-side). No other query string is accepted.
function shellUrl(req) { return req.url === '/?capture=1' ? '/' : req.url; }
function publicShellNavigation(req) {
  return shellUrl(req) === '/' && ['GET', 'HEAD'].includes(req.method)
    && req.headers['sec-fetch-mode'] === 'navigate'
    && req.headers['sec-fetch-dest'] === 'document';
}
function headers(host, worker = false) {
  return {
    'Content-Security-Policy': worker
      ? "default-src 'none'; script-src 'wasm-unsafe-eval'; connect-src 'none'; base-uri 'none'; object-src 'none'"
      : `default-src 'none'; script-src 'sha256-${appHash}'; style-src http://${host}/style.css; img-src 'self'; connect-src ws://${host}; worker-src http://${host}/vendor/session-worker.js; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'none'; require-trusted-types-for 'script'; trusted-types glassbox-worker`,
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
    'Referrer-Policy': 'no-referrer',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Cache-Control': 'no-store',
    'Pragma': 'no-cache'
  };
}
function response(res, status, text, host) {
  res.writeHead(status, { ...headers(host), 'Content-Type': 'text/plain; charset=utf-8' }); res.end(text);
}
const server = http.createServer({ maxHeaderSize: 8192, requestTimeout: 5000, headersTimeout: 5000 }, (req, res) => {
  if (!validHost(req) || !validOrigin(req) || (req.headers['sec-fetch-site'] === 'cross-site' && !publicShellNavigation(req))) return response(res, 403, 'Forbidden', req.headers.host);
  if (!rate(req.socket.remoteAddress, 'http', 600)) return response(res, 429, 'Rate limit', req.headers.host);
  if (!['GET', 'HEAD'].includes(req.method)) return response(res, 405, 'Method not allowed', req.headers.host);
  if (req.url === '/health') return response(res, 200, 'glassbox-local-ok', req.headers.host);
  const asset = assets.get(shellUrl(req));
  if (!asset) return response(res, 404, 'Not found', req.headers.host);
  res.writeHead(200, { ...headers(req.headers.host, req.url === '/vendor/session-worker.js'), 'Content-Type': asset.type, 'Content-Length': asset.data.length });
  res.end(req.method === 'HEAD' ? undefined : asset.data);
});
server.maxConnections = 96;
server.keepAliveTimeout = 5000;
const wss = new WebSocketServer({ noServer: true, maxPayload: MAX_FRAME, perMessageDeflate: false, maxFragments: 32, maxBufferedChunks: 64 });
function send(socket, data) {
  if (socket.readyState !== WebSocket.OPEN) return false;
  if (socket.bufferedAmount > MAX_BUFFER) { socket.close(1008, 'Backpressure'); return false; }
  socket.send(JSON.stringify(data)); return true;
}
function closeRoom(id, code = 1000, reason = 'Peer disconnected') {
  const room = rooms.get(id);
  if (!room) return;
  rooms.delete(id);
  for (const socket of Object.values(room.peers)) {
    send(socket, { t: 'ended', reason: reason === 'Session expired' ? 'EXPIRED' : 'DISCONNECTED' });
    socket.close(code, reason);
  }
}
function reject(socket, status) { socket.end(`HTTP/1.1 ${status}\r\nConnection: close\r\nContent-Length: 0\r\n\r\n`); }
server.on('upgrade', (req, socket, head) => {
  if (!validHost(req) || !validOrigin(req, true)) return reject(socket, '403 Forbidden');
  if (!rate(req.socket.remoteAddress, 'upgrade', 60)) return reject(socket, '429 Too Many Requests');
  let url;
  try { url = new URL(req.url, `http://${req.headers.host}`); } catch { return reject(socket, '400 Bad Request'); }
  const match = /^\/relay\/([0-9a-f]{32})$/.exec(url.pathname);
  const role = url.searchParams.get('role');
  if (!match || !['i', 'r'].includes(role) || [...url.searchParams].length !== 1) return reject(socket, '400 Bad Request');
  const id = match[1];
  let room = rooms.get(id);
  if (room && (room.peers[role] || room.paired)) return reject(socket, '409 Conflict');
  if (!room && role !== 'i') return reject(socket, '404 Not Found');
  if (!room && (rooms.size >= 32 || wss.clients.size >= 64)) return reject(socket, '503 Service Unavailable');
  if (!room) { room = { born: Date.now(), peers: {}, paired: false }; rooms.set(id, room); }
  wss.handleUpgrade(req, socket, head, peer => {
    room.peers[role] = peer;
    let windowAt = Date.now(), count = 0, bytes = 0;
    peer.on('error', () => closeRoom(id, 1008, 'Connection failed'));
    peer.on('close', () => closeRoom(id));
    peer.on('message', (raw, binary) => {
      if (!rooms.has(id)) return;
      if (Date.now() - windowAt >= 1000) { windowAt = Date.now(); count = 0; bytes = 0; }
      if (binary || raw.length > MAX_FRAME || ++count > 40 || (bytes += raw.length) > MAX_BUFFER) return closeRoom(id, 1008, 'Frame limit');
      let frame;
      try { frame = JSON.parse(raw.toString('utf8')); } catch { return closeRoom(id, 1008, 'Invalid frame'); }
      if (!room.paired || !frame || frame.v !== 1 || frame.r !== id || frame.from !== role || !['noise', 'headers', 'record'].includes(frame.t)) return closeRoom(id, 1008, 'Invalid frame');
      const other = room.peers[role === 'i' ? 'r' : 'i'];
      if (!send(other, frame)) closeRoom(id, 1008, 'Backpressure');
    });
    send(peer, { t: 'admitted', role, expiresIn: Math.max(0, TTL - (Date.now() - room.born)) });
    if (room.peers.i && room.peers.r) {
      room.paired = true;
      send(room.peers.i, { t: 'paired' }); send(room.peers.r, { t: 'paired' });
    }
  });
});
const janitor = setInterval(() => {
  const now = Date.now();
  for (const [id, room] of rooms) if (now - room.born > TTL) closeRoom(id, 1000, 'Session expired');
  for (const [ip, buckets] of ipBuckets) if (Object.values(buckets).every(b => now - b.start > 60_000)) ipBuckets.delete(ip);
}, 5000);
janitor.unref();
server.on('clientError', (_error, socket) => { if (socket.writable) reject(socket, '400 Bad Request'); });
server.listen(port, '127.0.0.1', () => console.log(`Glassbox prototype — http://127.0.0.1:${port} — local relay only`));
function stop() { clearInterval(janitor); for (const id of rooms.keys()) closeRoom(id); for (const peer of wss.clients) peer.terminate(); server.close(); }
process.on('SIGTERM', stop); process.on('SIGINT', stop);
