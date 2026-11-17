# Competitor positioning: WEST + HERTS (D = 2026-11-17)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** `data/policy.json` read first. Everything below was read-only, with one PriceLabs call at a time:
1. `get_user_logs` (listing, 16-17 Nov) for 3547481, 3064856, 3090701 and 3318177 returned **0 entries**. No PriceLabs edits on this batch since yesterday's run.
2. `get_neighbourhood_data` (detail, future prices and occupancy) for 3547481 (Nearby Listings, **1-3 BR**, 272 listings) and 3064856 (2-3 BR, 151 listings). Both returned OK. The market P25/P50/P75 and occupancy figures below come from these pulls ("mkt 17 Nov").
   - `raw/neighbourhood_P13.json` in the snapshot has no daily prices, so I did not use it for per-night figures.
3. Own prices come from `raw/prices_*.json` and `prices.csv` (17 Nov). The last refresh was 16 Nov 09:42:53Z (P13) and 09:43:29Z (P20). Smoobu equals the PriceLabs `price` on every open night checked. 3090701 has no `smoobu_price` column; it is the linked child.
4. **Smoobu GET** (`/api/reservations` and `/api/rates`, 20-28 Dec; guest fields not read or saved) to identify the twin for the new Christmas booking. Results are in the P13 section.

**OTAs:**
- **Airbnb:** public search pages, checked 2026-11-17 with plain `curl` and default headers. No bot check was met, no HTTP errors.
- **Booking.com: NOT CHECKED.** A WAF challenge was met on 14 Nov; I did not retry or bypass it.

**Method** (unchanged since 3 Nov):
- Search: 4 guests, entire home, at least 2 bedrooms. The map box has a half-side of about 1.3 km around the PriceLabs coordinates, plus a 0.2 km box around each kept comp.
- Price = Airbnb all-in total / nights, with cleaning and Airbnb fees **included**. Taxes are not shown separately.
- Ours are priced on the same basis. A **sold** stay = (Smoobu room `basePrice` + £150 cleaning) / nights.
- **Line** = comp median x (1 + `quality_premium`):
  - 3090701: `quality_premium(4.7, 4.76)` = -0.024.
  - 3064856: `quality_premium(4.31, 4.76)` = **-0.15** (the cap). The Booking.com score of 8.4/10 (= 4.2/5, policy) also gives -0.15.
  - P20 has 0 reviews and the function returns 0.0. I use comp median x 0.85; that -15% new-listing allowance is my judgement, not the function's output.
- **`recommend` inputs** (Smoobu `reservations.csv` 17 Nov, cancelled excluded; market from `pl_kpis.csv`):
  - P13 (one flat): 30 d **23/30 = 76.7%** vs market 47%; 60 d **35/60 = 58.3%** vs 37%.
  - P20: 30 d **18/30 = 60.0%** vs 39%; 60 d **32/60 = 53.3%** vs 30%.
  - The lead is at least 21 points in every case, so `recommend` returns "raise +10%" on every priced stay. The quality line decides how much of that the evidence supports.

**Comp sets:** the same ids as 16 Nov; none replaced.
- **P13:** all 11 active (each returned on at least one of 11 stays).
- **P20:** all 12 active. **789954794593691037 was absent from all 12 standard stays for the 4th day.** The 0.2 km probe found it at 4.89 (18): 1-4 Dec £900, 7-10 Dec £1,180, 8-11 Jan £1,180 (not 14-17 Dec). It is bookable, so it stays in the set; its probe rows are in `comps.csv`.

**Ratings** (Airbnb labels today):
- Ours: 3090701 4.7 (10), 3064856 4.31 (13), P20 "New" (0 reviews). Unchanged.
- Comp medians: P13 4.76 (13 reviews), P20 4.8 (17.5). Only one comp changed: 1411449348357673454 went 4.73 (52) -> 4.74 (53).
- Review gap vs comp median: 3090701 -3, 3064856 0, P20 -17.5.

**Rows written** (under `flock`; another agent had already copied the files forward):
- **268 rows** appended to `data/snapshots/2026-11-17/comps.csv` under `.comps.csv.lock`: P13 11 comps x 11 stays, P20 12 x 12, and 3 probe rows.
- **21 rows** appended to `channel_checks.csv` (our Airbnb listings) under `.channel_checks.csv.lock`.
- To find them, filter `source` on "checked 2026-11-17" and "comp-west".

**Recompute check** (`snapshot.load('2026-11-17')` + `comp_summary`; matches the tables):

| Listing | Stay | n | Median | Position |
|---|---|---|---|---|
| P13 Christmas sold | 22-27 Dec | 3 | 218.4 | P0 / -9.3% |
| P13 | 13-16 Dec | 4 | 237.0 | P25 / -1.3% |
| P13 | 17-20 Dec | 4 | 277.34 | P50 / -5.3% |
| P13 | 5-8 Jan | 8 | 211.33 | P38 / -3.0% |
| P20 | 20-24 Nov | 5 | 288.25 | P0 / -13.3% |
| P20 | 16-19 Dec | 8 | 329.66 | P62 / +7.0% |

## Comp tables (Airbnb all-in £/night, 4 guests, checked 2026-11-17)
- A figure in brackets is the same comp's price for the same stay on 16 Nov, shown where it moved by £1 or more.
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- For ours, "not returned" means booked, blocked or below the minimum stay:
  - P13: 18-27 Nov and 22 Dec-2 Jan are booked.
  - P20: 20-22 Nov is below min 3, 24-26 Nov hits the 25 Nov booking, 5 Dec is min 3, and 26 Dec is min 4.
#### P13

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20-22 Nov | 24-26 Nov | 13-16 Dec | 16-19 Dec | 17-20 Dec | 18-22 Dec | 13-22 Dec | 22-27 Dec | 23-27 Dec | 5-8 Jan | 14-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.85 (13) | Garden view/balcony |  |  | 247 (255) |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.82 (11) | Paid parking on premises/Guest favourite |  |  | 235.67 | 251 (259) |  |  |  |  |  | 235.67 | 235.67 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking on premises |  |  |  | 236 (235) |  |  |  |  |  | 218.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  | 224 (218.67) | 228 | 214.25 |  | 202.6 | 212.25 | 214 | 225.33 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.74 (53) | Superhost | 269 (285.5) |  |  |  |  |  |  | 311.8 | 342 (347.25) | 200 (201) | 205.33 (210.67) |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed |  | 152.5 |  |  |  |  |  |  |  | 135.67 | 154.67 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  |  | 209 (219.33) | 221.67 (226.33) | 238 | 222.5 | 170.11 | 218.4 | 229.25 (227.25) | 208.67 | 226 (231) |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift |  |  |  | 433.33 (425) | 430.33 |  |  |  |  | 419.33 | 456.67 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking on premises |  |  | 238.33 |  |  |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | Lift/Paid parking on premises/balcony/Guest favourite |  |  |  | 332.33 (316.67) | 316.67 |  |  |  |  |  | 316.67 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking on premises |  | 152.5 |  |  |  |  |  |  |  | 141.67 | 159.33 (156.67) |
| **Comp median (n)** | | | 4.76 (13) | | **269** (1) | **152.5** (2) | **237** (4) | **243.5** (6) | **277.34** (4) | **218.38** (2) | **170.11** (1) | **218.4** (3) | **229.25** (3) | **211.33** (8) | **225.67** (8) |
| Wider 2-bed sample median (n) | | | | | 310.5 (11) | 227 (21) | 239 (31) | 263.33 (23) | 316.67 (17) | 304 (15) | 275.56 (13) | 302.6 (19) | 319.12 (22) | 239.33 (49) | 239.33 (59) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.7 (10)** | | | | | not returned | not returned | **234** | **262** | **262.67** | **247.5** | **197** (strike £2,059 -> £1,773) | not returned | not returned | **205** | **221.33** |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | | | | not returned | not returned | **234** | **254** | **251** | **236** | **191.56** (strike £2,002 -> £1,724) | not returned | not returned | **196.33** | **215** |

#### P20

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20-22 Nov | 20-23 Nov | 20-24 Nov | 21-24 Nov | 22-24 Nov | 24-26 Nov | 5-6 Dec | 14-17 Dec | 14-19 Dec | 16-19 Dec | 26-27 Dec | 26-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost |  | 281 | 279 (280.75) | 281 (283.33) |  |  |  | 281 | 277.8 | 281 |  | 285.25 (286.5) |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises |  |  |  |  |  |  |  |  |  |  |  | 364 (375.5) |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises |  |  |  |  |  |  |  |  |  |  |  |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (57) | Lift |  |  |  |  |  |  |  | 320.67 (319.33) | 327.6 (322) | 361.67 (355.33) |  | 453.25 (443.25) |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony |  | 424 | 421.5 | 424 |  |  |  | 382.67 | 378.6 | 382.67 |  | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony |  |  |  |  | 285 | 306 |  | 341 | 348 | 352.67 | 494 | 417 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises | 330.5 | 302.33 | 288.25 | 294 | 306 | 281.5 |  | 261.67 | 249.8 | 268.67 |  |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony |  | 368.67 | 365.25 | 368.67 |  |  |  | 333.33 | 327.8 | 333.33 |  | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/Paid parking on premises/balcony (replaces 1384811870668527117, inactive next 60 days) |  |  |  |  |  |  |  | 299.33 (306) | 311.2 (313) | 326 (322.33) |  | 426.75 (423.75) |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost |  |  |  | 190.67 (203.67) | 197.5 (211) |  |  | 227.67 (214.33) |  |  |  |  |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises |  |  |  |  | 288.5 | 264 |  | 250 |  |  |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 310 | 290 | 270 | 276.67 | 290 | 270 |  | 306 | 291.8 | 309 |  | 360 |
| **Comp median (n)** | | | 4.8 (18) | | **320.25** (2) | **302.33** (5) | **288.25** (5) | **287.5** (6) | **288.5** (5) | **275.75** (4) | - | **302.66** (10) | **319.4** (8) | **329.66** (8) | **494** (1) | **372.12** (8) |
| Wider 2-bed sample median (n) | | | | | 320.25 (4) | 302.33 (7) | 356 (7) | 326.84 (8) | 288.5 (13) | 270 (15) | 445 (1) | 280.34 (30) | 297.2 (21) | 326.34 (20) | 345 (5) | 420 (15) |
| **Ours 3547481 (Airbnb 1791529331262420081) New, 0 reviews** | | | | | not returned | **267.67** | **250** | **256.67** | **270.5** | not returned | not returned | **310** | **309** | **352.67** | not returned | not returned |
