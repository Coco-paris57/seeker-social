# Competitor positioning: CENTRAL/NORTH (D = 2026-10-30)

**Method**
- **Comp ids:** the same 55 comp ids as 27–29 Oct (`data/snapshots/2026-10-29/comps.csv`, comp-central rows). Nothing was added or replaced.
- **Searches:** the same Airbnb map-box searches. Settings:
  - airbnb.co.uk, plain public search pages (HTTP 200, no challenge)
  - entire home, min bedrooms = ours, adults = our sleeps − 1
  - all result pages
  - 37 searches in total (`c30s/search.py` in the scratchpad).
- **Like-for-like stays (2 nights), the same for every comp and for us:**
  - Tue 3–Thu 5 Nov (midweek)
  - **Fri 6–Sun 8 Nov.** This is the next Fri–Sun and replaces 30 Oct–1 Nov.
  - Tue 24–Thu 26 Nov
  - Fri 27–Sun 29 Nov (about 30 days out)
- **Our open dates (from `prices.csv` 30 Oct, checked against Smoobu `reservations.csv` 30 Oct):**
  - **P11** (open nights 18 Nov–4 Dec and 8–18 Dec). The searches split these into realistic stays: 18–21 Nov, 24–26 Nov, 27–29 Nov, 28 Nov–4 Dec, 8–11 Dec, 11–14 Dec and 15–19 Dec. A single 17-night search would have priced Airbnb weekly and monthly discounts instead.
  - **P05** (remaining open nights): 16–18 Nov, 29 Nov–3 Dec, 7–9 Dec and 13–16 Dec. 6–9 Nov is now booked in Smoobu (Airbnb, booked 29 Oct). PriceLabs still shows it Open; see the P05 section.
  - **P06** (8–14 Nov): 8–11, 10–12 and 12–15 Nov.
  - **P08:** 5–8 Nov (the whole 3-night gap). Yesterday's stay was 5–7 Nov.
- **Price basis:**
  - Comps: Airbnb displayed total / nights, **excl. taxes, cleaning INCLUDED**, after any offer.
  - Ours, P05/P06/P08 open stays: **observed** in the same searches (9 rows in `channel_checks.csv`).
  - Ours, booked or blocked stays: derived as yesterday:
    - P05: 0.765 x PL at ≤28 days lead and 0.900 beyond, + £195 / nights.
    - P06: 0.765 x PL + £129 / nights.
    - P08: 0.85 x PL + £149 / nights.
  - P11 (Booking.com only) and P14: PriceLabs room price. For P11 I also show the Booking.com list price (PL x 1.15, the Smoobu markup in policy), before Booking.com promotions.
- **Booking.com: NOT CHECKED.** The bot check was seen on 28 Oct. It was not retried or bypassed.
- **PriceLabs:**
  - One `get_user_logs` call covered P11, P05, P06 and P08 for 28–30 Oct. The latest entry is 28 Oct 10:29Z (Reyhan, P11 overrides), so **no user change since 29 Oct 06:00Z on these four**.
  - There is still no Competitor Listings or Market Dashboard comp source.
- **Positioning:**
  - Calculated with `rm/positioning.py` (`quality_premium`, `recommend`).
  - Occupancy is from `reports/2026-10-30/kpi_pack.json`: `forward_occ_30_ex_blocks` where present, else `forward_occ_30` / `_60`, against `market_occ_30` / `_60`.
  - The percentile fed to `recommend` is the mean over **open** stays: check-in ≤ 29 Nov for 30d, all open stays for 60d. Where no stay is open, the mean over all stays is used.
  - The base review is on hold until 2 Nov, so these outputs are inputs to that review.

**Comps kept although missing from every stay today.** The rule is to replace a comp only when it is inactive. Absence from date-filtered results is not proof of that, and I did not open listing pages.
- **P08:** 1289147258305624118 (5th day), 693487869095756237 (3rd), 1596458903516109468 (2nd). Only 3 of the 6 P08 comps priced any stay.
- **P06:** 917140285217729256 (5th day), 1452940332365117153 (4th), 1259401393497276633 (2nd).
- **P11:** 1515051936255130803 (4th day).
- **P14:** 1595613237427991150 (4th day), 1075245497252121738 (3rd).
- **P17:** 1304473419588771105 and 774061637963678253 (1st day).

## Summary

| Ref | Comps (priced per stay) | Comp median on open/target stays | Ours on the same stays | Our pct (open stays) | Rating ours vs comp median; review gap | Booked vs mkt | Supported positioning |
|---|---|---|---|---|---|---|---|
| **P05 4BR** | 6 (1–5) | 16–18 Nov £509 (3); 29 Nov–3 Dec £892 (4); 7–9 Dec £790 (4); 13–16 Dec £886 (4) | £433 / £533 / £554 / £597, **observed Airbnb all-in** | **P27** (−15% / −40% / −30% / −33%) | Airbnb 4.77 (35) vs 4.27 (22); **+13 reviews** | 30d 89.7% vs 39%; 60d 69.5% vs 37% | qp +0.15 (cap). `recommend` = **raise +25%** (30d and 60d). Limit it to the Dec stays; for 16–18 Nov the supported move is about +15% (see section) |
| **P06 2BR** | 12 (3–7) | 8–11 Nov £318 (3); 10–12 Nov £328 (5); 12–15 Nov £430 (3) | £265 / £292 / £293, observed | **P0** (−17% / −11% / −32%) | 4.60 (10) vs 4.65 (25); −15 reviews | 30d ex-blocks 53.4% vs 45% | qp −0.022. `recommend` 30d = **raise +5%**. The 60d output (fix-listing) is not used because `forward_occ_60` counts intentional blocks |
| **P08 2BR** | 6, but only 3 priced (1–2) | 5–8 Nov £386 (1); 6–8 Nov £408 (1) | £214 / £244, observed, **no offer line today** | **P0** (−44% / −40%), n = 1 | 4.33 (3) vs 4.81 (27.5); −24.5 reviews | 78.6% vs 50% | qp −0.15. `recommend` = **raise +10%**. Evidence is thin (one priced comp) |
| **P11 2BR** | 12 (3–9) | 18–21 Nov £336 (5); 24–26 Nov £332 (8); 27–29 Nov £615 (3); 28 Nov–4 Dec £424 (3); 8–11 Dec £374 (9); 11–14 Dec £471 (6); 15–19 Dec £406 (7) | PL room £209 / £196 / £266 / £236 / £246 / £289 / £237. Booking.com list (x1.15) £240 / £225 / £306 / £271 / £283 / £332 / £273 | **P3** room; **P7** at Booking.com list | Booking.com 8.0/10 (policy) is not comparable with the Airbnb median 4.68 (35.5); our review count NOT CHECKED | 30d 37.9% vs 46%; 60d 35.6% vs 39% | qp 0. `recommend` 30d = **fix-listing**, 60d = raise +5% |
| P14 1BR | 12 (3–6) | £245 / £266 / £278 / £290 | £500 room (all four stays) | P100 (+104% / +88% / +80% / +73%) | not seen on Airbnb; comp median 4.91 (19) | 0% vs 41% (30d) | special setup: numbers only |
| P17 1BR | 7 (0–5) | £224 / £255 / £232 / n/a | NOT IN SYSTEMS | n/a | comp median 4.56 (49) | n/a | collect-data |

**Day-on-day changes (same comp, same stay, same checkout; 29 → 30 Oct):**
- The median change is 0.0% on every like-for-like stay for P06, P08, P11 and P14.
- **P05 November midweek comps cut hard:**
  - 1610095240357069208: £819 → £509 on both 16–18 Nov and 24–26 Nov.
  - 1606112160333193293: 16–18 Nov £1,020 → £519; 24–26 Nov £1,020 → £570; 3–5 Nov £575 → £519.
  - The like-for-like median moved −38% (16–18 Nov, n=3) and −22% (24–26 Nov, n=4). The P05 December stays are unchanged (≤ −0.5%).
- **P11 own price moved with no user log entry.** PL room price 29 → 30 Oct:
  - Down on November dates: 20 Nov £281 → £248, 21 Nov £282 → £255, 27 Nov £286 → £266, 28 Nov £305 → £267, 24 Nov £214 → £195.
  - Up on December dates: 8 Dec £237 → £246, 11 Dec £299 → £314.
  - This is a PriceLabs-side recompute; its cause is NOT CHECKED.
- **P11 comp outlier:** 1543632408013225027 shows £2,326/night (24–26 Nov) and £2,302 (18–21 Nov), against £424–£615 on other stays. The medians are robust to it, but treat it as an anomaly.
- **P17:** 836419796998711919 +9% on 3–5 Nov.

## P11 Camden 2-bed (3064196): Booking.com only. Focus: open nights 18 Nov–4 Dec and 8–18 Dec

**Open nights and status:**
- Smoobu shows P11 open on the nights 18 Nov–4 Dec and 8–18 Dec. 18 Dec is free because the 18–30 Dec stay was cancelled; 19–23 Dec is booked.
- PriceLabs `prices.csv` 30 Oct agrees: all Open, min stay 2–3.
- The last Smoobu push was 30 Oct 05:51Z (`listings.csv`).

**Positioning against Airbnb comps:**
- On every open stay we are the cheapest or near-cheapest priced listing:

| Stay | Our PL room | Our pct (room) | Booking.com list (x1.15) | Pct at list | Comp median (n) |
|---|---|---|---|---|---|
| 18–21 Nov | £209 | P0 | £240 | P0 | £336 (5) |
| 24–26 Nov | £196 | P12 | £225 | P25 | £332 (8) |
| 27–29 Nov | £266 | P0 | £306 | P0 | £615 (3) |
| 28 Nov–4 Dec | £236 | P0 | £271 | P0 | £424 (3) |
| 8–11 Dec | £246 | P11 | £283 | P11 | £374 (9) |
| 11–14 Dec | £289 | P0 | £332 | P0 | £471 (6) |
| 15–19 Dec | £237 | P0 | £273 | P14 | £406 (7) |

- The comps include cleaning and the room price does not, so the room percentile is biased low. Even at the Booking.com list price, before Mobile 10% and Genius promotions, we sit at P0–P25 and 24–50% under the median.

**Recommendation (`rm/positioning.py`):**
- `quality_premium` = 0. The Booking.com 8.0/10 is not on the Airbnb scale.
- `recommend(0.379, 0.46, 0.03, 0)` → **fix-listing** (30d).
- `recommend(0.356, 0.39, 0.03, 0)` → **raise +5%** (60d).
- **Reasoning:** we are behind the market at 30 days while already the cheapest in the set. The gap is visibility or conversion, not price. Policy records Booking.com search views −64% and click-through 0.81% vs 1.70% for the market. So a further price cut is not supported. The 60-day signal supports a small rise on the December stays, where PriceLabs already moved up today.

**Since yesterday:**
- No user log entry since 28 Oct 10:29Z.
- PriceLabs itself cut the November open nights by 5–12% and raised 8–11 Dec by 3–5% (see Summary).
- Reyhan's fixed-price overrides (set 28 Oct 10:29Z) on 22–25 Nov, 29 Nov–2 Dec, 8–9 Dec and 13–16 Dec are in force. Whether they conflict with the darts decision is for the PriceLabs section.

**Differentiators:** 4 of the 12 comps have a lift and 3 have a balcony or terrace. The closest comps (0.08 km: 1263490105174331990 £191 and 1090528454481682946 £210 on 24–26 Nov) are priced at our level.

**Comp table** (Airbnb, checked 2026-10-30; nightly excl. taxes, cleaning included; (±%) = change vs 29 Oct for the same stay):

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Wed 18 Nov–Sat 21 Nov (3n) | Sat 28 Nov–Fri 4 Dec (6n) | Tue 8 Dec–Fri 11 Dec (3n) | Fri 11 Dec–Mon 14 Dec (3n) | Tue 15 Dec–Sat 19 Dec (4n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.7 (30) | £320 (-9%) | n/a | £440 | £440 | £336 | £392 | £447 | £529 | £456 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a | £286 | n/a | n/a | n/a | £359 | £359 | £382 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | n/a | £2326 (+390%) | £615 | £2302 | £424 | £444 | £494 | £420 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | £238 | £438 | £438 | n/a | £417 | n/a | £417 | n/a | £406 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.45 (11) | £294 | £306 | £306 (-35%) | £615 | £282 | £424 | £444 | £494 | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | £286 | £418 | £358 | n/a | n/a | n/a | £374 | £448 | £472 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.52 (27) | £212 | £312 | n/a (was £312) | n/a | n/a | n/a | £292 | n/a | £281 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.5 (60) | n/a | n/a | £191 | n/a | n/a | n/a | n/a | n/a | £270 | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (87) | n/a | n/a | £210 | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.68 (72) | n/a | n/a | n/a | n/a | n/a | n/a | £217 | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.54 (37) | n/a | £305 | n/a | n/a | £299 | n/a | £307 | £353 | n/a | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (35.5) | £286 (5) | £312 (5) | £332 (8) | £615 (3) | £336 (5) | £424 (3) | £374 (9) | £471 (6) | £406 (7) | |
| **Ours, PL room/night (status, min stay)** | | | | £200 Booked (Smoobu), min 2 | £232 Booked (Smoobu), min 2 | £196 Open, min 2 | £266 Open, min 3 | £209 Open, min 3 | £236 Open, min 2/3 | £246 Open, min 2/3 | £289 Open, min 2/3 | £237 Open, min 2 | |
| **Ours, comparable basis** | | | | £200 | £232 | £196 | £266 | £209 | £236 | £246 | £289 | £237 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = PL x 1.15 (before promotions)** | | | | £229 P20 / -20% | £267 P0 / -14% | £225 P25 / -32% | £306 P0 / -50% | £240 P0 / -28% | £271 P0 / -36% | £283 P11 / -24% | £332 P0 / -30% | £273 P14 / -33% | Smoobu Booking.com markup +15% (policy) |
| **Our percentile / vs median** | | | | P0 / -30% | P0 / -26% | P12 / -41% | P0 / -57% | P0 / -38% | P0 / -44% | P11 / -34% | P0 / -39% | P0 / -42% | |

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

**Our Airbnb listing was seen in every open-stay search at 4.77 (35)**, unchanged from yesterday. None of these searches showed an offer line, and the all-in price matches the a-airbnb-rules factors exactly:
- **16–18 Nov:** (£865.14 − £195) / £876 PL = **0.765**.
- **29 Nov–3 Dec:** (£2,131.80 − £195) / £2,152 = **0.900** (30 days out).
- **7–9 Dec:** (£1,108.50 − £195) / £1,015 = **0.900**.
- **13–16 Dec:** (£1,790.70 − £195) / £1,773 = **0.900**.

**New booking 6–9 Nov (Smoobu, booked 29 Oct):**
- Room paid £893.52.
- Yesterday's observed Airbnb display for the same stay (7 adults, checked 29 Oct) was £1,255.29 all-in, which is **£1,060.29 room**.
- Paid room / displayed room = **0.843**: about 16% below what guests were shown on the same day. Two possible explanations:
  - It was booked at an earlier, lower PriceLabs price. The booking time is NOT CHECKED.
  - Fewer guests or an Airbnb-side discount.
- Policy says gaps on Airbnb bookings made after 21 Oct should be flagged as unexplained, so this is **flagged**.
- **PriceLabs still shows 6–8 Nov as Open** (`prices.csv` 30 Oct; last push 29 Oct 08:57Z) although Smoobu has it booked. This feeds t-pl-sync.

**Positioning on open stays:**

| Stay | Ours (observed) | Comp median (n) | Our pct | vs median |
|---|---|---|---|---|
| 16–18 Nov | £433 | £509 (3) | P33 | −15% |
| 29 Nov–3 Dec | £533 | £892 (4) | P25 | −40% |
| 7–9 Dec | £554 | £790 (4) | P25 | −30% |
| 13–16 Dec | £597 | £886 (4) | P25 | −33% |

- The open-stay average is **P27**.
- Booked stays (derived basis): 3–5 Nov P20, 6–8 Nov P0 (n=1), 24–26 Nov P100 (comps cut), 27–29 Nov P0.

**Recommendation (`rm/positioning.py`):**
- `quality_premium(4.77, 4.27)` = **+0.15** (cap).
- `recommend(0.897, 0.39, 0.29, 0.15)` → **raise +25%** (30d).
- `recommend(0.695, 0.37, 0.27, 0.15)` → **raise +25%** (60d).
- **Reasoning:** P05 books 51 points ahead of the market, is rated 0.5 star above the set median, and has 13 more reviews. Yet it sits around P25 and 30–40% under the median on the December stays. +25% there (£666–£746 all-in) still lands under the medians of £790–£892.
- **Not 16–18 Nov.** The two nearest 4-bed comps cut that stay to £509 and £519 today. +25% would put us at £541, above the new median, so the evidence supports about +15% (£498) there.

**Comp set caveat:** only 6 comps qualify, and only 1–5 priced per stay. Three of them are rated below 4.3, so the median rating of 4.27 flatters our quality premium.

**Differentiators:**
- 912053248917940403 is Superhost, lift, park view, 4.96: £632–£825.
- 1639043256346803626 is a Superhost house with a terrace, 4.89: £440–£560. It shows an "Early booking discount −£280" on 7–9 Dec.
- 1610095240357069208 and 1606112160333193293 (parking, terrace) are at 0.55 km.

**Comp table** (Airbnb, checked 2026-10-30; nightly excl. taxes, cleaning included; (±%) = change vs 29 Oct for the same stay):

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Wed 16 Dec (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.17 (12) | £529 | n/a | £509 (-38%) | £920 | £509 (-38%) | £960 | £1020 | £980 | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | £519 (-10%) | £519 | £570 (-44%) | £1020 | £519 (-49%) | £960 | £1020 | £980 | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.96 (28) | £632 (-6%) | n/a | n/a | n/a | n/a | £825 (-1%) | n/a | £793 | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.29 (45) | n/a | n/a | £352 (-1%) | n/a | n/a | n/a | £340 (-1%) | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.83 (12) | £400 | n/a | £486 (-6%) | n/a | £400 | £445 (-4%) | n/a | £448 | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (27) | £440 | n/a | n/a | n/a | n/a | n/a | £560 | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.27 (22.0) | £519 (5) | £519 (1) | £498 (4) | £970 (2) | £509 (3) | £892 (4) | £790 (4) | £886 (4) | |
| **Ours, PL room/night (status, min stay)** | | | | £428 Booked (Smoobu), min 3 | £470 Booked (Smoobu), min 2 | £648 Booked (Smoobu), min 3 | £664 Booked (Smoobu), min 4 | £438 Open, min 2 | £538 Open, min 3 | £508 Open, min 2 | £591 Open, min 3 | |
| **Ours, comparable basis** | | | | £425 | £457 | £594 | £605 | £433 obs | £533 obs | £554 obs | £597 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P20 / -18% | P0 / -12% | P100 / +19% | P0 / -38% | P33 / -15% | P25 / -40% | P25 / -30% | P25 / -33% | |

## P06 Marylebone 2-bed (3288517): intentional blocks excluded

**Open 8–14 Nov (checkout 15 Nov).** Our listing was observed at 4.60 (10), up from 4.56 (9), so there is one new review. No offer line was shown.

| Stay | Ours (observed, all-in) | Factor | Comp median (n) | Our pct | vs median |
|---|---|---|---|---|---|
| 8–11 Nov | £265 | (£795.31 − £129) / £871 PL = 0.765 | £318 (3) | P0 | −17% |
| 10–12 Nov | £292 | | £328 (5) | P0 | −11% |
| 12–15 Nov | £293 | | £430 (3) | P0 | −32% |

- PL room on 8–11 Nov fell £306 → £290 and on 10–12 Nov £310 → £297. 12–15 Nov rose £299 → £326. There is no user log entry for these changes.
- Booked stays: 3–5 Nov P14 / −15%, 6–8 Nov P0 / −47%.
- 24–29 Nov is blocked on purpose and excluded per policy.

**Recommendation (`rm/positioning.py`):**
- `quality_premium(4.60, 4.65)` = −0.022.
- `recommend(0.534, 0.45, 0.0, −0.022)` → **raise +5%**.
- **Reasoning:** sellable nights book in line with the market, and the open nights are the cheapest in the set. +5% gives about £278–£307 all-in, still under every median.
- Not used: the 60-day output (fix-listing), because `forward_occ_60` (13.6%) counts intentional blocks.

**Differentiators:** 5 of the 12 comps have a lift and 2 are Superhosts. The nearest is 1700204078606711134 (0.16 km, Superhost, lift, 4.91) at £312 on 10–12 Nov. P06 is on the 2nd floor with no lift.

**Comp table** (Airbnb, checked 2026-10-30; nightly excl. taxes, cleaning included; (±%) = change vs 29 Oct for the same stay):

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Sun 8 Nov–Wed 11 Nov (3n) | Tue 10 Nov–Thu 12 Nov (2n) | Thu 12 Nov–Sun 15 Nov (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.91 (11) | £304 | £344 | n/a | n/a | n/a | £312 | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.67 (21) | £280 | n/a | £296 | n/a | £291 | £296 | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | £328 | n/a | £348 | n/a | £318 | £328 (-6%) | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | n/a | £478 | n/a | n/a | n/a (was £346) | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.38 (24) | £311 | n/a | £557 | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.73 (52) | £768 | £768 | £902 (+1%) | £1112 (+1%) | n/a | £768 | £732 | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.57 (21) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.52 (21) | £251 | n/a | n/a (was £450) | £484 | n/a | n/a | £322 | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (53) | £362 | £586 | n/a | £650 | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.12 (26) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.87 (87) | n/a | n/a | n/a (was £565) | £588 (-5%) | £355 | £381 (+2%) | £430 | parking listed |
| **Comp median (n)** | | | 4.65 (25.0) | £311 (7) | £586 (3) | £478 (5) | £619 (4) | £318 (3) | £328 (5) | £430 (3) | |
| **Ours, PL room/night (status, min stay)** | | | | £263 Booked (Smoobu), min 2 | £320 Booked (Smoobu), min 2 | £317 Blocked, min 3 | £346 Blocked, min 4 | £290 Open, min 2 | £297 Open, min 2 | £326 Open, min 2 | |
| **Ours, comparable basis** | | | | £266 | £310 | £307 | £329 | £265 obs | £292 obs | £293 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P14 / -15% | P0 / -47% | excluded | excluded | P0 / -17% | P0 / -11% | P0 / -32% | |

## P08 Islington 2-bed (3318167): sellable to 13 Nov only (handback)

**5–8 Nov (the last open nights before handback):** our listing shows **£642.42 all-in for 3 nights (£214/night), with no "Special offer" line**. 6–8 Nov shows £488.66 (£244/night), also with no offer.
- Both equal **0.765 x PL + £149 cleaning**: (£642.42 − £149) / £645 = 0.765. That is the standard Airbnb rule factor.
- Yesterday's 5–7 Nov stay showed a list of £273.85/night and then "Special offer −£119.61". I did not re-search that exact 2-night stay, so whether the offer was removed or was specific to that stay is NOT CHECKED (t-p08-offer).

**Positioning:**
- Only 1 comp priced: 28354043 (4.8, 35 reviews), at £386 for 5–8 Nov and £408 for 6–8 Nov.
- That puts us at **P0, −44% / −40%** (n=1). Booked 3–5 Nov is P50 / −22% (n=2).
- **Thin set:** 3 of the 6 comps priced no stay at all today (listed above).

**Recommendation (`rm/positioning.py`):**
- `quality_premium(4.33, 4.81)` = −0.15.
- `recommend(0.786, 0.50, 0.0, −0.15)` → **raise +10%**.
- **Reasoning:** the flat books 29 points ahead of the market and the last 3 open nights are well under the one comparable price. Three reviews cap any premium, but they do not justify a 40% gap. +10% gives about £231–£264 all-in.

**Differentiators:** P08 has a ground-floor private terrace. The 4.98–5.0 Superhost / Guest favourite comps were not available.

**Comp table** (Airbnb, checked 2026-10-30; nightly excl. taxes, cleaning included; (±%) = change vs 29 Oct for the same stay):

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Thu 5 Nov–Sun 8 Nov (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | £408 | £408 | £408 | £408 | £386 | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | n/a | n/a | £201 | £201 | n/a | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (64) | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1596458903516109468](https://www.airbnb.co.uk/rooms/1596458903516109468) | 1.26 | 5 | 4.0 (10) | n/a | n/a | n/a | n/a | n/a | none listed |
| [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) | 1.22 | 4 | 4.6 (77) | £220 | n/a | n/a | n/a | n/a | none listed |
| **Comp median (n)** | | | 4.81 (27.5) | £314 (2) | £408 (1) | £304 (2) | £304 (2) | £386 (1) | |
| **Ours, PL room/night (status, min stay)** | | | | £202 Booked (Smoobu), min 2 | £222 Open, min 2 | £234 Blocked, min 3 | £312 Blocked, min 3 | £215 Open, min 2 | |
| **Ours, comparable basis** | | | | £246 | £244 obs | £274 | £340 | £214 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P50 / -22% | P0 / -40% | excluded | excluded | P0 / -44% | |

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

- **PriceLabs room:** £500 on all four stays (min stay 3–4), all Open.
- **Comp medians:** £245 / £266 / £278 / £290 (n = 6 / 6 / 5 / 3).
- **Our position:** **P100, +104% / +88% / +80% / +73%**.
- **Rating:** comp median 4.91 (19 reviews).
- **Occupancy:** 0% vs 41% for the market over 30 days (`kpi_pack`).
- No positioning or proposal, per policy.

**Comp table** (Airbnb, checked 2026-10-30; nightly excl. taxes, cleaning included; (±%) = change vs 29 Oct for the same stay):

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.4 (30) | £168 (-3%) | £252 | £252 | n/a | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.66 (47) | n/a | £352 | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | £236 | £236 | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | £302 | n/a | n/a | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | £278 | £278 | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | £254 | £254 | £290 | £290 | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | £345 | n/a | n/a (was £402) | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (17) | £218 | n/a | n/a | £276 (-9%) | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (15) | n/a | n/a | £200 | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | £264 | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.9 (10) | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.91 (19.0) | £245 (6) | £266 (6) | £278 (5) | £290 (3) | |
| **Ours, PL room/night (status, min stay)** | | | | £500 Open, min 3 | £500 Open, min 4 | £500 Open, min 3 | £500 Open, min 4 | |
| **Ours, comparable basis** | | | | £500 | £500 | £500 | £500 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +104% | P100 / +88% | P100 / +80% | P100 / +73% | |

## P17 St John's Wood 1-bed: NOT IN SYSTEMS

- **Comp medians:** £224 / £255 / £232 / n/a (n = 2 / 2 / 5 / 0).
- **Rating:** comp median 4.56 (49 reviews).
- **Status:** no PriceLabs or Smoobu listing is mapped, so this is a reference set only.

**Comp table** (Airbnb, checked 2026-10-30; nightly excl. taxes, cleaning included; (±%) = change vs 29 Oct for the same stay):

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | £190 (+9%) | £186 | £192 | n/a | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (49) | n/a (was £311) | n/a | £320 | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.56 (27) | n/a (was £210) | n/a | n/a (was £222) | n/a (was £261) | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.87 (87) | £258 (-2%) | £323 | £264 (-3%) | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.66 (59) | n/a | n/a | £232 (-2%) | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.43 (167) | n/a | n/a | £126 | n/a | parking listed |
| [774061637963678253](https://www.airbnb.co.uk/rooms/774061637963678253) | 0.54 | 3 | 4.5 (34) | n/a | n/a | n/a | n/a | Superhost, parking listed |
| **Comp median (n)** | | | 4.56 (49) | £224 (2) | £255 (2) | £232 (5) | n/a (0) | |
| **Ours, PL room/night (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | |

## Rows written
- **`data/snapshots/2026-10-30/comps.csv`:** **346 rows**. The file was new today.
  - Contents: 55 comps x their stays. A blank price means not available for that stay.
  - Every row carries platform, URL, stay dates, guests, price basis (excl. taxes, cleaning included), check date 2026-10-30, distance, capacity and differentiators.
  - Written under the lock `.comps.csv.lock`, with the header checked against `rm/snapshot.py` and a duplicate guard.
- **`data/snapshots/2026-10-30/channel_checks.csv`:** **9 rows**, our observed Airbnb prices for P05, P06 and P08. Written under `.channel_checks.csv.lock`.
- **Yesterday's rows were not copied forward.** They stay in `2026-10-29/comps.csv` with their own check date, which avoids duplicating them if other agents also copy forward.
- `rm.snapshot.load('2026-10-30')` reads 346 comps and 9 channel checks (at the time of writing).

Data gaps:
- **Booking.com: NOT CHECKED** for all six properties (bot check; not bypassed). This leaves several P11 items unknown: its Booking.com display price after promotions, its search position and its review count.
  - P11's percentile compares PL room (or PL x 1.15) with Airbnb all-in comps, so it is biased low.
- **Comps absent from every stay** (P08 x3, P06 x3, P11 x1, P14 x2, P17 x2): I did not check listing pages, so whether they are inactive is unconfirmed. They are kept and not replaced. P08 has effectively 3 live comps (fewer than 6).
- **P05:** only 6 comps qualify (4-bed, sleeps 7–9, ≤ 1.3 km) and 1–5 priced per stay. Three comps are rated below 4.3, which inflates `quality_premium`.
- **P05 6–9 Nov booking:** booking time and the price at that time are NOT CHECKED, so the 0.843x paid vs displayed gap is unexplained. PriceLabs still shows 6–8 Nov Open.
- **P08:** the origin of the 29 Oct "Special offer" (5–7 Nov) is NOT CHECKED. Today's 5–8 Nov and 6–8 Nov show none.
- **P11 PL price moves** 29 → 30 Oct (Nov −5–12%, Dec +3–5%): no user log entry, so the algorithm driver is NOT CHECKED.
- **Comp outlier** 1543632408013225027 (£2,300+/night on two P11 stays) is not verified.
- **P17:** not in PriceLabs or Smoobu, so no own price.
- **P14:** not seen in Airbnb searches, so its rating and review count are NOT CHECKED.
