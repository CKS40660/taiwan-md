// Worker side of ui-icons-pool.mjs: runs renderUiIcons off the render thread.
import { parentPort } from 'node:worker_threads';
import { renderUiIcons } from './render-ui-icons.mjs';

parentPort.on('message', ({ id, html }) => {
  try {
    let fallback = false;
    const out = renderUiIcons(html, {
      onFallback: () => {
        fallback = true;
      },
    });
    // null = unchanged, so an untouched page is not copied back.
    parentPort.postMessage({ id, html: out === html ? null : out, fallback });
  } catch (error) {
    parentPort.postMessage({ id, error: String(error?.stack ?? error) });
  }
});
