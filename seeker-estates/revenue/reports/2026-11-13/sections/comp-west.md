# Competitor positioning: WEST + HERTS (D = 2026-11-13)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** `data/policy.json` read first. PriceLabs read-only, one call at a time, all 200:
1. `get_user_logs` (listing, 12-13 Nov) for 3547481, 3064856, 3090701, 3318177: **no entries**.
2. `get_listing_date_overrides` 3547481 and 3064856 (13 Nov-31 Jan): **unchanged**. The latest edits are still Reyhan's on 11 Nov (P20 13-15 and 20-21 Nov -5% min 3 at 17:15:52-58Z; P13 10-26 Dec -5% min 3 at 15:38:45Z).
3. `get_listing_prices` live for 3547481 (13 Nov-20 Jan), 3064856 and 3090701 (8 Dec-18 Jan). Every overlapping value matches `raw/prices_*.json` 13 Nov, so the raw P13/P20 files are value-checked.
   - `last_refreshed_at`: 3547481 **12 Nov 09:23:20Z**; 3064856 / 3090701 12 Nov 09:21:15Z / 09:21:18Z. Yesterday's comp-west section used the 11 Nov 17:16Z refresh, so P20's prices below include one more re-price, with no edit.
4. `get_neighbourhood_data` detail (future prices + occupancy). Saved to `scratchpad/west13/dl/neigh_*.json`.
   - 3547481: 2 BR n=150, P25/P50/P75 216/255/326.
   - 3064856: n=115.

**Own prices (what guests see):** Airbnb public search, 4 guests, all-in. Smoobu rates from `prices.csv` 13 Nov.

**Airbnb:** public search pages, checked 2026-11-13 with plain `curl` and default headers. No bot check was met. **Booking.com: NOT CHECKED** (not attempted).

**Method** (unchanged since 3 Nov):
- Search: 4 guests, entire home, at least 2 bedrooms. Box of about 1.3 km half-side around the PriceLabs coordinates, plus a box of about 0.2 km around each kept comp.
- Price = Airbnb all-in total / nights, with cleaning and Airbnb fees **included** (taxes are not shown separately). Ours are on the same basis (£150 cleaning).
- "Line" = comp median x (1 + `quality_premium`). For P20, which has 0 reviews, it is comp median x 0.85: a -15% new-listing allowance. That allowance is my judgement (unchanged since 3 Nov), not the function's output.
- Comp cancellation policies: NOT CHECKED.

**Comp sets:** same ids as 12 Nov, none replaced.
- P13: all 11 active (each returned on at least one of 14 stays).
- P20: all 12 active. **789954794593691037 was not returned on any of the 15 standard stays.** Extra 0.2 km searches today returned it on 1-4 Dec (£900), 7-10 Dec (£1,180), 23-27 Dec (£1,554) and 8-11 Jan (£1,180), so it stays in the set.

**Ratings** (Airbnb search labels today):
- Ours, unchanged: 3090701 4.7 (10), 3064856 4.31 (13), P20 New with 0 reviews.
- Comp median: P13 **4.76** (13 reviews), P20 **4.8** (17.5 reviews).
- Only one comp moved: 1599999559812004118 went from 4.9 (10) to 4.82 (11).

**Occupancy** (Smoobu `reservations.csv` 13 Nov, cancelled excluded; market from `pl_kpis.csv` 13 Nov):

| Listing | 30 d (13 Nov-12 Dec) | 60 d (13 Nov-11 Jan) | Market 30 / 60 | Lead |
|---|---|---|---|---|
| P13 (one flat) | 24/30 = **80.0%** | 31/60 = **51.7%** | 45% / 38% | **+35 / +14 pts** |
| P20 | 17/30 = **56.7%** | 25/60 = **41.7%** | 39% / 30% | **+18 / +12 pts** |

- No new bookings or cancellations (Dispatcher diff).
- Every lead is 10 pts or more, so `recommend` returns "raise" (+5% / +10%) on every priced stay. The quality line decides how much of that the evidence supports.

**Rows written:**
- **334 rows** appended to `data/snapshots/2026-11-13/comps.csv` (P13: 11 comps x 14 stays; P20: 12 comps x 15 stays). Another agent had already copied the file forward (18,960 lines before).
- **26 rows** appended to `channel_checks.csv` (our Airbnb listings).
- Both writes under `flock` (`.comps.csv.lock` / `.channel_checks.csv.lock`).
- To find them, filter `source` on "checked 2026-11-13" and "comp-west".

**Recompute check** (`snapshot.load('2026-11-13')` + `comp_summary`, matches the tables):
- P20 14-17 Nov: n=6, median 280.67, P0 / -18.3%.
- P20 21-25 Nov: n=8, median 274.38, P0 / -20.2%.
- P20 14-17 Dec: n=10, median 305, P40 / -2.0%.
- P13 10-13 Dec: n=2, median 262.67, P0 / -17.9% (3090701).
- P13 23-26 Dec: n=2, median 237.83, P100 / +7.2% (3090701).
- P13 5-8 Jan: n=8, median 206.17, P50 / -0.1% (3090701).

## Comp tables (Airbnb all-in £/night, 4 guests, checked 2026-11-13)
- A figure in brackets is the same comp's price for the same stay on 12 Nov, shown where it moved by £1 or more.
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- For ours, "not returned" means booked, blocked or below min stay:
  - P13: 13-15 Nov is booked. 17-19 and 20-22 Nov are booked from 18 Nov. 10-12 Dec, 13-15 Dec and 15-17 Jan are below min 3.
  - P20: 13-15 Nov and 20-22 Nov are below min 3. 17-19 Nov is blocked (18-19 Nov). 5-6 Dec is unbookable. 13-15 Dec is booked (13 Dec).

#### P13

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13-15 Nov | 17-18 Nov | 17-19 Nov | 20-22 Nov | 27-28 Nov | 10-12 Dec | 10-13 Dec | 13-15 Dec | 14-17 Dec | 20-25 Dec | 23-26 Dec | 24-27 Dec | 5-8 Jan | 15-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.83 (12) | Garden view/balcony |  |  |  |  |  |  |  |  | 272 (235.67) |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.82 (11) | Paid parking on premises/Guest favourite |  |  |  |  |  |  |  | 256.5 | 237.67 |  |  |  | 235.67 | 244 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking on premises |  |  |  |  |  | 259 (265.5) |  |  |  |  |  |  | 203.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  |  |  |  |  | 217.67 (220) | 204.8 (208) | 229.67 (233) | 234.33 (237.33) | 214 | 252.5 (255) |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.75 (51) | Superhost |  | 261 (285) | 218 (238) |  |  |  | 293 (351) |  |  |  |  |  | 200 (209.33) |  |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed |  | 185 | 152.5 |  |  |  |  |  | 145.33 |  |  |  | 135.67 | 175 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  |  |  | 228 |  | 251.5 | 232.33 | 233.5 | 208.67 | 211 (214.8) | 246 (251) | 249.67 (254.33) | 208.67 | 257.5 (256.5) |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift |  |  | 411 |  |  |  |  |  |  |  |  |  | 419.33 | 477 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking on premises |  |  | 196.5 |  |  |  |  | 240.5 | 254 |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | Lift/Paid parking on premises/balcony/Guest favourite |  | 403 | 358.5 |  |  |  |  |  |  |  |  |  |  | 331.5 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking on premises |  | 185 | 152.5 |  |  |  |  |  | 151.67 |  |  |  | 141.67 | 175 |
| **Comp median (n)** | | | 4.76 (13) | | - | **223** (4) | **207.25** (6) | **228** (1) | - | **255.25** (2) | **262.67** (2) | **240.5** (3) | **217.67** (7) | **207.9** (2) | **237.83** (2) | **242** (2) | **206.17** (8) | **252.5** (7) |
| Wider 2-bed sample median (n) | | | | | 294.75 (4) | 254 (8) | 242.5 (26) | 318 (13) | 343 (3) | 315 (13) | 310.67 (21) | 253.75 (20) | 240.17 (38) | 292.2 (16) | 308.84 (20) | 325.83 (16) | 233.83 (48) | 257.5 (35) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.7 (10)** | | | | | not returned | **316** | not returned | not returned | **359** | not returned | **215.67** | not returned | **236.67** | **213.2** (strike £1,167 -> £1,066) | **255** | **253** | **206** | not returned |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | | | | not returned | **325** | not returned | not returned | **370** | not returned | **267.33** | not returned | **226** | **202.8** (strike £1,110 -> £1,014) | **243.33** (strike £802 -> £730) | **241.67** (strike £811 -> £725) | **197.33** | not returned |

#### P20

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13-15 Nov | 14-17 Nov | 14-18 Nov | 16-18 Nov | 17-19 Nov | 20-22 Nov | 20-23 Nov | 20-25 Nov | 21-25 Nov | 22-25 Nov | 5-6 Dec | 13-15 Dec | 14-17 Dec | 14-19 Dec | 26-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost |  | 281 | 279 |  |  |  | 281.33 | 278 | 279.25 | 281.33 |  |  | 281 | 277.8 | 282 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises | 311 | 280.33 | 267.75 | 317 (322.5) | 322.5 |  |  |  |  |  |  |  |  |  | 400.5 (399) |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (56) | Lift |  |  |  |  |  |  |  |  |  | 284.67 (296.67) |  |  | 340.33 (335.67) | 347 (340.4) | 480 (483.75) |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony |  | 396.67 | 401 |  |  |  | 382.67 | 378.6 | 380.25 | 382.67 |  |  | 382.67 | 378.6 | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony |  |  |  |  |  | 341 | 327.33 (338.67) | 320.8 (334) | 317 (333.5) | 307.33 (323) | 538 (567) | 426 | 425.67 | 439.6 | 595.5 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises |  |  |  | 306 | 306 | 303.5 | 276.33 | 254.4 | 257 | 261.67 |  | 281.5 | 261.67 | 249.8 |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony |  | 345 | 347.5 |  |  |  | 333.33 | 327.8 | 329.75 | 333.33 |  |  | 333.33 | 327.8 | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/Paid parking on premises/balcony (replaces 1384811870668527117, inactive next 60 days) |  |  |  |  |  |  | 285.33 (278) | 276.2 (273.4) | 269.5 (271.75) | 259.33 (271.33) |  |  | 304 (305.33) | 319.8 | 440.5 (445.75) |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost |  |  |  |  |  |  |  |  | 223.75 (234) | 231.67 (240) |  |  | 209.33 (211) |  | 303.75 (305.75) |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises |  | 274.33 | 267.25 | 288.5 | 288.5 |  |  |  |  | 250 |  |  | 250 | 238.4 |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 310 | 276.67 | 260 | 270 | 270 | 310 | 290 | 258 | 260 | 263.33 |  | 318 | 306 | 291.8 | 360 |
| **Comp median (n)** | | | 4.8 (18) | | **310.5** (2) | **280.66** (6) | **273.38** (6) | **297.25** (4) | **297.25** (4) | **310** (3) | **290** (7) | **278** (7) | **274.38** (8) | **272.33** (10) | **538** (1) | **318** (3) | **305** (10) | **319.8** (9) | **380.25** (9) |
| Wider 2-bed sample median (n) | | | | | 290 (7) | 278.5 (12) | 267.5 (12) | 255.5 (15) | 279.25 (10) | 325.5 (4) | 308.66 (10) | 327.8 (11) | 323.38 (12) | 261.67 (21) | 493.5 (2) | 288.5 (16) | 279.34 (30) | 282 (25) | 414.12 (18) |
| **Ours 3547481 (Airbnb 1791529331262420081) New, 0 reviews** | | | | | not returned | **229.33** | **214.25** | **240.5** | not returned | not returned | **228** | **212.2** | **219** | **230.33** | not returned | not returned | **299** | **282.8** | **392.25** |

## P20 Waterford Court, 2-bed, max 4 (Airbnb 1791529331262420081, New, 0 reviews)

Column key:
- "Ours" = Airbnb all-in £/night today, with 12 Nov in brackets.
- "Line" = comp median x 0.85.
- "Factor" = (all-in - £150) / nightly rate. It is shown against PriceLabs `price` and against Smoobu.
- "Mkt pctl" = position of the PriceLabs price in the market P25/P50/P75 (`neighbourhood_data` 13 Nov).

| Stay | Ours 13 Nov (12 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n) | PriceLabs / Smoobu avg | PL vs P50 (mkt pctl) | Factor PL / Smoobu | `recommend` |
|---|---|---|---|---|---|---|---|---|---|
| 13-15 Nov (default Fri-Sun) | below min 3 | 310.5 (2) | comps only | | 290 (7) | | | | |
| **14-17 Nov** | **229.33** (new stay) | **280.67 (6)** | **P0 / -18.3%** | **-3.9%** | P17 (12) | **257.0 / 234.0** | 212 (P66) | **0.698 / 0.766** | raise +10% |
| **14-18 Nov (whole gap)** | **214.25** (new stay) | 273.38 (6) | **P0 / -21.6%** | **-7.8%** | P17 (12) | 253.0 / 231.0 | 211.5 (P65) | 0.699 / 0.765 | raise +10% |
| 16-18 Nov | 240.5 (259.5) | 297.25 (4) | P0 / -19.1% | -4.8% | P40 (15) | 239.5 / 216.0 | 210 (P61) | 0.691 / 0.766 | raise +10% |
| 17-19 Nov (default Tue-Thu) | blocked 18-19 | 297.25 (4) | comps only | | 279.25 (10) | | | | |
| 20-22 Nov (next Fri-Sun) | below min 3 | 310 (3) | comps only | | 325.5 (4) | | | | |
| 20-23 Nov | 228.0 (232.0) | 290 (7) | P0 / -21.4% | -7.5% | P0 (10) | 232.7 / same | 214 (P56) | 0.765 | raise +10% |
| **20-25 Nov** | **212.2** (216.6) | **278 (7)** | **P0 / -23.7%** | **-10.2%** | P0 (11) | 238.0 / same | 213.2 (P59) | 0.766 | raise +10% |
| **21-25 Nov** | **219.0** (224.5) | **274.38 (8)** | **P0 / -20.2%** | **-6.1%** | P0 (12) | 237.2 / same | 212.5 (P59) | 0.765 | raise +10% |
| 22-25 Nov | 230.33 (235.33) | 272.33 (10) | P0 / -15.4% | -0.5% | P10 (21) | 235.7 / same | 212 (P58) | 0.765 | raise +10% |
| **5 Dec (gap night)** | unbookable (min 3) | 538 (1) (1-night 5-6 Dec; was 567) | n=1 | | 493.5 (2) | 313 / not open in Smoobu | 228 (above P75 301) | | |
| 13-15 Dec (30-day default) | booked 13 Dec | 318 (3) | comps only | | 288.5 (16) | | | | |
| **14-17 Dec** | **299.0** (295.33) | **305 (10)** | **P40 / -2.0%** | +15.3% | P60 (30) | 276.7 / same | 217.7 (P71) | 0.900 | raise +10% |
| **14-19 Dec (all 5 open nights)** | **282.8** (283.6) | 319.8 (9) | P33 / -11.6% | +4.0% | P52 (25) | 280.8 / same | 222.4 (P71) | 0.900 | raise +10% |
| **26-30 Dec** | **392.25** (399.75) | 380.25 (9) | **P56 / +3.2%** | +21.4% | P44 (18) | 394.0 / same | 258.5 (above P75 354) | 0.900 | raise +5% / +10% |

### 14-19 Nov: guests see the Smoobu rate, which is 9% below PriceLabs
- **Airbnb follows Smoobu, not PriceLabs.**
  - 14-17 Nov all-in £688 = £150 + 0.766 x Smoobu £702 (270+222+210). 0.766 is the same factor as every other November stay.
  - Against PriceLabs (286+247+238 = £771) the factor would be 0.698.
  - So the Smoobu gap reaches guests: they pay about **£17.60/night less on 14-17 Nov** than the PriceLabs price implies (£229.33 vs £246.90).
- **Why Smoobu sits below PriceLabs: NOT CHECKED** (PriceLabs auditor).
  - PriceLabs `price` and `user_price` for 14-17 Nov are 286/291, 247/246, 238/237 and 241/245.
  - Smoobu has 270/222/210/222.
  - It is not today's push: Smoobu equals PriceLabs on 20-24 Nov and in December.
- **Position:** P0 of 6 kept comps on both 14-17 and 14-18 Nov (-18% / -22% vs median), 4-8% under the 0-review line. Comps did not move on 16-18 Nov (same-comp median 0%). We fell 7.3% on 16-18 Nov.
- **What the evidence supports: guests seeing the PriceLabs level, and no more.**
  - At PriceLabs, 14-17 Nov is about £246.90 (-12% vs median, +3.5% vs line) and 14-18 Nov about £231.00 (-15.5% vs median, -0.6% vs line). That is exactly the -12% to -15% a 0-review listing supports.
  - The +10% from `recommend` is not supported.
  - Removing the policy -5% (31 Oct-19 Nov) is Corentin's call, not a new proposal.
  - **14 Nov is tomorrow, so this lapses fast.**

### 20-24 Nov: P0 everywhere, and cheaper again with no edit
- **The 12 Nov 09:23Z re-price cut 20-24 Nov again.** `price` went from 242/251/220/254/252 to **241/242/215/247/245** (£1,219 -> £1,190, -2.4%).
  - `get_user_logs` shows no edit and the overrides are unchanged. Which factor moved: NOT CHECKED.
  - Smoobu equals PriceLabs on these nights (`prices.csv`).
- **Airbnb** (factor 0.765, no discount line):
  - 21-25 Nov £876 (£219.00/night), was £224.50.
  - 20-25 Nov £1,061 (£212.20/night).
  - 20-23 Nov £684 (£228.00).
  - 22-25 Nov £691 (£230.33).
- **Comps edged down.** Same-comp median change was 0%, but three comps cut:
  - 1684834789445533643 £333.50 -> £317.
  - 1516006875488990547 £234 -> £223.75.
  - 1316210326145130709 £296.67 -> £284.67 (22-25 Nov).
- **We are the cheapest of 7-8 kept comps** and of 10-12 in the wider sample on every 20-25 Nov stay, 2-10% under the 0-review line.
- **What the evidence supports** (only if the nights stay on sale, see t-p20-delivery):
  - **-5% -> 0% is supported.** At 0%, 21-25 Nov is about £228.50 (-16.7% vs median, -2.0% vs line) and 20-25 Nov about £221.90 (-6.1% vs line).
  - **The ceiling is about +2.5%** (+8% on today's price). That puts 21-25 Nov on the line, about -15% vs median.
  - +10% (`recommend`) is not supported for 0 reviews.
- **t-p20-delivery: still open for Corentin.**
  - Policy (24 Oct) says the delivery block is 20-22 Nov.
  - PriceLabs blocks 18-19 Nov instead.
  - 20-21 Nov carry Reyhan's -5% min 3 and are on sale on Airbnb.
- Booking.com availability for 20-24 Nov: NOT CHECKED.

### 5 Dec orphan (t-p20-5dec-orphan): NOT fixed, 4th day
- Live `get_listing_prices`: £313, min 3, `unbookable` 1.
- Overrides: 5 Dec is "0%, min 3", last updated 9 Nov 21:25:55Z.
- Comps for that night:
  - The only 1-night kept comp (1684834789445533643) cut from £567 to £538.
  - The wider sample is n=2, median 493.5.
  - Market P50/P75 is 228/301.
- **Supported: min 1 at the current £313.** That is above market P75 and under the only 1-night comp. On Airbnb it is about £282 room at the 0.90 December factor.

### December
- **14-17 Dec: hold.** P40 of 10, -2.0% vs median, +15% vs line.
  - We rose 1.2% overnight; comps were flat (same-comp median 0%).
  - No raise: 0 reviews, and we are already at the median.
  - No trim: we lead the market by 18 pts (30 d) and market occupancy for these nights is only 19%. Lowering would chase demand that is not there.
- **14-19 Dec: hold.** P33 of 9, -11.6%, +4.0% vs line.
- **26-30 Dec: hold.** P56 of 9, +3.2% vs median, +21% vs line, PriceLabs above market P75.
  - The 0-review line argues for less, but the kept comps place us mid-pack, and min stays are 4-6 nights.
  - Neither a raise nor a trim is supported without pace data.
- 13-15 Dec (30-day default) is booked on 13 Dec. Comps only: n=3, median 318.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

**What changed since 12 Nov:**
- No PriceLabs edits (logs and overrides unchanged).
- No Smoobu bookings or cancellations. **10-26 Dec (17 nights) is still fully open.**
- **12 Nov orphan (t-p13-1112-orphan) lapsed unsold.** Smoobu has no 12 Nov stay; the next stay arrives 13 Nov.

**Rating and reviews vs comp median** (4.76, 13 reviews):
- 3090701, 4.7 (10): `quality_premium` **-0.024**.
- 3064856, 4.31 (13): `quality_premium` **-0.15** (the cap).
- The flat sells at whichever twin is cheaper.

| Stay | Ours 3090701 / 3064856 (12 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n) | PL vs P50 | Factor | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 13-15 Nov (default Fri-Sun) | booked | none returned | | | 294.75 (4) | | | |
| 17 Nov (1 n, +35% min 1) | 316 / 325 (316 / 325) | 223 (4) | P75 / +42% ; P75 / +46% | (1-night; cleaning inflates ours) | P62 (8) | 216 / 228 vs 206 | 0.77 | raise +5% |
| 17-19 Nov (default Tue-Thu) | booked from 18 Nov | 207.25 (6) | comps only | | 242.5 (26) | | | |
| 20-22 Nov (next Fri-Sun) | booked | 228 (1) | comps only | | 318 (13) | | | |
| 27 Nov (1 n, +50% min 1) | 359 / 370 (338 / 397) | none returned | | | P100 (3; median 343) | 272 / 287 vs 238 | 0.77 | mkt: raise |
| **10-12 Dec (Thu-Sat)** | below min 3 on both | **255.25 (2)** | comps only | | 315 (13) | 201 / 263.5 vs 242 | | |
| **10-13 Dec** | **215.67 / 267.33** (234.67 / 266) | **262.67 (2)** | **P0 / -17.9% ; P50 / +1.8%** | **-15.9% / +19.7%** | **P5 / P33 (21)** | 204 / 267.7 vs 240.3 (-15% / +11%) | **0.812** | raise +10% |
| 13-15 Dec (30-day default) | below min 3 | 240.5 (3) | comps only | | 253.75 (20) | | | |
| 14-17 Dec (midweek) | 236.67 / 226 (238.33 / 227.67) | 217.67 (7) | P57 / +8.7% ; P57 / +3.8% | +11.4% / +22.1% | P42 / P24 (38) | 207.3 / 195.3 vs 224 | 0.90 | raise +10% |
| **20-25 Dec (5 n)** | **213.2 / 202.8** (214.4 / 204); "Long stay discount" strikes £1,167 -> £1,066, £1,110 -> £1,014 | 207.9 (2) | P100 / +2.5% ; P0 / -2.5% | +5.1% / +14.8% | **P19 / P6 (16; median 292.2)** | 226 / 213.2 vs 256.4 (-12% / -17%) | 0.81 | raise +10% |
| **23-26 Dec (Christmas)** | **255 / 243.33** (256.33 / 244.67); 3064856 strike £802 -> £730 (new) | 237.83 (2) | P100 / +7.2% ; P50 / +2.3% | +9.9% / +20.4% | **P15 / P10 (20; median 308.84)** | 227.7 / 214.7 vs 269.3 (-15% / -20%) | 0.90 | raise +10% |
| 24-27 Dec | 253 / 241.67 (254 / 242.67); 3064856 strike £811 -> £725 | 242 (2) | P100 / +4.5% ; P50 / -0.1% | +7.1% / +17.5% | **P19 / P12 (16; median 325.83)** | 225.3 / 212.7 vs 277.3 (-19% / -23%) | 0.90 | raise +10% |
| **5-8 Jan (twins, midweek)** | **206 / 197.33** (207.33 / 198.67) | **206.17 (8)** | **P50 / -0.1% ; P25 / -4.3%** | +2.4% / +12.6% | P27 / P23 (48) | 173 / 163.7 vs 204.7 (-15% / -20%) | 0.90 | raise +10% |
| 15-17 Jan (Fri-Sun) | below min 3 | 252.5 (7) | comps only | | 257.5 (35) | | | |

**Comp moves:**
- Christmas: kept comps (n=2) down 1.5-1.7% again.
- 10-13 Dec: 1411449348357673454 cut £351 -> £293, so the same-comp median fell 8.2%.
- 14-17 Dec: 1761224847419174970 rose £235.67 -> £272.
- 17 Nov: 1205241472054931937 was returned for the first time, at £403.

### 10-12 Dec
- **3090701 fell 8.1% on Airbnb overnight** (£234.67 -> £215.67 on 10-13 Dec) with no PriceLabs or Smoobu change.
  - PriceLabs `price` 193/209/210 is about as yesterday; `user_price` on 12 Dec is 238.
  - Both twins now sell 10-13 Dec at **0.812 x PriceLabs**, against 0.86 yesterday and 0.90 on every other 3-night December stay. 0.812 is about 0.90 x 0.90, so an extra ~10% applies to these dates only.
  - **Cause NOT EXPLAINED** (channel agent: Smoobu Airbnb rate / rules for 10-12 Dec). The 11-15 Dec Booking.com stay was cancelled (`reservations.csv`); any link is NOT CHECKED.
- **Position:** the cheaper twin is P0 of the 2 kept comps, P5 of 21 in the wider sample, and 16% under its line. PriceLabs is 15% under market P50 on 3090701. 11-12 Dec are "High Demand" in PriceLabs.
- **What the evidence supports: -5% -> 0% (+5.3%) on 10-12 Dec, on both twins.**
  - That puts 3090701 at about £224 (still -12.5% vs its line) and 3064856 at about £279 (+25% vs its line). That is why more than 0% is not supported.
  - Removing the unexplained extra ~10% on Airbnb would take 3090701 to about £236 by itself.
  - **This conflicts with Reyhan's 11 Nov -5%, so it is for Corentin to confirm (a-peak-check), not a new proposal.**

### Christmas (-5%, a-peak-check): unchanged since 11 Nov
- **Kept comps are n=2 and cheap.** On them the cheaper twin is P0-P50, -2.5% to 0% vs median, +15% to +20% over its line.
- **The wider sample has us at P6-P19** (medians £292-£326), and PriceLabs is 12-23% under market P50.
- **What the evidence supports: 18-26 Dec back to 0% (+5.3%); the full +10% is not.**
  - With 0%, 3090701 23-26 Dec is about £265.70 (+12% vs the n=2 median, still bottom quintile of the wider 20).
  - 3064856 at -0.15 quality caps the move.
- **Hold 13-17 Dec at -5%.** 14-17 Dec is P57 of 7, +11% / +22% vs the lines.
- New since yesterday: 3064856 23-26 Dec shows a strikethrough (£802 -> £730), as 24-27 Dec already did. There is no discount line in the breakdown, and the factor stays 0.90. Source: NOT CHECKED.

### Twins in January (t-p13-twins)
- **5-8 Jan: Airbnb £206.00 vs £197.33 (+4.4%); PriceLabs 3090701 is 5-6% above 3064856 on 3-10 Jan** (live).
  - Position: P50 / P25 of 8, on or above both lines (+2.4% / +12.6%).
  - Market occupancy for those nights is 17.2%.
  - **Hold.** A raise is not supported even though PriceLabs is 15-20% under market P50.
- **11-18 Jan: `user_price` is identical on both twins** (live `get_listing_prices`: 184/188/189/187/194/195/186/188). The 13 Nov raw files end on 12 Jan.
  - t-p13-twins stays open from 11 Jan. The fix is unchanged: a gap of about +4% on the child 3090701.
  - Order is deprioritised (policy), so it is not raised.

### Other P13 nights
- **17 Nov (1 night, +35%): hold.** P75 of 4, P62 of the wider 8. The 1-night all-in overstates ours by the cleaning fee.
- **27 Nov (+50% min 1): numbers only** (a-p13-orphan-price).
  - 3090701 rose £338 -> £359; 3064856 fell £397 -> £370.
  - No kept comp was returned; we are P100 of the wider 3.

## P10 Hanger Lane, 1-bed (3318177)
- No sellable nights. The confirmed Airbnb stay 18 Oct-19 Nov (`reservations.csv` 13 Nov) covers every night up to the handback (policy last night 18 Nov).
- No PriceLabs edits. No comps or positioning.

## P02 Ladbroke Grove, P03 Bayswater
Blocked on purpose (policy `intentional_blocks`). Refreshed 13 Nov (`listings.csv`: 2999946 at 00:23Z, Bayswater channex at 03:34Z). No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or Smoobu (`kpi_summary.md` 13 Nov: collect-data). Own price, percentile, rating gap and premium: **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (not attempted): comps, our displayed prices, and P20 20-24 Nov availability. The analysis is Airbnb only. Comp cancellation policies NOT CHECKED.
2. **Why Smoobu sits below PriceLabs on P20 14-17 Nov** (234 vs 257 average): NOT CHECKED. It is confirmed that guests see the Smoobu level.
3. **Why the P20 re-price cut 20-24 Nov by another 2.4%** with no edit: NOT CHECKED (which factor is not in the API output).
4. **P13 10-13 Dec sells at 0.812 x PriceLabs on Airbnb** (0.86 yesterday, 0.90 on other December stays): NOT EXPLAINED. Smoobu Airbnb rules / rates for those dates were not pulled. The 3064856 strikethroughs on 23-27 Dec: source NOT CHECKED.
5. **Thin comp coverage** (labelled; wider-sample or market percentiles used instead):
   - P13: n=0-2 on 13-15 Nov, 20-22 Nov, 27 Nov, 10-12 / 10-13 Dec and all of Christmas.
   - P20: n=1-3 on 13-15 Nov, 20-22 Nov, 5-6 Dec and 13-15 Dec.
6. **Comps' cleaning split is unknown**, so all-in gaps on 1-night stays (17 Nov, 27 Nov, 5 Dec) overstate ours.
7. The P13 Airbnb-to-Smoobu id mapping is "likely / probable" (policy `airbnb_listings_24oct`). P13 twin prices after 18 Jan: NOT CHECKED.
8. P16, P18 and P19 have no data; P10 has no sellable nights.
