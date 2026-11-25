# Problem 6 research notes

Read complete shared brief and required local Emil/Apple, build-principles, poteto, deep-research, workflow-composer and Durable Objects skills. Parent-only workflow orchestration is unavailable by assignment; no child agents or parent-only tools invoked. This is analysis, not a product build.

## Emerging decisions

Provisional concept: a two-person, ephemeral, proof-first chat called Glassbox (working name, not trademark-checked). Do not copy hacker-neon/glassmorphism templates. A calm laboratory-instrument identity with pale cool surfaces, indigo content-boundary and amber metadata.

Security distinction: WebRTC SCTP/DTLS encrypts transport, but signaling can substitute SDP fingerprints unless authenticated. Application E2EE must remain valid over a malicious signaling server or WSS fallback. A bearer room secret in fragment is never sent in an HTTP request but remains available to same-origin JS, extensions, browser history/sync, screenshots and any application the invite is pasted into. Derive opaque routing id and authentication keys with distinct HKDF labels; never use low-entropy short-code hashes as security. Human verification binds the actual interlocutor, not just possession of link. No permanent account means TOFU only within the current room; reload means new peer state and re-verification.

Need decide library-backed Noise versus a clearly experimental WebCrypto authenticated ephemeral-ECDH + symmetric ratchet. No homemade Double Ratchet or Signal-level claims. Ordered reliable transport allows strict next-sequence policy rather than an unbounded skipped-key cache. Rekey must not reset nonce/key incorrectly. Honest forward-secrecy statement depends on key deletion and cannot imply post-compromise security.

## Opened sources

- https://signal.org/docs/specifications/x3dh/ — async offline prekey handshake; identity verification still required; prekeys/replay considerations.
- https://signal.org/docs/specifications/doubleratchet/ — symmetric chain gives past-key protection but not break-in recovery; DH ratchet adds fresh entropy; current spec also includes PQ extensions, so old classical Signal assumptions are incomplete.
- https://noiseprotocol.org/noise.html — standard handshake transcript, chaining keys, NNpsk0/NNpsk2/XXpsk3 patterns, PSK validity rule.
- https://matrix.org/docs/matrix-concepts/end-to-end-encryption/ — Olm peer device sessions; Megolm outbound per sender, message-index replay protection, verified device key sharing. Tutorial includes historical libolm calls; do not recommend deprecated library without checking.
- https://magic-wormhole.readthedocs.io/en/latest/welcome.html — SPAKE2 PAKE, one-time short codes, mailbox and encrypted transit relay. Default low-entropy code still has online-guess probability; do not call any six digits secure without PAKE.
- https://peerjs.com/docs/ — PeerServer sees session metadata and candidates; convenience transport not identity/authentication.
- https://github.com/schlagmichdoch/pairdrop/blob/master/docs/faq.md — WebRTC/TURN routing and explicit need to trust signaling; encrypted signaling and verification are described as planned.
- https://docs.onionshare.org/2.6/en/features.html — chat history absent, random names, Tor onion encryption terminates at host chat server; no own participant-to-participant chat crypto; host trusted.
- https://briarproject.org/how-it-works/ — direct sync, Bluetooth/Wi-Fi, Tor online; explicitly scopes adversary and device compromise assumptions.
- https://cwtch.im/ — all communication over Tor v3; decentralized multi-party and metadata-resistance target.
- https://getsession.org/ — no phone/email, onion routing, distributed nodes; public marketing is not sufficient source for cryptographic guarantees.
- https://jami.net/why-is-jami-truly-distributed/ — explicitly admits bootstrap, DHT proxy, name, push and TURN services despite distributed design; article dated 2019, current architecture must be corroborated.

## Library and browser decision evidence

https://github.com/holepunchto/noise-handshake — opts.psk only supports psk0, not psk2/psk3. Do not recommend XXpsk3 with this package. NNpsk0 suits no persistent identity / two peers sharing a 32-byte secret. README rx/tx explanations conflict with usage/source. https://github.com/holepunchto/noise-handshake/blob/main/noise.js final(): initiator.tx=k1 and initiator.rx=k2; responder.tx=k2, responder.rx=k1. Must hide package names behind sendKey/receiveKey adapters and assert directions with vectors. Source _clear zeroes e and re, but retained s/psk and exported split-key copies require explicit lifecycle cleanup. package.json opened: sodium-universal dependency and node/bare tests; browser build not runtime verified.

https://github.com/holepunchto/sodium-universal — Browser support via sodium-javascript peer dependency and package browser-field; browserify example; no parity with native. Noise package browser integration plausible, not yet verified in Vite/Safari runtime. https://github.com/holepunchto/noise-handshake/tree/main/test — tests include against-ref.js, cipher.js, handshake.js, payload.js. Need inspect against-ref.js to substantiate known vectors.

https://libsodium.gitbook.io/doc/secret-key_cryptography/secretstream — high-level ordered stream detects modified, reordered, removed, duplicated records; nonce management built in. TAG_REKEY forgets current/past keys after record, TAG_FINAL authenticated close. Truncated tail only known if expected final missing; network silence alone cannot prove attack. Rekey is one-way, not fresh DH, so no post-compromise recovery.

https://github.com/jedisct1/libsodium.js — standard libsodium-wrappers includes secretstream, no need sumo. await sodium.ready; browser WASM + pure-JS. Current README state is numeric opaque StateAddress, requires sodium.free(state) once; don't use after free. memzero Uint8Array only not all JS copies/strings. CSP needs wasm-unsafe-eval for WASM compilation where required, not JS unsafe-eval; test pure-JS fallback under actual CSP rather than weakening blindly.

https://libsodium.gitbook.io/doc/key_exchange — rx/tx keys separate directions; public keys must be known/authenticated; primitive alone doesn't prove who peer is. Ephemeral-ECDH+secretstream and PSK requires protocol composition review, so use existing Noise handshake and explicitly label whole composition unaudited.

https://noiseprotocol.org/noise.html — Noise split key order c1 initiator→responder and c2 reverse. Continuous Rekey after each record protects older ciphertext; doesn't reset nonce; no fresh entropy/recovery. Handshake hash is channel binding. Recommend NNpsk0 + two independent directional control streams and two directional chat streams, each domain-separated HKDF from split keys; delete all split key copies after initialization. This is Noise handshake + libsodium record layer, NOT an unmodified Noise transport or audited composed protocol.

https://support.signal.org/hc/en-us/articles/360007060632-What-is-a-safety-number — safety-number comparison is key verification, not proof of human identity; users associate key via trusted external channel. Verified key change requires manual approval before new send, undelivered old-key messages not resent.

https://github.com/matrix-org/vodozemac — pure Rust Olm/Megolm modern alternative to libolm; repo states Least Authority audit with no significant findings. Do not equate primitive/library audit with app audit. https://spec.matrix.org/latest/client-server-api/ fetched partially but wrong sections; SAS commitment details NOT yet verified.

https://getsession.org/faq — current FAQ says Session lacks PFS; protocol v2 under development intends PQ and re-implement PFS. Do not claim current PFS or PQ support. Marketing no-trail/no-breach claims are too absolute to copy.

https://docs.openprivacy.ca/cwtch-security-handbook/risk.html — explicit metadata who/where/when/context correlation; display-name misrepresentation; physical endpoint attack not defendable.

https://docs.jami.net/en_US/developer/jami-concepts/index.html — current official docs: CA/account/device certificate chain, account local, DHT connection requests, ICE P2P TCP then TLS multiplexed socket, swarm Git repos synced devices. Corroborates old article distributed != no discovery/relay infra. Failed URL /developer/going-further.html not source.

## Transport, platform, security sources

https://www.rfc-editor.org/rfc/rfc8827.html — even HTTPS signaling server can MITM SDP fingerprints; independent key verification required. SCTP over DTLS data; SRTP is media, not chat data channel encryption.
https://www.rfc-editor.org/rfc/rfc8831.html — reliable ordered mode appropriate chat; DTLS protects SCTP; network retries/order not application replay protocol.
https://www.rfc-editor.org/rfc/rfc8828.html — ICE leaks additional public/private network data and split VPN routes; relay choice is anonymity/privacy tradeoff not encryption.
https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection — iceTransportPolicy relay only considers relayed candidates. Must choose before creating PC; never briefly direct-gather then flip relay. No camera/mic needed for data channels.
https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel/bufferedAmount — queued bytes only, not remote receipt. Closed channel count can remain; guard readyState. Use low threshold and max 64KiB queued; no delivery assertion from send().
https://developers.cloudflare.com/realtime/turn/generate-credentials/ — long-term TURN key server only; issue short-lived credentials to clients; TTL > expected session and refresh; paid external infra optional, no purchase.
https://developers.cloudflare.com/durable-objects/best-practices/websockets/ — acceptWebSocket Hibernation; memory reset on eviction; getWebSockets and attachments reconstruct live peers. Attachments persist live socket until disconnect (16KiB max), not permanent data. Don't persist chat/SDP/debug payloads to SQL; minimal role/join time/expiry attachments only. General skill persist-first rule is inappropriate for ephemeral message content; durable expiry/tombstone optional only metadata.
https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment — fragment not sent HTTP, but client processes and can leak via scripts/browser sharing.
https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP — hash/nonce strict CSP, no unsafe-inline or unsafe-eval; CSP under malicious document host is not protection from that host replacing policy.
https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity — verifies expected subresource; hostile origin can replace top-level HTML and hash, so independent published artifact hash/pinned build helps only when independently verified.
https://developer.chrome.com/docs/modern-web-guidance/guides/security/client-side-encryption — current source X25519 Baseline newly available since 2025-02-06; Chrome133/Firefox130/Safari17 listed. New KEM/ChaCha APIs explicitly volatile/single-engine; do not bring to MVP. Choose native WebCrypto X25519+HKDF+AES-GCM if alternate protocol, P256 older-browser fallback with full suite-binding; Ed25519 signing not key exchange.
https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey — nonextractable private CryptoKey still usable by same-origin JS, public extractable; workers available; feature detect actual operation.
https://wicg.github.io/webcrypto-secure-curves/ — unofficial CG proposal, X25519 agreement vs Ed25519 signatures, all-zero DH reject; source draft date 2026-01-28.

## Motion + palette

https://gsap.com/docs/v3/GSAP/Timeline/ — position labels/overlap, pause seek reverse kill revert; optional proof-only timeline. Do not use ScrollTrigger/SplitText/Flip on high-frequency chat. https://threejs.org/docs/pages/WebGLRenderer.html — WebGL2, info and dispose; 3D security tunnel not helpful, reject in MVP.

Emil design-eng/animate/choreograph/apple-design and animate RECIPES read fully. Exact rules: keyboard initiated actions no animation, transform/opacity only, one entrance/container not children stagger, no scale0 or transition all, cheap CSS/WAAPI first, interruption survives abort/retrigger, reduced-motion static staged frames. Curves .23,1,.32,1 ease-out, .77,0,.175,1 ease-in-out. Mouse popover 200ms scale .95 origin trigger, exit 150ms, keyboard instant. Button .97 160ms on pointerdown; no bounce. Proof educational timeline may run 600–900ms only opted-in, never delays cryptographic transmission. Keep safety numbers static.

Apple HIG local accessibility/layout/typography/color/designing-for-macos/privacy/motion/text-fields/notifications/alerts + cross-platform read. Accessibility 200% text, color not sole carrier, mobile44px targets/desktop28px minimum comfort; web choose44px all interactive, at least16px body. Font rem zoom, native menu bar not browser imitation. Composer textarea (text view), persistent label, IME safe sends. No plaintext notifications per notifications › Best practices. Burn confirm+Cancel and Escape, not mandatory hold2s (mobility/evasion urgency). No substantive content on translucent cards; glass-box refers explainability not cosmetic blur.

Palette contrast computed in Python: light #F3F6FA, body #26324A 11.83:1, muted #596780 5.27:1, primary #464BB5 6.60:1, metadata #855C12 5.48:1; dark #1B2536, body #E3EAF6 12.73:1, muted #A9B5CE7.47:1, primary #B3B7FF8.16:1, metadata #E4B66C8.21:1. White on #464BB5 action7.16:1. Semantic mapping primary marks action/boundary? separate accent action vs verified icon neutral/turquoise; do not one color two unrelated meanings. Palette design choice security instrument, not generic near-black neon. System sans + system mono avoids remote fonts and extra privacy network. One distinctive element: inspectable wire receipt with server bytes and endpoint transcript side by side.

Time estimate sums verified: slices15,25,35,25,20,20,15 =155 min; first real secure P2P loop first3 =75 min, estimates not implementation benchmarks.

## Final decision / material validation findings

Final report is complete at analysis/p6-p2p-encrypted-chat.md. Recommend P2, proof-first Glassbox; experimental two-person ephemeral chat, not real-sensitive-content tool. Browser protocol integration is a stop/go gate. Time estimates revised from provisional75/155 to100min encrypted P2P loop and185min full demonstration:20+35+45+30+20+20+15, arithmetic checked. Max100messages memory-only,4KiBencoded text,256bytepad buckets,64KiBsendqueue.

Use full256bit groupedhex+QR fingerprint; a shortSAS is deferred. Current Matrix spec was successfully opened by a small batch curl/filter script using system TLS trust: https://spec.matrix.org/v1.19/client-server-api/ confirms commit-before-reveal DH exchange, MAC verification and independently authenticating out-of-band comparison channel. Do not copy just six friendly digits. No automatic human identity proof from matching fingerprint or self-attested comparison.

Critical discovery from successfully opened https://raw.githubusercontent.com/holepunchto/noise-handshake/main/test/against-ref.js: every reference comparison is test.skip, ref import commented out. This is NOT passing interoperability evidence. Source https://raw.githubusercontent.com/holepunchto/noise-handshake/main/cipher.js uses DataView.setUint32(4,counter,true), so32bitnoncecounter only; do not assume full64bitNoisetransportbehavior. It is bounded-handshake candidate only; independently validate NNpsk0 vectors, key directions and browser integration. Underlying Noise _clear also leaves unusedstatic/PSK/output copies, so wrapper lifecycle must clear all reachable copies. Overall Noise handshake+HKDF separated control/chat secretstream composition remains unaudited.

Python urllib batch failed localCA verification; re-ran with /usr/bin/curl and system TLS trust, not --insecure, successfully retrieved sources. Snapdrop official README opened at https://raw.githubusercontent.com/RobinLinus/snapdrop/master/README.md (HTML5/ES6/WebRTC/WebSockets/Rust/PWA). PairDrop/Snapdrop combined landscape item cites PairDrop's actualFAQ and avoids signaling-trust claims.

No productbuilt, packages installed, GUI launched, system permissions changed, parent-only MCP invoked or secret stored. All requested artifacts are confined to the two assigned analysis files. No owned child jobs.
