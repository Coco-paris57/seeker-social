# Competitor positioning: WEST + HERTS (D = 2026-11-06)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** `data/policy.json` read first. PriceLabs calls were read-only and made one at a time; all returned 200:
1. `get_user_logs` (listing log, 5-6 Nov) for 3064856, 3090701, 3547481, 3318177: **4 entries, all Reyhan, 5 Nov 10:54:55-10:55:03Z, all on P13** (see below). Nothing on P20 or P10.
2. `get_listing_date_overrides` 3064856 (6 Nov-31 Dec) and 3090701 (6-30 Nov).
3. `get_neighbourhood_data` detail for 3064856 (2 BR n=117, P25/P50/P75 189/223/274) and 3547481 (2 BR n=153, 213/249/316). Saved to `scratchpad/west06/dl/neigh_*.json`.

**Smoobu** (GET `/rates` only, 6 Nov-27 Dec, saved `scratchpad/west06/dl/smoobu_rates.json`): equals the PriceLabs `price` field in `raw/prices_*.json` on every night **except 3090701 on 8-11 Nov** (below). `reservations.csv` 6 Nov: **no change for P10, P13 or P20** vs 5 Nov.

**Airbnb:** public search and listing pages, checked 2026-11-06, plain `curl`, default headers; no bot check met. **Booking.com: NOT CHECKED.**

**Method (unchanged from 3-5 Nov):** 4 guests, entire home, min 2 bedrooms; ~1.3 km box around the PriceLabs coordinates plus ~0.2 km box around each comp. Price = Airbnb all-in total / nights (cleaning and Airbnb fees INCLUDED, taxes not shown separately; ours on the same basis, £150 cleaning). 5+ night stays are after length-of-stay discounts. Comp cancellation policy NOT CHECKED.

**Comp sets: no replacements today.**
- P13: same 11 ids. 10 returned on at least one stay. **1411449348357673454** (Superhost 4.78/49) was not returned on any of the 14 stays, but a 0.2 km probe returned it for 29 Nov-2 Dec (£929 total) and 10-13 Jan 2027, so it is still bookable inside 60 days: **kept**, not replaced.
- P20: same 12 ids (incl. 6488364, added 5 Nov); all 12 active.

**Occupancy** (Smoobu `reservations.csv` 6 Nov, cancelled excluded; market `kpi_pack` 6 Nov):

| Listing | 14 d (6-19 Nov) | 30 d (6 Nov-5 Dec) | 60 d (6 Nov-4 Jan) | Market 30 / 60 | Lead 30 / 60 |
|---|---|---|---|---|---|
| P13 | 8/14 | 22/30 = **73.3%** | 30/60 = **50.0%** | 42% / 38% | **+31 / +12 pts** |
| P20 | 3/14 | 13/30 = **43.3%** | 13/60 = **21.7%** | 36% / 30% | **+7 / -8 pts** |

P20's 30-day lead fell from +11 to +7 pts (window roll, no new booking), so `recommend` on November stays moved from "raise +10%" to "in line, raise +5% where below what quality supports".

**Rows written:** `data/snapshots/2026-11-06/comps.csv` **286 rows** (P13 11 x 14 stays, P20 12 x 11) appended under `flock .comps.csv.lock` (file already copied forward by another agent). `channel_checks.csv` **34 rows** (our three Airbnb listings) under `.channel_checks.csv.lock`. Filter `source` on "checked 2026-11-06" and "comp-west"; `date` = check-in, full stay in `source`.
**Recompute check:** `snapshot.load('2026-11-06')` + `comp_summary` gives P13 8-10 Nov n=4 median 212, P0 / -10.4% (3090701) and -9.0% (3064856); P20 13-16 Nov n=7 median 304.33, P14 / -26.7%; P20 6-9 Nov n=3 median 290, P0 / -20.8%.

## Comp tables (Airbnb all-in £/night, 4 guests, checked 2026-11-06)
Bracket = same comp, same stay on 5 Nov where it moved by £1 or more. Blank = not returned (booked or min-stay).

#### P13

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 8-10 Nov | 10-12 Nov | 11-13 Nov | 8-13 Nov | 12-13 Nov | 13-15 Nov | 17-18 Nov | 27-28 Nov | 1-2 Dec | 7-9 Dec | 11-13 Dec | 18-20 Dec | 23-26 Dec | 18-26 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.82 (11) | Garden view/balcony |  | 242.5 (244.5) |  |  |  |  |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | Paid parking on premises/Guest favourite | 207 |  | 207 |  |  |  |  |  |  | 264.5 (269.5) |  |  |  |  |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking on premises | 206 | 206 | 206 | 174.8 |  |  |  |  |  | 231.5 (237.5) |  |  |  |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  |  |  |  |  |  |  |  | 270 (269) | 232 | 202.12 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.78 (49) | Superhost |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed |  |  |  |  |  |  | 185 |  |  |  |  |  |  |  |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  |  |  |  |  |  |  |  |  | 242 (245) | 282.5 | 272 (273) | 249.67 (245.67) | 190.5 (188.75) |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift | 411 | 411 | 411 | 385.2 |  | 403.5 |  |  |  | 433.5 |  | 450 |  |  |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking on premises | 217 | 217 | 217 | 199 |  |  |  |  |  | 259 |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | Lift/Paid parking on premises/balcony/Guest favourite |  |  |  |  | 403 |  |  | 394 | 423 |  |  | 331.5 |  |  |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking on premises |  |  |  |  |  |  | 185 |  |  |  |  |  |  |  |
| **Comp median (n)** | | | 4.78 (13) | | **212** (4) | **229.75** (4) | **212** (4) | **199** (3) | **403** (1) | **403.5** (1) | **185** (2) | **394** (1) | **423** (1) | **259** (5) | **282.5** (1) | **301.75** (4) | **240.83** (2) | **196.31** (2) |
| Wider 2-bed sample median (n) | | | | | 217 (15) | 240.75 (16) | 217 (17) | 268.8 (22) | 312.5 (2) | 300 (11) | 185 (5) | 337.5 (4) | 456.5 (2) | 261.75 (18) | 351.5 (14) | 301.5 (13) | 288.33 (21) | 291.5 (17) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.67 (9)** | | | | | **190** | **194** | **206.5** | **158.6** (strike £864 -> £793) | not returned | not returned | **316** | **336** | **325** | **259.5** | **284** | **277.5** | **256.67** | **192.38** (strike £1,784 -> £1,539) |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | | | | **193** | **196.5** | **199** | **157.8** (strike £860 -> £789) | not returned | not returned | **298** | **406** | **391** | **250** (strike £541 -> £500) | **272.5** | **266** | **245.33** | **182.75** (strike £1,694 -> £1,462) |

#### P20

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6-9 Nov | 13-16 Nov | 16-18 Nov | 16-19 Nov | 20-23 Nov | 22-25 Nov | 5-8 Dec | 11-14 Dec | 18-21 Dec | 21-24 Dec | 23-27 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost | 281 | 281 |  | 281 | 283.33 (281) | 282.67 (281) | 283.67 (281) | 281 | 283.67 (281) | 281 | 279 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises |  | 304.33 (283.67) |  | 284.67 (282) |  |  |  | 266.67 | 264.33 (255.33) |  |  |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises |  |  | 403.5 | 393.33 | 393.33 |  |  |  |  | 393.33 | 388.5 |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (55) | Lift |  | 342.67 (335.33) |  | 324 (317.33) | 339 | 346.33 (343.33) | 369.33 (377.33) | 409.33 | 387.33 | 418.33 (407) | 408.25 (400.5) |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | 382.67 (396.67) | 382.67 |  | 382.67 | 382.67 | 382.67 | 382.67 | 382.67 | 382.67 | 382.67 | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony |  |  |  |  | 338.67 | 323 | 392.33 | 463.67 | 479 | 446.67 | 505.75 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises |  |  | 281.5 | 261.67 | 276.33 | 261.67 |  | 276.33 |  | 261.67 | 262.5 |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony |  | 333.33 |  | 333.33 | 333.33 | 333.33 | 333.33 | 333.33 | 333.33 | 333.33 | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/Paid parking on premises/balcony (replaces 1384811870668527117, inactive next 60 days) |  |  |  |  | 286 (282.67) | 272.33 |  | 360.33 (358.67) | 370 (365.67) | 355 (349.33) | 361.25 (368.5) |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost |  | 179.67 (192) | 208 (215) | 196 (202.33) | 202 (214.67) | 215.67 (222.33) |  |  |  | 245 (241.33) | 243.25 (240.25) |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises |  |  | 264 | 250 |  | 250 |  |  | 250 |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 290 | 290 | 270 | 250 | 290 | 263.33 | 283.33 | 290 | 312 | 370 | 360 |
| **Comp median (n)** | | | 4.8 (18) | | **290** (3) | **304.33** (7) | **270** (5) | **282.84** (10) | **311.66** (10) | **277.5** (10) | **351.33** (6) | **333.33** (9) | **333.33** (9) | **362.5** (10) | **360.62** (10) |
| Wider 2-bed sample median (n) | | | | | 285.5 (6) | 290 (15) | 264 (17) | 268.34 (22) | 326.67 (17) | 274.33 (20) | 369.33 (11) | 346.33 (16) | 333.33 (17) | 362.5 (20) | 361.25 (21) |
| **Ours 3547481 (Airbnb 1791529331262420081) New, 0 reviews** | | | | | **229.67** | **223** | **249** | not returned | **246.33** | **273.67** | **309.67** | **290** | **289.67** | **307.67** | **300.75** |

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### What changed since 5 Nov 06:00Z
**Reyhan cut P13 again, 5 Nov 10:54-10:55Z** (`get_user_logs`; confirmed by `get_listing_date_overrides`, both twins):
- **8-12 Nov: -7% -> -10%**, min 2.
- **7-20 Dec: -5% -> -7%**, min 2.
- Unchanged: 13-16 and 18-26 Nov -2%; 17 Nov +35% min 1; 27 Nov +50% min 1; 1 Dec +50% min 1 (intentional per policy); 21-26 Dec -5% min 3; 27 Dec-31 Dec -3% min 7/5/4. Base 250 / 250 (`listings.csv`; recommended 237 / 236).
- Pushed prices (Smoobu `/rates` = PriceLabs `price`): 3064856 8-12 Nov **154/154/156/161/163** (5 Nov 159/159/162/167/168); 3090701 PriceLabs 173/173/176/181/183.
- **3090701 Smoobu 8-11 Nov = 150/150/150/160, not PriceLabs 173/173/176/181** (12 Nov 183 matches). No PriceLabs fixed override exists on those dates (only the -10%). Airbnb confirms the lower figure: 8-10 Nov £380 = (2 x 150 x 0.767) + 150. Source of the 150/160 (manual Smoobu edit or partial push) NOT CHECKED. It puts 3090701 **below market P25 (165-166)** on 8-10 Nov and makes it the cheaper twin on 8-11 Nov.

**Conflict for Corentin (not a new proposal):** policy `price_changes` 24 Oct set 8-12 Nov overrides to **0%**; Reyhan has them at **-10%** (was -7% on 5 Nov). **a-p13-record: not fixed, and the gap widened.**

### Price percentile, rating, review gap, supported positioning
Rating: comp median **4.78**, reviews **13** (no comp gained a review today). 3090701 **4.67 (9)**: -0.11, 4 reviews behind, `quality_premium` **-0.044**. 3064856 **4.31 (13)**: -0.47, level on reviews, `quality_premium` **-0.15** (capped).
`recommend` uses the comp percentile where n >= 3, else the PriceLabs market percentile (mkt). "PL vs P50" = pushed price vs PriceLabs 2 BR daily P50 (`neigh_3064856.json`), averaged over the stay.

| Stay | Listing | Airbnb 6 Nov (5 Nov) | Comp median (n) | Comp pctl / vs median | Wider pctl (n) | PL vs P50 | `recommend` |
|---|---|---|---|---|---|---|---|
| 8-10 Nov (Sun-Tue) | 3090701 | **190** (212) | 212 (4) | **P0 / -10.4%** | P7 (15) | Smoobu 150 vs 202 (-26%) | raise +10% |
| | 3064856 | **193** (197) | 212 (4) | **P0 / -9.0%** | P7 | 154 vs 202 (-24%, below P25 165.5) | raise +10% |
| 10-12 Nov (Tue-Thu midweek) | 3090701 | **194** (217) | 229.75 (4) | **P0 / -15.6%** | P19 (16) | Smoobu 150/160 vs 203 (-24%) | raise +10% |
| | 3064856 | **196.5** (201) | 229.75 (4) | **P0 / -14.5%** | P19 | 158.5 vs 203 (-22%, below P25 165) | raise +10% |
| 11-13 Nov (incl. 12 Nov) | 3090701 | 206.5 (219.5) | 212 (4) | P25 / -2.6% | P35 (17) | 171.5 Smoobu vs 206 (-17%) | raise +10% |
| | 3064856 | 199 (203.5) | 212 (4) | P0 / -6.1% | P24 | 162 vs 206 (-21%) | raise +10% |
| 8-13 Nov (5n, LOS disc.) | 3090701 | 158.6 (178.6) | 199 (3) | P0 / -20.3% | P5 (22) | | raise +10% |
| | 3064856 | 157.8 (162.2) | 199 (3) | P0 / -20.7% | P5 | 157.6 vs 203.8 (-23%) | raise +10% |
| 13-15 Nov (default Fri-Sun) | ours booked | 403.5 (1) | comp check only | | | | |
| 17 Nov (1n) | 3090701 / 3064856 | 316 / 298 (same) | 185 (2) | n=2 | P80 (5) | 217 / 193 vs 205 | mkt: raise +10% |
| 27 Nov (1n) | 3090701 / 3064856 | 336 / 406 | 394 (1) | n=1 | | 243 / **334 (+42% vs P50, above P75 299)** | mkt: raise +10% / +5% |
| 1 Dec (1n) | both | 325 / 391 | 423 (1) | n=1 | | | intentional (policy), no proposal |
| **7-9 Dec (30-day point)** | 3090701 | **259.5** (264) | 259 (5) | P60 / **+0.2%** | P50 (18) | 205 vs 230 (-11%) | raise +10% |
| | 3064856 | **250** (253.5; strike £541 -> £500) | 259 (5) | P40 / **-3.5%** | P39 | 194 vs 230 (-16%) | raise +10% |
| 11-13 Dec | 3090701 / 3064856 | 284 / 272.5 | 282.5 (1) | n=1 | P21 / P14 (14) | 232 / 219 vs 242 | mkt: raise +10% |
| 18-20 Dec | 3090701 | 277.5 (282) | 301.75 (4) | P50 / -8.0% | P38 (13) | 225 vs 246 (-9%) | raise +10% |
| | 3064856 | 266 (270.5) | 301.75 (4) | P0 / -11.8% | P15 | 212 vs 246 (-14%) | raise +10% |
| **23-26 Dec (Christmas)** | 3090701 | 256.67 (same) | 240.83 (2) | n=2 (+6.6%) | **P14 (21; median 288.33)** | 229.3 vs 265 (-13.5%) | mkt: raise +10% |
| | 3064856 | 245.33 (same) | 240.83 (2) | n=2 (+1.9%) | **P5** | 217 vs 265 (-18%) | mkt: raise +10% |
| 18-26 Dec (8n, weekly) | 3090701 / 3064856 | 192.38 / 182.75 | 196.31 (2) | n=2 | P6 / P0 (17; median 291.5) | 226.9 / 214.4 vs 254.6 | mkt: raise +10% |

**Next 14 days (6-19 Nov):** open nights are **8-12 Nov and 17 Nov only** (6-7 Nov linked-booked, 13-16 booked/linked-blocked, 18 Nov+ booked). Same-comp change on these stays is **0%** (comps did not cut); the one comp that moved was 1761224847419174970 (-£2). New: 1435433076956934058 (5.0, lift) reappeared at £411/night, which lifts the 10-12 Nov median to £229.75; excluding it the 8-13 Nov medians are £206-217.

**Supported positioning (one line each):**
- **3090701: line = -4% vs comp median (quality), and the +31-pt demand lead supports at or above it.** It now sits at **-10% to -16% (P0) on 8-12 Nov**, 6-12 pts below its own line, because of the -10% override plus the unexplained Smoobu 150/160. Evidence supports about **£204-222/night all-in (-4% to +5% vs £212)**, i.e. PriceLabs 8-12 Nov without the -10% (about 192-203), not the current 150-183.
- **3064856: line = -15% vs comp median (capped).** It sits at **-6% to -14.5% (P0)**, pushed price below market P25 on 8-11 Nov. `recommend` (lead +31) says raise +10%; evidence supports about **£206/night all-in on 8-10 Nov (-3%)**, which is what 0% gives (PriceLabs ~171 x 0.765 + cleaning).
- **The evidence supports policy's 0% on 8-12 Nov, not Reyhan's -10%:** comps are flat (0% same-comp change), we are P0 on every 2-night stay, and the flat is +31 pts ahead of market. Reported as a conflict for Corentin.
- **7-20 Dec -7% (new 5 Nov) is not supported:** at 7-9 Dec we are at P40-P60 / -3.5% to +0.2% with comps easing only 1.2%, at 18-20 Dec -8% / -12%, and 60-day lead is +12 pts; `recommend` says raise +10%. No standing decision covers December prices.

### Focus: 12 Nov (a-raise-1012nov)
Market 12 Nov: P25 173, **P50 209**, P75 275; occupancy **45.2%** (11 Nov 38.2%, 13 Nov 57.1%). Ours: **3064856 £163** (5 Nov 168; **below P25**), 3090701 £183, both min 2, so 12 Nov sells only as the last night of 11-13 Nov (13 Nov booked). On 11-13 Nov we are -2.6% / -6.1% vs 4 comps. The only comp returned for 12-13 Nov alone: 1205241472054931937 at £403 (n=1). Evidence-supported level (P50 x (1 + quality)): **3064856 ~£178, 3090701 ~£200**; today both are ~8% under it. **Status: not fixed, and moved the wrong way (-10% override).**

### Focus: Christmas (a-peak-check, P13 part)
Settings unchanged: 18-20 Dec -7% min 2 (was -5%), 21-26 Dec -5% **min 3**, 27 Dec+ booked (3090701 27 Dec-3 Jan) / linked-blocked, so **25 and 26 Dec arrivals remain impossible** (min 3 runs into 27 Dec). Not fixed.
Position: 23-26 Dec **P14 / P5 of the wider 2-bed sample** (median £288.33, n=21; £310.67 on 5 Nov). PriceLabs is **-13.5% / -18%** vs P50 265. The two kept comps moved +0.8%. Quality-supported 23-26 Dec PriceLabs level (P50 265 x (1 + q)): **3090701 ~£253** (now 229, +10%), **3064856 ~£225** (now 217, +4%). **The evidence does not support the 21-26 Dec -5%** (`recommend`: raise +10%).

### Twins (a-p13-twin)
Still differentiated, but the order flipped on 8-11 Nov because of 3090701's Smoobu 150/160: 8-10 Nov £380 (3090701) vs £386 (3064856), 1.6% apart; 10-12 Nov £388 vs £393 (1.3%); 11-13 Nov £413 vs £398. December: 7-9 Dec £519 vs £500 (3.7%), 23-26 Dec £770 vs £736 (4.6%). Pushed December prices differ by £11-14/night. Not identical, so no action. (Price order is deprioritised per policy; reported, not proposed.)

### 17 Nov, 27 Nov, 1 Dec singles
- 17 Nov: unchanged at £316 / £298 vs 2 comps at £185 (both sleep 7). Room-only Airbnb ~£166 / £148; market occupancy 30.9%. Hold: n=2 and comps' cleaning split unknown.
- 27 Nov: 3064856 PriceLabs 334 (+42% vs P50, above P75); Airbnb £406 vs the one comp £394 (5.0, lift, balcony). Unchanged.
- 1 Dec: intentional per policy; no proposal.

### Airbnb factor (for the channel section)
(our all-in - £150) / Smoobu price: **0.765-0.767** on all November stays (incl. 3090701 once its Smoobu 150 is used), **0.90** on December stays, 0.81 / 0.765 on 5+ / 8-night stays after LOS discounts. 3064856 7-9 Dec now shows a strikethrough (£541 -> £500) that was not there on 5 Nov; its source NOT CHECKED.

## P20 Waterford Court, 2-bed, max 4 (Airbnb 1791529331262420081, New, 0 reviews)

### What changed since 5 Nov 06:00Z
**PriceLabs edits: none** (`get_user_logs`). Overrides as reported 5 Nov (6-15 Nov -5% min 3; 16-19 Nov -5% min 2; 20-24 Nov -5% min 3; 25-30 Nov -10%; 1-20 Dec -5%; 21-26 Dec -5%). Base **330** (`listings.csv`), min 200, max 1800. Smoobu `/rates` = PriceLabs `price` on every night; 18-19 Nov still unavailable, 20-22 Nov open. No new booking.
Pushed vs "Your Price" (`raw/prices_3547481.json`): 20 Nov 238 vs 238 (5 Nov 238 vs 300); **21 Nov 244 vs 293**; 22-24 Nov 287/295/295 vs 279/286/286. 20-23 Nov Airbnb total **£770 -> £739**. Cause NOT CHECKED.
Conflicts for Corentin (unchanged, reported not proposed): base **330 vs 350** (policy `price_24oct`); 16-17 Nov **min 2 vs policy min 3**; **delivery block 18-19 Nov live vs 20-22 Nov in policy** (t-p20-delivery: still open).

### Price percentile, rating, review gap, supported positioning
Comp median rating **4.8**, reviews **17.5**; we have **no rating, 0 reviews**. `quality_premium` = **0.0** (no rating; the function does not price the review gap). The **-15% new-listing allowance** below is a judgement carried from 3 Nov, not the function. "PL vs P50" = pushed price vs PriceLabs 2 BR daily P50 (`neigh_3547481.json`).

| Stay | Airbnb 6 Nov (5 Nov) | Comp median (n) | Pctl / vs median | Wider pctl (n) | PL vs P50 | `recommend` (comp) |
|---|---|---|---|---|---|---|
| **6-9 Nov (arrives today, min 3)** | **229.67** (209.33) | 290 (3) | **P0 / -20.8%** | P17 (6) | 210 vs 212 (-1%) | raise +5% |
| **13-16 Nov (default Fri-Sun, min 3)** | **223** (223.33) | 304.33 (7) | **P14 / -26.7%** | P7 (15) | 226 vs 211.7 (+7%) | raise +5% |
| **16-18 Nov (midweek, min 2)** | **249** (244.5) | 270 (5) | P20 / -7.8% | P35 (17) | 227 vs 208.5 (+9%) | raise +5% |
| 16-19 Nov | not bookable (18-19 blocked) | 282.84 (10) | - | - | - | - |
| **20-23 Nov** | **246.33** (256.67) | 311.66 (10) | **P10 / -21.0%** | P18 (17) | 256 vs 213 (+20%) | raise +5% |
| 22-25 Nov | 273.67 (267.33) | 277.5 (10) | P50 / -1.4% | P50 (20) | 292 vs 210 (+39%) | hold |
| **5-8 Dec (30-day point)** | 309.67 (301.67) | 351.33 (6) | P33 / -11.9% | P27 (11) | 288 vs 222 (+30%) | raise +5% |
| 11-14 Dec | 290 (289) | 333.33 (9) | P33 / -13.0% | P25 (16) | 266 vs 223 (+19%) | **fix-listing** |
| 18-21 Dec | 289.67 (same) | 333.33 (9) | P33 / -13.1% | P35 (17) | 266 vs 232 (+15%) | **fix-listing** |
| **21-24 Dec (Christmas)** | 307.67 (308.33) | 362.5 (10) | P30 / **-15.1%** | P20 (20) | 286 vs 237 (+21%) | **fix-listing** |
| **23-27 Dec (Christmas)** | 300.75 (300.5) | 360.62 (10) | P30 / **-16.6%** | P14 (21) | 292 vs 251 (+17%) | **fix-listing** |

Comp moves: same-comp change 0% on every stay (medians); 1516006875488990547 cut 3-6% on 13-25 Nov; 1568001017881493647 +7% on 13-16 Nov. 6-9 Nov: only 3 comps still bookable for today's arrival, all £281+. Note 6-9 Nov ours rose to £229.67 (factor 0.85 vs 0.765 elsewhere; the 6 Nov night price is from the 5 Nov raw, the 6 Nov file starts 7 Nov); cause NOT CHECKED.

**Supported positioning (P20, one line each):**
- **13-16 Nov (-27%, P14) and 20-23 Nov (-21%, P10):** below even the -15% new-listing allowance; `recommend` (30-day lead now +7 pts) supports **+5%** (13-16 Nov to ~£232 all-in, still -24%). 20-23 Nov is low because 21 Nov pushes 244 against a Your Price of 293, not because of an override.
- **6-9 Nov (-21%, P0, n=3):** arrives today, PriceLabs already at market P50; gap is visibility of a 0-review listing as much as price. No move evidenced beyond `recommend` +5%.
- **16-18 Nov (-8%) and 22-25 Nov (-1%):** inside the line; hold.
- **December and Christmas (-12% to -17%, P30-P33):** `recommend` **fix-listing** from 11 Dec on (60-day lead -8 pts): conversion/visibility (0 reviews), **not price**. Neither a cut nor a raise is supported; **Reyhan's 21-26 Dec -5% is not supported** (comps flat, we are already -15% / -17%).
- Dates asked: **13-16 Nov £223 (P14)**; **16-18 Nov £249 (P20)** (16-19 not sellable); **20-23 Nov £246.33 (P10)**; **Christmas 21-24 Dec £307.67 (P30), 23-27 Dec £300.75 (P30)**; min stay 4 on 25-26 Dec, 6 on 27 Dec (Smoobu), so 23-27 Dec 4 nights is bookable.

## P10 Hanger Lane, 1-bed (3318177)
No sellable nights: `reservations.csv` 6 Nov Airbnb 18 Oct-19 Nov confirmed covers every night to the handback (policy last night 18 Nov). No comps or positioning.

## P02 Ladbroke Grove, P03 Bayswater
Blocked on purpose (policy `intentional_blocks`). No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or Smoobu (`kpi_pack` 6 Nov), so no own price: percentile, rating gap and premium **NOT CHECKED**; no comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (comps and ours); Airbnb only. Comp cancellation policies NOT CHECKED.
2. **Thin comp coverage** (labelled; uses market or wider percentiles): P13 n=1-2 on 12-13 Nov, 13-15 Nov, 17 Nov, 27 Nov, 1 Dec, 11-13 Dec, 23-26 Dec, 18-26 Dec; n=3-4 on 8-13 Nov. P20 n=3 on 6-9 Nov, n=5-6 on 16-18 Nov and 5-8 Dec.
3. **3090701 Smoobu 150/150/150/160 on 8-11 Nov vs PriceLabs 173-181**, with no PriceLabs fixed override: origin NOT CHECKED (Smoobu has no change log via the API used).
4. **P13 raw prices are from the 5 Nov ~10:55Z refresh** (`last_push` 5 Nov 10:55Z); P20 6 Nov night taken from the 5 Nov raw.
5. **Pushed vs "Your Price" gaps without logged edits:** P20 21 Nov 244 vs 293; cause NOT CHECKED.
6. **Airbnb 0.765 / 0.90 factors inferred** from totals; 3064856 7-9 Dec strikethrough and P20 6-9 Nov 0.85 factor unexplained.
7. **Comps' cleaning split unknown**, so all-in gaps on 1-night stays (17 Nov, 27 Nov, 1 Dec) overstate ours.
8. P13 Airbnb-to-Smoobu id mapping is "likely / probable" (policy `airbnb_listings_24oct`).
9. P16, P18, P19 have no data; P10 has no sellable nights.
