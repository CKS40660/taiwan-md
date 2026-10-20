import { defineMiddleware } from 'astro:middleware';
import { createUiIconPool, renderInline } from './icons/ui-icons-pool.mjs';

// A large page on the parse5 fallback costs seconds per language (the 11.7 MB
// changelog took ~20s each before the fast scan modelled it). Say so in the build log.
const FALLBACK_WARN_CHARS = 1_000_000;

// `astro build` runs the icon pass on worker threads; dev stays inline.
const pool = import.meta.env.PROD ? createUiIconPool() : null;

// Runs during static generation and development; readers receive static SVG.
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html'))
    return response;
  const source = await response.text();
  const { html, fallback } = pool
    ? await pool.render(source)
    : renderInline(source);
  if (fallback && source.length > FALLBACK_WARN_CHARS)
    console.warn(
      `[ui-icons] parse5 fallback on ${context.url.pathname} (${(source.length / 1e6).toFixed(1)} MB) — markup the fast scan does not model; see src/icons/render-ui-icons.mjs`,
    );
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
