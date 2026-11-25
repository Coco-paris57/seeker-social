# Competitor positioning: WEST + HERTS (D = 2026-11-25)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** I read `data/policy.json` first. Everything was read-only. PriceLabs: 8 read calls, **each sent on its own (one per message, none in parallel)**, all returned 200:
1. `get_user_logs` (listing, 23-25 Nov) for 3064856, 3090701, 3547481: 7 entries. Six are Reyhan's 23 Nov 00:07:45-00:08:04Z P13 edits (already reported). **One is new: P20 3547481, 24 Nov 10:51:18Z, Reyhan, 24 Nov +25% min 1** (was -5% min 2). Nothing on either twin since 23 Nov 00:08:04Z. This log covers date overrides and base/min/max only, not customizations.
2. `get_listing_date_overrides` 3064856 and 3. 3090701 (25 Nov-31 Jan): still identical sets, newest `updated_at` 23 Nov 00:08:04Z.
4. `get_listing_date_overrides` 3547481: only change is the 24 Nov row above. 25-30 Nov -10% min 3; 1-20 Dec 0% min 3; **5 Dec and 26 Dec +100% min 1** (18 Nov); 21-25 Dec -5%; 1-31 Jan -5% min 3.
5. `get_neighbourhood_data` (detail) 3547481: Nearby Listings, 2 BR median 252 (n=149; 24 Nov 254).
6. `get_neighbourhood_data` (detail) 3064856: 2 BR median 220 (n=117; 24 Nov 221). Same as the Dispatcher's `raw/neighbourhood_P13.json`.
7. `get_customizations` (listing) 3064856, then 8. 3090701: same as 24 Nov. Occupancy-based adjustment is an **"Aggressive" custom table on 3064856** (0-15 d: -30% at 10% occupancy to 0% at 100%; 16-30 d: -20% to +10%; 31-60 d: -15% to +20%) vs **"Market Driven" on 3090701**. Last-minute (0%, 14 d), far-out (+30% after 150 d) and booking recency (default) are identical.

Market P25-P90 and market occupancy below come from calls 5-6 (saved `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/cw25/mkt_P13.json`, `mkt_P20.json`).

**Own prices** come from `prices.csv` / `raw/prices_*.json` (25 Nov; `price` = Smoobu on every night checked). Last refresh: 3090701 **24 Nov 09:37:59Z**, 3064856 **10:50:13Z**, P20 **10:52:17Z**; no overnight refresh on any of the three (Dispatcher note).
- **P20's 10:52Z refresh was edit-triggered**: it came 59 s after Reyhan's 10:51:18Z 24 Nov override (call 1).
- The twins' 09:37Z / 10:50Z refreshes have **no listing-log entry** behind them (call 1); their trigger is NOT CHECKED (customization changes are not in this log).

**Occupancy for `recommend`** (`pl_kpis.csv`, 25 Nov). P13/P20 reservation rows are byte-identical to 24 Nov (no new booking or cancellation).
- P13: 7 d 86% vs 59%; **30 d 63% vs 46% (+17 pts)**; 60 d 48% vs 34%.
- P20: **7 d 86% vs 51% (+35 pts)**; 30 d 77% vs 38%; 60 d 53% vs 29%.

**OTAs:**
- **Airbnb:** public search and listing pages read **2026-11-25 07:26:48-07:32:20Z** with plain `curl`; same scripts, boxes, comp ids and 4-adult search as 18-24 Nov; 0 HTTP failures, no bot check.
- **Booking.com: NOT CHECKED.** One plain search at 07:27:08Z returned the AWS WAF challenge (HTTP 202). Not retried, not bypassed.

**Method** (unchanged): price = Airbnb all-in total / nights after any offer shown, **£150 cleaning included** plus any Airbnb guest fee, taxes not shown separately. **Line** = comp median x (1 + `quality_premium`). Twins: `quality_premium(4.36, 4.78)` = `quality_premium(4.31, 4.78)` = **-0.15** (cap). P20: `quality_premium(5.0, 4.80)` = +0.08, but I keep a judgement line of median x 0.85 because 3 reviews prove nothing yet (both shown). **Factor** = (Airbnb total - £150) / sum of PriceLabs `price`.

**Default stays.** Next Fri-Sun = 27-29 Nov; midweek Tue-Thu = 1-3 Dec; 30 days out = **25-27 Dec** (replaces 24-26 Dec). All three are booked for us on both properties, so those columns are comps only. Dropped: P20 24-25 Nov (past).

**Comp sets: same ids as 18-24 Nov (`comps.json`); none replaced; all 23 active** (each returned on at least 1 stay today). Least seen: P13 1761224847419174970 (13-16 Dec only); P20 1568001017881493647 and 1316210326145130709 (26-30 Dec only), 789954794593691037 (25-27 Dec only; not returned 1-3 Dec today). 1598588327559113265 was not returned for 19-21 Dec today.

**Ratings and reviews** (listing pages 25 Nov 07:26-07:27Z): every comp and all three of ours **unchanged** vs 24 Nov. Ours: 3090701 4.36 (11), 3064856 4.31 (13), P20 5.0 (3). Comp-set medians: P13 **4.78** rating / **14** reviews; P20 **4.80** / **17.5**. Review gap vs comp median: 3090701 **-3**, 3064856 **-1**, P20 **-14.5**. (24 Nov's "-2 / 0" used 13 as the P13 review median; the set median is 14. Corrected.)

**P20 Airbnb guest count: still 6 (7th day).** Listing page 25 Nov 07:26Z `personCapacity` **6**; policy `listing_facts.P20.max_guests` = 4. Stays **confirm or revert** for Corentin; nothing proposed. Searches all ran at 4 adults and the comps sleep 4-5, so the numbers are unaffected. Booking.com capacity NOT CHECKED (WAF).

**Same comps vs 24 Nov:**
- P13: 57 comp pairs priced both days, all within **±3.2%** (largest: 1761224847419174970 13-16 Dec 232.67 -> 240.00).
- P20: 37 pairs. **6488364 (lift/paid parking/balcony, 4.53) cut -16.1% to -17.0% on all 4 stays** (14-17 Dec 290.33 -> 241.00). Every other pair within ±2.5%.
- Ours: 3090701 **-1.0% to -1.4%** on December stays, January -0.2% / 0.0%. 3064856 -0.2% to -0.6% in December, **January -4.6% / -4.1%**. P20 +0.7% to +1.0%.

**Rows written:**
- **1,104 rows** appended to `data/snapshots/2026-11-25/comps.csv` under `flock` on `.comps.csv.lock` (the file had already been copied forward by another agent). Kept comps: P13 176 (11 x 16 stays), P20 108 (12 x 9). Ours: `P13:ours` 32, `P20:ours` 9. Wider 2-bed sample: `P13:wide` 518, `P20:wide` 261. A blank price with "NOT RETURNED" in `source` = comp not returned for that stay.
- **27 rows** appended to `channel_checks.csv` (our Airbnb displayed prices) under `.channel_checks.csv.lock`.
- Filter `source` on "comp-west", "checked 2026-11-25" and "stay <ci> to <co>".

**Recompute check:** `snapshot.load('2026-11-25')` + `comp_summary` filtered by stay matches the tables:

| Listing | Stay | n | Median | Our position |
|---|---|---|---|---|
| P13 3090701 / 3064856 | 13-16 Dec | 4 | 237.00 | P0 -15.6% / P0 -17.4% |
| P13 3090701 / 3064856 | 14-16 Dec | 6 | 238.75 | P33 -6.2% / P33 -7.9% |
| P13 3090701 / 3064856 | 16-19 Dec | 6 | 240.17 | P0 -12.8% / P0 -14.8% |
| P13 3090701 / 3064856 | 18-21 Dec | 3 | 232.67 | P33 -6.6% / P0 -8.6% |
| P13 3090701 / 3064856 | 20-22 Dec | 3 | 250.00 | P33 -4.4% / P33 -6.2% |
| P13 3090701 / 3064856 | 5-8 Jan | 8 | 211.33 | P38 -2.7% / P38 -7.4% |
| P13 3090701 / 3064856 | 14-17 Jan | 8 | 217.00 | P38 -6.5% / P25 -10.8% |
| P20 | 14-17 Dec | 9 | 282.00 | P44 -1.1% |
| P20 | 14-19 Dec | 7 | 291.80 | P29 -6.8% |
| P20 | 16-19 Dec | 7 | 309.00 | P43 -2.4% |
| P20 | 26-27 Dec | 1 | 494.00 | P100 +24.5% |

## Comp tables (Airbnb all-in £/night, 4 adults, checked 2026-11-25 07:26-07:32Z)
- Blank cell = comp not returned for that stay (booked or min-stay).
- Ours "not returned" = booked, blocked or below min stay. P13: 27-29 Nov hits the 28 Nov booking; 1-3 Dec hits 2 Dec; 13-15 and 19-21 Dec are below min 3 on the check-in night; 25-27 Dec booked. P20: 27-29 Nov, 1-3 Dec, 25-27 Dec booked; 26-30 Dec hits the 27 Dec booking.
- Strikethroughs shown are Airbnb's own display on that search; their cause is NOT CHECKED.

#### P13
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 27 Nov-29 Nov | 1 Dec-3 Dec | 13 Dec-15 Dec | 13 Dec-16 Dec | 14 Dec-16 Dec | 16 Dec-19 Dec | 17 Dec-20 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec | 19 Dec-22 Dec | 20 Dec-22 Dec | 18 Dec-22 Dec | 13 Dec-22 Dec | 25 Dec-27 Dec | 5 Jan-8 Jan | 14 Jan-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.85 (13) | Garden view/balcony; Guest favourite; free cancellation |  |  |  | 240 |  |  |  |  |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.83 (12) | Paid parking; Guest favourite; free cancellation |  |  | 244 | 235.67 | 244 | 245.33 |  |  |  |  |  |  |  |  | 235.67 | 235.67 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking; garden; free cancellation |  | 236 |  |  |  | 224.33 |  | 232.67 | 248.5 |  |  |  |  |  | 218.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  | 227.5 |  |  | 270 | 235 | 245.33 | 248.67 | 275.5 | 243.67 | 260 | 231.5 |  | 255 | 214 | 225.33 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.74 (53) | Superhost; 2 bath |  | 247.5 |  |  |  |  |  |  |  |  | 250 |  |  |  | 194.33 | 202.67 |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | Garden |  |  |  |  | 162.5 |  |  |  |  |  |  |  |  |  | 135.67 | 154.67 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.78 (18) | none listed |  |  | 233.5 | 208.67 | 233.5 | 211.33 | 215.67 | 215.67 | 240.5 | 213 | 233.5 | 201.5 | 161.44 | 252.5 | 208.67 | 208.67 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5 (10) | Lift; skyline view |  |  |  |  |  | 450.67 | 456.67 |  |  |  |  |  |  |  | 419.33 | 430.33 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking |  | 259 | 240.5 | 238.33 | 264 |  |  |  |  |  |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5 (14) | Lift/paid parking/balcony/panoramic view; Guest favourite; free cancellation |  |  |  |  |  | 363.67 | 363.67 |  |  |  |  |  |  |  |  | 316.67 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking; garden |  |  |  |  | 162.5 |  |  |  |  |  |  |  |  |  | 141.67 | 161.67 |
| **Comp median (n)** | | | 4.78 (14) | | - (0) | **241.75** (4) | **240.50** (3) | **237.00** (4) | **238.75** (6) | **240.17** (6) | **304.50** (4) | **232.67** (3) | **248.50** (3) | **228.33** (2) | **250.00** (3) | **216.50** (2) | **161.44** (1) | **253.75** (2) | **211.33** (8) | **217.00** (8) |
| Wider 2-bed sample median (n) | | | | | 406.00 (3) | 249.00 (43) | 250.00 (40) | 238.33 (51) | 237.50 (45) | 244.17 (46) | 270.00 (43) | 284.67 (41) | 300.00 (19) | 285.67 (37) | 251.00 (27) | 260.62 (42) | 265.67 (37) | 378.25 (14) | 215.00 (48) | 223.00 (51) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.36 (11)** | | 6 | | | not returned | not returned | not returned | **200.00** (strike £679 -> £600) | **224.00** | **209.33** (strike £712 -> £628) | **215.67** | **217.33** | not returned | **216.33** | **239.00** | **204.25** | **175.11** (strike £1,827 -> £1,576) | not returned | **205.67** | **203.00** |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | 6 | | | not returned | not returned | not returned | **195.67** | **220.00** | **204.67** | **210.67** (strike £717 -> £632) | **212.67** | not returned | **211.67** | **234.50** | **199.50** (strike £912 -> £798) | **170.44** (strike £1,779 -> £1,534) | not returned | **195.67** | **193.67** |

#### P20
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 27 Nov-29 Nov | 1 Dec-3 Dec | 5 Dec-6 Dec | 14 Dec-17 Dec | 14 Dec-19 Dec | 16 Dec-19 Dec | 25 Dec-27 Dec | 26 Dec-27 Dec | 26 Dec-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Houseboat, marina view; Superhost; Guest favourite |  |  |  | 282 | 278.4 | 281 |  |  | 284.75 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Terrace; free parking; Guest favourite; free cancellation |  |  |  |  |  |  |  |  | 315.25 |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking |  |  |  |  |  |  | 403.5 |  |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (57) | Lift; 2 bath |  |  |  |  |  |  |  |  | 427.25 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/paid parking/river view/balcony; 2 bath |  |  |  | 382.67 | 378.6 | 382.67 |  |  | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony; 12th-floor skyline |  | 308.5 |  | 324 | 334.4 | 341.33 | 395.5 | 494 | 417 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking |  | 306 |  | 261.67 | 249.8 | 268.67 |  |  |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/paid parking/balcony |  |  |  | 333.33 | 327.8 | 333.33 |  |  | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.53 (17) | Lift/paid parking/balcony |  |  |  | 241 | 250.4 | 262.33 |  |  | 331.25 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/Thames view; Superhost; free cancellation |  | 199.5 |  | 213.33 |  |  | 239.5 |  |  |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking; townhouse |  | 288.5 |  | 250 |  |  |  |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5 (25) | Balcony; Superhost; Guest favourite | 310 | 290 |  | 306 | 291.8 | 309 | 390 |  | 360 |
| **Comp median (n)** | | | 4.80 (17.5) | | **310.00** (1) | **290.00** (5) | - (0) | **282.00** (9) | **291.80** (7) | **309.00** (7) | **392.75** (4) | **494.00** (1) | **345.62** (8) |
| Wider 2-bed sample median (n) | | | | | 547.75 (18) | 307.25 (36) | 700.00 (12) | 265.50 (50) | 289.90 (50) | 317.83 (48) | 499.00 (33) | 590.50 (20) | 417.00 (39) |
| **Ours 3547481 (Airbnb 1791529331262420081) 5 (3)** | | 6 | | | not returned | not returned | **600.00** (strike £680 -> £600) | **279.00** (strike £958 -> £837) | **272.00** | **301.67** | not returned | **615.00** | not returned |

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### Twins: still split, and wider in January, with no logged edit
- **13-21 Dec (9 open nights), PriceLabs `price`:** 3090701 **198/195/194/199/206/219/224/213/215 = £1,863**; 3064856 **192/189/189/193/200/213/217/207/209 = £1,809**. 3090701 is **+2.6% to +3.2%** above its twin on every night (24 Nov: +3.7% to +4.4%); 0 identical nights. Day on day: 3090701 -1.4% to -2.0%, 3064856 -0.5% to -0.9% (refreshes 24 Nov 09:37Z / 10:50Z).
- **January (2-23 Jan, 21 jointly open nights):** gap now **+6.2% to +7.2%** (24 Nov about +0.5%). 3064856 fell **-4.8% to -16.1%** day on day (5 Jan 173 -> 163, 14 Jan 166 -> 157); 3090701 -10.1% to +1.2% (5 Jan and 14 Jan unchanged at 174 / 167). `uncustomized_price` already differs in January (5 Jan 162 vs 178), so this is upstream of the overrides, which are identical (calls 2-3).
- **27 Nov / 1 Dec single nights (Reyhan +25%, min 1):** 3064856 **263 / 233**, 3090701 **210 / 186** (24 Nov 265/235 and 212/188). No kept comp returned for 27-29 Nov; numbers only. The +25% vs policy +50% stays confirm or revert.
- **Airbnb follows PriceLabs:** factor 0.765-0.767 (December, lead 18-27 d) and 0.900-0.902 (January) on both twins. 3090701 is +1.8% to +2.4% above 3064856 on December stays and **+5.1% / +4.8%** on 5-8 / 14-17 Jan.
- **Twin rule** (`listing_facts.P13`, "slightly different") is met by itself (2nd day). The only differing setting is still the occupancy profile (calls 7-8); that it causes the split is an inference, not proven.

### 13-21 Dec: hold both twins (0%); supported position about -15% vs comp median (rating cap); we are -4% to -17%
| Stay | Ours 3090701 / 3064856 (24 Nov) | Comp median (n) | Pctl / vs median (3090701; 3064856) | vs line x0.85 | Wider pctl (n, median) | PL avg vs mkt P50 (mkt occ) | `recommend` (30 d, +17 pts) |
|---|---|---|---|---|---|---|---|
| 13-15 Dec (2 n) | below min 3 | 240.50 (3) | comps only | | (40, 250.00) | 196.5 / 190.5 vs 216.5 (36%) | |
| **13-16 Dec** | **200.00 / 195.67** (202.33 / 196.33) | 237.00 (4) | P0 -15.6%; P0 -17.4% | **-0.7%; -2.9%** | P12 / P8 (51, 238.33) | 195.7 / 190.0 vs 216.3 (32%) | raise +10% |
| **14-16 Dec (min 2)** | **224.00 / 220.00** (226.50 / 220.50) | 238.75 (6) | P33 -6.2%; P33 -7.9% | +10.4%; +8.4% | P36 / P31 (45, 237.50) | 194.5 / 189.0 vs 215.5 (28%) | raise +10% |
| **16-19 Dec** | **209.33 / 204.67** (211.67 / 205.33) | 240.17 (6) | P0 -12.8%; P0 -14.8% | +2.5%; +0.3% | P15 / P13 (46, 244.17) | 208.0 / 202.0 vs 231.7 (35%) | raise +10% |
| 17-20 Dec | 215.67 / 210.67 | 304.50 (4; skewed by the lift/skyline comps at 456.67 / 363.67) | P0 -29.2%; P0 -30.8% | -16.7%; -18.6% (skewed) | P19 / P14 (43, 270.00) | 216.3 / 210.0 vs 241.3 (41%) | raise +10% |
| **18-21 Dec** | **217.33 / 212.67** (220.00 / 213.67) | 232.67 (3) | P33 -6.6%; P0 -8.6% | +9.9%; +7.5% | P17 / P10 (41, 284.67) | 218.7 / 212.3 vs 244.7 (44%) | raise +10% |
| 19-21 Dec (2 n) | below min 3 | 248.50 (3) | comps only | | (19, 300.00) | | |
| 19-22 Dec | 216.33 / 211.67 | 228.33 (2) | P50 -5.3%; P0 -7.3% | +11.5%; +9.1% | P14 / P5 (37, 285.67) | 217.3 / 211.0 vs 247.3 (47%) | raise +10% |
| **20-22 Dec (min 2)** | **239.00 / 234.50** (241.50 / 235.50) | 250.00 (3) | P33 -4.4%; P33 -6.2% | +12.5%; +10.4% | P37 / P33 (27, 251.00) | 214.0 / 208.0 vs 246.5 (46%) | raise +10% |
| 18-22 Dec | 204.25 / 199.50 | 216.50 (2) | P50 -5.7%; P0 -7.9% | +11.0%; +8.4% | P12 / P7 (42, 260.62) | 217.8 / 211.5 vs 245.8 (45%) | raise +10% |
| 13-22 Dec (9 n, weekly -15%) | 175.11 (strike £1,827 -> £1,576) / 170.44 (strike £1,779 -> £1,534) | 161.44 (1) | n=1 | | P8 / P3 (37, 265.67) | 207.0 / 201.0 vs 231.8 (38%) | numbers only |
| 25-27 Dec (30-day default) | booked | 253.75 (2) | comps only | | (14, 378.25) | | |
| 1-3 Dec (midweek default) | booked | 241.75 (4) | comps only | | (43, 249.00) | | |
| 27-29 Nov (Fri-Sun default) | booked | none returned | | | (3, 406.00) | | |

**Supported: 0% on both twins, 13-21 Dec.**
- The comps moved within ±3.2% overnight; ours -0.2% to -1.4%.
- At 4.31 / 4.36 against a 4.78 comp median, `quality_premium` caps at -15%: the supported position is about **-15% vs comp median**.
- On stays with n >= 3 (excluding the skewed 17-20 Dec), 3090701 is **-0.7% to +12.5%** vs that line and 3064856 **-2.9% to +10.4%**: on or above the line, so no rise is argued. 13-16 Dec has slipped to just under the line (-0.7% / -2.9%) because one comp rose +3.2%; that is inside one day's noise (n=4).
- We are P0-P33 of comps and PriceLabs sits 10-16% under market P50, so no cut is argued either.
- `recommend`'s +10% comes from the +17-pt 30-day lead alone and ignores the rating cap.
- Reyhan's -2% (10-19 and 22-26 Dec, both twins) and 14-16 Dec min 2 stay **confirm or revert** for Corentin, as before.

### January twins: hold both (0%); Reyhan's -8% (2-31 Jan) stays confirm or revert
| Stay | Ours 3090701 / 3064856 (24 Nov) | Comp median (n) | Pctl / vs median | vs line x0.85 | Wider pctl (n, median) | PL avg vs mkt P50 (mkt occ) | `recommend` |
|---|---|---|---|---|---|---|---|
| **5-8 Jan** | **205.67 / 195.67** (206.00 / 205.00) | 211.33 (8) | P38 -2.7%; P38 -7.4% | +14.5%; +8.9% | P44 / P42 (48, 215.00) | 172.7 / 161.7 vs 201.3 (**16%**) | raise +10% |
| **14-17 Jan** | **203.00 / 193.67** (203.00 / 202.00) | 217.00 (8) | P38 -6.5%; P25 -10.8% | +10.1%; +5.0% | P29 / P22 (51, 223.00) | 170.0 / 159.3 vs 202.7 (**11%**) | raise +10% |

**Supported: hold.** Both twins are 5-15% over the rating line, so no rise is argued at 4.3; P25-P38 of comps and the +17-pt lead argue against a cut. 3064856's overnight drop (-4.1% / -4.6% on Airbnb) moved it closer to the line, not under it. Market occupancy is 11-16%, so the comps (all still unsold at £135-430) are the only price evidence.

## P20 Waterford Court, 2-bed (Airbnb 1791529331262420081, 5.0 from 3 reviews; Airbnb shows 6 guests)

**New edit (call 1): Reyhan set 24 Nov +25% min 1 at 24 Nov 10:51:18Z** (was -5% min 2). That opened a single night against policy `listing_facts.P20.min_stay` (3 nights from 25 Oct to 30 Nov). The night has passed and did not sell (no 24 Nov stay in `reservations.csv`). **Confirm or revert for Corentin (record only; nothing to price).** The 5 Dec / 26 Dec / 14-20 Dec overrides are unchanged since 18 Nov / 9 Nov. The algorithm moved: 5 Dec 582 -> **588** (`uncustomized_price` 400 -> 404), 26 Dec 509 -> **516** (339 -> 344), 14-18 Dec **289/306/302/336/348 = £1,581** (24 Nov £1,568, +0.8%).

"Line" = comp median x 0.85 (judgement). The tool line, median x 1.08 from `quality_premium(5.0, 4.80)`, is shown too. Market percentiles use the Nearby Listings 1-3 BR compset, which understates a 2-bed P50 (2 BR summary median 252).

| Stay | Ours 25 Nov (24 Nov) | Comp median (n) | Comp pctl / vs median | vs line x0.85 / x1.08 | Wider pctl (n, median) | PL avg / mkt P50, P75, P90 (mkt occ) | Factor | `recommend` (7 d, +35 pts) |
|---|---|---|---|---|---|---|---|---|
| 27-29 Nov (Fri-Sun default) | booked | 310.00 (1) | comps only | | (18, 547.75) | | | |
| 1-3 Dec (midweek default) | booked | 290.00 (5) | comps only | | (36, 307.25) | | | |
| **5 Dec (orphan, 1 n)** | **600.00** (596.00; strike £680) | none returned (7th day) | n=0 | | **P42** of 1-night 2-beds (12, £700) | **588** / 228, 292, **405** (59%) | 0.765 | raise-signal (no pctl) |
| 14-17 Dec | 279.00 (277.00; strike £958) | 282.00 (9) | P44 / -1.1% | +16.4% / -8.4% | P56 (50, 265.50) | 299.0 / 215, 266-273 (27%) | 0.766 | raise +10% |
| **14-19 Dec (all 5 open nights)** | **272.00** (270.00) | 291.80 (7) | **P29 / -6.8%** | **+9.7% / -13.7%** | P32 (50, 289.90) | 316.2 / 219, 266-291 (28%) | 0.765 | raise +10% |
| 16-19 Dec | 301.67 (299.33) | 309.00 (7) | P43 / -2.4% | +14.9% / -9.6% | P44 (48, 317.83) | 328.7 / 223, 273-291 (29%) | 0.766 | raise +10% |
| 25-27 Dec (30-day default) | booked | 392.75 (4) | comps only | | (33, 499.00) | | | |
| **26 Dec (orphan, 1 n)** | **615.00** (609.00) | **494.00 (1)** | **P100 / +24.5%** | +46.5% / +15.3% | **P50** of 1-night 2-beds (20, £590.50; 24 Nov £551.50) | **516** / 248, 315, **415** (35%) | 0.901 | raise +5% |
| 26-30 Dec (context) | 27 Dec booked | 345.62 (8) | comps only | | (39, 417.00) | | | |

(`recommend`'s "raise" comes from the +35-pt 7-day lead, which is the 25 Nov-5 Dec stay, not from these nights' positions.)

### 5 Dec (Reyhan +100%, min 1): hold; numbers only
- Airbnb £600 = 588 x 0.765 + 150 (+0.7% on 24 Nov, no edit). No kept comp returned for 5-6 Dec (7th day), so there is no like-for-like percentile.
- £600 is **P42** of the 1-night 2-bed sample (n=12, median £700). PriceLabs 588 is 1.45x market P90 (405).
- **Read:** like-for-like comps support no direction; the wide 1-night sample has us under its median, so no cut is argued (judgement).

### 14-19 Dec: hold (0%); supported position about -5% to -10% vs comp median (judgement), and we are there
- P29-P44, -1.1% to -6.8% vs median; +9.7% to +16.4% over the 0.85 line; 8.4% to 13.7% under the tool's x1.08 line.
- The comp median fell because **6488364 cut -16% to -17%** (14-17 Dec 290.33 -> 241.00); without that one comp the set barely moved (±2.5%).
- PriceLabs avg 299-329 is above market P75 (266-291) at 27-29% market occupancy.
- **Read: hold.** A rise would need the 5.0 rating to count, and 3 reviews is too few for that; a cut is not argued because we are already under the comp median.

### 26 Dec (Reyhan +100%, min 1): the one like-for-like comp supports about -26% (516 -> about £382); the wider sample says we are at market. For Corentin as evidence; confirm or revert
- The only kept comp returned is 1684834789445533643 (lift/balcony, 12th-floor skyline, 4.39 from 18) at **£494** (3rd day unchanged). We are **+24.5%** above it (£615).
- To match it: (494 - 150) / 0.901 = **£382** room price (-26%). `uncustomized_price` is 344. PriceLabs 516 is 1.24x market P90 (415; P50 248, occupancy 35%).
- **Against:** n=1, and we are **P50** of the 1-night 2-bed sample, whose median rose £551.50 -> £590.50 overnight (n=20).
- Reyhan's +100% is not settled by policy, so it stays **confirm or revert**. I make no new proposal.

## P10 Hanger Lane, 1-bed (3318177)
Handed back: last night 18 Nov (policy `handbacks.P10`). All 60 nights in `prices.csv` (25 Nov) are unavailable. No positioning, nothing proposed.

## P02 Ladbroke Grove, P03 Bayswater
Blocked on purpose (policy `intentional_blocks`). All 60 nights in `prices.csv` (25 Nov) unavailable. No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or Smoobu (no rows in `listings.csv` or `prices.csv` for 25 Nov). Own price, percentile, rating gap and premium: **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (AWS WAF challenge, 25 Nov 07:27:08Z; not retried or bypassed). That covers Booking.com comps, our Booking.com displayed prices, P20's Booking.com capacity and whether the twins split on Booking.com. Comp cancellation terms come only from Airbnb pills.
2. **Why the twins split** (+2.6-3.2% in December, now +6.2-7.2% in January) is NOT CHECKED. The occupancy-profile difference is unchanged and is the only setting that differs; the causal link is an inference. The 24 Nov 09:37Z / 10:50Z twin refreshes have no listing-log edit, and customization history is not in the log.
3. **Why the January -8% does not show in `price`**: 3064856 5 Jan `uncustomized_price` 162 x 0.92 = 149, but `price` is 163. NOT CHECKED (4th day).
4. **Airbnb strikethroughs** on 3-night stays (3090701 13-16 Dec £679 -> £600, P20 14-17 Dec £958 -> £837 and others). Their cause is NOT CHECKED. The prices match the usual 0.765 factor, so no extra discount is implied.
5. **P20 Airbnb guest count 6 vs policy 4** (7th day): who changed it is NOT CHECKED.
6. **Airbnb factors** (0.765 at 28 days or less, 0.90 beyond) are inferred from prices; the rule behind them is NOT CHECKED.
7. **Thin comp coverage.** P13: n=0-4 on 27-29 Nov, 1-3 Dec, 13-15, 13-16, 17-20 (skewed), 18-21, 19-21, 19-22, 20-22, 18-22, 13-22 and 25-27 Dec. P20: n=0-1 on 27-29 Nov, 5 Dec (7th day) and 26 Dec. Only unsold comps can be priced, which biases peak medians.
8. P20's market percentiles use the 1-3 BR compset. With 3 reviews, the 0.85 line is judgement (the tool says x1.08).
9. 3090701's Airbnb mapping is still "likely" (policy `listing_facts.P13.ids`). The text of its 23 Nov review is not read.
10. P16, P18 and P19 have no data; P02, P03 and P10 have no sellable nights.
