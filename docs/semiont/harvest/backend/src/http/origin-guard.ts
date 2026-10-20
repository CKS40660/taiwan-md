/**
 * Origin guard — CORS headers for the local UI + cross-site write rejection.
 *
 * Why the write rejection exists (2026-10-20, issue #1832 follow-up):
 * CORS only stops a foreign page from *reading* our responses. It does not
 * stop the browser from *sending* a "simple" request: any web page can do
 * `fetch('http://127.0.0.1:4319/api/control/resume', { method: 'POST', mode: 'no-cors' })`
 * with no preflight. `/api/control/resume` and `/api/tasks/:id/spawn` take no
 * body, so that request alone would start auto-spawn of CLI agents under the
 * local user's identity. Binding to loopback (#1836) keeps other machines out;
 * it does not keep a web page in the user's own browser out.
 *
 * Browsers attach `Origin` to every cross-origin non-GET request (including
 * `no-cors`), so a state-changing request whose Origin is present and not a
 * local one is refused. Requests with no Origin (curl, scripts, the scheduler)
 * are unaffected — same trust level as before.
 */
import type { MiddlewareHandler } from 'hono';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/** UI may be opened as localhost OR 127.0.0.1 (astro.config host: 127.0.0.1). */
export function isLocalOrigin(origin: string | undefined | null): boolean {
  if (!origin) return false;
  return (
    origin.startsWith('http://localhost:') ||
    origin.startsWith('http://127.0.0.1:')
  );
}

/** True when a browser on a foreign origin is trying to change state. */
export function isCrossSiteWrite(
  method: string,
  origin: string | undefined | null,
): boolean {
  if (SAFE_METHODS.has(method.toUpperCase())) return false;
  if (origin === undefined || origin === null || origin === '') return false;
  return !isLocalOrigin(origin);
}

export const originGuard: MiddlewareHandler = async (c, next) => {
  const origin = c.req.header('origin');
  if (isLocalOrigin(origin)) {
    // Browsers treat localhost and 127.0.0.1 as different origins — allow both local forms only.
    c.header('Access-Control-Allow-Origin', origin!);
    c.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    );
    c.header('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (c.req.method === 'OPTIONS') return c.body(null, 204);
  if (isCrossSiteWrite(c.req.method, origin)) {
    return c.json({ error: 'cross-site request refused' }, 403);
  }
  await next();
  return;
};
