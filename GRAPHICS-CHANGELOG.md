# Glassbox — graphics refinement

Completed 25 November 2026, 23:42 +08. Scope: visual refinement only, preserving the existing conversation flows and safety gates.

## What changed

The generic envelope/padlock hero is now a locally drawn transparent glass box. Its wobbly double-pass ink edges and layered light washes use drawing primitives copied/adapted from the supplied Hub v3 `public/sketch.js`; `illustrations.js` and the design kit informed the visual language. No Hub URLs, stock images, external assets, models, or third-party network calls are used.

Inside the box, two readable chat bubbles and their message path remain visible. Outside the glass wall, only scrambled ciphertext/hash marks appear. The illustration explicitly labels “what you see” and “what the relay sees”; a visible fingerprint plate on the wall connects to “compare the fingerprint.” The caption says that message text stays at the endpoints while metadata remains visible to the relay. The header mark and favicon now depict the same two-person box rather than an envelope or generic lock.

A small glass-box mark persists through waiting, comparison, conversation, and closed states. It is dim before comparison, steady/lit only when the real snapshot is `READY`, both `compared` and `peerCompared` are true, `canSend` is true, and the socket is open. Closing/rejecting a session makes the mark dim and visibly cracked, with calm “Session closed · compare again” copy. The mark observes state; it cannot enable sending or alter a comparison.

Motion is limited to meaningful objects: ink paths draw on, the wall pane slides into place, and an example plaintext packet becomes ciphertext at the wall. In the conversation, the seal animation replays only after the actual encrypted send succeeds. No user message text is copied into the artwork, and no delivery receipt is implied. Geometry reveals before labels, using `cubic-bezier(.25,1,.5,1)`. View changes are hard cuts. Reduced-motion mode shows the complete static artwork with the packet already outside as ciphertext.

The existing palette/tokens and interaction flows are retained. There are no gradients, blur effects, emoji, inline scripts, or inline event handlers. Existing comparison instructions, both-device gate, fingerprint characters, normal-mode unaudited-prototype honesty copy, relay-vs-WebRTC distinction, and “Know what’s outside it” disclosure remain intact.

## Files

Authored changes:

- `src/index.html`: product-specific header mark, hero figure, session-state marks, and seal container.
- `src/style.css`: local ink/wash language, meaningful object motion, hard-cut views, responsive presentation, reduced motion, and capture-only display rules.
- `src/app.mjs`: drawing primitives/artwork and passive visual hooks only; presentation-only `capture=1` detection occurs before an invite fragment is stripped.
- `src/favicon.svg`: transparent two-person box mark.
- `GRAPHICS-CHANGELOG.md`: this report.

Generated via the unchanged `npm run build` / `scripts/build.mjs`: `dist/app.js`, `dist/index.html`, `dist/style.css`, `dist/favicon.svg`, and `dist/INTEGRITY.json`. The build also reproduces the vendor runtime and dependency/license inventory; all three tracked vendor-runtime hashes remain byte-identical to the pre-refinement build.

Verification/capture artifacts are confined to owned `shots/**`: `graphics-browser.py`, `graphics-browser-results.json`, `graphics-browser.log`, `graphics-build.log`, `graphics-static-checks.log`, and refreshed PNGs. `graphics-browser.py` reads the existing `tests/browser.py` and adapts its runtime to port 5821 and owned output paths; it does not edit that test.

No changes were made to `server.mjs`, `src/core.mjs`, `src/deps.mjs`, `src/worker.mjs`, the build script, package files, crypto, or the relay/handshake tests. No nested agents were started.

## Verification

The final full browser run passed **95 assertions**, with **zero page errors, zero console errors, zero CSP violations, and zero third-party requests**. It uses `/usr/bin/chromium --no-sandbox` under exclusive `flock -x /tmp/chrome.lock`, with a fresh server on **5821**. No server was started on 5816. The test server was stopped after verification.

Coverage retains the existing real-worker checks: identical complete 256-bit fingerprints; disabled pre-comparison composers; one comparison insufficient; both comparisons required; bidirectional authenticated messages; hostile markup rendered as text; wire content contains neither plaintext nor invite secret; local clearing; no local/session storage or cookies; tamper and replay fail-closed rejection; mismatch; reload/disconnect; fresh reconnect fingerprint and no inherited comparison; malformed invite handling; reduced motion; and no horizontal clipping. Additional assertions check passive live/cracked marks, capture-mode gates, meaningful motion, static reduced-motion artwork, and 44px home/chat control targets across every tested width/theme.

`npm run check` passed **10 JavaScript syntax checks**, plus the existing persistence/logging/eval/text-only-DOM/Noise-transport bans and HTML inline-script/handler/style bans. `npm run build` passed.

**42 unique PNG files** were refreshed (43 screenshot writes; the initial expanded-wire conversation screenshot is overwritten by the normal collapsed-wire matrix). The required normal matrices are:

- `shots/home-{light,dark}-{1440,820,390}.png`
- `shots/conversation-{light,dark}-{1440,820,390}.png`
- `shots/rejected-{light,dark}-{1440,820,390}.png`

There are also **18 capture-mode PNGs** covering the same three views, widths, and themes:

- `shots/capture-home-{light,dark}-{1440,820,390}.png`
- `shots/capture-conversation-{light,dark}-{1440,820,390}.png`
- `shots/capture-rejected-{light,dark}-{1440,820,390}.png`

Verification/rejection evidence additionally includes fingerprint hover/comparison, reduced-motion reconnect, tamper, replay, and cleared-session images. Final desktop hero, phone dark conversation, and medium light rejected-state captures were visually inspected for clipping and product accuracy.

## CSP / integrity

The unchanged build script regenerates the app/style SRI attributes in `dist/index.html` and the SHA-256 manifest. The server computes its CSP app hash and caches assets **at startup**, so an already-running Glassbox server must be restarted by its owner to serve this build consistently.

Current SRI values:

```text
app.js    sha256-OrjiV1GMTwVXVLVyv4bbpc2M+emm1CeUU7dBZJTwiUw=
style.css sha256-vhsAP4jUqORbyGu0pNYYqTDItkGM4b2w2fPcIpsdCGg=
```

Changed SHA-256 manifest entries:

| File | Before | After |
| --- | --- | --- |
| `dist/app.js` | `9ed8cce4e79f331b2530508bde6e7b133d55f2d7629a2d11794b923107b4f7c4` | `3ab8e257518c4f055754b572bf86dba5cd8cf9e9a6d4279453b7416494f0894c` |
| `dist/index.html` | `ebfafc773413a18eb5505b3246a4e942f9124d31e58bdbc9a46dedaeb9e4ab78` | `c4dee6b4f4098f1487d34a4482bf6de0e74c1ccf2147fe543961b32e7c3592a3` |
| `dist/style.css` | `eaccf74afff1afa7843bb65688e10a239891be3bdec3a1ed53867d725dcba208` | `be1b003f88d4a8e45bc86bb4a4d618a930c8b6418ce1bdb0d9f3dc229b1d0868` |
| `dist/favicon.svg` | `3572bb48c0c2be207fdedac39b0a8899b6b13422de0c9da04f55bfcaecd1bc5a` | `a27cf1aff1503adbbd8dfcdee496d139a5518368636a683e2ee99863b9101ab1` |

Unchanged vendor hashes:

```text
session-worker.js d3d91df7a3ed68dfc58f46376c0cea9929efa8ee388927f069ebc3e29cb8d5c9
core-test.mjs     6338ccd7fe4237bced5dae746fdfe07b178af0e51e59aaae5d092be010833123
ws.cjs            e58ad51982ab29f723e45de7ddae91f0ebbf4e67bdf2a646216a9fccdc841ec4
```

## Integration limit: capture shell URL

The UI implements `?capture=1` and hides only the top-level prototype label and encrypted-wire inspector. It does **not** hide the fingerprint/verification UI, session-state label, safety gate, clear controls, relay metadata warning, or outside-boundary disclosure. The final capture-mode tests verified real comparisons, sends, and tamper rejection without changing any gate.

However, the concurrently owned server currently matches `/` exactly: a direct `GET /?capture=1` returns 404. That file was not modified. To keep the evidence honest, the harness loads the real `/` HTTP response and uses an init-script `history.replaceState` to supply `capture=1` **before app boot**. No worker, socket, gate, endpoint, CSP, or security policy is mocked. An earlier synthetic-response adapter was discarded because Chromium treated its address space differently; the final pass has no such adapter or error.

**Required server-owner follow-up:** allow the public `/` shell with the presentation-only `capture=1` query in both static shell lookup and the cross-site top-level shell-navigation predicate. Keep the Host/origin checks, protected asset rules, and WebSocket upgrade policy unchanged. Then restart the owned server and rerun the harness; it automatically detects native query support and omits the history adapter. Until that server integration is done, direct `/?capture=1` is not claimed to work.

The box is a visual explanation of the implemented prototype, not proof of absolute security, endpoint integrity, retention behavior, delivery, or an audit. Sensitive use still calls for an established audited messenger.

## Connected moment

Completed 26 November 2026, 00:05 +08. A passive full-screen SVG glass box now lights once per session, only under the existing live-mark gate: `READY`, both full fingerprints compared, `canSend`, and an open socket. It uses the local double-pass ink primitives, existing amber `--alert` token, and a presentation-local moss companion. Caption: “Connected. You can see this; the relay cannot.” The metadata boundary remains explicit. No gradients, emoji, inline scripts, or external assets were added.

The moment auto-dismisses after 1,500 ms, also dismisses on click or Escape, and returns focus to the enabled chat input. It is never a modal or sending gate; `pointer-events:none` applies even while visible. Reduced motion shows the complete static card for the same duration. A separate polite, atomic live region announces connection. Disposal/rejection removes the artwork immediately, and ordinary chat updates cannot replay it.

Authored changes are limited to `src/app.mjs`, `src/index.html`, `src/style.css`, this changelog, and owned `shots/connected-*` evidence. The unchanged normal `npm run build` regenerated `dist` SRI and `INTEGRITY.json`; vendor-runtime hashes stayed identical. Server, CSP, protocol, crypto, Noise/secretstream, worker, and build-script sources were not modified.

Verification: `npm test` **32/32**; `npm run check` **passed**; one Python Playwright Chromium launch (`/usr/bin/chromium --no-sandbox`) under `flock -x -w 120 /tmp/chrome.lock`, test port **5826**, **40 checks passed**, **zero page/console/CSP errors**. Real clients verified both fingerprints, sent authenticated text while the artwork was visible, and observed automatic dismissal at **1,500.3 / 1,500.4 ms**. Click/Escape, focus return, once-per-session behavior, static reduced motion, and no artwork on rejection passed. Native `/?capture=1` rendered without an adapter (the existing server already supports it; the historical integration limit above is resolved by server-owner changes, not this frontend task). The test server was stopped. Screenshots: `shots/connected-moment-1440.png` and `shots/connected-moment-390.png`. Original frontend/dist backup: `/tmp/q6-backup`.
