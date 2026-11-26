# Q6 — Glassbox: Design Rationale

**Rename note —** Glassbox is Wilson's final Q6 name; formerly the problem was described as “P2P encrypted chat,” not a separately evidenced product brand. The implemented transport is a relay. [`analysis/p6-p2p-encrypted-chat.md`, title; `analysis/_inspo-notes.md`, Wilson's rules; README, opening]

## 1. Summary and evidence boundary

**IMPLEMENTED —** Problem 6 asks for connected encrypted chat with verifiable sender, transit, service and receiver leakage boundaries, not merely HTTPS/WSS. Glassbox now has a two-person, ephemeral text-chat prototype in `analysis/p6-prototype/`: a bounded Noise NNpsk0 handshake, directional libsodium secretstream records, full fingerprint comparison on both endpoints, a loopback WebSocket relay and a paper/ink UI. It is application-layer E2EE over a relay, **not WebRTC P2P**, and remains unaudited. The six research reports remain the rationale, not an audit of the built application. [S, Product; BS, Implemented; TM, What is built and Local service boundary]

**TESTED-REPORTED —** Initial 26 Node tests/55 browser assertions are historical. Navigation follow-up records 31/31 Node tests and lead Chromium 17/17; graphics refinement records 95 assertions and 42 unique captures. The current lead refresh assignment reports npm test 32/32 after exact capture-query integration; the final TAP was not found in the inspected evidence folder. This documentation agent did not run tests, servers, browsers, npm or Chrome. [`analysis/p6-security/HOST-NAVIGATION-FIX.md`, Verification/Browser verification; `analysis/p6-prototype/GRAPHICS-CHANGELOG.md`, Verification; `analysis/p6-prototype/tests/relay.test.mjs`, presentation-only test; D, Hard rules]

**IMPLEMENTED —** Citations use the ROOT-relative key index in section 13. ROOT is `/home/ubuntu/AI-round`. IMPLEMENTED means inspected code or artifacts exist, not independently proven security; TESTED-REPORTED always means reported, not re-run by the documentation agent. Resource-reading acknowledgments below are owner-reported. [D, Hard rules; O, lines 1–5]

## 2. Change history

| Stage | What that version established | Status label |
| --- | --- | --- |
| 22:27 pre-restyle documentation | Described the proposal, notes and six research reports; the concurrent a4 build outcome was UNKNOWN. Cloudflare/DO hosting, laboratory composition, WebRTC and server-ingress Wire Receipt were still proposals, not product capabilities. [P, Architecture and Recommendation; G, Q5/Q6 scope; I, q6] | PROPOSED |
| 22:38 Node milestone | Core and two actual encrypted WebSocket clients passed the packaged relay tests; browser/CSP gate was still pending. That dated limitation remains true of that milestone only. [`analysis/p6-prototype/evidence/node-first-version-ready.json`, timestamp and limits] | TESTED-REPORTED |
| 22:50 first complete slice | Two contexts, comparison gates, strict CSP and Hub refinements; readiness 22:50:49. O reports workflow completion 22:54, cloud state says 22:56; exact completion is unknown. [F; O; `analysis/_SESSION_STATE-cloud.md`, 22:56 milestone] | TESTED-REPORTED |
| Navigation and graphics follow-ups | Narrow document-navigation fix; glass-box hero, passive live/cracked marks, send seal and capture presentation. [`analysis/p6-security/HOST-NAVIGATION-FIX.md`; `analysis/p6-prototype/GRAPHICS-CHANGELOG.md`] | IMPLEMENTED |
| Capture integration | Exact `/?capture=1` is now implemented in shell lookup/navigation predicate; GC's earlier 404 is historical. [`analysis/p6-prototype/server.mjs`, shellUrl; `tests/relay.test.mjs`, presentation-only test] | IMPLEMENTED |
| Still unbuilt | Direct WebRTC/TURN/ICE, public HTTPS, physical-device deployment, server-ingress receipt, QR, short-code PAKE, signed delivery, independent audit and persistent messaging remain excluded. [BS, Proposed, deferred and limits] | DEFERRED |

**IMPLEMENTED —** This refresh replaces obsolete “no application/source/start command” statements with the final files; it does not rewrite historical research findings as if researchers had tested the later application. The built host is plain local, not a Cloudflare deployment. [R1, opening and Verification still required; R6, Noise feasibility; I, q6; `analysis/p6-prototype/server.mjs`, assets and listen]

## 3. Product and design decisions

Alternatives are drawn from the original proposal, research and builder records; they are not invented prototype discussions. [P, Product concept and Architecture; R5, Bootstrap decision; BS, Reference influence]

| Decision | Alternatives considered | Reason and evidence | Status label |
| --- | --- | --- | --- |
| Two synchronous endpoints, text only | Accounts, groups, files, asynchronous queues and recovery | Keeps one complete loop with 15-minute lifetime, 100 outgoing chat records per direction and a 100-entry transcript. [README, Run; `analysis/p6-prototype/src/core.mjs`, limits and push; `src/app.mjs`, addMessage] | IMPLEMENTED |
| Authenticate invite, then compare on both endpoints | Bearer possession alone or local-only approval | Invite theft can authenticate the wrong peer. Full 64-character comparison emits an encrypted control record; both local and peer flags are needed for READY. [R5, What independent fingerprint comparison adds; `analysis/p6-prototype/src/core.mjs`, state and compare] | IMPLEMENTED |
| Four readable fingerprint rows, no shortened code | Friendly digits, static hash-to-emoji, QR in this slice | Keeps all 256 bits visible; row emphasis never grants verification. QR and reviewed SAS are later work. [BS, Reference influence and Deferred; `analysis/p6-prototype/src/app.mjs`, update; `src/style.css`, Hub rules] | IMPLEMENTED |
| Random 32-byte fragment invitation | Low-entropy spoken password passed through HKDF | Native CSPRNG plus separated route/PSK derivations; malformed values fail before relay creation. Fragment stripping reduces URL exposure, not clipboard/history/endpoint exposure. [R5, Bootstrap decision; `analysis/p6-prototype/src/core.mjs`, newInvite/inviteMaterial; `src/app.mjs`, parseInvite/importFragment] | IMPLEMENTED |
| NNpsk0 handshake only, sodium records | Candidate's long-lived Noise transport or homemade ratchet | The candidate transport's nonce wrap remains reproducible; independent vectors establish direction, not acceptance of general transport. [R6, Noise feasibility; BS, Implemented; `analysis/p6-prototype/tests/core.test.mjs`, first two tests] | IMPLEMENTED |
| Local WebSocket relay first | Original Worker/DO hosting and direct WebRTC | Delivers the verified browser loop without credentialed deployment or ICE scope. Loopback HTTP/WS is a same-computer demo, not a LAN service. [I, q6; README, Run; TM, Local service boundary] | IMPLEMENTED |
| Optional outgoing-wire inspector | Original attested-looking server-ingress Wire Receipt/attack lab | Shows the real browser outgoing encrypted record; explicitly not a server receipt or proof of retention. No attack controls ship in the UI. [BS, Implemented and Tested; `analysis/p6-prototype/src/app.mjs`, worker.onmessage; `src/index.html`, wire-details] | IMPLEMENTED |
| Product-specific glass-box composition | Earlier laboratory / generic envelope-padlock | Inside = example readable chat, outside = ciphertext and metadata warning, wall plate = fingerprint comparison. Header/favicon share the two-person box. [`analysis/p6-prototype/GRAPHICS-CHANGELOG.md`, What changed; `src/app.mjs`, draw] | IMPLEMENTED |
| Passive session mark / send seal | Generic “secure” badge / delivery theatre | Live requires READY, both comparison flags, canSend and open socket; ended = cracked/dim. Seal only after actual send succeeds; no user text or delivery proof. [`src/app.mjs`, update/finish/message-form; `analysis/p6-prototype/GRAPHICS-CHANGELOG.md`] | IMPLEMENTED |
| Object motion, hard-cut views | Earlier 250ms stage entrance, GSAP timeline / Three.js tunnel | Geometry before labels; `.25,1,.5,1` ink/wall/packet reveal. Reduced motion shows complete static ciphertext artwork; static fingerprints and press/focus vocabulary retained. [`analysis/p6-prototype/GRAPHICS-CHANGELOG.md`, What changed; `src/style.css`] | IMPLEMENTED |
| Presentation-only capture shell | Earlier 404/history adapter / broad query routing | Exact `/?capture=1` serves same shell and hides only prototype label/wire inspector; comparison, clear and outside-boundary disclosure remain. [`server.mjs`, shellUrl; `src/app.mjs`, opening; `src/style.css`, capture-mode] | IMPLEMENTED |
| Narrow navigation exception | Blanket cross-site denial / relaxed CORS or Host | GET/HEAD navigate/document only for `/` and exact capture shell; protected paths and WebSocket Origin remain guarded. [`server.mjs`, publicShellNavigation/upgrade; `analysis/p6-security/HOST-NAVIGATION-FIX.md`] | IMPLEMENTED |
| Explicit Clear this device with Cancel | Hold gesture, remote deletion or forensic burn | Clears local transcript and terminates worker; copy acknowledges browser/OS remnants and recipient copies. [R3, Exact sender and receiver boundary; `analysis/p6-prototype/src/app.mjs`, dispose and confirm-clear; `src/index.html`, clear-dialog] | IMPLEMENTED |
| No content storage, telemetry, third-party assets or model | Generic persistence/observability and AI chat services | Avoids deliberate extra recipients and durable chat data. Startup status output is not a payload log; external operator capture remains possible. [R1, Observability; R2, Skills conflicts; BS, Implemented; TM, Local service boundary] | IMPLEMENTED |
| No enterprise security product in runtime | Falcon/Zscaler SDKs, MCPs, DLP or endpoint agents | Research distinguishes administration/observation from browser E2EE and device attestation. No such dependency or tenant integration is in the built stack. [R3, Public open source; R4, Public open source; `analysis/p6-prototype/package.json`] | DEFERRED |
| Disposable bounded session worker | Unreviewed private WASM freeing or erasure promise | Published wrappers have no public free(); overwrite/drop reachable material and terminate one-session worker, with no zeroization claim. [R6, Pinned artifacts; `analysis/p6-prototype/src/core.mjs`, wipeNoise/abort; `src/worker.mjs`, init/lifetime] | IMPLEMENTED |

## 4. Research carried into the built product

| Research | Finding and final consequence | Status label |
| --- | --- | --- |
| R1 Cloudflare | TLS termination exposes frames/metadata; WAF does not inspect post-upgrade content; generic log/analytics defaults can add leakage. The final local relay keeps application encryption, per-socket caps and explicit delivery-trust limits, but none of the account/DO/edge checks was deployed. [R1, sections 1–8; TM, Named adversaries and Local service boundary] | IMPLEMENTED |
| R2 Cloudflare OSS/MCP | Skills are instructions, MCPs are administrative access and Agents AI persistence is mismatched. The runtime does not import Workers SDK, Meet/MLS, CIRCL, Privacy Pass, OHTTP or enterprise connectors. [R2, Skills, MCP catalogue and Reuse boundary; `analysis/p6-prototype/package.json`; BS, Deferred] | DEFERRED |
| R3 CrowdStrike | Basic EDR telemetry is not proof of universal keylogging; optional data-protection collection is policy/platform dependent. Endpoint/recipient warnings and explicit invite-copy retention copy are built, not endpoint detection or attestation. [R3, Public documentation and Product features; `analysis/p6-prototype/src/index.html`, footer; `src/app.mjs`, copy-invite] | IMPLEMENTED |
| R4 Zscaler | Passive TLS inspection sees application ciphertext, but malicious client replacement and remote-browser execution defeat endpoint assumptions. Final copy names organizational monitoring and relay-only routing; actual tenant compatibility is untested. [R4, TLS inspection and Remote endpoints; TM, Named adversaries and Local service boundary] | IMPLEMENTED |
| R5 open-source comparators | Signal/Matrix/Wormhole/Briar/Element informed comparison gates, role/context/replay discipline and explicit metadata limits, not imported messenger protocols or inherited audits. Full fingerprint and changed-key blocking are in the core. [R5, sections 1–5 and UI tests; `analysis/p6-prototype/src/core.mjs`, receive/compare] | IMPLEMENTED |
| R6 crypto/browser hardening | Independent vectors, direction mapping, nonce-wrap exclusion and missing-free caveat are retained as regressions. CSP browser integration now has reported Chromium evidence; Safari and complete composition review still do not. [R6, sections 1–6; BS, Tested; `analysis/p6-prototype/tests/core.test.mjs`] | TESTED-REPORTED |

**DEFERRED —** R3's manual integrity checklist/privacy curtain and P's notifications, QR, explanatory timeline and independent hostile-relay lab were not delivered just because the reports recommended them. The current inspector is outgoing-wire evidence; browser frame mutation/replay is test-only. [R3, Product features; P, Interaction and Wire Receipt; BS, Tested and Deferred]

## 5. How the work was produced

| Owner or stage | Job and preserved timing | Turns/credits and evidenced work | Status label |
| --- | --- | --- | --- |
| Original analyst | `4ac400b00c7e_a13`, 1,000 seconds | Turns/credits unknown; proposal and notes, not a product build. [J, Main analysis; N, opening and Final decision] | IMPLEMENTED |
| Security research | Workflow `11ab23a29730`, 967 seconds | a0–a5 produced R1–R6; respective durations 504/502/496/492/659/958 seconds. Aggregate turns/credits unknown. [J, P6 security research] | IMPLEMENTED |
| R1 card detail | `11ab23a29730_a0`, 13:20:36–13:29:00 UTC | Card turn 15, 32 LLM turns, about 196 credits; docs lookup/report only. [J, R1 card] | IMPLEMENTED |
| Final builder | Workflow `71e0aba49e1e`, agent `a4` (`71e0aba49e1e_a4`) | Final build/report mapped to Q6. Exact builder start, duration, turns and credits are unavailable; readiness milestones are not duration measurements. [O, agent mapping and Q6; F, timestamp] | IMPLEMENTED |
| Lead follow-up | Shared local-build assignment and later Hub/readiness requests | Parent requested final readiness refresh after browser gate; builder records Hub pass after core and parent-reported Mac health check. No lead security sign-off is evidenced. [G, Verification; BS, Start and sync and Reference influence] | TESTED-REPORTED |
| Navigation / graphics owners | `job_3n7THE1O` / `job_DQN4hfOq` | Lead cloud state maps server regression and src/dist/shots ownership; reports record their work and later lead browser check. Durations/credits unknown. [`analysis/_SESSION_STATE-cloud.md`, 23:34; `analysis/p6-security/HOST-NAVIGATION-FIX.md`; `analysis/p6-prototype/GRAPHICS-CHANGELOG.md`] | TESTED-REPORTED |

**IMPLEMENTED —** The builder prompt explicitly required bounded NNpsk0, secretstream binding, full comparison, key-change blocking, strict CSP, negative tests, bundled no-install runtime and truthful relay/endpoint/erasure labels. Core first and minimal UI were time judgments, not permission to omit comparison or failure paths. [I, q6; G, First study and Verification]

**PROPOSED —** Original 100/185-minute P2P/full-demo estimates superseded provisional 75/155-minute estimates; neither is a measured final build duration. The 23:15 encrypted-loop target was an assignment target, not the actual 22:38 milestone time. [P, Build plan; N, Final decision; I, q6; `analysis/p6-prototype/evidence/node-first-version-ready.json`]

**TESTED-REPORTED —** Fixed defects recorded by the builder include CSP blocking eval-based browser waiting (harness changed, policy not weakened), same-document fragment import on reconnect (hashchange handler added), build-script URL conversion, and upgrading ws from 8.18.3 to 8.23.0 after advisories. [BS, Actual defects and Tested; `analysis/p6-prototype/src/app.mjs`, importFragment; `scripts/build.mjs`, fileURLToPath]

## 6. Tools available versus tools actually used

### Actually used: only saved records or owner acknowledgments

- **IMPLEMENTED —** R1's card shows fetch, write, exec and one MCP lookup; that lookup's server/tool name is unknown. R1 acknowledges local brief/design/skill reads. [J, R1 card; R1, opening]
- **TESTED-REPORTED —** R2 records connector discovery and server listing, not a Cloudflare account call. N/R2/R3/R6 record TLS-validating curl and public metadata/source lookup after CA/API failures; R6's original probe was in-memory Node, not a disk installation. [N, Final decision; R2, Availability and Unverified; R3, Unverified; R6, Noise feasibility]
- **TESTED-REPORTED —** Builder records Node build/check/test commands, zero-install tests, Python Playwright with Chromium under flock, npm audit and text extraction of Inspora/Unkey. These records establish activities, not complete Client call traces or a named search/fetch MCP. [BS, Tested and Reference influence; `analysis/p6-prototype/tests/browser.py`, imports/main]
- **IMPLEMENTED —** Source, build scripts, logs, reports and screenshot filenames establish artifact production. This documentation agent used only file reads, read-only inventory/grep/wc and writes to these two documents. It did not visually inspect screenshots or re-run the app. [D, Hard rules; companion document, Key files and Tests]
- **TESTED-REPORTED —** Later records show Node regression/syntax tests, Python real-anchor and adapted graphics harnesses, build/check and exclusive flock. No new named skill-reading or MCP-browser use is inferred; HN explicitly denies MCP browser use. [`analysis/p6-security/HOST-NAVIGATION-FIX.md`, Verification; `analysis/p6-prototype/GRAPHICS-CHANGELOG.md`, Verification; `shots/graphics-browser.py`]

### Available or instructed, but unverified

- **UNKNOWN —** The parent tool/MCP catalogue is recorded in D; it does not prove each worker had or used all those tools. Exact builder tool schemas/call sequence are unavailable. [D, Tools picture]
- **UNKNOWN —** Exa appears in R2 discovery and S instructions; the unnamed R1 MCP activity and builder text-visit acknowledgment do not prove an Exa invocation. [R2, Availability; S, opening; J, R1 card; BS, Reference influence]
- **DEFERRED —** The final assignment is plain local. Parent-only webdev, handoff, Slides, task, publishing or video operations are not established as builder operations. Browser evidence is the saved Python/Chromium harness, not an MCP-browser trace. [G, lines 3–5 and Verification; BS, Tested]

## 7. MCPs and skills: evidence versus instruction

| Resource | Evidence of use or non-use | Status label |
| --- | --- | --- |
| Build principles / Poteto | N acknowledges earlier reading; BS acknowledges builder reading. Serialized session API, send-state guard, static source bans and regressions are concrete implementation, not a claim of branded TypeScript capabilities. [N, opening; BS, Reference influence; `analysis/p6-prototype/src/worker.mjs`; `scripts/check.mjs`] | IMPLEMENTED |
| Adapted Socratic coach | Builder explicitly records reading `skill-adapted/socratic-build-coach/SKILL.md`; no saved scored dialogue or earned level-5 assessment. [BS, Reference influence; P, Socratic probe set] | IMPLEMENTED |
| Emil / Apple | Builder reading acknowledgment plus CSS/focus/labels/IME-guard implementation; Apple HIG pages were consulted by the original analyst but not by this builder. [N, Motion + palette; BS, Reference influence; `analysis/p6-prototype/src/style.css`; `src/app.mjs`, keydown] | IMPLEMENTED |
| Cloudflare skills | R1 records five local reads and corrections to generic persistence/logging guidance; these do not constitute a Cloudflare deployment. [R1, Local skill guidance; BS, Deferred] | PROPOSED |
| Workflow MCP | Launch/card records establish analyst/research orchestration; O identifies the final builder as workflow agent a4. This is lead orchestration, not a builder's own child workflow. [J, workflow sections; O, agent mapping; G, depth restriction] | IMPLEMENTED |
| Cloudflare/Falcon/Zscaler operational MCPs | R2 records disabled/unauthorized connectors; R3/R4 report public research only. No credentialed runtime integration is evidenced. [R2, Availability; R3/R4, Unverified; `analysis/p6-prototype/package.json`] | DEFERRED |
| Exa / webdev | Exa use by this builder is unknown; webdev initialization/publishing is not evidenced and not needed for this local deliverable. [D, Tools picture; G, local hosting; BS, Reference influence] | UNKNOWN |

## 8. Code mode

**IMPLEMENTED —** The lead's workflow orchestration is the JavaScript-run sense of code mode, not a Glassbox runtime harness. The original launch is saved; the research launch script is not, and O establishes the final workflow/agent mapping without call-level traces. [J, Main analysis and P6 research; O, mapping; D, Code mode distinction]

**DEFERRED —** Glassbox has no generated-code tool harness, QuickJS product runtime or Cloudflare API Code Mode integration. Small research/filter scripts and Node/Python verification are not that product architecture. Patchbay's harness belongs to Q3. [R2, MCP catalogue; P, Client leverage; `analysis/p6-prototype/package.json`; D, Code mode distinction]

## 9. Websites and external sources consulted

**TESTED-REPORTED —** These are owner-cited/opened sources, not new web verification by this documentation agent. Repository stars, vendor versions and maintenance judgments in R1–R6 are dated research observations, not refreshed claims. [R1–R6, openings and source sections]

| Source family / representative URL | Concrete relationship | Local evidence |
| --- | --- | --- |
| `https://www.inspora.design/websites`, `https://www.unkey.com` | Text visits; concise headlines and progressive explanation influenced stage copy, not proven visual-site study. | [BS, Reference influence] |
| `https://developers.cloudflare.com/`, `https://github.com/cloudflare/skills` | TLS/DO/log/headers/MCP and reuse boundaries, not deployed services. | [R1, Sources opened; R2, Repository evidence and Skills] |
| CrowdStrike docs / `https://github.com/CrowdStrike/falcon-mcp` | Endpoint collection limits and administrative-tool separation. | [R3, References and Public open source] |
| Zscaler help / `https://github.com/zscaler/zscaler-mcp-server` | Inspection, metadata, remote-browser trust and tenant-API limits. | [R4, References and Public open source] |
| Signal, Matrix, Wormhole, Briar and Element official docs/repositories | Independent comparison, replay/sender context and observer-specific limits. | [R5, sections 1–5] |
| `https://noiseprotocol.org/noise.html`, holepunchto, Cacophony, libsodium | Exact handshake/vector/direction/lifecycle choices and audit-scope caveats. | [R6, sections 1–3; `analysis/p6-prototype/tests/core.test.mjs`, vector test] |
| MDN, W3C and RFC Editor | Browser CSP/fragment/WebCrypto/WebRTC semantics and erasure limits. | [R4, References; R6, sections 4–6] |

## 10. Resources check — re-verified from final files

“yes” means a local record acknowledges use/concrete change; “partial” means limited use is documented. BS preserves initial resource reading; GC supplies later concrete changes, not new Inspora/Apple/Emil reading or complete tool traces. [D, Skills evidence rule; BS, Reference influence; `analysis/p6-prototype/GRAPHICS-CHANGELOG.md`]

| Resource | Used? | Evidence | What it concretely changed | What it did NOT change |
| --- | --- | --- | --- | --- |
| Inspora | partial | BS explicitly records text extraction of `/websites` and listed site Unkey. [BS, lines 61–61] | Concise stage labels and progressive explanation; final copy exists in `analysis/p6-prototype/src/index.html`. | No saved visual-site browser inspection/capture, image assets or evidence of Inspora-driven layout/motion; no security change. |
| dickwu/apple-design-skill | partial | Builder records skill/foundations reading but no individual HIG-page study; original analyst records HIG reads. [BS, line 59; N, line 74] | SF-system stack, generous targets/spacing, focus styles, persistent textarea labels, IME-safe Enter and cancelable clearing. [`analysis/p6-prototype/src/style.css`; `src/index.html`; `src/app.mjs`, keydown/clear] | No copied SF files, native integration, device attestation, erasure guarantee or exhaustive screen-reader/IME/200%-zoom evidence. |
| Emil Kowalski skills | yes | Named builder reading; earlier analyst names Animation Decision Framework/animate/choreograph sections. [BS, line 59; N, lines 72–74] | .97/160ms press, ease `.23,1,.32,1`, hover-capable-only emphasis and reduced-motion outcome; data verification remains static. [`analysis/p6-prototype/src/style.css`, lines 1–9, 12–14] | No GSAP timeline, staggered fingerprint animation, Signal-level assurance or exclusive attribution: Q7 supplies overlapping motion values. |
| Hub v3 kit | yes | Builder names DESIGN-KIT.md, public style.css, illustrations.js and index.html after browser core. [BS, line 63] | Box mark, four indexed 62px fingerprint rows (58px mobile), comparison ledger, highlights and readable sibling greying. [`analysis/p6-prototype/src/index.html`; `src/style.css`, lines 11–14] | No Hub URL imports, wholesale composition replacement, shortened fingerprint or gate change; primary 54px, secondary 48px and text 44px controls are not all 52px+. |
| Unfold | yes | Builder names sketch.ts, paperMaterial.ts and fold.ts. [BS, line 59] | Seeded SVG/paper craft persists in glass-box strokes; earlier stage unfolding is replaced by hard-cut views and object motion. [`analysis/p6-prototype/GRAPHICS-CHANGELOG.md`, What changed; `src/style.css`] | No newly proven Unfold read, runtime import, realistic 3D, downloaded art or decorative PRNG for secrets. |
| Q7 Nave / Architecture Relive gold standard | yes | Builder names rationale section 12, CSS/index/app/plates/nave and font-directory inspection. [BS, line 59; G, Gold standard] | Large tight headlines, clamp spacing, system typography, large CTA, strong ease-out and press/focus vocabulary. [`analysis/p6-prototype/src/style.css`, lines 1–9] | No copied SF/Caveat assets, architecture-product identity, assumption of user acceptance or transfer of Q7's test evidence. |
| Later Inspora / Apple / Emil pass | unknown | GC preserves tokens/flows and reports no new reads. [`analysis/p6-prototype/GRAPHICS-CHANGELOG.md`, What changed/Verification] | Earlier copy, SF/focus/IME/cancel and reduced-motion behavior retained; later 44px home/chat checks and static reduced-motion artwork are reported. | Do not attribute later identity/motion exclusively to these resources or claim another skill read. |
| Later Hub / humans& refinement | yes | GC names Hub sketch.js adaptation; anchor notes record geometry-first/hard-cut rules. [`analysis/p6-prototype/GRAPHICS-CHANGELOG.md`; `analysis/_inspo-notes.md`] | Double-pass glass-box ink/washes, header/favicon/live marks; `.25,1,.5,1`, labels after geometry and meaningful wall/packet motion. | No Hub URL import, copied mascot, live model or security-gate change; anchor timings are not measured. |

## 11. Design critique and gaps

**IMPLEMENTED —** The full-fingerprint ledger remains beside the real send gate and truthful relay-not-delivery copy. The new glass-box hero explains readable endpoint text, outside ciphertext/metadata and comparison on the wall rather than merely adding a lock. The lit mark observes state, not endpoint integrity. This is source inspection, not this agent's visual-browser review. [`analysis/p6-prototype/GRAPHICS-CHANGELOG.md`, What changed; `analysis/p6-prototype/src/app.mjs`, update/draw/addMessage]

**TESTED-REPORTED —** Graphics owner reports 42 unique PNGs/43 writes, including normal/capture home, conversation and rejected matrices at 390/820/1440 light/dark, with three final visuals inspected. A later `shots/capture-direct-home-light-1440.png` exists; filename alone does not prove a complete native-query rerun. [`analysis/p6-prototype/GRAPHICS-CHANGELOG.md`, Verification; `shots/graphics-browser-results.json`, screenshots/adapter; `analysis/p6-prototype/shots/` inventory]

**UNKNOWN —** Whether full-hex comparison is understandable, consistently performed over an independent channel, or accessible across assistive technology/languages is not established. Automated matching is not a human-comprehension study. Exhaustive screen-reader, IME and 200%-zoom checks are explicitly unclaimed. [TM, What is built; BS, Tested and Deferred]

**UNKNOWN —** No inspected final record shows Wilson's P6-specific visual acceptance or a security sign-off. Q7, not the former Q2 benchmark, is the binding shared design standard; the reference pass is not proof that the user approved the outcome. [G, Gold standard; BS, Reference influence; O, design references]

## 12. Open questions and remaining unknowns

- **UNKNOWN —** “One-use conversation invite” in UI is stronger than the actual post-close behavior: relay tests intentionally reconnect using the same secret, and no tombstone prevents reuse. Is “single active pair” the intended copy, or is irrevocable invite consumption required? [`analysis/p6-prototype/src/index.html`, line 25; `tests/relay.test.mjs`, third-peer/reconnect test; `server.mjs`, closeRoom/room creation]
- **UNKNOWN —** Exact builder duration/turns/credits and complete tool/MCP call traces are not available. Reading acknowledgments are records, not raw traces. [O, source boundary; D, Tools picture]
- **UNKNOWN —** Final Mac browser conversation, final sync/restart, Safari/Firefox and physical-device/network interoperability remain unverified. A parent-reported Mac HTTP health check is narrower than those claims. [BS, Start and sync and Deferred; README, Run]
- **UNKNOWN —** Independent composition review and authentic signed/pinned distribution remain missing; maintenance of the older sodium-javascript backend is a material caveat. [TM, Composition limits; R6, Audit scope and Noise feasibility]
- **UNKNOWN —** Target enterprise policy, authorized CrowdStrike/Zscaler compatibility, endpoint integrity and external infrastructure/OS retention are not measured. [R3, Unverified; R4, Remaining gaps; TM, Named adversaries]

## 13. Citation key index

| Key | ROOT-relative evidence |
| --- | --- |
| D | `analysis/_doc-brief.md` |
| O | `analysis/_builder-results-2254.md` |
| G | `analysis/_design-pass-brief.md` |
| I | `analysis/_prompts/build-items.json`, q6 |
| J | `analysis/_doc-evidence.md` |
| P | `analysis/p6-p2p-encrypted-chat.md` |
| N | `analysis/p6-p2p-encrypted-chat.notes.md` |
| S | `analysis/p6-security/_research-brief.md` |
| R1 | `analysis/p6-security/01-cloudflare-docs-and-relay-fit.md` |
| R2 | `analysis/p6-security/02-cloudflare-oss-skills-and-mcp.md` |
| R3 | `analysis/p6-security/03-crowdstrike.md` |
| R4 | `analysis/p6-security/04-zscaler.md` |
| R5 | `analysis/p6-security/05-peer-e2ee-open-source.md` |
| R6 | `analysis/p6-security/06-crypto-and-browser-hardening.md` |
| BS | `analysis/p6-prototype/BUILD-STATUS.md` |
| TM | `analysis/p6-prototype/THREAT-MODEL.md` |
| README | `analysis/p6-prototype/README.md` |
| F | `analysis/p6-prototype/FIRST-VERSION-READY.json` |
| BR | `analysis/p6-prototype/evidence/browser-results.json` |

Paths abbreviated as `src/`, `scripts/` or `tests/` within a row after a full prototype path refer to that same `analysis/p6-prototype/` folder, not the research folder.

## 14. Wilson's directives that shaped this problem

Chat outweighs markdown. Exact 21:58/22:01 and 23:16/23:21 times are lead-relayed in this refresh assignment, not independently recovered raw chat. [I, q6; `analysis/_docs-refresh-brief.md`, owner rule]

| Time +08 | Directive | Consequence / evidence |
| --- | --- | --- |
| 21:58 / 22:01 | Hosting option “(a)” plain local Mac :4816; “start building now” | Core-first local slice, no managed-hosting claim. [I, q6; README, Run] |
| 22:21 / 22:48 | Q7 / Hub v3 gold standards | Scale/spacing/focus and indexed fingerprint ledger, not borrowed identity. [G; BS, Reference influence; `analysis/_SESSION_STATE-cloud.md`, 22:48] |
| Shared design pass | Unfold hand-drawn SVG | Procedural ink/paper craft; later Hub sketch primitives. [G, First study; BS; `analysis/p6-prototype/GRAPHICS-CHANGELOG.md`] |
| 23:12 | humans& anchor | Geometry before labels, hard cuts, meaningful object motion. [`analysis/_inspo-notes.md`, Rules; `analysis/p6-prototype/GRAPHICS-CHANGELOG.md`] |
| 23:16 / 23:21 | “Forbidden” when clicking hub link | Reproduce cross-site document 403, preserve Host/Origin; Mac resolution unknown. [`analysis/p6-security/HOST-NAVIGATION-FIX.md`] |
| 23:21 / 23:33 | Q6 “Glassbox”; every graphic reflects its product | Transparent endpoint/ciphertext boundary, fingerprint plate, passive marks. [`analysis/_inspo-notes.md`, Wilson's rules; `analysis/p6-prototype/GRAPHICS-CHANGELOG.md`] |
| 23:30 | 200–400k context; successor handoff | Lead process constraint; supersedes older 200–250k state note, not a runtime feature. [`analysis/_SESSION_STATE-cloud.md`, Directives/23:34] |
| Q8 draft | “You cannot get off the glass box” | Storyboard only, not containment proof; “never breaks” is not an implemented claim. [`_reference/q5-train/coordinator/Q8-STORYBOARD.md`, Scene 5; README, Security boundaries] |

## 15. Final-state test table and honest limits

Every row is **TESTED-REPORTED**, not re-run by this agent; milestones are not additive. [D, Hard rules; `analysis/_docs-refresh-brief.md`]

| Test file / check | Count / owner | What it does not prove |
| --- | --- | --- |
| `tests/core.test.mjs` + `tests/relay.test.mjs` | Initial builder 26/26; navigation owner 31/31 (`evidence/host-navigation-node-tests.tap`); final lead assignment npm test 32/32 after capture regression. [BS; `analysis/p6-security/HOST-NAVIGATION-FIX.md`; current test source] | Audit, Mac execution; final 32-test TAP not located. |
| Portable Node run | Initial builder 26/26 with node_modules absent. [`evidence/portable-tests.tap`; BS] | Not a newly verified portable 32-test run. |
| `tests/browser.py` | Initial builder 55 assertions. [BR; BS] | Latest graphics, physical devices or independent peers. |
| `tests/host-navigation-browser.py` | Lead 17/17; real anchors to localhost and 127.0.0.1. [`evidence/host-navigation-browser-run.txt`; `analysis/p6-security/HOST-NAVIGATION-FIX.md`, Browser verification] | Wilson's Mac, production hub or full chat QA. |
| `shots/graphics-browser.py` | Graphics owner 95 assertions, 42 unique shots. [`shots/graphics-browser-results.json`; `analysis/p6-prototype/GRAPHICS-CHANGELOG.md`] | Full native capture rerun: report explicitly used history adapter. |
| Build / check / audit | Builder + graphics owner build PASS, 10 syntax checks/source bans PASS; initial registry audit 0 vulnerabilities. [BS; `analysis/p6-prototype/GRAPHICS-CHANGELOG.md`, Verification] | Cryptographic correctness or absence of undiscovered defects. |

- **TESTED-REPORTED —** Rendering is Sandbox Chromium only; Mac failure headers/resolution, final Mac browser E2E and Safari/Firefox are unverified. [`analysis/p6-security/HOST-NAVIGATION-FIX.md`; README, Run]
- **UNKNOWN —** No audit, endpoint-integrity measurement, authentic signed delivery, retention attestation or guaranteed zeroization. [TM; README, Security boundaries]
- **IMPLEMENTED —** No live model; real workers/relay are exercised, artwork uses synthetic examples and tamper/replay injection is test-only. The 95-check capture run is history-adapted. [BS; `analysis/p6-prototype/GRAPHICS-CHANGELOG.md`; `shots/graphics-browser-results.json`]
- **DEFERRED —** Public HTTPS, WebRTC P2P, physical-device chat, persistent messaging and server-ingress receipt. [BS, Deferred]

## Process note

**TESTED-REPORTED —** Analyst `4ac400b00c7e_a13` wrote the proposal; workflow `11ab23a29730` a0–a5 wrote six security reports; `71e0aba49e1e_a4` built the crypto/relay/browser slice. Later `job_3n7THE1O` owned navigation/server regressions and `job_DQN4hfOq` owned graphics src/dist/shots. Saved HN records the lead's Chromium navigation review after the fix owner's lock blocker; this assignment reports lead capture integration/32 tests. GC records graphics-owner visual inspection, not lead visual acceptance or security sign-off. This agent only inspected files and updated the two docs plus refresh note, without launching agents/tests/browsers. [J; O; `analysis/_SESSION_STATE-cloud.md`, 23:34; `analysis/p6-security/HOST-NAVIGATION-FIX.md`, Browser verification; `analysis/p6-prototype/GRAPHICS-CHANGELOG.md`, Verification; `analysis/_docs-refresh-brief.md`]

Additional citation aliases: HN = `analysis/p6-security/HOST-NAVIGATION-FIX.md`; GC = `analysis/p6-prototype/GRAPHICS-CHANGELOG.md`. Earlier numeric source-line citations refer to the initial milestone; named headings/functions identify the current evidence.
