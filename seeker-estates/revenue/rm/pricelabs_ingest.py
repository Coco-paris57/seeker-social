"""Turn raw PriceLabs connector (MCP) responses into snapshot CSVs.

The daily run saves each connector response verbatim as JSON in
data/snapshots/<date>/raw/, then `python3 -m rm.cli ingest <date>` calls this.
Expected files (names are what the skill writes):
  listing_data.json          get_listing_data (all listings)
  prices_<listing_id>.json   get_listing_prices, one per listing
  reservations_*.json        get_pms_reservations pages (any number)
Field meanings verified against live responses on 18 Oct 2026.
"""
import json

from . import config, snapshot


def _num(v):
    """PriceLabs mixes numbers with '-', 'Unavailable', 'Fully Blocked', '71 %'."""
    if v is None:
        return None
    if isinstance(v, (int, float)):
        return v
    s = str(v).replace("%", "").strip()
    try:
        return float(s)
    except ValueError:
        return None


def _pct(v):
    n = _num(v)
    return round(n / 100, 3) if n is not None else None


def _load(path):
    d = json.loads(path.read_text())
    return d.get("data", d) if isinstance(d, dict) else d


def ref_by_pricelabs_id(include_other=False):
    """PriceLabs id -> our ref. `pricelabs` holds the listing that prices the unit;
    `pricelabs_other` holds duplicates (Vrbo/Channex copies, second Smoobu listing),
    mapped only when include_other is set (reservations), so prices are not double counted."""
    id_map = json.loads(config.ID_MAP_FILE.read_text()) if config.ID_MAP_FILE.exists() else {}
    out = {}
    for ref, ids in id_map.items():
        if ref.startswith("_"):
            continue
        keys = ["pricelabs", "pricelabs_other"] if include_other else ["pricelabs"]
        for k in keys:
            for pl_id in ids.get(k, []):
                out[str(pl_id)] = ref
    return out


def ingest(day):
    raw = snapshot.folder(day) / "raw"
    refs = ref_by_pricelabs_id()
    refs_all = ref_by_pricelabs_id(include_other=True)
    written = {}

    lp = raw / "listing_data.json"
    if lp.exists():
        listings, kpis = [], []
        for l in _load(lp).get("listings", []):
            ref = refs_all.get(str(l["id"]), "")
            listings.append({"ref": ref, "pricelabs_id": l["id"], "pms": l.get("pms"), "name": l.get("name"),
                             "pl_base": l.get("base"), "pl_min": l.get("min"), "pl_max": l.get("max"),
                             "sync_on": l.get("push_enabled"), "last_push": l.get("last_date_pushed"),
                             "recommended_base": _num(l.get("recommended_base_price"))})
            kpis.append({"ref": refs.get(str(l["id"]), ""), "pricelabs_id": l["id"], "pms": l.get("pms"),
                         **{k: _pct(l.get(k)) for k in (
                             "occupancy_next_7", "market_occupancy_next_7", "occupancy_next_30",
                             "market_occupancy_next_30", "occupancy_next_60", "market_occupancy_next_60")},
                         **{k: _num(l.get(k)) for k in (
                             "adr_past_30", "stly_adr_past_30", "booking_pickup_past_30", "adr_ytd",
                             "stly_adr_ytd", "adr_next_360", "stly_adr_next_360")},
                         "fully_blocked_next_360": l.get("adr_next_360") == "Fully Blocked"})
        snapshot.save("listings", listings, day)
        snapshot.save("pl_kpis", kpis, day)
        written["listings"] = len(listings)

    prices = []
    for p in sorted(raw.glob("prices_*.json")):
        for l in _load(p):
            ref = refs.get(str(l["id"]), "")
            for d in l.get("data", []):
                status = d.get("booking_status") or ""
                prices.append({"ref": ref, "pricelabs_id": l["id"], "date": d["date"],
                               "pricelabs_price": d.get("price"), "smoobu_price": "",
                               "available": d.get("user_price") != -1 and not d.get("unbookable"),
                               "min_stay": d.get("min_stay"), "booking_status": status,
                               "booked_price": d.get("booked_price") if status == "Booked" else "",
                               "booked_adr": d.get("ADR") if status == "Booked" and d.get("ADR", -1) > 0 else ""})
    if prices:
        snapshot.save("prices", prices, day)
        written["prices"] = len(prices)

    res, seen = [], set()
    for p in sorted(raw.glob("reservations_*.json")):
        for r in _load(p).get("data", []):
            if r["reservation_id"] in seen:
                continue
            seen.add(r["reservation_id"])
            res.append({"ref": refs_all.get(str(r["listing_id"]), ""), "pricelabs_id": r["listing_id"],
                        "channel": r.get("booking_channel", ""), "arrival": r["check_in"],
                        "departure": r["check_out"], "total_gbp": _num(r.get("rental_revenue")),
                        "cleaning_gbp": _num(r.get("cleaning_fees")), "commission_gbp": _num(r.get("ota_commission")),
                        "booked_on": (r.get("booked_date") or "")[:10],
                        "status": "cancelled" if r.get("cancelled_on") or r.get("booking_status") == "cancelled"
                        else "confirmed"})
    if res:
        snapshot.save("reservations", res, day)
        written["reservations"] = len(res)
    return written
