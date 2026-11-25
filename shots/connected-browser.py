import json, re, subprocess, time
from pathlib import Path
from urllib.request import urlopen
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parent.parent
BASE = 'http://127.0.0.1:5826'
REPORT = {'checks': [], 'page_errors': [], 'console_errors': [], 'csp_violations': [], 'moments': [], 'screenshots': []}
HOOK = r"""
window.__violations = []; window.__moments = [];
addEventListener('securitypolicyviolation', e => window.__violations.push({directive:e.effectiveDirective,blocked:e.blockedURI}));
addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('connected-moment');
  new MutationObserver(() => window.__moments.push({visible:!el.hidden,time:performance.now(),local:document.getElementById('local-comparison').textContent,remote:document.getElementById('remote-comparison').textContent,live:document.querySelector('#chat .session-mark').dataset.glassState})).observe(el,{attributes:true,attributeFilter:['hidden']});
});
"""

def check(name, condition=True):
    assert condition, name
    REPORT['checks'].append(name)
    print('PASS:', name, flush=True)

def record(page):
    page.on('pageerror', lambda e: REPORT['page_errors'].append(str(e)))
    page.on('console', lambda m: REPORT['console_errors'].append(m.text) if m.type == 'error' else None)

def collect(*pages):
    for page in pages:
        REPORT['csp_violations'] += page.evaluate('window.__violations')
        REPORT['moments'].append(page.evaluate('window.__moments'))

def pair(browser, reduced=False, capture=False):
    contexts = []
    for width in [1440,390]:
        ctx = browser.new_context(viewport={'width':width,'height':1000 if width==1440 else 844},color_scheme='light',reduced_motion='reduce' if reduced else 'no-preference')
        ctx.add_init_script(HOOK)
        contexts.append(ctx)
    a,b = [ctx.new_page() for ctx in contexts]
    for page in [a,b]: record(page)
    a.goto(BASE + ('/?capture=1' if capture else '/'))
    check('no moment on landing', a.locator('#connected-moment').is_hidden())
    a.locator('#create').click()
    expect(a.locator('#invite')).to_have_value(re.compile(r'.*#s=.+'),timeout=15000)
    invite = a.locator('#invite').input_value()
    b.goto(invite)
    for page in [a,b]: page.locator('#verification').wait_for(state='visible',timeout=15000)
    fa,fb = [page.locator('#fingerprint').inner_text() for page in [a,b]]
    check('two real workers expose identical complete fingerprints', fa==fb and len(re.sub(r'\s','',fa))==64)
    check('no moment before comparisons', all(page.locator('#connected-moment').is_hidden() and page.locator('#message').is_disabled() for page in [a,b]))
    return contexts,a,b,fa,fb

def unlock(a,b,fa,fb):
    a.locator('#peer-fingerprint').fill(fb); a.locator('#verify').click()
    expect(a.locator('#verification-status')).to_contain_text('Waiting')
    a.wait_for_timeout(180)
    check('one matched fingerprint never shows the moment', a.locator('#connected-moment').is_hidden() and b.locator('#connected-moment').is_hidden())
    b.locator('#peer-fingerprint').fill(fa); b.locator('#verify').click()
    for page in [a,b]: page.locator('#connected-moment').wait_for(state='visible',timeout=15000)
    check('moment appears with both fingerprints verified and live marks', all(page.locator('#chat .session-mark').get_attribute('data-glass-state')=='live' and not page.locator('#message').is_disabled() for page in [a,b]))
    check('polite announcement and no pointer capture', a.locator('#connected-announcement').get_attribute('aria-live')=='polite' and a.locator('#connected-moment').evaluate('(el)=>getComputedStyle(el).pointerEvents')=='none')

def finish_contexts(contexts,a,b):
    collect(a,b)
    for ctx in contexts: ctx.close()

def main():
    server = subprocess.Popen(['node','server.mjs','--port','5826'],cwd=ROOT,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
    try:
        for _ in range(100):
            try:
                with urlopen(BASE+'/health',timeout=.2) as res:
                    if res.status==200: break
            except Exception: time.sleep(.05)
        with sync_playwright() as pw:
            browser = pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
            try:
                contexts,a,b,fa,fb = pair(browser,capture=True)
                check('native capture query renders and preserves verification', a.evaluate('document.body.classList.contains("capture-mode")') and a.locator('.prototype-label').is_hidden() and a.locator('#verification').is_visible())
                unlock(a,b,fa,fb)
                a.wait_for_timeout(280)
                for page,width in [(a,1440),(b,390)]:
                    check(f'connected artwork fits {width}',page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
                    filename = f'connected-moment-{width}.png'
                    page.screenshot(path=str(ROOT/'shots'/filename))
                    REPORT['screenshots'].append('shots/'+filename)
                a.locator('#message').fill('Sending stays available during the connected moment.')
                a.locator('#message').press('Enter')
                b.locator('#messages p').filter(has_text='Sending stays available').wait_for()
                check('real authenticated send works while moment is visible', a.evaluate('window.__moments.length===1 && window.__moments[0].visible'))
                for page in [a,b]:
                    page.locator('#connected-moment').wait_for(state='hidden',timeout=2200)
                    events = page.evaluate('window.__moments')
                    check('moment auto-dismisses at about 1.5 seconds',len(events)==2 and 1350<=events[1]['time']-events[0]['time']<=2000)
                    check('moment never appears before verified live state',all(not e['visible'] or (e['local']=='Compared here' and e['remote']=='Comparison received' and e['live']=='live') for e in events))
                    check('focus returns to chat input and dismissed artwork cannot intercept sending',page.evaluate('document.activeElement.id==="message" && getComputedStyle(document.getElementById("connected-moment")).pointerEvents==="none"'))
                b.locator('#message').fill('Reply after the moment.'); b.locator('#message').press('Enter')
                a.locator('#messages p').filter(has_text='Reply after').wait_for()
                check('ordinary updates do not replay the once-per-session moment',a.evaluate('window.__moments.length===2'))
                finish_contexts(contexts,a,b)

                contexts,a,b,fa,fb = pair(browser,reduced=True)
                unlock(a,b,fa,fb)
                check('reduced motion is a static card without any animation or transform',a.locator('#connected-moment').evaluate('(el)=>el.getAnimations({subtree:true}).length===0 && getComputedStyle(el.querySelector(".connected-cube")).transform==="none" && getComputedStyle(el).opacity==="1"'))
                a.locator('#message').press('Escape')
                check('Escape dismisses and restores input focus',a.locator('#connected-moment').is_hidden() and a.evaluate('document.activeElement.id==="message"'))
                b.locator('#connected-moment').wait_for(state='hidden',timeout=2200)
                events = b.evaluate('window.__moments')
                check('reduced-motion card still lasts 1.5 seconds',len(events)==2 and 1350<=events[1]['time']-events[0]['time']<=2000)
                finish_contexts(contexts,a,b)

                contexts,a,b,fa,fb = pair(browser)
                unlock(a,b,fa,fb)
                a.mouse.click(20,20); b.mouse.click(20,20)
                check('click dismisses on both widths without a modal or focus trap',a.locator('#connected-moment').is_hidden() and b.locator('#connected-moment').is_hidden() and a.evaluate('document.activeElement.id==="message"'))
                finish_contexts(contexts,a,b)

                contexts,a,b,fa,fb = pair(browser)
                a.locator('#peer-fingerprint').fill('0'*64); a.locator('#verify').click()
                for page in [a,b]: page.locator('#ended').wait_for(state='visible',timeout=15000)
                check('rejected fingerprint never shows connected artwork',all(page.locator('#connected-moment').is_hidden() and page.evaluate('window.__moments.length===0') for page in [a,b]))
                finish_contexts(contexts,a,b)
                check('zero page errors',not REPORT['page_errors'])
                check('zero console errors',not REPORT['console_errors'])
                check('zero CSP violations',not REPORT['csp_violations'])
                REPORT['status']='passed'
            finally: browser.close()
    finally:
        server.terminate()
        try: stdout,stderr = server.communicate(timeout=5)
        except subprocess.TimeoutExpired:
            server.kill(); stdout,stderr=server.communicate()
        REPORT['server_stopped']=server.poll() is not None
        REPORT['server_log']=stdout.strip(); REPORT['server_errors']=stderr.strip()
        (ROOT/'shots'/'connected-browser-results.json').write_text(json.dumps(REPORT,indent=2)+'\n')

if __name__=='__main__': main()
