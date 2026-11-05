# Competitor positioning: WEST + HERTS (D = 2026-11-05)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** I read `data/policy.json` first. PriceLabs calls were read-only, one at a time except the two override reads, which I ran together. Both returned 200.
1. `get_user_logs`, listing log 4-5 Nov for 3064856, 3090701, 3547481 and 3318177: 12 entries, **all Reyhan's, 4 Nov 01:26-01:30Z**. **Nothing has changed since 4 Nov 06:00Z** on P13, P20 or P10.
2. `get_listing_date_overrides` for 3064856 and 3547481, 5 Nov-31 Dec. Both are the same as described on 4 Nov.
3. `get_neighbourhood_data` (detail) for 3064856: 2 BR n=117, median 222. Saved to `scratchpad/west05/dl/neigh_3064856.json`.
4. `get_neighbourhood_data` (detail) for 3547481: 2 BR n=153, median 249. Saved to `scratchpad/west05/dl/neigh_3547481.json`.

**Smoobu** (GET only): `/rates` for 3064856, 3090701 and 3547481, 5 Nov-31 Dec. The Smoobu rate equals the PriceLabs `price` field in `raw/prices_*.json` on every night. `reservations.csv` 5 Nov has **no change for P10, P13 or P20** against 4 Nov.

**Airbnb:** public search pages and listing pages, checked 2026-11-05 with plain `curl` and default headers. No bot check was met. **Booking.com: NOT CHECKED.**

**Method** (same as 3 and 4 Nov):
- Search: 4 guests, entire home, at least 2 bedrooms. Each stay used a ~1.3 km box around the PriceLabs coordinates plus a ~0.2 km box around each comp.
- Price basis: Airbnb all-in total ÷ nights. Cleaning (£150 on ours) and Airbnb fees are included; taxes are not shown separately. Comps and ours use the same basis. Stays of 5+ nights are after length-of-stay discounts.
- Comp cancellation policy: NOT CHECKED.

**Comp sets:**
- **P13:** the same 11 ids as 4 Nov. All are active (each returned on at least one stay today).
- **P20:** **one comp replaced.** 1384811870668527117 (4.37, 38 reviews, 0.65 km) was not returned on any of the 12 stays or on two extra 7-night probes (13-20 Nov, 8-15 Dec). It was returned for 10-14 Jan 2027 (£1,267). So it is **not bookable in the next 60 days**, which makes it inactive under the comp rules.
  - Its replacement is **6488364**: 0.61 km, sleeps 4, 2 bed, 4.5 (16), lift, paid parking, balcony. It is the nearest unused like-for-like (also paid parking) and was returned on 7 of 12 stays.
  - The other 11 comps are unchanged and active.

**Occupancy** (Smoobu `reservations.csv` 5 Nov, cancelled excluded; market from `kpi_pack` 5 Nov):

| Listing | 14 days | 30 days (5 Nov-4 Dec) | 60 days | Market 30 / 60 | Lead 30 / 60 |
|---|---|---|---|---|---|
| P13 | 8/14 | 22/30 = **73.3%** | 31/60 = **51.7%** | 42% / 38% | **+31 / +14 pts** |
| P20 | 4/14 | 14/30 = **46.7%** | 14/60 = **23.3%** | 36% / 30% | **+11 / -7 pts** |

- P20's 60-day lead fell from -5 to -7 pts because the window rolled forward one day with no new booking.
- That puts `recommend` at **fix-listing** (conversion/visibility, not price) on every December stay. Yesterday it was borderline hold.

**Rows written** (both files already existed, copied forward by another agent):
- `data/snapshots/2026-11-05/comps.csv`: appended **298 rows** under `flock .comps.csv.lock`. P13 is 11 comps × 14 stays; P20 is 12 × 12.
  - Filter on `source` containing "checked 2026-11-05" and "comp-west". `date` is the check-in; the full stay is in `source`.
- `channel_checks.csv`: appended **34 rows** for our three Airbnb listings under `.channel_checks.csv.lock`.

**Recompute check:** `snapshot.load('2026-11-05')` then `comp_summary` reproduces the tables:
- P13 11-13 Nov: n=4, median 207, P100 / +6.0% (3090701) and P0 / -1.7% (3064856).
- P20 13-16 Nov: n=7, median 290, P14 / -23.0%.
- P20 6-9 Nov: n=4, median 317.5, P0 / -34.1%.

## Comp tables (Airbnb all-in £/night, 4 guests, checked 2026-11-05)
- A figure in brackets is the same comp on the same stay on 4 Nov, shown where it moved by £1 or more.
- A blank cell means the comp was not returned for that stay (booked or min-stay).

#### P13

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6-8 Nov | 8-10 Nov | 10-12 Nov | 11-13 Nov | 8-13 Nov | 12-13 Nov | 17-18 Nov | 27-28 Nov | 1-2 Dec | 7-9 Dec | 11-13 Dec | 18-20 Dec | 23-26 Dec | 18-26 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.82 (11) | Garden view/balcony |  |  | 244.5 (255) |  |  |  |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | Paid parking on premises/Guest favourite |  | 207 |  | 207 |  |  |  |  |  | 269.5 (274) |  |  |  |  |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking on premises |  | 206 (208) | 206 (208) | 206 (208) | 174.8 (176.8) |  |  |  |  | 237.5 |  |  |  |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  |  |  |  |  |  | 257 (258) | 277 | 269 | 232 | 201.88 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.78 (49) | Superhost | 185.5 (218.5) | 171 (180) | 190.5 (192) | 207 (200) | 156 (157.4) |  |  |  |  |  |  |  |  |  |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed |  |  |  |  |  |  | 185 (200) |  |  |  |  |  |  |  |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  |  |  |  |  |  |  |  |  | 245 (250) | 282 (283.5) | 273 (276) | 245.67 | 188.75 (190.38) |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift |  |  |  |  |  |  |  |  |  | 433.5 |  | 450 |  |  |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking on premises |  | 217 | 217 | 217 | 199 |  |  |  |  | 259 |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | Lift/Paid parking on premises/balcony/Guest favourite |  |  |  |  |  | 403 |  | 394 | 423 |  |  | 331.5 |  |  |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking on premises |  |  |  |  |  |  | 185 (200) |  |  |  |  |  |  |  |
| **Comp median (n)** | | | 4.78 (13) | | **185.5** (1) | **206.5** (4) | **211.5** (4) | **207** (4) | **174.8** (3) | **403** (1) | **185** (2) | **394** (1) | **423** (1) | **258** (6) | **279.5** (2) | **302.25** (4) | **238.83** (2) | **195.31** (2) |
| Wider 2-bed sample median (n) | | | | | 240.5 (6) | 219 (16) | 234.5 (16) | 226.25 (18) | 233.6 (24) | 312.5 (2) | 185 (5) | 315 (4) | 456.5 (2) | 259 (19) | 331 (16) | 311.25 (12) | 310.67 (21) | 279.12 (17) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.67 (9)** | | | | | not returned | **212** | **217** | **219.5** | **178.6** (strike £976 -> £893) | not returned | **316** | **336** | **326** | **264** | **288.5** | **282** | **256.67** | **193.75** (strike £1,797 -> £1,550) |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | | | | not returned | **197** | **201** | **203.5** | **162.2** (strike £884 -> £811) | not returned | **298** | **405** | **391** | **253.5** | **277** | **270.5** | **245.33** | **184.12** (strike £1,707 -> £1,473) |

#### P20

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6-9 Nov | 10-13 Nov | 13-16 Nov | 16-18 Nov | 16-19 Nov | 20-23 Nov | 22-25 Nov | 5-8 Dec | 11-14 Dec | 18-21 Dec | 21-24 Dec | 23-27 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost | 281.67 | 281 (283) | 281 |  | 281 | 281 (283.33) | 281 | 281 | 281 | 281 | 281 | 279 (280.75) |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises |  |  | 283.67 (300.67) |  | 282 (299.33) |  |  |  | 267 (270.67) | 255.33 (267.67) |  |  |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises |  |  |  | 403.5 | 393.33 | 393.33 |  |  |  |  | 393.33 | 388.5 |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (55) | Lift |  | 341.67 (340.67) | 335.33 (337.33) |  | 317.33 (330.33) | 339.67 | 343.33 (340.67) | 377.33 (379.33) | 409.33 (406.33) | 387.33 (385.67) | 407 (405) | 400.5 (401.5) |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | 396.67 (410.33) | 424 | 382.67 |  | 382.67 | 382.67 | 382.67 | 382.67 | 382.67 | 382.67 | 382.67 | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony |  |  |  |  |  | 338.67 (353) | 323 (337) | 392.33 | 463.67 | 479 | 446.67 | 505.75 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises |  |  |  | 281.5 | 261.67 | 276.33 | 261.67 |  | 276.33 |  | 261.67 | 262.5 |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony | 345 (357) | 368.67 | 333.33 |  | 333.33 | 333.33 | 333.33 | 333.33 | 333.33 | 333.33 | 333.33 | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/Paid parking on premises/balcony (replaces 1384811870668527117, inactive next 60 days) |  | 306.33 |  |  |  | 282.67 | 272 |  | 358.67 | 365.67 | 349.33 | 368.5 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost |  | 177.33 (182) | 192 (197.33) | 215 | 202.33 | 214.67 (219.67) | 222.33 (220.33) |  |  |  | 241.33 | 240.25 (242.75) |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises |  |  |  | 264 | 250 |  | 250 |  | 250 | 250 |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 290 | 250 | 290 | 270 | 250 | 290 | 263.33 | 283.33 | 290 | 312 | 370 | 360 |
| **Comp median (n)** | | | 4.8 (18) | | **317.5** (4) | **306.33** (7) | **290** (7) | **270** (5) | **281.5** (10) | **311.66** (10) | **276.5** (10) | **355.33** (6) | **311.66** (10) | **333.33** (9) | **359.66** (10) | **364.25** (10) |
| Wider 2-bed sample median (n) | | | | | 285.84 (10) | 293.16 (16) | 283.67 (15) | 264 (17) | 261.67 (23) | 287 (18) | 263.33 (21) | 355.33 (12) | 339.33 (18) | 333.33 (17) | 359.66 (20) | 380.25 (19) |
| **Ours 3547481 (Airbnb 1791529331262420081) New, 0 reviews** | | | | | **209.33** | not returned | **223.33** | **244.5** | not returned | **256.67** | **267.33** | **301.67** | **289** | **289.67** | **308.33** | **300.5** |

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### What changed since 4 Nov 06:00Z
**PriceLabs edits: none** (`get_user_logs`). `get_listing_date_overrides` still shows:
- 8-12 Nov -7% min 2
- 17 Nov +35% min 1
- 27 Nov +50% min 1
- 1 Dec +50% min 1 (intentional per policy)
- 7-20 Dec -5% min 2
- 21-26 Dec -5% min 3

Base is still 250 / 250 (`listings.csv`; PriceLabs recommends 237 / 236).

**Pushed prices barely moved** (Smoobu `/rates` = PriceLabs `price`):

| | 8 Nov | 9 Nov | 10 Nov | 11 Nov | 12 Nov |
|---|---|---|---|---|---|
| 3064856 pushed, 5 Nov (4 Nov) | 159 (160) | 159 (158) | 162 (162) | 167 (166) | **168** (170) |
| 3064856 "Your Price" `user_price`, 5 Nov (4 Nov) | 160 (140) | 158 (151) | 162 (160) | 166 (160) | 170 (159) |
| 3090701 pushed, 5 Nov (4 Nov) | 179 (180) | 179 (178) | 182 (182) | 188 (187) | 189 (191) |
| 3090701 "Your Price", 5 Nov (4 Nov) | 160 (155) | 160 (155) | 160 (160) | 166 (165) | 170 (190) |

**Your Price is moving without edits:**
- On 3064856 it rose to meet the pushed price, even though the -7% override is unchanged.
- In December, 3064856's Your Price fell about 6% with no logged edit (18 Dec 230 → 216, 23 Dec 241 → 223). The pushed price was unchanged (215 / 225).
- The cause was NOT CHECKED (PriceLabs agent).

**Conflict still open:** the 8-12 Nov -7% override against policy `price_changes` (24 Oct: 0%). **a-p13-record: not fixed.**

### Price percentile, rating, review gap, supported positioning
**Rating and reviews:**
- Comp median **4.78** with **13** reviews. No comp gained a review today.
- 3090701: **4.67 (9)**, -0.11 vs the median and 4 reviews behind. `quality_premium` = **-0.044**.
- 3064856: **4.31 (13)**, -0.47 vs the median and level on reviews. `quality_premium` = **-0.15** (capped).

**How to read the table:**
- `recommend` uses the comp percentile where n ≥ 3. Where n < 3 it uses the market percentile (marked mkt).
- "PL vs P50" compares the pushed price with the PriceLabs 2-3 BR daily market P50 (`neigh_3064856.json`, averaged over the stay nights).

| Stay | Listing | Airbnb 5 Nov | Comp median (n) | Comp pctl / vs median | Wider pctl (n) | PL vs P50 | `recommend` |
|---|---|---|---|---|---|---|---|
| 8-10 Nov (Sun-Tue) | 3090701 | **212** | 206.5 (4) | P75 / **+2.7%** | P31 (16) | 179 vs 203.5 (-12%) | raise +5% |
| | 3064856 | **197** | 206.5 (4) | P25 / **-4.6%** | P6 | 159 vs 203.5 (-22%, below P25 167) | raise +10% |
| 10-12 Nov (Tue-Thu midweek) | 3090701 | **217** | 211.5 (4) | P50 / **+2.6%** | P38 (16) | 185 vs 205 (-10%) | raise +10% |
| | 3064856 | **201** | 211.5 (4) | P25 / **-5.0%** | P19 | 164.5 vs 205 (-20%, below P25 165) | raise +10% |
| 11-13 Nov (incl. 12 Nov) | 3090701 | **219.5** | 207 (4) | P100 / **+6.0%** | P50 (18) | 188.5 vs 207.5 (-9%) | raise +5% |
| | 3064856 | **203.5** | 207 (4) | P0 / **-1.7%** | P11 | 167.5 vs 207.5 (-19%, below P25 171) | raise +10% |
| 8-13 Nov (5n, LOS disc.) | 3090701 | 178.6 | 174.8 (3) | P67 / +2.2% | P12 (24) | 183.4 vs 205.4 (-11%) | raise +10% |
| | 3064856 | 162.2 | 174.8 (3) | P33 / -7.2% | P4 | 163 vs 205.4 (-21%) | raise +10% |
| 17 Nov (1n orphan) | 3090701 | 316 | 185 (2) | n=2 | P80 (5) | 217 vs 206 (+5%) | mkt: raise +10% |
| | 3064856 | 298 | 185 (2) | n=2 | P80 | 193 vs 206 (-6%) | mkt: raise +10% |
| 27 Nov (1n) | 3090701 | 336 | 394 (1) | n=1 | P75 (4) | 242 vs 238 (+2%) | mkt: raise +10% |
| | 3064856 | 405 | 394 (1) | n=1 | P100 | **333 vs 238 (+40%, above P75 301)** | mkt: raise +5% |
| 1 Dec (1n) | both | 326 / 391 | 423 (1) | n=1 | | 229 / 314 vs 226 | intentional (policy), no proposal |
| **7-9 Dec (30-day point)** | 3090701 | **264** | 258 (6) | P67 / **+2.3%** | P53 (19) | 210 vs 231.5 (-9%) | raise +10% |
| | 3064856 | **253.5** | 258 (6) | P33 / **-1.7%** | P42 | 198 vs 231.5 (-14%) | raise +10% |
| 11-13 Dec | 3090701 | 288.5 | 279.5 (2) | n=2 | P31 (16) | 237 vs 244 (-3%) | mkt: raise +10% |
| | 3064856 | 277 | 279.5 (2) | n=2 | P19 | 224 vs 244 (-8%) | mkt: raise +10% |
| 18-20 Dec | 3090701 | **282** | 302.25 (4) | P50 / **-6.7%** | P42 (12) | 230 vs 248.5 (-7%) | raise +10% |
| | 3064856 | **270.5** | 302.25 (4) | P25 / **-10.5%** | P33 | 217 vs 248.5 (-13%) | raise +10% |
| 23-26 Dec (Christmas) | 3090701 | 256.67 | 238.83 (2) | n=2 | **P14 (21; median 310.67)** | 229.3 vs 268 (-14%) | mkt: raise +10% |
| | 3064856 | 245.33 | 238.83 (2) | n=2 | **P5** | 217 vs 268 (-19%) | mkt: raise +10% |
| 18-26 Dec (8n, weekly) | 3090701 | 193.75 | 195.31 (2) | n=2 | **P6 (17; median 279.12)** | 228.8 vs 258.5 (-11%) | mkt: raise +10% |
| | 3064856 | 184.12 | 195.31 (2) | n=2 | **P0** | 216.1 vs 258.5 (-16%) | mkt: raise +10% |

**Next 14 days (5-18 Nov):**
- **Open nights:** 8-12 Nov and 17 Nov only.
- **Not open:**
  - 5-7 Nov are linked-booked (the Airbnb 4-8 Nov stay).
  - 13-16 Nov are booked or linked-blocked.
  - 18 Nov onwards is booked (Booking.com 18-27 Nov).
- **The default Fri-Sun (6-8 Nov) is a comp-activity check only.** One comp was returned: 1411449348357673454 at £185.5, down from £218.5 on 4 Nov after a new "Special offer".

**Comp moves on 8-13 Nov:**
- The same-comp median move is **-0.5% to -1%**.
- **1411449348357673454** (Superhost, 4.78/49) now shows a special offer: 8-10 Nov £413 → £342.
- **1568189670839493789** and **1761224847419174970** were not returned for the November stays, probably booked, so the comp n fell from 6 to 4.
- The wider 2-bed sample median is £219-235.

**Supported positioning (one line each):**
- **3090701: quality line -4% vs the comp median; the +31-pt demand lead supports sitting above it.** It sits at **+2.6% to +6.0%** (P50-P100) on the 8-13 Nov 2-night stays. `recommend` says raise +5% to +10%, so **no cut is supported**.
- **3064856: quality line -15% vs the comp median (capped).** It sits at **-1.7% to -5%** (P0-P25), about 10-13 pts above its line. The pushed price is **below market P25 on 8-11 Nov** (159-167 vs 165-167). Demand supports holding the position, and `recommend` says raise +10%.
- **8-12 Nov override vs evidence:** remove the -7% and keep everything else the same (Airbnb factor 0.765, £150 cleaning). That gives about **£206 / £222 per night** on 8-10 Nov: **-0.3% / +7.6% vs the £206.5 median**. Both are inside what `recommend` supports. **The evidence supports policy's 0%, not the -7%.** This goes to Corentin as a conflict, not as a new proposal.

### Focus: 12 Nov (a-raise-1012nov)
**Market:** 12 Nov P25 177, **P50 210**, P75 278; occupancy **43.3%**, against 36.4% on 11 Nov. That is a mild lift on the night.

**Our prices:** **3064856 £168** (down £2; below P25 177), 3090701 £189. Both still have min 2.

**Sellability and comps:**
- 13 Nov is linked-blocked / booked, so 12 Nov can only sell as the last night of an 11-13 Nov stay.
- For that stay we are at +6.0% / -1.7% vs the 4 comps.
- The only comp returned for 12-13 Nov alone was 1205241472054931937 at £403 (n=1).

**Status: not fixed.** 3064856 is £8 under the £176 target, and min 1 is not set.

**Evidence-supported level** (P50 210 × (1 + quality)): 3064856 about **£179**, 3090701 about **£201**. Both are about 6% under it today.

### Focus: Christmas (a-peak-check, P13 part)
**Settings (unchanged):**
- 18-20 Dec -5% min 2.
- 21-26 Dec **-5% min 3**.
- 27 Dec onwards: 3090701 booked (27 Dec-3 Jan), 3064856 linked-blocked.
- So **25 and 26 Dec arrivals are still impossible**: min 3 runs into 27 Dec. Not fixed.

**Position:**
- 23-26 Dec: **P14 / P5 of the wider 2-bed sample** (median £310.67, n=21; it was £288 on 4 Nov, so the market moved up). PriceLabs is **-14% / -19% vs P50 268**.
- 18-20 Dec: **-6.7% / -10.5%** vs 4 comps.
- Comps on these stays did not cut (median same-comp change 0%).

**Quality-supported 23-26 Dec PriceLabs level** (P50 268 × (1 + q)): 3090701 about **£256** vs 229 now (-10%); 3064856 about **£228** vs 217 now (-5%).

**Conclusion:** the evidence does not support the 21-26 Dec -5%. It supports removing it (`recommend`: raise +10%). No standing decision covers December prices.

### Twin listings (a-p13-twin)
**Still differentiated on Airbnb.**
- The November totals differ by 7% (8-10 Nov £424 vs £394).
- The December totals differ by about 4% (23-26 Dec £770 vs £736; 18-20 Dec £564 vs £541).
- The pushed December prices differ by £11-14 a night (for example 18 Dec 228 vs 215).
- **New today:** December "Your Price" also differs (18 Dec 229 vs 216; it was 230 vs 230 on 4 Nov), so the gap no longer depends only on the pushed-price behaviour.
- No action proposed. Per policy, keep them slightly different and never identical.

### 17 Nov, 27 Nov and 1 Dec singles
**17 Nov:**
- The 2 comps cut from £200 to £185 all-in (both sleep 7).
- Our £316 / £298 carries the full £150 cleaning on one night. Room-only Airbnb is about £166 / £148.
- Market occupancy on the night is **29%**.
- **Hold:** n=2 and the comps' cleaning split is unknown, so neither a cut nor a raise is evidenced.

**27 Nov:**
- 3064856 is at PriceLabs **333 (+40% vs P50, above P75)**. Its Airbnb £405 is level with the one comp (£394, 5.0, lift, balcony).
- **a-p13-orphan-price: unchanged.**

**1 Dec:** intentional per policy; no proposal.

### Airbnb factor (for the channel section)
Our Airbnb all-in minus £150 cleaning, divided by the pushed price:
- P13 and P20: **0.765** on stays up to 25 Nov, including 22-25 Nov at 17 days out.
- **0.90** on every December stay.
- 5+ night stays are 0.81 (P13 8-13 Nov) and 0.765 (P13 18-26 Dec) after the length-of-stay discount.

These are inferred from totals; the Smoobu/Airbnb rules screens were not read.

## P20 Waterford Court, 2-bed, max 4 (Airbnb 1791529331262420081, New, 0 reviews)

### What changed since 4 Nov 06:00Z
**PriceLabs edits: none** (`get_user_logs`). Overrides (`get_listing_date_overrides`) are unchanged:
- 6-15 Nov -5% min 3
- **16-19 Nov -5% min 2**
- 20-24 Nov -5% min 3
- 25-30 Nov -10%
- 1-20 Dec -5%
- **21-26 Dec -5%** (Reyhan, 4 Nov)

Base is still **330** (`listings.csv`), with min 200 and max 1800.

**Smoobu** (`/rates`, `reservations.csv`):
- 18-19 Nov are still blocked; 20-22 Nov are open.
- No new booking. The 10-13 Nov and 25 Nov-5 Dec stays are unchanged.

**Pushed price vs "Your Price":** on **20 Nov PriceLabs pushes 238 against a Your Price of 300 (-21%)**. On 4 Nov it pushed 300. As a result, our 20-23 Nov Airbnb total fell **£836 → £770**. The cause was NOT CHECKED (PriceLabs agent).

**Conflicts for Corentin to confirm** (all unchanged, reported not proposed):
- Base **330 vs his 350** (policy `price_24oct`).
- 16-17 Nov **min 2 vs policy min 3** (25 Oct-30 Nov).
- **Delivery block 18-20 Nov live vs 20-22 Nov in policy.** **t-p20-delivery: still open.**

### Price percentile, rating, review gap, supported positioning
**Rating and reviews:**
- Comp median **4.8** with **17.5** reviews.
- We have **no rating and 0 reviews**.
- `quality_premium` = **0.0**: no rating, so the 0-review gap is not priced by the function.
- The **-15% allowance** for a new listing used below is a judgement carried from 3 Nov. It does not come from the function.

"PL vs P50" is the pushed price against the PriceLabs 2 BR daily market P50 (`neigh_3547481.json`).

| Stay | Airbnb 5 Nov (4 Nov) | Comp median (n) | Pctl / vs median | Wider pctl (n) | PL vs P50 | `recommend` (comp) |
|---|---|---|---|---|---|---|
| **6-9 Nov (Fri-Mon, min 3; default weekend)** | **209.33** (212) | 317.5 (4) | **P0 / -34.1%** | P20 (10) | 208 vs 211.3 (-2%) | raise +10% |
| 10-13 Nov (booked) | - | 306.33 (7) | - | - | - | - |
| **13-16 Nov** | **223.33** (226) | 290 (7) | **P14 / -23.0%** | P7 (15) | 226.3 vs 212.3 (+7%) | raise +10% |
| **16-18 Nov (2n, min 2)** | **244.5** (251.5) | 270 (5) | P20 / **-9.4%** | P41 (17) | 221.5 vs 208.5 (+6%) | raise +10% |
| **16-19 Nov** | not bookable (18-19 blocked) | 281.5 (10) | - | - | - | - |
| 20-23 Nov | **256.67** (278.67) | 311.66 (10) | P10 / **-17.6%** | P17 (18) | 270 vs 213.3 (+27%) | raise +10% |
| 22-25 Nov | 267.33 (278) | 276.5 (10) | P40 / -3.3% | P52 (21) | 283.7 vs 210 (+35%) | raise +10% |
| **5-8 Dec (30-day point)** | 301.67 (284.67) | 355.33 (6) | P33 / -15.1% | P25 (12) | 279.3 vs 222.7 (+25%) | **fix-listing** |
| 11-14 Dec | 289 (296) | 311.66 (10) | P40 / -7.3% | P28 (18) | 265.3 vs 223 (+19%) | **fix-listing** |
| 18-21 Dec | 289.67 (287.67) | 333.33 (9) | P33 / -13.1% | P35 (17) | 266 vs 232.7 (+14%) | **fix-listing** |
| **21-24 Dec (Christmas)** | 308.33 (301) | 359.66 (10) | P30 / **-14.3%** | P25 (20) | 287 vs 237.7 (+21%) | **fix-listing** |
| **23-27 Dec (Christmas)** | 300.5 (297.75) | 364.25 (10) | P30 / **-17.5%** | P16 (19) | 292 vs 251.2 (+16%) | **fix-listing** |

**Comp moves:**
- Same-comp change is 0% on most stays. 27538942 (6-9 Nov) and 51380799 cut about 3%, and 1568001017881493647 cut 6% on 13-19 Nov.
- 6-9 Nov: only 4 of 12 comps are still bookable for tomorrow's arrival. All 4 are at £281+.

**Supported positioning (P20, one line each):**
- **6-9 Nov (-34%, P0) and 13-16 Nov (-23%, P14):** both are below even the -15% new-listing allowance, and `recommend` says raise +10%.
  - Caveat for 6-9 Nov: it starts tomorrow, n=4, and the PriceLabs price is already at market P50. So the gap is visibility of a 0-review listing as much as price.
  - **Supported on 13-16 Nov: about +10%**, to roughly £240 all-in (PriceLabs ×1.1 through the 0.765 factor; still about -17% vs the median).
- **16-18 Nov (-9%), 20-23 Nov (-18%) and 22-25 Nov (-3%):** inside or near the line. Hold.
  - 20-23 Nov is low only because of the 20 Nov pushed-price drop above, not because of an override.
- **December and Christmas (-7% to -18%, P30-P40):** `recommend` is now **fix-listing**. With Smoobu's 60-day lead at -7 pts, the evidence points to conversion and visibility (0 reviews), **not price**.
  - Neither a cut nor a raise is supported.
  - **Reyhan's 21-26 Dec -5% is not supported:** we are already -14% to -18% vs comps there, and the comps are flat.

### P20 dates asked for
- **6-9 Nov:** £209.33 all-in, P0 of 4 comps (median £317.5). PriceLabs 207 / 211 / 206 / 218, min 3.
- **13-16 Nov:** £223.33, P14 of 7 (median £290). PriceLabs 227 / 231 / 221, min 3.
- **16-19 Nov:** not sellable (18-19 blocked). The only option is 16-18 Nov (min 2): £244.5, P20 of 5 (median £270).
- **Christmas:** 21-24 Dec £308.33 (P30, -14%) and 23-27 Dec £300.5 (P30, -18%).
  - Min stay is 4 on 25-26 Dec and 6 on 27 Dec.
  - **A 23-27 Dec 4-night stay is bookable.**

## P10 Hanger Lane, 1-bed (3318177)
**No sellable nights.**
- `reservations.csv` 5 Nov: Airbnb 18 Oct-19 Nov is confirmed, covering every night to the handback (policy last night 18 Nov).
- PriceLabs `get_listing_prices` returned LISTING_NO_DATA today (Dispatcher). That does not affect this section, because there is nothing to price.
- No comps or positioning.

## P02 Ladbroke Grove, P03 Bayswater
Both are blocked on purpose (policy `intentional_blocks`). No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
None of the three is in PriceLabs or Smoobu (`kpi_pack` 5 Nov: `in_smoobu` false; check "No priced PriceLabs listing mapped"), so we have no price of our own.

Percentile, rating gap and premium are **NOT CHECKED**; no comps were built.

## Data gaps:
1. **Booking.com was NOT CHECKED**, for both comps and our prices; everything here is Airbnb only. Comp cancellation policies were also NOT CHECKED.
2. **Comp coverage is thin** on some stays, which lean on market or wider-sample percentiles (labelled):
   - P13: n=1-2 on 6-8 Nov, 12-13 Nov, 17 Nov, 27 Nov, 1 Dec, 11-13 Dec, 23-26 Dec and 18-26 Dec. n=3-4 on 8-13 Nov, where two comps were not returned today.
   - P20: n=4-6 on 6-9 Nov, 16-18 Nov and 5-8 Dec.
3. **Pushed price ≠ "Your Price" without logged edits:**
   - P20 20 Nov: 238 vs 300.
   - P13 3090701 8-12 Nov: +12%.
   - 3064856's Your Price moved -6% in December and +14% on 8 Nov overnight with no log entry.
   - The cause was NOT CHECKED (PriceLabs agent).
4. **The Airbnb 0.765 / 0.90 factor is inferred** from totals; the rules screens were not read.
5. **The comps' cleaning split is unknown,** so all-in gaps on 1-night stays (17 Nov, 27 Nov, 1 Dec) overstate ours.
6. **Comp replaced:** 1384811870668527117 → 6488364 (P20). 6488364 has no 4 Nov price, so its first same-comp trend is tomorrow.
7. **The Airbnb-to-Smoobu id mapping for P13 is "likely / probable"** (policy `airbnb_listings_24oct`).
8. **January-February overrides** (P13 -10%, P20 -10% / -7% with min 3-4) have no comp check.
9. **P16, P18 and P19 have no data.** P10 has no sellable nights and no PriceLabs data today.
