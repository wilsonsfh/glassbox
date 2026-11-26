import { DurableObject } from 'cloudflare:workers';
const TTL = 15 * 60_000;
const MAX_FRAME = 8192;
export class GlassboxRelay extends DurableObject {
  constructor(ctx, env) { super(ctx, env); this.rooms = new Map(); this.upgrades = new Map(); }
  send(socket, frame) {
    if (!socket || socket.readyState !== 1) return false;
    try { socket.send(JSON.stringify(frame)); return true; } catch { return false; }
  }
  end(id, code = 1000, reason = 'Peer disconnected') {
    const room = this.rooms.get(id);
    if (!room) return;
    this.rooms.delete(id); clearTimeout(room.expiry);
    for (const socket of Object.values(room.peers)) {
      this.send(socket, { t: 'ended', reason: reason === 'Session expired' ? 'EXPIRED' : 'DISCONNECTED' });
      socket.close(code, reason);
    }
  }
  async fetch(request) {
    const url = new URL(request.url);
    if (request.headers.get('Origin') !== url.origin) return new Response('Forbidden', { status: 403 });
    if (request.headers.get('Upgrade')?.toLowerCase() !== 'websocket') return new Response('WebSocket required', { status: 426 });
    const ip = request.headers.get('CF-Connecting-IP') || 'local';
    const now = Date.now();
    for (const [key, value] of this.upgrades) if (now - value.start > 60000) this.upgrades.delete(key);
    let bucket = this.upgrades.get(ip);
    if (!bucket) {
      if (this.upgrades.size >= 128) return new Response('Busy', { status: 429 });
      bucket = { start: now, count: 0 }; this.upgrades.set(ip, bucket);
    }
    if (++bucket.count > 60) return new Response('Rate limit', { status: 429 });
    const match = /^\/relay\/([0-9a-f]{32})$/.exec(url.pathname);
    const role = url.searchParams.get('role');
    if (!match || !['i', 'r'].includes(role) || [...url.searchParams].length !== 1) return new Response('Bad request', { status: 400 });
    const id = match[1];
    let room = this.rooms.get(id);
    if (room && (room.peers[role] || room.paired)) return new Response('Room already paired', { status: 409 });
    if (!room && role !== 'i') return new Response('Room not found', { status: 404 });
    if (!room && this.rooms.size >= 32) return new Response('Relay full', { status: 503 });
    if (!room) {
      room = { born: now, peers: {}, paired: false };
      room.expiry = setTimeout(() => this.end(id, 1000, 'Session expired'), TTL);
      this.rooms.set(id, room);
    }
    const [client, peer] = Object.values(new WebSocketPair()); peer.accept(); room.peers[role] = peer;
    let windowAt = now, count = 0, bytes = 0;
    peer.addEventListener('close', () => this.end(id));
    peer.addEventListener('error', () => this.end(id, 1008, 'Connection failed'));
    peer.addEventListener('message', event => {
      if (!this.rooms.has(id)) return;
      if (Date.now() - windowAt >= 1000) { windowAt = Date.now(); count = 0; bytes = 0; }
      const size = typeof event.data === 'string' ? new TextEncoder().encode(event.data).length : Infinity;
      if (size > MAX_FRAME || ++count > 40 || (bytes += size) > 65536) return this.end(id, 1008, 'Frame limit');
      let frame;
      try { frame = JSON.parse(event.data); } catch { return this.end(id, 1008, 'Invalid frame'); }
      if (!room.paired || !frame || frame.v !== 1 || frame.r !== id || frame.from !== role || !['noise', 'headers', 'record'].includes(frame.t)) return this.end(id, 1008, 'Invalid frame');
      if (!this.send(room.peers[role === 'i' ? 'r' : 'i'], frame)) this.end(id, 1008, 'Peer unavailable');
    });
    this.send(peer, { t: 'admitted', role, expiresIn: Math.max(0, TTL - (now - room.born)) });
    if (room.peers.i && room.peers.r) {
      room.paired = true; this.send(room.peers.i, { t: 'paired' }); this.send(room.peers.r, { t: 'paired' });
    }
    return new Response(null, { status: 101, webSocket: client });
  }
}
export default {
  fetch(request, env) {
    if (new URL(request.url).pathname.startsWith('/relay/')) return env.RELAY.getByName('relay').fetch(request);
    return env.ASSETS.fetch(request);
  }
};
