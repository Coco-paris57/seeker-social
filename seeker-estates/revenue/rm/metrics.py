"""Occupancy, ADR, RevPAR, pace and gap detection from a snapshot."""
from collections import defaultdict
from datetime import date, timedelta


def _d(s):
    return date.fromisoformat(s[:10])


def nights_in_window(res, start, end):
    """Nights and revenue of one reservation that fall in [start, end)."""
    a, b = _d(res["arrival"]), _d(res["departure"])
    total_n = max((b - a).days, 1)
    lo, hi = max(a, start), min(b, end)
    n = max((hi - lo).days, 0)
    return n, (res["total_gbp"] or 0) * n / total_n


def performance(reservations, refs, start, end, blocked=None):
    """Per-ref occupancy, ADR and RevPAR over [start, end).

    blocked: {ref: nights unavailable for owner use / maintenance} removed from capacity.
    """
    days = (end - start).days
    out = {}
    for ref in refs:
        n = rev = 0
        for r in reservations:
            if r["ref"] == ref and r.get("status") != "cancelled":
                rn, rr = nights_in_window(r, start, end)
                n += rn
                rev += rr
        cap = max(days - (blocked or {}).get(ref, 0), 1)
        out[ref] = {"nights": n, "revenue": round(rev, 2), "capacity": cap,
                    "occupancy": round(n / cap, 3),
                    "adr": round(rev / n, 2) if n else None,
                    "revpar": round(rev / cap, 2)}
    return out


def portfolio(perf):
    """Totals over properties whose figures are known (unknown ones are left out, not zeroed)."""
    perf = {k: v for k, v in perf.items() if v.get("nights") is not None}
    n = sum(p["nights"] for p in perf.values())
    rev = sum(p["revenue"] for p in perf.values())
    cap = sum(p["capacity"] for p in perf.values())
    return {"nights": n, "revenue": round(rev, 2), "occupancy": round(n / cap, 3) if cap else 0,
            "adr": round(rev / n, 2) if n else None, "revpar": round(rev / cap, 2) if cap else 0}


def booking_profile(reservations, ref=None):
    """Lead time, length of stay and channel mix of confirmed bookings."""
    rows = [r for r in reservations if r.get("status") != "cancelled"
            and (ref is None or r["ref"] == ref) and r.get("booked_on")]
    if not rows:
        return {}
    leads = sorted((_d(r["arrival"]) - _d(r["booked_on"])).days for r in rows)
    los = sorted((_d(r["departure"]) - _d(r["arrival"])).days for r in rows)
    mix = defaultdict(float)
    for r in rows:
        mix[r["channel"] or "unknown"] += r["total_gbp"] or 0
    tot = sum(mix.values()) or 1
    return {"bookings": len(rows), "median_lead_days": leads[len(leads) // 2],
            "median_los": los[len(los) // 2],
            "channel_revenue_share": {k: round(v / tot, 3) for k, v in sorted(mix.items(), key=lambda x: -x[1])}}


def gaps(prices, ref, min_default=2):
    """Runs of available nights shorter than the min stay in force (orphan nights)."""
    rows = sorted((p for p in prices if p["ref"] == ref), key=lambda p: p["date"])
    out, run = [], []
    for p in rows + [{"available": False, "date": None}]:
        if p.get("available"):
            run.append(p)
            continue
        if run:
            need = int(run[0].get("min_stay") or min_default)
            # only a gap if booked on both sides (not the open end of the calendar)
            if len(run) < need and p["date"] is not None and run[0] is not rows[0]:
                out.append({"from": run[0]["date"], "nights": len(run), "min_stay": need})
            run = []
    return out


def forward_occupancy(prices, ref, today, horizon, booked_only=True):
    """Share of the next `horizon` nights that are booked.

    PriceLabs marks nights Booked, Booked (Check-In) or Blocked. Blocked nights (owner use,
    maintenance, long lets handled outside the channels) are not demand, so by default only
    Booked* nights count. booked_only=False returns the share unavailable for any reason.
    """
    end = today + timedelta(days=horizon)
    rows = [p for p in prices if p["ref"] == ref and today <= _d(p["date"]) < end]
    if not rows:
        return None
    if booked_only:
        unlabelled = sum(1 for p in rows if not p.get("available") and not p.get("booking_status"))
        if unlabelled > len(rows) / 2:  # unavailable without a Booked/Blocked label: can't tell demand from blocks
            return None
        return round(sum(1 for p in rows if str(p.get("booking_status", "")).startswith("Booked")) / len(rows), 3)
    return round(sum(1 for p in rows if not p.get("available")) / len(rows), 3)


def blocked_share(prices, ref, today, horizon):
    end = today + timedelta(days=horizon)
    rows = [p for p in prices if p["ref"] == ref and today <= _d(p["date"]) < end]
    if not rows:
        return None
    return round(sum(1 for p in rows if p.get("booking_status") == "Blocked") / len(rows), 3)


def on_the_books(reservations, ref, stay_start, stay_end, as_of):
    """Nights and revenue for stays in [stay_start, stay_end) that were booked on or before `as_of`."""
    n = rev = 0
    for r in reservations:
        if r["ref"] != ref or r.get("status") == "cancelled" or not r.get("booked_on"):
            continue
        if _d(r["booked_on"]) <= as_of:
            rn, rr = nights_in_window(r, stay_start, stay_end)
            n += rn
            rev += rr
    return {"nights": n, "revenue": round(rev, 2)}


def pace_vs_stly(reservations, ref, today, horizon=30):
    """On-the-books for the next `horizon` days vs the same window last year as it stood a year ago.

    Cancelled bookings are excluded on both sides, so a booking made last year and
    cancelled later understates STLY slightly; the report flags that limitation.
    """
    start, end = today, today + timedelta(days=horizon)
    ly = lambda d: d.replace(year=d.year - 1) if not (d.month == 2 and d.day == 29) else d - timedelta(days=366)
    now = on_the_books(reservations, ref, start, end, today)
    stly = on_the_books(reservations, ref, ly(start), ly(end), ly(today))
    return {"otb_nights": now["nights"], "otb_revenue": now["revenue"],
            "stly_nights": stly["nights"], "stly_revenue": stly["revenue"],
            "nights_delta": now["nights"] - stly["nights"],
            "revenue_delta_pct": round(now["revenue"] / stly["revenue"] - 1, 3) if stly["revenue"] else None}


def pickup(reservations, ref, today, days=7):
    """Nights and revenue booked in the last `days` days, for any future stay."""
    since = today - timedelta(days=days)
    rows = [r for r in reservations if r["ref"] == ref and r.get("status") != "cancelled"
            and r.get("booked_on") and since < _d(r["booked_on"]) <= today]
    nights = sum((_d(r["departure"]) - _d(r["arrival"])).days for r in rows)
    return {"bookings": len(rows), "nights": nights, "revenue": round(sum(r["total_gbp"] or 0 for r in rows), 2)}


def market_indices(our_occ, our_adr, market_occ, market_adr):
    """MPI (occupancy index), ARI (ADR index), RGI (RevPAR index). 1.00 = fair share; RGI > 1 beats the comp set."""
    mpi = round(our_occ / market_occ, 2) if our_occ is not None and market_occ else None
    ari = round(our_adr / market_adr, 2) if our_adr and market_adr else None
    rgi = round(mpi * ari, 2) if mpi is not None and ari is not None else None
    return {"mpi": mpi, "ari": ari, "rgi": rgi}
