"""Turn one snapshot into the KPI pack every agent works from.

No value is estimated: a KPI whose inputs are missing is reported as None and
listed under `missing`, so agents and readers can see exactly what is unknown.
"""
import json
from datetime import date, timedelta

from . import audit, config, metrics, positioning, snapshot


def run(day=None):
    today = date.fromisoformat(day) if day else date.today()
    snap = snapshot.load(today.isoformat())
    prices, res, market = snap["prices"], snap["reservations"], {m["ref"]: m for m in snap["market"]}
    # Settings come from the listing that prices each unit (id_map `pricelabs`), never from a duplicate copy
    import json as _j
    _map = _j.loads(config.ID_MAP_FILE.read_text()) if config.ID_MAP_FILE.exists() else {}
    _primary = {str(i) for r, v in _map.items() if not r.startswith("_") for i in v.get("pricelabs", [])}
    listings = {l["ref"]: l for l in snap["listings"] if l["ref"] and str(l.get("pricelabs_id")) in _primary}
    plk = {k["ref"]: k for k in snap["pl_kpis"] if k["ref"]}
    refs = [p["ref"] for p in config.PROPERTIES]
    missing = {name: "empty" for name, rows in snap.items() if not rows}

    last30 = metrics.performance(res, refs, today - timedelta(days=30), today)
    last365 = metrics.performance(res, refs, today - timedelta(days=365), today)
    # Refs whose bookings we actually hold (mapped to a Smoobu apartment). Others are unknown, never 0%.
    import json as _json
    _ids = _json.loads(config.ID_MAP_FILE.read_text()) if config.ID_MAP_FILE.exists() else {}
    res_refs = {r for r, v in _ids.items() if not r.startswith("_") and v.get("smoobu")}
    _unknown = {"nights": None, "revenue": None, "capacity": None, "occupancy": None, "adr": None, "revpar": None}
    for _r in refs:
        if _r not in res_refs:
            last30[_r], last365[_r] = dict(_unknown), dict(_unknown)
    if not res:  # no booking data is "unknown", never 0% occupancy
        unknown = {"nights": None, "revenue": None, "capacity": None, "occupancy": None, "adr": None, "revpar": None}
        last30 = {r: dict(unknown) for r in refs}
        last365 = {r: dict(unknown) for r in refs}
    sync = audit.pricelabs_vs_smoobu(prices)
    bnd = audit.bounds(prices, [l for l in snap["listings"] if str(l.get("pricelabs_id")) in _primary])
    parity = audit.channel_parity(prices, snap["channel_checks"])

    props = []
    for ref in refs:
        prop = config.BY_REF[ref]
        mk = dict(market.get(ref, {}))
        pk = plk.get(ref, {})
        # PriceLabs' own forward/market occupancy (same source both sides) when there is no market.csv row
        mk.setdefault("market_occ_30", pk.get("market_occupancy_next_30"))
        mk.setdefault("market_occ_60", pk.get("market_occupancy_next_60"))
        fwd30 = metrics.forward_occupancy(prices, ref, today, 30)
        fwd60 = metrics.forward_occupancy(prices, ref, today, 60)
        blocked30 = metrics.blocked_share(prices, ref, today, 30)
        next30 = [p for p in prices if p["ref"] == ref and p.get("available")
                  and today <= date.fromisoformat(p["date"]) < today + timedelta(days=30)]
        our_price = (round(sum(p.get("smoobu_price") or p.get("pricelabs_price") or 0 for p in next30)
                           / len(next30), 2) if next30 else None)
        comp = positioning.comp_summary(snap["comps"], ref, our_price)
        pct = comp["our_percentile"] if comp else positioning.percentile_rank(
            our_price, [mk.get("p25"), mk.get("p50"), mk.get("p75"), mk.get("p90")])
        l = listings.get(ref, {})
        quality = positioning.quality_premium(l.get("rating_airbnb"), comp and comp.get("median_rating"))
        action, move, reason = positioning.recommend(fwd30, mk.get("market_occ_30"), pct, quality)
        props.append({
            "ref": ref, "area": prop["area"], "type": prop["type"],
            "last30": last30[ref], "last365": last365[ref],
            # MPI on the same window both sides: our booked share vs market, next 30 days
            "indices_30": metrics.market_indices(fwd30, last30[ref]["adr"],
                                                 mk.get("market_occ_30"), mk.get("market_adr_30")),
            "blocked_next_30": blocked30,
            "pricelabs_occ_next_30_incl_blocks": pk.get("occupancy_next_30"),
            "forward_occ_30": fwd30, "forward_occ_60": fwd60,
            "market_occ_30": mk.get("market_occ_30"), "market_occ_60": mk.get("market_occ_60"),
            "market_percentiles": {k: mk.get(k) for k in ("p25", "p50", "p75", "p90")},
            "avg_open_price_next30": our_price, "price_percentile": pct, "comps": comp,
            "pace_30": metrics.pace_vs_stly(res, ref, today, 30) if res and ref in res_refs else {"revenue_delta_pct": None},
            "pace_90": metrics.pace_vs_stly(res, ref, today, 90) if res and ref in res_refs else {"revenue_delta_pct": None},
            "pickup_7d": metrics.pickup(res, ref, today, 7) if res and ref in res_refs else None,
            "booking_profile": metrics.booking_profile(res, ref),
            "gaps": metrics.gaps(prices, ref),
            "sync_issues": sync.get(ref, []) if prices else None, "bounds": bnd.get(ref),
            "parity_flags": [p for p in parity if p["ref"] == ref and p["flag"]],
            "pricelabs": {k: pk.get(k) for k in ("adr_past_30", "stly_adr_past_30", "booking_pickup_past_30",
                                                   "adr_ytd", "stly_adr_ytd", "fully_blocked_next_360")} if pk else None,
            "settings": {k: l.get(k) for k in ("pl_min", "pl_base", "pl_max", "recommended_base", "sync_on",
                                               "last_push")} if l else None,
            "rate_leak_next_30": audit.rate_leak(prices, ref, today, 30),
            "recommendation": {"action": action, "price_move": move, "reason": reason},
        })

    pf = (lambda perf: metrics.portfolio(perf) if res else
          {"nights": None, "revenue": None, "occupancy": None, "adr": None, "revpar": None})
    pack = {"date": today.isoformat(), "portfolio_last30": pf(last30),
            "portfolio_last365": pf(last365),
            "channel_economics": audit.channel_economics(), "properties": props,
            "missing": missing,
            "data_sources": {"prices": "PriceLabs listing_prices + Smoobu rates",
                             "reservations": "Smoobu reservations (all channels)",
                             "market": "see market.csv source column",
                             "comps": "see comps.csv source column (dated OTA checks)",
                             "occupancy_note": ("Our forward occupancy counts Booked nights only (PriceLabs booking_status); "
                                                "blocked nights are reported separately. PriceLabs market occupancy comes from "
                                                "scraped calendars and may count other hosts' blocked nights, so MPI is conservative. "
                                                "Last-30 occupancy/ADR/RevPAR come from Smoobu bookings (basePrice, before cleaning "
                                                "and commission) and exist only for properties mapped to a Smoobu apartment.")}}
    out = config.REPORTS / today.isoformat()
    out.mkdir(parents=True, exist_ok=True)
    (out / "kpi_pack.json").write_text(json.dumps(pack, indent=1, default=str))
    (out / "kpi_summary.md").write_text(render(pack))
    return out


def _f(v, pct=False, gbp=False):
    if v is None:
        return "—"
    if pct:
        return f"{v:.0%}"
    return f"£{v:,.0f}" if gbp else f"{v}"


def render(pack):
    pf = pack["portfolio_last30"]
    lines = [f"# KPI summary — {pack['date']}", "",
             f"Portfolio, last 30 nights: occupancy {_f(pf['occupancy'], pct=True)} · ADR {_f(pf['adr'], gbp=True)}"
             f" · RevPAR {_f(pf['revpar'], gbp=True)} · revenue {_f(pf['revenue'], gbp=True)}", "",
             "| Ref | Area | Occ last 30 | ADR last 30 | RevPAR last 30 | MPI next 30 | ARI | RGI | Booked next 30 | Mkt next 30 | Price pct | "
             "Pace 30 vs STLY | Sync issues | At min | Action |",
             "|" + "---|" * 15]
    for p in pack["properties"]:
        l30, ix, pc = p["last30"], p["indices_30"], p["pace_30"]
        b = p["bounds"] or {}
        lines.append(" | ".join([
            f"| {p['ref']}", p["area"], _f(l30["occupancy"], pct=True), _f(l30["adr"], gbp=True),
            _f(l30["revpar"], gbp=True), _f(ix["mpi"]), _f(ix["ari"]), _f(ix["rgi"]),
            _f(p["forward_occ_30"], pct=True), _f(p["market_occ_30"], pct=True), _f(p["price_percentile"], pct=True),
            _f(pc["revenue_delta_pct"], pct=True),
            "—" if p["sync_issues"] is None else str(len(p["sync_issues"])), _f(b.get("at_min_share"), pct=True),
            f"{p['recommendation']['action']}"
            + (f" {p['recommendation']['price_move']:+.0%}" if p['recommendation']['price_move'] is not None else "") + " |"]))
    if pack["missing"]:
        lines += ["", "## Missing data (KPIs depending on it show —)", ""]
        lines += [f"- `{k}.csv`: {v}" for k, v in pack["missing"].items()]
    return "\n".join(lines) + "\n"
