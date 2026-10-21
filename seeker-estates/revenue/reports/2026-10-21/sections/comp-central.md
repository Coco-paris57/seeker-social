# Competitor positioning: CENTRAL/NORTH (D = 2026-10-21)

**Market source:** PriceLabs `get_neighbourhood_data` (Nearby Listings, Airbnb-derived, read-only; mode=detail, include_prices), pulled 2026-10-21. Extracts are in `data/snapshots/2026-10-21/raw/neighbourhood_<ref>.json`. **Our prices:** `data/snapshots/2026-10-21/prices.csv` (`pricelabs_price`; it matches the PriceLabs `final_price` in the neighbourhood payload on every date checked, and kpi_pack confirms PriceLabs = Smoobu within £2). **Occupancy:** `reports/2026-10-21/kpi_pack.json`. **Changes:** PriceLabs `get_user_logs` 19–21 Oct, plus the 18, 19 and 20 Oct snapshots. `data/policy.json` applies: P06 blocks are intentional and excluded, P14 is numbers only, and P05 is benchmarked as a 4-bed.

**Still no individual comps.** `get_neighborhood_data_sources` (P05) again returns "Competitor Listings source is not enabled for this account" and "No Market Dashboard reports available". OTAs are blocked: **NOT CHECKED**. No comps were invented and no rows were added to `comps.csv`. **Every figure below is a PriceLabs Nearby Listings bedroom-matched percentile, not a comp**, so there is no comp median, rating gap or review-count gap. The same-BR rows were appended to `data/snapshots/2026-10-21/market.csv`.

**Stay dates (the same for every listing):** weekend Fri 23 to Sun 25 Oct (nights 23 and 24). Midweek Tue 27 to Thu 29 Oct (nights 27 and 28). 30 days out: Fri 20 Nov. 17, 18 and 19 Nov are kept for day-on-day comparison. Today's `prices.csv` starts on 22 Oct, so 21 Oct is taken from the PriceLabs neighbourhood payload only.

**Method (unchanged from 20 Oct):**
- "Same-BR" is the `summary_table` row for our bedroom count. Its date horizon is not stated. The "daily band" mixes bedroom counts.
- Fee structure is "Host-only fee" and `cleaning_fee` is null, so it is unknown whether the percentiles include cleaning. Our prices exclude cleaning.
- Our percentile is linear interpolation between the quantile points. `recommend` gets "<P25" as 0.20 and ">P90" as 0.95.
- `quality_premium` = 0.0 for all, because our ratings are blank in `listings.csv` and there are no comp ratings.
- Window: next 30 = 22 Oct–20 Nov, next 60 = 22 Oct–20 Dec. Day-on-day changes compare the **same stay dates** (to 19 Dec) across snapshots.

## Summary

| Ref | Same-BR P25/P50/P75/P90 (n) | Open avg next 30 (open nights) | Open avg next 60 | Same dates vs 20 Oct snapshot | `recommend` 30d / 60d |
|---|---|---|---|---|---|
| P05 (4 BR) | 483/591/713/1146 (90) | **£483 = P25 (-18%)** (9) | £543 = P39 (-8%) (23) | **+9.5% median, all dates; +9.9% open**: the £550 base went through in full | raise +10% / raise +10% |
| P06 (2 BR) | 318/415/542/677 (214) | £273 <P25 (-34%) (3) | same 3 nights | -0.6% all; -12.2% on the 3 open nights | raise +10% (3 open nights only) |
| P08 (2 BR) | 184/224/275/336 (145) | £200 = P35 (-10.5%) (13) | same 13 nights | -3.5% open; block from 14 Nov (Smoobu) excluded | raise +5% / raise +5% (open nights only) |
| P11 (2 BR) | 241/301/351/410 (171) | £233 <P25 (-23%) (11) | £283 = P43 (-6%) (19) | +0.0% open (flat) | raise +10% / raise +10% |
| P14 (1 BR) | 146/202/249/299 (173) | £502 >P90 (+149%) (30) | £528 >P90 (+161%) | 0.0% | special setup: numbers only |
| P17 (1 BR) | none | NOT IN SYSTEMS | n/a | n/a | collect-data |

**PriceLabs user logs, 19–21 Oct (this batch):** the only change is **P05 base 500 -> 550** on 20 Oct at 09:26:47Z (reyhan@, source "reviewPrices"), pushed 09:27:16Z. Yesterday's snapshot was pulled before the push, so today is the first snapshot that carries £550. There were no logged changes to P06, P08, P11 or P14.

## P05 St John's Wood 4-bed (PriceLabs 3166592): where it sits after the £550 base

Same-BR 4 BR, n=90: 483 / 591 / 713 / 1146 (20 Oct: 473/590/713/1143). The payload still uses a 3–5 BR band (350 listings, 248 of them 3-beds), which is why the daily band understates a 4-bed.

| Night | Ours today (20 Oct / 19 Oct / 18 Oct) | Status | Daily band 3–5 BR | Band pct | 4 BR pct (vs P50) |
|---|---|---|---|---|---|
| 21 Oct | 346 (315/324/295) | Booked (ND only) | 350/428/570/765 | <P25 | <P25 (-41%) |
| 23 Oct | 335 (305/321/292) | Booked, ADR 414 | 366/438/611/803 | <P25 | <P25 (-43%) |
| 24 Oct | 347 (316/321/293) | Booked, ADR 414 | 368/441/609/789 | <P25 | <P25 (-41%) |
| 27 Oct | 361 (330/386/352) | Blocked (1 night, reason unknown) | 352/423/556/752 | P28 | <P25 (-39%) |
| 28 Oct | **423** (386/452/411) | Open, min 2 | 353/426/559/752 | P49 | <P25 (-28%) |
| 17 Nov | **505** (451/533/485) | Open, min 2 | 351/440/583/753 | P61 | P30 (-15%) |
| 18 Nov | 501 (449/534/486) | Booked (check-in) | 362/444/597/753 | P59 | P29 (-15%) |
| 19 Nov | 549 (494/551/502) | Booked, ADR 459 | 369/465/619/782 | P64 | P40 (-7%) |
| 20 Nov | 631 (571/600/547) | Booked, ADR 459 | 387/481/660/785 | P71 | P58 (+7%) |

- **The £550 base passed through in full.** On the same stay dates, today vs 20 Oct is +9.5% median on all dates (n=59) and +9.9% on open nights (n=22). The base ratio is 550/500 = +10%.
- **It only restores the 19 Oct level.** Today vs the 19 Oct snapshot (base £500, before the unexplained 20 Oct drop) is -2.0% on all dates and -5.3% on open nights. Today vs 18 Oct (base £455) is +6.9% on all dates and +4.0% on open nights, while the base is up 20.9%. In other words, the roughly -13% algorithmic move seen on 20 Oct is still in the price. Its cause is still not established.
- **Customizations re-checked today, unchanged:** last-minute -25% within 15 days (raw type "linear", while the dashboard renders it "Flat"), occupancy-based adjustment on (Default profile), demand factor Moderately Aggressive, far-out +30% after 120 days. The open nights 28–30 Oct (£413–423, all <P25 for 4 BR) fall inside the 15-day last-minute window.
- **PriceLabs `recommended_base`** is £464 (20 Oct: £467). The set base of £550 is 19% above it.
- **Position now:**
  - 30 days: the open average is £483 = P25 (-18% vs the 4 BR median), on 9 open nights.
  - 60 days: £543 = P39 (-8%), on 23 open nights.
  - Realised ADR on booked nights in the next 30 days is £399, still <P25. Booked revenue is not affected by the base change.
  - The windows are not identical to yesterday's, so use the same-date changes above rather than comparing yesterday's "£439 <P25 (-26%)" directly.
- **Demand (kpi_pack):** next 30 days 65.5% booked vs 37% for the market. Next 60 days 61% vs 35%. Pickup in 7 days: 1 booking, 7 nights, £4,528. Paid vs price: +4% (no leak).
- **Supported positioning:**
  - 30 days: `recommend(0.655, 0.37, 0.25)` returns **raise +10%** ("booked +29% vs market but priced at P25: under-priced"). £483 x 1.10 = £532, which is **about -10% vs the 4 BR median**.
  - 60 days: `recommend(0.61, 0.35, 0.39)` returns **raise +10%**. £543 x 1.10 = £597, which is about +1%, at the median.
  - Reasoning: it books at about 1.8x the market rate and sits at P25–P39 of 4-beds even after £550, so a discount of about 10% (not 18%) is what the demand evidence supports. This is subject to the 26 Oct base review in `policy.json`.
- **Differentiators:** no lift, 4 floors and no parking justify some discount. Abbey Road, Lord's and Regent's Park, 2 bath + WC and sleeping 8 argue against a large one.

## P06 Marylebone 2-bed (3288517): intentional blocks excluded

| Night | Ours (20 Oct) | Status | Daily band 1–3 BR | Band pct | 2 BR pct (vs P50) |
|---|---|---|---|---|---|
| 21 Oct | 250 (275) | Open (ND only) | 303/357/470/561 | <P25 | <P25 (-40%) |
| 23 Oct | 295 (311) | Booked, ADR 211 | 310/377/483/580 | <P25 | <P25 (-29%) |
| 24 Oct | 313 (323) | Booked, ADR 211 | 309/377/478/591 | P26 | <P25 (-25%) |
| 27 Oct | 325 (329) | Booked, ADR 178 | 292/358/460/564 | P38 | P27 (-22%) |
| 28 Oct | 329 (317) | Booked, ADR 178 | 297/361/460/562 | P38 | P28 (-21%) |
| 17–20 Nov | n/a | Blocked (policy) | n/a | n/a | n/a |

- **Open nights in the next 60 days:** only 5–7 Nov, at £253 / £281 / £285, average £273 = <P25 (-34%). These fell 12.2% overnight (median, n=3). No user change was logged.
- **Demand, blocks excluded:** 82.4% of the unblocked nights in the next 30 days are booked, vs 42% for the market. In the next 60 days, 43 nights are blocked by policy.
- **Positioning:** `recommend(0.824, 0.42, 0.20)` returns **raise +10%** ("booked +40% vs market but priced at P20"). Only 3 nights are affected, so little revenue is at stake. Reasoning: high conversion on the few unblocked nights while priced in the bottom quartile.
- **Differentiators:** 2nd floor with no lift, street view and no parking explain part of the gap. The Marylebone Village and Regent's Park location supports a price closer to the median.

## P08 Islington 2-bed (3318167)

| Night | Ours (20 Oct) | Status | Daily band 1–3 BR | Band pct | 2 BR pct (vs P50) |
|---|---|---|---|---|---|
| 21 Oct | 162 (169) | Booked (ND only) | 169/203/255/323 | <P25 | <P25 (-28%) |
| 23 Oct | 170 (181) | Booked, ADR 157 | 175/213/269/341 | <P25 | <P25 (-24%) |
| 24 Oct | 175 (185) | Booked, ADR 157 | 175/210/265/337 | P25 | <P25 (-22%) |
| 27 Oct | 182 (191) | Open | 171/202/251/333 | P34 | <P25 (-19%) |
| 28 Oct | 185 (197) | Open | 171/202/255/332 | P36 | P26 (-17%) |
| 17 Nov | 223 (196) | Blocked (Smoobu block, excluded; not bookable) | 158/196/245/320 | P64 | P49 (0%) |
| 18 Nov | 227 (200) | Blocked (Smoobu block, excluded; not bookable) | 158/197/246/323 | P65 | P51 (+1%) |
| 19 Nov | 251 (201) | Blocked (Smoobu block, excluded; not bookable) | 163/204/253/320 | P74 | P63 (+12%) |
| 20 Nov | 294 (227) | Blocked (Smoobu block, excluded; not bookable) | 165/207/261/337 | P82 | P80 (+31%) |

- **Smoobu block from 14 Nov 2026 to 30 Jun 2028.** The dispatcher verified it in the Smoobu API: created 19 Oct, reason unknown, awaiting Corentin. PriceLabs first shows it in today's pull (14 Nov–20 Dec in this snapshot).
  - Per the dispatcher, **these nights are not lost demand and are excluded**. P08 is positioned on its open nights only.
  - On the blocked nights the PriceLabs price rose about 25–30% (14 Nov: 236 -> 271). They are not bookable, so this has no revenue effect.
- **Open nights** (13 nights, 26 Oct–7 Nov): average £200 = **P35 (-10.5%)** against 2 BR. They moved -3.5% overnight (median). The base is unchanged at £250, and no user change was logged.
- **Demand, block excluded:** in the next 30 days, 43.5% of unblocked nights are booked vs 48% for the market. Over the next 60 days it is 10 of 23 unblocked nights (43.5%) vs 43%. With the block counted, the figure would be 34.5%; that is shown for reference only and is not used.
- **Positioning:** `recommend(0.435, 0.48, 0.35)` returns **raise +5%** ("in line with market but priced below what quality supports (P35)"). The 60-day result is the same: `recommend(0.435, 0.43, 0.35)` returns raise +5%. £200 x 1.05 = £210, which is about -6% vs the 2 BR median. Reasoning: once the block is excluded, it books in line with the market while sitting at P35, so a small step up is supported and a cut is not.
- **Differentiators:** the ground-floor terrace is a plus. Sleeping 5, a 1st-floor bedroom and no parking are minuses.

## P11 Camden 2-bed (3064196)

| Night | Ours (20 Oct) | Status | Daily band 1–3 BR | Band pct | 2 BR pct (vs P50) |
|---|---|---|---|---|---|
| 21 Oct | 179 (174) | Booked (ND only) | 212/250/325/415 | <P25 | <P25 (-41%) |
| 23 Oct | 193 (186) | Booked, ADR 152 | 224/269/345/427 | <P25 | <P25 (-36%) |
| 24 Oct | 201 (195) | Booked, ADR 152 | 230/271/345/430 | <P25 | <P25 (-33%) |
| 27 Oct | 205 (200) | Booked, ADR 152 | 214/260/324/398 | <P25 | <P25 (-32%) |
| 28 Oct | 208 (204) | Open | 214/260/328/396 | <P25 | <P25 (-31%) |
| 17 Nov | 231 (230) | Booked, ADR 191 | 205/255/347/392 | P38 | <P25 (-23%) |
| 18 Nov | 318 (317) | Open, min 1 | 214/262/350/393 | P66 | P58 (+6%) |
| 19 Nov | 257 (280) | Booked (check-in) | 219/273/361/421 | P43 | P32 (-15%) |
| 20 Nov | 324 (324) | Booked, ADR 181 | 232/291/383/460 | P59 | P62 (+8%) |

- **Flat overnight:** open nights moved 0.0% (median, n=19). The 18 Oct base rise is holding: open nights are +11.5% vs the 18 Oct snapshot.
- **Position:**
  - 30 days: open average £233, <P25 (-23%).
  - 60 days: £283 = P43 (-6%).
  - Single open nights 18 Nov (£318, min 1) and 27 Nov (£595, min 1) are unchanged from yesterday.
- **Demand:** next 30 days 62.1% booked vs 45% for the market. Next 60 days 67.8% vs 38%. No bookings in the last 7 days.
- **Positioning:** `recommend(0.621, 0.45, 0.20)` returns **raise +10%**. The 60-day result is the same: `recommend(0.678, 0.38, 0.43)` returns raise +10%. £233 x 1.10 = £256, which is **about -15% vs the 2 BR median**. Reasoning: it books ahead of the market while still in the bottom quartile on near-term nights.
- **Differentiators:** basement, no lift and no parking justify some discount. The patio and the Camden Town location help.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

- **Same-BR:** 1 BR, n=173: 146 / 202 / 249 / 299. The 2 BR row is 250/287/365/444.
- **Price:**
  - £500 on 21, 23, 24, 27 and 28 Oct and on 17, 18 and 19 Nov. That is >P90: +148% vs the median and +67% vs P90.
  - 20 Nov is £566 (yesterday £572).
  - Open average: £502 next 30, £528 next 60.
- **Occupancy:** 0% in the next 30 and 60 days, vs 41% and 37% for the market. 65% of open nights are at the £500 minimum.
- **Day on day:** median 0.0%.
- No positioning recommendation, per `policy.json`.

## P17 St John's Wood 1-bed

**NOT IN SYSTEMS.** It is in another account that is not yet connected. `get_listings(search_query="St John's Wood")` returned 0 listings today, and kpi_pack has no PriceLabs or Smoobu mapping. There are no prices, KPIs or percentiles. Listed facts (properties.py): 1-bed, sleeps 4, 2nd floor, no lift, no balcony, no parking.

## Data gaps:
1. No individual comps for any property. PriceLabs Competitor Listings is not enabled and there are no Market Dashboard reports, so there are no comp ids, comp median, ratings, review counts, Superhost flags or cancellation policies. `comps.csv` has no rows from this batch.
2. OTA checks (Airbnb, Booking.com, Vrbo): NOT CHECKED, because they are blocked from this environment.
3. Our ratings and review counts are blank in `listings.csv`, so `quality_premium` = 0 and the rating and review gaps are unknown.
4. P05: the cause of the 20 Oct algorithmic drop (about -13% on open nights) is still not established. It is why £550 only restores the 19 Oct price level. Please check the price breakdown in the PriceLabs UI. There is also a raw-vs-rendered mismatch on the last-minute type (linear vs Flat).
5. P08: the Smoobu block from 14 Nov 2026 to 30 Jun 2028 (created 19 Oct) has no stated reason yet; awaiting Corentin. Positioning uses open nights only, per the dispatcher.
6. The same-BR `summary_table` has no stated date horizon, and the daily bands mix bedroom counts (P05's band is 71% 3-beds). It is unknown whether cleaning is included.
7. `prices.csv` starts on 22 Oct, so 21 Oct comes from the PriceLabs payload only. The 30/60-day windows differ from yesterday's, so the comparisons use the same stay dates.
8. P17 is not connected (it is in another account), so there is no data at all.
