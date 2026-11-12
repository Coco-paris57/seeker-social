# Competitor positioning: CENTRAL/NORTH (D = 2026-11-12)

**Method**
- **Comp ids:** the same kept ids as 11 Nov (comp-central rows in `data/snapshots/2026-11-11/comps.csv`). **No replacement today.**
  - Not returned on any of today's stays (booked or min-stay; inactive is NOT CHECKED): P06 1700204078606711134, 917140285217729256 and 1452940332365117153; P08 693487869095756237, 1289147258305624118, 1409413462916896898, 1497137911142581794 and 1275323094602434212; P14 1075245497252121738 and 1659680062193836633; P17 975294297333089697.
- **Searches:** 77 public Airbnb searches on airbnb.co.uk, checked **2026-11-12 07:20–07:33Z**. Every result page was read, with 0 parse failures and no bot challenge. Map boxes and filters are the same as 25 Oct–11 Nov: entire home, min bedrooms = ours, adults = our sleeps − 1.
  - Script `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c12s/search.py`; raw `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c12/search/*.json`.
  - Day-on-day changes are real: on P11 13–17 Dec, 35 of 115 listings in both days' results changed price. The **kept comps' medians barely moved** (median like-for-like change 0% on almost every stay).
- **Stays priced for every comp and for us:**
  - Fri 13–Sun 15 Nov (next Friday–Sunday).
  - Tue 17–Thu 19 Nov (midweek).
  - **Sat 12–Mon 14 Dec (30 days out).**
  - Kept for day-on-day comparison: 11–13 Dec, 24–26 Nov, 27–29 Nov, 4–6 Dec, 7–9 Dec, 8–10 Dec, 9–11 Dec, 10–12 Dec.
- **Extra stays:**
  - **P11:** **8–15 Dec (reopened)**, **13–17 Dec (darts)**, **15–18 Dec**, 15–19 Dec, 8–11 Dec, 11–14 Dec, 18–20 Nov, 22–26 Nov, 29 Nov–5 Dec, 23–26 Dec, **3–6 Jan**.
  - **P05:** 16–18 Nov, 29 Nov–3 Dec, 13–15 Dec, 21–22 Dec, 29–30 Dec, 20–22 Dec, 28–30 Dec.
  - **P06:** 15–17 Nov, 15–18 Nov, 16–18 Nov.
- **Our prices:** live **Smoobu GET `/api/rates` at 12 Nov 07:19:40Z** (`.../scratchpad/c12/smoobu_rates12.json`). Booked/open status comes from Smoobu `reservations.csv` (12 Nov), confirmed only.
  - Today Smoobu equals PriceLabs `prices.csv` (12 Nov) on every P05, P06 and P11 date I checked.
  - P11 open nights are **+5% to +12% vs yesterday's Smoobu** (for example 18 Nov £150 → £162, 3 Dec £269 → £301, 15 Dec £201 → £215). Yesterday Smoobu lagged PriceLabs on December dates. How the new prices reached Smoobu (push time) is NOT CHECKED here.
- **Price basis:**
  - **Comps:** Airbnb total ÷ nights. Excludes taxes, includes cleaning, after any offer or weekly discount.
  - **P05 and P06:** our own Airbnb listing as seen in the same search (rows in `channel_checks.csv`). Where it was not returned, the price is derived as on 11 Nov (P06: 0.765 × Smoobu + £129 per stay; P05: 0.765 × at ≤28 days out, 0.900 × at 29–56 days, + £195). The P05 factors re-check exactly today: 7–9 Dec £450.55 = 0.765 × 461.5 + 97.5; 21 Dec £2,173.20 = 0.900 × 2,198 + 195.
  - **P11 and P14:** Smoobu room rate, which excludes cleaning while the comps include it. For P11 I also show "+ £149 cleaning ÷ nights" (the Booking.com Camden cleaning fee in the 10 Nov paid total), which is the like-for-like figure.
  - P11 "list" = Smoobu × 1.15 (policy markup). The channel agent found 11 Nov that the Camden Booking.com Standard was Smoobu × ~1.10, so × 1.15 is an upper bound.
  - Whether the Airbnb comp prices include VAT is NOT CHECKED.
- **Booking.com live: NOT CHECKED.** I did not attempt it, because the Booking.com search hit an AWS WAF challenge on 11 Nov and the rules forbid bypassing it. What Booking.com shows today for the reopened 8–15 Dec is therefore NOT CHECKED.
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` (listing, 11–12 Nov): 9 entries, all Reyhan. **Only one is in this batch: P06 3288517 DSO 11–17 Nov −10%, min 2, 11 Nov 17:12:54Z** (replacing the −8% min 2). Nothing on P05, P08, P11 or P14.
  - `get_listing_date_overrides` P11 3064196 (12 Nov–12 Jan): unchanged from 11 Nov. **13–18 Dec −3% min 3** (Reyhan 9 Nov 21:21:47Z); 8–12 Dec −3% min 3; 23–25 Dec +5% min 2; 2–12 Jan −5% min 3; 12–13 Nov min 2 with no price.
- **Positioning:** `rm/positioning.py` `quality_premium` + `recommend`.
  - Occupancy from Smoobu `reservations.csv` (confirmed only). Nights that are unavailable and unbooked are excluded. Windows: 12 Nov–11 Dec (30d) and 12 Nov–10 Jan (60d).
  - Market occupancy from `reports/2026-11-12/kpi_pack.json`.
  - Percentile = mean over open multi-night stays (14d: check-in by 26 Nov; 30d: by 12 Dec).
  - Script `.../scratchpad/c12s/analyse12.py`; output `.../scratchpad/c12/analysis.json`.
- **Commission:** the channel agent's finding stands (Camden 18% = Visibility Booster, expected by policy). Not re-raised.
- **Rows written** under `flock`: **755 comp rows** appended to `data/snapshots/2026-11-12/comps.csv` (`.comps.csv.lock`; already copied forward by another agent) and **9 own-listing rows** to `channel_checks.csv` (`.channel_checks.csv.lock`).

## Summary

| Ref | Comps (n per stay) | Our pct, open stays 14d / 30d / 60d | Rating ours vs comp median; review gap | Booked vs market (Smoobu) | Supported positioning |
|---|---|---|---|---|---|
| **P05 4BR** | 6 (0–4) | **P0 / P8 / P12** | Airbnb 4.77 (35) vs 4.26 (22.5); +12.5 | 30d 73.3% (22/30) vs 43%; 60d 68.3% (41/60) vs 39% | `quality_premium` **+0.15**, so **+15% vs median is supported**. `recommend` **raise +25%** (30d and 60d). **Exception: 21 Dec (£2,198) and 29 Dec (£2,777) single nights sit far above every reference.** |
| **P06 2BR** | 12 (1–4 on open stays) | **P17 / P17 / P17** | 4.58 (12) vs 4.62 (26); −14 | 70.0% (7 of 10 unblocked nights) vs 50% | qp −0.016, so **−2% vs median is supported**. `recommend` **raise +10%**. Open 15–17 Nov stays sit −8% to −16% vs median. |
| P08 2BR | 1 | n/a: nothing to sell | 4.50 vs 4.87 (29) | 100% vs 51% | Moot: booked 8–14 Nov (Smoobu) to the 13 Nov handback. |
| **P11 2BR** | 12 (2–9) | **P14 / P10 / P9** at room price | Booking.com 8.0/10 (policy) vs Airbnb comp median 4.67 (36); not comparable | **30d 42.9% (12 of 28 unblocked) vs 49%** (was 55.6% yesterday; the 8–14 Dec cancellation reopened 7 nights); 60d 41.4% (24/58) vs 39% | qp 0, so **at median (0%) is supported**. `recommend` 30d **"fix-listing", 0%** ("behind market −6% while already at P10"); 60d **raise +5%**. Every open stay is −23% to −45% vs median at room price. |
| P14 1BR | 12 (0–8) | P100 | Not seen on Airbnb; comp median 4.88 (19.5) | 0% vs 46% (kpi_pack; no Smoobu reservation) | Special setup: numbers only. **+29% to +113% vs median.** |
| P17 1BR | 7 (0–3) | n/a | comp median 4.67 (52) | n/a | Not in PriceLabs or Smoobu: reference set only. |

## P11 Camden (3064196; Booking.com only)

**Status (Smoobu 12 Nov):** the Booking.com 8–15 Dec booking (£1,012.86 room, booked 10 Nov) is `cancelled` in `reservations.csv`. **8–14 Dec is back on sale in Smoobu** (`/api/rates` 07:19:40Z: available, min 3) at £261 / £250 / £274 / £329 / £332 / £231 / £208.
- **PriceLabs has not caught up.** `prices.csv` 12 Nov still shows 8 Dec "Booked (Check-In)" and 9–14 Dec "Booked" (booked_adr £120.58). Treat Smoobu as truth: kpi_pack P11 forward_occ_30 0.552 still counts these 7 nights. My Smoobu-based figure is 42.9% ex blocks.
- Who cancelled and why: not in my data (NOT CHECKED here). Booking.com live price for the reopened nights: NOT CHECKED.

### 8–15 Dec (7 nights, reopened): like-for-like vs the same kept comps

| Comp | Rating (reviews) | £/night 8–15 Dec, 5 adults (12 Nov) | vs 11 Nov |
|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) (lift, terrace) | 4.71 (31) | £413.29 | 0% |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) (lift) | 4.50 (12) | £391.00 | 0% |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 4.54 (13) | £391.00 | 0% |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 4.68 (69) | £375.43 | not returned 11 Nov |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) (terrace) | 4.67 (12) | £362.29 | +0.2% |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) (terrace) | 4.55 (38) | £302.14 | −1.7% |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 4.46 (28) | £242.86 | 0% |
| **Median (n = 7)** | | **£375.43** (11 Nov: £376.36, n = 6) | |

| Our figure for 8–15 Dec | £/night | Percentile / vs comp median |
|---|---|---|
| Smoobu room now (£1,885 / 7) | £269.29 | P14 / −28% |
| Smoobu room + £149 cleaning ÷ 7 | £290.58 | P14 / −23% |
| **Policy-expected guest price: Smoobu × 0.85 weekly + cleaning** | **£250.18** | **P14 / −33%** |
| List × 1.15 × 0.85 + cleaning (upper bound) | £284.52 | P14 / −24% |
| **If the same Booking.com stack recurs** (0.5267 × Standard, Standard ≈ Smoobu × 1.10; channel 11 Nov) | **£177.30** | **P0 / −53%** |
| Cancelled booking, as paid incl. cleaning (£1,161.86 / 7) | £165.98 | P0 / −56% |

- **Supported:** qp 0, so **at the comp median**: about **£375/night all-in after the weekly discount**, i.e. about £354 room.
- Today's Smoobu level is P14 even before the weekly discount. A re-sale through the same Booking.com promotion stack would repeat the 10 Nov outcome (about −53%). The stack (a-p11-bcom-stack) is still open; nothing in today's data shows it changed. Stacking itself is settled by policy, so I report only its size.
- **Gap at the policy-expected price:** (£375.43 − £250.18) × 7 = **£876.75 on the week** vs the comp median.

### Darts nights 13–17 Dec (policy: raised by Corentin 21 Oct, average above £300/night)

| Comp | Rating (reviews) | 13–17 Dec £/night (4n, 5 adults) | 15–18 Dec £/night (3n) |
|---|---|---|---|
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) (terrace) | 4.67 (12) | £456.25 | £478.33 |
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) (lift, terrace) | 4.71 (31) | £429.00 | £450.67 |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 4.68 (69) | £406.25 | £416.67 |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) (lift) | 4.50 (12) | £394.00 | £415.67 |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 4.54 (13) | £394.00 | £415.67 |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 4.72 (180) | £350.75 | £363.00 (−4%) |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 4.46 (28) | £281.25 | £291.67 |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 4.44 (61) | £235.00 | £260.33 |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) / [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) (Superhost, lift) | 4.72 (87) / 4.69 (74) | £197.25 (1090…) | £215.00 (6543…) |
| **Median (n)** | | **£394.00 (9)**, same as 11 Nov | **£415.67 (9)** |

| Ours (Smoobu 12 Nov) | £/night | Pct / vs median |
|---|---|---|
| **13–17 Dec room** (£231 / £208 / £215 / £225; **13–14 Dec back on sale**) | **£219.75** | **P11 / −44%** |
| 13–17 Dec room + £149 ÷ 4 cleaning | £257.00 | P22 / −35% |
| 13–17 Dec list × 1.15 + cleaning (upper bound) | £289.96 | P33 / −26% |
| **Policy level £300 room** (+ cleaning £337.25) | £300.00 | **P33 / −24%** (all-in P33 / −14%) |
| 15–18 Dec room (£215 / £225 / £246) | £228.67 | P11 / −45% (all-in £278.34: P22 / −33%) |

- **Policy says darts average above £300/night. Smoobu sells £208–£246 on 13–17 Dec**, so no darts night reaches it. Yesterday the 13–17 Dec average was £215.33 (15–17 only); today it is £219.75 with 13–14 back.
- The cause is the same as yesterday: PriceLabs **13–18 Dec −3% min 3** (Reyhan 9 Nov 21:21:47Z) replaced the darts override (`darts_override_24oct`: leave at +5%). **This is a conflict with a standing decision, still for Corentin to confirm. It is not a new proposal.**
- **Comp evidence backs the policy level and more.** 6 of 9 comps ask more than £300 on 13–17 Dec. £300 room would still be only P33. Supported at the median (qp 0) is **£394 all-in, about £357 room**.
- The two darts nights that were sold (13–14 Dec, £126.94 / £113.24 room) are now unsold again. The ≥£359.82 shortfall booked yesterday no longer applies. The nights can be re-sold at the policy level.

### Other open P11 nights

| Stay (open nights) | Ours room (Smoobu 12 Nov; 11 Nov) | Comp median (n) | Pct / vs median | List × 1.15 |
|---|---|---|---|---|
| 18–20 Nov (18, 19; min 2) | £172.50 (£160.00) | £267.00 (8) | P0 / −35% | £198: P12 / −26% |
| 22–26 Nov (22–25; min 3) | £214.25 (£201.50) | £293.75 (6) | P17 / −27% | £246: P17 / −16% |
| 24–26 Nov | £214.00 (£201.00) | £309.50 (8) | P25 / −31% | £246: P25 / −20% |
| 29 Nov–5 Dec (29 Nov–4 Dec) | £267.33 (£242.33) | £378.83 (3) | P0 / −29% | £307: P0 / −19% |
| 8–11 Dec (reopened) | £261.67 | £395.50 (8) | P0 / −34% | £301: P12 / −24% |
| 11–14 Dec (reopened) | £297.33 | £448.33 (7) | P14 / −34% | £342: P29 / −24% |
| 12–14 Dec (30 days out, reopened) | £281.50 | £477.50 (7) | P14 / −41% | £324: P29 / −32% |
| 15–19 Dec (15–18) | £247.25 (£233.50) | £413.38 (8) | P0 / −40% | £284: P25 / −31% |
| 23–26 Dec (min 2; +5% DSO) | £282.67 (£266.00) | £365.34 (6) | P0 / −23% | £325: P33 / −11% |
| **3–6 Jan (3 Jan, min 3; −5% DSO)** | **£196.67** (£182 / £196 / £212) | **£282.50 (8)** | **P12 / −30%** | £226: P25 / −20% |

- **3 Jan** is the check-in day after the 26 Dec–3 Jan stay. It is open with min 3, so it is not an orphan. £182 on 3 Jan is below every comp's 3–6 Jan nightly (the cheapest is 1090528454481682946, 4.72, at £195). The 3-night stay at £196.67 is above only that comp. All-in with cleaning the stay is £246.34 (P25 / −13%). **Supported (median, qp 0) is about £282.50 all-in, about £233 room.**
- **12–13 Nov** is still closed with no Smoobu reservation (t-p11-1013block). 12 Nov is tonight, so it is effectively lost. The cause is NOT CHECKED.
- **Positioning:**
  - `quality_premium` = 0 (no Airbnb rating to compare).
  - `recommend(0.429, 0.49, 0.10, 0)` → **"fix-listing", 0%**. `recommend(0.414, 0.39, 0.09, 0)` → **raise +5%** (60d).
  - The 30d "fix-listing" result is driven by the 7 reopened nights; it does not support a cut. P11 is already P10. All 7 comps priced on 8–15 Dec are still bookable for the full week at £243–£413, 5 of them at £362 or more.
  - **Supported: at the comp median (0%).** At room price the open stays sit 23–45% under the median; even with cleaning added they sit 13–35% under. No price cut is supported.
- **Differentiators:** P11 is a basement flat with a patio. Of the 12 comps, 4 have a lift and 3 have a terrace or balcony.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Gap (stay) | Smoobu room/night (min) | Ours, Airbnb all-in/night (observed) | Kept comp median (n) | Pct / vs median | All ≥10-review 4BR in search (n) | NL 4BR (market.csv 12 Nov) |
|---|---|---|---|---|---|---|
| **7–8 Dec** (7–9 Dec) | £471 / £452 (min 2), unchanged | **£451** | £807.50 (4) | **P25 / −44%** | £595 (5): −24% | P50 £580, P75 £726 |
| **13–14 Dec** (13–15 Dec) | £518 / £505 (min 2), unchanged | **£558** | £850.00 (4) | **P25 / −34%** | £680 (5): −18% | as above |
| **21 Dec** (1 night) | **£2,198** (min 1) (was £2,230) | **£2,174** | **n = 0** kept. Overlapping 20–22 Dec: kept £1,020 (3) | **+113% vs £1,020** | 21–22 Dec: **0**; 20–22 Dec: £792.50 (5) → **+174%** | **+82% vs P90 £1,196** |
| **29 Dec** (1 night) | **£2,777** (min 1) (was £2,786) | **£2,695** | **n = 0** | n/a | **0** (only two 0-review 4BR at £2,132 / £2,399) | **+125% vs P90 £1,196** |

- **21 Dec:**
  - Supported (+15% vs median) is about **£911–£1,173 all-in**, which is **about £796–£1,087 Smoobu room** (all-in = 0.900 × room + £195).
  - Today's £2,198 is 2.0–2.8× that. It comes from Reyhan's +300% DSO (9 Nov; no P05 log entries 11–12 Nov). It is the open action a-p05-dec, not re-raised as new.
- **29 Dec:** price position is unknown, because no qualifying comp is bookable that night. £2,777 rests on no comp evidence.
- **7–8 and 13–14 Dec:** both are still unsold at P25, and Smoobu has not moved.
  - `recommend` +25% would put Smoobu at about £589 / £565 and £648 / £631. Even that stays under the kept median.
  - Against the broader ≥10-review 4BR median (£595 / £680), +15% means about £684 / £782 all-in, which is about £767 and £761 Smoobu room.
  - Either way, **a rise of at least +25% is supported**. Caveat: two comps rated 4.15 / 4.24 ask £1,020 and set the top of the kept set (n = 4).
- **Other open P05:**
  - 16–18 Nov £395.50 observed vs £419 (3): P0 / −6%.
  - 29 Nov–3 Dec £435.50 observed vs £620.13 (4): P0 / −30%.
- **Positioning:** `quality_premium(4.77, 4.26)` = +0.15 (cap). `recommend(0.733, 0.43, 0.08, 0.15)` → **raise +25%**. `recommend(0.683, 0.39, 0.12, 0.15)` → **raise +25%**.
- **Differentiators:** 912053248917940403 is a Superhost with a lift and park view (4.97; not returned today). 1639043256346803626 is a Superhost house with a terrace (4.89; £595 on 7–9 Dec, £680 on 13–15 Dec). Three comps list parking.

## P06 Marylebone 2-bed (3288517): open nights only (intentional blocks from 22 Nov excluded)

| Stay | Ours, Airbnb all-in/night | Comp median (n) | Pct / vs median | Supported (−2%) | Smoobu room (12 Nov; 11 Nov) |
|---|---|---|---|---|---|
| 15–17 Nov | £252.00 observed | £280.00 (1) | P0 / −10% | about £274 | £245 / £245 (£237 / £238) |
| 15–18 Nov | £233.00 observed | £252.17 (2) | P50 / −8% | about £247 | £245 / £245 / £254 |
| 16–18 Nov | £255.50 observed | £297.50 (2) | P0 / −14% | about £292 | £245 / £254 |
| 17–19 Nov (only the 17th is open) | £273.73 derived | £326.50 (4) | P0 / −16% | – | £254 / booked |

- **11 Nov passed unsold** (the 1-night gap at min 2 that I flagged 11 Nov). 12–14 Nov is booked; **15–17 Nov (3 nights) is the only open inventory before the 22 Nov blocks**.
- Reyhan's new DSO, **11–17 Nov −10% min 2** (11 Nov 17:12:54Z), cut the override from −8%. Even so, Smoobu rose £237 → £245 on 15 Nov, so the underlying PriceLabs price moved up. **The comps do not support the cut.** At observed £233–£256 we are P0–P50, −8% to −16% vs median.
- Kept-comp availability is thin: n = 1–2. 1315177393080154583 cut 15–18 Nov by 6% to £224.33. 1399094207699964827 cut 16–18 Nov by 2% to £315.
- **Positioning:** `quality_premium(4.58, 4.62)` = −0.016. `recommend(0.70, 0.50, 0.17, −0.016)` → **raise +10%**. This rests on 10 unblocked nights, so it is a thin sample.
  - **Supported: −2% vs median**, i.e. about +8% to +14% on 15–17 Nov.
  - With 3 nights left and n = 1–2 comps, the money at stake is small (about £40–£75 on the stay).

## P08 Islington 2-bed (3318167): handback 13 Nov, nothing left to sell
- Booked 8–14 Nov (Airbnb, Smoobu). 13 Nov is the policy last night. No proposal.
- The only comp returned for 13–15 Nov is 28354043 at £408.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- Smoobu: **£450** on 12 Nov–3 Dec. 4 Dec £470, 5 Dec £532, 6–10 Dec £450, 11 Dec £572, 12 Dec £647. Late December £451–£774; 3–8 Jan £450. Min 3–4.
- Booked: **0% vs market 46%** at 30d (kpi_pack; no P14 reservation in Smoobu).
- Minimum 500 → 450 (Reyhan, 9 Nov) is unchanged. The conflict with the special setup was already reported for Corentin. Not re-raised.

| Stay | Ours (Smoobu room) | Comp median (n) | Pct / vs median |
|---|---|---|---|
| 13–15 Nov | £450 | n/a (0) | n/a |
| 17–19 Nov | £450 | £236.50 (7) | P100 / +90% |
| 24–26 Nov | £450 | £252.50 (6) | P100 / +78% |
| 27–29 Nov | £450 | £348.50 (2) | P100 / +29% |
| 4–6 Dec | £501 | n/a (0) | n/a |
| 7–9 Dec | £450 | £265.00 (8) | P100 / +70% |
| 8–10 Dec | £450 | £270.75 (8) | P100 / +66% |
| 9–11 Dec | £450 | £277.50 (7) | P100 / +62% |
| 10–12 Dec | £511 | £289.50 (7) | P100 / +77% |
| 11–13 Dec | £609.50 | £286.50 (5) | P100 / +113% |
| 12–14 Dec (30 days out) | £579.50 | £289.50 (5) | P100 / +100% |

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)
- Comp medians: 13–15 Nov £248.25 (2), 17–19 Nov £182.50 (2), 24–26 Nov £200 (2), 4–6 Dec £300 (1), 7–9 Dec £228.50 (3), 8–10 Dec £228.50 (3), 9–11 Dec £245 (3), 10–12 Dec £245.75 (2), 11–13 Dec £332.50 (2), 12–14 Dec £317.75 (2). 27–29 Nov: n = 0.
- Comp rating median 4.67 (52).

## Comp tables

**Source for every comp row:** Airbnb public search, checked 2026-11-12 07:20–07:33Z.
- Nightly price excludes taxes, includes cleaning and is after offers.
- (±%) is the change vs 11 Nov for the same stay. "n/a" means the listing was not returned (booked or min-stay).
- The "Ours" rows use the live Smoobu rate (12 Nov 07:19Z).
- P11 8–14 Dec shows as Open: the 8–15 Dec Booking.com booking is cancelled in Smoobu.

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Sun 13 Dec–Tue 15 Dec (2n) | Mon 21 Dec–Tue 22 Dec (1n) | Tue 29 Dec–Wed 30 Dec (1n) | Sun 20 Dec–Tue 22 Dec (2n) | Mon 28 Dec–Wed 30 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.15 (13) | £419 | £419 | £1020 | £1020 | £509 | £920 | £1020 | £1020 | £1020 | £1020 | £1020 | £419 | £960 | £1020 | n/a | n/a | £1020 | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | £519 | £476 | £1020 | £1020 | £476 | n/a | £1020 | £1020 | £1020 | £1020 | £1020 | £498 | £552 | £1020 | n/a | n/a | £1070 | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (29) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £688 | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.28 (46) | n/a | £266 (-2%) | n/a | n/a | £313 (-1%) | n/a | n/a | £317 (-4%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | n/a | £400 | n/a | n/a | £454 (-4%) | n/a | n/a | n/a | n/a | n/a | n/a | £400 | £474 (+1%) | £450 (-2%) | n/a | n/a | £571 (-1%) | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (28) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £595 | £595 | n/a | n/a | n/a | n/a | £680 | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.26 (22.5) | £469 (2) | £409 (4) | £1020 (2) | £1020 (2) | £465 (4) | £920 (1) | £1020 (2) | £808 (4) | £1020 (3) | £1020 (2) | £1020 (2) | £419 (3) | £620 (4) | £850 (4) | n/a (0) | n/a (0) | £1020 (3) | n/a (0) | |
| **Ours, Smoobu live rate/night 12 Nov 07:19Z (status, min stay)** | | | | £497 Booked (Smoobu), min 4 | £451 Booked (Smoobu)/Open, min 2/3 | £588 Booked (Smoobu)/Open, min 2/3 | £636 Booked (Smoobu), min 3 | £546 Booked (Smoobu), min 3 | £578 Booked (Smoobu), min 4 | £578 Booked (Smoobu), min 4 | £462 Open, min 2 | £499 Booked (Smoobu)/Open, min 2/3 | £563 Booked (Smoobu), min 3 | £597 Booked (Smoobu), min 3 | £389 Open, min 2 | £505 Open, min 3 | £512 Open, min 2 | £2198 Open, min 1 | £2777 Open, min 1 | £1434 Booked (Smoobu)/Open, min 1/2 | £1790 Booked (Smoobu)/Open, min 1/3 | |
| **Ours, comparable basis** | | | | £478 | £443 | £626 | £669 | £515 | £540 | £540 | £451 obs | £479 | £528 | £554 | £396 obs | £436 obs | £558 obs | £2174 obs | £2695 obs | £1389 | £1709 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P50 / +2% | P75 / +8% | P0 / -39% | P0 / -34% | P100 / +11% | P0 / -41% | P0 / -47% | P25 / -44% | P0 / -53% | P0 / -48% | P0 / -46% | P0 / -6% | P0 / -30% | P25 / -34% | n/a | n/a | P100 / +36% | n/a | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Sun 15 Nov–Wed 18 Nov (3n) | Sun 15 Nov–Tue 17 Nov (2n) | Mon 16 Nov–Wed 18 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.58 (12) | n/a | n/a (was £286) | n/a | n/a | n/a | n/a | n/a | n/a (was £420) | n/a (was £420) | n/a (was £440) | n/a | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.71 (24) | n/a | £280 | n/a | n/a | £296 | n/a | n/a | n/a | n/a | n/a | £296 | £280 | £280 | £280 | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | £328 | n/a | n/a | £348 | n/a | n/a | £358 | £358 | £358 | n/a | n/a | n/a | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | £326 (-2%) | n/a | n/a | n/a | n/a | n/a | n/a | £398 | £402 | n/a | n/a | n/a | £315 (-2%) | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | n/a | n/a | n/a | n/a | £397 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (53) | n/a | n/a | £1360 | £1471 (+4%) | n/a | £1336 (+1%) | £1510 (+1%) | £1200 (+1%) | £1200 (+1%) | £1292 (+1%) | £1431 (+4%) | n/a | n/a | n/a | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | £548 | n/a | £460 (-6%) | £578 (-1%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.55 (22) | n/a | n/a | £468 | n/a (was £502) | £412 (-9%) | £461 (+1%) | £476 (-1%) | £396 (-3%) | £404 | £422 (+1%) | £460 | £224 (-6%) | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | n/a | n/a | £790 (-3%) | £658 (-2%) | £693 (-2%) | £628 (-1%) | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | £364 (+2%) | n/a | n/a | £402 (-1%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a (was £344) | parking listed |
| **Comp median (n)** | | | 4.62 (26.0) | n/a (0) | £326 (4) | £548 (3) | £1471 (1) | £400 (6) | £578 (3) | £790 (3) | £528 (4) | £404 (5) | £422 (5) | £460 (3) | £252 (2) | £280 (1) | £298 (2) | |
| **Ours, Smoobu live rate/night 12 Nov 07:19Z (status, min stay)** | | | | £293 Booked (Smoobu), min 2 | £274 Booked (Smoobu)/Open, min 2 | £496 Blocked, min 4 | £516 Blocked, min 4 | £366 Blocked, min 3 | £456 Blocked, min 4 | £490 Blocked, min 4 | £392 Blocked, min 3 | £386 Blocked, min 3 | £412 Blocked, min 3 | £466 Blocked, min 3/4 | £248 Open, min 2 | £245 Open, min 2 | £250 Open, min 2 | |
| **Ours, comparable basis** | | | | £289 | £274 | £444 | £460 | £344 | £413 | £440 | £364 | £359 | £380 | £421 | £233 obs | £252 obs | £256 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P0 / -16% | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | P50 / -8% | P0 / -10% | P0 / -14% | |

### P08

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 13 Nov–Sun 15 Nov (2n) | Differentiators |
|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | £408 | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | n/a | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (66) | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) | 1.22 | 4 | 4.6 (77) | n/a | none listed |
| [1497137911142581794](https://www.airbnb.co.uk/rooms/1497137911142581794) | 0.8 | 4 | 4.91 (23) | n/a | Superhost, house (2-bedroom cottage) |
| **Comp median (n)** | | | 4.87 (29.0) | £408 (1) | |
| **Ours, Smoobu live rate/night 12 Nov 07:19Z (status, min stay)** | | | | £256 Blocked/Booked (Smoobu), min 2 | |
| **Ours, comparable basis** | | | | £270 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | |

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Tue 8 Dec–Tue 15 Dec (7n) | Sun 13 Dec–Thu 17 Dec (4n) | Tue 15 Dec–Fri 18 Dec (3n) | Tue 15 Dec–Sat 19 Dec (4n) | Wed 18 Nov–Fri 20 Nov (2n) | Sun 22 Nov–Thu 26 Nov (4n) | Sun 29 Nov–Sat 5 Dec (6n) | Wed 23 Dec–Sat 26 Dec (3n) | Sun 3 Jan–Wed 6 Jan (3n) | Tue 8 Dec–Fri 11 Dec (3n) | Fri 11 Dec–Mon 14 Dec (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.71 (31) | £287 | n/a (was £306) | £545 | £589 | £440 | n/a | £440 | £440 | £440 | £486 | £550 | £413 | £429 | £451 | £456 | £306 | £404 | £392 | n/a | £273 | £447 | £529 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £374 | £374 | £374 | n/a | n/a | £351 | £363 (-4%) | £357 (-7%) | n/a | n/a | n/a | £392 (-11%) | £308 (-5%) | £359 | n/a | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | £272 | £510 | £554 | £272 | n/a | £544 | £463 | £454 | £470 | £516 | £391 | £394 | £416 | £420 | £272 | n/a | £379 | n/a | n/a | £444 | £494 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a | n/a | £438 | £438 | £338 | n/a | n/a | £438 | £438 | £438 | £438 | £375 | £406 | £417 | £406 | n/a | £306 | n/a (was £296) | £417 | £417 | £417 | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.54 (13) | n/a | n/a (was £282) | £510 | £554 | £306 | £342 | n/a (was £342) | £463 | £454 | £470 | £516 | £391 | £394 | £416 | £420 | £282 | £270 | n/a (was £294) | n/a | £247 | £444 | £494 | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | £310 (-2%) | £268 | £478 | £478 | £508 | £484 (+1%) | £478 | £388 | £388 | £412 | £456 | £362 | £456 | £478 | £472 | £292 | £464 | £368 | £501 | £371 | £374 | £448 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a | £212 | £312 | £312 | £312 | n/a | n/a | £312 | £312 | £312 | £312 | £243 | £281 | £292 | £281 | £262 | £281 | n/a | £292 | £292 | £292 | £292 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.44 (61) | n/a | n/a | n/a | n/a | £191 | n/a | n/a | n/a | £241 | n/a | n/a | n/a | £235 | £260 | £270 | £191 | £185 | n/a | £307 | n/a | n/a | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (87) | n/a | n/a | n/a | n/a | £184 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £197 (+1%) | n/a | n/a | n/a | n/a | n/a | n/a | £195 | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (74) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £212 (+5%) | n/a | n/a | n/a | n/a | n/a | £215 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.55 (38) | n/a | n/a (was £239) | n/a | n/a | n/a | n/a | n/a | n/a | £307 (-2%) | £330 (-2%) | n/a | £302 (-2%) | n/a | n/a | n/a | £250 (-3%) | n/a | n/a | £339 | £217 (+1%) | £310 (-2%) | £336 (-2%) | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | £250 | £280 | £280 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £212 | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (36.0) | £298 (2) | £259 (4) | £478 (7) | £478 (7) | £310 (8) | £414 (2) | £478 (3) | £412 (8) | £388 (9) | £424 (8) | £486 (6) | £375 (7) | £394 (9) | £416 (9) | £413 (8) | £267 (8) | £294 (6) | £379 (3) | £365 (6) | £282 (8) | £396 (8) | £448 (7) | |
| **Ours, Smoobu live rate/night 12 Nov 07:19Z (status, min stay)** | | | | £254 Blocked/Booked (Smoobu), min 2 | £175 Booked (Smoobu)/Open, min 2 | £282 Open, min 3 | £330 Open, min 3 | £214 Open, min 3 | £325 Booked (Smoobu), min 3 | £353 Booked (Smoobu)/Open, min 3 | £262 Booked (Smoobu)/Open, min 3 | £256 Open, min 3 | £262 Open, min 3 | £302 Open, min 3 | £269 Open, min 3 | £220 Open, min 3 | £229 Open, min 3 | £247 Open, min 3 | £172 Open, min 2 | £214 Open, min 3 | £267 Open, min 3 | £283 Open, min 2 | £197 Open, min 3 | £262 Open, min 3 | £297 Open, min 3 | |
| **Ours, comparable basis** | | | | £254 | £175 | £282 | £330 | £214 | £325 | £353 | £262 | £256 | £262 | £302 | £269 | £220 | £229 | £247 | £172 | £214 | £267 | £283 | £197 | £262 | £297 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = Smoobu x 1.15 (before promotions)** | | | | £293 P50 / -2% | £201 P0 / -22% | £324 P29 / -32% | £380 P29 / -20% | £246 P25 / -20% | £374 P50 / -10% | £406 P0 / -15% | £301 P12 / -27% | £294 P11 / -24% | £301 P0 / -29% | £347 P17 / -29% | £310 P29 / -18% | £253 P22 / -36% | £263 P22 / -37% | £284 P25 / -31% | £198 P12 / -26% | £246 P17 / -16% | £307 P0 / -19% | £325 P33 / -11% | £226 P25 / -20% | £301 P12 / -24% | £342 P29 / -24% | Smoobu Booking.com markup +15% (policy) |
| **Our percentile / vs median** | | | | P0 / -15% | P0 / -32% | P14 / -41% | P29 / -31% | P25 / -31% | P0 / -21% | P0 / -26% | P12 / -36% | P11 / -34% | P0 / -38% | P0 / -38% | P14 / -28% | P11 / -44% | P11 / -45% | P0 / -40% | P0 / -35% | P17 / -27% | P0 / -29% | P0 / -23% | P12 / -30% | P0 / -34% | P14 / -34% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | £182 (-10%) | n/a | n/a | £202 | n/a | n/a | £202 | £202 | n/a (was £202) | n/a | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | £352 | n/a (was £352) | £352 | £428 | n/a | £352 | £352 | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | £236 | £253 | £260 | n/a | n/a | n/a | £246 | £246 | £246 | £253 | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | £182 | £302 | £302 | £252 | n/a | n/a | £302 | £302 | £302 | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | £182 (-10%) | £278 | £278 | £252 | n/a | n/a | £278 | £278 | £278 | £278 | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | n/a | £290 | £290 | £290 | n/a | n/a | n/a | n/a | n/a | n/a (was £290) | £290 | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | n/a | n/a | n/a | £368 | n/a | n/a | £402 | £402 | £402 | £402 | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (20) | n/a | n/a | n/a | £286 (-1%) | n/a | £270 (-2%) | n/a | £252 (-1%) | £264 (-1%) | £260 (-1%) | £266 (-1%) | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (17) | n/a | n/a | n/a | n/a | n/a (was £200) | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | £264 | n/a | n/a | n/a | n/a | n/a | £241 | £241 | £241 | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | n/a | £238 | n/a | n/a | £238 | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.88 (19.5) | n/a (0) | £236 (7) | £290 (5) | £286 (5) | £252 (6) | £348 (2) | n/a (0) | £265 (8) | £271 (8) | £278 (7) | £290 (7) | |
| **Ours, Smoobu live rate/night 12 Nov 07:19Z (status, min stay)** | | | | £450 Open, min 4 | £450 Open, min 3 | £580 Open, min 4 | £610 Open, min 4 | £450 Open, min 3 | £450 Open, min 4 | £501 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3 | £511 Open, min 3/4 | |
| **Ours, comparable basis** | | | | £450 | £450 | £580 | £610 | £450 | £450 | £501 | £450 | £450 | £450 | £511 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P100 / +90% | P100 / +100% | P100 / +113% | P100 / +78% | P100 / +29% | n/a | P100 / +70% | P100 / +66% | P100 / +62% | P100 / +76% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | £204 | £174 | n/a | n/a | n/a (was £174) | n/a | n/a | £192 | £192 | £192 | £199 | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (52) | n/a | n/a | £334 | £343 (-1%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | n/a | n/a | n/a | n/a | £300 | £248 | £242 | £245 | n/a | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | £292 | n/a | £302 | £322 | £234 | n/a | n/a | n/a | n/a | £257 | £292 | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.67 (61) | n/a | n/a | n/a | n/a | £166 (-4%) | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.74 (27) | n/a | £190 | n/a | n/a | n/a | n/a | n/a | £228 | £228 | n/a | n/a | none listed |
| **Comp median (n)** | | | 4.67 (52) | £248 (2) | £182 (2) | £318 (2) | £332 (2) | £200 (2) | n/a (0) | £300 (1) | £228 (3) | £228 (3) | £245 (3) | £246 (2) | |
| **Ours, Smoobu live rate/night 12 Nov 07:19Z (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | |

Data gaps:
- **Booking.com live prices: NOT CHECKED.** WAF challenge on 11 Nov, not bypassed. That includes the price now shown for the reopened P11 8–15 Dec and whether the same promotion stack would apply.
- **Who cancelled P11 8–15 Dec and why: NOT CHECKED here.** It is in the Dispatcher/channel scope.
- **PriceLabs still shows P11 8–14 Dec as booked** (`prices.csv` 12 Nov). The kpi_pack P11 forward occupancy overstates for that reason; Smoobu is used as truth here.
- **P11 Smoobu rates +5% to +12% overnight:** the push time that delivered them is NOT CHECKED.
- **Whether Airbnb comp prices include VAT: NOT CHECKED.** P11 and P14 are compared at room price (cleaning excluded) plus a cleaning-added figure for P11.
- **P11 has no Airbnb rating,** so `quality_premium` is 0 by construction.
- **Thin samples:** P06 n = 1–2 comps on open stays and only 10 unblocked nights. P05 n = 0 on 21 and 29 Dec. P14 n = 0 on 13–15 Nov and 4–6 Dec.
- **Kept comps not returned on any stay** (listed in Method): whether they are inactive is NOT CHECKED, so none was replaced.
- **P11 12–13 Nov block cause: NOT CHECKED.**
- **P17 is not in PriceLabs or Smoobu:** reference set only.
