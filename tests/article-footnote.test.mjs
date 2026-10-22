/**
 * article-footnote.test.mjs — 腳註渲染契約
 *（跑：node --experimental-strip-types --test tests/article-footnote.test.mjs）
 *
 * 守的是 2026-10-21 修掉的那個缺陷：`processFootnotes()` 的引用正則帶著
 * `(?!:)` lookahead，把「行中 `[^13]:`」（中文/翻譯常見句法：「…值得一提[^13]：
 * 2024 年…」）整個排除掉。於是那些標籤從未進入 `order` → 文末不輸出
 * `<li id="fn-13">` → 讀者看到的是一個沒有上標、也沒有文末條目的孤兒字面
 * `[^13]`。
 *
 * 根因在**語言層**：zh-TW 母稿用全形冒號 `：`（不在 lookahead 排除範圍，
 * 所以正常），譯本被 LLM 轉成 ASCII `:` → 撞上 lookahead → 斷腳註。
 * 全庫實測（真實 renderer 跑 15,045 檔）：1,909 個讀者看得到的孤兒字面
 * `[^13]`，涉及 907 個檔案，全部變成有上標、有文末條目的真腳註。
 *
 * ⚠️ 為什麼 import src/utils/article-render.ts 的 `renderArticleHtml` 而不是
 * 自己重寫一份規則來驗：2026-08-28「徹底處理那一輪」用 Python 重寫新舊
 * renderer 規則估算影響範圍，得到「零風險」的錯答案——兩邊 regex 長得
 * 一樣，量出的卻是完全不同的行為（見
 * docs/semiont/memory/2026-08-28-005518-footnote-cards.md）。**測試必須
 * 載入正式站在用的那支函式，否則綠燈只是自我安慰。**
 *
 * Node 的 .ts 動態 import 需要型別剝離旗標（本 repo 未裝 ts-node/tsx）：
 *   node --experimental-strip-types --test tests/article-footnote.test.mjs
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { renderArticleHtml } from '../src/utils/article-render.ts';

/** Render and return the full HTML. */
const render = (md, lang = 'zh-TW') =>
  renderArticleHtml('t', md, lang).fullHtml;

/** Split rendered HTML into { body, footnotes } at the footnotes section. */
function split(html) {
  const i = html.indexOf('<section class="footnotes"');
  if (i === -1) return { body: html, footnotes: '' };
  return { body: html.slice(0, i), footnotes: html.slice(i) };
}

/** The <li id="fn-..."> ids in the footnotes section, in document order. */
function footnoteIds(html) {
  return [...split(html).footnotes.matchAll(/<li id="fn-([^"]*)"/g)].map(
    (m) => m[1],
  );
}

/** The <sup id="fnref-..."> ids in the body, in document order (full id). */
function supIds(html) {
  return [...split(html).body.matchAll(/<sup id="([^"]*)"/g)].map((m) => m[1]);
}

/** Literal `[^label]` text still visible to the reader. */
function leftoverLabels(html) {
  return [...split(html).body.matchAll(/\[\^([^\]]+)\]/g)].map((m) => m[1]);
}

// ════════════════════════════════════════════════════════════════════════
// 核心缺陷：行中 `[^N]:` 必須被渲染成上標（2026-10-21 修掉的那個）
// ════════════════════════════════════════════════════════════════════════

test('行中 [^1]: （ASCII 冒號）必須渲染成上標 + 文末條目', () => {
  // 這就是被 `(?!:)` 排除掉的形狀。譯本裡全是這種。
  const md =
    '台積電的先進製程是產業命脈[^1]：2024 年全球市佔近九成。\n\n' +
    '[^1]: [報導](https://example.com) — 先進製程市佔說明。\n';
  const html = render(md, 'en');

  assert.equal(leftoverLabels(html).length, 0, '不該留下字面殘留');
  assert.deepEqual(supIds(html), ['fnref-1'], '正文應該有 <sup>');
  assert.deepEqual(footnoteIds(html), ['1'], '文末應該有對應的腳註條目');
});

test('全形冒號 [^1]： 一直以來就正常（回歸保護）', () => {
  // zh-TW 母稿用的是全形冒號——這是修好之後不能壞掉的那一邊。
  const md =
    '台積電的先進製程是產業命脈[^1]：2024 年全球市佔近九成。\n\n' +
    '[^1]: [報導](https://example.com) — 先進製程市佔說明。\n';
  const html = render(md);

  assert.equal(leftoverLabels(html).length, 0);
  assert.deepEqual(supIds(html), ['fnref-1']);
  assert.deepEqual(footnoteIds(html), ['1']);
});

test('正常參照 [^1] 不受影響', () => {
  const md = '這是個引用[^1]。\n\n[^1]: [報導](https://example.com) — 說明。\n';
  const html = render(md);

  assert.equal(leftoverLabels(html).length, 0);
  assert.deepEqual(supIds(html), ['fnref-1']);
  assert.deepEqual(footnoteIds(html), ['1']);
});

// ════════════════════════════════════════════════════════════════════════
// 沒有定義的參照：必須保持字面（不能憑空生出一條腳註）
// ════════════════════════════════════════════════════════════════════════

test('沒有定義的參照保持字面，且不產生文末條目', () => {
  const md =
    '段落有一個好引用[^1]、一個壞掉的引用[^2]。\n\n' +
    '[^1]: [報導](https://example.com) — 說明。\n';
  const html = render(md);

  assert.deepEqual(leftoverLabels(html), ['2'], '壞掉的引用應該原樣留著');
  assert.deepEqual(footnoteIds(html), ['1'], '只有有定義的那條進得了文末');
});

test('全文沒有任何定義時，引用原樣保留（renderer 的 early return）', () => {
  const md = '段落[^1][^2]。\n';
  const html = render(md);

  assert.deepEqual(leftoverLabels(html), ['1', '2']);
  assert.deepEqual(footnoteIds(html), []);
});

// ════════════════════════════════════════════════════════════════════════
// 定義行的形狀
// ════════════════════════════════════════════════════════════════════════

test('空內容定義 [^1]: 視為未定義（冒號後沒東西）', () => {
  // renderer 的 def regex 是 `(.+?)`——冒號後必須有東西。
  const md = '段落[^1]。\n\n[^1]:\n';
  const html = render(md);

  assert.deepEqual(leftoverLabels(html), ['1']);
  assert.deepEqual(footnoteIds(html), []);
});

test('非 ASCII label 可以被定義與引用', () => {
  // renderer 的 label 字符集是 `[^\]]+`——任何非 `]` 字元。
  const md =
    '段落[^台灣][^剩食-新聞市場]。\n\n' +
    '[^台灣]: [報導](https://example.com) — 說明。\n' +
    '[^剩食-新聞市場]: [報導](https://example.org) — 另一個說明。\n';
  const html = render(md);

  assert.equal(leftoverLabels(html).length, 0);
  assert.deepEqual(footnoteIds(html), ['台灣', '剩食-新聞市場']);
});

test('定義行必須在行首（縮排的不算定義）', () => {
  const md = '段落[^1]。\n\n    [^1]: [報導](https://example.com) — 說明。\n';
  const html = render(md);

  // 縮排的定義不算定義 → 整段被當成普通文字 → 裡面的 `[^1]` 和 `[^1]:`
  // 兩個都是字面殘留，讀者看到的是孤兒方括號。
  assert.deepEqual(leftoverLabels(html), ['1', '1']);
  assert.deepEqual(footnoteIds(html), []);
});

test('定義可以出現在文末以外的任何位置', () => {
  const md = '[^1]: [報導](https://example.com) — 說明。\n\n段落[^1]。\n';
  const html = render(md);

  assert.equal(leftoverLabels(html).length, 0);
  assert.deepEqual(footnoteIds(html), ['1']);
});

test('多行定義（內容延續到下一段）仍然算有定義', () => {
  const md =
    '段落[^1]。\n\n[^1]: [報導](https://example.com)\n' +
    '    這是定義的第二行，說明文字。\n';
  const html = render(md);

  assert.equal(leftoverLabels(html).length, 0);
  assert.deepEqual(footnoteIds(html), ['1']);
});

// ════════════════════════════════════════════════════════════════════════
// 多次引用同一個 label：backref 序號
// ════════════════════════════════════════════════════════════════════════

test('同一個 label 引用三次 → fnref-1 / fnref-1-2 / fnref-1-3', () => {
  const md =
    '一[^1]二[^1]三[^1]。\n\n[^1]: [報導](https://example.com) — 說明。\n';
  const html = render(md);

  assert.deepEqual(supIds(html), ['fnref-1', 'fnref-1-2', 'fnref-1-3']);
  assert.deepEqual(footnoteIds(html), ['1'], '文末只有一條條目');
  // 文末的 ↩ 群組：一個 ↩ + 第 2、3 次的上標序號
  const { footnotes } = split(html);
  assert.equal((footnotes.match(/class="footnote-backref"/g) || []).length, 3);
});

test('文末條目編號依「第一次被引用」的順序，不是定義行順序', () => {
  const md =
    '先提[^2]，再提[^1]。\n\n' +
    '[^1]: [甲](https://example.com) — 說明。\n' +
    '[^2]: [乙](https://example.org) — 說明。\n';
  const html = render(md);

  assert.deepEqual(footnoteIds(html), ['2', '1']);
  // 上標裡的數字是引用順序（1, 2）
  assert.match(split(html).body, /aria-label="[^"]* 1"/);
  assert.match(split(html).body, /aria-label="[^"]* 2"/);
});

// ════════════════════════════════════════════════════════════════════════
// 跨語言：譯本用 ASCII 冒號 vs 母稿用全形冒號
// ════════════════════════════════════════════════════════════════════════

test('12 個語言版本都用同一個 mid-line [^N]: 形狀，全部要渲染成功', () => {
  // 這是全庫最常見的斷腳註形狀（譯本被 LLM 轉成 ASCII 冒號）。
  const langs = [
    'zh-TW',
    'en',
    'es',
    'fr',
    'de',
    'pt',
    'ru',
    'ar',
    'hi',
    'id',
    'ja',
    'ko',
    'vi',
  ];
  for (const lang of langs) {
    const md =
      '事實如此[^1]：這是後果。\n\n' +
      '[^1]: [報導](https://example.com) — 說明。\n';
    const html = render(md, lang);

    assert.equal(leftoverLabels(html).length, 0, `${lang}: 不該有字面殘留`);
    assert.deepEqual(footnoteIds(html), ['1'], `${lang}: 文末應該有腳註條目`);
  }
});

// ════════════════════════════════════════════════════════════════════════
// 定義區塊不會被算成引用
// ════════════════════════════════════════════════════════════════════════

test('定義區塊本身不算引用（不會自己引用自己）', () => {
  const md = '[^1]: [報導](https://example.com) — 說明。\n\n段落[^1]。\n';
  const html = render(md);

  assert.equal(leftoverLabels(html).length, 0);
  assert.deepEqual(supIds(html), ['fnref-1'], '只有正文那一次產生 <sup>');
});
