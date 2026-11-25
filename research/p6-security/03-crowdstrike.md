# CrowdStrike: endpoint observations and Glassbox boundaries

## What the public documentation actually establishes

CrowdStrike's EDR explainer describes collection of process creation, driver loading, registry changes, disk and memory access, DNS and network connections. It also describes cloud storage of collected endpoint telemetry and network containment. This is evidence of security-event visibility, **not evidence that basic Falcon EDR continuously records all chat text, keystrokes or screens**. For Glassbox, process/network telemetry can reveal that a browser connected to the service despite application-layer encryption. It cannot establish that either participant's device is uncompromised.[1]

The public Falcon Data Protection policy schema provides stronger, narrower evidence of possible plaintext observation. `clipboard_inspection` evaluates classified data pasted in supported browsers; `clipboard_web_origin` attributes copied web content to its source. On Windows, optional `screen_capture` records around an egress event and requires `evidence_storage`; both default off. On Mac, `enable_ocr` classifies text in screenshot/photo files during egress, not continuous screen recording. Platform, extension, policy and event coverage matter: the schema explicitly says Mac uploads without an active extension are neither monitored nor blocked.[2]

The same schema documents optional Windows evidence-file retrieval and an `end_user_encryption_activity` feature that retains original data in a protected host folder for 30 days. This does **not** establish interception of arbitrary in-memory WebCrypto or Noise calls. It does establish that applicable endpoint evidence can outlive application clearing when collection is enabled.[2]

CrowdStrike's 4 November 2026 Seraphic announcement describes browser-session inspection, policy controls for copy/paste/upload/download, extension inventory, and browser telemetry available in its SIEM. These are commercial browser-security capabilities, not features of the public Falcon SDKs or proof of compatibility with Glassbox.[3]

CrowdStrike's extension research explains that permissions can grant access to clipboard data, cookies, credentials or browser traffic and that embedded extensions need not create separate process-start events. Exposure Management's documented extension inventory covers Chrome/Edge on Windows/macOS. Therefore, “no suspicious process detected” is not an extension-integrity check.[4]

For keystrokes, CrowdStrike's Formbook research documents **malware** performing keylogging, clipboard collection, screen capture and process injection. This is not evidence that Falcon EDR itself is a keylogger. Sufficiently privileged malware can observe input before encryption or displayed plaintext after decryption without breaking the chat protocol. The 2018 article establishes this attack mechanism, not current detection efficacy against every variant.[5]

## Exact sender and receiver boundary

At the sender, the composer and imported invite are plaintext accessible to the application's delivered JavaScript. At the receiver, decrypted messages necessarily become plaintext available to rendering code and the person viewing the screen. A hostile origin, XSS, a sufficiently permitted extension, compromised OS, or authorized endpoint-monitoring software can observe some of these stages according to its access and collection configuration. E2EE's content protection against a relay does not extend to these observers. A remote relay alone does not acquire endpoint privileges.

An extension's isolated JavaScript world is not a blanket key-extraction capability: MDN says content scripts do not directly see page-script variables, but they can read and modify the page DOM when permitted. Reading a displayed message or composer can suffice; stealing cryptographic keys is unnecessary.[6]

A recipient can intentionally copy, photograph, transcribe or forward a message. Clipboard managers, screen-sharing tools and applicable endpoint evidence collection can preserve it. Memory-only history and “Clear This Device” reduce application-created retention, not remote copies, OS swap, crash dumps or forensic recoverability. A crypto worker is code organization, not a defense against malicious same-origin delivery or an OS administrator. These are Glassbox threat-model conclusions, not claims that Falcon collects all these artifacts.

Use this UI wording: **“Messages are encrypted between these browser sessions. Your device, browser extensions, organization’s monitoring software, and the other participant may still access plaintext. Clearing this device cannot erase copies elsewhere.”** Distinguish a legitimate organization's visibility from malicious compromise. Do not encourage bypassing organizational controls.

## Public open source: what is and is not reusable

Verified on 25 November 2026. Stars and detected SPDX licences below use the public GitHub catalogue snapshot where available; Toolkit and FCS Action use their opened repository pages. Search/extraction caches returned some different star counts, so these are retrieval snapshots, not a synchronized census. Dates are the latest default-branch commits from public Atom feeds, linked to their commit—not repository `pushed_at`. Activity labels are evidence-based judgments, not support guarantees.

| Repository and actual kind | Licence; stars | Latest commit, UTC | Maintenance evidence | Glassbox reuse and exact limit |
| --- | --- | --- | --- | --- |
| FalconPy: Python OAuth2 API SDK.[8] | Unlicense; 522 | [2026-11-11](https://github.com/CrowdStrike/falconpy/commit/4cf8fb3424351c49cab9024c96fe24343cc8c0a4) | Recent commits; README says maintained by CrowdStrike/community. | None in chat runtime. It queries/manages Falcon services with tenant credentials; it is not the sensor, a crypto library or browser protection. |
| gofalcon: Go API SDK.[9] | MIT; 90 | [2026-11-19](https://github.com/CrowdStrike/gofalcon/commit/7850f8b8dbfe4a70b10b679dbb474945788c4ccb) | Recent commits and documented periodic refresh. | None for the proposed Worker/browser stack. API/RTR examples are enterprise administration, not plaintext isolation. |
| rusty-falcon: Rust API bindings.[10] | MIT; 22 | [2026-06-11](https://github.com/CrowdStrike/rusty-falcon/commit/6106cef85514d8b849fc29cfce3ff5e0dc00b197) | Unarchived; periodic refresh stated; relatively sparse recent activity and no formal support stated. | None. Rust language choice does not turn generated Falcon API bindings into browser E2EE primitives. |
| Falcon-Toolkit: incident-response CLI and multi-host RTR shell.[11] | MIT; 150 | [2026-10-30](https://github.com/CrowdStrike/Falcon-Toolkit/commit/c7addde2bd2e8ea15ed0dc39264d7d519a15111e) | Recent migration commit; README names maintainer and disclaims formal product support. | None. Requires Falcon profiles/credentials and privileged response permissions; adds remote administration, not chat protection. |
| falcon-mcp: MCP server exposing Falcon APIs to AI agents.[12] | MIT; 290 | [2026-11-17](https://github.com/CrowdStrike/falcon-mcp/commit/34f7573cdffd34ee9d1c14b9728d0ba023d02af1) | **Maintenance mode**; security/dependency fixes only. New development is in hosted CrowdStrike MCP. | No deployment for Glassbox. Borrow explicit tool allowlists/read-only defaults as engineering ideas; this MCP is not a documentation-only server or endpoint attestation. |
| ansible_collection_falcon: deployment roles and platform API modules.[13] | GPL-3.0; 122 | [2026-11-20](https://github.com/CrowdStrike/ansible_collection_falcon/commit/6016d3b6cf02a437cb09b13b8fa4f6506024d9d4) | Recent release; documented CI and community/vendor maintenance. | None. Installing/configuring sensors or downloading hunting archives is out of scope. Public downloader code is not a public licence to the downloaded intelligence. |
| terraform-provider-crowdstrike: provider for Falcon console resources.[14] | MPL-2.0; 41 | [2026-11-23](https://github.com/CrowdStrike/terraform-provider-crowdstrike/commit/e0c688ee8198b9786fd7de151c0e4fded316c9f3) | Recent changes; maintained by CrowdStrike/community per README. | Policy-schema documentation is useful evidence for this report. Provider execution needs Falcon credentials; it does not configure Glassbox cryptography or its Cloudflare relay. |
| security-skills: agent `SKILL.md` files plus scripts, not an MCP server.[15] | MIT; 10 | [2026-07-14](https://github.com/CrowdStrike/security-skills/commit/2f085216f4eb229a575c7551ad10d1c15bcf5f1d) | CrowdStrike-hosted fork; limited recent activity; no general secure-coding scope demonstrated. | None directly. Actual skills manage Fusion SOAR workflows and SIEM lookup files. The opened Fusion skill requires live API action discovery; it is not an E2EE review checklist. |
| eslint-config-crowdstrike: JavaScript lint preset.[16] | MIT; 2 | [2025-08-01](https://github.com/CrowdStrike/eslint-config-crowdstrike/commit/85ec7d7deba0c009c0cd86713d59fad8ee4645a8) | Unarchived; no recent commits demonstrated. | Tiny portable idea: its actual source enables `no-eval`. Do not add the whole mostly style-oriented preset or call it a security scanner; it permits empty catches and disables `no-constant-condition`. |
| fcs-action: GitHub Action wrapping Falcon Cloud Security CLI.[17] | Unlicense; 23 | [2026-10-07](https://github.com/CrowdStrike/fcs-action/commit/d2a956e8c797e9feb7611fdd0b2f07a7a6293a9f) | Recent release; current successor documented. | Only hypothetical later enterprise CI for IaC/container scans. Requires API scopes and a separately obtained CLI; no cryptographic protocol review or end-user endpoint coverage. Skip now. |
| container-image-scan-action: older DevSecOps action.[18] | Unlicense; 18 | [2025-08-20](https://github.com/CrowdStrike/container-image-scan-action/commit/9eea353cc3e84e5f69eead0bfd4388bb79c30038) | Archived; explicitly deprecated and unmaintained; points to fcs-action. | None. Do not follow older installation examples. |
| logscale-community-content: CQL queries, alerts, dashboards, parsers and lookup content.[19] | Unlicense; 359 | [2026-11-02](https://github.com/CrowdStrike/logscale-community-content/commit/77cfc4e314d40611fdbc354c80ed39c9548fa12c) | Recent process-lineage hunting contribution; unarchived. | Borrow contextual attack explanations, not runtime code. CQL requires relevant telemetry and platform semantics; it is not a browser extension detector or crypto acceptance suite. Never ship transcript/key logs to make a dashboard work. |
| xwf-yara-scanner: X-Ways Forensics extension integrating YARA.[20] | MIT; 92 | [2025-07-30](https://github.com/CrowdStrike/xwf-yara-scanner/commit/a86dabadb2713fe93a12274bcb1ad15021a44b9f) | Unarchived; sparse recent activity. | None. Requires licensed X-Ways and separately supplied YARA rules. File scanning does not establish runtime browser integrity; README also notes chunk-boundary missed-hit risk. |
| detection-container: deliberately vulnerable Linux attack/detection demonstration.[21] | Unlicense; 63 | [2026-11-02](https://github.com/CrowdStrike/detection-container/commit/e741362de53544dcb03efac2318e4ac5b9a584bf) | Recent commits; controlled-demonstration purpose explicitly stated. | Borrow only the idea of labelled adversarial demonstrations. Do not run or copy attacks: it includes credential dumping, reverse shells and DNS exfiltration and depends on a Falcon-protected environment. |
| CrowdFMS: VirusTotal/YARA-notification sample collector.[22] | BSD-2-Clause; 132 | [2014-02-13](https://github.com/CrowdStrike/CrowdFMS/commit/c9c3facfca20879ff9b28ddbe11514090317f6ec) | Archived; last push in 2018 is not a 2018 code commit. | None. It downloads malware samples with a private API key; it is neither a maintained YARA rule collection nor appropriate chat-test tooling. |

These repositories do not supply the commercial Falcon sensor source or a chat encryption implementation. No directly reusable CrowdStrike E2EE protocol code was found. No maintained CrowdStrike-owned general-purpose Sigma ruleset was verified in this bounded review; CQL community content, YARA integration and authenticated hunting-rule downloaders must not be relabelled as one.

The MCP README illustrates a concrete boundary mistake worth avoiding: HTTP transports default to no authentication; binding beyond loopback can expose tools using the operator's Falcon credentials. It documents `--read-only`, tool allowlists and an API-key option. These are controls for a Falcon administration server, not reasons to attach one to private chat. Hosted CrowdStrike MCP is described as a commercial product, not the open-source repository.[12]

## Product features worth borrowing

Make the threat-model panel an observer map, not a green “device verified” badge. Separate sender plaintext, ciphertext at the relay, receiver plaintext, and IP/timing metadata. Mark endpoint integrity **“Not measured by this app.”** Wire Receipt demonstrates one relay ingress path; it says nothing about endpoint evidence collection or the completeness of infrastructure logs.

Offer a local-only, manual preflight checklist: use an updated trusted device/browser, review extension permissions, stop screen sharing, consider clipboard-manager retention, and understand whether the device is organization-managed. Call its completion **“Checklist reviewed on this device.”** Do not enumerate extensions through probing. `management.getAll()` is a privileged WebExtension API requiring the `management` permission, not a general website API. An ordinary page cannot provide a reliable complete extension inventory or establish absence of an EDR agent.[7]

Keep invite copying explicit with a retention warning; never automatically copy received messages. Retain the proposed privacy curtain and content-free notifications to reduce incidental shoulder-surfing and notification disclosure. Neither disables screenshots, overrides enterprise policy nor prevents an intentional recipient from retaining content. A later synthetic-only lab could show permitted DOM reading alongside successful ciphertext authentication, demonstrating why endpoint observation is a different attack class from relay tampering.[6]

As a small development control, borrow the `no-eval` rule rather than its vendor branding. Add project-specific bans on transcript/key logging and persistent-storage imports separately, with tests; those bans are our recommendation, not features provided by CrowdStrike's preset. Static linting does not detect every XSS path or malicious build replacement.[16]

## What remains unverified

No Falcon-compatible test of Glassbox exists. The precise coverage of clipboard evaluation, arbitrary text input, screenshots, Noise/WebCrypto use, OS memory, and extension inspection depends on module, platform, permissions and policy; the public sources do not prove complete interception. They also do not support a claim of universal keystroke capture by basic EDR.

The unauthenticated GitHub commit API returned HTTP 403, so commit dates were verified through public Atom feeds instead. A local Python HTTPS trust-store error was resolved by using curl with certificate verification still enabled; TLS verification was not disabled. No vendor software, sensor, CLI, repository code or tests were installed or run; no accounts, authenticated vendor calls, interception, chat/key uploads or deployments occurred. Only this report was deliberately written.

Open decisions: Is the prototype intended for real sensitive conversations or synthetic evaluation? Should a managed-device warning be always visible rather than depend on self-report? Who can independently verify the delivered client build? For each, the default must avoid implying device attestation or permission to bypass organizational controls.

## References

[1]: https://www.crowdstrike.com/en-us/cybersecurity-101/endpoint-security/endpoint-detection-and-response-edr/ "CrowdStrike EDR concepts and endpoint telemetry"
[2]: https://developer.crowdstrike.com/cac/terraform/provider/data-protection/resources/data-protection-policy/ "Falcon Data Protection policy schema and platform limits"
[3]: https://www.crowdstrike.com/en-us/blog/crowdstrike-brings-enterprise-browser-security-to-falcon-platform/ "Falcon Seraphic availability and browser-session controls, 4 November 2026"
[4]: https://www.crowdstrike.com/en-us/blog/prevent-breaches-by-stopping-malicious-browser-extensions/ "CrowdStrike browser-extension risks and inventory coverage"
[5]: https://www.crowdstrike.com/en-us/blog/a-hunters-perspective-detecting-formbook-3-8-activity-in-your-environment/ "Formbook malware input capture and behavioral hunting"
[6]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts "MDN content-script permissions and DOM access"
[7]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/management/getAll "MDN privileged extension inventory API"
[8]: https://github.com/CrowdStrike/falconpy "FalconPy repository and OAuth2 SDK scope"
[9]: https://github.com/CrowdStrike/gofalcon "gofalcon repository and API examples"
[10]: https://github.com/CrowdStrike/rusty-falcon "rusty-falcon repository and maintenance statement"
[11]: https://github.com/CrowdStrike/Falcon-Toolkit "Falcon Toolkit repository, licence and RTR requirements"
[12]: https://github.com/CrowdStrike/falcon-mcp "Falcon MCP maintenance mode and tool-access controls"
[13]: https://github.com/CrowdStrike/ansible_collection_falcon "CrowdStrike Falcon Ansible collection"
[14]: https://github.com/CrowdStrike/terraform-provider-crowdstrike "CrowdStrike Terraform provider scope and credentials"
[15]: https://github.com/CrowdStrike/security-skills "CrowdStrike-hosted security-skills fork and actual skills"
[16]: https://raw.githubusercontent.com/CrowdStrike/eslint-config-crowdstrike/main/index.js "Actual CrowdStrike JavaScript ESLint rules"
[17]: https://github.com/CrowdStrike/fcs-action "Current Falcon Cloud Security GitHub Action"
[18]: https://github.com/CrowdStrike/container-image-scan-action "Deprecated container-scanning action"
[19]: https://github.com/CrowdStrike/logscale-community-content "Public CQL community queries and hunting content"
[20]: https://github.com/CrowdStrike/xwf-yara-scanner "YARA X-Ways integration and chunk-boundary limitation"
[21]: https://github.com/CrowdStrike/detection-container "Deliberately vulnerable Falcon detection demonstration"
[22]: https://github.com/CrowdStrike/CrowdFMS "Archived VirusTotal YARA-notification sample collector"
[23]: https://raw.githubusercontent.com/CrowdStrike/security-skills/main/plugins/fusion-workflows/skills/fusion-workflows/SKILL.md "Fusion workflow skill requiring live tenant API discovery"
[24]: https://github.com/CrowdStrike/eslint-config-crowdstrike "JavaScript lint preset licence and repository metadata"

## Adopt now / Adopt later / Skip

Effort: S = small UI/documentation or lint change; M = bounded implementation and tests; L = integration/deployment burden. Skip effort describes burden avoided, not authorization to execute it.

| Decision | Control or item | Risk reduced | Adversary or observer | Effort | Exact limit |
| --- | --- | --- | --- | --- | --- |
| Adopt now | Observer/threat-model panel and explicit endpoint warning.[1] [2] | Unsafe reliance on E2EE against sender/receiver endpoint observation. | Permitted endpoint monitor, malware, malicious origin, recipient. | S | Informs users; does not detect or prevent observation and must not certify device health. |
| Adopt now | Manual local integrity checklist and extension-permission hints.[4] [7] | Avoidable exposure to untrusted extensions, stale clients and screen sharing. | Malicious extension, screen observer. | S | Self-review only; no inventory, attestation or assurance that an extension/EDR is absent. |
| Adopt now | Explicit invite-copy action, clipboard retention warning, no automatic message copying.[2] | Accidental invite/plaintext retention outside app memory. | Clipboard manager, endpoint monitor, accidental redistributor. | S | Cannot erase copied content or prevent authorized clipboard inspection. |
| Adopt now | Privacy curtain and content-free notifications. | Incidental receiver screenshot/notification/shoulder-surf exposure. | Casual screen observer. | S | Curtain only hides current display; no screenshot prevention or protection from intentional recipient/OS capture. |
| Adopt now | Minimal `no-eval` plus separate transcript/key logging and storage lint/test gates.[16] | Accidental dynamic-code paths and developer-created plaintext persistence. | Input attacker exploiting an eval path; developer/log collector. | S–M | No comprehensive XSS detection, hostile-origin protection, protocol review or OS-erasure guarantee. |
| Adopt later | Synthetic-only endpoint-observation demonstration.[6] | Confusing authenticated transport with sender/receiver integrity. | Permitted DOM reader or intentional recipient. | M | Demonstration of boundary, not an EDR test; never run malware or collect real conversations. |
| Skip | Falcon SDKs, Toolkit, MCP, Ansible and Terraform runtime integration.[8]–[15] | No additional chat-content risk reduced in this prototype. | Relay attacker and compromised endpoint remain outside these API wrappers' protection. | L avoided | Requires separate tenant/permissions/agent infrastructure; SDK/MCP is neither encryption nor attestation. |
| Skip | YARA/collector/detection-container execution and old scan action.[18] [20]–[22] | No relevant browser-chat confidentiality risk reduced. | Endpoint attacker remains; running samples/attack scripts can introduce new risk. | M–L avoided | Forensics dependencies, archived code or deliberately dangerous lab behavior; no vendor tooling authorized. |
| Skip | FCS Action deployment for this browser/Worker prototype.[17] | No immediate endpoint/chat-protocol risk reduced. | Supply-chain/IaC attacker only potentially addressed in a different enterprise CI deployment. | M avoided | Credentialed IaC/container scan wrapper, not an E2EE code review; reconsider only with a real matching stack and authorization. |
| Skip | Automatic extension/EDR detector or “device verified” badge.[6] [7] | None; avoids adding a misleading assurance claim. | Hidden extension, permitted monitor, OS administrator. | M avoided | A website lacks reliable complete inventory; absence of observable hints does not establish endpoint integrity. |
