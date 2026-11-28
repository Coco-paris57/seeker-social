# Competitor positioning: WEST + HERTS (D = 2026-11-28)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** I read `data/policy.json` first. Everything was read-only. PriceLabs: **6 read calls, strictly one per message** (no parallel calls today), all returned 200:
1. `get_user_logs` (listing, 26-28 Nov) for 3064856, 3090701 and 3547481: **0 entries**. No date-override or base/min/max edit on any of the three. The log does not cover customizations.
2. `get_listing_date_overrides` 3547481 (28 Nov-31 Jan): **unchanged** (28-30 Nov -10% min 3; 1-20 Dec 0% min 3; **5 Dec and 26 Dec +100%, min 1**, last updated 18 Nov; 21-25 Dec -5%; 27-31 Dec min 5-6; 1-31 Jan -5% min 3).
3. `get_neighbourhood_data` (detail, future prices + occupancy) 3547481. Nearby Listings 1-3 BR; 2 BR median **253** (n=147, unchanged).
4. `get_neighbourhood_data` (detail) 3064856. 2 BR median **215** (n=114; 27 Nov 217, n=116).
5. `get_customizations` 3090701, then 6. `get_customizations` 3064856 (separate messages): **unchanged**. 3064856 Aggressive occupancy table, 3090701 Market Driven; seasonality moderately conservative, last-minute 0% (14 d), far-out +30% after 150 d, booking recency default, demand factor conservative on both.

Saved in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/cw28/`: `nb_3547481.json`, `nb_3064856.json`, `mkt_P20.json`, `mkt_P13.json`, `rooms.json`, `res2_P13.json`, `res2_P20.json`, `probe1761.json`, `rows.json`.

**Own prices** from `raw/prices_*.json` (28 Nov). Last refresh: twins **07:07:09-11Z** (during the pull), P20 **06:21:10Z**. No listing-log entry behind either (call 1).

**Bookings** (`reservations.csv`, 28 Nov): **no new, changed or cancelled P13 or P20 row** vs 27 Nov.

**Occupancy for `recommend`** (`pl_kpis.csv`, 28 Nov): P13 30 d **63% vs 46% (+17 pts)**; P20 30 d **80% vs 38% (+42 pts)** (P20 60 d 50% vs 28%; 27 Nov 52%).

**OTAs:**
- **Airbnb:** listing pages **2026-11-28 07:19:58-07:20:38Z** (26 pages, all HTTP 200). Searches **07:21:04-07:30:15Z**, plain `curl`, same scripts, boxes, comp ids and 4-adult search as 18-27 Nov; 0 HTTP failures, no bot check. Activity probe 07:31:19-07:31:41Z.
- **Booking.com: NOT CHECKED.** One plain search at 07:22:06Z returned the AWS WAF challenge (HTTP 202). Not retried or bypassed.

**Method** (unchanged):
- **Price** = Airbnb all-in total / nights after any offer shown; includes **£150 cleaning** plus any Airbnb guest fee; taxes not shown separately.
- **Line** = comp median x (1 + `quality_premium`). Twins: `quality_premium(4.36, 4.78)` = `quality_premium(4.31, 4.78)` = **-0.15** (cap). P20: `quality_premium(5.0, 4.80)` = +0.08; I keep a judgement line of median x 0.85 because 3 reviews prove nothing yet. Both shown.
- **Factor** = (Airbnb total - £150) / sum of PriceLabs `price`.
- "Wider" medians/percentiles include our own listing where returned (1 value in 19-56), as before; the P20 26 Dec wide percentile in the text excludes ours.

**Stays (same dates for comps and us):**
- Defaults: next Fri-Sun = **4-6 Dec**; midweek Tue-Thu = **1-3 Dec**; 30 days out = **28-30 Dec**. All three are booked/blocked for us on both properties: comps only.
- P13: 13-21 Dec (13 variants) plus 5-8 and 14-17 Jan.
- P20: 14-17, 14-19, 16-19 Dec, 26 Dec, 26-30 Dec (context), plus **5-8 and 14-17 Jan (new: open nights after 13 Dec)**. 5 Dec dropped (sold 26 Nov).

**Comp sets: same ids as 18-27 Nov (`comps.json`). None replaced; all 23 active.**
- 22 comps returned on at least one priced stay. P20 789954794593691037 is back on priced stays (5-8 and 14-17 Jan, £393.33).
- **P13 1761224847419174970 was returned on no priced stay for the 2nd day.** Activity probe (0.2 km box): not returned 7-10 Dec, 8-11 Jan, 19-22 Jan, 22-25 Jan, 8-15 Dec, 4-6 Jan, 25-30 Jan; **returned 10-17 Jan at £1,340 / 7 n (2 adults, checked 07:31:38Z)**, so it is bookable within 60 days and stays in the set (1 row `P13:probe`). Watch: if it is unpriceable again on 29 Nov I will look for a replacement.

**Ratings and reviews** (listing pages 28 Nov 07:20Z): **no change on any of the 26 pages.** Ours: 3090701 4.36 (11), 3064856 4.31 (13), P20 5.0 (3). Comp medians: P13 **4.78** / **14** reviews; P20 **4.80** / **17.5**. Review gap vs comp median: 3090701 **-3**, 3064856 **-1**, P20 **-14.5**.

**P20 Airbnb guest count: still 6 (10th day).** `personCapacity` 6 on our page (28 Nov 07:20Z) vs policy `listing_facts.P20.max_guests` 4. Stays **confirm or revert** for Corentin; I propose nothing. Searches ran at 4 adults and comps sleep 4-5, so the numbers are unaffected. Booking.com capacity NOT CHECKED (WAF).

**Same comps vs 27 Nov:**
- **P13:** 50 comp pairs priced both days, all within **±4.3%** (largest 1436773605049626293 18-21 Dec 232.33 -> 222.33). 1436773605049626293 not returned on 1-3 Dec today. Median moves are mix-driven: 16-19 Dec 245.33 -> **250.00** (1599999559812004118 244 -> 250 and 1436773605049626293 224 -> 218.67), 18-21 Dec 223.33 -> 218.33.
- **P20:** 36 pairs. All within ±4.6% except **1684834789445533643, -7.1% to -11.5%** on every December stay (26 Dec 494 -> **437**), consistent with an Airbnb last-minute step at 28 days (cause NOT CHECKED).
- **Ours P13:** 3090701 **+2.1% to +6.5%** on every December stay (13-22 Dec 9 n +4.5%); 3064856 -0.5% to +2.6%; January ±1.1%.
- **Ours P20:** 14-19 Dec -0.2%; **26 Dec £657 -> £583 (-11.3%)** with no PriceLabs change (563 -> 565): the Airbnb factor stepped 0.901 -> **0.766** as 26 Dec reached 28 days out.

**Rows written:**
- **1,203 rows** appended to `data/snapshots/2026-11-28/comps.csv` under `flock` on `.comps.csv.lock` (the file had already been copied forward by another agent at 07:19Z; I checked there were no comp-west rows for 28 Nov before appending): kept comps P13 176 (11 x 16 stays), P20 120 (12 x 10); `P13:ours` 32, `P20:ours` 10; `P13:probe` 1; wider 2-bed sample `P13:wide` 520, `P20:wide` 344. A blank price with "NOT RETURNED" in `source` = not returned for that stay.
- **28 rows** appended to `channel_checks.csv` (our Airbnb displayed prices) under `.channel_checks.csv.lock`.
- Filter `source` on "comp-west", "checked 2026-11-28" and "stay <ci> to <co>". No reservation guest counts written; "adults 4" is the search parameter.

**Recompute check:** `snapshot.load('2026-11-28')` + `comp_summary` filtered by stay matches the tables:
- P13 13-16 Dec: n=4, median 224.50, 3090701 P0, -10.5%. 14-16 Dec: n=7, 236.00, P29, -8.1%. 16-19 Dec: n=5, 250.00, P0, -19.5%. 5-8 Jan: n=8, 211.33, P38, -3.6%.
- P20 14-19 Dec: n=7, 291.80, P29, -8.7%. 26-27 Dec: n=1, 437.00, P100, +33.4%. 5-8 Jan: n=12, 269.67, P42, -6.9%.

## Comp tables (Airbnb all-in £/night, 4 adults, checked 2026-11-28 07:21-07:30Z)
- Blank = comp not returned for that stay (booked or min-stay). Ours "not returned" = booked, blocked or below min stay: P13 4-6 Dec, 1-3 Dec, 28-30 Dec booked/blocked; 13-15 and 19-21 Dec below min 3 on the check-in night. P20 4-6 Dec, 1-3 Dec, 28-30 Dec booked; 26-30 Dec hits the 27 Dec booking.
- Strikethroughs are Airbnb's own display; cause NOT CHECKED. Cleaning INCLUDED in every cell; platform Airbnb; check date 2026-11-28.

#### P13
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 4 Dec-6 Dec | 1 Dec-3 Dec | 13 Dec-15 Dec | 13 Dec-16 Dec | 14 Dec-16 Dec | 16 Dec-19 Dec | 17 Dec-20 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec | 19 Dec-22 Dec | 20 Dec-22 Dec | 18 Dec-22 Dec | 13 Dec-22 Dec | 28 Dec-30 Dec | 5 Jan-8 Jan | 14 Jan-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.85 (13) | Garden view/balcony; Guest favourite; free cancellation |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.85 (13) | Paid parking; Guest favourite; free cancellation |  |  | 244 | 235.67 | 244 | 250 |  |  |  |  |  |  |  |  | 235.67 | 235.67 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking; garden; free cancellation |  |  | 236 | 218.67 | 236 | 218.67 |  | 222.33 | 241.5 |  |  |  |  | 283 | 218.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  | 227.5 |  |  | 270 |  |  |  |  |  |  |  |  |  | 214 | 225.33 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.74 (53) | Superhost; 2 bath |  | 213.5 |  |  |  |  |  |  |  |  |  |  |  |  | 193.67 | 201.33 |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | Garden |  |  |  |  | 162.5 |  |  |  |  |  |  |  |  |  | 135.67 | 154.67 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.78 (18) | none listed |  |  | 237 | 210.67 | 233.5 | 210.67 | 214.33 | 214.33 | 239 | 212 | 233.5 | 200.25 | 161.67 | 303 | 208.67 | 208.67 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5 (10) | Lift; skyline view |  |  |  |  |  | 450.67 | 456.67 |  |  |  |  |  |  |  | 419.33 | 430.33 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking |  | 232 | 234.5 | 230.33 | 252 |  |  |  |  |  |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5 (14) | Lift/paid parking/balcony/panoramic view; Guest favourite; free cancellation |  |  |  |  |  | 363.67 | 363.67 |  |  |  |  |  |  |  |  | 316.67 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking; garden |  |  |  |  | 162.5 |  |  |  |  |  |  |  |  |  | 141.67 | 161.67 |
| **Comp median (n)** | | | 4.78 (14) | | - (0) | **227.50** (3) | **236.50** (4) | **224.50** (4) | **236.00** (7) | **250.00** (5) | **363.67** (3) | **218.33** (2) | **240.25** (2) | **212.00** (1) | **233.50** (1) | **200.25** (1) | **161.67** (1) | **293.00** (2) | **211.33** (8) | **217.00** (8) |
| Wider 2-bed sample median (n) | | | | | 466.00 (7) | 239.00 (38) | 259.00 (40) | 240.67 (49) | 237.00 (49) | 249.17 (42) | 256.33 (41) | 266.00 (37) | 299.50 (19) | 280.50 (34) | 268.50 (27) | 263.12 (42) | 257.67 (37) | 317.50 (18) | 219.83 (52) | 216.00 (51) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.36 (11)** | | 6 | | | not returned | not returned | not returned | **201.00** | **217.00** | **201.33** (strike £684 -> £604) | **207.33** (strike £706 -> £622) | **209.67** (strike £713 -> £629) | not returned | **208.33** (strike £708 -> £625) | **231.00** | **196.25** | **170.11** (strike £1,774 -> £1,531) | not returned | **203.67** | **201.67** |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | 6 | | | not returned | not returned | not returned | **210.67** | **228.50** (strike £511 -> £457) | **213.67** | **220.33** (strike £751 -> £661) | **222.67** (strike £759 -> £668) | not returned | **221.33** (strike £754 -> £664) | **244.00** (strike £547 -> £488) | **209.25** | **181.67** (strike £1,897 -> £1,635) | not returned | **195.67** | **194.00** |

#### P20
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 4 Dec-6 Dec | 1 Dec-3 Dec | 14 Dec-17 Dec | 14 Dec-19 Dec | 16 Dec-19 Dec | 28 Dec-30 Dec | 26 Dec-27 Dec | 26 Dec-30 Dec | 5 Jan-8 Jan | 14 Jan-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Houseboat, marina view; Superhost; Guest favourite |  |  | 281.33 | 278 | 281.33 |  |  | 283.75 | 281 | 281.33 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Terrace; free parking; Guest favourite; free cancellation | 301 |  |  |  |  |  |  | 367.25 | 258.33 | 257.67 |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (19) | Paid parking |  |  |  |  |  |  |  |  | 393.33 | 393.33 |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (58) | Lift; 2 bath |  |  |  |  |  |  |  | 428.25 | 296.67 |  |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/paid parking/river view/balcony; 2 bath |  |  | 382.67 | 378.6 | 382.67 |  |  | 380.25 | 382.67 | 382.67 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony; 12th-floor skyline |  | 299.5 | 301 | 307.6 | 312 | 375.5 | 437 | 369 | 212 | 239.67 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking |  | 306 | 261.67 | 249.8 | 268.67 |  |  |  | 227 |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/paid parking/balcony |  |  | 333.33 | 327.8 | 333.33 |  |  | 329.75 | 333.33 | 333.33 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.53 (17) | Lift/paid parking/balcony |  |  | 242.67 | 256 | 270.33 |  |  |  | 216.33 | 220 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/Thames view; Superhost; free cancellation | 219.5 | 188 | 212.67 |  |  |  |  |  | 189 | 185.33 |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking; townhouse |  | 288.5 | 250 |  |  |  |  |  | 250 | 250 |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5 (25) | Balcony; Superhost; Guest favourite | 310 | 290 | 306 | 291.8 | 309 | 390 |  | 360 | 290 | 306.67 |
| **Comp median (n)** | | | 4.80 (17.5) | | **301.00** (3) | **290.00** (5) | **281.33** (9) | **291.80** (7) | **309.00** (7) | **382.75** (2) | **437.00** (1) | **367.25** (7) | **269.67** (12) | **269.50** (10) |
| Wider 2-bed sample median (n) | | | | | 561.50 (22) | 306.00 (39) | 263.00 (49) | 286.60 (54) | 312.00 (55) | 644.00 (27) | 505.50 (20) | 428.25 (37) | 235.00 (44) | 253.83 (56) |
| **Ours 3547481 (Airbnb 1791529331262420081) 5 (3)** | | 6 | | | not returned | not returned | **278.00** (strike £955 -> £834) | **266.40** | **292.67** | not returned | **583.00** (strike £659 -> £583) | not returned | **251.00** (strike £831 -> £753) | **249.33** (strike £850 -> £748) |

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### Twins: the gap narrowed from 12% to 8% overnight, on PriceLabs' own output (no edit logged)
- **13-21 Dec (9 open nights), PriceLabs `price`:**
  - 3090701: **220/186/185/189/195/209/213/203/204 = £1,804** (27 Nov £1,718, **+5.0%**; 13 Dec 184 -> 220, other nights +3.0% to +3.6%).
  - 3064856: **228/201/200/204/211/226/230/220/221 = £1,941** (27 Nov £1,926, +0.8%; 13 Dec 206 -> 228, others -1 to 0).
  - **3064856 is now +7.9% to +8.4% above its twin on 14-21 Dec and +3.6% on 13 Dec** (27 Nov +11.7% to +12.4%).
- **Cause NOT CHECKED:** no listing-log edit (call 1), customizations unchanged (calls 5-6). `uncustomized_price` also rose on 3090701 (e.g. 13 Dec 182 -> 217, 14 Dec 172 -> 177), so the move is in the algorithm's base output, not a customization. 3090701 `user_price` still equals its 27 Nov `price` (184/180/179/183/189/202/207/196/198), but **Airbnb follows `price`**: factor 0.765-0.767 vs `price` (0.79-0.83 vs `user_price`).
- **On Airbnb** 3064856 is now **+4.8% to +6.8%** above 3090701 on December stays (27 Nov +8.2% to +9.3%).
- **January (24 jointly open nights, 3-26 Jan):** 3090701 is **+5.0% to +6.0%** above 3064856 (27 Nov +6.6% to +7.5%; 3090701 fell 2-3 per night). On Airbnb +4.1% / +4.0%.
- **Twin rule** (`listing_facts.P13`: slightly different, narrow, never identical): 8% in PriceLabs / about 6% on Airbnb is closer to "slightly". Yesterday's proposed +5% on 3090701 13-18 Dec is now about two-thirds done by PriceLabs itself.
- **1 Dec single night (Reyhan +25%, min 1):** 3090701 **225** (27 Nov 213), 3064856 **233** (235). Comps 1-3 Dec median 227.50 (n=3), but we cannot sell 1-3 Dec: numbers only. The +25% vs policy +50% stays **confirm or revert**.

### 13-21 Dec: supported position about -15% vs comp median (rating cap). 3090701 is now under the line only on 16-19 Dec
| Stay | Ours 3090701 / 3064856 (27 Nov) | Comp median (n) | Pctl / vs median (3090701; 3064856) | vs line x0.85 | Wider pctl (n, median) | PL avg vs mkt P50 (mkt occ) | `recommend` (30 d, +17 pts) |
|---|---|---|---|---|---|---|---|
| 13-15 Dec (2 n) | below min 3 | 236.50 (4) | comps only | | (40, 259.00) | | |
| **13-16 Dec** | **201.00 / 210.67** (188.67 / 205.33) | 224.50 (4) | **P0 -10.5%**; P0 -6.2% | **+5.3%**; +10.4% | P12 / P22 (49, 240.67) | 197.0 / 209.7 vs 212.0 (34%) | raise +10% |
| **14-16 Dec (min 2)** | **217.00 / 228.50** (212.50 / 229.00) | 236.00 (**7**) | P29 -8.1%; P29 -3.2% | +8.2%; +13.9% | P31 / P33 (49, 237.00) | 185.5 / 200.5 vs 212.0 (29%) | raise +10% |
| **16-19 Dec** | **201.33 / 213.67** (196.67 / 214.33) | 250.00 (5) | **P0 -19.5%**; P20 -14.5% | **-5.3%**; +0.5% | P10 / P19 (42, 249.17) | 197.7 / 213.7 vs 229.0 (38%) | raise +10% |
| 17-20 Dec | 207.33 / 220.33 (202.67 / 221.33) | 363.67 (3; skewed: 2 of 3 are the lift/skyline comps) | P0 -43.0%; P33 -39.4% | skewed | P12 / P22 (41, 256.33) | 205.7 / 222.3 vs 238.0 (46%) | raise +10% |
| 18-21 Dec | 209.67 / 222.67 (204.33 / 223.33) | 218.33 (2) | P0 -4.0%; P100 +2.0% | +13.0%; +20.0% | P11 / P22 (37, 266.00) | 208.3 / 225.3 vs 241.7 (49%) | raise +10% / +5% |
| 19-21 Dec (2 n) | below min 3 | 240.25 (2) | comps only | | (19, 299.50) | | |
| 19-22 Dec | 208.33 / 221.33 (203.33 / 222.00) | 212.00 (1) | n=1 | | P6 / P15 (34, 280.50) | 206.7 / 223.7 vs 245.0 (51%) | raise +10% / +5% |
| 20-22 Dec (min 2) | 231.00 / 244.00 (226.00 / 244.50) | 233.50 (1) | n=1 | | P22 / P33 (27, 268.50) | 203.5 / 220.5 vs 244.0 (50%) | raise +10% / +5% |
| 18-22 Dec | 196.25 / 209.25 (191.25 / 210.00) | 200.25 (1) | n=1 | | P7 / P14 (42, 263.12) | 207.2 / 224.2 vs 243.0 (50%) | raise +10% / +5% |
| 13-22 Dec (9 n, weekly -15%) | 170.11 (strike £1,774 -> £1,531) / 181.67 (strike £1,897 -> £1,635) | 161.67 (1) | n=1 | | P5 / P11 (37, 257.67) | 200.4 / 215.7 vs 228.7 (41%) | numbers only |
| 28-30 Dec (30-day default) | closed | 293.00 (2) | comps only | | (18, 317.50) | | |
| 1-3 Dec (midweek default) | closed | 227.50 (3) | comps only | | (38, 239.00) | | |
| 4-6 Dec (Fri-Sun default) | closed | none returned | | | (7, 466.00) | | |

**Supported:**
- **3090701: about +5% on the 16, 17 and 18 Dec nights only** (range 0 to +5%); **hold 13-15 Dec** (27 Nov: +5% on 13-18 Dec).
- **3064856: hold (0%).**
- **Both:** about **-15% vs comp median** (rating cap: 4.36 / 4.31 vs 4.78).
- **One-line reason:** after PriceLabs' own +3-5% overnight, 3090701 is +5.3% over the rating line on 13-16 Dec and +8.2% on the n=7 14-16 Dec stay, but still -5.3% under it at P0 on 16-19 Dec (n=5, median up to 250.00); +5% on those three nights takes it to about -0.5% and leaves a PriceLabs twin gap of about 3% there (still not identical).

Details:
- 3064856 is +0.5% to +20.0% over the line on every stay with n of 2 or more (17-20 excluded as skewed): no rise argued at 4.31. At P0-P29 (P100 only on n=2) and PriceLabs 1-10% under market P50, no cut argued either.
- `recommend`'s +10% comes from the +17-pt 30-day lead alone and ignores the rating cap.
- Reyhan's -2% (10-19 and 22-26 Dec, both twins) and the 14-16 Dec min 2 stay **confirm or revert** for Corentin, as before.

### January twins: hold both (0%); Reyhan's -8% (2-31 Jan) stays confirm or revert
| Stay | Ours 3090701 / 3064856 (27 Nov) | Comp median (n) | Pctl / vs median | vs line x0.85 | Wider pctl (n, median) | PL avg vs mkt P50 (mkt occ) | `recommend` |
|---|---|---|---|---|---|---|---|
| **5-8 Jan** | **203.67 / 195.67** (206.00 / 195.33) | 211.33 (8) | P38 -3.6%; P38 -7.4% | +13.4%; +8.9% | P40 / P37 (52, 219.83) | 170.7 / 161.7 vs 196.0 (**17%**) | raise +10% |
| **14-17 Jan** | **201.67 / 194.00** (203.67 / 193.67) | 217.00 (8) | P38 -7.1%; P25 -10.6% | +9.3%; +5.2% | P35 / P29 (51, 216.00) | 168.3 / 159.7 vs 199.3 (**12%**) | raise +10% |

**Supported: hold (0%), about -15% vs median.** Both twins are 5-13% over the rating line (no rise); at P25-P38 with a +17-pt lead, no cut. Market occupancy 12-17%, so unsold comps (£136-430) are the only price evidence.

## P20 Waterford Court, 2-bed (Airbnb 1791529331262420081, 5.0 from 3 reviews; Airbnb shows 6 guests)

No edit (call 1); overrides unchanged (call 2); no new booking. **Open nights after 13 Dec:** **14-18 Dec** (5 n, min 3): **290/304/300/333/318 = £1,545** (27 Nov £1,548; 18 Dec `user_price` now 317 = `price`, so yesterday's 348 vs 317 split is gone); **26 Dec** (min 1): **565** (563; `uncustomized_price` 383); and **3 Jan onwards** (-5%, min 3). 19-25 Dec and 27 Dec-2 Jan are booked.

"Line" = comp median x 0.85 (judgement); the tool line x1.08 is shown too. Market percentiles use the Nearby Listings 1-3 BR compset (2 BR summary median 253).

| Stay | Ours 28 Nov (27 Nov) | Comp median (n) | Comp pctl / vs median | vs line x0.85 / x1.08 | Wider pctl (n, median) | PL avg / mkt P50, P75, P90 (mkt occ) | Factor | `recommend` (30 d, +42 pts) |
|---|---|---|---|---|---|---|---|---|
| 4-6 Dec (Fri-Sun default) | booked | 301.00 (3) | comps only | | (22, 561.50) | | | |
| 1-3 Dec (midweek default) | booked | 290.00 (5) | comps only | | (39, 306.00) | | | |
| 14-17 Dec | 278.00 (strike £955 -> £834) (278.67) | 281.33 (9) | P44 / -1.2% | +16.3% / -8.5% | P55 (49, 263.00) | 298.0 / 214.7, 267.0, 368.3 (30%) | 0.765 | raise +10% |
| **14-19 Dec (all 5 open nights)** | **266.40** (267.00) | 291.80 (7) | **P29 / -8.7%** | **+7.4% / -15.5%** | P37 (54, 286.60) | 309.0 / 219.0, 274.8, 372.4 (31%) | 0.765 | raise +10% |
| 16-19 Dec | 292.67 (293.33) | 309.00 (7) | P43 / -5.3% | +11.4% / -12.3% | P40 (55, 312.00) | 317.0 / 222.7, 281.3, 376.0 (32%) | 0.766 | raise +10% |
| **26 Dec (orphan, 1 n)** | **583.00 (strike £659 -> £583)** (657.00) | **437.00 (1)** | **P100 / +33.4%** | +57.0% / +23.5% | **P58** of 1-night 2-beds (19 excl. ours, median £445) | **565** / 250, 316, **434** (38%) | **0.766** (27 Nov 0.901) | raise +5% |
| 26-30 Dec (context) | 27 Dec booked | 367.25 (7) | comps only | | (37, 428.25) | | | |
| 28-30 Dec (30-day default) | booked | 382.75 (2) | comps only | | (27, 644.00) | | | |
| **5-8 Jan (new)** | **251.00 (strike £831 -> £753)** | 269.67 (**12**) | **P42 / -6.9%** | +9.5% / -13.8% | P55 (44, 235.00) | 223.3 / 192.3, 250.7, 332.3 (16%) | 0.900 | raise +10% |
| **14-17 Jan (new)** | **249.33 (strike £850 -> £748)** | 269.50 (**10**) | **P30 / -7.5%** | +8.8% / -14.3% | P45 (56, 253.83) | 221.3 / 194.7, 261.0, 347.3 (15%) | 0.901 | raise +10% |

### 14-18 Dec: hold (0%). Supported position about -5% to -10% vs comp median (judgement), and we are there
- P29-P44 of comps (n=7-9), -1.2% to -8.7% vs median; +7.4% to +16.3% over the 0.85 line and 8.5% to 15.5% under the tool's x1.08 line.
- Comps stable apart from 1684834789445533643 (-7% to -9%).
- PriceLabs avg 298-317 is above market P75 (267-281) at 30-32% market occupancy.
- **One-line reason:** a rise needs the 5.0 rating to count and 3 reviews (gap -14.5) is too few; a cut is not argued at 1-9% under the comp median with a +42-pt lead.

### 26 Dec (Reyhan +100%, min 1): on Airbnb the evidence now supports hold; the remaining case for a cut is Booking.com (NOT CHECKED). Confirm or revert stays
- **What changed:** Airbnb £657 -> **£583** overnight with no PriceLabs change; the factor stepped to 0.766 at 28 days out. Airbnb's room equivalent is now 565 x 0.766 = **£433 = market P90 (434)**: the level yesterday's evidence pointed to (-23% to P90 about £436 room), and the level the 5 Dec orphan sold at (£426 room vs P90 424).
- **Like-for-like:** the only kept comp returned, 1684834789445533643 (lift/balcony, 12th-floor skyline, 4.39 from 18), fell 494 -> **£437**; we are **+33.4%** above it (P100, n=1). Matching it would need PriceLabs (437 - 150) / 0.766 = **£375** (-34%).
- **Wider:** £583 is **P58** of the 1-night 2-bed sample (n=19 excl. ours, median £445, range £206-1,180).
- **Booking.com:** at the +15% markup the Standard Rate would be about 565 x 1.15 = **£650** room (computed from policy, **NOT CHECKED** live: WAF), 1.50x market P90.
- **Supported:** **0% on Airbnb** (already at P90 room level, P58 wide; a PriceLabs cut now would also cut Airbnb below P90). The 27 Nov -23% case now applies **only to the Booking.com price**, and only if Booking.com is shown live at about £650: range 0% to -23%. No rise supported. Reyhan's +100% is not settled by policy: **confirm or revert** for Corentin, no new proposal.
- The 26 Dec Airbnb strikethrough (£659 = 0.90 x 565 + 150) is new on this date; its cause is NOT CHECKED.

### January (3 Jan onwards, new today): hold (0%), about -7% vs comp median
- 5-8 Jan P42 / -6.9% (n=12), 14-17 Jan P30 / -7.5% (n=10); +9% over the 0.85 line, 14% under x1.08.
- PriceLabs 221-223 is 14-16% above market P50 (192-195) and under P75 (251-261), at 15-16% market occupancy.
- **One-line reason:** like-for-like we sit just under the median where a 3-review listing should, and thin January market demand argues against a rise; the -5% Jan override stays as set (not settled by policy, not proposed).

## P10 Hanger Lane, 1-bed (3318177)
Handed back: last night 18 Nov (policy `handbacks.P10`). All 60 nights in `prices.csv` (28 Nov) unavailable. No positioning.

## P02 Ladbroke Grove, P03 Bayswater
Blocked on purpose (policy `intentional_blocks`). All 60 nights in `prices.csv` (28 Nov) unavailable for each. No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or Smoobu (no rows in `listings.csv` or `prices.csv` for 28 Nov). Own price, percentile, rating gap and premium **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (AWS WAF challenge at 28 Nov 07:22:06Z; not retried or bypassed): Booking.com comps, our Booking.com prices (incl. the computed ~£650 Standard on P20 26 Dec), P20's Booking.com capacity, the twins' Booking.com gap. Comp cancellation terms only from Airbnb pills.
2. **Why 3090701's `price` rose 3-5% overnight (13 Dec +20%)** and narrowed the twin gap 12% -> 8%: NOT CHECKED. No log entry, no customization change; `uncustomized_price` rose too. 3090701 `user_price` lags `price` on 13-21 Dec.
3. **Airbnb factors** (0.765 at 28 days or less, 0.90 beyond) and the new 26 Dec strikethrough are inferred from prices; the rule is NOT CHECKED.
4. **P20 Airbnb guest count 6 vs policy 4** (10th day): who changed it NOT CHECKED.
5. **P13 comp 1761224847419174970** not returned on any priced stay for 2 days; active only via one 7-night probe (10-17 Jan, 2 adults). Replacement candidate if it stays unpriceable.
6. **Thin comp coverage:** P13 n=0-4 on 4-6 Dec, 1-3 Dec, 13-15, 13-16, 17-20 (skewed), 18-21, 19-21, 19-22, 20-22, 18-22, 13-22 and 28-30 Dec. P20 n=1-3 on 4-6 Dec, 26 Dec and 28-30 Dec. Only unsold comps can be priced, which biases peak medians.
7. P20 market percentiles use the 1-3 BR compset; with 3 reviews the 0.85 line is judgement (tool says x1.08).
8. 3090701's Airbnb mapping is still "likely" (policy `listing_facts.P13.ids`).
9. P16, P18 and P19 have no data; P02, P03 and P10 have no sellable nights.
