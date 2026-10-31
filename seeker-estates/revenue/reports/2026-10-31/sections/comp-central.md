# Competitor positioning: CENTRAL/NORTH (D = 2026-10-31)

**Method**
- **Comp ids:** the same 55 comp ids as 27–30 Oct (`data/snapshots/2026-10-30/comps.csv`, comp-central rows). None added, none replaced.
- **Searches:** 43 plain public Airbnb search pages (airbnb.co.uk, HTTP 200, no challenge), same map boxes as 25–30 Oct, entire home, min bedrooms = ours, adults = our sleeps − 1, all result pages. Script `c31s/search.py` and raw results `c31/search/*.json` in the scratchpad.
- **Like-for-like stays, same for every comp and for us** (kept from 30 Oct so the trend is real): Tue 3–Thu 5 Nov (midweek), Fri 6–Sun 8 Nov (next Fri–Sun), Tue 24–Thu 26 Nov, Fri 27–Sun 29 Nov (about 30 days out).
- **Our open dates** (`prices.csv` 31 Oct, cross-checked with Smoobu `reservations.csv` 31 Oct):
  - **P11:** 1–2 Nov, 10–13 Nov, 18 Nov–4 Dec, 8–18 Dec, 23–25 Dec. Searched as 1–3 Nov, 10–14 Nov, 18–21 Nov, 24–26 Nov, 27–29 Nov, 28 Nov–4 Dec, 8–11 Dec, 11–14 Dec, 15–19 Dec, 23–26 Dec. Today adds 1–3 Nov, 10–14 Nov and 23–26 Dec, which were open yesterday too but were not searched then.
  - **P05:** 9 Nov (1 night, min 1), 16–17 Nov, 29 Nov–2 Dec, 7–8 Dec, 13–21 Dec, 29 Dec (1 night, min 1). Searched as 9–10 Nov, 16–18 Nov, 29 Nov–3 Dec, 7–9 Dec, 13–16 Dec, 17–20 Dec (new) and 29–30 Dec (new).
  - **P06:** 8–14 Nov, searched as 8–11, 10–12 and 12–15 Nov.
  - **P08:** 5–7 Nov, searched as 5–8 Nov (the whole gap; handback after 13 Nov).
- **Price basis:**
  - Comps: Airbnb displayed total / nights, **excl. taxes, cleaning INCLUDED**, after any offer.
  - Ours on open stays (P05, P06, P08): **observed** in the same searches, 11 stays (rows in `channel_checks.csv`). Our listing was not returned for P06 10–12 Nov, so that stay uses the derived basis.
  - Ours on booked or blocked stays: derived exactly as on 30 Oct. P05 is 0.765 x PL at ≤ 28 days lead and 0.900 beyond, + £195 / nights. P06 is 0.765 x PL + £129 / nights. P08 is 0.85 x PL + £149 / nights.
  - P11 (Booking.com only) and P14: PriceLabs room price. For P11 I also show the Booking.com list price (PL x 1.15, the Smoobu markup in policy), before Booking.com promotions.
- **Booking.com: NOT CHECKED.** The bot check was seen on 28 Oct. It was not retried or bypassed.
- **PriceLabs:** one `get_user_logs` call (listing log, P05/P06/P08/P11/P14, 29–31 Oct). It returned 12 entries, all from Reyhan between 30 Oct 22:05 and 22:10Z:
  - **P05:** 9 Nov override set three times (+100%, then +150%, then **+300%**), min stay 1. 7–8 Dec override **+3%**, min 2.
  - **P11:** **−3%** min 3 on 31 Oct and 10 Nov. **−2%** min 2 on 18–19 Nov, 22–25 Nov, 29 Nov–2 Dec, 3–4 Dec, 8–9 Dec and 13–16 Dec.
  - No change on P06, P08 or P14.
  - There is still no Competitor Listings or Market Dashboard comp source.
- **Positioning:** calculated with `rm/positioning.py` (`quality_premium`, `recommend`). Occupancy comes from `reports/2026-10-31/kpi_pack.json`: `forward_occ_30_ex_blocks` where present, else `forward_occ_30` / `_60`, against `market_occ_30` / `_60`. The percentile fed to `recommend` is the mean over **open** multi-night stays: check-in ≤ 29 Nov for 30d, all open stays for 60d. P05's two 1-night orphan stays (9 Nov n=1, 29 Dec n=0) are left out because they are not comparable. The base review is on hold until Mon 2 Nov, so these outputs are inputs to that review.

**Comps kept although missing from every stay today.** The rule is to replace a comp only when it is inactive. Absence from date-filtered results does not prove that, and I did not open listing pages.
- **P08:** 1289147258305624118 (6th day), 1596458903516109468 (3rd). 693487869095756237 is back (£270 on 3–5 Nov). Only 4 of the 6 priced any stay.
- **P06:** 1452940332365117153 (5th day), 1259401393497276633 (3rd). 917140285217729256 is back (£561 on 12–15 Nov).
- **P11:** 1515051936255130803 (5th day).
- **P14:** 1595613237427991150 (5th day), 1075245497252121738 (4th), 1460955085260023644 (1st).
- **P17:** 1304473419588771105 and 774061637963678253 (2nd day).
- If the 5–6-day absentees (P08 1289147258305624118, P06 1452940332365117153, P11 1515051936255130803, P14 1595613237427991150) are still missing on 2 Nov, open their listing pages. Replace them only if the listing is unlisted or shows no availability over the next 60 days.

## Summary

| Ref | Comps (priced per stay) | Comp median on open stays | Ours on the same stays | Our pct (open stays) | Rating ours vs comp median; review gap | Booked vs mkt | Supported positioning |
|---|---|---|---|---|---|---|---|
| **P05 4BR** | 6 (0–5) | 16–18 Nov £509 (3); 29 Nov–3 Dec £888 (4); 7–9 Dec £790 (4); 13–16 Dec £886 (4); 17–20 Dec £956 (4); 9–10 Nov £320 (1) | £416 / £538 / £546 / £599 / £640 observed all-in; 9–10 Nov £448 (with "Special offer") | **P27** (−18% / −39% / −31% / −32% / −33%) | Airbnb 4.77 (35) vs 4.27 (22); **+13 reviews** | 30d 86.2% vs 40%; 60d 67.8% vs 38% | qp +0.15 (cap). `recommend` 30d (P29) and 60d (P27) = **raise +25%**. Supported on the Dec stays (+25% stays under the median). On 16–18 Nov about +15% (£478), not +25% |
| **P06 2BR** | 12 (2–6) | 8–11 Nov £322 (5); 10–12 Nov £328 (5); 12–15 Nov £438 (3) | £242 obs / £279 derived / £305 obs | **P0** (−25% / −15% / −30%) | 4.60 (10) vs 4.65 (25); −15 reviews | 30d ex-blocks 49.9% vs 45% | qp −0.022. `recommend` 30d = **raise +5%**. The 60d fix-listing output is not used because `forward_occ_60` counts intentional blocks |
| **P08 2BR** | 6, but only 4 priced (1–3) | 5–8 Nov £386 (1); 6–8 Nov £408 (1) | £212 / £242 observed, no offer line | **P0** (−45% / −41%), n = 1 | 4.33 (3) vs 4.81 (27.5); −24.5 reviews | 76.9% vs 49% | qp −0.15. `recommend` = **raise +10%**. Thin evidence (one priced comp) |
| **P11 2BR** | 12 (2–9) | 1–3 Nov £262 (3); 10–14 Nov £282 (6); 18–21 Nov £297 (5); 24–26 Nov £286 (5); 27–29 Nov £462 (3); 28 Nov–4 Dec £424 (2); 8–11 Dec £373 (9); 11–14 Dec £432 (8); 15–19 Dec £394 (6); 23–26 Dec £389 (6) | PL room £192 / £209 / £208 / £192 / £266 / £231 / £241 / £285 / £234 / £311 | **P8** room; **P13** at Booking.com list (x1.15) | Booking.com 8.0/10 (policy), not comparable with the Airbnb median 4.67 (35.5); our review count NOT CHECKED | 30d 37.9% vs 46%; 60d 37.3% vs 38% | qp 0. `recommend` 30d = **fix-listing**, 60d = **raise +5%**. Reyhan's −2/−3% cuts of 30 Oct go against this evidence |
| P14 1BR | 12 (3–7) | £236 / £254 / £290 / £290 | £500 room | P100 (+111% / +97% / +73% / +73%) | not seen on Airbnb; comp median 4.91 (19) | 0% vs 41% (30d) | special setup: numbers only |
| P17 1BR | 7 (0–5) | £258 / £255 / £227 / n/a | NOT IN SYSTEMS | n/a | comp median 4.56 (49) | n/a | collect-data |

**Day-on-day changes (same comp, same stay, same checkout; 30 → 31 Oct):**
- The median like-for-like change is 0.0% on every common stay for P05, P08, P11, P14 and P17. Exception: **P06 Fri 6–8 Nov fell −12%** (n=2), driven by 1273781636585601427 (£768 → £588 on 3–5, 6–8 and 10–12 Nov).
- **The P11 outlier has resolved.** 1543632408013225027 went from £2,302 to £270 on 18–21 Nov, and from £615 to £462 on 27–29 Nov. Its 24–26 Nov £2,326 is gone (not available).
- **P11:** 1675590787835266115 6–8 Nov £418 → £328 (−22%). 1542815721953379556 3–5 Nov −10%.
- **P06:** 673753763892997438 3–5 Nov −9%. 1018722159796386217 27–29 Nov +8%.
- **Our own PL room moves:**
  - P06 8–11 Nov £290 → £260 (−10%) and 10–12 Nov £297 → £280 (−6%), with no user log entry (algorithm).
  - **P05 9 Nov £426 → £1,442** (Reyhan +300%).
  - P11 is down 0.5–2% on most open nights (Reyhan −2/−3%).

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

**9 Nov orphan (a-p05-9nov): Reyhan's +300% does not reach Airbnb, and Airbnb shows an unexplained "Special offer".**
- **PriceLabs:** 9 Nov is now **£1,442 with min stay 1**. The overrides were logged 30 Oct 22:09Z: +100%, then +150%, then +300%. The last push was 30 Oct 22:10:33Z (`listings.csv`).
- **What Airbnb shows** for 9–10 Nov, 7 adults, checked 31 Oct: **1 night x £511.80, "Special offer −£63.36", total £448.44**, cleaning included. That is £316.80 room before the offer and £253.44 after. It is nowhere near £1,442, so the Airbnb price does not follow PriceLabs for this night.
- **Control:** 29 Dec (PL £1,338, min 1) shows £1,399.20 = 0.900 x £1,338 + £195 exactly. So 1-night pricing does reach Airbnb on other dates.
- **The offer line is unexplained.** Policy says all manual Airbnb promotions were removed on 21 Oct. Whether Smoobu holds £1,442 for 9 Nov is NOT CHECKED (the `smoobu_price` column in `prices.csv` simply mirrors PL).
- **Two things to do:**
  - Corentin to confirm the intent of +300%. The a-p05-9nov plan was min 1 to sell the orphan night, while £1,442 is 4.5x the only 4-bed comp priced for that night (1617681646241740026, £320 all-in).
  - Check the Airbnb calendar for 9 Nov: price and promotion.
- At the price guests actually see (£448 all-in), we are P100 / +40% vs that single comp (n=1).

**t-pl-sync is fixed for P05:** PriceLabs now shows 6–8 Nov as Booked, booked ADR £297.84 = Smoobu £893.52 / 3.

**7–8 Dec +3% (Reyhan):**
- This is in line with the raise signal.
- Our listing shows £546 all-in on 7–9 Dec: (£1,092.30 − £195) / 2 nights of PL £997 = **0.900**.
- That is still P25, −31% vs the £790 median.

**Positioning on open stays** (observed; every factor matches the a-airbnb-rules: 0.765 at ≤ 28 days, 0.900 beyond):

| Stay | Ours (observed all-in) | Comp median (n) | Our pct | vs median |
|---|---|---|---|---|
| 16–18 Nov | £416 | £509 (3) | P33 | −18% |
| 29 Nov–3 Dec | £538 | £888 (4) | P25 | −39% |
| 7–9 Dec | £546 | £790 (4) | P25 | −31% |
| 13–16 Dec | £599 | £886 (4) | P25 | −32% |
| 17–20 Dec (new) | £640 | £956 (4) | P25 | −33% |
| 9–10 Nov (1n) | £448 (offer) | £320 (1) | P100 | +40% |
| 29–30 Dec (1n) | £1,400 | none priced | n/a | n/a |

**Recommendation (`rm/positioning.py`):**
- `quality_premium(4.77, 4.27)` = **+0.15** (cap).
- `recommend(0.862, 0.40, 0.29, 0.15)` → **raise +25%** (30d).
- `recommend(0.678, 0.38, 0.27, 0.15)` → **raise +25%** (60d).
- **Reasoning:** P05 books 46 points ahead of the market, is rated half a star above the set median and has 13 more reviews, yet sits at P25 and 31–39% under the median on the Dec stays. +25% there (£673–£800 all-in) still lands under the £790–£956 medians.
- **16–18 Nov:** the two 0.55 km comps hold £509 / £519. +25% (£520) would just pass the median, so about +15% (£478) is the supported step.

**Differentiators:**
- 912053248917940403: Superhost, lift, park view, 4.96, £792–£933.
- 1639043256346803626: Superhost house with a terrace, 4.89, £440–£560. It still shows "Early booking discount −£280" on 7–9 Dec.
- 1610095240357069208 and 1606112160333193293: 0.55 km, parking (and a terrace on the second).

**Comp set caveat:** only 6 comps qualify. Three are rated below 4.3, which flatters the quality premium.

**Comp table** (Airbnb, checked 2026-10-31; nightly excl. taxes, cleaning included; (±%) = change vs 30 Oct for the same stay and checkout):

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 9 Nov–Tue 10 Nov (1n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Wed 16 Dec (3n) | Thu 17 Dec–Sun 20 Dec (3n) | Tue 29 Dec–Wed 30 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.17 (12) | £529 | n/a | £509 | £920 | n/a | £509 | £960 | £1020 | £980 | £980 | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | £519 | £519 | £570 | £1020 | n/a | £519 | £960 | £1020 | £980 | £980 | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.96 (28) | £632 | n/a | n/a | n/a | n/a | n/a | £816 (-1%) | n/a | £792 | £933 | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.29 (45) | n/a | n/a | £352 | n/a | £320 | n/a | n/a | £340 | n/a | n/a | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.83 (12) | £400 | n/a | £474 (-2%) | n/a | n/a | £400 | £429 (-4%) | n/a | £438 (-2%) | £500 | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (27) | £440 | n/a | n/a | n/a | n/a | n/a | n/a | £560 | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.27 (22.0) | £519 (5) | £519 (1) | £492 (4) | £970 (2) | £320 (1) | £509 (3) | £888 (4) | £790 (4) | £886 (4) | £956 (4) | n/a (0) | |
| **Ours, PL room/night (status, min stay)** | | | | £448 Booked (Smoobu), min 3 | £490 Booked (Smoobu), min 2 | £620 Booked (Smoobu), min 3 | £632 Booked (Smoobu), min 4 | £1442 Open, min 1 | £416 Open, min 2 | £543 Open, min 3 | £498 Open, min 2 | £593 Open, min 3 | £639 Open, min 3 | £1338 Open, min 1 | |
| **Ours, comparable basis** | | | | £440 | £472 | £572 | £581 | £449 obs | £416 obs | £538 obs | £546 obs | £599 obs | £640 obs | £1400 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P20 / -15% | P0 / -9% | P100 / +16% | P0 / -40% | P100 / +40% | P33 / -18% | P25 / -39% | P25 / -31% | P25 / -32% | P25 / -33% | n/a | |

## P06 Marylebone 2-bed (3288517): intentional blocks excluded

**Open 8–14 Nov.** Our listing was observed at 4.60 (10), unchanged, with no offer line.
- 8–11 Nov: £242.15/night = (£726.46 − £129) / PL £781 = **0.765**.
- 12–15 Nov: £304.63 = (£913.88 − £129) / £1,026 = 0.765.
- 10–12 Nov: our listing was **not returned** by the search although PriceLabs shows it Open, min 2. The cause (Airbnb calendar or min stay) is NOT CHECKED, and the derived basis is used for this stay.

| Stay | Ours | Comp median (n) | Our pct | vs median |
|---|---|---|---|---|
| 8–11 Nov | £242 observed | £322 (5) | P0 | −25% |
| 10–12 Nov | £279 derived | £328 (5) | P0 | −15% |
| 12–15 Nov | £305 observed | £438 (3) | P0 | −30% |

- PriceLabs itself cut 8–11 Nov by a further 10% overnight (no user log). We are the cheapest priced listing on every open stay.
- 24–29 Nov is blocked on purpose and excluded per policy.

**Recommendation (`rm/positioning.py`):**
- `quality_premium(4.60, 4.65)` = −0.022.
- `recommend(0.499, 0.45, 0.0, −0.022)` → **raise +5%**.
- **Reasoning:** sellable nights book in line with the market while we sit at P0, 15–30% under the median. +5% (about £254–£320 all-in) is still under every median, and the extra overnight PriceLabs cut on 8–11 Nov is not supported by comp evidence.

**Differentiators:**
- 5 of the 12 comps have a lift and 2 are Superhosts. P06 is on the 2nd floor with no lift.
- The nearest comp, 1700204078606711134 (0.16 km, Superhost, lift, 4.91), is £283–£313 on our open stays.

**Comp table** (Airbnb, checked 2026-10-31; nightly excl. taxes, cleaning included; (±%) = change vs 30 Oct for the same stay and checkout):

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Sun 8 Nov–Wed 11 Nov (3n) | Tue 10 Nov–Thu 12 Nov (2n) | Thu 12 Nov–Sun 15 Nov (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.91 (11) | n/a (was £304) | £339 (-1%) | n/a | n/a | £283 | £304 (-3%) | £313 | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.67 (21) | £280 | n/a | £296 | n/a | £291 | £296 | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | £328 | n/a | £348 | n/a | £322 (+1%) | £328 | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | n/a | £478 | n/a | n/a | n/a | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.38 (24) | £311 | n/a | £557 | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.73 (52) | £588 (-23%) | £588 (-23%) | £894 (-1%) | n/a (was £1112) | £552 | £588 (-23%) | n/a (was £732) | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | n/a | £561 | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.55 (22) | n/a (was £251) | n/a | n/a | £486 | n/a | n/a | n/a (was £322) | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (53) | £329 (-9%) | n/a (was £586) | n/a | £642 (-1%) | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.12 (26) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.87 (87) | n/a | n/a | £578 | £636 (+8%) | £348 (-2%) | £374 (-2%) | £438 (+2%) | parking listed |
| **Comp median (n)** | | | 4.65 (25.0) | £328 (5) | £463 (2) | £518 (6) | £636 (3) | £322 (5) | £328 (5) | £438 (3) | |
| **Ours, PL room/night (status, min stay)** | | | | £250 Booked (Smoobu), min 2 | £301 Booked (Smoobu), min 2 | £438 Blocked, min 3 | £474 Blocked, min 4 | £260 Open, min 2 | £280 Open, min 2 | £342 Open, min 2 | |
| **Ours, comparable basis** | | | | £255 | £295 | £400 | £427 | £242 obs | £279 | £305 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P0 / -22% | P0 / -36% | excluded | excluded | P0 / -25% | P0 / -15% | P0 / -30% | |

## P08 Islington 2-bed (3318167): sellable to 13 Nov only (handback)

**5–8 Nov (the last open nights):**
- Our listing shows **£634.77 for 3 nights (£212/night)**, no offer line: (£634.77 − £149) / PL £635 = 0.765.
- 6–8 Nov shows £483.30 (£242/night), also no offer.
- PL room is £212 vs £215 yesterday.
- Only one comp is priced: 28354043 (4.8, 35 reviews) at £386 / £408. That puts us at **P0, −45% / −41%** (n=1).
- 693487869095756237 (4.98, 66 reviews, Superhost) reappeared at £270 on 3–5 Nov, which is a booked stay for us.

**Recommendation (`rm/positioning.py`):**
- `quality_premium(4.33, 4.81)` = −0.15.
- `recommend(0.769, 0.49, 0.0, −0.15)` → **raise +10%**.
- **Reasoning:** the flat books 28 points ahead of the market, and the last 3 open nights are 41–45% under the one comparable price. The 3-review quality discount does not explain a gap that size. +10% gives about £233–£266 all-in.
- With 6 days to arrival, the risk of leaving the nights empty before handback argues for not going beyond +10%.

**Differentiators:** P08 has a ground-floor private terrace. The 4.98–5.0 Superhost / Guest favourite comps were mostly not available.

**Comp table** (Airbnb, checked 2026-10-31; nightly excl. taxes, cleaning included; (±%) = change vs 30 Oct for the same stay and checkout):

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Thu 5 Nov–Sun 8 Nov (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | £408 | £408 | £408 | £408 | £386 | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | n/a | n/a | £201 | £201 | n/a | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (66) | £270 | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1596458903516109468](https://www.airbnb.co.uk/rooms/1596458903516109468) | 1.26 | 5 | 4.0 (10) | n/a | n/a | n/a | n/a | n/a | none listed |
| [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) | 1.22 | 4 | 4.6 (77) | £220 | n/a | n/a | n/a | n/a | none listed |
| **Comp median (n)** | | | 4.81 (27.5) | £270 (3) | £408 (1) | £304 (2) | £304 (2) | £386 (1) | |
| **Ours, PL room/night (status, min stay)** | | | | £196 Booked (Smoobu), min 2 | £218 Open, min 2 | £234 Blocked, min 3 | £306 Blocked, min 3 | £212 Open, min 2 | |
| **Ours, comparable basis** | | | | £242 | £242 obs | £273 | £335 | £212 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P33 / -11% | P0 / -41% | excluded | excluded | P0 / -45% | |

## P11 Camden 2-bed (3064196): Booking.com only

**Open nights:** 1–2 Nov, 10–13 Nov, 18 Nov–4 Dec, 8–18 Dec and 23–25 Dec. PriceLabs and Smoobu agree; the last push was 30 Oct 22:07Z.

**Positioning:**
- On every open stay we are at **P0–P33**, 20–46% under the comp median.
- Even at the Booking.com list price (PL x 1.15, before Mobile 10% / Genius / Last Minute), we are at P0–P40 and 8–37% under the median. Mean over open stays: **P13**.
- The comps include cleaning and our room price does not, so the room percentile is biased low. The list-price view corrects only part of that.

**Reyhan's 30 Oct overrides:** −3% on 31 Oct and 10 Nov (min 3), and −2% on 18–19 Nov, 22–25 Nov, 29 Nov–4 Dec, 8–9 Dec and 13–16 Dec. All of these dates are open and already the cheapest in the set, so the comp evidence does not support a cut. This is reported for Corentin to confirm, not as a new proposal. Policy (darts, 24 Oct) covers only the darts override.

**Recommendation (`rm/positioning.py`):**
- `quality_premium` = 0. The Booking.com 8.0/10 is not on the Airbnb scale.
- `recommend(0.379, 0.46, 0.03, 0)` → **fix-listing** (30d).
- `recommend(0.373, 0.38, 0.08, 0)` → **raise +5%** (60d).
- **Reasoning:** we trail the market at 30 days while already the cheapest priced listing. The gap is visibility or conversion: policy records Booking.com search views −64% and click-through 0.81% vs 1.70%. So price cuts are not supported, and the December stays support a small rise.

**Differentiators:**
- 4 of the 12 comps have a lift and 3 have a balcony or terrace.
- The closest comps (0.08 km, 1263490105174331990 and 1090528454481682946) are £191–£307, near our level.

**Comp table** (Airbnb, checked 2026-10-31; nightly excl. taxes, cleaning included; (±%) = change vs 30 Oct for the same stay and checkout):

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Sun 1 Nov–Tue 3 Nov (2n) | Tue 10 Nov–Sat 14 Nov (4n) | Wed 18 Nov–Sat 21 Nov (3n) | Sat 28 Nov–Fri 4 Dec (6n) | Tue 8 Dec–Fri 11 Dec (3n) | Fri 11 Dec–Mon 14 Dec (3n) | Tue 15 Dec–Sat 19 Dec (4n) | Wed 23 Dec–Sat 26 Dec (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.7 (30) | £288 (-10%) | n/a | £440 | £440 | £278 | £283 | £336 | n/a (was £392) | £447 | £529 | £456 | n/a | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a | £286 | n/a | £262 | n/a | n/a | n/a | £359 | £359 | £382 | £440 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | n/a | n/a (was £2326) | £462 (-25%) | n/a | n/a | £270 (-88%) | £424 | £444 | £494 | n/a (was £420) | n/a | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | £238 | £438 | n/a (was £438) | n/a | n/a | £406 | £417 | n/a | £417 | £417 | £406 | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.45 (11) | £284 (-4%) | £306 | n/a (was £306) | £615 | n/a | £270 | £282 | £424 | £444 | £494 | n/a | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | £292 (+2%) | £328 (-22%) | £358 | n/a | n/a | £329 | n/a | n/a | £373 | £448 | £470 | £499 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.52 (27) | £212 | £312 | n/a | n/a | £202 | £281 | n/a | n/a | £292 | n/a | £281 | £292 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.5 (60) | n/a | n/a | £191 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £270 | £307 | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (87) | n/a | n/a | £210 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.68 (73) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £217 | £258 | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.54 (37) | n/a | £305 | n/a | n/a | n/a | £257 | £297 (-1%) | n/a | £311 (+1%) | £352 | n/a | £361 | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (35.5) | £284 (5) | £312 (5) | £286 (5) | £462 (3) | £262 (3) | £282 (6) | £297 (5) | £424 (2) | £373 (9) | £432 (8) | £394 (6) | £389 (6) | |
| **Ours, PL room/night (status, min stay)** | | | | £199 Booked (Smoobu), min 2 | £232 Booked (Smoobu), min 2 | £192 Open, min 2 | £266 Open, min 3 | £192 Open, min 2 | £209 Open, min 2/3 | £208 Open, min 2/3 | £231 Open, min 2/3 | £241 Open, min 2/3 | £285 Open, min 2/3 | £234 Open, min 2 | £311 Open, min 2/3 | |
| **Ours, comparable basis** | | | | £199 | £232 | £192 | £266 | £192 | £209 | £208 | £231 | £241 | £285 | £234 | £311 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = PL x 1.15 (before promotions)** | | | | £229 P20 / -19% | £267 P0 / -14% | £220 P40 / -23% | £305 P0 / -34% | £220 P33 / -16% | £241 P0 / -15% | £239 P0 / -20% | £266 P0 / -37% | £277 P11 / -26% | £328 P12 / -24% | £269 P0 / -32% | £358 P33 / -8% | Smoobu Booking.com markup +15% (policy) |
| **Our percentile / vs median** | | | | P0 / -30% | P0 / -26% | P20 / -33% | P0 / -42% | P0 / -27% | P0 / -26% | P0 / -30% | P0 / -46% | P11 / -35% | P12 / -34% | P0 / -41% | P33 / -20% | |

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

- **PriceLabs room:** £500 on all four stays (min stay 3–4), all Open.
- **Comp medians:** £236 / £254 / £290 / £290 (n = 5 / 5 / 7 / 3).
- **Our position:** **P100, +111% / +97% / +73% / +73%**.
- **Rating:** comp median 4.91 (19 reviews). Our P14 listing was not seen on Airbnb.
- **Occupancy:** 0% vs 41% for the market over 30 days (`kpi_pack`).
- No proposal, per policy.

**Comp table** (Airbnb, checked 2026-10-31; nightly excl. taxes, cleaning included; (±%) = change vs 30 Oct for the same stay and checkout):

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.4 (30) | £168 | £252 | £252 | n/a | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.66 (47) | n/a | £352 | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | £236 | £236 | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | n/a (was £302) | £302 | n/a | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | £278 | £278 | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | £254 | £254 | £290 | £290 | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | £345 | n/a | £402 | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (18) | £218 | n/a | n/a | £264 (-4%) | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (15) | n/a | n/a | £200 | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a (was £264) | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.9 (10) | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.91 (19.0) | £236 (5) | £254 (5) | £290 (7) | £290 (3) | |
| **Ours, PL room/night (status, min stay)** | | | | £500 Open, min 3 | £500 Open, min 4 | £500 Open, min 3 | £500 Open, min 4 | |
| **Ours, comparable basis** | | | | £500 | £500 | £500 | £500 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +111% | P100 / +97% | P100 / +73% | P100 / +73% | |

## P17 St John's Wood 1-bed: NOT IN SYSTEMS

- **Comp medians:** £258 / £255 / £227 / n/a (n = 1 / 2 / 5 / 0).
- **Rating:** comp median 4.56 (49 reviews).
- No PriceLabs or Smoobu listing is mapped, so this is a reference set only.

**Comp table** (Airbnb, checked 2026-10-31; nightly excl. taxes, cleaning included; (±%) = change vs 30 Oct for the same stay and checkout):

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | n/a (was £190) | £186 | £192 | n/a | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (49) | n/a | n/a | £320 | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.56 (27) | n/a | n/a | n/a | n/a | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.87 (87) | £258 | £323 | £264 | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.66 (59) | n/a | n/a | £227 (-2%) | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | £126 | n/a | parking listed |
| [774061637963678253](https://www.airbnb.co.uk/rooms/774061637963678253) | 0.54 | 3 | 4.5 (34) | n/a | n/a | n/a | n/a | Superhost, parking listed |
| **Comp median (n)** | | | 4.56 (49) | £258 (1) | £255 (2) | £227 (5) | n/a (0) | |
| **Ours, PL room/night (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | |

## Rows written
- **`data/snapshots/2026-10-31/comps.csv`:** **400 comp-central rows** appended (55 comps x their stays; a blank price means not available for that stay).
  - Each row carries platform, URL, stay dates, guests, price basis (excl. taxes, cleaning included), check date 2026-10-31, distance, capacity and differentiators.
  - Written under `.comps.csv.lock`, with the header checked against `rm/snapshot.py` and a duplicate guard.
  - The 30 Oct rows had already been copied forward by another agent and were left as they were.
- **`data/snapshots/2026-10-31/channel_checks.csv`:** **11 rows**, our observed Airbnb prices for P05 (7 stays), P06 (2) and P08 (2). Written under `.channel_checks.csv.lock`.
- `rm.snapshot.load('2026-10-31')` reads 1,362 comps and 120 channel checks (all agents, at the time of writing).

Data gaps:
- **Booking.com: NOT CHECKED** for all six properties (bot check; not retried or bypassed). This leaves several P11 items unknown: its Booking.com display price after promotions, its search position and its review count. P11's percentile compares PL room (or PL x 1.15) with Airbnb all-in comps.
- **P05 9 Nov:** why Airbnb shows £511.80 less a "Special offer" of £63.36 instead of the £1,442 PL price is NOT CHECKED. Neither the Smoobu stored rate nor the Airbnb calendar was read.
- **P06 10–12 Nov:** our listing was not returned by the Airbnb search although PL shows it open; the cause is NOT CHECKED.
- **Comps absent from every stay** (P08 x2, P06 x2, P11 x1, P14 x3, P17 x2): listing pages were not opened, so whether they are inactive is unconfirmed. They are kept, not replaced. P08 has 4 live comps and only 1 priced its open stays.
- **P05:** only 6 comps qualify, priced 0–5 per stay. The 1-night stays have n ≤ 1.
- **P05 6–9 Nov booking (paid 0.843x displayed):** the booking time and the price at that time are still NOT CHECKED.
- **P14:** not seen in Airbnb searches, so its rating and review count are NOT CHECKED.
- **P17:** not in PriceLabs or Smoobu, so no own price.
