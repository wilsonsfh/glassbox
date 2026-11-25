import { Noise, sodium } from './deps.mjs';

const enc = new TextEncoder();
const dec = new TextDecoder('utf-8', { fatal: true });
const VERSION = 1;
const LIMIT = 4096;
const HEX64 = /^[0-9a-f]{64}$/;
const OTHER = { i: 'r', r: 'i' };
export const MAX_FRAME_BYTES = 8192;
export const MAX_SESSION_MS = 15 * 60 * 1000;
export const SESSION_STATES = Object.freeze(['HANDSHAKE', 'CONFIRMING', 'COMPARE', 'WAIT_PEER', 'READY', 'CLOSED', 'FAILED']);

function check(ok, code = 'INVALID_FRAME') { if (!ok) throw new Error(code); }
function exact(obj, keys) {
  check(obj && typeof obj === 'object' && !Array.isArray(obj));
  check(Object.keys(obj).sort().join(',') === [...keys].sort().join(','));
}
export function toHex(bytes) { return Array.from(bytes, x => x.toString(16).padStart(2, '0')).join(''); }
export function fromHex(value) {
  check(typeof value === 'string' && /^(?:[0-9a-f]{2})+$/.test(value), 'INVALID_HEX');
  return Uint8Array.from(value.match(/../g), x => parseInt(x, 16));
}
export function encode64(bytes) { return sodium.to_base64(bytes, sodium.base64_variants.URLSAFE_NO_PADDING); }
export function decode64(value, max = MAX_FRAME_BYTES) {
  check(typeof value === 'string' && value.length <= Math.ceil(max * 4 / 3) && /^[A-Za-z0-9_-]+$/.test(value));
  const bytes = sodium.from_base64(value, sodium.base64_variants.URLSAFE_NO_PADDING);
  check(bytes.length <= max && encode64(bytes) === value);
  return bytes;
}
async function digest(bytes) { return new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)); }
async function derive(input, label, salt = new Uint8Array(32), size = 32) {
  const key = await crypto.subtle.importKey('raw', input, 'HKDF', false, ['deriveBits']);
  return new Uint8Array(await crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt, info: enc.encode(label) }, key, size * 8));
}
export async function newInvite() {
  await sodium.ready;
  return encode64(crypto.getRandomValues(new Uint8Array(32)));
}
export async function inviteMaterial(secret) {
  await sodium.ready;
  const bytes = decode64(secret, 32);
  check(bytes.length === 32, 'INVALID_INVITE');
  try {
    return { room: toHex(await derive(bytes, 'glassbox/v1/route', undefined, 16)), psk: await derive(bytes, 'glassbox/v1/handshake-psk') };
  } finally { bytes.fill(0); }
}
function wipeNoise(noise) {
  if (!noise) return;
  for (const key of ['psk', 'tx', 'rx', 'hash', 'key', 'digest', 'chainingKey']) {
    const value = noise[key];
    if (value instanceof Uint8Array) new Uint8Array(value.buffer).fill(0);
    noise[key] = null;
  }
  for (const key of ['s', 'e']) {
    if (noise[key]?.secretKey) noise[key].secretKey.fill(0);
    noise[key] = null;
  }
}
function pack(text) {
  check(typeof text === 'string' && text.trim().length > 0, 'EMPTY_MESSAGE');
  const bytes = enc.encode(text);
  check(bytes.length <= LIMIT, 'MESSAGE_TOO_LARGE');
  const result = new Uint8Array(Math.ceil((bytes.length + 4) / 256) * 256);
  new DataView(result.buffer).setUint32(0, bytes.length, false);
  result.set(bytes, 4);
  bytes.fill(0);
  return result;
}
function unpack(bytes) {
  check(bytes.length >= 256 && bytes.length <= 4352 && bytes.length % 256 === 0, 'INVALID_PADDING');
  const size = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(0, false);
  check(size > 0 && size <= LIMIT && size <= bytes.length - 4, 'INVALID_PADDING');
  check(bytes.subarray(size + 4).every(x => x === 0), 'INVALID_PADDING');
  const text = dec.decode(bytes.subarray(4, size + 4));
  check(text.trim().length > 0, 'EMPTY_MESSAGE');
  return text;
}

export class Session {
  #role; #room; #noise; #phase = 'HANDSHAKE'; #step = 0;
  #sid = null; #fingerprint = null; #tx = {}; #rx = {}; #rxKeys = {};
  #localHeaders = null; #remoteHeaders = null; #confirmed = false;
  #compared = false; #peerCompared = false; #sent = { control: 0, chat: 0 }; #received = { control: 0, chat: 0 };
  #out = []; #events = []; #born = performance.now();
  constructor(role, room, psk) {
    check(role === 'i' || role === 'r', 'INVALID_ROLE');
    this.#role = role; this.#room = room;
    this.#noise = new Noise('NNpsk0', role === 'i', null, { psk });
    this.#noise.initialise(enc.encode(JSON.stringify(['glassbox', VERSION, 'Noise_NNpsk0_25519_ChaChaPoly_BLAKE2b', room, 'i=creator', 'r=invitee'])));
  }
  static async create(secret, role) {
    const { room, psk } = await inviteMaterial(secret);
    return new Session(role, room, psk);
  }
  get snapshot() {
    return Object.freeze({ state: this.#phase, role: this.#role, room: this.#room, fingerprint: this.#fingerprint,
      compared: this.#compared, peerCompared: this.#peerCompared, canSend: this.#phase === 'READY',
      sent: this.#sent.chat, received: this.#received.chat });
  }
  #alive() {
    check(!['FAILED', 'CLOSED'].includes(this.#phase), 'SESSION_CLOSED');
    check(performance.now() - this.#born < MAX_SESSION_MS, 'SESSION_EXPIRED');
  }
  #state() {
    if (this.#confirmed) this.#phase = this.#compared ? (this.#peerCompared ? 'READY' : 'WAIT_PEER') : 'COMPARE';
  }
  #base(t) { return { v: VERSION, t, r: this.#room, from: this.#role }; }
  #emit(frame) { check(enc.encode(JSON.stringify(frame)).length <= MAX_FRAME_BYTES); this.#out.push(frame); }
  drain() { const result = { frames: this.#out, events: this.#events, snapshot: this.snapshot }; this.#out = []; this.#events = []; return result; }
  #payload() { return enc.encode(JSON.stringify({ role: this.#role, room: this.#room, nonce: encode64(crypto.getRandomValues(new Uint8Array(32))) })); }
  #validatePayload(bytes) {
    const value = JSON.parse(dec.decode(bytes));
    exact(value, ['role', 'room', 'nonce']);
    check(value.role === OTHER[this.#role] && value.room === this.#room, 'ROLE_BINDING_FAILED');
    check(decode64(value.nonce, 32).length === 32);
  }
  start() {
    try {
      this.#alive(); check(this.#role === 'i' && this.#step === 0, 'HANDSHAKE_ORDER');
      this.#emit({ ...this.#base('noise'), n: 1, c: encode64(this.#noise.send(this.#payload())) });
      this.#step = 1;
      return this.drain();
    } catch (error) { this.abort(); throw error; }
  }
  async #finishHandshake() {
    check(this.#noise.complete, 'HANDSHAKE_INCOMPLETE');
    const hash = new Uint8Array(this.#noise.hash);
    this.#fingerprint = toHex(await digest(new Uint8Array([...enc.encode('glassbox/v1/fingerprint\0'), ...hash])));
    this.#sid = this.#fingerprint;
    this.#localHeaders = {};
    for (const kind of ['control', 'chat']) {
      const direction = `${this.#role}>${OTHER[this.#role]}`;
      const reverse = `${OTHER[this.#role]}>${this.#role}`;
      const sendKey = await derive(this.#noise.tx, `glassbox/v1/${kind}/${direction}`, hash);
      this.#rxKeys[kind] = await derive(this.#noise.rx, `glassbox/v1/${kind}/${reverse}`, hash);
      const stream = sodium.crypto_secretstream_xchacha20poly1305_init_push(sendKey);
      sendKey.fill(0);
      this.#tx[kind] = stream.state;
      this.#localHeaders[kind] = encode64(stream.header);
    }
    hash.fill(0); wipeNoise(this.#noise); this.#noise = null;
    this.#phase = 'CONFIRMING';
    this.#emit({ ...this.#base('headers'), sid: this.#sid, ...this.#localHeaders });
  }
  #headerBinding() {
    return this.#role === 'i' ? { i: this.#localHeaders, r: this.#remoteHeaders } : { i: this.#remoteHeaders, r: this.#localHeaders };
  }
  #aad(kind, from, seq) {
    return enc.encode(JSON.stringify(['glassbox', VERSION, this.#room, this.#sid, from, OTHER[from], kind, seq]));
  }
  #push(kind, bytes, final = false) {
    const seq = this.#sent[kind];
    check(seq < (kind === 'chat' ? 100 : 16), 'RECORD_LIMIT');
    const tag = final ? sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL : sodium.crypto_secretstream_xchacha20poly1305_TAG_REKEY;
    const cipher = sodium.crypto_secretstream_xchacha20poly1305_push(this.#tx[kind], bytes, this.#aad(kind, this.#role, seq), tag);
    this.#emit({ ...this.#base('record'), sid: this.#sid, kind, seq, c: encode64(cipher) });
    this.#sent[kind]++;
  }
  #control(data, final = false) {
    const bytes = enc.encode(JSON.stringify(data));
    try { this.#push('control', bytes, final); } finally { bytes.fill(0); }
  }
  async receive(frame) {
    try {
      this.#alive();
      check(enc.encode(JSON.stringify(frame)).length <= MAX_FRAME_BYTES);
      check(frame?.v === VERSION && frame.r === this.#room && frame.from === OTHER[this.#role], 'CONTEXT_MISMATCH');
      if (frame.t === 'noise') {
        exact(frame, ['v', 't', 'r', 'from', 'n', 'c']);
        check(this.#phase === 'HANDSHAKE', 'KEY_CHANGE_BLOCKED');
        const expected = this.#role === 'i' ? 2 : 1;
        check(frame.n === expected && this.#step === (this.#role === 'i' ? 1 : 0), 'HANDSHAKE_ORDER');
        const payload = this.#noise.recv(decode64(frame.c, 1024));
        this.#validatePayload(payload); payload.fill(0);
        this.#step++;
        if (this.#role === 'r') this.#emit({ ...this.#base('noise'), n: 2, c: encode64(this.#noise.send(this.#payload())) });
        await this.#finishHandshake();
      } else if (frame.t === 'headers') {
        exact(frame, ['v', 't', 'r', 'from', 'sid', 'control', 'chat']);
        check(this.#phase === 'CONFIRMING' && !this.#remoteHeaders && frame.sid === this.#sid, 'KEY_CHANGE_BLOCKED');
        this.#remoteHeaders = { control: frame.control, chat: frame.chat };
        for (const kind of ['control', 'chat']) {
          const header = decode64(frame[kind], 24); check(header.length === 24);
          this.#rx[kind] = sodium.crypto_secretstream_xchacha20poly1305_init_pull(header, this.#rxKeys[kind]);
          this.#rxKeys[kind].fill(0); delete this.#rxKeys[kind];
        }
        this.#control({ op: 'confirm', headers: this.#headerBinding() });
      } else if (frame.t === 'record') {
        exact(frame, ['v', 't', 'r', 'from', 'sid', 'kind', 'seq', 'c']);
        check(this.#remoteHeaders && frame.sid === this.#sid && ['control', 'chat'].includes(frame.kind), 'SESSION_BINDING_FAILED');
        const kind = frame.kind;
        check(Number.isSafeInteger(frame.seq) && frame.seq === this.#received[kind], 'REPLAY_OR_ORDER');
        check(frame.seq < (kind === 'chat' ? 100 : 16), 'RECORD_LIMIT');
        if (kind === 'chat') check(this.#phase === 'READY', 'NOT_VERIFIED');
        const opened = sodium.crypto_secretstream_xchacha20poly1305_pull(this.#rx[kind], decode64(frame.c, 4400), this.#aad(kind, frame.from, frame.seq));
        check(opened !== false, 'AUTHENTICATION_FAILED');
        try {
          if (kind === 'chat') {
            check(opened.tag === sodium.crypto_secretstream_xchacha20poly1305_TAG_REKEY, 'INVALID_TAG');
            const text = unpack(opened.message);
            this.#received.chat++;
            this.#events.push({ type: 'message', text, sequence: frame.seq });
          } else {
            check(opened.message.length <= 1024);
            const value = JSON.parse(dec.decode(opened.message));
            if (value.op === 'confirm') {
              exact(value, ['op', 'headers']);
              check(!this.#confirmed && frame.seq === 0 && opened.tag === sodium.crypto_secretstream_xchacha20poly1305_TAG_REKEY, 'CONFIRMATION_ORDER');
              check(JSON.stringify(value.headers) === JSON.stringify(this.#headerBinding()), 'HEADER_BINDING_FAILED');
              this.#confirmed = true;
            } else if (value.op === 'compared') {
              exact(value, ['op', 'fingerprint']);
              check(this.#confirmed && !this.#peerCompared && value.fingerprint === this.#fingerprint && opened.tag === sodium.crypto_secretstream_xchacha20poly1305_TAG_REKEY, 'COMPARISON_ORDER');
              this.#peerCompared = true;
            } else if (value.op === 'close') {
              exact(value, ['op']);
              check(this.#confirmed && opened.tag === sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL, 'INVALID_FINAL');
              this.#received.control++;
              this.#events.push({ type: 'closed', clean: true });
              this.abort('CLOSED');
              return this.drain();
            } else throw new Error('INVALID_CONTROL');
            this.#received.control++;
            this.#state();
          }
        } finally { opened.message.fill(0); }
      } else throw new Error('INVALID_FRAME');
      return this.drain();
    } catch (error) { this.abort(); throw error; }
  }
  compare(peerFingerprint) {
    this.#alive();
    check(this.#phase === 'COMPARE' && this.#confirmed && !this.#compared, 'COMPARISON_ORDER');
    const value = typeof peerFingerprint === 'string' ? peerFingerprint.replace(/\s/g, '').toLowerCase() : '';
    if (!HEX64.test(value) || value !== this.#fingerprint) { this.abort(); throw new Error('FINGERPRINT_MISMATCH'); }
    this.#compared = true;
    this.#control({ op: 'compared', fingerprint: this.#fingerprint });
    this.#state();
    return this.drain();
  }
  send(text) {
    this.#alive(); check(this.#phase === 'READY', 'NOT_VERIFIED');
    const bytes = pack(text);
    try { this.#push('chat', bytes); } catch (error) { this.abort(); throw error; } finally { bytes.fill(0); }
    return this.drain();
  }
  close() {
    this.#alive();
    if (this.#confirmed) this.#control({ op: 'close' }, true);
    const frames = this.#out; this.#out = [];
    this.abort('CLOSED');
    return { frames, events: [], snapshot: this.snapshot };
  }
  abort(state = 'FAILED') {
    this.#phase = state; this.#compared = false; this.#peerCompared = false; this.#confirmed = false;
    wipeNoise(this.#noise); this.#noise = null;
    for (const key of Object.values(this.#rxKeys)) key.fill(0);
    this.#rxKeys = {}; this.#tx = {}; this.#rx = {}; this.#out = [];
    this.#localHeaders = null; this.#remoteHeaders = null; this.#fingerprint = null; this.#sid = null;
    // Secretstream states are numeric WASM addresses in 0.8.4. No public free().
    // The browser owns exactly one Session per worker and terminates that worker.
  }
}
