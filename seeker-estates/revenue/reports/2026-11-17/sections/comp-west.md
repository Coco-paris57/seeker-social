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

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### NEW 22-27 Dec Booking.com sale at £168.15/night room: -9% vs like-for-like comps, -38% vs market P50
- **Which twin: 3064856.** The Smoobu reservation is on apartment 3064856, channel Booking.com, created **16 Nov 22:52**, 2 adults + 2 children. The price is £990.75 incl. cleaning, so the room is **£840.75**.
- **Calendar status:**
  - **Smoobu:** `/api/rates` shows `available` 0 on **both** twins for 22-27 Dec.
  - **Airbnb:** neither of our listings was returned for 22-27 Dec or 23-27 Dec today, so it is closed there too.
  - **PriceLabs** still shows 22-26 Dec open on both twins (`prices.csv`, raw 17 Nov). The booking was made after the 16 Nov 09:42Z refresh, so this is a sync lag, not a double-booking.
- **Against comps** (all-in **£198.15/night** = (840.75 + 150) / 5):
  - **P0 of the 3 kept comps** still open, **-9.3%** vs the median of £218.40. The comps are 1568189670839493789 (4.27, garden) £202.60, 1014671215040555613 (4.76) £218.40 and 1411449348357673454 (4.74, 53 reviews, Superhost) £311.80.
  - **P5 of the wider 19** (median £302.60).
  - Against the lines:
    - **7.0% under the 3090701 line** (£213.16). At that line the room would be about £75 more.
    - **6.7% over the 3064856 / Booking.com 8.4 line** (£185.64).
  - At the comp median the room would have been about **£101 more**.
- **Against the market** (mkt 17 Nov, 22-26 Dec):
  - The room rate of £168.15 is **-37.9% vs market P50** (£270.8) and **-19.6% vs P25** (£209.2).
  - Market occupancy is 44-47%; the booked-P50 is about £271.
  - The PriceLabs price itself (216/225/219/220/222, average £220.4) is already 18.6% under P50.
- **How it was priced:**
  - Booking.com list = Smoobu 3064856 £1,102 x 1.10 (policy `booking_markup`) = **£1,212.20**, or £272.44/night all-in. That list price is **+24.7% vs comp median** (P67 of 3).
  - The guest paid **0.694 x list** (0.763 x Smoobu).
  - That fits Non-refundable 10% x Mobile 10% x Genius L1 10% x occupancy -5% = 0.6926, which gives £839.51 (£1.24 off). This is my inference; the extranet breakdown is NOT CHECKED.
  - Black Friday (bookable from 19 Nov) and Last Minute (0-30 days; this booking was 36 days out) did not apply.
  - So the promotion stack, not the PriceLabs level, took a list price above the comp median down to below it. Policy `booking_stacked_promotions` says this is explained: I report its size and do not call it a leak.
- **Commission £148.61 = 17.7% of room.** Policy records the P13 booster only for check-ins to 20 Dec, and Jan-Feb. A 22 Dec check-in is outside that, so the 17.7% is not explained by the recorded booster dates. For the channel agent to ask, not assume.
- **What the evidence supports:** about **-2% vs comp median** for Christmas on the flat as a whole (3090701 line), or -15% on the 3064856 / Booking.com rating. The sale landed between the two lines, so it is within the like-for-like range. The wider sample (P5) and market (-38% vs P50) say Christmas was under-priced, but the kept set is n=3, which is thin.
- The gap to recover is the Booking.com stack on peak dates, not the PriceLabs level: list +25%, paid -9%.

### Remaining 13-21 Dec (9 open nights): hold
| Stay | Ours 3090701 / 3064856 (16 Nov) | Comp median (n) | Comp pctl / vs median | vs line 3090701 / 3064856 | Wider pctl (n, median) | PL avg vs mkt P50 17 Nov (mkt occ) | Factor vs PL | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 13-16 Dec | **234 / 234** identical (245 / 245) | 237.0 (4) | P25 / -1.3% | +1.2% / +16.2% | P39 (31, 239) | 240.3 vs 218.7, +9.9% (26%) | 0.766 | raise +10% |
| 16-19 Dec | 262 / 254 (255.33 / 243.67) | 243.5 (6) | P67 / +7.6% ; +4.3% | +10.2% / +22.7% | P48 / P43 (23, 263.33) | 235.3 / 226.7 vs 235.0 (31%) | 0.90 | raise +10% |
| **17-20 Dec (30-day default)** | **262.67 / 251** | **277.34 (4)** | **P50 / -5.3% ; -9.5%** | **-3.0% / +6.5%** | P24 (17, 316.67) | 236.0 / 223.0 vs 242.0 (38%) | 0.90 | raise +10% |
| 18-22 Dec (up to the Christmas booking) | 247.5 / 236 | 218.38 (2) | P100 / +13.3% ; +8.1% | +16.1% / +27.1% | P27 / P20 (15, 304) | 233.2 / 220.5 vs 244.0, -4% / -10% (43%) | 0.90 | raise +10% |
| 13-22 Dec (all 9, weekly -15%) | 197 / 191.56 (strike £2,059 / £2,002) | 170.11 (1) | n=1 | | P15 (13, 275.56) | 235.7 / 228.6 vs 232.8 (34%) | 0.765 | numbers only |

- **Supported: hold (0%).** 3090701 sits within about 3% of its line on 13-16 Dec and 17-20 Dec, and above it elsewhere. 3064856 is 6-27% over its line everywhere. `recommend`'s +10% rests on the occupancy lead (which is earlier bookings) and on the wider sample or market. The like-for-like comps do not support it.
- **13-16 Dec fell £245 -> £234 on Airbnb** with no PriceLabs change (721 vs 722). The factor moved 0.810 -> **0.766** as 13 Dec came inside about 28 days. This is the same unexplained Airbnb inside-28-days factor that sold 10-13 Dec at P0 (see Data gaps). At 0.766 the stay is still P25 and on the 3090701 line.
- The weekly 15% on the 9-night stay matches policy exactly: £286.35 = 15% of (2,059 - 150).
- **Twin rule (policy `listing_facts.P13.twin_listings`): still identical** on 13, 14, 15 and 16 Dec and 16 Jan (`prices.csv` 17 Nov). Airbnb shows £702 on both twins for 13-16 Dec. These nights need a small gap restored, about 3% on one twin. Which twin is cheaper is deprioritised, so I do not raise it.

### January twins: hold
- **5-8 Jan:** £205 / £196.33 (gap 4.4%), unchanged within £1.
  - P38 / P25 of 8, -3.0% / -7.1%.
  - Lines: **-0.6%** / +9.3%.
  - PriceLabs 172 / 162.3 vs market P50 205 (-16% / -21%). Market occupancy 16%. Comps are flat (same-comp 0%).
- **14-17 Jan:** £221.33 / £215 (gap 2.9%; it was 1.4%).
  - P38 / P38 of 8, -1.9% / -4.7%.
  - Lines: **+0.5%** / +12.1%.
  - Market occupancy 12%. The Airbnb "Early booking discount" is now -£19.30 each (it was -£38.80).
  - 16 Jan is identical on both twins (193), see the twin rule above.
- **Supported:** 3090701 about -2% vs median, where it already sits; 3064856 -15%, and it is above that. With market occupancy at 12-16% the evidence does not support a raise.

## P20 Waterford Court, 2-bed, max 4 (Airbnb 1791529331262420081, New, 0 reviews)

Column key:
- "Line" = comp median x 0.85.
- "Factor" = (all-in - £150) / sum of the Smoobu (= PriceLabs `price`) for the same nights.
- PriceLabs vs market uses the 1-3 BR compset (mkt 17 Nov).

| Stay | Ours 17 Nov (16 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n, median) | PL avg / mkt P50 (mkt occ) | Factor | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 20-22 Nov (next Fri-Sun) | below min 3 | 320.25 (2) | comps only | | 320.25 (4) | 299.5 / 218.0 (53%) | | |
| 20-23 Nov | 267.67 (268.33) | 302.33 (5) | P0 / -11.5% | +4.2% | P0 (7) | 284.3 / 216.3 (50%) | 0.766 | raise +10% |
| **20-24 Nov (requested)** | **250.0** (248.0) | **288.25 (5)** | **P0 / -13.3%** | **+2.0%** | P0 (7, 356) | 277.5 / 215.2 (48%) | 0.766 | raise +10% |
| 21-24 Nov | 256.67 (255.0) | 287.5 (6) | P17 / -10.7% | +5.0% | P12 (8) | 270.0 / 214.0 (47%) | 0.765 | raise +10% |
| 22-24 Nov | 270.5 (267.0) | 288.5 (5) | P20 / -6.2% | +10.3% | P38 (13) | 255.5 / 212.5 (43%) | 0.765 | raise +10% |
| 24-26 Nov (midweek default) | 25 Nov booked | 275.75 (4) | comps only | | 270 (15) | | | |
| **5 Dec (orphan, requested)** | unbookable (min 3) | none returned | n=0 | | 445 (1) | 277 (286) / 228, P75 298 (46%) | | |
| 14-17 Dec | 310.0 (302.67) | 302.66 (10) | P60 / +2.4% | +20.5% | P70 (30, 280.34) | 320.7 / 217.0 (21%) | 0.811 | raise +10% |
| 14-19 Dec (all 5 open nights) | 309.0 (288.4) | 319.4 (8) | P38 / -3.3% | +13.8% | P52 (21) | 329.0 / 221.6 (22%) | 0.848 | raise +10% |
| **16-19 Dec (30-day default)** | **352.67** (309.33) | **329.66 (8)** | **P62 / +7.0%** | **+25.9%** | P65 (20, 326.34) | 336.0 / 226.0 (23%) | 0.901 | raise +10% |
| **26 Dec (orphan, requested)** | unbookable (min 4) | 494 (1) | n=1 | | 345 (5) | 271 (300) / 256, P75 335 (34%) | | |
| 26-30 Dec (context) | 26 Dec min 4; 27 Dec booked | 372.12 (8) | comps only | | 420 (15) | | | |

### 20-24 Nov (arrival Friday): hold
- PriceLabs moved 297/302/257/244/230 -> **300/299/254/257/239** in the 16 Nov 09:43Z refresh, and Airbnb went £992 -> **£1,000**. Comps are flat (same-comp 0%).
- **Position:** P0-P20 of 5-6 kept comps, -6% to -13% vs median, and **+2% to +10% over the 0-review line**.
- **Supported: hold, about -12% vs comp median.** The +10% from `recommend` is not supported without reviews. Market occupancy for 20-21 Nov is 53%, the highest in the batch, so this is the weekend most likely to sell as priced.
- **t-p20-delivery is still open (Corentin)**, 3 days out:
  - PriceLabs blocks 18-19 Nov.
  - 20-24 Nov is open and returned on Airbnb (20-23, 20-24, 21-24 and 22-24 all priced today).
  - Policy `listing_facts.P20.block_20_21_nov` says the delivery block is 20-22 Nov.

### December 14-18: the 16 Nov PriceLabs rise is not supported by comps; back to about -5% vs median
- **The refresh:** PriceLabs 16 Nov 09:43Z raised **16-18 Dec from 271/292/301 to 325/338/345** (+20% / +16% / +15%) and 14-15 Dec from 309/308 to 318/319.
  - The uncustomized price went 299/322/332 -> 341/358/366.
  - No log entry (`get_user_logs` is empty) and no override change behind it.
- **The market did not move:** P50 for 16-18 Dec is 221/227/230 (mkt 17 Nov), 226.0 average vs 227.0 on 16 Nov. Market occupancy is 21-24%, the same-comp change is 0% on all 8-10 comps, and P20 has 0 reviews.
- **Airbnb 16-19 Dec is £1,058 (+14%).** That is P62 of 8 and **+7.0% vs median, 25.9% over the line**. 14-17 Dec is +2.4% and 20.5% over the line.
- **Supported: about -5% vs comp median** (the 16 Nov level). That is 16-19 Dec at about £313/night all-in, or PriceLabs about £292/night average on 16-18 Dec, against **£336 now** (16 Nov: 271/292/301 = £288). 14-15 Dec at 318/319 can stay. Nothing above the comp median is supported for a 0-review flat at 21-24% market occupancy.
- PriceLabs `user_price` on 16-18 Dec (271/292/301) now differs from `price` (325/338/345). Smoobu and Airbnb follow `price`. Which field is the final pushed rate is for the PriceLabs auditor; NOT CHECKED here.

### 5 Dec orphan (t-p20-5dec-orphan): still not fixed, day 8
- Raw 17 Nov: price **277** (286 on 16 Nov), user_price 286, min 3, `unbookable` 1. No log entry since 16 Nov.
- No kept comp was returned for 5-6 Dec. The wider sample is n=1 at £445. Market P50/P75 is 228/298, occupancy 46%.
- **Supported: min 1 at about £277.** That is between market P50 and P75.

### 26 Dec orphan (t-p20-26dec-orphan): still not fixed
- Raw 17 Nov: price **271** (300 on 16 Nov), user_price 300, min 4, and **`unbookable` is now 1**.
- 1-night comps: n=1, 1684834789445533643 at £494. The wider sample is n=5, median £345. Market P50/P75 is 256/335, occupancy 34%.
- **Supported: min 1 at £271-300**, between market P50 and P75. Reyhan's -5% (4 Nov) stays for Corentin to decide, not a new proposal.

### NYE (t-pl-sync-1611)
- PriceLabs raw 17 Nov now shows 27 Dec "Booked (Check-In)", booked_date 2026-11-15, ADR 257.68. **The NYE stay is registered.**
- Positioning is unchanged from 16 Nov: sold at P14 / -17.8% vs comps, 3.3% under the 0-review line. The 0.628 x Smoobu factor is still for the channel agent.

## P10 Hanger Lane, 1-bed (3318177)
- No sellable nights before the handback (policy `handbacks.P10`, last night 18 Nov). The Airbnb stay runs to 19 Nov (`reservations.csv`).
- No log entries since 16 Nov. No comps or positioning.

## P02 Ladbroke Grove, P03 Bayswater
- Blocked on purpose (policy `intentional_blocks`). No positioning.
- 2999946 last pushed 17 Nov 00:23Z (`listings.csv`).

## P16 Little Venice, P18 Fulham, P19 Kings Langley
- Not in PriceLabs or Smoobu (no rows in `listings.csv` or `prices.csv` 17 Nov).
- Own price, percentile, rating gap and premium: **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (bot check met on 14 Nov; not retried or bypassed). This covers comps, our displayed Booking.com prices and the P13 22-27 Dec promotion breakdown; the 0.6926 stack is inferred. Comp cancellation policies: NOT CHECKED.
2. **P13 22-27 Dec commission 17.7%** with a check-in outside the recorded booster dates (policy: to 20 Dec). Whether the booster was extended: NOT CHECKED (channel agent / Corentin).
3. **PriceLabs has not registered the P13 22-27 Dec booking** (open on both twins as of the 16 Nov 09:42Z refresh). Smoobu and Airbnb are closed. No refresh was triggered (read-only).
4. **P13 Airbnb factor of about 0.765 inside about 28 days** (13-16 Dec today; the 10-13 Dec sale yesterday). It is not in policy, which says -10% within 14 days. The live Smoobu Airbnb rules: NOT CHECKED. P20's 0.766 on 20-24 Nov is within its policy last-minute 15% (0-14 days), so it is not flagged.
5. **P20 16-18 Dec +15-20% PriceLabs rise** with no log or override change, and the `price` vs `user_price` divergence: cause NOT CHECKED (PriceLabs auditor).
6. **Thin comp coverage** (wider-sample or market percentiles shown alongside):
   - P13: n=1-3 on 20-22 Nov, 24-26 Nov, 18-22 Dec, 13-22 Dec, 22-27 Dec and 23-27 Dec.
   - P20: n=0-2 on 20-22 Nov, 5 Dec and 26 Dec.
   - Only unsold comps can be priced, which biases the Christmas medians up.
   - P20 789954794593691037 was found only by the activity probe (4th day).
7. The P20 market percentiles use a 1-3 BR compset, which understates a 2-bed P50.
8. Channel basis: our P13 Christmas sale is Booking.com paid (no guest service fee), while the comps are Airbnb all-in (fee included). The -9.3% gap is therefore, if anything, overstated against us.
9. The P13 Airbnb-to-Smoobu id mapping is still "likely / probable" (policy `airbnb_listings_24oct`). P16, P18 and P19 have no data; P10 has no sellable nights.
