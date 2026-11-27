# Competitor positioning: EAST batch (D = 2026-11-27)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy `intentional_blocks`). Not analysed.
- **P15** has no listing of ours. Reference only.
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec; P09 26 Nov, now passed; P12 13 Dec). P09 and the P12 Christmas stays are comp trend only.

**Method** (same as 26 Oct-26 Nov; scripts copied from scratchpad `east26/bin` to `east27/bin`, only dates, paths and our P04 rating changed)
- **Comp ids:** the same set as 26 Nov (P01 11, P04 7, P09 6, P12 7, P15 7). **No comp replaced today.**
  - **P04 985683261536682900 is back:** returned on 4-6 Dec at £225/n (0.61 km, 4.82 (17), Superhost), after 7 days with no stay returned. It is active, so it stays.
  - P04 1733027244747346716 and 1387112821878102742: not returned on any of 34 stays (28 Nov-4 Jan), **eighth day**. Each was checked in a 0.3 km box with 0 errors. Kept; inactivity NOT VERIFIED. P04 has 5 live comps, below the 6 minimum.
  - Not returned on any stay today, kept as booked: P01 852256049507701872; P09 958156921765583815; P12 1670196516322802487 (fourth day); P15 1371771992549776701, 1528442618668335413, 1444741453093610023.
  - P12 29297702 still shows a placeholder-like price (about £1,032-1,054/n). Kept out of the medians (`nightly_gbp` blank, price in `source`).
- **Access:** public Airbnb search pages. 78 wide searches with pagination, 0 failures. Then 495 comp/stay checks in a 0.3 km box: 8 hits, 0 errors. Box sizes: 2.5 km for P04, 1.8 km for P09, 1.3 km for the rest. Search party 4 for 2BR, 3 for 1BR. Checked **2026-11-27 07:20:03-07:38:30Z**. A 1455/1657 spot check followed at 07:39:00-07:39:14Z (10 rows). **Booking.com: NOT CHECKED.**
- **Price basis = what guests see:** the Airbnb **guest-paid all-in total divided by nights**, after discounts, with cleaning and Airbnb fees **included**. No separate taxes are shown. Ours is priced the same way. PriceLabs/Smoobu figures (`prices.csv` 27 Nov) are **room only, cleaning excluded**; today the two columns agree on every night in this batch. Stays of 7+ nights include the 15% weekly discount (policy).
- **Stays (same dates for comps and us):**
  - Defaults: midweek **1-3 Dec** (Tue-Thu); next Fri-Sun **4-6 Dec** (new; 27-29 Nov is tonight); 30 days out **27-29 Dec** (new). Trend stays: 18-20, 20-22, 23-25, 24-26, 25-27 and 26-28 Dec.
  - P04, as asked:
    - **10-13 Dec as sold**, plus 10-14 and 11-14 Dec.
    - **13-14 Dec** (the 1-night gap) and 13-16 Dec.
    - **14-22 Dec**, plus 14-17, 15-19, 16-19, **17-20** and 19-22 Dec.
    - **20-26 Dec**, plus 20-23, 21-24, 23-26, 23-27, 24-27 and 20-27 Dec.
    - 6-9, 6-10, 7-10 and 2-3 Dec.
    - Closure checks on booked stays: 28 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan.
  - P12: **30 Nov-3 Dec**, 30 Nov-4 Dec, 30 Nov-2 Dec, 2-4 Dec; 4-7 and 3-7 Dec are booked (closure check).
  - P01: **18-20 Dec**, 18-21 and 19-21 Dec.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius. Ours and listings above £1,000/n are excluded. P04's 1531... operator units count as one ("op").
- **"Supported room"** = band median x 0.85-1.00 (the `quality_premium` range), converted back to a room price with each stay's own Airbnb all-in / room ratio. This is approximate.
- **Data written:** `data/snapshots/2026-11-27/comps.csv` was absent at 07:2xZ.
  - Under `flock` on `.comps.csv.lock` I copied it forward from 26 Nov (25,338 lines, byte-identical, checked with `filecmp`).
  - Under the same lock I **appended 1,189 rows**: 581 `comp-east` (every stored comp x stay; NOT RETURNED rows kept with a blank price), 436 `east-refband` (ref `Pxx:band`) and 172 `east-ours` (ref `Pxx:ours`: Airbnb all-in rows plus PriceLabs room rows).
  - I then appended **10 spot-check rows** (`P04:ours`, 1455/1657).
  - Other agents appended between my writes. The file now has 28,357 records, all with 11 columns.
- **PriceLabs (read-only, one call at a time, in this order):**
  1. `get_listing_date_overrides` P04, 27 Nov-10 Jan: **unchanged since 26 Nov.** 6-26 Dec min 3 with no price (Reyhan, 25 Nov 17:02Z); 27-30 Nov and 3-5 Dec -8% min 3; 1 Dec -2% min 4; 2 Dec +200% min 1; 27 Dec -5% min 7; 28-31 Dec -5% min 5; 1 Jan -2% min 4; 2-10 Jan -8% min 3.
  2. `get_listing_date_overrides` P12, 27 Nov-14 Dec: **unchanged** (27-29 Nov -15% min 2; 30 Nov-6 Dec min 2 with no price; 7-13 Dec min 3; 14 Dec -5% min 3). The 26 Nov +15% night has passed.
  3. `get_user_logs` (listing; P01, P04, P09, P12; 26-27 Nov): **0 entries.**
  4. `get_neighbourhood_data` detail for P04, P12 and P01: OK, saved to scratchpad `east27/dl/nd_*_detail.json`.
- **Smoobu: not called.** Prices come from `prices.csv` (27 Nov) and reservations from `reservations.csv` (27 Nov). Pushes (`listings.csv` 27 Nov): P04 06:49:43Z, P12 05:59:50Z, P01 03:03:15Z, P09 04:33:26Z.

## What changed since 26 Nov (this batch)
**1. CRITICAL: the unsynced P04 Airbnb 1455876748739910219 now sells nights that are booked.**
- P04 10-13 Dec was booked on Airbnb on 27 Nov: £378.67 room, £142 cleaning (`reservations.csv`).
- The synced 1657859794156786222 is closed for those nights. It was not returned in the wide search (07:21:07Z) or in the 0.3 km box (07:39:08-07:39:11Z) for 10-13, 11-13 or 12-13 Dec.
- **1455 still sells them:**
  - 10-13 Dec: **£601** (struck from £686), wide 07:21:07Z and box 07:39:00Z.
  - 11-13 Dec: £445 (from £502).
  - 11-14 Dec: £597.
  - 10-14 Dec: £754 (from £866).
- So any 1455 booking on 10-12 Dec would be a true double booking, and Smoobu would not see it. The booking came through the synced listing: 1657 closed and 1455 did not (the channel agent reaches the same conclusion from Smoobu). Day 28 of t-p04-doublebook.

**2. 1455 is still closed from the night of 20 Dec.**
- 18-20 Dec is bookable on 1455 at £451 (£225.50/n).
- 1455 returns nothing on any stay that includes 20 Dec or later: 14-22, 19-22, 20-23, 21-24, 23-26, 20-26 and 20-27 Dec, and every default Christmas stay.
- The synced listing sells 20-26 Dec at £897. If 1455 is booked from 20 Dec, that is a double sale. NOT VERIFIED: only public pages were read, not its calendar.

**3. P04 rating: 4.27 (11) -> 4.33 (12)** on the synced listing (one new review). `quality_premium` is still -0.15 (cap).

**4. P04 room for open December nights barely moved** (about -£1/n):
- 14-22 Dec: 142/142/144/146/150/156/154/153 (26 Nov: 141/143/145/148/152/158/156/155).
- 20-26 Dec: 154/153/152/158/158/157 = £932 (26 Nov: £938 PriceLabs).
- Airbnb totals: 14-22 Dec £1,027 -> £1,019; 17-20 Dec £493 -> £488; 20-26 Dec £902 -> £897; 7-10 Dec £540 -> £536.

**5. P01 comps rose back.** 41905186 went up on every December stay: 18-20 Dec 382 -> 414; 23-25 Dec 642 -> 722. 1418178473526356202 on 1-3 Dec went 363.5 -> 412. P01 18-20 Dec is still `Blocked` (280/275; 26 Nov 280/286).

**6. Comps otherwise held.** 103 of 148 like-for-like comp/stay prices are within £1 of 26 Nov. Other moves of £10 or more:
- P12 1077363497194834681: +£10 on every stay.
- P09 1501211872839579235: 1-3 Dec 188.5 -> 174.
- P15 1617544963466664181: 26-28 Dec 203 -> 183.
- P04 1577633201778145138: 26-28 Dec 240 -> 251.
- P01 1005647070760859698: 18-21 Dec 348.33 -> 290.

## PriceLabs market percentiles (`get_neighbourhood_data`, 27 Nov)
These are market bands, not comps. "Ours" = neighbourhood `final_price`.
- Compsets: P12 NL 2-3BR (134); P04 NL 1-3BR (188); P01 NL 1-3BR (283).
- Basis "Host-only fee"; horizon not stated. Percentiles are interpolated between P25/P50/P75/P90.

| Ref | 2BR summary P25/P50/P75/P90 (n) | Booked 30/60 vs market (`pl_kpis` 27 Nov) | Ours vs daily market (stay average P25/P50/P75/P90) |
|---|---|---|---|
| P12 | 167/203/230/290 (119) | 87% / 93% vs 42% / 31% | **30 Nov-3 Dec £276.67 (169/199.3/251/300.7): P83** (26 Nov P83). 30 Nov-4 Dec £279.5: P82. 2-4 Dec £285: P80. 30 Nov-2 Dec £274: P83 |
| P04 | 139/174/210/247 (90) | 37% / 32% vs 24% / 17% | **10-13 Dec as sold £126.22 room (128/157.7/207.7/253.3): below P25** (`final_price` now 175/184/189 on the booked nights = £182.67, P62). **13-14 Dec £149: P47**; 13-16 Dec £144.33: P43. **14-22 Dec £148.38 (128.2/156.4/204.6/238.6): P43.** **17-20 Dec £150.67 (133.7/158.3/209.7/239): P42.** **20-26 Dec £155.33 (131.3/164/209.3/265): P43.** 23-26 Dec £157.67: P42. 7-10 Dec £171.67: P61. 6-9 Dec £172.67: P61 |
| P01 | n/a (1-3BR NL) | 100% / 100% vs 37% / 27% | **18-20 Dec (blocked) £277.5 (199.5/231.5/312.5/458.5): P64**; 18-21 Dec £266.67: P61 |

- P04 `prices_with_default_customization` vs final:
  - 14-22 Dec: £158.9 vs £148.4 (-7%).
  - 17-20 Dec: £163.0 vs £150.7 (-8%).
  - 20-26 Dec: £172.7 vs £155.3 (-10%).
  - 13-14 Dec: £162 vs £149 (-8%).
- The final price still sits below the default on 14-26 Dec, and no price override is set there. Why: NOT VERIFIED (pricelabs agent).
- P12 30 Nov-3 Dec: £254.0 default vs £276.7 final (+9%).

## Priority 1: P04 Barking
- **Quality:** `quality_premium(4.33, 4.83)` = **-0.15** (cap). Ours is **4.33 from 12 reviews**; the comp median is 4.83 from 27 (gap 15). **Supported: -15% to 0% vs the band median.**
- Booked next 30/60: 37% / 32% vs market 24% / 17%.
- Overrides unchanged (see Method).
- Open nights: 2 Dec (1 n, +200% min 1, deprioritised), **6-9 Dec (4 n)** and **13-26 Dec (14 n, min 3)**.

### Unsynced Airbnb 1455876748739910219: what it sells now (asked)

| Listing | Stay | Airbnb total | £/n all-in | Status (checked 27 Nov) | Our nights (synced, `reservations.csv` 27 Nov) |
|---|---|---|---|---|---|
| **1455876748739910219 (unsynced, 4.69 (26))** | **10-13 Dec** | **£601** (struck from £686) | **200.33** | **bookable** (wide 07:21:07Z; box 07:39:00Z) | **BOOKED (Airbnb, made 27 Nov)**; synced 1657 not returned (wide 07:21:07Z; box 07:39:08Z) |
| 1455 | 11-13 Dec / 11-14 Dec / 10-14 Dec | £445 (from £502) / £597 / £754 (from £866) | 222.50 / 199.00 / 188.50 | bookable | 10-12 Dec booked; 13 Dec open |
| 1455 | 12-13 Dec (1 n) | n/a | n/a | not returned (07:39:03Z) | booked |
| 1455 | 6-9, 6-10, 7-10 Dec | £590 / £744 / £585 | 196.67 / 186.00 / 195.00 | bookable | open; synced £539 / £668 / £536 |
| 1455 | 13-16, 14-17, 15-19, 16-19, **17-20**, 18-20 Dec | £575 / £578 / £748 / £595 / **£608** / £451 | 191.67 / 192.67 / 187.00 / 198.33 / 202.67 / 225.50 | bookable | open; synced £474 / £470 / £588 / £479 / **£488**; synced 18-20 Dec closed (min 3) |
| 1455 | **any stay including the night of 20 Dec or later** (14-22, 19-22, 20-23, 21-24, 23-26, 20-26, 20-27 Dec; 20-22 to 27-29 Dec defaults) | n/a | n/a | **not returned** (also box 07:39:05Z on 20-23 Dec) | **open and selling on the synced listing** (20-26 Dec £897) |
| 1455 | booked stays 28 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan; 1-3, 4-6 Dec | n/a | n/a | not returned (closed) | sold |

- **Booked synced nights that 1455 still sells: 10, 11 and 12 Dec** (3 nights, 4 stays offered). New since 26 Nov, when the flat was free on every channel.
- **Still closed from 20 Dec: yes**, unchanged since 25 Nov. Whether that is a booking on 1455 is NOT VERIFIED. If it is, the synced listing is selling nights that are already sold (20-26 Dec £897).
- **Overlap today:** both listings sell 6-9 Dec and 13-20 Dec. 1455 is priced 9-25% above the synced listing (17-20 Dec £608 vs £488, +25%). 1455's prices are unchanged since 26 Nov on every stay.

### 10-13 Dec as sold (£126.22/n room) vs like-for-like comps (asked)
- **As sold:** £378.67 room (£126.22/n) + £142 cleaning = £520.67, or **£173.56/n before any Airbnb guest fee**. Commission £80.70 = 15.5%, which looks like a host-only fee (NOT VERIFIED). On 26 Nov the synced card showed £514 (£171.33/n) for these nights.
- **Comps, same stay, checked 07:21:07Z:**
  - Stored: 1601606251010507286 **£203.33** (n 1). We sold at **-14.6%**.
  - Band op: **£196.67** (n 3: 182.67 / 196.67 / 213.33). We sold at **-11.7%, P0**.
  - Our own 1455: £200.33.
- **Room vs market:** £126.22 is **below P25** (P25 £128.0, P50 £157.7).
- **Vs the room at the time of sale:** 0.76x the PriceLabs room on 26 Nov (175/155/156 = £486) and 0.77x the Smoobu room (165/174/156 = £495). The channel agent covers the gap; it is Airbnb pricing rules, not comps.
- **Supported:** band op x 0.85-1.00 = all-in £167.17-196.67/n, which is a room of **£119.84-149.34/n** (cleaning £142 taken out). The sale sits near the bottom of that range (-12% vs band, inside the -15% quality floor). The middle of the range is about £134.6/n, so **the evidence supported about +7% more (about £25 over the 3 nights)**. Not under-priced against quality; under-priced against the room PriceLabs intended.

### The 13 Dec gap (asked)
- **Not an orphan in practice.** 13 Dec opens a 14-night run, 13-26 Dec, so a min-3 stay starting 13 Dec fits: **13-16 Dec is bookable on the synced listing at £474 (£158/n)**. 13-14 Dec alone is not bookable (min 3), which is correct; 1455 does not offer 13-14 Dec either.
- 13-16 Dec: £158/n vs band op £209.33 (n 6) **-24.5%, P17**; vs stored £222 (n 3) -28.8%, P0. Room 149/142/142 = £144.33, market P43. Supported room £163-191 (**+13% to +32%**).
- 13-14 Dec (1 n), comps for reference: 593405916827094880 £222; band op £226 (n 2). Room £149, market P47.

### Open December stays (asked: 14-22, 17-20, 20-26 Dec)

| Stay | Ours, Airbnb all-in £/n (26 Nov) | PriceLabs room (= Smoobu) | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n | Market pctl |
|---|---|---|---|---|---|---|---|
| 6-9 Dec | 179.67 (181.00; £539 struck from £609) | 172/173/173 | 222 (3), -19.1% | 209.33 (6), -14.2% | P33 | 171-201 (-1% to +17%) | P61 |
| **7-10 Dec** | **178.67** (180.00; £536) | 173/173/169 | 207.67 (2), -14.0% | 196.5 (6), **-9.1%** | P33 | **160-189 (-7% to +10%)** | P61 |
| 13-16 Dec | 158.00 (new) | 149/142/142 | 222 (3), -28.8% | 209.33 (6), -24.5% | P17 | 163-191 (+13% to +32%) | P43 |
| 14-17 Dec | 156.67 (157.00) | 142/142/144 | 236.5 (4), -33.8% | 222 (7), -29.4% | P14 | 172-202 (+20% to +42%) | |
| **14-22 Dec (8 n)** | **127.38** (128.38; £1,019 struck from £1,211) | 142/142/144/146/150/156/154/153 | 207 (1), **-38.5%** | 177.31 (4), **-28.2%** | P25 | **176-207 (+18% to +39%, incl. weekly 15%)** | **P43** |
| 15-19 Dec | 147.00 (148.00) | 142/144/146/150 | 253.75 (3), -42.1% | 227.88 (6), -35.5% | P0 | 192-226 (+32% to +55%) | |
| 16-19 Dec | 159.67 (161.00) | 144/146/150 | 259.67 (3), -38.5% | 235 (5), -32.1% | P0 | 183-216 (+25% to +47%) | |
| **17-20 Dec** | **162.67** (164.33; £488) | **146/150/156** | 245.16 (2), **-33.6%** | 231 (4), **-29.6%** | **P0** | **182-214 (+21% to +42%)** | **P42** |
| 19-22 Dec | 165.67 (167.00) | 156/154/153 | 222 (1), -25.4% | 222 (3), -25.4% | P0 | 176-207 (+14% to +34%) | |

- **14-22 Dec and 17-20 Dec: about +20% supported** (room about £170-180/n). These stays are P0-P25 in the band, -28% to -30% vs band op, and P42-P43 in the market. Unchanged since 26 Nov.
- **13-16 Dec: about +15%.**
- **6-10 Dec: hold to +5%** (-9% to -14% vs band, supported -7% to +17%).
- **`recommend`:** 30-day 37% vs 24% at P0 with quality -0.15 = **raise +10%**; 31-60-day 32% vs 17% = **raise +10%**. I adopted the larger sizes above for 13-22 Dec because the comp gap is wider than the formula step.

### Christmas (asked: 20-26 Dec)

| Stay | Ours, Airbnb all-in £/n (26 Nov) | PriceLabs room | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n | Market pctl |
|---|---|---|---|---|---|---|---|
| **20-26 Dec (6 n)** | **149.50** (150.33; £897 struck from £981) | 154/153/152/158/158/157 = £932 (26 Nov £938) | 226 (1), -33.8% | 206.33 (4), **-27.5%** | **P0** | **182-214 (+17% to +38%)** | **P43** |
| 20-23 Dec | 164.67 (166.00) | 154/153/152 | 222 (1), -25.8% | 222 (3), -25.8% | P0 | 175-206 (+15% to +35%) | |
| 21-24 Dec | 165.67 (166.00) | 153/152/158 | 222 (1), -25.4% | 216.33 (5), -23.4% | P0 | 171-202 (+11% to +31%) | |
| 23-26 Dec | 168.00 (175.33) | 158/158/157 | 230 (1), -27.0% | 214.67 (4), -21.7% | P0 | 171-201 (+9% to +28%) | P42 |
| 23-27 Dec | 161.50 (171.25) | 158/158/157/157 | 231 (1), -30.1% | 211.5 (4), -23.6% | P0 | 175-206 (+11% to +31%) | |
| 24-27 Dec | 175.00 (188.67) | 158/157/157 | 251.16 (2), -30.3% | 234 (5), -25.2% | P0 | 179-210 (+14% to +34%) | |
| 20-27 Dec (7 n) | 135.14 (137.86; £946 struck from £1,123) | avg 155.57 | 211.71 (1), -36.2% | 180.71 (2), -25.2% | P0 | 177-208 (incl. weekly 15%) | |

- **20-26 Dec: about +20% on the 6-night stay** (room about £185/n), **with 23-26 Dec about +10-15%**. 23-26 Dec fell £22 on Airbnb overnight (£526 -> £504) because 26 Dec went 177 -> 157 in PriceLabs.

### 2 Dec (1 n, +200% min 1; deprioritised in policy)
- Bookable on the synced Airbnb at **£455** (room £425). Band op £226 (n 4). Reported only.

## Priority 2: P12 Mile End 30 Nov-3 Dec (last open nights before the 13 Dec handback)
- **Quality:** `quality_premium(4.27, 4.875)` = **-0.15** (cap). Ours is 4.27 from 15 reviews; the stored-comp median is 4.875 from 25 (gap 10). **Supported: band median x 0.85-1.00.**
- Booked next 30/60: 87% / 93% vs market 42% / 31%.
- Open nights before the 13 Dec handback: **30 Nov, 1, 2 and 3 Dec** (4 n, min 2). 26 Nov has passed: in `reservations.csv` 27 Nov there is no P12 stay on 26 Nov, so it went unsold (the occupancy agent owns this). 4-7 Dec is closed on Airbnb (correct).

| Stay | Ours, Airbnb all-in £/n (26 Nov) | PriceLabs room (26 Nov) | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room | Move vs PriceLabs | Market pctl |
|---|---|---|---|---|---|---|---|
| **30 Nov-3 Dec** | **261.67** (260.67; £785, no strike) | **269/279/282** (274/273/279) | 262 (9), **P44, -0.1%** | 250.67 (5), P60, +4.4% | **235-277** | **-15% to 0%** | **P83** |
| 30 Nov-4 Dec (whole gap, 4 n) | 251.50 (249.50; £1,006 struck from £1,157) | 269/279/282/288 | 266.25 (7), P29, -5.5% | 277.5 (3), P33, -9.4% | 252-296 | -10% to +6% | P82 |
| 30 Nov-2 Dec | 272.50 (272.00; £545 struck from £619) | 269/279 | 250.75 (8), P75, +8.7% | 254 (3), P67, +7.3% | 214-252 | -22% to -8% | P83 |
| 1-3 Dec (midweek default) | 277.50 (274.00; £555 struck from £630) | 279/282 | 262 (5), P60, +5.9% | 254 (3), P67, +9.3% | 225-265 | -20% to -6% | P83 |
| 2-4 Dec | 281.00 (277.50; £562) | 282/288 | 270.5 (5), P60, +3.9% | 268 (2), P50, +4.9% | 233-274 | -18% to -4% | P80 |
| 4-7 / 3-7 Dec | closed on Airbnb (booked) | 299/309/285 | 312.33 (3) / 307 (3) | n/a (0) | | | |

- **30 Nov-3 Dec: about -5% supported** (room about £256/265/268). The 3-night stay sits at the band median (-0.1%) against a quality ceiling of 0% and a floor of -15%, and it is P83 in the market. The 2-night sub-stays are +4% to +9% vs band. The whole 4-night gap is -5.5% vs band, inside the supported range. So -5% is the evidence-weighted middle, not a deep cut. Unchanged from 26 Nov.
- **`recommend`:** both horizons return a mechanical **raise +10%** (30-day 87% vs 42%, 60-day 93% vs 31%, median comp percentile P60 over 5 open stays). **Not adopted.** The lead comes from nights already sold, the open stays sit at or above the band median against a quality ceiling of 0%, and the raise branch ignores a negative `quality_premium`. Nothing after 13 Dec can be sold.

## Priority 3: P01 Bowsprit Point 18-20 Dec (blocked, before the 20 Dec handback)
- **Still blocked:** 18-20 Dec `Blocked`, 280/275, min 3 (26 Nov 280/286). Not returned on Airbnb.
- **Comps:**
  - 18-20 Dec: stored **£414** (n 3; 26 Nov £382), band £395 (6).
  - 18-21 Dec: stored £373 (7), band £339.16 (14).
  - 19-21 Dec: stored £389 (3), band £377.75 (6).
  - The rise is mostly 41905186 (0.38 km, 4.38 (34)) going back up (382 -> 414).
- **If reopened** at today's 280/275/245 plus £149 cleaning (a carried figure), before any Airbnb guest fee:
  - 18-20 Dec: £352/n, -15.0% vs stored and -10.9% vs band.
  - 18-21 Dec: £316.33/n, -15.2% vs stored and -6.7% vs band.
  - 19-21 Dec: £334.50/n, -14.0% vs stored and -11.4% vs band.
  - PriceLabs NL: P64 (18-20 Dec), P61 (18-21 Dec).
- **Supported: about -2% vs the comp median** (`quality_premium(4.75, 4.8)` = -0.02, on only 4 reviews).
  - Against the 18-21 Dec band (n 14), that is a room of about £283/n (+6% on today's room). Against the stored comps (n 7) it is about £316/n (+18%).
  - **About +10% is adopted** (26 Nov +5%; comps rose overnight). The Airbnb guest fee is not in our estimate.
- **For Corentin (carried policy conflict):** the handback policy says "before the date, maximise revenue normally", but £800 of room nights (280 + 275 + 245) stay blocked.

## Priority 4: P09 Torrent Lodge
- The handback has passed (last night 26 Nov). Nothing to position.
- Comps, trend only: 1-3 Dec stored median £174 (n 3). `quality_premium(5.0, 4.56)` = +0.15, on only 3 reviews.

## Summary per property
| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30/60 vs market | `recommend` | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (18-20 Dec blocked) | stored 373-414 (n 3-7) on 18-21 Dec | n/a (would be -14% to -15% stored, -7% to -11% band) | 4.75 vs 4.8 | 4 vs 30 (-26) | -0.02 | 100%/100% vs 37%/27% | raise-signal | **-2% vs median**: if reopened, about +10% on the room |
| P04 (synced 1657...) | **10-13 Dec sold £173.56 (room £126.22)**; 13-16 Dec 158; 7-10 Dec 178.67; **14-22 Dec 127.38 (8 n)**; **17-20 Dec 162.67**; **20-26 Dec 149.50** | stored 203-260 (n 1-4); band op 177-235 (n 2-7) | P0 stored on every open stay; band op P0-P33; 10-13 Dec as sold P0 (-11.7% vs band op) | **4.33** vs 4.83 | 12 vs 27 (-15) | -0.15 | 37%/32% vs 24%/17% | raise +10% (both horizons) | **-15% to 0% vs band. 10-13 Dec sale inside the supported range (about +7% left); 13-16 Dec about +15%; 14-22 and 17-20 Dec about +20%; 20-26 Dec about +20% (23-26 Dec +10-15%); 6-10 Dec 0 to +5%** |
| P04 unsynced 1455... | 186-225.5 on 6-20 Dec, **incl. 10-13 Dec £200.33 (booked nights)**; nothing from 20 Dec | | | 4.69 | 26 | n/a | | | **close 10-12 Dec now**; then map, close or unlist; check its calendar from 20 Dec |
| P09 | handback passed | 168-271.5 (n 1-3) | n/a | 5.0 vs 4.56 | 3 vs 25 (-22) | +0.15 | 100%/100% vs 41%/29% | raise-signal | nothing to sell |
| P12 | open 251.5-281 | band 250.75-270.5; stored 250.67-277.5 | 30 Nov-3 Dec P44 band / P60 stored; 30 Nov-4 Dec P29 / P33 | 4.27 vs 4.875 | 15 vs 25 (-10) | -0.15 | 87%/93% vs 42%/31% | raise +10% (P60): **not adopted** | **-15% to 0% vs band. 30 Nov-3 Dec about -5%** |
| P15 | no listing of ours | 137.75-190 (n 1-3) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 27 Nov)
| Item | Status |
|---|---|
| **t-p04-doublebook** | **Worse (day 28):** 1455 sells 10-13 Dec (£601), 11-13, 11-14 and 10-14 Dec, and those nights were booked on the synced listing on 27 Nov. It is still closed from 20 Dec while the synced listing sells 20-26 Dec (£897); whether that is a hidden booking is NOT VERIFIED. |
| a-p04-dec-1611 | No change: 13-22 Dec is P0-P25, -24% to -36% vs band op. About +15% to +20% supported. 7-10 Dec 0 to +5%. |
| t-p04-xmas-1711 | 20-26 Dec room £932 (26 Nov £938); Airbnb £897 (P0, -27.5% vs band op). About +20% supported; 23-26 Dec +10-15%. |
| a-p12-trim | 30 Nov-3 Dec: room 269/279/282 (+£4 overnight), at the band median, market P83. About -5% supported. |
| t-p12-26nov-price | **Closed by the date:** 26 Nov passed with no stay in `reservations.csv` 27 Nov (unsold, per the occupancy agent). |
| t-p01-1820block | **Not fixed** (still `Blocked`). For Corentin. |

## Critical / high findings
- **CRITICAL: P04 unsynced 1455 is selling booked nights.** 10-13 Dec is bookable on 1455 at £601 (£200.33/n; also 11-14 Dec £597 and 10-14 Dec £754). P04 10-13 Dec was sold on Airbnb on 27 Nov (£378.67 room), and the synced 1657 is closed for it. Smoobu would not see a 1455 booking.
- **HIGH: P04 1455 is still closed from 20 Dec** while the synced listing sells 20-26 Dec (£897). If that is a booking, it is a double sale. NOT VERIFIED.
- **HIGH: P04 13-26 Dec is P0-P25 vs comps.**
  - 17-20 Dec: £162.67/n vs £231 band op (n 4), -29.6%.
  - 14-22 Dec: £127.38/n vs £177.31 (n 4), -28.2%.
  - 20-26 Dec: £149.50/n vs £206.33 (n 4), -27.5%.
  - 13-16 Dec: £158/n vs £209.33 (n 6), -24.5%.
  - Market P42-P43. About +15% to +20% supported.
- **MEDIUM: P04 10-13 Dec sold at £126.22/n room** (£173.56/n incl. cleaning). That is -11.7% vs band op (n 3, P0), -14.6% vs the stored comp, below market P25, and 0.76-0.77x the room at the time. It is inside the supported range (floor about £120/n); about +7% (about £25) was left.
- **HIGH (for Corentin, carried): P01 18-20 Dec still blocked.** Reopened at today's prices it would sit 11% below the band and 15% below stored comps; £800 of room nights are held.
- **MEDIUM: P12 30 Nov-3 Dec** is at the band median (-0.1%, n 9), market P83. About -5% supported.

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-27 07:20-07:38Z.
- "26 Nov x" = the same comp and stay on 26 Nov, where the two differ by more than £1.
- `*` = found by the 0.3 km second pass.
- "–" = not returned in the wide search or the 0.3 km box (booked or unavailable).
- "(earlier read)" = km from an earlier day; the comp was not returned today.
- Full source for every row: `data/snapshots/2026-11-27/comps.csv` (`comp-east`, `east-refband`, `east-ours`).
- Cancellation policy: NOT CHECKED. Differentiators come from listing-page reads on 25 Oct-15 Nov.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, search party 4

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 4 Dec-6 Dec | 27 Dec-29 Dec | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Dec-28 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | – | – | – | 290 (26 Nov 348.33) | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 557* | – | – | 544 (26 Nov 494) | 647 (26 Nov 549) | 722 (26 Nov 642) | 539 (26 Nov 472) | 414 (26 Nov 382) | – | 402.33 (26 Nov 369.67) | 389 (26 Nov 372) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.44 (167) | none listed | – | – | – | – | – | – | 194.5 | – | – | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (58) | Lift | – | – | – | – | – | – | – | – | – | 373 (26 Nov 378.33) | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 (earlier read) | 6 | 4.6 (30) | Lift/River view/balcony | – | – | – | – | – | – | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking/River view/balcony | – | – | – | – | – | – | – | – | – | 382.67 | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (22) | Skyline view/Free parking/Lift/Superhost/balcony/Guest fav | 412 (26 Nov 363.5) | – | – | – | – | – | – | – | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | 299.5 (26 Nov 308.5) | – | 424 | 395.5 | 376 | 357 | 357 | 376 | 410 | 369.67 | 366.5 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.83 (18) | Lift | – | – | – | 335 | 335 | 335 | – | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (45) | Lift/patio or balcony/Superhost/Guest fav | – | – | 528 | 601.5 | 590 | 539.5 | 539.5* | 528* | 545.5 | 524 | 534 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost | – | – | – | – | – | – | – | – | – | 281 | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **412** (3) | n/a (0) | **476** (2) | **469.75** (4) | **483** (4) | **448.25** (4) | **448** (4) | **414** (3) | **477.75** (2) | **373** (7) | **389** (3) |
| **Band median (n)** | | | | | 290 (7) | 310 (1) | 424 (5) | 399.5 (8) | 383 (10) | 357 (11) | 319.25 (8) | 395 (6) | 410 (5) | 339.16 (14) | 377.75 (6) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.33 (12); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, search party 4

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 4 Dec-6 Dec | 27 Dec-29 Dec | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Dec-28 Dec | 28 Nov-2 Dec | 2 Dec-3 Dec | 3 Dec-6 Dec | 6 Dec-9 Dec | 6 Dec-10 Dec | 7 Dec-10 Dec | 10 Dec-13 Dec | 10 Dec-14 Dec | 11 Dec-14 Dec | 13 Dec-14 Dec | 13 Dec-16 Dec | 14 Dec-17 Dec | 14 Dec-22 Dec | 15 Dec-19 Dec | 16 Dec-19 Dec | 17 Dec-20 Dec | 19 Dec-22 Dec | 20 Dec-23 Dec | 21 Dec-24 Dec | 23 Dec-26 Dec | 23 Dec-27 Dec | 24 Dec-27 Dec | 20 Dec-26 Dec | 20 Dec-27 Dec | 27 Dec-4 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | – | – | – | – | – | – | – | 209.75 (26 Nov 213.5) | – | 238 (26 Nov 240.67) | – | – | – | – | – | – | – | 251 | 251 | – | 253.75 | 259.67 | 268.33 | – | – | – | – | – | 268.33 | – | – | – |
| [985683261536682900](https://www.airbnb.co.uk/rooms/985683261536682900) | 0.61 | 5 | 4.82 (17) | Paid street parking/Superhost | – | 225 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 (earlier read) | 5 | 5.0 (28) | Free parking/Superhost/Guest fav | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.76 (42) | Free parking/Superhost | 225 | – | – | – | – | – | – | – | 251 (26 Nov 240) | – | 250 | – | 223.33 | – | – | – | – | – | – | – | 265 | – | 267.5 | 273.33 | – | – | – | – | – | – | – | – | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | 222 | – | – | 234 | 234 | 228 | 222 | 222 | – | – | 222 | – | 222 | 222 | 222 | – | – | – | 222 | 222 | 222 | 207 | 222 | 222* | 222 | 222 | 222 | 222 | 230 | 231 | 234 | 226 | 211.71 | – |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 (earlier read) | 6 | 4.85 (27) | Parking (in name) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (18) | Free street parking/Superhost | 202 (26 Nov 208) | – | – | – | – | – | – | – | – | – | – | – | 193.33 (26 Nov 195.33) | 185 (26 Nov 187) | 193.33 (26 Nov 195.33) | 203.33 (26 Nov 205.33) | 194 (26 Nov 195.5) | 205.33 (26 Nov 206.67) | – | 199.33 | 199.33 | – | – | – | – | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **455** | not bookable | **179.67** | **167** | **178.67** | not bookable | not bookable | not bookable | not bookable | **158** | **156.67** | **127.38** | **147** | **159.67** | **162.67** | **165.67** | **164.67** | **165.67** | **168** | **161.5** | **175** | **149.5** | **135.14** | not bookable |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **225.5** | not bookable | not bookable | not bookable | not bookable | **196.67** | **186** | **195** | **200.33** | **188.5** | **199** | not bookable | **191.67** | **192.67** | not bookable | **187** | **198.33** | **202.67** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **222** (3) | **225** (1) | n/a (0) | **234** (1) | **234** (1) | **228** (1) | **222** (1) | **222** (1) | **251** (1) | **209.75** (1) | **236** (2) | **238** (1) | **222** (3) | **203.5** (2) | **207.67** (2) | **203.33** (1) | **194** (1) | **205.33** (1) | **222** (1) | **222** (3) | **236.5** (4) | **207** (1) | **253.75** (3) | **259.67** (3) | **245.16** (2) | **222** (1) | **222** (1) | **222** (1) | **230** (1) | **231** (1) | **251.16** (2) | **226** (1) | **211.71** (1) | n/a (0) |
| **Band median (n)** | | | | | 216 (6) | 225 (1) | 209 (1) | 210 (3) | 212 (5) | 221 (4) | 222 (3) | 218 (2) | 210 (3) | 209.75 (1) | 226 (4) | 238 (1) | 209.33 (6) | 190 (5) | 196.5 (6) | 196.67 (3) | 190 (3) | 196.67 (3) | 226 (2) | 209.33 (6) | 222 (7) | 177.31 (4) | 227.88 (6) | 235 (5) | 231 (4) | 222 (3) | 222 (3) | 216.33 (5) | 214.67 (4) | 211.5 (4) | 234 (5) | 206.33 (4) | 180.71 (2) | 180.5 (1) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | – | – | – | P100 (+92.8%) | – | P0 (-19.1%) | P0 (-17.9%) | P0 (-14.0%) | – | – | – | – | P0 (-28.8%) | P0 (-33.8%) | P0 (-38.5%) | P0 (-42.1%) | P0 (-38.5%) | P0 (-33.6%) | P0 (-25.4%) | P0 (-25.8%) | P0 (-25.4%) | P0 (-27.0%) | P0 (-30.1%) | P0 (-30.3%) | P0 (-33.8%) | P0 (-36.2%) | – |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, search party 3

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 4 Dec-6 Dec | 27 Dec-29 Dec | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Dec-28 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | – | – | – | – | – | – | 168 | 170 | – |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | – | – | – | – | – | – | 165.5 | 165 | – |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.7 (23) | none listed | 155.5* (26 Nov 148.5) | – | – | – | 185.5 (26 Nov 193.5) | – | – | – | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest fav | 248.5 | 248.5 | – | 248.5 | 248.5 | 248.5 | 248.5 | 248.5 | – |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | 174 (26 Nov 188.5) | – | 271.5 | 223.5 (26 Nov 229.5) | 207.5 (26 Nov 212) | 200.5 (26 Nov 203.5) | – | – | 242.5 (26 Nov 248) |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 (earlier read) | 3 | 4.75 (16) | Skyline view/balcony | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **174** (3) | **248.5** (1) | **271.5** (1) | **236** (2) | **207.5** (3) | **224.5** (2) | **168** (3) | **170** (3) | **242.5** (1) |
| **Band median (n)** | | | | | 174.75 (8) | 248.5 (1) | 270.25 (2) | 235.5 (5) | 208 (7) | 167.75 (6) | 193.5 (7) | 211.25 (6) | 255.75 (2) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, search party 4

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 4 Dec-6 Dec | 27 Dec-29 Dec | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Dec-28 Dec | 30 Nov-3 Dec | 30 Nov-4 Dec | 30 Nov-2 Dec | 2 Dec-4 Dec | 4 Dec-7 Dec | 3 Dec-7 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 247.5 (26 Nov 237.5) | – | 347.5 | 347.5 (26 Nov 337.5) | 347.5 (26 Nov 337.5) | 347.5 (26 Nov 337.5) | 297.5 (26 Nov 287.5) | 247.5* (26 Nov 237.5) | 347.5 (26 Nov 337.5) | 235 (26 Nov 225) | – | 247.5 (26 Nov 237.5) | – | – | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking | – | – | – | – | – | – | – | – | – | 283.33 | 277.5 | – | – | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (80) | Superhost | – | – | – | – | – | – | – | – | – | 178.33 (26 Nov 187.67) | – | – | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 (earlier read) | 6 | 4.94 (16) | Superhost/Guest fav | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (121) | Superhost/balcony/Guest fav | 254 | – | – | – | – | – | – | – | – | 250.67 | 243.75 | 254 | 254 | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1 | 6 | 4.54 (13) | Paid parking/balcony (placeholder price, excluded) | 1035 | 1035 | 1035 | 1035 | 1035 | 1035 | 1053.5 (26 Nov 1041) | 1054.5 (26 Nov 1050.5) | 1035 | 1032.33 | 1031 | 1035* | 1035 (26 Nov 1037) | 1032.33 (26 Nov 1042) | 1031 (26 Nov 1039.25) |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift | 282 | – | – | – | – | – | 282 (26 Nov 283.5) | – | – | 282 | 282 | 282 | 282 | – | – |
| **Ours** | | | | | **277.5** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **261.67** | **251.5** | **272.5** | **281** | not bookable | not bookable |
| **Comp median (n)** | | | | | **254** (3) | n/a (0) | **347.5** (1) | **347.5** (1) | **347.5** (1) | **347.5** (1) | **289.75** (2) | **247.5** (1) | **347.5** (1) | **250.67** (5) | **277.5** (3) | **254** (3) | **268** (2) | n/a (0) | n/a (0) |
| **Band median (n)** | | | | | 262 (5) | 323.25 (2) | 315.5 (5) | 313 (13) | 304.5 (15) | 306 (13) | 270.25 (12) | 322.5 (5) | 318.5 (10) | 262 (9) | 266.25 (7) | 250.75 (8) | 270.5 (5) | 312.33 (3) | 307 (3) |
| **Our pctl (vs comp median)** | | | | | P67 (+9.3%) | – | – | – | – | – | – | – | – | P60 (+4.4%) | P33 (-9.4%) | P67 (+7.3%) | P50 (+4.9%) | – | – |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, search party 3

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 4 Dec-6 Dec | 27 Dec-29 Dec | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Dec-28 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 190 | 195.5 | 183 | 170.5* | 170.5 | 195.5 | 183 (26 Nov 203) |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 (earlier read) | 4 | 4.93 (14) | Superhost/Guest fav | – | – | – | – | – | – | – | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.81 | 3 | 4.87 (15) | Paid parking/Superhost | 135 | – | – | – | – | 135 | 135 | 160 | – |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.85 (earlier read) | 4 | 4.71 (14) | Lift/Paid parking | – | – | – | – | – | – | – | – | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.84 | 4 | 4.92 (25) | Free parking/Guest fav | – | – | – | – | 181 | – | – | – | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (204) | Garden view/Lift/Paid parking off/Superhost | 140.5 | – | – | 140.5 | 145.5 | 150.5 | 155.5 | 160.5 | – |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.03 (earlier read) | 4 | 4.64 (14) | Lift | – | – | – | – | – | – | – | – | – |
| **Comp median (n)** | | | | | **137.75** (2) | n/a (0) | **190** (1) | **168** (2) | **181** (3) | **150.5** (3) | **155.5** (3) | **160.5** (3) | **183** (1) |
| **Band median (n)** | | | | | 134.75 (6) | n/a (0) | 196 (4) | 193.75 (4) | 181 (7) | 175 (7) | 157 (7) | 160.5 (5) | 179 (4) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings (Airbnb only).
- **1455's own calendar and bookings: NOT VERIFIED.** Only public search pages were read. Its closure from 20 Dec is unexplained.
- **P04 comp set is below the 6-comp minimum in practice:** 5 of 7 stored comps were returned on any stay (985683261536682900 is back on 4-6 Dec). 1733027244747346716 and 1387112821878102742 have not been returned for 8 days on any stay 28 Nov-4 Jan. Inactivity is NOT VERIFIED, so they are not replaced. Stored n = 1-4 per stay; band op n = 2-7 (10-13 Dec: n 1 stored, 3 band). Replacement candidates are carried and not re-read today: 1072316558208098643 and 1245634494660468861 (both in the 10-13 Dec band today), 43709205 and 934755638180855305.
- **10-13 Dec as-sold all-in** (£173.56/n) = room + cleaning from Smoobu. The Airbnb guest fee model (host-only vs split) is NOT VERIFIED; the 15.5% commission suggests host-only.
- Why the P04 `final_price` sits 7-10% under the default on 14-26 Dec with no price override: NOT VERIFIED (pricelabs agent).
- P12 stored-comp coverage is thin: 2-5 of 6 usable comps per open stay. 1670196516322802487 has not been returned for a fourth day (kept).
- Kept as booked, not inactive (not returned on any stay today): P01 852256049507701872; P09 958156921765583815; P15 1371771992549776701, 1528442618668335413, 1444741453093610023.
- P04 4-10 Jan and P12 January were not priced against comps. The P01 cleaning fee of £149 is carried, not re-read.
- Comp cancellation policies, band-listing sleeps and current lift/view/parking: NOT CHECKED today (carried from the 25 Oct-15 Nov reads).
- NL percentiles: horizon not stated, host-only-fee basis, 1-3BR (P04, P01) or 2-3BR (P12). These are market bands, not like-for-like.
