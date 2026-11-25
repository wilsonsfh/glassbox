"""Read-only adaptation of tests/browser.py; all output stays in owned shots/.
Run under flock /tmp/chrome.lock. Does not edit security/relay tests.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
original = ROOT / 'tests' / 'browser.py'
source = original.read_text()
source = source.replace("BASE = 'http://127.0.0.1:5816'", "BASE = 'http://127.0.0.1:5821'")
source = source.replace("'server.mjs','--port','5816'", "'server.mjs','--port','5821'")
source = source.replace("ROOT/'evidence'/'browser-results.json'", "ROOT/'shots'/'graphics-browser-results.json'")
source = source.replace("    return ctx_a, ctx_b, a, b, invite, fa, fb", "    check('uncompared glass box is never lit', a.locator('.session-mark').first.get_attribute('data-glass-state') != 'live')\n    return ctx_a, ctx_b, a, b, invite, fa, fb")
source = source.replace("    wait_stage(a,'chat'); wait_stage(b,'chat')", "    wait_stage(a,'chat'); wait_stage(b,'chat')\n    check('glass box is steady live only after both comparisons', a.locator('#chat .session-mark').get_attribute('data-glass-state') == 'live' and b.locator('#chat .session-mark').get_attribute('data-glass-state') == 'live')")
source = source.replace("                check('clear closes both sessions and removes local transcript'", "                check('closed session shows a cracked unlit box', a.locator('#ended .session-mark').get_attribute('data-glass-state') == 'broken')\n                check('clear closes both sessions and removes local transcript'")
source = source.replace("                    shot(b,f'{attack}-rejected-light-1440.png')", "                    check(f'{attack}: box is cracked rather than live', b.locator('#ended .session-mark').get_attribute('data-glass-state') == 'broken')\n                    shot(b,f'{attack}-rejected-light-1440.png')\n                    if attack == 'tamper':\n                        for width in [1440,820,390]:\n                            for scheme in ['light','dark']:\n                                b.set_viewport_size({'width':width,'height':1000}); b.emulate_media(color_scheme=scheme)\n                                check(f'rejected state has no clipping at {width} {scheme}', b.evaluate('document.documentElement.scrollWidth<=innerWidth'))\n                                shot(b,f'rejected-{scheme}-{width}.png')")
extra = r'''
                # capture=1 must only hide presentation. Query-shell compatibility belongs to the server owner.
                native_capture = False
                try:
                    with urlopen(BASE+'/?capture=1', timeout=2) as response:
                        native_capture = response.status == 200
                except Exception:
                    pass
                REPORT['capture_shell_native'] = native_capture
                if not native_capture:
                    REPORT['capture_shell_adapter'] = 'The real / response loads first; init-script history.replaceState supplies capture=1 before app boot. Server exact-path query routing remains an owner dependency. No gate, worker, socket, or security policy is mocked.'
                capture_contexts = []
                def capture_context():
                    context = browser.new_context(viewport={'width':1440,'height':1000})
                    context.add_init_script(HOOK)
                    if not native_capture:
                        context.add_init_script("if(location.pathname==='/' && !location.search) history.replaceState(null,'','/?capture=1'+location.hash)")
                    capture_contexts.append(context)
                    return context
                cc_a, cc_b = capture_context(), capture_context()
                capture_a, capture_b = cc_a.new_page(), cc_b.new_page()
                record(capture_a,'capture creator'); record(capture_b,'capture invitee')
                capture_a.goto(BASE+'/?capture=1' if native_capture else BASE)
                capture_a.wait_for_timeout(3400)
                check('capture hides prototype label but keeps outside-boundary disclosure', not capture_a.locator('.prototype-label').is_visible() and capture_a.locator('#boundaries').is_visible())
                for width in [1440,820,390]:
                    for scheme in ['light','dark']:
                        capture_a.set_viewport_size({'width':width,'height':1000}); capture_a.emulate_media(color_scheme=scheme)
                        check(f'capture home controls meet 44px targets at {width} {scheme}', capture_a.locator('button,a,summary').evaluate_all('(els)=>els.filter(el=>el.getClientRects().length).every(el=>{const r=el.getBoundingClientRect();return r.height>=44 && r.width>=44})'))
                        shot(capture_a,f'capture-home-{scheme}-{width}.png')
                capture_a.set_viewport_size({'width':1440,'height':1000}); capture_a.emulate_media(color_scheme='light')
                check('geometry reveal uses ink draw and sliding wall while views hard-cut', capture_a.locator('.wall-pane').evaluate('(el)=>getComputedStyle(el).animationName==="glass-pane"') and capture_a.locator('#home').evaluate('(el)=>getComputedStyle(el).animationName==="none"'))
                capture_a.locator('#create').click()
                expect(capture_a.locator('#invite')).to_have_value(re.compile(r'.*#s=.+'), timeout=15000)
                capture_invite = capture_a.locator('#invite').input_value()
                capture_b.goto((BASE+'/?capture=1' if native_capture else BASE+'/')+capture_invite[capture_invite.index('#'):])
                wait_stage(capture_a,'verification'); wait_stage(capture_b,'verification')
                capture_fa, capture_fb = capture_a.locator('#fingerprint').inner_text(), capture_b.locator('#fingerprint').inner_text()
                check('capture keeps every fingerprint character and both-device gate', len(re.sub(r'\s','',capture_fa)) == 64 and capture_a.locator('#message').is_disabled() and capture_b.locator('#message').is_disabled())
                unlock(capture_a,capture_b,capture_fa,capture_fb)
                capture_a.locator('#message').fill('Can you see the whole line?'); capture_a.locator('#send').click()
                capture_b.locator('#messages p').filter(has_text='Can you see').wait_for()
                capture_b.locator('#message').fill('Yes. We compared every group.'); capture_b.locator('#send').click()
                capture_a.locator('#messages p').filter(has_text='We compared').wait_for()
                capture_a.wait_for_timeout(1200)
                check('seal motion begins only after authenticated send and artwork contains no chat plaintext', capture_a.locator('#message-seal').evaluate('(el)=>el.classList.contains("sealed")') and 'Can you see' not in capture_a.locator('#message-seal').inner_text())
                check('capture hides only wire inspector, not send gates or honesty copy', not capture_a.locator('#wire-details').is_visible() and capture_a.locator('#boundaries').is_visible() and capture_a.locator('#send').is_disabled())
                for width in [1440,820,390]:
                    for scheme in ['light','dark']:
                        capture_a.set_viewport_size({'width':width,'height':1000}); capture_a.emulate_media(color_scheme=scheme)
                        check(f'capture chat controls meet 44px targets at {width} {scheme}', capture_a.locator('button,a,summary').evaluate_all('(els)=>els.filter(el=>el.getClientRects().length).every(el=>{const r=el.getBoundingClientRect();return r.height>=44 && r.width>=44})'))
                        shot(capture_a,f'capture-conversation-{scheme}-{width}.png')
                capture_a.evaluate('window.__attack="tamper"')
                capture_a.locator('#message').fill('Rejected capture probe'); capture_a.locator('#send').click()
                wait_stage(capture_b,'ended')
                check('capture mode rejects tamper and dims/cracks the session mark', capture_b.locator('#message').is_disabled() and capture_b.locator('#messages li').count()==0 and capture_b.locator('#ended .session-mark').get_attribute('data-glass-state')=='broken')
                for width in [1440,820,390]:
                    for scheme in ['light','dark']:
                        capture_b.set_viewport_size({'width':width,'height':1000}); capture_b.emulate_media(color_scheme=scheme)
                        shot(capture_b,f'capture-rejected-{scheme}-{width}.png')
                csp(capture_a); csp(capture_b)
                for capture_ctx in capture_contexts: capture_ctx.close()
                page.emulate_media(reduced_motion='reduce')
                page.goto(BASE)
                check('reduced-motion hero is a static ciphertext endpoint', page.locator('.hero-packet').evaluate('(el)=>getComputedStyle(el).animationName==="none"') and page.locator('.packet-plain').evaluate('(el)=>getComputedStyle(el).opacity==="0"'))
                page.emulate_media(reduced_motion='no-preference')
'''
source = source.replace("                page.goto(BASE+'/#s=malformed')", extra + "\n                page.goto(BASE+'/#s=malformed')")
namespace = {'__file__': str(original), '__name__': 'graphics_browser_check'}
exec(compile(source, str(original), 'exec'), namespace)
namespace['main']()
