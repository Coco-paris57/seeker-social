# Competitor positioning: WEST + HERTS (D = 2026-11-24)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** I read `data/policy.json` first. Everything was read-only. PriceLabs: 8 read calls, all returned 200. **Protocol slip (2nd day running):** calls 2 and 3 (the two P13 override reads) went out in one message, so they ran in parallel. Both were read-only GETs and both succeeded. Every other call ran on its own.
1. `get_user_logs` (listing, 22-24 Nov) for 3064856, 3090701 and 3547481: 6 entries, **all Reyhan's 23 Nov 00:07:45-00:08:04Z edits already reported yesterday. Nothing new since then; nothing on P20.** This log covers date overrides and base/min/max only, not customization changes.
2. `get_listing_date_overrides` 3064856 (24 Nov-31 Jan) and
3. `get_listing_date_overrides` 3090701: still **identical override sets**, newest `updated_at` 23 Nov 00:08:04Z, so nothing changed.
4. `get_listing_date_overrides` 3547481: unchanged since 18 Nov 12:17:57Z. 24 Nov -5% min 2; 25-30 Nov -10% min 3; 5 Dec and 26 Dec +100% min 1; 1-20 Dec 0% min 3; 21-25 Dec -5%; 1-31 Jan -5% min 3.
5. `get_neighbourhood_data` (detail) 3547481: Nearby Listings, 1-3 BR, 271 listings. The 2 BR median is 254 (n=149).
6. `get_neighbourhood_data` (detail) 3064856: Nearby Listings, 2-3 BR, 151 listings. The 2 BR median is 221 (n=117).
7. `get_customizations` (listing) 3090701 and
8. `get_customizations` (listing) 3064856: these explain the twin split (below).

All market P25/P50/P75/P90 and market occupancy ("mkt") figures come from calls 5-6, saved at `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/cw24/mkt_P13.json` and `mkt_P20.json`.

**Own prices.** These come from `prices.csv` and `raw/prices_*.json` (24 Nov). Refreshes: twins **23 Nov 21:35:19-20Z**, P20 **24 Nov 00:31:11Z**. Neither followed a user edit (call 1).

**Occupancy for `recommend`.** This comes from `pl_kpis.csv` (24 Nov). There are no new or cancelled P13/P20 reservations vs 23 Nov (same 21 rows in `reservations.csv`).
- P13: 7 d 86% vs 59%; **30 d 63% vs 46% (+17 pts)**; 60 d 50% vs 34%.
- P20: **7 d 86% vs 52% (+34 pts)**; 30 d 77% vs 38%; 60 d 53% vs 29%.

**OTAs:**
- **Airbnb:** I read public search and listing pages on **2026-11-24 07:22-07:30Z** with plain `curl`. The scripts, boxes, comp ids and 4-adult search are the same as 18-23 Nov. There were 0 HTTP failures and no bot check.
- **Booking.com: NOT CHECKED.** One plain search at 07:23:11Z returned the AWS WAF challenge (HTTP 202). I did not retry or bypass it.

**Method** (unchanged):
- Price = Airbnb all-in total / nights, after any offer shown. **The £150 cleaning fee is included**, plus any Airbnb guest fee. Taxes are not shown separately.
- **Line** = comp median x (1 + `quality_premium`):
  - Both twins: `quality_premium(4.36, 4.78)` and `quality_premium(4.31, 4.78)` = **-0.15** (the cap).
  - P20: `quality_premium(5.0, 4.80)` = +0.08, but I keep the judgement line of comp median x 0.85, because 3 reviews prove nothing yet.
- **Factor** = (Airbnb total - £150) / the sum of the PriceLabs `price` for the same nights.

**Comp sets.** The ids are the same as 18-23 Nov (`comps.json`). None were replaced and all are active: every kept comp was returned on at least 1 stay today.
- P13 has 11 comps. The least seen was 1761224847419174970 (1 stay, 13-16 Dec).
- P20 has 12 comps. 1568001017881493647, 1316210326145130709 and 1516006875488990547 were each seen on 1 stay.
- Presence changes vs 23 Nov: 1598588327559113265 was returned for 19-21 Dec (it was not yesterday); 1516006875488990547 was not returned for 26-30 Dec (it was yesterday).

**Ratings and reviews** (listing pages, 24 Nov 07:22Z):
- Ours: 3090701 4.36 (11), 3064856 4.31 (13), P20 5.0 (3). All unchanged.
- Comps: 1205241472054931937 is now 5.0 (14), was (13); 6488364 is now 4.53 (17), was 4.5 (16). Every other comp is unchanged.
- Comp medians: P13 **4.78** (13 reviews), P20 **4.80** (17.5).
- Review gap vs comp median: 3090701 -2, 3064856 0, P20 **-14.5**.

**P20 Airbnb guest count: still 6 (6th day).** The listing page at 24 Nov 07:22Z shows `personCapacity` **6**. Policy `listing_facts.P20.max_guests` = 4 (Corentin 24 Oct, "do not propose raising it"). This stays **confirm or revert for Corentin**; I propose nothing. It does not affect the numbers: every search was run at 4 adults, and the comps sleep 4-5. Booking.com capacity: NOT CHECKED (WAF).

**Same comps vs 23 Nov:**
- P13: 53 comp pairs priced on both days, all within **±1.2%**.
- P20: 33 comp pairs, all within **±2.5%**.
- Ours:
  - **3090701 +3.0% to +4.1% on every December stay**; 3064856 +0.2% to +0.5%.
  - January: 3090701 +0.3% / +1.0%, 3064856 -0.2% / +0.5%.
  - P20: -1.2% (5 Dec) to +0.5%.

**Rows written:**
- **1,162 rows** appended to `data/snapshots/2026-11-24/comps.csv` under `flock` on `.comps.csv.lock`. The file had already been copied forward by another agent.
  - Kept comps: P13 176 (11 x 16 stays) and P20 120 (12 x 10). A blank price with "NOT RETURNED" in `source` means the comp was not returned for that stay.
  - Ours: `P13:ours` 32 and `P20:ours` 10.
  - Wider 2-bed sample: `P13:wide` 539 and `P20:wide` 285.
- **27 rows** appended to `channel_checks.csv` (our Airbnb displayed prices) under `.channel_checks.csv.lock`.
- To find these rows, filter `source` on "comp-west", "checked 2026-11-24" and "stay <ci> to <co>".

**Recompute check.** I ran `snapshot.load('2026-11-24')` + `comp_summary`, filtered by stay (n / median / our percentile / vs median). It matches the tables:

| Listing | Stay | n | Median | Our position |
|---|---|---|---|---|
| P13 3090701 | 13-16 Dec | 4 | 234.17 | P0 / -13.6% |
| P13 3090701 | 14-16 Dec | 6 | 238.75 | P33 / -5.1% |
| P13 3090701 | 16-19 Dec | 6 | 238.67 | P0 / -11.3% |
| P13 3090701 | 18-21 Dec | 3 | 232.0 | P33 / -5.2% |
| P13 3090701 | 20-22 Dec | 3 | 251.0 | P33 / -3.8% |
| P13 3090701 | 5-8 Jan | 8 | 211.33 | P38 / -2.5% |
| P13 3090701 | 14-17 Jan | 8 | 217.0 | P38 / -6.5% |
| P20 | 14-17 Dec | 9 | 290.33 | P33 / -4.6% |
| P20 | 14-19 Dec | 7 | 299.8 | P14 / -9.9% |
| P20 | 16-19 Dec | 7 | 312.67 | P29 / -4.3% |
| P20 | 26-27 Dec | 1 | 494.0 | P100 / +23.3% |

## Comp tables (Airbnb all-in £/night, 4 adults, checked 2026-11-24 07:23-07:30Z)
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- For our listings, "not returned" means booked, blocked or below the minimum stay:
  - P13: 27-29 Nov hits the 28 Nov booking. 1-3 Dec hits the 2 Dec booking. 13-15 Dec is below min 3 on 13 Dec. 19-21 Dec is below min 3 on 19 Dec. 24-26 Dec is booked.
  - P20: 24-25 Nov is below min 2 (25 Nov is a check-in). 27-29 Nov, 1-3 Dec and 24-26 Dec are booked. 26-30 Dec hits the 27 Dec booking.
- Default stays: next Fri-Sun = 27-29 Nov, midweek Tue-Thu = **1-3 Dec** (replaces 24-26 Nov, which is today), 30 days out = **24-26 Dec**. All three are booked for us on both properties, so those columns are comps only.

#### P13
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 27 Nov-29 Nov | 1 Dec-3 Dec | 13 Dec-15 Dec | 13 Dec-16 Dec | 14 Dec-16 Dec | 16 Dec-19 Dec | 17 Dec-20 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec | 19 Dec-22 Dec | 20 Dec-22 Dec | 18 Dec-22 Dec | 13 Dec-22 Dec | 24 Dec-26 Dec | 5 Jan-8 Jan | 14 Jan-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.85 (13) | Garden view/balcony; Guest favourite; free cancellation |  |  |  | 232.67 |  |  |  |  |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.83 (12) | Paid parking; Guest favourite; free cancellation |  |  | 244 | 235.67 | 244 | 242.33 |  |  |  |  |  |  |  |  | 235.67 | 235.67 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking; garden; free cancellation |  | 236 |  |  |  | 223.67 |  | 232 | 248.5 |  |  |  |  |  | 218.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  | 227.5 |  |  | 270 | 235 | 245.33 | 248.67 | 275.5 | 243.67 | 260 | 231.5 |  | 250 | 214 | 225.33 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.74 (53) | Superhost; 2 bath |  | 246.5 |  |  |  |  |  |  |  |  | 251 |  |  |  | 194.33 | 202.33 |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | Garden |  |  |  |  | 162.5 |  |  |  |  |  |  |  |  |  | 135.67 | 154.67 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.78 (18) | none listed |  |  | 233.5 | 208.67 | 233.5 | 212 | 217.33 | 217.33 | 241.5 | 214 | 233.5 | 202.5 | 161.89 | 250.5 | 208.67 | 208.67 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5 (10) | Lift; skyline view |  |  |  |  |  | 450.67 | 456.67 |  |  |  |  |  |  |  | 419.33 | 430.33 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking |  | 259 | 240.5 | 238.33 | 264 |  |  |  |  |  |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5 (14) | Lift/paid parking/balcony/panoramic view; Guest favourite; free cancellation |  |  |  |  |  | 363.67 | 363.67 |  |  |  |  |  |  |  |  | 316.67 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking; garden |  |  |  |  | 162.5 |  |  |  | 177.5 |  |  |  |  |  | 141.67 | 161.67 |
| **Comp median (n)** | | | 4.78 (14) | | - (0) | **241.25** (4) | **240.50** (3) | **234.17** (4) | **238.75** (6) | **238.67** (6) | **304.50** (4) | **232.00** (3) | **245.00** (4) | **228.83** (2) | **251.00** (3) | **217.00** (2) | **161.89** (1) | **250.25** (2) | **211.33** (8) | **217.00** (8) |
| Wider 2-bed sample median (n) | | | | | 406.00 (3) | 259.00 (45) | 250.00 (38) | 237.00 (48) | 245.25 (46) | 242.67 (46) | 264.83 (42) | 280.00 (43) | 298.50 (21) | 298.33 (39) | 255.50 (30) | 278.25 (47) | 264.33 (34) | 319.00 (21) | 221.00 (52) | 219.17 (54) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.36 (11)** | | 6 | | | not returned | not returned | not returned | **202.33** | **226.50** | **211.67** | **218.33** | **220.00** | not returned | **219.33** | **241.50** | **207.00** | **177.67** (strike £1,854 -> £1,599) | not returned | **206.00** | **203.00** |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | 6 | | | not returned | not returned | not returned | **196.33** | **220.50** | **205.33** | **211.67** | **213.67** | not returned | **213.00** | **235.50** | **200.50** | **171.44** (strike £1,788 -> £1,543) | not returned | **205.00** | **202.00** |

#### P20
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 24 Nov-25 Nov | 27 Nov-29 Nov | 1 Dec-3 Dec | 5 Dec-6 Dec | 14 Dec-17 Dec | 14 Dec-19 Dec | 16 Dec-19 Dec | 24 Dec-26 Dec | 26 Dec-27 Dec | 26 Dec-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Houseboat, marina view; Superhost; Guest favourite |  |  |  |  | 282.67 | 278.8 | 281 |  |  | 285.25 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Terrace; free parking; Guest favourite; free cancellation |  |  |  |  |  |  |  |  |  | 315.75 |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking |  |  | 341 |  |  |  |  | 403.5 |  |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (57) | Lift; 2 bath |  |  |  |  |  |  |  |  |  | 428.5 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/paid parking/river view/balcony; 2 bath |  |  |  |  | 382.67 | 378.6 | 382.67 |  |  | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony; 12th-floor skyline |  |  | 308.5 |  | 324 | 334.4 | 341.33 | 376 | 494 | 417 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking |  |  | 306 |  | 261.67 | 249.8 | 268.67 | 292.5 |  |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/paid parking/balcony |  |  |  |  | 333.33 | 327.8 | 333.33 |  |  | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.53 (17) | Lift/paid parking/balcony |  |  |  |  | 290.33 | 299.8 | 312.67 |  |  | 397.75 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/Thames view; Superhost; free cancellation |  |  |  |  | 212.33 |  |  |  |  |  |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking; townhouse |  |  | 288.5 |  | 250 |  |  |  |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5 (25) | Balcony; Superhost; Guest favourite |  | 310 | 290 |  | 306 | 291.8 | 309 | 390 |  | 360 |
| **Comp median (n)** | | | 4.80 (17.5) | | - (0) | **310.00** (1) | **306.00** (5) | - (0) | **290.33** (9) | **299.80** (7) | **312.67** (7) | **383.00** (4) | **494.00** (1) | **370.12** (8) |
| Wider 2-bed sample median (n) | | | | | 488.00 (17) | 595.00 (17) | 341.00 (39) | 698.00 (12) | 269.67 (45) | 284.70 (52) | 307.67 (50) | 401.25 (36) | 551.50 (18) | 428.50 (41) |
| **Ours 3547481 (Airbnb 1791529331262420081) 5 (3)** | | 6 | | | not returned | not returned | not returned | **596.00** | **277.00** | **270.00** | **299.33** | not returned | **609.00** | not returned |

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### What changed since 23 Nov: the twins split overnight, with no user edit
**PriceLabs.** At the 23 Nov 21:35Z refresh, 3090701's `price` rose **+3.7% to +4.4%** on every open night 13-21 Dec:
- 3090701: **201/198/198/202/209/222/228/216/219**.
- 3064856: 193/190/190/194/201/214/219/208/211.
- Yesterday both were 192/190/189/193/200/212/218/207/210.

In January the gap is £1 (about +0.5%). On 3090701's blocked nights 25 Nov-8 Dec, `price` rose about +15% (25 Nov 162 -> 186).

**What did not change:**
- `uncustomized_price` is still identical on both (13 Dec 196, 14 Dec 188, 18 Dec 231, 21 Dec 215).
- The override sets are still identical (calls 2-3).
- No user edit since 23 Nov 00:08Z (call 1).
- So the split comes from a layer applied after the overrides.

**The one setting that differs** (calls 7-8) is the **occupancy-based adjustment**:
- 3064856 has a custom table labelled "Aggressive". In the 16-30 days-out band, it runs from -20% at 10% occupancy to +10% at 100%.
- 3090701 has "Market Driven" (recommended).
- Seasonality, last-minute, far-out, demand factor and booking recency are the same on both.

Whether this setting changed on 23 Nov, or the market-driven factor moved by itself, is **NOT CHECKED**: the user log does not cover customization changes. The link between this setting and the split is an inference (estimate), not proven.

**Airbnb.** 3090701 (Airbnb 1587576514709814818) is now **+2.5% to +3.6%** above 3064856 on every December stay; yesterday they were identical on all 11 stays. The factor vs PriceLabs `price` is 0.765-0.766 on both, so Airbnb simply follows PriceLabs.

**Twin rule:**
- Policy `listing_facts.P13.twin_listings` asks for "slightly different" prices, and that is now met by itself.
- **I withdraw yesterday's "revert -2% on one twin only" option**: it is no longer needed to create a gap.
- Reyhan's -2% on both (10-19 and 22-26 Dec) and the 14-16 Dec min 2 stay **confirm or revert** for Corentin, as before.
- If the split comes from an unexplained layer it may close again; recheck tomorrow.

### 13-21 Dec (9 open nights): hold both twins (0%); supported position about -15% vs comp median (rating line); we are -4% to -16%
| Stay | Ours 3090701 / 3064856 (23 Nov both) | Comp median (n) | Pctl / vs median (3090701; 3064856) | vs line x0.85 (3090701; 3064856) | Wider pctl (n, median) | PL avg (3090701 / 3064856) vs mkt P50 (mkt occ) | `recommend` (30 d, +17 pts) |
|---|---|---|---|---|---|---|---|
| 13-15 Dec (2 n) | below min 3 | 240.5 (3) | comps only | | (38, 250.0) | 199.5 / 191.5 vs 220.0 (35%) | |
| **13-16 Dec** | **202.33 / 196.33** (195.67) | 234.17 (4) | P0 -13.6%; P0 -16.2% | **+1.7%; -1.4%** | P17 / P8 (48, 237.0) | 199.0 / 191.0 vs 219.7 (32%) | raise +10% |
| **14-16 Dec (min 2)** | **226.50 / 220.50** (220.00) | 238.75 (6) | P33 -5.1%; P33 -7.6% | +11.6%; +8.7% | P30 / P28 (46, 245.25) | 198.0 / 190.0 vs 220.0 (28%) | raise +10% |
| **16-19 Dec** | **211.67 / 205.33** (204.33) | 238.67 (6) | P0 -11.3%; P0 -14.0% | **+4.3%; +1.2%** | P20 / P15 (46, 242.67) | 211.0 / 203.0 vs 235.0 (36%) | raise +10% |
| 17-20 Dec | 218.33 / 211.67 (210.67) | 304.5 (4, skewed by lift/skyline comps at 456.67 / 363.67) | P25 -28.3%; P0 -30.5% | -15.6%; -18.2% (skewed) | P24 / P14 (42, 264.83) | 219.7 / 211.3 vs 244.0 (42%) | raise +10% |
| **18-21 Dec** | **220.00 / 213.67** (212.67) | 232.0 (3) | P33 -5.2%; P0 -7.9% | +11.6%; +8.4% | P19 / P12 (43, 280.0) | 222.0 / 213.7 vs 247.0 (46%) | raise +10% |
| 19-21 Dec (2 n) | below min 3 | 245.0 (4) | comps only | | (21, 298.5) | | |
| 19-22 Dec | 219.33 / 213.00 (212.00) | 228.83 (2) | P50 -4.2%; P0 -6.9% | +12.8%; +9.5% | P18 / P8 (39, 298.33) | 221.0 / 212.7 vs 249.3 (48%) | raise +10% |
| **20-22 Dec (min 2)** | **241.50 / 235.50** (234.50) | 251.0 (3) | P33 -3.8%; P33 -6.2% | +13.2%; +10.4% | P40 / P33 (30, 255.5) | 217.5 / 209.5 vs 248.5 (47%) | raise +10% |
| 18-22 Dec | 207.00 / 200.50 (199.50) | 217.0 (2) | P50 -4.6%; P0 -7.6% | +12.2%; +8.7% | P15 / P9 (47, 278.25) | 221.2 / 213.0 vs 248.0 (46%) | raise +10% |
| 13-22 Dec (9 n, weekly -15%) | 177.67 (strike £1,854 -> £1,599) / 171.44 (strike £1,788 -> £1,543) | 161.89 (1) | n=1 | | P9 / P3 (34, 264.33) | 210.3 / 202.2 vs 234.7 (39%) | numbers only |
| 24-26 Dec (30-day default) | booked | 250.25 (2) | comps only | | (21, 319.0) | | |
| 1-3 Dec (midweek default) | booked | 241.25 (4) | comps only | | (45, 259.0) | | |
| 27-29 Nov (Fri-Sun default) | booked | none returned | | | (3, 406.0) | | |

The weekly strike is per policy (-15%): (1,854 - 150) x 0.85 + 150 = £1,598.

**Supported: 0% on both twins, 13-21 Dec.**
- The comps moved within ±1.2% overnight, so the market did not move.
- At ratings of 4.31 / 4.36 the supported position is about **-15% vs the comp median**.
- On stays with n ≥ 3, 3064856 sits at -1.4% to +10.4% vs that line, and 3090701 at +1.7% to +13.2%. That leaves no room for a rise.
- We are already P0-P33 of comps, and the comps are not moving, so no cut is argued either.
- `recommend`'s +10% comes from the 30-day lead alone.
- The 3090701 rise (+3-4%) came from the algorithm, not a user. I do not argue for reversing it: it keeps the twins apart.

### January twins: hold both (0%); Reyhan's -8% (2-31 Jan) stays confirm or revert
- **5-8 Jan:**
  - 3090701 £206.00 and 3064856 £205.00 (23 Nov both £205.33).
  - **P38 of 8**, -2.5% / -3.0% vs median 211.33.
  - Line £179.63: +14.7% / +14.1%.
  - PriceLabs 173.0 / 172.0 vs market P50 202.7. Market occupancy **16%**.
- **14-17 Jan:**
  - £203.00 / £202.00 (23 Nov £201.00).
  - **P38 / P25 of 8**, -6.5% / -6.9% vs median 217.0.
  - Line £184.45: +10.1% / +9.5%.
  - PriceLabs 169.7 / 168.7 vs P50 203.7. Market occupancy **12%**.
- **Supported: hold.**
  - At a 4.3 rating, both January stays are already 9-15% over the line, so no rise is argued.
  - P25-P38 of comps and the +17-pt lead argue against a cut.
  - The -8% still does not show in `price`: 3064856 5 Jan has `uncustomized_price` 165, x0.92 = 152, but `price` is 173. Why is NOT CHECKED.

### 27 Nov / 1 Dec single nights (Reyhan +25%, min 1)
- 3064856: 265 / 235 (23 Nov: 262 / 232).
- 3090701: **212 / 188** (23 Nov: 183 / 163, so **+15.8% / +15.3%** overnight with no edit; same layer as above).
- These are single nights, and the 27-29 Nov search returned no kept comp, so there is no percentile. Numbers only. The +25% vs policy +50% stays confirm or revert.

## P20 Waterford Court, 2-bed (Airbnb 1791529331262420081, 5.0 from 3 reviews; Airbnb shows 6 guests, see above)

No user edit (call 1) and no override change (call 4). The overnight refresh moved the algorithm only:
- 5 Dec: 591 -> **582** (`uncustomized_price` 406 -> 400).
- 26 Dec: 508 -> **509** (`uncustomized_price` 345 -> 339).
- 14-18 Dec: 287/304/299/332/346 (23 Nov: 284/302/298/331/346).

Column key: "Line" = comp median x 0.85. "PL vs mkt" uses the Nearby Listings compset (1-3 BR range), which understates a 2-bed P50. The 2 BR summary median is 254.

| Stay | Ours 24 Nov (23 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n, median) | PL avg / mkt P50, P75, P90 (mkt occ) | Factor | `recommend` (7 d, +34 pts) |
|---|---|---|---|---|---|---|---|---|
| 24-25 Nov (tonight, 1 n) | **unsellable**: min 2 on 24 Nov, and 25 Nov is a check-in | none returned | | | (17, 488.0) | `final_price` 222 / 213, 270, 348 (53%) | | |
| 27-29 Nov (Fri-Sun default) | booked | 310.0 (1) | comps only | | (17, 595.0) | | | |
| 1-3 Dec (midweek default) | booked | 306.0 (5) | comps only | | (39, 341.0) | | | |
| **5 Dec (orphan, 1 n)** | **596.00** (603.00) | none returned (6th day) | n=0 | | **P42** of 1-night 2-beds (12, £698) | **582** / 229, 295, **401** (58%) | 0.766 | raise-signal (no pctl) |
| 14-17 Dec | 277.00 (275.67) | 290.33 (9) | P33 / -4.6% | +12.2% | P53 (45, 269.67) | 296.7 / 216, 269-279 (27%) | 0.765 | raise +10% |
| **14-19 Dec (all 5 open nights)** | **270.00** (269.00) | 299.8 (7) | **P14 / -9.9%** | **+6.0%** | P35 (52, 284.7) | 313.6 / 221 (28%) | 0.765 | raise +10% |
| 16-19 Dec | 299.33 (298.67) | 312.67 (7) | P29 / -4.3% | +12.6% | P44 (50, 307.67) | 325.7 / 225 (29%) | 0.766 | raise +10% |
| 24-26 Dec (30-day default) | booked | 383.0 (4) | comps only | | (36, 401.25) | | | |
| **26 Dec (orphan, 1 n)** | **609.00** (608.00) | **494.0 (1)** | **P100 / +23.3%** | +45.0% | **P50** of 1-night 2-beds (18, £551.5; 23 Nov £587) | **509** / 250, 320, **418** (36%) | 0.902 | raise +5% |
| 26-30 Dec (context) | 27 Dec booked | 370.12 (8) | comps only | | (41, 428.5) | | | |

(`recommend`'s "raise" comes from the 7-day lead of +34 pts, because the 25 Nov-5 Dec stay is in the window, not from these nights' positions.)

### Tonight (24 Nov): unsold; numbers only
- 24 Nov cannot be booked on its own: its override is min 2, and 25 Nov is the check-in of the 25 Nov-5 Dec stay. No kept comp was returned for 24-25 Nov.
- PriceLabs `final_price` is 222, between market P50 213 and P75 270, at 53% market occupancy.
- Opening it would take a min-stay change, which conflicts with policy (`listing_facts.P20.min_stay`: 3 nights to 30 Nov). Not proposed.

### 5 Dec (Reyhan +100%, min 1): hold; numbers only
- Airbnb £596 = 582 x 0.766 + 150, down -1.2% from £603 with no edit.
- No kept comp was returned for 5-6 Dec (6th day).
- £596 is **P42** of the 1-night 2-bed sample (n=12, median £698).
- PriceLabs 582 is 45% above market P90 (401).
- **Read:** like-for-like comps support no direction (n=0). The wide 1-night sample has us below its median, so no cut is argued (judgement).

### 14-19 Dec: hold (0%); supported position -4% to -10% vs comp median, and we are there
- P14-P33, -4.3% to -9.9% vs median, +6.0% to +12.6% over the line.
- The comps moved within ±2.5%, ours +0.2% to +0.5%.
- PriceLabs avg 297-326 is above market P75 (269-295) at 27-30% market occupancy.
- **Read: hold.** `recommend`'s +10% comes from the lead. A cut is not argued either: we are already under the comp median.

### 26 Dec (Reyhan +100%, min 1): up to about -25% supported by 1 comp (509 -> about 381); the wider sample says at market; for Corentin as evidence
- The only kept comp returned is 1684834789445533643 (lift/balcony, 12th-floor skyline, 4.39 from 18) at **£494** (2nd day, unchanged). We are +23.3% above it.
- PriceLabs 509 is above market **P90 418** (P50 250, occupancy 36%).
- Matching that comp needs (494 - 150) / 0.902 = **£381** (-25%). `uncustomized_price` is 339.
- **Against:** n=1, and the wider 1-night 2-bed sample still puts us at **P50**. That sample's median fell from £587 to £551.5 overnight.
- Reyhan's +100% is not settled by policy, so it stays **confirm or revert** for Corentin with this evidence. I make no new proposal.

## P10 Hanger Lane, 1-bed (3318177)
Handed back: last night 18 Nov (policy `handbacks.P10`). All 60 nights in `prices.csv` for 24 Nov are unavailable (Blocked). No positioning and nothing proposed.

## P02 Ladbroke Grove, P03 Bayswater
Blocked on purpose (policy `intentional_blocks`). All 60 nights in `prices.csv` for 24 Nov are unavailable. No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or Smoobu (no rows in `listings.csv` or `prices.csv` for 24 Nov). Own price, percentile, rating gap and premium: **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (AWS WAF challenge, 24 Nov 07:23:11Z; not retried or bypassed). That covers Booking.com comps, our Booking.com displayed prices, P20's Booking.com capacity and whether the twins also split on Booking.com. Comp cancellation terms come only from Airbnb pills.
2. **Why the twins split** (3090701 +3.7-4.4% on 13-21 Dec and about +15% on 25 Nov-8 Dec) is **NOT CHECKED**:
   - Whether the occupancy-profile difference ("Aggressive" custom on 3064856 vs "Market Driven" on 3090701) is new, or caused the split, cannot be seen from the user log.
   - Needs the PriceLabs price breakdown or the customization history.
3. **Why the January -8% does not lower `price`** on either twin: NOT CHECKED (3rd day).
4. **3090701's new review** (4.7 -> 4.36 on 23 Nov): its text was not read. The Airbnb-to-Smoobu mapping is still "likely" (policy `listing_facts.P13.ids`).
5. **P20 Airbnb guest count 6 vs policy 4** (6th day): who changed it is NOT CHECKED.
6. **Airbnb factors** (0.765 at 28 days or less, 0.90 beyond 28 days) are inferred from prices. The rule behind them is NOT CHECKED.
7. **Thin comp coverage:**
   - P13: n=0-4 on 27-29 Nov, 1-3 Dec, 13-15, 13-16, 17-20 (skewed), 18-21, 19-21, 19-22, 20-22, 18-22, 13-22 and 24-26 Dec.
   - P20: n=0-1 on 24-25 Nov, 27-29 Nov, 5 Dec (6th day) and 26 Dec.
   - Only unsold comps can be priced, which biases peak medians.
8. P20's market percentiles use the 1-3 BR compset. P20 has 3 reviews, so the 0.85 line is judgement.
9. PriceLabs protocol: the two P13 override reads ran in parallel (one message), not one at a time (2nd day). Both were read-only and both succeeded; no data effect.
10. P16, P18 and P19 have no data; P02, P03 and P10 have no sellable nights.
