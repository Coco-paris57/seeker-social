# Competitor positioning: WEST + HERTS (D = 2026-11-07)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** I read `data/policy.json` first. All PriceLabs calls were read-only and returned 200:
1. `get_user_logs` (listing log, 5-7 Nov) for 3064856, 3090701, 3547481 and 3318177 returned **4 entries, all from Reyhan on 5 Nov 10:54:55-10:55:03Z** (P13 8-12 Nov -10% and 7-20 Dec -7%). **No PriceLabs edits since 6 Nov 06:00Z** on P13, P20 or P10.
2. `get_listing_date_overrides` for 3090701 and 3547481 (7 Nov-31 Dec). I made these two calls in parallel by mistake. Both returned 200.
3. `get_neighbourhood_data` detail for 3064856 (2 BR n=117, P25/P50/P75 191/225/276) and 3547481 (2 BR n=154, 215/251/316). Saved to `scratchpad/west07/dl/neigh_*.json`.

**Smoobu:** GET `/api/rates` 7 Nov 07:20Z, 7 Nov-31 Dec, saved to `scratchpad/west07/dl/smoobu_rates.json`. It **equals the PriceLabs `price` field in `raw/prices_*.json` on every night for 3064856, 3090701 and 3547481**, including 3090701 8-11 Nov. Yesterday's Smoobu 150/150/150/160 has been overwritten by 161/162/165/170 (the 6 Nov 08:48Z push). Smoobu `reservations.csv` 7 Nov vs 6 Nov shows two new rows in this batch: **P20 Airbnb 19-26 Dec confirmed** (room £1,428.00) and **P13 Airbnb 20-25 Dec cancelled** (room £917.73).

**Airbnb:** public search and listing pages, checked 2026-11-07 with plain `curl` and default headers. No bot check was met. **Booking.com: NOT CHECKED.**

**Method (unchanged from 3-6 Nov):** 4 guests, entire home, at least 2 bedrooms. Search area: a box of about 1.3 km around the PriceLabs coordinates, plus a box of about 0.2 km around each comp. Price = Airbnb all-in total / nights, with cleaning and Airbnb fees INCLUDED (taxes are not shown separately). Our listings are priced on the same basis (£150 cleaning). Stays of 5 or more nights are after length-of-stay discounts (comps' and ours). Comp cancellation policies: NOT CHECKED.

**Comp sets: no replacements.** All 11 P13 comps and all 12 P20 comps were returned on at least one stay today. 1411449348357673454 (P13, Superhost 4.78/49) was returned directly on 13-15 Nov (£288/night), so it is active.
**Our ratings:** 3090701 is now **4.7 (10)**, up from 4.67 (9), so it gained one review. 3064856 is 4.31 (13). P20 is New with 0 reviews.

**Occupancy** (Smoobu `reservations.csv` 7 Nov, cancelled bookings excluded; market from `pl_kpis.csv` 7 Nov):

| Listing | 30 d (7 Nov-6 Dec) | 60 d (7 Nov-5 Jan) | Market 30 / 60 | Lead 30 / 60 |
|---|---|---|---|---|
| P13 (one flat) | 22/30 = **73.3%** | 29/60 = **48.3%** | 43% / 38% | **+30 / +10 pts** |
| P20 | 13/30 = **43.3%** | 20/60 = **33.3%** (incl. 19-26 Dec) | 37% / 30% | **+6 / +3 pts** |

P20's 60-day lead moved from **-8 to +3 pts** with the Christmas booking. As a result, `recommend` for December changes from "fix-listing" to "in line: raise +5% where below what quality supports, else hold".

**Rows written:** **298 rows** in `data/snapshots/2026-11-07/comps.csv` (P13: 11 comps x 14 stays; P20: 12 comps x 12 stays) and **33 rows** in `channel_checks.csv` (our three Airbnb listings). Both were appended under `flock` (`.comps.csv.lock` / `.channel_checks.csv.lock`); other agents had already copied the files forward. To find these rows, filter `source` on "checked 2026-11-07" and "comp-west". The `date` column is the check-in; the full stay is in `source`.
**Recompute check:** `snapshot.load('2026-11-07')` + `comp_summary` gives:
- P13 8-10 Nov: n=3, median 217, P0 / -8.3% (3090701).
- P20 13-16 Nov: n=5, median 319, P0 / -26.2%.
- P20 20-23 Nov: n=9, median 329, P0 / -29.1%.
- P20 19-26 Dec: n=7, median 330.14; the booking (£225.43 all-in) is at P0 / -31.7%.

## Comp tables (Airbnb all-in £/night, 4 guests, checked 2026-11-07)
A figure in brackets is the same comp's price for the same stay on 6 Nov, shown where it moved by £1 or more. A blank cell means the comp was not returned for that stay (booked or min-stay).

#### P13

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 8-10 Nov | 10-12 Nov | 11-13 Nov | 8-12 Nov | 12-13 Nov | 13-15 Nov | 17-18 Nov | 27-28 Nov | 7-9 Dec | 11-13 Dec | 18-20 Dec | 20-25 Dec | 23-26 Dec | 24-27 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.82 (11) | Garden view/balcony |  | 257.5 (242.5) |  |  |  |  |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | Paid parking on premises/Guest favourite | 207 |  | 207 |  |  |  |  |  | 271 (264.5) |  |  |  |  |  |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking on premises |  |  |  |  |  |  |  |  | 232.5 (231.5) |  |  |  |  |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  |  |  |  |  |  |  | 279 (270) | 219 | 244 (232) | 249 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.78 (49) | Superhost |  |  |  |  |  | 288 |  |  |  |  |  |  |  |  |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed |  |  |  |  |  |  | 185 |  |  |  |  |  |  |  |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  |  |  |  |  |  |  |  | 238.5 (242) | 284.5 (282.5) | 270 (272) | 216.4 | 249.33 | 251.33 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift | 411 | 411 | 411 | 389.5 |  | 425.5 (403.5) |  |  | 433.5 |  | 450 |  |  |  |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking on premises | 217 | 225 (217) | 225 (217) | 206 |  |  |  |  | 259 |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | Lift/Paid parking on premises/balcony/Guest favourite |  |  |  |  | 403 |  |  | 394 |  |  | 331.5 |  |  |  |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking on premises |  |  |  |  |  |  | 185 |  |  |  |  |  |  |  |
| **Comp median (n)** | | | 4.78 (13) | | **217** (3) | **257.5** (3) | **225** (3) | **297.75** (2) | **403** (1) | **356.75** (2) | **185** (2) | **394** (1) | **259** (5) | **284.5** (1) | **305.25** (4) | **217.7** (2) | **246.67** (2) | **250.17** (2) |
| Wider 2-bed sample median (n) | | | | | 216 (13) | 253.75 (16) | 235.5 (14) | 279.5 (13) | 276 (3) | 294 (12) | 185 (5) | 337.5 (4) | 255.5 (18) | 351.5 (14) | 303.5 (13) | 278.2 (16) | 299.5 (22) | 323.66 (16) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.7 (10)** | | | | | **199** | **203.5** | **206** | **163.5** | not returned | not returned | **310** | **336** | **260.5** | **285** | **276** | **213.6** (strike £1,170 -> £1,068) | **255.67** | **254.33** |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | | | | **191.5** | **195.5** | **198.5** | **156** | not returned | not returned | **300** | **405** | **250.5** (strike £544 -> £501) | **273** | **265** (strike £576 -> £530) | **203.6** (strike £1,114 -> £1,018) | **244.33** | **243** (strike £812 -> £729) |

#### P20

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 7-10 Nov | 13-16 Nov | 16-18 Nov | 20-23 Nov | 5-8 Dec | 7-10 Dec | 7-14 Dec | 11-14 Dec | 19-26 Dec | 21-24 Dec | 23-27 Dec | 26-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost | 284.67 | 281 |  | 281 (283.33) | 281 (283.67) | 281 | 254 | 281 | 254 | 281 | 279 | 281.5 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises |  |  |  |  |  | 341.67 | 282.86 | 328 (266.67) |  |  |  |  |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises |  |  | 403.5 | 393.33 |  | 393.33 |  |  |  | 393.33 | 388.5 |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (55) | Lift |  | 319 (342.67) |  | 329 (339) | 361.33 (369.33) | 366 | 364.29 | 412 (409.33) | 387 | 422.33 (418.33) | 412.25 (408.25) | 503 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | 382.67 | 424 (382.67) |  | 382.67 | 382.67 | 382.67 | 339.71 | 382.67 | 339.71 | 382.67 | 380.25 | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony |  |  |  | 338.67 | 392.33 |  |  | 463.67 | 441 | 446.67 | 505.75 | 595.5 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises |  |  | 281.5 | 276.33 |  | 261.67 | 238.57 | 276.33 |  | 261.67 | 262.5 | 257 |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony |  | 368.67 (333.33) |  | 333.33 | 333.33 | 333.33 | 293.43 | 333.33 | 293.43 | 333.33 | 329.75 | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/Paid parking on premises/balcony (replaces 1384811870668527117, inactive next 60 days) |  |  |  | 283.33 (286) |  |  |  |  | 323.29 | 355.33 | 360.5 | 442 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost |  |  |  |  |  |  |  |  |  | 245.33 | 244 | 330.75 |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises | 274.33 |  | 264 |  |  | 250 |  |  |  |  |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 276.67 | 290 | 270 | 290 | 283.33 | 270 | 255.71 | 290 | 330.14 | 370 | 360 | 360 |
| **Comp median (n)** | | | 4.8 (18) | | **280.67** (4) | **319** (5) | **275.75** (4) | **329** (9) | **347.33** (6) | **333.33** (9) | **282.86** (7) | **330.66** (8) | **330.14** (7) | **362.66** (10) | **360.25** (10) | **360** (9) |
| Wider 2-bed sample median (n) | | | | | 275.5 (8) | 307 (14) | 270 (17) | 327.84 (16) | 347.33 (12) | 294 (21) | 288.14 (13) | 331.5 (16) | 334.92 (14) | 362.66 (22) | 360.5 (21) | 388.38 (16) |
| **Ours 3547481 (Airbnb 1791529331262420081) New, 0 reviews** | | | | | **229.67** | **235.33** | **244.5** | **233.33** | **314.67** | **309.33** | **240.57** (strike £1,955 -> £1,684) | **310.67** | not returned | not returned | not returned | **406.5** |

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### What changed since 6 Nov 06:00Z
- **PriceLabs edits: none** (`get_user_logs`). Overrides are as on 6 Nov:
  - 8-12 Nov: -10%, min 2.
  - 13-16 and 18-26 Nov: -2%.
  - 17 Nov: +35%, min 1.
  - 27 Nov: +50%, min 1.
  - 1 Dec: +50%, min 1 (intentional per policy).
  - 7-20 Dec: -7%, min 2.
  - 21-26 Dec: -5%, min 3.
  - 27-31 Dec: -3%, min 7/5/4.
- **3090701 8-11 Nov:** Smoobu is now 161/162/165/170, equal to the PriceLabs `price`, so the unexplained 150/160 from yesterday is gone. Airbnb confirms it: 8-10 Nov £398 = 2 x 161.5 x 0.768 + 150. PriceLabs `user_price`/`booked_price` ("Your Price") still shows **150/150/150/160** on those nights, and no fixed override exists. Cause: NOT CHECKED.
- **20-25 Dec booking cancelled.** 20-26 Dec is open again on both twins. On Airbnb, 3090701 20-25 Dec shows a total of **£1,067.73 = £917.73 room + £150**, which is exactly the cancelled booking's room price after its "Long stay discount" of -£101.97 (room = 0.81 x PriceLabs = 0.90 x 0.90). So the stay is back on sale at the same price, and the booking was made on 3090701.

**Conflict for Corentin (reported, not a new proposal):** policy `price_changes` 24 Oct set the 8-12 Nov overrides to **0%**, but Reyhan's **-10%** is still live. **a-p13-record: not fixed.**

### Price percentile, rating, review gap, supported positioning
Comp median rating is **4.78**, with a median of **13** reviews; no comp gained a review today.
- **3090701, 4.7 (10):** -0.08 stars and 3 reviews behind; `quality_premium` = **-0.032**.
- **3064856, 4.31 (13):** -0.47 stars, level on reviews; `quality_premium` = **-0.15** (the cap).

How the columns work:
- `recommend` uses occupancy leads of +30 pts (30-day) and +10 pts (60-day). It uses the comp percentile where n >= 3, otherwise the PriceLabs market percentile (marked "mkt").
- "PL vs P50" = the pushed price (= Smoobu) vs the PriceLabs 2 BR daily P50, averaged over the stay.

| Stay | Listing | Airbnb 7 Nov | Comp median (n) | Comp pctl / vs median | Wider pctl (n) | PL vs P50 | `recommend` |
|---|---|---|---|---|---|---|---|
| **8-10 Nov** | 3090701 | **199** (6 Nov 190) | 217 (3) | **P0 / -8.3%** | P0 (13) | 161.5 vs 199.5 (**-19%**, mkt P24) | raise +10% |
| | 3064856 | **191.5** (193) | 217 (3) | **P0 / -11.8%** | P0 | 152 vs 199.5 (**-24%**, below P25 166.5) | raise +10% |
| **10-12 Nov (Tue-Thu midweek)** | 3090701 | **203.5** (194) | 257.5 (3) | **P0 / -21.0%** | P12 (16) | 167.5 vs 204 (-18%) | raise +10% |
| | 3064856 | **195.5** (196.5) | 257.5 (3) | **P0 / -24.1%** | P6 | 157.5 vs 204 (-23%, below P25) | raise +10% |
| **11-13 Nov (only way to sell 12 Nov)** | 3090701 | 206 (206.5) | 225 (3) | P0 / -8.4% | P21 (14) | 171 vs 205.5 (-17%) | raise +10% |
| | 3064856 | 198.5 (199) | 225 (3) | P0 / -11.8% | P7 | 161 vs 205.5 (-22%) | raise +10% |
| **8-12 Nov (4n)** | 3090701 / 3064856 | 163.5 / 156 | 297.75 (2) | n=2 | P0 / P0 (13; median 279.5) | 164.5 / 154.8 vs 201.8 | mkt: raise +10% |
| 12-13 Nov (1n) | ours min 2, not returned | | 403 (1) | n=1 | wider 276 (3) | 3064856 **162** vs P50 207 (below P25 174); 3090701 172 | see focus below |
| 13-15 Nov (default Fri-Sun) | ours booked | | 356.75 (2) | comp check only | | | |
| 17 Nov (1n) | 3090701 / 3064856 | 310 / 300 | 185 (2) | n=2 | P80 (5) | 208 / 195 vs 204 (+2% / -4%) | mkt: raise +10% |
| 27 Nov (1n) | 3090701 / 3064856 | 336 / 405 | 394 (1) | n=1 | P50 / P100 (4) | 243 / **333 (+40%, above P75 301)** | mkt: raise +10% / +5% |
| **7-9 Dec (30-day point)** | 3090701 | **260.5** (259.5) | 259 (5) | P60 / **+0.6%** | P56 (18) | 206 vs 231.5 (-11%) | raise +10% |
| | 3064856 | **250.5** (250; strike £544 -> £501) | 259 (5) | P40 / **-3.3%** | P44 | 194.5 vs 231.5 (-16%) | raise +10% |
| 11-13 Dec | 3090701 / 3064856 | 285 / 273 | 284.5 (1) | n=1 | P21 / P14 (14) | 233 / 220 vs 243 | mkt: raise +10% |
| 18-20 Dec | 3090701 | 276 (277.5) | 305.25 (4) | P25 / -9.6% | P31 (13) | 223 vs 248 (-10%) | raise +10% |
| | 3064856 | 265 (266; strike £576 -> £530) | 305.25 (4) | P0 / -13.2% | P15 | 211 vs 248 (-15%) | raise +10% |
| **20-25 Dec (cancelled dates, 5n)** | 3090701 | **213.6** (strike £1,170 -> £1,068) | 217.7 (2) | n=2 (-1.9%) | **P6 (16; median 278.2)** | 226.6 vs 255.8 (-11%) | mkt: raise +10% |
| | 3064856 | **203.6** (strike £1,114 -> £1,018) | 217.7 (2) | n=2 (-6.5%) | **P6** | 214.2 vs 255.8 (-16%) | mkt: raise +10% |
| **23-26 Dec (Christmas)** | 3090701 | 255.67 (256.67) | 246.67 (2) | n=2 (+3.7%) | **P14 (22; median 299.5)** | 228.3 vs 267 (-14.5%) | mkt: raise +10% |
| | 3064856 | 244.33 (245.33) | 246.67 (2) | n=2 (-0.9%) | **P5** | 215.7 vs 267 (-19%) | mkt: raise +10% |
| **24-27 Dec** | 3090701 | 254.33 | 250.17 (2) | n=2 | **P12 (16; median 323.66)** | 227 vs 275.7 (-18%) | mkt: raise +10% |
| | 3064856 | 243 (strike £812 -> £729) | 250.17 (2) | n=2 | **P0** | 214.3 vs 275.7 (-22%) | mkt: raise +10% |

**Next 14 days (7-20 Nov):** the open nights are **8-12 Nov and 17 Nov only**. 7 Nov is linked-booked, 13-16 Nov is booked or linked-blocked, and 18 Nov onward is booked. Same-comp change on these stays: **0% on 8-10 and 11-13 Nov, +3.7% on 10-12 Nov**, so comps rose (1761224847419174970 +£15; 1016465248942791796 +£8) while ours stayed flat or fell 1-4%. Market occupancy for 8-12 Nov is 39-49% (`neigh_3064856.json`).

**Supported positioning (one line each):**
- **3090701: line = -3% vs comp median (quality -0.032), and the +30-pt lead supports pricing at or above the line.** It sits at **-8% to -21% (P0) on 8-12 Nov**. The evidence supports about **£210/night all-in on 8-10 Nov (-3%)**, which is PriceLabs ~176/night. That is what removing the -10% gives (161.5 / 0.9 = 179).
- **3064856: line = -15% (capped).** It sits at -12% / -24% on 8-12 Nov, with the pushed price below market P25 on 8-11 Nov. `recommend` says raise +10% (lead +30, P0). The evidence supports policy's 0% on 8-12 Nov, not the -10%.
- **7-20 Dec -7% is not supported:**
  - At 7-9 Dec we sit at P40-P60 (-3% to +1%) with comps flat (0%).
  - 18-20 Dec is -10% / -13%.
  - The 60-day lead is +10 pts, and `recommend` says raise +10%.
  - No standing decision covers December prices.

### Focus: 12 Nov (a-raise-1012nov)
Market on 12 Nov: P25 174, **P50 207**, P75 277; occupancy **44.4%** (`neigh_3064856.json`).
- Ours: **3064856 £162** (6 Nov 163, **below P25**) and 3090701 £172 (1 below P25). Both are min 2 and 13 Nov is booked, so 12 Nov sells only as the second night of 11-13 Nov.
- On 11-13 Nov we are -8.4% / -11.8% vs 3 comps (P0). The only comp returned for 12-13 Nov alone is 1205241472054931937 at £403 (n=1).
- Evidence-supported level (P50 x (1 + quality)): **3090701 about £200, 3064856 about £176**. Today they are 14% and 8% under it.

**Status: not fixed** (no edit since 5 Nov; prices moved -£1).

### Focus: Christmas after the 20-25 Dec cancellation (a-peak-check, P13 part)
**Calendar (Smoobu):**
- 20 Dec is min 2; 21-26 Dec is min 3. 27 Dec onward is booked on 3090701 (27 Dec-3 Jan) and linked-blocked on 3064856.
- 20-26 Dec is therefore a **7-night open block**. Arrivals on 20-24 Dec work.
- **Arrivals on 25 and 26 Dec are impossible**, because a 3-night stay runs into 27 Dec.
- If 20-25 Dec rebooks as it was, **25-26 Dec becomes a 2-night gap that min 3 cannot sell.**

**Position:**
- 20-25 Dec: P6 of the wider 2-bed sample (median £278.2, n=16).
- 23-26 Dec: **P14 (3090701) / P5 (3064856)** (median £299.5, n=22).
- 24-27 Dec: P12 / P0 (median £323.66, n=16).
- Against market P50 the PriceLabs price is **-11% to -22%**.
- The two kept comps returned (1568189670839493789, 1014671215040555613) are both cheap: £216-251, 4.27 and 4.76 ratings. Their n=2 median is not representative.

**Quality-supported 23-26 Dec PriceLabs level** (P50 267 x (1 + q)):
- **3090701 about £258** (now 228, i.e. +13%).
- **3064856 about £227** (now 216, i.e. +5%).

**The 21-26 Dec -5% is not supported** (`recommend`: raise +10%; 60-day lead +10 pts). The reopened Christmas nights went back on sale at the price that produced a booking that was then cancelled. The evidence (P5-P14) says that price was low, not high. **Not fixed.**

### Twins (a-p13-twin)
The order is restored: 3090701 is the dearer twin again on every stay now that its Smoobu 150/160 is gone.
- Airbnb totals: 8-10 Nov £398 vs £383 (3.9%); 10-12 Nov £407 vs £391 (4.1%); 11-13 Nov £412 vs £397 (3.8%); 7-9 Dec £521 vs £501 (4.0%); 20-25 Dec £1,068 vs £1,018 (4.9%); 23-26 Dec £767 vs £733 (4.6%).
- PriceLabs gap: £9-13/night.

The twins are differentiated and not identical, so no action (price order is deprioritised per policy).

### Airbnb factor (for the channel section)
Factor = (our all-in - £150) / Smoobu price.
- **0.765-0.769** on all November stays.
- **0.90** on every December stay of 2-3 nights.
- **0.81** on 20-25 Dec (5 nights, "Long stay discount" 10%).

3064856 shows strikethroughs on 7-9 Dec, 18-20 Dec and 24-27 Dec (£544 -> £501, £576 -> £530, £812 -> £729), about 8-10%. Source: NOT CHECKED.

## P20 Waterford Court, 2-bed, max 4 (Airbnb 1791529331262420081, New, 0 reviews)

### What changed since 6 Nov 06:00Z
- **PriceLabs edits: none** (`get_user_logs`; overrides unchanged since 4 Nov):
  - 7-15 Nov: -5%, min 3.
  - 16-19 Nov: -5%, min 2.
  - 20-24 Nov: -5%, min 3.
  - 25-30 Nov: -10%.
  - 1-20 Dec: -5%.
  - 21-26 Dec: -5% (Reyhan, 4 Nov).
  - Base 330 (`listings.csv`).
- **7 Nov 01:30Z refresh raised December prices without any edit:**
  - `uncustomized_price` rose: for example 7 Dec 274 -> 354, so the pushed price went 242 -> 306.
  - 19-25 Dec pushed sum: 1977 -> 2069 (+4.7%).
  - 22 Nov fell 287 -> 235 (uncustomized 333 -> 258).
  - Likely algorithmic pickup / occupancy logic after the Christmas booking. Cause: NOT CHECKED.
- **New booking: Airbnb 19-26 Dec** (booked 6 Nov), 7 nights, room £1,428.00, cleaning £150, commission £244.59 (15.5% of room + cleaning).
- **t-p20-delivery: still open.** The Smoobu block is live on **18-19 Nov**, while policy records the delivery block as **20-22 Nov**, and 20-24 Nov is open for sale. This is a conflict for Corentin, unchanged.

### Focus: 19-26 Dec booking. Was it sold cheap?
**Yes.**

| Measure | Value | Source |
|---|---|---|
| Room paid | £1,428.00 = **£204.00/night**; all-in **£225.43/night** | `reservations.csv` 7 Nov |
| PriceLabs `price` on sale 6 Nov (19-25 Dec) | 278/257/281/285/292/294/290 = **£1,977** | `2026-11-06/raw/prices_3547481.json` (refreshed 6 Nov 01:29Z) |
| Paid / PriceLabs | **0.7223 = 0.85 x 0.85** (1977 x 0.7225 = 1428.38) | computed |
| Policy-expected (weekly 15% only) | 1977 x 0.85 = **£1,680.45** -> shortfall **£252.45 (15%) unexplained** by policy | `policy.json` length_of_stay_discounts, airbnb_discount |
| Today's Airbnb 7-night mechanism | 7-14 Dec: room £1,805 before discount = 0.90 x PriceLabs £2,005, then "Weekly stay discount" -£270.70 (15%) = **0.765 x PriceLabs** | Airbnb search 7 Nov |
| Same stay at today's mechanism | 1977 x 0.765 = £1,512 (6 Nov prices); 2069 x 0.765 = £1,583 (7 Nov prices) | computed |
| Effect of the two -5% overrides (1-20 Dec, 21-26 Dec) | without them the stay would have paid about **£1,503** (+£75) at the same 0.7225 | computed |
| Christmas comps, same stay 19-26 Dec, after their own weekly discounts | median **£330.14 all-in** (n=7, range 254-441); wider sample 334.92 (14) | Airbnb search 7 Nov |
| **Ours vs comps** | **-31.7%, P0: below all 7 comps** (cheapest comp 944872208662374170 at £254, Superhost 4.91/54) | |
| Ours vs -15% new-listing allowance (judgement, carried from 3 Nov) | line £280.62 all-in -> ours **-19.7%**, about **£386 below the line** for the stay (£733 below the median) | |
| PriceLabs market (2 BR, room) | room £204 vs P25 197.7 / P50 242.4 (avg 19-25 Dec) -> **about P29, -16% vs P50** | `neigh_3547481.json` |

**Conclusion:** the stay sold at the bottom of the comp set. There are two causes:
1. A paid rate 15% below what policy's weekly discount explains. The source of the second 0.85 is NOT CHECKED: it could be an Airbnb or Smoobu rule that was live at booking, or a lower pushed price at booking time. Unexplained per policy `airbnb_discount`; flagged for Corentin to check in the Airbnb reservation breakdown.
2. A PriceLabs Christmas price that was already 16% under market P50, with -5% overrides on top.

Even at the 0.765 factor live today, the stay would have been at about £237 all-in, still P0 of 7.

**Reyhan's 21-26 Dec -5% now affects only 26 Dec**, because 19-25 Dec is booked. 26-30 Dec (min 4) shows £406.50/night all-in vs a comp median of £360 (n=9): **P67, +12.9%**, and `recommend` says **hold**. The override is not supported (on 6 Nov we were already -15% to -17% on Christmas stays), but what it can still cost is now about £15 on one night.

### Price percentile, rating, review gap, supported positioning
Comp median rating is **4.8**, with a median of **17.5** reviews. We have **no rating and 0 reviews**, so `quality_premium` = **0.0**. The **-15% new-listing allowance** is a judgement, not the function's output.

| Stay | Airbnb 7 Nov (6 Nov) | Comp median (n) | Pctl / vs median | Wider pctl (n) | PL vs P50 (mkt pctl) | Airbnb factor | `recommend` (comp) |
|---|---|---|---|---|---|---|---|
| 7-10 Nov (arrive today, min 3) | **229.67** | 280.67 (4) | **P0 / -18.2%** | P12 (8) | 212 vs 213.7 (-1%, P49) | 0.85 | raise +5% |
| **13-16 Nov (default Fri-Sun)** | **235.33** (223) | 319 (5) | **P0 / -26.2%** | P7 (14) | 242 vs 215 (+13%, P59) | 0.766 | raise +5% |
| 16-18 Nov (midweek, min 2) | **244.5** (249) | 275.75 (4) | P0 / -11.3% | P29 (17) | 221.5 vs 211 (+5%) | 0.765 | raise +5% |
| **20-23 Nov** | **233.33** (246.33) | 329 (9) | **P0 / -29.1%** | P0 (16) | 239.3 vs 215.3 (+11%, P58) | 0.766 | raise +5% |
| 5-8 Dec | 314.67 (309.67) | 347.33 (6) | P33 / -9.4% | P33 (12) | 310 vs 223 (+39%) | 0.853 | raise +5% |
| **7-10 Dec (30-day point)** | **309.33** | 333.33 (9) | P44 / -7.2% | P57 (21) | 288 vs 218.7 (+32%) | 0.90 | raise +5% |
| 7-14 Dec (7n) | 240.57 (strike £1,955 -> £1,684) | 282.86 (7) | P14 / -15.0% | P23 (13) | 286 vs 222 | 0.765 | raise +5% |
| 11-14 Dec | 310.67 (290) | 330.66 (8) | P38 / -6.0% | P38 (16) | 289 vs 225 (+29%) | 0.90 | raise +5% |
| 19-26 Dec | **booked** (paid 225.43) | 330.14 (7) | P0 / -31.7% | P0 (14) | room 204 vs 242.4 (-16%) | 0.7225 | (sold) |
| 21-24 / 23-27 Dec | booked | 362.66 / 360.25 (10) | same-comp change 0% | | | | |
| 26-30 Dec (min 4) | **406.5** | 360 (9) | **P67 / +12.9%** | P56 (16) | 410 vs 262.5 | 0.90 | hold |

The median same-comp change is 0% on every repeated stay. Individual moves: 27538942 +11% and 51380799 +11% on 13-16 Nov; 1316210326145130709 -7% on 13-16 Nov; 1568001017881493647 +23% on 11-14 Dec.

**Supported positioning (P20, one line each):**
- **13-16 Nov (-26%, P0) and 20-23 Nov (-29%, P0, n=9):** both are well below even the -15% allowance (lines £271 / £280 all-in). With the 30-day lead at +6 pts, `recommend` supports **+5%**. The gap is mostly the Airbnb channel factor (0.766 = last-minute 15% x 0.90) on a PriceLabs price already at market P58-P59. 20-23 Nov fell £13 since yesterday because PriceLabs cut 22 Nov 287 -> 235 (no edit).
- **7-10 Nov (-18%) and 16-18 Nov (-11%):** within or near the allowance; +5% per `recommend`.
- **December (-6% to -9%, P33-P44):** the 7 Nov refresh closed most of yesterday's -12% to -15% gap. With the 60-day lead now +3 pts, `recommend` says +5% (in line, below P50). Neither a cut nor a larger raise is evidenced.
- **Christmas:** sold (see above). **26-30 Dec at P67: hold.**

## P10 Hanger Lane, 1-bed (3318177)
No sellable nights. `reservations.csv` 7 Nov has a confirmed Airbnb booking for 18 Oct-19 Nov, which covers every night to the handback (policy last night is 18 Nov). No comps or positioning.

## P02 Ladbroke Grove, P03 Bayswater
Blocked on purpose (policy `intentional_blocks`). No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or Smoobu (`kpi_summary.md` 7 Nov: "No priced PriceLabs listing mapped"), so there is no own price. Percentile, rating gap and premium are **NOT CHECKED**; no comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (comps and ours); the analysis is Airbnb only. Comp cancellation policies NOT CHECKED.
2. **Thin comp coverage** (labelled; market or wider-sample percentiles used instead):
   - P13: n=1-2 on 12-13 Nov, 13-15 Nov, 17 Nov, 27 Nov, 11-13 Dec, 20-25 Dec, 23-26 Dec and 24-27 Dec; n=2-3 on 8-13 Nov.
   - P20: n=4 on 7-10 Nov and 16-18 Nov.
3. **P20 19-26 Dec paid 0.7225 x PriceLabs (0.85 x 0.85):** the second 15% is not explained by policy and the Airbnb reservation breakdown was NOT CHECKED. The time of booking on 6 Nov is unknown; I assumed the prices on sale were those of the 6 Nov 01:29Z refresh.
4. **3090701 PriceLabs "Your Price" 150/150/150/160 on 8-11 Nov** vs `price`/Smoobu 161-170: cause NOT CHECKED. The P13 raw prices are from the 6 Nov 08:48Z refresh (not refreshed 7 Nov).
5. **P20 7 Nov PriceLabs refresh moved prices without edits** (December up, 22 Nov down): cause NOT CHECKED.
6. **Airbnb factors are inferred from totals** (0.765 / 0.85 / 0.90). The 0.90 December factor (P13 and P20) and the 3064856 strikethroughs are unexplained.
7. **Comps' cleaning split is unknown**, so all-in gaps on 1-night stays (17 Nov, 27 Nov) overstate ours.
8. The P13 Airbnb-to-Smoobu id mapping is "likely / probable" (policy `airbnb_listings_24oct`). Today's 20-25 Dec price match supports 3090701 = 1587576514709814818.
9. P16, P18 and P19 have no data; P10 has no sellable nights.
10. Two PriceLabs override calls were made in parallel, contrary to the one-at-a-time rule. Both returned 200, so there was no data effect.
