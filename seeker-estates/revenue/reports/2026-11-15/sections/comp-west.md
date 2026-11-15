# Competitor positioning: WEST + HERTS (D = 2026-11-15)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** I read `data/policy.json` first. PriceLabs calls were read-only and made one at a time:
1. `get_user_logs` (listing, 14-15 Nov) for 3547481, 3064856, 3090701, 3318177: **no entries**.
2. `get_listing_date_overrides` 3547481 and 3064856 (15 Nov-31 Jan): **unchanged**. The latest edits are still Reyhan's from 11 Nov (P20 15, 20, 21 Nov at -5% min 3; P13 10-26 Dec at -5% min 3).
3. `get_neighbourhood_data` (detail) for 3547481 and 3064856: **both failed** (initialize HTTP 500, error 50002). No market data today for either; `raw/neighbourhood_P13.json` is also an error. Market P25/P50/P75 and market occupancy per night below are **from the 14 Nov pull** (`scratchpad/west14/dl/neigh_*.json`), labelled "mkt 14 Nov".
4. Live `get_listing_prices` 3090701 and 3064856, 3-20 Jan (the 15 Nov raw files stop at 14 Jan): both last refreshed 2026-11-15T06:55:54Z, same as raw. All other own prices come from `raw/prices_*.json` (15 Nov) and `prices.csv` (15 Nov).

**OTAs:**
- **Airbnb:** public search pages, checked 2026-11-15 with plain `curl` and default headers. No bot check was met, no HTTP errors.
- **Booking.com: NOT CHECKED.** Yesterday the first request hit an AWS WAF challenge; I did not retry today. The only Booking.com price in this section is our own sold rate (Smoobu `reservations.csv`).

**Method** (unchanged since 3 Nov):
- 4 guests, entire home, at least 2 bedrooms. Map box of about 1.3 km half-side around the PriceLabs coordinates, plus a 0.2 km box around each kept comp.
- Price = Airbnb all-in total / nights. Cleaning and Airbnb fees **included**; taxes not shown separately. Ours on the same basis (£150 cleaning).
- **Line** = comp median x (1 + `quality_premium`). For P20 (0 reviews; `quality_premium` returns 0.0) I use comp median x 0.85. That -15% new-listing allowance is my judgement, not the function's output.
- Comp cancellation policies: NOT CHECKED.

**Comp sets:** same ids as 14 Nov; none replaced.
- P13: all 11 active (each returned on at least one of 13 stays).
- P20: all 12 active. **789954794593691037 was again not returned on any of the 11 standard stays** (2nd day). The extra 0.2 km checks returned it at 4.89 (18): 1-4 Dec £900, 7-10 Dec £1,180, 23-27 Dec £1,554, 8-11 Jan £1,180. So it stays in the set.

**Ratings** (Airbnb search labels today):
- Ours: 3090701 4.7 (10), 3064856 4.31 (13), P20 "New" with 0 reviews. Unchanged.
- Comp median: P13 **4.76** (13 reviews), P20 **4.8** (17.5 reviews). 1316210326145130709 went from 56 to 57 reviews.
- Review gap vs comp median: 3090701 **-3**, 3064856 **0**, P20 **-17.5**.
- `quality_premium`: 3090701 **-0.024**, 3064856 **-0.15** (cap), P20 0.0 (no rating).

**Occupancy** (Smoobu `reservations.csv` 15 Nov, cancelled excluded; market from `pl_kpis.csv` 15 Nov):

| Listing | 30 d (15 Nov-14 Dec) | 60 d (15 Nov-13 Jan) | Market 30 / 60 | Lead |
|---|---|---|---|---|
| P13 (one flat) | 22/30 = **73.3%** | 34/60 = **56.7%** | 46% / 38% | **+27 / +19 pts** |
| P20 | 18/30 = **60.0%** | 25/60 = **41.7%** | 40% / 31% | **+20 / +11 pts** |

- Overnight: **P13 new Booking.com 18-23 Dec** (5 nights, booked 14 Nov). It is registered on 3064856 in PriceLabs; 3090701 shows -1 on those nights. No P20 changes.
- Every lead is 10 pts or more, so `recommend` returns "raise" (+5% / +10%) on every priced stay. The quality line decides how much of that the evidence supports.

**Rows written** (under `flock`, `.comps.csv.lock` / `.channel_checks.csv.lock`):
- **275 rows** appended to `data/snapshots/2026-11-15/comps.csv`: P13 11 comps x 13 stays, P20 12 comps x 11 stays. Another agent had already copied the file forward (24,010 lines before).
- **28 rows** appended to `channel_checks.csv` (our Airbnb listings).
- To find them, filter `source` on "checked 2026-11-15" and "comp-west".

**Recompute check** (`snapshot.load('2026-11-15')` + `comp_summary`; matches the tables):

| Listing | Stay | n | Median | Position |
|---|---|---|---|---|
| P20 | 16-18 Nov | 4 | 289.5 | P0 / -19.9% |
| P20 | 20-24 Nov | 6 | 296 | P0 / -27.8% |
| P20 | 14-17 Dec | 10 | 302.34 | P60 / +1.4% |
| P13 sold Booking.com | 18-23 Dec | 2 | 208 | P0 / -4.1% |
| P13 (3090701) | 10-13 Dec | 2 | 263.17 | P0 / -21.6% |
| P13 (3064856) | 23-27 Dec | 3 | 230.25 | P67 / +3.5% |
| P13 (3064856) | 5-8 Jan | 8 | 206.17 | P50 / -0.1% |
| P13 (3064856) | 14-17 Jan | 7 | 232 | P29 / -6.5% |

## Comp tables (Airbnb all-in £/night, 4 guests, checked 2026-11-15)
- A figure in brackets is the same comp's price for the same stay on 14 Nov, shown where it moved by £1 or more.
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- For ours, "not returned" means booked, blocked or below the minimum stay:
  - P13: 17-19 and 20-22 Nov are booked; 18-23 Dec is now booked.
  - P20: 17-19 Nov is blocked (18-19 Nov). 20-22 Nov is below min 3. 5-6 Dec is unbookable (min 3).

#### P13

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17-18 Nov | 17-19 Nov | 20-22 Nov | 27-28 Nov | 1-2 Dec | 10-13 Dec | 14-17 Dec | 18-23 Dec | 23-26 Dec | 24-27 Dec | 23-27 Dec | 5-8 Jan | 14-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.83 (12) | Garden view/balcony |  |  |  |  |  |  | 265 (271.33) |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.82 (11) | Paid parking on premises/Guest favourite |  |  |  |  |  |  | 237.33 |  |  |  |  | 235.67 | 235.67 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking on premises |  | 221 |  |  |  |  |  |  |  |  |  | 203.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  |  |  | 229.33 (214) | 204.2 | 222.33 | 227.33 (229) | 212.25 | 214 | 225.33 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.75 (51) | Superhost | 243 | 196.5 | 298.5 (296.5) |  |  | 292.33 |  |  |  |  | 346 | 199.67 |  |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed | 185 |  |  |  |  |  | 147.33 (145.33) |  |  |  |  | 135.67 | 154.67 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  |  | 212 (221) |  |  | 234 (235.33) | 208.67 | 211.8 | 240.67 (244.67) | 244.67 (251) | 230.25 | 208.67 | 232 (230) |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift |  | 411 |  |  |  |  |  |  |  |  |  | 419.33 | 456.67 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking on premises |  | 196.5 |  |  |  |  | 254 |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | Lift/Paid parking on premises/balcony/Guest favourite | 359 (403) | 336.5 (358.5) |  |  |  |  |  |  |  |  |  |  | 316.67 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking on premises | 185 |  |  |  |  |  | 151.67 |  |  |  |  | 141.67 | 154.67 |
| **Comp median (n)** | | | 4.76 (13) | | **214** (4) | **221** (5) | **255.25** (2) | - | - | **263.16** (2) | **229.33** (7) | **208** (2) | **231.5** (2) | **236** (2) | **230.25** (3) | **206.17** (8) | **232** (7) |
| Wider 2-bed sample median (n) | | | | | 245 (8) | 238.75 (20) | 309 (13) | 329 (3) | 435 (3) | 310.67 (21) | 244.5 (38) | 288.8 (17) | 307.67 (22) | 324.16 (16) | 317.38 (20) | 233.83 (46) | 235.67 (56) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.7 (10)** | | | | | **309** | not returned | not returned | **348** | **321** | **206.33** | **224** | not returned | **261.33** | **260.67** | **249** | **214.33** | **219.67** (strike £715 -> £659) |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | | | | **337** | not returned | not returned | **383** | **364** | **245.33** | **248** | not returned | **250.67** | **250** | **238.25** | **206** | **217** (strike £706 -> £651) |

#### P20

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 16-18 Nov | 17-19 Nov | 20-22 Nov | 20-23 Nov | 20-24 Nov | 21-24 Nov | 22-24 Nov | 5-6 Dec | 14-17 Dec | 14-19 Dec | 26-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost |  |  |  | 281 | 280.75 (279) | 283.33 (281) |  |  | 281 | 277.8 | 286.5 (288.25) |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises | 290.5 | 290.5 (295.5) |  |  |  |  |  |  |  |  | 372.75 (387.75) |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises |  |  |  |  |  |  |  |  |  |  |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (57) | Lift |  |  |  |  |  |  |  |  | 323 (329.67) | 325 (333.4) | 457.25 (459) |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony |  |  |  | 424 | 421.5 | 424 (382.67) |  |  | 382.67 | 378.6 | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony |  |  | 322.5 | 310 | 303.75 | 299 | 285 | 431 | 341 | 348 | 417 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises | 306 | 306 | 330.5 | 302.33 | 288.25 | 294 (268.67) | 281.5 |  | 261.67 | 249.8 |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony |  |  |  | 368.67 | 365.25 | 368.67 (333.33) |  |  | 333.33 | 327.8 | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/Paid parking on premises/balcony (replaces 1384811870668527117, inactive next 60 days) |  |  |  |  |  |  |  |  | 298.67 (295.67) | 309.4 (310.4) | 435.75 (426) |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost |  |  |  |  |  | 208.67 (207.67) |  |  | 208 (206.67) |  | 286 (300.25) |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises | 288.5 | 288.5 |  |  |  |  | 264 |  | 250 |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 270 | 270 | 310 | 290 | 270 | 276.67 | 290 |  | 306 | 291.8 | 360 |
| **Comp median (n)** | | | 4.8 (18) | | **289.5** (4) | **289.5** (4) | **322.5** (3) | **306.16** (6) | **296** (6) | **294** (7) | **283.25** (4) | **431** (1) | **302.34** (10) | **317.2** (8) | **372.75** (9) |
| Wider 2-bed sample median (n) | | | | | 262.75 (12) | 270 (7) | 322.5 (5) | 310 (9) | 352 (9) | 299.5 (10) | 281.5 (13) | 438 (2) | 276 (30) | 282 (23) | 398.62 (16) |
| **Ours 3547481 (Airbnb 1791529331262420081) New, 0 reviews** | | | | | **232** | not returned | not returned | **230.33** | **213.75** | **219.33** | **239.5** | not returned | **306.67** | **290.8** | **384** |
