"""A snapshot is one day's data, as plain CSV files in data/snapshots/YYYY-MM-DD/.

Every analysis and every agent reads snapshots, never the APIs directly, so the
same run works from a live pull (`cli pull`) or from manual exports dropped in
the folder (PriceLabs CSV export, Smoobu booking export, competitor checks).

Files and columns:
  prices.csv        ref,date,pricelabs_price,smoobu_price,available,min_stay
  reservations.csv  ref,channel,arrival,departure,total_gbp,booked_on,status
  market.csv        ref,bedrooms,p25,p50,p75,p90,market_occ_30,market_occ_60,market_adr_30,source
  comps.csv         ref,comp_id,platform,url,bedrooms,sleeps,rating,reviews,date,nightly_gbp,source
  channel_checks.csv ref,channel,date,displayed_nightly_gbp,displayed_discount_pct,source
  listings.csv      ref,pricelabs_id,smoobu_id,pl_base,pl_min,pl_max,sync_on,last_push,rating_airbnb,reviews_airbnb,rating_booking,reviews_booking
"""
import csv
import json
from datetime import date, timedelta

from . import config

SCHEMAS = {
    "prices": "ref,pricelabs_id,date,pricelabs_price,smoobu_price,available,min_stay,booking_status,booked_price,booked_adr",
    "reservations": "ref,pricelabs_id,channel,arrival,departure,total_gbp,cleaning_gbp,commission_gbp,booked_on,status",
    "market": "ref,bedrooms,p25,p50,p75,p90,market_occ_30,market_occ_60,market_adr_30,source",
    "comps": "ref,comp_id,platform,url,bedrooms,sleeps,rating,reviews,date,nightly_gbp,source",
    "channel_checks": "ref,channel,date,displayed_nightly_gbp,displayed_discount_pct,source",
    "listings": ("ref,pricelabs_id,pms,name,smoobu_id,pl_base,pl_min,pl_max,sync_on,last_push,recommended_base,"
                 "rating_airbnb,reviews_airbnb,rating_booking,reviews_booking"),
    "pl_kpis": ("ref,pricelabs_id,pms,occupancy_next_7,market_occupancy_next_7,occupancy_next_30,"
                "market_occupancy_next_30,occupancy_next_60,market_occupancy_next_60,adr_past_30,stly_adr_past_30,"
                "booking_pickup_past_30,adr_ytd,stly_adr_ytd,adr_next_360,stly_adr_next_360,fully_blocked_next_360"),
}
NUMERIC = {"pricelabs_price", "smoobu_price", "min_stay", "total_gbp", "p25", "p50", "p75",
           "p90", "market_occ_30", "market_occ_60", "market_adr_30", "bedrooms", "sleeps", "rating", "reviews",
           "nightly_gbp", "displayed_nightly_gbp", "displayed_discount_pct", "pl_base", "pl_min",
           "pl_max", "rating_airbnb", "reviews_airbnb", "rating_booking", "reviews_booking",
           "booked_price", "booked_adr", "cleaning_gbp", "commission_gbp", "recommended_base",
           "occupancy_next_7", "market_occupancy_next_7", "occupancy_next_30", "market_occupancy_next_30",
           "occupancy_next_60", "market_occupancy_next_60", "adr_past_30", "stly_adr_past_30",
           "booking_pickup_past_30", "adr_ytd", "stly_adr_ytd", "adr_next_360", "stly_adr_next_360"}


def folder(day=None):
    return config.DATA / "snapshots" / (day or date.today().isoformat())


def write_templates(day=None):
    d = folder(day)
    d.mkdir(parents=True, exist_ok=True)
    for name, header in SCHEMAS.items():
        p = d / f"{name}.csv"
        if not p.exists():
            p.write_text(header + "\n")
    return d


def _coerce(row):
    out = {}
    for k, v in row.items():
        v = (v or "").strip()
        if k in NUMERIC:
            out[k] = float(v) if v not in ("", "NA") else None
        elif k in ("available", "sync_on", "fully_blocked_next_360"):
            out[k] = v.lower() in ("1", "true", "yes", "y")
        else:
            out[k] = v
    return out


def load(day=None):
    d = folder(day)
    snap = {}
    for name in SCHEMAS:
        p = d / f"{name}.csv"
        snap[name] = [_coerce(r) for r in csv.DictReader(p.open())] if p.exists() else []
    return snap


def save(name, rows, day=None):
    d = folder(day)
    d.mkdir(parents=True, exist_ok=True)
    cols = SCHEMAS[name].split(",")
    with (d / f"{name}.csv").open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)


def pull_smoobu(days_ahead=180, day=None):
    """Add Smoobu's stored nightly rate to prices.csv (the PriceLabs -> Smoobu sync check).

    Run after `ingest`, so prices.csv already holds PriceLabs prices from the connector.
    """
    from .smoobu import Smoobu

    id_map = json.loads(config.ID_MAP_FILE.read_text())
    by_sm = {str(v["smoobu"]): ref for ref, v in id_map.items()
             if not ref.startswith("_") and v.get("smoobu")}
    start = date.today()
    rates = Smoobu().rates(list(by_sm), start.isoformat(),
                           (start + timedelta(days=days_ahead)).isoformat()).get("data", {})
    sm = {}
    for sid, days in rates.items():
        ref = by_sm.get(str(sid))
        for d, v in (days or {}).items() if ref else []:
            sm[(ref, d)] = v
    rows = [{k: ("" if v is None else v) for k, v in r.items()} for r in _raw_rows("prices", day)]
    for r in rows:
        v = sm.get((r["ref"], r["date"]))
        if v and v.get("price") is not None:
            r["smoobu_price"] = v["price"]
    save("prices", rows, day)
    return len(sm)


def _raw_rows(name, day=None):
    p = folder(day) / f"{name}.csv"
    return list(csv.DictReader(p.open())) if p.exists() else []


def _market_row(ref, prop, nd):
    """Pick the bedroom-matched percentile row out of PriceLabs neighborhood data."""
    beds = int(prop["type"].split("-")[0])
    row = {"ref": ref, "bedrooms": beds, "source": "pricelabs neighborhood_data"}
    data = (nd or {}).get("data", {})
    pct = data.get("Future Percentile Prices", {})
    cat = pct.get("Category", {}).get(str(beds), {})
    labels, series = pct.get("Labels", []), cat.get("Y_values", [])
    for label, values in zip(labels, series):
        key = {"25th Percentile": "p25", "50th Percentile": "p50", "75th Percentile": "p75",
               "90th Percentile": "p90"}.get(label)
        if key and values:
            row[key] = round(sum(values[:30]) / min(30, len(values)), 2)
    occ = data.get("Future Occ/New/Canc", {}).get("Category", {}).get(str(beds), {}).get("Y_values", [])
    if occ and occ[0]:
        row["market_occ_30"] = round(sum(occ[0][:30]) / min(30, len(occ[0])) / 100, 3)
        row["market_occ_60"] = round(sum(occ[0][:60]) / min(60, len(occ[0])) / 100, 3)
    return row
