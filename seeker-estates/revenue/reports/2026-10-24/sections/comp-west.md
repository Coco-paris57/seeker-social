# Competitor positioning: WEST + HERTS (D = 2026-10-24)

**Sources.** `data/policy.json` read first. Read-only PriceLabs calls on 2026-10-24, one at a time:
- `get_neighbourhood_data` 3064856 (detail mode, prices + future prices + occupancy) saved as `data/snapshots/2026-10-24/raw/neighbourhood_P13.json`; 3318177 (summary mode, numbers copied to market.csv).
- `get_listing_date_overrides` 24 Oct-31 Dec for 3064856 and 3090701; `get_user_logs` (listing, 3064856/3090701/3318177, 20-24 Oct); `get_listings` searches for P16/P18/P19 (0 results).
- Our prices: `raw/prices_3064856.json` and `raw/prices_3090701.json` (last_refreshed_at 2026-10-23T06:57Z); `prices.csv` (pricelabs_price = smoobu_price on every P13 night; carries 3064856 only); `pl_kpis.csv`.

**Live OTA pages: NOT CHECKED.** airbnb.co.uk and booking.com refused again (curl: CONNECT 403 `connect_rejected`; WebFetch: ENOTFOUND). **0 comp rows; comps.csv not created.** No comp median, comp rating or review-count gap exists. Every benchmark is a **PriceLabs Nearby Listings (NL) percentile, labelled, not a comp median**. CCC is still not enabled and no Market Dashboard is set (`market_dashboard_id` null). NL is Airbnb-derived, "Host-only fee", cleaning not included, tax 0; our PriceLabs price also excludes cleaning. `quality_premium` = 0.0 (no comp rating; our ratings empty in listings.csv).

**Stay dates (same for market and us):** Tue 27-Thu 29 Oct (midweek), Fri 30 Oct-Sun 1 Nov (next weekend), Mon 23-Wed 25 Nov (D+30).

**Method (unchanged).** Position = linear interpolation between P25/P50/P75/P90, extrapolated below P25. Next 30 = 25 Oct-23 Nov; nights 31-60 = 24 Nov-23 Dec. A night is counted booked if either P13 twin is booked or blocked (policy: one flat).

## P02 Notting Hill, P03 Bayswater
Blocked on purpose (policy). `prices.csv` next 60: P02 3 booked, 56 blocked, 1 closed; P03 60 closed. No positioning.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat)
NL 2BR summary n=117: **P25 204 / P50 244 / P75 302 / P90 367** (23 Oct: 203/243/307/372, n=118).

| Stay | Night | NL daily 2-3BR band n=151 P25/P50/P75/P90 (not comps) | Band occ % (vs LY pts) | 3064856 | 3090701 | Position |
|---|---|---|---|---|---|---|
| Tue 27-Thu 29 Oct | 27 Oct | 209/247/313/380 | 59.8 (+6.4) | 146 twin-booked | 162 booked | sold |
| | 28 Oct | 209/247/315/367 | 58.2 (+3.4) | 151 twin-booked | 168 booked | sold |
| Fri 30 Oct-Sun 1 Nov | 30 Oct | 203/251/319/375 | 52.6 (+6.2) | 164 twin-booked | 182 booked | sold |
| | 31 Oct | 203/248/328/372 | 44.0 (-1.3) | **183 open** | 203 open | stay not sellable whole; 31 Oct about P14 (3064856) / P25 (3090701) |
| Mon 23-Wed 25 Nov (D+30) | 23 Nov | 209/245/301/383 | 23.0 (-12.7) | **218 open** | **218 open** | about P31 |
| | 24 Nov | 209/251/311/388 | 19.3 (-11.1) | **206 open** | **206 open** | about P23 |

| Horizon | Booked (combined) | Market occ | Avg open price 3064856 / 3090701 | vs 2BR P50 | Position | `recommend` (q = 0) |
|---|---|---|---|---|---|---|
| Next 30, 25 Oct-23 Nov | 12/30 = 40.0% (pl_kpis 47% vs mkt 41%) | 35.2% band avg; 41% pl_kpis | **£195.7 / £208.9 on 18 nights** | -19.8% / -14.4% | **P20** / P28 (23 Oct: P22) | raise +5% ("in line with market but priced below what quality supports (P20)") on both occupancy sources |
| Within 14 days, 25 Oct-7 Nov | 8/14 booked | 42.9% band | £166.7 / £185.0 on 6 nights | -31.7% | P2 | lead +14 pts; rule output would be +10% |
| Nights 31-60, 24 Nov-23 Dec | 8/30 = 26.7% (pl_kpis 60-day 37% vs 36%) | 30.7% band | £240.2 / £240.2 on 22 nights (incl. 1 Dec £328) | -1.5% | P48 | raise +5% ("...below what quality supports (P48)") |

pl_kpis next-30 lead has narrowed from +10 pts (23 Oct: 50% vs 40%) to +6 pts (47% vs 41%), so the "in line" branch now applies on its own rather than on a floating-point boundary.

**Supported positioning: about -15% vs NL 2BR P50 for the next 30 (from -20%; +5% on open nights, about £205 average, about P26); hold near median (P48) for nights 31-60.** One line: we are booked 5-6 pts ahead of the market while priced at P20, and the within-14-days nights sit at P2 (before the Airbnb last-minute rule), so a +5% step is supported; +10% is not taken because no P13 booking has been made since the 21 Oct channel changes. No comp quality evidence either way (q = 0).

### P13 twin price gap re-check (3064856 vs 3090701)
- **New fact (get_user_logs, 20 Oct):** 3090701 is a **PriceLabs child listing of parent 3064856**. Every override Reyhan set on 3064856 on 20 Oct was logged on 3090701 as "Added Date Specific Override (Copied from parent listing)", `parent_listing_id` 3064856. Overrides are identical date by date on both (re-pulled today, last updated 20 Oct 09:30Z). No log entries 21-24 Oct for either twin or for P10.
- Gap by window in today's files (`price`): **+11.0% on 25 Oct-7 Nov** (e.g. 25 Oct 136 vs 151), **+5.6% on 8-22 Nov** (e.g. 8 Nov 216 vs 228), **0.0% from 23 Nov** on every night to 23 Dec (e.g. 23 Nov 218/218, 1 Dec 328/328, 21 Dec 250/250). The identical block now starts 23 Nov (22 Nov still differs on `price` 202/213; `user_price` equal 216/216). Next-30 open-night gap +6.8% (23 Oct: +6.9%).
- **Correction to yesterday's inference:** from 23 Nov `uncustomized_price` still differs (3064856 about 10% *higher*, e.g. 23 Nov 219 vs 198; 21 Dec 252 vs 228; same pattern in the 23 Oct file), yet the final `price` is equal. So the gap is not closing because the algorithm inputs converge; something after the algorithm sets both to the same value beyond about D+30. The parent-child link is the most likely cause (inference, not confirmed with PriceLabs).
- Policy: the two Airbnb listings need slightly different prices (narrow, never identical). PriceLabs has them identical from 23 Nov. If the child link is the mechanism, the lever is the child's offset setting in PriceLabs (to confirm with Corentin; not changed). Airbnb guest display NOT CHECKED.
- `user_price` in today's files equals `price` in yesterday's file on every date checked (31 Oct 191, 22 Nov 216, 23 Nov 217, 7 Dec 240, 21 Dec 257): `user_price` looks like the previously pushed price, `price` the new one. prices.csv uses `price`.

**Changes since 23 Oct.** No new P13 booking or cancellation (reservations.csv, dispatcher). Prices refreshed 23 Oct 06:57Z: 31 Oct 191 -> 183, 1 Nov 174 -> 169, 2 Nov 201 -> 191, 3 Nov 189 -> 181 on 3064856 (further £5-10 drift down); next-30 position P22 -> P20. The 9 CCC Airbnb ids stored on 3064856 are unchanged (4 still "not available"); CCC disabled, so no prices or ratings.

Differentiators (cannot price without comp data): top-floor large private terrace, lift to 3rd floor, Booking.com 8.4 (15 reviews) on the Booking.com page (policy).

## P10 Hanger Lane, 1-bed sleeps 4 (3318177)
NL 1BR summary n=121: **P25 114 / P50 133 / P75 161 / P90 194** (23 Oct: 113/133/160/194). **0 sellable nights before handback** (last night 18 Nov, policy): prices.csv next 60 = 25 booked, 35 blocked. No positioning; nothing proposed after 18 Nov.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in this PriceLabs account (`get_listings` searches returned 0) and not in listings.csv. **NOT CHECKED.**

## Data gaps:
1. Live OTA prices NOT CHECKED (proxy refuses airbnb.co.uk / booking.com). 0 comps; no comp median, rating, review-count gap, Superhost or cancellation comparison; comps.csv not created.
2. PriceLabs CCC not enabled and no Market Dashboard: NL percentiles only; daily bands are 2-3BR (n=151), not bedroom-matched; summary horizon unstated.
3. Our ratings and review counts empty in listings.csv: quality_premium = 0.
4. P13 next-30 occupancy: price files give 40% booked, pl_kpis 47%; market 35.2% (band) vs 41% (pl_kpis). Same recommendation either way.
5. P13 twins identical from 23 Nov: parent-child link confirmed from logs; that it causes the equal prices is inferred; child offset setting not visible via read-only tools; Airbnb display not checked.
6. P13 Airbnb-to-Smoobu id mapping still "likely" (policy). Vrbo 12037152 not analysed.
7. P13 price files last refreshed 23 Oct 06:57Z (not a 24 Oct refresh).
8. P10 neighbourhood output not saved to raw (numbers in market.csv only).
9. P16, P18, P19 not in PriceLabs or listings.csv.
