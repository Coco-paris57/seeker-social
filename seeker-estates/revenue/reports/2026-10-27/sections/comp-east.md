# Competitor positioning: EAST batch (D = 2026-10-27)

**Method.** I used the same 47 comp ids as 25 and 26 Oct, with the same search boxes and guest counts (4 guests for 2-beds, 3 for 1-beds).
- **Stays.** Fri-Sun 30 Oct-1 Nov and 24-27 Nov are kept from 26 Oct, so those two show a true day-on-day trend. Midweek rolls to Tue-Thu 3-5 Nov, because 27-29 Oct starts today.
- **Extra 3-night stays** where our min stay or the open nights need them: P04 3-6 Nov and P20 31 Oct-3 Nov.
- **Access.** Airbnb was reachable with plain requests (HTTP 200, same curl as 26 Oct, no workaround). Booking.com was not tried.
- **Price basis.** Prices are what the guest pays on Airbnb, all in: total after any discount, divided by nights, with cleaning and Airbnb fees included.
- **Rows written.** 156 comp rows appended to `data/snapshots/2026-10-27/comps.csv` after comp-west's 55; nothing overwritten. Market rows for P01, P04, P09, P12 and P20 appended to `market.csv` after the P13 and P10 rows.
- **PriceLabs.** `get_neighbourhood_data` was called five times, **one at a time**; all returned `all_operations_ok = true`. I also called `get_user_logs` (East, 26-27 Oct) and `get_listing_date_overrides` (P12, 1 Nov-13 Dec). Everything was read-only.

**Comp set stability.** All 47 comps are kept.
- **Not returned for 2 days running:** 20404597 (P01) and 1191085742562460545 (P15). Both listing pages still load (HTTP 200, 22 and 31 reviews), so neither is inactive and both stay. Whether they have availability in the next 60 days was NOT CHECKED.
- **Not returned today only:** 1385492120084469276 (P01/P20), 790672189611831800, 813089760121939738 (P20), 1193087690344044898 (P04), 1199115199309731731 (P12), 1371771992549776701 (P15).
- **Back today:** 593405916827094880 (P04), which was missing on 26 Oct.
- **Same comp, same stay, change since 26 Oct:** median **0.0%** for every ref, on both repeat stays. The moves over £5 are:
  - 41905186, 24-27 Nov: 446→510
  - 1005647070760859698: 287→262
  - 1617544963466664181 (P15): 173→160
  - 1120913156789373408 (P12): 209→199
  - 1316210326145130709: 375→368

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 27 Oct) vs 26 Oct
| Ref | Band (n) | P25/P50/P75/P90 today | 26 Oct | Market occ 30/60 (`pl_kpis.csv`) |
|---|---|---|---|---|
| P01 | 2BR (145) | 225/273/341/423 | 224/272/339/419 | 35% / 27% |
| P04 | 2BR (86) | 142/180/224/283 | 142/179/223/282 | 25% / 20% |
| P09 | 1BR (128) | 120/143/173/220 | 120/142/173/220 | 36% / 31% |
| P12 | 2BR (120) | 179/217/261/315 | 179/213/258/296 | 39% / 33% |
| P20 | 2BR (149) | 224/270/329/412 | 224/268/328/407 | 36% / 28% |

The market is flat for a fifth day. P12's band P90 moved up (+19), the only notable change.

## Summary per property
**How to read the columns:**
- **Our price:** our Airbnb all-in price from the same search. If our flat was not open for that stay, I show the PriceLabs nightly instead (PL, cleaning not included).
- **Booked 30/60:** share of sellable nights booked, from `prices.csv` 27 Oct. Days 1-30 run 27 Oct-25 Nov and days 31-60 run 26 Nov-25 Dec. Handback nights and the deprioritised P04 2 Dec and P12 17 Nov one-nighters are left out.

| Ref | Our price, same stay | Comp median (n) | Our comp pctl / NL pctl (open-night avg, next 30) | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market | `recommend` |
|---|---|---|---|---|---|---|---|---|
| P01 | All stays booked (PL 192-212 / 235-237 / 267-295) | 335 (3) / 530.50 (2) / 353 (9) | n/a (0 open nights) | 4.67 vs 4.625 | 3 vs 25 (-22) | 0.0 (<5 reviews) | 100% / 100% vs 35% / 27% | raise-signal; nothing to sell before 20 Dec handback |
| P20 | **3-5 Nov £267.00 (£534)**; **24-27 Nov £293.00 (£879)**; **31 Oct-3 Nov £238.33 (£715)**; Fri-Sun not open (30 Oct booked) | 327 (2) / 343.17 (8) / 396.34 (4) | **P0 (-18.3%) / P38 (-14.6%) / P0 (-39.9%)**; NL P40 | none vs 4.66 | 0 vs 18 (-18) | 0.0 (no rating) | 11% / 0% vs 36% / 28% | fix-listing on both windows |
| P04 | **3-5 Nov £180.00 (£360, 2 nights, see channel check)**; **3-6 Nov £159.67 (£479)**; Fri-Sun booked; 24-27 Nov part booked | 222 (1) / 222 (1) / 146.67 (1) | P0 on n=1 (not usable) / NL P52 | 4.69 vs 4.83 | 26 vs 23 (+3) | -0.056 | 41% / 55% vs 25% / 20% | raise +10% (NL P52; 30 and 60) |
| P09 | **30 Oct-1 Nov £181.00 (£362)**, 2-night stays open again (min 2); 3-5 Nov and 24-27 Nov booked | 166.50 (2) / 169 (3) / 196.67 (3) | **P100 (+8.7%, n=2)** / NL P50 | 5.0 vs 4.58 | 2 vs 24.5 (-22.5) | 0.0 (2 reviews) | 76% / 100% vs 36% / 31% | 30: raise +10% (NL P50) / +5% (comp P100) |
| P12 | **3-5 Nov £254.50 (£509)**; **24-27 Nov £279.00 (£837)** (found in the 3-guest P15 search, not the 4-guest P12 one); Fri-Sun booked | 269 (3) / 244.75 (4) / 237.84 (6) | **P75 (+4.0%) / P67 (+17.3%)**; NL P72 (30), P80 (60) | 4.27 vs 4.88 | 15 vs 18 (-3) | **-0.15** (cap) | 64% / 22% vs 39% / 33% | 30: raise +10% (NL P72) / +5% (comp P75); 60: lower -7% (NL P80) |
| P15 | No listing of ours | 163.75 (4) / 140 (2) / 159.67 (3) | n/a | n/a vs 4.87 | n/a | n/a | n/a | n/a |
| P07 | Blocked on purpose (policy) | not analysed | | | | | | |

## Supported positioning (one line each, then reasoning)
- **P12: the 22-29 Nov week is still about +17% over comps; a cut of about 20% on those dates is still supported, and the planned fixed override has not been set.**
  - 24-27 Nov: £279 all-in vs comp median £237.84 (n=6, P67). `quality_premium` -0.15 supports about 15% below the median. Yesterday the gap was +23.6% vs 225 (n=7), and comp prices are unchanged (0.0%).
  - The 26 Oct 10:11Z reyhan override on 22 Nov-13 Dec (`get_user_logs`) sets **min stay 2 only, no price**: `get_listing_date_overrides` shows no price on any of those dates. So the 26 Oct plan item a-p12-2228nov (fixed overrides at market median) is NOT done.
  - PL on 22-28 Nov is 269/273/252/272/269/298/309, avg £277 (`prices.csv`), up from £269 on 26 Oct. All 7 nights are still open.
  - To reach the comp median on Airbnb, PL on 24-26 Nov would need to average about £209 vs £264 now (-21%). That assumes Airbnb room = 0.90x PL and £150 cleaning.
  - `recommend` near-term says raise, but only because of the booked nights before 22 Nov. The 31-60 window says lower -7%. The new Booking.com 4-8 Dec booking at about £279/n (Dispatcher) is outside this week.
- **P20: hold, do not cut further. We are now the cheapest or near-cheapest in the set on every open stay, and still 11% booked vs 36%.**
  - 31 Oct-3 Nov is £238 vs £396 (P0). 3-5 Nov is £267 vs £327 (P0). 24-27 Nov is £293 vs £343 (P38).
  - Free on-site parking is still unique in the set. `recommend` = fix-listing: this is conversion or visibility (new listing, 0 reviews), not price.
  - PL 24-26 Nov fell again: 263/287/304 → 257/262/291 (-5.2%). The cause was NOT CHECKED: there is no log entry for those dates.
- **P09: hold.** 30-31 Oct is 3 days out, and we already show £181 vs £166.50 (n=2, P100) with 2 reviews.
  - reyhan re-set the 26 Oct-12 Nov override to -5% with min stay 2 (26 Oct 18:41Z), so 2-night stays are open again. Only 7 nights are left to sell before the booked run and the 26 Nov handback.
  - `recommend`'s +5/+10% rests on n=2 comps; a raise is not supported.
- **P04: hold on price; the comp set is too thin (one comp priced per stay) to back `recommend`'s +10%.** The real issue today is min stay, below.
- **P01: no action.** There are 0 sellable nights before the 20 Dec handback.
- **P15: reference only.** The 1-bed median near Devons Road is £140-164 all-in.

## Changes found in PriceLabs logs (26 Oct, reyhan@) that touch standing decisions
- **P04 min stay 2 on gap nights.** Overrides of +25% with **min stay 2** were set on 18-20 Nov and 23-25 Nov (18:44Z). `prices.csv` shows 18-19 and 23-24 Nov open with min 2, between bookings. policy.json `P04.min_stay_rule` says: "Never open for less than 3 nights (Corentin 24 Oct)." This contradicts the standing rule; Corentin needs to confirm.
- **P04 1-25 Nov discount changed.** Corentin's -8% (policy `price_changes` 24 Oct) was replaced: -2% on 1-24 Nov (10:21Z), then **-3% on 1-17 Nov** (18:44Z), plus -3% on 6-22 Dec. PL 1-10 Nov is now £162-166, and 11-13 Nov £208-214. Reported as fact, no position taken.
- **P20 min stay 2 on 2-5 Nov and 9-12 Nov** (10:20Z). policy `P20.min_stay` says 3 nights from 25 Oct to 30 Nov. Reported for confirmation, not as an error.

## Channel checks found while pricing (Airbnb, same search; room = total minus assumed cleaning)
- **P04 is bookable on Airbnb for 2 nights (3-5 Nov, £360 total) while PriceLabs/Smoobu min stay on 3-4 Nov is 3** (`prices.csv`). The Barking Airbnb listing sits on a separate account (policy). It looks like it does not take min stay from Smoobu. The 19-20 Dec 1-night Airbnb row in `reservations.csv` points the same way (inference). This breaks the "never under 3 nights" rule on Airbnb.
  - Implied from the 2- and 3-night totals: cleaning about £118 and room about 0.73x PL. This is an inference; Barking's Airbnb fees were not seen.
- **P20:** 24-27 Nov room £729 vs PL £810 = **0.90x**, the third day running. 31 Oct-3 Nov room £565 vs PL £738 = 0.766x, and 3-5 Nov £384 vs £501 = 0.766x. Both = 0.90 x 0.85: Airbnb's 15% last-minute discount (0-14 days, policy) explains the 0.85. **The 0.90 part is still unexplained.**
- **P12:** 24-27 Nov room £687 vs today's PL £793 = 0.87x. Against 26 Oct PL (£760) it is 0.90x, and the Airbnb total barely moved (£834→£837). That suggests Airbnb has not yet taken today's PL rise (sync timing NOT CHECKED).
  - 3-5 Nov room £359 vs PL £484 = 0.74x (7 days out). P12's Airbnb rules have not been seen; **unexplained** beyond a likely last-minute rule.
- **P09:** 30 Oct-1 Nov room about £237 vs PL £278 = 0.85x. Reported only (policy `deprioritised.airbnb_rules_p09`).
- **Our pages (re-read 27 Oct):** ratings and review counts unchanged (P01 4.67/3, P04 4.69/26, P09 5.0/2, P12 4.27/15, P20 none).

## Comp tables (Airbnb, guest-paid all-in £/night incl. cleaning and fees, no separate taxes shown; checked 2026-10-27; "26 Oct x" = same comp and stay on 26 Oct where it differs by more than £1; full source per row in `comps.csv`)

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.67 (3))

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 3-5 Nov | 24-27 Nov (3 n) |
|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | n/a | n/a | 261.67 (26 Oct 286.67) |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 684 (26 Oct 652) | 677 | 509.67 (26 Oct 446.33) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.46 (147) | none listed | n/a | n/a | 207.67 |
| [1385492120084469276 (not returned today)](https://www.airbnb.co.uk/rooms/1385492120084469276) | 0.45 | 4 | 4.7 (20) | Lift | n/a | n/a | n/a |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (55) | Lift | n/a | n/a | 367.67 (26 Oct 375) |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.61 (28) | Lift/River view/balcony | n/a | n/a | 255 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | n/a | n/a | 382.67 |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | n/a | n/a | 347 (26 Oct 342) |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | n/a | n/a | 353 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.8 (15) | Lift | 335 | n/a | n/a |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.64 | 5 | 4.38 (37) | Paid parking on premises | 284 | 384 | 379 |
| [20404597 (not returned today)](https://www.airbnb.co.uk/rooms/20404597) | 0.68 | 6 | 4.64 (22) | Canal view/Lift/River view/Superhost/balcony | n/a | n/a | n/a |
| **Ours (Airbnb, same search)** | | | | | not open/not listed | not open/not listed | not open/not listed |
| **Comp median (n priced)** | | | 4.625 (25.0) | | **335** (3) | **530.50** (2) | **353** (9) |

### P20 Waterford Court 2BR, max 4 (ours: 1791529331262420081, New, 0 reviews, free parking + balcony listed)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 3-5 Nov | 24-27 Nov (3 n) | 31 Oct-3 Nov (3 n) |
|---|---|---|---|---|---|---|---|---|
| [1385492120084469276 (not returned today)](https://www.airbnb.co.uk/rooms/1385492120084469276) | 0.27 | 4 | 4.7 (20) | Lift | n/a | n/a | n/a | n/a |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises | 444.50 | n/a | n/a | 434.67 |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (55) | Lift | n/a | n/a | 367.67 (26 Oct 375) | n/a |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | n/a | n/a | 382.67 | 424 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony | n/a | n/a | 353 | n/a |
| [790672189611831800 (not returned today)](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises | n/a | n/a | n/a | n/a |
| [813089760121939738 (not returned today)](https://www.airbnb.co.uk/rooms/813089760121939738) | 0.59 | 4 | 4.4 (20) | Lift/Paid parking on premises/balcony | n/a | n/a | n/a | n/a |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony | n/a | n/a | 333.33 | 368.67 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.75 (16) | Lift/River view/Superhost | n/a | n/a | 213 | n/a |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.65 | 5 | 4.38 (37) | Paid parking on premises | 284 | 384 | 379 | 345.67 |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises | n/a | n/a | 250 | n/a |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 310 | 270 | 250 | n/a |
| **Ours (Airbnb, same search)** | | | | | not open/not listed | **267** | **293** | **238.33** |
| **Comp median (n priced)** | | | 4.66 (18.0) | | **310** (3) | **327** (2) | **343.16** (8) | **396.34** (4) |

### P04 Barking 2BR, sleeps 6 (ours: 1455876748739910219, 4.69 (26); 2.5 km box)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 3-5 Nov | 24-27 Nov (3 n) | 3-6 Nov (3 n) |
|---|---|---|---|---|---|---|---|---|
| [1193087690344044898 (not returned today)](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | n/a | n/a | n/a | n/a |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (23) | Free parking on premises/Superhost/Guest favourite | n/a | n/a | 146.67 (26 Oct 151.67) | n/a |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | n/a | 222 | n/a | 222 |
| **Ours (Airbnb, same search)** | | | | | not open/not listed | **180** | not open/not listed | **159.67** |
| **Comp median (n priced)** | | | 4.83 (23) | | n/a (0) | **222** (1) | **146.67** (1) | **222** (1) |

### P09 Greenwich 1BR, sleeps 4 (ours: 1681417771483132994, 5.0 (2); 1.8 km box, 3 guests)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 3-5 Nov | 24-27 Nov (3 n) |
|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 168 | 169 | n/a |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.43 (88) | none listed | 165 | 165 | n/a |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.73 (22) | none listed | n/a | n/a | 158.33 (26 Oct 162.33) |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | n/a | n/a | 196.67 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.24 (21) | none listed | n/a | 172.50 | n/a |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | n/a | n/a | 242.67 |
| **Ours (Airbnb, same search)** | | | | | **181** | not open/not listed | not open/not listed |
| **Comp median (n priced)** | | | 4.58 (24.5) | | **166.50** (2) | **169** (3) | **196.67** (3) |

### P12 Mile End 2BR, sleeps 6 (ours: 1414703602412646285, 4.27 (15))

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 3-5 Nov | 24-27 Nov (3 n) |
|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.50 | 237.50 | 225 |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (18) | Paid parking on premises | n/a | n/a | 311.67 |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.88 (77) | Superhost | n/a | n/a | 199.33 (26 Oct 209.33) |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | n/a | 210 | 213.33 |
| [1199115199309731731 (not returned today)](https://www.airbnb.co.uk/rooms/1199115199309731731) | 0.91 | 6 | 4.84 (31) | City skyline view/Lift/Superhost/balcony | n/a | n/a | n/a |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (118) | Superhost/balcony/Guest favourite | 269 | 252 | 250.67 |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony | 1035 | 1038 | 1039 (26 Oct 1032.33) |
| **Ours (Airbnb, same search)** | | | | | not open/not listed | **254.50** | **279** |
| **Comp median (n priced)** | | | 4.88 (18) | | **269** (3) | **244.75** (4) | **237.83** (6) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours; 3 guests)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 3-5 Nov | 24-27 Nov (3 n) |
|---|---|---|---|---|---|---|---|
| [1611041940714716070](https://www.airbnb.co.uk/rooms/1611041940714716070) | 0.5 | 3 | 4.87 (23) | Free parking on premises/Superhost | 188.50 | n/a | n/a |
| [1191085742562460545 (not returned today)](https://www.airbnb.co.uk/rooms/1191085742562460545) | 0.64 | 4 | 4.71 (31) | none listed | n/a | n/a | n/a |
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | n/a | n/a | 159.67 (26 Oct 172.67) |
| [1371771992549776701 (not returned today)](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | n/a | n/a | n/a |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | 160 | 135 | 135 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | 167.50 | n/a | 159.67 |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.91 (23) | Free parking on premises/Guest favourite | 145 | 145 | n/a |
| **Comp median (n priced)** | | | 4.87 (15) | | **163.75** (4) | **140** (2) | **159.67** (3) |

## P07 Woolwich, 1-bed
Blocked on purpose (policy). No comps, no advice.

---

Data gaps:
1. **Booking.com NOT CHECKED** (blocked 25 Oct, not retried). Comps are Airbnb only, and our Booking.com displayed prices are not covered.
2. **Thin comp n.** P04 has 1 priced comp per stay; P09 Fri-Sun has n=2; P20 and P01 3-5 Nov have n=2. The P01 3-5 Nov median (530.50) is skewed by 41905186 (£677).
3. **P12 24-27 Nov "ours"** came from a 3-guest search (P15 box), not 4 guests. Any extra-guest fee would be missing.
4. **Comp availability.** 20404597 and 1191085742562460545 were not returned for 2 days; their 60-day availability was NOT CHECKED (pages live).
5. **PL drops on P20 24-26 Nov** (two days running) have an unknown cause: NOT CHECKED.
6. **Room-vs-PL ratios** assume cleaning of £150 (P12, P20) and £125 (P09). P04 Airbnb fees were not seen. The P12 Airbnb sync timing was NOT CHECKED.
7. **Comp attributes** (lift, view, parking) come from the 25 Oct Airbnb amenity lists. Comp cancellation policies NOT CHECKED. PriceLabs Competitor Listings and Market Dashboard are not available.
8. **Other gaps.** Neighbourhood raw JSON was not saved (summary mode; numbers in `market.csv`). P20 is still missing from `build/properties.py`. P15 has no listing. P07 was not analysed (policy).
