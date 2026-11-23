# Competitor positioning: WEST + HERTS (D = 2026-11-23)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** I read `data/policy.json` first. Everything was read-only. PriceLabs: 6 read calls, all OK. **Protocol slip:** calls 2 and 3 (the two P13 override reads) went out in the same message, so they ran in parallel. Both were read-only GETs and both returned 200. Every other call ran on its own.
1. `get_user_logs` (listing, 20-23 Nov) for 3064856, 3090701 and 3547481: 8 entries. **6 are new, all Reyhan's, 23 Nov 00:07:45-00:08:04Z, on 3064856 and copied from parent to 3090701.** Nothing on P20.
   - 14-16 Dec: -2%, min stay 3 -> **2**.
   - 20-21 Dec: price override removed (was -2%), min stay 3 -> **2**.
   - 2-31 Jan: **-8%** min 3. This replaces 3064856's -10% (3-21 Jan).
2. `get_listing_date_overrides` 3064856 (23 Nov-31 Jan) and
3. `get_listing_date_overrides` 3090701: **identical override sets on both twins**, newest `updated_at` 23 Nov 00:08:04Z. Still in place: 10-13 and 17-19 Dec -2% min 3; 22-26 Dec -2% min 3; 27 Nov / 1 Dec +25% min 1 (18 Nov).
4. `get_listing_date_overrides` 3547481: unchanged since 18 Nov 12:17:57Z. 23-24 Nov -5% min 2; 5 Dec and 26 Dec +100% min 1; 1-20 Dec 0% min 3; 21-25 Dec -5%; 1-31 Jan -5% min 3.
5. `get_neighbourhood_data` (detail, future prices + occupancy) for 3547481: Nearby Listings, 1-3 BR, 270 listings. The 2 BR summary median is 253 (n=149). 23 Nov `final_price` is **243**.
6. `get_neighbourhood_data` (detail) for 3064856: Nearby Listings, 2-3 BR, 151 listings. The 2 BR median is 220 (n=117).

Every market P25/P50/P75/P90 and market occupancy below ("mkt") comes from calls 5-6, saved at `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/cw23/mkt_P13.json` and `mkt_P20.json`.

**Own prices.** These come from `prices.csv` and `raw/prices_*.json` for 23 Nov. The overnight refresh is confirmed: the twins at **23 Nov 00:10:05Z** and P20 at **00:15:15Z**. Reyhan's edits (00:07-00:08Z) were therefore already in today's prices. 23 Nov is not in the price window (it starts 24 Nov), so P20 tonight uses `final_price` 243 from call 5.

**Occupancy for `recommend`.** This comes from Smoobu `reservations.csv` for 23 Nov, cancelled stays excluded; market occupancy is from `pl_kpis.csv`. There are no new or cancelled P13/P20 reservations vs 22 Nov.
- P13 (one flat): 7 d 6/7 = 85.7% vs 59%; **30 d 19/30 = 63.3% vs 47%**; 60 d 30/60 = 50.0% vs 35%.
- P20: **7 d 5/7 = 71.4% vs 51% (+20 pts; yesterday +9)**. The window now holds the 25 Nov-5 Dec stay. 30 d 22/30 = 73.3% vs 38%; 60 d 32/60 = 53.3% vs 29%.

**OTAs:**
- **Airbnb:** I read public search and listing pages on **2026-11-23 07:19-07:33Z** with plain `curl`. The scripts, boxes, comp ids and 4-adult search are the same as 18-22 Nov. There were 0 HTTP failures and no bot check.
- **Booking.com: NOT CHECKED.** One plain search at 07:21:56Z returned the AWS WAF challenge (HTTP 202). I did not retry or bypass it.

**Method** (unchanged):
- Price = Airbnb all-in total / nights, after any offer shown. **The £150 cleaning fee is included**, plus any Airbnb guest fee. Taxes are not shown separately.
- **Line** = comp median x (1 + `quality_premium`):
  - 3090701: **`quality_premium(4.36, 4.78)` = -0.15 (the cap). It was -0.024 yesterday at 4.7.**
  - 3064856: `quality_premium(4.31, 4.78)` = -0.15 (the cap).
  - P20: 5.0 from **3** reviews. `quality_premium(5.0, 4.80)` = +0.08, but I keep the judgement line of comp median x 0.85, because 3 reviews prove nothing yet.
- **Factor** = (Airbnb total - £150) / the sum of the PriceLabs `price` for the same nights.

**Comp sets.** The ids are the same as 18-22 Nov (`comps.json`). None were replaced, and all are active: every kept comp was returned on at least 1 stay today (P13 11 comps, P20 12 comps).
- 1201539290247676065 was not returned for 24-26 Nov and 1598588327559113265 not for 19-21 Dec (both were yesterday). Both were returned on 14-16 Dec and in January.
- 1516006875488990547 was returned for 26-30 Dec (it was not yesterday).

**Ratings and reviews** (listing pages, 23 Nov 07:19-07:20Z):
- **3090701 (Airbnb 1587576514709814818): 4.7 (10) -> 4.36 (11).** The page shows "4.36 out of 5 from 11 reviews". For the average to fall that far, the new review is about 1 star (estimate).
- **P20: 5.0 (2) -> 5.0 (3).**
- Comps: 1599999559812004118 is now 4.83 (12), was 4.82 (11); 1014671215040555613 is now 4.78 (18), was 4.76 (17). Every other comp is unchanged.
- Ours: 3090701 4.36 (11), 3064856 4.31 (13), P20 5.0 (3).
- Comp medians: P13 **4.78** (13 reviews), P20 **4.80** (17.5).
- Review gap vs comp median: 3090701 -2, 3064856 0, P20 **-14.5**.

**P20 Airbnb guest count: still 6 (5th day).** The listing page at 23 Nov 07:20Z shows `personCapacity` **6** (it was 4 on 18 Nov). Policy `listing_facts.P20.max_guests` = 4 (Corentin 24 Oct). This stays **confirm or revert for Corentin**, and I propose nothing. It does not affect the numbers: every search was run at 4 adults, and the comps sleep 4-5. Booking.com capacity: NOT CHECKED (WAF).

**Same comps vs 22 Nov** (48 P13 and 35 P20 comp pairs priced on both days):
- P20 comps all moved within ±2.7%.
- P13 comps all moved within ±3%, except 1411449348357673454 on 20-22 Dec (278.50 -> 251.50, -9.7%).
- Ours:
  - P13: the twins moved -0.5% to -4.8% on every December stay (19-22 Dec -4.8%, 18-22 Dec -4.2%) and +0.3% / +1.5% in January.
  - P20: 5 Dec **+10.0%**, 26 Dec -4.4%, 14-19 Dec -1.7% to +1.7%.

**Rows written:**
- **1,174 rows** appended to `data/snapshots/2026-11-23/comps.csv` under `flock` on `.comps.csv.lock`. The file had already been copied forward by another agent.
  - Kept comps: P13 176 (11 x 16 stays) and P20 132 (12 x 11). A blank price with "NOT RETURNED" in `source` means the comp was not returned for that stay.
  - Ours: `P13:ours` 32 and `P20:ours` 11.
  - Wider 2-bed sample: `P13:wide` 516 and `P20:wide` 307.
- **28 rows** appended to `channel_checks.csv` (our Airbnb displayed prices) under `.channel_checks.csv.lock`.
- To find these rows, filter `source` on "comp-west", "checked 2026-11-23" and "stay <ci> to <co>".

**Recompute check.** I ran `snapshot.load('2026-11-23')` + `comp_summary`, filtered by stay. It matches the tables:

| Listing | Stay | n | Median | Our position |
|---|---|---|---|---|
| P13 both twins | 13-16 Dec | 4 | 232.83 | P0 / -16.0% |
| P13 both twins | 14-16 Dec | 6 | 238.75 | P33 / -7.9% |
| P13 both twins | 16-19 Dec | 6 | 237.33 | P0 / -13.9% |
| P13 both twins | 18-21 Dec | 3 | 234.0 | P0 / -9.1% |
| P13 both twins | 20-22 Dec | 3 | 251.5 | P33 / -6.8% |
| P13 both twins | 5-8 Jan | 8 | 211.33 | P38 / -2.8% |
| P13 both twins | 14-17 Jan | 8 | 217.0 | P25 / -7.4% |
| P20 | 23-25 Nov | 1 | 270.0 | P100 / +2.0% |
| P20 | 14-17 Dec | 9 | 283.33 | P33 / -2.7% |
| P20 | 14-19 Dec | 7 | 296.8 | P14 / -9.4% |
| P20 | 16-19 Dec | 7 | 310.67 | P29 / -3.9% |
| P20 | 26-27 Dec | 1 | 494.0 | P100 / +23.1% |

## Comp tables (Airbnb all-in £/night, 4 adults, checked 2026-11-23 07:22-07:33Z)
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- For our listings, "not returned" means booked, blocked or below the minimum stay:
  - P13: 24-26 Nov booked/blocked. 27-29 Nov hits the 28 Nov booking. 13-15 Dec is below min 3 on 13 Dec. 19-21 Dec is below min 3 on 19 Dec. 23-25 Dec is booked.
  - P20: 23-24 Nov is below min 2. 24-26 Nov hits the 25 Nov booking. 27-29 Nov and 23-25 Dec are booked. 26-30 Dec hits the 27 Dec booking.
- Default stays:
  - Next Fri-Sun = 27-29 Nov, midweek Tue-Thu = 24-26 Nov, 30 days out = **23-25 Dec**. This replaces yesterday's 22-24 Dec.
  - On both properties every default stay is booked for us, so those columns are comps only.
- New stays today:
  - P13 14-16 Dec and 20-22 Dec. Both are now sellable after Reyhan's min 2.
  - P20 23-25 Nov, the only remaining combination for tonight.

#### P13
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 24 Nov-26 Nov | 27 Nov-29 Nov | 13 Dec-15 Dec | 13 Dec-16 Dec | 14 Dec-16 Dec | 16 Dec-19 Dec | 17 Dec-20 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec | 19 Dec-22 Dec | 20 Dec-22 Dec | 18 Dec-22 Dec | 13 Dec-22 Dec | 23 Dec-25 Dec | 5 Jan-8 Jan | 14 Jan-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.85 (13) | Garden view/balcony; Guest favourite; free cancellation |  |  |  | 230 |  |  |  |  |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.83 (12) | Paid parking; Guest favourite; free cancellation |  |  | 244 | 235.67 | 244 | 239.67 |  |  |  |  |  |  |  |  | 235.67 | 235.67 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking; garden; free cancellation |  |  |  |  |  | 224.67 |  | 234 | 250 |  |  |  |  |  | 218.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  | 270 | 235 | 245.33 | 248.67 | 275.5 | 243.67 | 260 | 231.5 |  | 244.5 | 214 | 225.33 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.74 (53) | Superhost; 2 bath |  |  |  |  |  |  |  |  |  |  | 251.5 |  |  |  | 195 | 202.67 |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | Garden |  |  |  |  | 162.5 |  |  |  |  |  |  |  |  |  | 135.67 | 154.67 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.78 (18) | none listed | 216 |  | 233.5 | 208.67 | 233.5 | 212 | 218 | 218 | 242.5 | 214.67 | 233.5 | 203 | 162.11 | 248.5 | 208.67 | 208.67 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5 (10) | Lift; skyline view |  |  |  |  |  | 450.67 | 456.67 |  |  |  |  |  |  |  | 419.33 | 430.33 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking |  |  | 240.5 | 238.33 | 264 |  |  |  |  |  |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5 (13) | Lift/paid parking/balcony/panoramic view; Guest favourite; free cancellation |  |  |  |  |  | 363.67 | 363.67 |  |  |  |  |  |  |  |  | 316.67 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking; garden |  |  |  |  | 162.5 |  |  |  |  |  |  |  |  |  | 141.67 | 161.67 |
| **Comp median (n)** | | | 4.78 (13) | | **216.00** (1) | - (0) | **240.50** (3) | **232.83** (4) | **238.75** (6) | **237.33** (6) | **304.50** (4) | **234.00** (3) | **250.00** (3) | **229.17** (2) | **251.50** (3) | **217.25** (2) | **162.11** (1) | **246.50** (2) | **211.33** (8) | **217.00** (8) |
| Wider 2-bed sample median (n) | | | | | 216.00 (19) | 364.50 (5) | 257.50 (41) | 240.50 (44) | 243.25 (48) | 248.00 (46) | 256.33 (41) | 267.33 (42) | 295.75 (20) | 299.17 (40) | 260.00 (31) | 278.25 (45) | 264.33 (39) | 286.00 (21) | 222.33 (43) | 219.17 (56) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.36 (11)** | | 6 | | | not returned | not returned | not returned | **195.67** | **220.00** | **204.33** | **210.67** | **212.67** | not returned | **212.00** | **234.50** | **199.50** | **170.67** (strike £1,780 -> £1,536) | not returned | **205.33** | **201.00** |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | 6 | | | not returned | not returned | not returned | **195.67** | **220.00** | **204.33** | **210.67** | **212.67** | not returned | **212.00** | **234.50** | **199.50** | **170.67** (strike £1,780 -> £1,536) | not returned | **205.33** | **201.00** |

#### P20
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 23 Nov-25 Nov | 23 Nov-24 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 5 Dec-6 Dec | 14 Dec-17 Dec | 14 Dec-19 Dec | 16 Dec-19 Dec | 23 Dec-25 Dec | 26 Dec-27 Dec | 26 Dec-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Houseboat, marina view; Superhost; Guest favourite |  |  |  |  |  | 282.67 | 278.8 | 281 |  |  | 285.25 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Terrace; free parking; Guest favourite; free cancellation |  |  |  |  |  |  |  |  |  |  | 321.5 |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking |  |  |  |  |  |  |  |  | 403.5 |  |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (57) | Lift; 2 bath |  |  |  |  |  |  |  |  |  |  | 432.5 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/paid parking/river view/balcony; 2 bath |  |  |  |  |  | 382.67 | 378.6 | 382.67 |  |  | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony; 12th-floor skyline |  |  |  |  |  | 324 | 334.4 | 341.33 | 357 | 494 | 417 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking |  |  |  |  |  | 261.67 | 249.8 | 268.67 | 281.5 |  |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/paid parking/balcony |  |  |  |  |  | 333.33 | 327.8 | 333.33 |  |  | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/paid parking/balcony |  |  |  |  |  | 283.33 | 296.8 | 310.67 |  |  | 399.5 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/Thames view; Superhost; free cancellation |  |  |  |  |  | 210 |  |  |  |  | 253 |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking; townhouse |  |  | 288.5 |  |  | 250 |  |  |  |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5 (25) | Balcony; Superhost; Guest favourite | 270 |  | 270 | 310 |  | 306 | 291.8 | 309 | 390 |  | 360 |
| **Comp median (n)** | | | 4.80 (17.5) | | **270.00** (1) | - (0) | **279.25** (2) | **310.00** (1) | - (0) | **283.33** (9) | **296.80** (7) | **310.67** (7) | **373.50** (4) | **494.00** (1) | **360.00** (9) |
| Wider 2-bed sample median (n) | | | | | 319.50 (26) | 467.00 (13) | 308.25 (30) | 500.50 (19) | 603.00 (13) | 269.67 (47) | 284.70 (52) | 308.67 (52) | 395.00 (35) | 587.00 (20) | 408.25 (42) |
| **Ours 3547481 (Airbnb 1791529331262420081) 5 (3)** | | 6 | | | **275.50** | not returned | not returned | not returned | **603.00** | **275.67** | **269.00** | **298.67** | not returned | **608.00** | not returned |

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### What changed since 22 Nov
**1. 3090701's Airbnb rating fell from 4.7 (10) to 4.36 (11).**
- Both twins now sit at the `quality_premium` cap (-0.15). Their rating line is the same: comp median x 0.85.
- This removes the basis for yesterday's 3090701-only rises (+10% on 13-17 Dec, +5% on 18-21 Dec, +3% on 3-18 Jan). **I withdraw all three.**
- Which review caused the fall, and what it says: NOT CHECKED (I did not read the review text).

**2. Reyhan's edits at 23 Nov 00:07-00:08Z** (calls 1-3; applied on 3064856 and copied from parent to 3090701):
- **14-16 Dec: -2%, min 2.** PriceLabs 190/189/193 on both twins (22 Nov: 194/191/194). This keeps a PriceLabs discount, which conflicts with "cut PriceLabs discounts", so it is **confirm or revert for Corentin**. It is not a new proposal.
- **20-21 Dec: price override removed (was -2%), min 2.** PriceLabs 207/210 (22 Nov: 205/213). This removes a discount, so it is in line with the direction. The min 2 is noted only.
- **2-31 Jan: -8%, min 3** (3064856 had -10% on 3-21 Jan). This is a PriceLabs discount, so it is **confirm or revert for Corentin**.
  - On the January nights checked it did not lower prices. PriceLabs `price` is up 1-2% on both twins (3 Jan 170 -> 173; 14 Jan 164 -> 164), and Airbnb 5-8 Jan is +1.5%.
  - Why `price` sits above `uncustomized_price` x 0.92 (3064856 3 Jan: uncustomised 157, price 173): NOT CHECKED. It could be a floor or another layer.

**3. The twins are still identical, both in PriceLabs and on Airbnb (2nd day):**
- PriceLabs: every open night 13-21 Dec is **192/190/189/193/200/212/218/207/210** on both, and 3-19 Jan matches night for night.
- Airbnb: identical on every one of the 11 stays where ours was returned.
- Their override sets are now identical, because Reyhan's edits copy from 3064856 to 3090701. That is the mechanism keeping them equal.
- This breaks policy `listing_facts.P13.twin_listings` ("slightly different ... prices"). Which twin is cheaper does not matter (`deprioritised.p13_twin_price_order`).

**Airbnb factor** vs PriceLabs `price`: 0.765 on nights 28 days out or less (now up to 20 Dec) and 0.90 beyond 28 days (January).
- 13-22 Dec (9 n): strike £1,780 -> **£1,536 on both** = (1,780 - 150) x 0.85 + 150. The weekly -15% is per policy.
- The rule behind the 0.765 factor: NOT CHECKED.

**27 Nov / 1 Dec** (Reyhan +25% min 1): 3064856 262 / 232, 3090701 183 / 163. These are single nights, so no comps were priced. The 1 Dec +25% vs policy +50% stays confirm or revert.

### 13-21 Dec (9 open nights): hold both twins; supported position about -15% vs comp median (rating line); we are -7% to -16%
| Stay | Ours, both twins (22 Nov) | Comp median (n) | Comp pctl / vs median | vs line (both, x0.85) | Wider pctl (n, median) | PL avg vs mkt P50 (mkt occ) | Factor | `recommend` (30 d, +16 pts) |
|---|---|---|---|---|---|---|---|---|
| 13-15 Dec (2 n) | below min 3 | 240.5 (3) | comps only | | (41, 257.5) | 191.0 vs 220.5 (33%) | | |
| **13-16 Dec** | **195.67** (198.00) | 232.83 (4) | **P0 / -16.0%** | **-1.1%** | P11 (44, 240.5) | 190.3 vs 220.7 (-13.7%; 31%) | 0.765 | raise +10% |
| **14-16 Dec (new, min 2)** | **220.00** (not sellable) | 238.75 (6) | **P33 / -7.9%** | **+8.4%** | P31 (48, 243.25) | 189.5 vs 221.5 (-14.4%; 27%) | 0.765 | raise +10% |
| **16-19 Dec** | **204.33** (206.00) | 237.33 (6) | **P0 / -13.9%** | **+1.3%** | P13 (46, 248.0) | 201.7 vs 234.0 (-13.8%; 35%) | 0.765 | raise +10% |
| 17-20 Dec | 210.67 (213.00) | 304.5 (4, incl. lift/skyline comps at 456.67 / 363.67) | P0 / -30.8% | -18.6% (skewed) | P15 (41, 256.33) | 210.0 vs 241.7 (42%) | 0.765 | raise +10% |
| **18-21 Dec** | **212.67** (213.67) | 234.0 (3) | **P0 / -9.1%** | **+6.9%** | P12 (42, 267.33) | 212.3 vs 243.0 (-12.6%; 46%) | 0.766 | raise +10% |
| 19-21 Dec (2 n) | below min 3 | 250.0 (3) | comps only | | (20, 295.75) | 212.5 vs 244.0 (49%) | | |
| 19-22 Dec | 212.00 (222.67) | 229.17 (2) | P0 / -7.5% | +8.8% | P7 (40, 299.17) | 211.7 vs 245.7 (48%) | 0.765 | raise +10% |
| **20-22 Dec (new, min 2)** | **234.50** (not sellable) | 251.5 (3) | **P33 / -6.8%** | **+9.7%** | P32 (31, 260.0) | 208.5 vs 244.5 (-14.7%; 47%) | 0.765 | raise +10% |
| 18-22 Dec | 199.50 (208.25) | 217.25 (2) | P0 / -8.2% | +8.0% | P9 (45, 278.25) | 211.8 vs 244.5 (46%) | 0.765 | raise +10% |
| 13-22 Dec (9 n, weekly -15%) | 170.67 (strike £1,780 -> £1,536) | 162.11 (1) | n=1 | | P3 (39, 264.33) | 201.2 vs 233.4 (38%) | 0.765 | numbers only |
| 23-25 Dec (30-day default) | booked | 246.5 (2) | comps only | | (21, 286.0) | | | |

**Supported: 0% on both twins, 13-21 Dec.**
- The comps moved within ±3% (one -9.7%), so the gap to the median is ours, not the market's.
- At a 4.31 / 4.36 rating, the supported position is about **-15% vs the comp median**. Our stays sit at -1.1% to +9.7% vs that line on every stay with n ≥ 3, except the skewed 17-20 Dec.
- `recommend` says +10%, but that comes from the 30-day lead alone. The like-for-like evidence does not carry a rise now that both twins are rated about 4.3.
- **The 2-night stays 14-16 and 20-22 Dec** are 8-10% over the line, because the £150 cleaning is spread over 2 nights. The new min 2 does not need a price cut to be competitive: they are P33 of comps.

**Twin rule.** The smallest move the evidence allows is a revert of Reyhan's 20 Nov / 23 Nov -2% on **one twin only** (about +2%). On 13-16 Dec that twin lands about +0.3% over the line, and on 16-19 Dec about +2.8%. That gives a 2% gap without adding a discount.
- This is a Reyhan edit, so it goes to **Corentin as confirm or revert** (keep -2% on both and accept identical twins, or revert on one).

### January twins: hold both (0%); Reyhan's -8% (2-31 Jan) is confirm or revert
- **5-8 Jan:** both £205.33 (22 Nov £202.33). **P38 of 8**, -2.8% vs median 211.33. Line £179.63 (**+14.3%**). PriceLabs 172.3 vs market P50 203.0 (-15.1%). Market occupancy **16.5%**.
- **14-17 Jan:** both £201.00 (22 Nov £200.33). **P25 of 8**, -7.4% vs median 217.0. Line £184.45 (**+9.0%**). PriceLabs 167.7 vs P50 208.0 (-19.4%). Market occupancy **11.9%**.
- **Supported: hold.**
  - At the 4.3 rating both January stays are already 9-14% over the line, so no rise is argued. Yesterday's +3% on 3090701 is withdrawn.
  - P25-P38 of comps, the +16-pt lead and the Christmas pickup argue against a cut either.
  - The -8% did not lower the price (above). Whether to keep it is Corentin's call.

## P20 Waterford Court, 2-bed (Airbnb 1791529331262420081, 5.0 from 3 reviews; Airbnb shows 6 guests, see above)

### What changed since 22 Nov (overnight refresh 00:15:15Z; no user edit, call 1; overrides unchanged, call 4)
| Night | PL `price` 22 Nov -> 23 Nov | `uncustomized_price` 22 Nov -> 23 Nov |
|---|---|---|
| 23 Nov | 283 (for 22 Nov) -> **243** (`final_price`) | |
| 24 Nov | 271 -> **228 (-15.9%)** | 271 -> 230 |
| 5 Dec | 520 -> **591 (+13.7%)** | 377 -> 406 |
| 14 Dec | 300 -> 284 (-5.3%) | |
| 15-17 Dec | 302/301/333 -> 302/298/331 | |
| 18 Dec | 321 -> 346 (+7.8%) | |
| 26 Dec | 539 -> **508 (-5.8%)** | 360 -> 345 |
| 3-19 Jan | -3% to -5% | |

Yesterday's "about -5% on 22-24 Nov" has been overtaken: the algorithm cut tomorrow by 16% on its own.

Column key: "Line" = comp median x 0.85. "PL vs market" uses the Nearby Listings compset (1-3 BR range), which understates a 2-bed P50. The 2 BR summary median is 253.

| Stay | Ours 23 Nov (22 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n, median) | PL avg / mkt P50, P75, P90 (mkt occ) | Factor | `recommend` (7 d, +20 pts) |
|---|---|---|---|---|---|---|---|---|
| **23-25 Nov (tonight + 24 Nov, min 2)** | **275.50** (22-24 Nov: 314.00) | 270.0 (1: 1343981071946969781, Superhost 5.0 (25), balcony) | **P100 / +2.0%** | +20.0% | **P31** (26, 319.5) | 235.5 / 213, 262-269, 345-352 (51-56%) | **0.851** vs PL 243/228 | raise +5% |
| 23-24 Nov (1 n) | below min 2 | none returned | | | (13, 467) | | | |
| 24-26 Nov (midweek default) | 25 Nov booked | 279.25 (2) | comps only | | (30, 308.25) | | | |
| 27-29 Nov (Fri-Sun default) | booked | 310.0 (1) | comps only | | (19, 500.5) | | | |
| **5 Dec (orphan, 1 n)** | **603.00** (548.00) | none returned (5th day) | n=0 | | **P46** of 1-night 2-beds (13, £603) | **591** / 228, 294, **396** (57%) | 0.766 | raise-signal (no pctl) |
| 14-17 Dec | 275.67 (280.33) | 283.33 (9) | P33 / -2.7% | +14.5% | P53 (47, 269.67) | 294.7 / 217 (26%) | 0.766 | raise +10% |
| **14-19 Dec (all 5 open nights)** | **269.00** (268.40) | 296.8 (7) | **P14 / -9.4%** | **+6.6%** | P37 (52, 284.7) | 312.2 / 221 (27%) | 0.766 | raise +10% |
| 16-19 Dec | 298.67 (293.67) | 310.67 (7) | P29 / -3.9% | +13.1% | P44 (52, 308.67) | 325.0 / 224 (28%) | 0.765 | raise +10% |
| 23-25 Dec (30-day default) | booked | 373.5 (4) | comps only | | (35, 395) | | | |
| **26 Dec (orphan, 1 n)** | **608.00** (636.00) | **494.0 (1)** | **P100 / +23.1%** | +44.8% | P50 of 1-night 2-beds (20, £587) | **508** / 250, 320, **413** (35%) | 0.902 | raise +5% |
| 26-30 Dec (context) | 27 Dec booked | 360.0 (9) | comps only | | (42, 408.25) | | | |

(`recommend` now uses a 7-day lead of +20 pts, up from +9 yesterday, because the 25 Nov-5 Dec stay entered the window. The "raise" outputs come from that lead, not from these nights' positions.)

### 23-25 Nov (tonight + tomorrow): hold (0%); supported position 0% to +2% vs comp median
- £275.50 = (243 + 228) x 0.851 + 150, Airbnb's 15% last-minute discount on today's PriceLabs prices. That is -12.3% vs yesterday's 22-24 Nov guest price.
- The only kept comp returned is £270 (Superhost 5.0 from 25 reviews), and we are +2.0% above it. The wider 2-bed sample puts us at **P31** (median £319.50).
- PriceLabs 235.5 sits between market P50 (213) and P75 (262-269) at 51-56% market occupancy.
- The rating line (+20%) argues lower, but n=1 and P31 wide argue against it. `recommend` (+5%) rests on the lead.
- **Read: hold.** The algorithm already cut 24 Nov by 16%. With n=1, no further cut is supported. Same-day nights earn nothing unsold.
- 23-25 Nov is the only combination left (min 2, and 25 Nov is a check-in). The min 2 (Reyhan, vs policy min 3 to 30 Nov) stays **confirm or revert**.

### 5 Dec (Reyhan +100%, min 1): hold; numbers only
- Airbnb £603 = 591 x 0.766 + 150, up +10.0% from £548. PriceLabs 520 -> 591 with no user edit: `uncustomized_price` 377 -> 406.
- No kept comp was returned for 5-6 Dec (5th day). £603 is **P46** of the 1-night 2-bed sample (n=13, median £603).
- PriceLabs 591 is 49% above market P90 (396). The Airbnb equivalent of P90 is 396 x 0.766 + 150 = £453.
- The 20 Nov sale (cancelled the same day) paid £343.33 room.
- **Read:** like-for-like comps support no direction (n=0), and the wide 1-night sample puts us at its median, so **no cut is argued** (judgement). Yesterday I said 520 was about at the P90 equivalent. At 591 it is now above it, and the rise is the algorithm's, not a user's.

### 14-19 Dec: hold (0%); supported position -3% to -9% vs comp median, and we are there
- P14-P33, -2.7% to -9.4% vs median, +6.6% to +14.5% over the line. Comps moved within ±2.7%, ours -1.7% to +1.7%.
- PriceLabs avg 295-325 is above market P75 (269-292) at 26-29% market occupancy.
- **Read: hold.** `recommend`'s +10% comes from the 7-day lead, not these nights. A cut is not argued either: we are already under the comp median.

### 26 Dec (Reyhan +100%, min 1): up to about -25% supported by 1 comp (508 -> about 381); the wider sample says at market; for Corentin as evidence
- The only kept comp returned is 1684834789445533643 (lift/balcony, 12th-floor skyline, 4.39 from 18) at **£494**. We are +23.1% above it and 44.8% over the line.
- PriceLabs 508 is above market **P90 413** (P50 250, occupancy 35%).
- Matching that comp needs (494 - 150) / 0.902 = **£381** (-25%). PriceLabs `uncustomized_price` is 345.
- **Against:** n=1, and the wider 1-night 2-bed sample puts us at **P50** (median £587).
- Reyhan's +100% is not settled by policy, so it stays **confirm or revert** for Corentin with this evidence. The algorithm alone moved it -5.8% overnight.

## P10 Hanger Lane, 1-bed (3318177)
Handed back: last night 18 Nov (policy `handbacks.P10`). All 60 nights in `prices.csv` for 23 Nov are unavailable (Blocked). No positioning and nothing proposed.

## P02 Ladbroke Grove, P03 Bayswater
Blocked on purpose (policy `intentional_blocks`). All 60 nights in `prices.csv` for 23 Nov are unavailable. No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or Smoobu (no rows in `listings.csv` or `prices.csv` for 23 Nov). Own price, percentile, rating gap and premium: **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (AWS WAF challenge, 23 Nov 07:21:56Z; not retried or bypassed). That covers Booking.com comps, our Booking.com displayed prices, P20's Booking.com capacity and whether the twins also match on Booking.com. Comp cancellation terms come only from Airbnb pills.
2. **3090701's new review** (4.7 -> 4.36): its text and date were not read. The "about 1 star" is an estimate from the averages. Whether the review sits on the right twin depends on the "likely" Airbnb-to-Smoobu mapping (policy `listing_facts.P13.ids`).
3. **Why the January -8% did not lower PriceLabs `price`** on either twin (3064856 3 Jan: uncustomised 157 -> price 173): NOT CHECKED (PriceLabs auditor).
4. **P20 tonight's price** comes from `final_price` 243 in call 5, because 23 Nov is not in the price window. It is consistent with Airbnb (0.851 x 471).
5. **P20 5 Dec** `uncustomized_price` rose 377 -> 406 with no edit. The algorithm's reason is NOT CHECKED.
6. **P20 Airbnb guest count 6 vs policy 4** (5th day): who changed it is NOT CHECKED.
7. **Airbnb factors** (0.765 at 28 days or less, 0.851 last-minute on P20, 0.90 beyond 28 days) are inferred from prices. The rule behind them is NOT CHECKED.
8. **Thin comp coverage:**
   - P13: n=0-4 on 24-26 Nov, 27-29 Nov, 13-15, 13-16, 17-20 (skewed), 18-21, 19-21, 19-22, 20-22, 18-22, 13-22 and 23-25 Dec.
   - P20: n=0-2 on 23-25 Nov (n=1), 23-24, 24-26, 27-29 Nov, 5 Dec (n=0, 5th day) and 26 Dec (n=1).
   - Only unsold comps can be priced, which biases peak medians.
9. P20's market percentiles use the 1-3 BR compset. P20 has 3 reviews, so the 0.85 line is judgement.
10. PriceLabs protocol: the two P13 override reads ran in parallel (one message), not one at a time as the brief requires. Both were read-only and both succeeded; no data effect.
11. P16, P18 and P19 have no data; P02, P03 and P10 have no sellable nights.
