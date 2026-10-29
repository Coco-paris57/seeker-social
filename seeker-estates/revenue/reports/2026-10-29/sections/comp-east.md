# Competitor positioning: EAST batch (D = 2026-10-29)

**Method**
- **Comp ids.** Same comp ids as 25-28 Oct, same search boxes and guest counts: 4 guests for 2-beds, 3 for 1-beds. P04 uses a 2.5 km box, P09 1.8 km, all others 1.3 km.
- **Trend stays.** Kept, so each shows a true day-on-day change:
  - Fri-Sun 30 Oct-1 Nov
  - Tue-Thu 3-5 Nov
  - Tue-Fri 24-27 Nov (the 30-day point)
- **Our open-night stays** (open nights from `reservations.csv` 29 Oct, confirmed stays only):
  - **P12:** 18-21 Nov, 26-28 Nov and 4-8 Dec, the nights reopened by the 18-22 Nov and 4-8 Dec cancellations. 4-6 and 6-8 Dec were added as 2-night splits.
  - **P20:**
    - 31 Oct-2 Nov
    - 10-13 Nov. This is new: 10-12 Nov no longer returns our listing because min stay went to 3 on 28 Oct.
    - 22-25 Nov
  - **P04:** 10-13 Nov. 3-6 Nov is kept for trend; it is now booked on Booking.com.
  - **P09:** 10-12 Nov.
- **Access and price basis.**
  - Airbnb was reached with plain public pages: HTTP 200, the same curl as 28 Oct, no workaround.
  - Booking.com was not tried.
  - Price = guest-paid **all-in total ÷ nights**: after any discount, cleaning and Airbnb fees included. Airbnb shows no separate taxes.
- **Data written.** All appends were made under `flock`.
  - `data/snapshots/2026-10-29/comps.csv`: 266 rows checked 29 Oct.
    - 241 are comp-east rows.
    - 25 are tagged `east-refband`. These are the P12 Dec reference band and the P20 watch listing; they are **not** stored comps, and the tag keeps them out of tomorrow's comp set.
  - `data/snapshots/2026-10-29/market.csv`: 5 rows (P01/P04/P09/P12/P20).
- **PriceLabs calls.** All read-only and one at a time:
  - `get_neighbourhood_data` ×5, all `all_operations_ok = true`
  - `get_listing_date_overrides` for P12, P20 and P04
  - `get_user_logs` for the East listings, 28-29 Oct
  - `get_listing_prices` for P12

**Comp set stability**
- **No comp replaced.** The seven comps not returned today all load live as entire homes with **unchanged** review counts (pages read 29 Oct):
  - 20404597, 4.65 (23): not returned for 4 days
  - 1191085742562460545 (P15), 4.71 (31): 4 days
  - 813089760121939738, 4.4 (20): 3 days
  - 1199115199309731731 (P12), 4.84 (31): 3 days
  - 1385492120084469276, 4.7 (20): 3 days
  - 1374450835187037179, 4.8 (15): 2 days
- **Back today:** 1193087690344044898 (P04), £257.67/n.
- **60-day availability** of the missing comps is still NOT CHECKED. 20404597 and 1191085742562460545 are the first to replace if they are still missing on 30 Oct.
- **One comp added.** P04's set had only 3 comps, below the 6 minimum. I checked six 2BR candidates with 10+ reviews from today's P04 searches; only one meets the rules (sleeps 5-7): Airbnb **1343991336860365461**, 2BR, sleeps 6, 4.43 (14), 1.81 km, paid parking. It is added as of 29 Oct. The other five sleep 4: 1072316558208098643, 934755638180855305, 43709205, 1588439248552365607, 1531894972861731302. **The P04 set is still 4 comps, below 6.**
- **Same comp, same stay vs 28 Oct.** The median change is **0.0%** on every ref and stay, except P01 (-4.3% Fri-Sun, +4.4% 3-5 Nov; n=2, both driven by 41905186: 580→530 and 777→845). Other moves over £5:
  - 1376679869251315227 (P09), 24-27 Nov: 152→189.67
  - 1418178473526356202 (P01), 24-27 Nov: 353.33→374.33
  - 1516006875488990547 (P20), 24-27 Nov: 213.33→233
  - 1120913156789373408 (P12), 24-27 Nov: 196.33→202.67
  - 1557062894259099964 (P15), Fri-Sun: 160→152
- **Watch listing (not in set; the P20 set is full):** [1685056866796470494](https://www.airbnb.co.uk/rooms/1685056866796470494), 4.8 (10), Guest favourite, free parking.
  - 31 Oct-2 Nov: £207/n (28 Oct £211)
  - 10-12 Nov: £245.50
  - 22-25 Nov: £253
  - 24-27 Nov: £253
  - It is at or below P20 on every stay.

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 29 Oct) vs 28 Oct
| Ref | Band (n) | P25/P50/P75/P90 today | 28 Oct | Market occ 30/60 (`pl_kpis.csv` 29 Oct) |
|---|---|---|---|---|
| P01 | 2BR (144) | 217/259/333/424 | 222/267/337/426 | 34% / 27% |
| P04 | 2BR (89) | 140/175/221/262 | 141/178/225/263 | 25% / 20% |
| P09 | 1BR (128) | 113/139/172/214 | 115/143/173/221 | 36% / 31% |
| P12 | 2BR (119) | 168/207/247/297 | 173/210/251/301 | 39% / 32% |
| P20 | 2BR (148) | 217/255/315/412 | 222/261/321/414 | 36% / 29% |

The market is softening a little for a second day: medians are down £3-8. PriceLabs does not state the NL horizon or whether cleaning is included.

## Summary per property
**How to read the columns:**
- **Our price:** our Airbnb all-in price per night from the same search.
- **Booked 30/60:** booked share of sellable nights, from confirmed nights in `reservations.csv` 29 Oct.
  - Days 1-30 are 29 Oct-27 Nov; days 31-60 are 28 Nov-27 Dec.
  - Handback nights are excluded, as are the deprioritised P04 2 Dec and P12 17 Nov.
  - PriceLabs `pl_kpis.csv` shows P12 47% and P20 37% (30-day), but PriceLabs last refreshed P12 on 28 Oct 12:45 and has not seen the 28 Oct booking or the cancellations.
- **NL pctl:** the average PriceLabs price on open nights, placed in the NL band.

| Ref | Our price, same stay (all-in /n) | Comp median (n) | Our comp pctl (vs median) | NL pctl 30/60 | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market | `recommend` 30 / 60 |
|---|---|---|---|---|---|---|---|---|---|
| P01 | none open (100% booked to the 20 Dec handback) | 407 (2) / 614.50 (2) / 374.33 (9) | n/a | n/a | 4.67 vs 4.625 | 3 vs 25 (-22) | 0.0 (<5 reviews) | 100% / 100% vs 34% / 27% | raise-signal; nothing to sell |
| P20 | **31 Oct-2 Nov 260.50; 10-13 Nov 250; 22-25 Nov 251.33** | 322 (2) / 343.84 (8) / 333.33 (7) | **P0 (-19.1%) / P12 (-27.3%) / P14 (-24.6%)** | P52 / P77 | none vs 4.66 | 0 vs 18 (-18) | 0.0 (no rating) | 30% / 23% vs 36% / 29% | fix-listing / lower -7% (NL only) |
| P04 | **10-13 Nov 171.33**; 3-5 Nov 180 and 3-6 Nov 159.67 still shown (see critical finding) | 222 (3) / 169.50 (2) | **P33 (-22.8%)**; 3-6 Nov P50 (-5.8%) | P50 / P63 | 4.69 vs 4.63 | 26 vs 20.5 (+5.5) | +0.024 | 56% / 55% vs 25% / 20% | raise +12.4% / raise +12.4% |
| P09 | **30 Oct-1 Nov 161 (strikethrough £387 total); 10-12 Nov 156.50 (from £333)** | 166.50 (2) / 182.75 (4) | **P0 (-3.3%) / P0 (-14.4%)** | P59 / n/a | 5.0 vs 4.58 | 3 vs 24.5 (-21.5) | 0.0 (<5 reviews) | 82% / handback vs 36% | raise +10% / n/a |
| P12 | **3-5 Nov 246.50; 18-21 Nov 233.33; 26-28 Nov 280; 4-8 Dec 293.75** | 252 (3) / 240.33 (6) / 262.50 (3) / comp n=1 (29297702 at £1,031, not usable): ref band 275.75 (9) | **P33 (-2.2%) / P50 (-2.9%) / P67 (+6.7%) / ref band P67 (+6.5%)** | P71 / P84 | 4.27 vs 4.88 | 15 vs 18 (-3) | **-0.15** (cap) | 61% / **0%** (16 open nights 28 Nov-13 Dec) vs 39% / 32% | raise +10% / **lower -7%** |
| P15 | no listing of ours | 159.75 (4) / 140 (2) / 165.67 (4) | n/a | n/a | n/a vs 4.87 | n/a | n/a | n/a | n/a |
| P07 | Blocked on purpose (policy) | not analysed | | | | | | | |

## Supported positioning (one line each, then reasoning)
- **P12, 26 Nov-13 Dec: cut about 7% now (`recommend` 60 = lower -7%). Quality supports up to -15% vs the comp median, but we sit at +6.5-6.7%. 3-5 Nov and 18-21 Nov: hold at the median (P33-P50), where demand ahead of market and the quality discount offset each other.**
  - **26-28 Nov:** £280 vs £262.50 (n=3, P67).
  - **4-8 Dec:** £293.75 against a same-search reference band of 2BR listings within 1.3 km with 10+ reviews: median £275.75, n=9, P67. The 4-6 Dec split is P50 (+3.4%, n=4) and 6-8 Dec is P62 (+7.6%, n=8). The stored comps were not returned for December, except 29297702 at about £1,035/n on every date.
  - **Bookings:** 0 of 16 sellable nights booked between 28 Nov and the 13 Dec handback. The two cancellations reopened 7 nights (18-20 Nov, 4-7 Dec).
  - **Current PriceLabs:** open nights 28 Nov-13 Dec average about £277/night, which includes Reyhan's -2% on 16 Nov-13 Dec (28 Oct 12:44Z). After -7%, about £258.
  - **Full -15%:** at the 4-8 Dec ratio of 0.90x room/PL (assuming £150 cleaning), reaching -15% vs the band median (£234 all-in) needs about £219/night PL. That is a step for Corentin to choose, not supported by demand data alone.
  - **18-21 Nov:** £233.33 vs £240.33 (n=6, P50) with 61% vs 39% booked in the 30-day window, so hold. 3-5 Nov: £246.50 vs £252 (P33), 5 days out, so hold.
  - **Plan a-p12-2228nov** is now mostly moot: the new 21-26 Nov Booking.com stay covers 21-25 Nov. Of that window only 26-28 Nov is open, and no fixed override is set there (overrides read 29 Oct: -2%, min 2).
- **P20: hold; do not cut November further. We are already P0-P14 on every open November stay (-19% to -27%) yet 30% vs 36% booked. `recommend` 30 = fix-listing: the gap is 0 reviews vs 18, not price.**
  - `recommend` 60 says lower -7%, but it rests only on the NL percentile (P77), driven by Christmas nights (21-28 Dec PL £353-592). December comps were NOT CHECKED. So no December cut is supported by comps yet.
  - Reyhan's 28 Oct 14:15Z override set **-5% min 3 on 6-24 Nov**. It replaced the -10% on 13-24 Nov and the min 2 on 9-12 Nov, so 22-24 Nov PL rose to 261/264/264. The Airbnb all-in price for 22-25 Nov is still P14.
  - Free parking is not unique: the watch listing (4.8, free parking) is £207-£253/n.
- **P09: raise 10-12 Nov by about 10% (all-in about £172, still below the £182.75 median). Hold 30-31 Oct (arrival tomorrow).**
  - We are P0 on both stays and 82% booked vs 36%; `recommend` = raise +10%.
  - Rating 5.0 rests on only 3 reviews, so `quality_premium` = 0.
  - Open nights before the 26 Nov handback: 30-31 Oct and 10-12 Nov (5 nights).
- **P04: `recommend` = raise +12.4%** (56% vs 25% booked, NL P50, comp P33 on 10-13 Nov with n=3, quality +2.4%).
  - **For Corentin to confirm, not a new proposal:** this conflicts with his 24 Oct "no demand" -8% override (now -7% from Reyhan, 28 Oct 10:32Z, for 1-17 Nov and 6-22 Dec).
  - The Airbnb listing is on another account and does not follow PriceLabs (see below), so a PriceLabs raise would reach Booking.com only.
- **P01: no action.** There are 0 sellable nights before the 20 Dec handback.
- **P15: reference only.** The 1-bed median is £140-£166 all-in.

## Critical / high findings from the pricing searches
- **CRITICAL, P04 double-booking exposure.**
  - On 29 Oct, Airbnb returns our Barking listing (1455876748739910219) as bookable for **3-5 Nov (£360) and 3-6 Nov (£479)**.
  - `reservations.csv` has a **confirmed Booking.com stay 3-6 Nov** (booked 28 Oct, room £393.18).
  - The Airbnb totals have not moved since 27 Oct, although PriceLabs went 165/166 → 159/160 → 156/157. Airbnb also sells 10-13 Nov at £514 all-in.
  - So the Barking Airbnb calendar is not taking availability, price or min stay from Smoobu. Policy says the account link is unconfirmed; this is direct evidence it is not syncing.
  - Close 3-6 Nov on Airbnb manually and confirm the link (Corentin).
- **HIGH, P20 Airbnb at 0.766x PriceLabs, also outside the 14-day last-minute window.** Room = total - £150 cleaning (assumed):
  - 31 Oct-2 Nov: £371 vs £484 = 0.767
  - 10-13 Nov: £600 vs £784 = 0.765
  - **22-25 Nov (24 days out): £604 vs £789 = 0.766**
  - Airbnb's own last-minute 15% covers only 0-14 days (policy), so the 22-25 Nov figure is **unexplained**. On 28 Oct, 24-27 Nov (27 days out) was 0.81x.
  - This roughly explains the Dispatcher's P20 25 Nov-5 Dec booking at 0.639x: 0.766 x 0.85 weekly = 0.651. The cause (Smoobu Airbnb pricing rules for P20?) is NOT CHECKED.
- **HIGH, P12 Airbnb ratio steps with lead time.** Room = total - £150:
  - 3-5 Nov: 0.715
  - 18-21 Nov: 0.766
  - 26-28 Nov: 0.788
  - 4-8 Dec (36 days): 0.901
  - 4-6 / 6-8 Dec: 0.859 / 0.854
  - This fits a flat ~0.90 factor plus a last-minute ~15% within about 28 days. That is the same shape as the Smoobu default Airbnb rules seen on Shepherd's Bush (policy `airbnb_smoobu_settings_21oct`). This is an inference: the P12 Airbnb rules have not been seen.
- **PriceLabs has not seen P12's overnight changes.** `get_listing_prices` reports last_refreshed 2026-10-28 12:45Z: 21-25 Nov still shows open and 4-7 Dec still shows "Booked". Airbnb correctly shows 21-25 Nov closed and 4-8 Dec open at £1,175. Occupancy-based pricing on these nights is therefore stale (plan item t-pl-sync).

## Reyhan's PriceLabs edits that touch standing decisions (overrides read 29 Oct; for Corentin to confirm)
- **P04 min stay 2 is still set** on 18-20 and 23-25 Nov: +15% overrides, min 2, from 27 Oct 12:01Z. This conflicts with policy `P04.min_stay_rule` ("never less than 3"). **Not fixed** (third day reported).
- **P20 min stay 2 is still set** on 31 Oct-1 Nov (+10%, 27 Oct 14:38Z). This conflicts with policy `P20.min_stay` (3 nights to 30 Nov). **9-12 Nov is fixed:** now min 3 (28 Oct 14:15Z).
- **P12 17 Nov:** policy `deprioritised.p12_17nov_override` records that Corentin keeps +50%.
  - The override list now shows **-2%, min 2** on 17 Nov. It comes from Reyhan's 28 Oct 12:44Z writes: a blank "fixed" override on 17 Nov-3 Dec, then -2% on 16 Nov-13 Dec.
  - Smoobu/`prices.csv` show £227 for 17 Nov. `get_listing_prices` user_price shows £386; what that field means here is not documented.
- **P04 overrides:** -7% on 1-17 Nov and 6-22 Dec (28 Oct 10:32Z). Corentin set -8% on 24 Oct. Reported only.

## Comp tables (Airbnb, guest-paid all-in £/night incl. cleaning and fees, no separate taxes shown; 4 guests for 2BR, 3 for 1BR; checked 2026-10-29; "28 Oct x" = same comp and stay on 28 Oct where it differs by more than £1; full source per row in `data/snapshots/2026-10-29/comps.csv`)

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.67 (3))

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 30 Oct-1 Nov | 3-5 Nov | 24-27 Nov |
|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | n/a | n/a | 261.67 |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 530 (28 Oct 580) | 845 (28 Oct 777) | 473 (28 Oct 493) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.47 (148) | none listed | n/a | n/a | 202 (28 Oct 204.33) |
| [1385492120084469276 (not returned today)](https://www.airbnb.co.uk/rooms/1385492120084469276) | 0.45 | 4 | 4.7 (20) | Lift | n/a | n/a | n/a |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (55) | Lift | n/a | n/a | 374.33 |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.61 (28) | Lift/River view/balcony | n/a | n/a | 255 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | n/a | n/a | 382.67 |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | n/a | n/a | 374.33 (28 Oct 353.33) |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | n/a | n/a | 353 |
| [1374450835187037179 (not returned today)](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.8 (15) | Lift | n/a | n/a | n/a |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.64 | 5 | 4.38 (37) | Paid parking on premises | 284 | 384 | 379 |
| [20404597 (not returned today)](https://www.airbnb.co.uk/rooms/20404597) | 0.68 | 6 | 4.64 (22) | Canal view/Lift/River view/Superhost/balcony | n/a | n/a | n/a |
| **Ours (Airbnb, same search)** | | | | | not open/not listed | not open/not listed | not open/not listed |
| **Comp median (n priced)** | | | 4.625 (25.0) | | **407** (2) | **614.50** (2) | **374.33** (9) |

### P20 Waterford Court 2BR, max 4 (ours: 1791529331262420081, New, 0 reviews, free parking + balcony listed)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 30 Oct-1 Nov | 3-5 Nov | 24-27 Nov | 31 Oct-2 Nov | 10-12 Nov | 10-13 Nov | 22-25 Nov |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1385492120084469276 (not returned today)](https://www.airbnb.co.uk/rooms/1385492120084469276) | 0.27 | 4 | 4.7 (20) | Lift | n/a | n/a | n/a | n/a | n/a | n/a | n/a |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises | n/a | n/a | n/a | n/a | 444.50 | n/a | n/a |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (55) | Lift | n/a | n/a | 374.33 | n/a | 381 | 363.67 | n/a |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | n/a | n/a | 382.67 | n/a | n/a | 424 | 382.67 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony | n/a | n/a | 353 | n/a | 320.50 | 324 | 337 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises | n/a | n/a | 261.67 | n/a | 306 | 286 | 261.67 |
| [813089760121939738 (not returned today)](https://www.airbnb.co.uk/rooms/813089760121939738) | 0.59 | 4 | 4.4 (20) | Lift/Paid parking on premises/balcony | n/a | n/a | n/a | n/a | n/a | n/a | n/a |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony | n/a | n/a | 333.33 | n/a | n/a | 368.67 | 333.33 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.75 (16) | Lift/River view/Superhost | n/a | n/a | 233 (28 Oct 213.33) | n/a | n/a | 247.67 | n/a |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.65 | 5 | 4.38 (37) | Paid parking on premises | 284 | 384 | 379 | 334 | 384 | 379 | 379 |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises | n/a | n/a | 250 | n/a | 288.50 | n/a | 250 |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 310 | 270 | 250 | 310 | 270 | 250 | 263.33 |
| **Ours (Airbnb, same search)** | | | | | not open/not listed | not open/not listed | not open/not listed | **260.50** | not open/not listed | **250** | **251.33** |
| **Comp median (n priced)** | | | 4.66 (18.0) | | **297** (2) | **327** (2) | **333.33** (9) | **322** (2) | **320.50** (7) | **343.84** (8) | **333.33** (7) |

### P04 Barking 2BR, sleeps 6 (ours: 1455876748739910219, 4.69 (26); 2.5 km box)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 30 Oct-1 Nov | 3-5 Nov | 24-27 Nov | 3-6 Nov (3 n) | 10-13 Nov (3 n) |
|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | n/a | n/a | 257.67 | n/a | 257.67 |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (23) | Free parking on premises/Superhost/Guest favourite | n/a | n/a | 148.33 (28 Oct 146.67) | n/a | 128 |
| [1343991336860365461](https://www.airbnb.co.uk/rooms/1343991336860365461) | 1.81 | 6 | 4.43 (14) | Paid parking on premises (added 29 Oct) | n/a | n/a | n/a | 117 | n/a |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | n/a | 222 | n/a | 222 | 222 |
| **Ours (Airbnb, same search)** | | | | | not open/not listed | **180** | not open/not listed | **159.67** | **171.33** |
| **Comp median (n priced)** | | | 4.63 (20.5) | | n/a (0) | **222** (1) | **203** (2) | **169.50** (2) | **222** (3) |

### P09 Greenwich 1BR, sleeps 4 (ours: 1681417771483132994, 5.0 (3); 1.8 km box, 3 guests)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 30 Oct-1 Nov | 3-5 Nov | 24-27 Nov | 10-12 Nov |
|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 168 | 168 | n/a | 168 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.43 (88) | none listed | 165 | 165 | n/a | 165 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.73 (22) | none listed | n/a | n/a | 189.67 (28 Oct 152) | 197.50 (28 Oct 193.50) |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | n/a | n/a | 196.67 | 200.50 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.24 (21) | none listed | n/a | 168 | n/a | n/a |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | n/a | n/a | 242.67 | n/a |
| **Ours (Airbnb, same search)** | | | | | **161** | not open/not listed | not open/not listed | **156.50** |
| **Comp median (n priced)** | | | 4.58 (24.5) | | **166.50** (2) | **168** (3) | **196.67** (3) | **182.75** (4) |

### P12 Mile End 2BR, sleeps 6 (ours: 1414703602412646285, 4.27 (15))

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 30 Oct-1 Nov | 3-5 Nov | 24-27 Nov | 18-21 Nov | 26-28 Nov | 4-8 Dec | 4-6 Dec | 6-8 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.50 | 237.50 | 225 | 225 | 237.50 | n/a | n/a | n/a |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (18) | Paid parking on premises | n/a | n/a | 311.67 | 306.67 | n/a | n/a | n/a | n/a |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.88 (77) | Superhost | n/a | n/a | 202.67 (28 Oct 196.33) | 216.67 | n/a | n/a | n/a | n/a |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | n/a | n/a | 205 | 205 | n/a | n/a | n/a | n/a |
| [1199115199309731731 (not returned today)](https://www.airbnb.co.uk/rooms/1199115199309731731) | 0.91 | 6 | 4.84 (31) | City skyline view/Lift/Superhost/balcony | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (118) | Superhost/balcony/Guest favourite | 250.50 | 252 | 250.67 | 255.67 | 262.50 | n/a | n/a | n/a |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony | 1035 | 1035 (28 Oct 1038) | 1032.33 (28 Oct 1039) | 1032.33 | 1035 | 1031 | 1035 | 1035 |
| **Ours (Airbnb, same search)** | | | | | not open/not listed | **246.50** | not open/not listed | **233.33** | **280** | **293.75** | **337.50** | **300** |
| **Comp median (n priced)** | | | 4.88 (18) | | **250.50** (3) | **252** (3) | **237.83** (6) | **240.33** (6) | **262.50** (3) | **1031** (1) | **1035** (1) | **1035** (1) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours; 3 guests)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 30 Oct-1 Nov | 3-5 Nov | 24-27 Nov |
|---|---|---|---|---|---|---|---|
| [1611041940714716070](https://www.airbnb.co.uk/rooms/1611041940714716070) | 0.5 | 3 | 4.87 (23) | Free parking on premises/Superhost | 188.50 | n/a | n/a |
| [1191085742562460545 (not returned today)](https://www.airbnb.co.uk/rooms/1191085742562460545) | 0.64 | 4 | 4.71 (31) | none listed | n/a | n/a | n/a |
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | n/a | n/a | 159.67 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | n/a | n/a | 171.67 |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | 152 (28 Oct 160) | 135 | 135 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | 167.50 | n/a | n/a |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.91 (23) | Free parking on premises/Guest favourite | 145 | 145 | 181 |
| **Comp median (n priced)** | | | 4.87 (15) | | **159.75** (4) | **140** (2) | **165.67** (4) |

Ratings and review counts for comps not returned today come from their pages read 29 Oct; all are unchanged since 28 Oct. Comp attributes (lift, view, parking) come from the 25 Oct amenity lists, except 1343991336860365461, read 29 Oct.

## P07 Woolwich, 1-bed
Blocked on purpose (policy). No comps, no advice.

---

Data gaps:
1. **Booking.com NOT CHECKED** (not tried). Comps are Airbnb only, and our Booking.com displayed prices are not covered.
2. **Thin comp n.**
   - P04 has 4 comps (below the 6 minimum). Only one qualifying candidate was found within 2.5 km, and the most priced comps on any stay is 3.
   - n=2-3 on P20 31 Oct-2 Nov, P09 Fri-Sun, P12 3-5 Nov and 26-28 Nov, and P01 Fri-Sun and 3-5 Nov. The P01 medians are skewed by 41905186.
   - P12 4-8 Dec has 1 usable stored comp. The reference band is drawn from the same search, but comp sleeps there are NOT CHECKED.
   - 29297702 (P12 set) prices at about £1,035/n on every date. That looks like a placeholder rate; it is kept, but it is an outlier.
3. **Comp availability.** 60-day availability of the 7 comps not returned today is NOT CHECKED (pages are live; review counts unchanged). Comp cancellation policies are NOT CHECKED.
4. **Room-vs-PriceLabs ratios** assume £150 Airbnb cleaning for P12 and P20. P12 Airbnb bookings show £125 or £150; at £125 the ratios are about 0.03-0.05 higher. Airbnb rules for P12 and P20 have not been seen, so the causes are inferred. P04 and P09 Airbnb fees were not seen. P09's 10-12 Nov all-in £313 vs PriceLabs £314 room is reported only (policy `deprioritised.airbnb_rules_p09`).
5. **PriceLabs data.**
   - NL percentiles are a market band, not comps. Competitor Listings and Market Dashboard were not used; the raw neighbourhood JSON was not saved.
   - PriceLabs P12 data is stale (refreshed 28 Oct 12:45Z), so `pl_kpis.csv` occupancy for P12 and P20 differs from `reservations.csv`.
   - `market.csv` 29 Oct now also holds rows from other agents (P12/P20 duplicates with the same values). I appended under `.comps.lock`, not `.market.lock`.
6. **Not analysed.** The P12 Booking.com cancellation pattern (3 in 14 days plus 2 overnight) was not analysed here (channel section). P15 has no listing; P07 was not analysed (policy); P20 is still missing from `build/properties.py`.
