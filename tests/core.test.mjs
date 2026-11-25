import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { Session, Noise, sodium, dh, TestOnlyNoiseCipher, newInvite, inviteMaterial, toHex, fromHex, encode64, decode64 } from '../dist/vendor/core-test.mjs';
await sodium.ready;

const pump = async (queue) => {
  const events = [];
  for (let n = 0; queue.length; n++) {
    assert.ok(n < 30, 'bounded handshake queue');
    const [receiver, sender, frame] = queue.shift();
    const result = await receiver.receive(frame);
    events.push(...result.events);
    queue.push(...result.frames.map(f => [sender, receiver, f]));
  }
  return events;
};
async function pair(verified = true) {
  const secret = await newInvite();
  const a = await Session.create(secret, 'i'), b = await Session.create(secret, 'r');
  await pump(a.start().frames.map(f => [b, a, f]));
  assert.equal(a.snapshot.state, 'COMPARE'); assert.equal(b.snapshot.state, 'COMPARE');
  assert.equal(a.snapshot.fingerprint, b.snapshot.fingerprint);
  if (verified) {
    const af = a.compare(b.snapshot.fingerprint).frames;
    const bf = b.compare(a.snapshot.fingerprint).frames;
    await pump([...af.map(f => [b, a, f]), ...bf.map(f => [a, b, f])]);
    assert.ok(a.snapshot.canSend && b.snapshot.canSend);
  }
  return { a, b, secret };
}
const clone = value => JSON.parse(JSON.stringify(value));

test('independent Cacophony known-answer vector: both flights, payloads, full hash and directions', () => {
  const raw = readFileSync(new URL('../evidence/cacophony-source.json', import.meta.url));
  assert.equal(createHash('sha256').update(raw).digest('hex'), '3bde7c09a6f349ee11c825c50fcc02649f8f02a47c857a459206b357f9386cae');
  const vector = JSON.parse(raw).vectors.find(v => v.protocol_name === 'Noise_NNpsk0_25519_ChaChaPoly_BLAKE2b');
  const a = new Noise('NNpsk0', true, null, { psk: fromHex(vector.init_psks[0]) });
  const b = new Noise('NNpsk0', false, null, { psk: fromHex(vector.resp_psks[0]) });
  a.e = dh.generateKeyPair(fromHex(vector.init_ephemeral)); b.e = dh.generateKeyPair(fromHex(vector.resp_ephemeral));
  a.initialise(fromHex(vector.init_prologue)); b.initialise(fromHex(vector.resp_prologue));
  for (let n = 0; n < 2; n++) {
    const [sender, receiver] = n === 0 ? [a, b] : [b, a];
    const message = vector.messages[n];
    const cipher = sender.send(fromHex(message.payload));
    assert.equal(toHex(cipher), message.ciphertext);
    assert.equal(toHex(receiver.recv(cipher)), message.payload);
  }
  assert.equal(toHex(a.hash), vector.handshake_hash); assert.deepEqual(a.hash, b.hash);
  assert.deepEqual(a.tx, b.rx); assert.deepEqual(b.tx, a.rx); assert.notDeepEqual(a.tx, a.rx);
  // Transport exists ONLY in this test to verify the independently defined key direction.
  const send = [new TestOnlyNoiseCipher(a.tx), new TestOnlyNoiseCipher(b.tx)];
  const recv = [new TestOnlyNoiseCipher(b.rx), new TestOnlyNoiseCipher(a.rx)];
  for (let n = 2; n < 6; n++) {
    const msg = vector.messages[n], side = n % 2;
    const cipher = send[side].encrypt(fromHex(msg.payload));
    assert.equal(toHex(cipher), msg.ciphertext); assert.equal(toHex(recv[side].decrypt(cipher)), msg.payload);
  }
});

test('known Noise transport nonce wrap is reproduced and transport is forbidden in app source', () => {
  const a = new TestOnlyNoiseCipher(new Uint8Array(32).fill(7)), b = new TestOnlyNoiseCipher(new Uint8Array(32).fill(7));
  b.setNonce(2 ** 32);
  assert.deepEqual(a.encrypt(new TextEncoder().encode('probe')), b.encrypt(new TextEncoder().encode('probe')));
  for (const file of ['core.mjs', 'worker.mjs', 'app.mjs']) {
    const src = readFileSync(new URL(`../src/${file}`, import.meta.url), 'utf8');
    assert.doesNotMatch(src, /TestOnlyNoiseCipher|noise-handshake\/cipher|\.setNonce\(/);
  }
});

test('invite is exactly 32 random bytes, canonical base64url, independent route and PSK', async () => {
  const a = await newInvite(), b = await newInvite(); assert.notEqual(a, b);
  assert.equal(a.length, 43); assert.equal(decode64(a).length, 32);
  const one = await inviteMaterial(a), two = await inviteMaterial(a);
  assert.equal(one.room.length, 32); assert.deepEqual(one, two);
  assert.notEqual(one.room, toHex(one.psk).slice(0, 32));
  await assert.rejects(Session.create('short', 'i')); await assert.rejects(Session.create(`${a}=`, 'i'));
});

test('no pre-verification send; both full fingerprints must be compared', async () => {
  const { a, b } = await pair(false);
  assert.throws(() => a.send('must not leave'), /NOT_VERIFIED/);
  await pump(a.compare(b.snapshot.fingerprint).frames.map(f => [b, a, f]));
  assert.equal(a.snapshot.state, 'WAIT_PEER'); assert.equal(b.snapshot.state, 'COMPARE');
  assert.throws(() => a.send('still locked'), /NOT_VERIFIED/);
  await pump(b.compare(a.snapshot.fingerprint).frames.map(f => [a, b, f]));
  const frame = a.send('Hello, peer.').frames[0];
  assert.ok(!JSON.stringify(frame).includes('Hello'));
  assert.equal((await b.receive(frame)).events[0].text, 'Hello, peer.');
});

test('bidirectional unicode, text-only hostile markup and 256-byte size buckets', async () => {
  const { a, b } = await pair();
  for (const text of ['Hello', '嗨，世界。', '<img src=x onerror=alert(1)>', 'same\nline']) {
    const frame = a.send(text).frames[0];
    assert.equal((decode64(frame.c).length - sodium.crypto_secretstream_xchacha20poly1305_ABYTES) % 256, 0);
    assert.equal((await b.receive(frame)).events[0].text, text);
    assert.equal((await a.receive(b.send('reply: ' + text).frames[0])).events[0].text, 'reply: ' + text);
  }
});

test('wrong invite PSK fails even when routed into the expected room', async () => {
  const a = await Session.create(await newInvite(), 'i');
  const wrong = await inviteMaterial(await newInvite());
  const b = new Session('r', a.snapshot.room, wrong.psk);
  await assert.rejects(b.receive(a.start().frames[0]));
  assert.equal(b.snapshot.state, 'FAILED'); assert.equal(b.snapshot.canSend, false);
});

test('wrong prologue / room fails authenticated handshake', async () => {
  const secret = await newInvite(), material = await inviteMaterial(secret);
  const a = await Session.create(secret, 'i'), b = new Session('r', '0'.repeat(32), material.psk);
  const frame = a.start().frames[0]; frame.r = b.snapshot.room;
  await assert.rejects(b.receive(frame)); assert.equal(b.snapshot.state, 'FAILED');
});

test('tamper fails closed and emits no plaintext', async () => {
  const { a, b } = await pair();
  const frame = a.send('Never display me').frames[0]; const bytes = decode64(frame.c); bytes[8] ^= 1; frame.c = encode64(bytes);
  await assert.rejects(b.receive(frame), /AUTHENTICATION_FAILED/);
  assert.equal(b.snapshot.state, 'FAILED'); assert.equal(b.drain().events.length, 0);
  assert.throws(() => b.send('continue'), /SESSION_CLOSED/);
});

test('replay is rejected before a duplicate is displayed', async () => {
  const { a, b } = await pair(), frame = a.send('once').frames[0];
  assert.equal((await b.receive(frame)).events.length, 1);
  await assert.rejects(b.receive(frame), /REPLAY_OR_ORDER/); assert.equal(b.drain().events.length, 0);
});

test('reordering / dropped interior record is rejected', async () => {
  const { a, b } = await pair(); a.send('first'); const second = a.send('second').frames[0];
  await assert.rejects(b.receive(second), /REPLAY_OR_ORDER/); assert.equal(b.snapshot.state, 'FAILED');
});

test('role confusion and reflected record fail closed', async () => {
  const { a, b } = await pair();
  await assert.rejects(a.receive(a.send('reflection').frames[0]), /CONTEXT_MISMATCH/);
  const c = await Session.create(await newInvite(), 'i');
  const reflected = { v: 1, t: 'noise', r: c.snapshot.room, from: 'i', n: 1, c: 'AA' };
  await assert.rejects(c.receive(reflected), /CONTEXT_MISMATCH/); b.abort();
});

test('direction cannot be relabelled to authenticate its sender own stream', async () => {
  const { a } = await pair(); const frame = a.send('wrong direction').frames[0]; frame.from = 'r';
  await assert.rejects(a.receive(frame), /AUTHENTICATION_FAILED/);
});

test('room, session, kind and extra-field substitution are blocked', async () => {
  for (const field of ['r', 'sid', 'kind', 'unexpected']) {
    const { a, b } = await pair(); const frame = clone(a.send('bound').frames[0]);
    frame[field] = field === 'kind' ? 'control' : 'changed';
    await assert.rejects(b.receive(frame)); assert.equal(b.snapshot.canSend, false);
  }
});

test('header substitution prevents mutual key confirmation', async () => {
  const secret = await newInvite(), a = await Session.create(secret, 'i'), b = await Session.create(secret, 'r');
  const response = await b.receive(a.start().frames[0]);
  const ah = await a.receive(response.frames[0]);
  const bh = response.frames[1]; const data = decode64(bh.control); data[0] ^= 1; bh.control = encode64(data);
  const ac = await a.receive(bh);
  const bc = await b.receive(ah.frames[0]);
  await assert.rejects(a.receive(bc.frames[0]), /AUTHENTICATION_FAILED/);
  await assert.rejects(b.receive(ac.frames[0]));
  assert.equal(a.snapshot.canSend, false); assert.equal(b.snapshot.canSend, false);
});

test('partial fingerprint or mismatch aborts rather than granting a comparison badge', async () => {
  for (const value of ['abcd', '0'.repeat(64)]) {
    const { a } = await pair(false); assert.throws(() => a.compare(value), /FINGERPRINT_MISMATCH/);
    assert.equal(a.snapshot.state, 'FAILED'); assert.equal(a.snapshot.compared, false);
  }
});

test('key-change flight is blocked; reconnect gives a fresh fingerprint and resets verification', async () => {
  const { a, b, secret } = await pair(); const previous = a.snapshot.fingerprint;
  const replacement = await Session.create(secret, 'i');
  await assert.rejects(b.receive(replacement.start().frames[0]), /KEY_CHANGE_BLOCKED/);
  a.abort('CLOSED'); assert.equal(a.snapshot.compared, false);
  const nextA = await Session.create(secret, 'i'), nextB = await Session.create(secret, 'r');
  await pump(nextA.start().frames.map(f => [nextB, nextA, f]));
  assert.notEqual(nextA.snapshot.fingerprint, previous); assert.equal(nextA.snapshot.state, 'COMPARE');
  assert.throws(() => nextA.send('old comparison'), /NOT_VERIFIED/);
});

test('authenticated FINAL ends the session; no future records accepted', async () => {
  const { a, b } = await pair();
  const result = await b.receive(a.close().frames[0]);
  assert.deepEqual(result.events, [{ type: 'closed', clean: true }]); assert.equal(b.snapshot.state, 'CLOSED');
  await assert.rejects(b.receive({}), /SESSION_CLOSED/);
});

test('message bounds count UTF-8 bytes and do not consume a sequence for invalid input', async () => {
  const { a, b } = await pair();
  assert.throws(() => a.send(' '), /EMPTY_MESSAGE/); assert.throws(() => a.send('界'.repeat(1400)), /MESSAGE_TOO_LARGE/);
  assert.equal(a.snapshot.sent, 0);
  assert.equal((await b.receive(a.send('x'.repeat(4096)).frames[0])).events[0].text.length, 4096);
});

test('pinned sodium lifetime limitation is explicitly asserted', () => {
  assert.equal(typeof sodium.free, 'undefined');
  const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
  assert.equal(typeof sodium.crypto_secretstream_xchacha20poly1305_init_push(key).state, 'number');
  key.fill(0);
});
