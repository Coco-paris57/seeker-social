# Competitor positioning: EAST batch (D = 2026-11-03)

**Method**
- **Comp ids.** Same comp ids as 2 Nov (`data/snapshots/2026-11-02/comps.csv`). Same search boxes and guest counts: 4 guests for 2-beds, 3 for 1-beds; P04 2.5 km box, P09 1.8 km, others 1.3 km. **No comp replaced.** P01 comp 20404597 was not bookable on any of today's 4 stays (priced 6-8 Nov yesterday). Kept for now; replace it if it is missing again tomorrow.
- **Access.** Plain public Airbnb pages (HTTP 200), same curl as 26 Oct-2 Nov. 58 wide searches, then 279 searches in a 0.3 km box around each comp (and our listing) the wide pass missed; 20 extra prices came from that pass (marked `*`). "–" = not bookable for that stay in either pass. Booking.com was not tried.
- **Price basis.** Guest-paid **all-in total ÷ nights**: after any discount, with cleaning and Airbnb fees included (Airbnb shows no separate taxes). Same basis for us.
- **Stays.** Trend stays: 6-8 Nov (next Fri-Sun), **10-12 Nov** (next Tue-Thu; replaces 3-5 Nov, which is today's check-in), 24-27 Nov and 1-3 Dec (30 days out). Open-night stays come from Smoobu `reservations.csv` + `prices.csv` (3 Nov):
  - **P04 (min 3; "ours" = synced 1657859794156786222):** 9-12 and 10-13 Nov; 18-21, 20-23, 21-24 and 18-24 Nov; 6-9, 9-12, 11-14, 14-17 and 17-20 Dec, plus 6-13 Dec. Plus 3-6 and 6-9 Nov as the double-sell check on the unsynced 1455876748739910219.
  - **P12:** 12-14, 18-20 and 17-21 Nov; **26-27 Nov (now min 1)**; 30 Nov-3 Dec; 1-3 Dec; 7-10, 7-13 and 11-13 Dec. 4-5 Nov (an orphan night with min 2) is priced for comps only.
  - **P20 (min 3):** 6-9 Nov; **10-13 Nov (the new booking, comps only)**; 13-16, 16-19, 20-23 and 22-25 Nov; 5-8, 7-10, 11-14 and 18-21 Dec.
  - **P09:** 10-12 and 10-13 Nov. This is the only gap before the 26 Nov handback.
- **Data written.** 619 rows appended to `data/snapshots/2026-11-03/comps.csv` under `flock` on `.comps.csv.lock`. The file already held the rows copied forward from 2 Nov. The new rows are:
  - 491 `comp-east`: every stored comp × its stays, NOT RETURNED rows kept;
  - 56 `east-refband`: the P12 band, not stored comps;
  - 72 `east-ours`: our own listings' prices on the same stays, so positioning can be recomputed. These are not comps.
- **PriceLabs (read-only, one call at a time):** `get_neighbourhood_data` ×5 (P20, P04, P12, P09, P01; all `all_operations_ok`) and `get_user_logs` (5 listings, 2-3 Nov: 9 entries, all Reyhan).

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 3 Nov)

| Ref | Band (n) | P25/P50/P75/P90 today | 2 Nov | Market occ 30/60 (`pl_kpis.csv` 3 Nov) | Our PL avg on sellable open nights, NL pctl (3 Nov-2 Dec / 3-31 Dec) |
|---|---|---|---|---|---|
| P01 | 2BR (148) | 213/258/330/420 | 214/258/331/421 | 34% / 29% | no open nights |
| P04 | 2BR (91) | 139/170/218/257 | 139/171/218/258 | 23% / 20% | £181.5 P56 / £190.5 P61 |
| P09 | 1BR (126) | 109/133/160/204 | 110/132/160/204 | 36% / 31% | £129.7 P47 / handback |
| P12 | 2BR (120) | 170/205/242/296 | 170/206/246/306 | 40% / 34% | £247.2 P76 / £271.0 P83 (to 13 Dec) |
| P20 | 2BR (154) | 212/249/314/410 | 214/252/314/411 | 36% / 30% | £260.4 P54 / £301.2 P70 |

- These are market bands, not comps. Horizon and cleaning treatment are not stated. P12's P75/P90 eased by £4-10. The other bands moved by £1-3.
- **Same comp, same stay vs 2 Nov:** the median change is **0.0% on every ref and stay** except P20 16-19 Nov (+4.9%, n=10). Moves over £5:
  - P20 16-19 Nov: five comps up £24-41 (789954794593691037 393→435; 27538942 383→424; 51380799 333→369; 757342335233586120 250→274; 790672189611831800 262→286). This is a mid-week rise for that stay only.
  - P20/P01: 1316210326145130709 24-27 Nov 400→372 and 22-25 Nov 366→339; 1516006875488990547 10-13 Nov 211→199.
  - P01: 1005647070760859698 24-27 Nov 220→187; 41905186 1-3 Dec 437→409.
  - P09: 1501211872839579235 10-13 Nov 143→137; 1376679869251315227 24-27 Nov 165→159.
  - P12: 1383544079404594066 12-14 Nov 282→294; 1120913156789373408 -£7 / +£8.
- **Our own prices moved:**
  - P09 10-12 Nov £163.50 → **£156**; 10-13 Nov £146.33 → **£141**. This is the PriceLabs last-minute decay: 10 Nov 120 → 117.
  - P20 16-19 Nov £239 → **£251**, despite Reyhan's new -2%.
  - P12 7-10 Dec £290.33 → **£282.33** and 1-3 Dec £281 → **£258**, after Reyhan's -10% from 16 Nov (below).
  - P20 6-9 Nov £216 → **£226**. Other P20 stays moved by £1-2.
  - P04 9-12 Nov £171 → £176.67 and 10-13 Nov £172.67 → £178.33. Other P04 stays moved by -£1-2.
  - P12 November stays fell £6-9 and 30 Nov-3 Dec fell £254.67 → £237.67.

## Summary per property

Columns:
- **Booked 30/60:** confirmed Smoobu nights as a share of sellable nights, for 3 Nov-2 Dec and 3-31 Dec. Handback nights, P04 2 Dec, P12 17 Nov (both deprioritised) and orphan nights below min stay are excluded.
- **Pctl:** `rm/positioning.py` `percentile_rank` against priced comps for the same stay.
- **`recommend`:** run on the median comp percentile of our priced stays in each window, with `quality_premium`. A rating needs at least 5 reviews to count; otherwise `quality_premium` is 0.

| Ref | Our price (Airbnb all-in £/n), same stay | Comp median (n) | Our pctl (vs median) | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market | `recommend` 30 / 60 (comp pctl) |
|---|---|---|---|---|---|---|---|---|
| P01 | none open (booked to 30 Nov; 30 Nov-17 Dec handback block; 18-20 Dec booked) | 420.50 (2) / 384 (5) / 353 (9) / 386.50 (6) | n/a | 4.67 vs 4.64 | 3 vs 29 (-26) | 0.0 (<5 reviews) | 100% / 100% vs 34% / 29% | raise-signal; nothing to sell |
| P04 (synced 1657…) | 9-12 Nov 176.67; 10-13 178.33; 18-21 191.67; 20-23 195; 21-24 192.33; 18-24 176.67; 6-9 Dec 213; 9-12 218.67; 11-14 223; 14-17 215; 17-20 227.33; 6-13 Dec 159.86 (7 n, weekly 15%) | 222 (3) / 193.17 (4) / 239.84 (2) / 253 (2) / 253 (2) / 187.58 (2) / 222 (3) / 257.66 (2) / 222 (1) / 260 (3) / 241 (2) / 207 (1) | **P0-P50, -4% to -24% (one P100 at n=1); 6-13 Dec -22.8%** | **4.11 vs 4.83** | 9 vs 27 (-18) | **-0.15** (cap) | 57% / 52% vs 23% / 20% | raise +10% (P17) / raise +10% (P17) |
| P04 unsynced 1455… | **3-6 Nov £519 total (173/n) and 6-9 Nov £515 (171.67/n), sellable over confirmed stays**; 9-12 165.67; 10-13 171.33; 18-21 175.33; 20-23 180.67; 21-24 179.67; 18-24 157.50; Dec 219.67-231.67; 6-13 Dec 184.43 | as above | 4-8% under the synced listing on 9-24 Nov (11% on 18-24 Nov); 2-5% over it on 3-night December stays; 15% over it on 6-13 Dec | 4.69 vs 4.83 | 26 vs 27 (-1) | -0.056 | n/a | n/a |
| P09 | 10-12 Nov **156** (2 Nov 163.50); 10-13 Nov **141** (2 Nov 146.33) | 166.50 (4) / 165 (5) | **P0 (-6.3%) / P20 (-14.5%)** | 5.0 vs 4.58 | 3 vs 24.5 (-21.5) | 0.0 (<5 reviews) | 87% vs 36% / handback | raise +10% (P10) / n/a |
| P12 | 12-14 Nov 239; 18-20 238; 17-21 218.25; **26-27 Nov 395 (1 n)**; 30 Nov-3 Dec 237.67; 1-3 Dec 258; 7-10 Dec 282.33; 7-13 Dec 268; 11-13 Dec 320.50 | stored: 266.75 (2) / 245.75 (4) / 233.25 (6) / 284 (1) / 237.83 (6) / 245.75 (4) / 225 (3) / 271.84 (2) / 291.75 (2). **Band:** table below | stored P0-P75 (-10.4% to +25.5%); 26 Nov P100 (+39.1%). **Band: Nov P25-P50 (-5.8% to -2.9%); 30 Nov-3 Dec P56 (+5.9%); 1-3 Dec P58 (+5.0%); 7-10 Dec P82 (+5.7%); 7-13 Dec P55 (+1.9%); 11-13 Dec P50 (+0.9%); 26-27 Nov P100 (+39.1%, n=3)** | 4.27 vs 4.86 | 15 vs 18 (-3) | **-0.15** | 67% / 36% vs 40% / 34% (60-day window = 3-13 Dec, before handback) | raise +10% (P50) / hold (P50) |
| P20 | 6-9 Nov 226; 13-16 234.67; 16-19 251; **20-23 274.67**; 22-25 263.33; 5-8 Dec 286.67; 7-10 Dec 277; 11-14 Dec 290; 18-21 Dec 289.33 | 368.67 (5) / 331.84 (8) / 296.33 (11) / 353 (9) / 307.50 (10) / 358 (6) / 307.16 (10) / 290 (9) / 358 (6) | **Nov P0-P30 (-14.4% to -38.7%); Dec P17-P44 (-19.9% to 0.0%)** | none (new) vs 4.80 | 0 vs 18 (-18) | 0.0 (no rating) | 45% / 7% vs 36% / 30% | raise +5% (P12) / fix-listing (P32). NL: hold (P54) / fix-listing (P70) |
| P15 | no listing of ours | 145 (1) / 135 (1) / 159.67 (6) / 155.50 (4) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a |
| P07 | Blocked on purpose (policy) | not analysed | | | | | | |

`*` in the comp tables = found by the 0.3 km second pass.

### P12 reference band (2BR, 10+ reviews, within 1.3 km, same searches; stored comps included; placeholder-like listings 29297702 and 39790006 and our listing excluded)

| Stay | n | Band median | Ours | Our pctl | vs median |
|---|---|---|---|---|---|
| 6-8 Nov | 5 | 224.50 | not bookable | – | – |
| 10-12 Nov | 10 | 230 | not bookable | – | – |
| 24-27 Nov | 13 | 219.33 | not bookable | – | – |
| 1-3 Dec | 12 | 245.75 | 258 | P58 | +5.0% |
| 4-5 Nov (1 n) | 3 | 282 | not bookable (min 2) | – | – |
| 12-14 Nov | 4 | 253.75 | 239 | P25 | -5.8% |
| 18-20 Nov | 8 | 245.75 | 238 | P50 | -3.2% |
| 17-21 Nov | 11 | 224.75 | 218.25 | P45 | -2.9% |
| 26-27 Nov (1 n) | 3 | 284 | 395 | P100 | +39.1% |
| 30 Nov-3 Dec | 16 | 224.50 | 237.67 | P56 | +5.9% |
| 7-10 Dec | 11 | 267 | 282.33 | P82 | +5.7% |
| 7-13 Dec | 11 | 263 | 268 | P55 | +1.9% |
| 11-13 Dec | 8 | 317.75 | 320.50 | P50 | +0.9% |

`quality_premium` vs the stored-comp rating median (4.86) is -0.15 (cap). The band ratings were not re-tabulated today. On 2 Nov they gave -0.12 to -0.15.

## P20: the new 10-13 Nov booking vs comps for the same stay
- **Booking** (`reservations.csv` 3 Nov, booked 2 Nov, Airbnb): room **£510.00** for 3 nights = **£170/n** room only. Cleaning £150 is recorded separately, so the host-side total is £660 = £220/n.
- **What guests saw:** on 2 Nov our listing displayed **£691 all-in = £230.33/n** for 10-13 Nov (`reports/2026-11-02/sections/comp-east.md`). PriceLabs had 231/236/242 for those nights (`prices.csv` 3 Nov).
- **Comps for 10-13 Nov, still bookable today** (Airbnb all-in £/n): 1516006875488990547 £199 (4.76/17, Superhost, river view, lift); 1343981071946969781 £250 (5.0/25, Superhost, balcony); 944872208662374170 £281 (4.91/54, marina view); 51380799 £368.67; 1384811870668527117 £379; 1316210326145130709 £399.33; 27538942 £424. **Median £368.67 (n=7).**
- **Position:** £230.33 all-in is **P14, -37.5% vs median**. Only the 199 comp was cheaper. Five of the 12 stored comps were not bookable for 10-13 Nov today, so they were probably booked (one was 790672189611831800, £286 on 2 Nov). The booking sold at the bottom of the set, not in the middle.
- **Reading:** the price did its job of getting a booking on a 0-review listing, which is the stated aim of the November discount. But the room-only £170/n is 0.72x PriceLabs, and the guest price was 37% under the comp median. The supported November level is about -15% (below), so roughly 20 points of discount went beyond what the review gap explains. Over 3 nights that is about £130-150 at the room level (estimate: £230.33 → about £313/n all-in at -15%; the room share is not separable from Airbnb's fee). **No change proposed for this booking.** It shows what the next November stays would sell at.

## Supported positioning (one line each, then reasoning)
- **P04: about -15% vs comp median (quality-adjusted parity).** Open stays sit at -4% to -24%. `recommend` says raise +10% on both windows (57% vs 23% booked; 52% vs 20%).
  - `quality_premium` is capped at -0.15: 4.11 (9) vs 4.83.
  - Below the supported level: 9-12 Nov (-20%), 18-21 (-20%), 20-23 (-23%), 21-24 Nov (-24%), 9-12 Dec (-15%) and 14-17 Dec (-17%).
  - At or above it: 10-13 Nov, 18-24 Nov, 6-9, 11-14 and 17-20 Dec (-6% to +0.5%).
  - The 6-13 Dec 7-night stay at -23% includes the 15% weekly discount that `policy.json` settles; without it the stay sits at about -9% (n=1).
  - There were no P04 PriceLabs edits on 2-3 Nov (`get_user_logs`). Reyhan's -10% vs Corentin's -8% in `policy.json` is still open for Corentin to confirm. Comp n is only 1-4 per stay.
- **P12, November: hold at about -3% to -6% vs the band; no further cut.**
  - Reyhan deepened the 16 Nov-13 Dec override from -7% to **-10%** and added -5% on 12-13 Nov and -10% on 2-4 Nov (`get_user_logs`, 2 Nov 15:02Z).
  - November open stays now sit at band P25-P50, about what a -13% to -15% quality discount supports.
  - `recommend` gives raise +10% at P50 on 67% vs 40% booked. The quality cap offsets that, so hold.
  - 12-14 Nov is the cheapest point: stored P0 (-10.4%, n=2), band P25 (-5.8%, n=4).
- **P12, 26 Nov (1 night): drop Reyhan's +25%, keep min 1.**
  - The orphan fix proposed on 2 Nov (a-p12-26nov) was done by Reyhan on 2 Nov 15:04Z, with min stay 1 **and +25%** (PriceLabs 352).
  - Airbnb shows **£395 all-in**, against 1-night band prices of 213/284/297 (P100, +39%). A single night carries the whole £150 cleaning, so every 1-night price looks high; ours still tops all three.
  - Evidence n=3. No standing decision covers this.
- **P12, 30 Nov-13 Dec: hold.**
  - Band P50-P58 (+1% to +6%) on 30 Nov-3 Dec, 1-3 Dec, 7-13 and 11-13 Dec. `recommend` gives hold (36% vs 34%).
  - 7-10 Dec is band P82 (+5.7%, n=11), though the 3 stored comps show +25.5% (n=3). The larger band is the better guide.
  - PriceLabs `occ_insights` flags a 5-7 Dec demand rise (+10.0%).
- **P20: November about -15% vs comp median; December hold; the listing, not the price, is the gap.**
  - November stays sit at -14% to -39% (P0-P30). Below the supported level: 6-9 Nov (-39%, 3 days out), 13-16 Nov (-29%), 20-23 Nov (-22%; the delivery block should close it, below), 16-19 Nov (-15%, at level) and 22-25 Nov (-14%).
  - `recommend` gives raise +5% at P12 (45% vs 36% booked) for 13-16 Nov and 16-19 Nov.
  - December sits at -20% to 0% (P17-P44), 7% booked vs 30%. `recommend` gives fix-listing at P32: 0 reviews vs 18 is the gap.
  - **No change to base was found since 2 Nov 00:16Z.** `listings.csv` 3 Nov still shows base 330 and min 200 (Reyhan) against Corentin's 24 Oct base 350 (`policy.json`). The base review did not act on it. Still for Corentin to confirm, not a new proposal.
- **P09: raise 10-12 Nov back to parity (about +6% to +15%).**
  - 10-12 Nov is £156 (P0, -6.3%) and 10-13 Nov £141 (P20, -14.5%). Both fell again overnight on PriceLabs' last-minute decay (10 Nov 117, 11 Nov 127).
  - `recommend` says raise +10% (87% vs 36% booked). Our 5.0 rests on 3 reviews (`quality_premium` 0), so parity is the supported level, not a premium.
  - These are the last 3 nights before the 26 Nov handback, 7 days out. Comps n=4-5.
- **P01: no action.** There are 0 sellable nights before the 20 Dec handback.
- **P15: reference only.** The 1-bed median is £135-160 all-in.

## Critical / high findings
- **CRITICAL: P04 double-booking exposure is still live tonight (t-p04-doublebook NOT fixed).**
  - Checked 3 Nov (Airbnb public search): the unsynced Barking Airbnb **1455876748739910219 is bookable 3-6 Nov at £519** and **6-9 Nov at £515**.
  - The Booking.com guest **arrives today** (3-6 Nov), and 6-9 Nov is a confirmed Airbnb stay (`reservations.csv`).
  - The synced 1657859794156786222 correctly shows neither stay.
  - Corentin should close 3-9 Nov on 1455… now and/or unlist it.
- **HIGH: P20 min stay 2 on 16-19 Nov conflicts with a standing fact.** Reyhan added -2% with min stay 2 on 16-19 Nov (`get_user_logs` 2 Nov 23:26Z), and `prices.csv` shows min 2 there. `policy.json` `listing_facts.P20.min_stay` = "3 nights from 25 Oct to 30 Nov". For Corentin to confirm.
- **HIGH: P20 base 330 / min 200 still conflicts with Corentin's base 350** (above). There was no base change on 2-3 Nov.
- **HIGH: the P20 20-22 Nov delivery block is still not in place (t-p20-delivery NOT fixed).** Airbnb sells **20-23 Nov at £824 total** (3 Nov). `policy.json` records this block as intentional.
- **MEDIUM: P12 26 Nov +25%** puts the newly opened orphan night above every 1-night comp (£395 vs 213-297). Proposal: set it to 0% and keep min 1.
- **MEDIUM: P20 November discount runs deeper than the review gap explains.** The new 10-13 Nov booking sold at P14 / -37.5% vs comps. 13-16 Nov is at -29%. A +5% step on 13-19 Nov is supported (`recommend`).
- **MEDIUM: P09 10-12 Nov is drifting under the comps** (-6% / -15%) on 87% vs 36% booked. Proposal: stop the decay at about comp parity.
- **Still open (no edits on 2-3 Nov):** Reyhan's P04 -10% vs Corentin's -8%. Not re-raised: P12 17 Nov (deprioritised) and P04 2 Dec (deprioritised).

## Plan items in this batch (logs read 3 Nov)
- **t-p04-doublebook:** NOT fixed (above).
- **t-p20-delivery:** NOT fixed (20-23 Nov sellable).
- **a-p12-26nov:** DONE on 2 Nov 15:04Z (Reyhan: min 1, +25%). The night is now sellable but priced above the comps.
- **a-p13-record items in this batch:** P20 base: no change (330); P04 -10%: no change; P12 17 Nov: deprioritised, not re-raised.
- **Base review (a-base-review-1102), this batch:** no `base_price` change on P01, P04, P09, P12 or P20 since 2 Nov 06:00Z. The only base change in the window is Reyhan's P20 350→330 at 00:16Z on 2 Nov, before 06:00Z.
- **18 Oct base rises, running effect** (bookings made from 19 Oct vs 4-18 Oct, `reservations.csv` 3 Nov): P01 1 vs 1; P09 1 vs 3; P12 5 confirmed + 1 cancelled vs 2. No change since 2 Nov.

## Comp tables (Airbnb, guest-paid all-in £/night incl. cleaning and fees; checked 2026-11-03; "2 Nov x" = same comp and stay on 2 Nov where it differs by more than £1; full source per row in `data/snapshots/2026-11-03/comps.csv`)

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.67 (3)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec |
|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | 186.67 (2 Nov 220) | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 457 (2 Nov 454) | 465 | 449.67 (2 Nov 446.33) | 409 (2 Nov 437) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.45 (154) | none listed | – | 195 | 200 | 208 |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (55) | Lift | – | 416 | 372 (2 Nov 400.33) | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.61 (28) | Lift/River view/balcony | – | – | 255 | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | – | 389 (2 Nov 378.50) |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | 353 | 422 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.81 (16) | Lift | – | 285 | – | 335 |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.64 | 5 | 4.37 (38) | Paid parking on premises | 384 | 384 | 379 | 384 |
| [20404597 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/20404597) | 0.68 | 6 | 4.67 (24) | Canal view/Lift/River view/Superhost/balcony | – | – | – | – |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.64 (29.0) | | **420.50** (2) | **384** (5) | **353** (9) | **386.50** (6) |
| **Our pctl (vs median)** | | | | | – | – | – | – |

### P20 Waterford Court 2BR, max 4 (ours: Airbnb 1791529331262420081, New, 0 reviews); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 6 Nov-9 Nov | 10 Nov-13 Nov | 13 Nov-16 Nov | 16 Nov-19 Nov | 20 Nov-23 Nov | 22 Nov-25 Nov | 5 Dec-8 Dec | 7 Dec-10 Dec | 11 Dec-14 Dec | 18 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – | 281 | 281 | 283 | 281 | 281.67 | 281.67* | 281 | 281 | 282.33 | 281 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises (added 31 Oct) | – | – | – | – | – | – | 295 | 296.33 (2 Nov 294.67) | – | – | – | 281 (2 Nov 284.33) | 272 (2 Nov 276.33) | – |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises | – | 347 | – | 403.50 | – | – | – | 434.67 (2 Nov 393.33) | 393.33 | – | – | 393.33 | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (55) | Lift | – | 416 | 372 (2 Nov 400.33) | – | – | 399.33 (2 Nov 395.33) | 395 | 371* | 353 | 339 (2 Nov 366.33) | 391 (2 Nov 394.67) | 376.33* (2 Nov 380.67) | 413.67 (2 Nov 415) | 392.33 (2 Nov 395) |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – | 424 | 424 | 424 | 424 (2 Nov 382.67) | 382.67 | 382.67 | 382.67 | 382.67 | 382.67 | 382.67 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony | – | – | 353 | 422 | – | – | – | – | 353 | 337 | 392.33 | – | 463.67 | 479 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises | – | – | 261.67 | 281.50 | – | – | – | 286 (2 Nov 261.67) | 276.33 | 261.67 | – | 261.67 | 276.33 | – |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony | – | – | 333.33 | – | 368.67 | 368.67 | 368.67 | 368.67 (2 Nov 333.33) | 333.33 | 333.33 | 333.33 | 333.33 | 333.33* | 333.33 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost | – | 211 | 229.33 (2 Nov 233) | – | – | 199 (2 Nov 210.67) | 208.33 | 210 (2 Nov 215) | – | 224.67 (2 Nov 213) | – | – | – | – |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.65 | 5 | 4.37 (38) | Paid parking on premises | 384 | 384 | 379 | 384 | 379 | 379 | 379 | 379 | 379 | 379 | – | 379 | – | – |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises | – | 288.50 | 250 | 264 | – | – | – | 274.33* (2 Nov 250) | – | 250* | – | 250 | 250 | – |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 310 | 270 | 250 | 290 | 290 | 250 | 290 | 250 | 290 | 263.33 | 283.33 | 270 | 290 | 312 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | **226** | not bookable | **234.67** | **251** | **274.67** | **263.33** | **286.67** | **277** | **290** | **289.33** |
| **Comp median (n)** | | | 4.8 (18.0) | | **347** (2) | **317.75** (6) | **307.16** (10) | **337** (6) | **368.67** (5) | **368.67** (7) | **331.84** (8) | **296.33** (11) | **353** (9) | **307.50** (10) | **358** (6) | **307.16** (10) | **290** (9) | **358** (6) |
| **Our pctl (vs median)** | | | | | – | – | – | – | P0 (-38.7%) | – | P12 (-29.3%) | P18 (-15.3%) | P0 (-22.2%) | P30 (-14.4%) | P33 (-19.9%) | P30 (-9.8%) | P44 (+0.0%) | P17 (-19.2%) |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.11 (9); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 3 Nov-6 Nov | 6 Nov-9 Nov | 9 Nov-12 Nov | 10 Nov-13 Nov | 18 Nov-21 Nov | 20 Nov-23 Nov | 21 Nov-24 Nov | 18 Nov-24 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | 257.67 | – | – | 257.67 | 257.67* | 257.67 | 257.67 | 257.67 | 257.67 | 250.17 | – | – | – | 260 | 260 | – |
| [1083936003491396261](https://www.airbnb.co.uk/rooms/1083936003491396261) | 1.24 | 5 | 4.9 (40) | Superhost (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | 125 | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (24) | Free parking on premises/Superhost/Guest favourite | – | 114 | 138 (2 Nov 140) | – | – | – | – | 112 (2 Nov 119.67) | – | – | – | – | – | – | – | – | – | – |
| [1343991336860365461](https://www.airbnb.co.uk/rooms/1343991336860365461) | 1.81 | 6 | 4.43 (14) | Paid parking on premises | – | – | – | – | 130 | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.82 (39) | Free parking on premises/Superhost (added 30 Oct) | – | – | 248.33 | – | – | – | – | – | – | 248.33 | 248.33 | – | 293.33 | 293.33 | – | 293.33 | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | 222 | 222 | – | 222 | – | 222 | 222 | 222 | 222 | – | – | – | 222 | 222 | 222 | 222 | 222 | 207 |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 | 6 | 4.85 (27) | Parking (in name) (added 1 Nov) | 173 | 173 | 178 | – | – | 164.33 | 164.33 | 164.33 | – | – | – | – | 178 | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **176.67** | **178.33** | **191.67** | **195** | **192.33** | **176.67** | **213** | **218.67** | **223** | **215** | **227.33** | **159.86** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | 173 | 171.67 | 165.67 | 171.33 | 175.33 | 180.67 | 179.67 | 157.50 | 224.33 | 225 | 227 | 219.67 | 231.67 | 184.43 |
| **Comp median (n)** | | | 4.83 (27) | | **197.50** (2) | **173** (3) | **213.17** (4) | **222** (1) | **130** (1) | **222** (3) | **222** (3) | **193.17** (4) | **239.84** (2) | **253** (2) | **253** (2) | **187.58** (2) | **222** (3) | **257.66** (2) | **222** (1) | **260** (3) | **241** (2) | **207** (1) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | P33 (-20.4%) | P50 (-7.7%) | P0 (-20.1%) | P0 (-22.9%) | P0 (-24.0%) | P50 (-5.8%) | P33 (-4.1%) | P0 (-15.1%) | P100 (+0.5%) | P0 (-17.3%) | P50 (-5.7%) | P0 (-22.8%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 10 Nov-13 Nov |
|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 168 | 168 | – | – | 165 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 165 | 165 | – | – | 162 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.73 (22) | none listed | – | – | 159.33* (2 Nov 165.33) | 166.50 | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | 200.50 | 200.50 | 196.67 | 248.50* | 196.67 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | 156.50 | – | 248 (2 Nov 244.50) | 137.33 (2 Nov 143) |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | 244.33 | – | 242.67 |
| **Ours** | | | | | not bookable | **156** | not bookable | not bookable | **141** |
| **Comp median (n)** | | | 4.58 (24.5) | | **168** (3) | **166.50** (4) | **196.67** (3) | **248** (3) | **165** (5) |
| **Our pctl (vs median)** | | | | | – | P0 (-6.3%) | – | – | P20 (-14.5%) |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Nov-5 Nov | 12 Nov-14 Nov | 18 Nov-20 Nov | 17 Nov-21 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 7 Dec-10 Dec | 7 Dec-13 Dec | 11 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 242.50* (2 Nov 237.50) | 242.50 | 225 | 237.50 | – | 240 (2 Nov 237.50) | 237.50 | 218.75* | – | 225 | 225* | 212.50 | 237.50 |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (18) | Paid parking on premises | – | – | 311.67 | – | – | – | – | 297.50 | – | 316.67 | – | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (78) | Superhost | – | – | 201.33 | – | – | – | – | 198.75 (2 Nov 205.50) | – | 215.33 (2 Nov 207.33) | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | – | 175 | 185 | 220 | – | – | 185 | 185 | – | 208.33 | 220 | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (119) | Superhost/balcony/Guest favourite | – | 254 | 250.67 | 254 | 282 | – | 254 | 247.75 | 284 | 250.67 | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | 1035 | 1035 | 1032.33 | 1035 (2 Nov 1054.50) | 1064 | 1052.50 (2 Nov 1047) | 1035 | 1031 | 1043 | 1032.33 (2 Nov 1045.33) | 1032.33 | 1034.17 | 1035 (2 Nov 1051) |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | – | 282 | 312.67 | 298 | – | 293.50 (2 Nov 282) | 297 | 300.50 | – | 296 | 323.67 | 331.17 | 346 |
| **Ours** | | | | | not bookable | not bookable | not bookable | **258** | not bookable | **239** | **238** | **218.25** | **395** | **237.67** | **282.33** | **268** | **320.50** |
| **Comp median (n)** | | | 4.86 (18) | | **242.50** (1) | **248.25** (4) | **237.83** (6) | **245.75** (4) | **282** (1) | **266.75** (2) | **245.75** (4) | **233.25** (6) | **284** (1) | **237.83** (6) | **225** (3) | **271.84** (2) | **291.75** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | P75 (+5.0%) | – | P0 (-10.4%) | P50 (-3.2%) | P33 (-6.4%) | P100 (+39.1%) | P50 (-0.1%) | P67 (+25.5%) | P50 (-1.4%) | P50 (+9.9%) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec |
|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 159.67 | 170.50 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | – | – | 164.33* | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | – | 135 | 135 | 135* |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | 159.67 | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.92 (25) | Free parking on premises/Guest favourite | 145 | – | 181 | 181 |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (201) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | – | – | – | 140.50 |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | 146.67* | – |
| **Comp median (n)** | | | 4.84 (14) | | **145** (1) | **135** (1) | **159.67** (6) | **155.50** (4) |

- **Comp attributes.** Lift, view and parking are carried from earlier amenity reads (25 Oct-1 Nov). Ratings and review counts come from today's search cards where returned, otherwise from 2 Nov. Comp cancellation policies are NOT CHECKED.

## P07 Woolwich, 1-bed
Blocked on purpose (policy). No comps, no advice.

---

Data gaps:
1. **Booking.com NOT CHECKED** (not tried). Comps are Airbnb only, and our Booking.com displayed prices are not covered.
2. **Thin comp n.** P04 has 1-4 priced comps per stay, and 593405916827094880 prices £222 on every 3-night date. The 11-14 Dec P100 and 6-13 Dec readings rest on n=1. P12 stored comps have n=1-6, so positioning rests on the band, whose sleeps and ratings were not tabulated today. P01 6-8 Nov and P20 6-8 Nov have n=2; P15 6-8 and 10-12 Nov have n=1.
3. **Stay change.** The midweek trend stay moved from 3-5 Nov to 10-12 Nov, so it has no 2 Nov baseline. 13-16 Nov (P20) and 4-5 Nov (P12) are also new.
4. **P20 booking comparison.** Our guest-paid price for 10-13 Nov is the 2 Nov display (£691), because the stay is now booked. Comps are the 7 still bookable today; the 5 that were not bookable (probably booked) are unpriced. Airbnb's guest service fee on our booking is not visible in Smoobu.
5. **P01 comp 20404597** was not bookable on any of today's 4 stays. Whether it is inactive is NOT CHECKED; replace it if it is missing again tomorrow.
6. **P04.** Which Airbnb account holds 1455… is NOT CHECKED, and so is the rule behind its pricing (no weekly discount). Cleaning fees on both P04 Airbnb listings are unknown.
7. **PriceLabs.** NL percentiles are a market band, not comps. Competitor Listings and Market Dashboard were not used, and the raw neighbourhood JSON was not saved. Overrides were not re-read in full; changes come from `get_user_logs` (2-3 Nov). `pl_kpis.csv` occupancy (P12 60%/67%, P20 47%/28%) differs from the Smoobu-based counts used here.
8. **Not analysed:** P15 (no listing of ours) and P07 (blocked, policy). P20 is still missing from `build/properties.py`. Cancellation policies (ours and comps) are NOT CHECKED.
