"""Build Revenue Quest `properties/<ref>` documents from the day's KPI pack.

Usage (from seeker-estates/revenue):
  python3 -m rm.cli dash-props <date> <out_dir> [<existing_dir>]
<existing_dir> holds the current documents as saved by ArtifactData `list ... out_dir`
(`<existing_dir>/properties/<ref>.json`); their history is kept and today's entry is
replaced or appended. One JSON file per property is written to <out_dir>, ready for
ArtifactData `set` with `file_path`.
"""
import csv
import json
from pathlib import Path

from . import config


def _num(v):
    try:
        f = float(v)
    except (TypeError, ValueError):
        return None
    return f or None  # PriceLabs reports 0 when there were no stays: unknown, not £0


def build(day, out_dir, existing_dir=None):
    pack = json.loads((config.REPORTS / day / "kpi_pack.json").read_text())
    kp_file = config.DATA / "snapshots" / day / "pl_kpis.csv"
    kp = {r["ref"]: r for r in csv.DictReader(kp_file.open()) if r["ref"]} if kp_file.exists() else {}
    pol = config.policy()
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    written = []
    for p in pack["properties"]:
        ref = p["ref"]
        if not p.get("settings"):  # not priced in PriceLabs: nothing to track yet
            continue
        k = kp.get(ref, {})
        prop = config.BY_REF.get(ref, {})
        blocked = p.get("blocked_next_30")
        entry = {"date": day, "adr30": _num(k.get("adr_past_30")), "adr30_ly": _num(k.get("stly_adr_past_30")),
                 "adr_ytd": _num(k.get("adr_ytd")), "adr_ytd_ly": _num(k.get("stly_adr_ytd")),
                 "occ_fwd30": p.get("forward_occ_30"), "mkt_fwd30": p.get("market_occ_30"),
                 "occ_fwd60": p.get("forward_occ_60"), "mkt_fwd60": p.get("market_occ_60"),
                 "blocked30": blocked,
                 "source": f"Daily run {day}: ADR = PriceLabs past-30-day and year-to-date ADR; "
                           "booked = booked nights only (linked listings combined)"
                           + (f"; {blocked:.0%} of next 30 nights blocked" if blocked else "") + "."}
        history, old_doc = [], {}
        old = Path(existing_dir) / "properties" / f"{ref}.json" if existing_dir else None
        if old and old.exists():
            raw = json.loads(old.read_text())
            old_doc = raw.get("data", raw)
            history = [h for h in (old_doc.get("history") or []) if h.get("date") != day]
        history.append(entry)
        tag = ("Blocked on purpose" if ref in pol.get("intentional_blocks", {}).get("refs", [])
               else "Special setup" if ref in pol.get("special_setups", {}) else "")
        doc = {"area": old_doc.get("area") or prop.get("area", ""),
               "name": old_doc.get("name") or f"{prop.get('notes', '').split(';')[0]} · {prop.get('type', '')}".strip(" ·"),
               "tag": tag, "checks": p.get("checks", []), "checks_date": day,
               "history": sorted(history, key=lambda h: h["date"])[-400:]}
        (out / f"{ref}.json").write_text(json.dumps(doc, ensure_ascii=False))
        written.append(ref)
    return written
