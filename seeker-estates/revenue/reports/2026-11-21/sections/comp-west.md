# Competitor positioning: WEST + HERTS (D = 2026-11-21)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** I read `data/policy.json` first. Everything was read-only, and PriceLabs was called strictly one tool at a time:
1. `get_listing_date_overrides` for 3547481 (21 Nov - 20 Jan). Newest `updated_at` is still **18 Nov 12:17:57Z** (Reyhan's 26 Dec +100% min 1). No P20 override has changed since 18 Nov.
2. `get_user_logs` (listing, 18-21 Nov) for 3547481, 3064856 and 3090701 returned 8 entries. Six are Reyhan's 18 Nov edits. **Two are new: Reyhan, 20 Nov 22:50:45Z, -2% min 3 on 10-26 Dec on 3064856, copied to 3090701 ("Copied from parent listing").**
3. `get_listing_date_overrides` for 3064856 confirms 10-26 Dec at -2% min 3 (`updated_at` 20 Nov 22:50:45Z). Everything else there is older than 18 Nov.
4. `get_neighbourhood_data` (detail, future prices + occupancy) for 3547481 (Nearby Listings, 1-3 BR range, 271 listings) and 3064856 (2-3 BR, 149 listings). Both OK. Every market P25/P50/P75/P90 and market occupancy below comes from these two pulls ("mkt 21 Nov").
5. Own prices: `prices.csv` and `raw/prices_*.json` for 21 Nov. P13 twins were last refreshed **20 Nov 22:51:36Z / 22:51:40Z**, about 1 minute after Reyhan's edit. P20 was last refreshed **20 Nov 09:20:45Z** (stale, as the Dispatcher said).
6. Occupancy for `recommend`: Smoobu `reservations.csv` for 21 Nov, cancelled stays excluded. Market occupancy comes from `pl_kpis.csv`.
   - P13 (one flat): 7 d 6/7 = 85.7% vs market 57%; **30 d 20/30 = 66.7% vs 47%**; 60 d 32/60 = 53.3% vs 36%.
   - P20: **7 d 4/7 = 57.1% vs 47%**; 30 d 21/30 = 70.0% vs 38%; 60 d 33/60 = 55.0% vs 29%.

**OTAs:**
- **Airbnb:** public search and listing pages, checked **2026-11-21 07:19-07:31Z** with plain `curl` and default headers. Same scripts, boxes and comp ids as 18-20 Nov, so the figures compare day on day. There was no bot check and no HTTP error (0 FAIL).
- **Booking.com: NOT CHECKED.** One plain search request at 07:20:51Z returned the AWS WAF challenge (HTTP 202, `AwsWaf`). I did not retry it or bypass it.

**Method** (unchanged from 18-20 Nov):
- Search: 4 adults, entire home, at least 2 bedrooms. I used a wide box (half-side about 1.3 km) plus a 0.2 km box around each kept comp and each of our listings.
- Price = Airbnb all-in total / nights, after any offer shown. **The £150 cleaning fee is included**, plus any Airbnb guest fee. Taxes are not shown separately.
- **Line** = comp median x (1 + `quality_premium`):
  - 3090701: `quality_premium(4.7, 4.76)` = **-0.024**.
  - 3064856: `quality_premium(4.31, 4.76)` = **-0.15** (the cap).
  - P20 now has **5.0 from 2 reviews** (it had 1). `quality_premium(5.0, 4.80)` = +0.08, but I keep the judgement line of comp median x 0.85 because 2 reviews prove nothing yet.
- **Factor** = (Airbnb all-in x nights - £150) / the sum of the PriceLabs price for the same nights.

**Comp sets:** same ids as 18-20 Nov (`comps.json`). None replaced, all active:
- P13: 11 comps, each returned on at least 1 of 16 stays.
- P20: 12 comps. **789954794593691037 is back in a standard search** (21-23 Dec, £403.50), so no activity probe was needed today.

**Ratings and reviews** (listing pages 21 Nov): every comp's rating, review count and capacity is unchanged vs 20 Nov.
- Ours: 3090701 4.7 (10), 3064856 4.31 (13), **P20 5.0 (2)**: one new review since 20 Nov.
- Comp medians: P13 **4.76** (13 reviews), P20 **4.80** (17.5). Review gap vs comp median: 3090701 -3, 3064856 0, P20 **-15.5**.

**P20 Airbnb guest count: still 6 (3rd day).** The listing page on 21 Nov 07:19Z shows `personCapacity` **6**: it was 4 on 18 Nov and 6 on 19, 20 and 21 Nov. Policy `listing_facts.P20.max_guests` = 4 (Corentin 24 Oct). This is still **confirm or revert for Corentin**, and I propose nothing. It does not change today's numbers: every search was run at 4 adults, and P20's comps are kept at sleeps 4-5. Booking.com capacity: NOT CHECKED (WAF).

**Same comps vs 20 Nov:** 37 P20 and 52 P13 comp pairs were priced on both days.
- P20 comps: every move was within ±2.6%.
- P13 comps: within ±5.5%. The only moves above 3% were 1014671215040555613 (-3.5% to -5.5% on 18-22 Dec) and 1568189670839493789 (+3.2% / +3.5% on 19-21 / 20-22 Dec).
- **Ours moved more than the comps, again downward on P13:**
  - 3064856 fell **-9.4% to -13.9% on every 13-22 Dec stay**. 3090701 fell -2.2% to -7.5%. That is Reyhan's -2% edit, which replaced the earlier 10-26 Dec overrides; see P13.
  - P20 moved +0.9% to +2.4% (22-24 Nov, 14-19 Dec), -2.2% on 5 Dec and **-3.8% on 26 Dec** (PriceLabs 571 -> 543).

**Rows written:**
- **1,212 rows** appended to `data/snapshots/2026-11-21/comps.csv` under `flock` on `.comps.csv.lock` (another agent had already copied the file forward from 20 Nov).
  - Kept comps: P13 176 rows (11 x 16) and P20 144 rows (12 x 12). Comps that were not returned have a blank price and "NOT RETURNED" in `source`.
  - Ours (not comps): `P13:ours` 32 and `P20:ours` 12.
  - Wider 2-bed sample: `P13:wide` 510 and `P20:wide` 338.
- **24 rows** appended to `channel_checks.csv` (our Airbnb displayed prices) under `.channel_checks.csv.lock`.
- To find them, filter `source` on "comp-west", "checked 2026-11-21" and "stay <ci> to <co>".

**Recompute check** (`snapshot.load('2026-11-21')` + `comp_summary`, filtered by stay). It matches the tables:

| Listing | Stay | n | Median | Position |
|---|---|---|---|---|
| P13 3090701 | 13-16 Dec | 4 | 234.0 | P0 / -15.1% |
| P13 3064856 | 13-16 Dec | 4 | 234.0 | P0 / -11.4% |
| P13 3090701 | 16-19 Dec | 6 | 235.67 | P0 / -12.4% |
| P13 3090701 | 19-22 Dec | 2 | 228.17 | P50 / +3.4% |
| P13 both twins | 5-8 Jan | 8 | 211.33 | P38 / -4.3% |
| P13 both twins | 14-17 Jan | 8 | 217.0 | P25 / -7.4% |
| P20 | 22-24 Nov | 2 | 289.25 | P100 / +4.2% |
| P20 | 14-17 Dec | 9 | 291.0 | P33 / -2.9% |
| P20 | 14-19 Dec | 7 | 302.6 | P14 / -12.2% |
| P20 | 16-19 Dec | 7 | 315.0 | P29 / -8.6% |
| P20 | 26-27 Dec | 1 | 494.0 | P100 / +29.4% |

## Comp tables (Airbnb all-in £/night, 4 adults, checked 2026-11-21 07:20-07:31Z)
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- For our listings, "not returned" means booked, blocked or below the minimum stay:
  - P13: 22-26 Nov booked/blocked. 27 Nov is open with min 1, but 28 Nov is booked. 13-15, 19-21 and 20-22 Dec are below min 3. 21-23 and 22-27 Dec hit the 22 Dec booking.
  - P20: 22-23 and 23-24 Nov are below min 2. 24-26 Nov hits the 25 Nov booking. 27-29 Nov and 21-23 Dec are booked. 26-30 Dec hits the 27 Dec booking.
- Default stays: next Fri-Sun = 27-29 Nov, midweek = 24-26 Nov, 30 days out = 21-23 Dec. All of these are booked for us on both properties, so they are comps only.

#### P13
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 24 Nov-26 Nov | 27 Nov-29 Nov | 13 Dec-15 Dec | 13 Dec-16 Dec | 16 Dec-19 Dec | 17 Dec-20 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec | 19 Dec-22 Dec | 20 Dec-22 Dec | 18 Dec-22 Dec | 13 Dec-22 Dec | 21 Dec-23 Dec | 22 Dec-27 Dec | 5 Jan-8 Jan | 14 Jan-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.85 (13) | Garden view/balcony; Guest favourite; free cancellation |  |  |  | 232.33 |  |  |  |  |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.82 (11) | Paid parking; Guest favourite; free cancellation |  |  | 244 | 235.67 | 236.33 |  |  |  |  |  |  |  |  |  | 235.67 | 235.67 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking; garden; free cancellation |  |  |  |  | 225.67 |  | 243.33 | 262.5 |  |  |  |  |  |  | 218.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  | 235 | 245.33 | 248.67 | 275.5 | 238.33 | 252 | 227.5 |  | 239 | 202.6 | 214 | 225.33 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.74 (53) | Superhost; 2 bath |  |  |  |  |  |  |  |  |  | 280 |  |  |  | 303.8 | 195.67 | 202 |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | Garden | 152.5 |  |  |  |  |  |  |  |  |  |  |  |  |  | 135.67 | 154.67 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed | 216 |  | 233.5 | 208.67 | 215 | 224.33 | 224.33 | 247.5 | 218 | 233.5 | 208 | 164 | 244.5 | 216.8 | 208.67 | 208.67 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5 (10) | Lift; skyline view |  |  |  |  | 450.67 | 456.67 |  |  |  |  |  |  |  |  | 419.33 | 430.33 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking |  |  | 244.5 | 241 |  |  |  |  |  |  |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5 (13) | Lift/paid parking/balcony/panoramic view; Guest favourite; free cancellation |  |  |  |  | 363.67 | 363.67 |  |  |  |  |  |  |  |  |  | 316.67 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking; garden | 152.5 |  |  |  |  |  |  | 167.5 |  |  |  |  |  |  | 141.67 | 161.67 |
| **Comp median (n)** | | | 4.76 (13) | | **152.50** (3) | - (0) | **244.00** (3) | **234.00** (4) | **235.67** (6) | **304.50** (4) | **243.33** (3) | **255.00** (4) | **228.17** (2) | **252.00** (3) | **217.75** (2) | **164.00** (1) | **241.75** (2) | **216.80** (3) | **211.33** (8) | **217.00** (8) |
| Wider 2-bed sample median (n) | | | | | 230.00 (26) | 374.00 (7) | 255.00 (43) | 240.33 (47) | 248.83 (46) | 262.67 (40) | 255.00 (36) | 293.50 (19) | 300.00 (33) | 275.00 (29) | 252.88 (38) | 265.00 (38) | 280.50 (29) | 298.50 (40) | 214.33 (49) | 218.33 (54) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.7 (10)** | | 6 | | | not returned | not returned | not returned | **198.67** | **206.33** | **213.00** | **223.00** | not returned | **236.00** | not returned | **218.25** | **173.89** (strike £1,815 -> £1,565) | not returned | not returned | **202.33** | **201.00** |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | 6 | | | not returned | not returned | not returned | **207.33** | **216.00** | **222.67** | **233.00** | not returned | **243.00** | not returned | **226.00** | **182.00** (strike £1,901 -> £1,638) | not returned | not returned | **202.33** | **201.00** |

#### P20
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 22 Nov-24 Nov | 22 Nov-23 Nov | 23 Nov-24 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 5 Dec-6 Dec | 14 Dec-17 Dec | 14 Dec-19 Dec | 16 Dec-19 Dec | 21 Dec-23 Dec | 26 Dec-27 Dec | 26 Dec-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Houseboat, marina view; Superhost; Guest favourite |  |  |  |  |  |  | 282.67 | 278.8 | 281 |  |  | 285.25 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Terrace; free parking; Guest favourite; free cancellation |  |  |  |  |  |  |  |  |  |  |  | 336 |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking |  |  |  |  |  |  |  |  |  | 403.5 |  |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (57) | Lift; 2 bath |  |  |  |  |  |  |  |  |  |  |  | 442.5 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/paid parking/river view/balcony; 2 bath |  |  |  |  |  |  | 382.67 | 378.6 | 382.67 |  |  | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony; 12th-floor skyline |  |  |  |  |  |  | 324 | 334.4 | 341.33 | 357 | 494 | 417 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking |  |  |  |  |  |  | 261.67 | 249.8 | 268.67 | 281.5 |  |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/paid parking/balcony |  |  |  |  |  |  | 333.33 | 327.8 | 333.33 |  |  | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/paid parking/balcony |  |  |  |  |  |  | 291 | 302.6 | 315 |  |  | 408.5 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/Thames view; Superhost; free cancellation |  |  |  |  |  |  | 222.67 |  |  |  |  |  |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking; townhouse | 288.5 |  |  | 288.5 |  |  | 250 |  |  | 264 |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5 (25) | Balcony; Superhost; Guest favourite | 290 |  |  | 270 | 310 |  | 306 | 291.8 | 309 | 390 |  | 360 |
| **Comp median (n)** | | | 4.80 (17.5) | | **289.25** (2) | - (0) | - (0) | **279.25** (2) | **310.00** (1) | - (0) | **291.00** (9) | **302.60** (7) | **315.00** (7) | **357.00** (5) | **494.00** (1) | **370.12** (8) |
| Wider 2-bed sample median (n) | | | | | 345.50 (31) | 383.00 (19) | 407.00 (15) | 305.00 (36) | 500.50 (19) | 800.00 (11) | 269.33 (49) | 279.40 (53) | 300.00 (53) | 390.00 (39) | 633.00 (19) | 432.50 (40) |
| **Ours 3547481 (Airbnb 1791529331262420081) 5 (2)** | | 6 | | | **301.50** | not returned | not returned | not returned | not returned | **542.00** | **282.67** | **265.80** | **288.00** | not returned | **639.00** | not returned |

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### What changed since 20 Nov: Reyhan's -2% on 10-26 Dec cut 3064856 by about 12% and narrowed the twin gap to about 6%
- **Edit:** `get_user_logs` shows Reyhan at **20 Nov 22:50:45Z** setting **-2%, min 3, on 10-26 Dec** on 3064856, with 3090701 "copied from parent". This is the first edit since 18 Nov. The value it replaced is NOT CHECKED (the log window starts 18 Nov). Judging by the price-to-uncustomised ratio, the old setting was a premium on 3064856 (about 1.07-1.13x on 13-17 Dec yesterday, 0.98-1.05x today).
- **PriceLabs 13-19 Dec after the 22:51Z refresh:**
  - 3064856: 240/235/232/237/245/260/266 -> **209/205/203/207/215/228/234** (-12% to -13%).
  - 3090701: 204/200/198/202/208/221/226 -> **197/193/191/195/202/215/220** (-3%).
  - 3064856 is now **5.9-6.4% dearer every night 13-20 Dec** (it was 17-18% yesterday).
- **21 Dec: identical** (227 / 227). 20 Dec is no longer identical (217 vs 205).
- **On Airbnb** the gap is now 3.0-4.7% on every 13-22 Dec stay (for example 13-16 Dec £198.67 vs £207.33). Both twins fell more than any comp.
- **This conflicts with Corentin's direction** ("keep Booking.com discounts, cut PriceLabs discounts"): it is a new PriceLabs discount over 17 nights (10-12, 22-26 Dec booked or blocked; 13-21 Dec open). It goes to Corentin as **confirm or revert**, not as a new proposal.
- **January:** still identical on Airbnb (5-8 Jan £202.33 on both; 14-17 Jan £201.00 on both). PriceLabs is identical on 7 of the 16 nights 3-18 Jan (4, 5, 6, 9, 10, 13 and 17 Jan); the other 9 are £1-3 apart (under 2%). The twin rule (policy `listing_facts.P13.twin_listings`) still applies.
- **Airbnb factor** is unchanged: 0.765-0.768 on nights 28 days out or less (now up to 18 Dec), 0.81-0.86 on stays that straddle day 28, and 0.90-0.91 beyond that. The source is NOT CHECKED.
- **Weekly discount on 13-22 Dec (9 n)** matches policy:
  - 3090701: (1,815 - 150) x 0.85 + 150 = £1,565.25 (Airbnb shows £1,565).
  - 3064856: (1,901 - 150) x 0.85 + 150 = £1,638.35 (Airbnb shows £1,638).
- **27 Nov / 1 Dec** (Reyhan +25% min 1) are unchanged: 3064856 266 / 226, 3090701 187 / 158. The 1 Dec +25% vs the policy +50% is still **confirm or revert for Corentin**. These are single nights, so no comps were priced.

### 13-21 Dec (9 open nights): +10% on 3090701 13-17 Dec, +5% on 18-19 Dec; 3064856 hold (the -2% is confirm or revert); -3% on 3064856 21 Dec
| Stay | Ours 3090701 / 3064856 (20 Nov) | Comp median (n) | Comp pctl / vs median | vs line 3090701 / 3064856 | Wider pctl (n, median) | PL avg 3090701 / 3064856 vs mkt P50 (mkt occ) | Factor | `recommend` (30 d, +20 pts) |
|---|---|---|---|---|---|---|---|---|
| 13-15 Dec (2 n) | below min 3 | 244.0 (3) | comps only | | (43, 255) | 195.0 / 207.0 vs 221.5 (32%) | | |
| **13-16 Dec** | **198.67 / 207.33** (203.67 / 230.33) | 234.0 (4) | **P0 / -15.1%** ; **P0 / -11.4%** | **-13.0%** / +4.2% | P11 / P19 (47, 240.33) | 193.7 / 205.7 vs 221.7 (29%) | 0.768 | raise +10% |
| **16-19 Dec** | **206.33 / 216.00** (211.00 / 239.33) | 235.67 (6) | **P0 / -12.4%** ; P17 / -8.3% | **-10.3%** / +7.8% | P11 / P20 (46, 248.83) | 204.0 / 216.7 vs 236.3 (34%) | 0.766 | raise +10% |
| 17-20 Dec | 213.00 / 222.67 (227.33 / 258.67) | 304.5 (4, including the lift/skyline comps at 456.67 / 363.67) | P0 / -30.0% ; P0 / -26.9% | -28.3% / -14.0% | P12 / P23 (40, 262.67) | 212.3 / 225.7 vs 243.7 (41%) | 0.768 | raise +10% |
| 18-21 Dec | 223.00 / 233.00 (241.00 / 263.00) | 243.33 (3) | P0 / -8.4% ; P33 / -4.2% | -6.1% / +12.7% | P17 / P22 (36, 255) | 213.3 / 226.3 vs 244.7 (45%) | 0.811 | raise +10% |
| 19-21 Dec (2 n) | below min 3 | 255.0 (4) | comps only | | (19, 293.5) | 212.5 / 225.5 vs 245.5 (48%) | | |
| 19-22 Dec | 236.00 / 243.00 (254.33 / 266.33) | 228.17 (2) | P50 / +3.4% ; P100 / +6.5% | +6.0% / +25.3% | P12 / P21 (33, 300) | 217.3 / 226.0 vs 246.0 (47%) | 0.856 | raise +10% / +5% |
| 20-22 Dec (2 n) | below min 3 | 252.0 (3) | comps only | | (29, 275) | 216.0 / 222.0 vs 244.5 (47%) | | |
| 18-22 Dec | 218.25 / 226.00 (233.00 / 249.50) | 217.75 (2) | P50 / +0.2% ; P50 / +3.8% | +2.7% / +22.1% | P21 / P24 (38, 252.88) | 216.8 / 226.5 vs 245.2 (45%) | 0.834 | raise +10% |
| 13-22 Dec (9 n, weekly -15%) | 173.89 / 182.00; strike £1,815 -> £1,565 / £1,901 -> £1,638 | 164.0 (1) | n=1 | | P5 / P8 (38, 265) | 205.0 / 216.1 vs 234.7 (37%) | | numbers only |
| 21-23 Dec (30-day default) | 22 Dec booked | 241.75 (2) | comps only | | (29, 280.5) | | | |

- **3090701 13-17 Dec: +10% supported** (PriceLabs 197/193/191/195/202 -> about **217/212/210/215/222**).
  - It is **P0 on 13-16 Dec (-15.1%, n=4) and on 16-19 Dec (-12.4%, n=6)**, and 10-13% under its rating line.
  - The same comps moved by at most ±5.5%, so the gap comes from our cuts (Reyhan's edit plus yesterday's refresh), not from the market.
  - PriceLabs is 13-14% under market P50 at 29-34% market occupancy.
  - +10% leaves 13-16 Dec at about £218.5 on Airbnb (P25, -6.6% vs median, -4.3% vs line). It would put 3090701 about 3.5% above 3064856. The twin gap stays non-zero, and which twin is cheaper does not matter (policy `deprioritised.p13_twin_price_order`).
- **3090701 18-19 Dec: +5% supported** (215/220 -> about **226/231**). 18-21 Dec is P0 and 6.1% under the line, but 19-22 Dec (n=2) is already 6.0% over it, so +5% splits the two.
- **3064856 13-20 Dec: hold.**
  - It is P0-P33, 4-11% under the comp median, but +4% to +13% over its 4.31 rating line. The evidence supports roughly where it was before the edit to about where it is now, nothing outside that.
  - **Reyhan's -2% (10-26 Dec, both twins) is confirm or revert for Corentin.** Reverting it on 3064856 (about +2%) is within the evidence. A full return to yesterday's level (+12%) is not: that would put 3064856 at +16% to +20% over its line.
- **3064856 21 Dec: -3% supported** (227 -> about **220**) to break the identical 227/227 pair. 3064856 is P100 on 19-22 Dec and +25% over its line, the furthest of the two from its line. This is a twin-rule fix, not a market call: PriceLabs is 8% under market P50 here.
- `recommend` says +10% on the occupancy lead (66.7% vs 47% over the next 30 days). The like-for-like price evidence supports only the moves above.

### January twins: +3% on 3090701 (3-18 Jan); hold 3064856 (same as 19-20 Nov; not applied)
- **5-8 Jan:** both £202.33 (20 Nov £203.00). P38 of 8, -4.3% vs median 211.33.
  - Lines: 3090701 £206.26 (**-1.9%**); 3064856 £179.63 (+12.6%).
  - PriceLabs 168.7 vs market P50 204.7 (-17.6%). Market occupancy **17%**.
- **14-17 Jan:** both £201.00 (20 Nov £200.00). P25 of 8, -7.4% vs median 217.0.
  - Lines: 3090701 £211.79 (**-5.1%**); 3064856 £184.45 (+9.0%).
  - PriceLabs 165.3 vs P50 208.7 (-20.8%). Market occupancy **12%**.
- **Supported: +3% on 3090701 for 3-18 Jan, 3064856 unchanged.** That puts 3090701 at about its line on 5-8 Jan (about £208 vs £206.26), 2% under it on 14-17 Jan, and restores a 3% twin gap.
  - 14-17 Jan alone would carry up to +5%.
  - With market occupancy at 12-17% I do not argue more than +3% across the range, despite `recommend`'s +10%.

## P20 Waterford Court, 2-bed (Airbnb 1791529331262420081, 5.0 from 2 reviews; Airbnb shows 6 guests, see above)

### What changed since 20 Nov
- **5 Dec sold and cancelled** (Airbnb, made and cancelled 20 Nov). It paid **£343.33 room + £150 cleaning = £493.33 all-in** for the orphan night at Reyhan's +100%. See the 5 Dec section below.
- **22-24 Nov Smoobu 266/266/250 vs PriceLabs 288/282/273.** Airbnb today shows **£603 for 22-24 Nov** = £453 room = **0.851 x Smoobu (266 + 266 = 532)**. That is exactly Airbnb's 15% last-minute discount (policy `listing_facts.P20.airbnb_discounts_22oct`), applied to the **Smoobu** values. On PriceLabs' 288/282 the same arithmetic gives £634.50 (£317.25/night). So **Airbnb guests see the lower Smoobu price.** Why Smoobu differs (a manual edit or a stale push) is NOT CHECKED here; it is the pricelabs/channel agents' item.
- PriceLabs moves (P20 has not refreshed since 20 Nov 09:20:45Z):
  - 5 Dec: 528 -> **512**.
  - 26 Dec: 571 -> **543** (uncustomised 376 -> 372).
  - 14-18 Dec: 298/301/301/305/316 -> **303/305/304/307/322**.
- PriceLabs `price` / `uncustomized_price` fell from **0.90 to 0.866 on 21 Dec-18 Jan**: January is about 4-5% lower (for example 3 Jan 256 -> 242, 18 Jan 247 -> 221). There is no log entry and no override change, so the cause is NOT CHECKED (PriceLabs auditor). I did not price P20 January against comps.
- Overrides and logs are unchanged: 5 / 26 Dec +100% min 1; 22-24 Nov -5% min 2; 21 Nov -5% min 3.

Column key: "Line" = comp median x 0.85. "PriceLabs vs market" uses the Nearby Listings compset (1-3 BR range), which understates a 2-bed P50.

| Stay | Ours 21 Nov (20 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n, median) | PL avg / mkt P50, P75, P90 (mkt occ) | Factor | `recommend` (horizon) |
|---|---|---|---|---|---|---|---|---|
| **22-24 Nov (min 2)** | **301.50** (294.50) | 289.25 (2: 757342335233586120 £288.50, 1343981071946969781 £290.00) | **P100 / +4.2%** | +22.6% | **P39** (31, 345.5) | Smoobu 266 / PL 285.0 / 214, 270, 351 (49%) | **0.851 vs Smoobu** (0.795 vs PL) | raise +5% (7 d +10 pts at P100) |
| 22-23 Nov / 23-24 Nov (1 n) | below min 2 | none returned | | | (19, 383) / (15, 407) | | | |
| 24-26 Nov (midweek default) | 25 Nov booked | 279.25 (2) | comps only | | (36, 305) | | | |
| 27-29 Nov (Fri-Sun default) | booked | 310.0 (1) | comps only | | (19, 500.5) | | | |
| **5 Dec (orphan, 1 n)** | **542.00** (554.00) | none returned (3rd day) | n=0 | | **P18** of 1-night 2-beds (11, £800) | **512** / 228, 295, **396** (54%) | 0.766 | numbers only |
| 14-17 Dec | 282.67 (279.67) | 291.0 (9) | P33 / -2.9% | +14.3% | P57 (49, 269.33) | 304.0 / 216 (25%) | 0.765 | raise +10% (30 d) |
| **14-19 Dec (all 5 open nights)** | **265.80** (262.80) | 302.6 (7) | **P14 / -12.2%** | **+3.3%** | P38 (53, 279.4) | 308.2 / 220 (26%) | 0.765 | raise +10% |
| 16-19 Dec | 288.00 (285.33) | 315.0 (7) | P29 / -8.6% | +7.6% | P42 (53, 300) | 311.0 / 224 (27%) | 0.765 | raise +10% |
| 21-23 Dec (30-day default) | booked | 357.0 (5) | comps only | | (39, 390) | | | |
| **26 Dec (orphan, 1 n)** | **639.00** (664.00) | **494.0 (1)** | **P100 / +29.4%** | +52.2% | P58 of 1-night 2-beds (19, £633) | **543** / 251, 324, **415** (35%) | 0.901 | raise +5% (60 d) |
| 26-30 Dec (context) | 27 Dec booked | 370.12 (8) | comps only | | (40, 432.5) | | | |

### 22-24 Nov: supported 0% to +5% vs comp median. The Smoobu price (+4.2%) is inside it; PriceLabs' 288/282 (+9.7%) is above it
- At Smoobu 266/266 we are **P100 of only 2 comps, +4.2%** (£301.50 vs £289.25). That is 22.6% over the 1-review-era line, and P39 of the wider sample (median £345.5).
- If PriceLabs' 288/282 reached Airbnb, the all-in would be about **£317.25 (+9.7% vs median)**.
- `recommend` gives +5% on a 7-day lead of +10 pts (57.1% vs 47%), just on the threshold. Applied to the Smoobu level, that is about £316.50, about where PriceLabs' own price lands.
- Market P75 is 266-273 against PriceLabs 285 and Smoobu 266. Market occupancy is 44-50%.
- Read: **evidence supports +0% to +5% vs comp median; the current Airbnb price sits inside it, and PriceLabs' value sits at or just above the top edge.** Correcting the mismatch upward is not argued by comps (n=2, both cheaper). Leaving it is not a leak by this measure. 24 Nov can only sell with 23 Nov (min 2; 25 Nov is a check-in).
- The min 2 on these nights (Reyhan, vs policy min 3 to 30 Nov) stays **confirm or revert** for Corentin.

### 5 Dec (Reyhan +100%, min 1): sold once at £493 all-in, then cancelled. Hold for now; numbers only
- The sale paid **£343.33 room** = 0.650 x the PriceLabs price at the time (528). All-in it was **£493.33**.
  - On 20 Nov 07:2xZ our Airbnb listing displayed £554 all-in (£404 room). The guest paid 15% less than that. Why is NOT CHECKED: the stay was 15 days out, so it falls just outside the 0-14-day last-minute window; it could be an Airbnb-side discount or a different guest count.
  - The booking was made and cancelled the same day. The reason is NOT CHECKED (no guest data).
- Today Airbnb shows **£542** (PriceLabs 512 x 0.766 + 150).
- No kept comp was returned for 5-6 Dec (3rd day). £542 is **P18** of the 1-night 2-bed sample (n=11, median £800).
- The paid room price (£343) sits between market P75 (£295) and P90 (£396), at 54% market occupancy.
- Read: a guest accepted about the market P75-P90 room price. Like-for-like comps support no direction (n=0). Supported: **hold** (judgement, not a function output). Market P90 (£396 room) on Airbnb equals PriceLabs about 517 (396 / 0.766), which is about today's 512. So even the fallback step (toward P90 if unsold around 28 Nov) means **no cut is argued**.

### 14-19 Dec: hold (0%); supported position -3% to -12% vs comp median
- P14-P33, -2.9% to -12.2% vs median, and +3.3% to +14.3% over the line.
- Comps flat (within ±2.6%); ours +1% (PriceLabs +5 to +6 per night at the 20 Nov refresh). Market occupancy 25-27%.
- `recommend`'s +10% rests on the 30-day lead, not on these nights. 14-19 Dec is only 3.3% above the line (£257.21). A further drop would turn the evidence to a small raise; today it supports hold.

### 26 Dec (Reyhan +100%, min 1): about -30% supported (543 -> about £382)
- The only kept comp returned is 1684834789445533643 (lift/balcony, 12th-floor skyline, 4.39 from 18), at **£494** all-in. We are **+29.4%** above it and 52% over the line.
- PriceLabs 543 is above market **P90 415** (P50 251, occupancy 35%).
- Matching that comp needs (494 - 150) / 0.90 = **£382**. PriceLabs' own `uncustomized_price` for 26 Dec is 372.
- The evidence is thin: n=1, and the wider 1-night sample puts us at P58 (median £633). This is Reyhan's edit and is not settled by policy, so it goes to Corentin as evidence. 26 Dec is the only open night between the 19-26 Dec and 27 Dec-3 Jan stays.
- No other December nights are open: 1-4, 6-13, 19-25 Dec and 27 Dec-2 Jan are booked (25 Nov-4 Dec, 6-13 Dec, 19-25 Dec, 27 Dec-2 Jan).

## P10 Hanger Lane, 1-bed (3318177)
- Handed back: last night 18 Nov (policy `handbacks.P10`). All 60 nights in `prices.csv` 21 Nov are unavailable. No positioning, nothing proposed.

## P02 Ladbroke Grove, P03 Bayswater
- Blocked on purpose (policy `intentional_blocks`). All 60 nights in `prices.csv` 21 Nov are unavailable. No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
- Not in PriceLabs or Smoobu (no rows in `listings.csv` or `prices.csv` 21 Nov). Own price, percentile, rating gap and premium: **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (AWS WAF challenge 21 Nov 07:20:51Z; not retried or bypassed). This covers comps, our displayed Booking.com prices, P20 Booking.com capacity, and whether Booking.com shows the Smoobu or the PriceLabs value for P20 22-24 Nov. Comp cancellation policy comes only from Airbnb "Free cancellation" pills.
2. **The value Reyhan's 20 Nov 22:50Z -2% replaced** on 10-26 Dec (both P13 twins) is NOT CHECKED, because the log window starts 18 Nov. The P13 changes since yesterday are attributed to that edit plus the 22:51Z refresh.
3. **P20 Smoobu 266/266/250 vs PriceLabs 288/282/273 on 22-24 Nov:** Airbnb matches Smoobu (0.851 x). The change source is NOT CHECKED.
4. **P20 5 Dec sale at £343.33 room** is 15% under the room price Airbnb displayed on 20 Nov (£404). The cause is NOT CHECKED, and so is the reason for the cancellation (no guest data).
5. **P20 January** PriceLabs is 4-5% lower (price / uncustomised 0.90 -> 0.866 on 21 Dec-18 Jan) with no log entry: cause NOT CHECKED. P20 January was not priced against comps. P20 PriceLabs is still stale (last refresh 20 Nov 09:20:45Z).
6. **P20 Airbnb guest count 6 vs policy 4** (3rd day). Who changed it is NOT CHECKED.
7. **Airbnb factors** (0.765 at 28 days or less, 0.85 last-minute on P20 22-24 Nov, 0.90 beyond 28 days) are inferred from prices. The Smoobu/Airbnb rule behind them is NOT CHECKED.
8. **Thin comp coverage:**
   - P13: n=0-4 on 24-26 Nov, 27-29 Nov, 13-15, 13-16, 17-20 (skewed by two lift/skyline comps), 18-21, 19-21, 19-22, 20-22, 18-22, 13-22 and 21-23 Dec.
   - P20: n=0-2 on 22-24 Nov, 22-23, 23-24, 24-26, 27-29 Nov, 5 Dec and 26 Dec. The 26 Dec -30% rests on one comp, and 5 Dec has none.
   - Only unsold comps can be priced, which biases peak medians.
9. P20's market percentiles use the 1-3 BR compset (understates a 2-bed P50). P20 has 2 reviews, so the 0.85 line is judgement.
10. P13's Airbnb-to-Smoobu id mapping is still "likely" (policy). P16, P18 and P19 have no data; P02, P03 and P10 have no sellable nights.
