# Competitor positioning: CENTRAL/NORTH (D = 2026-10-24)

**Market source:** PriceLabs `get_neighbourhood_data` (Nearby Listings, Airbnb-derived, read-only, mode=detail, include_prices), pulled 24 Oct, one per listing. Extracts are in `data/snapshots/2026-10-24/raw/neighbourhood_<ref>.json` for P05, P06, P08, P11 and P14. **Our prices:** `data/snapshots/2026-10-24/prices.csv` (`pricelabs_price`). It equals the neighbourhood `final_price` on every stay date below. prices.csv starts on 25 Oct. **Occupancy:** booking status in prices.csv, with `Blocked` nights excluded, plus market occupancy from `reports/2026-10-24/kpi_pack.json`. **Changes:** PriceLabs `get_user_logs` (listing level, 23–24 Oct, all 5 listings), `get_listing_date_overrides` (P11) and `get_customizations` (P11). I diffed prices against `data/snapshots/2026-10-23/prices.csv`. `data/policy.json` applies throughout: P06 blocks are intentional and excluded, P08 nights after 13 Nov are handback, P14 is reported as numbers only, P05 is benchmarked as a 4-bed, and P11 sells on Booking.com only.

**These are Nearby Listings percentiles, not comps.** On 24 Oct `get_neighborhood_data_sources` (P11) again reports "Competitor Listings source is not enabled for this account" and "No Market Dashboard reports available". OTA checks are **NOT CHECKED**: the agent proxy returns CONNECT 403 for airbnb.co.uk and booking.com. I invented no comps and added no rows to `comps.csv`, so there is no comp median, no rating gap and no review-count gap. Where I say "median" I mean the same-bedroom Nearby Listings P50. I appended the same-BR rows to `data/snapshots/2026-10-24/market.csv` and kept the other agents' P13 and P10 rows intact.

**Stay dates (the same for every listing):** midweek Tue 27–Thu 29 Oct (nights 27 and 28), weekend Fri 30 Oct–Sun 1 Nov (nights 30 and 31), and 30 days out Mon 23 Nov. **Method (unchanged from 23 Oct):** percentiles are linearly interpolated, and `recommend` receives 0.20 for "<P25" and 0.95 for ">P90". `quality_premium(None, None)` = 0.0 because our ratings are blank in `listings.csv`. Sellable nights = open + booked. Windows: next 30 = 25 Oct–22 Nov, next 60 = 25 Oct–22 Dec, and P08 runs only to 13 Nov.

## Summary

| Ref | Same-BR P25/P50/P75/P90 (n) | Open avg next 30 (open / sellable) | Open avg next 60 | Booked vs market 30d | Since 23 Oct | `recommend` 30d / 60d |
|---|---|---|---|---|---|---|
| P05 (4 BR) | 507/616/737/1172 (90) | £482 <P25, -22% (8 / 27) | £554 = P36, -10% (23 / 57) | 70.4% vs 38% | flat (open +0.7%); **28 Oct now Blocked** | raise +10% / raise +10% |
| P06 (2 BR) | 324/416/542/690 (215) | £354 = P33, -15% (3 / 14) | same 3 nights | 78.6% vs 44% (blocks excluded) | 7 Nov 282 -> 366 (+30%), not logged | raise +10% (3 nights only) |
| P08 (2 BR) | 190/227/284/345 (148) | £167 <P25, -26% (13 / 20, to 13 Nov) | n/a (handback) | 35.0% vs 50% kpi / 58.1% ND | **open -3.4% (3rd day running); 7 Nov -30%; 1 Nov at £150 floor** | fix-listing, hold |
| P11 (2 BR) | 244/306/362/409 (173) | £219 <P25, -28% (15 / 29) | £244 = P25, -20% (27 / 59) | 48.3% vs 45% | **-10.9% median across all dates; darts override cut +20% -> +5%** | raise +5% / raise +10% |
| P14 (1 BR) | 153/203/253/299 (174) | £500 >P90, +146% (29 / 29) | £514 >P90, +153% | 0% vs 41% | 0.0% | special setup: numbers only |
| P17 (1 BR) | none | NOT IN SYSTEMS | n/a | n/a | n/a | collect-data |

## P11 Camden 2-bed (3064196): cancellation now in PriceLabs; prices down ~11%

**Resolved since 23 Oct (t-p11-sync):** PriceLabs now shows 19–26 Nov as open (prices.csv: `available` True, no booking status), and the neighbourhood `upcoming_bookings` no longer includes 18–27 Nov. kpi_pack forward occupancy is now 48.3% / 54.2% (next 30 / 60), which matches the Smoobu-based figure I gave yesterday.

**Orphan overrides resolved:** `get_user_logs` shows Reyhan editing the 18–27 Nov override on 23 Oct at 11:11Z, setting min stay 2 with no price. `get_listing_date_overrides` confirms that 18–27 Nov now carry only `min_stay 2`, so the +30% (18 Nov) and +60% (27 Nov) are gone. 27 Nov went 589 -> 326 (P59 vs the 2 BR set) and 18 Nov went 314 -> 214.

**New: the darts override was cut.** At the same session (23 Oct, 11:11Z) Reyhan changed the 12–18 Dec override to **+5%**, min 2. It had been +10% for 12–18 Dec (18 Oct) and +20% for 13–18 Dec (21 Oct, logged). Darts nights 13–17 Dec are now 262 / 241 / 247 / 259 / 272, **average £256** (yesterday £324). `policy.json` price_changes (21 Oct) records "P11 Camden darts nights 13-17 Dec raised (Corentin); average above £300/night". Market occupancy on those nights is 13–21% (ND daily) and the band position is P33–P43, so the cut is not unreasonable on the data. But it reverses a recorded decision, and whether Corentin agreed to it is NOT CHECKED.

**New: an across-the-board fall.** The median day-on-day change is -10.9% (n=59, through 22 Dec). By month, Oct is -5.9%, Nov -10.4% and Dec -11.9%, and booked nights fell as well. Base (£286), min and max are unchanged (`listings.csv`), and no other user change is logged. The cause is not identified. One candidate: `get_customizations` shows a Booking Recency Factor ("gradual discount from 5% (no bookings in last 15 days) up to 15% (no bookings in last 45 days), next 30 days"). The last P11 booking was made on 4 Oct (`reservations.csv`), 20 days ago, so this factor fits Oct–Nov. It does not explain December, which is outside its 30-day reach. Another candidate is the aggressive occupancy-based adjustment reacting to the lower occupancy after the cancellation. Neither is verified, because PriceLabs gives no per-date breakdown.

| Night | Today (23 Oct) | Status | Daily band 1–3 BR | Band pct | 2 BR pct (vs P50) |
|---|---|---|---|---|---|
| 27 Oct | 197 (213) | Booked, ADR 152 | 226/272/338/405 | <P25 | <P25 (-36%) |
| 28 Oct | **199** (214) | Open, min 2 | 223/274/336/402 | <P25 | <P25 (-35%) |
| 30 Oct | **208** (215) | Open, min 2 | 227/278/344/437 | <P25 | <P25 (-32%) |
| 31 Oct | **220** (226) | Open, min 2 | 225/278/349/424 | <P25 | <P25 (-28%) |
| 23 Nov | **253** (259) | Open, min 2 (was "Booked") | 215/273/369/422 | P41 | P29 (-17%) |

- **Reopened run 18–27 Nov** (10 nights, min 2 on every night): prices sum to £2,600 (19–26 Nov: £2,060, £257/night, against £217/night on the cancelled stay). Positions run from <P25 to P56 on the daily band, and market occupancy is 25–48%.
- **Position:** the 30-day open average is £219 <P25 (-28%) and the 60-day is £244 = P25 (-20%). Camden sells on Booking.com at 1.2 x the PriceLabs price, before Mobile 10% and Genius (`policy.json`): £219 x 1.2 = £263, about P33 on the 2 BR set.
- **Supported positioning:** `recommend(0.483, 0.45, 0.20)` returns **raise +5%** ("in line with market but priced below what quality supports (P20)"): £219 x 1.05 = £230, **about -25% vs the 2 BR median**. For 60 days, `recommend(0.542, 0.38, 0.25)` returns raise +10%: £244 x 1.10 = £268, about -12%. Reasoning: occupancy is only about 3 points above the market at 30 days, and there have been no bookings for 20 days, so only a small near-term step is supported. The 60-day lead is +16 points, which supports undoing part of the unexplained ~11% fall on December nights.
- **Differentiators:** basement flat with no lift and no parking, which justifies a discount. The patio and the Camden Town location help. The 18% Visibility Booster is policy.

## P05 St John's Wood 4-bed (3166592)

Same-BR 4 BR, n=90: 507 / 616 / 737 / 1172 (23 Oct: 498/614/723/1149). The daily band is 3–5 BR (350 listings), which understates a 4-bed.

| Night | Today (23 Oct) | Status | Daily band 3–5 BR | Band pct | 4 BR pct (vs P50) |
|---|---|---|---|---|---|
| 27 Oct | 345 (357) | Blocked | 354/433/587/753 | <P25 | <P25 (-44%) |
| 28 Oct | 399 (399) | **Blocked (was Open)** | 353/442/592/754 | P38 | <P25 (-35%) |
| 30 Oct | **404** (406) | Open, min 2 | 359/456/629/784 | P37 | <P25 (-34%) |
| 31 Oct | 345 (342) | Booked (check-in) | 358/439/595/755 | <P25 | <P25 (-44%) |
| 23 Nov | 634 (640) | Booked, ADR 621 | 378/480/651/803 | P73 | P54 (+3%) |

- **Since 23 Oct:** prices are flat (median 0.0% overall, +0.7% on open nights). 6 Nov fell 594 -> 448 (-25%). 28 Oct changed from Open to Blocked, so 27–28 Oct is now a 2-night block with no Smoobu reservation behind it (`reservations.csv`). The reason is unknown. 29–30 Oct (£419 / £404, min 2) is now a 2-night window before the 31 Oct check-in.
- **Position:** the 30-day open average is £482 <P25 (-22%) and the 60-day is £554 = P36 (-10%). Booked: 70.4% vs 38% for the market (30 days) and 59.6% vs 36% (60 days), with blocks excluded. Pickup over the last 7 days was 1 booking, 7 nights, £4,528 (kpi_pack).
- **Supported positioning:** `recommend(0.704, 0.38, 0.20)` returns **raise +10%**: £482 x 1.10 = £530, **about -14% vs the 4 BR median**. For 60 days, `recommend(0.596, 0.36, 0.36)` returns raise +10%: £554 x 1.10 = £609, about -1%. Reasoning: it books at about 1.8x the market while sitting in the bottom third of 4-beds. This is subject to the 26 Oct base review.
- **Differentiators:** no lift, 4 floors and no parking justify some discount. Abbey Road, Lord's, 2 bathrooms plus a WC and sleeping 8 argue against a large one.

## P06 Marylebone 2-bed (3288517): intentional blocks excluded

| Night | Today (23 Oct) | Status | Daily band 1–3 BR | Band pct | 2 BR pct (vs P50) |
|---|---|---|---|---|---|
| 27 Oct | 299 (318) | Booked, ADR 178 | 302/364/474/577 | <P25 | <P25 (-28%) |
| 28 Oct | 303 (323) | Booked, ADR 178 | 305/367/477/586 | <P25 | <P25 (-27%) |
| 30 Oct | 329 (343) | Booked, ADR 178 | 301/378/493/598 | P34 | P26 (-21%) |
| 31 Oct | 322 (334) | Booked, ADR 178 | 300/371/481/599 | P33 | <P25 (-23%) |
| 23 Nov | n/a | Blocked (policy) | n/a | n/a | n/a |

- **Open nights in the next 60 days:** still only 5–7 Nov, now £332 / £363 / **£366**, average £354 = P33 (-15%). 7 Nov rose 282 -> 366 (+30%), with no logged change. This is the same pattern as 6 Nov yesterday and 5 Nov the day before.
- **Supported positioning:** `recommend(0.786, 0.44, 0.33)` returns **raise +10%**: £354 x 1.10 = £389, about -6% vs the 2 BR median, on 3 nights only. Reasoning: 11 of 14 sellable nights are booked while it is priced at P33.
- **Differentiators:** 2nd floor with no lift, a street view and no parking. The Marylebone Village location supports a price close to the median.

## P08 Islington 2-bed (3318167): sellable to 13 Nov only (handback)

| Night | Today (23 Oct) | Status | Daily band 1–3 BR | Band pct | 2 BR pct (vs P50) |
|---|---|---|---|---|---|
| 27 Oct | **160** (166) | Open, min 2 | 173/214/261/342 | <P25 | <P25 (-30%) |
| 28 Oct | **163** (168) | Open, min 2 | 173/209/261/341 | <P25 | <P25 (-28%) |
| 30 Oct | **164** (171) | Open, min 2 | 171/220/273/339 | <P25 | <P25 (-28%) |
| 31 Oct | **170** (176) | Open, min 2 | 175/215/272/340 | <P25 | <P25 (-25%) |
| 23 Nov | n/a | After handback (policy) | n/a | n/a | n/a |

- **Since 23 Oct:** this is the third day running of falls on open nights: -3.4% median (n=13), after -5.4% and -3.6% on the previous two days. **7 Nov fell 276 -> 192 (-30%)**. **1 Nov is at £150, the PriceLabs minimum** (`listings.csv` pl_min 150). Nothing is logged.
- **Position:** 13 open nights from 26 Oct to 7 Nov, averaging £167 <P25 (-26%). 7 of 20 sellable nights are booked (35.0%), against a market of 50% (kpi_pack) or 58.1% (ND daily, 1–3 BR, to 13 Nov). Pickup over the last 7 days: 0.
- **Supported positioning:** `recommend(0.35, 0.50, 0.20)` returns **fix-listing, 0%** ("behind market -15% while already at P20: conversion/visibility problem, not price"). Reasoning: three weeks of algorithmic cuts have produced no bookings, so the evidence does not support further cuts. Hold the price and look at visibility. Further drops will hit the £150 floor.
- **Differentiators:** the ground-floor terrace is a plus. Sleeping 5, a bedroom on the 1st floor and no parking are minuses.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

- **Same-BR** 1 BR, n=174: 153 / 203 / 253 / 299.
- **Price** is £500 on every stay date (27, 28, 30 and 31 Oct and 23 Nov). That is >P90: +146% vs the median and +67% vs P90.
- **Open average:** £500 next 30 (+146%) and £514 next 60 (+153%).
- **Occupancy:** 0% booked in the next 30 and 60 days, against a market of 41% and 38%. Min stay is 3–4 nights.
- **Day on day:** median 0.0% (n=59). 28 Nov fell 672 -> 614, 5 Dec fell 701 -> 641 and 22 Dec fell 609 -> 500.
- No positioning recommendation, per `policy.json`.

## P17 St John's Wood 1-bed

**NOT IN SYSTEMS.** `get_listings(search_query="St John's Wood")` returned 0 listings on 24 Oct. Listed facts (`properties.py`): 1-bed, sleeps 4, 2nd floor, no lift, no balcony, no parking.

## Changes since 23 Oct (this batch)
1. **P11:** PriceLabs now registers the 19–26 Nov cancellation, and the 18/27 Nov orphan overrides are gone (both done by Reyhan on 23 Oct). **New:** Reyhan cut the 12–18 Dec darts override to +5%, which takes the 13–17 Dec average from £324 to £256, against the policy note "average above £300". Separately, all P11 prices fell a median 10.9%, cause unverified.
2. **P08:** third day of unlogged cuts (7 Nov -30%), and 1 Nov is at the £150 floor. Still fix-listing / hold.
3. **P05:** 28 Oct changed from Open to Blocked (27–28 Oct block, reason unknown), and 6 Nov fell -25%. Still raise +10%.
4. **P06:** 7 Nov +30% (unlogged). Still raise +10% on 3 nights.
5. **P14:** at the £500 floor, unchanged.

## Data gaps:
1. No individual comps: Competitor Listings is not enabled and there are no Market Dashboard reports (re-checked 24 Oct). So there are no comp ids, comp median, ratings, review counts, Superhost flags or cancellation policies, and `comps.csv` has no rows from this batch.
2. OTA checks (Airbnb, Booking.com): NOT CHECKED. The proxy returns CONNECT 403.
3. Our ratings and review counts are blank in `listings.csv`, so `quality_premium` = 0 and the rating and review gaps are unknown.
4. P11: the cause of the -10.9% fall across all dates is not verified (Booking Recency Factor and occupancy adjustment are candidates). Whether Corentin agreed to the darts override cut is NOT CHECKED. Whether the Booking.com calendar is open for 18–27 Nov is NOT CHECKED (the Smoobu/Booking.com side is not visible to me).
5. P05: the 27–28 Oct block has no stated reason. P08 and P06: algorithmic moves are unlogged and need the PriceLabs price breakdown.
6. P08 market occupancy differs by source: 50% (kpi) vs 58.1% (ND daily). Both give fix-listing.
7. The same-BR summary_table has no stated horizon, the daily bands mix bedroom counts and it is unknown whether cleaning is included. P11's percentiles are Airbnb-derived while P11 sells on Booking.com.
8. P17 is not connected, so there is no data at all.
