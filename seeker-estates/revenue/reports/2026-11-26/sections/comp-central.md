# Competitor positioning: CENTRAL/NORTH (D = 2026-11-26)

**Method**
- **Policy read first** (`data/policy.json`). Not raised again: the P06 intentional blocks, the P14 special setup (numbers only), the Booking.com Visibility Booster, promotion stacking, the 15%/20% stay discounts, the Booking.com +15% markup (18 Nov) with derived rate plans, and the P08 handback (last night 13 Nov).
- **Comp ids: the same 60 as yesterday** (P05 6, P06 12, P11 12, P14 12, P17 7, SEG 11). **None replaced, none added.**
  - All 60 comp pages and our 2 Airbnb pages returned **HTTP 200** (checked 2026-11-26 07:23:18–07:25:16Z). Every kept comp still has at least 12 reviews.
  - Changes overnight: P11 1542815721953379556 went from 4.71 (31) to **4.63 (32)**. SEG 1648663792586887168 now shows capacity 5 (was 6; still within ±1). **P05 (ours) 4.79 (39); P06 (ours) 4.58 (12)**, both unchanged.
  - **Not returned on any stay today:**
    - P17: 975294297333089697 (**14th day**), 1242000869201075198 (6th)
    - P05: 912053248917940403 (**7th day**)
    - P11: 654396087724294901 and 1515051936255130803
    - P14: 1075245497252121738, 1459390808864489268, 1435253477626754812, 1659680062193836633, 1595613237427991150
    - SEG: 1633989864851131941, 6620546, 11056472, 52560423, 897028868119653426, 1648663792586887168 (1st day)
    - P06: 4 of 12
  - The pages are live. I did not retry the public calendar read that the permission check refused on 25 Nov, so "bookable in the next 60 days" is **NOT CHECKED** and no comp was replaced.
- **Searches:** 42 public Airbnb map searches (airbnb.co.uk, 317 result pages, 4,027 cards), **checked 2026-11-26 07:23:20–07:29:47Z**. No parse failure and no bot challenge.
  - Same boxes, filters and search parameters as yesterday.
  - "Wider" means the same bedroom count, rated, within 1.25 km (SEG 1.0 km). It is **not filtered to at least 10 reviews**.
- **Stays priced for every comp and for us:**
  - Default stays: Fri 27–Sun 29 Nov (next Fri–Sun), Tue 1–Thu 3 Dec (midweek), and Fri 25–Sun 27 Dec. The 25–27 Dec stay contains 26 Dec (D+30) and is kept for the trend.
  - P11: **26–27 Nov (1n, tonight; same-day proxy for the sold 25–27 Nov, because a past check-in cannot be searched)**, 30 Nov–4 Dec, 8–9 Dec, darts 14–19 Dec, 23–26 Dec.
  - P05: 29 Nov–3 Dec, 7–9 Dec, 13–15 Dec, 13–17 Feb.
  - P06: 2–3 Dec, plus **6–9, 9–12 and 6–12 Dec (new: reopened)**.
  - SEG: 10–13, 12–15 and 16–20 Dec, 26–30 Dec, and 30 Dec–3 Jan (now sold).
  - P14 and P17: 7–9, 14–16 and 17–19 Dec.
- **Our prices:** from `data/snapshots/2026-11-26/prices.csv`, where Smoobu matches PriceLabs on every central night. Booked/open status comes from Smoobu `reservations.csv`. SEG prices come from PriceLabs `raw/prices_3588993.json`. P05 13–17 Feb comes from PriceLabs `get_listing_prices` today.
- **Price basis:**
  - Comps: Airbnb total ÷ nights, after offers, cleaning included, taxes excluded.
  - P05 and P06: our own Airbnb card in the same search ("obs").
  - P11: list all-in = Smoobu × 1.15 + £149 ÷ n. Booking.com live prices are NOT CHECKED (AWS WAF; not attempted).
  - SEG: PriceLabs room only (cleaning NOT CHECKED).
  - P14: Smoobu room.
- **PriceLabs (read-only, 10 calls):**
  - Calls: `get_user_logs` (listing, 25–26 Nov); `get_listing_date_overrides` for P11, P06 and P05; `get_listing_prices` for P05 12–17 Feb; `get_neighbourhood_data` for P06, P11, P05, SEG and P14.
  - **Protocol breach: the 5 `get_neighbourhood_data` calls went out together in one message, not one at a time.** All 5 were read-only and all returned 200. The other 5 calls were sequential. No write tool was used and no sync was triggered.
- **Rows written:** `data/snapshots/2026-11-26/comps.csv` already existed (copied forward by another agent: 22,415 data rows, identical in size to 25 Nov). Under `flock .comps.csv.lock` I appended **656 rows**:
  - 103 kept, 516 wider and 35 `:ours` rows, plus 2 **as-sold** `:ours` reference rows (P11 25–27 Nov, SEG 30 Dec–3 Jan).
  - 47 of the rows are `SEG*`.
  - The file now has 23,071 data rows, all 11 fields. No guest data and no booking references.

## Overnight: edits and price moves
**Listing log 25–26 Nov (`get_user_logs`): 3 entries, all by Reyhan.**

| Listing | Edit (UTC) | Effect on our price (prices.csv 25 → 26 Nov) |
|---|---|---|
| **P11** 3064196 (+ Vrbo child) | 25 Nov 10:41:42: DSO **23–25 Dec**, percent type, min 2. Overrides today show **min-stay only, no %** on 23–25 Dec, so a % override was removed. | 23/24/25 Dec **£291/£267/£304 → £278/£256/£265** (−£63 over 3 nights; stay average £287.33 → £266.33, −7.3%). |
| P04 3562176 | 25 Nov 17:02:02: DSO 6–26 Dec, fixed, min 3 | East lane (passed on). Explains the P04 17:02Z refresh. |

- **No listing edit on P05, P06, SEG or P14.** Their 26 Nov 06:48–06:50Z refreshes were not caused by a listing-level edit. Group and account logs were not pulled (PriceLabs lane).
- **P11, 27 Nov–8 Dec, is an engine move, not an edit.** Uncustomized prices rose (30 Nov £192 → £211; 8 Dec £208 → £263). Smoobu rose +£26 to +£61 a night: 30 Nov–4 Dec average **£210.50 → £239.25 (+13.7%)**, and **8 Dec £245 → £306** (the +50% DSO sits on the higher base). Prices file refreshed 26 Nov 06:59:42Z.
- **P05: Reyhan's 24 Nov −8% DSO on 29 Nov–2 Dec is still set** (overrides today: −8%, min 3, updated 24 Nov 10:50:38Z). It has not been reverted, and the confirm-or-revert to Corentin stands. **The Feb −5% DSO (1–28 Feb) is also still set.**
- **P06 dropped on every night.** 2 Dec went **£363 → £317** (−13%), although the +25% DSO is still set: uncustomized £298, `user_price` £348. Why the full +25% is not applied is NOT CHECKED (possibly a min/max or engine interaction).
  - **6–12 Dec is now available in PriceLabs and on Airbnb** (`available` True; our Airbnb card is returned for 6–9, 9–12 and 6–12 Dec). Overrides there are min-stay 3 only (Reyhan, 24 Nov 13:14:35Z).
  - Rooms on 6–12 Dec are £361/£328/£329/£338/£310/£360/£312, against £384/£364/£332/£340/£396/£447/£434 yesterday (while still unavailable).
- **SEG 30 Dec–3 Jan is now Booked in PriceLabs:** `booked_date` 24 Nov, ADR **£373.07** a night. This answers t-pl-push-1811 for SEG: the stay is **no longer shown open.**
  - SEG 10–11 Dec fell £402/£457 → £337/£385. 26–29 Dec rose £490/£503/£591/£623 → £527/£510/£634/£652.
  - The 26 Nov–9 Dec block is unchanged, and those nights were repriced down £130–£170.
- **P14:** −£123 over 8 nights (26 Dec–2 Jan, engine). No edit.

## Summary

| Ref | Comps kept (n per stay) | Our pct vs kept, open stays | Rating ours vs kept median; review gap | Booked vs market, next 30 / 60 | Supported positioning |
|---|---|---|---|---|---|
| **P05 4BR** | 6 (0–5) | **7–9 Dec P25 / −20%** (wider −8%); 13–15 Dec P40 / −2%; 29 Nov–3 Dec P67 / +2% kept, **P33 / −6% wider**; 1–3 Dec P33 / −1%; **13–17 Feb P40 / −11%** (wider −7%) | **4.79 (39)** vs 4.50 (17); **+22 reviews** | **70.0% (21/30) vs 50%**; 48.3% (29/60) vs 38% (PriceLabs 70% / 48%) | `quality_premium` **+0.116, so +12% vs median**. `recommend` → **raise +21.6%** at every open stay (booked +20 pts vs market, priced P25–P67). Supported Smoobu room: **29 Nov–3 Dec £527–£577** (now £476), **7–9 Dec £533–£627** (now £417), **13–15 Dec £557** (now £472.50), **13–17 Feb £512–£536** (now £418). Median-level room: £466–£511 / £465–£549 / £486 / £453–£474. |
| **P06 2BR** | 12 (0–4) | 2–3 Dec: kept n = 0; wider P35 / −20% raw, **−3% vs trimmed** (£404, n 17). **6–9 Dec P50 / −3% kept (n 4), −18% vs trimmed wider** (£392, n 29). **9–12 Dec P0 / −42% kept (n 4), −42% vs trimmed** (£548, n 42). 6–12 Dec −42% trimmed | 4.58 (12) vs 4.64 (26); −14 reviews | Smoobu 52.9% (9/17 sellable, 6–12 Dec now counted) vs 52%; PriceLabs 73% / 87% vs 52% / 39% | `quality_premium` −0.024, so **−2% vs median**. **2 Dec: hold** (at the trimmed median). **6–12 Dec**, *if Corentin keeps it open* (policy: P06 blocks intentional, t-p06-0612open-2511): `recommend` → **raise +10%** (PriceLabs occupancy). Evidence supports up to the median: **6–9 Dec room about £412** (now £339 average), **9–12 Dec about £596** (now £336 average). |
| **P11 2BR** | 12 (0–7) | **Sold 25–27 Nov at £140/n room: P0 / −27% vs tonight's wider all-in** (£294, n 7; £215 if cleaning on top) or −52% room-only. **Darts P29 / −21%** (wider −9%); **23–26 Dec P43 / −15%** (wider −2%); 30 Nov–4 Dec P50 / +12% (wider +18%); 1–3 Dec P80 / +44%; **8 Dec P100 / +98%** (n 1), wider P92 / +61% | Booking.com only vs Airbnb kept 4.655 (36.5): not comparable; gap NOT CHECKED | 53.3% (16/30) vs 50%; 63.2% (24/38 sellable) vs 37% (PriceLabs 50% / 70%) | `quality_premium` = 0, so **0% vs median on list all-in**. `recommend` → **raise +5%** on the darts (to about £255; median-level £271–£316) and on **23–26 Dec (to about £280, which is about the pre-edit £287; median-level £272–£319)**. **Hold** 30 Nov–4 Dec, 1–3 Dec and 8 Dec, which are now above the median after the engine rise (median-level room £197–£209 / £145–£182 / £90–£141). |
| **SEG 3BR** (reference) | 11 (0–3) | 10–13 Dec P50 / −18% kept (n 2), P50 / −8% wider (n 4); 12–15 Dec P50 / −9%, P60 / +2%; **16–20 Dec kept n 0, P33 / −12% wider (n 6)**; **26–30 Dec P0 / −27% (n 1), P33 / −26% wider (n 6)**; **NYE sold at ADR £373 = −51% vs wider £756 (n 7)** | No rating or reviews on record vs 4.84 (26); gap NOT CHECKED | PriceLabs 67% / 45% vs 44% / 33% (inflated by the 26 Nov–9 Dec block); 5/16 sellable booked next 30 | `quality_premium` = 0, so **up to the median, not above**. **26–30 Dec: up to about £790 all-in** (room £581 now). **16–20 Dec: up to about £516 all-in** (room £453; thin). 10–15 Dec: **hold** (room-only already at −8% to +2% vs wider before cleaning). |
| P08 2BR | not searched | n/a | – | handback 13 Nov | Moot (policy handback). |
| P14 1BR | 12 (0–6) | P100 on every kept stay | not on Airbnb; kept median 4.885 (20.5) | 0% vs 47% / 33% | Numbers only (special setup): **+31% to +94% vs kept median, +13% to +100% vs wider**. PriceLabs 1BR P50 £191, P90 £271 (n 172). |
| P17 1BR | 7 (0–4) | n/a | kept median 4.68 (53) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (same kept ids, same stays):**
- **P11:**
  - 30 Nov–4 Dec: kept £324 (n 3) → **£278 (n 4)**, because 1090528454481682946 (£202) was returned again. With our +13.7% room rise this moved us **P33 / −14% → P50 / +12%**.
  - 23–26 Dec: kept £382 (n 8) → **£417 (n 7)**, because 1480693526878012391 (£342) was not returned. With Reyhan's −7.3% this moved us **P50 / −1% → P43 / −15%** (wider P57 / +4% → P46 / −2%).
  - Darts: kept £398 → £393 (n 7, 1263490105174331990 £262 returned). We are flat at P29 / −21%.
  - 1–3 Dec: kept £262 → £241.
- **P05:**
  - Comps are flat except 1363636555926649515 (−1% to −8%).
  - 29 Nov–3 Dec wider £430 → £440 (−4% → −6%).
  - 7–9 Dec is at P25 / −20% for the **3rd day**; Valentine's is at P40 / −10% to −11% for the **4th day**.
- **P06 2 Dec:** our card £427 → £392 with the room cut. Trimmed wider is flat at £404, so we moved **+6% → −3%**.
- **SEG:**
  - 16–20 Dec: wider £425 (n 7) → £516 (n 6) and kept n 1 → 0, so we moved **+7% → −12%**. The stay room is flat (£456 → £453).
  - 26–30 Dec: wider £679 → **£790** (n 6) while our room rose +5%, so we are still −26%.
  - 10–13 Dec: room −10%, from +3% to −8% vs wider.
- **P14:** kept 7–9 Dec £246 → £302 (n 5 → 3); 14–16 Dec £302 → £278 (n 4 → 6); 25–27 Dec £334 → £344.
- **P17:** 1–3 Dec £198 → £212; 7–9 Dec £232 → £214; 17–19 Dec £208 → £234 (n 2); 25–27 Dec £224 → £206 (n 1).

## P11 Camden (3064196; Booking.com only)

| Open nights (stay priced) | Ours room avg 26 Nov (25 Nov) | List all-in ×1.15 (×1.10) | Kept median (n) | **Pct / vs kept** | Wider median (n); pct / vs wider | Median-level Smoobu room* kept / wider |
|---|---|---|---|---|---|---|
| **25–26 Nov, as sold** (Booking.com, made 25 Nov, 2n) | **£140.34 paid room** (Smoobu £207/£229 = £218 average) | £214.84 if £149 cleaning on top (NOT CHECKED) | n = 0 (26–27 Nov) | – | **£294 (7) for Thu 26–Fri 27 Nov (1n); P0 / −27%** (room-only −52%) | – |
| 30 Nov–3 Dec (30 Nov–4 Dec, 4n, min 2) | **£239.25** (£210.50) | £312.39 (£300.43) | £278 (4) | P50 / +12% | £264 (23); P70 / +18% | £209 / £197 |
| 1–2 Dec (Tue 1–Thu 3 Dec, midweek) | £236.00 (£203.50) | £345.90 (£334.10) | £241 (5) | P80 / +44% | £284 (34); P74 / +22% | £145 / £182 |
| **8 Dec** (8–9 Dec, 1n, min 1) | **£306** (£245; +50% DSO) | £500.90 (£485.60) | £253 (1) | P100 / +98% | £311 (12); **P92 / +61%** | £90 / £141 |
| **14–18 Dec, darts** (14–19 Dec, 5n, min 2) | **£243.00** (£243.40) | £309.25 (£297.10) | **£393 (7)** | **P29 / −21%** | £341 (43); P40 / −9% | **£316 / £271** |
| **23–25 Dec** (23–26 Dec, 3n, min 2) | **£266.33** (£287.33; Reyhan 25 Nov) | £355.95 (£342.63) | **£417 (7)** | **P43 / −15%** | £363 (39); P46 / −2% | **£319 / £272** |
| 25–26 Dec (Fri 25–Sun 27 Dec) | £279.50 | £395.92 | £438 (3) | excluded (26 Dec booked) | £468 (20) | – |

\* Median-level Smoobu room = (median − £149 ÷ n) ÷ 1.15: the Smoobu rate whose Booking.com list price plus cleaning equals the comp median, before stacked promotions (policy).

- **Sold 25–27 Nov at £140.34 a night room (£280.67 total).** That is **0.644× the Smoobu price** (£436 for the 2 nights), 0.560× list at ×1.15 and 0.585× at ×1.10.
  - Against tonight's Airbnb wider set (n 7, £270–£518, 1-night stays) it is the cheapest even with £149 cleaning added (P0 / −27%).
  - It was a same-day booking into a gap, so the low price filled a night that would otherwise have been empty. It is not evidence for the forward rate.
  - Commission **£77.34 = 27.6%** of the room. The Camden Visibility Booster (18%, 1 Nov–18 Dec) explains up to 18%; the remaining ~9.6 pts is above what policy explains. Per policy, **ask before assuming** (channel lane).
  - Which markup factor this booking supports cannot be told apart from promotion stacking: NOT CHECKED here (channel lane).
- **Darts 14–19 Dec is still the clearest gap: −21% kept / −9% wider, the same as yesterday.** Supported: **+5% to about £255** (rule step); median-level **£271–£316**.
- **23–26 Dec:** Reyhan's 25 Nov removal of a % override cut the stay 7.3%. Against kept comps (P43 / −15%) and wider (P46 / −2%), the evidence supports **putting it back (+5%, about £280)**. This goes to Corentin as **confirm or revert**.
- **30 Nov–4 Dec and 1–3 Dec are now above the median** after the engine rise (+12% to +44%). Our booked share is in line with the market (53% vs 50%), so `recommend` gives **hold**. The comp set gives no support for going higher.
- **8 Dec** (+50% DSO orphan, open item t-p11-8dec-orphan) is now **+61% vs wider** (n 12), up from +38%, because the engine raised the base under the DSO.
- **Positioning:** `quality_premium` = 0 (no Booking.com review data). `recommend(0.53, 0.50, pct, 0)` → raise +5% below P50 (darts, 23–26 Dec), hold at P50+. **Supported: the comp median (0%) on list all-in.**
- **Differentiators:** basement with patio, no lift. 4 of 12 comps have a lift and 3 have a balcony or terrace. 2557770 has 182 reviews; 654396087724294901 is a Superhost (not returned today).

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Gap (stay) | Smoobu room/night 26 Nov (25 Nov), min | Ours, Airbnb all-in/night | Kept median (n) | Pct / vs median | Wider 4BR ≤1.25 km (n) | +11.6% supported → Smoobu room; median-level |
|---|---|---|---|---|---|---|
| **29 Nov–2 Dec** (29 Nov–3 Dec, min 3) | £484 / £473 / £469 / £478 = **£476.00** (£476.25); **−8% DSO still set** | £413.00 obs | £405 (3) | P67 / +2% | **£440 (6): P33 / −6%** | **£527 (kept) / £577 (wider)**; median-level £466 / £511 |
| 1–2 Dec (Tue 1–Thu 3 Dec, midweek; inside the gap) | £469 / £478 = £473.50 | £460 derived | £465 (3) | P33 / −1% | £453 (8): P50 / +1% | (inside the 29 Nov–3 Dec gap) |
| **7–8 Dec** (7–9 Dec, min 2; −1% DSO) | £429 / £405 = **£417.00** (£417.50) | £416.50 obs | **£517 (4)** | **P25 / −20%** | £453 (11): P27 / −8% | **£627 (kept) / £533 (wider)**; median-level £549 / £465 |
| 13–14 Dec (13–15 Dec, min 2) | £474 / £471 = £472.50 (£480) | £459.00 obs | £469 (5) | P40 / −2% | £469 (10): P40 / −2% | **£557**; median-level £486 |
| **13–16 Feb, Valentine's** (13–17 Feb, 4n, min 4) | PriceLabs **£434 / £407 / £414 / £417 = £418.00** (£420.75); uncustomized £496 / £440 / £452 / £458 (£461.50); **−5% DSO still set** | **£417.50 obs** | **£467 (5)** | **P40 / −11%** | £448 (10): P40 / −7% | **£512–£536**; median-level **£453–£474** |

- **7–9 Dec is the weakest position for the 3rd day** (P25 / −20% kept, −8% wider) with no change on our side.
- **29 Nov–3 Dec** (3 days out, 4 nights) is −6% vs wider while the −8% DSO is still on. Removing it alone brings the room back to about £517, which is within the supported range.
- **Valentine's:** 4th day at P40 / −7% to −11%. Our room is 9.4% under the uncustomized price; the −5% DSO explains about half of that. Corentin's "cut PriceLabs discounts" plus the comp evidence support removing it.
- 21 Dec (£2,152, 1n) and 29 Dec (£2,308, 1n) are +300% DSO orphans (open action a-p05-dec). Not raised as new.
- **Positioning:** `quality_premium(4.79, 4.50)` = +0.116. `recommend(0.70, 0.50, 0.25–0.67, 0.116)` → **raise +21.6%**. **Supported: +12% vs median.**
- **Differentiators:**
  - The quality peers are 912053248917940403 (4.97, Superhost, lift, park view; not returned for the 7th day) and 1639043256346803626 (4.91, Superhost, terrace, parking).
  - The cheap end rates well below us: 1610095240357069208 (4.15) and 1363636555926649515 (3.93).
  - Ours: Abbey Road location; parking and terrace NOT CHECKED.

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272)

| Open stay | Smoobu room 26 Nov (25 Nov) | Our card (obs) | Kept median (n) | Wider raw (n) | Trimmed wider < £1,000 (n): pct / vs | Median-level room (trimmed) |
|---|---|---|---|---|---|---|
| **2–3 Dec (1n, min 1)** | **£317** (£363; +25% DSO still set) | **£392** | n = 0 | £490 (23): P35 / −20% | **£404 (17): P47 / −3%** | £331 |
| **6–9 Dec (3n, min 3)** | £361 / £328 / £329 = **£339.33** (was unavailable) | **£322.67** | £333 (4): P50 / −3% | £442 (35): P23 / −27% | **£392 (29): P28 / −18%** | **£423** (q-adjusted £412) |
| **9–12 Dec (3n, min 3)** | £338 / £310 / £360 = **£336.00** | **£320.33** | £555 (4): P0 / −42% | £560 (47): P13 / −43% | **£548 (42): P14 / −42%** | **£612** (q-adjusted £596) |
| 6–12 Dec (6n) | £337.67 | £299.83 | £732 (2) | £588 (31): P10 / −49% | £517 (24): P12 / −42% | – |

- **2 Dec:** at the trimmed median (−3%) after the room cut. **Hold £317.** The +25% DSO is not producing +25%; cause NOT CHECKED.
- **6–12 Dec is bookable on Airbnb** (our card shows £300–£323 a night all-in). Whether it should be open is Corentin's call: policy marks P06 blocks as intentional, and t-p06-0612open-2511 is open. That is not raised here as an opportunity.
- **If it stays open, it is priced well under comps,** −18% (6–9 Dec) to −42% (9–12 Dec) vs the trimmed wider median. It also fell £23–£122 a night overnight.
- **Positioning:** `quality_premium(4.58, 4.64)` = −0.024. `recommend(0.73, 0.52, 0.14–0.50, −0.024)` → **raise +10%** (PriceLabs occupancy). On Smoobu occupancy (9/17), +5%. The evidence supports up to the median: room about £412 for 6–9 Dec and about £596 for 9–12 Dec.
- Christmas 25–27 Dec is blocked (policy); priced for the trend only.

## SEG Scott Ellis Gardens 3-bed (PriceLabs 3588993; NW8; reference positioning only, not mapped)

| Stay | PriceLabs room/night 26 Nov (25 Nov) | Status (min) | Kept median (n) | Pct / vs kept | Wider 3BR ≤1.0 km (n) | Pct / vs wider | Supported |
|---|---|---|---|---|---|---|---|
| 27–29 Nov, 1–3 Dec | £410 / £318 | **Blocked** (26 Nov–9 Dec, unchanged) | – / £496 (3) | excluded | – / £388 (7) | excluded | not sellable |
| **10–12 Dec** (10–13 Dec, 3n) | £337 / £385 / £468 = **£396.67** (£439.67) | Open (min 3) | £484 (2) | P50 / −18% | £429 (4) | P50 / −8% | **hold** (room only; cleaning would close the gap) |
| **12–14 Dec** (12–15 Dec, 3n) | £468 / £415 / £392 = **£425.00** (£416.67) | Open (min 2/3); 15 Dec Blocked | £467 (2) | P50 / −9% | £418 (5) | P60 / +2% | **hold** |
| **16–19 Dec** (16–20 Dec, 4n) | £398 / £428 / £482 / £504 = **£453.00** (£456.00) | Open (min 3) | n = 0 | – | **£516 (6)** | **P33 / −12%** | **up to about £516 all-in** (thin) |
| 25–26 Dec (Fri 25–Sun 27 Dec) | £478 / £527 | 25 Dec Booked (21–26 Dec stay) | n = 0 | excluded | £600 (3) | excluded | – |
| **26–29 Dec** (26–30 Dec, 4n) | £527 / £510 / £634 / £652 = **£580.75** (£551.75) | Open (min 4; 27 Dec min 7) | £792 (1) | P0 / −27% | **£790 (6)** | **P33 / −26%** | **up to about £790 all-in** |
| **NYE 30 Dec–2 Jan** (30 Dec–3 Jan, 4n) | list £643 / £643 / £516 / £486 = £572 | **Booked** (`booked_date` 24 Nov) | £819 (1) | – | **£756 (7)** | **as sold: ADR £373.07 = −51%** | sold |

- **NYE is sold, at about half the market.** PriceLabs ADR is £373.07 a night against a wider median of £756 (n 7, £485–£911) and our own list of £550.75 on 25 Nov (0.68×).
  - The 21–26 Dec stay also shows a low ADR (£296.35, booked 22 Nov, against a £445–£478 list).
  - The channel, fees and whether the ADR is net are NOT CHECKED (SEG is not in the Smoobu mapping; the Dispatcher still counts 2 Smoobu reservations).
- **26–30 Dec is the one open SEG stay the evidence supports raising.** It is −26% vs wider (n 6) while the market surges (+31.0% prices 27–31 Dec, +23.0% occupancy 27 Dec–1 Jan per PriceLabs). The 27 Dec min 7 still blocks most 3–5 night arrivals that day.
- **16–20 Dec moved from +7% to −12%** because the wider set changed, not our price. It rests on n = 6 and kept n = 0, so it supports a modest step only.
- **PriceLabs 3BR (26 Nov, room):** P25 £316, P50 £383, P75 £472, P90 £617 (n 148).
- **Positioning:** no rating or reviews on record, so `quality_premium` = 0. `recommend` on PriceLabs occupancy (0.67 vs 0.44) → raise +10%. On booked-only occupancy (5/16 vs 0.44) → fix-listing. Neither is reliable while the blocks distort occupancy. **Supported: up to the comp median, not above.**
- **Differentiators:** 3 bed / **2 bath** (bath counts for comps NOT CHECKED; only 1548502477554034012 states 2 baths). Standouts: 6620546 (315 reviews, garden), 52560423 (377 reviews), 1633989864851131941 (cinema room, garden). 6 of the 11 were not returned today.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- **Smoobu 26 Nov:** £450 every night to 26 Dec (min 3–4). 27 Dec–2 Jan £492–£618 (−£123 net overnight on 8 nights).
- **Booked:** 0% next 30 / 60 vs market 47% / 33% (pl_kpis). No edit in the 25–26 Nov log.
- **Vs kept median, P100 on every stay:**

| Stay | vs kept median (n) |
|---|---|
| 1–3 Dec | +94% (3) |
| 7–9 Dec | +49% (3) |
| 14–16 Dec | +62% (6) |
| 17–19 Dec | +78% (5) |
| 25–27 Dec | +31% (4) |

  27–29 Nov: kept n = 0; +13% vs wider (n 3).
- **PriceLabs own neighbourhood:** 1BR P25 £148, P50 £191, P75 £232, P90 £271 (n 172). £450 is 1.66× the 1BR P90. Numbers only.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)

| Stay | Kept median (n) |
|---|---|
| 1–3 Dec | £212 (3) |
| 7–9 Dec | £214 (3) |
| 14–16 Dec | £192 (4) |
| 17–19 Dec | £234 (2) |
| 25–27 Dec | £206 (1) |

- 27–29 Nov: kept n = 0. Rating median 4.68 (53).
- 975294297333089697 has not been returned for **14 days** (page HTTP 200; calendar NOT CHECKED). It is first in line for replacement once it is shown closed.

## P08 Islington: handback
- Policy last night 13 Nov. Not searched; no rows written.

## Comp tables

**Source for every comp row:**
- Airbnb public search (airbnb.co.uk), checked 2026-11-26 07:23:20–07:29:47Z.
- Nightly = total ÷ nights, after offers, cleaning included, taxes excluded.
- Rating (reviews) and sleeps come from each listing page (07:23–07:25Z). Distance in km is from 17 Nov (SEG: from the PriceLabs pin, 22 Nov).
- (±%) is the change vs 25 Nov for the same stay. "n/a" means not returned (booked or min stay).
- New stays today (P11 26–27 Nov; P06 6–9, 9–12 and 6–12 Dec) have no comparison.
- "Ours" rows come from the 26 Nov snapshot. "excluded (not open)" means at least one night is booked or blocked.
- Every priced row is in `data/snapshots/2026-11-26/comps.csv`.

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) 26 Nov | Thu 26 Nov–Fri 27 Nov (1n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 30 Nov–Fri 4 Dec (4n) | Tue 1 Dec–Thu 3 Dec (2n) | Tue 8 Dec–Wed 9 Dec (1n) | Mon 14 Dec–Sat 19 Dec (5n) | Wed 23 Dec–Sat 26 Dec (3n) | Fri 25 Dec–Sun 27 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.63 (32) | n/a | n/a | £404 | n/a (was £440) | n/a | n/a (was £442) | £555 | £573 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.73 (182) | n/a | n/a | n/a | n/a | n/a | £289 | £348 | £418 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | n/a | £324 | £360 | n/a | £407 | £520 | n/a (was £538) | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a | n/a | n/a | £338 | n/a | £400 | £417 | £438 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.5 (14) | n/a | n/a | n/a | n/a (was £342) | n/a | £407 | n/a | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.71 (14) | n/a | n/a | n/a | n/a | n/a | £393 (-1%) | £507 | n/a | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a | n/a | £231 | n/a (was £262) | n/a | £325 | n/a (was £342) | n/a | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.39 (66) | n/a | n/a | n/a | £241 | £253 | £262 | £307 | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (89) | n/a | n/a | £202 | £210 | n/a | n/a | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (74) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.56 (39) | n/a | n/a | n/a | £226 | n/a | n/a | £339 | n/a | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Kept median (n)** | | | | – (0) | – (0) | £278 (4) | £241 (5) | £253 (1) | £393 (7) | £417 (7) | £438 (3) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £294 (7) | £236 (2) | £264 (23) | £284 (34) | £311 (12) | £341 (43) | £363 (39) | £468 (20) | |
| **Ours, room/night (status, min)** | | | | £140 room AS SOLD 25–27 Nov (Booking.com, made 25 Nov), min 2 | £300 Booked, min 2 | £239 Open, min 2 | £236 Open, min 2 | £306 Open, min 1 | £243 Open, min 2 | £266 Open, min 2 | £280 Booked/Open, min 2/4 | |
| **Ours, comparable basis** | | | | £215 if £149 cleaning on top (cleaning NOT CHECKED); £140 room only | £420 | £312 | £346 | £501 | £309 | £356 | £396 | list = Smoobu ×1.15 (policy) + £149/n |
| **Our pct / vs kept median** | | | | as sold: kept n = 0 | excluded (not open) | P50 / +12% | P80 / +44% | P100 / +98% | P29 / -21% | P43 / -15% | excluded (not open) | |
| Our pct / vs wider median | | | | **as sold: P0 / −27% (all-in) / −52% (room)** | excluded (not open) | P70 / +18% | P74 / +22% | P92 / +61% | P40 / -9% | P46 / -2% | excluded (not open) | |

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) 26 Nov | Fri 27 Nov–Sun 29 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Tue 1 Dec–Thu 3 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Fri 25 Dec–Sun 27 Dec (2n) | Sat 13 Feb–Wed 17 Feb (4n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.15 (13) | n/a | £449 | £509 | £453 | £469 | n/a | £392 | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | n/a | £405 | £465 | £620 | £620 | n/a | £467 | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (30) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | n/a | £386 (-2%) | £422 (-1%) | n/a | £410 (-5%) | £525 (-8%) | £412 (-1%) | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.91 (32) | n/a | n/a | n/a | £406 | £406 | n/a | £805 | Superhost, parking listed, balcony/patio/terrace (house) |
| [1481043902711346984](https://www.airbnb.co.uk/rooms/1481043902711346984) | 1.16 | 8 | 4.76 (17) | n/a | n/a | n/a | £582 | £580 | n/a | £524 (-2%) | added 18 Nov |
| **Kept median (n)** | | | | – (0) | £405 (3) | £465 (3) | £517 (4) | £469 (5) | £525 (1) | £467 (5) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £1,048 (1) | £440 (6) | £453 (8) | £453 (11) | £469 (10) | £763 (2) | £448 (10) | |
| **Ours, room/night (status, min)** | | | | £564 Booked, min 4 | £476 Open, min 3 | £474 Open, min 3 | £417 Open, min 2 | £472 Open, min 2 | £675 Booked, min 3 | £418 Open, min 4 | |
| **Ours, comparable basis** | | | | £529 | £413 obs | £460 | £416 obs | £459 obs | £705 | £418 obs | obs = own Airbnb card in same search; else 0.765/0.900 × Smoobu + £195/n |
| **Our pct / vs kept median** | | | | excluded (not open) | P67 / +2% | P33 / -1% | P25 / -20% | P40 / -2% | excluded (not open) | P40 / -11% | |
| Our pct / vs wider median | | | | excluded (not open) | P33 / -6% | P50 / +1% | P27 / -8% | P40 / -2% | excluded (not open) | P40 / -7% | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) 26 Nov | Fri 27 Nov–Sun 29 Nov (2n) | Tue 1 Dec–Thu 3 Dec (2n) | Wed 2 Dec–Thu 3 Dec (1n) | Sun 6 Dec–Wed 9 Dec (3n) | Sun 6 Dec–Sat 12 Dec (6n) | Wed 9 Dec–Sat 12 Dec (3n) | Fri 25 Dec–Sun 27 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.64 (14) | n/a | n/a | n/a | £364 | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.72 (25) | n/a | £296 | n/a | £296 | n/a | n/a | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | n/a | n/a | £302 | n/a | n/a | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | £362 (-2%) | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (54) | n/a | n/a | n/a | £1,002 | £951 | £972 | n/a | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | £513 | £547 | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | n/a | n/a | £563 | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.6 (25) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | £383 | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| **Kept median (n)** | | | | – (0) | £329 (2) | – (0) | £333 (4) | £732 (2) | £555 (4) | – (0) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £2,600 (5) | £362 (47) | £490 (23) | £442 (35) | £588 (31) | £560 (47) | £778 (30) | |
| **Ours, room/night (status, min)** | | | | £382 Booked, min 3 | £312 Booked/Open, min 1/3 | £317 Open, min 1 | £339 Open, min 3 | £338 Open, min 3 | £336 Open, min 3 | £324 Blocked, min 4 | |
| **Ours, comparable basis** | | | | £382 | £323 | £392 obs | £323 obs | £300 obs | £320 obs | £356 | obs = own Airbnb card; else 0.83/0.900 × Smoobu + £129/n |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | n = 0 | P50 / -3% | P0 / -59% | P0 / -42% | excluded (not open) | |
| Our pct / vs wider median | | | | excluded (not open) | excluded (not open) | P35 / -20% | P23 / -27% | P10 / -49% | P13 / -43% | excluded (not open) | |

### SEG

| Airbnb id | Dist km | Sleeps | Rating (reviews) 26 Nov | Fri 27 Nov–Sun 29 Nov (2n) | Tue 1 Dec–Thu 3 Dec (2n) | Thu 10 Dec–Sun 13 Dec (3n) | Sat 12 Dec–Tue 15 Dec (3n) | Wed 16 Dec–Sun 20 Dec (4n) | Fri 25 Dec–Sun 27 Dec (2n) | Sat 26 Dec–Wed 30 Dec (4n) | Wed 30 Dec–Sun 3 Jan (4n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1633989864851131941](https://www.airbnb.co.uk/rooms/1633989864851131941) | 0.35 | 6 | 4.88 (43) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | cinema room, garden, Guest favourite |
| [1498503422089605343](https://www.airbnb.co.uk/rooms/1498503422089605343) | 0.43 | 7 | 4.84 (25) | n/a | £347 | £387 (-3%) | £383 | n/a | n/a | n/a | n/a | ground floor, refurbished (title), Superhost |
| [6620546](https://www.airbnb.co.uk/rooms/6620546) | 0.62 | 6 | 4.92 (315) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | 4-acre garden, Guest favourite, Superhost |
| [1548502477554034012](https://www.airbnb.co.uk/rooms/1548502477554034012) | 0.62 | 6 | 4.91 (33) | n/a | n/a | n/a | n/a | n/a | n/a | £792 (+1%) | £819 (+1%) | 2 bath, A/C, Guest favourite (title says sleeps 8; page capacity 6), Superhost |
| [11056472](https://www.airbnb.co.uk/rooms/11056472) | 0.72 | 6 | 4.26 (23) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Marylebone (title) |
| [1648663792586887168](https://www.airbnb.co.uk/rooms/1648663792586887168) | 0.76 | 5 | 4.86 (14) | n/a | n/a | n/a | n/a | n/a (was £425) | n/a | n/a | n/a | none in title, Superhost |
| [52560423](https://www.airbnb.co.uk/rooms/52560423) | 0.8 | 6 | 4.9 (377) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite, Superhost |
| [1165719843393058533](https://www.airbnb.co.uk/rooms/1165719843393058533) | 0.82 | 6 | 4.79 (24) | n/a | n/a | £581 | £551 (-1%) | n/a | n/a | n/a | n/a | Little Venice (title), Superhost |
| [897028868119653426](https://www.airbnb.co.uk/rooms/897028868119653426) | 0.87 | 6 | 4.65 (23) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | family home near Little Venice (title) |
| [1269544547244432855](https://www.airbnb.co.uk/rooms/1269544547244432855) | 0.89 | 6 | 4.7 (61) | n/a | £496 | n/a | n/a | n/a | n/a | n/a | n/a | A/C, rooftop (title) |
| [1064528274936916938](https://www.airbnb.co.uk/rooms/1064528274936916938) | 0.91 | 6 | 4.81 (26) | n/a | £584 | n/a | n/a | n/a | n/a | n/a | n/a | by Paddington station (title) |
| **Kept median (n)** | | | | – (0) | £496 (3) | £484 (2) | £467 (2) | – (0) | – (0) | £792 (1) | £819 (1) | |
| Wider: same bedrooms, rated, ≤1.0 km (n) | | | | – (0) | £388 (7) | £429 (4) | £418 (5) | £516 (6) | £600 (3) | £790 (6) | £756 (7) | |
| **Ours, room/night (status, min)** | | | | £410 Blocked, min 4 | £318 Blocked, min 2 | £397 Open, min 3 | £425 Open, min 2/3 | £453 Open, min 3 | £502 Booked/Open, min 4 | £581 Open, min 4/5/7 | £572 Booked, min 3/4 | |
| **Ours, comparable basis** | | | | £410 | £318 | £397 | £425 | £453 | £502 | £581 | £572 | PriceLabs room (not in Smoobu); cleaning NOT CHECKED, not added |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | P50 / -18% | P50 / -9% | n = 0 | excluded (not open) | P0 / -27% | excluded (not open) | |
| Our pct / vs wider median | | | | excluded (not open) | excluded (not open) | P50 / -8% | P60 / +2% | P33 / -12% | excluded (not open) | P33 / -26% | excluded (not open) | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) 26 Nov | Fri 27 Nov–Sun 29 Nov (2n) | Tue 1 Dec–Thu 3 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Fri 25 Dec–Sun 27 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | £202 | n/a | £252 | £252 | n/a | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | £352 | £352 | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | n/a | £246 | £246 | £253 | £334 | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | £232 | n/a (was £302) | £302 | £302 | £352 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | £232 | £302 | £302 | n/a | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 4.92 (13) | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.71 (28) | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (21) | n/a | n/a | n/a (was £216) | n/a | n/a | £236 | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | n/a | n/a (was £241) | £241 | £241 | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Kept median (n)** | | | | – (0) | £232 (3) | £302 (3) | £278 (6) | £253 (5) | £344 (4) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £398 (3) | £225 (16) | £302 (15) | £246 (31) | £285 (23) | £352 (13) | |
| **Ours, room/night (status, min)** | | | | £450 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3/4 | £450 Open, min 4 | |
| **Ours, comparable basis** | | | | £450 | £450 | £450 | £450 | £450 | £450 | Smoobu room |
| **Our pct / vs kept median** | | | | n = 0 | P100 / +94% | P100 / +49% | P100 / +62% | P100 / +78% | P100 / +31% | |
| Our pct / vs wider median | | | | P100 / +13% | P100 / +100% | P100 / +49% | P100 / +83% | P100 / +58% | P92 / +28% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) 26 Nov | Fri 27 Nov–Sun 29 Nov (2n) | Tue 1 Dec–Thu 3 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Fri 25 Dec–Sun 27 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.5 (18) | n/a | £170 | £174 | £176 (-8%) | £176 (-12%) | £206 | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (53) | n/a | n/a | n/a | £252 | £293 | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | £212 (-6%) | £214 (-9%) | £195 | n/a (was £208) | n/a (was £242) | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.68 (63) | n/a | n/a | n/a | £190 (-2%) | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.43 (170) | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.76 (29) | n/a | £228 | £228 | n/a | n/a | n/a | none listed |
| **Kept median (n)** | | | | – (0) | £212 (3) | £214 (3) | £192 (4) | £234 (2) | £206 (1) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | – (0) | £200 (4) | £214 (6) | £189 (6) | £215 (8) | £284 (7) | |
| Ours | | | | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | |

Data gaps:
- **Booking.com live prices: NOT CHECKED** (AWS WAF; not attempted, not bypassed). P11 is compared at list (Smoobu × 1.15 per policy, × 1.10 alongside) + £149 ÷ n, not at the promoted price a guest sees.
- **P11 sold 25–27 Nov:** a past check-in cannot be searched, so it is compared with tonight's 1-night Airbnb wider set (n 7; kept n 0). Whether the £280.67 Booking.com total includes cleaning: NOT CHECKED. The 27.6% commission vs the 18% booster is unexplained; ask (channel lane).
- **Comp activity / calendars: NOT CHECKED.** 20 kept ids were not returned on any stay today (16 outside P06, plus 4 of 12 P06 comps). P17 975294297333089697 has been missing for 14 days and P05 912053248917940403 for 7. The calendar read refused on 25 Nov was not retried, so no comp was replaced.
- **SEG:**
  - Cause of the 26 Nov–9 Dec and 15 Dec block: NOT CHECKED.
  - For the NYE sale (ADR £373.07, booked 24 Nov) and the 21–26 Dec stay (ADR £296.35), the channel, fees and net/gross status are NOT CHECKED.
  - Not in `id_map`/`policy`. Cleaning fee, OTA id, rating and reviews are NOT CHECKED, so room-only figures are compared with all-in comps.
  - Kept n is 0–3 on every stay.
- **P06:** whether 6–12 Dec should be open is Corentin's call (policy intentional block; t-p06-0612open-2511). Why the 2 Dec +25% DSO gives only £317 (uncustomized £298) is NOT CHECKED. Wider sets include listings at £1,000–£2,700, so trimmed medians are shown alongside.
- **P05:** kept n is 3 on 29 Nov–3 Dec and 1–3 Dec. 1639043256346803626 (£805) is an outlier in the Valentine's set.
- **Thin samples:** P11 8 Dec kept n 1; P14 27–29 Nov kept n 0; P17 n 0–4.
- **Wider set** is not filtered to at least 10 reviews. Whether Airbnb comp prices include VAT: NOT CHECKED.
- **PriceLabs percentiles** are Nearby Listings summary-table room prices for an unspecified window, not the same dates (26 Nov):

| Listing | Band | P25 / P50 / P75 / P90 (n) |
|---|---|---|
| P05 | 4BR | 455 / 573 / 701 / 1,215 (91) |
| P06 | 2BR | 317 / 409 / 526 / 658 (217) |
| P11 | 2BR | 232 / 292 / 328 / 386 (172) |
| SEG | 3BR | 316 / 383 / 472 / 617 (148) |
| P14 | 1BR | 148 / 191 / 232 / 271 (172) |

  `market.csv` belongs to the market agent; nothing was written to it.
- **Refreshes 26 Nov 06:48–06:59Z (P05, P06, SEG, P11):** no listing-level edit in the 25–26 Nov log. Group and account logs were not pulled (PriceLabs lane), so the trigger is NOT CHECKED.
- **Process:** the 5 `get_neighbourhood_data` calls were sent in one message, not one at a time (read-only, all 200).
- **P17** is not in PriceLabs or Smoobu. **P08** is a handback and was not searched.
