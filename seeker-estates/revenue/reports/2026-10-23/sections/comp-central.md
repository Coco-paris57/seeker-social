# Competitor positioning: CENTRAL/NORTH (D = 2026-10-23)

**Market source:** PriceLabs `get_neighbourhood_data` (Nearby Listings, Airbnb-derived, read-only; mode=detail, include_prices; include_competitors also tried on P11 and it returned no individual listings). Pulled 2026-10-23, one call per listing. Extracts are in `data/snapshots/2026-10-23/raw/neighbourhood_<ref>.json`. **Our prices:** `data/snapshots/2026-10-23/prices.csv` (`pricelabs_price`, pulled 06:02–06:14Z). It matches the PriceLabs `final_price` in the neighbourhood payload and the Smoobu price on every stay date below. **Occupancy:** prices.csv booking status, `reports/2026-10-23/kpi_pack.json` (market occupancy) and `reservations.csv` (cancellations). **Changes:** PriceLabs `get_user_logs` 22–23 Oct for all 5 listings returned **0 entries**, and I compared against the 22 Oct snapshot. `data/policy.json` applies: P06 blocks are intentional and excluded; P08 nights after 13 Nov are handback and not inventory; P14 is numbers only; P05 is benchmarked as a 4-bed; P11 sells on Booking.com only.

**These are Nearby Listings percentiles, not comps.** `get_neighborhood_data_sources` (P05) still says "Competitor Listings source is not enabled for this account" and "No Market Dashboard reports available". OTA checks are **NOT CHECKED**: the agent proxy rejects airbnb.co.uk and booking.com (connect_rejected). No comps were invented and no rows were added to `comps.csv`. That means there is no comp median, no rating gap and no review-count gap. The "median" below is the same-bedroom Nearby Listings P50. The same-BR rows were appended to `data/snapshots/2026-10-23/market.csv`; the other agents' rows (P01, P04, P09, P10, P12, P13, P20) were kept.

**Stay dates (the same for every listing):** midweek Tue 27 to Thu 29 Oct (nights 27, 28); weekend Fri 30 Oct to Sun 1 Nov (nights 30, 31); 30 days out Sun 22 Nov. For P11 I also cover 18–27 Nov, the nights reopened by the cancellation. 23 Oct is not in prices.csv (it starts 24 Oct), so the 23 Oct status in the windows comes from the neighbourhood payload.

**Method (unchanged):** same-BR means the `summary_table` row for our bedroom count. The daily band is P25/P50/P75/P90 for the payload's bedroom range, which mixes bedroom counts. Fee structure is "Host-only fee" and `cleaning_fee` is null, so whether the percentiles include cleaning is unknown; our prices exclude cleaning. Percentiles are linearly interpolated, and `recommend` gets "<P25" as 0.20 and ">P90" as 0.95. `quality_premium(None, None)` = 0.0, because our ratings are blank in `listings.csv` and there are no comp ratings. Sellable nights = open + booked, with blocked nights excluded. Windows: next 30 = 23 Oct–21 Nov; next 60 = 23 Oct–21 Dec (P08: 23 Oct–13 Nov).

## Summary

| Ref | Same-BR P25/P50/P75/P90 (n) | Open avg next 30 (open / sellable) | Open avg next 60 | Booked vs market 30d | Since 22 Oct | `recommend` 30d / 60d |
|---|---|---|---|---|---|---|
| P05 (4 BR) | 498/614/723/1149 (90) | £476 <P25, -22% (9 / 29) | £549 = P36, -11% (24 / 59) | 69.0% vs 38% | flat (median open -0.2%, n=24) | raise +10% / raise +10% |
| P06 (2 BR) | 323/415/542/685 (216) | £331 = P27, -20% (3 / 16) | same 3 nights | 81.2% vs 43% (blocks excluded) | 6 Nov +33% (281 -> 375), not logged | raise +10% (3 nights) |
| P08 (2 BR) | 184/225/281/343 (149) | £179 <P25, -20% (13 / 22, to 13 Nov) | n/a (handback) | 40.9% vs 50% kpi / 59.1% ND | **open nights -5.4% (n=13), 6 Nov -27.5%, not logged** | fix-listing, hold |
| P11 (2 BR) | 243/306/361/409 (171) | as PriceLabs sees it: £234 <P25 (11 / 30); **with the cancellation: £244 = P25, -20% (14 / 30)** | with the cancellation: £290 = P43, -5% (27 / 60) | **53.3% vs 45% (with the cancellation)**; PriceLabs/kpi still show 62–63% | open median -1.3% (n=19), not logged | **raise +5%** (was +10%) / raise +10% |
| P14 (1 BR) | 152/203/253/298 (173) | £501 >P90, +147% (30 / 30) | £523 >P90, +157% | 0% vs 40% | median 0.0% | special setup: numbers only |
| P17 (1 BR) | none | NOT IN SYSTEMS | n/a | n/a | n/a | collect-data |

## P11 Camden 2-bed (3064196): Booking.com only, 19–27 Nov reopened

**PriceLabs has not picked up the cancellation.** `reservations.csv` (Smoobu, 05:55Z) lists the Booking.com stay 19–27 Nov (8 nights, £1,736.41, booked 19 Sep) as `cancelled`. PriceLabs, pulled about 15 minutes later, still has it as a booking:
- `raw/prices_3064196.json` (06:11Z) shows 19–26 Nov as `Booked`, `booked_date` 2026-09-19, ADR 180.88, `available` False.
- The neighbourhood payload's `upcoming_bookings` still includes 19–26 Nov.

So the kpi_pack forward occupancy for P11 (62.1% next 30, 67.8% next 60) is overstated. Counting those nights as open gives **53.3% (16 / 30) and 55.0% (33 / 60)**. Whether the Smoobu and Booking.com calendars are open for these nights is NOT CHECKED.

| Night | Ours today (22 Oct) | Status in PriceLabs | Daily band 1–3 BR | Band pct | 2 BR pct (vs P50) |
|---|---|---|---|---|---|
| 27 Oct | 213 (214) | Booked, ADR 152 | 227/273/337/404 | <P25 | <P25 (-30%) |
| 28 Oct | **214** (218) | Open, min 2 | 222/273/335/401 | <P25 | <P25 (-30%) |
| 30 Oct | **215** (218) | Open, min 2 | 229/277/342/436 | <P25 | <P25 (-30%) |
| 31 Oct | **226** (230) | Open, min 2 | 224/277/348/423 | P26 | <P25 (-26%) |
| 18 Nov | **314** (318) | Open, **min 1** | 218/273/355/394 | P62 | P54 (+3%) |
| 19 Nov | 255 (256) | "Booked" (cancelled), min 3 | 226/283/363/428 | P38 | P30 (-17%) |
| 20 Nov | 294 (295) | "Booked" (cancelled), min 3 | 240/311/389/493 | P44 | P45 (-4%) |
| 21 Nov | 289 (320) | "Booked" (cancelled), min 3 | 230/296/391/466 | P47 | P43 (-6%) |
| 22 Nov | 264 (266) | "Booked" (cancelled), min 3 | 218/275/370/406 | P45 | P33 (-14%) |
| 23 Nov | 259 (272) | "Booked" (cancelled), min 3 | 215/273/372/420 | P44 | P31 (-15%) |
| 24 Nov | 280 (279) | "Booked" (cancelled), min 3 | 221/275/371/423 | P51 | P40 (-8%) |
| 25 Nov | 298 (296) | "Booked" (cancelled), min 2 | 225/279/370/438 | P55 | P47 (-3%) |
| 26 Nov | 313 (314) | "Booked" (cancelled), min 2 | 237/297/383/460 | P55 | P53 (+2%) |
| 27 Nov | **589** (590) | Open, **min 1** | 254/307/388/522 | **>P90** | >P90 (+92%) |

- **The reopened run:** 18–27 Nov is now 10 consecutive open nights (14–17 Nov and 28 Nov–11 Dec are still booked). Today's PriceLabs prices on those nights add up to **£3,155** (19–26 Nov alone: £2,252, about £282/night), against £1,736.41 (£217/night) on the cancelled stay. On the daily band, 19–26 Nov sit at P38–P55. Market occupancy for 18–27 Nov is 24–48% (average 35.5%, neighbourhood daily), so this is a soft midweek-heavy period. Days until arrival: 26 (P11 median lead time is 28 days).
- **The two edge nights still carry orphan settings:** 18 Nov (£314, min 1) and 27 Nov (£589, min 1, >P90, +92% vs median) were single nights between bookings. PriceLabs does not yet know they are part of a 10-night gap, so its gap and min-stay logic still treats them as isolated nights. When PriceLabs registers the cancellation the prices and min-stays should recompute. If they do not, 27 Nov at >P90 will block 8–9-night stays ending on the 28th. This needs a re-check after the next sync.
- **Since 22 Oct:** open nights -1.3% (median, n=19), with no user change logged. 21 Nov fell 320 -> 289 (it still shows as booked).
- **Position:** with the cancellation counted, the 30-day open average is £244 = P25 (-20%) and the 60-day is £290 = P43 (-5%). As before, the percentiles are Airbnb-derived while Camden sells only on Booking.com at 1.2 x PriceLabs before Mobile 10% and Genius 10% (`policy.json`). £244 x 1.2 = £293 = P45, so the like-for-like position is somewhere between P25 and about P45.
- **Supported positioning:** with the cancellation counted, `recommend(0.533, 0.45, 0.25)` returns **raise +5%** ("in line with market but priced below what quality supports (P25)"). £244 x 1.05 = £256, **about -16% vs the 2 BR median**. As PriceLabs currently sees it, `recommend(0.633, 0.45, 0.20)` gives raise +10%, but that rests on 3 nights that are no longer booked. For 60 days, `recommend(0.55, 0.38, 0.43)` returns raise +10%: £290 x 1.10 = £318, about +4%. Reasoning: the cancellation cuts the 30-day lead over the market from +18 to +8 points and there were no bookings in the last 7 days, so only a small step on the near-term <P25 nights (28 Oct–2 Nov, 10–13 Nov) is supported. The reopened 19–26 Nov nights are already around the daily median for a soft week and should not be raised.
- **Differentiators:** basement, no lift and no parking justify a discount. The patio and the Camden Town location help. The Booking.com Visibility Booster at 18% from 1 Nov is policy and not a pricing issue.

## P05 St John's Wood 4-bed (3166592)

Same-BR 4 BR, n=90: 498 / 614 / 723 / 1149 (22 Oct: 495/612/718/1155). The daily band is 3–5 BR (350 listings, 248 of them 3-beds), so it understates a 4-bed.

| Night | Ours today (22 Oct) | Status | Daily band 3–5 BR | Band pct | 4 BR pct (vs P50) |
|---|---|---|---|---|---|
| 27 Oct | 357 (354) | Blocked (reason unknown) | 354/432/585/750 | P26 | <P25 (-42%) |
| 28 Oct | **399** (412) | Open, min 2 | 354/439/592/750 | P38 | <P25 (-35%) |
| 30 Oct | **406** (410) | Open, min 2 | 359/453/626/778 | P38 | <P25 (-34%) |
| 31 Oct | 342 (345) | Booked (check-in) | 358/436/593/753 | <P25 | <P25 (-44%) |
| 22 Nov | 581 (578) | Booked (check-in) | 385/490/644/796 | P65 | P43 (-5%) |

- **Since 22 Oct:** flat. Median +0.2% across all nights (n=59) and -0.2% on open nights (n=24); 28 Oct is -3.2%. No logged change, base still £550, no booking-status change.
- **Position:** 30-day open average £476 <P25 (-22%); 60-day £549 = P36 (-11%). Booked 69.0% vs 38% for the market (next 30) and 59.3% vs 36% (next 60). Pickup in the last 7 days: 1 booking, 7 nights, £4,528 (kpi_pack).
- **Open nights:** 28–30 Oct £399–417, 6–9 Nov £440–622, 16–17 Nov £448–497, 29 Nov–2 Dec, 7–8 Dec, 13–21 Dec.
- **Supported positioning:** `recommend(0.69, 0.38, 0.20)` returns **raise +10%**: £476 x 1.10 = £523, **about -15% vs the 4 BR median**. For 60 days, `recommend(0.593, 0.36, 0.36)` returns raise +10%: £549 x 1.10 = £604, about -2%. Reasoning: it books at about 1.8x the market rate while sitting in the bottom third of 4-beds, so a discount of roughly 15% is supported, not 22%. This is subject to the 26 Oct base review in `policy.json`.
- **Differentiators:** no lift, 4 floors and no parking justify some discount. Abbey Road, Lord's, 2 bath + WC and sleeping 8 argue against a large one.

## P06 Marylebone 2-bed (3288517): intentional blocks excluded

| Night | Ours today (22 Oct) | Status | Daily band 1–3 BR | Band pct | 2 BR pct (vs P50) |
|---|---|---|---|---|---|
| 27 Oct | 318 (325) | Booked, ADR 178 | 303/365/471/576 | P31 | <P25 (-23%) |
| 28 Oct | 323 (324) | Booked, ADR 178 | 309/369/477/580 | P31 | P25 (-22%) |
| 30 Oct | 343 (347) | Booked, ADR 178 | 303/379/485/598 | P38 | P30 (-17%) |
| 31 Oct | 334 (337) | Booked, ADR 178 | 298/371/482/600 | P37 | P28 (-20%) |
| 22 Nov | n/a | Blocked (policy) | n/a | n/a | n/a |

- **Open nights in the next 60 days:** still only 5–7 Nov, now £336 / **£375** / £282, average £331 = P27 (-20%). **6 Nov rose 281 -> 375 (+33%)** with no logged change; yesterday 5 Nov did the same. Demand with blocks excluded: 13 of 16 sellable nights booked (81.2%) vs 43% for the market.
- **Supported positioning:** `recommend(0.812, 0.43, 0.27)` returns **raise +10%**: £331 x 1.10 = £364, about -12% vs the 2 BR median. Only 3 nights are affected. Reasoning: high conversion on the few unblocked nights while priced around P27.
- **Differentiators:** 2nd floor with no lift, street view and no parking explain part of the gap. The Marylebone Village location supports a price closer to the median.

## P08 Islington 2-bed (3318167): sellable to 13 Nov only (handback)

| Night | Ours today (22 Oct) | Status | Daily band 1–3 BR | Band pct | 2 BR pct (vs P50) |
|---|---|---|---|---|---|
| 27 Oct | **166** (176) | Open, min 2 | 172/213/261/342 | <P25 | <P25 (-26%) |
| 28 Oct | **168** (177) | Open, min 2 | 172/209/261/340 | <P25 | <P25 (-25%) |
| 30 Oct | **171** (180) | Open, min 2 | 170/220/270/338 | P26 | <P25 (-24%) |
| 31 Oct | **176** (186) | Open, min 2 | 173/215/272/338 | P27 | <P25 (-22%) |
| 22 Nov | n/a | After handback (policy) | n/a | n/a | n/a |

- **Since 22 Oct:** every open night fell, **-5.4% median (n=13)**, -5% to -6.6% on 26 Oct–4 Nov, and **6 Nov fell 280 -> 203 (-27.5%)**. There is no user log entry (0 entries 22–23 Oct). This is the second day running: -3.6% yesterday, so roughly -9% in 2 days. The cause is not visible in the data I have; it is consistent with PriceLabs last-minute or occupancy logic but that is not verified.
- **Position:** 13 open nights 26 Oct–7 Nov, average £179 <P25 (-20%). 9 of 22 sellable nights are booked (40.9%) vs 50% (kpi_pack, to 21 Nov) or 59.1% (neighbourhood daily, 1–3 BR, 23 Oct–13 Nov). Pickup in the last 7 days: 1 booking, 6 nights.
- **Supported positioning:** `recommend(0.409, 0.50, 0.20)` returns **fix-listing, 0%** ("behind market -9% while already at P20: conversion/visibility problem, not price"). The 60-day call returns raise +5%, but it uses a market window to 21 Dec that lies outside the handback window, so it does not apply. Reasoning: it is already in the bottom quartile and still booking behind the market with 3 weeks left, so further cuts are not supported by the evidence; hold price and look at visibility.
- **Differentiators:** the ground-floor terrace is a plus. Sleeping 5, a 1st-floor bedroom and no parking are minuses.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

- **Same-BR:** 1 BR, n=173: 152 / 203 / 253 / 298. The 2 BR row is 249/287/370/475.
- **Price:** £500 on every stay date (27, 28, 30, 31 Oct, 22 Nov). That is >P90: +146% vs the median and +68% vs P90.
- **Open average:** £501 next 30 days (+147%), £523 next 60 (+157%).
- **Occupancy:** 0% booked in the next 30 and 60 days vs 40% and 38% for the market. 67% of open nights are at the £500 minimum (kpi_pack).
- **Day on day:** median 0.0% (n=59). 21 Nov fell 579 -> 534 and 21 Dec fell 598 -> 522.
- No positioning recommendation, per `policy.json`.

## P17 St John's Wood 1-bed

**NOT IN SYSTEMS.** `get_listings(search_query="St John's Wood")` returned 0 listings today, and kpi_pack says "No priced PriceLabs listing mapped". Listed facts (properties.py): 1-bed, sleeps 4, 2nd floor, no lift, no balcony, no parking.

## Changes since 22 Oct (this batch)
1. **P11:** the 19–27 Nov Booking.com cancellation is in Smoobu but not yet in PriceLabs as of 06:11Z. With those nights counted as open, the 30-day position drops from +18 to +8 points vs the market, and `recommend` from raise +10% to **raise +5%**. 18–27 Nov is a 10-night open run whose edge nights (18 and 27 Nov) still carry min 1, and 27 Nov is £589 (>P90).
2. **P08:** a second unlogged drop on open nights (-5.4% median; 6 Nov -27.5%). Still fix-listing / hold.
3. **P06:** 6 Nov +33% (unlogged).
4. **P05:** flat; still raise +10%.
5. **P14:** at the £500 floor; two later nights eased.
6. PriceLabs user logs show no changes 22–23 Oct for P05, P06, P08, P11 or P14.

## Data gaps:
1. No individual comps. Competitor Listings is not enabled, there are no Market Dashboard reports, and include_competitors returned no listing rows. So there are no comp ids, comp median, ratings, review counts, Superhost flags or cancellation policies, and `comps.csv` has no rows from this batch.
2. OTA checks (Airbnb, Booking.com): NOT CHECKED. The agent proxy rejects both hosts.
3. Our ratings and review counts are blank in `listings.csv`, so `quality_premium` = 0 and the rating and review gaps are unknown.
4. P11: PriceLabs has not registered the 19–27 Nov cancellation, and whether the Smoobu and Booking.com calendars are open for those nights is NOT CHECKED. kpi_pack forward occupancy for P11 is overstated until the next sync.
5. Unlogged algorithmic moves: P08 -5.4% on open nights (6 Nov -27.5%), P06 6 Nov +33%. The cause needs the PriceLabs price breakdown.
6. P08 market occupancy differs by source: 50% (kpi, to 21 Nov) vs 59.1% (neighbourhood daily, 1–3 BR, to 13 Nov). Both give fix-listing.
7. The same-BR `summary_table` has no stated date horizon, the daily bands mix bedroom counts, and it is unknown whether cleaning is included. P11's percentiles are Airbnb-derived while it sells only on Booking.com.
8. 23 Oct is missing from prices.csv; its status came from the neighbourhood payload.
9. P17 is not connected, so there is no data at all. The P05 27 Oct one-night block still has no stated reason.
