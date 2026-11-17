# Competitor positioning: EAST batch (D = 2026-11-17)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy `intentional_blocks`). Not analysed.
- **P15** has no listing of ours. Reference only.
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec, P09 26 Nov, P12 13 Dec).

**Method** (same as 26 Oct-16 Nov; scripts in the scratchpad `east17/bin`)
- **Comp ids:** same set as 16 Nov (`data/snapshots/2026-11-16/comps.csv`): P01 11, P04 7, P09 6, P12 7, P15 7. **No comp replaced today.**
  - P04 1387112821878102742 is again not returned on any stay, now including the 10 Christmas-NYE stays. It is kept: the 15 Nov sweep showed it bookable on 7 of 10 January-February stays (booked, not inactive).
  - P09 958156921765583815 is again not returned on any stay. It is kept; P09 has no open night before its 26 Nov handback, so it affects no positioning.
  - P12 29297702 still shows a placeholder-like price (about £1,031-1,045/n). It stays out of the medians.
- **Access:** public Airbnb pages (HTTP 200). I ran 107 wide searches, then 575 comp/stay checks in a 0.3 km box (marked `*` in the tables), then 24 availability checks on our two Barking listings. Box sizes: 2.5 km for P04, 1.8 km for P09, 1.3 km for the rest. 4 guests for 2BR, 3 for 1BR. **Booking.com: NOT CHECKED.**
- **Price basis = what guests see:** the Airbnb **guest-paid all-in total / nights**. This is after discounts, with cleaning and Airbnb fees **included**; no separate taxes are shown. Our listings are priced the same way. PriceLabs, Smoobu and `reservations.csv` figures are **room only, cleaning excluded** (Airbnb cleaning: P12 £150, P04 £142, P01 £149, from `reservations.csv` cleaning_gbp). On stays of 7+ nights, our all-in includes the 15% weekly discount (policy `length_of_stay_discounts`). Comps show their own discounts.
- **Stays (same dates for comps and us):**
  - Default stays: next Fri-Sun **20-22 Nov**, midweek Tue-Thu **24-26 Nov (new; 17-19 Nov started today)**, 30 days out **17-19 Dec (new)**.
  - Trend stays: 24-27 Nov, 1-3, 4-6, 7-9, 8-10, 9-11, 10-12, 11-13, 12-14, 13-15, 14-16, 15-17 and 16-18 Dec.
  - Key-date stays:
    - **P04, Christmas-NYE (new):** 20-27 Dec, 27 Dec-2 Jan, 31 Dec-2 Jan, 20 Dec-2 Jan (the 13 cancelled nights), 21-24 Dec, 23-27 Dec, 28 Dec-2 Jan, 27 Dec-3 Jan, 31 Dec-5 Jan.
    - P04, other: 18-20 Nov and the 6-20 Dec runs (6-9, 9-12, 11-14, 14-17, 17-20, 6-13).
    - P12: 17-20, 18-20, 17-21 and 18-21 Nov; 26-27 Nov; 30 Nov-3 Dec, 30 Nov-4 Dec and 2-4 Dec.
    - P01: 18-21, 18-20 and 19-21 Dec.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius, excluding ours. The P04 band is also shown with the 5-unit 1531... operator collapsed to one listing ("op").
- **Data written:** `data/snapshots/2026-11-17/comps.csv` did not exist. Under `flock` on `.comps.csv.lock` I copied 16 Nov forward (27,779 lines) and **appended 1,433 rows** (29,212 lines):
  - 809 `comp-east` rows: every stored comp x stay, with NOT RETURNED rows kept.
  - 444 `east-refband` rows.
  - 180 `east-ours` rows: Airbnb all-in rows for ours and the unsynced P04 listing (including the 24 availability checks); Smoobu room rows with the 17 Nov raw PriceLabs `price`/`user_price`/`uncustomized_price`/status; and the cancelled P04 stay.
  - None of the `east-ours` or `east-refband` rows are comps.
- **PriceLabs (read-only, one call at a time):** `get_user_logs` (listing, 16-17 Nov) returned **0 entries**. `get_listing_date_overrides` for P04 and P12: OK. `get_neighbourhood_data` for P04 (summary + detail), P12 (detail) and P01 (summary): OK first try. Daily market percentiles were saved to the scratchpad (`east17/dl/nd_P04_detail.json`, `nd_P12_detail.json`).
- **Smoobu: not called.** Smoobu prices come from `prices.csv` (17 Nov) and stays from `reservations.csv` (17 Nov).

## What changed since 16 Nov (this batch)
**1. P04 Christmas-NYE 20 Dec-2 Jan reopened (13 nights; Booking.com stay cancelled, `reservations.csv` 17 Nov, room £2,417.34 = £185.95/n). It is bookable again on the synced Airbnb listing, but PriceLabs still treats it as booked.**
- **Airbnb, synced listing 1657859794156786222 (Smoobu-fed): open.** Bookable today:

  | Stay | Total | Per night all-in |
  |---|---|---|
  | 20-27 Dec | £1,151 (pre-discount £1,372) | £164.43 |
  | 21-24 Dec | £664 | £221.33 |
  | 23-27 Dec | £860 | £215 |
  | 28 Dec-2 Jan | £1,081 | £216.20 |
  | 27 Dec-3 Jan | £1,295 | £185 |
  | 31 Dec-5 Jan | £958 | £191.60 |
  | whole 20 Dec-2 Jan | £2,159 | £166.08 |

  - Airbnb's nightly line (195.91 for 20-27 Dec) matches the PriceLabs `price` average 195.1, so Smoobu holds the 16 Nov push (189-241).
  - The 20-27 Dec Airbnb stay works out at about **£144/n room** after the weekly discount (£1,151 - £142 cleaning, over 7 nights, assuming no guest-side fee). The cancelled stay paid **£185.95/n**.
- **PriceLabs: stale.**
  - Raw `prices_3562176.json` (last refreshed **16 Nov 09:43:29Z**) still shows 20 Dec-1 Jan as `Booked`, `user_price` -1.
  - `get_neighbourhood_data` `upcoming_bookings` still lists the cancelled stay (ADR 185, booked 20 Oct) on every night.
  - PriceLabs will not price these nights as open until it registers the cancellation, so the prices and min stays on the channels stay frozen at the 16 Nov push.
  - `prices_with_default_customization` is 217-342 against `price` 187-241 on these nights. Policy: Smoobu is the truth.
- **Min stays on the reopened nights:**
  - Overrides: -5% with min 3 on 20-22 Dec, min 4 on 23-26 Dec, **min 7 on 27 Dec**, **min 5 on 28-31 Dec**, and 1 Jan -2% with min 4.
  - Airbnb enforces them: 24-27 Dec (3 n), **27 Dec-2 Jan (6 n)**, 29 Dec-2 Jan (4 n) and **31 Dec-2 Jan (2 n)** are not bookable.
- **Unsynced Barking Airbnb 1455876748739910219:** not returned on any of the 10 Christmas-NYE stays checked (also not 21-24 or 24-27 Dec). **No double-booking exposure on the reopened nights from that listing.**
- **Effect** (Smoobu truth; my sellable-night count, valid runs only):
  - Next 30 days (17 Nov-16 Dec): unchanged at 14 booked of 27 = **52%** (market 24%, `pl_kpis.csv`).
  - Next 60 days (17 Nov-15 Jan): **14 of 57 = 25%**, down from about 27 of 57 = 47% with the stay.
  - `pl_kpis.csv` occupancy_next_60 **0.48** still counts the cancelled nights.
  - Pickup: **-13 nights / -£2,417.34 room.**
  - Who cancelled and why: NOT CHECKED.

**2. P04 unsynced listing 1455876748739910219 is still bookable on 20-24 Nov at £742**, the nights sold on the synced listing on 14 Nov. Also open: 18-21 £571, 20-23 £589, 21-24 £585 (16 Nov £539), 22-25 £531, and the six 6-20 Dec runs. **t-p04-doublebook: not fixed, day 18.**

**3. P04 December fell again with no edit** (`get_user_logs` empty; refresh 16 Nov 09:43Z).
- 6-15 Dec moved from 152/151/150/150/153/160/163/151/145/148 to **144/142/142/142/145/152/154/144/137/141** (-5%).
- **16 Dec fell from 179 to 143 (-20%).** It is now 29 days out: the third day running with the 30-day-edge step (Booking Recency Factor suspected; NOT VERIFIED).
- December is now **-24% to -33% vs comps.**

**4. P12 prices rose with no edit** (`get_user_logs` empty; raw refreshed 16 Nov 09:40Z).
- 18-19 Nov: 255/265 -> **268/268**.
- 20 Nov: 310 -> 296.
- 26 Nov: 301 -> **307**.
- 30 Nov-3 Dec: 255/285/287/294 -> **253/270/299/308**.
- The uncustomized price on 18 Nov is only 209. This partly reverses the -4% Reyhan made on 15 Nov.

**5. P01 18-20 Dec is still `Blocked`** (raw refreshed 17 Nov 04:22:59Z). Prices are now 280/277/246 (were 276/270/239).

**6. Comp moves of £10 or more (same comp, same stay):**
- P01 1418178473526356202: 1-3 Dec 390 -> 372.50; 15-17 Dec +£10.50; 16-18 Dec +£10.50.
- P04 1577633201778145138: 15-17 Dec 262.50 -> 275; 16-18 Dec 250 -> 262.50.
- P09 1376679869251315227: 7-9 Dec 180 -> 190.
- P12 1383544079404594066: 16-18 Dec 296.50 -> 282.
- P15: five moves of -£16 to -£19.50 on 1-3 and 15-18 Dec.
- 199 of 262 like-for-like comp/stay prices are within £1 of 16 Nov.

## PriceLabs market percentiles (`get_neighbourhood_data`, 17 Nov)
These are market bands, not comps. "Ours" is the PriceLabs room `price` (`prices.csv` 17 Nov). The summary table is for the 2BR category. The daily series is for the compset PriceLabs applies (P04: NL 1-3BR, 187 listings; P12: NL 2-3BR, 135 listings). The horizon and cleaning basis are not stated.

| Ref | 2BR summary P25 / P50 / P75 / P90 (n) | Market occ 30 / 60 (`pl_kpis.csv`) | Ours vs 2BR summary | Ours vs daily market (stay-average P25/P50/P75/P90) |
|---|---|---|---|---|
| P04 | 139 / 175 / 215 / 260 (89) | 24% / 19% | 18-19 Nov £168.5 P45. **6-15 Dec £144.3 P29**; 6-19 Dec £153.6 P35. **20-26 Dec £195.1 P63**; **27 Dec-1 Jan £227.8 P79** | 18-20 Nov 124/151/210/272: P57. 6-13 Dec 126/160/206/272: P40 (-9%). 14-17 Dec: P37 (-10%). 17-20 Dec: P63. **20-27 Dec 137/169/218/288: P63 (+15%)**. 23-27 Dec: P63. **27 Dec-2 Jan 137/177/226/300: P75 (+29%)**. **31 Dec-2 Jan 139/176/222/288: P78 (+35%)** |
| P12 | 172 / 207 / 233 / 291 (118) | 43% / 33% | **18-19 Nov £268 P84**; 18-20 Nov £277.3 P86; **26 Nov £307 >P90**; **30 Nov-3 Dec £282.5 P88** | 18-20 Nov 167/197/244/309: P81. 20 Nov: P86. **26 Nov 172/200/241/308: P90**. 30 Nov-4 Dec 172/215/260/314: P81 |
| P01 | 218 / 267 / 341 / 437 (144) | 34% / 28% | **18-20 Dec (blocked) £267.7: P50** | not pulled |

- `occ_insights` P04: market 27-31 Dec +19.8%, 3-5 Dec +10.2%. `fp_insights` P04: 26-31 Dec prices +10.4%.
- P12: 26-31 Dec prices +18.9%; occupancy 28 Dec-1 Jan +20.3%.
- P01: 27-31 Dec prices +28.9%; occupancy 27 Dec-1 Jan +18.7%.

## Priority 1: P04 Barking
- **Quality:** `quality_premium` = **-0.15** (the cap). We are 4.2 from 10 reviews; the comp median is 4.83 from 27 (a gap of 17 reviews). **Supported position: -15% to 0% vs the comp/band median.**
- Overrides now (`get_listing_date_overrides`):
  - 17 Nov: min 2.
  - **18-19 Nov: +10%, min 2.**
  - 20-24 Nov: -5%, min 3.
  - 25 Nov: +15%, min 2.
  - 26-30 Nov and 3-5 Dec: -8%.
  - 1 Dec: -2%, min 4.
  - 2 Dec: +200%, min 1.
  - **6-22 Dec: -5%, min 3.**
  - **23-26 Dec: -5%, min 4.**
  - **27 Dec: -5%, min 7.**
  - **28-31 Dec: -5%, min 5.**
  - 1 Jan: -2%, min 4.
  - 2-5 Jan: -8%, min 3.

### Christmas-NYE (reopened)

| Stay | Ours, Airbnb all-in £/n | PriceLabs `price` (status) | Stored median (n), vs | Band median (n) / op, vs | Pctl in band | Supported room £/n | Daily market pctl |
|---|---|---|---|---|---|---|---|
| **20-27 Dec (7 n)** | **164.43** (£1,151) | 189-204, avg 195.1 (`Booked`, stale) | 230.36 (2), -28.6% | **216.86 (5)** / 214.29, **-24.2%** | P20 | 216-254 (includes the 15% weekly) | P63 |
| 21-24 Dec (3 n) | 221.33 | 193/187/200 | 241 (2), -8.2% | 218.67 (7) / 222, **+1.2%** | P57 | 165-194 = **in range** | n/a |
| 23-27 Dec (4 n) | 215 | 200/204/198/195 | 243.63 (2), -11.7% | 228 (6), **-5.7%** | P33 | 180-211 = **in range** | P63 |
| 24-27 Dec (3 n) | not bookable (min 4) | 204/198/195 | | | | | |
| **27 Dec-2 Jan (6 n)** | **not bookable (27 Dec min 7)** | 208-241, avg 227.8 | 252.50 (1) | 253.50 (2) | n/a | n/a | P75 |
| 28 Dec-2 Jan (5 n) | 216.20 | 228-241 | 254 (1), -14.9% | 257.10 (2), -15.9% | P0 | 234-276 (n = 2) | n/a |
| 27 Dec-3 Jan (7 n) | 185 | 208-241, 194 | 249 (1), -25.7% | 232.22 (2), -20.3% | P0 | 238-280 (n = 2; includes the 15% weekly) | n/a |
| **31 Dec-2 Jan (2 n)** | **not bookable (31 Dec min 5)** | 241/231 | n/a (0) | **228.50 (2)**: 192.50 / 264.50 | n/a | n/a (policy min 3) | P78 |
| 31 Dec-5 Jan (5 n) | 191.60 | 241/231/194/173/168 | 254 (1), -24.6% | 215.80 (3), -11.2% | P33 | 193-227 | n/a |
| **20 Dec-2 Jan (13 n)** | **166.08** (£2,159) | avg 210.2 | 246.08 (1), -32.5% | 216.54 (2), -23.3% | P0 | 233-274 (includes the 15% weekly) | P69 |

"Supported room" = all-in band median (operator-collapsed) x 0.85-1.00, converted back to room with each stay's own all-in/room ratio. Approximate.

- **The comp market is largely booked over Christmas.** 5 of 7 stored P04 comps are not returned on any Christmas-NYE stay. Only 1193087690344044898 (£246-260/n) and 593405916827094880 (£212-231/n) are priced.
- **Supported positioning:**
  - **3-4 night Christmas stays (21-24, 23-27 Dec): hold.** They sit at -6% to +1% vs the band, inside the -15% to 0% the rating supports. The PriceLabs room is P63 of the daily market.
  - **7+ night stays (20-27 Dec, 27 Dec-3 Jan, 20 Dec-2 Jan) are -20% to -24% vs the band.** That gap is mostly the 15% weekly discount, which is a standing decision. Raising the nightly to close it would push the 3-4 night stays above range, so **no nightly change is supported for 20-26 Dec.**
  - **27 Dec-1 Jan: hold the price.** The evidence is split: Airbnb all-in is -11% to -16% vs the band on the 5-night stays, but n = 2-3. The PriceLabs room is P75-P79 of the daily market (+29% to +35% vs its median).
  - **The binding constraint is the min stay, not the price.** Min 7 on 27 Dec and min 5 on 28-31 Dec block every 2-4 night NYE stay and the 6-night 27 Dec-2 Jan. Comps sell 31 Dec-2 Jan at £192.50-264.50. Policy allows min 3 (never fewer). **Whether to drop 27-31 Dec to min 3-4 is for Corentin.** This is a min-stay question, not a price change.
  - **First fix the PriceLabs state.** Until PriceLabs registers the cancellation, any PriceLabs-side change to these nights will not reach the channels. This is for the PriceLabs auditor / Corentin.
- **`recommend`, 31-60 day window** (17 Dec-15 Jan; Smoobu 0 of 30 sellable booked vs market 19%): comp P0 (8 stays) and NL P57 both give **fix-listing (0%)**. Read as "no cut": the window holds 13 nights that were reopened one day ago.

### 18-19 Nov and 6-19 Dec

| Stay | Ours, Airbnb all-in £/n | PriceLabs `price` = Smoobu (16 Nov) | Stored median (n), pctl, vs | Band median / op (n), vs | Pctl in band | Supported room £/n |
|---|---|---|---|---|---|---|
| **18-20 Nov (2 n)** | **193.50** (£387) | 167/170 (166/168) | 225 (1), P0, -14.0% | 208 / 203.75 (6), **-7.0% / -5.0%** | P50 | 151-177 = **in range** |
| **6-9 Dec** | 156.67 | 144/142/142 (152/151/150) | 222 (3), P0, **-29.4%** | 230 / 214.34 (9), -31.9% / -26.9% | P11 | **166-195** |
| **9-12 Dec** | 159.33 | 142/145/152 | 222 (3), P0, -28.2% | 235 / 222 (8), -32.2% / -28.2% | P0 | **173-204** |
| 11-14 Dec | 162.33 | 152/154/144 | 214 (2), P0, -24.1% | 222 / 214.34 (5), -26.9% / -24.3% | P0 | 168-198 |
| **14-17 Dec** | 161.33 | **137/141/143** (145/148/179) | 240.34 (4), P0, **-32.9%** | 230 / 235.84 (9), -29.9% / -31.6% | P11 | **174-205** |
| 17-20 Dec | 216.67 | 182/188/194 | 241 (2), P0, -10.1% | 228 (8), -5.0% | P12 | 168-198 = in range |
| 6-13 Dec (7 n) | 128 | 142-154 | 186.50 (2), P0, -31.4% | 181.22 / 155.43 (6), -29.4% / -17.6% | P0 | 151-177 |

- **18-19 Nov: hold.** At -5% to -7% vs the band it is inside the supported range. The stored comp is n = 1. **The min stay 2 remains a policy conflict (Corentin).**
- **6-16 Dec: about +20% is supported** (room about £170-180, from 137-154). The gap widened again overnight (-24% to -33%) because PriceLabs cut 5% while comps held (0.0% like-for-like change on every December stay). Yesterday the supported move was +15%. **16 Dec: about +20%** (143 -> about £172).
- **17-19 Dec: hold** (-5% to -10%).
- **`recommend`, 30-day window** (17 Nov-16 Dec; Smoobu 52% vs market 24%): comp P0 over 6 stays gives **raise +10%**; NL P31 gives **raise +10%**. **Adopted for 6-16 Dec at the larger size above**, because the comp gap exceeds the formula step.
- **For Corentin to confirm (standing-decision conflicts, not proposals):**
  - P04 18-19 Nov min 2 vs the min-3 rule.
  - Policy -8% on 1-25 Nov vs PriceLabs +10% on 18-19 Nov and -5% on 20-24 Nov.
  - 2 Dec (+200%, £364) is deprioritised in policy and not raised.

## Priority 2: P12 Mile End (17-20 Nov, 26 Nov, 30 Nov-3 Dec)
- **Quality:** `quality_premium` = **-0.15** (the cap). We are 4.27 from 15 reviews; the stored-comp median is 4.86 from 19 (a gap of 4). **Supported position: band median x 0.85-1.00 (-15% to 0%).**

| Stay | Ours, Airbnb all-in £/n | PriceLabs `price` = Smoobu (16 Nov) | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room | Move vs PriceLabs |
|---|---|---|---|---|---|---|
| 17-20 Nov (3 n, check-in today) | 272.33 | 248*/268/268 | 264.50 (4), P50, +3.0% | 250.67 (3), P67, +8.6% | 221-260 | -17% to -3% |
| **18-20 Nov** | **268** (£536) | **268/268** (255/265) | 254 (5), **P60, +5.5%** | 254 (3), P67, +5.5% | 216-254 | **-19% to -5%** |
| 18-21 Nov (3 n) | 262.33 | 268/268/296 | 255.67 (5), P60, +2.6% | 240.34 (2), P100, +9.2% | 230-270 | -17% to -3% (**in range**) |
| 17-21 Nov (4 n) | 267 | 248*/268/268/296 | 247.75 (3), P67, +7.8% | 233.25 (2), P100, +14.5% | 219-257 | -21% to -7% |
| **26-27 Nov (1 n)** | **360** | **307** (301; +15%, min 1) | 282 (5), **P100, +27.7%** | 283 (2), P100, +27.2% | **204-240** | **-33% to -22%** |
| **30 Nov-3 Dec** | **259.67** | 253/270/299 (255/285/287) | 236.33 (15), P67, **+9.9%** | 237.84 (6), P67, +9.2% | 212-249 | **-23% to -9%** |
| 30 Nov-4 Dec | 253.75 | 253/270/299/308 | 230 (15), P67, +10.3% | 243.75 (5), P60, +4.1% | 218-256 | -23% to -9% |
| 1-3 Dec (trend) | 280.50 | 270/299 | 245.75 (10), **P80, +14.1%** | 245.75 (4), P75, +14.1% | 212-249 | -26% to -12% |
| **2-4 Dec** | **295** | **299/308** (287/294) | 240.50 (11), **P91, +22.7%** | 254 (3), P100, +16.1% | 210-247 | **-31% to -18%** |

\* 17 Nov PriceLabs `final_price` 248 (from `get_neighbourhood_data`; 17 Nov is not in `prices.csv`).

- **The overnight PriceLabs rise (no edit) moved P12 away from the comps.**
- **18-19 Nov: trim about -8% (room about £245).** 18-20 Nov is +5.5% vs the band (P60); NL is P84.
- **Hold 20 Nov.** The 3- and 4-night stays (+2.6% to +7.8%) are in or near range.
- **26 Nov: room about £205-240, keep min 1.** At £307 room / £360 all-in it is P100, +28% vs the band (n = 5), and NL is >P90. **t-p12-26nov-price not fixed; worse (+£6).**
- **30 Nov-3 Dec:**
  - 30 Nov: hold (253).
  - **1 Dec: about -5%** (270 -> about £255).
  - **2-3 Dec: about -12%** (299/308 -> about £265-270). 2-4 Dec is +22.7% (P91) and 1-3 Dec +14.1% (P80).
- **`recommend`, 30-day window** (17 Nov-16 Dec): comp P75 over 9 stays and booked 69% vs market 43% give a mechanical **raise +5%**; NL P88 gives **raise +5%**.
  - **Not adopted.** The occupancy lead comes from nights already sold. The open 1- and 2-night stays are +5% to +28% above the band against a quality ceiling of 0%, and the raise branch of `recommend` ignores a negative `quality_premium`.
  - 31-60 day window: no sellable night (handback).

## Priority 3: P01 Bowsprit Point 18-20 Dec (blocked, before the 20 Dec handback)
- **Still blocked.** The 17 Nov raw (refreshed 04:22:59Z) shows 18-20 Dec `Blocked` at 280/277/246, min 3. Airbnb does not return our listing for 18-21, 18-20 or 19-21 Dec. There is no P01 entry in `get_user_logs`. **t-p01-1820block: not fixed.**
- **Comps:**
  - 18-21 Dec (3 n, all-in): stored median **£369.67** (n = 7, range 282.33-524); band **£345** (n = 13).
  - 18-20 Dec: stored £376 (3), band £430.25 (6).
  - 19-21 Dec: stored £366.50 (3), band £366.50 (5).
- **If reopened** at 280/277/246 (£803; NL 2BR P50), plus £149 cleaning, it would be **£317.33/n before any Airbnb guest fee**: **P29 of the stored set (-14.2%)** and **-8.0% vs the band**.
- **Supported: parity (0%).** `quality_premium` = 0.0 (4.75 from 4 reviews is under the 5-review threshold; the comp median is 4.8 from 30). Today's price is already below the comp median, so no cut is needed. Up to about +8% (band parity) is supported.
- **For Corentin to confirm (carried policy conflict):** policy `handbacks` says "before the date, maximise revenue normally", but the block holds about £803 of room nights.

## Priority 4: P09 Torrent Lodge
- **No open night before the 26 Nov handback.** Nothing to position. 2-night comp median is £168 (20-22 and 24-26 Nov, n = 3). `quality_premium` = 0.0 (5.0 from 3 reviews; comp median 4.56). `recommend`: raise-signal.

## Summary per property
| Ref | Ours | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 31-60 vs market | `recommend` 30 / 31-60 | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (18-20 Dec blocked) | stored 282-452 (n 1-7); 18-21 Dec 369.67 (7) | n/a (would be P29 stored / -8% band) | 4.75 vs 4.8 | 4 vs 30 (-26) | 0.0 (<5 reviews) | 100% / 100% vs 34% / 28% | raise-signal | **parity** if reopened (today's price is -8% to -14%: supported) |
| P04 (synced 1657...) | 18-20 Nov 193.50; Dec 128-216.67; **Christmas 164.43-221.33** | stored 186.50-254 (n 1-4); band 181-257 (n 2-9) | P0 stored; P0-P57 band | **4.2** vs 4.83 | 10 vs 27 (-17) | -0.15 | 52% / 0% (Smoobu, 13 n reopened) vs 24% / 19% | raise +10% / fix-listing 0%; NL P31 / P57 | **-15% to 0%.** 18-19 Nov hold. **6-16 Dec about +20%**; 17-19 Dec hold. **Christmas 20-26 Dec hold; 27 Dec-1 Jan hold the price, review min 7/5 (Corentin)**; fix the PriceLabs booked state first |
| P04 unsynced 1455... | 177-231.67 (Nov runs 176.95-196.20, Dec 184.43-231.67); **bookable on sold 20-24 Nov (£742)**; not bookable at Christmas | | | 4.69 | 26 | n/a | | | map or unlist |
| P09 | no sellable night | 168-248.50 (n 1-5) | n/a | 5.0 vs 4.56 | 3 vs 25 (-22) | 0.0 | 100% vs 40% | raise-signal | nothing to position before the handback |
| P12 | open 253.75-360 all-in | band 230-282; stored 233-283 | P50-P100 (median P67) | 4.27 vs 4.86 | 15 vs 19 (-4) | -0.15 | 69% vs 43% | mechanical raise +5% (P75, 9 stays); NL raise +5% (P88): **not adopted** | **-15% to 0% vs band.** **18-19 Nov -8%; 26 Nov -22% to -33%; 1 Dec -5%; 2-3 Dec -12%.** Hold 20 Nov and 30 Nov |
| P15 | no listing of ours | 135-167.50 (n 1-6) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 17 Nov)
| Item | Status |
|---|---|
| **P04 Christmas-NYE reopened** | **New.** Open on synced Airbnb at the 16 Nov rates (189-241 room). PriceLabs still `Booked` (stale). Min 7/5 blocks NYE stays of 2-6 nights. Booking.com NOT CHECKED. |
| t-p04-doublebook | **Not fixed** (day 18). 1455 bookable on 20-24 Nov at £742. Not bookable at Christmas. |
| P04 min-3 rule | Conflict persists: 18-19 Nov min 2 (Reyhan, 15 Nov). For Corentin. |
| P04 December (a-p04-dec-1611) | **Worse:** -5% overnight, 16 Dec -20%. Supported move now about +20% on 6-16 Dec (was +15%). |
| a-p12-trim | **Reversed in part:** PriceLabs rose with no edit (18 Nov +5%, 2-3 Dec +4-5%). Open: 18-19 Nov -8%, 1 Dec -5%, 2-3 Dec -12%. |
| t-p12-26nov-price | **Not fixed** (£307 room / £360 all-in, P100). |
| t-p01-1820block | **Not fixed** (still `Blocked`). For Corentin. |
| Push freshness | P01 17 Nov 04:22:59Z; P12 16 Nov 09:40:16Z; P04 16 Nov 09:43:29Z (raw `last_refreshed_at`). |

## Critical / high findings
- **CRITICAL: P04 Christmas-NYE (20 Dec-1 Jan, 13 nights) is open on Airbnb, but PriceLabs still treats it as booked.** It shows `Booked`, `user_price` -1, and the cancelled stay in `upcoming_bookings`; last refresh was 16 Nov 09:43Z. The nights sell at the frozen 16 Nov rates and min stays, and PriceLabs changes will not reach them until it registers the cancellation.
- **CRITICAL: P04 unsynced Airbnb 1455876748739910219 is bookable on 20-24 Nov (£742)**, the nights already sold on the synced listing (day 18).
- **HIGH (for Corentin): P04 NYE min stays.** Min 7 on 27 Dec and min 5 on 28-31 Dec block 27 Dec-2 Jan and every 2-4 night NYE stay. Comps sell 31 Dec-2 Jan at £192.50-264.50. Policy allows min 3.
- **HIGH: P04 Christmas pricing.** 3-4 night stays are in range (hold). 7+ night stays are -20% to -24% vs the band because the 15% weekly discount (standing) stacks: the Airbnb room is about £144/n vs £185.95/n on the cancelled stay. No nightly change is supported.
- **HIGH: P04 6-16 Dec is -24% to -33% vs comps after another PriceLabs cut** (16 Dec -20% at the 30-day edge). **About +20% is supported.**
- **HIGH (for Corentin): P04 18-19 Nov min 2** vs policy min 3. The price is in range.
- **HIGH (for Corentin): P01 18-20 Dec still blocked.** Reopened at today's price it would be -8% to -14% vs comps; about £803 of room nights are held.
- **MEDIUM: P12 rose overnight with no edit.**
  - 18-19 Nov is +5.5% vs the band (P60; NL P84): about -8% is supported.
  - **26 Nov is +28% (P100)**: room about £205-240 is supported.
  - 2-4 Dec is +22.7% (P91): about -12% on 2-3 Dec is supported.

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-17.
- "16 Nov x" = the same comp and stay on 16 Nov, where the two differ by more than £1.
- `*` = found by the 0.3 km second pass.
- Full source for every row: `data/snapshots/2026-11-17/comps.csv` (`comp-east`, `east-refband`, `east-ours`).
- Cancellation policy: NOT CHECKED.
- "not bookable on any stay today" for P04 1387112821878102742 means booked through December and over Christmas (bookable in January, 15 Nov sweep).

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 17 Dec-19 Dec | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 15 Dec-17 Dec | 16 Dec-18 Dec | 18 Dec-21 Dec | 18 Dec-20 Dec | 19 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 320 | – | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 390 (16 Nov 387) | 395 | 274 | 378.33 | 355 | 452 | 324 | 299 | 282 | 282 | 339 | 332 | 262 | 267 | 285 | 267 | 316.33 (16 Nov 319.67) | 332 | 325 (16 Nov 330) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.45 (159) | none listed | – | 175.50 | – | 177 (16 Nov 179.33) | 189.50 | – | 198 | 199 | 204 | – | – | – | – | 208 | 208 | 208 | – | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (57) | Lift | – | – | – | 293.33 | – | – | – | – | – | – | – | – | – | – | – | – | 383.67 (16 Nov 378) | – | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.6 (30) | Lift/River view/balcony | – | – | – | 255 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | – | 382.67 | – | – | – | – | – | – | – | – | – | – | – | – | 382.67 | – | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | – | – | 372.50 (16 Nov 390) | – | – | 385.50 | – | – | – | – | 392.50 | 392.50 | 392.50 (16 Nov 382) | 382 (16 Nov 371.50) | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | 306 | 358.50 | 305.67 | 328 | – | – | – | – | – | 386 | 363.50 | 341 | 341 | 341 | 341 | 369.67 | 376 | 366.50 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.82 (17) | Lift | – | – | – | – | 280 | – | 335 | 335 | – | – | – | – | – | – | 335 | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (43) | Lift/Private patio or balcony/Superhost/Guest favourite (added 4 Nov, replaces inactive 20404597) | – | 315.50 | 500 | – | – | – | 405.50 | 405.50 | 405.50 | 439 | – | – | 472* | 472 | 472 | 472 | 524 | 528 | 534 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | – | 281 | – | – | – | – | – | – | – | – | – | – | – | – | 282.33 (16 Nov 281) | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.8 (30) | | **390** (1) | **310.75** (4) | **358.50** (3) | **293.33** (7) | **328** (5) | **452** (1) | **329.50** (4) | **335** (5) | **282** (3) | **360.50** (2) | **362.50** (2) | **347.75** (2) | **366.75** (4) | **341** (5) | **338** (6) | **341** (5) | **369.67** (7) | **376** (3) | **366.50** (3) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.2 (10); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 17 Dec-19 Dec | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 15 Dec-17 Dec | 16 Dec-18 Dec | 18 Nov-20 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec | 20 Dec-27 Dec | 27 Dec-2 Jan | 31 Dec-2 Jan | 20 Dec-2 Jan | 23 Dec-27 Dec | 21 Dec-24 Dec | 28 Dec-2 Jan | 27 Dec-3 Jan | 31 Dec-5 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | – | 257.67 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 258.67 | 260 | – | 249 | 252.50 | – | 246.08 | 256.25 | 260 | 254 | 249 | 254 |
| [985683261536682900](https://www.airbnb.co.uk/rooms/985683261536682900) | 0.61 | 5 | 4.82 (17) | Paid street parking off premises/Superhost (added 15 Nov, replaces inactive 1083936003491396261) | 225 | 225 | – | 225 | – | 225 | – | – | – | – | – | – | – | – | – | – | 225 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (28) | Free parking on premises/Superhost/Guest favourite | – | 131.50 | – | 130 (16 Nov 138.67) | – | – | – | – | – | – | – | – | – | – | 138.50 (16 Nov 146.50) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.76 (41) | Free parking on premises/Superhost (added 30 Oct) | – | 250 | 250 | 248.33 | – | – | 250 | 250 | 250 | 250 | – | – | – | 262.50 | 275 (16 Nov 262.50) | 262.50 (16 Nov 250) | – | 248.33 | 248.33 | – | 265 (16 Nov 256.67) | – | – | – | – | – | – | – | – | – | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | – | – | 222 | – | 222 | – | 222 | 222 | 222 | 222 | 222 | 222 | 222 | 222 | 222 | 222 | – | 222 | 222 | 222 | 222 | 222 | 207 | 211.71 | – | – | – | 231 | 222 | – | – | – |
| [1387112821878102742 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 | 6 | 4.85 (27) | Parking (in name) (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (17) | Free on-street parking/Superhost | – | 198 | – | 181.33 | 210 | – | 216 | 216 | 216 | 221.50 | 227 | 220.50 | 214 | 214 | 214 | – | – | 198 | 203 | 206 | 197.33 | – | 166 | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **193.50** | **156.67** | **159.33** | **162.33** | **161.33** | **216.67** | **128** | **164.43** | not bookable | not bookable | **166.08** | **215** | **221.33** | **216.20** | **185** | **191.60** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | 187.33 | 188 | 201.67 | 219.67 | 231.67 | 184.43 | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.83 (27) | | **225** (1) | **211.50** (4) | **236** (2) | **225** (5) | **216** (2) | **225** (1) | **222** (3) | **222** (3) | **222** (3) | **222** (3) | **224.50** (2) | **221.25** (2) | **218** (2) | **222** (3) | **218** (4) | **242.25** (2) | **225** (1) | **222** (3) | **222** (3) | **214** (2) | **240.34** (4) | **241** (2) | **186.50** (2) | **230.36** (2) | **252.50** (1) | n/a (0) | **246.08** (1) | **243.62** (2) | **241** (2) | **254** (1) | **249** (1) | **254** (1) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | P0 (-14.0%) | P0 (-29.4%) | P0 (-28.2%) | P0 (-24.1%) | P0 (-32.9%) | P0 (-10.1%) | P0 (-31.4%) | P0 (-28.6%) | – | – | P0 (-32.5%) | P0 (-11.7%) | P0 (-8.2%) | P0 (-14.9%) | P0 (-25.7%) | P0 (-24.6%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 17 Dec-19 Dec | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 15 Dec-17 Dec | 16 Dec-18 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 168 (16 Nov 166) | 168 | 168 | – | – | – | 168 (16 Nov 164) | 168 (16 Nov 164) | 168 (16 Nov 164) | 168 (16 Nov 164) | 168 (16 Nov 164) | 168 (16 Nov 164) | 169 (16 Nov 164) | 169 (16 Nov 164) | 168 (16 Nov 164) | 168 (16 Nov 164) |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 165 (16 Nov 161) | 165 | 165.50 | – | – | – | 165 (16 Nov 161) | 165 (16 Nov 161) | 165 (16 Nov 161) | 165 (16 Nov 161) | 165 (16 Nov 161) | 165 (16 Nov 161) | 165 (16 Nov 161) | 165 (16 Nov 161) | 165 (16 Nov 161) | 165.50 (16 Nov 162) |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.7 (23) | none listed | – | – | 189 | – | 147.50 (16 Nov 140) | – | 190 (16 Nov 180) | 186 (16 Nov 179) | – | – | – | – | 171 (16 Nov 163) | 166 (16 Nov 158) | 165 | 174 |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | 200.50 | 200.50 | 248.50 | 196.67 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | – | – | – | 206 (16 Nov 202.50) | – | – | – | – | – | – | – | 202.50 (16 Nov 198) | 213 (16 Nov 209) | 214.50 (16 Nov 210) | 211 (16 Nov 207.50) |
| [958156921765583815 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.56 (25.0) | | **168** (3) | **168** (3) | **178.50** (4) | **196.67** (1) | **206** (3) | **248.50** (1) | **179** (4) | **177** (4) | **168** (3) | **168** (3) | **168** (3) | **168** (3) | **171** (5) | **169** (5) | **168** (5) | **174** (5) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 17 Dec-19 Dec | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 15 Dec-17 Dec | 16 Dec-18 Dec | 17 Nov-20 Nov | 18 Nov-20 Nov | 17 Nov-21 Nov | 18 Nov-21 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 2 Dec-4 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.50 | 237.50 | 237.50 | 225 | 237.50 | – | 242.50 (16 Nov 237.50) | 242.50 (16 Nov 237.50) | 242.50 (16 Nov 237.50) | 240 (16 Nov 237.50) | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 225 | 237.50 | 218.75 | 225 | – | 225 | – | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking on premises | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 316.67 | 312.50 | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (79) | Superhost | – | – | – | 182.67 (16 Nov 184.67) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 191.33 (16 Nov 192.67) | 198.50 | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.94 (16) | Superhost/Guest favourite | – | 150 | – | 150 | 220 | – | 220 | 220 | 220 | – | – | – | 215 | – | – | – | – | – | – | – | – | 208.33 | 211.25 | 220 |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (121) | Superhost/balcony/Guest favourite | – | 254 | – | 250.67 | 254 | – | – | – | – | – | – | – | – | – | – | – | 250.67 | 254 | 247.75 | 255.67 | 284 | 250.67 | 243.75 | 254 |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | 1035 | 1035 | 1035 | 1032.33 | 1035 | 1035 | 1035 | 1035 (16 Nov 1045) | 1035 (16 Nov 1045) | 1035 | 1035 | 1035 | 1035 | 1035 (16 Nov 1037.50) | 1035 (16 Nov 1037.50) | 1035 | – | 1035 | – | 1032.33 | 1043 | 1032.33 | 1031 | 1035 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | – | 282 | 306 | 282 | 282 | – | 288.50 (16 Nov 285) | 284 (16 Nov 282) | 286.50 (16 Nov 284) | 299.50 (16 Nov 296) | 309 | 297 | 283 | 282 | 282 | 282 (16 Nov 296.50) | 282 | 282 | – | – | 282 | 282 | 283.50 | 285 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | **280.50** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **272.33** | **268** | **267** | **262.33** | **360** | **259.67** | **253.75** | **295** |
| **Comp median (n)** | | | 4.86 (19) | | **237.50** (1) | **245.75** (4) | **271.75** (2) | **225** (5) | **245.75** (4) | n/a (0) | **242.50** (3) | **242.50** (3) | **242.50** (3) | **269.75** (2) | **273.25** (2) | **267.25** (2) | **237.50** (3) | **259.75** (2) | **259.75** (2) | **259.75** (2) | **250.67** (3) | **254** (3) | **233.25** (2) | **240.33** (2) | **283** (2) | **237.83** (6) | **243.75** (5) | **254** (3) |
| **Our pctl (vs median)** | | | | | – | – | – | – | P75 (+14.1%) | – | – | – | – | – | – | – | – | – | – | – | P67 (+8.6%) | P67 (+5.5%) | P100 (+14.5%) | P100 (+9.2%) | P100 (+27.2%) | P67 (+9.2%) | P60 (+4.1%) | P100 (+16.1%) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 17 Dec-19 Dec | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Dec-16 Dec | 15 Dec-17 Dec | 16 Dec-18 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 205.50 | – | 154 (16 Nov 170.50) | – | – | – | – | – | – | – | 170.50 | 170.50 | 170.50 | 170.50 (16 Nov 190) |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 161.50 (16 Nov 179) | 166 (16 Nov 184) |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | – | 135 | 147.50 | 135 | 135 | – | 135 | 135 | 135 | 147.50 | 160 | 147.50 | 135 | 135 | 135 | 135 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | 170.50 | – | 162.67 (16 Nov 159.67) | – | – | – | – | 167.50 | 167.50* | 167.50 | 167.50 | 167.50 | 167.50 | 167.50 | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.92 (25) | Free parking on premises/Guest favourite | – | 145 | 181 | – | 163 (16 Nov 181) | – | 181 | – | – | – | – | – | – | 181 | 181 | 181* |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (202) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | – | 135.50 | 150.50* | – | 140.50 | – | – | – | – | – | – | – | 145.50 | 140.50 | 140.50 | 140.50 |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | 150 | – | 146.67 | – | – | – | – | – | – | – | – | – | – | – | – |
| **Comp median (n)** | | | 4.84 (14) | | n/a (0) | **145** (5) | **165.75** (4) | **146.67** (3) | **147.25** (4) | n/a (0) | **158** (2) | **135** (1) | **151.25** (2) | **157.50** (2) | **163.75** (2) | **157.50** (2) | **156.50** (4) | **167.50** (5) | **164.50** (6) | **166** (5) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings (Airbnb only). This includes whether P04's reopened 20 Dec-1 Jan nights are open on Booking.com, and at what price.
- **P04 cancellation:** who cancelled and why: NOT CHECKED (Smoobu not called). Why PriceLabs still holds the stay as booked: NOT VERIFIED (sync timing vs the 16 Nov 09:43Z refresh suspected; for the PriceLabs auditor). The ~£144/n Airbnb room figure for 20-27 Dec assumes there is no Airbnb guest-side fee.
- **P04 Christmas comps are thin:** stored n = 0-2 per stay (5 of 7 comps booked), band n = 2-7. The 27 Dec-2 Jan, 28 Dec-2 Jan, 27 Dec-3 Jan and 31 Dec-2 Jan medians rest on n = 1-3. PriceLabs daily percentiles are for a 1-3BR compset, not 2BR only.
- Comp cancellation policies and band-listing sleeps: NOT CHECKED. Lift, view and parking come from listing-page reads on 25 Oct-15 Nov.
- **Smoobu was not called.** Smoobu prices come from `prices.csv` 17 Nov and stays from `reservations.csv` 17 Nov. Smoobu availability on the reopened nights is inferred from the Smoobu-synced Airbnb listing being bookable.
- **P04 December:** the cause of the repeated 30-day-edge cuts (Booking Recency Factor suspected) is NOT VERIFIED. The 18-20 Nov range rests mainly on the band (stored n = 1).
- **P12:** stored n 2-6 per stay; band n 3-15. The 26 Nov 1-night stay has band n = 5. The cause of the overnight PriceLabs rise (no logged edit) is NOT VERIFIED.
- P01 listing coordinates are missing from the 0.3 km pass. Our P01 listing was checked in the wide search only (not returned: blocked).
- P09 958156921765583815 and P04 1387112821878102742 were not returned on any stay today. Both are kept (see Method); no comp was replaced.
- NL percentiles: PriceLabs does not state the horizon or cleaning basis. Read them as market bands, not like-for-like.
