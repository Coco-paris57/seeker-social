# Competitor positioning: EAST batch (D = 2026-11-11)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy) and is not analysed. **P15** has no listing of ours (reference only).
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec, P09 26 Nov, P12 13 Dec).

**Method** (same as 26 Oct-10 Nov; scripts in the scratchpad `east11/bin`)
- **Comp ids:** same set as 10 Nov (`data/snapshots/2026-11-10/comps.csv`): P01 11, P04 7, P09 6, P12 7, P15 7. **None replaced.**
  - P04 1387112821878102742 was not returned on any trend stay for a second day. A 60-day sweep (3-night stays every 4 days, 0.3 km box) found it **bookable 7-10 Jan 2027 (£534 total)**, so it is still active and is **kept**.
  - P01 1005647070760859698 came back today (18-21 Dec, £320/n). P12 29297702 still shows a placeholder-like ~£1,035/n and is left out of medians.
- **Access:** public Airbnb pages (HTTP 200). 78 wide searches (2.5 km box for P04, 1.8 km for P09, 1.3 km for the rest; 4 guests for 2BR, 3 for 1BR), then 413 comp/stay checks in a 0.3 km box (`*` in the tables). **Booking.com: NOT CHECKED.**
- **Price basis:** Airbnb **guest-paid all-in total / nights**, after discounts, cleaning and Airbnb fees **included**; no separate taxes are shown. Ours are priced the same way. PriceLabs/Smoobu figures are **room only, cleaning excluded**.
- **Stays (same dates for comps and us):** next Fri-Sun 13-15 Nov, midweek Tue-Thu 17-19 Nov, **30 days out 11-13 Dec (new)**, plus the trend stays 24-27 Nov, 1-3, 4-6, 7-9, 8-10, 9-11, 10-12 Dec. Key-date stays: P01 18-21 / 18-20 / 19-21 Dec; P04 12-14 Nov, 18-25 Nov runs and 6-20 Dec runs; P09 12-13 Nov; P12 12-14, 17-21 Nov, 26-27 Nov, 30 Nov-4 Dec, 7-14 Dec runs.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count, 10+ reviews, inside the radius, excluding ours. P04 band leaves out 1588439248552365607 (placeholder-like £8,500-10,000/n) and is shown both ways for the 5-unit 1531... operator. **New today: a P01 2BR band (1.3 km)** for 18-21 Dec.
- **Data written:** `data/snapshots/2026-11-11/comps.csv` did not exist. Under `flock` on `.comps.csv.lock` I copied 10 Nov forward (13,388 lines) and **appended 1,050 rows** (-> 14,438 lines): 587 `comp-east` (every stored comp x stay, NOT RETURNED rows kept), 327 `east-refband`, 136 `east-ours` (our Airbnb all-in, the unsynced P04 listing, and the Smoobu room price per open night with the 11 Nov raw PriceLabs price/user_price/uncustomized). None of the `east-ours`/`east-refband` rows are comps.
- **PriceLabs (read-only, one call at a time):** `get_user_logs` (listing, 10-11 Nov, 4 listings): 3 entries; `get_listing_date_overrides` for 2699998 and 3320302; `get_neighbourhood_data` for P12, P04, P09, P01 (all `all_operations_ok`).
- **Smoobu (GET only):** `/api/rates` for 3320302 and 3318172; `/api/reservations` for 3320302 (25 Nov-31 Dec). Guest fields not read or saved.

## What changed since 10 Nov 06:00Z (this batch)
**P12 Mile End 2699998: Reyhan, 10 Nov 16:28Z** (`get_user_logs`; confirmed by `get_listing_date_overrides` `updated_at`). These reverse Reyhan's own 9 Nov trims:
- 16:28:22Z: **12-20 Nov +5%**, min 2 (9 Nov: -2%).
- 16:28:30Z: **30 Nov-3 Dec +5%**, min 2 (9 Nov: -2%).
- 16:28:36Z: **7-13 Dec: price override removed** (min 3 only; 9 Nov: -5%, min 3).
- Refreshed and pushed 16:30:06-08Z (`listings.csv`, raw `prices_2699998.json`).
- PriceLabs room prices 10 Nov -> 11 Nov (`prices.csv`):
  - 12-13 Nov 201/250 -> **216/269**; 17-20 Nov 245/250/256/280 -> **262/268/274/299** (+7%).
  - 26 Nov 306 -> **287** (algorithm; +15% DSO unchanged).
  - 30 Nov-3 Dec 268/275/286/297 -> 282/266/277/291 (mixed).
  - 7-10 Dec 279/277/289/279 -> 267/274/285/291; **11-13 Dec 309/321/283 -> 322/334/297**.
- Our Airbnb all-in moved the same way: 17-19 Nov 252 -> 265.50; 18-20 Nov 256.50 -> 270; 11-14 Dec 324 -> 336; 7-10 Dec 278.67 -> 260.67.

**P01 Bowsprit Point 3320302: the 18-21 Dec cancellation did NOT reopen any night.**
- Smoobu `/api/reservations`: Airbnb 18-21 Dec **cancelled** (modified 10 Nov 14:40:51). **36 seconds later (14:41:27) the "Blocked channel" block 160657036 was extended to 30 Nov-21 Dec** (created 19 Oct; policy recorded it as 30 Nov-17 Dec). The handback block 21 Dec 2026-30 Sep 2028 is unchanged.
- Smoobu `/api/rates` 11 Nov: 15-22 Dec all `available: 0`. PriceLabs raw: 18/19/20 Dec `Blocked`, price 284/279/243 (user_price -1), min 3. Our Airbnb listing was not returned for 18-21 or 18-20 Dec in the 1.3 km search or a 0.4 km search.
- Who extended the block and why: **NOT CHECKED** (Smoobu does not record the user). No PriceLabs edit on P01 since 10 Nov (`get_user_logs`, overrides unchanged since Oct).

**P04 Barking 3562176:** no PriceLabs edit since 9 Nov 21:27Z. Last pushed 10 Nov 09:27:32Z (`listings.csv`). Prices moved 1-2 GBP (algorithm).

**P09 Torrent Lodge 3318172:** no PriceLabs edit. Smoobu `/api/rates`: **12 Nov is now `available: 1`** with min 2 (11 Nov `available: 0`, 13 Nov booked). PriceLabs raw flags 12 Nov `unbookable: 1`. So 12 Nov is no longer blocked; it is a **1-night orphan that min 2 cannot sell**.

**Comps are flat.** The median same-comp, same-stay change vs 10 Nov is 0.0% on every P04, P09, P12 and P15 stay. Moves of £10 or more:
- P01 41905186 dropped on every stay (for example 10-12 Dec 530 -> 285; 9-11 Dec 405 -> 282; 4-6 Dec 557 -> 432).
- P12 1077363497194834681: 12-14 / 13-15 Nov 217.50 -> 187.50; 17-21 Nov +£10. P12 1120913156789373408: 11-14 Dec 247 -> 283. P12 1383544079404594066: 26-27 Nov 297 -> 282; 11-13 Dec 359.50 -> 347.50.
- P04 1577633201778145138: 9-11 Dec 239 -> 250; 10-12 Dec 227.50 -> 239.
- P15 1617544963466664181: 24-27 Nov 148.33 -> 137.33; 10-12 Dec 205.50 -> 183.

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 11 Nov)
Market bands, not comps; horizon and cleaning basis not stated by PriceLabs. Ours = PriceLabs room price on open nights (`prices.csv` 11 Nov).

| Ref | Band (n) | P25/P50/P75/P90 today (10 Nov) | Market occ 30 / 60 (`pl_kpis.csv`) | Ours and NL percentile |
|---|---|---|---|---|
| P04 | 2BR (90) | 140/176/213/261 (138/174/216/259) | 24% / 21% | **Next 14 days** (12-13, 18-24 Nov, 9 n): £143.6, **P27** (10 Nov P30). **November 18-24** (7 n): £144.7, **P28**. **December** (6-19 Dec, 14 n): £190.7, **P60** (10 Nov P59). |
| P09 | 1BR (125) | 110/133/160/204 (110/132/159/203) | 38% / 32% | **12 Nov** £120 room: **P36**. No other sellable night before the 26 Nov handback. |
| P12 | 2BR (119) | 170/205/232/289 (171/204/230/287) | 42% / 34% | **Next 14 days** (12-13, 17-20 Nov, 6 n): £264.7, **P84** (10 Nov P79). **26 Nov** £287, **P89**. **30 Nov-3 Dec** £279, **P87**. **7-10 Dec** £275.3, **P86**. **11-13 Dec** £317.7, **>P90**. 7-13 Dec £295.7, >P90. |
| P01 | 2BR (146) | 215/260/335/429 (first pull since 29 Oct) | 35% / 29% | **18-20 Dec** (blocked) £268.7 room would be **P53**. |

- `occ_insights`: P12 market 4-7 Dec +8.0% (we are booked 4-6 Dec); P04 3-5 Dec +9.2% (booked); P09 7-10 Dec +9.3% (after handback); all four 27 Dec-1 Jan +15.6% to +18.1%.
- `fp_insights`: 26/27-30/31 Dec surge P04 +8.1%, P12 +21.7%, P09 +26.4%, P01 +26.0%.

## Priority 1: P12 Mile End. Reyhan's 10 Nov +5% runs against the comps
- **Quality:** `quality_premium` = **-0.15** (cap). We are 4.27 from 15 reviews; stored-comp median 4.86 from 19 (gap -4). **Supported: band median x 0.85-1.00 (-15% to 0%).**
- Room targets scale our all-in/room ratio for each stay (for example 17-19 Nov 531/530 = 1.00; 26 Nov 345/287 = 1.20; 11-14 Dec 1,008/953 = 1.06). Approximate.

| Stay | Ours all-in today (10 Nov) | PriceLabs room = Smoobu | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room | Move needed |
|---|---|---|---|---|---|---|
| 12-14 Nov (tomorrow) | 248.50 (235.50) | 216/269 | 266 (3), P33, **-6.6%** | 187.50 (1), P100, +32.5% | 221-260 | **hold** |
| 17-19 Nov | **265.50** (252) | 262/268 | 217.50 (11), **P73, +22.1%** | 250.75 (4), P75, +5.9% | 185-217 | -18% to -30% |
| 18-20 Nov | **270** (256.50) | 268/274 | 217.50 (9), **P89, +24.1%** | 250.75 (4), P75, +7.7% | 186-218 | -19% to -32% |
| 17-21 Nov | 248.50 (234.75) | 262/268/274/299 | 238.25 (10), P60, +4.3% | 238.25 (6), P67, +4.3% | 225-264 | -4% to -19% |
| **26-27 Nov (1 n)** | **345** (360) | **287** (uncust. 256) | 283 (4), **P100, +21.9%** | 283 (2), P100, +21.9% | **200-235** | **-18% to -30%** |
| **30 Nov-3 Dec** | 260.67 (261.67) | 282/266/277 | 237.83 (14), P57, **+9.6%** | 237.83 (6), P67, +9.6% | 213-251 | **-9% to -22%** |
| 30 Nov-4 Dec | 251 (253) | 282/266/277/291 | 243.75 (11), P55, +3.0% | 268.38 (4), P50, -6.5% | 230-271 | -3% to -17% |
| 1-3 Dec (trend) | 270.50 (277.50) | 266/277 | 254 (9), P56, +6.5% | 245.75 (4), P75, +10.1% | 217-255 | -6% to -20% |
| 2-4 Dec | 280 (285.50) | 277/291 | 247.25 (10), P70, +13.2% | 279 (2), P50, +0.4% | 213-251 | -12% to -25% |
| **7-10 Dec** | 260.67 (278.67) | 267/274/285 | 250.84 (12), P50, **+3.9%** | 225 (3), P67, +15.9% | 225-265 | -4% to -18% |
| 7-11 Dec | 261 (271.75) | 267/274/285/291 | 251.63 (12), P58, +3.7% | 220 (3), P67, +18.6% | 229-269 | -4% to -18% |
| **7-14 Dec (7 n)** | 247.71 (244.14; weekly 15.0% applied) | 267-334 | 220.72 (12), P58, **+12.2%** | 255.93 (2), P50, -3.2% | 224-263 | -11% to -24% |
| **11-14 Dec (3 n)** | **336*** (324) | **322/334/297** | 284.34 (12), **P75, +18.2%** | 312.84 (4), P50, +7.4% | **228-269** | **-15% to -28%** |
| 11-13 Dec (30 days out) | not bookable (min 3) | 322/334 | 276.50 (8) | 292.50 (2) | n/a | n/a |
| 13-14 Dec (1 n) | not bookable (min 3) | 297 (user 283) | 295 (4) | none returned | about 210-250 if sold alone | n/a |

**Supported positioning** (lowering a PriceLabs price is Corentin's call; a-p12-trim):
- **17-20 Nov:** about **-18% to -30%** (room about £185-218). Reyhan's +5% moved this from band P60-67 to **P73-P89** (+22-24% vs band; +6-8% vs the stored set).
- **26 Nov:** room about **£200-235**, keep min 1. Today £287 (DSO +15%), P100, +22% vs band (n = 4). **t-p12-26nov-price not fixed** (the algorithm took £19 off; the +15% is still there).
- **30 Nov-3 Dec:** about **-10% to -20%**. Reyhan's +5% (was -2%) cancelled the trim.
- **7-11 Dec:** now **+4% vs band (P50-58)**: inside the supported range, **hold**. Algorithm prices fell even though the -5% override was removed.
- **11-14 Dec:** about **-15% to -28%** (room about £228-269 vs £322/334/297). The cancelled 11-13 Dec Booking.com stay paid £257/n room (`reservations.csv`).
- **12-14 Nov:** hold (-6.6% vs band, P33).
- **`recommend`:**
  - 30-day (11 Nov-10 Dec): comp P67 over 12 stays gives **hold** (booked 48% vs market 42%). NL P86 also gives hold.
  - 60-day window (11-13 Dec): NL P90 with 0 of 3 nights booked gives **lower -7%**. Comp P50 (n = 1) gives fix-listing.
  - The evidence (band P57-P100 on 17-20 Nov, 26 Nov, 30 Nov-3 Dec and 11-14 Dec; -0.59 star; -15% quality cap) supports the **trims above, not the +5%**.

## Priority 2: P04 Barking, November and December after the base cut 220 -> 200
- **Quality:** `quality_premium` = **-0.15** (cap). Synced listing 4.11 from 9 reviews; comp median 4.85 from 27 (gap -18). **Supported: about -15% vs comp/band median (x 0.85-1.00).**

| Stay | Ours all-in today (10 Nov) | PriceLabs room | Stored median (n), pctl, vs | Band median all / operator once (n), vs | Our pctl in band | Supported room |
|---|---|---|---|---|---|---|
| 12-14 Nov | not bookable (2-night orphan, min 3) | 138/141 | 222 (1) | 237.50 (4) / 229.75 (2) | n/a | n/a (policy: never under 3 nights) |
| 18-21 Nov | 156.33 (158) | 139/141/147 | 239.84 (2), P0, **-34.8%** | 235 (6) / 222 (3), **-33.5% / -29.6%** | P0 | 172-202 |
| 20-23 Nov | 160.33 (161.67) | 147/150/145 | 257.67 (1), P0, -37.8% | 240 (4) / 228.50 (2), -33.2% / -29.8% | P0 | 178-210 |
| 21-24 Nov | 159.67 (161.33) | 150/145/145 | 257.67 (1), P0, -38.0% | 235 (4) / 226.50 (2), -32.1% / -29.5% | P0 | 177-208 |
| 22-25 Nov | 158.67 (160.33) | 145/145/146 | 248.33 (3), P0, -36.1% | 230 (7) / 225.67 (4), -31.0% / -29.7% | P0 | 176-207 |
| 18-25 Nov (7 n) | 127.14 (128.57) | 139-150 | 249 (1), P0, -48.9% | 199.14 (5) / 199.14 (3), -36.2% | P0 | 193-227 |
| 6-9 Dec | 190 (189.67) | 187/186/186 | 222 (3), P0, -14.4% | 226 (8) / 214.34 (6), -15.9% / -11.4% | P25 | 179-210 |
| 9-12 Dec | 210 (218.33) | 184/189/196 | 222 (3), P33, -5.4% | 231 (9) / 218.17 (6), -9.1% / -3.7% | P22 | 167-197 |
| 11-14 Dec | 222 (221.33) | 196/200/186 | 213.84 (2), P50, +3.8% | 218.17 (6) / 214.33 (5), +1.8% / +3.6% | P50 | 159-187 |
| 14-17 Dec | 215* (212.67) | 183/186/189 | 235.17 (4), P25, -8.6% | 220.34 (8) / 231.84 (6), -2.4% / -7.3% | P12 | 170-201 |
| 17-20 Dec | 227 (224.33) | 191/201/206 | 241 (2), P50, -5.8% | 228 (7) / 234.84 (4), -0.4% / -3.3% | P14 | 175-206 |
| 6-13 Dec (7 n) | 160.43 (160) | 184-200 | 166.57 (3), P33, -3.7% | 156.22 (6), +2.7% | P67 | 157-185 |

- **November (18-24 Nov open, 7 nights):** we sit **-30% to -38%** vs stored set and band (operator-collapsed -30%), NL **P28**. The quality-supported level is about -15%, room about **£172-210**. **The November part of the base cut is not supported by the comps.**
  - Supported move: **take back the cut, about +7-10%** (room roughly back to the 9 Nov £150-165), as on 10 Nov. Comps would support up to about +20% (to -15%), but the market is at 24% occupancy next 30 days and Corentin judged on 24 Oct there was no November demand. Low confidence (band n = 4-7).
  - `recommend` 30-day: **raise +10%** (comp P0 over 8 stays, NL P40; booked 54% vs market 24%).
- **December (6-19 Dec open):** -14% to +4% vs stored, -16% to +2% vs band (median about -4%); NL P60. **The cut is consistent with the December evidence.** Hold 6-10 and 14-20 Dec; **11-14 Dec** is the only stay above parity (+2-4%): trim about 5% if anything. `recommend` 60-day gives raise +10% (comp P50, n = 3). **Not adopted**: the lead comes from the 25 Nov-6 Dec and 20 Dec-2 Jan bookings.
- **12-13 Nov:** a 2-night orphan (14-18 Nov booked). Policy: never open P04 for fewer than 3 nights, so it is unsellable; not proposed.
- **2 Dec** (+200%, min 1, £459) is deprioritised in policy and not raised.
- **Weekly discount (t-p04-weekly), not fixed.** Airbnb shows £164 off £1,054 on 18-25 Nov and £215 off £1,338 on 6-13 Dec. Taking out the £142 cleaning, that is **18.0% of room on both** vs the 15% policy. P12 7-14 Dec: £279 off £2,013 = **15.0%** (cleaning £150).

## P04 unsynced listing 1455876748739910219 (Barking 1455, day 12)
- **Still bookable on every P04 open run checked:** 18-21 Nov £526; 20-23 Nov £542; 21-24 Nov £539; 22-25 Nov £531; 18-25 Nov £1,203; 6-9 Dec £636; 9-12 Dec £675; 11-14 Dec £681; 14-17 Dec £659*; 17-20 Dec £695; 6-13 Dec £1,291.
- 4-24% dearer than the synced listing. A booking would not reach Smoobu. **t-p04-doublebook: not fixed.**

## Priority 3: P01 Bowsprit Point 18-20 Dec (cancelled stay, before the 20 Dec handback)
- **Nothing is open.** The cancellation (£720.90 room + £149 cleaning, booked 19 Oct) was followed 36 s later by the extension of the Smoobu block to 30 Nov-21 Dec (see above). 18-20 Dec are the last 3 managed nights.
- **Comps (18-21 Dec, 3 n, all-in):** stored median **£324.33** (n = 7, range 220.67-479); band median **£328.83** (n = 14). 18-20 Dec: stored £342 (n = 3), band £338.50 (n = 6).
- **If reopened** at today's PriceLabs room 284/279/243 (£806; NL P53) + £149 cleaning = **£318/n before the Airbnb guest fee**: about **P29 of comps, -2% vs median**. The cancelled stay was £290/n on the same basis (-11%).
- **Supported: parity with the comp median (0%, range -5% to 0%).** `quality_premium` = 0.0 (4.75 from 4 reviews, under the 5-review threshold; comp median 4.8 from 30). The current PriceLabs price is supported; no cut is needed. Min 3 fits the 3-night gap exactly.
- **For Corentin to confirm (policy conflict, not a new proposal):** policy `handbacks` says "before the date, maximise revenue normally"; the block now covers 18-20 Dec. If unintended, reopening 18-21 Dec is worth about **£806 room**. P01 18 Oct base-rise gain is now 0 n / £0 (Dispatcher).
- `recommend`: raise-signal (booked 100% vs market 35%, no open night).

## Priority 4: P09 Torrent Lodge 12 Nov (tomorrow)
- **12 Nov is open in Smoobu but min 2** (`/api/rates`: available 1, min 2; 13 Nov booked; 11 Nov unavailable). It cannot sell. **t-p09-1112block: changed**: the block is gone; the min-stay now stops it.
- **Comps, 1-night 12-13 Nov:** band median **£183** (n = 5, range 140-237); stored **£184.50** (n = 2: 186, 183).
- **If min 1 (Corentin's call):** at £120 room, using the 7-11 Nov booking ratio (0.778 x room + £125 cleaning, `reservations.csv`), about **£218 all-in, +19% vs band (P80)**. At the £100 minimum (`listings.csv`): about £203, **+11%**. The band median would need about £75 room, below the minimum.
- **Supported:** min 1 at the current £120 (or the £100 minimum). A price cut alone cannot sell it. `quality_premium` 0.0 (5.0 from 3 reviews). NL P36.
- `recommend` 30-day: raise-signal (booked 100% vs 38%, no other open night).

## Summary per property
`recommend` runs on the median comp percentile of our priced open stays in each window (11 Nov-10 Dec / 11-31 Dec), with `quality_premium` (needs 5+ reviews).

| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market (`pl_kpis`) | `recommend` 30 / 60 | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | Nothing open (18-20 Dec blocked after the cancellation) | stored 188-443 (n 1-7); 18-21 Dec 324.33 (7) | n/a (would be P29 at today's price) | 4.75 vs 4.8 | 4 vs 30 (-26) | 0.0 (<5 reviews) | 100% / 100% vs 35% / 29% | raise-signal | **parity** (current price supported) if 18-20 Dec reopens |
| P04 (synced 1657…) | 127.14-227 | stored 166.57-257.67 (n 1-4); band 156-240 (n 4-9) | P0 November; P0-P50 December | 4.11 vs 4.85 | 9 vs 27 (-18) | -0.15 | 47% / 45% vs 24% / 21% | raise +10% (P0) / raise +10% (P50); NL P40 / P62 | **-15%**. November -30% to -38%: take back about +7-10%. December -16% to +4%: hold; 11-14 Dec trim about 5% |
| P04 unsynced 1455… | 175.33-231.67, bookable on every run | | | 4.69 | 26 | n/a | | | map or unlist |
| P09 | No sellable night (12 Nov min 2) | 1-night band 183 (5), stored 184.50 (2) | NL P36 | 5.0 vs 4.56 | 3 vs 25 (-22) | 0.0 | 97% / handback vs 38% / 32% | raise-signal | **+11% to +19% at min 1** (only lever) |
| P12 | 247.71-345 | band 217.50-284.34; stored 187.50-312.84 | band P33-P100 (median P58) | 4.27 vs 4.86 | 15 vs 19 (-4) | -0.15 | 53% / 70% vs 42% / 34% | hold (P67) / fix-listing (P50, n 1); NL hold (P86) / lower -7% (P90) | **-15% to 0% vs band:** 17-20 Nov -18% to -30%; 26 Nov -18% to -30%; 30 Nov-3 Dec -10% to -20%; 11-14 Dec -15% to -28%; hold 12-14 Nov and 7-11 Dec |
| P15 | No listing of ours | 135.50-218 (n 1-5) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | Blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 11 Nov)
| Item | Status |
|---|---|
| t-p04-doublebook | **Not fixed** (day 12). 1455 bookable on all P04 open runs. |
| t-p09-1112block | **Changed, not sellable.** Smoobu 12 Nov available, min 2; 13 Nov booked. Needs min 1 to sell. |
| a-p12-trim | **Reversed by Reyhan 10 Nov 16:28Z** (+5% on 12-20 Nov and 30 Nov-3 Dec; -5% on 7-13 Dec removed). 7-11 Dec is now in range by algorithm moves; 17-20 Nov, 30 Nov-3 Dec and 11-14 Dec are further above the band. |
| t-p12-26nov-price | **Not fixed** (£287 room, +15% DSO, min 1; P100 vs band). |
| t-p04-weekly | **Not fixed** (18.0% vs 15%). |
| P01 18-20 Dec (new) | Cancelled stay not reopened: block extended to 21 Dec 10 Nov 14:41Z (who: NOT CHECKED). For Corentin. |
| Base changes | P04 220 -> 200 (Reyhan 9 Nov) still for Corentin to confirm; none on P01, P09, P12 since. |
| Push freshness | P12 pushed 16:30:08Z after the 16:30:06Z refresh; P01 pushed 11 Nov 04:47:56Z; P04 10 Nov 09:27:32Z; P09 10 Nov 07:27:40Z. All after their last edit. |

## Critical / high findings
- **CRITICAL: P04 unsynced Airbnb 1455876748739910219 still bookable on every P04 open run (day 12).** For example 18-25 Nov £1,203 and 6-13 Dec £1,291.
- **HIGH: P12 Reyhan +5% on 12-20 Nov and 30 Nov-3 Dec (10 Nov 16:28Z) runs against the comps.** 17-19 / 18-20 Nov now P73 / P89 of the band (+22% / +24%); 30 Nov-3 Dec +9.6% (P57). Supported room: 17-20 Nov about £185-218 (now 262-299); 30 Nov-3 Dec about £213-251 (now 266-282).
- **HIGH: P12 11-14 Dec £322/334/297 room, +18% vs band (P75)**, NL >P90, 0 of 3 nights booked. Supported room about £228-269.
- **HIGH (for Corentin to confirm): P01 18-20 Dec not reopened after the cancellation.** The Smoobu block was extended to 21 Dec 36 s after the cancellation. Comps support today's price (£318/n before fees vs median £324); worth about £806 room.
- **HIGH (for Corentin to confirm): P04 November at -30% to -38% vs comps after the 220 -> 200 base cut** (NL P28). Supported about +7-10% on 18-24 Nov; December is consistent with the cut.
- **MEDIUM: P12 26 Nov £287 room / £345 all-in, P100, +22% vs band (n = 4).** Supported room about £200-235.
- **MEDIUM: P09 12 Nov, tomorrow, is open but min 2 between bookings.** Only min 1 can sell it (about +11-19% vs the 1-night band at £100-120 room).
- **MEDIUM: P04 Airbnb weekly discount 18.0% of room vs 15% policy** (t-p04-weekly).
- **MEDIUM (standing-decision conflict, unchanged from 10 Nov): P04 November override -4% on 9-24 Nov vs policy -8% on 1-25 Nov.**

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-11.
- "10 Nov x" = the same comp and stay on 10 Nov, where it differs by more than £1.
- `*` = found by the 0.3 km second pass.
- Full source for every row: `data/snapshots/2026-11-11/comps.csv` (`comp-east`, `east-refband`, `east-ours`).

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 18 Dec-21 Dec | 18 Dec-20 Dec | 19 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | – | – | – | – | 320 | – | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 279 (10 Nov 299) | – | 376.33 (10 Nov 421) | 355 (10 Nov 409) | 432 (10 Nov 557) | 329 (10 Nov 365) | 304 (10 Nov 335) | 282 (10 Nov 405) | 285 (10 Nov 530) | 312 | 324.33 | 342 | 342 |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.45 (157) | none listed | – | 188 (10 Nov 175.50) | 184.67 (10 Nov 189.33) | 194 (10 Nov 198) | – | 201.50 (10 Nov 207) | 202.50 (10 Nov 207.50) | 206 (10 Nov 208) | – | – | 220.67 | 227 | 217.50 |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (56) | Lift | – | – | 340 (10 Nov 329.33) | – | – | – | – | – | – | – | 388.67 | – | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.62 (29) | Lift/River view/balcony | – | – | 255 | – | – | – | – | – | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – | – | – | – | – | – | – | 382.67 | – | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | – | 389 | – | – | 384.50 | – | – | – | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | 338.67* | 422 | 454 | – | – | – | – | 482.50 | 479 | 495.50 | 471 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.82 (17) | Lift | – | – | – | 335 | – | 335 | 335 | – | – | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (43) | Lift/Private patio or balcony/Superhost/Guest favourite (ADDED 2026-11-04, replaces inactive 20404597) (added 4 Nov, replaces inactive 20404597) | – | – | – | – | – | 472* | 472* | 472 | 500 | – | – | – | – |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – | – | – | – | – | – | – | 283.33 | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.8 (30) | | **279** (1) | **188** (1) | **338.67** (7) | **355** (5) | **443** (2) | **332** (4) | **335** (5) | **282** (3) | **392.50** (2) | **397.25** (2) | **324.33** (7) | **342** (3) | **342** (3) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.11 (9); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Nov-14 Nov | 18 Nov-21 Nov | 20 Nov-23 Nov | 21 Nov-24 Nov | 22 Nov-25 Nov | 18 Nov-25 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | 257.67 | – | – | – | – | – | – | – | – | 257.67 | 257.67 | 257.67 | 257.67 | 249 | – | – | – | 260 | 260 | – |
| [1083936003491396261](https://www.airbnb.co.uk/rooms/1083936003491396261) | 1.24 | 5 | 4.9 (41) | Superhost (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 110.29 |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (27) | Free parking on premises/Superhost/Guest favourite | – | – | 135 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.78 (40) | Free parking on premises/Superhost (added 30 Oct) | 250 | – | 248.33 | – | 325 | 250 | 250 | 250 (10 Nov 239) | 239 (10 Nov 227.50) | – | – | – | – | – | 248.33 | – | 273.33 | 241 (10 Nov 233.33) | – | 248.33 | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | 222 | 222 | – | 222 | – | 222 | 222 | 222 | 222 | 222 | 222 | 222 | – | – | – | – | 222 | 222 | 222 | 222 | 222 | 207 |
| [1387112821878102742 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 | 6 | 4.85 (27) | Parking (in name) (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (16) | Free on-street parking/Superhost | – | – | 188.33 | 210 | – | 217 | 217 | 217 | 222 | 227 | – | – | – | – | 188.33 | – | 198.67 | 203.67 | 205.67 | 196.33 | – | 166.57 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **156.33** | **160.33** | **159.67** | **158.67** | **127.14** | **190** | **210** | **222** | **215*** | **227** | **160.43** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | 175.33 | 180.67 | 179.67 | 177 | 171.86 | 212 | 225 | 227 | 219.67 | 231.67 | 184.43 |
| **Comp median (n)** | | | 4.85 (27) | | **236** (2) | **222** (1) | **218.33** (4) | **216** (2) | **325** (1) | **222** (3) | **222** (3) | **222** (3) | **222** (3) | **224.50** (2) | **222** (1) | **239.84** (2) | **257.67** (1) | **257.67** (1) | **248.33** (3) | **249** (1) | **222** (3) | **222** (3) | **213.83** (2) | **235.17** (4) | **241** (2) | **166.57** (3) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | P0 (-34.8%) | P0 (-37.8%) | P0 (-38.0%) | P0 (-36.1%) | P0 (-48.9%) | P0 (-14.4%) | P33 (-5.4%) | P50 (+3.8%) | P25 (-8.6%) | P50 (-5.8%) | P33 (-3.7%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Nov-13 Nov |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 164 | 165.50 (10 Nov 164) | – | – | – | 164 | 164 | 164 | 164 | 164 | 186 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 161 | 161 | – | – | – | 161 | 161 | 161 | 161 | 161 | 183 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.7 (23) | none listed | – | – | – | 147 | – | 193 | 190 | – | – | – | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | – | 200.50 | 196.67* | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | – |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | – | – | 221.50 (10 Nov 233.50) | 254.50 | – | – | – | – | – | – |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | 242.67 | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.56 (25.0) | | **162.50** (2) | **165.50** (3) | **219.67** (2) | **221.50** (3) | **251.50** (2) | **178.50** (4) | **177** (4) | **164** (3) | **164** (3) | **164** (3) | **184.50** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Nov-14 Nov | 18 Nov-20 Nov | 17 Nov-21 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 2 Dec-4 Dec | 7 Dec-10 Dec | 7 Dec-11 Dec | 11 Dec-14 Dec | 7 Dec-14 Dec | 13 Dec-14 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 187.50 (10 Nov 217.50) | 247.50 (10 Nov 237.50) | 235 (10 Nov 225) | 237.50 | – | 237.50 | 237.50* | 237.50 | 237.50 | 237.50 | 187.50 (10 Nov 217.50) | 247.50 (10 Nov 237.50) | 228.75 (10 Nov 218.75) | – | 225 | – | – | 225 | 218.75 | 225 | 200.71 | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking on premises | – | – | 256 | – | – | – | – | – | – | – | – | – | 257.50 | – | 316.67 | 312.50 | – | – | – | 352* | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (78) | Superhost | – | – | 199 (10 Nov 205) | – | – | – | – | – | – | – | – | – | 191.50 (10 Nov 187) | – | 205.33 (10 Nov 196) | 208.50 (10 Nov 205) | – | – | – | 283 (10 Nov 247) | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | – | 185 | 185 | 220 | – | 220 | 220 | 220 | – | – | – | 185 | 185 | – | 208.33 | – | – | 220 | 220 | – | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (120) | Superhost/balcony/Guest favourite | – | 254 | 250.67 | 254 | – | – | – | – | – | – | – | 254 | 247.75 | 284 | 250.67 | 243.75 | 254 | – | – | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | 1035 | 1035 | 1032.33 | 1039.50 (10 Nov 1035) | 1054 (10 Nov 1035) | 1035 | 1035 (10 Nov 1047.50) | 1035 (10 Nov 1047.50) | 1035 | 1035 | 1035 | 1035 | 1037.50 (10 Nov 1031) | 1043 | 1035.33 | 1033.25 | 1035 | 1032.33 (10 Nov 1040.67) | 1031 (10 Nov 1037.25) | 1032.33 | 879.29 (10 Nov 882.43) | 1043 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | – | 282 | 282 (10 Nov 287) | 287.50 | 352 (10 Nov 350.50) | 310 | 302.50 | 302 | 321.50 (10 Nov 332.50) | 347.50 (10 Nov 359.50) | – | 282 | 282 | 282 (10 Nov 297) | 285.67 | 293 (10 Nov 291.75) | 304 (10 Nov 301.50) | 305.33 | 306 | 342.67 (10 Nov 349.67) | 311.14 (10 Nov 313.86) | – |
| **Ours** | | | | | not bookable | **265.50** | not bookable | **270.50** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **248.50** | **270** | **248.50** | **345** | **260.67** | **251** | **280** | **260.67** | **261** | **336*** | **247.71** | not bookable |
| **Comp median (n)** | | | 4.86 (19) | | **187.50** (1) | **250.75** (4) | **242.83** (6) | **245.75** (4) | **352** (1) | **237.50** (3) | **237.50** (3) | **237.50** (3) | **279.50** (2) | **292.50** (2) | **187.50** (1) | **250.75** (4) | **238.25** (6) | **283** (2) | **237.83** (6) | **268.38** (4) | **279** (2) | **225** (3) | **220** (3) | **312.84** (4) | **255.93** (2) | n/a (0) |
| **Our pctl (vs median)** | | | | | – | P75 (+5.9%) | – | P75 (+10.1%) | – | – | – | – | – | – | P100 (+32.5%) | P75 (+7.7%) | P67 (+4.3%) | P100 (+21.9%) | P67 (+9.6%) | P50 (-6.5%) | P50 (+0.4%) | P67 (+15.9%) | P67 (+18.6%) | P50 (+7.4%) | P50 (-3.2%) | – |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 137.33 (10 Nov 148.33) | 170.50 | – | 170.50 | 170.50 | 170.50 | 183* (10 Nov 205.50) | 218 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | – | – | 164.33 | – | – | – | – | – | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | 160 | 135 | 135 | 135* | – | 135 | 135 | 135 | 147.50 | 160 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | 159.67 | – | – | – | – | 167.50 | 167.50 | 167.50 |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.92 (25) | Free parking on premises/Guest favourite | – | 145 | – | 181* | – | 181 | – | – | – | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (202) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | – | 135.50 | – | 140.50 | – | – | – | – | – | – |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | 146.67 | – | – | – | – | – | – | – |
| **Comp median (n)** | | | 4.84 (14) | | **160** (1) | **135.50** (3) | **146.67** (5) | **155.50** (4) | n/a (0) | **170.50** (3) | **152.75** (2) | **167.50** (3) | **167.50** (3) | **167.50** (3) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings (Airbnb only). Comp cancellation policies and band-listing sleeps: NOT CHECKED. Lift, view and parking come from listing-page reads on 25 Oct-5 Nov.
- **P01:** who extended the Smoobu block to 21 Dec (10 Nov 14:41:27) and why: NOT CHECKED. Our Airbnb all-in for 18-21 Dec is estimated (room + £149 cleaning, Airbnb guest fee excluded) because the listing is closed.
- **P09:** the 0.778 room ratio comes from the 7-11 Nov booking; whether min 1 is acceptable on 12 Nov is Corentin's call.
- **P12:** cleaning £150 from the 14-17 Nov Airbnb reservation; room targets are approximate. 26-27 Nov and 13-14 Dec bands are n = 4; no stored comp returned for 13-14 Dec. Why Reyhan raised 12-20 Nov and 30 Nov-3 Dec on 10 Nov: NOT CHECKED.
- **P04:** stored n is 1-4 per stay; band n 4-9, with a 5-unit operator (shown both ways). 1387112821878102742 only seen on 7-10 Jan in the sweep (the 0.3 km sweep returned 0 listings on most dates, so its November/December availability is NOT CHECKED). 18.0% weekly assumes £142 cleaning.
- **NL percentiles:** PriceLabs does not state the horizon or cleaning basis.
- Smoobu: only `/api/rates` (P01, P09) and `/api/reservations` (P01) were called; other prices are the 11 Nov `prices.csv` snapshot.
