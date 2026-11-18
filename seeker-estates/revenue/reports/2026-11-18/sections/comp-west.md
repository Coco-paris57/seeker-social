# Competitor positioning: WEST + HERTS (D = 2026-11-18)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** `data/policy.json` read first. Everything below was read-only, with one PriceLabs call at a time:
1. `get_user_logs` (listing, 16-18 Nov) for 3547481, 3064856, 3090701 and 3318177 returned **0 entries**. So no logged edit lies behind the 17 Nov 09:09Z PriceLabs refresh changes described below.
2. `get_neighbourhood_data` (detail, prices) for 3547481 (Nearby Listings, **1-3 BR**, 273 listings) and 3064856 (2-3 BR, 150 listings). Both returned OK. All market P25/P50/P75 and occupancy figures come from these pulls ("mkt 18 Nov").
3. Own prices come from `raw/prices_*.json` and `prices.csv` (18 Nov). Last refresh: 17 Nov 09:09:21-23Z (P13 twins) and 09:09:55Z (P20). PriceLabs `price` = Smoobu on every open night (Dispatcher). 3090701 is the linked child (no `smoobu_price`).
4. Occupancy for `recommend` comes from Smoobu `reservations.csv` 18 Nov (cancelled excluded). Market occupancy comes from `pl_kpis.csv`:
   - P13 (one flat): 30 d **23/30 = 76.7%** vs 47%; 60 d 35/60 = 58.3% vs 37%.
   - P20: 30 d **18/30 = 60.0%** vs 38%; 60 d 32/60 = 53.3% vs 30%.
   - These are the same as 17 Nov.

**OTAs:**
- **Airbnb:** public search pages and listing pages, checked 2026-11-18 between 07:21 and 07:46Z with plain `curl` and default headers. No bot check was met, no HTTP errors. The scripts were rebuilt today because yesterday's scratch files are gone.
- **Booking.com: NOT CHECKED.** A WAF challenge was met on 14 Nov; I did not retry or bypass it.

**Method** (same as 3-17 Nov):
- Search: 4 adults, entire home, at least 2 bedrooms. Wide box half-side about 1.3 km around the PriceLabs coordinates, plus a 0.2 km box around each kept comp and each of our listings.
- Price = Airbnb all-in total / nights, after any offer shown, with cleaning and the Airbnb guest fee **included**. Taxes are not shown separately.
- **Line** = comp median x (1 + `quality_premium`):
  - 3090701: `quality_premium(4.7, 4.76)` = **-0.024**.
  - 3064856: `quality_premium(4.31, 4.76)` = **-0.15** (cap).
  - P20: see the next point.
- **P20 now has its first review: 5.0 from 1 review** (listing page 18 Nov). Search still shows "New place to stay".
  - `quality_premium(5.0, 4.80)` = **+0.08**, but one review is not evidence of quality.
  - So I keep the 0-review line of comp median x 0.85. That is my judgement, not the function's output.
- **`recommend`:** P13 leads the market by 30 points and P20 by 22, so it returns "raise +10%" wherever we are below P75 and "+5%" at P100. That is the demand signal only. The quality line decides what the like-for-like evidence supports.
- **Wider 2-bed sample** = every 2-bedroom result in the wide box. It was not rebuilt exactly as on 17 Nov (P20's is larger and dearer), so it is context only and not comparable day-on-day.

**Comp sets:** the same ids as 17 Nov; none replaced.
- **P13:** all 11 active (each returned on at least one of 11 stays).
- **P20:** all 12 active. **789954794593691037 was again absent from every standard stay (5th day).** The 0.2 km activity probe found it bookable at 4.89 (18): 1-4 Dec £900, 7-10 Dec £1,180, 8-11 Jan £1,180. It stays in the set; its probe rows are in `comps.csv`.

**Ratings and reviews** (listing pages 18 Nov):
- Ours: 3090701 4.7 (10), 3064856 4.31 (13), P20 5.0 (1), shown as "New" in search.
- Comp medians: P13 4.76 (13 reviews), P20 4.80 (17.5).
- Review gap vs comp median: 3090701 -3, 3064856 0, P20 -16.5.
- Every comp's rating and review count is unchanged from 17 Nov.

**Rows written** (under `flock`; the files had been created by other agents):
- **1,084 rows** appended to `data/snapshots/2026-11-18/comps.csv` under `.comps.csv.lock`:
  - Kept comps: P13 121 rows (11 x 11) and P20 144 rows (12 x 12). Rows for comps that were not returned have a blank price and "NOT RETURNED" in `source`.
  - Ours: `P13:ours` 22 rows and `P20:ours` 12 rows (not comps).
  - Wider 2-bed sample: `P13:wide` 420 rows and `P20:wide` 362 rows.
  - `P20:probe`: 3 rows.
- **23 rows** appended to `channel_checks.csv` (our Airbnb listings) under `.channel_checks.csv.lock`.
- To find them, filter `source` on "comp-west" plus "stay <ci> to <co>".

**Recompute check** (`snapshot.load('2026-11-18')` + `comp_summary`, filtered by stay; matches the tables):

| Listing | Stay | n | Median | Position |
|---|---|---|---|---|
| P13 3090701 | 13-16 Dec | 4 | 235.17 | P25 / -8.4% |
| P13 3090701 | 18-21 Dec (30-day default) | 3 | 235.33 | P100 / +16.3% |
| P13 3090701 | 5-8 Jan | 8 | 211.33 | P50 / +1.1% |
| P13 3090701 | 14-17 Jan | 8 | 217.0 | P50 / -3.7% |
| P20 | 20-24 Nov | 5 | 288.25 | P0 / -7.4% |
| P20 | 14-17 Dec | 10 | 301.83 | P30 / -7.5% |
| P20 | 16-19 Dec | 8 | 328.67 | P38 / -2.6% |

## Comp tables (Airbnb all-in £/night, 4 adults, checked 2026-11-18 07:22-07:46Z)
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- For ours, "not returned" means booked, blocked, below the minimum stay or unbookable:
  - P13: 19 Nov-26 Nov and 22 Dec-2 Jan are booked.
  - P20: 20-22 Nov is below min 3, 24-26 Nov hits the 25 Nov booking, 5 Dec is min 3 and `unbookable`, and 26 Dec is min 4 and `unbookable`.
- Same-comp prices vs 17 Nov are flat or within ±£15 (largest moves: P13 1599999559812004118 16-19 Dec 251 -> 239.67, 1014671215040555613 14-17 Jan 226 -> 208.67, 1205241472054931937 16-19 Dec 332.33 -> 348; P20 27538942 and 51380799 20-24 Nov -2.4%). **Ours moved; comps did not.**

#### P13
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 13 Dec-16 Dec | 16 Dec-19 Dec | 17 Dec-20 Dec | 18 Dec-21 Dec | 18 Dec-22 Dec | 13 Dec-22 Dec | 22 Dec-27 Dec | 5 Jan-8 Jan | 14 Jan-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.85 (13) | Garden view/balcony; Guest favourite; free cancellation |  |  | 234.67 |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.82 (11) | Paid parking; Guest favourite; free cancellation |  |  | 235.67 | 239.67 |  |  |  |  |  | 235.67 | 235.67 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking; garden; free cancellation |  |  |  | 236.33 |  | 251 |  |  |  | 218.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  | 229.33 | 233.33 | 231 | 214.25 |  | 202.6 | 214 | 225.33 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.74 (53) | Superhost; 2 bath | 269 |  |  |  |  |  |  |  | 312 | 198.67 | 206.67 |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | Garden |  | 152.5 |  |  |  |  |  |  |  | 135.67 | 154.67 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  |  | 208.67 | 217.33 | 233 | 235.33 | 218.75 | 168.33 | 218.6 | 208.67 | 208.67 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5 (10) | Lift; skyline view |  |  |  | 441.67 | 438.67 |  |  |  |  | 419.33 | 430.33 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking |  |  | 238.33 |  |  |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5 (13) | Lift/paid parking/balcony/panoramic view; Guest favourite; free cancellation |  |  |  | 348 | 332.33 |  |  |  |  |  | 316.67 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking; garden |  | 152.5 |  |  |  |  |  |  |  | 141.67 | 161.67 |
| **Comp median (n)** | | | 4.76 (13) | | **269.00** (1) | **152.50** (2) | **235.17** (4) | **238.00** (6) | **282.83** (4) | **235.33** (3) | **216.50** (2) | **168.33** (1) | **218.60** (3) | **211.33** (8) | **217.00** (8) |
| Wider 2-bed sample median (n) | | | | | 300.00 (17) | 226.00 (35) | 238.33 (49) | 260.00 (46) | 279.33 (41) | 300.00 (41) | 302.25 (46) | 268.44 (40) | 298.50 (42) | 218.67 (53) | 219.00 (59) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.7 (10)** | | 6 | | | not returned | not returned | **215.33** | **248.67** | **270.00** | **273.67** | **259.00** | **193.00** (strike £2,017 -> £1,737) | not returned | **213.67** | **209.00** |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | 6 | | | not returned | not returned | **233.67** | **258.33** | **269.67** | **262.00** | **247.25** | **198.78** (strike £2,078 -> £1,789) | not returned | **205.00** | **201.00** |

#### P20

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 20 Nov-23 Nov | 20 Nov-24 Nov | 21 Nov-24 Nov | 22 Nov-24 Nov | 24 Nov-26 Nov | 5 Dec-6 Dec | 14 Dec-17 Dec | 14 Dec-19 Dec | 16 Dec-19 Dec | 26 Dec-27 Dec | 26 Dec-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Houseboat, marina view; Superhost; Guest favourite |  | 281 | 279 | 281 |  |  |  | 282.67 | 278.8 | 281 |  | 282 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Terrace; free parking; Guest favourite; free cancellation |  |  |  |  |  |  |  |  |  |  |  | 352 |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking |  |  |  |  |  |  |  |  |  |  |  |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (57) | Lift; 2 bath |  |  |  |  |  |  |  | 321 | 325.6 | 356.67 |  | 453.5 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/paid parking/river view/balcony; 2 bath |  | 410.33 | 411.25 | 424 |  |  |  | 382.67 | 378.6 | 382.67 |  | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony; 12th-floor skyline |  |  |  |  | 285 | 306 |  | 341 | 348 | 352.67 | 494 | 417 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking | 330.5 | 302.33 | 288.25 | 294 | 306 | 306 |  | 261.67 | 249.8 | 268.67 |  |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/paid parking/balcony |  | 357 | 356.5 | 368.67 |  |  |  | 333.33 | 327.8 | 333.33 |  | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/paid parking/balcony |  |  |  |  |  |  |  | 297.67 | 309.4 | 324 |  | 416.25 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/Thames view; Superhost; free cancellation |  |  |  | 179 | 189 | 206 |  | 229.33 |  |  |  |  |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking; townhouse |  |  |  |  | 288.5 | 288.5 |  | 250 |  |  |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5 (25) | Balcony; Superhost; Guest favourite | 310 | 290 | 270 | 276.67 | 290 | 270 |  | 306 | 291.8 | 309 |  | 360 |
| **Comp median (n)** | | | 4.80 (17.5) | | **320.25** (2) | **302.33** (5) | **288.25** (5) | **287.50** (6) | **288.50** (5) | **288.50** (5) | - (0) | **301.83** (10) | **317.50** (8) | **328.67** (8) | **494.00** (1) | **370.12** (8) |
| Wider 2-bed sample median (n) | | | | | 470.00 (23) | 395.00 (29) | 391.25 (32) | 385.00 (31) | 312.00 (38) | 306.00 (45) | 800.00 (11) | 273.00 (49) | 280.10 (52) | 314.33 (55) | 572.00 (20) | 441.75 (44) |
| **Ours 3547481 (Airbnb 1791529331262420081) 5 (1)** | | 4 | | | not returned | **286.33** | **267.00** | **275.33** | **286.50** | not returned | not returned | **279.33** | **283.40** | **320.00** | not returned | not returned |

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### What changed since 17 Nov: PriceLabs split the twins on 13-17 Dec
- The 17 Nov 09:09Z refresh (no log entry) moved **3090701 to 0.90 x 3064856 on 13-17 Dec**: 220/215/213/217/225 vs 244/239/236/241/250.
- On 18-21 Dec and 3-16 Jan, 3090701 is now **+5% to +6%** over 3064856.
- 3090701's `user_price` on 13-16 Dec (244/240/237/241) equals 3064856's price, so 3090701 was the twin cut.
- **Twin rule** (policy `listing_facts.P13.twin_listings`):
  - The identical nights flagged on 17 Nov (13-16 Dec, 16 Jan) are now different.
  - The only identical open night left is **17 Jan (182/182)**.
  - The 13-17 Dec gap is now **10%**, wider than the "slight" difference the rule asks for. Which twin is cheaper is deprioritised, so I only report the size of the gap.
- **Christmas booking is now in PriceLabs:**
  - 3064856 shows 22 Dec "Booked (Check-In)" and 23-26 Dec "Booked", ADR **140.13**.
  - 3090701 shows 22-26 Dec closed (`user_price` -1, no booking status).
  - Note: ADR 140.13 is not the room rate of £168.15/night. It is £840.75 / 6, or £840.75 / 1.2 / 5; the basis is NOT CHECKED (PriceLabs auditor).
- **Airbnb factor (inference from 18 Nov prices):**
  - Every night that is **28 days out or less is priced at 0.85 x** the night's normal Airbnb basis (0.90 x PriceLabs + £150 cleaning).
  - That gives 13-16 Dec 0.765, 16-19 Dec 0.858 (one night inside 28 days) and 17-20 Dec 0.900.
  - It is the same 15% / 28-day pattern as the pre-21 Oct Smoobu rule. Policy says the rule was changed on 21 Oct to -10% within 14 days.
  - So the 13-16 Dec drop on 3090701 (Airbnb £234 -> **£215.33**) is the PriceLabs -10% stacked on that factor.

### Remaining 13-21 Dec (9 open nights): hold, except 3090701 13-15 Dec, where about +6% is supported
| Stay | Ours 3090701 / 3064856 (17 Nov) | Comp median (n) | Comp pctl / vs median | vs line 3090701 / 3064856 | Wider pctl (n, median) | PL avg vs mkt P50 18 Nov (mkt occ) | Factor vs PL | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 13-16 Dec | **215.33 / 233.67** (234 / 234) | 235.17 (4) | P25 / **-8.4%** ; P25 / -0.6% | **-6.2%** / +16.9% | P27 / P39 (49, 238.33) | 216.0 / 239.7 vs 220.0: -1.8% / +8.9% (27%) | 0.765 / 0.766 | raise +10% |
| 16-19 Dec | 248.67 / 258.33 (262 / 254) | 238.0 (6) | P67 / +4.5% ; P67 / +8.5% | +7.1% / +27.7% | P41 / P48 (46, 260) | 231.3 / 243.3 vs 235.7 (31%) | 0.859 / 0.856 | raise +10% |
| 17-20 Dec | 270.0 / 269.67 (262.67 / 251) | 282.83 (4) | P50 / -4.5% ; -4.7% | -2.2% / +12.2% | P41 / P39 (41, 279.33) | 244.3 / 244.0 vs 241.7 (38%) | 0.900 | raise +10% |
| **18-21 Dec (30-day default)** | **273.67 / 262.0** | **235.33 (3)** | **P100 / +16.3% ; +11.3%** | +19.1% / +31.0% | P44 / P34 (41, 300) | 248.3 / 235.3 vs 242.7 (42%) | 0.901 | raise +5% |
| 18-22 Dec (up to the Christmas booking) | 259.0 / 247.25 (247.5 / 236) | 216.5 (2) | P100 / +19.6% ; +14.2% | +22.6% / +34.4% | P39 / P26 (46, 302.25) | 246.0 / 233.0 vs 243.2 (42%) | 0.900 | raise +5% |
| 13-22 Dec (all 9, weekly -15%) | 193.0 / 198.78 (197 / 191.56); strike £2,017 / £2,078 | 168.33 (1) | n=1 | | P10 / P12 (40, 268.44) | 230.4 / 238.0 vs 233.2 (34%) | 0.765 | numbers only |

- **3090701 13-15 Dec: about +6% is supported.** That is roughly PriceLabs 233/228/226 instead of 220/215/213.
  - It sits 6.2% under its own line (comp median 235.17 x 0.976 = £229.52) at P25 of 4 comps, which are flat on 17 Nov.
  - The cut came from the uncommented 17 Nov PriceLabs split, not from the market: P50 is 220 and market occupancy 27%.
  - The same move would bring the twin gap from 10% back to about 4%.
- **3064856 13-16 Dec: hold.** It is at P25 of comps and -0.6% vs median, but 16.9% over its rating line. The rating line argues for less, and the comps argue for no change.
- **16-21 Dec: hold (0%).**
  - 3090701 is +7% / -2% vs its line on 16-19 / 17-20 Dec.
  - The 30-day default 18-21 Dec is P100 / +16% of only 3 kept comps (the rest are booked or have min-stay), but P44 of the wider 2-bed sample (median £300).
  - Market P50 is 243, and PriceLabs is within ±3% of it.
  - Thin kept sets plus the occupancy lead do not support a raise. Nor do they show us priced out.
  - `recommend`'s +5-10% rests on the occupancy lead (earlier bookings), not on like-for-like price.
- The weekly 15% on the 9-night stay matches policy: £2,017 -> £1,737 = 15% of (2,017 - 150).

### January twins: hold
- **5-8 Jan:** £213.67 / £205.00. On 17 Nov they were 205 / 196.33, so both are up about 4%.
  - P50 / P38 of 8, +1.1% / -3.0% vs median 211.33.
  - Lines: **+3.6%** / +14.1%.
  - PriceLabs 181.7 / 172.0 vs market P50 204.0 (-11% / -16%). Market occupancy 16%.
  - Twin gap 4.2% on Airbnb.
- **14-17 Jan:** £209.00 / £201.00. On 17 Nov they were 221.33 / 215, so -5.6% / -6.5%; the comp median eased 225.67 -> 217.0.
  - P50 / P25 of 8, -3.7% / -7.4%.
  - Lines: **-1.3%** / +9.0%.
  - PriceLabs 176.7 / 167.7 vs P50 208 (-15% / -19%). Market occupancy **12%**.
  - Twin gap 4.0%. 17 Jan is identical (182/182).
- **Supported:**
  - 3090701: about -2% vs median, which is where it sits.
  - 3064856: -15%, and it is above that.
  - With market occupancy at 12-16%, the evidence does not support a raise, despite `recommend`'s +10%.

## P20 Waterford Court, 2-bed, max 4 (Airbnb 1791529331262420081, 5.0 from 1 review, "New" in search)

**What changed since 17 Nov.** The 17 Nov 09:09Z PriceLabs refresh had no log entry. Comps were flat, as were the market P50 (±1) and market occupancy (±2 points).
- 20-24 Nov went **up**: 300/299/254/257 -> **317/331/278/274** (+8.1% over the 20-24 Nov stay). 24 Nov went 239 -> 268. Min stay is 3/3/2/2.
- 14-18 Dec went **down**: 318/319/325/338/345 -> **297/300/302/332/311** (-6.6% / -6.0% / -7.1% / -1.8% / -9.9%).
- 5 Dec went 277 -> 265 and 26 Dec 271 -> 272. Both are still `unbookable` 1.

Column key:
- "Line" = comp median x 0.85.
- "Factor" = (all-in - £150) / sum of PriceLabs `price` (= Smoobu) for the same nights.
- PriceLabs vs market uses the 1-3 BR compset (mkt 18 Nov).

| Stay | Ours 18 Nov (17 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n, median) | PL avg / mkt P50 (mkt occ) | Factor | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 20-22 Nov (next Fri-Sun) | below min 3 | 320.25 (2) | comps only | | (23, 470) | 324.0 / 217.0 (56%) | | |
| 20-23 Nov | 286.33 (267.67) | 302.33 (5) | P20 / -5.3% | +11.4% | P21 (29) | 308.7 / 215.7 (52%) | 0.766 | raise +10% |
| **20-24 Nov (requested)** | **267.00** (250.00) | **288.25 (5)** | **P0 / -7.4%** | **+9.0%** | P12 (32, 391.25) | 300.0 / 214.5 (50%) | 0.765 | raise +10% |
| 21-24 Nov | 275.33 (256.67) | 287.5 (6) | P17 / -4.2% | +12.7% | P16 (31) | 294.3 / 213.3 (48%) | 0.766 | raise +10% |
| 22-24 Nov | 286.50 (270.50) | 288.5 (5) | P40 / -0.7% | +16.8% | P32 (38) | 276.0 / 212.0 (44%) | 0.766 | raise +10% |
| 24-26 Nov (midweek default) | 25 Nov booked | 288.5 (5) | comps only | | (45, 306) | | | |
| **5 Dec (orphan, requested)** | unbookable (min 3) | none returned | n=0 | | 1-night n=11 (median £800, cleaning-heavy) | 265 / 227, P75 296 (50%) | | |
| 14-17 Dec | 279.33 (310.00) | 301.83 (10) | P30 / -7.5% | +8.9% | P51 (49, 273) | 299.7 / 216.7 (23%) | 0.765 | raise +10% |
| 14-19 Dec (all 5 open nights) | 283.40 (309.00) | 317.5 (8) | P25 / -10.7% | +5.0% | P52 (52, 280.1) | 308.4 / 221.0 (24%) | 0.822 | raise +10% |
| **16-19 Dec (30-day default; was +7.0%)** | **320.00** (352.67) | **328.67 (8)** | **P38 / -2.6%** | **+14.5%** | P53 (55, 314.33) | 315.0 / 225.3 (25%) | 0.857 | raise +10% |
| **26 Dec (orphan, requested)** | unbookable (min 4) | 494 (1) | n=1 | | 1-night n=20 (median £572) | 272 / 253, P75 330 (34%) | | |
| 26-30 Dec (context) | 26 Dec min 4; 27 Dec booked | 370.12 (8) | comps only | | (44, 441.75) | | | |

### 20-24 Nov (arrival Friday): hold, about -7% vs comp median
- **Position:** P0-P40 of 5-6 kept comps, -0.7% to -7.4% vs median, and **+9% to +17% over the 1-review line**. The PriceLabs rise lifted Airbnb 20-24 Nov from £1,000 to **£1,068**.
- **Supported:** hold where it is now. That is about -7% vs median on 20-24 Nov, -5% on 20-23 Nov and about -1% on 22-24 Nov.
  - The like-for-like comps support no more than the median while there is one review.
  - The +10% from `recommend` is not supported.
  - Market occupancy for 20-21 Nov is 55-56%, the highest in the batch.
- **t-p20-delivery is still open (Corentin), 2 days out:**
  - 20-21 Nov is open in PriceLabs (min 3, priced 317/331).
  - 20-23, 20-24 and 21-24 Nov were all returned and priced on Airbnb today.
  - Policy `listing_facts.P20.block_20_21_nov` says 20-22 Nov is the delivery block. 22-24 Nov min 2 stays "confirm or revert".

### December: the 16-19 Dec premium is gone; at about -3%, no edit needed
- **16-19 Dec: hold (0%).**
  - It was +7.0% vs median / 25.9% over the line on 17 Nov. Today it is **P38, -2.6% vs median, 14.5% over the line** (£320/night all-in, Airbnb £960 for 3 nights).
  - What moved it: the uncommented PriceLabs cut on 16-18 Dec (avg 336 -> **315**, -6.3%) and the ≤28-day factor on 16 Dec. Comps were flat.
  - The supported level from 17 Nov, about -5% vs median, is about £312/night all-in. We are 2.6% (£8/night) above that, which is within noise.
  - 17-18 Dec come inside 28 days over the next two days, so the Airbnb price will fall further with no edit. **a-p20-dec-1711 can be closed as self-corrected (numbers only).**
- **14-17 Dec and 14-19 Dec:** P30 / -7.5% and P25 / -10.7% vs median, +9% and +5% over the line. Hold.
  - 14-16 Dec are inside 28 days, and the factor fell from 0.811 to 0.765.
  - Market occupancy is 23-24%, and nothing in the comps or market supports a move either way.
- **5 Dec orphan (t-p20-5dec-orphan): still not fixed, day 9.**
  - Raw 18 Nov: price 265, user_price 277, min 3, `unbookable` 1. No log entry.
  - No kept comp was returned for 5-6 Dec.
  - Market P50/P75 is 227/296, market occupancy 50%.
  - **Supported: min 1 at about £265-277** (between market P50 and P75).
- **26 Dec orphan (t-p20-26dec-orphan): still not fixed.**
  - Raw 18 Nov: price 272, user_price 271, min 4, `unbookable` 1.
  - 1-night comps: n=1, 1684834789445533643 at £494. Market P50/P75 is 253/330, market occupancy 34%.
  - **Supported: min 1 at £272-300.** Reyhan's -5% (4 Nov) stays for Corentin to confirm or revert; it is not a new proposal.
- No other December nights are open: 1-4 Dec, 6-13 Dec, 19-25 Dec and 27 Dec-2 Jan are booked.
- **Airbnb ≤28-day factor (new for P20):**
  - 14-17 Dec (26-28 days out) is priced at 0.765 x PriceLabs, the same as 20-24 Nov (2-6 days out).
  - Policy (`P20.airbnb_discounts_22oct`) gives last-minute 15% for 0-14 days only, so the 15-28 day part is **not explained by policy**. It matches the P13 pattern (see the P13 section).
  - Cause: NOT CHECKED (Smoobu Airbnb rules, channel agent).

## P10 Hanger Lane, 1-bed (3318177)
- Tonight (18 Nov) is the last night before the handback (policy `handbacks.P10`). The Airbnb stay 18 Oct-19 Nov covers it, and 19 Nov onwards is blocked.
- No log entries. No sellable nights, so no comps or positioning.

## P02 Ladbroke Grove, P03 Bayswater
- Blocked on purpose (policy `intentional_blocks`). No open nights in `prices.csv` 18 Nov. No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
- Not in PriceLabs or Smoobu (no rows in `listings.csv` or `prices.csv` 18 Nov).
- Own price, percentile, rating gap and premium: **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (bot check met on 14 Nov; not retried or bypassed). This covers comps, our displayed Booking.com prices and the P13 22-27 Dec promotion breakdown. Comp cancellation policies come only from Airbnb "Free cancellation" pills, which appear on 4 P13 comps and 2 P20 comps and on none of ours.
2. **Airbnb ≤28-day 15% factor on P13 and P20:** the source is inferred from prices, and the Smoobu Airbnb rule is NOT CHECKED. Policy says -10% within 14 days for Shepherd's Bush since 21 Oct, and 0-14 days for P20.
3. **Uncommented PriceLabs moves at the 17 Nov 09:09Z refresh** (`get_user_logs` empty 16-18 Nov):
   - 3090701 cut to 0.90 x 3064856 on 13-17 Dec.
   - P20 20-24 Nov up 6-12%, and 14-18 Dec down 2-10%.
   - Cause NOT CHECKED (PriceLabs auditor).
4. **P13 Christmas booking in PriceLabs:** ADR shows 140.13, not the room rate of £168.15, and the basis is NOT CHECKED. 3090701 shows closed, not "Booked".
5. **Thin comp coverage** (wider-sample or market percentiles shown alongside):
   - P13: n=1-3 on 20-22 Nov, 24-26 Nov, 18-21 Dec, 18-22 Dec, 13-22 Dec and 22-27 Dec.
   - P20: n=0-2 on 20-22 Nov, 5 Dec and 26 Dec.
   - Only unsold comps can be priced, which biases peak medians.
   - P20 789954794593691037 was found only by the activity probe (5th day).
6. The wider 2-bed sample was rebuilt today and is not comparable to 17 Nov's. The P20 market percentiles use a 1-3 BR compset, which understates a 2-bed P50.
7. P20 has 1 review: `quality_premium` returns +0.08, but the -15% line used here is judgement.
8. The P13 Airbnb-to-Smoobu id mapping is still "likely / probable" (policy `airbnb_listings_24oct`). P16, P18 and P19 have no data; P10 has no sellable nights.
