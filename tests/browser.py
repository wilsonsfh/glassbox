import json
import re
import subprocess
import time
from pathlib import Path
from urllib.request import urlopen
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parent.parent
BASE = 'http://127.0.0.1:5816'
REPORT = {'checks': [], 'screenshots': [], 'page_errors': [], 'console_errors': [], 'csp_violations': [], 'requests': []}
HOOK = r"""
window.__wire = [];
window.__attack = null;
window.__violations = [];
addEventListener('securitypolicyviolation', e => window.__violations.push({directive:e.effectiveDirective,blocked:e.blockedURI}));
const send = WebSocket.prototype.send;
WebSocket.prototype.send = function(raw) {
  let frame;
  try { frame = JSON.parse(raw); } catch {}
  if(frame && frame.t === 'record' && frame.kind === 'chat') {
    if(window.__attack === 'tamper') {
      frame.c = (frame.c[0] === 'A' ? 'B' : 'A') + frame.c.slice(1);
      raw = JSON.stringify(frame); window.__attack = null;
    } else if(window.__attack === 'replay') {
      window.__attack = null; window.__wire.push(raw); send.call(this, raw); return send.call(this, raw);
    }
  }
  window.__wire.push(raw);
  return send.call(this, raw);
};
"""

def check(name, condition=True):
    assert condition, name
    REPORT['checks'].append(name)
    print('PASS:', name, flush=True)

def record(page, label):
    page.on('pageerror', lambda err: REPORT['page_errors'].append({'page':label,'error':str(err)}))
    page.on('console', lambda msg: REPORT['console_errors'].append({'page':label,'text':msg.text}) if msg.type == 'error' else None)
    page.on('request', lambda req: REPORT['requests'].append(req.url.split('#')[0]))

def wait_stage(page, stage):
    page.locator('#'+stage).wait_for(state='visible', timeout=15000)

def pair(browser, width=1440, scheme='light', reduced=False):
    ctx_a = browser.new_context(viewport={'width':width,'height':1000}, color_scheme=scheme, reduced_motion='reduce' if reduced else 'no-preference')
    ctx_b = browser.new_context(viewport={'width':width,'height':1000}, color_scheme=scheme, reduced_motion='reduce' if reduced else 'no-preference')
    ctx_a.add_init_script(HOOK); ctx_b.add_init_script(HOOK)
    a, b = ctx_a.new_page(), ctx_b.new_page()
    record(a, 'creator'); record(b, 'invitee')
    a.goto(BASE); a.locator('#create').click()
    expect(a.locator('#invite')).to_have_value(re.compile(r'.*#s=.+'), timeout=15000)
    invite = a.locator('#invite').input_value()
    b.goto(invite)
    wait_stage(a, 'verification'); wait_stage(b, 'verification')
    check('invite fragment stripped before networking', b.evaluate('location.hash') == '')
    fa, fb = a.locator('#fingerprint').inner_text(), b.locator('#fingerprint').inner_text()
    check('both peers expose identical full 256-bit fingerprints', fa == fb and len(re.sub(r'\s', '', fa)) == 64)
    check('pre-verification composer is disabled', a.locator('#message').is_disabled() and b.locator('#message').is_disabled())
    return ctx_a, ctx_b, a, b, invite, fa, fb

def unlock(a,b,fa,fb):
    a.locator('#peer-fingerprint').fill(fb); a.locator('#verify').click()
    expect(a.locator('#verification-status')).to_contain_text('Waiting')
    check('one comparison is insufficient to enable sending', a.locator('#message').is_disabled())
    b.locator('#peer-fingerprint').fill(fa); b.locator('#verify').click()
    wait_stage(a,'chat'); wait_stage(b,'chat')
    check('both comparisons unlock both composers', not a.locator('#message').is_disabled() and not b.locator('#message').is_disabled())

def shot(page, name):
    file = ROOT/'shots'/name
    page.screenshot(path=str(file), full_page=True, animations='disabled')
    REPORT['screenshots'].append(str(file.relative_to(ROOT)))

def csp(page):
    REPORT['csp_violations'].extend(page.evaluate('window.__violations'))

def main():
    server = subprocess.Popen(['node','server.mjs','--port','5816'], cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    try:
        for _ in range(100):
            try:
                with urlopen(BASE+'/health', timeout=.2) as res:
                    if res.status == 200: break
            except Exception: time.sleep(.05)
        with sync_playwright() as pw:
            browser = pw.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
            try:
                ca,cb,a,b,invite,fa,fb = pair(browser)
                a.locator('.fingerprint-row').first.hover()
                a.wait_for_timeout(220)
                check('Hub-style hover keeps the current fingerprint row strong and greys the others', a.locator('.fingerprint-row').evaluate_all('(rows)=>getComputedStyle(rows[0]).color!==getComputedStyle(rows[1]).color'))
                shot(a,'verification-hover-light-1440.png')
                a.mouse.move(10,10)
                shot(a,'verification-light-1440.png')
                unlock(a,b,fa,fb)
                message = 'Synthetic canary: meet at six. <img src=x onerror=alert(1)>'
                a.locator('#message').fill(message); a.locator('#send').click()
                b.locator('#messages p').filter(has_text=message).wait_for()
                b.locator('#message').fill('Reply received — 你好。'); b.locator('#message').press('Enter')
                a.locator('#messages p').filter(has_text='Reply received').wait_for()
                check('two real browser workers exchange authenticated text bidirectionally')
                check('hostile markup remains text', b.locator('#messages img').count() == 0)
                a.locator('#wire-details').evaluate('(el)=>el.open=true')
                wire = a.locator('#wire-record').inner_text()
                all_wire = '\n'.join(a.evaluate('window.__wire')+b.evaluate('window.__wire'))
                check('actual wire contains neither synthetic plaintext nor invite secret', 'Synthetic canary' not in all_wire and invite.split('#s=')[1] not in all_wire)
                check('wire inspector is actual ciphertext record', '"kind": "chat"' in wire and 'Synthetic canary' not in wire)
                shot(a,'conversation-light-1440.png')
                a.locator('#wire-details').evaluate('(el)=>el.open=false')
                for width in [390,820,1440]:
                    for scheme in ['light','dark']:
                        a.set_viewport_size({'width':width,'height':1000}); a.emulate_media(color_scheme=scheme)
                        check(f'conversation has no horizontal clipping at {width} {scheme}', a.evaluate('document.documentElement.scrollWidth <= innerWidth'))
                        shot(a,f'conversation-{scheme}-{width}.png')
                check('no local/session storage or cookies', a.evaluate('localStorage.length===0 && sessionStorage.length===0 && document.cookie===""'))
                csp(a); csp(b)
                a.locator('#clear').click(); a.locator('#cancel-clear').click()
                check('clear can be cancelled without ending the session', a.locator('#chat').is_visible())
                a.locator('#clear').click(); a.locator('#confirm-clear').click()
                wait_stage(a,'ended'); wait_stage(b,'ended')
                check('clear closes both sessions and removes local transcript', a.locator('#messages li').count()==0 and a.locator('#message').is_disabled())
                shot(a,'closed-dark-1440.png')
                ca.close(); cb.close()

                ca,cb,a,b,invite,fa,fb = pair(browser,390,'dark',True)
                unlock(a,b,fa,fb)
                a.locator('#message').fill('Reduced motion has the same encrypted outcome.'); a.locator('#send').click()
                b.locator('#messages p').filter(has_text='Reduced motion').wait_for()
                check('reduced motion reaches the same verified conversation')
                a.reload(); wait_stage(b,'ended')
                check('reload/disconnect clears verification and blocks peer sends', b.locator('#message').is_disabled())
                a.locator('#create').click(); expect(a.locator('#invite')).to_have_value(re.compile(r'.*#s=.+'), timeout=15000)
                next_invite = a.locator('#invite').input_value(); b.goto(next_invite)
                wait_stage(a,'verification'); wait_stage(b,'verification')
                check('reconnect creates a different fingerprint and does not inherit comparison', a.locator('#fingerprint').inner_text()!=fa and a.locator('#message').is_disabled())
                shot(a,'verification-dark-390.png')
                csp(a); csp(b); ca.close(); cb.close()

                for attack in ['tamper','replay']:
                    ca,cb,a,b,invite,fa,fb = pair(browser)
                    unlock(a,b,fa,fb)
                    a.evaluate('(mode)=>window.__attack=mode',attack)
                    a.locator('#message').fill('Rejected probe '+attack); a.locator('#send').click()
                    wait_stage(b,'ended')
                    check(f'{attack}: actual outgoing encrypted frame mutation closes normal receiver path', b.locator('#message').is_disabled())
                    check(f'{attack}: rejected data is absent after fail-closed clearing', b.locator('#messages li').count()==0)
                    shot(b,f'{attack}-rejected-light-1440.png')
                    csp(a); csp(b); ca.close(); cb.close()

                ca,cb,a,b,invite,fa,fb = pair(browser)
                a.locator('#peer-fingerprint').fill('0'*64); a.locator('#verify').click(); wait_stage(a,'ended'); wait_stage(b,'ended')
                check('fingerprint mismatch closes both sessions without sending chat')
                csp(a); csp(b); ca.close(); cb.close()

                ctx = browser.new_context(viewport={'width':1440,'height':1000})
                ctx.add_init_script(HOOK); page = ctx.new_page(); record(page,'landing')
                for width in [390,820,1440]:
                    for scheme in ['light','dark']:
                        page.set_viewport_size({'width':width,'height':1000}); page.emulate_media(color_scheme=scheme)
                        page.goto(BASE)
                        check(f'landing has no horizontal clipping at {width} {scheme}',page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
                        shot(page,f'home-{scheme}-{width}.png')
                page.goto(BASE+'/#s=malformed')
                check('malformed invite is stripped and never creates a relay',page.evaluate('location.hash')=='' and not page.evaluate('window.__wire.length'))
                csp(page); ctx.close()
                check('no fatal page errors',not REPORT['page_errors'])
                check('no CSP violations in real worker flow',not REPORT['csp_violations'])
                unexpected=[url for url in REPORT['requests'] if not url.startswith(BASE)]
                check('no third-party network requests',not unexpected)
                REPORT['status']='passed'
            finally:
                browser.close()
    finally:
        server.terminate()
        try: stdout,stderr=server.communicate(timeout=5)
        except subprocess.TimeoutExpired: server.kill(); stdout,stderr=server.communicate()
        REPORT['server_log']=stdout.strip()
        REPORT['server_errors']=stderr.strip()
        REPORT['requests']=sorted(set(REPORT['requests']))
        (ROOT/'evidence'/'browser-results.json').write_text(json.dumps(REPORT,indent=2)+'\n')

if __name__=='__main__': main()
