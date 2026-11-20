# Competitor positioning: CENTRAL/NORTH (D = 2026-11-20)

**Method**
- **Policy read first** (`data/policy.json`). Not raised again: P06 intentional blocks, P14 special setup (numbers only), Booking.com Visibility Booster, Booking.com promotion stacking (size only), 15%/20% stay discounts, Booking.com markup (+15% from 18 Nov), derived rate plans, `darts_override_24oct` (status only), P08 handback (last night 13 Nov).
- **Commission:** the channel agent's finding is used (19 Nov channel section: Camden commission above 15% = Visibility Booster, expected). Today's channel section was not yet written when this ran. Not re-raised.
- **Comp ids: the same 49 ids as 18 and 19 Nov** (P05 6, P06 12, P11 12, P14 12, P17 7). **No comp replaced, none added.**
  - All 49 listing pages returned **HTTP 200** (checked 2026-11-20 07:19–07:21Z). Rating, review count and capacity were refreshed from each page. Every kept comp has at least 12 reviews. Three gained a review overnight: 1639043256346803626 (29 → 30), 1568808216094734994 (38 → 39, 4.55 → 4.56) and 1659680062193836633 (18 → 19).
  - **Not returned on any stay today (11):**
    - P06 917140285217729256 and 1452940332365117153 (**8th day**), 1420126228540342938, 1273781636585601427, 673753763892997438.
    - P14 1075245497252121738 and 1659680062193836633 (**8th day**; the latter gained a review overnight).
    - P17 975294297333089697 (**8th day**) and 1242000869201075198.
    - P11 1515051936255130803. P05 912053248917940403.
  - All 11 pages are live. Calendars were not probed, so "bookable in the next 60 days" is **NOT CHECKED** for them, and they are kept.
- **Searches:** 45 public Airbnb map searches on airbnb.co.uk, 334 result pages, 4,299 cards, **checked 2026-11-20 07:19:30–07:23:55Z**. No parse failure and no bot challenge.
  - Filters, boxes and flat centres are the same as 18–19 Nov: entire home, min bedrooms = ours, adults P05 7 / P06 5 / P11 5 / P14 3 / P17 3.
  - "Wider" means the same bedroom count exactly, a numeric rating shown and within 1.25 km. Search cards carry no review count, so **the wider set is NOT filtered to at least 10 reviews**.
  - Scripts: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c20s/`. Raw results: `.../scratchpad/c20/search/*.json`. Analysis: `.../c20/analysis.json`.
- **Stays priced for every comp and for us:**
  - Fri 27–Sun 29 Nov (next Fri–Sun; 20–22 Nov is tonight).
  - Tue 24–Thu 26 Nov (midweek).
  - Sun 20–Tue 22 Dec (30 days out), plus Sat 19–Mon 21 Dec (yesterday's 30-day stay, repeated for the trend).
  - Brief extras. P11: 22–25 / 22–27 / 24–27 Nov, 2–5 Dec, 8–9 Dec, darts 14–19 / 15–18 / 17–19 Dec, 23–26 Dec, 3–6 Jan. P05: 29 Nov–3 Dec, 7–8 / 7–9 Dec, 13–14 / 13–15 Dec, 21–22 Dec, 29–30 Dec. P06: 22–24 Nov, 29–30 Nov. P14/P17: 7–9, 14–16 and 17–19 Dec.
  - **P11 21 Nov is booked** (min 2), so the open run is 22–27 Nov. 27 Nov is open but only as part of a longer stay, because 28 Nov–1 Dec is booked.
- **Our prices:** `data/snapshots/2026-11-20/prices.csv` (Smoobu = PriceLabs on every open night, per the Dispatcher). Booked/open status comes from Smoobu `reservations.csv` (confirmed stays only).
- **Price basis:** comps = Airbnb total ÷ nights, after offers, **cleaning included**, taxes excluded.
  - P05 and P06 use our own Airbnb card from the same search ("obs"). Otherwise the price is derived as 0.765 × Smoobu (0.900 beyond 28 days) + cleaning ÷ n.
  - P05 obs fits 0.765 exactly again: 29 Nov–3 Dec £1,700 = 0.765 × £1,967 + £195; 7–9 Dec £938; 13–15 Dec £972.
  - **P06 22–24 Nov: our card was NOT returned today**, so the price is derived (0.765). Yesterday's card implied 0.845, so both are shown.
  - P11 (Booking.com only) is priced at **list all-in = Smoobu × 1.15 (policy markup) + £149 ÷ n**, before promotions. The × 1.10 result is in `analysis.json`. Booking.com live: **NOT CHECKED** (AWS WAF; not attempted, not bypassed).
- **PriceLabs (read-only, one call at a time, 5 calls):**
  - `get_user_logs` (listing, 18–20 Nov, P05/P06/P11/P14): **6 entries, all from Reyhan.** Five are the 18 Nov ones already reported. **One is new: 19 Nov 10:55:50Z, P06 24 Nov–5 Dec, a min-stay-only DSO (min 3, no price).** `get_listing_date_overrides` P06 confirms min 3 on 24 Nov–5 Dec and no price override.
  - `get_listing_date_overrides` P11 and P05 (20 Nov–10 Jan): **unchanged since 18 Nov.**
    - P11: 3–4 Dec −2%, 14–18 Dec −2%, 8 Dec +50% min 1, 23–25 Dec +5%, 22 Nov–2 Dec −5%, 3–10 Jan −5%.
    - P05: 29 Nov–2 Dec −2%, 7–8 Dec +3%, 13–14 Dec +5%, 21 / 29 Dec +300% min 1.
  - `get_neighbourhood_data` (Nearby Listings summary table; room price, cleaning excluded, window unspecified):
    - **P11 2 BR: P25 232 / P50 293 / P75 335 / P90 388 (n 171).**
    - **P05 4 BR: 453 / 567 / 695 / 1,231 (n 92).**
    - **P14 1 BR: 149 / 195 / 234 / 278 (n 171).**
    - All within £1–6 of 19 Nov.
- **Rows written:** `data/snapshots/2026-11-20/comps.csv` already existed (copied forward from 19 Nov by another agent; 5,158 rows). I appended **801 rows** under `flock .comps.csv.lock`: 142 kept, 625 wider, 34 `Pxx:ours`. It now has 5,959 rows, all with 11 fields. Every row records platform, URL, stay, adults, basis (cleaning included), check time and set.

## Summary

| Ref | Comps kept (n per stay) | Our pct vs kept, open stays | Rating ours vs kept median; review gap | Booked vs market, next 30 / 60 | Supported positioning |
|---|---|---|---|---|---|
| **P11 2BR** | 12 (0–9) | Nov: **P50–P75 (+7% to +37%)**. Dec–Jan: **P0–P44 (−9% to −20%)**, except 8 Dec P100 (+55%) | Booking.com only vs Airbnb kept 4.685 (36.5): not comparable; gap NOT CHECKED | 50.0% (15/30) vs 51%; 43.3% (26/60) vs 38% | `quality_premium` = 0, so **0% vs the median on list all-in**. `recommend` gives hold at P50–P100 and raise +5% at P0–P44. **Hold 22–27 Nov; raise December and January toward the median.** Darts: about £279–£309 Smoobu room vs £246.00. |
| **P05 4BR** | 6 (0–5) | **P20–P33 (−5% to −15%)** | **4.79 (38)** vs 4.50 (17); **+21 reviews** | **73.3% (22/30) vs 47%**; 58.3% (35/60) vs 39% | `quality_premium` **+0.116**, so **+12% vs median**. `recommend` → **raise +21.6%** (both horizons). Smoobu room about £680 (7–9 Dec), £645 (13–15 Dec), £591 (29 Nov–3 Dec). At minimum the median: about £596 / £565 / £523. |
| **P06 2BR** | 12 (0–3) | **22–23 Nov P33 (−10%, n = 3), derived**; −3% at yesterday's card factor | 4.58 (12) vs 4.63 (26); **−14 reviews** | 77.8% (7/9 non-blocked) vs 52% | `quality_premium` −0.02, so **−2% vs median = about £290 all-in: hold to +11%** depending on the unobserved card factor. `recommend` → raise +10%, but the kept set is n = 3 and the lead is 2 days. |
| P08 2BR | not searched | n/a | – | handback 13 Nov | Moot (policy handback). |
| P14 1BR | 12 (0–7) | P100 | not on Airbnb; kept median 4.885 (19.5) | 0% vs 47% / 36% | Numbers only (special setup): **+49% to +130% vs kept median**. £450 is +131% vs PriceLabs 1 BR P50 (£195). |
| P17 1BR | 7 (0–3) | n/a | kept median 4.68 (52) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (same kept ids, repeated stays):**
- **November firmed on mixed moves.** P11 kept 22–27 Nov median £203 → £215 (+6%): 1159915905276842600 £206 → £230 (+12%; 24–26 Nov £238 → £312, +32%) while 1480693526878012391 cut £189 → £169 (−11%). 22–25 Nov £209 → £228.
- **P05 December softened:** 1639043256346803626 cut 7–9 Dec £571 → £530 (−7%) and 13–15 Dec £625 → £530 (−15%). The kept 13–15 Dec median fell £591 → £530 (−10%) and 7–9 Dec £572 → £553 (−3%). 29 Nov–3 Dec fell £500 → £449 because 912053248917940403 (£688) was not returned.
- **P11 December medians are higher, on more comps returned:** 15–18 Dec £363 → £388 (n 7), 17–19 Dec £388 → £438 (n 9), 3–6 Jan £289 → £305. 2–5 Dec £464 → £407 (n 1 → 2).
- P14 and P17 December are flat or slightly lower (P17 17–19 Dec £264 → £237, as the set changed).

**Our prices moved overnight** (19 → 20 Nov snapshot; open nights in both):
- **P11 +£35 over 34 nights:**
  - 22–27 Nov **£194.20 → £204.60** 5-night average (+5.4%).
  - 2–4 Dec £247.67 → **£240.67** (£200 / £214 / £329 → £215 / £230 / **£277**; 4 Dec −£52).
  - **8 Dec £292 → £311.**
  - Darts 14–18 Dec £245.80 → £246.00 (flat). 23–25 Dec £273.67 → £268.67. 3–5 Jan £185.33 → £186.33.
- **P05 −£106 over 25 nights, mostly January:** 4–18 Jan −£8 to −£14 a night.
  - On the priced stays: 29 Nov–2 Dec £501 / £485 / £485 / £510 → £500 / £484 / £482 / £501 (−£14). 7–8 Dec £484 / £465 → £484 / **£486** (+£20). 13–14 Dec £518 / £501 → £515 / £500. 21 Dec £2,038 → £2,049; 29 Dec £2,536 → £2,540.
- **P06:** 22–23 Nov £260 / £245 → **£274 / £255** (+£24).
- **P14 −£168 over 59 nights:** 18–20 Dec £484 / £507 / £457 → £450 / £471 / £486. 28 Dec–2 Jan −£8 to −£26 a night. 12 Dec £456 → £450.
- PriceLabs last refreshed P05/P06/P14 on 19 Nov (09:22Z / 10:56Z / 07:28Z) and P11 on 20 Nov 00:30Z (`listings.csv`). The P05/P06/P14 moves therefore come from the 19 Nov refresh, which ran after yesterday's snapshot.

## P11 Camden (3064196; Booking.com only)

### Open nights vs like-for-like comps (comps all-in, Airbnb, checked 20 Nov 07:19–07:24Z)

| Open nights (stay priced) | Ours room avg (19 Nov) | List all-in ×1.15 (×1.10) | Kept median (n) | **Pct / vs kept** | Wider median (n); pct / vs wider | Median-level Smoobu room* kept / wider |
|---|---|---|---|---|---|---|
| **22–26 Nov** (22–27 Nov, 5n, min 3) | £204.60 (£194.20) | £265.09 (£254.86) | £214.60 (4) | **P75 / +24%** | £205.00 (11); P82 / +29% | £161 / £152 |
| 22–24 Nov (22–25 Nov) | £197.33 (£187.00) | £276.60 (£266.73) | £228.17 (4) | P75 / +21% | £239.17 (16); P75 / +16% | £155 / £165 |
| **24–25 Nov** (24–26 Nov, midweek default) | £206.00 (£195.00) | £311.40 (£301.10) | £292.00 (4) | **P50 / +7%** | £274.50 (24); P67 / +13% | £189 / £174 |
| 24–26 Nov (24–27 Nov) | £212.67 (£202.00) | £294.23 (£283.60) | £214.67 (3) | P67 / +37% | £266.50 (16); P62 / +10% | £143 / £189 |
| **2–4 Dec** (2–5 Dec) | **£240.67 (£247.67)** | £326.43 (£314.40) | £407.33 (**2**) | P0 / −20% (n = 2) | **£360.00 (15); P27 / −9%** | £311 / **£270** |
| **8 Dec** (8–9 Dec, 1n, min 1, DSO +50%) | **£311 (£292)** | £506.65 (£491.10) | £326.50 (2) | **P100 / +55%** | £360.00 (13); P92 / +41% | £154 / £183 |
| **14–18 Dec, darts** (14–19 Dec, 5n) | **£246.00 (£245.80)** | £312.70 (£300.40) | £385.60 (3) | **P0 / −19%** | £351.20 (39); P38 / −11% | **£309 / £279** |
| 15–17 Dec (15–18 Dec) | £233.67 (£232.67) | £318.38 (£306.70) | £388.33 (7) | P14 / −18% | £349.17 (48); P42 / −9% | £294 / £260 |
| 17–18 Dec (17–19 Dec, 30-day window) | £280.00 (£282.00) | £396.50 (£382.50) | £437.50 (9) | P44 / −9% | £387.50 (39); P54 / +2% | £316 / £272 |
| **23–25 Dec** (23–26 Dec, min 2) | £268.67 (£273.67) | £358.63 (£345.20) | £416.67 (7) | **P43 / −14%** | £366.00 (43); P49 / −2% | £319 / £275 |
| 3–5 Jan (3–6 Jan, min 3) | £186.33 (£185.33) | £263.95 (£254.63) | £304.67 (8) | P38 / −13% | £266.67 (57); P49 / −1% | £222 / £189 |

\* Median-level Smoobu room = (median − £149 ÷ n) ÷ 1.15. This is the Smoobu rate whose Booking.com list price plus cleaning equals the comp median, before promotions (at ×1.10 add about 4.5%). Promotions stack on top (policy; their size is the channel agent's lane).

Excluded as not open: 21 Nov, 28 Nov–1 Dec, 19–22 Dec and 26 Dec on are booked. So the default Fri 27–Sun 29 Nov stay (wider £390, n 5) and the 30-day stay Sun 20–Tue 22 Dec (kept £438, n 9) are not open.

- **22–27 Nov: hold.** List is +21% to +37% vs kept (P67–P75). Our room rose 5.4% overnight. The kept median rose 6%, on mixed moves (one comp +12%, one −11%). Guests on promotions pay well below list (channel lane). `recommend(0.50, 0.51, 0.75, 0)` → hold.
- **Darts 14–18 Dec: still −19% vs kept / −11% vs wider (P0 / P38), flat overnight at £246.00.** Comps support about **£279 (wider) – £309 (kept) Smoobu room**. Reyhan's −2% on 14–18 Dec vs `darts_override_24oct` is already with Corentin as confirm-or-revert. Overrides are unchanged today, so it is still open (not a new proposal).
- **2–4 Dec: −9% vs wider (n = 15; kept n = 2).** 4 Dec fell £329 → £277 overnight on top of Reyhan's −2% on 3–4 Dec (also in the confirm-or-revert list). Supported: about **£270 room** (+12% on £240.67).
- **8 Dec: +55% vs kept / +41% vs wider, and rose again (£292 → £311).** A 1-night stay carries the full £149 cleaning. Supported: about **£154–£183 room**. The +50% DSO is open item t-p11-8dec-orphan (not new).
- **23–25 Dec:** −14% vs kept / −2% vs wider. Supported: about **£275–£319 room** (+2% to +19%).
- **3–5 Jan:** −13% vs kept, −1% vs wider. Supported: about £189–£222 room (hold to +19%).
- **PriceLabs cross-check (room, 2 BR):** the December open nights at £215–£311 sit between P25 £232 and P50 £293, except 8 Dec.
- **Positioning:** `quality_premium` = 0 (no comparable rating). `recommend(0.50, 0.51, pct, 0)` and `recommend(0.433, 0.38, pct, 0)` both give hold at P50–P100 (Nov, 8 Dec) and **raise +5%** at P0–P44 (2–5 Dec, darts, 15–19 Dec, 23–26 Dec, 3–6 Jan), where the kept median is 9% to 25% above our list. **Supported: the comp median (0%) on list all-in.**
- **Differentiators:** P11 is a basement flat with a patio and no lift. 4 of the 12 comps have a lift (1542815721953379556, 1543632408013225027, 654396087724294901, 1515051936255130803) and 3 have a balcony or terrace. 2557770 has 181 reviews; 654396087724294901 is a Superhost.

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272)

| Open nights (stay) | Smoobu room (19 Nov) | Guest sees on Airbnb, all-in/night | Kept median (n) | Pct / vs kept | Wider median (n) | Pct / vs wider |
|---|---|---|---|---|---|---|
| **22–23 Nov** (22–24 Nov, min 2) | **£274 / £255** (£260 / £245) | **card not returned**; derived £266.84 at 0.765, or about £288 at yesterday's 0.845 | **£296.00 (3)** | **P33 / −10%** (derived 0.765); about −3% at 0.845 | £365.25 (36) | P33 / −27% |
| 29 Nov (29–30 Nov, 1n) | £269, **unavailable**, min 3 | (derived £335) | £445.00 (2) | excluded (not open) | £443.00 (24) | excluded |

- Kept: 744585770789956203 £296 (unchanged), 854346637654279747 £265 (unchanged), 1315177393080154583 £310.50 (back after 1 day).
- Our Smoobu rose +£24 over the two nights. With the card unobserved, the gap is −10% (0.765) or −3% (0.845). The cause of yesterday's 0.845 card is still NOT CHECKED (channel lane).
- **Positioning:** `quality_premium(4.58, 4.63)` = −0.02. `recommend(0.778, 0.52, 0.33, −0.02)` → raise +10%. **Supported: −2% vs kept median = about £290 all-in.** That is about £267 Smoobu room at 0.845 (today's £264.50 average: hold) or about £295 at 0.765 (+11%). The +10% rests on occupancy; kept n = 3 and a 2-day lead do not support more than the −2% level. Conditional on the opening (t-p06-2229open).
- **New since 19 Nov 06:00Z: Reyhan, 19 Nov 10:55:50Z, a min-stay-only DSO on 24 Nov–5 Dec (min 3, no price).** In effect, 29 Nov was already unavailable at min 4 and now shows min 3. 24–28 Nov is booked and 30 Nov on is blocked. Numbers only; it does not touch the intentional block.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Gap (stay) | Smoobu room/night (19 Nov), min | Ours, Airbnb all-in/night | Kept median, 6 ids (n) | Pct / vs median | Wider 4BR ≤1.25 km (n) | +11.6% supported → Smoobu room; median-level |
|---|---|---|---|---|---|---|
| **7–8 Dec** (7–9 Dec) | £484 / £486 (£485 / £465), min 2 | **£469.00 obs** | £553.25 (4) | **P25 / −15%** | £529.50 (9): −11% | about **£680**; median-level about **£596** |
| **13–14 Dec** (13–15 Dec) | £515 / £500 (£518 / £501), min 2 | **£486.00 obs** | £529.50 (5) | **P20 / −8%** | £519.75 (10): −6% | about **£645**; median-level about **£565** |
| 29 Nov–2 Dec (29 Nov–3 Dec, min 3) | £500 / £484 / £482 / £501 (Reyhan −2%) | £425.00 obs | £449.00 (3) | P33 / −5% | £439.50 (8): −3% | about £591; median-level about £523 |
| **21 Dec** (1n, min 1) | £2,049 | £2,040.00 obs | n = 0 | – | £706 (2) | +189% vs wider |
| **29 Dec** (1n, min 1) | £2,540 | £2,481.00 obs | n = 0 | – | £430 (1) | +477% vs wider (n = 1) |

- The 1-night 7–8 / 13–14 Dec searches returned no kept comp. Wider n = 3 (£491 / £562); ours derived is +15% / +5% (full £195 cleaning on 1 night).
- **The gaps narrowed from the market side:** 1639043256346803626 (4.90, Superhost, terrace, parking) cut 13–15 Dec by 15% and 7–9 Dec by 7%. Ours moved −£4 / +£20. 13–15 Dec −18% → −8%; 7–9 Dec −19% → −15%.
- **Thin set:** n = 3–5, with 1606112160333193293 at £1,020 inside every December median. At the wider medians (n = 9–10), 7–9 / 13–15 Dec are −11% / −6%.
- Reyhan's −2% on 29 Nov–2 Dec is still in place (overrides unchanged). It is already with Corentin as confirm-or-revert; not raised as new.
- **PriceLabs 4 BR cross-check (room):** £482–£515 sits between P25 £453 and P50 £567. 21 and 29 Dec are above P90 (£1,231). Reyhan's +300% DSO is open action a-p05-dec; not raised as new.
- **Positioning:** `quality_premium(4.79, 4.50)` = **+0.116**. `recommend(0.733, 0.47, 0.25, 0.116)` and `recommend(0.583, 0.39, 0.20–0.33, 0.116)` → **raise +21.6%**. **Supported: +12% vs median**, about £680 (7–8 Dec) / £645 (13–14 Dec) Smoobu room. At minimum the median: about **£596 / £565**, +23% / +11% on today's prices.
- **Differentiators:** 912053248917940403 (4.97, Superhost, lift, park view; not returned today) and 1639043256346803626 (4.90, Superhost, terrace, parking) are the quality peers. 3 comps list parking and 3 a balcony or terrace. Ours: Abbey Road location; no parking or terrace on record (NOT CHECKED on the page today).

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- **Smoobu 20 Nov:** £450 on every night to 17 Dec (min 3–4; 12 Dec £456 → £450). 18–20 Dec £450 / £471 / £486 (was £484 / £507 / £457). 25–31 Dec £451–£700 (was £457–£726). 1–2 Jan £624 / £554.
- **Booked:** 0% next 30 / 60 vs market 47% / 36% (pl_kpis). No P14 Smoobu reservation.
- **Vs kept median, P100 on every priced stay:**
  - 24–26 Nov **+130%** (n 4; median £208 → £196).
  - 7–9 Dec +49% (7); 14–16 Dec +55% (7); 17–19 Dec +66% (6).
  - 19–21 Dec +62% (4); **20–22 Dec +61% (4)**.
  - 27–29 Nov: kept n = 0, wider +33% (n 5).
- **PriceLabs 1 BR:** P50 £195, P90 £278. £450 is +131% vs P50.
- Engine move −£168 over 59 open nights (18–19 Dec and 28 Dec–2 Jan). Numbers only. Reyhan's 450 minimum (vs £500 in policy) is already in the confirm-or-revert list; not re-raised.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)
- **Kept medians:** 24–26 / 27–29 Nov n = 0 (wider 24–26 Nov £150, n 3); 7–9 Dec £210.25 (2); 14–16 Dec £214.00 (3); 17–19 Dec £237.00 (3); 19–21 Dec £224.00 (2); **20–22 Dec £218.50 (2)**. Rating median 4.68 (52).

## P08 Islington: handback
- Policy last night 13 Nov. Not searched; no rows written.

## Comp tables

**Source for every comp row:** Airbnb public search (airbnb.co.uk), checked 2026-11-20 07:19:30–07:23:55Z. Nightly = total ÷ nights, after offers, cleaning included, taxes excluded. Rating (reviews) and sleeps come from each listing page (07:19–07:21Z). Dist km is from 17 Nov. (±%) = change vs 19 Nov for the same stay. "n/a" = not returned (booked or min stay). "Ours" rows come from the 20 Nov snapshot (Smoobu = PriceLabs). Every priced row is in `data/snapshots/2026-11-20/comps.csv`.

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) 20 Nov | Sun 22 Nov–Wed 25 Nov (3n) | Sun 22 Nov–Fri 27 Nov (5n) | Tue 24 Nov–Thu 26 Nov (2n) | Tue 24 Nov–Fri 27 Nov (3n) | Fri 27 Nov–Sun 29 Nov (2n) | Wed 2 Dec–Sat 5 Dec (3n) | Tue 8 Dec–Wed 9 Dec (1n) | Mon 14 Dec–Sat 19 Dec (5n) | Tue 15 Dec–Fri 18 Dec (3n) | Thu 17 Dec–Sat 19 Dec (2n) | Sat 19 Dec–Mon 21 Dec (2n) | Sun 20 Dec–Tue 22 Dec (2n) | Wed 23 Dec–Sat 26 Dec (3n) | Sun 3 Jan–Wed 6 Jan (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.71 (31) | £394 (-3%) | £384 (-2%) | £440 | £416 | n/a | n/a | n/a | n/a (was £442) | £451 | £524 | £569 | £560 | £555 | n/a (was £273) | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (181) | n/a | n/a | n/a | n/a | n/a | n/a | £400 | £351 | £363 | £388 | £388 | £388 | n/a (was £392) | £305 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | n/a | £272 | n/a | n/a | £464 | n/a | n/a (was £407) | n/a (was £416) | £490 | £534 | £525 | £520 | £304 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | £257 (+18%) | £230 (+12%) | £312 (+32%) | n/a (was £227) | n/a | n/a | n/a | n/a (was £400) | £417 | £438 | £438 | £438 | £417 | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.54 (13) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £407 | £416 | £490 | £534 | £525 | n/a | £247 | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.69 (13) | n/a | n/a | n/a | n/a | n/a | £350 | n/a | £386 (-2%) | £388 | £469 | £515 (-3%) | £496 | £507 (-1%) | £422 (-1%) | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | £175 (-13%) | £169 (-11%) | n/a (was £222) | £195 (-6%) | n/a | n/a | n/a | n/a (was £325) | £342 | £362 | n/a | n/a | £342 | £342 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.42 (64) | n/a | n/a | n/a | n/a | n/a | n/a | £253 | n/a | £260 | £311 | n/a | £311 | £307 | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.73 (88) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £195 | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (74) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a (was £192) | £234 (-1%) | n/a | £222 | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.56 (39) | £200 | £199 | £217 | £215 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £312 | £339 | £216 | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Kept median (n)** | | | | £228 (4) | £215 (4) | £292 (4) | £215 (3) | – (0) | £407 (2) | £326 (2) | £386 (3) | £388 (7) | £438 (9) | £524 (6) | £438 (9) | £417 (7) | £305 (8) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £239 (16) | £205 (11) | £274 (24) | £266 (16) | £390 (5) | £360 (15) | £360 (13) | £351 (39) | £349 (48) | £388 (39) | £534 (23) | £467 (30) | £366 (43) | £267 (57) | |
| **Ours, Smoobu room/night (status, min)** | | | | £197 Open, min 3 | £205 Open, min 3 | £206 Open, min 3 | £213 Open, min 3 | £265 Booked/Open, min 3 | £241 Open, min 2/3 | £311 Open, min 1 | £246 Open, min 2/3 | £234 Open, min 2/3 | £280 Open, min 2 | £322 Booked, min 4 | £272 Booked, min 4 | £269 Open, min 2 | £186 Open, min 3 | |
| **Ours, comparable basis** | | | | £277 | £265 | £311 | £294 | £379 | £326 | £507 | £313 | £318 | £396 | £445 | £387 | £359 | £264 | list = Smoobu ×1.15 (policy) + £149/n |
| **Our pct / vs kept median** | | | | P75 / +21% | P75 / +24% | P50 / +7% | P67 / +37% | n = 0 | P0 / -20% | P100 / +55% | P0 / -19% | P14 / -18% | P44 / -9% | excluded (not open) | excluded (not open) | P43 / -14% | P38 / -13% | |
| Our pct / vs wider median | | | | P75 / +16% | P82 / +29% | P67 / +13% | P62 / +10% | P40 / -3% | P27 / -9% | P92 / +41% | P38 / -11% | P42 / -9% | P54 / +2% | excluded | excluded | P49 / -2% | P49 / -1% | |

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) 20 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 7 Dec–Tue 8 Dec (1n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Mon 14 Dec (1n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 19 Dec–Mon 21 Dec (2n) | Sun 20 Dec–Tue 22 Dec (2n) | Mon 21 Dec–Tue 22 Dec (1n) | Tue 29 Dec–Wed 30 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.15 (13) | £498 | n/a | £449 | n/a | £453 | n/a | £469 | n/a | n/a | n/a | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | n/a | n/a | £552 | n/a | £1,020 | n/a | £1,020 | £1,020 | £1,070 | n/a | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (30) | n/a | n/a | n/a (was £688) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | £400 | n/a | £375 | n/a | n/a | n/a | £510 | £568 | £548 | n/a | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.9 (30) | n/a | n/a | n/a | n/a | £530 (-7%) | n/a | £530 (-15%) | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| [1481043902711346984](https://www.airbnb.co.uk/rooms/1481043902711346984) | 1.16 | 8 | 4.76 (17) | n/a | n/a | n/a | n/a | £577 (+1%) | n/a | £592 | n/a | n/a | n/a | n/a | added 18 Nov |
| **Kept median (n)** | | | | £449 (2) | – (0) | £449 (3) | – (0) | £553 (4) | – (0) | £530 (5) | £794 (2) | £809 (2) | – (0) | – (0) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £498 (4) | £954 (1) | £440 (8) | £491 (3) | £530 (9) | £562 (3) | £520 (10) | £627 (5) | £695 (6) | £706 (2) | £430 (1) | |
| **Ours, Smoobu room/night (status, min)** | | | | £513 Booked, min 3 | £556 Booked, min 4 | £492 Open, min 3 | £484 Open, min 2 | £485 Open, min 2 | £515 Open, min 2 | £508 Open, min 2 | £652 Booked, min 2/3 | £1,338 Booked/Open, min 1/2 | £2,049 Open, min 1 | £2,540 Open, min 1 | |
| **Ours, comparable basis** | | | | £490 | £523 | £425 obs | £565 | £469 obs | £589 | £486 obs | £684 | £1,301 | £2,040 obs | £2,481 obs | obs = own Airbnb card in same search; else 0.765/0.900 × Smoobu + cleaning/n |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | P33 / -5% | n = 0 | P25 / -15% | n = 0 | P20 / -8% | excluded (not open) | P100 / +61% | n = 0 | n = 0 | |
| Our pct / vs wider median | | | | excluded | excluded | P38 / -3% | P67 / +15% | P44 / -11% | P67 / +5% | P30 / -6% | excluded | P100 / +87% | P100 / +189% | P100 / +477% | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) 20 Nov | Sun 22 Nov–Tue 24 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Sun 29 Nov–Mon 30 Nov (1n) | Sat 19 Dec–Mon 21 Dec (2n) | Sun 20 Dec–Tue 22 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.62 (13) | n/a | n/a | n/a | n/a | £470 | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.71 (24) | £296 | n/a | n/a | n/a | n/a | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | £265 | n/a (was £275) | n/a | £315 | n/a | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | n/a | n/a | n/a | £630 | £589 | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | n/a | n/a (was £354) | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (54) | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | £575 | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.6 (25) | £310 | £343 (-5%) | n/a | n/a | n/a | £470 | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | n/a | n/a | n/a | £606 | £588 | parking listed |
| **Kept median (n)** | | | | £296 (3) | £343 (1) | – (0) | £445 (2) | £606 (3) | £588 (3) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £365 (36) | £350 (35) | £1,232 (10) | £443 (24) | £807 (26) | £589 (33) | |
| **Ours, Smoobu room/night (status, min)** | | | | £264 Open, min 2 | £358 Booked, min 3 | £408 Booked, min 3 | £269 Blocked, min 3 | £489 Blocked, min 4 | £493 Blocked, min 3/4 | |
| **Ours, comparable basis** | | | | £267 | £338 | £377 | £335 | £505 | £508 | obs = own Airbnb card in same search; else 0.765/0.900 × Smoobu + cleaning/n |
| **Our pct / vs kept median** | | | | P33 / -10% | excluded (not open) | excluded (not open) | excluded (not open) | excluded (not open) | excluded (not open) | |
| Our pct / vs wider median | | | | P33 / -27% | excluded | excluded | excluded | excluded | excluded | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) 20 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Sat 19 Dec–Mon 21 Dec (2n) | Sun 20 Dec–Tue 22 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a (was £162) | n/a | n/a | £252 | £252 | £252 | £278 | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a (was £198) | n/a | £352 | £352 | £352 | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | n/a | £246 | £246 | £253 | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | £172 | n/a | £302 | £302 | £302 | £302 | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | £172 | n/a | £302 | £302 | n/a | n/a | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 4.92 (13) | n/a | n/a | n/a | £290 | £290 | £290 | n/a | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | £368 | n/a | £402 | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (20) | n/a | n/a | £243 (+1%) | n/a | n/a | n/a | £235 | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (19) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | n/a | £241 | £241 | £241 | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | £218 | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Kept median (n)** | | | | £196 (4) | – (0) | £302 (7) | £290 (7) | £271 (6) | £296 (4) | £290 (4) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £216 (16) | £338 (5) | £302 (19) | £246 (31) | £285 (23) | £299 (18) | £295 (21) | |
| **Ours, Smoobu room/night (status, min)** | | | | £450 Open, min 3 | £450 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3/4 | £478 Open, min 4 | £468 Open, min 3/4 | |
| **Ours, comparable basis** | | | | £450 | £450 | £450 | £450 | £450 | £478 | £468 | Smoobu room |
| **Our pct / vs kept median** | | | | P100 / +130% | n = 0 | P100 / +49% | P100 / +55% | P100 / +66% | P100 / +62% | P100 / +61% | |
| Our pct / vs wider median | | | | P100 / +109% | P100 / +33% | P100 / +49% | P100 / +83% | P100 / +58% | P100 / +60% | P100 / +59% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) 20 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Sat 19 Dec–Mon 21 Dec (2n) | Sun 20 Dec–Tue 22 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | n/a | n/a | £192 | £192 | n/a | £199 | £192 | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (52) | n/a | n/a | n/a | £252 | £293 | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | n/a (was £234) | n/a (was £212) | £230 | £249 (-5%) | £245 | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | n/a | n/a | n/a (was £224) | n/a | n/a | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.68 (63) | n/a | n/a | n/a | £214 | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.43 (170) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.75 (28) | n/a | n/a | £228 | n/a | £237 | n/a | n/a | none listed |
| **Kept median (n)** | | | | – (0) | – (0) | £210 (2) | £214 (3) | £237 (3) | £224 (2) | £218 (2) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £150 (3) | – (0) | £217 (6) | £205 (8) | £238 (6) | £212 (5) | £228 (4) | |
| Ours | | | | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | |

Data gaps:
- **Booking.com live prices: NOT CHECKED** (AWS WAF; not attempted, not bypassed). P11 is compared at list (Smoobu × 1.15 policy; × 1.10 alongside) + £149 cleaning ÷ n, not the promoted price a guest sees. Whether +15% has reached the Booking.com Standard rate is NOT CHECKED.
- **P11 review count on Booking.com** is not in `listings.csv`: review gap NOT CHECKED, and `quality_premium` = 0 by construction.
- **P06 own Airbnb card was not returned on 22–24 Nov today:** our comparable is derived (0.765), with yesterday's observed 0.845 shown alongside. The cause of the 0.845 is NOT CHECKED (channel lane).
- **Comp activity:** 11 kept ids were not returned on any stay today (5 of them for 8 days). All pages are HTTP 200 and one gained a review overnight. Calendars: NOT CHECKED, so none was replaced.
- **Today's channel section** was not yet written. The commission finding used is the 19 Nov one (Visibility Booster, expected).
- **Thin samples:**
  - P06 22–24 Nov n = 3.
  - P11 Nov n = 3–4, 2–5 Dec n = 2, 8 Dec n = 2 and darts 14–19 Dec n = 3 (wider used alongside).
  - P05 n = 3–5 with a £1,020 outlier; 1-night stays and 21 / 29 Dec n = 0.
  - P14 27–29 Nov n = 0; P17 n = 0–3.
- **Wider set** is not filtered to at least 10 reviews (cards carry no review count).
- **Whether Airbnb comp prices include VAT:** NOT CHECKED.
- **PriceLabs percentiles** are Nearby Listings summary-table room prices for an unspecified window, not the same dates. `market.csv` is the market agent's; nothing was written to it.
- **P17** is not in PriceLabs or Smoobu. **P08** is a handback and was not searched.
