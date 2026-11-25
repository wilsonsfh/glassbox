"""Run with: flock -x -w 120 /tmp/chrome.lock python3 tests/host-navigation-browser.py"""
import json
import subprocess
import threading
import time
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.request import urlopen

from playwright.sync_api import expect, sync_playwright

ROOT = Path(__file__).resolve().parent.parent
PORT = 5816
EVIDENCE = ROOT / 'evidence'
REPORT = {
    'timestamp': datetime.now(timezone.utc).isoformat(),
    'environment': 'Linux sandbox; Chromium /usr/bin/chromium --no-sandbox; exclusive /tmp/chrome.lock',
    'scope': 'Real cross-site top-level anchor navigation into the app shell; not Mac, Manus production or full chat QA',
    'checks': [], 'navigations': [], 'page_errors': [], 'console_errors': [], 'csp_violations': [],
}


def check(name, condition):
    assert condition, name
    REPORT['checks'].append(name)
    print('PASS:', name, flush=True)


class HubFixture(BaseHTTPRequestHandler):
    def do_GET(self):
        body = b'<!doctype html><title>Q6 navigation fixture</title><h1>Cross-site link fixture</h1><a id="localhost" href="http://localhost:5816/">Glassbox localhost</a><br><a id="ip" href="http://127.0.0.1:5816/">Glassbox loopback IP</a>'
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *_args):
        pass


def main():
    server = subprocess.Popen(
        ['node', 'server.mjs', '--port', str(PORT)], cwd=ROOT,
        stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True,
    )
    hub = ThreadingHTTPServer(('127.0.0.2', 0), HubFixture)
    thread = threading.Thread(target=hub.serve_forever, daemon=True)
    thread.start()
    try:
        for _ in range(100):
            if server.poll() is not None:
                raise RuntimeError('Owned Q6 server failed: ' + ''.join(server.communicate()))
            try:
                with urlopen(f'http://127.0.0.1:{PORT}/health', timeout=.2) as res:
                    if res.status == 200:
                        break
            except Exception:
                time.sleep(.05)
        else:
            raise RuntimeError('Owned Q6 server never became ready')

        with sync_playwright() as pw:
            browser = pw.chromium.launch(
                executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'],
            )
            REPORT['browser_version'] = browser.version
            try:
                for label, host in [('localhost', 'localhost'), ('ip', '127.0.0.1')]:
                    base = f'http://{host}:{PORT}'
                    context = browser.new_context(viewport={'width': 1280, 'height': 900})
                    context.add_init_script("window.__cspViolations=[];addEventListener('securitypolicyviolation',e=>window.__cspViolations.push({directive:e.effectiveDirective,blocked:e.blockedURI}));")
                    page = context.new_page()
                    page.on('pageerror', lambda err: REPORT['page_errors'].append(str(err)))
                    page.on('console', lambda msg: REPORT['console_errors'].append(msg.text) if msg.type == 'error' else None)
                    responses = []
                    page.on('response', lambda res: responses.append({'url': res.url, 'status': res.status}))
                    source = f'http://127.0.0.2:{hub.server_port}/'
                    page.goto(source)
                    with page.expect_navigation(wait_until='networkidle') as navigation:
                        page.locator('#' + label).click()
                    response = navigation.value
                    metadata = response.request.all_headers()
                    REPORT['navigations'].append({
                        'source': source, 'target': base + '/', 'status': response.status,
                        'request_headers': metadata, 'responses': responses,
                    })
                    check(host + ': real cross-site document GET returns 200', response.status == 200)
                    check(host + ': browser emits cross-site/navigate/document',
                          metadata.get('sec-fetch-site') == 'cross-site'
                          and metadata.get('sec-fetch-mode') == 'navigate'
                          and metadata.get('sec-fetch-dest') == 'document'
                          and response.request.method == 'GET')
                    check(host + ': no Origin on ordinary anchor GET', 'origin' not in metadata)
                    expect(page.locator('#create')).to_be_visible()
                    check(host + ': rendered app shell, not Forbidden', page.locator('#create').is_visible())
                    for path in ['/app.js', '/style.css']:
                        check(host + ': same-origin asset ' + path + ' loads',
                              any(r['url'] == base + path and r['status'] == 200 for r in responses))
                    check(host + ': no CORS allow-origin response',
                          'access-control-allow-origin' not in response.all_headers())
                    REPORT['csp_violations'].extend(page.evaluate('window.__cspViolations'))
                    screenshot = EVIDENCE / ('host-navigation-' + label + '.png')
                    page.screenshot(path=str(screenshot), full_page=True, animations='disabled')
                    REPORT['navigations'][-1]['screenshot'] = str(screenshot.relative_to(ROOT))
                    context.close()
                check('no browser page errors', not REPORT['page_errors'])
                check('no browser console errors', not REPORT['console_errors'])
                check('no CSP violations', not REPORT['csp_violations'])
            finally:
                browser.close()
        REPORT['status'] = 'PASS'
    except Exception as error:
        REPORT['status'] = 'FAIL'
        REPORT['failure'] = str(error)
        raise
    finally:
        hub.shutdown()
        hub.server_close()
        server.terminate()
        stdout, stderr = server.communicate(timeout=10)
        REPORT['server_output'] = stdout + stderr
        (EVIDENCE / 'host-navigation-browser.json').write_text(json.dumps(REPORT, indent=2) + '\n')


if __name__ == '__main__':
    main()
