# Competitor positioning: EAST batch (D = 2026-10-20)

**Source for every market figure:** PriceLabs Nearby Listings percentiles, pulled 2026-10-20 with the read-only `get_neighbourhood_data` call (summary mode). All five calls (P01, P04, P09, P12, P20) returned `all_operations_ok = true`. The bedroom-matched tables are saved in `data/snapshots/2026-10-20/raw/neighbourhood_<ref>.json` and appended to `data/snapshots/2026-10-20/market.csv`, with the source stated on each row.

**These are percentiles, not a comp set.** PriceLabs Competitor Listings is not enabled and there are no Market Dashboards, so there are no individual comps. Live OTA checks (Airbnb, Booking, Vrbo) were **NOT CHECKED** because OTA sites are blocked from this environment. That means there is no comp table, no comp median, no comp rating or review gap, and no comp ids to track. I added **0 rows** to `comps.csv`; it was created with its header only.

**Method:**
- Our price is the PriceLabs price from `prices.csv`. For P01, P09, P12 and P20 it equals Smoobu. P04 is priced through Channex, so there is no Smoobu figure. Prices exclude taxes; whether they include cleaning is unknown.
- Percentiles are linearly interpolated between P25, P50, P75 and P90.
- To keep the change since 19 Oct like-for-like, yesterday's prices were re-scored against today's table.
- Windows: "next 30" is 21 Oct to 19 Nov and "31-60" is 20 Nov to 19 Dec. Both are rolling windows, one day later than yesterday's.
- Occupancy comes from `kpi_pack.json`.
- `quality_premium(None, None) = 0.0` for every listing, because our ratings are blank in `listings.csv` and there are no comp ratings. That zero is a default, not evidence.

## Bedroom-matched tables, today vs 19 Oct

| Ref | Band (n) | P25 / P50 / P75 / P90 today | 19 Oct |
|---|---|---|---|
| P01 Canary Wharf | 2BR (146) | 222 / 269 / 335 / 420 | 220 / 266 / 332 / 419 |
| P04 Barking | 2BR (60) | 127 / 161 / 218 / 304 | 127 / 159 / 214 / 301 |
| P09 Greenwich | 1BR (127) | 113 / 137 / 168 / 217 | 110 / 134 / 165 / 206 |
| P12 Mile End | 2BR (118) | 171 / 207 / 248 / 294 | 167 / 204 / 242 / 293 |
| P20 Waterford Court | 2BR (151) | 219 / 260 / 321 / 412 | 216 / 254 / 319 / 401 |

The market median rose by 1-2% in every band overnight.

## Where we sit

| Ref | Base (no change since 18 Oct) | Next 30 avg (open nights) | Pctl today (yesterday, same table) | vs 2BR/1BR P50 | 31-60 open avg (n nights) | Pctl today (yesterday) | vs P50 | Booked next 30 / 60 vs market | `recommend` next 30 / 31-60 |
|---|---|---|---|---|---|---|---|---|---|
| P01 | 253 | 234.0 (all booked; average of booked-night prices) | **P31** (P32) | -13.0% | 281.5 (18) | **P55** (P56) | +4.6% | 100% / 70% vs 33% / 25% | raise +10% / raise +10% |
| P04 | 220 | 170.8 (14) | **P54** (P57) | +6.1% | 206.2 (20) | **P70** (P69) | +28.1% | 48% / 41% vs 27% / 21% | raise +10% / raise +10% |
| P09 | 176 | 162.2 (12) | **P70** (P75) | +18.4% | 193.6 (23) | **P83** (P83) | +41.3% | 59% / 42% vs 38% / 30% | raise +10% / raise +5% |
| P12 | 284 | 236.7 (13) | **P68** (P70) | +14.3% | 279.5 (15) | **P85** (P90) | +35.0% | 55% / 44% vs 40% / 33% | raise +10% / raise +5% |
| P20 | 350 (min 220) | 275.1 (26) | **P56** (P47) | +5.8% | 338.9 (30) | **P78** (P77) | +30.3% | **14% / 7% vs 34% / 27%** | fix-listing / lower -7% |

`recommend` outputs, verbatim:
- **P01:** "booked +67% vs market but priced at P31: under-priced" / "+44% at P55: under-priced".
- **P04:** "+21% at P54" / "+20% at P70: under-priced".
- **P09:** "+21% at P70: under-priced" / "+12% at P83: test a further step up".
- **P12:** "+15% at P68: under-priced" / "+11% at P85: test a further step up".
- **P20:** "behind market -20% while already at P56: conversion/visibility problem, not price" / "behind market -20% at P78: priced above demand".

### What changed since 19 Oct (settings, from `get_user_logs` 18-20 Oct)
There were no new setting changes after the 18 Oct evening changes already reported yesterday:
- Base changes: P01 230 to 253, P09 160 to 176, P12 270 to 284.
- Date overrides: P01 +10% on 16-17 Dec (min-stay 3), and P12 +1% on 29 Nov-13 Dec (min-stay 2).

Every price move below comes from the PriceLabs daily recalculation, not from a manual change.

- **P01:** prices on near dates fell by 1-14 per night (for example, 28 Oct went from 227 to 213, but that night is already booked). One new booking came in: Airbnb, **18-21 Dec, 3 nights, £720.90 = £240.30/night**, booked 19 Oct. That is the first booking since the base was raised, and it falls in the 31-60 window. PriceLabs priced those nights at 280-285, so the booking paid about 14-15% less. No length-of-stay discount applies to a 3-night stay, and the cause is unknown: possibly an Airbnb promotion, or the total being net of something. Ask before assuming.
- **P04:** the open-night average fell from 177.9 to 170.8. The 18-19 Nov prices dropped from 169/172 to 142/144, now P36-P38. There were no new bookings. PriceLabs recommended base is 228 (base 220).
- **P09:** near-date prices fell by 2-11 per night. The open midweek nights are 27 Oct at 164 (was 169) and 28 Oct at 157 (was 168). The next-30 position slipped from P75 to P70 because the 1BR table rose and our near-date prices fell. There have been **no bookings since the 176 base went live** (last booking made before 17 Oct). PriceLabs recommended base is 162, below the 176 now set.
- **P12:** near-date prices fell by 3-17 (28 Oct went from 230 to 213), and the 31-60 average fell from 292.7 to 279.5 (P90 to P85). There have been **no bookings since the 284 base**. **90-day pace worsened to -29.1% revenue / -13 nights vs the same time last year (it was -25% / -10 yesterday).** 30-day pace is +4.9% revenue / -6 nights. The 17 Nov night is still an isolated spike at 373 (377 yesterday), above the 2BR P90 of 294, and it is open with min-stay 1.
- **P20:** prices rose by about 13-15% on near open nights **with no setting change in the logs** (for example, 27 Oct went from 232 to 267 and 28 Oct from 236 to 266). That moved next 30 from P47 to **P56**. The rise is the opposite of what the booking pace supports, and its cause is not visible in the data.
  - Booked nights rose from 3 to 4 of the next 30. The Airbnb stay of 10-18 Oct now runs to **22 Oct**, but its total is still £1,854.40, so either the 4 extra nights are not in the Smoobu total yet or they were added at £0.
  - A direct booking for 18-22 Oct was created on 19 Oct and then **cancelled**.

## Same-date check (our PriceLabs price, status, percentile vs bedroom-matched table)
Stay dates: Fri-Sun 23-25 Oct, Tue-Thu 27-29 Oct, 18 Nov (yesterday's 30-days-out date), and 19 Nov (today's 30-days-out date). Yesterday's price is in brackets.

| Ref | Fri 23 Oct | Sat 24 Oct | Tue 27 Oct | Wed 28 Oct | Wed 18 Nov | Thu 19 Nov |
|---|---|---|---|---|---|---|
| P01 | 215 booked, <P25 (218) | 231 booked, P30 (241) | 219 booked, <P25 (223) | 213 booked, <P25 (227) | 236 booked, P32 (231) | 234 booked, P31 (238) |
| P04 | 160 booked, P49 (160) | 168 booked, P53 (172) | 150 booked, P42 (150) | 158 booked, P48 (157) | **142 open, P36** (169) | **144 open, P38** (172) |
| P09 | 162 booked, P70 (169) | 182 booked, P79 (190) | **164 open, P72** (169) | **157 open, P66** (168) | 154 booked, P64 (152) | 155 booked, P65 (158) |
| P12 | 184 booked, P34 (189) | 193 booked, P40 (199) | **203 open, P47** (209) | **213 open, P54** (230) | 235 booked, P67 (236) | 237 booked, P68 (250) |
| P20 | 264 booked, P52 (232) | 281 booked, P59 (246) | **267 open, P53** (232) | **266 open, P52** (236) | **259 open, P49** (283) | **293 open, P64** (296) |

The ADRs we actually got on booked nights are well below the PriceLabs prices:
- P01: 152-162 (Oct-Nov stays).
- P04: about 120.
- P09: 103-139.
- P12: 164-199.
- P20: 179.28 on 23-24 Oct.

These are long stays, so some of the gap is the 15% (7+ nights) and 20% (28+ nights) stay discounts set in policy. The rate-leak section covers the gap beyond those discounts.

## My reading (judgement, not the mechanical output)
- **P01:** next 30 is fully booked at P31, so the new base only reaches 31-60, which is at P55 and 70% booked vs 25%. The under-pricing case still holds; the open question is the realised rate, not the list price. The first booking since the raise came in about 14% below the PriceLabs price. Supported position: **about +5% vs the 2BR median on 31-60 (now +4.6%), so hold the 253 base**. Give the raise about 7 days and see whether bookings keep landing at about 240 net before stepping up again.
- **P04:** P54 for next 30 and P70 for 31-60, booked +21 points ahead of the market. There has been no base change, and PriceLabs recommends 228 against 220. Supported position: **+6% to +10% vs the 2BR median for next 30**. A base step to about 228-235 is consistent with both `recommend` and the PriceLabs recommended base. The 18-19 Nov drop to P36 is algorithmic and worth a look.
- **P09 and P12:** `recommend` says raise +10% for next 30, but both bases are 2 days old with zero bookings since. P12 90-day pace is getting worse (-29%), and P09's base is now 14 above PriceLabs' own recommended base. **Hold both for about 7 days of pickup.** Supported positions are about **+15-18% (P09) and +14% (P12) vs median for next 30**, which is where they sit now. Do not take the 31-60 "test a further step" (+5%) while those windows are at P83-P85 and +35-41% over the median.
- **P20:** booked 20 points behind the market at P56 for next 30. That is a conversion/visibility problem, not a price-level problem. For 31-60, P78 with only 7% booked means it is priced above demand (-7%). Overnight the algorithm moved next 30 *up* 9 percentile points with no manual change, which works against both signals. Supported position: **about 0% vs the 2BR median for next 30, which means bringing the average back from about 275 to about 260, and about -7% for 31-60 (from 339 to about 315)**. The 350 base and 220 min are owner decisions. P20 is still dearer than P01, our own 2-bed 0.67 km away, on every checked date where both are priced (for example 19 Nov: P20 293 open vs P01 234 booked).

## P07 Woolwich 1-bed (3288427 smoobu)
Blocked on purpose (policy). No pricing advice. Excluded from all occupancy and opportunity findings. No neighbourhood pull today.

## P15 Bow / Devons Road 1-bed
**No data.** P15 is not in the connected PriceLabs or Smoobu accounts: there are no rows in `prices.csv`, `listings.csv` or `pl_kpis.csv`, and every `kpi_pack` field is null. Per the run brief, P15-P19 sit in a separate PriceLabs/Smoobu account that is not connected yet. Note that `data/policy.json` itself does not record this. No analysis.

---

Data gaps:
1. No individual comps for any EAST listing. Competitor Listings is not enabled, there are no Market Dashboards, and Nearby Listings returns percentiles only. `comps.csv` has 0 rows, so there is no comp median, comp rating or review-count gap, and no comp ids to track.
2. Live OTA checks were NOT CHECKED because they are blocked from this environment. Comp cleaning fees, Superhost/Preferred status, cancellation policies, views and floors are all unknown.
3. Our own ratings and review counts are blank in `listings.csv`, so `quality_premium` = 0.0 by default.
4. The bedroom-matched table states no forward window, and whether its prices include cleaning is unknown. Today's pull was summary-only (no daily series), so there is no daily P50 or booked-P50 per date in this section.
5. P15 has no data (separate, unconnected account). P20 is still missing from `build/properties.py`, so its sleeps, floor, view and amenities are unknown.
6. Unexplained items: the P20 price rise of about 13-15% with no logged setting change; the P20 Airbnb extension to 22 Oct with an unchanged £1,854.40 total; the cancelled direct booking of 18-22 Oct; and P01's 18-21 Dec booking at about 14% under the PriceLabs price.
7. The base changes are 2 days old and there are no bookings since on P09 or P12 (one on P01), so the demand response cannot be measured yet.
