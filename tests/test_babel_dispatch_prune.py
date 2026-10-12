"""閒置 run dir 清理（prune_idle_run_dirs）：只收零紀錄、進程已死、超過 48 小時的那種。

2026-10-13 babel-nightly：keepalive 閒置輪詢每十分鐘開一個 run dir，/tmp 累積 939 個，
兩班交接都寫「無清理機制」原樣往下傳。
"""
import importlib.util
import os
import sys
import time
from pathlib import Path


MODULE_PATH = (
    Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync" / "babel-dispatch.py"
)
SPEC = importlib.util.spec_from_file_location("babel_dispatch", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
sys.modules["babel_dispatch"] = MODULE
SPEC.loader.exec_module(MODULE)

DEAD_PID = 999_999_9  # 遠超 macOS pid_max，保證不在
OLD = time.time() - 72 * 3600


def _mk(base: Path, name: str, *, report: str = "", freezes: str = "",
        subdir: bool = False, age: float = OLD) -> Path:
    d = base / name
    d.mkdir()
    (d / "master.log").write_text("START\n💤 本 run 零派工\n")
    (d / "report.jsonl").write_text(report)
    (d / "freezes.jsonl").write_text(freezes)
    if subdir:
        (d / "tasks").mkdir()
    os.utime(d, (age, age))
    return d


def test_prunes_only_empty_dead_old(tmp_path):
    idle = _mk(tmp_path, f"babel-unified-20261001-000000-{DEAD_PID}")
    idle_suffix = _mk(tmp_path, f"babel-unified-20261001-000001-{DEAD_PID}-1")
    with_report = _mk(tmp_path, f"babel-unified-20261001-000002-{DEAD_PID}", report='{"ok":1}\n')
    with_freeze = _mk(tmp_path, f"babel-unified-20261001-000003-{DEAD_PID}", freezes='{"w":1}\n')
    with_tasks = _mk(tmp_path, f"babel-unified-20261001-000004-{DEAD_PID}", subdir=True)
    young = _mk(tmp_path, f"babel-unified-20261012-230000-{DEAD_PID}", age=time.time() - 3600)
    alive = _mk(tmp_path, f"babel-unified-20261001-000005-{os.getpid()}")
    current = _mk(tmp_path, f"babel-unified-20261001-000006-{DEAD_PID}")
    other = tmp_path / "babel-something-else"
    other.mkdir()

    removed = MODULE.prune_idle_run_dirs(tmp_path, keep=current)

    assert sorted(removed) == sorted([idle, idle_suffix])
    for kept in (with_report, with_freeze, with_tasks, young, alive, current, other):
        assert kept.exists(), kept
    assert not idle.exists() and not idle_suffix.exists()


def test_noop_on_missing_record_files_counts_as_empty(tmp_path):
    d = tmp_path / f"babel-unified-20261001-000000-{DEAD_PID}"
    d.mkdir()
    (d / "master.log").write_text("START\n")
    os.utime(d, (OLD, OLD))
    assert MODULE.prune_idle_run_dirs(tmp_path) == [d]
