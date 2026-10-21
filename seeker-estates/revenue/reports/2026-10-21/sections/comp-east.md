# Competitor positioning: EAST batch (D = 2026-10-21)

**Source for every market figure:** PriceLabs Nearby Listings percentiles, pulled 2026-10-21 with the read-only `get_neighbourhood_data` call (summary mode). All calls returned `all_operations_ok = true`: P01 3320302, P04 Channex (primary), P04 Smoobu 3562176, P09 3318172, P12 2699998 and P20 3547481. P04's Smoobu listing returned the same table as its Channex listing. The bedroom-matched tables are saved in `data/snapshots/2026-10-21/raw/neighbourhood_<ref>.json` and appended to `data/snapshots/2026-10-21/market.csv`, with the source on each row.

**These are percentiles, not a comp set.** Competitor Listings is not enabled, so there are no individual comps, comp ids, comp ratings or review gaps. OTA checks were **NOT CHECKED** because the sites are blocked. I added **0 rows** to `comps.csv`.

**Method:**
- Our price is the PriceLabs price from `prices.csv`. For P04 that is the Channex listing. Prices exclude taxes; whether they include cleaning is unknown.
- Percentiles are linearly interpolated between P25, P50, P75 and P90.
- Yesterday's averages were scored on yesterday's table.
- "Next 30" is 21 Oct to 19 Nov and "31-60" is 20 Nov to 19 Dec.
- Occupancy comes from `kpi_pack.json`.
- `quality_premium(None, None) = 0.0` for every listing, because our ratings are blank and there are no comp ratings. That zero is a default, not evidence.
- Settings changes come from `get_user_logs` (listing, group and account, 19-21 Oct). Overrides come from `get_listing_date_overrides`, read live today.

## Bedroom-matched tables, today vs 20 Oct

| Ref | Band (n) | P25 / P50 / P75 / P90 today | 20 Oct |
|---|---|---|---|
| P01 Canary Wharf | 2BR (144) | 223 / 270 / 335 / 415 | 222 / 269 / 335 / 420 |
| P04 Barking | 2BR (60) | 127 / 165 / 219 / 303 | 127 / 161 / 218 / 304 |
| P09 Greenwich | 1BR (126) | 116 / 141 / 169 / 216 | 113 / 137 / 168 / 217 |
| P12 Mile End | 2BR (119) | 176 / 211 / 250 / 292 | 171 / 207 / 248 / 294 |
| P20 Waterford Court | 2BR (149) | 220 / 260 / 321 / 401 | 219 / 260 / 321 / 412 |

The medians are flat to +2-3% (P04 +2.5%, P09 +2.9%, P12 +1.9%, P01 +0.4%, P20 flat).

## Where we sit

| Ref | Base | Next 30 avg (n open) | Pctl today (yday) | vs P50 | 31-60 avg (n open) | Pctl today (yday) | vs P50 | Booked 30/60 vs mkt | `recommend` 30 / 31-60 |
|---|---|---|---|---|---|---|---|---|---|
| P01 | 253 | 237.8 (0; all booked, average of booked-night prices) | P33 (P31) | -11.9% | 285.1 (**0 open**: booked plus **18 newly blocked**; average of all priced nights) | P56 (P55) | +5.6% | 100% / 70% vs 33% / 25% | raise +10% / raise +10% |
| P04 | 220 | 170.6 (14) | P53 (P54) | +3.4% | 206.2 (20) | P69 (P70) | +25.0% | 48% / 41% vs 27% / 21% | raise +10% / raise +10% |
| P09 | 176 | 157.6 (11) | P65 (P70) | +11.8% | 193.2 (**0 open**: booked plus **25 newly blocked**; average of all priced nights) | P83 (P83) | +37.0% | 59% / 41% vs 38% / 30% | raise +10% / raise +5% |
| P12 | 284 | 236.5 (12) | P66 (P68) | +12.1% | 276.9 (15) | P85 (P85) | +31.2% | 59% / 44% vs 39% / 33% | raise +10% / raise +5% |
| P20 | 350 (min 220) | 267.8 (26) | **P53** (P56) | +3.0% | 331.7 (30) | P77 (P78) | +27.6% | **10% / 5% vs 34% / 26%** | fix-listing / lower -7% |

`recommend` reasons, verbatim:
- **P01:** "booked +67% vs market but priced at P33: under-priced" / "+44% at P56: under-priced".
- **P04:** "+21% at P53" / "+20% at P69: under-priced".
- **P09:** "+21% at P65: under-priced" / "+11% at P83: test a further step up".
- **P12:** "+20% at P66: under-priced" / "+11% at P85: test a further step up".
- **P20:** "behind market -24% while already at P53: conversion/visibility problem, not price" / "behind market -21% at P77: priced above demand".

## What changed since 20 Oct

**Settings:** no change on P01, P09, P12 or P20. The 19-21 Oct listing logs have no entry for them, and the group and account logs are empty. The only EAST change is P04's new Smoobu listing 3562176 (see below).

- **P20: was a -15% / -9% / -7% override applied? No.** The live override list still shows only:
  - **-4%** on 21-31 Oct (created 11 Oct);
  - **-2%** on 1-30 Nov (created 15 Oct);
  - min-stay-only overrides on 27-31 Dec.

  Both price overrides were last updated on 17 Oct at 20:50Z. There are no P20 log entries on 19-21 Oct. Prices did fall, but the ratio of price to `uncustomized_price` is unchanged day to day (for example 27 Oct: 0.864 then 0.861), so the fall came from the algorithm's base recalculation, not a customization. Examples: 27 Oct 267 to 247 (uncustomized 309 to 287); 29 Oct 293 to 268; 19 Nov 293 to 268; 20 Nov 316 to 315. The next-30 average went from 275.1 to 267.8 (-2.7%, P56 to P53), and 31-60 from 338.9 to 331.7 (-2.1%). A -7% move on 31-60 would still be needed to reach the level `recommend` supports (about 308). There were no new bookings. Note that the price snapshot was refreshed at 2026-10-20T08:41Z, so overnight moves after that are not captured.
- **P01: 30 Nov-17 Dec (18 nights) went from open to "Blocked"** overnight, confirmed live with `get_listing_prices`: status Blocked, no booked date, occupancy 0. There is no reservation behind it and P01 is not one of the policy's intentional blocks. **The cause is not known; ask before assuming.** As a result, P01 has **zero open nights in the next 60**, so no list-price change can produce revenue in that window. Booked-night prices rose by 3-10 (algorithmic). There are no new bookings beyond the 18-21 Dec Airbnb stay reported yesterday.
- **P09: 27 Nov-20 Dec (25+ nights; still Blocked on 21 Dec) went from open to "Blocked"** overnight, confirmed live the same way. There is no reservation and P09 is not in the policy blocks. **The cause is not known.** The next-30 position fell from P70 to P65 because our near-date prices fell (29 Oct 165 to 152; 27 Oct 164 to 158) and the 1BR median rose to 141. **There have still been no bookings since the 176 base went live** (pickup_7d = 0). PriceLabs recommended base is now **167** (listings.csv), still below 176.
- **P12:** near-date prices fell by 5-8 (28 Oct 213 to 206). 31-60 is unchanged at P85. **90-day pace worsened again, to -31.9% revenue / -14 nights vs the same time last year** (it was -29.1% / -13 yesterday). 30-day pace is +4.6% / -6 nights. There are no new bookings in the reservation diff.
- **P04: a second PriceLabs listing is now live.** Smoobu 3562176 was mapped on 20 Oct at 10:32Z: base 220, min 90 and max 2000 were copied from the Channex parent, along with all its overrides, and sync was switched ON. Then, at 11:29Z, a further **-5% override with min-stay 3 on 1-24 Nov** was added to 3562176 only. Effects in today's data:
  - The Smoobu calendar price (from 3562176) now sits 2-3 below the Channex PriceLabs price on 7-24 Nov (17 nights flagged by the KPI pack).
  - On **1 Nov, Channex shows 475 open (a +150% orphan-night override) while Smoobu shows 162**.
  - **Booking status conflicts on 2-6 Nov.** Channex PriceLabs still shows them Booked, but the Smoobu reservation for 2-7 Nov is **cancelled** and 3562176 shows those nights open (171-176).
  - The 6 P04 Booking.com reservations that appear in `reservations.csv` for the first time (booked_on 2026-10-20) cover nights that were already Booked in yesterday's Channex calendar. They are an import from the new mapping, not new demand.
  - PriceLabs occupancy for 3562176 is 30% for the next 30, vs 50% on Channex.
  - Which listing's price reaches guests on Booking.com is not visible from this data.
  - Channex positioning is unchanged: P53 / P69. If 2-6 Nov are really open, the next-30 open count rises from 14 to 19.

## Same-date check (our PriceLabs price, status, percentile vs today's bedroom-matched table; yesterday's price in brackets)
Stay dates: Fri-Sun 23-25 Oct, Tue-Thu 27-29 Oct, and 20 Nov (today's 30-days-out date). 19 Nov is shown for continuity.

| Ref | Fri 23 Oct | Sat 24 Oct | Tue 27 Oct | Wed 28 Oct | Thu 29 Oct | Thu 19 Nov | Fri 20 Nov |
|---|---|---|---|---|---|---|---|
| P01 | 222 bk, <P25 (215) | 234 bk, P31 (231) | 215 bk, <P25 (219) | 218 bk, <P25 (213) | 227 bk, P27 (233) | 241 bk, P35 (234) | 272 bk, P51 (262) |
| P04 Channex | 160 bk, P47 | 168 bk, P51 | 150 bk, P40 | 158 bk, P45 | 157 bk, P45 | **144 open, P36** (144) | 185 open, P59 (185) |
| P04 Smoobu | 144 bk | 151 bk | 135 bk | 142 bk | 141 bk | 142 open, P35 | 181 open, P57 |
| P09 | 156 bk, P63 (162) | 179 bk, P78 (182) | **158 open, P65** (164) | **157 open, P64** (157) | **152 open, P60** (165) | 163 bk, P70 (155) | 188 bk, P81 (183) |
| P12 | 178 bk, P26 (184) | 187 bk, P33 (193) | **198 open, P41** (203) | **206 open, P46** (213) | **211 open, P50** (219) | 248 bk, P74 (237) | 277 bk, P85 (277) |
| P20 | 248 bk, P42 (264) | 267 bk, P53 (281) | **247 open, P42** (267) | **252 open, P45** (266) | **268 open, P53** (293) | **268 open, P53** (293) | **315 open, P73** (316) |

P20 is still dearer than P01, our own 2-bed 0.67 km away, but the gap has narrowed (19 Nov: P20 268 open vs P01 241 booked; it was 293 vs 234).

## Supported positioning (judgement on top of `recommend`)
- **P01: hold 253.** The supported position is about +5% vs the 2BR P50 on 31-60, and the priced nights are at +5.6%. There is nothing to sell in the next 60 because every night is booked or newly blocked. Get the reason for the 30 Nov-17 Dec block before any price move.
- **P04: +6% to +10% vs the 2BR P50 for next 30 is supported (now +3.4%).** That is consistent with `recommend` (+10%) and the PriceLabs recommended base of 228. **Resolve the two-listing conflict first** (1 Nov price, the 2-6 Nov status, and the extra -5% on 3562176 only), or a base change will land differently on each channel.
- **P09: hold 176.** The supported position is about +12% to +18% vs the 1BR P50 for next 30 (now +11.8%). The base is 3 days old with zero pickup, and PriceLabs' recommended base is 167. 31-60 cannot be priced because of the block.
- **P12: hold 284.** The supported position is about +12% vs P50 for next 30 (now +12.1%). Do not take the +5% "test a further step" on 31-60: it is already at P85 / +31%, and 90-day pace is -31.9% and worsening.
- **P20:** next 30 at about 0% to +3% vs P50 is fine on price (P53). The 24-point booking gap is a conversion/visibility problem. For 31-60, -7% (from about 332 to about 308) is supported by `recommend` and **has not been applied**. The 350 base and 220 minimum are owner decisions.

## P07 Woolwich 1-bed (3288427 smoobu)
Blocked on purpose (policy). No pricing advice. Excluded from occupancy and opportunity findings. No neighbourhood pull.

## P15 Bow / Devons Road 1-bed
**No data.** P15 is in a second PriceLabs/Smoobu account that is not connected yet. There are no rows in `prices.csv`, `listings.csv` or `pl_kpis.csv`, and the `kpi_pack` check reads "No priced PriceLabs listing mapped". No analysis.

---

Data gaps:
1. No individual comps. Competitor Listings is not enabled and Nearby Listings gives percentiles only. `comps.csv` has 0 rows, so there is no comp median, comp rating, review gap or comp ids.
2. OTA checks were NOT CHECKED because they are blocked. Comp cleaning fees, Superhost/Preferred status, cancellation policy, view, floor and lift are unknown.
3. Our ratings and review counts are blank in `listings.csv`, so `quality_premium` is 0.0 by default.
4. The Nearby Listings table states no forward window or cleaning treatment, and today's pull was summary-only (no daily P50).
5. P15 is in an unconnected account. P20 is still missing from `build/properties.py`, so its sleeps and amenities are unknown.
6. The cause of the new blocks is unknown: P01 30 Nov-17 Dec (18 nights) and P09 27 Nov-21 Dec (25+ nights). Neither is a policy block. P08 (37) and P10 (32) also gained blocked nights overnight; they are outside this batch.
7. P04 has two live PriceLabs listings (Channex primary, Smoobu 3562176) that disagree on the 1 Nov price and the 2-6 Nov status. Which feeds Booking.com is unknown.
8. The price snapshots were refreshed on 20 Oct (P20 at 08:41Z, P01/P09 at 09:03Z), so moves later on 20-21 Oct are not captured.
