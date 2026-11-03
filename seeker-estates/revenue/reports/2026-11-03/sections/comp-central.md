# Competitor positioning: CENTRAL/NORTH (D = 2026-11-03)

**Method**
- **Comp ids:** the same 55 comp ids as 1 and 2 Nov (`data/snapshots/2026-11-02/comps.csv`, comp-central rows). **No replacements.** 12 comps were not returned on any of today's stays. All 12 listing pages returned HTTP 200 on 3 Nov, so all 12 are kept as active:
  - P06: 1259401393497276633, 1452940332365117153
  - P08: 693487869095756237, 1289147258305624118, 1409413462916896898, 1497137911142581794
  - P11: 1515051936255130803
  - P14: 1075245497252121738, 1460955085260023644
  - P17: 1304473419588771105, 975294297333089697, 774061637963678253
  - Whether each has availability in the next 60 days is NOT CHECKED (calendars not read).
- **Searches:** 49 plain public Airbnb search pages (airbnb.co.uk, no challenge), using the same map boxes and filters as 25 Oct–2 Nov: entire home, min bedrooms = ours, adults = our sleeps − 1, all result pages. Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c03s/search.py`. Raw results: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c03/search/*.json`.
- **Standard stays (the same for every comp and for us):** Fri 6–Sun 8 Nov (next Fri–Sun), Tue 10–Thu 12 Nov (midweek), Tue 24–Thu 26 Nov and Fri 27–Sun 29 Nov (about 30 days out). 3–5 Nov was dropped because it starts today. 10–12 Nov replaces it, so 10–12 Nov has no day-on-day figure.
- **Our open stays**, from `prices.csv` 3 Nov checked against Smoobu `reservations.csv` 3 Nov (Smoobu wins):
  - **P11:** 10–14 Nov, **18–20 Nov**, 22 Nov–5 Dec, 8–19 Dec, 23–26 Dec. 18–20 Nov is now a 2-night gap between the 14–18 Nov stay and the new 20–22 Nov booking.
  - **P05:** 9 Nov (min 1), 16–18 Nov, 29 Nov–3 Dec, 7–9 Dec, 13–22 Dec, 29 Dec (min 1).
  - **P06:** 8–12 Nov only (the nights of 8–11 Nov).
  - **P08:** 5–8 Nov only (the 13 Nov handback applies).
- **Price basis:**
  - **Comps:** Airbnb displayed total ÷ nights. Excludes taxes, **includes cleaning**, after any offer.
  - **P05, P06, P08:** our own Airbnb listing seen in the same searches (10 stays). Written to `channel_checks.csv`.
  - **P06 8–11 Nov** did not show in search, so it is derived as 0.765 × PL + £129 ÷ 3. The 0.765 factor is confirmed today on 8–12 Nov: (£884.05 − £129) ÷ 4 = £188.76 = 0.765 × PL £246.75.
  - **P11** (Booking.com only) and **P14:** PriceLabs room price. P11 is also shown at the Booking.com list price (PL × 1.15). Because these exclude cleaning and the comps include it, their percentiles are biased low.
- **Booking.com: NOT CHECKED.** The 28 Oct bot check was not retried or bypassed.
- **PriceLabs (read-only, one call at a time):**
  - **`get_user_logs`** (P05, P06, P08, P11, P14; 2–3 Nov): one new entry since yesterday's run.
    - **Reyhan, 2 Nov 15:05Z, P11: re-added −5% on 10 Nov–18 Dec** (min stay 2). This reverses their own 00:11Z removal.
    - There were no entries for P05, P06, P08 or P14. No base_price change in this batch.
  - **`get_listing_date_overrides` P11:** confirms −5% on every date 10 Nov–18 Dec, **including the darts nights 13–17 Dec**, and −3% on 3–9 Nov.
  - **`get_listing_date_overrides` P05:** confirms Reyhan's 31 Oct overrides still stand (yesterday this was a data gap):
    - −5% on 29 Nov–2 Dec and 13–19 Dec
    - −7% on 4–31 Jan
    - +300% / min 1 on 9 Nov
    - +100% / min 1 on 29 Dec
- **Positioning:**
  - Calculated with `rm/positioning.py` (`quality_premium`, `recommend`).
  - Occupancy comes from `reports/2026-11-03/kpi_pack.json`: `forward_occ_30_ex_blocks` where present, otherwise `forward_occ_30` / `_60`, against `market_occ_30` / `_60`.
  - Percentile = mean over open multi-night stays: check-in up to 1 Dec for 30d, all open stays for 60d.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c03s/analyse03.py`. Output: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c03/analysis.json`.

## Summary

| Ref | Comps (priced per stay) | Comp median on our open stays | Ours on the same stays | Our pct (open) | Rating ours vs comp median; review gap | Booked vs mkt | Supported positioning |
|---|---|---|---|---|---|---|---|
| **P05 4BR** | 6 (1–4) | 16–18 Nov £454; 29 Nov–3 Dec £945; 7–9 Dec £790; 13–16 Dec £947; 17–20 Dec £980; 20–22 Dec £1,020 | £392 / £480 / £534 / £575 / £623 / £692, all observed all-in | **P12 (30d), P22 (60d)**; −14% / −49% / −32% / −39% / −36% / −32% | Airbnb 4.77 (35) vs 4.27 (22.5); **+12.5 reviews** | 30d 75.9% vs 40%; 60d 67.8% vs 38% | `quality_premium` = **+0.15**, so **+15% over the median is supported**. `recommend` 30d and 60d = **raise +25%** |
| **P06 2BR** | 12 (1–5) | 8–11 Nov £314 (3); 8–12 Nov £314 (4) | £227 derived / £221 observed | **P0** (−28% / −30%) | 4.60 (10) vs 4.66 (25); **−15 reviews** | 30d ex-blocks 63.6% vs 45% | qp −0.024, so **−2% vs the median is supported**. `recommend` 30d = **raise +10%** |
| **P08 2BR** | 6 (0–2) | 5–8 Nov £386 (1); 6–8 Nov £408 (1) | £201 / £231 observed | **P0** (−48% / −43%) | 4.33 (3) vs 4.87 (29); **−26 reviews** | 70% vs 48% (30d) | qp −0.15, so **−15% vs the median is supported**. `recommend` = **raise +10%** (thin: n = 1) |
| **P11 2BR** | 12 (2–7) | 10–14 Nov £264; 18–20 £300; 22–25 £282; 24–26 £294; 27–29 £462; 28 Nov–4 Dec £424; 8–11 Dec £359; 11–14 Dec £448; 15–19 Dec £420; 23–26 Dec £389 | PL room £220 / £174 / £186 / £188 / £261 / £217 / £246 / £290 / £236 / £315 | **P2 room (30d), P7 (60d)**. At Booking.com list price: P0–P50 | Booking.com 8.0/10 (policy). Not comparable with the Airbnb median 4.67 (35.5). Our review count NOT CHECKED | 30d 41.4% vs 46%; 60d 44.1% vs 39% | qp 0, so **at the median (0%) is supported**. `recommend` 30d and 60d = **raise +5%** |
| P14 1BR | 12 (3–5) | £244 / £236 / £284 / £290 | £500 room | P100 (+104% / +111% / +76% / +73%) | Not seen on Airbnb; comp median 4.87 (19) | 0% vs 42% (30d) | Special setup: numbers only |
| P17 1BR | 7 (0–4) | £204 / £230 / £237 / n/a | NOT IN SYSTEMS | n/a | Comp median 4.56 (51) | n/a | collect-data |

**Day-on-day (same comp, same stay, same checkout; 2 Nov → 3 Nov)**
- **Comps were flat overall.** The like-for-like median change is 0.0% on every stay except three:
  - P11 6–8 Nov: −3.7% (1568808216094734994 £292 → £272)
  - P06 8–11 Nov: −2.4%
  - P14 27–29 Nov: +9.8% (1039993866991009459 £352 → £428; 1688600915462932837 £259 → £284)
- **Ours:**
  - **P11 fell about 5% on every open stay** because of Reyhan's 15:05Z −5%:
    - 10–14 Nov: £231 → £220
    - 18–20 Nov: £182 → £174
    - 8–11 Dec: £259 → £246
    - 11–14 Dec: £305 → £290
    - 15–19 Dec: £249 → £237
  - **P06 rose:** PL 8–11 Nov £217.67 → £240.67 (+10.6%) and 8–12 Nov £222.75 → £246.75, with no log entry (algorithmic; the cause is NOT CHECKED). Observed 8–12 Nov rose £203 → £221 and 10–12 Nov £240 → £260.
  - **P05:** observed 16–18 Nov £405 → £392 and 29 Nov–3 Dec £492 → £480. December was flat to +1%.
  - **P08:** 5–8 Nov £206 → £201.

## P11 new Booking.com booking, 20–22 Nov, vs comps (same stay)

**What we sold**
- Booked 2 Nov (Smoobu `reservations.csv` 3 Nov). Room **£430.11 = £215.06/night**, cleaning excluded. The Booking.com cleaning fee is not recorded (blank `cleaning_gbp`), so it is NOT CHECKED.
- **Against the PriceLabs price:**
  - **0.889×** the 2 Nov PL £484 (£241 + £243, `data/snapshots/2026-11-02/prices.csv`).
  - **0.933×** the 3 Nov PL £461 (£230 + £231), which includes Reyhan's −5%.
- **Against the Booking.com list price (PL × 1.15):** 0.773× before the −5% (£557) and 0.813× after it (£530).
  - 0.81 matches two stacked 10% promotions exactly (Mobile 10% × Genius L1 10%, or Last Minute 10% × Mobile 10%; all on per policy). Policy says stacking explains this, so it is not flagged.
  - Which PL refresh the guest saw (before or after 15:05Z) is NOT CHECKED: Smoobu gives only the booking date.

**Comps for 20–22 Nov, Airbnb, checked 3 Nov, all-in including cleaning.** Only 3 of 12 comps are available, which is itself a demand signal.

| Comp | Dist | Rating (reviews) | Features | £/night |
|---|---|---|---|---|
| 1543632408013225027 | 0.32 km | 4.5 (12) | lift | £294.50 |
| 1159915905276842600 | 0.43 km | 4.68 (69) | | £337.50 |
| 1542815721953379556 | 0.40 km | 4.7 (30) | lift, terrace | £440.50 |

Median **£337.50**.

**Where we landed**
- **P0, −36% vs the median** on room. That is 27% under the cheapest available comp.
- Even the PL room (£230.50/night) and the Booking.com list price (£265) are P0, at −32% and −22%.
- **Conclusion:** the booking came back once P11 was cheaper than everything comparable within 0.5 km. It does not show that the −5% was needed: we were already P0 on this stay before it.

**Commission**
- Smoobu `commission_gbp` £104.24 = **24.2% of the room**. That is above the 18% Visibility Booster rate.
- It may be calculated on room + cleaning or include VAT; NOT CHECKED. Per policy: ask, do not assume.

**18 Oct base-rise tracker:** P11 adds **+2 nights / £430.11 room (£325.87 after commission)** since yesterday's figure.

## Conflicts with standing decisions (for Corentin to confirm, not new proposals)

- **P11 darts nights 13–17 Dec.**
  - Policy `darts_override_24oct` says to keep Reyhan's +5%. Since 2 Nov 00:11Z it had been removed. Since 15:05Z those nights carry **−5%** (`get_listing_date_overrides`).
  - 13–17 Dec now prices at £228 / £202 / £207 / £217 / £237 (average £218), against the 21 Oct intent of over £300 (policy `price_changes`).
  - The comp median for 11–14 Dec is £448 and for 15–19 Dec £420.
- **P11 −5% on 10 Nov–18 Dec contradicts the comp evidence.**
  - Before the cut we were already P0–P40 at room price and P0–P60 at the Booking.com list price on every open stay (`reports/2026-11-02/sections/comp-central.md`). After the cut we are P0–P14 at room price.
  - `recommend` gives +5% at 30 and 60 days.
- **P05 −5% (29 Nov–2 Dec, 13–19 Dec) and −7% (4–31 Jan), confirmed still set today.** These contradict the comp evidence:
  - December open stays are P25, 32–49% under the medians.
  - P05 is booked 36 points ahead of the market at 30 days.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

**a-p05-9nov: NOT FIXED (fourth consecutive check)**
- **PriceLabs:** 9 Nov is £1,435, min stay 1, from a +300% override set 30 Oct (`get_listing_date_overrides`).
- **Airbnb, 9–10 Nov, 7 adults, checked 3 Nov:** still shows "1 night x £511.80", "Special offer −£63.36", total £448.44. That is identical to 31 Oct, 1 Nov and 2 Nov.
- **Control:** 29 Dec (PL £1,354, +100%, min 1) displays £1,413.60 = 0.900 × £1,354 + £195, so the override flows through on that date. The 9 Nov fault is specific to that date.

**Positioning**
- `quality_premium(4.77, 4.27)` = **+0.15** (cap).
- `recommend(0.759, 0.40, 0.12, 0.15)` → **raise +25%** (30d).
- `recommend(0.678, 0.38, 0.22, 0.15)` → **raise +25%** (60d).
- Reasoning: P05 books 30–36 points ahead of the market with half a star more and 12.5 more reviews, yet sits 32–49% under every December median.
- **Caveat:** only 6 comps, and three of them are rated under 4.3, which inflates qp.

**Differentiators**
- 912053248917940403: Superhost, lift, park view, 4.96.
- 1639043256346803626: Superhost house with terrace, 4.89.
- 1610095240357069208 and 1606112160333193293: 0.55 km, parking.

## P06 Marylebone 2-bed (3288517): intentional blocks excluded

- **Open:** 8–12 Nov only.
  - Observed: 8–12 Nov £221.01/night all-in (4.60, 10 reviews, no offer line).
  - Derived: 8–11 Nov £227.
  - Comp medians: £314 (n = 4 and n = 3).
  - Position: **P0, −28% / −30%**.
- **Overnight drift:** PL rose 10.6% overnight with no log entry. This partly reverses the 1–2 Nov falls; the likely trigger is the 12–15 Nov booking resetting the recency factor (NOT CHECKED).
- **Positioning:**
  - `quality_premium(4.60, 4.66)` = −0.024.
  - `recommend(0.636, 0.45, 0.0, −0.024)` → **raise +10%** (≈ £250 all-in, still 20% under the median).
  - The 60d result is `fix-listing`. It is not used, because `forward_occ_60` (11.9%) counts the intentional blocks.
- **Excluded per policy:** 24–29 Nov (blocked on purpose).
- **Differentiators:** 5 of the 12 comps have a lift and 2 are Superhosts. P06 has no lift (2nd floor) and 15 fewer reviews than the median.

## P08 Islington 2-bed (3318167): sellable to 13 Nov only (handback)

- **5–8 Nov:** £201.13 × 3 observed. Comp 28354043 (4.8, 35 reviews): £386 → **P0, −48%**.
- **6–8 Nov:** £230.56 vs £408 (same comp).
- **Availability:** 4 of 6 comps have nothing available on any of the 5 stays.
- **Positioning:**
  - `quality_premium(4.33, 4.87)` = −0.15.
  - `recommend(0.70, 0.48, 0.0, −0.15)` → **raise +10%** (≈ £221 / £254 all-in).
  - n = 1, and 2 days from arrival, so +10% is the ceiling.
- **Differentiator:** ground-floor private terrace.

## P11 Camden 2-bed (3064196): Booking.com only

- **Position:** every open stay is P0–P33 at room price and 17–49% under the comp median. At the Booking.com list price (before Mobile, Genius and Last Minute) we are P0–P50, −4% to −41%.
- **18–20 Nov** (2-night gap between bookings, PL £174/night) is the cheapest stay in the window: −42% vs the median of £300.
- **Positioning:**
  - qp = 0 (8.0/10 is on Booking.com's scale, not Airbnb's).
  - `recommend(0.414, 0.46, 0.02, 0)` → **raise +5%** (30d). This was `fix-listing` yesterday; the lead improved from −8 to −5 points with the new booking.
  - `recommend(0.441, 0.39, 0.07, 0)` → **raise +5%** (60d).
  - Reasoning: occupancy is in line with the market while we sit at the bottom of the set, so the price can step up. Visibility (policy: CTR 0.81% vs 1.70%) remains the bigger lever.
- **Differentiators:** 4 of the 12 comps have a lift and 3 have a balcony or terrace. P11 is a basement flat with a patio.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

- **Ours:** PL room £500, min stay 3–4.
- **Comp medians:** £244 / £236 / £284 / £290 → P100, +73% to +111%.
- **Occupancy:** 0% vs 42% at 30d.
- **Comp rating median:** 4.87 (19).
- No proposal, per policy.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS

- **Comp medians:** £204 / £230 / £237 / n/a (n = 1 / 2 / 4 / 0).
- **Comp rating median:** 4.56 (51).
- Reference set only.

## Comp tables

**Source for every comp row:** Airbnb public search, checked 2026-11-03.
- Nightly price excludes taxes and includes cleaning.
- (±%) is the change vs 2 Nov for the same stay and checkout.
- "n/a" means not returned by the date-filtered search (booked or min stay).

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 9 Nov–Tue 10 Nov (1n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Wed 16 Dec (3n) | Thu 17 Dec–Sun 20 Dec (3n) | Sun 20 Dec–Tue 22 Dec (2n) | Tue 29 Dec–Wed 30 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.17 (12) | n/a | £509 | £509 | £920 | n/a | £509 | £960 | £1020 | £980 | £980 | £1020 | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | £519 | £519 | £570 | £1020 | n/a | £519 | £960 | £1020 | £980 | £980 | £1070 | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.96 (28) | £896 | n/a | n/a | n/a | n/a | n/a | £930 | n/a | £914 | £1080 | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.29 (45) | n/a | n/a | £336 | n/a | £320 | n/a | n/a | £326 | n/a | n/a | n/a | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.83 (12) | n/a | £400 | £473 | n/a | n/a | £400 | £416 (-1%) | n/a | £450 | £504 | £596 (+1%) | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (28) | n/a | £400 | n/a | n/a | n/a | £400 | n/a | £560 | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.27 (22.5) | £707 (2) | £454 (4) | £491 (4) | £970 (2) | £320 (1) | £454 (4) | £945 (4) | £790 (4) | £947 (4) | £980 (4) | £1020 (3) | n/a (0) | |
| **Ours, PL room/night (status, min stay)** | | | | £473 Booked (Smoobu), min 2 | £454 Booked (Smoobu), min 3 | £597 Booked (Smoobu), min 3 | £627 Booked (Smoobu), min 4 | £1435 Open, min 1 | £386 Open, min 2 | £539 Open, min 3 | £485 Open, min 2 | £567 Open, min 3 | £619 Open, min 3 | £661 Open, min 2 | £1354 Open, min 1 | |
| **Ours, comparable basis** | | | | £459 | £445 | £554 | £577 | £449 obs | £392 obs | £480 obs | £534 obs | £575 obs | £623 obs | £692 obs | £1414 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P0 / -35% | P50 / -2% | P75 / +13% | P0 / -40% | P100 / +40% | P0 / -14% | P25 / -49% | P25 / -32% | P25 / -39% | P25 / -36% | P33 / -32% | n/a | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Sun 8 Nov–Wed 11 Nov (3n) | Sun 8 Nov–Thu 12 Nov (4n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.91 (11) | £339 | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.68 (22) | n/a | £275 (-7%) | £296 | n/a | £275 | £275 (-6%) | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | £308 | n/a (was £348) | n/a | n/a (was £292) | £284 | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | £346 | £432 | n/a | n/a | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.38 (24) | n/a | n/a | £506 (-9%) | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (53) | n/a | n/a (was £588) | n/a (was £902) | £1102 (-1%) | n/a (was £552) | £534 | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | £355 (-2%) | £344 | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.55 (22) | n/a | n/a | £432 (+1%) | £491 | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | £640 (-1%) | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.12 (26) | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.87 (87) | n/a | n/a (was £348) | £552 | £600 (-1%) | £314 (-3%) | n/a (was £324) | parking listed |
| **Comp median (n)** | | | 4.66 (25.0) | £339 (1) | £308 (3) | £432 (5) | £620 (4) | £314 (3) | £314 (4) | |
| **Ours, PL room/night (status, min stay)** | | | | £296 Booked (Smoobu), min 2 | £256 Open, min 2 | £410 Blocked, min 3 | £472 Blocked, min 4 | £241 Open, min 2 | £247 Open, min 2 | |
| **Ours, comparable basis** | | | | £291 | £260 obs | £379 | £425 | £227 | £221 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P0 / -14% | P0 / -15% | excluded | excluded | P0 / -28% | P0 / -30% | |

### P08

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Thu 5 Nov–Sun 8 Nov (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | £408 | £408 | £408 | £408 | £386 | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | n/a | £165 | £201 | £201 | n/a | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (66) | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) | 1.22 | 4 | 4.6 (77) | n/a | n/a | n/a | n/a | n/a | none listed |
| [1497137911142581794](https://www.airbnb.co.uk/rooms/1497137911142581794) | 0.8 | 4 | 4.91 (23) | n/a | n/a | n/a | n/a | n/a | Superhost, house (2-bedroom cottage) |
| **Comp median (n)** | | | 4.87 (29.0) | £408 (1) | £286 (2) | £304 (2) | £304 (2) | £386 (1) | |
| **Ours, PL room/night (status, min stay)** | | | | £204 Open, min 2 | £201 Booked (Smoobu), min 2 | £236 Blocked, min 3 | £318 Blocked, min 3 | £198 Open, min 2 | |
| **Ours, comparable basis** | | | | £231 obs | £228 | £255 | £318 | £201 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P0 / -43% | P50 / -20% | excluded | excluded | P0 / -48% | |

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Tue 10 Nov–Sat 14 Nov (4n) | Wed 18 Nov–Fri 20 Nov (2n) | Fri 20 Nov–Sun 22 Nov (2n) | Sun 22 Nov–Wed 25 Nov (3n) | Sat 28 Nov–Fri 4 Dec (6n) | Tue 8 Dec–Fri 11 Dec (3n) | Fri 11 Dec–Mon 14 Dec (3n) | Tue 15 Dec–Sat 19 Dec (4n) | Wed 23 Dec–Sat 26 Dec (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.7 (30) | n/a | £320 | £440 | £440 | £283 | n/a | £440 | £416 | n/a (was £392) | n/a (was £447) | £529 | £456 | n/a | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a | £280 | n/a | n/a | n/a | n/a | £251 | n/a | £359 | £359 | n/a (was £382) | £440 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | £294 | £294 | £462 | £258 | £294 | £294 | £270 | £424 | £444 | £494 | £420 | n/a | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a (was £338) | £338 | £338 | n/a | n/a | £338 | £338 | £317 | n/a | n/a (was £417) | n/a (was £417) | £406 | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.45 (11) | n/a (was £306) | n/a | n/a (was £306) | £615 | £270 | £306 | n/a | £282 | £424 | £444 | £494 | £420 | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | £328 | £328 | £358 | n/a | £329 | n/a | n/a | £318 | n/a | £373 | £448 | £470 | £499 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a | £212 | n/a | n/a | £231 | £312 | n/a | n/a | n/a | £292 | n/a | £281 | £292 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.5 (60) | n/a | £191 | £191 | n/a | n/a | £191 | n/a | £187 | n/a | n/a | n/a | £270 | £307 | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (87) | n/a | n/a | £190 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.68 (73) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £217 | £258 | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.54 (37) | £272 (-7%) | £217 | n/a | n/a | £226 (-9%) | £281 | n/a | n/a | n/a | £320 (+2%) | £354 | n/a | £361 | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (35.5) | £300 (2) | £294 (7) | £294 (7) | £462 (3) | £264 (6) | £300 (6) | £338 (3) | £282 (7) | £424 (2) | £359 (7) | £448 (7) | £420 (7) | £389 (6) | |
| **Ours, PL room/night (status, min stay)** | | | | £240 Booked (Smoobu), min 2 | £198 Open, min 2 | £188 Open, min 2 | £261 Open, min 2 | £220 Open, min 2 | £174 Open, min 2 | £230 Booked (Smoobu), min 2 | £186 Open, min 2 | £217 Open, min 2 | £246 Open, min 2 | £290 Open, min 2 | £236 Open, min 2 | £315 Open, min 2/3 | |
| **Ours, comparable basis** | | | | £240 | £198 | £188 | £261 | £220 | £174 | £230 | £186 | £217 | £246 | £290 | £236 | £315 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = PL x 1.15 (before promotions)** | | | | £276 P50 / -8% | £227 P43 / -23% | £216 P29 / -27% | £300 P0 / -35% | £253 P33 / -4% | £200 P17 / -34% | £265 P0 / -22% | £214 P14 / -24% | £249 P0 / -41% | £283 P14 / -21% | £334 P14 / -26% | £272 P14 / -35% | £362 P50 / -7% | Smoobu Booking.com markup +15% (policy) |
| **Our percentile / vs median** | | | | P0 / -20% | P14 / -33% | P0 / -36% | P0 / -43% | P0 / -17% | P0 / -42% | P0 / -32% | P0 / -34% | P0 / -49% | P14 / -32% | P14 / -35% | P0 / -44% | P33 / -19% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | £202 | £202 | n/a | n/a | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | £278 | n/a | n/a | £428 (+21%) | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | £236 | £236 | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | £252 | n/a | £302 | n/a | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | £202 | £278 | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | n/a | n/a | £290 | £290 | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | £322 | n/a (was £402) | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (19) | n/a | n/a | n/a | £284 (+10%) | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (16) | n/a | n/a | £200 | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.82 (11) | n/a | £240 | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.87 (19.0) | £244 (4) | £236 (5) | £284 (4) | £290 (3) | |
| **Ours, PL room/night (status, min stay)** | | | | £500 Open, min 4 | £500 Open, min 3 | £500 Open, min 3 | £500 Open, min 4 | |
| **Ours, comparable basis** | | | | £500 | £500 | £500 | £500 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +104% | P100 / +111% | P100 / +76% | P100 / +73% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | £204 | £174 | £192 | n/a | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (51) | n/a | £284 | £320 | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.56 (27) | n/a | n/a | n/a | n/a | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | n/a | £264 | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.67 (60) | n/a | n/a | £210 (-1%) | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | n/a (was £126) | n/a | parking listed |
| [774061637963678253](https://www.airbnb.co.uk/rooms/774061637963678253) | 0.54 | 3 | 4.5 (34) | n/a | n/a | n/a | n/a | Superhost, parking listed |
| **Comp median (n)** | | | 4.56 (51) | £204 (1) | £230 (2) | £237 (4) | n/a (0) | |
| **Ours, PL room/night (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | |
## Rows written

- **`data/snapshots/2026-11-03/comps.csv`:** **406 comp-central rows** (55 comp ids × their stays; a blank price means not available).
  - Appended under `.comps.csv.lock`. The file already existed (created by another agent). The header was checked against `rm/snapshot.py`, and a duplicate guard was applied.
  - Each row carries platform, URL, stay dates, adults, price basis, check date, distance, capacity and differentiators.
- **`data/snapshots/2026-11-03/channel_checks.csv`:** **12 rows** of our observed Airbnb prices (P05 × 8, P06 × 2, P08 × 2). Appended under `.channel_checks.csv.lock`.
- `rm.snapshot.load('2026-11-03')` reads 2,264 comps and 326 channel checks (all agents, at the time of writing).

Data gaps:
- **Booking.com: NOT CHECKED** for all properties (bot check; not retried or bypassed). For P11 this leaves unknown: the displayed price after promotions, search rank, review count and the cleaning fee. P11 percentiles compare the PL room (or × 1.15) with Airbnb all-in comps, so they are biased low.
- **P11 20–22 Nov booking:**
  - Booking time vs Reyhan's 15:05Z −5% is NOT CHECKED, so it is unknown which list price the guest saw.
  - Commission at 24.2% of room (above the 18% booster) is unexplained; ask.
  - PriceLabs `prices.csv` 3 Nov still shows 20–21 Nov as available (£230 / £231), although Smoobu has the booking → push/sync check.
- **P05 9 Nov:** the source of Airbnb's stale £511.80 and the "Special offer" is NOT CHECKED (Airbnb calendar and Smoobu stored rate not read).
- **P05:** January comps not priced.
- **P06:** the cause of the +10.6% overnight PL rise is NOT CHECKED (no log entry; recency factor reset suspected).
- **Thin evidence:**
  - P08: n = 1 on its open stays.
  - P05: n = 3–4 per stay, n ≤ 1 on 1-night stays.
  - P11 20–22 Nov: n = 3.
  - P06: n = 3–4.
- **Absent comps (12):** the pages load (HTTP 200), but 60-day availability is not verified.
- **P14:** not seen on Airbnb, so its rating and reviews are NOT CHECKED.
- **P17:** not in PriceLabs or Smoobu.
