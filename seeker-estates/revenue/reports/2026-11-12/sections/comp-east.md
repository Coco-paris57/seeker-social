# Competitor positioning: EAST batch (D = 2026-11-12)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy). Not analysed.
- **P15** has no listing of ours. Reference only.
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec, P09 26 Nov, P12 13 Dec).

**Method** (same as 26 Oct-11 Nov; scripts in the scratchpad `east12/bin`)
- **Comp ids:** same set as 11 Nov (`data/snapshots/2026-11-11/comps.csv`): P01 11, P04 7, P09 6, P12 7, P15 7. **None replaced.**
  - P15 1557062894259099964 was not returned on any stay today. A 60-day sweep (2-night stays every 4 days, 0.3 km box, 3 guests) found nothing from 12 Nov to 1 Jan, but it is **bookable 3-5 Jan 2027 (£270) and 7-9 Jan (£295)**. It is active, so it is **kept**.
  - P04 1387112821878102742 is still not returned on any stay. It was kept on 11 Nov after the Jan sweep and is kept again.
  - P12 29297702 is still a placeholder-like listing (about £1,035-1,063/n) and stays out of the medians.
- **Access:** public Airbnb pages (HTTP 200).
  - 84 wide searches: 2.5 km box for P04, 1.8 km for P09, 1.3 km for the rest. 4 guests for 2BR, 3 for 1BR.
  - Then 458 comp/stay checks in a 0.3 km box (`*` in the tables).
  - **Booking.com: NOT CHECKED.**
- **Price basis:** Airbnb **guest-paid all-in total / nights**. That is after discounts, with cleaning and Airbnb fees **included**; no separate taxes are shown. Ours are priced the same way. PriceLabs/Smoobu figures are **room only, cleaning excluded**.
- **Stays (same dates for comps and us):**
  - Default: next Fri-Sun 13-15 Nov, midweek Tue-Thu 17-19 Nov, and **30 days out 12-14 Dec (new today)**.
  - Trend stays as before: 24-27 Nov, 1-3, 4-6, 7-9, 8-10, 9-11, 10-12 and 11-13 Dec.
  - Key-date stays:
    - P01: 18-21, 18-20 and 19-21 Dec.
    - P04: 12-14 Nov, the 18-25 Nov runs and the 6-20 Dec runs.
    - P09: 12-13 Nov.
    - P12: 12-14 and 13-14 Nov, 17-21 Nov runs, 26-27 Nov, 30 Nov-4 Dec runs, and 7-14 Dec runs.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius, excluding ours.
  - The P04 band leaves out 1588439248552365607 (placeholder-like).
  - The P04 band is shown both with and without collapsing the 5-unit 1531... operator to one listing.
- **Data written:** `data/snapshots/2026-11-12/comps.csv` did not exist.
  - Under `flock` on `.comps.csv.lock` I copied 11 Nov forward (15,489 lines) and **appended 1,136 rows**, giving 16,625 lines.
  - 632 `comp-east` rows: every stored comp x stay, with NOT RETURNED rows kept.
  - 364 `east-refband` rows.
  - 140 `east-ours` rows: our Airbnb all-in, the unsynced P04 listing, and the Smoobu room price per key night with the 12 Nov raw PriceLabs price/user_price/uncustomized.
  - None of the `east-ours`/`east-refband` rows are comps.
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` (listing, 11-12 Nov, 4 listings): 3 entries, all P04.
  - `get_listing_date_overrides` for 3562176 and 2699998.
  - `get_neighbourhood_data` for P12, P04, P01 and P09 (all `all_operations_ok`).
- **Smoobu: not called today.** P01/P09 status comes from the 12 Nov raw PriceLabs, `prices.csv`, `reservations.csv` and the Airbnb searches.

## What changed since 11 Nov 06:00Z (this batch)
**P04 Barking 3562176: Reyhan, 11 Nov 17:16Z** (`get_user_logs`; confirmed by `get_listing_date_overrides` `updated_at`). Refreshed and pushed 17:17Z (`listings.csv` last_push 17:17:09Z).
- 17:16:19Z: **11-24 Nov price override removed, min stay 2.**
- 17:16:39Z: **18-24 Nov -5%, min 3.** This was -4% (9 Nov). Net result:
  - **12-17 Nov now have no price override and min 2.**
  - 18-24 Nov are at -5% with min 3.
- 17:16:47Z: **6-22 Dec -5%, min 3 (new).** December had no override on these dates before.
- Effect on PriceLabs room prices, 11 Nov -> 12 Nov (`prices.csv`):
  - 18-24 Nov: 139/141/147/150/145/145/146 -> **138/140/146/148/143/143/144**.
  - 6-19 Dec: **-1% to -5%**, for example 6 Dec 187 -> 181, 12 Dec 200 -> 193 and 19 Dec 206 -> 201.
- Effect on our Airbnb all-in:
  - 6-9 Dec 190 -> 185.67.
  - 9-12 Dec 210 -> 197.
  - 11-14 Dec 222 -> 216.33.
  - 17-20 Dec 227 -> 221.33.
  - 6-13 Dec 160.43 -> 156.14.
- **New: our synced listing is bookable for 2 nights on 12-14 Nov** (£379 total, £189.50/n; PriceLabs 13 Nov £147, min 2).
  - This conflicts with policy `listing_facts.P04.min_stay_rule` ("never open for less than 3 nights").
  - **It is for Corentin to confirm, not a new proposal.**
- **Also for Corentin to confirm (standing-decision conflict):** policy `price_changes` 24 Oct sets **-8% on 1-25 Nov**. PriceLabs now has none on 12-17 Nov and -5% on 18-24 Nov (26-30 Nov is still -8%).

**P12 Mile End 2699998: no edit since Reyhan's 10 Nov 16:28Z** (overrides unchanged).
- Current overrides:
  - +5% on 12-20 Nov and 30 Nov-3 Dec.
  - +15% (min 1) on 26 Nov.
  - **7-13 Dec has min 3 and no price override.** Reyhan's +5% does **not** cover 7-14 Dec.
  - 14 Dec -5% (after the handback, blocked).
- The algorithm moved room prices (11 Nov 09:16Z refresh; `prices.csv` 11 Nov -> 12 Nov):
  - 17-20 Nov 262/268/274/299 -> **253/247/257/291**.
  - **26 Nov 287 -> 298**.
  - 30 Nov-3 Dec 282/266/277/291 -> 279/280/270/284.
  - 7-13 Dec 267/274/285/291/322/334/297 -> 265/271/280/290/319/329/292.

**P01 Bowsprit Point 3320302: 18-20 Dec still not reopened.**
- 12 Nov raw PriceLabs shows 18/19/20 Dec `Blocked`, price 284/276/246, min 3.
- Our listing was not returned for 18-21, 18-20 or 19-21 Dec.
- No PriceLabs edit (`get_user_logs`).

**P09 Torrent Lodge 3318172: 12 Nov (tonight) passed unsold.**
- Our listing was not returned for 12-13 Nov. There is no 12 Nov stay in `reservations.csv`.
- 13-15 and 15-27 Nov are booked (Airbnb, confirmed).
- **No sellable P09 night remains before the 26 Nov handback.**

**Comps are flat.** The median same-comp, same-stay change vs 11 Nov is 0.0% on every stay except P01 4-6 Dec (+6.9%) and 10-12 Dec (-6.6%), and P09 4-6 Dec (-4.4%). Moves of £10 or more:
- **P12 1670196516322802487** (Superhost, 4.93): 17-19 / 18-20 / 17-21 Nov 185 -> **160**.
- **P12 1120913156789373408:** 11-14 Dec 283 -> 243.33.
- **P12 1383544079404594066:** 11-13 / 11-14 Dec -> 329.
- **P12 1077363497194834681:** 24-27 Nov 235 -> 225.
- **P01 1439222085860877494:** 7-12 Dec 472/500 -> 405.50/439.
- **P01 1374450835187037179:** 1-3 Dec 335 -> 280.
- **P01 41905186:** 4-6 Dec 432 -> 492.
- **P04 1577633201778145138:** 10-12 Dec 239 -> 250.
- **P15 1617544963466664181:** 11-13 Dec 218 -> 195.50.

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 12 Nov)
These are market bands, not comps. PriceLabs does not state their horizon or cleaning basis. "Ours" is the PriceLabs room price on open nights (`prices.csv` 12 Nov).

| Ref | Band (n) | P25/P50/P75/P90 today (11 Nov) | Market occ 30 / 60 (`pl_kpis.csv`) | Ours and NL percentile |
|---|---|---|---|---|
| P04 | 2BR (89) | 140/178/215/263 (140/176/213/261) | 24% / 20% | **Next 14 days** (13, 18-24 Nov, 8 n): £143.6, **P27** (11 Nov P27). **November 18-24** (7 n): £143.1, **P27** (P28). **December** (6-19 Dec, 14 n): £184.6, **P54** (P60). |
| P09 | 1BR (125) | 111/134/161/205 (110/133/160/204) | 38% / 32% | No open night before the 26 Nov handback. |
| P12 | 2BR (118) | 171/206/233/291 (170/205/232/289) | 42% / 34% | **Next 14 days** (13, 17-20, 26 Nov, 6 n): £268.2, **P84**. **17-20 Nov** £262, **P82**. **26 Nov** £298, **>P90** (P89). **30 Nov-3 Dec** £278.2, **P87**. **7-10 Dec** £276.5, **P86**. **11-13 Dec** £313.3, **>P90**. 7-13 Dec £292.3, >P90. |
| P01 | 2BR (146) | 216/262/336/432 (215/260/335/429) | 35% / 28% | **18-20 Dec** (blocked) £268.7 room would be **P52**. |

- `occ_insights`:
  - P12 market 4-7 Dec +8.2% (we are booked 4-6 Dec).
  - P04 3-5 Dec +9.2% (booked).
  - P09 7-10 Dec +9.6% (after the handback).
  - All four: 27/28 Dec-1 Jan +15.2% to +18.6%.
- `fp_insights`: 26/27-31 Dec surge P04 +7.4%, P12 +21.7%, P09 +26.4%, P01 +25.6%.

## Priority 1: P12 Mile End. 17-20 Nov, 26 Nov, 30 Nov-3 Dec, 7-14 Dec
- **Quality:** `quality_premium` = **-0.15** (cap). We are 4.27 from 15 reviews; stored-comp median 4.86 from 19 (gap -4). **Supported: band median x 0.85-1.00 (-15% to 0%).**
- Room targets scale our all-in/room ratio for each stay, for example 17-19 Nov 1.016, 26 Nov 1.185, 11-14 Dec 1.06. They are approximate.

| Stay | Ours all-in today (11 Nov) | PriceLabs room = Smoobu | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room | Move needed |
|---|---|---|---|---|---|---|
| 12-14 Nov (tonight) | 265 (248.50) | 263 (13 Nov; 12 Nov not in snapshot) | 245 (2), P50, +8.2% | 187.50 (1), P100, +41.3% | 207-243 | -8% to -21% (n = 2; low confidence) |
| **17-19 Nov** | **254** (265.50) | 253/247 | 196.50 (11), **P64, +29.3%** | 250.75 (4), P50, +1.3% | 164-193 | -23% to -34% |
| **18-20 Nov** | **255.50** (270) | 247/257 | 222 (10), **P70, +15.1%** | 250.75 (4), P75, +1.9% | 186-219 | -13% to -26% |
| 17-21 Nov (4 n) | 238 (248.50) | 253/247/257/291 | 247.75 (9), P44, -3.9% | 247.75 (5), P40, -3.9% | 232-273 | -12% to +4% (in range) |
| **26-27 Nov (1 n)** | **353** (345) | **298** (raw user_price 287, uncustomized 276; +15% DSO) | 283 (4), **P100, +24.7%** | 283 (2), P100, +24.7% | **203-239** | **-20% to -32%** |
| **30 Nov-3 Dec** | 261.67 (260.67) | 279/280/270 | 260.17 (14), P50, **+0.6%** | 237.84 (6), P67, +10.0% | 234-275 | -1% to -15% |
| 30 Nov-4 Dec | 250.50 (251) | 279/280/270/284 | 232.88 (14), P57, +7.6% | 243.75 (5), P60, +2.8% | 220-259 | -7% to -21% |
| 1-3 Dec (trend) | 273 (270.50) | 280/270 | 246.50 (10), P60, +10.8% | 245.75 (4), P75, +11.1% | 211-248 | -10% to -23% |
| 2-4 Dec | 274.50 (280) | 270/284 | 240.50 (11), P64, +14.1% | 254 (3), P67, +8.1% | 206-243 | -12% to -26% |
| **7-10 Dec** | 258.33 (260.67) | 265/271/280 | 230.50 (12), P58, **+12.1%** | 225 (3), P67, +14.8% | 206-243 | -11% to -24% |
| 7-11 Dec | 249.25 (261) | 265/271/280/290 | 240.75 (13), P54, +3.5% | 220 (3), P67, +13.3% | 227-267 | -3% to -18% |
| **7-14 Dec (7 n)** | 245.14 (247.71; weekly 15.0% applied) | 265-329 | 220.72 (12), P58, **+11.1%** | 251.86 (2), P50, -2.7% | 224-263 | -10% to -23% |
| **11-14 Dec (3 n)** | **332** (336) | **319/329/292** | 288 (13), **P77, +15.3%** | 286.17 (4), P75, +16.0% | **231-272** | **-13% to -26%** |
| 12-14 Dec (30 days out) | not bookable (min 3) | 329/292 | 283.50 stored (2) | | n/a | n/a |
| 13-14 Dec (1 n) | not bookable (min 3) | 292 | none returned | | n/a | n/a |

**Supported positioning** (lowering a PriceLabs price is Corentin's call; a-p12-trim):
- **17-20 Nov: about -13% to -30%** for 2-night stays (room about £165-220 vs 247-291).
  - Reyhan's +5% still sits under the algorithm prices. Today is band P64-70 (+15% to +29%).
  - The 4-night 17-21 Nov stay is in range (-4%) because Airbnb prices it lower per night.
  - A Superhost comp (1670196516322802487, 4.93) cut to £160 today.
- **26 Nov: room about £205-240, keep min 1.** It is now £298, 11 Nov's £287 plus the algorithm, with the +15% DSO still on. That is **P100, +25% vs band (n = 4), NL >P90**. **t-p12-26nov-price not fixed.** PriceLabs `price` rose £11; raw `user_price` is still 287.
- **30 Nov-3 Dec: about -5% to -10%.** The 3-night stay is at band parity (+0.6%, P50) but +8% to +14% on the 1-3 Dec and 2-4 Dec sub-stays and +10% vs stored. Reyhan's +5% is the part not supported.
- **7-14 Dec:** Reyhan's +5% is not on these dates (no price override, min 3).
  - 7-10 Dec is +12% (P58).
  - 11-14 Dec is +15% vs band (P77) and NL >P90, room about **£230-270 vs £319/329/292**.
  - 7-11 Dec is in range (+3.5%).
  - Supported: **-10% to -25% on 7-10 and 11-14 Dec.**
- **`recommend`:**
  - 30-day (12 Nov-11 Dec): comp P67 over 13 stays gives **hold** (booked 50% vs market 42%). NL P86 also gives **hold**.
  - 60-day: no sellable P12 night (12-13 Dec is a 2-night gap under min 3 before the handback).
  - The `hold` comes from the 50% lead and the P67 median. The stay-level evidence (band P64-P100 on 17-20 Nov, 26 Nov, 2-4 Dec, 7-10 and 11-14 Dec; -0.59 star; -15% quality cap) **supports the trims above, not the +5%**.

## Priority 2: P04 Barking. November and December after the base cut 220 -> 200 and Reyhan's 11 Nov overrides
- **Quality:** `quality_premium` = **-0.15** (cap). Synced listing 4.11 from 9 reviews; comp median 4.85 from 27 (gap -18). **Supported: about -15% vs comp/band median (x 0.85-1.00).**

| Stay | Ours all-in today (11 Nov) | PriceLabs room | Stored median (n), pctl, vs | Band median all / operator once (n), vs | Our pctl in band | Supported room |
|---|---|---|---|---|---|---|
| **12-14 Nov (2 n, min 2: policy conflict)** | **189.50** (not bookable) | 147 (13 Nov) | none returned | 237.50 (2) / 237.50 (1), -20.2% | P0 | n/a (policy: never under 3 nights) |
| 18-21 Nov | 155.67 (156.33) | 138/140/146 | 239.84 (2), P0, **-35.1%** | 235 (5) / 222 (3), **-33.8% / -29.9%** | P0 | 171-202 |
| 20-23 Nov | 159 (160.33) | 146/148/143 | 257.67 (1), P0, -38.3% | 240 (4) / 228.50 (2), -33.8% / -30.4% | P0 | 178-209 |
| 21-24 Nov | 158 (159.67) | 148/143/143 | 257.67 (1), P0, -38.7% | 235 (4) / 226.50 (2), -32.8% / -30.2% | P0 | 176-207 |
| 22-25 Nov | 157 (158.67) | 143/143/144 | 248.33 (3), P0, -36.8% | 230 (7) / 225.67 (4), -31.7% / -30.4% | P0 | 175-206 |
| 18-25 Nov (7 n) | 126 (127.14) | 138-148 | 249 (1), P0, -49.4% | 215.57 (4) / 215.57 (3), -41.6% | P0 | 208-245 |
| 6-9 Dec | 185.67 (190) | 181/180/181 | 222 (3), P0, -16.4% | 230 (9) / 214.34 (6), -19.3% / -13.4% | P22 | 177-209 |
| 9-12 Dec | 197 (210) | 179/184/190 | 222 (3), P0, -11.3% | 235 (8) / 222 (5), -16.2% / -11.3% | P12 | 177-208 |
| 11-14 Dec | 216.33 (222) | 190/193/180 | 213.84 (2), P50, +1.2% | 222 (5) / 214.34 (4), -2.6% / +0.9% | P40 | 158-186 |
| 14-17 Dec | 208.67* (215*) | 176/179/182 | 235.17 (4), P25, -11.3% | 218.67 (9) / 233.84 (6), -4.6% / -10.8% | P11 | 170-201 |
| 17-20 Dec | 221.33 (227) | 186/193/201 | 241 (2), P0, -8.2% | 228 (7) / 235.50 (4), -2.9% / -6.0% | P0 | 175-206 |
| 6-13 Dec (7 n) | 156.14 (160.43) | 179-193 | 186.79 (2), P0, -16.4% | 181.29 (6) / 155.57 (5), -13.9% / +0.4% | P50 | 156-183 |

- **November (18-24 Nov open, 7 nights):** we sit **-30% to -39%** vs the stored set and the band (operator-collapsed -30%). NL **P27**.
  - The quality-supported level is about -15%, room about **£171-209** vs today's £138-148.
  - **Neither the base cut nor Reyhan's -5% (11 Nov) is supported by the comps for November.**
  - Supported move: **take back the cuts, about +7-10%** (room roughly back to the 9 Nov £150-165), as on 10-11 Nov. The comps would support up to about +20%. But the market is at 24% occupancy next 30 days, and Corentin judged on 24 Oct that there was no November demand. Low confidence (band n = 4-7, stored n = 1-3).
  - `recommend` 30-day: **raise +10%** (comp P0 over 9 stays, NL P39; booked 52% vs market 24%).
- **December (6-19 Dec open):** -16% to +1% vs stored, -19% to -3% vs band (operator-collapsed -13% to +1%). NL P54 (P60 yesterday).
  - After Reyhan's new -5%, **6-12 Dec sits at or below the -15% floor** (-11% to -19%). **Hold, do not cut further. Removing the -5% on 6-12 Dec is supported.**
  - 11-20 Dec (-3% to -11%, 11-14 Dec at parity) is inside the supported range: **hold**.
  - `recommend` 60-day (12-31 Dec) gives **raise +10%** (comp P12, n = 2; NL P56). **Not adopted** beyond 6-12 Dec: the lead comes from the 25 Nov-6 Dec and 20 Dec-2 Jan bookings.
- **2 Dec** (+200%, min 1, £457) is deprioritised in policy and not raised.
- **Weekly discount (t-p04-weekly), not fixed.**
  - Airbnb shows £162.34 off £1,044 on 18-25 Nov and £208.66 off £1,302 on 6-13 Dec.
  - Taking out the £142 cleaning, that is **18.0% of room on both**, vs the 15% policy.
  - P12 7-14 Dec: £276.23 off £1,992 = **15.0%** (cleaning £150).

## P04 unsynced listing 1455876748739910219 (Barking 1455, day 13)
- **Still bookable on every P04 open run of 3+ nights checked:**

| Run | Price |
|---|---|
| 18-21 Nov | £526 |
| 20-23 Nov | £542 |
| 21-24 Nov | £539 |
| 22-25 Nov | £531 |
| 18-25 Nov | £1,203 |
| 6-9 Dec | £599 |
| 9-12 Dec | £675 |
| 11-14 Dec | £681 |
| 14-17 Dec | £659 |
| 17-20 Dec | £695 |
| 6-13 Dec | £1,291 |

- It was not returned for 12-14 Nov.
- It is 5-14% dearer than the synced listing on the 3-night runs, and 36% dearer on 18-25 Nov (7 nights). A booking on it would not reach Smoobu. **t-p04-doublebook: not fixed.**

## Priority 3: P01 Bowsprit Point 18-20 Dec (cancelled stay, before the 20 Dec handback)
- **Nothing is open.** All nights to 29 Nov are booked; 30 Nov-21 Dec are blocked (12 Nov raw).
- **Comps (18-21 Dec, 3 n, all-in):** stored median **£353.50** (n = 8, range 220.67-711; 11 Nov £324.33, n = 7). Band median **£339.17** (n = 16). For 18-20 Dec: stored £418.75 (n = 4), band £418.75 (n = 8).
- **If reopened** at today's PriceLabs room 284/276/246 (£806; NL P52) + £149 cleaning, that is **£318.33/n before the Airbnb guest fee**. That is **P25 of the stored set, -10% vs stored and -6% vs band**.
- **Supported: parity with the comp median (0%).** `quality_premium` = 0.0 (4.75 from 4 reviews, under the 5-review threshold; comp median 4.8 from 30).
  - The current price is at or below what the comps support. No cut is needed; up to about +6-10% would still be at parity.
  - Min 3 fits the 3-night gap.
- **For Corentin to confirm (policy conflict, carried from 11 Nov, not a new proposal):** policy `handbacks` says "before the date, maximise revenue normally". The block covers 18-20 Dec (worth about £806 room). Who extended it: NOT CHECKED.
- `recommend`: raise-signal (booked 100% vs market 35%, no open night).

## Priority 4: P09 Torrent Lodge, next open nights
- **No open night before the 26 Nov handback.** 13-15 Nov and 15-27 Nov are booked (`reservations.csv`, confirmed). 27 Nov onward is the handback block.
- **12 Nov (tonight) passed unsold:** our listing was not returned for 12-13 Nov, and there is no 12 Nov stay in `reservations.csv`.
  - The 1-night comps for 12-13 Nov: band median £183 (n = 5, range 140-237); stored £184.50 (n = 2).
  - **t-p09-1112block: closed, not sold** (1 night). Nothing to position.
- `quality_premium` 0.0 (5.0 from 3 reviews; comp median 4.56). `recommend`: raise-signal (booked 97% vs 38%).

## Summary per property
`recommend` runs on the median comp percentile of our priced open stays in each window (12 Nov-11 Dec / 12-31 Dec), with `quality_premium` (needs 5+ reviews).

| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market (`pl_kpis`) | `recommend` 30 / 60 | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | Nothing open (18-20 Dec blocked) | stored 282-473 (n 2-8); 18-21 Dec 353.50 (8) | n/a (would be P25 at today's price) | 4.75 vs 4.8 | 4 vs 30 (-26) | 0.0 (<5 reviews) | 100% / 100% vs 35% / 28% | raise-signal | **parity** if 18-20 Dec reopens (current price -6% to -10%, supported) |
| P04 (synced 1657…) | 126-221.33 (+189.50 on 12-14 Nov) | stored 186.79-257.67 (n 1-4); band 181-240 (n 2-9) | P0 November; P0-P50 December | 4.11 vs 4.85 | 9 vs 27 (-18) | -0.15 | 47% / 45% vs 24% / 20% | raise +10% (P0, 9 stays) / raise +10% (P12, n 2); NL P39 / P56 | **-15%**. November -30% to -39%: take back about +7-10%. December 6-12 Dec -11% to -19%: hold, removing Reyhan's -5% is supported; 11-20 Dec hold |
| P04 unsynced 1455… | 171.86-231.67, bookable on every 3+ night run | | | 4.69 | 26 | n/a | | | map or unlist |
| P09 | No sellable night (12 Nov passed unsold; 13-26 Nov booked) | 1-night band 183 (5), stored 184.50 (2) | n/a | 5.0 vs 4.56 | 3 vs 25 (-22) | 0.0 | 97% / handback vs 38% / 32% | raise-signal | nothing to position before the handback |
| P12 | 238-353 | band 196.50-288; stored 187.50-286.17 | band P44-P100 (median P58) | 4.27 vs 4.86 | 15 vs 19 (-4) | -0.15 | 50% / 70% vs 42% / 34% | hold (P67, 13 stays) / no sellable night; NL hold (P86) | **-15% to 0% vs band:** 17-20 Nov -13% to -30%; 26 Nov -20% to -32%; 30 Nov-3 Dec -5% to -10%; 7-10 Dec and 11-14 Dec -10% to -25%; hold 17-21 Nov (4 n) and 7-11 Dec |
| P15 | No listing of ours | 140.25-185.25 (n 1-4) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | Blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 12 Nov)
| Item | Status |
|---|---|
| t-p04-doublebook | **Not fixed** (day 13). 1455 is bookable on all 11 P04 open runs of 3+ nights. |
| t-p09-1112block | **Closed, not sold.** 12 Nov passed with no booking; our listing was not returned for 12-13 Nov. No P09 night left before the handback. |
| a-p12-trim | **Not done.** No P12 edit since 10 Nov 16:28Z. The algorithm took 3-10% off 17-20 Nov; 26 Nov rose. 17-20 Nov, 26 Nov, 2-4 Dec, 7-10 Dec and 11-14 Dec are still above the supported range. |
| t-p12-26nov-price | **Not fixed** (£298 room price field / user_price 287; +15% DSO, min 1; P100 vs band, +24.7%). |
| t-p04-weekly | **Not fixed** (18.0% vs 15%). |
| t-p01-1820block | **Not fixed.** 18-20 Dec still `Blocked` (12 Nov raw); our listing not returned. For Corentin. |
| P04 base 220 -> 200 (Reyhan 9 Nov) | Still for Corentin to confirm. **New 11 Nov 17:16Z:** 12-17 Nov price override removed and min 2; 18-24 Nov -5%; 6-22 Dec -5%. |
| Push freshness | P04 pushed 11 Nov 17:17:09Z after the 17:16Z edits. P12 last push 11 Nov 09:16:09Z after its last edit (10 Nov). P01 pushed 12 Nov 04:50:59Z. P09 last listing push 11 Nov 07:21:36Z; prices file refreshed 12 Nov 07:02Z. |

## Critical / high findings
- **CRITICAL: P04 unsynced Airbnb 1455876748739910219 is still bookable on every P04 open 3+ night run (day 13).** For example 18-25 Nov £1,203 and 6-13 Dec £1,291.
- **HIGH (for Corentin to confirm, standing-decision conflict): P04 is open for 2 nights on 12-14 Nov.** Reyhan set min 2 on 11-17 Nov (11 Nov 17:16:19Z). Our listing is bookable 12-14 Nov at £379 (£189.50/n). Policy says never open P04 for fewer than 3 nights. The same edit removed the price override on 12-17 Nov and set -5% on 18-24 Nov, vs the policy's -8% on 1-25 Nov.
- **HIGH: P12 17-20 Nov.** The 2-night stays are band P64-70 (+15% to +29%). Supported room is about £165-220, vs 247-291 today with Reyhan's +5%.
- **HIGH: P12 11-14 Dec.** Room is £319/329/292, +15% vs band (P77), NL >P90, with 0 of 3 nights booked. Supported room is about £231-272.
- **HIGH (for Corentin to confirm): P01 18-20 Dec still blocked after the 10 Nov cancellation.** The comps support today's price (£318/n before fees vs median £353.50, -10%). It is worth about £806 room.
- **HIGH (for Corentin to confirm): P04 November is at -30% to -39% vs comps** (NL P27) after the 220 -> 200 base cut and Reyhan's -5% on 18-24 Nov. Taking back about +7-10% on 18-24 Nov is supported.
- **MEDIUM: P12 26 Nov.** Room is £298 / £353 all-in, P100, +24.7% vs band (n = 4). Supported room is about £203-239.
- **MEDIUM: P12 7-10 Dec at +12% vs band (P58)** and 2-4 Dec at +14%. Supported is about -10% to -20%.
- **MEDIUM: P04 Dec 6-12 is now -11% to -19% vs comps** after Reyhan's new -5% (6-22 Dec). That is at or below the quality-supported floor, so removing the -5% on 6-12 Dec is supported.
- **MEDIUM: P04 Airbnb weekly discount is 18.0% of room vs the 15% policy** (t-p04-weekly).
- **MEDIUM: P09 12 Nov passed unsold** (the last open night before the handback; 1-night band £183).

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-12.
- "11 Nov x" = the same comp and stay on 11 Nov, where it differs by more than £1.
- `*` = found by the 0.3 km second pass.
- Full source for every row: `data/snapshots/2026-11-12/comps.csv` (`comp-east`, `east-refband`, `east-ours`).

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 18 Dec-21 Dec | 18 Dec-20 Dec | 19 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | – | – | – | – | – | 320 | – | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | – | 594 | 376.33 | 355 | 492 (11 Nov 432) | 329 | 304 | 282 | 282 (11 Nov 285) | 309 (11 Nov 312) | 289 | 324.33 | 342 | 342 |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.45 (157) | none listed | – | 184.50 (11 Nov 188) | 183 (11 Nov 184.67) | 192.50 (11 Nov 194) | – | 200.50 | 201.50 | 205 | – | – | – | 220.67 | 227 | 217.50 |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (56) | Lift | – | – | 302.33 (11 Nov 340) | – | – | – | – | – | – | – | – | 386 (11 Nov 388.67) | – | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.6 (30) | Lift/River view/balcony | – | – | 255 | – | – | – | – | – | – | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – | – | – | – | – | – | – | – | 382.67 | – | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | – | 389 | – | – | 384.50 | – | – | – | – | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | 338.67 | 422 | 454 | – | – | – | – | 482.50 | 454 | 479 | 495.50 | 471 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.82 (17) | Lift | – | – | – | 280 (11 Nov 335) | – | 335 | 335 | – | – | – | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (43) | Lift/Private patio or balcony/Superhost/Guest favourite (ADDED 2026-11-04, replaces inactive 20404597) (added 4 Nov, replaces inactive 20404597) | – | – | – | – | – | 405.50 (11 Nov 472) | 405.50 (11 Nov 472) | 405.50 (11 Nov 472) | 439 (11 Nov 500) | – | – | 711 | 640.50 | 758 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – | – | – | – | – | – | – | – | 281 (11 Nov 283.33) | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.8 (30) | | n/a (0) | **389.25** (2) | **302.33** (7) | **355** (5) | **473** (2) | **332** (4) | **335** (5) | **282** (3) | **360.50** (2) | **395.75** (2) | **371.50** (2) | **353.50** (8) | **418.75** (4) | **406.50** (4) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.11 (9); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 12 Nov-14 Nov | 18 Nov-21 Nov | 20 Nov-23 Nov | 21 Nov-24 Nov | 22 Nov-25 Nov | 18 Nov-25 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | 257.67 | – | – | – | – | – | – | – | – | – | 257.67 | 257.67 | 257.67 | 257.67 | 249 | – | – | – | 260 | 260 | – |
| [1083936003491396261 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1083936003491396261) | 1.24 | 5 | 4.9 (41) | Superhost (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (27) | Free parking on premises/Superhost/Guest favourite | – | – | 143 (11 Nov 135) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.78 (40) | Free parking on premises/Superhost (added 30 Oct) | – | – | 248.33 | – | – | 250 | 250 | 250 | 250 (11 Nov 239) | – | – | – | – | – | – | 248.33 | – | 273.33 | 248.33 (11 Nov 241) | – | 248.33 | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | – | 222 | – | 222 | – | 222 | 222 | 222 | 222 | 222 | 222 | – | 222 | – | – | – | – | 222 | 222 | 222 | 222 | 222 | 207 |
| [1387112821878102742 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 | 6 | 4.85 (27) | Parking (in name) (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (16) | Free on-street parking/Superhost | – | – | 185.33 (11 Nov 188.33) | 210 | – | 217 | 217 | 217 | 222 | 227 | 220 | – | – | – | – | 185.33 (11 Nov 188.33) | – | 198.67 | 203.67 | 205.67 | 196.33 | – | 166.57 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **189.50** | **155.67** | **159** | **158** | **157** | **126** | **185.67** | **197** | **216.33** | **208.67** | **221.33** | **156.14** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | 175.33 | 180.67 | 179.67 | 177 | 171.86 | 199.67 | 225 | 227 | 219.67 | 231.67 | 184.43 |
| **Comp median (n)** | | | 4.85 (27) | | n/a (0) | **222** (1) | **216.83** (4) | **216** (2) | n/a (0) | **222** (3) | **222** (3) | **222** (3) | **222** (3) | **224.50** (2) | **221** (2) | n/a (0) | **239.84** (2) | **257.67** (1) | **257.67** (1) | **248.33** (3) | **249** (1) | **222** (3) | **222** (3) | **213.83** (2) | **235.17** (4) | **241** (2) | **186.78** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | P0 (-35.1%) | P0 (-38.3%) | P0 (-38.7%) | P0 (-36.8%) | P0 (-49.4%) | P0 (-16.4%) | P0 (-11.3%) | P50 (+1.2%) | P25 (-11.3%) | P0 (-8.2%) | P0 (-16.4%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 12 Nov-13 Nov |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 164 | 164 (11 Nov 165.50) | – | – | – | 164 | 164 | 164 | 164 | 164 | 164 | 186 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 161 | 161 | – | – | – | 161 | 161* | 161 | 161* | 161 | 161.50 | 183 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.7 (23) | none listed | – | – | – | 150 (11 Nov 147) | – | 195.50 (11 Nov 193) | 191 | – | – | – | – | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | – | 200.50 | 196.67 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | – |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | – | – | 214.50 (11 Nov 221.50) | 232 (11 Nov 254.50) | – | – | – | – | – | – | – |
| [958156921765583815 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | – | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.56 (25.0) | | **162.50** (2) | **164** (3) | **196.67** (1) | **214.50** (3) | **240.25** (2) | **179.75** (4) | **177.50** (4) | **164** (3) | **164** (3) | **164** (3) | **164** (3) | **184.50** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 12 Nov-14 Nov | 13 Nov-14 Nov | 18 Nov-20 Nov | 17 Nov-21 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 2 Dec-4 Dec | 7 Dec-10 Dec | 7 Dec-11 Dec | 11 Dec-14 Dec | 7 Dec-14 Dec | 13 Dec-14 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 187.50 | 247.50 | 225 (11 Nov 235) | 237.50 | – | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 187.50 | – | 247.50 | 226.25 (11 Nov 228.75) | – | 225 | – | – | 225 | 218.75 | 225 | 200.71 | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking on premises | – | – | 256 | – | – | – | – | – | – | – | – | – | – | – | 257.50 | – | 316.67 | 312.50* | – | – | – | 352 | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (79) | Superhost | – | – | 203.67 (11 Nov 199) | – | – | – | – | – | – | – | – | – | – | – | – | – | 203.33 (11 Nov 205.33) | 210.25 (11 Nov 208.50) | – | – | – | 243.33 (11 Nov 283) | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.94 (16) | Superhost/Guest favourite | – | 160 (11 Nov 185) | 185 | 220 | – | 220 | 220 | 220 | – | – | – | – | – | 160 (11 Nov 185) | 160 (11 Nov 185) | – | 208.33 | 211.25 | 220 | 220 | 220 | – | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (120) | Superhost/balcony/Guest favourite | – | 254 | 250.67 | 254 | – | – | – | – | – | – | – | – | – | 254 | 247.75 | 284 | 250.67 | 243.75 | 254 | – | – | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | 1052 (11 Nov 1035) | 1035 | 1032.33 | 1035 (11 Nov 1039.50) | 1035 (11 Nov 1054) | 1035 | 1035 | 1035 | 1035 | 1048.50 (11 Nov 1035) | 1058.50 | – | 1077 | 1045 (11 Nov 1035) | 1036 (11 Nov 1037.50) | 1043 | 1032.33 (11 Nov 1035.33) | 1031 (11 Nov 1033.25) | 1035 | 1032.33 | 1031 | 1048 (11 Nov 1032.33) | 885 (11 Nov 879.29) | 1063 (11 Nov 1043) |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | – | 282 | 282 | 289.50 (11 Nov 287.50) | – | 305.50 (11 Nov 310) | 297 (11 Nov 302.50) | 297 (11 Nov 302) | 315.50 (11 Nov 321.50) | 329 (11 Nov 347.50) | 329.50 | – | 282 | 282 | 282 | 282 | 287 (11 Nov 285.67) | 293 | 304 | 300.67 (11 Nov 305.33) | 301.25 (11 Nov 306) | 329 (11 Nov 342.67) | 303 (11 Nov 311.14) | – |
| **Ours** | | | | | not bookable | **254** | not bookable | **273** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **265** | not bookable | **255.50** | **238** | **353** | **261.67** | **250.50** | **274.50** | **258.33** | **249.25** | **332** | **245.14** | not bookable |
| **Comp median (n)** | | | 4.86 (19) | | **187.50** (1) | **250.75** (4) | **237.83** (6) | **245.75** (4) | n/a (0) | **237.50** (3) | **237.50** (3) | **237.50** (3) | **276.50** (2) | **283.25** (2) | **283.50** (2) | **187.50** (1) | **282** (1) | **250.75** (4) | **247.75** (5) | **283** (2) | **237.83** (6) | **243.75** (5) | **254** (3) | **225** (3) | **220** (3) | **286.17** (4) | **251.86** (2) | n/a (0) |
| **Our pctl (vs median)** | | | | | – | P50 (+1.3%) | – | P75 (+11.1%) | – | – | – | – | – | – | – | P100 (+41.3%) | – | P75 (+1.9%) | P40 (-3.9%) | P100 (+24.7%) | P67 (+10.0%) | P60 (+2.8%) | P67 (+8.1%) | P67 (+14.8%) | P67 (+13.3%) | P75 (+16.0%) | P50 (-2.7%) | – |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 126.33* (11 Nov 137.33) | 170.50* | – | 170.50 | 170.50* | 170.50 | 183 | 195.50 (11 Nov 218) | 203 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | – | – | 157.33 (11 Nov 164.33) | – | – | – | – | – | – | – | – |
| [1557062894259099964 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | – | – | – | – | – | – | – | – | – | – | – |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | 159.67 | – | – | – | – | 167.50 | 167.50* | 167.50 | 167.50 |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.92 (25) | Free parking on premises/Guest favourite | – | 145 | – | 181 | – | 181 | – | – | – | – | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (202) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | – | 135.50* | – | 140.50 | – | – | – | – | – | – | – |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | 146.67 | – | – | – | – | – | – | – | – |
| **Comp median (n)** | | | 4.84 (14) | | n/a (0) | **140.25** (2) | **152** (4) | **170.50** (3) | n/a (0) | **175.75** (2) | **170.50** (1) | **169** (2) | **175.25** (2) | **181.50** (2) | **185.25** (2) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings (Airbnb only).
- Comp cancellation policies and band-listing sleeps: NOT CHECKED. Lift, view and parking come from listing-page reads on 25 Oct-5 Nov.
- **Smoobu was not called today.** P01 18-20 Dec status and P09 12 Nov come from the 12 Nov raw PriceLabs, `reservations.csv` and the Airbnb searches. Smoobu `/api/rates` availability for 12 Nov on P04/P09/P12 is NOT CHECKED.
- 12 Nov is not in `prices.csv` / raw (they start 13 Nov), so tonight's PriceLabs price for P04/P09/P12 is NOT CHECKED.
- **P01:** who extended the Smoobu block to 21 Dec (10 Nov 14:41:27Z) and why: NOT CHECKED. The if-reopened all-in is estimated (room + £149 cleaning, Airbnb guest fee excluded).
- **P04:**
  - Stored n is 1-4 per stay; band n is 2-9, with a 5-unit operator (shown both ways).
  - 1387112821878102742: November/December availability NOT CHECKED (only the Jan sweep on 11 Nov).
  - The 18.0% weekly figure assumes £142 cleaning.
  - Why Reyhan set min 2 on 12-17 Nov and -5% on 18-24 Nov and 6-22 Dec: NOT CHECKED.
- **P12:**
  - Cleaning £150 comes from the 14-17 Nov Airbnb reservation; room targets are approximate.
  - 12-14 Nov and 26-27 Nov bands are n = 2 and n = 4. No stored comp was returned for 13-14 Dec.
  - The raw `price` (298) differs from `user_price` (287) on 26 Nov. Which one Smoobu/Airbnb received is NOT CHECKED. Our Airbnb all-in (£353 for 1 night incl. £150 cleaning) implies an Airbnb room of about £203. The cause of that gap vs PriceLabs (Smoobu Airbnb rules?) is NOT CHECKED.
- **P15:** 1557062894259099964 is not available 12 Nov-1 Jan (sweep) and is kept as active on its January availability.
- **NL percentiles:** PriceLabs does not state the horizon or cleaning basis.
