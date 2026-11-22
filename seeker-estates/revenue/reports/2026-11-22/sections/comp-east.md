# Competitor positioning: EAST batch (D = 2026-11-22)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy `intentional_blocks`). Not analysed.
- **P15** has no listing of ours. Reference only.
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec, with 30 Nov-17 Dec inside the handback block set; P09 26 Nov; P12 13 Dec). P09 and P12 December stays below are comp trend only.

**Method** (same as 26 Oct-21 Nov; scripts copied from scratchpad `east21/bin` to `east22/bin`, only dates and paths changed)
- **Comp ids:** the same set as 21 Nov (P01 11, P04 7, P09 6, P12 7, P15 7). **No comp replaced today.**
  - P04 985683261536682900, 1733027244747346716 and 1387112821878102742 were not returned on any of 26 stays, **for the third day running** (0.3 km box run on each, 0 errors; all 3 room pages still load). They are kept as booked, not proven inactive. P04 has 4 live comps, below the 6 minimum. Replacement candidates are listed under Data gaps.
  - P04 1193087690344044898 is now not returned on 20-23, 21-24, 22-24, 23-26 and 23-27 Dec. On 21 Nov it was £260/n on those stays. It still shows on 24-27 Dec (£260), so it looks booked, not inactive.
  - P01 852256049507701872, P09 1501211872839579235 and 958156921765583815, and P15 1371771992549776701 were not returned on any stay. They are kept as booked. P01 1418178473526356202 is back (22-24 Nov £324.50).
  - P12 29297702 still shows a placeholder-like price (£1,035-1,052/n). It is kept out of the medians: `nightly_gbp` is blank and the price is in `source`.
- **Access:** public Airbnb pages (HTTP 200).
  - 57 wide searches with pagination, 0 failures.
  - Then 351 comp/stay checks in a 0.3 km box: 3 hits, 0 errors.
  - Box sizes: 2.5 km for P04, 1.8 km for P09, 1.3 km for the rest. 4 guests for 2BR, 3 for 1BR.
  - Checked **2026-11-22 07:20:46-07:27:59Z**. **Booking.com: NOT CHECKED.**
- **Price basis = what guests see:** Airbnb **guest-paid all-in total / nights**, after discounts, with cleaning and Airbnb fees **included**. No separate taxes are shown. Ours are priced the same way.
  - PriceLabs/Smoobu figures (`prices.csv` 22 Nov) are **room only, cleaning excluded**.
  - Stays of 7+ nights include the 15% weekly discount (policy). Comps show their own discounts.
- **Stays (same dates for comps and us):**
  - Default: tonight **22-24 Nov**, midweek Tue-Thu **24-26 Nov**, next Fri-Sun **27-29 Nov**, 30 days out **22-24 Dec**. Trend stays: **20-22 Dec** and **18-20 Dec**.
  - P04, unsynced-listing check on its booked nights: **22-24 Nov** (guest in residence 20-24 Nov), **23-24 Nov**, **25-28 Nov**, **28 Nov-2 Dec**, **3-6 Dec** and **27 Dec-4 Jan**.
  - P04, open stays: **24-25 Nov**, **6-9, 9-12, 11-14, 14-17, 16-19 and 17-20 Dec**, **6-13 Dec**, **20-23, 21-24, 23-26, 23-27, 24-27, 25-27 and 20-27 Dec**.
  - P12: **26-27 Nov**, **30 Nov-3 Dec**, 30 Nov-4 Dec, 1-3 Dec, 2-4 Dec.
  - P01: **18-20 Dec**, 18-21 Dec, 19-21 Dec.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius. Ours and per-night prices above £1,000 are excluded. P04's 1531... operator units are collapsed into one ("op").
- **"Supported room"** = band median x 0.85-1.00 (the `quality_premium` range). It is converted back to room price using each stay's own ratio of Airbnb all-in to PriceLabs room. Approximate.
- **Data written:** `data/snapshots/2026-11-22/comps.csv` already existed: another agent had copied it forward from 21 Nov (10,909 lines, the same as 21 Nov). Under `flock` on `.comps.csv.lock` I **appended 907 rows**:
  - 425 `comp-east`: every stored comp x stay. NOT RETURNED rows are kept with a blank price.
  - 354 `east-refband` (ref `Pxx:band`).
  - 128 `east-ours` (ref `Pxx:ours`): Airbnb all-in rows and PriceLabs room rows.
- **PriceLabs (read-only, one call at a time, in this order):**
  - `get_listing_date_overrides` P04, 22 Nov-10 Jan: OK. **No change since 21 Nov.** The latest `updated_at` is still Reyhan's 20 Nov 22:53:59Z (23-26 Dec).
  - `get_user_logs` (listing; P01, P04, P09, P12; 21-22 Nov): **0 entries.**
  - `get_neighbourhood_data` detail for P04, P12 and P01: OK, saved to scratchpad `east22/dl/nd_*_detail.json`.
- **Smoobu: not called.** Room prices come from `prices.csv` (22 Nov). That file starts 23 Nov, so 22 Nov comes from the 21 Nov file.
- **Pushes** (`listings.csv` 22 Nov): P04 21 Nov 09:45Z (recommended base 201, base 200); P12 21 Nov 09:45Z; P01 22 Nov 04:08Z; P09 22 Nov 06:38Z.

## What changed since 21 Nov (this batch)
**1. P04 unsynced Airbnb 1455876748739910219 is STILL bookable on 22-24 Nov, while the guest is in the flat.**
- 22-24 Nov: **£443 total (£221.50/n)**, the same as on 21 Nov. The 1-night 23-24 Nov is not returned. That is probably 1455's own minimum stay; it is not proof of a block.
- Those nights are sold on the synced listing: Airbnb 20-24 Nov, £489.59 room + £142 cleaning, confirmed, booked 14 Nov (`reservations.csv`).
- **Other booked nights are still closed on 1455.** It was not returned on any of these stays (each also run in a 0.3 km box, 0 errors):
  - 24-26 Nov.
  - 25-28 Nov and 28 Nov-2 Dec (Booking.com 25 Nov-2 Dec).
  - 3-6 Dec (Booking.com).
  - 27 Dec-4 Jan (Airbnb).
  - 20-27 Dec and the other Christmas stays.
- **1455 is also bookable on open nights:**
  - 6-19 Dec at £184-203/n.
  - 17-20 Dec at £608 (the synced listing: £481).
  - 18-20 Dec at £451. The synced listing cannot sell 18-20 Dec (min 3).
- Source: wide searches checked 07:20:46-07:22:03Z. URLs are in `comps.csv`, ref `P04:ours`.
- **t-p04-doublebook: not fixed, day 23.** The exposure is tonight (22 Nov) and 23 Nov. The guest leaves on 24 Nov.

**2. P04 17-20 Dec, reopened by the 21 Nov cancellation:** it is open in `prices.csv` (142/147/153, min 3). Live, it is bookable on Airbnb at **£481 (£160.33/n)**.
- Against comps it is **P0**: -33.2% vs the stored median (239.84, n = 2) and -27.8% vs the band (222, n = 5). PriceLabs market: P36.

**3. P04 moves with no logged edit** (`get_user_logs` 0 entries; overrides unchanged):
- **6 Dec 140 -> 174 (+£34).** 6-9 Dec all-in is now £163.33/n (21 Nov £154.67).
- **21 Dec 168 -> 150 (-£18).** 20-23 Dec room is now 150/150/166.
- 20-26 Dec open total: £1,225 -> **£1,207** (150/150/166/170/190/191/190).
- The rest of 6-26 Dec moved by -1 to +2. The booked 23 Nov-5 Dec nights moved -1 to -3; the open 2 Dec (+200%, deprioritised) 449 -> 443.

**4. P12 26 Nov rose again: 310 -> 325 (+£15)**, no logged edit. Airbnb all-in £363 -> **£374**.
- 30 Nov-3 Dec room 268/283/286 -> **260/284/286**. Airbnb £263.67 -> **£261.67/n**.
- 1-3 Dec £281. 2-4 Dec £285.50.

**5. P01 18-20 Dec still `Blocked`** (286/296, min 3; 21 Nov 290/301). Our listing is not returned on Airbnb. **t-p01-1820block: not fixed.**

**6. Comps held.** 91 of 106 like-for-like comp/stay prices are within £1 of 21 Nov. Moves of £10 or more:
- P01 41905186 rose on every December stay: 18-20 Dec 357 -> 400; 18-21 Dec 326.33 -> 355; 19-21 Dec 330 -> 360; 20-22 Dec 272 -> 287; 27-29 Nov 380 -> 400.
- P01 1467264633617185891 20-22 Dec: 243.5 -> 203.5.
- P12 1077363497194834681 24-26 Nov: 247.5 -> 237.5.
- P12 1383544079404594066 20-22 Dec: 312 -> 293; 2-4 Dec: 298.5 -> 287.
- **No P04 comp moved by £10 or more on any stay.**

## PriceLabs market percentiles (`get_neighbourhood_data`, 22 Nov)
These are market bands, not comps. "Ours" = PriceLabs room (`final_price`, which matches `prices.csv` 22 Nov on every night below).
- Compsets: P04 NL 1-3BR (188); P12 NL 2-3BR (132); P01 NL 1-3BR (283).
- Basis "Host-only fee"; the horizon is not stated. Percentiles are linear interpolations between P25/P50/P75/P90.

| Ref | 2BR summary P25/P50/P75/P90 (n) | Booked 30/60 vs market (`pl_kpis` 22 Nov) | Ours vs daily market (stay average P25/P50/P75/P90) |
|---|---|---|---|
| P04 | 139/174/216/249 (89) | 43% / 35% vs 22% / 18% (21 Nov 47% / 37%) | 24 Nov £142 (124/150/198/242): P42. **6-20 Dec £144.5 (127/157.4/204.1/242.4): P39.** **17-20 Dec £147.3 (134.7/162.3/206.3/240.3): P36.** **20-23 Dec £155.3 (127.7/159.3/206/258.3): P47.** 21-24 Dec £162: P49. **23-26 Dec £183.7 (137/171/213.7/280.7): P57.** 24-27 Dec £190.3: P59. **20-27 Dec £172.4 (133.9/167.4/210.6/273.6): P53.** Sold 27 Dec-4 Jan £134.59 room: P28 |
| P12 | 171/205/234/292 (116) | 83% / 92% vs 45% / 34% | **26 Nov £325 (169/202/239/310): above P90.** **30 Nov-3 Dec £276.7 (171.7/204/256.3/305.3): P81.** 1-3 Dec £285: P83. 2-4 Dec £291.5: P81. 30 Nov-4 Dec £281.75: P81 |
| P01 | 218/261/338/430 (145) | 100% / 100% vs 34% / 27% | **18-20 Dec (blocked) £291 (200.5/232.5/316/451): P68**; 18-21 Dec £277.7: P63 |

- `prices_with_default_customization` (what PriceLabs would charge with default settings), P04:
  - 20-27 Dec: £197.7/n vs final £172.4 (-13%).
  - 6-20 Dec: £157.9 vs £144.5 (-8%).
  - 17-20 Dec: £161.0 vs £147.3 (-9%).
  - The listing's customisations still pull these nights down.

## Priority 1: P04 Barking
- **Quality:** `quality_premium(4.2, 4.83)` = **-0.15** (the cap). We are 4.2 from 10 reviews; the comp median is 4.83 from 27 reviews (gap 17). **Supported position: -15% to 0% vs the band median.**
- **Overrides** (`get_listing_date_overrides`, 22 Nov): **unchanged since 21 Nov.**
  - 22-24 Nov: -5%, min 3.
  - 25 Nov: +15%, min 2.
  - 26-30 Nov and 3-5 Dec: -8%, min 3.
  - 1 Dec: -2%, min 4.
  - 2 Dec: +200%, min 1.
  - 6-22 Dec: -5%, min 3.
  - 23 Dec: -5%, min 3.
  - 24-26 Dec: +5%, min 2 (Reyhan, 20 Nov 22:53Z).
  - 27 Dec: -5%, min 7.
  - 28-31 Dec: -5%, min 5.
  - 1 Jan: -2%, min 4.
  - 2-10 Jan: -8%, min 3.

### The unsynced listing (guest in residence 20-24 Nov)

| Listing | Stay | Airbnb total | £/n all-in | Status (checked 22 Nov) |
|---|---|---|---|---|
| 1455876748739910219 (unsynced, 4.69 (26)) | **22-24 Nov** | **£443** | 221.50 | **BOOKABLE** (07:20:46Z); 21 Nov: 22-24 Nov £443, 21-24 Nov £614 |
| 1455876748739910219 | 23-24 Nov (1 n) | n/a | n/a | not returned (probably 1455's own minimum stay; NOT VERIFIED) |
| 1455876748739910219 | 24-26 Nov, 25-28 Nov, 28 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan | n/a | n/a | not returned (closed on the other booked nights) |
| 1455876748739910219 | 18-20 Dec | £451 | 225.50 | bookable (the synced listing is closed there by min 3) |
| 1455876748739910219 | 17-20 Dec | £608 | 202.67 | bookable (the synced listing: £481) |
| 1455876748739910219 | 6-19 Dec stays | 3-night £578-608; 6-13 Dec £1,291 | 184.43-202.67 | bookable (open on the synced listing too) |
| 1455876748739910219 | 20-27 Dec and all Christmas stays | n/a | n/a | not returned |
| 1657859794156786222 (synced) | 22-24 Nov | n/a | n/a | not returned (booked) |
| Smoobu (`reservations.csv`) | 20-24 Nov | £489.59 room + £142 cleaning | | Airbnb, confirmed, booked 14 Nov |

### 17-20 Dec (reopened by the 21 Nov cancellation) and 6-19 Dec

| Stay | Ours, Airbnb all-in £/n (21 Nov) | PriceLabs room | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n | Market pctl |
|---|---|---|---|---|---|---|---|
| **17-20 Dec** | **160.33** (159.33) | 142/147/153 | 239.84 (2), **-33.2%** (P0) | 222 (5), **-27.8%** | P0 | **173-204** (+18% to +38%) | P36 |
| 6-9 Dec | 163.33 (154.67) | **174**/140/140 | 222 (3), -26.4% | 214.33 (6), -23.8% | P33 | 169-199 (+12% to +31%) | P50 |
| 9-12 Dec | 156.00 (156.00) | 137/141/148 | 222 (1), -29.7% | 214.33 (4), -27.2% | P25 | 166-195 (+17% to +37%) | |
| 11-14 Dec | 159.33 (159.00) | 148/150/141 | 222 (1), -28.2% | 214.33 (4), -25.7% | P0 | 167-197 (+14% to +35%) | |
| **14-17 Dec** | 152.00 (152.00) | 133/137/140 | 239.84 (4), -36.6% | 226 (6), **-32.7%** | P17 | **173-203** (+26% to +49%) | P34 |
| 16-19 Dec | 157.00 (156.67) | 140/142/147 | 257.67 (3), -39.1% | 228.5 (6), -31.3% | P17 | 177-208 (+24% to +46%) | |
| 6-13 Dec (7 n) | 129.00 (125.14) | 137-174, avg 147.1 | 207 (1), -37.7% | 181.22 (4), -28.8% | P0 | 176-207 (includes the weekly) | |
| 24-25 Nov (1 n) | not bookable (1-night gap; min 3) | 142 | n/a (0) | 230 (1) | | n/a: policy min 3 | P42 |

- **17-20 Dec: about +20% supported** (room about £170/176/184, from 142/147/153). It is P0 against both the stored comps and the band. The listing is bookable but priced where the 21 Nov booking was taken (£338.12 room for 3 n, then cancelled).
- **7-19 Dec: about +20% supported** (room about £165-175, from 133-153). Unchanged since 17 Nov; the comps did not move.
- **6 Dec: hold at 174.** PriceLabs already raised it +£34 overnight (no logged edit), close to the supported level.
- **24 Nov:** a 1-night gap between two bookings. Under policy (min 3, never fewer) it cannot be sold. Nothing to position.
- **`recommend`:**
  - 30-day: 43% vs market 22%, comp P0, quality -0.15 = **raise +10%**.
  - 31-60-day: 35% vs 18% = **raise +10%**.
  - **Adopted at the larger size above for 7-20 Dec**, because the comp gap (-24% to -33% vs the band) is bigger than the formula step.

### Christmas, 20-26 Dec open at £1,207

| Stay | Ours, Airbnb all-in £/n (21 Nov) | PriceLabs room | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n | Market pctl |
|---|---|---|---|---|---|---|---|
| **20-23 Dec (3 n)** | **180.67** (192.33) | 150/**150**/166, avg 155.3 | 222 (1), -18.6% | **216.17 (4), -16.4%** | P25 | **158-186 (+2% to +20%)** | P47 |
| 21-24 Dec (3 n) | 193.33 (198.67) | **150**/166/170, avg 162 | 222 (1), -12.9% | 216.67 (4), -10.8% | P25 | 154-182 = in range | P49 |
| 22-24 Dec (2 n) | not bookable (min 3) | 166/170 | 222 (1) | 211 (5) | | n/a | |
| **23-26 Dec (3 n)** | **212.67** (213.00) | 170/190/191, avg 183.7 | 230 (1), -7.5% | 203 (4), +4.8% | P50 | 149-175 (-19% to -5%) | P57 |
| 23-27 Dec (4 n) | 202.25 (202.50) | 170/190/191/190 | 231 (1), -12.4% | 228 (3), -11.3% | P33 | 178-209 = in range | |
| 24-27 Dec (3 n) | 218.67 (219.00) | 190/191/190 | 247 (2), -11.5% | 232.67 (4), -6.0% | P25 | 172-203 = in range | P59 |
| 25-27 Dec (2 n) | 236.00 (236.50); bookable **only because of min 2** | 191/190 | 234 (1), +0.9% | 214 (2), +10.3% | P100 | 147-173 (-23% to -9%) | |
| 20-27 Dec (7 n) | 147.57 (149.57) | avg 172.4 | 211.71 (1), -30.3% | 211.71 (3), -30.3% | P0 | 210-247 (includes the 15% weekly) | P53 |

- The 23-26 Dec band fell from 226.67 (n 5) to 203 (n 4) because comp 1193087690344044898 (£260/n on 21 Nov) is no longer returned (booked). That is a change in who is left, not a price fall; the 4-night and 24-27 Dec stays stay inside the range.
- Our Christmas stays still show an Airbnb strikethrough: 23-26 Dec £707 -> £638. Cause NOT VERIFIED (channel agent).
- **Supported positioning:**
  - **20-21 Dec: about £165 each (+10%).** 21 Dec fell £18 overnight (168 -> 150) with no logged edit, after 20 Dec fell £19 on 21 Nov. 20-23 Dec is now -16.4% vs the band.
  - **22-26 Dec: hold.** 21-24, 23-27 and 24-27 Dec are inside the quality range.
- **Min stays (for Corentin, confirm or revert; carried, unchanged):** 24-26 Dec min 2 is below the standing P04 floor of 3. It is what makes 25-27 Dec (2 n, £236/n, +10% vs a 2-listing band) sellable. Min 3 on 24-26 Dec would still allow 24-27 Dec.

## Priority 2: P12 Mile End
- **Quality:** `quality_premium(4.27, 4.88)` = **-0.15** (the cap). We are 4.27 from 15 reviews; the stored-comp median is 4.875 from 25 (gap 10). **Supported: band median x 0.85-1.00.**

| Stay | Ours, Airbnb all-in £/n (21 Nov) | PriceLabs room | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room | Move vs PriceLabs | Market pctl |
|---|---|---|---|---|---|---|---|
| **26-27 Nov (1 n)** | **374** (363) | **325** (310), min 1 | 282 (5), **P100, +32.6%** | 283 (2), P100, +32.2% | **208-245** | **-36% to -25%** | above P90 |
| **30 Nov-3 Dec** | **261.67** (263.67) | 260/284/286 | 238.33 (11), P64, **+9.8%** | 250.67 (5), P60, +4.4% | 214-252 | **-23% to -9%** | P81 |
| 30 Nov-4 Dec | 253.25 (254.25) | 260/284/286/297 | 250.12 (10), P50, +1.3% | 277.5 (3), P33, -8.7% | 237-278 | -16% to -1% | P81 |
| **1-3 Dec** | **281.00** (280.50) | 284/286 | 245.75 (8), P75, **+14.3%** | 245.75 (4), P75, +14.3% | 212-249 | **-26% to -13%** | P83 |
| 2-4 Dec | 285.50 (285.50) | 286/297 | 217.75 (8), P88, +31.1% | 254 (3), P67, +12.4% | 189-222 | -35% to -24% | P81 |

- **Every open P12 stay is above the band** (+1% to +33%), against a quality ceiling of 0%. The PriceLabs NL market puts them at P81 to above P90.
- **26 Nov: room about £225-240 (about -27%), keep min 1.** It is P100 and +33% vs the band, and it rose another £15 overnight with no logged edit. **t-p12-26nov-price: not fixed (day 5), and moving the wrong way.**
- **30 Nov-3 Dec: about -12%** (260/284/286/297 -> about £235/250/250/260). 1-3 and 2-4 Dec carry most of the gap.
- **`recommend`:** both horizons give a mechanical **raise +10%**: 30-day 83% vs 45%, 60-day 92% vs 34%, comp P67 (median over 5 open stays). **Not adopted:**
  - The lead comes from nights already sold.
  - The open stays sit above the band.
  - The raise branch ignores a negative `quality_premium`.
  - No night can be sold after the 13 Dec handback.
- Carried, for the channel agent: on 30 Nov-3 Dec the Airbnb all-in (£785 for 3 n) is below the PriceLabs room price alone (£830). NOT VERIFIED.

## Priority 3: P01 Bowsprit Point 18-20 Dec (blocked, before the 20 Dec handback)
- **Still blocked:** 18-20 Dec `Blocked`, 286/296, min 3. Our listing is not returned on Airbnb.
- **Comps (comp 41905186 rose £15-43 on every December stay priced on both days):**
  - 18-21 Dec (3 n): stored median **£369.67** (n = 7, range 281-524); band **£345** (n = 15).
  - 18-20 Dec: stored £400 (3); band £376 (9).
  - 19-21 Dec: stored £366.50 (3); band £360 (7).
- **If reopened** at today's 286/296/251 plus £149 cleaning (carried figure), before any Airbnb guest fee:
  - 18-21 Dec: £327.33/n, **-11.5% vs stored, -5.1% vs band**.
  - 18-20 Dec: £365.50/n, -8.6% vs stored, -2.8% vs band.
  - PriceLabs NL: P63-P68.
- **Supported: about -2% vs the comp median** (`quality_premium(4.75, 4.8)` = -0.02, on only 4 reviews). If reopened, about +5% is supported (room about £300/311/264). No cut is needed.
- **For Corentin (carried policy conflict):** the handback policy says "before the date, maximise revenue normally", but £833 of room nights (286+296+251) stay blocked.

## Priority 4: P09 Torrent Lodge
- **No open night before the 26 Nov handback** (booked through it). Nothing to position.
- Comp median £166.50-248.50 (n = 1-4). `quality_premium(5.0, 4.56)` = +0.15, on only 3 reviews. `recommend`: raise-signal (30-day 100% vs market 41%).

## Summary per property
| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30/60 vs market | `recommend` | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (18-20 Dec blocked) | stored 213.75-400 (n 1-7); 18-21 Dec 369.67 (7) | n/a (would be -12% stored / -5% band) | 4.75 vs 4.8 | 4 vs 30 (-26) | -0.02 | 100%/100% vs 34%/27% | raise-signal | **-2% vs median**; about +5% if reopened |
| P04 (synced 1657...) | Dec 129-163; **17-20 Dec 160.33**; Christmas 148-236 | stored 207-257.7 (n 1-4); band op 181-232.7 (n 2-6) | P0 stored (25-27 Dec P100); P0-P50 band | **4.2** vs 4.83 | 10 vs 27 (-17) | -0.15 | 43%/35% vs 22%/18% | 30 d raise +10%; 31-60 d raise +10% | **-15% to 0%.** **7-20 Dec about +20%** (incl. reopened 17-20 Dec); 6 Dec hold; **20-21 Dec about +10%**; 22-26 Dec hold; 24-26 Dec min 2 -> confirm or revert |
| P04 unsynced 1455... | 184-226; **bookable on the sold 22-24 Nov (£443)** | | | 4.69 | 26 | n/a | | | map or unlist |
| P09 | no sellable night | 166.5-248.5 (n 1-4) | n/a | 5.0 vs 4.56 | 3 vs 25 (-22) | +0.15 | 100%/100% vs 41%/31% | raise-signal | nothing before the handback |
| P12 | open 253-374 | band 217.75-282; stored 245.75-283 | P50-P100 band (median P67 stored) | 4.27 vs 4.88 | 15 vs 25 (-10) | -0.15 | 83%/92% vs 45%/34% | raise +10% (P67): **not adopted** | **-15% to 0% vs band. 26 Nov about -27%; 30 Nov-3 Dec about -12%** |
| P15 | no listing of ours | 120.5-160.5 (n 2-5) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 22 Nov)
| Item | Status |
|---|---|
| **t-p04-doublebook** | **Not fixed (day 23).** 1455 is bookable on 22-24 Nov at £443 while the synced guest is in the flat (leaves 24 Nov). It is closed on the other booked nights (25 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan). |
| t-p04-xmas-1711 | 20-26 Dec open at **£1,207** (21 Nov £1,225). 21 Dec 168 -> 150 with no logged edit. Supported: 20-21 Dec about +10%, 22-26 Dec hold. **Min 2 on 24-26 Dec = confirm or revert (Corentin).** |
| a-p04-dec-1611 | 7-19 Dec unchanged (-1 to +2); 6 Dec +£34 by PriceLabs. **17-20 Dec reopened by the cancellation at P0.** Supported: about +20% on 7-20 Dec. |
| a-p12-trim | Not done (260/284/286/297). Needed: about -12%. |
| t-p12-26nov-price | **Not fixed (day 5): rose 310 -> 325** (£374 all-in, P100, +33% vs band). |
| t-p01-1820block | **Not fixed** (still `Blocked`). For Corentin. |
| Push freshness (`listings.csv`) | P04 21 Nov 09:45Z; P12 21 Nov 09:45Z; P01 22 Nov 04:08Z; P09 22 Nov 06:38Z. P04 and P12 had no overnight refresh. |

## Critical / high findings
- **CRITICAL: P04 unsynced Airbnb 1455876748739910219 is bookable on 22-24 Nov at £443 (£221.50/n)** while those nights are sold (Airbnb 20-24 Nov, £489.59 room, confirmed) and the guest is in the flat (day 23). The other booked nights are closed on 1455.
- **HIGH: P04 17-20 Dec, reopened by the 21 Nov cancellation, is P0:** £160.33/n all-in, -33% vs the stored comps (n 2) and -28% vs the band (n 5); market P36. About +20% is supported (room about £170/176/184).
- **HIGH: P04 7-19 Dec is -24% to -33% vs the band** (P0 vs stored comps). About +20% is supported; the comps held.
- **HIGH: P12 26 Nov rose to £325 room / £374 all-in** (P100, +33% vs band, above market P90). About £225-240 is supported. 30 Nov-3 Dec +10% vs the band (P81 market); about -12% supported.
- **HIGH (for Corentin, confirm or revert, carried): P04 24-26 Dec +5% with min 2** (Reyhan, 20 Nov 22:53Z), below the standing 3-night floor.
- **HIGH (for Corentin): P01 18-20 Dec still blocked.** Reopened at today's price it would sit at -5% to -12% vs comps (18-21 Dec). About £833 of room nights are held.
- **MEDIUM: P04 21 Dec fell 168 -> 150 with no logged edit** (after 20 Dec -£19 on 21 Nov). 20-23 Dec is now -16.4% vs the band; about £165 is supported.

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-22 07:20-07:28Z.
- "21 Nov x" = the same comp and stay on 21 Nov, where the two differ by more than £1.
- `*` = found by the 0.3 km second pass.
- "–" = not returned in the wide search or the 0.3 km box (booked or unavailable).
- "(earlier read)" = km from an earlier day; the comp was not returned today.
- Full source for every row: `data/snapshots/2026-11-22/comps.csv` (`comp-east`, `east-refband`, `east-ours`).
- Cancellation policy: NOT CHECKED. Differentiators come from listing-page reads on 25 Oct-15 Nov.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 22 Nov-24 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 22 Dec-24 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | 348.33 | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 375 | – | 400 (21 Nov 380) | 314 | 287 (21 Nov 272) | 400 (21 Nov 357) | 355 (21 Nov 326.33) | 360 (21 Nov 330) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.43 (164) | none listed | – | 168 | – | – | 203.5 (21 Nov 243.5) | – | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (57) | Lift | – | – | – | – | – | – | 456 (21 Nov 448) | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 (earlier read) | 6 | 4.6 (30) | Lift/River view/balcony | – | – | – | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking/River view/balcony | – | – | – | – | – | – | 382.67 | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (22) | Skyline view/Free parking/Lift/Superhost/balcony/Guest fav | 324.5 | – | – | – | – | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | – | 357 | 357 | 376 | 369.67 | 366.5 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.82 (17) | Lift | – | – | – | 335 | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (45) | Lift/patio or balcony/Superhost/Guest fav | – | 259.5 | – | 539.5 | 539.5 | 528 | 524 | 534 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost | – | – | – | – | – | – | 281 | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **349.75** (2) | **213.75** (2) | **400** (1) | **346** (4) | **322** (4) | **400** (3) | **369.67** (7) | **366.5** (3) |
| **Band median (n)** | | | | | 266 (6) | 243 (9) | 355 (2) | 346 (10) | 287 (9) | 376 (9) | 345 (15) | 360 (7) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.2 (10); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 22 Nov-24 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 22 Dec-24 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 23 Nov-24 Nov | 24 Nov-25 Nov | 25 Nov-28 Nov | 28 Nov-2 Dec | 3 Dec-6 Dec | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 16 Dec-19 Dec | 6 Dec-13 Dec | 20 Dec-23 Dec | 21 Dec-24 Dec | 23 Dec-26 Dec | 23 Dec-27 Dec | 24 Dec-27 Dec | 25 Dec-27 Dec | 20 Dec-27 Dec | 27 Dec-4 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | – | – | – | – | – | – | 257.67 | 254 | 257.67 | – | – | – | 257.67 | 257.67 | 257.67 | – | – | – | – | – | 260 | – | – | – |
| [985683261536682900](https://www.airbnb.co.uk/rooms/985683261536682900) | 0.61 (earlier read) | 5 | 4.82 (17) | Paid street parking/Superhost | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 (earlier read) | 5 | 5.0 (28) | Free parking/Superhost/Guest fav | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.76 (41) | Free parking/Superhost | – | – | – | – | – | – | – | – | – | 242.5 | – | 248.33 | – | – | 265 | – | 273.33 | – | – | – | – | – | – | – | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | – | – | – | 222 | 222 | 222 | – | – | – | – | – | 222 | 222 | 222 | 222 | 222 | 222 | 207 | 222 | 222 | 230 | 231 | 234 | 234 | 211.71 | – |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 (earlier read) | 6 | 4.85 (27) | Parking (in name) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (18) | Free street parking/Superhost | – | – | – | – | – | – | – | – | – | – | – | 198 | – | – | 199.33 | – | – | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **163.33** | **156** | **159.33** | **152** | **160.33** | **157** | **129** | **180.67** | **193.33** | **212.67** | **202.25** | **218.67** | **236** | **147.57** | not bookable |
| 1455876748739910219 (unsynced, ours) | | | | | **221.5** | not bookable | not bookable | not bookable | not bookable | **225.5** | not bookable | not bookable | not bookable | not bookable | not bookable | **196.67** | **197** | **199** | **192.67** | **202.67** | **198.33** | **184.43** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | n/a (0) | n/a (0) | n/a (0) | **222** (1) | **222** (1) | **222** (1) | n/a (0) | n/a (0) | **257.67** (1) | **248.25** (2) | **257.67** (1) | **222** (3) | **222** (1) | **222** (1) | **239.84** (4) | **239.84** (2) | **257.67** (3) | **207** (1) | **222** (1) | **222** (1) | **230** (1) | **231** (1) | **247** (2) | **234** (1) | **211.71** (1) | n/a (0) |
| **Band median (n)** | | | | | 230 (1) | 193.75 (2) | n/a (0) | 211 (5) | 216 (4) | 209.5 (3) | 230 (1) | 230 (1) | 246.34 (2) | 238.12 (4) | 257.67 (1) | 214.33 (6) | 214.33 (4) | 214.33 (4) | 226 (6) | 222 (5) | 228.5 (6) | 181.22 (4) | 216.17 (4) | 216.67 (4) | 203 (4) | 228 (3) | 232.67 (4) | 214 (2) | 211.71 (3) | 187.12 (1) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | P0 (-26.4%) | P0 (-29.7%) | P0 (-28.2%) | P0 (-36.6%) | P0 (-33.2%) | P0 (-39.1%) | P0 (-37.7%) | P0 (-18.6%) | P0 (-12.9%) | P0 (-7.5%) | P0 (-12.4%) | P0 (-11.5%) | P100 (+0.9%) | P0 (-30.3%) | – |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 22 Nov-24 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 22 Dec-24 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec |
|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 168 | 168 | – | – | 169.5 | 168 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 165 | 165 | – | – | 165 | 165 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.7 (23) | none listed | – | – | – | – | 148.5 (21 Nov 155) | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest fav | – | – | 200.5 | 248.5 | 248.5 | 248.5 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 (earlier read) | 3 | 4.27 (22) | none listed | – | – | – | – | – | – |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 (earlier read) | 3 | 4.75 (16) | Skyline view/balcony | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **166.5** (2) | **166.5** (2) | **200.5** (1) | **248.5** (1) | **167.25** (4) | **168** (3) |
| **Band median (n)** | | | | | 128.5 (7) | 132.5 (9) | 214.5 (2) | 248.5 (3) | 181 (8) | 193.5 (7) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 22 Nov-24 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 22 Dec-24 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 1 Dec-3 Dec | 2 Dec-4 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.5 | 237.5 (21 Nov 247.5) | 237.5 | 337.5 | 287.5 | 237.5 | – | 225 | – | 237.5 | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking | – | 270 | – | – | – | – | – | 283.33* | 277.5 | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (79) | Superhost | – | – | – | – | – | – | – | 193.33 | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.94 (16) | Superhost/Guest fav | – | 150 | – | – | – | – | – | – | – | 220 | 220 |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (121) | Superhost/balcony/Guest fav | 254 | 254 | – | – | – | – | 284 | 250.67 | 243.75 | 254 | 254 |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1 | 6 | 4.54 (13) | Paid parking/balcony (placeholder price, excluded) | – | 1035 | 1035 | 1035 | 1035 | 1035 | 1043 | 1044 | 1039.75 | 1052.5 | 1052.5 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift | 282 | 282 | – | – | 293 (21 Nov 312) | 300 (21 Nov 295) | 282 | 282 (21 Nov 285) | 284.5 (21 Nov 290.25) | 282 (21 Nov 286.5) | 287* (21 Nov 298.5) |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **374** | **261.67** | **253.25** | **281** | **285.5** |
| **Comp median (n)** | | | | | **254** (3) | **254** (5) | **237.5** (1) | **337.5** (1) | **290.25** (2) | **268.75** (2) | **283** (2) | **250.67** (5) | **277.5** (3) | **245.75** (4) | **254** (3) |
| **Band median (n)** | | | | | 226.5 (9) | 226 (12) | 295 (2) | 282.5 (8) | 287.5 (11) | 309 (8) | 282 (5) | 238.33 (11) | 250.12 (10) | 245.75 (8) | 217.75 (8) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | P100 (+32.2%) | P60 (+4.4%) | P33 (-8.7%) | P75 (+14.3%) | P67 (+12.4%) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 22 Nov-24 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 22 Dec-24 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec |
|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | 119.5 | – | – | 190 | 170.5* | 195.5 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 (earlier read) | 4 | 4.93 (14) | Superhost/Guest fav | – | – | – | – | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.81 | 3 | 4.87 (15) | Paid parking/Superhost | 121.5 | 135 | – | 135 | 135 | 160 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.85 | 4 | 4.71 (14) | Lift/Paid parking | – | 167.5 | – | – | – | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.84 | 4 | 4.92 (25) | Free parking/Guest fav | – | 145 | – | – | – | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (203) | Garden view/Lift/Paid parking off/Superhost | – | 135.5 | – | 150.5 | 155.5 | 160.5 |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.03 | 4 | 4.64 (14) | Lift | – | 150 | – | – | – | – |
| **Comp median (n)** | | | | | **120.5** (2) | **145** (5) | n/a (0) | **150.5** (3) | **155.5** (3) | **160.5** (3) |
| **Band median (n)** | | | | | 134.5 (5) | 141.5 (8) | 228.75 (2) | 177 (7) | 155.5 (5) | 160.5 (5) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings (Airbnb only).
- **P04 comp set is below the 6-comp minimum in practice:** only 4 of 7 stored comps were returned on any stay, and 1193087690344044898 is now booked on most Christmas stays. 985683261536682900, 1733027244747346716 and 1387112821878102742 have been unreturned on every stay for 3 days, but their room pages still load. Inactivity is NOT VERIFIED (no 60-day calendar read), so they are not replaced. Christmas stored n = 1-2 per stay; band n = 2-5. Replacement candidates if they stay unreturned (2BR, 10+ reviews, inside 2.5 km, returned on most stays today; sleeps NOT CHECKED):
  - 1072316558208098643: 0.33 km, 4.93 (76), Superhost, 18 of 26 stays.
  - 43709205: 1.78 km, 4.91 (47), Superhost, 8 stays.
  - 1245634494660468861: 0.04 km, 4.88 (25), Guest favourite, 5 stays.
- **Why 1455 is closed on the other booked nights but open on 22-24 Nov:** NOT VERIFIED. It may be a manual block or calendar import on 1455 that does not cover the current stay. Why 23-24 Nov (1 n) is not returned on 1455 is also NOT VERIFIED.
- **Why PriceLabs moved P04 6 Dec (+£34) and 21 Dec (-£18), and P12 26 Nov (+£15) and 30 Nov (-£8):** `get_user_logs` shows no edits on 21-22 Nov and the P04 overrides are unchanged. NOT VERIFIED (algorithm).
- **P04 Christmas Airbnb strikethrough** (23-26 Dec £707 -> £638) and **P12 30 Nov-3 Dec Airbnb all-in below the room price** (£785 vs £830): causes NOT VERIFIED (channel agent).
- **Kept as booked, not inactive** (not returned on any stay today):
  - P01 852256049507701872.
  - P09 1501211872839579235 and 958156921765583815.
  - P15 1371771992549776701.
  - January was not re-checked.
- P04 2 Dec (£443, +200% min 1; deprioritised in policy) and 4-10 Jan were not priced against comps.
- P01 cleaning £149 is carried from earlier sections, not re-read today.
- Comp cancellation policies, band-listing sleeps and current lift/view/parking: NOT CHECKED today (carried from 25 Oct-15 Nov reads).
- **Smoobu was not called.** Room prices are PriceLabs `prices.csv`. 22 Nov room values come from the 21 Nov file (today's file starts 23 Nov).
- NL percentiles: PriceLabs does not state the horizon, and the basis is a host-only fee on 1-3BR (P04, P01) or 2-3BR (P12). Read them as market bands, not like-for-like.
