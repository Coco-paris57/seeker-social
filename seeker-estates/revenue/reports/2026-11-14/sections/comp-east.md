# Competitor positioning: EAST batch (D = 2026-11-14)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy `intentional_blocks`). Not analysed.
- **P15** has no listing of ours. Reference only.
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec, P09 26 Nov, P12 13 Dec).

**Method** (same as 26 Oct-13 Nov; scripts in the scratchpad `east14/bin`)
- **Comp ids:** same set as 13 Nov (`data/snapshots/2026-11-13/comps.csv`): P01 11, P04 7, P09 6, P12 7, P15 7. **None replaced.**
  - Not returned on any stay today: P04 1083936003491396261 and 1387112821878102742 (third day in a row), P09 958156921765583815, and P15 1371771992549776701 (second day). Not being returned on the dates checked does not prove a listing is inactive, because it can mean the listing is booked. All four are kept. No forward sweep was run today. **If the two P04 ids are still missing on 15 Nov, sweep them for January and replace them if they are not bookable there either.**
  - P15 1557062894259099964 is back: it is priced on 12 of the 13 stays (£135-160).
  - P12 29297702 still looks like a placeholder (about £1,032-1,052/n) and stays out of the medians.
- **Access:** public Airbnb pages (HTTP 200).
  - 91 wide searches, then 478 comp/stay checks in a 0.3 km box (`*` in the tables).
  - Box sizes: 2.5 km for P04, 1.8 km for P09, 1.3 km for the rest. 4 guests for 2BR, 3 for 1BR.
  - **Booking.com: NOT CHECKED.**
- **Price basis = what guests see:** the Airbnb **guest-paid all-in total / nights**. That is after discounts, with cleaning and Airbnb fees **included**. No separate taxes are shown. Our listings are priced the same way.
  - PriceLabs and Smoobu figures are **room only, cleaning excluded**. Airbnb cleaning: P12 £150, P04 £142, P01 £149 (`reservations.csv` cleaning_gbp).
- **Stays (same dates for comps and us):**
  - Default stays: next Fri-Sun **20-22 Nov**, midweek Tue-Thu **17-19 Nov**, and 30 days out **14-16 Dec (new today)**.
  - Dropped stays: 13-15 Nov is past. Tonight is booked for P04 and P12.
  - Trend stays: 24-27 Nov, 1-3, 4-6, 7-9, 8-10, 9-11, 10-12, 11-13, 12-14 and 13-15 Dec.
  - Key-date stays:
    - P01: 18-21 Dec.
    - P04: the 18-25 Nov runs and the 6-20 Dec runs.
    - P12: 17-20, 18-20 and 17-21 Nov; 26-27 Nov; the 30 Nov-4 Dec runs; the 7-14 Dec runs.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius, excluding ours. The P04 band is shown both with and without collapsing the 5-unit 1531... operator to one listing.
- **Data written:** `data/snapshots/2026-11-14/comps.csv` did not exist.
  - Under `flock` on `.comps.csv.lock` I copied 13 Nov forward (20,165 lines) and **appended 1,246 rows**, giving 21,411 lines.
  - 688 `comp-east` rows: every stored comp x stay, with the NOT RETURNED rows kept.
  - 415 `east-refband` rows.
  - 143 `east-ours` rows: 102 Airbnb all-in rows for ours and the unsynced P04 listing, plus 41 Smoobu room rows with the 14 Nov raw PriceLabs `price`/`user_price`/`uncustomized_price`.
  - None of the `east-ours` or `east-refband` rows are comps.
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` (listing, 13-14 Nov): **0 entries.**
  - `get_listing_prices` live: P12 2699998 (14 Nov-14 Dec) and P04 3562176 (18 Nov-20 Dec). Both equal the 14 Nov raw files.
  - `get_listing_date_overrides`: P04 has not changed since 11 Nov 17:16Z and P12 since 10 Nov 16:28Z.
  - `get_customizations` P04.
  - `get_neighbourhood_data` P12, P04 and P01: all `all_operations_ok`. P09 was not called because it has no open night.
- **Smoobu: not called.** Smoobu prices come from `prices.csv` (14 Nov).

## What changed since 13 Nov (this batch)
No PriceLabs edits (`get_user_logs` is empty) and no east bookings or cancellations (Dispatcher diff).

**1. Guests now see the PriceLabs price on P12 and P04.**
- `prices.csv` has Smoobu = PriceLabs on every open night. The 12-13 Nov Smoobu-only prices on P12 17-19 Nov (250/250/266) and P04 18-20 Nov (130/135/140) are gone (t-smoobu-manual-1213).
- **P12:** Airbnb 17-19 Nov all-in went **£254 -> £271/n**, 17-20 Nov £245.33 -> £262, and 18-20 Nov £260 -> £277.50. Smoobu is now 269/275/287 (PriceLabs `price`).
- **P04:** 18-21 Nov went **£150.67 -> £163/n** (Smoobu 148/151/154).
- PriceLabs `user_price` / `booked_price` ("Your Price") still shows the old values in places. P04 shows 130/135/140 on 18-20 Nov and 181/179/180... on 6-13 Dec. P12 shows 292 on 20 Nov and 287/294 on 11-12 Dec. Airbnb follows `price` and Smoobu, not `user_price`. Why `user_price` lags is left to the PriceLabs auditor.

**2. P04 6-13 Dec fell about 10% with no edit.**
- PriceLabs `price` went 181/179/180/179/182/191/193/181 -> **164/161/162/161/164/171/173/163** (raw 13 vs 14 Nov).
- `uncustomized_price` did not change (211-230 -> 203-230), and the overrides did not change (-5%).
- 14 Dec onward did not move (176 -> 175).
- The cut stops at 13 Dec, exactly 30 days out. That fits the Booking Recency Factor, which `get_customizations` describes as "gradual discount from 5% (no bookings in last 15 days) up to 15% ... affecting prices for the next 30 days". The occupancy-based adjustment (aggressive) is another possible cause. **The cause is not verified.**
- Airbnb 6-9 Dec fell **£185.33 -> £171.67/n**, 9-12 Dec £188.33 -> £174, 11-14 Dec £208.33 -> £184, and 6-13 Dec £155.86 -> £142.29.

**3. Algorithm moves on P12.**
- 20 Nov: 290 -> 322 ("Good Demand").
- 11-12 Dec: 290/296 -> 317/323 ("High Demand").
- 7-8 Dec: 268/268 -> 259/249.
- 30 Nov-3 Dec: 258/282/284/283 -> 252/267/269/275.
- 26 Nov: 304 -> 306.
- P01 18-20 Dec (blocked): 282/278/246 -> 271/268/237.

**4. Comp moves of £10 or more (same comp, same stay):**
- **P01 1684834789445533643** cut every December stay by 11-20%. For example 18-21 Dec went 479 -> 369.67, 11-13 Dec 482.50 -> 386, and 4-6 Dec 430.50 -> 345.
- **P01 1439222085860877494** went 711 -> 524 on 18-21 Dec.
- P01 41905186: 17-19 Nov 499 -> 427.
- P01 1316210326145130709: 24-27 Nov 290.67 -> 327.33 and 18-21 Dec 395.33 -> 380.67.
- P12 1077363497194834681: 17-19 / 18-20 Nov 247.50 -> 237.50.
- P12 1383544079404594066: -£6 to -£19 on every December stay (for example 13-15 Dec 304 -> 285).
- P15 1617544963466664181: 13-15 Dec 190 -> 170.50.

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 14 Nov)
These are market bands, not comps. PriceLabs does not state their horizon or cleaning basis. "Ours" is the PriceLabs room `price` on open nights (`prices.csv` 14 Nov). It now equals Smoobu on every night.

| Ref | 2BR band (n) | P25 / P50 / P75 / P90 today (13 Nov) | Market occ 30 / 60 (`pl_kpis.csv`) | Ours and NL percentile |
|---|---|---|---|---|
| P04 | 90 | 140 / 178 / 216 / 264 (141 / 178 / 216 / 264) | 25% / 20% | **Next 14 days** (18-24 Nov, 7 n): £152.6, **P33** (13 Nov PriceLabs P33 / Smoobu P28). **December** (6-19 Dec, 14 n): £173.1, **P47** (P54) |
| P09 | not called | (12 Nov 111 / 134 / 161 / 205) | 39% / 32% | No open night before the 26 Nov handback |
| P12 | 117 | 173 / 207 / 233 / 292 (172 / 207 / 232 / 292) | 43% / 34% | **Next 14 days** (17-20 and 26 Nov, 5 n): £291.8, **P90** (13 Nov PriceLabs P88 / Smoobu P85). 17-20 Nov £288.2, P89. **26 Nov** £306, **>P90**. **30 Nov-3 Dec** £265.8, **P83**. **7-10 Dec** £265.5, **P83**. **11-13 Dec** £309, **>P90**. 7-13 Dec £284.1, P88 |
| P01 | 148 | 218 / 265 / 338 / 437 (217 / 263 / 337 / 433) | 36% / 29% | **18-20 Dec** (blocked): room £258.7 (271/268/237) would be **P47** |

- `occ_insights`:
  - P12 market 4-6 Dec +10.4% (we are booked 4-6 Dec).
  - P04 3-5 Dec +8.6% (booked).
  - 27 Dec-1 Jan: +16.6% to +18.7%.
- `fp_insights`: 26/27-30/31 Dec surge of P04 +8.3%, P12 +20.3%, P01 +25.8%.

## Priority 1: P12 Mile End (17-20 Nov, 26 Nov, 30 Nov-3 Dec, 7-14 Dec)
- **Quality:** `quality_premium` = **-0.15** (the cap). We are 4.27 from 15 reviews. The stored-comp median is 4.86 from 19 reviews (a gap of 4 reviews).
- **Supported position:** band median x 0.85-1.00, that is **-15% to 0%**.
- "Supported room" scales each stay's all-in / PriceLabs-room ratio, as on 12-13 Nov. It is approximate, because the £150 cleaning is a fixed fee.

| Stay | Ours all-in today (13 Nov) | PriceLabs `price` = Smoobu | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room | Move vs PriceLabs `price` |
|---|---|---|---|---|---|---|
| **17-19 Nov** | **271** (254) | 269/275 | 237.50 (9), **P78, +14.1%** (13 Nov 250.75, P50, +1.3%) | 254 (3), P67, +6.7% | 203-238 | **-26% to -12%** |
| **17-20 Nov (3 n)** | 262 (245.33) | 269/275/287 | 254.67 (10), P60, +2.9% | 254.67 (4), P75, +2.9% | 229-269 | -17% to -3% |
| 18-20 Nov | 277.50 (260) | 275/287 | 254 (7), P71, +9.3% | 254 (3), P67, +9.3% | 219-257 | -22% to -8% |
| 17-21 Nov (4 n) | 258.25 (239.50) | 269/275/287/322 | 257.50 (7), P57, +0.3% | 252.63 (4), P75, +2.2% | 244-287 | -15% to 0% (**in range**) |
| **26-27 Nov (1 n)** | **360** (358) | **306** (+15% override, min 1) | 282 (5), **P100, +27.7%** | 283 (2), P100, +27.2% | **204-240** | **-33% to -22%** |
| **30 Nov-3 Dec** | 251 (260.33) | 252/267/269 | 237.84 (14), P57, **+5.5%** | 237.84 (6), P67, +5.5% | 212-249 | -19% to -5% |
| 30 Nov-4 Dec | 241 (249.25) | 252/267/269/275 | 243.75 (15), P47, -1.1% | 243.75 (5), P40, -1.1% | 228-269 | -14% to +1% (**in range**) |
| 1-3 Dec (trend) | 268 (279) | 267/269 | 239 (9), **P67, +12.1%** | 245.75 (4), P75, +9.1% | 203-239 | -24% to -11% |
| 2-4 Dec | 271 (279.50) | 269/275 | 240.50 (11), P64, +12.7% | 254 (3), P67, +6.7% | 205-241 | -25% to -11% |
| **7-10 Dec** | 247.67 (257.33) | 259/249/267 | 230.50 (12), P58, **+7.4%** | 225 (3), P67, +10.1% | 204-240 | -21% to -7% |
| 7-11 Dec | 240.75 (250.25) | 259/249/267/287 | 230.38 (12), P50, +4.5% | 220 (3), P67, +9.4% | 216-254 | -19% to -4% |
| **7-14 Dec (7 n)** | 238.86 (239.86; weekly 15.0% applied) | 249-323 | 228.29 (11), P55, **+4.6%** | 242.43 (2), P50, -1.5% | 231-272 | -19% to -4% |
| **11-14 Dec (3 n)** | 299.33 (303) | **317/323/287** (13 Nov 290/296/300) | 280.34 (14), P57, **+6.8%** | 267.67 (4), P50, +11.8% | 246-289 | -20% to -6% |
| 12-14, 13-14 and 13-15 Dec | not bookable (min 3; 14 Dec onward is the handback block) | | 271.25 (8) / 293 (5) / 237.50 (9) | | n/a | n/a |

**Supported positioning** (lowering a PriceLabs price is Corentin's call; a-p12-trim):
- **17-19 Nov: trim about -10% (room about £240-245 vs 269/275).**
  - It is now +14% vs the band (P78). On 13 Nov it was at parity. Two things changed:
    - The Smoobu-only prices ended, so guests now pay the PriceLabs price (+£17/n).
    - The band median fell from 250.75 to 237.50: the £247.50 comp cut to £237.50, and one more band listing was returned.
  - This is the risk flagged on 13 Nov ("if the PriceLabs price reaches Airbnb ... above the quality-supported 0% ceiling").
  - Reyhan's +5% (12-20 Nov override) is the part not supported.
  - The 3- and 4-night stays (17-20 Nov +2.9%, 17-21 Nov +0.3%) are inside the range. A trim on 17-18 Nov alone would fix the 2-night stays without pushing the longer runs below the band.
- **26 Nov: room about £205-240, keep min 1.** Today it is £306 / £360 all-in: P100, +27.7% vs the band (n = 5), NL >P90. **t-p12-26nov-price not fixed.** £150 of the £360 is cleaning.
- **30 Nov-3 Dec: about -5%.** It is +5.5% (P57). The 1-3 Dec and 2-4 Dec sub-stays are +12% to +13% (P64-P67). The algorithm already took £6-15 off. The 4-night stay is at parity (-1.1%), so hold that.
- **7-10 Dec: about -5% to -7%.** It is +7.4% (P58), down from +14.4% after the algorithm cut 8 Dec. 7-11 Dec (+4.5%) and 7-14 Dec (+4.6%) are near the top of the range: hold, or at most -5%.
- **11-14 Dec: about -5% to -7%.** It is +6.8% vs the band (P57) and +11.8% vs the stored set. The algorithm raised 11-12 Dec to 317/323 ("High Demand"), but guests pay £299.33 because 13 Dec is 287. NL is still >P90.
- **`recommend`:**
  - 30-day window (14 Nov-13 Dec): the comp percentile is P67 over 13 stays, which gives **hold** (booked 45% vs market 43%). NL P87 also gives **hold**.
  - 60-day window: no sellable night (handback).
  - At stay level, the evidence (17-19 Nov P78 +14%, 26 Nov P100 +28%, 1-4 Dec P64-P67 +12%; -0.59 star; the -15% quality cap) **supports the trims above**. Hold 17-21 Nov (4 n) and 30 Nov-4 Dec (4 n).

## Priority 2: P04 Barking (18-24 Nov and December)
- **Quality:** `quality_premium` = **-0.15** (cap). The synced listing is now **4.2 from 10 reviews** (13 Nov: 4.11 from 9, so one new review). The comp median is 4.85 from 27 (a gap of 17 reviews). **Supported: about -15% vs the comp/band median (x 0.85-1.00).**
- Overrides (unchanged since 11 Nov 17:16Z):
  - 14-17 Nov: min 2.
  - 18-24 Nov: -5%, min 3.
  - 25 Nov: +15%.
  - 26-30 Nov and 3-5 Dec: -8%.
  - 2 Dec: +200%.
  - 6-22 Dec: -5%, min 3.

| Stay | Ours all-in today (13 Nov) | PriceLabs `price` = Smoobu | Stored median (n), pctl, vs | Band median all / operator once (n), vs | Pctl in band | Supported room |
|---|---|---|---|---|---|---|
| **18-21 Nov** | **163** (150.67) | 148/151/154 | 239.84 (2), P0, **-32.0%** | 230 (6) / 223.50, **-29.1% / -27.1%** | P0 | 176-207 |
| 20-23 Nov | 165.67 (162.67) | 154/157/152 | 257.67 (1), P0, -35.7% | 240 (5) / 225, -31.0% / -26.4% | P0 | 178-210 |
| 21-24 Nov | 165.33 (165.67) | 157/152/153 | 257.67 (1), P0, -35.8% | 235 (5) / 225, -29.6% / -26.5% | P0 | 178-210 |
| 22-25 Nov | 164.33 (164.67) | 152/153/153 | 248.33 (3), P0, -33.8% | 230 (8) / 225, -28.6% / -27.0% | P0 | 178-209 |
| 18-25 Nov (7 n) | 133 (128.14) | 148-157 | 249 (1), P0, -46.6% | 215.57 (5) / 209.07, -38.3% / -36.4% | P0 | 204-240 |
| **6-9 Dec** | **171.67** (185.33) | **164/161/162** (181/179/180) | 222 (3), P0, **-22.7%** | 230 (8) / 222, **-25.4% / -22.7%** | P12 | 178-210 |
| **9-12 Dec** | **174** (188.33) | 161/164/171 | 222 (3), P0, -21.6% | 235 (8) / 222, -26.0% / -21.6% | P12 | 179-211 |
| 11-14 Dec | 184 (208.33) | 171/173/163 | 213.84 (2), P0, -14.0% | 222 (5) / 214.34, -17.1% / -14.2% | P0 | 167-197 |
| 14-17 Dec | 208 (209) | 175/179/181 | 235.17 (4), P25, -11.6% | 218.67 (9) / 231.84, -4.9% / -10.3% | P11 | 169-199 |
| 17-20 Dec | 218.33 (220.67) | 184/190/196 | 241 (2), P0, -9.4% | 228 (8), -4.2% | P12 | 169-198 |
| 6-13 Dec (7 n) | 142.29 (155.86) | 161-173 | 186.79 (2), P0, -23.8% | 181.22 (6) / 155.43, -21.5% / -8.5% | P17 | 153-180 |

- **18-24 Nov (open, 7 nights, next 14 days):** -32% to -36% vs the stored set and -27% to -31% vs the band. NL P33.
  - Guests now pay the PriceLabs price, which is £12/n more on 18-21 Nov. The gap is still about twice the -15% quality floor.
  - **Supported: about +10%** (`recommend` 30-day **raise +10%**: comp P0 over 9 stays, NL P38, booked 46% vs market 25%).
  - The comps alone would carry +15% to +35%. That is not proposed: market occupancy is 25%, Corentin judged on 24 Oct that there was no November demand, and comp n is low (band 5-8, stored 1-3).
- **December:**
  - **6-13 Dec is now -22% to -26% vs comps**, below the -15% floor (13 Nov: -15% to -20%), after today's ~10% algorithm cut.
  - **Supported: about +10% on 6-13 Dec.** That would bring the room back to about £177-190, roughly the 13 Nov level. Removing Reyhan's -5% there covers half of it.
  - The likely driver is a recency/occupancy factor. Its cause is for the PriceLabs auditor.
  - 14-20 Dec (-4% to -12%) is inside the supported range: **hold.**
  - `recommend` 60-day (14-31 Dec): **raise +10%** (comp P12, n = 2; NL P54; booked 67% vs 20%). Not adopted beyond 6-13 Dec, because comp n is 2 and the lead comes from existing bookings.
- **For Corentin to confirm (carried standing-decision conflicts, not new proposals):**
  - Policy `price_changes` (24 Oct) sets -8% on 1-25 Nov. PriceLabs has no override on 14-17 Nov and -5% on 18-24 Nov.
  - Policy `listing_facts.P04.min_stay_rule` says never fewer than 3 nights, but min 2 is still set on 14-17 Nov. **Exposure: none**, because 14-17 Nov is booked.
- **2 Dec** (+200%, min 1, £410) is deprioritised in policy and not raised.
- **Weekly discount (t-p04-weekly): not fixed.**
  - Airbnb shows £173.02 off £1,104 on 18-25 Nov and £187.27 off £1,183 on 6-13 Dec. After the £142 cleaning, both are **18.0% of room**, vs the 15% policy.
  - P12 7-14 Dec: £268.55 off £1,941 is **15.0%** after the £150 cleaning (in line).

## P04 unsynced listing 1455876748739910219 (Barking 1455, day 15)
**Still bookable on all 11 P04 open runs of 3+ nights checked:**

| Run | Price |
|---|---|
| 18-21 Nov | £571 (13 Nov £526) |
| 20-23 Nov | £542 |
| 21-24 Nov | £539 |
| 22-25 Nov | £531 |
| 18-25 Nov | £1,324 (£1,203) |
| 6-9 Dec | £562 |
| 9-12 Dec | £639 (£675) |
| 11-14 Dec | £681 |
| 14-17 Dec | £659 |
| 17-20 Dec | £695 |
| 6-13 Dec | £1,291 |

A booking on it would not reach Smoobu. **t-p04-doublebook: not fixed.**

## Priority 3: P01 Bowsprit Point 18-20 Dec (blocked, before the 20 Dec handback)
- **Still blocked:** the 14 Nov raw (refreshed 04:42Z) shows 18-20 Dec `Blocked`, price 271/268/237, min 3. Our listing was not returned for 18-21 Dec. There was no PriceLabs edit (`get_user_logs`). **t-p01-1820block: not fixed.**
- **Comps for 18-21 Dec (3 n, all-in):**
  - Stored median **£369.67** (n = 7, range 281-524). On 13 Nov it was £382.67. Two comps cut: 1684834789445533643 went 479 -> 369.67 and 1439222085860877494 went 711 -> 524.
  - Band median **£339.17** (n = 16; 13 Nov £345).
- **If reopened** at today's PriceLabs 271/268/237 (£776; NL P47) plus £149 cleaning, it would be **£308.33/n before any Airbnb guest fee**. That is **P14 of the stored set (-16.6%) and P25 of the band (-9.1%)**.
- **Supported: parity with the comp median (0%).** `quality_premium` = 0.0, because 4.75 from 4 reviews is under the 5-review threshold (comp median 4.8 from 30).
  - Today's price is below what comps support. No cut is needed, and up to about +9% (band) would still be at parity.
- **For Corentin to confirm (policy conflict, carried):** policy `handbacks` says "before the date, maximise revenue normally", but the block covers about £776 of room nights. Who extended it is NOT CHECKED.
- `recommend`: raise-signal (booked 100% vs market 36%, no open night).

## Priority 4: P09 Torrent Lodge
- **No open night before the 26 Nov handback** (all booked per `prices.csv`/`reservations.csv`; from 27 Nov it is the handback block). Nothing to position.
- Comp level for reference: 2-night median £164 (17-22 Nov), £196.67 (24-27 Nov, n = 1).
- `quality_premium` 0.0 (5.0 from 3 reviews; comp median 4.56). `recommend`: raise-signal (booked 100% next 30 vs 39%).

## Summary per property
`recommend` runs on the median comp percentile of our priced open stays in each window (14 Nov-13 Dec and 14-31 Dec), with `quality_premium` (needs 5+ reviews).

| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market (`pl_kpis`) | `recommend` 30 / 60 | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (18-20 Dec blocked) | stored 282-427 (n 1-7); 18-21 Dec 369.67 (7) | n/a (would be P14 stored / P25 band) | 4.75 vs 4.8 | 4 vs 30 (-26) | 0.0 (<5 reviews) | 100% / 100% vs 36% / 29% | raise-signal | **parity** if 18-20 Dec reopens (today's price is -9% to -17%, which is supported) |
| P04 (synced 1657...) | 133-218.33 | stored 186.79-257.67 (n 1-4); band 181-240 (n 5-9) | P0 in November; P0-P25 in December | **4.2** vs 4.85 | 10 vs 27 (-17) | -0.15 | 47% / 45% vs 25% / 20% | raise +10% (P0, 9 stays) / raise +10% (P12, n 2); NL P38 / P54 | **-15%.** 18-24 Nov at -27% to -36%: **+10%** supported. **6-13 Dec at -22% to -26% after today's algorithm cut: +10% supported.** 14-20 Dec: hold |
| P04 unsynced 1455... | 177-231.67, bookable on all 11 runs | | | 4.69 | 26 | n/a | | | map or unlist |
| P09 | no sellable night (17-26 Nov booked) | 164-248.50 | n/a | 5.0 vs 4.56 | 3 vs 25 (-22) | 0.0 | 100% / handback vs 39% / 32% | raise-signal | nothing to position before the handback |
| P12 | 238.86-360 | band 228.29-282; stored 220-283 | band P47-P100 (median P58) | 4.27 vs 4.86 | 15 vs 19 (-4) | -0.15 | 47% / 73% vs 43% / 34% | hold (P67, 13 stays) / no sellable night; NL hold (P87) | **-15% to 0% vs band.** **17-19 Nov now +14% (P78): about -10%.** 26 Nov: -22% to -33%. 1-4 Dec: about -5%. 7-10 and 11-14 Dec: about -5% to -7%. Hold 17-21 Nov (4 n) and 30 Nov-4 Dec (4 n) |
| P15 | no listing of ours | 135.25-170.50 (n 1-5) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 14 Nov)
| Item | Status |
|---|---|
| t-smoobu-manual-1213 | **Gone in this batch.** P12 17-19 Nov and P04 18-20 Nov Smoobu = PriceLabs `price`. Airbnb now shows the higher price (P12 +£17/n, P04 +£12/n). |
| t-p04-doublebook | **Not fixed** (day 15). 1455 is bookable on all 11 runs. |
| t-p04-min2-nov | Setting still there (min 2 on 14-17 Nov). No exposure: 14-17 Nov is booked. For Corentin (policy conflict). |
| P04 -5% (18-24 Nov / 6-22 Dec, Reyhan 11 Nov) | Unchanged. November: +10% supported. **6-13 Dec has dropped another ~10% through the algorithm and now sits at -22% to -26%: +10% supported.** |
| a-p12-trim | **17-19 Nov has come back** (+14%, P78). Not done on 26 Nov, 1-4 Dec, 7-10 Dec or 11-14 Dec. The algorithm narrowed 7-10 Dec (+14% -> +7%). |
| t-p12-26nov-price | **Not fixed.** £306 room / £360 all-in, P100, +27.7%. |
| P12 +5% (Reyhan, 14-20 Nov and 30 Nov-3 Dec) | **Not supported on 17-19 Nov now** (+14%) or on 1-3 Dec (+12%). Supported on the 3-4 night runs. |
| t-p04-weekly | **Not fixed** (18.0% vs 15%). |
| t-p01-1820block | **Not fixed** (still `Blocked`). For Corentin. |
| Push freshness | P12 refreshed 14 Nov 05:49:55Z, P01 14 Nov 04:42:58Z, P04 13 Nov 09:07:39Z (raw `last_refreshed_at`). |

## Critical / high findings
- **CRITICAL: the P04 unsynced Airbnb listing 1455876748739910219 is still bookable on all 11 P04 open runs of 3+ nights (day 15).** For example 18-25 Nov £1,324 and 6-13 Dec £1,291.
- **HIGH: P04 6-13 Dec fell about 10% overnight with no edit** (PriceLabs `price` 181-193 -> 161-173; uncustomized and overrides unchanged). It is now **-22% to -26% vs comps**, below the -15% quality floor. About **+10% is supported** (`recommend` raise +10%).
- **HIGH (for Corentin to confirm): P04 18-24 Nov is -27% to -36% vs comps** (NL P33). About **+10% is supported**. Policy (24 Oct) set -8% on 1-25 Nov, and PriceLabs differs from that, so this is evidence for Corentin, not a new proposal.
- **HIGH (for Corentin to confirm): P01 18-20 Dec is still blocked** before the 20 Dec handback. The comps support today's price: £308/n vs a stored median of £369.67 (-17%) and a band median of £339 (-9%). The block holds about £776 of room nights.
- **MEDIUM: P12 17-19 Nov is now +14.1% vs the band (P78)**, because the Smoobu-only prices are gone and the band median fell. About -10% on 17-18 Nov is supported. The 3-4 night runs are in range.
- **MEDIUM: P12 26 Nov** is £306 room / £360 all-in: P100, +27.7% vs the band (n = 5). The supported room is about £205-240.
- **MEDIUM: P12 1-4 Dec (+12-13%, P64-P67), 7-10 Dec (+7.4%) and 11-14 Dec (+6.8%).** About -5% to -7% is supported.
- **MEDIUM: P04 Airbnb weekly discount is 18.0% of room vs the 15% policy** (t-p04-weekly).
- **MEDIUM: PriceLabs `user_price` lags `price` on P04 (18-20 Nov, 6-13 Dec) and P12 (20 Nov, 11-12 Dec).** Airbnb and Smoobu follow `price`. This is for the PriceLabs auditor.

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-14.
- "13 Nov x" = the same comp and stay on 13 Nov, where the two differ by more than £1.
- `*` = found by the 0.3 km second pass.
- Full source for every row: `data/snapshots/2026-11-14/comps.csv` (`comp-east`, `east-refband`, `east-ours`).
- Cancellation policy: NOT CHECKED.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 18 Dec-21 Dec | 18 Dec-20 Dec | 19 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | – | – | – | – | – | – | – | 320 | – | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 427 (13 Nov 499) | 372 | 376.33 | 355 (13 Nov 352) | 459 (13 Nov 454) | 329 | 304 | 282 | 282 | 334 (13 Nov 337) | 327 (13 Nov 322) | 270 (13 Nov 259) | 275 | 319 (13 Nov 321) | 329 (13 Nov 332) | 334 (13 Nov 337) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.45 (159) | none listed | – | – | 180 (13 Nov 181.33) | – | – | 198 | 199 (13 Nov 200.50) | 204 | – | – | – | – | 208 | – | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (56) | Lift | – | – | 327.33 (13 Nov 290.67) | – | – | – | – | – | – | – | – | – | – | 380.67 (13 Nov 395.33) | – | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.6 (30) | Lift/River view/balcony | – | – | 255 | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – | – | – | – | – | – | – | – | – | – | 382.67 | – | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | – | 390 | – | – | 385.50 | – | – | – | – | 382 (13 Nov 371.50) | 371.50 | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | 322.50 (13 Nov 341) | 305.67 (13 Nov 321.67) | 328 (13 Nov 369) | 345 (13 Nov 430.50) | – | – | – | – | 386 (13 Nov 482.50) | 363.50 (13 Nov 454) | 341 (13 Nov 426) | 341 | 369.67 (13 Nov 479) | 376 (13 Nov 495.50) | 366.50 (13 Nov 471) |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.82 (17) | Lift | – | – | – | 280 | – | 335 | 335 | – | – | – | – | – | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (43) | Lift/Private patio or balcony/Superhost/Guest favourite (added 4 Nov, replaces inactive 20404597) | – | – | – | – | – | 405.50 | 405.50 | 405.50 | 439 | – | – | 472 | 472 | 524 (13 Nov 711) | 528 (13 Nov 640.50) | 534 (13 Nov 758) |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – | – | – | – | – | – | – | – | – | – | 281 | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.8 (30) | | **427** (1) | **347.25** (2) | **305.67** (7) | **341.50** (4) | **402** (2) | **332** (4) | **335** (5) | **282** (3) | **360.50** (2) | **360** (2) | **345.25** (2) | **361.50** (4) | **341** (5) | **369.67** (7) | **376** (3) | **366.50** (3) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.2 (10); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 18 Nov-21 Nov | 20 Nov-23 Nov | 21 Nov-24 Nov | 22 Nov-25 Nov | 18 Nov-25 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | 257.67 | – | – | – | – | – | – | – | – | – | – | 257.67 | 257.67 | 257.67 | 257.67 | 249 | – | – | – | 260 | 260 | – |
| [1083936003491396261 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1083936003491396261) | 1.24 | 5 | 4.9 (41) | Superhost (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (27) | Free parking on premises/Superhost/Guest favourite | – | – | 144.33 (13 Nov 141.33) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.76 (41) | Free parking on premises/Superhost (added 30 Oct) | – | – | 248.33 | – | – | 250 | 250 | 250 | 250 | – | – | – | 250 | – | – | – | 248.33 | – | 273.33 | 248.33 | – | 248.33 | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | 222 | 222 | – | 222 | – | 222 | 222 | 222 | 222 | 222 | 222 | 222 | 222 | 222 | – | – | – | – | 222 | 222 | 222 | 222 | 222 | 207 |
| [1387112821878102742 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 | 6 | 4.85 (27) | Parking (in name) (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (16) | Free on-street parking/Superhost | – | – | 183.33 (13 Nov 185.33) | 210 | – | 217 | 217 | 217 | 222 | 227 | 220 | 213 | 213 | – | – | – | 183.33 (13 Nov 185.33) | – | 198.67 | 203.67 | 205.67 | 196.33 | – | 166.57 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **163** | **165.67** | **165.33** | **164.33** | **133** | **171.67** | **174** | **184** | **208** | **218.33** | **142.29** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | 190.33 | 180.67 | 179.67 | 177 | 189.14 | 187.33 | 213 | 227 | 219.67 | 231.67 | 184.43 |
| **Comp median (n)** | | | 4.85 (27) | | **222** (1) | **222** (1) | **215.83** (4) | **216** (2) | n/a (0) | **222** (3) | **222** (3) | **222** (3) | **222** (3) | **224.50** (2) | **221** (2) | **217.50** (2) | **222** (3) | **239.84** (2) | **257.67** (1) | **257.67** (1) | **248.33** (3) | **249** (1) | **222** (3) | **222** (3) | **213.83** (2) | **235.17** (4) | **241** (2) | **186.78** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | – | P0 (-32.0%) | P0 (-35.7%) | P0 (-35.8%) | P0 (-33.8%) | P0 (-46.6%) | P0 (-22.7%) | P0 (-21.6%) | P0 (-14.0%) | P25 (-11.6%) | P0 (-9.4%) | P0 (-23.8%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 164 | 164 | – | – | – | 164 | 164 | 164 | 164 | 164 | 164 | 164 | 164 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 161 | 161 (13 Nov 162.50) | – | – | – | 161 | 161 | 161 | 161 | 161 | 161 | 161 | 162.50 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.7 (23) | none listed | – | – | – | 142 (13 Nov 146.50) | – | 188.50 (13 Nov 192) | 186.50 (13 Nov 188) | – | – | – | – | 173 | 169* |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | 200.50 | 200.50 | 196.67* | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | – | – | 202.50 (13 Nov 206.50) | – | – | – | – | – | – | – | 198 (13 Nov 193.50) | 210 |
| [958156921765583815 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | – | – | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.56 (25.0) | | **164** (3) | **164** (3) | **196.67** (1) | **202.50** (3) | **248.50** (1) | **176.25** (4) | **175.25** (4) | **164** (3) | **164** (3) | **164** (3) | **164** (3) | **173** (5) | **169** (5) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 17 Nov-20 Nov | 18 Nov-20 Nov | 17 Nov-21 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 2 Dec-4 Dec | 7 Dec-10 Dec | 7 Dec-11 Dec | 11 Dec-14 Dec | 7 Dec-14 Dec | 13 Dec-14 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.50 (13 Nov 247.50) | 237.50 | 225 | 237.50 | – | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 225 (13 Nov 235) | 237.50 (13 Nov 247.50) | 218.75 (13 Nov 226.25) | – | 225 | – | – | 225 | 218.75 | 225 | 200.71* | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking on premises | – | – | 256 | – | – | – | – | – | – | – | – | – | – | 258.67 | – | 257.50 | – | 316.67 | 312.50 | – | – | – | 352 | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (79) | Superhost | – | – | 199.67 (13 Nov 195.33) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 202 | 208.75 | – | – | – | 232.67 (13 Nov 231) | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.94 (16) | Superhost/Guest favourite | – | – | 185 | 220 | – | 220 | 220 | 220 | – | – | – | 215 | – | – | – | – | – | 208.33 | 211.25 | 220 | 220 | 220 | – | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (120) | Superhost/balcony/Guest favourite | 254 | – | 250.67 | 254 | – | – | – | – | – | – | – | – | – | 250.67 | 254 | 247.75 | 284 | 250.67 | 243.75 | 254 | – | – | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | 1035 | 1035 | 1032.33 | 1035 | 1035 | 1051.50 (13 Nov 1035) | 1035 | 1035 | 1035 | 1035 (13 Nov 1048.50) | 1035 (13 Nov 1058.50) | 1035 (13 Nov 1045) | 1035 | 1034 (13 Nov 1039) | 1037.50 (13 Nov 1045) | 1032.25 (13 Nov 1036) | 1043 | 1043 (13 Nov 1032.33) | 1039 (13 Nov 1031) | 1035 | 1043.33 (13 Nov 1032.33) | 1039.25 (13 Nov 1031) | 1032.33 (13 Nov 1048) | 883.43 (13 Nov 885) | 1043 (13 Nov 1063) |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | 282 | – | 282 | 282* (13 Nov 284.50) | – | 288.50 (13 Nov 298) | 283.50 (13 Nov 289) | 284 (13 Nov 290.50) | 297.50 (13 Nov 307.50) | 310 (13 Nov 319.50) | 299.50 (13 Nov 308.50) | 285 (13 Nov 304) | 293 | 282 | 282 | 282 | 282 | 282 (13 Nov 283.67) | 285 (13 Nov 288.75) | 288 (13 Nov 295.50) | 286.33 (13 Nov 293.33) | 286.25* (13 Nov 294.25) | 302.67 (13 Nov 311.67) | 284.14 (13 Nov 292.14) | 288 |
| **Ours** | | | | | **271** | not bookable | not bookable | **268** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **262** | **277.50** | **258.25** | **360** | **251** | **241** | **271** | **247.67** | **240.75** | **299.33** | **238.86** | not bookable |
| **Comp median (n)** | | | 4.86 (19) | | **254** (3) | **237.50** (1) | **237.83** (6) | **245.75** (4) | n/a (0) | **237.50** (3) | **237.50** (3) | **237.50** (3) | **267.50** (2) | **273.75** (2) | **268.50** (2) | **237.50** (3) | **265.25** (2) | **254.67** (4) | **254** (3) | **252.62** (4) | **283** (2) | **237.83** (6) | **243.75** (5) | **254** (3) | **225** (3) | **220** (3) | **267.67** (4) | **242.43** (2) | **288** (1) |
| **Our pctl (vs median)** | | | | | P67 (+6.7%) | – | – | P75 (+9.1%) | – | – | – | – | – | – | – | – | – | P75 (+2.9%) | P67 (+9.3%) | P75 (+2.2%) | P100 (+27.2%) | P67 (+5.5%) | P40 (-1.1%) | P67 (+6.7%) | P67 (+10.1%) | P67 (+9.4%) | P50 (+11.8%) | P50 (-1.5%) | – |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | – | 170.50 | – | 170.50 | 170.50 | 170.50 | 183 | 195.50 | 183 | 170.50 (13 Nov 190) | 190 |
| [1371771992549776701 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | 135 | 160 | 135* | 135 | – | 135 | 135 | 135 | 147.50 | 160 | 147.50 | 135* | 135 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | 159.67 | – | – | – | – | 167.50 | 169 (13 Nov 167.50) | 170.50 (13 Nov 167.50) | 170.50 (13 Nov 167.50) | 170.50 (13 Nov 167.50) | 170.50 |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.92 (25) | Free parking on premises/Guest favourite | – | – | – | 181 | – | 181 | – | – | – | – | – | – | 181 |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (202) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | 135.50 | – | – | 140.50 | – | – | – | – | – | – | – | 145.50 | 140.50 |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | 146.67* | – | – | – | – | – | – | – | – | – | – |
| **Comp median (n)** | | | 4.84 (14) | | **135.25** (2) | **160** (1) | **146.67** (3) | **155.50** (4) | n/a (0) | **170.50** (3) | **152.75** (2) | **167.50** (3) | **169** (3) | **170.50** (3) | **170.50** (3) | **158** (4) | **170.50** (5) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings (Airbnb only).
- Comp cancellation policies and band-listing sleeps: NOT CHECKED. Lift, view and parking come from listing-page reads on 25 Oct-5 Nov.
- **Smoobu was not called.** Smoobu prices come from `prices.csv` 14 Nov.
- **P04 6-13 Dec ~10% drop:** the cause is NOT VERIFIED. The Booking Recency Factor fits the 30-day edge at 13 Dec, and the occupancy-based adjustment is another possible cause. This is for the PriceLabs auditor.
- **PriceLabs `user_price` lagging `price`:** the cause is NOT CHECKED.
- **Inactive checks:** 4 stored comps were not returned on any stay today (P04 1083936003491396261 and 1387112821878102742, P09 958156921765583815, P15 1371771992549776701). No forward sweep was run today, so they are kept as active on earlier evidence. The P04 pair is on day 3.
- **P01:** who extended the Smoobu block to 21 Dec, and why: NOT CHECKED. The if-reopened all-in is estimated (room + £149 cleaning, Airbnb guest fee excluded).
- **P04:**
  - Stored n is 1-4 per stay. Band n is 5-9, with a 5-unit operator (shown both ways).
  - The 18.0% weekly figure assumes £142 cleaning.
- **P12:**
  - The 26-27 Nov band is n = 5. No stored comp was returned for 4-6 Dec, and only 1 for 13-14 Dec.
  - Room targets are approximate (ratio method; cleaning is fixed).
- **Implied Airbnb room on P12 17-20 Nov** is (786 - 150) / 3 = £212/n vs Smoobu £277 (0.77x). The cause (Smoobu Airbnb rules or the host fee) is NOT CHECKED. It is for the channel agent.
- **P09:** NL percentiles not fetched (no open night).
- **NL percentiles:** PriceLabs does not state the horizon or cleaning basis.
