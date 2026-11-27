# Competitor positioning: WEST + HERTS (D = 2026-11-27)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** I read `data/policy.json` first. Everything was read-only. PriceLabs: 6 read calls, all returned 200. **Process breach to report:** calls 1-4 were sent one per message, but **calls 5 and 6 (`get_customizations` for the two twins) went out together in one message**. That breaks the one-at-a-time rule. Both are read-only and both returned normally.
1. `get_user_logs` (listing, 26-27 Nov) for 3064856, 3090701 and 3547481: **0 entries**. There has been no date-override or base/min/max edit on any of the three since Reyhan's P20 24 Nov edit. The log does not cover customizations.
2. `get_listing_date_overrides` 3547481 (27 Nov-31 Jan): **unchanged vs 26 Nov.**
   - 27-30 Nov: -10%, min 3.
   - 1-20 Dec: 0%, min 3.
   - **5 Dec and 26 Dec: +100%, min 1** (last updated 18 Nov).
   - 21-25 Dec: -5%.
   - 27-31 Dec: min 5-6.
   - 1-31 Jan: -5%, min 3.
3. `get_neighbourhood_data` (detail, future prices + occupancy) for 3547481. Compset: Nearby Listings 1-3 BR (269). 2 BR median **253** (n=147; 26 Nov 252, n=148).
4. `get_neighbourhood_data` (detail) for 3064856. 2 BR median **217** (n=116; 26 Nov 220). This matches the Dispatcher's `raw/neighbourhood_P13.json`.
5. and 6. `get_customizations` for 3064856 and 3090701: **unchanged.** 3064856 still has the "Aggressive" custom occupancy table and 3090701 "Market Driven". Last-minute (0%, 14 d), far-out (+30% after 150 d), booking recency (default) and demand factor (conservative) are the same on both.

Saved in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/cw27/`: `nb_3547481.json`, `nb_3064856.json`, `mkt_P20.json`, `mkt_P13.json`, `rooms.json`, `res2_P13.json`, `res2_P20.json`, `rows.json`.

**Own prices** come from `raw/prices_*.json` (27 Nov). Last refresh: twins **06:09:48-49Z**, P20 **06:34:02Z**. No listing-log entry sits behind either refresh (call 1). Airbnb follows the `price` field.

**Bookings for P13/P20** (`reservations.csv`, 27 Nov). There is one new row: the P20 Airbnb booking for 5-6 Dec, made 26 Nov.
- Room £426.00, cleaning £150, commission £89.28.
- It replaces the 5-6 Dec stay that was cancelled earlier (made 20 Nov, £343.33).
- There is no new P13 row.

**Occupancy for `recommend`** (`pl_kpis.csv`, 27 Nov):
- P13 30 d: **63% vs 46% (+17 pts)**.
- P20 30 d: **80% vs 38% (+42 pts)**.

**OTAs:**
- **Airbnb:** I read listing pages at **2026-11-27 07:20:56-07:21:32Z** (26 pages, all HTTP 200). Searches ran **07:22:02-07:27:56Z** with plain `curl`: the same scripts, boxes, comp ids and 4-adult search as 18-26 Nov. There were 0 HTTP failures and no bot check.
- **Booking.com: NOT CHECKED.** One plain search at 07:22:07Z returned the AWS WAF challenge (HTTP 202). I did not retry or bypass it.

**Method** (unchanged):
- **Price** = Airbnb all-in total / nights, after any offer shown. It includes **£150 cleaning** plus any Airbnb guest fee. Taxes are not shown separately.
- **Line** = comp median x (1 + `quality_premium`).
  - Twins: `quality_premium(4.36, 4.78)` = `quality_premium(4.31, 4.78)` = **-0.15** (cap).
  - P20: `quality_premium(5.0, 4.80)` = +0.08. I keep a judgement line of median x 0.85 instead, because 3 reviews prove nothing yet. Both lines are shown.
- **Factor** = (Airbnb total - £150) / sum of PriceLabs `price`.
- The "Wider 2-bed sample" medians and the "Wider pctl" columns include our own listing where it was returned (one value out of 16-56), as on 26 Nov. The P20 5 Dec and 26 Dec wide percentiles quoted in the text exclude ours.

**Default stays:**
- Next Fri-Sun = **27-29 Nov** (today, same rule as on 20 Nov).
- Midweek Tue-Thu = **1-3 Dec**.
- 30 days out = **27-29 Dec**, which replaces 26-28 Dec.
- All three are booked or blocked for us on both properties, so those columns are comps only.
- Requested stays:
  - P13: 13-21 Dec (13 variants), plus 5-8 and 14-17 Jan.
  - P20: 5 Dec (now **as sold**), 14-17, 14-19 and 16-19 Dec, 26 Dec, and 26-30 Dec.

**Comp sets: same ids as 18-26 Nov (`comps.json`). None replaced; all 23 active.**
- 22 comps were returned on at least one priced stay.
- P20 789954794593691037 was again returned on no priced stay. The activity probe (0.2 km box) found it bookable 7-10 Dec and 8-11 Jan at **£1,180 / 3 n** each (checked 07:25:48-50Z). Those 2 rows are written as `P20:probe`, and it stays in the set.
- P13 1568189670839493789 was not returned on any 16-22 Dec stay (26 Nov: returned on 7). It was returned in January, so it is active. My reading is that it is booked or min-stay on those dates (NOT CHECKED).

**Ratings and reviews** (listing pages 27 Nov 07:21Z):
- Ours unchanged: 3090701 4.36 (11), 3064856 4.31 (13), P20 5.0 (3).
- One comp changed: P20 1316210326145130709, 57 -> **58** reviews.
- Comp-set medians unchanged: P13 **4.78** / **14** reviews; P20 **4.80** / **17.5**.
- Review gap vs comp median: 3090701 **-3**, 3064856 **-1**, P20 **-14.5**.
- Three P13 comps show 4.85 (13). I checked each page's own `guestSatisfactionOverall` and `reviewCount`; their sub-scores differ, so this is a coincidence, not a parse error.

**P20 Airbnb guest count: still 6 (9th day).** `personCapacity` is **6** on our listing page (27 Nov 07:21Z, 4 occurrences), but policy `listing_facts.P20.max_guests` = 4. It stays **confirm or revert** for Corentin; I propose nothing. Searches ran at 4 adults and the comps sleep 4-5, so the numbers are unaffected. Booking.com capacity is NOT CHECKED (WAF).

**Same comps vs 26 Nov:**
- **P13:** 48 comp pairs priced both days. All are within ±4.5% except 1016465248942791796 on 1-3 Dec (259.00 -> 232.00, **-10.4%**, a default stay we cannot sell).
  - Mix changes moved two medians. On 13-16 Dec, 1761224847419174970 dropped out and 1436773605049626293 came in: median 237.00 -> **224.50**. On 16-19 Dec, 1568189670839493789 dropped out: 240.83 -> **245.33**.
- **P20:** 37 pairs, all within **±3.3%**. The largest move is 1568001017881493647 on 26-30 Dec (+3.3%).
- **Ours, P13:** +0.2% to +0.8% on every December stay, ±0.3% in January. Yesterday's flip has held.
- **Ours, P20:**
  - 14-19 Dec -1.7% and 16-19 Dec -2.7%. 18 Dec `price` fell 348 -> **317**; `user_price` 348 and `uncustomized_price` 349 are unchanged. The cause is NOT CHECKED.
  - 26 Dec -0.3% (659 -> 657).

**Rows written:**
- **1,101 rows** appended to `data/snapshots/2026-11-27/comps.csv` under `flock` on `.comps.csv.lock`. The file had already been copied forward by another agent. The rows break down as:
  - Kept comps: P13 176 (11 x 16 stays), P20 108 (12 x 9).
  - Ours: `P13:ours` 32, `P20:ours` 10 (9 displayed + **1 as-sold row for 5 Dec at £576 all-in**).
  - Activity probe: `P20:probe` 2.
  - Wider 2-bed sample: `P13:wide` 514, `P20:wide` 259.
  - A blank price with "NOT RETURNED" in `source` means the comp was not returned for that stay.
- **26 rows** appended to `channel_checks.csv` (our Airbnb displayed prices) under `.channel_checks.csv.lock`. I copied the file forward from 26 Nov first, because it was absent.
- To find my rows, filter `source` on "comp-west", "checked 2026-11-27" and "stay <ci> to <co>". No reservation guest counts are written; "adults 4" is the search parameter.

**Recompute check:** `snapshot.load('2026-11-27')` plus `comp_summary` filtered by stay matches the tables:
- P13 13-16 Dec: n=4, median 224.50, 3090701 P0, -16.0%.
- P13 16-19 Dec: n=5, median 245.33, P0, -19.8%.
- P13 5-8 Jan: n=8, median 211.33, P38, -2.5%.
- P20 14-19 Dec: n=7, median 291.80, P29, -8.5%.
- P20 26-27 Dec: n=1, median 494.00, P100, +33.0%.

## Comp tables (Airbnb all-in £/night, 4 adults, checked 2026-11-27 07:22-07:28Z)
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- Ours "not returned" means booked, blocked or below min stay:
  - P13: 27-29 Nov, 1-3 Dec and 27-29 Dec hit bookings or blocks. 13-15 and 19-21 Dec are below min 3 on the check-in night.
  - P20: 27-29 Nov and 1-3 Dec are booked. **5-6 Dec is now booked (sold £426 room + £150 = £576 all-in)**. 27-29 and 26-30 Dec hit the 27 Dec check-in (min 6).
- Strikethroughs are Airbnb's own display on that search; their cause is NOT CHECKED.

#### P13
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 27 Nov-29 Nov | 1 Dec-3 Dec | 13 Dec-15 Dec | 13 Dec-16 Dec | 14 Dec-16 Dec | 16 Dec-19 Dec | 17 Dec-20 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec | 19 Dec-22 Dec | 20 Dec-22 Dec | 18 Dec-22 Dec | 13 Dec-22 Dec | 27 Dec-29 Dec | 5 Jan-8 Jan | 14 Jan-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.85 (13) | Garden view/balcony; Guest favourite; free cancellation |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.85 (13) | Paid parking; Guest favourite; free cancellation |  |  | 244 | 235.67 | 244 | 245.33 |  |  |  |  |  |  |  |  | 235.67 | 235.67 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking; garden; free cancellation |  | 236 | 236 | 218.67 | 236 | 224 |  | 232.33 | 248.5 |  |  |  |  |  | 218.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  | 227.5 |  |  | 270 |  |  |  |  |  |  |  |  |  | 214 | 225.33 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.74 (53) | Superhost; 2 bath |  | 222.5 |  |  |  |  |  |  |  |  |  |  |  |  | 196 | 199.67 |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | Garden |  |  |  |  | 162.5 |  |  |  |  |  |  |  |  |  | 135.67 | 154.67 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.78 (18) | none listed |  |  | 233.5 | 208.67 | 233.5 | 210.67 | 214.33 | 214.33 | 239 | 212 | 233.5 | 200.25 | 161 | 284.5 | 208.67 | 208.67 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5 (10) | Lift; skyline view |  |  |  |  |  | 450.67 | 456.67 |  |  |  |  |  |  |  | 419.33 | 430.33 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking |  | 232 | 234.5 | 230.33 | 252 |  |  |  |  |  |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5 (14) | Lift/paid parking/balcony/panoramic view; Guest favourite; free cancellation |  |  |  |  |  | 363.67 | 363.67 |  |  |  |  |  |  |  |  | 316.67 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking; garden |  |  |  |  | 162.5 |  |  |  |  |  |  |  |  |  | 141.67 | 161.67 |
| **Comp median (n)** | | | 4.78 (14) | | - (0) | **229.75** (4) | **235.25** (4) | **224.50** (4) | **236.00** (7) | **245.33** (5) | **363.67** (3) | **223.33** (2) | **243.75** (2) | **212.00** (1) | **233.50** (1) | **200.25** (1) | **161.00** (1) | **284.50** (1) | **211.33** (8) | **217.00** (8) |
| Wider 2-bed sample median (n) | | | | | 476.25 (2) | 238.00 (40) | 250.75 (38) | 240.67 (49) | 237.00 (46) | 245.67 (48) | 256.00 (40) | 271.50 (40) | 299.50 (19) | 287.33 (33) | 268.50 (27) | 263.12 (36) | 265.50 (34) | 331.00 (16) | 215.00 (52) | 216.00 (56) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.36 (11)** | | 6 | | | not returned | not returned | not returned | **188.67** | **212.50** (strike £474 -> £425) | **196.67** (strike £667 -> £590) | **202.67** | **204.33** (strike £695 -> £613) | not returned | **203.33** | **226.00** | **191.25** (strike £873 -> £765) | **162.78** (strike £1,697 -> £1,465) | not returned | **206.00** | **203.67** |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | 6 | | | not returned | not returned | not returned | **205.33** (strike £698 -> £616) | **229.00** | **214.33** | **221.33** | **223.33** | not returned | **222.00** | **244.50** (strike £548 -> £489) | **210.00** (strike £961 -> £840) | **180.44** (strike £1,884 -> £1,624) | not returned | **195.33** | **193.67** |

#### P20
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 27 Nov-29 Nov | 1 Dec-3 Dec | 5 Dec-6 Dec | 14 Dec-17 Dec | 14 Dec-19 Dec | 16 Dec-19 Dec | 27 Dec-29 Dec | 26 Dec-27 Dec | 26 Dec-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Houseboat, marina view; Superhost; Guest favourite |  |  |  | 281 | 277.8 | 281 |  |  | 280 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Terrace; free parking; Guest favourite; free cancellation |  |  |  |  |  |  |  |  | 351.25 |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (19) | Paid parking |  |  |  |  |  |  |  |  |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (58) | Lift; 2 bath |  |  |  |  |  |  |  |  | 427 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/paid parking/river view/balcony; 2 bath |  |  |  | 382.67 | 378.6 | 382.67 |  |  | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony; 12th-floor skyline |  | 299.5 |  | 324 | 334.4 | 341.33 | 424 | 494 | 417 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking |  | 306 |  | 261.67 | 249.8 | 268.67 |  |  |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/paid parking/balcony |  |  |  | 333.33 | 327.8 | 333.33 |  |  | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.53 (17) | Lift/paid parking/balcony |  |  |  | 245.33 | 259 | 273.33 |  |  |  |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/Thames view; Superhost; free cancellation |  | 188 |  | 209.33 |  |  |  |  |  |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking; townhouse |  | 288.5 |  | 250 |  |  |  |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5 (25) | Balcony; Superhost; Guest favourite | 310 | 290 |  | 306 | 291.8 | 309 | 390 |  | 360 |
| **Comp median (n)** | | | 4.80 (17.5) | | **310.00** (1) | **290.00** (5) | - (0) | **281.00** (9) | **291.80** (7) | **309.00** (7) | **407.00** (2) | **494.00** (1) | **360.00** (7) |
| Wider 2-bed sample median (n) | | | | | 703.50 (15) | 324.75 (36) | 808.50 (10) | 278.50 (48) | 286.60 (52) | 314.67 (48) | 532.25 (32) | 633.00 (19) | 422.00 (38) |
| **Ours 3547481 (Airbnb 1791529331262420081) 5 (3)** | | 6 | | | not returned | not returned | not returned | **278.67** | **267.00** (strike £1,544 -> £1,335) | **293.33** | not returned | **657.00** | not returned |

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### Twins: the 12% gap held for a second day; no edit is logged
- **13-21 Dec (9 open nights), PriceLabs `price`:**
  - 3090701: **184/180/179/183/189/202/207/196/198 = £1,718** (26 Nov £1,708, +0.6%).
  - 3064856: **206/202/200/205/212/227/232/220/222 = £1,926** (26 Nov £1,912, +0.7%).
  - **3064856 is +11.7% to +12.4% above its twin on every night** (26 Nov +11.6% to +12.3%).
- **What has not changed:**
  - No date-override or base/min/max edit is logged (call 1).
  - The customizations are unchanged (calls 5-6). 3064856 still has the Aggressive occupancy table; 3090701 Market Driven.
  - So the 26 Nov flip still has no logged cause (NOT CHECKED).
- **January (24 jointly open nights in 1-26 Jan):** 3090701 is **+6.6% to +7.5%** above 3064856. Every night is within ±1 of 26 Nov.
- **1 Dec single night (Reyhan +25%, min 1):** 3064856 **235**, 3090701 **213** (26 Nov 234 / 203). The 1-3 Dec comp median is 229.75 (n=4), but we cannot sell 1-3 Dec, so these are numbers only. The +25% vs policy +50% stays **confirm or revert**.
- **Airbnb follows PriceLabs:** the factor is 0.765-0.767 in December (lead 16-25 d) and 0.900-0.902 in January, on both twins.
  - On Airbnb, 3064856 is **+8.2% to +9.3%** above 3090701 on December stays.
  - In January 3090701 is +5.5% / +5.2% above.
- **Twin rule** (`listing_facts.P13`: "slightly different; propose narrowing the gap, never identical"): 12% in PriceLabs (about 9% on Airbnb) is more than "slightly". The proposal below narrows it to about 7%.

### 13-21 Dec: supported position about -15% vs comp median (rating cap). 3090701 is under it on the two best-covered 3-night stays; 3064856 is on or above it
| Stay | Ours 3090701 / 3064856 (26 Nov) | Comp median (n) | Pctl / vs median (3090701; 3064856) | vs line x0.85 | Wider pctl (n, median) | PL avg vs mkt P50 (mkt occ) | `recommend` (30 d, +17 pts) |
|---|---|---|---|---|---|---|---|
| 13-15 Dec (2 n) | below min 3 | 235.25 (4) | comps only | | (38, 250.75) | 182.0 / 204.0 vs 214.0 (37%) | |
| **13-16 Dec** | **188.67 / 205.33** (188.00 / 204.33) | 224.50 (4) | **P0 -16.0%**; P0 -8.5% | **-1.1%**; +7.6% | P4 / P20 (49, 240.67) | 181.0 / 202.7 vs 214.0 (34%) | raise +10% |
| **14-16 Dec (min 2)** | **212.50 / 229.00** (212.00 / 228.00) | 236.00 (**7**) | P29 -10.0%; P29 -3.0% | +5.9%; +14.2% | P24 / P33 (46, 237.00) | 179.5 / 201.0 vs 213.5 (29%) | raise +10% |
| **16-19 Dec** | **196.67 / 214.33** (195.67 / 213.00) | 245.33 (5) | **P0 -19.8%**; P20 -12.6% | **-5.7%**; +2.8% | P6 / P21 (48, 245.67) | 191.3 / 214.7 vs 231.3 (38%) | raise +10% |
| 17-20 Dec | 202.67 / 221.33 (201.67 / 219.67) | 363.67 (3; skewed: 2 of 3 are the lift/skyline comps) | P0 -44.3%; P33 -39.1% | skewed | P12 / P20 (40, 256.00) | 199.3 / 223.7 vs 241.3 (45%) | raise +10% |
| 18-21 Dec | 204.33 / 223.33 (203.00 / 221.67) | 223.33 (2) | P0 -8.5%; P50 0.0% | +7.6%; +17.6% | P10 / P17 (40, 271.50) | 201.7 / 226.3 vs 244.7 (49%) | raise +10% |
| 19-21 Dec (2 n) | below min 3 | 243.75 (2) | comps only | | (19, 299.50) | | |
| 19-22 Dec | 203.33 / 222.00 (202.33 / 220.67) | 212.00 (1) | n=1 | | P6 / P15 (33, 287.33) | 200.3 / 224.7 vs 247.0 (51%) | raise +10% / +5% |
| 20-22 Dec (min 2) | 226.00 / 244.50 (225.00 / 243.00) | 233.50 (1) | n=1 | | P22 / P33 (27, 268.50) | 197.0 / 221.0 vs 246.0 (50%) | raise +10% / +5% |
| 18-22 Dec | 191.25 / 210.00 (190.00 / 208.25) | 200.25 (1) | n=1 | | P6 / P14 (36, 263.12) | 200.8 / 225.2 vs 245.8 (49%) | raise +10% / +5% |
| 13-22 Dec (9 n, weekly -15%) | 162.78 (strike £1,697 -> £1,465) / 180.44 (strike £1,884 -> £1,624) | 161.00 (1) | n=1 | | P3 / P12 (34, 265.50) | 190.9 / 214.0 vs 230.8 (41%) | numbers only |
| 27-29 Dec (30-day default) | closed (booked/blocked) | 284.50 (1) | comps only | | (16, 331.00) | | |
| 1-3 Dec (midweek default) | closed | 229.75 (4) | comps only | | (40, 238.00) | | |
| 27-29 Nov (Fri-Sun default, today) | closed | none returned | | | (2, 476.25) | | |

**Supported (unchanged from 26 Nov):**
- **3090701: about +5% on the 13-18 Dec nights.**
- **3064856: hold (0%).**
- **Both:** about **-15% vs comp median** (rating cap: 4.36 / 4.31 vs 4.78).
- **One-line reason:** on the two 3-night stays with n=4-5 (13-16 and 16-19 Dec), 3090701 sits -1.1% and -5.7% under the rating line at P0. +5% takes it to about +2.5% and -2.2%, and it narrows the twin gap from about 12% to about 7%.

The details:
- 3064856 is +2.8% to +17.6% over the line on every stay with n of 2 or more (17-20 excluded as skewed), so no rise is argued at 4.31.
- 3064856 is P0-P50 of comps, and PriceLabs sits 5-10% under market P50 (3090701 15-20% under), so no cut is argued either.
- The n=7 stay (14-16 Dec) has 3090701 +5.9% over the line already. That is why the rise is +5%, not `recommend`'s +10%.
- `recommend`'s +10% comes from the +17-pt 30-day lead alone and ignores the rating cap.
- Reyhan's -2% (10-19 and 22-26 Dec, both twins) and the 14-16 Dec min 2 stay **confirm or revert** for Corentin, as before.

### January twins: hold both (0%); Reyhan's -8% (2-31 Jan) stays confirm or revert
| Stay | Ours 3090701 / 3064856 (26 Nov) | Comp median (n) | Pctl / vs median | vs line x0.85 | Wider pctl (n, median) | PL avg vs mkt P50 (mkt occ) | `recommend` |
|---|---|---|---|---|---|---|---|
| **5-8 Jan** | **206.00 / 195.33** (206.67 / 195.67) | 211.33 (8) | P38 -2.5%; P25 -7.6% | +14.7%; +8.7% | P44 / P38 (52, 215.00) | 173.0 / 161.3 vs 198.3 (**16%**) | raise +10% |
| **14-17 Jan** | **203.67 / 193.67** (203.67 / 193.00) | 217.00 (8) | P38 -6.1%; P25 -10.8% | +10.4%; +5.0% | P34 / P25 (56, 216.00) | 170.7 / 159.3 vs 200.7 (**12%**) | raise +10% |

**Supported: hold (0%), about -15% vs median.**
- Both twins are 5-15% over the rating line, so no rise is argued.
- At P25-P38 of comps, with a +17-pt lead, no cut is argued.
- Every January cell moved by ±0.3% or less overnight.
- Market occupancy is 12-16%, so the comps (all still unsold, £136-430) are the only price evidence.

## P20 Waterford Court, 2-bed (Airbnb 1791529331262420081, 5.0 from 3 reviews; Airbnb shows 6 guests)

There is no new edit (call 1), and the overrides are unchanged (call 2). Overnight:
- **5 Dec sold** (Airbnb, made 26 Nov).
- **14-18 Dec:** **290/304/302/335/317 = £1,548** (26 Nov £1,579; only 18 Dec moved, 348 -> 317).
- **26 Dec:** **563** (565; `uncustomized_price` 387).
- Airbnb follows `price`: 26 Dec £657 = 563 x 0.901 + 150.

"Line" = comp median x 0.85 (judgement). The tool line, median x 1.08 from `quality_premium(5.0, 4.80)`, is shown too. Market percentiles use the Nearby Listings 1-3 BR compset, which understates a 2-bed P50 (the 2 BR summary median is 253).

| Stay | Ours 27 Nov (26 Nov) | Comp median (n) | Comp pctl / vs median | vs line x0.85 / x1.08 | Wider pctl (n, median) | PL / mkt P50, P75, P90 (mkt occ) | Factor | `recommend` (30 d, +42 pts) |
|---|---|---|---|---|---|---|---|---|
| 27-29 Nov (Fri-Sun default, today) | booked | 310.00 (1) | comps only | | (15, 703.50) | | | |
| 1-3 Dec (midweek default) | booked | 290.00 (5) | comps only | | (36, 324.75) | | | |
| **5 Dec (orphan, 1 n) AS SOLD** | **576.00 all-in = £426 room + £150 cleaning** (displayed 26 Nov: £580) | none returned (**9th day**) | n=0 | | **P20** of 1-night 2-beds (10, £808.50) | room 426 / 226, 293, **424** (63%) | 426 / 562 (26 Nov PL) = **0.758** | raise-signal (no pctl) |
| 14-17 Dec | 278.67 (278.67) | 281.00 (9) | P44 / -0.8% | +16.7% / -8.2% | P50 (48, 278.50) | 298.7 / 215, 263-273 (30%) | 0.766 | raise +10% |
| **14-19 Dec (all 5 open nights)** | **267.00** (271.60; strike £1,544) | 291.80 (7) | **P29 / -8.5%** | **+7.6% / -15.3%** | P33 (51 excl. ours, 286.60) | 309.6 / 219, 263-292 (31%) | 0.766 | raise +10% |
| 16-19 Dec | 293.33 (301.33) | 309.00 (7) | P43 / -5.1% | +11.7% / -12.1% | P40 (48, 314.67) | 318.0 / 223, 273-292 (31%) | 0.765 | raise +10% |
| 27-29 Dec (30-day default) | closed (27 Dec check-in, min 6) | 407.00 (2) | comps only | | (32, 532.25) | | | |
| **26 Dec (orphan, 1 n)** | **657.00** (659.00) | **494.00 (1)** | **P100 / +33.0%** | +56.5% / +23.1% | **P61** of 1-night 2-beds (18 excl. ours, £633) | **563** / 251, 316, **436** (38%) | 0.901 | raise +5% |
| 26-30 Dec (context) | 27 Dec booked | 360.00 (7) | comps only | | (38, 422.00) | | | |

### 5 Dec as sold (Reyhan +100%, min 1): it sold at the market P90 room price
- **What sold:** £426 room = **0.758 x** the 26 Nov PriceLabs price (562). Airbnb displayed £580 all-in on 26 Nov, which is £430 room at 0.765, so the booking paid £4 less than displayed. Whether that gap is a guest fee or rounding is NOT CHECKED.
- **No like-for-like percentile:** no kept comp was returned for 5-6 Dec (9th day).
- **Against the market:**
  - £576 all-in is **P20** of the 1-night 2-bed sample (n=10, median £808.50, range £395-1,000).
  - The £426 room price is **at market P90 (424)** and 1.88x P50 (226), at 63% market occupancy, 9 days out.
- **Read:** the +100% orphan premium did sell, at about P90 room level. The like-for-like comps cannot say whether it could have gone higher. In the 1-night sample, 8 of 10 were dearer all-in (judgement; most of those are not comparable 1-night orphans).
- Policy min stay for P20 is not set in `policy.json`. The 5 Dec override is min 1 (Reyhan, 18 Nov). That belongs to the PriceLabs/occupancy owner; I raise nothing on it.

### 14-19 Dec: hold (0%). Supported position about -5% to -10% vs comp median (judgement), and we are there
- We are P29-P44 of comps, -0.8% to -8.5% vs median. That is +7.6% to +16.7% over the 0.85 line, and 8.2% to 15.3% under the tool's x1.08 line.
- The comps were stable: all 37 pairs moved within ±3.3%.
- Our 14-19 Dec fell 1.7% because 18 Dec `price` dropped 348 -> 317 while `user_price` stayed at 348. The cause is NOT CHECKED.
- PriceLabs avg 299-318 is above market P75 (263-292) at 30-31% market occupancy.
- **One-line reason:** a rise would need the 5.0 rating to count, and 3 reviews (gap -14.5) is too few. A cut is not argued because we are already 1-9% under the comp median.

### 26 Dec (Reyhan +100%, min 1): the evidence supports about -23% (to market P90, about £436 room). For Corentin as evidence; confirm or revert
- **Now:** PriceLabs 563, which is **1.29x market P90** (436; P50 251, occupancy 38%). Airbnb **£657**.
- **Like-for-like:** the only kept comp returned is 1684834789445533643 (lift/balcony, 12th-floor skyline, 4.39 from 18) at **£494** (5th day unchanged). We are **+33.0%** above it. Matching it means (494 - 150) / 0.901 = **£382** room (-32%).
- **The 5 Dec precedent:** the same +100% orphan set-up sold at the P90 room price (426 vs P90 424). On 26 Dec, P90 is 436: **-23% vs 563**. That gives Airbnb about £543 all-in, which is P44 of the 1-night sample.
- **Against a cut:**
  - n=1 comp.
  - We are **P61** of the 1-night 2-bed sample (n=18 excl. ours, median £633).
  - 26 Dec is 29 days out, against 9 days for 5 Dec.
- **Supported:** about **-23%** (range -23% to -32%). No rise is supported.
- Reyhan's +100% is not settled by policy, so it stays **confirm or revert**. I make no new proposal.

## P10 Hanger Lane, 1-bed (3318177)
Handed back: last night 18 Nov (policy `handbacks.P10`). All 60 nights in `prices.csv` (27 Nov) are unavailable. No positioning, nothing proposed.

## P02 Ladbroke Grove, P03 Bayswater
Blocked on purpose (policy `intentional_blocks`). All 60 nights in `prices.csv` (27 Nov) are unavailable for each. No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or Smoobu (no rows in `listings.csv` or `prices.csv` for 27 Nov). Own price, percentile, rating gap and premium are **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (AWS WAF challenge at 27 Nov 07:22:07Z; not retried or bypassed). That covers Booking.com comps, our Booking.com displayed prices, P20's Booking.com capacity and the twins' Booking.com gap. Comp cancellation terms come only from Airbnb pills.
2. **Process:** the two `get_customizations` calls (5 and 6) were sent in one message, which breaks the one-at-a-time rule. Both are read-only and both returned 200.
3. **Why the twins flipped on 26 Nov** (and have held for 2 days at a 12% gap) is NOT CHECKED. There is no listing-log edit and no customization change; customization history is not in the log.
4. **P20 18 Dec `price` 317 vs `user_price` 348** (new today), and the twins' `price` vs `user_price` differences (3090701 on 20 nights, 3064856 on 21): the cause is NOT CHECKED. Airbnb follows `price`.
5. **P20 5 Dec sold at £426 vs the £430 room implied by the displayed £580**: guest fee or rounding is NOT CHECKED. The PriceLabs price the guest saw at booking time on 26 Nov is inferred from the 26 Nov snapshot (562).
6. **P20 Airbnb guest count 6 vs policy 4** (9th day): who changed it is NOT CHECKED.
7. **Airbnb factors** (0.765 at 28 days or less, 0.90 beyond) are inferred from prices; the rule behind them is NOT CHECKED.
8. **Thin comp coverage.**
   - P13: n=0-4 on 27-29 Nov, 1-3 Dec, 13-15, 13-16, 17-20 (skewed), 18-21, 19-21, 19-22, 20-22, 18-22, 13-22 and 27-29 Dec.
   - P20: n=0-2 on 27-29 Nov, 5 Dec (9th day), 26 Dec and 27-29 Dec. 789954794593691037 was returned on no priced stay (it is active per the probe).
   - Only unsold comps can be priced, which biases peak medians.
9. P20's market percentiles use the 1-3 BR compset. With 3 reviews, the 0.85 line is judgement (the tool says x1.08).
10. 3090701's Airbnb mapping is still "likely" (policy `listing_facts.P13.ids`).
11. P16, P18 and P19 have no data; P02, P03 and P10 have no sellable nights.
