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
    "prices": "ref,date,pricelabs_price,smoobu_price,available,min_stay",
    "reservations": "ref,channel,arrival,departure,total_gbp,booked_on,status",
    "market": "ref,bedrooms,p25,p50,p75,p90,market_occ_30,market_occ_60,market_adr_30,source",
    "comps": "ref,comp_id,platform,url,bedrooms,sleeps,rating,reviews,date,nightly_gbp,source",
    "channel_checks": "ref,channel,date,displayed_nightly_gbp,displayed_discount_pct,source",
    "listings": ("ref,pricelabs_id,smoobu_id,pl_base,pl_min,pl_max,sync_on,last_push,"
                 "rating_airbnb,reviews_airbnb,rating_booking,reviews_booking"),
}
NUMERIC = {"pricelabs_price", "smoobu_price", "min_stay", "total_gbp", "p25", "p50", "p75",
           "p90", "market_occ_30", "market_occ_60", "market_adr_30", "bedrooms", "sleeps", "rating", "reviews",
           "nightly_gbp", "displayed_nightly_gbp", "displayed_discount_pct", "pl_base", "pl_min",
           "pl_max", "rating_airbnb", "reviews_airbnb", "rating_booking", "reviews_booking"}


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
        elif k == "available" or k == "sync_on":
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


def pull_live(days_ahead=180, day=None):
    """Pull PriceLabs + Smoobu into today's snapshot. Needs both API keys and id_map.json."""
    from .pricelabs import PriceLabs
    from .smoobu import Smoobu

    id_map = json.loads(config.ID_MAP_FILE.read_text())
    start = date.today()
    end = start + timedelta(days=days_ahead)
    pl, sm = PriceLabs(), Smoobu()
    s_iso, e_iso = start.isoformat(), end.isoformat()

    by_pl = {str(v["pricelabs"]): ref for ref, v in id_map.items() if v.get("pricelabs")}
    by_sm = {str(v["smoobu"]): ref for ref, v in id_map.items() if v.get("smoobu")}

    # PriceLabs listings (settings + sync) and recommended prices.
    listings = {}
    for l in pl.listings().get("listings", []):
        ref = by_pl.get(str(l.get("id")))
        if ref:
            listings[ref] = {"ref": ref, "pricelabs_id": l.get("id"), "smoobu_id": id_map[ref].get("smoobu"),
                             "pl_base": l.get("base"), "pl_min": l.get("min"), "pl_max": l.get("max"),
                             "sync_on": l.get("push_enabled"), "last_push": l.get("last_date_pushed")}
    prices = {}
    for l in pl.listing_prices(list(by_pl), s_iso, e_iso):
        ref = by_pl.get(str(l.get("id")))
        for d in l.get("data", []) if ref else []:
            prices[(ref, d["date"])] = {"ref": ref, "date": d["date"],
                                        "pricelabs_price": d.get("user_price") or d.get("price")}
    # Smoobu rates as actually stored in the channel manager.
    rates = sm.rates(list(by_sm), s_iso, e_iso).get("data", {})
    for sid, days in rates.items():
        ref = by_sm.get(str(sid))
        for d, v in (days or {}).items() if ref else []:
            row = prices.setdefault((ref, d), {"ref": ref, "date": d})
            row.update(smoobu_price=v.get("price"), available=bool(v.get("available")),
                       min_stay=v.get("min_length_of_stay"))
    # Market percentiles per listing.
    market = []
    for ref, l in listings.items():
        try:
            nd = pl.neighborhood_data(l["pricelabs_id"])
        except Exception as e:  # neighborhood data is optional; keep the run going
            print(f"neighborhood_data {ref}: {e}")
            continue
        market.append(_market_row(ref, config.BY_REF[ref], nd))
    # Reservations from Smoobu (every channel) for the last 365 days and the window ahead.
    res = []
    for b in Smoobu().reservations((start - timedelta(days=365)).isoformat(), e_iso):
        ref = by_sm.get(str((b.get("apartment") or {}).get("id")))
        if ref:
            res.append({"ref": ref, "channel": (b.get("channel") or {}).get("name", ""),
                        "arrival": b.get("arrival"), "departure": b.get("departure"),
                        "total_gbp": b.get("price"), "booked_on": (b.get("created-at") or "")[:10],
                        "status": "cancelled" if b.get("type") == "cancellation" else "confirmed"})
    save("listings", listings.values(), day)
    save("prices", sorted(prices.values(), key=lambda r: (r["ref"], r["date"])), day)
    save("market", market, day)
    save("reservations", res, day)
    return folder(day)


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
