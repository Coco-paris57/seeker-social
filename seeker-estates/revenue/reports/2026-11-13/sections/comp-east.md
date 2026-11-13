# Competitor positioning: EAST batch (D = 2026-11-13)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy `intentional_blocks`). Not analysed.
- **P15** has no listing of ours. Reference only.
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec, P09 26 Nov, P12 13 Dec).

**Method** (same as 26 Oct-12 Nov; scripts in the scratchpad `east13/bin`)
- **Comp ids:** same set as 12 Nov (`data/snapshots/2026-11-12/comps.csv`): P01 11, P04 7, P09 6, P12 7, P15 7. **None replaced.**
  - Not returned on any stay today: P04 1083936003491396261 and 1387112821878102742 (same as 12 Nov; kept on the 11 Nov January sweep), P09 958156921765583815 (same as 12 Nov), P15 1557062894259099964 (kept: bookable 3-5 and 7-9 Jan per the 12 Nov sweep) and **P15 1371771992549776701 (new today; it was priced on 24-27 Nov yesterday)**. Not returned on the dates checked is not proof of inactivity (it can mean booked). All are kept; none was swept for later availability today.
  - P12 29297702 is still a placeholder-like listing (about £1,031-1,077/n) and stays out of the medians.
- **Access:** public Airbnb pages (HTTP 200).
  - 93 wide searches: 2.5 km box for P04, 1.8 km for P09, 1.3 km for the rest. 4 guests for 2BR, 3 for 1BR.
  - Then 518 comp/stay checks in a 0.3 km box (`*` in the tables).
  - **Booking.com: NOT CHECKED.**
- **Price basis = what guests see:** Airbnb **guest-paid all-in total / nights**. That is after discounts, with cleaning and Airbnb fees **included**; no separate taxes are shown. Ours are priced the same way.
  - PriceLabs/Smoobu figures are **room only, cleaning excluded**. Airbnb cleaning: P12 £150, P04 £142, P01 £149 (`reservations.csv` cleaning_gbp, recent Airbnb stays).
- **Stays (same dates for comps and us):**
  - Default: tonight's Fri-Sun 13-15 Nov, **next Fri-Sun 20-22 Nov (new)**, midweek Tue-Thu 17-19 Nov, and **30 days out 13-15 Dec (new)**.
  - Trend stays as before: 24-27 Nov, 1-3, 4-6, 7-9, 8-10, 9-11, 10-12, 11-13 and 12-14 Dec.
  - Key-date stays:
    - P01: 18-21, 18-20 and 19-21 Dec.
    - P04: 14-17 Nov, the 18-25 Nov runs and the 6-20 Dec runs.
    - P12: 13-14 Nov, **17-20 Nov (new)**, 18-20 and 17-21 Nov, 26-27 Nov, the 30 Nov-4 Dec runs, and the 7-14 Dec runs.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius, excluding ours.
  - The P04 band leaves out 1588439248552365607 (placeholder-like).
  - The P04 band is shown both with and without collapsing the 5-unit 1531... operator to one listing.
- **Data written:** `data/snapshots/2026-11-13/comps.csv` did not exist.
  - Under `flock` on `.comps.csv.lock` I copied 12 Nov forward (17,725 lines) and **appended 1,235 rows**, giving 18,960 lines.
  - 702 `comp-east` rows: every stored comp x stay, with NOT RETURNED rows kept.
  - 387 `east-refband` rows.
  - 146 `east-ours` rows: our Airbnb all-in, the unsynced P04 listing, and the Smoobu room price per key night with the 13 Nov raw PriceLabs price/user_price/uncustomized.
  - None of the `east-ours`/`east-refband` rows are comps.
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` (listing, 12-13 Nov): **0 entries** for P04/P12/P01/P09 and 0 account-wide.
  - `get_listing_prices` live: P12 2699998 (13 Nov-14 Dec), P04 3562176 (13 Nov-22 Dec), P01 3320302 (16-21 Dec). These match the 13 Nov raw files on every date used here.
  - `get_listing_date_overrides` P04 3562176: unchanged since 11 Nov 17:16Z.
  - `get_neighbourhood_data` P12, P04, P01: all `all_operations_ok`. P09 not called (no open night).
- **Smoobu: not called.** Smoobu prices come from `prices.csv` (13 Nov).

## What changed since 12 Nov (this batch)
**No PriceLabs edits** (`get_user_logs` empty) and no bookings or cancellations (Dispatcher diff). Every change below came from the algorithm or the market.

**What guests see follows Smoobu, not the new PriceLabs `price`** (P12 17-19 Nov and P04 18-20 Nov). The cause of the Smoobu/PriceLabs gap is left to the PriceLabs auditor.
- **P12 17-19 Nov:**
  - PriceLabs `price` 267/272/288 is the algorithm value after the 12 Nov 07:56Z refresh. `user_price` (= `booked_price`, "Your Price") is still 253/247/257, the 12 Nov prices.
  - Smoobu shows **250/250/266**.
  - Airbnb all-in for 17-19 Nov is **£508, unchanged from 12 Nov**. Guests did not get the PriceLabs rise.
- **P04 18-20 Nov:**
  - PriceLabs `price` 147/150/155 vs `user_price` 138/140/146. Smoobu shows **130/135/140**.
  - Airbnb 18-21 Nov all-in fell **£467 -> £452** (-£15), about the same as Smoobu's drop vs yesterday's pushed 138/140/146 (-£19).
- **Other algorithm moves (PriceLabs `price` = Smoobu, raw 13 Nov vs 12 Nov):**
  - **P12 11-13 Dec: 319/329/292 -> 290/296/300.** Our Airbnb 11-14 Dec fell **£332 -> £303/n**.
  - P12 26 Nov 298 -> 304. 30 Nov 279 -> 258. 7-10 Dec 265/271/280/290 -> 268/268/276/300.
  - P04 6-19 Dec moved by at most £2 a night. Our Airbnb 9-12 Dec fell 197 -> 188.33 and 11-14 Dec fell 216.33 -> 208.33.
- **Airbnb shows our room well below Smoobu on near-term stays.** Implied Airbnb room = (all-in − cleaning) / nights. That is an upper bound if Airbnb adds a guest fee.
  - **P12 17-20 Nov:** £195.33/n vs Smoobu £255.33. 26 Nov: £208 vs £304.
  - **P04 18-21 Nov:** £103.33/n vs Smoobu £135.
  - Further out the gap is smaller: P12 7-14 Dec before the weekly discount is £257/n vs £285.4.
  - The same ratio shows on the confirmed P12 Airbnb stay 14-17 Nov: £531.20 room vs PriceLabs booked_price 267/236/237 = 740, so **0.72x**.
  - Cause NOT CHECKED: Smoobu Airbnb pricing rules (last-minute), or the Airbnb host fee. This is for the channel agent. It does not change the positioning below, which uses what guests pay.

**Comps:** the median same-comp, same-stay change vs 12 Nov is 0.0% on almost every stay. Moves of £10 or more:
- **P12 1670196516322802487** (Superhost, 4.94): the £160 offer on 17-19 / 18-20 / 17-21 Nov is **gone** (not returned, probably booked). Lower-priced band listings at £160-196.50 also dropped out (see P12 below).
- P12 1383544079404594066: 11-14 Dec 329 -> 311.67. 12-14 Dec 329.50 -> 308.50.
- P12 1120913156789373408: 11-14 Dec 243.33 -> 231.
- P01 41905186: 17-19 Nov 594 -> 499. 4-6 Dec 492 -> 454. 11-13 Dec 309 -> 337. 12-14 Dec 289 -> 322.
- P01 1684834789445533643: 1-3 Dec 422 -> 369.
- P01 1467264633617185891 (the cheapest P01 comp, £220.67) is **no longer returned for 18-21 Dec**.
- P15 1617544963466664181: 12-14 Dec 203 -> 183.

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 13 Nov)
These are market bands, not comps. PriceLabs does not state their horizon or cleaning basis. "Ours" is the PriceLabs room `price` on open nights (`prices.csv` 13 Nov), with the Smoobu price where it differs.

| Ref | Band (n) | P25/P50/P75/P90 today (12 Nov) | Market occ 30 / 60 (`pl_kpis.csv`) | Ours and NL percentile |
|---|---|---|---|---|
| P04 | 2BR (89) | 141/178/216/264 (140/178/215/263) | 25% / 20% | **Next 14 days** (18-24 Nov, 7 n; 13 Nov is a 1-night gap under min 2): PL £152.9 **P33**, Smoobu £146.1 **P28** (12 Nov P27). **December** (6-19 Dec, 14 n): £184.4, **P54** (P54). |
| P09 | 1BR | not called (12 Nov 111/134/161/205) | 39% / 33% | No open night before the 26 Nov handback. |
| P12 | 2BR (117) | 172/207/232/292 (171/206/233/291) | 42% / 34% | **Next 14 days** (17-20, 26 Nov, 5 n): PL £284.2 **P88**, Smoobu £272.0 **P85**. **17-20 Nov**: PL £279.2 **P87**, Smoobu £264.0 **P83**. **26 Nov** £304, **>P90**. **30 Nov-3 Dec** £276.8, **P86**. **7-10 Dec** £278.0, **P86**. **11-13 Dec** £295.3, **>P90**. 7-13 Dec £285.4, P88. |
| P01 | 2BR (146) | 217/263/337/433 (216/262/336/432) | 35% / 29% | **18-20 Dec** (blocked): room £268.7 (282/278/246, live) would be **P52**. |

- `occ_insights`:
  - P12 market 4-7 Dec +9.0% (we are booked 4-6 Dec).
  - P04 3-5 Dec +8.9% (booked).
  - P12/P04/P01: 27 Dec-1 Jan +17.4% to +18.8%.
- `fp_insights`: 26/27-31 Dec surge P04 +7.5%, P12 +20.9%, P01 +25.7%.

## Priority 1: P12 Mile End. 17-20 Nov, 26 Nov, 30 Nov-3 Dec, 7-14 Dec
- **Quality:** `quality_premium` = **-0.15** (the cap). We are 4.27 from 15 reviews; the stored-comp median is 4.86 from 19 (gap -4). **Supported: band median x 0.85-1.00 (-15% to 0%).**
- **Prices are what guests see** (Airbnb all-in). The "supported room" column scales the all-in/PriceLabs-room ratio of each stay, as on 12 Nov. It is approximate, because cleaning is a fixed £150 and weighs heavily on 1-night stays.

| Stay | Ours all-in today (12 Nov) | PriceLabs `price` / Smoobu room | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room | Move needed (vs PL `price`) |
|---|---|---|---|---|---|---|
| 13-14 Nov (tonight, 1 n; 14 Nov booked) | **358** (n/a) | live `price` 274 / user_price 263 (Smoobu NOT CHECKED: not in prices.csv) | 282 (3), **P100, +27.0%** | 282 (1), P100, +27.0% | n/a (n = 3, 1 night with £150 cleaning) | low confidence |
| 17-19 Nov | **254** (254) | 267/272 · Smoobu **250/250** | **250.75 (8), P50, +1.3%** (12 Nov 196.50 (11), P64, +29.3%) | 254 (3), P33, 0.0% | 226-266 | -16% to -1% |
| **17-20 Nov (3 n)** | **245.33** (new) | 267/272/288 · Smoobu **250/250/266** | **250.67 (9), P44, -2.1%** | 254.67 (4), P25, -3.7% | 239-282 | -13% to +2% (**in range**) |
| 18-20 Nov | 260 (255.50) | 272/288 · Smoobu 250/266 | 254 (7), P57, +2.4% | 254 (3), P67, +2.4% | 233-274 | -17% to -2% |
| 17-21 Nov (4 n) | 239.50 (238) | 267/272/288/290 · Smoobu 250/250/266/290 | 257.50 (7), P29, -7.0% | 252.63 (4), P25, -5.2% | 255-300 | -9% to +8% (in range) |
| **26-27 Nov (1 n)** | **358** (353) | **304** (user_price 298; +15% DSO, min 1) | 282 (5), **P100, +27.0%** | 283 (2), P100, +26.5% | **204-239** | **-33% to -21%** |
| **30 Nov-3 Dec** | 260.33 (261.67) | 258/282/284 | 237.84 (14), P57, **+9.5%** | 237.84 (6), P67, +9.5% | 213-251 | -22% to -9% |
| 30 Nov-4 Dec | 249.25 (250.50) | 258/282/284/283 | 243.75 (15), P53, +2.3% | 243.75 (5), P60, +2.3% | 230-271 | -17% to -2% |
| 1-3 Dec (trend) | 279 (273) | 282/284 | 246.50 (10), **P80, +13.2%** | 245.75 (4), P75, +13.5% | 213-250 | -25% to -12% |
| 2-4 Dec | 279.50 (274.50) | 284/283 | 240.50 (11), **P73, +16.2%** | 254 (3), P67, +10.0% | 207-244 | -27% to -14% |
| **7-10 Dec** | 257.33 (258.33) | 268/268/276 | 225 (11), P55, **+14.4%** | 225 (3), P67, +14.4% | 201-237 | -26% to -13% |
| 7-11 Dec | 250.25 (249.25) | 268/268/276/300 | 230.38 (10), P60, +8.6% | 220 (3), P67, +13.7% | 218-256 | -22% to -8% |
| **7-14 Dec (7 n)** | 239.86 (245.14; weekly 15.0% applied) | 268-300 | 220.72 (10), P60, **+8.7%** | 246.43 (2), P50, -2.7% | 223-263 | -22% to -8% |
| **11-14 Dec (3 n)** | **303** (332) | **290/296/300** (12 Nov 319/329/292) | 286.34 (14), **P57, +5.8%** (12 Nov P77, +15.3%) | 271.34 (4), P50, +11.7% | 237-279 | -20% to -5% |
| 12-14 Dec, 13-14 Dec, 13-15 Dec | not bookable (min 3; 14 Dec onward is the handback block) | 296/300 · 300 | 284.25 (8) / 295 (4) / 237.50 (9) | | n/a | n/a |

**Supported positioning** (lowering a PriceLabs price is Corentin's call; a-p12-trim):
- **17-20 Nov: hold. This is now at parity.** The 3-night stay is -2% vs band (P44). The 2-night stays are +1% to +2% (P50-P57). The band median rose from 196.50 to 250.75 overnight because the cheap listings (£160-196.50, including the Superhost comp at £160) were no longer returned. **The 12 Nov HIGH (+15% to +29%) no longer holds.**
  - Guests see the Smoobu 250/250/266, not PriceLabs 267/272/288. **If the PriceLabs `price` reaches Airbnb, 17-19 Nov would be about +5-8% vs band**, above the quality-supported 0% ceiling. Keep guest prices where they are.
  - Reyhan's +5% (12-20 Nov) is now absorbed by the market move. It is not contradicted at today's guest price.
- **26 Nov: room about £205-240, keep min 1.** Today: £304 / £358 all-in, P100, +27% vs band (n = 5), NL >P90. **t-p12-26nov-price not fixed.** The 1-night all-in carries £150 cleaning (42% of £358), so part of the gap is cleaning, not rate.
- **30 Nov-3 Dec: about -5% to -10%.** The 3-night stay is +9.5% (P57). The 1-3 Dec and 2-4 Dec sub-stays are +13% to +16% (P73-P80). The 4-night 30 Nov-4 Dec is close to parity (+2.3%). Reyhan's +5% is the part not supported.
- **7-10 Dec: -10% to -15%.** It is +14.4% vs band (P55), with no Reyhan override on 7-13 Dec. 7-11 Dec and 7-14 Dec are +8.6% / +8.7%: trim about -5% to -10%.
- **11-14 Dec: improved by the algorithm.** It moved from +15.3% (P77) to +5.8% vs band (P57) and +11.7% vs stored (n = 4). Supported: **about -5% to -10%** (room about £265-280 vs 290/296/300). NL is still >P90.
- **13 Nov (tonight), 1 night: £358 all-in, +27% vs band (n = 3).** Unlikely to sell at this level. Low confidence (n = 3; cleaning is £150 of the £358).
- **`recommend`:**
  - 30-day (13 Nov-12 Dec): comp P67 over 14 stays gives **hold** (booked 48% vs market 42%). NL P87 also gives **hold**.
  - 60-day: no sellable P12 night (13 Dec is a 1-night gap under min 3 before the handback).
  - The `hold` is the portfolio-level signal. At stay level the evidence (band P73-P100 and +9% to +27% on 26 Nov, 1-4 Dec and 7-10 Dec; -0.59 star; -15% quality cap) **supports the trims above.** 17-21 Nov and 30 Nov-4 Dec hold.

## Priority 2: P04 Barking. 18-24 Nov and December after Reyhan's -5%
- **Quality:** `quality_premium` = **-0.15** (cap). The synced listing is 4.11 from 9 reviews; the comp median is 4.85 from 27 (gap -18). **Supported: about -15% vs comp/band median (x 0.85-1.00).**
- PriceLabs overrides are unchanged (`get_listing_date_overrides`, last edit 11 Nov 17:16Z):
  - 13-17 Nov min 2, no price override.
  - 18-24 Nov -5%, min 3.
  - 26-30 Nov and 3-5 Dec -8%.
  - 6-22 Dec -5%, min 3.

| Stay | Ours all-in today (12 Nov) | PriceLabs `price` · Smoobu room | Stored median (n), pctl, vs | Band median all / operator once (n), vs | Our pctl in band | Supported room |
|---|---|---|---|---|---|---|
| 13 Nov (tonight) | not bookable (1-night gap, min 2; 14-17 Nov booked) | live `price` 130 / user_price 147 | n/a | n/a | n/a | n/a |
| **18-21 Nov** | **150.67** (155.67) | 147/150/155 · **Smoobu 130/135/140** | 239.84 (2), P0, **-37.2%** | 230 (6) / 223.50, **-34.5% / -32.6%** | P0 | 190-223 |
| 20-23 Nov | 162.67 (159) | 155/158/153 · Smoobu 140/158/153 | 257.67 (1), P0, -36.9% | 240 (5) / 225, -32.2% / -27.7% | P0 | 183-215 |
| 21-24 Nov | 165.67 (158) | 158/153/153 | 257.67 (1), P0, -35.7% | 235 (5) / 225, -29.5% / -26.4% | P0 | 179-210 |
| 22-25 Nov | 164.67 (157) | 153/153/154 | 248.33 (3), P0, -33.7% | 230 (8) / 225, -28.4% / -26.8% | P0 | 178-210 |
| 18-25 Nov (7 n) | 128.14 (126) | 147-158 | 249 (1), P0, -48.5% | 215.57 (5) / 209.07, -40.6% / -38.7% | P0 | 212-249 |
| 6-9 Dec | 185.33 (185.67) | 181/179/180 | 222 (3), P0, -16.5% | 230 (8) / 222, -19.4% / -16.5% | P12 | 183-216 |
| 9-12 Dec | 188.33 (197) | 179/182/191 | 222 (3), P0, -15.2% | 235 (8) / 222, -19.9% / -15.2% | P12 | 184-217 |
| 11-14 Dec | 208.33 (216.33) | 191/193/181 | 213.84 (2), P50, -2.6% | 222 (5) / 214.34, -6.2% / -2.8% | P40 | 165-194 |
| 14-17 Dec | 209 (208.67) | 176/179/183 | 235.17 (4), P25, -11.1% | 218.67 (9) / 233.84, -4.4% / -10.6% | P11 | 171-201 |
| 17-20 Dec | 220.67 (221.33) | 186/192/199 | 241 (2), P0, -8.4% | 228 (7) / 235.50, -3.2% / -6.3% | P0 | 174-205 |
| 6-13 Dec (7 n) | 155.86 (156.14) | 179-193 | 186.79 (2), P0, -16.6% | 181.22 (6) / 155.43, -14.0% / +0.3% | P50 | 156-183 |

- **18-24 Nov (open, 7 nights, next 14 days):** we sit **-34% to -37%** vs the stored set and **-28% to -35%** vs the band (operator-collapsed -26% to -33%). NL P33 (Smoobu P28).
  - The quality-supported level is -15%: all-in about **£190-205/n vs £151-166 today**.
  - **Neither the 9 Nov base cut nor Reyhan's -5% (11 Nov) is supported by the comps.** The supported move is **about +10%** (`recommend` 30-day: **raise +10%**, comp P0 over 9 stays, NL P43; booked 50% vs market 25%).
  - The comps alone would carry +15% to +25%. Not proposed: the market is at 25% occupancy for the next 30 days, Corentin judged on 24 Oct there was no November demand, and confidence is low (band n = 5-8, stored n = 1-3).
  - **Guests see Smoobu 130/135/140 on 18-20 Nov, below even PriceLabs.** The -5% and the Smoobu gap stack.
- **December, after Reyhan's -5% (6-22 Dec):**
  - **6-12 Dec is at or below the -15% floor** (-15% to -20% vs stored and band). **Hold, do not cut further. Removing the -5% on 6-12 Dec is supported.**
  - 11-20 Dec (-3% to -11%) is inside the supported range: **hold**.
  - `recommend` 60-day (13-31 Dec) gives **raise +10%** (comp P12, n = 2; NL P55; booked 63% vs 20%). **Not adopted** beyond 6-12 Dec: the lead comes from the 25 Nov-6 Dec and 20 Dec-2 Jan bookings, and comp n is 2.
- **For Corentin to confirm (standing-decision conflicts, carried, not new proposals):**
  - Policy `price_changes` 24 Oct sets -8% on 1-25 Nov. PriceLabs has no override on 13-17 Nov and -5% on 18-24 Nov.
  - Policy `listing_facts.P04.min_stay_rule` says never fewer than 3 nights. Min 2 is still set on 13-17 Nov.
  - **Exposure today: none.** 14-17 Nov is booked, and 13 Nov is a 1-night gap (our listing was not returned for 13-15 Nov). **t-p04-min2-nov: setting still there; no bookable 2-night stay left.**
- **2 Dec** (+200%, min 1, £459) is deprioritised in policy and not raised.
- **Weekly discount (t-p04-weekly): not fixed.**
  - Airbnb shows £165.74 off £1,063 on 18-25 Nov and £208.17 off £1,299 on 6-13 Dec. After the £142 cleaning, that is **18.0% of room on both**, vs the 15% policy.
  - P12 7-14 Dec: £269.73 off £1,949 = **15.0%** after the £150 cleaning (in line).

## P04 unsynced listing 1455876748739910219 (Barking 1455, day 14)
- **Still bookable on all 11 P04 open runs of 3+ nights checked:**

| Run | Price |
|---|---|
| 18-21 Nov | £526 |
| 20-23 Nov | £542 |
| 21-24 Nov | £539 |
| 22-25 Nov | £531 |
| 18-25 Nov | £1,203 |
| 6-9 Dec | £562 (12 Nov £599) |
| 9-12 Dec | £675 |
| 11-14 Dec | £681 |
| 14-17 Dec | £659 |
| 17-20 Dec | £695 |
| 6-13 Dec | £1,291 |

- It is 1-19% dearer than the synced listing on the 3-night runs and 34% dearer on 18-25 Nov. A booking on it would not reach Smoobu. **t-p04-doublebook: not fixed.**

## Priority 3: P01 Bowsprit Point 18-20 Dec (blocked, before the 20 Dec handback)
- **Still blocked.** Live `get_listing_prices` (refreshed 13 Nov 04:46Z) shows 18/19/20 Dec `Blocked`, price 282/278/246, min 3. Our listing was not returned for 18-21, 18-20 or 19-21 Dec. No PriceLabs edit (`get_user_logs`). **t-p01-1820block: not fixed.**
- **Comps for 18-21 Dec (3 n, all-in):**
  - Stored median **£382.67** (n = 7, range 281-711; 12 Nov £353.50, n = 8). The rise is a composition effect: the cheapest comp (1467264633617185891, £220.67) is no longer returned. The same-comp change is 0%.
  - Band median **£345** (n = 15).
  - 18-20 Dec: stored £495.50 (n = 3), band £495.50 (n = 7).
- **If reopened** at today's PriceLabs 282/278/246 (£806; NL P52) + £149 cleaning, that is **£318.33/n before any Airbnb guest fee**. That is **P14 of the stored set (-17%) and P27 of the band (-8%)**.
- **Supported: parity with the comp median (0%).** `quality_premium` = 0.0 (4.75 from 4 reviews, under the 5-review threshold; comp median 4.8 from 30).
  - Today's price is below what the comps support. No cut is needed; up to about +8% (band) would still be at parity.
  - Min 3 fits the 3-night gap.
- **For Corentin to confirm (policy conflict, carried from 11 Nov, not a new proposal):** policy `handbacks` says "before the date, maximise revenue normally", but the block covers 18-20 Dec (about £806 room). Who extended it: NOT CHECKED.
- `recommend`: raise-signal (booked 100% vs market 35%, no open night).

## Priority 4: P09 Torrent Lodge
- **No open night before the 26 Nov handback.** 13-15 Nov and 15-27 Nov are booked (`reservations.csv`, confirmed). 27 Nov onward is the handback block. Nothing to position.
- Comp level for reference: 2-night median £162.50-164 (13-22 Nov), £196.67 (24-27 Nov, n = 1).
- `quality_premium` 0.0 (5.0 from 3 reviews; comp median 4.56). `recommend`: raise-signal (booked 100% next 30 vs 39%).

## Summary per property
`recommend` runs on the median comp percentile of our priced open stays in each window (13 Nov-12 Dec / 13-31 Dec), with `quality_premium` (needs 5+ reviews).

| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market (`pl_kpis`) | `recommend` 30 / 60 | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | Nothing open (18-20 Dec blocked) | stored 279-495.50 (n 1-7); 18-21 Dec 382.67 (7) | n/a (would be P14 stored / P27 band) | 4.75 vs 4.8 | 4 vs 30 (-26) | 0.0 (<5 reviews) | 100% / 100% vs 35% / 29% | raise-signal | **parity** if 18-20 Dec reopens (current price -8% to -17%, supported) |
| P04 (synced 1657…) | 128.14-220.67 | stored 186.79-257.67 (n 1-4); band 181-240 (n 5-9) | P0 November; P0-P50 December | 4.11 vs 4.85 | 9 vs 27 (-18) | -0.15 | 47% / 45% vs 25% / 20% | raise +10% (P0, 9 stays) / raise +10% (P12, n 2); NL P43 / P55 | **-15%**. 18-24 Nov at -28% to -37%: **+10%** supported. 6-12 Dec at -15% to -20%: hold, removing the -5% supported. 11-20 Dec: hold |
| P04 unsynced 1455… | 171.86-231.67, bookable on all 11 runs | | | 4.69 | 26 | n/a | | | map or unlist |
| P09 | No sellable night (13-26 Nov booked) | 162.50-248.50 | n/a | 5.0 vs 4.56 | 3 vs 25 (-22) | 0.0 | 97% / handback vs 39% / 33% | raise-signal | nothing to position before the handback |
| P12 | 239.50-358 | band 220.72-286.34; stored 220-283 | band P29-P100 (median P57) | 4.27 vs 4.86 | 15 vs 19 (-4) | -0.15 | 47% / 70% vs 42% / 34% | hold (P67, 14 stays) / no sellable night; NL hold (P87) | **-15% to 0% vs band**. 17-21 Nov **hold (parity)**. 26 Nov -21% to -33%. 1-4 Dec -5% to -10%. 7-10 Dec -10% to -15%. 11-14 Dec -5% to -10%. Hold 30 Nov-4 Dec (4 n) |
| P15 | No listing of ours | 140.25-181.50 (n 1-3) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | Blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 13 Nov)
| Item | Status |
|---|---|
| t-p04-doublebook | **Not fixed** (day 14). 1455 is bookable on all 11 P04 open runs of 3+ nights. |
| t-p04-min2-nov | **Setting still there** (min 2 on 13-17 Nov, `get_listing_date_overrides`). No bookable 2-night stay remains (14-17 Nov booked; 13 Nov is a 1-night gap). For Corentin (policy conflict). |
| P04 -5% 18-24 Nov / 6-22 Dec (Reyhan 11 Nov) | Unchanged. November is -28% to -37% vs comps (+10% supported). 6-12 Dec is at the -15% floor (removing the -5% supported). 13-22 Dec: hold. |
| a-p12-trim | **Partly overtaken by the market.** 17-20 Nov is now at parity (hold). Not done on 26 Nov, 1-4 Dec, 7-10 Dec and 11-14 Dec. 11-14 Dec improved through the algorithm (+15% -> +6%). |
| t-p12-26nov-price | **Not fixed.** PL `price` 304 / user_price 298; £358 all-in, P100, +27% vs band (n = 5). |
| P12 +5% (Reyhan) | On 12-20 Nov and 30 Nov-3 Dec. Supported on 17-20 Nov at today's guest price; not supported on 1-3 Dec. |
| t-p04-weekly | **Not fixed** (18.0% vs 15%). |
| t-p01-1820block | **Not fixed.** Still `Blocked` (live 13 Nov). For Corentin. |
| Push freshness | P04 last push 12 Nov 09:23:19Z, P12 12 Nov 07:56:11Z, P01 13 Nov 04:46:04Z, P09 12 Nov 07:02:23Z (`listings.csv`). |

## Critical / high findings
- **CRITICAL: P04 unsynced Airbnb 1455876748739910219 is still bookable on all 11 P04 open 3+ night runs (day 14).** For example 18-25 Nov £1,203 and 6-13 Dec £1,291.
- **HIGH (for Corentin to confirm): P04 18-24 Nov is -28% to -37% vs comps** (NL P33; guests see Smoobu 130/135/140 on 18-20 Nov). About **+10%** is supported (`recommend` raise +10%). Policy (24 Oct) set -8% on 1-25 Nov for lack of demand, and PriceLabs now differs from it (no override 13-17 Nov, -5% 18-24 Nov). So this is evidence for Corentin to weigh, not a new proposal.
- **HIGH (for Corentin to confirm): P01 18-20 Dec is still blocked** before the 20 Dec handback. Comps support today's price: £318/n vs stored median £382.67 (-17%) and band £345 (-8%). It is worth about £806 room.
- **MEDIUM: P12 26 Nov.** Room £304 / £358 all-in, P100, +27% vs band (n = 5). The supported room is about £205-240.
- **MEDIUM: P12 1-4 Dec (+13% to +16%, P73-P80) and 7-10 Dec (+14.4%).** Supported is about -5% to -15%. 11-14 Dec is now +5.8% (P57) after the algorithm took £29-33 off 11-12 Dec.
- **MEDIUM (resolved since 12 Nov): P12 17-20 Nov is now at parity** (P44-P57, -2% to +2%) because the cheaper comps sold. Hold; do not trim. Guests see Smoobu 250/250/266. If the higher PriceLabs 267/272/288 is pushed, the stay would be about +5-8% vs band.
- **MEDIUM: Airbnb shows our near-term room well below Smoobu.** P12 17-20 Nov implies ≤£195/n vs Smoobu £255. P04 18-21 Nov implies ≤£103/n vs £135. The confirmed P12 14-17 Nov stay paid 0.72x the PriceLabs price. Cause NOT CHECKED; for the channel agent.
- **MEDIUM: P04 6-12 Dec is -15% to -20% vs comps** after Reyhan's -5%. That is at the quality floor, so removing the -5% on 6-12 Dec is supported.
- **MEDIUM: P04 Airbnb weekly discount is 18.0% of room vs the 15% policy** (t-p04-weekly).
- **MEDIUM: P12 tonight (13 Nov, 1 night) is £358 all-in, +27% vs band** (n = 3). Low confidence.

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-13.
- "12 Nov x" = the same comp and stay on 12 Nov, where it differs by more than £1.
- `*` = found by the 0.3 km second pass.
- Full source for every row: `data/snapshots/2026-11-13/comps.csv` (`comp-east`, `east-refband`, `east-ours`).

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 18 Dec-21 Dec | 18 Dec-20 Dec | 19 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | – | – | – | – | – | – | – | 320 | – | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 279 | 499 (12 Nov 594) | 372 | 376.33 | 352 (12 Nov 355) | 454 (12 Nov 492) | 329 | 304 | 282 | 282 | 337 (12 Nov 309) | 322 (12 Nov 289) | 259 | 321 (12 Nov 324.33) | 332 (12 Nov 342) | 337 (12 Nov 342) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.45 (158) | none listed | – | 181.50 (12 Nov 184.50) | – | 181.33 (12 Nov 183) | 191.50 | – | 199 (12 Nov 200.50) | 200.50 | 204.50 | – | – | – | – | – | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (56) | Lift | – | – | – | 290.67 (12 Nov 302.33) | – | – | – | – | – | – | – | – | – | 395.33 (12 Nov 386) | – | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.6 (30) | Lift/River view/balcony | – | – | – | 255* | – | – | – | – | – | – | – | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | – | 382.67 | – | – | – | – | – | – | – | – | – | 382.67 | – | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | – | – | 389 | – | – | 384.50 | – | – | – | – | 371.50 | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | 341 | 321.67 (12 Nov 338.67) | 369 (12 Nov 422) | 430.50 (12 Nov 454) | – | – | – | – | 482.50 | 454 | 426 | 479 | 495.50 | 471 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.82 (17) | Lift | – | – | – | – | 280 | – | 335 | 335 | – | – | – | – | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (43) | Lift/Private patio or balcony/Superhost/Guest favourite (added 4 Nov, replaces inactive 20404597) | – | – | – | – | – | – | 405.50 | 405.50 | 405.50 | 439 | – | – | 472 | 711 | 640.50 | 758 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | – | 281 | – | – | – | – | – | – | – | – | – | 281 | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.8 (30) | | **279** (1) | **340.25** (2) | **356.50** (2) | **290.67** (7) | **352** (5) | **442.25** (2) | **332** (4) | **335** (5) | **282** (3) | **360.50** (2) | **409.75** (2) | **388** (2) | **398.75** (4) | **382.67** (7) | **495.50** (3) | **471** (3) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.11 (9); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 14 Nov-17 Nov | 18 Nov-21 Nov | 20 Nov-23 Nov | 21 Nov-24 Nov | 22 Nov-25 Nov | 18 Nov-25 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | – | 257.67 | – | – | – | – | – | – | – | – | – | 257.67 | 257.67 | 257.67 | 257.67 | 257.67 | 249 | – | – | – | 260 | 260 | – |
| [1083936003491396261 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1083936003491396261) | 1.24 | 5 | 4.9 (41) | Superhost (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (27) | Free parking on premises/Superhost/Guest favourite | – | – | – | 141.33 (12 Nov 143) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.76 (41) | Free parking on premises/Superhost (added 30 Oct) | – | – | – | 248.33 | – | – | 250 | 250 | 250 | 250 | – | – | – | – | – | – | – | 248.33 | – | 273.33 | 248.33 | – | 248.33 | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | – | 222 | 222 | – | 222 | – | 222 | 222 | 222 | 222 | 222 | 222 | 222* | – | 222 | – | – | – | – | 222 | 222 | 222 | 222 | 222 | 207 |
| [1387112821878102742 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 | 6 | 4.85 (27) | Parking (in name) (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (16) | Free on-street parking/Superhost | – | – | – | 185.33 | 210 | – | 217 | 217 | 217 | 222 | 227 | 220 | 213 | – | – | – | – | 185.33 | – | 198.67 | 203.67 | 205.67 | 196.33 | – | 166.57 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **150.67** | **162.67** | **165.67** | **164.67** | **128.14** | **185.33** | **188.33** | **208.33** | **209** | **220.67** | **155.86** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | 175.33 | 180.67 | 179.67 | 177 | 171.86 | 187.33 | 225 | 227 | 219.67 | 231.67 | 184.43 |
| **Comp median (n)** | | | 4.85 (27) | | n/a (0) | **222** (1) | **222** (1) | **216.83** (4) | **216** (2) | n/a (0) | **222** (3) | **222** (3) | **222** (3) | **222** (3) | **224.50** (2) | **221** (2) | **217.50** (2) | **257.67** (1) | **239.84** (2) | **257.67** (1) | **257.67** (1) | **248.33** (3) | **249** (1) | **222** (3) | **222** (3) | **213.83** (2) | **235.17** (4) | **241** (2) | **186.78** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | – | – | P0 (-37.2%) | P0 (-36.9%) | P0 (-35.7%) | P0 (-33.7%) | P0 (-48.5%) | P0 (-16.5%) | P0 (-15.2%) | P50 (-2.6%) | P25 (-11.1%) | P0 (-8.4%) | P0 (-16.6%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 164 | 164 | 164 | – | – | – | 164 | 164 | 164 | 164 | 164 | 164 | 164 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 161 | 161 | 162.50 | – | – | – | 161 | 161 | 161 | 161 | 161 | 161.50 | 161.50 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.7 (23) | none listed | – | – | – | – | 146.50 (12 Nov 150) | – | 192 (12 Nov 195.50) | 188 (12 Nov 191) | – | – | – | – | 173.50 |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | – | 200.50 | 200.50 | 196.67 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 | 248.50 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | – | – | – | 206.50 (12 Nov 214.50) | – | – | – | – | – | – | – | 193.50 |
| [958156921765583815 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | – | – | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.56 (25.0) | | **162.50** (2) | **164** (3) | **164** (3) | **196.67** (1) | **206.50** (3) | **248.50** (1) | **178** (4) | **176** (4) | **164** (3) | **164** (3) | **164** (3) | **164** (3) | **173.50** (5) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec | 13 Nov-14 Nov | 17 Nov-20 Nov | 18 Nov-20 Nov | 17 Nov-21 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 2 Dec-4 Dec | 7 Dec-10 Dec | 7 Dec-11 Dec | 11 Dec-14 Dec | 7 Dec-14 Dec | 13 Dec-14 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 187.50 | 247.50 | 237.50 | 225 | 237.50 | – | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | 237.50 | – | 235 | 247.50 | 226.25 | – | 225 | – | – | 225 | 218.75 | 225 | 200.71* | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking on premises | – | – | – | 256 | – | – | – | – | – | – | – | – | – | – | 258.67 | – | 257.50 | – | 316.67 | 312.50 | – | – | – | 352 | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (79) | Superhost | – | – | – | 195.33 (12 Nov 203.67) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 203 | 209.50 | – | – | – | 231 (12 Nov 243.33) | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.94 (16) | Superhost/Guest favourite | – | – | – | 185 | 220 | – | 220 | 220 | 220 | – | – | – | 215 | – | – | – | – | – | 208.33 | 211.25 | 220 | 220 | 220 | – | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (120) | Superhost/balcony/Guest favourite | – | 254 | – | 250.67 | 254 | – | – | – | – | – | – | – | – | – | 250.67 | 254 | 247.75 | 284 | 250.67 | 243.75 | 254 | – | – | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | – | 1035 | 1035 | 1032.33 | 1035 | 1035 | 1035 | 1035 | 1035 | 1035 | 1048.50 | 1058.50 | 1045 | – | 1039 | 1045 | 1036 | 1043 | 1032.33 | 1031 | 1035 | 1032.33 | 1031 | 1048 | 885 | 1063 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | – | 282 | – | 282 | 284.50 (12 Nov 289.50) | – | 298 (12 Nov 305.50) | 289 (12 Nov 297) | 290.50* (12 Nov 297) | 307.50 (12 Nov 315.50) | 319.50 (12 Nov 329) | 308.50 (12 Nov 329.50) | 304 | 282 | 282 | 282 | 282 | 282 | 283.67 (12 Nov 287) | 288.75 (12 Nov 293) | 295.50 (12 Nov 304) | 293.33* (12 Nov 300.67) | 294.25 (12 Nov 301.25) | 311.67 (12 Nov 329) | 292.14 (12 Nov 303) | – |
| **Ours** | | | | | not bookable | **254** | not bookable | not bookable | **279** | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **358** | **245.33** | **260** | **239.50** | **358** | **260.33** | **249.25** | **279.50** | **257.33** | **250.25** | **303** | **239.86** | not bookable |
| **Comp median (n)** | | | 4.86 (19) | | **187.50** (1) | **254** (3) | **237.50** (1) | **237.83** (6) | **245.75** (4) | n/a (0) | **237.50** (3) | **237.50** (3) | **237.50** (3) | **272.50** (2) | **278.50** (2) | **273** (2) | **237.50** (3) | **282** (1) | **254.67** (4) | **254** (3) | **252.62** (4) | **283** (2) | **237.83** (6) | **243.75** (5) | **254** (3) | **225** (3) | **220** (3) | **271.34** (4) | **246.43** (2) | n/a (0) |
| **Our pctl (vs median)** | | | | | – | P33 (+0.0%) | – | – | P75 (+13.5%) | – | – | – | – | – | – | – | – | P100 (+27.0%) | P25 (-3.7%) | P67 (+2.4%) | P25 (-5.2%) | P100 (+26.5%) | P67 (+9.5%) | P60 (+2.3%) | P67 (+10.0%) | P67 (+14.4%) | P67 (+13.7%) | P50 (+11.7%) | P50 (-2.7%) | – |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 13 Nov-15 Nov | 17 Nov-19 Nov | 20 Nov-22 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 9 Dec-11 Dec | 10 Dec-12 Dec | 11 Dec-13 Dec | 12 Dec-14 Dec | 13 Dec-15 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | – | – | 170.50 | – | 170.50 | 170.50 | 170.50 | 183 | 195.50 | 183 (12 Nov 203) | 190* |
| [1371771992549776701 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1557062894259099964 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | – | 159.67 | – | – | – | – | 167.50 | 167.50* | 167.50 | 167.50 | 167.50 |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.92 (25) | Free parking on premises/Guest favourite | – | 145 | – | – | 181 | – | 181 | – | – | – | – | – | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (202) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | – | 135.50 | – | – | 140.50 | – | – | – | – | – | – | – | 145.50 |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | – | 146.67* | – | – | – | – | – | – | – | – | – |
| **Comp median (n)** | | | 4.84 (14) | | n/a (0) | **140.25** (2) | n/a (0) | **153.17** (2) | **170.50** (3) | n/a (0) | **175.75** (2) | **170.50** (1) | **169** (2) | **175.25** (2) | **181.50** (2) | **175.25** (2) | **167.50** (3) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings (Airbnb only).
- Comp cancellation policies and band-listing sleeps: NOT CHECKED. Lift, view and parking come from listing-page reads on 25 Oct-5 Nov.
- **Smoobu was not called.** Smoobu prices come from `prices.csv` 13 Nov, which starts 14 Nov. Tonight (13 Nov) Smoobu prices for P04/P12 are NOT CHECKED (PriceLabs live: P12 `price` 274 / user_price 263; P04 130 / 147).
- **Why Smoobu differs from PriceLabs** on P12 17-19 Nov and P04 18-20 Nov: NOT CHECKED (PriceLabs auditor). Here it is shown only that Airbnb follows Smoobu.
- **Why Airbnb shows our near-term room 20-30% under Smoobu** (P12, P04): NOT CHECKED. The implied room assumes cleaning £150 (P12) / £142 (P04) / £149 (P01) from `reservations.csv`, and no separate guest fee.
- Inactive checks: 6 stored comps were not returned on any stay today (P04 1083936003491396261 and 1387112821878102742, P09 958156921765583815, P15 1557062894259099964 and 1371771992549776701). No forward sweep was run today, so they are kept as active on earlier evidence.
- **P01:** who extended the Smoobu block to 21 Dec, and why: NOT CHECKED. The if-reopened all-in is estimated (room + £149 cleaning, Airbnb guest fee excluded).
- **P04:**
  - Stored n is 1-4 per stay; band n is 5-9, with a 5-unit operator (shown both ways).
  - The 18.0% weekly figure assumes £142 cleaning.
  - Why Reyhan set min 2 on 13-17 Nov and -5% on 18-24 Nov and 6-22 Dec: NOT CHECKED.
- **P12:**
  - The 13-14 Nov band is n = 3 and 26-27 Nov is n = 5. No stored comp was returned for 4-6 or 13-14 Dec.
  - Room targets are approximate (ratio method; cleaning is fixed).
  - Which PriceLabs value Smoobu/Airbnb received on 26 Nov (`price` 304 vs user_price 298): NOT CHECKED.
- **P09:** NL percentiles not fetched today (no open night).
- **NL percentiles:** PriceLabs does not state the horizon or cleaning basis.
