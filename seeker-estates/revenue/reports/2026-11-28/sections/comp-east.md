# Competitor positioning: EAST batch (D = 2026-11-28)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy `intentional_blocks`). Not analysed.
- **P15** has no listing of ours. Reference only.
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec; P09 26 Nov, passed; P12 13 Dec). P09 and P12 Christmas stays are comp trend only.

**Method** (same as 26-27 Nov; scripts copied from scratchpad `east27/bin` to `east28/bin`; only dates, paths and stays changed)
- **Comp ids:** the same set as 27 Nov (P01 11, P04 7, P09 6, P12 7, P15 7). **No comp replaced today.**
  - P04 1733027244747346716 and 1387112821878102742: not returned on any of 37 stays (28 Nov-4 Jan), **ninth day**; 0.3 km box checks had 0 errors. Kept; inactivity NOT VERIFIED. P04 has 5 live comps (below the 6 minimum).
  - Not returned on any stay today, kept as booked: P01 852256049507701872; P09 958156921765583815; P12 1670196516322802487 (fifth day) and **53017356 (new today; returned on 4 stays on 27 Nov)**; P15 1371771992549776701, 1528442618668335413, 1444741453093610023.
  - P12 29297702 still shows a placeholder-like price (£1,031-1,052/n; £879/n on 7-14 Dec). Kept out of the medians.
- **Access:** public Airbnb search pages. 87 wide searches with pagination, 0 failures (07:19:41-07:22:29Z). Then 537 comp/stay checks in a 0.3 km box (07:20:33-07:28:16Z): 6 hits, 0 errors. Box validated once by re-finding a known comp (P12 1077363497194834681). Box sizes: 2.5 km P04, 1.8 km P09, 1.3 km the rest. Search party 4 for 2BR, 3 for 1BR. **Booking.com: NOT CHECKED.**
- **Price basis = what guests see:** Airbnb guest-paid all-in total / nights, after discounts, cleaning and Airbnb fees **included**; no separate taxes shown. Ours priced the same way. PriceLabs/Smoobu (`prices.csv` 28 Nov) are **room only, cleaning excluded**. Stays of 7+ nights include the 15% weekly discount (policy).
- **Stays (same dates for comps and us):** midweek **1-3 Dec**; next Fri-Sun **4-6 Dec**; 30 days out **28-30 Dec** (new); trend 18-20, 20-22, 23-25, 24-26, 25-27, 26-28 Dec.
  - P04: 10-13 Dec as sold plus 10-12 (new), 11-13 (new), 12-13 (new), 10-14, 11-14; 13-14, 13-16; 14-22, 14-17, 15-19, 16-19, 17-20, 19-22; 20-26, 20-23, 21-24, 23-26, 23-27, 24-27, 20-27; 6-9, 6-10, 7-10, 2-3 Dec; closure checks 28 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan.
  - P12: **7-14 Dec (the reopened week, 7 n, checkout on the 14 Dec handback day)** plus 7-10, 7-11, 8-11, 10-14, 11-14 Dec (all new); **30 Nov-3 Dec**, 30 Nov-4 Dec, 30 Nov-2 Dec, 2-4 Dec; 4-7 and 3-7 Dec booked (closure check).
  - P01: **18-20 Dec**, 18-21, 19-21 Dec.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius; ours and >£1,000/n excluded; P04's 1531... operator units count as one ("op").
- **"Supported room"** = band median x 0.85-1.00 (the `quality_premium` range) converted back to room with each stay's own Airbnb all-in / room ratio. Approximate.
- **Data written:** `data/snapshots/2026-11-28/comps.csv` was absent at 07:19:44Z. Under `flock` on `.comps.csv.lock` I copied it forward from 27 Nov (28,357 lines, byte-identical, `filecmp`). Under the same lock I **appended 1,342 rows**: 644 `comp-east` (every stored comp x stay; NOT RETURNED rows kept with a blank price), 505 `east-refband` (`Pxx:band`), 193 `east-ours` (`Pxx:ours`: Airbnb all-in rows incl. 1455, plus PriceLabs room rows). File now 29,699 records, all 11 columns.
- **PriceLabs (read-only, strictly one call at a time, in this order):**
  1. `get_listing_date_overrides` P04 28 Nov-10 Jan: **CHANGED.** 6-26 Dec is now **-5%, min 3** (was min 3 with no price), updated 2026-11-27T15:02:33Z. Others unchanged (28-30 Nov, 3-5 Dec -8% min 3; 1 Dec -2% min 4; 2 Dec +200% min 1; 27 Dec -5% min 7; 28-31 Dec -5% min 5; 1 Jan -2% min 4; 2-10 Jan -8% min 3).
  2. `get_listing_date_overrides` P12 28 Nov-14 Dec: **CHANGED.** 30 Nov-6 Dec **-2% min 2** (14:56:39Z 27 Nov) and 7-10 Dec **-2% min 2** (14:56:54Z; 7-10 Dec was min 3 with no price). 11-13 Dec min 3 no price; 14 Dec -5% min 3; 28-29 Nov -15% min 2 (unchanged).
  3. `get_user_logs` (listing; P01, P04, P09, P12; 27-28 Nov): **3 entries, all Reyhan** (`add_custom_pricing`): P04 6-26 Dec -5% min 3 at 15:02:33Z; P12 7-10 Dec -2% min 2 at 14:56:54Z; P12 30 Nov-6 Dec -2% min 2 at 14:56:39Z. **So the 27 Nov ~15:00Z refresh batch was edit-triggered** for P04 and P12.
  4. `get_neighbourhood_data` detail for P04, P12, P01: OK, saved to scratchpad `east28/dl/nd_*_detail.json`.
- **Smoobu: not called.** Prices from `prices.csv` and reservations from `reservations.csv` (28 Nov). Pushes (`listings.csv` 28 Nov): P04 27 Nov 15:02:51Z, P12 27 Nov 15:00:17Z, P01 28 Nov 03:02:57Z, P09 28 Nov 04:37:16Z.

## What changed since 27 Nov (this batch)
**1. CRITICAL (day 29 of t-p04-doublebook): the unsynced P04 Airbnb 1455876748739910219 still sells booked nights. 10-12 Dec has NOT been blocked on it.**
- P04 10-13 Dec is booked on the synced Airbnb (made 27 Nov, £378.67 room + £142 cleaning, `reservations.csv` 28 Nov). The synced 1657859794156786222 is closed for it (not returned: wide 07:20:39-07:20:47Z; box 07:25:12-07:25:59Z on 10-13, 10-12, 11-13, 12-13, 10-14, 11-14 Dec).
- **1455 is bookable for the same nights** (wide search, checked 2026-11-28 07:20:39-07:20:47Z): **10-13 Dec £601** (struck from £686), **10-12 Dec £438** (from £494; new stay checked), 11-13 Dec £445, 10-14 Dec £754 (from £866), 11-14 Dec £597 (from £681). 12-13 Dec (1 n) is not returned (min stay). Every 1455 price is unchanged since 27 Nov.

**2. 1455 is still closed from the night of 20 Dec.** 18-20 Dec bookable at £451; not returned on 14-22, 19-22, 20-23 (box 07:27:05Z), 20-26 (box 07:27:57Z), 20-27 Dec or any default Christmas stay. Meanwhile the synced listing sells 20-26 Dec at **£858**. Whether 1455 holds a booking from 20 Dec: NOT VERIFIED (public pages only).

**3. Reyhan cut P04 6-26 Dec by 5% (27 Nov 15:02:33Z), against the comp evidence.** Airbnb totals fell overnight: 14-22 Dec £1,019 -> **£975**; 17-20 Dec £488 -> £472; 20-26 Dec £897 -> £858; 6-9 Dec £539 -> £519; 7-10 Dec £536 -> £517; 23-26 Dec £504 -> £485. Smoobu room 14-22 Dec £1,187 -> £1,128 (-5.0%). P04 13-26 Dec was already P0 vs stored comps on every stay. This conflicts with Corentin's direction ("cut PriceLabs discounts"): **for Corentin, confirm or revert.**

**4. Reyhan cut P12 30 Nov-10 Dec by 2% (27 Nov 14:56Z).** 30 Nov-3 Dec room 269/279/282 -> **252/261/275**; Airbnb £785 -> **£742**. That lands where the evidence put it yesterday (about -5%), but it is a new PriceLabs discount: **for Corentin, confirm or revert** (the evidence supports keeping it on P12).

**5. P04 Airbnb cards vs Smoobu/PriceLabs (asked: they disagree on 21+ nights).** `prices.csv` 28 Nov has 28 P04 nights >£2 apart; in December the open ones are 6-8 Dec (PL 163/164/165 vs Smoobu 160/160/162) and **13 Dec (PL 141 vs Smoobu 166)**. A fit on the 8 open 3-night stays where both agree gives Airbnb total = 0.763 x room + £143.08 (n 8, every residual within £0.5; the £143 matches the £142 cleaning). Tested on the stays where they disagree:
  - 6-9 Dec: Airbnb **£519**. Smoobu predicts £511.1, PriceLabs predicts **£518.7**, so it matches **PriceLabs**.
  - 7-10 Dec: Airbnb **£517**. Smoobu predicts £510.3, PriceLabs predicts **£517.2**, so it matches **PriceLabs**.
  - 13-16 Dec: Airbnb **£475**. Smoobu predicts **£475.2**, PriceLabs predicts £456.9, so it matches **Smoobu** (13 Dec at 166, +£25 vs PriceLabs).
  - So the card is not simply "stale Smoobu". Why it differs by date: NOT VERIFIED (pricelabs/channel agents). I priced P04 from the Airbnb card.
  - The 0.763 slope means Airbnb charges about 24% below the Smoobu room before cleaning. That is consistent with the a-airbnb-rules 0.765 tier. The channel agent owns this.

**6. P12 reopened week 7-14 Dec is on sale on Airbnb:** £1,575 (£225/n, struck from £1,826; weekly 15% applies). Room 262/266/264/265/279/284/265 = £1,885 (PL = Smoobu).

**7. Comps mostly held.** 108 of 151 like-for-like comp/stay prices are within £1 of 27 Nov. Moves of £10 or more:
  - P01 41905186 up on Christmas, by £10-48 (20-22 Dec 539 -> 587; 24-26 Dec 647 -> 695).
  - P01 1684834789445533643 down £33-48 on every December stay (18-20 Dec 376 -> 334.5).
  - P01 1005647070760859698 18-21 Dec 290 -> 253.33. P01 1418178473526356202 1-3 Dec 412 -> 401.
  - P04 1577633201778145138 26-28 Dec 251 -> 263.5. P09 1501211872839579235 1-3 Dec 174 -> 157.5.

## PriceLabs market percentiles (`get_neighbourhood_data`, 28 Nov)
These are market bands, not comps. "Ours" = PriceLabs room (`final_price` = `prices.csv`). Compsets: P12 NL 2-3BR (130); P04 NL 1-3BR (187); P01 NL 1-3BR. Basis "Host-only fee"; horizon not stated. Percentiles are interpolated.

| Ref | 2BR summary P25/P50/P75/P90 (n) | Booked 30/60 vs market (`pl_kpis` 28 Nov) | Ours vs daily market (stay average P25/P50/P75/P90) |
|---|---|---|---|
| P12 | 171/206/234/290 (116) | 63% / 82% vs 42% / 31% (27 Nov 87%/93%; the 7-14 Dec cancellation) | **7-14 Dec £269.29 (174.1/218.0/269.7/319.3): P75**; 7-10 Dec £264: P76; 10-14 Dec £273.25: P74; 11-14 Dec £276: P74. **30 Nov-3 Dec £262.67 (168.3/205.7/254.0/300.7): P78** (27 Nov P83); 30 Nov-4 Dec £265.75: P77 |
| P04 | 140/174/210/247 (90) | 37% / 32% vs 24% / 17% | **10-13 Dec as sold £126.22: below P25** (127.3/157.0/206.7/252.0). **13-16 Dec £137: P36**; 13-14 Dec £141: P40. **14-22 Dec £141.25 (128.5/156.5/204.1/237.8): P36** (27 Nov P43). **17-20 Dec £143.67: P35**. **20-26 Dec £147.67 (131.5/165.3/210.2/262.0): P37**. 23-26 Dec £149.67: P35. 6-9 Dec £164: P56; 7-10 Dec £163.33: P57 |
| P01 | n/a (1-3BR NL) | 100% / 100% vs 37% / 27% | **18-20 Dec (blocked) £277.5 (198.5/231.0/315.0/442.0): P64**; 18-21 Dec £267: P61 |

- P04 `prices_with_default_customization` vs final: 14-22 Dec £163.6 vs £141.0 (-14%; 27 Nov -7%); 17-20 Dec £169.3 vs £143.7 (-15%); 20-26 Dec £177.5 vs £147.2 (-17%); 6-9 Dec £191.3 vs £160.7 (-16%). The -5% override explains part of it; the rest of the gap to default is NOT VERIFIED (pricelabs agent).
- P12: 7-14 Dec default £231.7 vs final £269.3 (+16%); 30 Nov-3 Dec £185.7 vs £262.7 (+41%).

## Priority 1: P04 Barking
- **Quality:** `quality_premium(4.33, 4.83)` = **-0.15** (cap). Ours is 4.33 from 12 reviews (unchanged); comp median 4.83 from 27 (gap -15). **Supported: -15% to 0% vs band median.**
- Booked next 30/60: 37% / 32% vs market 24% / 17%. `recommend` = **raise +10%** at both horizons (median comp percentile P0).
- Open nights: 2 Dec (1 n, +200%, deprioritised), **6-9 Dec (4 n)**, **13-26 Dec (14 n, min 3)**.

### Unsynced Airbnb 1455876748739910219: what it sells now (asked)

| Listing | Stay | Airbnb total | £/n all-in | Status (checked 28 Nov) | Our nights (synced; `reservations.csv` 28 Nov) |
|---|---|---|---|---|---|
| **1455 (unsynced, 4.69 (26))** | **10-13 Dec** | **£601** (struck from £686) | **200.33** | **bookable** (wide 07:20:39Z) | **BOOKED (Airbnb, made 27 Nov)**; synced 1657 not returned (box 07:25:12Z) |
| 1455 | **10-12 Dec** / 11-13 Dec / 11-14 Dec / 10-14 Dec | **£438** (from £494) / £445 / £597 (from £681) / £754 (from £866) | 219.00 / 222.50 / 199.00 / 188.50 | bookable (07:20:44-07:21:01Z) | 10-12 Dec booked; 13 Dec open |
| 1455 | 12-13 Dec (1 n) | n/a | n/a | not returned (box 07:25:40Z) | booked |
| 1455 | 6-9 / 6-10 / 7-10 Dec | £590 / £744 / £585 | 196.67 / 186.00 / 195.00 | bookable | open; synced £519 / £642 / £517 |
| 1455 | 13-16 / 14-17 / 15-19 / 16-19 / **17-20** / 18-20 Dec | £575 / £578 / £748 / £595 / **£608** / £451 | 191.67 / 192.67 / 187.00 / 198.33 / 202.67 / 225.50 | bookable | open; synced £475 / £453 / £566 / £463 / **£472**; synced 18-20 Dec not offered (min 3) |
| 1455 | **any stay including the night of 20 Dec or later** | n/a | n/a | **not returned** | **open and selling on the synced listing** (20-26 Dec £858) |
| 1455 | booked stays 28 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan; 1-3, 4-6 Dec | n/a | n/a | not returned | sold |

- **Did Corentin block 10-12 Dec on 1455? No:** it was still bookable at 07:20Z on 28 Nov (4 stays offered, from £438).
- **Still closed from 20 Dec: yes** (since 25 Nov).
- Both listings sell 6-9 Dec and 13-20 Dec. 1455 is 13-32% above the synced listing (17-20 Dec £608 vs £472, +28.8%; 15-19 Dec £748 vs £566, +32.2%), and the gap widened with Reyhan's -5%.

### 10-13 Dec as sold vs like-for-like comps (asked)
- As sold: £378.67 room (£126.22/n) + £142 cleaning = **£173.56/n before any Airbnb guest fee**.
- Same stay today: stored 1601606251010507286 **£202.33** (n 1) -> **-14.2%**; band op **£196.67** (n 3) -> **-11.7%, P0**; our own 1455 £200.33. Room below market P25.
- **Supported:** inside the -15% quality floor (room £119.84-149.34/n); about +7% was left (about £25). Same as 27 Nov.

### Open December stays (Airbnb cards, 28 Nov)

| Stay | Ours, Airbnb all-in £/n (27 Nov) | Room on the card (PL / Smoobu) | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n (vs today) | Market pctl |
|---|---|---|---|---|---|---|---|
| **6-9 Dec** | **173.00** (179.67) | 163/164/165 (PL; Smoobu 160/160/162) | 222 (3), -22.1% | 209.33 (6), **-17.4%** | P33 | **169-198 (+3% to +21%)** | P56 |
| 6-10 Dec | 160.50 (167.00) | 163/164/165/161 | 202 (2), -20.5% | 190 (5), -15.5% | P40 | 164-193 (+1% to +18%) | |
| **7-10 Dec** | **172.33** (178.67) | 164/165/161 (PL) | 206.17 (2), -16.4% | 194.83 (6), **-11.5%** | P33 | **157-185 (-4% to +13%)** | P57 |
| 13-16 Dec | 158.33 (158.00) | **166 (Smoobu)**/134/135 | 222 (3), -28.7% | 209.33 (6), -24.4% | P17 | 154-181 (+12% to +32%) | P36 |
| 14-17 Dec | 151.00 (156.67) | 135/135/137 | 236.5 (4), -36.2% | 222 (7), -32.0% | P14 | 170-199 (+25% to +47%) | |
| **14-22 Dec (8 n)** | **121.88** (127.38) | 135/135/137/139/143/149/146/146 | 207 (1), **-41.1%** | 176.5 (4), **-30.9%** | P25 | **174-205 (+23% to +45%, incl. weekly 15%)** | **P36** |
| 15-19 Dec | 141.50 (147.00) | 135/137/139/143 | 253.75 (3), -44.2% | 227.88 (6), -37.9% | P0 | 190-223 (+37% to +61%) | |
| 16-19 Dec | 154.33 (159.67) | 137/139/143 | 259.67 (3), -40.6% | 228.5 (6), -32.5% | P0 | 176-207 (+26% to +48%) | |
| **17-20 Dec** | **157.33** (162.67) | **139/143/149** | 245.16 (2), **-35.8%** | 231 (4), **-31.9%** | **P0** | **179-211 (+25% to +47%)** | **P35** |
| 19-22 Dec | 159.67 (165.67) | 149/146/146 | 222 (1), -28.1% | 222 (3), -28.1% | P0 | 174-204 (+18% to +39%) | |
| **20-26 Dec (6 n)** | **143.00** (149.50) | 146/146/145/150/150/149 = £886 (27 Nov £932) | 226 (1), -36.7% | 204.67 (4), **-30.1%** | **P0** | **180-211 (+22% to +43%)** | **P37** |
| 20-23 Dec | 158.33 (164.67) | 146/146/145 | 222 (1), -28.7% | 222 (3), -28.7% | P0 | 174-204 (+19% to +40%) | |
| 21-24 Dec | 159.33 (165.67) | 146/145/150 | 222 (1), -28.2% | 216.67 (5), -26.5% | P0 | 170-200 (+16% to +36%) | |
| 23-26 Dec | 161.67 (168.00) | 150/150/149 | 230 (1), -29.7% | 213.33 (4), -24.2% | P0 | 168-197 (+12% to +32%) | P35 |
| 23-27 Dec | 149.75 (161.50) | 150/150/149/149 | 231 (1), -35.2% | 210.5 (4), -28.9% | P0 | 179-210 (+19% to +41%) | |
| 24-27 Dec | 161.67 (175.00) | 150/149/149 | 251.16 (2), -35.6% | 234 (5), -30.9% | P0 | 184-216 (+23% to +45%) | |
| 20-27 Dec (7 n) | 129.14 (135.14) | avg 147.86 | 211.71 (1), -39.0% | 211.71 (3), -39.0% | P0 | 206-242 (incl. weekly 15%) | |

- **13-26 Dec: about +25% on today's room is supported** (room about £170-185/n). That means reverting Reyhan's -5% and adding the +20% supported yesterday. Every stay is P0-P25 in the band, -24% to -39% vs band op, and P35-P37 in the market. The lower bound of the supported range is +12% or more on every stay.
- **6-9 / 6-10 Dec: about +10%** (supported +1% to +21%). **7-10 Dec: about +5%** (-4% to +13%).
- `recommend` gives +10% at both horizons. I adopted larger steps for 13-26 Dec because the comp gap is about 3x the formula step.
- 2 Dec (1 n, +200% min 1, deprioritised): £455 vs band op £230 (n 3). Reported only.

## Priority 2: P12 Mile End, 7-13 Dec (reopened) and 30 Nov-3 Dec (last open nights before the 13 Dec handback)
- **Quality:** `quality_premium(4.27, 4.875)` = **-0.15** (cap). Ours is 4.27 from 15 reviews (unchanged); comp median 4.875 from 25 (gap -10). **Supported: band median x 0.85-1.00.**
- Booked next 30/60: **63% / 82%** vs market 42% / 31% (27 Nov 87%/93%). `recommend` = mechanical **raise +10%** at both horizons (P50). **Not adopted:** the raise branch ignores a negative `quality_premium`, the short stays already sit above the band median, and nothing after 13 Dec can be sold.
- Open nights: **30 Nov-3 Dec (4 n, min 2)** and **7-13 Dec (7 n; min 2 on 7-10, min 3 on 11-13)**. 4-6 Dec is booked (Booking.com, made 24 Nov). 4-7 and 3-7 Dec are correctly closed on Airbnb.

| Stay | Ours, Airbnb all-in £/n (27 Nov) | Room (PL = Smoobu) | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room £/n (vs today) | Market pctl |
|---|---|---|---|---|---|---|
| **7-14 Dec (7 n, whole reopened week)** | **225.00** (new; £1,575 struck from £1,826, weekly 15%) | 262/266/264/265/279/284/265 = £1,885 | 280.43 (9), P33, **-19.8%** | 210.71 (1: 1077363497194834681), P100, +6.8% | 285-336 (+6% to +25%) | **P75** |
| 7-10 Dec | 251.33 (new; £754) | 262/266/264 | 235 (11), P64, **+6.9%** | 258.5 (2), P50, -2.8% | 210-247 (-21% to -6%) | P76 |
| 7-11 Dec | 239.50 (new; £958) | 262/266/264/265 | 243.5 (9), P44, -1.6% | 255.38 (2), P50, -6.2% | 228-269 (-14% to +2%) | |
| 8-11 Dec | 253.00 (new; £759) | 266/264/265 | 250.33 (11), P55, +1.1% | 258.5 (2), P50, -2.1% | 223-262 (-16% to -1%) | |
| 10-14 Dec | 242.75 (new; £971) | 265/279/284/265 | 224.38 (12), P67, **+8.2%** | 228.75 (3), P67, +6.1% | 215-253 (-21% to -8%) | P74 |
| 11-14 Dec | 261.33 (new; £784) | 279/284/265 | 235 (11), P64, **+11.2%** | 235 (3), P67, +11.2% | 211-248 (-24% to -10%) | P74 |
| **30 Nov-3 Dec** | **247.33** (261.67; £742 struck from £846) | 252/261/275 (27 Nov 269/279/282) | 262.34 (8), P38, **-5.7%** | 255 (4), P50, -3.0% | 237-279 (-10% to +6%) | **P78** |
| 30 Nov-4 Dec (4 n) | 237.00 (251.50; £948) | 252/261/275/275 | 267.88 (6), P17, -11.5% | 276.62 (2), P0, -14.3% | 255-300 (-4% to +13%) | P77 |
| 30 Nov-2 Dec | 258.00 (272.50) | 252/261 | 247.5 (7), P57, +4.2% | 264.75 (2), P50, -2.5% | 209-246 (-18% to -4%) | |
| 1-3 Dec (midweek default) | 262.50 (277.50) | 261/275 | 262 (5), P60, +0.2% | 264.75 (2), P50, -0.8% | 227-267 (-15% to 0%) | |
| 2-4 Dec | 266.00 (281.00) | 275/275 | 274.5 (4), P25, -3.1% | 282 (1), P0, -5.7% | 241-284 (-12% to +3%) | |

- **7-13 Dec: about -8% supported on the nightly room, weighted to the back of the week.** 7-10 / 8-11 Dec: about -5% (room about £250/n). 10-13 / 11-13 Dec: about -10 to -12% (room about £245-250/n). These short stays are +1% to +11% above the band median (n 9-12), against a quality ceiling of 0%. The whole week, at £225/n after the 15% weekly discount (policy), is already -19.8% vs a thinner band (n 9) and +6.8% vs the one stored comp. A -8% nightly cut puts it at about £207/n, level with that comp. So the week does not need its own move.
- **Orphan risk (min stay is the occupancy agent's):** with min 2 on 7-10 Dec and min 3 on 11-13 Dec, a mid-week stay of 2-4 nights can leave 1-2-night pieces that the min stay will not sell before the handback (for example, 8-12 Dec leaves 7 Dec alone and 12-13 Dec as 2 nights at min 3).
- **30 Nov-3 Dec: hold.** Reyhan's -2% plus the repricing took the Airbnb card 5.5% lower overnight. It is now -5.7% vs band (P38) and -3.0% vs stored, inside the supported -10% to +6%. Yesterday's "-5%" has been delivered. The 4-night 30 Nov-4 Dec is -11.5% (inside -15%). No further cut.

## Priority 3: P01 Bowsprit Point 18-20 Dec (blocked, before the 20 Dec handback)
- **Still blocked:** 18-20 Dec `Blocked`, room 279/276 (20 Dec 246), min 3. Not returned on Airbnb.
- Comps: 18-20 Dec stored **£410** (n 3; 27 Nov £414), band £410 (7); 18-21 Dec stored £375 (n 7), band £333.5 (14); 19-21 Dec stored £432 (n 3; 27 Nov £389), band £382.75 (6). The 19-21 Dec rise is 41905186 (389 -> 432).
- **If reopened** at today's room plus £149 cleaning (carried figure), before any Airbnb guest fee: 18-20 Dec £352/n (-14.1% vs stored, -14.1% vs band); 18-21 Dec £316.67/n (-15.6% stored, -5.0% band); 19-21 Dec £335.50/n (-22.3% stored, -12.3% band). PriceLabs NL: P64 / P61.
- **Supported: about -2% vs the comp median** (`quality_premium(4.75, 4.8)` = -0.02, on only 4 reviews) -> about **+10% on the room** if reopened (18-21 Dec: about +4% against the band, n 14; about +19% against stored, n 7). Unchanged from 27 Nov.
- **For Corentin (carried):** the handback policy says "before the date, maximise revenue normally", but £801 of room nights (279 + 276 + 246) stay blocked.

## Priority 4: P09 Torrent Lodge
- Handback passed (26 Nov). Nothing to position. Trend only: 1-3 Dec stored median £157.5 (n 3); `quality_premium(5.0, 4.56)` = +0.15 (3 reviews).

## Summary per property
| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30/60 vs market | `recommend` | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (18-20 Dec blocked) | stored 375-432 (n 3-7) on 18-21 Dec | n/a (would be -14% to -22% stored, -5% to -14% band) | 4.75 vs 4.8 | 4 vs 30 (-26) | -0.02 | 100%/100% vs 37%/27% | raise-signal | **-2% vs median**; about +10% on the room if reopened |
| P04 (synced 1657...) | 10-13 Dec sold 173.56 (room 126.22); 6-9 Dec 173; 7-10 Dec 172.33; 13-16 Dec 158.33; **14-22 Dec 121.88**; **17-20 Dec 157.33**; **20-26 Dec 143** | stored 202-260 (n 1-4); band op 176.5-234 (n 2-7) | P0 stored on every open stay; band op P0-P40 | 4.33 vs 4.83 | 12 vs 27 (-15) | -0.15 | 37%/32% vs 24%/17% | raise +10% (both) | **-15% to 0% vs band: 13-26 Dec about +25% on today's room (revert the -5%, then +20%); 6-10 Dec about +10%; 7-10 Dec +5%; the 10-13 Dec sale left about +7%** |
| P04 unsynced 1455... | 186-225.5 on 6-20 Dec, **incl. booked 10-13 Dec £200.33 and 10-12 Dec £219** | | | 4.69 | 26 | n/a | | | **close 10-12 Dec now**; then map, close or unlist; check its calendar from 20 Dec |
| P09 | handback passed | 157.5-271.5 (n 1-3) | n/a | 5.0 vs 4.56 | 3 vs 25 (-22) | +0.15 | 100%/100% vs 41%/29% | raise-signal | nothing to sell |
| P12 | 7-14 Dec 225 (7 n); 7-11 Dec sub-stays 239.5-261.33; 30 Nov-3 Dec 247.33 | band 224.38-280.43; stored 210.71-282 | 7-14 Dec P33 band; 3-4-night 7-14 Dec stays P44-P67; 30 Nov-3 Dec P38 | 4.27 vs 4.875 | 15 vs 25 (-10) | -0.15 | 63%/82% vs 42%/31% | raise +10% (P50): **not adopted** | **-15% to 0% vs band: 7-13 Dec about -8% (7-10 -5%, 10-13 -10 to -12%); 30 Nov-3 Dec hold (already -5.7%)** |
| P15 | no listing of ours | 137.75-183 (n 0-3) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 28 Nov)
| Item | Status |
|---|---|
| **t-p04-doublebook** | **Not fixed (day 29):** 1455 still sells booked 10-13 Dec (£601), 10-12 (£438), 11-13, 10-14, 11-14 Dec at 07:20Z 28 Nov. Still closed from 20 Dec while the synced listing sells 20-26 Dec (£858). |
| a-p04-dec-1611 | **Worse:** Reyhan's -5% (27 Nov 15:02Z) on 6-26 Dec. 13-26 Dec is P0-P25, -24% to -39% vs band op. About +25% supported. 6-10 Dec about +10%. |
| t-p04-xmas-1711 | 20-26 Dec room £886 (27 Nov £932); Airbnb £858 (P0, -30.1% vs band op). About +25% supported. |
| a-p12-trim | 30 Nov-3 Dec: delivered (-5.5% on Airbnb via Reyhan's -2% plus repricing); hold. 7-13 Dec reopened: about -8% supported. |
| t-p01-1820block | **Not fixed** (still `Blocked`). For Corentin. |
| a-reyhan (new edits since 27 Nov) | **3 new Reyhan overrides on 27 Nov 14:56-15:02Z** (P04 -5% on 6-26 Dec; P12 -2% on 30 Nov-6 Dec and 7-10 Dec). For Corentin: confirm or revert. The evidence says revert on P04 and keep on P12. |

## Critical / high findings
- **CRITICAL: P04 unsynced 1455 still sells booked nights (day 29).** 10-13 Dec £601, 10-12 Dec £438, 11-13 Dec £445, 10-14 Dec £754 and 11-14 Dec £597 were all bookable at 07:20Z on 28 Nov. P04 10-13 Dec was sold on the synced Airbnb on 27 Nov (£378.67 room). Not blocked overnight.
- **HIGH: P04 1455 still closed from 20 Dec** while the synced listing sells 20-26 Dec at £858. If 1455 holds a booking, that is a double sale. NOT VERIFIED.
- **HIGH: Reyhan's -5% on P04 6-26 Dec (27 Nov 15:02:33Z) deepened an under-price.** 17-20 Dec is £157.33/n vs band op £231 (n 4), -31.9%. 14-22 Dec is £121.88 vs £176.5 (n 4), -30.9%. 20-26 Dec is £143 vs £204.67 (n 4), -30.1%. Market P35-P37. About +25% is supported. For Corentin: confirm or revert.
- **HIGH: P12 7-13 Dec reopened** (Booking.com cancellation, £1,432.42). The week is on Airbnb at £225/n (£1,575): -19.8% vs band (n 9), P75 in the market. The 3-4-night sub-stays are +1% to +11% above the band median, against a 0% quality ceiling. About -8% on the nightly room is supported (heavier on 10-13 Dec).
- **MEDIUM: Airbnb's P04 card follows PriceLabs on 6-8 Dec but Smoobu on 13 Dec** (13-16 Dec £475 fits Smoobu 166, not PriceLabs 141; fit residual within £0.5). The card also implies about 0.763 x room + cleaning.
- **HIGH (for Corentin, carried): P01 18-20 Dec still blocked.** Reopened at today's prices it would sit 5-14% below the band and 14-22% below stored comps; £801 of room nights are held.

## Comp tables
Airbnb guest-paid all-in £/night, incl. cleaning and fees, checked 2026-11-28 07:19:41-07:28:16Z.
- "27 Nov x" = the same comp and stay on 27 Nov, where the two differ by more than £1.
- `*` = found by the 0.3 km second pass.
- "–" = not returned in the wide search or the 0.3 km box (booked or unavailable).
- "(earlier read)" = km from an earlier day.
- Full source for every row: `data/snapshots/2026-11-28/comps.csv` (`comp-east`, `east-refband`, `east-ours`).
- Cancellation policy: NOT CHECKED. Differentiators come from listing-page reads on 25 Oct-15 Nov.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, search party 4

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 4 Dec-6 Dec | 28 Dec-30 Dec | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Dec-28 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | – | – | – | 253.33 (27 Nov 290) | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 562 (27 Nov 557) | – | 704 | 590 (27 Nov 544) | 695 (27 Nov 647) | 732 (27 Nov 722) | 587 (27 Nov 539) | 410 (27 Nov 414) | – | 429.67 (27 Nov 402.33) | 432 (27 Nov 389) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.44 (167) | none listed | – | – | – | – | – | – | 193.5 | – | – | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (58) | Lift | – | – | – | – | – | – | – | – | – | 375 (27 Nov 373) | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 (earlier read) | 6 | 4.6 (30) | Lift/River view/balcony | – | – | – | – | – | – | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking/River view/balcony | – | – | – | – | – | – | – | – | – | 382.67 | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (22) | Skyline view/Free parking/Lift/Superhost/balcony/Guest fav | 401 (27 Nov 412) | – | – | – | – | – | – | – | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | 299.5 | – | 375.5 | 350 (27 Nov 395.5) | 332.5 (27 Nov 376) | 324 (27 Nov 357) | 332 (27 Nov 357) | 334.5 (27 Nov 376) | 362.5 (27 Nov 410) | 333.67 (27 Nov 369.67) | 333.5 (27 Nov 366.5) |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.83 (18) | Lift | – | – | – | 335 | 335 | 335 | – | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (46) | Lift/patio or balcony/Superhost/Guest fav | – | – | 523 | 601.5 | 590 | 539.5 | 539.5 | 528 | 545.5 | 524 | 534 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost | – | – | – | – | – | – | – | – | – | 281 | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **401** (3) | n/a (0) | **523** (3) | **470** (4) | **462.5** (4) | **437.25** (4) | **435.75** (4) | **410** (3) | **454** (2) | **375** (7) | **432** (3) |
| **Band median (n)** | | | | | 299.5 (7) | 310 (1) | 523 (5) | 396.75 (8) | 362.5 (10) | 335 (11) | 332 (9) | 410 (7) | 390 (5) | 333.5 (14) | 382.75 (6) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.33 (12); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, search party 4

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 4 Dec-6 Dec | 28 Dec-30 Dec | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Dec-28 Dec | 28 Nov-2 Dec | 2 Dec-3 Dec | 3 Dec-6 Dec | 6 Dec-9 Dec | 6 Dec-10 Dec | 7 Dec-10 Dec | 10 Dec-13 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-13 Dec | 10 Dec-14 Dec | 11 Dec-14 Dec | 13 Dec-14 Dec | 13 Dec-16 Dec | 14 Dec-17 Dec | 14 Dec-22 Dec | 15 Dec-19 Dec | 16 Dec-19 Dec | 17 Dec-20 Dec | 19 Dec-22 Dec | 20 Dec-23 Dec | 21 Dec-24 Dec | 23 Dec-26 Dec | 23 Dec-27 Dec | 24 Dec-27 Dec | 20 Dec-26 Dec | 20 Dec-27 Dec | 27 Dec-4 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | – | – | – | – | – | – | – | 206.5 (27 Nov 209.75) | – | 235.67 (27 Nov 238) | – | – | – | – | – | – | – | – | – | – | 251 | 251 | – | 253.75 | 259.67 | 268.33 | – | – | – | – | – | 268.33 | – | – | – |
| [985683261536682900](https://www.airbnb.co.uk/rooms/985683261536682900) | 0.61 | 5 | 4.82 (17) | Paid street parking/Superhost | – | 225 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 (earlier read) | 5 | 5.0 (28) | Free parking/Superhost/Guest fav | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.76 (42) | Free parking/Superhost | 225 | – | – | – | – | – | – | – | 263.5 (27 Nov 251) | – | 250 | – | 223.33 | – | – | – | 225 | – | – | – | – | – | – | 265 | – | 267.5 | 273.33 | – | – | – | – | – | – | – | – | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | 222 | 222 | 222 | 234 | 234 | 228 | 222 | 222 | 228 | – | 222 | 222 | 222 | 222 | 222 | – | – | – | 222 | – | – | 222 | 222 | 222 | 207 | 222 | 222 | 222 | 222 | 222 | 222 | 230 | 231 | 234 | 226 | 211.71 | 206.12 |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 (earlier read) | 6 | 4.85 (27) | Parking (in name) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (18) | Free street parking/Superhost | 198 (27 Nov 202) | – | – | – | – | – | – | – | – | – | – | – | 190.33 (27 Nov 193.33) | 182 (27 Nov 185) | 190.33 (27 Nov 193.33) | 202.33 | 216 | 225 | – | 193.25 | 205.33 | – | 199.33 | 199.33 | – | – | – | – | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **455** | not bookable | **173** | **160.5** | **172.33** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **158.33** | **151** | **121.88** | **141.5** | **154.33** | **157.33** | **159.67** | **158.33** | **159.33** | **161.67** | **149.75** | **161.67** | **143** | **129.14** | not bookable |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **225.5** | not bookable | not bookable | not bookable | not bookable | **196.67** | **186** | **195** | **200.33** | **219** | **222.5** | not bookable | **188.5** | **199** | not bookable | **191.67** | **192.67** | not bookable | **187** | **198.33** | **202.67** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **222** (3) | **223.5** (2) | **222** (1) | **234** (1) | **234** (1) | **228** (1) | **222** (1) | **222** (1) | **245.75** (2) | **206.5** (1) | **236** (2) | **228.83** (2) | **222** (3) | **202** (2) | **206.17** (2) | **202.33** (1) | **220.5** (2) | **225** (1) | **222** (1) | **193.25** (1) | **205.33** (1) | **222** (1) | **222** (3) | **236.5** (4) | **207** (1) | **253.75** (3) | **259.67** (3) | **245.16** (2) | **222** (1) | **222** (1) | **222** (1) | **230** (1) | **231** (1) | **251.16** (2) | **226** (1) | **211.71** (1) | **206.12** (1) |
| **Band median (n)** | | | | | 220 (6) | 223.5 (2) | 222.75 (2) | 210 (3) | 210 (5) | 219 (4) | 222 (3) | 216 (2) | 219 (4) | 206.5 (1) | 230 (3) | 228.83 (2) | 209.33 (6) | 190 (5) | 194.83 (6) | 196.67 (3) | 217.5 (4) | 200 (2) | 222 (1) | 190 (3) | 196.67 (3) | 226 (2) | 209.33 (6) | 222 (7) | 176.5 (4) | 227.88 (6) | 228.5 (6) | 231 (4) | 222 (3) | 222 (3) | 216.67 (5) | 213.33 (4) | 210.5 (4) | 234 (5) | 204.67 (4) | 211.71 (3) | 206.12 (1) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | – | – | – | P100 (+92.8%) | – | P0 (-22.1%) | P0 (-20.5%) | P0 (-16.4%) | – | – | – | – | – | – | – | P0 (-28.7%) | P0 (-36.2%) | P0 (-41.1%) | P0 (-44.2%) | P0 (-40.6%) | P0 (-35.8%) | P0 (-28.1%) | P0 (-28.7%) | P0 (-28.2%) | P0 (-29.7%) | P0 (-35.2%) | P0 (-35.6%) | P0 (-36.7%) | P0 (-39.0%) | – |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, search party 3

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 4 Dec-6 Dec | 28 Dec-30 Dec | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Dec-28 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | – | – | – | – | – | – | 170.5 (27 Nov 168) | 169 | – |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | – | – | – | – | – | – | 165 | 165 | – |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.7 (23) | none listed | 150* (27 Nov 155.5) | – | – | – | 188.5 (27 Nov 185.5) | – | – | – | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest fav | 248.5* | 248.5 | – | 248.5 | 248.5 | 248.5 | 248.5 | 248.5 | – |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | 157.5 (27 Nov 174) | – | 292.5 | 227.5 (27 Nov 223.5) | 212.5 (27 Nov 207.5) | 193 (27 Nov 200.5) | – | – | 233 (27 Nov 242.5) |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 (earlier read) | 3 | 4.75 (16) | Skyline view/balcony | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **157.5** (3) | **248.5** (1) | **292.5** (1) | **238** (2) | **212.5** (3) | **220.75** (2) | **170.5** (3) | **169** (3) | **233** (1) |
| **Band median (n)** | | | | | 164.5 (7) | 248.5 (1) | 280.75 (2) | 235.5 (5) | 212.5 (7) | 135 (5) | 193 (8) | 211.25 (6) | 251 (2) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, search party 4

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 4 Dec-6 Dec | 28 Dec-30 Dec | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Dec-28 Dec | 30 Nov-3 Dec | 30 Nov-4 Dec | 30 Nov-2 Dec | 2 Dec-4 Dec | 4 Dec-7 Dec | 3 Dec-7 Dec | 7 Dec-14 Dec | 7 Dec-10 Dec | 7 Dec-11 Dec | 10 Dec-14 Dec | 11 Dec-14 Dec | 8 Dec-11 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 247.5 | – | 347.5 | 347.5* | 347.5 | 347.5 | 297.5 | 247.5 | 347.5 | 235 | – | 247.5 | – | – | – | 210.71 | 235 | 228.75* | 228.75 | 235 | 235 |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking | – | – | – | – | – | – | – | – | – | 275 (27 Nov 283.33) | 271.25 (27 Nov 277.5) | – | – | – | – | – | – | – | 330.25 | 352 | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (80) | Superhost | – | – | – | – | – | – | – | – | – | 173 (27 Nov 178.33) | – | – | – | – | – | – | – | – | 220 | 222 | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 (earlier read) | 6 | 4.94 (16) | Superhost/Guest fav | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 (earlier read) | 5 | 4.92 (121) | Superhost/balcony/Guest fav | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1 | 6 | 4.54 (13) | Paid parking/balcony (placeholder price, excluded) | 1046 (27 Nov 1035) | 1035 | 1052 | 1035 | 1035 | 1035 | 1035 (27 Nov 1053.5) | 1035 (27 Nov 1054.5) | 1035 | 1039.67 (27 Nov 1032.33) | 1036.5 (27 Nov 1031) | 1035 | 1046 (27 Nov 1035) | 1032.33 | 1031 | 879.29 | 1032.33 | 1031 | 1031 | 1032.33 | 1032.33 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift | 282 | – | – | – | – | – | 282 | – | – | 282 | 282 | 282 | 282 | – | – | – | 282 | 282 | – | – | 282 |
| **Ours** | | | | | **262.5** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **247.33** | **237** | **258** | **266** | not bookable | not bookable | **225** | **251.33** | **239.5** | **242.75** | **261.33** | **253** |
| **Comp median (n)** | | | | | **264.75** (2) | n/a (0) | **347.5** (1) | **347.5** (1) | **347.5** (1) | **347.5** (1) | **289.75** (2) | **247.5** (1) | **347.5** (1) | **255** (4) | **276.62** (2) | **264.75** (2) | **282** (1) | n/a (0) | n/a (0) | **210.71** (1) | **258.5** (2) | **255.38** (2) | **228.75** (3) | **235** (3) | **258.5** (2) |
| **Band median (n)** | | | | | 262 (5) | 339.25 (2) | 324.5 (7) | 308.5 (12) | 292 (14) | 305.5 (13) | 270.25 (12) | 322 (7) | 312.5 (8) | 262.34 (8) | 267.88 (6) | 247.5 (7) | 274.5 (4) | 332.67 (3) | 317.88 (2) | 280.43 (9) | 235 (11) | 243.5 (9) | 224.38 (12) | 235 (11) | 250.33 (11) |
| **Our pctl (vs comp median)** | | | | | P50 (-0.8%) | – | – | – | – | – | – | – | – | P50 (-3.0%) | P0 (-14.3%) | P50 (-2.5%) | P0 (-5.7%) | – | – | P100 (+6.8%) | P50 (-2.8%) | P50 (-6.2%) | P67 (+6.1%) | P67 (+11.2%) | P50 (-2.1%) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, search party 3

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 4 Dec-6 Dec | 28 Dec-30 Dec | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Dec-28 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | – | 195.5 | 183 | 170.5* | 170.5 | 195.5 | 183 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 (earlier read) | 4 | 4.93 (14) | Superhost/Guest fav | – | – | – | – | – | – | – | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.81 | 3 | 4.87 (15) | Paid parking/Superhost | 135 | – | – | – | – | 135 | 135 | 160 | – |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.85 (earlier read) | 4 | 4.71 (14) | Lift/Paid parking | – | – | – | – | – | – | – | – | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.84 | 4 | 4.92 (25) | Free parking/Guest fav | – | – | – | – | 181 | – | – | – | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (204) | Garden view/Lift/Paid parking off/Superhost | 140.5 | – | – | 140.5 | 145.5 | 150.5* | 155.5 | 160.5 | – |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.03 (earlier read) | 4 | 4.64 (14) | Lift | – | – | – | – | – | – | – | – | – |
| **Comp median (n)** | | | | | **137.75** (2) | n/a (0) | n/a (0) | **168** (2) | **181** (3) | **150.5** (3) | **155.5** (3) | **160.5** (3) | **183** (1) |
| **Band median (n)** | | | | | 137.75 (6) | n/a (0) | 272.25 (2) | 183.5 (4) | 181 (7) | 183.25 (6) | 155.5 (7) | 160.5 (5) | 179 (4) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings (Airbnb only).
- **1455's own calendar and bookings: NOT VERIFIED.** Only public search pages were read. Its closure from 20 Dec is unexplained.
- **P04 comp set is below the 6-comp minimum in practice:** 5 of 7 stored comps were returned. 1733027244747346716 and 1387112821878102742 have not been returned for 9 days on any of 37 stays. Inactivity NOT VERIFIED, so they are not replaced. Stored n = 1-4 per stay; band op n = 1-7. Replacement candidates carried, not re-read: 1072316558208098643, 1245634494660468861, 43709205, 934755638180855305.
- **P12 stored-comp coverage is thin:** 1-4 of 6 usable comps per open stay. 53017356 is not returned today (on 27 Nov it was) and 1670196516322802487 for a fifth day. Both are kept as booked. On 7-14 Dec only one stored comp is available (n 1).
- **Why the P04 Airbnb card follows PriceLabs on 6-8 Dec but Smoobu on 13 Dec: NOT VERIFIED.** This is inferred from a linear fit (n 8), not read from Smoobu or Airbnb host data.
- **10-13 Dec as-sold all-in** (£173.56/n) = room + cleaning from Smoobu. The Airbnb guest-fee model is NOT VERIFIED.
- P04 `final_price` sits 14-17% under `prices_with_default_customization` on 6-26 Dec; the -5% override explains only part of it. NOT VERIFIED (pricelabs agent).
- P01 cleaning fee £149 is carried, not re-read. P04 4-10 Jan and P12 January were not priced against comps (P12 is handed back on 13 Dec).
- Comp cancellation policies, band-listing sleeps and current lift/view/parking: NOT CHECKED today (carried from the 25 Oct-15 Nov reads).
- NL percentiles: horizon not stated, host-only-fee basis, 1-3BR (P04, P01) or 2-3BR (P12). These are market bands, not like-for-like.
