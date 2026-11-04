# Competitor positioning: CENTRAL/NORTH (D = 2026-11-04)

**Method**
- **Comp ids:** the same 55 comp ids as 1–3 Nov (from `data/snapshots/2026-11-03/comps.csv`, comp-central rows). **No replacements.** 13 comps did not appear on any of today's stays. All 13 listing pages returned HTTP 200 on 4 Nov, with review counts unchanged, so all are kept as active. Their availability in the next 60 days is NOT CHECKED (calendars not read).
  - P06: 1420126228540342938 (new to this list today; it was priced 24–26 Nov yesterday), 1259401393497276633, 1452940332365117153
  - P08: 693487869095756237, 1289147258305624118, 1409413462916896898, 1497137911142581794. This is the 3rd day running with nothing returned for these four. If they are still absent tomorrow, check their calendars before replacing them.
  - P11: 654396087724294901, 1515051936255130803
  - P14: 1075245497252121738, 1595613237427991150
  - P17: 975294297333089697, 774061637963678253
- **Searches:** 72 public Airbnb search queries (airbnb.co.uk, all result pages, no challenge). They use the same map boxes and filters as 25 Oct–3 Nov: entire home, minimum bedrooms = ours, adults = our sleeps − 1.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c04s/search.py`
  - Raw results: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c04/search/*.json`
- **Standard stays, priced the same way for every comp and for us:**
  - Fri 6–Sun 8 Nov (next Friday–Sunday)
  - Tue 10–Thu 12 Nov (midweek)
  - Tue 24–Thu 26 Nov and Fri 27–Sun 29 Nov (kept from yesterday for the day-on-day comparison)
  - **Fri 4–Sun 6 Dec (new: 30 days out; no day-on-day figure)**
  - Extra stays per property cover our open dates and the dates you asked about:
    - P11: 26–29 Nov booking, 12–14 Dec reopened, darts 13–17 Dec
    - P05: December
    - P06: 8–12 Nov
    - P08: 5–8 Nov
- **Our open nights** come from `prices.csv` 4 Nov, checked against Smoobu `reservations.csv` 4 Nov; Smoobu wins where they disagree.
  - **P11:** 10–13 Nov, 18–19 Nov, 22–25 Nov, 29 Nov–4 Dec, 8–18 Dec (12–13 Dec reopened: PL £321 / £229, available), 23–25 Dec
  - **P05:** 9 Nov (min 1), 16–17 Nov, 29 Nov–2 Dec, 7–8 Dec, 13–21 Dec, 29 Dec (min 1)
  - **P06:** 8–11 Nov
  - **P08:** 5–7 Nov (the last sellable nights before the 13 Nov handback; 8–13 Nov is booked)
- **Price basis:**
  - **Comps:** Airbnb displayed total ÷ nights. Excludes taxes, **includes cleaning**, after any offer.
  - **P05, P06 and P08:** our own Airbnb listing as it appeared in the same searches (13 stays, written to `channel_checks.csv`). Where we did not appear, our price is derived as 0.765 × PL + cleaning ÷ nights. 0.765 was re-confirmed today on P08 5–8 Nov: (£561.33 − £149) ÷ £539 PL = 0.765.
  - **P11** (Booking.com only) and **P14:** PriceLabs room price. P11 is also shown at the Booking.com list price (PL × 1.15). Both exclude cleaning while the comps include it, so these percentiles are biased low.
- **Booking.com: NOT CHECKED.** The 28 Oct bot check was not retried or bypassed.
- **Positioning:** `rm/positioning.py` `quality_premium` + `recommend`.
  - Occupancy comes from `reports/2026-11-04/kpi_pack.json`. P06 uses `forward_occ_30_ex_blocks` (0.60).
  - Percentile = mean over open multi-night stays, by check-in window: **14d** = check-in up to 18 Nov; **30d** = up to 4 Dec; **60d** = all.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c04s/analyse04.py`. Output: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c04/analysis.json`.

## Summary

| Ref | Comps priced per stay | Our pct, open stays: 14d / 30d / 60d | Rating, ours vs comp median; review gap | Booked vs market (kpi_pack) | Supported positioning |
|---|---|---|---|---|---|
| **P05 4BR** | 6 (0–4) | **P0 / P12 / P22** | Airbnb 4.77 (35) vs 4.27 (22.5); +12.5 reviews | 30d 75.9% vs 40%; 60d 67.8% vs 39% | `quality_premium` **+0.15**: **+15% over the median is supported**. `recommend` 30d and 60d: **raise +25%**. Booked 29–36 pts ahead of the market, with more stars and more reviews, yet 33–51% under every December median. |
| **P06 2BR** | 12 (2–6) | **P0 / P0 / –** (only 8–12 Nov is open) | 4.60 (10) vs 4.66 (25); −15 reviews | 30d ex-blocks 60% vs 47% | qp −0.024: **−2% vs the median is supported**. `recommend` 30d: **raise +10%**. 8–12 Nov is 35% under the median after Reyhan's new −5%. |
| **P08 2BR** | 6 (0–2) | **P0 / P0 / P0** | 4.33 (3) vs 4.87 (29); −26 reviews | 30d 66.7% vs 48% | qp −0.15: **−15% vs the median is supported**. `recommend`: **raise +10%** (thin, n = 1). We are 52% under the only available comp. |
| **P11 2BR** | 12 (3–9) | **P11 / P12 / P9** room. At the Booking.com list price: P0–P50 | Booking.com 8.0/10 (policy). Not comparable with the Airbnb median 4.67 (35.5) | 30d 48.3% vs 45%; 60d 49.2% vs 40% | qp 0: **at the median (0%) is supported**. `recommend` 30d and 60d: **raise +5%**. In line with or ahead of the market while priced at the bottom of the set. |
| P14 1BR | 12 (1–6) | P100 | Not seen on Airbnb; comp median 4.87 (19) | 0% vs 42% (30d) | Special setup (policy): numbers only. +73% to +128% vs the median. |
| P17 1BR | 7 (0–4) | n/a | Comp median 4.54 (51) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (same comp, same stay, 3 Nov → 4 Nov)**
- **Comps were flat.** The like-for-like median change is 0.0% on every stay except:
  - P06 6–8 Nov: −15% (n = 1; 1700204078606711134 £339 → £288)
  - P06 8–11 Nov: +4% (917140285217729256 £355 → £385)
  - P08 24–26 Nov: −5%
  - Single-comp moves: P11 1159915905276842600 10–12 Nov £338 → £268 (−21%); P06 1273781636585601427 8–12 Nov £534 → £474.
- **Ours moved. Each change is explained below with its source.**
  - **Reyhan, 4 Nov 01:25–01:28Z** (`get_user_logs`):
    - P08 **−5% on 4–21 Nov** (min 2). P08 5–7 Nov PL: £198 average → £179.67 (−9% including the algorithm's own move).
    - P06 **−5% on 8–14 Nov** (min 2). 8–12 Nov PL: £246.75 → £239.00. Observed £221 → £215 all-in.
    - P05 **13–19 Dec deepened from −5% to −7%** (min 3). 13–16 Dec PL: £567 → £549. 17–20 Dec: £619 → £588.
    - P05 **−5% on 1–28 Feb 2027** (min 4).
    - P11 **23 Dec +5% (min 3) and 24–25 Dec +7%.** PL on 23–25 Dec fell £314/£310/£321 → £298/£290/£302. The overrides these replaced are not shown in the log, so the previous values are NOT CHECKED. The net effect was a **cut** of 5–6%.
  - **P11 22–25 Nov rose 12–13% overnight** (£185–188 → £208–212) with no log entry. This is algorithmic; most likely it is the 26–29 Nov booking moving the neighbouring-night or occupancy factors (cause NOT CHECKED).
  - **Not fixed:** P11 −5% on 10 Nov–18 Dec is still on every date, including the darts nights (`get_listing_date_overrides` 4 Nov).

## P11 Camden: new Booking.com booking 26–29 Nov vs comps (same stay)

**What we sold**
- Booked 3 Nov (Smoobu `reservations.csv` 4 Nov). Room **£680.40 = £226.80/night**, cleaning excluded. The Booking.com cleaning fee is NOT CHECKED (blank `cleaning_gbp`).
- **Against the PriceLabs price:**
  - **0.932×** the PL price on 3 Nov: £730 (£208 + £253 + £269, `data/snapshots/2026-11-03/prices.csv`).
  - **0.810×** the Booking.com list price (£730 × 1.15 = £839.50).
  - 0.81 = Mobile 10% × Genius L1 10%. This is the same stack as the 20–22 Nov booking. Policy says stacked promotions explain it, so it is not flagged.
- **Commission:** £149.29 = **21.9% of the room**. That is above the 18% Visibility Booster rate. Per policy, ask before assuming: it may be calculated on room + cleaning, or include VAT (NOT CHECKED).

**Comps for 26–29 Nov, Airbnb, checked 4 Nov, all-in.** Only 3 of 12 comps are available.

| Comp | Dist | Rating (reviews) | Features | £/night |
|---|---|---|---|---|
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 km | 4.5 (12) | lift | £381.67 |
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.40 km | 4.7 (30) | lift, terrace | £416.33 |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 km | 4.45 (11) | | £488.00 |

Median **£416.33**.

**Where we landed**
- The sale is **P0, −46% vs the median**, and 41% under the cheapest available comp.
- Even at the Booking.com list price (£280/night) we are −33% vs the median.
- **Conclusion:** this is the second booking in two days to land at roughly half the comp median on a weekend. Fri 27 and Sat 28 Nov are the dearest nights in the set. That fits under-pricing, not a demand problem.
- Since the booking, PL shows the booked nights at £232 / £283 / £302. These are not sellable any more.

**18 Oct base-rise tracker (P11 only, this batch):** **+3 nights / +£680.40 room / +£531.11 after commission** since yesterday.
- The 12–14 Dec booking (£486.68) was made and cancelled on 3 Nov, so it adds 0.
- No other new central bookings on 3 Nov (P05 and P06 have none with `booked_on` 2026-11-03).

## P11 12–14 Dec: cancelled booking, dates reopened

- **Smoobu:** status `cancelled`. It was booked 3 Nov at £486.68 room = £243.34/night, which is 0.883× the PL price of £551.
- **PriceLabs `prices.csv` 4 Nov:** 12 Dec £321 and 13 Dec £229, both `available = True`, min 2. **Reopened: yes.**
- **Comps for 12–14 Dec (Sat–Mon):** median **£493.75** (n = 6, range £374.50–£545). Our PL room averages £275/night: **P0, −44%**. At the Booking.com list price (£316) we are −36%.

## P11 darts nights 13–17 Dec (policy conflict, unchanged from 3 Nov)

- **PL now:** £229 / £203 / £207 / £218, average **£214.25**. All four nights carry Reyhan's −5% (`get_listing_date_overrides` 4 Nov).
- **Comps 13–17 Dec:** median **£394** (n = 8, range £198.50–£456.25).
  - At room price: **P12, −46%**. Only 1090528454481682946 (4.72, 87 reviews, 0.08 km) is cheaper.
  - At the Booking.com list price (£246): P25, −37%.
- **Conflict for Corentin to confirm (not a new proposal):**
  - Policy `darts_override_24oct` says to keep the +5% override.
  - Policy `price_changes` 21 Oct sets the intent as "average above £300/night".
  - These nights have carried −5% since 2 Nov 15:05Z. Today's average is £214, 29% below the stated intent.

## P11 positioning: next 14 days and December (PL room; Booking.com list in brackets)

| Stay | Ours | Comp median (n) | Pct / vs median | List × 1.15 |
|---|---|---|---|---|
| 10–12 Nov | £194.50 | £267.50 (7) | P14 / −27% | £224: P43 / −16% |
| 10–14 Nov | £216.25 | £258.25 (5) | P20 / −16% | £249: P40 / −4% |
| 18–20 Nov (2-night gap) | £166.50 | £306.50 (7) | **P0 / −46%** | £191: P14 / −38% |
| 22–26 Nov | £210.25 | £293.75 (6) | P17 / −28% | £242: P17 / −18% |
| 29 Nov–5 Dec | £230.00 | £400.92 (4) | P0 / −43% | £265: P0 / −34% |
| 8–11 Dec | £245.33 | £416.67 (7) | P0 / −41% | £282: P0 / −32% |
| 11–14 Dec | £289.33 | £494.00 (5) | P0 / −41% | £333: P0 / −33% |
| 15–19 Dec | £236.00 | £413.38 (6) | P0 / −43% | £271: P17 / −34% |
| 23–26 Dec | £296.67 | £373.50 (4) | P25 / −21% | £341: P50 / −9% |

- **Positioning:** `quality_premium` = 0, because 8.0/10 is on Booking.com's scale and no Airbnb rating exists.
  - `recommend(0.483, 0.45, 0.12, 0)` → **raise +5%** (30d).
  - `recommend(0.492, 0.40, 0.09, 0)` → **raise +5%** (60d).
- **Supported:** pricing at the comp median (0%) is supported, and today we are 16–46% under it.
  - Removing Reyhan's −5% on 10 Nov–18 Dec is the +5% `recommend` asks for. This is a conflict with Reyhan's 2 Nov edit, for Corentin to decide.
  - Visibility (policy: CTR 0.81% vs market 1.70%) remains the bigger lever.
- **Differentiators:** P11 is a basement flat with a patio. 4 of the 12 comps have a lift and 3 have a terrace or balcony.

## Conflicts with standing decisions / yesterday's plan (for Corentin to confirm, not new proposals)

- **P08 a-handback-lastnights:** yesterday's plan proposed **+10%** on P08 5–7 Nov. Reyhan instead set **−5% on 4–21 Nov** (4 Nov 01:28Z).
  - 5–7 Nov PL is now £168 / £186 / £185. Observed on Airbnb: £187.11/night all-in.
  - The only available comp is £386.33. **Not fixed; it moved the opposite way.**
- **P06 8–12 Nov:** yesterday `recommend` gave +10%. Reyhan set **−5% on 8–14 Nov**. We are now P0, −35% vs the median.
- **P05 a-p05-dec:** yesterday's evidence showed December 32–49% under the medians. Reyhan **deepened 13–19 Dec to −7%**. The −5% on 29 Nov–2 Dec still stands. Today December is 33–51% under the medians.
- **P11 −5% on 10 Nov–18 Dec, including the darts nights:** unchanged (see above).
- **P11 23–25 Dec:** the new +5% / +7% overrides left PL 5–6% lower than yesterday. 23–26 Dec is still P25, −21%.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214): December

| Stay (open) | Ours, observed on Airbnb, all-in | Comp median (n) | Pct / vs median | PL room |
|---|---|---|---|---|
| 16–18 Nov | £389 | £454.50 (4) | P0 / −14% | £380.50 |
| 29 Nov–3 Dec | £459 | £945.38 (4) | P25 / **−51%** | £536.25 (−5% override) |
| 7–9 Dec | £517.50 | £790 (4) | P25 / −35% | £466.50 (+3% override) |
| 13–16 Dec | £559.33 | £947.17 (4) | P25 / −41% | £549 (**−7% since 4 Nov**) |
| 17–20 Dec | £594.33 | £980 (4) | P25 / −39% | £588 (−7% on 17–19 Dec) |
| 20–22 Dec | £688 | £1,020 (3) | P33 / −33% | £656 |
| 29–30 Dec (1n) | £1,345 | no comp available | n/a | £1,277 (+100%, min 1) |

- **4–6 Dec** is booked (Smoobu 3–7 Dec). The comp median for it is £1,020 (n = 2).
- The only comp under us on every December stay is 1363636555926649515 (3.83 rating, 1.23 km).
- **a-p05-9nov: NOT FIXED (fifth consecutive check).**
  - PL 9 Nov is £1,411 (+300%, min 1).
  - Airbnb 9–10 Nov, 7 adults, checked 4 Nov, still shows "1 night x £511.80", "Special offer −£63.36", total £448.44. Identical since 31 Oct.
  - On the control date, 29 Dec displays £1,344.30 (≈ 0.90 × £1,277 + £195), so the override flows through there.
- **Positioning:**
  - `quality_premium(4.77, 4.27)` = **+0.15** (cap).
  - `recommend(0.759, 0.40, 0.12, 0.15)` → **raise +25%** (30d).
  - `recommend(0.678, 0.39, 0.22, 0.15)` → **raise +25%** (60d).
  - Even +25% leaves every December stay 16–39% under the medians.
  - **Caveat:** n = 3–4 per stay, and three comps rated under 4.3 inflate qp.
- **Differentiators:**
  - 912053248917940403: Superhost, lift, park view, 4.96.
  - 1639043256346803626: Superhost house with terrace, 4.89.
  - 1610095240357069208 and 1606112160333193293: parking.

## P06 Marylebone 2-bed (3288517): 8–12 Nov only (intentional blocks excluded)

- **Our prices, observed on Airbnb, all-in:**
  - 8–12 Nov: **£215.09/night**, against a median of £329.75 (n = 4: £275 / £283.75 / £375.75 / £473.75). **P0, −35%.**
  - 8–11 Nov: £222.01, against £338.50 (n = 4). P0, −34%.
  - 10–12 Nov: £253.84, against £346 (n = 3). P0, −27%.
- The cheapest available comp, 744585770789956203 (Superhost, 4.68, 22 reviews), is £275. That is 28% above us.
- **Positioning:**
  - `quality_premium(4.60, 4.66)` = −0.024.
  - `recommend(0.60, 0.47, 0.0, −0.024)` → **raise +10%** (≈ £237 all-in, still 28% under the median).
  - The 60d result (`fix-listing`) is not used, because `forward_occ_60` counts the intentional blocks.
- **Differentiators:** P06 is on the 2nd floor with no lift. 5 of the 12 comps have a lift and 2 are Superhosts.

## P08 Islington 2-bed (3318167): 5–7 Nov, the last sellable nights (handback 13 Nov)

- **5–8 Nov:** £187.11/night observed all-in (Airbnb breakdown "3 nights x £187.11"). Comp 28354043 (4.8, 35 reviews, 0.92 km): £386.33. **P0, −52%.**
- **6–8 Nov:** £216.41 vs £408 (same comp). P0, −47%.
- **Availability:** 5 of 6 comps return nothing for 5–8 Nov.
- **Positioning:**
  - `quality_premium(4.33, 4.87)` = −0.15.
  - `recommend(0.667, 0.48, 0.0, −0.15)` → **raise +10%** (n = 1).
  - The supported floor is −15% vs the median (≈ £328), but with arrival tomorrow and n = 1, +10% is the defensible move.
  - Reyhan's −5% runs the other way (see conflicts).
- **Differentiator:** ground-floor private terrace.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

- **PL room:** £500 (4–6 Dec: £547), min stay 3–4.
- **Comp medians:** £219.50 / £232 / £289.50 / £289.50 / £302.50, n = 4 / 6 / 5 / 3 / 1. That puts us at P100, +73% to +128%.
- **Occupancy:** 0% vs 42% at 30d. Comp rating median 4.87 (19).
- No proposal, per policy.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS

- **Comp medians:** £204 / £229.50 / £234.50 / n/a / £330.25 (n = 1 / 2 / 4 / 0 / 2).
- Comp rating median 4.54 (51). Reference set only.

## Comp tables

**Source for every comp row:** Airbnb public search, checked 2026-11-04.
- Nightly price excludes taxes and includes cleaning.
- (±%) is the change vs 3 Nov for the same stay and checkout.
- "n/a" means the listing was not returned by the date-filtered search (booked, or a minimum-stay clash).

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 9 Nov–Tue 10 Nov (1n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Wed 16 Dec (3n) | Thu 17 Dec–Sun 20 Dec (3n) | Sun 20 Dec–Tue 22 Dec (2n) | Tue 29 Dec–Wed 30 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.17 (12) | n/a | £509 | £509 | £920 | £1020 | n/a | £509 | £960 | £1020 | £980 | £980 | £1020 | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | £519 | £519 | £570 | £1020 | £1020 | n/a | £519 | £960 | £1020 | £980 | £980 | £1070 | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (29) | £896 | n/a | n/a | n/a | n/a | n/a | n/a | £931 | n/a | £914 | £1079 | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.29 (45) | n/a | n/a | £332 (-1%) | n/a | n/a | £320 | n/a | n/a | £330 (+1%) | n/a | n/a | n/a | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.92 (13) | n/a | £400 | £483 (+2%) | n/a | n/a | n/a | £400 | £421 (+1%) | n/a | £459 (+2%) | £507 (+1%) | £590 (-1%) | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (28) | n/a | £400 | n/a | n/a | n/a | n/a | £400 | n/a | £560 | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.27 (22.5) | £708 (2) | £454 (4) | £496 (4) | £970 (2) | £1020 (2) | £320 (1) | £454 (4) | £945 (4) | £790 (4) | £947 (4) | £980 (4) | £1020 (3) | n/a (0) | |
| **Ours, PL room/night (status, min stay)** | | | | £470 Booked (Smoobu), min 2 | £444 Booked (Smoobu), min 3 | £593 Booked (Smoobu), min 3 | £614 Booked (Smoobu), min 4 | £584 Booked (Smoobu), min 4 | £1411 Open, min 1 | £380 Open, min 2 | £536 Open, min 3 | £466 Open, min 2 | £549 Open, min 3 | £588 Open, min 3 | £656 Open, min 2 | £1277 Open, min 1 | |
| **Ours, comparable basis** | | | | £457 | £437 | £551 | £568 | £623 | £449 obs | £389 obs | £459 obs | £518 obs | £559 obs | £594 obs | £688 obs | £1345 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P0 / -36% | P50 / -4% | P75 / +11% | P0 / -42% | P0 / -39% | P100 / +40% | P0 / -14% | P25 / -51% | P25 / -34% | P25 / -41% | P25 / -39% | P33 / -32% | n/a | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Sun 8 Nov–Wed 11 Nov (3n) | Sun 8 Nov–Thu 12 Nov (4n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.91 (11) | £288 (-15%) | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.68 (22) | n/a | £275 | £296 | n/a | n/a | £275 | £275 | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | n/a (was £308) | £348 | n/a | n/a | £292 | £284 | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | £346 | £432 | n/a | n/a | n/a | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.38 (24) | n/a | n/a | n/a (was £506) | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (53) | £588 | £528 | £902 | £1112 (+1%) | n/a | £492 | £474 (-11%) | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | £385 (+8%) | £376 (+9%) | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.55 (22) | n/a | n/a | £445 (+3%) | £489 | £502 | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | £622 (-3%) | £747 | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.12 (26) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.87 (87) | n/a | n/a | £532 (-4%) | £602 | n/a | n/a (was £314) | n/a | parking listed |
| **Comp median (n)** | | | 4.66 (25.0) | £438 (2) | £346 (3) | £438 (6) | £612 (4) | £624 (2) | £338 (4) | £330 (4) | |
| **Ours, PL room/night (status, min stay)** | | | | £292 Booked (Smoobu), min 2 | £248 Open, min 2 | £406 Blocked, min 3 | £470 Blocked, min 4 | £499 Blocked, min 4 | £234 Open, min 2 | £239 Open, min 2 | |
| **Ours, comparable basis** | | | | £288 | £254 obs | £375 | £424 | £446 | £222 obs | £215 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P50 / -34% | P0 / -27% | excluded | excluded | excluded | P0 / -34% | P0 / -35% | |

### P08

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Thu 5 Nov–Sun 8 Nov (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | £408 | £408 | £408 | £408 | £408 | £386 | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | n/a | £165 | £182 (-9%) | n/a (was £201) | n/a | n/a | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (66) | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) | 1.22 | 4 | 4.6 (77) | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1497137911142581794](https://www.airbnb.co.uk/rooms/1497137911142581794) | 0.8 | 4 | 4.91 (23) | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, house (2-bedroom cottage) |
| **Comp median (n)** | | | 4.87 (29.0) | £408 (1) | £286 (2) | £295 (2) | £408 (1) | £408 (1) | £386 (1) | |
| **Ours, PL room/night (status, min stay)** | | | | £186 Open, min 2 | £179 Booked (Smoobu), min 2 | £255 Blocked, min 3 | £322 Blocked, min 3 | £312 Blocked, min 3 | £180 Open, min 2 | |
| **Ours, comparable basis** | | | | £216 obs | £211 | £270 | £321 | £314 | £187 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P0 / -47% | P50 / -26% | excluded | excluded | excluded | P0 / -52% | |

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Tue 10 Nov–Sat 14 Nov (4n) | Wed 18 Nov–Fri 20 Nov (2n) | Sun 22 Nov–Thu 26 Nov (4n) | Thu 26 Nov–Sun 29 Nov (3n) | Sun 29 Nov–Sat 5 Dec (6n) | Tue 8 Dec–Fri 11 Dec (3n) | Fri 11 Dec–Mon 14 Dec (3n) | Sat 12 Dec–Mon 14 Dec (2n) | Sun 13 Dec–Thu 17 Dec (4n) | Tue 15 Dec–Sat 19 Dec (4n) | Wed 23 Dec–Sat 26 Dec (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.7 (30) | n/a | £320 | £440 | £440 | £440 | £283 | £320 | £404 | £416 | £392 | £447 | £529 | £545 | £429 | £456 | n/a | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a | £278 (-1%) | n/a | n/a | n/a | n/a | £248 | n/a | n/a | £359 | £359 | £374 | £351 | £382 | £440 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | £294 | £294 | £462 | £544 | £258 | £294 | n/a | £382 | £410 | £444 | £494 | £510 | £394 | £420 | n/a | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | £288 | £268 (-21%) | £338 | n/a | n/a | n/a | n/a (was £338) | £306 | n/a | £362 | £417 | n/a | £438 | £406 | £406 | n/a (was £417) | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.45 (11) | n/a | £306 | £306 | £615 | £544 | £270 | £306 | n/a | £488 | £410 | £444 | £494 | £510 | £394 | n/a (was £420) | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | £328 | n/a (was £328) | £358 | n/a | £478 | n/a (was £329) | £328 | £306 | n/a | n/a | £374 | £448 | £478 | £456 | £472 | £501 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a | £212 | £312 | n/a | n/a | £231 | £312 | £281 | n/a | n/a | £292 | n/a | n/a | n/a | n/a (was £281) | £292 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.5 (60) | n/a | £191 | £191 | n/a | n/a | n/a | £191 | £185 | n/a | n/a | n/a | n/a | n/a | £235 | £270 | £307 | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (87) | n/a | n/a | £190 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £198 | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.68 (73) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a (was £217) | n/a (was £258) | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.54 (37) | £272 | £206 (-5%) | n/a | n/a | n/a | £216 (-5%) | £280 | n/a | n/a | n/a | n/a (was £320) | n/a (was £354) | n/a | n/a | n/a | n/a (was £361) | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (35.5) | £288 (3) | £268 (7) | £306 (9) | £462 (3) | £511 (4) | £258 (5) | £306 (7) | £294 (6) | £416 (3) | £401 (4) | £417 (7) | £494 (5) | £494 (6) | £394 (8) | £413 (6) | £374 (4) | |
| **Ours, PL room/night (status, min stay)** | | | | £239 Booked (Smoobu), min 2 | £194 Open, min 2 | £212 Open, min 2 | £292 Booked (Smoobu), min 2 | £306 Booked (Smoobu)/Open, min 2 | £216 Open, min 2 | £166 Open, min 2 | £210 Open, min 2 | £272 Booked (Smoobu), min 2 | £230 Open, min 2 | £245 Open, min 2 | £289 Open, min 2 | £275 Open, min 2 | £214 Open, min 2 | £236 Open, min 2 | £297 Open, min 2/3 | |
| **Ours, comparable basis** | | | | £239 | £194 | £212 | £292 | £306 | £216 | £166 | £210 | £272 | £230 | £245 | £289 | £275 | £214 | £236 | £297 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = PL x 1.15 (before promotions)** | | | | £275 P33 / -4% | £224 P43 / -16% | £243 P22 / -21% | £336 P0 / -27% | £352 P0 / -31% | £249 P40 / -4% | £191 P14 / -38% | £242 P17 / -18% | £313 P0 / -25% | £264 P0 / -34% | £282 P0 / -32% | £333 P0 / -33% | £316 P0 / -36% | £246 P25 / -38% | £271 P17 / -34% | £341 P50 / -9% | Smoobu Booking.com markup +15% (policy) |
| **Our percentile / vs median** | | | | P0 / -17% | P14 / -27% | P22 / -31% | P0 / -37% | P0 / -40% | P20 / -16% | P0 / -46% | P17 / -28% | P0 / -35% | P0 / -43% | P0 / -41% | P0 / -41% | P0 / -44% | P12 / -46% | P0 / -43% | P25 / -21% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | £202 | n/a (was £202) | n/a | n/a | £302 | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | £278 | £228 | n/a | £428 | n/a | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | £236 | £236 | n/a | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a (was £252) | £192 | £302 | n/a | n/a | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | £202 | £192 (-5%) | £278 | n/a | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | n/a | n/a | £290 | £290 | n/a | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | £322 | £402 | n/a | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (19) | n/a | n/a | n/a | £284 | n/a | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (16) | n/a | n/a | £200 | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | £264 | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.82 (11) | n/a | n/a (was £240) | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.87 (19.0) | £220 (4) | £232 (6) | £290 (5) | £290 (3) | £302 (1) | |
| **Ours, PL room/night (status, min stay)** | | | | £500 Open, min 4 | £500 Open, min 3 | £500 Open, min 3 | £500 Open, min 4 | £547 Open, min 4 | |
| **Ours, comparable basis** | | | | £500 | £500 | £500 | £500 | £547 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +128% | P100 / +116% | P100 / +73% | P100 / +73% | P100 / +81% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | £204 | £174 | £192 | n/a | n/a | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (51) | n/a | £284 | £320 | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | n/a | n/a | £322 | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | n/a | £264 | n/a | £338 | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.67 (60) | n/a | n/a | £205 (-2%) | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | n/a | n/a | n/a | parking listed |
| [774061637963678253](https://www.airbnb.co.uk/rooms/774061637963678253) | 0.54 | 3 | 4.5 (34) | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed |
| **Comp median (n)** | | | 4.54 (51) | £204 (1) | £230 (2) | £234 (4) | n/a (0) | £330 (2) | |
| **Ours, PL room/night (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | excluded | |
## Rows written

- **`data/snapshots/2026-11-04/comps.csv`:** **485 comp-central rows** (55 comp ids × their stays; a blank price means not available).
  - Appended under `.comps.csv.lock`. Another agent had already created the file, so nothing was copied forward by this run.
  - The header was checked against `rm/snapshot.py`, and a duplicate guard was applied.
  - Each row carries: platform, URL, stay dates, adults, price basis (cleaning included, taxes excluded), check date, distance, capacity and differentiators.
- **`data/snapshots/2026-11-04/channel_checks.csv`:** **13 rows** of our observed Airbnb prices (P05 × 8, P06 × 3, P08 × 2). Appended under `.channel_checks.csv.lock`.
- `rm.snapshot.load('2026-11-04')` reads 3,534 comps and 404 channel checks (all agents, at the time of writing).

Data gaps:
- **Booking.com: NOT CHECKED** for all properties (bot check; not retried or bypassed). For P11 this leaves unknown:
  - the displayed price after promotions
  - search rank and review count
  - the cleaning fee
  - P11 percentiles therefore compare the PL room (or × 1.15) with Airbnb all-in comps, which biases them low.
- **P11 26–29 Nov:** commission at 21.9% of room (above the 18% booster) is unexplained; ask. The cleaning fee is not in Smoobu.
- **P11 22–25 Nov:** the cause of the +12–13% overnight PL rise is NOT CHECKED (no log entry).
- **P11 23–25 Dec:** the override values before Reyhan's 4 Nov edit are not in the log, so the previous values are NOT CHECKED.
- **P05 9 Nov:** the source of Airbnb's stale £511.80 and the "Special offer" is NOT CHECKED (Airbnb calendar and Smoobu stored rate not read).
- **P05:** January–February comps not priced (Reyhan added −5% for February today).
- **Thin evidence:**
  - P08: n = 1
  - P05: n = 3–4 per stay; 0 on 29 Dec
  - P11 26–29 Nov and 27–29 Nov: n = 3
  - P06: n = 3–4
- **Absent comps (13):** the pages load (HTTP 200), but 60-day availability is not verified. The four P08 comps have been absent for 3 days.
- **P14:** not seen on Airbnb, so its rating and reviews are NOT CHECKED.
- **P17:** not in PriceLabs or Smoobu.
