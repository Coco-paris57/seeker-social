# Competitor positioning: EAST batch (D = 2026-11-01)

**Method**
- **Comp ids.** Same comp ids as 31 Oct (`data/snapshots/2026-10-31/comps.csv`), same search boxes and guest counts: 4 guests for 2-beds, 3 for 1-beds. P04 uses a 2.5 km box, P09 1.8 km, the others 1.3 km.
- **Access.** Airbnb plain public pages (HTTP 200), same curl as 26-31 Oct: 54 wide searches, then 261 + 23 searches in a 0.3 km box around every comp (and our listing) the wide search did not price. 28 extra prices came from the 0.3 km pass (marked `*`). "–" = not bookable for that stay in either pass. Booking.com was not tried.
- **Price basis.** Guest-paid **all-in total ÷ nights**: after any discount, with cleaning and Airbnb fees included. Airbnb shows no separate taxes.
- **P04 "ours"** = synced listing 1657859794156786222 (4.11 (9), sleeps 6). The unsynced Barking listing 1455876748739910219 (4.69 (26)) has its own row.
- **Stays.** Trend stays for every ref: 6-8 Nov (next Fri-Sun), 3-5 Nov (Tue-Thu) and 24-27 Nov, all kept from 31 Oct, plus **1-3 Dec (30 days out, new today)**. Open-night stays come from Smoobu `reservations.csv` and `prices.csv` (1 Nov):
  - **P04 (min 3):** 9-12 and 10-13 Nov; 18-21, 20-23, 21-24 and **18-24 Nov**; 6-9 and 11-14 Dec; **17-20 Dec** (holds the reopened 19 Dec night; 19-20 Dec alone cannot sell under min 3 because 20 Dec is booked). Plus 3-6 and 6-9 Nov as the double-sell check.
  - **P12:** 2-5, 12-14, 18-20, 17-21, 26-28 Nov; 26 Nov-2 Dec; 1-3 Dec; 7-13 and 11-13 Dec.
  - **P20 (min 3):** 6-9, 10-13, 16-19, **20-23**, 22-25 Nov; 5-8, 7-10, 11-14 and 18-21 Dec.
  - **P09:** 10-12 and 10-13 Nov. That is the only gap before the 26 Nov handback.
- **Comp set change (P04 only).** 1253486494214857096 (4.64 (14); page still live) was not bookable on any checked stay on 31 Oct or 1 Nov, including the 0.3 km pass, so it was **replaced by 1387112821878102742**: 2BR, sleeps 6, 4.85 (27), parking in its name, 2.57 km (inside the 2.5 km half-side box). I also **added 1083936003491396261** (2BR, sleeps 5, 4.9 (40), Superhost, 1.24 km) because P04 had only 1-3 priced comps per stay. It was bookable only for 18-24 Nov. Candidates checked and rejected: 851449238649758407 (sleeps 6, 2.66 km, outside the box) and 1601606251010507286 (2.68 km). The others from 29 Oct sleep 4. All other refs keep their 31 Oct ids, and every comp was bookable on at least one stay today.
- **Data written.** 500 rows appended to `data/snapshots/2026-11-01/comps.csv` under `flock` on `.comps.csv.lock`: 457 comp-east rows (all comps x their stays, NOT RETURNED rows kept) and 43 `east-refband` rows (P12 band, not stored comps).
- **PriceLabs (read-only, one call at a time):** `get_neighbourhood_data` x5 (P01, P04, P09, P12, P20; all `all_operations_ok`), `get_user_logs` (5 listings, 31 Oct-1 Nov: 12 entries, all Reyhan) and `get_listing_date_overrides` for P12.

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 1 Nov)

| Ref | Band (n) | P25/P50/P75/P90 today | 31 Oct | Market occ 30/60 (`pl_kpis.csv` 1 Nov) | Our PL avg on open nights, pctl 30d / 60d |
|---|---|---|---|---|---|
| P01 | 2BR (147) | 214/257/331/420 | 215/259/332/422 | 35% / 28% | no open nights |
| P04 | 2BR (91) | 139/168/218/257 | 139/170/218/257 | 24% / 20% | £180 P56 / £191 P61 |
| P09 | 1BR (126) | 110/132/162/204 | 110/134/161/204 | 36% / 31% | £148 P64 / handback |
| P12 | 2BR (120) | 170/206/244/303 | 171/205/244/303 | 40% / 34% | £247 P76 / £281 P84 (1-13 Dec) |
| P20 | 2BR (152) | 215/254/314/409 | 215/254/314/408 | 38% / 30% | £243 P43 / £337 P79 |

- These are market bands, not comps. Their horizon and cleaning treatment are not stated. Our averages are lower than on 31 Oct (P04 £199 → £180, P12 Nov £253 → £247, P20 £263 → £243) because of **Reyhan's 31 Oct overrides** (below), not the algorithm alone. For example, `prices.csv` 31 Oct vs 1 Nov: P04 20 Nov 214 → 196, P20 15 Nov 273 → 227, P12 28 Nov 315 → 298.
- **Same comp, same stay vs 31 Oct:** the median change is **0.0% on every ref and stay**. Comp medians did not move. Moves over £5:
  - 41905186 (P01): 484 → 457 (6-8 Nov) and 471 → 444.33 (24-27 Nov).
  - 1005647070760859698 (P01): 261.67 → 220 (24-27 Nov).
  - 1316210326145130709 (P01/P20): up £17-43 on 10-13, 22-25 and 24-27 Nov.
  - 1516006875488990547 (P20): down £11-15.
  - 1568001017881493647 (P20) 11-14 Dec: 253 → 244.33.
  - 1376679869251315227 (P09) 24-27 Nov: 182.33 → 174.67.
  - P04's 6-8, 6-9 and 24-27 Nov medians moved only because of the set change.

## Summary per property

Columns:
- **Booked 30/60:** confirmed Smoobu nights as a share of sellable nights, for 1-30 Nov and 1-30 Dec. Handback nights, P04 2 Dec and P12 17 Nov (deprioritised) are excluded.
- **Pctl:** `rm/positioning.py` `percentile_rank` against priced comps for the same stay.
- **`recommend`:** run on the median comp percentile of our priced stays in each window, with `quality_premium`.

| Ref | Our price (Airbnb all-in £/n), same stay | Comp median (n) | Our pctl (vs median) | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market | `recommend` 30 / 60 (comp pctl) |
|---|---|---|---|---|---|---|---|---|
| P01 | none open (booked to 30 Nov; 30 Nov-17 Dec handback block; 18-21 Dec booked) | 359.50 (4) / 384 (1) / 363.66 (10) / 376.25 (6) | n/a | 4.67 vs 4.63 | 3 vs 29 (-26) | 0.0 (<5 reviews) | 100% / 100% vs 35% / 28% | raise-signal; nothing to sell |
| P04 (synced 1657…) | 9-12 Nov 172.67; 10-13 174.33; 18-21 193; 20-23 196.33; 21-24 194; 18-24 178.50; 6-9 Dec 214.67*; 11-14 Dec 222.67; 17-20 Dec 226.67 | 222 (3) / 193.17 (4) / 239.84 (2) / 253 (2) / 253 (2) / 187.58 (2) / 241 (4) / 241 (2) / 241 (2) | **P0-P50 (-4.8% to -23.3%)** | **4.11 vs 4.83** | 9 vs 27 (-18) | **-0.15** (cap) | 57% / 52% vs 24% / 20% | raise +10% (P17) / raise +10% (P50) |
| P04 unsynced 1455… | **3-6 Nov 173 and 6-9 Nov 158.33 (sellable over confirmed stays)**; 9-12 165.67; 10-13 171.33; 18-21 175.33; 20-23 180.67; 21-24 179.67; 18-24 157.50; 6-9 Dec 224.33*; 11-14 Dec 227; 17-20 Dec 231.67 | as above | 2-12% under our synced listing on 9-24 Nov | 4.69 vs 4.83 | 26 vs 27 (-1) | -0.056 | n/a | n/a |
| P09 | 10-12 Nov **174.50*** (31 Oct 173.50); 10-13 Nov **155.33*** | 168 (5) / 165 (5) | **P60 (+3.9%) / P20 (-5.9%)** | 5.0 vs 4.58 | 3 vs 24.5 (-21.5) | 0.0 (<5 reviews) | 88% vs 36% / handback | raise +10% (P40) / n/a |
| P12 | 3-5 Nov 237; 2-5 Nov 227.33; 12-14 252; 18-20 237; 17-21 215.75; 26-28 260.50; 26 Nov-2 Dec 239.50; **1-3 Dec 310**; 7-13 Dec 279.33; 11-13 Dec 343 | stored: 252 (3) / 236.83 (4) / 259.75 (2) / 254 (3) / 233.25 (6) / 250 (2) / 212.50 (3) / 245.75 (4) / 273.25 (2) / 294.25 (2). **Band:** see table below | stored P0-P100 (-7.5% to +26.1%, thin n). **Band: Nov P0-P67 (-7.8% to +9.7%); 26 Nov-2 Dec P50 (+5.9%); 1-3 Dec P90 (+32.9%); 7-13 Dec P58 (+4.2%); 11-13 Dec P57 (+9.2%)** | 4.27 vs 4.86 (band 4.59-4.92) | 15 vs 18 (-3) | **-0.15** (stored); -0.13 to -0.15 vs band | 54% / 31% vs 40% / 34% (60d = 1-13 Dec, before handback) | raise +10% (P50) / hold (P50) |
| P20 | 6-9 Nov 219.67; 10-13 226.67; 16-19 247*; **20-23 254.33**; 22-25 244.67; 5-8 Dec 323.33; 7-10 Dec 313.67; 11-14 Dec 323.33*; 18-21 Dec 323.67 | 373.84 (6) / 327.34 (8) / 271.34 (10) / 333.33 (9) / 307.16 (10) / 358 (6) / 333.33 (11) / 290 (9) / 358 (6) | **Nov P0-P12 (-9.0% to -41.2%); Dec P33-P56 (-9.7% to +11.5%)** | none (New) vs 4.80 | 0 vs 18 (-18) | 0.0 (no rating) | 34% / 13% vs 38% / 30% | raise +5% (P10) / fix-listing (P39). NL: raise +5% (P43) / lower -7% (P79) |
| P15 | no listing of ours | 145 (1) / 140.25 (2) / 159.67 (6) / 160.75 (4) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a |
| P07 | Blocked on purpose (policy) | not analysed | | | | | | |

`*` = found by the 0.3 km second pass.

## Supported positioning (one line each, then reasoning)
- **P04: about -15% vs comp median (quality-adjusted parity).** Today's open stays sit at -5% to -23%, and `recommend` says raise +10% on both windows (57% vs 24% booked).
  - `quality_premium` is capped at -0.15: 4.11 (9) vs 4.83.
  - 9-12 Nov (-22%), 18-21 (-20%), 20-23 (-22%) and 21-24 Nov (-23%) are 5-8 points below the supported level. 10-13 Nov, 18-24 Nov and all December stays (-5% to -11%) are at or above it.
  - **The gap widened today because of Reyhan's -10% on 9-24 Nov and 6-22 Dec (31 Oct 22:11Z).** It replaced Corentin's 24 Oct -8% ("no demand", in `policy.json`). This is a conflict for Corentin to confirm, not a new proposal. n is 2-4 comps per stay.
- **P12, November open nights: hold.** We are at band P0-P67 (-8% to +10%; 2-5, 18-20 and 17-21 Nov at or below the median). Quality (-13% to -15%) offsets the demand lead (54% vs 40%; `recommend` raise +10% at P50).
- **P12, 26 Nov-13 Dec: now about +4% to +9% vs the band median (was +10% to +14% on 31 Oct)**, at P50-P67, with `recommend` hold (31% vs 34%).
  - Reyhan's -7% on 16 Nov-13 Dec (31 Oct 22:05Z) has in effect delivered plan item a-p12-2228nov: PriceLabs prices on those nights fell 4-7% (`prices.csv`).
  - The outlier is **1-3 Dec at £310/n (band P90, +33%)**. It is 30 days out, just outside the Airbnb extra 0.85 last-minute cut (ratio 0.855 vs 0.71-0.77 for stays inside about 28 days). It will fall about 15% on its own in 2-3 days, so no extra cut is supported.
- **P20: hold; no further cut.**
  - November: -9% to -41% vs median (P0-P12), with 34% vs 38% booked.
  - December: -10% to +12% (P33-P56), with 13% vs 30% booked. `recommend` gives fix-listing on comps. The NL-only "lower -7%" rests on Christmas PriceLabs prices.
  - The gap is 0 reviews vs 18 plus the flat Airbnb 0.765 November ratio, not the PriceLabs price.
  - Reyhan's -10% on 6-24 Nov (31 Oct 22:10Z) goes deeper than the -5% on 31 Oct-19 Nov that `policy.json` (price_24oct) records from Corentin. This is a conflict for Corentin to confirm.
- **P09: hold.**
  - 10-12 Nov: £174.50 (P60, +3.9%). 10-13 Nov: £155.33 (P20, -5.9%; the 3-night stay prices lower on Airbnb).
  - `recommend` says raise +10% (88% vs 36% booked), but our 5.0 rests on 3 reviews (`quality_premium` 0), and these are the last 3 nights before the 26 Nov handback, 9 days out.
- **P01: no action.** There are 0 sellable nights before the 20 Dec handback.
- **P15: reference only.** The 1-bed median is £140-161 all-in.

## Input for tomorrow's base review (2 Nov), raised flats in this batch
- **P01 (base 253):** keep 253. Nothing is sellable before the 20 Dec handback (100% booked to 30 Nov, then the handback block). Same-stay comps sit at £360-384 all-in, so the rise cost nothing. Since 19 Oct: 1 booking (18-21 Dec, made 19 Oct, £240/n room).
- **P09 (base 176):** keep 176. The only inventory is 10-12/10-13 Nov, which sits at P20-P60 (-6% to +4%) of 5 comps with 88% vs 36% booked. Since 19 Oct: 1 booking (13-15 Nov, made 23 Oct) vs 3 bookings made 4-18 Oct. Handback is on 26 Nov.
- **P12 (base 284):** keep 284. Do not stack a base cut on Reyhan's -7% (16 Nov-13 Dec). With it, open nights from 16 Nov sit at band P36-P67 (-4% to +10%) despite -15% quality. Since 19 Oct: 4 Booking.com bookings (5-12 Nov, 21-26 Nov, 3-7 Dec confirmed; 4-8 Dec cancelled) vs 2 made 4-18 Oct, at £109-268/n room after the Booking.com promotion stacks. The 1-2 Dec Airbnb premium resolves itself when it enters the about-28-day window.

## Critical / high findings
- **CRITICAL: P04 double-booking exposure is still live (t-p04-doublebook NOT fixed).**
  - On 1 Nov the unsynced Barking Airbnb 1455876748739910219 is bookable:
    - **3-6 Nov at £519**, over the confirmed Booking.com stay (arrival in 2 days);
    - **6-9 Nov at £475**, over the confirmed Airbnb stay.
  - The synced 1657859794156786222 correctly shows neither stay.
  - Close 3-9 Nov on 1455… today (Corentin) and/or unlist it.
- **HIGH: the unsynced 1455… still undercuts our synced Barking listing on 9-24 Nov:**
  - £497 vs £518, £514 vs £523, £526 vs £579, £542 vs £589 and £539 vs £582;
  - **18-24 Nov £945 vs £1,071** (0.825x PriceLabs; a length-of-stay rule on 1455… is likely but was not seen).
  - In December it is 2-5% dearer.
- **HIGH: Reyhan's 31 Oct edits conflict with standing decisions (for Corentin to confirm):**
  - **P04** -10% on 9-24 Nov and 6-22 Dec (22:11Z) vs policy -8% on 1-25 Nov. **P04 1-2 Nov +20% min 2** (22:11:25Z) vs policy `min_stay_rule` (never under 3). The 1 Nov night is tonight, so this lapses on its own.
  - **P12 17 Nov** is now -7%, min 2 (Reyhan 31 Oct 22:05Z, inside 16 Nov-13 Dec) vs policy `deprioritised.p12_17nov_override` (Corentin keeps +50%).
  - **P20** -10% on 6-24 Nov (22:10Z, after -7% on 8-24 Nov at 14:33Z) vs Corentin's -5% on 31 Oct-19 Nov.
- **HIGH: the P20 20-22 Nov delivery block is not in place (t-p20-delivery).** Airbnb sells **20-23 Nov at £763** (£254.33/n) on 1 Nov. `policy.json` `listing_facts.P20.block_20_21_nov` records the block as an intentional delivery block. For Corentin: confirm whether delivery still needs those nights.
- **Airbnb pricing-rule cut unchanged (a-airbnb-rules NOT fixed).** Room = (Airbnb total - £150 cleaning, assumed) ÷ PriceLabs sum:

  | Stay | P20 ratio | P12 stay | P12 ratio |
  |---|---|---|---|
  | 6-9 Nov | 0.765 | 3-5 Nov | 0.712 |
  | 10-13 Nov | 0.766 | 2-5 Nov | 0.765 |
  | 16-19 Nov | 0.766 | 12-14 Nov | 0.715 |
  | 20-23 Nov | 0.765 | 18-20 Nov | 0.711 |
  | 22-25 Nov | 0.765 | 17-21 Nov | 0.765 |
  | 5-8 Dec | 0.900 | 26-28 Nov | 0.718 |
  | 7-10 Dec | 0.901 | 26 Nov-2 Dec | 0.809 (mix) |
  | 11-14 Dec | 0.900 | 1-3 Dec (30 days out) | 0.855 |
  | 18-21 Dec | 0.900 | 7-13 Dec / 11-13 Dec | 0.900 / 0.860 |

  - P12 2-night stays read 0.71 and 3-4-night stays 0.765, so P12's cleaning or minimum-stay pricing on Airbnb is probably not £150 flat. Not verified.
  - For P04 (cleaning unknown), raw total ÷ PriceLabs: the synced listing runs 0.94-1.06x in November (0.94 = the 6-night 18-24 Nov stay) and 1.14-1.16x in December. The unsynced listing runs 0.83-1.03x in November and 1.16-1.21x in December.

## Plan items in this batch (logs and overrides read 1 Nov)
- **t-p04-doublebook:** NOT fixed (above).
- **P04 1-2 Nov min 2:** re-saved by Reyhan as +20% min 2 (31 Oct 22:11Z), down from +50%. It lapses tonight.
- **a-p12-2228nov:** in effect applied by Reyhan's -7% on 16 Nov-13 Dec (it was not a Corentin edit).
- **P12 17 Nov:** changed from -2% to -7%, still min 2. The conflict with policy is still open.
- **t-p20-delivery:** 20-23 Nov is sellable on Airbnb (above).
- **a-raise-1012nov (P09):** no edit. The Airbnb 10-12 Nov total is £349 (31 Oct £347), because PriceLabs 10 Nov moved 142 → 145.
- **P04 19-20 Dec cancellation:** the night reopened. It is sellable only inside a 3-night stay such as 17-20 Dec, which the synced listing offers at £680 (£226.67/n, -5.9% vs comp median 241, n=2).
- **18 Oct base rises, running effect** (bookings made from 19 Oct vs 4-18 Oct, `reservations.csv` 1 Nov):
  - P01: 1 vs 1.
  - P09: 1 vs 3.
  - P12: 4 confirmed + 1 cancelled vs 2.
  - No booking on any East flat since 29 Oct (two-night lull, Sunday; not over-read).

## Comp tables (Airbnb, guest-paid all-in £/night incl. cleaning and fees; checked 2026-11-01; "31 Oct x" = same comp and stay on 31 Oct where it differs by more than £1; full source per row in `data/snapshots/2026-11-01/comps.csv`)

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.67 (3)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec |
|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | 220 (31 Oct 261.67) | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 457 (31 Oct 484) | – | 444.33 (31 Oct 471) | 462 |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.45 (153) | none listed | – | – | 202 | 208 |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (55) | Lift | – | – | 425 (31 Oct 381.67) | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.61 (28) | Lift/River view/balcony | – | – | 255 | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | 374.33 | 368.50 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | 353 | 422 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.8 (15) | Lift | 335 | – | – | 335 |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.64 | 5 | 4.37 (38) | Paid parking on premises | 384 | 384 | 379 | 384 |
| [20404597](https://www.airbnb.co.uk/rooms/20404597) | 0.68 | 6 | 4.65 (23) | Canal view/Lift/River view/Superhost/balcony | 315 | – | – | – |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.63 (29.0) | | **359.50** (4) | **384** (1) | **363.66** (10) | **376.25** (6) |
| **Our pctl (vs median)** | | | | | – | – | – | – |

### P20 Waterford Court 2BR, max 4 (ours: Airbnb 1791529331262420081, New, 0 reviews); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 6 Nov-9 Nov | 10 Nov-13 Nov | 16 Nov-19 Nov | 20 Nov-23 Nov | 22 Nov-25 Nov | 5 Dec-8 Dec | 7 Dec-10 Dec | 11 Dec-14 Dec | 18 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – | 281 | 281 | 281* | 281 | 281 | 281 | 281 | 281 | 282 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises (added 31 Oct) | – | – | – | – | – | – | 253 (31 Oct 256) | – | – | – | 235.33 (31 Oct 237.33) | 244.33 (31 Oct 253) | – |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises | 444.50 | – | – | 403.50 | 434.67 | – | 393.33 | 393.33 | – | – | 393.33 | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (55) | Lift | – | – | 425 (31 Oct 381.67) | – | – | 390.67 (31 Oct 373) | – | – | 399.67 (31 Oct 363.33) | 398.67 | 383.33 | 412.67 | 394.67 (31 Oct 399.33) |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – | 424 | 424 | 382.67* | 382.67 | 382.67 | 382.67 | 382.67 | 382.67* | 382.67* |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony | – | – | 353 | 422 | – | – | – | 353 | 337 | 392.33 | 361.67 | 463.67 | 479 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises | – | – | 261.67 | 281.50 | – | 286* | 261.67 | 276.33 | 261.67 | – | 261.67 | 276.33 | – |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony | – | – | 333.33 | – | 368.67 | 368.67* | 333.33 | 333.33* | 333.33 | 333.33 | 333.33 | 333.33 | 333.33 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost | – | – | 216.33 (31 Oct 227) | – | – | 217.33 (31 Oct 232.33) | 204.67 | 209.33 | 207.33* (31 Oct 222.33) | – | – | – | – |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.65 | 5 | 4.37 (38) | Paid parking on premises | 384 | 384 | 379 | 384 | 379 | 379 | 379 | 379 | 379 | – | 379 | – | – |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises | – | – | 250 | 264 | – | – | 250* | – | 250 | – | 250 | 250 | – |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 310 | 270 | 250 | 290 | 290 | 250 | 250 | 290 | 263.33 | 283.33 | 270* | 290 | 312 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | **219.67** | **226.67** | **247*** | **254.33** | **244.67** | **323.33** | **313.67** | **323.33*** | **323.67** |
| **Comp median (n)** | | | 4.8 (18.0) | | **384** (3) | **327** (2) | **307.16** (10) | **337** (6) | **373.84** (6) | **327.34** (8) | **271.34** (10) | **333.33** (9) | **307.16** (10) | **358** (6) | **333.33** (11) | **290** (9) | **358** (6) |
| **Our pctl (vs median)** | | | | | – | – | – | – | P0 (-41.2%) | P12 (-30.8%) | P10 (-9.0%) | P11 (-23.7%) | P10 (-20.3%) | P33 (-9.7%) | P45 (-5.9%) | P56 (+11.5%) | P33 (-9.6%) |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.11 (9); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 3 Nov-6 Nov | 6 Nov-9 Nov | 9 Nov-12 Nov | 10 Nov-13 Nov | 18 Nov-21 Nov | 20 Nov-23 Nov | 21 Nov-24 Nov | 18 Nov-24 Nov | 6 Dec-9 Dec | 11 Dec-14 Dec | 17 Dec-20 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | 257.67 | – | – | 257.67 | 257.67 | 257.67 | 257.67 | 257.67 | 257.67 | 250.17 | 260* | 260 | 260 |
| [1083936003491396261](https://www.airbnb.co.uk/rooms/1083936003491396261) | 1.24 | 5 | 4.9 (40) | Superhost (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | 125 | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (24) | Free parking on premises/Superhost/Guest favourite | – | – | 142.33 (31 Oct 146) | – | – | – | – | 123.67 (31 Oct 125.67) | – | – | – | – | – | – | – |
| [1343991336860365461](https://www.airbnb.co.uk/rooms/1343991336860365461) | 1.81 | 6 | 4.43 (14) | Paid parking on premises | – | – | – | – | 130 | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.82 (39) | Free parking on premises/Superhost (added 30 Oct) | – | – | 248.33 | – | – | – | – | – | – | 248.33 | 248.33 | – | 293.33 | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | 222 | – | – | 222 | – | 222 | 222 | 222 | 222 | – | – | – | 222* | 222 | 222 |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 | 6 | 4.85 (27) | Parking (in name) (added 1 Nov) | 173 | – | 178 | – | – | 164.33 | 164.33 | 164.33 | – | – | – | – | 178 | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **172.67** | **174.33** | **193** | **196.33** | **194** | **178.50** | **214.67** | **222.67** | **226.67** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | 173 | 158.33 | 165.67 | 171.33 | 175.33 | 180.67 | 179.67 | 157.50 | 224.33 | 227 | 231.67 |
| **Comp median (n)** | | | 4.83 (27) | | **197.50** (2) | n/a (0) | **213.17** (4) | **222** (1) | **130** (1) | **222** (3) | **222** (3) | **193.17** (4) | **239.84** (2) | **253** (2) | **253** (2) | **187.58** (2) | **241** (4) | **241** (2) | **241** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | P33 (-22.2%) | P50 (-9.8%) | P0 (-19.5%) | P0 (-22.4%) | P0 (-23.3%) | P50 (-4.8%) | P25 (-10.9%) | P50 (-7.6%) | P50 (-5.9%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 10 Nov-12 Nov | 10 Nov-13 Nov |
|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 169 | 168 | – | – | 168 | 165 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.43 (88) | none listed | 165 | 166.50 | – | – | 165 | 162 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.73 (22) | none listed | – | – | 174.67* (31 Oct 182.33) | 162.50 | 183.50 (31 Oct 188.50) | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | 200.50 | – | 196.67 | 200.50 | 200.50 | 196.67 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | – | – | 244.50 | 161.50* (31 Oct 156.50) | 149.67 |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | 244.33 | – | – | 243 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | **174.50*** | **155.33*** |
| **Comp median (n)** | | | 4.58 (24.5) | | **169** (3) | **167.25** (2) | **196.67** (3) | **200.50** (3) | **168** (5) | **165** (5) |
| **Our pctl (vs median)** | | | | | – | – | – | – | P60 (+3.9%) | P20 (-5.9%) |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 2 Nov-5 Nov | 12 Nov-14 Nov | 18 Nov-20 Nov | 17 Nov-21 Nov | 26 Nov-28 Nov | 26 Nov-2 Dec | 7 Dec-13 Dec | 11 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.50 | 237.50 | 225* | 237.50 | 225 | 237.50 | 237.50 | 218.75 | 237.50 | 212.50 | 212.50 | 237.50 |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (18) | Paid parking on premises | – | – | 311.67 | – | – | – | – | 297.50 | – | 295.83 | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (78) | Superhost | – | – | 196.67 (31 Oct 200.33) | – | – | – | – | 196.50 | – | 208.50 (31 Oct 211.67) | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | – | – | 205 | 220 | 205 | – | – | 205 | – | – | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (118) | Superhost/balcony/Guest favourite | – | 252 | 250.67 | 254 | 248.67 | – | 254 | 247.75 | 262.50 | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | 1035 | 1035 | 1033.67 | 1035 | 1032.33* | 1037 | 1035 | 1031 | 1035 | 1029.83 | 1031.50 | 1040.50 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | – | 282 | 313.33 (31 Oct 312) | 309 | 282 | 282 (31 Oct 286) | 298.50* (31 Oct 300.50) | 302.25 | – | – | 334 (31 Oct 331.67) | 351 (31 Oct 352.50) |
| **Ours** | | | | | not bookable | **237** | not bookable | **310** | **227.33** | **252** | **237** | **215.75** | **260.50** | **239.50** | **279.33** | **343** |
| **Comp median (n)** | | | 4.86 (18) | | **237.50** (1) | **252** (3) | **237.83** (6) | **245.75** (4) | **236.83** (4) | **259.75** (2) | **254** (3) | **233.25** (6) | **250** (2) | **212.50** (3) | **273.25** (2) | **294.25** (2) |
| **Our pctl (vs median)** | | | | | – | P0 (-6.0%) | – | P100 (+26.1%) | P50 (-4.0%) | P50 (-3.0%) | P0 (-6.7%) | P33 (-7.5%) | P50 (+4.2%) | P67 (+12.7%) | P50 (+2.2%) | P50 (+16.6%) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec |
|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 159.67 | 190* |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | – | – | 171.67 | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | – | – | 135 | 135 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | 159.67 | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.91 (23) | Free parking on premises/Guest favourite | 145 | 145 | 181 | 181 |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (201) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | – | 135.50 | – | 140.50 |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | 146.67 | – |
| **Comp median (n)** | | | 4.84 (14) | | **145** (1) | **140.25** (2) | **159.67** (6) | **160.75** (4) |

### P12 reference band (2BR, 10+ reviews, within 1.3 km, same searches; stored comps included; placeholder 29297702 and our listing excluded)

| Stay | n | Band median | Band rating median | Ours | Our pctl | vs median | `quality_premium` vs band |
|---|---|---|---|---|---|---|---|
| 6 Nov-8 Nov | 4 | 223.50 | 4.58 | not bookable | – | – | -0.122 |
| 3 Nov-5 Nov | 4 | 257 | 4.62 | 237 | P0 | -7.8% | -0.138 |
| 24 Nov-27 Nov | 11 | 205 | 4.89 | not bookable | – | – | -0.15 |
| 1 Dec-3 Dec | 10 | 233.25 | 4.86 | 310 | P90 | +32.9% | -0.15 |
| 2 Nov-5 Nov | 8 | 236.83 | 4.62 | 227.33 | P50 | -4.0% | -0.138 |
| 12 Nov-14 Nov | 5 | 237.50 | 4.59 | 252 | P60 | +6.1% | -0.128 |
| 18 Nov-20 Nov | 5 | 237.50 | 4.65 | 237 | P40 | -0.2% | -0.15 |
| 17 Nov-21 Nov | 11 | 224.75 | 4.86 | 215.75 | P36 | -4.0% | -0.15 |
| 26 Nov-28 Nov | 3 | 237.50 | 4.92 | 260.50 | P67 | +9.7% | -0.15 |
| 26 Nov-2 Dec | 8 | 226.25 | 4.88 | 239.50 | P50 | +5.9% | -0.15 |
| 7 Dec-13 Dec | 12 | 268 | 4.64 | 279.33 | P58 | +4.2% | -0.15 |
| 11 Dec-13 Dec | 7 | 314 | 4.59 | 343 | P57 | +9.2% | -0.128 |

- **Comp attributes.** Lift, view and parking come from the 25 Oct amenity lists. Comps added 30 Oct-1 Nov were read on the day they were added; for 1387112821878102742 the parking is taken from its listing name, because the amenity parse returned empty today. Ratings and review counts come from today's search cards where returned, otherwise they are carried from 31 Oct. Comp cancellation policies are NOT CHECKED.

## P07 Woolwich, 1-bed
Blocked on purpose (policy). No comps, no advice.

---

Data gaps:
1. **Booking.com NOT CHECKED** (not tried). Comps are Airbnb only, and our Booking.com displayed prices are not covered.
2. **Thin comp n.** P04 still has 1-4 priced comps per stay after today's replacement and addition, and 593405916827094880 prices £222 on every date. P12 stored comps have n=2-4 (positioning rests on the band, whose sleeps are NOT CHECKED). P01 3-5 Nov has n=1, P04 3-5 and 1-3 Dec have n=0-1, and P15 6-8 Nov has n=1.
3. **Comp set churn.** P04 changed today (1 drop, 2 adds), so its same-comp trend for those slots starts today. 1-3 Dec is a new stay with no 31 Oct baseline.
4. **Ratios** assume £150 Airbnb cleaning for P12 and P20. The P12 2-night vs 3-night split (0.71 vs 0.765) suggests a different fee or rule, NOT CHECKED. P04 cleaning on either Airbnb listing is unknown. The rule on 1455… behind its 18-24 Nov 0.825x price was not seen.
5. **P04:** which Airbnb account holds 1455… is NOT CHECKED. Whether a booking on 1455… caused the 19-20 Dec Airbnb cancellation is NOT CHECKED (17-20 Dec is bookable on both listings today).
6. **P20 20-22 Nov:** Airbnb sells these nights, but whether the Smoobu delivery block was removed on purpose is NOT CHECKED (Corentin). P20 1 Nov (tonight) is not in `prices.csv` and was not priced.
7. **PriceLabs.** NL percentiles are a market band, not comps. Competitor Listings and Market Dashboard were not used, and the raw neighbourhood JSON was not saved. Overrides were read in full only for P12; P04 and P20 changes come from `get_user_logs`. `pl_kpis.csv` occupancy (P04 53%/52%, P12 53%/60%, P20 30%/23%) differs from the Smoobu counts used here (P12 60d is cut at the 13 Dec handback).
8. **Not analysed:** P15 (no listing of ours) and P07 (blocked, policy). P20 is still missing from `build/properties.py`. Our own listings' cancellation policies are NOT CHECKED (the PDP field was empty).
