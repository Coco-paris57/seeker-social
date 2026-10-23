# Competitor positioning: WEST + HERTS (D = 2026-10-23)

**Sources.** `data/policy.json` read first. Read-only PriceLabs calls on 2026-10-23, one at a time:
- `get_neighbourhood_data` 3064856 (detail mode, prices + occupancy + competitors) -> `data/snapshots/2026-10-23/raw/neighbourhood_P13.json`; 3318177 (summary mode) -> `raw/neighbourhood_P10.json` (summary_table excerpt).
- `get_neighborhood_data_sources` 3064856: NL available; **MD unavailable ("No Market Dashboard reports available"); CCC unavailable ("Competitor Listings source is not enabled for this account")**.
- `get_customizations` (listing) and `get_listing_date_overrides` (23 Oct-31 Dec) for both 3064856 and 3090701; `get_listings` search for P16/P18/P19 (0 results).
- Our prices: `data/snapshots/2026-10-23/raw/prices_3064856.json` and `prices_3090701.json` (both last_refreshed_at 2026-10-22T08:24Z); `prices.csv` (Smoobu = PriceLabs on every P13 night; prices.csv carries 3064856 only).

**Live OTA pages: NOT CHECKED.** airbnb.co.uk and booking.com are refused by the egress proxy (CONNECT 403, `__agentproxy/status`). So **0 comp rows written to comps.csv**: there is no comp with a sourced price, rating or review count. Every benchmark below is a **PriceLabs Nearby Listings (NL) percentile, labelled as such, not a comp median**. NL prices are Airbnb-derived, host-only fee, cleaning excluded, tax 0; our PriceLabs price also excludes cleaning. `quality_premium` = 0.0 (no comp rating; our ratings empty in listings.csv).

**Stay dates priced (same for market and us):** Tue 27-Thu 29 Oct (midweek), Fri 30 Oct-Sun 1 Nov (next weekend), Sun 22-Tue 24 Nov (D+30; 2-night min).

**Method (unchanged).** Position = linear interpolation between P25/P50/P75/P90 (below P25 extrapolated on the P25-P50 slope). Next 30 = 24 Oct-22 Nov; nights 31-60 = 23 Nov-22 Dec. Nights blocked on one P13 listing because the twin is booked count as booked (policy).

## P02 Notting Hill, P03 Bayswater
Blocked on purpose (policy). 0 sellable nights in the next 60 (`prices.csv`: P02 4 booked, 55 blocked, 1 closed; P03 60 closed). No positioning.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat)
NL 2BR summary n=118: **P25 203 / P50 243 / P75 307 / P90 372** (22 Oct: 201/244/302/373, n=116). P50 -0.4%.

| Stay | Nights | NL daily 2-3BR band n=152: P25/P50/P75/P90 (not comps) | Band market occ % | 3064856 | 3090701 | Our position |
|---|---|---|---|---|---|---|
| Tue 27-Thu 29 Oct | 27, 28 Oct | 209/247/315/383; 209/248/316/373 | 57.0; 56.5 | 156, 161 twin-booked | 173, 179 booked | sold (not priced) |
| Fri 30 Oct-Sun 1 Nov | 30, 31 Oct | 203/252/318/377; 206/246/326/372 | 52.9; 43.6 | 172 twin-booked; **191 open** | 191 booked; 212 open | stay not sellable whole (30 Oct sold); 31 Oct £191 = about **P16** of the day band |
| Sun 22-Tue 24 Nov (D+30) | 22, 23 Nov | 206/241/301/387; 208/244/296/386 | 25.1; 21.2 | **216, 217 open** | **216, 217 open** | about **P32** (avg £216.5 vs day P50 £242.5: -10.7%) |

Daily band occupancy for 22-23 Nov is 11-14 pts below last year same time (`market_occupancy_change` -11.1 / -14.0); 27-31 Oct is 0-9 pts above.

| Horizon | Booked (combined) | Market occ | Avg open price (3064856) | vs 2BR P50 | Position | `recommend` (q = 0) |
|---|---|---|---|---|---|---|
| Next 30, 24 Oct-22 Nov | 13/30 = 43.3% (pl_kpis 50% vs mkt 40%) | 36.1% band avg; 40% pl_kpis | **£198.2 on 17 nights** | **-18.4%** | **P22** (22 Oct: £200.8, P24.9) | raise +5% ("in line with market but priced below what quality supports (P22)") on both sources |
| Open nights within 14 days (25-26 Oct, 31 Oct-3 Nov) | 8/14 booked | 45.2% band | £174.8 | -28.1% | P7 | raise +10% ("booked +12% vs market but priced at P7: under-priced") |
| Nights 31-60, 23 Nov-22 Dec | 8/30 = 26.7% | 29.3% band avg; 35% pl_kpis 60-day | £241.5 on 22 nights (incl. 1 Dec £343) | -0.6% | P49 | raise +5% ("...below what quality supports (P49)") |

Note on the boundary: pl_kpis next-30 lead is exactly +10 pts (0.50 vs 0.40), but in floating point 0.5-0.4 < 0.10 so `recommend` returns the "in line" branch (+5%), not the "under-priced" branch (+10%). The +5% is the conservative reading.

**Supported positioning: about -13% vs NL 2BR P50 for the next 30 (from -18%; i.e. +5% on open nights, about £208 average, about P28); hold at about median (P49) for nights 31-60.** One line: we are booked 7-10 pts ahead of the market at P22, and the within-14-days nights sit at P7 even before the Airbnb last-minute rule, so a +5% step is supported; +10% (rule output for the near nights) is not taken yet because no booking has been made since the 21 Oct channel changes, so the price response is still unobserved. No comp quality evidence either way (q = 0).

**P13 twin check, 22 Nov-21 Dec (asked by caller).** Both files pulled today (raw/prices_3064856.json, raw/prices_3090701.json, both refreshed 2026-10-22 08:24Z):
- **Still identical on all 30 nights**: `price`, `user_price` and `booked_price` equal on every date, min-stay equal; 22 open nights identical (e.g. 22 Nov 216/216, 1 Dec 343/343, 21 Dec 257/257, user_price 272/272). Identical also on 22 Dec (279/279).
- Before 22 Nov the gap is a clean step: **+11.1% on 24 Oct-6 Nov** (open nights +11.1%), **+5.6% on 7-21 Nov** (open nights +5.6%), **0.0% from 22 Nov**. Next-30 open-night gap +6.9% (22 Oct: +7.0%).
- Cause, checked: customizations are identical on both (same seasonality, last-minute -40% gradual within 14 days, far-out +5% after 45 days, demand factor, occupancy-based adjustment profile); date overrides are identical date by date (-1% to -3% fills, +10% on the 11 nights, 1 Dec +50% min 1); base 235 on both (listings.csv). The step boundaries fall on days 0-14 / 15-29 / 30+, matching the occupancy-based adjustment windows (0-15, 16-30, 31-60), and the gap shows in `uncustomized_price` (e.g. 24 Oct 150 vs 182). **Inference, not confirmed:** PriceLabs reads different own-occupancy or algorithm inputs per twin for the near windows and the same from day 30, so beyond D+30 nothing keeps them apart.
- Policy says the two Airbnb listings must keep slightly different prices (narrow the gap, never identical). PriceLabs has them identical for 22 Nov-21 Dec. Whether Airbnb shows identical guest prices also depends on the Smoobu Airbnb rules, which were set the same on both on 21 Oct (policy); **Airbnb display NOT CHECKED**. As the window rolls, every night that passes D+30 joins the identical block.

**Changes since 22 Oct**
- No new P13 booking or cancellation (dispatcher). No PriceLabs setting change found: overrides last updated 20 Oct 09:30Z; customizations unchanged.
- Algorithm drift after the 22 Oct 08:24Z refresh: near open nights down a further £5-7 (31 Oct 197 -> 191, 1 Nov 179 -> 174, 2 Nov 208 -> 201, 3 Nov 193 -> 189). Next-30 position P24.9 -> P22.
- `user_price` now differs from `price` again on 3064856 near nights (31 Oct price 191, user_price 197; 25 Oct 144 vs 153); `prices.csv` smoobu_price = `price` (191). Yesterday they were equal on 3064856.
- PriceLabs stores 9 Airbnb ids in `ccc_value` for 3064856 (4 listed in `not_available_ccc_listings`), but CCC is "not enabled for this account", so no prices, bedrooms or ratings are available for them. Not used as comps (cannot verify bedrooms/sleeps/reviews or price without OTA access). Ids are in raw/neighbourhood_P13.json for a later OTA check.
- Differentiators (cannot price without comp data): top-floor large private terrace, lift to 3rd floor, Booking.com 8.4 (15 reviews) and Airbnb 4.63 (8 reviews) on one twin (policy, earlier sections).

## P10 Hanger Lane, 1-bed sleeps 4 (3318177)
NL 1BR summary n=122: **P25 113 / P50 133 / P75 160 / P90 194** (22 Oct: 113/132/160/194).
- **0 sellable nights before handback** (last night 18 Nov, policy): 26 nights booked (Airbnb stay to 19 Nov), 34 blocked = handback block. No positioning; nothing proposed after 18 Nov. pl_kpis 100% booked next 30 vs market 31% rests on one long stay; `recommend` not applied.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in this PriceLabs account (`get_listings` search returned 0) and not in Smoobu. **NOT CHECKED**: no percentiles, prices or positioning.

## Data gaps:
1. Live OTA prices: NOT CHECKED (proxy refuses airbnb.co.uk and booking.com). 0 comps, 0 comps.csv rows; no comp median, comp rating, review-count gap, Superhost or cancellation comparison.
2. PriceLabs CCC not enabled and no Market Dashboard: NL percentiles only. 9 stored CCC Airbnb ids for P13 are unverified.
3. Our ratings and review counts are empty in listings.csv; quality_premium = 0.
4. NL summary_table horizon unstated; daily bands are 2-3BR (n=152), not bedroom-matched. Positions are interpolated.
5. P13 market occupancy source differs (36.1% band vs 40% pl_kpis for next 30); the kpi lead sits exactly on the +10 pt `recommend` boundary.
6. P13 twins identical in PriceLabs 22 Nov-21 Dec; cause inferred (occupancy-window step), not confirmed with PriceLabs; Airbnb guest display not checked.
7. P13 twin mapping (Airbnb listing to Smoobu id) still "likely", unconfirmed (policy).
8. 3064856 `user_price` differs from `price` on near nights; which one each channel shows is unverified.
9. P13 Vrbo listing 12037152 not analysed.
10. P16, P18, P19: not in PriceLabs or Smoobu.
11. comps.csv for 2026-10-23 not created (no rows). market.csv: P13 and P10 rows appended after the existing P01/P04/P09/P12/P20 rows.
