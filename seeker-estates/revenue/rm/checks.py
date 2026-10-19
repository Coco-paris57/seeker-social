"""Per-property health check: one list of named checks with a status, built only from the KPI pack.

Status: ok, warn, bad, info (info = a known, intentional situation per data/policy.json).
"""
from datetime import date, timedelta

from . import config

LOS_BANDS = ((28, "monthly_28_plus_nights"), (7, "weekly_7_plus_nights"))


def los_discount(nights, pol):
    d = pol.get("length_of_stay_discounts", {})
    for min_n, key in LOS_BANDS:
        if nights >= min_n:
            return d.get(key, 0.0)
    return 0.0


def link_bookings(prices, reservations):
    """Mark nights covered by a confirmed reservation of the same unit as Booked.

    Needed for units listed twice (one listing shows the other's bookings as Blocked)."""
    cover = {}
    for r in reservations:
        if r.get("status") == "cancelled" or not r.get("arrival"):
            continue
        a, b = date.fromisoformat(r["arrival"][:10]), date.fromisoformat(r["departure"][:10])
        n = (b - a).days
        for i in range(n):
            cover[(r["ref"], (a + timedelta(days=i)).isoformat())] = n
    for p in prices:
        n = cover.get((p["ref"], p["date"]))
        if n is not None:
            p["los"] = n
            if not str(p.get("booking_status", "")).startswith("Booked"):
                p["booking_status"] = "Booked (linked listing)"
                p["available"] = False
    return prices


def rate_leak_after_los(prices, ref, today, pol, horizon=30):
    """Booked ADR vs PriceLabs price after the agreed weekly/monthly discount, on nights whose stay length is known."""
    end = today + timedelta(days=horizon)
    rows = [p for p in prices if p["ref"] == ref and p.get("booked_adr") and p.get("booked_price") and p.get("los")
            and today <= date.fromisoformat(p["date"]) < end]
    if not rows:
        return None
    adr = sum(p["booked_adr"] for p in rows) / len(rows)
    expected = sum(p["booked_price"] * (1 - los_discount(p["los"], pol)) for p in rows) / len(rows)
    return {"nights": len(rows), "avg_booked_adr": round(adr, 2), "avg_expected_after_los": round(expected, 2),
            "gap_pct": round(adr / expected - 1, 3)}


def build(p, pol):
    """p = one property entry of the KPI pack."""
    ref = p["ref"]
    out = []
    add = lambda name, status, detail: out.append({"name": name, "status": status, "detail": detail})
    blocked_ok = ref in pol.get("intentional_blocks", {}).get("refs", [])
    special = pol.get("special_setups", {}).get(ref)
    s = p.get("settings") or {}

    if not s:
        add("In PriceLabs", "bad", "No priced PriceLabs listing mapped")
        return out
    # The run starts early, before PriceLabs' daily push: a push dated the previous day is fresh.
    from datetime import date as _d
    lp = (s.get("last_push") or "")[:10]
    stale = not lp or (_d.fromisoformat(p["_date"]) - _d.fromisoformat(lp)).days > 1
    add("Prices pushed in the last day", "ok" if s.get("sync_on") and not stale else "bad",
        f"Push {'on' if s.get('sync_on') else 'OFF'}, last push {s.get('last_push') or 'never'}")
    sync = p.get("sync_issues")
    if not p.get("price_nights_next_30"):
        add("PriceLabs = Smoobu price", "info", "Not checked (no PriceLabs prices pulled for this unit yet)")
    elif sync is None or not p.get("in_smoobu"):
        add("PriceLabs = Smoobu price", "info", "Not checked (not priced through Smoobu)")
    else:
        add("PriceLabs = Smoobu price", "ok" if not sync else "bad",
            "No open night differs by more than £2" if not sync else f"{len(sync)} nights differ by more than £2")
    b = p.get("bounds") or {}
    if b.get("at_min_share") is not None:
        st = "info" if special else ("bad" if b["at_min_share"] > 0.2 else "ok")
        add("Not stuck at minimum price", st,
            f"{b['at_min_share']:.0%} of open nights at the £{b['min']:.0f} minimum" + (" (special setup)" if special else ""))
    blocked = p.get("blocked_next_30")
    fwd, mkt = p.get("forward_occ_30"), p.get("market_occ_30")
    closed = p.get("pricelabs_occ_next_30_incl_blocks")
    if fwd is None and closed:  # unavailable without a Booked/Blocked label (e.g. Channex)
        blocked = round(closed, 3)
    if fwd is None and closed and not blocked_ok:
        add("Calendar open", "info", f"{closed:.0%} of next 30 nights unavailable (booked or blocked; no night-level detail yet)")
    elif blocked_ok and blocked:
        add("Calendar open", "info", f"{blocked:.0%} of next 30 nights closed on purpose")
    elif blocked:
        add("Calendar open", "warn", f"{blocked:.0%} of next 30 nights blocked (reason unknown)")
    else:
        add("Calendar open", "ok", "No blocked nights in the next 30")
    ex = p.get("forward_occ_30_ex_blocks")
    if blocked_ok and blocked and ex is not None and mkt is not None:
        gap = ex - mkt
        add("Booked vs market (next 30)", "ok" if gap >= -0.05 else "warn" if gap >= -0.2 else "bad",
            f"{ex:.0%} of the nights left open are booked vs {mkt:.0%} market (blocked nights excluded)")
    elif fwd is None or mkt is None:
        add("Booked vs market (next 30)", "info", "Unknown")
    else:
        gap = fwd - mkt
        st = "info" if (special or (blocked_ok and blocked and blocked > 0.5)) else ("ok" if gap >= -0.05 else "warn" if gap >= -0.2 else "bad")
        add("Booked vs market (next 30)", st, f"{fwd:.0%} booked vs {mkt:.0%} market")
    leak = p.get("rate_leak_after_los")
    if leak:
        st = "ok" if leak["gap_pct"] >= -0.05 else "warn" if leak["gap_pct"] >= -0.15 else "bad"
        add("Paid rate vs price (after 15%/20% stay discounts)", st,
            f"£{leak['avg_booked_adr']:.0f} paid vs £{leak['avg_expected_after_los']:.0f} expected on {leak['nights']} nights "
            f"({leak['gap_pct']:+.0%}; expected uses today's PriceLabs price, which may have risen since the booking)")
    else:
        add("Paid rate vs price (after 15%/20% stay discounts)", "info", "No booked nights with known stay length in the next 30")
    rec = p.get("recommendation") or {}
    add("Price signal", "info" if special or blocked_ok or rec.get("action") == "collect-data" else "ok", rec.get("reason", "—"))
    return out
