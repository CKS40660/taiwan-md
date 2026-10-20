import { defineMiddleware } from 'astro:middleware';
import { renderUiIcons } from './icons/render-ui-icons.mjs';

// A large page on the parse5 fallback costs seconds per language (the 11.7 MB
// changelog took ~20s each before the fast scan modelled it). Say so in the build log.
const FALLBACK_WARN_CHARS = 1_000_000;

// Runs during static generation and development; readers receive static SVG.
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html'))
    return response;
  const html = renderUiIcons(await response.text(), {
    onFallback: (source: string) => {
      if (source.length > FALLBACK_WARN_CHARS)
        console.warn(
          `[ui-icons] parse5 fallback on ${context.url.pathname} (${(source.length / 1e6).toFixed(1)} MB) — markup the fast scan does not model; see src/icons/render-ui-icons.mjs`,
        );
    },
  });
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
