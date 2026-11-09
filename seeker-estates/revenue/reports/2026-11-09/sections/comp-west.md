# Competitor positioning: WEST + HERTS (D = 2026-11-09)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** `data/policy.json` read first. PriceLabs calls, read-only, one at a time, all 200:
1. `get_user_logs` (listing, 7-9 Nov) for 3064856, 3090701, 3547481, 3318177: 11 entries. **4 are new since 8 Nov 06:00Z, all Reyhan, 8 Nov 12:39:28-12:41:16Z** (see "What changed").
2. `get_listing_date_overrides` 3547481 and 3064856 (9 Nov-31 Dec).
3. `get_neighbourhood_data` detail (future prices + occupancy) for 3547481 (2 BR n=153, P25/P50/P75 214/252/320) and 3064856 (n=116). Saved as `scratchpad/west09/dl/neigh_*.json`.
4. `get_customizations` 3547481 (to explain a P20 price drop; see below).

**Own prices:** `raw/prices_*.json` in snapshot 2026-11-09, refreshed 8 Nov 12:40-12:42Z. That matches the last push in `listings.csv` (P13 12:40:37Z, P20 12:41:45Z). The 9 Nov raw starts on 10 Nov, so the 9 Nov night uses the 8 Nov raw (refreshed before the 8 Nov push). Smoobu `/api/rates`: NOT CHECKED.

**Airbnb:** public search pages, checked 2026-11-09 with plain `curl` and default headers. No bot check was met. **Booking.com: NOT CHECKED.**

**Method** (unchanged since 3 Nov):
- Search: 4 guests, entire home, at least 2 bedrooms. Box of about 1.3 km half-side around the PriceLabs coordinates, plus a box of about 0.2 km around each kept comp.
- Price = Airbnb all-in total / nights, with cleaning and Airbnb fees **included** (taxes are not shown separately). Ours are on the same basis (£150 cleaning).
- Comp cancellation policies: NOT CHECKED.

**Comp sets** (same ids as 8 Nov; none replaced):
- **P20:** all 12 returned on at least one of 12 stays.
- **P13:** 10 of 11 returned on at least one of 15 stays. **1411449348357673454** (Superhost 4.78/49) was returned on none today. Yesterday it was returned on 8-10 Nov and 7-10 Dec, which are now past or booked out. It is kept for now. If it is still absent tomorrow I will check its calendar and replace it.

**Ratings:**
- Ours, unchanged: 3090701 4.7 (10), 3064856 4.31 (13), P20 New with 0 reviews.
- Comp median: P13 4.78 (13 reviews), P20 4.8 (17.5 reviews).

**Occupancy** (Smoobu `reservations.csv` 9 Nov, cancelled excluded; market from `pl_kpis.csv` 9 Nov):

| Listing | 30 d (9 Nov-8 Dec) | 60 d (9 Nov-7 Jan) | Market 30 / 60 | Lead 30 / 60 |
|---|---|---|---|---|
| P13 (one flat) | 23/30 = **76.7%** | 31/60 = **51.7%** | 44% / 39% | **+33 / +13 pts** |
| P20 | 16/30 = **53.3%** | 28/60 = **46.7%** | 38% / 31% | **+15 / +16 pts** |

All leads are 10 pts or more, so `recommend` returns "raise" on every stay. The quality-adjusted comp line below decides whether that raise is actually supported.

**Rows written:**
- **309 rows** appended to `data/snapshots/2026-11-09/comps.csv` (P13: 11 comps x 15 stays; P20: 12 comps x 12 stays). A comp that was not returned has a blank nightly price and says so in `source`.
- **31 rows** appended to `channel_checks.csv` (our three Airbnb listings).
- Both appends ran under `flock` (`.comps.csv.lock` / `.channel_checks.csv.lock`). Other agents had already copied both files forward.
- To find the rows, filter `source` on "checked 2026-11-09" and "comp-west". `date` is the check-in; the full stay is in `source`.

**Recompute check** (`snapshot.load('2026-11-09')` + `comp_summary`, matches the tables):
- P13 10-12 Nov: n=3, median 236, P33 / -14.8% (3090701 £201).
- P13 14-17 Dec: n=7, median 226, P71 / +6.6%.
- P20 20-23 Nov: n=8, median 297.67, **P0 / -21.5%**.
- P20 14-19 Dec: n=9, median 325.2, P33 / -13.6%.
- P20 26-30 Dec: n=8, median 370.13, P62 / +14.3%.

## Comp tables (Airbnb all-in £/night, 4 guests, checked 2026-11-09)
- A figure in brackets is the same comp's price for the same stay on 8 Nov, shown where it moved by £1 or more.
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- For ours, "not returned" means the stay is booked, blocked or below min stay:
  - P13: 12-13 Nov is below min 2; 13-15 Nov and 9-11 Dec are booked.
  - P20: 10-12 Nov, 5-8 Dec, 9-11 Dec and 23-27 Dec are booked; 5-6 Dec is unbookable (min 3).

#### P13

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 9-11 Nov | 10-12 Nov | 11-13 Nov | 12-13 Nov | 13-15 Nov | 17-18 Nov | 27-28 Nov | 9-11 Dec | 10-12 Dec | 11-13 Dec | 14-17 Dec | 18-20 Dec | 20-25 Dec | 23-26 Dec | 24-27 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.82 (11) | Garden view/balcony |  | 236 (246.5) |  |  |  |  |  |  |  |  | 241 |  | 265.4 | 279.33 | 279 |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | Paid parking on premises/Guest favourite |  |  | 207 |  |  |  |  | 267 |  |  | 239.33 |  |  |  |  |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking on premises |  |  |  |  |  |  |  | 242 | 268 |  |  |  |  |  |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  |  |  |  |  |  |  | 226 | 275.5 (279.5) | 216.6 (219.2) | 241.67 (243.67) | 247 (249) |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.78 (49) | Superhost |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed |  |  |  |  |  | 185 |  |  |  |  | 145.33 |  |  |  |  |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  |  |  |  |  |  |  | 238.5 | 264 | 285.5 (283.5) | 209 | 274 (270.5) | 220.8 | 251.67 | 255 (253.67) |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift |  | 411 | 411 |  | 425.5 |  |  | 433.5 |  |  |  | 450 |  |  |  |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking on premises | 188.5 | 188 | 188 |  |  |  |  | 259 |  |  | 254 |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | Lift/Paid parking on premises/balcony/Guest favourite |  |  |  | 403 |  |  | 394 |  |  |  |  | 331.5 |  |  |  |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking on premises |  |  |  |  |  | 185 |  |  |  |  | 151.67 |  |  |  |  |
| **Comp median (n)** | | | 4.78 (13) | | **188.5** (1) | **236** (3) | **207** (3) | **403** (1) | **425.5** (1) | **185** (2) | **394** (1) | **259** (5) | **266** (2) | **285.5** (1) | **226** (7) | **303.5** (4) | **220.8** (3) | **251.67** (3) | **255** (3) |
| Wider 2-bed sample median (n) | | | | | 213 (5) | 236 (9) | 226 (13) | 247.5 (4) | 309.25 (10) | 216 (6) | 337.5 (4) | 266.5 (18) | 277.5 (13) | 343 (13) | 241 (37) | 301 (11) | 285.2 (15) | 290.67 (19) | 324.16 (18) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.7 (10)** | | | | | **212.5** | **201** | **204** | not returned | not returned | **301** | **336** | not returned | **282** | **289.5** | **241** | **281.5** | **216.8** (strike £1,187 -> £1,084) | **258.33** | **256.33** |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | | | | **221** | **209** | **212** | not returned | not returned | **310** | **406** | not returned | **270** | **277.5** | **230.33** | **270.5** | **206.6** (strike £1,131 -> £1,033) | **247** | **245** (strike £806 -> £735) |

#### P20

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 10-12 Nov | 13-15 Nov | 13-16 Nov | 16-18 Nov | 20-23 Nov | 5-6 Dec | 5-8 Dec | 9-11 Dec | 14-17 Dec | 14-19 Dec | 23-27 Dec | 26-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost |  |  | 281 |  | 281 |  | 281 |  | 281.33 | 278 | 281 (279) | 281.75 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises |  |  |  |  |  |  |  |  |  |  | 334.75 |  |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises | 347 |  |  |  |  |  |  |  |  |  | 388.5 |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (56) | Lift | 278.5 |  |  |  | 305.33 (324) |  | 361 |  | 342 | 346.8 | 415.5 (414) | 497.25 (499.75) |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony |  |  | 424 |  | 382.67 |  | 382.67 |  | 382.67 | 378.6 | 380.25 | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony |  |  |  |  | 338.67 | 567 | 392.33 |  | 425.67 | 439.6 | 505.75 | 595.5 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises |  |  |  | 281.5 | 276.33 |  |  | 281.5 | 261.67 | 249.8 |  |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony |  |  | 368.67 |  | 333.33 |  | 333.33 |  | 333.33 | 327.8 | 329.75 | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/Paid parking on premises/balcony (replaces 1384811870668527117, inactive next 60 days) |  |  |  |  | 279.67 (281.33) |  |  |  | 307.33 (304) | 325.2 | 369.5 (367.75) | 448.5 (439.75) |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost | 188 |  |  |  |  |  |  |  | 222.33 (218.67) |  | 239.5 (244.25) | 320.75 (326.75) |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises | 288.5 |  |  | 264 |  |  |  | 264 | 250 | 238.4 |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 270 | 310 | 290 | 270 | 290 |  | 283.33 | 290 | 306 | 291.8 | 360 | 360 |
| **Comp median (n)** | | | 4.8 (18) | | **278.5** (5) | **310** (1) | **329.34** (4) | **270** (3) | **297.66** (8) | **567** (1) | **347.16** (6) | **281.5** (3) | **306.66** (10) | **325.2** (9) | **364.75** (10) | **370.12** (8) |
| Wider 2-bed sample median (n) | | | | | 274.25 (14) | 298 (7) | 292.5 (12) | 259.75 (16) | 285.5 (14) | 567 (1) | 326.67 (13) | 290 (11) | 279.67 (29) | 278 (25) | 364.75 (18) | 380.5 (13) |
| **Ours 3547481 (Airbnb 1791529331262420081) New, 0 reviews** | | | | | not returned | **265.5** | **236.33** | **245.5** | **233.67** | not returned | not returned | not returned | **296.67** | **281** | not returned | **423** |

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### What changed since 8 Nov 06:00Z
**Reyhan, 8 Nov 12:39:28Z** (`get_user_logs`; confirmed by `get_listing_date_overrides` 3064856): **10-20 Dec override changed from -2% to -5%**, min 2, on both twins (3090701 "copied from parent listing"). This undoes the 7 Nov change from -7% to -2%. PriceLabs on 14 Dec moved 204 to 198 (3064856) and 216 to 210 (3090701).

Other overrides are unchanged:
- 9-12 Nov: -5%. The conflict with policy (24 Oct: 0%) stays open for Corentin. **a-p13-record: not fixed.**
- 13-16 and 18-26 Nov: -2%.
- 17 Nov: +35%, min 1.
- 27 Nov: +50%, min 1.
- 1 Dec: +50% (intentional per policy).
- 7-9 Dec: -7%.
- 21-26 Dec: -5%, min 3.
- 27-31 Dec: -3%.

No new P13 bookings or cancellations (`reservations.csv` 9 Nov).

### Twins (t-p13-twins): NOT identical any more, so fixed
In the 8 Nov 12:40Z refresh (9 Nov raw) the twins' `uncustomized_price` diverged. Nothing in the logs explains it, so the cause is NOT CHECKED.

| Period | PriceLabs | Airbnb |
|---|---|---|
| **November** | 3064856 is **£10-12/night dearer**, e.g. 10 Nov 173 vs 163, 12 Nov 181 vs 171. **27 Nov: 334 vs 243 (+37%).** | 3064856 is +4.0-4.5% dearer: 10-12 Nov £418 vs £402, 11-13 Nov £424 vs £408, 17 Nov £310 vs £301. 27 Nov £406 vs £336. |
| **December** | 3090701 is about 6% dearer, e.g. 14 Dec 210 vs 198. | 3090701 is about 4.5% dearer: 10-12 Dec £564 vs £540, 18-20 Dec £563 vs £541. |

- This meets the policy `twin_listings` rule (slightly different, never identical).
- Which twin is cheaper is deprioritised by Corentin (policy `deprioritised.p13_twin_price_order`), so I do not raise the order.
- The **27 Nov gap (+37% in PriceLabs) is not "slight"**. Because both twins sell the same flat, it is the cheaper £336 listing that sells 27 Nov. Narrowing it is optional and low value (1 night).

### Price percentile, rating, review gap, supported positioning
**Rating and reviews vs comp median** (4.78, 13 reviews):
- 3090701, 4.7 (10): -0.08 stars, 3 reviews fewer; `quality_premium` **-0.032**.
- 3064856, 4.31 (13): -0.47 stars, same review count; `quality_premium` **-0.15** (the cap).

"Line" = comp median x (1 + quality premium). Comp percentile is shown where n >= 3. Otherwise the table uses the wider 2-bed sample or the PriceLabs market percentile (mkt). "PL vs P50" compares our pushed PriceLabs price with the PriceLabs 2 BR daily P50, averaged over the stay.

| Stay | Ours 3090701 / 3064856 (8 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n) | PL vs P50 | `recommend` |
|---|---|---|---|---|---|---|---|
| 9-11 Nov (from tonight) | 212.5 / 221 | 188.5 (1) | n=1 | | P40 / P80 (5) | 166 / 171 vs 200.5 (-17% / -15%) | mkt: raise +10% |
| **10-12 Nov (default Tue-Thu)** | **201 / 209** (209 / 209) | **236 (3)** | **P33 / -14.8% ; P33 / -11.4%** | **-12.0% / +4.2%** | P33 (9) | 164.5 / 175 vs 204 (-19% / -14%) | raise +10% |
| 11-13 Nov (only way to sell 12 Nov) | 204 / 212 (212 / 212) | 207 (3) | P33 / -1.4% ; P67 / +2.4% | +1.8% / +20% | P31 / P46 (13) | 168.5 / 179 vs 207 | raise +10% |
| 12-13 Nov | below min 2 | 403 (1) | | | wider 247.5 (4) | 171 / 181 vs 210 | |
| 13-15 Nov (default Fri-Sun) | booked | 425.5 (1) | comps only | | 309.25 (10) | | |
| 17 Nov (1 n) | 301 / 310 | 185 (2) | n=2 | | P67 (6) | 197 / 209 vs 204 | mkt: raise +10% |
| 27 Nov (1 n) | 336 / 406 | 394 (1) | n=1 | | P50 / P100 (4) | 243 / 334 vs 237 | mkt: raise +10% / +5% |
| **9-11 Dec (30-day point)** | booked (Booking.com 7-10 Dec) | 259 (5) | comps only | | 266.5 (18) | | |
| 10-12 Dec | 282 / 270 | 266 (2) | n=2 | | P54 / P46 (13) | 229.5 / 216.5 vs 245 (-6% / -12%) | mkt: raise +10% |
| 11-13 Dec | 289.5 / 277.5 (295.5 / 283) | 285.5 (1) | n=1 | | P23 / P15 (13) | 238 / 224.5 vs 244 | mkt: raise +10% |
| **14-17 Dec (midweek)** | **241 / 230.33** | **226 (7)** | **P71 / +6.6% ; P57 / +1.9%** | **+10.2% / +19.9%** | P49 / P32 (37) | 212 / 200.3 vs 225 (-6% / -11%) | raise +10% |
| **18-20 Dec** | **281.5 / 270.5** (287.5 / 275.5) | 303.5 (4) | P50 / -7.2% ; P0 / -10.9% | **-4.2% / +4.8%** | P45 / P27 (11) | 229 / 217 vs 245 (-7% / -11%) | raise +10% |
| **20-25 Dec (5 n)** | 216.8 / 206.6 (strikes £1,187 -> £1,084, £1,131 -> £1,033, "Long stay discount") | 220.8 (3) | P33 / -1.8% ; P0 / -6.4% | +1.4% / +10% | **P13 / P7 (15; median 285.2)** | 230.4 / 217.8 vs 255 (-10% / -15%) | raise +10% |
| **23-26 Dec (Christmas)** | 258.33 / 247 (255.67 / 244.67) | 251.67 (3) | P67 / +2.6% ; P33 / -1.9% | +6.0% / +15.5% | **P16 / P5 (19; median 290.67)** | 231.3 / 218.7 vs 266.7 (-13% / -18%) | raise +10% |
| 24-27 Dec | 256.33 / 245 (strike £806 -> £735) | 255 (3) | P67 / +0.5% ; P0 / -3.9% | +3.9% / +13% | **P11 / P0 (18; median 324.16)** | 229 / 216.3 vs 275 (-17% / -21%) | raise +10% |

Our Airbnb prices moved since 8 Nov:
- November: 3090701 fell 3.8% (twin divergence); 3064856 is flat.
- December: both fell 2% (Reyhan's -5% on 10-20 Dec).
- Christmas: both rose 1%.

Comps were flat (same-comp median change 0% to -0.6%). The exception is 1761224847419174970, which cut 10-12 Nov from £246.5 to £236 (-4.3%).

**Airbnb factor** (for the channel section) = (our all-in - £150) / PriceLabs:
- 0.765-0.766 on November stays.
- 0.90 on 2-3 night December stays.
- 0.811 on 20-25 Dec.
- 9-11 Nov shows 0.83-0.85, but the 9 Nov PriceLabs price is from the pre-push 8 Nov raw, so it is uncertain.

**Supported positioning (one line each):**
- **10-12 Nov:** 3090701 is P33, 12% under its line, so **+10% is supported** (`recommend` raise +10%, lead +33 pts). 3064856 is 4% above its line: **hold**. The flat sells at whichever twin is cheaper, so the 3090701 raise is the one that matters. Removing the remaining 9-12 Nov -5% (policy says 0%) gives about +5%; that conflict is Corentin's to confirm.
- **11-13 Nov / 12 Nov:** both twins are at or above their lines: **hold**.
- **December, 10-20 Dec, Reyhan's new -5%:**
  - Midweek 14-17 Dec: we are P57-P71 of n=7 and 10-20% above our lines, so the evidence **supports holding at -5%** (no raise).
  - Weekend 18-20 Dec: 3090701 is 4% under its line and P50, so the evidence **supports going back to -2% (+3%) on Fri-Sat 18-19 Dec only**.
  - Against market, PriceLabs is 6-12% under P50 on both. The cut is acceptable midweek and not supported on the weekend.
- **Christmas (20-26 Dec, a 7-night open block; 27 Dec onward booked):**
  - The kept comps that are still open (n=3: 4.27, 4.76 and 4.82 ratings) put us at our line or above it.
  - But 7 of the 10 active comps are already gone for 23-26 Dec. The wider sample (n=15-19) has us at P0-P16, and PriceLabs is 10-21% under market P50.
  - The evidence supports **removing the 21-26 Dec -5% (about +5%) on both twins**. It does not support the full +10% from `recommend`, because the comps still open are priced at our level. **a-peak-check (P13): not fixed.**
- 25-26 Dec arrivals are still impossible (min 3, 27 Dec booked).

## P20 Waterford Court, 2-bed, max 4 (Airbnb 1791529331262420081, New, 0 reviews)

### What changed since 8 Nov 06:00Z
**Reyhan, 8 Nov 12:40:48Z and 12:41:16Z:** **-5% re-added on 13-17 Nov and 20-24 Nov**, min 2 (overrides confirmed). This reverses Reyhan's own 7 Nov removal.
- On PriceLabs: 13 Nov 285 to 265, 14 Nov 246 to 233, 20 Nov 252 to 239.
- On Airbnb: 13-16 Nov £245 to **£236.33** (-3.5%), 20-23 Nov £243 to **£233.67** (-3.8%).

Policy conflicts (reported for Corentin, not a new proposal):
- 13-17 Nov -5% now matches policy (24 Oct: -5% on 31 Oct-19 Nov).
- **20-24 Nov -5% is outside that range.**
- Min 2 still conflicts with policy min 3 to 30 Nov.

**Price drop across all dates, not in the logs:** the ratio price / `uncustomized_price` fell from about 0.87 to 0.83 between the 7 Nov 12:33Z and 8 Nov 12:41Z refreshes, including dates with no override (e.g. 5 Jan 258 to 242, 28 Dec 533 to 501).
- `get_customizations` shows occupancy-based adjustment on (Aggressive profile), Booking Recency Factor at default (gradual 5-15%), and last-minute "No Discount".
- The likely cause is the occupancy-based adjustment, but this is NOT CONFIRMED.
- Effect: 14-17 Dec £314 to **£296.67**, 26-30 Dec £447.25 to **£423** on Airbnb.

Other open items:
- **t-p20-5dec-orphan: not fixed.** 5 Dec is still min 3, `unbookable`=1, price 281 (≈P67 of market: P25/P50/P75 194/231/300; occupancy 37.8%).
- **t-p20-delivery: still open.** 18-19 Nov are "Blocked" in PriceLabs, while policy records the delivery block as 20-22 Nov. 20-23 Nov sells on Airbnb today.
- No new P20 bookings.

### Price percentile, rating, review gap, supported positioning
Comp median rating is 4.8, with a median of 17.5 reviews. We have no rating and 0 reviews, so `quality_premium` = 0.0. The line uses a **-15% new-listing allowance**, which is my judgement, not the function's output.

| Stay | Ours Airbnb 9 Nov (8 Nov) | Comp median (n) | Comp pctl / vs median | vs line (-15%) | Wider pctl (n) | PL vs P50 (mkt pctl) | Factor | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 10-12 Nov (default Tue-Thu) | booked | 278.5 (5) | comps only | | 274.25 (14) | | | |
| 13-15 Nov (default Fri-Sun) | 265.5 | 310 (1) | n=1 | | P43 (7; 298) | 249 vs 216.5 (+15%, P61) | 0.765 | mkt: raise +10% |
| **13-16 Nov** | **236.33** (245) | **329.34 (4)** | **P0 / -28.2%** | **-15.6%** | P8 (12) | 243.3 vs 214.7 (+13%, P60) | 0.766 | raise +10% |
| 16-18 Nov | 245.5 (253.5) | 270 (3) | P0 / -9.1% | +7.0% | P44 (16) | 222.5 vs 209.5 (+6%) | 0.766 | raise +10% |
| **20-23 Nov** | **233.67** (243) | **297.66 (8)** | **P0 / -21.5%** | **-7.6%** | P0 (14) | 240 vs 215 (+12%, P59) | 0.765 | raise +10% |
| **5 Dec (gap night)** | unbookable (min 3) | 567 (1) (1-night 5-6 Dec) | n=1 | | n=1 | 281 vs 231 (P67) | | see above |
| 5-8 Dec | booked from 6 Dec | 347.16 (6) | comps only | | 326.67 (13) | | | |
| 9-11 Dec (30-day point) | booked | 281.5 (3) | comps only | | 290 (11) | | | |
| **14-17 Dec** | **296.67** (314) | **306.66 (10)** | **P40 / -3.3%** | +13.8% | P59 (29) | 274 vs 219.7 (+25%, P70) | 0.900 | raise +10% |
| **14-19 Dec (all 5 open nights)** | **281** | **325.2 (9)** | **P33 / -13.6%** | +1.7% | P52 (25) | 278.8 vs 223.8 (+25%, P70) | 0.900 | raise +10% |
| 23-27 Dec | booked (19-26 Dec) | 364.75 (10) | comps only | | 364.75 (18) | | | |
| **26-30 Dec (min 4)** | **423** (447.25) | **370.12 (8)** | **P62 / +14.3%** | +34% | P54 (13) | 428.2 vs 260.2 (+65%, >P75) | 0.900 | raise +5% (test step) |

Comps were flat (same-comp median change 0%). The exception is 1316210326145130709 (Lift, 4.84/56), which cut 20-23 Nov from £324 to £305.33 (-5.8%).

**Supported positioning (one line each):**
- **13-16 Nov (P0, -28%) and 20-23 Nov (P0 of n=8, -21.5%):**
  - We are 16% and 8% below even the -15% allowance. With leads of +15 / +16 pts, **+10% is supported**, about **+£24/night all-in**.
  - Reyhan's re-added -5% goes against the evidence.
  - For 13-17 Nov it is Corentin's 24 Oct decision (conflict to confirm). For 20-24 Nov the evidence supports **removing the -5%**.
  - The structural gap is the Airbnb factor of 0.766 on a PriceLabs price that is already at market P59-P61.
- **16-18 Nov:** P0 of only 3 comps, but 7% above the allowance line: **hold**.
- **14-17 Dec (P40) and 14-19 Dec (P33, +1.7% vs line):** at the allowance line, so **hold** (no raise for a 0-review listing). The unexplained PriceLabs drop of about 4% took 14-17 Dec from P55 yesterday to P40 today. If the cause is not intended, restoring it is supported.
- **26-30 Dec (P62, +14%, PriceLabs above market P75):** **hold**. The +5% from `recommend` comes only from the occupancy lead; with 0 reviews the comps do not support it.
- **5 Dec:** open **min-stay 1 at the current 281**. Policy's min-3 rule ends 30 Nov. The only 1-night comp is £567, so the evidence (n=1) supports neither a cut nor a raise. About £251 room if it sells on Airbnb at the 0.90 factor.

## P10 Hanger Lane, 1-bed (3318177)
- No sellable nights. `reservations.csv` 9 Nov: a confirmed Airbnb booking 18 Oct-19 Nov covers every night up to the handback (policy last night 18 Nov).
- No PriceLabs edits (`get_user_logs`).
- No comps or positioning.

## P02 Ladbroke Grove, P03 Bayswater
Blocked on purpose (policy `intentional_blocks`). No positioning. P02 smoobu pushed 9 Nov 00:24Z; the Vrbo copy was last pushed 24 Feb. Not raised (blocked).

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or Smoobu (`kpi_summary.md` 9 Nov: collect-data, no data). Own price, percentile, rating gap and premium: **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (comps and our displayed prices); the analysis is Airbnb only. Comp cancellation policies NOT CHECKED.
2. **Thin comp coverage** (labelled; wider-sample or market percentiles used instead):
   - P13: n=1-2 on 9-11, 12-13, 13-15, 17 and 27 Nov, and on 10-12 and 11-13 Dec. Christmas is n=3, and those 3 are the cheap end of the set.
   - P20: n=1 on 13-15 Nov and 5-6 Dec.
3. **P13 1411449348357673454 was not returned on any stay today.** Activity NOT CHECKED; it is kept, not replaced.
4. **P13 twin divergence** (8 Nov 12:40Z refresh: `uncustomized_price` differs, 27 Nov +37%): cause NOT CHECKED.
5. **P20 price drop of about 4% on all dates** (price / uncustomized 0.87 to 0.83): probably the occupancy-based adjustment, NOT CONFIRMED.
6. **9 Nov night:** not in the 9 Nov raw, so the 9-11 Nov factor uses pre-push prices. Smoobu `/api/rates` NOT CHECKED.
7. **Comps' cleaning split is unknown**, so all-in gaps on 1-night stays (17 Nov, 27 Nov, 5 Dec) overstate ours.
8. The P13 Airbnb-to-Smoobu id mapping is "likely / probable" (policy `airbnb_listings_24oct`).
9. P16, P18 and P19 have no data; P10 has no sellable nights.
