# Competitor positioning: CENTRAL/NORTH (D = 2026-11-18)

**Method**
- **Policy read first** (`data/policy.json`). Not raised again: P06 intentional blocks (from 30 Nov), P14 special setup (numbers only), Camden Booking.com Visibility Booster 18%, Booking.com promotion stacking (size only), 15%/20% stay discounts, Booking.com markup +10% (12 Nov), `darts_override_24oct`, P08 handback (last night 13 Nov).
- **Commission:** the channel agent's finding is used (Camden ~18% = Visibility Booster, expected). Not re-raised.
- **Comp ids:** the same ids as `reports/2026-11-17/sections/comp-central.md` (the 17 Nov `comps.csv` no longer exists, so the ids were read from that committed section). **No comp replaced.**
  - **One added to P05** (it was below the 6-comp minimum since 16 Nov): 1481043902711346984. It has 4 BR, sleeps 8, 4.76 from 17 reviews, and sits 1.16 km away (the same catchment as kept 1363636555926649515 at 1.23 km). Medians below are on the **5 legacy ids**, so the trend stays comparable. With it included the medians barely move: 7–9 Dec £574.75 (n = 4), 13–15 Dec £571.50 (n = 5).
  - All 48 kept listing pages returned **HTTP 200** (checked 07:22–07:24Z). I also refreshed rating, review count and capacity from each page.
  - Kept ids not returned on any stay, **6th day running**: P06 917140285217729256 and 1452940332365117153; P14 1075245497252121738 and 1659680062193836633; P17 975294297333089697. Their pages are live, so I kept them. I could not check calendars (a calendar probe was refused by the permission system and not retried), so whether these five are "bookable in the next 60 days" is still **NOT CHECKED**.
  - **P08 not searched** (handback).
- **Searches:** 44 public Airbnb map searches on airbnb.co.uk, 309 result pages, 4,212 cards, **checked 2026-11-18 07:21:27–07:26:55Z**. No parse failures and no bot challenge.
  - Filters: entire home, min bedrooms = ours, adults P05 7 / P06 5 / P11 5 / P14 3 / P17 3. Box is ±1.56 km around each flat.
  - Flat centres were fitted to the 17 Nov comp distances (error 6–11 m).
  - "Wider" = same bedroom count exactly, a numeric rating shown, within 1.25 km. Review counts are not on search cards, so **the wider set is NOT filtered to ≥10 reviews** (the kept set is: every kept comp has ≥12).
  - Scripts: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c18s/` (`search.py`, `pdp.py`, `analyse.py`, `render.py`, `rows.py`).
  - Raw data: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c18/search/*.json`. Analysis: `.../c18/analysis.json`.
- **Stays priced for every comp and for us:**
  - **Fri 20–Sun 22 Nov** (next Fri–Sun).
  - **Tue 24–Thu 26 Nov** (midweek).
  - **Fri 18–Sun 20 Dec** (30 days out).
  - Brief extras:
    - P11: 18–20 Nov, 19–20 Nov, 22–25 / 22–27 / 24–27 Nov, 2–5 Dec, 8–9 Dec, darts 14–19 / 15–18 Dec, 17–19 Dec, 23–26 Dec, 3–4 / 3–6 Jan.
    - P05: 29 Nov–3 Dec, 7–8 / 7–9 Dec, 13–14 / 13–15 Dec, 20–22 / 21–22 Dec, 28–30 / 29–30 Dec.
    - P06: 22–24 Nov.
    - P14 and P17: 7–9, 14–16 and 17–19 Dec.
  - Several stays repeat 17 Nov's, for the day-on-day comparison.
- **Our prices:** `prices.csv` for 18 Nov, where Smoobu equals PriceLabs on every open night (Dispatcher: 0 differences > £2). Booked or open status comes from Smoobu `reservations.csv` (confirmed only).
  - P11 18 Nov is not in `prices.csv`. I took it from PriceLabs `get_listing_prices`: £164, min 2, not booked. Smoobu was not checked for that night.
- **Price basis:** comps are the Airbnb total ÷ nights, after offers, **cleaning included**, taxes excluded.
  - P05 and P06 are our own Airbnb cards, seen in the same search ("obs"). Where a card was not returned, I derived the figure as 0.765 × Smoobu (0.900 beyond 28 days) + cleaning ÷ n.
    - Re-verified on today's cards: P05 7–9 Dec obs £940 vs 0.765 × £973 + £195 = £939.35; 13–15 Dec £973 vs £972.24; 29 Nov–3 Dec £1,729 vs £1,728.83.
  - P11 is on Booking.com only, so I show it at **list all-in** = Smoobu × 1.10 + £149 ÷ n. That is Booking.com's price before promotions.
- **Booking.com live: NOT CHECKED** (AWS WAF since 11–12 Nov; not attempted, not bypassed).
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` (listing, 17–18 Nov) for P05/P06/P08/P11/P14: **0 entries**. Every overnight move below is the engine's own, from the 17 Nov 09:08–09:10Z refresh.
  - `get_listing_date_overrides` P11 (18 Nov–10 Jan): unchanged since 15 Nov 18:48Z. 8 Dec +50% min 1; 14–18 Dec min-stay only (3/3/2/2/2); 23–25 Dec +5%.
  - `get_neighbourhood_data` (Nearby Listings, summary table) for P11, P05 and P14. These are room-price percentiles, cleaning excluded:
    - P11 2 BR: P25 230, P50 290, P75 331, P90 384 (n 172).
    - P05 4 BR: 455 / 568 / 689 / 1,221 (n 92).
    - P14 1 BR: 147 / 193 / 232 / 276 (n 170).
- **Rows written:** `data/snapshots/2026-11-18/comps.csv` did not exist, so I created it with the `rm/snapshot.py` header and appended under `flock .comps.csv.lock`.
  - **805 rows**: 149 kept and 656 wider. Each row records stay, adults, basis, check time and set.
  - No `channel_checks.csv` rows today (our own-card figures are in the tables below).

## Summary

| Ref | Comps kept (n per stay) | Our pct vs kept, open stays ≤30 d / ≤60 d | Rating ours vs kept median; review gap | Booked (Smoobu) vs market, next 30 / 60 | Supported positioning |
|---|---|---|---|---|---|
| **P11 2BR** | 12 (0–9) | **list all-in P75 / P75**; room P11 / P11 | Booking.com 8.0/10 (policy) vs Airbnb kept 4.675 (36): not comparable; review gap NOT CHECKED | **46.7% (14/30) vs 50%**; 43.3% (26/60) vs 38% | `quality_premium` 0, so **0% vs the median on list all-in**. On list, `recommend` gives **hold** ("in line with market at P75"); on the room basis it gives raise +5% (P11). In practice: **hold 18–27 Nov** (+16% to +23% above the median); **raise the December stays** (darts 14–19 Dec −22% kept / −12% wider; 23–26 Dec −12% / −6%); hold 2–5 Dec (+1% vs wider); 8 Dec is +84% / +39% (not supported). |
| **P05 4BR** | 5 legacy + 1 new (0–4) | P0 / P0 | Airbnb 4.77 (35) vs 4.24 (17); **+18 reviews** | **73.3% (22/30) vs 46%**; 61.7% (37/60) vs 39% | `quality_premium` +0.15 (cap), so **+15% vs median**. `recommend` gives **raise +25%** at 30 and 60 days ("booked +27% vs market but priced at P0"). 7–9 Dec −18%, 13–15 Dec −15%, 29 Nov–3 Dec −14%. 21 and 29 Dec: no kept comp (n = 0). |
| **P06 2BR** | 12 (0–4) | P0 (n = 2) | 4.58 (12) vs 4.63 (26); **−14 reviews** | **81.8% (9/11) vs 51%**; 9/11 vs 40% (blocked nights excluded) | `quality_premium` −0.02, so **−2% vs median**. `recommend(0.818, 0.51, 0.0, −0.02)` gives raise +10%. **22–23 Nov −13% vs kept (n = 2) / −28% vs wider: about £299/night Smoobu**, conditional on the opening (t-p06-2229open). |
| P08 2BR | not searched | n/a | – | handback 13 Nov | Moot (policy handback). |
| P14 1BR | 12 (0–7) | P100 | not seen on Airbnb; kept median 4.885 (19.5) | 0% vs 48% / 36% | Special setup: numbers only. **+49% to +114% vs kept median**; £450 is +133% vs PriceLabs 1 BR P50 (£193). |
| P17 1BR | 7 (1–4) | n/a | kept median 4.68 (52) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day** (median change of the same kept ids on repeated stays): **flat, 0% to −2% on every stay.**
- P06 22–24 Nov −2% (n = 2): 1315177393080154583 £347 → £333 (−4%). 744585770789956203 (£296) is no longer returned.
- P05 7–9 / 13–15 Dec: 1639043256346803626 £540 → £571.50 (+6%). That lifts the medians to £571.50 / £570.75 (from £540 / £555).
- P11: 1543632408013225027 and 1542960049319560709 −4% on 18–20 Nov; 1568808216094734994 −1% to −3% in November. December is unchanged.
- P17: 1182369331195783741 −5% on 14–16 Dec.

**Our prices moved overnight** (17 Nov Smoobu → 18 Nov snapshot; no user logs, so these are engine moves):
- **P05:** **7–8 Dec £463/£460 → £487/£486 (+5%)**; **13–14 Dec £488/£474 → £516/£500 (+6%)**; 29 Nov–2 Dec £496/£488/£495/£532 → £505/£491/£493/£516; 21 Dec £2,054 → £2,039; 29 Dec £2,563 → £2,569.
- **P11:** **8 Dec £310 → £288 (−7%)**. Darts 14–18 Dec £227/£228/£236/£246/£303 → £229/£227/£233/£258/£314 (average £248.00 → £252.20; 14–17 Dec £234.25 → **£236.75**). 2–4 Dec average £281.67 → £272.67 (£211/£273/£334). 22–26 Nov 5-night average £203.20 → £208.20. 23–25 Dec £273.67 → £280.00. 3 Jan £171 → £170.
- **P06:** 22–23 Nov £265/£249 → £261/£247. **29 Nov is now unavailable with no reservation** (yesterday open at £256, min 4). It sits next to the intentional block from 30 Nov, so I do not raise it.
- **P14:** 17–20 Dec £462/£542/£559/£467 → £450/£543/£520/£471.

## P11 Camden (3064196; Booking.com only)

### Open nights vs like-for-like comps (snapshot 18 Nov; comps all-in)

| Open nights (stay priced) | Ours room avg (17 Nov) | List all-in (×1.10 + £149/n) | Kept median (n) | **List pct / vs kept** | Wider median (n); list vs wider | Median-level Smoobu room* (kept / wider) |
|---|---|---|---|---|---|---|
| 18–19 Nov (18–20 Nov, check-in today, min 2) | £177.00 (£178.50) | £269.20 | £220.75 (4) | **P100 / +22%** | £232.00 (12); P92 / +16% | £133 / £143 |
| 19 Nov alone (19–20 Nov, 1n) | £190 | £358.00 | £186 (1) | P100 / +92% | £294 (11); P82 / +22% | – (min 2, 20 Nov booked: not sellable alone) |
| 22–26 Nov (22–27 Nov, 5n) | £208.20 (£203.20) | £258.82 | £218.40 (4) | **P75 / +18%** | £206.80 (15); P80 / +25% | £172 / £161 |
| 22–24 Nov (22–25 Nov) | £200.67 | £270.40 | £234.17 (4) | P75 / +16% | £237.67 (21); P71 / +14% | £168 / £171 |
| 24–25 Nov (24–26 Nov, midweek default) | £209.50 (£203.00) | £304.95 | £255.00 (6) | P83 / +20% | £263.75 (26); P73 / +16% | £164 / £172 |
| 24–26 Nov (24–27 Nov) | £216.67 | £288.00 | £234.17 (4) | P75 / +23% | £248.00 (23); P65 / +16% | £168 / £180 |
| **2–4 Dec** (2–5 Dec) | £272.67 (£281.67) | £349.60 | £464.33 (**1**) | P0 / −25% (n = 1) | **£346.00 (19); P53 / +1%** | – / **£269** |
| **8 Dec** (8–9 Dec, 1n, min 1, DSO +50%) | **£288 (£310)** | £465.80 | £253.00 (3) | **P100 / +84%** | £335.00 (14); P86 / +39% | £95 / £169 |
| **14–18 Dec, darts** (14–19 Dec, 5n) | £252.20 (£248.00) | £307.22 | **£394.60 (8)** | **P12 / −22%** | £349.00 (53); P38 / −12% | **£332 / £290** |
| 15–17 Dec (15–18 Dec) | £239.33 (£236.67) | £312.93 | £388.33 (9) | P22 / −19% | £341.67 (65); P42 / −8% | £308 / £266 |
| 17–18 Dec (17–19 Dec) | £286.00 (£274.50) | £389.10 | £437.50 (9) | P44 / −11% | £389.00 (42); P50 / 0% | £330 / £286 |
| **23–25 Dec** (23–26 Dec, min 2) | £280.00 (£273.67) | £357.67 | £404.17 (8) | P38 / −12% | £380.00 (45); P47 / −6% | £322 / £300 |
| 3 Jan (3–4 Jan, 1n, min 3) | £170 (£171) | £336.00 | £485 (**1**) | P0 / −31% | £258.00 (16); P75 / +30% | – (min 3) |
| 3–5 Jan (3–6 Jan, min 3) | £183.67 (£184.33) | £251.70 | £304.33 (9) | P33 / −17% | £274.67 (67); P39 / −8% | £232 / £205 |

\* Median-level Smoobu room = (median − £149 ÷ n) ÷ 1.10. It is the Smoobu rate whose Booking.com list price plus cleaning equals the comp median, before promotions. Promotions stack on top (policy; their size is the channel agent's finding). 18–20 Dec is part-booked (19 Dec check-in) and excluded.

**18–27 Nov: still above the median on list.** List all-in is +16% to +23% vs kept (P75–P100) and +14% to +25% vs wider, so a raise is not supported. Guests on promotions pay well below list (~0.69× on recent bookings, channel), so a cut is not clearly supported either. **Supported: hold.** The 19 Nov night can only sell with 18 Nov (min 2, 20 Nov booked); after today it is a 1-night orphan at min 2. That is for occupancy/pricelabs, not a comp finding.

**Darts 14–18 Dec: still no price override (standing conflict carried from 16–17 Nov, for Corentin to confirm; not a new proposal).**
- Policy: "average above £300/night" (21 Oct) and `darts_override_24oct` "+5%". The 14–17 Dec average is **£236.75** (£229/£227/£233/£258).
- Comps support about **£332 Smoobu room (kept) / £290 (wider)** for the 14–19 Dec stay, in line with the policy intent.

**8 Dec (open, 1 night, min 1):** the engine cut it to £288, but list all-in is still **+84% vs kept / +39% vs wider** (P100 / P86). A 1-night stay carries the full £149 cleaning, so the median supports only about **£95–£169 room**. The +50% DSO is still not supported (open item t-p11-8dec-orphan; not new).

**2–4 Dec:** list all-in is at the wider median (+1%, n = 19). Kept has n = 1. **Hold** (about £269 room vs £272.67 now).

**23–25 Dec:** −12% vs kept (n = 8) / −6% vs wider. Supported: about **£300–£322 room**, +7% to +15% on the current £280 average.

**3 Jan:** the 1-night stay is not usable (kept n = 1, min 3). Priced as 3–5 Jan it is −17% vs kept and −8% vs wider. Supported: about £205–£232 room.

**30 days out (17–19 Dec):** −11% vs kept / 0% vs wider. Supported: about £286–£330 room.

**PriceLabs cross-check (room, 2 BR):** our open-night average for the next 30 days is £236.73 (kpi_pack), between P25 £230 and P50 £290.

**Positioning:**
- `quality_premium` = 0 (no comparable rating).
- On list all-in (like-for-like with comps that include cleaning): `recommend(0.467, 0.50, 0.75, 0)` → **hold**, and `recommend(0.433, 0.38, 0.75, 0)` → hold.
- On the room basis (yesterday's convention): `recommend(0.467, 0.50, 0.11, 0)` → raise +5%.
- **Supported: the comp median (0%) on list all-in.** In practice: hold 18–27 Nov; raise December toward the median (darts about £290–£332, 23–25 Dec about £300–£322, 17–18 Dec about £286–£330); hold 2–4 Dec; 8 Dec toward about £95–£169.

**Differentiators:**
- P11 is a basement flat with a patio and no lift.
- 4 of the 12 comps have a lift (1542815721953379556, 1543632408013225027, 654396087724294901, 1515051936255130803) and 3 have a balcony or terrace.
- 2557770 has 181 reviews, and 654396087724294901 is a Superhost.

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272)

| Open nights (stay) | Smoobu room (17 Nov) | **Guest sees on Airbnb, all-in/night** | Kept median (n) | Pct / vs kept | Wider median (n) | Pct / vs wider | Supported (−2%) all-in → Smoobu room |
|---|---|---|---|---|---|---|---|
| **22–23 Nov** (22–24 Nov, min 2) | **£261 / £247** (£265 / £249) | **£259.00 obs** (£518 total) | **£299.00 (2)** | **P0 / −13%** | £359.00 (43) | P26 / −28% | £293.02 → about **£299/night** ((2 × 293.02 − 129) / (2 × 0.765)) |

- **22–23 Nov is the only sellable P06 pair.** 29 Nov closed overnight (see above); from 30 Nov the block is intentional.
- Kept n fell from 3 to 2. 744585770789956203 (£296) was not returned. 854346637654279747 is unchanged at £265, and 1315177393080154583 went £347 → £333. The wider set (≤1.25 km, Marylebone/Fitzrovia/Mayfair edge) is dispersed (£170–£2,600), so I weight kept.
- Lead time is 4 days.
- The daily report holds the 22–29 Nov opening as Corentin's question (t-p06-2229open). The figure below is **conditional on that opening being confirmed**.
- **Positioning:**
  - `quality_premium(4.58, 4.63)` = −0.02.
  - `recommend(0.818, 0.51, 0.0, −0.02)` → raise +10%. The 60-day result is the same (9/11 vs 40%).
  - **Supported: −2% vs median**, about **£299/night Smoobu** vs the current £254 average (+18%). This is not a cut. Evidence is thin (n = 2).

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Gap (stay) | Smoobu room/night (17 Nov), min | Ours, Airbnb all-in/night | Kept median (n) | Pct / vs median | Wider 4BR ≤1.25 km (n) | +15% supported all-in → Smoobu room; median-level |
|---|---|---|---|---|---|---|
| **7–8 Dec** (7–9 Dec) | **£487 / £486** (£463 / £460), min 2 | **£470.00 obs** | £571.50 (3) | **P0 / −18%** | £570.75 (8): −18% | £657.22 → about **£732** ((1,314.45 − 195) / 1.53); median-level about **£620** |
| **13–14 Dec** (13–15 Dec) | **£516 / £500** (£488 / £474), min 2 | **£486.50 obs** | £570.75 (4) | **P0 / −15%** | £570.00 (9): −15% | £656.36 → about **£731**; median-level about **£619** |
| 29 Nov–2 Dec (29 Nov–3 Dec, min 3) | £505 / £491 / £493 / £516 | £432.25 obs | £500.50 (4) | P25 / −14% | £439.50 (8): −2% | £575.57 → about £689 ((2,302.30 − 195) / 3.06); median-level about £590 |
| **21 Dec** (1n, min 1) | £2,039 (£2,054) | £2,031.00 obs | **n = 0** | – | £706 (2) | no kept comp; +188% vs wider |
| **29 Dec** (1n, min 1) | £2,569 (£2,563) | £2,508.00 obs | **n = 0** | – | £430 (1) | no kept comp; +483% vs wider (n = 1) |

- The engine **raised 7–8 Dec by about 5% and 13–14 Dec by about 6% overnight**. The gap is still −18% / −15%, because a kept comp also rose (+6%).
- The 1-night 7–8 and 13–14 Dec searches returned no kept comp. Wider n = 3 each: £499 / £575, so ours derived is +14% / +3%. That is the full £195 cleaning on 1 night.
- **Thin set:** n = 3–4, and 1606112160333193293 at £1,020 sits inside every December median. Even at the wider medians, 7–9 and 13–15 Dec are −15% to −18%.
- **PriceLabs 4 BR cross-check (room):** £486–£516 sits between P25 £455 and P50 £568. 21 and 29 Dec are above P90 (£1,221).
- **21 and 29 Dec:** there is no kept comp. Reyhan's +300% DSO is open action a-p05-dec; not raised as new.
- **Positioning:**
  - `quality_premium(4.77, 4.24)` = +0.15 (cap).
  - `recommend(0.733, 0.46, 0.0, 0.15)` and `recommend(0.617, 0.39, 0.0, 0.15)` → **raise +25%**.
  - **Supported: +15% vs median**, about £731 Smoobu room. At minimum the median: about **£620 (7–8 Dec) and £619 (13–14 Dec)**, +27% / +22% on today's prices.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- **Smoobu 18 Nov:** £450 on most nights to 17 Dec (min 3–4). 11 Dec £452. 18–20 Dec £543 / £520 / £471. 28–31 Dec £678–£749. 1–2 Jan £672 / £580.
- **Booked:** 0% next 30 and 60 days vs market 48% / 36% (pl_kpis). There is no P14 Smoobu reservation.
- **Vs kept median, P100 on every priced stay:**
  - 24–26 Nov **+114%** (n 6).
  - 7–9 Dec +49% (7); 14–16 Dec +52% (6); 17–19 Dec +96% (5); **18–20 Dec +80% (4)**.
  - 20–22 Nov: kept n = 0; wider +27% (n 4).
- **PriceLabs 1 BR:** P50 £193, P90 £276. £450 is +133% vs P50.
- Reyhan's 450 minimum (vs the £500 in policy) is already in the confirm-or-revert list; not re-raised.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)
- **Kept medians:** 20–22 Nov £292.50 (1); 24–26 Nov £174.50 (1); 7–9 Dec £213.75 (2); 14–16 Dec £219.50 (4); 17–19 Dec £239.50 (4); **18–20 Dec £257.00 (4)**.
- **Rating:** median 4.68 (52).

## P08 Islington: handback
- Policy last night 13 Nov. Not searched; no rows written.

## Comp tables

**Source for every comp row:** Airbnb public search (airbnb.co.uk), checked 2026-11-18 07:21:27–07:26:55Z.
- Nightly = total ÷ nights, after offers, cleaning included, taxes excluded.
- Rating (reviews) and sleeps come from each listing page (07:22–07:24Z).
- Dist km is from 17 Nov.
- (±%) = change vs 17 Nov for the same stay; "n/a" = not returned (booked or min stay).
- "Ours" rows come from the 18 Nov snapshot (Smoobu = PriceLabs).
- Every priced row is also in `data/snapshots/2026-11-18/comps.csv`.

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) 18 Nov | Wed 18 Nov–Fri 20 Nov (2n) | Thu 19 Nov–Fri 20 Nov (1n) | Fri 20 Nov–Sun 22 Nov (2n) | Sun 22 Nov–Wed 25 Nov (3n) | Sun 22 Nov–Fri 27 Nov (5n) | Tue 24 Nov–Thu 26 Nov (2n) | Tue 24 Nov–Fri 27 Nov (3n) | Wed 2 Dec–Sat 5 Dec (3n) | Tue 8 Dec–Wed 9 Dec (1n) | Mon 14 Dec–Sat 19 Dec (5n) | Tue 15 Dec–Fri 18 Dec (3n) | Thu 17 Dec–Sat 19 Dec (2n) | Fri 18 Dec–Sun 20 Dec (2n) | Wed 23 Dec–Sat 26 Dec (3n) | Sun 3 Jan–Mon 4 Jan (1n) | Sun 3 Jan–Wed 6 Jan (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.71 (31) | n/a (was £260) | n/a | n/a | £416 | £397 | £440 | £416 | n/a (was £416) | n/a | £442 | £451 | £524 | £560 | £555 | n/a | £273 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (181) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £422 | £351 | £363 | £388 | £388 | £392 | £485 | £307 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | £232 (-4%) | n/a | n/a | n/a | n/a | £272 | n/a | £464 | n/a | £407 | £416 | £490 | £526 | £520 | n/a | £304 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a | n/a | n/a | £247 | £230 | £268 | £247 | n/a | n/a | £400 | £417 | £438 | £438 | £417 | n/a | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.54 (13) | £252 (-4%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £407 | £416 | £490 | £526 | n/a | n/a | £247 | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £389 (-1%) | £388 | £478 (-3%) | £570 | £513 | n/a | £373 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | £172 | n/a | n/a | £222 | £205 | £242 | £222 | n/a | n/a | £325 | £342 | £362 | n/a | £342 | n/a | £342 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.42 (64) | n/a (was £174) | £186 | n/a | n/a (was £187) | n/a (was £184) | n/a (was £191) | n/a (was £187) | n/a | £253 | £262 | £260 | £311 | n/a | £307 | n/a | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.73 (88) | n/a | n/a | n/a | n/a | n/a | £184 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £195 | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (74) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £234 | n/a | £202 (-3%) | £248 | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.55 (38) | n/a | n/a | n/a | £207 | £207 (-2%) | £220 (-1%) | £220 (-3%) | n/a | n/a | n/a | n/a | n/a | n/a | £339 | n/a | £221 | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | £210 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Kept median (n)** | | | | £221 (4) | £186 (1) | – (0) | £234 (4) | £218 (4) | £255 (6) | £234 (4) | £464 (1) | £253 (3) | £395 (8) | £388 (9) | £438 (9) | £526 (6) | £404 (8) | £485 (1) | £304 (9) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £232 (12) | £294 (11) | £451 (5) | £238 (21) | £207 (15) | £264 (26) | £248 (23) | £346 (19) | £335 (14) | £349 (53) | £342 (65) | £389 (42) | £486 (22) | £380 (45) | £258 (16) | £275 (67) | |
| **Ours, Smoobu room/night (status, min)** | | | | £177 Open, min 2 | £190 Open, min 2 | £262 Booked, min 2 | £201 Open, min 3 | £208 Open, min 3 | £210 Open, min 3 | £217 Open, min 3 | £273 Open, min 2/3 | £288 Open, min 1 | £252 Open, min 2/3 | £239 Open, min 2/3 | £286 Open, min 2 | £328 Booked/Open, min 2/4 | £280 Open, min 2 | £170 Open, min 3 | £184 Open, min 3 | |
| **Ours, comparable basis** | | | | £269 | £358 | £362 | £270 | £259 | £305 | £288 | £350 | £466 | £307 | £313 | £389 | £435 | £358 | £336 | £252 | list = Smoobu ×1.10 + £149/n |
| **Our pct / vs kept median** | | | | P100 / +22% | P100 / +92% | excluded (not open) | P75 / +16% | P75 / +18% | P83 / +20% | P75 / +23% | P0 / -25% | P100 / +84% | P12 / -22% | P22 / -19% | P44 / -11% | P17 / -17% | P38 / -12% | P0 / -31% | P33 / -17% | |
| Our pct / vs wider median | | | | P92 / +16% | P82 / +22% | excluded | P71 / +14% | P80 / +25% | P73 / +16% | P65 / +16% | P53 / +1% | P86 / +39% | P38 / -12% | P42 / -8% | P50 / +0% | P36 / -10% | P47 / -6% | P75 / +30% | P39 / -8% | |

### P05 (5 legacy ids; new 1481043902711346984: £578 on 7–9 Dec, £590 on 13–15 Dec, not returned on other stays)

| Airbnb id | Dist km | Sleeps | Rating (reviews) 18 Nov | Fri 20 Nov–Sun 22 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 7 Dec–Tue 8 Dec (1n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Mon 14 Dec (1n) | Sun 13 Dec–Tue 15 Dec (2n) | Fri 18 Dec–Sun 20 Dec (2n) | Sun 20 Dec–Tue 22 Dec (2n) | Mon 21 Dec–Tue 22 Dec (1n) | Mon 28 Dec–Wed 30 Dec (2n) | Tue 29 Dec–Wed 30 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.15 (13) | n/a | £509 | £449 | n/a | £509 | n/a | £570 | £570 | £570 | n/a | n/a | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | n/a | n/a | £552 | n/a | £1,020 | n/a | £1,020 | £1,020 | £1,070 | n/a | n/a | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (30) | n/a | n/a | £688 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | n/a | £400 | £375 | n/a | n/a | n/a | £510 (-1%) | £558 | £562 (-2%) | n/a | n/a | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.9 (29) | n/a | n/a | n/a | n/a | £572 (+6%) | n/a | £572 (+6%) | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Kept median (n)** | | | | – (0) | £454 (2) | £500 (4) | – (0) | £572 (3) | – (0) | £571 (4) | £570 (3) | £570 (3) | – (0) | – (0) | – (0) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £1,048 (1) | £509 (3) | £440 (8) | £499 (3) | £571 (8) | £575 (3) | £570 (9) | £592 (6) | £596 (7) | £706 (2) | £430 (1) | £430 (1) | |
| **Ours, Smoobu room/night (status, min)** | | | | £540 Booked, min 3 | £511 Booked, min 3 | £501 Open, min 3 | £487 Open, min 2 | £486 Open, min 2 | £516 Open, min 2 | £508 Open, min 2 | £624 Booked, min 3 | £1,334 Booked/Open, min 1/2 | £2,039 Open, min 1 | £1,662 Booked/Open, min 1/3 | £2,569 Open, min 1 | |
| **Ours, comparable basis** | | | | £511 | £488 | £432 obs | £568 | £470 obs | £590 | £486 obs | £659 | £1,298 | £2,031 obs | £1,594 | £2,508 obs | obs = own Airbnb card in same search; else 0.765/0.900 × Smoobu + cleaning/n |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | P25 / -14% | n = 0 | P0 / -18% | n = 0 | P0 / -15% | excluded (not open) | P100 / +128% | n = 0 | n = 0 | n = 0 | |
| Our pct / vs wider median | | | | excluded | excluded | P50 / -2% | P67 / +14% | P25 / -18% | P67 / +3% | P11 / -15% | excluded | P100 / +118% | P100 / +188% | P100 / +271% | P100 / +483% | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) 18 Nov | Fri 20 Nov–Sun 22 Nov (2n) | Sun 22 Nov–Tue 24 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 18 Dec–Sun 20 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.62 (13) | n/a | n/a | n/a (was £326) | £480 | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.71 (24) | n/a | n/a (was £296) | £296 | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | £265 | £275 | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | n/a | n/a | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | n/a | n/a | £397 | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (54) | n/a | n/a | n/a | £1,188 | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.6 (25) | n/a | £333 (-4%) | n/a (was £378) | £478 | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | n/a | n/a | £594 | parking listed |
| **Kept median (n)** | | | | – (0) | £299 (2) | £296 (3) | £537 (4) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £2,070 (6) | £359 (43) | £326 (42) | £709 (36) | |
| **Ours, Smoobu room/night (status, min)** | | | | £397 Booked, min 2 | £254 Open, min 2 | £323 Booked, min 3 | £503 Blocked, min 4 | |
| **Ours, comparable basis** | | | | £368 | £259 obs | £312 | £517 | obs = own Airbnb card in same search; else 0.765/0.900 × Smoobu + cleaning/n |
| **Our pct / vs kept median** | | | | excluded (not open) | P0 / -13% | excluded (not open) | excluded (not open) | |
| Our pct / vs wider median | | | | excluded | P26 / -28% | excluded | excluded | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) 18 Nov | Fri 20 Nov–Sun 22 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Fri 18 Dec–Sun 20 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | £178 | n/a | £252 | £252 | £252 | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | £228 | £352 | £352 | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | n/a | £246 | n/a (was £246) | £253 | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | £202 | £302 | £302 | n/a (was £302) | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | £202 | £302 | £302 | n/a (was £302) | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 4.92 (13) | n/a | n/a | n/a | £290 | £290 | £290 | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | £368 | £402 | n/a | n/a | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (20) | n/a | n/a | £244 (-2%) | n/a | n/a | n/a | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (18) | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | n/a | £241 | £241 | £241 | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | n/a | £218 (-2%) | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Kept median (n)** | | | | – (0) | £210 (6) | £302 (7) | £296 (6) | £253 (5) | £296 (4) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £355 (4) | £209 (21) | £302 (26) | £247 (36) | £289 (24) | £302 (19) | |
| **Ours, Smoobu room/night (status, min)** | | | | £450 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3 | £496 Open, min 3/4 | £532 Open, min 4 | |
| **Ours, comparable basis** | | | | £450 | £450 | £450 | £450 | £496 | £532 | Smoobu room |
| **Our pct / vs kept median** | | | | n = 0 | P100 / +114% | P100 / +49% | P100 / +52% | P100 / +96% | P100 / +80% | |
| Our pct / vs wider median | | | | P100 / +27% | P100 / +115% | P100 / +49% | P100 / +82% | P100 / +72% | P100 / +76% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) 18 Nov | Fri 20 Nov–Sun 22 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Fri 18 Dec–Sun 20 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | n/a | £174 | £192 | £192 | £199 | £206 | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (52) | n/a | n/a | n/a | £252 (-5%) | £293 (-2%) | £315 | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | £236 (+2%) | n/a (was £216) | £243 (-4%) | £268 | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | £292 | n/a (was £228) | n/a | £224 (+1%) | n/a | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.68 (63) | n/a | n/a | n/a | £216 (-2%) | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.43 (170) | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.75 (28) | n/a | n/a | n/a (was £228) | n/a | £236 | £246 | none listed |
| **Kept median (n)** | | | | £292 (1) | £174 (1) | £214 (2) | £220 (4) | £240 (4) | £257 (4) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £292 (1) | £187 (4) | £211 (6) | £214 (8) | £236 (11) | £246 (7) | |
| Ours | | | | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | |

Data gaps:
- **Booking.com live prices: NOT CHECKED** (WAF 11–12 Nov; not attempted, not bypassed).
  - The P11 percentile uses the Smoobu room and list price (× 1.10 + £149 cleaning ÷ n), not the promoted price a guest sees.
  - P11's Booking.com review count is not in `listings.csv`, so its review gap is NOT CHECKED and `quality_premium` = 0 by construction.
- **Darts 14–18 Dec: no price override.** Whether that is intended is NOT CHECKED. It conflicts with `darts_override_24oct`; for Corentin to confirm (carried, not new).
- **Comp activity:** five kept ids have not been returned on any stay for 6 days (P06 ×2, P14 ×2, P17 ×1). Their pages return HTTP 200. Calendars: NOT CHECKED (a calendar probe was refused by the permission system).
- **P05 set:** P05 had 5 kept ids since 16 Nov. 1481043902711346984 is added today (6), but it was returned on only 2 stays.
- **Wider set** is not filtered to ≥10 reviews (search cards carry no review count). Kept comps are all ≥12 reviews.
- **Thin samples:**
  - P06: 22–24 Nov n = 2.
  - P11: 2–5 Dec and 3–4 Jan n = 1 (wider used); 20–22 Nov n = 0.
  - P05: n = 3–4 with one £1,020 outlier; 1-night 7–8 / 13–14 Dec and 21 / 29 Dec n = 0.
  - P14: 20–22 Nov n = 0.
  - P17: n = 1–4.
- **P11 18 Nov price** is from PriceLabs (£164); Smoobu for that night was not checked.
- **P06 29 Nov** became unavailable overnight with no Smoobu reservation. Cause NOT CHECKED (next to the intentional block; not raised).
- **Whether Airbnb comp prices include VAT: NOT CHECKED.**
- **P05/P06 hidden Airbnb layer** (0.765 / 0.900 by lead time) is inferred from exact fits on today's observed cards. Its source belongs to the channel agent (a-airbnb-rules).
- **PriceLabs percentiles** are summary-table (Nearby Listings) room prices for an unspecified window, not the same-date figures. `market.csv` is the market agent's; I wrote nothing to it.
- **P17** is not in PriceLabs or Smoobu.
