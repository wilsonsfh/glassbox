# Glassbox — verified local slice

**Updated 2026-11-25 22:50 +08.** The Node encrypted core, actual local relay and two actual browser contexts pass. The final Hub-influenced UI is included in the browser run. This remains an **unaudited prototype**, not a production messenger or an absolute-security claim.

## Start and sync

From `analysis/p6-prototype`, run:

```sh
node server.mjs --port 4816
```

Open `http://127.0.0.1:4816` in two browser contexts on the same computer. No npm install is required. All runtime dependencies are bundled in `dist/vendor`; Node 22+ is required. Sandbox tests used 5816 and stopped their servers afterward. No Mac tests were performed by this builder; the parent separately reported a successful Mac HTTP health check. The already-running Mac process **must restart after the new sync**, because the server reads UI assets and CSP hashes at startup. No changes were made outside the assigned product folder.

The original Node milestone at 22:38 is retained in `evidence/node-first-version-ready.json`. `FIRST-VERSION-READY.json` is refreshed at the parent's explicit request after the browser gate passed.

## Implemented

Create an invite → privately share it → second context joins → authenticate the 32-byte secret using two-flight Noise NNpsk0 → mutually confirm fresh secretstream keys and headers → independently compare the **full 256-bit fingerprint on both devices** → exchange text → clear/close. The composer remains locked before both comparisons. A changed session or disconnect cannot inherit old verification. Mismatch aborts rather than merely changing a badge.

`noise-handshake@4.2.1` is used only for the bounded `Noise_NNpsk0_25519_ChaChaPoly_BLAKE2b` handshake. Its 32-bit transport nonce collision is reproduced in a test, and application-source checks forbid its transport API. `libsodium-wrappers@0.8.4` supplies independent directional control/chat secretstreams. Version, room, session, canonical sender/receiver roles, stream context and exact sequence are bound; accepted records rekey. Control confirmations bind both parties' headers. Authenticated FINAL ends the session. Text uses 256-byte padding buckets, a 4,096-byte UTF-8 cap, 100 outgoing records per direction, and a 100-entry DOM transcript limit.

One bounded worker owns one session; commands are serialized and queues capped. Key material is dropped or overwritten where reachable, and the worker is terminated on closure. Published sodium 0.8.4 has no public free() for numeric WASM secretstream states. **This is limited lifetime, not guaranteed zeroization or forensic erasure.**

The relay binds loopback only. Exact Host/Origin checks, two slots, known roles, 8 KiB frames, per-socket rate/byte limits, bounded buffering, upgrade/HTTP rate limits, global room/connection limits and a 15-minute expiry are implemented. No content database, access/payload logs, telemetry, third-party requests, remote fonts, model calls or deliberate plaintext persistence are present. The optional inspector shows an actual outgoing ciphertext record—not an attested server receipt.

The page enforces a hash-only script CSP with SRI, a single narrowly validated Trusted Types worker-URL policy, a fixed worker path, no inline script/handlers/styles, no JavaScript unsafe-eval, no-referrer, COOP, no-store, nosniff and a narrow Permissions-Policy. The worker's separate CSP permits `wasm-unsafe-eval` but no network connections. Styles are restricted to the exact local stylesheet URL with SRI. CSP does not protect against an origin that replaces code and policy together.

## Tested — exact commands and evidence

`node scripts/build.mjs` — **PASS**, portable runtime generated; final build log `evidence/build.log`. Runtime bundle approximately 1.9 MiB including test bundle and license/inventory files. Build-time native sodium packages are not imported at runtime; browser bundling explicitly aliases sodium-universal to sodium-javascript. Test-only internals are not HTTP-served.

`node scripts/check.mjs` — **PASS**, 10 JavaScript syntax checks plus source bans on persistence, console logging, dynamic eval, unsafe DOM sinks and Noise transport; HTML inline-script/handler/style bans. Output: `evidence/static-checks.log`.

`node --test tests/core.test.mjs tests/relay.test.mjs` — **26 passed, 0 failed, 0 skipped**. Output: `evidence/node-tests.tap`. Independent Cacophony corpus SHA-256 is `3bde7c09a6f349ee11c825c50fcc02649f8f02a47c857a459206b357f9386cae`; both NNpsk0 flights, payloads, final handshake hash and all four directional transport known-answer frames passed. Those transport frames are test-only evidence for direction, not application transport.

Core regressions cover wrong PSK, wrong room/prologue, tamper, replay, reordering, reflected/relabeled directions, role/context/session/stream substitution, header substitution, partial/mismatched fingerprints, both-device send gate, changed-key flight, reconnect verification reset, authenticated FINAL and UTF-8/padding bounds. Actual `ws` network clients exercise the packaged relay, bidirectional encrypted text, third-entrant rejection, reconnect, Host/Origin/method/path guards, payload size, role-spoofing and per-socket rate closure.

`mv node_modules .build-node_modules; node --test tests/core.test.mjs tests/relay.test.mjs; mv .build-node_modules node_modules` — **26 passed, 0 failed, 0 skipped with node_modules absent**. A shell EXIT trap restored build dependencies. Evidence: `evidence/portable-tests.tap`. This proves the local Node runtime/test path needs no installation; it is not a physical Mac interoperability test.

`python3 -m py_compile tests/browser.py` — **PASS**. `flock -w 180 /tmp/chrome.lock python3 tests/browser.py` — **PASS: 55 assertions**, using `/usr/bin/chromium --no-sandbox` with two independent browser contexts. Final output: `evidence/browser-run.log`; machine-readable evidence: `evidence/browser-results.json`. **Zero page errors, zero console errors, zero CSP violations, zero third-party requests.**

Browser evidence includes full matching fingerprints, pre-verification lock, one-sided comparison still locked, bidirectional authenticated Unicode text, hostile markup as text, actual wire absent plaintext/invite secret, no local/session storage or cookies, clear/cancel, reduced motion, disconnect/reconnect fresh fingerprint and reset comparison, mismatch closure, tamper/replay rejection and large-row hover emphasis. The tamper/replay browser harness mutates/repeats **actual outgoing encrypted frames with a test-only WebSocket.send hook**; it is not a shipped attack feature or independent malicious relay implementation. It uses the real normal receiver authentication path.

Landing and conversation were checked at **390, 820 and 1440 CSS-pixel widths in both light and dark**, with no horizontal clipping. Eighteen unique PNGs are in `shots/`, including large fingerprint hover, compact verification, conversation, closed state and tamper/replay failures. Final desktop/mobile screenshots were visually inspected. Keyboard Enter sending, text-only DOM, reduced-motion outcome and cancellation are exercised; exhaustive screen-reader/IME/200%-zoom testing is not claimed.

`npm audit --json` after upgrading ws to 8.23.0 — **0 reported vulnerabilities** (`evidence/npm-audit.json`). The initial ws 8.18.3 selection was rejected because the registry reported memory-disclosure and fragmentation-DoS advisories. No claim that an audit database result establishes cryptographic security.

## Actual defects found and fixed

The first browser harness used `wait_for_function`, whose string eval was correctly blocked by the strict policy. It was replaced with locator assertions; **CSP was not weakened**. Preserved failure evidence: `evidence/browser-initial-harness-failure.log` and `.json`.

The browser reconnect scenario exposed a real same-document fragment-navigation defect: a new invite opened in an already-open tab did not rerun initial import. Added a fragment-change handler that strips the fragment before creating the new session; released the initial fragment reference. The same browser scenario now passes and demonstrates fresh fingerprint plus send lock. Before-fix evidence: `evidence/browser-reconnect-regression-before.log`.

The first build script used a URL object with process.chdir; converted it with fileURLToPath. No cryptographic fallback or protocol change was introduced to resolve integration problems.

## Reference influence — only what was used

Read existing `analysis/p6-security/01–06` and `analysis/p6-p2p-encrypted-chat.md`; no repeated vendor surveys. Read build-principles, poteto-agent-code-quality, adapted socratic-build-coach, emil-design-eng and apple-design skill files. Apple foundations were applied; individual HIG reference pages were not consulted or cited. Read Nave DESIGN-RATIONALE section 12, CSS/index/app/plates/nave and inspected its font directory. Read unfold sketch.ts, paperMaterial.ts and fold.ts. These informed SF-system typography, generous spacing/buttons, seeded wobbly SVG strokes, paper-cut surfaces and restrained reduced-motion-aware transitions. No SF or Caveat font files were copied.

Searched and opened `https://www.inspora.design/websites` and `https://www.unkey.com` with text extraction. Inspora listed Unkey; Unkey's direct headline and progressive explanation informed concise stage labels. These were text visits, not visual site-browser inspection. No external image assets or generated media were used.

After the browser core passed, read the supplied read-only Hub v3 DESIGN-KIT.md, public style.css, illustrations.js and index.html. Applied only a hand-drawn box mark, four large indexed fingerprint rows, real comparison-status rows, word highlights and hover sibling greying that preserves readable contrast. No Hub URL imports, no wholesale redesign, no shortened fingerprint and no security-gate changes. Fingerprint rows are static data; highlighting never grants verification. All required 64 hex characters stay visible and comparisons still use the full core value.

## Proposed, deferred and limits

**Deferred:** actual WebRTC P2P, TURN/STUN/ICE, two physical devices/networks, public HTTPS deployment, server-ingress Wire Receipt, audit/independent protocol review, Safari/Firefox, signed/pinned delivery, short-code PAKE, QR comparison, accounts, groups, attachments, background delivery, read receipts and persistent history. None is presented as implemented.

The older WIP `sodium-javascript@0.8.0` Noise browser backend is a known maintenance/review caveat; active parent libraries do not erase it. The composition is not audited or equivalent to Signal. No post-compromise recovery, anonymity, endpoint-integrity measurement, remote deletion or forensic zeroization is promised. A malicious delivery origin, compromised/monitored endpoint, invite thief or intentional recipient remains material. The relay sees IPs, room associations, roles, times and size buckets and can deny service. Use an established audited messenger for sensitive conversations.

The scope is intentionally a working local slice, shipped early in accordance with the time-save priority. No background q6 service or Chromium process was left running by the test harness.
