# R1 — Cloudflare documentation mapped to the Glassbox relay

Evidence checked on **25 November 2026** by opening official documentation, with MDN used to verify browser-header semantics. This is a documentation assessment of the proposed design, not a deployment, runtime test, account inspection or application audit. The full research brief, existing Glassbox design and all five requested local skill files were read. No vendor API was called with credentials and no configuration was changed.

## 1. What terminates where, and what Cloudflare can see

Cloudflare documents separate **edge** certificates presented to browsers and **origin** certificates for a separate Cloudflare-to-origin connection.[1] Its WebSocket documentation permits Workers/Durable Objects to be the server endpoint and explicitly says WAF inspection stops once the initial upgrade succeeds.[2] These facts imply the following boundaries; absence of WAF inspection is **not** inability of the platform to access traffic.

| Route/service | What is terminated or processed | What is visible; what is not protected by that service |
| --- | --- | --- |
| HTTPS client delivery | Browser TLS terminates at Cloudflare's edge. | Host, requested path/query, headers, client IP and the HTML/JS delivered. Cloudflare is part of the trusted client-delivery path and can modify that code; an authentic TLS certificate does not authenticate an independently reviewed build. |
| WSS Worker → room DO | WSS transport TLS terminates at the edge; the application receives WebSocket messages. | **Cloudflare can see WebSocket frames.** Correct application-layer E2EE makes those frames ciphertext, not unreadable transport data. Public handshake material, ciphertext size/timing, room routing identifier and connection relationships remain visible. Sending plaintext over WSS would expose it. |
| Encrypted signalling | SDP/ICE is application ciphertext inside the control stream. | The relay can read exposed routing/envelope fields, not correctly encrypted SDP/ICE. It can drop, delay, substitute or replay bytes; endpoint authentication/sequence checks, not WAF, must reject modifications. |
| WebRTC via Realtime TURN | TURN handles allocations/authentication. `turns:` adds a TLS wrapper terminating at the TURN server. | TURN sees client/peer network addresses, ports, timing and encrypted packet volume. Peer-to-peer WebRTC DTLS remains inside TURN; for data channels Cloudflare relays DTLS-protected packets, not decoded application records. TURN itself supplies no end-to-end content encryption.[3] |
| Direct WebRTC | Cloudflare is not the data-channel endpoint. | No direct chat frames pass through the WSS relay, but discovery/control metadata and any TURN/STUN use still expose infrastructure metadata. A direct peer learns network-address information; no anonymity claim follows. |

Application-layer E2EE reduces content disclosure to a passive relay operator, TLS-terminating middlebox or network observer **only assuming authentic client code, uncompromised sender/receiver, unexposed invite and correct cryptography**. A compromised Cloudflare account, malicious host or CDN that delivers replacement JavaScript can collect plaintext before encryption/after decryption. None of the products below prevents a recipient copying or photographing messages, a privileged extension reading the page, or endpoint clipboard/backups/swap/crash-dump capture.

## 2. Workers + one Durable Object per opaque room

| Current official evidence | Glassbox use | Exact limitation |
| --- | --- | --- |
| DOs are individually single-threaded; a single object has a **soft** 1,000 requests/s limit, not an availability guarantee. Received WebSocket **message** size is **32 MiB**.[4] | One coordination atom per room; reject the third participant and oversized ciphertext. Keep the proposed 4 KiB plaintext/64 KiB queue budgets, with a separately specified maximum encoded record size. | The platform's 32 MiB received-message ceiling is far too large for this chat. It is not a documented per-frame or outgoing-message cap. Message/byte/connection quotas must be application controls. |
| `acceptWebSocket` permits hibernation; `getWebSockets()` restores live socket membership. Attachments survive hibernation, have a **16,384-byte** maximum and disappear when the connection closes.[5][6] | Reconstruct only role, expiry and minimal admission/rate state. Never attach invite, PSK, plaintext, SDP, full frames or receipt buffers. | Attachments are copies retained by infrastructure, not forensic erasure. Ordinary object fields disappear on hibernation; do not rely on them for two-slot admission after waking. |
| Currently a hibernateable object sleeps after about **10 seconds**; non-hibernateable idle objects may be evicted after **70–140 seconds**. Standard WebSocket APIs, timers, unfinished events/I/O prevent hibernation; some pending operations prevent eviction for up to 15 minutes each.[6] | Use hibernation API, no permanent `setInterval`; enforce expiry on every event and use minimal expiry/tombstone storage/alarm only if required. | These are runtime lifecycle decisions, not deletion deadlines. Restarts/code changes can close sockets; reconnect must establish a fresh labelled cryptographic session, not silently restore old keys. |
| `blockConcurrencyWhile` blocks delivery during a callback; callbacks have a 30-second timeout. Synchronous SQLite work does not yield; ordinary external `await fetch()` can permit interleaving.[5] | Check/update admission synchronously, or use an explicit short critical section/queue where necessary. Serialize related relay operations and test races. | “One object” does not make every asynchronous handler atomic. Blanket blocking around Siteverify or other external requests creates avoidable stalls; single-threading does not authenticate a sender. |
| Runtime ping/pong does not wake the object; server-side hibernation is supported, outbound WebSockets do not hibernate.[7] | Let runtime control-frame handling preserve idle connections; make any application heartbeat content-free and bounded. | A heartbeat reveals liveness/timing. Hibernation is a cost/lifecycle control, not confidentiality protection. |

Persist no transcript or chat/signalling frames in DO storage, KV, D1, R2, queues or analytics. If expiry/burn tombstones must survive restart, document their minimal schema and deletion policy separately. A Wire Receipt should be sent immediately to consenting participants via the proof channel, never `console.log`; a memory-only server proof buffer can vanish on hibernation. Do not persist it merely to preserve the demo. A receipt proves what that execution exposed, not that Cloudflare retained nothing elsewhere.

## 3. Observability, redaction and retention

**New Workers have observability enabled by default**, with unspecified head sampling defaulting to 100%. Workers Logs contains invocation metadata, custom console messages, errors and uncaught exceptions. Fetch invocation messages contain method/URL; WebSocket invocations are labelled by event type. The docs do not describe automatic storage of all WebSocket message bodies, but logging `message`, request objects or exceptions containing input would create that disclosure.[8]

As of this date, the Workers Logs table gives **3 days** retention on Free and **7 days** on Paid; its stated maximum is seven days. The page announces a pricing change on 1 December 2026: recheck retention/terms before release rather than assuming today's table persists. Real-time logs are not themselves persistent storage, but a terminal, dashboard operator, Tail Worker or export destination can retain output; DO logs also appear there.[8][9]

The current public Worker-settings schema has `observability.redact_query_string`: “query strings are removed from request URLs in logs and traces.” It separately exposes log/traces enablement, persistence and destinations.[10] **This is not a generic payload redactor**, does not promise to sanitize arbitrary `console.log` strings, does not remove a room ID in a URL path, and is not documented as covering independent HTTP/WAF/Access logs. Pin and validate the chosen Wrangler schema rather than assuming this API setting is accepted by every local version.

HTTP log fields can include client IP, full requested path/query, user-agent, referrer, response sizes and edge timestamps. Custom request/response-header and cookie fields are also available if explicitly configured.[11] WebSocket HTTP logs describe connection duration, while request accounting counts the initial upgrade, not each frame.[2] These are metadata leak paths even when the app logs no messages.

**Recommended production posture:** explicitly disable persisted logs, invocation logs, traces, Issues, Tail consumers, Workers Logpush and telemetry exports on the relay until an allowlisted operational need exists; enable query redaction as defense in depth where supported. Never log payloads, keys, invite fragments, admission/TURN tokens, raw URLs, room IDs, IPs or free-form input-derived exceptions. Use fixed error codes, no input echo and bounded parsing. A future operational stream should contain aggregated counters/fixed event classes, without per-room correlation; sampling alone does not sanitize sensitive fields.

Logpush sends selected datasets to external storage/SIEMs; it is **not** a retention/search service and cannot backfill disabled periods. Workers Trace Events exports request/response metadata, console messages and exceptions and requires Workers Paid.[12][13] Retention then depends on the destination and backups. `persist: false` in an export is not “no logs”: it still sends data elsewhere. No opened source established an account-independent guarantee of zero internal/security/billing retention; do not promise one.

## 4. Workers security model, secrets and bindings

Workers uses V8 isolates, defense-in-depth process sandboxing and mediated APIs. Its security-model documentation describes cross-tenant isolation, including limitations and side-channel defenses.[14] This reduces exposure to another malicious tenant; it neither separates Glassbox's plaintext from Glassbox's own code nor treats Cloudflare as unable to inspect its platform.

Resource bindings are capability-plus-API objects: a DO binding avoids a broad Cloudflare REST token in the relay.[15] Grant only the room DO and narrowly needed abuse/credential capabilities; omit AI, R2, databases, analytics and outbound services. Use secret bindings for **Turnstile/TURN administrative secrets only**, not chat keys. Secret text values are encrypted in configuration and hidden after definition in the dashboard/Wrangler, but the Worker reads the original value at runtime; malicious Worker code can exfiltrate them.[16] Least-privilege deployment credentials, separation of admin/relay workers and rotation reduce supply-chain/account-compromise blast radius, not endpoint compromise.

The current best-practices page confirms generated `Env` types, current compatibility dates, secret storage, bounded bodies and avoiding request-scoped global state.[17] Adopt these. Its default recommendation to enable structured observability is inappropriate for chat payload/metadata; privacy requirements override generic troubleshooting convenience. The ciphertext relay does not need server-side message decryption or an LLM.

## 5. Turnstile, rate limits, WAF and Rulesets

Turnstile requires **backend Siteverify**; a widget badge alone provides no gate. Validate `success`, expected production hostname and `action`, cap the token at 2,048 characters, use timeouts and fail closed. Tokens expire after 300 seconds.[18] The current docs add an important qualification absent from the local Spin skill: redemption is **eventually consistent**. The SLO is to reject at least 99% of repeat validations received at least five seconds after first success; concurrent/closely spaced checks can both succeed. Same-idempotency-key retries are excluded. Therefore Siteverify is not atomic one-room-per-token enforcement. If needed, atomically consume a short-lived admission ticket/token digest in the appropriate DO, retain it only for its reuse window and never log it.

Turnstile reduces automated room/TURN credential creation by commodity bots, not invite theft or chat identity substitution. It loads a third-party script and iframe and requires CSP permission for `challenges.cloudflare.com` (nonce/`strict-dynamic` is supported).[19] **Defer for the interview/private prototype**. For a public service, confine it to a creation-only document that never handles an invite fragment, transcript or crypto state; a separate origin provides stronger separation. Enter a clean first-party chat document before generating/importing secrets. Simply hiding/removing the widget inside the existing SPA does not unload privileged script code. Avoid pre-clearance cookies unless their separate purpose is justified.

WAF custom/managed rules and edge rate limiting apply to room creation, TURN issuance and the initial WebSocket upgrade, **not subsequent messages**.[2] Put cheap path/method/Origin checks and rate gates before reaching the DO; put per-socket message/byte quotas, two-slot admission and strict quotas in the DO. The Workers rate-limit binding is a useful code-level gate without relying exclusively on zone WAF: counters are approximate, eventually consistent and separate per Cloudflare location.[20] Edge rate-limit rules likewise permit excess requests during counter propagation; plans differ (currently Free has one rule with limited matching/counting choices).[21] IP limits can unfairly group users behind NAT/VPNs and distributed attackers can evade them. Do not use a client-supplied room/user identifier as the sole abuse identity, and never use the invite secret as a rate-limit key.

Rulesets are ordered, versioned and phase-specific; managed rulesets are vendor-controlled, custom rulesets are currently supported by WAF.[22] The phase list places custom WAF before rate limiting and managed WAF; terminating actions stop evaluation, while later nonterminating changes can overwrite earlier ones.[23] Modern Rules are not suppressed by Workers, unlike legacy Page Rules.[24] Maintain narrowly scoped rule configuration and test the final response, rather than assuming a dashboard badge covers every path/hostname. Rulesets are a configuration mechanism, not an E2EE feature.

## 6. Response headers: real controls, not a scorecard

Response Header Transform Rules can set/add/remove response headers on proxied domains; later rules can overwrite earlier changes. They also apply to default Cloudflare error pages/Custom Errors. However **adding `Cache-Control: no-store` there does not change Cloudflare caching**, because cache behavior is evaluated first: use origin/Worker cache handling and a Cache Rule where appropriate.[25] For a Worker-hosted app, emit tested headers directly in application responses, with zone transforms as optional policy consistency. Do not assume rules on the custom domain cover `workers.dev`/`pages.dev` or Cloudflare challenge pages.[19]

| Header/control | Risk and intended observer/adversary | Exact limit |
| --- | --- | --- |
| Enforced CSP: pinned hashes (or correctly generated nonces), no inline handlers/JS eval, `object-src 'none'`, `base-uri 'none'`, `frame-ancestors 'none'`, narrow `connect-src` and `worker-src` | Reduces sender/receiver XSS, unauthorized scripts/connections and clickjacking by an injected-content attacker.[26] | A report-only CSP does not block. Hashes must match external-script SRI; `strict-dynamic` delegates trust to allowed loaders. A malicious origin can replace HTML, JS, hashes and policy together. Check the library's WASM needs without granting broad JS `unsafe-eval`. |
| `Referrer-Policy: no-referrer` | Reduces path/room-context disclosure to linked resources or destinations.[27] | Omits `Referer`, not destination/IP/timing or arbitrary JavaScript exfiltration. It does not remove history/clipboard/invite-sharing retention. A WebSocket's `Origin` remains usable for Origin checks. |
| `Permissions-Policy: camera=(), microphone=(), geolocation=()` | Reduces unwanted browser-device API use by included/injected scripts where supported.[28] | For QR scanning selectively permit camera on its intended surface. Data channels do not require mic/camera. It is not an OS screenshot/clipboard prevention control; feature support varies. |
| `Cross-Origin-Opener-Policy: same-origin` | Reduces cross-origin opener/XS-Leak interaction.[29] | Does not isolate all same-origin scripts or defeat extensions. Can break popup integrations. |
| Optional `Cross-Origin-Embedder-Policy: require-corp` plus COOP | Restricts cross-origin resource embedding and enables cross-origin-isolated features when needed.[29] | Not required just to encrypt or use ordinary WASM; may break third-party dependencies. Validate CORP/CORS and `crossOriginIsolated`, adopt only for a named need. |
| `Cache-Control: no-store`, correct edge bypass, `X-Content-Type-Options: nosniff` | Reduces unintended response caching and MIME confusion by caches/injection attackers. | No-store does not erase RAM, DOM, manually stored app data, screenshots, service-worker caches or backups. There must be no transcript/keys in responses in the first place. Transform-only no-store is insufficient for edge caching.[25] |
| HSTS with cautious scope; HTTPS/WSS-only; min TLS 1.2 with TLS 1.3 enabled | Reduces transport downgrade/legacy TLS exposure to an on-path attacker.[30][31][32] | Does not stop a trusted enterprise root or Cloudflare termination. Preload is a long-lived operational commitment, not a prototype checkbox. |

**Do not copy the official security-header sample unchanged.** The opened sample contains `Cross-Origin-Opener-Policy: same-site`, while MDN lists valid COOP values including `same-origin` but not `same-site`; it also has a weaker referrer default and a `console.log(tlsVersion)`.[33][29] Use tested semantics, not an “all headers enabled” badge. Cloudflare documents feature-induced CSP changes for Rocket Loader, Scrape Shield, Web Analytics, bot scripts and Zaraz; these are reasons to turn optional injection/rewriting features off rather than relaxing the chat policy.[34]

## 7. Optional TURN, admin Access and TLS origin settings

Realtime TURN documentation requires a long-lived TURN key to stay **server-side** and a backend to mint expiring `iceServers` credentials. Its example TTL is 86,400 seconds, not a privacy recommendation; maximum expiry is 48 hours. Choose the room's short maximum lifetime plus a justified margin, rate-limit issuance, return no-store responses and revoke credentials when appropriate. Expiry causes an active allocation to disconnect after a short delay, not guaranteed instantaneous shutdown.[35][3] Tests must cover expiry/revoke/reconnect; short-lived credentials are still bearer credentials that can be stolen/reused until expiry.

TURN over TCP/TLS describes the **client-to-server transport**, not RFC 6062 TCP relaying (unsupported). Service limits are per allocation, with approximate documented packet/data thresholds and drops on excess; they are not account-wide spending caps. Zone HTTPS minimum-TLS settings must not be assumed to control `turn.cloudflare.com`: its TURN docs currently list TLS 1.1, 1.2 and 1.3.[36] WebRTC `iceTransportPolicy: 'relay'` must be selected before gathering for the peer-IP-concealment mode; authenticated encrypted signalling must bind the DTLS fingerprint. Otherwise an untrusted signalling path defeats the intended identity boundary. TURN is optional connectivity/peer-IP control, not metadata anonymity and not justification for an SFU.

Cloudflare Access is useful **only if a real separate admin/status surface exists**. A self-hosted Access application is default-deny and checks an application token on HTTP requests; origins must validate the token or otherwise prevent bypass.[37] Prefer an allowlisted admin identity/MFA and no chat data in that surface. It adds identities/authentication logs and does not authenticate participants' cryptographic keys; leave the anonymous chat outside Access. Gateway/WARP, DLP, CASB and browser isolation are not needed to build this relay. Installing endpoint interception would expand trust/observability, not hide chat from a compromised endpoint.

If the Worker itself is the origin there is no separate external-origin TLS hop to configure. If an external origin is introduced, use **Full (strict)** certificate validation, never Flexible, and restrict origin bypass; this protects that hop against on-path substitution, not against Cloudflare or client-code replacement.[38]

## 8. Analytics and Page Shield / client-side security

**Web Analytics must be off for this privacy product.** The vendor documents timing metrics, a script from `static.cloudflareinsights.com`, reports to `/cdn-cgi/rum` or `cloudflareinsights.com`, SPA route measurements and automatic injection across zone pages. It says query strings are not logged, with unsampled beacon retention seven days, downsampled longer-term data and dashboard access up to six months.[39][40] These are bounded vendor claims, not a license to load extra same-page code near secrets. Disable automatic injection and remove manual/tag-manager embeds; disabling SPA tracking alone is not disabling analytics. Test that no beacon/RUM request exists. This does **not** turn off Cloudflare's edge analytics or infrastructure metadata.

Page Shield is now documented as **client-side security**.[34] Its resource monitoring injects sampled CSP **report-only** headers, reports scripts/connections and observes cookies; this monitoring header does not block anything. Separate “allow” content security rules enforce a CSP on matching responses.[41] Default reporting uses a Cloudflare-owned endpoint; even its same-hostname Advanced option remains Cloudflare-processed. Docs explicitly warn that **Log full URI** records sensitive connection-target URI data in cleartext visible to dashboard users.[42]

Skip resource monitoring/full-URI collection on real chat pages. A manually enforced first-party CSP without remote reporting is the minimal control. If operational CSP reporting later becomes necessary, use synthetic staging first, then a narrowly schema-validated, size/rate-limited, aggressively sanitized collector with explicit retention and no content samples. Reporting adds URL/connection metadata and an observer; it is not endpoint integrity attestation. Do not claim CSP reporting necessarily exposes the fragment secret, nor that it proves delivered JavaScript is honest.

## 9. Local skill guidance: verified, corrected and unverified

| Local file under `/Users/WilsonSoon/.agents/skills/` | Confirmed online | Qualification / not confirmed |
| --- | --- | --- |
| `cloudflare/SKILL.md` | Retrieval-first posture; Workers/DO for stateful real-time rooms; TURN distinct from SFU; official sources supersede pointers.[4][7][36] | Unrelated AI/storage/media/feature-flag product claims were not investigated and do not belong in this relay. |
| `cloudflare-one/SKILL.md` | Access default-deny, policy gating and origin-token validation.[37] | Broad Gateway/DLP/CASB/device deployments and category/UI details not independently verified: unnecessary for R1's admin-only scope. Its generic advice to configure payload logs is inappropriate here. |
| `durable-objects/SKILL.md` | Per-room coordination, memory-loss caveat, constructor initialization and avoiding blanket concurrency locks.[5][6] | “Use RPC, not fetch” is not universal: WebSocket upgrade examples explicitly use fetch.[7] “Persist first” applies to necessary durable state, not permission to persist chat. Local API/test tool versions were not executed. |
| `workers-best-practices/SKILL.md` | Current compatibility dates, generated binding types, secrets, bounded bodies and bindings instead of REST.[15][16][17] | Generic “enable observability” is intentionally rejected on privacy grounds. Blanket Node compatibility/structured logging is not a leak defense. Build/type/runtime verification remains pending. |
| `turnstile-spin/SKILL.md` | Backend Siteverify, fail-closed handling, hostname/action validation and keeping administrative secrets out of frontend code.[18] | Its unconditional single-use/replay expectation is stale: current docs describe network-convergence exceptions. Widget creation/auth scripts were **not** run. No end-to-end gate is claimed. |

No open-source repository is recommended or cited in this R1 report; repository licences/stars/activity belong to R2. Documentation examples are pointers, not accepted/reused code.

## 10. Verification still required before making product claims

For a later authorized build: exercise third-entrant races, hibernate/wake admission reconstruction, expiry and oversized/high-rate messages; show that wrong Origin and malformed admission fail before DO work. Send synthetic canary content/keys/URLs through success and error paths and inspect actual logs/traces/exports separately from the Wire Receipt. Confirm final custom-domain response headers, no Analytics/Page Shield/Rocket Loader/Zaraz requests and no-store plus actual cache bypass. With two devices verify TURN selected-candidate types, no peer IP in the relay-only offer, encrypted fingerprint signalling and credential expiry. All of these are **pending**, not passed here.

Open decisions: custom domain versus shared hostname; Worker plan and rule entitlements; actual account log/export/injection defaults and internal metadata retention; whether public abuse requires Turnstile; whether TURN/privacy-mode connectivity works on the target managed networks; whether there is any admin surface to protect. Documentation supplies controls and limits, not account-specific answers.

## Sources opened

[1]: https://developers.cloudflare.com/ssl/concepts/
[2]: https://developers.cloudflare.com/network/websockets/
[3]: https://developers.cloudflare.com/realtime/turn/faq/
[4]: https://developers.cloudflare.com/durable-objects/platform/limits/
[5]: https://developers.cloudflare.com/durable-objects/api/state/
[6]: https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/
[7]: https://developers.cloudflare.com/durable-objects/best-practices/websockets/
[8]: https://developers.cloudflare.com/workers/observability/logs/workers-logs/
[9]: https://developers.cloudflare.com/workers/observability/logs/real-time-logs/
[10]: https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/script_and_version_settings/methods/edit/
[11]: https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http_requests/
[12]: https://developers.cloudflare.com/logs/logpush/
[13]: https://developers.cloudflare.com/workers/observability/logs/logpush/
[14]: https://developers.cloudflare.com/workers/reference/security-model/
[15]: https://developers.cloudflare.com/workers/runtime-apis/bindings/
[16]: https://developers.cloudflare.com/workers/configuration/secrets/
[17]: https://developers.cloudflare.com/workers/best-practices/workers-best-practices/
[18]: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
[19]: https://developers.cloudflare.com/turnstile/reference/content-security-policy/
[20]: https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
[21]: https://developers.cloudflare.com/waf/rate-limiting-rules/
[22]: https://developers.cloudflare.com/ruleset-engine/about/rulesets/
[23]: https://developers.cloudflare.com/ruleset-engine/reference/phases-list/
[24]: https://developers.cloudflare.com/rules/reference/page-rules-migration/
[25]: https://developers.cloudflare.com/rules/transform/response-header-modification/
[26]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP
[27]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy
[28]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy
[29]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Opener-Policy
[30]: https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/
[31]: https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/
[32]: https://developers.cloudflare.com/ssl/edge-certificates/additional-options/tls-13/
[33]: https://developers.cloudflare.com/workers/examples/security-headers/
[34]: https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/
[35]: https://developers.cloudflare.com/realtime/turn/generate-credentials/
[36]: https://developers.cloudflare.com/realtime/turn/
[37]: https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/
[38]: https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/
[39]: https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/
[40]: https://developers.cloudflare.com/web-analytics/faq/
[41]: https://developers.cloudflare.com/client-side-security/how-it-works/
[42]: https://developers.cloudflare.com/client-side-security/reference/settings/

## Adopt now / Adopt later / Skip

Effort: **S** = narrow configuration/code/test change; **M** = separate integration and end-to-end tests; **L** = major operational/product scope. Conditional controls should not delay the encrypted relay loop.

| Decision | Control/item | Named risk reduced | Adversary | Effort | Exact limit |
| --- | --- | --- | --- | --- | --- |
| Adopt now | Application-layer E2EE and explicit Cloudflare visibility boundary | Transit/intermediate-service content disclosure | Passive TLS terminator/relay operator | M | Cloudflare sees WSS frames; authentic client and endpoint/crypto assumptions remain. Not a Cloudflare encryption product.[1][2] |
| Adopt now | Two-slot, expiring, bounded no-content DO relay; hibernation reconstruction | Wrong-room routing, excess admission, resource exhaustion and durable chat leakage | Malicious client/curious storage operator | M | Async work is not automatically atomic; metadata remains and shutdown is not erasure.[4–7] |
| Adopt now | Origin checks, pre-DO rate gate and per-socket byte/message quotas | Cross-site WebSocket abuse and availability loss | Malicious website/commodity bot | S | Origin is not person identity; edge counters are approximate and WAF never checks post-upgrade records.[2][20] |
| Adopt now | Disable payload logs/traces/exports; redact query; fixed error codes | Intermediate logs retaining messages/keys/room metadata | Curious operator/log consumer | S | Redaction is not arbitrary payload sanitization or a guarantee about independent infrastructure logs.[8–13] |
| Adopt now | No Web Analytics, Page Shield monitoring or optional injected scripts | Sender/receiver third-party code and metadata collection | Third-party script/log operator or compromised dependency | S | Does not remove Cloudflare edge analytics, delivery trust or extensions.[34][39–42] |
| Adopt now | Enforced strict CSP, no-referrer, Permissions-Policy and nosniff | Endpoint XSS, referrer leakage and unwanted device API access | Injection/clickjacking/resource attacker | M | Host can replace policy/code; no screenshot/clipboard/endpoint-compromise defense.[25–28] |
| Adopt now | COOP `same-origin` | Cross-origin opener/XS-Leak exposure | Malicious opener website | S | Not same-origin isolation or protection against privileged extensions; test integrations.[29] |
| Adopt now | HTTPS/WSS-only, min TLS 1.2/TLS 1.3, cautiously scoped HSTS | Transport downgrade/legacy-protocol exposure | On-path network attacker | S | TLS terminates at Cloudflare; no bypass of trusted enterprise roots; no blind preload.[30–32] |
| Adopt now | No-store at Worker/origin and actual edge cache bypass for sensitive responses | Cache/credential-response retention | Cache operator/later device user | S | Transform-only no-store cannot change edge caching; cannot erase RAM, screenshots or backups.[25] |
| Adopt now | Minimal bindings, secret-bound administrative tokens, scoped deployment credentials | Configuration/token leakage and compromise blast radius | Repo reader/compromised dependency or deploy identity | S | Worker can read text secrets; never put chat keys on the server.[14–17] |
| Adopt now, if zone exists | Narrow WAF/rate rules configured with ordered Rulesets | HTTP room/credential/upgrade abuse | HTTP attacker/bot | S | Plan/hostname-dependent; no E2EE, identity or post-upgrade content inspection.[2][21–25] |
| Adopt later | Realtime TURN short-lived credentials, relay-only mode | Direct peer IP exposure and NAT connection failure | Curious peer/network constraints; credential thief | M | Infrastructure still knows IP/timing; DTLS/fingerprint binding required; token expiry not instantaneous.[3][35][36] |
| Adopt later, public only | Creation-only Turnstile + backend validation + atomic admission consumption | Automated room/TURN issuance | Commodity bots/token reuser | M | Added third-party code/metadata; Siteverify reuse rejection eventually consistent; no chat identity proof.[18][19] |
| Adopt later, admin only | Access allowlist/MFA, application-token validation and bypass prevention | Unauthorized admin access | External admin-surface attacker | S | Adds identity logs, not peer-key authentication; unnecessary with no admin surface.[37] |
| Adopt later, named need only | COEP and sanitized operational/CSP reporting | Cross-origin embedding and undetected delivery errors | Cross-origin resource attacker/accidental regression | M | COEP compatibility costs; reports add an observer and cannot attest client integrity.[29][41][42] |
| Skip | SFU/RealtimeKit, AI/analytics pipelines, content DLP/CASB | No additional two-party chat confidentiality reduction | Intended curious relay/endpoint adversary | L | Adds processing/scope/trust; ciphertext hides content from intermediate DLP, endpoint compromise remains. TURN alone fits one-to-one.[3] |
| Skip | Public-chat Access/WARP or endpoint interception rollout | No additional anonymous peer-key confidentiality reduction | Intended MITM/compromised endpoint | L | Identifies/enrolls users or expands inspection; does not replace application E2EE/fingerprint verification.[37] |
| Skip | Page Shield full-URI/report-only badge, TLS/WAF badge as content protection, copied header sample | No claimed content or identity protection | Intended injected-script/relay adversary | S | Report-only does not block, full URI exposes session data, WAF stops at upgrade and sample COOP is invalid.[2][29][33][41][42] |
