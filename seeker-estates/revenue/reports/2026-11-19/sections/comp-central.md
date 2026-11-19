# Competitor positioning: CENTRAL/NORTH (D = 2026-11-19)

**Method**
- **Policy read first** (`data/policy.json`). Not raised again: P06 intentional blocks (from 30 Nov), P14 special setup (numbers only), Camden Booking.com Visibility Booster 18%, Booking.com promotion stacking (size only), 15%/20% stay discounts, Booking.com markup (+15% from 18 Nov), `darts_override_24oct`, P08 handback (last night 13 Nov).
- **Commission:** the channel agent's finding is used (Camden ~18% = Visibility Booster, expected). Not re-raised.
- **Comp ids: the same 49 ids as 18 Nov** (P05 6, P06 12, P11 12, P14 12, P17 7). **No comp replaced, none added.**
  - All 49 listing pages returned **HTTP 200** (checked 2026-11-19 07:19:45–07:21:15Z). Rating, review count and capacity refreshed from each page. Every kept comp has ≥12 reviews.
  - Not returned on any stay today: P06 917140285217729256, 1452940332365117153 (**7th day**), 673753763892997438 (new today); P14 1075245497252121738, 1659680062193836633 (**7th day**); P17 975294297333089697 (**7th day**); P11 1515051936255130803 (new today). Pages are live, and two of them gained reviews overnight (P14 1659680062193836633 17 → 18; P17 975294297333089697 168 → 170), so they are still trading. Calendars were not probed, so "bookable in the next 60 days" is **NOT CHECKED** for these seven. Kept.
  - **P08 not searched** (handback).
- **Searches:** 44 public Airbnb map searches on airbnb.co.uk, 335 result pages, 4,213 cards, **checked 2026-11-19 07:19:23–07:24:00Z**. No parse failure, no bot challenge. Same filters, boxes and flat centres as 18 Nov (entire home, min bedrooms = ours, adults P05 7 / P06 5 / P11 5 / P14 3 / P17 3).
  - "Wider" = same bedroom count exactly, a numeric rating shown, ≤1.25 km. Search cards carry no review count, so **the wider set is NOT filtered to ≥10 reviews**.
  - Scripts: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c19s/`. Raw: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c19/search/*.json`; analysis `.../c19/analysis.json`.
- **Stays priced for every comp and for us:** Fri 20–Sun 22 Nov (next Fri–Sun); Tue 24–Thu 26 Nov (midweek); Sat 19–Mon 21 Dec (30 days out), plus Fri 18–Sun 20 Dec (repeat of 18 Nov's 30-day stay, for the trend).
  - Brief extras. P11: 22–25 / 22–27 / 24–27 Nov, 2–5 Dec, 8–9 Dec, darts 14–19 / 15–18 / 17–19 Dec, 23–26 Dec, 3–6 Jan. P05: 29 Nov–3 Dec, 7–8 / 7–9 Dec, 13–14 / 13–15 Dec, 21–22 Dec, 29–30 Dec. P06: 22–24 Nov, 29–30 Nov. P14/P17: 7–9, 14–16, 17–19 Dec.
  - P11 19 Nov (tonight) is not in `prices.csv` and cannot sell (min 2, 20 Nov booked); not priced.
- **Our prices:** `data/snapshots/2026-11-19/prices.csv` (Smoobu = PriceLabs on every open night, Dispatcher). Booked/open from Smoobu `reservations.csv` (confirmed only).
- **Price basis:** comps = Airbnb total ÷ nights, after offers, **cleaning included**, taxes excluded.
  - P05 and P06 = our own Airbnb card in the same search ("obs"); else derived 0.765 × Smoobu (0.900 beyond 28 days) + cleaning ÷ n. P05 obs re-fit exactly at 0.765 today (29 Nov–3 Dec £1,711 = 0.765 × £1,981 + £195; 7–9 Dec £922; 13–15 Dec £975).
  - **P06 22–24 Nov card did NOT fit:** £556 total today vs £518 yesterday, while Smoobu went £508 → £505. Implied factor 0.845 (was 0.766), if cleaning is still £129. Cause NOT CHECKED (channel agent's lane: a-airbnb-rules).
  - P11 (Booking.com only) at **list all-in = Smoobu × 1.15 (policy markup from 18 Nov) + £149 ÷ n**, before promotions. Corentin's 18 Nov screenshots still showed Standard = Smoobu × 1.10, so the × 1.10 result is given alongside. Booking.com live: **NOT CHECKED** (AWS WAF; not attempted, not bypassed).
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` (listing, 18–19 Nov, P05/P06/P11/P14): **5 entries, all Reyhan, 18 Nov 12:13–12:16Z** (after yesterday's report said 0):
    - P11 18–19 Nov +5% min 2; **P11 3–4 Dec −2% min 2; P11 14–15 Dec −2% min 3; P11 16–18 Dec −2% min 2**; **P05 29 Nov–2 Dec −2% min 3**.
  - `get_listing_date_overrides` P11 (19 Nov–10 Jan) confirms them. 8 Dec still +50% min 1; 23–25 Dec +5%; 22 Nov–2 Dec −5%. P05: 21 / 29 Dec still +300% min 1; 7–8 Dec +3%; 13–14 Dec +5%.
  - `get_neighbourhood_data` (Nearby Listings summary table; room price, cleaning excluded, window unspecified): **P11 2 BR P25 231 / P50 292 / P75 333 / P90 386 (n 172)**; **P05 4 BR 453 / 565 / 692 / 1,225 (n 92)**; **P14 1 BR 148 / 194 / 232 / 277 (n 170)**.
- **Rows written:** `data/snapshots/2026-11-19/comps.csv` already existed (copied forward by another agent). Appended **788 rows** under `flock .comps.csv.lock`: 145 kept, 597 wider, 46 `Pxx:ours`. Every row records platform, URL, stay, adults, basis (cleaning included), check time and set.

## Summary

| Ref | Comps kept (n per stay) | Our pct vs kept, open stays | Rating ours vs kept median; review gap | Booked vs market, next 30 / 60 | Supported positioning |
|---|---|---|---|---|---|
| **P11 2BR** | 12 (0–8) | Nov: **P75–P80 (+25% to +28%)**; Dec–Jan: **P0–P38 (−9% to −28%)** exc. 8 Dec P100 (+48%) and 17–19 Dec P57 (+3%) | Booking.com 8.0/10 vs Airbnb kept 4.685 (36): not comparable; gap NOT CHECKED | 46.7% (14/30) vs 50%; 43.3% (26/60) vs 38% | `quality_premium` 0, so **0% vs the median on list all-in**. `recommend` gives hold at P57–P100 and raise +5% at P0–P38. **Hold 22–27 Nov; raise December/January toward the median** (darts about £280–£318 Smoobu room vs £229 avg 14–17 Dec). |
| **P05 4BR** | 6 (0–5) | **P20–P25** (−14% to −19%) | **4.79 (38)** vs 4.50 (17); **+21 reviews** | **73.3% (22/30) vs 46%**; 60.0% (36/60) vs 39% | `quality_premium` **+0.116**, so **+12% vs median**. `recommend` → **raise +21.6%** (both horizons). 7–9 Dec about £707, 13–15 Dec about £735 Smoobu room; at minimum the median, about £620 / £645. |
| **P06 2BR** | 12 (0–3) | **22–23 Nov P50 (−1%, n = 2)** | 4.58 (12) vs 4.63 (26); **−14 reviews** | 80% (8/10 non-blocked) vs 51% | `quality_premium` −0.02, so **−2% vs median (about £275 all-in): hold** at today's £278 card. `recommend` → raise +10% (about £306 all-in); wider n = 35 is −25%, but the kept set is n = 2. Conditional on t-p06-2229open. |
| P08 2BR | not searched | n/a | – | handback 13 Nov | Moot (policy handback). |
| P14 1BR | 12 (0–7) | P100 | not on Airbnb; kept median 4.885 (19.5) | 0% vs 47% / 36% | Numbers only (special setup): **+49% to +116% vs kept median**; £450 is +132% vs PriceLabs 1 BR P50 (£194). |
| P17 1BR | 7 (0–5) | n/a | kept median 4.68 (52) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (same kept ids, repeated stays):** flat in December (0% median change on every repeated December stay). **November softened:** P11 22–27 Nov −5.6% (1159915905276842600 £230 → £206, 1480693526878012391 £205 → £189), 22–25 Nov −6.4%; P06 24–26 Nov −5.5%; P14 24–26 Nov −4.2%. One P05 comp cut hard: 1610095240357069208 7–9 Dec £509 → £453 (−11%), 13–15 Dec £570 → £469 (−18%). Another rose: 1639043256346803626 13–15 Dec £572 → £625 (+9%).

**Our prices moved overnight** (18 → 19 Nov snapshot):
- **P11:** 22–26 Nov £208.20 → **£194.20** 5-night average (−6.7%). 2–4 Dec £272.67 → **£247.67** (£211/£273/£334 → £200/£214/£329). **Darts 14–18 Dec £252.20 → £245.80** (£218/£220/£227/£251/£313); **14–17 Dec average £236.75 → £229.00**. 8 Dec £288 → £292. 23–25 Dec £280.00 → £273.67. 3–5 Jan £183.67 → £185.33. Reyhan's −2% overrides (3–4 and 14–18 Dec) are part of these drops; the engine's share is NOT CHECKED.
- **P05:** 7–8 Dec £487/£486 → £485/£465; 13–14 Dec £516/£500 → £518/£501; 29 Nov–2 Dec £505/£491/£493/£516 → £501/£485/£485/£510 (Reyhan −2%); 21 Dec £2,039 → £2,038; 29 Dec £2,569 → £2,536.
- **P06:** 22–23 Nov £261/£247 → £260/£245. 29 Nov still unavailable (£255, min 4).
- **P14:** 18–20 Dec £543/£520/£471 → £484/£507/£457; 17 Dec £450.

## P11 Camden (3064196; Booking.com only)

### Open nights vs like-for-like comps (comps all-in, Airbnb, checked 19 Nov 07:19–07:24Z)

| Open nights (stay priced) | Ours room avg (18 Nov) | List all-in ×1.15 (×1.10) | Kept median (n) | **Pct / vs kept** (×1.10) | Wider median (n); vs wider | Median-level Smoobu room* kept / wider |
|---|---|---|---|---|---|---|
| **22–26 Nov** (22–27 Nov, 5n, min 3) | £194.20 (£208.20) | £253.13 (£243.42) | £202.80 (4) | **P75 / +25%** (P75 / +20%) | £206.00 (13); +23% | £150 / £153 |
| 22–24 Nov (22–25 Nov) | £187.00 (£200.67) | £264.72 (£255.37) | £209.17 (4) | P75 / +27% (+22%) | £216.67 (19); +22% | £139 / £145 |
| **24–25 Nov** (24–26 Nov, midweek default) | £195.00 (£209.50) | £298.75 (£289.00) | £237.50 (5) | **P80 / +26%** (P80 / +22%) | £260.00 (27); +15% | £142 / £161 |
| 24–26 Nov (24–27 Nov) | £202.00 (£216.67) | £281.97 (£271.87) | £221.00 (4) | P75 / +28% (+23%) | £274.00 (19); +3% | £149 / £195 |
| **2–4 Dec** (2–5 Dec) | **£247.67 (£272.67)** | £334.48 (£322.10) | £464.33 (**1**) | P0 / −28% (n = 1) | **£356.67 (16); P31 / −6%** | – / **£267** |
| **8 Dec** (8–9 Dec, 1n, min 1, DSO +50%) | £292 (£288) | £484.80 (£470.20) | £326.50 (2) | **P100 / +48%** (+44%) | £360.00 (13); P85 / +35% | £154 / £184 |
| **14–18 Dec, darts** (14–19 Dec, 5n) | **£245.80 (£252.20)** | £312.47 (£300.18) | **£395.90 (6)** | **P0 / −21%** (P0 / −24%) | £351.20 (41); P37 / −11% | **£318 / £280** |
| 15–17 Dec (15–18 Dec) | £232.67 (£239.33) | £317.23 (£305.60) | £363.00 (7) | P29 / −13% (−16%) | £353.33 (48); −10% | £273 / £264 |
| 17–18 Dec (17–19 Dec) | £282.00 (£286.00) | £398.80 (£384.70) | £387.50 (7) | P57 / +3% (−1%) | £385.00 (33); +4% | £272 / £270 |
| **23–25 Dec** (23–26 Dec, min 2) | £273.67 (£280.00) | £364.38 (£350.70) | £404.17 (8) | **P38 / −10%** (−13%) | £392.50 (38); −7% | £308 / £298 |
| 3–5 Jan (3–6 Jan, min 3) | £185.33 (£183.67) | £262.80 (£253.53) | £288.83 (8) | P38 / −9% (−12%) | £263.00 (54); 0% | £208 / £186 |

\* Median-level Smoobu room = (median − £149 ÷ n) ÷ 1.15: the Smoobu rate whose Booking.com list price plus cleaning equals the comp median, before promotions (at ×1.10 add about 4.5%). Promotions stack on top (policy; size is the channel agent's). 18–20 Dec is part-booked (19 Dec check-in) and 19–21 Dec booked: excluded. 20–22 Nov booked.

- **22–27 Nov: hold.** List is +25% to +28% vs kept (P75–P80), but the comps themselves fell 4–6% overnight and ours fell 6.7%; guests on promotions pay well below list (~0.69× on recent bookings, channel). `recommend(0.467, 0.50, 0.75, 0)` → hold.
- **Darts 14–18 Dec: still −21% vs kept / −11% vs wider (P0 / P37).** Reyhan set **−2% on 14–18 Dec** on 18 Nov 12:14Z (replacing the min-stay-only override); the 14–17 Dec average fell to **£229.00**. This conflicts with `darts_override_24oct` (+5%, "leave as it is") and the 21 Oct ">£300/night" decision: **Reyhan edit vs standing decision → Corentin to confirm or revert** (not a new proposal). Comps support about **£280 (wider) – £318 (kept) Smoobu room**, which is in line with the policy intent.
- **2–4 Dec:** fell to −6% vs wider (n = 16; kept n = 1), partly from Reyhan's −2% on 3–4 Dec. Supported: about **£267 room** (+8% on £247.67).
- **8 Dec:** still **+48% vs kept / +35% vs wider**; a 1-night stay carries the full £149 cleaning. Supported about **£154–£184 room**. The +50% DSO is open item t-p11-8dec-orphan (not new).
- **23–25 Dec:** −10% vs kept / −7% vs wider. Supported about **£298–£308 room** (+9% to +13%).
- **3–5 Jan:** −9% vs kept, 0% vs wider. Supported about £186–£208 room (hold to +12%).
- **30 days out (17–19 Dec):** at the median (+3% / +4%): hold.
- **PriceLabs cross-check (room, 2 BR):** the December open nights at £218–£313 sit between P25 £231 and P50 £292 (summary table, cleaning excluded).
- **Positioning:** `quality_premium` = 0 (no comparable rating). `recommend(0.467, 0.50, pct, 0)` and `recommend(0.433, 0.38, pct, 0)`: hold at P57–P100 (Nov, 8 Dec, 17–19 Dec); **raise +5%** at P0–P38 (2–5 Dec, darts, 15–18 Dec, 23–26 Dec, 3–6 Jan), where the median itself is +8% to +38% above our list. **Supported: the comp median (0%) on list all-in.**
- **Differentiators:** P11 is a basement flat with a patio and no lift. 4 of 12 comps have a lift (1542815721953379556, 1543632408013225027, 654396087724294901, 1515051936255130803) and 3 have a balcony or terrace. 2557770 has 181 reviews; 654396087724294901 is a Superhost.

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272)

| Open nights (stay) | Smoobu room (18 Nov) | **Guest sees on Airbnb, all-in/night** | Kept median (n) | Pct / vs kept | Wider median (n) | Pct / vs wider |
|---|---|---|---|---|---|---|
| **22–23 Nov** (22–24 Nov, min 2) | £260 / £245 (£261 / £247) | **£278.00 obs** (£556 total; was £518) | **£280.50 (2)** | **P50 / −1%** | £368.50 (35) | P34 / −25% |
| 29 Nov (29–30 Nov, 1n) | £255, **unavailable**, min 4 | (derived £324) | £445.00 (2) | excluded (not open) | £498.00 (25) | excluded |

- Kept n = 2: 744585770789956203 £296 (back after 1 day) and 854346637654279747 £265 (unchanged); 1315177393080154583 (£333 yesterday) not returned.
- **The gap closed from our side, not the market's:** our card rose £259 → £278 (+7%) with Smoobu flat. The −13% gap of 18 Nov is now −1%.
- **Positioning:** `quality_premium(4.58, 4.63)` = −0.02. `recommend(0.80, 0.51, 0.50, −0.02)` → raise +10%. **Supported: −2% vs kept median = about £275 all-in: hold at today's £278.** The +10% (about £306 all-in) rests on occupancy and the wider set (n = 35, median £368.50); kept n = 2 and 3 days' lead do not support more. Conditional on the opening (t-p06-2229open).
- 29 Nov: unavailable since 18 Nov, next to the intentional block. Numbers only, not raised.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Gap (stay) | Smoobu room/night, min | Ours, Airbnb all-in/night | Kept median, 6 ids (n); legacy 5 | Pct / vs median | Wider 4BR ≤1.25 km (n) | +11.6% supported → Smoobu room; median-level |
|---|---|---|---|---|---|---|
| **7–8 Dec** (7–9 Dec) | £485 / £465 (£487 / £486), min 2 | **£461.00 obs** | £572.00 (4); £571.00 (3) | **P25 / −19%** | £570.50 (8): −19% | £638.35 → about **£707**; median-level about **£620** |
| **13–14 Dec** (13–15 Dec) | £518 / £501 (£516 / £500), min 2 | **£487.50 obs** | £591.00 (5); £567.50 (4) | **P20 / −18%** | £570.00 (9): −14% | £659.56 → about **£735**; median-level about **£645** |
| 29 Nov–2 Dec (29 Nov–3 Dec, min 3) | £501 / £485 / £485 / £510 (Reyhan −2%) | £427.75 obs | £500.50 (4) | P25 / −15% | £439.50 (8): −3% | £558.56 → about £666; median-level about £590 |
| **21 Dec** (1n, min 1) | £2,038 | £2,030.00 obs | n = 0 | – | £706 (2) | +188% vs wider |
| **29 Dec** (1n, min 1) | £2,536 | £2,478.00 obs | n = 0 | – | £430 (1) | +476% vs wider (n = 1) |

- The 1-night 7–8 / 13–14 Dec searches returned no kept comp; wider n = 3 (£508 / £566), ours derived +11% / +4% (full £195 cleaning on 1 night).
- **Reyhan's −2% on 29 Nov–2 Dec** (18 Nov 12:16Z) cuts a stay already −15% vs kept, against Corentin's direction to cut PriceLabs discounts: **for Corentin, confirm or revert**.
- **Thin set:** n = 4–5 with 1606112160333193293 at £1,020 inside every December median. Even at wider medians (n = 8–9) 7–9 / 13–15 Dec are −19% / −14%.
- **PriceLabs 4 BR cross-check (room):** £465–£518 sits between P25 £453 and P50 £565. 21 and 29 Dec are above P90 (£1,225). Reyhan's +300% DSO is open action a-p05-dec; not raised as new.
- **Positioning:** `quality_premium(4.79, 4.50)` = **+0.116** (kept median now includes 1481043902711346984; on the 5 legacy ids, 4.24, it would be +0.15). `recommend(0.733, 0.46, 0.25, 0.116)` and `recommend(0.60, 0.39, 0.25, 0.116)` → **raise +21.6%**. **Supported: +12% vs median**, about £707 (7–8 Dec) / £735 (13–14 Dec) Smoobu room; at minimum the median, about **£620 / £645**, +30% / +27% on today's prices.
- **Differentiators:** 912053248917940403 (4.97, Superhost, lift, park view) and 1639043256346803626 (4.90, Superhost, terrace, parking) are the quality peers; 3 comps list parking, 3 a balcony/terrace. Ours: Abbey Road location, no parking or terrace on record (NOT CHECKED on the page today).

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- **Smoobu 19 Nov:** £450 on most nights to 17 Dec (min 3–4); 12 Dec £456; 18–20 Dec £484 / £507 / £457; 27–31 Dec £537–£726; 1–2 Jan £646 / £562.
- **Booked:** 0% next 30 / 60 vs market 47% / 36% (pl_kpis). No P14 Smoobu reservation.
- **Vs kept median, P100 on every priced stay:** 24–26 Nov **+116%** (n 4); 7–9 Dec +49% (7); 14–16 Dec +55% (7); 17–19 Dec +72% (6); 18–20 Dec +71% (3); **19–21 Dec +59% (3)**; 20–22 Nov kept n = 0, wider +19% (n 3).
- **PriceLabs 1 BR:** P50 £194, P90 £277; £450 = +132% vs P50.
- Reyhan's 450 minimum (vs £500 in policy) is already in the confirm-or-revert list; not re-raised.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)
- **Kept medians:** 20–22 Nov n = 0; 24–26 Nov n = 0 (wider £200, n 3); 7–9 Dec £228.50 (3); 14–16 Dec £215.00 (5); 17–19 Dec £264.50 (2); 18–20 Dec £252.00 (4); **19–21 Dec £230.00 (2)**. Rating median 4.68 (52).

## P08 Islington: handback
- Policy last night 13 Nov. Not searched; no rows written.

## Comp tables

**Source for every comp row:** Airbnb public search (airbnb.co.uk), checked 2026-11-19 07:19:23–07:24:00Z. Nightly = total ÷ nights, after offers, cleaning included, taxes excluded. Rating (reviews) and sleeps from each listing page (07:19–07:21Z). Dist km from 17 Nov. (±%) = change vs 18 Nov for the same stay; "n/a" = not returned (booked or min stay). "Ours" rows from the 19 Nov snapshot (Smoobu = PriceLabs). Every priced row is in `data/snapshots/2026-11-19/comps.csv`.

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) 19 Nov | Fri 20 Nov–Sun 22 Nov (2n) | Sun 22 Nov–Wed 25 Nov (3n) | Sun 22 Nov–Fri 27 Nov (5n) | Tue 24 Nov–Thu 26 Nov (2n) | Tue 24 Nov–Fri 27 Nov (3n) | Wed 2 Dec–Sat 5 Dec (3n) | Tue 8 Dec–Wed 9 Dec (1n) | Mon 14 Dec–Sat 19 Dec (5n) | Tue 15 Dec–Fri 18 Dec (3n) | Thu 17 Dec–Sat 19 Dec (2n) | Fri 18 Dec–Sun 20 Dec (2n) | Sat 19 Dec–Mon 21 Dec (2n) | Wed 23 Dec–Sat 26 Dec (3n) | Sun 3 Jan–Wed 6 Jan (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.71 (31) | n/a | £405 (-3%) | £390 (-2%) | £440 | £416 | n/a | n/a | £442 | £451 | n/a (was £524) | £560 | £569 | £555 | £273 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (181) | n/a | n/a | n/a | n/a | n/a | n/a | £400 (-5%) | £351 | £363 | £388 | £388 | n/a | £392 | £306 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | n/a | n/a | £272 | n/a | £464 | n/a | £407 | £416 | £490 | £526 | £534 | £520 | £304 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a | £217 (-12%) | £206 (-10%) | £238 (-11%) | £227 (-8%) | n/a | n/a | £400 | n/a (was £417) | £438 | £438 | £438 | £417 | n/a (was £417) | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.54 (13) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a (was £407) | n/a (was £416) | £490 | £526 | £534 | n/a | £247 | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.69 (13) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £392 (+1%) | £388 | n/a (was £478) | £555 (-3%) | £532 | £511 | £426 (+14%) | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a | £202 (-9%) | £189 (-8%) | £222 (-8%) | £208 (-6%) | n/a | n/a | £325 | £342 | £362 | n/a | n/a | £342 | £342 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.42 (64) | n/a | n/a | n/a | n/a | n/a | n/a | £253 | n/a (was £262) | £260 | £311 | n/a | n/a | £307 | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.73 (88) | n/a | n/a | n/a | n/a (was £184) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £195 | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (74) | n/a | n/a | n/a | n/a | n/a | n/a | n/a (was £234) | n/a | £192 (-5%) | £238 (-4%) | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.55 (38) | n/a | £200 (-4%) | £200 (-3%) | £218 (-1%) | £215 (-2%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £339 | £216 (-2%) | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Kept median (n)** | | | | – (0) | £209 (4) | £203 (4) | £238 (5) | £221 (4) | £464 (1) | £326 (2) | £396 (6) | £363 (7) | £388 (7) | £526 (6) | £534 (5) | £404 (8) | £289 (8) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £516 (3) | £217 (19) | £206 (13) | £260 (27) | £274 (19) | £357 (16) | £360 (13) | £351 (41) | £353 (48) | £385 (33) | £487 (22) | £534 (21) | £392 (38) | £263 (54) | |
| **Ours, Smoobu room/night (status, min)** | | | | £250 Booked, min 2 | £187 Open, min 3 | £194 Open, min 3 | £195 Open, min 3 | £202 Open, min 3 | £248 Open, min 2/3 | £292 Open, min 1 | £246 Open, min 2/3 | £233 Open, min 2/3 | £282 Open, min 2 | £326 Booked/Open, min 2/4 | £305 Booked, min 4 | £274 Open, min 2 | £185 Open, min 3 | |
| **Ours, comparable basis** | | | | £363 | £265 | £253 | £299 | £282 | £334 | £485 | £312 | £317 | £399 | £449 | £425 | £364 | £263 | list = Smoobu ×1.15 (policy) + £149/n |
| **Our pct / vs kept median** | | | | excluded (not open) | P75 / +27% | P75 / +25% | P80 / +26% | P75 / +28% | P0 / -28% | P100 / +48% | P0 / -21% | P29 / -13% | P57 / +3% | P33 / -14% | excluded (not open) | P38 / -10% | P38 / -9% | |
| Our pct / vs wider median | | | | excluded | P74 / +22% | P69 / +23% | P74 / +15% | P63 / +3% | P31 / -6% | P85 / +35% | P37 / -11% | P40 / -10% | P58 / +4% | P41 / -8% | excluded | P42 / -7% | P50 / -0% | |

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) 19 Nov | Fri 20 Nov–Sun 22 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 7 Dec–Tue 8 Dec (1n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Mon 14 Dec (1n) | Sun 13 Dec–Tue 15 Dec (2n) | Fri 18 Dec–Sun 20 Dec (2n) | Sat 19 Dec–Mon 21 Dec (2n) | Mon 21 Dec–Tue 22 Dec (1n) | Tue 29 Dec–Wed 30 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.15 (13) | n/a | £498 (-2%) | £449 | n/a | £453 (-11%) | n/a | £469 (-18%) | n/a (was £570) | n/a | n/a | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | n/a | n/a | £552 | n/a | £1,020 | n/a | £1,020 | £1,020 | £1,020 | n/a | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (30) | n/a | n/a | £688 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | n/a | £400 | £375 | n/a | n/a | n/a | £510 | £587 (+5%) | £568 | n/a | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.9 (29) | n/a | n/a | n/a | n/a | £571 | n/a | £625 (+9%) | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| [1481043902711346984](https://www.airbnb.co.uk/rooms/1481043902711346984) | 1.16 | 8 | 4.76 (17) | n/a | n/a | n/a | n/a | £573 | n/a | £591 | n/a | n/a | n/a | n/a | added 18 Nov |
| **Kept median (n)** | | | | – (0) | £449 (2) | £500 (4) | – (0) | £572 (4) | – (0) | £591 (5) | £804 (2) | £794 (2) | – (0) | – (0) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £1,048 (1) | £498 (3) | £440 (8) | £508 (3) | £570 (8) | £566 (3) | £570 (9) | £626 (5) | £602 (5) | £706 (2) | £430 (1) | |
| **Ours, Smoobu room/night (status, min)** | | | | £541 Booked, min 3 | £512 Booked, min 3 | £495 Open, min 3 | £485 Open, min 2 | £475 Open, min 2 | £518 Open, min 2 | £510 Open, min 2 | £640 Booked, min 3 | £632 Booked, min 2/3 | £2,038 Open, min 1 | £2,536 Open, min 1 | |
| **Ours, comparable basis** | | | | £511 | £490 | £428 obs | £566 | £461 obs | £591 | £488 obs | £673 | £666 | £2,030 obs | £2,478 obs | obs = own Airbnb card in same search; else 0.765/0.900 × Smoobu + cleaning/n |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | P25 / -14% | n = 0 | P25 / -19% | n = 0 | P20 / -18% | excluded (not open) | excluded (not open) | n = 0 | n = 0 | |
| Our pct / vs wider median | | | | excluded | excluded | P38 / -3% | P67 / +11% | P38 / -19% | P67 / +4% | P22 / -14% | excluded | excluded | P100 / +188% | P100 / +476% | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) 19 Nov | Fri 20 Nov–Sun 22 Nov (2n) | Sun 22 Nov–Tue 24 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Sun 29 Nov–Mon 30 Nov (1n) | Fri 18 Dec–Sun 20 Dec (2n) | Sat 19 Dec–Mon 21 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.62 (13) | n/a | n/a | n/a | n/a | £480 | £470 | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.71 (24) | n/a | £296 | n/a (was £296) | n/a | n/a | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | £265 | £275 | £315 | n/a | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | n/a | n/a | n/a | n/a | £630 | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | n/a | n/a | £354 (-11%) | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (54) | n/a | n/a | n/a | n/a | £1,188 | n/a | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | £575 | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.6 (25) | n/a | n/a (was £333) | £362 | n/a | n/a (was £478) | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | n/a | n/a | n/a | £575 (-3%) | £605 | parking listed |
| **Kept median (n)** | | | | – (0) | £280 (2) | £354 (3) | £445 (2) | £575 (3) | £605 (3) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £1,540 (3) | £368 (35) | £348 (39) | £498 (25) | £723 (28) | £692 (27) | |
| **Ours, Smoobu room/night (status, min)** | | | | £394 Booked, min 2 | £252 Open, min 2 | £320 Booked, min 3 | £255 Blocked, min 4 | £488 Blocked, min 4 | £516 Blocked, min 4 | |
| **Ours, comparable basis** | | | | £366 | £278 obs | £309 | £324 | £503 | £528 | obs = own Airbnb card in same search; else 0.765/0.900 × Smoobu + cleaning/n |
| **Our pct / vs kept median** | | | | excluded (not open) | P50 / -1% | excluded (not open) | excluded (not open) | excluded (not open) | excluded (not open) | |
| Our pct / vs wider median | | | | excluded | P34 / -25% | excluded | excluded | excluded | excluded | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) 19 Nov | Fri 20 Nov–Sun 22 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Fri 18 Dec–Sun 20 Dec (2n) | Sat 19 Dec–Mon 21 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | £162 (-8%) | n/a | £252 | £252 | £252 | £252 | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | £198 (-13%) | £352 | £352 | £352 | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | n/a | £246 | £246 | £253 | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | n/a (was £202) | £302 | £302 | £302 | n/a (was £302) | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | n/a (was £202) | £302 | £302 | n/a | n/a | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 4.92 (13) | n/a | n/a | n/a | £290 | £290 | £290 | n/a | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | £368 | £402 | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (20) | n/a | n/a | £240 (-2%) | n/a | n/a | n/a | n/a | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (18) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | n/a | £241 | £241 | £241 | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | n/a | £218 | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Kept median (n)** | | | | – (0) | £208 (4) | £302 (7) | £290 (7) | £271 (6) | £290 (3) | £302 (3) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £377 (3) | £221 (18) | £302 (23) | £252 (35) | £286 (24) | £304 (16) | £306 (18) | |
| **Ours, Smoobu room/night (status, min)** | | | | £450 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3 | £467 Open, min 3/4 | £496 Open, min 4 | £482 Open, min 4 | |
| **Ours, comparable basis** | | | | £450 | £450 | £450 | £450 | £467 | £496 | £482 | Smoobu room |
| **Our pct / vs kept median** | | | | n = 0 | P100 / +116% | P100 / +49% | P100 / +55% | P100 / +72% | P100 / +71% | P100 / +59% | |
| Our pct / vs wider median | | | | P100 / +19% | P100 / +104% | P100 / +49% | P100 / +78% | P100 / +64% | P100 / +63% | P100 / +58% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) 19 Nov | Fri 20 Nov–Sun 22 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Fri 18 Dec–Sun 20 Dec (2n) | Sat 19 Dec–Mon 21 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | n/a | n/a (was £174) | £192 | £192 | n/a (was £199) | £206 | £199 | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (52) | n/a | n/a | n/a | £252 | £293 | £315 | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | £234 | £212 | n/a (was £243) | £258 (-4%) | £261 | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a (was £292) | n/a | n/a | £224 | n/a | n/a | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.68 (63) | n/a | n/a | n/a | £215 | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.43 (170) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.75 (28) | n/a | n/a | £228 | n/a | £236 | £246 | n/a | none listed |
| **Kept median (n)** | | | | – (0) | – (0) | £228 (3) | £215 (5) | £264 (2) | £252 (4) | £230 (2) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | – (0) | £200 (3) | £209 (6) | £212 (9) | £238 (10) | £268 (6) | £212 (3) | |
| Ours | | | | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | |

Data gaps:
- **Booking.com live prices: NOT CHECKED** (AWS WAF; not attempted, not bypassed). P11 is compared at list (Smoobu × 1.15 policy, × 1.10 alongside) + £149 cleaning ÷ n, not the promoted price a guest sees. Whether +15% has reached Booking.com Standard is NOT CHECKED (18 Nov screenshots still × 1.10).
- **P11 review count on Booking.com** not in `listings.csv`: review gap NOT CHECKED, `quality_premium` = 0 by construction.
- **Comp activity:** 7 kept ids not returned on any stay today (5 of them for 7 days). Pages HTTP 200, two gained reviews overnight. Calendars: NOT CHECKED.
- **P06 Airbnb card factor jumped** (0.766 → 0.845 implied on 22–24 Nov, £518 → £556): cause NOT CHECKED (cleaning fee, rule change or guest-count fee); channel agent's lane.
- **Split of P11/P05 overnight drops** between Reyhan's −2% overrides and the engine: NOT CHECKED (PriceLabs last refresh 18 Nov ~12:15Z, after the overrides).
- **Thin samples:** P06 22–24 Nov n = 2; P11 2–5 Dec n = 1 and 8 Dec n = 2 (wider used); P05 n = 4–5 with a £1,020 outlier, 1-night and 21 / 29 Dec n = 0; P14 18–21 Dec n = 3, 20–22 Nov n = 0; P17 n = 0–5.
- **Wider set** not filtered to ≥10 reviews (cards carry none).
- **Whether Airbnb comp prices include VAT:** NOT CHECKED.
- **PriceLabs percentiles** are Nearby Listings summary-table room prices for an unspecified window, not the same dates. `market.csv` is the market agent's; nothing written to it.
- **P17** is not in PriceLabs or Smoobu. **P08** handback, not searched.
