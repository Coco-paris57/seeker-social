# Competitor positioning: CENTRAL/NORTH (D = 2026-11-15)

**Method**
- **Policy read first** (`data/policy.json`). Not re-raised: P06 intentional blocks (nights from 30 Nov), P14 special setup (numbers only), Camden Booking.com Visibility Booster 18%, Booking.com promotion stacking (size only), 15%/20% stay discounts, Booking.com markup +10% (12 Nov), `darts_override_24oct`, P08 handback (last night 13 Nov).
- **Commission:** the channel agent's finding is used (Camden ~18.0% of room + cleaning = Visibility Booster, expected; `reports/2026-11-14/sections/channel.md`). Not re-raised.
- **Comp ids:** kept from 14 Nov (comp-central rows in `data/snapshots/2026-11-14/comps.csv`). **No replacement.** Five kept ids came back on none of today's stays, the third day in a row: P06 917140285217729256 and 1452940332365117153, P14 1075245497252121738 and 1659680062193836633, P17 975294297333089697. Each `/rooms/<id>` page still returns HTTP 200 (checked 15 Nov ~07:40Z), so the listings are still up. Whether their calendars are closed: NOT CHECKED. **P08 not searched** (handback).
- **Searches:** 92 public Airbnb searches on airbnb.co.uk, **checked 2026-11-15 07:21:42–07:31:21Z**, 0 parse failures, no bot challenge. Same map boxes and filters as 25 Oct–14 Nov (entire home, min bedrooms = ours, adults P05 7 / P06 5 / P11 5 / P14 3 / P17 3). Script `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c15s/search.py`; raw `.../scratchpad/c15/search/*.json`; analysis `.../scratchpad/c15s/analyse15.py`, `extra15.py`, `key15.py` → `.../scratchpad/c15/analysis.json`.
- **Stays priced for every comp and for us:** Fri 20–Sun 22 Nov (next Fri–Sun), Tue 17–Thu 19 Nov (midweek), **Tue 15–Thu 17 Dec (30 days out, new)**, plus the 14 Nov stays repeated for day-on-day. Extras: P11 18–20 Nov, 22–27 / 22–25 / 24–27 Nov, 2–5 Dec, 8–9 Dec, 14–19 Dec, 15–18 Dec, 23–26 Dec, 3–4 Jan, 3–6 Jan. P06 16–18 Nov, 22–24 Nov, 29–30 Nov. P05 16–18 Nov, 29 Nov–3 Dec, 7–9 / 7–8 Dec, 13–15 / 13–14 Dec, 20–22 / 21–22 Dec, 28–30 / 29–30 Dec.
- **Our prices:** live **Smoobu GET `/api/rates` 15 Nov 07:21:32Z** (`.../scratchpad/c15/smoobu_rates15.json`). It equals `prices.csv` 15 Nov `smoobu_price` on every night used. Booked or open status comes from Smoobu `reservations.csv` 15 Nov (confirmed stays only).
- **Price basis:** comps are the Airbnb total ÷ nights, excluding taxes, **cleaning included**, after offers.
  - P05 and P06 are our own Airbnb listings as seen in the same search ("obs"). Where they were not returned, the figure is derived as 0.765 × Smoobu (0.900 for nights more than 28 days out) + cleaning ÷ n.
  - Re-verified today, exact to the penny: P06 16–18 Nov £477.07 = 0.765 × (£222 + £233) + £129. P06 22–24 Nov £519.14 = 0.765 × (£271 + £239) + £129. P05 13–15 Dec £1,002.48 = 0.765 × £492 (13 Dec, 28 days out) + 0.900 × £479 (14 Dec, 29 days out) + £195.
  - P11 and P14 are shown at the Smoobu room price. P11 also gets a **list all-in** figure: Smoobu × 1.10 + £149 cleaning ÷ n, which is the Booking.com price before promotions.
  - Whether Airbnb prices include VAT: NOT CHECKED.
- **Booking.com live: NOT CHECKED** (AWS WAF on 11–12 Nov; not attempted, not bypassed).
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` (listing, 14–15 Nov): **0 entries**.
  - `get_listing_prices` P06 3288517, 16–30 Nov (last refreshed 14 Nov 08:42:41Z).
  - `get_listing_prices` P11 3064196, 16 Nov–5 Jan (last refreshed **15 Nov 07:08:47Z**).
- **Rows written** under `flock`: **902 comp rows** (368 priced) appended to `data/snapshots/2026-11-15/comps.csv`. The file already existed, copied forward by another agent. **8 own-listing rows** were added to `channel_checks.csv`.

## Summary

| Ref | Comps (n per stay) | Our pct, open stays 14d / 30d / 60d (kept set) | Rating ours vs comp median; review gap | Booked vs market (Smoobu, next 30 / 60) | Supported positioning |
|---|---|---|---|---|---|
| **P11 2BR** | 12 (1–11) | room: **P23 / P14 / P12**. List all-in: P43–P80 on 18–27 Nov, P12–P50 on Dec–Jan stays | Booking.com 8.0/10 (policy, 21 Oct) vs Airbnb comp median 4.67 (36): not comparable; review gap NOT CHECKED | **56.7% (17/30) vs 51%**; 48.3% (29/60) vs 39% | `quality_premium` 0, so **at the comp median (0%)**. `recommend` gives raise +5% at both 30 and 60 days. **Hold 18–27 Nov** (list all-in already −2% to +21% vs median). **Raise Dec–Jan open stays** (list all-in −5% to −27%). |
| **P05 4BR** | 6 (0–5) | P25 / P19 / P19 | Airbnb 4.77 (35) vs 4.26 (22.5); **+12.5 reviews** | **66.7% (20/30) vs 46%**; 63.3% (38/60) vs 40% | `quality_premium` +0.15 (cap), so **+15% vs median**. `recommend` gives raise +25% at 30 and 60 days. All four open gaps sit −4% to −23% vs median. 21 and 29 Dec: no qualifying comp. |
| **P06 2BR** | 12 (0–9) | P0 / P0 / P0 | 4.58 (12) vs 4.62 (26); **−14 reviews** | **60.0% (9/15) vs 51%**; 60.0% (9/15) vs 41% (15 and 45 intentionally blocked nights excluded) | `quality_premium` −0.016, so **−2% vs median**. `recommend` gives raise +5% (30d) and raise +10% (60d). 16–17 Nov is −25% vs the wider median; 22–23 Nov is −15% vs kept. |
| P08 2BR | not searched | n/a | – | handback 13 Nov | Moot (policy handback). |
| P14 1BR | 12 (0–9) | P100 | not seen on Airbnb; comp median 4.88 (19.5) | 0% vs 49% / 38% (kpi_pack) | Special setup: numbers only. **+49% to +111% vs median.** |
| P17 1BR | 7 (0–4) | n/a | comp median 4.68 (52) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (like-for-like median change of the kept comps on repeated stays):**
- Mostly 0%.
- P11 17–19 and 18–20 Nov −3%.
- P14 24–26 Nov −12% and 27–29 Nov −18%.
- P05 24–26 Nov −3%.
- P17 14–16 Dec −5%.
- Two single P11 comps moved a lot: 1159915905276842600 −21% / −23% on 24–26 and 22–27 Nov; 1480693526878012391 +16% / +18% on several December stays.

**Our prices moved with no user log** (Smoobu 14 Nov 07:19Z → 15 Nov 07:21Z):
- **P11 up:** 22 Nov £184 → £205, 24–25 Nov £189 → £203 / £208, **2–4 Dec £192 / £211 / £259 → £247 / £263 / £318 (+23% to +29%)**, 14–15 Dec £201 / £209 → £214 / £220. PriceLabs refreshed P11 at 07:08:47Z today and now shows both new bookings as Booked.
- **P06 mixed:** 16–17 Nov £210 / £216 → £222 / £233; **22–23 Nov £282 / £290 → £271 / £239**; 29 Nov £274 → £258.
- P05 −£2 to −£7 a night; 29 Dec £2,647 → £2,557.
- P14 mixed: 12 Dec £450 → £486, 19 Dec £524 → £584, most other nights −£1 to −£23.

## P11 Camden (3064196; Booking.com only)

**PriceLabs now registers both new bookings.** Live `get_listing_prices` (refreshed 15 Nov 07:08:47Z) shows 28 Nov–1 Dec and 9–13 Dec as Booked (booked_date 13 and 14 Nov). Its live `price` equals Smoobu on every open night checked. 8 Dec carries `unbookable = 1`. This closes the P11 part of t-pl-sync-1411 (PriceLabs auditor to confirm).

### Open nights vs like-for-like comps (Smoobu 15 Nov 07:21Z; comps all-in)

| Open nights (stay priced) | Ours room (14 Nov) | List all-in (×1.10 + £149/n) | Kept comp median (n) | Room pct / vs median | List all-in pct / vs median | Wider: all 2BR, ≥10 reviews, same search, median (n) | Median-level Smoobu room* |
|---|---|---|---|---|---|---|---|
| **18–19 Nov** (18–20 Nov, min 2) | £165.00 (£154.50) | £256.00 | £262.00 (7) | P0 / −37% | **P43 / −2%** | £262.00 (19) | about £170 |
| **22–26 Nov** (22–27 Nov, 5n; min 3) | £207.00 (£192.60) | £257.50 | £230.00 (5) | P40 / −10% | **P80 / +12%** | £221.60 (12) | about £182 |
| 22–24 Nov (22–25 Nov) | £201.00 (£188.00) | £270.77 | £224.00 (5) | P20 / −10% | P80 / +21% | £221.67 (15) | about £158 |
| 24–26 Nov (24–27 Nov) | £211.67 (£196.00) | £282.50 | £234.17 (4) | P25 / −10% | P75 / +21% | £228.33 (13) | about £168 |
| 27 Nov | £277 (£261) | – | n = 0 (27–29 Nov: 28 Nov booked) | – | – | – | – |
| 2–4 Dec (2–5 Dec, min 3, exact fit; not in the brief but open in Smoobu) | **£276.00 (£220.67)** | £353.27 | £416.33 (3) | P0 / −34% | P33 / −15% | £380.00 (13) | about £333 |
| **8 Dec** (8–9 Dec, 1n; orphan, min 3) | £199 (£202) | £367.90 | £253.00 (3) | P0 / −21% | P67 / +45% | £285.00 (9) | not a price problem |
| **14–18 Dec, darts** (14–19 Dec, 5n) | £234.00 (£228.20) | £287.20 | **£395.90 (8)** | P0 / −41% | P12 / −27% | £340.90 (32) | about £333 |
| 15–17 Dec (15–18 Dec) | £223.33 (£219.33) | £295.33 | £363.00 (7) | P14 / −38% | P29 / −19% | £341.67 (33) | about £285 |
| **23–25 Dec** (23–26 Dec, min 2) | £270.00 (£267.00) | £346.67 | £366.67 (6) | P0 / −26% | P50 / −5% | £377.67 (27) | about £288 |
| **3 Jan** (3–4 Jan, 1n) | £173 (£172) | £339.30 | £485.00 (**1**) | P0 / −64% | P0 / −30% | £258.00 (12): list P83 / +32% | – |
| 3–5 Jan (3–6 Jan, min 3) | £186.00 (£184.33) | £254.27 | £304.33 (7) | P0 / −39% | P29 / −16% | £256.67 (37): list −1% | about £232 |
| 30 days out (15–17 Dec) | £217.50 | £313.75 | £396.00 (10) | P10 / −45% | P30 / −21% | £368.50 (32) | about £292 |

\* Median-level Smoobu room = (kept median − £149 ÷ n) ÷ 1.10: the Smoobu rate whose Booking.com list price plus cleaning equals the kept comp median before Booking.com promotions. The two newest bookings paid about 0.693 × list (14 Nov section; stack size is for the channel agent, a-p11-bcom-stack), so a promoted guest still pays well under that.

**Late November (18–27 Nov):**
- At room price P11 is P0–P40.
- At list all-in it is **at or above the kept median** (−2% to +21%). The kept median for 22–27 Nov fell from £300 (14 Nov) to £230 because of who is in the sample, not because comps cut prices. The like-for-like change is 0% (n = 4): 1675590787835266115 (£407 yesterday) is no longer returned, 1480693526878012391 (£205) came in, and 1159915905276842600 cut −23%.
- **No raise is supported on 18–27 Nov on the list basis. A cut is not supported on the room basis** (−10% to −37%).

**December and January:**
- Every open stay is P0–P14 at room price and −15% to −27% at list all-in vs the kept median (2–4 Dec, 14–18 Dec, 15–17 Dec, 3–5 Jan). The exception is 23–25 Dec at −5% (P50).
- The evidence supports moving these toward the median-level Smoobu room: about **£333 for 2–4 Dec and 14–18 Dec, £288 for 23–25 Dec, £232 for 3–5 Jan**.

**Darts (14–17 Dec):**
- Smoobu averages **£221** a night (£214 / £220 / £215 / £235) against the policy note "average above £300/night" (21 Oct). The comps support about £333.
- Reyhan's −3% DSO against the darts decision is the conflict already reported for Corentin (14 Nov). It is not a new proposal.

**Orphans:**
- **8 Dec** is a 1-night orphan at min 3 (PriceLabs `unbookable = 1`). The price is not the lever (t-p11-8dec-orphan).
- 3 Jan starts an open run: price it as 3–5 Jan, where list all-in is −1% vs the wider median and −16% vs kept.

**Positioning:**
- `quality_premium` = 0 (no comparable rating).
- `recommend(0.567, 0.51, 0.14, 0)` → raise +5%. `recommend(0.483, 0.39, 0.12, 0)` → raise +5%.
- **Supported: at the comp median (0%) on the guest-facing list price.** That means hold 18–27 Nov and raise December and January open stays by about +7% to +42% on Smoobu room (2–4 Dec £276 → £333, 14–18 Dec £234 → £333, 23–25 Dec £270 → £288, 3–5 Jan £186 → £232).

**Differentiators:** P11 is a basement flat with a patio. Of the 12 comps, 4 have a lift (1542815721953379556, 1543632408013225027, 654396087724294901, 1515051936255130803) and 3 have a terrace or balcony.

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272)

| Open nights (stay) | Smoobu room (14 Nov) | PriceLabs `price` / `user_price` (live) | **Guest sees on Airbnb, all-in/night (observed)** | Kept median (n) | Pct / vs kept | Wider 2BR ≥10 reviews median (n) | Pct / vs wider | Supported (−2%) all-in → Smoobu room |
|---|---|---|---|---|---|---|---|---|
| **16–17 Nov** (16–18 Nov, min 2) | **£222 / £233** (£210 / £216) | £249 / £254 and £210 / £216 | **£239.00** (£477.07 total) | £315.00 (**1**: 1399094207699964827, 4.64) | P0 / −24% | **£320.25 (32)** | **P31 / −25%** | £313.85 → about **£326/night** |
| **22–23 Nov** (22–24 Nov, 22 min 2) | **£271 / £239** (£282 / £290) | £271 / £239 and £282 / £290 | **£260.00** (£519.14) | **£307.50 (5)** | **P0 / −15%** | £343.00 (25) | P28 / −24% | £301.35 → about **£310/night** |
| 29 Nov (29–30 Nov, min 4: cannot sell; 30 Nov on is an intentional block) | £258 (£274) | £258 / £274; `unbookable = 1` | £326.37 derived (0.765 × £258 + £129) | £422.55 (2) | P0 / −23% | £380.00 (13) | P31 / −14% | n = 2 |

- **What guests see is the Smoobu rate.** The Airbnb total for 16–18 Nov is £477.07 = 0.765 × (£222 + £233) + £129, to the penny. PriceLabs shows `price` £249 / £254 and `user_price` (Your Price) £210 / £216, and Smoobu matches neither. That is for the PriceLabs auditor; for positioning I use the Smoobu figure.
- **16–17 Nov is tomorrow and Monday.** The kept set has n = 1, so I use the wider sample (n = 32). We are P31, −25%. Comps do not support the low price, but at 1–2 days' lead the upside is small.
- **22–23 Nov is an orphan pair** between bookings (18–22 Nov and 24–29 Nov). It is P0 vs kept, P28 vs wider. Smoobu cut 23 Nov from £290 to £239 (−18%) overnight with no user log. Comps support about £310 a night (−2% vs median), not a cut.
- **PriceLabs now shows 24–28 Nov as Booked** (booked_date 13 Nov, ADR £201.96). The P06 part of t-pl-sync-1411 is fixed.
- **Positioning:**
  - `quality_premium(4.58, 4.62)` = −0.016.
  - `recommend(0.60, 0.51, 0.0, −0.016)` → raise +5%. `recommend(0.60, 0.41, 0.0, −0.016)` → raise +10% (only 15 sellable nights in 60).
  - **Supported: −2% vs median.** Every open P06 stay is P0 vs kept and −15% to −25% vs median, so a cut is not supported.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Gap (stay) | Smoobu room/night (14 Nov), min | Ours, Airbnb all-in/night | Kept median (n) | Pct / vs median | Wider 4BR ≥10 rev (n) | +15% supported all-in → Smoobu room |
|---|---|---|---|---|---|---|
| **7–8 Dec** (7–9 Dec) | £466 / £446 (£471 / £448), min 2 | **£446.50 obs** | £552.00 (4) | **P25 / −19%** | £509 (5): −12% | £634.80 → about **£702** ((634.80 − 97.50) / 0.765) |
| 7 Dec only (7–8 Dec, 1n) | £466 | £551.49 derived | £369 (1) | n = 1 | £459.50 (2) | – |
| **13–14 Dec** (13–15 Dec) | £492 / £479 (£496 / £486), min 2 | **£501.50 obs** | £655.00 (4) | **P0 / −23%** | £570 (5): −12% | £753.25 → about **£788** ((1,506.50 − 195) / (0.765 + 0.900)) |
| 13 Dec only (13–14 Dec, 1n) | £492 | £571.38 derived | n = 0 | – | £591 (1) | – |
| **21 Dec** (1n, min 1) | **£2,066** (£2,073) | **£2,055.00 obs** | **n = 0** (20–22 Dec: £577, 3) | – | 0 qualifying | no comp support |
| **29 Dec** (1n, min 1) | **£2,557** (£2,647) | **£2,497.00 obs** | **n = 0** | – | 0 qualifying | no comp support |
| 16–17 Nov (16–18 Nov) | £378 / £391 | £392.00 obs | £409.75 (4) | P25 / −4% | £409.75 (4) | £471.21 → about £489 |
| 29 Nov–2 Dec (29 Nov–3 Dec) | £495–£511 | £431.25 obs | £500.50 (4) | P25 / −14% | £449 (5) | £575.58 → about £689 |

- **The 13–14 Dec Airbnb price fell from £539.50 to £501.50 overnight** while Smoobu moved only −£4 / −£7. 13 Dec is now 28 days out, so the 0.765 factor applies to that night instead of 0.900 (fit exact, see Method). The cut comes from the hidden Airbnb layer (a-airbnb-rules), not from a price change.
- **21 and 29 Dec:** the only other 4BRs returned are two 0-review listings (1419727494512018423 at £1,724 / £2,399, 671803868570748014 at £2,132). Neither qualifies (fewer than 10 reviews). Reyhan's +300% DSO is open action a-p05-dec, not raised as new.
- **Thin set:** n = 4, and 1606112160333193293 at £1,020 sits inside every December median. The wider medians are £509 / £570. Even at the wider median, 7–9 and 13–15 Dec are −12%.
- **Positioning:**
  - `quality_premium(4.77, 4.26)` = +0.15 (cap).
  - `recommend(0.667, 0.46, 0.19, 0.15)` and `recommend(0.633, 0.40, 0.19, 0.15)` → **raise +25%**.
  - **Supported: +15% vs median.** At minimum, the comp median: about £594 for 7–8 Dec and about £670 for 13–14 Dec on Smoobu room.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- **Smoobu:** £450 on 15 Nov–10 Dec (min 3–4), with 5 Dec at £466. 11–12 Dec £462 / £486; 15–17 Dec £450 / £456 / £456; 18–20 Dec £542 / £584 / £498; 28–31 Dec £683–£749; 1–2 Jan £668 / £597.
- **Booked:** 0% vs market 49% (30d) and 38% (60d) (kpi_pack). There is no P14 Smoobu reservation.
- **Vs comp median, P100 on every priced stay:**
  - November: 17–19 Nov +90% (n 5); 24–26 Nov **+111%** (6; comps −12% like-for-like); 27–29 Nov +76% (2).
  - 7–13 Dec: 7–9 Dec +49% (7); 8–10 Dec +49% (7); 9–11 Dec +55% (9); 10–12 Dec +51% (7); 11–13 Dec +60% (6).
  - 12–17 Dec: 12–14 Dec +55% (5); 13–15 Dec +55% (7); 14–16 Dec +66% (6); 15–17 Dec +63% (6).
  - 20–22 Nov and 4–6 Dec: n = 0.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)
- **Comp medians:** 20–22 Nov £292.50 (1); 17–19 Nov £190.50 (2); **15–17 Dec £246.50 (2)**; 14–16 Dec £221.75 (4); 13–15 Dec £242 (3); 24–26 Nov £193 (2); 7–9 Dec £228.50 (3); 8–10 Dec £225 (3); 9–11 Dec £226.50 (3); 11–13 Dec £313 (2); 27–29 Nov n = 0.
- **Rating:** median 4.68 (52).

## P08 Islington: handback
- Policy last night 13 Nov. Not searched; no rows written today.

## Comp tables

**Source for every comp row:** Airbnb public search, checked 2026-11-15 07:21:42–07:31:21Z. Nightly excludes taxes, includes cleaning, and is after offers. (±%) = change vs 14 Nov for the same stay. "n/a" = not returned (booked or min-stay). "Ours" rows = live Smoobu 15 Nov 07:21Z. Every stay row is also in `comps.csv`.

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Tue 15 Dec–Thu 17 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 21 Dec–Tue 22 Dec (1n) | Tue 29 Dec–Wed 30 Dec (1n) | Sun 20 Dec–Tue 22 Dec (2n) | Mon 28 Dec–Wed 30 Dec (2n) | Mon 7 Dec–Tue 8 Dec (1n) | Sun 13 Dec–Mon 14 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.15 (13) | n/a | £420 | £570 | £570 | £570 | £570 | £570 | £509 | £509 | £509 | £509 | £509 | £509 | £540 | £420 | £449 | n/a | n/a | £570 | n/a | n/a | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | n/a (was £441) | £370 (-21%) | £1020 | £1020 | £1020 | £1020 | £1020 | n/a (was £441) | n/a | £1020 | £1020 | £1020 | £1020 | £1020 | £370 (-19%) | £552 | n/a | n/a | £1070 | n/a | n/a | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (29) | n/a | £750 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £750 | £688 | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.28 (46) | n/a | £276 (+4%) | n/a | £278 (-3%) | n/a | n/a | n/a | £297 (-3%) | n/a | n/a | £311 (-1%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £369 (-1%) | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | n/a | £400 | £458 | £481 (+6%) | £510 | n/a | n/a | £400 (-5%) | n/a | n/a | n/a | n/a | n/a | n/a | £400 | £419 (-5%) | n/a | n/a | £577 | n/a | n/a | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (28) | n/a | n/a | n/a | n/a | £740 | n/a | n/a | n/a | n/a | n/a | £595 | £595 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.26 (22.5) | n/a (0) | £400 (5) | £570 (3) | £526 (4) | £655 (4) | £795 (2) | £795 (2) | £400 (3) | £509 (1) | £764 (2) | £552 (4) | £595 (3) | £764 (2) | £780 (2) | £410 (4) | £500 (4) | n/a (0) | n/a (0) | £577 (3) | n/a (0) | £369 (1) | n/a (0) | |
| **Ours, Smoobu live rate/night 15 Nov 07:21Z (status, min stay)** | | | | £560 Booked (Smoobu), min 3 | £445 Booked (Smoobu)/Open, min 2/3 | £568 Booked (Smoobu), min 3 | £523 Booked (Smoobu)/Open, min 2/3 | £486 Open, min 2 | £559 Booked (Smoobu)/Open, min 2/3 | £620 Booked (Smoobu), min 3 | £542 Booked (Smoobu), min 3 | £572 Booked (Smoobu), min 4 | £576 Booked (Smoobu), min 4 | £456 Open, min 2 | £494 Booked (Smoobu)/Open, min 2/3 | £562 Booked (Smoobu), min 3 | £598 Booked (Smoobu), min 3 | £384 Open, min 2 | £500 Open, min 3 | £2066 Open, min 1 | £2557 Open, min 1 | £1348 Booked (Smoobu)/Open, min 1/2 | £1664 Booked (Smoobu)/Open, min 1/3 | £466 Open, min 2 | £492 Open, min 2 | |
| **Ours, comparable basis** | | | | £526 | £438 | £609 | £568 | £502 obs | £525 | £572 | £512 | £535 | £538 | £446 obs | £476 | £527 | £555 | £392 obs | £431 obs | £2055 obs | £2497 obs | £1311 | £1596 | £551 | £571 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P80 / +10% | P67 / +7% | P50 / +8% | P0 / -23% | P0 / -34% | P50 / -28% | P100 / +28% | P100 / +5% | P50 / -30% | P25 / -19% | P0 / -20% | P50 / -31% | P50 / -29% | P25 / -4% | P25 / -14% | n/a | n/a | P100 / +127% | n/a | P100 / +50% | n/a | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Tue 15 Dec–Thu 17 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 22 Nov–Tue 24 Nov (2n) | Sun 29 Nov–Mon 30 Nov (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.58 (12) | n/a | £286 | £460 | n/a (was £460) | £460 | n/a | n/a | £330 | £394 | n/a | £420 | £420 | £440 | n/a | n/a | £290 (-1%) | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.71 (24) | n/a | n/a | £340 | £340 | £340 | n/a | n/a | £296 | n/a | n/a | n/a | n/a | n/a | £296 | n/a | £296 | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | £308 | £342 | £342 | n/a | n/a | n/a | £308 | n/a | n/a | £342 | £342 | £342 | n/a | n/a | £308 | £335 | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | £318 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £398 | £402 | n/a | £315 | n/a | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | n/a | n/a | £384 | £386 | £382 | n/a | n/a | £397 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (53) | n/a | n/a | £953 | £953 (-1%) | £982 | £1008 | £1008 | n/a | £1008 | £1098 | £1008 | £1008 | £1008 | £1008 | n/a | n/a | n/a | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | £468 | £462 (+3%) | £496 (+2%) | £582 (+1%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £510 | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.57 (23) | n/a | n/a | £421 | £410 (-1%) | £426 | £474 | £510 | £412 | n/a | n/a | £424 (+2%) | n/a (was £419) | £437 | £484 (+1%) | n/a | £377 (+5%) | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | £511 (-1%) | n/a | n/a | n/a | n/a | £778 (+2%) | £660 (-1%) | £683 (-1%) | £602 (-1%) | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | n/a (was £353) | £461 | £464 (+3%) | £489 | n/a | n/a | £404 (-2%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a (was £337) | £361 (-4%) | n/a | parking listed |
| **Comp median (n)** | | | 4.62 (26.0) | n/a (0) | £308 (3) | £440 (8) | £410 (7) | £474 (8) | £582 (3) | £759 (2) | £364 (6) | £700 (2) | £938 (2) | £424 (5) | £420 (5) | £438 (6) | £484 (3) | £315 (1) | £308 (5) | £423 (2) | |
| **Ours, Smoobu live rate/night 15 Nov 07:21Z (status, min stay)** | | | | £388 Booked (Smoobu), min 2 | £264 Booked (Smoobu)/Open, min 2 | £424 Blocked, min 3 | £399 Blocked, min 3 | £399 Blocked, min 3/4 | £454 Blocked, min 4 | £495 Blocked, min 4 | £350 Booked (Smoobu), min 3 | £388 Booked (Smoobu), min 4 | £484 Blocked, min 4 | £386 Blocked, min 3 | £390 Blocked, min 3 | £414 Blocked, min 3 | £464 Blocked, min 3/4 | £228 Open, min 2 | £255 Open, min 2/3 | £258 Open, min 4 | |
| **Ours, comparable basis** | | | | £361 | £266 | £388 | £370 | £370 | £412 | £443 | £333 | £361 | £435 | £359 | £363 | £381 | £420 | £239 obs | £260 obs | £326 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P0 / -13% | excluded | excluded | excluded | excluded | excluded | P50 / -9% | P0 / -48% | excluded | excluded | excluded | excluded | excluded | P0 / -24% | P0 / -15% | P0 / -23% | |

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Tue 15 Dec–Thu 17 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Wed 18 Nov–Fri 20 Nov (2n) | Sun 22 Nov–Fri 27 Nov (5n) | Sun 22 Nov–Wed 25 Nov (3n) | Tue 24 Nov–Fri 27 Nov (3n) | Wed 2 Dec–Sat 5 Dec (3n) | Tue 8 Dec–Wed 9 Dec (1n) | Mon 14 Dec–Sat 19 Dec (5n) | Tue 15 Dec–Fri 18 Dec (3n) | Wed 23 Dec–Sat 26 Dec (3n) | Sun 3 Jan–Mon 4 Jan (1n) | Sun 3 Jan–Wed 6 Jan (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.71 (31) | £306 | £260 (-3%) | £459 | £460 | £472 | £545 | £589 | £440 | n/a | £440 | £440 | £440 | n/a (was £486) | £550 | £268 (-3%) | £397 | £416 | £416 | £416 | n/a | £442 | £451 | n/a | n/a | £273 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (181) | n/a | n/a | £374 | £374 | £374 | n/a | n/a | n/a | n/a | n/a | £374 | £374 | £374 | n/a | n/a | n/a | n/a | n/a | n/a | £422 | £351 | £363 | £392 | £485 | £307 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | £252 (-4%) | £424 | £425 | £436 | £510 | £554 | £272 | n/a | £544 | £463 | £454 | £470 | £516 | £262 | n/a | n/a | n/a | £464 | n/a | £407 | n/a (was £416) | n/a | n/a | £304 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a | n/a | £438 | £438 | £438 | £438 | £438 | £268 (-21%) | n/a | n/a | £438 | £438 | £438 | £438 | n/a | £230 (-23%) | £247 | £247 | n/a | n/a | £400 | £417 | £417 | n/a | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.54 (13) | n/a (was £282) | £262 (-4%) | £424 | £425 | £436 | £510 | £554 | n/a | n/a | n/a | £463 | £454 | £470 | £516 | £272 (-4%) | n/a | n/a | n/a | n/a | n/a | £407 | £416 | n/a | n/a | £247 | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | n/a | £256 | £418 | £418 | £418 | £418 | £418 | n/a (was £478) | n/a (was £478) | £424 | £388 | £388 | £410 | £424 | £286 | n/a (was £407) | n/a | n/a | £350 | n/a | £392 (+1%) | n/a (was £388) | £505 (+1%) | n/a | n/a (was £371) | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a | £192 (-9%) | £362 | £362 (+16%) | £362 (+16%) | n/a | n/a | £242 (-22%) | n/a | n/a | £362 (+16%) | £362 | n/a | n/a | £192 (-27%) | £205 | £222 | £222 | n/a | n/a | £325 (+18%) | £342 (+17%) | £342 (+17%) | n/a | £342 (+17%) | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.41 (63) | n/a | n/a | £241 | £241 | £241 | n/a | n/a | £191 | n/a | n/a | n/a | £241 | £241 | £241 | £182 (-4%) | £184 | £187 | £187 | n/a | £253 | £262 | £260 | £307 | n/a | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.73 (88) | n/a | n/a | £214 | £218 | £218 | n/a | n/a | £184 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (74) | n/a | n/a | £222 | £222 | £212 (-4%) | n/a | n/a | n/a | n/a | n/a | £212 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £234 | n/a | £215 | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.55 (38) | n/a | £228 | n/a | £274 (+1%) | £269 | n/a | n/a | £252 (+9%) | n/a | n/a | n/a | £296 | £330 (+2%) | n/a | n/a | £235 (+8%) | £224 | n/a | n/a | n/a | n/a | n/a | £339 | n/a | £219 (+1%) | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | £250 | n/a | n/a | n/a | £280 | £280 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £211 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (36.0) | £306 (1) | £252 (7) | £396 (10) | £374 (11) | £374 (11) | £474 (6) | £496 (6) | £252 (7) | n/a (0) | £440 (3) | £412 (8) | £388 (9) | £410 (7) | £476 (6) | £262 (7) | £230 (5) | £224 (5) | £234 (4) | £416 (3) | £253 (3) | £396 (8) | £363 (7) | £367 (6) | £485 (1) | £304 (7) | |
| **Ours, Smoobu live rate/night 15 Nov 07:21Z (status, min stay)** | | | | £265 Booked (Smoobu), min 2 | £166 Booked (Smoobu)/Open, min 2 | £218 Open, min 3 | £217 Open, min 3 | £221 Booked (Smoobu)/Open, min 3 | £282 Booked (Smoobu), min 3 | £334 Booked (Smoobu), min 3 | £206 Open, min 3 | £276 Booked (Smoobu)/Open, min 3 | £323 Booked (Smoobu)/Open, min 3 | £225 Booked (Smoobu)/Open, min 3 | £220 Booked (Smoobu)/Open, min 3 | £256 Booked (Smoobu), min 3 | £302 Booked (Smoobu), min 3 | £165 Open, min 2 | £207 Open, min 3 | £201 Open, min 3 | £212 Open, min 3 | £276 Open, min 3 | £199 Open, min 3 | £234 Open, min 3 | £223 Open, min 3 | £270 Open, min 2 | £173 Open, min 3 | £186 Open, min 3 | |
| **Ours, comparable basis** | | | | £265 | £166 | £218 | £217 | £221 | £282 | £334 | £206 | £276 | £323 | £225 | £220 | £256 | £302 | £165 | £207 | £201 | £212 | £276 | £199 | £234 | £223 | £270 | £173 | £186 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = Smoobu x 1.10 (before promotions)** | | | | £292 P0 / -5% | £183 P0 / -28% | £239 P20 / -40% | £239 P18 / -36% | £243 P27 / -35% | £311 P17 / -34% | £368 P17 / -26% | £226 P29 / -10% | £304 | £355 P0 / -19% | £248 P12 / -40% | £242 P11 / -38% | £282 P14 / -31% | £332 P17 / -30% | £182 P0 / -31% | £228 P40 / -1% | £221 P20 / -1% | £233 P50 / -1% | £304 P0 / -27% | £219 P0 / -14% | £257 P0 / -35% | £246 P14 / -32% | £297 P0 / -19% | £190 P0 / -61% | £205 P0 / -33% | Smoobu Booking.com markup +10% (policy, 12 Nov) |
| **Our percentile / vs median** | | | | P0 / -14% | P0 / -34% | P10 / -45% | P0 / -42% | P18 / -41% | P17 / -40% | P17 / -32% | P29 / -18% | n/a | P0 / -27% | P12 / -46% | P0 / -43% | P14 / -38% | P17 / -37% | P0 / -37% | P40 / -10% | P20 / -10% | P25 / -10% | P0 / -34% | P0 / -21% | P0 / -41% | P14 / -38% | P0 / -26% | P0 / -64% | P0 / -39% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Tue 15 Dec–Thu 17 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | n/a | £252 | £252 | n/a | n/a | n/a | £192 (-5%) | n/a | n/a | n/a | n/a | £202 | n/a | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | £352 | n/a (was £352) | £352 | £352 | £352 | £228 (-35%) | £278 (-35%) | n/a | £352 | £352 | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | £236 | £246 | £246 | £246 | £253 | £260 | n/a | n/a | n/a | £246 | £246 | £246 | £253 | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | £182 | £302 | £302 | £302 | £302 | £302 | £202 (-20%) | n/a | n/a | £302 | £302 | £302 | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | n/a (was £182) | £302 | £302 (+9%) | £302 (+9%) | £302 (+9%) | £302 (+9%) | £202 (-20%) | n/a | n/a | £302 (+9%) | £302 (+9%) | £302 (+9%) | £302 (+9%) | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | n/a | £290 | n/a | £290 | £290 | £290 | £290 | n/a | n/a | n/a | n/a | n/a | £290 | £290 | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £368 | n/a | n/a | £402 | £402 | £402 | £402 | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (20) | n/a | n/a | n/a | n/a | £236 | n/a | £260 (+2%) | n/a | £232 (-1%) | n/a | £240 | £248 | £247 | £254 (+1%) | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (17) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | £264 | £241 | £241 | £241 | n/a | n/a | n/a | n/a | n/a | £241 | £241 | £241 | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | n/a | £224 | n/a | n/a | n/a | n/a | n/a | £224 | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.88 (19.5) | n/a (0) | £236 (5) | £278 (6) | £271 (6) | £290 (7) | £302 (5) | £296 (6) | £213 (6) | £255 (2) | n/a (0) | £302 (7) | £302 (7) | £290 (9) | £302 (7) | |
| **Ours, Smoobu live rate/night 15 Nov 07:21Z (status, min stay)** | | | | £450 Open, min 4 | £450 Open, min 3 | £453 Open, min 3 | £450 Open, min 3 | £450 Open, min 3/4 | £468 Open, min 4 | £474 Open, min 4 | £450 Open, min 3 | £450 Open, min 4 | £458 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3 | £456 Open, min 3/4 | |
| **Ours, comparable basis** | | | | £450 | £450 | £453 | £450 | £450 | £468 | £474 | £450 | £450 | £458 | £450 | £450 | £450 | £456 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P100 / +90% | P100 / +63% | P100 / +66% | P100 / +55% | P100 / +55% | P100 / +60% | P100 / +111% | P100 / +76% | n/a | P100 / +49% | P100 / +49% | P100 / +55% | P100 / +51% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Tue 15 Dec–Thu 17 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | n/a | £190 | n/a | n/a (was £192) | £192 | n/a | n/a | £174 | n/a | n/a | £192 | £192 | £192 | £199 | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (52) | £292 | n/a | £264 | £264 | £293 | £309 | £319 (-2%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | £230 | £222 (-5%) | n/a | n/a | n/a | n/a | n/a | £272 (-6%) | £230 (-4%) | £225 (-4%) | £226 (-5%) | n/a | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | n/a | n/a | £222 (-7%) | £242 | £278 | £307 | £212 | n/a | n/a | n/a | n/a | £242 | £272 | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.68 (62) | n/a | n/a | n/a | £222 (-4%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.75 (28) | n/a | £190 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £228 | £228 | n/a | n/a | none listed |
| **Comp median (n)** | | | 4.68 (52) | £292 (1) | £190 (2) | £246 (2) | £222 (4) | £242 (3) | £293 (2) | £313 (2) | £193 (2) | n/a (0) | £272 (1) | £228 (3) | £225 (3) | £226 (3) | £235 (2) | |
| **Ours, Smoobu live rate/night 15 Nov 07:21Z (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | |
Data gaps:
- **Booking.com live prices: NOT CHECKED** (WAF 11–12 Nov; not attempted, not bypassed). The P11 percentile uses the Smoobu room and list (× 1.10 + cleaning), not the promoted price a guest sees. The Booking.com P11 review count is not in `listings.csv`, so the review gap is NOT CHECKED and `quality_premium` = 0 by construction.
- **P06 16–17 Nov: three different prices.** Smoobu £222 / £233 (what Airbnb shows), PriceLabs `price` £249 / £254, PriceLabs `user_price` £210 / £216. Why: NOT CHECKED (PriceLabs auditor).
- **Overnight moves with 0 user logs:** P11 2–4 Dec +23% to +29%, P06 23 Nov −18%. Cause NOT CHECKED. The P11 move fits the 07:08Z PriceLabs refresh after the bookings were registered; that is an inference, not verified.
- **Kept comps not returned on any stay for 3 days** (P06 ×2, P14 ×2, P17 ×1). Their pages are up (HTTP 200); calendar NOT CHECKED. None replaced.
- **Thin samples:**
  - P06 16–18 Nov kept n = 1 (wider n = 32 used); 29–30 Nov n = 2.
  - P11 3–4 Jan kept n = 1 (wider n = 12); 2–5 Dec and 8–9 Dec n = 3; 27 Nov n = 0.
  - P05 n = 4 with one £1,020 outlier; 13–14 Dec n = 0; 21 and 29 Dec n = 0 qualifying.
  - P14 20–22 Nov and 4–6 Dec n = 0.
- **Whether Airbnb comp prices include VAT: NOT CHECKED.**
- **P05/P06 hidden Airbnb layer** (0.765 / 0.900 by lead time) is assumed from exact fits on today's observed totals. Its source is the channel agent's (a-airbnb-rules).
- P17 is not in PriceLabs or Smoobu.
