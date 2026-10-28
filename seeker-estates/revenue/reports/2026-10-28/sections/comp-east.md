# Competitor positioning: EAST batch (D = 2026-10-28)

**Method.** I used the same 47 comp ids as 25-27 Oct, with the same search boxes and guest counts: 4 guests for 2-beds, 3 for 1-beds; P04 uses a 2.5 km box and P09 a 1.8 km box.
- **Stays.** The three standard stays from 27 Oct are kept, so all three show a true day-on-day trend:
  - Fri-Sun 30 Oct-1 Nov
  - Tue-Thu 3-5 Nov
  - Tue-Fri 24-27 Nov (D+27, the 30-day point)
- **Extra stays on our open nights:**
  - P04 3-6 Nov (needs min 3)
  - P20 31 Oct-2 Nov. This replaces 31 Oct-3 Nov, because the new 2-6 Nov booking closed 2-3 Nov.
  - P20 and P09 Tue-Thu 10-12 Nov, because their 3-5 Nov nights are booked.
- **Access.** Airbnb was reachable with plain public requests (HTTP 200, same curl as 27 Oct, no workaround). Booking.com was not tried.
- **Price basis.** Prices are what the guest pays on Airbnb, all in: total after any discount, divided by nights, with cleaning and Airbnb fees included. Airbnb shows no separate taxes.
- **Rows written.** 174 comp rows went into the new `data/snapshots/2026-10-28/comps.csv` (header plus comp-east rows, append-only with a file lock). The other sections append their own rows. Five market rows (P01, P04, P09, P12, P20) went into `data/snapshots/2026-10-28/market.csv`.
- **PriceLabs calls.** All read-only and **one at a time**:
  - `get_neighbourhood_data` ×5, all `all_operations_ok = true`
  - `get_user_logs` (East listings, 27-28 Oct)
  - `get_listing_date_overrides` (P12, 22-28 Nov)

**Comp set stability.** All 47 comps are kept and none is replaced.
- **Not returned for 3 days running:** 20404597 (P01) and 1191085742562460545 (P15). Both pages load with HTTP 200 as entire homes. 20404597 went from 22 to **23 reviews** (4.65), so it is still hosting.
- **Not returned for 2 days:** 1385492120084469276 (P01/P20), 813089760121939738 (P20), 1193087690344044898 (P04), 1199115199309731731 (P12). All pages are live; reviews 20/20/18/31.
- **Not returned today only:** 1374450835187037179 (P01, 15 reviews, page live).
- **Back today:** 790672189611831800 (P20) and 1371771992549776701 (P15).
- **60-day availability** of the missing comps was NOT CHECKED. There is no evidence any of them is inactive.
- **Same comp, same stay, change since 27 Oct:** the median is **0.0%** for every ref and stay, except P01 Fri-Sun -7.6% and P01 3-5 Nov +7.4%. Both P01 figures come from n=2 and are driven by 41905186 (684→580 and 677→777). Other moves over £5:
  - 1670196516322802487 (P12), 24-27 Nov: 213→205
  - 53017356 (P12), Fri-Sun: 269→250.50, now showing a strikethrough from £538
  - 1376679869251315227 (P09), 24-27 Nov: 158→152, strikethrough from £515
  - 1418178473526356202, 24-27 Nov: 347→353
  - 1316210326145130709, 24-27 Nov: 368→374
- **Watch, not added (the set is full and nothing is inactive):** Airbnb [1685056866796470494](https://www.airbnb.co.uk/rooms/1685056866796470494), "Canary Wharf: Iconic River Views, Free Parking". It is 2BR, 2 bath, 4.8 (10), Guest favourite, about 0.8 km from P20.
  - Seen in today's P20 searches (4 guests, all-in, checked 28 Oct): 31 Oct-2 Nov £422 (£211/n), 10-12 Nov £491 (£245.50/n), 24-27 Nov £759 (£253/n).
  - It undercuts P20 on every stay. Together with 1418178473526356202 (P01 set, free parking, 4.95), free parking is **not** unique to P20 in the Canary Wharf catchment. That corrects the 27 Oct wording.

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 28 Oct) vs 27 Oct
| Ref | Band (n) | P25/P50/P75/P90 today | 27 Oct | Market occ 30/60 (`pl_kpis.csv` 28 Oct) |
|---|---|---|---|---|
| P01 | 2BR (145) | 222/267/337/426 | 225/273/341/423 | 34% / 27% |
| P04 | 2BR (88) | 141/178/225/263 | 142/180/224/283 | 25% / 20% |
| P09 | 1BR (127) | 115/143/173/221 | 120/143/173/220 | 36% / 31% |
| P12 | 2BR (119) | 173/210/251/301 | 179/217/261/315 | 39% / 33% |
| P20 | 2BR (148) | 222/261/321/414 | 224/270/329/412 | 36% / 29% |

The market is flat to slightly softer: medians fell 0 to 9 across the bands. The NL horizon and whether cleaning is included are not stated by PriceLabs.

## Summary per property
**How to read the columns:**
- **Our price:** our Airbnb all-in price from the same search.
- **Booked 30/60:** share of sellable nights booked, from `prices.csv` 28 Oct. Days 1-30 run 28 Oct-26 Nov and days 31-60 run 27 Nov-26 Dec. Handback nights and the deprioritised P04 2 Dec and P12 17 Nov one-nighters are excluded.
- **NL pctl:** the open-night PriceLabs average placed against the NL band.

| Ref | Our price, same stay (all-in /n) | Comp median (n) | Our comp pctl (vs median) / NL pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market | `recommend` |
|---|---|---|---|---|---|---|---|---|
| P01 | All stays booked (PL 185-203 / 224-225 / 274-305) | 432 (2) / 580.50 (2) / 353.33 (9) | n/a (0 open nights) | 4.67 vs 4.625 | 3 vs 25 (-22) | 0.0 (<5 reviews) | 100% / 100% vs 34% / 27% | raise-signal; nothing to sell before 20 Dec handback |
| P20 | **31 Oct-2 Nov £264 (£528)**; **10-12 Nov £283 (£566)**; **24-27 Nov £250.67 (£752)**; Fri-Sun and 3-5 Nov booked | 322 (2) / 320.50 (7) / 333.33 (9) | **P0 (-18.0%) / P14 (-11.7%) / P33 (-24.8%)**; NL P42 (30), P66 (60) | none vs 4.66 | 0 vs 18 (-18) | 0.0 (no rating) | 22% / 0% vs 36% / 29% | fix-listing (30 and 60) |
| P04 | **3-5 Nov £180 (£360, 2 nights)**; **3-6 Nov £159.67 (£479)**; Fri-Sun booked; 24-27 Nov part booked | 222 (1) / 222 (1) | P0 on n=1 (not usable) / NL P47 (30), P64 (60) | 4.69 vs 4.83 | 26 vs 23 (+3) | -0.056 | 41% / 55% vs 25% / 20% | raise +10% (NL-based, 30 and 60) |
| P09 | **30 Oct-1 Nov £161 (£322, strikethrough from £387)**; **10-12 Nov £156.50 (£313, from £333)**; 3-5 and 24-27 Nov booked | 166.50 (2) / 179.25 (4) | **P0 (-3.3%) / P0 (-12.7%)**; NL P51 (30) | 5.0 vs 4.58 | **3** vs 24.5 (-21.5) | 0.0 (<5 reviews) | 79% / n/a (handback 26 Nov) vs 36% / 31% | 30: raise +10% |
| P12 | **3-5 Nov £245.50 (£491)**; **24-27 Nov £272.33 (£817)**; Fri-Sun booked | 252 (3) / 237.83 (6) | **P33 (-2.6%) / P67 (+14.5%)**; NL P77 (30), P85 (60) | 4.27 vs 4.88 | 15 vs 18 (-3) | **-0.15** (cap) | 61% / 24% vs 39% / 33% | 30: raise +5% (NL P77; +10% on comp P33); 60: **lower -7%** (NL P85) |
| P15 | No listing of ours | 163.75 (4) / 140 (2) / 161.17 (4) | n/a | n/a vs 4.87 | n/a | n/a | n/a | n/a |
| P07 | Blocked on purpose (policy) | not analysed | | | | | | |

## Supported positioning (one line each, then reasoning)
- **P12: supported positioning is -15% vs comp median (`quality_premium` -0.15). The 22-28 Nov week sits at +14.5%, so a cut of about 25% on those dates is still supported. The fixed override (plan a-p12-2228nov) is still NOT set.**
  - 24-27 Nov: £272.33 all-in vs £237.83 (n=6, P67). Yesterday it was +17.3% at £279. The comp prices are unchanged (0.0%). Our Airbnb total fell £837→£817 even though PL rose.
  - `get_listing_date_overrides` for 22-28 Nov returns **min_stay 2 only, no price**; the last update was 26 Oct 10:11Z. `get_user_logs` shows no P12 entry on 27-28 Oct.
  - PL on 22-28 Nov is 277/278/258/276/287/299/321, avg £285 (`prices.csv`). That is up from £277 on 27 Oct and £269 on 26 Oct. All 7 nights are still open.
  - Target for 24-27 Nov:
    - At the comp median (£237.83 all-in, assuming £150 cleaning), PL needs about £231/night at today's observed 0.81x room/PL, or £209 at the 27 Oct ratio of 0.90x. That is -16% to -24% vs £274 now.
    - At the quality-supported level (-15%, £202 all-in), PL needs about £169-£188 (at 0.90x and 0.81x respectively).
  - 3-5 Nov: £245.50 vs £252 (P33, -2.6%), 6 days out. Demand (61% vs 39% booked) says raise and quality says -15%, so **hold**.
- **P20: hold, do not cut further. `recommend` = fix-listing on both windows. We are P0-P33 on every open stay and still 22% booked vs 36%.**
  - Today's lower prices on 13-30 Nov come from **reyhan's -10% override on 13-30 Nov, min 3** (`get_user_logs` 27 Oct 14:42Z; it replaced a -5% set at 12:00Z). That override explains the PL drop on 24-26 Nov: 257/262/291 → 240/245/256.
  - Other overrides reyhan set the same day:
    - 6-8 Nov: -10%, min 3
    - 1-20 Dec: -5%, min 3
    - 31 Oct-1 Nov: +10%, min 2. This is the last of 3 writes that day (-5%, then +5%, then +10%).
  - The new 2-6 Nov booking took the 3-5 Nov stay off the market. Its paid-vs-PL is the Dispatcher's/channel's item.
  - Free parking is not unique (see the watch comp above, 4.8 (10), £211-£253/n), so we cannot count on parking to justify a premium. The gap is still reviews (0 vs 18) and conversion, not price.
- **P09: raise 10-12 Nov toward the comp median, about +10% (all-in about £170-£179); hold 30 Oct-1 Nov (2 days out).**
  - 10-12 Nov: £156.50 vs £179.25 (n=4, P0, -12.7%). We are 79% booked vs 36%, and `recommend` gives raise +10%.
  - Rating is 5.0 but only 3 reviews (up from 2 on 27 Oct), so `quality_premium` = 0.
  - Only 6 open nights remain before the 26 Nov handback: 29-31 Oct and 10-12 Nov.
  - The Airbnb page shows a strikethrough on both stays: -17% on 30 Oct-1 Nov and -6% on 10-12 Nov. Reported only (policy `deprioritised.airbnb_rules_p09`).
- **P04: hold on price.** The comp set prices only one comp per stay, which is too thin to back `recommend`'s NL-based +10%. Quality supports about -6% vs the comp median.
  - Today's PL on 1-17 Nov reflects reyhan's -5% override (27 Oct 12:01Z). It replaced the -3% from 26 Oct; Corentin's 24 Oct figure was -8%. Reported as fact, no position taken.
- **P01: no action.** There are 0 sellable nights before the 20 Dec handback.
- **P15: reference only.** The 1-bed median near Devons Road is £140-£164 all-in.

## Changes in PriceLabs logs (27 Oct, reyhan@) that touch standing decisions
- **P04 min stay 2 is still set** on 18-20 Nov and 23-25 Nov, now re-set as +15% overrides with min 2 (27 Oct 12:01Z). `prices.csv` shows 18-19 Nov and 23-24 Nov open with min 2. policy.json `P04.min_stay_rule` says "Never open for less than 3 nights". This was raised on 27 Oct, was re-applied on 27 Oct afternoon, and is not fixed.
- **P20 min stay 2 is still set** on 31 Oct-1 Nov and 9-12 Nov (27 Oct overrides). policy `P20.min_stay` says 3 nights from 25 Oct to 30 Nov. Reported for confirmation.

## Channel checks found while pricing (Airbnb, same search; room = total minus assumed £150 cleaning for P12/P20)
- **P04 Airbnb is not following PriceLabs.** Today's PL on 3-5 Nov is 159/160 (165/166 on 27 Oct), but the Airbnb totals did not move: £360 for 2 nights, £479 for 3 nights. The 2-night stay is still bookable on Airbnb while PL/Smoobu min stay is 3. This adds to the 27 Oct evidence that the Barking Airbnb listing, on a separate account, does not take price or min stay from Smoobu (inference; the account link is unconfirmed per policy).
- **P20:**
  - 31 Oct-2 Nov: room £378 vs PL £494 = 0.765x.
  - 10-12 Nov: £416 vs £543 = 0.766x.
  - Both equal 0.90 x 0.85, so Airbnb's last-minute 15% (0-14 days, policy) explains the 0.85.
  - 24-27 Nov (27 days out): £602 vs £741 = **0.81x**, down from 0.90x on 27 Oct. **Unexplained**: there was no log entry for an Airbnb-side change, and the cause is NOT CHECKED.
- **P12:**
  - 24-27 Nov: room £667 vs PL £821 = 0.81x (0.87x on 27 Oct). The Airbnb total fell while PL rose.
  - 3-5 Nov: £341 vs £478 = 0.71x.
  - P12's Airbnb rules have not been seen, so both are **unexplained**.
- **Our pages (28 Oct):** P09 now has **3 reviews** (5.0). The others are unchanged: P01 4.67 (3), P04 4.69 (26), P12 4.27 (15), P20 new (0). The cancellation policy was not exposed in the page data: NOT CHECKED.

## Comp tables (Airbnb, guest-paid all-in £/night incl. cleaning and fees, no separate taxes shown; 4 guests for 2BR, 3 for 1BR; checked 2026-10-28; "27 Oct x" = same comp and stay on 27 Oct where it differs by more than £1; full source per row in `data/snapshots/2026-10-28/comps.csv`)

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.67 (3))

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 3-5 Nov | 24-27 Nov (3 n) |
|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | n/a | n/a | 261.67 |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 580 (27 Oct 684) | 777 (27 Oct 677) | 493 (27 Oct 509.67) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.47 (148) | none listed | n/a | n/a | 204.33 (27 Oct 207.67) |
| [1385492120084469276 (not returned today)](https://www.airbnb.co.uk/rooms/1385492120084469276) | 0.45 | 4 | 4.7 (20) | Lift | n/a | n/a | n/a |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (55) | Lift | n/a | n/a | 374.33 (27 Oct 367.67) |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.61 (28) | Lift/River view/balcony | n/a | n/a | 255 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | n/a | n/a | 382.67 |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | n/a | n/a | 353.33 (27 Oct 347) |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | n/a | n/a | 353 |
| [1374450835187037179 (not returned today)](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.8 (15) | Lift | n/a | n/a | n/a |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.64 | 5 | 4.38 (37) | Paid parking on premises | 284 | 384 | 379 |
| [20404597 (not returned today)](https://www.airbnb.co.uk/rooms/20404597) | 0.68 | 6 | 4.64 (22) | Canal view/Lift/River view/Superhost/balcony | n/a | n/a | n/a |
| **Ours (Airbnb, same search)** | | | | | not open/not listed | not open/not listed | not open/not listed |
| **Comp median (n priced)** | | | 4.625 (25.0) | | **432** (2) | **580.50** (2) | **353.33** (9) |

### P20 Waterford Court 2BR, max 4 (ours: 1791529331262420081, New, 0 reviews, free parking + balcony listed)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 3-5 Nov | 24-27 Nov (3 n) | Sat-Mon 31 Oct-2 Nov | Tue-Thu 10-12 Nov |
|---|---|---|---|---|---|---|---|---|---|
| [1385492120084469276 (not returned today)](https://www.airbnb.co.uk/rooms/1385492120084469276) | 0.27 | 4 | 4.7 (20) | Lift | n/a | n/a | n/a | n/a | n/a |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises | n/a | n/a | n/a | n/a | 444.50 |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (55) | Lift | n/a | n/a | 374.33 (27 Oct 367.67) | n/a | 381 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | n/a | n/a | 382.67 | n/a | n/a |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony | n/a | n/a | 353 | n/a | 320.50 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises | n/a | n/a | 261.67 | n/a | 306 |
| [813089760121939738 (not returned today)](https://www.airbnb.co.uk/rooms/813089760121939738) | 0.59 | 4 | 4.4 (20) | Lift/Paid parking on premises/balcony | n/a | n/a | n/a | n/a | n/a |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony | n/a | n/a | 333.33 | n/a | n/a |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.75 (16) | Lift/River view/Superhost | n/a | n/a | 213.33 | n/a | n/a |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.65 | 5 | 4.38 (37) | Paid parking on premises | 284 | 384 | 379 | 334 | 384 |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises | n/a | n/a | 250 | n/a | 288.50 |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 310 | 270 | 250 | 310 | 270 |
| **Ours (Airbnb, same search)** | | | | | not open/not listed | not open/not listed | **250.67** | **264** | **283** |
| **Comp median (n priced)** | | | 4.66 (18.0) | | **297** (2) | **327** (2) | **333.33** (9) | **322** (2) | **320.50** (7) |

### P04 Barking 2BR, sleeps 6 (ours: 1455876748739910219, 4.69 (26); 2.5 km box)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 3-5 Nov | 24-27 Nov (3 n) | 3-6 Nov (3 n) |
|---|---|---|---|---|---|---|---|---|
| [1193087690344044898 (not returned today)](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | n/a | n/a | n/a | n/a |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (23) | Free parking on premises/Superhost/Guest favourite | n/a | n/a | 146.67 | n/a |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | n/a | 222 | n/a | 222 |
| **Ours (Airbnb, same search)** | | | | | not open/not listed | **180** | not open/not listed | **159.67** |
| **Comp median (n priced)** | | | 4.83 (23) | | n/a (0) | **222** (1) | **146.67** (1) | **222** (1) |

### P09 Greenwich 1BR, sleeps 4 (ours: 1681417771483132994, 5.0 (3); 1.8 km box, 3 guests)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 3-5 Nov | 24-27 Nov (3 n) | Tue-Thu 10-12 Nov |
|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 168 | 169 | n/a | n/a |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.43 (88) | none listed | 165 | 165 | n/a | 165 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.73 (22) | none listed | n/a | n/a | 152 (27 Oct 158.33) | 193.50 |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | n/a | n/a | 196.67 | 200.50 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.24 (21) | none listed | n/a | n/a | n/a | 165 |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | n/a | n/a | 242.67 | n/a |
| **Ours (Airbnb, same search)** | | | | | **161** | not open/not listed | not open/not listed | **156.50** |
| **Comp median (n priced)** | | | 4.58 (24.5) | | **166.50** (2) | **167** (2) | **196.67** (3) | **179.25** (4) |

### P12 Mile End 2BR, sleeps 6 (ours: 1414703602412646285, 4.27 (15))

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 3-5 Nov | 24-27 Nov (3 n) |
|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.50 | 237.50 | 225 |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (18) | Paid parking on premises | n/a | n/a | 311.67 |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.88 (77) | Superhost | n/a | n/a | 196.33 (27 Oct 199.33) |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | n/a | n/a | 205 (27 Oct 213.33) |
| [1199115199309731731 (not returned today)](https://www.airbnb.co.uk/rooms/1199115199309731731) | 0.91 | 6 | 4.84 (31) | City skyline view/Lift/Superhost/balcony | n/a | n/a | n/a |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (118) | Superhost/balcony/Guest favourite | 250.50 (27 Oct 269) | 252 | 250.67 |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony | 1035 | 1038 | 1039 |
| **Ours (Airbnb, same search)** | | | | | not open/not listed | **245.50** | **272.33** |
| **Comp median (n priced)** | | | 4.88 (18) | | **250.50** (3) | **252** (3) | **237.83** (6) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours; 3 guests)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 3-5 Nov | 24-27 Nov (3 n) |
|---|---|---|---|---|---|---|---|
| [1611041940714716070](https://www.airbnb.co.uk/rooms/1611041940714716070) | 0.5 | 3 | 4.87 (23) | Free parking on premises/Superhost | 188.50 | n/a | n/a |
| [1191085742562460545 (not returned today)](https://www.airbnb.co.uk/rooms/1191085742562460545) | 0.64 | 4 | 4.71 (31) | none listed | n/a | n/a | n/a |
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | n/a | n/a | 159.67 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | n/a | n/a | 171.67 |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | 160 | 135 | 135 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | 167.50 | n/a | 162.67 (27 Oct 159.67) |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.91 (23) | Free parking on premises/Guest favourite | 145 | 145 | n/a |
| **Comp median (n priced)** | | | 4.87 (15) | | **163.75** (4) | **140** (2) | **161.17** (4) |

Ratings and review counts for comps that were not returned today are carried from 27 Oct. Today's page reads: 20404597 4.65 (23), 1191085742562460545 4.71 (31), 1385492120084469276 4.7 (20), 813089760121939738 4.4 (20), 1193087690344044898 4.83 (18), 1199115199309731731 4.84 (31), 1374450835187037179 4.8 (15).

## P07 Woolwich, 1-bed
Blocked on purpose (policy). No comps, no advice.

---

Data gaps:
1. **Booking.com NOT CHECKED** (not tried; blocked on 25 Oct). Comps are Airbnb only, and our Booking.com displayed prices are not covered.
2. **Thin comp n.**
   - P04 has 1 priced comp per stay, so its comp percentile is not usable.
   - n=2 on: P20 31 Oct-2 Nov, P09 Fri-Sun, P12 Fri-Sun (n=3), and P01 Fri-Sun and 3-5 Nov. The P01 medians are skewed by 41905186.
3. **Comp availability.** Seven comps were not returned today (two of them for 3 days). Their pages are live, but 60-day availability is NOT CHECKED. Comp cancellation policies are NOT CHECKED. Comp attributes (lift, view, parking) come from the 25 Oct amenity lists.
4. **Room-vs-PL ratios** assume £150 cleaning for P12 and P20; Airbnb's breakdown now shows only an all-in nightly figure. The P20 24-27 Nov 0.81x and the P12 0.71x/0.81x ratios are unexplained (Airbnb rules not seen). The P04 Airbnb fee structure was not seen.
5. **PriceLabs.** Competitor Listings and Market Dashboard are not available, so NL percentiles are a market band, not comps. Their horizon and cleaning inclusion are unstated. The raw neighbourhood JSON was not saved (summary mode; the numbers are in `market.csv`).
6. **Other.** Watch comp 1685056866796470494 is not in the stored set (reference only). P20 is still missing from `build/properties.py`. P15 has no listing. P07 was not analysed (policy).
