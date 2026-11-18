# Competitor positioning: EAST batch (D = 2026-11-18)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy `intentional_blocks`). Not analysed.
- **P15** has no listing of ours. Reference only.
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec, P09 26 Nov, P12 13 Dec).

**Method** (same as 26 Oct-17 Nov; scripts rebuilt today in the scratchpad `east18/bin`, because the container rebuild removed yesterday's scratch files)
- **Comp ids:** the same set as 17 Nov, taken from `reports/2026-11-17/sections/comp-east.md` (the 17 Nov `comps.csv` no longer exists): P01 11, P04 7, P09 6, P12 7, P15 7. **No comp replaced today.**
  - P04 1387112821878102742 is again not returned on any of the 19 stays. It is kept: the 15 Nov sweep showed it bookable on 7 of 10 January-February stays (booked, not inactive). January was not re-checked today.
  - P12 29297702 still shows a placeholder-like price (£1,031-1,043/n). It stays out of the medians (written with a blank `nightly_gbp`, price in `source`).
  - P01 1418178473526356202: no coordinates from today's pages, so the 0.3 km check was not run. It was not in the wide search on any stay: **NOT CHECKED** on 5 stays.
- **Access:** public Airbnb pages (HTTP 200). I ran 40 wide searches (with pagination), then 161 comp/stay checks in a 0.3 km box (5 could not run, no coordinates). Box sizes: 2.5 km for P04, 1.8 km for P09, 1.3 km for the rest. 4 guests for 2BR, 3 for 1BR. **Booking.com: NOT CHECKED.**
- **Price basis = what guests see:** the Airbnb **guest-paid all-in total / nights**. This is after discounts, with cleaning and Airbnb fees **included**; no separate taxes are shown. Our listings are priced the same way. PriceLabs/Smoobu figures (`prices.csv` 18 Nov) are **room only, cleaning excluded**. Stays of 7+ nights include the 15% weekly discount (policy). Comps show their own discounts.
- **Stays (same dates for comps and us; checked 2026-11-18 07:3x-08:0xZ):**
  - Default stays: next Fri-Sun **20-22 Nov**, midweek Tue-Thu **24-26 Nov**, 30 days out **18-20 Dec (new; was 17-19 Dec)**.
  - Key-date stays:
    - P04 Christmas-NYE: 20-27 Dec, 21-24 Dec, 23-27 Dec, 28 Dec-2 Jan, 31 Dec-2 Jan, 27 Dec-2 Jan, 20 Dec-2 Jan, 27 Dec-3 Jan, 31 Dec-5 Jan.
    - P04, other: 20-24 Nov; the 6-20 Dec runs (6-9, 9-12, 11-14, 14-17, 17-20, 6-13).
    - P12: 18-20 and 18-21 Nov; 26-27 Nov; 30 Nov-3 Dec, 30 Nov-4 Dec, 1-3 Dec and 2-4 Dec.
    - P01: 18-20, 18-21 and 19-21 Dec.
  - **Dropped today:** the 13 December trend stays (1-3 Dec ... 16-18 Dec) for P01/P09/P15, and P04 18-20 Nov (check-in today). Trend comparison uses the 95 comp/stay pairs that match 17 Nov.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius, excluding ours and per-night prices above £1,000 (placeholders). For P04 the 1531... operator's units are collapsed into one listing ("op"); band figures below are op-collapsed.
- **"Supported room"** = band median x 0.85-1.00 (the `quality_premium` range), converted back to room with each stay's own Airbnb all-in / PriceLabs room ratio. Approximate.
- **Data written:** `data/snapshots/2026-11-18/comps.csv` (header already there, written by another agent). Under `flock` on `.comps.csv.lock` I **appended 639 rows**:
  - 297 `comp-east` rows (ref = P01/P04/P09/P12/P15): every stored comp x stay, with NOT RETURNED / NOT CHECKED rows kept with a blank price.
  - 249 `east-refband` rows (ref = `Pxx:band`).
  - 93 `east-ours` rows (ref = `Pxx:ours`): Airbnb all-in rows for ours and the unsynced P04 listing, and PriceLabs room rows (nightly list and status in `source`).
  - Band and ours rows use a `Pxx:band` / `Pxx:ours` ref so that `positioning.comp_summary` (which takes every row of a ref) counts only comps.
- **PriceLabs (read-only, one call at a time):** `get_user_logs` (listing; P01, P04, P09, P12; 17-18 Nov) returned **0 entries**. `get_listing_date_overrides` P04: OK, unchanged from 17 Nov. `get_neighbourhood_data` detail for P04, P12 and P01: OK. Saved to the scratchpad (`east18/dl/nd_P04_detail.json`, `nd_P12_detail.json`, `nd_P01_detail.json`).
- **Smoobu: not called.** Room prices come from `prices.csv` (18 Nov). P12 18 Nov (not in `prices.csv`) is the PriceLabs `final_price` 225 from `get_neighbourhood_data`.

## What changed since 17 Nov (this batch)
**1. PriceLabs now has P04 Christmas-NYE (20 Dec-1 Jan) as open, and repriced it down (no logged edit).**
- `get_neighbourhood_data` `upcoming_bookings` no longer lists the cancelled stay. `pl_kpis` occupancy_next_60 is **0.25** (was 0.48). PriceLabs room (`prices.csv` 18 Nov): 162/162/159/169/173/167/165/175/192/193/194/201/194 = **£2,306** (16 Nov push in Smoobu: £2,733, -15.6%). Min stays unchanged (3/3/3/4/4/4/4/7/5/5/5/5/4; overrides unchanged since 20 Oct).
- **The new prices are live on the synced Airbnb listing** 1657859794156786222:

  | Stay | 17 Nov all-in £/n | 18 Nov all-in £/n (total) | Change |
  |---|---|---|---|
  | 20-27 Dec (7 n) | 164.43 | **142.29** (£996; weekly discount -£187.43) | -13.5% |
  | 21-24 Dec (3 n) | 221.33 | **194.33** (£583; Airbnb shows "originally £703", "recently lowered") | -12.2% |
  | 23-27 Dec (4 n) | 215 | **187.25** (£749) | -12.9% |
  | 28 Dec-2 Jan (5 n) | 216.20 | **186.20** (£931; "Long stay discount" -£87.66) | -13.9% |
  | 27 Dec-3 Jan (7 n) | 185 | **158.71** (£1,111) | -14.2% |
  | 31 Dec-5 Jan (5 n) | 191.60 | **165.80** (£829) | -13.5% |
  | 20 Dec-2 Jan (13 n) | 166.08 | **141.85** (£1,844) | -14.6% |
  | 27 Dec-2 Jan, 31 Dec-2 Jan | not bookable | not bookable (27 Dec min 7; 31 Dec min 5) | |

- The unsynced Barking listing 1455876748739910219 is still not bookable on any Christmas-NYE stay.
- On 28 Dec-2 Jan Airbnb applies a **"Long stay discount" of 8.6% on a 5-night stay** (£87.66 of £1,018.60). The policy discounts are 7+ nights 15% and 28+ nights 20%. Its origin (Airbnb or Smoobu rule) is NOT VERIFIED. This is for the channel agent.

**2. P04 unsynced 1455876748739910219 is still bookable on 20-24 Nov at £742** (£185.50/n), the nights sold on the synced listing. **t-p04-doublebook: not fixed, day 19.** It is also open on all six 6-20 Dec runs (£184-232/n).

**3. P04 17-19 Dec fell 15-20% overnight (no edit):** 182/188/194 -> **146/159/164**. 18 Dec is now 30 days out: the fourth day running with the 30-day-edge step (Booking Recency Factor suspected; NOT VERIFIED). 6-16 Dec moved by -1 to -2 (143/141/141/140/144/151/153/143/136/140/143).

**4. P12 fell overnight (no logged edit; PriceLabs refreshed 18 Nov 06:43Z):**
- 18-19 Nov: 268/268 -> **225/234** (-16% / -13%).
- 26 Nov: 307 -> **294** (-4%).
- 30 Nov-3 Dec: 253/270/299/308 -> **244/268/263/268** (2-3 Dec -12% / -13%).
- This delivers most of yesterday's a-p12-trim on 18-19 Nov and 2-3 Dec. 26 Nov and 1 Dec are still above the band.

**5. P01 18-20 Dec is still `Blocked`** (`prices.csv` 18 Nov; PriceLabs refreshed 04:07Z). Prices are now 279/276/245 (were 280/277/246).

**6. Comp moves of £10 or more (same comp, same stay):**
- P01 41905186: 20-22 Nov 390 -> 430. 1005647070760859698: 18-21 Dec 320 -> 348.33. 1467264633617185891: 24-26 Nov 175.50 -> 192.50.
- P12 1383544079404594066: +£10-27 on every 26 Nov-4 Dec stay (26-27 Nov 282 -> 298; 2-4 Dec 285 -> 312).
- 77 of 95 like-for-like comp/stay prices are within £1 of 17 Nov. No P04 comp moved by £10 or more.

## PriceLabs market percentiles (`get_neighbourhood_data`, 18 Nov)
Market bands, not comps. "Ours" is the PriceLabs room price. The daily series is the compset PriceLabs applies (P04: NL 1-3BR, 187 listings; P12: NL 2-3BR, 135; P01: NL 1-3BR, 284). Basis "Host-only fee"; the horizon is not stated. Percentiles interpolated between P25/P50/P75/P90.

| Ref | 2BR summary P25 / P50 / P75 / P90 (n) | Market occ 30 / 60 (`pl_kpis`) | Ours vs daily market (stay average P25/P50/P75/P90) |
|---|---|---|---|
| P04 | 138 / 174 / 214 / 265 (89) | 23% / 19% | 20-24 Nov £167.8: P56. **6-20 Dec £146.0 (126/159/206/261): P40, -8%**. 17-20 Dec £156.3: P45. **20-27 Dec £165.3 (136/169/215/286): P47, -2%** (17 Nov P63). 21-24 Dec: P50. 23-27 Dec: P45. **28 Dec-2 Jan £194.8 (136/176/225/299): P59, +11%** (27 Dec-2 Jan: 17 Nov P75). 31 Dec-2 Jan £197.5: P62 (17 Nov P78). 20 Dec-2 Jan £177.4: P53 |
| P12 | 172 / 206 / 232 / 291 (119) | 42% / 33% | **18-20 Nov £229.5 (166/194/244/307): P68, +18%** (17 Nov P81). **26 Nov £294 (167/199/242/307): P87, +48%**. 30 Nov-3 Dec £258.3: P76. 1-3 Dec £265.5: P77. 2-4 Dec £265.5: P75 |
| P01 | 218 / 267 / 340 / 427 (144) | 34% / 28% | **18-20 Dec (blocked) £277.5 (200/235/315/461): P63**; 18-21 Dec £266.7: P60 |

- `fp_insights` P04: 27-31 Dec market prices +10.4%. `occ_insights` P04: 28-31 Dec occupancy +21.9%, 3-5 Dec +10.4%.

## Priority 1: P04 Barking
- **Quality:** `quality_premium(4.2, 4.83)` = **-0.15** (the cap). We are 4.2 from 10 reviews; the comp median is 4.83 from 27 (a gap of 17 reviews). **Supported position: -15% to 0% vs the band median.**
- Overrides (`get_listing_date_overrides`): unchanged from 17 Nov (18-19 Nov +10% min 2; 20-24 Nov -5% min 3; 6-22 Dec -5% min 3; 23-26 Dec -5% min 4; 27 Dec -5% min 7; 28-31 Dec -5% min 5; 1 Jan -2% min 4).

### Christmas-NYE at £2,306

| Stay | Ours, Airbnb all-in £/n | PriceLabs room | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n | Daily market pctl |
|---|---|---|---|---|---|---|---|
| **21-24 Dec (3 n)** | **194.33** | 162/159/169, avg 163.3 | 241 (2), -19.4% | **222 (5), -12.5%** | P20 | 159-187 = **in range** (-3% to +14%) | P50 |
| **23-27 Dec (4 n)** | **187.25** | 169/173/167/165, avg 168.5 | 243.62 (2), -23.1% | **228 (5), -17.9%** | P20 | **174-205** (+3% to +22%) | P45 |
| **28 Dec-2 Jan (5 n)** | **186.20** | 192/193/194/201/194, avg 194.8 | 254 (1), -26.7% | **252.60 (2), -26.3%** | P0 | **225-264** (+15% to +36%; n = 2) | P59 |
| 31 Dec-5 Jan (5 n) | 165.80 | 201/194/164/146/142 | 254 (1), -34.7% | 208 (3), -20.3% | P0 | 181-213 (+7% to +25%) | n/a |
| 20-27 Dec (7 n) | 142.29 | avg 165.3 | 230.36 (2), -38.2% | 214.29 (4), -33.6% | P0 | 212-249 (includes the 15% weekly) | P47 |
| 27 Dec-3 Jan (7 n) | 158.71 | avg 187.6 | 249 (1), -36.3% | 229.07 (2), -30.7% | P0 | 230-271 (includes the 15% weekly) | n/a |
| 20 Dec-2 Jan (13 n) | 141.85 | avg 177.4 | 246.08 (1), -42.4% | 215.04 (2), -34.0% | P0 | 229-269 (includes the 15% weekly) | P53 |
| 31 Dec-2 Jan (2 n) | not bookable (31 Dec min 5) | 201/194 | n/a (0) | 220.50 (2): 192.50 / 248.50 | | n/a (policy min 3) | P62 |
| 27 Dec-2 Jan (6 n) | not bookable (27 Dec min 7) | avg 191.5 | 252.50 (1) | 249.50 (2) | | | P58 |

- **The comp market is still largely booked.** As on 17 Nov, only 1193087690344044898 (£246-260/n) and 593405916827094880 (£207-231/n) of the 7 stored comps are priced on Christmas-NYE stays. Band n = 2-5.
- **Like for like the repricing cut 12-15% from what guests pay, while comps held** (both priced comps within £1 of 17 Nov on every Christmas stay). Yesterday the 3-4 night stays were -6% to +1% vs the band (in range). Today they are -12.5% and -17.9%, and the 5-night NYE stay is -26%.
- **Supported positioning:**
  - **20-22 Dec: hold** (162/162/159). 21-24 Dec at -12.5% is inside the -15% to 0% range.
  - **23-26 Dec: about +10%** (169/173/167/165 -> about £185-190). 23-27 Dec is -17.9%, just below the range; the supported room is £174-205.
  - **27 Dec-1 Jan: about +15%** (175-201 -> about £200-230). 28 Dec-2 Jan is -26% (supported £225-264), but n = 2. The PriceLabs market (P59-P62, +9% to +13% vs median) argues for the lower end. That is why +15% and not +25%.
  - **Total:** about **£2,545** for 20 Dec-1 Jan (+£240, +10%), still about £190 below the 16 Nov level (£2,733).
  - **7+ night stays stay below the band (-31% to -34%).** Most of that is the standing 15% weekly discount. No nightly change beyond the above is supported.
  - **The PriceLabs market reads "at median"** (P45-P62). This is a 1-3BR, host-only-fee compset. For a 4.2-rated 2BR it supports a hold, not a cut. **Neither source supports going lower than today.**
- **Min stays (for Corentin, carried):** min 7 on 27 Dec and min 5 on 28-31 Dec still block 27 Dec-2 Jan and every 2-4 night NYE stay. The band sells 31 Dec-2 Jan at £192.50-248.50. Policy allows min 3 (never fewer).
- **`recommend`, 31-60 day window** (18 Dec-16 Jan):
  - On PriceLabs 60-day occupancy (25% vs market 19%), with comp P0 and quality -0.15: **raise +5%**.
  - On Smoobu 31-60 (0 sellable nights booked) vs market 19%: fix-listing (0%).
  - Read with the comp evidence: **raise, at the sizes above.**

### 20-24 Nov and 6-19 Dec

| Stay | Ours, Airbnb all-in £/n | PriceLabs room (17 Nov) | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n |
|---|---|---|---|---|---|---|
| 20-24 Nov (sold) | not bookable; **unsynced 1455 bookable at 185.50 (£742)** | 168/171/167/165 (booked) | 239.50 (2) | 231.25 (4) | | |
| **6-9 Dec** | 156.00 | 143/141/141 (144/142/142) | 222 (3), **-29.7%** | 214.33 (6), -27.2% | P17 | **165-195** (+17% to +38%) |
| **9-12 Dec** | 158.33 | 140/144/151 | 222 (3), -28.7% | 222 (5), -28.7% | P0 | **173-203** (+19% to +40%) |
| 11-14 Dec | 161.33 | 151/153/143 | 214 (2), -24.6% | 214.33 (4), -24.7% | P0 | 168-198 (+13% to +33%) |
| **14-17 Dec** | 154.33 | 136/140/143 | 239.84 (4), **-35.7%** | 239.83 (6), -35.7% | P17 | **184-217** (+32% to +55%) |
| **17-20 Dec** | **188.33** (17 Nov 216.67) | **146/159/164** (182/188/194) | 241 (2), -21.9% | 232 (5), **-18.8%** | P20 | **164-193** (+5% to +23%) |
| 6-13 Dec (7 n) | 127.14 | 140-153 | 186.50 (2), -31.8% | 155.43 (5), -18.2% | P0 | 151-177 (includes the weekly) |

- **6-16 Dec: about +20% is supported** (room about £170-175, from 136-153). This is unchanged from 17 Nov; the gap is -25% to -36% vs comps, and comps did not move.
- **17-19 Dec: about +10%** (146/159/164 -> about £160-180). Yesterday this was "hold" at 182-194. The 30-day-edge cut moved it below the range overnight.
- **`recommend`, 30-day window** (18 Nov-17 Dec; PriceLabs occupancy 50% vs market 23%): comp P0 gives **raise +10%**. **Adopted at the larger size above** (+20% on 6-16 Dec), because the comp gap exceeds the formula step.
- **For Corentin to confirm (standing-decision conflicts, not proposals):**
  - P04 18-19 Nov min 2 vs the min-3 rule (19 Nov still min 2 in `prices.csv`).
  - Policy -8% on 1-25 Nov vs the PriceLabs +10% on 18-19 Nov and -5% on 20-24 Nov (unchanged).

## Priority 2: P12 Mile End
- **Quality:** `quality_premium(4.27, 4.86)` = **-0.15** (the cap). We are 4.27 from 15 reviews; the stored-comp median is 4.86 from 19 (a gap of 4). **Supported position: band median x 0.85-1.00 (-15% to 0%).**

| Stay | Ours, Airbnb all-in £/n | PriceLabs room (17 Nov) | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room | Move vs PriceLabs |
|---|---|---|---|---|---|---|
| **18-20 Nov** (check-in today) | **258** (17 Nov 268) | **225/234** (268/268) | 245.75 (4), P75, **+5.0%** | 245.75 (2), P100, +5.0% | 186-219 | **-19% to -5%** |
| 18-21 Nov (3 n) | 265 | 225/234/299 | 255.67 (3), P67, +3.6% | 240.33 (2), P100, +10.3% | 207-244 | -18% to -4% |
| **26-27 Nov (1 n)** | **350** (17 Nov 360) | **294** (307; +15%, min 1) | 284 (5), **P100, +23.2%** | 291 (2), P100, +20.3% | **203-239** | **-31% to -19%** |
| **30 Nov-3 Dec** | **247.67** (259.67) | 244/268/263 (253/270/299) | 227.67 (15), P60, **+8.8%** | 237.83 (6), P50, +4.1% | 202-237 | **-22% to -8%** |
| 30 Nov-4 Dec | 237 (253.75) | 244/268/263/268 | 227 (14), P57, +4.4% | 270.38 (4), P25, -12.3% | 212-250 | -19% to -4% |
| **1-3 Dec** | **266** (280.50) | 268/263 | 237.50 (9), P67, **+12.0%** | 245.75 (4), P75, +8.2% | 201-237 | **-24% to -11%** |
| 2-4 Dec | 266 (295) | 263/268 (299/308) | 230.25 (10), P70, +15.5% | 254 (3), P67, +4.7% | 195-230 | -26% to -13% |

- **The overnight PriceLabs cut (no edit) moved P12 back towards the band.** But every open stay is still at or above the band median, against a quality ceiling of 0%.
- **19 Nov: about -5%** (234 -> about £222). 18-20 Nov is +5.0% (band n = 4). 18 Nov is check-in today.
- **26 Nov: room about £205-240, keep min 1.** At £294 room / £350 all-in it is P100, +23% vs the band, and PriceLabs NL is P87. **t-p12-26nov-price not fixed** (improved by £13).
- **30 Nov: hold (244). 1 Dec: about -8% (268 -> about £245). 2-3 Dec: about -5%** (263/268 -> about £250-255). 2-3 Dec already fell 12-13% overnight; 2-4 Dec is still +15.5% vs the band (P70).
- **`recommend`, 30-day window** (PriceLabs occupancy 73% vs market 42%; comp P67 median over 7 stays): mechanical **raise +10%**. **Not adopted.** The lead comes from nights already sold. The open stays are +4% to +23% above the band against a quality ceiling of 0%, and the raise branch of `recommend` ignores a negative `quality_premium`. 31-60 day window: no sellable night (handback 13 Dec).

## Priority 3: P01 Bowsprit Point 18-20 Dec (blocked, before the 20 Dec handback)
- **Still blocked.** `prices.csv` 18 Nov: 18-20 Dec `Blocked` at 279/276/245, min 3. Airbnb does not return our listing for 18-20, 18-21 or 19-21 Dec. There is no P01 entry in `get_user_logs`. **t-p01-1820block: not fixed.**
- **Comps:**
  - 18-21 Dec (3 n, all-in): stored median **£369.67** (n = 7, range 281-524); band **£345** (n = 13).
  - 18-20 Dec: stored £376 (3), band £430.25 (6).
  - 19-21 Dec: stored £366.50 (3), band £366.50 (5).
- **If reopened** at 279/276/245 (£800; PriceLabs NL P60), plus £149 cleaning, it would be **£316.33/n before any Airbnb guest fee**: **-14.4% vs the stored median** and **-8.3% vs the band** (18-21 Dec).
- **Supported: parity (about 0%).** `quality_premium(4.75, 4.8)` = -0.02, on only 4 reviews. Today's price is already below the comps, so no cut is needed. Up to about +8% (band parity) is supported.
- **For Corentin to confirm (carried policy conflict):** policy `handbacks` says "before the date, maximise revenue normally", but the block holds about £800 of room nights.

## Priority 4: P09 Torrent Lodge
- **No open night before the 26 Nov handback** (20-22 and 24-26 Nov not bookable). Nothing to position.
- 2-night comp median £166.50-168 (n = 2-3). `quality_premium(5.0, 4.56)` = +0.15, on only 3 reviews. `recommend`: raise-signal (100% vs market 40%).

## Summary per property
| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market (`pl_kpis`) | `recommend` | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (18-20 Dec blocked) | stored medians 310.75-430 (n 1-7); 18-21 Dec 369.67 (7) | n/a (would be -14% stored / -8% band) | 4.75 vs 4.8 | 4 vs 30 (-26) | -0.02 (4 reviews) | 100% / 100% vs 34% / 28% | raise-signal | **parity** if reopened (today's price is -8% to -14%: supported) |
| P04 (synced 1657...) | Dec 127-188; **Christmas 141.85-194.33** | stored 186.50-254 (n 1-4); band op 155-253 (n 2-6) | P0 stored; P0-P20 band | **4.2** vs 4.83 | 10 vs 27 (-17) | -0.15 | 50% / 25% vs 23% / 19% | 30 d: raise +10%; 31-60: raise +5% (PriceLabs occ) / fix-listing (Smoobu 31-60) | **-15% to 0%.** **6-16 Dec about +20%; 17-19 Dec about +10%. Christmas: 20-22 Dec hold, 23-26 Dec about +10%, 27 Dec-1 Jan about +15% (total about £2,545)**; NYE min 7/5 for Corentin |
| P04 unsynced 1455... | 184.43-231.67 (Dec runs); **bookable on sold 20-24 Nov (£742)**; not bookable at Christmas | | | 4.69 | 26 | n/a | | | map or unlist |
| P09 | no sellable night | 166.50-168 (n 2-3) | n/a | 5.0 vs 4.56 | 3 vs 25 (-22) | +0.15 (3 reviews) | 100% vs 40% | raise-signal | nothing to position before the handback |
| P12 | open 237-350 | band 227-284; stored 238-291 | P57-P100 band (median P67) | 4.27 vs 4.86 | 15 vs 19 (-4) | -0.15 | 73% / 87% vs 42% / 33% | mechanical raise +10% (P67): **not adopted** | **-15% to 0% vs band.** **19 Nov -5%; 26 Nov -19% to -31%; 1 Dec -8%; 2-3 Dec -5%.** Hold 30 Nov |
| P15 | no listing of ours | 145-160.50 (n 3-5) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 18 Nov)
| Item | Status |
|---|---|
| **P04 Christmas-NYE (t-p04-xmas-1711)** | **PriceLabs fixed** (open; cancelled stay gone from `upcoming_bookings`; occ_60 0.25). **Repriced to £2,306 (-15.6%) and live on Airbnb (-12% to -15% all-in). Now below the comp band on 23 Dec-1 Jan:** about +10% (23-26 Dec) and +15% (27 Dec-1 Jan) are supported. Min 7/5 unchanged. Booking.com NOT CHECKED. |
| t-p04-doublebook | **Not fixed** (day 19). 1455 bookable on 20-24 Nov at £742. Not bookable at Christmas. |
| P04 min-3 rule | Conflict persists: 19 Nov min 2. For Corentin. |
| P04 December (a-p04-dec-1611) | 6-16 Dec unchanged (-1 to -2); **17-19 Dec cut 15-20% overnight.** Supported: +20% on 6-16 Dec, +10% on 17-19 Dec. |
| a-p12-trim | **Largely done by PriceLabs itself** (18-19 Nov -13% to -16%, 2-3 Dec -12% to -13%; no logged edit). Remaining: 19 Nov -5%, 1 Dec -8%, 2-3 Dec -5%. |
| t-p12-26nov-price | **Not fixed** (£294 room / £350 all-in, P100, +23% vs band). |
| t-p01-1820block | **Not fixed** (still `Blocked`). For Corentin. |
| Push freshness | P01 18 Nov 04:07Z; P12 18 Nov 06:43Z; P04 17 Nov 09:09Z (`listings.csv` `last_push`). |

## Critical / high findings
- **CRITICAL: P04 unsynced Airbnb 1455876748739910219 is bookable on 20-24 Nov (£742)**, the nights already sold on the synced listing (day 19; check-in in 2 days).
- **HIGH: P04 Christmas-NYE repriced to £2,306 now sits below the comp band.** Airbnb all-in fell 12-15% overnight while both priced comps held. 21-24 Dec is -12.5% (in range), 23-27 Dec -17.9%, 28 Dec-2 Jan -26% (n = 2). **Supported: 20-22 Dec hold, 23-26 Dec about +10%, 27 Dec-1 Jan about +15%** (about £2,545 total). PriceLabs' own market reads P45-P62, so do not cut further.
- **HIGH (for Corentin): P04 NYE min stays.** Min 7 on 27 Dec and min 5 on 28-31 Dec block 27 Dec-2 Jan and every 2-4 night NYE stay. The band sells 31 Dec-2 Jan at £192.50-248.50. Policy allows min 3.
- **HIGH: P04 6-19 Dec is -19% to -36% vs comps.** 17-19 Dec was cut 15-20% overnight at the 30-day edge. **About +20% on 6-16 Dec and +10% on 17-19 Dec are supported.**
- **HIGH (for Corentin): P01 18-20 Dec still blocked.** Reopened at today's price it would be -8% to -14% vs comps; about £800 of room nights are held.
- **MEDIUM: P12 fell overnight with no edit and is now closer to the band.**
  - **26 Nov is still +23% (P100)**: room about £205-240 is supported.
  - 1-3 Dec is +12%: about -8% on 1 Dec is supported.
- **MEDIUM: P04 Airbnb applies an 8.6% "Long stay discount" on the 5-night 28 Dec-2 Jan stay** (-£87.66). The policy has no 5-night discount. Its origin is NOT VERIFIED; this is for the channel agent.

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-18.
- "17 Nov x" = the same comp and stay on 17 Nov, where the two differ by more than £1.
- `*` = found by the 0.3 km second pass (none today).
- "–" = not returned in the wide search or the 0.3 km box (booked or unavailable). P01 1418178473526356202 is NOT CHECKED in the box (no coordinates).
- km for comps not returned today is the 17 Nov value.
- Full source for every row: `data/snapshots/2026-11-18/comps.csv` (`comp-east`, `east-refband`, `east-ours`).
- Cancellation policy: NOT CHECKED. Differentiators come from listing-page reads on 25 Oct-15 Nov.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 18 Dec-20 Dec | 18 Dec-21 Dec | 19 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | 348.33 (17 Nov 320) | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 430 (17 Nov 390) | 395 | 327 (17 Nov 332) | 316.33 | 330 (17 Nov 325) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.45 (159) | none listed | – | 192.5 (17 Nov 175.5) | – | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (57) | Lift | – | – | – | 375 (17 Nov 383.67) | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 (17 Nov) | 6 | 4.6 (30) | Lift/River view/balcony | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking/River view/balcony | – | – | – | 382.67 | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 (17 Nov) | 6 | 4.95 (21) | Skyline view/Free parking/Lift/Superhost/balcony/Guest fav | – | – | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | 306 | 376 | 369.67 | 366.5 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 (17 Nov) | 4 | 4.82 (17) | Lift | – | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (43) | Lift/patio or balcony/Superhost/Guest fav | – | 315.5 | 528 | 524 | 534 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost | – | – | – | 281 (17 Nov 282.33) | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **430** (1) | **310.75** (4) | **376** (3) | **369.67** (7) | **366.5** (3) |
| **Band median (n)** | | | | | 330.5 (3) | 251.5 (13) | 430.25 (6) | 345 (13) | 366.5 (5) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.2 (10); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 18 Dec-20 Dec | 20 Nov-24 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec | 20 Dec-27 Dec | 21 Dec-24 Dec | 23 Dec-27 Dec | 28 Dec-2 Jan | 31 Dec-2 Jan | 27 Dec-2 Jan | 20 Dec-2 Jan | 27 Dec-3 Jan | 31 Dec-5 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | – | 254 | – | – | – | 257.67 | 260 | – | 249 | 260 | 256.25 | 254 | – | 252.5 | 246.08 | 249 | 254 |
| [985683261536682900](https://www.airbnb.co.uk/rooms/985683261536682900) | 0.61 | 5 | 4.82 (17) | Paid street parking/Superhost | 225 | 225 | – | 225 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (28) | Free parking/Superhost/Guest fav | – | 124 (17 Nov 131.5) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.76 (41) | Free parking/Superhost | – | 250 | – | – | 248.33 | 248.33 | – | 265 | – | – | – | – | – | – | – | – | – | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | – | – | 222 | – | 222 | 222 | 222 | 222 | 222 | 207 | 211.71 | 222 | 231 | – | – | – | – | – | – |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 (17 Nov) | 6 | 4.85 (27) | Parking (in name) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (17) | Free street parking/Superhost | – | 195 (17 Nov 198) | – | – | 198 | 203 | 206 | 197.33 | – | 166 | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | **156** | **158.33** | **161.33** | **154.33** | **188.33** | **127.14** | **142.29** | **194.33** | **187.25** | **186.2** | not bookable | not bookable | **141.85** | **158.71** | **165.8** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | **185.5** | **187.33** | **188** | **189.67** | **219.67** | **231.67** | **184.43** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **225** (1) | **210** (4) | **222** (1) | **239.5** (2) | **222** (3) | **222** (3) | **214** (2) | **239.84** (4) | **241** (2) | **186.5** (2) | **230.36** (2) | **241** (2) | **243.62** (2) | **254** (1) | n/a (0) | **252.5** (1) | **246.08** (1) | **249** (1) | **254** (1) |
| **Band median (n)** | | | | | 225 (1) | 225 (5) | 222 (3) | 231.25 (4) | 214.33 (6) | 222 (5) | 214.33 (4) | 239.83 (6) | 232 (5) | 155.43 (5) | 214.29 (4) | 222 (5) | 228 (5) | 252.6 (2) | 220.5 (2) | 249.5 (2) | 215.04 (2) | 229.07 (2) | 208 (3) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | P0 (-29.7%) | P0 (-28.7%) | P0 (-24.6%) | P0 (-35.7%) | P0 (-21.9%) | P0 (-31.8%) | P0 (-38.2%) | P0 (-19.4%) | P0 (-23.1%) | P0 (-26.7%) | – | – | P0 (-42.4%) | P0 (-36.3%) | P0 (-34.7%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 18 Dec-20 Dec |
|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 168 | 168 | 168 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 165 | 167 (17 Nov 165) | 165 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 (17 Nov) | 3 | 4.7 (23) | none listed | – | – | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest fav | – | 200.5 | 248.5 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 (17 Nov) | 3 | 4.27 (22) | none listed | – | – | – |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 (17 Nov) | 3 | 4.75 (16) | Skyline view/balcony | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **166.5** (2) | **168** (3) | **168** (3) |
| **Band median (n)** | | | | | 166.5 (2) | 150 (11) | 180.75 (8) |
| **Our pctl (vs comp median)** | | | | | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 18 Dec-20 Dec | 18 Nov-20 Nov | 18 Nov-21 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 1 Dec-3 Dec | 2 Dec-4 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.5 | 237.5 | 237.5 | 237.5 | 225 | – | 225 | – | 237.5 | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking | – | – | – | – | – | – | 316.67 | 312.5 | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (79) | Superhost | – | – | – | – | – | – | 196 (17 Nov 191.33) | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.94 (16) | Superhost/Guest fav | – | 150 | – | – | – | – | 208.33 | 211.25 | 220 | 220 |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (121) | Superhost/balcony/Guest fav | – | 254 | – | 254 | 255.67 | 284 | 250.67 | 243.75 | 254 | 254 |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1 | 6 | 4.54 (13) | Paid parking/balcony (placeholder price, excluded) | 1035 | 1038.5 (17 Nov 1035) | 1035 | – | – | 1043 | 1032.33 | 1031 | 1035 | 1035 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift | – | 282 | 319.5 | – | – | 298 (17 Nov 282) | 289 (17 Nov 282) | 297 (17 Nov 283.5) | 292.5 (17 Nov 282) | 312 (17 Nov 285) |
| **Ours** | | | | | not bookable | not bookable | not bookable | **258** | **265** | **350** | **247.67** | **237** | **266** | **266** |
| **Comp median (n)** | | | | | **237.5** (1) | **245.75** (4) | **278.5** (2) | **245.75** (2) | **240.33** (2) | **291** (2) | **237.83** (6) | **270.38** (4) | **245.75** (4) | **254** (3) |
| **Band median (n)** | | | | | 295 (2) | 225.5 (9) | 275.75 (8) | 245.75 (4) | 255.67 (3) | 284 (5) | 227.67 (15) | 227 (14) | 237.5 (9) | 230.25 (10) |
| **Our pctl (vs comp median)** | | | | | – | – | – | P100 (+5.0%) | P100 (+10.3%) | P100 (+20.3%) | P50 (+4.1%) | P25 (-12.3%) | P75 (+8.2%) | P67 (+4.7%) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 18 Dec-20 Dec |
|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 218 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 (17 Nov) | 4 | 4.93 (14) | Superhost/Guest fav | – | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.81 | 3 | 4.87 (15) | Paid parking/Superhost | – | 135 | 160 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.85 | 4 | 4.71 (14) | Lift/Paid parking | – | 167.5 (17 Nov 170.5) | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.84 | 4 | 4.92 (25) | Free parking/Guest fav | – | 145 | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (202) | Garden view/Lift/Paid parking off/Superhost | – | 135.5 | 160.5 |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.03 | 4 | 4.64 (14) | Lift | – | 150 | – |
| **Comp median (n)** | | | | | n/a (0) | **145** (5) | **160.5** (3) |
| **Band median (n)** | | | | | 150 (1) | 147.5 (10) | 160.25 (6) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings (Airbnb only). This includes whether P04's 20 Dec-1 Jan nights show the £2,306 prices on Booking.com.
- **P04 Christmas comps are thin:** stored n = 0-2 per stay (5 of 7 comps booked), band n = 2-5. The 28 Dec-2 Jan, 27 Dec-3 Jan, 31 Dec-2 Jan and 20 Dec-2 Jan medians rest on n = 1-3. PriceLabs daily percentiles are for a 1-3BR compset with a host-only-fee basis, not 2BR all-in.
- **P04 Airbnb price build-up:** the Airbnb nightly line does not equal PriceLabs room + £142 cleaning (for example 21-24 Dec: £583 shown vs £490 room + £142). The 8.6% 5-night "Long stay discount" has not been traced to its source. Room conversions use each stay's own all-in/room ratio.
- **Why PriceLabs cut P04 Christmas 15.6%, P04 17-19 Dec 15-20% and P12 4-16% overnight** (no `get_user_logs` entry): NOT VERIFIED. Re-pricing after the cancellation was registered and the Booking Recency Factor at the 30-day edge are suspected.
- **Trend coverage is smaller than 17 Nov:** 95 like-for-like comp/stay pairs (17 Nov: 262). The December trend stays for P01/P09/P15 and P04 18-20 Nov were not re-run.
- P01 1418178473526356202: no coordinates today, so the 0.3 km check did not run (5 stays NOT CHECKED). P04 1387112821878102742 was not returned on any of the 19 stays, and January was not re-checked; it is kept as booked, not inactive.
- No 0.3 km box check found a comp missed by the wide search today (0 of 156 run). The box method was verified on our own P04 listing (returned on 21-24 Dec).
- Comp cancellation policies, band-listing sleeps and current lift/view/parking: NOT CHECKED today (carried from 25 Oct-15 Nov reads).
- **Smoobu was not called.** Smoobu = PriceLabs per `prices.csv`; P12 18 Nov room (225) comes from PriceLabs `final_price`, not `prices.csv`.
- NL percentiles: PriceLabs does not state the horizon. Read them as market bands, not like-for-like.
