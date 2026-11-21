# Competitor positioning: EAST batch (D = 2026-11-21)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy `intentional_blocks`). Not analysed.
- **P15** has no listing of ours. Reference only.
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec, P09 26 Nov, P12 13 Dec). P09 and P12 December stays below are comp trend only.

**Method** (same as 26 Oct-20 Nov; scripts copied from scratchpad `east20/bin` to `east21/bin`, dates and paths only changed)
- **Comp ids:** the same set as 20 Nov (P01 11, P04 7, P09 6, P12 7, P15 7). **No comp replaced today.**
  - P04 985683261536682900, 1733027244747346716 and 1387112821878102742 were not returned on any of 27 stays, for the second day running (0.3 km box run on each, 0 errors). They are kept as booked, not inactive. This leaves P04 with 4 live comps, below the 6 minimum (see Data gaps).
  - P01 852256049507701872 and 1418178473526356202, P09 1501211872839579235 and 958156921765583815, and P15 1371771992549776701 were not returned on any stay. Kept as booked, not inactive.
  - P12 29297702 still shows a placeholder-like price. It is kept out of the medians: `nightly_gbp` is blank and the price is in `source`.
- **Access:** public Airbnb pages (HTTP 200).
  - 58 wide searches with pagination, 0 failures.
  - Then 359 comp/stay checks in a 0.3 km box: 7 hits, 0 errors.
  - Box sizes: 2.5 km for P04, 1.8 km for P09, 1.3 km for the rest. 4 guests for 2BR, 3 for 1BR.
  - Checked **2026-11-21 07:19:04-07:21:34Z**. **Booking.com: NOT CHECKED.**
- **Price basis = what guests see:** Airbnb **guest-paid all-in total / nights**, after discounts, with cleaning and Airbnb fees **included**. No separate taxes are shown. Ours are priced the same way.
  - PriceLabs/Smoobu figures (`prices.csv` 21 Nov) are **room only, cleaning excluded**.
  - Stays of 7+ nights include the 15% weekly discount (policy). Comps show their own discounts.
- **Stays (same dates for comps and us):**
  - Default: tonight **21-23 Nov** (trend), midweek Tue-Thu **24-26 Nov**, next Fri-Sun **27-29 Nov**, 30 days out **21-23 Dec**. Trend stays: **20-22 Dec** and **18-20 Dec**.
  - P04, unsynced-listing check on its booked nights: **21-24 Nov**, **22-24 Nov**, **25-28 Nov**, **28 Nov-2 Dec**, **3-6 Dec** and **27 Dec-4 Jan**.
  - P04, open stays: **24-25 Nov**, **6-9, 9-12, 11-14, 14-17, 16-19 and 17-20 Dec**, **6-13 Dec**, **20-23, 21-24, 23-26, 23-27, 24-27, 25-27 and 20-27 Dec**.
  - P12: **26-27 Nov**, **30 Nov-3 Dec**, 30 Nov-4 Dec, 1-3 Dec, 2-4 Dec.
  - P01: **18-20 Dec**, 18-21 Dec, 19-21 Dec.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius. Ours and per-night prices above £1,000 are excluded. P04's 1531... operator units are collapsed into one ("op").
- **"Supported room"** = band median x 0.85-1.00 (the `quality_premium` range). It is converted back to room price using each stay's own ratio of Airbnb all-in to PriceLabs room. Approximate.
- **Data written:** `data/snapshots/2026-11-21/comps.csv` already existed: another agent had copied it forward from 20 Nov (7,916 lines, the same as 20 Nov). Under `flock` on `.comps.csv.lock` I **appended 894 rows**:
  - 432 `comp-east`: every stored comp x stay. NOT RETURNED rows are kept with a blank price.
  - 331 `east-refband` (ref `Pxx:band`).
  - 131 `east-ours` (ref `Pxx:ours`): Airbnb all-in rows and PriceLabs room rows.
- **PriceLabs (read-only, one call at a time, in this order):**
  - `get_listing_date_overrides` P04, 21 Nov-10 Jan: OK. **Changed:** 23-26 Dec updated 20 Nov 22:53Z (see below).
  - `get_user_logs` (listing; P01, P04, P09, P12; 20-21 Nov): **2 entries, both by Reyhan, both on P04** (20 Nov 22:53:42Z and 22:53:59Z).
  - `get_neighbourhood_data` detail for P04, P12 and P01: OK, saved to scratchpad `east21/dl/nd_*_detail.json`.
- **Smoobu: not called.** Room prices come from `prices.csv` (21 Nov; the file starts 22 Nov, so 21 Nov comes from the 20 Nov file).

## What changed since 20 Nov (this batch)
**1. P04 unsynced Airbnb 1455876748739910219 is STILL bookable on the sold 21-24 Nov, while the guest is in the flat.**
- 21-24 Nov: **£614 total (£204.67/n)**. 21-23 Nov: £452. 22-24 Nov: £443.
- Those nights are sold on the synced listing: Airbnb 20-24 Nov, £489.59 room + £142 cleaning, confirmed (`reservations.csv`). The guest arrived 20 Nov.
- **Other booked nights are closed on 1455.** It was not returned on any of these stays (each also run in a 0.3 km box, 0 errors):
  - 24-26 Nov.
  - 25-28 Nov and 28 Nov-2 Dec (Booking.com 25 Nov-2 Dec).
  - 3-6 Dec (Booking.com).
  - 27 Dec-4 Jan (Airbnb).
  - 20-27 Dec and the other Christmas stays.
- **1455 is also bookable on open nights:** 6-19 Dec at £184-203/n, and **18-20 Dec at £451** (20 Nov £481). The synced listing cannot sell 18-20 Dec (min 3).
- Source: wide searches checked 07:19:05-07:19:34Z. URLs are in `comps.csv`, ref `P04:ours`.
- **t-p04-doublebook: not fixed, day 22.** The exposure is now 21-24 Nov only. Read the closed booked nights as "booked/blocked on 1455", not as proof that it is synced: the reason is NOT VERIFIED.

**2. P04 Christmas: Reyhan edited the 23-26 Dec overrides on 20 Nov 22:53Z** (`get_user_logs`; `get_listing_date_overrides` `updated_at`).
- 23 Dec: -5%, **min 4 -> 3**.
- 24-26 Dec: -5% -> **+5%**, **min 4 -> 2**.
- Room 23-26 Dec: 177/181/177/174 -> **170/190/192/190**. P04 was pushed 20 Nov 22:54Z (`listings.csv`).
- **Effect, checked live: 23-26 Dec (£213/n all-in), 24-27 Dec (£219/n) and the 2-night 25-27 Dec (£236.50/n) are now bookable.** On 20 Nov 23-26 Dec was not bookable.
- **Min 2 on 24-26 Dec conflicts with the standing P04 decision** (policy `price_changes` 2026-10-24: "never open for fewer than 3"). **For Corentin: confirm or revert.** Min 3 on 23 Dec matches yesterday's proposal.

**3. P04 20 Dec fell 168 -> 149 (-£19) with no logged edit.** 19 Dec 153 -> 151. The rest of 6-22 Dec moved -1 to -5.
- 20-26 Dec open total: £1,216 -> **£1,225** (149/168/166/170/190/192/190).
- Airbnb all-in changes:
  - 20-23 Dec £199.67 -> **£192.33**.
  - 21-24 Dec £202.33 -> **£198.67**.
  - 23-27 Dec £195.25 -> **£202.50**.
  - 17-20 Dec £168.00 -> **£159.33**.
  - 24 Nov 145 -> 144: still a 1-night gap under min 3.

**4. P12: almost unchanged.**
- 26 Nov room 311 -> **310**. Airbnb **£363** (unchanged, day 4).
- 30 Nov-3 Dec room 268/282/285 -> **268/283/286**. Airbnb £263 -> **£263.67**.
- 1-3 Dec £280.50. 2-4 Dec £285.50 (unchanged).

**5. P01 18-20 Dec still `Blocked`** (290/301, min 3; 20 Nov 288/293). Our listing is not returned on Airbnb. **t-p01-1820block: not fixed.**

**6. Comps held.** 91 of 107 like-for-like comp/stay prices are within £1 of 20 Nov. Moves of £10 or more:
- P01 41905186 18-20 Dec: 339 -> 357.
- P01 1316210326145130709 18-21 Dec: 426 -> 448.
- P09 1376679869251315227 20-22 Dec: 191.5 -> 155.
- P12 1383544079404594066 20-22 Dec: 333 -> 312.
- P15 1617544963466664181 20-22 Dec: 190 -> 170.5.
- **No P04 or P12 open-stay comp moved by £10 or more.**

## PriceLabs market percentiles (`get_neighbourhood_data`, 21 Nov)
These are market bands, not comps. "Ours" = PriceLabs room (`final_price`, or the `prices.csv` average where they differ by £1).
- Compsets: P04 NL 1-3BR (187); P12 NL 2-3BR (134); P01 NL 1-3BR (283).
- Basis "Host-only fee"; the horizon is not stated. Percentiles are linear interpolations between P25/P50/P75/P90.

| Ref | 2BR summary P25/P50/P75/P90 (n) | Booked 30/60 vs market (`pl_kpis` 21 Nov) | Ours vs daily market (stay average P25/P50/P75/P90) |
|---|---|---|---|
| P04 | 139/174/215/249 (89) | 47% / 37% vs 23% / 18% | 24 Nov £144 (125/151/208/242): P43. **6-20 Dec £141.6 (127.4/158.7/203.1/243.4): P36.** 17-20 Dec £146.3: P35. **20-23 Dec £161 (130/164.7/205.7/256.7): P47.** 21-24 Dec £168: P50. **23-26 Dec £184 (140.3/174.7/215/278): P56.** 23-27 Dec £185.5: P55. 24-27 Dec £190.7: P58. Sold 27 Dec-4 Jan £134.59 room: P26 |
| P12 | 172/205/235/293 (118) | 80% / 90% vs 45% / 34% | **26 Nov £310 (169/201/239/310): P90.** **30 Nov-3 Dec £279 (171.7/202.7/254.3/308): P82.** 1-3 Dec £284.5: P82. 2-4 Dec £291: P82 |
| P01 | 219/266/338/430 (144) | 100% / 100% vs 34% / 27% | **18-20 Dec (blocked) £295.5 (200.5/233/310.5/453.5): P70**; 18-21 Dec £281.7: P65 |

- `prices_with_default_customization` (what PriceLabs would charge with default settings), P04:
  - 20-27 Dec: £203.1/n vs final £175.0 (-14%).
  - 6-20 Dec: £153.9 vs £141.6 (-8%).
  - The listing's customisations still pull these nights down.
- `fp_insights` P04: 26-31 Dec market prices +9.7% vs the surrounding dates.

## Priority 1: P04 Barking
- **Quality:** `quality_premium(4.2, 4.83)` = **-0.15** (the cap). We are 4.2 from 10 reviews; the comp median is 4.83 from 27 reviews (gap 17). **Supported position: -15% to 0% vs the band median.**
- **Overrides** (`get_listing_date_overrides`, 21 Nov). Changed lines are in bold:
  - 21-24 Nov: -5%, min 3.
  - 25 Nov: +15%, min 2.
  - 26-30 Nov and 3-5 Dec: -8%, min 3.
  - 1 Dec: -2%, min 4.
  - 2 Dec: +200%, min 1.
  - 6-22 Dec: -5%, min 3.
  - **23 Dec: -5%, min 3** (was min 4).
  - **24-26 Dec: +5%, min 2** (was -5%, min 4). Reyhan, 20 Nov 22:53Z.
  - 27 Dec: -5%, min 7.
  - 28-31 Dec: -5%, min 5.
  - 1 Jan: -2%, min 4.
  - 2-10 Jan: -8%, min 3.

### The unsynced listing (guest in residence 20-24 Nov)

| Listing | Stay | Airbnb total | £/n all-in | Status (checked 21 Nov) |
|---|---|---|---|---|
| 1455876748739910219 (unsynced, 4.69 (26)) | **21-24 Nov** | **£614** | 204.67 | **BOOKABLE** (07:19:29Z); 20 Nov: 20-24 Nov £781 |
| 1455876748739910219 | 21-23 Nov | £452 | 226.00 | bookable |
| 1455876748739910219 | 22-24 Nov | £443 | 221.50 | bookable |
| 1455876748739910219 | 24-26 Nov, 25-28 Nov, 28 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan | n/a | n/a | not returned (closed on the other booked nights) |
| 1455876748739910219 | 18-20 Dec | £451 | 225.50 | bookable (the synced listing is closed there by min 3) |
| 1455876748739910219 | 6-19 Dec stays | 3-night £578-608; 6-13 Dec £1,291 | 184.43-202.67 | bookable (open on the synced listing too) |
| 1657859794156786222 (synced) | 21-24 Nov | n/a | n/a | not returned (booked) |
| Smoobu (`reservations.csv`) | 20-24 Nov | £489.59 room + £142 cleaning | | Airbnb, confirmed, booked 14 Nov |

### Christmas, 20-26 Dec open at £1,225

| Stay | Ours, Airbnb all-in £/n | PriceLabs room | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n | Market pctl |
|---|---|---|---|---|---|---|---|
| **20-23 Dec (3 n)** | **192.33** (20 Nov 199.67) | 149/168/166, avg 161 | 241 (2), -20.2% | **222 (5), -13.4%** | P20 | 158-186 (-2% to +15%) | P47 |
| **21-24 Dec (3 n)** | **198.67** (202.33) | 168/166/170, avg 168 | 241 (2), -17.6% | **218.67 (5), -9.1%** | P20 | 157-185 = **in range** | P50 |
| **23-26 Dec (3 n)** | **213.00** (now bookable; 20 Nov not bookable) | 170/190/192, avg 184 | 245 (2), -13.1% | **226.67 (5), -6.0%** | P40 | 166-196 = **in range** | P56 |
| **23-27 Dec (4 n)** | **202.50** (195.25) | 170/190/192/190, avg 185.5 | 243.62 (2), -16.9% | 228 (5), -11.2% | P40 | 178-209 = **in range** | P55 |
| 24-27 Dec (3 n) | 219.00 (now bookable) | 190/192/190 | 247 (2), -11.3% | 232.67 (4), -5.9% | P25 | 172-203 = in range | P58 |
| 25-27 Dec (2 n) | 236.50 (bookable **only because of min 2**) | 192/190 | 234 (1), +1.1% | 215.25 (2), +9.9% | P100 | 148-174 (-23% to -9%) | |
| 20-27 Dec (7 n) | 149.57 | avg 175 | 230.36 (2), -35.1% | 214.29 (4), -30.2% | P0 | 213-251 (includes the 15% weekly) | |

- Our Christmas stays show an Airbnb strikethrough, as on 20 Nov: 23-26 Dec £709 -> £639, 20-23 Dec £680 -> £577. The 6-19 Dec stays show none. Source: NOT VERIFIED (channel agent).
- **Supported positioning:**
  - **20 Dec: back to about £165 (+10%).** It fell £19 overnight with no logged edit. 20-23 Dec is now -13.4% vs the band, near the low edge of the quality range.
  - **21-22 Dec: hold.** 21-24 Dec is -9.1%, inside the range.
  - **23-26 Dec: hold** after Reyhan's +5% (now -6% vs the band, inside the range). This replaces yesterday's "about +5%": that rise is now in.
- **Min stays (for Corentin, confirm or revert):**
  - 23 Dec min 3 is within policy and makes 23-26 Dec sellable. This matches yesterday's proposal.
  - **24-26 Dec min 2 is below the standing P04 floor of 3.** It is what makes 25-27 Dec (2 n, £236.50/n, +10% vs a 2-listing band) sellable. Min 3 on 24-26 Dec would still allow 24-27 Dec.

### 24 Nov and 6-19 Dec

| Stay | Ours, Airbnb all-in £/n | PriceLabs room | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n |
|---|---|---|---|---|---|---|
| 24-25 Nov (1 n) | not bookable (1-night gap; min 3) | 144 | n/a (0) | 230 (1) | | n/a: policy min 3 |
| **6-9 Dec** | 154.67 | 140/140/140 | 222 (3), -30.3% | 214.33 (6), **-27.8%** | P33 | **165-194** (+18% to +39%) |
| 9-12 Dec | 156.00 | 137/140/148 | 222 (1), -29.7% | 214.33 (4), -27.2% | P25 | 165-195 (+17% to +37%) |
| 11-14 Dec | 159.00 | 148/149/140 | 222 (1), -28.4% | 214.33 (4), -25.8% | P0 | 167-196 (+15% to +35%) |
| **14-17 Dec** | 152.00 | 133/137/140 | 239.84 (4), -36.6% | 226 (6), **-32.7%** | P17 | **173-203** (+26% to +49%) |
| 16-19 Dec | 156.67 | 140/142/146 | 257.67 (3), -39.2% | 228.5 (6), -31.4% | P17 | 177-208 (+24% to +46%) |
| **17-20 Dec** | **159.33** (168.00) | 142/146/151 | 239.84 (2), -33.6% | 222 (5), **-28.2%** | P0 | **173-204** (+18% to +39%) |
| 6-13 Dec (7 n) | 125.14 | 137-149 | 207 (1), -39.5% | 155.43 (5), -19.5% | P0 | 150-176 (includes the weekly) |

- **6-16 Dec: about +20% supported** (room about £165-175, from 133-149). Unchanged since 17 Nov; the comps did not move.
- **17-19 Dec: about +20%** (was +15% on 20 Nov). Our price fell again (17-20 Dec all-in £168 -> £159.33) and the comps held.
- **24 Nov:** a 1-night gap between two bookings. Under policy (min 3, never fewer) it cannot be sold. Nothing to position.
- **`recommend`:**
  - 30-day: 47% vs market 23%, comp P0, quality -0.15 = **raise +10%**.
  - 31-60-day: 37% vs 18% = **raise +10%**.
  - **Adopted at the larger size above for 6-19 Dec**, because the comp gap (-26% to -33% vs the band) is bigger than the formula step.

## Priority 2: P12 Mile End
- **Quality:** `quality_premium(4.27, 4.88)` = **-0.15** (the cap). We are 4.27 from 15 reviews; the stored-comp median is 4.875 from 25 (gap 10). **Supported: band median x 0.85-1.00.**

| Stay | Ours, Airbnb all-in £/n | PriceLabs room | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room | Move vs PriceLabs |
|---|---|---|---|---|---|---|
| **26-27 Nov (1 n)** | **363** (unchanged) | **310** (min 1) | 282 (5), **P100, +28.7%** | 283 (2), P100, +28.3% | **205-241** | **-34% to -22%** |
| **30 Nov-3 Dec** | **263.67** (263) | 268/283/286 | 250.67 (11), P55, **+5.2%** | 250.67 (5), P60, +5.2% | 225-265 | **-19% to -5%** |
| 30 Nov-4 Dec | 254.25 (254) | 268/283/286/296 | 243.75 (9), P56, +4.3% | 277.5 (3), P33, -8.4% | 231-272 | -19% to -4% |
| **1-3 Dec** | **280.50** (279.50) | 283/286 | 245.75 (8), P75, **+14.1%** | 245.75 (4), P75, +14.1% | 212-249 | **-26% to -12%** |
| 2-4 Dec | 285.50 | 286/296 | 230.25 (8), P88, +24.0% | 254 (3), P67, +12.4% | 199-235 | -31% to -19% |

- **Every open P12 stay except 30 Nov-4 Dec (stored) is above the comps** (+4% to +29% vs the band), against a quality ceiling of 0%. The PriceLabs NL market puts them at P82-P90.
- **26 Nov: room about £205-240 (about -25%), keep min 1.** It is P100 and +29% vs the band. **t-p12-26nov-price: not fixed (day 4).**
- **30 Nov-3 Dec: about -12%** (268/283/286/296 -> about £235/250/250/260). 1-3 and 2-4 Dec carry most of the gap.
- **`recommend`:** both horizons give a mechanical **raise +10%**: 30-day 80% vs 45%, 60-day 90% vs 34%, comp P67 (median over 5 open stays). **Not adopted:**
  - The lead comes from nights already sold.
  - The open stays sit above the band.
  - The raise branch ignores a negative `quality_premium`.
  - No night can be sold after the 13 Dec handback.
- Carried, for the channel agent: on 30 Nov-3 Dec the Airbnb all-in (£791 for 3 n) is below the PriceLabs room price alone (£837). NOT VERIFIED.

## Priority 3: P01 Bowsprit Point 18-20 Dec (blocked, before the 20 Dec handback)
- **Still blocked:** 18-20 Dec `Blocked`, 290/301, min 3. Our listing is not returned on Airbnb.
- **Comps:**
  - 18-21 Dec (3 n): stored median **£369.67** (n = 7, range 281-524); band **£333.33** (n = 13).
  - 18-20 Dec: stored £376 (3); band £366.50 (8).
  - 19-21 Dec: stored £366.50 (3); band £348.50 (6).
- **If reopened** at today's 290/301/254 plus £149 cleaning (carried figure), before any Airbnb guest fee:
  - 18-21 Dec: £331.33/n, **-10.4% vs stored, -0.6% vs band**.
  - 18-20 Dec: £370/n, -1.6% vs stored, +1.0% vs band.
  - PriceLabs NL: P65-P70.
- **Supported: parity (about 0%).** `quality_premium(4.75, 4.8)` = -0.02, on only 4 reviews. The current price needs no cut.
- **For Corentin (carried policy conflict):** the handback policy says "before the date, maximise revenue normally", but £845 of room nights (290+301+254) stay blocked.

## Priority 4: P09 Torrent Lodge
- **No open night before the 26 Nov handback** (booked 15-27 Nov). Nothing to position.
- Comp median £166.50-248.50 (n = 1-4). `quality_premium(5.0, 4.56)` = +0.15, on only 3 reviews. `recommend`: raise-signal (100% vs market 41%).

## Summary per property
| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30/60 vs market | `recommend` | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (18-20 Dec blocked) | stored 259.5-380 (n 1-7); 18-21 Dec 369.67 (7) | n/a (would be -10% stored / -1% band) | 4.75 vs 4.8 | 4 vs 30 (-26) | -0.02 | 100%/100% vs 34%/27% | raise-signal | **parity** if reopened; no cut needed |
| P04 (synced 1657...) | Dec 125-159; **Christmas 150-237** | stored 207-257.7 (n 1-4); band op 155-233 (n 2-6) | P0 stored (25-27 Dec P100); P0-P40 band | **4.2** vs 4.83 | 10 vs 27 (-17) | -0.15 | 47%/37% vs 23%/18% | 30 d raise +10%; 31-60 d raise +10% | **-15% to 0%.** **6-16 Dec about +20%; 17-19 Dec about +20%; 20 Dec about +10%; 21-26 Dec hold; 24-26 Dec min 2 -> confirm or revert** |
| P04 unsynced 1455... | 184-227; **bookable on the sold 21-24 Nov (£614)** | | | 4.69 | 26 | n/a | | | map or unlist |
| P09 | no sellable night | 166.5-248.5 (n 1-4) | n/a | 5.0 vs 4.56 | 3 vs 25 (-22) | +0.15 | 100% vs 41% | raise-signal | nothing before the handback |
| P12 | open 254-363 | band 230-282; stored 245.75-283 | P55-P100 band (median P67 stored) | 4.27 vs 4.88 | 15 vs 25 (-10) | -0.15 | 80%/90% vs 45%/34% | raise +10% (P67): **not adopted** | **-15% to 0% vs band. 26 Nov about -25%; 30 Nov-3 Dec about -12%** |
| P15 | no listing of ours | 145-160.5 (n 3-5) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 21 Nov)
| Item | Status |
|---|---|
| **t-p04-doublebook** | **Not fixed (day 22).** 1455 is bookable on 21-24 Nov at £614 while the synced guest is in the flat. It is closed on the other booked nights (25 Nov-2 Dec, 3-6 Dec, 27 Dec-4 Jan). |
| t-p04-xmas-1711 | 20-26 Dec open at **£1,225**. Reyhan's 20 Nov 22:53Z edit: 23 Dec min 3; 24-26 Dec +5%, min 2. 23-26, 24-27 and 25-27 Dec are now bookable. Supported: 20 Dec about +10%, 21-26 Dec hold. **Min 2 = confirm or revert (Corentin).** |
| a-p04-dec-1611 | 6-19 Dec down another -1 to -5. Supported: about +20% on 6-19 Dec. |
| a-p12-trim | Not done (268/283/286/296). Needed: about -12%. |
| t-p12-26nov-price | **Not fixed** (£310 room / £363 all-in, P100, +29% vs band; day 4). |
| t-p01-1820block | **Not fixed** (still `Blocked`). For Corentin. |
| Push freshness (`listings.csv`) | P04 20 Nov 22:54Z; P12 20 Nov 22:50Z; P01 21 Nov 04:22Z; P09 21 Nov 06:46Z. All refreshed since 20 Nov. |

## Critical / high findings
- **CRITICAL: P04 unsynced Airbnb 1455876748739910219 is bookable on 21-24 Nov at £614 (£204.67/n).** Those nights are sold on Airbnb (20-24 Nov, £489.59 room, confirmed) and the guest is in the flat (day 22). The other booked nights are closed on 1455.
- **HIGH (for Corentin, confirm or revert): Reyhan set P04 24-26 Dec to +5% with min 2 on 20 Nov 22:53Z.** This is below the standing P04 floor of 3 nights. It opens the 2-night 25-27 Dec at £236.50/n, +10% vs the band.
- **HIGH: P04 6-19 Dec is -26% to -33% vs the band** (P0 vs stored comps). About +20% is supported. Our price fell again overnight; the comps held.
- **HIGH: every open P12 stay is +4% to +29% vs the band**, against a 0% quality ceiling.
  - 26 Nov: £310 room, P100, +29%; about £205-240 supported.
  - 30 Nov-3 Dec: +5% vs the band, P82 in the PriceLabs market; about -12% supported.
- **HIGH (for Corentin): P01 18-20 Dec still blocked.** Reopened at today's price it would sit at -1% to -10% vs comps (18-21 Dec). About £845 of room nights are held.
- **MEDIUM: P04 20 Dec fell 168 -> 149 with no logged edit.** 20-23 Dec is now -13.4% vs the band; about £165 is supported.

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-21 07:19-07:22Z.
- "20 Nov x" = the same comp and stay on 20 Nov, where the two differ by more than £1.
- `*` = found by the 0.3 km second pass.
- "–" = not returned in the wide search or the 0.3 km box (booked or unavailable).
- "(earlier read)" = km from an earlier day; the comp was not returned today.
- Full source for every row: `data/snapshots/2026-11-21/comps.csv` (`comp-east`, `east-refband`, `east-ours`).
- Cancellation policy: NOT CHECKED. Differentiators come from listing-page reads on 25 Oct-15 Nov.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 21 Nov-23 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 21 Dec-23 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | 348.33 | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | – | 395 | 380 | 294* | 272 (20 Nov 274) | 357 (20 Nov 339) | 326.33 (20 Nov 319) | 330 (20 Nov 334) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.43 (162) | none listed | – | 168 | – | – | 243.5 | – | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (57) | Lift | – | – | – | – | – | – | 448 (20 Nov 426) | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 (earlier read) | 6 | 4.6 (30) | Lift/River view/balcony | – | – | – | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking/River view/balcony | – | – | – | – | – | – | 382.67 | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 (earlier read) | 6 | 4.95 (21) | Skyline view/Free parking/Lift/Superhost/balcony/Guest fav | – | – | – | – | – | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | – | 357 | 357 | 376 | 369.67 | 366.5 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.82 (17) | Lift | – | – | – | 335 | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (45) | Lift/patio or balcony/Superhost/Guest fav | – | 259.5 | – | 539.5 | 539.5 | 528 | 524 | 534 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost | – | – | – | – | – | – | 281 | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | n/a (0) | **259.5** (3) | **380** (1) | **346** (4) | **314.5** (4) | **376** (3) | **369.67** (7) | **366.5** (3) |
| **Band median (n)** | | | | | 310 (1) | 254 (9) | 345 (2) | 390 (7) | 319.25 (8) | 366.5 (8) | 333.33 (13) | 348.5 (6) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.2 (10); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 21 Nov-23 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 21 Dec-23 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 21 Nov-24 Nov | 22 Nov-24 Nov | 24 Nov-25 Nov | 25 Nov-28 Nov | 28 Nov-2 Dec | 3 Dec-6 Dec | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 16 Dec-19 Dec | 6 Dec-13 Dec | 20 Dec-23 Dec | 21 Dec-24 Dec | 23 Dec-26 Dec | 23 Dec-27 Dec | 24 Dec-27 Dec | 25 Dec-27 Dec | 20 Dec-27 Dec | 27 Dec-4 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | – | – | – | – | 257.67 | – | – | 257.67 | 254 | 257.67 | – | – | – | 257.67 | 257.67 | 257.67 | – | 260 | 260 | 260 | 256.25 | 260 | – | 249 | 248.25 |
| [985683261536682900](https://www.airbnb.co.uk/rooms/985683261536682900) | 0.61 (earlier read) | 5 | 4.82 (17) | Paid street parking/Superhost | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 (earlier read) | 5 | 5.0 (28) | Free parking/Superhost/Guest fav | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.76 (41) | Free parking/Superhost | – | – | – | – | – | – | – | – | – | – | 242.5 | – | 248.33 | – | – | 265 | – | 273.33 | – | – | – | – | – | – | – | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | – | – | – | 222 | 222 | 222 | – | – | – | – | – | – | 222 | 222 | 222 | 222 | 222 | 222 | 207 | 222 | 222 | 230 | 231 | 234 | 234 | 211.71 | – |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 (earlier read) | 6 | 4.85 (27) | Parking (in name) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (18) | Free street parking/Superhost | – | – | – | – | – | – | – | – | – | – | – | – | 198 | – | – | 199.33 | – | – | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **154.67** | **156** | **159** | **152** | **159.33** | **156.67** | **125.14** | **192.33** | **198.67** | **213** | **202.5** | **219** | **236.5** | **149.57** | not bookable |
| 1455876748739910219 (unsynced, ours) | | | | | **226** | not bookable | not bookable | not bookable | not bookable | **225.5** | **204.67** | **221.5** | not bookable | not bookable | not bookable | not bookable | **196.67** | **197** | **199** | **192.67** | **202.67** | **198.33** | **184.43** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | n/a (0) | n/a (0) | n/a (0) | **222** (1) | **222** (1) | **222** (1) | **257.67** (1) | n/a (0) | n/a (0) | **257.67** (1) | **248.25** (2) | **257.67** (1) | **222** (3) | **222** (1) | **222** (1) | **239.84** (4) | **239.84** (2) | **257.67** (3) | **207** (1) | **241** (2) | **241** (2) | **245** (2) | **243.62** (2) | **247** (2) | **234** (1) | **230.36** (2) | **248.25** (1) |
| **Band median (n)** | | | | | 237.5 (1) | 193.75 (2) | n/a (0) | 214.25 (4) | 216 (4) | 209.5 (3) | 246.34 (2) | 230 (1) | 230 (1) | 246.34 (2) | 233.75 (5) | 257.67 (1) | 214.33 (6) | 214.33 (4) | 214.33 (4) | 226 (6) | 222 (5) | 228.5 (6) | 155.43 (5) | 222 (5) | 218.67 (5) | 226.67 (5) | 228 (5) | 232.67 (4) | 215.25 (2) | 214.29 (4) | 219.81 (2) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | P0 (-30.3%) | P0 (-29.7%) | P0 (-28.4%) | P0 (-36.6%) | P0 (-33.6%) | P0 (-39.2%) | P0 (-39.5%) | P0 (-20.2%) | P0 (-17.6%) | P0 (-13.1%) | P0 (-16.9%) | P0 (-11.3%) | P100 (+1.1%) | P0 (-35.1%) | – |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 21 Nov-23 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 21 Dec-23 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec |
|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 168 | 168 | – | – | 169.5* | 168 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 165 | 165 | – | – | 165 | 165 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.7 (23) | none listed | – | – | – | – | 155* (20 Nov 191.5) | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest fav | – | 200.5 | 200.5 | 248.5 | 248.5 | 248.5 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 (earlier read) | 3 | 4.27 (22) | none listed | – | – | – | – | – | – |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 (earlier read) | 3 | 4.75 (16) | Skyline view/balcony | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **166.5** (2) | **168** (3) | **200.5** (1) | **248.5** (1) | **167.25** (4) | **168** (3) |
| **Band median (n)** | | | | | 166.5 (2) | 145.5 (11) | 214.5 (2) | 185.75 (6) | 193 (8) | 180.75 (8) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 21 Nov-23 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 21 Dec-23 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 1 Dec-3 Dec | 2 Dec-4 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 247.5 | 247.5 | 237.5 | 337.5 | 287.5 | 237.5* | – | 225* | – | 237.5 | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking | – | 270 | – | – | – | – | – | 283.33 | 277.5* | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (79) | Superhost | – | – | – | – | – | – | – | 193 (20 Nov 201.67) | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.94 (16) | Superhost/Guest fav | – | 150 | – | – | – | – | – | – | – | 220 | 220 |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (121) | Superhost/balcony/Guest fav | – | 254 | – | – | – | – | 284 | 250.67 | 243.75 | 254 | 254 |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1 | 6 | 4.54 (13) | Paid parking/balcony (placeholder price, excluded) | – | 1035 | 1035 | 1035 | 1035 | 1035 | 1043 | 1044 | 1039.75 | 1052.5 | 1052.5 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift | – | 282 | – | – | 312 (20 Nov 333) | 295 (20 Nov 299) | 282 (20 Nov 285) | 285 (20 Nov 282) | 290.25 (20 Nov 288.5) | 286.5 (20 Nov 282) | 298.5* (20 Nov 295) |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **363** | **263.67** | **254.25** | **280.5** | **285.5** |
| **Comp median (n)** | | | | | **247.5** (1) | **254** (5) | **237.5** (1) | **337.5** (1) | **299.75** (2) | **266.25** (2) | **283** (2) | **250.67** (5) | **277.5** (3) | **245.75** (4) | **254** (3) |
| **Band median (n)** | | | | | 290 (2) | 226.5 (11) | 326 (3) | 290 (7) | 287.5 (9) | 306.5 (8) | 282 (5) | 250.67 (11) | 243.75 (9) | 245.75 (8) | 230.25 (8) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | – | P100 (+28.3%) | P60 (+5.2%) | P33 (-8.4%) | P75 (+14.1%) | P67 (+12.4%) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 21 Nov-23 Nov | 24 Nov-26 Nov | 27 Nov-29 Nov | 21 Dec-23 Dec | 20 Dec-22 Dec | 18 Dec-20 Dec |
|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | – | 190 | 170.5 (20 Nov 190) | 195.5 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 (earlier read) | 4 | 4.93 (14) | Superhost/Guest fav | – | – | – | – | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.81 | 3 | 4.87 (15) | Paid parking/Superhost | – | 135 | – | 135 | 135 | 160 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.85 | 4 | 4.71 (14) | Lift/Paid parking | – | 167.5 | – | – | – | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.84 | 4 | 4.92 (25) | Free parking/Guest fav | – | 145 | – | – | – | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (203) | Garden view/Lift/Paid parking off/Superhost | – | 135.5 | – | 150.5 | 155.5 (20 Nov 160.5) | 160.5 |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.03 | 4 | 4.64 (14) | Lift | – | 150 | – | – | – | – |
| **Comp median (n)** | | | | | n/a (0) | **145** (5) | n/a (0) | **150.5** (3) | **155.5** (3) | **160.5** (3) |
| **Band median (n)** | | | | | 150 (1) | 145 (9) | 228.75 (2) | 176 (6) | 156.25 (6) | 160.5 (5) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings (Airbnb only).
- **P04 comp set is below the 6-comp minimum in practice:** only 4 of 7 stored comps were returned on any stay. 985683261536682900, 1733027244747346716 and 1387112821878102742 have now been unreturned for 2 days on every stay. They are kept as booked, not inactive, so no comp was replaced. Christmas stored n = 1-2 per stay; band n = 2-6. If they stay unreturned, replacements should be added from the band.
- **Why 1455 is closed on the other booked nights but open on 21-24 Nov:** NOT VERIFIED. It may be a manual block or calendar import on 1455 that does not cover the current stay.
- **Why PriceLabs moved P04 20 Dec (-£19) and 6-19 Dec (-1 to -5):** `get_user_logs` shows only Reyhan's 23-26 Dec edits. NOT VERIFIED.
- **P04 Christmas Airbnb strikethrough** (about 8-15% off "original") and **P12 30 Nov-3 Dec Airbnb all-in below the room price**: causes NOT VERIFIED (channel agent).
- **Kept as booked, not inactive** (not returned on any stay today):
  - P01 852256049507701872 and 1418178473526356202.
  - P09 1501211872839579235 and 958156921765583815.
  - P15 1371771992549776701.
  - January was not re-checked.
- P04 2 Dec (£449, +200% min 1; deprioritised in policy) and 4-10 Jan were not priced against comps.
- P01 cleaning £149 is carried from earlier sections, not re-read today.
- Comp cancellation policies, band-listing sleeps and current lift/view/parking: NOT CHECKED today (carried from 25 Oct-15 Nov reads).
- **Smoobu was not called.** Room prices are PriceLabs `prices.csv`. 21 Nov room values come from the 20 Nov file (today's file starts 22 Nov).
- NL percentiles: PriceLabs does not state the horizon, and the basis is a host-only fee on 1-3BR (P04, P01) or 2-3BR (P12). Read them as market bands, not like-for-like. The P12 `final_price` in `get_neighbourhood_data` (311/268/282/285/297) differs by up to £1 from `prices.csv` (310/268/283/286/296).
