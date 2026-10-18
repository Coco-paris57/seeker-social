"""Where each property sits against its competitors, and what price move that implies.

The rule: price follows demand evidence. Ahead of the market on bookings means we
are leaving money on the table; behind the market while already cheap means the
problem is the listing (photos, reviews, ranking), not the price.
"""
from statistics import median


def percentile_rank(value, sample):
    sample = [s for s in sample if s]
    if not sample or value is None:
        return None
    return round(sum(1 for s in sample if s < value) / len(sample), 2)


def comp_summary(comps, ref, our_price):
    rows = [c for c in comps if c["ref"] == ref and c.get("nightly_gbp")]
    if not rows:
        return None
    prices = [c["nightly_gbp"] for c in rows]
    ratings = [c["rating"] for c in rows if c.get("rating")]
    return {"n": len(rows), "median_price": median(prices), "min": min(prices), "max": max(prices),
            "our_price": our_price, "our_percentile": percentile_rank(our_price, prices),
            "median_rating": median(ratings) if ratings else None,
            "premium_vs_median": round(our_price / median(prices) - 1, 3) if our_price else None}


def quality_premium(our_rating, comp_rating, scale=5.0):
    """Premium (or discount) the listing quality justifies vs comps: ~4% per 0.1 star on a 5 scale."""
    if not our_rating or not comp_rating:
        return 0.0
    diff = (our_rating - comp_rating) / (scale / 5.0)
    return round(max(-0.15, min(0.15, diff * 0.4)), 3)


def recommend(our_occ, market_occ, our_percentile, quality=0.0):
    """Return (action, price_move, reason) for one property and horizon."""
    if our_occ is None or market_occ is None:
        return ("collect-data", 0.0, "missing occupancy or market data")
    lead = our_occ - market_occ
    pct = our_percentile if our_percentile is not None else 0.5
    if lead >= 0.10 and pct < 0.75:
        return ("raise", round(0.10 + max(quality, 0), 3),
                f"booked {lead:+.0%} vs market but priced at P{pct * 100:.0f}: under-priced")
    if lead >= 0.10:
        return ("raise", 0.05, f"booked {lead:+.0%} vs market at P{pct * 100:.0f}: test a further step up")
    if lead >= -0.05:
        if pct < 0.5 + quality:
            return ("raise", 0.05, f"in line with market but priced below what quality supports (P{pct * 100:.0f})")
        return ("hold", 0.0, f"in line with market at P{pct * 100:.0f}")
    if pct > 0.75:
        return ("lower", -0.07, f"behind market {lead:+.0%} at P{pct * 100:.0f}: priced above demand")
    return ("fix-listing", 0.0,
            f"behind market {lead:+.0%} while already at P{pct * 100:.0f}: conversion/visibility problem, not price")
