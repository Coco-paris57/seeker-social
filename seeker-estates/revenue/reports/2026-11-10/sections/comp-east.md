# Competitor positioning: EAST batch (D = 2026-11-10)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy) and is not analysed.
- **P15** has no listing of ours; reference only.
- Nights after a handback date are not inventory (policy `handbacks`: P01 20 Dec, P09 26 Nov, P12 13 Dec).

**Method** (same as 26 Oct-9 Nov)
- **Comp ids.** Same set as 9 Nov (`data/snapshots/2026-11-09/comps.csv`): P01 11, P04 7, P09 6, P12 7, P15 7. **None replaced.** P12 29297702 still has a placeholder-like price (about £1,035/n) and is left out of medians.
  - P01 1005647070760859698 was not returned on any stay today. Yesterday's 60-day sweep found it bookable on 8-11 and 12-15 Dec, so it is **kept**.
  - P04 1387112821878102742 was not returned on any stay today (first miss). **Kept**; I will re-check tomorrow.
- **Access.** Public Airbnb pages (HTTP 200), same scripts and boxes as 9 Nov.
  - Boxes: 2.5 km for P04, 1.8 km for P09, 1.3 km for the others. Guests: 4 for 2BR, 3 for 1BR.
  - Volume: 73 wide searches, then 363 comp/stay checks in a 0.3 km box (`*` in the tables).
  - **Booking.com: NOT CHECKED.**
- **Price basis.** Airbnb **guest-paid all-in total / nights**: after discounts, with cleaning and fees **included**; no separate taxes are shown. Our listings are priced the same way. PriceLabs and Smoobu figures are **room only, cleaning excluded**.
- **Stays.**
  - Trend: 13-15 Nov (next Fri-Sun), 17-19 Nov (Tue-Thu), 24-27 Nov, 1-3 Dec, 4-6 Dec, 7-9 Dec, 8-10 Dec, 9-11 Dec, plus **10-12 Dec (30 days out, new)**. 10-12 Nov was dropped because it checks in today.
  - Open-night stays, from `prices.csv` and `reservations.csv` (10 Nov):
    - **P12:** 12-14, 17-19, 18-20 and 17-21 Nov; 26-27 Nov; 30 Nov-3 Dec, 30 Nov-4 Dec and 2-4 Dec; 7-10, 7-11 and 7-14 Dec. New: **11-14 Dec and 11-13 Dec** (reopened by the cancellation). 13-14 Dec is kept as a band-only stay.
    - **P04:** 11-14 Nov; 18-21, 20-23, 21-24, 22-25 (new) and 18-25 Nov; 6-9, 9-12, 11-14, 14-17, 17-20 and 6-13 Dec.
    - **P09:** 11-13, 11-12 and 12-13 Nov.
- **Reference bands (not comps).** Every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius, excluding ours. Band sleeps are NOT CHECKED.
  - P12: 2BR within 1.3 km. P09: 1BR within 1.8 km.
  - **P04: 2BR within 2.5 km (new today, because the stored set has only n = 1-4 per stay).** I left out 1588439248552365607, which shows a placeholder-like £8,500-10,000/n. One operator runs 5 units (the 1531... ids) at identical prices. The table shows the median both ways (all units / operator counted once).
- **Data written.** `data/snapshots/2026-11-10/comps.csv` already existed (another agent had copied it forward). Under `flock` on `.comps.csv.lock` I **appended 946 rows** (11,742 -> 12,688 lines):
  - 535 `comp-east`: every stored comp x stay, with NOT RETURNED rows kept.
  - 282 `east-refband`.
  - 129 `east-ours`: our Airbnb all-in prices, the unsynced P04 listing, and the Smoobu room price for every open night with the 10 Nov raw PriceLabs price, user_price and uncustomized price. None of these rows are comps.
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` (listing, 9-10 Nov): 49 entries.
  - `get_listing_date_overrides` for 2699998 and 3562176.
  - `get_neighbourhood_data` for P12, P04 and P09: all `all_operations_ok`.
- **Smoobu:** not called. Smoobu prices come from the `prices.csv` snapshot.

## What changed since 9 Nov 06:00Z (this batch)
All of these edits were made by **Reyhan** (`get_user_logs`) and are confirmed in `get_listing_date_overrides` (`updated_at`).

**P04 Barking 3562176**
- 14:10:39Z: 9-24 Nov -7%, min 3. 14:10:56Z: 6-22 Dec -7%, min 3.
- **21:26:45Z: base price 220 -> 200** (log source `reviewPrices`). `listings.csv` gives PriceLabs `recommended_base` 221.
- 21:26:55Z: **9-24 Nov changed to -4%**, min 3. 21:27:01Z: **6-22 Dec changed to -3%**, min 3.
- 21:27:14Z / 21:27:22Z: January -8% (min 3) and February -8% (min 4). These are outside this horizon.
- Pushed at 21:27:48Z, 1 s after the 21:27:47Z refresh (`listings.csv`, raw).
- Effect on PriceLabs room prices (9 Nov -> 10 Nov raw `prices_3562176.json`):
  - November: 11 Nov 150 -> 139, 18 Nov 154 -> 140, 21 Nov 165 -> 152, 24 Nov 199 -> 148.
  - December: 6 Dec 197 -> 186, 12 Dec 211 -> 199, 19 Dec 216 -> 204.
  - **Our Airbnb all-in fell 5-9%** (for example 18-21 Nov 167.67 -> 158; 6-9 Dec 207 -> 189.67).
- **For Corentin to confirm (base decision, not a proposal):** the 220 -> 200 base cut.
- **Standing-decision conflict, for Corentin to confirm:** policy `price_changes` 24 Oct says P04 **-8% on 1-25 Nov**. The live November override is now -4% on 9-24 Nov, on the lower base.

**P12 Mile End 2699998**
- 21:20:20Z: 12-20 Nov -2%, min 2 (was min 2 only). 21:20:27Z: 30 Nov-6 Dec -2%, min 2.
- **22:30:10Z: 7-14 Dec -5%, min 3.** This replaced the 13 Dec +15% / min 1 override and the min 2 on 7-10 Dec.
- 26 Nov is unchanged: +15%, min 1.
- Pushed at 22:30:30Z, after the 22:30:29Z refresh.
- Prices (9 Nov -> 10 Nov raw):
  - 26 Nov 317 -> 306 (algorithm).
  - 30 Nov-3 Dec 269/280/290/300 -> 268/275/286/297.
  - 7-10 Dec 286/291/305/310 -> 279/277/289/279.
  - **11-12 Dec reopened at 309/321** (user_price 325/338).
  - **13 Dec 364 -> 283** (user_price 361, uncustomized 311).
- **Smoobu: the 11-13 Dec Booking.com booking (£513.81, booked 5 Nov) is cancelled**. PriceLabs now shows 11-13 Dec open (`reservations.csv`, `prices.csv` 10 Nov).

**P09 and P01:** no PriceLabs edit. P09 was last refreshed and pushed 9 Nov 07:50Z.

**Comps are flat.** The median same-comp, same-stay change vs 9 Nov is **0.0% on every stay**, except P01 13-15 Nov (one comp) and P04 24-27 Nov (-1.3%). Moves of £10 or more on a stored comp:
- P01 41905186: 13-15 Nov 520 -> 299.
- P01 1316210326145130709: 24-27 Nov 345.33 -> 329.33.
- P01 1418178473526356202: 8-10 Dec 374.50 -> 384.50.
- P04 1577633201778145138: 8-10 Dec 239 -> 250; 9-11 Dec 227.50 -> 239.
- P12 1098554019818216597: 24-27 Nov 311.67 -> 256; 17-21 Nov 286.25 -> 257.50.
- P12 1383544079404594066: 9-11 Dec 316 -> 301; 7-11 Dec 317.50 -> 305.75.
- P15 1617544963466664181: 24-27 Nov 159.67 -> 148.33; 9-11 Dec 190 -> 170.50.

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 10 Nov)
These are market bands, not comps. PriceLabs does not state their horizon or whether they include cleaning. Our figure is the PriceLabs room price on open nights (`prices.csv`).

| Ref | Band (n) | P25/P50/P75/P90 today | 9 Nov | Market occ 30 / 60 (`pl_kpis.csv`) | Ours and NL percentile |
|---|---|---|---|---|---|
| P04 | 2BR (90) | 138/174/216/259 | 140/176/219/261 | 24% / 20% | **Next 14 days** (11-23 Nov, 9 n): £144.7, **P30** (9 Nov P36). **November** (10 n): £145.0, **P30** (9 Nov P39). **December** (14 n, excluding the deprioritised 2 Dec): £189.4, **P59** (9 Nov P65). |
| P09 | 1BR (125) | 110/132/159/203 | 110/133/160/204 | 37% / 32% | No sellable night. **12 Nov** PriceLabs £123 (user 126) would be **P40**. |
| P12 | 2BR (118) | 171/204/230/287 | 173/205/233/290 | 42% / 34% | **Next 14 days** (6 n): £247, **P79** (9 Nov P81). **26 Nov** £306, **>P90**. **30 Nov-3 Dec** £281.5, **P89**. **7-10 Dec** £281, **P88**. **11-13 Dec** £304.3, **>P90**. **13 Dec** £283, **P89**. |
| P01 | not pulled (no sellable nights) | | | 35% / 29% | none |

- **Demand rises** (`occ_insights`):
  - P04 market 3-5 Dec +8.3% (we are booked).
  - P09 market 7-10 Dec +9.4% (after the handback).
  - All three markets around 27/28 Dec-1 Jan, +16.9% to +19.4%.
- **Market price surge** (`fp_insights`): P04 26-29 Dec +9.4%; P12 26-31 Dec +20.7%; P09 27-31 Dec +26.7%.

## Priority 1: P12 Mile End. 11-13 Dec reopened, 26 Nov, 30 Nov-4 Dec, 7-11 Dec, 13 Dec
- **Quality:** `quality_premium` = **-0.15** (the cap). We are 4.27 from 15 reviews; the stored-comp median is 4.86 from 19 reviews (gap -4). **Supported: -15% to 0% vs the band median.**
- **Room figures are approximate.** They scale our all-in/room ratio for each stay to the target. Examples: 26 Nov 360/306 = 1.18; 30 Nov-3 Dec 0.95; 7-10 Dec 0.99; 11-14 Dec 1.06.
- **Airbnb 7-night discount check:** 7-14 Dec shows £275.03 off £1,983. Taking out the £150 cleaning (`reservations.csv` 14-17 Nov), that is **15.0% of room**, in line with policy.

| Stay | Ours all-in today (9 Nov) | PriceLabs room = Smoobu | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported all-in (band x 0.85-1.00) | Move needed, approx. room |
|---|---|---|---|---|---|---|
| 12-14 Nov | 235.50 (239.50) | 201/250 | 265.50 (3), P33, **-11.3%** | 217.50 (1), P100, +8.3% | 226-266 | **hold** |
| 17-19 Nov | 252 (258) | 245/250 | 217 (10), P60, +16.1% | 245.75 (4), P50, +2.5% | 184-217 | -14% to -27% |
| 18-20 Nov | 256.50 (266) | 250/256 | 237.50 (9), P67, +8.0% | 245.75 (4), P75, +4.4% | 202-238 | about -7% to -21% |
| 17-21 Nov | 234.75 (244.25) | 245/250/256/280 | 218.75 (11), P55, +7.3% | 233.25 (6), P50, +0.6% | 186-219 | about -7% to -21% |
| **26-27 Nov (1 n)** | **360 (368)** | **306** (uncust. 271) | 290.50 (4), **P100, +23.9%** | 290.50 (2), P100, +23.9% | 247-291 | **-19% to -31%** (room about £210-247) |
| **30 Nov-3 Dec** | **261.67 (264)** | 268/275/286 | 222.17 (14), P64, **+17.8%** | 237.83 (6), P67, +10.0% | 189-222 | **-15% to -28%** (room about £200-235) |
| **30 Nov-4 Dec** | 253 (255.50) | 268/275/286/297 | 229.63 (12), P58, +10.2% | 267.75 (4), P50, -5.5% | 195-230 | about -9% to -23% (room about £217-256) |
| 1-3 Dec (trend) | 277.50 (281) | 275/286 | 245.75 (10), P70, +12.9% | 245.75 (4), P75, +12.9% | 209-246 | about -11% to -25% |
| 2-4 Dec | 285.50 (288.50) | 286/297 | 247.25 (10), P70, +15.5% | 277.75 (2), P50, +2.8% | 210-247 | about -13% to -26% |
| **7-10 Dec** | **278.67 (302)** | **279/277/289** | 236 (13), **P85, +18.1%** | 225 (3), P67, +23.9% | 201-236 | **-15% to -28%** (room about £203-239) |
| **7-11 Dec** | **271.75 (296.25)** | 279/277/289/279 | 247.75 (13), **P85, +9.7%** | 220 (3), P67, +23.5% | 211-248 | about -9% to -22% (room about £218-256) |
| 7-14 Dec (7 n, new) | 244.14 (weekly 15% applied) | 279-321 | 220.71 (12), P58, +10.6% | 257.29 (2), P50, -5.1% | 188-221 | about -10% to -23% |
| **11-14 Dec (3 n, reopened)** | **324 (not open 9 Nov)** | **309/321/283** | 286.33 (13), **P69, +13.2%** | 298.34 (4), P50, +8.6% | 243-286 | **-12% to -25%** (room about £228-269) |
| 11-13 Dec (2 n, the cancelled stay) | **not bookable (min 3)** | 309/321 | 314 (8) | 298.50 (2) | 267-314 | n/a |
| 13-14 Dec (1 n) | **not bookable (min 3)** | 283 (user 361) | 295 (4) | none returned | 251-295 | room about £201-237 if sold alone |

**Supported positioning** (a-p12-trim; lowering a PriceLabs price is Corentin's call):
- **11-13 Dec (reopened):** about **-12% to -25%**, room about **£228-269** (now 309/321/283, average £304).
  - The cancelled Booking.com stay paid £513.81 room for 2 nights, £257/n (`reservations.csv`). That sits inside the supported range.
  - **Min 3** (Reyhan's 7-14 Dec override, 22:30Z) means the same 2-night 11-13 Dec request can no longer be booked; the 2-night band shows demand at a median of £314 all-in (n = 8). Whether to allow min 2 on 11-13 Dec is a min-stay decision for Corentin.
- **13 Dec:** it is **no longer an orphan**. 11-12 Dec reopened, so 13 Dec is the last night of an open 7-night run (7-13 Dec) before the 14 Dec handback block.
  - Its room price fell from £364 to **£283** (-22%; the +15% is gone).
  - With min 3 it can only sell inside a 3+ night stay (for example 11-14 Dec). If 7-10 or 8-11 Dec sells first, 12-13 Dec or 13 Dec becomes an orphan that min 3 cannot sell.
  - **t-p12-13dec-orphan:** the price part is mostly fixed. Supported room if 13 Dec is sold alone is still about £201-237. **The min 1 part was undone.**
- **26 Nov:** room about **£210-247**, keep min 1. Today it is £306 (DSO +15%), P100, +24% vs the band (n = 4). **t-p12-26nov-price not fixed.**
- **30 Nov-4 Dec:** about **-10% to -20%**. Reyhan's -2% barely moved it (30 Nov-3 Dec +17.3% -> +17.8% vs band).
- **7-11 Dec:** about **-10% to -20%**. Reyhan's -5% narrowed the gap (7-10 Dec +28% -> +18%; 7-11 Dec +24% -> +10%), but it is still P85.
- **12-14 Nov: hold** (-11% vs band, P33). **17-21 Nov:** about -7% to -15%.
- **`recommend`:**
  - 30-day: comp P67 over 12 stays gives raise +10% (booked 52% vs market 42%, `pl_kpis` 57%). NL P85 gives raise +5%.
  - 60-day window (10-13 Dec, before the handback): NL P90 with 0 of 4 nights booked gives **lower -7%**. Comp P50 (n = 1) gives fix-listing.
  - **The 30-day raise is not adopted.** The demand lead comes from booked nights, while the open nights sit at band P33-P100 (median P67) with a 0.59-star deficit and the -15% quality cap. **The 60-day "lower" agrees with the evidence.**

## Priority 2: P04 Barking, November and December after the base cut 220 -> 200
- **Quality:** `quality_premium` = **-0.15** (cap). The synced listing has 4.11 from 9 reviews; the comp median is 4.85 from 27 (gap -18). **Supported: about -15% vs comp median.**

| Stay | Ours all-in today (9 Nov) | Smoobu room = PriceLabs | Stored median (n), pctl, vs | Band median all / operator once (n), vs | Our pctl in band |
|---|---|---|---|---|---|
| 11-14 Nov | 155.33 (163.67) | 139/140/144 | 239.84 (2), P0, **-35.2%** | 248.33 (6) / 248.33 (3), **-37.5%** | P0 |
| 18-21 Nov | 158 (167.67) | 140/144/149 | 239.84 (2), P0, -34.1% | 248.33 (6) / 248.33 (3), -36.4% | P0 |
| 20-23 Nov | 161.67 (171.33) | 149/152/147 | 257.67 (1), P0, -37.3% | 251.67 (4) / 254.67 (2), -35.8% | P0 |
| 21-24 Nov | 161.33 (170) | 152/147/147 | 257.67 (1), P0, -37.4% | 248.33 (4) / 253 (2), -35.0% | P0 |
| 22-25 Nov (new) | 160.33 | 147/147/148 | 248.33 (3), P0, -35.4% | 245 (7) / 246.67 (4), -34.6% | P0 |
| 18-25 Nov (7 n) | 128.57 (141.71) | 140-152 | 249 (1), P0, -48.4% | 210.71 (4) / 229.86 (2), -39.0% | P0 |
| 6-9 Dec | 189.67 (207) | 186/186/185 | 222 (3), P0, -14.6% | 222 (7) / 206.67 (5), -14.6% / -8.2% | P29 |
| 9-12 Dec | 218.33 (228.33) | 184/189/196 | 222 (3), P33, -1.7% | 233.33 (9) / 218.17 (6), -6.4% / 0.0% | P33 |
| 11-14 Dec | 221.33 (232) | 196/199/185 | 213.84 (2), P50, +3.5% | 218.17 (6) / 214.33 (5), +1.5% / +3.3% | P50 |
| 14-17 Dec | 212.67 (223.67) | 181/183/187 | 235.17 (4), P25, -9.6% | 247 (9) / 246.34 (6), -13.9% | P11 |
| 17-20 Dec | 224.33 (235.33) | 189/197/204 | 241 (2), P50, -6.9% | 244 (6) / 243.50 (4), -8.1% | P17 |
| 6-13 Dec (7 n) | 160 (168.43) | 184-199 | 166.57 (3), P33, -3.9% | 155.43 (5), +2.9% | P60 |

- **November (11-24 Nov open):**
  - After the cut we sit **-34% to -48%** vs both the stored set and the new band (n = 4-7). On 9 Nov it was about -25%. NL P30 (9 Nov P36-39).
  - The quality-supported level is about -15%, so **the evidence does not support the November part of the base cut.**
  - **Supported:**
    - 11-14 Nov (1-4 days out): **hold**; do not raise this close in.
    - **18-24 Nov: take back the cut, about +7-10%** (to roughly the 9 Nov £150-165 room). That would still be about -30% vs comps.
    - Comps would support more (about £190 room to reach -15%). That is not proposed because the market is at 24% occupancy over the next 30 days and Corentin judged on 24 Oct that there was no November demand. Low confidence, n small.
  - `recommend` gives raise +10% on 30 days (comp P0 over 9 stays, NL P38; booked 50% vs market 24%).
- **December (6-19 Dec open):**
  - Stays now sit at **-15% to +3.5%** vs the stored median (median about -5%) and -15% to +3% vs the band. On 9 Nov it was about -2%. NL P59.
  - **The cut is consistent with December evidence:** it did about half of the 5-10% trim supported on 9 Nov.
  - **Supported:** hold 6-9 and 14-20 Dec (already -8% to -15%). Trim **9-14 Dec about 5-10%** (now -2% to +3.5%). Corentin's call; low confidence.
  - `recommend` 60-day gives raise +10% (comp P50 n 3, NL P60). **Not adopted**, for the same reason as 9 Nov: the occupancy lead comes from the 25 Nov-6 Dec and 20 Dec-2 Jan bookings.
- **2 Dec** (+200%, min 1; £458 price / £495 user_price) is deprioritised in policy and not raised.
- **Weekly discount (t-p04-weekly), not fixed.** Airbnb shows £166.37 off £1,067 on 18-25 Nov and £214.65 off £1,335 on 6-13 Dec. Taking out the £142 cleaning, that is **18.0% of room on both**, vs the 15% weekly discount in policy. P12 shows 15.0% on the same check.
- **Band note:** 1072316558208098643 (0.33 km, 4.93 from 76 reviews, 'City Views') prices at £159-180 all-in. It is the closest strong 2BR and is not in the stored set. It is a candidate to add when a P04 comp drops out (sleeps NOT CHECKED).

## P04 unsynced listing 1455876748739910219 (Barking 1455, day 11)
- **Still bookable on every open P04 run:**
  - 11-14 Nov £579.
  - 18-21 Nov £526; 20-23 Nov £542; 21-24 Nov £539; 22-25 Nov £531; 18-25 Nov £1,203.
  - 6-9 Dec £673; 9-12 Dec £675; 11-14 Dec £681; 14-17 Dec £659; 17-20 Dec £695; 6-13 Dec £1,291.
- It did not take the base cut; it is now 4-24% dearer than the synced listing.
- Any booking on it would not reach Smoobu. **t-p04-doublebook: not fixed.**

## Priority 3: P09 Torrent Lodge. 12 Nov (the day after tomorrow)
- **Still nothing to sell.** 11 Nov is **Blocked**, and 12 Nov is unavailable with min 2 (`prices.csv` 10 Nov). No PriceLabs edit since 9 Nov; it was last pushed 9 Nov 07:50Z. **t-p09-1112block: not fixed** (who blocked it and why: NOT CHECKED).
- 12 Nov PriceLabs £123 (user 126), NL **P40**.
- **Comps:**
  - 1-night 12-13 Nov: band median **183** (n = 5), range 152-237; stored 184.50 (n = 2).
  - 2-night 11-13 Nov: band median **162.50** (n = 6), stored 162.50 (n = 2).
- **If the block is unintended (Corentin/Reyhan to say):** sell 11-13 Nov at the current 118/123. With the 7-11 Nov booking ratio (0.778 x room + £125 cleaning, `reservations.csv`) that is about **£156/night all-in, -4% vs the band**. Supported; do not cut.
- **If the block stays:** 12 Nov alone (min 1) at £123 room would be about £221 all-in, about +21% vs the 1-night band (P80).
  - Reaching the band median would need about £75 room, below the £100 minimum (`listings.csv`).
  - So min 1 alone is the lever; a price cut is not supported.
- `quality_premium` = 0.0 (5.0 from 3 reviews, under the 5-review threshold). `recommend` 30-day: raise-signal (booked 97% vs 37%, no open night). Not applicable.

## Summary per property
`recommend` runs on the median comp percentile of our priced open stays in each window (10 Nov-9 Dec / 10-31 Dec), with `quality_premium`. A rating needs 5+ reviews to count.

| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market (`pl_kpis`) | `recommend` 30 / 60 | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | Nothing open (booked to 30 Nov, gap block 30 Nov-17 Dec, 18-21 Dec booked, handback 20 Dec) | 299-515 (n 1-7) | n/a | 4.75 vs 4.80 | 4 vs 30 (-26) | 0.0 (<5 reviews) | 100% / 100% vs 35% / 29% | raise-signal (no open nights) | nothing to sell |
| P04 (synced 1657…) | 128.57-224.33 | 166.57-257.67 (n 1-4); band 155-252 (n 4-9) | P0 in November; P0-P50 in December | 4.11 vs 4.85 | 9 vs 27 (-18) | -0.15 | 47% / 45% vs 24% / 20% | raise +10% (P0) / raise +10% (P50); NL P38 / P60 | about -15%. **November -34% to -48%:** the base cut is not supported; take back about +7-10% on 18-24 Nov and hold 11-14 Nov. **December -15% to +3.5%:** hold, trim 9-14 Dec about 5-10% |
| P04 unsynced 1455… | 171.86-231.67, bookable on every open run | | | 4.69 | 26 | n/a | | | map or unlist |
| P09 | No sellable night (11 Nov blocked, 12 Nov closed) | stored 162.50 (n 2); band 162.50 (n 6); 1-night band 183 (n 5) | n/a (NL P40 at £123) | 5.0 vs 4.58 | 3 vs 24.5 (-21.5) | 0.0 (<5 reviews) | 97% vs 37% / handback | raise-signal / n/a | parity to -5%: current 118/123 supported if unblocked |
| P12 | 234.75-360 | band 218.75-290.50; stored 217.50-298.34 | band P33-P100 (median about P67) | 4.27 vs 4.86 | 15 vs 19 (-4) | -0.15 | 57% / 70% vs 42% / 34% | raise +10% (P67) / fix-listing (P50, n 1); NL raise +5% (P85) / lower -7% (P90) | **-15% to 0% vs band:** 11-13 Dec -12% to -25%; 26 Nov -19% to -31%; 30 Nov-4 Dec -10% to -20%; 7-11 Dec -10% to -20%; 17-21 Nov -7% to -15%; hold 12-14 Nov |
| P15 | No listing of ours | 135.50-170.50 (n 1-5) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | Blocked on purpose (policy); not analysed | | | | | | | | |

## Critical / high findings
- **CRITICAL: P04 unsynced Airbnb 1455876748739910219 is still bookable on every P04 open run (day 11; t-p04-doublebook not fixed).** For example 11-14 Nov £579 and 6-13 Dec £1,291.
- **HIGH: P12 11-13 Dec (reopened) at £309/£321/£283 room is +13% vs band (P69)** on the only bookable shape (11-14 Dec, 3 n). Supported: room about £228-269. The cancelled stay paid £257/n room. Min 3 now blocks the same 2-night request (Corentin's call).
- **HIGH (for Corentin to confirm): P04 base 220 -> 200 (Reyhan, 9 Nov 21:26:45Z).** It pushed November to -34% to -48% vs comps (NL P30), below the quality-supported -15%. The comps do not support the November part. December is now -5% median, which is consistent with the evidence.
- **HIGH: P12 30 Nov-3 Dec +18% vs band (P64) and 7-10 Dec +18% (P85)**, after Reyhan's -2%/-5%. Supported: about -10% to -20%.
- **HIGH: P09 11 Nov block still in place, and 12 Nov is the day after tomorrow.** 11-12 Nov (£241 room) cannot sell before the 26 Nov handback; the current price is supported if it is unblocked.
- **MEDIUM: P12 26 Nov £306 room / £360 all-in, +24% vs band, P100** (n = 4). Supported room about £210-247 (t-p12-26nov-price not fixed).
- **MEDIUM (standing-decision conflict, for Corentin to confirm): P04 November override -4% on 9-24 Nov (Reyhan 21:26:55Z) vs policy -8% on 1-25 Nov.**
- **MEDIUM: P12 13 Dec is now min 3** (min 1 undone); its price fell from £364 to £283. It is no longer an orphan, but it becomes one if 7-10 or 8-11 Dec sells first.
- **MEDIUM: P04 Airbnb weekly discount 18.0% of room vs 15% policy** (t-p04-weekly not fixed).

## Plan items in this batch (status 10 Nov)
| Item | Status |
|---|---|
| t-p04-doublebook | **Not fixed** (day 11). 1455 is bookable on all P04 open runs, 11 Nov-20 Dec. |
| t-pl-push-fresh (batch) | **P04:** pushed 21:27:48Z, after the 21:27:47Z refresh. **P12:** pushed 22:30:30Z, after the 22:30:29Z refresh. **P09:** pushed 9 Nov 07:50:03Z, after the 07:50:02Z refresh; no edit since. **P01:** pushed 10 Nov 04:47:10Z. All fresh relative to their last edit. |
| t-p09-1112block | **Not fixed.** 11 Nov Blocked, 12 Nov unavailable (min 2). |
| a-p12-trim | **Partly done by Reyhan:** -2% on 12-20 Nov and 30 Nov-6 Dec, -5% on 7-14 Dec. Gaps vs band are still 7-10 Dec +18%, 30 Nov-3 Dec +18%, 11-14 Dec +13%. |
| t-p12-13dec-orphan | Price mostly fixed (£364 -> £283; the +15% is gone). **Min 1 undone (now min 3).** No longer an orphan after the 11-12 Dec reopening. |
| t-p12-26nov-price | **Not fixed** (£306 room, +15% DSO, min 1). |
| t-p04-weekly | **Not fixed** (18.0% vs 15%). |
| Base changes | **P04 220 -> 200** (Reyhan, 9 Nov 21:26:45Z), for Corentin to confirm. None on P01, P09 or P12. |

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-10.
- "9 Nov x" = the same comp and stay on 9 Nov, where it differs by more than £1.
- `*` = found by the 0.3 km second pass.
- Full source for every row: `data/snapshots/2026-11-10/comps.csv`.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | – | – | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 299 (9 Nov 520) | 634 | 421 | 409 | 557 | 365 | 335 | 405 (9 Nov 402) | 530 |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.45 (157) | none listed | – | 175.50 | 189.33 | 198 | – | 207 | 207.50 | 208 | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (56) | Lift | – | – | 329.33 (9 Nov 345.33) | – | – | – | – | – | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.62 (29) | Lift/River view/balcony | – | – | 255 | – | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – | – | – | – | – | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | – | 389 | – | – | 384.50 (9 Nov 374.50) | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | 338.67 | 422 | 454 | – | – | – | – |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.82 (17) | Lift | – | – | – | 335 | – | 335 | 335 | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (43) | Lift/Private patio or balcony/Superhost/Guest favourite (ADDED 2026-11-04, replaces inactive 20404597) (added 4 Nov, replaces inactive 20404597) | – | – | – | 416 | – | 472 | 472 | 472 | 500 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.8 (30) | | **299** (1) | **404.75** (2) | **329.33** (7) | **399** (6) | **505.50** (2) | **350** (4) | **335** (5) | **405** (3) | **515** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.11 (9); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Nov-14 Nov | 18 Nov-21 Nov | 20 Nov-23 Nov | 21 Nov-24 Nov | 22 Nov-25 Nov | 18 Nov-25 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | 257.67 | – | – | – | – | – | – | 257.67 | 257.67 | 257.67 | 257.67 | 257.67 | 249 | – | – | – | 260 | 260 | – |
| [1083936003491396261](https://www.airbnb.co.uk/rooms/1083936003491396261) | 1.24 | 5 | 4.9 (41) | Superhost (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 110.29 |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (26) | Free parking on premises/Superhost/Guest favourite | – | – | 135.67 (9 Nov 140.67) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.82 (39) | Free parking on premises/Superhost (added 30 Oct) | 250 | – | 248.33 | – | 325 | 250 | 250 (9 Nov 239) | 239 (9 Nov 227.50) | 227.50 | – | – | – | – | 248.33 | – | 273.33* | 233.33 (9 Nov 226) | – | 248.33 | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | 222 | 222 | – | 222 | – | 222 | 222 | 222 | 222 | 222 | 222 | – | – | – | – | 222 | 222 | 222 | 222 | 222 | 207 |
| [1387112821878102742 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 | 6 | 4.85 (27) | Parking (in name) (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (16) | Free on-street parking/Superhost | – | – | 188.33 (9 Nov 193.33) | 210 | – | 217 | 217 | 217 | 222 | – | – | – | – | 188.33 | – | 198.67 | 203.67 | 205.67 | 196.33 | – | 166.57 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **155.33** | **158** | **161.67** | **161.33** | **160.33** | **128.57** | **189.67** | **218.33** | **221.33** | **212.67** | **224.33** | **160** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | 193 | 175.33 | 180.67 | 179.67 | 177 | 171.86 | 224.33 | 225 | 227 | 219.67 | 231.67 | 184.43 |
| **Comp median (n)** | | | 4.85 (27) | | **236** (2) | **222** (1) | **218.33** (4) | **216** (2) | **325** (1) | **222** (3) | **222** (3) | **222** (3) | **222** (3) | **239.84** (2) | **239.84** (2) | **257.67** (1) | **257.67** (1) | **248.33** (3) | **249** (1) | **222** (3) | **222** (3) | **213.83** (2) | **235.17** (4) | **241** (2) | **166.57** (3) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | P0 (-35.2%) | P0 (-34.1%) | P0 (-37.3%) | P0 (-37.4%) | P0 (-35.4%) | P0 (-48.4%) | P0 (-14.6%) | P33 (-1.7%) | P50 (+3.5%) | P25 (-9.6%) | P50 (-6.9%) | P33 (-3.9%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Nov-13 Nov | 11 Nov-12 Nov | 12 Nov-13 Nov |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 164 | 164 | – | – | – | 164 | 164 | 164 | 164 | 164 | 186 | 186 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 161 | 161* | – | – | – | 161 | 161 | 161 | 161 | 161 | 183 | 183 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.73 (22) | none listed | – | – | – | 148 | – | 193 (9 Nov 197) | 190 | – | – | – | – | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | 200.50 | 200.50 | 196.67 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | – | – | – |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | – | – | 233.50 (9 Nov 225.50) | 254.50 | – | – | – | – | – | – | – |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | 242.67 | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.58 (24.5) | | **164** (3) | **164** (3) | **219.67** (2) | **233.50** (3) | **251.50** (2) | **178.50** (4) | **177** (4) | **164** (3) | **164** (3) | **162.50** (2) | **184.50** (2) | **184.50** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 12 Nov-14 Nov | 18 Nov-20 Nov | 17 Nov-21 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 2 Dec-4 Dec | 7 Dec-10 Dec | 7 Dec-11 Dec | 11 Dec-14 Dec | 11 Dec-13 Dec | 7 Dec-14 Dec | 13 Dec-14 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 217.50 | 237.50 | 225 | 237.50 | – | 237.50 | 237.50 | 237.50 | 237.50 | 217.50 | 237.50 | 218.75 | – | 225 | – | – | 225 | 218.75 | 225 | 237.50 | 200.71 | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking on premises | – | – | 256 (9 Nov 311.67) | – | – | – | – | – | – | – | – | 257.50 (9 Nov 286.25) | – | 316.67 | 312.50* | – | – | – | 352 | – | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (78) | Superhost | – | – | 205 (9 Nov 208.67) | – | – | – | – | – | – | – | – | 187 (9 Nov 195) | – | 196 (9 Nov 197.33) | 205 (9 Nov 206.75) | – | – | – | 247 | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | – | 185 | 185 | 220 | – | 220 | 220 | 220 | – | – | 185 | 185 | – | 208.33 | – | – | 220 | 220 | – | – | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (120) | Superhost/balcony/Guest favourite | – | 254 | 250.67 | 254 | – | – | – | – | – | – | 254 | 247.75 | 284 | 250.67 | 243.75 | 254 | – | – | – | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | 1035 | 1035 | 1032.33 | 1035 | 1035 | 1035 | 1047.50 | 1047.50 | 1035 | 1035 | 1035 | 1031 | 1043 | 1035 | 1033 | 1035 | 1040.67 | 1037.25 | 1032.33 | 1035 | 882.43 | 1043 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | – | 282 | 287 (9 Nov 295.33) | 286.50 (9 Nov 289) | 350.50 (9 Nov 359) | 310.50 (9 Nov 319) | 302.50 (9 Nov 308) | 301 (9 Nov 316) | 332.50 | – | 282 | 282.50 (9 Nov 284.25) | 297 (9 Nov 305) | 285 (9 Nov 286.67) | 291.75 (9 Nov 294.50) | 301.50 (9 Nov 307) | 305.67 (9 Nov 312.67) | 305.75 (9 Nov 317.50) | 349.67 | 359.50 | 313.86 | – |
| **Ours** | | | | | not bookable | **252** | not bookable | **277.50** | not bookable | not bookable | not bookable | not bookable | not bookable | **235.50** | **256.50** | **234.75** | **360** | **261.67** | **253** | **285.50** | **278.67** | **271.75** | **324** | not bookable | **244.14** | not bookable |
| **Comp median (n)** | | | 4.86 (19) | | **217.50** (1) | **245.75** (4) | **237.83** (6) | **245.75** (4) | **350.50** (1) | **237.50** (3) | **237.50** (3) | **237.50** (3) | **285** (2) | **217.50** (1) | **245.75** (4) | **233.25** (6) | **290.50** (2) | **237.83** (6) | **267.75** (4) | **277.75** (2) | **225** (3) | **220** (3) | **298.34** (4) | **298.50** (2) | **257.29** (2) | n/a (0) |
| **Our pctl (vs median)** | | | | | – | P50 (+2.5%) | – | P75 (+12.9%) | – | – | – | – | – | P100 (+8.3%) | P75 (+4.4%) | P50 (+0.6%) | P100 (+23.9%) | P67 (+10.0%) | P50 (-5.5%) | P50 (+2.8%) | P67 (+23.9%) | P67 (+23.5%) | P50 (+8.6%) | – | P50 (-5.1%) | – |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 148.33 (9 Nov 159.67) | 170.50 | – | 170.50 | 170.50 | 170.50 (9 Nov 190) | 205.50 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | – | – | 164.33 | – | – | – | – | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | 160 | 135* | 135 | 135 | – | 135 | 135 | 135 | 147.50 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | 159.67 | – | – | – | – | 167.50 | 167.50 |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.92 (25) | Free parking on premises/Guest favourite | – | 145 | – | 181 | – | 181 | – | – | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (202) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | – | 135.50* | – | 140.50* | – | – | – | – | – |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | 146.67 | – | – | – | – | – | – |
| **Comp median (n)** | | | 4.84 (14) | | **160** (1) | **135.50** (3) | **148.33** (5) | **155.50** (4) | n/a (0) | **170.50** (3) | **152.75** (2) | **167.50** (3) | **167.50** (3) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings. All comp prices are Airbnb only.
- **P09 11 Nov block:** who created it and why is NOT CHECKED (Smoobu not called).
- **P12:**
  - The Airbnb cleaning fee for P12 (£150) is taken from the 14-17 Nov Airbnb reservation; the price breakdown was not opened. Room-level targets are approximate.
  - The 26-27 Nov and 13-14 Dec 1-night bands are n = 4. No stored comp was returned for 13-14 Dec.
  - The gap between `price` and `user_price` on 7-13 Dec (13 Dec 283 vs 361), and which of the two Smoobu/Booking.com carry, is NOT CHECKED here. Airbnb shows the lower one (11-14 Dec £972).
- **P04:**
  - The stored comp n is only 1-4 per stay. The new band is n = 4-9 and includes a 5-unit operator (shown both ways).
  - Comp 1387112821878102742 was not returned on any stay today.
  - The 18.0% weekly figure assumes £142 cleaning.
- **P01:** no open nights. Comp 1005647070760859698 was not returned on today's stays (it was active in the 9 Nov sweep).
- Comp cancellation policies and band-listing sleeps: NOT CHECKED. Lift, view and parking come from listing-page reads on 25 Oct-5 Nov.
- Smoobu was not called; Smoobu prices are the 10 Nov `prices.csv` snapshot.
- NL percentiles: PriceLabs does not state the horizon or the cleaning basis.
