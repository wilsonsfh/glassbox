# Problem 6 — Glassbox: encrypted chat with inspectable boundaries

## 1. What a top-scoring answer looks like

Build a two-person ephemeral chat, not a new Signal. Demonstrate a real conversation across devices, an independently exercised malicious relay, and precise claims about each observer. **Priority: P2, high upside but security-intensive.** Estimate 100 minutes to an encrypted P2P loop and 185 minutes to a defensible demonstration; these are planning estimates, not measured build times.

| Assessment dimension | Demonstration and likely grader probe |
| --- | --- |
| Product taste | Calm chat, usable verification, progressively disclosed inspection—not a cryptography dashboard imposed on every message. |
| Implementation/debugging | Two isolated contexts exchange messages; corruption fails; reproduce a key-direction bug and fix it with a test. |
| Architecture | Separate application encryption, transport, identity, routing, key lifetime and delivery. |
| AI efficiency | Give Client bounded adapters and acceptance tests; never ask it to invent a secure protocol. |
| Prioritization | Encrypted relay loop, then P2P, then evidence panel. Cut accounts, groups and attachments. |
| Security/boundaries | Expose metadata, invite leakage and hostile JavaScript delivery. Encryption is not anonymity or absolute security. |

## Differentiator and identity

**differentiator:** Glassbox makes the security boundary the product: two people chat while inspecting the relay’s actual ingress and watching hostile modifications fail before reaching the transcript.

**visual_identity:** A cool-white laboratory instrument, deliberately unlike CABO’s pixels, a voice-input pill, a terminal console or hacker-neon. Pale enamel, rounded inspection apertures and graphite text support reading; indigo means actions, amber means exposed metadata. Pair system sans with system monospace for wire records/fingerprints. Motion is precise and causal, never elastic. “Glassbox” means inspectability, not decorative glassmorphism. The working name is not trademark-cleared.

**Only-this-one-has-it:** **Wire Receipt**, an opt-in real server-ingress record beside the recipient’s authenticated message, plus Tamper/Replay controls in a labelled attack laboratory. Direct mode says “No chat frames passed through this relay.”

**promo_video_beat:** 0–3s: two devices compare fingerprints. 3–7s: “Meet at 6” appears at both ends; relay sees padded ciphertext. 7–11s: flip a byte; “Rejected before display.” 11–15s: burn locally; “Content protected. Metadata visible. Devices still matter.” Record synthetic data only.

## 2. Landscape: ten verified examples

Sources were opened on 25 November 2026; inspiration does not confer their security on this prototype.

| Example/source | Steal | Avoid |
| --- | --- | --- |
| [Signal][1] [2] [3] | Safety-number comparison and key-change blocking; distinguish setup from ratcheting. | Signal parity, asynchronous prekeys, multi-device or post-quantum claims. |
| [Matrix / Olm / Megolm][4] [5] | Device verification and message-index replay discipline. | Group machinery for two people or assuming historical libolm tutorials are current; Vodozemac is the modern Rust alternative. |
| [Magic Wormhole][6] | Genuine PAKE pairing and disposable rendezvous. | Hashing six digits instead of PAKE; low-entropy secrets need online-guess controls. |
| [PeerJS][7] | Small transport abstraction and understandable peer lifecycle. | Treating rendezvous/WebRTC encryption as authenticated personal identity. |
| [PairDrop / Snapdrop lineage][8] | Frictionless browser pairing and TURN explanation. | Inheriting signaling trust: PairDrop’s FAQ explicitly acknowledges this; authentication improvements are described as planned. |
| [OnionShare][9] | No default history; concrete host-role disclosure. | Calling host-terminated Tor chat participant-to-participant E2EE; its chat host is trusted. |
| [Briar][10] | Direct sync, Bluetooth/Wi-Fi alternatives and explicit adversary model. | Browser promises of Tor/offline mesh behavior requiring a different native product. |
| [Cwtch][11] | Treat who/where/when and relationship correlation as security concerns. | Equivalent metadata-resistance claims without Tor and its untrusted infrastructure. |
| [Session][12] | No phone/email account requirement; layered metadata protection. | Absolute marketing language. Current FAQ says PFS is absent and Protocol V2 is under development. |
| [Jami][13] | Separate distributed accounts, discovery, authenticated connections and sync. | “P2P means no services”: current docs describe certificates, DHT, ICE/TLS and swarm synchronization. |

## 3. Product concept and scope

**Core loop:** Create room → privately share invite → second browser joins → authenticate room-secret possession → compare session fingerprint through an independently trusted channel → exchange text → optionally inspect → leave/burn this device’s session.

Exactly two participants; no accounts, background delivery or recovery. Keep at most 100 messages in memory. Reload creates fresh keys and requires comparison again. Block the composer until local comparison is marked complete; say **“Compared on this device,”** not “Identity guaranteed.” Matching codes associate keys with a person only when the external comparison channel identifies them.[3]

**Signature wow:** a genuine message succeeds over the honest relay; changing its actual record makes the receiver’s normal decrypt path reject it before DOM display. No canned ciphertext animation.

Stretch: TURN-based peer-IP concealment, independently hash-checked client, pinned/offline PWA shell and reviewed PAKE pairing. Non-goals: groups, files, HTML/Markdown, previews, contacts, cloud history, AI summaries, typing indicators, read receipts, native push, Tor anonymity and post-compromise recovery. An offline shell does not imply offline chat.

## 4. Architecture and protocol decisions

```text
Browser A UI -> crypto/session worker -> ciphertext -> Browser B worker -> UI
                         |                  |
                encrypted SDP/ICE           +-- RTCDataChannel: direct / TURN
                         |                  +-- WSS fallback: explicit relay
                 Worker -> room DO -> peer
                         |
                 Proof-only ingress mirror -> Wire Receipt
```

Use React/TypeScript/Vite, an explicit session state machine, native `RTCPeerConnection`, WebCrypto HKDF/SHA-256, a pinned Noise handshake and standard `libsodium-wrappers` secretstream. Verify with Vitest, worker integration tests, Playwright and property-based tests. No content database.

**Invite/admission:** generate 32 CSPRNG bytes, put the secret only in `/#s=...`, and derive separate HKDF-labelled routing ID (128 bits) and handshake PSK (32 bytes). Fragments do not accompany HTTP requests; JavaScript, extensions, history and invite-sharing apps can still access them.[14] Import then strip via `history.replaceState`; retain only session memory, warn on explicit copy, reject malformed secrets before networking. A human password passed through HKDF is not strong pairing.

**Setup:** choose `Noise_NNpsk0_25519_ChaChaPoly_BLAKE2b`, fresh ephemeral DH plus high-entropy PSK, without permanent identities.[15] Bind protocol/version, room and canonical roles; fresh peer nonces go in handshake payloads, never chat text. Require mutual key confirmation. A relay without the secret cannot authenticate substituted keys. A stolen invite remains a bearer credential: its holder can race, deny service or impersonate; external comparison matters.

Candidate `noise-handshake` source supports `NNpsk0`/`XXpsk0`, **not `XXpsk3`**.[16] Its browser path uses `sodium-universal`/`sodium-javascript`; Vite/Chromium/Safari execution is **unverified here**.[17] README `rx`/`tx` descriptions conflict with source/examples; expose `sendKey`/`receiveKey` and verify directions independently. Its reference-comparison tests are skipped.[34] Its cipher writes a 32-bit counter, not full Noise 64-bit transport behavior.[35] Use it only for the bounded handshake, never assume brand recognition proves acceptance. If the first integration gate fails, stop the encrypted-product claim rather than invent a replacement protocol.

**Records:** HKDF-label distinct control/chat keys from each Noise split direction and handshake hash. Initialize independent outgoing/incoming control and chat secretstreams. Bind version/session/direction/sequence and stream context as associated data; initial authenticated records confirm headers. Delete split keys, PSK copies and ephemeral secrets. This is an **unaudited Noise-handshake/libsodium-record composition**, not unchanged Noise transport or an audited application.

Reliable ordered channels plus `TAG_REKEY` after each record give library-managed nonces and detection of tampering, duplicate/reordered records and missing interior records.[18] Serialize crypto operations; authenticate before advancing application sequence, accept only the expected next record, abort on corruption. No unlimited skipped-key cache or automatic resends under changed keys. Pad text into 256-byte buckets; cap plaintext at 4 KiB and transport queues at 64 KiB. Timing, buckets and volume remain visible.

Fresh DH plus deletion protects earlier captured ciphertext under stated assumptions; symmetric rekey does **not** recover after current-key compromise. JS erasure is best-effort; retained plaintext defeats secrecy. Double Ratchet adds fresh DH entropy; X3DH solves asynchronous setup, unnecessary here.[1] [2]

**Routes:** run Noise over untrusted WSS first, then encrypt SDP/fingerprints and ICE in independent control streams. Thus signaling substitution cannot silently authenticate.[19] WebRTC uses SCTP/DTLS for data; HTTPS/WSS alone terminates at the server.[20] Prefer direct WebRTC; on failure start a fresh labelled WSS session, not concurrent hot-swapping of ordered streams.

Explain direct peer-IP disclosure. “Hide IP from peer” chooses `iceTransportPolicy:'relay'` before ICE gathering, or WSS without starting WebRTC; infrastructure still sees IPs.[21] [22] TURN is optional, with server-minted short-lived credentials and no long-term token in the client.[23]

**Infrastructure:** Cloudflare Worker plus one Durable Object per opaque room: inspectable relay, deterministic routing, two-socket admission and real tests, without buying an always-on VM. Hibernation resets memory; reconstruct sockets using `getWebSockets()` and minimal role/expiry attachments.[24] Persist at most expiry/burn-tombstone metadata, never chat, SDP or debug captures. Apply Origin checks, frame/connection caps and pre-DO rate limits; these limit abuse, not authenticate identity. Prefer this over undocumented Client-hosting WebSocket assumptions.

**Rejected alternatives:** WebCrypto X25519/HKDF/AES-GCM reduces dependencies; mainstream support improved, while older browsers need separately specified, transcript-bound P-256—not silent downgrade.[25] Ed25519 signs, not key exchange.[26] AES-GCM requires nonce uniqueness. Primitives do not supply a chat protocol: reject a homemade Double Ratchet. Standard libsodium wrappers include secretstream without Sumo’s broader low-level surface.[27] Matrix/Signal add device/key-distribution scope; PeerJS does not remove authentication work.

## 5. Interaction and visual design

Local citations refer to `_reference/skills/skills/` for Emil and `_reference/apple-design-skill/references/hig/` for HIG. Translate foundations to web; do not imitate native chrome (`cross-platform.md`).

At regular widths, use a 1,120px maximum workspace with transcript and 360px inspector; below 760px disclose inspection full-width, not over chat. Verification/route/burn live near the header. Label the multiline `<textarea>`; Enter sends outside IME composition, Shift-Enter adds a line, and onscreen Send remains. `text-fields.md › Best practices` recommends a text view for larger input and persistent labels.

**Computed tokens:** light surface `#F3F6FA`; body `#26324A` 11.83:1, secondary `#596780` 5.27:1, action `#464BB5` 6.60:1, exposed-metadata `#855C12` 5.48:1. Dark surface `#1B2536`; corresponding `#E3EAF6`, `#A9B5CE`, `#B3B7FF`, `#E4B66C`: 12.73/7.47/8.16/8.21:1. These are proposed opaque colors, not screenshot measurements. `color.md › Best practices` requires consistent semantics and appearance/contrast variants; status always includes text/icon.

System sans body 1.0625rem/1.5, labels 1rem/1.4, heading 2rem/1.1 with `-0.02em` tracking; system-mono fingerprint 1rem. No remote fonts. Use 44×44 CSS-pixel targets, visible focus, keyboard order/ARIA, 200% text enlargement, forced colors and both appearances (`accessibility.md › Vision/Mobility`; `typography.md › Ensuring legibility`; `layout.md › Adaptability`). These web values are judgment, not equivalence to Apple points.

Compare full 256-bit fingerprint, grouped hex plus QR, through an independently authenticated channel. Short SAS is stretch: Matrix uses commitments and MACs, not merely friendly digits.[28] Session-local TOFU means “first peer seen”; comparison upgrades it. Replacement/reconnect blocks sends and clears comparison. Request camera only for optional QR scanning (`privacy.md › Requesting permission`).

`emil-design-eng › Animation Decision Framework`, `animate › Steps 1–7` and `choreograph › Hard Rules`: no message-entry, typing, fingerprint, keyboard-action or list-stagger animation. Pointer press `.97`/160ms; popover `.95`/200ms entry, 150ms exit, trigger-derived origin; curve `cubic-bezier(.23,1,.32,1)`. One container entrance, children already visible. Keyboard activation is instant.

| Explanation element | Role/start/duration | Relationship |
| --- | --- | --- |
| Selected ciphertext capsule | Lead, 0/300ms | Boundary travel; `.77,0,.175,1` ease-in-out. |
| Actual ingress receipt | Support, 220/180ms | Overlaps arrival; opacity only. |
| Accepted/rejected label | Support, decrypt event/150ms | Status immediately readable; never timer-driven. |
| Transcript/keys/controls | Static | No fake crypto progress. |

CSS/WAAPI first. Optional scrubbed explanation can justify GSAP labels/`pause`/`seek`/`kill`; not Flip, ScrollTrigger or SplitText.[29] **Cut Three.js/WebGL:** depth obscures observers and adds GPU/dependency failures.[30] Later draggable inspector: non-bouncy spring `{type:'spring',bounce:0,duration:.4}`, current-position interruption (`apple-design › Interruptibility`). Reduced motion collapses explanation to discrete frames; reduced transparency uses solids. Retrigger/close/burn cancels motion. Scrub receipt/arrival causality on a recording.

## 6. Threats, edge cases and honest boundaries

| Threat/stage | Mitigation | Limit |
| --- | --- | --- |
| Sender XSS/extensions/OS | Text-only rendering; no third-party scripts, analytics or previews; typed crypto worker. | Worker/nonextractable keys cannot defeat malicious origin JS or compromised devices. |
| Clipboard/invite/history | Fragment import/strip, copy warning, no secret persistence. | Clipboard managers, screenshots and sharing apps can retain it. |
| Network observation | Application AEAD plus HTTPS/DTLS; padding. | IP/timing/volume remain; no traffic-analysis resistance. |
| Signaling/relay attack | PSK authentication, encrypted SDP/ICE, sequence checks. | IP/UA, opaque room ID, public handshake material, sizes/times visible; server can censor/lie. |
| Direct peer/TURN | Explain routes; relay-only before ICE; temporary credentials. | Peer or infrastructure learns network metadata; no anonymity guarantee. |
| Key substitution/invite thief | External fingerprint comparison; block on changed session. | Bearer possession is not identity; “Compared” cannot prove human comparison occurred. |
| Replay/reorder/truncation | Ordered authenticated stream; abort/fresh session. | Missing FINAL means unclean close, not proof of malicious truncation. |
| Receiver/previews/backups | No push content/storage/backups; blur privacy curtain and explicit reveal. | Recipient can photograph/copy; curtain does not prevent screenshots. |
| Burn/reload/multi-tab | Destroy worker, clear DOM/queues, zero reachable buffers, fresh keys. | Local best-effort clearing, not remote deletion/forensic erasure. |
| Abuse/offline/backpressure | Two slots, expiry/caps, bounded queue; authenticated received ACK. | `send()` is not delivery or “read”; no offline recovery.[31] |

**Security Boundaries page:** confidentiality/integrity assumes authentic client code, uncompromised endpoints, unexposed invite, correct implementation and honest external comparison. Explicitly list metadata, recipient retention, denial of service, no post-compromise recovery and no application audit.

**Web delivery remains irreducible:** a malicious host can read plaintext before encryption. Strict hash-based CSP, narrow `connect-src`, SRI, no third-party scripts and a published single-file build hash reduce accidental/supply-chain exposure.[32] [33] The host can replace HTML/policies/hashes too. Independently verified hashes/signatures and a pinned/offline shell reduce future delivery trust; PWA is not a complete remedy. Verify WASM’s narrow `wasm-unsafe-eval` requirement without permitting JavaScript `unsafe-eval`.

**Wire Receipt:** mirror real DO ingress in consenting proof sessions, in memory, with no public observer channel. Direct mode sends no chat records to DO; TURN sees encrypted transport packets, not necessarily application ciphertext. Compare byte hashes with an independent relay harness. This is execution evidence, **not attestation or proof that Cloudflare retained no logs**.

Burn confirms **“Clear This Device”** with Cancel/Escape and immediate clearing after confirmation; no two-second hold or decorative deletion delay (`alerts.md › Buttons`; `accessibility.md › Mobility`). Notifications never reveal message content (`notifications.md › Best practices`).

## 7. Build plan and 90-second demo

Apply `build-principles › Thin slices/Test first/Time discipline` and poteto: transports accept only branded `EncryptedFrame`; sends require a session capability. Lint/import boundaries prohibit storage/logging in crypto/transcript modules. Types prevent mistakes; runtime tests establish behavior, not cryptographic proofs.

| Slice | Minutes | Proof check |
| --- | ---: | --- |
| 1. Browser crypto gate | 20 | Pinned imports, independent NNpsk0 vector, wrong PSK and direction assertions in Chromium. No custom fallback. |
| 2. Encrypted relay loop | 35 | Two contexts create/join/compare/send/leave; capture lacks secret/plaintext; burn/reload clears state. |
| 3. Real P2P/encrypted signaling | 45 | Two devices/networks; candidate stats prove route; altered SDP fails; fallback labelled. |
| 4. Receipt/malicious relay | 30 | Real tamper/replay/reorder/drop/cross-room reflection/key substitution; rejected plaintext never reaches DOM. |
| 5. Boundary hardening | 20 | Sequence/queue race properties; CSP; third entrant; mid-send disconnect; key change; unclean FINAL. |
| 6. Design/accessibility | 20 | Keyboard/IME/200%/reduced motion/mobile/dark checks; Safari interoperability gate. |
| 7. Frozen end-to-end/demo | 15 | Fresh invite, repeat loop/attacks; save tests and synthetic recording; no risky edits. |

**90 seconds:** 0–15 create/join isolated contexts; 15–30 compare and send; 30–45 show direct stats/no chat at relay; 45–65 fresh labelled relay-proof session, exact receipt and attack rejection; 65–80 changed-session send block and local burn; 80–90 Boundaries: metadata and malicious-delivery assumptions. Simulator is labelled and exercises the normal decrypt path.

## 8. Client leverage

| Invoke/when | Kind | Why |
| --- | --- | --- |
| build-principles/poteto, before slice 1 | Local skills | Gates, capability APIs and automated errors before agent fan-out. |
| webdev-worklocally → webdev, initialization | Parent skills; parent-only webdev-mcp | Hosting-choice/init discipline; no assumed relay semantics. |
| durable-objects/Workers/Wrangler, slices 2–3 | Local Cloudflare skills | Narrow tested relay; deploy only with available scoped credentials. |
| Emil/Apple/HIG, slice 6 | Local design skills | Exact tokens, motion cuts, accessibility. |
| Browser Operator/desktop-in-app-browser, checks | Parent-only browser capability | Runtime evidence; physical second device for network proof. |
| Studio Video Editor, after freeze | Parent-only video-editor | Editable synthetic proof beat with accurate captions. |

No LLM receives chat/secrets/keys. Cloud Computer purchases, automations and AI-generated media are unnecessary. Parent-only MCPs were not invoked here.

## 9. Socratic probe set

Local Socratic tutor level-5 targets—not earned scores:

| Subskill | Level-5 descriptor |
| --- | --- |
| Threat modelling | Teach plaintext/key/metadata flows across endpoints/services; handle observation, compromise and recipient disclosure. |
| Authenticated exchange | Distinguish PSK possession/identity; reject key substitution, weak pairing and downgrade without inventing protocols. |
| Ratchets/lifecycle | Explain forward secrecy/recovery; find retained roots, nonce reuse, concurrency races and erasure assumptions. |
| WebRTC/signaling | Reproduce fingerprint MITM; authenticate signaling; explain direct/TURN/WSS and ICE leakage. |
| Browser delivery | Explain CSP/SRI/nonextractable-key limits against malicious origin; qualify pinned-client mitigation. |
| Verification UX | Design usable external comparison, session TOFU and key-change blocks without automatic identity claims. |
| Evidence/debugging | Build independent relay/vectors; distinguish real decrypt rejection from badges or skipped tests. |
| Scope/AI governance | Enforce agent crypto/storage boundaries, timebox integration and cut features without weakening claims. |

**Diagnostic, easy→hard:** (1) Who can read WSS-only chat? (2) What does a fragment protect—and not protect? (3) Why can HTTPS signaling MITM ordinary WebRTC? (4) Current stream state is stolen after rekey: which past/future messages remain at risk, and why?

**Adversarial:** (5) Host changes JavaScript and SRI hash: what protection remains? (6) Two tabs interoperate, but reference tests are skipped: what evidence is missing before claiming protocol interoperability/security?

## 10. Open questions, confidence and recommendation

Wilson: Can the demo use a second physical device/network? Are scoped Cloudflare credentials available? Is the audience evaluating a prototype or expecting real sensitive conversations?

Confidence: high in product/threat boundaries, medium in architecture, low-to-medium in schedule until browser/vector gates pass. No product was built or security-tested in this analysis.

**Devil’s advocate:** an unverified browser adapter plus composed record layer may consume the prototype and create security theatre. Answer: first-slice stop/go gate, explicit unaudited status, independent attack evidence—not certification. Real sensitive messaging belongs in an established audited tool.

**Recommendation:** choose Glassbox as the security-judgment flagship only with approximately three hours. First three slices: crypto gate, complete encrypted relay chat, authenticated P2P. Cut groups/accounts/files/short-code pairing/3D/push/persistence. Never cut comparison, negative tests or Boundaries to preserve visual polish.

## References

[1]: https://signal.org/docs/specifications/x3dh/ "Signal X3DH specification"
[2]: https://signal.org/docs/specifications/doubleratchet/ "Signal Double Ratchet specification"
[3]: https://support.signal.org/hc/en-us/articles/360007060632-What-is-a-safety-number "Signal safety-number verification"
[4]: https://matrix.org/docs/matrix-concepts/end-to-end-encryption/ "Matrix encryption concepts"
[5]: https://github.com/matrix-org/vodozemac "Vodozemac implementation and audit notes"
[6]: https://magic-wormhole.readthedocs.io/en/latest/welcome.html "Magic Wormhole pairing and threat model"
[7]: https://peerjs.com/docs/ "PeerJS documentation"
[8]: https://github.com/schlagmichdoch/pairdrop/blob/master/docs/faq.md "PairDrop security and TURN FAQ"
[9]: https://docs.onionshare.org/2.6/en/features.html "OnionShare documented chat boundaries"
[10]: https://briarproject.org/how-it-works/ "Briar architecture and threat model"
[11]: https://docs.openprivacy.ca/cwtch-security-handbook/risk.html "Cwtch metadata risk model"
[12]: https://getsession.org/faq "Session current security and PFS FAQ"
[13]: https://docs.jami.net/en_US/developer/jami-concepts/index.html "Jami current distributed architecture"
[14]: https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment "MDN URI fragment semantics"
[15]: https://noiseprotocol.org/noise.html "Noise protocol framework"
[16]: https://github.com/holepunchto/noise-handshake/blob/main/noise.js "Noise handshake source and patterns"
[17]: https://github.com/holepunchto/sodium-universal "Sodium universal browser backend"
[18]: https://libsodium.gitbook.io/doc/secret-key_cryptography/secretstream "Libsodium secretstream ordering and rekey"
[19]: https://www.rfc-editor.org/rfc/rfc8827.html "WebRTC security and signaling MITM"
[20]: https://www.rfc-editor.org/rfc/rfc8831.html "WebRTC data channel transport"
[21]: https://www.rfc-editor.org/rfc/rfc8828.html "WebRTC IP address handling"
[22]: https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection "MDN peer connection relay policy"
[23]: https://developers.cloudflare.com/realtime/turn/generate-credentials/ "Cloudflare short-lived TURN credentials"
[24]: https://developers.cloudflare.com/durable-objects/best-practices/websockets/ "Durable Objects WebSocket hibernation"
[25]: https://developer.chrome.com/docs/modern-web-guidance/guides/security/client-side-encryption "Current WebCrypto fallback and support guidance"
[26]: https://wicg.github.io/webcrypto-secure-curves/ "WebCrypto secure curves proposal"
[27]: https://github.com/jedisct1/libsodium.js "Libsodium JavaScript wrappers"
[28]: https://spec.matrix.org/v1.19/client-server-api/ "Matrix SAS commitment and MAC protocol"
[29]: https://gsap.com/docs/v3/GSAP/Timeline/ "GSAP timeline controls"
[30]: https://threejs.org/docs/pages/WebGLRenderer.html "Three.js renderer requirements and disposal"
[31]: https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel/bufferedAmount "MDN data channel backpressure limits"
[32]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP "MDN strict content security policy"
[33]: https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity "MDN subresource integrity scope"
[34]: https://raw.githubusercontent.com/holepunchto/noise-handshake/main/test/against-ref.js "Noise skipped reference-comparison tests"
[35]: https://raw.githubusercontent.com/holepunchto/noise-handshake/main/cipher.js "Noise cipher nonce implementation"
