/**
 * Regression tests for issue #1863 — `taiwanmd read <file> --web` 把文章
 * frontmatter 插進 shell 字串（命令注入）。
 *
 * 邊界：被讀取那篇 Markdown 的 `category`／`slug` 是文章作者可控的欄位
 * （實務上來自外部 PR），原本被插進交給 `exec` 的字串，而 `exec` 走
 * `/bin/sh -c`。修法是改用 `execFile`（參數陣列，不經 shell）。
 *
 * 這組測試守兩件事：
 *   1. read.js 不再 import shell 版的 `exec`（這是真正關掉邊界的那一行）
 *   2. buildArticleUrl 對惡意 frontmatter 不產出 taiwan.md 以外的網址，
 *      同時**不誤殺**含空白／全形冒號／CJK 的合法 slug
 *
 * Run with: cd cli && npx vitest run
 */

import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildArticleUrl } from '../src/commands/read.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const READ_JS = path.join(__dirname, '..', 'src', 'commands', 'read.js');

describe('issue #1863 — --web 不得經過 shell', () => {
  const src = fs.readFileSync(READ_JS, 'utf8');

  it('不 import shell 版的 exec', () => {
    // `import { exec }` / `import { exec, ... }` 一律不准回來。
    expect(src).not.toMatch(
      /import\s*\{[^}]*\bexec\b[^}]*\}\s*from\s*'child_process'/,
    );
  });

  it('使用 execFile', () => {
    expect(src).toMatch(
      /import\s*\{[^}]*\bexecFile\b[^}]*\}\s*from\s*'child_process'/,
    );
  });

  it('沒有把網址插進 shell 字串', () => {
    // 原始漏洞長這樣：exec(`open "${url}"`)
    expect(src).not.toMatch(/\bexec\(\s*`/);
    expect(src).not.toMatch(/open\s+"\$\{/);
  });

  it('open 收到的是參數陣列，不是一整串命令', () => {
    expect(src).toMatch(/execFile\(\s*'open'\s*,\s*\[\s*url\s*\]\s*\)/);
  });
});

describe('buildArticleUrl — 擋惡意 frontmatter', () => {
  it('正常條目組出 taiwan.md 網址', () => {
    const u = buildArticleUrl({
      category: 'Politics',
      slug: 'taiwan-referendum',
    });
    expect(u).toBe('https://taiwan.md/Politics/taiwan-referendum');
  });

  it('command-substitution 字元不會變成命令（只是網址的一部分）', () => {
    const u = buildArticleUrl({
      category: 'x',
      slug: '$(touch /tmp/pwned)',
    });
    // 不是 null —— 它是合法網址的一部分；關鍵是它永遠在 taiwan.md 底下，
    // 而且 execFile 不會把它交給 shell 解讀。
    expect(u).not.toBeNull();
    expect(new URL(u).host).toBe('taiwan.md');
    expect(new URL(u).protocol).toBe('https:');
  });

  it('引號跳脫不會逃出 host', () => {
    const u = buildArticleUrl({ category: 'x"; open /evil; #', slug: 'y' });
    expect(new URL(u).host).toBe('taiwan.md');
  });

  it('協定置換被擋下', () => {
    expect(
      buildArticleUrl({ category: 'https://evil.com', slug: 'y' }),
    ).toBeNull();
    expect(
      buildArticleUrl({ category: 'file:///etc', slug: 'passwd' }),
    ).toBeNull();
    expect(
      buildArticleUrl({ category: 'javascript:alert(1)', slug: 'y' }),
    ).toBeNull();
  });

  it('protocol-relative 換 host 被擋下', () => {
    expect(buildArticleUrl({ category: '//evil.com', slug: 'y' })).toBeNull();
  });

  it('缺欄位或型別不對回 null', () => {
    expect(buildArticleUrl(null)).toBeNull();
    expect(buildArticleUrl({})).toBeNull();
    expect(buildArticleUrl({ category: 'Politics' })).toBeNull();
    expect(buildArticleUrl({ category: 1, slug: 2 })).toBeNull();
  });

  // 這組是假陽性防線：issue #1863 建議的字元白名單會擋掉這些**真實存在**
  // 的檔名（全庫 123 個含空白、33 個含全形冒號），所以我們刻意不驗字元集。
  it('不誤殺含空白／全形冒號／CJK／間隔號的合法 slug', () => {
    for (const slug of [
      '台灣公投制度',
      '美援時期 1951-1965',
      '台灣美食總覽：從早餐到宵夜',
      '吳哲宇·作品',
      '台灣企業（上市）',
    ]) {
      const u = buildArticleUrl({ category: 'Culture', slug });
      expect(u, `slug 被誤殺：${slug}`).not.toBeNull();
      expect(new URL(u).host).toBe('taiwan.md');
    }
  });
});
