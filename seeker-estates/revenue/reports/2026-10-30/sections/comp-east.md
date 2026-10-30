# Competitor positioning: EAST batch (D = 2026-10-30)

**Method**
- **Comp ids.** Same comp ids as 25-29 Oct, same search boxes and guest counts: 4 guests for 2-beds, 3 for 1-beds. P04 uses a 2.5 km box, P09 1.8 km, the others 1.3 km.
- **Access.** Airbnb was reached with plain public pages (HTTP 200), using the same curl as 28-29 Oct. Booking.com was not tried.
- **Price basis.** Price = guest-paid **all-in total ÷ nights**: after any discount, with cleaning and Airbnb fees included. Airbnb shows no separate taxes.
- **Two-pass check (new today).** Each wide search was followed by a 0.3 km box search around every comp the wide search did not price (173 searches).
  - The second pass found 5 more comp prices, marked `*` in the tables. The other 168 stay NOT RETURNED, so "–" now means not bookable for that stay.
  - Why the second pass was needed: the wide search **missed our own P12 listing on 26 Nov-2 Dec, 7-13 Dec and 11-13 Dec, and P09 on 10-12 Nov, though all of them are bookable**. Yesterday's "not returned" for our listings and comps was therefore not reliable on its own.
- **Stays.**
  - Trend stays: Tue-Thu 3-5 Nov and Tue-Fri 24-27 Nov. Next Fri-Sun is now 6-8 Nov; 30 Oct-1 Nov was dropped because it is today.
  - Open-night stays, from `reservations.csv` and `prices.csv` (30 Oct):
    - **P12:** 18-20 Nov, 26-28 Nov, 26 Nov-2 Dec, 7-13 Dec and 11-13 Dec. 4-8 Dec was dropped because it was resold 3-7 Dec on Booking.com.
    - **P20:** 31 Oct-2 Nov, 6-9 Nov, 10-13 Nov, 16-19 Nov, 22-25 Nov, 7-10 Dec, 11-14 Dec and 18-21 Dec.
    - **P04:** 3-6 Nov (double-booking check), 9-12 Nov, 10-13 Nov, 18-20 Nov, 6-9 Dec and 11-14 Dec.
    - **P09:** 10-12 Nov.
- **Comp set changes.**
  - **20404597 (P01) is kept.** It is bookable again for 6-8 Nov at £315/n, 4.65 (23).
  - **1191085742562460545 (P15) is replaced** after 5 days with no bookable stay. On 30 Oct it was not returned by the 0.3 km search on any stay, although its page is live at 4.71 (31). The replacement is **1528442618668335413**: 1BR, sleeps 4, 4.64 (14), lift, 1.05 km.
  - **P04 set is now 6**, up from 4. Added **1577633201778145138** (2BR, sleeps 5, 4.82 (39), Superhost, free parking, 1.95 km) and **1253486494214857096** (2BR, sleeps 5, 4.64 (14), free parking, 2.43 km).
    - Checked and rejected because they sleep 4: 1245634494660468861, 1531926876737053750, 1531921636221733437, 1531894634153440977 and 1531900929184851320.
  - **Still not bookable on any stay** (candidates to replace tomorrow if still missing):
    - 1385492120084469276 (P01/P20), 4th day
    - 813089760121939738 (P20), 4th day
    - 1199115199309731731 (P12), 4th day
    - 1611041940714716070 (P15), 1st day
  - **29297702 (P12)** has priced at about £1,030-1,040/n on every date for 5 days. It is kept in the set but **excluded from medians** as a placeholder-like rate. Yesterday's medians included it, so the P12 same-comp trend below excludes it on both days.
- **Data written.**
  - `data/snapshots/2026-10-30/comps.csv`: 352 rows appended under `flock` on `.comps.csv.lock`.
    - 323 are comp-east rows: 41 comps x their stays, with NOT RETURNED rows kept.
    - 29 are tagged `east-refband`: the P12 reference band, which is **not** stored comps.
  - `market.csv`: no rows added. The market agent already wrote today's P01/P04/P09/P12/P20 NL rows, with the same values as my reads.
- **PriceLabs calls.** All read-only and one at a time:
  - `get_neighbourhood_data` x5 (all `all_operations_ok = true`)
  - `get_user_logs` for the 5 East listings, 29-30 Oct: **0 entries**
  - `get_listing_date_overrides` for P04, P20 and P12

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 30 Oct) vs 29 Oct
| Ref | Band (n) | P25/P50/P75/P90 today | 29 Oct | Market occ 30/60 (`pl_kpis.csv` 30 Oct) |
|---|---|---|---|---|
| P01 | 2BR (146) | 215/257/331/420 | 217/259/333/424 | 34% / 27% |
| P04 | 2BR (90) | 139/173/220/260 | 140/175/221/262 | 25% / 20% |
| P09 | 1BR (126) | 110/136/161/204 | 113/139/172/214 | 36% / 31% |
| P12 | 2BR (120) | 171/206/245/303 | 168/207/247/297 | 40% / 33% |
| P20 | 2BR (149) | 215/254/314/406 | 217/255/315/412 | 37% / 29% |

- Medians are down another £1-3 everywhere (third day of slight softening). P09's P75 fell £11.
- These are market bands, not comps. Their horizon and whether cleaning is included are not stated.

**Same comp, same stay vs 29 Oct.** The median change is **0.0%** on every overlapping ref and stay, except P01 3-5 Nov at -5.6% (n=2, driven by 41905186: 845 → 750). Other moves over £5:
- 1316210326145130709 (P20), 10-13 Nov: 363.67 → 393.67
- 1343991336860365461 (P04), 3-6 Nov: 117 → 130
- 41905186 (P01), 24-27 Nov: 473 → 447.67
- 1516006875488990547 (P20), 10-13 Nov: 247.67 → 244

## Summary per property
**How to read the columns:**
- **Our price:** our Airbnb all-in price per night for the same stay.
- **Booked 30/60:** confirmed nights in `reservations.csv` 30 Oct as a share of sellable nights.
  - Days 1-30 = 30 Oct-28 Nov; days 31-60 = 29 Nov-28 Dec.
  - Handback nights are excluded, as are the deprioritised P04 2 Dec and P12 17 Nov.
- **Percentile:** `rm/positioning.py` `percentile_rank` against the priced comps for that stay.

| Ref | Our price, same stay (all-in /n) | Comp median (n) | Our pctl (vs median) | NL pctl 30/60 | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market | `recommend` (comp pctl) 30 / 60 |
|---|---|---|---|---|---|---|---|---|---|
| P01 | none open (booked 31 Oct-30 Nov; 30 Nov-17 Dec handback block; 18-21 Dec booked) | 359.50 (4) / 567 (2) / 374.33 (9) | n/a | n/a | 4.67 vs 4.63 | 3 vs 25.5 (-22.5) | 0.0 (<5 reviews) | 100% / 100% vs 34% / 27% | raise-signal; nothing to sell |
| P20 | 31 Oct-2 Nov 249.50; 6-9 Nov 236.33; 10-13 Nov 237.67; 16-19 Nov 262.33; 22-25 Nov 261; 7-10 Dec 327.33; 11-14 Dec 332; 18-21 Dec 332.67 | 322 (2) / 379 (5) / 368.67 (7) / 333.33 (9) / 333.33 (9) / 361.67 (9) / 333.33 (7) / 382.67 (5) | **Nov P0-P44 (-21% to -38%); Dec P20-P43 (-0.4% to -13%)** | P52 / P77 | none vs 4.66 | 0 vs 18 (-18) | 0.0 (no rating) | 30% / 20% vs 37% / 29% | fix-listing / fix-listing (NL 60: lower -7%) |
| P04 | 3-6 Nov 173 (booked on Booking.com; see critical finding); 9-12 Nov 165.67; 10-13 Nov 171.33; 6-9 Dec 224.33*; 11-14 Dec 227 | 176 (2) / 239.84 (2) / 222 (3) / 260 (3) / 241 (2) | **P0-P50 (-1.7% to -30.9%)** | P53 / P63 | 4.69 vs 4.73 | 26 vs 20.5 (+5.5) | -0.016 | 67% / 55% vs 25% / 20% | raise +10% / raise +10% |
| P09 | 10-12 Nov **178.50*** (29 Oct: 156.50) | 168 (5) | **P60 (+6.2%)** | P66 / n/a | 5.0 vs 4.58 | 3 vs 24.5 (-21.5) | 0.0 (<5 reviews) | 88% / handback vs 36% | raise +10% / n/a |
| P12 | 3-5 Nov 250; 18-20 Nov 259.50; 26-28 Nov 282.50; 26 Nov-2 Dec 268.83; 7-13 Dec 280; 11-13 Dec 345.50 | stored: 244.75 (2) / 245.75 (2) / 250 (2) / 213.33 (3) / 212.50 (1) / 237.50 (1). **Band:** 245.75 (6) / 250 (2) / 229.33 (6) / 263 (13) / 314 (7) | stored P50-P100 (+2% to +46%, thin n). **Band: 18-20 Nov P67 (+5.6%); 26 Nov-2 Dec P67 (+17.2%); 7-13 Dec P62 (+6.5%); 11-13 Dec P71 (+10.0%)** | P80 / P84 | 4.27 vs 4.86 | 15 vs 18 (-3) | **-0.15** (cap) | 57% / **27%** vs 40% / 33% | raise +10% (band P67) / fix-listing (band P67); NL 60: lower -7% |
| P15 | no listing of ours | 160 (1) / 140 (2) / 159.67 (5) | n/a | n/a | n/a vs 4.87 | n/a | n/a | n/a | n/a |
| P07 | Blocked on purpose (policy) | not analysed | | | | | | | |

`*` = price found by the 0.3 km second-pass search (P09 and P04 6-9 Dec: our listing).

## Supported positioning (one line each, then reasoning)
- **P12, 26 Nov-13 Dec: about -7% (to around the band median). Quality supports up to -15% vs the band median, but we are +6.5% to +17% above it and 27% booked vs 33% market.**
  - **Tool outputs disagree.** Against the band (P62-P71), `recommend` says fix-listing. Against NL (P84), it says lower -7%. `quality_premium` is -0.15 (4.27 vs 4.86).
  - **Open nights before the 13 Dec handback:** 26 Nov-2 Dec and 7-13 Dec (14 nights). Only 3-6 Dec is booked: the 3-7 Dec Booking.com resale at 0.934x PL shows the 4-7 Dec peak sells at PriceLabs. PriceLabs occ insight: +8.9% demand on 4-7 Dec. That evidence is for those dates only, not for 7-13 Dec or 26 Nov-2 Dec.
  - **Current setting:** only Reyhan's -2% (28 Oct 12:44Z) is set on 16 Nov-13 Dec. No change since (overrides and logs read 30 Oct). **Plan item a-p12-2228nov is not applied.** The cut size is for Corentin.
- **P12, Nov open nights (3-5, 12-13, 17-20 and 26-28 Nov): hold. Do not raise.**
  - `recommend` 30 = raise +10% (57% vs 40% booked, band P67). But quality is -15% and we already sit at +2% (3-5 Nov), +5.6% (18-20 Nov) and +13% (26-28 Nov, n=2) vs the median, so the two offset.
- **P20: hold; no cut in November or December. We are -21% to -38% vs the comp median in November and -0.4% to -13% in December, yet behind market (30% vs 37%; 20% vs 29%).**
  - `recommend` with comp percentiles = fix-listing on both windows: the gap is 0 reviews vs 18, not price.
  - The NL-only "lower -7%" for 60 days rests on Christmas PL prices (21-29 Dec £344-589). The December comps now priced (7-21 Dec) do not support it.
- **P04: comps and demand support +10% (`recommend` raise +10% on both windows). We are P0-P50 (-2% to -31%) at 67% vs 25% booked, with quality about equal (-1.6%).**
  - **For Corentin to confirm, not a new proposal:** this conflicts with his 24 Oct "no demand" -8% (now Reyhan's -7% on 1-17 Nov and 6-22 Dec, unchanged since 28 Oct 10:32Z).
  - A PriceLabs change reaches Booking.com. Whether it reaches the Barking Airbnb is unclear (see below).
- **P09, 10-12 Nov: hold at the new price. We are now P60 (+6.2%, £178.50 vs £168, n=5); our 5.0 rests on 3 reviews, so `quality_premium` = 0.**
  - The Airbnb total for 10-12 Nov went from **£313 (29 Oct) to £357 (30 Oct), +14%**. PriceLabs is unchanged (150/153) and there are no PriceLabs logs, so the raise (plan a-raise-1012nov) appears to have been made outside PriceLabs. Who made it is NOT CHECKED.
  - `recommend` still reads raise +10% (88% vs 36% booked, P60). A further step to about £196 would put us above every comp except 1224431716304626406 (£200.50, 4.93, Superhost) on 2 open nights 12 days out, so it is not supported.
- **P01: no action.** 0 sellable nights before the 20 Dec handback.
- **P15: reference only.** The 1-bed median is £140-£160 all-in.

## Critical / high findings from the pricing searches
- **CRITICAL, P04 double-booking exposure persists (t-p04-doublebook NOT fixed).**
  - On 30 Oct Airbnb still sells our Barking listing (1455876748739910219) for **3-6 Nov at £519 total** (29 Oct: £479). `reservations.csv` has a **confirmed Booking.com stay 3-6 Nov** (booked 28 Oct).
  - The new P04 Airbnb booking 6-9 Nov (booked 29 Oct) is in Smoobu, and 6-8 Nov is correctly closed on Airbnb. So reservations flow from this Airbnb account, but the Booking.com stay is not blocking Airbnb.
  - Close 3-6 Nov on Airbnb manually (Corentin).
- **Likely fixed, t-p04-airbnb-minstay** (inference). Two-night stays are no longer offered on the Barking Airbnb:
  - 3-5 Nov (29 Oct: £360) and 18-20 Nov are not returned by the wide search or by a 0.25 km search.
  - Three-night stays are returned (9-12 Nov £497, 10-13 Nov £514, 6-9 Dec £673, 11-14 Dec £681).
  - The minimum-stay setting itself was not seen.
- **HIGH, P20 Airbnb at 0.766x PriceLabs up to 25 Nov, 0.900x from 7 Dec.** Room = total - £150 cleaning (assumed):

  | Stay | Room / PL | Ratio |
  |---|---|---|
  | 31 Oct-2 Nov | 349/455 | 0.767 |
  | 6-9 Nov | 559/730 | 0.766 |
  | 10-13 Nov | 563/735 | 0.766 |
  | 16-19 Nov | 637/832 | 0.766 |
  | **22-25 Nov (23 days out)** | 633/827 | **0.765** |
  | 7-10 Dec | 832/924 | 0.900 |
  | 11-14 Dec | 846/940 | 0.900 |
  | 18-21 Dec | 848/942 | 0.900 |

  - That is a flat 0.90 with an extra 0.85 reaching at least 25 days out. Policy records P20's Airbnb last-minute 15% as 0-14 days only, so the extra cut on 16-25 Nov is **unexplained**.
  - The cause (Smoobu Airbnb pricing rules?) is NOT CHECKED. This is the second day reported.
- **HIGH, P12 Airbnb ratio:** 0.90 flat, about 0.80 inside about 28 days. Room = total - £150:

  | Stay | Room / PL | Ratio |
  |---|---|---|
  | 3-5 Nov | 350/490 | 0.714 |
  | 12-14 Nov | 356/497 | 0.716 |
  | 18-20 Nov | 369/515 | 0.717 |
  | 26-28 Nov (27 days) | 415/575 | 0.722 |
  | 29 Nov-2 Dec (30 days) | 733/814 | 0.900 |
  | 7-10 Dec | 712/791 | 0.900 |
  | 7-13 Dec | 1530/1699 | 0.900 |

  - This is the same shape as the Smoobu default Airbnb rules on Shepherd's Bush (policy `airbnb_smoobu_settings_21oct`). That is an inference: the P12 Airbnb rules have not been seen.

## Plan items and Reyhan conflicts in this batch (overrides and logs read 30 Oct; `get_user_logs` 29-30 Oct = 0 entries for P01/P04/P09/P12/P20)
- **P12 17 Nov, NOT fixed.** It still shows **-2%, min 2** (Reyhan, 28 Oct 12:44Z). Policy `deprioritised.p12_17nov_override` records that Corentin keeps +50%. For Corentin to confirm which stands.
- **P04 min stay 2, NOT fixed** (4th day): +15%, min 2 on 18-20 and 23-25 Nov (27 Oct 12:01Z). This conflicts with policy `P04.min_stay_rule` (never under 3). The Barking Airbnb does not offer 2-night stays (see above); Booking.com was NOT CHECKED.
- **P20 min stay 2, NOT fixed:** 31 Oct-1 Nov at +10% (27 Oct 14:38Z). This conflicts with policy `listing_facts.P20.min_stay` (3 nights to 30 Nov). It is **live on Airbnb**: 31 Oct-2 Nov (2 nights) is bookable at £499. The check-in is tomorrow, so the conflict expires on its own.
- **P04 -7%** on 1-17 Nov and 6-22 Dec (Reyhan, 28 Oct 10:32Z) vs Corentin's -8% (24 Oct). Unchanged; reported only.
- **18 Oct base rises (P01, P09, P12) running effect:**
  - P01: 100% booked to handback.
  - P09: 88% vs 36% booked for 30 days.
  - P12: 57% vs 40% (30 days) but **27% vs 33% (29 Nov-13 Dec)**.
  - **For the 2 Nov base review:** P12's 26 Nov-13 Dec open nights are the place to look (P80-P84 NL, +6.5% to +17% vs band, quality -15%). P09 and P01 have no inventory left to test a base change before handback.

## Comp tables (Airbnb, guest-paid all-in £/night incl. cleaning and fees; checked 2026-10-30; "29 Oct x" = same comp and stay on 29 Oct where it differs by more than £1; "–" = not bookable for that stay in either pass; full source per row in `data/snapshots/2026-10-30/comps.csv`)

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.67 (3)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov |
|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | 261.67 |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 457 | 750 (29 Oct 845) | 447.67 (29 Oct 473) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.47 (150) | none listed | – | – | 202 |
| [1385492120084469276 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1385492120084469276) | 0.45 | 4 | 4.7 (20) | Lift | – | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (55) | Lift | – | – | 376.33 (29 Oct 374.33) |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.61 (28) | Lift/River view/balcony | – | – | 255 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | 374.33 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | 353 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.8 (15) | Lift | 335 | – | – |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.64 | 5 | 4.37 (38) | Paid parking on premises | 384 | 384 | 379 |
| [20404597](https://www.airbnb.co.uk/rooms/20404597) | 0.68 | 6 | 4.65 (23) | Canal view/Lift/River view/Superhost/balcony | 315 | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.63 (25.5) | | **359.50** (4) | **567** (2) | **374.33** (9) |
| **Our pctl (vs median)** | | | | | – | – | – |

### P20 Waterford Court 2BR, max 4 (ours: Airbnb 1791529331262420081, New, 0 reviews); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 31 Oct-2 Nov | 6 Nov-9 Nov | 10 Nov-13 Nov | 16 Nov-19 Nov | 22 Nov-25 Nov | 7 Dec-10 Dec | 11 Dec-14 Dec | 18 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1385492120084469276 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1385492120084469276) | 0.27 | 4 | 4.7 (20) | Lift | – | – | – | – | – | – | – | – | – | – | – |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises | 444.50 | – | – | – | 434.67 | – | 393.33 | – | 393.33 | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (55) | Lift | – | – | 376.33 (29 Oct 374.33) | – | – | 393.67 (29 Oct 363.67) | 335 | 357.33 | 380.67 | 413.67 | 399.67 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – | 424 | 424 | 382.67 | 382.67 | 382.67* | 382.67 | 382.67 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony | – | – | 353 | – | – | – | – | 337 | 361.67 | 463.67 | 479 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises | – | – | 261.67 | – | – | 286 | 261.67 | 261.67 | 261.67 | 276.33 | – |
| [813089760121939738 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/813089760121939738) | 0.59 | 4 | 4.4 (20) | Lift/Paid parking on premises/balcony | – | – | – | – | – | – | – | – | – | – | – |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony | – | – | 333.33 | – | 368.67 | 368.67 | 333.33 | 333.33 | 333.33 | 333.33 | 333.33 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost | – | – | 238.33 (29 Oct 233) | – | – | 244 (29 Oct 247.67) | 213 | 226.33 | – | – | – |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.65 | 5 | 4.37 (38) | Paid parking on premises | 384 | 384 | 379 | 334 | 379 | 379 | 379 | 379 | 379 | – | – |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises | – | – | 250 | – | – | – | 250 | 250 | 250 | 250 | – |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 310 | 270 | 250 | 310 | 290 | 250 | 250 | 263.33* | 270 | 290 | 312 |
| **Ours** | | | | | not bookable | not bookable | not bookable | **249.50** | **236.33** | **237.67** | **262.33** | **261** | **327.33** | **332** | **332.67** |
| **Comp median (n)** | | | 4.66 (18.0) | | **384** (3) | **327** (2) | **333.33** (9) | **322** (2) | **379** (5) | **368.67** (7) | **333.33** (9) | **333.33** (9) | **361.67** (9) | **333.33** (7) | **382.67** (5) |
| **Our pctl (vs median)** | | | | | – | – | – | P0 (-22.5%) | P0 (-37.6%) | P0 (-35.5%) | P44 (-21.3%) | P22 (-21.7%) | P33 (-9.5%) | P43 (-0.4%) | P20 (-13.1%) |

### P04 Barking 2BR, sleeps 6 (ours: Airbnb 1455876748739910219, 4.69 (26)); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 3 Nov-6 Nov | 9 Nov-12 Nov | 10 Nov-13 Nov | 18 Nov-20 Nov | 6 Dec-9 Dec | 11 Dec-14 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | 257.67 | – | 257.67 | 257.67 | – | 260 | 260 |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (23) | Free parking on premises/Superhost/Guest favourite | – | – | 145.67 (29 Oct 148.33) | – | – | 127 | – | – | – |
| [1343991336860365461](https://www.airbnb.co.uk/rooms/1343991336860365461) | 1.81 | 6 | 4.43 (14) | Paid parking on premises | – | – | – | 130 (29 Oct 117) | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.82 (39) | Free parking on premises/Superhost (added 30 Oct) | – | – | – | – | – | – | – | 293.33 | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | 222 | 222 | – | 222 | 222 | 222 | 222 | 222 | 222 |
| [1253486494214857096](https://www.airbnb.co.uk/rooms/1253486494214857096) | 2.43 | 5 | 4.64 (14) | Free parking on premises (added 30 Oct) | – | – | – | – | – | – | 155 | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | **173** | **165.67** | **171.33** | not bookable | **224.33*** | **227** |
| **Comp median (n)** | | | 4.73 (20.5) | | **222** (1) | **222** (1) | **201.67** (2) | **176** (2) | **239.84** (2) | **222** (3) | **188.50** (2) | **260** (3) | **241** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | P50 (-1.7%) | P0 (-30.9%) | P33 (-22.8%) | – | P33 (-13.7%) | P50 (-5.8%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 10 Nov-12 Nov |
|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 169 | 168 | – | 168 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.43 (88) | none listed | 165 | 166.50 (29 Oct 165) | – | 165* |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.73 (22) | none listed | – | – | 185.67 (29 Oct 189.67) | 192.50 (29 Oct 197.50) |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | 200.50 | – | 196.67 | 200.50 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.24 (21) | none listed | – | 168 | – | 161 |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | 244.33 (29 Oct 242.67) | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | **178.50*** |
| **Comp median (n)** | | | 4.58 (24.5) | | **169** (3) | **168** (3) | **196.67** (3) | **168** (5) |
| **Our pctl (vs median)** | | | | | – | – | – | P60 (+6.2%) |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 18 Nov-20 Nov | 26 Nov-28 Nov | 26 Nov-2 Dec | 7 Dec-13 Dec | 11 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.50 | 237.50 | 225 | 237.50 | 237.50 | 212.50 | 212.50 | 237.50 |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (18) | Paid parking on premises | – | – | 311.67 | – | – | 295.83 | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (78) | Superhost | – | – | 204.67 (29 Oct 202.67) | – | – | 213.33 | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | – | – | 205 | – | – | – | – | – |
| [1199115199309731731 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1199115199309731731) | 0.91 | 6 | 4.84 (31) | City skyline view/Lift/Superhost/balcony | – | – | – | – | – | – | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (118) | Superhost/balcony/Guest favourite | – | 252 | 250.67 | 254 | 262.50 | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | 1035 | 1035 | 1033.67 (29 Oct 1032.33) | 1035 | 1035 | 1029.83 | 1031.50 | 1040.50 |
| **Ours** | | | | | not bookable | **250** | not bookable | **259.50** | **282.50** | **268.83** | **280** | **345.50** |
| **Comp median (n)** | | | 4.86 (18) | | **237.50** (1) | **244.75** (2) | **225** (5) | **245.75** (2) | **250** (2) | **213.33** (3) | **212.50** (1) | **237.50** (1) |
| **Our pctl (vs median)** | | | | | – | P50 (+2.1%) | – | P100 (+5.6%) | P100 (+13.0%) | P67 (+26.0%) | P100 (+31.8%) | P100 (+45.5%) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov |
|---|---|---|---|---|---|---|---|
| [1611041940714716070 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1611041940714716070) | 0.5 | 3 | 4.87 (23) | Free parking on premises/Superhost | – | – | – |
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 159.67 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | – | – | 171.67* |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | 160 | 135* | 135 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | 159.67 |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.91 (23) | Free parking on premises/Guest favourite | – | 145 | – |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | 146.67 |
| **Comp median (n)** | | | 4.87 (14) | | **160** (1) | **140** (2) | **159.67** (5) |

### P12 reference band (2BR, 10+ reviews, within 1.3 km, same searches; placeholders 29297702/39790006 excluded)

| Stay | n | Band median | Ours | Our pctl | vs median |
|---|---|---|---|---|---|
| 26 Nov-2 Dec | 6 | 229.33 | 268.83 | P67 | +17.2% |
| 7 Dec-13 Dec | 13 | 263 | 280 | P62 | +6.5% |
| 11 Dec-13 Dec | 7 | 314 | 345.50 | P71 | +10.0% |
| 18 Nov-20 Nov | 6 | 245.75 | 259.50 | P67 | +5.6% |
| 26 Nov-28 Nov | 2 | 250 | 282.50 | P100 | +13.0% |

Comp attributes (lift, view, parking) come from the 25 Oct amenity lists, except the 29-30 Oct additions, whose pages were read on the day added. Ratings and review counts are from today's search cards where returned; otherwise they are carried from 29 Oct. Comp cancellation policies are NOT CHECKED.

## P07 Woolwich, 1-bed
Blocked on purpose (policy). No comps, no advice.

---

Data gaps:
1. **Booking.com NOT CHECKED** (not tried). Comps are Airbnb only, and our Booking.com displayed prices, including the P04 min-2 nights there, are not covered.
2. **Thin comp n.**
   - **P04:** the set is now 6, but no stay has more than 3 priced comps. 593405916827094880 prices £222 on every date.
   - n=1-2 on:
     - P20 31 Oct-2 Nov
     - P04 9-12 Nov and 11-14 Dec
     - P12 stored comps on every open stay except 26 Nov-2 Dec (n=3)
     - P01 3-5 Nov (skewed by 41905186)
     - P15 6-8 Nov and 3-5 Nov
   - **P12 positioning rests on the same-search reference band** (n=2-13, sleeps NOT CHECKED). The stored P12 comps are almost all unavailable for 26 Nov-13 Dec.
3. **Comp availability.**
   - Four stored comps had no bookable stay today: 1385492120084469276, 813089760121939738 and 1199115199309731731 (4th day), and 1611041940714716070 (1st day). Their 60-day availability beyond the checked stays is NOT CHECKED.
   - 29297702 is a placeholder-like rate. It is excluded from medians but stays in the set.
4. **Room-vs-PriceLabs ratios** assume £150 Airbnb cleaning for P12 and P20. The Airbnb rules for P12 and P20 have not been seen, and P04/P09 Airbnb cleaning fees are unknown. Who raised the P09 Airbnb price for 10-12 Nov is NOT CHECKED.
5. **Wide-search completeness.** The wide search missed our own bookable listings on 4 stays. The 0.3 km second pass covered every unpriced comp-stay pair, but the second pass itself has not been validated against a known-bookable comp.
6. **PriceLabs data.**
   - NL percentiles are a market band, not comps. Competitor Listings and Market Dashboard were not used; the raw neighbourhood JSON was not saved.
   - `pl_kpis.csv` occupancy differs from `reservations.csv` for P04 (53% vs 67% for 30 days) and P09 (80% vs 88%). Smoobu is used as truth.
7. **Not analysed.** P15 has no listing of ours; P07 is blocked (policy); P20 is still missing from `build/properties.py`.
