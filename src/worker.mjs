import { Session, newInvite, MAX_SESSION_MS } from './core.mjs';

let session = null;
let used = false;
let pending = 0;
let pendingBytes = 0;
let queue = Promise.resolve();
let lifetime = null;
const safeErrors = new Set(['INVALID_INVITE', 'INVALID_ROLE', 'HANDSHAKE_ORDER', 'KEY_CHANGE_BLOCKED', 'CONTEXT_MISMATCH', 'SESSION_BINDING_FAILED', 'REPLAY_OR_ORDER', 'NOT_VERIFIED', 'AUTHENTICATION_FAILED', 'COMPARISON_ORDER', 'FINGERPRINT_MISMATCH', 'SESSION_EXPIRED', 'SESSION_CLOSED', 'MESSAGE_TOO_LARGE', 'EMPTY_MESSAGE', 'RECORD_LIMIT']);
const post = (id, data) => self.postMessage({ id, ...data });

self.onmessage = ({ data }) => {
  const size = new TextEncoder().encode(JSON.stringify(data)).length;
  if (++pending > 16 || (pendingBytes += size) > 65536) {
    session?.abort(); post(data?.id, { error: 'QUEUE_LIMIT', fatal: true }); self.close(); return;
  }
  queue = queue.then(async () => {
    const { id, op } = data;
    try {
      if (op === 'init') {
        if (used) throw new Error('SESSION_CLOSED');
        used = true;
        const secret = data.role === 'i' ? await newInvite() : data.secret;
        session = await Session.create(secret, data.role);
        lifetime = setTimeout(() => { session.abort(); post(null, { error: 'SESSION_EXPIRED', fatal: true }); self.close(); }, MAX_SESSION_MS);
        post(id, { ...session.drain(), invite: data.role === 'i' ? secret : undefined });
      } else {
        if (!session) throw new Error('SESSION_CLOSED');
        let result;
        if (op === 'start') result = session.start();
        else if (op === 'receive') result = await session.receive(data.frame);
        else if (op === 'compare') result = session.compare(data.fingerprint);
        else if (op === 'send') result = session.send(data.text);
        else if (op === 'close') result = session.close();
        else throw new Error('INVALID_FRAME');
        post(id, result);
        if (['CLOSED', 'FAILED'].includes(result.snapshot.state)) { clearTimeout(lifetime); self.close(); }
      }
    } catch (error) {
      const recoverable = ['EMPTY_MESSAGE', 'MESSAGE_TOO_LARGE', 'NOT_VERIFIED'].includes(error.message);
      if (!recoverable) { session?.abort(); clearTimeout(lifetime); }
      post(id, { error: safeErrors.has(error.message) ? error.message : 'AUTHENTICATION_FAILED', fatal: !recoverable });
      if (!recoverable) self.close();
    } finally { pending--; pendingBytes -= size; }
  });
};
