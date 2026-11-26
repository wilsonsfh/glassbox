import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const output = root + '.cloudflare/site';
await rm(output, { recursive: true, force: true });
await mkdir(output + '/vendor', { recursive: true });
for (const file of ['index.html', 'app.js', 'style.css', 'favicon.svg', 'vendor/session-worker.js']) await cp(root + 'dist/' + file, output + '/' + file);
await writeFile(output + '/_headers', `/*
  X-Content-Type-Options: nosniff
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
  Referrer-Policy: no-referrer
  Cache-Control: no-store
/
  Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self' wss://glassbox.wilsonsoon.workers.dev; worker-src 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'none'; require-trusted-types-for 'script'; trusted-types glassbox-worker
/index.html
  Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self' wss://glassbox.wilsonsoon.workers.dev; worker-src 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'none'; require-trusted-types-for 'script'; trusted-types glassbox-worker
/vendor/session-worker.js
  Content-Security-Policy: default-src 'none'; script-src 'wasm-unsafe-eval'; connect-src 'none'; base-uri 'none'; object-src 'none'
`);
