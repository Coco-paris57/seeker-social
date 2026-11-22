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

