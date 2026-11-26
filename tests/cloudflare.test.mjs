import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { setTimeout as sleep } from 'node:timers/promises';
import wsPackage from '../dist/vendor/ws.cjs';
import { Session, newInvite } from '../dist/vendor/core-test.mjs';
const { WebSocket } = wsPackage;
const origin = process.env.CLOUDFLARE_TEST_URL || 'http://127.0.0.1:5896';
const sockets = new Set();
async function until(predicate) { const end = Date.now() + 10000; while (!predicate()) { if (Date.now() > end) throw new Error('Cloudflare relay timeout'); await sleep(10); } }
class Peer {
  constructor(core) { this.core = core; this.events = []; this.wire = []; this.error = null; this.queue = Promise.resolve(); this.disconnected = false; }
  static async create(secret, role) {
    const core = await Session.create(secret, role), peer = new Peer(core);
    const socket = peer.socket = new WebSocket(`${origin.replace(/^http/, 'ws')}/relay/${core.snapshot.room}?role=${role}`, { origin });
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

test('Cloudflare relay: authenticate, compare, exchange ciphertext, clean FINAL', async () => {
  try {
    const { a, b, secret } = await connectPair();
    assert.throws(() => a.send('blocked'), /NOT_VERIFIED/);
    await unlock(a, b);
    a.send('PRIVATE CANARY from endpoint A'); b.send('PRIVATE CANARY from endpoint B');
    await until(() => a.events.some(event => event.text?.includes('endpoint B')) && b.events.some(event => event.text?.includes('endpoint A')));
    const wire = [...a.wire, ...b.wire].join('\n');
    assert.ok(!wire.includes(secret)); assert.ok(!wire.includes('PRIVATE CANARY'));
    assert.equal(a.error, null); assert.equal(b.error, null);
    a.flush(a.core.close()); await until(() => b.core.snapshot.state === 'CLOSED');
    assert.ok(b.events.some(event => event.type === 'closed' && event.clean));
  } finally { for (const socket of sockets) socket.terminate(); }
});

test('document and crypto worker receive separate CSP policies', async () => {
  const document = await fetch(origin);
  const worker = await fetch(origin + '/vendor/session-worker.js');
  assert.match(document.headers.get('content-security-policy'), /script-src 'self'/);
  assert.match(worker.headers.get('content-security-policy'), /script-src 'wasm-unsafe-eval'/);
  assert.doesNotMatch(worker.headers.get('content-security-policy'), /script-src 'self'/);
});
