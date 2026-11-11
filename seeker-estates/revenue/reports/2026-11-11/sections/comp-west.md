# Competitor positioning: WEST + HERTS (D = 2026-11-11)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** `data/policy.json` read first. PriceLabs, read-only, one call at a time, all 200:
1. `get_user_logs` (listing, 9-11 Nov) for 3547481, 3064856, 3090701, 3318177: 13 entries, all Reyhan 9 Nov 14:07-21:26Z (already reported 10 Nov). **No PriceLabs edits on P13, P20 or P10 since 10 Nov 06:00Z.**
2. `get_listing_date_overrides` 3547481 (11 Nov-31 Jan): identical to 10 Nov.
3. `get_neighbourhood_data` detail (future prices + occupancy): 3547481 (2 BR n=150, P25/P50/P75 214/252/323) and 3064856 (2 BR n=115, 191/223/266). Saved to `scratchpad/west11/dl/neigh_*.json`.

**Own prices:** `raw/prices_*.json` in snapshot 2026-11-11. `last_refreshed_at` 10 Nov 09:27:11-29Z for 3064856, 3090701 and 3547481 (`listings.csv` last push the same). **P20's raw still shows 21-24 Nov as "Booked"**: the refresh predates the Smoobu cancellation. Airbnb nevertheless shows those nights open (below). Airbnb still follows the raw `price` field: (all-in - £150) / `price` = 0.765-0.768 in November and 0.900-0.901 in December, on every stay checked. Smoobu `/api/rates`: NOT CHECKED.

**Airbnb:** public search pages, checked 2026-11-11 with plain `curl` and default headers. No bot check was met. **Booking.com: NOT CHECKED.**

**Method** (unchanged since 3 Nov):
- Search: 4 guests, entire home, at least 2 bedrooms. Box of about 1.3 km half-side around the PriceLabs coordinates, plus a box of about 0.2 km around each kept comp.
- Price = Airbnb all-in total / nights, with cleaning and Airbnb fees **included** (taxes are not shown separately). Ours are on the same basis (£150 cleaning).
- Comp cancellation policies: NOT CHECKED.

**Comp sets** (same ids as 10 Nov; none replaced): P13 all 11 active, P20 all 12 active (each returned on at least one stay today).

**Ratings** (Airbnb search labels today):
- Ours, unchanged: 3090701 4.7 (10), 3064856 4.31 (13), P20 New with 0 reviews.
- Comp median: P13 **4.76** (13 reviews), P20 **4.8** (17.5 reviews).
- 1411449348357673454 moved 4.76 (50) -> 4.75 (51); 1761224847419174970 4.82 (11) -> 4.83 (12).

**Occupancy** (Smoobu `reservations.csv` 11 Nov, cancelled excluded; market from `pl_kpis.csv` 11 Nov):

| Listing | 30 d (11 Nov-10 Dec) | 60 d (11 Nov-9 Jan) | Market 30 / 60 | Lead 30 / 60 |
|---|---|---|---|---|
| P13 (one flat) | 24/30 = **80.0%** | 31/60 = **51.7%** | 43% / 37% | **+37 / +15 pts** |
| P20 | 17/30 = **56.7%** | 27/60 = **45.0%** | 38% / 30% | **+19 / +15 pts** |

- P20 fell from 70.0% / 53.3% because the 21-25 Nov stay was cancelled.
- PriceLabs `pl_kpis` still says 77% / 57% for P20, because it still counts the cancelled nights. Smoobu is the truth.
- Every lead is 10 pts or more, so `recommend` returns "raise" on every stay. The quality-adjusted line decides whether a raise is actually supported.

**Rows written:**
- **333 rows** appended to `data/snapshots/2026-11-11/comps.csv` (P13: 11 comps x 15 stays; P20: 12 comps x 14 stays). Another agent had already copied the file forward from 2026-11-10, so I appended to it (14,438 lines before).
- **29 rows** appended to `channel_checks.csv` (our Airbnb listings).
- Both writes under `flock` (`.comps.csv.lock` / `.channel_checks.csv.lock`).
- To find them, filter `source` on "checked 2026-11-11" and "comp-west". `date` is the check-in; the full stay is in `source`. A comp that was not returned has a blank price and says so.

**Recompute check** (`snapshot.load('2026-11-11')` + `comp_summary`, matches the tables):
- P20 21-25 Nov: n=9, median 279, P11 / -9.7%.
- P20 13-16 Nov: n=4, median 323.5, P50 / -10.1%.
- P20 14-17 Dec: n=10, median 309, P50 / +0.6%.
- P13 10-13 Dec: n=3, median 310.33, P33 / -16.3%.
- P13 23-26 Dec: n=3, median 250.67, P67 / +6.0%.
- P13 5-8 Jan: n=8, median 208, P38 / -0.5%.

## Comp tables (Airbnb all-in £/night, 4 guests, checked 2026-11-11)
- A figure in brackets is the same comp's price for the same stay on 10 Nov, shown where it moved by £1 or more.
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- For ours, "not returned" means booked, blocked or below min stay:
  - P13: 13-15 Nov and 17-19 Nov are booked. 10-12 Dec, 18-20 Dec and 15-17 Jan are below min 3.
  - P20: 13-15 Nov is below min 3. 17-19 Nov is blocked (18-19 Nov). 5-6 Dec is unbookable. 10-12 Dec and 23-27 Dec are booked.


#### P13

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13-15 Nov | 17-18 Nov | 17-19 Nov | 27-28 Nov | 1-2 Dec | 10-12 Dec | 10-13 Dec | 11-15 Dec | 14-17 Dec | 18-20 Dec | 20-25 Dec | 23-26 Dec | 24-27 Dec | 5-8 Jan | 15-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.83 (12) | Garden view/balcony |  |  | 240 |  |  | 329.5 (290.5) | 310.33 | 260.5 (257.25) | 231 | 285.5 (283.5) | 253.4 | 269.67 (267) | 269.33 (267) |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | Paid parking on premises/Guest favourite |  |  |  |  |  |  |  |  | 239 (240) |  |  |  |  | 235.67 | 244 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking on premises |  |  | 221 |  |  | 267 (268) |  |  |  |  |  |  |  | 203.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  |  |  |  |  | 223 (225.33) | 270.5 (272.5) | 212 (213.4) | 237 (238.33) | 242.33 (244) | 214 | 254 (255) |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.75 (51) | Superhost |  | 287 | 239 (243.5) |  |  |  | 324.33 |  |  |  |  |  |  | 207.33 (209) |  |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed |  | 185 | 152.5 |  |  |  |  |  | 145.33 |  |  |  |  | 135.67 | 175 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  |  |  |  |  | 252.5 (261) | 239.67 | 224.25 (228.5) | 211 (209.33) | 274.5 | 217.2 (218.4) | 250.67 (251.67) | 253.33 (255.67) | 208.67 | 257 (258) |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift | 425.5 |  | 411 (390.5) |  |  |  |  |  |  | 450 |  |  |  | 419.33 | 477 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking on premises |  |  | 196.5 |  |  |  |  |  | 254 |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | Lift/Paid parking on premises/balcony/Guest favourite |  |  |  | 394 | 423 |  |  |  |  | 331.5 |  |  |  |  | 331.5 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking on premises |  | 185 | 152.5 |  |  |  |  |  | 151.67 |  |  |  |  | 141.67 | 175 |
| **Comp median (n)** | | | 4.76 (13) | | **425.5** (1) | **185** (3) | **221** (7) | **394** (1) | **423** (1) | **267** (3) | **310.33** (3) | **242.38** (2) | **223** (7) | **285.5** (5) | **217.2** (3) | **250.67** (3) | **253.33** (3) | **208** (8) | **254** (7) |
| Wider 2-bed sample median (n) | | | | | 284.5 (8) | 247 (7) | 236.5 (26) | 323 (4) | 443 (4) | 275 (14) | 310.33 (25) | 272.5 (23) | 237.33 (36) | 308.5 (10) | 289.2 (15) | 310.67 (21) | 324.33 (15) | 233.33 (42) | 257.25 (36) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.7 (10)** | | | | | not returned | **306** | not returned | **338** | **324** | not returned | **259.67** | **246.25** | **245.67** | not returned | **223.6** (strike £1,225 -> £1,118) | **265.67** | **262.67** | **207** | not returned |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | | | | not returned | **324** | not returned | **397** | **378** | not returned | **271** | **234.75** | **235** | not returned | **213** (strike £1,167 -> £1,065) | **253.67** | **251** | **198.33** | not returned |

#### P20

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13-15 Nov | 13-16 Nov | 13-18 Nov | 16-18 Nov | 17-19 Nov | 20-25 Nov | 21-25 Nov | 22-25 Nov | 5-6 Dec | 10-12 Dec | 14-17 Dec | 14-19 Dec | 23-27 Dec | 26-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost |  | 281 | 277.8 |  |  | 277.8 | 279 | 281 |  |  | 282.33 (281.33) | 278.6 | 282.75 (281) | 281.75 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises |  |  |  | 351.5 |  |  |  |  |  |  |  |  | 333 |  |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises |  |  |  |  |  |  |  |  |  |  |  |  | 388.5 |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (56) | Lift |  |  |  |  |  | 324.8 | 332 (298.25) | 341.33 |  |  | 341 (346.67) | 344.6 (350.6) | 409.75 (415.25) | 494 (498.25) |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony |  | 410.33 (424) | 411.8 (420) |  |  | 378.6 | 380.25 | 382.67 |  |  | 382.67 | 378.6 | 380.25 | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony |  |  |  |  |  | 334 | 333.5 | 323 | 567 |  | 425.67 | 439.6 | 505.75 | 595.5 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises |  |  |  | 306 | 306 (281.5) | 254.4 | 257 | 261.67 |  | 292.5 | 261.67 | 249.8 |  |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony |  | 357 (368.67) | 356.2 (363.2) |  |  | 327.8 | 329.75 | 333.33 |  |  | 333.33 | 327.8 | 329.75 | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/Paid parking on premises/balcony (replaces 1384811870668527117, inactive next 60 days) |  |  |  |  |  | 272.4 | 273.75 (275) | 269.33 |  |  | 312 (313) | 325.6 | 368.5 | 457.5 (452) |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost |  |  |  |  |  |  | 244.75 (232.5) | 248 |  |  | 211.33 (217.67) |  | 234.75 (237.5) | 310 (316.5) |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises |  |  |  | 288.5 | 288.5 (264) |  |  | 250 |  | 264 | 250 | 238.4 |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 310 | 290 | 258 | 270 | 270 | 258 | 260 | 263.33 |  | 300 | 306 | 291.8 | 360 | 360 |
| **Comp median (n)** | | | 4.8 (18) | | **310** (1) | **323.5** (4) | **317** (4) | **297.25** (4) | **288.5** (3) | **301.3** (8) | **279** (9) | **275.16** (10) | **567** (1) | **292.5** (3) | **309** (10) | **325.6** (9) | **364.25** (10) | **370.12** (8) |
| Wider 2-bed sample median (n) | | | | | 278 (7) | 285.5 (12) | 287.8 (10) | 262.75 (16) | 270 (11) | 327.8 (13) | 308.62 (14) | 266.33 (22) | 511 (2) | 300 (9) | 279 (31) | 276.6 (23) | 346.5 (20) | 380.25 (15) |
| **Ours 3547481 (Airbnb 1791529331262420081) New, 0 reviews** | | | | | not returned | **290.67** | **257.4** | **283** | not returned | **237.4** | **252** | **259.33** | not returned | not returned | **311** | **294.6** | not returned | **419.5** |


## P20 Waterford Court, 2-bed, max 4 (Airbnb 1791529331262420081, New, 0 reviews)

### 21-25 Nov, reopened by the cancellation: what is open now and at what price
- **Smoobu:** the 21-25 Nov Airbnb stay (room £638.54, booked 9 Nov) is `cancelled` in `reservations.csv` 11 Nov.
- **Airbnb, checked today: 20-25 Nov is bookable, and so are its sub-stays.**
  - 20-25 Nov: £1,187 (£237.40/night).
  - 21-25 Nov: £1,008 (£252.00/night).
  - 22-25 Nov: £778 (£259.33/night).
  - The breakdowns show no discount line.
- **PriceLabs has not seen the cancellation.**
  - Raw `price` for 21-24 Nov is 301 / 247 / 294 / 279 = 1,121, all still "Booked".
  - Overrides: 21 Nov min 3; 22-24 Nov -5%, min 2 (Reyhan 8 Nov); 20 Nov min 3, at 234 and still flagged `unbookable` (the orphan state).
  - Airbnb is selling at those stale numbers: (1,008 - 150) / 1,121 = **0.765**, the normal Airbnb layer.
  - The next PriceLabs refresh will reprice 20-24 Nov. It has not happened yet.
- **Against the old booking:** today's £252 all-in is **+27.8%** on the £197.14 the cancelled guest paid.
  - That booking's 0.604 ratio is not repeated on today's quotes; the cause is still NOT CHECKED.
- **The 20 Nov orphan has gone.** 20 Nov is now the first night of a 5-night open run (20-24 Nov), and 20-25 Nov is bookable at min 3.
- **t-p20-delivery: the conflict is changed, not closed (for Corentin to confirm).**
  - Policy (24 Oct) has a Smoobu delivery block on 20-22 Nov.
  - **Airbnb is now selling 20-21 Nov as open nights.** PriceLabs blocks 18-19 Nov instead.
  - So either the delivery moved to 18-19 Nov (and policy needs updating), or a guest can now book across a delivery.
- **Booking.com availability for 20-24 Nov: NOT CHECKED.**

### Price percentile, rating, review gap, supported positioning
- Comp median rating is 4.8 (17.5 reviews). Ours: no rating, 0 reviews, so `quality_premium` = 0.0.
- "Line" = comp median x 0.85: a **-15% new-listing allowance**. This is my judgement (unchanged since 3 Nov), not the function's output.
- Columns: "Factor" = (all-in - £150) / PriceLabs; "Mkt pctl" = position of our PriceLabs price in the market P25/P50/P75 (`neighbourhood_data` 11 Nov).

| Stay | Ours Airbnb 11 Nov (10 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n) | PL vs P50 (mkt pctl) | Factor | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 13-15 Nov (default Fri-Sun) | not sellable (min 3) | 310 (1) | n=1 | | median 278 (7) | 314 vs 213 (>P75) | | |
| **13-16 Nov** | **290.67** (266.67) | 323.5 (4) | **P50 / -10.1%** | +5.7% | P58 (12) | 314.3 vs 213 (+48%, >P75) | 0.766 | raise +10% |
| 13-18 Nov (whole 5-night gap) | 257.4 (233.4) | 317 (4) | P0 / -18.8% | -4.5% | P30 (10) | 297.2 vs 211.2 (+41%, >P75) | 0.765 | raise +10% |
| 16-18 Nov | 283 (259) | 297.25 (4) | P25 / -4.8% | +12.0% | P62 (16) | 271.5 vs 208.5 (+30%, P72) | 0.766 | raise +10% |
| 17-19 Nov (default Tue-Thu) | blocked 18-19 | 288.5 (3) | comps only | | 270 (11) | | | |
| **20-25 Nov (new: 5 open nights)** | **237.4** | **301.3 (8)** | **P0 / -21.2%** | **-7.3%** | P0 (13) | 271 vs 212.8 (+27%, P71) | 0.765 | raise +10% |
| **21-25 Nov (reopened)** | **252.0** (booked; paid 197.14) | **279 (9)** | **P11 / -9.7%** | **+6.3%** | P14 (14) | 280.2 vs 211.8 (+32%, P74) | 0.765 | raise +10% |
| 22-25 Nov | 259.33 | 275.16 (10) | P20 / -5.8% | +10.9% | P41 (22) | 273.3 vs 211 (+30%, P72) | 0.766 | raise +10% |
| **5 Dec (gap night)** | unbookable (min 3) | 567 (1) (1-night 5-6 Dec) | n=1 | | 511 (2) | 311 vs 226 (>P75 299) | | |
| 10-12 Dec (30-day default) | booked | 292.5 (3) | comps only | | 300 (9) | | | |
| **14-17 Dec** | **311** (312.33) | **309 (10)** | **P50 / +0.6%** | +18.4% | P68 (31) | 290 vs 217.7 (+33%, >P75) | 0.900 | raise +10% |
| **14-19 Dec (all 5 open nights)** | **294.6** (300.2) | 325.6 (9) | P44 / -9.5% | +6.4% | P61 (23) | 294 vs 222.4 (+32%, >P75) | 0.900 | raise +10% |
| 23-27 Dec | booked (19-26 Dec) | 364.25 (10) | comps only | | 346.5 (20) | | | |
| **26-30 Dec (min 4)** | **419.5** (422.25) | 370.12 (8) | **P62 / +13.3%** | +33% | P53 (15) | 424.2 vs 257.2 (+65%, >P75) | 0.900 | raise +10% |

What moved overnight:
- **Our November quotes rose about 9%** (13-16 Nov £266.67 -> £290.67; 16-18 Nov £259 -> £283) with no edits. The 10 Nov 09:27Z refresh raised 13-15 Nov to 324 / 340 / 279; the 0.766 factor is unchanged.
- The comps were flat to slightly down: same-comp median -1.6% on 13-16 Nov and 0% elsewhere. 27538942 cut 13-16 Nov £424 -> £410.33.
- On 21-25 Nov, 1316210326145130709 rose £298.25 -> £332 and 1516006875488990547 rose £232.50 -> £244.75.
- 14-19 Dec median £309.8 -> £325.6 is a mix change, not a price move: 6488364 returned at £325.6 and 1516006875488990547 dropped out. Same-comp change is 0%.

**Supported positioning (one line each):**
- **21-25 Nov (reopened, P11 / -9.7%, +6.3% vs line): hold, with one optional step.** £252 sits between the 0-review line and the median.
  - Taking 22-24 Nov from -5% to 0% gives about **£260/night**: P22, -6.7% vs median, +9.7% vs line. The evidence supports that.
  - That -5% is Reyhan's 8 Nov override, not the policy range (31 Oct-19 Nov), so it is not a policy conflict.
  - +10% (`recommend`) is not supported for a 0-review listing 10 days out.
- **20-25 Nov (P0 / -21%, -7% vs line): under-priced, but the fix is the PriceLabs refresh plus 20 Nov.**
  - 20 Nov is still priced as an orphan (234, `unbookable`). Pricing it like 21 Nov (about 300) lifts the 5-night stay to about £248/night (still under the line).
  - Do this **only after** Corentin confirms the delivery dates (t-p20-delivery).
- **13-16 Nov (P50 / -10%, +5.7% vs line): hold.** It rose 9% overnight on its own. Check-in is 2 days out.
- **13-18 Nov (P0 of 4, -4.5% vs line):** the 5-night stay carries one cleaning fee, and the gap comes from 16-17 Nov at -5% (policy range to 19 Nov).
  - As on 10 Nov, removing that -5% would be supported, but it is **Corentin's call against the 24 Oct decision**. It is not a new proposal.
- **16-18 Nov:** hold (P25, +12% vs line).
- **5 Dec (t-p20-5dec-orphan): NOT fixed.** It is still `unbookable`=1 under Reyhan's 1-20 Dec min 3.
  - Evidence supports **min 1 at the current 311** (above market P75, under the only 1-night comp at £567, n=1). That is about £280 room on Airbnb at the 0.90 factor.
- **14-17 Dec (P50 / +0.6%) and 14-19 Dec (P44 / -9.5%, +6.4% vs line): hold.** We are at the comp median, which is the most the evidence supports for 0 reviews. `recommend` +10% comes only from the +15-pt lead.
- **26-30 Dec (P62 / +13%): hold**, as on 10 Nov.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### What changed since 10 Nov
- **No PriceLabs edits** (`get_user_logs`). Overrides are as listed on 10 Nov:
  - 13-16 and 18-26 Nov -2%; 17 Nov +35% min 1; 27 Nov +50% min 1; 1 Dec +50% min 1 (intentional per policy).
  - 7-9 Dec -7%; **10-26 Dec -2%, min 3**; 27 Dec-1 Jan -3%; 2-31 Jan -10%.
- **Smoobu:** no new P13 bookings or cancellations (`reservations.csv` diff). **10-26 Dec (17 nights) is still fully open.**
- **a-p13-record:** the 9-12 Nov -5% (a conflict with the 24 Oct 0%) is now in the past except 12 Nov. It is for Corentin to note, not to fix.

### Price percentile, rating, review gap, supported positioning
**Rating and reviews vs comp median** (4.76, 13 reviews):
- 3090701, 4.7 (10): -0.06 stars, 3 reviews fewer; `quality_premium` **-0.024**.
- 3064856, 4.31 (13): -0.45 stars, same review count; `quality_premium` **-0.15** (the cap).

"Line" = comp median x (1 + quality premium). The flat sells at whichever twin is cheaper.

| Stay | Ours 3090701 / 3064856 (10 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n) | PL vs P50 | Factor | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 13-15 Nov (default Fri-Sun) | booked | 425.5 (1) | comps only | | 284.5 (8) | | | |
| 17 Nov (1 n) | 306 / 324 (310 / 319) | 185 (3) | P100 / +65% ; P100 / +75% | (1-night, cleaning inflates ours) | P71 (7) | 203 / 227 vs 204 | 0.768 | raise +5% |
| 17-19 Nov (default Tue-Thu) | booked from 18 Nov | 221 (7) | comps only | | 236.5 (26) | | | |
| 27 Nov (1 n) | 338 / 397 (339 / 409) | 394 (1) | n=1 | | P75 / P100 (4) | 245 / 322 vs 237 | 0.767 | mkt: raise |
| 1 Dec (1 n, +50% intentional) | 324 / 378 (324 / 389) | 423 (1) | n=1 | | P25 (4; median 443) | 227 / 298 vs 225 | 0.767 | (intentional override, numbers only) |
| 10-12 Dec (30-day default, Thu-Sat) | below min 3 | 267 (3) | comps only | | 275 (14) | | | |
| **10-13 Dec (3 n, new today)** | **259.67 / 271** | **310.33 (3)** | **P33 / -16.3% ; P33 / -12.7%** | **-14.3% / +2.7%** | **P24 / P24 (25)** | 232.7 / 245.3 vs 239 (-2.6% / +2.6%) | 0.901 | raise +10% |
| 11-15 Dec (the reopened 9 Nov stay) | 246.25 / 234.75 (247.25 / 235.5) | 242.38 (2) | P50 / +1.6% ; P50 / -3.1% | +4.1% / +13.9% | P22 / P13 (23) | 231.8 / 219 vs 228 | 0.901 | mkt: raise +10% |
| **14-17 Dec (midweek)** | **245.67 / 235** (247.33 / 236.33) | **223 (7)** | **P86 / +10.2% ; P71 / +5.4%** | +12.9% / +24.0% | P58 / P44 (36) | 217.3 / 205.3 vs 222.7 (-2.4% / -7.8%) | 0.900 | raise +5% / +10% |
| 18-20 Dec (Fri-Sun) | below min 3 | 285.5 (5) | comps only | | 308.5 (10) | | | |
| **20-25 Dec (5 n)** | **223.6 / 213** (222.8 / 212.2); "Long stay discount" strikes £1,225 -> £1,118, £1,167 -> £1,065 | 217.2 (3) | P67 / +2.9% ; P33 / -1.9% | +5.5% / +15.4% | **P20 / P13 (15; median 289.2)** | 238.8 / 225.8 vs 254.8 (-6.3% / -11.4%) | 0.811 | raise +10% |
| **23-26 Dec (Christmas)** | **265.67 / 253.67** (265.67 / 254) | 250.67 (3) | P67 / +6.0% ; P67 / +1.2% | +8.6% / +19.1% | **P10 / P10 (21; median 310.67)** | 239.3 / 226 vs 268 (-10.7% / -15.7%) | 0.901 | raise +10% |
| 24-27 Dec | 262.67 / 251 (263 / 251.33) | 253.33 (3) | P67 / +3.7% ; P33 / -0.9% | +6.2% / +16.6% | **P13 / P7 (15; median 324.33)** | 236 / 223 vs 276.7 (-14.7% / -19.4%) | 0.901 | raise +10% |
| **5-8 Jan (twins, midweek)** | **207 / 198.33** (209 / 200.33) | **208 (8)** | **P38 / -0.5% ; P25 / -4.6%** | +2.0% / +12.2% | P26 / P24 (42) | 174.3 / 164.7 vs 203.3 (-14.3% / -19.0%) | 0.901 | raise +10% |
| 15-17 Jan (Fri-Sun) | below min 3 | 254 (7) | comps only | | 257.25 (36) | 3064856 final 193 / 194 vs 209 / 206 | | |

What moved overnight:
- The kept comps cut Christmas slightly: same-comp -0.4% to -0.7% on 20-27 Dec. Exception: 1761224847419174970 rose £267 -> £269.67 on 23-26 Dec.
- 1761224847419174970 also rose on 10-12 Dec, £290.5 -> £329.5 (+13%).
- Our Airbnb quotes moved -0.4% to -1%, following the 10 Nov 09:27Z PriceLabs refresh (no edits).

**Twins (t-p13-twins): still fixed.**
- January: Airbnb 5-8 Jan **£207 vs £198.33 (+4.4%)**; PriceLabs 5 Jan 176 vs 166.
- December: 3090701 is the dearer twin by about 5% (14-17 Dec £245.67 vs £235).
- **10-13 Dec is reversed: 3064856 is dearer** (£271 vs £259.67). On 10 Dec its raw `price` is 272 against `user_price` 221, while 3090701 is 207 / 234.
  - 272 = 194 x 1.40, which looks like the 10 Dec +40% Reyhan replaced with -2% at 21:22Z on 9 Nov still being pushed on 3064856. **NOT EXPLAINED** (same `price` vs `user_price` gap as on 10 Nov).
  - The two listings are different, never identical, so the twin rule is met. Order is deprioritised (policy), so not raised.

**Supported positioning (one line each):**
- **10-13 Dec (reopened weekend, at min 3):** the cheaper twin is **P33 of the kept comps, P24 of the wider sample (n=25)**, -14% vs its line, and PriceLabs is at market P50.
  - **+5% on 10-12 Dec is supported** (the -2% to +3%). That puts 3090701 at about £270, still under the median and its line.
  - +10% is not supported: 3064856 would then be about +12% over its line.
- **11-15 Dec:** covered by the same +5% on 10-12 Dec; 13-14 Dec are Low/Normal demand, so hold. The kept comps are n=2 (P50); the wider sample is P13-P22.
- **14-17 Dec midweek: hold at -2%** (P71-P86, 13-24% above the lines).
- **Christmas 20-27 Dec: remove the remaining -2% on 20-26 Dec (+2%). NOT done since 10 Nov.**
  - The 3 kept comps still open are at our level (P33-P67) and edged down overnight, so the full +10% from `recommend` is still not supported.
  - The wider sample has us at **P7-P20**, and PriceLabs is 6-19% under market P50, which supports the +2%.
  - **a-peak-check (P13): partly fixed, unchanged.**
- **January twins (5-8 Jan): hold.** P38 / P25 of n=8, on or above both lines (+2.0% / +12.2%). Market occupancy for those nights is 16.6%, so a raise is not supported even though PriceLabs is 14-19% under market P50.
- **17 Nov (1 night): hold.** It is P100 of n=3 cheap 7-sleepers, but P71 of the wider sample, and 1-night all-in overstates ours by the cleaning fee.

## P10 Hanger Lane, 1-bed (3318177)
- No sellable nights. `reservations.csv` 11 Nov: the confirmed Airbnb stay 18 Oct-19 Nov covers every night up to the handback (policy last night 18 Nov).
- No PriceLabs edits (`get_user_logs`).
- No comps or positioning.

## P02 Ladbroke Grove, P03 Bayswater
Blocked on purpose (policy `intentional_blocks`). Refreshed 11 Nov (`listings.csv`: 2999946 at 00:23Z, Bayswater channex at 03:29Z). No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or Smoobu (`kpi_summary.md` 11 Nov: collect-data; no `listings.csv` / `reservations.csv` rows). Own price, percentile, rating gap and premium: **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (comps, our displayed prices, and P20 20-24 Nov availability). The analysis is Airbnb only. Comp cancellation policies NOT CHECKED.
2. **PriceLabs has not refreshed P20 since the cancellation** (`last_refreshed_at` 10 Nov 09:27:29Z). 20-24 Nov sell on Airbnb at stale prices: 20 Nov is still priced as an orphan, and `pl_kpis` occupancy still counts the cancelled nights. Why the 21-25 Nov booking paid 0.604 x PriceLabs: NOT CHECKED (Smoobu rates were not pulled).
3. **P20 delivery dates:** policy has 20-22 Nov; Airbnb now sells 20-21 Nov and PriceLabs blocks 18-19 Nov. Corentin to confirm.
4. **`user_price` vs `price` gap NOT EXPLAINED.** Example: 3064856 10 Dec 272 vs 221, which looks like the replaced +40% still being pushed. Airbnb follows `price`.
5. **Thin comp coverage** (labelled; wider-sample or market percentiles used instead):
   - P13: n=1-3 on 13-15 Nov, 17 Nov, 27 Nov, 1 Dec, 10-13 Dec, 11-15 Dec and Christmas. Christmas is n=3, the cheap end of the set.
   - P20: n=1 on 13-15 Nov and 5-6 Dec.
6. P13 raw ends 10 Jan, so 15-17 Jan uses the neighbourhood `final_price`.
7. **Comps' cleaning split is unknown**, so all-in gaps on 1-night stays (17 Nov, 27 Nov, 1 Dec, 5 Dec) overstate ours.
8. The P13 Airbnb-to-Smoobu id mapping is "likely / probable" (policy `airbnb_listings_24oct`).
9. P16, P18 and P19 have no data; P10 has no sellable nights.
