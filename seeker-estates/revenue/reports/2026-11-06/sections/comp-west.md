# Competitor positioning: WEST + HERTS (D = 2026-11-06)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** `data/policy.json` read first. PriceLabs calls were read-only and made one at a time; all returned 200:
1. `get_user_logs` (listing log, 5-6 Nov) for 3064856, 3090701, 3547481, 3318177: **4 entries, all Reyhan, 5 Nov 10:54:55-10:55:03Z, all on P13** (see below). Nothing on P20 or P10.
2. `get_listing_date_overrides` 3064856 (6 Nov-31 Dec) and 3090701 (6-30 Nov).
3. `get_neighbourhood_data` detail for 3064856 (2 BR n=117, P25/P50/P75 189/223/274) and 3547481 (2 BR n=153, 213/249/316). Saved to `scratchpad/west06/dl/neigh_*.json`.

**Smoobu** (GET `/rates` only, 6 Nov-27 Dec, saved `scratchpad/west06/dl/smoobu_rates.json`): equals the PriceLabs `price` field in `raw/prices_*.json` on every night **except 3090701 on 8-11 Nov** (below). `reservations.csv` 6 Nov: **no change for P10, P13 or P20** vs 5 Nov.

**Airbnb:** public search and listing pages, checked 2026-11-06, plain `curl`, default headers; no bot check met. **Booking.com: NOT CHECKED.**

**Method (unchanged from 3-5 Nov):** 4 guests, entire home, min 2 bedrooms; ~1.3 km box around the PriceLabs coordinates plus ~0.2 km box around each comp. Price = Airbnb all-in total / nights (cleaning and Airbnb fees INCLUDED, taxes not shown separately; ours on the same basis, £150 cleaning). 5+ night stays are after length-of-stay discounts. Comp cancellation policy NOT CHECKED.

**Comp sets: no replacements today.**
- P13: same 11 ids. 10 returned on at least one stay. **1411449348357673454** (Superhost 4.78/49) was not returned on any of the 14 stays, but a 0.2 km probe returned it for 29 Nov-2 Dec (£929 total) and 10-13 Jan 2027, so it is still bookable inside 60 days: **kept**, not replaced.
- P20: same 12 ids (incl. 6488364, added 5 Nov); all 12 active.

**Occupancy** (Smoobu `reservations.csv` 6 Nov, cancelled excluded; market `kpi_pack` 6 Nov):

| Listing | 14 d (6-19 Nov) | 30 d (6 Nov-5 Dec) | 60 d (6 Nov-4 Jan) | Market 30 / 60 | Lead 30 / 60 |
|---|---|---|---|---|---|
| P13 | 8/14 | 22/30 = **73.3%** | 30/60 = **50.0%** | 42% / 38% | **+31 / +12 pts** |
| P20 | 3/14 | 13/30 = **43.3%** | 13/60 = **21.7%** | 36% / 30% | **+7 / -8 pts** |

P20's 30-day lead fell from +11 to +7 pts (window roll, no new booking), so `recommend` on November stays moved from "raise +10%" to "in line, raise +5% where below what quality supports".

**Rows written:** `data/snapshots/2026-11-06/comps.csv` **286 rows** (P13 11 x 14 stays, P20 12 x 11) appended under `flock .comps.csv.lock` (file already copied forward by another agent). `channel_checks.csv` **34 rows** (our three Airbnb listings) under `.channel_checks.csv.lock`. Filter `source` on "checked 2026-11-06" and "comp-west"; `date` = check-in, full stay in `source`.
**Recompute check:** `snapshot.load('2026-11-06')` + `comp_summary` gives P13 8-10 Nov n=4 median 212, P0 / -10.4% (3090701) and -9.0% (3064856); P20 13-16 Nov n=7 median 304.33, P14 / -26.7%; P20 6-9 Nov n=3 median 290, P0 / -20.8%.

## Comp tables (Airbnb all-in £/night, 4 guests, checked 2026-11-06)
Bracket = same comp, same stay on 5 Nov where it moved by £1 or more. Blank = not returned (booked or min-stay).

#### P13

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 8-10 Nov | 10-12 Nov | 11-13 Nov | 8-13 Nov | 12-13 Nov | 13-15 Nov | 17-18 Nov | 27-28 Nov | 1-2 Dec | 7-9 Dec | 11-13 Dec | 18-20 Dec | 23-26 Dec | 18-26 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.82 (11) | Garden view/balcony |  | 242.5 (244.5) |  |  |  |  |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | Paid parking on premises/Guest favourite | 207 |  | 207 |  |  |  |  |  |  | 264.5 (269.5) |  |  |  |  |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking on premises | 206 | 206 | 206 | 174.8 |  |  |  |  |  | 231.5 (237.5) |  |  |  |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  |  |  |  |  |  |  |  | 270 (269) | 232 | 202.12 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.78 (49) | Superhost |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed |  |  |  |  |  |  | 185 |  |  |  |  |  |  |  |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  |  |  |  |  |  |  |  |  | 242 (245) | 282.5 | 272 (273) | 249.67 (245.67) | 190.5 (188.75) |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift | 411 | 411 | 411 | 385.2 |  | 403.5 |  |  |  | 433.5 |  | 450 |  |  |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking on premises | 217 | 217 | 217 | 199 |  |  |  |  |  | 259 |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | Lift/Paid parking on premises/balcony/Guest favourite |  |  |  |  | 403 |  |  | 394 | 423 |  |  | 331.5 |  |  |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking on premises |  |  |  |  |  |  | 185 |  |  |  |  |  |  |  |
| **Comp median (n)** | | | 4.78 (13) | | **212** (4) | **229.75** (4) | **212** (4) | **199** (3) | **403** (1) | **403.5** (1) | **185** (2) | **394** (1) | **423** (1) | **259** (5) | **282.5** (1) | **301.75** (4) | **240.83** (2) | **196.31** (2) |
| Wider 2-bed sample median (n) | | | | | 217 (15) | 240.75 (16) | 217 (17) | 268.8 (22) | 312.5 (2) | 300 (11) | 185 (5) | 337.5 (4) | 456.5 (2) | 261.75 (18) | 351.5 (14) | 301.5 (13) | 288.33 (21) | 291.5 (17) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.67 (9)** | | | | | **190** | **194** | **206.5** | **158.6** (strike £864 -> £793) | not returned | not returned | **316** | **336** | **325** | **259.5** | **284** | **277.5** | **256.67** | **192.38** (strike £1,784 -> £1,539) |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | | | | **193** | **196.5** | **199** | **157.8** (strike £860 -> £789) | not returned | not returned | **298** | **406** | **391** | **250** (strike £541 -> £500) | **272.5** | **266** | **245.33** | **182.75** (strike £1,694 -> £1,462) |

#### P20

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6-9 Nov | 13-16 Nov | 16-18 Nov | 16-19 Nov | 20-23 Nov | 22-25 Nov | 5-8 Dec | 11-14 Dec | 18-21 Dec | 21-24 Dec | 23-27 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost | 281 | 281 |  | 281 | 283.33 (281) | 282.67 (281) | 283.67 (281) | 281 | 283.67 (281) | 281 | 279 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises |  | 304.33 (283.67) |  | 284.67 (282) |  |  |  | 266.67 | 264.33 (255.33) |  |  |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises |  |  | 403.5 | 393.33 | 393.33 |  |  |  |  | 393.33 | 388.5 |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (55) | Lift |  | 342.67 (335.33) |  | 324 (317.33) | 339 | 346.33 (343.33) | 369.33 (377.33) | 409.33 | 387.33 | 418.33 (407) | 408.25 (400.5) |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | 382.67 (396.67) | 382.67 |  | 382.67 | 382.67 | 382.67 | 382.67 | 382.67 | 382.67 | 382.67 | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony |  |  |  |  | 338.67 | 323 | 392.33 | 463.67 | 479 | 446.67 | 505.75 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises |  |  | 281.5 | 261.67 | 276.33 | 261.67 |  | 276.33 |  | 261.67 | 262.5 |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony |  | 333.33 |  | 333.33 | 333.33 | 333.33 | 333.33 | 333.33 | 333.33 | 333.33 | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/Paid parking on premises/balcony (replaces 1384811870668527117, inactive next 60 days) |  |  |  |  | 286 (282.67) | 272.33 |  | 360.33 (358.67) | 370 (365.67) | 355 (349.33) | 361.25 (368.5) |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost |  | 179.67 (192) | 208 (215) | 196 (202.33) | 202 (214.67) | 215.67 (222.33) |  |  |  | 245 (241.33) | 243.25 (240.25) |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises |  |  | 264 | 250 |  | 250 |  |  | 250 |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 290 | 290 | 270 | 250 | 290 | 263.33 | 283.33 | 290 | 312 | 370 | 360 |
| **Comp median (n)** | | | 4.8 (18) | | **290** (3) | **304.33** (7) | **270** (5) | **282.84** (10) | **311.66** (10) | **277.5** (10) | **351.33** (6) | **333.33** (9) | **333.33** (9) | **362.5** (10) | **360.62** (10) |
| Wider 2-bed sample median (n) | | | | | 285.5 (6) | 290 (15) | 264 (17) | 268.34 (22) | 326.67 (17) | 274.33 (20) | 369.33 (11) | 346.33 (16) | 333.33 (17) | 362.5 (20) | 361.25 (21) |
| **Ours 3547481 (Airbnb 1791529331262420081) New, 0 reviews** | | | | | **229.67** | **223** | **249** | not returned | **246.33** | **273.67** | **309.67** | **290** | **289.67** | **307.67** | **300.75** |
