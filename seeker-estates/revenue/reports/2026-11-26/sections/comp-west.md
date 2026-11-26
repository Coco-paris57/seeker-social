# Competitor positioning: WEST + HERTS (D = 2026-11-26)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** I read `data/policy.json` first. Everything was read-only. PriceLabs: 6 read calls, **each sent on its own (one per message, none in parallel)**, all returned 200:
1. `get_user_logs` (listing, 24-26 Nov) for 3064856, 3090701 and 3547481: **1 entry only**, the already-reported P20 24 Nov +25% min 1 (Reyhan, 24 Nov 10:51:18Z). **No edit on any of the three since then**, and nothing on either twin since 23 Nov 00:08:04Z. This log covers date overrides and base/min/max only, not customizations.
2. `get_listing_date_overrides` 3547481 (26 Nov-31 Jan): unchanged vs 25 Nov. 26-30 Nov -10% min 3; 1-20 Dec 0% min 3; **5 Dec and 26 Dec +100% min 1** (updated 18 Nov); 21-25 Dec -5%; 27-31 Dec min 5-6; 1-31 Jan -5% min 3. (I did not re-pull the twins' overrides: call 1 shows no add/remove on either since 23 Nov.)
3. `get_neighbourhood_data` (detail, future prices + occupancy) 3547481: Nearby Listings 1-3 BR compset (270); 2 BR median **252** (n=148; 25 Nov 252, n=149).
4. `get_neighbourhood_data` (detail) 3064856: 2 BR median **220** (n=116; 25 Nov 220, n=117).
5. `get_customizations` (listing) 3064856, then 6. 3090701: **unchanged**. 3064856 has the "Aggressive" custom occupancy table; 3090701 has "Market Driven". Last-minute (0%, 14 d), far-out (+30% after 150 d) and booking recency (default) are identical.

Saved: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/cw26/nb_3547481.json`, `nb_3064856.json`, `mkt_P20.json`, `mkt_P13.json`.

**Own prices** come from `raw/prices_*.json` (26 Nov). Airbnb follows the `price` field (factor below). Last refresh: twins **26 Nov 06:09:54-55Z**, P20 **06:48:25Z**. Neither refresh has a listing-log entry behind it (call 1), so neither was triggered by a date-override or base/min/max edit. What did trigger them is NOT CHECKED.

**Bookings for P13/P20:** the `reservations.csv` rows are identical to 25 Nov, with no new booking or cancellation. `booking_status` and `min_stay` are unchanged on every night of all three price files.

**Occupancy for `recommend`** (`pl_kpis.csv`, 26 Nov):
- P13: 7 d 71% vs 58%; **30 d 63% vs 47% (+16 pts)**; 60 d 45% vs 34%.
- P20: 7 d 100% vs 50%; **30 d 80% vs 38% (+42 pts)**; 60 d 52% vs 28%.
- P20 now uses the 30-day horizon (yesterday 7-day). The priced stays are 9-30 days out, and the 7-day window is fully booked. Both horizons give the same `recommend` output.

**OTAs:**
- **Airbnb:** I read listing pages at **2026-11-26 07:22-07:23Z** (26 pages, all HTTP 200). Searches ran **07:23:40-07:33:49Z** with plain `curl`: the same scripts, boxes, comp ids and 4-adult search as 18-25 Nov. There were 0 HTTP failures and no bot check.
- **Booking.com: NOT CHECKED.** One plain search at 07:25:01Z returned the AWS WAF challenge (HTTP 202). I did not retry or bypass it.

**Method** (unchanged):
- **Price** = Airbnb all-in total / nights, after any offer shown. It includes **£150 cleaning** plus any Airbnb guest fee. Taxes are not shown separately.
- **Line** = comp median x (1 + `quality_premium`).
  - Twins: `quality_premium(4.36, 4.78)` = `quality_premium(4.31, 4.78)` = **-0.15** (cap).
  - P20: `quality_premium(5.0, 4.80)` = +0.08. I keep a judgement line of median x 0.85 instead, because 3 reviews prove nothing yet. Both lines are shown.
- **Factor** = (Airbnb total - £150) / sum of PriceLabs `price`.

**Default stays.**
- Next Fri-Sun = 27-29 Nov; midweek Tue-Thu = 1-3 Dec. Both are booked or blocked for us on both properties, so those columns show comps only.
- 30 days out = **26-28 Dec**, which replaces 25-27 Dec. It is closed for us: P13 is booked or blocked, and P20 has its 27 Dec check-in.
- Requested stays: P13 13-21 Dec in 13 variants plus 5-8 / 14-17 Jan; P20 5 Dec, 14-17 / 14-19 / 16-19 Dec, 26 Dec and 26-30 Dec.

**Comp sets: same ids as 18-25 Nov (`comps.json`); none replaced; all 23 active.**
- 22 comps were returned on at least 1 priced stay.
- P20 789954794593691037 was returned on no priced stay today. I checked it with an activity probe (0.2 km box): bookable 7-10 Dec and 8-11 Jan at **£1,180 / 3 n** each, checked 07:34:38-39Z. Those 2 rows are written as `P20:probe`. It stays in the set.

**Ratings and reviews** (listing pages 26 Nov 07:22Z):
- Ours unchanged: 3090701 4.36 (11), 3064856 4.31 (13), P20 5.0 (3).
- Two comps changed: P13 1599999559812004118 4.83 (12) -> **4.85 (13)**; P20 789954794593691037 18 -> **19** reviews.
- Comp-set medians unchanged: P13 **4.78** rating / **14** reviews; P20 **4.80** / **17.5**.
- Review gap vs comp median: 3090701 **-3**, 3064856 **-1**, P20 **-14.5**.

**P20 Airbnb guest count: still 6 (8th day).** The listing page at 26 Nov 07:22Z shows `personCapacity` **6**, but policy `listing_facts.P20.max_guests` = 4. It stays **confirm or revert** for Corentin; I propose nothing. Searches ran at 4 adults and the comps sleep 4-5, so the numbers are unaffected. Booking.com capacity is NOT CHECKED (WAF).

**Same comps vs 25 Nov:**
- P13: 56 comp pairs priced both days. All are within **±3.5%** except 1411449348357673454 on 1-3 Dec (247.50 -> 222.50, **-10.1%**, a default stay we cannot sell). 1411449348357673454 was not returned for 20-22 Dec today.
- P20: 37 pairs, all within **±7.9%**. The largest moves are 1568001017881493647 on 26-30 Dec (315.25 -> 340.00) and 6488364 (+3.6% / +4.3% on 14-19 and 16-19 Dec, after its -16% cut yesterday). 6488364 was not returned for 26-30 Dec.
- **Ours, P13: the twins moved in opposite directions.** On every December stay, 3090701 is **-5.4% to -7.6%** and 3064856 is **+3.6% to +5.1%**. January is ±0.5%.
- Ours, P20: -0.1% on December stays; **5 Dec -3.3%** (600 -> 580); **26 Dec +7.2%** (615 -> 659).

**Rows written:**
- **1,102 rows** appended to `data/snapshots/2026-11-26/comps.csv` under `flock` on `.comps.csv.lock`. The file had already been copied forward by another agent. The rows break down as:
  - Kept comps: P13 176 (11 x 16 stays), P20 108 (12 x 9).
  - Ours: `P13:ours` 32, `P20:ours` 9.
  - Activity probe: `P20:probe` 2.
  - Wider 2-bed sample: `P13:wide` 508, `P20:wide` 267.
  - A blank price with "NOT RETURNED" in `source` means the comp was not returned for that stay.
- **27 rows** appended to `channel_checks.csv` (our Airbnb displayed prices) under `.channel_checks.csv.lock`.
- To find my rows, filter `source` on "comp-west", "checked 2026-11-26" and "stay <ci> to <co>". No reservation guest counts are written; "adults 4" is the search parameter.

**Recompute check:** `snapshot.load('2026-11-26')` plus `comp_summary` filtered by stay matches the tables. The checked stays are 13-16 Dec (n=4, median 237.00, 3090701 P0 -20.7%), 16-19 Dec (n=6, 240.83, P0 -18.8%), 5-8 Jan (n=8, 211.33, P38 -2.2%), P20 14-19 Dec (n=7, 291.80, P29 -6.9%) and P20 26-27 Dec (n=1, 494.00, P100 +33.4%).

## Comp tables (Airbnb all-in £/night, 4 adults, checked 2026-11-26 07:23-07:34Z)
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- Ours "not returned" means booked, blocked or below min stay:
  - P13: 27-29 Nov, 1-3 Dec and 26-28 Dec hit bookings or blocks. 13-15 and 19-21 Dec are below min 3 on the check-in night.
  - P20: 27-29 Nov and 1-3 Dec are booked. 26-28 and 26-30 Dec hit the 27 Dec check-in (min 6).
- Strikethroughs are Airbnb's own display on that search; their cause is NOT CHECKED.

#### P13
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 27 Nov-29 Nov | 1 Dec-3 Dec | 13 Dec-15 Dec | 13 Dec-16 Dec | 14 Dec-16 Dec | 16 Dec-19 Dec | 17 Dec-20 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec | 19 Dec-22 Dec | 20 Dec-22 Dec | 18 Dec-22 Dec | 13 Dec-22 Dec | 26 Dec-28 Dec | 5 Jan-8 Jan | 14 Jan-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.85 (13) | Garden view/balcony; Guest favourite; free cancellation |  |  |  | 248.33 |  |  |  |  |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.85 (13) | Paid parking; Guest favourite; free cancellation |  |  | 244 | 235.67 | 244 | 246.67 |  |  |  |  |  |  |  |  | 235.67 | 235.67 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking; garden; free cancellation |  | 236 |  |  |  | 224.67 |  | 233.67 | 249.5 |  |  |  |  |  | 218.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  | 227.5 |  |  | 270 | 235 | 245.33 | 248.67 | 275.5 | 243.67 | 260 | 231.5 |  | 258.5 | 214 | 225.33 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.74 (53) | Superhost; 2 bath |  | 222.5 |  |  |  |  |  |  |  |  |  |  |  |  | 196 | 200 |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | Garden |  |  |  |  | 162.5 |  |  |  |  |  |  |  |  |  | 135.67 | 154.67 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.78 (18) | none listed |  |  | 233.5 | 208.67 | 233.5 | 210.33 | 213.67 | 213.67 | 238.5 | 212 | 233.5 | 199.75 | 160.78 | 254.5 | 208.67 | 208.67 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5 (10) | Lift; skyline view |  |  |  |  |  | 450.67 | 456.67 |  |  |  |  |  |  |  | 419.33 | 430.33 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking |  | 259 | 240.5 | 238.33 | 264 |  |  |  |  |  |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5 (14) | Lift/paid parking/balcony/panoramic view; Guest favourite; free cancellation |  |  |  |  |  | 363.67 | 363.67 |  |  |  |  |  |  |  |  | 316.67 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking; garden |  |  |  |  | 162.5 |  |  |  |  |  |  |  |  |  | 141.67 | 161.67 |
| **Comp median (n)** | | | 4.78 (14) | | - (0) | **231.75** (4) | **240.50** (3) | **237.00** (4) | **238.75** (6) | **240.83** (6) | **304.50** (4) | **233.67** (3) | **249.50** (3) | **227.83** (2) | **246.75** (2) | **215.62** (2) | **160.78** (1) | **256.50** (2) | **211.33** (8) | **217.00** (8) |
| Wider 2-bed sample median (n) | | | | | 476.25 (2) | 238.00 (41) | 262.50 (39) | 240.67 (46) | 243.75 (46) | 251.50 (50) | 273.67 (43) | 269.67 (37) | 287.50 (19) | 292.00 (35) | 270.75 (28) | 260.75 (39) | 259.61 (36) | 334.00 (13) | 216.00 (53) | 227.83 (50) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.36 (11)** | | 6 | | | not returned | not returned | not returned | **188.00** | **212.00** | **195.67** | **201.67** | **203.00** (strike £690 -> £609) | not returned | **202.33** | **225.00** (strike £503 -> £450) | **190.00** | **161.89** (strike £1,688 -> £1,457) | not returned | **206.67** | **203.67** |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | 6 | | | not returned | not returned | not returned | **204.33** (strike £695 -> £613) | **228.00** | **213.00** (strike £726 -> £639) | **219.67** (strike £749 -> £659) | **221.67** (strike £755 -> £665) | not returned | **220.67** | **243.00** | **208.25** | **179.22** (strike £1,871 -> £1,613) | not returned | **195.67** | **193.00** |

#### P20
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 27 Nov-29 Nov | 1 Dec-3 Dec | 5 Dec-6 Dec | 14 Dec-17 Dec | 14 Dec-19 Dec | 16 Dec-19 Dec | 26 Dec-28 Dec | 26 Dec-27 Dec | 26 Dec-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Houseboat, marina view; Superhost; Guest favourite |  |  |  | 281 | 277.8 | 281 |  |  | 280 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Terrace; free parking; Guest favourite; free cancellation |  |  |  |  |  |  |  |  | 340 |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (19) | Paid parking |  |  |  |  |  |  |  |  |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (57) | Lift; 2 bath |  |  |  |  |  |  |  |  | 424.75 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/paid parking/river view/balcony; 2 bath |  |  |  | 382.67 | 378.6 | 382.67 |  |  | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony; 12th-floor skyline |  | 308.5 |  | 324 | 334.4 | 341.33 | 410 | 494 | 417 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking |  | 306 |  | 261.67 | 249.8 | 268.67 |  |  |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/paid parking/balcony |  |  |  | 333.33 | 327.8 | 333.33 |  |  | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.53 (17) | Lift/paid parking/balcony |  |  |  | 248 | 259.4 | 273.67 |  |  |  |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/Thames view; Superhost; free cancellation |  | 188.5 |  | 214.33 |  |  | 255 |  |  |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking; townhouse |  | 288.5 |  | 250 |  |  | 264 |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5 (25) | Balcony; Superhost; Guest favourite | 310 | 290 |  | 306 | 291.8 | 309 | 390 |  | 360 |
| **Comp median (n)** | | | 4.80 (17.5) | | **310.00** (1) | **290.00** (5) | - (0) | **281.00** (9) | **291.80** (7) | **309.00** (7) | **327.00** (4) | **494.00** (1) | **360.00** (7) |
| Wider 2-bed sample median (n) | | | | | 755.50 (16) | 306.00 (38) | 800.00 (11) | 278.67 (47) | 288.20 (53) | 321.83 (54) | 452.50 (36) | 633.00 (19) | 436.38 (38) |
| **Ours 3547481 (Airbnb 1791529331262420081) 5 (3)** | | 6 | | | not returned | not returned | **580.00** (strike £656 -> £580) | **278.67** | **271.60** (strike £1,572 -> £1,358) | **301.33** | not returned | **659.00** | not returned |

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### Twins: the order flipped overnight, the gap widened to about 12%, and no edit is logged
- **13-21 Dec (9 open nights), PriceLabs `price`:**
  - 3090701: **183/179/178/182/189/200/205/195/197 = £1,708** (25 Nov £1,863, **-8.3%**).
  - 3064856: **205/201/199/204/211/224/230/218/220 = £1,912** (25 Nov £1,809, **+5.7%**).
  - **3064856 is now +11.6% to +12.3% above its twin on every night.** On 25 Nov, 3090701 was +2.6% to +3.2% above.
- **`uncustomized_price` moved the same way:** 3090701 168-218, 3064856 191-248 on these nights. The split is therefore upstream of the overrides as well as the customizations.
  - The overrides are unchanged (call 1: no add/remove since 23 Nov).
  - The customizations are unchanged (calls 5-6): 3064856 still has the Aggressive occupancy table and 3090701 Market Driven.
  - What moved the algorithm at the 06:09Z refresh is NOT CHECKED.
- **3090701 `price` < `user_price` on 33 nights** (13 Dec 183 vs 191; 25 Nov they matched: 198 vs 201). 3064856 differs on 13 nights. Airbnb follows `price` (factor 0.765-0.768 on `price`, 0.731-0.735 on `user_price`), so `price` is what is selling. The cause of the gap is NOT CHECKED.
- **January (2-23 Jan, 21 jointly open nights):** 3090701 is **+7.2% to +8.1%** above 3064856 (25 Nov +6.2% to +7.2%). Day on day ±1, except 24 Jan (3090701 186 -> 171, 3064856 186 -> 159).
- **27 Nov / 1 Dec single nights (Reyhan +25%, min 1):** 3064856 **260 / 234**, 3090701 **226 / 203** (25 Nov 263/233 and 210/186). No kept comp was returned for 27-29 Nov (n=0), so these are numbers only. The +25% vs policy +50% on 1 Dec stays confirm or revert.
- **Airbnb follows PriceLabs:**
  - Factor 0.765-0.768 in December (lead 17-26 d) and 0.900-0.901 in January, on both twins.
  - On Airbnb, 3064856 is now **+7.5% to +10.7%** above 3090701 on December stays (25 Nov 3090701 was +1.8% to +2.4% above).
  - In January 3090701 is still +5.6% / +5.5% above.
- **Twin rule** (`listing_facts.P13`: "slightly different; propose narrowing the gap, never identical"): a 12% gap is more than "slightly". The proposal below narrows it, and it does not depend on which twin is cheaper (that question is deprioritised in policy and I do not raise it).

### 13-21 Dec: supported position about -15% vs comp median (rating cap). 3090701 has fallen under it on 2 of 4 stays; 3064856 is above it
| Stay | Ours 3090701 / 3064856 (25 Nov) | Comp median (n) | Pctl / vs median (3090701; 3064856) | vs line x0.85 | Wider pctl (n, median) | PL avg vs mkt P50 (mkt occ) | `recommend` (30 d, +16 pts) |
|---|---|---|---|---|---|---|---|
| 13-15 Dec (2 n) | below min 3 | 240.50 (3) | comps only | | (39, 262.50) | 181.0 / 203.0 vs 215.5 (36%) | |
| **13-16 Dec** | **188.00 / 204.33** (200.00 / 195.67) | 237.00 (4) | **P0 -20.7%**; P0 -13.8% | **-6.7%**; +1.4% | P4 / P22 (46, 240.67) | 180.0 / 201.7 vs 215.0 (33%) | raise +10% |
| **14-16 Dec (min 2)** | **212.00 / 228.00** (224.00 / 220.00) | 238.75 (6) | P33 -11.2%; P33 -4.5% | +4.5%; +12.3% | P22 / P33 (46, 243.75) | 178.5 / 200.0 vs 214.0 (29%) | raise +10% |
| **16-19 Dec** | **195.67 / 213.00** (209.33 / 204.67) | 240.83 (6) | **P0 -18.8%**; P17 -11.6% | **-4.4%**; +4.1% | P6 / P18 (50, 251.50) | 190.3 / 213.0 vs 232.3 (35%) | raise +10% |
| 17-20 Dec | 201.67 / 219.67 (215.67 / 210.67) | 304.50 (4; skewed by the lift/skyline comps at 456.67 / 363.67) | P0 -33.8%; P25 -27.9% | -22.1%; -15.1% (skewed) | P12 / P19 (43, 273.67) | 198.0 / 221.7 vs 242.0 (41%) | raise +10% |
| **18-21 Dec** | **203.00 / 221.67** (217.33 / 212.67) | 233.67 (3) | P0 -13.1%; P33 -5.1% | +2.2%; +11.6% | P11 / P19 (37, 269.67) | 200.0 / 224.0 vs 245.3 (45%) | raise +10% |
| 19-21 Dec (2 n) | below min 3 | 249.50 (3) | comps only | | (19, 287.50) | | |
| 19-22 Dec | 202.33 / 220.67 (216.33 / 211.67) | 227.83 (2) | P0 -11.2%; P50 -3.1% | +4.5%; +13.9% | P6 / P14 (35, 292.00) | 199.0 / 222.7 vs 248.0 (47%) | raise +10% |
| 20-22 Dec (min 2) | 225.00 / 243.00 (239.00 / 234.50) | 246.75 (2) | P0 -8.8%; P50 -1.5% | +7.3%; +15.9% | P18 / P32 (28, 270.75) | 196.0 / 219.0 vs 247.5 (47%) | raise +10% |
| 18-22 Dec | 190.00 / 208.25 (204.25 / 199.50) | 215.62 (2) | P0 -11.9%; P50 -3.4% | +3.7%; +13.6% | P5 / P15 (39, 260.75) | 199.2 / 223.0 vs 246.5 (45%) | raise +10% |
| 13-22 Dec (9 n, weekly -15%) | 161.89 (strike £1,688 -> £1,457) / 179.22 (strike £1,871 -> £1,613) | 160.78 (1) | n=1 | | P3 / P11 (36, 259.61) | 189.8 / 212.4 vs 231.8 (39%) | numbers only |
| 26-28 Dec (30-day default) | closed (booked/blocked) | 256.50 (2) | comps only | | (13, 334.00) | | |
| 1-3 Dec (midweek default) | closed | 231.75 (4) | comps only | | (41, 238.00) | | |
| 27-29 Nov (Fri-Sun default) | closed | none returned | | | (2, 476.25) | | |

**Supported:**
- **3090701: about +5% on the 13-18 Dec nights** (13-16 and 16-19 Dec stays).
- **3064856: hold (0%).**
- **Both:** about **-15% vs comp median** (rating cap: 4.36 / 4.31 vs 4.78).
- **One-line reason:** the comps moved ±3.5% overnight, while 3090701 fell 5-8% by itself (no edit). That took it to -6.7% / -4.4% under the rating line on the two stays with n=4-6, and to P0 of comps.

The evidence is weak, and the details matter:
- 3090701 is still +2.2% / +4.5% over the line on 18-21 and 14-16 Dec.
- +5% puts 13-16 at about -2% vs the line and 16-19 at about +0.4%. It also narrows the twin gap from about 12% to about 7% (twin rule).
- 3064856 is +1.4% to +15.9% over the line (n >= 3 stays, excluding the skewed 17-20 Dec), so no rise is argued at 4.31.
- 3064856 is P0-P33 of comps, and PriceLabs sits 6-12% under market P50 (3090701 16-21% under), so no cut is argued either.
- `recommend`'s +10% comes from the +16-pt 30-day lead alone and ignores the rating cap.
- Reyhan's -2% (10-19 and 22-26 Dec, both twins) and 14-16 Dec min 2 stay **confirm or revert** for Corentin, as before.

### January twins: hold both (0%); Reyhan's -8% (2-31 Jan) stays confirm or revert
| Stay | Ours 3090701 / 3064856 (25 Nov) | Comp median (n) | Pctl / vs median | vs line x0.85 | Wider pctl (n, median) | PL avg vs mkt P50 (mkt occ) | `recommend` |
|---|---|---|---|---|---|---|---|
| **5-8 Jan** | **206.67 / 195.67** (205.67 / 195.67) | 211.33 (8) | P38 -2.2%; P25 -7.4% | +15.0%; +8.9% | P45 / P40 (53, 216.00) | 174.0 / 161.7 vs 199.0 (**16%**) | raise +10% |
| **14-17 Jan** | **203.67 / 193.00** (203.00 / 193.67) | 217.00 (8) | P38 -6.1%; P25 -11.1% | +10.4%; +4.6% | P28 / P22 (50, 227.83) | 170.7 / 158.7 vs 200.3 (**11%**) | raise +10% |

**Supported: hold (0%), about -15% vs median.**
- Both twins are 5-15% over the rating line, so no rise is argued.
- At P25-P38 of comps, with a +16-pt lead, no cut is argued.
- Every January cell moved by ±0.5% or less overnight.
- Market occupancy is 11-16%, so the comps (all still unsold, £136-430) are the only price evidence.

## P20 Waterford Court, 2-bed (Airbnb 1791529331262420081, 5.0 from 3 reviews; Airbnb shows 6 guests)

There is no new edit (call 1), and the overrides are unchanged (call 2). Only the algorithm moved at the 06:48Z refresh:
- **5 Dec:** 588 -> **562** (`uncustomized_price` 404 -> 373).
- **26 Dec:** 516 -> **565** (344 -> 388).
- **14-18 Dec:** **290/304/302/335/348 = £1,579** (25 Nov £1,581).
- `price` vs `user_price` now differ: 5 Dec 562 vs 584, 26 Dec 565 vs 508. Airbnb follows `price`: 26 Dec £659 = 565 x 0.901 + 150. The cause is NOT CHECKED.

"Line" = comp median x 0.85 (judgement). The tool line, median x 1.08 from `quality_premium(5.0, 4.80)`, is shown too. Market percentiles use the Nearby Listings 1-3 BR compset, which understates a 2-bed P50 (the 2 BR summary median is 252).

| Stay | Ours 26 Nov (25 Nov) | Comp median (n) | Comp pctl / vs median | vs line x0.85 / x1.08 | Wider pctl (n, median) | PL avg / mkt P50, P75, P90 (mkt occ) | Factor | `recommend` (30 d, +42 pts) |
|---|---|---|---|---|---|---|---|---|
| 27-29 Nov (Fri-Sun default) | booked | 310.00 (1) | comps only | | (16, 755.50) | | | |
| 1-3 Dec (midweek default) | booked | 290.00 (5) | comps only | | (38, 306.00) | | | |
| **5 Dec (orphan, 1 n)** | **580.00** (600.00; strike £656) | none returned (8th day) | n=0 | | **P18** of 1-night 2-beds (11, £800; 25 Nov £700) | **562** / 227, 292, **408** (61%) | 0.765 | raise-signal (no pctl) |
| 14-17 Dec | 278.67 (279.00) | 281.00 (9) | P44 / -0.8% | +16.7% / -8.2% | P49 (47, 278.67) | 298.7 / 215, 263-276 (29%) | 0.766 | raise +10% |
| **14-19 Dec (all 5 open nights)** | **271.60** (272.00; strike £1,572) | 291.80 (7) | **P29 / -6.9%** | **+9.5% / -13.8%** | P34 (53, 288.20) | 315.8 / 219, 263-290 (30%) | 0.765 | raise +10% |
| 16-19 Dec | 301.33 (301.67) | 309.00 (7) | P43 / -2.5% | +14.7% / -9.7% | P41 (54, 321.83) | 328.3 / 223, 271-290 (31%) | 0.765 | raise +10% |
| 26-28 Dec (30-day default) | closed (27 Dec check-in, min 6) | 327.00 (4) | comps only | | (36, 452.50) | | | |
| **26 Dec (orphan, 1 n)** | **659.00** (615.00) | **494.00 (1)** | **P100 / +33.4%** | +56.9% / +23.5% | **P58** of 1-night 2-beds (19, £633; 25 Nov £590.50) | **565** / 249, 315, **427** (36%) | 0.901 | raise +5% |
| 26-30 Dec (context) | 27 Dec booked | 360.00 (7) | comps only | | (38, 436.38) | | | |

### 5 Dec (Reyhan +100%, min 1): hold; numbers only
- Airbnb £580 = 562 x 0.765 + 150. That is -3.3% overnight, from the algorithm (no edit).
- No kept comp was returned for 5-6 Dec (**8th day**), so there is no like-for-like percentile.
- £580 is **P18** of the 1-night 2-bed sample (n=11, median £800). PriceLabs 562 is 1.38x market P90 (408) at 61% market occupancy.
- **Read:** the like-for-like comps support no direction. The wide sample has us well under its median, so no cut is argued (judgement).

### 14-19 Dec: hold (0%). Supported position about -5% to -10% vs comp median (judgement), and we are there
- We are P29-P44 of comps, -0.8% to -6.9% vs median. That is +9.5% to +16.7% over the 0.85 line, and 8.2% to 13.8% under the tool's x1.08 line.
- The comps were stable: all within ±4.3%, with 6488364 back up +3.6% / +4.3% after its -16% cut yesterday.
- PriceLabs avg 299-328 is above market P75 (263-290) at 29-31% market occupancy.
- **One-line reason:** a rise would need the 5.0 rating to count, and 3 reviews (gap -14.5) is too few. A cut is not argued because we are already under the comp median.

### 26 Dec (Reyhan +100%, min 1): the one like-for-like comp supports about -32% (565 -> about £382); the wider sample says we are at market. For Corentin as evidence; confirm or revert
- The algorithm raised 26 Dec overnight with no edit (`uncustomized_price` 344 -> 388; `price` 516 -> 565). Airbnb is now **£659** (+7.2%).
- The only kept comp returned is 1684834789445533643 (lift/balcony, 12th-floor skyline, 4.39 from 18) at **£494** (4th day unchanged). We are **+33.4%** above it.
- To match it: (494 - 150) / 0.901 = **£382** room price (-32% vs 565). PriceLabs 565 is 1.32x market P90 (427; P50 249, occupancy 36%).
- **Against:** n=1, and we are **P58** of the 1-night 2-bed sample, whose median rose again (£590.50 -> £633, n=19).
- Reyhan's +100% is not settled by policy, so it stays **confirm or revert**. I make no new proposal.

## P10 Hanger Lane, 1-bed (3318177)
Handed back: last night 18 Nov (policy `handbacks.P10`). All 60 nights in `prices.csv` (26 Nov) are unavailable. No positioning, nothing proposed.

## P02 Ladbroke Grove, P03 Bayswater
Blocked on purpose (policy `intentional_blocks`). All 60 nights in `prices.csv` (26 Nov) are unavailable for each. No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or Smoobu (no rows in `listings.csv` or `prices.csv` for 26 Nov). Own price, percentile, rating gap and premium are **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (AWS WAF challenge at 26 Nov 07:25:01Z; not retried or bypassed). That covers Booking.com comps, our Booking.com displayed prices, P20's Booking.com capacity and whether the twins also flipped on Booking.com. Comp cancellation terms come only from Airbnb pills.
2. **Why the twins flipped overnight** (3090701 -8.3%, 3064856 +5.7% on 13-21 Dec, `uncustomized_price` included) is NOT CHECKED. There is no listing-log edit and no customization change. The 06:09Z refresh trigger is unknown, and customization history is not in the log.
3. **`price` vs `user_price` divergence** (3090701 on 33 nights, e.g. 13 Dec 183 vs 191; P20 5 Dec 562 vs 584 and 26 Dec 565 vs 508) is NOT CHECKED. Airbnb follows `price`.
4. **Why the January -8% does not show in `price`** (3064856 5 Jan `uncustomized_price` 157 x 0.92 = 144, but `price` is 163) is NOT CHECKED (5th day).
5. **Airbnb strikethroughs** (for example 3064856 13-16 Dec £695 -> £613, P20 5 Dec £656 -> £580): their cause is NOT CHECKED. The prices match the usual 0.765 factor, so no extra discount is implied.
6. **P20 Airbnb guest count 6 vs policy 4** (8th day): who changed it is NOT CHECKED.
7. **Airbnb factors** (0.765 at 28 days or less, 0.90 beyond) are inferred from prices; the rule behind them is NOT CHECKED.
8. **Thin comp coverage.**
   - P13: n=0-4 on 27-29 Nov, 1-3 Dec, 13-15, 13-16, 17-20 (skewed), 18-21, 19-21, 19-22, 20-22, 18-22, 13-22 and 26-28 Dec.
   - P20: n=0-1 on 27-29 Nov, 5 Dec (8th day) and 26 Dec. 789954794593691037 was returned on no priced stay (it is active per the probe).
   - Only unsold comps can be priced, which biases peak medians.
9. P20's market percentiles use the 1-3 BR compset. With 3 reviews, the 0.85 line is judgement (the tool says x1.08).
10. 3090701's Airbnb mapping is still "likely" (policy `listing_facts.P13.ids`).
11. P16, P18 and P19 have no data; P02, P03 and P10 have no sellable nights.
