# Competitor positioning: CENTRAL/NORTH (D = 2026-11-25)

**Method**
- **Policy read first** (`data/policy.json`). Not raised again: P06 intentional blocks (6 Dec on), P14 special setup (numbers only), Booking.com Visibility Booster, promotion stacking, 15%/20% stay discounts, Booking.com markup +15% (18 Nov) and derived rate plans, P08 handback (last night 13 Nov).
- **Comp ids: the same 60 as yesterday** (P05 6, P06 12, P11 12, P14 12, P17 7, SEG 11). **None replaced, none added.**
  - All 60 comp pages and our 2 Airbnb pages returned **HTTP 200** (checked 2026-11-25 07:25:05–07:26:58Z). Every kept comp has at least 12 reviews.
  - Changes overnight: 1639043256346803626 31 → 32 reviews (4.90 → 4.91); 1090528454481682946 88 → 89 (4.73 → 4.72); SEG 1548502477554034012 32 → 33; SEG 897028868119653426 22 → 23 (4.64 → 4.65). **P05 (ours) 39 reviews, 4.79; P06 (ours) 12, 4.58** (both unchanged).
  - **Not returned on any stay today:** P17 975294297333089697 (**13th day**) and 1242000869201075198 (5th); P05 912053248917940403 (**6th day**); P11 1515051936255130803 (5th) and 654396087724294901 (3rd); P14 1075245497252121738 (5th), 1595613237427991150 (2nd), 1459390808864489268, 1435253477626754812 and 1659680062193836633 (1st); SEG 1633989864851131941 (3rd), 11056472, 52560423, 897028868119653426 (2nd) and 6620546 (1st); P06 10 of 12 (most P06 stays are booked or blocked).
  - Pages are live. I tried to read the public calendar of 975294297333089697 to test "bookable in the next 60 days"; the request was **refused by this session's permission check, so calendars are NOT CHECKED** and no comp was replaced.
- **Searches:** 38 public Airbnb map searches (airbnb.co.uk, 271 result pages, 3,417 cards), **checked 2026-11-25 07:25:06–07:29:32Z**. No parse failure, no bot challenge. Same boxes, filters and adult search parameters as yesterday (P05 7 / P06 5 / P11 5 / P14 3 / P17 3 / SEG 6). "Wider" = same bedroom count, rated, within 1.25 km (SEG 1.0 km), **not filtered to at least 10 reviews**.
- **Stays priced for every comp and for us:** Fri 27–Sun 29 Nov (next Fri–Sun), Tue 1–Thu 3 Dec (midweek), **Fri 25–Sun 27 Dec (30 days out, moved on from 24–26 Dec)**.
  - P05: 29 Nov–3 Dec, 7–9 Dec, 13–15 Dec, 13–17 Feb. P06: 2–3 Dec. P11: 30 Nov–4 Dec, 8–9 Dec, darts 14–19 Dec, 23–26 Dec.
  - SEG open December stays: **10–13 Dec, 12–15 Dec, 16–20 Dec, 26–30 Dec**, NYE 30 Dec–3 Jan. P14/P17: 7–9, 14–16, 17–19 Dec.
- **Our prices:** `data/snapshots/2026-11-25/prices.csv` (Smoobu = PriceLabs on every central night); booked/open from Smoobu `reservations.csv`. SEG from PriceLabs `raw/prices_3588993.json`. P05 13–17 Feb from PriceLabs `get_listing_prices` today.
- **Price basis:** comps = Airbnb total ÷ nights after offers, cleaning included, taxes excluded. P05/P06 = our own Airbnb card in the same search ("obs"). P11 = list all-in = Smoobu × 1.15 + £149 ÷ n (Booking.com live NOT CHECKED: AWS WAF, not attempted). SEG = PriceLabs room only (cleaning NOT CHECKED). P14 = Smoobu room.
- **PriceLabs (read-only, 9 calls, strictly one at a time):** `get_user_logs` (listing, 24–25 Nov), `get_listing_prices` P05 12–17 Feb, `get_neighbourhood_data` P05, P11, SEG, P06, P14, `get_listing_date_overrides` P05 and P11. No write tool, no sync.
- **Rows written:** `data/snapshots/2026-11-25/comps.csv` already existed (copied forward, 19,700 data rows = 24 Nov). Under `flock .comps.csv.lock` I appended **557 rows**: 92 kept, 433 wider, 32 `:ours` (50 are `SEG*`). File now 20,257 data rows, all 11 fields. No guest data, no booking references.

## Overnight: edits and price moves
**The 24 Nov daytime refreshes on my listings were edit-triggered** (`get_user_logs` 24–25 Nov, 10 entries, all Reyhan, all 24 Nov). This answers the Dispatcher's t-pl-push-1811 question for P05, P06, P11, SEG (and P04/P20 seen in the same log):

| Listing | Edit (24 Nov, UTC) | Refresh (Dispatcher) | Effect on our price (prices.csv 24 → 25 Nov) |
|---|---|---|---|
| **P05** 3166592 | 10:50:38 DSO **29 Nov–2 Dec −8%**, min 3 | 10:51 (`last_refreshed_at` 10:51:08Z) | £503/£489/£484/£490 → **£488/£473/£469/£475** (−£15/−£16 a night, −3.0%). Overrides now show −8% on those 4 nights. |
| **P11** 3064196 (+ Vrbo child) | 10:48:14 DSO 30 Nov–4 Dec; 10:48:20 DSO 14–18 Dec (min 2, **no price**) | 10:50 | Overrides now **min-stay only, no % on 30 Nov–4 Dec and 14–18 Dec**: the −2% DSOs are gone. 30 Nov–4 Dec +£4–£5 a night (avg £206.25 → £210.50); 14–18 Dec +£4–£6 (avg £238.40 → £243.40). |
| **SEG** 3588993 | 10:54:33 DSO 17–19 Dec min 3; 10:54:54 DSO 7–9 Jan min 3 (no price) | 10:55 | Open nights +£2 net (20 Dec £442 → £446). |
| **P06** 3288517 | 13:14:35 DSO 6–13 Dec min 3 (no price) | 13:15 | Inside the intentional block (policy): status label changed Blocked → blank, still unavailable. Not raised. |
| P04 3562176 / P20 3547481 | 10:52:35 6–23 Dec −5% / 10:51:18 24 Nov +25% | 10:54 / 10:52 | Not my lane (P04/P20 are East); passed on for the PriceLabs lane. |

- No edit on P14. P14 moved −£3 over 8 nights (26 Dec–2 Jan engine moves).
- **P11 change is in line with Corentin's direction** ("cut PriceLabs discounts") and closes the −2% darts DSO conflict (14–15 Dec) raised as confirm-or-revert on 24 Nov.
- **P05 change runs against both Corentin's direction and the comp evidence** (P05 is booked 70% vs 50% and sits at or below the median with a +12% quality premium). It is a Reyhan edit that conflicts with a standing direction → **confirm or revert to Corentin**, not a new proposal.
- **P05 Valentine's 13–17 Feb carries a −5% DSO** (updated 15 Nov 19:14Z, covers 1–28 Feb). That explains why Your Price (£420.75 avg) sits under the uncustomized price (£462.50). Corentin's "cut PriceLabs discounts" applies; the comp evidence supports removing it.

## Summary

| Ref | Comps kept (n per stay) | Our pct vs kept, open stays | Rating ours vs kept median; review gap | Booked vs market, next 30 / 60 | Supported positioning |
|---|---|---|---|---|---|
| **P05 4BR** | 6 (0–5) | **7–9 Dec P25 / −19%**; 13–15 Dec P40 / −1%; **29 Nov–3 Dec P67 / +2% kept but P43 / −4% wider**; 1–3 Dec P50 / −2%; **13–17 Feb P40 / −10%** | **4.79 (39)** vs 4.50 (17); **+22 reviews** | **70.0% (21/30) vs 50%**; 50.0% (30/60) vs 39% (PriceLabs 70% / 52%) | `quality_premium` **+0.116 → +12% vs median**. `recommend` → **raise +21.6%** at every open stay (booked +20 pts vs market, priced P25–P67). Supported Smoobu room: **29 Nov–3 Dec £527–£563** (now £476), **7–9 Dec £533–£627** (£418), **13–15 Dec £556** (£480), **13–17 Feb £536** (£421). Minimum = median level: £465–£498 / £465–£548 / £485 / £475. |
| **P06 2BR** | 12 (0–2) | Only open night 2–3 Dec: kept n = 0; wider **P43 / −14%** raw (n 23), **+6% vs trimmed** median £404 (n 17, six ≥ £1,000 removed) | 4.58 (12) vs 4.64 (26); −14 reviews | 90.9% (10/11 non-blocked) vs 52%; PriceLabs 97% / 98% | `quality_premium` −0.024 → **−2% vs median**. Evidence is split by outliers: **hold £363** (card £427). `recommend` says raise +10% on demand; optional for one orphan night 7 days out. |
| **P11 2BR** | 12 (0–8) | **30 Nov–4 Dec P33 / −14%** (kept n 3) / P42 / −4% wider; **darts P17 / −22%**; 23–26 Dec P50 / −1%; 1–3 Dec P57 / +18%; **8 Dec P100 / +70%** (kept n 1), P75 / +38% wider | Booking.com only vs Airbnb kept 4.685 (36.5): not comparable; gap NOT CHECKED | 50.0% (15/30) vs 50%; 59.0% (23/39 sellable) vs 37% (PriceLabs 68%) | `quality_premium` = 0 → **0% vs median on list all-in**. `recommend` → **raise +5%** below P50 (30 Nov–4 Dec, darts), **hold** at P50+. Median-level Smoobu room: **30 Nov–4 Dec £220–£250** (ours £210.50); **darts £274–£320** (£243.40); 23–26 Dec £276–£289 (£287.33: hold); 8 Dec £142 wider (£245). |
| **SEG 3BR** (reference) | 11 (0–3) | 10–13 Dec P50 / −10% kept (n 2), P60 / +3% wider (n 5); 12–15 Dec P50 / −11%, P60 / +4%; 16–20 Dec P100 / +7% (n 1), P57 / +7% wider (n 7); **26–30 Dec P0 / −29% (n 1), P33 / −19% wider (n 6)**; NYE P0 / −32% (n 1), P29 / −6% wider (n 7) | No rating/reviews on record vs 4.84 (26); gap NOT CHECKED | PriceLabs 67% / 40% vs 44% / 34% (inflated by blocks 26 Nov–9 Dec and 15 Dec); booked 4/15 sellable next 30 | `quality_premium` = 0 → **up to the median, not above**. Mid-December (10–20 Dec): **hold** (room-only already +3% to +7% vs wider before cleaning). **26–30 Dec: up to about £679 all-in** (room £552). NYE: room £551 is −6% vs wider before cleaning, so **at the median once cleaning is added: hold**. |
| P08 2BR | not searched | n/a | – | handback 13 Nov | Moot (policy handback). |
| P14 1BR | 12 (0–5) | P100 on every kept stay | not on Airbnb; kept median 4.885 (20.5) | 0% vs 48% / 34% | Numbers only (special setup): **+37% to +94% vs kept median, +13% to +107% vs wider**. PriceLabs 1BR P50 £193, P90 £271 (own neighbourhood, n 173). |
| P17 1BR | 7 (0–3) | n/a | kept median 4.68 (53) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (same kept ids, repeated stays):**
- **P05:** 1606112160333193293 cut hard: 29 Nov–3 Dec £552 → £405 (−27%), 7–9 Dec and 13–15 Dec £1,020 → £620 (−39%). Kept median 29 Nov–3 Dec £449 → £405 (n 3), so our P33 / −5% became P67 / +2% kept while our own room fell 3%. Wider £449 → £430 (−4% now). 7–9 Dec flat at £517 (P25 / −19% for the 2nd day). 13–15 Dec and Valentine's flat (£469 / £467).
- **P11:** 30 Nov–4 Dec kept £278 → £324 (n 4 → 3; 1090528454481682946 £202 not returned): P50 → P33. Darts £396 → £398; 2557770 −18% to £289. 23–26 Dec £404 → £382 (2557770 −11% to £348): P38 → P50. 8 Dec kept n 2 → 1 (£253). 1–3 Dec kept £340 → £262 (n 6 → 7; 1159915905276842600 £338 not returned, 1480693526878012391 £262 and 1568808216094734994 £225 added).
- **P06:** 2–3 Dec wider £425 → £497 (n 25 → 23). The jump is in the tail (6 listings at £1,005–£2,700); trimmed it is £404.
- **SEG:** 12–15 Dec kept £480 → £469 (1165719843393058533 −4% to £554). NYE kept 1548502477554034012 £835 → £811 (−3%); **wider NYE £669 → £586** (n 8 → 7).
- **P14:** kept 14–16 Dec £290 → £302 (n 7 → 4); 17–19 Dec flat at £253; 7–9 Dec £246 flat; 1–3 Dec £232 flat.
- **P17:** 1–3 Dec £228 → £198 (n 1 → 2); 14–16 Dec £200 → £194; 17–19 Dec £225 → £208; 7–9 Dec £228 → £232.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Gap (stay) | Smoobu room/night 25 Nov (24 Nov), min | Ours, Airbnb all-in/night | Kept median (n) | Pct / vs median | Wider 4BR ≤1.25 km (n) | +11.6% supported → Smoobu room; median-level |
|---|---|---|---|---|---|---|
| **29 Nov–2 Dec** (29 Nov–3 Dec, min 3) | £488 / £473 / £469 / £475 = **£476.25** (£491.50; −8% DSO from 24 Nov) | £413.25 obs | £405 (3) | P67 / +2% | **£430 (7): P43 / −4%** | about **£527 (kept) / £563 (wider)**; median-level £465 / £498 |
| 1–2 Dec (Tue 1–Thu 3 Dec, midweek; min 3, not bookable as 2n) | £469 / £475 = £472 | £459 derived (0.765 × room + £195 ÷ 2) | £468 (2) | P50 / −2% | £436 (8): P62 / +5% | (inside the 29 Nov–3 Dec gap) |
| **7–8 Dec** (7–9 Dec, min 2) | £428 / £407 = **£417.50** (£418) | £417.00 obs | **£517 (4)** | **P25 / −19%** | £453 (11): P27 / −8% | about **£627 (kept) / £533 (wider)**; median-level £548 / £465 |
| 13–14 Dec (13–15 Dec, min 2) | £483 / £477 = £480 (£480) | £465.00 obs | £469 (5) | P40 / −1% | £469 (10): P40 / −1% | about **£556**; median-level £485 |
| **13–16 Feb, Valentine's** (13–17 Feb, 4n, min 4) | PriceLabs Your Price **£438 / £408 / £417 / £420 = £420.75** (£422.00); uncustomized £498 / £435 / £455 / £462 (avg £462.50); **−5% DSO** | **£419.25 obs (£1,677 total)** | **£467 (5)** | **P40 / −10%** | £467 (11): P36 / −10% | about **£536**; median-level **£475** |

- **7–9 Dec is still the weakest position (P25 / −19% kept, −8% wider) for the 2nd day.** Our room is unchanged.
- **29 Nov–3 Dec looks better vs kept only because a comp cut 27%.** Against the wider set it slipped from −5% to −4% while our room fell 3% on Reyhan's −8% DSO. Quality supports £527–£563 room; the gap is 4 nights, 4 days out.
- **Valentine's:** third day at P40 / −10%. Open in PriceLabs (last refreshed 24 Nov 10:51:08Z) and on Airbnb (card £419.25). The −5% DSO explains the gap to the uncustomized price; removing it alone brings the room to about £442.
- 21 Dec (£2,193, 1n) and 29 Dec are DSO-driven orphans (+300%, open action a-p05-dec). Not raised as new.
- **Positioning:** `quality_premium(4.79, 4.50)` = +0.116. `recommend(0.70, 0.50, 0.25–0.67, 0.116)` → **raise +21.6%**. **Supported: +12% vs median.**
- **Differentiators:** 912053248917940403 (4.97, Superhost, lift, park view; not returned for the 6th day) and 1639043256346803626 (4.91, 32 reviews, Superhost, terrace, parking) are the quality peers. The cheap end (1610095240357069208 4.15, 1363636555926649515 3.93) rates well below us. Ours: Abbey Road location; parking and terrace NOT CHECKED.

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272)

| Open night | Smoobu room 25 Nov (24 Nov) | Our card (obs) | Kept median (n) | Wider median (n) | Pct / vs wider | Trimmed wider (< £1,000) | PriceLabs 2BR room (25 Nov) |
|---|---|---|---|---|---|---|---|
| **2–3 Dec (1n, min 1)** | **£363** (£363; +25% DSO from 23 Nov) | **£427** (factor 0.821 after £129 cleaning) | n = 0 | £497 (23) | **P43 / −14%** | **£404 (17): +6%** | P25 £318, P50 £410, P75 £526 |

- One open night before the intentional block (6 Dec on). 24–29 Nov, 29 Nov–2 Dec and 3–6 Dec are booked (Airbnb).
- The raw wider median rose £425 → £497 because six listings at £1,005–£2,700 sit in a 23-card sample. Without them our card is +6%; with them it is −14%. Quality (−2%) points to about the median. **Hold £363**; the raw −14% is not reliable evidence for a raise.
- **Positioning:** `quality_premium(4.58, 4.64)` = −0.024. `recommend(0.909, 0.52, 0.43, −0.024)` → raise +10% (demand-led; optional for one night 7 days out).
- Christmas 25–27 Dec is blocked (policy); priced for the trend only.

## P11 Camden (3064196; Booking.com only)

| Open nights (stay priced) | Ours room avg 25 Nov (24 Nov) | List all-in ×1.15 (×1.10) | Kept median (n) | **Pct / vs kept** | Wider median (n); pct / vs wider | Median-level Smoobu room* kept / wider |
|---|---|---|---|---|---|---|
| **30 Nov–3 Dec** (30 Nov–4 Dec, 4n, min 2) | **£210.50** (£206.25) | £279.32 (£268.80) | **£324 (3)** | **P33 / −14%** | £290 (19); P42 / −4% | **£250 / £220** |
| 1–2 Dec (Tue 1–Thu 3 Dec, midweek) | £203.50 (£199.50) | £308.52 (£298.35) | £262 (7) | P57 / +18% | £276 (39); P62 / +12% | £163 / £175 |
| **8 Dec** (8–9 Dec, 1n, min 1) | **£245** (£245; +50% DSO) | £430.75 (£418.50) | £253 (1) | P100 / +70% | £312 (12); **P75 / +38%** | £90 / £142 |
| **14–18 Dec, darts** (14–19 Dec, 5n, min 2) | **£243.40** (£238.40) | £309.71 (£297.54) | **£398 (6)** | **P17 / −22%** | £345 (42); P36 / −10% | **£320 / £274** |
| **23–25 Dec** (23–26 Dec, 3n, min 2) | **£287.33** (£287.67) | £380.10 (£365.73) | £382 (8) | **P50 / −1%** | £367 (44); P57 / +4% | £289 / £276 |
| 25–26 Dec (Fri 25–Sun 27 Dec, 30-day default) | £312.50 | £433.88 | £538 (3) | excluded (26 Dec booked) | £498 (25) | – |

\* Median-level Smoobu room = (median − £149 ÷ n) ÷ 1.15: the Smoobu rate whose Booking.com list plus cleaning equals the comp median, before stacked promotions (policy).

- **Darts 14–19 Dec is still the clear gap: −22% kept / −10% wider.** Removing the −2% DSO added £5 a night; supported is **£274–£320 room (+13% to +31%)**. `recommend` gives +5% (to about £256) as the step that the rule allows at P17–P36.
- **30 Nov–4 Dec slipped to P33 / −14% kept on n = 3** (one cheap comp not returned); vs wider (n 19) it is −4%. Supported: **+5% to about £221**, up to £250 only if the thin kept set holds.
- **23–26 Dec is at the median** (P50 / −1% kept, +4% wider). Hold.
- **8 Dec** (+50% DSO, orphan between bookings) stays far above: +38% vs wider (n 12). Open item t-p11-8dec-orphan; not new.
- 1–3 Dec midweek is above the median (+12% to +18%) because cheaper comps reappeared. Hold.
- **Positioning:** `quality_premium` = 0 (no Booking.com review data). `recommend(0.50, 0.50, pct, 0)` → **raise +5%** below P50, **hold** at P50+. **Supported: comp median (0%) on list all-in.**
- **Differentiators:** basement with patio, no lift. 4 of 12 comps have a lift and 3 a balcony or terrace. 2557770 has 182 reviews; 654396087724294901 is a Superhost.

## SEG Scott Ellis Gardens 3-bed (PriceLabs 3588993; NW8; reference positioning only, not mapped)

| Stay | PriceLabs room/night 25 Nov (24 Nov) | Status (min) | Kept median (n) | Pct / vs kept | Wider 3BR ≤1.0 km (n) | Pct / vs wider | Supported |
|---|---|---|---|---|---|---|---|
| 27–29 Nov, 1–3 Dec | £573 / £435 | **Blocked** (26 Nov–9 Dec, unchanged since 24 Nov) | – / £496 (3) | excluded | – / £404 (8) | excluded | not sellable |
| **10–12 Dec** (10–13 Dec, 3n) | £402 / £457 / £460 = **£439.67** | Open (min 3) | £491 (2) | P50 / −10% | £429 (5) | P60 / +3% | **hold** (room-only already above wider) |
| **12–14 Dec** (12–15 Dec, 3n) | £460 / £406 / £384 = **£416.67** (£416.67) | Open (min 2/3); 15 Dec Blocked | £469 (2) | P50 / −11% | £401 (5) | P60 / +4% | **hold** |
| **16–19 Dec** (16–20 Dec, 4n) | £412 / £429 / £482 / £501 = **£456.00** | Open (min 3) | £425 (1) | P100 / +7% | £425 (7) | P57 / +7% | **hold** (room-only +7%; do not go higher) |
| 25–26 Dec (Fri 25–Sun 27 Dec) | £447 / £490 | 25 Dec Booked (21–26 Dec stay) | n = 0 | excluded | £658 (4) | excluded | – |
| **26–29 Dec** (26–30 Dec, 4n) | £490 / £503 / £591 / £623 = **£551.75** | Open (min 4; 27 Dec min 7) | £781 (1) | P0 / −29% | **£679 (6)** | **P33 / −19%** | **up to about £679 all-in** (less cleaning ÷ 4) |
| **NYE 30 Dec–2 Jan** (30 Dec–3 Jan, 4n) | £619 / £618 / £501 / £465 = **£550.75** (£551.25) | Open (min 4/3) | £811 (1) | P0 / −32% | **£586 (7)** | **P29 / −6%** | **hold**: at the median once cleaning is added |

- **Block:** 26 Nov–9 Dec and 15 Dec are Blocked in PriceLabs, unchanged since 24 Nov. Cause NOT CHECKED (not in Smoobu; no PriceLabs log entry). Reyhan's 24 Nov edits are min-stay only (17–19 Dec, 7–9 Jan, min 3).
- **Second reservation:** the Dispatcher counts 2 Smoobu reservations; PriceLabs shows only the 21–26 Dec stay as Booked. Dates and channel of the second one NOT CHECKED here (channel lane).
- **NYE moved from −18% to −6% vs wider** because the wider median fell £669 → £586, not because our price moved (−£0.50). Once a cleaning fee is added our all-in is at or above the median.
- **26–30 Dec is the one SEG stay the evidence supports raising** (−19% vs wider n 6; market +31.1% surge 27–31 Dec, occupancy +23.5% 27 Dec–1 Jan per PriceLabs). 27 Dec min 7 blocks most 3–5 night arrivals that day.
- **PriceLabs 3BR (25 Nov, room):** P25 £316, P50 £383, P75 £470, P90 £617 (n 148). December mid-month rooms (£417–£456) sit between P50 and P75.
- **Positioning:** with no rating or review count on record, `quality_premium` = 0. `recommend` on PriceLabs occupancy (0.67 vs 0.44) → raise +5% to +10%; on booked-only occupancy (4/15 vs 0.44) → fix-listing. Neither is reliable while blocks distort PriceLabs occupancy. **Supported: up to the comp median, not above.**
- **Differentiators:** 3 bed / **2 bath** (bath counts for comps NOT CHECKED; only 1548502477554034012 states 2 baths). Standouts: 6620546 (315 reviews, 4.92, garden), 52560423 (377 reviews, 4.90), 1633989864851131941 (cinema room, garden, 0.35 km; not returned for the 3rd day). 7 of the 11 are Superhosts or Guest favourites.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- **Smoobu 25 Nov:** £450 every night to 25 Dec (min 3–4). 26 Dec–2 Jan £468–£636 (−£3 net overnight).
- **Booked:** 0% next 30 / 60 vs market 48% / 34% (pl_kpis). No P14 reservation in that window. No edit in the 24–25 Nov log.
- **Vs kept median, P100 on every stay:** 1–3 Dec +94% (n 3), 7–9 Dec +83% (5), 14–16 Dec +49% (4), 17–19 Dec +78% (5), 25–27 Dec +37% (3). 27–29 Nov kept n = 0, wider +13% (3).
- **PriceLabs own neighbourhood (first pull):** 1BR P25 £148, P50 £193, P75 £233, P90 £271 (n 173); 2BR P50 £291. £450 is 1.66× the 1BR P90.
- Numbers only. The PriceLabs minimum of 450 (vs £500 in policy) is already confirm-or-revert; not re-raised.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)
- **Kept medians:** 1–3 Dec £198 (2); 7–9 Dec £232 (2); 14–16 Dec £194 (3); 17–19 Dec £208 (3); 25–27 Dec £224 (2); 27–29 Nov n = 0. Rating median 4.68 (53).
- 975294297333089697 has not been returned for **13 days** (page HTTP 200; calendar NOT CHECKED, see Method). First in line for replacement once it is shown closed.

## P08 Islington: handback
- Policy last night 13 Nov. Not searched; no rows written.

## Comp tables

**Source for every comp row:**
- Airbnb public search (airbnb.co.uk), checked 2026-11-25 07:25:06–07:29:32Z.
- Nightly = total ÷ nights, after offers, cleaning included, taxes excluded.
- Rating (reviews) and sleeps from each listing page (07:25–07:26Z). Dist km from 17 Nov (SEG: from the PriceLabs pin, 22 Nov).
- (±%) = change vs 24 Nov for the same stay; "n/a" = not returned (booked or min stay). New stays today (25–27 Dec, SEG 10–13 / 16–20 / 26–30 Dec) have no comparison.
- "Ours" rows come from the 25 Nov snapshot (P05 Feb from PriceLabs `get_listing_prices` 25 Nov). "excluded (not open)" = at least one night is booked or blocked.
- Every priced row is in `data/snapshots/2026-11-25/comps.csv`.

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) 25 Nov | Fri 27 Nov–Sun 29 Nov (2n) | Mon 30 Nov–Fri 4 Dec (4n) | Tue 1 Dec–Thu 3 Dec (2n) | Tue 8 Dec–Wed 9 Dec (1n) | Mon 14 Dec–Sat 19 Dec (5n) | Wed 23 Dec–Sat 26 Dec (3n) | Fri 25 Dec–Sun 27 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.71 (31) | n/a | £404 | £440 | n/a | £442 | £555 | £573 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.73 (182) | n/a | n/a | n/a | n/a (was £400) | £289 (-18%) | £348 (-11%) | n/a | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | £324 | £360 | n/a | n/a (was £407) | £520 | £538 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a | n/a | n/a (was £338) | n/a | £400 | £417 | £438 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.5 (14) | n/a | n/a | £342 | n/a | £407 | n/a | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.71 (14) | n/a | n/a | n/a | n/a | £395 | £505 (-3%) | n/a | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a | £231 | £262 | n/a | £325 | £342 | n/a | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.39 (66) | n/a | n/a | £241 | £253 | n/a (was £262) | £307 | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (89) | n/a | n/a (was £202) | £210 | n/a | n/a | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (74) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.56 (39) | n/a | n/a | £225 | n/a | n/a | £339 | n/a | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Kept median (n)** | | | | – (0) | £324 (3) | £262 (7) | £253 (1) | £398 (6) | £382 (8) | £538 (3) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £253 (2) | £290 (19) | £276 (39) | £312 (12) | £345 (42) | £367 (44) | £498 (25) | |
| **Ours, room/night (status, min)** | | | | £268 Booked, min 2 | £210 Open, min 2 | £204 Open, min 2 | £245 Open, min 1 | £243 Open, min 2 | £287 Open, min 2 | £312 Booked/Open, min 2/4 | |
| **Ours, comparable basis** | | | | £383 | £279 | £309 | £431 | £310 | £380 | £434 | list = Smoobu ×1.15 (policy) + £149/n |
| **Our pct / vs kept median** | | | | excluded (not open) | P33 / -14% | P57 / +18% | P100 / +70% | P17 / -22% | P50 / -1% | excluded (not open) | |
| Our pct / vs wider median | | | | excluded (not open) | P42 / -4% | P62 / +12% | P75 / +38% | P36 / -10% | P57 / +4% | excluded (not open) | |

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) 25 Nov | Fri 27 Nov–Sun 29 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Tue 1 Dec–Thu 3 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Fri 25 Dec–Sun 27 Dec (2n) | Sat 13 Feb–Wed 17 Feb (4n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.15 (13) | n/a | £449 | £509 | £453 | £469 | n/a | £392 | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | n/a | £405 (-27%) | n/a (was £748) | £620 (-39%) | £620 (-39%) | n/a | £467 | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (30) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | n/a | £394 (+1%) | £427 (+2%) | n/a | £432 (-2%) | £570 | £416 | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.91 (32) | n/a | n/a | n/a | £406 | £406 | n/a | £805 | Superhost, parking listed, balcony/patio/terrace (house) |
| [1481043902711346984](https://www.airbnb.co.uk/rooms/1481043902711346984) | 1.16 | 8 | 4.76 (17) | n/a | n/a | n/a | £581 | £578 (-1%) | n/a | £534 | added 18 Nov |
| **Kept median (n)** | | | | – (0) | £405 (3) | £468 (2) | £517 (4) | £469 (5) | £570 (1) | £467 (5) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £1,048 (1) | £430 (7) | £436 (8) | £453 (11) | £469 (10) | £786 (2) | £467 (11) | |
| **Ours, room/night (status, min)** | | | | £574 Booked, min 4 | £476 Open, min 3 | £472 Open, min 3 | £418 Open, min 2 | £480 Open, min 2 | £583 Booked, min 3 | £421 Open, min 4 | |
| **Ours, comparable basis** | | | | £537 | £413 obs | £459 | £417 obs | £465 obs | £622 | £419 obs | obs = own Airbnb card in same search; else 0.765/0.900 × Smoobu + £195/n |
| **Our pct / vs kept median** | | | | excluded (not open) | P67 / +2% | P50 / -2% | P25 / -19% | P40 / -1% | excluded (not open) | P40 / -10% | |
| Our pct / vs wider median | | | | excluded (not open) | P43 / -4% | P62 / +5% | P27 / -8% | P40 / -1% | excluded (not open) | P36 / -10% | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) 25 Nov | Fri 27 Nov–Sun 29 Nov (2n) | Tue 1 Dec–Thu 3 Dec (2n) | Wed 2 Dec–Thu 3 Dec (1n) | Fri 25 Dec–Sun 27 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.64 (14) | n/a | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.72 (25) | n/a | £296 | n/a | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | n/a | n/a | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | £369 | n/a | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (54) | n/a | n/a | n/a | n/a | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.6 (25) | n/a | n/a | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | n/a | n/a | n/a | parking listed |
| **Kept median (n)** | | | | – (0) | £332 (2) | – (0) | – (0) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £2,600 (4) | £390 (54) | £497 (23) | £790 (32) | |
| **Ours, room/night (status, min)** | | | | £430 Booked, min 3 | £348 Booked/Open, min 1/3 | £363 Open, min 1 | £489 Blocked, min 4 | |
| **Ours, comparable basis** | | | | £421 | £354 | £427 obs | £505 | obs = own Airbnb card; else 0.83/0.900 × Smoobu + £129/n |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | n = 0 | excluded (not open) | |
| Our pct / vs wider median | | | | excluded (not open) | excluded (not open) | P43 / -14% | excluded (not open) | |

### SEG

| Airbnb id | Dist km | Sleeps | Rating (reviews) 25 Nov | Fri 27 Nov–Sun 29 Nov (2n) | Tue 1 Dec–Thu 3 Dec (2n) | Thu 10 Dec–Sun 13 Dec (3n) | Sat 12 Dec–Tue 15 Dec (3n) | Wed 16 Dec–Sun 20 Dec (4n) | Fri 25 Dec–Sun 27 Dec (2n) | Sat 26 Dec–Wed 30 Dec (4n) | Wed 30 Dec–Sun 3 Jan (4n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1633989864851131941](https://www.airbnb.co.uk/rooms/1633989864851131941) | 0.35 | 6 | 4.88 (43) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | cinema room, garden, Guest favourite |
| [1498503422089605343](https://www.airbnb.co.uk/rooms/1498503422089605343) | 0.43 | 7 | 4.84 (25) | n/a | £347 | £400 | £383 | n/a | n/a | n/a | n/a | ground floor, refurbished (title), Superhost |
| [6620546](https://www.airbnb.co.uk/rooms/6620546) | 0.62 | 6 | 4.92 (315) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | 4-acre garden, Guest favourite, Superhost |
| [1548502477554034012](https://www.airbnb.co.uk/rooms/1548502477554034012) | 0.62 | 6 | 4.91 (33) | n/a | n/a | n/a | n/a | n/a | n/a | £781 | £811 (-3%) | 2 bath, A/C, Guest favourite (title says sleeps 8; page capacity 6), Superhost |
| [11056472](https://www.airbnb.co.uk/rooms/11056472) | 0.72 | 6 | 4.26 (23) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Marylebone (title) |
| [1648663792586887168](https://www.airbnb.co.uk/rooms/1648663792586887168) | 0.76 | 6 | 4.86 (14) | n/a | n/a | n/a | n/a | £425 | n/a | n/a | n/a | none in title, Superhost |
| [52560423](https://www.airbnb.co.uk/rooms/52560423) | 0.8 | 6 | 4.9 (377) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite, Superhost |
| [1165719843393058533](https://www.airbnb.co.uk/rooms/1165719843393058533) | 0.82 | 6 | 4.79 (24) | n/a | n/a | £583 | £554 (-4%) | n/a | n/a | n/a | n/a | Little Venice (title), Superhost |
| [897028868119653426](https://www.airbnb.co.uk/rooms/897028868119653426) | 0.87 | 6 | 4.65 (23) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | family home near Little Venice (title) |
| [1269544547244432855](https://www.airbnb.co.uk/rooms/1269544547244432855) | 0.89 | 6 | 4.7 (61) | n/a | £496 | n/a | n/a | n/a | n/a | n/a | n/a | A/C, rooftop (title) |
| [1064528274936916938](https://www.airbnb.co.uk/rooms/1064528274936916938) | 0.91 | 6 | 4.81 (26) | n/a | £584 | n/a | n/a | n/a | n/a | n/a | n/a | by Paddington station (title) |
| **Kept median (n)** | | | | – (0) | £496 (3) | £491 (2) | £469 (2) | £425 (1) | – (0) | £781 (1) | £811 (1) | |
| Wider: same bedrooms, rated, ≤1.0 km (n) | | | | – (0) | £404 (8) | £429 (5) | £401 (5) | £425 (7) | £658 (4) | £679 (6) | £586 (7) | |
| **Ours, room/night (status, min)** | | | | £573 Blocked, min 4 | £435 Blocked, min 2 | £440 Open, min 3 | £417 Open, min 2/3 | £456 Open, min 3 | £468 Booked/Open, min 4 | £552 Open, min 4/5/7 | £551 Open, min 3/4 | |
| **Ours, comparable basis** | | | | £573 | £435 | £440 | £417 | £456 | £468 | £552 | £551 | PriceLabs room (not in Smoobu); cleaning NOT CHECKED, not added |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | P50 / -10% | P50 / -11% | P100 / +7% | excluded (not open) | P0 / -29% | P0 / -32% | |
| Our pct / vs wider median | | | | excluded (not open) | excluded (not open) | P60 / +3% | P60 / +4% | P57 / +7% | excluded (not open) | P33 / -19% | P29 / -6% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) 25 Nov | Fri 27 Nov–Sun 29 Nov (2n) | Tue 1 Dec–Thu 3 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Fri 25 Dec–Sun 27 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | £202 | n/a | n/a (was £252) | £252 | n/a | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | n/a | £352 | £352 | n/a | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | n/a | £246 | n/a (was £246) | £253 | £334 | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | £232 | £302 | £302 | £302 | £352 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | £232 | £302 | £302 | n/a | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 4.92 (13) | n/a | n/a | n/a | n/a (was £290) | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.71 (28) | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (21) | n/a | n/a | £216 (-1%) | n/a | n/a | £235 | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | n/a | £241 | £241 | £241 | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Kept median (n)** | | | | – (0) | £232 (3) | £246 (5) | £302 (4) | £253 (5) | £334 (3) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £398 (3) | £217 (16) | £294 (16) | £244 (30) | £266 (23) | £352 (11) | |
| **Ours, room/night (status, min)** | | | | £450 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3/4 | £459 Open, min 4 | |
| **Ours, comparable basis** | | | | £450 | £450 | £450 | £450 | £450 | £459 | Smoobu room |
| **Our pct / vs kept median** | | | | n = 0 | P100 / +94% | P100 / +83% | P100 / +49% | P100 / +78% | P100 / +37% | |
| Our pct / vs wider median | | | | P100 / +13% | P100 / +107% | P100 / +53% | P100 / +84% | P100 / +69% | P91 / +30% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) 25 Nov | Fri 27 Nov–Sun 29 Nov (2n) | Tue 1 Dec–Thu 3 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Fri 25 Dec–Sun 27 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.5 (18) | n/a | £170 | n/a | £192 | £199 | £206 | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (53) | n/a | n/a | n/a | £252 | £293 | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | £226 | £235 | n/a (was £198) | £208 (-2%) | £242 | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.68 (63) | n/a | n/a | n/a | £194 (-3%) | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.43 (170) | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.76 (29) | n/a | n/a (was £228) | £228 | n/a | n/a (was £237) | n/a | none listed |
| **Kept median (n)** | | | | – (0) | £198 (2) | £232 (2) | £194 (3) | £208 (3) | £224 (2) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | – (0) | £188 (4) | £228 (5) | £197 (6) | £228 (9) | £282 (10) | |
| Ours | | | | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | |

Data gaps:
- **Booking.com live prices: NOT CHECKED** (AWS WAF; not attempted, not bypassed). P11 is compared at list (Smoobu × 1.15 per policy, × 1.10 alongside) + £149 ÷ n, not at the promoted price a guest sees.
- **Comp activity / calendars: NOT CHECKED.** 21 kept ids not returned on any stay today (11 outside P06, plus 10 of 12 P06 comps); P17 975294297333089697 for 13 days, P05 912053248917940403 for 6. A read of one public calendar was refused by the session permission check, so no comp was replaced.
- **P11:** Booking.com review count not in `listings.csv`, so the review gap is NOT CHECKED and `quality_premium` = 0. 30 Nov–4 Dec kept n = 3, 8 Dec n = 1.
- **SEG:** block 26 Nov–9 Dec and 15 Dec: cause NOT CHECKED. Second Smoobu reservation: dates/channel NOT CHECKED here. Not in `id_map`/`policy`; cleaning fee, OTA id, rating and reviews NOT CHECKED, so room-only figures are compared with all-in comps. Kept n = 0–3 on every stay (rests on wider n = 4–8, not review-filtered).
- **P06:** one open night; kept n = 0; wider n = 23 with six listings ≥ £1,000, so the median is unstable (£497 raw, £404 trimmed).
- **P05:** 29 Nov–3 Dec and 1–3 Dec kept n = 2–3; 1639043256346803626 (£805) is an outlier in the Valentine's set.
- **Thin samples:** P14 27–29 Nov kept n = 0 and 14–16 Dec n = 4; P17 n = 0–3.
- **Wider set** is not filtered to at least 10 reviews. Whether Airbnb comp prices include VAT: NOT CHECKED.
- **PriceLabs percentiles** are Nearby Listings summary-table room prices for an unspecified window, not the same dates (25 Nov): P05 4BR 454 / 572 / 701 / 1,214 (n 91); P06 2BR 318 / 410 / 526 / 664 (n 214); P11 2BR 231 / 292 / 328 / 390 (n 172); SEG 3BR 316 / 383 / 470 / 617 (n 148); P14 1BR 148 / 193 / 233 / 271 (n 173). `market.csv` belongs to the market agent; nothing written to it.
- **P12/P13 refreshes (24 Nov 09:37–09:43Z):** no P12/P13 entry in the 24–25 Nov listing log, so those were not edit-triggered by a listing edit; group/account logs not pulled (PriceLabs lane).
- **P17** is not in PriceLabs or Smoobu. **P08** is a handback and was not searched.
