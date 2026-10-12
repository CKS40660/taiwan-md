import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  copyFile,
  mkdtemp,
  mkdir,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ARTICLE_PATH = 'knowledge/Culture/contributor-template.md';

test('CONTRIBUTING article template passes the strict frontmatter validator', async (t) => {
  const sandbox = await mkdtemp(join(tmpdir(), 'twmd-contributor-template-'));
  t.after(() => rm(sandbox, { recursive: true, force: true }));

  const contributing = await readFile(
    join(REPO_ROOT, 'CONTRIBUTING.md'),
    'utf8',
  );
  const section = contributing.split('### 文章結構範本', 2)[1];
  assert.ok(
    section,
    'CONTRIBUTING.md must contain the article template section',
  );

  const template = section.match(/```markdown\n([\s\S]*?)\n```/u)?.[1];
  assert.ok(
    template,
    'the article template must remain a fenced Markdown example',
  );

  const article = join(sandbox, ARTICLE_PATH);
  await mkdir(dirname(article), { recursive: true });
  await writeFile(article, `${template.trim()}\n`, 'utf8');

  const result = spawnSync(
    process.execPath,
    [join(REPO_ROOT, 'scripts/core/test-frontmatter.mjs'), '--strict'],
    {
      cwd: sandbox,
      env: { ...process.env, TWMD_VALIDATE_FILES: ARTICLE_PATH },
      encoding: 'utf8',
    },
  );

  assert.equal(result.status, 0, `${result.stdout}${result.stderr}`);
});

test('CONTRIBUTING sync command projects new and edited source articles', async (t) => {
  const sandbox = await mkdtemp(join(tmpdir(), 'twmd-contributor-sync-'));
  t.after(() => rm(sandbox, { recursive: true, force: true }));

  const contributing = await readFile(
    join(REPO_ROOT, 'CONTRIBUTING.md'),
    'utf8',
  );
  const workflow = contributing.match(
    /```bash\n# 完整流程\n([\s\S]*?)\n```/u,
  )?.[1];
  assert.ok(
    workflow,
    'CONTRIBUTING.md must contain the complete article workflow',
  );
  const syncLine = workflow
    .split('\n')
    .find((line) => /^(?:bash|npm) .*\bsync\b/u.test(line));
  assert.ok(syncLine, 'the workflow must include a runnable sync command');
  const [command, ...args] = syncLine.split('#', 1)[0].trim().split(/\s+/u);

  // Use the real entrypoints with a small corpus, not the contributor's checkout.
  for (const file of [
    'package.json',
    'scripts/core/sync.sh',
    'src/config/languages.mjs',
  ]) {
    await mkdir(dirname(join(sandbox, file)), { recursive: true });
    await copyFile(join(REPO_ROOT, file), join(sandbox, file));
  }
  const init = spawnSync('git', ['init', '--quiet'], {
    cwd: sandbox,
    encoding: 'utf8',
  });
  assert.equal(init.status, 0, init.stderr);

  const articles = [
    [
      'knowledge/Art/測試文章.md',
      'src/content/zh-TW/art/測試文章.md',
      '# 中文原文\n',
    ],
    [
      'knowledge/en/Art/example.md',
      'src/content/en/art/example.md',
      '# English translation\n',
    ],
  ];
  for (const [source, , body] of articles) {
    await mkdir(dirname(join(sandbox, source)), { recursive: true });
    await writeFile(join(sandbox, source), body, 'utf8');
  }

  // A second sync must copy subsequent edits, not just the initial article.
  for (const suffix of ['', '\nUpdated after starting the preview.\n']) {
    for (const [source, , body] of articles) {
      await writeFile(join(sandbox, source), body + suffix, 'utf8');
    }
    const result = spawnSync(command, args, { cwd: sandbox, encoding: 'utf8' });
    assert.equal(result.status, 0, `${result.stdout}${result.stderr}`);
    for (const [source, projection, body] of articles) {
      assert.equal(
        await readFile(join(sandbox, projection), 'utf8'),
        body + suffix,
      );
      assert.equal(
        await readFile(join(sandbox, source), 'utf8'),
        body + suffix,
      );
    }
  }
});

test('CONTRIBUTING PR examples are not ignored generated files', async () => {
  const contributing = await readFile(
    join(REPO_ROOT, 'CONTRIBUTING.md'),
    'utf8',
  );
  const template = contributing
    .split('#### PR 模板', 2)[1]
    ?.split('## ✅ 檢查清單', 1)[0];
  assert.ok(template, 'CONTRIBUTING.md must contain the PR file examples');
  const paths = [...template.matchAll(/^- \[ \] .+?`([^`]+)`/gmu)].map(
    (match) => match[1],
  );
  assert.ok(
    paths.length >= 2,
    'the PR template must list article source examples',
  );

  const result = spawnSync('git', ['check-ignore', '--no-index', '--stdin'], {
    cwd: REPO_ROOT,
    input: `${paths.join('\n')}\n`,
    encoding: 'utf8',
  });
  assert.equal(
    result.status,
    1,
    `PR examples must be committable:\n${result.stdout}${result.stderr}`,
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// 為什麼有這條測試（2026-08-16 twmd-maintainer-am）
//
// 閘門升級與文件更新是兩個不同動作、由兩個不同動機驅動，中間沒有東西在對賬
// （LESSONS `doc-and-validator-drift-has-no-reconciler`）。上面那條測試守住了
// frontmatter 範本那一半；散文／媒體的硬門檻那一半一直沒人守：
//
//   - `semicolon_hard_over` 2026-07-19 升成 HARD，CONTRIBUTING 從沒寫過分號限制
//   - `emdash_hard_over` 同理
//   - CONTRIBUTING 甚至叫貢獻者跑 `--check=prose-health`，而那個模式**看不到**
//     這兩道門檻，於是本機 hard=0、送上來被 CI 擋
//
// 後果實測：2026-08-16 早上九個 open PR，七個敗在分號、六個敗在圖片熱連結，
// 而這三件事在貢獻者讀得到的任何文件裡都不存在。
//
// 這條測試把數值對賬起來：config 改了門檻而 CONTRIBUTING 沒跟上 → CI 紅。
// ─────────────────────────────────────────────────────────────────────────────
test('CONTRIBUTING documents the prose hard gates with the values the checker actually uses', async () => {
  const [contributing, config] = await Promise.all([
    readFile(join(REPO_ROOT, 'CONTRIBUTING.md'), 'utf8'),
    readFile(
      join(REPO_ROOT, 'scripts/tools/article-health.config.toml'),
      'utf8',
    ),
  ]);

  const readThreshold = (key) => {
    const values = [
      ...config.matchAll(new RegExp(`^${key}\\s*=\\s*(\\d+)`, 'gmu')),
    ].map((m) => Number(m[1]));
    assert.ok(
      values.length > 0,
      `${key} must exist in article-health.config.toml`,
    );
    assert.equal(
      new Set(values).size,
      1,
      `${key} is defined ${values.length} times with differing values (${values.join(', ')}) — ` +
        'collapse it to one number before documenting it',
    );
    return values[0];
  };

  const semicolon = readThreshold('semicolon_hard_over');
  const emdash = readThreshold('emdash_hard_over');

  assert.match(
    contributing,
    new RegExp(`≤\\s*${semicolon}\\s*處`, 'u'),
    `CONTRIBUTING.md must state the 全形分號 limit as "≤ ${semicolon} 處" ` +
      '(the checker blocks merges above it; contributors currently have no way to learn this)',
  );
  assert.match(
    contributing,
    new RegExp(`≤\\s*${emdash}\\s*處`, 'u'),
    `CONTRIBUTING.md must state the 破折號 limit as "≤ ${emdash} 處"`,
  );

  // 跑錯 profile 是「本機綠、CI 紅」的第一大來源，指南必須教對的那一行。
  assert.ok(
    contributing.includes('--profile=ci-deploy'),
    'CONTRIBUTING.md must tell contributors to run article-health with --profile=ci-deploy',
  );
  assert.ok(
    contributing.includes('外部圖片熱連結'),
    'CONTRIBUTING.md must document the external image hotlink hard gate',
  );
});
