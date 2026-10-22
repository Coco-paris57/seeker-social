# Competitor positioning: CENTRAL/NORTH (D = 2026-10-22)

**Market source:** PriceLabs `get_neighbourhood_data` (Nearby Listings, Airbnb-derived, read-only; mode=detail, include_prices), pulled 2026-10-22, one call per listing. Extracts are in `data/snapshots/2026-10-22/raw/neighbourhood_<ref>.json`. **Our prices:** `data/snapshots/2026-10-22/prices.csv` (`pricelabs_price`; it matches the PriceLabs `final_price` in the neighbourhood payload on every date checked). **Occupancy:** `reports/2026-10-22/kpi_pack.json` and prices.csv booking status. **Changes:** PriceLabs `get_user_logs` 21–22 Oct and the 21 Oct snapshot (same stay dates). `data/policy.json` applies: P06 blocks are intentional and excluded; P08 nights after 13 Nov (handback) are not inventory; P14 is numbers only; P05 is benchmarked as a 4-bed; P11 sells on Booking.com only.

**Nearby Listings percentiles only, not comps.** `get_neighborhood_data_sources` (P05) again returns "Competitor Listings source is not enabled for this account" and "No Market Dashboard reports available". OTA checks: **NOT CHECKED**. No comps were invented and no rows were added to `comps.csv`. So there is no comp median, rating gap or review-count gap; the "median" below is the same-bedroom Nearby Listings P50. The same-BR rows were appended to `data/snapshots/2026-10-22/market.csv`.

**Stay dates (the same for every listing):** weekend Fri 23 to Sun 25 Oct (nights 23, 24); midweek Tue 27 to Thu 29 Oct (nights 27, 28); 30 days out Sat 21 Nov. 17–20 Nov are kept for comparison with yesterday.

**Method (unchanged from 21 Oct):** same-BR = `summary_table` row for our bedroom count (date horizon not stated). Daily band = P25/P50/P75/P90 for the payload's bedroom range (mixes bedroom counts). Fee structure "Host-only fee", `cleaning_fee` null, so whether percentiles include cleaning is unknown; our prices exclude cleaning. Percentile = linear interpolation; `recommend` gets "<P25" as 0.20 and ">P90" as 0.95. `quality_premium` = 0.0 (our ratings blank in `listings.csv`, no comp ratings). Sellable nights = open + booked, blocked excluded. Windows: next 30 = 22 Oct–20 Nov, next 60 = 22 Oct–20 Dec (P08: 22 Oct–13 Nov).

## Summary

| Ref | Same-BR P25/P50/P75/P90 (n) | Open avg next 30 (open / sellable nights) | Open avg next 60 | Booked (sellable) vs market 30d | Same dates vs 21 Oct | `recommend` 30d / 60d |
|---|---|---|---|---|---|---|
| P05 (4 BR) | 495/612/718/1155 (89) | £479 <P25 (-22%) (9 / 28) | £541 = P35 (-12%) (23 / 58) | 67.9% vs 38% | -0.3% all, -0.4% open (flat) | raise +10% / raise +10% |
| P06 (2 BR) | 322/416/545/684 (215) | £300 <P25 (-28%) (3 / 16) | same 3 nights | 81.2% vs 42% (blocks excluded) | 5 Nov +33% (253 -> 336), other 2 flat | raise +10% (3 open nights only) |
| P08 (2 BR) | 183/224/278/346 (146) | £193 = P31 (-14%) (13 / 22, to 13 Nov) | n/a (handback) | 40.9% vs 49% (kpi) / 59.6% (ND, same window) | -3.6% open (median, n=13) | **fix-listing, hold price** (was raise +5%) |
| P11 (2 BR) | 243/306/359/409 (171) | £237 <P25 (-22%) (11 / 29) | £294 = P45 (-4%) (19 / 59) | 62.1% vs 45% | +3.3% open (median, n=19) | raise +10% / raise +10% |
| P14 (1 BR) | 152/203/249/300 (173) | £500 >P90 (+146%) (29 / 29) | £523 >P90 (+158%) | 0% vs 41% | 0.0% median | special setup: numbers only |
| P17 (1 BR) | none | NOT IN SYSTEMS | n/a | n/a | n/a | collect-data |

**PriceLabs user logs 21–22 Oct (this batch):** one change: **P11 DSO 13–18 Dec, +20% (percent type), min stay 2**, reyhan@ at 2026-10-21T10:12Z (the darts nights in `policy.json`). It landed after yesterday's pull, so it shows up today (below). No logged changes to P05, P06, P08 or P14.

## P05 St John's Wood 4-bed (3166592)

Same-BR 4 BR, n=89: 495 / 612 / 718 / 1155 (21 Oct: 483/591/713/1146, so the median is up 3.6%). The daily band is 3–5 BR (350 listings, 249 of them 3-beds), so it understates a 4-bed.

| Night | Ours today (21 Oct) | Status | Daily band 3–5 BR | Band pct | 4 BR pct (vs P50) |
|---|---|---|---|---|---|
| 23 Oct | 329 (335) | Booked, ADR 414 | 372/450/636/813 | <P25 | <P25 (-46%) |
| 24 Oct | 350 (347) | Booked, ADR 414 | 375/451/629/795 | <P25 | <P25 (-43%) |
| 27 Oct | 354 (361) | Blocked (1 night, reason unknown) | 353/432/578/750 | P25 | <P25 (-42%) |
| 28 Oct | **412** (423) | Open, min 2 | 353/441/585/751 | P42 | <P25 (-33%) |
| 17 Nov | **504** (505) | Open, min 2 | 360/448/606/762 | P59 | P27 (-18%) |
| 18 Nov | 497 (501) | Booked (check-in) | 365/460/612/762 | P56 | P25 (-19%) |
| 19 Nov | 563 (549) | Booked, ADR 459 | 369/478/631/785 | P64 | P40 (-8%) |
| 20 Nov | 637 (631) | Booked, ADR 459 | 386/495/662/783 | P71 | P56 (+4%) |
| 21 Nov | 662 (663) | Booked, ADR 459 | 392/507/664/805 | P75 | P62 (+8%) |

- **Since 21 Oct:** prices are flat: -0.3% median on all dates (n=59), -0.4% on open nights (n=23); the biggest move is 28 Oct, -2.6%. Base is still £550 (`recommended_base` £464). No booking-status change on any of the next 60 nights, so the 21 Oct cover photo/title change has no visible booking effect yet (one day only).
- **Position:** the 30-day open average moved from £483 = P25 (-18%) to £479 <P25 (-22%). That shift comes mostly from the market: the 4 BR median rose from 591 to 612, while our prices hardly moved. 60 days: £541 = P35 (-12%).
- **Open nights:** 28–30 Oct £410–419 (inside the last-minute window), 6–9 Nov £437–618, 16–17 Nov £452–504, then 29 Nov–2 Dec, 7–8 Dec, 13–20 Dec.
- **Demand:** 67.9% of sellable nights in the next 30 days are booked vs 38% for the market (1 blocked night excluded). Next 60 days: 60.3% vs 36%. Pickup in the last 7 days: 1 booking, 7 nights, £4,528.
- **Supported positioning:** `recommend(0.679, 0.38, 0.20)` returns **raise +10%** ("booked +30% vs market but priced at P20: under-priced"). £479 x 1.10 = £526, which is **about -14% vs the 4 BR median**. For 60 days, `recommend(0.603, 0.36, 0.35)` returns raise +10%: £541 x 1.10 = £595, about -3%. Reasoning: it books at about 1.8x the market rate but sits in the bottom third of 4-beds, so a discount of roughly 10–14% is supported, not 22%. This is subject to the 26 Oct base review in `policy.json`.
- **Differentiators:** no lift, 4 floors and no parking justify some discount. Abbey Road, Lord's and Regent's Park, 2 bath + WC and sleeping 8 argue against a large one.

## P06 Marylebone 2-bed (3288517): intentional blocks excluded

| Night | Ours today (21 Oct) | Status | Daily band 1–3 BR | Band pct | 2 BR pct (vs P50) |
|---|---|---|---|---|---|
| 23 Oct | 280 (295) | Booked, ADR 211 | 315/383/498/597 | <P25 | <P25 (-33%) |
| 24 Oct | 306 (313) | Booked, ADR 211 | 316/384/488/608 | <P25 | <P25 (-26%) |
| 27 Oct | 325 (325) | Booked, ADR 178 | 299/364/470/571 | P35 | P26 (-22%) |
| 28 Oct | 324 (329) | Booked, ADR 178 | 304/365/473/574 | P33 | P26 (-22%) |
| 17–21 Nov | n/a | Blocked (policy) | n/a | n/a | n/a |

- **Open nights in the next 60 days:** still only 5–7 Nov, now £336 / £281 / £282, average £300 = <P25 (-28%). **5 Nov rose 253 -> 336 (+33%)** with no logged user change; 6 and 7 Nov are flat. The cause is not visible in the data I have (no log entry).
- **Demand, blocks excluded:** 13 of 16 sellable nights in the next 30 days are booked (81.2%) vs 42% for the market. 43 of the next 60 nights are blocked by policy.
- **Positioning:** `recommend(0.812, 0.42, 0.20)` returns **raise +10%**. £300 x 1.10 = £330, about -21% vs the 2 BR median. Only 3 nights are affected, so little revenue is at stake. Reasoning: high conversion on the few unblocked nights while priced in the bottom quartile.
- **Differentiators:** 2nd floor with no lift, street view and no parking explain part of the gap. The Marylebone Village and Regent's Park location supports a price closer to the median.

## P08 Islington 2-bed (3318167): sellable to 13 Nov only (handback)

| Night | Ours today (21 Oct) | Status | Daily band 1–3 BR | Band pct | 2 BR pct (vs P50) |
|---|---|---|---|---|---|
| 23 Oct | 165 (170) | Booked, ADR 157 | 176/216/272/352 | <P25 | <P25 (-26%) |
| 24 Oct | 169 (175) | Booked, ADR 157 | 175/213/267/349 | <P25 | <P25 (-25%) |
| 27 Oct | **176** (182) | Open, min 2 | 170/205/257/340 | P29 | <P25 (-21%) |
| 28 Oct | **177** (185) | Open, min 2 | 171/206/257/337 | P29 | <P25 (-21%) |
| 17–21 Nov | n/a | After handback (not inventory, per policy) | n/a | n/a | n/a |

- **Handback:** `policy.json` now says the last night is 13 Nov. Yesterday's "unexplained Smoobu block from 14 Nov" is explained by this and is no longer a gap. Nights after 13 Nov are excluded and nothing is proposed for them. The 30-day and 60-day windows are therefore the same: 22 Oct–13 Nov.
- **Since 21 Oct:** open nights fell 3.6% (median, n=13) with no user change logged; the drops on 26 Oct–4 Nov are 2.6–4.9%. **5 Nov fell 233 -> 184 (-21%)**, cause unknown. 6–7 Nov rose about 4% (to £280 / £277; PriceLabs lists 6–7 Nov as an event). No booking-status changes.
- **Open nights:** 26 Oct–7 Nov (13 nights), average £193 = **P31 (-14%)** against 2 BR. 26 Oct–5 Nov are £160–186, which is <P25 of 2 BR.
- **Demand:** 9 of 22 sellable nights booked (40.9%). The market figure depends on the source: kpi_pack (PriceLabs) gives 49% for next 30 days (to 20 Nov), and the neighbourhood daily occupancy for 22 Oct–13 Nov (1–3 BR band) gives 59.6%. Pickup in the last 7 days: 1 booking, 6 nights.
- **Positioning:** with either market figure, `recommend` returns **fix-listing, 0%**: `recommend(0.409, 0.49, 0.31)` gives "behind market -8% while already at P31: conversion/visibility problem, not price", and with 0.596 the gap is -19%. Yesterday's result was raise +5% (43.5% vs 48%). The change is a threshold crossing: the lead moved from -4.5% to -8% because the 21 Oct booked night dropped out of the window and the market moved 48% -> 49%. No booking was lost. Reasoning: already below the median and booking slightly behind the market for the 3 weeks left, so a further cut is not supported and a rise is no longer supported either; hold.
- **Differentiators:** the ground-floor terrace is a plus. Sleeping 5, a 1st-floor bedroom and no parking are minuses.

## P11 Camden 2-bed (3064196): Booking.com only

| Night | Ours today (21 Oct) | Status | Daily band 1–3 BR | Band pct | 2 BR pct (vs P50) |
|---|---|---|---|---|---|
| 23 Oct | 204 (193) | Booked, ADR 152 | 230/280/348/447 | <P25 | <P25 (-33%) |
| 24 Oct | 211 (201) | Booked, ADR 152 | 238/281/353/435 | <P25 | <P25 (-31%) |
| 27 Oct | 214 (205) | Booked, ADR 152 | 220/272/336/398 | <P25 | <P25 (-30%) |
| 28 Oct | **218** (208) | Open, min 2 | 218/273/335/397 | P25 | <P25 (-29%) |
| 17 Nov | 232 (231) | Booked, ADR 191 | 211/262/348/389 | P35 | <P25 (-24%) |
| 18 Nov | **318** (318) | Open, min 1 | 218/271/354/393 | P64 | P56 (+4%) |
| 19 Nov | 256 (257) | Booked (check-in) | 225/283/362/428 | P38 | P30 (-16%) |
| 20 Nov | 295 (324) | Booked, ADR 181 | 236/305/390/486 | P46 | P46 (-4%) |
| 21 Nov | 320 (320) | Booked, ADR 181 | 228/294/390/462 | P57 | P57 (+5%) |

- **Since 21 Oct:** open nights rose 3.3% (median, n=19). 28 Oct–2 Nov rose 2.7–4.8%, with no user change logged. **13–18 Dec rose 7.4–10.2%** (to £332 / 306 / 311 / 323 / 339 / 390), which matches the logged DSO (+20%, min 2). The darts nights 13–17 Dec now average £322; `policy.json` says above £300, consistent. 11 open nights to 20 Nov; 27 Nov (£590, min 1) and 18 Nov (£318, min 1) are unchanged.
- **Position:** 30 days: open average £237, <P25 (-22%). 60 days: £294 = P45 (-4%). The 60-day figure includes the DSO-raised darts nights.
- **Channel caveat:** the percentiles are Airbnb-derived. Camden sells only on Booking.com, where the guest price before promotions is 1.2 x PriceLabs (`policy.json`): £237 x 1.2 = £285 = P42 of 2 BR. Mobile 10% and Genius Level 1 10% still apply and stack (Early Booker off since 21 Oct), so eligible guests see less. The like-for-like position is therefore somewhere between <P25 and about P42, not a single number.
- **Demand:** 62.1% booked in the next 30 days vs 45% for the market; 67.8% vs 38% in the next 60. No bookings in the last 7 days. The Booking.com Visibility Booster at 18% from 1 Nov is expected per policy and is not a pricing issue.
- **Positioning:** `recommend(0.621, 0.45, 0.20)` returns **raise +10%**. £237 x 1.10 = £261, about -15% vs the 2 BR median. For 60 days, `recommend(0.678, 0.38, 0.45)` returns raise +10%: £294 x 1.10 = £324, about +6%. Reasoning: it books ahead of the market but sits in the bottom quartile on near-term nights. Note that 7 days with no pickup is a counter-signal to watch, and the 30-day raise should apply to near-term open nights, not the darts nights that were already raised.
- **Differentiators:** basement, no lift and no parking justify some discount. The patio and the Camden Town location help.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

- **Same-BR:** 1 BR, n=173: 152 / 203 / 249 / 300. The 2 BR row is 249/287/367/475.
- **Price:**
  - £500 on 23, 24, 27 and 28 Oct and on 17, 18 and 19 Nov. That is >P90: +146% vs the median and +67% vs P90.
  - 20 Nov is £512 (was £566), 21 Nov is £579 (was £592), and 20 Dec is £522 (was £595, min stay 5 -> 4).
  - Open average: £500 next 30 days, £523 next 60.
- **Occupancy:** 0% in the next 30 and 60 days, vs 41% and 38% for the market. 65% of open nights are at the £500 minimum (kpi_pack).
- **Day on day:** median 0.0% (n=59). Of the nights above the minimum (20 Nov onward), 21 moved: 19 down by 0.3–12.3% and 2 up by 0.4–0.8%.
- No positioning recommendation, per `policy.json`.

## P17 St John's Wood 1-bed

**NOT IN SYSTEMS.** `get_listings(search_query="St John's Wood")` returned 0 listings today, and kpi_pack has no PriceLabs or Smoobu mapping. There are no prices, KPIs or percentiles. Listed facts (properties.py): 1-bed, sleeps 4, 2nd floor, no lift, no balcony, no parking.

## Changes since 21 Oct (this batch)
1. P08: the block after 13 Nov is now explained (handback in `policy.json`); positioning covers 22 Oct–13 Nov only. `recommend` moved from raise +5% to fix-listing / hold, a threshold crossing with no lost booking.
2. P11: the darts DSO (13–18 Dec, +20%) is live, +7–10% on those nights; near-term open nights are also up about 3% (not logged).
3. P05: flat; its percentile fell because the 4 BR median rose 3.6%. No visible booking response yet to the 21 Oct photo/title change.
4. P06: 5 Nov +33% (not logged); the other 2 open nights are flat.
5. P14: unchanged at the £500 floor; some later nights eased.
6. No booking-status changes on any of the next 60 nights for P05, P06, P08, P11 or P14.

## Data gaps:
1. No individual comps. PriceLabs Competitor Listings is not enabled and there are no Market Dashboard reports, so there are no comp ids, comp median, ratings, review counts, Superhost flags or cancellation policies. `comps.csv` has no rows from this batch. All figures are Nearby Listings percentiles.
2. OTA checks (Airbnb, Booking.com): NOT CHECKED.
3. Our ratings and review counts are blank in `listings.csv`, so `quality_premium` = 0 and the rating and review gaps are unknown.
4. Overnight algorithmic moves with no user log: P06 5 Nov +33%, P08 5 Nov -21% and -3.6% on its other open nights, P11 28 Oct–2 Nov +3–5%. The cause needs the PriceLabs price breakdown in the UI.
5. P05: the cause of the 20 Oct algorithmic drop (about -13%) is still not established; there is also the raw-vs-rendered last-minute type mismatch (linear vs Flat) reported yesterday. Neither was re-checked today. The 27 Oct one-night block has no stated reason.
6. P08 market occupancy for the 22 Oct–13 Nov window differs by source (49% kpi to 20 Nov vs 59.6% ND daily, 1–3 BR band). Both give fix-listing.
7. P11: the percentiles are Airbnb-derived while Camden sells only on Booking.com. The guest-facing position depends on the 1.2x markup and on stacked promotions per guest.
8. The same-BR `summary_table` has no stated date horizon, the daily bands mix bedroom counts, and it is unknown whether cleaning is included.
9. P17 is not connected (it is in another account), so there is no data at all.
