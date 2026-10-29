# Competitor positioning: CENTRAL/NORTH (D = 2026-10-29)

**Method.** I kept the same 55 comp ids as 27 and 28 Oct, with no additions and no replacements. I re-ran the same Airbnb map-box searches with the same parameters: airbnb.co.uk, plain public search pages (HTTP 200, no challenge), entire home, min bedrooms = ours, adults = our sleeps − 1, all result pages. That made 40 searches (`c29s/search.py` in the scratchpad).
- **Like-for-like stays (2 nights):** Tue 3–Thu 5 Nov, Fri 30 Oct–Sun 1 Nov, Tue 24–Thu 26 Nov and Fri 27–Sun 29 Nov.
- **Our open dates (new today):**
  - **P11:** Sat 28 Nov–Fri 4 Dec (6 n) and Tue 8–Fri 11 Dec (3 n).
  - **P05 (all open nights to 16 Dec):** 6–9 Nov, 16–18 Nov, 29 Nov–3 Dec, 7–9 Dec and 13–16 Dec.
  - **P08:** 5–7 Nov.
  - **P06:** 10–12 Nov. 8–14 Nov is open in `prices.csv` 29 Oct; it was unavailable on 28 Oct.

**Price basis:**
- Comp prices are nightly: Airbnb displayed total / nights, **excl. taxes, cleaning INCLUDED**, after any offer.
- **New today:** our own P05, P06 and P08 listings appeared in the searches for their open stays. Their displayed all-in prices are now **observed**, not derived (rows added to `channel_checks.csv`).
- Booked stays still use a derived basis:
  - P05: PL x 0.765 at ≤28 days and x 0.900 beyond, + £195 / nights. Both factors were observed today.
  - P06: 0.765 x PL + £129 / n.
  - P08: 0.85 x PL + £149 / n. This factor was not re-observed.
- P11 and P14 are PriceLabs room price only (`data/snapshots/2026-10-29/prices.csv`).

**Other sources:**
- Booking.com: **NOT CHECKED.** It is still behind a bot check (28 Oct), and I did not try to get round it.
- PriceLabs: still no Competitor Listings or Market Dashboard comp source. For P11 I pulled `get_neighbourhood_data` (detail, prices), `get_user_logs` and `get_listing_date_overrides`, one call at a time.

**Positioning:**
- Calculated with `rm/positioning.py`. Occupancy comes from `reports/2026-10-29/kpi_pack.json`: `forward_occ_30_ex_blocks` where present, else `forward_occ_30` / `_60`, against `market_occ_30` / `_60`.
- "Avg pct" is the mean of the per-stay percentiles.
- The base review is closed (hold; next review 2 Nov), so the `recommend` outputs are positioning signals for 2 Nov.

**Rows written:**
- `data/snapshots/2026-10-29/comps.csv`: **292 rows appended** (55 comps x their stays; a blank price means not available). The file lock was used, the header was checked against `rm/snapshot.py`, and a duplicate guard was applied.
- `data/snapshots/2026-10-29/channel_checks.csv`: **7 rows appended** (our observed Airbnb prices).
- Yesterday's rows were not copied forward: they stay in `2026-10-28/comps.csv` with their own check date.
- `rm.snapshot.load('2026-10-29')` reads 942 comps and 50 channel checks.

**Comps kept although missing from every stay today:**
- The rule is to replace a comp only when it is inactive, and absence from the date-filtered results is not proof of that.
- I could not confirm activity: the listing-page check was refused by this session's permission policy (Data gaps).
- So all six of yesterday's list, plus newly-missing ones, are kept:
  - P08: 1289147258305624118 (4th day), 693487869095756237 (2nd) and 1596458903516109468.
  - P06: 917140285217729256 (4th day), 1452940332365117153 (3rd) and 1259401393497276633.
  - P11: 1515051936255130803 (3rd day; reserve 1423000888558890581).
  - P14: 1595613237427991150 (3rd day), 1075245497252121738 (2nd), 1405104068242896146 and 1477465073811441968.

## Summary

| Ref | Comps (priced per stay) | Comp median, open/target stays | Ours on the same stays | Our pct | Rating ours vs comp median; reviews gap | Booked vs mkt 30d | Supported positioning (`quality_premium`, `recommend`) |
|---|---|---|---|---|---|---|---|
| P05 4BR | 6 (2–5) | 6–9 Nov £656 (2), 16–18 Nov £819 (3), 29 Nov–3 Dec £897 (4), 7–9 Dec £790 (4), 13–16 Dec £887 (4) | £419 / £427 / £538 / £550 / £596 **observed Airbnb all-in** | **P22** on open stays (P23 all 9) | Airbnb 4.77 (35) vs 4.33 (21.5); +13.5 | 78.6% vs 38% | qp +0.15; **raise +25%** (ceiling: thin set) |
| P06 2BR | 12 (1–7) | 10–12 Nov £347 (6) | £302 observed | **P17** (P22 incl. booked stays) | 4.56 (9) vs 4.64 (25); −16 | 56.2% vs 45% (ex-blocks) | qp −0.034; **raise +10%** |
| P08 2BR | 6 (2) | 5–7 Nov £318 (2) | £214 observed, after an Airbnb **"Special offer" −£119.61** (list £274) | **P0** (P50 at list) | 4.33 (3) vs 4.81 (27.5); −24.5 | 80% vs 50% | qp −0.15; **raise +10%** |
| **P11 2BR** | 12 (3–9) | 28 Nov–4 Dec £424 (3); 8–11 Dec £373 (9); near-term £286 / £243 / £358 | £240 / £235 (PL room); £212 / £242 / £215 | **P4** window; P14 near-term | Booking.com 8.0/10 (policy) is not comparable with Airbnb 4.67 (35.5); review count NOT CHECKED | 41.4% vs 43% (30d); 35.6% vs 38% (60d) | qp 0; **raise +5%** (30d and 60d) |
| P14 1BR | 12 (3–5) | £227 / £254 / £290 / £304 | £500 / £500 / £500 / £513 (room) | P100 | not seen on Airbnb; comp median 4.91 (18.5) | 0% vs 40% | special setup: numbers only |
| P17 1BR | 7 (1–5) | £237 / £204 / £236 / £261 | NOT IN SYSTEMS | n/a | comp median 4.56 (49) | n/a | collect-data |

**Comp prices day on day (same comp and stay, 28 → 29 Oct):**
- Median change is 0.0% on every like-for-like stay for P05, P06, P08, P14 and P17.
- Exceptions: P06 27–29 Nov −1.3% (n=4), P08 30 Oct–1 Nov −1.5% (n=2) and P17 27–29 Nov −4.4% (n=1).
- **P11 at the weekend (30 Oct–1 Nov): −7.5% (n=4), the second cut in two days.** It comes from 1543632408013225027 (−10%), 1542960049319560709 (−11%) and 654396087724294901 (−5%).
- P11 8–11 Dec compared with yesterday's 8–10 Dec is −2.4% (n=8), but that is **not like for like** (3 nights against 2).

## P11 Camden 2-bed (3064196): Booking.com only. Focus: reopened 28 Nov–4 Dec and 8–11 Dec

**Stay prices vs comps:**

| Stay | Ours (PL room/night) | Comp median (n) | Our pct | vs median |
|---|---|---|---|---|
| 28 Nov–4 Dec (6 n) | £240.17 | £424 (3) | P0 | −43% |
| 8–11 Dec (3 n) | £235 | £373 (9) | P11 | −37% |

- **On the guest's list price** (PL x 1.15 Smoobu markup, before Mobile and Genius discounts) the same stays are £276 / £270: still P0 / P11, −35% / −28%.
- **Against PriceLabs Nearby Listings** (`get_neighbourhood_data` 29 Oct, 1–3 BR filter, n=283, host-only fee, not a comp set), the stay averages are:

| Stay | NL P25 / P50 / P75 | Ours | Position |
|---|---|---|---|
| 28 Nov–4 Dec | 199 / 258 / 334 | 240 | between P25 and P50, ~7% under P50 |
| 8–11 Dec | 208 / 262 / 337 | 235 | ~10% under P50 |

- Same-BR 2 BR band today: 229 / 290 / 331 / 393 (n=172). On 28 Oct it was 241 / 302 / 352 / 401.
- **Market occupancy by night** (NL daily):
  - Fri/Sat 27–28 Nov 51–52%, and 4–5 Dec 49–51%. 5–7 Dec is resold.
  - Midweek 30 Nov–2 Dec 23–27%, and 8–10 Dec 22–24%.
- **Our PriceLabs prices in the window are flat** vs 28 Oct: £239.00 → £240.17 on 28 Nov–4 Dec, £234.67 → £235.00 on 8–11 Dec.

**What changed since yesterday (`get_user_logs`, `get_listing_date_overrides`):**
- On 28 Oct between 10:28 and 10:29Z, Reyhan replaced the 27 Oct "−2%, min 3" override on the **Sun–Wed nights** with **min-stay-2 overrides that carry no price adjustment**. The nights affected are 31 Oct–1 Nov, 22–25 Nov, 29 Nov–2 Dec, 8–9 Dec and 13–16 Dec.
- Thu–Sat nights keep −2% with min 3.
- So yesterday's point that "min 3 blocks the 2-night comp stays" no longer applies on midweek window nights.
- **For Corentin to confirm, not a new proposal:** 13–16 Dec (darts) now carries min stay 2 with no price adjustment. Policy (24 Oct) says to leave the +5% darts override that Reyhan set on 23 Oct. The edits on 27 and 28 Oct replaced it.

**Near-term weekend:**
- 30 Oct is booked (Booking.com 28–31 Oct, booked 28 Oct; `reservations.csv`). 31 Oct is open at £255.
- After two days of comp cuts, the 30 Oct–1 Nov stay is now **at the comp median (P20, −0%)**. On 28 Oct it was P0 / −20%.
- On list-price basis we are P80, +15%. The near-term weekend is not under-priced.

**Supported positioning:**
- `quality_premium` = 0, because Booking.com 8.0/10 cannot be compared with Airbnb stars.
- 30 days: `recommend(0.414, 0.43, 0.14, 0)` returns **raise +5%** ("in line with market but priced below what quality supports (P14)").
- 60 days, window stays: `recommend(0.356, 0.38, 0.04, 0)` also returns **raise +5%**.
- **Reasoning:** on every reopened stay we are the cheapest or near-cheapest Airbnb-equivalent, and midweek window nights sit under NL P50. So a +5% step on 29 Nov–2 Dec and 8–9 Dec is supported for 2 Nov, or now via an override if Corentin wants. Weekends hold. The window is 30+ days out, and P11 occupancy (41%) is in line with the market (43%).

**Differentiators:** 6 of the 12 comps have a lift or a balcony/terrace, and 654396087724294901 is a Superhost. P11 is a basement with a patio, no lift and no parking, next to Camden Town station.

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 30 Oct–Sun 1 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Sat 28 Nov–Fri 4 Dec (6n) | Tue 8 Dec–Fri 11 Dec (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.7 (30) | £352 | £328 | £440 | £440 | £392 | £447 (+1%) | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a | £286 | n/a | n/a | £359 (-4%) | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a (was £350) | £244 (-10%) | £474 | £615 | £424 | £444 (-2%) | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (68) | £238 | n/a | £438 | n/a | n/a | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.45 (11) | £294 | £243 (-11%) | £474 | £615 | £424 | £444 (-2%) | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | £286 | n/a (was £298) | £358 | n/a | n/a | £373 (-4%) | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.52 (27) | £212 | £242 | £312 | n/a | n/a | £292 (-7%) | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.5 (60) | n/a | n/a | £191 | n/a | n/a | n/a (was £241) | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (86) | n/a | n/a | £210 | n/a | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (71) | n/a | £218 (-5%) | n/a | n/a | n/a | £217 (-3%) | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.54 (37) | n/a | n/a | n/a | n/a | n/a | £308 | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (35.5) | £286 (5) | £243 (5) | £358 (9) | £615 (3) | £424 (3) | £373 (9) | |
| **Ours, PL room/night (status, min stay)** | | | | £212 Booked/Booked (Check-In), min 2 | £242 Booked/Open, min 2 | £215 Open, min 2 | £296 Open, min 3 | £240 Open, min 2/3 | £235 Open, min 2/3 | |
| **Ours, comparable basis** | | | | £212 | £242 | £215 | £296 | £240 | £235 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P0 / -26% | P20 / -0% | P22 / -40% | P0 / -52% | P0 / -43% | P11 / -37% | |

Note: the 8–11 Dec day-on-day changes in brackets compare against 8–10 Dec (2 n) on 28 Oct, which is not like for like.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

**Our Airbnb price is now observed.** Our listing showed in every open-stay search at **4.77 (35)**, up from 4.76 (34) on 24 Oct (policy).
- The displayed all-in, less £195 cleaning, equals exactly **0.765 x PriceLabs** for the stays 8–18 days out (6–9 Nov, 16–18 Nov).
- It equals **0.900 x PriceLabs** for the stays 31–45 days out (29 Nov–3 Dec, 7–9 Dec, 13–16 Dec).
- Worked check, 6–9 Nov: £1,255.29 − £195 = £1,060.29, which is 0.765 x £1,386.
- This confirms open item **a-airbnb-rules** on P05 as well as on P06 (10–12 Nov: £301.65 = 0.765 x £310 + £64.50).
- Yesterday's "PL + £195/n" estimate for P05 overstated our Airbnb price by 10–25%.

**Positioning on open stays:**
- Observed £419 / £427 / £538 / £550 / £596, against comp medians £656 / £819 / £897 / £790 / £887.
- That is **P0 / P33 / P25 / P25 / P25 (avg P22), −36% / −48% / −40% / −30% / −33%**.
- Comp medians rest on 2–4 priced comps; the two 0.55 km 4-bed comps are at £960–£1,020.
- Against NL 4 BR (`market.csv` 29 Oct: P25 479 / P50 579), our open-night prices sit at about P25–P50.
- The booked stays (derived) are P20 / P33 / P50 / P0.

**Supported positioning:**
- `quality_premium(4.77, 4.33)` = +0.15 (capped).
- `recommend(0.786, 0.38, 0.23, 0.15)` returns **raise +25%** ("booked +41% vs market but priced at P23: under-priced"). The 60-day call gives the same (62.7% vs 37%).
- **Reasoning:** P05 books at twice the market and is rated 0.4 stars above the comps, yet it sells on Airbnb at P0–P33.
- Most of the near-term gap (−23.5%) is the Smoobu Airbnb factor, not PriceLabs. With n = 2–4, +25% is a ceiling for 2 Nov, not a step.

**Differentiators:** the comps list parking (4 of 6) and a terrace (3). 912053248917940403 has a lift and a park view, is rated 5.0 and is a Superhost (£777–£834 on open stays). P05 has no lift and no parking.

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 30 Oct–Sun 1 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 6 Nov–Mon 9 Nov (3n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Wed 16 Dec (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.17 (12) | £529 | £421 | £819 | £920 | n/a | £819 | £960 | £1020 | £980 | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.38 (16) | £575 | £509 | £1020 | £1020 | £535 | £1020 | £960 | £1020 | £980 | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 5.0 (27) | £672 | £772 | n/a | n/a | £777 | n/a | £834 | n/a | £795 | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.29 (45) | n/a | n/a | £356 (+1%) | n/a | n/a | n/a | n/a | £344 | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.83 (12) | £400 | n/a | £518 (-2%) | n/a | n/a | £400 | £463 | n/a | £449 | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (27) | £440 | n/a | n/a | n/a | n/a | n/a | n/a | £560 | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.33 (21.5) | £529 (5) | £509 (3) | £669 (4) | £970 (2) | £656 (2) | £819 (3) | £897 (4) | £790 (4) | £887 (4) | |
| **Ours, PL room/night (status, min stay)** | | | | £429 Booked, min 3 | £463 Blocked/Booked (Check-In), min 2/4 | £646 Booked, min 3 | £640 Booked, min 4 | £462 Open, min 2 | £430 Open, min 2 | £543 Open, min 3 | £503 Open, min 2 | £590 Open, min 3 | |
| **Ours, comparable basis** | | | | £426 | £452 | £592 | £674 | £419 obs | £427 obs | £538 obs | £550 obs | £596 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P20 / -20% | P33 / -11% | P50 / -12% | P0 / -30% | P0 / -36% | P33 / -48% | P25 / -40% | P25 / -30% | P25 / -33% | |

## P06 Marylebone 2-bed (3288517): intentional blocks excluded

- **10–12 Nov:** our Airbnb all-in is observed at £301.65, which is exactly the derived 0.765 x PL + £64.50. Against the comp median £347 (n=6) that is **P17, −13%**.
- **8–14 Nov is open** in `prices.csv` 29 Oct (unavailable on 28 Oct). Who opened it is NOT CHECKED (occupancy section).
- Booked stays: 3–5 Nov P50 / −5% (n=4), and 30 Oct–1 Nov P0 / −17% (n=1).
- 24–29 Nov is blocked on purpose and excluded per policy. The comps there are at £478–£635.
- `quality_premium(4.56, 4.64)` = −0.034. `recommend(0.562, 0.45, 0.22, −0.034)` returns **raise +10%**. On the open stay alone (P17) it gives the same.
- **Reasoning:** what is sellable sells ahead of the market, and the one open stay sits in the bottom fifth. +10% gives about £332 all-in, still under the £347 median.
- The 60-day output (fix-listing) is not used, because `forward_occ_60` (15.3%) counts intentional blocks.
- **Differentiators:** 5 of the 12 comps have a lift and 2 are Superhosts (1700204078606711134 at 0.16 km: £312, 4.91, lift). P06 is on the 2nd floor with no lift.

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 30 Oct–Sun 1 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.91 (11) | n/a | n/a | n/a | n/a | £312 | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.65 (20) | £280 | n/a | £296 | n/a | £296 | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a (was £348) | £328 | £348 | n/a | £348 | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | n/a | £478 | n/a | £346 | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.38 (24) | £311 | n/a | £557 | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.73 (52) | £768 | n/a | £894 (-1%) | £1102 (-1%) | £768 | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.57 (21) | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a (was £415) | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.52 (21) | £251 | n/a | £450 | £484 (-2%) | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (53) | n/a (was £487) | n/a | n/a | £651 (+3%) | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.12 (26) | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.87 (86) | n/a | n/a | £565 (-10%) | £619 (-6%) | £374 | parking listed |
| **Comp median (n)** | | | 4.64 (25.0) | £296 (4) | £328 (1) | £478 (7) | £635 (4) | £347 (6) | |
| **Ours, PL room/night (status, min stay)** | | | | £284 Booked, min 2 | £272 Booked, min 2 | £320 Blocked, min 3 | £410 Blocked, min 4 | £310 Open, min 2 | |
| **Ours, comparable basis** | | | | £281 | £273 | £309 | £378 | £302 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P50 / -5% | P0 / -17% | excluded | excluded | P17 / -13% | |

## P08 Islington 2-bed (3318167): sellable to 13 Nov only (handback)

- **5–7 Nov (last open nights before handback):** our Airbnb listing shows a list price of **£273.85/night all-in, then "Special offer −£119.61", for a total of £428.09 (£214/night)**.
  - Against the comp median £318 (n=2: £228 and £408) that is **P0, −32%**. At list price it would be P50, −14%.
  - The offer is −21.8% on a 2-night stay. Policy says all manual Airbnb promotions were removed on 21 Oct and any remaining gap should be flagged as unexplained. **Its origin is NOT CHECKED**: it could be a manual promotion, an Airbnb-side last-minute offer, or a special offer sent to a guest.
- The list factor observed today is (£547.70 − £149) / £433 = **0.921 x PL**, not the 0.85 used on booked stays.
- Booked stays 3–5 Nov and 30 Oct–1 Nov are P50 (derived). 24 and 27 Nov stays fall after the handback and are excluded.
- `quality_premium(4.33, 4.81)` = −0.15. `recommend(0.80, 0.50, 0.33, −0.15)` returns **raise +10%**. The open stay alone (P0) gives the same.
- **Reasoning:** the flat books 30 points ahead of the market and the last open nights are the cheapest in the set once the offer applies. Three reviews cap the premium, but they do not justify a 22% markdown.
- **Differentiators:** ground-floor private terrace. 2 of the 6 comps are Superhost / Guest favourite at 4.98–5.0; both were not available today.

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 30 Oct–Sun 1 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Thu 5 Nov–Sat 7 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | £408 | £408 | £408 | £408 | £408 | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | n/a | £160 (-3%) | £201 | £201 | n/a | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (64) | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1596458903516109468](https://www.airbnb.co.uk/rooms/1596458903516109468) | 1.26 | 5 | 4.0 (10) | n/a | n/a | n/a | n/a | n/a | none listed |
| [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) | 1.22 | 4 | 4.6 (77) | £220 | n/a | n/a | n/a | £228 | none listed |
| **Comp median (n)** | | | 4.81 (27.5) | £314 (2) | £284 (2) | £304 (2) | £304 (2) | £318 (2) | |
| **Ours, PL room/night (status, min stay)** | | | | £204 Booked, min 2 | £204 Booked/Booked (Check-In), min 2 | £239 Blocked, min 3 | £311 Blocked, min 3 | £216 Open, min 2 | |
| **Ours, comparable basis** | | | | £248 | £248 | £278 | £339 | £214 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P50 / -21% | P50 / -13% | excluded | excluded | P0 / -32% | |

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

- PriceLabs room price: £500 / £500 / £500 / £513 (27–28 Nov is 500 / 526), with min stay 3–4. All open.
- Comp medians: £227 / £254 / £290 / £304. That is **P100, +120% / +97% / +73% / +69%**.
- Comp median rating is 4.91 (18.5 reviews). Occupancy is 0% vs 40% market over 30 days (`kpi_pack`).
- Four comps were not priced today (listed above). No positioning, per policy.

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 30 Oct–Sun 1 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.4 (30) | £172 | £202 | £252 | n/a | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.66 (47) | n/a | £208 (-9%) | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (18) | £236 | £260 | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a (was £202) | n/a (was £202) | n/a (was £302) | n/a | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | n/a (was £202) | n/a (was £278) | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | n/a (was £254) | £254 | £290 | £290 | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a (was £345) | n/a | £402 | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (17) | £218 | n/a | n/a | £304 | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (15) | n/a | n/a | £200 | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | £264 | £276 | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.9 (10) | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.91 (18.5) | £227 (4) | £254 (5) | £290 (5) | £304 (3) | |
| **Ours, PL room/night (status, min stay)** | | | | £500 Open, min 3 | £500 Open, min 4 | £500 Open, min 3 | £513 Open, min 4 | |
| **Ours, comparable basis** | | | | £500 | £500 | £500 | £513 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +120% | P100 / +97% | P100 / +73% | P100 / +69% | |

## P17 St John's Wood 1-bed: NOT IN SYSTEMS

Comp medians are £237 / £204 / £236 / £261 (n = 4 / 3 / 5 / 1), with a median rating of 4.56 (49). `kpi_pack` shows no PriceLabs listing mapped. This remains a reference set only.

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 30 Oct–Sun 1 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | £174 | £204 | n/a (was £192) | n/a | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (49) | £311 | n/a | £320 | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.56 (27) | £210 | £210 | £222 (+1%) | £261 (-4%) | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.87 (87) | £264 | n/a | £273 | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.66 (59) | n/a | n/a | £236 (+1%) | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.43 (167) | n/a | n/a | £126 | n/a | parking listed |
| [774061637963678253](https://www.airbnb.co.uk/rooms/774061637963678253) | 0.54 | 3 | 4.5 (34) | n/a | £198 (+1%) | n/a | n/a | Superhost, parking listed |
| **Comp median (n)** | | | 4.56 (49) | £237 (4) | £204 (3) | £236 (5) | £261 (1) | |
| **Ours, PL room/night (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | |

Data gaps:
- **Booking.com: NOT CHECKED** for all six properties (bot check; not bypassed). That leaves P11's Booking.com display price, search position and review count unknown. P11's percentile compares the PL room price with Airbnb all-in comps, so it is biased low; the list-price and NL checks above bound it.
- **Comp activity:** I could not confirm whether comps missing from every stay are inactive. A listing-page/calendar check was refused by this session's permission policy, and I did not work around it. All 55 ids are kept. P11 1515051936255130803 (3rd day missing) has reserve 1423000888558890581, whose capacity is not checked.
- **Thin sets:** P08 has 2 priced comps per stay; P05 has 2–4 on open stays.
- **P08 Airbnb "Special offer" −£119.61 on 5–7 Nov:** origin NOT CHECKED.
- **P08 list factor:** observed once (0.921). Booked-stay factors for P08 (0.85) were not re-observed.
- **P06 8–14 Nov:** the reason it opened is NOT CHECKED.
- **P17** is not in PriceLabs or Smoobu.
- **NL percentiles** are not a comp set. The daily figures use a 1–3 BR mix and a "Host-only fee" structure (cleaning treatment unclear).
