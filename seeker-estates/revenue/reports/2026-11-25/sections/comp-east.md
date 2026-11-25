# Competitor positioning: EAST batch (D = 2026-11-25)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy `intentional_blocks`). Not analysed.
- **P15** has no listing of ours. Reference only.
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec; P09 26 Nov; P12 13 Dec). P09 and P12 Christmas stays are comp trend only.

**Method** (same as 26 Oct-24 Nov; scripts copied from scratchpad `east24/bin` to `east25/bin`, only dates and paths changed)
- **Comp ids:** the same set as 24 Nov (P01 11, P04 7, P09 6, P12 7, P15 7). **No comp replaced today.**
  - P04 985683261536682900, 1733027244747346716 and 1387112821878102742: not returned on any of 28 stays (25 Nov-4 Jan), **sixth day running** (0.3 km box on each, 0 errors). Kept; inactivity NOT VERIFIED (no calendar read, January not searched). P04 has 4 live comps, below the 6 minimum (candidates under Data gaps).
  - Not returned on any stay today, kept as booked: P01 852256049507701872; P09 958156921765583815; P12 1670196516322802487 (second day); P15 1371771992549776701, 1528442618668335413 (second day), **1444741453093610023 (new today)**.
  - P12 29297702 still shows a placeholder-like price (£1,031-1,080/n). Out of the medians (`nightly_gbp` blank, price in `source`).
- **Access:** public Airbnb search pages (HTTP 200). 65 wide searches with pagination, 0 failures; then 399 comp/stay checks in a 0.3 km box, 13 hits, 0 errors. Box sizes: 2.5 km P04, 1.8 km P09, 1.3 km the rest. Search party 4 for 2BR, 3 for 1BR. Checked **2026-11-25 07:25:10-07:40:44Z** (plus one 1455 spot check at about 07:24Z, same result). **Booking.com: NOT CHECKED.**
- **Price basis = what guests see:** Airbnb **guest-paid all-in total / nights**, after discounts, with cleaning and Airbnb fees **included**; no separate taxes shown. Ours priced the same way. PriceLabs/Smoobu figures (`prices.csv` 25 Nov, starts 26 Nov) are **room only, cleaning excluded**. Stays of 7+ nights include the 15% weekly discount (policy).
- **Stays (same dates for comps and us):** default midweek **1-3 Dec** (Tue-Thu), next Fri-Sun **27-29 Nov**, 30 days out **25-27 Dec**; trend stays 24-26, 23-25, 20-22, 18-20 Dec.
  - P12, as asked: **26-27 Nov**; **30 Nov-3 Dec**, 30 Nov-4 Dec (the whole open gap), 30 Nov-2, 1-3, 2-4 Dec; 4-7 and 3-7 Dec (now booked; Airbnb closure check). **P12 open nights before the 13 Dec handback = 26 Nov and 30 Nov-3 Dec (5 nights)**; everything else to 13 Dec is booked (`reservations.csv` 25 Nov).
  - P04, as asked: **7-10 Dec**, 6-9, 6-10 Dec; **14-22 Dec** (8 n), 14-17, 15-19, 16-19, **17-20**, 19-22 Dec; **20-26 Dec**, 20-23, 21-24, 23-26, 23-27, 24-27, 20-27 Dec; 2-3 Dec. Unsynced check: **10-14 Dec**, and the booked stays 28 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan.
  - P01: **18-20 Dec**, 18-21, 19-21 Dec.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius; ours and >£1,000/n excluded; P04's 1531... operator units collapsed into one ("op").
- **"Supported room"** = band median x 0.85-1.00 (the `quality_premium` range), converted back to room price with each stay's own Airbnb all-in / PriceLabs room ratio. Approximate.
- **Data written:** `data/snapshots/2026-11-25/comps.csv` was absent; under `flock` on `.comps.csv.lock` I copied it forward from 24 Nov (19,701 lines, byte-identical prefix verified with `cmp`). Other agents appended next (21,362 lines), then under the same lock I **appended 1,054 rows**: 484 `comp-east` (every stored comp x stay; NOT RETURNED rows kept with a blank price), 426 `east-refband` (ref `Pxx:band`), 144 `east-ours` (ref `Pxx:ours`: Airbnb all-in rows and PriceLabs room rows). File now 22,416 lines.
- **PriceLabs (read-only, one call at a time, in this order):**
  1. `get_listing_date_overrides` P04, 25 Nov-10 Jan: **changed. 6-23 Dec is now -5% min 3 (was -2% min 3), updated 24 Nov 10:52:35Z.** Others unchanged (24-26 Dec +5% min 2; 27 Dec -5% min 7; 28-31 Dec -5% min 5; 25 Nov +15% min 2; 26-30 Nov and 3-5 Dec -8% min 3; 1 Dec -2% min 4; 2 Dec +200% min 1).
  2. `get_user_logs` (listing; P01, P04, P09, P12; 24-25 Nov): **1 entry: Reyhan, 24 Nov 10:52:35Z, "Added Date Specific Override" on P04 6-23 Dec, -5%, min 3.** That is what triggered the P04 refresh at 10:54Z (Dispatcher pull note). No entry for P12, P01 or P09.
  3. `get_listing_date_overrides` P12, 25 Nov-14 Dec: **unchanged** (26 Nov +15% min 1; 25 and 27-29 Nov -15% min 2; 30 Nov-6 Dec min 2, no price; 7-13 Dec min 3; 14 Dec -5% min 3).
  4. `get_neighbourhood_data` detail for P12, P04, P01: OK, saved to scratchpad `east25/dl/nd_*_detail.json`.
- **Smoobu: not called.** Room prices are `prices.csv` (25 Nov); `smoobu_price` = `pricelabs_price` on every night used. Reservations from `reservations.csv` (25 Nov).
- **Pushes** (`listings.csv` 25 Nov): P04 24 Nov 10:54:10Z (after Reyhan's 10:52Z edit; recommended base 201, base 200); **P12 24 Nov 09:43:08Z, before the 4-7 Dec rebook was seen: `prices.csv` still shows 4-6 Dec `available` True (311/331/267)**; P01 25 Nov 04:02:24Z; P09 25 Nov 06:02:26Z.

## What changed since 24 Nov (this batch)
**1. CRITICAL, unchanged: the unsynced P04 Airbnb 1455876748739910219 is still bookable on 10-14 Dec**, the 4 nights sold on Booking.com on 22 Nov (£488.35, confirmed): **£754 total (£188.50/n), checked 07:26:18Z (wide) and 07:30:03Z (0.3 km box).** The synced 1657... is not returned (closed, correct). Day 26 of t-p04-doublebook.
- Also still bookable on 1455 (open on the synced listing too, so no double sale today, but two listings selling one flat): **6-9 Dec £590**, 6-10 £744, 7-10 £585, 14-17 £578, 15-19 £748, 16-19 £595, **17-20 Dec £608**, 18-20 £451.
- Not returned on 1455: the other booked stays (28 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan) and every stay touching 20 Dec onwards.

**2. NEW (for Corentin, confirm or revert): Reyhan deepened the P04 6-23 Dec override from -2% to -5%** (24 Nov 10:52:35Z). This is a PriceLabs discount, against the "cut PriceLabs discounts" direction, on dates where P04 is P0 vs comps (below). PriceLabs room 14-22 Dec is now 140-158 (24 Nov 144-163); 7-9 Dec 164/164/161 (170/169/166).

**3. P04 Airbnb guest totals moved for the first time since 21 Nov, and upward, while the room went down:** 7-10 Dec £483 -> **£517**; 17-20 Dec £481 -> **£494**; 14-22 Dec £995 -> **£1,027** (struck from £1,222); 15-19 Dec £579 -> £595; 20-26 Dec £949 -> **£940** (struck from £1,028). The listing now shows **4.27 (11)** (24 Nov 4.2 (10)). Why Airbnb rose while the room fell: NOT VERIFIED (channel agent).

**4. P12 4-7 Dec rebooked on Booking.com** (£766.54 = **£255.51/n**, made 24 Nov). **Airbnb is closed for 4-7 and 3-7 Dec (not returned), so no double-sale exposure on Airbnb.** £255.51/n sits at **market P67** (P25/P50/P75/P90 176.7/216/274.7/342.3) and is 0.84x the PriceLabs room (311/331/267 = £909; 24 Nov 312/332/271).

**5. P12 26 Nov: room 294 -> 290, Airbnb £350 -> £347.** Still P100. 30 Nov-3 Dec room 242/241/256 -> **242/257/258** (+£18 over 3 n); Airbnb £716 -> **£730**.

**6. P01 comps rose:** 41905186 repriced up on every December stay (18-20 Dec 374 -> 419; 23-25 Dec 395 -> 682). P01 18-20 Dec is still `Blocked` (280/290; 24 Nov 282/290).

**7. Comps otherwise held.** 103 of 118 like-for-like comp/stay prices are within £1 of 24 Nov. Moves of £10 or more: P01 41905186 (six stays, above); P01 1467264633617185891 20-22 Dec 221.5 -> 197.5; P12 1383544079404594066 26-27 Nov 263 -> 282; P15 1617544963466664181 24-26 Dec 205.5 -> 183 (P12 29297702 placeholder ignored). **No P04 comp moved by £10 or more.**

## PriceLabs market percentiles (`get_neighbourhood_data`, 25 Nov)
Market bands, not comps. "Ours" = PriceLabs room (`final_price`, matches `prices.csv` 25 Nov). Compsets: P12 NL 2-3BR (133); P04 NL 1-3BR (188); P01 NL 1-3BR (282). Basis "Host-only fee"; horizon not stated; percentiles interpolated between P25/P50/P75/P90.

| Ref | 2BR summary P25/P50/P75/P90 (n) | Booked 30/60 vs market (`pl_kpis` 25 Nov) | Ours vs daily market (stay average P25/P50/P75/P90) |
|---|---|---|---|
| P12 | 169/203/231/290 (117) | 73% / 87% vs 43% / 32% (unchanged; **does not include the 4-7 Dec rebook**, P12 not refreshed since 24 Nov 09:43Z) | **26 Nov £290 (168/198/238/310): P86.** **30 Nov-3 Dec £252.33 (169.3/201.3/256.3/301): P73.** 30 Nov-4 Dec £255.5: P73. 2-4 Dec £261.5: P72. **4-7 Dec Booking.com paid £255.51/n: P67** |
| P04 | 141/174/210/247 (90) | 47% / 37% vs 23% / 17% (unchanged) | 6-9 Dec £163.67: P56. **7-10 Dec £163 (121.7/151/199.7/236.3): P56.** 10-14 Dec room £151.25 = P46; **Booking.com paid £122.09 = below P25 (127.8)**. **14-22 Dec £149.88 (128.8/156.9/204/238.5): P44.** **17-20 Dec £153.33 (134.3/161/208.7/238.7): P43.** **20-26 Dec £164 (131.3/164.2/208.2/264.8): P50.** 24-26 Dec £181.5: P55 |
| P01 | n/a in this table (1-3BR NL) | 100% / 100% vs 35% / 27% | **18-20 Dec (blocked) £285 (199/232/312.5/454): P66**; 18-21 Dec £273.33: P63 |

- `prices_with_default_customization` vs final (P04): 7-10 Dec £196.0 vs £163.0 (-17%); 14-22 Dec £186.9 vs £149.9 (-20%); 17-20 Dec £194.3 vs £153.3 (-21%); 20-26 Dec £203.2 vs £164.0 (-19%). The gap widened 2-3 points vs 24 Nov (the -5% override). P12 26 Nov £197 vs £290 (+47%: the +15% override plus min 1); 30 Nov-3 Dec £238.7 vs £252.3 (+6%).

## Priority 1: P12 Mile End (26 Nov tomorrow; 30 Nov-3 Dec; 4-7 Dec rebooked)
- **Quality:** `quality_premium(4.27, 4.875)` = **-0.15** (cap). Ours 4.27 from 15 reviews; stored-comp median 4.875 from 25 (gap 10). **Supported: band median x 0.85-1.00.**
- Booked next 30/60: 73% / 87% vs market 43% / 32% (`pl_kpis` 25 Nov, stale for P12: the 4-7 Dec rebook is not in it).
- Open nights before the 13 Dec handback: **26 Nov** (1 n, min 1) and **30 Nov-3 Dec** (4 n, min 2). Nothing else.

| Stay | Ours, Airbnb all-in £/n (24 Nov) | PriceLabs room (24 Nov) | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room | Move vs PriceLabs | Market pctl |
|---|---|---|---|---|---|---|---|
| **26-27 Nov (1 n)** | **347** (350) | **290** (294), min 1 | 276 (6), **P100, +25.7%** | 283 (2), P100, +22.6% | **196-231** | **-32% to -20%** | **P86** |
| **30 Nov-3 Dec** | **243.33** (238.67; £730 struck from £832) | **242/257/258** (242/241/256) | 232.33 (9), P56, +4.7% | 250.67 (5), P40, -2.9% | 205-241 | -19% to -5% | **P73** |
| 30 Nov-4 Dec (whole gap, 4 n) | 233.00 (231.50; £932 struck from £1,070) | 242/257/258/265 | 254.75 (9), P33, -8.5% | 277.5 (3), P0, -16.0% | 237-279 | -7% to +9% | P73 |
| 30 Nov-2 Dec | 253.50 | 242/257 | 241 (8), P50, +5.2% | 254 (3), P33, -0.2% | 202-237 | -19% to -5% | |
| 1-3 Dec (midweek default) | 259.50 (253.00) | 257/258 | 273 (5), P40, -4.9% | 254 (3), P67, +2.2% | 230-271 | -11% to +5% | |
| 2-4 Dec | 263.00 (266.00) | 258/265 | 254 (7), P57, +3.5% | 268 (2), P50, -1.9% | 215-253 | -18% to -3% | P72 |
| 4-7 Dec | **closed on Airbnb (correct; Booking.com £766.54 = £255.51/n)** | 311/331/267 (`available` True: stale) | 312.33 (3) | n/a (0) | | | paid = P67 |
| 3-7 Dec | closed on Airbnb | 265/311/331/267 | 272.5 (4) | n/a (0) | | | |

- **26 Nov: about -20% supported (room about £230), keep min 1.** It is P100, +26% vs band (n 6) and P86 in the market; the top of the supported range is -20%. It is tomorrow and sits between two bookings (21-26 Nov out, 27 Nov in). The +15% override on 26 Nov (set 4 Nov) is what holds it up: the default-customisation price is £197. **t-p12-26nov-price: not fixed (day 8).**
- **30 Nov-3 Dec: hold (0%), with up to -5% on 30 Nov-2 Dec.** The 4-night whole gap (the stay that fills it) is P33 and -8.5% vs band (supported -7% to +9%); the 3-night 30 Nov-3 Dec is P56, +4.7% (supported -19% to -5%). The evidence splits by stay length, so no blanket move. PriceLabs raised 1-2 Dec by £16/£2 overnight, which put 30 Nov-2 Dec at +5% vs band.
- **3 Dec: about -5% supported** (2-4 Dec +3.5% vs band, n 7; 265 -> about £252). Yesterday's -10% shrank because the band moved.
- **4-7 Dec: closed.** The rebook (£255.51/n) beat the cancelled stay (£225.93/n) by £29.58/n (+£88.75 over 3 n) and sits at market P67. P12's PriceLabs calendar still shows 4-6 Dec open (no refresh since 24 Nov 09:43Z): a PriceLabs data lag, not an Airbnb exposure.
- **`recommend`:** both horizons return a mechanical **raise +10%** (30-day 73% vs 43%, 60-day 87% vs 32%, median comp percentile P45 over 6 open stays). **Not adopted.** The lead comes from nights already sold; the open stays are at or above the band median against a quality ceiling of 0%; the raise branch ignores a negative `quality_premium`; and nothing after 13 Dec can be sold.
- For the channel agent: on 30 Nov-3 Dec and 30 Nov-4 Dec the Airbnb total is shown struck through (£832 -> £730; £1,070 -> £932, about -12% / -13%) and is again **below the PriceLabs room alone** (£757 / £1,022), before cleaning. These are 3-4-night stays, so the policy weekly 15% does not apply. Source of the strike-through: NOT VERIFIED.

## Priority 2: P04 Barking
- **Quality:** `quality_premium(4.27, 4.83)` = **-0.15** (cap). Ours **4.27 from 11 reviews** (24 Nov 4.2 (10)); comp median 4.83 from 27 (gap 16). **Supported: -15% to 0% vs the band median.**
- Booked next 30/60: 47% / 37% vs market 23% / 17%.
- Overrides: **6-23 Dec -5% min 3 (Reyhan, 24 Nov 10:52:35Z; was -2%)**; rest unchanged (see Method).

### Unsynced Airbnb 1455876748739910219 (asked: 10-14 Dec; also 6-9 and 17-20 Dec)

| Listing | Stay | Airbnb total | £/n all-in | Status (checked 25 Nov) | Our nights |
|---|---|---|---|---|---|
| 1455876748739910219 (unsynced, 4.69 (26)) | **10-14 Dec** | **£754** | 188.50 | **BOOKABLE** (07:26:18Z wide, 07:30:03Z box) | **all 4 nights sold (Booking.com £488.35, confirmed, booked 22 Nov)** |
| 1455876748739910219 | 6-9 Dec | £590 | 196.67 | bookable (box 07:29:38Z) | open (synced £518 = £172.67/n) |
| 1455876748739910219 | 17-20 Dec | £608 | 202.67 | bookable (07:26:50Z) | open (synced £494 = £164.67/n) |
| 1455876748739910219 | 18-20 Dec | £451 | 225.50 | bookable | open; synced listing closed there (min 3) |
| 1455876748739910219 | 6-10, 7-10, 14-17, 15-19, 16-19 Dec | £578-748 | 186.00-198.33 | bookable | open on the synced listing too |
| 1455876748739910219 | 28 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan; any stay from 20 Dec | n/a | n/a | not returned (closed) | sold / open |
| 1657859794156786222 (synced) | 10-14 Dec, 28 Nov-2 Dec, 3-6 Dec | n/a | n/a | not returned (closed, correct) | |

- **Double-sale exposure today: 10-14 Dec (£488.35 Booking.com stay), day 26.** The fix is to close those dates on 1455, or map or unlist 1455. That is a channel action, not a price action. 6-9 and 17-20 Dec are not a double sale today (the flat is open), but any booking on either listing leaves the other one selling.

### Open December stays (asked: 7-10 Dec, 14-22 Dec, 17-20 Dec)

| Stay | Ours, Airbnb all-in £/n (24 Nov) | PriceLabs room (24 Nov) | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n | Market pctl |
|---|---|---|---|---|---|---|---|
| 6-9 Dec | 172.67 (168.33) | 163/164/164 (168/170/169) | 222 (3), -22.2% | 176.67 (5), -2.3% | P40 | 142-167 (-13% to +2%) | P56 |
| 6-10 Dec | 160.25 (152.75) | 163/164/164/161 | 206 (2), -22.2% | 170 (5), -5.7% | P20 | 147-173 (-10% to +6%) | |
| **7-10 Dec** | **172.33** (161.00) | **164/164/161** (170/169/166) | 210.67 (2), -18.2% | 188 (6), **-8.3%** | P33 | **151-178 (-7% to +9%)** | **P56** |
| 14-17 Dec | 157.00 (153.00) | 140/143/146 (144/148/151) | 239.84 (4), -34.5% | 222 (7), -29.3% | P14 | 172-202 (+20% to +41%) | |
| **14-22 Dec (8 n)** | **128.38** (124.38; £1,027 struck from £1,222: weekly discount) | **140/143/146/149/153/158/155/155** | 207 (1), **-38.0%** | 168.5 (4), **-23.8%** | P25 | 167-197 (+12% to +31%, incl. the weekly 15%) | **P44** |
| 15-19 Dec | 148.75 (144.75) | 143/146/149/153 | 254 (3), -41.4% | 227.88 (6), -34.7% | P0 | 192-226 (+30% to +53%) | |
| 16-19 Dec | 161.67 (157.67) | 146/149/153 | 257.67 (3), -37.3% | 228.5 (6), -29.2% | P0 | 179-211 (+20% to +41%) | |
| **17-20 Dec** | **164.67** (160.33) | **149/153/158** (153/157/163) | 239.84 (2), **-31.3%** | 231 (4), **-28.7%** | **P0** | **183-215 (+19% to +40%)** | **P43** |
| 19-22 Dec | 167.00 (162.33) | 158/155/155 | 222 (1), -24.8% | 222 (3), -24.8% | P0 | 176-207 (+13% to +33%) | |

- **7-10 Dec: hold to +5%** (room about £164-172). The Airbnb total rose to £517 and the op band fell (200.33 -> 188, n 6), so the gap is now -8% vs band (supported -7% to +9%). Yesterday +6%.
- **14-22 Dec: about +20% on the nightly room** (to about £170-185), measured on the 3-4-night stays inside the window (low ends +13% to +30%). The 8-night stay is -24% vs band op (n 4) and -38% vs the one stored comp.
- **17-20 Dec: about +20% supported** (room about £179/184/190; all-in about £195/n). P0, -29% vs band and -31% vs stored. Our own unsynced 1455 sells the same dates at £202.67/n.
- **Reyhan's -5% on 6-23 Dec moves the room the wrong way on this evidence** (P0 on every 14-22 Dec stay; market P43-P44). Reverting it to -2% is about +3%, well inside the supported range. **For Corentin: confirm or revert.**
- **Counter-signal, carried:** 1072316558208098643 (0.33 km, 4.93 (76), Superhost, not a stored comp) is at £150-165/n on 7-17 Dec, and 1245634494660468861 (0.04 km, 4.88 (25)) at £176.67/n. The band op median still sits at £222-231 on 14-22 Dec.
- **`recommend`:** 30-day 47% vs 23%, comp P0, quality -0.15 = **raise +10%**. 31-60-day 37% vs 17% = **raise +10%**. Adopted at the larger size above for 14-20 Dec, because the comp gap is larger than the formula step. 7-10 Dec 0 to +5%.

### Christmas (asked: 20-26 Dec)

| Stay | Ours, Airbnb all-in £/n (24 Nov) | PriceLabs room | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n | Market pctl |
|---|---|---|---|---|---|---|---|
| **20-26 Dec (6 n)** | **156.67** (158.17; £940 struck from £1,028) | 155/155/154/157/175/188 = £984 (24 Nov £1,004) | 226 (1), -30.7% | 200.25 (4), **-21.8%** | **P0** | 178-210 (+9% to +28%) | **P50** |
| 20-23 Dec | 165.67 (161.33) | 155/155/154 | 222 (1), -25.4% | 222 (3), -25.4% | P0 | 176-207 (+14% to +34%) | |
| 21-24 Dec | 166.33 (174.33) | 155/154/157 | 222 (1), -25.1% | 214 (5), -22.3% | P0 | 170-200 (+9% to +29%) | |
| 23-26 Dec | 196.33 (212.33) | 157/175/188 | 230 (1), -14.6% | 205 (4), -4.2% | P50 | 154-181 (-11% to +4%) | |
| 23-27 Dec | 189.00 (202.00) | 157/175/188/185 | 231 (1), -18.2% | 206.5 (4), -8.5% | P50 | 164-193 (-7% to +9%) | |
| 24-27 Dec | 212.00 (218.33) | 175/188/185 | 247 (2), -14.2% | 210.33 (4), +0.8% | P50 | 154-181 (-16% to -1%) | |
| 24-26 Dec (2 n) | 228.00 (235.50); bookable only because of min 2 | 175/188 | 234 (1), -2.6% | 190 (5), +20.0% | P60 | 129-151 (-29% to -17%) | P55 |
| 25-27 Dec (2 n, 30 days out) | 232.50 (235.50); min 2 | 188/185 | 234 (1), -0.6% | 190.5 (3), +22.0% | P67 | 130-153 (-30% to -18%) | |
| 20-27 Dec (7 n) | 143.57 (145.29; £1,005 struck from £1,195) | avg 167 | 211.71 (1), -32.2% | 171.57 (2), -16.3% | P50 | 170-200 (incl. weekly 15%) | |

- **20-26 Dec: about +10% on the 6-night stay, delivered on 20-22 Dec (about +15%: room about £178); hold 23-26 Dec.** The 6-night block is P0, -22% vs band op. 23-26 Dec is at the band median.
- **Min stays, for Corentin to confirm or revert (carried, unchanged):** 24-26 Dec min 2 is below the standing P04 floor of 3 nights. The 2-night stays it opens price +20% to +22% above the band op.

### 10-14 Dec (sold on Booking.com at £122.09/n), carried
- Paid £488.35 / 4 n = **£122.09/n**: below market P25 (£127.8), -34% vs the Airbnb band op (£186.25, n 4) and -35% vs our own unsynced 1455 on the same dates (£188.50/n today). Rate plan and cleaning: NOT CHECKED.

### 2 Dec (1 n, +200% min 1; deprioritised in policy)
- Bookable on the synced Airbnb at **£453** (room £423). Band op £230 (n 3). Reported only.

## Priority 3: P01 Bowsprit Point 18-20 Dec (blocked, before the 20 Dec handback)
- **Still blocked:** 18-20 Dec `Blocked`, 280/290, min 3 (24 Nov 282/290). Not returned on Airbnb.
- **Comps:** 18-20 Dec stored **£419** (3; 24 Nov £376), band £376 (9). 18-21 Dec stored **£382.67** (7), band £345 (15). 19-21 Dec stored £407 (3), band £370.75 (8). Most of the rise is one comp: 41905186 (0.38 km, 4.38 (34)) +£45 to +£287 across December.
- **If reopened** at today's 280/290/250 plus £149 cleaning (carried figure), before any Airbnb guest fee:
  - 18-20 Dec: £359.50/n, -14.2% vs stored, -4.4% vs band.
  - 18-21 Dec: £323/n, -15.6% vs stored, -6.4% vs band.
  - 19-21 Dec: £344.50/n, -15.4% vs stored, -7.1% vs band.
  - PriceLabs NL: P66 (18-20 Dec) and P63 (18-21 Dec).
- **Supported: about -2% vs the comp median** (`quality_premium(4.75, 4.8)` = -0.02, on only 4 reviews). That is **+2% (band) to +12% (stored) above today's room; about +5% adopted**, because the Airbnb guest fee is not in our estimate and the stored rise rests on one comp. No cut is needed.
- **For Corentin (carried policy conflict):** the handback policy says "before the date, maximise revenue normally", but £820 of room nights (280 + 290 + 250) stay blocked.

## Priority 4: P09 Torrent Lodge
- **No open night before the 26 Nov handback** (25-26 Nov booked; 27 Nov onwards blocked by the handback). Nothing to position.
- Comps (trend only): 1-3 Dec stored median £194 (3); December £168-240.5 (n 2-3). `quality_premium(5.0, 4.56)` = +0.15, on only 3 reviews. `recommend`: raise-signal (30-day 100% vs market 40%).

## Summary per property
| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30/60 vs market | `recommend` | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (18-20 Dec blocked) | stored 382.67-419 (n 3-7) on 18-21 Dec | n/a (would be -14% to -16% stored, -4% to -7% band) | 4.75 vs 4.8 | 4 vs 30 (-26) | -0.02 | 100%/100% vs 35%/27% | raise-signal | **-2% vs median**: if reopened, about +5% on the room |
| P04 (synced 1657...) | 7-10 Dec 172.33; **14-22 Dec 128.38 (8 n)**; **17-20 Dec 164.67**; 20-26 Dec 156.67; Christmas 143.57-232.5 | stored 206-257.67 (n 1-4); band op 168.5-231 (n 2-7) | P0 stored on every open stay; P0-P67 band op | **4.27** vs 4.83 | 11 vs 27 (-16) | -0.15 | 47%/37% vs 23%/17% | raise +10% (both horizons) | **-15% to 0% vs band. 14-22 Dec about +20%; 17-20 Dec about +20%; 7-10 Dec 0 to +5%; 20-26 Dec about +10% (20-22 Dec +15%, 23-26 hold)**; Reyhan's -5% on 6-23 Dec and 24-26 Dec min 2 = confirm or revert |
| P04 unsynced 1455... | 186-225.5; **bookable on sold 10-14 Dec (£754)** | | | 4.69 | 26 | n/a | | | map, close or unlist |
| P09 | no sellable night | 168-240.5 (n 2-3) | n/a | 5.0 vs 4.56 | 3 vs 25 (-22) | +0.15 | 100%/100% vs 40%/30% | raise-signal | nothing before the handback |
| P12 | open 233-347 | band 232.33-276; stored 250.67-283 | 26 Nov P100; 30 Nov-3 Dec P40 stored / P56 band; 30 Nov-4 Dec P0 / P33 | 4.27 vs 4.875 | 15 vs 25 (-10) | -0.15 | 73%/87% vs 43%/32% (stale) | raise +10% (P45): **not adopted** | **-15% to 0% vs band. 26 Nov about -20%; 30 Nov-3 Dec hold (up to -5% on 30 Nov-2 Dec); 3 Dec about -5%; 4-7 Dec booked** |
| P15 | no listing of ours | 137.75-164.25 (n 3-4) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 25 Nov)
| Item | Status |
|---|---|
| **t-p04-doublebook** | **Not fixed (day 26):** 1455 still bookable on **10-14 Dec (£754; 4 nights sold on Booking.com 22 Nov)**, checked twice 25 Nov. Also open on 6-9 Dec (£590) and 17-20 Dec (£608), where the flat is still open. Closed on every older booked stay. |
| a-p04-dec-1611 | **Moved the wrong way:** Reyhan set 6-23 Dec to -5% (was -2%), 24 Nov 10:52:35Z; room -£4-6/night. Airbnb totals rose £13-34 on most stays (20-26 Dec -£9) for the first time since 21 Nov (cause NOT VERIFIED). 14-20 Dec still P0, -29% to -41% vs band op; about +20% supported. 7-10 Dec 0 to +5%. |
| t-p04-xmas-1711 | 20-26 Dec room £984 (24 Nov £1,004); Airbnb £940 (P0, -22% vs band op). Supported: 20-22 Dec about +15%, 23-26 Dec hold. **Min 2 on 24-26 Dec = confirm or revert (Corentin).** |
| t-p12-reopen-2411 | **Can close:** 4-7 Dec rebooked on Booking.com £766.54 (£255.51/n, market P67), +£88.75 vs the cancelled stay; Airbnb closed for those dates. PriceLabs still shows 4-6 Dec open until P12 refreshes. |
| a-p12-trim | 3 Dec only: about -5% (2-4 Dec +3.5% vs band). 30 Nov-2 Dec moved up £16 overnight; hold to -5%. |
| t-p12-26nov-price | **Not fixed (day 8):** 294 -> 290 by the algorithm (£347 all-in, P100, +26% vs band, market P86). About £230 is supported; it is tomorrow. |
| t-p01-1820block | **Not fixed** (still `Blocked`). For Corentin. |
| Push freshness (`listings.csv`) | P04 24 Nov 10:54Z (after Reyhan's 10:52Z edit, so edit-triggered); P12 24 Nov 09:43Z (no overnight refresh; no P12 edit logged 24-25 Nov); P01 25 Nov 04:02Z; P09 25 Nov 06:02Z. |

## Critical / high findings
- **CRITICAL: P04 unsynced Airbnb 1455876748739910219 is still bookable on 10-14 Dec at £754 (£188.50/n)**, the 4 nights sold on Booking.com on 22 Nov (£488.35, confirmed). Checked 25 Nov 07:26:18Z and 07:30:03Z. Day 26.
- **HIGH (for Corentin, confirm or revert): Reyhan deepened the P04 6-23 Dec override to -5% (from -2%)**, 24 Nov 10:52:35Z, on dates where P04 is P0 vs comps and market P43-P56. It goes against the "cut PriceLabs discounts" direction.
- **HIGH: P04 14-22 Dec and 17-20 Dec are P0 vs comps.** 17-20 Dec is £164.67/n all-in vs £231 band op (n 4) and £239.84 stored (n 2), -29% to -31%. The 8-night 14-22 Dec is £128.38/n vs £168.5 (n 4), -24%. Market P43-P44. About +20% is supported.
- **HIGH: P12 26 Nov (tomorrow) £290 room / £347 all-in is P100**, +26% vs band (n 6), market P86. About £230 is supported (day 8).
- **HIGH (for Corentin, carried): P04 24-26 Dec +5% with min 2** (Reyhan, 20 Nov 22:53Z), below the standing 3-night floor.
- **HIGH (for Corentin, carried): P01 18-20 Dec still blocked.** Reopened at today's prices it would sit -4% to -7% vs band and -14% to -16% vs stored comps; £820 of room nights held.
- **MEDIUM: P12 4-7 Dec rebooked** at £255.51/n (market P67), Airbnb closed: t-p12-reopen-2411 can close. PriceLabs still shows the nights open (no refresh since 24 Nov 09:43Z).
- **MEDIUM: P04 20-26 Dec** £156.67/n vs £200.25 band op (n 4), -22%, P0. About +15% on 20-22 Dec; hold 23-26 Dec.
- **MEDIUM: P12 3 Dec** (2-4 Dec £263/n, +3.5% vs band, n 7): about -5% supported.

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-25 07:25-07:41Z.
- "24 Nov x" = the same comp and stay on 24 Nov, where the two differ by more than £1.
- `*` = found by the 0.3 km second pass.
- "–" = not returned in the wide search or the 0.3 km box (booked or unavailable).
- "(earlier read)" = km from an earlier day; the comp was not returned today.
- Full source for every row: `data/snapshots/2026-11-25/comps.csv` (`comp-east`, `east-refband`, `east-ours`).
- Cancellation policy: NOT CHECKED. Differentiators come from listing-page reads on 25 Oct-15 Nov.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, search party 4

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 27 Nov-29 Nov | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | – | 348.33 | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 430* | 394 | 497* | 575 (24 Nov 370) | 682* (24 Nov 395) | 500 (24 Nov 387) | 419 (24 Nov 374) | 414.33 (24 Nov 349) | 407 (24 Nov 354) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.43 (166) | none listed | – | – | – | – | – | 197.5 (24 Nov 221.5) | – | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (57) | Lift | – | – | – | – | – | – | – | 403 | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 (earlier read) | 6 | 4.6 (30) | Lift/River view/balcony | – | – | – | – | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking/River view/balcony | – | – | – | – | – | – | – | 382.67 | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (22) | Skyline view/Free parking/Lift/Superhost/balcony/Guest fav | 353.5 | – | – | – | – | – | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | 308.5 | – | 395.5 | 376 | 357 | 357 | 376 | 369.67 | 366.5 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.83 (18) | Lift | – | – | 335 | 335 | 335 | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (45) | Lift/patio or balcony/Superhost/Guest fav | – | – | 601.5 | 590* | 539.5 | 539.5* | 528 | 524 | 534 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost | – | – | – | – | – | – | – | 281.33 | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **353.5** (3) | **394** (1) | **446.25** (4) | **475.5** (4) | **448.25** (4) | **428.5** (4) | **419** (3) | **382.67** (7) | **407** (3) |
| **Band median (n)** | | | | | 266.25 (8) | 352 (2) | 392.75 (8) | 376 (9) | 346 (10) | 281.5 (9) | 376 (9) | 345 (15) | 370.75 (8) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.27 (11); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, search party 4

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 27 Nov-29 Nov | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 28 Nov-2 Dec | 2 Dec-3 Dec | 3 Dec-6 Dec | 6 Dec-9 Dec | 6 Dec-10 Dec | 7 Dec-10 Dec | 10 Dec-14 Dec | 14 Dec-17 Dec | 14 Dec-22 Dec | 15 Dec-19 Dec | 16 Dec-19 Dec | 17 Dec-20 Dec | 19 Dec-22 Dec | 20 Dec-23 Dec | 21 Dec-24 Dec | 23 Dec-26 Dec | 23 Dec-27 Dec | 24 Dec-27 Dec | 20 Dec-26 Dec | 20 Dec-27 Dec | 27 Dec-4 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | – | – | – | – | – | 254 | – | 257.67 | – | – | – | – | 257.67 | – | 254 | 257.67 | 257.67 | – | – | – | – | – | 260 | – | – | – |
| [985683261536682900](https://www.airbnb.co.uk/rooms/985683261536682900) | 0.61 (earlier read) | 5 | 4.82 (17) | Paid street parking/Superhost | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 (earlier read) | 5 | 5.0 (28) | Free parking/Superhost/Guest fav | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.76 (42) | Free parking/Superhost | 287.5 | – | – | – | – | – | – | – | 350 | – | 248.33 | – | – | – | 265 | – | 267.5 | 273.33 | – | – | – | – | – | – | – | – | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | 222 | – | 234 | 234 | 228 | 222 | 222 | – | 222 | – | 222* | 222 | 222 | – | 222 | 207 | 222 | 222 | 222 | 222 | 222 | 222 | 230 | 231 | 234* | 226 | 211.71 | – |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 (earlier read) | 6 | 4.85 (27) | Parking (in name) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (18) | Free street parking/Superhost | 208 | – | – | – | – | – | – | – | – | – | 198 | 190 | 199.33 | 196.5 | 199.33 | – | – | – | – | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | **232.5** | **228** | not bookable | not bookable | not bookable | not bookable | **453** | not bookable | **172.67** | **160.25** | **172.33** | not bookable | **157** | **128.38** | **148.75** | **161.67** | **164.67** | **167** | **165.67** | **166.33** | **196.33** | **189** | **212** | **156.67** | **143.57** | not bookable |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **225.5** | not bookable | not bookable | not bookable | **196.67** | **186** | **195** | **188.5** | **192.67** | not bookable | **187** | **198.33** | **202.67** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **222** (3) | n/a (0) | **234** (1) | **234** (1) | **228** (1) | **222** (1) | **222** (1) | **254** (1) | **286** (2) | **257.67** (1) | **222** (3) | **206** (2) | **210.67** (2) | **196.5** (1) | **239.84** (4) | **207** (1) | **254** (3) | **257.67** (3) | **239.84** (2) | **222** (1) | **222** (1) | **222** (1) | **230** (1) | **231** (1) | **247** (2) | **226** (1) | **211.71** (1) | n/a (0) |
| **Band median (n)** | | | | | 190 (7) | 190 (1) | 190.5 (3) | 190 (5) | 209 (4) | 222 (3) | 206 (2) | 233.75 (3) | 230 (3) | 257.67 (1) | 176.67 (5) | 170 (5) | 188 (6) | 186.25 (4) | 222 (7) | 168.5 (4) | 227.88 (6) | 228.5 (6) | 231 (4) | 222 (3) | 222 (3) | 214 (5) | 205 (4) | 206.5 (4) | 210.33 (4) | 200.25 (4) | 171.57 (2) | 159.75 (2) |
| **Our pctl (vs comp median)** | | | | | – | – | P0 (-0.6%) | P0 (-2.6%) | – | – | – | – | P100 (+58.4%) | – | P0 (-22.2%) | P0 (-22.2%) | P0 (-18.2%) | – | P0 (-34.5%) | P0 (-38.0%) | P0 (-41.4%) | P0 (-37.3%) | P0 (-31.3%) | P0 (-24.8%) | P0 (-25.4%) | P0 (-25.1%) | P0 (-14.6%) | P0 (-18.2%) | P0 (-14.2%) | P0 (-30.7%) | P0 (-32.2%) | – |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, search party 3

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 27 Nov-29 Nov | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | – | – | – | – | – | 168 (24 Nov 169.5) | 168 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | – | – | – | – | – | 165 | 165 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.7 (23) | none listed | 148.5 | – | – | 205.5 (24 Nov 210) | – | – | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest fav | 248.5 | – | 248.5 | 248.5 | 248.5 | 248.5 | 248.5 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | 194 | – | 232.5 | 215.5 | 206.5 | – | – |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 (earlier read) | 3 | 4.75 (16) | Skyline view/balcony | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **194** (3) | n/a (0) | **240.5** (2) | **215.5** (3) | **227.5** (2) | **168** (3) | **168** (3) |
| **Band median (n)** | | | | | 180 (9) | 209 (1) | 248.5 (5) | 215.5 (7) | 170.75 (6) | 193 (8) | 211.25 (6) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, search party 4

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 27 Nov-29 Nov | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 30 Nov-2 Dec | 2 Dec-4 Dec | 4 Dec-7 Dec | 3 Dec-7 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.5* | 237.5 | 337.5 | 337.5 | 337.5 | 287.5 | 237.5 | – | 225 | – | 237.5* | – | – | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking | – | – | – | – | – | – | – | – | 283.33* | 277.5 | – | – | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (80) | Superhost | – | – | – | – | – | – | – | – | 194.67 | – | – | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 (earlier read) | 6 | 4.94 (16) | Superhost/Guest fav | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (121) | Superhost/balcony/Guest fav | 254 | – | – | – | – | – | – | 284 | 250.67 | 243.75 | 254 | 254 | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1 | 6 | 4.54 (13) | Paid parking/balcony (placeholder price, excluded) | 1044.5 (24 Nov 1035) | 1035 | 1035 | 1035 | 1035 | 1035 | 1035 | 1080 (24 Nov 1043) | 1038.67 (24 Nov 1032.33) | 1035.75 (24 Nov 1031) | 1044.5 | 1035 | 1032.33 | 1031 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift | 282 | – | – | – | – | 282 | – | 282 (24 Nov 263) | 282 | 282 | 282 | 282 | – | – |
| **Ours** | | | | | **259.5** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **347** | **243.33** | **233** | **253.5** | **263** | not bookable | not bookable |
| **Comp median (n)** | | | | | **254** (3) | **237.5** (1) | **337.5** (1) | **337.5** (1) | **337.5** (1) | **284.75** (2) | **237.5** (1) | **283** (2) | **250.67** (5) | **277.5** (3) | **254** (3) | **268** (2) | n/a (0) | n/a (0) |
| **Band median (n)** | | | | | 273 (5) | 295 (2) | 293.25 (10) | 292 (14) | 296.5 (12) | 270.25 (12) | 322 (7) | 276 (6) | 232.33 (9) | 254.75 (9) | 241 (8) | 254 (7) | 312.33 (3) | 272.5 (4) |
| **Our pctl (vs comp median)** | | | | | P67 (+2.2%) | – | – | – | – | – | – | P100 (+22.6%) | P40 (-2.9%) | P0 (-16.0%) | P33 (-0.2%) | P50 (-1.9%) | – | – |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, search party 3

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1 Dec-3 Dec | 27 Nov-29 Nov | 25 Dec-27 Dec | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | 111 | – | 218 | 183 (24 Nov 205.5) | 170.5 | 170.5 | 195.5 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 (earlier read) | 4 | 4.93 (14) | Superhost/Guest fav | – | – | – | – | – | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.81 | 3 | 4.87 (15) | Paid parking/Superhost | 135 | – | 160 | 147.5 | 135 | 135 | 160 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.85 (earlier read) | 4 | 4.71 (14) | Lift/Paid parking | – | – | – | – | – | – | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.84 | 4 | 4.92 (25) | Free parking/Guest fav | 145 | – | – | 181 | – | – | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (204) | Garden view/Lift/Paid parking off/Superhost | 140.5 | – | 140.5 | 145.5* | 150.5 | 155.5 | 160.5 |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.03 (earlier read) | 4 | 4.64 (14) | Lift | – | – | – | – | – | – | – |
| **Comp median (n)** | | | | | **137.75** (4) | n/a (0) | **160** (3) | **164.25** (4) | **150.5** (3) | **155.5** (3) | **160.5** (3) |
| **Band median (n)** | | | | | 134.75 (10) | 228.75 (2) | 183.5 (6) | 182 (8) | 173.75 (8) | 156.25 (6) | 160.5 (5) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings (Airbnb only).
- **P04 comp set is below the 6-comp minimum in practice:** 4 of 7 stored comps were returned on any stay. 985683261536682900, 1733027244747346716 and 1387112821878102742 have not been returned for 6 days on any stay 25 Nov-4 Jan. Inactivity NOT VERIFIED (January not searched, no calendar read), so they are not replaced. Stored n = 1-4 per stay; band op n = 2-7. Replacement candidates (2BR, 10+ reviews, inside 2.5 km, returned today; sleeps NOT CHECKED): 1072316558208098643 (0.33 km, 4.93 (76), Superhost), 43709205 (1.78 km, 4.91 (47), Superhost), 1245634494660468861 (0.04 km, 4.88 (25)), 934755638180855305 (0.42 km, 4.8 (41)).
- **P12 KPIs (`pl_kpis`) and `prices.csv` are stale for P12:** no refresh since 24 Nov 09:43Z, so the 4-7 Dec rebook is not in the 30/60-day occupancy and 4-6 Dec shows `available` True. The `recommend` inputs for P12 are therefore stale.
- **P12 stored-comp coverage is thin:** 2-5 of 6 usable comps per open stay; 1670196516322802487 not returned for a second day (kept).
- **Why the P04 Airbnb guest price rose while the PriceLabs room fell** (7-10 Dec £483 -> £517 with room -£16), and why the P12 Airbnb total shows a 12-13% strike-through on 3-4-night stays and sits below the PriceLabs room: NOT VERIFIED (channel agent).
- Kept as booked, not inactive (not returned on any stay today): P01 852256049507701872; P09 958156921765583815; P15 1371771992549776701, 1528442618668335413, 1444741453093610023 (new today).
- P04 4-10 Jan and P12 January were not priced against comps. The P01 cleaning fee of £149 is carried, not re-read.
- Comp cancellation policies, band-listing sleeps and current lift/view/parking: NOT CHECKED today (carried from the 25 Oct-15 Nov reads).
- **Smoobu was not called.** Room prices are PriceLabs `prices.csv` 25 Nov.
- NL percentiles: horizon not stated, host-only-fee basis, 1-3BR (P04, P01) or 2-3BR (P12). These are market bands, not like-for-like. Booking.com paid figures (P12 4-7 Dec, P04 10-14 Dec) are compared to them as room-only.
