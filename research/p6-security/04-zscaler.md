# R4 — Zscaler: enterprise-network boundaries for Glassbox

Verified 25 November 2026. Author: Client AI. Glassbox is a proposal, not a built or tested application.

## TLS inspection and WebSocket content

Zscaler's SSL-inspection documentation describes two TLS sessions: browser ↔ Zscaler and Zscaler ↔ destination. The browser accepts a substitute certificate signed by the Zscaler intermediate CA or an enterprise intermediate CA because the corresponding trust root was installed. Transport TLS therefore does not hide HTTP or WSS content from the inspecting proxy.[1] [2]

Current ZIA documentation explicitly lists WebSocket and WebSocket SSL/TLS in DLP protocols. It says bidirectional WebSocket inspection supports text-based content and requires contacting Support to enable the feature. The April 2025 announcement establishes that the feature exists, not that every tenant, binary frame or application is inspected. Do not repeat its performance or comprehensive-visibility marketing claims.[3] [4]

For Glassbox, an inspector removing WSS encryption obtains clear application-envelope fields, handshake material and application-encrypted records, not chat plaintext, **assuming authentic client code, correct authenticated encryption, uncompromised endpoints and an unexposed invite**. JSON/base64 encoding of ciphertext does not make the underlying message DLP-readable. This is a protocol consequence, not a claim that Zscaler recognizes or exempts Glassbox. Policies can block the site, protocol or transfer without reading messages.[2] [3] [5]

This protection is narrower than resistance to an active TLS-terminating adversary. Such an adversary able to alter delivered HTML/JavaScript can make the browser disclose its fragment invite, keys or plaintext before encryption. SRI checks resources against hashes supplied by the document; a replaceable document can replace those hashes too. Likewise, CSP delivered through the same compromised channel does not establish independent client authenticity. This is an architectural trust deduction, not evidence that Zscaler ordinarily performs malicious injection.[6] [7]

## Pinning is not automatic bypass

Zscaler describes certificate pinning as a native desktop/mobile application comparing a server certificate against a hardcoded known set. An inspecting proxy's substitute certificate can cause the client to terminate TLS. ZIA cannot reliably detect pinning from handshake failure: there is no standard pinning signal. The documented remedy is an administrator-configured cloud-app or domain inspection exemption, not automatic fail-open bypass.[8]

The policy actions are Inspect, Do Not Inspect and Block. Do Not Inspect can still Evaluate Other Policies or Bypass Other Policies. The latter bypasses URL filtering and cloud-app controls, not necessarily every network control. 'Block Undecryptable Traffic' is documented for non-standard TLS encryption or mutual TLS; it must not be confused with ordinary application ciphertext inside successfully inspected WSS.[5]

Glassbox's proposed ordinary browser client is not a certificate-pinned native application. WebRTC DTLS fingerprints authenticate a different transport; they are not HTTPS certificate pinning. Do not advertise browser pinning or tell users to disable enterprise inspection, install trust roots, or click through certificate errors. Explain failures and direct users to their administrator.[6] [8]

## WebRTC is not just another inspected HTTPS connection

For chat data, RFC 8831 specifies SCTP over DTLS over ICE/UDP. DTLS-SRTP concerns audio/video media; Glassbox's RTCDataChannel is not an SRTP stream. Removing transport TLS from the WSS signaling connection does not remove peer-to-peer DTLS. Authenticated, encrypted signaling must bind the SDP DTLS fingerprints to the established application session: RFC 8827 explicitly warns that even an HTTPS signaling server can substitute keys without independent verification.[6] [9]

Z-Tunnel 1.0 forwards proxy-aware or port 80/443 traffic through CONNECT. Z-Tunnel 2.0 carries packets over an outer DTLS or TLS tunnel and can forward all ports/protocols. That outer Client Connector tunnel is distinct from WebRTC's inner peer DTLS connection. Terminating the outer tunnel does not by itself decrypt the inner connection. Cloud Firewall can allow/block outbound UDP, TCP and ICMP; DNS and NAT controls can alter routing. Configured Z-Tunnel 2.0 setup-failure behavior can bypass non-web traffic, block non-web traffic, or block nearly all traffic. There is no universal 'Zscaler blocks WebRTC' or 'WebRTC bypasses Zscaler' behavior.[10] [11] [12]

STUN discovers mapped addresses and TURN relays packets. Both require reachable services; outbound UDP restrictions, proxy support, browser enterprise policy and destination rules determine which ICE candidates succeed. TURN supports UDP, TCP, TLS/TCP and DTLS/UDP between client and server at the protocol level; a particular browser/provider still needs compatible support. TURN over TCP/TLS is a connectivity option, not guaranteed passage through an HTTPS-only proxy or application policy.[13] [14]

| Glassbox route | What an enterprise observer can obtain | Content and availability limit |
| --- | --- | --- |
| WSS application relay, no WebRTC started | With TLS inspection: HTTP upgrade URL/headers, clear routing envelope, public handshake data, ciphertext records, lengths and timing. | Correct application E2EE prevents passive message reading; the proxy can still block, capture or alter frames. Active client replacement remains outside this protection. |
| Direct RTCDataChannel | Routed packet endpoints, timing/size and exposed STUN/ICE information; inspected WSS control records remain application ciphertext. | Ordinary HTTPS inspection does not decrypt peer DTLS; direct connectivity/IP disclosure depends on routing and policy. |
| TURN-only RTCDataChannel | TURN infrastructure sees allocations, client/peer routing information and encrypted peer packets. Managed networks see visible outer destinations/flows; readable TURN control depends on its outer transport. | TURN does not normally terminate peer DTLS. It does not hide the client from TURN or the managed network, and policy may block it. |

The strongest minimal managed-network option is **WSS relay-only with no RTCPeerConnection construction or ICE gathering**, not merely waiting for direct ICE to fail. It avoids WebRTC-specific peer-IP disclosure and extra STUN/TURN destinations, while preserving the same application encryption. It is more compatible with web-only egress, but still may be blocked. RFC 8828 explains that STUN can expose a direct public address when an HTTP proxy is used but direct internet access remains allowed.[14]

An optional 'Hide IP from peer' WebRTC mode can use `iceTransportPolicy: 'relay'` before gathering; MDN defines this as considering only relayed candidates. Keep it distinct from 'WSS relay-only'. Switching routes must retain authentication or start a clearly labeled fresh verified session, never downgrade to plaintext.[15]

## DLP, metadata, CASB and remote endpoints

ZIA DLP can detect accessible plaintext using dictionaries/engines, block transfers, notify auditors, and forward incidents through ICAP or cloud-to-cloud destinations. The documented 'without content inspection' mode means Zscaler engines are not used and selected content can be forwarded to a third-party DLP system; it does **not** mean transport decryption is unnecessary or that third-party DLP can decrypt Glassbox records. Do not introduce plaintext logging, support uploads or a DLP/LLM inspection API in Glassbox.[3] [16]

The NSS web-log schema exposes timestamps, user login/department when known, URL/host, referrer, user agent, client/internal/public IP, server IP, request/response byte counts, policy decisions and whether TLS was inspected. Some fields require additional enablement. These are schema capabilities, not proof that every field is populated for every WSS session or that individual frames are retained by default. Still, an observing proxy can correlate usage with a managed user's identity even when Glassbox has no accounts.[17]

The invite fragment is not sent in the HTTP request, so passive URL inspection does not receive it merely because the page is opened. Keep secrets out of paths, query strings, headers and logs; strip the fragment after import. This does not protect a complete invite pasted into a monitored sharing app, clipboard, extension or remote browser, or from JavaScript inserted before import.[18]

Zscaler describes remote browser isolation as loading the website in a cloud browser and streaming rendered pixels to the local browser. This reduces local exposure to active malicious web content, but changes Glassbox's sender/receiver endpoint: the invite, crypto keys and decrypted transcript exist in the remote browser if the app runs there. The operator becomes part of the trusted endpoint boundary. This is a capability/trust observation, not evidence that Zscaler routinely records chat keys.[19]

Isolation clipboard policies can permit either direction, both directions or neither; its documented clipboard can retain the last 25 copied items. Read-only isolation can prohibit text entry and paste altogether, making a chat composer unusable. Restrictions reduce sanctioned copy/export paths, not operator access or external-camera capture.[20] [21]

Zscaler CASB has an inline proxy mode for data in motion and an out-of-band SaaS API mode for data at rest. The latter needs an integrated SaaS tenant and permissions. Glassbox's memory-only browser transcript and ciphertext-only relay offer no SaaS plaintext repository for it to scan. CASB becomes relevant if a participant exports messages or invites into an integrated SaaS app; it is not a chat E2EE component. ZPA provides access controls for private apps; it neither supplies anonymous public room pairing nor independently authenticates the chat peer. Its AppProtection can enforce WebSocket framing/header and payload/fragment limits on configured private apps, but that is different from ZIA DLP and does not decrypt the application layer.[22] [23]

## What the public open source actually provides

The licence files, public repository metadata and latest default-branch commits below were read on 25 November 2026. Stars link to the metadata endpoint; dates link to the exact commit. All five repositories were not archived or disabled. November commits support current maintenance for the SDKs/providers; the MCP project's August release and public-preview README suggest maintenance with less-recent default-branch activity. These observations do not constitute an application audit or assurance of code quality.[24] [25] [26] [27] [28]

| Repository/type | Licence | Stars | Latest default-branch commit, UTC | Maintenance and reuse limit |
| --- | --- | ---: | --- | --- |
| [zscaler-mcp-server][24], Python MCP server | [MIT](https://raw.githubusercontent.com/zscaler/zscaler-mcp-server/master/LICENSE) | [56](https://api.github.com/repos/zscaler/zscaler-mcp-server) | [2026-08-19 15:03:45](https://github.com/zscaler/zscaler-mcp-server/commit/6340cd24087a5681bc9ca2ba1c477748fbcc7bcb) | Release 0.15.4; public preview. Administrative API tool bridge, not chat crypto or a public-docs search server. |
| [zscaler-sdk-python][25], server-side SDK | [MIT](https://raw.githubusercontent.com/zscaler/zscaler-sdk-python/master/LICENSE.md) | [34](https://api.github.com/repos/zscaler/zscaler-sdk-python) | [2026-11-11 04:28:54](https://github.com/zscaler/zscaler-sdk-python/commit/21fdc64fd599c471d233b2d4e73d335b08a44d14) | Release 1.11.5; appears actively maintained. Tenant API client; nothing required in the browser-chat runtime. |
| [zscaler-sdk-go][26], server-side SDK | [MIT](https://raw.githubusercontent.com/zscaler/zscaler-sdk-go/master/LICENSE) | [15](https://api.github.com/repos/zscaler/zscaler-sdk-go) | [2026-11-20 17:08:35](https://github.com/zscaler/zscaler-sdk-go/commit/8bb5c134ac71982b113d978393a497daaad8f0cc) | Recent paging/rate-limit fix; appears actively maintained. Tenant API client, not WebRTC or E2EE implementation. |
| [terraform-provider-zia][27], Terraform provider | [MIT](https://raw.githubusercontent.com/zscaler/terraform-provider-zia/master/LICENSE) | [53](https://api.github.com/repos/zscaler/terraform-provider-zia) | [2026-11-23 19:53:02](https://github.com/zscaler/terraform-provider-zia/commit/3cf91d8a60599e1991a9f1f1b5499a040bb97a1e) | Recent user-lookup fix; appears actively maintained. Reusable policy schema/examples, not local DLP or encryption. |
| [terraform-provider-zpa][28], Terraform provider | [MIT](https://raw.githubusercontent.com/zscaler/terraform-provider-zpa/master/LICENSE) | [67](https://api.github.com/repos/zscaler/terraform-provider-zpa) | [2026-11-17 01:30:15](https://github.com/zscaler/terraform-provider-zpa/commit/52a9daa5a6355b95c0b542e9c810d7c3c70cdc67) | Recent SCIM/SDK fix; appears actively maintained. Private-app administration; unnecessary for public two-person chat. |

The MCP README documents read-only `list_*`/`get_*` tools by default. Writes require both a global enable flag and an explicit tool allowlist. Later, an authorized enterprise administrator could use narrowly scoped read-only policy retrieval to explain blocked routes. This still requires tenant API credentials/product entitlements and exposes returned enterprise policy data to the agent. Read-only is a mutation restriction, not a confidentiality boundary. Runtime enforcement was not tested, and no Zscaler service was authenticated.[24]

The Python/Go SDKs interact with Zscaler tenant APIs through OneAPI/OAuth or applicable legacy credentials. They are neither coding-agent skills nor browser E2EE libraries. There is no direct runtime code to reuse now. The transferable idea is separating read-only administrative operations from writes, with narrow capabilities, rather than embedding these SDKs or an MCP server in chat.[25] [26]

Concrete open-source policy examples do exist inside the ZIA provider: `zia_dlp_dictionaries` configures phrases/patterns, predefined-dictionary references and exact-data-match schemas; `zia_dlp_web_rules` includes `WEBSOCKET_RULE`/`WEBSOCKETSSL_RULE`, actions and incident receivers. These are public HCL examples for a commercial service, **not an open-source corpus of Zscaler's production DLP dictionaries** and not ciphertext decryption. Borrow explicit rule order, protocol scope and action schemas for a network-policy simulator; use actual provider/API integration only in a separately authorized enterprise test.[29] [30]

The provider's best-practices guide also warns that resource secrets can reside in Terraform state in plaintext, that `sensitive` only redacts CLI output, and that debug logs/plan files need protection. Policy-as-code creates new intermediate-service leak surfaces; it is not a reason to add Terraform state or vendor credentials to this chat prototype.[31]

## User-facing boundary and remaining evidence gaps

Suggested copy: “Your organization may inspect connections and associate usage with your device or account. Application encryption protects message content from passive network inspection only when the client code and both endpoints are trusted. A managed or remotely hosted browser can access content before encryption and after decryption. Your network may block this chat. Relay-only avoids direct peer-IP disclosure; it does not provide anonymity or bypass organizational policy.”

Show the actual route as Direct WebRTC, TURN relay or WSS relay. Offer WSS relay-only before networking, and make failures explicit without weakening encryption. Do not label users 'unmonitored' based on a connection test or claim reliable automatic detection of inspection/isolation. Browser management, routing, clipboard policy and the recipient's retention remain outside Glassbox's control.

No endpoint agent was installed; no accounts, vendor credentials, interception, uploads or deployments were used. Two public GitHub recursive-tree requests returned HTTP 403; repository metadata/commits and direct licence/README/resource documents were available. An initial local Python certificate-chain error was resolved by system curl with certificate verification still enabled. The repository inventory is not an exhaustive code search.

Unverified: Glassbox across an actual ZIA tenant, tenant-specific WebSocket/binary-frame inspection, WebRTC compatibility inside Zero Trust Browser, TURN/browser/provider combinations, and exact WSS capture/retention. No Zscaler integration or MCP permission test was run. Future testing must be separately authorized and use synthetic traffic; recommended checks are that WSS-only creates no ICE/STUN traffic, policy failures do not trigger plaintext downgrade, and changed encrypted SDP/fingerprints are rejected before WebRTC setup.

Open questions: Will any intended user run a remote/managed browser? Is enterprise policy expected to permit opaque E2EE traffic? Is WSS-only acceptable when UDP/TURN is blocked? If an authorized tenant test is later available, which forwarding profile, firewall rules, WebSocket feature flags and log/incident-forwarding policies apply?

## References

[1]: https://www.zscaler.com/resources/security-terms-glossary/what-is-ssl-inspection "Zscaler TLS interception connection and certificate sequence"
[2]: https://help.zscaler.com/zscaler-deployments-operations/zia-ssl-inspection-leading-practices-guide "TLS inspection prerequisites, limits and dependent services"
[3]: https://help.zscaler.com/zia/configuring-dlp-policy-rules-without-content-inspection "DLP forwarding mode and supported text-based WebSocket inspection"
[4]: https://www.zscaler.com/de/blogs/product-insights/securing-ai-communication-protocols-websocket-zia "ZIA WebSocket inspection announcement, 8 April 2025"
[5]: https://help.zscaler.com/zia/configuring-ssltls-inspection-policy "Inspection, blocking, bypass and undecryptable-TLS policy actions"
[6]: https://www.rfc-editor.org/rfc/rfc8827.html "WebRTC trust model and independently verified peer fingerprints"
[7]: https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity "SRI validates resource hashes supplied by the document"
[8]: https://help.zscaler.com/zia/certificate-pinning-and-ssltls-inspection "Certificate pinning failure and administrator-configured exemptions"
[9]: https://www.rfc-editor.org/rfc/rfc8831.html "RTCDataChannel uses SCTP over DTLS, unlike SRTP media"
[10]: https://help.zscaler.com/zscaler-client-connector/about-z-tunnel-1.0-z-tunnel-2.0 "Z-Tunnel 1.0 proxy forwarding and Z-Tunnel 2.0 all-protocol forwarding"
[11]: https://help.zscaler.com/zscaler-client-connector/configuring-forwarding-profiles-zscaler-client-connector "Outer DTLS/TLS transports and configurable fail-open or fail-close behavior"
[12]: https://help.zscaler.com/zia/understanding-firewall-capabilities "Cloud Firewall control of TCP, UDP, ICMP, DNS and NAT"
[13]: https://www.rfc-editor.org/rfc/rfc8656.html "TURN relay addressing, enterprise UDP restrictions and transports"
[14]: https://www.rfc-editor.org/rfc/rfc8828.html "WebRTC proxy/IP exposure and UDP/TCP relay recommendations"
[15]: https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection "RTC ICE relay policy and candidate-prefetch behavior"
[16]: https://help.zscaler.com/zia/configuring-dlp-policy-rules-content-inspection "DLP content engines, actions and incident forwarding"
[17]: https://help.zscaler.com/zia/nss-feed-output-format-web-logs "ZIA log metadata and inspection status schema"
[18]: https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment "URI fragment is client-side and not sent with the HTTP request"
[19]: https://www.zscaler.com/resources/security-terms-glossary/what-is-remote-browser-isolation "Remote browser execution and pixel streaming"
[20]: https://help.zscaler.com/zero-trust-browser/using-clipboard-isolation "Isolation clipboard directions and last-25-item retention"
[21]: https://help.zscaler.com/zero-trust-browser/read-only-mode-isolation "Isolation policy can prevent text entry and paste"
[22]: https://help.zscaler.com/zscaler-deployments-operations/saas-security-api-deployment-and-operations-guide "Inline CASB versus authorized SaaS-at-rest API scanning"
[23]: https://help.zscaler.com/zpa/about-websocket-controls "Private-app WebSocket framing/header and payload controls"
[24]: https://github.com/zscaler/zscaler-mcp-server "MCP administrative API bridge, preview status and documented permission gates"
[25]: https://github.com/zscaler/zscaler-sdk-python "Official server-side Python tenant API SDK"
[26]: https://github.com/zscaler/zscaler-sdk-go "Official server-side Go tenant API SDK"
[27]: https://github.com/zscaler/terraform-provider-zia "Official ZIA Terraform provider"
[28]: https://github.com/zscaler/terraform-provider-zpa "Official ZPA Terraform provider"
[29]: https://raw.githubusercontent.com/zscaler/terraform-provider-zia/master/docs/resources/zia_dlp_dictionaries.md "Open-source dictionary configuration examples, not production dictionary contents"
[30]: https://raw.githubusercontent.com/zscaler/terraform-provider-zia/master/docs/resources/zia_dlp_web_rules.md "Open-source DLP rule examples including WebSocket protocol scope"
[31]: https://registry.terraform.io/providers/zscaler/zia/latest/docs/guides/best-practices "Provider guidance on state, resource secrets, plan files and logs"

## Adopt now / Adopt later / Skip

Effort: S = small prototype change; M = integration/test work; L = separate delivery or enterprise project. All rows are recommendations, not implemented controls.

| Decision | Control/item | Named risk reduced | Adversary | Effort | Exact limit |
| --- | --- | --- | --- | --- | --- |
| Adopt now | Keep application AEAD/authentication above WSS or WebRTC.[2] [6] | Transit/intermediate-service message disclosure and tampering. | Passive TLS-inspecting proxy; active frame/signaling attacker without endpoint keys. | M | Authentic client/endpoints and unexposed invite required; no metadata or availability guarantee. |
| Adopt now | WSS relay-only selected before constructing WebRTC.[14] | Peer-IP/ICE disclosure and unintended non-web egress. | Curious peer; destination observer; unintended routing path. | S | Relay/managed network still sees IP/identity and traffic metadata; WSS can be blocked. |
| Adopt now | Authenticate encrypted SDP, ICE and DTLS fingerprints.[6] | Key substitution and signaling metadata exposure. | Malicious relay or TLS-inspecting signaling intermediary. | M | Cannot protect a compromised browser or substituted client; invite theft remains relevant. |
| Adopt now | Keep invite secret in fragment, strip after import; omit plaintext from URLs/logs.[17] [18] | Secret leakage into proxy URLs, relay logs and browser-history exposure. | Passive proxy/log reader; later casual history reader. | S | Full invite sharing, extensions, clipboard, remote browser and malicious delivered JS remain exposed. |
| Adopt now | Managed-network/remote-browser warning plus truthful route/failure UI.[19] [21] | Sensitive use based on a false endpoint or anonymity assumption. | Managed/remote endpoint operator; curious recipient. | S | Information and user choice, not enforcement or reliable automatic detection. |
| Adopt later | TURN-only option with relay policy set before gathering.[13] [15] | Direct peer-IP disclosure while retaining RTCDataChannel. | Curious peer. | M | TURN and network retain metadata; browser/provider/proxy compatibility must be tested. |
| Adopt later | Independently verified/pinned client distribution.[6] [7] | Malicious browser-client delivery reading secrets/plaintext. | Active TLS-terminating middlebox or compromised origin. | L | Trust anchor must arrive independently; endpoint compromise and recipient copying still win. |
| Adopt later | Authorized enterprise policy test using scoped read-only MCP and versioned synthetic policy cases.[24] [29] [30] | Unexplained route failures and accidental overbroad policy changes. | Misconfigured administration; agent granted excessive write authority. | M | Requires tenant authorization; read results can reveal enterprise data; no added chat-content confidentiality. |
| Skip | Embed Zscaler MCP/Python/Go SDK in chat.[24] [25] [26] | No Glassbox chat-content risk reduced. | Enterprise policy administrator is the intended user, not an outsider chat adversary. | M | Tenant API automation only; adds credentials, code and agent-data surfaces. |
| Skip | Commercial DLP/CASB or public HCL dictionaries as an E2EE guarantee.[16] [22] [29] | No ciphertext disclosure risk reduced; DLP targets accessible plaintext exfiltration. | Enterprise insider/exporting employee, not a ciphertext-only network observer. | L | Cannot read correct E2EE without endpoint/plaintext access; API CASB needs a SaaS repository. |
| Skip | Browser-isolation deployment as 'devices-only E2EE'.[19] [20] | May reduce local web-code compromise, not remote-operator plaintext access. | Malicious website; remote-browser operator remains trusted. | L | Moves crypto/plaintext to a cloud endpoint; copy restrictions do not prevent photographs. |
| Skip | Pinning/bypass marketing or instructions to defeat managed-network policy.[5] [8] | No Glassbox prototype risk reduced. | Active proxy, network administrator. | S | Browser client is not pinned; exemptions are admin-controlled, never an automatic success path. |
