# Competitor positioning: EAST batch (D = 2026-10-26)

**Method.** Same comp ids as 25 Oct (`data/snapshots/2026-10-25/comps.csv`, comp-east rows), same search boxes, guests and stays: Fri-Sun 30 Oct-1 Nov, Tue-Thu 27-29 Oct, and 24-27 Nov (kept from 25 Oct instead of rolling to 25 Nov so the day-on-day change is on identical stays; it is D+29). Airbnb public pages load with plain requests today (HTTP 200); Booking.com not tried (blocked on 25 Oct with a 202 challenge). For P09, one extra 3-night search on 27-30 Oct, because its min stay is 3. Comp prices are now the **guest-paid all-in figure** (Airbnb total after any discount ÷ nights, cleaning and fees included, no separate taxes in London). Rows: **147 in `data/snapshots/2026-10-26/comps.csv`** (new file; no other agent's rows were there). Market rows for P01, P04, P09 and P20 were appended to `market.csv` after the market agent's P12 row, which I left as it was.

**Correction to 25 Oct.** For 14 of the 109 priced comp rows on 25 Oct, the stored `nightly_gbp` was the **pre-discount** price, not what the guest pays (e.g. 53017356 27-29 Oct: stored 273, paid £508/2 = 254). On the guest-paid basis, the 25 Oct P12 midweek gap was **-16.7%**, not -22.5%. P01 24-27 Nov median was 335.67, not 355. P20 24-27 Nov (297.5) is about the same. Below, "25 Oct" figures are restated on the guest-paid basis (from the 25 Oct search payloads).

**Comp set stability.** All 47 comps kept. Three were not returned in any of today's three date searches: P01 20404597, P04 593405916827094880 and P15 1191085742562460545. They were returned on 25 Oct, and a single day without a result is not evidence that a listing is inactive, so all three stay in the set. Same-comp prices are flat. The only real repricings: 41905186 24-27 Nov 508→446; 1316210326145130709 27-29 Oct 310→340. Medians moved only where a different set of comps came back for a stay.

**PriceLabs (read-only).** `get_neighbourhood_data` for P01, P04, P09, P12 and P20: all `all_operations_ok = true`. NOTE: the five calls were sent in one batch, not one at a time as instructed. All five returned 200 with no 502s, but the instruction was not followed. `get_user_logs` for the 6 EAST listings, 25-26 Oct, has 4 entries, all reyhan@ on 25 Oct around 21:59Z, all on **P20**:
- the 31 Oct-19 Nov override changed to **-2%** (min 3); it was -5%;
- new -2% overrides for January 2027 (min 3) and February 2027 (min 4);
- min stay 2 on 26-27 Oct.

## NL bedroom-matched percentiles (PriceLabs), today vs 25 Oct
| Ref | Band (n) | P25/P50/P75/P90 today | 25 Oct | Market occ 30/60 (`pl_kpis.csv`) |
|---|---|---|---|---|
| P01 | 2BR (143) | 224/272/339/419 | 224/272/339/416 | 34% / 26% |
| P04 | 2BR (86) | 142/179/223/282 | 142/179/223/283 | 25% / 20% |
| P09 | 1BR (127) | 120/142/173/220 | 119/142/173/219 | 36% / 31% |
| P12 | 2BR (120) | 179/213/258/296 | 179/213/257/295 | 40% / 32% |
| P20 | 2BR (147) | 224/268/328/407 | 224/267/327/408 | 36% / 28% |

The market is flat for a fourth day.

## Summary per property
**Columns:**
- **Our price:** Airbnb guest-paid all-in, taken from the same search, where our flat was open for that stay. Otherwise it is the PriceLabs nightly (PL, excludes cleaning).
- **Booked 30/60:** sellable nights from `prices.csv`. Handback nights are excluded, as are the deprioritised P04 2 Dec and P12 17 Nov one-night overrides (left out of averages only; not re-raised).

| Ref | Our price, same stay | Comp median (n) | Our comp pctl / NL pctl (next-30 avg) | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market | `recommend` |
|---|---|---|---|---|---|---|---|---|
| P01 | All 3 stays booked (PL 199-217 / 197-199 / 264-297) | 328.50 (4) / 284 (5) / 353 (9) | n/a (0 open nights) | 4.67 vs 4.625 | 3 vs 25 (-22) | 0.0 (fewer than 5 reviews) | 100% / 100% vs 34% / 26% | raise-signal; nothing to sell before the 20 Dec handback |
| P20 | **24-27 Nov £306.33 all-in (£919)**; Fri-Sun and Tue-Thu not bookable for 2 nights | 316 (4) / 270.25 (8) / **333.33 (9)** | **P44 (-8.1%)** / NL P44 | none vs 4.66 | 0 vs 18 (-18) | 0.0 (no rating) | 12% / 0% vs 36% / 28% | 30: fix-listing (P44); 60: fix-listing (NL P72) |
| P04 | Fri-Sun and Tue-Thu booked; 24-27 Nov part booked (PL 167/195/197) | n/a (0) / n/a (0) / 205.83 (2) | n/a / NL P40 | 4.69 vs 4.83 | 26 vs 23 (+3) | -0.056 | 31% / 52% vs 25% / 20% | 30: raise +5% (NL P40); 60: raise +10% (NL P65) |
| P09 | **27-30 Oct (3 n) £161.67 all-in (£485)**; 2-night stays closed by min stay 3; 24-27 Nov booked | 166.50 (2) / 165 (3) / 196.67 (3); **3-night 162 (3)** | **P33 (-0.2%)** / NL P57 | 5.0 vs 4.58 | 2 vs 24.5 (-22.5) | 0.0 (2 reviews) | 72% / 100% vs 36% / 31% | 30: raise +10% (comp P33 and NL P57) |
| P12 | **24-27 Nov £278.00 all-in (£834)**, reopened by the 22-29 Nov cancellation; Fri-Sun and Tue-Thu booked | 269 (3) / 254 (3) / **225 (7)** | **P71 (+23.6%)** / NL P67 (30), P82 (60) | 4.27 vs 4.88 | 15 vs 18 (-3) | **-0.15** (cap) | 68% / 0% vs 40% / 32% | 30: raise +10% (P71); 60: lower -7% (NL P82) |
| P15 | No PriceLabs, Smoobu or Airbnb listing | 163.75 (4) / 167.50 (1) / 171.67 (3) | n/a | n/a vs 4.87 | n/a | n/a | n/a | n/a |
| P07 | Blocked on purpose (policy) | not analysed | | | | | | |

## Supported positioning (one line each)
- **P12, new today: the reopened 22-29 Nov week is priced +24% over comps; a cut of about 20% on those dates is supported.**
  - The 22-29 Nov Booking.com cancellation (Dispatcher) reopened 8 nights at PL 247-304 (`prices.csv`). Airbnb shows £278/night all-in for 24-27 Nov, against a comp median of £225 (n=7, P71).
  - `quality_premium` = -0.15 (4.27 vs 4.88), so the supported position is about **15% below** the median (~£191). We sit **+23.6% above** it.
  - `recommend` says "raise +10%" for next-30, but that comes from the near-term booked nights (68% vs 40%). The same rule on the 31-60 window says lower -7% (0% booked vs 32%, NL P82).
  - To reach the comp median on Airbnb, PL for 22-29 Nov would need to be about £194 on average vs £253 now, roughly -23%. That assumes Airbnb room = 0.90x PL as seen today ((834 - 150 cleaning) / 760) and a £150 cleaning fee.
  - This is new information that changes yesterday's "hold P12" for these dates only. Near-term open nights are unchanged: hold, and keep the PriceLabs-side discount cut.
- **P20: hold; the comp check no longer supports a cut.**
  - 24-27 Nov is now **£306.33 all-in, -8.1% vs the comp median (P44)**. On 25 Oct it was £333.50, +12% vs 297.5.
  - PL for the same nights fell from 300/313/332 to **263/287/304 (-9.6%) overnight**. Those dates are outside reyhan's 31 Oct-19 Nov override, so the cause is NOT CHECKED (a PriceLabs recalculation; the logs show no base change).
  - Our free on-site parking is unique in the set (7 of 12 comps have paid parking only), which supports at least the median. With 0 reviews, P44 is about right. `recommend` = fix-listing on both windows: the occupancy gap (12% vs 36%) is not about price.
- **P09: hold for 27-31 Oct; at most +5-10% on the 10-12 Nov run.**
  - Like-for-like 3-night stay 27-30 Oct: we show £161.67 vs a comp median of £162 (n=3, P33), with 2 reviews vs a median of 24.5.
  - `recommend` gives +10% from 72% booked vs 36%. But 27-31 Oct starts tomorrow and is a last-minute run under reyhan's -5% (min 3), and only 8 nights are left before the 26 Nov handback.
  - So: no raise on 27-31 Oct. A raise on 10-12 Nov (PL 163-164) is supported if Corentin wants the 18 Oct base-rise review to conclude "keep going".
- **P04: hold (Corentin's -8% on 1-25 Nov stands); the comp set is too thin to back `recommend`'s raise.** Only 2 comps priced, all on 24-27 Nov (£151.67 and £260), and one of them is in the East Ham catchment.
- **P01: no action.** 0 sellable nights before the handback.
- **P15: reference only.** The 1-bed median near Devons Road DLR is £164-172 all-in.

## Channel checks found while pricing (Airbnb, same stays; room part assumes £150 cleaning for P12/P20 and £125 for P09, from recent Airbnb rows in `reservations.csv`)
- **P20 24-27 Nov:** £919 total; room £769 vs PL £854 = **0.90x**, the same ratio as 25 Oct (0.90x). 3 nights, 29 days out, no stay discount applies and Airbnb last-minute is 0-14 days only (policy). **The ~10% gap is still unexplained.**
- **P12 24-27 Nov:** £834 total; room £684 vs PL £760 = **0.90x**. Policy expects Airbnb bookings made after 21 Oct to pay close to PriceLabs, so this is **unexplained**. A Smoobu Airbnb rule is the likely cause, but this is inferred: P12's rules have not been seen.
- **P09 27-30 Oct:** £485 total; room about £360 vs PL £423 = 0.85x. Reported only: Corentin has deprioritised the Greenwich Airbnb rules (policy `deprioritised.airbnb_rules_p09`).
- **Airbnb amenities still missing** on our listing pages (re-read 26 Oct): P04, P09 and P12 list no Lift, no balcony and no view. P01 lists only "Patio or balcony"; P20 lists balcony and free parking. Facts from `build/properties.py` (25 Oct section): P01, P04, P09 and P12 have a lift; P04, P09 and P12 have a balcony; P01, P04 and P12 have views. **Unchanged since 25 Oct.**

## Comp tables (Airbnb, guest-paid all-in £/night incl. cleaning and fees; checked 2026-10-26; "25 Oct x" = guest-paid price on 25 Oct where it differs by more than £1; full source per row in `comps.csv`)

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.67 (3), balcony listed)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 27-29 Oct | 24-27 Nov |
|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | n/a | n/a | 286.67 |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 652 (25 Oct 647) | 470 | 446.33 (25 Oct 507.67) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.46 (147) | none listed | n/a | n/a | 208 |
| [1385492120084469276](https://www.airbnb.co.uk/rooms/1385492120084469276) | 0.45 | 4 | 4.7 (20) | Lift | n/a | 248 | n/a |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (55) | Lift | n/a | 340 (25 Oct 309.50) | 375 |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.61 (28) | Lift/River view/balcony | n/a | n/a | 255 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | n/a | n/a | 382.67 |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | n/a | n/a | 342 (25 Oct 335.67) |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | 322 | 270.50 | 353 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.8 (15) | Lift | 335 | n/a | n/a |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.64 | 5 | 4.38 (37) | Paid parking on premises | 284 | 284 | 379 |
| [20404597 (not returned today)](https://www.airbnb.co.uk/rooms/20404597) | 0.68 | 6 | 4.64 (22) | Canal view/Lift/River view/Superhost/balcony | n/a | n/a | n/a |
| **Comp median (n priced)** | | | 4.625 (25.0) | | **328.50** (4) | **284** (5) | **353** (9) |

### P20 Waterford Court 2BR, max 4 (ours: 1791529331262420081, no reviews, free parking + balcony listed)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 27-29 Oct | 24-27 Nov |
|---|---|---|---|---|---|---|---|
| [1385492120084469276](https://www.airbnb.co.uk/rooms/1385492120084469276) | 0.27 | 4 | 4.7 (20) | Lift | n/a | 248 | n/a |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises | 444.50 | n/a | n/a |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (55) | Lift | n/a | 340 (25 Oct 309.50) | 375 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | n/a | n/a | 382.67 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony | 322 | 270.50 | 353 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises | n/a | n/a | 261.67 |
| [813089760121939738](https://www.airbnb.co.uk/rooms/813089760121939738) | 0.59 | 4 | 4.4 (20) | Lift/Paid parking on premises/balcony | n/a | 231.50 | n/a |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony | n/a | n/a | 333.33 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.75 (16) | Lift/River view/Superhost | n/a | 188 | 214 (25 Oct 221) |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.65 | 5 | 4.38 (37) | Paid parking on premises | 284 | 284 | 379 |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises | n/a | 288.50 | 250 |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 310 | 270 | 250 |
| **Comp median (n priced)** | | | 4.66 (18.0) | | **316** (4) | **270.25** (8) | **333.33** (9) |

### P04 Barking 2BR, sleeps 6 (ours: 1455876748739910219, 4.69 (26); 2.5 km box)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 27-29 Oct | 24-27 Nov |
|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | n/a | n/a | 260 |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (23) | Free parking on premises/Superhost/Guest favourite | n/a | n/a | 151.67 (25 Oct 149.67) |
| [593405916827094880 (not returned today)](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | n/a | n/a | n/a |
| **Comp median (n priced)** | | | 4.83 (23) | | n/a (0) | n/a (0) | **205.83** (2) |

### P09 Greenwich 1BR, sleeps 4 (ours: 1681417771483132994, 5.0 (2); 1.8 km box, studios excluded)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 27-29 Oct | 24-27 Nov | 27-30 Oct (3 n) |
|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 168 | 168 | n/a | 165 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.43 (88) | none listed | 165 | 165 | n/a | 162 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.73 (22) | none listed | n/a | n/a | 162.33 (25 Oct 167.67) | n/a |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | n/a | n/a | 196.67 | n/a |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.24 (21) | none listed | n/a | 159.50 | n/a | 139.33 |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | n/a | n/a | 242.67 | n/a |
| **Comp median (n priced)** | | | 4.58 (24.5) | | **166.50** (2) | **165** (3) | **196.67** (3) | **162** (3) |

### P12 Mile End 2BR, sleeps 6 (ours: 1414703602412646285, 4.27 (15))

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 27-29 Oct | 24-27 Nov |
|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.50 | 237.50 | 225 |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (18) | Paid parking on premises | n/a | n/a | 311.67 |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.88 (77) | Superhost | n/a | n/a | 209.33 (25 Oct 199.67) |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | n/a | n/a | 213.33 |
| [1199115199309731731](https://www.airbnb.co.uk/rooms/1199115199309731731) | 0.91 | 6 | 4.84 (31) | City skyline view/Lift/Superhost/balcony | n/a | n/a | 197.33 (25 Oct 194.67) |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (118) | Superhost/balcony/Guest favourite | 269 | 254 | 250.67 |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony | 1035 | 1041 (25 Oct 1035) | 1032.33 |
| **Comp median (n priced)** | | | 4.88 (18) | | **269** (3) | **254** (3) | **225** (7) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 27-29 Oct | 24-27 Nov |
|---|---|---|---|---|---|---|---|
| [1611041940714716070](https://www.airbnb.co.uk/rooms/1611041940714716070) | 0.5 | 3 | 4.87 (23) | Free parking on premises/Superhost | 188.50 | n/a | n/a |
| [1191085742562460545 (not returned today)](https://www.airbnb.co.uk/rooms/1191085742562460545) | 0.64 | 4 | 4.71 (31) | none listed | n/a | n/a | n/a |
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | n/a | n/a | 172.67 (25 Oct 186) |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | n/a | n/a | 171.67 |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | 160 | n/a | n/a |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | 167.50 | 167.50 | 159.67 |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.91 (23) | Free parking on premises/Guest favourite | 145 | n/a | n/a |
| **Comp median (n priced)** | | | 4.87 (15) | | **163.75** (4) | **167.50** (1) | **171.67** (3) |

## P07 Woolwich, 1-bed
Blocked on purpose (policy). No comps, no advice.

---

Data gaps:
1. **Booking.com NOT CHECKED** (blocked 25 Oct, not retried). The comps are Airbnb only, and our Booking.com displayed prices are not covered.
2. **Thin like-for-like coverage.** Our own guest-paid Airbnb price is known for only 3 stays: P20 and P12 on 24-27 Nov, and P09 on 27-30 Oct (3 nights). Everything else is booked or closed by min stay, so it is PriceLabs ex-cleaning and not comparable.
3. **Thin comp n.** P04 has 3 comps (2 priced, 1 in the East Ham catchment). Many 2-night October stays have n = 0-5. P12 29297702 (about £1,035/night) is an outlier, kept and absorbed by the median.
4. Three comps were not returned today (20404597, 593405916827094880, 1191085742562460545). Whether they are active was NOT CHECKED beyond today's searches; they are kept.
5. **Cause of the P20 24-26 Nov PL drop (-9.6% overnight): NOT CHECKED.** No log entry covers those dates.
6. The Airbnb room-vs-PL ratios (0.90x P12 and P20, 0.85x P09) assume cleaning fees of £150 / £150 / £125. Smoobu Airbnb pricing rules for P12 and P20 have not been seen.
7. Comp lift, view and parking come from Airbnb amenity lists (25 Oct), not verified. Comp cancellation policies NOT CHECKED. PriceLabs Competitor Listings and Market Dashboard are not available, and the NL tables state no horizon or cleaning treatment.
8. P15 has no listing data. P20 is still missing from `build/properties.py` (sleeps 4 from Airbnb/policy). P07 is not analysed (policy block).
9. The neighbourhood raw JSON was not saved for EAST today: summary mode, numbers copied into `market.csv`. The P12 detail raw is at `raw/neighbourhood_P12.json` (market agent).
