# Competitor positioning: EAST batch (D = 2026-11-26)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy `intentional_blocks`). Not analysed.
- **P15** has no listing of ours. Reference only.
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec; P09 26 Nov, i.e. tonight, which is booked; P12 13 Dec). P09 and the P12 Christmas stays are comp trend only.

**Method** (same as 26 Oct-25 Nov; scripts copied from scratchpad `east25/bin` to `east26/bin`, only dates and paths changed, plus a `smoobu_price` column for P04)
- **Comp ids:** the same set as 25 Nov (P01 11, P04 7, P09 6, P12 7, P15 7). **No comp replaced today.**
  - P04 985683261536682900, 1733027244747346716 and 1387112821878102742: not returned on any of 34 stays (26 Nov-4 Jan), **seventh day running** (0.3 km box on each, 0 errors). Kept; inactivity NOT VERIFIED (no calendar read, January not searched). P04 has 4 live comps, below the 6 minimum (candidates under Data gaps).
  - Not returned on any stay today, kept as booked: P01 852256049507701872; P09 958156921765583815; P12 1670196516322802487 (third day); P15 1371771992549776701, 1528442618668335413, 1444741453093610023.
  - P12 29297702 still shows a placeholder-like price (about £1,035-1,050/n). Kept out of the medians (`nightly_gbp` blank, price in `source`).
- **Access:** public Airbnb search pages. 75 wide searches with pagination, 0 failures; then 467 comp/stay checks in a 0.3 km box, 9 hits, 0 errors. Box sizes: 2.5 km P04, 1.8 km P09, 1.3 km the rest. Search party 4 for 2BR, 3 for 1BR. Checked **2026-11-26 07:23:07-07:34:48Z** (plus a 1455 spot check at 07:24:54Z, same result). **Booking.com: NOT CHECKED.**
- **Price basis = what guests see:** Airbnb **guest-paid all-in total / nights**, after discounts, with cleaning and Airbnb fees **included**; no separate taxes shown. Ours priced the same way. PriceLabs/Smoobu figures (`prices.csv` 26 Nov, starts 27 Nov) are **room only, cleaning excluded**. Stays of 7+ nights include the 15% weekly discount (policy).
- **Stays (same dates for comps and us):** midweek **1-3 Dec** (Tue-Thu), next Fri-Sun **27-29 Nov**, 30 days out **26-28 Dec** (new today); trend stays 25-27, 24-26, 23-25, 20-22, 18-20 Dec.
  - P12, as asked: **30 Nov-3 Dec**, 30 Nov-4 Dec (the whole gap), 30 Nov-2, 1-3, 2-4 Dec; **26-27 Nov (tonight)**; 4-7 and 3-7 Dec (booked; closure check). **P12 open nights before the 13 Dec handback = 26 Nov (tonight) and 30 Nov-3 Dec (4 nights)** (`reservations.csv` 26 Nov).
  - P04, as asked: **10-14 Dec** (reopened), 10-13, 11-14, 6-14, 7-14 Dec; **7-10 Dec**, 6-9, 6-10; **14-22 Dec**, 14-17, 15-19, 16-19, **17-20**, 19-22; **20-26 Dec**, 20-23, 21-24, 23-26, 23-27, 24-27, 20-27; 2-3 Dec. Unsynced check on the booked stays: 26 Nov-2 Dec, 28 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan.
  - P01: **18-20 Dec**, 18-21, 19-21 Dec.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius; ours and >£1,000/n excluded; P04's 1531... operator units collapsed into one ("op").
- **"Supported room"** = band median x 0.85-1.00 (the `quality_premium` range), converted back to room price with each stay's own Airbnb all-in / PriceLabs room ratio. Approximate.
- **Data written:** `data/snapshots/2026-11-26/comps.csv` was absent; under `flock` on `.comps.csv.lock` I copied it forward from 25 Nov (22,416 lines, byte-identical, verified with `filecmp`). Other agents appended next (24,174 lines). Then, under the same lock, I **appended 1,164 rows**: 557 `comp-east` (every stored comp x stay; NOT RETURNED rows kept with a blank price), 440 `east-refband` (ref `Pxx:band`), 167 `east-ours` (ref `Pxx:ours`: Airbnb all-in rows, plus PriceLabs room rows that now carry both `pricelabs_price` and `smoobu_price`). File now 25,338 lines, all 11 columns.
- **PriceLabs (read-only, one call at a time, in this order):**
  1. `get_listing_date_overrides` P04, 26 Nov-10 Jan: **changed. 6-26 Dec is now min 3 with no price adjustment, updated 25 Nov 17:02:01Z.** That replaces 6-23 Dec -5% min 3 and 24-26 Dec +5% min 2. Others unchanged (26-30 Nov and 3-5 Dec -8% min 3; 1 Dec -2% min 4; 2 Dec +200% min 1; 27 Dec -5% min 7; 28-31 Dec -5% min 5; 1 Jan -2% min 4; 2-10 Jan -8% min 3).
  2. `get_user_logs` (listing; P01, P04, P09, P12; 25-26 Nov): **1 entry: Reyhan, 25 Nov 17:02:02Z, "Added Date Specific Override" on P04 6-26 Dec, price type fixed with no value, min 3.** That is what triggered the P04 push at 17:02:27Z. No entry for P12, P01 or P09.
  3. `get_listing_date_overrides` P12, 26 Nov-14 Dec: **unchanged** (26 Nov +15% min 1; 27-29 Nov -15% min 2; 30 Nov-6 Dec min 2, no price; 7-13 Dec min 3; 14 Dec -5% min 3).
  4. `get_neighbourhood_data` detail for P04, P12, P01: OK, saved to scratchpad `east26/dl/nd_*_detail.json`.
- **Smoobu: not called.** Room prices come from `prices.csv` (26 Nov). Reservations come from `reservations.csv` (26 Nov).
- **Pushes** (`listings.csv` 26 Nov): P04 25 Nov 17:02:27Z (Reyhan's edit); P12 26 Nov 06:23Z; P01 26 Nov 03:07Z; P09 26 Nov 04:38Z.

## What changed since 25 Nov (this batch)
**1. P04 10-14 Dec is open again on the synced Airbnb (the Booking.com cancellation): £627 for 4 nights (£156.75/n, struck from £712).** The unsynced 1455 sells the same 4 nights at **£754 (£188.50/n, struck from £866)**. Both were checked at 07:26:47Z (wide) and 07:24:54Z (box). **No double sale today**, because the flat is free on every channel. But two listings are now selling one flat for 6-20 Dec (below). That is day 27 of t-p04-doublebook.

**2. Reyhan's P04 edits are gone (25 Nov 17:02:02Z, by Reyhan).** 6-23 Dec -5% and 24-26 Dec +5% min 2 were replaced with "min 3, no price change" on 6-26 Dec. The two "confirm or revert" items from 25 Nov are therefore **reverted at source**. The 3-night floor is back on 24-26 Dec: 24-26 and 25-27 Dec are no longer bookable on Airbnb.
- **But the room did not go up on 14-22 Dec.** The PriceLabs room for 14-22 Dec is 141/143/145/148/152/158/156/155/154, against 140/143/146/149/153/158/155/155 on 25 Nov. Christmas fell with the +5% removed: 24-26 Dec went from 175/188 to 158/159.
- Airbnb totals moved: 7-10 Dec £517 -> **£540**; 6-9 Dec £518 -> £543; 17-20 Dec £494 -> £493; 14-22 Dec £1,027 (unchanged); **20-26 Dec £940 -> £902**.

**3. P04 has three different room prices for the same nights. The Airbnb card is the arbiter.**
- `prices.csv` `pricelabs_price` and `smoobu_price`, plus the raw PriceLabs file's `user_price`, disagree on 6-12 Dec and 23-26 Dec:
  - 6-9 Dec: PriceLabs 174/174/175, Smoobu 163/163/164, `user_price` 165/165/166.
  - 10-14 Dec: PriceLabs 175/155/156/147 = £633, Smoobu **165/174/156/147** = £642.
  - 26 Dec: PriceLabs 177, Smoobu 158.
- The neighbourhood `final_price` matches the Smoobu column.
- **The Airbnb cards moved with the PriceLabs column.** 6-9 Dec rose £25 on Airbnb, PriceLabs room +£32, Smoobu column flat. This suggests the live channel price follows `pricelabs_price` and the `smoobu_price` column is stale. NOT VERIFIED (channel agent).
- I priced P04 on the Airbnb card, as asked.

**4. P12 30 Nov-3 Dec repriced up after the 26 Nov 06:23Z refresh.** The room went 242/257/258 -> **274/273/279** (+£49 over 3 nights). On Airbnb, £730 (struck from £832) became **£782 with no strike-through**. 26 Nov (tonight) went from room 290 / Airbnb £347 to **room 301 / Airbnb £381 (struck from £426)**.

**5. P01 comps eased.** 41905186 came down on every December stay (18-20 Dec 419 -> 382; 23-25 Dec 682 -> 642). 1316210326145130709 on 18-21 Dec went 403 -> 378.33. P01 18-20 Dec is still `Blocked` (280/286).

**6. Comps otherwise held.** 106 of 146 like-for-like comp/stay prices are within £1 of 25 Nov. Other moves of £10 or more:
- P04 1577633201778145138: 1-3 Dec 287.5 -> 225; 2-3 Dec 350 -> 250; 6-9 Dec 248.33 -> 223.33.
- P04 1193087690344044898: 28 Nov-2 Dec 254 -> 213.5; 3-6 Dec 257.67 -> 240.67; 17-20 Dec 257.67 -> 268.33.
- P09 1376679869251315227: 24-26 Dec 205.5 -> 193.5.
- P15 1617544963466664181: 25-27 Dec 218 -> 195.5.

## PriceLabs market percentiles (`get_neighbourhood_data`, 26 Nov)
These are market bands, not comps. "Ours" = neighbourhood `final_price` (for P04 this equals the `smoobu_price` column). Compsets: P12 NL 2-3BR (135); P04 NL 1-3BR (189); P01 NL 1-3BR (283). Basis "Host-only fee"; horizon not stated; percentiles interpolated between P25/P50/P75/P90.

| Ref | 2BR summary P25/P50/P75/P90 (n) | Booked 30/60 vs market (`pl_kpis` 26 Nov) | Ours vs daily market (stay average P25/P50/P75/P90) |
|---|---|---|---|
| P12 | 168/203/230/290 (120) | 83% / 92% vs 43% / 32% | **26 Nov £301 (167/197/230/309): P88.** **30 Nov-3 Dec £275.33 (169/199/250/300): P83** (25 Nov P73). 30 Nov-4 Dec £277: P81. 2-4 Dec £280.5: P79. 4-7 Dec Booking.com paid £255.51/n: P67 |
| P04 | 141/174/210/247 (90) | **33% / 30%** (25 Nov 47% / 37%: the 10-14 Dec cancellation) vs 23% / 17% | 6-9 Dec £163.33 (`pricelabs_price` 174.33): P56. **7-10 Dec £162.67 (121/151/199.7/236.3): P56.** **10-14 Dec £160.5 (127.5/156.8/204.8/249.8): P52** (`pricelabs_price` £158.25: P49). 6-14 Dec £161.63: P54. **14-22 Dec £149 (129/156.6/204.2/238.2): P43.** **17-20 Dec £151.67 (134.3/160/209.3/238.7): P42.** **20-26 Dec £156.83 (131.3/163.7/208.3/264.2): P45** |
| P01 | n/a (1-3BR NL) | 100% / 100% vs 35% / 27% | **18-20 Dec (blocked) £283 (200/231.5/313/458.5): P66**; 18-21 Dec £271.33: P62 |

- `prices_with_default_customization` vs final (P04):
  - 7-10 Dec: £198.0 vs £162.7 (-18%).
  - 10-14 Dec: £186.2 vs £160.5 (-14%).
  - **14-22 Dec: £152.1 vs £149.0 (-2%; 25 Nov -20%).**
  - 17-20 Dec: £157.0 vs £151.7 (-3%).
  - 20-26 Dec: £167.0 vs £156.8 (-6%).
  - The default itself fell sharply on 14-26 Dec (14-22 Dec £186.9 -> £152.1), so removing the override did not lift the room. Why the default moved: NOT VERIFIED (pricelabs agent).
- P12: 26 Nov £165 default vs £301 final (+82%: the +15% override plus min 1). 30 Nov-3 Dec £252.3 vs £275.3 (+9%).

## Priority 1: P04 Barking
- **Quality:** `quality_premium(4.27, 4.83)` = **-0.15** (cap). Ours **4.27 from 11 reviews**; comp median 4.83 from 27 (gap 16). **Supported: -15% to 0% vs the band median.**
- Booked next 30/60: 33% / 30% vs market 23% / 17%.
- Overrides: 6-26 Dec min 3, no price (Reyhan 25 Nov 17:02Z); see Method.
- Open nights: 2 Dec (1 n, +200% min 1, deprioritised) and **6-26 Dec (21 nights, min 3)**. The cancellation leaves no orphan: 10-14 Dec joins the 6-26 Dec run.

### Unsynced Airbnb 1455876748739910219: what it sells now (asked)

| Listing | Stay | Airbnb total | £/n all-in | Status (checked 26 Nov) | Our nights (synced, `reservations.csv` 26 Nov) |
|---|---|---|---|---|---|
| 1455876748739910219 (unsynced, 4.69 (26)) | **10-14 Dec** | **£754** (struck from £866) | 188.50 | bookable (wide 07:26:47Z; box 07:24:54Z) | **open again (Booking.com 10-14 Dec cancelled)**; synced £627 |
| 1455 | 10-13 / 11-14 Dec | £601 / £597 | 200.33 / 199.00 | bookable | open; synced £514 / £493 |
| 1455 | 6-9, 6-10, 7-10 Dec | £590 / £744 / £585 | 196.67 / 186.00 / 195.00 | bookable | open; synced £543 / £673 / £540 |
| 1455 | 6-14, 7-14 Dec | £1,452 / £1,283 | 181.50 / 183.29 | bookable | open; synced £1,122 / £993 |
| 1455 | 14-17, 15-19, 16-19, **17-20**, 18-20 Dec | £578 / £748 / £595 / **£608** / £451 | 192.67 / 187.00 / 198.33 / 202.67 / 225.50 | bookable | open; synced 17-20 Dec £493; synced closed on 18-20 Dec (min 3) |
| 1455 | **any stay touching the night of 20 Dec or later** (19-22, 20-23, 21-24, 23-26, 20-26, 20-27, 14-22 Dec) | n/a | n/a | **not returned** (same as 25 Nov) | **open and selling on the synced listing** (e.g. 20-26 Dec £902) |
| 1455 | booked stays 26 Nov-2 Dec, 28 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan; 2-3 Dec | n/a | n/a | not returned (closed) | sold (2 Dec open, 1 n) |

- **Booked synced nights that 1455 still sells: none today.** On every booked P04 stay (25 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan) 1455 is not returned. 10-14 Dec was the only one, and it is free again.
- **Whether any of 1455 is booked: NOT VERIFIED.** It is closed for every night from 20 Dec, while the synced listing sells 20-26 Dec. That could be a booking on 1455 in the other Airbnb account, or a block or min-stay. **If it is a booking, the synced listing is selling nights already sold.** I could not read the 1455 calendar; the Airbnb calendar endpoint was refused by permissions, so only public search pages were read. Corentin should check the 1455 calendar in that account.
- **Overlap today:** both listings sell 6-20 Dec, so a booking on either one leaves the other selling. 1455 is priced 9-29% above the synced listing on the same dates (10-14 Dec £754 vs £627, +20%).

### Open December stays (asked: 10-14, 7-10, 14-22, 17-20 Dec)

| Stay | Ours, Airbnb all-in £/n (25 Nov) | PriceLabs room / Smoobu room | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n | Market pctl |
|---|---|---|---|---|---|---|---|
| **10-14 Dec** | **156.75** (£627 struck from £712; 25 Nov closed) | **175/155/156/147 / 165/174/156/147** | 195.5 (1), -19.8% | 199.38 (4), **-21.4%** | **P0** | **171-201 (+8% to +27%)** | **P52** |
| 10-13 Dec | 171.33 | 175/155/156 / 165/174/156 | 205.33 (1), -16.6% | 206.67 (4), -17.1% | P0 | 166-195 (+3% to +21%) | |
| 11-14 Dec | 164.33 | 155/156/147 / 174/156/147 | 206.67 (1), -20.5% | 205 (4), -19.8% | P0 | 162-190 (+6% to +25%) | |
| 6-14 Dec (8 n, weekly) | 140.25 (£1,122 struck from £1,337) | avg 165.88 / 161.63 | 162.12 (1), -13.5% | 146 (3), -3.9% | P0 | 147-173 (-12% to +4%) | P54 |
| 6-9 Dec | 181.00 (172.67) | 174/174/175 / 163/163/164 | 222 (3), -18.5% | 196.67 (5), -8.0% | P40 | 161-189 (-8% to +9%) | P56 |
| **7-10 Dec** | **180.00** (172.33) | **174/175/171 / 163/164/161** | 208.67 (2), -13.7% | 197.83 (6), **-9.0%** | P33 | **162-190 (-7% to +10%)** | **P56** |
| 14-17 Dec | 157.00 (157.00) | 141/143/145 | 236.5 (4), -33.6% | 222 (7), -29.3% | P14 | 172-202 (+20% to +41%) | |
| **14-22 Dec (8 n)** | **128.38** (128.38; £1,027 struck from £1,221) | 141/143/145/148/152/158/156/155 | 207 (1), **-38.0%** | 177.31 (4), **-27.6%** | P25 | 176-207 (+17% to +38%, incl. weekly 15%) | **P43** |
| 15-19 Dec | 148.00 (148.75) | 143/145/148/152 | 253.75 (3), -41.7% | 227.88 (6), -35.1% | P0 | 192-226 (+31% to +54%) | |
| 16-19 Dec | 161.00 (161.67) | 145/148/152 | 259.67 (3), -38.0% | 216.5 (4), -25.6% | P0 | 170-199 (+14% to +34%) | |
| **17-20 Dec** | **164.33** (164.67) | **148/152/158** | 245.16 (2), **-33.0%** | 231 (4), **-28.9%** | **P0** | **182-215 (+19% to +41%)** | **P42** |
| 19-22 Dec | 167.00 (167.00) | 158/156/155 | 222 (1), -24.8% | 222 (3), -24.8% | P0 | 177-208 (+13% to +33%) | |

- **10-14 Dec: about +15% supported** (room about £182/n, all-in about £180/n). It is P0 against both stored and band, -20% to -21%, with 3-night sub-stays at -17% to -20%. Market P52. Our own 1455 gets £188.50/n for the same nights. The PriceLabs/Smoobu split on 10-11 Dec (175/155 vs 165/174) is £9 over 4 nights and does not change the conclusion.
- **7-10 Dec: hold to +5%** (about -9% vs band, supported -7% to +10%).
- **14-22 Dec and 17-20 Dec: about +20%** (room about £170-185/n). P0-P25, -28% to -29% vs band op, market P42-P43. Unchanged since 25 Nov. Removing Reyhan's -5% did not lift the room.
- **`recommend`:** 30-day 33% vs 23% at P0 with quality -0.15 = **raise +10%**; 31-60-day 30% vs 17% = **raise +10%**. I adopted the larger sizes above for 10-22 Dec, because the comp gap is wider than the formula step. 6-10 Dec 0 to +5%.

### Christmas (asked: 20-26 Dec)

| Stay | Ours, Airbnb all-in £/n (25 Nov) | PriceLabs room | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n | Market pctl |
|---|---|---|---|---|---|---|---|
| **20-26 Dec (6 n)** | **150.33** (156.67; £902 struck from £987) | 156/155/154/156/158/159 = £938 (Smoobu £941; 25 Nov £984) | 226 (1), -33.5% | 206.33 (4), **-27.1%** | **P0** | 182-215 (+17% to +37%) | **P45** |
| 20-23 Dec | 166.00 (165.67) | 156/155/154 | 222 (1), -25.2% | 222 (3), -25.2% | P0 | 176-207 (+14% to +34%) | |
| 21-24 Dec | 166.00 (166.33) | 155/154/156 | 222 (1), -25.2% | 218.67 (5), -24.1% | P0 | 174-204 (+12% to +32%) | |
| 23-26 Dec | 175.33 (196.33) | 156/158/159 | 230 (1), -23.8% | 214.67 (4), -18.3% | P0 | 164-193 (+4% to +22%) | |
| 23-27 Dec | 171.25 (189.00) | 156/158/159/177 | 231 (1), -25.9% | 211.5 (4), -19.0% | P0 | 171-201 (+5% to +24%) | |
| 24-27 Dec | 188.67 (212.00) | 158/159/177 | 251.16 (2), -24.9% | 234 (5), -19.4% | P0 | 174-204 (+5% to +24%) | |
| 24-26 / 25-27 Dec (2 n) | **not bookable** (25 Nov £228 / £232.50): min 3 restored | 158/159 ; 159/177 | 234 (1) | 212 (5) / 210 (3) | | | |
| 20-27 Dec (7 n) | 137.86 (143.57; £965 struck from £1,146) | avg 159.29 | 211.71 (1), -34.9% | 180.71 (2), -23.7% | P0 | 177-209 (incl. weekly 15%) | |

- **20-26 Dec: about +20% on the 6-night stay** (room about £185/n), **with 23-26 Dec about +10%**. Christmas fell another 4% on Airbnb overnight (£940 -> £902), because Reyhan's +5% on 24-26 Dec was removed along with the -5%. 23-26 Dec went from the band median (P50) yesterday to P0 today (-18%).

### 2 Dec (1 n, +200% min 1; deprioritised in policy)
- Bookable on the synced Airbnb at **£454** (room £424 PriceLabs / £403 Smoobu). Band op £230 (n 3). Reported only.

## Priority 2: P12 Mile End (26 Nov tonight; 30 Nov-3 Dec)
- **Quality:** `quality_premium(4.27, 4.875)` = **-0.15** (cap). Ours 4.27 from 15 reviews; stored-comp median 4.875 from 25 (gap 10). **Supported: band median x 0.85-1.00.**
- Booked next 30/60: 83% / 92% vs market 43% / 32% (`pl_kpis` 26 Nov; now includes the 4-7 Dec rebook).
- Open nights before the 13 Dec handback: **26 Nov** (tonight, 1 n, min 1) and **30 Nov-3 Dec** (4 n, min 2). 4-7 Dec is closed on Airbnb (correct; `prices.csv` now shows it `Booked`).

| Stay | Ours, Airbnb all-in £/n (25 Nov) | PriceLabs room (25 Nov) | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room | Move vs PriceLabs | Market pctl |
|---|---|---|---|---|---|---|---|
| **26-27 Nov (tonight)** | **381** (347; £381 struck from £426) | **301** (neighbourhood final; 290), min 1 | 270 (7), **P100, +41.1%** | 283 (2), P100, +34.6% | **181-213** | **-40% to -29%** | **P88** |
| **30 Nov-3 Dec** | **260.67** (243.33; £782, no strike) | **274/273/279** (242/257/258) | 262.67 (9), P44, -0.8% | 250.67 (5), P60, +4.0% | 236-277 | **-14% to +1%** | **P83** |
| 30 Nov-4 Dec (whole gap, 4 n) | 249.50 (233.00; £998) | 274/273/279/282 | 269.5 (7), P29, -7.4% | 277.5 (3), P33, -10.1% | 254-299 | -8% to +8% | P81 |
| 30 Nov-2 Dec | 272.00 (253.50; £544 struck from £618) | 274/273 | 237.5 (7), P86, +14.5% | 254 (3), P67, +7.1% | 203-239 | -26% to -13% | |
| 1-3 Dec (midweek default) | 274.00 (259.50) | 273/279 | 263 (5), P60, +4.2% | 254 (3), P67, +7.9% | 225-265 | -18% to -4% | |
| 2-4 Dec | 277.50 (263.00; £555 struck from £630) | 279/282 | 265.5 (6), P67, +4.5% | 268 (2), P50, +3.5% | 228-268 | -19% to -4% | P79 |
| 4-7 / 3-7 Dec | closed on Airbnb (Booking.com £766.54 = £255.51/n) | 303/314/291 (`Booked`) | 312.33 (3) / 270.25 (4) | n/a (0) | | | paid = P67 |

- **26 Nov (tonight): about -30% supported** (room about £210, all-in about £265). It is P100, +41% vs band (n 7) and P88 in the market, and it rose overnight (290 -> 301; Airbnb +£34). The +15% override (set 4 Nov) holds it up: the default-customisation price is £165. **t-p12-26nov-price: not fixed (day 9)**. It is the last chance: the night is tonight.
- **30 Nov-3 Dec: about -5%** (room about £260/259/265). The 3-night stay is at the band (-1%), but the overnight +£49 moved the market percentile from P73 to P83. The 2-night sub-stays are +4% to +15% vs band. The whole 4-night gap (-7% vs band, supported -8% to +8%) supports holding, so -5% is the evidence-weighted middle, not a cut.
- **`recommend`:** both horizons return a mechanical **raise +10%** (30-day 83% vs 43%, 60-day 92% vs 32%, median comp percentile P64 over 6 open stays). **Not adopted.** The lead comes from nights already sold. The open stays sit at or above the band median against a quality ceiling of 0%. The raise branch ignores a negative `quality_premium`. Nothing after 13 Dec can be sold.

## Priority 3: P01 Bowsprit Point 18-20 Dec (blocked, before the 20 Dec handback)
- **Still blocked:** 18-20 Dec `Blocked`, 280/286, min 3 (25 Nov 280/290). Not returned on Airbnb.
- **Comps:** 18-20 Dec stored **£382** (3; 25 Nov £419), band £379 (8). 18-21 Dec stored £369.67 (7), band £346.66 (14). 19-21 Dec stored £372 (3), band £369.25 (6). The fall is mostly 41905186 (0.38 km, 4.38 (34)) coming back down.
- **If reopened** at today's 280/286/248 plus £149 cleaning (carried figure), before any Airbnb guest fee:
  - 18-20 Dec: £357.50/n, -6.4% vs stored, -5.7% vs band.
  - 18-21 Dec: £321/n, -13.2% vs stored, -7.4% vs band.
  - 19-21 Dec: £341.50/n, -8.2% vs stored, -7.5% vs band.
  - PriceLabs NL: P66 (18-20 Dec) and P62 (18-21 Dec).
- **Supported: about -2% vs the comp median** (`quality_premium(4.75, 4.8)` = -0.02, on only 4 reviews). That is about +4% to +8% above today's room, with **+5% adopted** (unchanged). The Airbnb guest fee is not in our estimate.
- **For Corentin (carried policy conflict):** the handback policy says "before the date, maximise revenue normally", but £814 of room nights (280 + 286 + 248) stay blocked.

## Priority 4: P09 Torrent Lodge
- **Tonight (26 Nov) is booked** (Airbnb 15-27 Nov). 27 Nov onwards is blocked by the handback. Nothing to position.
- Comps (trend only): 1-3 Dec stored median £188.5 (3). `quality_premium(5.0, 4.56)` = +0.15, on only 3 reviews. `recommend`: raise-signal (30-day 100% vs market 40%).

## Summary per property
| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30/60 vs market | `recommend` | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (18-20 Dec blocked) | stored 369.67-382 (n 3-7) on 18-21 Dec | n/a (would be -6% to -13% stored, -6% to -7% band) | 4.75 vs 4.8 | 4 vs 30 (-26) | -0.02 | 100%/100% vs 35%/27% | raise-signal | **-2% vs median**: if reopened, about +5% on the room |
| P04 (synced 1657...) | **10-14 Dec 156.75**; 7-10 Dec 180; **14-22 Dec 128.38 (8 n)**; **17-20 Dec 164.33**; **20-26 Dec 150.33** | stored 162-260 (n 1-4); band op 146-231 (n 2-7) | P0 stored on every open stay; band op P0-P40 | **4.27** vs 4.83 | 11 vs 27 (-16) | -0.15 | 33%/30% vs 23%/17% | raise +10% (both horizons) | **-15% to 0% vs band. 10-14 Dec about +15%; 14-22 and 17-20 Dec about +20%; 20-26 Dec about +20% (23-26 Dec +10%); 6-10 Dec 0 to +5%** |
| P04 unsynced 1455... | 181.5-225.5 on 6-20 Dec; nothing from 20 Dec | | | 4.69 | 26 | n/a | | | map, close or unlist; check its calendar from 20 Dec |
| P09 | tonight booked; then handback | 168-248 (n 1-3) | n/a | 5.0 vs 4.56 | 3 vs 25 (-22) | +0.15 | 100%/100% vs 40%/29% | raise-signal | nothing before the handback |
| P12 | open 249.5-381 | band 237.5-270; stored 250.67-283 | 26 Nov P100; 30 Nov-3 Dec P60 stored / P44 band; 30 Nov-4 Dec P33 / P29 | 4.27 vs 4.875 | 15 vs 25 (-10) | -0.15 | 83%/92% vs 43%/32% | raise +10% (P64): **not adopted** | **-15% to 0% vs band. 26 Nov about -30%; 30 Nov-3 Dec about -5%** |
| P15 | no listing of ours | 140.5-175.25 (n 2-4) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 26 Nov)
| Item | Status |
|---|---|
| **t-p04-doublebook** | **Exposure changed (day 27):** no booked synced night is sold on 1455 today (10-14 Dec was cancelled, so it is now open on both). 1455 still sells 6-20 Dec alongside the synced listing (10-14 Dec £754 vs £627). **New question:** 1455 is closed from 20 Dec while the synced listing sells 20-26 Dec. If that closure is a booking, it is a double sale. Its calendar is NOT VERIFIED. |
| a-reyhan-2011 (P04 part) | **Reverted by Reyhan, 25 Nov 17:02:02Z:** 6-26 Dec is now min 3 with no price. 24-26 Dec min 2 is gone. Corentin only needs to note it. |
| a-p04-dec-1611 | The -5% is gone, but the 14-22 Dec room did not rise (the default price fell; NOT VERIFIED why). 10-22 Dec is still P0, -20% to -35% vs band op; +15% to +20% supported. 7-10 Dec 0 to +5%. |
| t-p04-xmas-1711 | 20-26 Dec room £938 (25 Nov £984); Airbnb £902 (P0, -27% vs band op). About +20% supported; 23-26 Dec about +10%. |
| a-p12-trim | 30 Nov-3 Dec repriced +£49 overnight (market P73 -> P83): about -5% supported. |
| t-p12-26nov-price | **Not fixed (day 9):** room 290 -> 301, Airbnb £381 (P100, +41% vs band, market P88) for tonight. About £210 room is supported. |
| t-p01-1820block | **Not fixed** (still `Blocked`). For Corentin. |

## Critical / high findings
- **HIGH: P04 10-14 Dec (reopened) is P0 vs comps.** £156.75/n all-in vs £199.38 band op (n 4), -21.4%; market P52. About +15% supported. Our own unsynced 1455 sells the same nights at £188.50/n.
- **HIGH: P04 unsynced 1455 overlap.** It sells 6-20 Dec alongside the synced listing, and it is closed from 20 Dec while the synced listing sells 20-26 Dec (£902). If 1455 is booked there, that is a double sale. NOT VERIFIED. No booked synced night is sold on 1455 today.
- **HIGH: P04 14-26 Dec is P0 vs comps:**
  - 17-20 Dec: £164.33/n vs £231 band op (n 4), -28.9%.
  - 14-22 Dec: £128.38/n vs £177.31 (n 4), -27.6%.
  - 20-26 Dec: £150.33/n vs £206.33 (n 4), -27.1%.
  - Market P42-P45. About +20% supported. Removing the -5% override did not lift these prices.
- **HIGH: P12 26 Nov (tonight) £301 room / £381 all-in is P100**, +41% vs band (n 7), market P88. About £210 room is supported (day 9).
- **HIGH (for Corentin, carried): P01 18-20 Dec still blocked.** Reopened at today's prices it would sit 6-7% below the band and 6-13% below stored comps; £814 of room nights held.
- **MEDIUM: Reyhan reverted the P04 6-23 Dec -5% and 24-26 Dec +5% min 2** (25 Nov 17:02:02Z; now min 3, no price on 6-26 Dec).
- **MEDIUM: P04 room prices disagree across sources** (6-9 Dec 174 PriceLabs vs 163 Smoobu vs 165 `user_price`; 10-11 Dec 175/155 vs 165/174). The Airbnb cards track the PriceLabs column. NOT VERIFIED (channel agent).
- **MEDIUM: P12 30 Nov-3 Dec repriced +£49** (market P83, band -1%): about -5% supported.

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-26 07:23-07:35Z.
- "25 Nov x" = the same comp and stay on 25 Nov, where the two differ by more than £1.
- `*` = found by the 0.3 km second pass.
- "–" = not returned in the wide search or the 0.3 km box (booked or unavailable).
- "(earlier read)" = km from an earlier day; the comp was not returned today.
- Full source for every row: `data/snapshots/2026-11-26/comps.csv` (`comp-east`, `east-refband`, `east-ours`).
- Cancellation policy: NOT CHECKED. Differentiators come from listing-page reads on 25 Oct-15 Nov.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, search party 4

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 27 Nov-29 Nov | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Dec-28 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | – | – | 348.33 | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | – | – | 494 (25 Nov 497) | 549 (25 Nov 575) | 642* (25 Nov 682) | 472 (25 Nov 500) | 382 (25 Nov 419) | – | 369.67 (25 Nov 414.33) | 372 (25 Nov 407) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.43 (166) | none listed | – | – | – | – | – | 195.5 (25 Nov 197.5) | – | – | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (57) | Lift | – | – | – | – | – | – | – | – | 378.33 (25 Nov 403) | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 (earlier read) | 6 | 4.6 (30) | Lift/River view/balcony | – | – | – | – | – | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking/River view/balcony | – | – | – | – | – | – | – | – | 382.67 | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (22) | Skyline view/Free parking/Lift/Superhost/balcony/Guest fav | 363.5 (25 Nov 353.5) | – | – | – | – | – | – | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | 308.5 | – | 395.5 | 376 | 357 | 357 | 376 | 410 | 369.67 | 366.5 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.83 (18) | Lift | – | – | 335 | 335 | 335 | – | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (45) | Lift/patio or balcony/Superhost/Guest fav | – | – | 601.5 | 590 | 539.5 | 539.5* | 528 | 545.5 | 524 | 534 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost | – | – | – | – | – | – | – | – | 281 | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **336** (2) | n/a (0) | **444.75** (4) | **462.5** (4) | **448.25** (4) | **414.5** (4) | **382** (3) | **477.75** (2) | **369.67** (7) | **372** (3) |
| **Band median (n)** | | | | | 264.75 (8) | 310 (1) | 399.5 (8) | 383 (10) | 373.5 (8) | 319.25 (8) | 379 (8) | 410 (5) | 346.66 (14) | 369.25 (6) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.27 (11); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, search party 4

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 27 Nov-29 Nov | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Dec-28 Dec | 26 Nov-2 Dec | 28 Nov-2 Dec | 2 Dec-3 Dec | 3 Dec-6 Dec | 6 Dec-9 Dec | 6 Dec-10 Dec | 7 Dec-10 Dec | 10 Dec-14 Dec | 10 Dec-13 Dec | 11 Dec-14 Dec | 6 Dec-14 Dec | 7 Dec-14 Dec | 14 Dec-17 Dec | 14 Dec-22 Dec | 15 Dec-19 Dec | 16 Dec-19 Dec | 17 Dec-20 Dec | 19 Dec-22 Dec | 20 Dec-23 Dec | 21 Dec-24 Dec | 23 Dec-26 Dec | 23 Dec-27 Dec | 24 Dec-27 Dec | 20 Dec-26 Dec | 20 Dec-27 Dec | 27 Dec-4 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | – | – | – | – | – | – | 205.83 | 213.5 (25 Nov 254) | – | 240.67 (25 Nov 257.67) | – | – | – | – | – | – | – | – | 251 (25 Nov 257.67) | – | 253.75 | 259.67* (25 Nov 257.67) | 268.33 (25 Nov 257.67) | – | – | – | – | – | 268.33 (25 Nov 260) | – | – | – |
| [985683261536682900](https://www.airbnb.co.uk/rooms/985683261536682900) | 0.61 (earlier read) | 5 | 4.82 (17) | Paid street parking/Superhost | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 (earlier read) | 5 | 5.0 (28) | Free parking/Superhost/Guest fav | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.76 (42) | Free parking/Superhost | 225 (25 Nov 287.5) | – | – | – | – | – | – | 240 | – | – | 250 (25 Nov 350) | – | 223.33* (25 Nov 248.33) | – | – | – | – | – | – | – | 265 | – | 267.5 | 273.33 | – | – | – | – | – | – | – | – | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | 222 | – | 234 | 234 | 228 | 222 | 222 | – | – | – | 222 | – | 222 | 222 | 222 | – | – | – | – | – | 222 | 207 | 222 | 222* | 222 | 222 | 222 | 222 | 230 | 231 | 234 | 226 | 211.71 | – |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 (earlier read) | 6 | 4.85 (27) | Parking (in name) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (18) | Free street parking/Superhost | 208 | – | – | – | – | – | – | – | – | – | – | – | 195.33 (25 Nov 198) | 187 (25 Nov 190) | 195.33 (25 Nov 199.33) | 195.5 | 205.33 | 206.67 | 162.12 | 164.57 | 199.33 | – | – | – | – | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **454** | not bookable | **181** | **168.25** | **180** | **156.75** | **171.33** | **164.33** | **140.25** | **141.86** | **157** | **128.38** | **148** | **161** | **164.33** | **167** | **166** | **166** | **175.33** | **171.25** | **188.67** | **150.33** | **137.86** | not bookable |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **225.5** | not bookable | not bookable | not bookable | not bookable | not bookable | **196.67** | **186** | **195** | **188.5** | **200.33** | **199** | **181.5** | **183.29** | **192.67** | not bookable | **187** | **198.33** | **202.67** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **222** (3) | n/a (0) | **234** (1) | **234** (1) | **228** (1) | **222** (1) | **222** (1) | **240** (1) | **205.83** (1) | **213.5** (1) | **236** (2) | **240.67** (1) | **222** (3) | **204.5** (2) | **208.67** (2) | **195.5** (1) | **205.33** (1) | **206.67** (1) | **162.12** (1) | **164.57** (1) | **236.5** (4) | **207** (1) | **253.75** (3) | **259.67** (3) | **245.16** (2) | **222** (1) | **222** (1) | **222** (1) | **230** (1) | **231** (1) | **251.16** (2) | **226** (1) | **211.71** (1) | n/a (0) |
| **Band median (n)** | | | | | 216 (6) | n/a (0) | 210 (3) | 212 (5) | 221 (4) | 222 (3) | 218 (2) | 218 (4) | 220.42 (2) | 223.62 (2) | 230 (3) | 240.67 (1) | 196.67 (5) | 190 (5) | 197.83 (6) | 199.38 (4) | 206.67 (4) | 205 (4) | 146 (3) | 160.72 (4) | 222 (7) | 177.31 (4) | 227.88 (6) | 216.5 (4) | 231 (4) | 222 (3) | 222 (3) | 218.67 (5) | 214.67 (4) | 211.5 (4) | 234 (5) | 206.33 (4) | 180.71 (2) | 180.25 (1) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | – | – | – | P100 (+92.4%) | – | P0 (-18.5%) | P0 (-17.7%) | P0 (-13.7%) | P0 (-19.8%) | P0 (-16.6%) | P0 (-20.5%) | P0 (-13.5%) | P0 (-13.8%) | P0 (-33.6%) | P0 (-38.0%) | P0 (-41.7%) | P0 (-38.0%) | P0 (-33.0%) | P0 (-24.8%) | P0 (-25.2%) | P0 (-25.2%) | P0 (-23.8%) | P0 (-25.9%) | P0 (-24.9%) | P0 (-33.5%) | P0 (-34.9%) | – |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, search party 3

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 27 Nov-29 Nov | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Dec-28 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | – | – | – | – | – | 168 | 170 (25 Nov 168) | – |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | – | – | – | – | – | 165.5 | 165 | – |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.7 (23) | none listed | 148.5 | – | – | 193.5 (25 Nov 205.5) | – | – | – | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest fav | 248.5 | – | 248.5 | 248.5 | 248.5 | 248.5 | 248.5 | – |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | 188.5 (25 Nov 194) | – | 229.5 (25 Nov 232.5) | 212 (25 Nov 215.5) | 203.5 (25 Nov 206.5) | – | – | 248 |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 (earlier read) | 3 | 4.75 (16) | Skyline view/balcony | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **188.5** (3) | n/a (0) | **239** (2) | **212** (3) | **226** (2) | **168** (3) | **170** (3) | **248** (1) |
| **Band median (n)** | | | | | 180 (7) | n/a (0) | 248.5 (5) | 212 (7) | 135 (5) | 192.5 (7) | 211.25 (6) | 258.5 (2) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, search party 4

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 27 Nov-29 Nov | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Dec-28 Dec | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 30 Nov-2 Dec | 2 Dec-4 Dec | 4 Dec-7 Dec | 3 Dec-7 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.5 | 237.5 | 337.5 | 337.5 | 337.5 | 287.5 | 237.5 | 337.5 | – | 225 | – | 237.5 | – | – | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking | – | – | – | – | – | – | – | – | – | 283.33 | 277.5 | – | – | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (80) | Superhost | – | – | – | – | – | – | – | – | – | 187.67 (25 Nov 194.67) | – | – | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 (earlier read) | 6 | 4.94 (16) | Superhost/Guest fav | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (121) | Superhost/balcony/Guest fav | 254 | – | – | – | – | – | – | – | 284 | 250.67 | 243.75 | 254 | 254 | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1 | 6 | 4.54 (13) | Paid parking/balcony (placeholder price, excluded) | 1035 (25 Nov 1044.5) | 1035 | 1035 | 1035 | 1035 | 1041 (25 Nov 1035) | 1050.5 (25 Nov 1035) | 1035 | – | 1032.33 (25 Nov 1038.67) | 1032 (25 Nov 1035.75) | 1035 (25 Nov 1044.5) | 1037 (25 Nov 1035) | 1042 (25 Nov 1032.33) | 1039.25 (25 Nov 1031) |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift | 282 | – | – | – | – | 283.5 (25 Nov 282) | – | – | 282 | 282 | 282 | 282* | 282 | – | – |
| **Ours** | | | | | **274** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **381** | **260.67** | **249.5** | **272** | **277.5** | not bookable | not bookable |
| **Comp median (n)** | | | | | **254** (3) | **237.5** (1) | **337.5** (1) | **337.5** (1) | **337.5** (1) | **285.5** (2) | **237.5** (1) | **337.5** (1) | **283** (2) | **250.67** (5) | **277.5** (3) | **254** (3) | **268** (2) | n/a (0) | n/a (0) |
| **Band median (n)** | | | | | 263 (5) | 295 (2) | 313.5 (11) | 304.5 (13) | 295.25 (12) | 253.75 (12) | 322.5 (7) | 309 (7) | 270 (7) | 262.67 (9) | 269.5 (7) | 237.5 (7) | 265.5 (6) | 312.33 (3) | 270.25 (4) |
| **Our pctl (vs comp median)** | | | | | P67 (+7.9%) | – | – | – | – | – | – | – | P100 (+34.6%) | P60 (+4.0%) | P33 (-10.1%) | P67 (+7.1%) | P50 (+3.5%) | – | – |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, search party 3

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 27 Nov-29 Nov | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Dec-28 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 195.5 (25 Nov 218) | 183 | 170.5 | 170.5 | 195.5 | 203 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 (earlier read) | 4 | 4.93 (14) | Superhost/Guest fav | – | – | – | – | – | – | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.81 | 3 | 4.87 (15) | Paid parking/Superhost | 135 | – | 160 | 147.5 | 135 | 135 | 160 | 147.5 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.85 (earlier read) | 4 | 4.71 (14) | Lift/Paid parking | – | – | – | – | – | – | – | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.84 | 4 | 4.92 (25) | Free parking/Guest fav | 145 | – | – | 181 | – | – | – | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (204) | Garden view/Lift/Paid parking off/Superhost | 140.5 | – | 140.5 | 145.5 | 150.5 | 155.5* | 160.5 | – |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.03 (earlier read) | 4 | 4.64 (14) | Lift | – | – | – | – | – | – | – | – |
| **Comp median (n)** | | | | | **140.5** (3) | n/a (0) | **160** (3) | **164.25** (4) | **150.5** (3) | **155.5** (3) | **160.5** (3) | **175.25** (2) |
| **Band median (n)** | | | | | 134.5 (9) | 150 (1) | 183.5 (6) | 181 (9) | 170.5 (7) | 163.75 (6) | 160.5 (5) | 175 (5) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings (Airbnb only).
- **1455's own calendar and bookings: NOT VERIFIED.** Only public search pages were read; the Airbnb calendar endpoint was refused by permissions. Its closure from 20 Dec is unexplained.
- **P04 comp set is below the 6-comp minimum in practice:** 4 of 7 stored comps were returned on any stay. 985683261536682900, 1733027244747346716 and 1387112821878102742 have not been returned for 7 days on any stay 26 Nov-4 Jan. Inactivity is NOT VERIFIED, so they are not replaced. Stored n = 1-4 per stay; band op n = 2-7. Replacement candidates are carried from 25 Nov and not re-read today: 1072316558208098643, 43709205, 1245634494660468861, 934755638180855305.
- **P04 room price source conflict:** `pricelabs_price`, `smoobu_price` and the raw `user_price` disagree on 6-12 and 23-26 Dec. Which one Smoobu holds now is NOT VERIFIED (Smoobu not called). The Airbnb card was used as instructed. Why the default price fell on 14-26 Dec is also NOT VERIFIED.
- P12 26 Nov is not in `prices.csv` (it starts 27 Nov), so the room is the neighbourhood `final_price` £301.
- P12 stored-comp coverage is thin: 2-5 of 6 usable comps per open stay; 1670196516322802487 not returned for a third day (kept).
- The Airbnb strike-throughs on 3-4-night stays (P04 10-14 Dec £712 -> £627, about -12%), and why the P04 Airbnb all-in on 10-14 Dec is below the PriceLabs room alone (£627 vs £633): NOT VERIFIED (channel agent).
- Kept as booked, not inactive (not returned on any stay today): P01 852256049507701872; P09 958156921765583815; P15 1371771992549776701, 1528442618668335413, 1444741453093610023.
- P04 4-10 Jan and P12 January were not priced against comps. The P01 cleaning fee of £149 is carried, not re-read.
- Comp cancellation policies, band-listing sleeps and current lift/view/parking: NOT CHECKED today (carried from the 25 Oct-15 Nov reads).
- NL percentiles: horizon not stated, host-only-fee basis, 1-3BR (P04, P01) or 2-3BR (P12). These are market bands, not like-for-like.
