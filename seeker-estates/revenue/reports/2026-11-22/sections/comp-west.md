# Competitor positioning: WEST + HERTS (D = 2026-11-22)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** I read `data/policy.json` first. Everything was read-only, and PriceLabs was called strictly one tool at a time (5 calls, all OK):
1. `get_user_logs` (listing, 20-22 Nov) for 3064856, 3090701 and 3547481: **2 entries, both Reyhan's 20 Nov 22:50:45Z -2% min 3 on 10-26 Dec** (3064856, copied to 3090701). **No edit since then** on any of the three.
2. `get_listing_date_overrides` 3064856 (22 Nov-21 Jan): newest `updated_at` is still 20 Nov 22:50:45Z. 10-26 Dec -2% min 3; 3-21 Jan -10% (from 4 Nov); 27 Nov / 1 Dec +25% min 1 (18 Nov).
3. `get_listing_date_overrides` 3547481: unchanged since 18 Nov 12:17:57Z. 22-24 Nov -5% min 2; 5 Dec and 26 Dec +100% min 1; 14-20 Dec 0% min 3; 21-25 Dec -5%; 1-21 Jan -5% min 3.
4. `get_neighbourhood_data` (detail, future prices + occupancy) for 3547481: Nearby Listings, 1-3 BR range, 271 listings. The 2 BR summary median is 253 (n=149).
5. `get_neighbourhood_data` (detail) for 3064856: Nearby Listings, 2-3 BR, 151 listings.

Every market P25/P50/P75/P90 and market occupancy below ("mkt 22 Nov") comes from these two pulls.

**Own prices.** These come from `prices.csv` and `raw/prices_*.json` for 22 Nov. The P13 twins were last refreshed **21 Nov 09:45:25Z / 09:45:26Z**, P20 **21 Nov 08:48:53Z**. 22 Nov is not in today's price window (it starts 23 Nov), so for P20 tonight I used `final_price` 283 from today's neighbourhood pull and 288 from the 21 Nov raw.

**Occupancy for `recommend`.** This comes from Smoobu `reservations.csv` for 22 Nov, cancelled stays excluded. Market occupancy is from `pl_kpis.csv`.
- P13 (one flat): 7 d 6/7 = 85.7% vs 57%; **30 d 19/30 = 63.3% vs 47%**; 60 d 31/60 = 51.7% vs 36%.
- P20: **7 d 4/7 = 57.1% vs 48%** (a lead of +9 pts, now under the +10 threshold); 30 d 21/30 = 70.0% vs 38%; 60 d 32/60 = 53.3% vs 29%.

**OTAs:**
- **Airbnb:** I read public search and listing pages on **2026-11-22 07:20-07:33Z** with plain `curl`. The scripts, boxes, comp ids and 4-adult search are the same as 18-21 Nov. There were 0 HTTP failures and no bot check.
- **Booking.com: NOT CHECKED.** One plain search at 07:23:21Z returned the AWS WAF challenge (HTTP 202, `AwsWaf`). I did not retry or bypass it.

**Method** (unchanged):
- Price = Airbnb all-in total / nights, after any offer shown. **The £150 cleaning fee is included**, plus any Airbnb guest fee. Taxes are not shown separately.
- **Line** = comp median x (1 + `quality_premium`):
  - 3090701: `quality_premium(4.7, 4.76)` = -0.024.
  - 3064856: `quality_premium(4.31, 4.76)` = -0.15 (the cap).
  - P20: 5.0 from 2 reviews. `quality_premium(5.0, 4.80)` = +0.08, but I keep the judgement line of comp median x 0.85, because 2 reviews prove nothing yet.
- **Factor** = (Airbnb total - £150) / the sum of the PriceLabs `price` for the same nights.

**Comp sets.** The ids are the same as 18-21 Nov (`comps.json`). None were replaced, and all are active: every kept comp was returned on at least 1 stay today (P13 11 comps, P20 12 comps).
- 789954794593691037 was returned on 22-24 Dec (£403.50).
- 1598588327559113265 was not returned for 24-26 Nov (it was yesterday) but was returned on 19-21 Dec and in January.

**Ratings and reviews.** Listing pages on 22 Nov show every comp's rating, review count and capacity unchanged vs 21 Nov.
- Ours: 3090701 4.7 (10), 3064856 4.31 (13), P20 5.0 (2). No new reviews.
- Comp medians: P13 **4.76** (13 reviews), P20 **4.80** (17.5).
- Review gap vs comp median: 3090701 -3, 3064856 0, P20 **-15.5**.

**P20 Airbnb guest count: still 6 (4th day).** The listing page at 22 Nov 07:21Z shows `personCapacity` **6** (it was 4 on 18 Nov). Policy `listing_facts.P20.max_guests` = 4 (Corentin 24 Oct). This stays **confirm or revert for Corentin**, and I propose nothing. It does not affect the numbers: every search was run at 4 adults, and the comps sleep 4-5. Booking.com capacity: NOT CHECKED (WAF).

**Same comps vs 21 Nov** (53 P13 and 37 P20 comp pairs priced on both days):
- P20 comps all moved within ±5.1%. The largest moves were 1516006875488990547 (-5.1%, 14-17 Dec) and 1568001017881493647 (-3.2%, 26-30 Dec).
- P13 comps all moved within ±6.0%. The largest were 1598588327559113265 (+6.0%, 19-21 Dec) and 1568189670839493789 (+3.2%, 20-22 Dec).
- **Ours moved more than the comps, downward again on P13:**
  - 3064856 fell **-4.3% to -8.4% on every 13-22 Dec Airbnb stay**. 3090701 fell 0% to -5.6%.
  - P20 moved: 22-24 Nov **+4.1%**, 5 Dec +1.1%, 14-19 Dec -0.8% to +2.0%, 26 Dec -0.5%.

**Rows written:**
- **1,215 rows** appended to `data/snapshots/2026-11-22/comps.csv` under `flock` on `.comps.csv.lock`. The file had already been copied forward by another agent.
  - Kept comps: P13 176 (11 x 16 stays) and P20 144 (12 x 12). A blank price with "NOT RETURNED" in `source` means the comp was not returned for that stay.
  - Ours: `P13:ours` 32 and `P20:ours` 12.
  - Wider 2-bed sample: `P13:wide` 526 and `P20:wide` 325.
- **24 rows** appended to `channel_checks.csv` (our Airbnb displayed prices) under `.channel_checks.csv.lock`.
- To find these rows, filter `source` on "comp-west", "checked 2026-11-22" and "stay <ci> to <co>".

**Recompute check.** I ran `snapshot.load('2026-11-22')` + `comp_summary`, filtered by stay. It matches the tables:

| Listing | Stay | n | Median | Our position |
|---|---|---|---|---|
| P13 both twins | 13-16 Dec | 4 | 232.17 | P0 / -14.7% |
| P13 both twins | 16-19 Dec | 6 | 236.83 | P0 / -13.0% |
| P13 both twins | 18-21 Dec | 3 | 238.0 | P0 / -10.2% |
| P13 both twins | 19-22 Dec | 2 | 230.67 | P50 / -3.5% |
| P13 both twins | 5-8 Jan | 8 | 211.33 | P38 / -4.3% |
| P13 both twins | 14-17 Jan | 8 | 217.0 | P25 / -7.7% |
| P20 | 22-24 Nov | 2 | 289.25 | P100 / +8.6% |
| P20 | 14-17 Dec | 9 | 291.33 | P33 / -3.8% |
| P20 | 14-19 Dec | 7 | 304.0 | P14 / -11.7% |
| P20 | 16-19 Dec | 7 | 317.0 | P29 / -7.4% |
| P20 | 26-27 Dec | 1 | 494.0 | P100 / +28.7% |

## Comp tables (Airbnb all-in £/night, 4 adults, checked 2026-11-22 07:20-07:33Z)
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- For our listings, "not returned" means booked, blocked or below the minimum stay:
  - P13: 24-26 Nov booked/blocked. 27-29 Nov hits the 28 Nov booking. 13-15, 19-21 and 20-22 Dec are below min 3. 22-24 and 22-27 Dec are booked.
  - P20: 22-23 and 23-24 Nov are below min 2. 24-26 Nov hits the 25 Nov booking. 27-29 Nov and 22-24 Dec are booked. 26-30 Dec hits the 27 Dec booking.
- Default stays:
  - Next Fri-Sun = 27-29 Nov, midweek Tue-Thu = 24-26 Nov, 30 days out = 22-24 Dec. This replaces yesterday's 21-23 Dec.
  - On both properties every default stay is booked for us, so those columns are comps only.

#### P13
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 24 Nov-26 Nov | 27 Nov-29 Nov | 13 Dec-15 Dec | 13 Dec-16 Dec | 16 Dec-19 Dec | 17 Dec-20 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec | 19 Dec-22 Dec | 20 Dec-22 Dec | 18 Dec-22 Dec | 13 Dec-22 Dec | 22 Dec-24 Dec | 22 Dec-27 Dec | 5 Jan-8 Jan | 14 Jan-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.85 (13) | Garden view/balcony; Guest favourite; free cancellation |  |  |  | 228.67 |  |  |  |  |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.82 (11) | Paid parking; Guest favourite; free cancellation |  |  | 244 | 235.67 | 238.67 |  |  |  |  |  |  |  |  |  | 235.67 | 235.67 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking; garden; free cancellation |  |  |  |  | 225.33 |  | 238 | 255 |  |  |  |  |  |  | 218.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  | 235 | 245.33 | 248.67 | 275.5 | 243.67 | 260 | 231.5 |  | 240.5 | 202.6 | 214 | 225.33 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.74 (53) | Superhost; 2 bath |  |  |  |  |  |  |  |  |  | 278.5 |  |  |  | 303.8 | 196.33 | 202 |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | Garden | 152.5 |  |  |  |  |  |  |  |  |  |  |  |  |  | 135.67 | 154.67 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed | 216 |  | 233.5 | 208.67 | 215 | 224 | 224 | 247 | 217.67 | 233.5 | 207.5 | 163.89 | 245 | 211.8 | 208.67 | 208.67 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5 (10) | Lift; skyline view |  |  |  |  | 450.67 | 456.67 |  |  |  |  |  |  |  |  | 419.33 | 430.33 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking |  |  | 240.5 | 238.33 |  |  |  |  |  |  |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5 (13) | Lift/paid parking/balcony/panoramic view; Guest favourite; free cancellation |  |  |  |  | 363.67 | 363.67 |  |  |  |  |  |  |  |  |  | 316.67 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking; garden |  |  |  |  |  |  |  | 177.5 |  |  |  |  |  |  | 141.67 | 161.67 |
| **Comp median (n)** | | | 4.76 (13) | | **184.25** (2) | - (0) | **240.50** (3) | **232.17** (4) | **236.83** (6) | **304.50** (4) | **238.00** (3) | **251.00** (4) | **230.67** (2) | **260.00** (3) | **219.50** (2) | **163.89** (1) | **242.75** (2) | **211.80** (3) | **211.33** (8) | **217.00** (8) |
| Wider 2-bed sample median (n) | | | | | 216.00 (23) | 374.00 (7) | 258.75 (38) | 240.33 (47) | 249.67 (47) | 271.50 (46) | 280.83 (42) | 297.00 (20) | 300.00 (39) | 275.00 (29) | 282.00 (47) | 264.33 (37) | 283.50 (22) | 298.50 (38) | 220.50 (50) | 223.00 (59) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.7 (10)** | | 6 | | | not returned | not returned | not returned | **198.00** | **206.00** | **213.00** | **213.67** | not returned | **222.67** | not returned | **208.25** | **172.22** (strike £1,797 -> £1,550) | not returned | not returned | **202.33** | **200.33** |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | 6 | | | not returned | not returned | not returned | **198.00** | **206.00** | **213.00** | **213.67** | not returned | **222.67** | not returned | **208.25** | **172.22** (strike £1,797 -> £1,550) | not returned | not returned | **202.33** | **200.33** |

#### P20
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 22 Nov-24 Nov | 22 Nov-23 Nov | 23 Nov-24 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 5 Dec-6 Dec | 14 Dec-17 Dec | 14 Dec-19 Dec | 16 Dec-19 Dec | 22 Dec-24 Dec | 26 Dec-27 Dec | 26 Dec-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Houseboat, marina view; Superhost; Guest favourite |  |  |  |  |  |  | 282.67 | 278.8 | 281 |  |  | 285.25 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Terrace; free parking; Guest favourite; free cancellation |  |  |  |  |  |  |  |  |  |  |  | 325.25 |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking |  |  |  |  |  |  |  |  |  | 403.5 |  |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (57) | Lift; 2 bath |  |  |  |  |  |  |  |  |  |  |  | 442.75 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/paid parking/river view/balcony; 2 bath |  |  |  |  |  |  | 382.67 | 378.6 | 382.67 |  |  | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony; 12th-floor skyline |  |  |  |  |  |  | 324 | 334.4 | 341.33 | 357 | 494 | 417 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking |  |  |  |  |  |  | 261.67 | 249.8 | 268.67 | 281.5 |  |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/paid parking/balcony |  |  |  |  |  |  | 333.33 | 327.8 | 333.33 |  |  | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/paid parking/balcony |  |  |  |  |  |  | 291.33 | 304 | 317 |  |  | 403.5 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/Thames view; Superhost; free cancellation |  |  |  |  |  |  | 211.33 |  |  |  |  |  |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking; townhouse | 288.5 |  |  | 288.5 |  |  | 250 |  |  |  |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5 (25) | Balcony; Superhost; Guest favourite | 290 |  |  | 270 | 310 |  | 306 | 291.8 | 309 | 390 |  | 360 |
| **Comp median (n)** | | | 4.80 (17.5) | | **289.25** (2) | - (0) | - (0) | **279.25** (2) | **310.00** (1) | - (0) | **291.33** (9) | **304.00** (7) | **317.00** (7) | **373.50** (4) | **494.00** (1) | **370.12** (8) |
| Wider 2-bed sample median (n) | | | | | 355.00 (27) | 382.00 (15) | 435.00 (14) | 299.00 (35) | 500.50 (17) | 693.00 (12) | 269.67 (45) | 279.70 (54) | 308.33 (51) | 390.00 (39) | 530.00 (18) | 422.50 (41) |
| **Ours 3547481 (Airbnb 1791529331262420081) 5 (2)** | | 6 | | | **314.00** | not returned | not returned | not returned | not returned | **548.00** | **280.33** | **268.40** | **293.67** | not returned | **636.00** | not returned |

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### What changed since 21 Nov: the twins are now identical on every open December night and on every Airbnb stay checked
**PriceLabs 13-21 Dec after the 21 Nov 09:45Z refresh.** Both twins are now **195/194/191/194/202/215/221/205/213**, the same on all 9 open nights.
- 3064856 was 209/205/203/207/215/228/234/217/227 (-5% to -7%).
- 3090701 was 197/193/191/195/202/215/220/205/227 (-1% to +0.5%; 21 Dec -6%).

**Cause.** No user edit since Reyhan's 20 Nov 22:50Z -2% (logs and overrides, calls 1-2). Both twins' `uncustomized_price` is now identical on 13-21 Dec (202/196/188/195/210/235/247/214/230); for 3064856 it was 213/203/194/... yesterday. Both carry the same -2%, so the outputs match. The algorithm-side reason for the converged uncustomised price is NOT CHECKED (PriceLabs auditor).

**On Airbnb the twins are identical on every stay checked:**
- 13-16 Dec £198.00, 16-19 £206.00, 17-20 £213.00, 18-21 £213.67, 19-22 £222.67 and 18-22 £208.25 on both.
- 13-22 Dec (9 n): strike £1,797 -> **£1,550 on both**. That is (1,797 - 150) x 0.85 + 150 = £1,549.95, so the weekly -15% is per policy.
- January: 5-8 Jan £202.33 and 14-17 Jan £200.33 on both, as yesterday. PriceLabs `price` is identical on all 17 nights 3-19 Jan.

**Twin rule.** This breaks policy `listing_facts.P13.twin_listings` ("slightly different photos and prices or Airbnb blocks them as duplicates"). Yesterday the gap was 6% in PriceLabs and 3.0-4.7% on Airbnb; today it is **0%**. Which twin is cheaper does not matter (policy `deprioritised.p13_twin_price_order`).

**Reyhan's 20 Nov -2% on 10-26 Dec** (both twins) is still **confirm or revert for Corentin**. It conflicts with "cut PriceLabs discounts". It is not a new proposal.

**Airbnb factor** vs PriceLabs `price`:
- 0.766 on nights 28 days out or less (now up to 19 Dec).
- 0.80-0.81 on stays that straddle day 28.
- 0.90 beyond 28 days.
- These are unchanged. The Smoobu/Airbnb rule behind them is NOT CHECKED.

**27 Nov / 1 Dec** (Reyhan +25% min 1): 3064856 264 / 225, 3090701 185 / 158. These are single nights, so no comps were priced. The 1 Dec +25% vs the policy +50% stays confirm or revert.

### 13-21 Dec (9 open nights): +10% on 3090701 13-17 Dec, +5% on 18-21 Dec; 3064856 hold
| Stay | Ours, both twins (21 Nov 3090701 / 3064856) | Comp median (n) | Comp pctl / vs median | vs line 3090701 / 3064856 | Wider pctl (n, median) | PL avg vs mkt P50 (mkt occ) | Factor | `recommend` (30 d, +16 pts) |
|---|---|---|---|---|---|---|---|---|
| 13-15 Dec (2 n) | below min 3 | 240.5 (3) | comps only | | (38, 258.75) | 194.5 vs 222.0 (33%) | | |
| **13-16 Dec** | **198.00** (198.67 / 207.33) | 232.17 (4) | **P0 / -14.7%** | **-12.6%** / +0.3% | P11 (47, 240.33) | 193.3 vs 222.3 (-13.0%; 31%) | 0.766 | raise +10% |
| **16-19 Dec** | **206.00** (206.33 / 216.00) | 236.83 (6) | **P0 / -13.0%** | **-10.9%** / +2.3% | P13 (47, 249.67) | 203.7 vs 235.0 (-13.3%; 35%) | 0.766 | raise +10% |
| 17-20 Dec | 213.00 (213.00 / 222.67) | 304.5 (4, incl. lift/skyline comps at 456.67 / 363.67) | P0 / -30.0% | -28.3% / -17.7% | P13 (46, 271.5) | 212.7 vs 242.7 (42%) | 0.766 | raise +10% |
| **18-21 Dec** | **213.67** (223.00 / 233.00) | 238.0 (3) | **P0 / -10.2%** | **-8.0%** / +5.6% | P10 (42, 280.83) | 213.7 vs 244.0 (-12.4%; 46%) | 0.766 | raise +10% |
| 19-21 Dec (2 n) | below min 3 | 251.0 (4) | comps only | | (20, 297) | 213.0 vs 245.0 (49%) | | |
| 19-22 Dec | 222.67 (236.00 / 243.00) | 230.67 (2) | P50 / -3.5% | -1.1% / +13.6% | P13 (39, 300) | 213.0 vs 246.3 (49%) | 0.811 | raise +10% |
| 20-22 Dec (2 n) | below min 3 | 260.0 (3) | comps only | | (29, 275) | 209.0 vs 245.0 (48%) | | |
| 18-22 Dec | 208.25 (218.25 / 226.00) | 219.5 (2) | P50 / -5.1% | -2.8% / +11.6% | P9 (47, 282) | 213.5 vs 245.2 (47%) | 0.800 | raise +10% |
| 13-22 Dec (9 n, weekly -15%) | 172.22 on both (strike £1,797 -> £1,550) | 163.89 (1) | n=1 | | P3 (37, 264.33) | 203.3 vs 234.6 (38%) | 0.765 | numbers only |
| 22-24 Dec (30-day default) | booked | 242.75 (2) | comps only | | (22, 283.5) | | | |

**3090701 13-17 Dec: +10% supported.** PriceLabs would go 195/194/191/194/202 -> about **215/213/210/213/222**.
- It is P0 on 13-16 Dec (-14.7%, n=4) and on 16-19 Dec (-13.0%, n=6), and 11-13% under its rating line.
- The comps moved within ±6%, so the gap comes from our own falls, not from the market.
- PriceLabs is 13% under market P50 at 31-35% market occupancy.
- With +10%, 13-16 Dec is about **£212.90 on Airbnb (-8.3% vs median, -6.0% vs line)** and 16-19 Dec about £221.58 (-6.4%, -4.1%). It stays below the line.

**3090701 18-21 Dec: +5% supported** (215/221/205/213 -> about 226/232/215/224).
- 18-21 Dec is P0, 8.0% under the line.
- 19-22 Dec (n=2) is 1.1% under it, so +5% puts 19-22 Dec about 3-4% over the line. That is why the step is +5% and not +10%.

**3064856 13-21 Dec: hold.**
- It is P0-P50, 3.5-14.7% under the comp median, but +0.3% to +13.6% over its 4.31 rating line.
- Reverting Reyhan's -2% on 3064856 alone (about +2%) is within the evidence. Anything beyond about +3% on 13-18 Dec would leave the evidence.

**Twin gap.** These moves put 3090701 about 10% dearer on 13-17 Dec and about 5% dearer on 18-21 Dec. The twins are no longer identical, and the higher-rated twin carries the premium.
- If Corentin prefers a narrower gap, the floor the twin rule needs is any non-zero difference. The smallest evidence-backed option is 3090701 +5% with 3064856 held: still under 3090701's line on 13-19 Dec.

`recommend` says +10% on the 30-day lead (63.3% vs 47%). The like-for-like evidence supports +10% on 3090701 only.

### January twins: +3% on 3090701 (3-18 Jan); hold 3064856 (4th day; not applied)
- **5-8 Jan:** both £202.33 (unchanged). P38 of 8, -4.3% vs median 211.33.
  - Lines: 3090701 £206.26 (-1.9%); 3064856 £179.63 (+12.6%).
  - PriceLabs 169.0 vs market P50 205.3 (-17.7%). Market occupancy **17%**.
- **14-17 Jan:** both £200.33 (21 Nov £201.00). P25 of 8, -7.7% vs median 217.0.
  - Lines: 3090701 £211.79 (-5.4%); 3064856 £184.45 (+8.6%).
  - PriceLabs 167.0 vs P50 209.3 (-20.2%). Market occupancy **12%**.
- **Supported: +3% on 3090701 for 3-18 Jan, 3064856 unchanged.** That puts 3090701 at about its line on 5-8 Jan and 2-3% under it on 14-17 Jan, and gives a 3% twin gap. 14-17 Jan alone would carry up to +5%.
- With market occupancy at 10-17% I do not argue more than +3%, despite `recommend`'s +10%.
- 3064856 has a -10% override on 2-21 Jan (from 4 Nov) and still prices identical to 3090701. The twins' uncustomised prices differ (3 Jan 164 vs 170).

## P20 Waterford Court, 2-bed (Airbnb 1791529331262420081, 5.0 from 2 reviews; Airbnb shows 6 guests, see above)

### What changed since 21 Nov
**22-24 Nov: the Smoobu/PriceLabs mismatch is gone on Airbnb.**
- Airbnb shows **£628 for 22-24 Nov** = £478 room = **0.850 x (283 + 279)**. Those are today's PriceLabs values: `final_price` 283 for 22 Nov from the neighbourhood pull, and `price` 279 for 23 Nov.
- That is Airbnb's 15% last-minute discount on the current PriceLabs price (policy `listing_facts.P20.airbnb_discounts_22oct`).
- Yesterday's guest price was £603 (0.851 x Smoobu 266 + 266). Ours rose **+4.1%** to £314/night.

**Other PriceLabs moves (21 Nov 08:48Z refresh):**
- 5 Dec 512 -> 520.
- 26 Dec 543 -> 539.
- 17 Dec 307 -> **333** (+8.5%); the other 14-18 Dec nights moved -1%.
- January -1% to -3% (for example 3 Jan 242 -> 235).

**Overrides** are unchanged since 18 Nov (call 3).

**5 Dec** is open again after the 20 Nov sale and cancellation.

Column key: "Line" = comp median x 0.85. "PL vs market" uses the Nearby Listings compset (1-3 BR range), which understates a 2-bed P50. The 2 BR summary median is 253.

| Stay | Ours 22 Nov (21 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n, median) | PL avg / mkt P50, P75, P90 (mkt occ) | Factor | `recommend` (horizon) |
|---|---|---|---|---|---|---|---|---|
| **22-24 Nov (tonight, min 2)** | **314.00** (301.50) | 289.25 (2: 757342335233586120 £288.50, 1343981071946969781 £290.00) | **P100 / +8.6%** | +27.7% | **P37** (27, 355) | 281 / 214, 269, 352 (54%) | **0.850** vs PL 283/279 | **hold** (7 d +9 pts at P100) |
| 22-23 Nov / 23-24 Nov (1 n) | below min 2 | none returned | | | (15, 382) / (14, 435) | | | |
| 24-26 Nov (midweek default) | 25 Nov booked | 279.25 (2) | comps only | | (35, 299) | | | |
| 27-29 Nov (Fri-Sun default) | booked | 310.0 (1) | comps only | | (17, 500.5) | | | |
| **5 Dec (orphan, 1 n)** | **548.00** (542.00) | none returned (4th day) | n=0 | | **P25** of 1-night 2-beds (12, £693) | **520** / 228, 296, **396** (57%) | 0.765 | numbers only |
| 14-17 Dec | 280.33 (282.67) | 291.33 (9) | P33 / -3.8% | +13.2% | P53 (45, 269.67) | 301.0 / 215 (26%) | 0.765 | raise +5% |
| **14-19 Dec (all 5 open nights)** | **268.40** (265.80) | 304.0 (7) | **P14 / -11.7%** | **+3.9%** | P37 (54, 279.7) | 311.4 / 220 (27%) | 0.766 | raise +5% |
| 16-19 Dec | 293.67 (288.00) | 317.0 (7) | P29 / -7.4% | +9.0% | P41 (51, 308.33) | 318.3 / 223 (28%) | 0.765 | raise +5% |
| 22-24 Dec (30-day default) | booked | 373.5 (4) | comps only | | (39, 390) | | | |
| **26 Dec (orphan, 1 n)** | **636.00** (639.00) | **494.0 (1)** | **P100 / +28.7%** | +51.5% | P61 of 1-night 2-beds (18, £530) | **539** / 251, 323, **415** (36%) | 0.902 | hold (7 d lead, P100) |
| 26-30 Dec (context) | 27 Dec booked | 370.12 (8) | comps only | | (41, 422.5) | | | |

(`recommend` here uses the 7-day lead, +9 pts, for every row. On the 30-day lead, +32 pts, 14-19 Dec would read raise +10%, as yesterday.)

### 22-24 Nov (tonight): supported 0% to +5% vs comp median; we are +8.6%, so about -5% (PriceLabs 283/279 -> about 269/265) is the most the evidence argues
- At £314 we are P100 of 2 kept comps (both about £289), 27.7% over the line. PriceLabs 281 avg is above market P75 (266-273) at 48-55% market occupancy.
- A -5% cut gives about **£301.90 all-in (+4.4% vs median)**, the top of yesterday's supported range.
- Against a cut: `recommend` = hold (7-day lead +9 pts at P100), n=2 is thin, and the wider 2-bed sample puts us at P37 (median £355).
- Read: the comps support a small cut. It is weak evidence and **for Corentin, not urgent**. Tonight is same-day, so unsold nights earn nothing.
- If 22-24 Nov does not sell today, 23-25 Nov (2 n) is the only remaining combination (24-26 Nov hits the 25 Nov check-in). 23-25 Nov was not priced today.
- The min 2 on these nights (Reyhan, vs policy min 3 to 30 Nov) stays **confirm or revert**.

### 5 Dec (Reyhan +100%, min 1): hold; numbers only
- Airbnb shows £548 (PriceLabs 520 x 0.765 + 150). No kept comp was returned for 5-6 Dec (4th day).
- £548 is P25 of the 1-night 2-bed sample (n=12, median £693).
- The 20 Nov sale paid £343.33 room (cancelled the same day). That sits between market P75 (296) and P90 (396).
- Read: like-for-like comps support no direction (n=0). PriceLabs 520 is at about the market P90 equivalent on Airbnb (396 / 0.765 = 518). **No cut is argued** (judgement, not a function output).

### 14-19 Dec: hold (0%); supported position -4% to -12% vs comp median
- P14-P33, -3.8% to -11.7% vs median, and +3.9% to +13.2% over the line. The comps moved within ±5%.
- Ours rose about 1-2% (17 Dec 307 -> 333). Market occupancy is 26-28%.
- 14-19 Dec is only 3.9% above the line (£258.40). `recommend`'s +5% / +10% rests on the lead, not on these nights. The evidence supports hold.

### 26 Dec (Reyhan +100%, min 1): about -29% supported (539 -> about £381); thin, for Corentin as evidence
- The only kept comp returned is 1684834789445533643 (lift/balcony, 12th-floor skyline, 4.39 from 18) at **£494** all-in. We are +28.7% above it and 51.5% over the line.
- PriceLabs 539 is above market **P90 415** (P50 251, occupancy 36%).
- Matching that comp needs (494 - 150) / 0.902 = **£381**. PriceLabs `uncustomized_price` is 360.
- Against: n=1, and the wider 1-night sample puts us at P61 (median £530).
- Reyhan's +100% is not settled by policy, so it is **confirm or revert** for Corentin with this evidence.

## P10 Hanger Lane, 1-bed (3318177)
Handed back: last night 18 Nov (policy `handbacks.P10`). All 60 nights in `prices.csv` for 22 Nov are unavailable. No positioning and nothing proposed.

## P02 Ladbroke Grove, P03 Bayswater
Blocked on purpose (policy `intentional_blocks`). All 60 nights in `prices.csv` for 22 Nov are unavailable. No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or Smoobu (no rows in `listings.csv` or `prices.csv` for 22 Nov). Own price, percentile, rating gap and premium: **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (AWS WAF challenge, 22 Nov 07:23:21Z; not retried or bypassed). That covers Booking.com comps, our Booking.com displayed prices, P20's Booking.com capacity and whether the twins also match on Booking.com. Comp cancellation terms come only from Airbnb pills.
2. **Why the P13 twins' `uncustomized_price` converged** on 13-21 Dec at the 21 Nov 09:45Z refresh, with no user edit: NOT CHECKED (PriceLabs auditor).
3. **The value Reyhan's 20 Nov -2% replaced** on 10-26 Dec: NOT CHECKED (the log window starts 18 Nov).
4. **P20 tonight's price** comes from `final_price` 283 in the neighbourhood pull, because 22 Nov is not in today's price window. It is consistent with Airbnb (0.850 x 562). 23-25 Nov was not priced.
5. **P20 Airbnb guest count 6 vs policy 4** (4th day): who changed it is NOT CHECKED.
6. **Airbnb factors** (0.765 at 28 days or less, 0.85 last-minute on P20, 0.90 beyond 28 days) are inferred from prices. The rule behind them is NOT CHECKED.
7. **Thin comp coverage:**
   - P13: n=0-4 on 24-26 Nov, 27-29 Nov, 13-15, 13-16, 17-20 (skewed), 18-21, 19-21, 19-22, 20-22, 18-22, 13-22 and 22-24 Dec.
   - P20: n=0-2 on 22-24 Nov, 22-23, 23-24, 24-26, 27-29 Nov, 5 Dec (n=0, 4th day) and 26 Dec (n=1).
   - Only unsold comps can be priced, which biases peak medians.
8. P20's market percentiles use the 1-3 BR compset. P20 has 2 reviews, so the 0.85 line is judgement.
9. P13's Airbnb-to-Smoobu id mapping is still "likely" (policy). P16, P18 and P19 have no data; P02, P03 and P10 have no sellable nights.
