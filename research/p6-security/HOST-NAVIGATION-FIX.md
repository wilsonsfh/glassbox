# Q6 — Safe top-level navigation fix

Verified on **2026-11-25**, Linux cloud sandbox, Node 22, loopback test port **5816**. This is a focused HTTP server fix, not a crypto change or security audit.

## Reproduced defect versus unverified report

Wilson reported a `Forbidden` page. The lead and this fix pass independently reproduced a specific server defect: plain `GET /` returned **200** for both `localhost:5816` and `127.0.0.1:5816`, but the same request with `Sec-Fetch-Site: cross-site`, `Sec-Fetch-Mode: navigate`, and `Sec-Fetch-Dest: document` returned **403**. The Host allowlist already explicitly contained `localhost`, `127.0.0.1`, and `[::1]` with the selected port; a missing loopback hostname was not the reproduced cause.

The former HTTP guard rejected every request with `Sec-Fetch-Site: cross-site`, including a normal top-level link to the public app shell. This can explain navigation from a separate Manus/hub site. **Wilson's exact Mac/browser request headers, current Mac server process, and Mac resolution are unverified.** Cloud reproduction does not establish that every possible `Forbidden` report has this cause.

Pre-fix evidence: [`host-navigation-before.txt`](../p6-prototype/evidence/host-navigation-before.txt) records both hostnames' 200/403 responses. A test-first regression recorded the expected `403 !== 200` failure in [`host-navigation-regression-before.tap`](../p6-prototype/evidence/host-navigation-regression-before.tap).

## Narrow implementation

`analysis/p6-prototype/server.mjs` now permits the cross-site HTTP request only when **all** of these hold:

- The request target is exactly `/` (no query, asset, health, API or relay path).
- The method is `GET` or `HEAD`.
- Fetch mode is exactly `navigate`.
- Fetch destination is exactly `document`, not `iframe`, `frame`, `script`, `image` or a fetch destination.

Exact Host validation, rejection of forwarded-host values, and existing HTTP Origin checks still run regardless of this exception. An ordinary anchor GET has no Origin header; a supplied foreign Origin still rejects. The exact Host allowlist and loopback-only listener are unchanged. No wildcard, CORS allow-origin header, proxy trust, or client-side workaround was added. CSP, SRI, CORP, COOP, referrer/cache/frame controls and rate limits are unchanged.

**WebSocket upgrade checks are unchanged:** Origin remains mandatory and must exactly equal `http://${Host}` after Host validation. `localhost` and `127.0.0.1` are not interchangeable Origins on a given connection. Navigation metadata never bypasses that boundary. Fetch Metadata is an HTTP isolation signal, not a replacement for authentication or WebSocket Origin validation.

The loaded public document subsequently requests its assets same-origin; cross-site requests directly to those assets remain denied. URL-fragment invites do not change the HTTP request target `/`. This patch intentionally does not broaden cross-site navigation to query-bearing root URLs or other routes.

## Verification

`node --check server.mjs` passed. The full no-install command below passed **31/31 tests**, with **0 failures or skips**:

```sh
cd analysis/p6-prototype
node --test tests/core.test.mjs tests/relay.test.mjs
```

[`host-navigation-node-tests.tap`](../p6-prototype/evidence/host-navigation-node-tests.tap) includes the original crypto and relay regressions plus five focused security groups. Both real loopback hostnames serve `/`, JS, CSS, worker JS and favicon with normal GET/HEAD; cross-site root GET/HEAD document navigation succeeds. Cross-site non-navigation requests, embeds, direct assets, `/health`, API/relay paths, query-bearing root, and unsafe methods reject. Malicious Host, wrong port, forwarded host (even the nominal allowed host), foreign/null/mismatched Origin, and foreign/missing WebSocket Origin reject, including when navigation metadata is supplied. The original actual two-peer encrypted exchange and all crypto regressions still pass.

[`host-navigation-after.txt`](../p6-prototype/evidence/host-navigation-after.txt) records post-fix cross-site root **200** for both hostnames, with direct cross-site asset/health/API requests still **403**.

### Focused browser check

The real-anchor harness is [`tests/host-navigation-browser.py`](../p6-prototype/tests/host-navigation-browser.py). It uses a local hub fixture at `127.0.0.2` and genuine clicks to each loopback hostname, captures the browser-generated Fetch Metadata, checks shell and same-origin script/style loading, and saves screenshots plus JSON. It launches `/usr/bin/chromium --no-sandbox` only under this required exclusive lock:

```sh
flock -x -w 120 /tmp/chrome.lock python3 tests/host-navigation-browser.py
```

**BLOCKED — browser execution not verified.** All three exclusive-lock acquisitions timed out (120, 240 and 180 seconds), the last at approximately **23:33:35 +08**. Chromium did not launch; no browser-generated request-header record or screenshot is claimed. The final attempt's [`host-navigation-browser.log`](../p6-prototype/evidence/host-navigation-browser-run.txt) records `BROWSER_TEST_EXIT=1`. [`host-navigation-summary.json`](../p6-prototype/evidence/host-navigation-summary.json) records this blocker separately from the passing HTTP/Node checks. The harness syntax passed, but that is not a browser result. Retry the command when `/tmp/chrome.lock` is available. No other browser process was touched and no MCP browser was used. All owned temporary Q6 test processes are stopped and :5816 is free at handoff.

## Apply and restart

Sync the corrected `server.mjs` and regression files to the target working copy. A running Node process retains the old handler: **restart the intended Q6 process** from that directory, for example `node server.mjs --port 4816` on the documented Mac port. Stop only that known Q6 process, not all Node processes. Restart ends existing in-memory relay sessions, so use a fresh conversation afterward.

Recheck the actual Mac link from Manus/hub after restart. If it is still Forbidden, capture the actual request's Host, Origin, forwarded-host and Fetch Metadata; do not relax those guards or infer a Mac fix from cloud evidence. No Mac deployment, browser compatibility claim, LAN/public exposure or unrelated crypto changes are included in this pass.

## Browser verification (build lead, 23:36 +08, Sandbox Chromium 1 run under the shared lock)
`tests/host-navigation-browser.py` ran in real headless Chromium against a fixture page on a different origin that links to `http://localhost:5816/` and `http://127.0.0.1:5816/`. Result: 17 PASS, 0 FAIL. Both real anchor clicks produced `Sec-Fetch-Site: cross-site / Mode: navigate / Dest: document`, no `Origin` header, a 200 with the rendered Glassbox app shell (not "Forbidden"), same-origin assets loaded, no CORS allow-origin header, no console errors, no CSP violations. Log: `analysis/p6-prototype/evidence/host-navigation-browser-run.txt`.
Not verified: Wilson's own Mac browser. The Mac server must be restarted (`cd analysis/p6-prototype && node server.mjs --port 4816`) after the sync for the fix to take effect.
