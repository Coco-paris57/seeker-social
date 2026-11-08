# Competitor positioning: WEST + HERTS (D = 2026-11-08)

Batch: P02, P03, P10, P13, P16, P18, P19 and P20 Waterford Court.

**Sources.** I read `data/policy.json` first. All PriceLabs calls were read-only and returned 200:
1. `get_user_logs` (listing log, 6-8 Nov) for 3064856, 3090701, 3547481 and 3318177: **7 entries, all Reyhan, 7 Nov 12:30:10-12:33:01Z**. Details are under "What changed" below.
2. `get_listing_date_overrides` for 3064856 and 3547481 (8 Nov-31 Dec). I sent the 3064856 call in parallel with `get_user_logs` by mistake. Both returned 200, so no data was affected.
3. `get_neighbourhood_data` (detail, future prices + occupancy) for 3064856 (2 BR n=117, P25/P50/P75 191/224/277) and 3547481 (2 BR n=153, 214/251/320). Saved to `scratchpad/west08/dl/neigh_*.json`.

**Own prices:** `raw/prices_*.json` in snapshot 2026-11-08, refreshed 7 Nov 12:30-12:34Z, which is the same time as the push (`listings.csv` last_push P13 12:30:42Z, P20 12:33:57Z). The 8 Nov raw file starts on 9 Nov, so the 8 Nov night uses the 7 Nov raw. Smoobu `/api/rates`: NOT CHECKED today.

**Airbnb:** public search and listing pages, checked 2026-11-08 with plain `curl` and default headers. No bot check was met. **Booking.com: NOT CHECKED.**

**Method (same as 3-7 Nov):**
- 4 guests, entire home, at least 2 bedrooms.
- Search area: a box of about 1.3 km around the PriceLabs coordinates, plus a box of about 0.2 km around each comp.
- Price = Airbnb all-in total / nights, with cleaning and Airbnb fees INCLUDED (taxes are not shown separately). Ours are priced on the same basis (£150 cleaning).
- Our Booking.com and Airbnb bookings are shown as (room + cleaning) / nights from `reservations.csv`.
- Comp cancellation policies: NOT CHECKED.

**Comp sets: no replacements.** All 11 P13 comps and all 12 P20 comps were returned on at least one stay today.

**Ratings:**
- Ours: 3090701 4.7 (10), 3064856 4.31 (13), P20 New with 0 reviews. All unchanged.
- Comp median: P13 **4.78** (13 reviews); P20 **4.8** (17.5 reviews). 1316210326145130709 went from 55 to 56 reviews.

**Occupancy** (Smoobu `reservations.csv` 8 Nov, cancelled bookings excluded; market from `pl_kpis.csv` 8 Nov):

| Listing | 30 d (8 Nov-7 Dec) | 60 d (8 Nov-6 Jan) | Market 30 / 60 | Lead 30 / 60 |
|---|---|---|---|---|
| P13 (one flat) | 22/30 = **73.3%** | 31/60 = **51.7%** | 44% / 39% | **+29 / +13 pts** |
| P20 | 15/30 = **50.0%** | 28/60 = **46.7%** | 38% / 31% | **+12 / +16 pts** |

Both 60-day leads are now 10 pts or more, so `recommend` returns **"raise +10%"** for every stay priced below P75.

**Rows written:**
- **367 rows** appended to `data/snapshots/2026-11-08/comps.csv` (P13: 11 comps x 17 stays; P20: 12 comps x 15 stays).
- **32 rows** appended to `channel_checks.csv` (our three Airbnb listings).
- Both appends ran under `flock` (`.comps.csv.lock` / `.channel_checks.csv.lock`). Other agents had already copied both files forward from 7 Nov.
- To find these rows, filter `source` on "checked 2026-11-08" and "comp-west". The `date` column is the check-in; the full stay is in `source`.

**Recompute check** (`snapshot.load('2026-11-08')` + `comp_summary`):
- P13 10-12 Nov: n=3, median 246.5, P33 / -15.2%.
- P13 7-10 Dec booking (211.73): n=7, median 259, P14 / -18.3%.
- P20 6-14 Dec booking (205.53): n=7, median 284.25, **P0 / -27.7%**.
- P20 20-23 Nov: n=8, median 307, P0 / -20.8%.

## Comp tables (Airbnb all-in £/night, 4 guests, checked 2026-11-08)
A figure in brackets is the same comp's price for the same stay on 7 Nov, shown where it moved by £1 or more. A blank cell means the comp was not returned for that stay (booked or min-stay). "Not returned" for ours means the stay is booked or blocked by min-stay.

#### P13

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 8-10 Nov | 9-11 Nov | 10-12 Nov | 11-13 Nov | 8-12 Nov | 9-12 Nov | 12-13 Nov | 13-15 Nov | 17-18 Nov | 27-28 Nov | 7-9 Dec | 7-10 Dec | 11-13 Dec | 18-20 Dec | 20-25 Dec | 23-26 Dec | 24-27 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.82 (11) | Garden view/balcony |  |  | 246.5 (257.5) |  |  |  |  |  |  |  |  | 267.33 |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | Paid parking on premises/Guest favourite | 207 |  |  | 207 |  |  |  |  |  |  | 278.5 (271) | 259 |  |  |  |  |  |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | Free parking on premises |  |  |  |  |  |  |  |  |  |  | 238.5 (232.5) | 219.67 |  |  |  |  |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | Private back garden |  |  |  |  |  |  |  |  |  |  |  |  |  | 279.5 | 219.2 | 243.67 | 249 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.78 (49) | Superhost | 178 |  |  |  |  |  |  |  |  |  |  | 283 |  |  |  |  |  |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed |  |  |  |  |  |  |  |  | 185 |  |  |  |  |  |  |  |  |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.76 (17) | none listed |  |  |  |  |  |  |  |  |  |  | 233.5 (238.5) | 208.67 | 283.5 (284.5) | 270.5 | 221 (216.4) | 252 (249.33) | 253.67 (251.33) |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift |  | 411 | 411 | 411 |  | 396.67 |  | 425.5 |  |  | 446.5 (433.5) | 428 |  | 450 |  |  |  |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.9 | 5 | 4.61 (82) | Paid parking on premises | 188.5 (217) | 188.5 | 188 (225) | 188 (225) | 173.25 (206) | 178.33 |  |  |  |  | 259 | 249 |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | Lift/Paid parking on premises/balcony/Guest favourite |  |  |  |  |  |  | 403 |  |  | 394 |  |  |  | 331.5 |  |  |  |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | Paid parking on premises |  |  |  |  |  |  |  |  | 185 |  |  |  |  |  |  |  |  |
| **Comp median (n)** | | | 4.78 (13) | | **188.5** (3) | **299.75** (2) | **246.5** (3) | **207** (3) | **173.25** (1) | **287.5** (2) | **403** (1) | **425.5** (1) | **185** (2) | **394** (1) | **259** (5) | **259** (7) | **283.5** (1) | **305.5** (4) | **220.1** (2) | **247.83** (2) | **251.33** (2) |
| Wider 2-bed sample median (n) | | | | | 213 (10) | 229 (9) | 260 (13) | 230.75 (14) | 279.5 (9) | 292.33 (13) | 249 (4) | 324.5 (11) | 185 (5) | 337.5 (4) | 259 (19) | 259 (27) | 343 (13) | 298.25 (12) | 289.2 (15) | 309.5 (20) | 325.5 (16) |
| **Ours 3090701 (Airbnb 1587576514709814818) 4.7 (10)** | | | | | **219.5** | **206** | **209** | **212** | **184** | **182.67** | not returned | not returned | **309** | **359** | not returned | not returned | **295.5** | **287.5** | **216** (strike £1,184 -> £1,080) | **255.67** | **254** |
| **Ours 3064856 (Airbnb 1571600691689064213) 4.31 (13)** | | | | | **219.5** | **206** | **209** | **212** | **184** | **182.67** | not returned | not returned | **309** | **404** | not returned | not returned | **283** | **275.5** | **206** (strike £1,128 -> £1,030) | **244.67** | **243** (strike £810 -> £729) |

#### P20

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 8-10 Nov | 13-16 Nov | 16-18 Nov | 20-23 Nov | 5-6 Dec | 5-8 Dec | 6-14 Dec | 7-10 Dec | 7-14 Dec | 11-14 Dec | 14-17 Dec | 19-26 Dec | 21-24 Dec | 23-27 Dec | 26-30 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost |  | 281 |  | 281 |  | 281 | 253.5 | 281 | 254 | 281 | 281 | 254 | 281 | 279 | 281.5 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises |  |  |  |  |  |  | 284.25 | 335.33 (341.67) | 286.71 (282.86) | 334 (328) |  |  |  |  |  |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises | 347 |  |  |  |  |  |  | 393.33 |  |  | 393.33 |  | 393.33 | 388.5 |  |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (56) | Lift |  | 319 |  | 324 (329) |  | 360.33 (361.33) | 355.25 | 361 (366) | 361.57 (364.29) | 413 (412) | 342 | 386.29 | 417.33 (422.33) | 414 (412.25) | 499.75 (503) |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony |  | 424 |  | 382.67 |  | 382.67 | 339.12 | 382.67 | 339.71 | 382.67 | 382.67 | 339.71 | 382.67 | 380.25 | 380.25 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony |  |  |  | 338.67 | 567 | 392.33 |  |  |  | 463.67 | 425.67 | 441 | 446.67 | 505.75 | 595.5 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises |  |  | 281.5 | 276.33 |  |  | 236.5 | 261.67 | 238.57 | 276.33 | 261.67 |  | 261.67 | 262.5 | 257 |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony |  | 368.67 |  | 333.33 |  | 333.33 | 292.75 | 333.33 | 293.43 | 333.33 | 333.33 | 293.43 | 333.33 | 329.75 | 329.75 |
| [6488364](https://www.airbnb.co.uk/rooms/6488364) | 0.61 | 4 | 4.5 (16) | Lift/Paid parking on premises/balcony (replaces 1384811870668527117, inactive next 60 days) |  |  |  | 281.33 (283.33) |  |  |  |  |  | 358.33 | 304 | 319.57 (323.29) | 346.33 (355.33) | 367.75 (360.5) | 439.75 (442) |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost | 188 |  |  |  |  |  |  |  |  |  | 218.67 |  | 244 (245.33) | 244.25 | 326.75 (330.75) |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises | 288.5 |  | 264 |  |  |  |  | 250 |  |  | 250 |  |  |  |  |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 290 | 290 | 270 | 290 |  | 283.33 | 255 | 270 | 255.71 | 290 | 306 | 330.14 | 370 | 360 | 360 |
| **Comp median (n)** | | | 4.8 (18) | | **289.25** (4) | **319** (5) | **270** (3) | **307** (8) | **567** (1) | **346.83** (6) | **284.25** (7) | **333.33** (9) | **286.71** (7) | **334** (9) | **306** (11) | **330.14** (7) | **358.16** (10) | **363.88** (10) | **360** (9) |
| Wider 2-bed sample median (n) | | | | | 272 (13) | 302.34 (12) | 267 (14) | 290 (13) | 567 (1) | 333.33 (11) | 279.75 (14) | 284.67 (21) | 284.28 (14) | 336.16 (16) | 284.33 (29) | 330.14 (15) | 358.16 (22) | 363.88 (20) | 384.38 (16) |
| **Ours 3547481 (Airbnb 1791529331262420081) New, 0 reviews** | | | | | **263.5** | **245** | **253.5** | **243** | not returned | not returned | not returned | not returned | not returned | not returned | **314** | not returned | not returned | not returned | **447.25** |

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### What changed since 7 Nov 06:00Z
**Reyhan, 7 Nov 12:30:10-12:30:20Z (`get_user_logs`; overrides confirmed by `get_listing_date_overrides` 3064856):**
- **8-12 Nov:** -10% changed to **-5%**, min 2, on both twins (3090701 "copied from parent listing 3064856").
- **10-20 Dec:** -7% changed to **-2%**, min 2, on both twins. 7-9 Dec stays at -7%; those nights are now booked.
- Other overrides are unchanged:
  - 13-16 and 18-26 Nov: -2%.
  - 17 Nov: +35%, min 1.
  - 27 Nov: +50%, min 1.
  - 1 Dec: +50% (intentional per policy).
  - 21-26 Dec: -5%, min 3.
  - 27-31 Dec: -3%.

**Conflict for Corentin (reported, not a new proposal):** policy `price_changes` 24 Oct sets **8-12 Nov to 0%**; the live override is now **-5%**. The gap is smaller but still there. **a-p13-record: partly fixed.**

**New booking: Booking.com 7-10 Dec (booked 7 Nov), on 3064856.** In the 8 Nov raw, 3064856 shows 7 Dec "Booked (Check-In)", booked_date 2026-11-07, ADR 134.78 (= £161.73 room/night / 1.2, VAT stripped). 3090701 shows the linked block.

### Focus: 7-10 Dec Booking.com booking vs comps
| Measure | Value | Source |
|---|---|---|
| Room paid | £485.20 = **£161.73/night**; all-in incl. £150 cleaning **£211.73/night** | `reservations.csv` 8 Nov |
| PriceLabs on sale at booking (6 Nov 08:48Z push, live until 7 Nov 12:30Z) | 195/194/191 = **£580** | `2026-11-07/raw/prices_3064856.json` |
| Paid / PriceLabs | **0.837**. Against the Booking.com list (x1.15 markup) of £667 it is **0.727** | computed; policy `booking_markup` 0.15 |
| Promotion stack | Paid is below 1.2 x price, so per policy this is explained by stacked promotions. The size is **-27% vs list**. The exact components are left to the channel section: 0.9³ = 0.729 gives £486.24, and 0.85 x 0.9 x 0.95 gives £484.75; neither is exact. | policy `booking_stacked_promotions` |
| Commission | £127.04 = **20.0% of room + cleaning** (£635.20), which is 26.2% of room alone. Visibility Booster is on for check-ins 21 Oct-20 Dec, so this is **explained (not flagged)**. | policy `booking_promotions_p13_21oct.visibility_booster` |
| Same stay, comps (Airbnb all-in, checked today) | median **£259** (n=7, range 208.67-428); wider 2-bed sample 259 (n=27) | Airbnb search 8 Nov |
| **Booking vs comps** | **P14 of 7 (-18.3%)**; P11 of the wider sample. Only 1014671215040555613 (4.76/17, £208.67) was cheaper. | `comp_summary` |
| Quality line (3064856, `quality_premium` -0.15) | 259 x 0.85 = **£220.15** all-in, so the booking is **-3.8%**, about £25 under the line for the stay | `rm/positioning.py` |
| PriceLabs market (room) | £161.73 vs P25 195.7 / P50 233.3 (average 7-9 Dec) = **below P25, -31% vs P50** | `neigh_3064856.json` |
| Effect of Reyhan's 7-9 Dec -7% | without it, about £521.70 room (**+£36.50**) at the same 0.837 | computed |

**Conclusion: sold a little cheap.** The booking is at P14 of comps, about 4% under the -15% quality line of the weaker twin, and below market P25 on room price. There are two causes:
1. A PriceLabs price already 16% under market P50, with the -7% override on top.
2. The Booking.com stack (-27% vs list).

The 7-20 Dec -7% that I said was unsupported yesterday cost about £36 on this stay. 10-20 Dec is now at -2%.

### Price percentile, rating, review gap, supported positioning
Comp median rating is **4.78** with a median of **13** reviews.
- **3090701, 4.7 (10):** -0.08 stars and 3 reviews behind; `quality_premium` **-0.032**.
- **3064856, 4.31 (13):** -0.47 stars, level on reviews; `quality_premium` **-0.15** (the cap).

`recommend` uses leads of +29 pts (30-day) and +13 pts (60-day). It uses the comp percentile where n >= 3, otherwise the PriceLabs market percentile (marked "mkt"). "PL vs P50" = the pushed price vs the PriceLabs 2 BR daily P50, averaged over the stay.

| Stay | 3090701 / 3064856 Airbnb 8 Nov (7 Nov) | Comp median (n) | Comp pctl / vs median | Wider pctl (n) | PL vs P50 | `recommend` |
|---|---|---|---|---|---|---|
| 8-10 Nov (arrive today) | **219.5 / 219.5** (199 / 191.5) | 188.5 (3) | **P100 / +16.4%** | P70 (10) | 165 / 160.5 vs 200.5 (-18% / -20%) | raise +5% (comp P100) |
| 9-11 Nov | 206 / 206 | 299.75 (2) | n=2 | P22 (9) | 171 vs 201.5 (-15%, mkt P28) | mkt: raise +10% |
| **10-12 Nov (Tue-Thu midweek)** | **209 / 209** (203.5 / 195.5) | 246.5 (3) | **P33 / -15.2%** | P31 (13) | 175 vs 204 (-14%) | raise +10% |
| 11-13 Nov (only way to sell 12 Nov) | 212 / 212 (206 / 198.5) | 207 (3) | P67 / +2.4% | P43 (14) | 179 vs 207 (-14%) | raise +10% |
| 8-12 Nov (4n) | 184 / 184 (163.5 / 156) | 173.25 (1) | n=1 | P33 (9) | 170 / 167.8 vs 202.2 | mkt: raise +10% |
| 9-12 Nov (3n) | 182.67 / 182.67 | 287.5 (2) | n=2 | P15 (13) | 173 vs 202.3 (-14.5%) | mkt: raise +10% |
| 12-13 Nov (1n) | not returned (min 2) | 403 (1) | n=1 | wider 249 (4) | 181 / 181 vs 210 | see 12 Nov below |
| 13-15 Nov (default Fri-Sun) | booked | 425.5 (1) | comp check only | 324.5 (11) | | |
| 17 Nov (1n) | 309 / 309 (310 / 300) | 185 (2) | n=2 | P80 (5) | 207 vs 204 (+1.5%) | mkt: raise +10% |
| 27 Nov (1n) | 359 / 404 | 394 (1) | n=1 | P75 / P100 (4) | 272 / 332 vs 237 (+15% / +40%) | mkt: raise +10% / +5% |
| **7-9 Dec (30-day point)** | booked (Booking.com 7-10 Dec) | 259 (5); same-comp +2.6% | | 259 (19) | | |
| **7-10 Dec** | booked: **211.73** all-in (Booking.com) | 259 (7) | **P14 / -18.3%** | P11 (27) | room 161.7 vs 233.3 (-31%) | (sold) |
| 11-13 Dec | 295.5 / 283 (285 / 273) | 283.5 (1) | n=1 | P23 / P15 (13) | 244.5 / 231 vs 244 (0% / -5%) | mkt: raise +10% |
| 18-20 Dec | **287.5 / 275.5** (276 / 265) | 305.5 (4) | P50 / P25; -5.9% / -9.8% | P42 / P33 (12) | 236 / 222.5 vs 245.5 (-4% / -9%) | raise +10% |
| **20-25 Dec (5n)** | **216 / 206** (strikes £1,184 -> £1,080 and £1,128 -> £1,030, "Long stay discount") | 220.1 (2) | n=2 | **P7 / P7 (15; median 289.2)** | 229.6 / 217.2 vs 252.8 (-9% / -14%) | mkt: raise +10% |
| **23-26 Dec (Christmas)** | 255.67 / 244.67 | 247.83 (2) | n=2 | **P15 / P5 (20; median 309.5)** | 228.3 / 216 vs 264.7 (-14% / -18%) | mkt: raise +10% |
| 24-27 Dec | 254 / 243 (strike £810 -> £729) | 251.33 (2) | n=2 | **P12 / P0 (16; median 325.5)** | 226.3 / 214.3 vs 274 (-17% / -22%) | mkt: raise +10% |

**Same-comp change since 7 Nov:**
- 8-12 Nov: comps **cut** (median -6.6% on 8-10 Nov, -4.3% on 10-12 Nov). 1016465248942791796 (4.61/82, paid parking) cut 217-225 to 188-188.5 (-13% to -16%), and 1761224847419174970 cut 257.5 to 246.5.
- December: flat (0% to +2.6%).
- Our Airbnb prices rose 3-15% on 8-12 Nov because of Reyhan's -10% to -5% change and the 12:30Z push.

**Supported positioning (one line each):**
- **3090701 (line -3% vs comp median):** on 10-12 Nov it is at £209 vs a line of £238.6 (**12% under**), and on 18-20 Dec at £287.5 vs £295.7 (3% under). With the +29 / +13 pt leads, the evidence supports **+10% on 10-12 Nov** and **+3-5% in December**. Only 8-10 Nov, which arrives today and sits at P100 after comps cut, does not support a raise: **hold**.
- **3064856 (line -15%, capped):** it is now **at its line on 10-12 Nov** (209 vs 209.5) and above it on 11-13 Nov (212 vs 176) and 18-20 Dec (275.5 vs 259.7). `recommend` still says +10% from the occupancy lead, but quality-adjusted comp evidence supports **hold**, not a further cut or a large raise.
- **8-12 Nov -5% (vs policy 0%):** with comps cutting 4-7% overnight, removing the last -5% is supported for 3090701 (12% under its line) and neutral for 3064856 (at its line).

### Focus: 12 Nov (a-raise-1012nov)
Market on 12 Nov: P25 178, **P50 210**, P75 278; occupancy **43.1%** (`neigh_3064856.json`).
- Ours: **181 on both twins** (7 Nov 162 / 172). Min 2 and 13 Nov is booked, so 12 Nov sells only as 11-13 Nov.
- On 11-13 Nov we are at £212 vs £207 (n=3): **P67, +2.4%**. Wider sample: P43 (14). The only comp returned for 12-13 Nov alone is 1205241472054931937 at £403 (n=1).
- Quality-supported level (P50 x (1 + q)): **3090701 about £203, 3064856 about £178.5**. 3064856 is now at its line (+1%); 3090701 is 11% under its line.

**Status: partly fixed.** The 12:30Z change and refresh lifted 10-12 Nov to 173/177/181 on both twins (from 155/160/162 and 165/170/172).

### Focus: Christmas (a-peak-check, P13 part)
- 20-26 Dec is still a **7-night open block** after the 20-25 Dec cancellation (27 Dec onward is booked). Arrivals on 25-26 Dec are still impossible under min 3.
- Position is unchanged:
  - 20-25 Dec: P7 of the wider sample.
  - 23-26 Dec: P15 / P5.
  - 24-27 Dec: P12 / P0.
  - PriceLabs is -9% to -22% vs market P50.
  - The two kept comps that returned (1568189670839493789 at 4.27, 1014671215040555613 at 4.76) are the cheap end. Their n=2 median is not representative.
- Quality-supported 23-26 Dec PriceLabs level (P50 264.7 x (1 + q)): **3090701 about £256** (now 228.3, i.e. +12%); **3064856 about £225** (now 216, i.e. +4%).
- **The 21-26 Dec -5% is not supported** (`recommend`: raise +10%; 60-day lead +13 pts). **Not fixed** (no edit to 21-26 Dec).

### Twins (a-p13-twin): IDENTICAL on 9-17 Nov
- **PriceLabs:** `price`, `user_price` and `uncustomized_price` are identical on both twins for every night 9-17 Nov (169/173/177/181 ... 17 Nov 207/207). On 7 Nov 3090701 was £9-13 above on every night (`raw/prices_*.json` 7 vs 8 Nov).
- **Airbnb:** totals are now identical on every November stay checked: 8-10 Nov £439/£439, 9-11 £412/£412, 10-12 £418/£418, 11-13 £424/£424, 8-12 £736/£736, 9-12 £548/£548, 17-18 £309/£309. Yesterday they were 3.8-4.1% apart.
- **December is still differentiated** (3090701 dearer): 11-13 Dec £591 vs £566 (4.4%), 18-20 Dec £575 vs £551 (4.4%), 20-25 Dec £1,080 vs £1,030 (4.8%), 23-26 Dec £767 vs £734 (4.5%).
- **Why it matters:** policy `listing_facts.P13.twin_listings` says the two Airbnb listings must keep slightly different prices or Airbnb blocks them as duplicates.
- **Cause: NOT CHECKED.** The base (`uncustomized_price`) is identical, not only the override, and Reyhan's 8-12 Nov override was "copied from parent listing". This suggests the two are now linked parent/child in PriceLabs for these dates.
- **Proposal (narrowing, not identical, per policy):** restore a small gap on 9-17 Nov, with 3090701 about 3-5% above 3064856 as in December. Quality supports 3090701 being the dearer twin (lines -3% vs -15%).

### Airbnb factor (for the channel section)
Factor = (our all-in - £150) / PriceLabs price.
- **0.765-0.768** on 9-17 Nov stays.
- **0.90** on 2-3 night December stays.
- **0.81** on 20-25 Dec.
- 8-10 Nov shows 0.876 / 0.90 against the 7 Nov raw for 8 Nov. The pushed 8 Nov price after 12:30Z is not in the 8 Nov raw, so this ratio is uncertain.

## P20 Waterford Court, 2-bed, max 4 (Airbnb 1791529331262420081, New, 0 reviews)

### What changed since 7 Nov 06:00Z
- **Reyhan, 7 Nov 12:32:44-12:33:01Z:** the overrides on **8-9 Nov, 13-17 Nov and 20-24 Nov** were replaced by min-stay-only overrides (**min 2, no % adjustment**), so the **-5% is removed** on those dates. Prices rose about 5%: 13 Nov 271 -> 285, 14 Nov 234 -> 246, 20 Nov 239 -> 252.
  - **Conflict for Corentin (reported, not a new proposal):** policy `listing_facts.P20.min_stay` says "3 nights from 25 Oct to 30 Nov", and policy `price_changes` 24 Oct records "-5% override 31 Oct-19 Nov". Both are now overridden on these dates. On price, the comp evidence (P0, below) supports the direction of the change.
- Unchanged overrides:
  - 10-12 Nov: -5%, min 3.
  - 18-19 Nov: -5%, min 2.
  - 25-30 Nov: -10%.
  - 1-20 Dec: -5%, min 3.
  - 21-26 Dec: -5%.
- **New booking: Airbnb 6-14 Dec** (booked 7 Nov), 8 nights, room £1,494.25, cleaning £150, commission £254.86 (15.5% of room + cleaning).
- **t-p20-delivery: still open.** 18-19 Nov are "Blocked" in PriceLabs, while policy records the delivery block as 20-22 Nov. Airbnb sells 20-23 Nov today (£729). This is unchanged and a conflict for Corentin.

### Focus: 6-14 Dec booking. Was it sold cheap like Christmas?
**Yes, nearly as cheap.**

| Measure | Value | Source |
|---|---|---|
| Room paid | £1,494.25 = **£186.78/night**; all-in **£205.53/night** | `reservations.csv` 8 Nov |
| PriceLabs on sale (7 Nov 01:30Z refresh, before the 12:33Z push) | 293/306/277/281/273/288/295/285 = **£2,298** | `2026-11-07/raw/prices_3547481.json` |
| Paid / PriceLabs | **0.6502 = 0.90 x 0.85 x 0.85** (2298 x 0.65025 = 1494.27). Against the 6 Nov prices (£2,089) it would be 0.715, which is not a clean product, so the booking was likely made after 01:30Z on 7 Nov. | computed |
| Policy-expected (weekly 15% only; last-minute does not apply at 29 days) | 2298 x 0.85 = **£1,953.30**, so the shortfall is **£459.05 (23.5%) unexplained** by policy | `policy.json` length_of_stay_discounts, P20 airbnb_discounts_22oct |
| Effect of the 1-20 Dec -5% override | about **+£79** without it at the same 0.65 | computed |
| Same stay 6-14 Dec, comps (all-in, after their own weekly discounts) | median **£284.25** (n=7, range 236.5-355.25); wider sample 279.75 (n=14) | Airbnb search 8 Nov |
| **Ours vs comps** | **P0: below all 7 (-27.7%)**; P7 of the wider sample. The cheapest comp is 790672189611831800 at £236.50 (4.41/17). | `comp_summary` |
| Vs the -15% new-listing allowance (judgement) | line £241.61, so ours is **-14.9%**, about **£289 below the line** for the stay (£630 below the median) | computed |
| PriceLabs market (room) | £186.78 vs P25 184.1 / P50 222.5 (average 6-13 Dec) = **about P26, -16% vs P50** | `neigh_3547481.json` |
| Compare 19-26 Dec (booked 6 Nov) | all-in £225.43 vs median £330.14 (n=7, unchanged today): **P0, -31.7%**; paid 0.7225 x PriceLabs | 7 Nov section; Airbnb 8 Nov |

**Conclusion:** both December bookings sold at the **bottom of the comp set** (P0, -28% and -32%). Both share a channel factor of about 0.65-0.72 x PriceLabs against a policy-expected 0.85. That is the larger cause (about £459 on this stay). The **0.90 layer** (seen on every December Airbnb stay of 2-3 nights since 7 Nov) and the **second 0.85** are not explained by policy. The Airbnb reservation breakdown is NOT CHECKED; this is flagged for Corentin and the channel section. The smaller cause is the -5% override on a price already near market P26.

### Focus: 5 Dec gap (Saturday, 1 night)
- 5 Dec is a **1-night orphan** between the 25 Nov-5 Dec and 6-14 Dec stays (`reservations.csv`).
- **PriceLabs 8 Nov:** price **279**, user_price 332, uncustomized 384, min 3, **unbookable = 1**. On 7 Nov it was 332 and bookable, so the price dropped 16% after the 6-14 Dec booking. The cause (orphan-day logic?) is NOT CHECKED. It cannot sell while min stay is 3.
- **Market 5 Dec (room):** P25 193 / **P50 231** / P75 300; occupancy 37.8%. Our 279 is about **P67**.
- **Comps:** only **1 of 12** sells a 1-night 5-6 Dec: 1684834789445533643 at **£567 all-in** (4.39/18, lift/balcony). The wider 1-night 2-bed sample is n=1. For 5-8 Dec the comp median is £346.83 (n=6).
- **Supported:** open **min-stay 1 on 5 Dec** (policy's P20 min-3 rule ends 30 Nov) at the current 279. That is about £401 all-in at the 0.90 December Airbnb factor, -29% vs the only 1-night comp. The evidence (n=1) supports neither a cut nor a raise. Value: about £251 room if it sells on Airbnb.

### Price percentile, rating, review gap, supported positioning
Comp median rating is **4.8**, with a median of **17.5** reviews. We have no rating and 0 reviews, so `quality_premium` = **0.0**. The **-15% new-listing allowance** is a judgement, not the function's output. Leads are +12 pts (30-day) and +16 pts (60-day).

| Stay | Airbnb 8 Nov (7 Nov) | Comp median (n) | Pctl / vs median | Wider pctl (n) | PL vs P50 (mkt pctl) | Airbnb factor | `recommend` |
|---|---|---|---|---|---|---|---|
| 8-10 Nov (arrive today) | 263.5 | 289.25 (4) | P25 / -8.9% | P46 (13) | 216 vs 210.5 (+3%) | 0.873 (8 Nov uncertain) | raise +10% |
| **13-16 Nov (default Fri-Sun)** | **245** (235.33) | 319 (5) | **P0 / -23.2%** | P17 (12) | 254.7 vs 214 (+19%, P64) | 0.766 | raise +10% |
| 16-18 Nov (midweek) | 253.5 (244.5) | 270 (3) | P0 / -6.1% | P36 (14) | 233 vs 210 (+11%) | 0.766 | raise +10% |
| **20-23 Nov** | **243** (233.33) | 307 (8) | **P0 / -20.8%** | P8 (13) | 252 vs 216.3 (+17%, P62) | 0.766 | raise +10% |
| 5-6 Dec (gap) | unbookable (min 3) | 567 (1) | n=1 | n=1 | 279 vs 231 (P67) | | see above |
| 5-8 / 7-10 / 7-14 / 11-14 Dec | booked | 346.83 (6) / 333.33 (9) / 286.71 (7) / 334 (9) | same-comp change 0% | | | | |
| **6-14 Dec** | booked: **205.53** | 284.25 (7) | **P0 / -27.7%** | P7 (14) | room 186.8 vs 222.5 (-16%) | 0.650 | (sold) |
| **14-17 Dec (new, first open after booking)** | **314** | 306 (11) | P55 / +2.6% | P62 (29) | 293 vs 221.3 (+32%, P76) | 0.901 | raise +10% |
| 19-26 Dec | booked (paid 225.43) | 330.14 (7) | P0 / -31.7% | P0 (15) | | 0.7225 | (sold) |
| 21-24 / 23-27 Dec | booked | 358.16 / 363.88 (10) | same-comp change 0% | | | | |
| 26-30 Dec (min 4) | **447.25** (406.5) | 360 (9) | **P78 / +24.2%** | P62 (16) | 455.2 vs 263 (+73%) | 0.90 | raise +5% (test step) |

**Supported positioning (P20, one line each):**
- **13-16 Nov (-23%, P0) and 20-23 Nov (-21%, P0, n=8):** both are 7-10% below even the -15% allowance (lines £271 / £261). With leads of +12 / +16 pts, `recommend` supports **+10%**, about **+£25/night all-in**. The gap is the Airbnb factor (0.766) on a PriceLabs price already at market P62-P64. Removing the -5% (Reyhan, 7 Nov) closed about 3 pts of it.
- **8-10 Nov and 16-18 Nov:** within the allowance; hold or a small raise.
- **14-17 Dec (P55, +2.6%) and 26-30 Dec (P78, +24%):** both are above the allowance line. With 0 reviews, the comp evidence supports **hold**. `recommend`'s raise comes only from the occupancy lead.

## P10 Hanger Lane, 1-bed (3318177)
No sellable nights. `reservations.csv` 8 Nov has a confirmed Airbnb booking for 18 Oct-19 Nov, which covers every night to the handback (policy last night 18 Nov). No PriceLabs edits (`get_user_logs`). No comps or positioning.

## P02 Ladbroke Grove, P03 Bayswater
Blocked on purpose (policy `intentional_blocks`). No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or Smoobu (`kpi_summary.md` 8 Nov: "No priced PriceLabs listing mapped"), so there is no own price. Percentile, rating gap and premium are **NOT CHECKED**; no comps built.

## Data gaps:
1. **Booking.com NOT CHECKED** (comps and our displayed prices); the analysis is Airbnb only. The P13 7-10 Dec booking is compared on (room + cleaning) / nights vs Airbnb all-in. Comp cancellation policies NOT CHECKED.
2. **Thin comp coverage** (labelled; market or wider-sample percentiles used instead):
   - P13: n=1-2 on 9-11, 9-12, 8-12, 12-13, 13-15, 17, 27 Nov, 11-13 Dec and all Christmas stays.
   - P20: n=1 on 5-6 Dec; n=3-4 on 8-10 and 16-18 Nov.
3. **P20 6-14 Dec paid 0.650 x PriceLabs (0.90 x 0.85 x 0.85)** vs 0.85 expected. The two extra layers are unexplained; the Airbnb reservation breakdown and booking time are NOT CHECKED. I assumed the 7 Nov 01:30Z prices were on sale.
4. **P13 7-10 Dec Booking.com stack components** (0.727 of list) are not exactly resolved; left to the channel section.
5. **P13 twins identical 9-17 Nov:** cause NOT CHECKED (possible PriceLabs parent/child link).
6. **8 Nov night:** not in the 8 Nov raw, so 8-10 Nov factors use pre-push 7 Nov prices. Smoobu `/api/rates` NOT CHECKED today.
7. **P20 5 Dec price drop 332 -> 279:** cause NOT CHECKED.
8. **Comps' cleaning split is unknown**, so all-in gaps on 1-night stays (17 Nov, 27 Nov, 5 Dec) overstate ours.
9. The P13 Airbnb-to-Smoobu id mapping is "likely / probable" (policy `airbnb_listings_24oct`).
10. P16, P18 and P19 have no data; P10 has no sellable nights.
11. One PriceLabs call (`get_listing_date_overrides` 3064856) was sent in parallel with `get_user_logs`, contrary to the one-at-a-time rule. Both returned 200, so there was no data effect.
