/**
 * 404-mojibake.uxtest.mjs — 404 頁的雙重編碼救援（browser 測）。
 *
 * 自帶伺服器：對 dist/ 起一支靜態 server，找不到的路徑回 404 + dist/404.html
 * （GitHub Pages 的行為），再用 Playwright chromium 真的走一遍。跟
 * tests/feedback/widget.uxtest.mjs 同一個自足模式。
 *
 * Run: node tests/404-mojibake.uxtest.mjs
 * 前置：dist/ 要是現跑的（npm run sync:build）。沒有 dist 就 skip 不是 fail，
 * 因為這支測的是建置產物，而 CI 不一定每次都有 dist。
 *
 * 為什麼存在（2026-10-12 twmd-maintainer-daily）：
 * 外部 client 把我們的中文網址當 Latin-1 讀再編一次 UTF-8，於是
 * /nature/台灣黑熊 變成 /nature/%C3%A5%C2%8F%C2%B0…。2026-10-10 單日 1,409 筆
 * （前一日 180）。站上任何一層都沒吐出這種連結，解碼後的目標又都是活頁面，
 * 所以 404 頁改成認得這個形狀就把讀者送回去。單元層的判準好驗，難驗的是
 * 「它在真的瀏覽器裡真的會導」——這支就是補那一段。
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const PORT = 4331;

let failures = 0;
function check(name, cond, detail) {
  if (cond) {
    console.log(`  ✓ ${name}`);
  } else {
    console.error(`  ✗ ${name}${detail ? ` — ${detail}` : ''}`);
    failures++;
  }
}

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

async function readIfFile(p) {
  try {
    const s = await stat(p);
    if (s.isFile()) return await readFile(p);
  } catch {
    /* miss */
  }
  return null;
}

// 靜態 server：命中就回檔，沒命中回 404 + dist/404.html（GitHub Pages 行為）
function startServer() {
  const notFoundPage = readFile(join(DIST, '404.html'));
  const server = createServer(async (req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    } catch {
      pathname = req.url;
    }
    const rel = pathname.replace(/^\/+/, '');
    const candidates = [join(DIST, rel), join(DIST, rel, 'index.html')];
    for (const c of candidates) {
      // 擋穿目錄：解析後必須還在 dist 底下
      if (!resolve(c).startsWith(DIST)) continue;
      const body = await readIfFile(c);
      if (body) {
        const ext = c.slice(c.lastIndexOf('.'));
        res.writeHead(200, {
          'content-type': TYPES[ext] || 'application/octet-stream',
        });
        return res.end(body);
      }
    }
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    res.end(await notFoundPage);
  });
  return new Promise((ok) => server.listen(PORT, () => ok(server)));
}

// 瀏覽器實際停在哪個網址（等導向走完）
async function finalUrl(page, path) {
  await page.goto(`http://localhost:${PORT}${path}`, {
    waitUntil: 'domcontentloaded',
  });
  // 救援是 setTimeout 150ms 後 location.replace，給它走完的時間
  try {
    await page.waitForURL((u) => u.pathname !== path, { timeout: 4000 });
  } catch {
    /* 沒導向就是沒導向，交給斷言判 */
  }
  return decodeURIComponent(new URL(page.url()).pathname);
}

async function main() {
  if (!(await readIfFile(join(DIST, '404.html')))) {
    console.log('⏭  skip：沒有 dist/404.html（先跑 npm run sync:build）');
    process.exit(0);
  }

  const server = await startServer();
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // 1. 雙重編碼的中文文章網址 → 導回解碼後的真頁面
    const bear =
      '/nature/%C3%A5%C2%8F%C2%B0%C3%A7%C2%81%C2%A3%C3%A9%C2%BB%C2%91%C3%A7%C2%86%C2%8A';
    const got1 = await finalUrl(page, bear);
    check(
      '雙重編碼 /nature/ 導回真頁面',
      got1 === '/nature/台灣黑熊/' || got1 === '/nature/台灣黑熊',
      got1,
    );

    // 2. 帶尾斜線的用語頁同樣救得回來
    const nvidia = '/terminology/%C3%A8%C2%BC%C2%9D%C3%A9%C2%81%C2%94/';
    const got2 = await finalUrl(page, nvidia);
    check(
      '雙重編碼 /terminology/ 導回真頁面',
      got2 === '/terminology/輝達/',
      got2,
    );

    // 3. 普通的死路不准被動到（不是這個病，留在 404 讓既有建議邏輯處理）
    const plain = '/nature/this-article-does-not-exist-xyz';
    const got3 = await finalUrl(page, plain);
    check('普通死路留在原地不導向', got3 === plain, got3);

    // 4. 正確編碼的中文死路也不准被動到（charCode 全 < 256 的誤判防線）
    const okEnc = '/nature/' + encodeURIComponent('不存在的條目');
    const got4 = await finalUrl(page, okEnc);
    check('正確編碼的中文死路不導向', got4 === '/nature/不存在的條目', got4);
  } finally {
    await browser.close();
    server.close();
  }

  console.log(
    failures === 0 ? '\n✅ 404 雙重編碼救援全過' : `\n❌ ${failures} 條沒過`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
