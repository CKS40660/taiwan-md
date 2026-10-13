/**
 * 404-dup-lang-prefix.uxtest.mjs — 404 頁的「語言碼貼兩次」救援（browser 測）。
 *
 * 自帶伺服器：對 dist/ 起一支靜態 server，找不到的路徑回 404 + dist/404.html
 * （GitHub Pages 的行為），再用 Playwright chromium 真的走一遍。跟
 * tests/404-mojibake.uxtest.mjs 同一個自足模式。
 *
 * Run: node tests/404-dup-lang-prefix.uxtest.mjs
 * 前置：dist/ 要是現跑的（npm run sync:build）。沒有 dist 就 skip 不是 fail。
 *
 * 為什麼存在（2026-10-13 twmd-maintainer-daily）：
 * /en/people/x 被某些外部 client 寫成 /enen/people/x——語言碼貼了兩次、中間
 * 沒有斜線。2026-10-11 單日 1,222 筆（前一日 389），其中 1,191 筆 UA 是瀏覽器
 * 不是爬蟲。前一班的修法是逐條 301 名單（當天 120 條），但這個 host 是
 * GitHub Pages，_redirects 不會被讀，meta-refresh stub 必須逐條預先產生，而
 * 這一族約有 1.3 萬個可能網址——逐條等於每個新網址先讓一位讀者吃一次 404。
 * 所以改成在 404 頁認形狀。這支測的就是「它在真的瀏覽器裡真的會導」，
 * 以及更重要的：**不該導的不會被導**。
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const PORT = 4332;

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

// dist 裡實際存在的一篇 en 文章，拿它的真 slug 當素材（不寫死，文章會改名）。
// article-index.json 的 key 是 `category/slug`，值帶 langs 陣列；挑一個 langs
// 含 en 的，再確認 dist 裡真的有那一頁，才算合格素材（#100：驗證對象要等於
// 落地對象——這裡落地的是 dist 裡的頁，不是 index 的宣稱）。
async function pickLiveEnArticle() {
  const idx = await readIfFile(join(DIST, 'api/article-index.json'));
  if (!idx) return null;
  let parsed;
  try {
    parsed = JSON.parse(idx.toString());
  } catch {
    return null;
  }
  for (const [key, meta] of Object.entries(parsed)) {
    if (!meta || !Array.isArray(meta.langs) || !meta.langs.includes('en'))
      continue;
    if (!/^[a-z0-9-]+\/[^/]+$/.test(key)) continue;
    if (await readIfFile(join(DIST, 'en', key, 'index.html')))
      return `/en/${key}`;
  }
  return null;
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
    // 1. 正控制：真實存在的 en 文章，網址把語言碼貼兩次 → 導回真頁面
    const live = await pickLiveEnArticle();
    if (live) {
      const doubled = live.replace(/^\/en\//, '/enen/');
      const got = await finalUrl(page, doubled);
      check(
        `貼兩次的 en 文章網址導回真頁面（${doubled} → ${live}）`,
        got === live || got === `${live}/`,
        got,
      );
    } else {
      check('找得到一篇 live en 文章當素材', false, 'article-index 解析不到');
    }

    // 2. 另一個語言的同形狀（清單是 registry derive，不是只修 en）
    const gotJa = await finalUrl(page, '/jaja/food/bubble-tea');
    check(
      'ja 同形狀也導（/jaja/... → /ja/...）',
      gotJa.startsWith('/ja/') && !gotJa.startsWith('/jaja/'),
      gotJa,
    );

    // 3. 負控制：單一語言碼的死路不准被動到
    const single = '/en/food/this-article-does-not-exist-xyz';
    const got3 = await finalUrl(page, single);
    check('單一語言碼的死路留在原地', got3 === single, got3);

    // 4. 負控制：第一段只是「開頭長得像」貼兩次，不是正好貼兩次
    //    /enenglish/... 開頭有 enen，但不是 /enen 也不是 /enen/
    const lookalike = '/enenglish/food/bubble-tea';
    const got4 = await finalUrl(page, lookalike);
    check('開頭長得像但不是貼兩次的路徑不導', got4 === lookalike, got4);

    // 5. 負控制：普通死路（沒有語言碼）不准被動到
    const plain = '/nature/this-article-does-not-exist-xyz';
    const got5 = await finalUrl(page, plain);
    check('普通死路留在原地', got5 === plain, got5);

    // 6. 負控制：zh-TW 是預設語言、沒有前綴，不該有貼兩次的規則命中
    const zh = '/zh-TWzh-TW/nature/台灣黑熊';
    const got6 = await finalUrl(page, zh);
    check('zh-TW 貼兩次不在規則內（留在原地）', got6 === zh, got6);
  } finally {
    await browser.close();
    server.close();
  }

  console.log(
    failures === 0
      ? '\n✅ 404 語言碼貼兩次救援全過'
      : `\n❌ ${failures} 條沒過`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
