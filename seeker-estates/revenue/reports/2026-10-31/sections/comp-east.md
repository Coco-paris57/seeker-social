# Competitor positioning: EAST batch (D = 2026-10-31)

**Method**
- **Comp ids.** Same comp ids as 30 Oct, same search boxes and guest counts: 4 guests for 2-beds, 3 for 1-beds. P04 uses a 2.5 km box, P09 1.8 km, the others 1.3 km.
- **Access.** Airbnb, plain public pages (HTTP 200), same curl as 26-30 Oct. Booking.com was not tried.
- **Price basis.** Guest-paid **all-in total ÷ nights**: after any discount, cleaning and Airbnb fees included. Airbnb shows no separate taxes.
- **Two passes.** Wide search, then a 0.3 km box search around every comp (and our listing) the wide search did not price: 220 + 16 searches. 10 extra prices were found that way (8 comp prices and 2 of ours, marked `*`). "–" = not bookable for that stay in either pass.
- **P04 "ours" is now the synced listing 1657859794156786222** (follows Smoobu; 4.11 (9), sleeps 6). The unsynced Barking listing 1455876748739910219 (4.69 (26)) is shown on its own row.
- **Stays** (from `reservations.csv` / `prices.csv` 31 Oct):
  - **Trend stays (all refs):** 6-8 Nov (next Fri-Sun), 3-5 Nov (Tue-Thu), 24-27 Nov (about 30 days out).
  - **P04:** 3-6 and 6-9 Nov (double-sell check), 9-12, 10-13, 18-21, **20-23 (reopened)**, 21-24 Nov, 6-9 and 11-14 Dec, plus a one-off 1-3 Nov check.
  - **P12:** 1-3, 3-5, 12-14, 18-20, 26-28 Nov, 26 Nov-2 Dec, 7-13 and 11-13 Dec.
  - **P20:** 6-9, 10-13, 16-19, 22-25 Nov, 7-10, 11-14 and 18-21 Dec. 31 Oct-2 Nov was dropped: check-in is today.
  - **P09:** 10-12 Nov.
- **Comp set changes: four comps replaced.** Each had no bookable stay on any checked date, including the 0.3 km pass. Their pages are still live.

  | Ref | Dropped (days with no bookable stay) | Replacement (2BR unless noted; read 31 Oct) |
  |---|---|---|
  | P01 + P20 | 1385492120084469276, 4.7 (20) (27-31 Oct, 5 days) | **944872208662374170**: sleeps 4, 4.91 (54), Superhost, marina view. 0.12 km from P20, 0.76 km from P01 |
  | P20 | 813089760121939738, 4.4 (20) (27-31 Oct, 5 days) | **1568001017881493647**: sleeps 4, 4.87 (23), balcony, free parking, 0.30 km |
  | P12 | 1199115199309731731, 4.84 (31) (27-31 Oct, 5 days) | **1383544079404594066**: sleeps 7, 4.58 (31), lift, 1.15 km. The only 2BR within about 1 km sleeping 5-7 with 10+ reviews that was bookable this week |
  | P15 | 1611041940714716070, 4.88 (24) (30-31 Oct, 2 days) | **49353522**: 1BR, sleeps 3, 4.84 (201), Superhost, lift, 0.97 km |

  - Also read but not used: 1076841063082378082 and 1400776055994877540 (P20/P01 candidates). 1369789941414379475 was rejected for P12 because it sleeps 8.
  - **Watch:** 1253486494214857096 (P04) had no bookable stay today (1st day). 29297702 (P12) is still at about £1,035/n, kept in the set but excluded from medians.
- **Data written.** 375 rows appended to `data/snapshots/2026-10-31/comps.csv` under `flock` on `.comps.csv.lock`. 343 are comp-east rows (41 comps x their stays, with NOT RETURNED rows kept). 32 are tagged `east-refband` (P12 band, not stored comps). No `market.csv` rows were added: the market agent's 31 Oct NL rows match my reads exactly.
- **PriceLabs (read-only, one call at a time):**
  - `get_neighbourhood_data` x5: P01, P04, P09, P12, P20. All returned `all_operations_ok`.
  - `get_listing_date_overrides` for P04, P12 and P20.
  - `get_user_logs` for the 5 listings, 30-31 Oct: 6 entries, all by Reyhan at 30 Oct 22:11-22:12Z.

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 31 Oct)

| Ref | Band (n) | P25/P50/P75/P90 today | 30 Oct | Market occ 30/60 (`pl_kpis.csv` 31 Oct) | Our PL avg on open nights, pctl 30d / 60d |
|---|---|---|---|---|---|
| P01 | 2BR (147) | 215/259/332/422 | 215/257/331/420 | 34% / 28% | no open nights |
| P04 | 2BR (91) | 139/170/218/257 | 139/173/220/260 | 24% / 20% | £199 P65 / £196 P63 |
| P09 | 1BR (127) | 110/134/161/204 | 110/136/161/204 | 36% / 31% | £147 P62 / handback |
| P12 | 2BR (120) | 171/205/244/303 | 171/206/245/303 | 40% / 33% | £253 P77 / £291 P87 |
| P20 | 2BR (152) | 215/254/314/408 | 215/254/314/406 | 37% / 29% | £263 P54 / £334 P78 |

- These are market bands, not comps. Their horizon and cleaning treatment are not stated.
- **Same comp, same stay vs 30 Oct:** median change is **0.0% on every ref and stay**. Moves over £5:
  - 41905186 (P01): 6-8 Nov 457 → 484 and 24-27 Nov 447.67 → 471.
  - 1316210326145130709 (P20) 10-13 Nov: 393.67 → 373.
  - 1516006875488990547 (P20): 10-13 Nov 244 → 232.33 and 24-27 Nov 238.33 → 227.
- **P20's comp medians fell (for example 16-19 Nov 333 → 271) because of the set change, not because prices moved.** The two new comps price at £256 and £281, and 1316210326145130709 was not bookable for 16-19 Nov.

## Summary per property

How to read the columns:
- **Our price:** our Airbnb all-in £/night for the same stay.
- **Booked 30/60:** confirmed Smoobu nights as a share of sellable nights. Days 1-30 = 31 Oct-29 Nov; days 31-60 = 30 Nov-29 Dec. Handback nights are excluded, as are the deprioritised P04 2 Dec and P12 17 Nov.
- **Pctl:** `rm/positioning.py` `percentile_rank` against priced comps for that stay.

| Ref | Our price, same stay | Comp median (n) | Our pctl (vs median) | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market | `recommend` 30 / 60 (comp pctl) |
|---|---|---|---|---|---|---|---|---|
| P01 | none open (booked to 30 Nov; 30 Nov-17 Dec handback block; 18-21 Dec booked) | 359.50 (4) / 384 (1) / 363.67 (10) | n/a | 4.67 vs 4.63 | 3 vs 29 (-26) | 0.0 (<5 reviews) | 100% / 100% vs 34% / 28% | raise-signal; nothing to sell |
| P04 (synced 1657…) | 9-12 Nov 181; 10-13 Nov 181.67; 18-21 Nov 206; **20-23 Nov 209.33**; 21-24 Nov 206; 6-9 Dec 221.33*; 11-14 Dec 227.33 | 239.84 (2) / 222 (3) / 239.84 (2) / 253 (2) / 253 (2) / 260 (3) / 241 (2) | **P0-P50 (-5.7% to -24.5%)** | **4.11 vs 4.73** | 9 vs 21 (-12) | **-0.15** (cap) | 52% / 55% vs 24% / 20% | raise +10% (P0) / raise +10% (P25) |
| P04 unsynced 1455… | 3-6 Nov **173 (sellable, dates booked)**; 6-9 Nov **158.33 (sellable, dates booked)**; 9-12 165.67; 10-13 171.33; 18-21 175.33; 20-23 180.67; 21-24 179.67; 6-9 Dec 224.33; 11-14 Dec 227 | same as above | 8-15% under our synced listing on 9-24 Nov | 4.69 vs 4.73 | 26 vs 21 (+5) | -0.016 | n/a | n/a |
| P09 | 10-12 Nov **173.50** (30 Oct 178.50) | 168 (5) | **P60 (+3.3%)** | 5.0 vs 4.58 | 3 vs 24.5 (-21.5) | 0.0 (<5 reviews) | 88% vs 36% / handback | raise +10% (P60) / n/a |
| P12 | 1-3 Nov 243; 3-5 Nov 238.50; 12-14 Nov 247; 18-20 Nov 246.50; 26-28 Nov 271; 26 Nov-2 Dec 256.33; 7-13 Dec 292; 11-13 Dec 362 | stored: 252 (3) / 252 (3) / 261.75 (2) / 254 (3) / 250 (2) / 212.50 (3) / 272.09 (2) / 295 (2). **Band:** 244.75 (6) / 257 (4) / 237.50 (5) / 245.75 (6) / 237.50 (3) / 229.09 (8) / 263 (13) / 330 (6) | stored P33-P100 (-5.6% to +22.7%, thin n). **Band: Nov P25-P60 (-7.2% to +4.0%); 26-28 Nov P100 (+14.1%, n=3); 26 Nov-2 Dec P62 (+11.9%); 7-13 Dec P77 (+11.0%); 11-13 Dec P83 (+9.7%)** | 4.27 vs 4.86 (band 4.59-4.92) | 15 vs 18 (-3) | **-0.15** (stored); -0.13 to -0.15 vs band | 54% / 29% vs 40% / 33% (60d = 30 Nov-13 Dec, before handback) | raise +10% (P42) / hold (P75) |
| P20 | 6-9 Nov 231.33; 10-13 Nov 239; 16-19 Nov 261; 22-25 Nov 260*; 7-10 Dec 318.33; 11-14 Dec 328; 18-21 Dec 330.33 | 373.84 (6) / 327.34 (8) / 271.34 (10) / 307.17 (10) / 333.33 (11) / 290 (9) / 358 (6) | **Nov P0-P40 (-3.8% to -38.1%); Dec P33-P56 (-7.7% to +13.1%)** | none (New) vs 4.80 | 0 vs 18 (-18) | 0.0 (no rating) | 32% / 17% vs 37% / 29% | raise +5% (P16; lead exactly -5 pts) / fix-listing (P45). NL: hold / lower -7% |
| P15 | no listing of ours | 145 (1) / 140.25 (2) / 159.67 (6) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a |
| P07 | Blocked on purpose (policy) | not analysed | | | | | | |

`*` = found by the 0.3 km second pass.

## Supported positioning (one line each, then reasoning)
- **P04: about -15% vs comp median (quality-adjusted parity).** On 9-24 Nov we sit at -14% to -25%. `recommend` says raise +10% on both windows (52% vs 24% booked).
  - The synced listing that Smoobu controls rates 4.11 (9) vs a comp median of 4.73, so `quality_premium` is capped at -0.15. That takes up most of the gap.
  - Where we are below -15% (9-12 Nov -24.5%, 10-13 Nov -18.2%, 20-23 Nov -17.3%, 21-24 Nov -18.6%), a 3-10% step would sit at the quality-supported level. 6-9 and 11-14 Dec (-15% and -6%) are already there.
  - **This conflicts with Corentin's 24 Oct "no demand" -8%** (now Reyhan's -7% on 3-17 Nov and 6-22 Dec, and -3% on 18-24 Nov). It is for Corentin to confirm, not a new proposal. n is only 2-3 comps per stay.
  - Raising the synced listing alone would widen its gap to the unsynced 1455… listing, which already sells 18-24 Nov at 0.85-0.87x PriceLabs.
- **P12, November open nights: hold.** We are at band P25-P60 (-7% to +4%). Quality (-13% to -15%) offsets the demand lead (54% vs 40%, `recommend` raise +10% at comp P42).
- **P12, 26 Nov-13 Dec: up to about -10% (to the band median) is supported, but `recommend` now says hold.** We are +10% to +12% above the band median (P62-P83) with quality -13% to -15%.
  - Booked is 29% vs 33%: within the 5-point "in line" range, at P75, so `recommend` holds. The NL reading is also hold (P87).
  - Our 26 Nov-2 Dec Airbnb price fell to £256.33/n from £268.83 on 30 Oct, because 26-28 Nov is now inside the Airbnb last-minute window (see the ratio table).
  - The size of any cut is Corentin's call. Plan item a-p12-2228nov has **not been applied**: P12 overrides are unchanged since 28 Oct 12:44Z.
- **P20: hold; no cut.**
  - November: -4% to -38% vs median at P0-P40, 32% vs 37% booked (a -5-point lead sits on the edge of `recommend`'s bands). `recommend` says raise +5% on comps and hold on NL.
  - December: -8% to +13% (P33-P56), 17% vs 29% booked. `recommend` on comps says fix-listing; the NL-only "lower -7%" rests on Christmas PriceLabs prices.
  - The gap is 0 reviews vs 18 plus the Airbnb 0.765x cut (below), not the PriceLabs price.
- **P09, 10-12 Nov: hold at £173.50 (P60, +3.3%, n=5).** `recommend` says raise +10% (88% vs 36% booked), but our 5.0 rests on 3 reviews (`quality_premium` 0). There are 2 nights left, 10 days out. The Airbnb total went from £357 (30 Oct) to £347 because the PriceLabs prices went from 150/153 (30 Oct report) to 142/147 (`prices.csv` 31 Oct). No PriceLabs log was found for that move, so it was the algorithm, not an edit.
- **P01: no action.** 0 sellable nights before the 20 Dec handback.
- **P15: reference only.** The 1-bed median is £140-160 all-in.

## Critical / high findings
- **CRITICAL, P04 double-booking exposure is now on two confirmed stays (t-p04-doublebook NOT fixed).**
  - On 31 Oct the unsynced Barking Airbnb listing 1455876748739910219 is bookable for:
    - **3-6 Nov at £519**, against the confirmed Booking.com stay 3-6 Nov (booked 28 Oct);
    - **6-9 Nov at £475**, against the confirmed Airbnb stay 6-9 Nov (booked 29 Oct).
  - The synced 1657859794156786222 correctly shows neither stay. Yesterday's "6-8 Nov correctly closed" on 1455… was a 2-night search that its 3-night minimum hid; the 3-night 6-9 Nov stay is open.
  - Close 3-6 and 6-9 Nov on 1455… manually (Corentin) and/or unlist it.
- **P04 20-23 Nov cancellation: no sign that a booking on 1455… caused it.** 20-23 Nov is still bookable on 1455… (£542) and on the synced listing (£628) on 31 Oct, so nobody holds those nights on the unsynced listing. The cause of the cancellation is NOT CHECKED. The cancelled reservation appears 3 times in `reservations.csv`.
- **HIGH, the unsynced 1455… undercuts our synced Barking listing** by 8-15% on 9-24 Nov: £497 vs £543, £514 vs £545, £526 vs £618, £542 vs £628 and £539 vs £618. In December the two are about equal. It also carries the stronger review profile (4.69 (26) vs 4.11 (9)), so direct Airbnb demand is likely to land on the unsynced copy. That is an inference: conversion was not seen.
- **HIGH, Reyhan's edit conflicts with a standing decision (for Corentin to confirm).** P04 1-2 Nov is set to **+50% with min 2** (Reyhan, 30 Oct 22:12Z, after a +25% entry at 22:12:05Z). It is **live on Airbnb**: the synced listing sells **1-3 Nov (2 nights) at £483**. Policy `listing_facts.P04.min_stay_rule` says never fewer than 3 nights.
- **HIGH, Airbnb pricing-rule cut unchanged (a-airbnb-rules NOT fixed).** Room = Airbnb total minus £150 cleaning (assumed) ÷ PriceLabs sum:

  | Stay | P20 ratio | P12 stay | P12 ratio |
  |---|---|---|---|
  | 6-9 Nov | 0.765 | 1-3 Nov | 0.713 |
  | 10-13 Nov | 0.765 | 3-5 Nov | 0.711 |
  | 16-19 Nov | 0.765 | 12-14 Nov | 0.714 |
  | 22-25 Nov (22 days out) | 0.765 | 18-20 Nov | 0.713 |
  | 7-10 Dec | 0.900 | 26-28 Nov (26 days out) | 0.721 |
  | 11-14 Dec | 0.901 | 26 Nov-2 Dec | 0.831 (mix) |
  | 18-21 Dec | 0.900 | 7-13 Dec | 0.900 |

  The same shape as 29-30 Oct: a flat 0.90 with an extra 0.85 out to about 28 days, wider than P20's recorded 0-14-day last-minute rule. P12's Airbnb rules were not seen.
  - For P04, cleaning is unknown, so raw totals ÷ PriceLabs are shown instead. The synced listing runs 0.99-1.04x in November and 1.14x in December. The unsynced listing runs 0.85-1.00x in November and 1.14-1.16x in December, so it does not follow PriceLabs.

## Plan items and Reyhan conflicts in this batch (overrides and logs read 31 Oct)
- **t-p04-doublebook:** NOT fixed. It is worse: 3-6 and 6-9 Nov are both sellable on 1455… (above).
- **P04 min stay 2 on 18-20 / 23-25 Nov: fixed.** Reyhan replaced it at 30 Oct 22:12:33Z with -3% and min 3 on 18-24 Nov. The 25 Nov +15% min 2 remains, but 25 Nov is booked. **New conflict:** 1-2 Nov min 2 (above).
- **P04 -7%** on 3-17 Nov and 6-22 Dec (28 Oct 10:32Z): unchanged; reported only.
- **P12 17 Nov:** still **-2%, min 2** (28 Oct 12:44Z), so NOT changed. Policy records +50% kept by Corentin; for Corentin to confirm which stands.
- **P20 min 2:** 31 Oct-1 Nov still at +10%, min 2 (27 Oct 14:38Z). The 1 Nov night is a 1-night gap before the 2-6 Nov booking, so the conflict lapses on its own today.
  - Reyhan also added P20 Jan -5% min 3 and Feb -5% min 4, and re-saved 27 Dec min 6 (30 Oct 22:11Z). These are outside policy's 25 Oct-30 Nov min-3 window, so there is no conflict.
- **a-p12-2228nov:** not applied. **a-raise-1012nov (P09):** the Airbnb price is now £347 (PriceLabs algorithm moved it down £10); no edit.
- **18 Oct base rises, running effect (bookings made from 19 Oct, `reservations.csv` 31 Oct):**
  - **P01:** no new nights to sell (100% to handback).
  - **P09:** 1 booking (13-15 Nov, made 23 Oct). 88% vs 36% booked.
  - **P12:** 3 Booking.com bookings (5-12 Nov made 24 Oct, 21-26 Nov made 28 Oct, 3-7 Dec made 29 Oct). 54% vs 40% (30 days) but 29% vs 33% for 30 Nov-13 Dec.
  - **For the 2 Nov base review:** P12 is the only raised East flat with inventory to test (26 Nov-2 Dec and 7-13 Dec open, +10% to +12% vs band at -15% quality). P01 and P09 have nothing left before handback.

## Comp tables (Airbnb, guest-paid all-in £/night incl. cleaning and fees; checked 2026-10-31; "30 Oct x" = same comp and stay on 30 Oct where it differs by more than £1; full source per row in `data/snapshots/2026-10-31/comps.csv`)
### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.67 (3)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov |
|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | 261.67 |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 484 (30 Oct 457) | – | 471 (30 Oct 447.67) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.47 (150) | none listed | – | – | 202 |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (55) | Lift | – | – | 381.67 (30 Oct 376.33) |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.61 (28) | Lift/River view/balcony | – | – | 255 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | 374.33 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | 353 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.8 (15) | Lift | 335 | – | – |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.64 | 5 | 4.37 (38) | Paid parking on premises | 384 | 384 | 379 |
| [20404597](https://www.airbnb.co.uk/rooms/20404597) | 0.68 | 6 | 4.65 (23) | Canal view/Lift/River view/Superhost/balcony | 315 | – | – |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 |
| **Ours** | | | | | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.63 (29.0) | | **359.50** (4) | **384** (1) | **363.66** (10) |
| **Our pctl (vs median)** | | | | | – | – | – |

### P20 Waterford Court 2BR, max 4 (ours: Airbnb 1791529331262420081, New, 0 reviews); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 6 Nov-9 Nov | 10 Nov-13 Nov | 16 Nov-19 Nov | 22 Nov-25 Nov | 7 Dec-10 Dec | 11 Dec-14 Dec | 18 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | 281 | 281 | 281 | 281 | 281 | 281 | 282 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises (added 31 Oct) | – | – | – | – | – | 256 | – | 237.33 | 253 | – |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises | 444.50 | – | – | 434.67 | – | 393.33 | – | 393.33 | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (55) | Lift | – | – | 381.67 (30 Oct 376.33) | – | 373 (30 Oct 393.67) | – | 363.33 (30 Oct 357.33) | 383.67 (30 Oct 380.67) | 413 | 399.33 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | 424 | 424 | 382.67 | 382.67 | 382.67* | 382.67 | 382.67 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony | – | – | 353 | – | – | – | 337 | 361.67 | 463.67 | 479 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises | – | – | 261.67 | – | 286* | 261.67 | 261.67 | 261.67* | 276.33 | – |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony | – | – | 333.33 | 368.67 | 368.67 | 333.33 | 333.33 | 333.33 | 333.33 | 333.33 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost | – | – | 227 (30 Oct 238.33) | – | 232.33* (30 Oct 244) | 205.33 (30 Oct 213) | 222.33 (30 Oct 226.33) | – | – | – |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.65 | 5 | 4.37 (38) | Paid parking on premises | 384 | 384 | 379 | 379 | 379 | 379 | 379 | 379 | – | – |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises | – | – | 250 | – | – | 250 | 250 | 250 | 250 | – |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 310 | 270 | 250 | 290 | 250 | 250 | 263.33 | 270 | 290 | 312 |
| **Ours** | | | | | not bookable | not bookable | not bookable | **231.33** | **239** | **261** | **260*** | **318.33** | **328** | **330.33** |
| **Comp median (n)** | | | 4.8 (18.0) | | **384** (3) | **327** (2) | **307.16** (10) | **373.84** (6) | **327.34** (8) | **271.34** (10) | **307.16** (10) | **333.33** (11) | **290** (9) | **358** (6) |
| **Our pctl (vs median)** | | | | | – | – | – | P0 (-38.1%) | P12 (-27.0%) | P40 (-3.8%) | P20 (-15.4%) | P45 (-4.5%) | P56 (+13.1%) | P33 (-7.7%) |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.11 (9); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 3 Nov-6 Nov | 6 Nov-9 Nov | 9 Nov-12 Nov | 10 Nov-13 Nov | 18 Nov-21 Nov | 20 Nov-23 Nov | 21 Nov-24 Nov | 6 Dec-9 Dec | 11 Dec-14 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | 257.67 | – | 257.67 | 257.67 | 257.67 | 257.67 | 257.67 | 257.67 | 260* | 260 |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (24) | Free parking on premises/Superhost/Guest favourite | – | – | 146 | – | – | – | 125.67 (30 Oct 127) | – | – | – | – | – |
| [1343991336860365461](https://www.airbnb.co.uk/rooms/1343991336860365461) | 1.81 | 6 | 4.43 (14) | Paid parking on premises | – | – | – | 130 | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.82 (39) | Free parking on premises/Superhost (added 30 Oct) | – | – | 248.33 | – | – | – | – | – | 248.33 | 248.33 | 293.33 | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | 222 | – | – | – | 222 | 222 | 222 | 222 | – | – | 222* | 222 |
| [1253486494214857096 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1253486494214857096) | 2.43 | 5 | 4.64 (14) | Free parking on premises (added 30 Oct) | – | – | – | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | **181** | **181.67** | **206** | **209.33** | **206** | **221.33*** | **227.33** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | 173 | 158.33 | 165.67 | 171.33 | 175.33 | 180.67 | 179.67 | 224.33 | 227 |
| **Comp median (n)** | | | 4.73 (21.0) | | **222** (1) | n/a (0) | **248.33** (3) | **130** (1) | **239.84** (2) | **239.84** (2) | **222** (3) | **239.84** (2) | **253** (2) | **253** (2) | **260** (3) | **241** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | P0 (-24.5%) | P33 (-18.2%) | P0 (-14.1%) | P0 (-17.3%) | P0 (-18.6%) | P0 (-14.9%) | P50 (-5.7%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 10 Nov-12 Nov |
|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 169 | 168 | – | 168 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.43 (88) | none listed | 165 | 166.50 | – | 165 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.73 (22) | none listed | – | – | 182.33 (30 Oct 185.67) | 188.50 (30 Oct 192.50) |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | 200.50 | – | 196.67 | 200.50 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.24 (21) | none listed | – | – | – | 156.50 (30 Oct 161) |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | 244.33* | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | **173.50** |
| **Comp median (n)** | | | 4.58 (24.5) | | **169** (3) | **167.25** (2) | **196.67** (3) | **168** (5) |
| **Our pctl (vs median)** | | | | | – | – | – | P60 (+3.3%) |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 1 Nov-3 Nov | 12 Nov-14 Nov | 18 Nov-20 Nov | 26 Nov-28 Nov | 26 Nov-2 Dec | 7 Dec-13 Dec | 11 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.50 | 237.50 | 225 | 237.50 | 237.50 | 237.50 | 237.50 | 212.50 | 212.50 | 237.50* |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (18) | Paid parking on premises | – | – | 311.67 | – | – | – | – | 295.83 | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (78) | Superhost | – | – | 200.33 (30 Oct 204.67) | – | – | – | – | 211.67 (30 Oct 213.33) | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | – | – | 205 | – | – | – | – | – | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (118) | Superhost/balcony/Guest favourite | – | 252 | 250.67 | 252 | – | 254 | 262.50 | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | 1035 | 1035 | 1033.67 | 1035 | 1037 | 1035 | 1035 | 1029.83 | 1031.50 | 1040.50 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | – | 282 | 312 | 282 | 286 | 300.50 | – | – | 331.67 | 352.50 |
| **Ours** | | | | | not bookable | **238.50** | not bookable | **243** | **247** | **246.50** | **271** | **256.33** | **292** | **362** |
| **Comp median (n)** | | | 4.86 (18) | | **237.50** (1) | **252** (3) | **237.83** (6) | **252** (3) | **261.75** (2) | **254** (3) | **250** (2) | **212.50** (3) | **272.09** (2) | **295** (2) |
| **Our pctl (vs median)** | | | | | – | P33 (-5.4%) | – | P33 (-3.6%) | P50 (-5.6%) | P33 (-3.0%) | P100 (+8.4%) | P67 (+20.6%) | P50 (+7.3%) | P100 (+22.7%) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov |
|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 159.67 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | – | – | 171.67 |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | – | – | 135 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | 159.67 |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.91 (23) | Free parking on premises/Guest favourite | 145 | 145 | 181 |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (201) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | – | 135.50 | – |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | 146.67 |
| **Comp median (n)** | | | 4.84 (14) | | **145** (1) | **140.25** (2) | **159.67** (6) |

### P12 reference band (2BR, 10+ reviews, within 1.3 km, same searches; stored comps included; placeholder 29297702 and our listing excluded)

| Stay | n | Band median | Band rating median | Ours | Our pctl | vs median | `quality_premium` vs band |
|---|---|---|---|---|---|---|---|
| 1-3 Nov | 6 | 244.75 | 4.72 | 243 | P50 | -0.7% | -0.15 |
| 3-5 Nov | 4 | 257 | 4.62 | 238.50 | P25 | -7.2% | -0.138 |
| 12-14 Nov | 5 | 237.50 | 4.59 | 247 | P60 | +4.0% | -0.128 |
| 18-20 Nov | 6 | 245.75 | 4.62 | 246.50 | P50 | +0.3% | -0.14 |
| 26-28 Nov | 3 | 237.50 | 4.92 | 271 | P100 | +14.1% | -0.15 |
| 26 Nov-2 Dec | 8 | 229.09 | 4.88 | 256.33 | P62 | +11.9% | -0.15 |
| 7-13 Dec | 13 | 263 | 4.59 | 292 | P77 | +11.0% | -0.128 |
| 11-13 Dec | 6 | 330 | 4.75 | 362 | P83 | +9.7% | -0.15 |

- **Comp attributes:**
  - Lift, view and parking come from the 25 Oct amenity lists. The 30-31 Oct additions were read on the day they were added.
  - Ratings and review counts come from today's search cards where returned; otherwise they are carried from 30 Oct.
  - Comp cancellation policies are NOT CHECKED.

## P07 Woolwich, 1-bed
Blocked on purpose (policy). No comps, no advice.

---

Data gaps:
1. **Booking.com NOT CHECKED** (not tried). Comps are Airbnb only, and our Booking.com displayed prices are not covered, including the P04 1-2 Nov min-2 nights.
2. **Thin comp n.**
   - **P04:** n is 1-3 on every stay. 593405916827094880 prices £222 on every date, and 1253486494214857096 had no bookable stay today.
   - Also thin: P12 stored comps (n=2-3, so positioning rests on the band), P01 3-5 Nov (n=1) and P15 6-8 and 3-5 Nov.
   - The P12 band's sleeps are NOT CHECKED.
3. **Comp set churn.** Four comps were replaced today, so same-comp trends for those slots start today. P20's medians shifted because of the set change.
4. **Ratios** assume £150 Airbnb cleaning for P12 and P20. P12's Airbnb rules have not been seen. P04 cleaning on either Airbnb listing is unknown.
5. **P04:** which Airbnb account holds 1455… and the cause of the 20-23 Nov Booking.com cancellation are NOT CHECKED. Whether 1455… shows a minimum stay below 3 was not tested beyond the 6-8 Nov and 1-3 Nov searches.
6. **P20 20-21 Nov** show as available in `prices.csv` (31 Oct), although policy records a Smoobu delivery block on 20-22 Nov. Whether the block is still in Smoobu is NOT CHECKED. It does not affect the stays priced here.
7. **PriceLabs.** NL percentiles are a market band, not comps; Competitor Listings and Market Dashboard were not used, and the raw neighbourhood JSON was not saved. `pl_kpis.csv` occupancy differs from Smoobu for P04 (53% vs 52%) and P09 (83% vs 88%); Smoobu is used.
8. **Not analysed:** P15 (no listing of ours) and P07 (blocked, policy). P20 is still missing from `build/properties.py`.
