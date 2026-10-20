import { Worker } from 'node:worker_threads';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { renderUiIcons } from './render-ui-icons.mjs';

/** renderUiIcons plus whether the page took the parse5 fallback. */
export function renderInline(html) {
  let fallback = false;
  const out = renderUiIcons(html, {
    onFallback: () => {
      fallback = true;
    },
  });
  return { html: out, fallback };
}

/** Worker threads for the icon pass during `astro build`.
 *
 * Astro renders pages on one thread; on the 4-vCPU CI runner the other cores sit
 * idle while the icon scan took ~15% of that thread (2026-10-20 profile). Same
 * function, same input and output, run elsewhere. The worker is loaded from the
 * source tree (the middleware itself is bundled), so no worker file → null and
 * the caller stays inline. Workers are ref'd only while a page is in flight, so
 * an idle pool never holds the build process open; a worker that dies hands its
 * pages, and every later page, back to the inline path. */
export function createUiIconPool({ root = process.cwd(), size } = {}) {
  const file = path.join(root, 'src/icons/ui-icons-worker.mjs');
  if (!existsSync(file)) return null;
  const cores = os.availableParallelism?.() ?? os.cpus().length;
  const count = size ?? Math.max(1, Math.min(4, cores - 1));
  const pending = new Map();
  let nextId = 0;
  let broken = false;
  const fail = (slot, error) => {
    broken = true;
    for (const [id, job] of pending)
      if (job.slot === slot) {
        pending.delete(id);
        job.reject(error);
      }
  };
  const slots = Array.from({ length: count }, () => {
    const slot = { worker: new Worker(file), busy: 0 };
    slot.worker.unref();
    slot.worker.on('message', (msg) => {
      const job = pending.get(msg.id);
      if (!job) return;
      pending.delete(msg.id);
      if (--slot.busy === 0) slot.worker.unref();
      if (msg.error) job.reject(new Error(msg.error));
      else job.resolve({ html: msg.html ?? job.html, fallback: msg.fallback });
    });
    slot.worker.on('error', (error) => fail(slot, error));
    slot.worker.on('exit', (code) =>
      fail(slot, new Error(`ui-icons worker exited (${code})`)),
    );
    return slot;
  });
  return {
    size: count,
    render(html) {
      if (broken) return Promise.resolve(renderInline(html));
      const slot = slots.reduce((a, b) => (b.busy < a.busy ? b : a));
      const id = nextId++;
      if (slot.busy++ === 0) slot.worker.ref();
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject, html, slot });
        slot.worker.postMessage({ id, html });
      }).catch(() => renderInline(html));
    },
  };
}
