"""Checks that the price PriceLabs decides is the price every guest actually sees."""
from collections import defaultdict

from . import config


def pricelabs_vs_smoobu(prices, tol=config.SYNC_TOLERANCE_GBP):
    """Dates where the Smoobu rate differs from the PriceLabs price (sync failure or override)."""
    issues = defaultdict(list)
    for p in prices:
        pl, sm = p.get("pricelabs_price"), p.get("smoobu_price")
        if p.get("available") and pl and sm and abs(pl - sm) > tol:
            issues[p["ref"]].append({"date": p["date"], "pricelabs": pl, "smoobu": sm,
                                     "gap_gbp": round(sm - pl, 2)})
    return dict(issues)


def bounds(prices, listings):
    """How often PriceLabs is pinned to the min or max: a sign the settings, not the market, set the price."""
    lim = {l["ref"]: l for l in listings}
    out = {}
    for ref in {p["ref"] for p in prices}:
        rows = [p for p in prices if p["ref"] == ref and p.get("available") and p.get("pricelabs_price")]
        prop = config.BY_REF.get(ref, {})
        lo = (lim.get(ref) or {}).get("pl_min") or prop.get("pl_min")
        hi = (lim.get(ref) or {}).get("pl_max") or prop.get("pl_max")
        if not rows or not lo or not hi:
            continue
        at_min = sum(1 for p in rows if p["pricelabs_price"] <= lo + 0.5)
        at_max = sum(1 for p in rows if p["pricelabs_price"] >= hi - 0.5)
        out[ref] = {"open_nights": len(rows), "at_min_share": round(at_min / len(rows), 3),
                    "at_max_share": round(at_max / len(rows), 3), "min": lo, "max": hi}
    return out


def expected_channel_price(base, channel):
    c = config.CHANNELS[channel]
    return round(base * (1 + c["markup"]) * (1 - c["discount"]), 2)


def net_to_owner(base, channel):
    c = config.CHANNELS[channel]
    return round(expected_channel_price(base, channel) * (1 - c["commission"]), 2)


def channel_parity(prices, checks, tol=config.PARITY_TOLERANCE):
    """Compare spot-checked OTA prices with what the Smoobu rate + channel rules should produce."""
    rate = {(p["ref"], p["date"]): p.get("smoobu_price") or p.get("pricelabs_price") for p in prices}
    out = []
    for c in checks:
        base = rate.get((c["ref"], c["date"]))
        if not base or not c.get("displayed_nightly_gbp") or c["channel"] not in config.CHANNELS:
            continue
        exp = expected_channel_price(base, c["channel"])
        gap = (c["displayed_nightly_gbp"] - exp) / exp
        out.append({**c, "base_rate": base, "expected": exp, "gap_pct": round(gap, 3),
                    "flag": abs(gap) > tol})
    return out


def channel_economics(base=100.0):
    """Guest price and owner net per channel for a 100 base rate: direct must stay cheapest to the guest."""
    rows = {ch: {"guest_price": expected_channel_price(base, ch), "net": net_to_owner(base, ch)}
            for ch in config.CHANNELS}
    warnings = []
    direct = rows["direct"]["guest_price"]
    for ch, r in rows.items():
        if ch != "direct" and r["guest_price"] < direct:
            warnings.append(f"{ch} guest price {r['guest_price']} is below direct {direct}")
        if r["net"] < rows["airbnb"]["net"] * 0.97 and ch != "airbnb":
            warnings.append(f"{ch} nets {r['net']} vs Airbnb {rows['airbnb']['net']} per 100 base")
    return {"per_100_base": rows, "warnings": warnings}
