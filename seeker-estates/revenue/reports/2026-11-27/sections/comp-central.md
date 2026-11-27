# Competitor positioning: CENTRAL/NORTH (D = 2026-11-27)

**Method**
- **Policy read first** (`data/policy.json`). Not raised again: the P06 intentional blocks, the P14 special setup (numbers only), the Booking.com Visibility Booster, promotion stacking, the 15%/20% stay discounts, the Booking.com +15% markup (18 Nov) with derived rate plans, and the P08 handback (last night 13 Nov).
- **Comp ids: the same as yesterday, with one replacement** (P05 6, P06 12, P11 12, P14 12, P17 7, SEG 11).
  - **Replaced (SEG): 1648663792586887168 now returns HTTP 410 (listing removed), so it is inactive.** Replacement: **[40810873](https://www.airbnb.co.uk/rooms/40810873)** "Little Venice Penthouse Number Three", 3 bed, sleeps 6, **4.95 (91)**, Superhost, 0.93 km from the SEG pin. It was the only 3-bed candidate within 1.0 km that has sleeps 5–7 and at least 10 reviews. 10 others were checked and rejected: 1724914983670402382 (8 reviews), 1297224538939171267 (3), 1721776831027957904 (7, sleeps 8), 1776901964714868561 (3), 1729230135070949667 (4), 1774598307417751465 (4), 1437500079368794264 (6, sleeps 8), and 1423195425061586598, 1557455272475966400 and 1283336868206417586 (all sleeps 8).
  - The other 61 comp pages and our 2 Airbnb pages returned **HTTP 200** (checked 2026-11-27 07:20:25–07:22:09Z). Every kept comp still has at least 12 reviews.
  - **Our P06 Airbnb rating fell from 4.58 (12) to 4.38 (13).** One new review moved the average down 0.20. Back-solving, that review is about 2 stars (4.38 × 13 − 4.58 × 12 = 1.98; this is an **estimate**, and the review text is NOT CHECKED). **P05: 4.79 (39), unchanged.**
  - **Not returned on any stay today:**
    - P17: 975294297333089697 (**15th day**), 1242000869201075198 (7th), 1182369331195783741 (1st)
    - P05: 912053248917940403 (**8th day**)
    - P11: 654396087724294901 and 1515051936255130803
    - P14: 1435253477626754812, 1075245497252121738, 1659680062193836633, 1595613237427991150
    - SEG: 1633989864851131941, 6620546, 11056472, 52560423, 897028868119653426
    - P06: 1420126228540342938, 1315177393080154583, 1452940332365117153, 1018722159796386217
  - Their pages are live (HTTP 200). Calendars were not read, so "bookable in the next 60 days" is **NOT CHECKED** for them and none of them was replaced.
- **Searches:** 46 public Airbnb map searches (airbnb.co.uk, 343 result pages, 4,404 cards), **checked 2026-11-27 07:20:26–07:26:49Z**. No parse failure and no bot challenge.
  - Same boxes, filters and search parameters as yesterday. "Wider" means the same bedroom count, rated, within 1.25 km (SEG 1.0 km). It is **not filtered to at least 10 reviews**.
- **Stays priced for every comp and for us:**
  - Default stays:
    - **Fri 4–Sun 6 Dec** (next Fri–Sun; new today)
    - Tue 1–Thu 3 Dec (midweek)
    - **Sun 27–Tue 29 Dec** (contains D+30 = 27 Dec; new today)
    - Fri 25–Sun 27 Dec, kept for the trend
    - 27–29 Nov was dropped: it is today's check-in, and yesterday the kept n was 0 on every property.
  - Requested stays:
    - P05: 29 Nov–3 Dec, 7–9 Dec, 13–15 Dec, Valentine's 13–17 Feb
    - P06: 2–3 Dec, plus 6–9, 9–12 and 6–12 Dec
    - P11: 30 Nov–4 Dec, 8–9 Dec, darts 14–19 Dec, 23–26 Dec
    - SEG: open December stays 10–13, 12–15 and 16–20 Dec, plus 26–30 Dec (30 Dec–3 Jan is sold and was dropped)
    - P14 and P17: 7–9, 14–16 and 17–19 Dec
- **Our prices** come from `data/snapshots/2026-11-27/prices.csv`. Smoobu = PriceLabs `price` on every central night (Dispatcher: 0 mismatches). Booked/open status comes from Smoobu `reservations.csv`. SEG prices come from PriceLabs `raw/prices_3588993.json`. P05 13–17 Feb comes from PriceLabs `get_listing_prices` today (refreshed 27 Nov 06:33:59Z).
- **Price basis:**
  - Comps: Airbnb total ÷ nights, after offers, cleaning included, taxes excluded.
  - P05 and P06: our own Airbnb card in the same search ("obs"). P05 1–3 Dec is derived, because our card was not returned.
  - P11: list all-in = Smoobu × 1.15 + £149 ÷ n. Booking.com live prices are NOT CHECKED (AWS WAF; not attempted).
  - SEG: PriceLabs room only (cleaning NOT CHECKED).
  - P14: Smoobu room.
- **PriceLabs (read-only, 9 calls, strictly one per message):**
  - `get_user_logs` (listing, 26–27 Nov)
  - `get_listing_prices` (P05, 12–17 Feb)
  - `get_listing_date_overrides` (P05, P11, P06)
  - `get_neighbourhood_data` (P05, P11, P06, SEG, P14)
  - All returned 200. No write tool was used and no sync was triggered.
- **Rows written:** `data/snapshots/2026-11-27/comps.csv` already existed (copied forward by another agent; 25,337 data rows, the same as 26 Nov). Under `flock .comps.csv.lock` I appended **719 rows**:
  - 113 kept rows, 567 wider rows and 39 `:ours` rows
  - 43 of the rows are `SEG*`
  - The file now has 26,056 data rows, all with 11 fields. There is no guest data and there are no booking references (the `adults` value in each row is the search parameter).

## Overnight: edits and price moves
- **Listing log 26–27 Nov (`get_user_logs`): 0 entries.** There was no listing-level edit on any listing, so **none of Reyhan's edits has been reverted**:
  - **P05 −8% DSO on 29 Nov–2 Dec is still set** (updated 24 Nov 10:50:38Z), and the **Feb −5% DSO (1–28 Feb) is still set**.
  - **P11 23–25 Dec still has min-stay 2 only, with no % override** (Reyhan's 25 Nov 10:41:42Z removal). The 8 Dec +50% DSO (min 1) is unchanged. Darts 14–18 Dec has min-stay 2 only.
  - **P06:** the 2 Dec +25% DSO (min 1) is unchanged. 6–13 Dec has min-stay 3 only (24 Nov 13:14:35Z).
  - The confirm-or-revert items to Corentin stand as they were.
- **Engine moves (no edit), Smoobu room 26 → 27 Nov:**
  - **P05:** −£4 to −£11 a night. 29 Nov–2 Dec average **£476.00 → £466.00**, 7–8 Dec £417.00 → £412.00, 13–14 Dec £472.50 → £469.50. Valentine's 13–16 Feb (PriceLabs `price`) is £434/£412/£408/£411 = **£416.25**, against uncustomized £490/£444/£436/£443 (£453.25), so our price is **8.2% under uncustomized**.
  - **P06:** **2 Dec £317 → £294** (uncustomized £280; the +25% DSO yields only +5%, cause NOT CHECKED). **6–9 Dec £339.33 → £313.00 (−7.8%)**, 9–12 Dec £336.00 → £320.67 (−4.6%). The blocked nights 13–26 Dec were repriced up +£93 to +£123 a night; they are moot under policy.
  - **P11:** small moves only (−£12 over 14 open nights). 30 Nov–4 Dec £240.75 (was £239.25), darts £241.20 (was £243.00), 23–26 Dec £265.33 (was £266.33), 8 Dec £298 (was £306).
  - **SEG:** **12 Dec £468 → £388 (−£80)** (uncustomized £380), so the 10–13 Dec stay went **£396.67 → £371.67** and 12–15 Dec went £425.00 → £396.67. 26–29 Dec is flat at £581.50.
  - **P14:** 27 Dec–2 Jan −£68 net. £450 flat to 26 Dec.
- **No new booking or cancellation on P05, P06, P11, P14 or P08** (reservations 26 → 27 Nov: the only new rows are P04 and P20, which belong to the east lane). SEG PriceLabs status is unchanged: 21–26 Dec and 30 Dec–3 Jan are booked, and 28 Nov–9 Dec and 15 Dec are blocked.

## Summary

| Ref | Comps kept (n per stay) | Our pct vs kept, open stays | Rating ours vs kept median; review gap | Booked vs market, next 30 / 60 | Supported positioning |
|---|---|---|---|---|---|
| **P05 4BR** | 6 (1–5) | **7–9 Dec P25 / −20%** (wider −9%); **13–17 Feb P40 / −11%** (wider −11%); 29 Nov–3 Dec P50 / −3% (n 2), **wider P20 / −10%**; 1–3 Dec P50 / −2%; 13–15 Dec P40 / −3% | **4.79 (39)** vs 4.50 (17); **+22 reviews** | **70.0% (21/30) vs 50%**; 46.7% (28/60) vs 38% (PriceLabs 70% / 47%) | `quality_premium` **+0.116, so +12% vs median.** `recommend` → **raise +21.6%** at every open stay (booked +20 pts vs market, priced P20–P50). Supported Smoobu room: **29 Nov–3 Dec £544–£591** (now £466), **7–9 Dec £533–£624** (now £412), **13–15 Dec £556** (now £469.50), **13–17 Feb £537** (now £416.25). Median-level room: £481–£523 / £464–£546 / £485 / £475. |
| **P06 2BR** | 12 (0–5) | **6–9 Dec P40 / −17%** kept (n 5), **P17 / −25% vs trimmed wider** (£402, n 36); **9–12 Dec P0 / −38%** kept (n 2), **P9 / −42% trimmed** (£527, n 43); 6–12 Dec −31% trimmed; **2–3 Dec**: kept n 0, **P47 / −2% trimmed** (£380, n 17) | **4.38 (13)** vs 4.64 (26), **down from 4.58**; −13 reviews | Smoobu 50.0% (8/16 sellable) vs 51%; PriceLabs 73% / 87% vs 51% / 38% | `quality_premium` **−0.104, so −10% vs median** (was −2% before the new review). **2 Dec: hold £294** (at the trimmed median, already above the quality-adjusted level). **6–12 Dec**, *if Corentin keeps it open* (policy: P06 blocks intentional, t-p06-0612open-2511): `recommend` → **raise +10%** (PriceLabs occupancy) or +5% (Smoobu occupancy). Evidence at −10% vs median supports a room of **about £341–£383 for 6–9 Dec** (now £313) and **about £485–£518 for 9–12 Dec** (now £320.67). |
| **P11 2BR** | 12 (0–8) | **Darts P29 / −23%** (wider −10%); 23–26 Dec P50 / −7% (wider P45 / −2%); 30 Nov–4 Dec P75 / +16% (wider +11%); 1–3 Dec P83 / +16% (wider +12%); **8 Dec P100 / +94%** (n 1), wider P83 / +58% | Booking.com only vs Airbnb kept 4.655 (36.5): not comparable; gap NOT CHECKED | 53.3% (16/30) vs 49%; 62.2% (23/37 sellable) vs 36% (PriceLabs 53% / 73%) | `quality_premium` = 0, so **0% vs median on list all-in**. `recommend` → **raise +5% on the darts** (to about £253; median-level £272–£322). **23–26 Dec: +5% (about £279) on the wider set, hold on the kept set** (median-level £271–£289). **Hold** 30 Nov–4 Dec, 1–3 Dec and 8 Dec, which are above the median (median-level room £203–£214 / £196–£205 / £90–£141). |
| **SEG 3BR** (reference) | 11 (0–4), 1 replaced | **10–13 Dec P0 / −22%** kept (n 2), **P20 / −24% wider** (n 5); 12–15 Dec P50 / −14%, P40 / −11%; 16–20 Dec kept n 0, P29 / −13% wider (n 7); **26–30 Dec P0 / −25%** kept (n 1), **P50 / −14% wider** (n 6); 27–29 Dec P40 / −4% wider (n 5) | No rating or reviews on record vs 4.84 (33); gap NOT CHECKED | PriceLabs 63% / 43% vs 44% / 32% (inflated by the 28 Nov–9 Dec block); 5/17 sellable booked next 30 | `quality_premium` = 0, so **up to the median, not above.** Even with an assumed ~£50 a night of cleaning (estimate; SEG cleaning NOT CHECKED), 10–13 Dec stays about −12% to −14%. Supported, room-only to the wider median: **10–13 Dec up to about £492 all-in** (room £372, cut overnight); **16–20 Dec up to about £520**; **26–30 Dec up to about £673** (the wider median fell from £790 as the cheaper comps sold out). **12–15 Dec: a modest step only** (−11% room-only). |
| P08 2BR | not searched | n/a | – | handback 13 Nov | Moot (policy handback). |
| P14 1BR | 12 (0–7) | P100 on every kept stay | not on Airbnb; kept median 4.885 (20.5) | 0% vs 46% / 32% | Numbers only (special setup): **+34% to +107% vs kept median, +28% to +100% vs wider.** PriceLabs 1BR P50 £190, P90 £271 (n 171). |
| P17 1BR | 7 (1–3) | n/a | kept median 4.68 (53) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (same kept ids, same stays):**
- **P11:**
  - 23–26 Dec: kept £417 (n 7) → **£382 (n 8)**, because 1480693526878012391 (£342) was returned again. That moved us **P43 / −15% → P50 / −7%** with our price flat. Wider is flat at £361, so we are still −2%.
  - 1–3 Dec: kept £241 → **£300 (n 6)**. 1263490105174331990 (£241) was not returned, and 1542960049319560709 (£342) and 1480693526878012391 (£262) were. Our position went **+44% → +16%**.
  - Darts: kept £393 → £400 (n 7). 1675590787835266115 cut to £363 (−8%) and 1542815721953379556 returned at £442. We are **P29 / −23%** (was −21%), the **3rd day** at P29.
  - 30 Nov–4 Dec: kept £278 → £271. 1542815721953379556 cut to £310 (−23%).
- **P05:** the kept comps are flat (−1% to −3%). 7–9 Dec is at **P25 / −20% for the 4th day**, and Valentine's is at **P40 / −11% for the 5th day**. On 29 Nov–3 Dec the wider set is £440 → £449 while our card fell £413 → £405, so we moved **−6% → −10%**.
- **P06:**
  - 6–9 Dec: kept £333 → £364 (n 4 → 5; 1273781636585601427 returned at £792) and our card £323 → £303.
  - 9–12 Dec: kept £555 → £496 (n 4 → 2).
  - 2 Dec: our card £392 → £374 and the trimmed wider £404 → £380, so we are still at the median (−3% → −2%).
- **SEG:**
  - 10–13 Dec: wider £429 (n 4) → £492 (n 5) while our room fell 6%, so we moved **−8% → −24%**.
  - 26–30 Dec: wider £790 → £673 (n 6, as the cheaper comps were replaced by others) and kept 1548502477554034012 £792 → £780. We moved −26% → −14% wider.
- **P14:** kept 1–3 Dec £232 → £218, 14–16 Dec £278 → £290, 17–19 Dec £253 → £290 (n 5).
- **P17:** 1–3 Dec flat at £212; 7–9 Dec £214 → £218 (n 1); 14–16 Dec £192 → £184; 25–27 Dec £206 → £225 (n 2).

## P11 Camden (3064196; Booking.com only)

| Open nights (stay priced) | Ours room avg 27 Nov (26 Nov) | List all-in ×1.15 (×1.10) | Kept median (n) | **Pct / vs kept** | Wider median (n); pct / vs wider | Median-level Smoobu room* kept / wider |
|---|---|---|---|---|---|---|
| 30 Nov–3 Dec (30 Nov–4 Dec, 4n, min 2) | £240.75 (£239.25) | £314.11 (£302.08) | £271 (4) | P75 / +16% | £283 (22); P73 / +11% | £203 / £214 |
| 1–2 Dec (Tue 1–Thu 3 Dec, midweek) | £238.00 (£236.00) | £348.20 (£336.30) | £300 (6) | P83 / +16% | £311 (32); P75 / +12% | £196 / £205 |
| **8 Dec** (8–9 Dec, 1n, min 1; +50% DSO) | £298 (£306) | £491.70 (£476.80) | £253 (1) | P100 / +94% | £311 (12); **P83 / +58%** | £90 / £141 |
| **14–18 Dec, darts** (14–19 Dec, 5n, min 2) | **£241.20** (£243.00) | £307.18 (£295.12) | **£400 (7)** | **P29 / −23%** | £342 (37); P35 / −10% | **£322 / £272** |
| **23–25 Dec** (23–26 Dec, 3n, min 2) | £265.33 (£266.33) | £354.80 (£341.53) | £382 (8) | P50 / −7% | £361 (42); P45 / −2% | £289 / £271 |
| 4–5 Dec (Fri 4–Sun 6 Dec) | £300 | £419.50 | n = 0 | excluded (5 Dec booked) | £369 (2) | – |
| 27–28 Dec (Sun 27–Tue 29 Dec, D+30) | £372.50 | £502.87 | £585 (1) | excluded (booked 26 Dec–3 Jan) | £590 (10) | – |

\* Median-level Smoobu room = (median − £149 ÷ n) ÷ 1.15: the Smoobu rate whose Booking.com list price plus cleaning equals the comp median, before stacked promotions (policy).

- **Darts 14–19 Dec is still the clearest gap:** −23% vs kept and −10% vs wider (P29 for the 3rd day).
  - Supported: **+5%, to about £253 room** (`recommend` step). The median-level room is £272–£322.
  - Policy: Corentin asked on 24 Oct to leave the darts override as it is. Today the overrides show **min-stay 2 only on 14–18 Dec, with no % override.** This is reported as fact, not re-raised. Whether a darts % override is still meant to be set is a question for Corentin.
- **23–26 Dec:** after the kept set refilled, we are at P50 / −7% (wider −2%). The case for putting back Reyhan's removed premium is **weaker than yesterday**: the evidence supports at most **+5% (about £279)**. It stays a **confirm or revert** for Corentin.
- **30 Nov–4 Dec, 1–3 Dec and 8 Dec are above the median** (+11% to +58% vs wider). Our booked share is in line with the market (53% vs 49%), so `recommend` gives **hold**. 8 Dec is the +50% DSO orphan (open item t-p11-8dec-orphan).
- **Positioning:** `quality_premium` = 0 (no Booking.com review data). `recommend(0.53, 0.49, pct, 0)` → raise +5% below P50, hold at P50 and above. **Supported: the comp median (0%) on list all-in.**
- **Differentiators:** our flat is a basement with a patio and no lift. Among the comps, 4 of 12 have a lift and 3 a balcony or terrace. 2557770 has 182 reviews. 654396087724294901 is a Superhost (not returned today).
- **PriceLabs 2BR:** P25 £232, P50 £292, P75 £328, P90 £387 (n 172). Surge 26–31 Dec +45.1%.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Gap (stay) | Smoobu room/night 27 Nov (26 Nov), min | Ours, Airbnb all-in/night | Kept median (n) | Pct / vs median | Wider 4BR ≤1.25 km (n) | +11.6% supported → Smoobu room; median-level |
|---|---|---|---|---|---|---|
| **29 Nov–2 Dec** (29 Nov–3 Dec, min 3) | £473 / £463 / £460 / £468 = **£466.00** (£476.00); **−8% DSO still set** | £405.25 obs | £416 (2) | P50 / −3% | **£449 (5): P20 / −10%** | **£544 (kept) / £591 (wider)**; median-level £481 / £523 |
| 1–2 Dec (Tue 1–Thu 3 Dec, midweek; inside the gap) | £460 / £468 = £464.00 | £452 derived (card not returned) | £464 (2) | P50 / −2% | £480 (6): P50 / −6% | (inside the 29 Nov–3 Dec gap) |
| **7–8 Dec** (7–9 Dec, min 2; −1% DSO) | £425 / £399 = **£412.00** (£417.00) | £413.00 obs | **£515 (4)** | **P25 / −20%** | £453 (11): P27 / −9% | **£624 (kept) / £533 (wider)**; median-level £546 / £464 |
| 13–14 Dec (13–15 Dec, min 2) | £471 / £468 = £469.50 (£472.50) | £457.00 obs | £469 (5) | P40 / −3% | £469 (10): P40 / −3% | **£556**; median-level £485 |
| **13–16 Feb, Valentine's** (13–17 Feb, 4n, min 4) | PriceLabs `price` **£434 / £412 / £408 / £411 = £416.25** (£418.00); uncustomized £453.25; **−5% DSO still set** | **£415.25 obs** | **£467 (5)** | **P40 / −11%** | £467 (11): P36 / −11% | **£537**; median-level **£475** |

- **7–9 Dec has been the weakest position for 4 days** (P25 / −20% kept, −9% wider), and the engine cut it a further £5.
- **29 Nov–3 Dec** (2 days out, 4 nights, min 3) is now **−10% vs wider** while the −8% DSO is still on. Removing the DSO alone brings the room back to about £506, still below the supported £544–£591.
- **Valentine's** is at P36–P40 / −11% for the 5th day. Our room is 8.2% under the uncustomized price, and the −5% DSO explains most of that. Corentin's direction ("cut PriceLabs discounts") and the comp evidence both support removing it.
- 21 Dec (£2,141, 1n) and 29 Dec (£2,290, 1n) are +300% DSO orphans (open action a-p05-dec). Not raised as new.
- **Positioning:** `quality_premium(4.79, 4.50)` = +0.116. `recommend(0.70, 0.50, 0.20–0.50, 0.116)` → **raise +21.6%**. **Supported: +12% vs median.**
- **Differentiators:**
  - Quality peers: 912053248917940403 (4.97, Superhost, lift, park view; not returned for the 8th day) and 1639043256346803626 (4.91, Superhost, terrace, parking).
  - The cheap end is rated well below us: 1610095240357069208 (4.15) and 1363636555926649515 (3.93).
  - Ours: Abbey Road location. Whether we have parking or a terrace is NOT CHECKED.
- **PriceLabs 4BR:** P25 £459, P50 £583, P75 £704, P90 £1,220 (n 90). Surge 26–31 Dec +29.5%.

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272)

| Open stay | Smoobu room 27 Nov (26 Nov) | Our card (obs) | Kept median (n) | Wider raw (n) | Trimmed wider < £1,000 (n): pct / vs | Median-level room (trimmed); at q −10% |
|---|---|---|---|---|---|---|
| **2–3 Dec (1n, min 1)** | **£294** (£317; +25% DSO, uncustomized £280) | **£374** | n = 0 | £470 (23): P35 / −20% | **£380 (17): P47 / −2%** | £301; £254 |
| **6–9 Dec (3n, min 3)** | £333 / £302 / £304 = **£313.00** (£339.33) | **£302.67** | £364 (5): P40 / −17% | £456 (42): P14 / −34% | **£402 (36): P17 / −25%** | £433; **£383** (kept-based £341) |
| **9–12 Dec (3n, min 3)** | £317 / £312 / £333 = **£320.67** (£336.00) | **£308.33** | £496 (2): P0 / −38% | £549 (47): P9 / −44% | **£527 (43): P9 / −42%** | £585; **£518** (kept-based £485) |
| 6–12 Dec (6n) | £316.83 | £284.00 | £693 (2): P0 / −59% | £540 (29): P7 / −47% | £413 (22): P9 / −31% | £472; £420 |

- **The new low review (4.58 → 4.38) is today's main change for P06.** It moves the quality-supported position from −2% to **−10% vs median**. It is a reason to fix the listing issue behind the review (cause NOT CHECKED), not a reason to cut further.
- **2 Dec:** our card (£374) sits at the trimmed median (−2%), above the quality-adjusted level. **Hold £294.** The +25% DSO produces only +5% over uncustomized (£280 → £294); cause NOT CHECKED (pricelabs lane).
- **6–12 Dec is still bookable on Airbnb** (our card was returned on all three stays). Whether it should be open is Corentin's call: policy marks P06 blocks as intentional, and t-p06-0612open-2511 is open. It is not raised as an opportunity here.
  - If it stays open, it is still priced under the market even after the quality discount: −17% to −25% (6–9 Dec) and −38% to −42% (9–12 Dec).
  - The engine cut these nights by a further £15–£26 a night overnight.
- **Positioning:** `quality_premium(4.38, 4.64)` = −0.104. `recommend(0.73, 0.51, 0.09–0.47, −0.104)` → **raise +10%** (PriceLabs occupancy). On Smoobu occupancy (8/16, 50% vs 51%) it gives +5% below P40 and hold at P40 and above. The evidence supports at most a room of £341–£383 (6–9 Dec) and £485–£518 (9–12 Dec).
- Christmas (25–27 Dec) and 27–29 Dec are blocked (policy). They were priced for the trend only.
- **PriceLabs 2BR:** P25 £320, P50 £412, P75 £529, P90 £664 (n 217). The 5 Dec market occupancy is 73.9% (+9.1%).

## SEG Scott Ellis Gardens 3-bed (PriceLabs 3588993; NW8; reference positioning only, not mapped)

| Stay | PriceLabs room/night 27 Nov (26 Nov) | Status (min) | Kept median (n) | Pct / vs kept | Wider 3BR ≤1.0 km (n) | Pct / vs wider | Supported |
|---|---|---|---|---|---|---|---|
| 1–3 Dec, 4–6 Dec | £314.50 / £408.50 | **Blocked** (28 Nov–9 Dec, unchanged) | £428 (4) / n 0 | excluded | £386 (8) / n 0 | excluded | not sellable |
| **10–12 Dec** (10–13 Dec, 3n) | £342 / £385 / £388 = **£371.67** (£396.67) | Open (min 3) | £478 (2) | **P0 / −22%** | £492 (5) | **P20 / −24%** | **up to about £492 all-in** |
| 12–14 Dec (12–15 Dec, 3n) | £388 / £413 / £389 = **£396.67** (£425.00) | Open (min 2/3); 15 Dec Blocked | £461 (2) | P50 / −14% | £445 (5) | P40 / −11% | modest step (room-only −11%) |
| **16–19 Dec** (16–20 Dec, 4n) | £397 / £426 / £480 / £503 = **£451.50** (£453.00) | Open (min 3) | n = 0 | – | **£520 (7)** | **P29 / −13%** | **up to about £520 all-in** |
| 25–26 Dec (Fri 25–Sun 27 Dec) | £479 / £526 | 25 Dec Booked (21–26 Dec stay) | n = 0 | excluded | £600 (3) | excluded | – |
| **26–29 Dec** (26–30 Dec, 4n) | £526 / £520 / £630 / £650 = **£581.50** (£580.75) | Open (min 4; 27 Dec min 7) | £780 (1) | P0 / −25% | **£673 (6)** | **P50 / −14%** | **up to about £673 all-in** |
| 27–28 Dec (27–29 Dec, D+30) | £520 / £630 = £575.00 | Open (min 7 on 27 Dec) | n = 0 | – | £600 (5) | P40 / −4% | hold (min 7 blocks this stay length) |

- **10–13 Dec is now the weakest SEG stay:** −22% kept / −24% wider, after the engine cut 12 Dec by £80 (uncustomized £380).
- **26–30 Dec** improved from −26% to −14% wider only because the wider median fell (£790 → £673); our price is flat. It is still below the median while the market surges (+30.9% prices 27–31 Dec, +23.1% occupancy 27 Dec–1 Jan per PriceLabs). The 27 Dec min 7 still blocks most 3–5 night arrivals that day.
- NYE (30 Dec–3 Jan) is sold (PriceLabs ADR £373.07, booked 24 Nov), so it was not re-searched. Yesterday's comparison stands: −51% vs wider £756.
- **Positioning:** with no rating or reviews on record, `quality_premium` = 0.
  - `recommend` on PriceLabs occupancy (0.63 vs 0.44) → raise +10%.
  - On booked-only occupancy (5/17 vs 0.44) → fix-listing.
  - Neither is reliable while the blocks distort occupancy. **Supported: up to the comp median, not above.**
- **Differentiators:**
  - SEG is 3 bed / **2 bath**. Bath counts for comps are NOT CHECKED; only 1548502477554034012 states 2 baths.
  - Standouts: 6620546 (315 reviews, garden), 52560423 (378 reviews), 1633989864851131941 (cinema room, garden) and the new 40810873 (penthouse, 4.95 from 91 reviews).
  - 5 of the 11 were not returned today.
- **PriceLabs 3BR:** P25 £315, P50 £384, P75 £473, P90 £645 (n 148).

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- **Smoobu 27 Nov:** £450 every night to 26 Dec (min 3–4). 27 Dec–2 Jan £469–£621 (−£68 net overnight across 7 nights).
- **Booked:** 0% next 30 / 60 vs market 46% / 32% (pl_kpis). No edit in the 26–27 Nov log.
- **Vs kept median (P100 on every kept stay):**

| Stay | vs kept median (n) |
|---|---|
| 1–3 Dec | +107% (2) |
| 7–9 Dec | +49% (5) |
| 14–16 Dec | +55% (7) |
| 17–19 Dec | +55% (5) |
| 25–27 Dec | +34% (3) |
| 27–29 Dec | +55% (2) |

  On 4–6 Dec the kept n is 0; we are +32% vs wider (n 3).
- **PriceLabs neighbourhood:** 1BR P25 £147, P50 £190, P75 £234, P90 £271 (n 171). £450 is 1.66× the 1BR P90. Numbers only.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)

| Stay | Kept median (n) |
|---|---|
| 1–3 Dec | £212 (3) |
| 4–6 Dec | £245 (1) |
| 7–9 Dec | £218 (1) |
| 14–16 Dec | £184 (3) |
| 17–19 Dec | £244 (1) |
| 25–27 Dec | £225 (2) |
| 27–29 Dec | £262 (1) |

- Rating median 4.68 (53).
- 975294297333089697 has not been returned for **15 days** (page HTTP 200; calendar NOT CHECKED). It is first in line for replacement once it is shown closed.

## P08 Islington: handback
- Policy last night 13 Nov. Not searched; no rows written.

## Comp tables

**Source for every comp row:**
- Airbnb public search (airbnb.co.uk), checked 2026-11-27 07:20:26–07:26:49Z.
- Nightly = total ÷ nights, after offers, cleaning included, taxes excluded.
- Rating (reviews) and sleeps come from each listing page (07:20–07:23Z). Distance in km is from 17 Nov (SEG: from the PriceLabs pin, 22 Nov; 40810873 from the search pin today).
- (±%) is the change vs 26 Nov for the same stay. "n/a" means not returned (booked or min stay).
- New stays today (4–6 Dec, 27–29 Dec) have no comparison.
- "Ours" rows come from the 27 Nov snapshot. "excluded (not open)" means at least one night is booked or blocked.
- Every priced row is in `data/snapshots/2026-11-27/comps.csv`.

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) 27 Nov | Mon 30 Nov–Fri 4 Dec (4n) | Tue 1 Dec–Thu 3 Dec (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Tue 8 Dec–Wed 9 Dec (1n) | Mon 14 Dec–Sat 19 Dec (5n) | Wed 23 Dec–Sat 26 Dec (3n) | Fri 25 Dec–Sun 27 Dec (2n) | Sun 27 Dec–Tue 29 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.63 (32) | £310 (-23%) | n/a | n/a | n/a | £442 | £555 | £573 | n/a | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.73 (182) | n/a | n/a | n/a | n/a | £289 | £348 | £418 | n/a | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | £317 (-2%) | £360 | n/a | n/a | £407 | £520 | £538 | £585 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a | £338 | n/a | n/a | £400 | £417 | £438 | n/a | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.5 (14) | n/a | £342 | n/a | n/a | £407 | n/a | n/a | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.71 (14) | n/a | n/a | n/a | n/a | £363 (-8%) | £505 | n/a | n/a | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | £231 | £262 | n/a | n/a | n/a (was £325) | £342 | n/a | n/a | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.39 (66) | n/a | n/a (was £241) | n/a | £253 | £262 | £307 | n/a | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (89) | £202 | £210 | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (74) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.56 (39) | n/a | £218 (-4%) | n/a | n/a | n/a | £339 | n/a | n/a | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Kept median (n)** | | | | £271 (4) | £300 (6) | – (0) | £253 (1) | £400 (7) | £382 (8) | £488 (4) | £585 (1) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £283 (22) | £311 (32) | £369 (2) | £311 (12) | £342 (37) | £361 (42) | £438 (25) | £590 (10) | |
| **Ours, room/night (status, min)** | | | | £241 Open, min 2 | £238 Open, min 2 | £300 Booked/Open, min 2 | £298 Open, min 1 | £241 Open, min 2 | £265 Open, min 2 | £279 Booked/Open, min 2/4 | £372 Booked, min 4/5 | |
| **Ours, comparable basis** | | | | £314 | £348 | £420 | £492 | £307 | £355 | £395 | £503 | list = Smoobu ×1.15 (policy) + £149/n |
| **Our pct / vs kept median** | | | | P75 / +16% | P83 / +16% | excluded (not open) | P100 / +94% | P29 / -23% | P50 / -7% | excluded (not open) | excluded (not open) | |
| Our pct / vs wider median | | | | P73 / +11% | P75 / +12% | excluded (not open) | P83 / +58% | P35 / -10% | P45 / -2% | excluded (not open) | excluded (not open) | |

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) 27 Nov | Sun 29 Nov–Thu 3 Dec (4n) | Tue 1 Dec–Thu 3 Dec (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Fri 25 Dec–Sun 27 Dec (2n) | Sun 27 Dec–Tue 29 Dec (2n) | Sat 13 Feb–Wed 17 Feb (4n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.15 (13) | £449 | £509 | n/a | £453 | £469 | n/a | n/a | £392 | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | n/a (was £405) | n/a (was £465) | £542 | £620 | £620 | n/a | n/a | £467 | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (30) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | £384 (-1%) | £418 (-1%) | n/a | n/a | £411 | £520 (-1%) | £642 | £409 (-1%) | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.91 (32) | n/a | n/a | n/a | £393 (-3%) | £393 (-3%) | n/a | n/a | £805 | Superhost, parking listed, balcony/patio/terrace (house) |
| [1481043902711346984](https://www.airbnb.co.uk/rooms/1481043902711346984) | 1.16 | 8 | 4.76 (17) | n/a | n/a | n/a | £578 (-1%) | £569 (-2%) | n/a | n/a | £526 | added 18 Nov |
| **Kept median (n)** | | | | £416 (2) | £464 (2) | £542 (1) | £515 (4) | £469 (5) | £520 (1) | £642 (1) | £467 (5) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £449 (5) | £480 (6) | £748 (2) | £453 (11) | £469 (10) | £760 (2) | £536 (2) | £467 (11) | |
| **Ours, room/night (status, min)** | | | | £466 Open, min 3 | £464 Open, min 3 | £544 Booked, min 4 | £412 Open, min 2 | £470 Open, min 2 | £673 Booked, min 3 | £692 Booked, min 3 | £416 Open, min 4 | |
| **Ours, comparable basis** | | | | £405 obs | £452 | £514 | £413 obs | £457 obs | £612 | £720 | £415 obs | obs = own Airbnb card in same search; else 0.765/0.900 × Smoobu + £195/n |
| **Our pct / vs kept median** | | | | P50 / -3% | P50 / -2% | excluded (not open) | P25 / -20% | P40 / -3% | excluded (not open) | excluded (not open) | P40 / -11% | |
| Our pct / vs wider median | | | | P20 / -10% | P50 / -6% | excluded (not open) | P27 / -9% | P40 / -3% | excluded (not open) | excluded (not open) | P36 / -11% | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) 27 Nov | Tue 1 Dec–Thu 3 Dec (2n) | Wed 2 Dec–Thu 3 Dec (1n) | Fri 4 Dec–Sun 6 Dec (2n) | Sun 6 Dec–Wed 9 Dec (3n) | Sun 6 Dec–Sat 12 Dec (6n) | Wed 9 Dec–Sat 12 Dec (3n) | Fri 25 Dec–Sun 27 Dec (2n) | Sun 27 Dec–Tue 29 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.64 (14) | n/a | n/a | n/a | £364 | n/a | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.72 (25) | £296 | n/a | n/a | £296 | n/a | n/a | n/a | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | n/a | n/a | £302 | n/a | n/a | n/a | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | £354 (-2%) | n/a | n/a | n/a | n/a | £403 | n/a | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (54) | n/a | n/a | £1,008 | £792 (-21%) | £846 (-11%) | n/a (was £972) | n/a | £1,188 | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | £771 | £557 | £540 (+5%) | £589 (+8%) | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | n/a | n/a | n/a (was £563) | n/a | £782 | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.6 (25) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £724 | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | n/a (was £383) | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (89) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| **Kept median (n)** | | | | £325 (2) | – (0) | £889 (2) | £364 (5) | £693 (2) | £496 (2) | – (0) | £782 (3) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £388 (46) | £470 (23) | £1,091 (12) | £456 (42) | £540 (29) | £549 (47) | £753 (33) | £782 (25) | |
| **Ours, room/night (status, min)** | | | | £290 Booked/Open, min 1/3 | £294 Open, min 1 | £342 Booked, min 3 | £313 Open, min 3 | £317 Open, min 3 | £321 Open, min 3 | £437 Blocked, min 4 | £508 Blocked, min 3/4 | |
| **Ours, comparable basis** | | | | £305 | £374 obs | £349 | £303 obs | £284 obs | £308 obs | £427 | £521 | obs = own Airbnb card; else 0.83/0.900 × Smoobu + £129/n |
| **Our pct / vs kept median** | | | | excluded (not open) | n = 0 | excluded (not open) | P40 / -17% | P0 / -59% | P0 / -38% | excluded (not open) | excluded (not open) | |
| Our pct / vs wider median | | | | excluded (not open) | P35 / -20% | excluded (not open) | P14 / -34% | P7 / -47% | P9 / -44% | excluded (not open) | excluded (not open) | |

### SEG

| Airbnb id | Dist km | Sleeps | Rating (reviews) 27 Nov | Tue 1 Dec–Thu 3 Dec (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Thu 10 Dec–Sun 13 Dec (3n) | Sat 12 Dec–Tue 15 Dec (3n) | Wed 16 Dec–Sun 20 Dec (4n) | Fri 25 Dec–Sun 27 Dec (2n) | Sat 26 Dec–Wed 30 Dec (4n) | Sun 27 Dec–Tue 29 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1633989864851131941](https://www.airbnb.co.uk/rooms/1633989864851131941) | 0.35 | 6 | 4.88 (43) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | cinema room, garden, Guest favourite |
| [1498503422089605343](https://www.airbnb.co.uk/rooms/1498503422089605343) | 0.43 | 7 | 4.84 (25) | £347 | n/a | £374 (-3%) | £370 (-3%) | n/a | n/a | n/a | n/a | ground floor, refurbished (title), Superhost |
| [6620546](https://www.airbnb.co.uk/rooms/6620546) | 0.62 | 6 | 4.92 (315) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | 4-acre garden, Guest favourite, Superhost |
| [1548502477554034012](https://www.airbnb.co.uk/rooms/1548502477554034012) | 0.62 | 6 | 4.91 (33) | n/a | n/a | n/a | n/a | n/a | n/a | £780 (-2%) | n/a | 2 bath, A/C, Guest favourite (title says sleeps 8; page capacity 6), Superhost |
| [11056472](https://www.airbnb.co.uk/rooms/11056472) | 0.72 | 6 | 4.26 (23) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Marylebone (title) |
| [52560423](https://www.airbnb.co.uk/rooms/52560423) | 0.8 | 6 | 4.9 (378) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite, Superhost |
| [1165719843393058533](https://www.airbnb.co.uk/rooms/1165719843393058533) | 0.82 | 6 | 4.79 (24) | n/a | n/a | £581 | £551 | n/a | n/a | n/a | n/a | Little Venice (title), Superhost |
| [897028868119653426](https://www.airbnb.co.uk/rooms/897028868119653426) | 0.87 | 6 | 4.65 (23) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | family home near Little Venice (title) |
| [1269544547244432855](https://www.airbnb.co.uk/rooms/1269544547244432855) | 0.89 | 6 | 4.7 (61) | £496 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | A/C, rooftop (title) |
| [1064528274936916938](https://www.airbnb.co.uk/rooms/1064528274936916938) | 0.91 | 6 | 4.81 (26) | £584 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | by Paddington station (title) |
| [40810873](https://www.airbnb.co.uk/rooms/40810873) | 0.93 | 6 | 4.95 (91) | £360 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | penthouse, Little Venice (title), Superhost; ADDED 27 Nov replacing 1648663792586887168 (HTTP 410) |
| **Kept median (n)** | | | | £428 (4) | – (0) | £478 (2) | £461 (2) | – (0) | – (0) | £780 (1) | – (0) | |
| Wider: same bedrooms, rated, ≤1.0 km (n) | | | | £386 (8) | – (0) | £492 (5) | £445 (5) | £520 (7) | £600 (3) | £673 (6) | £600 (5) | |
| **Ours, room/night (status, min)** | | | | £314 Blocked, min 2 | £408 Blocked, min 3 | £372 Open, min 3 | £397 Open, min 2/3 | £452 Open, min 3 | £502 Booked/Open, min 4 | £582 Open, min 4/5/7 | £575 Open, min 5/7 | |
| **Ours, comparable basis** | | | | £314 | £408 | £372 | £397 | £452 | £502 | £582 | £575 | PriceLabs room (not in Smoobu); cleaning NOT CHECKED, not added |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | P0 / -22% | P50 / -14% | n = 0 | excluded (not open) | P0 / -25% | n = 0 | |
| Our pct / vs wider median | | | | excluded (not open) | excluded (not open) | P20 / -24% | P40 / -11% | P29 / -13% | excluded (not open) | P50 / -14% | P40 / -4% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) 27 Nov | Tue 1 Dec–Thu 3 Dec (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Fri 25 Dec–Sun 27 Dec (2n) | Sun 27 Dec–Tue 29 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | £202 | n/a | n/a | £252 | £252 | n/a | n/a | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | £352 | £352 | £352 | n/a (was £352) | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | n/a | n/a (was £246) | £246 | n/a (was £253) | £334 | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | £232 | n/a | £302 | £302 | £302 | £352 | n/a | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a (was £232) | n/a | £302 | £302 | n/a | n/a | £302 | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 4.92 (13) | n/a | n/a | n/a | £290 | £290 | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.71 (28) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (21) | n/a | n/a | £216 | n/a | n/a | £235 | n/a | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | n/a | £241 | £241 | £241 | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Kept median (n)** | | | | £218 (2) | – (0) | £302 (5) | £290 (7) | £290 (5) | £334 (3) | £328 (2) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £225 (14) | £342 (3) | £302 (17) | £247 (30) | £287 (22) | £352 (13) | £359 (18) | |
| **Ours, room/night (status, min)** | | | | £450 Open, min 3 | £450 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3/4 | £450 Open, min 4 | £508 Open, min 3/4 | |
| **Ours, comparable basis** | | | | £450 | £450 | £450 | £450 | £450 | £450 | £508 | Smoobu room |
| **Our pct / vs kept median** | | | | P100 / +107% | n = 0 | P100 / +49% | P100 / +55% | P100 / +55% | P100 / +34% | P100 / +55% | |
| Our pct / vs wider median | | | | P100 / +100% | P100 / +32% | P100 / +49% | P100 / +82% | P100 / +57% | P92 / +28% | P100 / +41% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) 27 Nov | Tue 1 Dec–Thu 3 Dec (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Fri 25 Dec–Sun 27 Dec (2n) | Sun 27 Dec–Tue 29 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.5 (18) | £186 (+9%) | n/a | n/a (was £174) | £176 | n/a (was £176) | £206 | n/a | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (53) | n/a | n/a | n/a | n/a (was £252) | n/a (was £293) | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | £212 | £245 | £218 (+2%) | £224 (+15%) | £244 | £244 | £262 | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (89) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.68 (63) | n/a | n/a | n/a | £184 (-3%) | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.43 (170) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.76 (29) | £228 | n/a | n/a (was £228) | n/a | n/a | n/a | n/a | none listed |
| **Kept median (n)** | | | | £212 (3) | £245 (1) | £218 (1) | £184 (3) | £244 (1) | £225 (2) | £262 (1) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £217 (4) | – (0) | £240 (3) | £178 (8) | £215 (5) | £280 (7) | £285 (2) | |
| Ours | | | | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | |

Data gaps:
- **Booking.com live prices: NOT CHECKED** (AWS WAF; not attempted, not bypassed). P11 is compared at list price (Smoobu × 1.15 per policy, with × 1.10 shown alongside) + £149 ÷ n, not at the promoted price a guest sees.
- **Comp activity / calendars: NOT CHECKED.**
  - 19 kept ids were not returned on any stay today: 15 outside P06, plus 4 of the 12 P06 comps.
  - P17 975294297333089697 has been missing for 15 days and P05 912053248917940403 for 8.
  - Only SEG 1648663792586887168 was replaced, because its page returned HTTP 410. Its replacement, 40810873, was returned on 1 of 8 stays.
- **P06:**
  - The new review that took the rating from 4.58 to 4.38 has not been read (text and score NOT CHECKED; about 2 stars is an estimate).
  - Whether 6–12 Dec should be open is Corentin's call (policy intentional block; t-p06-0612open-2511).
  - Why the 2 Dec +25% DSO produces only +5% is NOT CHECKED.
  - The wider sets include listings at £1,000 or more, so trimmed medians are shown alongside.
- **SEG:**
  - Cleaning fee, OTA id, rating and reviews are NOT CHECKED (not in `id_map` or `policy`), so room-only figures are compared with all-in comps. The ~£50 a night cleaning used in the summary is an **estimate**.
  - Cause of the 28 Nov–9 Dec and 15 Dec blocks: NOT CHECKED.
  - Kept n is 0–4 on every stay.
- **P05:** kept n is 2 on 29 Nov–3 Dec and 1–3 Dec. Our card was not returned for 1–3 Dec, so that stay uses the derived basis (0.765 × Smoobu + £195 ÷ n). 1639043256346803626 (£805) is an outlier in the Valentine's set.
- **P11 darts:** whether Corentin's 21 Oct darts raise / Reyhan's +5% override is still meant to be set is NOT CHECKED. Today the overrides show min-stay only.
- **Thin samples:**
  - P11: 8 Dec kept n 1.
  - P06: 9–12 and 6–12 Dec kept n 2.
  - P14: 4–6 Dec kept n 0.
  - P17: n 1–3.
- **Wider set** is not filtered to at least 10 reviews. Whether Airbnb comp prices include VAT: NOT CHECKED.
- **PriceLabs percentiles** are Nearby Listings summary-table room prices for an unspecified window, not the same dates (27 Nov):

| Listing | Band | P25 / P50 / P75 / P90 (n) |
|---|---|---|
| P05 | 4BR | 459 / 583 / 704 / 1,220 (90) |
| P06 | 2BR | 320 / 412 / 529 / 664 (217) |
| P11 | 2BR | 232 / 292 / 328 / 387 (172) |
| SEG | 3BR | 315 / 384 / 473 / 645 (148) |
| P14 | 1BR | 147 / 190 / 234 / 271 (171) |

  `market.csv` belongs to the market agent; nothing was written to it.
- **Refreshes 27 Nov 06:33–06:46Z (P05, SEG, P06, P11):** there was no listing-level edit in the 26–27 Nov log. Group and account logs were not pulled (PriceLabs lane), so the trigger is NOT CHECKED.
- **P17** is not in PriceLabs or Smoobu. **P08** is a handback and was not searched.
