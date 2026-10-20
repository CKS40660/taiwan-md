import { describe, expect, test } from 'bun:test';
import { Hono } from 'hono';
import { originGuard } from './origin-guard.ts';

// Mount the real middleware on a throwaway app: a state-changing route that
// records whether it ran, plus a read-only route.
function makeApp() {
  const hits: string[] = [];
  const app = new Hono();
  app.use('*', originGuard);
  app.post('/api/control/resume', (c) => {
    hits.push('resume');
    return c.json({ paused: false });
  });
  app.get('/api/health', (c) => c.json({ ok: true }));
  return { app, hits };
}

describe('originGuard', () => {
  test('foreign page no-cors POST is refused and the handler never runs', async () => {
    const { app, hits } = makeApp();
    const res = await app.request('/api/control/resume', {
      method: 'POST',
      headers: { Origin: 'https://evil.example' },
    });
    expect(res.status).toBe(403);
    expect(hits).toEqual([]);
    expect(res.headers.get('access-control-allow-origin')).toBeNull();
  });

  test('sandboxed / file:// pages send Origin: null — refused too', async () => {
    const { app, hits } = makeApp();
    const res = await app.request('/api/control/resume', {
      method: 'POST',
      headers: { Origin: 'null' },
    });
    expect(res.status).toBe(403);
    expect(hits).toEqual([]);
  });

  test('look-alike hosts are not local', async () => {
    const { app, hits } = makeApp();
    const res = await app.request('/api/control/resume', {
      method: 'POST',
      headers: { Origin: 'http://localhost.evil.example' },
    });
    expect(res.status).toBe(403);
    expect(hits).toEqual([]);
  });

  test('local UI on localhost and 127.0.0.1 still works, with CORS headers', async () => {
    for (const origin of ['http://localhost:4321', 'http://127.0.0.1:4321']) {
      const { app, hits } = makeApp();
      const res = await app.request('/api/control/resume', {
        method: 'POST',
        headers: { Origin: origin },
      });
      expect(res.status).toBe(200);
      expect(hits).toEqual(['resume']);
      expect(res.headers.get('access-control-allow-origin')).toBe(origin);
    }
  });

  test('no Origin (curl, scripts, scheduler) is unaffected', async () => {
    const { app, hits } = makeApp();
    const res = await app.request('/api/control/resume', { method: 'POST' });
    expect(res.status).toBe(200);
    expect(hits).toEqual(['resume']);
  });

  test('read-only GET from a foreign origin is served without CORS headers', async () => {
    const { app } = makeApp();
    const res = await app.request('/api/health', {
      headers: { Origin: 'https://evil.example' },
    });
    expect(res.status).toBe(200);
    expect(res.headers.get('access-control-allow-origin')).toBeNull();
  });

  test('preflight answers 204 before any route', async () => {
    const { app, hits } = makeApp();
    const res = await app.request('/api/control/resume', {
      method: 'OPTIONS',
      headers: { Origin: 'http://127.0.0.1:4321' },
    });
    expect(res.status).toBe(204);
    expect(hits).toEqual([]);
  });
});
