import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import http from 'node:http';
import { once } from 'node:events';
import { setTimeout as sleep } from 'node:timers/promises';
import wsPackage from '../dist/vendor/ws.cjs';
import { Session, newInvite } from '../dist/vendor/core-test.mjs';
const { WebSocket } = wsPackage;
const port = 5816, origin = `http://127.0.0.1:${port}`;
let server, output = '';
const sockets = new Set();

async function until(predicate, ms = 5000) {
  const deadline = Date.now() + ms;
  while (!predicate()) { if (Date.now() > deadline) throw new Error('condition timed out'); await sleep(10); }
}
before(async () => {
  server = spawn(process.execPath, ['server.mjs', '--port', String(port)], { cwd: new URL('..', import.meta.url), stdio: ['ignore', 'pipe', 'pipe'] });
  server.stdout.on('data', chunk => { output += chunk; }); server.stderr.on('data', chunk => { output += chunk; });
  await until(() => output.includes('local relay only') || server.exitCode !== null);
  assert.equal(server.exitCode, null, output);
});
after(async () => {
  for (const socket of sockets) socket.terminate();
  server.kill('SIGTERM'); await once(server, 'exit');
  assert.doesNotMatch(output, /synthetic-secret-message|#s=|PRIVATE CANARY/);
});

class Peer {
  constructor(core) { this.core = core; this.events = []; this.wire = []; this.error = null; this.queue = Promise.resolve(); this.disconnected = false; }
  static async create(secret, role) {
    const core = await Session.create(secret, role), peer = new Peer(core);
    const socket = peer.socket = new WebSocket(`ws://127.0.0.1:${port}/relay/${core.snapshot.room}?role=${role}`, { origin });
    sockets.add(socket);
    socket.on('error', error => { peer.error = error; });
    socket.on('close', () => { peer.disconnected = true; peer.core.abort('CLOSED'); });
    socket.on('message', raw => {
      const frame = JSON.parse(raw);
      peer.queue = peer.queue.then(async () => {
        if (frame.t === 'paired') { if (role === 'i') peer.flush(core.start()); }
        else if (frame.t === 'ended') { peer.disconnected = true; core.abort('CLOSED'); }
        else if (frame.t !== 'admitted') peer.flush(await core.receive(frame));
      }).catch(error => { peer.error = error; });
    });
    await once(socket, 'open'); return peer;
  }
  flush(result) { this.events.push(...result.events); for (const frame of result.frames) { this.wire.push(JSON.stringify(frame)); this.socket.send(JSON.stringify(frame)); } }
  compare(value) { this.flush(this.core.compare(value)); }
  send(text) { this.flush(this.core.send(text)); }
}
async function connectPair() {
  const secret = await newInvite();
  const a = await Peer.create(secret, 'i'), b = await Peer.create(secret, 'r');
  await until(() => a.core.snapshot.state === 'COMPARE' && b.core.snapshot.state === 'COMPARE');
  return { a, b, secret };
}
async function unlock(a, b) {
  const af = a.core.snapshot.fingerprint, bf = b.core.snapshot.fingerprint;
  assert.equal(af, bf); a.compare(bf); b.compare(af);
  await until(() => a.core.snapshot.canSend && b.core.snapshot.canSend);
}
function request(path, headers = {}, method = 'GET', base = origin) {
  return new Promise((resolve, reject) => {
    const req = http.request(`${base}${path}`, { headers, method }, res => {
      let body = ''; res.on('data', c => { body += c; }); res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    }); req.on('error', reject); req.end();
  });
}
function rejectedWebSocket(path, options) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(`ws://127.0.0.1:${port}${path}`, options);
    sockets.add(socket);
    socket.once('unexpected-response', (_req, res) => { res.resume(); socket.terminate(); resolve(res.statusCode); });
    socket.once('open', () => { socket.terminate(); reject(new Error('unexpected admission')); });
    socket.on('error', () => {});
  });
}

test('two actual network peers: authenticate, compare, exchange encrypted text, clean FINAL', async () => {
  const { a, b, secret } = await connectPair();
  assert.throws(() => a.send('blocked'), /NOT_VERIFIED/);
  await unlock(a, b);
  a.send('PRIVATE CANARY — hello from endpoint A'); b.send('PRIVATE CANARY — reply from endpoint B');
  await until(() => a.events.some(e => e.text?.includes('endpoint B')) && b.events.some(e => e.text?.includes('endpoint A')));
  const wire = [...a.wire, ...b.wire].join('\n');
  assert.ok(!wire.includes(secret)); assert.ok(!wire.includes('PRIVATE CANARY')); assert.ok(!wire.includes('endpoint A'));
  assert.equal(a.error, null); assert.equal(b.error, null);
  a.flush(a.core.close());
  await until(() => b.core.snapshot.state === 'CLOSED'); assert.ok(b.events.some(e => e.type === 'closed' && e.clean));
  a.socket.close(); b.socket.close();
});

test('third peer is rejected; disconnect resets comparison; same invite cannot reuse session keys', async () => {
  const { a, b, secret } = await connectPair(); await unlock(a, b);
  const old = a.core.snapshot.fingerprint, room = a.core.snapshot.room;
  assert.equal(await rejectedWebSocket(`/relay/${room}?role=r`, { origin }), 409);
  a.socket.close(); await until(() => b.disconnected);
  assert.equal(b.core.snapshot.compared, false); assert.throws(() => b.send('old capability'), /SESSION_CLOSED/);
  await sleep(50);
  const c = await Peer.create(secret, 'i'), d = await Peer.create(secret, 'r');
  await until(() => c.core.snapshot.state === 'COMPARE' && d.core.snapshot.state === 'COMPARE');
  assert.notEqual(c.core.snapshot.fingerprint, old); assert.equal(c.core.snapshot.canSend, false);
  c.socket.close(); d.socket.close();
});

const navigationHeaders = {
  'Sec-Fetch-Site': 'cross-site',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Dest': 'document'
};

test('localhost and 127.0.0.1 serve the shell and every public asset for GET and HEAD', async () => {
  for (const host of ['localhost', '127.0.0.1']) {
    const base = `http://${host}:${port}`;
    for (const path of ['/', '/app.js', '/style.css', '/vendor/session-worker.js', '/favicon.svg']) {
      for (const method of ['GET', 'HEAD']) {
        const result = await request(path, {}, method, base);
        assert.equal(result.status, 200, `${base}${path} ${method}`);
        assert.ok(Number(result.headers['content-length']) > 0);
        assert.equal(result.body.length === 0, method === 'HEAD');
      }
    }
  }
});

test('safe cross-site GET and HEAD document navigation reaches only the public root shell', async () => {
  for (const host of ['localhost', '127.0.0.1']) {
    const base = `http://${host}:${port}`;
    for (const method of ['GET', 'HEAD']) {
      const result = await request('/', navigationHeaders, method, base);
      assert.equal(result.status, 200, `${base}/ ${method} cross-site navigation`);
      assert.match(result.headers['content-type'], /^text\/html/);
      assert.equal(result.body.length === 0, method === 'HEAD');
      assert.equal(result.headers['access-control-allow-origin'], undefined);
      assert.equal(result.headers['cross-origin-resource-policy'], 'same-origin');
    }
  }
});

test('navigation exception does not admit cross-site fetches, embeds, assets, health or API paths', async () => {
  // (capture route regression is the next test)
  for (const method of ['GET', 'HEAD']) {
    for (const path of ['/app.js', '/style.css', '/vendor/session-worker.js', '/favicon.svg', '/health', '/api', '/relay/' + 'a'.repeat(32), '/?shell=1']) {
      assert.equal((await request(path, navigationHeaders, method)).status, 403, `${method} ${path}`);
    }
    for (const headers of [
      { 'Sec-Fetch-Site': 'cross-site' },
      { ...navigationHeaders, 'Sec-Fetch-Mode': 'cors' },
      { ...navigationHeaders, 'Sec-Fetch-Mode': 'no-cors' },
      { ...navigationHeaders, 'Sec-Fetch-Mode': 'same-origin' },
      { ...navigationHeaders, 'Sec-Fetch-Dest': 'empty' },
      { ...navigationHeaders, 'Sec-Fetch-Dest': 'iframe' },
      { ...navigationHeaders, 'Sec-Fetch-Dest': 'frame' },
      { ...navigationHeaders, 'Sec-Fetch-Dest': 'script' },
      { ...navigationHeaders, 'Sec-Fetch-Dest': 'image' },
      { 'Sec-Fetch-Site': 'cross-site', 'Sec-Fetch-Mode': 'navigate' },
      { 'Sec-Fetch-Site': 'cross-site', 'Sec-Fetch-Dest': 'document' }
    ]) assert.equal((await request('/', headers, method)).status, 403, JSON.stringify(headers));
  }
  for (const method of ['POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']) {
    assert.equal((await request('/', navigationHeaders, method)).status, 403, method);
  }
});

test('presentation-only /?capture=1 serves the same shell; no other query string is served', async () => {
  const shell = await request('/', {}, 'GET');
  for (const method of ['GET', 'HEAD']) {
    const same = await request('/?capture=1', {}, method);
    assert.equal(same.status, 200, `${method} same-origin capture`);
    assert.match(same.headers['content-type'], /^text\/html/);
    const nav = await request('/?capture=1', navigationHeaders, method);
    assert.equal(nav.status, 200, `${method} cross-site navigation capture`);
    assert.equal(nav.headers['access-control-allow-origin'], undefined);
    assert.equal((await request('/?capture=1', { 'Sec-Fetch-Site': 'cross-site' }, method)).status, 403, `${method} cross-site non-navigation capture`);
    for (const path of ['/?capture=0', '/?capture=1&x=1', '/?capture=11', '/app.js?capture=1', '/health?capture=1']) {
      assert.equal((await request(path, {}, method)).status, 404, `${method} ${path}`);
    }
  }
  assert.equal((await request('/?capture=1', {}, 'GET')).body.toString(), shell.body.toString());
  assert.equal((await request('/?capture=1', {}, 'POST')).status, 405);
});

test('safe-navigation metadata never bypasses exact Host, Origin or forwarded-host defenses', async () => {
  for (const headers of [
    { Host: 'evil.example' },
    { Host: `127.0.0.1:${port}.evil.example` },
    { Host: `localhost:${port + 1}` },
    { 'X-Forwarded-Host': 'evil.example' },
    { 'X-Forwarded-Host': `127.0.0.1:${port}` },
    { Origin: 'https://evil.example' },
    { Origin: 'null' },
    { Origin: `http://localhost:${port}` },
    { Origin: `https://127.0.0.1:${port}` }
  ]) {
    for (const metadata of [{}, navigationHeaders]) {
      assert.equal((await request('/', { ...metadata, ...headers })).status, 403, JSON.stringify(headers));
    }
  }
  assert.equal((await request('/', { ...navigationHeaders, Origin: origin })).status, 200);
});

test('WebSocket origin remains required and exactly bound to Host regardless of navigation metadata', async () => {
  const path = `/relay/${'a'.repeat(32)}?role=i`;
  for (const headers of [{}, navigationHeaders]) {
    for (const foreignOrigin of ['https://evil.example', 'null', `http://localhost:${port}`, `https://127.0.0.1:${port}`]) {
      assert.equal(await rejectedWebSocket(path, { origin: foreignOrigin, headers }), 403);
    }
    assert.equal(await rejectedWebSocket(path, { headers }), 403);
  }
  assert.equal(await rejectedWebSocket(path, { origin, headers: { ...navigationHeaders, Host: 'evil.example' } }), 403);
  assert.equal(await rejectedWebSocket(path, { origin, headers: { 'X-Forwarded-Host': 'evil.example' } }), 403);
  assert.equal(await rejectedWebSocket(path, { origin, headers: { ...navigationHeaders, 'X-Forwarded-Host': `127.0.0.1:${port}` } }), 403);
});

test('Host, Origin, fetch-site, methods, paths and non-served test internals are guarded', async () => {
  assert.equal((await request('/health')).status, 200);
  assert.equal((await request('/', { Host: 'evil.example' })).status, 403);
  assert.equal((await request('/', { Origin: 'https://evil.example' })).status, 403);
  assert.equal((await request('/', { 'Sec-Fetch-Site': 'cross-site' })).status, 403);
  assert.equal((await request('/', {}, 'POST')).status, 405);
  assert.equal((await request('/../server.mjs')).status, 404);
  assert.equal((await request('/vendor/core-test.mjs')).status, 404);
  assert.equal(await rejectedWebSocket(`/relay/${'a'.repeat(32)}?role=i`, { origin: 'https://evil.example' }), 403);
  assert.equal(await rejectedWebSocket(`/relay/${'a'.repeat(32)}?role=i`, {}), 403);
  assert.equal(await rejectedWebSocket(`/relay/${'a'.repeat(32)}?role=i`, { origin, headers: { Host: 'evil.example' } }), 403);
  assert.equal(await rejectedWebSocket(`/relay/${'a'.repeat(32)}?role=r`, { origin }), 404);
});

test('strict script CSP, SRI, opener/referrer/cache headers are emitted', async () => {
  const result = await request('/');
  assert.equal(result.status, 200);
  const csp = result.headers['content-security-policy'];
  assert.match(csp, /script-src 'sha256-/); assert.doesNotMatch(csp, /'unsafe-inline'|'unsafe-eval'/);
  assert.match(csp, /require-trusted-types-for 'script'/); assert.match(result.body, /integrity="sha256-/);
  assert.equal(result.headers['referrer-policy'], 'no-referrer'); assert.equal(result.headers['cross-origin-opener-policy'], 'same-origin');
  assert.equal(result.headers['cache-control'], 'no-store'); assert.equal(result.headers['x-content-type-options'], 'nosniff');
  const worker = await request('/vendor/session-worker.js');
  assert.match(worker.headers['content-security-policy'], /'wasm-unsafe-eval'/);
  assert.match(worker.headers['content-security-policy'], /connect-src 'none'/);
});

test('oversized frame closes the pair without allowing continuation', async () => {
  const { a, b } = await connectPair();
  a.socket.send('x'.repeat(8193)); await until(() => a.disconnected && b.disconnected);
  assert.equal(a.core.snapshot.canSend, false); assert.equal(b.core.snapshot.canSend, false);
});

test('role-spoofed frames close both sockets at the relay', async () => {
  const { a, b } = await connectPair();
  a.socket.send(JSON.stringify({ v: 1, t: 'noise', r: a.core.snapshot.room, from: 'r', n: 1, c: 'AA' }));
  await until(() => a.disconnected && b.disconnected);
});

test('per-socket rate limit closes a flood instead of retaining a queue', async () => {
  const { a, b } = await connectPair();
  const frame = JSON.stringify({ v: 1, t: 'record', r: a.core.snapshot.room, from: 'i', c: 'AA' });
  for (let n = 0; n < 45; n++) if (a.socket.readyState === WebSocket.OPEN) a.socket.send(frame);
  await until(() => a.disconnected && b.disconnected);
});
