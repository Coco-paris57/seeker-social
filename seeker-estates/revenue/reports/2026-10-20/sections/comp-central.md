# Competitor positioning: CENTRAL/NORTH (D = 2026-10-20)

**Market source:** PriceLabs `get_neighbourhood_data` (Nearby Listings, Airbnb-derived, read-only), pulled 2026-10-20. Extracts are saved in `data/snapshots/2026-10-20/raw/neighbourhood_<ref>.json`. **Our prices:** `data/snapshots/2026-10-20/prices.csv` (`pricelabs_price`; kpi_pack confirms PriceLabs = Smoobu within £2 on every open night). **Occupancy:** `reports/2026-10-20/kpi_pack.json`. **Change history:** PriceLabs `get_user_logs` for 17–20 Oct, plus the 18, 19 and 20 Oct snapshots. Standing decisions in `data/policy.json` apply: P06 blocks are intentional and excluded, P14 gets numbers only, and P05 is benchmarked as a 4-bed.

**Still no individual comps.** `get_neighborhood_data_sources` again says "Competitor Listings source is not enabled for this account" and "No Market Dashboard reports available". OTA checks are **NOT CHECKED** because OTAs are blocked from this environment. No comps were invented and **no rows were added to `comps.csv`** (it holds only the header). That means comp median, rating gap and review-count gap cannot be computed. **Every figure below is a PriceLabs percentile, not a comp.** The same-BR percentile rows were appended to `data/snapshots/2026-10-20/market.csv`.

**Stay dates, the same for every listing:**
- Weekend: Fri 23 to Sun 25 Oct (nights 23 and 24).
- Midweek: Tue 27 to Thu 29 Oct (nights 27 and 28). Today's snapshot starts on 21 Oct, so the 20–22 Oct window cannot be priced.
- 30 days out: Thu 19 Nov.
- Kept for day-on-day comparison: 21 Oct, 17 Nov and 18 Nov.

**Method:**
- PriceLabs fee structure is "Host-only fee" and `cleaning_fee` is null, so it is unknown whether the percentiles include cleaning. Our prices exclude cleaning.
- "Same-BR" means the `summary_table` row for our bedroom count; its date horizon is not stated. The "daily band" mixes bedroom counts.
- Our percentile is a linear interpolation between quantile points. "<P25" is fed to `recommend` as 0.20 and ">P90" as 0.95.
- `quality_premium` = 0.0 for all, because our ratings are blank in `listings.csv` and there are no comp ratings.

## Summary: position and change since 19 Oct

| Ref | Same-BR P25/P50/P75/P90 (n) | Open avg next 30: yesterday -> today | Overnight change on the same dates | Since the 18 Oct base rise (18 -> 20 Oct, open nights) | `recommend` (30d / 60d) |
|---|---|---|---|---|---|
| P05 (4 BR) | 473/590/713/1143 (90) | £498 P32 (-15%) -> **£439 <P25 (-26%)** | **-10.9% median on all dates, -13.4% on open nights**; no user change logged | **-4.9%**: the +9.9% rise has been fully reversed | raise +10% / raise +10% |
| P06 (2 BR) | 317/407/529/635 (212) | £318 P27 (-21%) -> £302 <P25 (-26%) | -0.3% on all dates; -8.8% on the 4 open nights | -4.2% on open nights | raise +10% / raise +10% (about 4 open nights only) |
| P08 (2 BR) | 178/221/261/336 (145) | £209 P45 (-4%) -> £201 P39 (-9%) | -0.4% median; nights 21 Oct–3 Nov down 5–9% | -0.4% (no base change) | fix-listing 0% / fix-listing 0% |
| P11 (2 BR) | 237/298/350/412 (171) | £224 <P25 (-23%) -> £230 <P25 (-23%) | -0.9% | **+8.4%: the rise is holding** | raise +10% / raise +10% |
| P14 (1 BR) | 146/196/239/299 (173) | £500 >P90 -> £500 >P90 | 0% (20 nights moved by under 2%) | n/a | special setup: no recommendation |
| P17 | none | NOT IN SYSTEMS | n/a | n/a | collect-data |

The 30-day windows are not identical: yesterday's ran 19 Oct–17 Nov and today's runs 21 Oct–19 Nov. The overnight and since-18-Oct columns compare the same stay dates across snapshots.

**PriceLabs user logs, 17–20 Oct.** The last manual changes were made on 18 Oct by reyhan@:
- P05 base 455 -> 500, plus 29 Dec overrides.
- P06 base 340 -> 357.
- P11 base 260 -> 286, plus a +10% override on 12–18 Dec.

Nothing was logged after 18 Oct 20:43 UTC, so the price moves on 19 and 20 Oct came from the algorithm, not from user edits.

## P05 St John's Wood 4-bed (PriceLabs 3166592)

Same-BR is 4 BR, n=90: 473 / 590 / 713 / 1143. The payload still shows "4 BR" with a 3–5 BR band (350 listings, 248 of them 3-beds).

| Night | Ours (yesterday) | Status | Daily band 3–5 BR | Band pct | vs 4 BR P50 | 4 BR pct |
|---|---|---|---|---|---|---|
| 21 Oct | 315 (324) | Booked, ADR 377 | 328/418/569/770 | <P25 | -47% | <P25 |
| 23 Oct | 305 (321) | Booked, ADR 414 | 354/424/605/783 | <P25 | -48% | <P25 |
| 24 Oct | 316 (321) | Booked, ADR 414 | 358/428/598/789 | <P25 | -46% | <P25 |
| 27 Oct | 330 (386) | Blocked | 338/414/556/758 | <P25 | -44% | <P25 |
| 28 Oct | 386 (452) | Open, min 2 | 343/418/559/754 | P39 | -35% | <P25 |
| 17 Nov | 451 (533) | Open, min 2 | 337/426/579/756 | P54 | -24% | <P25 |
| 18 Nov | 449 (534) | Booked (check-in) | 343/431/588/758 | P53 | -24% | <P25 |
| 19 Nov | 494 (551) | Booked, ADR 459 | 353/447/599/783 | P58 | -16% | P29 |

- **The 18 Oct base rise is undone.** Open nights moved +9.9% between 18 and 19 Oct, then -13.4% between 19 and 20 Oct, for a net -4.9% vs before the rise.
  - Examples: 28 Oct 411 -> 452 -> 386, and 17 Nov 485 -> 533 -> 451. Both dates carry a +15% override.
  - The base is still £500, and no settings change was logged.
  - The drop coincides with PriceLabs reclassifying the listing as 4 BR on a 3–5 BR band (reported yesterday), but the actual cause is not visible in the data. The listing's customizations (last-minute -25% within 15 days, occupancy-based adjustment, Moderately Aggressive demand factor) did not change, and 17 Nov is outside the 15-day last-minute window.
- **Demand:**
  - Next 30 days: 65.5% booked vs 33% for the market (MPI 1.98).
  - Next 60 days: 62.7% vs 33%.
  - Pickup in the last 7 days: 1 booking, 7 nights, £4,528.
  - Realised ADR on booked nights in the next 30 days is £390, also <P25 against 4 BR.
- **Positioning:**
  - 30 days: `recommend(0.655, 0.33, 0.20)` returns **raise +10%** ("booked +32% vs market but priced at P20: under-priced").
  - 60 days: open average £486 = P28 (-18%), and `recommend` returns raise +10%.
  - Supported position: a discount of about 15–20% to the 4 BR median, not today's -26%.
  - Reasoning: it books at twice the market rate while priced in the bottom quartile of 4-beds.
- **Differentiators:** no lift, spread over 4 floors and no parking justify a discount. Abbey Road, Lord's and Regent's Park, 2 bath + WC and sleeping 8 argue against a large one.

## P06 Marylebone 2-bed (3288517): intentional blocks, excluded

| Night | Ours (yesterday) | Status | Daily band 1–3 BR | Band pct | 2 BR pct (vs P50) |
|---|---|---|---|---|---|
| 21 Oct | 275 (290) | Open | 294/346/459/537 | <P25 | <P25 (-32%) |
| 23 Oct | 311 (316) | Booked, ADR 211 | 305/362/468/557 | P28 | <P25 (-24%) |
| 24 Oct | 323 (328) | Booked, ADR 211 | 304/358/458/560 | P34 | P27 (-21%) |
| 27 Oct | 329 (339) | Booked, ADR 178 | 285/344/443/538 | P44 | P28 (-19%) |
| 28 Oct | 317 (341) | Booked, ADR 178 | 287/347/444/537 | P38 | P25 (-22%) |
| 17–19 Nov | 290 / 304 / 386 | Blocked (policy) | n/a | n/a | n/a |

- **Demand, blocks excluded:** 78% of the unblocked nights in the next 30 days are booked (14 booked, 11 blocked, 4 open), vs 43% for the market. Over 60 days, 41 nights are blocked and only 4 are open.
- **Price changes:** the 4 open nights fell 8.8% overnight and are 4.2% below their pre-rise level. Booked and blocked nights barely moved.
- **Positioning:** `recommend(0.778, 0.43, 0.20)` returns **raise +10%**. Only about 4 open nights (21 Oct and 5–7 Nov) are affected, so little revenue is at stake.
- **Differentiators:** 2nd floor with no lift, street view and no parking explain part of the -26%. The Marylebone Village and Regent's Park location supports a price closer to the median.
- **Context for the channel section, not a pricing finding:** realised ADR on booked nights is £178–211 against list prices of £311–329 (kpi_pack paid-vs-expected check: -35% after length-of-stay discounts).

## P08 Islington 2-bed (3318167)

| Night | Ours (yesterday) | Status | Daily band 1–3 BR | Band pct | 2 BR pct (vs P50) |
|---|---|---|---|---|---|
| 21 Oct | 169 (180) | Booked, ADR 157 | 160/197/245/318 | P31 | <P25 (-24%) |
| 23 Oct | 181 (199) | Booked, ADR 157 | 169/200/263/332 | P35 | P27 (-18%) |
| 24 Oct | 185 (201) | Booked, ADR 157 | 166/201/256/334 | P39 | P29 (-16%) |
| 27 Oct | 191 (208) | Open | 160/194/243/325 | P48 | P33 (-14%) |
| 28 Oct | 197 (215) | Open | 157/196/250/324 | P50 | P36 (-11%) |
| 17 Nov | 196 (197) | Open | 149/188/237/318 | P54 | P35 (-11%) |
| 18 Nov | 200 (186) | Open | 149/191/237/321 | P55 | P38 (-10%) |
| 19 Nov | 201 (201) | Open | 154/195/243/320 | P53 | P38 (-9%) |

- **Prices:** the base is unchanged at £250. Nights from 21 Oct to 3 Nov are 5–9% lower than yesterday (no user change logged; these dates are moving into the near-term window). Later nights are flat.
- **Position:** the open average for the next 30 days is £201 = **P39 (-9%)** against 2 BR, which is below the median rather than expensive.
- **Demand:**
  - Next 30 days: 37.9% vs 49% for the market (41.4% yesterday).
  - Next 60 days: 18.6% vs 43% (20.3% yesterday).
  - No new bookings overnight. 48 of the next 59 nights are open.
- **Positioning:** `recommend(0.379, 0.49, 0.39)` returns **fix-listing, 0%** ("behind market -11% while already at P39: conversion/visibility problem, not price"). The 60-day result is the same (-24% vs market at P40). A further price cut is not supported by this data. The evidence points to listing, visibility and conversion.
- **Differentiators:** the ground-floor terrace is a plus. Sleeping 5 (most 2-beds sleep 6), a 1st-floor bedroom and no parking are minuses.
- **Rate leak (unchanged, see the channel section):** paid £143 vs £187 expected on 10 nights (-23%). This includes the 8–14 Nov booking at about £105/night before cleaning, whose cause is still not established.

## P11 Camden 2-bed (3064196)

| Night | Ours (yesterday) | Status | Daily band 1–3 BR | Band pct | 2 BR pct (vs P50) |
|---|---|---|---|---|---|
| 21 Oct | 174 (176) | Booked (check-in) | 195/243/320/388 | <P25 | <P25 (-42%) |
| 23 Oct | 186 (190) | Booked, ADR 152 | 215/263/340/404 | <P25 | <P25 (-38%) |
| 24 Oct | 195 (199) | Booked, ADR 152 | 214/265/339/402 | <P25 | <P25 (-35%) |
| 27 Oct | 200 (206) | Booked, ADR 152 | 204/249/308/384 | <P25 | <P25 (-33%) |
| 28 Oct | 204 (208) | Open | 204/252/310/390 | P25 | <P25 (-32%) |
| 17 Nov | 230 (243) | Booked, ADR 191 | 192/250/325/390 | P41 | <P25 (-23%) |
| 18 Nov | 317 (348) | Open, min 1 | 201/258/332/391 | P70 | P59 (+6%) |
| 19 Nov | 280 (279) | Booked (check-in) | 208/266/361/401 | P54 | P43 (-6%) |

- **The base rise is holding:** open nights are +8.4% vs the 18 Oct snapshot, and overnight moves were small (-1%).
- **Position:** near-term open nights are still <P25 against 2 BR.
  - Open average next 30 days: £230, <P25 (-23%).
  - Open average next 60 days: £282, P43 (-5%).
- **18 Nov** is still a single open night priced above its neighbours (£317, P59 against 2 BR, min stay 1). It fell from £348 yesterday. The reason for the spike is not visible.
- **Demand:**
  - Next 30 days: 62.1% vs 46% for the market.
  - Next 60 days: 67.8% vs 39%.
  - No bookings in the last 7 days.
- **Positioning:** `recommend(0.621, 0.46, 0.20)` returns **raise +10%**, and the 60-day result is the same. Supported position: about -15% to the 2 BR median on near-term nights, against -23% today.
- **Differentiators:** basement, no lift and no parking justify some discount. The patio and the Camden Town location help.
- **Rate leak (see the channel section):** paid £148 vs £200 expected on 15 nights (-26%).

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

Same-BR is 1 BR, n=173: 146 / 196 / 239 / 299.

- **Price:** £500 on every stay date checked (21, 23, 24, 27 and 28 Oct; 17, 18 and 19 Nov). That is **>P90 (+155% vs the median, +67% vs P90)**. Against the 2 BR row (242/288/366/446) it is +12% vs P90. The daily band P90 is £325–349.
- **Occupancy:** 0% in the next 30 and 60 days, vs 41% and 38% for the market. Last 365 days: 10 nights at a £410 ADR.
- **Change:** 20 nights moved by under 2%, otherwise nothing changed.
- **Features:** roof terrace, yoga room, house over 4 floors, 1 parking space, sleeps 4.
- No positioning recommendation, per `policy.json`.

## P17 St John's Wood 1-bed

**NOT IN SYSTEMS.** It is in another account that is not yet connected. `get_listings(search_query="St John's Wood")` returned 0 listings, and kpi_pack shows no PriceLabs or Smoobu mapping. There are no prices, KPIs or percentiles, and no analysis was done.

## Data gaps:
1. No individual comps for any property. PriceLabs Competitor Listings is not enabled and there are no Market Dashboard reports, so there are no comp ids, comp median, ratings, review counts, Superhost flags or cancellation policies. `comps.csv` holds only the header.
2. OTA checks (Airbnb, Booking.com, Vrbo): NOT CHECKED, because they are blocked from this environment.
3. Our ratings and review counts are blank in `listings.csv`, so `quality_premium` = 0 and the rating and review gaps are unknown.
4. The cause of the overnight P05 drop (-13% on open nights, which reverses the 18 Oct base rise) is not established. No user change was logged, and the base is still £500. Please check the P05 price breakdown in the PriceLabs UI.
5. The same-BR `summary_table` has no stated date horizon, and the daily bands mix bedroom counts. It is unknown whether cleaning is included (fee structure "Host-only fee", `cleaning_fee` null).
6. Today's `prices.csv` starts on 21 Oct, so 20 Oct cannot be priced, and the 30-day windows differ by two days from yesterday's.
7. The P11 18 Nov single-night spike and the P08 8–14 Nov booking at about £105/night remain unexplained.
8. P17 is not connected (it is in another account), so there is no data at all.
