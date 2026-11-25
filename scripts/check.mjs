import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
process.chdir(fileURLToPath(new URL('../', import.meta.url)));
const files = ['server.mjs', ...['src', 'scripts', 'tests'].flatMap(dir => readdirSync(dir).filter(n => n.endsWith('.mjs')).map(n => `${dir}/${n}`))];
for (const file of files) execFileSync(process.execPath, ['--check', file]);
for (const file of files.filter(f => f.startsWith('src/'))) {
  const source = readFileSync(file, 'utf8');
  for (const [pattern, message] of [
    [/\b(?:localStorage|sessionStorage|indexedDB)\b/, 'No transcript/key persistence in app modules'],
    [/\bconsole\.(?:log|debug|info|warn|error)\s*\(/, 'No payload-bearing app logging'],
    [/\b(?:eval\s*\(|new\s+Function\s*\()/, 'No dynamic JavaScript evaluation'],
    [/\.innerHTML\s*=|insertAdjacentHTML|document\.write\s*\(/, 'Text-only DOM rendering'],
    [/noise-handshake\/cipher|TestOnlyNoiseCipher|\.setNonce\s*\(/, 'Noise transport is forbidden; use secretstream']
  ]) assert.ok(!pattern.test(source), `${file}: ${message}`);
}
const html = readFileSync('dist/index.html', 'utf8');
assert.ok(!/<script(?![^>]*\bsrc=)[^>]*>/i.test(html), 'No inline scripts');
assert.ok(!/\s(?:onclick|onload|onerror|style)=/i.test(html), 'No inline handlers/styles');
console.log(`PASS: ${files.length} JavaScript syntax checks; source persistence/logging/eval/DOM/Noise-transport bans; HTML inline-script/handler/style bans`);
