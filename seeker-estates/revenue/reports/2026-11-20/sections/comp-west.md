# Competitor positioning: WEST + HERTS (D = 2026-11-20)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** I read `data/policy.json` first. Everything below was read-only, and PriceLabs was called strictly one tool at a time:
1. `get_listing_date_overrides` for 3547481 (20 Nov - 19 Jan). Newest `updated_at` is still **18 Nov 12:17:57Z** (Reyhan's 26 Dec +100% min 1): no override changed since yesterday.
2. `get_user_logs` (listing, 18-20 Nov) for 3547481, 3064856 and 3090701: the same **6 entries, all Reyhan 18 Nov 12:14-12:17Z**. **No new edits since 19 Nov.**
3. `get_neighbourhood_data` (detail, future prices + occupancy) for 3547481 (Nearby Listings, 1-3 BR range, 270 listings) and 3064856 (2-3 BR, 151 listings). Both OK. All market P25/P50/P75/P90 and market occupancy below come from these pulls ("mkt 20 Nov").
4. Own prices: `prices.csv` and `raw/prices_*.json` (20 Nov). The last PriceLabs refresh is **19 Nov 09:22:49Z** (P13 twins) and **09:23:00Z** (P20), i.e. before or around the new P20 booking; nothing since.
5. Occupancy for `recommend`: Smoobu `reservations.csv` 20 Nov (cancelled excluded); market occupancy from `pl_kpis.csv`.
   - P13 (one flat): 30 d **21/30 = 70.0%** vs 47%; 60 d 33/60 = 55.0% vs 37%.
   - P20: 7 d **4/7 = 57.1%** vs 48% (PriceLabs `pl_kpis` still says 14%: it has not registered the 19-22 Nov stay); 30 d 21/30 = 70.0% vs 38%; 60 d 34/60 = 56.7% vs 30%.

**OTAs:**
- **Airbnb:** public search and listing pages, checked **2026-11-20 07:20-07:30Z** with plain `curl`, default headers, same scripts, stays and boxes as 18-19 Nov (day-on-day comparable). No bot check, no HTTP errors.
- **Booking.com: NOT CHECKED.** One plain search request at 07:21Z returned the AWS WAF challenge (HTTP 202, `AwsWaf`). Not retried, not bypassed.

**Method** (unchanged):
- Search: 4 adults, entire home, at least 2 bedrooms; a wide box (half-side about 1.3 km) plus a 0.2 km box around each kept comp and each of our listings.
- Price = Airbnb all-in total / nights after any offer shown, **£150 cleaning included** (and any Airbnb guest fee); taxes not shown separately.
- **Line** = comp median x (1 + `quality_premium`): 3090701 `quality_premium(4.7, 4.76)` = **-0.024**; 3064856 `quality_premium(4.31, 4.76)` = **-0.15** (cap). P20 is **5.0 from 1 review**: `quality_premium(5.0, 4.80)` = +0.08, but I keep the judgement line of comp median x 0.85 (one review), as on 18-19 Nov.
- **Factor** = (Airbnb all-in x nights - £150) / sum of PriceLabs price (= Smoobu) for the same nights.

**Comp sets:** same ids as 18-19 Nov (`comps.json`); none replaced.
- **P13:** 11 comps, all active (each returned on at least 1 of 16 stays).
- **P20:** 12 comps. **789954794593691037 again absent from every standard stay (7th day)**; the 0.2 km activity probe found it bookable at 4.89 (18): 1-4 Dec £900, 7-10 Dec £1,180, 8-11 Jan £1,180 (identical to 19 Nov). It stays; probe rows are in `comps.csv` (`P20:probe`).

**Ratings and reviews** (listing pages 20 Nov): every comp's rating, review count and capacity is **unchanged** vs 19 Nov.
- Ours: 3090701 4.7 (10), 3064856 4.31 (13), P20 5.0 (1).
- Comp medians: P13 **4.76** (13 reviews), P20 **4.80** (17.5). Review gap vs comp median: 3090701 -3, 3064856 0, P20 -16.5.

**P20 Airbnb guest count (t-p20-guests-1911): still 6.** The listing page on 20 Nov 07:1xZ shows `personCapacity` **6** (4 on 18 Nov, 6 on 19 Nov). Policy `listing_facts.P20.max_guests` = 4 (Corentin 24 Oct). Still **confirm or revert for Corentin**; I propose nothing. It does not affect today's numbers: every search was run at 4 adults and P20 comps are kept at sleeps 4-5. Booking.com capacity NOT CHECKED (WAF).

**Same comps vs 19 Nov:** 37 P20 and 47 P13 comp pairs priced on both days.
- Comps were flat: every move within ±4.3%, except 1014671215040555613 (P13) 24-26 Nov +6.9%. Only 6488364 (P20, -4.0% to -4.3% on 14-19 Dec) and 1205241472054931937 (P13, +4.5% 17-20 Dec) moved more than 3%.
- **Ours moved more than the comps, all downward, all from the PriceLabs 19 Nov 09:22Z refresh plus the Airbnb ≤28-day factor (0.765) reaching mid-December:**
  - 3090701: -5.3% (13-16 Dec), -9.8% (16-19), -9.5% (17-20), -7.8% (18-21), -5.7% (18-22), -4.8% (13-22). PriceLabs 13-19 Dec fell 219/215/213/218/224/237/243 -> **204/200/198/202/208/221/226** (-7%).
  - 3064856: -1.4% to -6.0% on 13-21 Dec; +3.1% on 19-22 Dec (PriceLabs 19 Dec 243 -> 266).
  - P20: 16-19 Dec -6.9%, 14-19 Dec -4.7% (PriceLabs 17 Dec 332 -> 305; factor now 0.765 on every night to 18 Dec). Jan and 26 Dec within ±1%.

**Rows written:**
- **1,202 rows** appended to `data/snapshots/2026-11-20/comps.csv` under `flock` on `.comps.csv.lock` (another agent had already copied the file forward from 19 Nov).
  - Kept comps: P13 176 rows (11 x 16), P20 144 rows (12 x 12); comps not returned have a blank price and "NOT RETURNED" in `source`.
  - Ours (not comps): `P13:ours` 32, `P20:ours` 12. Wider 2-bed sample: `P13:wide` 505, `P20:wide` 330. `P20:probe` 3.
- **24 rows** appended to `channel_checks.csv` (our Airbnb displayed prices) under `.channel_checks.csv.lock`.
- Filter `source` on "comp-west", "checked 2026-11-20" and "stay <ci> to <co>".

**Recompute check** (`snapshot.load('2026-11-20')` + `comp_summary`, filtered by stay; matches the tables):

| Listing | Stay | n | Median | Position |
|---|---|---|---|---|
| P13 3090701 | 13-16 Dec | 4 | 235.17 | P0 / -13.4% |
| P13 3064856 | 13-16 Dec | 4 | 235.17 | P25 / -2.1% |
| P13 3090701 | 16-19 Dec | 6 | 236.0 | P0 / -10.6% |
| P13 3090701 | 19-22 Dec (30-day default) | 2 | 230.0 | P100 / +10.6% |
| P13 both twins | 5-8 Jan | 8 | 211.33 | P38 / -3.9% |
| P13 both twins | 14-17 Jan | 8 | 217.0 | P25 / -7.8% |
| P20 (sale, £288.18 all-in) | 20-22 Nov | 1 | 310.0 | P0 / -7.0% |
| P20 | 22-24 Nov | 2 | 289.25 | P100 / +1.8% |
| P20 | 14-17 Dec | 9 | 288.33 | P33 / -3.0% |
| P20 | 14-19 Dec | 7 | 300.6 | P14 / -12.6% |
| P20 | 16-19 Dec | 7 | 313.33 | P29 / -8.9% |
| P20 | 26-27 Dec | 1 | 494.0 | P100 / +34.4% |

## Comp tables (Airbnb all-in £/night, 4 adults, checked 2026-11-20 07:20-07:30Z)
- Blank = comp not returned for that stay (booked or min-stay). For ours, "not returned" = booked, blocked or below the minimum stay:
  - P13: 20-29 Nov booked/blocked (27 Nov open min 1 but 28 Nov booked), 13-15 Dec below min 3, 19-21 / 20-22 Dec below min 3, 22 Dec-2 Jan booked.
  - P20: 20-22 Nov is the new Airbnb stay; 21-22 Nov below min 3; 24-26 Nov hits the 25 Nov booking; 27-29 Nov and 20-22 Dec booked; 26-30 Dec hits the 27 Dec booking.

#### P13
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 13 Dec-15 Dec | 13 Dec-16 Dec | 16 Dec-19 Dec | 17 Dec-20 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec | 19 Dec-22 Dec | 20 Dec-22 Dec | 18 Dec-22 Dec | 13 Dec-22 Dec | 22 Dec-27 Dec | 5 Jan-8 Jan | 14 Jan-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.85 (13) | Garden view/balcony; Guest favourite; free cancellation |  |  |  |  | 234.67 |  |  |  |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.82 (11) | Paid parking; Guest favourite; free cancellation |  |  |  | 244 | 235.67 | 237 |  |  |  |  |  |  |  |  | 235.67 | 235.67 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking; garden; free cancellation |  |  |  |  |  | 230.33 |  | 249.67 | 265 |  |  |  |  |  | 218.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  |  | 235 | 245.33 | 243 | 267 | 232.67 | 243.5 | 223.25 |  | 202.6 | 214 | 225.33 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.74 (53) | Superhost; 2 bath |  |  |  |  |  |  |  |  |  |  |  |  |  | 312.2 | 198.67 | 205.33 |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | Garden |  | 152.5 |  |  |  |  |  |  |  |  |  |  |  |  | 135.67 | 154.67 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  | 216 |  | 233.5 | 208.67 | 215.67 | 225.67 | 225.67 | 248.5 | 227.33 | 247 | 215.5 | 167.11 | 222.2 | 208.67 | 208.67 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5 (10) | Lift; skyline view |  |  |  |  |  | 450.67 | 456.67 |  |  |  |  |  |  |  | 419.33 | 430.33 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking |  |  |  | 244.5 | 241 |  |  |  |  |  |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5 (13) | Lift/paid parking/balcony/panoramic view; Guest favourite; free cancellation |  |  |  |  |  | 363.67 | 363.67 |  |  |  |  |  |  |  |  | 316.67 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking; garden |  | 152.5 |  |  |  |  |  |  |  |  |  |  |  |  | 141.67 | 161.67 |
| **Comp median (n)** | | | 4.76 (13) | | - (0) | **152.50** (3) | - (0) | **244.00** (3) | **235.17** (4) | **236.00** (6) | **304.50** (4) | **243.00** (3) | **265.00** (3) | **230.00** (2) | **245.25** (2) | **219.38** (2) | **167.11** (1) | **222.20** (3) | **211.33** (8) | **217.00** (8) |
| Wider 2-bed sample median (n) | | | | | 316.25 (6) | 216.00 (31) | 387.00 (9) | 253.50 (43) | 241.33 (46) | 247.00 (46) | 272.50 (42) | 285.67 (41) | 293.75 (18) | 300.00 (37) | 266.00 (26) | 253.88 (40) | 261.00 (38) | 298.50 (40) | 215.33 (48) | 216.00 (52) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.7 (10)** | | 6 | | | not returned | not returned | not returned | not returned | **203.67** | **211.00** | **227.33** | **241.00** | not returned | **254.33** | not returned | **233.00** | **179.44** (strike £1,873 -> £1,615) | not returned | **203.00** | **200.00** |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | 6 | | | not returned | not returned | not returned | not returned | **230.33** | **239.33** | **258.67** | **263.00** | not returned | **266.33** | not returned | **249.50** | **201.22** (strike £2,103 -> £1,811) | not returned | **203.00** | **200.00** |

#### P20
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 21 Nov-22 Nov | 22 Nov-24 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 5 Dec-6 Dec | 14 Dec-17 Dec | 14 Dec-19 Dec | 16 Dec-19 Dec | 20 Dec-22 Dec | 26 Dec-27 Dec | 26 Dec-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Houseboat, marina view; Superhost; Guest favourite |  |  |  |  |  |  | 282.67 | 278.8 | 281 |  |  | 285.25 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Terrace; free parking; Guest favourite; free cancellation |  |  |  |  |  |  |  |  |  |  |  | 345 |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking |  |  |  |  |  |  |  |  |  |  |  |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (57) | Lift; 2 bath |  |  |  |  |  |  |  |  |  |  |  | 450 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/paid parking/river view/balcony; 2 bath |  |  |  |  |  |  | 382.67 | 378.6 | 382.67 |  |  | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony; 12th-floor skyline |  |  |  |  |  |  | 324 | 334.4 | 341.33 | 357 | 494 | 417 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking |  |  |  |  |  |  | 261.67 | 249.8 | 268.67 | 281.5 |  |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/paid parking/balcony |  |  |  |  |  |  | 333.33 | 327.8 | 333.33 |  |  | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/paid parking/balcony |  |  |  |  |  |  | 288.33 | 300.6 | 313.33 |  |  | 415.75 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/Thames view; Superhost; free cancellation |  |  |  |  |  |  | 223.33 |  |  |  |  |  |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking; townhouse |  |  | 288.5 | 288.5 |  |  | 250 |  |  | 264 |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5 (25) | Balcony; Superhost; Guest favourite | 310 |  | 290 | 270 | 310 |  | 306 | 291.8 | 309 | 358 |  | 360 |
| **Comp median (n)** | | | 4.80 (17.5) | | **310.00** (1) | - (0) | **289.25** (2) | **279.25** (2) | **310.00** (1) | - (0) | **288.33** (9) | **300.60** (7) | **313.33** (7) | **319.25** (4) | **494.00** (1) | **370.12** (8) |
| Wider 2-bed sample median (n) | | | | | 467.25 (14) | 675.00 (10) | 338.00 (33) | 308.00 (38) | 595.00 (21) | 800.00 (11) | 269.33 (45) | 274.60 (51) | 311.17 (54) | 365.00 (35) | 578.00 (21) | 419.75 (42) |
| **Ours 3547481 (Airbnb 1791529331262420081) 5 (1)** | | 6 | | | not returned | not returned | **294.50** | not returned | not returned | **554.00** | **279.67** | **262.80** | **285.33** | not returned | **664.00** | not returned |

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### What changed since 19 Nov: the twin gap flipped from "identical" to "17-18% apart" on 13-19 Dec
No logged edit (logs above); the change is the PriceLabs refresh of 19 Nov 09:22:49Z.
- **13-19 Dec:** 3090701 fell about 7% (219/215/213/218/224/237/243 -> **204/200/198/202/208/221/226**); 3064856 moved -1% to -2% on 13-18 Dec (243/239/237/242/249/264 -> 240/235/232/237/245/260) and **rose on 19 Dec 243 -> 266**. 3064856 is now **17.2-17.8% dearer every night 13-19 Dec** (was about 10% on 13-18 Dec and identical on 19 Dec).
- **20-21 Dec: still identical** (222 / 233 on both twins).
- **3-18 Jan: still identical on all 16 nights** (e.g. 171/170/171 on 3-5 Jan on both; 18 Jan 163 on both, was 180). On Airbnb both show **£203.00** (5-8 Jan) and **£200.00** (14-17 Jan).
- So identical open nights inside the window: **18** (20-21 Dec + 3-18 Jan), vs 19 yesterday. The twin rule (policy `listing_facts.P13.twin_listings`) still applies.
- PriceLabs `user_price` on these nights still equals yesterday's `price` (e.g. 3090701 13 Dec `user_price` 219, `price` 204). `prices.csv` Smoobu = `price` on 3064856 (e.g. 13 Dec 240 / 240); 3090701 has no Smoobu price column in `prices.csv` (linked child), so its pushed value is NOT CHECKED. Why the two differ is NOT CHECKED (PriceLabs auditor).
- **Airbnb factor** unchanged in pattern: 0.765 on nights 28 days out or less (now up to 17 Dec), 0.81-0.87 on stays straddling day 28, 0.90 beyond. Source NOT CHECKED (as 18-19 Nov).
- Weekly discount on 13-22 Dec (9 n) matches policy: 3090701 (1,873 - 150) x 0.85 + 150 = £1,614.55 (Airbnb £1,615); 3064856 (2,103 - 150) x 0.85 + 150 = £1,810.05 (£1,811).
- 27 Nov / 1 Dec (Reyhan +25% min 1) unchanged: 3064856 270 / 229, 3090701 189 / 161. The 1 Dec +25% vs policy +50% stays **confirm or revert for Corentin**. Single nights; no comps priced.

### 13-21 Dec (9 open nights): +12% on 3090701 13-17 Dec, +5% on 18-19 Dec; -3% on 3064856 20-21 Dec; hold the rest
| Stay | Ours 3090701 / 3064856 (19 Nov) | Comp median (n) | Comp pctl / vs median | vs line 3090701 / 3064856 | Wider pctl (n, median) | PL avg 3090701 / 3064856 vs mkt P50 (mkt occ) | Factor | `recommend` (30 d, +23 pts) |
|---|---|---|---|---|---|---|---|---|
| 13-15 Dec (2 n) | below min 3 / below min 3 | 244.0 (3) | comps only | | (43, 253.5) | 202.0 / 237.5 vs 219.5 (31%) | | |
| **13-16 Dec** | **203.67 / 230.33** (215.00 / 233.67) | 235.17 (4) | **P0 / -13.4%** ; P25 / -2.1% | **-11.3%** / +15.2% | P22 / P35 (46, 241.33) | 200.7 / 235.7 vs 219.3 (28%) | 0.766 | raise +10% |
| **16-19 Dec** | **211.00 / 239.33** (234.00 / 254.67) | 236.0 (6) | **P0 / -10.6%** ; P67 / +1.4% | **-8.4%** / +19.3% | P17 / P43 (46, 247) | 210.3 / 247.3 vs 235.7 (32%) | 0.765 | raise +10% |
| 17-20 Dec | 227.33 / 258.67 (251.33 / 265.67) | 304.5 (4, incl. lift/skyline comps at 456.67 / 363.67) | P25 / -25.3% ; P50 / -15.1% | -23.5% / -0.1% | P19 / P40 (42, 272.5) | 218.3 / 257.0 vs 243.0 (39%) | 0.812 | raise +10% |
| 18-21 Dec | 241.00 / 263.00 (261.33 / 269.33) | 243.0 (3) | P33 / -0.8% ; P100 / +8.2% | +1.6% / +27.3% | P24 / P44 (41, 285.67) | 223.0 / 249.3 vs 243.7 (43%) | 0.857 | raise +10% / +5% |
| 19-21 Dec (2 n) | below min 3 | 265.0 (3) | comps only | | (18, 293.75) | 224.0 / 244.0 vs 244.5 (46%) | | |
| **19-22 Dec (30-day default)** | **254.33 / 266.33** (258.33 / 258.33, identical) | 230.0 (2) | P100 / +10.6% ; P100 / +15.8% | +13.3% / +36.2% | P30 / P43 (37, 300) | 227.0 / 240.3 vs 246.0 (46%) | 0.90 | raise +5% |
| 20-22 Dec (2 n, identical twins) | below min 3 | 245.25 (2) | comps only; est. ours about £280 (PL 222+233 x 0.90 + 150) = about +14% (estimate) | | (26, 266) | 227.5 / 227.5 vs 244.5 (45%) | | |
| 18-22 Dec | 233.00 / 249.50 (247.00 / 253.25) | 219.38 (2) | P100 / +6.2% ; +13.7% | +8.8% / +33.8% | P30 / P35 (40, 253.88) | 225.5 / 245.2 vs 245.0 | 0.865 | raise +5% |
| 13-22 Dec (9 n, weekly -15%) | 179.44 / 201.22; strike £1,873 -> £1,615 / £2,103 -> £1,811 | 167.11 (1) | n=1 | | P8 / P24 (38, 261) | 212.7 / 241.1 vs 233.7 (35%) | | numbers only |

- **3090701 13-17 Dec: +12% supported** (PriceLabs 204/200/198/202/208 -> about **228/224/222/226/233**).
  - It is **P0 on both 13-16 Dec (-13.4%, n=4) and 16-19 Dec (-10.6%, n=6)**, 8-11% under its rating line, and the same comps were flat vs 19 Nov. The fall is ours (PriceLabs -7% at the 19 Nov refresh), not the market.
  - Full move to the line would need about +17%, which would make 3090701 equal to 3064856 (240/235/232). The twin rule caps it at about **+12%, leaving a 4.5-5.3% gap**. On Airbnb 13-16 Dec that gives about £222 (P25, -3% vs line).
  - Market P50 219-236 and market occupancy 28-32%: the market does not argue against it (3090701 PriceLabs is 8.5-10.7% under P50).
- **3090701 18-19 Dec: +5% supported** (221/226 -> about **232/237**, still 12% under 3064856). 16-19 Dec is under the line (-8.4%) but 18-21 Dec is at it (+1.6%, P33); +5% splits the two.
- **3064856 13-19 Dec: hold.** P25-P67 and within ±2% of the comp median on 13-16 / 16-19 Dec, but 15-19% over its 4.31 rating line. The 19 Dec engine rise (243 -> 266) puts 19-22 Dec at P100 (+15.8%, n=2 only): evidence thin, no move argued.
- **3064856 20-21 Dec: -3% supported** (222/233 -> about **215/226**) to break the identical pair. Both twins are P100 on 19-22 Dec, and 3064856 is the one furthest over its line (+36% vs +13%), so it is the one to move. This is a twin-rule fix; the wider sample puts both at P30-P43 (median £300) and PriceLabs is 2-8% under market P50, so not a market call.
- `recommend` says +5% to +10% on the occupancy lead (70.0% vs 47% next 30). Like-for-like price evidence supports only the moves above.

### January twins: +3% on 3090701 (3-18 Jan); hold 3064856 (unchanged from 19 Nov; not applied)
- **5-8 Jan:** both £203.00 (19 Nov £204.33). P38 of 8, -3.9% vs median 211.33. Lines: 3090701 £206.26 (**-1.6%**); 3064856 £179.63 (+13.0%). PriceLabs 170.0 vs market P50 203.0 (-16.3%). Market occupancy **16%**.
- **14-17 Jan:** both £200.00 (19 Nov £200.67). P25 of 8, -7.8% vs median 217.0. Lines: 3090701 £211.79 (**-5.6%**); 3064856 £184.45 (+8.4%). PriceLabs 166.7 vs P50 208.0 (-19.9%). Market occupancy **12%**.
- **Supported: +3% on 3090701 for 3-18 Jan, 3064856 unchanged.** That puts 3090701 at about its line on 5-8 Jan (about £207.6 vs £206.26) and 3% under it on 14-17 Jan, and restores a 3% twin gap. 14-17 Jan alone would carry up to +5%; with market occupancy at 12-16% I do not argue more than +3% across the range, despite `recommend`'s +10%.

## P20 Waterford Court, 2-bed (Airbnb 1791529331262420081, 5.0 from 1 review; Airbnb shows 6 guests, see above)

### What changed since 19 Nov
- **New Airbnb booking 19-22 Nov** (made 19 Nov, 3 n, **£714.55 room**, £150 cleaning, £134.01 commission). It covers 20-21 Nov, the policy delivery block (`listing_facts.P20.block_20_21_nov`): whether delivery still happens with a guest in is **for Corentin** (Dispatcher item); not a pricing question.
- **PriceLabs still shows 21 Nov OPEN at £351, min 3** (refresh 19 Nov 09:23Z; `user_price` 282). On Airbnb our listing was **not returned** for 20-22 Nov or 21-22 Nov (consistent with the Airbnb stay and min 3). Booking.com availability for 21 Nov: **NOT CHECKED** (WAF). The double-sell check belongs to channel/occupancy.
- Overrides and logs: unchanged (5 / 26 Dec +100% min 1; 22-24 Nov -5% min 2; 20-21 Nov -5% min 3).
- PriceLabs 22-24 Nov 292/284 -> **290/283** (min 2); 14-18 Dec 299/302/303/332/314 -> **298/301/301/305/316**; 5 Dec 531 -> **528**; 26 Dec 569 -> **571**.

Column key: "Line" = comp median x 0.85. PriceLabs vs market uses the Nearby Listings compset (1-3 BR range), which understates a 2-bed P50.

| Stay | Ours 20 Nov (19 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n, median) | PL avg / mkt P50, P75, P90 (mkt occ) | Factor | `recommend` (horizon) |
|---|---|---|---|---|---|---|---|---|
| **19-22 Nov SALE** (Airbnb, booked 19 Nov) | **£288.18 all-in** = (714.55 + 150) / 3; room £238.18 | 19 Nov check: 20-23 Nov **317.5 (4)**; 20-22 Nov 310.0 (1). 20 Nov check: 20-22 Nov 310.0 (1) | **P25 / -9.2%** (20-23 Nov set); P0 / -7.0% (20-22) | **+6.8%** (317.5 x 0.85 = 269.9) | 19 Nov 20-23 Nov kept + wider sample: P22 (54) | room 238.18 vs mkt 20-21 Nov P50 219/217, P75 288/283 (occ 60% / 59%) | about **0.787** vs PriceLabs 292 (estimate, 19 Nov value from the 17 Nov refresh) + 334 + 282 = £908 | at booking (7 d 29% vs 50%, P25): **fix-listing 0%** |
| 20-22 Nov (next Fri-Sun, today) | booked (sale above) | 310.0 (1) | | | (14, 467.25) | mkt P50 218 (60%) | | |
| **22-24 Nov (min 2)** | **294.50** (295.50) | 289.25 (2) | **P100 / +1.8%** | **+19.8%** | P36 (33, 338) | 286.5 / 214, 274 (47%) | 0.766 | **hold 0%** (7 d 57% vs 48%) |
| 24-26 Nov (midweek default) | 25 Nov booked | 279.25 (2) | comps only | | (38, 308) | | | |
| 27-29 Nov | booked | 310.0 (1) | comps only | | (21, 595) | | | |
| **5 Dec (orphan, 1 n)** | **554.00** (557.00) | none returned (2nd day) | n=0 | | **P18** of 1-night 2-beds (11, £800) | **528** / 229, 297, **409** (53%) | 0.765 | numbers only |
| 14-17 Dec | 279.67 (280.67) | 288.33 (9) | P33 / -3.0% | +14.1% | P53 (45, 269.33) | 300.0 / 217 (24%) | 0.766 | raise +10% (30 d) |
| **14-19 Dec (all 5 open nights)** | **262.80** (275.80) | 300.6 (7) | **P14 / -12.6%** | **+2.9%** | P37 (51, 274.6) | 304.2 / 221 (25%) | 0.765 | raise +10% |
| 16-19 Dec | 285.33 (306.33) | 313.33 (7) | P29 / -8.9% | +7.1% | P39 (54, 311.17) | 307.3 / 225 (26%) | 0.766 | raise +10% |
| 20-22 Dec (30-day default) | booked | 319.25 (4) | comps only | | (35, 365) | | | |
| **26 Dec (orphan, 1 n)** | **664.00** (663.00) | **494.0 (1)** | **P100 / +34.4%** | | P62 of 1-night 2-beds (21, £578) | **571** / 254, 326, **431** (35%) | 0.90 | raise +5% (60 d) |
| 26-30 Dec (context) | 27 Dec booked | 370.12 (8) | comps only | | (42, 419.75) | | | |

### 19-22 Nov sale (£714.55 room): sold inside the supported band, not under it
- All-in **£288.18/night** sat at **P25 of the kept comps priced on the booking day** (19 Nov 07:20Z, 20-23 Nov: 281.33 / 290.00 / 345.00 / 396.67, median 317.5), **-9.2% vs median** and **+6.8% above the 1-review line** (£269.9). Against 1343981071946969781 (the only comp returned for 20-22 Nov, £310 on both 19 and 20 Nov) it is -7.0%.
- Room-only £238.18/night is between market P50 (£217-219) and P75 (£283-288) for 20-21 Nov, at 59-60% market occupancy.
- Paid / PriceLabs about **0.787**, close to the Airbnb factor seen on every ≤28-day stay (0.765). Not a leak by this measure; the 19 Nov PriceLabs price (£292) is an estimate from the 17 Nov refresh, because the 19 Nov file starts on 20 Nov.
- `recommend` on the booking-day 7-day horizon (29% vs 50%, P25) returned **fix-listing 0%**: the price was not the constraint. **Supported positioning was -7% to -15% vs comp median (the 0.85 line); the sale at -9.2% is inside it.** No change argued.

### 22-24 Nov: hold (yesterday's -7% no longer supported)
- £294.50 is P100 of only 2 comps (+1.8% vs median £289.25; 757342335233586120 £288.50, 1343981071946969781 £290.00) and 19.8% over the line. 1684834789445533643 (£274 yesterday) is no longer returned.
- With the 19-22 Nov stay the 7-day lead turned from -21 to **+9 points** (Smoobu 57.1% vs 48%), so `recommend` now says **hold**. The wider sample puts us at P36 (median £338).
- Supported: **hold (0%)**; at most -2% to the comp median. The min 2 on these nights (Reyhan, vs policy min 3 to 30 Nov) stays **confirm or revert** for Corentin.

### December
- **14-19 Dec: hold (0%).** P14-P33, -3% to -13% vs median, +3% to +14% over the line. Our Airbnb price fell 4.7% (14-19) and 6.9% (16-19) since yesterday: PriceLabs 17 Dec 332 -> 305 and the 0.765 factor now covers every night to 18 Dec. Comps were flat (6488364 -4%). Market occupancy 24-26%. `recommend`'s +10% rests on the 30-day lead, not on these nights. If 14-19 Dec drops further toward the line (£255.51 on 14-19 Dec), the evidence would turn to a small raise; today it is +2.9% above it.
- **5 Dec (Reyhan's +100%, min 1): numbers only.** No kept comp returned for 5-6 Dec (2nd day). £554 all-in is **P18** of the 1-night 2-bed sample (n=11, median £800), so Airbnb does not show it priced out; but 528 is above market **P90 409** (P50 229, occupancy 53%). Neither direction is supported by like-for-like comps. Judgement (not a function output): unchanged, step toward P75-P90 (£297-409) if unsold around 28 Nov.
- **26 Dec (Reyhan's +100%, min 1): about -33% supported, unchanged** (571 -> about **£382**). The only kept comp returned, 1684834789445533643 (lift/balcony, 12th-floor skyline, 4.39 from 18), is £494 all-in; we are **+34.4%** above it and 58% over the line. 571 is above market P90 431 (P50 254, occupancy 35%). Matching that comp needs (494 - 150) / 0.90 = **£382**; PriceLabs' own `uncustomized_price` for 26 Dec is 376 today (382 yesterday). Thin (n=1; wider 1-night sample puts us at P62, median £578). Reyhan's edit, not settled by policy: evidence for Corentin.
- No other December nights are open: 1-4, 6-13, 19-25 Dec and 27 Dec-2 Jan are booked.

## P10 Hanger Lane, 1-bed (3318177)
- Handed back: last night 18 Nov (policy `handbacks.P10`). All 60 nights in `prices.csv` 20 Nov unavailable. No positioning, nothing proposed.

## P02 Ladbroke Grove, P03 Bayswater
- Blocked on purpose (policy `intentional_blocks`). All 60 nights unavailable in `prices.csv` 20 Nov. No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
- Not in PriceLabs or Smoobu (no rows in `listings.csv` or `prices.csv` 20 Nov). Own price, percentile, rating gap and premium: **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (AWS WAF challenge 20 Nov 07:21Z; not retried or bypassed): comps, our displayed Booking.com prices, P20 Booking.com capacity and 21 Nov availability. Comp cancellation policy comes only from Airbnb "Free cancellation" pills.
2. **P13 twin prices moved at the 19 Nov 09:22Z refresh with no log entry**: 3090701 -7% on 13-19 Dec (gap now 17-18%), still identical on 20-21 Dec and 3-18 Jan (18 nights). `user_price` vs `price` divergence and the cause NOT CHECKED (PriceLabs auditor).
3. P20 19 Nov PriceLabs price at booking is an estimate (£292, 17 Nov refresh); the 0.787 paid/PriceLabs ratio rests on it. PriceLabs has not refreshed P20 since 19 Nov 09:23Z, so it still shows 21 Nov open (£351) and 7-day occupancy 14%.
4. **P20 Airbnb guest count 6 vs policy 4**: still 6 on 20 Nov; who changed it NOT CHECKED.
5. **Airbnb ≤28-day factor** (0.765) on P13 and P20: inferred from prices; the Smoobu/Airbnb rule is NOT CHECKED.
6. **Thin comp coverage:** P13 n=0-3 on 20-22 Nov, 24-26 Nov, 27-29 Nov, 13-15 Dec, 18-21 Dec, 19-22 Dec, 20-22 Dec, 18-22 Dec, 13-22 Dec; P20 n=0-2 on 20-22 Nov, 21-22 Nov, 22-24 Nov, 24-26 Nov, 27-29 Nov, 5 Dec and 26 Dec. The 26 Dec -33% rests on one comp. Only unsold comps can be priced, which biases peak medians. P20 789954794593691037 found only by the activity probe (7th day).
7. P20 market percentiles use the 1-3 BR compset (understates a 2-bed P50); P20 has 1 review, so the 0.85 line is judgement.
8. P13's Airbnb-to-Smoobu id mapping is still "likely" (policy). P16, P18, P19 have no data; P02, P03, P10 have no sellable nights.
