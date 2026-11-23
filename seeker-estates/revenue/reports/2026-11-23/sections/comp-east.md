# Competitor positioning: EAST batch (D = 2026-11-23)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy `intentional_blocks`). Not analysed.
- **P15** has no listing of ours. Reference only.
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec, with 30 Nov-17 Dec inside the handback block set; P09 26 Nov; P12 13 Dec). P09 and P12 December stays are comp trend only.

**Method** (same as 26 Oct-22 Nov; scripts copied from scratchpad `east22/bin` to `east23/bin`, only dates and paths changed)
- **Comp ids:** the same set as 22 Nov (P01 11, P04 7, P09 6, P12 7, P15 7). **No comp replaced today.**
  - P04 985683261536682900, 1733027244747346716 and 1387112821878102742 were not returned on any of 28 stays, **for the fourth day running** (0.3 km box run on each, 0 errors; room pages still load). Kept as booked, not proven inactive (no 60-day calendar read). P04 has 4 live comps, below the 6 minimum. Replacement candidates are under Data gaps.
  - Not returned on any stay today, kept as booked: P01 852256049507701872 and 1418178473526356202 (back on 22 Nov only); P09 958156921765583815; P15 1371771992549776701. P09 1501211872839579235 is back (23-25 Dec £207).
  - P12 29297702 still shows a placeholder-like price (£1,035-1,052.50/n). It stays out of the medians: `nightly_gbp` is blank and the price is in `source`.
- **Access:** public Airbnb pages (HTTP 200).
  - 59 wide searches with pagination, 0 failures.
  - Then 370 comp/stay checks in a 0.3 km box: 6 hits, 0 errors.
  - Box sizes: 2.5 km for P04, 1.8 km for P09, 1.3 km for the rest. 4 guests for 2BR, 3 for 1BR.
  - Checked **2026-11-23 07:20:55-07:28:44Z**. **Booking.com: NOT CHECKED.**
- **Price basis = what guests see:** Airbnb **guest-paid all-in total / nights**, after discounts, with cleaning and Airbnb fees **included**. No separate taxes are shown. Ours are priced the same way.
  - PriceLabs/Smoobu figures (`prices.csv` 23 Nov) are **room only, cleaning excluded**. Today's file starts 24 Nov, so 23 Nov comes from the 22 Nov file.
  - Stays of 7+ nights include the 15% weekly discount (policy). Comps show their own discounts.
- **Stays (same dates for comps and us):**
  - Default: tonight **23-25 Nov**, midweek Tue-Thu **24-26 Nov**, next Fri-Sun **27-29 Nov**, 30 days out **23-25 Dec**. Trend stays: **20-22 Dec** and **18-20 Dec**.
  - P04, as asked: **24-25 Nov** (1 n), **10-14 Dec** (sold on Booking.com 22 Nov), **7-10 Dec** (nights 7-9 Dec), 6-9 and 6-10 Dec, **15-19 Dec**, 14-17 and 16-19 Dec, **17-20 Dec**, **20-26 Dec** (6 n), plus 20-23, 21-24, 23-26, 23-27, 24-27, 25-27 and 20-27 Dec.
  - P04, unsynced-listing check: **23-25 Nov**, 23-24 Nov, **10-14 Dec**, **17-20 Dec**, 18-20 Dec, and the other booked stays (25-28 Nov, 28 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan).
  - P12: **26-27 Nov**, **30 Nov-3 Dec**, 30 Nov-4 Dec, 1-3 Dec, 2-4 Dec.
  - P01: **18-20 Dec**, 18-21 Dec, 19-21 Dec.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius. Ours and per-night prices above £1,000 are excluded. P04's 1531... operator units are collapsed into one ("op").
- **"Supported room"** = band median x 0.85-1.00 (the `quality_premium` range), converted back to room price with each stay's own ratio of Airbnb all-in to PriceLabs room. Approximate.
- **Data written:** `data/snapshots/2026-11-23/comps.csv` already existed: another agent had copied it forward from 22 Nov (the first 13,856 lines are byte-identical to the 22 Nov file). Under `flock` on `.comps.csv.lock` I **appended 926 rows**:
  - 439 `comp-east`: every stored comp x stay. NOT RETURNED rows are kept with a blank price.
  - 353 `east-refband` (ref `Pxx:band`).
  - 134 `east-ours` (ref `Pxx:ours`): Airbnb all-in rows and PriceLabs room rows.
- **PriceLabs (read-only, one call at a time, in this order):**
  - `get_listing_date_overrides` P04, 23 Nov-10 Jan: OK. **Changed: 6-23 Dec override -5% -> -2% (min 3), `updated_at` 23 Nov 00:14:34Z.** Everything else as on 22 Nov.
  - `get_user_logs` (listing; P01, P04, P09, P12; 21-23 Nov): **1 entry**: Reyhan, 23 Nov 00:14:34Z, "Added Date Specific Override" on P04, 6-23 Dec, -2%, min 3.
  - `get_neighbourhood_data` detail for P04, P12 and P01: OK, saved to scratchpad `east23/dl/nd_*_detail.json`.
- **Smoobu: not called.** Room prices come from `prices.csv` (23 Nov). The `smoobu_price` column equals `pricelabs_price` on every night used.
- **Pushes** (`listings.csv` 23 Nov): P04 23 Nov 00:15:15Z (recommended base 201, base 200); P12 23 Nov 00:05:08Z; P01 23 Nov 04:00:58Z.

## What changed since 22 Nov (this batch)
**1. NEW CRITICAL: the unsynced P04 Airbnb 1455876748739910219 is bookable on 10-14 Dec**, the nights sold on Booking.com on 22 Nov (£488.35, confirmed).
- 10-14 Dec on 1455: **£754 total (£188.50/n)**, checked 07:22:05Z. The synced listing 1657... is not returned (closed, as it should be).
- **23-25 Nov is still bookable on 1455: £444 (£222/n)**, checked 07:20:55Z. 23 Nov is sold (Airbnb 20-24 Nov, guest in the flat); 24 Nov is closed in PriceLabs (`available` False, no booking status). The 1-night 23-24 Nov and 24-25 Nov are not returned on 1455 (probably its own minimum stay; NOT VERIFIED).
- 17-20 Dec (open on both listings): 1455 **£608 (£202.67/n)**; synced £481 (£160.33/n). 18-20 Dec: 1455 £451; the synced listing is closed there by min 3.
- Other booked stays (25-28 Nov, 28 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan) and every Christmas stay: 1455 not returned (closed).
- **t-p04-doublebook: not fixed, day 24.** The exposure now covers tonight (23 Nov) and the new Booking.com stay 10-14 Dec. 1455 is closed on the older booked stays but not on the newest one, which suggests its calendar is not being updated from Smoobu bookings (NOT VERIFIED).

**2. P04 7-23 Dec rose overnight, but the Airbnb guest price barely moved.**
- Reyhan changed the 6-23 Dec override from -5% to -2% (23 Nov 00:14:34Z, logged). That is about +3%. The PriceLabs room moved more than that: 7-8 Dec 140 -> 170/171 (+£30-31), 9 Dec 137 -> 150, 14-21 Dec +£11-13 each night (e.g. 17-20 Dec 142/147/153 -> 154/159/164). 22-23 Dec fell £6-7. Christmas 24-26 Dec -£1 to -3.
- **Airbnb all-in did not follow:** 17-20 Dec is £481 on 21, 22 and 23 Nov, while the room went £442 -> £477. 14-17 Dec £456 -> £459 (room £410 -> £447). 6-9 Dec £490 -> £505 (room £454 -> £511). The P04 push was at 00:15:15Z. Why Airbnb does not reflect the room rise: **NOT VERIFIED** (channel agent: Smoobu Airbnb rules or sync lag).
- So against comps nothing improved: 14-20 Dec is still **P0, -31% to -38% vs the band.**

**3. P04 10-14 Dec, sold on Booking.com at £122.09/n, was cheap** (details in Priority 1).

**4. P12 fell back: 26 Nov 325 -> 307 (-£18)**, Airbnb all-in £374 -> **£360**. 30 Nov-3 Dec 260/284/286 -> **254/270/276** (Airbnb £261.67 -> £254/n). 3 Dec 297 -> 290. No logged edit (algorithm).

**5. P01 18-20 Dec still `Blocked`** (282/293, min 3; 22 Nov 286/296). Our listing is not returned on Airbnb. **t-p01-1820block: not fixed.**

**6. Comps held.** 83 of 99 like-for-like comp/stay prices are within £1 of 22 Nov. Moves of £10 or more:
- P01 41905186: 27-29 Nov 400 -> 424; 18-20 Dec 400 -> 377; 18-21 Dec 355 -> 339.67; 19-21 Dec 360 -> 337 (it reversed most of 22 Nov's rise).
- P12 1383544079404594066: 24-26 Nov and 26-27 Nov 282 -> 267.
- P15 1034861651385070287: 24-26 Nov 145 -> 161.
- **No P04 comp moved by £10 or more on any stay.**

## PriceLabs market percentiles (`get_neighbourhood_data`, 23 Nov)
These are market bands, not comps. "Ours" = PriceLabs room (`final_price`, which matches `prices.csv` 23 Nov on every night below).
- Compsets: P04 NL 1-3BR (187); P12 NL 2-3BR (132); P01 NL 1-3BR (283).
- Basis "Host-only fee"; the horizon is not stated. Percentiles are linear interpolations between P25/P50/P75/P90.

| Ref | 2BR summary P25/P50/P75/P90 (n) | Booked 30/60 vs market (`pl_kpis` 23 Nov) | Ours vs daily market (stay average P25/P50/P75/P90) |
|---|---|---|---|
| P04 | 142/175/211/248 (89) | 50% / 38% vs 23% / 18% (22 Nov 43% / 35%) | 24 Nov £136 (124/151/198/240): P36. **6-10 Dec £165.25 (122/152.2/202.5/240.5): P56.** 7-10 Dec £163.67: P56. **10-14 Dec: today's PriceLabs room £157.5 (127.8/159.2/206.5/252.5) = P49; the 22 Nov Smoobu £145 = P39; the price paid on Booking.com £122.09 = below P25.** 14-17 Dec £149: P45. **15-19 Dec £153.5 (129/156/203.8/232.2): P48.** **17-20 Dec £159 (134.3/160.7/207.3/239.7): P48.** 20-23 Dec £160.67: P51. 23-26 Dec £180: P56. 24-27 Dec £188: P58. **20-26 Dec £170.33 (132/164.5/209.3/269.5): P53.** 20-27 Dec £172.71: P54. Sold 27 Dec-4 Jan £134.59 room: P27 |
| P12 | 172/205/235/291 (117) | 83% / 92% vs 44% / 33% | **26 Nov £307 (168/201/232/309): P90.** **30 Nov-3 Dec £266.67 (171.3/204.7/252.3/304): P79.** 30 Nov-4 Dec £272.5: P79. 1-3 Dec £273: P80. 2-4 Dec £283: P80 |
| P01 | 218/262/337/430 (145) | 100% / 100% vs 35% / 27% | **18-20 Dec (blocked) £287.5 (200.5/233/313/450.5): P67**; 18-21 Dec £276: P63; 19-21 Dec £273: P62 |

- `prices_with_default_customization` (what PriceLabs would charge with default settings), P04:
  - 6-10 Dec: £195.8/n vs final £165.2 (-16%).
  - 10-14 Dec: £196.0 vs £157.5 (-20%).
  - 14-20 Dec: £183.0 vs £154.0 (-16%).
  - 17-20 Dec: £194.0 vs £159.0 (-18%).
  - 20-26 Dec: £204.3 vs £170.3 (-17%).
  - The listing's customisations still pull these nights well down, even after the -2% override.

## Priority 1: P04 Barking
- **Quality:** `quality_premium(4.2, 4.83)` = **-0.15** (the cap). We are 4.2 from 10 reviews; the comp median is 4.83 from 27 reviews (gap 17). **Supported position: -15% to 0% vs the band median.**
- **Overrides** (`get_listing_date_overrides`, 23 Nov):
  - 23-24 Nov: -5%, min 3. 25 Nov: +15%, min 2. 26-30 Nov and 3-5 Dec: -8%, min 3. 1 Dec: -2%, min 4. 2 Dec: +200%, min 1.
  - **6-23 Dec: -2%, min 3 (was -5%; Reyhan, 23 Nov 00:14:34Z).**
  - 24-26 Dec: +5%, min 2 (Reyhan, 20 Nov 22:53Z). 27 Dec: -5%, min 7. 28-31 Dec: -5%, min 5. 1 Jan: -2%, min 4. 2-10 Jan: -8%, min 3.

### The unsynced listing 1455876748739910219 (asked: 23-25 Nov, 17-20 Dec, 10-14 Dec)

| Listing | Stay | Airbnb total | £/n all-in | Status (checked 23 Nov) | Our nights |
|---|---|---|---|---|---|
| 1455876748739910219 (unsynced, 4.69 (26)) | **23-25 Nov** | **£444** | 222.00 | **BOOKABLE** (07:20:55Z) | 23 Nov sold (Airbnb 20-24 Nov, £489.59 room, confirmed); 24 Nov closed in PriceLabs |
| 1455876748739910219 | **10-14 Dec** | **£754** | 188.50 | **BOOKABLE** (07:22:05Z) | **all 4 nights sold (Booking.com, £488.35, confirmed, booked 22 Nov)** |
| 1455876748739910219 | **17-20 Dec** | **£608** | 202.67 | bookable (07:22:31Z) | open (synced listing £481 = £160.33/n) |
| 1455876748739910219 | 18-20 Dec | £451 | 225.50 | bookable | open; the synced listing is closed there by min 3 |
| 1455876748739910219 | 23-24 Nov, 24-25 Nov (1 n) | n/a | n/a | not returned (probably 1455's own minimum stay; NOT VERIFIED) | |
| 1455876748739910219 | 25-28 Nov, 28 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan, all Christmas stays | n/a | n/a | not returned (closed) | sold / open |
| 1455876748739910219 | 6-9, 6-10, 7-10, 14-17, 15-19, 16-19 Dec | £578-748 | 186.00-198.33 | bookable | open on the synced listing too |
| 1657859794156786222 (synced) | 23-25 Nov, 10-14 Dec | n/a | n/a | not returned (closed, correct) | |

- **Source:** wide searches, URLs in `comps.csv` ref `P04:ours`.
- **Double-sale exposure today:** tonight 23 Nov, and 10-14 Dec (£488.35 Booking.com stay). Closing these on 1455 (or mapping or unlisting 1455) is the fix; that is a channel action, not a price action.

### 10-14 Dec, sold on Booking.com at £122.09/n: was it cheap? **Yes.**
- **Paid:** £488.35 for 4 nights = **£122.09/n** (`reservations.csv`, Booking.com, confirmed, booked 22 Nov, commission £92.60). The cleaning field is blank, so whether cleaning was charged on top is NOT VERIFIED.
- **Vs our own prices:** 0.84x the 22 Nov Smoobu room (141/148/150/141 = £580); 0.78x today's PriceLabs room (153/161/163/153 = £630). Against an estimated Booking.com Standard Rate of Smoobu x1.15 = £667, it is 0.73x (stacked rate-plan/Genius/promotion discounts; which plan: NOT CHECKED, channel agent).
- **Vs the market (PriceLabs NL, host-only fee):** stay P25/P50 = £127.8/£159.2. **£122.09 is below P25.** Today's room (£157.5) would be P49.
- **Vs comps on the same dates (Airbnb all-in, which includes cleaning and fees):**
  - Stored comps: 593405916827094880 £222 (n = 1). **-45%.**
  - Band (6 listings): 156.25 / 181.25 / 200 / 222 / 237.5 / 237.5; op median **£200** (n = 5). **P0, -39%.**
  - Our own unsynced 1455 on the same dates: £188.50 (-35%).
  - Closest comparable: 1072316558208098643 (0.33 km, 4.93 (76), Superhost) £156.25 (-22%).
  - Even if a P04-style cleaning fee (£142 on Airbnb) were added to the Booking price (estimate: £157.59/n), it would still be below every band listing except the cheapest, and -21% vs the band median.
- **Supported:** band x 0.85 = **£170/n all-in** at the quality floor. The stay sold about **20-39% below** what the evidence supports, depending on the cleaning basis.

### Open December stays (asked: 7-9, 15-19, 17-20 Dec)

| Stay | Ours, Airbnb all-in £/n (22 Nov) | PriceLabs room (22 Nov) | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n | Market pctl |
|---|---|---|---|---|---|---|---|
| 6-9 Dec | 168.33 (163.33) | 170/170/171 (174/140/140) | 222 (3), -24.2% | 214.33 (6), -21.5% | P33 | 184-217 (+8% to +27%) | P59 |
| 6-10 Dec (4 n) | 152.75 | 170/170/171/150 | 206 (2), -25.8% | 179 (4), -14.7% | P25 | 165-194 (0% to +17%) | P56 |
| **7-10 Dec (nights 7-9)** | **161.00** | **170/171/150** (140/140/137) | 210.67 (2), -23.6% | 196 (6), **-17.9%** | P33 | **169-199 (+3% to +22%)** | P56 |
| 14-17 Dec | 153.00 (152.00) | 146/149/152 (133/137/140) | 239.84 (4), -36.2% | 226 (6), -32.3% | P17 | 187-220 (+26% to +48%) | P45 |
| **15-19 Dec (4 n)** | **144.75** | **149/152/154/159** | 254 (3), **-43.0%** | 233.75 (5), **-38.1%** | **P0** | **211-248 (+37% to +61%)** | P48 |
| 16-19 Dec | 157.67 (157.00) | 152/154/159 (140/142/147) | 257.67 (3), -38.8% | 235 (5), -32.9% | P20 | 196-231 (+27% to +49%) | P48 |
| **17-20 Dec** | **160.33** (160.33) | **154/159/164** (142/147/153) | 239.84 (2), **-33.2%** | 231 (4), **-30.6%** | **P0** | **195-229 (+22% to +44%)** | P48 |
| 24-25 Nov (1 n) | not bookable (1-night gap; `available` False, min 3) | 136 | n/a (0) | 230 (1) | | n/a: policy min 3 | P36 |

- **7-10 Dec (nights 7-9): about +5% supported** (room about £175/180/158). The overnight rise (140 -> 170) did most of yesterday's +20%; the low end of the supported range is +3%.
- **14-20 Dec: about +25% supported on the Airbnb guest price** (to about £190-200/n all-in, from £145-160). In room terms that is about £185-200 if Airbnb kept today's all-in/room ratio. The PriceLabs room already rose 8% overnight, but **Airbnb shows the same totals as on 21-22 Nov**, so check that the Airbnb price actually follows the room price before adding more.
- **15-19 Dec is the cheapest point** (P0, -38% vs band): £579 all-in for 4 nights, lower per night than the 3-night stays inside it. That points to an Airbnb length-of-stay rule (Smoobu LOS 5+? NOT VERIFIED), not to PriceLabs.
- **Counter-signal:** the closest 4.9-rated Superhost 2BR (1072316558208098643, 0.33 km, not a stored comp) is at £150-162/n on 14-20 Dec, close to us. The band median still sits at £226-235.
- **24 Nov:** a 1-night gap between two bookings. Under policy (min 3, never fewer) it cannot be sold. Nothing to position.
- **`recommend`:**
  - 30-day: 50% vs market 23%, comp P0, quality -0.15 = **raise +10%**.
  - 31-60-day: 38% vs 18% = **raise +10%**.
  - Adopted at the larger size above for 14-20 Dec, because the comp gap (-31% to -38% vs the band) is bigger than the formula step. 7-10 Dec at about +5%.

### Christmas (asked: 20-26 Dec)

| Stay | Ours, Airbnb all-in £/n (22 Nov) | PriceLabs room | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n | Market pctl |
|---|---|---|---|---|---|---|---|
| **20-26 Dec (6 n)** | **158.17**; Airbnb shows £949, struck through from £1,039 | 161/161/160/163/187/190 = £1,022, avg 170.33 | 226 (1), -30.0% | 200.25 (4), **-21.0%** | **P0** | **183-216 (+8% to +27%)** | P53 |
| 20-23 Dec | 168.00 (180.67) | **161/161/160** (150/150/166) | 222 (1), -24.3% | 222 (3), -24.3% | P33 | 180-212 (+12% to +32%) | P51 |
| 21-24 Dec | 181.00 (193.33) | 161/160/163 | 222 (1), -18.5% | 202.17 (4), -10.5% | P25 | 153-180 (-5% to +12%) | P49 |
| 23-25 Dec (2 n) | not bookable (min 3) | 163/187 | 228 (1) | 201 (4) | | n/a | |
| 23-26 Dec | 212.33 (212.67) | 163/187/190 | 230 (1), -7.7% | 202.67 (4), +4.8% | P50 | 146-172 (-19% to -5%) | P56 |
| 23-27 Dec | 202.00 (202.25) | 163/187/190/187 | 231 (1), -12.6% | 228 (3), -11.4% | P33 | 174-205 (-4% to +13%) | |
| 24-27 Dec | 218.33 (218.67) | 187/190/187 | 247 (2), -11.6% | 232.67 (4), -6.2% | P25 | 170-200 (-9% to +7%) | P58 |
| 25-27 Dec (2 n) | 235.50; bookable **only because of min 2** | 190/187 | 234 (1), +0.6% | 213.25 (2), +10.4% | P100 | 145-171 (-23% to -9%) | |
| 20-27 Dec (7 n) | 145.29 (147.57) | avg 172.71 | 211.71 (1), -31.4% | 211.71 (3), -31.4% | P0 | 214-252 (includes the 15% weekly) | P54 |

- **Oddity:** 20-23 Dec Airbnb all-in **fell** £180.67 -> £168 while the room **rose** 466 -> 482. 21-24 Dec £193.33 -> £181. Cause NOT VERIFIED (channel agent; same pattern as item 2).
- **20-26 Dec: about +10% supported** on 20-22 Dec (room about £175-178), hold 23-26 Dec. The 6-night block is P0 (-21% vs band); the shorter 21-27 Dec stays are inside the quality range.
- **Min stays (for Corentin, confirm or revert; carried, unchanged):** 24-26 Dec min 2 is below the standing P04 floor of 3. It is what makes 25-27 Dec (2 n, £235.50/n, +10% vs a 2-listing band) sellable.

## Priority 2: P12 Mile End
- **Quality:** `quality_premium(4.27, 4.88)` = **-0.15** (the cap). We are 4.27 from 15 reviews; the stored-comp median is 4.875 from 25 (gap 10). **Supported: band median x 0.85-1.00.**

| Stay | Ours, Airbnb all-in £/n (22 Nov) | PriceLabs room (22 Nov) | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room | Move vs PriceLabs | Market pctl |
|---|---|---|---|---|---|---|---|
| **26-27 Nov (1 n)** | **360** (374) | **307** (325), min 1 | 270 (5), **P100, +33.3%** | 275.5 (2), P100, +30.7% | **196-230** | **-36% to -25%** | P90 |
| **30 Nov-3 Dec** | **254.00** (261.67) | **254/270/276** (260/284/286) | 244.5 (12), P58, **+3.9%** | 250.67 (5), P60, +1.3% | 218-257 | **-18% to -4%** | P79 |
| 30 Nov-4 Dec | 246.00 (253.25) | 254/270/276/290 | 243.75 (9), P56, +0.9% | 277.5 (3), P33, -11.4% | 230-270 | -16% to -1% | P79 |
| 1-3 Dec | 271.50 (281.00) | 270/276 | 254 (7), P57, +6.9% | 254 (3), P67, +6.9% | 217-255 | -20% to -6% | P80 |
| 2-4 Dec | 279.00 (285.50) | 276/290 | 234.75 (8), P75, +18.8% | 269 (2), P50, +3.7% | 202-238 | -28% to -16% | P80 |

- **26 Nov: room about £225 (about -27%), keep min 1.** Still P100 and +33% vs the band, P90 in the market, even after PriceLabs cut it £18. **t-p12-26nov-price: not fixed (day 6).**
- **30 Nov-3 Dec: about -5%** (254/270/276/290 -> about £245/255/262/275). PriceLabs cut £30 over the three nights; 2-4 Dec still carries most of the gap (+19% vs band).
- **`recommend`:** both horizons give a mechanical **raise +10%**: 30-day 83% vs 44%, 60-day 92% vs 33%, comp P60 (median over 5 open stays). **Not adopted:** the lead comes from nights already sold; the open stays sit above the band against a quality ceiling of 0%; the raise branch ignores a negative `quality_premium`; nothing can be sold after the 13 Dec handback.
- For the channel agent: on 30 Nov-3 Dec the Airbnb all-in (£762 for 3 n) is again below the PriceLabs room price alone (£800). NOT VERIFIED.

## Priority 3: P01 Bowsprit Point 18-20 Dec (blocked, before the 20 Dec handback)
- **Still blocked:** 18-20 Dec `Blocked`, 282/293, min 3 (22 Nov 286/296). Our listing is not returned on Airbnb.
- **Comps (41905186 gave back most of 22 Nov's rise):**
  - 18-21 Dec (3 n): stored median **£369.67** (n = 7, range 281-524); band **£339.67** (n = 15).
  - 18-20 Dec: stored £377 (3); band £355.50 (8).
  - 19-21 Dec: stored £366.50 (3); band £337 (7).
- **If reopened** at today's 282/293/253 plus £149 cleaning (carried figure), before any Airbnb guest fee:
  - 18-21 Dec: £325.67/n, **-11.9% vs stored, -4.1% vs band**.
  - 18-20 Dec: £362/n, -4.0% vs stored, +1.8% vs band.
  - PriceLabs NL: P62-P67.
- **Supported: about -2% vs the comp median** (`quality_premium(4.75, 4.8)` = -0.02, on only 4 reviews). Today's price is inside that range on 18-20 Dec; on 18-21 Dec about +5% is supported (room about £296/308/266). No cut is needed.
- **For Corentin (carried policy conflict):** the handback policy says "before the date, maximise revenue normally", but £828 of room nights (282+293+253) stay blocked.

## Priority 4: P09 Torrent Lodge
- **No open night before the 26 Nov handback** (booked through it). Nothing to position.
- Comp median £166.50-227.75 (n = 1-4). `quality_premium(5.0, 4.56)` = +0.15, on only 3 reviews. `recommend`: raise-signal (30-day 100% vs market 41%).

## Summary per property
| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30/60 vs market | `recommend` | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (18-20 Dec blocked) | stored 162.5-424 (n 1-7); 18-21 Dec 369.67 (7) | n/a (would be -12% stored / -4% band) | 4.75 vs 4.8 | 4 vs 30 (-26) | -0.02 | 100%/100% vs 35%/27% | raise-signal | **-2% vs median**; 18-20 Dec in range if reopened, 18-21 Dec about +5% |
| P04 (synced 1657...) | Dec 145-168; **15-19 Dec 144.75; 17-20 Dec 160.33**; 20-26 Dec 158.17; Christmas 145-236 | stored 206-257.7 (n 1-3); band op 179-235 (n 2-6) | P0 stored (25-27 Dec P100); P0-P50 band | **4.2** vs 4.83 | 10 vs 27 (-17) | -0.15 | 50%/38% vs 23%/18% | 30 d raise +10%; 31-60 d raise +10% | **-15% to 0%.** **14-20 Dec about +25%** (Airbnb guest price); **7-10 Dec about +5%**; **20-22 Dec about +10%**; 23-26 Dec hold; **10-14 Dec sold at £122.09/n: 20-39% below supported, below market P25**; 24-26 Dec min 2 = confirm or revert |
| P04 unsynced 1455... | 186-225.5; **bookable on sold 23 Nov (23-25 Nov £444) and sold 10-14 Dec (£754)** | | | 4.69 | 26 | n/a | | | map or unlist |
| P09 | no sellable night | 166.5-227.75 (n 1-4) | n/a | 5.0 vs 4.56 | 3 vs 25 (-22) | +0.15 | 100%/100% vs 41%/30% | raise-signal | nothing before the handback |
| P12 | open 246-360 | band 234.75-270; stored 250.67-277.5 | P56-P100 band (median P60 stored) | 4.27 vs 4.88 | 15 vs 25 (-10) | -0.15 | 83%/92% vs 44%/33% | raise +10% (P60): **not adopted** | **-15% to 0% vs band. 26 Nov about -27%; 30 Nov-3 Dec about -5%** |
| P15 | no listing of ours | 121.5-160.5 (n 1-5) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 23 Nov)
| Item | Status |
|---|---|
| **t-p04-doublebook** | **Not fixed (day 24) and wider:** 1455 is bookable on 23-25 Nov (£444; 23 Nov sold) and on **10-14 Dec (£754; all 4 nights sold on Booking.com 22 Nov)**. Closed on the older booked stays. |
| a-p04-dec-1611 | **Partly done:** Reyhan set 6-23 Dec -5% -> -2% (23 Nov 00:14Z), and PriceLabs lifted 7-21 Dec by £11-31/night. **But the Airbnb guest price did not follow** (17-20 Dec £481 on 21, 22 and 23 Nov). 14-20 Dec still P0, -31% to -38% vs band; about +25% supported. 7-10 Dec now close (about +5%). |
| t-p04-xmas-1711 | 20-26 Dec room £1,022 (6 n; 22 Nov 150/150/166/170/190/191 = £1,017). Airbnb £949 (P0, -21% vs band). Supported: 20-22 Dec about +10%, 23-26 Dec hold. **Min 2 on 24-26 Dec = confirm or revert (Corentin).** |
| P04 10-14 Dec (new) | Sold on Booking.com at £122.09/n: below market P25, -39% vs the Airbnb band (all-in), 20-39% below the supported floor. Rate plan: NOT CHECKED. |
| a-p12-trim | PriceLabs did part of it (830 -> 800 on 30 Nov-2 Dec). Still needed: about -5% on 30 Nov-3 Dec, more on 2-3 Dec. |
| t-p12-26nov-price | **Not fixed (day 6):** 325 -> 307 by the algorithm (£360 all-in, P100, +33% vs band, market P90). About £225 is supported. |
| t-p01-1820block | **Not fixed** (still `Blocked`). For Corentin. |
| Push freshness (`listings.csv`) | P04 23 Nov 00:15Z; P12 23 Nov 00:05Z; P01 23 Nov 04:00Z. All refreshed overnight. |

## Critical / high findings
- **CRITICAL: P04 unsynced Airbnb 1455876748739910219 is bookable on 10-14 Dec at £754 (£188.50/n), the 4 nights sold on Booking.com on 22 Nov (£488.35, confirmed).** It is also still bookable on 23-25 Nov at £444 while the 20-24 Nov Airbnb guest is in the flat (day 24).
- **HIGH: P04 10-14 Dec sold at £122.09/n** on Booking.com: 0.84x Smoobu, below market P25 (£127.8), -39% vs the Airbnb band (£200, n 5), -35% vs our own unsynced listing (£188.50). The evidence supported at least about £170/n all-in.
- **HIGH: P04 14-20 Dec is still P0** (-31% to -38% vs band, n 4-5) although the PriceLabs room rose 8% overnight (Reyhan -5% -> -2% plus the algorithm): **the Airbnb totals did not change** (17-20 Dec £481 on 21-23 Nov). About +25% on the guest price is supported.
- **HIGH: P12 26 Nov £307 room / £360 all-in** is P100, +33% vs band and market P90; about £225 is supported (day 6).
- **HIGH (for Corentin, confirm or revert, carried): P04 24-26 Dec +5% with min 2** (Reyhan, 20 Nov 22:53Z), below the standing 3-night floor.
- **HIGH (for Corentin): P01 18-20 Dec still blocked.** Reopened at today's price it would sit at -4% to -12% vs comps (18-21 Dec). About £828 of room nights are held.
- **MEDIUM: P04 20-23 Dec Airbnb all-in fell £180.67 -> £168 while the room rose £466 -> £482**; 20-26 Dec is -21% vs band (P0). About +10% on 20-22 Dec is supported.

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-23 07:20-07:29Z.
- "22 Nov x" = the same comp and stay on 22 Nov, where the two differ by more than £1.
- `*` = found by the 0.3 km second pass.
- "–" = not returned in the wide search or the 0.3 km box (booked or unavailable).
- "(earlier read)" = km from an earlier day; the comp was not returned today.
- Full source for every row: `data/snapshots/2026-11-23/comps.csv` (`comp-east`, `east-refband`, `east-ours`).
- Cancellation policy: NOT CHECKED. Differentiators come from listing-page reads on 25 Oct-15 Nov.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 23 Nov-25 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | 348.33 | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | – | – | 424 (22 Nov 400) | 300 | 287 | 377 (22 Nov 400) | 339.67 (22 Nov 355) | 337 (22 Nov 360) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.43 (165) | none listed | – | 162.5 (22 Nov 168) | – | – | 198.5 (22 Nov 203.5) | – | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (57) | Lift | – | – | – | – | – | – | 447.67 (22 Nov 456) | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 (earlier read) | 6 | 4.6 (30) | Lift/River view/balcony | – | – | – | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking/River view/balcony | – | – | – | – | – | – | 382.67 | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 (earlier read) | 6 | 4.95 (21) | Skyline view/Free parking/Lift/Superhost/balcony/Guest fav | – | – | – | – | – | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | – | 357 | 357* | 376 | 369.67 | 366.5 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.82 (17) | Lift | – | – | – | 335 | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (45) | Lift/patio or balcony/Superhost/Guest fav | – | – | – | 539.5 | 539.5 | 528* | 524 | 534 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost | – | – | – | – | – | – | 281 | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | n/a (0) | **162.5** (1) | **424** (1) | **346** (4) | **322** (4) | **377** (3) | **369.67** (7) | **366.5** (3) |
| **Band median (n)** | | | | | 203.75 (4) | 165.5 (7) | 367 (2) | 357 (9) | 284.25 (8) | 355.5 (8) | 339.67 (15) | 337 (7) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.2 (10); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 23 Nov-25 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 23 Nov-24 Nov | 24 Nov-25 Nov | 25 Nov-28 Nov | 28 Nov-2 Dec | 3 Dec-6 Dec | 6 Dec-9 Dec | 6 Dec-10 Dec | 7 Dec-10 Dec | 10 Dec-14 Dec | 14 Dec-17 Dec | 15 Dec-19 Dec | 16 Dec-19 Dec | 17 Dec-20 Dec | 20 Dec-23 Dec | 21 Dec-24 Dec | 23 Dec-26 Dec | 23 Dec-27 Dec | 24 Dec-27 Dec | 25 Dec-27 Dec | 20 Dec-26 Dec | 20 Dec-27 Dec | 27 Dec-4 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | – | – | – | – | – | – | 257.67 | 254 | 257.67 | – | – | – | – | 257.67 | 254 | 257.67 | 257.67 | – | – | – | – | 260 | – | – | – | – |
| [985683261536682900](https://www.airbnb.co.uk/rooms/985683261536682900) | 0.61 (earlier read) | 5 | 4.82 (17) | Paid street parking/Superhost | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 (earlier read) | 5 | 5.0 (28) | Free parking/Superhost/Guest fav | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.76 (42) | Free parking/Superhost | – | – | – | – | – | – | – | – | – | 242.5 | – | 248.33 | – | – | – | 265 | 267.5 | 273.33 | – | – | – | – | – | – | – | – | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | – | – | – | 228 | 222 | 222 | – | – | – | – | – | 222 | 222* | 222 | 222 | 222 | 222 | 222 | 222 | 222 | 222 | 230 | 231 | 234 | 234 | 226 | 211.71 | – |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 (earlier read) | 6 | 4.85 (27) | Parking (in name) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (18) | Free street parking/Superhost | – | – | – | – | – | – | – | – | – | – | – | 198 | 190 | 199.33 | – | 199.33 | – | – | – | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **168.33** | **152.75** | **161** | not bookable | **153** | **144.75** | **157.67** | **160.33** | **168** | **181** | **212.33** | **202** | **218.33** | **235.5** | **158.17** | **145.29** | not bookable |
| 1455876748739910219 (unsynced, ours) | | | | | **222** | not bookable | not bookable | not bookable | not bookable | **225.5** | not bookable | not bookable | not bookable | not bookable | not bookable | **196.67** | **186** | **195** | **188.5** | **192.67** | **187** | **198.33** | **202.67** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | n/a (0) | n/a (0) | n/a (0) | **228** (1) | **222** (1) | **222** (1) | n/a (0) | n/a (0) | **257.67** (1) | **248.25** (2) | **257.67** (1) | **222** (3) | **206** (2) | **210.67** (2) | **222** (1) | **239.84** (4) | **254** (3) | **257.67** (3) | **239.84** (2) | **222** (1) | **222** (1) | **230** (1) | **231** (1) | **247** (2) | **234** (1) | **226** (1) | **211.71** (1) | n/a (0) |
| **Band median (n)** | | | | | 193 (2) | 193.75 (2) | n/a (0) | 201 (4) | 222 (3) | 195.25 (2) | 230 (1) | 230 (1) | 246.34 (2) | 238.12 (4) | 257.67 (1) | 214.33 (6) | 179 (4) | 196 (6) | 200 (5) | 226 (6) | 233.75 (5) | 235 (5) | 231 (4) | 222 (3) | 202.17 (4) | 202.67 (4) | 228 (3) | 232.67 (4) | 213.25 (2) | 200.25 (4) | 211.71 (3) | 184 (1) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | P0 (-24.2%) | P0 (-25.8%) | P0 (-23.6%) | – | P0 (-36.2%) | P0 (-43.0%) | P0 (-38.8%) | P0 (-33.2%) | P0 (-24.3%) | P0 (-18.5%) | P0 (-7.7%) | P0 (-12.6%) | P0 (-11.6%) | P100 (+0.6%) | P0 (-30.0%) | P0 (-31.4%) | – |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 23 Nov-25 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec |
|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 168 | 168 | – | – | 169.5 | 168 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 165 | 165 | – | – | 165 | 165 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.7 (23) | none listed | – | – | – | – | 152.5 (22 Nov 148.5) | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest fav | – | – | 200.5 | 248.5 | 248.5 | 248.5* |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | – | – | 207 | – | – |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 (earlier read) | 3 | 4.75 (16) | Skyline view/balcony | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **166.5** (2) | **166.5** (2) | **200.5** (1) | **227.75** (2) | **167.25** (4) | **168** (3) |
| **Band median (n)** | | | | | 121 (7) | 117.25 (8) | 204.75 (2) | 171 (6) | 192.5 (9) | 180.75 (6) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 23 Nov-25 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 1 Dec-3 Dec | 2 Dec-4 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.5 | 237.5 | 237.5 | 337.5 | 287.5 | 237.5 | – | 225 | – | 237.5 | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking | – | 270 | – | – | – | – | – | 283.33 | 277.5 | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (79) | Superhost | – | – | – | – | – | – | – | 185.67 (22 Nov 193.33) | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.94 (16) | Superhost/Guest fav | – | 150 | – | – | – | – | – | – | – | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (121) | Superhost/balcony/Guest fav | 254 | 254 | – | – | – | – | 284 | 250.67 | 243.75 | 254 | 254 |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1 | 6 | 4.54 (13) | Paid parking/balcony (placeholder price, excluded) | – | 1035 | 1035 | 1035 | 1035 | 1035 | 1043 | 1044 | 1039.75 | 1052.5 | 1052.5 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift | 267 | 267 (22 Nov 282) | – | – | 302.5 (22 Nov 293) | – | 267 (22 Nov 282) | 282 | 283* (22 Nov 284.5) | 282 | 284 (22 Nov 287) |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **360** | **254** | **246** | **271.5** | **279** |
| **Comp median (n)** | | | | | **254** (3) | **254** (5) | **237.5** (1) | **337.5** (1) | **295** (2) | **237.5** (1) | **275.5** (2) | **250.67** (5) | **277.5** (3) | **254** (3) | **269** (2) |
| **Band median (n)** | | | | | 232 (8) | 226.5 (11) | 295 (2) | 287.25 (10) | 288.75 (12) | 324.5 (7) | 270 (5) | 244.5 (12) | 243.75 (9) | 254 (7) | 234.75 (8) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | P100 (+30.7%) | P60 (+1.3%) | P33 (-11.4%) | P67 (+6.9%) | P50 (+3.7%) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 23 Nov-25 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 23 Dec-25 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec |
|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | – | 190 | 170.5 | 195.5 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 (earlier read) | 4 | 4.93 (14) | Superhost/Guest fav | – | – | – | – | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.81 | 3 | 4.87 (15) | Paid parking/Superhost | 121.5 | 128.5 (22 Nov 135) | – | 135 | 135 | 160 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.85 | 4 | 4.71 (14) | Lift/Paid parking | – | 167.5 | – | – | – | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.84 | 4 | 4.92 (25) | Free parking/Guest fav | – | 161 (22 Nov 145) | – | – | – | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (203) | Garden view/Lift/Paid parking off/Superhost | – | 135.5 | – | 150.5 | 155.5 | 160.5 |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.03 | 4 | 4.64 (14) | Lift | – | 150 | – | – | – | – |
| **Comp median (n)** | | | | | **121.5** (1) | **150** (5) | n/a (0) | **150.5** (3) | **155.5** (3) | **160.5** (3) |
| **Band median (n)** | | | | | 135.75 (2) | 150 (6) | 228.75 (2) | 190 (7) | 156.25 (6) | 161.25 (4) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings (Airbnb only). Which Booking.com rate plan the P04 10-14 Dec stay used, and whether cleaning was charged on top of £488.35: NOT CHECKED (channel agent).
- **P04 comp set is below the 6-comp minimum in practice:** only 4 of 7 stored comps were returned on any stay. 985683261536682900, 1733027244747346716 and 1387112821878102742 have been unreturned on every stay for 4 days, but their room pages still load. Inactivity is NOT VERIFIED (no 60-day calendar read), so they are not replaced. Stored n = 1-3 per stay; band n = 2-6. Replacement candidates (2BR, 10+ reviews, inside 2.5 km; sleeps NOT CHECKED):
  - 1072316558208098643: 0.33 km, 4.93 (76), Superhost, returned on 20 of 28 stays today, £150-170/n on 10-26 Dec.
  - 43709205: 1.78 km, 4.91 (47), Superhost, 4 stays (£181-185/n).
  - 1245634494660468861: 0.04 km, 4.88 (25), Guest favourite, 5 stays (£200/n).
- **Why the P04 Airbnb guest price did not follow the overnight room rise** (17-20 Dec £481 on 21-23 Nov; 20-23 Dec fell while the room rose): NOT VERIFIED (Smoobu Airbnb rules, sync lag, or Airbnb-side pricing).
- **Why 1455 is open on 23 Nov and 10-14 Dec but closed on the older booked stays:** NOT VERIFIED.
- **Why PriceLabs moved P04 7-21 Dec by more than the -2% override, and P12 26 Nov (-£18) and 30 Nov-3 Dec (-£30):** only one logged edit (Reyhan, P04 6-23 Dec -2%). The rest is the algorithm: NOT VERIFIED.
- **P04 Christmas Airbnb strikethrough** (20-26 Dec £1,039 -> £949; 23-26 Dec £704 -> £637) and **P12 30 Nov-3 Dec Airbnb all-in below the room price** (£762 vs £800): causes NOT VERIFIED (channel agent).
- **Kept as booked, not inactive** (not returned on any stay today): P01 852256049507701872 and 1418178473526356202; P09 958156921765583815; P15 1371771992549776701. January was not re-checked.
- P04 2 Dec (£425, +200% min 1; deprioritised in policy) and 4-10 Jan were not priced against comps.
- P01 cleaning £149 is carried from earlier sections, not re-read today.
- Comp cancellation policies, band-listing sleeps and current lift/view/parking: NOT CHECKED today (carried from 25 Oct-15 Nov reads).
- **Smoobu was not called.** Room prices are PriceLabs `prices.csv`. 23 Nov room values come from the 22 Nov file.
- NL percentiles: PriceLabs does not state the horizon, and the basis is a host-only fee on 1-3BR (P04, P01) or 2-3BR (P12). Read them as market bands, not like-for-like. The £122.09 Booking.com rate is compared with them as a room rate.
