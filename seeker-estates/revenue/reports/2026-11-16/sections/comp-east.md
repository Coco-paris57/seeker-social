# Competitor positioning: EAST batch (D = 2026-11-16)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy `intentional_blocks`). Not analysed.
- **P15** has no listing of ours. Reference only.
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec, P09 26 Nov, P12 13 Dec).

**Method** (same as 26 Oct-15 Nov; scripts in the scratchpad `east16/bin`)
- **Comp ids:** same set as 15 Nov (`data/snapshots/2026-11-15/comps.csv`): P01 11, P04 7, P09 6, P12 7, P15 7. **No comp replaced today.**
  - P04 1387112821878102742 is again not returned on any November-December stay. It is kept: the 15 Nov sweep showed it bookable on 7 of 10 January-February stays (booked, not inactive).
  - P09 958156921765583815 is again not returned on any stay. It is kept on earlier evidence; P09 has no open night before its 26 Nov handback, so it does not affect any positioning.
  - P12 29297702 still shows a placeholder-like price (about £1,031-1,045/n) and stays out of the medians.
- **Access:** public Airbnb pages (HTTP 200). 102 wide searches, then 545 comp/stay checks in a 0.3 km box (`*` in the tables). Box sizes: 2.5 km for P04, 1.8 km for P09, 1.3 km for the rest. 4 guests for 2BR, 3 for 1BR. **Booking.com: NOT CHECKED.**
- **Price basis = what guests see:** the Airbnb **guest-paid all-in total / nights** (after discounts, cleaning and Airbnb fees **included**; no separate taxes shown). Ours are priced the same way. PriceLabs, Smoobu and `reservations.csv` figures are **room only, cleaning excluded** (Airbnb cleaning: P12 £150, P04 £142, P01 £149, `reservations.csv` cleaning_gbp).
- **Stays (same dates for comps and us):**
  - Default stays: next Fri-Sun **20-22 Nov**, midweek Tue-Thu **17-19 Nov**, 30 days out **16-18 Dec (new today)**.
  - Trend stays: 24-27 Nov, 1-3, 4-6, 7-9, 8-10, 9-11, 10-12, 11-13, 12-14, 13-15, 14-16 and 15-17 Dec.
  - Key-date stays: P01 18-21, 18-20 and 19-21 Dec. P04 **18-20 Nov**, **24-25 Nov (new: the 1-night orphan)**, 18-21, 20-24 (sold), 20-23, 21-24 and 22-25 Nov, and the 6-20 Dec runs. P12 17-20, 18-20 and 17-21 Nov; 26-27 Nov; 30 Nov-3 Dec, 30 Nov-4 Dec and 2-4 Dec; 7-14 Dec (sold) and its sub-runs.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius, excluding ours. The P04 band is also shown with the 5-unit 1531... operator collapsed to one listing.
- **Data written:** `data/snapshots/2026-11-16/comps.csv` did not exist. Under `flock` on `.comps.csv.lock` I copied 15 Nov forward (25,187 lines) and **appended 1,373 rows** (26,560 lines): 771 `comp-east` (every stored comp x stay, NOT RETURNED rows kept), 444 `east-refband`, 158 `east-ours` (Airbnb all-in rows for ours and the unsynced P04 listing, Smoobu room rows with the 16 Nov raw PriceLabs `price`/`user_price`/`uncustomized_price`, and the two sold stays). None of the `east-ours` or `east-refband` rows are comps.
- **PriceLabs (read-only, one call at a time):** `get_user_logs` (listing, 15-16 Nov): 25 entries, all Reyhan, 15 Nov 18:47-19:17Z (this batch: P04 and P12, below). `get_listing_date_overrides` P04 and P12: OK. `get_neighbourhood_data` P04, P12, P01: OK first try.
- **Smoobu: not called.** Smoobu prices from `prices.csv` (16 Nov), stays from `reservations.csv` (16 Nov). No new or cancelled stay in this batch overnight (full-row diff vs 15 Nov).

## What changed since 15 Nov (this batch)
**1. Reyhan edited P04 and P12 on 15 Nov evening (`get_user_logs`, confirmed in `get_listing_date_overrides`).**
- **P04 18-19 Nov: +10% override, min stay 2** (19:17:38Z; was -5%, min 3). PriceLabs `price` 155/158 -> **166/168** (raw 16 Nov, refreshed 15 Nov 19:20Z). The Smoobu manual rates of 15 Nov (175/165) are gone: Smoobu = PriceLabs = 166/168 (`prices.csv`). **The min stay 2 conflicts with policy `price_changes` 24 Oct P04 ("never open for fewer than 3"): for Corentin to confirm, not a new proposal.** Airbnb now sells 18-20 Nov at **£385 (£192.50/n all-in)**, down from £390 yesterday because the Smoobu rate fell from £340 to £334.
- **P12 17-20 Nov and 30 Nov-3 Dec: price adjustments removed, min stay 2 kept** (18:47Z). That ended Reyhan's +5% on 30 Nov-3 Dec. PriceLabs `price` 17-19 Nov 269/270/270 -> **259/255/265**, 20 Nov 311 -> 310, 30 Nov-3 Dec 267/297/299/307 -> **255/285/287/294** (-4%). This moves in the direction the comps supported yesterday, about half way.
- 26 Nov (+15%, min 1) is unchanged at £301 room.

**2. P04 sync: PriceLabs now shows 20-24 Nov as booked** (raw refreshed 15 Nov 19:20Z). The t-pl-sync item for P04 is closed.

**3. P04 unsynced listing 1455876748739910219 is still bookable on 20-24 Nov, now at £742** (yesterday £680), the nights sold on the synced listing on 14 Nov. Also open: 18-21 Nov £571, 20-23 £589, 21-24 £539, 22-25 £531, and all six December runs. **t-p04-doublebook: not fixed, day 17.**

**4. P04 December fell again with no edit** (no P04 December entry in `get_user_logs`). 6-13 Dec 163/160/160/160/162/171/173 -> **152/151/150/150/153/160/163** (-6%). **15 Dec 176 -> 148 (-16%)**, the night that is now 29 days out, the same 30-day-edge step seen on 14 Dec yesterday (fits the Booking Recency Factor; NOT VERIFIED, for the PriceLabs auditor). Uncustomized fell too (6 Dec 206 -> 195). December is now **-19% to -30% vs comps**.

**5. P04 24 Nov is a 1-night orphan** (between the 20-24 and 25 Nov-2 Dec stays). PriceLabs shows it open at £143, min 3; `prices.csv` has it unavailable; Airbnb does not return our listing for 24-25 Nov. Under the min-3 rule it cannot sell, so nothing is proposed. Comps for 24-25 Nov for reference: stored £250 (n = 2), band £230 (n = 6).

**6. P01 18-20 Dec is still `Blocked`** (raw refreshed 16 Nov 04:25Z) at 276/270/239 (was 269/268/237).

**7. Comp moves of £10 or more (same comp, same stay):** P12 1670196516322802487 24-27 Nov 185 -> 150; P12 1098554019818216597 24-27 Nov 256 -> 241.67, 17-20 Nov 258.67 -> 244.33, 17-21 Nov 257.50 -> 242.75; P12 1383544079404594066 15-17 Dec 293 -> 282; P01 1316210326145130709 24-27 Nov 323.33 -> 294.33; P01 1418178473526356202 14-16 / 15-17 Dec +£10.50; P04 1577633201778145138 6-9 Dec 273.33 -> 248.33 and 15-17 Dec 250 -> 262.50; P09 1376679869251315227 14-16 Dec 171 -> 158; P15 1617544963466664181 15-17 Dec 190 -> 170.50. 257 of 303 like-for-like comp/stay prices are within £1 of 15 Nov.

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 16 Nov)
Market bands, not comps. PriceLabs does not state their horizon or cleaning basis. "Ours" is the PriceLabs room `price` (`prices.csv` 16 Nov).

| Ref | 2BR band (n) | P25 / P50 / P75 / P90 today (15 Nov) | Market occ 30 / 60 (`pl_kpis.csv`) | Ours and NL percentile |
|---|---|---|---|---|
| P04 | 88 | 140 / 175 / 215 / 260 (141 / 178 / 216 / 264) | 24% / 19% | **Next 14 days (16-29 Nov):** only 18-19 Nov open, £166/168, **P44**. 24 Nov orphan £143 (P27, not sellable). **December 6-13 Dec** £154.1 **P35**; 14-15 Dec £146.5 **P30**; 16-19 Dec £185 P56; 6-19 Dec £161.6 P40 (P45 yesterday) |
| P12 | 118 | 172 / 207 / 232 / 291 (172 / 207 / 232 / 292) | 43% / 33% | **Next 14 days:** 17-19 Nov £259.7 **P82**; 20 Nov £310 **>P90**; 26 Nov £301 **>P90**. **30 Nov-3 Dec** £280.3 **P87** (>P90 yesterday) |
| P01 | 146 | 217 / 266 / 339 / 435 (216 / 266 / 338 / 434) | 35% / 28% | **18-20 Dec** (blocked): £261.7 (276/270/239) would be **P48** |

- `occ_insights`: P12 market 4-6 Dec +10.2%; P04 3-5 Dec +10.3%; 27/28 Dec-1 Jan +18.7% to +20.9%.
- `fp_insights`: 26/27-31 Dec surge P04 +9.8%, P12 +19.4%, P01 +28.1%.

## Priority 1: P04 Barking (18-19 Nov, 24 Nov, December)
- **Quality:** `quality_premium` = **-0.15** (cap). We are 4.2 from 10 reviews; comp median 4.83 from 27 (gap 17 reviews). **Supported position: -15% to 0% vs the comp/band median.**
- Overrides now: 16-17 Nov min 2; **18-19 Nov +10%, min 2 (new)**; 20-24 Nov -5% min 3 (booked); 25 Nov +15%; 26-30 Nov and 3-5 Dec -8%; 1 Dec -2%; 2 Dec +200% min 1; 6-22 Dec -5% min 3.

| Stay | Ours, Airbnb all-in £/n (15 Nov) | PriceLabs `price` = Smoobu | Stored median (n), pctl, vs | Band median all / operator once (n), vs | Pctl in band | Supported room £/n |
|---|---|---|---|---|---|---|
| **18-20 Nov (2 n)** | **192.50** (195) | **166/168** (155/158; Smoobu was 175/165) | 225 (1), P0, -14.4% | 225 (5) / 191 (op), -14.4% / +0.8% | P40 | 141-166 = **top of range** |
| 24-25 Nov (1 n orphan) | not bookable (min 3) | 143 | 250 (2) | 230 (6) / 225 | n/a | n/a (policy min 3) |
| **6-9 Dec** | 163 (170.67) | 152/151/150 | 222 (3), P0, **-26.6%** | 230 (8) / 222, **-29.1% / -26.6%** | P12 | **175-206** |
| **9-12 Dec** | 165.67 (173.33) | 150/153/160 | 222 (3), P0, -25.4% | 235 (7) / 222, -29.5% / -25.4% | P14 | **176-207** |
| 11-14 Dec | 168.33 (176.67) | 160/163/151 | 214 (2), P0, -21.3% | 222 (5) / 214.34, -24.2% / -21.5% | P0 | 171-201 |
| **14-17 Dec** | 182.67 (200.33) | **145/148**/179 (155/176/179) | 239.34 (4), P0, -23.7% | 226.33 (9) / 234, -19.3% / -21.9% | P11 | **171-202** |
| 17-20 Dec | 215.67 (217.67) | 181/187/193 | 241 (2), P0, -10.5% | 228 (8), -5.4% | P12 | 168-198 = in range |
| 6-13 Dec (7 n) | 134.14 (141.43) | 150-163 | 186.50 (2), P0, -28.1% | 181.22 (6) / 155.43, -26.0% / -13.7% | P0 | 152-179 |

"Supported room" = all-in median (operator-collapsed band) x 0.85-1.00, converted back to room with each stay's own all-in/room ratio. Approximate.

- **18-19 Nov:** £192.50/n all-in is -14% vs the band and at parity with the operator-collapsed band, i.e. at the **top of the supported range. Hold the price; do not go higher.** Only one stored comp is priced on these dates (n = 1), so this rests mainly on the band (n = 5). **The min stay 2 is the policy conflict above (Corentin).**
- **24 Nov:** orphan night, unsellable under the min-3 rule. Nothing proposed.
- **December, supported moves grew overnight because PriceLabs cut again while comps held** (like-for-like comp change 0.0% on every December stay):
  - **6-13 Dec: about +15%** (room about £172-188, roughly the 14-15 Nov level), up from +10% yesterday. All 3-night stays sit at -21% to -30%, below the -15% the rating supports.
  - **14-15 Dec: about +15%** (back to about £167-170 after the two 30-day-edge cuts). **16 Dec: about +5%.** The 14-17 Dec stay is -19% to -24%.
  - **17-19 Dec: hold** (-5% to -11%).
  - Removing Reyhan's -5% on 6-17 Dec covers about a third of it.
- **`recommend`:** 30-day window (16 Nov-15 Dec; Smoobu booked 56% vs market 24%): comp P0 over 6 stays gives **raise +10%**, NL P36 gives **raise +10%**. 60-day window (16-31 Dec; 75% vs 19%): comp P0 (1 stay) and NL P56 give **raise +10%**. **Adopted for 6-16 Dec** at the larger size above, because the comp gap (-21% to -30%) exceeds the formula step; 17-19 Dec hold.
- **For Corentin to confirm (standing-decision conflicts, not proposals):** P04 18-19 Nov min 2 vs the min-3 rule (new override 15 Nov); policy -8% on 1-25 Nov vs PriceLabs +10% on 18-19 Nov and -5% on 20-24 Nov; 16-17 Nov min 2 (booked, no exposure). 2 Dec (+200%, £383) is deprioritised in policy and not raised.

**Unsynced listing 1455876748739910219 (day 17):**

| Run | Price |
|---|---|
| **20-24 Nov (the nights sold on 1657)** | **£742** (15 Nov £680) |
| 18-21 Nov | £571 |
| 20-23 Nov | £589 (£542) |
| 21-24 Nov | £539 |
| 22-25 Nov | £531 |
| 6-9 Dec | £562 |
| 9-12 Dec | £564 (£602) |
| 11-14 Dec | £643 (£681) |
| 14-17 Dec | £659 |
| 17-20 Dec | £695 |
| 6-13 Dec | £1,291 |

## Priority 2: P12 Mile End (17-20 Nov, 26 Nov, 30 Nov-3 Dec)
- **Quality:** `quality_premium` = **-0.15** (cap). We are 4.27 from 15 reviews; stored-comp median 4.86 from 19 (gap 4). **Supported position: band median x 0.85-1.00 (-15% to 0%).**

| Stay | Ours, Airbnb all-in £/n (15 Nov) | PriceLabs `price` = Smoobu | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room | Move vs PriceLabs |
|---|---|---|---|---|---|---|
| **17-19 Nov** | **259.50** (269) | 259/255 (269/270) | 232 (8), **P75, +11.9%** | 254 (3), P67, +2.2% | 195-230 | **-24% to -11%** |
| 17-20 Nov (3 n) | 248.67 (256.33) | 259/255/265 | 244.33 (9), P56, +1.8% | 247.50 (4), P50, +0.5% | 217-255 | -16% to -2% (**in range**) |
| 18-20 Nov | 261.50 (269.50) | 255/265 | 237.50 (7), P71, +10.1% | 254 (3), P67, +3.0% | 201-236 | -23% to -9% |
| 17-21 Nov (4 n) | 246 (251.75) | 259/255/265/310 | 245.25 (6), P50, +0.3% | 242.75 (3), P67, +1.3% | 231-271 | -15% to 0% (**in range**) |
| **26-27 Nov (1 n)** | **356** (357) | **301** (+15%, min 1) | 282 (5), **P100, +26.2%** | 283 (2), P100, +25.8% | **203-238** | **-33% to -21%** |
| **30 Nov-3 Dec** | **261** (270.33) | **255/285/287** (267/297/299) | 238.33 (15), P67, **+9.5%** | 237.84 (6), P67, +9.7% | 214-252 | **-22% to -9%** |
| 30 Nov-4 Dec | 252 (261.50) | 255/285/287/294 | 230 (15), P67, +9.6% | 243.75 (5), P60, +3.4% | 217-256 | -22% to -9% |
| 1-3 Dec (trend) | 281.50 (290.50) | 285/287 | 245.75 (10), **P80, +14.5%** | 245.75 (4), P75, +14.5% | 212-250 | -26% to -13% |
| 2-4 Dec | 285 (294.50) | 287/294 | 240.50 (11), **P73, +18.5%** | 254 (3), P67, +12.2% | 208-245 | -28% to -16% |

- **Reyhan's removal of the adjustments (-4%) went the right way but covers about half of the gap.**
- **17-18 Nov: trim a further about -8% (room about £235-240).** 17-19 Nov is still +12% vs the band (P75). The 3- and 4-night stays (+1.8%, +0.3%) are in range; a trim on 17-18 Nov alone fixes the 2-night stays. 17 Nov is tomorrow, so this is the last chance.
- **26 Nov: room about £205-240, keep min 1.** £301 / £356 all-in is P100, +26% vs the band (n = 5), NL >P90. **t-p12-26nov-price not fixed.**
- **30 Nov-3 Dec: a further about -6% (room about £255-260 avg vs 280.3).** It is +9.5% vs the band, 1-3 Dec +14.5% (P80), 2-4 Dec +18.5%; NL P87.
- **Hold:** 17-20 Nov (3 n) and 17-21 Nov (4 n).
- **`recommend`:** 30-day window (16 Nov-15 Dec): comp P67 over 9 stays, booked 67% vs market 43%, gives a mechanical **raise +10%**; NL P87 gives **raise +5%**. **Not adopted:** the occupancy lead comes from nights already sold; the 1- and 2-night stays on the open nights are +10% to +26% above the band (3-4 night stays +0% to +2%) against a quality ceiling of 0%, and the raise branch of `recommend` ignores a negative `quality_premium`. 60-day window: no sellable night (handback).

## Priority 3: P01 Bowsprit Point 18-20 Dec (blocked, before the 20 Dec handback)
- **Still blocked:** 16 Nov raw (refreshed 04:25Z) shows 18-20 Dec `Blocked` at 276/270/239, min 3; Airbnb does not return our listing for 18-21 Dec; no P01 entry in `get_user_logs`. `reservations.csv` holds a **cancelled** Airbnb stay on 18-21 Dec (booked 19 Oct). **t-p01-1820block: not fixed.**
- **Comps for 18-21 Dec (3 n, all-in):** stored median **£369.67** (n = 7, range 281-524), band **£339.17** (n = 14). Unchanged from 15 Nov.
- **If reopened** at 276/270/239 (£785; NL P48) plus £149 cleaning = **£311.33/n before any Airbnb guest fee**: **P14 of the stored set (-15.8%)** and **P21 of the band (-8.2%)**.
- **Supported: parity (0%).** `quality_premium` = 0.0 (4.75 from 4 reviews is under the 5-review threshold; comp median 4.8 from 30). Today's price is already below the comp median, so no cut is needed; up to about +8% (band parity) is supported.
- **For Corentin to confirm (carried policy conflict):** policy `handbacks` says "before the date, maximise revenue normally", but the block holds about £785 of room nights.
- `recommend`: raise-signal (booked 100% vs market 35%, no open night).

## Priority 4: P09 Torrent Lodge
- **No open night before the 26 Nov handback** (15-27 Nov booked in `reservations.csv`, handback block from 27 Nov). Nothing to position.
- Comp level for reference: 2-night median £162.50-166 (17-22 Nov). `quality_premium` 0.0 (5.0 from 3 reviews; comp median 4.56). `recommend`: raise-signal.

## Summary per property
| Ref | Ours | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market | `recommend` 30 / 60 | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (18-20 Dec blocked) | stored 282-452 (n 1-7); 18-21 Dec 369.67 (7) | n/a (would be P14 stored / P21 band) | 4.75 vs 4.8 | 4 vs 30 (-26) | 0.0 (<5 reviews) | 100% / 100% vs 35% / 28% | raise-signal | **parity** if reopened (today's price is -8% to -16%, supported) |
| P04 (synced 1657...) | 18-20 Nov 192.50 all-in; Dec 134.14-215.67 | stored 186.50-241.34 (n 1-4); band 181-235 (n 5-9) | P0 stored; P0-P40 band | **4.2** vs 4.83 | 10 vs 27 (-17) | -0.15 | 56% / 75% (Smoobu) vs 24% / 19% | raise +10% / raise +10%; NL P36 / P56 | **-15% to 0%.** 18-19 Nov: hold (top of range). **6-15 Dec: about +15%; 16 Dec +5%**; 17-19 Dec hold. 24 Nov orphan: none (min 3) |
| P04 unsynced 1455... | 177-231.67, bookable on all 11 runs incl. **sold 20-24 Nov (£742)** | | | 4.69 | 26 | n/a | | | map or unlist |
| P09 | no sellable night | 162.50-248.50 | n/a | 5.0 vs 4.56 | 3 vs 25 (-22) | 0.0 | 100% vs 40% | raise-signal | nothing to position before the handback |
| P12 | open 246-356 all-in | band 230-282; stored 237.84-283 | P50-P100 (median P67) | 4.27 vs 4.86 | 15 vs 19 (-4) | -0.15 | 67% vs 43% | mechanical raise +10% (P67, 9 stays), NL raise +5% (P87): **not adopted** | **-15% to 0% vs band.** **17-18 Nov a further -8%; 26 Nov -21% to -33%; 30 Nov-3 Dec a further -6%.** Hold 3-4 night 17-21 Nov |
| P15 | no listing of ours | 132-181 (n 1-6) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 16 Nov)
| Item | Status |
|---|---|
| t-p04-doublebook | **Not fixed** (day 17). 1455 bookable on 20-24 Nov at £742. |
| t-pl-sync (P04) | **Closed:** PriceLabs shows 20-24 Nov booked (refreshed 15 Nov 19:20Z). |
| t-smoobu-manual-1415 (P04) | **Overwritten:** Smoobu 18-19 Nov = PriceLabs 166/168 (was 175/165). |
| P04 min-3 rule | **Conflict now in PriceLabs:** 18-19 Nov min 2 set by Reyhan 15 Nov 19:17Z. For Corentin. |
| P04 December | **Worse:** -6% overnight, 15 Dec -16%. Supported about +15% on 6-15 Dec, +5% on 16 Dec. |
| a-p12-trim | Partly done by Reyhan (-4% on 17-20 Nov and 30 Nov-3 Dec). Still open: 17-18 Nov a further -8%, 30 Nov-3 Dec a further -6%. |
| t-p12-26nov-price | **Not fixed.** £301 room / £356 all-in, P100. |
| t-p01-1820block | **Not fixed** (still `Blocked`). For Corentin. |
| Push freshness | P01 16 Nov 04:25:34Z; P12 15 Nov 18:48:08Z; P04 15 Nov 19:20:15Z (raw `last_refreshed_at`). |

## Critical / high findings
- **CRITICAL: P04 unsynced Airbnb 1455876748739910219 is bookable on 20-24 Nov (£742), the nights already sold on the synced listing.** It is open on all 11 runs checked. A booking there would not reach Smoobu (day 17).
- **HIGH (for Corentin to confirm): P04 18-19 Nov min stay 2 (Reyhan, 15 Nov 19:17Z)** against the policy "never fewer than 3 nights". Airbnb sells 18-20 Nov at £385. The price itself (+10%) is at the top of the supported range.
- **HIGH: P04 6-16 Dec is -19% to -30% vs comps after another PriceLabs cut** (6-13 Dec -6%, 15 Dec -16% at the 30-day edge, no edit). **About +15% (6-15 Dec) and +5% (16 Dec) are supported.**
- **HIGH (for Corentin to confirm): P01 18-20 Dec still blocked.** Reopened at today's price it would be -8% to -16% vs comps (parity supported); about £785 room held.
- **MEDIUM: P12 17-19 Nov still +12% vs the band (P75) and 30 Nov-3 Dec +9.5% (1-3 Dec +14.5%)** after Reyhan's -4%. About -8% and -6% more are supported. **P12 26 Nov is +26% (P100)**; supported room about £205-240.

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-16.
- "15 Nov x" = the same comp and stay on 15 Nov, where the two differ by more than £1.
- `*` = found by the 0.3 km second pass.
- Full source for every row: `data/snapshots/2026-11-16/comps.csv` (`comp-east`, `east-refband`, `east-ours`).
- Cancellation policy: NOT CHECKED.
- "not bookable on any stay today" for P04 1387112821878102742 means booked through December (bookable in January, 15 Nov sweep).

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 15 Dec-17 Dec | 16 Dec-18 Dec | 18 Dec-21 Dec | 18 Dec-20 Dec | 19 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 320 | – | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | – | 387 (15 Nov 382) | 378.33 | 355 | 452 (15 Nov 455) | 324 (15 Nov 329) | 299 (15 Nov 304) | 282 | 282 | 339 | 332 | 262 | 267 | 285 | 267 | 319.67 (15 Nov 316.33) | 332 | 330 (15 Nov 325) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.45 (159) | none listed | – | – | 179.33 | 190 | – | 198 | 199 | 204 | – | – | – | – | 208 | 208 | 208 | – | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (57) | Lift | – | – | 294.33 (15 Nov 323.33) | – | – | – | – | – | – | – | – | – | – | – | – | 378 (15 Nov 384.67) | – | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.6 (30) | Lift/River view/balcony | – | – | 255 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – | – | – | – | – | – | – | – | – | – | – | – | 382.67 | – | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | – | 390 | – | – | 385.50 | – | – | – | – | 392.50 | 392.50 (15 Nov 382) | 382 (15 Nov 371.50) | 371.50 | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | 305.67 | 328 | – | – | – | – | – | 386 | 363.50 | 341 | 341 | 341 | 341 | 369.67 | 376 | 366.50 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.82 (17) | Lift | – | – | – | 280 | – | 335 | 335 | – | – | – | – | – | – | 335 | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (43) | Lift/Private patio or balcony/Superhost/Guest favourite (added 4 Nov, replaces inactive 20404597) | – | – | – | – | – | 405.50* | 405.50* | 405.50 | 439 | – | – | 472 | 472 | 472 | 472 | 524 | 528 | 534 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – | – | – | – | – | – | – | – | – | – | – | – | 281 | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.8 (30) | | n/a (0) | **387** (1) | **294.33** (7) | **328** (5) | **452** (1) | **329.50** (4) | **335** (5) | **282** (3) | **360.50** (2) | **362.50** (2) | **347.75** (2) | **366.75** (4) | **341** (5) | **338** (6) | **341** (5) | **369.67** (7) | **376** (3) | **366.50** (3) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.2 (10); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 15 Dec-17 Dec | 16 Dec-18 Dec | 18 Nov-20 Nov | 24 Nov-25 Nov | 18 Nov-21 Nov | 20 Nov-24 Nov | 20 Nov-23 Nov | 21 Nov-24 Nov | 22 Nov-25 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | 257.67 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 257.67 | 254 | 257.67 | 257.67 | 257.67 | – | – | – | 259.33 | 260 | – |
| [985683261536682900](https://www.airbnb.co.uk/rooms/985683261536682900) | 0.61 | 5 | 4.82 (17) | Paid street parking off premises/Superhost (added 15 Nov, replaces inactive 1083936003491396261) | 225 | 225 | 225 | – | 225 | – | – | – | – | – | – | – | – | – | – | 225 | 225 | 225 | 225 | 225 | 225 | 225 | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (28) | Free parking on premises/Superhost/Guest favourite | – | – | 138.67 (15 Nov 140) | – | – | – | – | – | – | – | – | – | – | 146.50 (15 Nov 152.50) | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.76 (41) | Free parking on premises/Superhost (added 30 Oct) | – | – | 248.33* | – | – | 250 | 250 | 250 | 250 | – | – | – | 262.50 | 262.50 (15 Nov 250) | 250 | – | 275 | – | – | – | – | 248.33 | 248.33 (15 Nov 273.33) | 248.33 | – | 256.67 | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | – | – | – | 222 | – | 222 | 222 | 222 | 222 | 222 | 222 | 222 | 222 | 222 | 222 | – | – | – | – | – | – | – | 222 | 222 | 222 | 222 | 222 | 207 |
| [1387112821878102742 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 | 6 | 4.85 (27) | Parking (in name) (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (17) | Free on-street parking/Superhost | – | – | 181.33 (15 Nov 183.33) | 210 | – | 216 | 216 | 216 | 221.50 | 227 | 220.50 | 214 | 214 | 214 | – | – | – | – | – | – | – | 181.33 (15 Nov 183.33) | 198 | 203 | 206 | 197.33 | – | 166 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **192.50** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **163** | **165.67** | **168.33** | **182.67** | **215.67** | **134.14** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | 190.33 | 185.50 | 196.33 | 179.67 | 177 | 187.33 | 188 | 214.33 | 219.67 | 231.67 | 184.43 |
| **Comp median (n)** | | | 4.83 (27) | | **225** (1) | **225** (1) | **225** (5) | **216** (2) | **225** (1) | **222** (3) | **222** (3) | **222** (3) | **222** (3) | **224.50** (2) | **221.25** (2) | **218** (2) | **222** (3) | **218** (4) | **236** (2) | **225** (1) | **250** (2) | **241.34** (2) | **239.50** (2) | **241.34** (2) | **241.34** (2) | **236.67** (4) | **222** (3) | **222** (3) | **214** (2) | **239.34** (4) | **241** (2) | **186.50** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | P0 (-14.4%) | – | – | – | – | – | – | P0 (-26.6%) | P0 (-25.4%) | P0 (-21.3%) | P0 (-23.7%) | P0 (-10.5%) | P0 (-28.1%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 15 Dec-17 Dec | 16 Dec-18 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 164 | 166 | – | – | – | 164 | 164 | 164 | 164 | 164 | 164 | 164 | 164 | 164 | 164 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 161 | 161 | – | – | – | 161 | 161 | 161 | 161 | 161 | 161 | 161 | 161 | 161 | 162 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.7 (23) | none listed | – | – | – | 140 | – | 180 (15 Nov 188) | 179 (15 Nov 186.50) | – | – | – | – | 163 (15 Nov 171) | 158* (15 Nov 171) | 165 (15 Nov 174.50) | 173.50 |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | – | 200.50 | 196.67* | 248.50 | 248.50 | 248.50* | 248.50 | 248.50 | 248.50 | 248.50 | 248.50* | 248.50 | 248.50 | 248.50 | 248.50 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | – | – | 202.50 (15 Nov 200.50) | – | – | – | – | – | – | – | 198 (15 Nov 196.50) | 209 | 210 | 207.50 |
| [958156921765583815 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.56 (25.0) | | **162.50** (2) | **166** (3) | **196.67** (1) | **202.50** (3) | **248.50** (1) | **172** (4) | **171.50** (4) | **164** (3) | **164** (3) | **164** (3) | **164** (3) | **164** (5) | **164** (5) | **165** (5) | **173.50** (5) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 15 Dec-17 Dec | 16 Dec-18 Dec | 17 Nov-20 Nov | 18 Nov-20 Nov | 17 Nov-21 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 2 Dec-4 Dec | 7 Dec-10 Dec | 7 Dec-11 Dec | 11 Dec-14 Dec | 7 Dec-14 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.50 | 237.50 | 225 | 237.50 | – | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 225 | 237.50 | 218.75 | – | 225 | – | – | 225 | 218.75 | 225 | 200.71 |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking on premises | – | – | 241.67 (15 Nov 256) | – | – | – | – | – | – | – | – | – | – | – | – | 244.33 (15 Nov 258.67) | – | 242.75 (15 Nov 257.50) | – | 316.67 | 312.50 | – | – | – | 352* | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (79) | Superhost | – | – | 184.67 (15 Nov 183) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 192.67 (15 Nov 198) | 199.50 (15 Nov 205) | – | – | – | 285 (15 Nov 281) | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.94 (16) | Superhost/Guest favourite | – | – | 150 (15 Nov 185) | 220 | – | 220 | 220 | 220 | – | – | – | 215 | – | – | – | – | – | – | – | 208.33 | 211.25 | 220 | 220 | 220 | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (121) | Superhost/balcony/Guest favourite | 254 | – | 250.67 | 254 | – | – | – | – | – | – | – | – | – | – | – | 250.67 | 254 | 247.75 | 284 | 250.67 | 243.75 | 254 | – | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | 1035 | 1035 | 1032.33 | 1035 | 1035 | 1035 | 1045 | 1045 | 1035 | 1035 | 1035 | 1035 | 1037.50 | 1037.50 | 1035 | 1032.33 | 1035 | 1031 | 1043 | 1032.33 | 1031 | 1035 | 1039 | 1036 | 1032.33 | 881.71 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | 282 | – | 282 | 282 | – | 285 (15 Nov 288.50) | 282 (15 Nov 283.50) | 284 | 296 (15 Nov 299) | 308 (15 Nov 312.50) | 296 (15 Nov 301) | 282 (15 Nov 284.50) | 282 | 282 (15 Nov 293) | 296.50 | 282 | 282 | – | 282 | 282 | 283.50 (15 Nov 285) | 285 (15 Nov 288) | 284 (15 Nov 286.33) | 284.50 (15 Nov 286.75) | 299.33 (15 Nov 304) | 281.71 (15 Nov 284.86) |
| **Ours** | | | | | **259.50** | not bookable | not bookable | **281.50** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **248.67** | **261.50** | **246** | **356** | **261** | **252** | **285** | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.86 (19) | | **254** (3) | **237.50** (1) | **233.33** (6) | **245.75** (4) | n/a (0) | **237.50** (3) | **237.50** (3) | **237.50** (3) | **266.75** (2) | **272.75** (2) | **266.75** (2) | **237.50** (3) | **259.75** (2) | **259.75** (2) | **267** (2) | **247.50** (4) | **254** (3) | **242.75** (3) | **283** (2) | **237.83** (6) | **243.75** (5) | **254** (3) | **225** (3) | **220** (3) | **292.16** (4) | **241.21** (2) |
| **Our pctl (vs median)** | | | | | P67 (+2.2%) | – | – | P75 (+14.5%) | – | – | – | – | – | – | – | – | – | – | – | P50 (+0.5%) | P67 (+3.0%) | P67 (+1.3%) | P100 (+25.8%) | P67 (+9.7%) | P60 (+3.4%) | P67 (+12.2%) | – | – | – | – |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 15 Dec-17 Dec | 16 Dec-18 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | – | 170.50 | – | – | – | – | – | – | – | 170.50 | 170.50* | 170.50 (15 Nov 190) | 190 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | – | – | – | – | – | – | – | – | – | – | – | – | – | 179 | 184 |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | 128.50 (15 Nov 135) | – | 135 | 135* | – | 135 | 135 | 135 | 147.50 | 160 | 147.50 | 135 | 135 | 135 | 135 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | 159.67 | – | – | – | – | 167.50 | 167.50 | 167.50 | 167.50 | 167.50 | 167.50 | 167.50 | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.92 (25) | Free parking on premises/Guest favourite | – | – | – | 181 | – | 181 | – | – | – | – | – | – | 181 | 181 | 181 |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (202) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | 135.50 | – | – | 140.50 | – | – | – | – | – | – | – | 145.50 | 140.50* | 140.50 | 140.50 |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | 146.67 | – | – | – | – | – | – | – | – | – | – | – | – |
| **Comp median (n)** | | | 4.84 (14) | | **132** (2) | n/a (0) | **146.67** (3) | **155.50** (4) | n/a (0) | **158** (2) | **135** (1) | **151.25** (2) | **157.50** (2) | **163.75** (2) | **157.50** (2) | **156.50** (4) | **167.50** (5) | **169** (6) | **181** (5) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and our listings (Airbnb only). The P12 7-14 Dec Booking.com cleaning fee and the Mile End Visibility Booster status remain NOT CHECKED (channel agent).
- Comp cancellation policies and band-listing sleeps: NOT CHECKED. Lift, view and parking come from listing-page reads on 25 Oct-15 Nov.
- **Smoobu was not called.** Smoobu prices from `prices.csv` 16 Nov; stays from `reservations.csv` 16 Nov. Why `prices.csv` marks P04 24 Nov unavailable while PriceLabs shows it open is NOT CHECKED.
- **P04:** stored comps priced on 18-20 Nov n = 1 (band n = 5, operator-collapsed 4); December stored n 2-4. The cause of the December cuts (Booking Recency Factor suspected) is NOT VERIFIED. The 18-20 Nov supported range rests mainly on the band.
- **P12:** stored n 2-6 per stay; band n 5-15. The 26 Nov 1-night stay has band n = 5.
- P09 958156921765583815 and P04 1387112821878102742 were not returned on any stay today (kept; see Method). No comp was replaced.
- NL percentiles: PriceLabs does not state the horizon or cleaning basis of the summary table; read as market bands, not like-for-like.
- PriceLabs 16 Nov raw spot-checked for the nights cited only.
