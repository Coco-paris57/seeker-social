# Competitor positioning: EAST batch (D = 2026-11-15)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy `intentional_blocks`). Not analysed.
- **P15** has no listing of ours. Reference only.
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec, P09 26 Nov, P12 13 Dec).

**Method** (same as 26 Oct-14 Nov; scripts in the scratchpad `east15/bin`)
- **Comp ids:** same set as 14 Nov (`data/snapshots/2026-11-14/comps.csv`): P01 11, P04 7, P09 6, P12 7, P15 7. **One replaced (P04):**
  - **P04 1083936003491396261 is dropped as inactive.** It was not returned on any November-December stay for the fourth day running, and a 0.3 km box sweep of 10 three-night stays from 4 Jan to 12 Feb 2027 did not return it either. **Replaced by 985683261536682900**: 2BR, sleeps 5, 4.82 from 17 reviews, Superhost, 0.61 km, paid street parking off premises (listing page read 15 Nov). It is priced at £225/n all-in on 10 stays.
  - **P04 1387112821878102742 is kept.** The same sweep shows it bookable on 7 of 10 January-February stays (£534 for 3 nights). It is not returned on November-December dates, which means it is booked, not inactive.
  - P09 958156921765583815 was not returned on any stay again. It was not swept, because P09 has no open night to price. It is kept on earlier evidence.
  - P12 29297702 still looks like a placeholder (about £1,031-1,045/n) and stays out of the medians.
- **Access:** public Airbnb pages (HTTP 200).
  - 96 wide searches, then 514 + 16 comp/stay checks in a 0.3 km box (`*` in the tables), and 20 sweep searches.
  - Box sizes: 2.5 km for P04, 1.8 km for P09, 1.3 km for the rest. 4 guests for 2BR, 3 for 1BR.
  - **Booking.com: NOT CHECKED** (no live Booking.com pages loaded).
- **Price basis = what guests see:** the Airbnb **guest-paid all-in total / nights**. That is after discounts, with cleaning and Airbnb fees **included**. No separate taxes are shown. Our listings are priced the same way.
  - PriceLabs, Smoobu and `reservations.csv` figures are **room only, cleaning excluded**. Airbnb cleaning: P12 £150, P04 £142, P01 £149 (`reservations.csv` cleaning_gbp).
  - Sold stays are compared on the same basis. P04 20-24 Nov: room £489.59 + £142 cleaning = £631.59, which is **£157.90/n all-in**. Its £97.90 commission is 15.5% of that, which fits an Airbnb host-only fee, so the guest paid £631.59. P12 7-14 Dec was a Booking.com sale. Its Booking.com cleaning fee is NOT CHECKED, so the £204.63/n room rate is a **floor** for what the guest paid all-in.
- **Stays (same dates for comps and us):**
  - Default stays: next Fri-Sun **20-22 Nov**, midweek Tue-Thu **17-19 Nov**, and 30 days out **15-17 Dec (new today)**.
  - Trend stays: 24-27 Nov, 1-3, 4-6, 7-9, 8-10, 9-11, 10-12, 11-13, 12-14, 13-15 and 14-16 Dec.
  - Key-date stays:
    - P01: 18-21, 18-20 and 19-21 Dec.
    - P04: **18-20 Nov (the remaining 2-night gap)**, 18-21 Nov, **20-24 Nov (the sold stay)**, 20-23, 21-24 and 22-25 Nov, and the 6-20 Dec runs.
    - P12: 17-20, 18-20 and 17-21 Nov; 26-27 Nov; the 30 Nov-4 Dec runs; and **7-14 Dec (the sold week)** with 7-10, 7-11 and 11-14 Dec.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius, excluding ours. The P04 band is shown both with and without collapsing the 5-unit 1531... operator to one listing.
- **Data written:** `data/snapshots/2026-11-15/comps.csv` did not exist.
  - Under `flock` on `.comps.csv.lock` I copied 14 Nov forward (22,684 lines) and **appended 1,326 rows**, giving 24,010 lines.
  - 746 `comp-east` rows: every stored comp x stay (NOT RETURNED rows kept), plus 20 `comp-east sweep` rows for the two P04 January checks.
  - 429 `east-refband` rows.
  - 151 `east-ours` rows: Airbnb all-in rows for ours and the unsynced P04 listing; Smoobu room rows with the 15 Nov raw PriceLabs `price`/`user_price`/`uncustomized_price`; and the two sold stays.
  - None of the `east-ours` or `east-refband` rows are comps.
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` (listing, 14-15 Nov): **0 entries.**
  - `get_neighbourhood_data`:
    - P04: OK.
    - P12: a 500 on the first call, then OK on retry.
    - P01: an empty failure on the first call, then OK on retry.
  - `get_listing_date_overrides` P04: unchanged since 11 Nov 17:16Z.
- **Smoobu: not called.** Smoobu prices come from `prices.csv` (15 Nov) and stays from `reservations.csv` (15 Nov).

## What changed since 14 Nov (this batch)
**1. P04 sold 20-24 Nov. It went through the synced Airbnb listing, and the unsynced 1455 listing is still open on the same nights.**
- Which listing:
  - The synced listing 1657859794156786222 (Smoobu 3562176) is **no longer returned** for 20-22, 20-23, 21-24 or 20-24 Nov.
  - The unsynced listing **1455876748739910219 is still bookable on 20-24 Nov (£680)**, 18-21 Nov (£571), 20-23 (£542), 21-24 (£539) and 22-25 Nov (£531).
  - The stay is in Smoobu `reservations.csv`, so it came through the Smoobu-connected listing.
- **The same nights can now be sold twice** (t-p04-doublebook, day 16).
- PriceLabs has not registered the stay. The 15 Nov raw was refreshed 14 Nov 08:42Z, and 20-24 Nov is still open there at 161/164/158/157 (t-pl-sync).
- **Ratio paid vs our price:**
  - Room £489.59 vs PriceLabs = Smoobu £640 (161+164+158+157, 15 Nov raw) is **0.765**.
  - Against the pre-push prices (154/157/152/153 = £616, 14 Nov raw) it is **0.795**.
  - Yesterday Airbnb displayed 20-23 Nov at £497 all-in. That is £118.33/n room against Smoobu £463, also **0.767**.
  - So the guest paid what Airbnb was showing. The roughly 0.77 factor sits on the Airbnb side, and 0.85 x 0.90 = 0.765 matches it. Which rules make it up is for the channel agent.
- **What is left open in November:** only **18-19 Nov** (2 nights, between the 14-18 Nov and 20-24 Nov stays).
  - PriceLabs sets min stay 3 there (override, unchanged since 11 Nov).
  - **Airbnb nevertheless returns the synced listing for the 2-night stay 18-20 Nov at £390 (£195/n all-in).** That conflicts with policy `P04.min_stay_rule` ("never open for less than 3 nights"). For Corentin to confirm. Not a proposal.
  - Smoobu has 175/165 on those nights, against PriceLabs 155/158.

**2. P12 sold the whole 7-14 Dec week on Booking.com.**
- This removes the 7-10, 7-11 and 11-14 Dec items from a-p12-trim.
- It was booked 14 Nov. PriceLabs at the time (14 Nov raw, 05:49Z): 259/249/267/287/317/323/287 = £1,989.
- Paid room **£1,432.42 = 0.720 x PriceLabs**.
  - After the policy x1.10 Booking.com markup and the 15% weekly discount, the expected price is £1,859.72. Paid is **0.770** of that, so about **23% comes from stacked Booking.com promotions**. Policy `booking_stacked_promotions` says to report this size, not call it unexplained.
- Commission £237.36 is **16.6%**. Policy lists the Visibility Booster for Camden and Shepherd's Bush only. Whether Mile End has one is NOT CHECKED, so this is for the channel agent to ask, not to assume.
- After the sale, PriceLabs moved the now-booked 7-13 Dec to 285-359 (uncustomized 285-398).

**3. P12 30 Nov-3 Dec rose about 11% overnight with no edit.**
- PriceLabs `price` went 252/267/269/275 -> **267/297/299/307**.
- `uncustomized_price` went 222/240/242/250 -> 271/297/299/310 ("Normal/Low Demand").
- `get_user_logs` is empty, so this was the algorithm, probably reacting to the new neighbouring bookings. **The cause is NOT VERIFIED.**
- Airbnb 30 Nov-3 Dec all-in went 251 -> **270.33**, 1-3 Dec 268 -> 290.50, and 2-4 Dec 271 -> 294.50.
- Other P12 moves:
  - 17-19 Nov: 269/275 -> 269/270.
  - 20 Nov: 322 -> 311.
  - 26 Nov: 306 -> 303.

**4. P04 14 Dec fell 175 -> 155 (-11%) with no edit.**
- 14 Dec is now 29 days out. Yesterday the about 10% cut on 6-13 Dec stopped exactly at the 30-day edge.
- This fits the Booking Recency Factor ("... affecting prices for the next 30 days", `get_customizations` 14 Nov) better than any other cause seen. It is still NOT VERIFIED and is for the PriceLabs auditor.

**5. Comp moves of £10 or more (same comp, same stay):**
- P12 1120913156789373408: 11-14 Dec 232.67 -> 281, and 24-27 Nov 199.67 -> 183.
- P12 1383544079404594066: 14-16 Dec 293 -> 282.
- P01 41905186: 20-22 Nov 372 -> 382.
- P01 1418178473526356202: 13-15 / 14-16 Dec +£10.50.
- P04 1577633201778145138: 14-16 Dec 250 -> 262.50.
- P15 1617544963466664181: 14-16 Dec 190 -> 170.50.
- 228 of 279 like-for-like comp/stay prices are within £1 of 14 Nov.

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 15 Nov)
These are market bands, not comps. PriceLabs does not state their horizon or cleaning basis. "Ours" is the PriceLabs room `price` (`prices.csv` 15 Nov).

| Ref | 2BR band (n) | P25 / P50 / P75 / P90 today (14 Nov) | Market occ 30 / 60 (`pl_kpis.csv`) | Ours and NL percentile |
|---|---|---|---|---|
| P04 | 90 | 141 / 178 / 216 / 264 (140 / 178 / 216 / 264) | 24% / 20% | **18-19 Nov** (open, 2 n): 155/158, about **P35**. **20-24 Nov** sold at room £122.40, **below P25** (PriceLabs still shows it open at 161/164/158/157). **December 6-19 Dec** (14 n): £170.6, **P45** (P47) |
| P12 | 118 | 172 / 207 / 232 / 292 (173 / 207 / 233 / 292) | 44% / 34% | **17-20 Nov** £280.0, **P87**. **26 Nov** £303, **>P90**. **30 Nov-3 Dec** £292.5, **>P90** (P83 yesterday). **7-14 Dec sold** at room **£204.63, about P48** |
| P01 | 148 | 216 / 266 / 338 / 434 (218 / 265 / 338 / 437) | 36% / 29% | **18-20 Dec** (blocked): room £258.0 (269/268/237) would be **P46** |

- `occ_insights`:
  - P12 market 4-6 Dec +11.0%.
  - P04 3-5 Dec +9.8%.
  - 27/28 Dec-1 Jan: +17% to +19.6%.
- `fp_insights`: 26/27-30/31 Dec surge of P04 +10.3%, P12 +20.1%, P01 +26.1%.

## Priority 1: P04 Barking (20-24 Nov sold, 18-19 Nov, December)
- **Quality:** `quality_premium` = **-0.15** (the cap). We are 4.2 from 10 reviews. The comp median is 4.83 from 27 (a gap of 17 reviews). **Supported position: -15% vs the comp/band median (x 0.85).**
- Overrides are unchanged:
  - 15-17 Nov: min 2.
  - 18-24 Nov: -5%, min 3.
  - 25 Nov: +15%.
  - 26-30 Nov and 3-5 Dec: -8%.
  - 2 Dec: +200%.
  - 6-22 Dec: -5%, min 3.

| Stay | Ours, Airbnb all-in £/n | PriceLabs `price` (Smoobu) | Stored median (n), pctl, vs | Band median all / operator once (n), vs | Pctl in band | Supported room £/n |
|---|---|---|---|---|---|---|
| **20-24 Nov, SOLD** (14 Nov, Airbnb) | **157.90** (room 122.40 + £142 cleaning) | 161/164/158/157 (still open in PriceLabs) | 239.50 (2), **P0, -34.1%** | 231.25 (6) / 211.13 (4), **-31.7% / -25.2%** | P17 (op P25) | **144-162** |
| **18-20 Nov (2 n, gap)** | **195** (bookable on Airbnb despite min 3) | 155/158 (Smoobu 175/165) | 223.50 (2), P0, -12.8% | 223.50 (6) / 206.50 (4), -12.8% / -5.6% | P33 | 141-166 = **in range** |
| **6-9 Dec** | 170.67 (14 Nov 171.67) | 163/160/160 | 222 (3), P0, **-23.1%** | 230 (8) / 222, **-25.8% / -23.1%** | P12 | 178-209 |
| **9-12 Dec** | 173.33 (174) | 160/162/171 | 222 (3), P0, -21.9% | 235 (8) / 222, -26.2% / -21.9% | P12 | 179-210 |
| 11-14 Dec | 176.67 (184) | 171/173/**162** | 213.84 (2), P0, -17.4% | 222 (5) / 214.34, -20.4% / -17.6% | P0 | 174-205 |
| **14-17 Dec** | 200.33 (208) | **155**/176/179 (14 Nov 175/179/181) | 239.34 (4), P25, -16.3% | 222.33 (8) / 241.67, -9.9% / -17.1% | P12 | 174-205 |
| 17-20 Dec | 217.67 (218.33) | 183/189/195 | 241 (2), P0, -9.7% | 228 (7) / 225, -4.5% / -3.3% | P14 | 166-195 = in range |
| 6-13 Dec (7 n) | 141.43 (142.29) | 160-173 | 186.79 (2), P0, -24.3% | 181.22 (6) / 155.43, -22.0% / -9.0% | P33 | 153-180 |

"Supported room" uses the all-in median x 0.85-1.00, converted back to room (P04 band operator-collapsed; for the sold stay, all-in minus £142/4). It is approximate.

- **20-24 Nov (sold at £122.40/n room, £157.90 all-in):**
  - The price is **-25% to -34% vs comps**, about 10-19 points below the -15% that quality supports.
  - The quality-supported room is about £144-162/n, so the stay sold about **£22-39/n (£87-155 over 4 nights) below what the comp evidence supports**.
  - **That gap comes from the Airbnb-side ~0.77 factor, not from PriceLabs.** The PriceLabs/Smoobu room (avg £160) sits inside the supported range. The guest paid 0.765 of it.
  - Context:
    - Market occupancy is 24%.
    - The stay was booked 6 days out.
    - Comp n is low: stored 2, band 6 (4 when the operator is collapsed).
- **18-19 Nov (the only open November nights):**
  - £195/n all-in is **-6% to -13%**, which is **inside the supported range: hold the price.**
  - Whether it should be sellable for 2 nights at all is the policy conflict above (min-3 rule). For Corentin.
- **December:**
  - **6-14 Dec is -17% to -26% vs comps**, below the -15% floor.
  - **Supported: about +10% on 6-13 Dec** (room about £176-190, roughly the 13 Nov level). Removing Reyhan's -5% there covers half of it.
  - **Supported: about +5% on 14-17 Dec**, which brings 14 Dec back to about £170 after today's algorithm cut. The stay is -16% to -17% vs the stored set and operator band.
  - **17-20 Dec: hold** (-3% to -10%).
- **`recommend`:**
  - 30-day window (15 Nov-14 Dec; booked 64% by Smoobu vs market 24%): comp P0 over 6 stays gives **raise +10%**. NL P40 also gives **raise +10%**.
  - 60-day window (15-31 Dec; booked 71% vs 20%): comp P0 (n = 1 stay) and NL P54 give **raise +10%**.
  - **Adopted for 6-17 Dec only**, as above. The 18-19 Nov gap is inside the range.
- **For Corentin to confirm (carried standing-decision conflicts, not new proposals):**
  - Policy `price_changes` (24 Oct) sets -8% on 1-25 Nov. PriceLabs has -5% on 18-24 Nov.
  - Min 2 on 15-17 Nov vs the min-3 rule. No exposure, because those nights are booked.
  - **New: Airbnb sells 18-20 Nov as a 2-night stay.**
- 2 Dec (+200%, min 1, £407) is deprioritised in policy and not raised.

**Unsynced listing 1455876748739910219 (day 16):**

| Run | Price |
|---|---|
| **20-24 Nov (the nights sold on 1657)** | **£680** |
| 18-21 Nov | £571 |
| 20-23 Nov | £542 |
| 21-24 Nov | £539 |
| 22-25 Nov | £531 |
| 6-9 Dec | £562 |
| 9-12 Dec | £602 (14 Nov £639) |
| 11-14 Dec | £681 |
| 14-17 Dec | £659 |
| 17-20 Dec | £695 |
| 6-13 Dec | £1,291 |

- **t-p04-doublebook: not fixed, and the risk is now live.** A booking on 1455 for 20-24 Nov would not reach Smoobu and would overlap a confirmed stay.

## Priority 2: P12 Mile End (7-14 Dec sold; 17-20 Nov, 26 Nov, 30 Nov-3 Dec open)
- **Quality:** `quality_premium` = **-0.15** (cap). We are 4.27 from 15 reviews. The stored-comp median is 4.86 from 19 (a gap of 4 reviews). **Supported position: band median x 0.85-1.00, that is -15% to 0%.**

| Stay | Ours, Airbnb all-in £/n (14 Nov) | PriceLabs `price` = Smoobu | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room | Move vs PriceLabs |
|---|---|---|---|---|---|---|
| **7-14 Dec (7 n), SOLD** (Booking.com) | **room 204.63** (floor; Booking.com cleaning NOT CHECKED); Airbnb showed 238.86 on 14 Nov | 14 Nov: 259-323 (avg 284.1) | 228.29 (11), **P27, -10.4%** | 242.79 (2), P50, -15.7% | n/a (sold) | **In the supported range** (bottom half) |
| **17-19 Nov** | **269** (271) | 269/270 | 237.50 (9), **P78, +13.3%** | 254 (3), P67, +5.9% | 202-238 | **-25% to -12%** |
| 17-20 Nov (3 n) | 256.33 (262) | 269/270/270 | 254.67 (10), P50, +0.7% | 254.67 (4), P50, +0.7% | 228-268 | -16% to -1% (**in range**) |
| 18-20 Nov | 269.50 (277.50) | 270/270 | 245.75 (8), P75, +9.7% | 254 (3), P67, +6.1% | 209-246 | -22% to -9% |
| 17-21 Nov (4 n) | 251.75 (258.25) | 269/270/270/311 | 257.50 (7), P43, -2.2% | 252.63 (4), P50, -0.3% | 243-286 | -13% to +2% (**in range**) |
| **26-27 Nov (1 n)** | **357** (360) | **303** (+15% override, min 1) | 282 (5), **P100, +26.6%** | 283 (2), P100, +26.1% | **203-239** | **-33% to -21%** |
| **30 Nov-3 Dec** | **270.33** (251) | **267/297/299** (252/267/269) | 250.67 (15), P67, **+7.8%** | 237.84 (6), P67, +13.7% | 227-267 | **-21% to -7%** |
| 30 Nov-4 Dec | 261.50 (241) | 267/297/299/307 | 242.75 (15), P60, +7.7% | 243.75 (5), P60, +7.3% | 231-272 | -21% to -7% |
| 1-3 Dec (trend) | 290.50 (268) | 297/299 | 246.50 (10), **P90, +17.8%** | 245.75 (4), P100, +18.2% | 215-253 | -28% to -15% |
| 2-4 Dec | 294.50 (271) | 299/307 | 240.50 (11), **P91, +22.5%** | 254 (3), P100, +15.9% | 210-247 | -31% to -18% |

- **7-14 Dec (sold at £204.63/n room):**
  - It is **-10.4% vs the band (P27)** and -15.7% vs the stored pair, which is **inside the -15% to 0% the quality supports**. With any Booking.com cleaning fee added, it sits closer to the band median.
  - The sale **ends the 7-10 / 7-11 / 11-14 Dec trims in a-p12-trim**. They were proposed at -5% to -7%, and the actual sale came in about 28% under PriceLabs through the Booking.com stack.
  - The comp evidence does **not** say the week was given away. The stack size is for the channel agent.
- **17-19 Nov: trim about -10% (room about £240-245 vs 269/270).**
  - It is +13% vs the band (P78), the same as yesterday.
  - The 3- and 4-night stays (17-20 Nov +0.7%, 17-21 Nov -2.2%) are in range. A trim on 17-18 Nov alone fixes the 2-night stays.
- **26 Nov: room about £205-240, keep min 1.** It is £303 / £357 all-in: P100, +26.6% vs the band (n = 5), NL >P90. **t-p12-26nov-price not fixed.**
- **30 Nov-3 Dec: about -10% (room about £260 avg vs 287.7).**
  - Today's algorithm rise took the stay from +5.5% to **+7.8% vs the band**. 1-3 / 2-4 Dec went to +18% / +23% (P90-P91), and NL went from P83 to >P90.
  - A -10% move roughly reverses today's rise. Reyhan's +5% (30 Nov-3 Dec) is not supported.
- **Hold:** 17-20 Nov (3 n) and 17-21 Nov (4 n).
- **`recommend`:**
  - 30-day window (15 Nov-14 Dec): comp P67 over 9 stays, booked 68% vs market 44%, gives a mechanical **raise +10%**. NL P89 gives **raise +5%**.
  - **Not adopted.** The occupancy lead comes from nights already sold, including the 7-14 Dec week at -10% vs the band. The nine nights still open are +8% to +27% above the band, against a quality ceiling of 0%. The raise branch of `recommend` ignores a negative `quality_premium`.
  - 60-day window: no sellable night (handback).

## Priority 3: P01 Bowsprit Point 18-20 Dec (blocked, before the 20 Dec handback)
- **Still blocked:** the 15 Nov raw (refreshed 04:36Z) shows 18-20 Dec `Blocked` at 269/268/237, min 3. Our listing was not returned for 18-21 Dec. There was no PriceLabs edit. `reservations.csv` holds a **cancelled** Airbnb stay on 18-21 Dec (booked 19 Oct). **t-p01-1820block: not fixed.**
- **Comps for 18-21 Dec (3 n, all-in):** stored median **£369.67** (n = 7, range 281-524), band median **£339.17** (n = 16). Both are unchanged from 14 Nov.
- **If reopened** at 269/268/237 (£774; NL P46) plus £149 cleaning, it would be **£307.67/n before any Airbnb guest fee**. That is **P14 of the stored set (-16.8%) and P25 of the band (-9.3%)**.
- **Supported: parity (0%).** `quality_premium` = 0.0, because 4.75 from 4 reviews is under the 5-review threshold (comp median 4.8 from 30). No cut is needed. Up to about +9% (band parity) is supported.
- **For Corentin to confirm (carried policy conflict):** policy `handbacks` says "before the date, maximise revenue normally", but the block holds about £774 of room nights.
- `recommend`: raise-signal (booked 100% vs market 36%, no open night).

## Priority 4: P09 Torrent Lodge
- **No open night before the 26 Nov handback.** 15-27 Nov is booked (`reservations.csv`), and from 27 Nov it is the handback block. Nothing to position.
- Comp level for reference: 2-night median £162.50-166 (17-22 Nov).
- `quality_premium` 0.0 (5.0 from 3 reviews; comp median 4.56). `recommend`: raise-signal.

## Summary per property
| Ref | Ours | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market | `recommend` 30 / 60 | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (18-20 Dec blocked) | stored 282-400 (n 2-7); 18-21 Dec 369.67 (7) | n/a (would be P14 stored / P25 band) | 4.75 vs 4.8 | 4 vs 30 (-26) | 0.0 (<5 reviews) | 100% / 100% vs 36% / 29% | raise-signal | **parity** if reopened (today's price is -9% to -17%, which is supported) |
| P04 (synced 1657...) | sold 20-24 Nov 157.90 all-in; open 141.43-217.67 | stored 186.79-241.34 (n 2-5); band 181-240 (n 5-9) | P0-P25 stored; P12-P33 band | **4.2** vs 4.83 | 10 vs 27 (-17) | -0.15 | 64% / 71% (Smoobu) vs 24% / 20% | raise +10% / raise +10%; NL P40 / P54 | **-15%.** 20-24 Nov sold at -25% to -34% (about £22-39/n under, through the Airbnb ~0.77 layer). 18-19 Nov: hold. **6-13 Dec: +10%; 14-17 Dec: +5%**; 17-20 Dec: hold |
| P04 unsynced 1455... | 170-231.67, bookable on all 11 runs incl. **sold 20-24 Nov** | | | 4.69 | 26 | n/a | | | map or unlist |
| P09 | no sellable night | 162.50-248.50 | n/a | 5.0 vs 4.56 | 3 vs 25 (-22) | 0.0 | 100% vs 40% | raise-signal | nothing to position before the handback |
| P12 | sold 7-14 Dec room 204.63; open 251.75-357 | band 228.29-282; stored 225-292.50 | sold P27; open P43-P100 (median P67) | 4.27 vs 4.86 | 15 vs 19 (-4) | -0.15 | 68% vs 44% | mechanical raise +10% (P67, 9 stays), NL raise +5% (P89): **not adopted** | **-15% to 0% vs band.** 7-14 Dec sale in range (-10%). **17-19 Nov -10%; 26 Nov -21% to -33%; 30 Nov-3 Dec about -10%.** Hold the 3-4 night 17-21 Nov runs |
| P15 | no listing of ours | 135.25-173.25 (n 2-6) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 15 Nov)
| Item | Status |
|---|---|
| t-p04-doublebook | **Not fixed** (day 16). **1455 is bookable on 20-24 Nov, the nights just sold on 1657.** |
| t-pl-sync (P04) | PriceLabs still shows 20-24 Nov open (raw refreshed 14 Nov 08:42Z). |
| P04 min-3 rule | **New conflict:** Airbnb sells 18-20 Nov as 2 nights (£390). For Corentin. |
| P04 -5% (Reyhan, 18-24 Nov / 6-22 Dec) | November: now moot except 18-19 Nov (in range). **6-13 Dec: +10% supported; 14-17 Dec: +5%.** |
| a-p12-trim | **7-10 / 7-11 / 11-14 Dec closed by the 7-14 Dec sale.** Open: 17-19 Nov (+13%), 26 Nov (+27%), **30 Nov-3 Dec (worse today: +8%, 1-3 Dec +18%)**. |
| t-p12-26nov-price | **Not fixed.** £303 room / £357 all-in, P100. |
| t-p01-1820block | **Not fixed** (still `Blocked`). For Corentin. |
| Push freshness | P12 15 Nov 05:48:42Z; P01 15 Nov 04:36:05Z; P04 14 Nov 08:42:40Z (raw `last_refreshed_at`). |

## Critical / high findings
- **CRITICAL: P04 unsynced Airbnb 1455876748739910219 is bookable on 20-24 Nov (£680), the nights sold on the synced listing on 14 Nov.** It is also open on all 10 other open runs. A booking there would not reach Smoobu (day 16).
- **HIGH: P04 20-24 Nov sold at £122.40/n room (£157.90 all-in), -25% to -34% vs comps.** That is about 10-19 points below the -15% that quality supports, or about £87-155 over the stay. The PriceLabs price was inside the supported range. The gap is the Airbnb-side ~0.77 factor (0.765 of PriceLabs 15 Nov / 0.795 of 14 Nov), which is for the channel agent.
- **HIGH (for Corentin to confirm): Airbnb sells P04 18-20 Nov as a 2-night stay (£390)**, against the policy "never fewer than 3 nights". PriceLabs min is 3.
- **HIGH: P04 6-14 Dec is -17% to -26% vs comps.** 14 Dec was cut another 11% today by the algorithm (likely the 30-day recency factor). **+10% (6-13 Dec) and +5% (14-17 Dec) are supported.**
- **HIGH (for Corentin to confirm): P01 18-20 Dec is still blocked.** Comps support today's price at parity or above: £307.67/n is -9% to -17% vs comps. The block holds about £774.
- **MEDIUM: P12 30 Nov-3 Dec rose about 11% overnight with no edit** (267/297/299/307). It is now +8% vs the band, and 1-3 Dec is +18% (P90). About -10% is supported.
- **MEDIUM: P12 17-19 Nov is +13% (P78)**, about -10% supported. **P12 26 Nov is +27% (P100)**, supported room about £205-240.
- **MEDIUM: the P12 7-14 Dec Booking.com sale is -10.4% vs the band.** That is inside the supported range. The paid rate is 0.720 x PriceLabs and 0.770 x the expected price after markup and weekly discount. The 16.6% commission is not covered by a booster in policy. Both are for the channel agent.

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-15.
- "14 Nov x" = the same comp and stay on 14 Nov, where the two differ by more than £1.
- `*` = found by the 0.3 km second pass.
- Full source for every row: `data/snapshots/2026-11-15/comps.csv` (`comp-east`, `east-refband`, `east-ours`).
- Cancellation policy: NOT CHECKED.
- "not bookable on any stay today" for P04 1387112821878102742 means booked through December. It is bookable in January.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 15 Dec-17 Dec | 18 Dec-21 Dec | 18 Dec-20 Dec | 19 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 320 | – | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | – | 382 (14 Nov 372) | 378.33 (14 Nov 376.33) | 355 | 455 (14 Nov 459) | 329 | 304 | 282 | 282 | 339 (14 Nov 334) | 332 (14 Nov 327) | 262 (14 Nov 270) | 267 (14 Nov 275) | 285 | 316.33 (14 Nov 319) | 332 (14 Nov 329) | 325 (14 Nov 334) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.45 (159) | none listed | – | – | 180 | 190 | – | 198 | 199 | 204 | – | – | – | – | 208 | 208 | – | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (57) | Lift | – | – | 323.33 (14 Nov 327.33) | – | – | – | – | – | – | – | – | – | – | – | 384.67 (14 Nov 380.67) | – | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.6 (30) | Lift/River view/balcony | – | – | 255 | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – | – | – | – | – | – | – | – | – | – | – | 382.67 | – | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | – | 390 | – | – | 385.50 | – | – | – | – | 392.50 (14 Nov 382) | 382 (14 Nov 371.50) | 371.50 | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | 322.50 | 305.67 | 328 | 345 | – | – | – | – | 386 | 363.50 | 341 | 341 | 341 | 369.67 | 376 | 366.50 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.82 (17) | Lift | – | – | – | 280 | – | 335 | 335 | – | – | – | – | – | – | 335 | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (43) | Lift/Private patio or balcony/Superhost/Guest favourite (added 4 Nov, replaces inactive 20404597) | – | – | – | – | – | 405.50 | 405.50 | 405.50 | 439 | – | – | 472 | 472 | 472 | 524 | 528 | 534 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – | – | – | – | – | – | – | – | – | – | – | 281 | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.8 (30) | | n/a (0) | **352.25** (2) | **305.67** (7) | **328** (5) | **400** (2) | **332** (4) | **335** (5) | **282** (3) | **360.50** (2) | **362.50** (2) | **347.75** (2) | **366.75** (4) | **341** (5) | **338** (6) | **369.67** (7) | **376** (3) | **366.50** (3) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.2 (10); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 15 Dec-17 Dec | 18 Nov-20 Nov | 18 Nov-21 Nov | 20 Nov-24 Nov | 20 Nov-23 Nov | 21 Nov-24 Nov | 22 Nov-25 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | 257.67 | – | – | – | – | – | – | – | – | – | – | – | – | 257.67 | 254 | 257.67 | 257.67 | 257.67 | – | – | – | 260 | 260* | – |
| [985683261536682900](https://www.airbnb.co.uk/rooms/985683261536682900) | 0.61 | 5 | 4.82 (17) | Paid street parking off premises/Superhost (added 15 Nov, replaces inactive 1083936003491396261) | 225 | 225 | 225 | – | 225 | – | – | – | – | – | – | – | – | – | 225 | 225 | 225 | 225 | 225 | 225 | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (28) | Free parking on premises/Superhost/Guest favourite | – | – | 140 (14 Nov 144.33) | – | – | – | – | – | – | – | – | – | – | 152.50 | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.76 (41) | Free parking on premises/Superhost (added 30 Oct) | – | – | 248.33 | – | – | 250 | 250 | 250 | 250 | – | – | – | 262.50 (14 Nov 250) | 250 | – | – | – | – | – | 248.33* | 273.33 | 248.33 | – | 256.67 (14 Nov 248.33) | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | 222 | 222 | – | 222 | – | 222 | 222 | 222 | 222 | 222 | 222 | 222* | 222 | 222 | 222 | 222 | – | – | – | – | 222 | 222 | 222 | 222* | 222 | 207 |
| [1387112821878102742 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 | 6 | 4.85 (27) | Parking (in name) (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (16) | Free on-street parking/Superhost | – | – | 183.33 | 210 | – | 217 | 217 | 217 | 222 | 227 | 220 | 213 | 213 | 213 | – | – | – | – | – | 183.33 | 198.67 | 203.67 | 205.67 | 196.33 | – | 166.57 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **195** | not bookable | not bookable | not bookable | not bookable | not bookable | **170.67** | **173.33** | **176.67** | **200.33** | **217.67** | **141.43** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | 190.33 | 170 | 180.67 | 179.67 | 177 | 187.33 | 200.67 | 227 | 219.67 | 231.67 | 184.43 |
| **Comp median (n)** | | | 4.83 (27) | | **223.50** (2) | **223.50** (2) | **225** (5) | **216** (2) | **225** (1) | **222** (3) | **222** (3) | **222** (3) | **222** (3) | **224.50** (2) | **221** (2) | **217.50** (2) | **222** (3) | **217.50** (4) | **223.50** (2) | **225** (3) | **239.50** (2) | **241.34** (2) | **241.34** (2) | **236.67** (4) | **222** (3) | **222** (3) | **213.83** (2) | **239.34** (4) | **241** (2) | **186.78** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | – | – | P0 (-12.8%) | – | – | – | – | – | P0 (-23.1%) | P0 (-21.9%) | P0 (-17.4%) | P25 (-16.3%) | P0 (-9.7%) | P0 (-24.3%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 15 Dec-17 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 164 | 166 (14 Nov 164) | – | – | – | 164 | 164 | 164 | 164 | 164 | 164 | 164 | 164 | 164 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 161 | 161 | – | – | – | 161 | 161 | 161 | 161 | 161 | 161 | 161 | 161 (14 Nov 162.50) | 161 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.7 (23) | none listed | – | – | – | 141 | – | 188 | 186.50* | – | – | – | – | 171 (14 Nov 173) | 171 (14 Nov 169) | 174.50 |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | – | 200.50 | 196.67 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | – | – | 200.50 (14 Nov 202.50) | – | – | – | – | – | – | – | 196.50 (14 Nov 198) | 208 (14 Nov 210) | 209.50 |
| [958156921765583815 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.56 (25.0) | | **162.50** (2) | **166** (3) | **196.67** (1) | **200.50** (3) | **248.50** (1) | **176** (4) | **175.25** (4) | **164** (3) | **164** (3) | **164** (3) | **164** (3) | **171** (5) | **171** (5) | **174.50** (5) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 15 Dec-17 Dec | 17 Nov-20 Nov | 18 Nov-20 Nov | 17 Nov-21 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 2 Dec-4 Dec | 7 Dec-10 Dec | 7 Dec-11 Dec | 11 Dec-14 Dec | 7 Dec-14 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.50 | 237.50 | 225 | 237.50 | – | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 225 | 237.50 | 218.75 | – | 225 | – | – | 225 | 218.75 | 225 | 200.71 |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking on premises | – | – | 256 | – | – | – | – | – | – | – | – | – | – | – | 258.67 | – | 257.50 | – | 316.67 | 312.50 | – | – | – | 352 | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (79) | Superhost | – | – | 183 (14 Nov 199.67) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 198 (14 Nov 202) | 205 (14 Nov 208.75) | – | – | – | 281 (14 Nov 232.67) | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.94 (16) | Superhost/Guest favourite | – | – | 185 | 220 | – | 220 | 220 | 220 | – | – | – | 215 | – | – | – | – | – | – | 208.33 | 211.25 | 220 | 220 | 220 | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (120) | Superhost/balcony/Guest favourite | 254 | – | 250.67 | 254 | – | – | – | – | – | – | – | – | – | – | 250.67 | 254 | 247.75 | 284 | 250.67 | 243.75 | 254 | – | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | 1035 | 1035 | 1032.33 | 1035 | 1035 | 1035 (14 Nov 1051.50) | 1045 (14 Nov 1035) | 1045 (14 Nov 1035) | 1035 | 1035 | 1035 | 1035 | 1037.50 (14 Nov 1035) | 1037.50 | 1032.33 (14 Nov 1034) | 1035 (14 Nov 1037.50) | 1031 (14 Nov 1032.25) | 1043 | 1032.33 (14 Nov 1043) | 1031 (14 Nov 1039) | 1035 | 1039 (14 Nov 1043.33) | 1036 (14 Nov 1039.25) | 1032.33 | 881.71 (14 Nov 883.43) |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | 282 | – | 282 | 282 | – | 288.50 | 283.50 | 285 | 299 (14 Nov 297.50) | 312.50 (14 Nov 310) | 301 (14 Nov 299.50) | 284.50 | 282 (14 Nov 293) | 293 | 282 | 282 | 282 | 282 | 282 | 285 | 288 | 286.33 | 286.75 | 304 (14 Nov 302.67) | 284.86 |
| **Ours** | | | | | **269** | not bookable | not bookable | **290.50** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **256.33** | **269.50** | **251.75** | **357** | **270.33** | **261.50** | **294.50** | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.86 (19) | | **254** (3) | **237.50** (1) | **237.83** (6) | **245.75** (4) | n/a (0) | **237.50** (3) | **237.50** (3) | **237.50** (3) | **268.25** (2) | **275** (2) | **269.25** (2) | **237.50** (3) | **259.75** (2) | **265.25** (2) | **254.67** (4) | **254** (3) | **252.62** (4) | **283** (2) | **237.83** (6) | **243.75** (5) | **254** (3) | **225** (3) | **220** (3) | **292.50** (4) | **242.79** (2) |
| **Our pctl (vs median)** | | | | | P67 (+5.9%) | – | – | P100 (+18.2%) | – | – | – | – | – | – | – | – | – | – | P50 (+0.7%) | P67 (+6.1%) | P50 (-0.3%) | P100 (+26.1%) | P67 (+13.7%) | P60 (+7.3%) | P100 (+15.9%) | – | – | – | – |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 15 Dec-17 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | – | 170.50 | – | 170.50 | 170.50* | 170.50 | 183* | 195.50 | 183 | 170.50 | 170.50 (14 Nov 190) | 190 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | – | – | – | – | – | – | – | – | – | – | – | – | – | 179 |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | 135* | – | 135* | 135 | – | 135 | 135 | 135 | 147.50 | 160 | 147.50 | 135 | 135 | 135 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | 159.67* | – | – | – | – | 167.50 | 167.50 (14 Nov 169) | 167.50 (14 Nov 170.50) | 167.50 (14 Nov 170.50) | 167.50 (14 Nov 170.50) | 167.50* (14 Nov 170.50) | 167.50 |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.92 (25) | Free parking on premises/Guest favourite | – | – | – | 181 | – | 181 | – | – | – | – | – | – | 181 | 181* |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (202) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | 135.50 | – | – | 140.50 | – | – | – | – | – | – | – | 145.50 | 140.50 | 140.50 |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | 146.67* | – | – | – | – | – | – | – | – | – | – | – |
| **Comp median (n)** | | | 4.84 (14) | | **135.25** (2) | n/a (0) | **146.67** (3) | **155.50** (4) | n/a (0) | **170.50** (3) | **152.75** (2) | **167.50** (3) | **167.50** (3) | **167.50** (3) | **167.50** (3) | **156.50** (4) | **167.50** (5) | **173.25** (6) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings (Airbnb only).
  - The P12 7-14 Dec Booking.com cleaning fee is NOT CHECKED, so the £204.63 room rate is a floor for what the guest paid all-in.
  - Mile End Visibility Booster status (16.6% commission): NOT CHECKED. It is not in policy, so it is for the channel agent to ask.
- Comp cancellation policies and band-listing sleeps: NOT CHECKED. Lift, view and parking come from listing-page reads on 25 Oct-15 Nov.
- **Smoobu was not called.** Smoobu prices come from `prices.csv` 15 Nov and stays from `reservations.csv` 15 Nov.
- **P04:**
  - The cause of the ~0.77 Airbnb factor on the 20-24 Nov sale is NOT CHECKED (channel agent).
  - The exact booking time is unknown, so the ratio is given against both the 14 Nov and 15 Nov PriceLabs prices.
  - Why Airbnb accepts a 2-night stay on 18-20 Nov despite min 3 in PriceLabs is NOT CHECKED (the Smoobu/Airbnb min-stay setting was not read).
  - Stored n is 2-5 per stay. Band n is 5-9, with a 5-unit operator (shown both ways).
- **Recency-factor cause** of the P04 6-14 Dec cuts: NOT VERIFIED. The 14 Dec cut at the moving 30-day edge supports it. This is for the PriceLabs auditor.
- **P12:**
  - The cause of the 30 Nov-3 Dec uncustomized jump is NOT VERIFIED.
  - The 26-27 Nov band is n = 5. No stored comp was returned for 4-6 Dec.
  - Room targets are approximate (ratio method; cleaning is a fixed fee).
- **Inactive checks:**
  - P04 1083936003491396261 was dropped and replaced (sweep evidence in `comps.csv`).
  - P09 958156921765583815 was not returned again and was not swept (no P09 open night).
- **P01:** who set the 18-21 Dec block, and whether it relates to the cancelled 18-21 Dec Airbnb stay: NOT CHECKED. The if-reopened all-in is estimated (room + £149 cleaning, Airbnb guest fee excluded).
- **NL percentiles:**
  - PriceLabs does not state the horizon or cleaning basis.
  - The first P12 and P01 `get_neighbourhood_data` calls failed; the retries succeeded.
- **P09:** NL not fetched (no open night).
