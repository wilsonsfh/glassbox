import { build } from 'esbuild';
import { readFile, writeFile, mkdir, copyFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
process.chdir(fileURLToPath(root));
await mkdir('dist/vendor/licenses', { recursive: true });
const browser = { bundle: true, platform: 'browser', target: 'es2022', minify: false, legalComments: 'eof', logLevel: 'info', define: { 'process.env.NODE_ENV': '"production"' }, alias: { 'sodium-universal': 'sodium-javascript' } };
await build({ ...browser, entryPoints: ['src/worker.mjs'], outfile: 'dist/vendor/session-worker.js', format: 'iife' });
await build({ ...browser, entryPoints: ['tests/crypto-entry.mjs'], outfile: 'dist/vendor/core-test.mjs', format: 'esm' });
await build({ entryPoints: ['node_modules/ws/index.js'], outfile: 'dist/vendor/ws.cjs', bundle: true, platform: 'node', target: 'node22', format: 'cjs', external: ['bufferutil', 'utf-8-validate'], legalComments: 'eof' });
await build({ ...browser, entryPoints: ['src/app.mjs'], outfile: 'dist/app.js', format: 'iife' });
await copyFile('src/style.css', 'dist/style.css');
await copyFile('src/favicon.svg', 'dist/favicon.svg');
const sha = data => createHash('sha256').update(data).digest('base64');
const html = (await readFile('src/index.html', 'utf8'))
  .replace('APP_INTEGRITY', `sha256-${sha(await readFile('dist/app.js'))}`)
  .replace('CSS_INTEGRITY', `sha256-${sha(await readFile('dist/style.css'))}`);
await writeFile('dist/index.html', html);
const lock = JSON.parse(await readFile('package-lock.json', 'utf8'));
const dependencies = [];
for (const [dir, info] of Object.entries(lock.packages)) {
  if (!dir || dir.includes('@esbuild/')) continue;
  const name = dir.replace(/^node_modules\//, '').replaceAll('/node_modules/', '--');
  let licenses = [];
  try { licenses = (await readdir(dir)).filter(n => /^licen[cs]e(?:\.|$)/i.test(n)); } catch {}
  for (const file of licenses) await copyFile(path.join(dir, file), path.join('dist/vendor/licenses', `${name.replaceAll('/', '--')}-${file}`));
  dependencies.push({ name, version: info.version, integrity: info.integrity, license: info.license });
}
await writeFile('dist/vendor/DEPENDENCIES.json', JSON.stringify({ note: 'Lockfile inventory; native sodium modules and esbuild are build-time only, not runtime requirements. Browser uses sodium-javascript via explicit alias. ws optional native accelerators are not bundled.', dependencies }, null, 2) + '\n');
const files = ['dist/app.js', 'dist/index.html', 'dist/style.css', 'dist/favicon.svg', 'dist/vendor/session-worker.js', 'dist/vendor/core-test.mjs', 'dist/vendor/ws.cjs'];
const hashes = {};
for (const file of files) hashes[file] = createHash('sha256').update(await readFile(file)).digest('hex');
await writeFile('dist/INTEGRITY.json', JSON.stringify({ algorithm: 'sha256', files: hashes }, null, 2) + '\n');
console.log('Built portable runtime: node server.mjs --port 4816');
