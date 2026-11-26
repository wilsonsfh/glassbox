// Capture changes presentation only. It never alters session or comparison state.
const captureMode = new URLSearchParams(location.search).get('capture') === '1';
document.body.classList.toggle('capture-mode', captureMode);
let importedFragment = location.hash;
if (importedFragment) history.replaceState(null, '', location.pathname);
const $ = id => document.getElementById(id);
const stages = ['home', 'waiting', 'verification', 'chat', 'ended'];
let active = null;
let serial = 0;
let displayedStage = 'home';
let connectedMomentTimer;
function dismissConnectedMoment(returnFocus = true) {
  clearTimeout(connectedMomentTimer);
  const moment = $('connected-moment');
  if (moment.hidden) return;
  moment.hidden = true;
  $('connected-announcement').textContent = '';
  if (returnFocus && displayedStage === 'chat' && !$('message').disabled) $('message').focus({ preventScroll: true });
}
function showConnectedMoment() {
  if (!active || active.connectedMomentShown) return;
  active.connectedMomentShown = true;
  $('connected-moment').hidden = false;
  $('connected-announcement').textContent = 'Connected. You can see this; the relay cannot. The relay still sees metadata.';
  connectedMomentTimer = setTimeout(dismissConnectedMoment, 1500);
}
const encode = new TextEncoder();
const errors = {
  AUTHENTICATION_FAILED: 'Authentication failed. Nothing from the rejected record was displayed. Create a new invite.',
  FINGERPRINT_MISMATCH: 'The fingerprints do not match. This session is blocked. Check who you are speaking with and start fresh.',
  REPLAY_OR_ORDER: 'A repeated or out-of-order record was rejected. This session cannot continue.',
  CONTEXT_MISMATCH: 'The room or participant role did not match. This session is blocked.',
  KEY_CHANGE_BLOCKED: 'The session keys changed. Sending is blocked. Start fresh and compare again.',
  SESSION_EXPIRED: 'The 15-minute session ended. Start fresh and compare a new fingerprint.',
  QUEUE_LIMIT: 'The session queue filled. The conversation was closed rather than dropping encrypted records.',
  MESSAGE_TOO_LARGE: 'Keep the message within 4,096 UTF-8 bytes.',
  EMPTY_MESSAGE: 'Write a message first.',
  NOT_VERIFIED: 'Both devices must compare the complete fingerprint before sending.',
  RECORD_LIMIT: 'This short-lived session reached its message limit. Create a new conversation.'
};
const workerPath = '/vendor/session-worker.js';
const workerPolicy = globalThis.trustedTypes?.createPolicy('glassbox-worker', {
  createScriptURL(value) { if (value !== workerPath) throw new TypeError('Worker URL denied'); return value; }
});
function stage(name) {
  if (name === displayedStage) return;
  for (const id of stages) $(id).hidden = id !== name;
  displayedStage = name;
  $('notice').textContent = '';
}
function showGlassState(state) {
  for (const mark of document.querySelectorAll('.session-mark')) mark.dataset.glassState = state;
  for (const label of document.querySelectorAll('.glass-state-label')) {
    label.textContent = state === 'live' ? 'Fingerprint compared · session live' : state === 'broken' ? 'Session closed · compare again' : 'Not live · compare again';
  }
}
function notify(message) { $('notice').textContent = message; }
function clearContent() {
  for (const id of ['invite', 'message', 'peer-fingerprint', 'join-input']) $(id).value = '';
  $('fingerprint').textContent = ''; $('wire-record').textContent = 'No chat record sent yet.';
  $('messages').replaceChildren(); $('empty-chat').hidden = false;
  $('message').disabled = true; $('send').disabled = true; $('byte-count').textContent = '0 / 4096 bytes';
}
function dispose() {
  const old = active;
  active = null;
  dismissConnectedMoment(false);
  if (old) {
    clearTimeout(old.handshakeTimeout); clearTimeout(old.lifetime);
    old.worker.terminate();
    old.socket?.close(1000, 'Session closed');
    for (const callback of old.pending.values()) callback.reject(new Error('SESSION_CLOSED'));
    old.pending.clear();
  }
  showGlassState('dim');
  $('message-seal').classList.remove('sealed');
  clearContent(); $('session-tools').hidden = true;
}
function finish(reason) {
  dispose(); showGlassState('broken'); stage('ended'); $('end-reason').textContent = reason;
}
function fail(code = 'AUTHENTICATION_FAILED') { finish(errors[code] || 'This session could not continue. Start fresh with a new invite and compare again.'); }
function addMessage(text, own = false) {
  const item = document.createElement('li');
  if (own) item.className = 'own';
  const who = document.createElement('span'); who.className = 'who'; who.textContent = own ? 'YOU · SENT TO RELAY, NOT A DELIVERY RECEIPT' : 'PEER · AUTHENTICATED IN THIS SESSION';
  const body = document.createElement('p'); body.textContent = text;
  item.append(who, body); $('messages').append(item);
  while ($('messages').children.length > 100) $('messages').firstElementChild.remove();
  $('empty-chat').hidden = true;
  $('messages').scrollTop = $('messages').scrollHeight;
}
function update(snapshot) {
  if (!active) return;
  active.snapshot = snapshot;
  const state = snapshot.state;
  // This mark is an observation, not an authority or an endpoint-integrity claim.
  const verifiedLive = state === 'READY' && snapshot.compared && snapshot.peerCompared && snapshot.canSend && active.socket?.readyState === WebSocket.OPEN;
  showGlassState(verifiedLive ? 'live' : 'dim');
  if (!verifiedLive) dismissConnectedMoment(false);
  if (['COMPARE', 'WAIT_PEER', 'READY'].includes(state)) {
    clearTimeout(active.handshakeTimeout);
    $('invite').value = ''; $('invite-box').hidden = true;
    if ($('fingerprint').dataset.session !== snapshot.fingerprint) {
      $('fingerprint').replaceChildren();
      snapshot.fingerprint.match(/.{16}/g).forEach(group => {
        const row = document.createElement('span'); row.className = 'fingerprint-row'; row.tabIndex = 0;
        const value = document.createElement('span'); value.className = 'fingerprint-value'; value.textContent = group.slice(0, 8) + ' ' + group.slice(8);
        row.append(value); $('fingerprint').append(row);
      });
      $('fingerprint').dataset.session = snapshot.fingerprint;
    }
    $('local-comparison').textContent = snapshot.compared ? 'Compared here' : 'Not compared';
    $('remote-comparison').textContent = snapshot.peerCompared ? 'Comparison received' : 'Not compared';
  }
  if (state === 'COMPARE' || state === 'WAIT_PEER') {
    stage('verification');
    $('peer-fingerprint').disabled = state === 'WAIT_PEER'; $('verify').disabled = state === 'WAIT_PEER';
    $('verify').textContent = state === 'WAIT_PEER' ? 'Compared on this device' : 'Compare & unlock';
    $('verification-status').textContent = state === 'WAIT_PEER' ? 'Compared on this device. Waiting for the other device to compare.' : snapshot.peerCompared ? 'Their device has compared. Check the full fingerprint on yours.' : 'Sending stays locked until both devices compare.';
  } else if (state === 'READY') {
    const changed = displayedStage !== 'chat'; stage('chat');
    $('message').disabled = false; updateComposer(); if (changed) $('message').focus();
    if (verifiedLive) showConnectedMoment();
  } else if (state === 'CONFIRMING') $('waiting-status').textContent = 'Confirming fresh session keys…';
  else if (state === 'CLOSED') finish('Your peer closed the authenticated session. Start fresh and compare again.');
  else if (state === 'FAILED') fail();
}
function command(op, fields = {}) {
  if (!active) return Promise.reject(new Error('SESSION_CLOSED'));
  const session = active;
  if (session.pending.size >= 16) { fail('QUEUE_LIMIT'); return Promise.reject(new Error('QUEUE_LIMIT')); }
  const id = ++serial;
  return new Promise((resolve, reject) => {
    session.pending.set(id, { resolve, reject }); session.worker.postMessage({ id, op, ...fields });
  });
}
async function connect(role, secret) {
  dispose();
  if (!isSecureContext || !crypto.subtle || !globalThis.Worker) return fail();
  stage('waiting'); $('session-tools').hidden = false;
  $('invite-box').hidden = role !== 'i';
  $('waiting-title').textContent = role === 'i' ? 'Send the invite. Meet here.' : 'Joining your conversation.';
  $('waiting-status').textContent = 'Preparing fresh session keys…';
  const worker = new Worker(workerPolicy ? workerPolicy.createScriptURL(workerPath) : workerPath);
  const current = { worker, socket: null, pending: new Map(), role, snapshot: null, started: false, sending: false };
  active = current;
  current.lifetime = setTimeout(() => { if (active === current) fail('SESSION_EXPIRED'); }, 15 * 60 * 1000);
  worker.onerror = event => { event.preventDefault(); if (active === current) fail(); };
  worker.onmessage = ({ data }) => {
    if (active !== current) return;
    const pending = current.pending.get(data.id); current.pending.delete(data.id);
    if (data.error) {
      pending?.reject(new Error(data.error));
      if (data.fatal) fail(data.error); else notify(errors[data.error] || 'This action is not available.');
      return;
    }
    try {
      for (const frame of data.frames || []) {
        if (current.socket?.readyState !== WebSocket.OPEN || current.socket.bufferedAmount > 65536) throw new Error('QUEUE_LIMIT');
        current.socket.send(JSON.stringify(frame));
        if (frame.t === 'record' && frame.kind === 'chat') $('wire-record').textContent = JSON.stringify(frame, null, 2);
      }
      if (data.snapshot) update(data.snapshot);
      for (const event of data.events || []) {
        if (event.type === 'message' && active === current && current.snapshot?.canSend) addMessage(event.text);
      }
      pending?.resolve(data);
    } catch (error) { pending?.reject(error); fail(error.message); }
  };
  try {
    const result = await command('init', { role, secret });
    secret = null;
    if (active !== current) return;
    if (result.invite) $('invite').value = `${location.origin}/#s=${result.invite}`;
    const socket = current.socket = new WebSocket(`${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/relay/${result.snapshot.room}?role=${role}`);
    socket.onopen = () => { if (active === current) $('waiting-status').textContent = role === 'i' ? 'Waiting for one person to join…' : 'Finding the other endpoint…'; };
    socket.onerror = () => { if (active === current) finish('The relay could not admit this connection. The invite may be expired, occupied, or from a different server. Start a new conversation.'); };
    socket.onclose = () => { if (active === current) finish('Connection lost without a confirmed close. Sending is blocked; old verification cannot be reused. Start fresh.'); };
    socket.onmessage = ({ data: raw }) => {
      if (active !== current) return;
      try {
        if (typeof raw !== 'string' || encode.encode(raw).length > 8192) throw new Error('QUEUE_LIMIT');
        const frame = JSON.parse(raw);
        if (frame.t === 'admitted') {
          if (frame.role !== role) throw new Error('CONTEXT_MISMATCH');
        } else if (frame.t === 'paired') {
          if (current.started) throw new Error('KEY_CHANGE_BLOCKED');
          current.started = true;
          current.handshakeTimeout = setTimeout(() => { if (active === current) fail(); }, 15000);
          $('waiting-status').textContent = 'Authenticating the invitation…';
          if (role === 'i') command('start').catch(() => {});
        } else if (frame.t === 'ended') finish(frame.reason === 'EXPIRED' ? errors.SESSION_EXPIRED : 'The peer disconnected. Sending is blocked. A fresh session must be compared again.');
        else command('receive', { frame }).catch(() => {});
      } catch (error) { fail(error.message); }
    };
  } catch (error) { if (active === current) fail(error.message); }
}
function parseInvite(input) {
  const url = new URL(input);
  if (url.origin !== location.origin || url.pathname !== '/' || url.search || !/^#s=[A-Za-z0-9_-]{43}$/.test(url.hash)) throw new Error('INVALID_INVITE');
  return url.hash.slice(3);
}
async function copy(value, message) {
  try { await navigator.clipboard.writeText(value); notify(message); }
  catch { notify('Clipboard access is unavailable. Select and copy the displayed value manually.'); }
}
function updateComposer() {
  const length = encode.encode($('message').value).length;
  $('byte-count').textContent = `${length} / 4096 bytes`;
  $('send').disabled = !active?.snapshot?.canSend || active.sending || !$('message').value.trim() || length > 4096;
}
$('create').addEventListener('click', () => connect('i'));
$('restart').addEventListener('click', () => connect('i'));
$('join-form').addEventListener('submit', event => {
  event.preventDefault();
  try { const secret = parseInvite($('join-input').value.trim()); $('join-input').value = ''; connect('r', secret); }
  catch { $('join-input').value = ''; notify('Use the complete invite from this same local Glassbox server. Nothing was sent.'); }
});
$('copy-invite').addEventListener('click', () => { if ($('invite').value) copy($('invite').value, 'Invite copied. Share it privately; your clipboard manager may retain it.'); });
$('copy-fingerprint').addEventListener('click', () => { if (active?.snapshot?.fingerprint) copy(active.snapshot.fingerprint, 'Full fingerprint copied. Compare through an independently trusted channel.'); });
$('verify-form').addEventListener('submit', event => {
  event.preventDefault(); const value = $('peer-fingerprint').value; $('peer-fingerprint').value = '';
  command('compare', { fingerprint: value }).catch(() => {});
});
$('mismatch').addEventListener('click', () => fail('FINGERPRINT_MISMATCH'));
$('message').addEventListener('input', updateComposer);
$('message').addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing && event.keyCode !== 229) { event.preventDefault(); if (!$('send').disabled) $('message-form').requestSubmit(); }
});
$('message-form').addEventListener('submit', async event => {
  event.preventDefault(); if ($('send').disabled || !active) return;
  const current = active, text = $('message').value;
  current.sending = true; updateComposer();
  try {
    await command('send', { text });
    if (active !== current) return;
    addMessage(text, true); $('message').value = ''; $('message').focus();
    // Replay only after the real encrypted send succeeds; never copy chat text into artwork.
    const seal = $('message-seal'); seal.classList.remove('sealed');
    void seal.getBoundingClientRect(); seal.classList.add('sealed');
  } catch {} finally { if (active === current) { current.sending = false; updateComposer(); } }
});
$('clear').addEventListener('click', () => $('clear-dialog').showModal());
$('cancel-clear').addEventListener('click', () => $('clear-dialog').close());
$('confirm-clear').addEventListener('click', async () => {
  $('clear-dialog').close();
  try { if (active?.socket?.readyState === WebSocket.OPEN) await command('close'); } catch {}
  finish('This device’s transcript was cleared and its session worker stopped. Copies elsewhere and browser/OS remnants are not erased.');
});
addEventListener('pagehide', dispose);
addEventListener('pageshow', event => { if (event.persisted) finish('The page was restored. Old keys and comparison are not reused. Start a fresh conversation.'); });
// The artwork never captures pointers, traps focus, or changes the sending gate.
document.addEventListener('click', () => dismissConnectedMoment());
document.addEventListener('keydown', event => { if (event.key === 'Escape') dismissConnectedMoment(); });

// Drawing primitives copied/adapted locally from Hub v3 public/sketch.js.
// Seeded randomness is decorative only. Every secret still uses crypto.getRandomValues.
const drawingNS = 'http://www.w3.org/2000/svg';
function drawingEl(name, attrs = {}, parent) {
  const node = document.createElementNS(drawingNS, name);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
  if (parent) parent.append(node);
  return node;
}
function drawingRng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function wobble(pts, r, { amp = 1.4, step = 14, closed = false } = {}) {
  const src = closed ? [...pts, pts[0]] : pts, out = [], f = n => Math.round(n * 10) / 10;
  for (let i = 0; i < src.length - 1; i++) {
    const [x1, y1] = src[i], [x2, y2] = src[i + 1];
    const len = Math.hypot(x2 - x1, y2 - y1), n = Math.max(1, Math.round(len / step));
    const nx = -(y2 - y1) / (len || 1), ny = (x2 - x1) / (len || 1);
    for (let k = 0; k < n; k++) {
      const t = k / n, o = (r() - .5) * 2 * amp;
      out.push([x1 + (x2 - x1) * t + nx * o, y1 + (y2 - y1) * t + ny * o]);
    }
  }
  if (!closed) { const [x, y] = src[src.length - 1]; out.push([x + (r() - .5) * amp, y + (r() - .5) * amp]); }
  if (out.length < 3) return `M${f(out[0][0])} ${f(out[0][1])}L${f(out.at(-1)[0])} ${f(out.at(-1)[1])}`;
  let d = `M${f(out[0][0])} ${f(out[0][1])}`;
  for (let i = 1; i < out.length - 1; i++) {
    const [x, y] = out[i], [xx, yy] = out[i + 1];
    d += `Q${f(x)} ${f(y)} ${f((x + xx) / 2)} ${f((y + yy) / 2)}`;
  }
  return d + (closed ? 'Z' : `L${f(out.at(-1)[0])} ${f(out.at(-1)[1])}`);
}
function drawingInk(parent, points, r, cls = '', closed = false, order = 0) {
  for (let pass = 0; pass < 2; pass++) {
    const node = drawingEl('path', { d: wobble(points, r, { closed, amp: pass ? 1.3 : .9 }), class: `ink ${pass ? 'ink2' : ''} ${cls}`, pathLength: 1 }, parent);
    node.style.setProperty('--o', order);
  }
}
function drawingWash(parent, points, r, cls = '') {
  for (let pass = 0; pass < 2; pass++) drawingEl('path', { d: wobble(points.map(([x, y]) => [x + (pass ? -1 : 2), y + (pass ? 1 : -2)]), r, { closed: true, amp: 2.4, step: 18 }), class: `glass-wash ${pass ? 'wash2' : ''} ${cls}` }, parent);
}
function drawingText(parent, x, y, text, cls = '') {
  const node = drawingEl('text', { x, y, class: `drawing-label ${cls}` }, parent); node.textContent = text; return node;
}
function glassMark(parent) {
  const svg = drawingEl('svg', { viewBox: '0 0 88 82', class: 'small-glassbox' }, parent), r = drawingRng(601);
  drawingWash(svg, [[15,29],[42,12],[74,27],[46,45]], r, 'mark-light');
  drawingWash(svg, [[15,29],[46,45],[46,72],[15,57]], r, 'mark-light');
  drawingInk(svg, [[15,29],[42,12],[74,27],[46,45],[15,29],[15,57],[46,72],[74,55],[74,27]], r, 'box-edge');
  drawingInk(svg, [[46,45],[46,72]], r, 'box-edge');
  drawingInk(svg, [[24,36],[34,42],[34,50],[30,48],[24,49],[24,36]], r, 'mark-inside');
  drawingInk(svg, [[54,44],[65,38],[65,47],[59,51],[54,51],[54,44]], r, 'mark-inside');
  drawingInk(svg, [[36,54],[43,58],[53,54]], r, 'mark-inside');
  drawingEl('path', { d: 'M47 18L40 30L48 35L41 47L49 52L43 63', class: 'glass-crack' }, svg);
}
function sealDrawing(parent) {
  const svg = drawingEl('svg', { viewBox: '0 0 290 72', class: 'seal-sketch' }, parent), r = drawingRng(603);
  drawingInk(svg, [[12,36],[274,36]], r, 'seal-track', false);
  drawingWash(svg, [[145,9],[161,5],[161,62],[145,67]], r, 'seal-wall');
  drawingInk(svg, [[145,9],[161,5],[161,62],[145,67],[145,9]], r, 'seal-wall', false);
  const packet = drawingEl('g', { class: 'seal-packet' }, svg);
  drawingEl('path', { d: 'M25 25Q24 21 30 21L59 21Q64 21 64 27L64 44Q64 49 58 49L30 49Q25 49 25 43Z', class: 'packet-outline' }, packet);
  drawingText(packet, 32, 40, 'hello', 'seal-plain');
  drawingText(packet, 31, 40, '#/≠', 'seal-cipher');
  drawingText(svg, 13, 69, 'your device', 'seal-label');
  drawingText(svg, 202, 69, 'relay record', 'seal-label');
}
function connectedDrawing(parent) {
  const svg = drawingEl('svg', { viewBox: '0 0 640 660', class: 'sketch connected-sketch', 'aria-hidden': 'true' }, parent), r = drawingRng(604);
  const cube = drawingEl('g', { class: 'connected-cube' }, svg);
  const top = [[112,218],[280,115],[530,181],[363,284]], front = [[112,218],[363,284],[363,494],[112,427]], side = [[363,284],[530,181],[530,392],[363,494]];
  drawingWash(cube, top, r, 'connected-amber');
  drawingWash(cube, front, r, 'connected-amber');
  drawingWash(cube, side, r, 'connected-moss');
  drawingInk(cube, top, r, '', true);
  drawingInk(cube, front, r, '', true);
  drawingInk(cube, side, r, '', true);
  drawingInk(cube, [[162,271],[237,291],[237,338],[211,331],[193,344],[193,327],[162,320]], r, 'connected-inside', true);
  drawingInk(cube, [[262,355],[328,374],[328,417],[308,411],[291,424],[291,406],[262,399]], r, 'connected-inside', true);
  drawingInk(cube, [[223,361],[244,380],[260,371]], r, 'connected-inside');
  drawingInk(cube, [[299,86],[299,64]], r, 'connected-ray');
  drawingInk(cube, [[93,178],[71,169]], r, 'connected-ray');
  drawingInk(cube, [[550,147],[568,132]], r, 'connected-ray');
  drawingText(svg, 320, 558, 'Connected.', 'connected-title');
  drawingText(svg, 320, 603, 'You can see this; the relay cannot.', 'connected-caption');
  drawingText(svg, 320, 637, 'The relay still sees metadata.', 'connected-boundary');
}
function draw() {
  const r = drawingRng(616), svg = drawingEl('svg', { viewBox: '0 0 520 490', class: 'sketch draw glassbox-hero', role: 'img', 'aria-labelledby': 'glassbox-art-title glassbox-art-desc' }, $('illustration'));
  drawingEl('title', { id: 'glassbox-art-title' }, svg).textContent = 'Two people inside a glass box; ciphertext outside.';
  drawingEl('desc', { id: 'glassbox-art-desc' }, svg).textContent = 'A transparent cube makes both chat endpoints and their message path visible. A fingerprint comparison plate sits on the glass wall. Outside it, the relay sees scrambled ciphertext marks, plus metadata. This is a visual explanation, not a security guarantee.';
  const top = [[70,160],[187,88],[375,136],[260,208]], front = [[70,160],[260,208],[260,398],[70,348]], side = [[260,208],[375,136],[375,326],[260,398]];
  const rear = drawingEl('g', { class: 'rear-edges' }, svg);
  drawingInk(rear, [[187,88],[187,278],[375,326]], r, 'faint', false, 0);
  drawingInk(rear, [[70,348],[187,278]], r, 'faint', false, 0);
  drawingWash(svg, top, r, 'top-wash'); drawingWash(svg, front, r, 'front-wash');
  drawingInk(svg, top, r, '', true, 1); drawingInk(svg, front, r, '', true, 2);
  const inside = drawingEl('g', { class: 'inside-box' }, svg);
  const first = [[100,210],[161,221],[162,264],[144,260],[132,272],[132,258],[100,253]];
  const second = [[191,265],[248,280],[248,321],[224,315],[213,325],[213,312],[190,305]];
  drawingWash(inside, first, r, 'bubble-wash'); drawingWash(inside, second, r, 'bubble-wash');
  drawingInk(inside, first, r, 'accent', true, 4); drawingInk(inside, second, r, 'accent', true, 5);
  drawingText(inside, 112, 243, 'hello', 'plaintext'); drawingText(inside, 207, 301, 'hi', 'plaintext');
  drawingInk(inside, [[142,282],[162,298],[180,296],[180,277]], r, 'accent message-path', false, 6);
  drawingInk(inside, [[174,283],[180,277],[187,282]], r, 'accent', false, 6);
  const wall = drawingEl('g', { class: 'wall-pane' }, svg);
  drawingWash(wall, side, r, 'wall-wash'); drawingInk(wall, side, r, '', true, 3);
  // The comparison plate is mounted on the wall, not a generic padlock.
  const plate = [[286,301],[348,263],[348,309],[286,348]];
  drawingWash(wall, plate, r, 'plate-wash'); drawingInk(wall, plate, r, 'fingerprint-plate accent', true, 7);
  const fingerprint = drawingEl('g', { class: 'fingerprint-lines' }, wall);
  for (const d of ['M300 327L300 310Q300 300 315 292Q335 280 337 294L337 310','M306 325L306 309Q306 302 317 296Q330 288 331 298L331 316','M312 326L312 309Q312 305 320 301Q326 297 326 303L326 320','M318 325L318 308Q318 304 322 306L322 321']) drawingEl('path', { d, class: 'ink accent', pathLength: 1 }, fingerprint);
  drawingInk(svg, [[238,240],[303,253],[348,237],[447,259]], r, 'wire-path', false, 8);
  const packet = drawingEl('g', { class: 'hero-packet' }, svg);
  drawingEl('path', { d: 'M226 222L256 228L256 250L226 244Z', class: 'packet-outline' }, packet);
  drawingText(packet, 231, 239, 'hi', 'packet-plain'); drawingText(packet, 230, 239, '#/≠', 'packet-cipher');
  const cipher = drawingEl('g', { class: 'cipher-cloud' }, svg);
  drawingText(cipher, 418, 218, '#≠/8', 'ciphertext'); drawingText(cipher, 401, 288, '7#//≠', 'ciphertext'); drawingText(cipher, 434, 320, '≠4/#', 'ciphertext');
  for (let i = 0; i < 5; i++) drawingInk(cipher, [[430 + i * 8,231],[436 + i * 8,221]], r, 'cipher-hatch', false, 9);
  drawingInk(svg, [[75,72],[104,91],[116,190]], r, 'leader', false, 9);
  drawingText(svg, 34, 54, 'what you see', 'art-caption');
  drawingInk(svg, [[432,344],[421,373],[337,406]], r, 'leader', false, 9);
  drawingText(svg, 290, 433, 'what the relay sees', 'art-caption');
  drawingInk(svg, [[310,346],[291,392],[196,439]], r, 'leader', false, 9);
  drawingText(svg, 50, 461, 'compare the fingerprint', 'plate-caption');
  for (const mark of document.querySelectorAll('.session-mark')) glassMark(mark);
  sealDrawing($('message-seal'));
  connectedDrawing($('connected-moment'));
}
draw();
function importFragment(fragment) {
  if (!fragment) return;
  history.replaceState(null, '', location.pathname);
  try {
    if (!/^#s=[A-Za-z0-9_-]{43}$/.test(fragment)) throw new Error('INVALID_INVITE');
    connect('r', fragment.slice(3));
  } catch { notify('The invite is malformed. It was removed from the address bar; no relay connection was started.'); }
}
addEventListener('hashchange', () => importFragment(location.hash));
importFragment(importedFragment);
importedFragment = null;
