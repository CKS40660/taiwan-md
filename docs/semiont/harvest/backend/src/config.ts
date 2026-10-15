/**
 * Harvest backend runtime configuration.
 *
 * Loads from process.env (which Bun auto-populates from a sibling .env file
 * if present). Falls back to sensible defaults so the server can boot in a
 * fresh checkout without a .env.
 */

import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Resolve the repository root by walking up from the backend folder. */
function findRepoRoot(): string {
  // src/config.ts -> src/ -> backend/ -> harvest/ -> semiont/ -> docs/ -> repo root
  let cur = resolve(__dirname, '..', '..', '..', '..', '..');
  // Guard: keep walking up until we see a `.git` folder or hit /
  for (let i = 0; i < 8; i++) {
    if (existsSync(join(cur, '.git'))) return cur;
    const parent = dirname(cur);
    if (parent === cur) break;
    cur = parent;
  }
  return resolve(__dirname, '..', '..', '..', '..', '..');
}

const repoRootEnv = process.env.HARVEST_REPO_ROOT?.trim();
const repoRoot =
  repoRootEnv && repoRootEnv.length > 0 ? resolve(repoRootEnv) : findRepoRoot();

const backendRoot = resolve(__dirname, '..');
const bundledCodexBin = '/Applications/ChatGPT.app/Contents/Resources/codex';
const homebrewPythonBin = '/opt/homebrew/bin/python3';

function bool(envVar: string | undefined, fallback: boolean): boolean {
  if (envVar === undefined) return fallback;
  return envVar.toLowerCase() === 'true' || envVar === '1';
}

function num(envVar: string | undefined, fallback: number): number {
  if (envVar === undefined) return fallback;
  const n = Number(envVar);
  return Number.isFinite(n) ? n : fallback;
}

export const config = {
  repoRoot,
  backendRoot,
  port: num(process.env.HARVEST_PORT, 4319),
  // 預設只綁 loopback（127.0.0.1）——server 會以本機身分 spawn claude/codex/grok
  // 並在 worktree 內 git push，CORS allowlist 擋不住同網段 raw curl。需要遠端存取
  // 時再顯式設 HARVEST_HOST=0.0.0.0（自負風險）。
  host: process.env.HARVEST_HOST?.trim() || '127.0.0.1',
  dbPath:
    process.env.HARVEST_DB_PATH?.trim() &&
    process.env.HARVEST_DB_PATH.trim().length > 0
      ? resolve(process.env.HARVEST_DB_PATH.trim())
      : join(backendRoot, 'harvest.db'),
  logLevel: process.env.HARVEST_LOG_LEVEL ?? 'info',
  logPretty: bool(process.env.HARVEST_LOG_PRETTY, true),
  claudeBin: process.env.HARVEST_CLAUDE_BIN?.trim() || 'claude',
  /** Prefer ChatGPT's bundled, authenticated Codex over stale PATH shims. */
  codexBin:
    process.env.HARVEST_CODEX_BIN?.trim() ||
    (existsSync(bundledCodexBin) ? bundledCodexBin : 'codex'),
  /** Python >=3.11 is required by article-health (tomllib). */
  pythonBin:
    process.env.HARVEST_PYTHON_BIN?.trim() ||
    (existsSync(homebrewPythonBin) ? homebrewPythonBin : 'python3'),
  /** Path to the `grok` CLI binary (xAI Grok Build). Used when engine=grok. */
  grokBin: process.env.HARVEST_GROK_BIN?.trim() || 'grok',
  /**
   * Default spawn engine when task.inputs.engine is unset.
   * Phase 5.2 (2026-07-12): default switched to grok (subscription peer agent).
   * Override per-task via inputs.engine, or globally via HARVEST_DEFAULT_ENGINE.
   */
  defaultEngine: (process.env.HARVEST_DEFAULT_ENGINE?.trim() || 'grok') as
    'claude' | 'grok' | 'codex' | 'ollama',
  sessionTimeoutMs: num(process.env.HARVEST_SESSION_TIMEOUT_MIN, 90) * 60_000,
  disableCron: bool(process.env.HARVEST_DISABLE_CRON, false),
  disableWatch: bool(process.env.HARVEST_DISABLE_WATCH, false),
  autoCommitReport: bool(process.env.HARVEST_AUTO_COMMIT_REPORT, true),
  /** Max concurrent claude sessions. Above this → spawn 409s with queued advice. */
  maxConcurrentSessions: num(process.env.HARVEST_MAX_CONCURRENT, 3),
  /** Health monitor: idle minutes before a session is declared stuck. */
  stuckThresholdMin: num(process.env.HARVEST_STUCK_MIN, 30),
  /** Health monitor poll interval (seconds). */
  healthPollSec: num(process.env.HARVEST_HEALTH_POLL_SEC, 60),
  /** Auto-spawn loop poll interval (seconds). */
  autoSpawnPollSec: num(process.env.HARVEST_AUTO_SPAWN_POLL_SEC, 300),
  /** Auto-spawn: minimum priority that auto-fires (P0/P1 default). P2/P3 manual. */
  autoSpawnMinPriority: process.env.HARVEST_AUTO_SPAWN_MIN_PRIORITY ?? 'P1',
  /** Auto-spawn: cooldown after retryable network error before requeue (seconds). */
  retryCooldownSec: num(process.env.HARVEST_RETRY_COOLDOWN_SEC, 30),
  /** GitHub webhook shared secret. Optional — if unset the endpoint 503s. */
  githubWebhookSecret: process.env.GITHUB_WEBHOOK_SECRET ?? '',
  /** GitHub repo `owner/name` for maintainer-pipeline polling. Auto-detected from `git remote` when empty. */
  githubRepo: process.env.HARVEST_GITHUB_REPO ?? '',
  /** Disable health monitor (test/CI). */
  disableHealthMonitor: bool(process.env.HARVEST_DISABLE_HEALTH, false),
  /** Disable auto-spawn loop (test/CI). */
  disableAutoSpawn: bool(process.env.HARVEST_DISABLE_AUTO_SPAWN, false),
  // Derived paths (always relative to repoRoot).
  paths: {
    articleInbox: join(repoRoot, 'docs', 'semiont', 'ARTICLE-INBOX.md'),
    bootProfiles: join(backendRoot, 'boot-profiles', 'profiles.yml'),
    promptTemplates: join(backendRoot, 'prompts'),
    harvestRoot: join(repoRoot, '.harvest'),
    tasksRoot: join(repoRoot, '.harvest', 'tasks'),
    reportsRoot: join(repoRoot, 'reports', 'harvest'),
    sessionsLogRoot: join(repoRoot, '.harvest', 'sessions'),
  },
} as const;

export type HarvestConfig = typeof config;
