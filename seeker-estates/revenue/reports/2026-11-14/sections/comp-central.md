# Competitor positioning: CENTRAL/NORTH (D = 2026-11-14)

**Method**
- **Policy read first** (`data/policy.json`). Not re-raised: P06 intentional blocks (nights from 30 Nov), P14 special setup, Booking.com stacking (size only), Camden Visibility Booster 18%, 15%/20% stay discounts, Booking.com markup +10% (12 Nov), `darts_override_24oct`, P08 handback (last night 13 Nov).
- **Commission:** I use the channel agent's finding (Camden ~18% = Visibility Booster, expected). Arithmetic only: £135.77 = 18.0% of £605.29 + £149; £182.27 = 18.0% of £863.61 + £149. Not re-raised.
- **Comp ids:** the same ids kept on 13 Nov (comp-central rows in `data/snapshots/2026-11-13/comps.csv`). **No replacement today.** Not returned on any of today's stays, for the second day running (booked or min-stay; whether inactive is NOT CHECKED): P06 917140285217729256 and 1452940332365117153; P14 1075245497252121738 and 1659680062193836633; P17 975294297333089697. **P08: not searched** (handback, no inventory after 13 Nov).
- **Searches:** 95 public Airbnb searches on airbnb.co.uk, **checked 2026-11-14 07:20:10–07:35:37Z**. 0 parse failures, no bot challenge. Same map boxes and filters as 25 Oct–13 Nov (entire home, min bedrooms = ours, adults = sleeps − 1). Script `.../scratchpad/c14s/search.py`; raw `.../scratchpad/c14/search/*.json`; analysis `.../scratchpad/c14s/analyse14.py`, `extra14.py` → `.../scratchpad/c14/analysis.json`.
- **Stays priced for every comp and for us:** Fri 20–Sun 22 Nov (next Fri–Sun), Tue 17–Thu 19 Nov (midweek), **Mon 14–Wed 16 Dec (30 days out)**, plus the 13 Nov stays repeated for day-on-day.
  - P11 extras: **28 Nov–2 Dec and 9–14 Dec (the two new bookings)**, 13–14 Dec (darts night), 13–17 Dec, 22–27 Nov, 22–26 Nov, 26–28 Nov, 2–5 Dec, 8–9 Dec, 14–19 Dec, 15–18 Dec, 18–20 Nov, 23–26 Dec, 3–4 Jan, 3–6 Jan.
  - P06 extras: **24–29 Nov (new booking)**, 22–24 Nov, 22–29 Nov, 29–30 Nov, 15–18, 15–17, 16–18 Nov.
  - P05 extras: 7–9 Dec, 13–15 Dec, 21–22 Dec, 29–30 Dec, 20–22 Dec, 28–30 Dec, 16–18 Nov, 29 Nov–3 Dec, 7–8 and 13–14 Dec (1 night).
- **Our prices:** live **Smoobu GET `/api/rates` 14 Nov 07:19:36Z** (`.../scratchpad/c14/smoobu_rates14.json`); equal to `prices.csv` 14 Nov on every night used. Booked/open from Smoobu `reservations.csv` 14 Nov (confirmed only). Booked stays use Smoobu basePrice (room only, cleaning excluded).
- **Price basis:** comps = Airbnb total ÷ nights, excl. taxes, **cleaning included**, after offers. P05/P06 = our own Airbnb listing seen in the same search where returned (`channel_checks.csv`), else derived 0.765 × Smoobu + cleaning/n (P05 0.900 at 29–56 days). Re-verified today: P06 15–18 Nov £616.30 = 0.765 × £637 + £129; P06 22–24 Nov £566.58 = 0.765 × £572 + £129. P11/P14 = Smoobu room; P11 also "+ £149 cleaning ÷ n" and "list" (× 1.10). Airbnb VAT inclusion: NOT CHECKED.
- **Booking.com live: NOT CHECKED** (AWS WAF on 11–12 Nov; not attempted, not bypassed).
- **PriceLabs (read-only, one call at a time):** `get_user_logs` listing 13–14 Nov: **0 entries**. `get_listing_prices` P11 3064196 (18 Nov–19 Dec) and P06 3288517 (15–30 Nov).
- **Rows written** under `flock`: **949 comp rows** (359 priced) appended to `data/snapshots/2026-11-14/comps.csv` (file already existed, copied forward by another agent); **9 own-listing rows** to `channel_checks.csv`.

## Summary

| Ref | Comps (n per stay) | Our pct, open stays 14d / 30d / 60d | Rating ours vs comp median; review gap | Booked vs market (Smoobu) | Supported positioning |
|---|---|---|---|---|---|
| **P11 2BR** | 12 (1–11) | **P10 / P6 / P5** at room price | Booking.com 8.0/10 (policy, 21 Oct) vs Airbnb comp median 4.67 (36): not comparable; gap NOT CHECKED | 30d **60.0%** (18/30) vs 50%; 60d 50.0% (30/60) vs 39% | qp 0 → **at the comp median (0%)**. `recommend` 30d raise +5%, 60d raise +10%. Both new bookings sold at **P0, −49% to −62% vs kept median** (room). |
| **P05 4BR** | 6 (0–5) | P0 / P12 / P12 | Airbnb 4.77 (35) vs 4.26 (22.5); +12.5 | 30d 70.0% (21/30) vs 45%; 60d 65.0% (39/60) vs 39% | qp **+0.15** → **+15% vs median**; `recommend` raise +25% (30d, 60d). 21 and 29 Dec single nights: no comp support. |
| **P06 2BR** | 12 (0–7) | P0 / P0 / P0 | 4.58 (12) vs 4.62 (26); −14 | **62.5% (10/16)** vs 50% (14 blocked nights excluded) | qp −0.016 → **−2% vs median**; `recommend` raise +10% (30d and 60d). 24–29 Nov sold at **−38% vs same-stay comp (n = 1), −44% vs 24–26 Nov median (n = 6)**. |
| P08 2BR | not searched | n/a | – | handback 13 Nov | Moot (policy handback). |
| P14 1BR | 12 (0–9) | P100 | not seen on Airbnb; comp median 4.88 (19.5) | 0% vs 48% (kpi_pack) | Special setup: numbers only. **+36% to +90% vs median.** |
| P17 1BR | 7 (0–5) | n/a | comp median 4.68 (52) | n/a | Not in PriceLabs/Smoobu: reference set only. |

**Day-on-day:** the kept comps did not move (median like-for-like change **0%** on every repeated stay, all refs). **Our prices moved down** on the near nights: P11 18–19 and 22–28 Nov −11% (e.g. 22 Nov £207 → £184; 27 Nov £293 → £261), P06 15–29 Nov −5% to −28% (22 Nov £346 → £282; 28 Nov £445 → £328; 29 Nov £382 → £274). No user log; base/min/max unchanged. In live PriceLabs these nights now show `price` (sent to Smoobu) below `user_price` (P11 22 Nov 184 vs 207; P06 28 Nov 328 vs 445). Cause NOT CHECKED (PriceLabs auditor).

## P11 Camden (3064196; Booking.com only)

**PriceLabs has not registered the two new bookings.** Live `get_listing_prices` (last refreshed **13 Nov 10:47:05Z**) shows 28 Nov–1 Dec and 9–13 Dec with empty booking_status and a user_price; `prices.csv` 14 Nov agrees (available True). Smoobu shows them unavailable. 26–27 Nov are open in both (reopened by the 26–29 Nov cancellation; Smoobu had them unavailable on 13 Nov).

### The two new Booking.com stays vs what comps charge for the same dates

| Stay | Ours paid (Smoobu basePrice) | + £149 cleaning ÷ n | Kept comp median (n) | Wider sample: all 2BR, ≥10 reviews, same search (n) | Pct / vs kept median | vs wider median |
|---|---|---|---|---|---|---|
| **28 Nov–2 Dec (4n)**, booked 13 Nov | **£151.32** | £188.57 | £373.75 (**1**: 1675590787835266115, 4.67) | £321.38 (8; range £237.50–£454) | **P0 / −60%** (all-in −50%) | room −53%, all-in **−41%** |
| **9–14 Dec (5n)**, booked 14 Nov | **£172.72** | £202.52 | **£455.60 (5)** | £340.00 (17; range £265.20–£486.60) | **P0 / −62%** (all-in −56%) | room −49%, all-in **−40%** |

- Kept comps 9–14 Dec: 1542815721953379556 (4.71, 31) £482.80; 1543632408013225027 (4.50, 12) £455.60; 1542960049319560709 (4.54, 13) £455.60; 1159915905276842600 (4.68, 69) £400.00; 1568808216094734994 (4.55, 38) £318.80. **Every one of the 17 wider-sample 2BRs was above our all-in figure.**
- **Paid vs Smoobu list:** 9–14 Dec £863.61 = **0.694 × (Smoobu £1,132 × 1.10)**; 28 Nov–2 Dec £605.29 = 0.693 × (£794 × 1.10) on today's Smoobu, or 0.666 × (£826 × 1.10) on the 13 Nov 07:21Z Smoobu (28 Nov £292 vs £260 now; which one applied at booking is NOT CHECKED). The size of the stack is for the channel agent (a-p11-bcom-stack); I do not re-raise it.
- **Darts night 13 Dec (policy: average above £300/night):** sold inside the 9–14 Dec stay. Its pro-rata share is **about £141.90 room** (Smoobu £186 × £863.61 / £1,132). Comps for 13–14 Dec (1 night): kept median **£253 (3)**, wider £254 (10); 13–17 Dec kept median £373.75 (9). Reyhan's −3% DSO vs the darts decision is the conflict already reported for Corentin, not a new proposal. The night is now sold.

### Remaining open nights (Smoobu 14 Nov room; comps all-in)

| Open nights (stay priced) | Ours room (13 Nov) | Kept comp median (n) | Pct / vs median | List × 1.10 vs median | Wider 2BR ≥10 rev median (n) | Median-level Smoobu room* |
|---|---|---|---|---|---|---|
| 18–19 Nov (18–20 Nov; min 2) | **£154.50** (£173.50) | £269.50 (6) | P0 / −43% | −37% | – | about £177 |
| 22–27 Nov (22–27 Nov, 5n; 27 Nov also open) | **£192.60** (£216.60) | £300.00 (5) | P20 / −36% | −29% | £272.50 (12) | about £246 |
| **26–27 Nov** (26–28 Nov; 28 Nov now booked, so only as part of 22–28) | £235.50 (£264.50; were unavailable) | £477.50 (1) | P0 / −51% | −46% | £416.00 (5) | – |
| 2–4 Dec (2–5 Dec; min 3, exact fit) | £220.67 (same) | £416.33 (3) | P0 / −47% | −42% | £380.00 (13) | about £333 |
| **8 Dec** (8–9 Dec, 1n) | £202 (same) | £253.00 (3) | P0 / −20% | −12% | £276.00 (9) | – |
| **14–18 Dec** (14–19 Dec, 5n) | £228.20 (same) | **£394.60 (8)** | P0 / −42% | −36% | £342.60 (28) | about £332 |
| 23–25 Dec (23–26 Dec; min 2) | £267.00 (same) | £391.67 (5) | P0 / −32% | −25% | – | about £311 |
| **3 Jan** (3–4 Jan, 1n) | £172 (same) | £485.00 (1) | P0 / −65% | −61% | £258.00 (12) | – |
| 3–5 Jan (3–6 Jan) | £184.33 (same) | £298.00 (8) | P0 / −38% | −32% | £258.67 (43) | about £226 |
| 30 days out (14–16 Dec) | £205.00 | £343.50 (10) | P0 / −40% | −34% | – | – |

\* Median-level Smoobu room = (kept median − £149 ÷ n) ÷ 1.10, i.e. the Smoobu rate whose Booking.com list price plus cleaning equals the comp median before Booking.com promotions. After the ~0.693 promotion stack the guest would still pay about 31% below that list.

- **Orphans:**
  - **8 Dec is now a 1-night orphan** (5–8 Dec and 9–14 Dec booked either side; min stay 3). It cannot sell at min 3.
  - 14–18 Dec (5 nights) is a normal gap, not an orphan. 2–4 Dec is exactly 3 nights at min 3.
  - 3 Jan is the first night of an open run (3 Jan onwards), not an orphan.
  - 26–27 Nov sell only with 22–25 Nov (min 3, 28 Nov booked).
- **Positioning:** `quality_premium` = 0 (no comparable rating). `recommend(0.60, 0.50, 0.06, 0)` → raise +5%; `recommend(0.50, 0.39, 0.05, 0)` → **raise +10%**. **Supported: at the comp median (0%).** Every open and newly sold stay is P0–P20 at room price and −20% to −65% vs median; a cut is not supported anywhere.
- **Differentiators:** P11 is a basement flat with a patio. 4 of 12 comps have a lift; 3 have a terrace or balcony.

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272)

**New booking 24–29 Nov (5n) vs comps.** This is inside the reopened 22–29 Nov window (block change for Corentin to confirm, t-p06-2229open; who reopened it: NOT CHECKED, 0 PriceLabs user logs).

| Figure | £/night | vs same-stay comp 24–29 Nov (n = 1: 1700204078606711134, 4.58, £326.00) | vs kept median 24–26 Nov (n = 6, £363.75) |
|---|---|---|---|
| **Paid room** (£1,009.82 / 5) | **£201.96** | P0 / −38% | −44% |
| Paid + £129 cleaning ÷ 5 | £227.76 | P0 / −30% | −37% |
| Smoobu today (£1,553 / 5) | £310.60 | – | – |
| Smoobu 13 Nov 07:21Z (£1,906 / 5) | £381.20 | – | – |

- **Paid = 0.765 × 0.85 × today's Smoobu exactly:** £1,553 × 0.765 = £1,188.05; × 0.85 = **£1,009.84** vs £1,009.82 paid. So the stay priced off the post-refresh Smoobu rate (PriceLabs refreshed 13 Nov 09:07:38Z), not the £1,906 shown at 07:21Z. Ratio to that: 0.530. The extra 0.85 on a 5-night stay is not the policy weekly 15% (7+ nights); its source is for the channel agent.
- **PriceLabs has not registered it:** live `get_listing_prices` shows 24–28 Nov open (user_price £350–£445), and 22–29 Nov are no longer Blocked.
- **Wider sample is not usable** for 24–29 Nov: 8 results, 4 of them £979–£2,540. I use the kept set only.

**22–23 Nov is now an orphan pair; 29 Nov is an orphan single night.**

| Stay | Ours, Airbnb all-in/night | Kept median (n) | Pct / vs median | Supported (−2%) all-in → Smoobu room |
|---|---|---|---|---|
| **22–24 Nov** (22 min 2: bookable) | **£283.50 observed** (13 Nov £330.00) | £307.50 (5) | P0 / −8% | £301.35 → about **£310/night** (now £282 / £290) |
| **29–30 Nov** (min 4: cannot sell; 30 Nov+ intentional block) | £338.61 derived | £335.00 (1) | P100 / +1% | n = 1 |
| 15–18 Nov (open 15–17) | **£205.67 observed** (13 Nov £215.67) | n = 0 kept; wider £312.00 (33) | – / −34% vs wider | – |
| 15–17 Nov | £226.00 observed | £280.00 (1) | P0 / −19% | – |
| 16–18 Nov | £227.44 derived | £326.00 (2) | P0 / −30% | – |
| Midweek 17–19 Nov (18 Nov booked) | £242.75 derived | £318.50 (3) | P0 / −24% | – |

- **Positioning:** `quality_premium(4.58, 4.62)` = −0.016. `recommend(0.625, 0.50, 0.0, −0.016)` → **raise +10%** (60d same). **Supported: −2% vs median.** The sold 24–29 Nov stay and every open P06 stay sit at P0. Reyhan's 11–17 Nov −10% DSO is not supported by the comps (as on 13 Nov).

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Gap (stay) | Smoobu room/night (13 Nov), min | Ours, Airbnb all-in/night (observed) | Kept median (n) | Pct / vs median | Wider 4BR ≥10 rev (n) | +15% supported all-in → Smoobu room |
|---|---|---|---|---|---|---|
| **7–8 Dec** (7–9 Dec) | £471 / £448 (£479 / £470), min 2 | **£449.50** | £552.00 (4) | **P25 / −19%** | £509 (5): −12% | £634.80 → about **£702** ((634.80 − 97.50) / 0.765) |
| **13–14 Dec** (13–15 Dec) | £496 / £486 (£494 / £481), min 2 | **£539.50** | £655.00 (4) | **P25 / −18%** | £570 (5): −5% | £753.25 → about **£728** ((753.25 − 97.50) / 0.900) |
| **21 Dec** (1n, min 1) | **£2,073** (£2,074) | **£2,061.00** | **n = 0**; 20–22 Dec £579.50 (3) | +256% vs £579.50 | 21–22 Dec: 0; 20–22 Dec £605 (5) | about £666 all-in → about £524 room ((666 − 195) / 0.900) |
| **29 Dec** (1n, min 1) | **£2,647** (£2,712) | **£2,578.00** | **n = 0** | n/a | 0 | no comp support |

- Kept comps 7–9 Dec: 1610095240357069208 (4.15) £509; 1606112160333193293 (4.24) £1,020; 1617681646241740026 (4.28) £314.50; 1639043256346803626 (4.89, Superhost house, terrace) £595. 13–15 Dec: £570 / £1,020 / £509 (1363636555926649515, 3.93) / £740 (1639…, +9% vs 13 Nov). n = 4, so one listing moves the median.
- 7–8 and 13–14 Dec are 2-night gaps at min 2; Smoobu eased £8–£22 on 7–8 Dec overnight (PriceLabs; no user log).
- 21 and 29 Dec: Reyhan's +300% DSO (9 Nov), open action a-p05-dec. Not raised as new. No qualifying comp exists on either night.
- **Positioning:** `quality_premium(4.77, 4.26)` = +0.15 (cap). `recommend(0.70, 0.45, 0.12, 0.15)` and `recommend(0.65, 0.39, 0.12, 0.15)` → **raise +25%**. **Supported: +15% vs median**; a rise of at least +25% on 7–9 and 13–15 Dec still lands under the +15% target.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- Smoobu £450 on 14 Nov–10 Dec (min 3–4). Eased overnight: 11 Dec £472, 13 Dec £470, 14–17 Dec £453–£467 (13 Nov: 12–14 Dec avg £556, 11–13 avg £540, 4–6 Dec avg £500.50). 18–20 Dec £505–£552; 28–31 Dec £695–£768; 1–2 Jan £686 / £607.
- Booked 0% vs market 48% (kpi_pack; no P14 Smoobu reservation).
- vs comp median, **P100 on every priced stay**: 17–19 Nov +90% (n 5); 24–26 Nov +78% (6); 27–29 Nov +36% (2); 7–9 Dec +62% (7); 8–10 Dec +71% (6); 9–11 Dec +62% (9); 10–12 Dec +59% (7); 11–13 Dec +63% (6); 12–14 Dec +59% (5); 13–15 Dec +66% (7); 14–16 Dec +64% (7). 20–22 Nov and 4–6 Dec: n = 0.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)
- Comp medians: 20–22 Nov £292.50 (1); 17–19 Nov £190.50 (2); 14–16 Dec £234 (5); 13–15 Dec £242 (3); 24–26 Nov £193 (2); 7–9 / 8–10 Dec £228.50 (3); 9–11 Dec £238.50 (3); 11–13 Dec £316 (2); 27–29 Nov n = 0. Rating median 4.68 (52).

## P08 Islington: handback
- Policy last night 13 Nov. Not searched; no rows written today.

## Comp tables

**Source for every comp row:** Airbnb public search, checked 2026-11-14 07:20:10–07:35:37Z. Nightly excludes taxes, includes cleaning, after offers. (±%) = change vs 13 Nov for the same stay; "n/a" = not returned (booked or min-stay). "Ours" rows = live Smoobu 14 Nov 07:19Z. Every stay row is also in `comps.csv`.

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 21 Dec–Tue 22 Dec (1n) | Tue 29 Dec–Wed 30 Dec (1n) | Sun 20 Dec–Tue 22 Dec (2n) | Mon 28 Dec–Wed 30 Dec (2n) | Mon 7 Dec–Tue 8 Dec (1n) | Sun 13 Dec–Mon 14 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.15 (13) | n/a | £419 | £570 | £570 | £570 | £570 | £509 | £509 | £509 | £509 | £509 | £509 | £540 | £419 | £449 | n/a | n/a | £570 | n/a | n/a | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | £441 | £468 | £1020 | £1020 | £1020 | £1020 | £441 | n/a | £1020 | £1020 | £1020 | £1020 | £1020 | £454 | £552 | n/a | n/a | £1070 | n/a | n/a | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (29) | n/a | £750 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £750 | £688 | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.28 (46) | n/a | £266 | £287 | n/a | n/a | n/a | £306 (-2%) | n/a | n/a | £314 (-1%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £372 | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | n/a | £400 | £454 | £509 (+6%) | n/a | n/a | £422 (-4%) | n/a | n/a | n/a | n/a | n/a | n/a | £400 | £439 (-3%) | n/a | n/a | £580 (+1%) | n/a | n/a | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (28) | n/a | n/a | n/a | £740 (+9%) | n/a | n/a | n/a | n/a | n/a | £595 | £595 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.26 (22.5) | £441 (1) | £419 (5) | £512 (4) | £655 (4) | £795 (2) | £795 (2) | £432 (4) | £509 (1) | £764 (2) | £552 (4) | £595 (3) | £764 (2) | £780 (2) | £437 (4) | £500 (4) | n/a (0) | n/a (0) | £580 (3) | n/a (0) | £372 (1) | n/a (0) | |
| **Ours, Smoobu live rate/night 14 Nov 07:19Z (status, min stay)** | | | | £560 Booked (Smoobu), min 3 | £448 Booked (Smoobu)/Open, min 2/3 | £529 Booked (Smoobu)/Open, min 2/3 | £491 Open, min 2 | £562 Booked (Smoobu)/Open, min 2/3 | £623 Booked (Smoobu), min 3 | £537 Booked (Smoobu), min 3 | £575 Booked (Smoobu), min 4 | £580 Booked (Smoobu), min 4 | £460 Open, min 2 | £496 Booked (Smoobu)/Open, min 2/3 | £563 Booked (Smoobu), min 3 | £600 Booked (Smoobu), min 3 | £387 Open, min 2 | £502 Open, min 3 | £2073 Open, min 1 | £2647 Open, min 1 | £1350 Booked (Smoobu)/Open, min 1/2 | £1711 Booked (Smoobu)/Open, min 1/3 | £471 Open, min 2 | £496 Open, min 2 | |
| **Ours, comparable basis** | | | | £526 | £441 | £574 | £540 obs | £527 | £574 | £508 | £537 | £541 | £450 obs | £477 | £528 | £557 | £394 obs | £433 obs | £2061 obs | £2578 obs | £1312 | £1637 | £555 | £641 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +19% | P60 / +5% | P75 / +12% | P25 / -18% | P0 / -34% | P50 / -28% | P75 / +18% | P100 / +6% | P50 / -29% | P25 / -19% | P0 / -20% | P50 / -31% | P50 / -29% | P0 / -10% | P0 / -14% | n/a | n/a | P100 / +126% | n/a | P100 / +49% | n/a | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Sun 15 Nov–Wed 18 Nov (3n) | Sun 15 Nov–Tue 17 Nov (2n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 22 Nov–Tue 24 Nov (2n) | Sun 22 Nov–Sun 29 Nov (7n) | Tue 24 Nov–Sun 29 Nov (5n) | Sun 29 Nov–Mon 30 Nov (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.58 (12) | n/a | n/a (was £286) | £460 | n/a (was £460) | n/a | n/a | £330 | £394 (-4%) | n/a | £420 | £420 | £440 | n/a | n/a | n/a | n/a | £294 | £315 | £326 | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.71 (24) | n/a | n/a (was £280) | £340 | £340 | n/a | n/a | £296 | n/a | n/a | n/a | n/a | n/a | £296 | n/a (was £280) | £280 | n/a (was £280) | £296 | n/a | n/a | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | £308 | £342 | n/a | n/a | n/a | £308 | n/a | n/a | £342 | £342 | £342 | n/a | n/a | n/a | n/a | £308 | n/a | n/a | £335 | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | £318 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £398 | £402 | n/a | n/a | n/a | £315 | n/a | n/a | n/a | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | n/a | n/a | n/a | £382 | n/a | n/a | £397 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (53) | n/a | n/a | £962 | £987 | £1008 | £1008 | n/a | £1008 | £1098 | £1008 | £1008 | £1008 | £1008 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | £449 | £485 (+3%) | £578 (+2%) | n/a | n/a (was £443) | n/a (was £546) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a (was £415) | n/a (was £391) | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.57 (23) | n/a | n/a | £415 | n/a (was £421) | £474 (+5%) | n/a (was £484) | £413 (+7%) | n/a (was £455) | n/a (was £471) | £415 (+5%) | £419 | n/a (was £416) | £480 (+5%) | n/a (was £214) | n/a | n/a | £360 (-1%) | n/a (was £327) | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | £516 (+2%) | n/a | n/a | n/a | n/a | £764 (+5%) | £664 (+3%) | £688 (+1%) | £610 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | £353 (-1%) | £452 | £489 (+3%) | n/a | n/a | £411 (-1%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £337 | £376 (-3%) | n/a | n/a | n/a | parking listed |
| **Comp median (n)** | | | 4.62 (26.0) | n/a (0) | £318 (3) | £449 (7) | £487 (6) | £578 (3) | £1008 (1) | £364 (6) | £700 (2) | £930 (2) | £420 (5) | £420 (6) | £440 (5) | £480 (3) | n/a (0) | £280 (1) | £326 (2) | £308 (5) | £315 (1) | £326 (1) | £335 (1) | |
| **Ours, Smoobu live rate/night 14 Nov 07:19Z (status, min stay)** | | | | £326 Booked (Smoobu), min 2 | £233 Booked (Smoobu)/Open, min 2 | £420 Blocked, min 3 | £363 Blocked, min 3/4 | £334 Blocked, min 4 | £363 Blocked, min 4 | £292 Booked (Smoobu), min 3 | £333 Booked (Smoobu), min 4 | £362 Blocked, min 4 | £282 Blocked, min 3 | £284 Blocked, min 3 | £302 Blocked, min 3 | £340 Blocked, min 3/4 | £212 Open, min 2 | £210 Open, min 2 | £213 Open, min 2 | £286 Open, min 2/3 | £304 Booked (Smoobu)/Open, min 2/3/4 | £311 Booked (Smoobu), min 3/4 | £274 Open, min 4 | |
| **Ours, comparable basis** | | | | £314 | £243 | £386 | £342 | £320 | £342 | £288 | £319 | £341 | £280 | £282 | £296 | £325 | £206 obs | £226 obs | £227 | £284 obs | £251 | £263 | £339 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P0 / -24% | excluded | excluded | excluded | excluded | P0 / -21% | P0 / -54% | excluded | excluded | excluded | excluded | excluded | n/a | P0 / -19% | P0 / -30% | P0 / -8% | P0 / -20% | P0 / -19% | P100 / +1% | |

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Sat 28 Nov–Wed 2 Dec (4n) | Wed 9 Dec–Mon 14 Dec (5n) | Sun 13 Dec–Mon 14 Dec (1n) | Sun 13 Dec–Thu 17 Dec (4n) | Sun 22 Nov–Fri 27 Nov (5n) | Sun 22 Nov–Thu 26 Nov (4n) | Thu 26 Nov–Sat 28 Nov (2n) | Wed 2 Dec–Sat 5 Dec (3n) | Tue 8 Dec–Wed 9 Dec (1n) | Mon 14 Dec–Sat 19 Dec (5n) | Tue 15 Dec–Fri 18 Dec (3n) | Wed 18 Nov–Fri 20 Nov (2n) | Wed 23 Dec–Sat 26 Dec (3n) | Sun 3 Jan–Wed 6 Jan (3n) | Sun 3 Jan–Mon 4 Jan (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.71 (31) | n/a | £268 (-3%) | £460 | £472 | £545 | £589 | £440 | n/a | £440 | £440 | £440 | £486 | £550 | n/a | £483 | n/a | £429 | £397 | £404 | n/a | £416 | n/a | £442 | £451 | £276 | n/a | £273 | n/a | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (181) | n/a | n/a | £374 | £374 | n/a | n/a | n/a | n/a | n/a | £374 | £374 | £374 | n/a | n/a | n/a | £422 | £351 | n/a | n/a | n/a | n/a | £422 | £351 | £363 | n/a | £392 | £308 | £485 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | £262 (-3%) | £425 | £436 | £510 | £554 | £272 | n/a | £544 | £463 | £454 | £470 | £516 | n/a | £456 | n/a | £394 | n/a | n/a | n/a | £464 | n/a | £407 | £416 | n/a (was £272) | n/a | £304 | n/a | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a | n/a | £438 | £438 | £438 | £438 | £338 | n/a | n/a | £438 | £438 | £438 | £438 | n/a | £400 | n/a | £406 | £300 | £306 | n/a | n/a | n/a | £400 | £417 | n/a | £417 | £417 | n/a | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.54 (13) | £282 | £272 (-4%) | £425 | £436 | £510 | £554 | n/a | n/a | n/a | £463 | £454 | £470 | £516 | n/a | £456 | n/a | £394 | n/a | n/a | n/a | n/a | n/a | £407 | £416 | £282 | n/a | £247 | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | n/a | £256 | n/a | £418 | £418 | £418 | £478 (+23%) | £478 (+14%) | £424 | £388 | £388 | n/a (was £410) | £426 | £374 | n/a | n/a | £374 | £407 | £411 (+20%) | £478 | £350 | n/a | £389 | £388 | £286 | £501 | £371 | n/a | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a | £212 | £312 | £312 | n/a (was £312) | n/a (was £312) | £312 | n/a | n/a | £312 | n/a (was £312) | n/a (was £312) | n/a (was £312) | n/a | n/a | n/a | £281 | n/a | £281 | n/a | n/a | n/a | £275 | £292 | £262 | £292 | £292 | n/a | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.44 (62) | n/a | n/a | £241 | £241 | n/a | n/a | £191 | n/a | n/a | n/a | £241 | £241 | £241 | n/a | n/a | £253 | £235 | £184 | £185 | n/a | n/a | £253 | £262 | £260 | £191 | n/a (was £307) | n/a | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.73 (88) | n/a | n/a | £219 | £218 (-1%) | n/a | n/a | £184 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £195 (-1%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a (was £195) | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (74) | n/a | n/a | £222 | £222 | n/a | n/a | n/a | n/a | n/a | £212 | n/a | n/a | n/a | n/a | n/a | £245 | n/a | n/a | n/a | n/a | n/a | £234 | n/a | £215 | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.55 (38) | n/a (was £283) | £228 | £272 | £270 | n/a | n/a | £231 (-16%) | n/a | n/a | n/a | £296 (-4%) | £324 (-2%) | n/a | n/a | £319 | n/a | n/a | £218 | £210 (-18%) | n/a | n/a | n/a | n/a | n/a | n/a (was £238) | £339 | £217 | n/a | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | £250 | n/a | n/a | £280 | £280 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £212 | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (36.0) | £282 (1) | £256 (7) | £344 (10) | £374 (11) | £474 (6) | £496 (6) | £292 (8) | £478 (1) | £440 (3) | £412 (8) | £412 (8) | £438 (7) | £476 (6) | £374 (1) | £456 (5) | £253 (3) | £374 (9) | £300 (5) | £294 (6) | £478 (1) | £416 (3) | £253 (3) | £395 (8) | £388 (9) | £270 (6) | £392 (5) | £298 (8) | £485 (1) | |
| **Ours, Smoobu live rate/night 14 Nov 07:19Z (status, min stay)** | | | | £246 Booked (Smoobu), min 2 | £154 Booked (Smoobu)/Open, min 2 | £205 Open, min 3 | £194 Booked (Smoobu)/Open, min 3 | £226 Booked (Smoobu), min 3 | £264 Booked (Smoobu), min 3 | £189 Open, min 3 | £260 Booked (Smoobu)/Open, min 3 | £267 Booked (Smoobu)/Open, min 3 | £202 Booked (Smoobu)/Open, min 3 | £200 Booked (Smoobu)/Open, min 3 | £208 Booked (Smoobu), min 3 | £242 Booked (Smoobu), min 3 | £198 Booked (Smoobu), min 3 | £226 Booked (Smoobu), min 3 | £186 Booked (Smoobu), min 3 | £203 Booked (Smoobu)/Open, min 3 | £193 Open, min 3 | £188 Open, min 3 | £236 Open, min 3 | £221 Open, min 3 | £202 Open, min 3 | £228 Open, min 3 | £219 Open, min 3 | £154 Open, min 2 | £267 Open, min 2 | £184 Open, min 3 | £172 Open, min 3 | |
| **Ours, comparable basis** | | | | £246 | £154 | £205 | £194 | £226 | £264 | £189 | £260 | £267 | £202 | £200 | £208 | £242 | £198 | £226 | £186 | £203 | £193 | £188 | £236 | £221 | £202 | £228 | £219 | £154 | £267 | £184 | £172 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = Smoobu x 1.10 (before promotions)** | | | | £271 P0 / -4% | £169 P0 / -34% | £226 P20 / -34% | £213 P0 / -43% | £249 P0 / -48% | £291 P17 / -41% | £208 P25 / -29% | £287 P0 / -40% | £294 P0 / -33% | £223 P12 / -46% | £219 P0 / -47% | £229 P0 / -48% | £266 P17 / -44% | £218 P0 / -42% | £249 P0 / -45% | £205 P0 / -19% | £223 P11 / -40% | £212 P20 / -29% | £207 P17 / -30% | £259 P0 / -46% | £243 P0 / -42% | £222 P0 / -12% | £251 P0 / -36% | £241 P11 / -38% | £170 P0 / -37% | £294 P20 / -25% | £203 P0 / -32% | £189 P0 / -61% | Smoobu Booking.com markup +10% (policy, 12 Nov) |
| **Our percentile / vs median** | | | | P0 / -13% | P0 / -40% | P0 / -40% | P0 / -48% | P0 / -52% | P0 / -47% | P12 / -35% | P0 / -45% | P0 / -39% | P0 / -51% | P0 / -52% | P0 / -52% | P17 / -49% | P0 / -47% | P0 / -50% | P0 / -26% | P11 / -46% | P20 / -36% | P17 / -36% | P0 / -51% | P0 / -47% | P0 / -20% | P0 / -42% | P11 / -44% | P0 / -43% | P0 / -32% | P0 / -38% | P0 / -64% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | n/a (was £182) | £252 | n/a | n/a | n/a | £202 | n/a | n/a | n/a | n/a | £202 | n/a | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | £352 | £352 | £352 | £352 | £352 | £428 | n/a | £352 | n/a | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | £236 | £246 | £246 | £253 | £260 | n/a | n/a | n/a | £246 | £246 | £246 | £253 | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | n/a (was £182) | £302 | £302 | £302 | £302 | £252 | n/a | n/a | £302 | £302 | £302 | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | £182 | £278 | £278 | £278 | £278 | £252 | n/a | n/a | £278 | £278 | £278 | £278 | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | n/a | £290 | £290 | £290 | £290 | £290 | n/a | n/a | n/a | n/a | n/a | £290 | £290 | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | n/a | n/a | n/a | n/a | n/a | £368 | n/a | n/a | £402 | £402 | £402 | £402 | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (20) | n/a | n/a | n/a | £236 | n/a | £254 (-6%) | n/a | £236 (-1%) | n/a | £240 (-6%) | £248 (-7%) | £246 (-6%) | £252 (-6%) | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (17) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | £264 | £241 | £241 | n/a | n/a | n/a | n/a | n/a | £241 | £241 | £241 | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | n/a | £224 (-6%) | n/a | n/a | n/a | n/a | £224 (-6%) | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.88 (19.5) | n/a (0) | £236 (5) | £278 (7) | £278 (7) | £290 (5) | £284 (6) | £252 (6) | £332 (2) | n/a (0) | £278 (7) | £263 (6) | £278 (9) | £290 (7) | |
| **Ours, Smoobu live rate/night 14 Nov 07:19Z (status, min stay)** | | | | £450 Open, min 4 | £450 Open, min 3 | £456 Open, min 3 | £462 Open, min 3/4 | £460 Open, min 4 | £461 Open, min 4 | £450 Open, min 3 | £450 Open, min 4 | £450 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3 | £461 Open, min 3/4 | |
| **Ours, comparable basis** | | | | £450 | £450 | £456 | £462 | £460 | £461 | £450 | £450 | £450 | £450 | £450 | £450 | £461 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P100 / +90% | P100 / +64% | P100 / +66% | P100 / +59% | P100 / +63% | P100 / +78% | P100 / +36% | n/a | P100 / +62% | P100 / +71% | P100 / +62% | P100 / +59% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | n/a | £190 | £192 | £192 | n/a | n/a | £174 | n/a | n/a | £192 | £192 | £192 | £199 | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (52) | £292 | n/a | £264 | £293 | £309 | £325 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | £234 | n/a | n/a | n/a | n/a | n/a | £289 (-1%) | £240 (-1%) | £235 (-1%) | £238 (-1%) | n/a | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | n/a | £238 | £242 | £278 | £307 | £212 | n/a | n/a | n/a | n/a | £242 | £272 | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.68 (62) | n/a | n/a | £232 | n/a | n/a | n/a | n/a (was £172) | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.75 (28) | n/a | £190 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £228 | £228 | n/a | n/a | none listed |
| **Comp median (n)** | | | 4.68 (52) | £292 (1) | £190 (2) | £234 (5) | £242 (3) | £293 (2) | £316 (2) | £193 (2) | n/a (0) | £289 (1) | £228 (3) | £228 (3) | £238 (3) | £235 (2) | |
| **Ours, Smoobu live rate/night 14 Nov 07:19Z (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | |
Data gaps:
- **Booking.com live prices: NOT CHECKED** (WAF on 11–12 Nov; not attempted, not bypassed). The P11 guest price today and the promotion stack on the two new stays are not verified on the page.
- **PriceLabs does not show the new P11 (28 Nov–1 Dec, 9–13 Dec) or P06 (24–28 Nov) bookings** (live prices refreshed 13 Nov 10:47Z / 09:07Z; `prices.csv` 14 Nov). Whether a refresh will pick them up: NOT CHECKED (PriceLabs auditor).
- **Overnight Smoobu cuts on P11 18–28 Nov (−11%) and P06 15–29 Nov (−5% to −28%)** with no user log: cause NOT CHECKED. Smoobu now carries PriceLabs `price`, below `user_price`.
- **P11 28 Nov–2 Dec: Smoobu rate at booking** (£292 or £260 on 28 Nov): NOT CHECKED.
- **P06 24–29 Nov extra 0.85 factor** on a 5-night Airbnb stay: source NOT CHECKED (channel agent). Who reopened 22–29 Nov: NOT CHECKED.
- **Thin samples:** P11 28 Nov–2 Dec n = 1 (wider n = 8 used alongside), 26–28 Nov n = 1, 3–4 Jan n = 1; P06 24–29 Nov n = 1 and 15–18 Nov n = 0; P05 n = 4, and n = 0 on 21 and 29 Dec; P14 n = 0 on 20–22 Nov and 4–6 Dec.
- **Kept comps not returned on any stay for two days** (listed in Method): inactive or not, NOT CHECKED; none replaced.
- **P11 has no Airbnb rating** and its Booking.com review count is not in `listings.csv`: the review gap is NOT CHECKED and `quality_premium` is 0 by construction.
- **Whether Airbnb comp prices include VAT: NOT CHECKED.**
- P17 is not in PriceLabs or Smoobu.
