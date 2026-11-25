# Glassbox threat model — prototype

## What is built

Two browser endpoints share a 32-byte CSPRNG invite, imported from the URL fragment and stripped from the current history entry. WebCrypto HKDF-SHA256 derives a separate 128-bit route identifier and 256-bit PSK. A two-flight Noise NNpsk0 handshake binds the version, suite, room, canonical creator/invitee roles, and fresh random payload nonces. No chat is in a handshake payload.

The final handshake hash feeds a domain-separated SHA-256 fingerprint and HKDF-separated control/chat stream keys in each direction. The adapter uses `initiator.tx → responder.rx` and the reverse, verified against independent Cacophony transport vector bytes in tests. Application code cannot access the test-only Noise transport cipher; it uses libsodium secretstream instead.

Both endpoints exchange fresh stream headers, then secretstream-authenticated control confirmations that bind both participants' control/chat headers. Each frame binds protocol/version, room, final session fingerprint, sender/receiver roles, stream context and exact sequence through authenticated associated data. Plaintext is released only after authentication, validation and comparison gating. Wrong sequence, context, ciphertext, tag or key-change flight aborts the whole session.

The full 256-bit fingerprint must be independently compared on **both** devices. The app requires all 64 hexadecimal characters and sends an encrypted comparison control record. It cannot establish whether a person actually used an independent trusted channel; the UI says “Compared on this device,” not “identity guaranteed.” A stolen invite is a bearer credential that can race, impersonate or deny service. Reconnect cannot reuse a comparison.

## Named adversaries

**A curious or malicious relay without the invite** receives public handshake bytes, stream headers, ciphertext, roles, opaque room association, source IPs, timing and length buckets. Correct encryption protects content under the endpoint/client-code assumptions. The relay can modify, replay, drop, reorder, censor or close connections. Tests reject modifications/replay before transcript display. An authenticated FINAL indicates peer closure; a missing FINAL is an unclean close, not proof of an attack. No anonymity or availability guarantee is made.

**A malicious client-delivery origin or local administrator** can replace HTML, JavaScript, CSP and SRI together and steal secrets before encryption. Hash-based script CSP, a narrow worker path, Trusted Types, SRI, no inline handlers, no JS eval, no external scripts/fonts, no-referrer and COOP reduce accidental injection/leakage, not malicious origin authority. The worker policy allows only WASM compilation, with no network destinations. An independently delivered signed/pinned client is deferred.

**A compromised or monitored endpoint** can read plaintext input/output. Extensions, screen sharing, a remote browser operator, OS malware, organizational monitoring, input methods and clipboard tools may observe their permitted surfaces. Glassbox neither detects nor certifies their absence and does not bypass organizational policy.

**The intended recipient** can copy, transcribe, photograph or forward messages. Clear This Device cannot erase the recipient's copies. There are no screenshot-prevention or remote-deletion claims.

**Later memory access** can expose retained data despite application clearing. JS strings, DOM, worker messages, JIT/GC copies, browser process memory, swap and crash dumps are outside reliable erasure control. `libsodium-wrappers@0.8.4` has numeric WASM stream states and no public free() API. The app bounds each worker to one 15-minute session with record limits, drops reachable keys and terminates the worker. It does not promise zeroization, forensic erasure, an independently verified forward-secrecy property or post-compromise recovery.

## Local service boundary

The Node server binds `127.0.0.1` and checks exact Host and WebSocket Origin, two participant slots, known roles, 8 KiB messages, 64 KiB per-socket buffering/one-second ingress budget, 40 frames/second, 60 upgrades/minute/IP, 600 HTTP requests/minute/IP, 32 rooms, 64 WebSocket peers and a 15-minute expiry. It has no database, accounts, file writes, access logging, payload logging, telemetry or model calls. Temporary IP counters and live routing information remain in memory. A trusted operator could replace the implementation or capture traffic; tests cannot attest absence of external logging.

HTTP/WS on loopback is the deliberately scoped local demo, not internet-grade transport or a two-device deployment. The browser cryptographic records are endpoint-to-endpoint; the relay is not trusted with plaintext. WebRTC, ICE, STUN, TURN, direct-peer IP behavior and actual P2P are not implemented or claimed.

## Composition and dependency limits

Pinned runtime: noise-handshake 4.2.1, sodium-javascript 0.8.0 browser backend, libsodium-wrappers/libsodium 0.8.4 and ws 8.23.0. The Noise candidate's older WIP browser backend is a known limitation; maintained parent libraries do not make that backend audited/current. The general Noise transport nonce wrap is reproduced by a regression and forbidden in application code. No custom cryptographic primitive, fallback suite, short password, short SAS or hand-written ratchet is used. The application framing/key separation remains an unaudited composition and can contain implementation defects despite tests.

## Intentional exclusions

No accounts, groups, files, rich text, previews, history database, backups, typing indicators, read receipts, automatic retries, offline messages, QR camera, short-code pairing, Double Ratchet, Tor, post-quantum protection, model processing or content analytics. Real sensitive communication belongs in an established audited messenger.
