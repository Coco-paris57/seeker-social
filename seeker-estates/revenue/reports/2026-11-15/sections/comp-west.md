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

## P20 Waterford Court, 2-bed, max 4 (Airbnb 1791529331262420081, New, 0 reviews)

Column key:
- "Line" = comp median x 0.85.
- "Factor" = (all-in - £150) / sum of the Smoobu rate for the same nights (`prices.csv` 15 Nov). Smoobu equals the PriceLabs `price` on every night except 16-17 Nov.
- "PL / mkt 14 Nov" = PriceLabs `price` average vs market P50 from the 14 Nov pull, with the market percentile in brackets.

| Stay | Ours 15 Nov (14 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n, median) | PL / mkt 14 Nov | Factor | `recommend` |
|---|---|---|---|---|---|---|---|---|
| **16-18 Nov (requested)** | **232.0** (255.0) | **289.5 (4)** | **P0 / -19.9%** | **-5.7%** | P33 (12, 262.75) | PL 231 / P50 212 (P58); **Smoobu 205 (P45)** | **0.766 x Smoobu** (0.680 x PL) | raise +10% |
| 17-19 Nov (default Tue-Thu) | blocked 18-19 Nov | 289.5 (4) | comps only | | 270 (7) | | | |
| 20-22 Nov (next Fri-Sun) | below min 3 | 322.5 (3) | comps only | | 322.5 (5) | | | |
| 20-23 Nov | 230.33 (225.67) | 306.17 (6) | P0 / -24.8% | -11.5% | P0 (9) | 235.7 / 215.7 (P57) | 0.765 | raise +10% |
| **20-24 Nov (requested)** | **213.75** (216.0) | **296 (6)** | **P0 / -27.8%** | **-15.0%** | **P0 (9, 352)** | 230.2 / 214.5 (P56) | 0.765 | raise +10% |
| 21-24 Nov | 219.33 (228.0) | 294 (7) | P14 / -25.4% | -12.2% | P10 (10) | 221.0 / 213.3 (P53) | 0.766 | raise +10% |
| 22-24 Nov | 239.5 (new stay) | 283.25 (4) | P0 / -15.4% | -0.5% | P15 (13) | 214.5 / 212 (P51) | 0.767 | raise +10% |
| **5 Dec (gap night, requested)** | unbookable (min 3) | 431 (1) (1-night 5-6 Dec) | n=1 | | 438 (2) | 298 (user_price 306) / 227 | | |
| **14-17 Dec (30-day default)** | **306.67** (296.67) | **302.34 (10)** | **P60 / +1.4%** | +19.3% | P73 (30, 276) | 285.0 / 217.3 (P74) | 0.901 | raise +10% |
| 14-19 Dec (all 5 open nights) | 290.8 (279.6) | 317.2 (8) | P25 / -8.3% | +7.9% | P52 (23) | 289.6 / 222.2 (P74) | 0.901 | raise +10% |
| 26-30 Dec | 384.0 (384.5) | 372.75 (9) | P67 / +3.0% | +21.2% | P50 (16) | 385.0 / 258 (above P75 349) | 0.900 | raise +10% / +5% |

### 16-17 Nov: guests see the Smoobu 200/210, not PriceLabs 223/239
- **Airbnb confirms it.** 16-18 Nov all-in is **£464** = £150 + 0.766 x £410, where £410 is Smoobu 200 + 210. PriceLabs `price` is 223 + 239 = £462; PriceLabs would give £504 all-in (£251.95/night).
- Yesterday the same nights followed PriceLabs (all-in £255/night on 16-18 Nov). The Smoobu rate fell overnight with no PriceLabs log entry. Today's PriceLabs `user_price` (232/238) equals yesterday's Smoobu rate. Why Smoobu differs is for the PriceLabs auditor.
- **Position:** P0 of 4 kept comps, -19.9% vs median, **5.7% under the 0-review line**. The comps did not move (same-comp change 0%).
- **What the evidence supports: put 16-17 Nov back to the PriceLabs level (+12.7% on room).** That gives about £251.95/night all-in: -13.0% vs median, +2.4% over the line. That is the discount 0 reviews supports. The +10% from `recommend` on top of that is not supported.
- 16 Nov is tomorrow, so this lapses within 24 hours.

### 20-24 Nov: P0 everywhere; comps flat
- PriceLabs re-priced the nights (20 Nov 236 -> 258, 21 Nov 240 -> 234, 22 Nov 212 -> 215, 23 Nov 245 -> 214, 24 Nov 246 -> 244). There were no edits (logs empty). Airbnb 20-24 Nov is £855 (£213.75/night).
- Comps were flat (same-comp median 0% on 20-23 and 20-24 Nov). 1684834789445533643 was the only one returned for 20-22 Nov, at £322.50.
- **The low point is still 20-21 Nov.** 22-24 Nov sits on the line (-0.5%), while stays that start 20 Nov are 11.5-15% under it.
- **What the evidence supports, on 20-21 Nov only:** -5% -> 0% plus +10% (about +15.8%).
  - 20-23 Nov would be about £250.10/night: -18.3% vs median, still 3.9% under the line.
  - 20-24 Nov would be about £228.50/night: -22.8% vs median, 9.2% under the line.
  - 22-24 Nov: **hold**.
- **This depends on t-p20-delivery, which is still open for Corentin.**
  - Policy says the Smoobu block for delivery is 20-22 Nov (`listing_facts.P20.block_20_21_nov`).
  - PriceLabs and Smoobu block 18-19 Nov instead, and 20-24 Nov is on sale.
  - Removing Reyhan's -5% (11 Nov) is Corentin's call, not a new proposal.

### 5 Dec orphan (t-p20-5dec-orphan): still NOT fixed, 6th day
- Raw 15 Nov: price 298, user_price 306, min 3, `unbookable` 1. The override is "0%, min 3", last updated 9 Nov 21:25:55Z.
- The only 1-night kept comp (1684834789445533643) is £431, unchanged. The wider 1-night sample is n=2, median £438. Market P50/P75 is 227/303 (14 Nov).
- **Supported: min 1 at the current £298.** That is just under market P75 and about 31% under the only 1-night comp. On Airbnb it is about £268 room at the 0.90 December factor.

### December: hold
- **14-17 Dec: hold.** P60 of 10, +1.4% vs median, +19.3% vs line.
  - Ours rose £296.67 -> £306.67 because PriceLabs re-priced 14-17 Dec up (avg 274 -> 285).
  - Comps are flat. Market occupancy for these nights is about 20% (14 Nov).
  - No raise: 0 reviews, and we are already above the median. No trim: we lead the market by 20 pts (30 d).
- **14-19 Dec: hold.** P25 of 8, -8.3%, +7.9% vs line.
- **26-30 Dec: hold.** P67 of 9, +3.0% vs median, +21% vs line. PriceLabs is above market P75. Comps edged down (1568001017881493647 £387.75 -> £372.75, 1516006875488990547 £300.25 -> £286). Min stays are 4-6 nights.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

| Stay | Ours 3090701 / 3064856 (14 Nov) | Comp median (n) | Comp pctl / vs median | vs line (3090701 / 3064856) | Wider pctl (n, median) | PL avg vs mkt P50 (14 Nov) | Factor | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 17 Nov (1 n, +35% min 1) | 309 / 337 (326 / 336) | 214 (4) | P75 / +44% ; P75 / +58% | 1 night: cleaning inflates ours | P62 (8, 245) | 207 / 244 vs 206 | 0.77 | raise +5% |
| 17-19 Nov (default Tue-Thu) | booked | 221 (5) | comps only | | 238.75 (20) | | | |
| 20-22 Nov (next Fri-Sun) | booked | 255.25 (2) | comps only | | 309 (13) | | | |
| 27 Nov (1 n, +50% min 1) | 348 / 383 (372 / 383) | none returned | | | P100 (3, 329) | 258 / 304 vs 238 | 0.77 | mkt: raise |
| 1 Dec (1 n, +50% min 1, intentional per policy) | 321 / 364 (new stay) | none returned | | | P33 (3, 435) | 223 / 279 vs 224 | 0.77 | numbers only |
| **10-13 Dec (requested)** | **206.33 / 245.33** (207.67 / 247.0) | **263.17 (2)** | **P0 / -21.6% ; P50 / -6.8%** | **-19.7% / +9.7%** | **P5 / P14 (21, 310.67)** | 204.3 / 255.3 vs 239.7 (-15% / +7%) | 0.765 | raise +10% |
| 14-17 Dec (30-day default) | 224.0 / 248.0 (236.33 / 226.33) | 229.33 (7) | P43 / -2.3% ; P71 / +8.1% | +0.1% / +27.2% | P24 / P53 (38, 244.5) | 193.3 / 220 vs 223.7 | 0.90 | raise +10% |
| **18-23 Dec SOLD on Booking.com** | **£169.42 room; £199.42 incl. £150 cleaning** | **208 (2)** | **P0 / -4.1%** | -1.8% / +12.8% | **P6 (17, 288.8)** | 3064856 at booking 213.4 vs 248.2 (-14%) | 0.722 x Booking.com list | |
| **23-26 Dec** | **261.33 / 250.67** (254 / 242.67) | 231.5 (2) | P100 / +12.9% ; P100 / +8.3% | +15.7% / +27.4% | **P18 (22, 307.67)** | 234.7 / 222.7 vs 270 (-13% / -18%) | 0.90 | raise +10% |
| **23-27 Dec (the whole 4-night gap)** | **249.0 / 238.25** (new stay) | 230.25 (3) | P67 / +8.1% ; P67 / +3.5% | +10.8% / +21.7% | **P20 (20, 317.38)** | 235 / 223 vs 273.8 (-14% / -19%) | 0.90 | raise +10% |
| 24-27 Dec | 260.67 / 250.0 (251.67 / 240.67) | 236 (2) | P100 / +10.5% ; P100 / +5.9% | +13.2% / +24.6% | P19 (16, 324.16) | 234 / 222 vs 277.3 (-16% / -20%) | 0.90 | raise +10% |
| **5-8 Jan (twins, midweek)** | **214.33 / 206.0** (206 / 197.33) | **206.17 (8)** | **P75 / +4.0% ; P50 / -0.1%** | +6.5% / +17.6% | P33 / P26 (46) | 182.3 / 173.3 vs 204.7 (-11% / -15%) | 0.90 | raise +5% / +10% |
| **14-17 Jan (twins)** | **219.67 / 217.0** (221.67 / 221.67); "Early booking discount" -£56.50 / -£55.60 | **232 (7)** | **P29 / -5.3% ; P29 / -6.5%** | -3.0% / +10.0% | P29 (56) | 188.3 / 185.3 vs 209 (-10% / -11%) | 0.901 | raise +10% |

**Comp moves:** Christmas kept comps (n=2) cut again, by 1.0-1.6%. 10-13 Dec was flat (-0.3%). 14-17 Dec: 1568189670839493789 rose £214 -> £229.33 and 1761224847419174970 cut £271.33 -> £265. 17 Nov: 1205241472054931937 cut £403 -> £359.

### 18-23 Dec sold on Booking.com at £169.42/night: bottom of the like-for-like market
- **The booking:** Smoobu `reservations.csv` has £847.10 room for 5 nights (£169.42/night), commission £179.64 (21.2%), booked 14 Nov, 34 days out.
  - Commission above 15% is expected: the P13 Visibility Booster covers check-ins to 20 Dec (`booking_promotions_p13_21oct`).
- **Against comps, on the same all-in basis** (room plus £150 cleaning over 5 nights = **£199.42/night**):
  - **P0 of the 2 kept comps** (£204.20 and £211.80; median £208), -4.1%.
  - **P6 of the wider 2-bed sample of 17** (median £288.80; only one cheaper, at £189.60).
  - That is about on the 3090701 line (-1.8%) and 12.8% over the 3064856 line.
- **How it was priced:** Smoobu on 14 Nov was 216 / 219 / 204 / 213 / 215 = £1,067 (`prices.csv` 14 Nov). These nights already carried Reyhan's -5%.
  - With the +10% markup the Booking.com list is about £1,173.70, so the guest paid **0.722 x list**.
  - The promotions that make up the 27.8% gap: NOT CHECKED (for the channel agent; stacking is expected per policy).
  - At 0% instead of -5% the same stack would have paid about £891.70 (£208.34/night all-in), exactly the kept-comp median.
- **Read-across:** the flat sold 34 days out, at the bottom of the kept set and in the bottom decile of the wider sample. That fits under-pricing more than a needed discount. It is the main evidence for a-peak-check below.

### Remaining Christmas nights 23-26 Dec (-5%, a-peak-check)
- 23-27 Dec is now a clean 4-night gap between the Booking.com stay and the 27 Dec-3 Jan Airbnb stay. Min 3 fits.
- **Kept comps (n=2-3) are cutting.** On them we are P67-P100: the cheaper twin (3064856) is +3.5% to +8.3% vs the median, and 22-27% over its line.
- **The wider sample has us at P18-P20** (medians £307-£324), and PriceLabs is 13-20% under market P50 (14 Nov). Market occupancy for 23-27 Dec is about 45-46% (14 Nov). The 18-23 Dec stay sold at P6.
- **What the evidence supports: 23-26 Dec back to 0% (+5.3%); the full +10% is not.**
  - 3064856 23-27 Dec would be about £248.76/night (+8% vs the kept median, still about P20 of the wider sample).
  - 3090701 would be about £260.13.
  - The -0.15 quality cap on 3064856 and the n=2-3 kept set limit the move.
- **This conflicts with Reyhan's 11 Nov -5%, so it is for Corentin to confirm (a-peak-check), not a new proposal.**

### 10-13 Dec (requested): still P0, -21.6%
- Both twins are flat vs yesterday (£207.67 -> £206.33; £247 -> £245.33). They sell at 0.765 x PriceLabs, the inside-about-28-days factor seen since 14 Nov.
- 10-17 Dec is an 8-night open run (the 11-15 Dec Booking.com stay was cancelled, `reservations.csv`).
- **Position:** the cheaper twin (3090701) is P0 of 2 kept, -21.6% vs median, -19.7% vs its line. It is P5 of the wider 21, and PriceLabs is 15% under market P50 (14 Nov). Market occupancy is about 43%.
- **Supported: +5% to +10% on 10-12 Dec** (`recommend` +10%).
  - -5% -> 0% puts 3090701 at about £214.54 (-18.5%). +10% on top puts it at about £231.00 (-12.2%, still 10% under its line).
  - 3064856 is already +9.7% over its line, so raise it no more than 3090701.
  - **This conflicts with Reyhan's -5%: for Corentin (a-peak-check).**
- **14-17 Dec: hold.** 3090701 is on its line (+0.1%, P43 of 7); 3064856 is P71, +27% over its line.

### January twins (t-p13-twins)
- **5-8 Jan: hold.** £214.33 vs £206.00 (gap +4.0%). Position P75 / P50 of 8, on or above both lines. Market occupancy is 17% (14 Nov). Both twins moved up about £8 on Airbnb with PriceLabs (5-7 Jan `price` avg: 3090701 174.3 -> 182.3, 3064856 164.7 -> 173.3; 14 Nov live vs 15 Nov).
- **14-17 Jan: the gap is back to 1.2%, and only from 14 Jan.** Live PriceLabs has **identical** `price` on both twins for 15-17 Jan (193 / 195 / 186) and identical `user_price` from 14 Jan. Airbnb shows £659 vs £651, both struck through with an "Early booking discount" (about £56).
  - Position: P29 of 7, -5.3% / -6.5% vs median. 3090701 is 3.0% under its line.
  - **Supported:** keep the level and restore a gap of about +3% on 3090701 for 15-16 Jan. That puts 3090701 14-17 Jan at about £223.20 (-3.8% vs median, -1.4% vs line).
  - Policy `listing_facts.P13.twin_listings` says never make them identical. Twin order is deprioritised, so it is not raised.

### Other P13 nights
- **17 Nov (1 night, +35%): hold.** P75 of 4, P62 of the wider 8. 3090701 fell £326 -> £309 because PriceLabs re-priced (raw 207). The 1-night all-in overstates ours by the cleaning fee.
- **27 Nov (+50% min 1): numbers only** (a-p13-orphan-price). 3090701 fell £372 -> £348; 3064856 is unchanged at £383. No kept comp was returned; we are P100 of the wider 3.
- **1 Dec (+50% min 1): intentional per policy (`intentional_overrides.P13`).** Numbers only: £321 / £364, P33 of the wider 3.

## P10 Hanger Lane, 1-bed (3318177)
- No sellable nights. The confirmed Airbnb stay 18 Oct-19 Nov covers every night up to the handback (policy last night 18 Nov); 19 Nov onwards is blocked.
- No PriceLabs edits (logs empty). No comps or positioning.

## P02 Ladbroke Grove, P03 Bayswater
Blocked on purpose (policy `intentional_blocks`). Last push in `listings.csv`: 2999946 15 Nov 00:23Z; Bayswater channex 15 Nov 03:13Z. No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or Smoobu (`kpi_summary.md` 15 Nov: "No priced PriceLabs listing mapped", collect-data). Own price, percentile, rating gap and premium: **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (bot check met on 14 Nov; not retried or bypassed). This covers comps, our displayed Booking.com prices and the stack on the 18-23 Dec sale. The 18-23 Dec comparison uses our Smoobu room total plus £150 cleaning against Airbnb comp all-ins. Comp cancellation policies: NOT CHECKED.
2. **PriceLabs neighbourhood data failed today** for 3547481 and 3064856 (HTTP 500, error 50002). Market percentiles and market nightly occupancy are from the 14 Nov pull, labelled. Market 30/60-day occupancy is from `pl_kpis.csv` 15 Nov.
3. **P20 16-17 Nov: Smoobu 200/210 vs PriceLabs 223/239.** Airbnb confirms guests see Smoobu. Why Smoobu fell overnight with no PriceLabs log: NOT CHECKED (PriceLabs auditor).
4. **Thin comp coverage** (labelled; wider-sample or market percentiles used instead):
   - P13: n=0-3 on 20-22 Nov, 27 Nov, 1 Dec, 10-13 Dec, 18-23 Dec and all of Christmas.
   - P20: n=1-3 on 20-22 Nov and 5-6 Dec.
   - P20 789954794593691037 was absent from every standard search for the 2nd day; it is active only on the probe stays.
5. **The comps' cleaning split is unknown**, so all-in gaps on 1-night stays (17 Nov, 27 Nov, 1 Dec, 5 Dec) overstate ours.
6. **Other NOT CHECKED items:**
   - The P13 Airbnb 0.765 factor inside about 28 days vs the policy record (-10% within 14 days).
   - The live Smoobu Airbnb rules.
   - 3090701 Smoobu rates (only 3064856 is in `prices.csv`).
   - The P13 Airbnb-to-Smoobu id mapping is still "likely / probable" (policy `airbnb_listings_24oct`).
7. P16, P18 and P19 have no data; P10 has no sellable nights.
