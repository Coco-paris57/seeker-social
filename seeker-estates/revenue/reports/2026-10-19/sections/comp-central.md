# Competitor positioning: CENTRAL/NORTH (D = 2026-10-19)

**Market source:** PriceLabs `get_neighbourhood_data` (Nearby Listings, Airbnb-derived, read-only), pulled 2026-10-19. **Our prices:** `data/snapshots/2026-10-19/prices.csv` (`pricelabs_price`; PriceLabs = Smoobu on every open night). **Occupancy:** `reports/2026-10-19/kpi_pack.json` (booked nights / nights) vs PriceLabs market occupancy. Standing decisions in `data/policy.json` apply: the P06 blocks are intentional, P14 is reported as numbers only, and P05 is benchmarked as a 4-bed.

**No individual comps today either.** `get_neighborhood_data_sources` still reports Competitor Listings (CCC) "not enabled for this account" and "No Market Dashboard reports available". OTA checks: **NOT CHECKED** (OTAs are blocked from this environment). I have not invented any comps. No rows were added to `comps.csv`, so comp median, rating gap and review-count gap cannot be computed. All figures below are **PriceLabs percentiles, not comps**. The same-bedroom percentile rows were appended to `data/snapshots/2026-10-19/market.csv` so the work can be recomputed.

Stay dates are the same for every listing: midweek Tue 20 to Thu 22 Oct (nights 20 and 21), weekend Fri 23 to Sun 25 Oct (nights 23 and 24), and 30 days out Wed 18 Nov. 17 Nov is kept so it can be compared with yesterday. PriceLabs fee structure is "Host-only fee" with `cleaning_fee` null, so it is unknown whether cleaning is included in the percentiles. Our prices exclude cleaning.

- **Same-BR** is the `summary_table` row for the same bedroom count. Its date horizon is not stated.
- **Daily band** is the per-night P25/P50/P75/P90 for the selected bedroom band, which mixes bedroom counts.
- Our percentile is linear interpolation between the quantile points. "<P25" is fed to `recommend` as 0.20 and ">P90" as 0.95.
- `quality_premium` = 0.0 for every listing, because our ratings are blank in `listings.csv` and there are no comp ratings.

## Where each property sits after yesterday's changes (same-BR, today vs yesterday)

| Ref | Change on 18 Oct | Yesterday | Today | Note |
|---|---|---|---|---|
| P05 (vs **4 BR**) | base 455 -> 500 | £449 open avg = <P25 (-25%); 17 Nov £485 = P29 | £498 open avg next 30 = **P32 (-15%)**; 17 Nov £533 = **P39 (-10%)**; 60d open avg £549 = P42 | Still below the 4 BR median |
| P06 | base 340 -> 357 | £290 avg of 5 stay nights, <P25 (-28%) | £304 avg of 5 stay nights, <P25 (-25%); open avg £318 = **P27 (-21%)** | Daily-band position rose about 5–7 points per night |
| P08 | none | £192 avg = P35 (-11%) | £192 avg = **P35 (-12%)**; open avg next 30 £209 = **P45 (-4%)** | Prices unchanged |
| P11 | base 260 -> 286; +10% 12–18 Dec | £181 avg = <P25 (-38%) | £199 avg = <P25 (-32%); open avg next 30 £224 <P25 (-23%); 60d open avg £279 = P45 (-4%) | Near-term nights still <P25 |
| P14 | none | £500 >P90 | £500 >P90 | Special setup, numbers only |

## P05 St John's Wood 4-bed (PriceLabs 3166592, smoobu)
**4 BR benchmark** (same-BR, n=90): P25 463 / P50 589 / P75 711 / P90 1139. For reference, 5 BR (n=12) is 501 / 849 / 1107 / 1495.

PriceLabs' neighbourhood payload now shows this listing as **"4 BR"** with a 3–5 BR band (350 listings). Yesterday it showed 5 BR with a 4–6 BR band. Because 248 of the 350 listings in that band are 3-beds, the daily band is pulled down, so the 4 BR row is used for positioning.

| Night | Our price | Status | Daily band (3–5 BR) P25/P50/P75/P90 | vs 4 BR P50 (589) | 4 BR pct |
|---|---|---|---|---|---|
| 20 Oct | 319 | Booked | 312 / 390 / 547 / 745 | -46% | <P25 |
| 21 Oct | 324 | Booked | 320 / 396 / 554 / 755 | -45% | <P25 |
| 23 Oct | 321 | Booked | 336 / 418 / 590 / 770 | -46% | <P25 |
| 24 Oct | 321 | Booked | 336 / 418 / 576 / 756 | -46% | <P25 |
| 17 Nov | 533 | Open | 325 / 417 / 550 / 730 | -10% | P39 |
| 18 Nov | 534 | Booked (check-in) | 331 / 422 / 570 / 733 | -9% | P39 |

- Booked October nights show PriceLabs list prices. The realised booked ADR is £377–414, which is still <P25 against 4 BR.
- **Demand:** next 30 days 65.5% booked vs market 33%; next 60 days 64.4% vs 33%. Pickup in the last 7 days was 1 booking (7 nights, £4,528).
- **Ratings:** our rating and reviews are blank, and comp ratings are not available.
- **Positioning:** `recommend(0.655, 0.33, 0.32)` gives **raise +10%** ("booked +32% vs market but priced at P32: under-priced"). Both horizons agree. +10% on the £498 open average is about £548, roughly P42, still below the 4 BR median.
- **Differentiators:** no lift, over 4 floors and no parking justify a discount to the 4 BR median. Abbey Road, Lord's and Regent's Park location, 2 bath + WC and sleeping 8 argue the other way. A -15% gap is not explained by those features while it books at twice the market rate.

## P06 Marylebone 2-bed (3288517) - intentional blocks, excluded

| Night | Our price | Status | Daily band (1–3 BR) P25/P50/P75/P90 | vs P50 | Pct today (yday) |
|---|---|---|---|---|---|
| 20 Oct | 274 | Open | 278 / 334 / 421 / 510 | -18% | <P25 (<P25) |
| 21 Oct | 290 | Open | 281 / 337 / 430 / 512 | -14% | P29 (<P25) |
| 23 Oct | 316 | Booked | 292 / 353 / 447 / 522 | -10% | P35 (P28) |
| 24 Oct | 328 | Booked | 295 / 349 / 442 / 522 | -6% | P40 (P33) |
| 17 Nov | 314 | Blocked | 287 / 354 / 444 / 539 | -11% | P35 (P30) |
| 18 Nov | 353 | Blocked | 291 / 360 / 445 / 539 | -2% | P47 |

- **Same-BR 2 BR** (n=212): 309 / 404 / 508 / 616. Open-night average £318 = P27 (-21%).
- **Demand, blocks excluded (policy):** 14 booked of 19 unblocked nights = **73.7% in both the next 30 and next 60 days**, vs market 43% / 40%. In the next 60 days 40 nights are blocked and only 5 are open. The kpi_pack 48% / 24% figures include blocked nights in the denominator. Yesterday's "fix-listing on 60d" came from those blocks and is withdrawn.
- **Positioning:** `recommend(0.737, 0.43, 0.27)` gives **raise +10%** ("booked +31% vs market but priced at P27: under-priced"). This affects only about 5 open nights, so the revenue at stake is small.
- **Differentiators:** 2nd floor with no lift, street view and no parking explain part of the discount. Marylebone Village and Regent's Park location support the median.

## P08 Islington 2-bed (3318167) - focus

| Night | Our price | Status | Daily band (1–3 BR) P25/P50/P75/P90 | vs P50 | Pct today (yday) |
|---|---|---|---|---|---|
| 20 Oct | 183 | Booked | 151 / 185 / 233 / 305 | -1% | P49 (P49) |
| 21 Oct | 180 | Booked | 153 / 188 / 227 / 305 | -4% | P44 (P45) |
| 23 Oct | 199 | Booked | 165 / 194 / 249 / 320 | +3% | P52 (P53) |
| 24 Oct | 201 | Booked | 160 / 195 / 244 / 327 | +3% | P53 (P53) |
| 17 Nov | 197 | Open | 144 / 181 / 226 / 314 | +9% | P59 (P59) |
| 18 Nov | 186 | Open | 144 / 184 / 226 / 310 | +1% | P51 |

- **Same-BR 2 BR** (n=145): 176 / 217 / 260 / 321. List prices are unchanged since yesterday (base £250). The open-night average over the next 30 days is £209, about **P45 (-4%)**: mid-market, not expensive.
- **Demand worsened:**
  - Next 30 days: **41.4% vs market 50%**. It was 44.8% yesterday; the window rolled forward and no new nights were booked.
  - Next 60 days: **20.3% vs 43%** (22.0% yesterday).
  - **Nothing is booked after 13 Nov.** From 18 Nov to 17 Dec we have 0 of 30 nights booked, while PriceLabs' daily market occupancy for the band averages 43% (55% for 20 Oct–17 Nov).
  - Our median lead time is 16 days vs a market median booking window of 28 days, which explains part but not all of the 60-day gap.
- **Realised rate on recent bookings:** both forward stays came in far below list.
  - 17–26 Oct, Airbnb, 9 nights: £1,411.41 including £149 cleaning, which is £140/night before cleaning. The 15% weekly discount applies.
  - 8–14 Nov, Airbnb, booked 17 Oct, 6 nights: £776.46 including £149 cleaning, which is **£105/night** before cleaning. PriceLabs listed those nights at an average of £209, and no length-of-stay discount applies to a 6-night stay.
  - The cause is not established from this data (a promotion, a manual price or a channel setting are all possible). Please check this; it is a data point, not a conclusion.
- **Positioning:** `recommend(0.414, 0.50, 0.35)` gives **fix-listing, 0%** ("behind market -9% while already at P35: conversion/visibility problem, not price"). At 60 days the result is the same with a -23% gap. Using the open-night P45 does not change the result.
- **Reading:** the list price is mid-market and the window beyond mid-November is empty, so the evidence points to visibility and conversion (listing content, ranking, the sleeps-5 cap, min-stay) rather than price level. The £105/night booking should be understood before any price cut is considered.
- **Differentiators:** the ground-floor terrace is a plus. Sleeping 5, when most 2-beds sleep 6, and the bedroom being on the 1st floor are minuses. There is no parking. It is near Emirates and Upper St.

## P11 Camden 2-bed (3064196)

| Night | Our price | Status | Daily band (1–3 BR) P25/P50/P75/P90 | vs P50 | Pct today (yday) |
|---|---|---|---|---|---|
| 20 Oct | 185 | Open | 183 / 232 / 307 / 375 | -20% | P26 (<P25) |
| 21 Oct | 176 | Booked (check-in) | 185 / 233 / 301 / 377 | -24% | <P25 (<P25) |
| 23 Oct | 190 | Booked | 205 / 253 / 328 / 397 | -25% | <P25 (<P25) |
| 24 Oct | 199 | Booked | 206 / 259 / 328 / 386 | -23% | <P25 (<P25) |
| 17 Nov | 243 | Booked | 182 / 238 / 299 / 382 | +2% | P52 (P43) |
| 18 Nov | 348 | Open (min stay 1) | 188 / 251 / 310 / 382 | +39% | P83 |

- **Same-BR 2 BR** (n=172): 233 / 290 / 340 / 391.
  - Open average next 30 days: £224, <P25 (-23%).
  - Open average next 60 days: £279, P45 (-4%).
  - Realised booked ADR on the October nights is £151.80, and last-30 ADR is £154.
- **The +10% window on 12–18 Dec sits at about P59–P83 of the daily band.** It runs from £285 to £394, with 12 Dec at £394 (P83) and 13–18 Dec at £285–324 (P59–P70).
- **The 18 Nov price of £348 (P83, min stay 1) stands out against its neighbours.** It is an open single night; the reason for the spike is not visible in the snapshot.
- **Demand:** next 30 days 62.1% vs 46%, next 60 days 67.8% vs 39%. No bookings in the last 7 days.
- **Positioning:** `recommend(0.621, 0.46, 0.20)` gives **raise +10%** ("booked +16% vs market but priced at P20: under-priced"). The 60-day result is the same (+29%). The base rise moved the near-term nights up by about 10%, but they are still at or under P25.
- **Differentiators:** basement flat, no lift and no parking justify a discount, but not -20 to -25% on near-term nights. The patio and Camden Town location help.

## P14 Primrose Hill 1-bed (3267077) - special setup: numbers only, no pricing advice

| Night | Our price | Status | Daily band (0–2 BR) P25/P50/P75/P90 | vs P50 | Pct |
|---|---|---|---|---|---|
| 20 Oct | 500 | Open | 166 / 205 / 265 / 325 | +144% | >P90 |
| 21 Oct | 500 | Open | 169 / 206 / 264 / 325 | +143% | >P90 |
| 23 Oct | 500 | Open | 174 / 211 / 266 / 337 | +137% | >P90 |
| 24 Oct | 500 | Open | 174 / 208 / 265 / 336 | +140% | >P90 |
| 17 Nov | 500 | Open | 161 / 208 / 257 / 306 | +140% | >P90 |
| 18 Nov | 500 | Open | 163 / 211 / 259 / 306 | +137% | >P90 |

- **Same-BR 1 BR** (n=173): 145 / 191 / 233 / 292. £500 is +162% vs the median and +71% vs P90. Against the 2 BR row (n=62, 234 / 280 / 355 / 443), it is +13% vs P90.
- **Occupancy:** next 30 days 0% vs market 42%, next 60 days 0% vs 38%. Last 365 days: 10 nights at a £410 ADR. Nothing changed vs yesterday.
- **Features:** roof terrace, yoga room, house over 4 floors, 1 parking space, sleeps 4.
- Per `policy.json`, there is no positioning recommendation.

## P17 St John's Wood 1-bed
**NOT IN SYSTEMS.** It is in neither PriceLabs nor Smoobu, and there are no prices, KPIs or percentiles. No analysis was done.

## Data gaps:
1. No individual comps for any property. PriceLabs Competitor Listings is not enabled and there are no Market Dashboard reports, so there are no comp ids, comp median, ratings, review counts or Superhost flags. `comps.csv` has a header only.
2. OTA checks (Airbnb / Booking.com / Vrbo): NOT CHECKED, because they are blocked from this environment.
3. Our ratings and review counts are blank in `listings.csv`, so `quality_premium` = 0 and the rating and review gaps are unknown.
4. The same-BR `summary_table` has no stated date horizon. The daily bands mix bedroom counts.
5. It is unknown whether cleaning is included in the PriceLabs percentiles ("Host-only fee", `cleaning_fee` null).
6. Day-on-day comparisons are approximate. The P05 compset changed (now 4 BR with a 3–5 BR band, 350 listings; yesterday 5 BR with a 4–6 BR band), and the 4 BR row moved from n=115 to n=90.
7. The bedroom-count conflict is still open. `properties.py` says 5-bed and `policy.json` says PriceLabs has it as 5 BR, but today's PriceLabs neighbourhood payload says 4 BR. Please confirm which setting changed.
8. The cause of the P08 8–14 Nov booking at about £105/night before cleaning (list price about £209) is not established.
9. The reason for the P11 18 Nov £348 single-night spike is not visible.
10. The kpi_pack "Prices pushed today" check is bad for all five listings (last push 18 Oct evening). The percentiles here use PriceLabs prices, which match Smoobu.
11. P17 is not in any system.
