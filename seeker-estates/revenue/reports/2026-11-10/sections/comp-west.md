# Competitor positioning: WEST + HERTS (D = 2026-11-10)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** `data/policy.json` read first. PriceLabs calls, read-only, one at a time, all 200:
1. `get_user_logs` (listing, 8-10 Nov) for 3547481, 3064856, 3090701, 3318177: 17 entries. **13 are new since 9 Nov 06:00Z, all Reyhan: 9 Nov 14:07Z (P13), then 21:22-21:26Z (P13, P20).** None for P10.
2. `get_listing_date_overrides` 3547481 (10 Nov-28 Feb) and 3064856 (10 Nov-31 Jan).
3. `get_neighbourhood_data` detail (future prices + occupancy) for 3547481 (2 BR n=153, P25/P50/P75 213/250/318) and 3064856 (2 BR n=116, 190/221/275). Saved to `scratchpad/west10/dl/neigh_*.json`.
4. `get_pms_reservations` smoobu, stays 11-15 Dec, booked from 8 Nov (to find the listing behind the cancelled P13 Booking.com stay).

**Own prices:** `raw/prices_*.json` in snapshot 2026-11-10. They were refreshed 9 Nov 21:22-21:27Z, **after** Reyhan's 21:22-21:26Z edits (`listings.csv` last push P13 21:23:04Z, P20 21:26:36Z). Airbnb follows the raw `price` field: (all-in - £150) / `price` = 0.765-0.769 in November and 0.90 in December. `user_price` differs from `price` on many dates (for example 3064856 10 Dec: 221 vs 268; P20 13 Nov: 294 vs 278); why is NOT EXPLAINED. Smoobu `/api/rates`: NOT CHECKED.

**Airbnb:** public search pages, checked 2026-11-10 with plain `curl` and default headers. No bot check was met. **Booking.com: NOT CHECKED.**

**Method** (unchanged since 3 Nov):
- Search: 4 guests, entire home, at least 2 bedrooms. Box of about 1.3 km half-side around the PriceLabs coordinates, plus a box of about 0.2 km around each kept comp.
- Price = Airbnb all-in total / nights, with cleaning and Airbnb fees **included** (taxes are not shown separately). Ours are on the same basis (£150 cleaning).
- Comp cancellation policies: NOT CHECKED.

**Comp sets** (same ids as 9 Nov; none replaced):
- **P13:** all 11 active. 1411449348357673454 (Superhost, now 4.76/50) is back: returned on 17-19 Nov and 5-8 Jan.
- **P20:** all 12 active. 1568001017881493647 and 789954794593691037 were found only on 23-27 Dec, so I added that stay to confirm they are active.

**Ratings:**
- Ours, unchanged: 3090701 4.7 (10), 3064856 4.31 (13), P20 New with 0 reviews.
- Comp median: P13 **4.76** (13 reviews), P20 **4.8** (17.5 reviews).

**Occupancy** (Smoobu `reservations.csv` 10 Nov, cancelled excluded; market from `pl_kpis.csv` 10 Nov):

| Listing | 30 d (10 Nov-9 Dec) | 60 d (10 Nov-8 Jan) | Market 30 / 60 | Lead 30 / 60 |
|---|---|---|---|---|
| P13 (one flat) | 24/30 = **80.0%** | 31/60 = **51.7%** | 43% / 37% | **+37 / +15 pts** |
| P20 | 21/30 = **70.0%** | 32/60 = **53.3%** | 38% / 31% | **+32 / +22 pts** |

All leads are 10 pts or more, so `recommend` returns "raise" on every stay. The quality-adjusted line below decides whether the raise is actually supported.

**Rows written:**
- `data/snapshots/2026-11-10/comps.csv` did not exist, so I copied it forward from 2026-11-09 (11,421 lines) and appended **321 rows** (P13: 11 comps x 15 stays; P20: 12 comps x 13 stays).
- **26 rows** appended to `channel_checks.csv` (our Airbnb listings; the file already existed, 805 lines).
- Both under `flock` (`.comps.csv.lock` / `.channel_checks.csv.lock`).
- To find them, filter `source` on "checked 2026-11-10" and "comp-west". `date` is the check-in; the full stay is in `source`. A comp that was not returned has a blank price and says so.

**Recompute check** (`snapshot.load('2026-11-10')` + `comp_summary`, matches the tables):
- P20 13-16 Nov: n=5, median 290, P20 / -8.0%.
- P20 14-17 Dec: n=10, median 309.5, P50 / +0.9%.
- P13 11-15 Dec: n=2, median 242.88, P50 / +1.8%.
- P13 23-26 Dec: n=3, median 251.67, P67 / +5.6%.
- P13 5-8 Jan: n=8, median 208.84, P50 / +0.1%.

## Comp tables (Airbnb all-in £/night, 4 guests, checked 2026-11-10)
- A figure in brackets is the same comp's price for the same stay on 9 Nov, shown where it moved by £1 or more.
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- For ours, "not returned" means booked, blocked or below min stay:
  - P13: 13-15 Nov and 17-19 Nov are booked. 10-12 Dec, 18-20 Dec and 15-17 Jan are below the new min 3.
  - P20: 13-15 Nov is below min 3. 17-19 Nov is blocked. 20-21 Nov is min 3. 21-25 Nov, 10-12 Dec and 23-27 Dec are booked. 5-6 Dec is unbookable.

#### P13

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 11-13 Nov | 13-15 Nov | 17-18 Nov | 17-19 Nov | 27-28 Nov | 1-2 Dec | 10-12 Dec | 11-15 Dec | 14-17 Dec | 18-20 Dec | 20-25 Dec | 23-26 Dec | 24-27 Dec | 5-8 Jan | 15-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.82 (11) | Garden view/balcony |  |  |  | 240 |  |  | 290.5 | 257.25 | 230.67 (241) | 283.5 | 253.8 (265.4) | 267 (279.33) | 267 (279) |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | Paid parking on premises/Guest favourite | 207 |  |  |  |  |  |  |  | 240 |  |  |  |  | 235.67 | 244 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking on premises |  |  |  | 221 |  |  | 268 |  |  |  |  |  |  | 203.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  |  |  |  |  | 225.33 | 272.5 (275.5) | 213.4 (216.6) | 238.33 (241.67) | 244 (247) | 214 | 255 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.76 (50) | Superhost |  |  |  | 243.5 |  |  |  |  |  |  |  |  |  | 209 |  |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed |  |  | 185 | 152.5 |  |  |  |  | 145.33 |  |  |  |  | 135.67 | 175 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  |  |  |  |  |  | 261 (264) | 228.5 | 209.33 | 274.5 | 218.4 (220.8) | 251.67 | 255.67 | 208.67 | 258 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift | 411 | 425.5 |  | 390.5 |  |  |  |  |  | 450 |  |  |  | 419.33 | 477 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking on premises | 188 |  |  | 196.5 |  |  |  |  | 254 |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | Lift/Paid parking on premises/balcony/Guest favourite |  |  |  |  | 394 | 423 |  |  |  | 331.5 |  |  |  |  | 331.5 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking on premises |  |  | 185 | 152.5 |  |  |  |  | 151.67 |  |  |  |  | 141.67 | 175 |
| **Comp median (n)** | | | 4.76 (13) | | **207** (3) | **425.5** (1) | **185** (2) | **221** (7) | **394** (1) | **423** (1) | **268** (3) | **242.88** (2) | **225.33** (7) | **283.5** (5) | **218.4** (3) | **251.67** (3) | **255.67** (3) | **208.83** (8) | **255** (7) |
| Wider 2-bed sample median (n) | | | | | 208.5 (11) | 309 (10) | 216 (6) | 240 (27) | 337.5 (4) | 441.5 (4) | 282.75 (14) | 262.75 (23) | 239 (35) | 301 (11) | 285.1 (16) | 310.67 (21) | 324.33 (17) | 235.67 (45) | 256.75 (34) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.7 (10)** | | | | | **213** | not returned | **310** | not returned | **339** | **324** | not returned | **247.25** | **247.33** | not returned | **222.8** (strike £1,221 -> £1,114) | **265.67** | **263** | **209** | not returned |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | | | | **220.5** | not returned | **319** | not returned | **409** | **389** | not returned | **235.5** | **236.33** | not returned | **212.2** (strike £1,162 -> £1,061) | **254** | **251.33** | **200.33** | not returned |

#### P20

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13-15 Nov | 13-16 Nov | 13-18 Nov | 16-18 Nov | 17-19 Nov | 20-21 Nov | 21-25 Nov | 5-6 Dec | 10-12 Dec | 14-17 Dec | 14-19 Dec | 23-27 Dec | 26-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost |  | 281 | 277.8 |  |  |  | 279 |  |  | 281.33 | 278 | 281 | 281.75 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises |  |  |  |  |  |  |  |  |  |  |  | 332.25 (334.75) |  |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises |  |  |  |  |  |  |  |  |  |  |  | 388.5 |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (56) | Lift |  |  |  |  |  |  | 298.25 |  |  | 346.67 (342) | 350.6 (346.8) | 415.25 | 498.25 (497.25) |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony |  | 424 | 420 |  |  |  | 380.25 |  |  | 382.67 | 378.6 | 380.25 | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony |  |  |  |  |  | 420 | 333.5 | 567 |  | 425.67 | 439.6 | 505.75 | 595.5 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises |  |  |  | 306 (281.5) | 281.5 |  | 257 |  | 292.5 | 261.67 | 249.8 |  |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony |  | 368.67 | 363.2 |  |  |  | 329.75 |  |  | 333.33 | 327.8 | 329.75 | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/Paid parking on premises/balcony (replaces 1384811870668527117, inactive next 60 days) |  |  |  |  |  |  | 275 |  |  | 313 (307.33) |  |  | 452 (448.5) |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost | 210.5 | 194.67 |  |  |  |  | 232.5 |  |  | 217.67 (222.33) |  | 237.5 (239.5) | 316.5 (320.75) |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises |  |  |  | 288.5 (264) | 264 |  |  |  | 264 | 250 | 238.4 |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 310 | 290 | 258 | 270 | 270 |  | 260 |  | 300 | 306 | 291.8 | 360 | 360 |
| **Comp median (n)** | | | 4.8 (18) | | **260.25** (2) | **290** (5) | **320.5** (4) | **288.5** (3) | **270** (3) | **420** (1) | **279** (9) | **567** (1) | **292.5** (3) | **309.5** (10) | **309.8** (8) | **360** (9) | **370.12** (8) |
| Wider 2-bed sample median (n) | | | | | 267 (8) | 290 (13) | 277.8 (13) | 270 (15) | 264 (11) | 312 (2) | 287.5 (15) | 567 (1) | 332.5 (9) | 280.33 (31) | 268.9 (22) | 360 (17) | 379.25 (14) |
| **Ours 3547481 (Airbnb 1791529331262420081) New, 0 reviews** | | | | | not returned | **266.67** | **233.4** | **259** | not returned | not returned | not returned | not returned | not returned | **312.33** | **300.2** | not returned | **422.25** |
