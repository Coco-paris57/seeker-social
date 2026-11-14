# Competitor positioning: WEST + HERTS (D = 2026-11-14)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** I read `data/policy.json` first. All PriceLabs calls were read-only, made one at a time, and returned 200:
1. `get_user_logs` (listing, 13-14 Nov) for 3547481, 3064856, 3090701 and 3318177: **no entries**.
2. `get_listing_date_overrides` for 3547481 and 3064856 (14 Nov-31 Jan): **unchanged**. The latest edits are still Reyhan's from 11 Nov:
   - P20: 14-15 and 20-21 Nov at -5%, min 3 (17:15:52-58Z).
   - P13: 10-26 Dec at -5%, min 3 (15:38:45Z).
3. Live `get_listing_prices`:
   - **3547481 (14 Nov-31 Dec)**: last refreshed 13 Nov 09:07:52Z. It matches `raw/prices_3547481.json` (14 Nov) on every night. 14 Nov is not in the raw file; live shows price 282, user_price 270.
   - **3064856 and 3090701 (3-20 Jan)**: re-priced **14 Nov 07:20:23-26Z**, after the snapshot pull (raw is 13 Nov 07:39Z). The January values are within £1 of raw. December is taken from raw.
4. `get_neighbourhood_data` in detail mode (future prices and occupancy):
   - 3547481: 2 BR, n=151, P25/P50/P75 217/255/330.
   - 3064856: 2 BR, n=115, P25/P50/P75 193/225/269.
   - Saved to `scratchpad/west14/dl/neigh_*.json`.

**Own prices (what guests see):** Airbnb public search, 4 guests, all-in. Smoobu rates come from `prices.csv` (14 Nov). There Smoobu equals the PriceLabs `price` on every P13 and P20 open night.

**OTAs:**
- **Airbnb:** public search pages, checked 2026-11-14 with plain `curl` and default headers. No bot check was met.
- **Booking.com: NOT CHECKED.** One plain search request (Canary Wharf, 14-17 Dec) returned HTTP 202 with an AWS WAF challenge. Per the rules I did not try to get past it, and I made no further requests.

**Method** (unchanged since 3 Nov):
- **Search:** 4 guests, entire home, at least 2 bedrooms. A box of about 1.3 km half-side around the PriceLabs coordinates, plus a box of about 0.2 km around each kept comp.
- **Price:** Airbnb all-in total / nights. Cleaning and Airbnb fees are **included**; taxes are not shown separately. Ours are on the same basis (£150 cleaning).
- **Line:** comp median x (1 + `quality_premium`). For P20 (0 reviews, `quality_premium` returns 0.0) I use comp median x 0.85, a -15% new-listing allowance. That allowance is my judgement, not the function's output.
- **Comp cancellation policies:** NOT CHECKED.

**Comp sets:** same ids as 13 Nov; none replaced.
- **P13:** all 11 are active (each returned on at least one of 12 stays).
- **P20:** all 12 are active. **789954794593691037 was again not returned on any of the 16 standard stays.** Extra 0.2 km searches today returned it at 4.89 (18) on these stays, so it stays in the set:
  - 1-4 Dec: £900
  - 7-10 Dec: £1,180
  - 23-27 Dec: £1,554
  - 8-11 Jan: £1,180

**Ratings** (Airbnb search labels today; unchanged):
- Ours: 3090701 4.7 (10), 3064856 4.31 (13), P20 "New" with 0 reviews.
- Comp median: P13 **4.76** (13 reviews), P20 **4.8** (17.5 reviews).
- Review-count gap vs comp median: 3090701 **-3**, 3064856 **0**, P20 **-17.5**.

**Occupancy** (Smoobu `reservations.csv` 14 Nov, cancelled stays excluded; market from `pl_kpis.csv` 14 Nov):

| Listing | 30 d (14 Nov-13 Dec) | 60 d (14 Nov-12 Jan) | Market 30 / 60 | Lead |
|---|---|---|---|---|
| P13 (one flat) | 23/30 = **76.7%** | 30/60 = **50.0%** | 46% / 38% | **+31 / +12 pts** |
| P20 | 18/30 = **60.0%** | 25/60 = **41.7%** | 39% / 30% | **+21 / +12 pts** |

- No P13 or P20 bookings or cancellations overnight (full-row diff of `reservations.csv`, 13 Nov vs 14 Nov). P20's 14 Nov (tonight) is unsold.
- Every lead is 10 pts or more, so `recommend` returns "raise" (+5% / +10%) on every priced stay. The quality line decides how much of that the evidence supports.

**Rows written** (both under `flock`, `.comps.csv.lock` / `.channel_checks.csv.lock`):
- **324 rows** appended to `data/snapshots/2026-11-14/comps.csv`: P13 11 comps x 12 stays, P20 12 comps x 16 stays. Another agent had already copied the file forward (21,411 lines before).
- **30 rows** appended to `channel_checks.csv` (our Airbnb listings).
- To find them, filter `source` on "checked 2026-11-14" and "comp-west".

**Recompute check** (`snapshot.load('2026-11-14')` + `comp_summary`; matches the tables):

| Listing | Stay | n | Median | Position |
|---|---|---|---|---|
| P20 | 15-18 Nov | 6 | 277.67 | P0 / -16.3% |
| P20 | 20-24 Nov | 7 | 296.25 | P0 / -27.1% |
| P20 | 14-17 Dec | 10 | 300.84 | P50 / -1.4% |
| P13 (3090701) | 10-13 Dec | 2 | 263.83 | P0 / -21.3% |
| P13 (3064856) | 23-26 Dec | 2 | 233.83 | P50 / +3.8% |
| P13 (3064856) | 5-8 Jan | 8 | 206.17 | P25 / -4.3% |
| P13 | 14-17 Jan | 7 | 230 | P29 / -3.6% |

## Comp tables (Airbnb all-in £/night, 4 guests, checked 2026-11-14)
- A figure in brackets is the same comp's price for the same stay on 13 Nov, shown where it moved by £1 or more.
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- For ours, "not returned" means booked, blocked or below the minimum stay:
  - P13: 17-19 Nov and 20-22 Nov are booked from 18 Nov. 10-12 Dec is below min 3.
  - P20: 15-19 Nov and 17-19 Nov are blocked (18-19 Nov). 20-22 Nov is below min 3. 5-6 Dec is unbookable (min 3).

#### P13

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17-18 Nov | 17-19 Nov | 20-22 Nov | 27-28 Nov | 10-12 Dec | 10-13 Dec | 14-17 Dec | 20-25 Dec | 23-26 Dec | 24-27 Dec | 5-8 Jan | 14-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.83 (12) | Garden view/balcony |  |  |  |  |  |  | 271.33 |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.82 (11) | Paid parking on premises/Guest favourite |  |  |  |  |  |  | 237.33 |  |  |  | 235.67 | 235.67 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking on premises |  |  |  |  | 254.5 (259) |  |  |  |  |  | 203.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  |  |  | 214 (217.67) | 198.6 (204.8) | 223 (229.67) | 229 (234.33) | 214 | 226 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.75 (51) | Superhost | 243 (261) | 196.5 (218) | 296.5 |  |  | 292.33 |  |  |  |  | 199.67 |  |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed | 185 |  |  |  |  |  | 145.33 |  |  |  | 135.67 | 154.67 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  |  | 221 (228) |  | 254 (251.5) | 235.33 (232.33) | 208.67 | 210.8 | 244.67 (246) | 251 (249.67) | 208.67 | 230 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift |  | 411 |  |  |  |  |  |  |  |  | 419.33 | 456.67 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking on premises |  | 196.5 |  |  |  |  | 254 |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | Lift/Paid parking on premises/balcony/Guest favourite | 403 | 358.5 |  |  |  |  |  |  |  |  |  | 316.67 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking on premises | 185 |  |  |  |  |  | 151.67 |  |  |  | 141.67 | 154.67 |
| **Comp median (n)** | | | 4.76 (13) | | **214** (4) | **277.5** (4) | **258.75** (2) | - | **254.25** (2) | **263.83** (2) | **214** (7) | **204.7** (2) | **233.83** (2) | **240** (2) | **206.17** (8) | **230** (7) |
| Wider 2-bed sample median (n) | | | | | 245 (8) | 242.5 (19) | 315.5 (13) | 343 (3) | 315 (13) | 310.67 (21) | 241.17 (38) | 292.2 (16) | 307.67 (22) | 322.33 (17) | 233.83 (48) | 235 (52) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.7 (10)** | | | | | **326** | not returned | not returned | **372** | not returned | **207.67** | **236.33** | **212.4** (strike £1,163 -> £1,062) | **254** | **251.67** (strike £827 -> £755) | **206** | **221.67** (strike £722 -> £665) |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | | | | **336** | not returned | not returned | **383** | not returned | **247** | **226.33** | **202.4** (strike £1,107 -> £1,012) | **242.67** (strike £802 -> £728) | **240.67** (strike £811 -> £722) | **197.33** | **221.67** (strike £722 -> £665) |

#### P20

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 14-17 Nov | 15-18 Nov | 15-19 Nov | 16-18 Nov | 17-19 Nov | 20-22 Nov | 20-23 Nov | 20-24 Nov | 20-25 Nov | 21-24 Nov | 21-25 Nov | 22-25 Nov | 5-6 Dec | 14-17 Dec | 14-19 Dec | 26-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost | 281 | 281 | 279 |  |  |  | 281 | 279 | 277.8 | 281 | 279 | 281 |  | 281 | 277.8 | 288.25 (282) |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises | 259.33 (280.33) | 259.33 | 246.5 | 290.5 (317) | 295.5 (322.5) |  |  |  |  |  |  |  |  |  |  | 387.75 (400.5) |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (56) | Lift |  |  |  |  |  |  |  |  |  |  |  | 322.67 (284.67) |  | 329.67 (340.33) | 333.4 (347) | 459 (480) |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | 382.67 (396.67) | 396.67 | 401 |  |  |  | 424 (382.67) | 421.5 | 420 (378.6) | 382.67 | 380.25 | 382.67 |  | 382.67 | 378.6 | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony |  |  |  |  |  | 322.5 (341) | 310 (327.33) | 303.75 | 304 (320.8) | 299 | 300.75 (317) | 292 (307.33) | 431 (538) | 341 (425.67) | 348 (439.6) | 417 (595.5) |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises |  |  |  | 306 | 306 | 330.5 (303.5) | 302.33 (276.33) | 288.25 | 279.8 (254.4) | 268.67 | 257 | 261.67 |  | 261.67 | 249.8 |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony |  | 345 | 347.5 |  |  |  | 368.67 (333.33) | 365.25 | 363.2 (327.8) | 333.33 | 329.75 | 333.33 |  | 333.33 | 327.8 | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/Paid parking on premises/balcony (replaces 1384811870668527117, inactive next 60 days) |  |  |  |  |  |  | 303.33 (285.33) | 296.25 | 294 (276.2) | 261.67 | 260.75 (269.5) | 252 (259.33) |  | 295.67 (304) | 310.4 (319.8) | 426 (440.5) |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost |  |  |  |  |  |  |  |  |  | 207.67 | 209 (223.75) | 218.33 (231.67) |  | 206.67 (209.33) |  | 300.25 (303.75) |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises | 274.33 | 274.33 | 267.25 | 288.5 | 288.5 |  |  |  |  |  |  | 250 |  | 250 | 238.4 |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 276.67 | 263.33 | 250 | 270 | 270 | 310 | 290 | 270 | 258 | 276.67 | 260 | 263.33 |  | 306 | 291.8 | 360 |
| **Comp median (n)** | | | 4.8 (18) | | **276.67** (5) | **277.66** (6) | **273.12** (6) | **289.5** (4) | **292** (4) | **322.5** (3) | **303.33** (7) | **296.25** (7) | **294** (7) | **278.84** (8) | **269.88** (8) | **272.16** (10) | **431** (1) | **300.84** (10) | **310.4** (9) | **380.25** (9) |
| Wider 2-bed sample median (n) | | | | | 275.5 (8) | 268.83 (14) | 267.25 (9) | 267.5 (14) | 270 (9) | 322.5 (5) | 306.66 (10) | 329.62 (10) | 363.2 (11) | 299 (11) | 315.25 (12) | 262.5 (22) | 435 (2) | 279.34 (30) | 279.9 (24) | 417 (17) |
| **Ours 3547481 (Airbnb 1791529331262420081) New, 0 reviews** | | | | | **265** | **232.33** | not returned | **255** | not returned | not returned | **225.67** | **216** | **210.4** | **228** | **218** | **229.33** | not returned | **296.67** | **279.6** | **384.5** |

## P20 Waterford Court, 2-bed, max 4 (Airbnb 1791529331262420081, New, 0 reviews)

Column key:
- "Ours" = Airbnb all-in £/night today, with 13 Nov in brackets.
- "Line" = comp median x 0.85.
- "Factor" = (all-in - £150) / sum of the PriceLabs `price` for the same nights. Smoobu is the same on every night except 14 Nov, which is not in `prices.csv`.
- "Mkt pctl" = where the PriceLabs price sits in the market P25/P50/P75 (`neighbourhood_data` 14 Nov).

| Stay | Ours 14 Nov (13 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n) | PriceLabs avg | Market P50 (mkt pctl) | Factor | `recommend` |
|---|---|---|---|---|---|---|---|---|---|
| 14-17 Nov (tonight) | **265.0** (229.33) | 276.67 (5) | P20 / -4.2% | +12.7% | P38 (8) | 252.7 | 213.3 (P66) | **0.851** | raise +10% |
| **15-18 Nov** (closest to the requested 15-19 Nov; 18-19 Nov is blocked) | **232.33** (new stay) | **277.67 (6)** | **P0 / -16.3%** | **-1.6%** | P21 (14) | 238.0 | 212.3 (P61) | 0.766 | raise +10% |
| 15-19 Nov | blocked 18-19 Nov | 273.13 (6) | comps only | | 267.25 (9) | | | | |
| 16-18 Nov | 255.0 (240.5) | 289.5 (4) | P0 / -11.9% | +3.6% | P36 (14) | 235.0 | 212 (P59) | 0.766 | raise +10% |
| 17-19 Nov (default Tue-Thu) | blocked 18-19 Nov | 292 (4) | comps only | | 270 (9) | | | | |
| 20-22 Nov (next Fri-Sun) | below min 3 | 322.5 (3) | comps only | | 322.5 (5) | | | | |
| 20-23 Nov | 225.67 (228.0) | 303.33 (7) | P0 / -25.6% | -12.5% | P0 (10) | 229.3 | 215.7 (P55) | 0.766 | raise +10% |
| **20-24 Nov (requested)** | **216.0** (new stay) | **296.25 (7)** | **P0 / -27.1%** | **-14.2%** | **P0 (10)** | 233.2 | 214.5 (P57) | 0.765 | raise +10% |
| 20-25 Nov | 210.4 (212.2) | 294 (7) | P0 / -28.4% | -15.8% | P0 (11) | 235.8 | 213.8 (P58) | 0.765 | raise +10% |
| 21-24 Nov | 228.0 (new stay) | 278.84 (8) | P12 / -18.2% | -3.8% | P9 (11) | 232.3 | 213.3 (P57) | 0.766 | raise +10% |
| 21-25 Nov | 218.0 (219.0) | 269.88 (8) | P12 / -19.2% | -5.0% | P8 (12) | 235.8 | 212.8 (P58) | 0.766 | raise +10% |
| 22-25 Nov | 229.33 (230.33) | 272.17 (10) | P10 / -15.7% | -0.9% | P14 (22) | 234.3 | 211.7 (P58) | 0.765 | raise +10% |
| **5 Dec (gap night, requested)** | unbookable (min 3) | 431 (1) (1-night 5-6 Dec; was 538) | n=1 | | 435 (2) | 306 (user_price 313) | 227 (P75 is 303) | | |
| **14-17 Dec** (30-day default) | **296.67** (299.0) | **300.84 (10)** | **P50 / -1.4%** | +16.0% | P63 (30) | 274.0 | 217.3 (P70) | 0.900 | raise +10% |
| **14-19 Dec** (all 5 open nights) | **279.6** (282.8) | 310.4 (9) | **P33 / -9.9%** | +6.0% | P50 (24) | 277.2 | 222.2 (P69) | 0.900 | raise +10% |
| **26-30 Dec** | **384.5** (392.25) | 380.25 (9) | **P56 / +1.1%** | +19.0% | P41 (17) | 385.5 | 258 (above P75 349) | 0.900 | raise +5% / +10% |

### 15-19 Nov: guests now see the PriceLabs price (yesterday's Smoobu gap is closed)
- **Guests now pay the PriceLabs level.**
  - 15-18 Nov all-in is £697 = £150 + 0.766 x £714 (244 + 232 + 238).
  - Smoobu is 244 / 232 / 238 (`prices.csv` 14 Nov), so it equals PriceLabs `price`, not `user_price` (222 / 210 / 222).
  - Yesterday Airbnb followed a Smoobu rate about 9% below PriceLabs. That gap is gone, which fits the dispatcher's note that the 12-13 Nov manual Smoobu cuts were overwritten.
- **Comps are flat** (same-comp median change 0% on 16-18 Nov). 1568001017881493647 cut £317 -> £290.50.
- **Position:** P0 of 6 on 15-18 Nov (-16.3% vs median), within 1.6% of the 0-review line. On 16-18 Nov we are 3.6% above the line.
- **Supported: hold.** That is about -12% to -16% vs median, which is what 0 reviews supports. The +10% from `recommend` is not supported.
  - Reyhan's -5% on 15 Nov is worth about +1.7% on the stay. Removing it is Corentin's call, not a proposal.
- **14-17 Nov (tonight) prices at 0.851, not 0.766.** All-in rose £688 -> £795.
  - Applying 0.766 to 15-16 Nov implies about **£280 room for 14 Nov**, which is roughly the undiscounted PriceLabs 282.
  - Why the same-day night carries no channel discount: **NOT CHECKED** (Smoobu's 14 Nov rate is not in `prices.csv`).
  - The night lapses tonight: P20 of 5 comps, -4% vs median.

### 20-24 Nov: P0 everywhere, and comps rose about 6%
- **We are flat.** PriceLabs is the same as yesterday on every night (no edits). Airbnb shows:
  - 20-24 Nov: £864 (£216.00/night)
  - 20-25 Nov: £1,052 (£210.40/night)
  - 21-25 Nov: £872 (£218.00/night)
- **Comps went up.** The same-comp median rose **+6.3% / +6.4%** on 20-23 and 20-25 Nov:
  - 27538942: £378.60 -> £420
  - 51380799: £327.80 -> £363.20
  - 790672189611831800: £254.40 -> £279.80
  - 6488364: £276.20 -> £294
- **The low point is 20-21 Nov.** 22-25 Nov sits on the line (-0.9%), while stays that start 20 Nov are 12-16% under it.
- **What the evidence supports, on 20-21 Nov only:** -5% -> 0% plus +10% (about +15.8% on those two nights).
  - 20-23 Nov would be about £244.90/night: -19% vs median, still about 5% under the line.
  - 22-24 Nov: **hold** (on the line).
  - +10% on the whole of 20-24 Nov is not supported for 0 reviews.
- **This depends on t-p20-delivery, which is still open for Corentin.**
  - Policy (24 Oct) says the Smoobu block for delivery is 20-22 Nov.
  - PriceLabs blocks 18-19 Nov instead.
  - 20-21 Nov carry Reyhan's -5% min 3 and are on sale on Airbnb today.
  - If 20-22 Nov really is the delivery block, nothing should be proposed for those nights.
- Booking.com availability for 20-24 Nov: NOT CHECKED (bot check).

### 5 Dec orphan (t-p20-5dec-orphan): still NOT fixed, 5th day
- Live `get_listing_prices`: price 306, user_price 313, min 3, `unbookable` 1.
- The override for 5 Dec is "0%, min 3", last updated 9 Nov 21:25:55Z.
- Comps for that night:
  - The only 1-night kept comp (1684834789445533643) cut again, £538 -> £431.
  - The wider 1-night sample is n=2, median 435.
  - Market P50/P75 is 227/303.
- **Supported: min 1 at the current £306.** That is at market P75 and 29% under the only 1-night comp. On Airbnb it is about £275 room at the 0.90 December factor.

### December
- **14-17 Dec: hold.** P50 of 10, -1.4% vs median, +16% vs line.
  - Comps are flat (same-comp median 0%). 1684834789445533643 cut £425.67 -> £341.
  - Market occupancy for these nights is about 20%.
  - No raise: 0 reviews, and we are already at the median. No trim: we lead the market by 21 pts (30 d).
- **14-19 Dec: hold.** P33 of 9, -9.9%, +6% vs line.
- **26-30 Dec: hold.** P56 of 9, +1.1% vs median, +19% vs line.
  - PriceLabs is above market P75, and comps edged down 1.2% (1684834789445533643 £595.50 -> £417).
  - Min stays are 4-6 nights. Neither a raise nor a trim is supported without pace data.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

**What changed since 13 Nov:**
- No PriceLabs edits (logs and overrides unchanged). Both twins re-priced 14 Nov 07:20Z; the January values moved by £1 or less.
- No Smoobu bookings or cancellations. **10-26 Dec (17 nights) is still fully open.**

**Rating and reviews vs comp median** (4.76, 13 reviews):
- 3090701, 4.7 (10): `quality_premium` **-0.024**.
- 3064856, 4.31 (13): `quality_premium` **-0.15** (the cap).
- The flat sells at whichever twin is cheaper.

| Stay | Ours 3090701 / 3064856 (13 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n) | PL avg vs mkt P50 | Factor | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 17 Nov (1 n, +35% min 1) | 326 / 336 (316 / 325) | 214 (4) | P75 / +52% ; P75 / +57% | (1 night; cleaning inflates ours) | P62 (8) | 229 / 242 vs 206 | 0.77 | raise +5% |
| 17-19 Nov (default Tue-Thu) | booked from 18 Nov | 277.5 (4) | comps only | | 242.5 (19) | | | |
| 20-22 Nov (next Fri-Sun) | booked | 258.75 (2) | comps only | | 315.5 (13) | | | |
| 27 Nov (1 n, +50% min 1) | 372 / 383 (359 / 370) | none returned | | | P100 (3; median 343) | 289 / 304 vs 238 | 0.77 | mkt: raise |
| 10-12 Dec | below min 3 on both | 254.25 (2) | comps only | | 315 (13) | | | |
| **10-13 Dec (requested)** | **207.67 / 247.0** (215.67 / 267.33) | **263.83 (2)** | **P0 / -21.3% ; P50 / -6.4%** | **-19.4% / +10.1%** | **P5 / P14 (21)** | 206 / 257.3 vs 239.7 (-14% / +7%) | **0.765** | raise +10% |
| 14-17 Dec (30-day default) | 236.33 / 226.33 (236.67 / 226) | 214 (7) | P57 / +10.4% ; P57 / +5.8% | +13.1% / +24.4% | P42 / P26 (38) | 207 / 195.7 vs 223.7 | 0.90 | raise +10% |
| **20-25 Dec (5 n)** | **212.4 / 202.4** (213.2 / 202.8); "Long stay discount" -£101.25 / -£95.67 (10%) | 204.7 (2) | P100 / +3.8% ; P50 / -1.1% | +6.3% / +16.3% | **P19 / P12 (16; median 292.2)** | 225 / 212.6 vs 256.6 (-12% / -17%) | 0.81 | raise +10% |
| **23-26 Dec (Christmas)** | **254.0 / 242.67** (255 / 243.33); 3064856 strike £802 -> £728 | 233.83 (2) | P100 / +8.6% ; P50 / +3.8% | +11.3% / +22.1% | **P18 / P14 (22; median 307.67)** | 226.3 / 214 vs 270 (-16% / -21%) | 0.90 | raise +10% |
| 24-27 Dec | 251.67 / 240.67 (253 / 241.67); strikes £827 -> £755, £811 -> £722 | 240 (2) | P100 / +4.9% ; P50 / +0.3% | +7.5% / +18.0% | **P24 / P18 (17; median 322.33)** | 224 / 211.7 vs 277.3 (-19% / -24%) | 0.90 | raise +10% |
| **5-8 Jan (twins, midweek)** | **206.0 / 197.33** (206 / 197.33) | **206.17 (8)** | **P50 / -0.1% ; P25 / -4.3%** | +2.4% / +12.6% | P27 / P21 (48) | 173 / 163.7 vs 204.7 (-15% / -20%) | 0.90 | raise +10% |
| **14-17 Jan (twins, identical PL)** | **221.67 / 221.67** (new stay); both show "Early booking discount -£57.20", total £664.80 each | **230 (7)** | **P29 / -3.6%** (both) | -1.3% / +13.4% | P33 (52) | 192.3 / 192.3 vs 209 (-8%) | 0.893 | raise +10% |

**Comp moves:**
- Christmas: the kept comps (n=2) cut again, by 0.9-1.7%.
- 10-13 Dec: flat (+0.5%).
- 1411449348357673454 cut 17 Nov from £261 to £243.

### 10-13 Dec (requested): now at 0.765 x PriceLabs on both twins
- **Both twins fell overnight on Airbnb**, with no PriceLabs or Smoobu change on these nights:
  - 3064856: £267.33 -> **£247.00** (-7.6%)
  - 3090701: £215.67 -> **£207.67** (-3.7%)
- **The factor follows lead time.** Both twins now sell 10-13 Dec at **0.765**, the same factor as every November stay. Yesterday it was 0.812-0.86, and 14-17 Dec (30 days out) is still 0.90.
  - 10 Dec is 26 days out today. This is consistent with an Airbnb last-minute rule of about -15% inside about 28 days, on top of the 0.90 seen on December stays further out.
  - Policy `changed_21oct` records the Shepherd's Bush last-minute rule as -10% within 14 days. The live Smoobu Airbnb rule was **NOT CHECKED** (for the channel agent).
- **Position:** the cheaper twin is P0 of the 2 kept comps, -21.3% vs median and -19.4% vs its line. It is P5 of the wider 21 (median 310.67), and PriceLabs is 14% under market P50. Market occupancy for these nights is about 43%.
- **What the evidence supports: about +5% to +10% on 10-12 Dec** (`recommend` +10%).
  - -5% -> 0% (+5.3%) puts 3090701 at about £216 (-18% vs median). +10% puts it at about £223.40, still about 13% under its line.
  - 3064856 is already +10% over its line, so raise it no more than 3090701.
  - **This conflicts with Reyhan's 11 Nov -5%, so it is for Corentin to confirm (a-peak-check), not a new proposal.**

### Christmas (-5%, a-peak-check): unchanged since 11 Nov
- **Kept comps are n=2 and still cutting.** On them the cheaper twin is P50, -1% to +4% vs median, and +16% to +22% over its line.
- **The wider sample has us at P12-P24** (medians £292-£322), and PriceLabs is 12-24% under market P50. Market occupancy for 20-27 Dec is about 45% vs 21-33% at the same time last year.
- **What the evidence supports: 18-26 Dec back to 0% (+5.3%); the full +10% is not.**
  - With 0%, 3090701 23-26 Dec is about £264.80 (+13% vs the n=2 median, still bottom quintile of the wider 22).
  - 3064856 would be about £252.90.
  - The -0.15 quality cap on 3064856 limits the move.
- **Hold 13-17 Dec at -5%.** 14-17 Dec is P57 of 7, +13% / +24% vs the lines.
- The 20-25 Dec "Long stay discount" is exactly 10% of room on both twins. Which Smoobu/Airbnb rule sets it: NOT CHECKED.

### Twins in January (t-p13-twins)
- **5-8 Jan: hold.**
  - Airbnb £206.00 vs £197.33 (+4.4%). Live PriceLabs has 3090701 5-6% above 3064856 on 3-12 Jan.
  - Position: P50 / P25 of 8, on or above both lines. Market occupancy is 17%.
- **14-17 Jan: the twins are identical on Airbnb.** Both show £722 struck through to £664.80 (£221.67/night), with the same "Early booking discount -£57.20".
  - Live `user_price` is identical on both twins from 13 Jan (187 / 186 / 192 / 194 / 186 / 188 / 187 / 186).
  - That is the duplicate-listing risk in policy `listing_facts.P13.twin_listings`.
  - Position: P29 of 7, -3.6% vs median, -1.3% vs the 3090701 line.
  - **Supported:** keep the level and restore a gap of about +4% on the child 3090701 from 13 Jan. That puts 3090701 14-17 Jan at about £228.50 (-0.6% vs median, on its line).
  - Twin order is deprioritised in policy, so it is not raised.

### Other P13 nights
- **17 Nov (1 night, +35%): hold.** P75 of 4, P62 of the wider 8. The 1-night all-in overstates ours by the cleaning fee.
- **27 Nov (+50% min 1): numbers only** (a-p13-orphan-price).
  - The twins rose £359 / £370 -> £372 / £383.
  - No kept comp was returned; we are P100 of the wider 3.

## P10 Hanger Lane, 1-bed (3318177)
- No sellable nights. The confirmed Airbnb stay 18 Oct-19 Nov (`reservations.csv` 14 Nov) covers every night up to the handback (policy last night 18 Nov).
- No PriceLabs edits. No comps or positioning.

## P02 Ladbroke Grove, P03 Bayswater
Blocked on purpose (policy `intentional_blocks`). Last refresh in `listings.csv`: 2999946 14 Nov 00:24Z; the Bayswater channex listing 14 Nov 03:19Z. No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or Smoobu (`kpi_summary.md` 14 Nov: "No priced PriceLabs listing mapped", collect-data). Own price, percentile, rating gap and premium: **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED.** An AWS WAF bot check was met on the first request and not bypassed. This covers comps, our displayed prices, and P20 20-24 Nov availability, so the analysis is Airbnb only. Comp cancellation policies: NOT CHECKED.
2. **P20 14-17 Nov sells at 0.851 x PriceLabs** (about £280 room for 14 Nov, undiscounted), against 0.766 on every other November stay. Cause NOT CHECKED: the Smoobu 14 Nov rate is not in `prices.csv`.
3. **The P13 Airbnb factor drops from 0.90 to 0.765 inside about 28 days** (10-13 Dec today, all November stays). This does not match the policy record (last-minute -10% within 14 days, 21 Oct). The live Smoobu Airbnb rules were not pulled. The 20-25 Dec 10% "Long stay discount" and the 3064856 strikethroughs on 23-27 Dec: rule source NOT CHECKED.
4. **Thin comp coverage** (labelled; wider-sample or market percentiles used instead):
   - P13: n=0-2 on 20-22 Nov, 27 Nov, 10-12 / 10-13 Dec and all of Christmas.
   - P20: n=1-3 on 20-22 Nov and 5-6 Dec.
5. **The comps' cleaning split is unknown**, so all-in gaps on 1-night stays (17 Nov, 27 Nov, 5 Dec) overstate ours.
6. P13 December prices come from raw (13 Nov 07:39Z), but the twins re-priced again at 14 Nov 07:20Z. January moved by £1 or less; December after that re-price was not pulled. The P13 Airbnb-to-Smoobu id mapping is "likely / probable" (policy `airbnb_listings_24oct`).
7. P16, P18 and P19 have no data; P10 has no sellable nights.
