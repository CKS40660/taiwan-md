import chalk from 'chalk';
import { execFile } from 'child_process';
import {
  getArticleFiles,
  getArticleFilesForLang,
  readArticle,
} from '../lib/knowledge.js';
import { renderArticleHeader, renderMarkdown } from '../lib/render.js';
import { ensureData } from '../lib/ensure-data.js';

/**
 * Slugify a filename for comparison.
 * Strips extension, lowercases, replaces spaces/underscores with hyphens.
 */
function slugify(filename) {
  return filename
    .replace(/\.md$/i, '')
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]/g, '');
}

/**
 * Find the best matching article file for a given slug within a file list.
 */
async function findArticle(slug, articleFiles) {
  const normalizedSlug = slug.toLowerCase().replace(/[\s_]+/g, '-');

  // Pass 1: exact slug match on filename
  for (const filePath of articleFiles) {
    const filename = filePath.split('/').pop();
    const fileSlug = slugify(filename);
    if (fileSlug === normalizedSlug) {
      return filePath;
    }
  }

  // Pass 2: filename contains slug
  for (const filePath of articleFiles) {
    const filename = filePath.split('/').pop();
    const fileSlug = slugify(filename);
    if (
      fileSlug.includes(normalizedSlug) ||
      normalizedSlug.includes(fileSlug)
    ) {
      return filePath;
    }
  }

  // Pass 3: check frontmatter titles
  for (const filePath of articleFiles) {
    try {
      const article = await readArticle(filePath);
      if (article && article.frontmatter && article.frontmatter.title) {
        const titleSlug = article.frontmatter.title
          .toLowerCase()
          .replace(/[\s_]+/g, '-');
        if (
          titleSlug.includes(normalizedSlug) ||
          normalizedSlug.includes(titleSlug)
        ) {
          return filePath;
        }
      }
    } catch {
      // skip unreadable files
    }
  }

  return null;
}

/**
 * Resolve effective language from options.
 * --lang <code> takes precedence, then shorthand flags.
 */
function resolveLang(opts) {
  if (opts.lang) return opts.lang;
  if (opts.en) return 'en';
  if (opts.ja) return 'ja';
  if (opts.es) return 'es';
  return null; // default: zh-TW
}

export function readCommand(program) {
  program
    .command('read <slug>')
    .description('Read a Taiwan.md article')
    .option('--en', 'Read English version (shorthand for --lang en)')
    .option('--ja', 'Read Japanese version (shorthand for --lang ja)')
    .option('--es', 'Read Spanish version (shorthand for --lang es)')
    .option('--lang <code>', 'Language code: en, ja, es (default: zh-TW)')
    .option('--raw', 'Output raw markdown')
    .option('--web', 'Open in browser')
    .action(async (slug, opts) => {
      try {
        await ensureData();

        const lang = resolveLang(opts);

        // Load file list for the requested language
        const articleFiles = lang
          ? getArticleFilesForLang(lang)
          : getArticleFiles();

        if (!articleFiles || articleFiles.length === 0) {
          if (lang) {
            console.log(
              chalk.yellow(`\n  找不到「${lang}」語言版本的文章。\n`),
            );
            console.log(chalk.gray('  可用語言: en, ja, es (需要先 sync)\n'));
          } else {
            console.log(chalk.yellow('\n  知識庫尚未同步。請先執行:'));
            console.log(chalk.cyan('  taiwanmd sync\n'));
          }
          return;
        }

        const filePath = await findArticle(slug, articleFiles);

        if (!filePath) {
          // If a lang was requested and not found, try falling back to zh-TW
          if (lang) {
            console.log(
              chalk.yellow(
                `\n  找不到「${slug}」的 ${lang} 版本，嘗試中文版...\n`,
              ),
            );
            const zhFiles = getArticleFiles();
            const zhPath = await findArticle(slug, zhFiles);
            if (!zhPath) {
              console.log(chalk.yellow(`\n  找不到文章「${slug}」\n`));
              console.log(chalk.gray('  💡 試試搜尋:'));
              console.log(chalk.cyan(`  taiwanmd search ${slug}\n`));
              return;
            }
            // Fall through with zh path
            return await renderArticleFile(zhPath, opts);
          }

          console.log(chalk.yellow(`\n  找不到文章「${slug}」\n`));
          console.log(chalk.gray('  💡 試試搜尋:'));
          console.log(chalk.cyan(`  taiwanmd search ${slug}\n`));
          return;
        }

        await renderArticleFile(filePath, opts);
      } catch (err) {
        console.error(chalk.red(`讀取失敗: ${err.message}`));
        process.exit(1);
      }
    });
}

/**
 * 從 frontmatter 組出 taiwan.md 文章網址，組不出合法網址就回 null。
 *
 * 刻意不驗 category／slug 的字元集：全庫 14,883 個檔名裡有 123 個含空白、
 * 33 個含全形冒號，還有「·」「（）」。issue #1863 建議的白名單
 * `/^[\w\u4e00-\u9fff-]+$/` 會把這 150+ 篇合法文章擋在 --web 之外，
 * 是個假陽性閘門（REFLEXES #66：門檻要用真實產出校準）。
 *
 * 真正關掉命令注入的是呼叫端的 execFile（不走 shell）。本函式只多擋一層
 * 「組出來的東西還是不是 taiwan.md 的 https 網址」，防的是 category 帶
 * `../` 之類的路徑把戲，而這一層不看字元集，所以不會誤殺 CJK 與空白。
 */
export function buildArticleUrl(fm) {
  if (!fm || typeof fm.category !== 'string' || typeof fm.slug !== 'string') {
    return null;
  }
  let u;
  try {
    u = new URL(`${fm.category}/${fm.slug}`, 'https://taiwan.md/');
  } catch {
    return null;
  }
  if (u.protocol !== 'https:' || u.host !== 'taiwan.md') return null;
  if (!u.pathname.startsWith('/') || u.pathname === '/') return null;
  return u.href;
}

/**
 * Render an article from a given file path.
 */
async function renderArticleFile(filePath, opts) {
  const article = await readArticle(filePath);

  if (!article) {
    console.log(chalk.red('\n  無法讀取文章內容。\n'));
    return;
  }

  const fm = article.frontmatter;

  // Handle --web flag: open in browser
  if (opts.web) {
    const url = buildArticleUrl(fm);
    if (!url) {
      console.log(
        chalk.red(
          `\n  frontmatter 的 category／slug 組不出 taiwan.md 網址，不開瀏覽器。\n`,
        ),
      );
      return;
    }
    // 顯示用解碼版（CJK slug 才讀得出來），交給 open 的仍是 canonical href
    let shown = url;
    try {
      shown = decodeURI(url);
    } catch {
      /* 壞的 escape sequence 就印原樣 */
    }
    console.log(chalk.gray(`\n  Opening ${shown} ...\n`));
    // execFile 不經過 shell：category／slug 來自被讀取那篇文章的 frontmatter
    // （實務上來自外部 PR），用 exec 字串插值等於讓文章作者決定要跑什麼指令。
    // 參數陣列把這條邊界關掉。issue #1863。
    execFile('open', [url]);
    return;
  }

  // Handle --raw flag: output raw markdown
  if (opts.raw) {
    console.log(article.body || '');
    return;
  }

  // Default: render article
  console.log('');
  console.log(
    renderArticleHeader({
      title: fm.title,
      category: fm.category,
      date: fm.date,
      wordCount: fm.wordCount,
      tags: fm.tags,
      description: fm.description,
    }),
  );
  console.log('');
  console.log(renderMarkdown(article.body || ''));
}
