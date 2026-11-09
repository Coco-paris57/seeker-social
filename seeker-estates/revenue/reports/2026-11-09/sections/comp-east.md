# Competitor positioning: EAST batch (D = 2026-11-09)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy) and is not analysed.
- **P15** has no listing of ours; it is reference only.
- Nights after a handback date are not inventory (policy `handbacks`: P01 20 Dec, P09 26 Nov, P12 13 Dec).

**Method** (same as 26 Oct-8 Nov)
- **Comp ids.** Same set as 8 Nov (`data/snapshots/2026-11-08/comps.csv`): P01 11, P04 7, P09 6, P12 7, P15 7. P12 29297702 has a placeholder-like price (about £1,035/n) and is excluded from medians.
  - **None replaced.**
  - P04 1083936003491396261 is back (6-13 Dec, £110.29/n).
  - P01 1005647070760859698 was missed for a second day, so I ran a 60-day sweep: 15 three-night stays from 10 Nov to 8 Jan in a 0.3 km box. It came back on 8-11 Dec (£685) and 12-15 Dec (£885), so it is **active and kept**. Both sweep rows are stored.
- **Access.** Public Airbnb pages (HTTP 200) with yesterday's scripts:
  - Search boxes: 2.5 km for P04, 1.8 km for P09, 1.3 km for the others.
  - Guests: 4 for 2BR, 3 for 1BR.
  - Volume: 67 wide searches, then 321 comp/stay checks in a 0.3 km box (`*` in the tables), plus the sweep.
  - **Booking.com: NOT CHECKED.**
- **Price basis.** Airbnb **guest-paid all-in total / nights**: after discounts, with cleaning and fees **included**; no separate taxes are shown. Our listings are priced the same way. PriceLabs and Smoobu figures are **room only, cleaning excluded**.
- **Stays.**
  - Trend: 10-12 Nov (Tue-Thu), 13-15 Nov (next Fri-Sun), 24-27 Nov, 1-3 Dec, 4-6 Dec, 7-9 Dec, 8-10 Dec, plus **9-11 Dec (30 days out, new)**.
  - Open-night stays, from `prices.csv` and `reservations.csv` (9 Nov):
    - **P09:** 11-13, 11-12 and 12-13 Nov.
    - **P12:** 12-14, 17-19, 18-20 and 17-21 Nov; 26-27 Nov; 30 Nov-3 Dec, 30 Nov-4 Dec and 2-4 Dec; 7-10 and 7-11 Dec; 13-14 Dec.
    - **P04:** 10-13, 11-14 and 10-14 Nov (new); 18-21, 20-23, 21-24 and 18-25 Nov; 6-9, 9-12, 11-14, 14-17, 17-20 and 6-13 Dec. 9-12 and 9-14 Nov were dropped because 9 Nov is no longer in the snapshot.
- **Reference bands (not comps).** Every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius, excluding ours:
  - P12: 2BR within 1.3 km.
  - P09: 1BR within 1.8 km. Band sleeps are NOT CHECKED.
- **Data written.** `data/snapshots/2026-11-09/comps.csv` did not exist.
  - Under `flock` on `.comps.csv.lock`, it was copied forward from 8 Nov (9,721 data rows).
  - Then **758 rows were appended** (file now 10,480 lines):
    - 492 `comp-east`: every stored comp x stay, with NOT RETURNED rows kept, plus the 2 sweep rows.
    - 143 `east-refband`.
    - 123 `east-ours`: our Airbnb all-in prices, the unsynced P04 listing, and the Smoobu room price for every open night with the 9 Nov raw PriceLabs price, user_price and uncustomized price. None of these rows are comps.
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` (listing, 8-9 Nov): 8 entries.
  - `get_listing_date_overrides` for 3562176, 2699998 and 3318172.
  - `get_neighbourhood_data` for P12, P04 and P09: all `all_operations_ok`.
- **Smoobu:** not called. Smoobu prices come from the `prices.csv` snapshot.

## What changed since 8 Nov 06:00Z (this batch)
- **Reyhan, 8 Nov 12:41:48Z: P04 3562176, 9-24 Nov override -3% -> -5%, min 3** (`get_user_logs`, confirmed in `get_listing_date_overrides`, `updated_at` 12:41:47Z). It was pushed at 12:42:10Z (`listings.csv`).
  - Open nights fell £1-3: 10 Nov 152 -> 149, 13 Nov 156 -> 154, 21 Nov 169 -> 165 (8 Nov vs 9 Nov raw `prices_3562176.json`).
  - **23 Nov fell 205 -> 158 and 24 Nov 206 -> 199** (algorithm).
  - **Conflict with a standing decision, for Corentin to confirm (not a proposal):** policy `price_changes` 24 Oct says P04 **-8% on 1-25 Nov**. The live override is -5% on 9-24 Nov.
- **No PriceLabs edit on P01, P09 or P12** since 8 Nov 06:00Z. P12 overrides are unchanged from 7 Nov:
  - 12-20 Nov and 30 Nov-10 Dec: min 2, no price part.
  - 26 Nov and 13 Dec: +15%, min 1.
  - 21-29 Nov: -15%.
- **P12 prices moved slightly** (raw refreshed 8 Nov 12:37:21Z; last push 08:53:20Z):
  - 30 Nov 274 -> 269; 26 Nov 323 -> 317; 13 Dec 369 -> 364; 9-10 Dec 303/308 -> 305/310.
  - On Airbnb, our all-in moved -£1 to -£19 per night (7-9 Dec 321.50 -> 303).
- **P09:** 11 Nov is still **Blocked** and 12 Nov is unavailable, with min 2 (`prices.csv` 9 Nov). The overrides for 11-12 Nov hold min 2 only, so the block is in Smoobu, not PriceLabs.
  - P09 has **no sellable night left** before the 26 Nov handback.
  - PriceLabs was pushed 8 Nov 07:56:29Z; the raw was refreshed 07:56:28Z.
- **Comps are flat.**
  - The median same-comp, same-stay change vs 8 Nov is **0.0% on every stay**, except P01 10-12 Nov (-0.4%), P15 10-12 Nov (-2.4%) and P15 8-10 Dec (-5.1%).
  - Moves of £10 or more on a stored comp:
    - P01 1316210326145130709: 10-12 Nov 312 -> 278.50.
    - P01 1418178473526356202: 1-3 Dec 405 -> 389, 8-10 Dec 364.50 -> 374.50.
    - P01 41905186: 24-27 Nov 434.33 -> 421.
    - P04 1577633201778145138: 13-15 Nov 239 -> 250; 8-10 Dec 227.50 -> 239.
    - P04 1601606251010507286: 10-12 Nov 202 -> 191.
    - P12 1120913156789373408: 30 Nov-3 Dec 214.67 -> 197.33; 30 Nov-4 Dec 217.25 -> 206.75.
    - P12 1383544079404594066: 7-9 Dec 321.50 -> 308; 8-10 Dec 329 -> 316.
    - P15 1617544963466664181: 7-9 Dec 190 -> 170.50.

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 9 Nov)

| Ref | Band (n) | P25/P50/P75/P90 today | 8 Nov | Market occ 30 / 60 (`pl_kpis.csv`) | Ours (PriceLabs room price, open nights) and NL percentile |
|---|---|---|---|---|---|
| P04 | 2BR (89) | 140/176/219/261 | 140/176/219/264 | 24% / 20% | Next 14 days (10-23 Nov): £155.6 (10 n), **P36** (8 Nov P37). November: £159.5 (11 n), P39. December: £201.1 (14 n, excl. deprioritised 2 Dec), **P65** (8 Nov P65). |
| P09 | 1BR (124) | 110/133/160/204 | 110/134/160/204 | 37% / 32% | No sellable night. 11-12 Nov PriceLabs 122/126 would be P38/P42. |
| P12 | 2BR (120) | 173/205/233/290 | 171/205/233/290 | 42% / 35% | Next 14 days: £257 (6 n), **P81**. 26 Nov £317, **>P90**. 30 Nov-3 Dec £284.8, **P89**. 7-10 Dec £298, **>P90**. 13 Dec £364, **>P90**. |
| P01 | not pulled (no sellable nights) | | | 35% / 29% | none |

- **Demand rises** (`occ_insights`):
  - P04 market 3-5 Dec +7.3% (we are booked).
  - P09 market 7 Dec +9.7% (after the handback).
  - All three markets 27/28 Dec-1 Jan, +17% to +20%.
- **Market price surge 26/27-31 Dec** (`fp_insights`): P04 +10.1%, P12 +21.3%, P09 +25.9%.
- These are market bands, not comps. PriceLabs does not state their horizon or whether they include cleaning.

## Priority 1: P12 Mile End. 26 Nov, 30 Nov-4 Dec, 7-11 Dec and the 13 Dec orphan
- **Quality:** `quality_premium` = **-0.15** (the cap). We are 4.27 from 15 reviews; the stored-comp median is 4.86 from 19 reviews (gap -4). **Supported: -15% to 0% vs the band median.**
- **Gap vs yesterday:** about the same. Our prices moved £0-19 down and the band median moved a little (7-10 Dec band 230.50 -> 236).

| Stay | Ours all-in today (8 Nov) | PriceLabs room = Smoobu | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported all-in (band x 0.85-1.00) | Cut needed (all-in), approx. room |
|---|---|---|---|---|---|---|
| 12-14 Nov | 239.50 (246.50) | 208/254 | 266 (3), P33, **-10.0%** | 217.50 (1), P100, +10.1% | 226-266 | **hold** |
| 17-19 Nov | 258 (259.50) | 253/258 | 217 (10), P80, +18.9% | 245.75 (4), P75, +5.0% | 184-217 | -16% to -29% |
| 18-20 Nov | 266 (267) | 258/274 | 237.50 (9), P78, +12.0% | 245.75 (4), P75, +8.2% | 202-238 | about -11% |
| 17-21 Nov | 244.25 (245) | 253-295 | 214.25 (10), P60, +14.0% | 233.25 (6), P50, +4.7% | 182-214 | about -12% |
| **26-27 Nov (1 n)** | **368 (373)** | **317** (uncust. 294) | 290.50 (4), **P100, +26.7%** | 294.50 (2), P100, +25.0% | 247-291 | **-21% to -33%** (room about £213-250) |
| **30 Nov-3 Dec** | **264* (265.67)** | 269/280/290 | 225 (13), P62, **+17.3%** | 237.83 (6), P67, +11.0% | 191-225 | **at least -15%** (room about £203-238) |
| **30 Nov-4 Dec** | 255.50 (256.50) | 269/280/290/300 | 232.88 (14), P64, +9.7% | 269.13 (4), P50, -5.1% | 198-233 | about -9% (room about £221-260) |
| 1-3 Dec (trend) | 281* (281) | 280/290 | 245.75 (10), P80, +14.3% | 245.75 (4), P75, +14.3% | 209-246 | about -12.5% |
| 2-4 Dec | 288.50 (288.50) | 290/300 | 247.25 (10), P70, +16.7% | 280.50 (2), P50, +2.9% | 210-247 | about -14% |
| **7-10 Dec** | **302 (313.67)** | **286/291/305** | 236 (13), **P85, +28.0%** | 225 (3), P67, +34.2% | 201-236 | **at least -22%** (room about £195-230) |
| **7-11 Dec** | **296.25 (304.50)** | 286/291/305/310 | 239.50 (10), **P80, +23.7%** | 220 (3), P67, +34.7% | 204-240 | at least -19% (room about £205-241) |
| 7-9 Dec (trend) | 303 (321.50) | 286/291 | 254 (10), P80, +19.3% | 237.50 (3), P67, +27.6% | 216-254 | about -16% |
| 8-10 Dec | 331 (329) | 291/305 | 254 (12), P92, +30.3% | 237.50 (3), P100, +39.4% | 216-254 | about -23% |
| 9-11 Dec (30 days out) | 339.50 (337.50) | 305/310 | 269 (9), P89, +26.2% | 237.50 (3), P100, +42.9% | 229-269 | about -21% |
| **13-14 Dec (orphan, 1 n)** | **453 (458)** | **364** (uncust. 359) | 295 (4), **P100, +53.6%** | none returned (n 0) | 251-295 | **at least -35%** (room about £201-237) |

- **Room figures are approximate.** They scale our all-in/room ratio to the target. The P12 Airbnb cleaning fee and stay rules were not read today (NOT CHECKED).
- **Supported positioning** (a-p12-trim; it lowers a PriceLabs price, so this is Corentin's call):
  - **26 Nov:** room about **£213-250**, keep min 1. Today it is £317 (DSO +15%), P100, +27% vs band. **t-p12-26nov-price not fixed.**
  - **30 Nov-4 Dec:** about **-10% to -15%**, room roughly £221-260 on the 4-night stay, £203-238 on 30 Nov-3 Dec.
  - **7-11 Dec:** about **-20% to -25%**, room about £205-240.
  - **13 Dec:** min 1 is right; **the +15% is not supported**. At £364 room (£453 all-in) it is 54% over the 1-night band (n = 4). Supported: about **£201-237 room**. **t-p12-13dec-orphan: price part not fixed.**
  - **12-14 Nov: hold** (-10% vs band, P33).
  - **18-21 Nov:** about -10%.
  - The 17 Nov override that policy deprioritises is no longer in the override list (12-20 Nov hold min 2 only). Nothing is proposed for 17 Nov on its own.
- **`recommend`:**
  - 30-day: comp P67 over 13 stays; booked 55% vs market 42% gives raise +10%. NL P86 gives raise +5%.
  - 60-day (to the 13 Dec handback): comp P100 (n = 1) and NL P90, both hold.
  - `pl_kpis`: occupancy 60% vs market 42% (30 days), 73% vs 35% (60 days).
  - **Not adopted.** The demand lead comes from booked nights. The open nights sit at band P62-P100, with a 0.59-star deficit and the -15% quality cap.

## Priority 2: P04 Barking, November and December
- **Quality:** `quality_premium` = **-0.15** (cap). The synced listing has 4.11 from 9 reviews; the comp median is 4.85 from 27 (gap -18). **Supported: about -15% vs comp median.**
- **Thin set:** the stored set has only n = 1-4 per stay.

| Stay | Ours all-in today | Smoobu room = PriceLabs | Comp median (n) | Pctl | vs median |
|---|---|---|---|---|---|
| 10-13 Nov | 162.33 | 149/150/151 | 222 (3) | P33 | -26.9% |
| 11-14 Nov | 163.67 | 150/151/154 | 239.84 (2) | P0 | -31.8% |
| 10-14 Nov (4 n) | 151.25 | 149-154 | 238 (2) | P0 | -36.4% |
| 18-21 Nov | 167.67 (8 Nov 170) | 154/155/162 | 222 (3) | P33 | -24.5% |
| 20-23 Nov | 171.33 (174) | 162/165/158 | 207.17 (2) | P50 | -17.3% |
| 21-24 Nov | 170 (184) | 165/158/158 | 202.17 (2) | P50 | -15.9% |
| 18-25 Nov (7 n) | 141.71 (149.14) | 154-199 | 249 (1) | P0 | -43.1% (weekly discount applies) |
| 6-9 Dec | 207 (215.67) | 197/197/197 | 210.34 (4) | P50 | -1.6% |
| 9-12 Dec | 228.33 (227.67) | 195/201/207 | 222 (3) | P100 | +2.9% |
| 11-14 Dec | 232 (232.67) | 207/211/197 | 213.84 (2) | P100 | +8.5% |
| 14-17 Dec | 223.67 (224.33) | 193/196/198 | 235.17 (4) | P50 | -4.9% |
| 17-20 Dec | 235.33 (236) | 201/209/216 | 241 (2) | P50 | -2.4% |
| 6-13 Dec (7 n) | 168.43* (168.14) | 195-211 | 166.57 (3) | P67 | +1.1% (weekly discount applies) |

- **November (10-24 Nov open):**
  - The median stay is about **-25%** vs comp median (range -16% to -43%). NL: next 14 days P36, November P39.
  - **Supported: hold, no further cut.**
    - 10-14 Nov is 1-5 days out; do not raise it.
    - 18-24 Nov could take about +5% toward the -15% target. Low confidence (n = 1-3).
  - **Standing-decision conflict:** Reyhan's override is -5% (8 Nov 12:41Z) vs the standing -8% on 1-25 Nov. **For Corentin to confirm.** The comp evidence fits either level, because both stay below the quality-adjusted -15%.
- **December (6-19 Dec open):**
  - Stays sit at **-5% to +9%** vs comp median (median about -1.6%, P50-P100). NL P65. That is unchanged from 8 Nov.
  - **Supported: trim about 5-10%** (to roughly -5% to -15% vs comp median), **not raise**. Low confidence (n = 2-4); Corentin's call.
  - 2 Dec (+200%, min 1) is deprioritised in policy and not raised.
- **Weekly discount (t-p04-weekly), not fixed.**
  - Airbnb shows £186.47 off £1,178 on 18-25 Nov and £227.59 off £1,407 on 6-13 Dec.
  - Taking out the £142 cleaning (`reservations.csv` 6-9 Nov) and assuming a host-only fee, that is **18.0% of room on both stays**, vs the 15% weekly discount in policy.
- **`recommend`:**
  - 30-day: comp P33 over 9 stays and NL P44 both give raise +10%, on booked 50% vs market 24%.
  - 60-day: comp P75 (n = 4) gives raise +5%; NL P65 gives raise +10%.
  - **Not adopted** for December. The occupancy lead comes from the 25 Nov-6 Dec and 20 Dec-2 Jan bookings, and the open nights already sit at comp parity with a -0.15 quality cap.

## P04 unsynced listing 1455876748739910219 (Barking 1455, day 10)
- **Still bookable on every open P04 run:**
  - 10-13 Nov £558 (186/n), 11-14 Nov £579, 10-14 Nov £713.
  - 18-21 Nov £526; 18-25 Nov £1,203.
  - 6-9 Dec £673; 9-12 Dec £675; 11-14 Dec £681; 14-17 Dec £659; 17-20 Dec £695; 6-13 Dec £1,291.
- Any booking on it would not reach Smoobu.
- The guest in residence on the synced listing left 9 Nov, so tonight's overlap is gone. The future exposure is unchanged.
- **t-p04-doublebook: not fixed.**

## Priority 3: P09 Torrent Lodge. 11-12 Nov
- **Nothing to sell.** 11 Nov is **Blocked** in Smoobu (no PriceLabs override behind it), and 12 Nov is a min-2 orphan (`prices.csv` 9 Nov: available False).
  - These were the last 2 unsold nights before the 26 Nov handback: £122 + £126 room (PriceLabs; 12 Nov user_price 128).
  - **t-p09-1112block: not fixed** (who blocked it and why: NOT CHECKED).
- **Comps:**
  - 11-13 Nov: stored median 162.50 (n = 2); band median **164** (n = 5), P25 161.
  - 1-night 11-12 / 12-13 Nov: band median **183** (n = 5), range 152-249.
- **If the block is unintended (Corentin/Reyhan to say):** remove it and sell 11-13 Nov at the current 122/126.
  - The 7-11 Nov booking ratio (0.778 x room + £125 cleaning, `reservations.csv`) gives about **£159/night all-in, -3% vs the band**. That is inside the supported parity-to-minus-5% range. Do not cut.
- **If the block stays:** a 1-night 12 Nov (min 1) at £126 room would be about £223 all-in, around P80 of the 1-night band.
  - Selling at the band median would need about £58-75 room. That is below the P09 PriceLabs minimum of £100 (`listings.csv`).
  - So min 1 alone is the only lever; a price cut is not supported.
- `quality_premium` = 0.0 (5.0 from 3 reviews, under the 5-review threshold). `recommend` 30-day: raise-signal (booked 97% vs 37%, no open night). Not applicable.

## Summary per property
`recommend` runs on the median comp percentile of our priced open stays in each window (9 Nov-8 Dec / 9-31 Dec), with `quality_premium`. A rating needs 5+ reviews to count.

| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market (`pl_kpis`) | `recommend` 30 / 60 | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | Nothing open: booked to 30 Nov, gap block 30 Nov-17 Dec, 18-21 Dec booked, handback 20 Dec | 322.50-520 (n 1-7) | n/a | 4.75 vs 4.80 | 4 vs 30 (-26) | 0.0 (<5 reviews) | 100% / 100% vs 35% / 29% | raise-signal (no open nights) | nothing to sell |
| P04 (synced 1657…) | 141.71-235.33 | 166.57-249 (n 1-4) | P0-P100; -43% to +9% | 4.11 vs 4.85 | 9 vs 27 (-18) | -0.15 | 50% / 47% vs 24% / 20% | raise +10% (P33) / raise +5% (P75); NL P44 / P65 | about -15%: **hold November** (about -25%; 18-24 Nov up to +5%); **trim December about 5-10%** (now about -2%) |
| P04 unsynced 1455… | 171.86-231.67, bookable on all open runs | | | 4.69 | 26 | n/a | | | map or unlist |
| P09 | No sellable night (11 Nov blocked, 12 Nov orphan) | stored 162.50 (n 2); band 164 (n 5); 1-night band 183 | n/a | 5.0 vs 4.58 | 3 vs 24.5 (-21.5) | 0.0 (<5 reviews) | 97% vs 37% / handback | raise-signal / n/a | parity to -5%: current 122/126 supported; unblock 11 Nov if unintended |
| P12 | 239.50-453 | band 214.25-295; stored 217.50-294.50 | band P33-P100 (median about P80) | 4.27 vs 4.86 | 15 vs 19 (-4) | -0.15 | 60% / 73% vs 42% / 35% | raise +10% (P67) / hold (P100, n 1); NL raise +5% (P86) / hold (P90) | **-15% to 0% vs band:** 26 Nov -21 to -33%; 30 Nov-4 Dec -10 to -15%; 7-11 Dec -20 to -25%; 13 Dec at least -35%; 18-21 Nov about -10%; hold 12-14 Nov |
| P15 | No listing of ours | 142.75-170.50 (n 1-5) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | Blocked on purpose (policy); not analysed | | | | | | | | |

## Critical / high findings
- **CRITICAL: P04 unsynced Airbnb 1455876748739910219 is still bookable on every P04 open run (day 10; t-p04-doublebook not fixed).** For example 10-13 Nov £558 and 6-13 Dec £1,291. A booking there would not reach Smoobu.
- **HIGH: P12 13 Dec orphan, £364 room / £453 all-in.** That is +54% vs the 1-night band (n = 4), P100. Min 1 is right; the +15% DSO is not supported. Supported: about £201-237 room.
- **HIGH: P12 7-11 Dec +24% to +28% vs band (P80-P85), and 30 Nov-3 Dec +17% (P62).** No change since 8 Nov. Supported: about -20% to -25% and -10% to -15%. Corentin's call (a-p12-trim).
- **HIGH: P09 11 Nov Smoobu block still in place.** 11-12 Nov (£248 room) cannot sell before the 26 Nov handback. The current price is supported if it is unblocked.
- **MEDIUM: P12 26 Nov £317 room / £368 all-in, +27% vs band, P100** (n = 4). Supported: about £213-250 room.
- **MEDIUM (standing-decision conflict, for Corentin to confirm): P04 9-24 Nov override now -5% (Reyhan, 8 Nov 12:41Z) vs policy -8% on 1-25 Nov.** November sits about 25% under comps either way.
- **MEDIUM: P04 December at comp parity** (-5% to +9%). Supported: about 5-10% lower, not the +5-10% that `recommend` gives.
- **MEDIUM: P04 Airbnb weekly discount 18.0% of room vs 15% policy** (18-25 Nov and 6-13 Dec; t-p04-weekly not fixed).

## Plan items in this batch (status 9 Nov)
| Item | Status |
|---|---|
| t-p04-doublebook | **Not fixed** (day 10). 1455 is bookable on all P04 open runs, 10 Nov-20 Dec. |
| t-pl-push-fresh (batch) | **P04:** pushed 12:42:10Z, 22 s after Reyhan's save. **P09:** pushed 07:56:29Z, matching its 07:56:28Z refresh. **P12:** pushed 08:53:20Z but refreshed 12:37:21Z; whether Smoobu holds the 12:37Z prices is NOT CHECKED. **P01:** pushed 9 Nov 05:15:44Z (`listings.csv`). |
| t-p09-1112block | **Not fixed.** 11 Nov Blocked, 12 Nov unavailable (min 2). |
| a-p12-trim | **Not done.** Gaps vs band about unchanged: 7-10 Dec +28%, 30 Nov-3 Dec +17%. |
| t-p12-13dec-orphan | Min 1 done (7 Nov); **price not fixed** (£364, +15% DSO). |
| t-p12-26nov-price | **Not fixed** (£317 room, +15% DSO, min 1). |
| t-p04-weekly | **Not fixed** (18.0% vs 15%). |
| Base changes | None on P01, P04, P09 or P12 (`get_user_logs` 8-9 Nov). |

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-09.
- "8 Nov x" = the same comp and stay on 8 Nov, where it differs by more than £1.
- `*` = found by the 0.3 km second pass.
- Full source for every row: `data/snapshots/2026-11-09/comps.csv`.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 10 Nov-12 Nov | 13 Nov-15 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | – | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 392 (8 Nov 395) | 520 (8 Nov 517) | 421 (8 Nov 434.33) | 409 | 557 (8 Nov 560) | 365 (8 Nov 362) | 335 (8 Nov 332) | 402 |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.46 (155) | none listed | – | – | 189.33 | 198 | – | 207.50 | 208 | 208 |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (56) | Lift | 278.50 (8 Nov 312) | – | 345.33 | – | – | – | – | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.62 (29) | Lift/River view/balcony | – | – | 255 | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – | – | – | – | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | – | 389 (8 Nov 405) | – | – | 374.50 (8 Nov 364.50) | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | 338.67 | 422 | 454 | – | – | – |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.82 (17) | Lift | 285 | – | – | 335 | – | 335 | 335 | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (43) | Lift/Private patio or balcony/Superhost/Guest favourite (ADDED 2026-11-04, replaces inactive 20404597) (added 4 Nov, replaces inactive 20404597) | 360 | – | – | 416 | – | 472 | 472 | 472 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.8 (30) | | **322.50** (4) | **520** (1) | **338.67** (7) | **399** (6) | **505.50** (2) | **350** (4) | **335** (5) | **402** (3) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.11 (9); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 10 Nov-12 Nov | 13 Nov-15 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Nov-13 Nov | 11 Nov-14 Nov | 10 Nov-14 Nov | 18 Nov-21 Nov | 20 Nov-23 Nov | 21 Nov-24 Nov | 18 Nov-25 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | 257.67 | – | – | – | – | – | 257.67 | 257.67 | 254 | 257.67 | 257.67 | 257.67 | 249 | – | – | – | 260 | 260 | – |
| [1083936003491396261](https://www.airbnb.co.uk/rooms/1083936003491396261) | 1.24 | 5 | 4.9 (41) | Superhost (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 110.29 |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (26) | Free parking on premises/Superhost/Guest favourite | – | – | 140.67 | – | – | – | – | – | – | – | – | 123.67 | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.82 (39) | Free parking on premises/Superhost (added 30 Oct) | – | 250 | 248.33 | – | – | 250 (8 Nov 239) | 239 (8 Nov 227.50) | 227.50 | – | – | – | – | – | – | – | 273.33 (8 Nov 266) | 226 | – | 248.33 | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | 222 | 222 | – | 222 | – | 222 | 222 | 222 | 222 | 222 | 222 | 222 | – | – | – | 222 | 222 | 222 | 222 | 222 | 207 |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 | 6 | 4.85 (27) | Parking (in name) (added 1 Nov) | 145.50 | – | 137 | – | – | 196 | 196 (8 Nov 187) | 187 | 136.67 | – | – | – | 156.67 | 146.67 | – | 184 | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (16) | Free on-street parking/Superhost | 191 (8 Nov 202) | – | 193.33 | 210 | – | 217 | 217 | 217 | – | – | – | – | – | – | – | 198.67 | 203.67 | 205.67 | 196.33 | – | 166.57 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **162.33** | **163.67** | **151.25** | **167.67** | **171.33** | **170** | **141.71** | **207** | **228.33** | **232** | **223.67** | **235.33** | **168.43*** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | 186 | 193 | 178.25 | 175.33 | 180.67 | 179.67 | 171.86 | 224.33 | 225 | 227 | 219.67 | 231.67 | 184.43 |
| **Comp median (n)** | | | 4.85 (27) | | **191** (3) | **236** (2) | **193.33** (5) | **216** (2) | n/a (0) | **219.50** (4) | **219.50** (4) | **219.50** (4) | **222** (3) | **239.84** (2) | **238** (2) | **222** (3) | **207.17** (2) | **202.17** (2) | **249** (1) | **210.33** (4) | **222** (3) | **213.83** (2) | **235.17** (4) | **241** (2) | **166.57** (3) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | P33 (-26.9%) | P0 (-31.8%) | P0 (-36.4%) | P33 (-24.5%) | P50 (-17.3%) | P50 (-15.9%) | P0 (-43.1%) | P50 (-1.6%) | P100 (+2.9%) | P100 (+8.5%) | P50 (-4.9%) | P50 (-2.4%) | P67 (+1.1%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 10 Nov-12 Nov | 13 Nov-15 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 11 Nov-13 Nov | 11 Nov-12 Nov | 12 Nov-13 Nov |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 164 | 164 | – | – | – | 164 | 164 | 164 | 164 | 186 | 186 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 162.50 | 161 | – | – | – | 161 | 161 | 161 | 161 | 183 | 183 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.73 (22) | none listed | – | – | – | 148.50 | – | 197 | 190.50 | – | – | – | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | – | 200.50 | 196.67 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | – | – | – |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | – | – | 225.50 | – | – | – | – | – | – | – |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | 242.67* | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.58 (24.5) | | **163.25** (2) | **164** (3) | **219.67** (2) | **225.50** (3) | **248.50** (1) | **180.50** (4) | **177.25** (4) | **164** (3) | **162.50** (2) | **184.50** (2) | **184.50** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 10 Nov-12 Nov | 13 Nov-15 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 12 Nov-14 Nov | 17 Nov-19 Nov | 18 Nov-20 Nov | 17 Nov-21 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 2 Dec-4 Dec | 7 Dec-10 Dec | 7 Dec-11 Dec | 13 Dec-14 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 217.50 | 217.50 | 225 | 237.50 | – | 237.50 | 237.50 | 237.50 | 217.50 | 237.50 | 237.50 | 218.75 | – | 225 | – | – | 225 | 218.75* | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking on premises | – | – | 311.67 | – | – | – | – | – | – | – | – | 286.25 | – | 316.67 | 312.50 | – | – | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (78) | Superhost | – | – | 208.67 (8 Nov 200.33) | – | – | – | – | – | – | – | – | 195 (8 Nov 193.25) | – | 197.33 (8 Nov 214.67) | 206.75 (8 Nov 217.25) | – | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | 160 | – | 185 | 220 | – | 220 | 220 | 220 | – | 185 | 185 | 185 | – | 208.33 | – | – | 220 | 220 | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (119) | Superhost/balcony/Guest favourite | 254 | – | 250.67 | 254 | – | – | – | – | – | 254 | 254 | 247.75 | 284 | 250.67* | 243.75 | 254 | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | 1035 | 1035 (8 Nov 1040) | 1032.33 | 1035 | 1035 (8 Nov 1047) | 1035 | 1047.50 (8 Nov 1035) | 1047.50 (8 Nov 1035) | 1035 (8 Nov 1040) | 1035 | 1035 | 1031 (8 Nov 1036.75) | 1043 | 1035 (8 Nov 1032.33) | 1033 (8 Nov 1031) | 1035 | 1040.67 (8 Nov 1032.33) | 1037.25 (8 Nov 1031) | 1043 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | – | – | 295.33 (8 Nov 300) | 289 (8 Nov 287.50) | 359 (8 Nov 357.50) | 319 (8 Nov 316) | 308 (8 Nov 321.50) | 316 (8 Nov 329) | – | 282 | 282 | 284.25* | 305 (8 Nov 303) | 286.67 | 294.50 (8 Nov 292.25) | 307 (8 Nov 302.50) | 312.67 (8 Nov 320.33) | 317.50 (8 Nov 322.50) | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | **281*** | not bookable | **303** | **331** | **339.50** | **239.50** | **258** | **266** | **244.25** | **368** | **264*** | **255.50** | **288.50** | **302** | **296.25** | **453** |
| **Comp median (n)** | | | 4.86 (19) | | **217.50** (3) | **217.50** (1) | **237.83** (6) | **245.75** (4) | **359** (1) | **237.50** (3) | **237.50** (3) | **237.50** (3) | **217.50** (1) | **245.75** (4) | **245.75** (4) | **233.25** (6) | **294.50** (2) | **237.83** (6) | **269.12** (4) | **280.50** (2) | **225** (3) | **220** (3) | n/a (0) |
| **Our pctl (vs median)** | | | | | – | – | – | P75 (+14.3%) | – | P67 (+27.6%) | P100 (+39.4%) | P100 (+42.9%) | P100 (+10.1%) | P75 (+5.0%) | P75 (+8.2%) | P50 (+4.7%) | P100 (+25.0%) | P67 (+11.0%) | P50 (-5.1%) | P50 (+2.9%) | P67 (+34.2%) | P67 (+34.7%) | – |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 10 Nov-12 Nov | 13 Nov-15 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 159.67 | 170.50 | – | 170.50 | 170.50 (8 Nov 190) | 190 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | 157 | – | 164.33 | – | – | – | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | 128.50 (8 Nov 135) | 160 | 135 | 135 | – | 135 | 135 | 135 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | 159.67 | – | – | – | – | 167.50 |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.92 (25) | Free parking on premises/Guest favourite | – | – | – | 181 | – | 181 | – | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (202) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | – | – | – | 140.50 | – | – | – | – |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | 146.67 | – | – | – | – | – |
| **Comp median (n)** | | | 4.84 (14) | | **142.75** (2) | **160** (1) | **159.67** (5) | **155.50** (4) | n/a (0) | **170.50** (3) | **152.75** (2) | **167.50** (3) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings. All comp prices are Airbnb only.
- **P09 11 Nov block:** who created it and why is NOT CHECKED (Smoobu not called). Booking.com availability for 11-12 Nov is NOT CHECKED.
- **P12:**
  - The Airbnb cleaning fee and stay rules were not read, so room-level cuts are approximate.
  - The 13-14 Dec and 26-27 Nov bands are n = 4, and no stored comp was returned for 13-14 Dec.
  - Whether Smoobu carries the 12:37Z refresh (last push 08:53Z) is NOT CHECKED.
- **P04:**
  - Stored comp n is only 1-4 per stay.
  - The 18.0% weekly figure assumes £142 cleaning and a host-only Airbnb fee; the Airbnb price breakdown was not opened.
- **P01:** no open nights, so our percentile is n/a. Comp 1005647070760859698 was found only by the sweep (8-11 and 12-15 Dec).
- Comp cancellation policies and band-listing sleeps: NOT CHECKED. Lift, view and parking come from listing-page reads on 25 Oct-5 Nov.
- Smoobu was not called; Smoobu prices are the 9 Nov `prices.csv` snapshot.
- NL percentiles: PriceLabs does not state the horizon or the cleaning basis.
