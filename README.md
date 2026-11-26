# Glassbox

A two-person, ephemeral encrypted-chat **prototype**. It is not audited and should not be used for sensitive conversations. This version is application-layer E2EE over a **local WebSocket relay**, not WebRTC P2P.

## Run — no install

Requires Node 22 or newer. From this folder:

```sh
node server.mjs --port 4816
```

Open **http://127.0.0.1:4816**. Create a conversation, copy its private invite, and open that invite in a second browser context on the same computer. Compare **all 64 hexadecimal fingerprint characters** in person or through an independently trusted channel. Paste the other endpoint's complete fingerprint on each device to unlock sending. A missing or mismatched comparison never enables the composer.

The server deliberately binds loopback only and rejects foreign Host/Origin values. This is a same-computer browser demonstration. Two physical devices or networks require a separately designed/authenticated HTTPS deployment; do not expose this HTTP server to a LAN. The default final Mac port is 4816. Sandbox verification uses 5816. No Mac execution is claimed.

Messages are text-only, padded to 256-byte buckets, capped at 4,096 UTF-8 bytes. Both peers must be online. Sessions last at most 15 minutes and 100 outgoing chat records per direction; the UI retains at most 100 transcript entries. Reload, close, authentication failure or disconnect destroys the current comparison and requires a fresh session. There is no background delivery, retry/resend, message persistence or delivery/read receipt.

## Verify — no install

```sh
node --test tests/core.test.mjs tests/relay.test.mjs
```

The tests use the vendored browser crypto bundle and vendored `ws`, start the actual server on 5816 and stop it afterward. They include the independently published Cacophony NNpsk0 vector, the known forbidden Noise transport nonce wrap, wrong PSK, tamper, replay, role/direction/room binding, full comparison gate, key change, reconnect, FINAL and server guards. Results are in `evidence/node-tests.tap`.

`dist/vendor/` contains all runtime dependencies, licenses and the locked dependency inventory. `dist/INTEGRITY.json` records local build hashes; hashes distributed by the same origin are not independent proof of authenticity. Rebuilding is optional and requires development dependencies: `npm ci --ignore-scripts && node scripts/build.mjs`. Running and Node tests need neither npm nor node_modules.

## Security boundaries

Read [THREAT-MODEL.md](THREAT-MODEL.md) and [BUILD-STATUS.md](BUILD-STATUS.md). The handshake is `Noise_NNpsk0_25519_ChaChaPoly_BLAKE2b` via pinned `noise-handshake@4.2.1`, **handshake only**. Its transport cipher repeats a nonce at 2^32 and is not used for application records. Records use independent directional control/chat libsodium secretstreams, with room/session/role/direction/sequence associated data and rekey tags. This unaudited composition is not unchanged Noise transport.

The browser backend for the Noise candidate is `sodium-javascript@0.8.0`, an older WIP dependency. Passing vectors is not an independent audit. Standard `libsodium-wrappers@0.8.4` supplies secretstream and has no public `free()` for its numeric WASM states; one bounded session lives in each worker, which is terminated when the session ends. This limits lifetime, not forensic recoverability or guaranteed zeroization.

Authentic client code and uncompromised endpoints remain assumptions. A malicious origin, extension, OS, organizational monitor or recipient may see plaintext. Invite-sharing apps/clipboard managers can retain the link; possession is not a person's identity. Relay metadata, denial of service, recipient copying and absence of post-compromise recovery remain. Use an established audited messenger for real secrets.

## Q6 navigation fix — 2026-11-25

A cloud reproduction found that **both** `localhost:5816` and `127.0.0.1:5816` already served ordinary root requests, but the unconditional cross-site HTTP guard blocked safe top-level links from another site. `server.mjs` now permits only exact `/` GET/HEAD requests with `Sec-Fetch-Mode: navigate` and `Sec-Fetch-Dest: document`. Exact Host, supplied Origin and forwarded-host defenses still apply; direct cross-site assets, health/API requests, fetches and embeds still reject. WebSocket Origin stays required and exactly bound to Host. There is no wildcard or CORS bypass and no crypto change.

The updated full Node suite passed **31/31** tests. See [the bug/fix note](../p6-security/HOST-NAVIGATION-FIX.md), [pre-fix reproduction](evidence/host-navigation-before.txt), [test-first failure](evidence/host-navigation-regression-before.tap), [passing regressions](evidence/host-navigation-node-tests.tap), and [post-fix HTTP evidence](evidence/host-navigation-after.txt). The focused real-link browser harness must hold the shared lock:

```sh
flock -x -w 120 /tmp/chrome.lock python3 tests/host-navigation-browser.py
```

The harness owns its temporary :5816 server, verifies actual browser-generated cross-site document navigation to both hostnames, and writes `evidence/host-navigation-browser.json` plus screenshots if it acquires the lock. Check the bug note for the final browser evidence/availability status.

**Restart required:** sync this server file, then restart only the intended Q6 Node process (`node server.mjs --port 4816` for the documented Mac target). Existing relay sessions end on restart; start a fresh conversation. The precise reported Mac failure and its resolution have not been verified on Mac; the reproduced and fixed defect is the cloud Fetch Metadata guard, not a missing localhost allowlist entry.

Browser verification status at 23:34 +08: **blocked by the shared `/tmp/chrome.lock`** after three bounded waits; Chromium did not launch and no screenshot/browser PASS is claimed. The harness syntax passed. See [structured verification status](evidence/host-navigation-summary.json) and [the final lock log](evidence/host-navigation-browser.log). All owned temporary Q6 test processes are stopped; :5816 is free for a later locked browser rerun.


## Cloudflare hosting

Live: https://glassbox.wilsonsoon.workers.dev

The public app uses a native Cloudflare Durable Object WebSocket adapter. Rooms remain ephemeral, matching the prototype; encryption/game logic stays in the original implementation. This remains an unaudited prototype.

Rebuild browser bundles with `npm ci && npm run build`, then build browser assets with `node scripts/build-cloudflare.mjs`, then `wrangler deploy`. The original local Node server remains available.
