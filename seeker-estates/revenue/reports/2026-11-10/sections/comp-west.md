# Competitor positioning: WEST + HERTS (D = 2026-11-10)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** `data/policy.json` read first. PriceLabs calls, read-only, one at a time, all 200:
1. `get_user_logs` (listing, 8-10 Nov) for 3547481, 3064856, 3090701, 3318177: 17 entries. **13 are new since 9 Nov 06:00Z, all Reyhan: 9 Nov 14:07Z (P13), then 21:22-21:26Z (P13, P20).** None for P10.
2. `get_listing_date_overrides` 3547481 (10 Nov-28 Feb) and 3064856 (10 Nov-31 Jan).
3. `get_neighbourhood_data` detail (future prices + occupancy) for 3547481 (2 BR n=153, P25/P50/P75 213/250/318) and 3064856 (2 BR n=116, 190/221/275). Saved to `scratchpad/west10/dl/neigh_*.json`.
4. `get_pms_reservations` smoobu, stays 11-15 Dec, booked from 8 Nov (to find the listing behind the cancelled P13 Booking.com stay).

**Own prices:** `raw/prices_*.json` in snapshot 2026-11-10. They were refreshed 9 Nov 21:22-21:27Z, **after** Reyhan's 21:22-21:26Z edits (`listings.csv` last push P13 21:23:04Z, P20 21:26:36Z). Airbnb follows the raw `price` field: (all-in - £150) / `price` = 0.765-0.769 in November and 0.90 in December. `user_price` differs from `price` on many dates (for example 3064856 10 Dec: 221 vs 268; P20 13 Nov: 294 vs 278); why is NOT EXPLAINED. Smoobu `/api/rates`: NOT CHECKED.

**Airbnb:** public search pages, checked 2026-11-10 with plain `curl` and default headers. No bot check was met. **Booking.com: NOT CHECKED.**

**Method** (unchanged since 3 Nov):
- Search: 4 guests, entire home, at least 2 bedrooms. Box of about 1.3 km half-side around the PriceLabs coordinates, plus a box of about 0.2 km around each kept comp.
- Price = Airbnb all-in total / nights, with cleaning and Airbnb fees **included** (taxes are not shown separately). Ours are on the same basis (£150 cleaning).
- Comp cancellation policies: NOT CHECKED.

**Comp sets** (same ids as 9 Nov; none replaced):
- **P13:** all 11 active. 1411449348357673454 (Superhost, now 4.76/50) is back: returned on 17-19 Nov and 5-8 Jan.
- **P20:** all 12 active. 1568001017881493647 and 789954794593691037 were found only on 23-27 Dec, so I added that stay to confirm they are active.

**Ratings:**
- Ours, unchanged: 3090701 4.7 (10), 3064856 4.31 (13), P20 New with 0 reviews.
- Comp median: P13 **4.76** (13 reviews), P20 **4.8** (17.5 reviews).

**Occupancy** (Smoobu `reservations.csv` 10 Nov, cancelled excluded; market from `pl_kpis.csv` 10 Nov):

| Listing | 30 d (10 Nov-9 Dec) | 60 d (10 Nov-8 Jan) | Market 30 / 60 | Lead 30 / 60 |
|---|---|---|---|---|
| P13 (one flat) | 24/30 = **80.0%** | 31/60 = **51.7%** | 43% / 37% | **+37 / +15 pts** |
| P20 | 21/30 = **70.0%** | 32/60 = **53.3%** | 38% / 31% | **+32 / +22 pts** |

All leads are 10 pts or more, so `recommend` returns "raise" on every stay. The quality-adjusted line below decides whether the raise is actually supported.

**Rows written:**
- `data/snapshots/2026-11-10/comps.csv` did not exist, so I copied it forward from 2026-11-09 (11,421 lines) and appended **321 rows** (P13: 11 comps x 15 stays; P20: 12 comps x 13 stays).
- **26 rows** appended to `channel_checks.csv` (our Airbnb listings; the file already existed, 805 lines).
- Both under `flock` (`.comps.csv.lock` / `.channel_checks.csv.lock`).
- To find them, filter `source` on "checked 2026-11-10" and "comp-west". `date` is the check-in; the full stay is in `source`. A comp that was not returned has a blank price and says so.

**Recompute check** (`snapshot.load('2026-11-10')` + `comp_summary`, matches the tables):
- P20 13-16 Nov: n=5, median 290, P20 / -8.0%.
- P20 14-17 Dec: n=10, median 309.5, P50 / +0.9%.
- P13 11-15 Dec: n=2, median 242.88, P50 / +1.8%.
- P13 23-26 Dec: n=3, median 251.67, P67 / +5.6%.
- P13 5-8 Jan: n=8, median 208.84, P50 / +0.1%.

## Comp tables (Airbnb all-in £/night, 4 guests, checked 2026-11-10)
- A figure in brackets is the same comp's price for the same stay on 9 Nov, shown where it moved by £1 or more.
- A blank cell means the comp was not returned for that stay (booked or min-stay).
- For ours, "not returned" means booked, blocked or below min stay:
  - P13: 13-15 Nov and 17-19 Nov are booked. 10-12 Dec, 18-20 Dec and 15-17 Jan are below the new min 3.
  - P20: 13-15 Nov is below min 3. 17-19 Nov is blocked. 20-21 Nov is min 3. 21-25 Nov, 10-12 Dec and 23-27 Dec are booked. 5-6 Dec is unbookable.

#### P13

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 11-13 Nov | 13-15 Nov | 17-18 Nov | 17-19 Nov | 27-28 Nov | 1-2 Dec | 10-12 Dec | 11-15 Dec | 14-17 Dec | 18-20 Dec | 20-25 Dec | 23-26 Dec | 24-27 Dec | 5-8 Jan | 15-17 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.82 (11) | Garden view/balcony |  |  |  | 240 |  |  | 290.5 | 257.25 | 230.67 (241) | 283.5 | 253.8 (265.4) | 267 (279.33) | 267 (279) |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | Paid parking on premises/Guest favourite | 207 |  |  |  |  |  |  |  | 240 |  |  |  |  | 235.67 | 244 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking on premises |  |  |  | 221 |  |  | 268 |  |  |  |  |  |  | 203.67 |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  |  |  |  |  | 225.33 | 272.5 (275.5) | 213.4 (216.6) | 238.33 (241.67) | 244 (247) | 214 | 255 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.76 (50) | Superhost |  |  |  | 243.5 |  |  |  |  |  |  |  |  |  | 209 |  |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed |  |  | 185 | 152.5 |  |  |  |  | 145.33 |  |  |  |  | 135.67 | 175 |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  |  |  |  |  |  | 261 (264) | 228.5 | 209.33 | 274.5 | 218.4 (220.8) | 251.67 | 255.67 | 208.67 | 258 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift | 411 | 425.5 |  | 390.5 |  |  |  |  |  | 450 |  |  |  | 419.33 | 477 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking on premises | 188 |  |  | 196.5 |  |  |  |  | 254 |  |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | Lift/Paid parking on premises/balcony/Guest favourite |  |  |  |  | 394 | 423 |  |  |  | 331.5 |  |  |  |  | 331.5 |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking on premises |  |  | 185 | 152.5 |  |  |  |  | 151.67 |  |  |  |  | 141.67 | 175 |
| **Comp median (n)** | | | 4.76 (13) | | **207** (3) | **425.5** (1) | **185** (2) | **221** (7) | **394** (1) | **423** (1) | **268** (3) | **242.88** (2) | **225.33** (7) | **283.5** (5) | **218.4** (3) | **251.67** (3) | **255.67** (3) | **208.83** (8) | **255** (7) |
| Wider 2-bed sample median (n) | | | | | 208.5 (11) | 309 (10) | 216 (6) | 240 (27) | 337.5 (4) | 441.5 (4) | 282.75 (14) | 262.75 (23) | 239 (35) | 301 (11) | 285.1 (16) | 310.67 (21) | 324.33 (17) | 235.67 (45) | 256.75 (34) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.7 (10)** | | | | | **213** | not returned | **310** | not returned | **339** | **324** | not returned | **247.25** | **247.33** | not returned | **222.8** (strike £1,221 -> £1,114) | **265.67** | **263** | **209** | not returned |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | | | | **220.5** | not returned | **319** | not returned | **409** | **389** | not returned | **235.5** | **236.33** | not returned | **212.2** (strike £1,162 -> £1,061) | **254** | **251.33** | **200.33** | not returned |

#### P20

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13-15 Nov | 13-16 Nov | 13-18 Nov | 16-18 Nov | 17-19 Nov | 20-21 Nov | 21-25 Nov | 5-6 Dec | 10-12 Dec | 14-17 Dec | 14-19 Dec | 23-27 Dec | 26-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost |  | 281 | 277.8 |  |  |  | 279 |  |  | 281.33 | 278 | 281 | 281.75 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises |  |  |  |  |  |  |  |  |  |  |  | 332.25 (334.75) |  |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises |  |  |  |  |  |  |  |  |  |  |  | 388.5 |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (56) | Lift |  |  |  |  |  |  | 298.25 |  |  | 346.67 (342) | 350.6 (346.8) | 415.25 | 498.25 (497.25) |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony |  | 424 | 420 |  |  |  | 380.25 |  |  | 382.67 | 378.6 | 380.25 | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony |  |  |  |  |  | 420 | 333.5 | 567 |  | 425.67 | 439.6 | 505.75 | 595.5 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises |  |  |  | 306 (281.5) | 281.5 |  | 257 |  | 292.5 | 261.67 | 249.8 |  |  |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony |  | 368.67 | 363.2 |  |  |  | 329.75 |  |  | 333.33 | 327.8 | 329.75 | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/Paid parking on premises/balcony (replaces 1384811870668527117, inactive next 60 days) |  |  |  |  |  |  | 275 |  |  | 313 (307.33) |  |  | 452 (448.5) |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost | 210.5 | 194.67 |  |  |  |  | 232.5 |  |  | 217.67 (222.33) |  | 237.5 (239.5) | 316.5 (320.75) |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises |  |  |  | 288.5 (264) | 264 |  |  |  | 264 | 250 | 238.4 |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 310 | 290 | 258 | 270 | 270 |  | 260 |  | 300 | 306 | 291.8 | 360 | 360 |
| **Comp median (n)** | | | 4.8 (18) | | **260.25** (2) | **290** (5) | **320.5** (4) | **288.5** (3) | **270** (3) | **420** (1) | **279** (9) | **567** (1) | **292.5** (3) | **309.5** (10) | **309.8** (8) | **360** (9) | **370.12** (8) |
| Wider 2-bed sample median (n) | | | | | 267 (8) | 290 (13) | 277.8 (13) | 270 (15) | 264 (11) | 312 (2) | 287.5 (15) | 567 (1) | 332.5 (9) | 280.33 (31) | 268.9 (22) | 360 (17) | 379.25 (14) |
| **Ours 3547481 (Airbnb 1791529331262420081) New, 0 reviews** | | | | | not returned | **266.67** | **233.4** | **259** | not returned | not returned | not returned | not returned | not returned | **312.33** | **300.2** | not returned | **422.25** |

## P20 Waterford Court, 2-bed, max 4 (Airbnb 1791529331262420081, New, 0 reviews)

### What changed since 9 Nov 06:00Z
**Reyhan, 9 Nov 21:25:30-21:26:13Z** (`get_user_logs`; confirmed in `get_listing_date_overrides`):

| Dates | Before (9 Nov) | Now |
|---|---|---|
| 13-15 Nov | -5%, min 2 | **no price override, min 3** |
| 16-17 Nov | -5%, min 2 | unchanged |
| 20-21 Nov | -5%, min 2 | **no price override, min 3** |
| 22-24 Nov | -5%, min 2 | unchanged (now booked) |
| 1-20 Dec | override (value not recorded on 9 Nov) | **0%, min 3** |
| Jan 2027 | -5% | -5%, **min 3** (re-saved) |
| Feb 2027 | -5% | -5%, **min 4** (re-saved) |

Effect on Airbnb (same stays as 9 Nov):
- 13-16 Nov: £236.33 -> **£266.67** (+12.8%).
- 16-18 Nov: £245.5 -> £259 (+5.5%).
- 14-17 Dec: £296.67 -> **£312.33** (+5.3%).
- 14-19 Dec: £281 -> £300.2 (+6.8%).
- 26-30 Dec: flat (£422.25).

Conflicts with policy (for Corentin to confirm; not new proposals):
- Policy (24 Oct) has **-5% on 31 Oct-19 Nov**. 13-15 Nov is now 0%.
- Policy also has **min 3 to 30 Nov**. 16-17 and 22-24 Nov are still min 2.
- Base is still 330 in PriceLabs vs 350 in policy (unchanged).

### New booking 21-25 Nov (booked 9 Nov, 12 days out): ratio and comps
- **Booking:** Smoobu room £638.54 + cleaning £150 = **£788.54**. Commission £122.22 = 15.5% of £788.54, i.e. the host-only fee.
  - Guest all-in: **£197.14/night**.
  - Room per night: £159.64.
- **PriceLabs at booking** (9 Nov raw, refreshed 8 Nov 12:41:44Z, including Reyhan's -5% on 20-24 Nov): 246 + 235 + 244 + 333 = **1,058**.
  - Room / PriceLabs = **0.604**.
  - The usual Airbnb layer of 0.765 (9 Nov search, 20-23 Nov; it already contains the 0-14 day last-minute 15% in policy `listing_facts.P20`) predicts room £809, i.e. **£239.84/night all-in**.
  - **The guest paid 21% less than that.** The new-listing promotion ended (policy), so this is **unexplained**. Possible cause: the 24 Nov rate (333 in PriceLabs) may have differed in Smoobu, but Smoobu rates were NOT CHECKED. Passed to the channel section.
- **Against comps, same stay, checked today:**
  - Comp median **£279** (n=9; min £232.50).
  - The booking sits at **P0 of the comps and P0 of the wider 2-bed sample** (n=15): **-29% vs the comp median** and **-17% vs the new-listing line** (median x 0.85 = £237.15).
  - At the price PriceLabs implied (£239.84) it would have been about P0-P11, on the line.
  - **Conclusion: the stay sold well below the comp evidence, and the gap is in the Airbnb paid-vs-listed layer, not in PriceLabs.**
- **Orphans:**
  - **20 Nov is now a 1-night orphan.** 18-19 Nov are "Blocked" in PriceLabs, 21 Nov is booked, and 20 Nov is min 3 (Reyhan 21:25:39Z, after the booking), so it cannot sell.
    - The comp evidence is thin (1-night 20-21 Nov: n=1 £420; wider n=2 median £312).
    - PriceLabs 259 vs market P50 215 (about P66).
  - **25 Nov is not an orphan**: 21-25 Nov checks out the day the 25 Nov-5 Dec stay arrives.
- **t-p20-delivery: the stay sells night 21 Nov, which is inside the policy delivery block (20-22 Nov, Corentin 24 Oct).** PriceLabs blocks 18-19 Nov instead.
  - Corentin to confirm whether the delivery moved to 18-19 Nov.
  - If the delivery is still 20-22 Nov, the 21 Nov night clashes with it.
  - If it moved, 20 Nov could open as min 1 to sell (n=1 evidence, so price not set by comps).

### Price percentile, rating, review gap, supported positioning
- Comp median rating is 4.8 (17.5 reviews). Ours: no rating, 0 reviews, so `quality_premium` = 0.0.
- "Line" = comp median x 0.85: a **-15% new-listing allowance**. This is my judgement, not the function's output.
- Columns: "Factor" = (all-in - £150) / PriceLabs; "Mkt pctl" = position of our PriceLabs price in the market P25/P50/P75 (from `neighbourhood_data`).

| Stay | Ours Airbnb 10 Nov (9 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n) | PL vs P50 (mkt pctl) | Factor | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 13-15 Nov (default Fri-Sun) | not sellable (min 3) | 260.25 (2) | n=2 | | median 267 (8) | 300 vs 214 (+40%, >P75) | | |
| **13-16 Nov** | **266.67** (236.33) | **290 (5)** | **P20 / -8.0%** | **+8.2%** | P38 (13) | 283 vs 212.7 (+33%, >P75) | 0.766 | raise +10% |
| **13-18 Nov (whole 5-night gap)** | **233.4** | 320.5 (4) | P0 / -27.2% | **-14.3%** | P23 (13) | 265.8 vs 210.8 (+26%, P70) | 0.765 | raise +10% |
| 16-18 Nov | 259 (245.5) | 288.5 (3) | P0 / -10.2% | +5.6% | P47 (15) | 240 vs 208 (+15%) | 0.767 | raise +10% |
| 17-19 Nov (default Tue-Thu) | blocked 18-19 | 270 (3) | comps only | | 264 (11) | | | |
| 20-21 Nov (orphan) | min 3, unsellable | 420 (1) | n=1 | | 312 (2) | 259 vs 215 | | |
| **21-25 Nov (booked 9 Nov)** | **paid 197.14 all-in** | **279 (9)** | **P0 / -29.3%** | **-16.9%** | **P0 (15)** | at booking 264.5 avg | 0.604 room/PL | |
| **5 Dec (gap night)** | unbookable (min 3) | 567 (1) (1-night 5-6 Dec) | n=1 | | n=1 | 309 vs 226 (>P75 297) | | |
| 10-12 Dec (30-day default) | booked | 292.5 (3) | comps only | | 332.5 (9) | | | |
| **14-17 Dec** | **312.33** (296.67) | **309.5 (10)** | **P50 / +0.9%** | +18.7% | P65 (31) | 291.3 vs 217 (+34%, >P75) | 0.900 | raise +10% |
| **14-19 Dec (all 5 open nights)** | **300.2** (281) | **309.8 (8)** | **P50 / -3.1%** | +14.0% | P64 (22) | 300.2 vs 221.2 (+36%, >P75) | 0.900 | raise +10% |
| 23-27 Dec | booked (19-26 Dec) | 360 (9) | comps only | | 360 (17) | | | |
| **26-30 Dec (min 4)** | **422.25** (423) | **370.12 (8)** | **P62 / +14.1%** | +34% | P57 (14) | 427.2 vs 257 (+66%, >P75) | 0.901 | raise +10% |

Comps were mostly flat. The exception is 16-18 Nov, where same-comp prices rose 8.7%: 790672189611831800 went from £281.5 to £306 and 757342335233586120 from £264 to £288.5.

**Supported positioning (one line each):**
- **13-16 Nov (P20, -8%):** **hold**. The price is 8% above the -15% line after Reyhan removed the -5%. The evidence supports the removal, even though it conflicts with the policy -5% to 19 Nov (Corentin to confirm). **+10% is not supported** for a 0-review listing.
- **13-18 Nov, the full gap (P0 of 4, -14% vs line):** the gap comes from 16-17 Nov, which are still at -5% (policy range).
  - Removing the -5% on 16-17 Nov (about +5% on those nights) is supported by the 5-night view.
  - Whether to do it is Corentin's call against the 24 Oct decision.
- **16-18 Nov:** **hold**. P0 of n=3, but 5.6% above the line, and the comps rose.
- **14-17 Dec and 14-19 Dec (P50, +14-19% vs line, PriceLabs above market P75):** **hold.** The 0% override plus the refresh took us from P33-P40 to P50.
  - This is the comp median, which is the most the evidence supports for 0 reviews.
  - `recommend` +10% comes only from the +22-pt occupancy lead.
- **26-30 Dec (P62, +14%):** **hold**, as yesterday.
- **5 Dec (t-p20-5dec-orphan): NOT fixed.**
  - Reyhan re-saved 1-20 Dec at min 3 (21:25:55Z), so 5 Dec is still `unbookable`=1.
  - Policy's min-3 rule ends 30 Nov.
  - Evidence supports **min 1 at the current 309**: above market P75, but under the only 1-night comp (£567, n=1).
  - On Airbnb at the 0.90 factor that is about £278 room.
- **21-25 Nov booking:** a conversion (a-p20-conversion), but at P0 of the comps.
  - **The leak to fix is the Airbnb layer (0.60 paid vs 0.765 displayed), not PriceLabs.** This is for the channel section.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### What changed since 9 Nov 06:00Z
Reyhan, `get_user_logs`; confirmed in `get_listing_date_overrides` 3064856. All edits were copied to 3090701 as "copied from parent listing".

| Time (9 Nov) | Dates | Change |
|---|---|---|
| 14:07:11Z | 9-12 Nov | -5% removed (min 2 kept) |
| 14:07:21Z | 10 Dec | **+40%, min 1** |
| **21:22:26Z** | 9-12 Nov | **-5% re-added, min 2** (current) |
| **21:22:44Z** | 10-26 Dec | **-2%, min 3** (current). Replaces -5% min 2 on 10-20 Dec, -5% min 3 on 21-26 Dec, and the 10 Dec +40% |

Other overrides are unchanged: 13-16 and 18-26 Nov -2%; 17 Nov +35% min 1; 27 Nov +50% min 1; 1 Dec +50% min 1 (intentional per policy); 7-9 Dec -7%; 27 Dec-1 Jan -3%; 2-31 Jan -10%.

Effect on Airbnb:
- November: +1-4%. 11-13 Nov £204 -> £213 (3090701), £212 -> £220.5 (3064856).
- December: +2.6-2.8%. 14-17 Dec £241 -> £247.33; 20-25 Dec £216.8 -> £222.8; 23-26 Dec £258.33 -> £265.67.

Policy conflicts and actions:
- **a-p13-record: not fixed.** The 9-12 Nov -5% still conflicts with policy (24 Oct: 0%).
- **New since 9 Nov: min 3 on all of 10-26 Dec.** 2-night weekend stays (10-12 Dec, 18-20 Dec) are no longer bookable; comps for those stays have medians of £268 and £283.5.

### P13 11-15 Dec: the reopened cancellation
- **Which listing:** **3064856** (`get_pms_reservations`: reservation 162759785, Booking.com).
  - Booked 9 Nov 08:58Z, **cancelled 9 Nov 19:36Z**.
  - Total £860; rental revenue £592.31, which is £710.77 less 20% VAT. 5 guests.
- **Ratio at booking:** room £710.77 (£177.69/night) vs PriceLabs at booking (9 Nov raw, refreshed 8 Nov 12:40:36Z) 224 + 225 + 200 + 198 = **847**.
  - Room / PriceLabs = **0.839**, i.e. **0.73 of the 1.15x Booking.com markup**.
  - Per policy this is explained by stacked Booking.com promotions; their size is about **27%**.
- **Commission:** £172.15 = 24.2% of room (20.0% of the total). That is above 15%; policy names the Visibility Booster for Camden only, so ask (channel section).
- **Now (Airbnb, 11-15 Dec):** 3090701 **£247.25**, 3064856 **£235.5**.
  - Comp median £242.88 (n=2): **P50 both** (+1.8% / -3.0%).
  - Wider 2-bed sample (n=23, median £262.75): **P17 / P9**.
  - PriceLabs vs market P50 227.2: +2.5% / -3.2%.
  - Lines: 3090701 +4.3%, 3064856 +14.1%.
- The open block is now **10-26 Dec (17 nights)**: the Airbnb 20-25 Dec stay was already cancelled before 9 Nov, and 27 Dec onward is booked.

### Price percentile, rating, review gap, supported positioning
**Rating and reviews vs comp median** (4.76, 13 reviews):
- 3090701, 4.7 (10): -0.06 stars, 3 reviews fewer; `quality_premium` **-0.024**.
- 3064856, 4.31 (13): -0.45 stars, same review count; `quality_premium` **-0.15** (the cap).

"Line" = comp median x (1 + quality premium). The flat sells at whichever twin is cheaper.

| Stay | Ours 3090701 / 3064856 (9 Nov) | Comp median (n) | Comp pctl / vs median | vs line | Wider pctl (n) | PL vs P50 | Factor | `recommend` |
|---|---|---|---|---|---|---|---|---|
| **11-13 Nov (Wed-Fri, open now)** | **213 / 220.5** (204 / 212) | 207 (3) | P67 / +2.9% ; P67 / +6.5% | +5.4% / +25% | P55 (11) | 180 / 190 vs 204.5 (-12% / -7%) | 0.767 | raise +10% |
| 13-15 Nov (default Fri-Sun) | booked | 425.5 (1) | comps only | | 309 (10) | | | |
| 17 Nov (1 n) | 310 / 319 (301 / 310) | 185 (2) | n=2 | | P67 (6) | 208 / 220 vs 202 | 0.769 | mkt: raise +10% |
| 17-19 Nov (default Tue-Thu) | booked from 18 Nov | 221 (7) | comps only | | 240 (27) | | | |
| 27 Nov (1 n) | 339 / 409 | 394 (1) | n=1 | | P50 / P100 (4) | 246 / 338 vs 235 | 0.767 | mkt: raise |
| 1 Dec (1 n, +50% intentional) | 324 / 389 | 423 (1) | n=1 | | P25 (4; median 441.5) | 227 / 312 vs 224 | 0.767 | (intentional override, numbers only) |
| 10-12 Dec (30-day default) | below min 3 | 268 (3) | comps only | | 282.75 (14) | 240.5 / 227 vs 240.5 | | |
| **11-15 Dec (reopened)** | **247.25 / 235.5** | 242.88 (2) | P50 / +1.8% ; P50 / -3.0% | +4.3% / +14.1% | **P17 / P9 (23)** | 233 / 220 vs 227.2 (+2.5% / -3.2%) | 0.900 | mkt: raise +10% |
| **14-17 Dec (midweek)** | **247.33 / 236.33** (241 / 230.33) | **225.33 (7)** | **P86 / +9.8% ; P71 / +4.9%** | **+12.5% / +23.4%** | P57 / P46 (35) | 219 / 207 vs 222.3 (-1.5% / -6.9%) | 0.901 | raise +5% / +10% |
| 18-20 Dec (Fri-Sun) | below min 3 | 283.5 (5) | comps only | | 301 (11) | 237.5 / 224 vs 243.5 (-2.5% / -8%) | | |
| **20-25 Dec (5 n)** | **222.8 / 212.2** (216.8 / 206.6); "Long stay discount" strikes £1,221 -> £1,114, £1,162 -> £1,061 | 218.4 (3) | P67 / +2.0% ; P0 / -2.8% | +4.5% / +14.3% | **P19 / P6 (16; median 285.1)** | 237.8 / 224.8 vs 252.4 (-5.8% / -10.9%) | 0.811 | raise +10% |
| **23-26 Dec (Christmas)** | **265.67 / 254** (258.33 / 247) | 251.67 (3) | P67 / +5.6% ; P67 / +0.9% | +8.2% / +18.7% | **P10 / P10 (21; median 310.67)** | 239.3 / 226.3 vs 265 (-9.7% / -14.6%) | 0.901 | raise +10% |
| 24-27 Dec | 263 / 251.33 (256.33 / 245) | 255.67 (3) | P67 / +2.9% ; P33 / -1.7% | +5.4% / +15.6% | **P12 / P6 (17; median 324.33)** | 236.7 / 223.7 vs 273.7 (-13.5% / -18.3%) | 0.900 | raise +10% |
| **5-8 Jan (twins, midweek)** | **209 / 200.33** | **208.83 (8)** | **P50 / +0.1% ; P25 / -4.1%** | +2.5% / +12.9% | P27 / P20 (45) | 176.7 / 167 vs 204 (-13% / -18%) | 0.900 | raise +10% |
| 15-17 Jan (Fri-Sun) | below min 3 | 255 (7) | comps only | | 256.75 (34) | 3064856 final 194 (15 Jan) vs 209.5 | | |

Same-comp changes: 1761224847419174970 (garden view/balcony, 4.82/11) cut 14-17 Dec from £241 to £230.67 (-4.3%) and Christmas by 4-4.4%. Others were flat (0% to -1.5%).

**Twins (t-p13-twins): still fixed.**
- PriceLabs: January 3090701 is about 6% dearer (5 Jan 178 vs 169; 7 Jan 176 vs 166). December 3090701 is about 6% dearer (14 Dec 217 vs 205).
- Airbnb: 5-8 Jan **£209 vs £200.33 (+4.3%)**; 11-15 Dec £247.25 vs £235.5 (+5.0%).
- They are slightly different, never identical, which meets the rule. Order is deprioritised (policy), so not raised.

**Supported positioning (one line each):**
- **11-13 Nov:** **hold.** Both twins are P67 and above their lines (+5% / +25%). The re-added -5% matches the evidence, but policy says 0% for 9-12 Nov: that conflict is Corentin's to confirm.
- **11-15 Dec (reopened 3064856 stay):** **+2% (back to 0%) on 10-13 Dec is supported.**
  - The kept comps are thin (n=2, P50), but the wider sample puts us at P9-P17, and PriceLabs flags 10-12 Dec as Good/High demand.
  - +10% is not supported: the cheaper twin is already 14% above its line.
- **14-17 Dec midweek:** **hold at -2%.** We are P71-P86 and 12-23% above the lines. Evidence would allow going back to -5% (about £6/night), which is low value.
- **Christmas 20-27 Dec:** **remove the remaining -2% on 20-26 Dec (+2%).**
  - This finishes yesterday's "+5%": Reyhan's -5% -> -2% did 3 of the 5 points.
  - The 3 kept comps still open are at our level (P0-P67). The wider sample has us at **P6-P19**, and PriceLabs is 6-18% under market P50.
  - The full +10% from `recommend` is still not supported, because the open kept comps are at our price and 1761224847419174970 is cutting.
  - **a-peak-check (P13): partly fixed.**
- **January (5-8 Jan):** **hold.** P50 / P25 of n=8 and on or above the lines.
- **Min 3 on 10-26 Dec** removes 2-night weekends, and the comps do not settle whether that is right.
  - Comp medians: £268 for 10-12 Dec (n=3) and £283.5 for 18-20 Dec (n=5).
  - Our 2-night Airbnb equivalent (PriceLabs x 0.90 + £150, per night) would be £279 / £291 (3064856 / 3090701) on 10-12 Dec and £277 / £289 on 18-20 Dec.
  - That is at or above the comps, so price does not argue for reopening min 2. It is a min-stay decision only, and I make no proposal.

## P10 Hanger Lane, 1-bed (3318177)
- No sellable nights. `reservations.csv` 10 Nov: a confirmed Airbnb stay 18 Oct-19 Nov covers every night up to the handback (policy last night 18 Nov).
- No PriceLabs edits (`get_user_logs`).
- No comps or positioning.

## P02 Ladbroke Grove, P03 Bayswater
Blocked on purpose (policy `intentional_blocks`). Both refreshed 10 Nov (`listings.csv`). No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or Smoobu (`kpi_summary.md` 10 Nov: collect-data; no `listings.csv` / `reservations.csv` rows). Own price, percentile, rating gap and premium: **NOT CHECKED**. No comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (comps and our displayed prices); the analysis is Airbnb only. Comp cancellation policies NOT CHECKED.
2. **P20 21-25 Nov paid 0.604 x PriceLabs vs the 0.765 Airbnb layer.** Cause NOT CHECKED: Smoobu rates were not pulled, and the guest-side breakdown was not seen.
3. **`user_price` differs from `price`** in the 10 Nov raw for P13 and P20; why is NOT EXPLAINED. Airbnb matches `price`.
4. **Thin comp coverage** (labelled; wider-sample or market percentiles used instead):
   - P13: n=1-2 on 13-15 Nov, 17 Nov, 27 Nov, 1 Dec and 11-15 Dec. Christmas is n=3, and those 3 are the cheap end of the set.
   - P20: n=1-2 on 13-15 Nov, 20-21 Nov and 5-6 Dec.
5. P13 and P20 PriceLabs raw ends 9 Jan, so 15-17 Jan uses the neighbourhood `final_price` (3064856 only).
6. **Comps' cleaning split is unknown**, so all-in gaps on 1-night stays (17 Nov, 27 Nov, 1 Dec, 20 Nov, 5 Dec) overstate ours.
7. The P13 Airbnb-to-Smoobu id mapping is "likely / probable" (policy `airbnb_listings_24oct`).
8. The P20 1-20 Dec override value before 9 Nov was not recorded (log shows only the new 0%).
9. P16, P18 and P19 have no data; P10 has no sellable nights.
