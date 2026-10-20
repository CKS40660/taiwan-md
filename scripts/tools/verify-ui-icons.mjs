#!/usr/bin/env node
/**
 * verify-ui-icons.mjs — prove the fast icon pass matches the parse5 reference.
 *
 * src/icons/render-ui-icons.mjs has two paths: a forward scan used for every
 * page, and the original parse5 walk it falls back to. This tool runs both over
 * every page of a build and reports any byte difference.
 *
 *   # 1. a build whose HTML has NOT been through the icon middleware
 *   TWMD_SKIP_UI_ICONS=1 npx astro build && cp -R dist /tmp/raw-dist
 *   # 2. compare the two paths page by page
 *   node scripts/tools/verify-ui-icons.mjs /tmp/raw-dist
 *   # 3. optionally, check a normal build's output against the reference too
 *   npx astro build && node scripts/tools/verify-ui-icons.mjs /tmp/raw-dist --built dist
 *
 * Exit 1 on any mismatch. Fallback pages are listed so new markup patterns that
 * push pages onto the slow path are visible.
 */
import {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} from 'node:worker_threads';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const moduleUrl = new URL(
  '../../src/icons/render-ui-icons.mjs',
  import.meta.url,
);

function listHtml(dir) {
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.html')) out.push(p);
    }
  };
  walk(dir);
  return out.sort();
}

if (isMainThread) {
  const args = process.argv.slice(2);
  const raw = args[0];
  const builtIdx = args.indexOf('--built');
  const built = builtIdx === -1 ? null : args[builtIdx + 1];
  if (!raw || !fs.existsSync(raw)) {
    console.error('usage: verify-ui-icons.mjs <raw-dist> [--built <dist>]');
    process.exit(2);
  }
  const files = listHtml(raw).map((p) => path.relative(raw, p));
  const workers = Math.max(1, Math.min(os.cpus().length - 1, 12));
  const chunks = Array.from({ length: workers }, (_, w) =>
    files.filter((_, i) => i % workers === w),
  );
  const t0 = Date.now();
  const results = await Promise.all(
    chunks.map(
      (chunk) =>
        new Promise((resolve, reject) => {
          const w = new Worker(fileURLToPath(import.meta.url), {
            workerData: { raw, built, chunk, moduleUrl: moduleUrl.href },
          });
          w.once('message', resolve);
          w.once('error', reject);
        }),
    ),
  );
  const sum = (k) => results.reduce((a, r) => a + r[k], 0);
  const mismatches = results.flatMap((r) => r.mismatches);
  const fallbacks = results.flatMap((r) => r.fallbacks);
  const builtMismatches = results.flatMap((r) => r.builtMismatches);
  console.log(`pages            ${files.length}`);
  console.log(`changed by icons ${sum('changed')}`);
  console.log(`fast path        ${files.length - fallbacks.length}`);
  console.log(`parse5 fallback  ${fallbacks.length}`);
  console.log(`fast  CPU        ${(sum('fastMs') / 1000).toFixed(1)}s`);
  console.log(`parse5 CPU       ${(sum('refMs') / 1000).toFixed(1)}s`);
  console.log(`wall             ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  for (const f of fallbacks.slice(0, 20)) console.log(`  fallback  ${f}`);
  for (const f of mismatches.slice(0, 20)) console.log(`  MISMATCH  ${f}`);
  if (built) {
    console.log(`built ≠ reference ${builtMismatches.length}`);
    for (const f of builtMismatches.slice(0, 20))
      console.log(`  BUILT ≠   ${f}`);
  }
  const bad = mismatches.length + builtMismatches.length;
  console.log(bad ? `❌ ${bad} page(s) differ` : '✅ identical on every page');
  process.exit(bad ? 1 : 0);
} else {
  const { raw, built, chunk } = workerData;
  const { renderUiIcons, renderUiIconsReference, scanUiIcons } = await import(
    workerData.moduleUrl
  );
  const r = {
    changed: 0,
    fastMs: 0,
    refMs: 0,
    mismatches: [],
    fallbacks: [],
    builtMismatches: [],
  };
  for (const rel of chunk) {
    const html = fs.readFileSync(path.join(raw, rel), 'utf8');
    let t = performance.now();
    const fast = renderUiIcons(html);
    r.fastMs += performance.now() - t;
    t = performance.now();
    const ref = renderUiIconsReference(html);
    r.refMs += performance.now() - t;
    if (ref !== html) r.changed++;
    if (fast !== ref) r.mismatches.push(rel);
    if (scanUiIcons(html) === null) r.fallbacks.push(rel);
    if (built) {
      const p = path.join(built, rel);
      if (!fs.existsSync(p) || fs.readFileSync(p, 'utf8') !== ref)
        r.builtMismatches.push(rel);
    }
  }
  parentPort.postMessage(r);
}
