# Competitor positioning: EAST batch (D = 2026-11-24)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy `intentional_blocks`). Not analysed.
- **P15** has no listing of ours. Reference only.
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec, 30 Nov-17 Dec inside the handback block set; P09 26 Nov; P12 13 Dec). **P12 4-7 Dec is before the 13 Dec handback, so it is sellable inventory.** P09 and P12 Christmas stays are comp trend only.

**Method** (same as 26 Oct-23 Nov; scripts copied from scratchpad `east23/bin` to `east24/bin`, only dates and paths changed)
- **Comp ids:** the same set as 23 Nov (P01 11, P04 7, P09 6, P12 7, P15 7). **No comp replaced today.**
  - P04 985683261536682900, 1733027244747346716 and 1387112821878102742: not returned on any of 29 stays, **fifth day running** (0.3 km box on each, 0 errors). Kept as booked; inactivity NOT VERIFIED (no calendar read). P04 has 4 live comps, below the 6 minimum (candidates under Data gaps).
  - Not returned on any stay today, kept as booked: P01 852256049507701872, 1418178473526356202; P09 958156921765583815; **P12 1670196516322802487 (new today; returned on 1 stay on 23 Nov, 3 on 21-22 Nov)**; P15 1371771992549776701, **1528442618668335413 (new today)**.
  - P12 29297702 still shows a placeholder-like price (£1,031-1,043/n). Out of the medians (`nightly_gbp` blank, price in `source`).
- **Access:** public Airbnb search pages (HTTP 200). 74 wide searches with pagination, 0 failures; then 400 comp/stay checks in a 0.3 km box, 8 hits, 0 errors. Box sizes: 2.5 km P04, 1.8 km P09, 1.3 km the rest. Search party 4 for 2BR, 3 for 1BR. Checked **2026-11-24 07:20:50-07:28:49Z**. **Booking.com: NOT CHECKED.** (A direct Airbnb calendar-API read to settle 1455's 24 Nov status was refused by the permission system; not attempted again.)
- **Price basis = what guests see:** Airbnb **guest-paid all-in total / nights**, after discounts, with cleaning and Airbnb fees **included**; no separate taxes shown. Ours priced the same way. PriceLabs/Smoobu figures (`prices.csv` 24 Nov) are **room only, cleaning excluded**; today's file starts 25 Nov, so 24 Nov comes from the 23 Nov file. Stays of 7+ nights include the 15% weekly discount (policy).
- **Stays (same dates for comps and us):** default midweek **24-26 Nov** (Tue-Thu), next Fri-Sun **27-29 Nov**, 30 days out **24-26 Dec**; trend stays 23-25, 20-22, 18-20 Dec.
  - P12, as asked: **4-7 Dec** (reopened), 4-6, 5-7, 3-7 Dec; **26-27 Nov**; **30 Nov-3 Dec**, 30 Nov-4, 1-3, 2-4 Dec.
  - P04, as asked: **7-10 Dec**, 6-9, 6-10 Dec; **14-22 Dec** (8 n), 14-17, 15-19, 16-19, **17-20**, 19-22 Dec; **20-26 Dec**, 20-23, 21-24, 23-26, 23-27, 24-27, 25-27, 20-27 Dec. Unsynced check: **24-25 Nov**, 24-26 Nov, **10-14 Dec**, and the booked stays 25-28 Nov, 28 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan.
  - P01: **18-20 Dec**, 18-21, 19-21 Dec.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius; ours and >£1,000/n excluded; P04's 1531... operator units collapsed into one ("op").
- **"Supported room"** = band median x 0.85-1.00 (the `quality_premium` range), converted back to room price with each stay's own Airbnb all-in / PriceLabs room ratio. Approximate.
- **Data written:** `data/snapshots/2026-11-24/comps.csv` was absent; under `flock` on `.comps.csv.lock` I copied it forward from 23 Nov (16,845 lines, byte-identical prefix), then **appended 979 rows**: 474 `comp-east` (every stored comp x stay; NOT RETURNED rows kept with a blank price), 360 `east-refband` (ref `Pxx:band`), 145 `east-ours` (ref `Pxx:ours`: Airbnb all-in rows and PriceLabs room rows). Other agents appended after me (file now 19,701 lines).
- **PriceLabs (read-only, one call at a time, in this order):**
  - `get_listing_date_overrides` P04, 24 Nov-10 Jan: OK. **No change vs 23 Nov** (6-23 Dec -2% min 3; 24-26 Dec +5% min 2; 27 Dec -5% min 7; 28-31 Dec -5% min 5; 24 Nov -5% min 3; 25 Nov +15% min 2; 26-30 Nov and 3-5 Dec -8% min 3; 1 Dec -2% min 4; 2 Dec +200% min 1).
  - `get_user_logs` (listing; P01, P04, P09, P12; 22-24 Nov): 2 entries. P04 6-23 Dec -2% min 3 (Reyhan, 23 Nov 00:14:34Z, already reported). **New: Reyhan, 23 Nov 21:18:56Z, "Added Date Specific Override" on P12 4-6 Dec, min stay 2, no price value** (the P12 refresh at 21:20Z followed it).
  - `get_listing_date_overrides` P12, 24 Nov-14 Dec: 4-6 Dec min 2, **no price** (updated 23 Nov 21:18:56Z); 7-13 Dec min 3; 26 Nov +15% min 1; 24-25 and 27-29 Nov -15% min 2; 30 Nov-3 Dec min 2, no price.
  - `get_neighbourhood_data` detail for P04, P12, P01: OK, saved to scratchpad `east24/dl/nd_*_detail.json`.
- **Smoobu: not called.** Room prices are `prices.csv` (24 Nov); `smoobu_price` = `pricelabs_price` on every night used. Reservations from `reservations.csv` (24 Nov).
- **Pushes** (`listings.csv` 24 Nov): P04 24 Nov 00:31:08Z (recommended base 201, base 200); P12 23 Nov 21:20:11Z; P01 24 Nov 04:14:16Z; P09 24 Nov 06:28:26Z.

## What changed since 23 Nov (this batch)
**1. CRITICAL, unchanged: the unsynced P04 Airbnb 1455876748739910219 is still bookable on 10-14 Dec**, the 4 nights sold on Booking.com on 22 Nov (£488.35, confirmed): **£754 total (£188.50/n), checked 07:21:56Z.** The synced 1657... is not returned (closed, correct). Day 25 of t-p04-doublebook.
- **24-25 Nov (1 n): 1455 not returned** in the wide search or the 0.3 km box (07:21:13Z / 07:25:01Z). 24-26 Nov not returned either (25 Nov is sold on Booking.com 25 Nov-2 Dec). Yesterday the 1-night 24-25 Nov was also not returned while 23-25 Nov was bookable, so this is consistent with 1455's own minimum stay, **not proof that 24 Nov is closed** (NOT VERIFIED). On our side 24 Nov is an unsellable 1-night gap (PriceLabs `available` False, min 3).
- Still bookable on 1455 (open on the synced listing too): 6-9 Dec £590, 6-10 £744, 7-10 £585, 14-17 £578, 15-19 £748, 16-19 £595, 17-20 **£608**, 18-20 £451.
- Not returned on 1455: every booked stay (25-28 Nov, 28 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan) and every stay touching 20 Dec onwards (14-22, 19-22, 20-23 Dec and all Christmas stays). So the only booked stay 1455 still sells is **10-14 Dec**, the newest booking.

**2. P12 4-7 Dec reopened** (Booking.com 3 n, £677.79 = **£225.93/n gross**, commission £124.17, made 5 Nov, now cancelled). Reyhan set 4-6 Dec to min 2 (no price) at 21:18:56Z; PriceLabs room is **312/332/271 = £915**; Airbnb shows **£850 (£283.33/n)**. 7 Dec is a check-in (Booking.com 7-14 Dec, confirmed), so 4-7 Dec is a clean 3-night Fri-Sun gap.

**3. P12 26 Nov fell again: 307 -> 294 (-£13)**, Airbnb £360 -> **£350**. **30 Nov-3 Dec 254/270/276 -> 242/241/256 (-£61 over 3 n)**, Airbnb £254 -> **£238.67/n**. No logged price edit (algorithm).

**4. P04: PriceLabs room drifted down £1-2/night on 14-22 Dec** (17-20 Dec 154/159/164 -> 153/157/163; 7-9 Dec 170/171/150 -> 170/169/166). **The Airbnb guest totals are identical to 21-23 Nov on every open stay** (17-20 Dec £481, 7-10 Dec £483, 20-26 Dec £949 struck from £1,039, 15-19 Dec £579). Still P0 vs comps.

**5. P01 18-20 Dec still `Blocked`** (282/290, min 3; 23 Nov 282/293). Not returned on Airbnb. t-p01-1820block: not fixed.

**6. Comps held.** 94 of 112 like-for-like comp/stay prices are within £1 of 23 Nov. Moves of £10 or more: P01 41905186 23-25 Dec 300 -> 395, 20-22 Dec 287 -> 387, 19-21 Dec 337 -> 354; P01 1467264633617185891 20-22 Dec 198.5 -> 221.5; P01 1316210326145130709 18-21 Dec 447.67 -> 402.33; P12 1383544079404594066 20-22 Dec 302.5 -> 282; P15 1617544963466664181 23-25 Dec 190 -> 170.5 (P12 29297702 placeholder moves ignored). **No P04 comp moved by £10 or more.**

## PriceLabs market percentiles (`get_neighbourhood_data`, 24 Nov)
Market bands, not comps. "Ours" = PriceLabs room (`final_price`, matches `prices.csv` 24 Nov). Compsets: P04 NL 1-3BR (187); P12 NL 2-3BR (132); P01 NL 1-3BR (282). Basis "Host-only fee"; horizon not stated; percentiles interpolated between P25/P50/P75/P90.

| Ref | 2BR summary P25/P50/P75/P90 (n) | Booked 30/60 vs market (`pl_kpis` 24 Nov) | Ours vs daily market (stay average P25/P50/P75/P90) |
|---|---|---|---|
| P04 | 142/175/211/248 (90) | 47% / 37% vs 23% / 17% (23 Nov 50% / 38%) | 7-10 Dec £168.33 (122.7/153/200.7/239): **P58**. 10-14 Dec room £156 = P47; **Booking.com paid £122.09 = below P25 (129.5)**. 14-22 Dec £154.5 (131/158.9/206/240.9): **P46**. 17-20 Dec £157.67 (135.7/162.3/209.7/240.3): **P46**. 20-26 Dec £167.33 (133.8/166.7/211/267.3): **P50**. 24-26 Dec £181.5: P54 |
| P12 | 172/206/236/292 (117) | **73% / 87% vs 43% / 32%** (23 Nov 83% / 92%; the 4-7 Dec cancellation) | **26 Nov £294 (168/202/233/310): P87.** 30 Nov-3 Dec £246.33 (170/203.3/253.3/301.7): **P72**. 2-4 Dec £265.5: P75. **4-7 Dec £305 (177.7/217.3/274/343): P82**; the cancelled stay's £225.93 would be P54. 4-6 Dec £322: P84. 5-7 Dec £301.5: P82 |
| P01 | 219/263/339/432 (144) | 100% / 100% vs 35% / 27% | **18-20 Dec (blocked) £286 (199.5/233.5/314/455): P66**; 18-21 Dec £274.33: P62 |

- `prices_with_default_customization` vs final (P04): 7-10 Dec £196.0 vs £168.3 (-14%); 14-22 Dec £186.6 vs £154.5 (-17%); 17-20 Dec £193.7 vs £157.7 (-19%); 20-26 Dec £203.2 vs £167.3 (-18%). P12 4-7 Dec £332.7 vs £305 (-8%); 26 Nov £216 vs £294 (+36%: the +15% override plus min 1).

## Priority 1: P12 Mile End (4-7 Dec reopened; 26 Nov; 30 Nov-3 Dec)
- **Quality:** `quality_premium(4.27, 4.875)` = **-0.15** (cap). Ours 4.27 from 15 reviews; stored-comp median 4.875 from 25 (gap 10). **Supported: band median x 0.85-1.00.**
- Booked next 30/60: 73% / 87% vs market 43% / 32% (`pl_kpis` 24 Nov).

| Stay | Ours, Airbnb all-in £/n (23 Nov) | PriceLabs room | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room | Move vs PriceLabs | Market pctl |
|---|---|---|---|---|---|---|---|
| **4-7 Dec (Fri-Sun, reopened)** | **283.33** (£850; new) | **312/332/271** | 325.33 (2), **P0, -12.9%** | n/a (0 of 6 returned) | **298-350** | **-2% to +15%** | P82 |
| 4-6 Dec | 309.00 | 312/332 | 337.5 (1), P0, -8.4% | n/a (0) | 299-352 | -7% to +9% | P84 |
| 5-7 Dec | 293.50 | 332/271 | 356.25 (2), P0, -17.6% | n/a (0) | 311-366 | +3% to +21% | P82 |
| 3-7 Dec (4 n) | 265.25 | 275/312/332/271 | 272.5 (4), P50, -2.7% | n/a (0) | 260-306 | -13% to +3% | |
| **26-27 Nov (1 n)** | **350** (360) | **294** (307), min 1 | 266.5 (6), **P100, +31.3%** | 273.5 (2), P100, +28.0% | **190-224** | **-35% to -24%** | P87 |
| **30 Nov-3 Dec** | **238.67** (254.00) | **242/241/256** (254/270/276) | 241.5 (12), P50, -1.2% | 250.67 (5), P40, -4.8% | 212-249 | -14% to +1% | P72 |
| 30 Nov-4 Dec | 231.50 (246.00) | 242/241/256/275 | 249.25 (10), P40, -7.1% | 277.5 (3), P0, -16.6% | 232-273 | -8% to +8% | |
| 1-3 Dec | 253.00 (271.50) | 241/256 | 254 (7), P43, -0.4% | 254 (3), P33, -0.4% | 212-249 | -15% to 0% | |
| 2-4 Dec | 266.00 (279.00) | 256/275 | 234.75 (8), P62, +13.3% | 268 (2), P50, -0.7% | 199-234 | -25% to -12% | P75 |

- **4-7 Dec: hold (0%); do not cut.** Our £283.33 all-in sits at the bottom of the supported range (band x0.85 = £276.5). The two 10+-review 2BRs left inside 1.3 km are 9005149 (1.24 km, 4.83 (110)) at £312.33 and 51582082 (1.16 km, 4.92 (49), Superhost) at £338.33. **None of the 6 stored comps is available** that weekend and the whole 1.3 km search returned only 21 listings (30 Nov-3 Dec: 51), so supply is tight. Against that, the market band puts the room at P82, and the band is only n = 2. Estimate, not comps: all 11 2BRs in the box regardless of reviews have a median of £312.3, which puts us at P36. Up to +5% is inside the evidence; I am not adopting it on n = 2.
  - **Vs the cancelled stay:** it paid **£225.93/n gross** on Booking.com (made 5 Nov). Today's room (£305/n) is 1.35x that, so a rebooking at today's price is worth more than the stay we lost, if it sells. The Booking.com price for these dates was NOT CHECKED.
- **26 Nov: about -25% supported (room about £220), keep min 1.** It is still P100, +31% vs band and P87 in the market after PriceLabs cut £13. It is two nights out and between two bookings. **t-p12-26nov-price: not fixed (day 7).**
- **30 Nov-3 Dec: hold.** PriceLabs cut £61 over the three nights overnight; we now sit at the band median (P50, -1.2%), at the top of the supported range. Only **3 Dec** still carries a gap (2-4 Dec +13% vs band): about **-10% on 3 Dec** (275 -> about £250).
- **`recommend`:** both horizons return a mechanical **raise +10%** (30-day 73% vs 43%, 60-day 87% vs 32%, comp percentile P40 median over 4 open stays). **Not adopted.** The lead comes from nights already sold. The open stays are at or above the band median against a quality ceiling of 0%. The raise branch ignores a negative `quality_premium`. And nothing after 13 Dec can be sold (handback).
- For the channel agent: on 4-7 Dec and 30 Nov-3 Dec the Airbnb all-in (£850 / £716) is again **below the PriceLabs room alone** (£915 / £739), before cleaning. NOT VERIFIED.

## Priority 2: P04 Barking
- **Quality:** `quality_premium(4.2, 4.83)` = **-0.15** (cap). Ours 4.2 from 10 reviews; comp median 4.83 from 27 (gap 17). **Supported: -15% to 0% vs the band median.**
- Booked next 30/60: 47% / 37% vs market 23% / 17%.
- Overrides: unchanged from 23 Nov (listed in Method).

### Unsynced Airbnb 1455876748739910219 (asked: 24-25 Nov, 10-14 Dec)

| Listing | Stay | Airbnb total | £/n all-in | Status (checked 24 Nov) | Our nights |
|---|---|---|---|---|---|
| 1455876748739910219 (unsynced, 4.69 (26)) | **10-14 Dec** | **£754** | 188.50 | **BOOKABLE** (07:21:56Z) | **all 4 nights sold (Booking.com £488.35, confirmed, booked 22 Nov)** |
| 1455876748739910219 | **24-25 Nov (1 n)** | n/a | n/a | **not returned** (wide 07:21:13Z, 0.3 km box 07:25:01Z). Same as 23 Nov, when 23-25 Nov was bookable: consistent with 1455's own minimum stay. **Closed or not: NOT VERIFIED** | 24 Nov: unsellable 1-night gap (`available` False, min 3); 25 Nov check-in on Booking.com |
| 1455876748739910219 | 24-26 Nov | n/a | n/a | not returned (07:20:50Z / 07:23:43Z) | 25-26 Nov sold |
| 1455876748739910219 | 17-20 Dec | £608 | 202.67 | bookable | open (synced £481 = £160.33/n) |
| 1455876748739910219 | 18-20 Dec | £451 | 225.50 | bookable | open; synced listing closed there (min 3) |
| 1455876748739910219 | 6-9, 6-10, 7-10, 14-17, 15-19, 16-19 Dec | £578-748 | 186.00-198.33 | bookable | open on the synced listing too |
| 1455876748739910219 | 25-28 Nov, 28 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan; any stay from 20 Dec | n/a | n/a | not returned (closed) | sold / open |
| 1657859794156786222 (synced) | 24-25 Nov, 24-26 Nov, 10-14 Dec | n/a | n/a | not returned (closed, correct) | |

- **Double-sale exposure today: 10-14 Dec (£488.35 Booking.com stay).** The fix is to close those dates on 1455, or map or unlist 1455. That is a channel action, not a price action. 24 Nov exposure: NOT VERIFIED (see row).

### Open December stays (asked: 7-10 Dec, 14-22 Dec, 17-20 Dec)

| Stay | Ours, Airbnb all-in £/n (23 Nov) | PriceLabs room (23 Nov) | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n | Market pctl |
|---|---|---|---|---|---|---|---|
| 6-9 Dec | 168.33 (168.33) | 168/170/169 (170/170/171) | 222 (3), -24.2% | 214.33 (6), -21.5% | P33 | 183-215 (+8% to +27%) | |
| 6-10 Dec | 152.75 | 168/170/169/166 | 206 (2), -25.8% | 181.25 (4), -15.7% | P25 | 170-200 (+1% to +19%) | |
| **7-10 Dec** | **161.00** (161.00) | **170/169/166** (170/171/150) | 210.67 (2), -23.6% | 200.33 (6), **-19.6%** | P17 | **178-209 (+6% to +24%)** | P58 |
| 14-17 Dec | 153.00 | 144/148/151 (146/149/152) | 239.84 (4), -36.2% | 222 (5), -31.1% | P20 | 182-214 (+23% to +45%) | |
| **14-22 Dec (8 n)** | **124.38** (£995, struck from £1,182: weekly discount) | **144/148/151/153/157/163/160/160** | 207 (1), **-39.9%** | 207 (3), **-39.9%** | P33 | 219-257 (incl. the weekly 15%) | **P46** |
| 15-19 Dec | 144.75 | 148/151/153/157 | 254 (3), -43.0% | 233.75 (5), -38.1% | P0 | 209-246 (+37% to +61%) | |
| 16-19 Dec | 157.67 | 151/153/157 | 257.67 (3), -38.8% | 228.5 (4), -31.0% | P0 | 189-223 (+23% to +45%) | |
| **17-20 Dec** | **160.33** (160.33) | **153/157/163** (154/159/164) | 239.84 (2), **-33.2%** | 240 (3), **-33.2%** | **P0** | **201-236 (+27% to +50%)** | **P46** |
| 19-22 Dec | 162.33 | 163/160/160 | 222 (1), -26.9% | 228.5 (2), -29.0% | P0 | 193-227 (+20% to +41%) | |

- **7-10 Dec: about +6% supported** (room about £180/179/176). This is unchanged from yesterday's +5%: the room barely moved and the Airbnb total is the same £483.
- **14-22 Dec: about +25% supported on the nightly room** (to about £180-200), measured on the 3-4-night stays inside the window (+20% to +61% low ends). The 8-night stay is the cheapest point at -40% vs band. That is partly the policy weekly 15%: before the discount, the £1,182 = £147.75/n is still -29%.
- **17-20 Dec: about +25% supported** (room about £191/196/204; all-in about £200/n). It is P0 and -33% vs the band and stored comps. Our own unsynced 1455 sells the same dates at £202.67/n.
- **Caveat, carried:** the Airbnb guest totals have not moved since 21 Nov while the room went up and then down (17-20 Dec £481 on 21-24 Nov). A PriceLabs raise may not reach Airbnb guests. Check the Smoobu -> Airbnb price first (channel agent).
- **Counter-signal, carried:** 1072316558208098643 (0.33 km, 4.93 (76), Superhost, not a stored comp) was at £150-170/n on 10-26 Dec on 23 Nov. The band median still sits at £207-240.
- **`recommend`:** 30-day 47% vs 23%, comp P0, quality -0.15 = **raise +10%**. 31-60-day 37% vs 17% = **raise +10%**. Adopted at the larger size above for 14-20 Dec, because the comp gap is larger than the formula step. 7-10 Dec about +6%.

### Christmas (asked: 20-26 Dec)

| Stay | Ours, Airbnb all-in £/n | PriceLabs room | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n | Market pctl |
|---|---|---|---|---|---|---|---|
| **20-26 Dec (6 n)** | **158.17** (£949, struck from £1,039; same as 22-23 Nov) | 160/160/159/162/175/188 = £1,004 (23 Nov £1,022) | 226 (1), -30.0% | 226 (3), **-30.0%** | **P0** | 203-239 (+21% to +43%) | **P50** |
| 20-23 Dec | 161.33 (168.00) | 160/160/159 (161/161/160) | 222 (1), -27.3% | 226 (2), -28.6% | P0 | 190-224 (+19% to +40%) | |
| 21-24 Dec | 174.33 (181.00) | 160/159/162 | 222 (1), -21.5% | 214.17 (4), -18.6% | P25 | 167-197 (+4% to +23%) | |
| 23-26 Dec | 212.33 (212.33), struck from £706 | 162/175/188 | 230 (1), -7.7% | 204.67 (4), +3.7% | P50 | 143-169 (-18% to -4%) | |
| 23-27 Dec | 202.00 | 162/175/188/185 | 231 (1), -12.6% | 231 (3), -12.6% | P33 | 173-203 (-3% to +14%) | |
| 24-27 Dec | 218.33 | 175/188/185 | 247 (2), -11.6% | 232.67 (4), -6.2% | P25 | 165-195 (-9% to +7%) | |
| 24-26 Dec (2 n) | 235.50; bookable only because of min 2 | 175/188 | 234 (1), +0.6% | 185.5 (5), +27.0% | P100 | 122-143 | P54 |
| 25-27 Dec (2 n) | 235.50; min 2 | 188/185 | 234 (1), +0.6% | 212.75 (2), +10.7% | P100 | 143-168 | |
| 20-27 Dec (7 n) | 145.29 (£1,017, struck from £1,209) | avg 169.86 | 211.71 (1), -31.4% | 214.29 (2), -32.2% | P0 | 213-251 (incl. weekly 15%) | |

- **20-26 Dec: about +10% on the 6-night stay, delivered on 20-22 Dec (about +20%: room about £190); hold 23-26 Dec.** The 6-night block is P0, -30% vs band. 23-26 Dec is already at the band median.
- **Min stays, for Corentin to confirm or revert (carried, unchanged):** 24-26 Dec min 2 is below the standing P04 floor of 3 nights. The 2-night stays it opens price above the band (+11% to +27%).

### 10-14 Dec (sold on Booking.com at £122.09/n), carried
- Paid £488.35 / 4 n = **£122.09/n**: below market P25 (£129.5), -39% vs the Airbnb band (£200, n 5) and -35% vs our own unsynced 1455 on the same dates (£188.50/n today). Rate plan and cleaning: NOT CHECKED. Nothing new today.

## Priority 3: P01 Bowsprit Point 18-20 Dec (blocked, before the 20 Dec handback)
- **Still blocked:** 18-20 Dec `Blocked`, 282/290, min 3 (23 Nov 282/293). Not returned on Airbnb.
- **Comps:** 18-20 Dec stored **£376** (3), band £374 (9). 18-21 Dec stored **£369.67** (7, range 281-524), band £340.83 (14). 19-21 Dec stored £366.5 (3), band £360.25 (8).
- **If reopened** at today's 282/290/251 plus £149 cleaning (carried figure), before any Airbnb guest fee:
  - 18-20 Dec: £360.50/n, -4.1% vs stored, -3.6% vs band.
  - 18-21 Dec: £324/n, -12.4% vs stored, -4.9% vs band.
  - 19-21 Dec: £345/n, -5.9% vs stored, -4.2% vs band.
  - PriceLabs NL: P66 (18-20 Dec) and P62 (18-21 Dec).
- **Supported: about -2% vs the comp median** (`quality_premium(4.75, 4.8)` = -0.02, on only 4 reviews). 18-20 Dec is in range now. 18-21 Dec has room for **+4% (band) to +14% (stored)**; I'd adopt about +5%, because the Airbnb guest fee is not in our estimate. No cut is needed.
- **For Corentin (carried policy conflict):** the handback policy says "before the date, maximise revenue normally", but £823 of room nights (282 + 290 + 251) stay blocked.

## Priority 4: P09 Torrent Lodge
- **No open night before the 26 Nov handback** (24-26 Nov booked; 27 Nov onwards blocked by the handback). Nothing to position.
- Comps (trend only): 24-26 Nov stored median £166.50 (2); December £168-227.75 (n 1-3). `quality_premium(5.0, 4.56)` = +0.15, on only 3 reviews. `recommend`: raise-signal (30-day 100% vs market 41%).

## Summary per property
| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30/60 vs market | `recommend` | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (18-20 Dec blocked) | stored 366.5-376 (n 3-7) on 18-21 Dec; 24-26 Dec 373 (4) | n/a (would be -4% to -12% stored) | 4.75 vs 4.8 | 4 vs 30 (-26) | -0.02 | 100%/100% vs 35%/27% | raise-signal | **-2% vs median**: 18-20 Dec in range if reopened; 18-21 Dec about +5% |
| P04 (synced 1657...) | 7-10 Dec 161; **14-22 Dec 124.38 (8 n)**; **17-20 Dec 160.33**; 20-26 Dec 158.17; Christmas 145-236 | stored 206-257.7 (n 1-4); band op 181-240 (n 2-6) | P0 stored on every open stay except 24-27 Dec (P100); P0-P50 band | **4.2** vs 4.83 | 10 vs 27 (-17) | -0.15 | 47%/37% vs 23%/17% | raise +10% (both horizons) | **-15% to 0% vs band. 14-22 Dec about +25%; 17-20 Dec about +25%; 7-10 Dec about +6%; 20-26 Dec about +10% (20-22 Dec +20%, 23-26 hold)**; 24-26 Dec min 2 = confirm or revert |
| P04 unsynced 1455... | 186-225.5; **bookable on sold 10-14 Dec (£754)**; 24-25 Nov not returned | | | 4.69 | 26 | n/a | | | map, close or unlist |
| P09 | no sellable night | 166.5-227.75 (n 1-3) | n/a | 5.0 vs 4.56 | 3 vs 25 (-22) | +0.15 | 100%/100% vs 41%/30% | raise-signal | nothing before the handback |
| P12 | open 231.5-350 | band 234.75-356.25; stored 250.67-277.5 | 4-7 Dec P0 band (n 2); 26 Nov P100; 30 Nov-3 Dec P50 | 4.27 vs 4.875 | 15 vs 25 (-10) | -0.15 | 73%/87% vs 43%/32% | raise +10% (P40): **not adopted** | **-15% to 0% vs band. 4-7 Dec hold (0%; up to +5% supported, n 2); 26 Nov about -25%; 30 Nov-3 Dec hold, 3 Dec about -10%** |
| P15 | no listing of ours | 150.5-164.25 (n 3-4) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 24 Nov)
| Item | Status |
|---|---|
| **t-p04-doublebook** | **Not fixed (day 25):** 1455 still bookable on **10-14 Dec (£754; 4 nights sold on Booking.com 22 Nov)**. 24-25 Nov not returned on 1455 (closed or min stay: NOT VERIFIED). Closed on every older booked stay. |
| a-p04-dec-1611 | No progress overnight: room -£1-2/night, Airbnb totals unchanged since 21 Nov. 14-20 Dec still P0, -31% to -43% vs band; about +25% supported. 7-10 Dec about +6%. |
| t-p04-xmas-1711 | 20-26 Dec room £1,004 (23 Nov £1,022); Airbnb £949 unchanged (P0, -30% vs band). Supported: 20-22 Dec about +20%, 23-26 Dec hold. **Min 2 on 24-26 Dec = confirm or revert (Corentin).** |
| P12 4-7 Dec (new) | Reopened by the Booking.com cancellation (£677.79, £225.93/n). Reyhan set 4-6 Dec min 2 (no price), 23 Nov 21:18:56Z. Room 312/332/271, Airbnb £283.33/n: P0 vs a 2-listing band, at the band x0.85 floor; market P82. **Hold.** |
| a-p12-trim | Done by the algorithm on 30 Nov-2 Dec (£800 -> £739). Only 3 Dec remains (about -10%). |
| t-p12-26nov-price | **Not fixed (day 7):** 307 -> 294 by the algorithm (£350 all-in, P100, +31% vs band, market P87). About £220 is supported. |
| t-p01-1820block | **Not fixed** (still `Blocked`). For Corentin. |
| Push freshness (`listings.csv`) | P04 24 Nov 00:31Z; P12 23 Nov 21:20Z (after Reyhan's 21:18Z edit); P01 24 Nov 04:14Z; P09 24 Nov 06:28Z. |

## Critical / high findings
- **CRITICAL: P04 unsynced Airbnb 1455876748739910219 is still bookable on 10-14 Dec at £754 (£188.50/n)**, the 4 nights sold on Booking.com on 22 Nov (£488.35, confirmed). Checked 24 Nov 07:21:56Z. Day 25.
- **HIGH: P04 14-22 Dec and 17-20 Dec are P0 vs comps.** 17-20 Dec is £160.33/n all-in vs £240 band (n 3) and £239.84 stored (n 2), -33%. The 8-night 14-22 Dec is £124.38/n vs £207 (n 3), -40%. Market P46. About +25% is supported. The Airbnb totals have not moved in 4 days.
- **HIGH: P12 26 Nov £294 room / £350 all-in is P100**, +31% vs band (n 6), market P87. About £220 is supported (day 7).
- **HIGH: P12 4-7 Dec reopened.** Room £915 (312/332/271), Airbnb £850 = £283.33/n: P0 vs the only two 10+-review 2BRs left (£312.33 / £338.33), at the x0.85 quality floor; market P82. **Hold; do not discount.** The lost stay paid £225.93/n.
- **HIGH (for Corentin, confirm or revert, carried): P04 24-26 Dec +5% with min 2** (Reyhan, 20 Nov 22:53Z), below the standing 3-night floor.
- **HIGH (for Corentin): P01 18-20 Dec still blocked.** Reopened at today's prices it would sit -4% to -12% vs comps; £823 of room nights held.
- **MEDIUM: P04 7-10 Dec** £161/n all-in vs £200.33 band (n 6), -20%, P17. About +6% supported.
- **MEDIUM: P04 20-26 Dec** £158.17/n vs £226 (n 3), -30%, P0. About +20% on 20-22 Dec; hold 23-26 Dec.
- **MEDIUM: P12 3 Dec** (2-4 Dec £266/n, +13% vs band, n 8): about -10% supported.

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-24 07:20-07:29Z.
- "23 Nov x" = the same comp and stay on 23 Nov, where the two differ by more than £1.
- `*` = found by the 0.3 km second pass.
- "–" = not returned in the wide search or the 0.3 km box (booked or unavailable).
- "(earlier read)" = km from an earlier day; the comp was not returned today.
- Full source for every row: `data/snapshots/2026-11-24/comps.csv` (`comp-east`, `east-refband`, `east-ours`).
- Cancellation policy: NOT CHECKED. Differentiators come from listing-page reads on 25 Oct-15 Nov.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, search party 4

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 24 Nov-26 Nov | 27 Nov-29 Nov | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | 348.33 | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | – | – | 370* | 395 (23 Nov 300) | 387 (23 Nov 287) | 374 (23 Nov 377) | 349 (23 Nov 339.67) | 354 (23 Nov 337) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.43 (165) | none listed | – | – | – | – | 221.5 (23 Nov 198.5) | – | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (57) | Lift | – | – | – | – | – | – | 402.33 (23 Nov 447.67) | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 (earlier read) | 6 | 4.6 (30) | Lift/River view/balcony | – | – | – | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking/River view/balcony | – | – | – | – | – | – | 382.67 | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 (earlier read) | 6 | 4.95 (21) | Skyline view/Free parking/Lift/Superhost/balcony/Guest fav | – | – | – | – | – | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | 376 | 357 | 357 | 376 | 369.67 | 366.5 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.83 (18) | Lift | – | – | 335 | 335 | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (45) | Lift/patio or balcony/Superhost/Guest fav | – | – | 590 | 539.5 | 539.5 | 528 | 524 | 534 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost | – | – | – | – | – | – | 281 | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | n/a (0) | n/a (0) | **373** (4) | **376** (4) | **372** (4) | **376** (3) | **369.67** (7) | **366.5** (3) |
| **Band median (n)** | | | | | 209.25 (2) | 310 (1) | 383 (8) | 373.5 (10) | 357 (9) | 374 (9) | 340.83 (14) | 360.25 (8) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.2 (10); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, search party 4

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 24 Nov-26 Nov | 27 Nov-29 Nov | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 24 Nov-25 Nov | 25 Nov-28 Nov | 28 Nov-2 Dec | 3 Dec-6 Dec | 6 Dec-9 Dec | 6 Dec-10 Dec | 7 Dec-10 Dec | 10 Dec-14 Dec | 14 Dec-17 Dec | 14 Dec-22 Dec | 15 Dec-19 Dec | 16 Dec-19 Dec | 17 Dec-20 Dec | 19 Dec-22 Dec | 20 Dec-23 Dec | 21 Dec-24 Dec | 23 Dec-26 Dec | 23 Dec-27 Dec | 24 Dec-27 Dec | 25 Dec-27 Dec | 20 Dec-26 Dec | 20 Dec-27 Dec | 27 Dec-4 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | – | – | – | – | – | 257.67 | 254 | 257.67 | – | – | – | – | 257.67* | – | 254 | 257.67* | 257.67 | – | – | – | – | – | 260 | – | – | – | – |
| [985683261536682900](https://www.airbnb.co.uk/rooms/985683261536682900) | 0.61 (earlier read) | 5 | 4.82 (17) | Paid street parking/Superhost | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 (earlier read) | 5 | 5.0 (28) | Free parking/Superhost/Guest fav | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.76 (42) | Free parking/Superhost | – | – | – | – | – | – | – | – | – | – | 248.33 | – | – | – | 265 | – | 267.5 | 273.33 | – | – | – | – | – | – | – | – | – | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | – | – | 234 | 228 | 222 | 222 | – | – | – | – | 222 | 222* | 222 | 222 | 222 | 207 | 222 | 222 | 222 | 222 | 222 | 222 | 230 | 231 | 234 | 234 | 226 | 211.71 | – |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 (earlier read) | 6 | 4.85 (27) | Parking (in name) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (18) | Free street parking/Superhost | – | – | – | – | – | – | – | – | – | – | 198 | 190 | 199.33 | – | 199.33 | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | **235.5** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **168.33** | **152.75** | **161** | not bookable | **153** | **124.38** | **144.75** | **157.67** | **160.33** | **162.33** | **161.33** | **174.33** | **212.33** | **202** | **218.33** | **235.5** | **158.17** | **145.29** | not bookable |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | **225.5** | not bookable | not bookable | not bookable | not bookable | **196.67** | **186** | **195** | **188.5** | **192.67** | not bookable | **187** | **198.33** | **202.67** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | n/a (0) | n/a (0) | **234** (1) | **228** (1) | **222** (1) | **222** (1) | n/a (0) | **257.67** (1) | **254** (1) | **257.67** (1) | **222** (3) | **206** (2) | **210.67** (2) | **222** (1) | **239.84** (4) | **207** (1) | **254** (3) | **257.67** (3) | **239.84** (2) | **222** (1) | **222** (1) | **222** (1) | **230** (1) | **231** (1) | **247** (2) | **234** (1) | **226** (1) | **211.71** (1) | n/a (0) |
| **Band median (n)** | | | | | 193.75 (2) | 202 (1) | 185.5 (5) | 203.25 (4) | 226 (2) | 222 (1) | 230 (1) | 246.34 (2) | 216.88 (4) | 257.67 (1) | 214.33 (6) | 181.25 (4) | 200.33 (6) | 200 (5) | 222 (5) | 207 (3) | 233.75 (5) | 228.5 (4) | 240 (3) | 228.5 (2) | 226 (2) | 214.17 (4) | 204.67 (4) | 231 (3) | 232.67 (4) | 212.75 (2) | 226 (3) | 214.29 (2) | 182.12 (1) |
| **Our pctl (vs comp median)** | | | | | – | – | P100 (+0.6%) | – | – | – | – | – | – | – | P0 (-24.2%) | P0 (-25.8%) | P0 (-23.6%) | – | P0 (-36.2%) | P0 (-39.9%) | P0 (-43.0%) | P0 (-38.8%) | P0 (-33.2%) | P0 (-26.9%) | P0 (-27.3%) | P0 (-21.5%) | P0 (-7.7%) | P0 (-12.6%) | P0 (-11.6%) | P100 (+0.6%) | P0 (-30.0%) | P0 (-31.4%) | – |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, search party 3

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 24 Nov-26 Nov | 27 Nov-29 Nov | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec |
|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 168 | – | – | – | 169.5 | 168 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 165 | – | – | – | 165 | 165 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.7 (23) | none listed | – | – | 210* | – | – | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest fav | – | 200.5 | 248.5 | 248.5 | 248.5 | 248.5 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | – | 216 | 207 | – | – |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 (earlier read) | 3 | 4.75 (16) | Skyline view/balcony | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **166.5** (2) | **200.5** (1) | **216** (3) | **227.75** (2) | **169.5** (3) | **168** (3) |
| **Band median (n)** | | | | | 111.5 (7) | 204.75 (2) | 227.5 (6) | 135 (5) | 193 (8) | 211.25 (6) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, search party 4

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 24 Nov-26 Nov | 27 Nov-29 Nov | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 1 Dec-3 Dec | 2 Dec-4 Dec | 4 Dec-7 Dec | 4 Dec-6 Dec | 5 Dec-7 Dec | 3 Dec-7 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.5 | 237.5* | 337.5 | 337.5 | 287.5 | 237.5 | – | 225 | – | 237.5 | – | – | – | – | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking | 270 | – | – | – | – | – | – | 283.33 | 277.5 | – | – | – | – | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (80) | Superhost | 188.5 | – | – | – | – | – | – | 194.67 (23 Nov 185.67) | – | – | – | – | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 (earlier read) | 6 | 4.94 (16) | Superhost/Guest fav | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (121) | Superhost/balcony/Guest fav | 254 | – | – | – | – | – | 284 | 250.67 | 243.75 | 254 | 254 | – | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1 | 6 | 4.54 (13) | Paid parking/balcony (placeholder price, excluded) | – | 1035 | 1035* | 1035 | 1035 | 1035 | 1043 | 1032.33 (23 Nov 1044) | 1031 (23 Nov 1039.75) | 1035 (23 Nov 1052.5) | 1035 (23 Nov 1052.5) | 1032.33 | 1035 | 1035 | 1031 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift | 263 (23 Nov 267) | – | – | – | 282 (23 Nov 302.5) | – | 263 (23 Nov 267) | 282 | 282 | 282 | 282 (23 Nov 284) | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **350** | **238.67** | **231.5** | **253** | **266** | **283.33** | **309** | **293.5** | **265.25** |
| **Comp median (n)** | | | | | **254** (5) | **237.5** (1) | **337.5** (1) | **337.5** (1) | **284.75** (2) | **237.5** (1) | **273.5** (2) | **250.67** (5) | **277.5** (3) | **254** (3) | **268** (2) | n/a (0) | n/a (0) | n/a (0) | n/a (0) |
| **Band median (n)** | | | | | 245.75 (8) | 352.5 (1) | 315.5 (11) | 287.5 (11) | 258.5 (11) | 322.5 (7) | 266.5 (6) | 241.5 (12) | 249.25 (10) | 254 (7) | 234.75 (8) | 325.33 (2) | 337.5 (1) | 356.25 (2) | 272.5 (4) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | P100 (+28.0%) | P40 (-4.8%) | P0 (-16.6%) | P33 (-0.4%) | P50 (-0.7%) | – | – | – | – |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, search party 3

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 24 Nov-26 Nov | 27 Nov-29 Nov | 24 Dec-26 Dec | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec |
|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 205.5 | 170.5 (23 Nov 190) | 170.5 | 195.5 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 (earlier read) | 4 | 4.93 (14) | Superhost/Guest fav | – | – | – | – | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.81 | 3 | 4.87 (15) | Paid parking/Superhost | 121.5 (23 Nov 128.5) | – | 147.5 | 135 | 135 | 160 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.85 | 4 | 4.71 (14) | Lift/Paid parking | 167.5 | – | – | – | – | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.84 | 4 | 4.92 (25) | Free parking/Guest fav | 161 | – | 181 | – | – | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (204) | Garden view/Lift/Paid parking off/Superhost | – | – | 145.5 | 150.5 | 155.5 | 160.5 |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.03 (earlier read) | 4 | 4.64 (14) | Lift | – | – | – | – | – | – |
| **Comp median (n)** | | | | | **161** (3) | n/a (0) | **164.25** (4) | **150.5** (3) | **155.5** (3) | **160.5** (3) |
| **Band median (n)** | | | | | 155.5 (4) | 228.75 (2) | 186.5 (8) | 170.5 (7) | 156.25 (6) | 160.5 (5) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings (Airbnb only). It is also not known what Booking.com shows for P12 4-7 Dec now that it has reopened.
- **1455 on 24 Nov:** not returned on the 1-night 24-25 Nov stay. Closed, or blocked by its own minimum stay: NOT VERIFIED. A direct calendar read was refused by the permission system.
- **P04 comp set is below the 6-comp minimum in practice:** 4 of 7 stored comps were returned on any stay. 985683261536682900, 1733027244747346716 and 1387112821878102742 have not been returned for 5 days. Inactivity NOT VERIFIED, so they are not replaced. Stored n = 1-4 per stay; band n = 1-6. Replacement candidates (carried from 23 Nov; 2BR, 10+ reviews, inside 2.5 km; sleeps NOT CHECKED): 1072316558208098643 (0.33 km, 4.93 (76), Superhost), 43709205 (1.78 km, 4.91 (47), Superhost), 1245634494660468861 (0.04 km, 4.88 (25)).
- **P12 4-7 Dec rests on n = 2** (band); 0 of 6 stored comps were available. The 11-listing all-review figure (median £312.3) is an estimate, not a comp set. P12 1670196516322802487 was not returned on any stay today (first day), and P15 1528442618668335413 likewise; both are kept.
- **Why the P04 Airbnb guest price does not follow the PriceLabs room** (identical totals 21-24 Nov), and why P12 Airbnb all-in is below the room price (4-7 Dec £850 vs £915; 30 Nov-3 Dec £716 vs £739): NOT VERIFIED (channel agent).
- **Reyhan's P12 4-6 Dec override (min 2, no price)**: the price field is empty in both the log and the override, so its price effect (if any) is NOT VERIFIED.
- Kept as booked, not inactive (not returned on any stay today): P01 852256049507701872, 1418178473526356202; P09 958156921765583815; P15 1371771992549776701. January not re-checked.
- P04 2 Dec (+200% min 1; deprioritised in policy) and 4-10 Jan were not priced against comps. The P01 cleaning fee of £149 is carried, not re-read.
- Comp cancellation policies, band-listing sleeps and current lift/view/parking: NOT CHECKED today (carried from the 25 Oct-15 Nov reads).
- **Smoobu was not called.** Room prices are PriceLabs `prices.csv`; 24 Nov comes from the 23 Nov file.
- NL percentiles: horizon not stated, host-only-fee basis, 1-3BR (P04, P01) or 2-3BR (P12). These are market bands, not like-for-like.
