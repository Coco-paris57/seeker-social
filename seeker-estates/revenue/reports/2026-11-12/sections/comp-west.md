# Competitor positioning: WEST + HERTS (D = 2026-11-12)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** `data/policy.json` read first. PriceLabs, read-only, one call at a time, all 200:
1. `get_user_logs` (listing, 11-12 Nov) for 3547481, 3064856, 3090701, 3318177: **4 entries, all Reyhan on 11 Nov**:
   - 15:38:45Z **P13 3064856 10-26 Dec -2% -> -5%, min 3**, copied to child 3090701.
   - 17:15:52Z **P20 13-15 Nov -5%, min 3** (on 9 Nov these were set to no price override, min 3).
   - 17:15:58Z **P20 20-21 Nov -5%, min 3** (on 9 Nov: no price override, min 3).
   - None on P10.
2. `get_listing_date_overrides` 3547481 and 3064856 (12 Nov-31 Jan). These match the logs above. The other overrides are unchanged from 11 Nov.
3. `get_neighbourhood_data` detail (future prices + occupancy):
   - 3547481: 2 BR n=150, P25/P50/P75 215/254/325.
   - 3064856: 2 BR n=115, 192/224/267.
   - Saved to `scratchpad/west12/dl/neigh_*.json`.

**Own prices:** `raw/prices_*.json` in snapshot 2026-11-12. `last_refreshed_at`: 3064856 and 3090701 11 Nov 15:40:05Z; 3547481 11 Nov 17:16:22Z. The `listings.csv` last push is the same time.

**Airbnb:** public search pages, checked 2026-11-12 with plain `curl` and default headers. No bot check was met. **Booking.com: NOT CHECKED** (not attempted in this run).

**Method** (unchanged since 3 Nov):
- Search: 4 guests, entire home, at least 2 bedrooms. Box of about 1.3 km half-side around the PriceLabs coordinates, plus a box of about 0.2 km around each kept comp.
- Price = Airbnb all-in total / nights, with cleaning and Airbnb fees **included** (taxes are not shown separately). Ours are on the same basis (£150 cleaning).
- Comp cancellation policies: NOT CHECKED.

**Comp sets:** same ids as 11 Nov, none replaced. P13: all 11 active. P20: all 12 active. Each comp was returned on at least one of 15 stays today.

**Ratings** (Airbnb search labels today):
- Ours, unchanged: 3090701 4.7 (10), 3064856 4.31 (13), P20 New with 0 reviews.
- Comp median: P13 **4.76** (13 reviews), P20 **4.8** (17.5 reviews). No comp rating moved overnight.

**Occupancy** (Smoobu `reservations.csv` 12 Nov, cancelled excluded; market from `pl_kpis.csv` 12 Nov):

| Listing | 30 d (12 Nov-11 Dec) | 60 d (12 Nov-10 Jan) | Market 30 / 60 | Lead 30 / 60 |
|---|---|---|---|---|
| P13 (one flat) | 24/30 = **80.0%** | 31/60 = **51.7%** | 45% / 38% | **+35 / +14 pts** |
| P20 | 17/30 = **56.7%** | 26/60 = **43.3%** | 38% / 30% | **+19 / +13 pts** |

- PriceLabs `pl_kpis` now shows P20 at 63% (30 d). It **no longer counts the cancelled 21-24 Nov nights**: 63% = 19/30, which looks like the 18-19 Nov block counted as occupied (inference).
- No new P13 or P20 bookings or cancellations overnight (`reservations.csv` diff: the only change is P11).
- Every lead is 10 pts or more, so `recommend` returns "raise" on every stay. The quality-adjusted line decides whether a raise is actually supported.

**Rows written:**
- **345 rows** appended to `data/snapshots/2026-11-12/comps.csv` (P13: 11 comps x 15 stays; P20: 12 comps x 15 stays). Another agent had already copied the file forward (16,625 lines before).
- **30 rows** appended to `channel_checks.csv` (our Airbnb listings).
- Both writes under `flock` (`.comps.csv.lock` / `.channel_checks.csv.lock`).
- To find them, filter `source` on "checked 2026-11-12" and "comp-west".

**Recompute check** (`snapshot.load('2026-11-12')` + `comp_summary`, matches the tables):
- P20 21-25 Nov: n=9, median 279.25, P0 / -19.6%.
- P20 13-16 Nov: n=5, median 290, P0 / -11.3%.
- P20 14-17 Dec: n=10, median 305.67, P40 / -3.4%.
- P13 10-13 Dec: n=2, median 291.5, P50 / -19.5%.
- P13 23-26 Dec: n=2, median 242, P100 / +5.9%.
- P13 5-8 Jan: n=8, median 209, P38 / -0.8%.

## Comp tables (Airbnb all-in £/night, 4 guests, checked 2026-11-12)
- A figure in brackets is the same comp's price for the same stay on 11 Nov, shown where it moved by £1 or more.
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- For ours, "not returned" means booked, blocked or below min stay:
  - P13: 13-15 Nov and 17-19 Nov are booked. 10-12 Dec, 18-20 Dec and 15-17 Jan are below min 3.
  - P20: 13-15 Nov is below min 3. 17-19 Nov is blocked (18-19 Nov). 5-6 Dec is unbookable. 10-12 Dec and 23-27 Dec are booked.

#### P13

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13-15 Nov | 17-18 Nov | 17-19 Nov | 27-28 Nov | 1-2 Dec | 10-12 Dec | 10-13 Dec | 11-15 Dec | 14-17 Dec | 18-20 Dec | 20-25 Dec | 23-26 Dec | 24-27 Dec | 5-8 Jan | 15-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.83 (12) | Garden view/balcony |  |  |  |  |  |  |  |  | 235.67 (231) |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | Paid parking on premises/Guest favourite |  |  |  |  |  |  |  |  | 237 (239) |  |  |  |  | 235.67 | 244 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking on premises |  |  |  |  |  | 265.5 (267) |  |  |  |  |  |  |  | 203.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  |  |  |  |  | 220 (223) | 269 (270.5) | 208 (212) | 233 (237) | 237.33 (242.33) | 214 | 255 (254) |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.75 (51) | Superhost |  | 285 (287) | 238 (239) |  |  |  | 351 (324.33) |  |  |  |  |  |  | 209.33 (207.33) |  |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed |  | 185 | 152.5 |  |  |  |  |  | 145.33 |  |  |  |  | 135.67 | 175 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  |  |  |  |  | 251 (252.5) | 232 (239.67) | 216 (224.25) | 208.67 (211) | 272.5 (274.5) | 214.8 (217.2) | 251 | 254.33 (253.33) | 208.67 | 256.5 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift | 425.5 |  | 411 |  |  |  |  |  |  | 450 |  |  |  | 419.33 | 477 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking on premises |  |  | 196.5 |  |  |  |  |  | 254 |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | Lift/Paid parking on premises/balcony/Guest favourite |  |  |  |  |  |  |  |  |  | 331.5 |  |  |  |  | 331.5 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking on premises |  | 185 | 152.5 |  |  |  |  |  | 151.67 |  |  |  |  | 141.67 | 175 |
| **Comp median (n)** | | | 4.76 (13) | | **425.5** (1) | **185** (3) | **196.5** (5) | - | - | **258.25** (2) | **291.5** (2) | **216** (1) | **220** (7) | **302** (4) | **211.4** (2) | **242** (2) | **245.83** (2) | **209** (8) | **255** (7) |
| Wider 2-bed sample median (n) | | | | | 300 (7) | 247 (7) | 238 (25) | 317 (3) | 461 (3) | 276.75 (14) | 305.33 (21) | 268.62 (22) | 238.83 (38) | 320.25 (10) | 287.2 (14) | 313.33 (19) | 327.83 (16) | 234 (49) | 257 (36) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.7 (10)** | | | | | not returned | **316** | not returned | **338** | **323** | not returned | **234.67** | **233.25** | **238.33** | not returned | **214.4** (strike £1,175 -> £1,072) | **256.33** | **254** | **207.33** | not returned |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | | | | not returned | **325** | not returned | **397** | **377** | not returned | **266** | **240** | **227.67** | not returned | **204** (strike £1,116 -> £1,020) | **244.67** | **242.67** (strike £809 -> £728) | **198.67** | not returned |

#### P20

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13-15 Nov | 13-16 Nov | 13-18 Nov | 16-18 Nov | 17-19 Nov | 20-23 Nov | 20-25 Nov | 21-25 Nov | 22-25 Nov | 5-6 Dec | 10-12 Dec | 14-17 Dec | 14-19 Dec | 23-27 Dec | 26-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost |  | 281 | 277.8 |  |  | 281.33 | 278 | 279.25 | 281.33 |  |  | 281 (282.33) | 277.8 | 282.25 | 282 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises | 311 | 280.33 | 260.2 | 322.5 (351.5) | 322.5 |  |  |  |  |  |  |  |  | 315.75 (333) | 399 |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises |  |  |  |  |  |  |  |  |  |  |  |  |  | 388.5 |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (56) | Lift |  |  |  |  |  | 300 | 286.2 (324.8) | 288.5 (332) | 296.67 (341.33) |  |  | 335.67 (341) | 340.4 (344.6) | 401.75 (409.75) | 483.75 (494) |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony |  | 396.67 (410.33) | 403.6 (411.8) |  |  | 382.67 | 378.6 | 380.25 | 382.67 |  |  | 382.67 | 378.6 | 380.25 | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony |  |  |  |  |  | 338.67 | 334 | 333.5 | 323 | 567 |  | 425.67 | 439.6 | 505.75 | 595.5 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises |  |  |  | 306 | 306 | 276.33 | 254.4 | 257 | 261.67 |  | 292.5 | 261.67 | 249.8 |  |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony |  | 345 (357) | 349 (356.2) |  |  | 333.33 | 327.8 | 329.75 | 333.33 |  |  | 333.33 | 327.8 | 329.75 | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/Paid parking on premises/balcony (replaces 1384811870668527117, inactive next 60 days) |  |  |  |  |  | 278 | 273.4 (272.4) | 271.75 (273.75) | 271.33 (269.33) |  |  | 305.33 (312) | 320.4 (325.6) | 363.75 (368.5) | 445.75 (457.5) |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost |  |  |  |  |  |  |  | 234 (244.75) | 240 (248) |  |  | 211 |  | 229.25 (234.75) | 305.75 (310) |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises |  |  |  | 288.5 | 288.5 |  |  |  | 250 |  | 264 | 250 | 238.4 |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 310 | 290 | 258 | 270 | 270 | 290 | 258 | 260 | 263.33 |  | 300 | 306 | 291.8 | 360 | 360 |
| **Comp median (n)** | | | 4.8 (18) | | **310.5** (2) | **290** (5) | **277.8** (5) | **297.25** (4) | **297.25** (4) | **295** (8) | **282.1** (8) | **279.25** (9) | **276.33** (10) | **567** (1) | **292.5** (3) | **305.66** (10) | **320.4** (9) | **361.88** (10) | **380.25** (9) |
| Wider 2-bed sample median (n) | | | | | 300 (7) | 285.5 (10) | 269 (10) | 262.75 (16) | 273 (11) | 295 (12) | 307 (12) | 288 (14) | 262.5 (22) | 508 (2) | 296.75 (10) | 279.67 (29) | 278.6 (25) | 329.75 (21) | 389.62 (18) |
| **Ours 3547481 (Airbnb 1791529331262420081) New, 0 reviews** | | | | | not returned | **257.33** | **228.2** | **259.5** | not returned | **232** | **216.6** | **224.5** | **235.33** | not returned | not returned | **295.33** | **283.6** | not returned | **399.75** |

## P20 Waterford Court, 2-bed, max 4 (Airbnb 1791529331262420081, New, 0 reviews)

### 20-24 Nov: is PriceLabs synced now? Yes
- **PriceLabs has caught up with the Smoobu cancellation.** `raw/prices_3547481.json` 12 Nov was refreshed at 11 Nov 17:16:22Z.
  - 21-24 Nov are now open: `user_price` 264 / 221 / 254 / 252, no longer "Booked".
  - 20 Nov is no longer `unbookable` (`unbookable`=0, 255).
  - Smoobu still shows the stay `cancelled` (`reservations.csv` 12 Nov).
- **The re-price cut every open night.** Raw `price` 11 Nov -> 12 Nov:
  - 20-24 Nov: 234/301/247/294/279 -> **242/251/220/254/252** (21-24 Nov 1,121 -> 977, -12.8%; 20 Nov +3%).
  - 13-17 Nov: 324/340/279/268/275 -> 276/291/246/237/245 (-11% to -15%).
  - 14-18 Dec: about -6%. 26-31 Dec: about -5%.
  - The only edits were Reyhan's -5% on 13-15 and 20-21 Nov. **16-17 Nov, 22-24 Nov and all of December fell 4-14% with no edit.** That is the algorithm; which factor moved is NOT CHECKED.
- **Airbnb follows the new prices** at the usual layer. (all-in - £150) / PriceLabs `price` = 0.765-0.766 in November and 0.901 in December.
  - 20-25 Nov: £1,083 (£216.60/night), was £237.40.
  - 21-25 Nov: £898 (£224.50/night), was £252.00.
  - 22-25 Nov: £706 (£235.33/night), was £259.33.
  - 20-23 Nov: £696 (£232.00/night), checked for the first time today.
  - No discount line on any of them.
- Against the cancelled booking: £224.50 all-in is still **+13.9%** on the £197.14 that guest paid. It was **+27.8%** yesterday.
- **t-p20-delivery: still open (for Corentin to confirm).**
  - Policy (24 Oct) says the Smoobu block on 20-22 Nov is the delivery.
  - PriceLabs blocks 18-19 Nov instead. On 11 Nov Reyhan re-set 20-21 Nov to -5%, min 3, which treats those nights as sellable. Airbnb sells 20-25 Nov.
- **Booking.com availability for 20-24 Nov: NOT CHECKED.**

### Price percentile, rating, review gap, supported positioning
- Comp median rating is 4.8 (17.5 reviews). Ours: no rating, 0 reviews, so `quality_premium` = 0.0.
- "Line" = comp median x 0.85: a **-15% new-listing allowance**. This is my judgement (unchanged since 3 Nov), not the function's output.
- Columns: "Factor" = (all-in - £150) / PriceLabs; "Mkt pctl" = position of our PriceLabs price in the market P25/P50/P75 (`neighbourhood_data` 12 Nov).

| Stay | Ours Airbnb 12 Nov (11 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n) | PL vs P50 (mkt pctl) | Factor | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 13-15 Nov (default Fri-Sun) | not sellable (min 3) | 310.5 (2) | n=2 | | median 300 (7) | | | |
| **13-16 Nov** | **257.33** (290.67) | 290 (5) | **P0 / -11.3%** | +4.4% | P30 (10) | 271 vs 213 (+27%, P71) | 0.765 | raise +10% |
| 13-18 Nov (whole 5-night gap) | 228.2 (257.4) | 277.8 (5) | P0 / -17.9% | -3.4% | P10 (10) | 259 vs 211.4 (+23%, P67) | 0.765 | raise +10% |
| 16-18 Nov | 259.5 (283) | 297.25 (4) | P0 / -12.7% | +2.7% | P50 (16) | 241 vs 209 (+15%, P62) | 0.766 | raise +10% |
| 17-19 Nov (default Tue-Thu) | blocked 18-19 | 297.25 (4) | comps only | | 273 (11) | | | |
| **20-23 Nov (new)** | **232.0** | 295 (8) | **P0 / -21.4%** | -7.5% | P0 (12) | 237.7 vs 213 (+12%, P59) | 0.766 | raise +10% |
| **20-25 Nov** | **216.6** (237.4) | **282.1 (8)** | **P0 / -23.2%** | **-9.7%** | P0 (12) | 243.8 vs 212.2 (+15%, P61) | 0.765 | raise +10% |
| **21-25 Nov (reopened)** | **224.5** (252.0) | **279.25 (9)** | **P0 / -19.6%** | **-5.4%** | P0 (14) | 244.2 vs 211.5 (+15%, P62) | 0.766 | raise +10% |
| 22-25 Nov | 235.33 (259.33) | 276.33 (10) | P0 / -14.8% | +0.2% | P9 (22) | 242 vs 211 (+15%, P61) | 0.766 | raise +10% |
| **5 Dec (gap night)** | unbookable (min 3) | 567 (1) (1-night 5-6 Dec) | n=1 | | 508 (2) | 313 vs 227 (>P75 300) | | |
| 10-12 Dec (30-day default) | booked | 292.5 (3) | comps only | | 296.75 (10) | | | |
| **14-17 Dec** | **295.33** (311) | **305.67 (10)** | **P40 / -3.4%** | +13.7% | P62 (29) | 272.3 vs 218 (+25%, P70) | 0.901 | raise +10% |
| **14-19 Dec (all 5 open nights)** | **283.6** (294.6) | 320.4 (9) | P33 / -11.5% | +4.1% | P56 (25) | 281.6 vs 222.4 (+27%, P71) | 0.901 | raise +10% |
| 23-27 Dec | booked (19-26 Dec) | 361.88 (10) | comps only | | 329.75 (21) | | | |
| **26-30 Dec** | **399.75** (419.5) | 380.25 (9) | **P67 / +5.1%** | +23.7% | P56 (18) | 402.2 vs 257.5 (+56%, >P75) | 0.901 | raise +5% / +10% |

What moved overnight:
- **Ours fell 4-12% after the 17:16Z re-price.**
- The comps were flat. Same-comp median change: -1.7% on 13-16 Nov, -1.0% on 13-18 Nov, 0% on every other stay.
- Two comps cut 21-25 Nov: 1316210326145130709 £332 -> £288.50 and 1516006875488990547 £244.75 -> £234.
- **On 21-25 Nov we went from P11 to P0**: we are now the cheapest of 9, and of 14 in the wider sample.

**Supported positioning (one line each):**
- **20-24 Nov: take Reyhan's -5% back to 0% (+5.3%) on 20-24 Nov.** That -5% covers 20-21 Nov (set 11 Nov) and 22-24 Nov (set 8 Nov).
  - With 0%, 21-25 Nov is about **£234/night**: P11, -16% vs median, -1.3% vs line. 20-25 Nov is about £226 (P0, -5.6% vs line).
  - These nights are outside the policy -5% range (31 Oct-19 Nov), so this is not a policy conflict.
  - The evidence supports this step and no more: even at 0% we stay at or under the 0-review line. +10% (`recommend`) would put a 0-review listing above the line 8-12 days out.
  - **Do it only after Corentin confirms the delivery dates (t-p20-delivery).**
- **13-16 Nov (P0 / -11%, +4.4% vs line): hold.** Check-in is tomorrow. The -5% on 13-15 Nov restores the policy's -5% (31 Oct-19 Nov), so it is not to be re-raised.
- **13-18 Nov (P0, -3.4% vs line):** the gap comes from the policy-range -5% on 16-17 Nov plus the algorithm's cut. Removing it is supported, as on 10-11 Nov, but it is **Corentin's call against the 24 Oct decision**. It is not a new proposal.
- **16-18 Nov:** hold (P0 of 4, +2.7% vs line).
- **5 Dec (t-p20-5dec-orphan): NOT fixed, 3rd day.** It is still `unbookable`=1, because 1-20 Dec is 0%, min 3, and 5 Dec sits between the 25 Nov-5 Dec and 6-14 Dec stays.
  - Evidence supports **min 1 at the current 313** (above market P75 300, under the only 1-night comp at £567, n=1). That is about £282 room on Airbnb at the 0.90 factor.
- **14-17 Dec (P40 / -3.4%) and 14-19 Dec (P33 / -11.5%, +4.1% vs line): hold.** We are at or near the comp median, which is the most the evidence supports for 0 reviews. The algorithm's -5% to -7% overnight still leaves 14-17 Dec 13.7% above the line.
- **26-30 Dec (P67 / +5%, +24% vs line): hold.**

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### What changed since 11 Nov
- **Reyhan 11 Nov 15:38:45Z: 10-26 Dec -2% -> -5%, min 3** on both listings (`get_user_logs`, overrides).
  - This goes against yesterday's open proposals: +5% on 10-12 Dec, and removing the -2% over Christmas (a-peak-check).
  - **It is not a policy item; it is a team edit that conflicts with an open proposal, so it is for Corentin to confirm, not a new proposal.**
- Other overrides are unchanged:
  - 13-16 and 18-26 Nov -2%; 17 Nov +35% min 1; 27 Nov +50% min 1; 1 Dec +50% min 1 (intentional per policy).
  - 7-9 Dec -7%; 27 Dec-1 Jan -3%; 2-31 Jan -10%.
- **Smoobu:** no new P13 bookings or cancellations. **10-26 Dec (17 nights) is still fully open.**
- **Effect on Airbnb**, same stays as 11 Nov (3090701):
  - 10-13 Dec £259.67 -> **£234.67 (-9.6%)**.
  - 14-17 Dec £245.67 -> £238.33 (-3.0%).
  - 20-25 Dec £223.60 -> £214.40 (-4.1%).
  - 23-26 Dec £265.67 -> £256.33 (-3.5%).
  - 24-27 Dec £262.67 -> £254.00 (-3.3%).
  - 3064856 moved the same way.
- **The 10 Dec `price` / `user_price` gap is gone.** 3064856 10 Dec was 272 / 221 yesterday and is 256 / 264 today; 3090701 is 195 / 201.
  - In December `price` now sits about 3% under `user_price` on both listings.
  - 10-13 Dec sells on Airbnb at **0.86 x `price`**, against 0.90 on every other December stay. NOT EXPLAINED.

### Price percentile, rating, review gap, supported positioning
**Rating and reviews vs comp median** (4.76, 13 reviews):
- 3090701, 4.7 (10): -0.06 stars, 3 reviews fewer; `quality_premium` **-0.024**.
- 3064856, 4.31 (13): -0.45 stars, same review count; `quality_premium` **-0.15** (the cap).

"Line" = comp median x (1 + quality premium). The flat sells at whichever twin is cheaper.

| Stay | Ours 3090701 / 3064856 (11 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n) | PL vs P50 | Factor | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 13-15 Nov (default Fri-Sun) | booked | 425.5 (1) | comps only | | 300 (7) | | | |
| 17 Nov (1 n) | 316 / 325 (306 / 324) | 185 (3) | P100 / +71% ; P100 / +76% | (1-night, cleaning inflates ours) | P71 (7) | 216 / 228 vs 205 | 0.768 | raise +5% |
| 17-19 Nov (default Tue-Thu) | booked from 18 Nov | 196.5 (5) | comps only | | 238 (25) | | | |
| 27 Nov (1 n) | 338 / 397 (338 / 397) | none returned | | | P100 (3) | 245 / 322 vs 238 | 0.767 | mkt: raise |
| 1 Dec (1 n, +50% intentional) | 323 / 377 (324 / 378) | none returned | | | P33 (3; median 461) | 226 / 296 vs 226 | 0.765 | (intentional override, numbers only) |
| 10-12 Dec (30-day default, Thu-Sat) | below min 3 | 258.25 (2) | comps only | | 276.75 (14) | | | |
| **10-13 Dec** | **234.67 / 266** (259.67 / 271) | **291.5 (2)** | **P50 / -19.5% ; P50 / -8.7%** | **-17.5% / +7.3%** | **P19 / P38 (21)** | 214.7 / 252.7 vs 239.7 (-10.4% / +5.4%) | 0.86 | raise +10% |
| 11-15 Dec | 233.25 / 240 (246.25 / 234.75) | 216 (1) | n=1 | | P18 / P23 (22) | 217.2 / 224.8 vs 228.5 | 0.901 | mkt: raise +10% |
| **14-17 Dec (midweek)** | **238.33 / 227.67** (245.67 / 235) | **220 (7)** | **P86 / +8.3% ; P57 / +3.5%** | +11.0% / +21.7% | P47 / P29 (38) | 209 / 197.3 vs 223 (-6.3% / -11.5%) | 0.90 | raise +5% / +10% |
| 18-20 Dec (Fri-Sun) | below min 3 | 302 (4) | comps only | | 320.25 (10) | | | |
| **20-25 Dec (5 n)** | **214.4 / 204** (223.6 / 213); "Long stay discount" strikes £1,175 -> £1,072, £1,116 -> £1,020 | 211.4 (2) | P50 / +1.4% ; P0 / -3.5% | +3.9% / +13.5% | **P14 / P7 (14; median 287.2)** | 227.6 / 214.6 vs 255.8 (-11.0% / -16.1%) | 0.81 | raise +10% |
| **23-26 Dec (Christmas)** | **256.33 / 244.67** (265.67 / 253.67) | 242 (2) | P100 / +5.9% ; P50 / +1.1% | +8.5% / +18.9% | **P11 / P5 (19; median 313.33)** | 229 / 216 vs 268.7 (-14.8% / -19.6%) | 0.901 | raise +10% |
| 24-27 Dec | 254 / 242.67 (262.67 / 251) | 245.83 (2) | P50 / +3.3% ; P50 / -1.3% | +5.9% / +16.1% | **P12 / P12 (16; median 327.83)** | 226.3 / 214 vs 276.7 (-18.2% / -22.7%) | 0.90 | raise +10% |
| **5-8 Jan (twins, midweek)** | **207.33 / 198.67** (207 / 198.33) | **209 (8)** | **P38 / -0.8% ; P25 / -4.9%** | +1.6% / +11.8% | P24 / P22 (49) | 174.7 / 165 vs 204 (-14.4% / -19.1%) | 0.901 | raise +10% |
| 15-17 Jan (Fri-Sun) | below min 3 | 255 (7) | comps only | | 257 (36) | | | |

Comp moves:
- **The kept comps thinned out over December.** 1761224847419174970 (0.12 km, 4.83) was not returned on 10-13 Dec or over Christmas (booked or min-stay), so 10-13 Dec, 20-27 Dec and 11-15 Dec are now n=1-2. The wider sample is used alongside.
- The same comps were flat to slightly down: -0.8% to -1.5% over Christmas, 0% on 14-17 Dec and January.
- Two moved on 10-13 Dec: 1411449348357673454 rose £324.33 -> £351 (+8%) and 1014671215040555613 cut £239.67 -> £232.

**Twins (t-p13-twins): still fixed.**
- January: Airbnb 5-8 Jan **£207.33 vs £198.67 (+4.4%)**.
- December: 3090701 is the dearer twin by about 4.7% (14-17 Dec £238.33 vs £227.67).
- 10-13 Dec is still reversed: 3064856 is dearer, £266 vs £234.67. PriceLabs 10-12 Dec is 256/277/225 vs 195/211/238.
- The two listings are different, never identical, so the twin rule is met. Order is deprioritised (policy), so not raised.

**Supported positioning (one line each):**
- **10-13 Dec (cheaper twin P50 of n=2, P19 of the wider 21, -17.5% vs its line, PriceLabs -10% vs market P50): -5% back to at least 0% is supported** (about +5%).
  - That puts 3090701 at about £244 (still P19-P24 of the wider sample, -14% vs its line) and 3064856 at about £277 (+12% vs its line).
  - Yesterday's +3% target is now +8% from today, and is no longer clearly supported because of 3064856.
  - **Reyhan's -5% is the opposite direction, so this is for Corentin to confirm.**
- **11-15 Dec:** this is covered by the 10-12 Dec step. Hold 13-14 Dec (Low/Normal demand).
- **14-17 Dec midweek: the -5% is fine; hold** (P57-P86 of n=7, +11% / +22% vs the lines).
- **Christmas 20-26 Dec: back to 0% (+5.3%) is supported; the full +10% (`recommend`) is not.**
  - The kept comps are n=2, at the cheap end, and edged down.
  - The wider sample has us at **P5-P14**, and PriceLabs is 11-23% under market P50.
  - With 0%, 3090701 23-26 Dec is about £267 (still P~16 of the wider 19).
  - **a-peak-check (P13): went backwards since 11 Nov** (-2% -> -5%). For Corentin to confirm against Reyhan's edit.
- **January twins (5-8 Jan): hold.** P38 / P25 of n=8, on or above both lines (+1.6% / +11.8%). Market occupancy for those nights is 16.7%, so a raise is not supported even though PriceLabs is 14-19% under market P50.
- **17 Nov (1 night): hold.** It is P100 of n=3 cheap 7-sleepers, but P71 of the wider sample, and 1-night all-in overstates ours by the cleaning fee.

## P10 Hanger Lane, 1-bed (3318177)
- No sellable nights. The confirmed Airbnb stay 18 Oct-19 Nov (`reservations.csv` 12 Nov) covers every night up to the handback (policy last night 18 Nov).
- No PriceLabs edits (`get_user_logs`). No comps or positioning.

## P02 Ladbroke Grove, P03 Bayswater
Blocked on purpose (policy `intentional_blocks`). Refreshed 12 Nov (`listings.csv`: 2999946 at 00:23Z, Bayswater channex at 03:28Z). No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or Smoobu (`kpi_summary.md` 12 Nov: collect-data, 0 rows). Own price, percentile, rating gap and premium: **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (not attempted this run): comps, our displayed prices, and P20 20-24 Nov availability. The analysis is Airbnb only. Comp cancellation policies NOT CHECKED.
2. **Why the P20 re-price cut 4-14% on nights Reyhan did not touch** (16-17 Nov, 22-24 Nov, December): NOT CHECKED. Which PriceLabs factor moved is not in the raw file.
3. **P20 delivery dates:** policy has 20-22 Nov; PriceLabs blocks 18-19 Nov; Reyhan re-priced 20-21 Nov as sellable on 11 Nov. Corentin to confirm.
4. **P13 10-13 Dec sells at 0.86 x PriceLabs `price` on Airbnb**, against 0.90 on other December stays. NOT EXPLAINED. Smoobu rates were not pulled.
5. **Thin comp coverage** (labelled; wider-sample or market percentiles used instead):
   - P13: n=0-2 on 27 Nov, 1 Dec, 10-12/10-13 Dec, 11-15 Dec and all of Christmas.
   - P20: n=1-2 on 13-15 Nov and 5-6 Dec.
6. **Comps' cleaning split is unknown**, so all-in gaps on 1-night stays (17 Nov, 27 Nov, 1 Dec, 5 Dec) overstate ours.
7. The P13 Airbnb-to-Smoobu id mapping is "likely / probable" (policy `airbnb_listings_24oct`).
8. P16, P18 and P19 have no data; P10 has no sellable nights.
