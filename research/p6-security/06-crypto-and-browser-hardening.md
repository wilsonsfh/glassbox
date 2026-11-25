# R6 — Crypto libraries and browser hardening

Evidence checked on **2026-11-25**. Runtime: macOS, Node **22.23.4**, npm **10.9.9**. Public sources and synthetic plaintext only; no credentials, vendor agents, interception or deployment.

## 1. Pinned artifacts and observed behavior

The registry's current versions are [`libsodium-wrappers@0.8.4`](https://registry.npmjs.org/libsodium-wrappers/latest), [`libsodium-wrappers-sumo@0.8.4`](https://registry.npmjs.org/libsodium-wrappers-sumo/0.8.4) and [`noise-handshake@4.2.1`](https://registry.npmjs.org/noise-handshake/latest). The tested sodium WASM reports **libsodium 1.0.22**. Standard and sumo wrappers are ISC; Noise is Apache-2.0.

| Browser-build capability | Standard 0.8.4 | Sumo 0.8.4 | What Glassbox gets / does not get |
| --- | --- | --- | --- |
| `crypto_secretstream_xchacha20poly1305_*` | Present; roundtrip and negative probes passed | Present in distribution | Ordered authenticated records; not peer identity, delivery guarantees or compromise recovery |
| `crypto_kx_*` | Present; opposite directional session keys verified | Present | X25519-derived directional keys; unauthenticated public-key exchange alone permits key substitution |
| `crypto_box_easy/open_easy` | Present; roundtrip passed | Present | Public-key authenticated encryption relative to supplied keys; not a complete authenticated chat protocol |
| Argon2 `crypto_pwhash` | **Absent at runtime** | Present; Argon2id13 and Argon2i13 constants verified | Password stretching only if deliberately needed; not a PAKE and unnecessary for a CSPRNG 32-byte invite |
| Public `free()` | **Absent** | **Absent** | Current GitHub README's cleanup example is not compatible with the published 0.8.4 package |

The [current README](https://github.com/jedisct1/libsodium.js) recommends standard, documents sumo-only `crypto_pwhash_*`, and uses `sodium.free(state)`. Actual 0.8.4 secretstream state is a **numeric WASM heap address**, not a `Uint8Array`; calling `memzero(state)` is therefore not a valid replacement. The first combined probe successfully decrypted, then exited 1 at `s.free(...)` with `TypeError: s.free is not a function`. A separate probe confirmed cryptographic roundtrips and rejections with exit 0. Do not confuse a cleanup failure with a cipher failure. Low-level `_free` exists but is not a reviewed public wrapper lifecycle solution; do not invent one under interview time pressure. Resolve ownership against the pinned release, bound allocations and terminate the per-session worker; termination is not forensic erasure.

### Measured size, not README marketing size

Tarballs were downloaded into memory, decompressed and individual published JS assets gzipped; no bundler was run. Figures below are **bytes**, sums of the core and wrapper files compressed separately. They exclude the application and Noise dependencies and are not a production bundle measurement.

| Distribution 0.8.4 | Raw JS bytes | Sum of gzip bytes |
| --- | ---: | ---: |
| Standard CommonJS | 1,029,317 | 322,392 |
| Standard ESM | 433,835 | 150,836 |
| Sumo CommonJS | 1,319,047 | 406,126 |
| Sumo ESM | 535,382 | 187,899 |

Reproduce measurements from the [core](https://registry.npmjs.org/libsodium/0.8.4), [wrapper](https://registry.npmjs.org/libsodium-wrappers/0.8.4), [sumo core](https://registry.npmjs.org/libsodium-sumo/0.8.4) and [sumo wrapper](https://registry.npmjs.org/libsodium-wrappers-sumo/0.8.4) `dist.tarball` artifacts: count the two `.js` or two `.mjs` file bytes and gzip each. README estimates of approximately 290/375 KB are not the measurement of these current ESM artifacts. Browser ESM loading, Vite resolution, CSP and fallback behavior remain separate gates.

### Audit scope

[PIA's published 2017 assessment](https://www.privateinternetaccess.com/blog/libsodium-audit-results/) covered **C libsodium 1.0.12 and 1.0.13**, not JS wrappers 0.8.4. [Secretstream documentation](https://doc.libsodium.org/secret-key_cryptography/secretstream) says it was introduced in **1.0.14**, so that assessment cannot establish review of secretstream. No independent assessment of current wrappers, current browser backend, or Glassbox's Noise/HKDF/secretstream composition was verified. Audit history is useful evidence, not transferable certification.

## 2. Noise feasibility: real result and exact limits

The final instruction permits writing only this report, whereas the embedded brief requests an installation in `_clones/crypto-probe`. **No installation or clone was performed**, to respect the narrower write restriction. Instead public tarballs/source were loaded entirely in memory. The built-in research/build skill paths were unavailable on this desktop; public primary evidence was used. Python's separate TLS trust store failed verification; system-trusted curl succeeded without disabling TLS validation. Anonymous GitHub API rate limiting was handled by reading public commit pages.

Observed results:

| Probe | Result | Evidentiary limit |
| --- | --- | --- |
| NNpsk0 handshake between two instances | **PASS** | Actual `noise-handshake@4.2.1` code with the `sodium-javascript@0.8.0` browser backend running under Node |
| Independent Cacophony known-answer vector | **PASS**: both handshake ciphertexts, both payloads, final hash and all four transport ciphertexts/payloads | One exact suite/vector, not all Noise patterns, edge cases or a formal validation |
| Upstream runtime test bodies | **20 PASS, 0 FAIL; 7 reference tests SKIPPED** | All four test files evaluated with an assertion-compatible shim; **not** the actual brittle runner or `npm test`/Standard lint |
| Noise nonce 0 versus `2**32`, same key/plaintext | **Identical ciphertext** | Reproduced 32-bit wrap; general Noise transport acceptance gate **FAILS** |
| Sodium secretstream ordered REKEY/FINAL | **PASS** | Primitive-level, not the composed application |
| Tamper, replay, reorder, wrong-session AAD | **Rejected**, `pull()` returned `false` | DOM non-display, queues, race conditions and network framing were not exercised |

Primary corpus: [Cacophony vectors](https://raw.githubusercontent.com/haskell-cryptography/cacophony/master/vectors/cacophony.txt), SHA-256 `3bde7c09a6f349ee11c825c50fcc02649f8f02a47c857a459206b357f9386cae`, 1,709,817 bytes. Selected `Noise_NNpsk0_25519_ChaChaPoly_BLAKE2b`; expected handshake hash `ed5e9692d0ab507b6c2beec3f584fd5b127817a9d20b26cd50aa72c507260fa31aa7d88dd3723316338af37ce0b4cfb2923aeb848bbf2b934911306f01ffc963`. These are upstream community known-answer vectors, not a standards-body certificate.

[Source `final()`](https://github.com/holepunchto/noise-handshake/blob/main/noise.js) sets **initiator `tx = k1` (send), `rx = k2` (receive)**; responder is reversed. The README's field descriptions say the opposite, although its cipher example uses initiator `tx` to responder `rx`. Expose `sendKey`/`receiveKey` and test against independent transport bytes; two peers consistently making the same naming mistake can still roundtrip.

[Cipher source](https://github.com/holepunchto/noise-handshake/blob/main/cipher.js) uses `DataView.setUint32(4, counter, true)`, leaving the upper nonce word zero. This wraps at `2**32`, unlike the [Noise specification's 64-bit counter and exhaustion rule](https://noiseprotocol.org/noise.html). Restrict this candidate to the two-message bounded handshake, not long-lived Noise transport. The library supports NNpsk0/XXpsk0, not arbitrary PSK positions. [_clear()](https://github.com/holepunchto/noise-handshake/blob/main/noise.js) clears ephemeral fields but leaves **`psk` and `s.secretKey` reachable**, contrary to the README's “only the following state” description; explicit adapter cleanup is necessary. Split buffers share their backing allocation; do not assume wiping one directional view clears all retained material.

[`sodium-universal@5.0.1`](https://registry.npmjs.org/sodium-universal/5.0.1) maps `sodium-native` to `sodium-javascript` for browsers, but makes JS an **optional peer dependency**. Its [README](https://github.com/holepunchto/sodium-universal) explicitly requires installing that peer for Browserify. [`sodium-javascript`](https://github.com/sodium-friends/sodium-javascript) calls itself WIP and lacks native feature parity; its latest npm release is 0.8.0 from 2022. A current parent package does not make this backend current or independently reviewed.

### Reproducible no-disk Noise probe

Run the following with Node 22 and curl, pasted as `node --input-type=module <<'JS' ... JS`. It executes downloaded public code with synthetic vectors. esm.sh is **test-only transpilation**, not a recommended production dependency/CDN. The snippet reproduces the main vector/direction/nonce findings, not the separate sodium measurements or all upstream test executions. Final direct execution verified the package integrity, all six frames and nonce collision. The first rerun timed out downloading the corpus at 40 seconds; retry with the 120-second timeout below passed. This was a network failure, not a cryptographic rejection.

```js
import {execFileSync} from 'node:child_process';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import path from 'node:path';
import vm from 'node:vm';
const get = u => execFileSync('curl', ['-L','-f','-sS','--max-time','120',u], {maxBuffer:20e6});
const esm = async u => (await import('data:text/javascript;base64,'+get(u).toString('base64'))).default;
const deps = {
  'sodium-universal': await esm('https://esm.sh/sodium-javascript@0.8.0/node/sodium-javascript.bundle.mjs'),
  b4a: await esm('https://esm.sh/b4a@1.7.3/node/b4a.bundle.mjs'),
  nanoassert: await esm('https://esm.sh/nanoassert@2.0.0/node/nanoassert.bundle.mjs')
};
const pkg = get('https://registry.npmjs.org/noise-handshake/-/noise-handshake-4.2.1.tgz');
assert.equal(createHash('sha512').update(pkg).digest('base64'),
  'ssGgMHbTm+CjvK4yDxLsU1dXUCWeBAjD7g4M6rgvQJC7OeO6IH5CeNVaySn3k0V5w01OpFTXbudQV9eRIiXdhQ==');
const tar = gunzipSync(pkg), files = {}, cache = {};
for (let i=0; i+512<=tar.length;) {
  const h=tar.subarray(i,i+512), n=h.subarray(0,100).toString().replace(/\0.*/, '');
  if (!n) break;
  const size=parseInt(h.subarray(124,136).toString().replace(/\0.*/, ''),8)||0;
  files[n.replace(/^package\//,'')]=tar.subarray(i+512,i+512+size).toString();
  i+=512+Math.ceil(size/512)*512;
}
function load(n) {
  if (!n.endsWith('.js')) n+='.js';
  if (cache[n]) return cache[n].exports;
  const m=cache[n]={exports:{}};
  const req=x=>x.startsWith('.') ? load(path.posix.normalize(path.posix.join(path.posix.dirname(n),x))) : deps[x];
  vm.runInThisContext('(function(require,module,exports){'+files[n]+'\n})')(req,m,m.exports);
  return m.exports;
}
const Noise=load('noise'), Cipher=load('cipher'), dh=load('dh');
const raw=get('https://raw.githubusercontent.com/haskell-cryptography/cacophony/master/vectors/cacophony.txt');
assert.equal(createHash('sha256').update(raw).digest('hex'), '3bde7c09a6f349ee11c825c50fcc02649f8f02a47c857a459206b357f9386cae');
const v=JSON.parse(raw).vectors.find(v=>v.protocol_name==='Noise_NNpsk0_25519_ChaChaPoly_BLAKE2b');
const hex=s=>Buffer.from(s,'hex');
const a=new Noise('NNpsk0',true,null,{psk:hex(v.init_psks[0])});
const b=new Noise('NNpsk0',false,null,{psk:hex(v.resp_psks[0])});
a.e=dh.generateKeyPair(hex(v.init_ephemeral)); b.e=dh.generateKeyPair(hex(v.resp_ephemeral));
a.initialise(hex(v.init_prologue)); b.initialise(hex(v.resp_prologue));
for (let i=0;i<2;i++) {
  const [s,r]=i===0?[a,b]:[b,a], m=v.messages[i], c=s.send(hex(m.payload));
  assert.equal(c.toString('hex'),m.ciphertext); assert.equal(r.recv(c).toString('hex'),m.payload);
}
assert.equal(a.hash.toString('hex'),v.handshake_hash); assert.deepEqual(a.hash,b.hash);
assert.deepEqual(a.tx,b.rx); assert.deepEqual(b.tx,a.rx);
const ac=new Cipher(a.tx), bc=new Cipher(b.tx), ar=new Cipher(a.rx), br=new Cipher(b.rx);
for (let i=2;i<6;i++) {
  const [s,r]=i%2===0?[ac,br]:[bc,ar], m=v.messages[i], c=s.encrypt(hex(m.payload));
  assert.equal(c.toString('hex'),m.ciphertext); assert.equal(r.decrypt(c).toString('hex'),m.payload);
}
console.log('PASS: 6 vector frames, handshake hash and directions');
const c0=new Cipher(Buffer.alloc(32,7)), c32=new Cipher(Buffer.alloc(32,7)); c32.setNonce(2**32);
console.log('NONCE_WRAP_IDENTICAL',c0.encrypt(Buffer.from('probe')).equals(c32.encrypt(Buffer.from('probe'))));
```

## 3. Alternatives and review evidence

[`noise-protocol@3.0.2`](https://github.com/emilbayes/noise-protocol) is ISC, labels itself beta, has Browserify tests and supports the desired primitive suite, **but explicitly does not support PSK patterns**. It cannot replace NNpsk0 unchanged. [`@stablelib/*`](https://www.stablelib.com/) offers MIT TypeScript/JS primitives such as X25519, HKDF and AEAD; no complete Noise package was verified in the current catalogue. Combining primitives would move protocol responsibility onto us. [Noise-C](https://github.com/rweather/noise-c) is an MIT plain-C reference implementation with vectors and C build documentation; no maintained, ready-to-import official WASM browser distribution was verified. Emscripten porting plus lifecycle/build review is not a quick fallback.

[Noble curves](https://github.com/paulmillr/noble-curves), [ciphers](https://github.com/paulmillr/noble-ciphers) and [hashes](https://github.com/paulmillr/noble-hashes) are MIT, browser-capable, minimal-dependency primitive libraries, **not a Noise/chat protocol**. The [2024 Cure53 report](https://cure53.de/audit-report_noble-crypto-libs.pdf) scopes ciphers **0.6.0** and curves **1.5.0**; current READMEs describe post-fix versions **1.0.0** and **1.6.0**. Record this version distinction rather than treating current versions as the exact reviewed source. Findings include AES timing leakage, AES-GCM nonce misuse, BigInt timing leakage and cleanup limitations. Prefer native WebCrypto AES-GCM over JS AES where applicable.

The [hashes report dated 2022-01-05](https://cure53.de/pentest-report_hashing-libs.pdf) contains no classified noble-hashes vulnerabilities; several reported incomplete-destroy issues were false alerts. Current README says the old assessment excludes **blake3, sha3-addons, sha1 and argon2**. New functionality does not inherit that review. Curves README also describes a **2.3.0 August 2026 Trail of Bits/OpenAI review**; the [auditor's dashboard](https://trailofbits.com/patch-the-planet/dashboard/) independently lists accepted Noble fixes, but a standalone full 2026 assessment report was not located. The [2.3.0 release](https://github.com/paulmillr/noble-curves/releases/tag/2.3.0) reports X25519 timing leakage of up to 4.036 long-term-key bits and hardening, not full key recovery. Do not pin an older version solely because an older PDF exists, and do not infer cross-engine constant-time guarantees from a finite timing harness.

### Open-source inventory

Stars are point-in-time observations, not confidence scores. Dates are last default-branch commit dates (UTC where converted), not misleading `pushed_at` dates. Activity judgments describe visible evidence, not a support commitment. Repository links above and their public `/commits/<branch>/` pages or GitHub API supplied the metadata.

| Repository | Licence | Stars | Last commit | Maintained? / reuse and exact limit |
| --- | --- | ---: | --- | --- |
| jedisct1/libsodium.js | ISC | 1,167 | 2026-10-28 | Active; standard records. Published API/master documentation mismatch; no current wrapper audit verified |
| [jedisct1/libsodium](https://github.com/jedisct1/libsodium) | ISC | 14,075 | 2026-11-23 | Active C core; review history/algorithm docs, not a direct browser package |
| holepunchto/noise-handshake | Apache-2.0 | 20 | 2026-11-09 | Active; bounded handshake only after browser gate; nonce/retention caveats |
| holepunchto/sodium-universal | MIT | 71 | 2026-01-09 | Recent maintenance; browser mapping, not primitive review |
| sodium-friends/sodium-javascript | MIT | 93 | 2023-05-23 | Dormant WIP; tested candidate browser backend, no current independent review verified |
| emilbayes/noise-protocol | ISC | 70 | 2023-02-06 | Dormant beta; comparison/test ideas, no PSK support |
| StableLib/stablelib | MIT; bundled third-party notices | 222 | 2026-11-15 | Active primitives; no complete Noise implementation verified |
| rweather/noise-c | MIT | 387 | 2023-12-06 | Low recent activity; reference/vectors, no ready browser WASM verified |
| haskell-cryptography/cacophony | Unlicense | 110 | 2025-01-09 | Sparse activity; independent vector corpus, not browser runtime |
| paulmillr/noble-curves | MIT | 973 | 2026-09-08 | Active; optional primitive fallback, no protocol or unconditional timing guarantee |
| paulmillr/noble-ciphers | MIT | 439 | 2026-08-30 | Active; ChaCha primitive fallback; native AES preferable |
| paulmillr/noble-hashes | MIT | 946 | 2026-09-08 | Active; BLAKE2/HKDF primitives; audit excludes later features |
| [holepunchto/b4a](https://github.com/holepunchto/b4a) | Apache-2.0 | 48 | 2026-10-26 | Active buffer adapter; exact test loader version 1.7.3, not a security control |
| [emilbayes/nanoassert](https://github.com/emilbayes/nanoassert) | ISC | 33 | 2026-03-12 | Recent maintenance; test loader 2.0.0, not a security control |

## 4. Current WebCrypto/browser feasibility

[MDN deriveKey](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey), [HKDF parameters](https://developer.mozilla.org/en-US/docs/Web/API/HkdfParams), [encrypt](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt) and MDN's underlying compatibility entries were read. This table is documentation evidence, **not local execution of three browsers**.

| Algorithm | Current Chrome | Current Firefox | Current Safari | Consequence |
| --- | --- | --- | --- | --- |
| X25519 | Yes, 133+ | Yes, 130+ | Yes, 17+ | Older-browser caveat, not a current mainstream gap |
| Ed25519 | Yes, 137+ | Yes, 129+ | Yes, 17+ | Signing, not DH; Safari may produce randomized rather than deterministic signatures |
| HKDF SHA-256/384/512 | Yes | Yes | Yes | High-entropy derivation; not password pairing |
| AES-GCM | Yes | Yes | Yes | AEAD; caller must prevent nonce reuse |
| ChaCha20-Poly1305 | No documented WebCrypto support | No documented WebCrypto support | No documented WebCrypto support | JS/WASM needed to keep the proposed Noise suite |

WebCrypto also does not provide libsodium secretstream or BLAKE2b for the proposed suite. X25519 becoming available does not remove these gaps. Feature-test the actual operations in a secure context/worker, fail closed and avoid silent suite downgrade. Nonextractable CryptoKeys prevent export, not malicious origin code invoking operations or reading plaintext.

## 5. Browser hardening that reduces a named leak

| Control / primary source | What it actually reduces | What it does not stop |
| --- | --- | --- |
| [Hash-only CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP), `object-src 'none'`, `base-uri 'none'`, `frame-ancestors 'none'`; text-only DOM, no inline handlers | Injected scripts, base-URL changes, framing/clickjacking by malicious peer content or injected markup | Malicious allowed code/origin, privileged extensions, recipient copy. `strict-dynamic` delegates authority to trusted loaders; omit it for a fixed script graph unless needed |
| [Trusted Types enforcement](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/require-trusted-types-for), narrow policy creation | DOM injection sinks accepting unchecked strings | Does not sanitize automatically or protect permissive policies. Current MDN says cross-browser newly available February 2026; old browsers lack enforcement. Framework/worker loader compatibility still needs tests |
| [SRI](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity), pinned dependencies, self-hosting | Modified script/style bytes from an otherwise trusted CDN/build pipeline while HTML/policy stay authentic | Origin can replace HTML, hash and policy together. Entry-script SRI does not automatically pin every imported module/worker asset |
| [Narrow `wasm-unsafe-eval`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src), not JS `unsafe-eval` | Allows sodium WASM without opening arbitrary JS eval | Cannot make compromised WASM benign; exact published ESM/CSP path untested |
| [Referrer-Policy `no-referrer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy) | Referrer path/query/room metadata sent to destinations | Does not remove WebSocket `Origin`, IPs or requests; fragments already are not normal HTTP referrers |
| [Fragment import](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment) then [replaceState](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState) | Initial HTTP secret exposure and continued URL-bar/current-entry exposure | JS/extensions can read it before stripping; shared links, history-sync races, screenshots and clipboard managers may retain it. Keep secret out of history.state |
| [Permissions-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Permissions_Policy): camera/microphone/geolocation disabled | Unneeded powerful-API access where supported | Browser/directive support varies; not an OS screenshot/clipboard block. Disabling camera conflicts with optional QR scanning; enable only when product requires it |
| [Cache-Control `no-store`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control), no chat persistence | Compliant HTTP cache retention of sensitive responses | Not JS storage, service-worker caches, logs, backups, swap or guaranteed bfcache exclusion. Handle pagehide/pageshow and force new session after restoration |
| [COOP `same-origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Opener-Policy) / [COEP `require-corp`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy) | Opener/XS-Leaks boundaries and cross-origin embedding/isolation risks | Not same-origin malicious JS or endpoint compromise. COEP can break resources; isolation exposes SharedArrayBuffer/high-resolution timers, which this prototype does not need |
| [spellcheck=false](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/spellcheck), autocomplete/autocorrect off | Spellcheck-provider exposure and incidental browser form retention | Hints, not an enforceable endpoint privacy boundary; extensions, keyboards/IME and OS services still see text |

No analytics, error-report uploads, remote fonts or chat-link previews. CSP reporting can itself export URLs; omit automatic external reporting for secret-bearing pages. A published build hash on the same replaceable origin is not independent integrity verification.

## 6. WebRTC, memory and minimum stack

[W3C WebRTC](https://w3c.github.io/webrtc-pc/) and [RFC 8828](https://www.rfc-editor.org/rfc/rfc8828.html) distinguish host candidates (local interfaces, sometimes mDNS-obfuscated), server-reflexive (`srflx`) public NAT addresses and relay candidates. mDNS reduces raw local-address exposure to JS/remote signaling; it does **not** conceal public srflx addresses or make direct traffic anonymous. STUN/TURN providers see source IPs; TURN and relay services see timing/volume and relationship metadata. No camera/microphone permission is required merely to create a data channel.

For peer-IP privacy, set `iceTransportPolicy:'relay'` **before gathering**, no prefetch pool, and use only TURN candidates; verify emitted candidates and selected pairs with stats. Filtering candidates after gathering is not equivalent. No TURN means fail closed or an explicitly labelled encrypted WSS-only route **without starting WebRTC**. Relay policy does not guarantee VPN/proxy routing or hide IPs from infrastructure. CSP `connect-src` must not be treated as the WebRTC route/privacy control.

[RFC 8827 §9.1](https://www.rfc-editor.org/rfc/rfc8827.html) explicitly allows signaling-server MITM despite HTTPS unless peer keys are independently verified. Encrypt **and authenticate** the complete SDP, DTLS fingerprint, ICE credentials and trickled candidates with the established application session; bind session, version, roles and ordering, and call `setRemoteDescription` only after verification. Keep application encryption on the data channel. A DTLS fingerprint is a transport certificate binding, not a human identity; possession of a leaked invite still permits impersonation.

[Cure53 NBL-04-003](https://cure53.de/audit-report_noble-crypto-libs.pdf) and Noble's memory notes explain why JS `.fill(0)`/`memzero` is best effort: immutable strings, JIT/GC temporaries, DOM text, framework state, cloned worker messages and OS/browser dumps survive outside the overwritten view. WASM does not remove runtime/OS copies. Transfer ArrayBuffers where feasible, minimize copies, zero reachable byte arrays, explicitly handle pinned WASM state ownership, clear DOM/queues, terminate session worker and avoid persistence. Do not promise screenshot prevention, recipient deletion, forensic burn or post-compromise recovery. Secretstream's FINAL signals closure and rekeys; application state must enforce no records after FINAL. Missing FINAL means unclean closure, not proof of malicious truncation.

**Minimum prototype choice:** native CSPRNG and WebCrypto SHA-256/HKDF; standard pinned sodium records in a per-session worker; candidate NNpsk0 only behind independent-vector, real-browser and lifecycle gates; explicit directional adapters and mutually authenticated first control records before sends. Separate chat/control keys and AAD contexts, serialize each stream and abort on rejection. This is the smallest feasible version of the proposal, **not an entirely independently audited stack**. No reviewed, drop-in NNpsk0 browser protocol library was established here; a primitives-only native or Noble rewrite does not solve that. Resolve the 0.8.4 cleanup mismatch before claiming completed burn behavior. Use an established messenger for real sensitive conversations.

**First three fail-fast tests:** (1) require unequal Noise ciphertext at nonce 0 and `2**32`—**FAIL reproduced**, so forbid candidate transport; (2) run published secretstream cleanup example against the pinned package—**FAIL reproduced**, so block lifecycle claims until fixed; (3) assert first initiator-to-responder vector frame uses `initiator.tx`/`responder.rx` and fails with swapped keys—correct mapping passed; the README-description-driven adapter would fail. Then gate wrong PSK/prologue, malformed frames, replay/reorder/reflection/cross-room AAD and altered SDP, asserting zero DOM display and no continuation under a failed session. Browser/Vite/Safari, no-network leakage captures and bfcache/burn tests remain unverified.

## Adopt now / Adopt later / Skip

| Decision | Control / item | Risk reduced | Adversary | Effort | Exact limit |
| --- | --- | --- | --- | --- | --- |
| Adopt now | Independent vector/direction gates; handshake-only Noise adapter | Key-direction mistakes, nonce-wrap transport reuse, key substitution | Active relay/MITM without invite; developer mistakes | M | Node vector passed; real browser not passed; invite thief still authenticates; no application audit |
| Adopt now | Standard sodium secretstream; distinct directions/contexts, ordered serialized AEAD, reject before DOM | Transit/intermediate tamper, replay, reorder, cross-room reflection | Malicious relay, inspecting proxy | M | Primitive probes passed; composition, lifecycle and integration remain unverified; traffic metadata visible |
| Adopt now | Resolve pinned state cleanup; wipe PSK/unused private fields; bounded per-session worker | Sender/receiver retained keys and accidental memory retention | Later memory observer, accidental application retention | M | Wrapper public free mismatch unresolved; JS/WASM/OS forensic erasure cannot be guaranteed |
| Adopt now | Hash-only CSP, no inline handlers, text-only DOM, Trusted Types and SRI | Sender/receiver XSS, modified subresources | Malicious chat peer or subresource attacker, not malicious origin | M | Authentic HTML/policies required; test module/worker graph and old-browser behavior |
| Adopt now | Fragment import/strip, no-referrer, no storage/analytics, spellcheck/autocomplete off, no-store | Invite/URL, spellcheck, intermediary cache and telemetry leakage | Incidental services and later local user | S | History sync, extension, clipboard, screenshots and bfcache are not eliminated |
| Adopt now | Authenticate complete SDP/fingerprints/ICE before WebRTC APIs | Signaling key/fingerprint substitution | Malicious signaling/relay without application keys | M | Does not authenticate a person; leaked invite and malicious client code remain threats |
| Adopt now | WSS-only default or explicitly chosen TURN relay-only before ICE | Peer learning local/public IPs | Unknown or malicious peer | M | Infrastructure still sees IP/timing/size; no anonymity or forced-proxy guarantee |
| Adopt now | Minimal Permissions-Policy and COOP | Unneeded device API access, opener/XS-Leaks | Injected code/hostile cross-origin page | S | Support varies; not endpoint surveillance defense; camera policy must match QR scope |
| Adopt later | Independently distributed signed/pinned client and verification channel | Malicious JS delivery from compromised origin | Compromised hosting/CDN delivery operator | L | Trust moves to distribution/update signer; endpoint and recipient remain trusted |
| Adopt later | COEP with cross-origin resource/CSP integration tests | Cross-origin embedding/isolation risk | Cross-origin attacker | M | Can break resources; no same-origin/OS protection; not required for single-thread sodium |
| Adopt later | Reviewed PAKE or a reviewed browser Noise lifecycle adapter | Invite/pairing and protocol-composition mistakes | Invite thief/active relay; implementation defects | L | Needs actual protocol review; Argon2/HKDF alone is not PAKE; human verification still matters |
| Skip | noise-handshake Cipher as general transport | Would attempt to reduce transit disclosure | Passive/active observer | S | Reproduced nonce collision at `2**32`; use standard records instead |
| Skip | noise-protocol as NNpsk0 replacement; homemade StableLib/Noble Noise; hurried Noise-C WASM port | Would attempt to reduce MITM/content leakage | Active relay | L | No PSK in noise-protocol; others need protocol/build work; primitive audits do not audit that work |
| Skip | Sumo/Argon2 for random invite; JS AES without need | No additional named risk for high-entropy invite/current native AES use | Offline guesser/timing observer | M | Larger surface/cost; not identity or PAKE; native AES still needs unique nonces |
| Skip | “Audited app”, “burn erases all copies”, “CSP defeats origin”, “mDNS means anonymous” badges | None; creates incorrect endpoint/delivery/metadata expectations | Malicious origin, extensions, OS observer, recipient | S | These adversaries remain outside the claimed content-encryption boundary |
