# Competitor positioning: WEST + HERTS (D = 2026-11-19)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** I read `data/policy.json` first. Everything below was read-only, and PriceLabs was called one tool at a time:
1. `get_listing_date_overrides` for 3547481 (19 Nov - 18 Jan).
2. `get_user_logs` (listing, 17-19 Nov) for 3547481, 3064856 and 3090701. It returned **6 entries, all from Reyhan on 18 Nov between 12:14 and 12:17Z** (detailed below).
3. `get_neighbourhood_data` (detail, future prices + occupancy) for 3547481 (Nearby Listings, 1-3 BR, 273 listings) and 3064856 (2-3 BR, 151 listings). Both returned OK. All market P25/P50/P75/P90 and market-occupancy figures below come from these two pulls ("mkt 19 Nov").
4. Own prices come from `prices.csv` and `raw/prices_*.json` (19 Nov). The last PriceLabs refresh was 18 Nov 12:15:23-25Z for the P13 twins and 12:20:20Z for P20, i.e. after Reyhan's edits. 3090701 is the linked child.
5. Occupancy for `recommend` comes from Smoobu `reservations.csv` 19 Nov (cancelled excluded) and market occupancy from `pl_kpis.csv`:
   - P13 (one flat): 30 d **22/30 = 73.3%** vs 47%; 60 d 34/60 = 56.7% vs 37%.
   - P20: 7 d **29% vs 50%** (pl_kpis); 30 d 18/30 = 60.0% vs 38%; 60 d 32/60 = 53.3% vs 30%.

**OTAs:**
- **Airbnb:** public search and listing pages, checked 2026-11-19 07:19-07:26Z with plain `curl` and default headers. No bot check was met and there were no HTTP errors. The scripts, stays and method are the same as on 18 Nov, so the wider sample can be compared day-on-day this time.
- **Booking.com: NOT CHECKED.** One plain search request today returned the AWS WAF challenge (HTTP 202, `AwsWaf`). I did not retry it or try to bypass it.

**Method** (unchanged):
- Search: 4 adults, entire home, at least 2 bedrooms. A wide box with a half-side of about 1.3 km, plus a 0.2 km box around each kept comp and each of our listings.
- Price = Airbnb all-in total / nights, after any offer shown, with £150 cleaning and the Airbnb guest fee **included**. Taxes are not shown separately.
- **Line** = comp median x (1 + `quality_premium`):
  - 3090701: `quality_premium(4.7, 4.76)` = **-0.024**.
  - 3064856: `quality_premium(4.31, 4.76)` = **-0.15** (cap).
  - P20 still has **5.0 from 1 review** (listing page 19 Nov). `quality_premium(5.0, 4.80)` = +0.08, but I keep the judgement line of comp median x 0.85, as on 18 Nov.
- **"Factor"** = (Airbnb all-in x nights - £150) / sum of the PriceLabs price (= Smoobu) for the same nights.

**Comp sets:** the same ids as 18 Nov; none replaced.
- **P13:** 11 comps, all active (each returned on at least 1 of 13 stays).
- **P20:** 12 comps. **789954794593691037 was again absent from every standard stay (6th day).** The 0.2 km activity probe found it bookable at 4.89 (18 reviews): 1-4 Dec £900, 7-10 Dec £1,180, 8-11 Jan £1,180. It stays in the set; its probe rows are in `comps.csv`.

**Ratings and reviews** (listing pages 19 Nov): every comp's rating and review count is unchanged from 18 Nov.
- Ours: 3090701 4.7 (10), 3064856 4.31 (13), P20 5.0 (1), still "New place to stay" in search.
- Comp medians: P13 4.76 (13 reviews), P20 4.80 (17.5).
- Review gap vs comp median: 3090701 -3, 3064856 0, P20 -16.5.

**New today: the P20 Airbnb listing now shows "6 guests"** (`personCapacity` 6 on the listing page, 19 Nov 07:2xZ). It showed 4 on 18 Nov 07:21Z. Policy `listing_facts.P20.max_guests` says "Max guests stays 4 (Corentin 24 Oct)". This goes to Corentin as **confirm or revert**; I am not proposing anything. Comps are kept at sleeps 4-5, as before.

**Same comps vs 18 Nov:** 57 P13 and 58 P20 pairs were priced on both days.
- Every comp moved by 5% or less. Only 1684834789445533643 (P20, -3% to -5%) and 1014671215040555613 (P13, -3% to -5%) moved more than 3%.
- **Ours moved more than the comps:**
  - 3090701 fell 4-7% on every December and January stay from 16 Dec onwards.
  - P20 16-19 Dec fell 4.3%, and 22-24 Nov rose 3.1%.

**Rows written:**
- **1,140 rows** appended to `data/snapshots/2026-11-19/comps.csv` under `flock` on `.comps.csv.lock`. Another agent had already copied the file forward from 18 Nov.
  - Kept comps: P13 143 rows (11 x 13) and P20 144 rows (12 x 12). Comps that were not returned have a blank price and "NOT RETURNED" in `source`.
  - Ours: `P13:ours` 26 rows and `P20:ours` 12 rows (not comps).
  - Wider 2-bed sample: `P13:wide` 465 rows and `P20:wide` 347 rows.
  - `P20:probe`: 3 rows.
- **27 rows** appended to `channel_checks.csv` (our Airbnb listings) under `.channel_checks.csv.lock`.
- To find them, filter `source` on "comp-west", "checked 2026-11-19" and "stay <ci> to <co>".

**Recompute check** (`snapshot.load('2026-11-19')` + `comp_summary`, filtered by stay; matches the tables):

| Listing | Stay | n | Median | Position |
|---|---|---|---|---|
| P13 3090701 | 13-16 Dec | 4 | 237.0 | P25 / -9.3% |
| P13 both twins | 19-22 Dec (30-day default) | 2 | 226.5 | P100 / +14.1% |
| P13 both twins | 5-8 Jan | 8 | 211.33 | P38 / -3.3% |
| P13 both twins | 14-17 Jan | 8 | 217.0 | P25 / -7.5% |
| P20 | 20-24 Nov | 4 | 313.38 | P0 / -15.3% |
| P20 | 14-17 Dec | 9 | 301.33 | P33 / -6.9% |
| P20 | 16-19 Dec | 7 | 325.33 | P29 / -5.8% |
| P20 | 26-27 Dec | 1 | 494.0 | P100 / +34.2% |

## Comp tables (Airbnb all-in £/night, 4 adults, checked 2026-11-19 07:19-07:26Z)
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- For ours, "not returned" means booked, blocked or below the minimum stay:
  - P13: 19 Nov-26 Nov is booked, 13-15 Dec is below min 3, and 22 Dec-2 Jan is booked.
  - P20: 20-22 Nov is below min 3, 24-26 Nov hits the 25 Nov booking, and 26-30 Dec hits the 27 Dec booking.

#### P13
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 13 Dec-15 Dec | 13 Dec-16 Dec | 16 Dec-19 Dec | 17 Dec-20 Dec | 18 Dec-21 Dec | 19 Dec-22 Dec | 18 Dec-22 Dec | 13 Dec-22 Dec | 22 Dec-27 Dec | 5 Jan-8 Jan | 14 Jan-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.85 (13) | Garden view/balcony; Guest favourite; free cancellation |  |  |  | 239.67 |  |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.82 (11) | Paid parking; Guest favourite; free cancellation |  |  | 244 | 235.67 | 238.33 |  |  |  |  |  |  | 235.67 | 235.67 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking; garden; free cancellation |  |  |  |  | 235 |  | 251.33 |  |  |  |  | 218.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  | 235 | 239 | 236.67 | 226.33 | 218.5 |  | 202.6 | 214 | 225.33 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.74 (53) | Superhost; 2 bath |  |  |  |  |  |  |  |  |  |  | 312.2 | 199 | 205.33 |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | Garden |  | 152.5 |  |  |  |  |  |  |  |  |  | 135.67 | 154.67 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed | 216 | 202 | 233.5 | 208.67 | 210.33 | 221.33 | 224 | 226.67 | 210.75 | 165.22 | 224.8 | 208.67 | 208.67 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5 (10) | Lift; skyline view |  |  |  |  | 450.67 | 447.67 |  |  |  |  |  | 419.33 | 430.33 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking |  |  | 240.5 | 238.33 |  |  |  |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5 (13) | Lift/paid parking/balcony/panoramic view; Guest favourite; free cancellation |  |  |  |  | 363.67 | 348 |  |  |  |  |  |  | 316.67 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking; garden |  | 152.5 |  |  |  |  |  |  |  |  |  | 141.67 | 161.67 |
| **Comp median (n)** | | | 4.76 (13) | | **216.00** (1) | **152.50** (3) | **240.50** (3) | **237.00** (4) | **236.67** (6) | **293.50** (4) | **236.67** (3) | **226.50** (2) | **214.62** (2) | **165.22** (1) | **224.80** (3) | **211.33** (8) | **217.00** (8) |
| Wider 2-bed sample median (n) | | | | | 301.25 (10) | 210.00 (33) | 248.75 (42) | 239.67 (47) | 262.17 (46) | 281.00 (43) | 278.83 (38) | 300.00 (37) | 265.75 (36) | 265.67 (39) | 294.40 (43) | 217.00 (52) | 220.17 (54) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.7 (10)** | | 6 | | | not returned | not returned | not returned | **215.00** | **234.00** | **251.33** | **261.33** | **258.33** | **247.00** | **188.44** (strike £1,968 -> £1,696) | not returned | **204.33** | **200.67** |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | 6 | | | not returned | not returned | not returned | **233.67** | **254.67** | **265.67** | **269.33** | **258.33** | **253.25** | **201.00** (strike £2,102 -> £1,809) | not returned | **204.33** | **200.67** |

#### P20
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 20 Nov-23 Nov | 20 Nov-24 Nov | 21 Nov-24 Nov | 22 Nov-24 Nov | 24 Nov-26 Nov | 5 Dec-6 Dec | 14 Dec-17 Dec | 14 Dec-19 Dec | 16 Dec-19 Dec | 26 Dec-27 Dec | 26 Dec-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Houseboat, marina view; Superhost; Guest favourite |  | 281.33 | 279.25 | 281 |  |  |  | 282.33 | 278.6 | 282.33 |  | 282.25 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Terrace; free parking; Guest favourite; free cancellation |  |  |  |  |  |  |  |  |  |  |  | 352 |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking |  |  |  |  |  |  |  |  |  |  |  |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (57) | Lift; 2 bath |  |  |  |  |  |  |  |  |  |  |  | 447.75 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/paid parking/river view/balcony; 2 bath |  | 396.67 | 401 | 410.33 |  |  |  | 382.67 | 378.6 | 382.67 |  | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony; 12th-floor skyline |  |  |  |  | 274 | 294 |  | 324 | 334.4 | 341.33 | 494 | 417 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking |  |  |  |  |  |  |  | 261.67 | 249.8 | 268.67 |  |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/paid parking/balcony |  | 345 | 347.5 | 357 |  |  |  | 333.33 | 327.8 | 333.33 |  | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/paid parking/balcony |  |  |  |  |  |  |  | 301.33 | 313 | 325.33 |  | 409.5 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/Thames view; Superhost; free cancellation |  |  |  |  |  |  |  | 229.67 |  |  |  |  |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking; townhouse |  |  |  |  | 288.5 | 288.5 |  | 250 |  |  |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5 (25) | Balcony; Superhost; Guest favourite | 310 | 290 | 270 | 276.67 | 290 | 270 |  | 306 | 291.8 | 309 |  | 360 |
| **Comp median (n)** | | | 4.80 (17.5) | | **310.00** (1) | **317.50** (4) | **313.38** (4) | **319.00** (4) | **288.50** (3) | **288.50** (3) | - (0) | **301.33** (9) | **313.00** (7) | **325.33** (7) | **494.00** (1) | **370.12** (8) |
| Wider 2-bed sample median (n) | | | | | 507.00 (21) | 396.67 (27) | 401.00 (27) | 402.67 (30) | 308.50 (35) | 295.00 (38) | 693.00 (12) | 280.67 (40) | 278.00 (51) | 309.00 (55) | 633.00 (17) | 422.50 (47) |
| **Ours 3547481 (Airbnb 1791529331262420081) 5 (1)** | | 6 | | | not returned | **281.67** | **265.50** | **269.00** | **295.50** | not returned | **557.00** | **280.67** | **275.80** | **306.33** | **663.00** | not returned |

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### What changed since 18 Nov: the twins are now identical on 19 open nights
The 18 Nov 12:15Z refresh changed the twins. The only logged edits are Reyhan's 27 Nov / 1 Dec overrides (next subsection).
- **3090701 dropped to exactly 3064856's price on 19-21 Dec and 3-18 Jan.** That is 19 identical open nights; on 18 Nov only 17 Jan was identical.
  - Jan: 3090701 172/171/171 (5-7 Jan) vs 182/181/182 on 18 Nov, about -5.5%.
  - 19-21 Dec: 256/237/239 -> 243/224/227.
  - On Airbnb the two listings now show **the same all-in price**: £258.33 (19-22 Dec), £204.33 (5-8 Jan) and £200.67 (14-17 Jan).
  - The twin rule (policy `listing_facts.P13.twin_listings`) says the twins must never be identical, or Airbnb may block them as duplicates. This is the main P13 point today.
- **13-18 Dec:** the 10% gap with 3090701 cheaper is unchanged (219/215/213/218/224/237 vs 243/239/237/242/249/264).
  - 3064856 18 Dec rose 239 -> 264, and 3090701 18 Dec fell 252 -> 237.
  - Yesterday's supported +6% on 3090701 13-15 Dec was **not applied**: PriceLabs is 219/215/213 vs 220/215/213.
- **27 Nov / 1 Dec (Reyhan, 18 Nov 12:14Z, logged):** +25% with min 1 on both twins, the 3090701 copy being "copied from parent".
  - Policy `intentional_overrides.P13` says "1 Dec +50% with 1-night minimum is intentional". The +25% therefore goes to **Corentin as confirm or revert**.
  - Prices: 3064856 1 Dec 278 -> 232, 27 Nov 304 -> 272; 3090701 1 Dec 194 -> 163, 27 Nov 213 -> 191. That leaves a 30% twin gap on those nights.
  - Raw `user_price` (279 / 327) is above `price` (232 / 272); the reason is NOT CHECKED (PriceLabs auditor). I did not price comps for these single nights.
- **Airbnb factor:** 0.765 on nights 28 days out or less and 0.90 beyond (13-16 Dec 0.765, 16-19 Dec 0.813, 18-21 Dec 0.90). This is the same pattern as 18 Nov; the source is still NOT CHECKED.

### 13-21 Dec (9 open nights): +7% on 3090701 13-15 Dec; -3% on 3064856 19-21 Dec; hold the rest
| Stay | Ours 3090701 / 3064856 (18 Nov) | Comp median (n) | Comp pctl / vs median | vs line 3090701 / 3064856 | Wider pctl (n, median) | PL avg 3090701 / 3064856 vs mkt P50 (mkt occ) | Factor | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 13-15 Dec (2 n, the twin-gap nights) | below min 3 / below min 3 | 240.5 (3) | comps only | | (42, 248.75) | 217.0 / 241.0 vs 220.0 (30%) | | |
| **13-16 Dec** | **215.00 / 233.67** (215.33 / 233.67) | 237.0 (4) | **P25 / -9.3%** ; P25 / -1.4% | **-7.0%** / +16.0% | P28 / P36 (47, 239.67) | 215.7 / 239.7 vs 219.7 (27%) | 0.765 | raise +10% |
| 16-19 Dec | 234.00 / 254.67 (248.67 / 258.33) | 236.67 (6) | P17 / -1.1% ; P67 / +7.6% | +1.3% / +26.6% | P26 / P46 (46, 262.17) | 226.3 / 251.7 vs 235.7 (31%) | 0.813 | raise +10% |
| 17-20 Dec | 251.33 / 265.67 (270.00 / 269.67) | 293.5 (4, including 2 lift/view premium comps at 448 / 348) | P50 / -14.4% ; P50 / -9.5% | -12.3% / +6.5% | P35 / P44 (43, 281) | 234.7 / 252.0 vs 242.3 (39%) | 0.858 | raise +10% |
| 18-21 Dec | 261.33 / 269.33 (273.67 / 262.00) | 236.67 (3) | P100 / +10.4% ; P100 / +13.8% | +13.1% / +33.9% | P34 / P47 (38, 278.83) | 234.7 / 243.7 vs 243.0 (43%) | 0.90 | raise +5% |
| **19-22 Dec (30-day default)** | **258.33 / 258.33 (identical)** | 226.5 (2) | P100 / +14.1% (both) | +16.9% / +34.2% | P32 (37, 300) | 231.3 / 231.3 vs 245.0 (46%) | 0.90 | raise +5% |
| 18-22 Dec (up to the Christmas booking) | 247.00 / 253.25 (259.00 / 247.25) | 214.62 (2) | P100 / +15.1% ; +18.0% | | P36 / P47 (36, 265.75) | 232.8 / 239.5 vs 243.0 | 0.90 | raise +5% |
| 13-22 Dec (all 9 nights, weekly -15%) | 188.44 / 201.00; strike £1,968 -> £1,696 / £2,102 -> £1,809 | 165.22 (1) | n=1 | | P8 / P13 (39, 265.67) | 228.3 / 242.0 vs 233.4 (35%) | | numbers only |

- **3090701 13-15 Dec: +7% supported** (PriceLabs about 234/230/228 instead of 219/215/213).
  - On 13-16 Dec it sits 7.0% under its line (237.0 x 0.976 = £231.31) at P25 of 4 comps, and those comps were flat vs 18 Nov.
  - The full move to the line would be about +10% on PriceLabs, but that would make 3090701 equal to 3064856 (243/239/237). The twin rule caps it at about +7%, which leaves a gap of about 4%.
  - Market P50 is 220 and market occupancy 27-30%, so the market neither argues for nor against.
- **3064856 13-16 Dec: hold.** It is P25 of comps and -1.4% vs median, but 16% over its rating line.
- **3064856 19-21 Dec: about -3% supported** (243/224/227 -> about 236/217/220), to break the identical twin prices.
  - 3064856 is P100 of a thin kept set (n=2, +14.1%) and 34% over its rating line.
  - Raising 3090701 instead is not supported: it is also P100, at +14.1%.
  - Caveat: the wider sample puts both at P32 (median £300), and PriceLabs is 6% under market P50 245. So this is a twin-rule fix, not a market call.
- **16-18 Dec: hold.** 3090701 is at its line (+1.3% on 16-19 Dec). The 17-20 Dec median is lifted by two lift/skyline comps; the like-for-like comps 1568189670839493789 and 1014671215040555613 are at £239 and £221.
- **The 9-night weekly discount matches policy:** (1,968 - 150) x 0.85 + 150 = £1,695.30, and Airbnb shows £1,696.
- `recommend` returns +5% to +10% on the occupancy lead (+26 points over 30 days). The like-for-like price evidence supports only the moves above.

### January twins: +3% on 3090701 (3-18 Jan); hold 3064856
- **5-8 Jan:** both twins £204.33. On 18 Nov they were £213.67 / £205.00.
  - P38 of 8, -3.3% vs median 211.33.
  - Lines: 3090701 £206.27 (-0.9%); 3064856 £179.63 (+13.8%).
  - PriceLabs 171.3 vs market P50 203.7 (-16%). Market occupancy 16%.
- **14-17 Jan:** both twins £200.67. On 18 Nov they were £209.00 / £201.00.
  - P25 of 8, -7.5% vs median 217.0.
  - Lines: 3090701 £211.79 (-5.3%); 3064856 £184.45 (+8.8%).
  - PriceLabs 167.3 vs market P50 208.3 (-20%). Market occupancy **12%**.
- **Supported: +3% on 3090701 for 3-18 Jan, 3064856 unchanged.**
  - That puts 3090701 at or just under its line on both stays and restores a gap of about 3%. On 18 Nov the gap was 5-6% with 3090701 dearer, and I said hold.
  - With market occupancy at 12-16%, the evidence does not support more, despite `recommend`'s +10%.

## P20 Waterford Court, 2-bed (Airbnb 1791529331262420081, 5.0 from 1 review, "New" in search; Airbnb now shows 6 guests, see above)

### What changed since 18 Nov
**Reyhan's overrides (18 Nov 12:17:39Z and 12:17:57Z, logged; `get_listing_date_overrides` confirms them):**
- **5 Dec: +100%, min 1.** PriceLabs/Smoobu went 265 (min 3, `unbookable`) -> **531** (min 1, bookable). Airbnb 1 night is **£557** all-in.
- **26 Dec: +100%, min 1** (replacing the 4 Nov -5%). It went 272 (min 4, `unbookable`) -> **569** (min 1). Airbnb is **£663**.
- So yesterday's min-1 fix for both orphans is done, at double the price.

**The refresh (12:20Z):**
- 20-24 Nov: 317/331/278/274 -> **334/282/292/284**. The 20-24 Nov total is unchanged at about £1,192, but 21 Nov is down 15%. Min stay is 3/3/2/2.
- 14-18 Dec: 297/300/302/332/311 -> 299/302/303/332/314 (±1%).

Column key: "Line" = comp median x 0.85. PriceLabs vs market uses the 1-3 BR compset (mkt 19 Nov), which understates a 2-bed P50.

| Stay | Ours 19 Nov (18 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n, median) | PL avg / mkt P50, P75, P90 (mkt occ) | Factor | `recommend` (horizon) |
|---|---|---|---|---|---|---|---|---|
| 20-22 Nov (next Fri-Sun) | below min 3 | 310.0 (1) | comps only | | (21, 507) | 308.0 / 217 (57%) | | |
| 20-23 Nov | 281.67 (286.33) | 317.5 (4) | P25 / -11.3% | +4.4% | P22 (27, 396.67) | 302.7 / 216, 282, 379 (53%) | 0.765 | fix-listing 0% (7 d: 29% vs 50%) |
| **20-24 Nov (requested)** | **265.50** (267.00) | **313.38 (4)** | **P0 / -15.3%** | **-0.3%** | P11 (27, 401) | 298.0 / 215, 280, 375 (51%) | 0.765 | fix-listing 0% |
| 21-24 Nov | 269.00 (275.33) | 319.0 (4) | P0 / -15.7% | -0.8% | P13 (30) | 286.0 / 214 (49%) | 0.766 | fix-listing 0% |
| **22-24 Nov (min 2)** | **295.50** (286.50) | 288.5 (3) | **P100 / +2.4%** | **+20.5%** | P43 (35, 308.5) | 288.0 / 213, 277 (45%) | 0.766 | **lower -7%** |
| 24-26 Nov (midweek default) | 25 Nov booked | 288.5 (3) | comps only | | (38, 295) | | | |
| **5 Dec (orphan, 1 night)** | **557.00** (unbookable) | none returned | n=0 | | **P25** of 1-night 2-beds (12, £693) | **531** / 227, 296, **424** (50%) | 0.766 | numbers only |
| 14-17 Dec | 280.67 (279.33) | 301.33 (9) | P33 / -6.9% | +9.6% | P47 (40, 280.67) | 301.3 / 217 (23%) | 0.765 | raise +10% (30 d) |
| 14-19 Dec (all 5 open nights) | 275.80 (283.40) | 313.0 (7) | P14 / -11.9% | +3.7% | P47 (51, 278) | 310.0 / 222 (24%) | 0.793 | raise +10% |
| 16-19 Dec | 306.33 (320.00) | 325.33 (7) | P29 / -5.8% | +10.8% | P47 (55, 309) | 316.3 / 226 (26%) | 0.81 | raise +10% |
| **26 Dec (orphan, 1 night)** | **663.00** (unbookable) | **494.0 (1)** | **P100 / +34.2%** | | P53 of 1-night 2-beds (17, £633) | **569** / 254, 329, **452** (34%) | 0.902 | raise +5% (60 d) |
| 26-30 Dec (context) | 27 Dec booked | 370.12 (8) | comps only | | (47, 422.5) | | | |

### 20-24 Nov (arrival tomorrow): hold the 4-night price, -7% on 22-24 Nov
- **t-p20-delivery is still open, and the arrival is TOMORROW.**
  - Policy `listing_facts.P20.block_20_21_nov` says 20-22 Nov is the delivery block.
  - Yet PriceLabs has 20-21 Nov open (min 3, 334/282). Airbnb returned and priced **20-23 Nov (£845)**, **20-24 Nov (£1,062)** and 21-24 Nov (£807) at 07:20Z today.
  - This is for Corentin to confirm. If the block is real, these nights should not be sellable.
- **If 20-24 Nov stays sellable: hold.** It is P0 / -15.3% vs median, but exactly on the 1-review line (-0.3%).
  - The comp median rose from 288.25 to 313.38 only because the cheap comps 790672189611831800 and 1684834789445533643 are no longer returned. The same comps are flat or 2-3% lower vs 18 Nov.
  - `recommend` on the 7-day horizon (29% vs 50%) at P0 says fix-listing, not price: one review is the constraint.
- **22-24 Nov: about -7% supported** (PriceLabs 292/284 -> about 272/264). It is P100 of 3 comps (+2.4%) and 20.5% over the line; `recommend` (7 d) says lower -7%.
  - The min 2 on these nights is Reyhan's edit against the policy min 3 to 30 Nov. That stays **confirm or revert** for Corentin; the -7% applies only if the nights stay open.

### December
- **14-19 Dec: hold (0%).** It sits at P14-P33, -6% to -12% vs median and +4% to +11% over the line.
  - The 16-19 Dec drop (-4.3%) is the ≤28-day factor now reaching 16 Dec. Comps were flat.
  - Market occupancy is 23-26%. `recommend`'s +10% rests on the 30-day lead, not on these nights.
- **5 Dec (Reyhan's +100%, min 1): numbers only, no change argued.**
  - No kept comp was returned for 5-6 Dec.
  - Our £557 all-in is **P25** of the 1-night 2-bed sample (n=12, median £693), so Airbnb does not show it priced out.
  - But Smoobu 531 is above market **P90 424** (P50 227, market occupancy 50%).
  - With no like-for-like comp, neither direction is supported. Judgement (not a function output): if it is unsold around 28 Nov, step down toward market P75-P90 (£296-424).
- **26 Dec (Reyhan's +100%, min 1): about -33% supported** (Smoobu 569 -> about **£382**).
  - The only kept comp returned, 1684834789445533643 (lift/balcony, 12th-floor skyline, 4.39 from 18 reviews), is £494 all-in, and we are +34.2% above it.
  - Smoobu 569 is above market P90 452 (P50 254, occupancy 34%).
  - Matching that comp needs (494 - 150) / 0.902 = **£381**, which equals PriceLabs' own `uncustomized_price` of 382 for 26 Dec. In override terms that is about +40% instead of +100%.
  - It is thin: n=1, and the wider 1-night sample puts us at P53 (median £633). Because the edit is Reyhan's and policy does not settle it, this is evidence for Corentin, not a standing-decision conflict.
- No other December nights are open: 1-4 Dec, 6-13 Dec, 19-25 Dec and 27 Dec-2 Jan are booked.

## P10 Hanger Lane, 1-bed (3318177)
- Handed back: the last night was 18 Nov (policy `handbacks.P10`). All 60 nights in `prices.csv` 19 Nov are unavailable.
- No positioning, and nothing proposed.

## P02 Ladbroke Grove, P03 Bayswater
- Blocked on purpose (policy `intentional_blocks`). All 60 nights are unavailable in `prices.csv` 19 Nov.
- No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
- Not in PriceLabs or Smoobu (no rows in `listings.csv` or `prices.csv` 19 Nov).
- Own price, percentile, rating gap and premium: **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (AWS WAF challenge on 19 Nov; not retried or bypassed). This covers comps and our displayed Booking.com prices. Comp cancellation policy comes only from Airbnb "Free cancellation" pills.
2. **Twin prices made identical at the 18 Nov 12:15Z refresh** (19 open nights, 19-21 Dec and 3-18 Jan). There is no log entry for it: the only logged P13 edits are the 27 Nov / 1 Dec +25%. Cause NOT CHECKED (PriceLabs auditor).
3. P13 27 Nov / 1 Dec: raw `user_price` 327 / 279 is above the pushed `price` 272 / 232. Not explained.
4. **P20 Airbnb guest count 6 vs policy max 4:** I did not check who changed it or whether Booking.com changed too.
5. **Airbnb ≤28-day 15% factor** (0.765) on P13 and P20: the source is inferred from prices, and the Smoobu Airbnb rule is NOT CHECKED.
6. **Thin comp coverage:**
   - P13: n=1-3 on 20-22 Nov, 24-26 Nov, 13-15 Dec, 18-21 Dec, 19-22 Dec, 18-22 Dec and 13-22 Dec.
   - P20: n=0-1 on 20-22 Nov, 5 Dec and 26 Dec. The 26 Dec -33% rests on one comp.
   - Only unsold comps can be priced, which biases peak medians.
   - P20 789954794593691037 was found only by the activity probe (6th day).
7. The P20 market percentiles use the 1-3 BR compset, which understates a 2-bed P50. P20 has 1 review, so the 0.85 line is judgement.
8. P13's Airbnb-to-Smoobu id mapping is still "likely" (policy). P16, P18 and P19 have no data; P02, P03 and P10 have no sellable nights.
