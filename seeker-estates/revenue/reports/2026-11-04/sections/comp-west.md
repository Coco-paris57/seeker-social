# Competitor positioning: WEST + HERTS (D = 2026-11-04)

Batch: P02, P03, P10, P13, P16, P18, P19, and P20 Waterford Court (P20 moved here from comp-east today).

**Sources.** I read `data/policy.json` first. All PriceLabs calls were read-only and made one at a time:
1. `get_user_logs`: listing log for 3064856, 3090701 and 3547481, 2-4 Nov.
2. `get_listing_prices` 3064856, 5 Nov-31 Dec. It returned the same numbers as `raw/prices_3064856.json`.
3. `get_neighbourhood_data` 3064856 (detail). Saved to `scratchpad/west04/dl/neigh_3064856.json`; 2-bed n=117, median 222.
4. `get_listing_date_overrides` 3064856, 4 Nov-31 Dec.
5. `get_neighbourhood_data` 3547481 (detail). Saved to `scratchpad/west04/dl/neigh_3547481.json`; n=152, median 249.

Smoobu, GET only:
- `/rates` for 3064856, 3090701 and 3547481. The Smoobu rate equals the PriceLabs `price` field on every night I checked, so `price` is what gets pushed.
- `/reservations` for 3547481 and 3064856. Guest fields were not kept.

**Airbnb:** public search pages checked 2026-11-04, plain `curl` with default headers. No bot check was met. Booking.com was not loaded.

**Method** (same as 3 Nov):
- Comp sets carried over unchanged: 11 ids for P13 (from the 3 Nov comp-west rows) and 12 ids for P20 (from the 3 Nov comp-east rows). **All 23 comps are active**, each returned on at least one stay today, so none was replaced.
- Search: 4 guests, entire home, at least 2 bedrooms. Each stay used a 1.3 km box around the PriceLabs coordinates plus a 0.2 km box around each comp.
- Price basis: Airbnb all-in total ÷ nights, with cleaning (£150 on ours) and fees included and no taxes shown separately. Comps and ours use the same basis. Stays of 5 nights or more are after length-of-stay discounts, ours and comps alike.
- Comp cancellation policy: NOT CHECKED.

**Occupancy** (Smoobu `reservations.csv` 4 Nov, cancelled excluded):

| Listing | 30 days (4 Nov-3 Dec) | 60 days | Market (kpi_pack) | kpi_pack forward_occ |
|---|---|---|---|---|
| P13 | 22/30 = 73.3% | 32/60 = 53.3% | 41% / 38% | 72.4% / 52.5% |
| P20 | 14/30 = 46.7% (50% excluding the 18-19 Nov block) | 15/60 = 25% | 36% / 30% | 44.8% / 23.7% |

**Rows written:**
- `data/snapshots/2026-11-04/comps.csv` already existed (another agent had copied it forward), so I appended **298 rows** under `flock .comps.csv.lock`: P13 11 comps × 14 stays and P20 12 × 12. Filter on `source` containing "checked 2026-11-04" and "comp-west"; the stay is in `source` (`date` is the check-in).
- Under `.channel_checks.csv.lock` I appended **34 rows** for our three Airbnb listings.

**Recompute check:** `snapshot.load('2026-11-04')` then `comp_summary` on P13 11-13 Nov gives n=6, median 207.5, P33 / -1.7% (3064856) and P83 / +6.0% (3090701). P20 13-16 Nov gives n=8, median 317, P12 / -28.7%. Both match the tables below.

## Comp tables (Airbnb all-in £/night, 4 guests, checked 2026-11-04)
- A figure in brackets is the same comp on the same stay on 3 Nov, shown where it moved by £1 or more.
- A blank cell means the comp was not returned for that stay (booked or min-stay).

#### P13

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6-8 Nov | 8-10 Nov | 10-12 Nov | 11-13 Nov | 8-13 Nov | 12-13 Nov | 17-18 Nov | 27-28 Nov | 1-2 Dec | 7-9 Dec | 11-13 Dec | 18-20 Dec | 23-26 Dec | 18-26 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.82 (11) | Garden view/balcony |  |  | 255 (258.5) |  |  |  |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | Paid parking on premises/Guest favourite |  | 207 |  | 207 |  |  |  |  |  | 274 |  |  |  |  |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking on premises |  | 208 (218) | 208 (218) | 208 (218) | 176.8 (186.8) |  |  |  |  | 237.5 |  |  |  |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  | 187.5 (208) | 185 (210.5) | 189.5 (215.5) | 142.4 (166) |  |  |  |  | 258 | 277 (276) | 269 | 232 | 202 (201) |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.78 (49) | Superhost | 218.5 (227) | 180 (189) | 192 (203.5) | 200 (206) | 157.4 (166.2) |  |  |  |  |  |  |  |  |  |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed |  |  |  |  |  |  | 200 |  |  |  |  |  |  |  |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  |  |  |  |  |  |  |  |  | 250 | 283.5 | 276 (273) | 246.33 (242.67) | 190.38 (187.38) |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift | 425.5 | 411 | 411 | 390.5 (411) | 385.2 |  |  |  |  | 433.5 |  | 450 |  |  |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking on premises |  | 217 | 217 | 217 | 199 |  |  |  |  | 259 |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | Lift/Paid parking on premises/balcony/Guest favourite |  |  |  |  |  | 403 |  | 394 | 423 |  |  | 331.5 |  |  |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking on premises |  |  |  |  |  |  | 200 |  |  |  |  |  |  |  |
| **Comp median (n)** | | | 4.78 (13) | | **322** (2) | **207.5** (6) | **212.5** (6) | **207.5** (6) | **176.8** (5) | **403** (1) | **200** (2) | **394** (1) | **423** (1) | **258.5** (6) | **280.25** (2) | **303.75** (4) | **239.17** (2) | **196.19** (2) |
| Wider 2-bed sample median (n) | | | | | 264.5 (9) | 229.25 (18) | 245 (19) | 235.5 (20) | 257.6 (24) | 312.5 (2) | 200 (5) | 344.5 (4) | 423 (1) | 258.5 (18) | 320 (14) | 301 (13) | 288 (23) | 292 (19) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.67 (9)** | | | | | not returned | **212** | **216.5** | **220** | **178.8** (strike £977 -> £894) | not returned | **316** | **336** | **323** | **266** | **290** | **283** | **256** | **194.12** (strike £1,800 -> £1,553) |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | | | | not returned | **197** | **200.5** | **204** | **162.2** (strike £885 -> £811) | not returned | **298** | **407** | **388** | **255.5** | **277.5** | **271.5** | **245** | **184.5** (strike £1,710 -> £1,476) |

#### P20

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6-9 Nov | 10-13 Nov | 13-16 Nov | 16-18 Nov | 16-19 Nov | 20-23 Nov | 22-25 Nov | 5-8 Dec | 11-14 Dec | 18-21 Dec | 21-24 Dec | 23-27 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost | 281 | 283 (281) | 281 (283) |  | 281 | 283.33 (281.67) | 281 | 281 | 281 (282.33) | 281 | 281 | 280.75 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises |  |  | 300.67 (295) |  | 299.33 (296.33) |  |  |  | 270.67 (272) | 267.67 |  |  |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises |  |  |  | 403.5 | 393.33 (434.67) | 393.33 |  |  |  |  | 393.33 | 388.5 |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (55) | Lift |  | 340.67 (399.33) | 337.33 (395) |  | 330.33 (371) | 340.33 (353) | 340.67 (339) | 379.33 (391) | 406.33 (413.67) | 385.67 (392.33) | 405 | 401.5 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | 410.33 (424) | 424 | 382.67 (424) |  | 382.67 (424) | 382.67 | 382.67 | 382.67 | 382.67 | 382.67 | 382.67 | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony |  |  |  |  |  | 353 | 337 | 392.33 | 463.67 | 479 | 446.67 | 505.75 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises |  |  |  | 281.5 | 261.67 (286) | 276.33 | 261.67 |  | 276.33 |  | 261.67 | 262.5 |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony | 357 (368.67) | 368.67 | 333.33 (368.67) |  | 333.33 (368.67) | 333.33 | 333.33 | 333.33 | 333.33 | 333.33 | 333.33 | 329.75 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost |  | 182 (199) | 197.33 (208.33) | 214.5 | 201.67 (210) | 219.67 | 220.33 (224.67) |  |  |  | 242 | 242.75 |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.65 | 5 | 4.37 (38) | Paid parking on premises | 379 | 379 | 379 | 384 | 379 | 379 | 379 |  |  |  | 379 | 376.5 |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises |  |  |  | 264 | 250 (274.33) |  | 250 |  | 250 | 250 |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 290 | 250 | 290 | 270 | 250 | 290 | 263.33 | 283.33 | 290 | 312 | 370 | 360 |
| **Comp median (n)** | | | 4.8 (18) | | **357** (5) | **340.67** (7) | **317** (8) | **275.75** (6) | **299.33** (11) | **336.83** (10) | **307.16** (10) | **356.33** (6) | **290** (9) | **322.66** (8) | **374.5** (10) | **368.25** (10) |
| Wider 2-bed sample median (n) | | | | | 285.5 (12) | 293.66 (18) | 295.34 (16) | 267 (18) | 270 (24) | 292.67 (19) | 263.33 (23) | 341.33 (11) | 333.33 (19) | 326.66 (16) | 370 (21) | 375.5 (22) |
| **Ours 3547481 (Airbnb 1791529331262420081) New, 0 reviews** | | | | | **212** | not returned | **226** | **251.5** | not returned | **278.67** | **278** | **284.67** | **296** | **287.67** | **301** | **297.75** |

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### What changed since 3 Nov 06:00Z
Source: `get_user_logs`, confirmed by `get_listing_date_overrides`. All edits were Reyhan's, at 01:26-01:27Z on 4 Nov, and each was copied to child 3090701.

**1. 8-12 Nov override is now -7%, min 2** (was -5%).
- This is still the same conflict: **policy `price_changes` 24 Oct sets 8-12 Nov at 0%.**
- It is reported for Corentin to confirm, not as a new proposal. **a-p13-record: not fixed, and moved further from policy.**

**2. The pushed price rose anyway.**

| | 8 Nov | 9 Nov | 10 Nov | 11 Nov | 12 Nov |
|---|---|---|---|---|---|
| 3064856 pushed `price` = Smoobu `/rates`, 3 Nov | 141 | 150 | 151 | 150 | 151 |
| 3064856 pushed, 4 Nov | **160** | **158** | **162** | **166** | **170** |
| 3090701 pushed, 3 Nov | 171 | 183 | 183 | 183 | 183 |
| 3090701 pushed, 4 Nov | **180** | **178** | **182** | **187** | **191** |

- PriceLabs "Your Price" (`user_price` / `booked_price`) did fall, in line with the -7%: 3064856 8 Nov 148 → 140.
- But the pushed `price` no longer equals "Your Price": it is 160 against 140 on 8 Nov, while on 3064856 7-26 Dec `price` is 5-7% *below* "Your Price".
- The cause was NOT CHECKED (PriceLabs agent). On Airbnb, our 8-13 Nov stays rose 1-8% (table below).

**3. 21-26 Dec is now -5%, min 3** (was -3%).

**4. January 2-31 is -10% with min 3, and February is -10%.** No comps were priced for these months.

**Unchanged** (`get_listing_date_overrides`): 17 Nov +35% min 1; 27 Nov +50% min 1; 1 Dec +50% min 1 (intentional per policy); 7-20 Dec -5%. Base is still 250 / 250 (`listings.csv`; PriceLabs recommends 237 / 236).

### Price percentile, rating, review gap, supported positioning
**Rating and reviews:**
- Comp median **4.78** with **13** reviews. One comp (1014671215040555613) gained a review (4.76, 17).
- 3090701: **4.67 (9)**, -0.11 vs the median and 4 reviews behind. `quality_premium` = **-0.044**.
- 3064856: **4.31 (13)**, -0.47 vs the median and level on reviews. `quality_premium` = **-0.15** (capped).

**How to read the table:**
- "PL vs P50" compares the pushed PriceLabs `price` with the PriceLabs 2-3 BR daily market P50 for the same nights (`neigh_3064856.json`).
- `recommend` uses the comp percentile where n ≥ 3. Where n < 3 it uses the market percentile (marked mkt).
- Demand lead: +32 pts (73.3% vs 41%) for stays under 30 days out, +15 pts (53.3% vs 38%) for the rest.

| Stay | Listing | Airbnb 4 Nov (3 Nov) | Comp median (n) | Comp pctl / vs median | Wider pctl (n) | PL vs P50 | `recommend` |
|---|---|---|---|---|---|---|---|
| 8-10 Nov | 3090701 | **212** (210.5) | 207.5 (6) | P67 / **+2.2%** | P28 (18) | 179 vs 204.5 (-12.5%) | raise +10% |
| | 3064856 | **197** (186.5) | 207.5 (6) | P33 / **-5.1%** | P11 | 159 vs 204.5 (-22%, below P25 167.5) | raise +10% |
| 10-12 Nov (Tue-Thu) | 3090701 | **216.5** (215) | 212.5 (6) | P50 / **+1.9%** | P37 (19) | 184.5 vs 206 (-10%) | raise +10% |
| | 3064856 | **200.5** (190.5) | 212.5 (6) | P33 / **-5.6%** | P21 | 164 vs 206 (-20%, below P25 166.5) | raise +10% |
| 11-13 Nov (12 Nov) | 3090701 | **220** (215) | 207.5 (6) | P83 / **+6.0%** | P40 (20) | 189 vs 209 (-10%) | raise +5% |
| | 3064856 | **204** (190.5) | 207.5 (6) | P33 / **-1.7%** | P20 | 168 vs 209 (-20%, below P25 171.5) | raise +10% |
| 8-13 Nov (5n, LOS disc.) | 3090701 | **178.8** (176.4) | 176.8 (5) | P60 / +1.1% | P17 (24) | 183.6 vs 206.6 (-11%) | raise +10% |
| | 3064856 | **162.2** (150.4) | 176.8 (5) | P40 / -8.3% | P8 | 163.2 vs 206.6 (-21%) | raise +10% |
| 17 Nov (1n) | 3090701 | 316 (309) | 200 (2) | P100 / +58% (n=2) | P80 (5) | 217 vs 207 (+5%) | mkt: raise +10% |
| | 3064856 | 298 (281) | 200 (2) | P100 / +49% (n=2) | P80 | 193 vs 207 (-7%) | mkt: raise +10% |
| 27 Nov (1n) | 3090701 | 336 (337) | 394 (1) | P0 / -15% (n=1) | P25 (4) | 243 vs 238 (+2%) | mkt: raise +10% |
| | 3064856 | 407 (408) | 394 (1) | P100 / +3% (n=1) | P100 | **335 vs 238 (+41%, above P75 302)** | mkt: raise +5% |
| 1 Dec (1n) | both | 323 / 388 | 423 (1) | P0 (n=1) | n=1 | 225 / 310 vs 226 | intentional (policy), no proposal |
| 7-9 Dec (30-day stand-in) | 3090701 | **266** | 258.5 (6) | P67 / **+2.9%** | P56 (18) | 212 vs 232 (-9%) | raise +10% |
| | 3064856 | **255.5** | 258.5 (6) | P33 / **-1.2%** | P39 | 200.5 vs 232 (-14%) | raise +10% |
| 11-13 Dec | 3090701 | 290 (290.5) | 280.25 (2) | P100 / +3.5% (n=2) | P36 (14) | 238.5 vs 243.5 (-2%) | mkt: raise +10% |
| | 3064856 | 277.5 (290.5) | 280.25 (2) | P50 / -1.0% (n=2) | P29 | 225 vs 243.5 (-8%) | mkt: raise +10% |
| 18-20 Dec | 3090701 | **283** (287.5) | 303.75 (4) | P50 / **-6.8%** | P38 (13) | 231 vs 249.5 (-7%) | raise +10% |
| | 3064856 | **271.5** (287.5) | 303.75 (4) | P25 / **-10.6%** | P31 | 218 vs 249.5 (-13%) | raise +10% |
| 23-26 Dec | 3090701 | 256 (259) | 239.17 (2) | P100 / +7.0% (n=2) | **P13 (23; median 288)** | 228.7 vs 269 (-15%) | mkt: raise +10% |
| | 3064856 | 245 (259) | 239.17 (2) | P50 / +2.4% (n=2) | **P4** | 216.3 vs 269 (-20%) | mkt: raise +10% |
| 18-26 Dec (8n, weekly) | 3090701 | 194.12 (196.75) | 196.19 (2) | P50 / -1.1% (n=2) | **P5 (19; median 292)** | 229.1 vs 259.6 (-12%) | mkt: raise +10% |
| | 3064856 | 184.5 (196.75) | 196.19 (2) | P0 / -6.0% (n=2) | **P0** | 216.6 vs 259.6 (-17%) | mkt: raise +10% |

**Next 14 days:**
- The only open nights in 5-18 Nov are 8-12 Nov and 17 Nov.
- 5-7 Nov are linked-booked: 3090701 is booked by the Airbnb 4-8 Nov stay and 3064856 is blocked to match.
- 13-16 Nov are booked or linked-blocked, and 18 Nov onwards is booked.
- The 6-8 Nov Fri-Sun is therefore a comp activity check only. Two comps returned, at 218.5 and 425.5.

**Comps eased for 8-13 Nov:** on the same comp and stay, the median move vs 3 Nov is -2% to -5%:
- 1568189670839493789: 208 → 187.5 (8-10 Nov).
- 1436773605049626293: 218 → 208.
- 1411449348357673454: about -5%.

**Supported positioning (one line each):**
- **3090701: quality line -4% vs comp median; the +32 pt demand lead supports sitting above it.** It is at **+2% to +6%** on the November 2-night stays (P50-P83). `recommend` says raise +5% to +10%, so **no further cut is supported**.
- **3064856: quality line -15% vs comp median (capped).** It is at **-2% to -6%** (P33) in November, which is 9-13 pts above its line. The PriceLabs price is still **below market P25 on 8, 10, 11 and 12 Nov**. Demand (+32 pts) supports holding it there, and `recommend` says raise +10%.
- **Evidence vs the 8-12 Nov override:** the comps and the demand lead support **policy's 0%**, not Reyhan's -7%. Removing the -7% would put us at roughly +8% / +2% vs the comp median, which is inside what `recommend` supports. This goes to Corentin as a conflict.

### Focus: 12 Nov (a-raise-1012nov: P13 12 Nov ≥ £176, min 1)
**Market:**
- 12 Nov P25 176, **P50 212**, P75 279; occupancy **42.5%**, against 34.8% on 11 Nov and 38.7% on 10 Nov. That is a mild lift on the night.
- The comps show no event premium on 11-13 Nov: median 207.5, against 212.5 on 10-12 Nov.

**Our prices:** **3064856 £170** (below P25 176), 3090701 £191. Both still have **min 2**.

**12 Nov cannot sell as a single night:**
- 13 Nov is linked-blocked (3064856) / booked (3090701).
- So 12 Nov can only sell as the last night of an 11-13 Nov (or longer) stay.
- Neither listing was returned for 12-13 Nov. The only comp returned for that single night was 1205241472054931937 at £403 (5.0, lift, balcony, Guest favourite), n=1.

**Status: NOT fixed.** 3064856 is £6 under the £176 target, and min 1 is not set.

**Evidence-supported level** (P50 212 × (1 + quality)): 3064856 about **£180**, 3090701 about **£203**.

### Focus: Christmas 18-26 Dec (a-peak-check, P13 part)
**Overrides:**
- 18-20 Dec: -5%.
- 21-26 Dec: **-5% from today** (was -3%), still **min 3**.
- 27 Dec: 3090701 booked (27 Dec-3 Jan), 3064856 blocked.

So **25 and 26 Dec arrivals are still impossible** (min 3 runs into 27 Dec). Not fixed.

**Evidence:**
- 23-26 Dec: we are at **P13 / P4 of the wider 2-bed sample** (median £288, n=23). PriceLabs is **-15% / -20% vs market P50**.
- 18-20 Dec: -7% / -11% vs the 4 comps.
- Market occupancy on 21-27 Dec is 39-48%, against 21-33% at the same time last year (`neigh_3064856.json`).

**Quality-supported 23-26 Dec PriceLabs level** (P50 269 × (1 + q)): 3090701 about **£257** vs 229 now (about 12% under); 3064856 about **£229** vs 216 now (about 6% under).

**Conclusion:** the extra -2 pts Reyhan added today runs against both the comps and the market. No standing decision covers December prices, so the evidence supports **removing the 21-26 Dec cut (raise +10% per `recommend`)**.

### Twin listings (a-p13-twin)
**Fixed in what Airbnb shows.**
- The pushed December prices now differ by £11-14/night: 3064856 is about 5% lower (for example 11 Dec 225 vs 239, 23 Dec 223 vs 236).
- Airbnb December totals now differ too: 7-9 Dec £511 vs £532, 18-20 Dec £543 vs £566, 23-26 Dec £735 vs £768.
- **Risk:** this did not come from an override. PriceLabs "Your Price" is still identical on both listings across 7-26 Dec, so the gap depends on the pushed-price behaviour in change 2 above.

### 17 Nov, 27 Nov and 1 Dec singles
**17 Nov:**
- PriceLabs is 217 / 193 against P50 207. The only comps are 2 at £200 all-in (sleeps 7).
- Our £316 / £298 all-in carries the full £150 cleaning on one night.
- Hold. At the line in effect.

**27 Nov:**
- 3064856 is at PriceLabs **335 = +41% vs P50** (above P75), against a quality line of about £202 (238 × 0.85).
- Its Airbnb £407 sits just above the single comp (£394, 5.0, Guest favourite, lift, balcony).
- **a-p13-orphan-price: still not fixed** on 3064856. 3090701 is at P50 (243).

**1 Dec:** intentional (policy `intentional_overrides`). No proposal.

### Airbnb factor (for the channel section)
Our Airbnb all-in minus £150 cleaning, divided by the pushed PriceLabs price:
- P13: **0.765** within 28 days and **0.90** beyond. 8-13 Nov and 18-26 Dec are 0.81 / 0.765 after the length-of-stay discount.
- **P20 shows the same pattern:** 0.765 on 6-25 Nov, including 20-23 Nov (16 days out) and 22-25 Nov (18 days out), and 0.90 on December stays.

Policy `P20.airbnb_discounts_22oct` records last-minute -15% for 0-14 days only. A 0.765 at 16-18 days out does not match that window. This is inferred from totals; the Smoobu/Airbnb rules screen was not read.

## P20 Waterford Court, 2-bed, max 4 (Airbnb 1791529331262420081, New, 0 reviews)

### What changed since 3 Nov 06:00Z
**PriceLabs** (`get_user_logs`, Reyhan, 01:29-01:30Z on 4 Nov):
- **16-19 Nov: -5% with min 2** (was -2%, min 2).
- **21-26 Dec: -5%** (new).
- **January: -10%, min 3.**
- **February: -7%, min 4.**
- Base is still **330** and min 200 (`listings.csv`).

**Smoobu** (`/reservations`):
- A **"Blocked channel" booking for 18-20 Nov was created 3 Nov 10:31**.
- The earlier 20-22 Nov block was **cancelled on 30 Oct 18:11**.

So 18-19 Nov are blocked, and **20-22 Nov is open and selling on Airbnb at £836 for 20-23 Nov.**

**Conflicts for Corentin to confirm** (reported, not proposed):
- **Delivery block dates:** policy `listing_facts.P20.block_20_21_nov` says the delivery block is 20-22 Nov, but the live block is 18-20 Nov. Corentin to confirm whether the delivery moved. **t-p20-delivery: changed but not as recorded.**
- **Min stay 2 on 16-17 Nov** vs policy `min_stay` "3 nights from 25 Oct to 30 Nov". Only 16-18 Nov can now sell as a 2-night stay. Not fixed.
- **Base 330 vs Corentin's 350** (policy `price_24oct`). Not fixed.
- **The -5% on 16-19 Nov now matches Corentin's -5% for 31 Oct-19 Nov.** Reyhan's 2 Nov -5% on 6-24 Nov runs 5 days past 19 Nov (20-24 Nov).

### Price percentile, rating, review gap, supported positioning
**Rating and reviews:**
- Comp median **4.80** with **18** reviews.
- We have **no rating and 0 reviews**, so we are 18 reviews behind.
- `quality_premium` returns **0.0** because there is no rating. The 0-review gap is not priced by the function.

**How to read the table:**
- Lead: Smoobu occupancy **+10.7 pts** over 30 days (46.7% vs 36%).
- Over 60 days it is **-5.0 pts** (25% vs 30%). With kpi_pack's 23.7% it would be -6.3 pts, which switches `recommend` from hold to fix-listing on December stays (borderline).
- "PL vs P50" is the pushed price against the PriceLabs 2 BR daily market P50 (`neigh_3547481.json`).

| Stay | Airbnb 4 Nov (3 Nov) | Comp median (n) | Pctl / vs median | Wider pctl (n) | PL vs P50 | `recommend` (comp) |
|---|---|---|---|---|---|---|
| 6-9 Nov (Fri-Mon, min 3) | **212** (226) | 357 (5) | **P0 / -40.6%** | P17 (12) | 211.7 vs 212.3 (0%) | raise +10% |
| 13-16 Nov | **226** (234.67) | 317 (8) | **P12 / -28.7%** | P6 (16) | 229.7 vs 212.3 (+8%) | raise +10% |
| 16-18 Nov (2n, min 2) | **251.5** | 275.75 (6) | P17 / -8.8% | P39 (18) | 230.5 vs 209 (+10%) | raise +10% |
| 16-19 Nov | not bookable (18-19 blocked) | 299.33 (11) | - | - | - | - |
| 20-23 Nov | **278.67** (274.67) | 336.83 (10) | P20 / -17.3% | P37 (19) | 298.7 vs 213 (+40%) | raise +10% |
| 22-25 Nov | **278** (263.33) | 307.16 (10) | P40 / -9.5% | P57 (23) | 298 vs 210.7 (+41%) | raise +10% |
| 5-8 Dec (30-day) | **284.67** (286.67) | 356.33 (6) | P33 / -20.1% | P27 (11) | 260.7 vs 224 (+16%) | raise +5% (mkt: hold) |
| 11-14 Dec | **296** (290) | 290 (9) | P56 / +2.1% | P37 (19) | 273.3 vs 224 (+22%) | hold |
| 18-21 Dec | **287.67** (289.33) | 322.66 (8) | P38 / -10.8% | P38 (16) | 264 vs 233.7 (+13%) | raise +5% (mkt: hold) |
| 21-24 Dec | **301** | 374.5 (10) | P30 / -19.6% | P14 (21) | 278.7 vs 237.7 (+17%) | raise +5% (mkt: hold) |
| 23-27 Dec | **297.75** | 368.25 (10) | P30 / -19.1% | P18 (22) | 289 vs 253.5 (+14%) | raise +5% (mkt: hold) |

**Comp moves:** several comps cut 6-19 Nov back to their 2 Nov levels, so the same-comp median move on 16-19 Nov is **-8.5%** (n=11):
- 1316210326145130709: 399 → 341.
- 27538942: 424 → 383.
- 51380799: 369 → 333.
- 789954794593691037: 435 → 393.
- 790672189611831800: 286 → 262.
- 757342335233586120: 274 → 250.

Other stays are flat (median change 0%).

### The 10-13 Nov booking vs comps
- **Booking** (`reservations.csv`, Airbnb, booked 2 Nov): room **£510 = £170/night**, room only, with £150 cleaning on top.
- **What guests saw on 2 Nov:** £691 all-in = **£230.33/night** (per the 3 Nov comp-east section). PriceLabs had 231 + 236 + 242 = 709 for those nights (3 Nov `prices.csv`), so room ÷ PriceLabs = 0.72.
- **Comps for 10-13 Nov, still bookable today** (n=7): 182, 250, 283, 340.67, 368.67, 379 and 424. **Median £340.67**, down from 368.67 yesterday because 1316210326145130709 cut to 340.67 and 1516006875488990547 to 182.
- **Position:** **P14, -32.4% vs median.** Only the £182 comp (4.76/17, Superhost, river view, lift) is cheaper.
- **Reading:** the stay sold at the bottom of the set, as yesterday. No change is proposed for a booked stay.

### Supported positioning (P20)
**November: about -15% vs comp median** (the level the 0-review gap justified on 3 Nov; `quality_premium` itself gives 0.0). `recommend` says raise +10% on every November stay. By stay:
- **6-9 Nov (-41%, P0)** and **13-16 Nov (-29%, P12)** are well below that line. Steps to about **£300 / £270 all-in** are supported by the comps.
  - Caveat: 6-9 Nov starts in 2 days. Only 5 of 12 comps were bookable (the rest probably booked), and PriceLabs is already at market P50.
  - So the gap there is visibility of a 0-review listing as much as price.
- **16-18 Nov (-9%), 20-23 Nov (-17%) and 22-25 Nov (-10%)** are at or above the line: hold.
  - 20-23 Nov depends on the delivery-block question above.

**December: hold** (-20% to +2% vs comps, but PriceLabs is +13% to +22% above market P50; `recommend` is borderline hold / raise +5%).
- Reyhan's new **-5% on 21-26 Dec** is not supported. We are already -19% to -20% vs the comps there, and the comps are not cutting.
- No standing decision covers December. The evidence supports **removing that cut**, not deepening it.

## P10 Hanger Lane, 1-bed (3318177)
**0 sellable nights.** `prices.csv` 4 Nov shows 5-18 Nov all booked and 19 Nov onwards blocked (policy `handbacks`, last night 18 Nov).

No comps or positioning: there is nothing to price. Unchanged.

## P02 Ladbroke Grove, P03 Bayswater
Both are blocked on purpose (policy `intentional_blocks`). No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
None of the three is in PriceLabs or Smoobu (`kpi_pack` 4 Nov: `in_smoobu` false, no PriceLabs data), so we have no price of our own.

Percentile, rating gap and premium are **NOT CHECKED**; no comps were built.

## Data gaps:
1. **Booking.com was NOT CHECKED**, for both comps and our prices; everything here is Airbnb only. Comp cancellation policies were also NOT CHECKED.
2. **Comp coverage is thin** on some stays, which lean on market or wider-sample percentiles (labelled):
   - P13 n=1-2 on 6-8 Nov, 12-13 Nov, 17 Nov, 27 Nov, 1 Dec, 11-13 Dec, 23-26 Dec and 18-26 Dec.
   - P20 n=5-6 on 6-9 Nov, 16-18 Nov and 5-8 Dec.
3. **Pushed PriceLabs `price` ≠ "Your Price" (`user_price`)** on 3064856, 3090701 and 3547481: -7% to +14%. On 3064856 8 Nov it is 160 against 140, so Reyhan's -7% is not visible in what Smoobu and Airbnb receive. The cause was NOT CHECKED.
4. **The Airbnb 0.765 / 0.90 factor is inferred** from totals. The Smoobu/Airbnb rules screens were not read.
5. **The comps' cleaning split is unknown,** so all-in comparisons on 1-night stays (17 Nov, 27 Nov, 1 Dec) overstate our gap.
6. **P20's 10-13 Nov guest price is the 2 Nov display,** not a fresh read, because the stay is booked. Airbnb's guest fee on that booking is not in Smoobu.
7. **P20 delivery-block dates are unconfirmed** (18-20 Nov live vs 20-22 Nov in policy).
8. **The Airbnb-to-Smoobu id mapping for P13 is "likely / probable"** (policy `airbnb_listings_24oct`).
9. **January and February overrides** (P13 -10%, P20 -10% / -7% with min 3-4) have no comp check.
10. **P16, P18 and P19 have no data.** P10 has no sellable nights.
