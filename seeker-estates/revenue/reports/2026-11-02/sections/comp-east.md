# Competitor positioning: EAST batch (D = 2026-11-02)

**Method**
- **Comp ids.** Same comp ids as 1 Nov (`data/snapshots/2026-11-01/comps.csv`), same search boxes and guest counts: 4 guests for 2-beds, 3 for 1-beds. P04 uses a 2.5 km box, P09 1.8 km, the others 1.3 km. **No comp replaced today:** every stored comp was bookable on at least one checked stay.
- **Access.** Airbnb plain public pages (HTTP 200), same curl as 26 Oct-1 Nov. 58 wide searches (2 of them for P12 26-27 and 27-30 Nov), then 279 searches in a 0.3 km box around each comp (and our listing) the wide search had not priced; 21 extra prices came from that pass (marked `*`). "–" = not bookable for that stay in either pass. Booking.com was not tried.
- **Price basis.** Guest-paid **all-in total ÷ nights**: after any discount, with cleaning and Airbnb fees included. Airbnb shows no separate taxes.
- **P04 "ours"** = synced listing 1657859794156786222, 4.11 (9), sleeps 6. The unsynced Barking listing 1455876748739910219, 4.69 (26), has its own row.
- **Stays.** Every ref keeps the trend stays 6-8 Nov (next Fri-Sun), 3-5 Nov (Tue-Thu), 24-27 Nov and 1-3 Dec (30 days out). Open-night stays come from Smoobu `reservations.csv` and `prices.csv` (2 Nov):
  - **P04 (min 3):** 9-12 and 10-13 Nov; 18-21, 20-23, 21-24 and 18-24 Nov; 6-9, 9-12, 11-14, 14-17 and 17-20 Dec, plus 6-13 Dec (7 nights). Together these cover 6-19 Dec. Plus 3-6 and 6-9 Nov as the double-sell check.
  - **P12:** 3-5, 12-14, 18-20 and 17-21 Nov; **30 Nov-3 Dec**; 1-3 Dec; 7-10, 7-13 and 11-13 Dec. Also **26-27 Nov and 27-30 Nov** for comps only: these are the orphan night and the new booking.
  - **P20 (min 3):** 6-9, 10-13, 16-19, 20-23 and 22-25 Nov; 5-8, 7-10, 11-14 and 18-21 Dec.
  - **P09:** 10-12 and 10-13 Nov. That is the only gap before the 26 Nov handback.
- **Data written.** 535 rows appended to `data/snapshots/2026-11-02/comps.csv` under `flock` on `.comps.csv.lock`. The file was new, so a header was written. The rows are 485 `comp-east` rows (all comps × their stays, NOT RETURNED rows kept, including 14 P12 rows for 26-27/27-30 Nov) and 50 `east-refband` rows (the P12 band; these are not stored comps).
- **PriceLabs (read-only, one call at a time):** `get_neighbourhood_data` ×5 (P01, P04, P09, P12, P20; all `all_operations_ok`) and `get_user_logs` (5 listings, 1-2 Nov: 4 entries, all Reyhan, all on P20).

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 2 Nov)

| Ref | Band (n) | P25/P50/P75/P90 today | 1 Nov | Market occ 30/60 (`pl_kpis.csv` 2 Nov) | Our PL avg on sellable open nights, NL pctl (2 Nov-1 Dec / 2-31 Dec) |
|---|---|---|---|---|---|
| P01 | 2BR (148) | 214/258/331/421 | 214/257/331/420 | 34% / 28% | no open nights |
| P04 | 2BR (91) | 139/171/218/258 | 139/168/218/257 | 24% / 20% | £182.5 P56 / £191.6 P61 |
| P09 | 1BR (126) | 110/132/160/204 | 110/132/162/204 | 36% / 31% | £136.7 P54 / handback |
| P12 | 2BR (119) | 170/206/246/306 | 170/206/244/303 | 40% / 34% | £239.0 P71 / £284.9 P85 (2-13 Dec) |
| P20 | 2BR (154) | 214/252/314/411 | 215/254/314/409 | 37% / 30% | £249.3 P48 / £300.6 P70 |

- These are market bands, not comps; their horizon and cleaning treatment are not stated. The bands barely moved overnight.
- **Same comp, same stay vs 1 Nov:** the median change is **0.0% on every ref and stay**. Moves over £5:
  - P01: 41905186 1-3 Dec 462 → 437; 1316210326145130709 24-27 Nov 425 → 400.33.
  - P20: 1568001017881493647 up £32-49 on 16-19 Nov and 7-10/11-14 Dec; 1316210326145130709 22-25 Nov 399.67 → 366.33; 1516006875488990547 24-27 Nov 216.33 → 233.
  - P09: 1224431716304626406 1-3 Dec 200.50 → 248.50; 1376679869251315227 24-27 Nov 174.67 → 165.33.
  - P12: 1670196516322802487 205 → 185 on 24-27 and 17-21 Nov; 1120913156789373408 up £4-9.
  - P15: 1617544963466664181 1-3 Dec 190 → 170.50.
- **Our own prices moved more than the comps:**
  - P20: 20-23 Nov £763 → **£831**; 5-8 Dec £970 → **£863**.
  - P12: 1-3 Dec £620 → **£562** (it entered the about-28-day Airbnb window, as forecast yesterday).
  - P09: 10-12 Nov £349 → **£327** (PriceLabs 10 Nov 145 → 120).
  - P20's moves are Reyhan's edits of 2 Nov 00:16Z (below), not comp moves.

## Summary per property

Columns:
- **Booked 30/60:** confirmed Smoobu nights as a share of sellable nights, for 2 Nov-1 Dec and 2-31 Dec. Handback nights, P04 2 Dec, P12 17 Nov (both deprioritised) and orphan nights below min stay are excluded.
- **Pctl:** `rm/positioning.py` `percentile_rank` against priced comps for the same stay.
- **`recommend`:** run on the median comp percentile of our priced stays in each window, with `quality_premium`.

| Ref | Our price (Airbnb all-in £/n), same stay | Comp median (n) | Our pctl (vs median) | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market | `recommend` 30 / 60 (comp pctl) |
|---|---|---|---|---|---|---|---|---|
| P01 | none open (booked to 30 Nov; 30 Nov-17 Dec handback block; 18-21 Dec booked) | 359.50 (4) / 384 (1) / 363.66 (10) / 381.25 (6) | n/a | 4.67 vs 4.63 | 3 vs 29.5 (-26.5) | 0.0 (<5 reviews) | 100% / 100% vs 34% / 28% | raise-signal; nothing to sell |
| P04 (synced 1657…) | 9-12 Nov 171; 10-13 172.67; 18-21 192.67; 20-23 195.67; 21-24 193.33; 18-24 177.83; 6-9 Dec 213.67*; 9-12 219.33; 11-14 224.33; 14-17 216.67; 17-20 228; 6-13 Dec 160.43 (7 nights, weekly 15%) | 222 (3) / 193.17 (4) / 239.84 (2) / 253 (2) / 253 (2) / 187.58 (2) / 241 (4) / 260 (3) / 241 (2) / 260 (3) / 241 (2) / 228 (2) | **P0-P50 (-5.2% to -23.6%; 6-13 Dec -29.6%)** | **4.11 vs 4.83** | 9 vs 27 (-18) | **-0.15** (cap) | 59% / 52% vs 24% / 20% | raise +10% (P17) / raise +10% (P12) |
| P04 unsynced 1455… | **3-6 Nov 173 and 6-9 Nov 171.67, sellable over confirmed stays**; 9-12 165.67; 10-13 171.33; 18-21 175.33; 20-23 180.67; 21-24 179.67; 18-24 157.50; Dec 219.67-231.67; 6-13 Dec 184.43 | as above | 1-11% under our synced listing on 9-24 Nov; 1-5% over it on 3-night December stays; 15% over it on 6-13 Dec | 4.69 vs 4.83 | 26 vs 27 (-1) | -0.056 | n/a | n/a |
| P09 | 10-12 Nov **163.50** (1 Nov 174.50); 10-13 Nov **146.33** (1 Nov 155.33) | 166.50 (4) / 165 (5) | **P25 (-1.8%) / P20 (-11.3%)** | 5.0 vs 4.58 | 3 vs 24.5 (-21.5) | 0.0 (<5 reviews) | 88% vs 36% / handback | raise +10% (P22) / n/a |
| P12 | 3-5 Nov 215; 12-14 248; 18-20 244; 17-21 224; **30 Nov-3 Dec 254.67**; 1-3 Dec 281; **7-10 Dec 290.33**; 7-13 Dec 276.33; 11-13 Dec 329.50 | stored: 244.75 (4) / 259.75 (2) / 245.75 (4) / 233.25 (6) / 237.83 (6) / 245.75 (4) / 225 (3) / 271.84 (2) / 292.25 (2). **Band:** table below | stored P25-P75 (-12.2% to +29.0%). **Band: Nov P33-P60 (-14.7% to +4.4%); 30 Nov-3 Dec P71 (+14.3%); 1-3 Dec P73 (+18.3%); 7-10 Dec P77 (+29.0%); 7-13 Dec P58 (+3.1%); 11-13 Dec P57 (+4.9%)** | 4.27 vs 4.86 (band 4.57-4.92) | 15 vs 18 (-3) | **-0.15** (stored); -0.12 to -0.15 vs band | 67% / 36% vs 40% / 34% (60d = 2-13 Dec, before handback) | raise +10% (P50) / hold (P50) |
| P20 | 6-9 Nov 216; 10-13 230.33; 16-19 239; **20-23 277**; 22-25 264; 5-8 Dec 287.67; 7-10 Dec 277.67; 11-14 Dec 290; 18-21 Dec 289 | 373.84 (6) / 327.34 (8) / 287.84 (10) / 333.33 (9) / 307.50 (10) / 358 (6) / 333.33 (11) / 290 (9) / 358 (6) | **Nov P0-P40 (-14.1% to -42.2%); Dec P17-P44 (-19.6% to 0.0%)** | none (New) vs 4.80 | 0 vs 18 (-18) | 0.0 (no rating) | 34% / 10% vs 37% / 30% | raise +5% (P12) / fix-listing (P30). NL: raise +5% (P48) / fix-listing (P70) |
| P15 | no listing of ours | n/a (0) / 140.25 (2) / 159.67 (5) / 155.50 (4) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a |
| P07 | Blocked on purpose (policy) | not analysed | | | | | | |

`*` = found by the 0.3 km second pass.

### P12 reference band (2BR, 10+ reviews, within 1.3 km, same searches; stored comps included; placeholder 29297702 and our listing excluded)

| Stay | n | Band median | Band rating median | Ours | Our pctl | vs median | `quality_premium` vs band |
|---|---|---|---|---|---|---|---|
| 6-8 Nov | 4 | 223.50 | 4.57 | not bookable | – | – | -0.118 |
| 3-5 Nov | 3 | 252 | 4.92 | 215 | P33 | -14.7% | -0.15 |
| 24-27 Nov | 12 | 208.34 | 4.88 | not bookable | – | – | -0.15 |
| 1-3 Dec | 11 | 237.50 | 4.80 | 281 | P73 | +18.3% | -0.15 |
| 12-14 Nov | 5 | 237.50 | 4.59 | 248 | P60 | +4.4% | -0.128 |
| 18-20 Nov | 6 | 245.75 | 4.61 | 244 | P50 | -0.7% | -0.136 |
| 17-21 Nov | 9 | 224.75 | 4.89 | 224 | P44 | -0.3% | -0.15 |
| 30 Nov-3 Dec | 14 | 222.84 | 4.88 | 254.67 | P71 | +14.3% | -0.15 |
| 7-10 Dec | 13 | 225 | 4.70 | 290.33 | P77 | +29.0% | -0.15 |
| 7-13 Dec | 12 | 268 | 4.65 | 276.33 | P58 | +3.1% | -0.15 |
| 11-13 Dec | 7 | 314 | 4.59 | 329.50 | P57 | +4.9% | -0.128 |

**Around the new 27-30 Nov Booking.com booking (stored comps, Airbnb all-in):**
- 27-30 Nov: 1077363497194834681 £225, 1120913156789373408 £232.33, 1098554019818216597 £306.67; **median £232.33 (n=3)**. Our booking is £217.80/n room only, cleaning excluded (`reservations.csv`, £653.39 / 3). So the booking sold at roughly comp level, not cheaply, even at 0.797x PriceLabs.
- 26-27 Nov (1 night): 53017356 £284 and 1383544079404594066 £318 (n=2). **Our 26 Nov is now a 1-night orphan** between the 21-26 and 27-30 Nov bookings. With min stay 2 (`prices.csv`) it cannot sell, and our listing was not returned for it.

## Supported positioning (one line each, then reasoning)
- **P04: about -15% vs comp median (quality-adjusted parity).** Open stays sit at -5% to -24%, and `recommend` says raise +10% on both windows (59% vs 24% booked).
  - `quality_premium` is capped at -0.15: 4.11 (9) vs 4.83.
  - Below the supported level: 9-12 Nov (-23%), 18-21 (-20%), 20-23 (-23%), 21-24 Nov (-24%), 9-12 Dec (-16%) and 14-17 Dec (-17%). The last two are new today and n=3.
  - At or above it: 10-13 Nov, 18-24 Nov, 6-9, 11-14 and 17-20 Dec (-5% to -11%).
  - The 6-13 Dec 7-night stay at -30% includes the 15% weekly discount that `policy.json` settles. Without it, the stay would sit at about -17%.
  - P04 overrides were not edited since 1 Nov (no `get_user_logs` entries). Reyhan's -10% on 9-24 Nov and 6-22 Dec still stands against Corentin's -8% in `policy.json`. This conflict is still open for Corentin to confirm. n is 2-4 comps per stay.
- **P12, November open nights: hold.** We are at band P33-P60 (-15% to +4%). A quality discount of 13-15% offsets the demand lead (67% vs 40%; `recommend` raise +10% at P50).
- **P12, 30 Nov-13 Dec: hold, with 7-10 Dec on watch.**
  - 7-13 and 11-13 Dec sit at +3% to +5% (P57-P58). 30 Nov-3 Dec and 1-3 Dec sit at +14% to +18% (P71-P73). `recommend` gives hold (36% vs 34%).
  - 7-10 Dec (Mon-Thu) is at +29% (P77, n=13), because the Airbnb ratio is 0.90 outside the about-28-day window. It should fall to about £255/n (+13%) on its own after 9 Nov.
  - PriceLabs `occ_insights` flags a 4-7 Dec demand rise (+8.2%). This, plus Reyhan's -7% already on 16 Nov-13 Dec, means no extra cut is supported.
- **P20: November about -15% (hold to +5%); December hold; the listing, not the price, is the gap.**
  - November: -14% to -42% (P0-P40), booked 34% vs 37%. `recommend` gives raise +5% at P12.
  - December: -20% to 0% (P17-P44), booked 10% vs 30%. `recommend` gives fix-listing at P30.
  - The discount comes from 0 reviews vs 18 and the flat Airbnb 0.766 November ratio.
  - **Reyhan cut base 350 → 330 and min 220 → 200 on 2 Nov 00:16Z**, and replaced the 6-24 Nov -10% with -5% (via -3%). The base cut conflicts with Corentin's 24 Oct base 350 in `policy.json`. It moved December from -10%/+12% (1 Nov) to -20%/0% today, with no comp evidence that 350 was too high. **For Corentin to confirm, not a new proposal.**
  - The new -5% matches Corentin's value but runs to 24 Nov instead of 19 Nov.
- **P09: hold (parity).**
  - 10-12 Nov: £163.50 (P25, -1.8%). 10-13 Nov: £146.33 (P20, -11.3%).
  - Both stays fell about 6% overnight, from PriceLabs' own last-minute decay (10 Nov 145 → 120).
  - `recommend` says raise +10% (88% vs 36%), but our 5.0 rests on 3 reviews (`quality_premium` 0). These are the last 3 nights before the 26 Nov handback, 8 days out.
- **P01: no action.** There are 0 sellable nights before the 20 Dec handback.
- **P15: reference only.** The 1-bed median is £140-160 all-in.

## Input for today's base review (2 Nov), raised flats in this batch
- **P01 (base 253): keep 253.** Nothing is sellable before the 20 Dec handback, and same-stay comps sit at £360-384 all-in. Bookings made since 19 Oct: 1 (18-21 Dec), vs 1 made 4-18 Oct.
- **P09 (base 176): keep 176.** The only inventory is 10-12/10-13 Nov, at P20-P25 (-2% to -11%) with 88% vs 36% booked, 8 days before the 26 Nov handback. Bookings since 19 Oct: 1 (13-15 Nov), vs 3 made 4-18 Oct.
- **P12 (base 284): keep 284. Do not stack a base cut on Reyhan's -7% (16 Nov-13 Dec).**
  - Open November stays sit at band P33-P60. December sits at P57-P77 and is self-correcting as stays enter the about-28-day Airbnb window.
  - Bookings since 19 Oct: 5 confirmed plus 1 cancelled, vs 2 made 4-18 Oct. The new 27-30 Nov booking was made 1 Nov at £217.80/n room, vs a comp all-in median of £232.33.
  - Fix the 26 Nov orphan instead (below).

## Critical / high findings
- **CRITICAL: P04 double-booking exposure is still live (t-p04-doublebook NOT fixed).**
  - On 2 Nov the unsynced Barking Airbnb 1455876748739910219 is bookable:
    - **3-6 Nov at £519**, over the confirmed Booking.com stay that **arrives tomorrow**;
    - **6-9 Nov at £515**, over the confirmed Airbnb stay.
  - The synced 1657859794156786222 correctly shows neither stay.
  - Corentin should close 3-9 Nov on 1455… today and/or unlist it.
- **HIGH: P20 base cut conflicts with a standing decision.** Reyhan cut base 350 → 330 and min 220 → 200 (2 Nov 00:16Z) against Corentin's 24 Oct base 350. December Airbnb prices fell about 11% (5-8 Dec £970 → £863). For Corentin to confirm.
- **HIGH: the P20 20-22 Nov delivery block is still not in place (t-p20-delivery NOT fixed).** Airbnb sells **20-23 Nov at £831** on 2 Nov (it was £763 on 1 Nov). `policy.json` `listing_facts.P20.block_20_21_nov` records this as an intentional block.
- **HIGH (still open):** Reyhan's P04 -10% (vs Corentin's -8%) and P12 17 Nov -7% min 2 (vs the deprioritised +50%). There were no edits since 1 Nov.
- **MEDIUM: P12 26 Nov orphan night.** The 27-30 Nov booking left a single night that min stay 2 blocks. The 1-night comps are £284-318 all-in. Proposal: allow 1-night stays on 26 Nov only. P04's never-under-3 rule does not apply to P12.
- **MEDIUM: the unsynced P04 listing has no weekly discount.** It sells 6-13 Dec at 0.97x PriceLabs, vs 0.845x on the synced listing. It undercuts the synced listing on 18-24 Nov (£945 vs £1,067).
- **Airbnb pricing-rule cut unchanged (a-airbnb-rules NOT fixed).** Room = (Airbnb total - £150 cleaning, assumed) ÷ PriceLabs sum, `prices.csv` 2 Nov:
  - P20: 0.765-0.766 on every November stay, 0.900-0.901 on every December stay.
  - P12: 0.62-0.81 inside about 28 days, 0.82-0.90 beyond.
  - P04 synced (cleaning unknown), raw total ÷ PriceLabs: 1.00-1.02 on 3-night November stays and 1.14-1.16 in December.

## Plan items in this batch (logs read 2 Nov)
- **t-p04-doublebook:** NOT fixed (above).
- **t-p20-delivery:** NOT fixed (20-23 Nov sellable).
- **Reyhan conflicts:** P20 changed overnight. The override went from -10% to -5% on 6-24 Nov, and there is a new base/min cut. P04 and P12 are unchanged.
- **a-raise-1012nov (P09):** there was no edit. 10-12 Nov fell to £327 (from £349) on PriceLabs decay.
- **a-p12-2228nov:** superseded by the 27-30 Nov booking and Reyhan's -7%. 22-26 Nov is now booked except the 26 Nov orphan.
- **18 Oct base rises, running effect** (bookings made from 19 Oct vs 4-18 Oct, `reservations.csv` 2 Nov):
  - P01: 1 vs 1.
  - P09: 1 vs 3.
  - P12: 5 confirmed + 1 cancelled vs 2. The new one was made 1 Nov.

## Comp tables (Airbnb, guest-paid all-in £/night incl. cleaning and fees; checked 2026-11-02; "1 Nov x" = same comp and stay on 1 Nov where it differs by more than £1; full source per row in `data/snapshots/2026-11-02/comps.csv`)

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.67 (3)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec |
|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | 220 | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 454 (1 Nov 457) | – | 446.33 (1 Nov 444.33) | 437 (1 Nov 462) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.45 (153) | none listed | – | – | 201 | 208 |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (55) | Lift | – | – | 400.33 (1 Nov 425) | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.55 (29) | Lift/River view/balcony | – | – | 255 | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | 374.33 | 378.50 (1 Nov 368.50) |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | 353 | 422 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.81 (16) | Lift | 335 | – | – | 335 |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.64 | 5 | 4.37 (38) | Paid parking on premises | 384 | 384 | 379 | 384 |
| [20404597](https://www.airbnb.co.uk/rooms/20404597) | 0.68 | 6 | 4.67 (24) | Canal view/Lift/River view/Superhost/balcony | 315 | – | – | – |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.63 (29.5) | | **359.50** (4) | **384** (1) | **363.66** (10) | **381.25** (6) |
| **Our pctl (vs median)** | | | | | – | – | – | – |

### P20 Waterford Court 2BR, max 4 (ours: Airbnb 1791529331262420081, New, 0 reviews); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 6 Nov-9 Nov | 10 Nov-13 Nov | 16 Nov-19 Nov | 20 Nov-23 Nov | 22 Nov-25 Nov | 5 Dec-8 Dec | 7 Dec-10 Dec | 11 Dec-14 Dec | 18 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.12 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – | 281 | 281 | 281 | 281.67 | 281.67 | 281 | 281 | 282.33* (1 Nov 281) | 281 |
| [1568001017881493647](https://www.airbnb.co.uk/rooms/1568001017881493647) | 0.3 | 4 | 4.87 (23) | Private patio or balcony/Free driveway parking on premises (added 31 Oct) | – | – | – | – | – | – | 294.67 (1 Nov 253) | – | – | – | 284.33* (1 Nov 235.33) | 276.33 (1 Nov 244.33) | – |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises | 444.50 | – | – | 403.50 | 434.67 | – | 393.33 | 393.33 | – | – | 393.33 | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (55) | Lift | – | – | 400.33 (1 Nov 425) | – | – | 395.33 (1 Nov 390.67) | – | – | 366.33 (1 Nov 399.67) | 394.67 (1 Nov 398.67) | 380.67 (1 Nov 383.33) | 415 (1 Nov 412.67) | 395 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – | 424 | 424 | 382.67 | 382.67 | 382.67 | 382.67 | 382.67 | 382.67 | 382.67* |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony | – | – | 353 | 422 | – | – | – | 353 | 337 | 392.33 | 361.67 | 463.67 | 479 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises | – | – | 261.67 | 281.50 | – | 286* | 261.67 | 276.33* | 261.67 | – | 261.67 | 276.33* | – |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony | – | – | 333.33 | – | 368.67 | 368.67* | 333.33 | 333.33 | 333.33 | 333.33 | 333.33 | 333.33 | 333.33 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.76 (17) | Lift/River view/Superhost | – | – | 233 (1 Nov 216.33) | – | – | 210.67 (1 Nov 217.33) | 215 (1 Nov 204.67) | 211.33 (1 Nov 209.33) | 213 (1 Nov 207.33) | – | – | – | – |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.65 | 5 | 4.37 (38) | Paid parking on premises | 384 | 384 | 379 | 384 | 379 | 379 | 379 | 379 | 379 | – | 379 | – | – |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises | – | – | 250 | 264 | – | – | 250 | – | 250 | – | 250 | 250 | – |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 310 | 270 | 250 | 290 | 290 | 250 | 250 | 290 | 263.33 | 283.33 | 270* | 290 | 312 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | **216** | **230.33** | **239** | **277** | **264** | **287.67** | **277.67** | **290** | **289** |
| **Comp median (n)** | | | 4.8 (18.0) | | **384** (3) | **327** (2) | **307.16** (10) | **337** (6) | **373.84** (6) | **327.34** (8) | **287.84** (10) | **333.33** (9) | **307.50** (10) | **358** (6) | **333.33** (11) | **290** (9) | **358** (6) |
| **Our pctl (vs median)** | | | | | – | – | – | – | P0 (-42.2%) | P12 (-29.6%) | P10 (-17.0%) | P22 (-16.9%) | P40 (-14.1%) | P33 (-19.6%) | P27 (-16.7%) | P44 (+0.0%) | P17 (-19.3%) |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.11 (9); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 3 Nov-6 Nov | 6 Nov-9 Nov | 9 Nov-12 Nov | 10 Nov-13 Nov | 18 Nov-21 Nov | 20 Nov-23 Nov | 21 Nov-24 Nov | 18 Nov-24 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | 257.67 | – | – | 257.67 | 257.67 | 257.67 | 257.67 | 257.67 | 257.67 | 250.17 | 260 | 260 | 260 | 260 | 260 | 249 |
| [1083936003491396261](https://www.airbnb.co.uk/rooms/1083936003491396261) | 1.24 | 5 | 4.9 (40) | Superhost (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | 125 | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (24) | Free parking on premises/Superhost/Guest favourite | – | – | 140 (1 Nov 142.33) | – | – | – | – | 119.67 (1 Nov 123.67) | – | – | – | – | – | – | – | – | – | – |
| [1343991336860365461](https://www.airbnb.co.uk/rooms/1343991336860365461) | 1.81 | 6 | 4.43 (14) | Paid parking on premises | – | – | – | – | 130 | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.82 (39) | Free parking on premises/Superhost (added 30 Oct) | – | – | 248.33 | – | – | – | – | – | – | 248.33 | 248.33 | – | 293.33 | 293.33 | – | 293.33 | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | 222 | – | – | 222 | – | 222 | 222 | 222 | 222 | – | – | – | 222 | 222 | 222 | 222 | 222 | 207 |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 | 6 | 4.85 (27) | Parking (in name) (added 1 Nov) | 173 | – | 178 | – | – | 164.33 | 164.33 | 164.33 | – | – | – | – | 178 | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **171** | **172.67** | **192.67** | **195.67** | **193.33** | **177.83** | **213.67*** | **219.33** | **224.33** | **216.67** | **228** | **160.43** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | 173 | 171.67 | 165.67 | 171.33 | 175.33 | 180.67 | 179.67 | 157.50 | 224.33 | 225 | 227 | 219.67 | 231.67 | 184.43 |
| **Comp median (n)** | | | 4.83 (27) | | **197.50** (2) | n/a (0) | **213.17** (4) | **222** (1) | **130** (1) | **222** (3) | **222** (3) | **193.17** (4) | **239.84** (2) | **253** (2) | **253** (2) | **187.58** (2) | **241** (4) | **260** (3) | **241** (2) | **260** (3) | **241** (2) | **228** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | P33 (-23.0%) | P50 (-10.6%) | P0 (-19.7%) | P0 (-22.7%) | P0 (-23.6%) | P50 (-5.2%) | P25 (-11.3%) | P0 (-15.6%) | P50 (-6.9%) | P0 (-16.7%) | P50 (-5.4%) | P0 (-29.6%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 10 Nov-12 Nov | 10 Nov-13 Nov |
|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 168 | 168 | – | – | 168 | 165 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.43 (88) | none listed | 165 | 165 (1 Nov 166.50) | – | – | 165 | 162 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.73 (22) | none listed | – | – | 165.33 (1 Nov 174.67) | 165.50* (1 Nov 162.50) | – | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | 200.50 | – | 196.67 | 248.50 (1 Nov 200.50) | 200.50 | 196.67 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | – | – | 244.50 | 157.50 (1 Nov 161.50) | 143* (1 Nov 149.67) |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | 244.33 | – | – | 242.67 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | **163.50** | **146.33** |
| **Comp median (n)** | | | 4.58 (24.5) | | **168** (3) | **166.50** (2) | **196.67** (3) | **244.50** (3) | **166.50** (4) | **165** (5) |
| **Our pctl (vs median)** | | | | | – | – | – | – | P25 (-1.8%) | P20 (-11.3%) |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 12 Nov-14 Nov | 18 Nov-20 Nov | 17 Nov-21 Nov | 30 Nov-3 Dec | 7 Dec-10 Dec | 7 Dec-13 Dec | 11 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.50 | 237.50* | 225 | 237.50 | 237.50 | 237.50 | 218.75* | 225 | 225 | 212.50 | 237.50 |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (18) | Paid parking on premises | – | – | 311.67 | – | – | – | 297.50 | 316.67 | – | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (78) | Superhost | – | – | 200.67 (1 Nov 196.67) | – | – | – | 205.50 (1 Nov 196.50) | 207.33 | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | – | 155 | 185 (1 Nov 205) | 220 | – | 185 | 185 (1 Nov 205) | 208.33 | 220 | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (119) | Superhost/balcony/Guest favourite | – | 252 | 250.67 | 254 | – | 254 | 247.75 | 250.67 | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | 1035 | 1035 | 1032.33 (1 Nov 1033.67) | 1054.50 (1 Nov 1035) | 1047 (1 Nov 1037) | 1035 | 1031 | 1045.33 | 1032.33 | 1035 (1 Nov 1031.50) | 1051 (1 Nov 1040.50) |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | – | 282 | 312.67 | 299 (1 Nov 309) | 282 | 296.50 (1 Nov 298.50) | 300.75* (1 Nov 302.25) | 297 | 323.33 | 331.17 (1 Nov 334) | 347 (1 Nov 351) |
| **Ours** | | | | | not bookable | **215** | not bookable | **281** | **248** | **244** | **224** | **254.67** | **290.33** | **276.33** | **329.50** |
| **Comp median (n)** | | | 4.86 (18) | | **237.50** (1) | **244.75** (4) | **237.83** (6) | **245.75** (4) | **259.75** (2) | **245.75** (4) | **233.25** (6) | **237.83** (6) | **225** (3) | **271.84** (2) | **292.25** (2) |
| **Our pctl (vs median)** | | | | | – | P25 (-12.2%) | – | P75 (+14.3%) | P50 (-4.5%) | P50 (-0.7%) | P50 (-4.0%) | P67 (+7.1%) | P67 (+29.0%) | P50 (+1.7%) | P50 (+12.7%) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 3 Nov-5 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec |
|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 159.67 | 170.50* (1 Nov 190) |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | – | – | 164.33 (1 Nov 171.67) | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | – | – | 135 | 135 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | 159.67 | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.92 (25) | Free parking on premises/Guest favourite | – | 145 | – | 181* |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (201) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | – | 135.50 | – | 140.50 |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | 146.67 | – |
| **Comp median (n)** | | | 4.84 (14) | | n/a (0) | **140.25** (2) | **159.67** (5) | **155.50** (4) |

- **Comp attributes.** Lift, view and parking are carried from earlier amenity reads (25 Oct-1 Nov). Ratings and review counts come from today's search cards where returned, otherwise from 1 Nov. Comp cancellation policies are NOT CHECKED.

## P07 Woolwich, 1-bed
Blocked on purpose (policy). No comps, no advice.

---

Data gaps:
1. **Booking.com NOT CHECKED** (not tried). Comps are Airbnb only, and our Booking.com displayed prices are not covered. The P12 27-30 Nov booking comparison sets a Booking.com room-only price against Airbnb all-in comps.
2. **Thin comp n.** P04 has 1-4 priced comps per stay, and 593405916827094880 prices £222 on every 3-night date. P12 stored comps have n=1-6, so positioning rests on the band, whose sleeps are NOT CHECKED. P01 3-5 Nov has n=1; P04 3-5 Nov, 3-6 Nov and 1-3 Dec have n=0-1; P15 6-8 Nov has n=0.
3. **New stays without a 1 Nov baseline:** P04 9-12, 14-17 and 6-13 Dec; P12 30 Nov-3 Dec, 7-10 Dec, 26-27 and 27-30 Nov.
4. **Ratios** assume £150 Airbnb cleaning for P12 and P20. P04 cleaning on either Airbnb listing is unknown. The rule behind the unsynced 1455… pricing (no weekly discount, 0.83x on 18-24 Nov) was not seen.
5. **P04:** which Airbnb account holds 1455… is NOT CHECKED, and so is whether the 6-9 Nov Airbnb stay sits on 1455… or 1657….
6. **P20 20-22 Nov:** whether the delivery still needs these nights is NOT CHECKED (Corentin). Reyhan's reason for the 2 Nov base cut is not logged.
7. **PriceLabs.** NL percentiles are a market band, not comps. Competitor Listings and Market Dashboard were not used, and the raw neighbourhood JSON was not saved. Overrides were not re-read in full; changes come from `get_user_logs` (1-2 Nov). `pl_kpis.csv` occupancy (P12 50%/60%, P20 37%/23%) differs from the Smoobu counts used here.
8. **Not analysed:** P15 (no listing of ours) and P07 (blocked, policy). P20 is still missing from `build/properties.py`. Our own listings' cancellation policies are NOT CHECKED (the PDP field was empty).
