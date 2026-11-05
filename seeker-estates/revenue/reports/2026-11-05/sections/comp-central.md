# Competitor positioning: CENTRAL/NORTH (D = 2026-11-05)

**Method**
- **Comp ids:** the same 55 comp ids as 1–4 Nov (`data/snapshots/2026-11-04/comps.csv`, comp-central rows). **No replacements.**
  - Comps that appeared on none of today's stays: P06 1700204078606711134, 917140285217729256, 1259401393497276633. P08 693487869095756237, 1289147258305624118, 1409413462916896898, 1497137911142581794. P11 654396087724294901, 1515051936255130803. P14 1075245497252121738, 1595613237427991150. P17 975294297333089697, 774061637963678253.
  - The four P08 comps have now been absent for **4 days running**. Yesterday's plan was to read their calendars today, but that check was **NOT DONE**: fetching the Airbnb listing page was refused by this session's permission policy. They are kept for now. P08 has only 6–7 Nov left to sell before the 13 Nov handback, so replacing them would not change any decision.
- **Searches:** 54 public Airbnb searches (airbnb.co.uk, all result pages, no bot challenge, 0 parse failures). They use the same map boxes and filters as 25 Oct–4 Nov: entire home, minimum bedrooms = ours, adults = our sleeps − 1. Checked 2026-11-05, about 07:20–07:45Z.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c05s/search.py`
  - Raw results: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c05/search/*.json`
- **Same stays for every comp and for us:**
  - Fri 6–Sun 8 Nov (next Friday–Sunday)
  - Tue 10–Thu 12 Nov (midweek)
  - Fri 4–Sun 6 Dec (30 days out)
  - Tue 24–Thu 26 Nov and Fri 27–Sun 29 Nov, kept for the day-on-day comparison
- **Extra stays per property:**
  - **P11:** open stays in the next 14 days (10–14 Nov, 18–20 Nov), 22–26 Nov, 29 Nov–5 Dec, 8–11 / 11–14 / 12–14 Dec, darts 13–17 Dec, 15–19 Dec, 23–26 Dec.
  - **P05:** 9 Nov, 16–18 Nov, and the December gaps.
  - **P06:** 8–10, 8–11, 8–12 and 9–11 Nov. 12–15 Nov is booked in Smoobu (Airbnb, booked 1 Nov), so 8–11 Nov are the only open nights in 8–14 Nov.
  - **P08:** 6–8 Nov, plus 1-night probes on 6 and 7 Nov. Min stay is 2, so the probes are for information only.
- **Our open nights** come from `prices.csv` 5 Nov, checked against Smoobu `reservations.csv` 5 Nov.
  - **P06** has no PriceLabs prices today (LISTING_NO_DATA), so its nights come from a **live Smoobu GET `/api/rates`** (07:14Z), saved at `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c05/smoobu_rates05.json`.
  - For P05, P08 and P11, Smoobu matches PriceLabs within £2 on every open night to 31 Dec.
- **Price basis:**
  - **Comps:** Airbnb displayed total ÷ nights. Excludes taxes, includes cleaning, after any offer.
  - **P05, P06 and P08:** our own Airbnb listing as it appeared in the same searches (13 stays, written to `channel_checks.csv`). Where our listing did not appear, the price is derived as 0.765 × PL + cleaning ÷ nights. 0.765 was re-confirmed today on P08 6–8 Nov: (£416.74 − £149) ÷ £350 PL = 0.765.
  - **P11** (Booking.com only) and **P14:** PriceLabs room price, which excludes cleaning while the comps include it, so these percentiles are biased low. P11 is also shown at the Booking.com list price (PL × 1.15).
- **Booking.com: NOT CHECKED.** The bot check was not retried or bypassed.
- **Positioning:** `rm/positioning.py` `quality_premium` + `recommend`.
  - Occupancy comes from `reports/2026-11-05/kpi_pack.json`.
  - **P06 30d occupancy:** 0.60 ex-blocks from Smoobu (6 booked of 10 non-blocked nights, 5 Nov–4 Dec), because kpi_pack has none today.
  - Percentile = mean over open multi-night stays: **14d** = check-in up to 19 Nov, **30d** = up to 5 Dec, **60d** = all.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c05s/analyse05.py`. Output: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c05/analysis.json`.

## URGENT: P06 Marylebone Smoobu rate is £2 on 9 Nov (open night)

- **Smoobu GET `/api/rates`, apartment 3288517, 5 Nov 07:14Z:**
  - **8 Nov: £200**, available, min 2. That equals the P06 PriceLabs minimum in the info pack.
  - **9 Nov: £2**, available, min 2.
  - 10 Nov £241 and 11 Nov £255 look normal.
  - On 4 Nov `prices.csv` had 8 Nov at £228 and 9 Nov at £233 (PL = Smoobu).
- **No PriceLabs override explains it.** `get_listing_date_overrides` shows only Reyhan's −5% on 8–14 Nov.
  - `get_user_logs` shows Reyhan added a fixed-type DSO with no price value on **15–22 Nov at 4 Nov 12:52:23Z**, 31 s before P06's last push (12:52:54Z). PriceLabs has returned LISTING_NO_DATA for P06 since then.
  - Whether that push wrote £200 / £2 is NOT CHECKED, but the timing matches.
- **Airbnb still shows the old prices.** Our listing 1671691529957957272 was seen in today's searches:
  - 8–10 Nov: 2 × £240.83
  - 9–11 Nov: 2 × £245.81
  - These equal 0.765 × 4 Nov PL (£228 / £233) + £129 cleaning ÷ 2.
  - So the £2 has not reached Airbnb, or Airbnb did not accept it.
- **Booking.com is the exposure.** P06 has 11 Booking.com reservations in Smoobu, and Booking.com is NOT CHECKED. At the +15% markup the Booking.com rate for 9 Nov could be about £2.30.
- **Action for Corentin now:** check the P06 rate for 8–9 Nov in Smoobu and on the Booking.com extranet, and correct it manually. Do not wait for PriceLabs: P06 is not getting PriceLabs data.

## Summary

| Ref | Comps priced per stay | Our pct, open stays: 14d / 30d / 60d | Rating, ours vs comp median; review gap | Booked vs market (30d) | Supported positioning |
|---|---|---|---|---|---|
| **P05 4BR** | 6 (0–4) | **P0 / P12 / P22** | Airbnb 4.77 (35) vs 4.27 (22.5); +12.5 | 75.9% vs 40% | `quality_premium` **+0.15**: **+15% vs median supported**. `recommend` 30d / 60d: **raise +25%**. Even +25% leaves December 15–26% under the medians. |
| **P06 2BR** | 12 (2–4 on open stays) | **P0 / P0 / –** (only 8–11 Nov open) | 4.64 (11) vs 4.66 (25.5); −14.5 | 60% ex-blocks (Smoobu) vs 47% | qp −0.008: **at the median (−1%) supported**. `recommend` 30d: **raise +10%**. Airbnb shows 14–25% under the median today. |
| **P08 2BR** | 1–2 | **P0 / P0 / P0** | 4.50 (4) vs 4.87 (29); −25 (one new review since 4 Nov: 4.33 (3) → 4.5 (4)) | 75% vs 49% | qp −0.148: **−15% vs median supported** (≈ £347 on 6–8 Nov). `recommend`: **raise +10%** (n = 1). |
| **P11 2BR** | 12 (1–8) | **P5 / P9 / P5** room. At the Booking.com list price: P25 / P19 / P16 | Booking.com 8.0/10 (policy). Not comparable with the Airbnb median 4.67 (35.5) | 44.8% vs 45% (60d 47.5% vs 39%) | qp 0: **at the median (0%) supported**. `recommend` 30d / 60d: **raise +5%**. We are 20–47% under the median at room price and 7–39% under at list price. |
| P14 1BR | 12 (1–7) | P100 | Not seen on Airbnb; comp median 4.87 (19) | 0% vs 43% | Special setup (policy): numbers only. +71% to +138% vs median. |
| P17 1BR | 7 (0–4) | n/a | Comp median 4.54 (51) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (same comp, same stay, 4 Nov → 5 Nov)**
- **Comps were mostly flat:** the like-for-like median change is 0% on most stays.
- **P05 exception:** comp 1606112160333193293 (4.24, parking, terrace) cut deeply:
  - 6–8 Nov £519 → £389
  - 24–26 Nov £570 → £476
  - 27–29 Nov £1,020 → £476
  - **29 Nov–3 Dec £960 → £552 (−43%)**
  - This moves the 29 Nov–3 Dec median from £945 to £741 (n = 4).
- **Comps sold out on our open dates (demand signal):**
  - **P06 8–12 Nov:** 3 of 4 comps that were available yesterday are gone (744585770789956203, 854346637654279747, 917140285217729256).
  - **P11 next 14 days:** 1568808216094734994 (10–12 Nov £206, 10–14 Nov £216) and 1542960049319560709 (10–14 Nov, 18–20 Nov) are no longer available.
- **Ours, 4 Nov → 5 Nov:** no PriceLabs edits on P05, P08, P11 or P14 since 4 Nov 01:28Z (`get_user_logs` 4–5 Nov). P06's only edit is the 15–22 Nov DSO above. Moves are algorithmic:
  - P08 6–8 Nov £185.50 → £175
  - P05 6–8 Nov £469.50 → £486.50 (booked)
  - P05 29 Dec £1,277 → £1,322
  - P11 4 Dec £306 → £287

## P11 Camden (3064196): next 14 days, darts, December (PL room; Booking.com list × 1.15)

| Stay (open) | Ours room | Comp median (n) | Pct / vs median | List × 1.15 |
|---|---|---|---|---|
| 10–12 Nov | £195.00 | £285.50 (7) | P14 / −32% | £224: P29 / −22% |
| 10–14 Nov | £215.75 | £268.00 (4) | P0 / −20% | £248: P25 / −7% |
| 18–20 Nov (2-night gap between bookings) | £166.50 | £312.50 (5) | **P0 / −47%** | £191: P20 / −39% |
| 22–26 Nov | £210.50 | £281.25 (7) | P14 / −25% | £242: P14 / −14% |
| 29 Nov–5 Dec | £231.67 | £400.92 (4) | P0 / −42% | £266: P0 / −34% |
| 8–11 Dec | £248.67 | £416.67 (7) | P0 / −40% | £286: P0 / −31% |
| 11–14 Dec | £291.67 | £448.33 (7) | P0 / −35% | £335: P14 / −25% |
| 12–14 Dec | £276.00 | £477.50 (7) | P0 / −42% | £317: P14 / −34% |
| **13–17 Dec (darts)** | **£214.75** | **£394.00 (8)** | **P12 / −46%** | £247: P12 / −37% |
| 15–19 Dec | £238.25 | £394.25 (6) | P0 / −40% | £274: P17 / −30% |
| 23–26 Dec | £291.67 | £388.84 (4) | P0 / −25% | £335: P25 / −14% |

- **Darts 13–17 Dec:**
  - PL is £227 / £203 / £210 / £219 (`prices.csv` 5 Nov). Every night still carries Reyhan's −5% (`get_listing_date_overrides` 5 Nov, updated 2 Nov 15:05Z).
  - This is **unchanged**, and it is a conflict for Corentin to confirm: policy `darts_override_24oct` says +5%, and the 21 Oct intent was "average above £300".
  - Today's average is £214.75. Only 1090528454481682946 (4.72, 87 reviews, 0.08 km, £198) is cheaper.
- **The −5% on 10 Nov–18 Dec is still on every date.** It is unchanged since 2 Nov, so **not fixed**.
- **Commission:** per channel's finding, 18% on room + cleaning. Not re-raised here.
- **Positioning:**
  - `quality_premium` = 0 (no Airbnb rating).
  - `recommend(0.448, 0.45, 0.09, 0)` → **raise +5%** (30d).
  - `recommend(0.475, 0.39, 0.05, 0)` → **raise +5%** (60d).
  - **Supported:** the comp median (0%). Removing Reyhan's −5% is that +5%.
  - Visibility (policy: CTR 0.81% vs 1.70%) remains the larger lever.
- **Differentiators:** P11 is a basement flat with a patio. Of the 12 comps, 4 have a lift and 3 have a terrace or balcony.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214): December

| Stay (open) | Ours, observed on Airbnb, all-in | Comp median (n) | Pct / vs median | PL room |
|---|---|---|---|---|
| 16–18 Nov | £390.50 | £448.75 (4) | P0 / −13% | £383 |
| 29 Nov–3 Dec | £457.75 | £741.38 (4) | P25 / −38% | £534.50 (−5% override) |
| 7–9 Dec | £518.50 | £790 (4) | P25 / −34% | £467.50 |
| 13–16 Dec | £558.67 | £947.17 (4) | P25 / −41% | £548.33 (−7%) |
| 17–20 Dec | £599.00 | £980 (4) | P25 / −39% | £593.33 (−7% to 19 Dec) |
| 20–22 Dec | £694.00 | £1,020 (3) | P33 / −32% | £662.50 |
| 29–30 Dec (1n, min 1) | £1,384.80 | no comp available | n/a | £1,322 |

- **4–6 Dec** is booked (Smoobu 3–7 Dec). The comp median for it is £1,020 (n = 2).
- **Only one comp is under us on every December stay:** 1363636555926649515 (3.92 rating, 1.23 km). On 29 Nov–3 Dec, 1606112160333193293 (after its 43% cut, £552) is also under us.
- **a-p05-9nov: NOT FIXED (sixth check).**
  - PL 9 Nov is £1,403, min 1.
  - Airbnb 9–10 Nov still shows "1 night x £511.80", "Special offer −£63.36", total £448.44, the same since 31 Oct.
  - On the control date the override flows through: 29 Dec shows £1,384.80.
- **Reyhan's 4 Nov −7% on 13–19 Dec and −5% on 29 Nov–2 Dec are unchanged.** This conflicts with yesterday's a-p05-dec evidence; it is for Corentin to confirm, not a new proposal.
- **Positioning:**
  - `quality_premium(4.77, 4.27)` = +0.15 (cap).
  - `recommend(0.759, 0.40, 0.12, 0.15)` → **raise +25%** (30d). `recommend(0.678, 0.40, 0.22, 0.15)` → **raise +25%** (60d).
  - Caveat: n = 3–4 per stay, and three comps rated under 4.3 inflate qp.
- **Differentiators:**
  - 912053248917940403: Superhost, lift, park view, 4.97.
  - 1639043256346803626: Superhost house with terrace.
  - Three comps list parking.

## P06 Marylebone 2-bed (3288517): 8–14 Nov (intentional blocks excluded)

- **PriceLabs prices: NOT AVAILABLE** (LISTING_NO_DATA). The Smoobu live rates are in the URGENT section above.
- **12–15 Nov is booked** (Airbnb, booked 1 Nov, room £541 = £180.33/night). That leaves **8–11 Nov (4 nights) open**.
- **Our Airbnb prices, observed all-in, vs comps:**
  - 8–10 Nov: **£241**, median £281.75 (n = 4). **P0, −14%.** Comps: 1452940332365117153 £249 (4.07), 744585770789956203 £275 (Superhost), 1018722159796386217 £288, 1273781636585601427 £528.
  - 9–11 Nov: £246, median £299.50 (n = 4). P0, −18%.
  - 10–12 Nov: £254.50, median £307 (n = 4). P0, −17%. Not sellable as a whole: 12 Nov is booked.
  - 8–11 Nov: derived £222, median £297.50 (n = 2). P0, −25%. Our listing did not appear in this search.
  - 8–12 Nov: £215.50 observed, but the stay is not sellable (12 Nov is booked). Only 2 comps are left (£310 / £474), down from 4 yesterday.
- **Positioning:**
  - `quality_premium(4.64, 4.66)` = −0.008.
  - `recommend(0.60, 0.47, 0.0, −0.008)` → **raise +10%**: about £265 all-in on 8–10 Nov, still under the £281.75 median.
  - Reyhan's −5% on 8–14 Nov is unchanged: **not fixed**, and it conflicts with yesterday's +10%.
  - **First fix the £200 / £2 Smoobu rates on 8–9 Nov.**
- **Differentiators:** P06 is on the 2nd floor with no lift. Of the 12 comps, 5 have a lift and 2 are Superhosts.

## P08 Islington 2-bed (3318167): 6–8 Nov, the last sellable nights before handback

- **Smoobu:** 5–7 Nov available (5 Nov tonight, £159). 8–14 Nov is booked (Airbnb, booked 17 Oct).
- **6–8 Nov:**
  - Ours on Airbnb: **£208.37/night all-in** (PL £175 + £175).
  - The only available comp, 28354043 (4.8, 35 reviews, 0.92 km), is £408. **P0, −49%.**
  - 5 of 6 comps return nothing for 6–8 Nov, and none return anything on the 1-night probes.
- **Positioning:**
  - `quality_premium(4.5, 4.87)` = −0.148, so −15% vs the median is supported: about £347/night all-in, about £356/night PL room ((347 − 74.50) ÷ 0.765).
  - `recommend(0.75, 0.49, 0.0, −0.148)` → **raise +10%** (n = 1). Arrival is tomorrow, so +10% (about £193 PL) is the defensible step.
- **Not fixed:** a-handback-lastnights. Reyhan's −5% on 4–21 Nov is unchanged, and PL 6–7 Nov fell further, from £186/£185 to £175/£175.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

- **PL room:** £500 (4–6 Dec: £517.50), min stay 3–4. 0% booked vs 43% market at 30d.
- **Comp medians by stay:**

| Stay | Comp median (n) |
|---|---|
| 6–8 Nov | £210 (4) |
| 10–12 Nov | £250 (4) |
| 24–26 Nov | £289.50 (7) |
| 27–29 Nov | £290 (3) |
| 4–6 Dec | £302.50 (1) |

- That puts us at P100, +71% to +138% vs the median.
- No proposal, per policy.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS

- **Comp medians by stay:**

| Stay | Comp median (n) |
|---|---|
| 6–8 Nov | £204 (1) |
| 10–12 Nov | £279 (1) |
| 24–26 Nov | £233.50 (4) |
| 27–29 Nov | n/a (0) |
| 4–6 Dec | £341 (2) |

- Comp rating median 4.54 (51). Reference set only.

## Comp tables

**Source for every comp row:** Airbnb public search, checked 2026-11-05.
- Nightly price excludes taxes and includes cleaning.
- (±%) is the change vs 4 Nov for the same stay.
- "n/a" means the listing was not returned by the date-filtered search (booked, or a minimum-stay clash).

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 9 Nov–Tue 10 Nov (1n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Wed 16 Dec (3n) | Thu 17 Dec–Sun 20 Dec (3n) | Sun 20 Dec–Tue 22 Dec (2n) | Tue 29 Dec–Wed 30 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.17 (12) | n/a | £509 | £509 | £920 | £1020 | n/a | £509 | £960 | £1020 | £980 | £980 | £1020 | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | £389 (-25%) | £519 | £476 (-16%) | £476 (-53%) | £1020 | n/a | £498 (-4%) | £552 (-43%) | £1020 | £980 | £980 | £1070 | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (29) | £896 | n/a | n/a | n/a | n/a | n/a | n/a | £931 | n/a | £914 | £1079 | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.29 (45) | n/a | n/a | £331 | n/a | n/a | £320 | n/a | n/a | £324 (-2%) | n/a | n/a | n/a | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.92 (13) | n/a | £400 | £475 (-2%) | n/a | n/a | n/a | £400 | £416 (-1%) | n/a | £454 (-1%) | £514 (+1%) | £604 (+3%) | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (28) | n/a | £400 | n/a | n/a | n/a | n/a | £400 | n/a | £560 | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.27 (22.5) | £642 (2) | £454 (4) | £476 (4) | £698 (2) | £1020 (2) | £320 (1) | £449 (4) | £741 (4) | £790 (4) | £947 (4) | £980 (4) | £1020 (3) | n/a (0) | |
| **Ours, PL room/night (status, min stay)** | | | | £486 Booked (Smoobu), min 2 | £436 Booked (Smoobu), min 3 | £584 Booked (Smoobu), min 3 | £616 Booked (Smoobu), min 4 | £600 Booked (Smoobu), min 4 | £1403 Open, min 1 | £383 Open, min 2 | £534 Open, min 3 | £468 Open, min 2 | £548 Open, min 3 | £593 Open, min 3 | £662 Open, min 2 | £1322 Open, min 1 | |
| **Ours, comparable basis** | | | | £470 | £431 | £544 | £568 | £638 | £449 obs | £390 obs | £458 obs | £518 obs | £559 obs | £599 obs | £694 obs | £1385 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P50 / -27% | P50 / -5% | P100 / +14% | P50 / -18% | P0 / -38% | P100 / +40% | P0 / -13% | P25 / -38% | P25 / -34% | P25 / -41% | P25 / -39% | P33 / -32% | n/a | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Sun 8 Nov–Tue 10 Nov (2n) | Sun 8 Nov–Wed 11 Nov (3n) | Sun 8 Nov–Thu 12 Nov (4n) | Mon 9 Nov–Wed 11 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.91 (11) | n/a (was £288) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.68 (22) | n/a | £275 | £296 | n/a | n/a | £275 | £275 | n/a (was £275) | £275 | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | £308 | £348 | n/a | n/a | n/a | n/a (was £292) | n/a (was £284) | £308 | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | £306 (-11%) | £392 (-9%) | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.38 (24) | £340 | n/a | £397 | n/a | n/a | n/a | £320 | £310 | £340 | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (53) | £576 (-2%) | £528 | £894 (-1%) | £1102 (-1%) | £1339 | £528 | n/a (was £492) | £474 | n/a | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | n/a | n/a (was £385) | n/a (was £376) | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.55 (22) | n/a | n/a | £429 (-4%) | £481 (-2%) | £492 (-2%) | n/a | n/a | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | £623 | £785 (+5%) | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | £249 | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.87 (87) | n/a | n/a | £519 (-2%) | £599 (-1%) | n/a | £288 | n/a | n/a | £292 | parking listed |
| **Comp median (n)** | | | 4.66 (25.5) | £458 (2) | £307 (4) | £397 (7) | £611 (4) | £785 (3) | £282 (4) | £298 (2) | £392 (2) | £300 (4) | |
| **Ours, Smoobu rate/night today (PriceLabs NOT AVAILABLE) (status, min stay)** | | | | £292 Booked (Smoobu), min 2 | £248 Open, min 2 | £406 Unavailable, min 3 | £470 Unavailable, min 4 | £499 Unavailable, min 4 | £101 Open, min 2 | £148 Open, min 2 | £174 Open, min 2 | £122 Open, min 2 | |
| **Ours, comparable basis** | | | | £288 | £254 obs | £375 | £424 | £446 | £241 obs | £222 | £216 obs | £246 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P0 / -37% | P0 / -17% | excluded | excluded | excluded | P0 / -14% | P0 / -25% | P0 / -45% | P0 / -18% | |

### P08

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Fri 6 Nov–Sat 7 Nov (1n) | Sat 7 Nov–Sun 8 Nov (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | £408 | £408 | £408 | £408 | £408 | n/a | n/a | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | n/a | £165 | £182 | n/a | n/a | n/a | n/a | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (66) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) | 1.22 | 4 | 4.6 (77) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1497137911142581794](https://www.airbnb.co.uk/rooms/1497137911142581794) | 0.8 | 4 | 4.91 (23) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, house (2-bedroom cottage) |
| **Comp median (n)** | | | 4.87 (29.0) | £408 (1) | £286 (2) | £295 (2) | £408 (1) | £408 (1) | n/a (0) | n/a (0) | |
| **Ours, PL room/night (status, min stay)** | | | | £175 Open, min 2 | £170 Booked (Smoobu), min 2 | £254 Blocked, min 3 | £318 Blocked, min 3 | £308 Blocked, min 3 | £175 Open, min 2 | £175 Open, min 2 | |
| **Ours, comparable basis** | | | | £208 obs | £205 | £269 | £318 | £310 | £283 | £283 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P0 / -49% | P50 / -28% | excluded | excluded | excluded | n/a | n/a | |

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Tue 10 Nov–Sat 14 Nov (4n) | Wed 18 Nov–Fri 20 Nov (2n) | Sun 22 Nov–Thu 26 Nov (4n) | Sun 29 Nov–Sat 5 Dec (6n) | Tue 8 Dec–Fri 11 Dec (3n) | Fri 11 Dec–Mon 14 Dec (3n) | Sat 12 Dec–Mon 14 Dec (2n) | Sun 13 Dec–Thu 17 Dec (4n) | Tue 15 Dec–Sat 19 Dec (4n) | Wed 23 Dec–Sat 26 Dec (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.7 (30) | n/a | £320 | £440 | £440 | £440 | £283 | £320 | £404 | £392 | £447 | £529 | £545 | £429 | n/a (was £456) | n/a | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a | £276 (-1%) | n/a | n/a | n/a | n/a | £248 | n/a | £359 | n/a (was £359) | £374 | £351 | £382 | £440 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | £294 | n/a (was £294) | £462 | £544 | £258 | n/a (was £294) | £258 | £410 | £444 | £494 | £510 | £394 | £420 | n/a | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a (was £288) | £268 | £338 | n/a | n/a | n/a | n/a | £306 | £362 | £417 | £417 | £438 | £406 | £406 | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.5 (12) | n/a | £306 | £306 | £615 | £544 | n/a (was £270) | n/a (was £306) | n/a | £410 | £444 | £494 | £510 | £394 | n/a | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | £322 (-2%) | £286 | £358 | n/a | £478 | £278 | £328 | £306 | n/a | £373 | £448 | £478 | £456 | £470 | n/a (was £501) | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a | £212 | £312 | n/a | n/a | £231 | £312 | £281 | n/a | £292 | £292 | £312 | £281 | £281 | £292 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.5 (60) | n/a | £191 | £191 | n/a | n/a | n/a | £191 | £185 | n/a | n/a | n/a | n/a | n/a (was £235) | £270 | n/a (was £307) | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (87) | n/a | n/a | £190 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £197 (-1%) | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.68 (73) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.54 (37) | n/a (was £272) | n/a (was £206) | n/a | n/a | n/a | n/a (was £216) | £256 (-9%) | n/a | n/a | n/a | £352 | n/a | n/a | n/a | £361 | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (35.5) | £322 (1) | £286 (7) | £310 (8) | £462 (3) | £511 (4) | £268 (4) | £312 (5) | £281 (7) | £401 (4) | £417 (7) | £448 (7) | £478 (7) | £394 (8) | £394 (6) | £389 (4) | |
| **Ours, PL room/night (status, min stay)** | | | | £239 Booked (Smoobu), min 2 | £195 Open, min 2 | £213 Open, min 2 | £293 Booked (Smoobu), min 2 | £292 Booked (Smoobu)/Open, min 2 | £216 Open, min 2 | £166 Open, min 2 | £210 Open, min 2 | £232 Open, min 2 | £249 Open, min 2 | £292 Open, min 2 | £276 Open, min 2 | £215 Open, min 2 | £238 Open, min 2 | £292 Open, min 2/3 | |
| **Ours, comparable basis** | | | | £239 | £195 | £213 | £293 | £292 | £216 | £166 | £210 | £232 | £249 | £292 | £276 | £215 | £238 | £292 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = PL x 1.15 (before promotions)** | | | | £275 P0 / -14% | £224 P29 / -22% | £245 P25 / -21% | £337 P0 / -27% | £335 P0 / -34% | £248 P25 / -7% | £191 P20 / -39% | £242 P14 / -14% | £266 P0 / -34% | £286 P0 / -31% | £335 P14 / -25% | £317 P14 / -34% | £247 P12 / -37% | £274 P17 / -30% | £335 P25 / -14% | Smoobu Booking.com markup +15% (policy) |
| **Our percentile / vs median** | | | | P0 / -26% | P14 / -32% | P25 / -31% | P0 / -36% | P0 / -43% | P0 / -20% | P0 / -47% | P14 / -25% | P0 / -42% | P0 / -40% | P0 / -35% | P0 / -42% | P12 / -46% | P0 / -40% | P0 / -25% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | £188 (-7%) | n/a | £202 | n/a | £302 | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | £218 (-22%) | n/a (was £228) | £352 | £428 | n/a | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | £236 | £236 | n/a | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | £192 | £302 | n/a | n/a | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | £202 | n/a (was £192) | £278 | n/a | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | n/a | n/a | £290 | £290 | n/a | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | £322 | £402 | n/a | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (19) | n/a | n/a | n/a | £290 (+2%) | n/a | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (16) | n/a | n/a | £200 | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | £264 | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.82 (11) | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.87 (19.0) | £210 (4) | £250 (4) | £290 (7) | £290 (3) | £302 (1) | |
| **Ours, PL room/night (status, min stay)** | | | | £500 Open, min 4 | £500 Open, min 3 | £500 Open, min 3 | £500 Open, min 4 | £518 Open, min 4 | |
| **Ours, comparable basis** | | | | £500 | £500 | £500 | £500 | £518 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +138% | P100 / +100% | P100 / +73% | P100 / +72% | P100 / +71% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | £204 | n/a (was £174) | £192 | n/a | n/a | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (51) | n/a | £279 (-2%) | £314 (-2%) | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | n/a | n/a | £344 (+7%) | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | n/a | £264 | n/a | £338 | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.67 (60) | n/a | n/a | £203 (-1%) | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | n/a | n/a | n/a | parking listed |
| [774061637963678253](https://www.airbnb.co.uk/rooms/774061637963678253) | 0.54 | 3 | 4.5 (34) | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed |
| **Comp median (n)** | | | 4.54 (51) | £204 (1) | £279 (1) | £234 (4) | n/a (0) | £341 (2) | |
| **Ours, PL room/night (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | excluded | |
## Rows written

- **`data/snapshots/2026-11-05/comps.csv`:** **503 comp-central rows** (55 comp ids × their stays; a blank price means not available).
  - Appended under `.comps.csv.lock`. The file already existed (another agent copied it forward), so nothing was copied by this run.
  - The header was checked against `rm/snapshot.py`, and a duplicate guard was applied.
- **`data/snapshots/2026-11-05/channel_checks.csv`:** **13 rows** of our observed Airbnb prices (P05 × 8, P06 × 4, P08 × 1). Appended under `.channel_checks.csv.lock`.
- `rm.snapshot.load('2026-11-05')` reads 4,874 comps and 481 channel checks (all agents, at the time of writing).

Data gaps:
- **P06:** PriceLabs prices NOT AVAILABLE (LISTING_NO_DATA).
  - The Smoobu rates of £200 (8 Nov) and £2 (9 Nov) have no known cause.
  - **Booking.com exposure on 9 Nov is NOT CHECKED.**
- **Booking.com: NOT CHECKED** for all properties (bot check; not retried or bypassed). For P11 this leaves the displayed price after promotions and the cleaning fee unknown, and the P11 percentiles are biased low.
- **P08 absent comps:** the four comps absent for 4 days have not had their calendars checked. Fetching the listing page was refused by the permission policy.
- **Absent comps (13 in total):** 60-day availability not verified.
- **P05 9 Nov:** the source of Airbnb's stale £511.80 and the "Special offer" is NOT CHECKED.
- **P05:** January–February comps not priced.
- **Thin evidence:**
  - P08: n = 1
  - P05: n = 3–4 per stay; 0 on 29 Dec
  - P06: n = 2 on 8–11 Nov
  - P11 10–14 Nov and 29 Nov–5 Dec: n = 4; 23–26 Dec: n = 4
- **P14:** not seen on Airbnb, so its rating and reviews are NOT CHECKED.
- **P17:** not in PriceLabs or Smoobu.
