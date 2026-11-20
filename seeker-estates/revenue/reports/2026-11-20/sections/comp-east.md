# Competitor positioning: EAST batch (D = 2026-11-20)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy `intentional_blocks`). Not analysed.
- **P15** has no listing of ours. Reference only.
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec, P09 26 Nov, P12 13 Dec). P09 and P12 December stays below are comp trend only.

**Method** (same as 26 Oct-19 Nov; scripts copied from scratchpad `east19/bin` to `east20/bin`)
- **Comp ids:** the same set as 19 Nov (P01 11, P04 7, P09 6, P12 7, P15 7). **No comp replaced today.**
  - P04: 985683261536682900, 1733027244747346716 and 1387112821878102742 were not returned on any of the 20 stays (0.3 km box run on each, 0 errors). Kept as booked, not inactive: 985... was bookable on four November stays on 19 Nov, 1733... on 24-26 Nov on 19 Nov, and 1387... on 7 of 10 Jan-Feb stays on 15 Nov.
  - P12 29297702 still shows a placeholder-like price (£1,035-1,052.50/n). Kept out of the medians (blank `nightly_gbp`, price in `source`).
- **Access:** public Airbnb pages (HTTP 200). 49 wide searches with pagination, then 291 comp/stay checks in a 0.3 km box (4 hits, 0 errors). Box sizes: 2.5 km for P04, 1.8 km for P09, 1.3 km for the rest. 4 guests for 2BR, 3 for 1BR. Checked **2026-11-20 07:19-07:25Z**. **Booking.com: NOT CHECKED.**
- **Price basis = what guests see:** Airbnb **guest-paid all-in total / nights**, after discounts, with cleaning and Airbnb fees **included**. No separate taxes are shown. Ours are priced the same way. PriceLabs/Smoobu figures (`prices.csv` 20 Nov) are **room only, cleaning excluded**. Stays of 7+ nights include the 15% weekly discount (policy). Comps show their own discounts.
- **Stays (same dates for comps and us):**
  - Default: tonight Fri-Sun **20-22 Nov** (trend), next Fri-Sun **27-29 Nov**, midweek Tue-Thu **24-26 Nov**, 30 days out **20-22 Dec**, plus **18-20 Dec**.
  - P04: **20-24 Nov** (the unsynced-listing check), **24-25 Nov**, **6-9, 9-12, 11-14, 14-17, 16-19, 17-20 Dec and 6-13 Dec**, **20-23, 21-24, 23-26, 23-27 and 20-27 Dec**, and the sold 27 Dec-4 Jan (trend).
  - P12: **20-21 Nov** (tonight), **21-22 Nov**, **26-27 Nov**, **30 Nov-3 Dec**, 30 Nov-4 Dec, 1-3 Dec, 2-4 Dec.
  - P01: **18-20 Dec**, 18-21 Dec, 19-21 Dec.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius, excluding ours and per-night prices above £1,000. P04's 1531... operator units are collapsed into one ("op").
- **"Supported room"** = band median x 0.85-1.00 (the `quality_premium` range), converted back to room using each stay's own ratio of Airbnb all-in to PriceLabs room. Approximate.
- **Data written:** `data/snapshots/2026-11-20/comps.csv` was absent. Copied forward from 19 Nov (5,158 rows) under `flock` on `.comps.csv.lock`, then **appended 754 rows** under the same lock:
  - 366 `comp-east`: every stored comp x stay. NOT RETURNED rows are kept with a blank price.
  - 280 `east-refband` (ref `Pxx:band`).
  - 108 `east-ours` (ref `Pxx:ours`): Airbnb all-in rows and PriceLabs room rows.
- **PriceLabs (read-only, one call at a time, in this order):**
  - `get_neighbourhood_data` detail for P04, P12 and P01: OK, saved to scratchpad `east20/dl/nd_*_detail.json`.
  - `get_listing_date_overrides` P04, 20 Nov-10 Jan: OK. Unchanged; the latest `updated_at` is 11 Nov.
  - `get_user_logs` (listing; P01, P04, P09, P12; 19-20 Nov): **0 entries**.
- **Smoobu: not called.** Room prices come from `prices.csv` (20 Nov; the file starts 21 Nov). P12 20 Nov = PriceLabs `final_price` 294 from `get_neighbourhood_data`.

## What changed since 19 Nov (this batch)
**1. P04 unsynced Airbnb 1455876748739910219 is STILL bookable on 20-24 Nov: £781 total (£195.25/n), the same price as 19 Nov.**
- Those nights are sold on the synced listing: Airbnb 20-24 Nov, £489.59 room + £142 cleaning, confirmed (`reservations.csv`). **That guest arrives today.**
- 1455 is also bookable on 20-22 Nov (£457) and 18-20 Dec (£481; 19 Nov £509).
- Source: wide search checked 07:19:52-07:20:11Z (URL in `comps.csv`, ref `P04:ours`).
- **t-p04-doublebook: not fixed, day 21.**

**2. P04 20-26 Dec eased £17 (PriceLabs, no logged edit):** 171/174/169/180/183/179/177 (£1,233) -> **168/171/168/177/181/177/174 = £1,216**.
- Airbnb today:
  - 20-23 Dec: £201.67 -> **£199.67**.
  - 21-24 Dec: £204.33 -> **£202.33**.
  - 23-27 Dec: £197.50 -> **£195.25**.
  - 20-27 Dec: £150.29 -> **£148.57**.
- **Bookability, checked live:** **20-23, 21-24 and 23-27 Dec ARE bookable on Airbnb.** The brief's "not possible" note does not hold for these three.
  - **23-26 Dec is NOT bookable** (23 Dec min 4).
  - No check-in on 24, 25 or 26 Dec can be sold. 27 Dec is booked, and min 4 runs through 26 Dec (override `min_stay` 4 on 23-26 Dec, set 20 Oct).
- P04 was last pushed 19 Nov 09:23Z (`listings.csv`).

**3. P04 6-19 Dec moved down slightly.**
- 6-18 Dec: -1 to -3 per night.
- **19 Dec: 175 -> 153 (-£22).**
- Airbnb 17-20 Dec: £182.33 -> **£168.00**.
- 24 Nov: 135 -> 145, still a 1-night gap under min 3.

**4. P12: PriceLabs moved 30 Nov-3 Dec again (no logged edit).**
- 30 Nov-3 Dec: 261/286/282/282 -> **268/282/285/297**.
- 26 Nov: 310 -> **311**.
- 20 Nov (tonight): 319 -> **294**.
- Airbnb: 26-27 Nov **£363** (unchanged); 30 Nov-3 Dec £261.67 -> £263; 2-4 Dec £278.50 -> **£285.50**; 1-3 Dec £280 -> £279.50.
- **21-22 Nov is not ours to sell:** a Booking.com stay of 21-26 Nov is confirmed. **20-21 Nov** is open at 294 with min 2, but 21 Nov is a check-in, so it is a 1-night orphan that cannot be sold (our listing was not returned on Airbnb).

**5. P01 18-20 Dec still `Blocked`** (288/293/249, min 3). Our listing is not returned on Airbnb for 18-20, 18-21 or 19-21 Dec. **t-p01-1820block: not fixed.**

**6. Comps mostly held.** 67 of 93 like-for-like comp/stay prices are within £1 of 19 Nov.
- Moves of £10 or more:
  - P01 1316210326145130709 18-21 Dec: 384 -> 426.
  - P01 1467264633617185891 24-26 Nov: 184.5 -> 168.
  - P01 1439222085860877494 24-26 Nov: 282 -> 259.5.
  - P12 1077363497194834681: +10 on 20-22 and 24-26 Nov.
  - P12 1098554019818216597 30 Nov-3/4 Dec: -33 to -35.
  - P12 53017356 20-21 Nov: -17.
  - P12 1383544079404594066 on 26 Nov-4 Dec and 18-20 Dec: -7 to -21.
- **No P04 comp moved by £10 or more.**

## PriceLabs market percentiles (`get_neighbourhood_data`, 20 Nov)
These are market bands, not comps. "Ours" = PriceLabs room (`final_price`).
- Compsets: P04 NL 1-3BR (187); P12 NL 2-3BR (135); P01 NL 1-3BR (283).
- Basis "Host-only fee"; the horizon is not stated. Percentiles are interpolated.

| Ref | 2BR summary P25/P50/P75/P90 (n) | Market occ 30/60 (`pl_kpis`) | Ours vs daily market (stay average P25/P50/P75/P90) |
|---|---|---|---|
| P04 | 139/174/215/249 (89) | 23% / 19% (ours 50% / 38%) | 24 Nov £145 (125/150/210/244): P45. **6-20 Dec £143.4 (127.4/159.1/203.7/243.8): P38**. 17-20 Dec £148.7: P37. **20-23 Dec £169 (129.7/162/206.3/256.7): P54. 21-24 Dec £172: P54. 23-26 Dec £178.3: P52. 23-27 Dec £177.2: P50**. Sold 27 Dec-4 Jan £134.59 room: P26 |
| P12 | 172/205/234/293 (119) | 44% / 34% (ours 80% / 90%) | 20 Nov £294: P87. **26 Nov £311 (169/202/239/310): above P90**. **30 Nov-3 Dec £278.3 (171.7/204/254.3/308): P82**. 1-3 Dec £283.5: P82. 2-4 Dec £291: P82 |
| P01 | NL 1-3BR (283) | 34% / 28% (ours 100% / 100%) | **18-20 Dec (blocked) £290.5 (203.5/234/313.5/455): P68**; 18-21 Dec £276.7: P63 |

- `prices_with_default_customization` (what PriceLabs would charge with default settings), P04: 20-26 Dec £215.3/n vs final £173.7 (-19%). 6-20 Dec £163.6 vs £143.4 (-12%). The listing's customisations pull these nights down.
- `fp_insights` P04: 26-31 Dec market prices +10.2%.

## Priority 1: P04 Barking
- **Quality:** `quality_premium(4.2, 4.83)` = **-0.15** (the cap). We are 4.2 from 10 reviews; the comp median is 4.83 from 27 (gap 17). **Supported position: -15% to 0% vs the band median.**
- **Overrides** (`get_listing_date_overrides`, unchanged):
  - 20-24 Nov: -5%, min 3.
  - 25 Nov: +15%, min 2.
  - 26-30 Nov and 3-5 Dec: -8%, min 3.
  - 1 Dec: -2%, min 4.
  - 2 Dec: +200%, min 1.
  - 6-22 Dec: -5%, min 3.
  - 23-26 Dec: -5%, min 4.
  - 27 Dec: -5%, min 7.
  - 28-31 Dec: -5%, min 5.
  - 1 Jan: -2%, min 4.
  - 2-10 Jan: -8%, min 3.

### The unsynced listing on the sold 20-24 Nov (guest arrives today)

| Listing | Stay | Airbnb total | £/n all-in | Status |
|---|---|---|---|---|
| 1455876748739910219 (unsynced, 4.69 (26)) | 20-24 Nov | **£781** | 195.25 | **BOOKABLE** (checked 07:20:11Z) |
| 1455876748739910219 | 20-22 Nov | £457 | 228.50 | bookable |
| 1455876748739910219 | 18-20 Dec | £481 | 240.50 | bookable (synced listing closed there by min 3) |
| 1657859794156786222 (synced) | 20-24 Nov | n/a | n/a | not returned (booked) |
| Smoobu (`reservations.csv`) | 20-24 Nov | £489.59 room + £142 cleaning | | Airbnb, confirmed, booked 14 Nov |

### Remaining Christmas, 20-26 Dec at £1,216

| Stay | Ours, Airbnb all-in £/n | PriceLabs room | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n | Market pctl |
|---|---|---|---|---|---|---|---|
| **20-23 Dec (3 n)** | **199.67** (bookable) | 168/171/168, avg 169 | 241 (2), -17.1% | **218.67 (5), -8.7%** | P20 | 157-185 = **in range** | P54 |
| **21-24 Dec (3 n)** | **202.33** (bookable) | 171/168/177, avg 172 | 241 (2), -16.0% | **215 (4), -5.9%** | P25 | 155-183 = **in range** | P54 |
| 23-26 Dec (3 n) | **not bookable** (23 Dec min 4) | 177/181/177 | 245 (2) | 226.67 (5) | | | P52 |
| **23-27 Dec (4 n)** | **195.25** (bookable) | 177/181/177/174, avg 177.3 | 243.62 (2), -19.9% | **228 (5), -14.4%** | P20 | 176-207 (-1% to +17%) | P50 |
| 20-27 Dec (7 n) | 148.57 | avg 173.7 | 230.36 (2), -35.5% | 214.29 (4), -30.7% | P0 | 213-251 (includes the 15% weekly) | |

- **Supported positioning:**
  - **20-22 Dec: hold** (168/171/168). The 3-night stays are -6% to -9% vs the band, inside the quality range.
  - **23-26 Dec: about +5%** (177/181/177/174 -> about £185-190/n). 23-27 Dec is -14.4% vs the band, at the low edge of the range.
- **Min stays (for Corentin, carried):**
  - 27 Dec is booked, so with min 4 on 23-26 Dec the only stay that can start after 22 Dec is 23-27 Dec.
  - 23-26 Dec and any check-in on 24-26 Dec cannot be sold.
  - **Min 3 on 23-26 Dec** stays within policy (min 3, never fewer) and makes 23-26 and 24-27 Dec sellable.

### 24 Nov and 6-19 Dec

| Stay | Ours, Airbnb all-in £/n | PriceLabs room | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n |
|---|---|---|---|---|---|---|
| 24-25 Nov (1 n) | not bookable (1-night gap; min 3) | 145 | n/a (0) | 230 (1) | | n/a: policy min 3 |
| **6-9 Dec** | 155.00 | 141/140/140 | 222 (3), -30.2% | 214.33 (6), **-27.7%** | P33 | **165-194** (+18% to +38%) |
| **9-12 Dec** | 157.67 | 140/142/150 | 212.5 (2), -25.8% | 214.33 (4), -26.4% | P0 | **166-196** (+16% to +36%) |
| 11-14 Dec | 160.67 | 150/152/142 | 214.33 (2), -25.0% | 214.33 (4), -25.0% | P0 | 168-197 (+13% to +33%) |
| **14-17 Dec** | 153.00 | 135/138/141 | 239.84 (4), -36.2% | 226 (6), **-32.3%** | P17 | **173-204** (+26% to +48%) |
| 16-19 Dec | 158.00 | 141/144/149 | 257.67 (3), -38.7% | 228.5 (6), -30.9% | P17 | 178-209 (+23% to +45%) |
| **17-20 Dec** | 168.00 (19 Nov 182.33) | 144/149/153 | 240.34 (2), -30.1% | 222 (5), **-24.3%** | P20 | **167-196** (+12% to +32%) |
| 6-13 Dec (7 n) | 126.29 | 140-152 | 186.5 (2), -32.3% | 155.43 (5), -18.7% | P0 | 150-177 (includes the weekly) |

- **6-16 Dec: about +20% supported** (room about £165-175, from 135-152). Unchanged since 17 Nov; the comps did not move.
- **17-19 Dec: about +15%** (144/149/153 -> about £165-175). 19 Dec fell £22 overnight (175 -> 153), which reopens the gap that yesterday's "hold" relied on.
- **24 Nov:** a 1-night gap between two bookings. Under policy (min 3, never fewer) it cannot be sold, so there is nothing to position.
- **`recommend`:**
  - 30-day: 50% vs market 23%, comp P0, quality -0.15 = **raise +10%**.
  - 31-60-day: 38% vs 19% = **raise +10%**.
  - **Adopted at the larger size above for 6-19 Dec**, because the comp gap (-24% to -32% vs the band) is bigger than the formula step.

## Priority 2: P12 Mile End
- **Quality:** `quality_premium(4.27, 4.88)` = **-0.15** (the cap). We are 4.27 from 15 reviews; the stored-comp median is 4.875 from 25 (gap 10). **Supported: band median x 0.85-1.00.**

| Stay | Ours, Airbnb all-in £/n | PriceLabs room | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room | Move vs PriceLabs |
|---|---|---|---|---|---|---|
| 20-21 Nov (tonight, 1 n) | not bookable (min 2; 21 Nov check-in) | 294 | 313.5 (2) | 282 (1) | | 1-night orphan |
| **21-22 Nov** | **booked** (Booking.com 21-26 Nov) | 251 | n/a (0) | n/a (0): 5 listings returned, none 2BR comps | | nothing to sell |
| **26-27 Nov (1 n)** | **363** (19 Nov 363) | **311** (min 1) | 284 (5), **P100, +27.8%** | 284.5 (2), P100, +27.6% | **207-243** | **-33% to -22%** |
| **30 Nov-3 Dec** | **263** (261.67) | 268/282/285 | 238.33 (11), P64, **+10.4%** | 250.67 (5), P60, +4.9% | 214-252 | **-23% to -9%** |
| 30 Nov-4 Dec | 254 (250) | 268/282/285/297 | 243.75 (9), P56, +4.2% | 277.5 (3), P33, -8.5% | 231-272 | -18% to -4% |
| **1-3 Dec** | **279.5** (280) | 282/285 | 237.5 (7), P86, **+17.7%** | 245.75 (4), P75, +13.7% | 205-241 | **-28% to -15%** |
| 2-4 Dec | 285.5 (278.5) | 285/297 | 240.5 (9), P78, +18.7% | 254 (3), P67, +12.4% | 208-245 | -28% to -16% |

- **Every open P12 stay is above the band** (+4% to +28%), against a quality ceiling of 0%. The PriceLabs NL market puts them at P82 to above P90.
- **26 Nov: room about £205-240 (about -25%), keep min 1.** At £311 room / £363 all-in it is P100 and +28% vs the band. **t-p12-26nov-price: not fixed (day 3).**
- **30 Nov-3 Dec: about -12%** (268/282/285/297 -> about £235/250/250/260). 1-3 and 2-4 Dec (+18% to +19% vs the band) carry most of the gap.
- **`recommend`:** 30-day (80% vs 44%, comp P67 median over 5 open stays) and 60-day (90% vs 34%) both give a mechanical **raise +10%**. **Not adopted:**
  - The lead comes from nights already sold.
  - The open stays sit above the band.
  - The raise branch ignores a negative `quality_premium`.
  - After the 13 Dec handback no night can be sold.
- Carried, for the channel agent: on 30 Nov-3 Dec the Airbnb all-in (£789 for 3 n) is below the PriceLabs room price alone (£835). Something on Airbnb takes more than 5% off before cleaning. NOT VERIFIED.

## Priority 3: P01 Bowsprit Point 18-20 Dec (blocked, before the 20 Dec handback)
- **Still blocked** (18-20 Dec `Blocked`, 288/293/249, min 3). Our listing is not returned on Airbnb.
- **Comps:**
  - 18-21 Dec (3 n): stored median **£369.67** (n = 7, range 281-524); band **£340.66** (n = 14).
  - 18-20 Dec: stored £376 (3); band £357.50 (8).
  - 19-21 Dec: stored £366.50 (3); band £350.25 (6).
- **If reopened** at today's 288/293/249 plus £149 cleaning (carried figure), before any Airbnb guest fee:
  - 18-21 Dec: £326/n, **-11.7% vs stored, -4.2% vs band**.
  - 18-20 Dec: £365/n, -2.9% vs stored, +2.1% vs band.
  - PriceLabs NL: P63-P68.
- **Supported: parity (about 0%).** `quality_premium(4.75, 4.8)` = -0.02, on only 4 reviews. The current price needs no cut. Up to about +5% on 18-21 Dec is supported.
- **For Corentin (carried policy conflict):** the handback policy says "before the date, maximise revenue normally", but £830 of room nights (288+293+249) stay blocked.

## Priority 4: P09 Torrent Lodge
- **No open night before the 26 Nov handback** (booked 20-26 Nov). Nothing to position.
- Comp median £166.50-200.50 (n = 1-4). `quality_premium(5.0, 4.56)` = +0.15, on only 3 reviews. `recommend`: raise-signal (100% vs market 40%).

## Summary per property
| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30/60 vs market | `recommend` | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (18-20 Dec blocked) | stored 259.5-380 (n 1-7); 18-21 Dec 369.67 (7) | n/a (would be -12% stored / -4% band) | 4.75 vs 4.8 | 4 vs 30 (-26) | -0.02 | 100%/100% vs 34%/28% | raise-signal | **parity** if reopened; no cut needed |
| P04 (synced 1657...) | Dec 126-168; **Christmas 149-202** | stored 186.5-257.7 (n 1-4); band op 155-230 (n 1-6) | P0 stored; P0-P33 band | **4.2** vs 4.83 | 10 vs 27 (-17) | -0.15 | 50%/38% vs 23%/19% | 30 d raise +10%; 31-60 d raise +10% | **-15% to 0%.** **6-16 Dec about +20%; 17-19 Dec about +15%; 20-22 Dec hold; 23-26 Dec about +5%, min 3** |
| P04 unsynced 1455... | 184-241; **bookable on the sold 20-24 Nov (£781)** | | | 4.69 | 26 | n/a | | | map or unlist |
| P09 | no sellable night | 166.5-200.5 (n 1-4) | n/a | 5.0 vs 4.56 | 3 vs 25 (-22) | +0.15 | 100% vs 40% | raise-signal | nothing before the handback |
| P12 | open 254-363 | band 237.5-284; stored 245.75-284.5 | P56-P100 band (median P67 stored) | 4.27 vs 4.88 | 15 vs 25 (-10) | -0.15 | 80%/90% vs 44%/34% | raise +10% (P67): **not adopted** | **-15% to 0% vs band. 26 Nov about -25%; 30 Nov-3 Dec about -12%** |
| P15 | no listing of ours | 145-160.5 (n 3-5) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 20 Nov)
| Item | Status |
|---|---|
| **t-p04-doublebook** | **Not fixed (day 21).** 1455 is bookable on 20-24 Nov at £781 and the synced guest arrives today. |
| t-p04-xmas-1711 | 20-26 Dec open at **£1,216** (-£17 overnight, no edit). 20-23, 21-24 and 23-27 Dec are bookable; 23-26 Dec and check-ins on 24-26 Dec are not (min 4). Supported: hold 20-22 Dec, about +5% on 23-26 Dec with min 3. |
| a-p04-dec-1611 | 6-18 Dec -1 to -3; **19 Dec 175 -> 153**. Supported: +20% on 6-16 Dec, +15% on 17-19 Dec. |
| a-p12-trim | Not done. 30 Nov-3 Dec moved up again (268/282/285/297). Needed: about -12%. |
| t-p12-26nov-price | **Not fixed** (£311 room / £363 all-in, P100, +28% vs band). |
| t-p01-1820block | **Not fixed** (still `Blocked`). For Corentin. |
| Push freshness | P12 20 Nov 05:52Z; P01 20 Nov 04:27Z; **P09 19 Nov 06:42Z; P04 19 Nov 09:23Z (not yet today)** (`listings.csv`). |

## Critical / high findings
- **CRITICAL: P04 unsynced Airbnb 1455876748739910219 is bookable on 20-24 Nov at £781 (£195.25/n).** Those nights are sold on Airbnb (£489.59 room, confirmed) and the guest arrives today (day 21).
- **HIGH: P04 6-19 Dec is -24% to -32% vs the band** (P0 vs stored comps). About +20% on 6-16 Dec and +15% on 17-19 Dec are supported. 19 Dec fell £22 overnight.
- **HIGH (for Corentin): P04 min 4 on 23-26 Dec strands 23-26 Dec and check-ins on 24-26 Dec** (27 Dec is booked). Min 3 (the policy floor) makes them sellable. 23-27 Dec is -14.4% vs the band: about +5% supported.
- **HIGH: every open P12 stay is +4% to +28% vs the band**, against a 0% quality ceiling.
  - 26 Nov: £311 room, P100, +28%; about £205-240 supported.
  - 30 Nov-3 Dec: +10% vs the band, P82 in the PriceLabs market; about -12% supported.
- **HIGH (for Corentin): P01 18-20 Dec still blocked.** Reopened at today's price it would sit at -4% to -12% vs comps (18-21 Dec). About £830 of room nights are held.
- **MEDIUM: P04 20-26 Dec eased £17 with no logged edit.** The 3-night stays are -6% to -9% vs the band: hold.

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-20 07:19-07:25Z.
- "19 Nov x" = the same comp and stay on 19 Nov, where the two differ by more than £1.
- `*` = found by the 0.3 km second pass.
- "–" = not returned in the wide search or the 0.3 km box (booked or unavailable).
- "(earlier read)" = km from an earlier day; the comp was not returned today.
- Full source for every row: `data/snapshots/2026-11-20/comps.csv` (`comp-east`, `east-refband`, `east-ours`).
- Cancellation policy: NOT CHECKED. Differentiators come from listing-page reads on 25 Oct-15 Nov.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 20 Dec-22 Dec | 18 Dec-20 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | 348.33 | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | – | 395 | 380 | 274 | 339 (19 Nov 342) | 319 (19 Nov 326.33) | 334 (19 Nov 327) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.45 (161) | none listed | – | 168 (19 Nov 184.5) | – | 243.5 | – | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (57) | Lift | – | – | – | – | – | 426 (19 Nov 384) | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 (earlier read) | 6 | 4.6 (30) | Lift/River view/balcony | – | – | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking/River view/balcony | – | – | – | – | – | 382.67 | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 (earlier read) | 6 | 4.95 (21) | Skyline view/Free parking/Lift/Superhost/balcony/Guest fav | – | – | – | – | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | – | 357 | 376 | 369.67 | 366.5 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 (earlier read) | 4 | 4.82 (17) | Lift | – | – | – | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (45) | Lift/patio or balcony/Superhost/Guest fav | – | 259.5 (19 Nov 282) | – | 539.5 | 528 | 524 | 534 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost | – | – | – | – | – | 281 | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | n/a (0) | **259.5** (3) | **380** (1) | **315.5** (4) | **376** (3) | **369.67** (7) | **366.5** (3) |
| **Band median (n)** | | | | | 310 (1) | 259.5 (9) | 345 (2) | 357 (7) | 357.5 (8) | 340.66 (14) | 350.25 (6) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.2 (10); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 20 Dec-22 Dec | 18 Dec-20 Dec | 20 Nov-24 Nov | 24 Nov-25 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 16 Dec-19 Dec | 6 Dec-13 Dec | 20 Dec-23 Dec | 21 Dec-24 Dec | 23 Dec-26 Dec | 23 Dec-27 Dec | 20 Dec-27 Dec | 27 Dec-4 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | – | – | – | 254 | – | – | – | – | 257.67 | 258.67 | 257.67 | – | 260 | 260 | 260 | 256.25 | 249 | 248.25 |
| [985683261536682900](https://www.airbnb.co.uk/rooms/985683261536682900) | 0.61 (earlier read) | 5 | 4.82 (17) | Paid street parking/Superhost | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 (earlier read) | 5 | 5.0 (28) | Free parking/Superhost/Guest fav | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.76 (41) | Free parking/Superhost | – | – | – | – | – | – | – | 248.33 | – | – | 265 | – | 273.33 | – | – | – | – | – | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | – | – | – | 222 | 222 | – | – | 222 | 222 | 222 | 222 | 222 | 222 | 207 | 222 | 222* | 230 | 231 | 211.71 | – |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 (earlier read) | 6 | 4.85 (27) | Parking (in name) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (18) | Free street parking/Superhost | – | 193 (19 Nov 195) | – | – | – | – | – | 198 | 203 | 206.67 | 199.33 | – | – | 166 | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **155** | **157.67** | **160.67** | **153** | **168** | **158** | **126.29** | **199.67** | **202.33** | not bookable | **195.25** | **148.57** | not bookable |
| 1455876748739910219 (unsynced, ours) | | | | | **228.5** | not bookable | not bookable | not bookable | **240.5** | **195.25** | not bookable | **196.67** | **197** | **199** | **192.67** | **212.67** | **198.33** | **184.43** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | n/a (0) | **193** (1) | n/a (0) | **222** (1) | **222** (1) | **254** (1) | n/a (0) | **222** (3) | **212.5** (2) | **214.33** (2) | **239.84** (4) | **240.34** (2) | **257.67** (3) | **186.5** (2) | **241** (2) | **241** (2) | **245** (2) | **243.62** (2) | **230.36** (2) | **248.25** (1) |
| **Band median (n)** | | | | | n/a (0) | 193.75 (2) | n/a (0) | 214.25 (4) | 209.5 (3) | 245.75 (2) | 230 (1) | 214.33 (6) | 214.33 (4) | 214.33 (4) | 226 (6) | 222 (5) | 228.5 (6) | 155.43 (5) | 218.67 (5) | 215 (4) | 226.67 (5) | 228 (5) | 214.29 (4) | 220.62 (2) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | P0 (-30.2%) | P0 (-25.8%) | P0 (-25.0%) | P0 (-36.2%) | P0 (-30.1%) | P0 (-38.7%) | P0 (-32.3%) | P0 (-17.1%) | P0 (-16.0%) | – | P0 (-19.9%) | P0 (-35.5%) | – |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 20 Dec-22 Dec | 18 Dec-20 Dec |
|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 168 | 168 | – | 169.5 | 168 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 165 | 165 | – | 165 | 165 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.7 (23) | none listed | – | – | – | 191.5 | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest fav | – | 200.5 | 200.5 | 248.5 | 248.5 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 (earlier read) | 3 | 4.27 (22) | none listed | – | – | – | – | – |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 (earlier read) | 3 | 4.75 (16) | Skyline view/balcony | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **166.5** (2) | **168** (3) | **200.5** (1) | **180.5** (4) | **168** (3) |
| **Band median (n)** | | | | | 166.5 (2) | 150 (11) | 205.25 (2) | 191.5 (9) | 180.75 (8) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 20 Dec-22 Dec | 18 Dec-20 Dec | 20 Nov-21 Nov | 21 Nov-22 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 1 Dec-3 Dec | 2 Dec-4 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 247.5 (19 Nov 237.5) | 247.5 (19 Nov 237.5) | 237.5 | 287.5 | 237.5 | – | – | – | 225 (19 Nov 230) | – | 237.5 (19 Nov 242.5) | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking | – | 270 | – | – | – | – | – | – | 283.33 (19 Nov 316.67) | 277.5 (19 Nov 312.5) | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (79) | Superhost | – | – | – | – | – | – | – | – | 201.67 (19 Nov 198.67) | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.94 (16) | Superhost/Guest fav | – | 150 | – | – | – | – | – | – | – | – | 220 | 220 |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (121) | Superhost/balcony/Guest fav | – | 254 | – | – | – | 282 (19 Nov 299) | – | 284 | 250.67 | 243.75 | 254 | 254 |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1 | 6 | 4.54 (13) | Paid parking/balcony (placeholder price, excluded) | – | 1035 | 1035 | 1035 | 1035 | – | 1043 | 1043 (19 Nov 1053) | 1044 (19 Nov 1032.33) | 1039.75 (19 Nov 1031) | 1052.5 (19 Nov 1035) | 1052.5 (19 Nov 1035) |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift | – | 282 | – | 333 | 299 (19 Nov 319.5) | – | – | 285 (19 Nov 298) | 282 (19 Nov 289) | 288.5* (19 Nov 297) | 282* (19 Nov 292.5) | 295 (19 Nov 312) |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **363** | **263** | **254** | **279.5** | **285.5** |
| **Comp median (n)** | | | | | **247.5** (1) | **254** (5) | **237.5** (1) | **310.25** (2) | **268.25** (2) | **282** (1) | n/a (0) | **284.5** (2) | **250.67** (5) | **277.5** (3) | **245.75** (4) | **254** (3) |
| **Band median (n)** | | | | | 300 (2) | 236.5 (10) | 319.5 (3) | 271.5 (10) | 295.5 (9) | 313.5 (2) | n/a (0) | 284 (5) | 238.33 (11) | 243.75 (9) | 237.5 (7) | 240.5 (9) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | P100 (+27.6%) | P60 (+4.9%) | P33 (-8.5%) | P75 (+13.7%) | P67 (+12.4%) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 20 Dec-22 Dec | 18 Dec-20 Dec |
|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | – | 190 | 195.5* |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 (earlier read) | 4 | 4.93 (14) | Superhost/Guest fav | – | – | – | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.81 | 3 | 4.87 (15) | Paid parking/Superhost | – | 135 | – | 135 | 160 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.85 | 4 | 4.71 (14) | Lift/Paid parking | – | 167.5 | – | – | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.84 | 4 | 4.92 (25) | Free parking/Guest fav | – | 145 | – | – | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (203) | Garden view/Lift/Paid parking off/Superhost | – | 135.5 | – | 160.5 | 160.5 |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.03 | 4 | 4.64 (14) | Lift | – | 150 | – | – | – |
| **Comp median (n)** | | | | | n/a (0) | **145** (5) | n/a (0) | **160.5** (3) | **160.5** (3) |
| **Band median (n)** | | | | | n/a (0) | 147.5 (10) | 228.75 (2) | 158.75 (6) | 160.25 (4) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings (Airbnb only).
- **P04 Christmas comps are thin:** stored n = 1-2 per stay (3 of 7 stored comps were not returned on any stay today), band n = 2-5.
- **Why PriceLabs moved P04 20-26 Dec (-£17), P04 19 Dec (-£22) and P12 30 Nov-3 Dec (up) overnight:** `get_user_logs` has no entry. NOT VERIFIED. P04 was not pushed today (last push 19 Nov 09:23Z), so its Airbnb prices may lag PriceLabs.
- **P12 Airbnb all-in is below the PriceLabs room price on 30 Nov-3 Dec** (£789 vs £835 before cleaning). Cause NOT VERIFIED.
- **P12 21-22 Nov:** no 2BR comp returned (the 1-night Saturday search returned only 5 listings). Ours is booked, so this does not affect a decision.
- **Kept as booked, not inactive:**
  - P04 985683261536682900, 1733027244747346716 and 1387112821878102742 were not returned on any of 20 stays.
  - P01 852256049507701872, 1418178473526356202 and 1374450835187037179 were not returned on any stay.
  - P09 1501211872839579235 and 958156921765583815, and P15 1371771992549776701, were not returned on any stay.
  - January was not re-checked.
- P04 2 Dec (£451, +200% min 1; deprioritised in policy) and 4-5 Jan were not priced against comps.
- P01 cleaning £149 is carried from earlier sections, not re-read today.
- Comp cancellation policies, band-listing sleeps and current lift/view/parking: NOT CHECKED today (carried from 25 Oct-15 Nov reads).
- **Smoobu was not called.** P12 20 Nov room (294) is the PriceLabs `final_price` from `get_neighbourhood_data`, not `prices.csv`. P04/P01/P09 20 Nov room values in the 20 Nov rows come from the 19 Nov `prices.csv` (today's file starts 21 Nov).
- NL percentiles: PriceLabs does not state the horizon, and the basis is a host-only fee on 1-3BR (P04, P01) or 2-3BR (P12). Read them as market bands, not like-for-like.
