# Competitor positioning: WEST + HERTS (D = 2026-11-16)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** I read `data/policy.json` first. The PriceLabs calls were all read-only:
1. `get_user_logs` (listing, 15-16 Nov) for 3547481, 3064856, 3090701 and 3318177. It returned 3 entries, all Reyhan, 15 Nov:
   - **19:12:34Z, 3064856, 10-26 Dec:** the override was re-saved with **no price, min stay 3 only**. `get_listing_date_overrides` confirms there is no `price` on 10-26 Dec, updated 2026-11-15T19:12:34Z. **The -5% Christmas override is gone.**
   - **19:12:34Z, 3090701:** the same override was copied from the parent listing.
   - **19:16:17Z, 3547481, 15-17 Nov:** -2%, min stay 2.
2. `get_listing_date_overrides` for 3064856 and 3547481, 16 Nov to 31 Jan / 10 Jan.
3. `get_neighbourhood_data` (detail, future prices and occupancy) for 3547481 and 3064856. **Both came back OK today.**
   - Market P25/P50/P75 and market occupancy per night below are from this pull, labelled "mkt 16 Nov".
   - The P20 compset is Nearby Listings for **1-3 BR** (`br_range_selected` [1,2,3]). The P13 compset is 2-3 BR.
4. Live `get_listing_prices`: 3090701 for 3-18 Jan and 3064856 for 14-18 Jan. The raw files stop at 15 Jan. Last refreshed 15 Nov 19:13Z, the same as raw.
   - All other own prices come from `raw/prices_*.json` (16 Nov) and `prices.csv` (16 Nov). Smoobu equals the PriceLabs `price` on every open night checked.
   - **Process slip:** calls 1 and 3a went out together, not one at a time as the run rules require. Both succeeded. Every later call was sequential.

**OTAs:**
- **Airbnb:** public search pages, checked 2026-11-16 with plain `curl` and default headers. No bot check was met, no HTTP errors.
- **Booking.com: NOT CHECKED.** A WAF challenge was met on 14 Nov; I did not retry or bypass it.

**Method** (unchanged since 3 Nov):
- 4 guests, entire home, at least 2 bedrooms. Map box of about 1.3 km half-side around the PriceLabs coordinates, plus a 0.2 km box around each kept comp.
- Price = Airbnb all-in total / nights. Cleaning and Airbnb fees **included**; taxes not shown separately.
- Ours are priced on the same basis. A **sold** stay = (Smoobu `basePrice` room + £150 cleaning) / nights (`reservations.csv` 16 Nov).
- **Line** = comp median x (1 + `quality_premium`).
  - 3090701: `quality_premium(4.7, 4.76)` = -0.024.
  - 3064856: `quality_premium(4.31, 4.76)` = **-0.15** (cap).
  - P20 has 0 reviews and the function returns 0.0. I use comp median x 0.85; that -15% new-listing allowance is my judgement, not the function's output.
- Comp cancellation policies: NOT CHECKED.

**Comp sets:** the same ids as 15 Nov. None replaced.
- P13: all 11 active (each returned on at least one of 14 stays).
- P20: all 12 active. **789954794593691037 was again absent from all 12 standard stays (3rd day).** The 0.2 km probe returned it at 4.89 (18): 1-4 Dec £900, 7-10 Dec £1,180, 23-27 Dec £1,554, 8-11 Jan £1,180. So it is bookable and stays in the set. Its probe rows are in `comps.csv`.

**Ratings** (Airbnb search labels today):
- Ours: 3090701 4.7 (10), 3064856 4.31 (13), P20 "New" with 0 reviews. Unchanged.
- Comp median: P13 **4.76** (13 reviews), P20 **4.8** (17.5 reviews).
- Comp moves: 1761224847419174970 went 4.83 (12) -> 4.85 (13); 1411449348357673454 went 4.75 (51) -> 4.73 (52).
- Review gap vs comp median: 3090701 **-3**, 3064856 **0**, P20 **-17.5**.

**Occupancy** (Smoobu `reservations.csv` 16 Nov, cancelled excluded; market from `pl_kpis.csv` 16 Nov):

| Listing | 30 d (16 Nov-15 Dec) | 60 d (16 Nov-14 Jan) | Market 30 / 60 | Lead |
|---|---|---|---|---|
| P13 (one flat) | 24/30 = **80.0%** | 31/60 = **51.7%** | 47% / 37% | **+33 / +15 pts** |
| P20 | 18/30 = **60.0%** | 32/60 = **53.3%** | 39% / 30% | **+21 / +23 pts** |

`recommend` therefore returns "raise" (+5% / +10%) on every priced stay. The quality line decides how much of that the evidence supports.

**Rows written** (under `flock`):
- **302 rows** appended to `data/snapshots/2026-11-16/comps.csv` under `.comps.csv.lock`. That is P13 11 comps x 14 stays, P20 12 comps x 12 stays, and 4 probe rows. Another agent had already copied the file forward (26,560 lines before).
- **27 rows** appended to `channel_checks.csv` (our Airbnb listings) under `.channel_checks.csv.lock`.
- To find them, filter `source` on "checked 2026-11-16" and "comp-west".

**Recompute check** (`snapshot.load('2026-11-16')` + `comp_summary`; matches the tables):

| Listing | Stay | n | Median | Position |
|---|---|---|---|---|
| P20 NYE sold | 27 Dec-3 Jan | 7 | 339.71 | P14 / -17.8% |
| P13 sold | 10-13 Dec | 2 | 284.83 | P0 / -27.6% |
| P13 (3064856) | 18-23 Dec | 2 | 208.1 | P50 / -0.0% |
| P20 | 20-24 Nov | 5 | 288.25 | P0 / -14.0% |
| P13 (3090701) | 5-8 Jan | 8 | 211.33 | P38 / -2.5% |

## Comp tables (Airbnb all-in £/night, 4 guests, checked 2026-11-16)
- A figure in brackets is the same comp's price for the same stay on 15 Nov, shown where it moved by £1 or more.
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- For ours, "not returned" means booked, blocked or below the minimum stay:
  - P13: 18-26 Nov, 10-13 Dec and 27 Dec-3 Jan are booked.
  - P20: 18-19 Nov is blocked; 20-22 Nov is below min 3; 5 Dec is min 3; 26 Dec is min 4; 27 Dec-3 Jan is booked.

#### P13

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17-18 Nov | 17-19 Nov | 20-22 Nov | 27-28 Nov | 1-2 Dec | 10-13 Dec | 13-16 Dec | 14-17 Dec | 16-19 Dec | 18-23 Dec | 23-27 Dec | 27 Dec-3 Jan | 5-8 Jan | 14-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.85 (13) | Garden view/balcony |  |  |  |  |  |  | 255 | 256.67 (265) |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.82 (11) | Paid parking on premises/Guest favourite |  |  |  |  |  |  | 235.67 | 235.67 (237.33) | 259 |  |  |  | 235.67 | 235.67 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking on premises |  |  |  |  |  |  |  |  | 235 |  |  |  | 218.67 (203.67) |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  |  |  |  | 234.67 (229.33) | 218.67 | 204.2 | 212.25 | 253.57 | 214 | 225.33 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.73 (52) | Superhost | 243 | 196.5 | 285.5 (298.5) |  |  | 307.33 (292.33) |  |  |  |  | 347.25 (346) | 409.86 | 201 (199.67) | 210.67 |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed | 185 |  |  |  |  |  |  | 149.67 (147.33) |  |  |  |  | 135.67 | 154.67 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  |  | 219 (212) |  |  | 262.33 (234) | 219.33 | 212.33 (208.67) | 226.33 | 212 | 227.25 (230.25) | 245.57 | 208.67 | 231 (232) |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift |  | 411 |  |  |  |  |  |  | 425 |  |  |  | 419.33 | 456.67 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking on premises |  | 196.5 |  |  |  |  | 238.33 | 254 |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | Lift/Paid parking on premises/balcony/Guest favourite | 359 | 314.5 (336.5) |  |  |  |  |  |  | 316.67 |  |  |  |  | 316.67 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking on premises | 179 (185) |  |  |  |  |  |  | 151.67 |  |  |  |  | 141.67 | 156.67 (154.67) |
| **Comp median (n)** | | | 4.76 (13) | | **214** (4) | **255.5** (4) | **252.25** (2) | - | - | **284.83** (2) | **237** (4) | **234.67** (7) | **247** (6) | **208.1** (2) | **227.25** (3) | **253.57** (3) | **211.33** (8) | **228.17** (8) |
| Wider 2-bed sample median (n) | | | | | 245 (8) | 232.25 (16) | 300.5 (12) | 329 (3) | 433 (3) | 309 (20) | 238.67 (31) | 238.83 (36) | 259 (24) | 294.4 (19) | 314.75 (21) | 366.36 (10) | 233.67 (45) | 241 (53) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.7 (10)** | | | | | **309** | not returned | not returned | **348** | **363** | not returned | **245** | **248** | **255.33** | **218.8** (strike £1,199 -> £1,094) | **248.75** | not returned | **206** | **222.67** |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | | | | **337** | not returned | not returned | **383** | **363** | not returned | **245** | **244.33** | **243.67** | **208** (strike £1,139 -> £1,040) | **237** | not returned | **197** | **219.67** |

#### P20

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17-19 Nov | 20-22 Nov | 20-23 Nov | 20-24 Nov | 21-24 Nov | 22-24 Nov | 5-6 Dec | 14-17 Dec | 14-19 Dec | 16-19 Dec | 26-30 Dec | 27 Dec-3 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost |  |  | 281 | 280.75 | 283.33 |  |  | 281 | 277.8 | 281 | 286.5 | 270.57 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises | 290.5 |  |  |  |  |  |  |  |  |  | 375.5 (372.75) | 356.71 |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises |  |  |  |  |  |  |  |  |  |  |  |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (57) | Lift |  |  |  |  |  |  |  | 319.33 (323) | 322 (325) | 355.33 | 443.25 (457.25) | 457.14 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony |  |  | 424 | 421.5 | 424 |  |  | 382.67 | 378.6 | 382.67 | 380.25 | 339.71 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony |  |  |  |  |  | 285 |  | 341 | 348 | 352.67 | 417 |  |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises | 306 | 330.5 | 302.33 | 288.25 | 294 | 306 (281.5) |  | 261.67 | 249.8 | 268.67 |  |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony |  |  | 368.67 | 365.25 | 368.67 |  |  | 333.33 | 327.8 | 333.33 | 329.75 | 293.43 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/Paid parking on premises/balcony (replaces 1384811870668527117, inactive next 60 days) |  |  |  |  |  |  |  | 306 (298.67) | 313 (309.4) | 322.33 | 423.75 (435.75) | 400.71 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost |  |  |  |  | 203.67 (208.67) | 211 |  | 214.33 (208) |  |  |  |  |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises | 288.5 |  |  |  |  | 288.5 (264) |  | 250 |  |  |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 270 | 310 | 290 | 270 | 276.67 | 290 |  | 306 | 291.8 | 309 | 360 | 339.29 |
| **Comp median (n)** | | | 4.8 (18) | | **289.5** (4) | **320.25** (2) | **302.33** (5) | **288.25** (5) | **288.66** (6) | **288.5** (5) | - | **306** (10) | **317.5** (8) | **327.83** (8) | **377.88** (8) | **339.71** (7) |
| Wider 2-bed sample median (n) | | | | | 288.5 (5) | 320.25 (4) | 330 (8) | 359.88 (8) | 300 (9) | 288.5 (13) | 445 (1) | 279.67 (31) | 291.8 (23) | 322.33 (21) | 419.62 (16) | 386.14 (18) |
| **Ours 3547481 (Airbnb 1791529331262420081) New, 0 reviews** | | | | | not returned | not returned | **268.33** | **248** | **255** | **267** | not returned | **302.67** | **288.4** | **309.33** | not returned | not returned |

## P20 Waterford Court, 2-bed, max 4 (Airbnb 1791529331262420081, New, 0 reviews)

Column key:
- "Line" = comp median x 0.85.
- "Factor" = (all-in - £150) / sum of the Smoobu rate for the same nights (`prices.csv` 16 Nov). Smoobu equals the PriceLabs `price` here.
- "PL / mkt" = PriceLabs `price` average vs market P50 (16 Nov pull, 1-3 BR compset), with the market percentile in brackets.

| Stay | Ours 16 Nov (15 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n, median) | PL / mkt 16 Nov | Factor | `recommend` |
|---|---|---|---|---|---|---|---|---|
| **NYE 27 Dec-3 Jan SOLD (Airbnb, booked 15 Nov, 42 d out)** | **£279.11** all-in (room **£257.68** + £150 / 7) | **339.71 (7)** | **P14 / -17.8%** | **-3.3%** | **P6 (18, 386.14)** | at booking Smoobu £410.43/n (2,873/7); mkt P50 254.3, P75 342.7 (room 257.68 ~ P50) | **0.628 x Smoobu** | sold |
| 17-19 Nov (default Tue-Thu) | blocked 18-19 Nov | 289.5 (4) | comps only | | 288.5 (5) | mkt P50 212 | | |
| 20-22 Nov (next Fri-Sun) | below min 3 | 320.25 (2) | comps only | | 320.25 (4) | mkt P50 218.5 | | |
| 20-23 Nov | **268.33** (230.33) | 302.33 (5) | P0 / -11.2% | **+4.4%** | P0 (8) | 285.3 / 216.7 (above P75 285.0) | 0.765 | raise +10% |
| **20-24 Nov (requested)** | **248.0** (213.75) | **288.25 (5)** | **P0 / -14.0%** | **+1.2%** | P0 (8, 359.88) | 275.0 / 215.8 (P72) | 0.765 | raise +10% |
| 21-24 Nov | 255.0 (219.33) | 288.66 (6) | P17 / -11.7% | +3.9% | P11 (9) | 267.7 / 214.3 (P70) | 0.766 | raise +10% |
| 22-24 Nov | 267.0 (239.5) | 288.5 (5) | P20 / -7.5% | +8.9% | P38 (13) | 250.5 / 213.0 (P64) | 0.766 | raise +10% |
| **5 Dec (orphan, requested)** | unbookable (min 3) | none returned | n=0 | | 445 (1) | 286 (user_price 279) / 228, P75 297 | | |
| 14-17 Dec | 302.67 (306.67) | 306.0 (10) | P40 / -1.1% | +16.4% | P61 (31, 279.67) | 296.0 / 219.0 (above P75) | 0.854 | raise +10% |
| 14-19 Dec (all 5 open nights) | 288.4 (290.8) | 317.5 (8) | P25 / -9.2% | +6.9% | P48 (23) | 296.2 / 223.0 (above P75) | 0.872 | raise +10% |
| **16-19 Dec (30-day default)** | **309.33** (new stay) | **327.83 (8)** | **P38 / -5.6%** | +11.0% | P43 (21, 322.33) | 288.0 / 227.0 (P73) | 0.900 | raise +10% |
| 26 Dec (new orphan) | min 4, unsellable | 26-30 Dec comps 377.88 (8) | | | 419.62 (16) | 300 / 256, P75 334 | | |

### NYE 27 Dec-3 Jan sold at £257.68/night room: about where a 0-review flat should sell, but via an unexplained channel cut
- **The booking:** Smoobu has Airbnb, 7 nights, room £1,803.78 (**£257.68/night**), cleaning £150, commission £302.84, booked 15 Nov.
- **Against comps** (all-in £279.11/night):
  - **P14 of the 7 kept comps still open**, -17.8% vs the median of £339.71. Only 944872208662374170 (4.91, Superhost, marina view) is cheaper, at £270.57.
  - **P6 of the wider 18** (median £386.14).
  - **3.3% under the 0-review line** (£288.75), so about £9.64/night or £67.48 over the stay.
  - Caveat: only unsold comps can be priced, which biases the comp median up.
- **Against the market:** room £257.68 is about market P50 (254.3 average over 27 Dec-2 Jan; P75 342.7). Market occupancy for the week is 38-44% (mkt 16 Nov).
- **How it was priced:**
  - Smoobu on 15 Nov was 359 + 433 + 440 + 440 + 440 + 396 + 365 = **£2,873** (`prices.csv` 15 Nov). PriceLabs sat above market P75 on 27-31 Dec.
  - The guest paid **0.628 x Smoobu**. The factors already known for Airbnb would give 0.900 (the 29-59 day factor measured on every December check, e.g. 26-30 Dec on 15 Nov) x 0.85 (weekly 15%, policy) = **0.765**, which is about £2,197.85 room.
  - **The extra ~17.9% (about £394) is not explained** by policy (`listing_facts.P20.airbnb_discounts_22oct`; the new-listing promotion has ended). This is for the channel agent to check against the Airbnb payout breakdown. NOT CHECKED here.
  - At 0.765 the stay would have been £335.41/night all-in: P29 of 7, -1.3% vs median, 16% above the 0-review line.
- **What the evidence supports:** about -15% vs comp median for NYE week while P20 has 0 reviews. The PriceLabs level was right; the sale landed close to the line. The gap to recover is the unexplained Airbnb factor, not the PriceLabs price.
- PriceLabs re-priced 27 Dec-2 Jan down after the booking (16 Nov: 352/411/426/433/433/358/361). That does not affect the booked stay.

### 20-24 Nov: PriceLabs already delivered yesterday's supported rise; now hold
- PriceLabs re-priced 20 Nov 258 -> **297** and 21 Nov 234 -> **302** in the 15 Nov 19:20Z refresh. Reyhan's -5% on 20-21 Nov (11 Nov) is still in the overrides.
- Airbnb 20-24 Nov is now £992 (£248/night, +16.0% vs 15 Nov) and 20-23 Nov £805 (+16.5%). Comps are flat (same-comp change 0%).
- **Position:** P0-P20 of 5-6 kept comps, -7.5% to -14.0% vs median, and now **+1.2% to +8.9% over the 0-review line** on every 20-24 Nov combination.
- **Supported: hold.** That is roughly -12% vs comp median for a 0-review listing. The +10% from `recommend` is not supported without reviews. Removing the -5% on 20-21 Nov would add about 5% and push stays starting 20 Nov to about 6-10% over the line; I do not support it today.
- **t-p20-delivery is still open (Corentin).**
  - Policy `listing_facts.P20.block_20_21_nov` says the delivery block is 20-22 Nov.
  - PriceLabs still blocks 18-19 Nov instead, and 20-24 Nov is on sale.
  - 20 Nov is 4 days away.
- **17 Nov** is a 1-night open night before the 18-19 Nov block. Reyhan set -2% min 2 on 15-17 Nov at 19:16Z, so 17 Nov cannot sell (price 261, user_price 222). Numbers only.

### 5 Dec orphan (t-p20-5dec-orphan): still NOT fixed, day 7
- Raw 16 Nov: price 286, user_price 279, min 3, `unbookable` 1. The override is "0%, min 3", unchanged since 9 Nov 21:25:55Z.
- No kept comp was returned for the 1-night stay 5-6 Dec. 1684834789445533643 (£431 on 15 Nov) is gone, likely booked. The wider sample is n=1 at £445. Market P50/P75 for 5 Dec is 228/297.
- **Supported: min 1 at the current ~£286.** That is between market P50 and P75, and about 36% under the only 1-night comp.

### 26 Dec: new orphan created by the NYE booking
- 26 Dec sits between the 19-26 Dec and 27 Dec-3 Jan Airbnb stays.
- PriceLabs: price 300, min 4, plus Reyhan's -5% override (4 Nov) with no min-stay override. **It cannot sell as set.**
- Market 26 Dec: P50 256, P75 334, occupancy 33.8%. The kept 26-30 Dec comps (n=8) are a median of £377.88.
- **Supported: min 1 at about £300** (between market P50 and P75). The -5% is Reyhan's; whether to keep it is for Corentin, not a new proposal.

### December 14-19: hold
- **14-17 Dec:** P40 of 10, -1.1%, +16.4% vs line.
- **14-19 Dec:** P25 of 8, -9.2%, +6.9% vs line.
- **16-19 Dec (30-day default):** P38 of 8, -5.6%, +11.0% vs line.
- All are above the 0-review line, PriceLabs is at or above market P75, and market occupancy is 21-24%. **Hold.** No raise with 0 reviews; no trim given a +21-23 pt lead.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

| Stay | Ours 3090701 / 3064856 (15 Nov) | Comp median (n) | Comp pctl / vs median | vs line (3090701 / 3064856) | Wider pctl (n, median) | PL avg vs mkt P50 (16 Nov) | Factor | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 17 Nov (1 n, +35% min 1) | 309 / 337 (309 / 337) | 214 (4) | P75 / +44% ; P75 / +58% | 1 night: cleaning inflates ours | P62 (8, 245) | 207 / 244 vs 204 | 0.77 | raise +5% |
| 17-19 Nov (default Tue-Thu) | booked | 255.5 (4) | comps only | | 232.25 (16) | | | |
| 20-22 Nov (next Fri-Sun) | booked | 252.25 (2) | comps only | | 300.5 (12) | | | |
| 27 Nov (1 n, +50% min 1) | 348 / 383 (348 / 383) | none returned | | | P100 (3, 329) | 258 / 304 vs 238 | 0.77 | numbers only |
| 1 Dec (1 n, +50% min 1, intentional) | **363 / 363** (321 / 364) | none returned | | | P33 (3, 433) | 278 / 278 vs 223 | 0.77 | numbers only |
| **10-13 Dec SOLD (Airbnb, 3090701, booked 15 Nov)** | **£206.31** all-in (room **£156.31** + £150 / 3) | **284.83 (2)**; 263.17 on 15 Nov | **P0 / -27.6%** (-21.6% vs 15 Nov median) | **-19.7%** vs the 15 Nov line (£256.85) | **P5 (20, 309)** | room 156.31 vs mkt P50 237.3 (-34%, under P25 200.0) | **0.765 x Smoobu at booking** | sold |
| 13-16 Dec (new 3-night gap) | **245.0 / 245.0** (identical) | 237.0 (4) | P75 / +3.4% | +5.9% / +21.6% | P55 (31, 238.67) | 240.7 vs 217.7 (+11%) | 0.810 | raise +5% |
| 14-17 Dec | 248.0 / 244.33 (224.0 / 248.0) | 234.67 (7) | P71 / +5.7% ; P71 / +4.1% | +8.3% / +22.5% | P56 / P53 (36) | 231.7 / 227.7 vs 220.7 | 0.855 | raise +10% |
| **16-19 Dec (30-day default)** | **255.33 / 243.67** | **247.0 (6)** | **P50 / +3.4% ; P50 / -1.3%** | +5.9% / +16.1% | P42 / P33 (24, 259) | 228.0 / 215.0 vs 234.7 | 0.901 | raise +10% |
| **18-23 Dec (reopened)** | **218.8 / 208.0** (Long stay discount -£104.85 / -£98.82) | **208.1 (2)** | **P100 / +5.1% ; P50 / -0.0%** | +7.7% / +17.6% | **P16 / P11 (19, 294.4)** | 233.0 / 219.6 vs 245.8 (-5% / -11%) | 0.81 | raise +10% |
| 23-27 Dec | 248.75 / 237.0 (249.0 / 238.25) | 227.25 (3) | P67 / +9.5% ; P67 / +4.3% | +12.2% / +22.7% | P14 (21, 314.75) | 234.5 / 221.5 vs 275.8 (-15% / -20%) | 0.901 | raise +10% |
| 27 Dec-3 Jan SOLD 26 Oct (context) | £273.71 all-in (room £252.29) | 253.57 (3) | P67 / +7.9% | | P20 (10, 366.36) | | | sold |
| **5-8 Jan (twins)** | **206.0 / 197.0** (214.33 / 206.0) | **211.33 (8)** | **P38 / -2.5% ; P25 / -6.8%** | **-0.1% / +9.7%** | P24 / P22 (45) | 173.3 / 163.3 vs 206.0 (-16% / -21%) | 0.900 | raise +10% |
| **14-17 Jan (twins)** | **222.67 / 219.67** (219.67 / 217.0); "Early booking discount" -£38.80 each | **228.17 (8)** | **P38 / -2.4% ; P38 / -3.7%** | **-0.0% / +13.3%** | P28 / P26 (53) | 185.3 / 182.3 vs 210.0 | 0.93 | raise +10% |

**Comp moves:**
- 10-13 Dec comps rose **+8.6%** (same-comp): 1014671215040555613 went £234 -> £262.33 and 1411449348357673454 £292.33 -> £307.33.
- Christmas and January were flat: 23-27 Dec 0%, 5-8 Jan 0%, 14-17 Jan 0%. Only 1436773605049626293 moved, £203.67 -> £218.67 on 5-8 Jan.

### 10-13 Dec sold on Airbnb at £156.31/night room: under-priced, as flagged yesterday
- **Which twin:** PriceLabs registers it on **3090701** ("Booked (Check-In)" 10 Dec; 3064856 shows Blocked). Raw 16 Nov `booked_price` on 3090701 is **194 / 209 / 210 = £613**, the same as the 15 Nov raw price and Smoobu.
- **Paid vs Smoobu:** £468.94 = **0.765 x £613** exactly. This is the same factor measured on every Airbnb check inside about 28 days since 14 Nov (10 Dec was 25 days out). So the stay was sold on the pre-edit price (Reyhan's 19:12Z edit raised 3090701 10-12 Dec to 255/275/277).
  - The 0.765 inside 28 days is still **not explained by policy**. Policy records last-minute -10% within 14 days only (`airbnb_smoobu_settings_21oct.changed_21oct`). That question is for the channel agent.
- **Against comps:**
  - **P0 of the 2 kept comps**. -21.6% vs the 15 Nov median (£263.17, the booking day) and -27.6% vs today's £284.83.
  - **P5 of the wider 20.** The room rate is 34% under market P50 and below market P25.
  - **19.7% under the 3090701 line.** At the line (£256.85 all-in) the room would have been about £620.55, or about **£151.61 more** for these 3 nights.
- **Read-across:** the flat sold within hours at the bottom of the like-for-like market. It confirms a-peak-check: inside 28 days the 0.765 Airbnb factor plus the -5% pushed P13 under every comparable.

### 18-23 Dec reopened (Booking.com cancellation): hold at today's level
- **The -5% Christmas override is no longer in place.** Reyhan re-saved 10-26 Dec on 15 Nov at 19:12Z with min 3 and no price (logs + overrides).
  - The pushed price barely moved, because PriceLabs' uncustomized price fell in the same refresh. For example, 3064856 18 Dec uncustomized went 258 -> 238 and price 228 -> 226; 23 Dec 254 -> 234 and 226 -> 225.
  - So the "Christmas -5%" in the brief no longer exists as an override, but net prices are unchanged. Why the uncustomized price fell is for the PriceLabs auditor.
- **Airbnb 18-23 Dec** (5 nights) shows a "Long stay discount":
  - 3090701 £1,199 -> **£1,094** (£218.80/night)
  - 3064856 £1,139 -> **£1,040** (£208.00/night)
  - The factor vs Smoobu is 0.81. That fits the 5+ night LOS rule in policy (-8% / -10%) on top of the 0.90 factor.
- **Position:**
  - **Kept comps (n=2): P100 / P50**, +5.1% / -0.0% vs the median of £208.10. That is 7.7% / 17.6% over the lines.
  - **The wider sample has us at P11-P16** (median £294.40). PriceLabs is 5-11% under market P50, and market occupancy for 18-22 Dec is about 42%.
  - The cancelled Booking.com sale was £199.42 all-in; today's 3064856 Airbnb price is 4.3% above it.
- **Supported: hold (0%).** The like-for-like set says we are at or above the median. The +10% from `recommend` rests only on the wider sample and the market, not on comparable listings, and n=2 is thin. Revisit when the kept Christmas comps book or move.

### 13-16 Dec and the twin rule
- **3090701 now carries 3064856's prices on 10-15 Dec** (13-15 Dec: 245/240/237 on both). 3090701's `user_price` stays 186/182/180 and its uncustomized price is 227/217/210. This is apparently a result of the "copied from parent" edit.
- Airbnb shows **£735 on both twins for 13-16 Dec**.
- 1 Dec is also identical (£363 on both; 278 on both in PriceLabs). That is the intentional +50% night; the price itself is not questioned.
- 15-17 Jan is still identical in PriceLabs (193/195/186 on both, live 16 Nov). Airbnb differs only through 14 Jan (£668 vs £659).
- **Policy `listing_facts.P13.twin_listings`: never make them identical.** These three windows need a small gap restored, about 3% on one twin. Which twin is cheaper is deprioritised (`p13_twin_price_order`), so I do not raise the order.
- **13-16 Dec level: hold.** P75 of 4, +3.4% vs median, and 3090701 is +5.9% over its line. Market occupancy is 26%.

### 23-27 Dec, 14-17 Dec, 16-19 Dec: hold
- **23-27 Dec:** P67 of 3, +4-10% vs median, 12-23% over the lines. The wider sample has us at P14 and PriceLabs is 15-20% under market P50, but the kept comps (n=3) do not support more. Yesterday's supported "back to 0%" is done (override price removed).
- **14-17 Dec:** P71 of 7, both over their lines. 3090701 rose £224 -> £248 with the 10-15 Dec copy.
- **16-19 Dec:** P50 of 6, both over their lines.

### January twins
- **5-8 Jan: hold.** £206 / £197, a gap of +4.6%. P38 / P25 of 8. 3090701 is on its line (-0.1%) and 3064856 is 9.7% over its line.
  - Both fell about £8 on Airbnb because PriceLabs re-priced 5-7 Jan: 3090701 from about 181 (15 Nov live) to 175/172/173.
  - Market occupancy is 16% (mkt 16 Nov). Comps are flat.
- **14-17 Jan: hold the level; restore a ~3% gap on 15-17 Jan (twin rule).**
  - £222.67 / £219.67 (gap 1.4%). P38 of 8, -2.4% / -3.7%. 3090701 is exactly on its line.
  - Both show an Airbnb "Early booking discount" (-£38.80 each; it was -£56.50 / -£55.60 on 15 Nov).

### Other P13 nights (numbers only)
- **17 Nov (+35%, min 1):** P75 of 4; unchanged. The 1-night all-in overstates ours by the cleaning fee.
- **27 Nov (+50%, min 1):** £348 / £383, P100 of the wider 3 (a-p13-orphan-price).
- **1 Dec (+50%, min 1):** intentional per policy.

## P10 Hanger Lane, 1-bed (3318177)
- No sellable nights before the handback (policy `handbacks.P10` last night 18 Nov). The Airbnb stay runs to 19 Nov; PriceLabs shows 100% next 30 (`pl_kpis.csv`).
- No PriceLabs edits (logs empty). No comps or positioning.

## P02 Ladbroke Grove, P03 Bayswater
- Blocked on purpose (policy `intentional_blocks`). No positioning.
- Last push in `listings.csv`: 2999946 16 Nov 00:23Z; Bayswater channex 16 Nov 02:51Z.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
- Not in PriceLabs or Smoobu (`kpi_summary.md` 16 Nov: collect-data, no data).
- Own price, percentile, rating gap and premium: **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (bot check met on 14 Nov; not retried or bypassed). This covers comps and our displayed Booking.com prices. Comp cancellation policies: NOT CHECKED.
2. **P20 NYE paid 0.628 x Smoobu vs 0.765 expected (about £394).** The Airbnb payout breakdown was NOT CHECKED (for the channel agent). The comp median for NYE uses only comps still open, so it is biased up.
3. **P13 0.765 Airbnb factor inside about 28 days.** It explains the 10-13 Dec sale exactly but is not in policy (policy says -10% within 14 days). The live Smoobu Airbnb rules were NOT CHECKED.
4. **Why the 15 Nov 19:13Z refresh lowered P13's uncustomized prices** (offsetting the removed -5%), and why 3090701 took 3064856's `price` on 10-15 Dec while keeping its own `user_price`: NOT CHECKED (PriceLabs auditor).
5. **Thin comp coverage** (labelled; wider-sample or market percentiles shown alongside):
   - P13: n=0-3 on 20-22 Nov, 27 Nov, 1 Dec, 10-13 Dec, 18-23 Dec, 23-27 Dec and 27 Dec-3 Jan.
   - P20: n=0-2 on 20-22 Nov and 5-6 Dec.
   - P20 789954794593691037 was absent from every standard search for the 3rd day; it is active only on the probe stays.
6. The P20 market percentiles use a **1-3 BR** PriceLabs compset, which understates a 2-bed P50. The comps' cleaning split is unknown, so all-in gaps on 1-night stays (17 Nov, 27 Nov, 1 Dec, 5 Dec, 26 Dec) overstate ours.
7. The P13 Airbnb-to-Smoobu id mapping is still "likely / probable" (policy `airbnb_listings_24oct`). P16, P18 and P19 have no data; P10 has no sellable nights.
8. **Process:** two PriceLabs calls were made in parallel once (both OK); all others were one at a time.
