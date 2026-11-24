# Competitor positioning: CENTRAL/NORTH (D = 2026-11-24)

**Method**
- **Policy read first** (`data/policy.json`). Not raised again: P06 intentional blocks (6 Dec on), P14 special setup (numbers only), Booking.com Visibility Booster, promotion stacking, 15%/20% stay discounts, Booking.com markup +15% (18 Nov) and derived rate plans, P08 handback (last night 13 Nov).
- **Comp ids: the same 60 as yesterday** (P05 6, P06 12, P11 12, P14 12, P17 7, SEG 11). **None replaced, none added.**
  - All 60 comp pages and our 2 Airbnb pages returned **HTTP 200** (checked 2026-11-24 07:20:38–07:22:37Z). Every kept comp has at least 12 reviews.
  - Changes overnight: 1639043256346803626 30 → 31 reviews; 1700204078606711134 13 → 14 (4.62 → 4.64); 1263490105174331990 65 → 66 (4.40 → 4.39); 1182369331195783741 52 → 53; SEG 1633989864851131941 42 → 43. **P05 (ours) 39 reviews, 4.79; P06 (ours) 12, 4.58** (both unchanged).
  - **Not returned on any stay today:** P17 975294297333089697 (**12th day**) and 1242000869201075198 (4th); P05 912053248917940403 (**5th day**); P11 1515051936255130803 (4th) and 654396087724294901 (2nd); P14 1075245497252121738 (4th) and 1595613237427991150 (1st); SEG 1633989864851131941 (2nd), 11056472, 52560423 and 897028868119653426 (1st); P06 9 of 12 (most P06 stays are booked or blocked). The pages are live but I did not probe calendars, so "bookable in the next 60 days" is **NOT CHECKED** and no comp was replaced.
- **Searches:** 44 public Airbnb map searches (airbnb.co.uk, 331 result pages, 4,354 cards), **checked 2026-11-24 07:20:40–07:26:58Z**. No parse failure, no bot challenge. Same boxes, filters and adult counts as yesterday (P05 7 / P06 5 / P11 5 / P14 3 / P17 3 / SEG 6). "Wider" = same bedroom count, rated, within 1.25 km (SEG 1.0 km). It is **not filtered to at least 10 reviews** (cards carry no review count).
- **Stays priced for every comp and for us:** Fri 27–Sun 29 Nov (next Fri–Sun), **Tue 1–Thu 3 Dec (midweek)**, **Thu 24–Sat 26 Dec (30 days out)**. 23–25 Dec is repeated for the trend.
  - P05: 29 Nov–3 Dec, 7–9 Dec, 13–15 Dec, 13–17 Feb.
  - P06: 2–3 Dec, the only open night. 23–28 Nov are past or booked (Airbnb 24–29 Nov stay), so none are open.
  - P11: 25–27 Nov (open nights), 30 Nov–4 Dec, 8–9 Dec, darts 14–19 Dec, 23–26 Dec.
  - SEG: 29 Nov–2 Dec, 9–12 Dec, 12–15 Dec, NYE 30 Dec–3 Jan.
  - P14/P17: 7–9, 14–16 and 17–19 Dec.
- **Our prices:** `data/snapshots/2026-11-24/prices.csv` (Smoobu = PriceLabs on every central night). Booked/open status comes from Smoobu `reservations.csv`. **SEG uses PriceLabs `raw/prices_3588993.json`** (not in Smoobu). P05 13–17 Feb comes from PriceLabs `get_listing_prices` (today) plus our own Airbnb card.
- **Price basis:**
  - Comps = Airbnb total ÷ nights after offers, **cleaning included**, taxes excluded.
  - P05/P06 = our own Airbnb card in the same search ("obs").
  - P11 = list all-in = Smoobu × 1.15 + £149 ÷ n. Booking.com live is **NOT CHECKED** (AWS WAF; not attempted).
  - SEG = PriceLabs room only (cleaning NOT CHECKED).
- **PriceLabs (read-only, 6 calls):** `get_user_logs` (listing, 23–24 Nov; P05, P06, P11, P14, SEG), `get_listing_prices` P05 10–18 Feb, then `get_neighbourhood_data` for SEG, P11, P05 and P06.
  - **Process slip:** the last three neighbourhood calls (P11, P05, P06) went out **in one message, not one at a time** as the brief requires. All three are read-only, all returned 200 and nothing was changed. Every other call was sequential.
- **Rows written:** `data/snapshots/2026-11-24/comps.csv` already existed (copied forward by another agent; 16,844 data rows, identical in size to 23 Nov). Under `flock .comps.csv.lock` I appended **715 rows**: 135 kept, 543 wider, 37 `:ours`. No guest data and no booking references. The file now has 17,559 data rows, all with 11 fields. 99 of the new rows are `SEG*`.

## Overnight: edits and price moves (PriceLabs logs; prices.csv 23 Nov vs 24 Nov, open nights)
- **No new edit on P05, P06, P11, P14 or SEG since 23 Nov 00:17Z** (`get_user_logs` 23–24 Nov returns only the three edits already reported yesterday: SEG base 475 → 450, P06 2 Dec +25% min 1, P11 23–26 Nov min 2). So the 24 Nov 00:23–00:31Z refreshes of P05/P06/P11/SEG ran **without a preceding edit** (relevant to t-pl-push-1811, for the PriceLabs lane).
- **P05:** −£596 over 28 nights.
  - The near gaps are almost flat: 29 Nov–2 Dec −£2 to −£5 a night; 7 Dec +£1; 13–14 Dec −£2.
  - **4–22 Jan fell £19–£25 every night** (e.g. 4 Jan £404 → £379), and 29 Dec £2,392 → £2,247.
  - Reyhan's 4–31 Jan −8% is already confirm-or-revert; this move came from the engine on top of it.
- **P06:** 2 Dec £349 → £363 (+4%). This is the only open night.
- **P11:** +£67 over 16 nights.
  - **30 Nov–4 Dec +£9 to +£12 a night** (avg £197.00 → £206.25), 25–26 Nov +£10, **8 Dec £233 → £245**.
  - Darts 14–18 Dec −£2 to −£5. 24 Dec −£12, 25 Dec +£13.
  - **3–4 Jan still unavailable with no status** (£151 / £163; no reservation), as yesterday.
- **P14:** −£144, all on 26 Dec–2 Jan (1 Jan £584 → £513, 28 Dec £614 → £576). Still £450 flat to 25 Dec.
- **SEG:** **25 Nov–9 Dec is now Blocked in PriceLabs, every night.** That is 11 newly blocked nights vs 23 Nov: 29 Nov–2 Dec, 4–7 Dec and 9 Dec (24–28 Nov, 3 and 8 Dec were already blocked).
  - Neither the PriceLabs log nor the Smoobu extract has a reservation behind it. Cause NOT CHECKED.
  - PriceLabs occupancy next 30 jumped **37% → 67%** (market 45%) because PriceLabs counts blocks.
  - Open nights moved −£37 net: 10–20 Dec +£5 to +£17; 26 Dec–4 Jan −£2 to −£19 (30–31 Dec £636 / £637 → £619 / £618).

## Summary

| Ref | Comps kept (n per stay) | Our pct vs kept, open stays | Rating ours vs kept median; review gap | Booked vs market, next 30 / 60 | Supported positioning |
|---|---|---|---|---|---|
| **P05 4BR** | 6 (0–5) | **P25–P40 (−19% to −1%)**; **13–17 Feb P40 / −10%** | **4.79 (39)** vs 4.50 (17); **+22 reviews** | **70.0% (21/30) vs 50%**; 51.7% (31/60) vs 39% (PriceLabs 70% / 52%) | `quality_premium` **+0.116** → **+12% vs median**. `recommend` → **raise +21.6%** at every open stay. Supported Smoobu room: about **£591 (29 Nov–3 Dec), £533–£628 (7–9 Dec), £556 (13–15 Dec), £538 (13–17 Feb)**. At minimum the median level: £523 / £464–£549 / £485 / £476. |
| **P06 2BR** | 12 (0–2) | Only open night 2–3 Dec: kept n = 0; **wider P52 / +0%** (n 25) | 4.58 (12) vs 4.64 (26); −14 reviews | 91.7% (11/12 non-blocked) vs 52%; PriceLabs 97% / 98% vs 52% / 39% | `quality_premium` −0.024 → **−2% vs median**. 2 Dec is £363 (card £427) against a supported room of about £350 (card £415): **hold** (within 4%). `recommend` says raise +10% on demand; for a single orphan night 8 days out it is optional. |
| **P11 2BR** | 12 (0–8) | **30 Nov–4 Dec P50 / −1%** (was P40 / −16%); **darts P14 / −23%**; **23–26 Dec P38 / −6%**; **8 Dec P100 / +32%**; 25–27 Nov P67 / +29% | Booking.com only vs Airbnb kept 4.685 (36.5): not comparable; gap NOT CHECKED | 50.0% (15/30) vs 50%; 57.5% (23/40 sellable) vs 37% (PriceLabs 68%) | `quality_premium` = 0 → **0% vs median on list all-in**. `recommend` → **hold** at P48–P100 and **raise +5%** at P14–P38. Median-level Smoobu room: **30 Nov–4 Dec £209–£212** (ours £206: hold); **darts £279–£319** (£238); **23–26 Dec £280–£308** (£288: hold to +7%); **8 Dec £142–£154** (£245). |
| **SEG 3BR** (reference) | 11 (0–4) | **12–15 Dec P50 / −13% kept (n 2), P75 / +6% wider (n 4)**; **NYE P0 / −34% kept (n 1), P25 / −18% wider (n 8)**; 29 Nov–2 Dec and 9–12 Dec **not sellable (Blocked)** | No rating or reviews on record vs 4.84 (26); −26 reviews (NOT CHECKED) | PriceLabs 67% / 40% vs 45% / 34% (inflated by the 25 Nov–9 Dec block); booked nights only 3/14 sellable next 30 | `quality_premium` = 0 → **up to the median, not above**. **12–15 Dec: hold** (room £417 sits between wider £394 and kept £480, before cleaning). **NYE: up to about £669 all-in** (room £551 now). |
| P08 2BR | not searched | n/a | – | handback 13 Nov | Moot (policy handback). |
| P14 1BR | 12 (0–7) | P96–P100 | not on Airbnb; kept median 4.885 (20.5) | 0% vs 48% / 34% | Numbers only (special setup): **+37% to +94% vs kept median, +22% to +102% vs wider.** |
| P17 1BR | 7 (0–4) | n/a | kept median 4.68 (53) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (same kept ids, repeated stays):**
- **P11:**
  - 30 Nov–4 Dec kept £314 → £278 (n 5 → 4): 1543632408013225027 −19% to £324, and 1675590787835266115 (£314) not returned. With our +5%, P40 → P50.
  - Darts £376 → £396 (n 6 → 7; 1675590787835266115 back at £396).
  - **23–26 Dec £367 → £404** (n 6 → 8): our P50 / +4% → P38 / −6%.
  - 23–25 Dec flat at £420. 8 Dec flat at £326 (n 2).
- **P05:**
  - 7–9 Dec £508 → £518 (1481043902711346984 +3%; 1639043256346803626 −4% to £406).
  - 13–15 Dec and 29 Nov–3 Dec flat (£469 / £449).
  - Valentine's flat at £467 (1639043256346803626 −5% to £805; 1481043902711346984 −3% to £536).
- **P06:** 23–25 Dec kept £390 → £436 (n 1 → 2; 1018722159796386217 £483). Wider £501 → £573.
- **SEG:**
  - 12–15 Dec kept £394 → £480, but on a different pair: 897028868119653426 (£394) not returned; 1165719843393058533 £577 added. Wider flat at £394 (n 7 → 4).
  - NYE kept 1548502477554034012 £881 → £835 (−5%). Wider £714 → £669 (n 8).
- **P14:** kept 7–9 Dec £302 → £246 (1688600915462932837 −6%; 1513597702759149270 back at £246); 14–16 Dec £302 → £290; 17–19 Dec £271 → £253; 23–25 Dec £325 → £316.
- **P17:** 7–9 Dec £232 → £228 (n 2 → 1), 14–16 Dec £203 → £200, 17–19 Dec flat at £225.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Gap (stay) | Smoobu room/night 24 Nov (23 Nov), min | Ours, Airbnb all-in/night | Kept median (n) | Pct / vs median | Wider 4BR ≤1.25 km (n) | +11.6% supported → Smoobu room; median-level |
|---|---|---|---|---|---|---|
| 29 Nov–2 Dec (29 Nov–3 Dec, min 3) | £503 / £489 / £484 / £490 = **£491.50** (£495.00) | £424.75 obs | £449 (3) | **P33 / −5%** | £449 (7): P29 / −5% | about **£591**; median-level **£523** |
| 1–2 Dec (Tue 1–Thu 3 Dec, midweek; min 3, so not bookable as 2n) | £484 / £490 = £487 | £470 derived (0.765 × room + £195 ÷ 2; own card not shown) | £509 (3) | P33 / −8% | £442 (9): P56 / +6% | (inside the 29 Nov–3 Dec gap) |
| **7–8 Dec** (7–9 Dec, min 2) | **£429 / £407 = £418** (£417.50) | £417.50 obs | **£518 (4)** | **P25 / −19%** | £453 (11): P27 / −8% | about **£628** (kept) / £533 (wider); median-level £549 / £464 |
| 13–14 Dec (13–15 Dec, min 2) | £483 / £477 = £480 (£482) | £465.00 obs | £469 (5) | P40 / −1% | £469 (10): P40 / −1% | about **£556**; median-level £485 |
| **13–16 Feb, Valentine's (13–17 Feb, 4n, min 4)** | PriceLabs Your Price **£438 / £410 / £419 / £421 = £422.00** (£417.25); uncustomized £498 / £435 / £455 / £462 (avg £462.50) | **£419.25 obs (£1,677 total)** | **£467 (5)** | **P40 / −10%** | £467 (11): P36 / −10% | about **£538**; median-level **£476** |

- **Valentine's (t-p05-valentine-2211):** open in PriceLabs (refreshed 24 Nov 00:30:42Z, no booking status) and on Airbnb.
  - Card £419.25 a night (factor 0.878 vs Your Price). Still −10% vs both kept and wider.
  - Kept: 1610095240357069208 £392, 1363636555926649515 £417, 1606112160333193293 £467, 1481043902711346984 £536, 1639043256346803626 £805.
  - Your Price is still about 9% under the engine's own uncustomized price (£422.00 vs £462.50).
  - Second day running at −10%: the position is stable, not improving.
- **7–9 Dec is still the weakest position (P25 / −19% vs kept).** Our room is unchanged (£418), while the kept median rose to £518.
- **13–15 Dec is at the median (P40 / −1%).** Quality still supports +12%.
- **29 Nov–3 Dec is unchanged at −5%** (our room −£3.50 a night overnight).
- Reyhan's 20 Nov edits are already confirm-or-revert; nothing new. The comp evidence still points up, not down. The engine took another £19–£25 a night off 4–22 Jan (not priced against comps today).
- 21 Dec (£2,194, 1n) and 29 Dec (£2,247, 1n) are DSO-driven orphans (open action a-p05-dec). Not raised as new.
- **Positioning:** `quality_premium(4.79, 4.50)` = +0.116. `recommend(0.70, 0.50, 0.25–0.40, 0.116)` → **raise +21.6%**. **Supported: +12% vs median.**
- **Differentiators:**
  - 912053248917940403 (4.97, Superhost, lift, park view; not returned for the 5th day) and 1639043256346803626 (4.90, 31 reviews, Superhost, terrace, parking) are the quality peers.
  - The cheap end (1610095240357069208 4.15, 1363636555926649515 3.93) rates well below us.
  - Ours: Abbey Road location. Parking and terrace NOT CHECKED.

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272)

| Open night | Smoobu room 24 Nov (23 Nov) | Our card (obs) | Kept median (n) | Wider median (n) | Pct / vs wider | Supported (−2.4%) | PriceLabs 2BR room (24 Nov) |
|---|---|---|---|---|---|---|---|
| **2–3 Dec (1n, min 1)** | **£363** (£349; +25% DSO from 23 Nov) | **£427** (factor 0.821 after £129 cleaning) | n = 0 | **£425 (25)** | **P52 / +0%** | card about £415 → room about **£350**; median-level £361 | P25 £320, P50 £414, P75 £531 |

- **Only one open night is left before the intentional block (6 Dec on).**
  - 24–29 Nov is the Airbnb stay booked 13 Nov; 29 Nov–2 Dec and 3–6 Dec sold on 22 Nov (yesterday's analysis, not repeated).
  - The 1–3 Dec midweek stay is not sellable (1 Dec booked).
- 2 Dec sits at the wider median, about 3–4% above the quality-supported level. **Hold.** The engine's +£14 overnight did not need an edit.
- **Positioning:** `quality_premium(4.58, 4.64)` = −0.024. `recommend(0.917, 0.52, 0.52, −0.024)` → raise +10%. That is demand-led, and optional for one night 8 days out.
- Christmas / 22–26 Dec are blocked (policy, intentional). They were priced for the trend only and are not raised.

## P11 Camden (3064196; Booking.com only)

| Open nights (stay priced) | Ours room avg 24 Nov (23 Nov) | List all-in ×1.15 (×1.10) | Kept median (n) | **Pct / vs kept** | Wider median (n); pct / vs wider | Median-level Smoobu room* kept / wider |
|---|---|---|---|---|---|---|
| 25–26 Nov (25–27 Nov, min 2) | £218.00 | £325.20 (£314.30) | £252 (3) | P67 / +29% | £274 (12); P67 / +18% | £155 / £174 |
| **30 Nov–3 Dec** (30 Nov–4 Dec, 4n, min 2) | **£206.25** (£197.00) | £274.44 (£264.12) | **£278 (4)** | **P50 / −1%** | £281 (25); P48 / −2% | **£209 / £212** |
| 1–2 Dec (Tue 1–Thu 3 Dec, midweek) | £199.50 | £303.92 (£293.95) | £340 (6) | P33 / −11% | £286 (38); P61 / +6% | £231 / £184 |
| **8 Dec** (8–9 Dec, 1n, min 1) | **£245** (£233) | £430.75 (£418.50) | £326 (2) | **P100 / +32%** | £312 (11); P82 / +38% | £154 / £142 |
| **14–18 Dec, darts** (14–19 Dec, 5n, min 2) | **£238.40** (£241.60) | £303.96 (£292.04) | **£396 (7)** | **P14 / −23%** | £351 (41); P32 / −14% | **£319 / £279** |
| 23–24 Dec (23–25 Dec) | £279.50 (£285.00) | £395.92 | £420 (8) | P38 / −6% | £398 (30); P50 / −1% | £300 / £282 |
| **23–25 Dec** (23–26 Dec, 3n, min 2) | **£287.67** (£287.00) | £380.48 (£366.10) | **£404 (8)** | **P38 / −6%** | £372 (43); P53 / +2% | **£308 / £280** |
| 24–25 Dec (Thu 24–Sat 26 Dec, 30-day default) | £286.00 | £403.40 | £438 (7) | P29 / −8% | £391 (36); P53 / +3% | £316 / £275 |
| 3–5 Jan | £151 / £163 (3–4 Jan) | – | – | **still not sellable** (no status, no reservation) | – | – |

\* Median-level Smoobu room = (median − £149 ÷ n) ÷ 1.15: the Smoobu rate whose Booking.com list plus cleaning equals the comp median, before stacked promotions (policy).

- **30 Nov–4 Dec is now at the median (P50 / −1% kept, P48 / −2% wider).** Our room rose 4.7% overnight and the kept median fell from £314 to £278. **Hold.** The median-level room is £209–£212 (ours £206).
- **Darts 14–19 Dec is the clear gap: −23% / −14%.** Our side fell again (£241.60 → £238.40) while the kept median rose (£376 → £396). Supported: **£279–£319 room** (+17% to +34%). The −2% DSO on 14–15 Dec is already with Corentin as confirm-or-revert (vs `darts_override_24oct`); no new proposal.
- **8 Dec:** the engine raised it £233 → £245, now +32% / +38% with a thin set (kept n 2). Supported about £142–£154 room. Open item t-p11-8dec-orphan (not new).
- **23–26 Dec:** back below the kept median (P38 / −6%) because the kept median rose to £404 (n 8). It is at the wider median (+2%). Hold, or up to about £308 (+7%).
- **25–26 Nov:** P67 / +29% with kept n 3; these are last-minute open nights after the 23 Nov min-stay DSO. Hold.
- **Positioning:** `quality_premium` = 0 (no Booking.com review data). `recommend(0.50, 0.50, pct, 0)` → **raise +5%** below P50 and **hold** at P50 and above. **Supported: comp median (0%) on list all-in.**
- **Differentiators:** basement with patio, no lift. 4 of 12 comps have a lift and 3 a balcony or terrace. 2557770 has 182 reviews; 654396087724294901 is a Superhost.

## SEG Scott Ellis Gardens 3-bed (PriceLabs 3588993; NW8; reference positioning only, not mapped)

| Stay | PriceLabs room/night 24 Nov (23 Nov) | Status | Kept median (n) | Pct / vs kept | Wider 3BR ≤1.0 km (n) | Pct / vs wider | Supported |
|---|---|---|---|---|---|---|---|
| 29 Nov–1 Dec (29 Nov–2 Dec) | £479 / £449 / £427 = £451.67 (£325.67) | **Blocked (new since 23 Nov)** | £403 (4) | excluded | £376 (5) | excluded | not sellable |
| 9–11 Dec (9–12 Dec) | £439 / £402 / £457 = £432.67 | 9 Dec **Blocked (new)**, 10–11 Dec open (min 3) | £553 (3) | excluded | £388 (10) | excluded | not sellable as this stay; 10–11 Dec open but under min 3 without 9 Dec or 12 Dec |
| **12–14 Dec** (12–15 Dec) | £460 / £406 / £384 = **£416.67** (£410.00) | Open (min 3/2) | £480 (2) | **P50 / −13%** | £394 (4) | **P75 / +6%** | **hold**: between wider and kept medians on room alone |
| 23–24 Dec (23–25 Dec) | £447 / £450 | Booked (21–26 Dec stay) | £440 (3) | excluded | £452 (9) | excluded | – |
| 24–25 Dec (Thu 24–Sat 26 Dec) | £450 / £447 | Booked | £462 (2) | excluded | £498 (7) | excluded | – |
| **NYE 30 Dec–2 Jan** (30 Dec–3 Jan, 4n) | £619 / £618 / £502 / £466 = **£551.25** (£563.00) | Open (min 4/3) | £835 (1) | P0 / −34% | **£669 (8)** | **P25 / −18%** | **up to about £669 all-in** (less cleaning ÷ 4) |

- **Block:** PriceLabs shows **every night 25 Nov–9 Dec Blocked** (yesterday 29 Nov–2 Dec, 4–7 Dec and 9 Dec were open).
  - There is no PriceLabs log entry and the listing is not in Smoobu, so who blocked it and why is NOT CHECKED.
  - It removes the two near stays the brief asked about (29 Nov–2 Dec, 9–12 Dec). The comps were still priced for the trend.
  - PriceLabs occupancy next 30 reads 67% vs market 45%, but only 3 of the 14 non-blocked nights in the next 30 (24 Nov–23 Dec) are booked (21–23 Dec, part of the 21–26 Dec stay). Do not read 67% as demand.
- **PriceLabs 3BR (24 Nov, room):** P25 £317, P50 £383, P75 £473, P90 £625 (n 147). The market surges 27–31 Dec (+31.4% price; +23.3% occupancy 27 Dec–1 Jan). Our NYE room (£551) sits between the 3BR P75 and P90.
- **First reservation 21–26 Dec** (paid ADR £296.35, booked 22 Nov) is unchanged. It was analysed yesterday; not repeated.
- **Base 450:** no base change since 23 Nov 00:17Z. 12–15 Dec stays at the median band; NYE is still −18% vs wider (n 8).
- **Positioning:** with no rating or review count on record, `quality_premium` = 0 and nothing supports a premium.
  - `recommend` on PriceLabs occupancy (0.67 vs 0.45) → raise +5% to +10%. On booked-only occupancy (3/14 vs 0.45) → fix-listing.
  - Neither reading is reliable while the block distorts PriceLabs occupancy. **Supported: up to the comp median, not above.**
- **Differentiators:** 3 bed / **2 bath** (bath counts for comps NOT CHECKED; only 1548502477554034012 states 2 baths). Standouts: 6620546 (315 reviews, 4.92, garden), 52560423 (377 reviews, 4.90), 1633989864851131941 (cinema room, garden, 0.35 km; not returned for the 2nd day), 1269544547244432855 (A/C, rooftop). 7 of the 11 are Superhosts or Guest favourites.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- **Smoobu 24 Nov:** £450 every night to 25 Dec (min 3–4). 26 Dec–2 Jan £466–£639, −£144 overnight (1 Jan £584 → £513).
- **Booked:** 0% next 30 / 60 vs market 48% / 34% (pl_kpis). No P14 reservation in that window.
- **PriceLabs refresh:** listing_data 23 Nov 07:03Z; prices file 24 Nov 06:57Z (Dispatcher pull notes).
- **Vs kept median, P100 on every stay:** 1–3 Dec +94% (n 3), 7–9 Dec +83% (5), 14–16 Dec +55% (7), 17–19 Dec +78% (5), 23–25 Dec +42% (7), 24–26 Dec +37% (7). 27–29 Nov kept n = 0, wider +22% (2).
- PriceLabs 1BR band for reference (P11 neighbourhood, Camden): P50 £173, P90 £258. P14 own neighbourhood was not pulled.
- Numbers only. The PriceLabs minimum of 450 (vs £500 in policy) is already confirm-or-revert; not re-raised.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)
- **Kept medians:** 1–3 Dec £228 (1); 7–9 Dec £228 (1); 14–16 Dec £200 (3); 17–19 Dec £225 (4); 23–25 Dec £222 (1); 24–26 Dec £233 (1); 27–29 Nov n = 0. Rating median 4.68 (53).
- 975294297333089697 has not been returned for **12 days** (page HTTP 200; calendar NOT CHECKED). It is first in line for replacement once its calendar is shown closed.

## P08 Islington: handback
- Policy last night 13 Nov. Not searched; no rows written.

## Comp tables

**Source for every comp row:**
- Airbnb public search (airbnb.co.uk), checked 2026-11-24 07:20:40–07:26:58Z.
- Nightly = total ÷ nights, after offers, cleaning included, taxes excluded.
- Rating (reviews) and sleeps come from each listing page (07:20–07:22Z). Dist km is from 17 Nov (SEG: from the PriceLabs pin, 22 Nov).
- (±%) = change vs 23 Nov for the same stay; "n/a" = not returned (booked or min stay).
- "Ours" rows come from the 24 Nov snapshot (P05 Feb from PriceLabs `get_listing_prices` 24 Nov).
- "excluded (not open)" = at least one night of the stay is booked or blocked.
- Every priced row is in `data/snapshots/2026-11-24/comps.csv`.

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) 24 Nov | Wed 25 Nov–Fri 27 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 30 Nov–Fri 4 Dec (4n) | Tue 1 Dec–Thu 3 Dec (2n) | Tue 8 Dec–Wed 9 Dec (1n) | Mon 14 Dec–Sat 19 Dec (5n) | Wed 23 Dec–Fri 25 Dec (2n) | Wed 23 Dec–Sat 26 Dec (3n) | Thu 24 Dec–Sat 26 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.71 (31) | £408 | n/a | £404 | £440 | n/a | £442 | £586 | £555 | £570 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.73 (182) | n/a | n/a | n/a | n/a | £400 | £351 | £402 | £392 | £418 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | n/a | £324 (-19%) | £360 | n/a | £407 | £550 | £520 | £534 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | £252 | n/a | n/a | £338 | n/a | n/a (was £400) | £438 | £417 | £438 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.5 (14) | n/a | n/a | n/a | £342 | n/a | £407 | n/a | n/a | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.71 (14) | n/a | n/a | n/a (was £314) | n/a | n/a | £396 | £508 | £519 | £568 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a | n/a | £231 | n/a | n/a | £325 | £362 | £342 | £362 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.39 (66) | £174 | n/a | n/a | £241 | £253 | £262 | £311 | £307 | £311 | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.73 (88) | n/a | n/a | £202 | £210 | n/a | n/a | n/a | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (74) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.56 (39) | n/a | n/a | n/a | n/a | n/a | n/a | £349 | £339 | n/a | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Kept median (n)** | | | | £252 (3) | – (0) | £278 (4) | £340 (6) | £326 (2) | £396 (7) | £420 (8) | £404 (8) | £438 (7) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £274 (12) | £270 (3) | £281 (25) | £286 (38) | £312 (11) | £351 (41) | £398 (30) | £372 (43) | £391 (36) | |
| **Ours, room/night (status, min)** | | | | £218 Open, min 2 | £268 Booked, min 2 | £206 Open, min 2 | £200 Open, min 2 | £245 Open, min 1 | £238 Open, min 2 | £280 Open, min 2 | £288 Open, min 2 | £286 Open, min 2 | |
| **Ours, comparable basis** | | | | £325 | £383 | £274 | £304 | £431 | £304 | £396 | £380 | £403 | list = Smoobu ×1.15 (policy) + £149/n |
| **Our pct / vs kept median** | | | | P67 / +29% | excluded (not open) | P50 / -1% | P33 / -11% | P100 / +32% | P14 / -23% | P38 / -6% | P38 / -6% | P29 / -8% | |
| Our pct / vs wider median | | | | P67 / +18% | excluded (not open) | P48 / -2% | P61 / +6% | P82 / +38% | P32 / -14% | P50 / -1% | P53 / +2% | P53 / +3% | |

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) 24 Nov | Fri 27 Nov–Sun 29 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Tue 1 Dec–Thu 3 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Wed 23 Dec–Fri 25 Dec (2n) | Thu 24 Dec–Sat 26 Dec (2n) | Sat 13 Feb–Wed 17 Feb (4n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.15 (13) | n/a | £449 | £509 | £453 | £469 | n/a | n/a | £392 | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | n/a | £552 | £748 | £1,020 | £1,020 | n/a | n/a | £467 | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (30) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | n/a | £391 (+4%) | £418 | n/a | £443 (-3%) | £580 (-1%) | £571 | £417 (-1%) | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.9 (31) | n/a | n/a | n/a | £406 (-4%) | £406 (-4%) | n/a | n/a | £805 (-5%) | Superhost, parking listed, balcony/patio/terrace (house) |
| [1481043902711346984](https://www.airbnb.co.uk/rooms/1481043902711346984) | 1.16 | 8 | 4.76 (17) | n/a | n/a | n/a | £583 (+3%) | £581 (-1%) | n/a | n/a | £536 (-3%) | added 18 Nov |
| **Kept median (n)** | | | | – (0) | £449 (3) | £509 (3) | £518 (4) | £469 (5) | £580 (1) | £571 (1) | £467 (5) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £1,048 (1) | £449 (7) | £442 (9) | £453 (11) | £469 (10) | £766 (2) | £774 (2) | £467 (11) | |
| **Ours, room/night (status, min)** | | | | £574 Booked, min 4 | £492 Open, min 3 | £487 Open, min 3 | £418 Open, min 2 | £480 Open, min 2 | £656 Booked, min 3 | £616 Booked, min 3 | £422 Open, min 4 | |
| **Ours, comparable basis** | | | | £537 | £425 obs | £470 | £418 obs | £465 obs | £688 | £651 | £419 obs | obs = own Airbnb card in same search; else 0.765/0.900 × Smoobu + £195/n |
| **Our pct / vs kept median** | | | | excluded (not open) | P33 / -5% | P33 / -8% | P25 / -19% | P40 / -1% | excluded (not open) | excluded (not open) | P40 / -10% | |
| Our pct / vs wider median | | | | excluded (not open) | P29 / -5% | P56 / +6% | P27 / -8% | P40 / -1% | excluded (not open) | excluded (not open) | P36 / -10% | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) 24 Nov | Fri 27 Nov–Sun 29 Nov (2n) | Tue 1 Dec–Thu 3 Dec (2n) | Wed 2 Dec–Thu 3 Dec (1n) | Wed 23 Dec–Fri 25 Dec (2n) | Thu 24 Dec–Sat 26 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.64 (14) | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.72 (25) | n/a | £296 | n/a | £390 | £390 | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | £369 | n/a | n/a | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | n/a | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (54) | n/a | n/a | n/a | n/a | n/a | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.6 (25) | n/a | n/a | n/a | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | n/a | n/a | £483 | n/a | parking listed |
| **Kept median (n)** | | | | – (0) | £332 (2) | – (0) | £436 (2) | £390 (1) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £1,954 (6) | £384 (49) | £425 (25) | £573 (38) | £706 (40) | |
| **Ours, room/night (status, min)** | | | | £428 Booked, min 3 | £348 Booked/Open, min 1/3 | £363 Open, min 1 | £429 Blocked, min 3 | £454 Blocked, min 3/4 | |
| **Ours, comparable basis** | | | | £420 | £354 | £427 obs | £451 | £474 | obs = own Airbnb card; else 0.83/0.900 × Smoobu + £129/n |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | n = 0 | excluded (not open) | excluded (not open) | |
| Our pct / vs wider median | | | | excluded (not open) | excluded (not open) | P52 / +0% | excluded (not open) | excluded (not open) | |

### SEG

| Airbnb id | Dist km | Sleeps | Rating (reviews) 24 Nov | Fri 27 Nov–Sun 29 Nov (2n) | Sun 29 Nov–Wed 2 Dec (3n) | Tue 1 Dec–Thu 3 Dec (2n) | Wed 9 Dec–Sat 12 Dec (3n) | Sat 12 Dec–Tue 15 Dec (3n) | Wed 23 Dec–Fri 25 Dec (2n) | Thu 24 Dec–Sat 26 Dec (2n) | Wed 30 Dec–Sun 3 Jan (4n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1633989864851131941](https://www.airbnb.co.uk/rooms/1633989864851131941) | 0.35 | 6 | 4.88 (43) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | cinema room, garden, Guest favourite |
| [1498503422089605343](https://www.airbnb.co.uk/rooms/1498503422089605343) | 0.43 | 7 | 4.84 (25) | n/a | £309 | £347 | £366 | £383 | £440 | £498 | n/a | ground floor, refurbished (title), Superhost |
| [6620546](https://www.airbnb.co.uk/rooms/6620546) | 0.62 | 6 | 4.92 (315) | n/a | £376 | n/a | n/a | n/a | n/a | n/a | n/a | 4-acre garden, Guest favourite, Superhost |
| [1548502477554034012](https://www.airbnb.co.uk/rooms/1548502477554034012) | 0.62 | 6 | 4.91 (32) | n/a | n/a | n/a | n/a | n/a | £658 (+6%) | n/a | £835 (-5%) | 2 bath, A/C, Guest favourite (title says sleeps 8; page capacity 6), Superhost |
| [11056472](https://www.airbnb.co.uk/rooms/11056472) | 0.72 | 6 | 4.26 (23) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Marylebone (title) |
| [1648663792586887168](https://www.airbnb.co.uk/rooms/1648663792586887168) | 0.76 | 6 | 4.86 (14) | n/a | n/a | n/a | n/a | n/a | £400 | £425 | n/a | none in title, Superhost |
| [52560423](https://www.airbnb.co.uk/rooms/52560423) | 0.8 | 6 | 4.9 (377) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite, Superhost |
| [1165719843393058533](https://www.airbnb.co.uk/rooms/1165719843393058533) | 0.82 | 6 | 4.79 (24) | n/a | n/a | n/a | £576 | £577 | n/a | n/a | n/a | Little Venice (title), Superhost |
| [897028868119653426](https://www.airbnb.co.uk/rooms/897028868119653426) | 0.87 | 6 | 4.64 (22) | n/a | n/a | n/a | n/a | n/a (was £394) | n/a | n/a | n/a | family home near Little Venice (title) |
| [1269544547244432855](https://www.airbnb.co.uk/rooms/1269544547244432855) | 0.89 | 6 | 4.7 (61) | n/a | £431 | £496 | n/a | n/a | n/a | n/a | n/a | A/C, rooftop (title) |
| [1064528274936916938](https://www.airbnb.co.uk/rooms/1064528274936916938) | 0.91 | 6 | 4.81 (26) | n/a | £460 | £584 | £553 | n/a | n/a | n/a | n/a | by Paddington station (title) |
| **Kept median (n)** | | | | – (0) | £403 (4) | £496 (3) | £553 (3) | £480 (2) | £440 (3) | £462 (2) | £835 (1) | |
| Wider: same bedrooms, rated, ≤1.0 km (n) | | | | – (0) | £376 (5) | £377 (6) | £388 (10) | £394 (4) | £452 (9) | £498 (7) | £669 (8) | |
| **Ours, room/night (status, min)** | | | | £573 Blocked, min 4 | £452 Blocked, min 2/3 | £435 Blocked, min 2 | £433 Blocked/Open, min 3 | £417 Open, min 2/3 | £448 Booked, min 3 | £448 Booked, min 3/4 | £551 Open, min 3/4 | |
| **Ours, comparable basis** | | | | £573 | £452 | £435 | £433 | £417 | £448 | £448 | £551 | PriceLabs room (not in Smoobu); cleaning NOT CHECKED, not added |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | excluded (not open) | excluded (not open) | P50 / -13% | excluded (not open) | excluded (not open) | P0 / -34% | |
| Our pct / vs wider median | | | | excluded (not open) | excluded (not open) | excluded (not open) | excluded (not open) | P75 / +6% | excluded (not open) | excluded (not open) | P25 / -18% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) 24 Nov | Fri 27 Nov–Sun 29 Nov (2n) | Tue 1 Dec–Thu 3 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Wed 23 Dec–Fri 25 Dec (2n) | Thu 24 Dec–Sat 26 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | £202 | n/a | £252 | £252 | £302 | £302 | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | n/a (was £352) | £352 | £352 | n/a (was £352) | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | n/a | £246 | £246 | £253 | £334 | £334 | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | £232 | £302 | £302 | £302 | £302 | £328 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | £232 | £302 | £302 | n/a | n/a | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 4.92 (13) | n/a | n/a | n/a | £290 | n/a (was £290) | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.71 (28) | n/a | n/a | n/a | n/a | n/a | £402 | £402 | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (21) | n/a | n/a | £219 (-6%) | n/a | n/a | £236 (-1%) | £236 | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a | £350 | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | n/a | £241 | £241 | £241 | £316 | £324 | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Kept median (n)** | | | | – (0) | £232 (3) | £246 (5) | £290 (7) | £253 (5) | £316 (7) | £328 (7) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £368 (2) | £222 (14) | £294 (20) | £252 (31) | £286 (24) | £305 (22) | £328 (23) | |
| **Ours, room/night (status, min)** | | | | £450 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3/4 | £450 Open, min 3 | £450 Open, min 3/4 | |
| **Ours, comparable basis** | | | | £450 | £450 | £450 | £450 | £450 | £450 | £450 | Smoobu room |
| **Our pct / vs kept median** | | | | n = 0 | P100 / +94% | P100 / +83% | P100 / +55% | P100 / +78% | P100 / +42% | P100 / +37% | |
| Our pct / vs wider median | | | | P100 / +22% | P100 / +102% | P100 / +53% | P100 / +78% | P100 / +57% | P100 / +48% | P96 / +37% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) 24 Nov | Fri 27 Nov–Sun 29 Nov (2n) | Tue 1 Dec–Thu 3 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Wed 23 Dec–Fri 25 Dec (2n) | Thu 24 Dec–Sat 26 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.5 (18) | n/a | n/a | n/a | n/a (was £192) | £199 | n/a | n/a | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (53) | n/a | n/a | n/a | £252 | £293 | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | n/a (was £236) | £198 (-1%) | £212 | £222 | £233 | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.68 (63) | n/a | n/a | n/a | £200 (-3%) | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.43 (170) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.76 (29) | n/a | £228 | £228 | n/a | £237 | n/a | n/a | none listed |
| **Kept median (n)** | | | | – (0) | £228 (1) | £228 (1) | £200 (3) | £225 (4) | £222 (1) | £233 (1) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | – (0) | £228 (3) | £228 (5) | £200 (6) | £212 (9) | £225 (6) | £256 (10) | |
| Ours | | | | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | |

Data gaps:
- **Booking.com live prices: NOT CHECKED** (AWS WAF; not attempted, not bypassed). P11 is compared at list price (Smoobu × 1.15 per policy, × 1.10 shown alongside) + £149 ÷ n, not at the promoted price a guest sees.
- **P11:**
  - Booking.com review count is not in `listings.csv`, so the review gap is NOT CHECKED and `quality_premium` = 0 by construction.
  - **3–4 Jan is still unavailable with no status and no reservation**; cause NOT CHECKED (for the occupancy/PriceLabs lane, t-p11-block2029-2311).
- **SEG:**
  - **New PriceLabs block 25 Nov–9 Dec** (11 nights newly blocked since 23 Nov). Cause, and whether a booking sits behind it, NOT CHECKED: the listing is not in Smoobu and there is no PriceLabs log entry.
  - Not in `id_map`/`policy`. Cleaning fee, OTA listing id, rating and reviews: NOT CHECKED. Room-only figures are compared with all-in comps.
  - 12–15 Dec kept n = 2; NYE kept n = 1 (rests on wider n = 8, not review-filtered).
- **P06:** only one open night (2 Dec) to compare; kept n = 0, so it rests on wider n = 25. The cause of the 0.60–0.74× gap on the two stays sold 22 Nov is still NOT CHECKED (channel lane; not re-analysed).
- **Comp activity:** 20 kept ids were not returned on any stay today (11 outside P06, plus 9 of 12 P06 comps) (P17 975294297333089697 for 12 days, P05 912053248917940403 for 5). All pages are HTTP 200; calendars NOT CHECKED, so none was replaced.
- **Thin samples:** P05 n = 0–5 with £1,020 / £805 outliers inside; P06 kept n = 0–2; P11 25–27 Nov n = 3 and 8 Dec n = 2; SEG kept n = 0–4; P14 27–29 Nov n = 0; P17 n = 0–4.
- **Wider set** is not filtered to at least 10 reviews. Whether Airbnb comp prices include VAT: NOT CHECKED.
- **PriceLabs percentiles** are Nearby Listings summary-table room prices for an unspecified window, not the same dates (24 Nov):
  - P05 4BR 457 / 578 / 704 / 1,221 (n 91)
  - P06 2BR 320 / 414 / 531 / 667 (n 215)
  - P11 2BR 233 / 294 / 332 / 392 (n 172)
  - SEG 3BR 317 / 383 / 473 / 625 (n 147)
  - P14 was not pulled. `market.csv` belongs to the market agent; nothing written to it.
- **Process:** three `get_neighbourhood_data` calls (P11, P05, P06) were sent in one message instead of strictly one at a time. They were read-only and all returned 200.
- **P17** is not in PriceLabs or Smoobu. **P08** is a handback and was not searched.
