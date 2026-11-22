# Competitor positioning: CENTRAL/NORTH (D = 2026-11-22)

**Method**
- **Policy read first** (`data/policy.json`). Not raised again: P06 intentional blocks (6 Dec on is blocked), P14 special setup (numbers only), Booking.com Visibility Booster, Booking.com promotion stacking, 15%/20% stay discounts, Booking.com markup (+15% from 18 Nov), derived rate plans, P08 handback (last night 13 Nov).
- **Comp ids: the same 49 as 18–21 Nov** (P05 6, P06 12, P11 12, P14 12, P17 7). **None replaced, none added.**
  - All 49 listing pages returned **HTTP 200** (checked 2026-11-22 07:22–07:24Z). Rating, review count and capacity were refreshed from each page; every kept comp has at least 12 reviews.
  - Four comps gained one review overnight: 1542960049319560709 (13 → 14, 4.54 → 4.50), 1263490105174331990 (64 → 65), 1688600915462932837 (20 → 21), 1582737718080351704 (28 → 29).
  - **Not returned on any stay today (12):** P06 1700204078606711134, 1420126228540342938, 1273781636585601427, 917140285217729256, 1315177393080154583, 673753763892997438, 1452940332365117153; P05 912053248917940403 (**3rd day**); P11 1515051936255130803 (2nd day); P14 1075245497252121738 (2nd day), 1659680062193836633; P17 975294297333089697 (**10th day**), 1242000869201075198 (2nd day).
  - Pages are live. Calendars were not probed, so "bookable in the next 60 days" is **NOT CHECKED** and no comp was replaced.
- **New set: SEG (Scott Ellis Gardens, PriceLabs 3588993, 3 bed / 2 bath, sleeps 6, NW8).** Reference positioning only: it is not in `id_map.json` or `policy.json` (t-scott-ellis-2011).
  - Built today from the 8 SEG searches. Criteria: Airbnb entire home, exactly 3 bedrooms, numeric rating, within 1.0 km of the PriceLabs pin (51.52829, −0.17617). Each candidate's page was then checked for capacity 5–7 and at least 10 reviews (23 pages, all HTTP 200, 07:24:45–07:25:31Z).
  - **11 ids kept** (table below). Excluded: 1283336868206417586 and 1423195425061586598 (sleep 8), plus 10 with 3–9 reviews (5 of them also sleep 8–9).
  - Only 2 of the 11 are inside NW8 proper (0.35 and 0.43 km). The rest are Little Venice / Maida Vale / Lisson Grove / north Marylebone (0.6–0.9 km).
  - Rows are labelled `SEG` in `comps.csv`. Use the same ids from tomorrow.
- **Searches:** 46 public Airbnb map searches on airbnb.co.uk (349 result pages, 4,462 cards), **checked 2026-11-22 07:20:59–07:28:09Z**. No parse failure and no bot challenge.
  - Filters, boxes and flat centres are unchanged: entire home, min bedrooms = ours, adults P05 7 / P06 5 / P11 5 / P14 3 / P17 3 / SEG 6.
  - "Wider" = same bedroom count exactly, a numeric rating, within 1.25 km (SEG 1.0 km). Search cards carry no review count, so **the wider set is NOT filtered to at least 10 reviews**.
  - Scripts: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c22s/`. Raw results: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c22/search/*.json`. Analysis: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c22/analysis.json`.
- **Stays priced for every comp and for us:**
  - Defaults: Fri 27–Sun 29 Nov (next Fri–Sun), Tue 24–Thu 26 Nov (midweek) and **Tue 22–Thu 24 Dec (30 days out)**. Mon 21–Wed 23 Dec is repeated for P05/P11 for the trend.
  - Brief stays:
    - P05: **13–17 Feb 2027 (reopened)**, 7–9 Dec, 13–15 Dec, 29 Nov–3 Dec.
    - P06: 29 Nov–5 Dec, plus its halves 29 Nov–2 Dec and 2–5 Dec.
    - P11: **30 Nov–4 Dec** (and 30 Nov–2 Dec for the trend), darts 14–19 Dec (plus 15–18 / 17–19 Dec), 8–9 Dec, 23–26 Dec, 3–6 Jan.
    - SEG: 29 Nov–2 Dec, 4–7 Dec, 12–15 Dec, **Christmas 24–27 Dec** and **NYE 30 Dec–3 Jan** (4 n; 30–31 Dec carry min 4).
    - P14/P17: 7–9, 14–16 and 17–19 Dec.
- **Our prices:**
  - From `data/snapshots/2026-11-22/prices.csv` (Smoobu = PriceLabs on every central night checked). Booked/open status is from Smoobu `reservations.csv` (confirmed stays only).
  - **SEG has no Smoobu price** in the snapshot. Its PriceLabs `price` (= user_price on open nights) is used as the room rate.
  - **P05 13–17 Feb** is beyond the 60-day file. I used PriceLabs `get_listing_prices` 10–18 Feb (Your Price £438 / £410 / £407 / £421, avg £419) **plus our own Airbnb card in the same search**.
- **Price basis:**
  - Comps = Airbnb total ÷ nights, after offers, **cleaning included**, taxes excluded.
  - P05 and P06 use our own Airbnb card ("obs"). Card factors today: P05 0.765 on Dec stays and **0.882 on 13–17 Feb** (vs the PriceLabs Your Price, which may not be what Smoobu holds for those nights; see gaps). P06 0.825–0.835.
  - P11 (Booking.com only) = **list all-in = Smoobu × 1.15 + £149 ÷ n**, before promotions. Booking.com live: **NOT CHECKED** (AWS WAF; not attempted, not bypassed).
  - **SEG = PriceLabs room only.** Its cleaning fee and OTA channel are NOT CHECKED, so SEG's all-in position is higher than shown by its cleaning ÷ n.
- **PriceLabs (read-only, one call at a time, 3 calls):**
  - `get_user_logs` (listing, 20–22 Nov; P05, P06, P11, P14, SEG) returned 33 entries, all from Reyhan. **No edit on P05/P06/P11/P14 after 20 Nov 22:52:57Z.** Yesterday's 11 edits stand.
  - SEG edits:
    - 20 Nov 17:29–17:35Z: base 285 (custom) → 265 (source "bph-market") → 285 → 295; min 170, max 4,000; sync ON; min-stay DSOs 27 Dec (7), 28 Dec (5), 29–31 Dec (4).
    - 21 Nov 12:46Z: min-stay-only DSOs (no price) on 29 Nov–4 Jan.
    - **21 Nov 19:33Z base 295 → 325, 19:36Z 325 → 425.**
  - `get_neighbourhood_data` SEG (Nearby Listings, room price, cleaning excluded, window unspecified): **3 BR P25 317 / P50 389 / P75 477 / P90 623 (n 148)**. 2 BR 229 / 291 / 387 / 540; 4 BR 457 / 561 / 628 / 1,579. Market prices on 26–31 Dec are 28.7% above the surrounding dates, and occupancy on 27 Dec–1 Jan is +21.5%.
  - `get_listing_prices` P05 10–18 Feb: **PriceLabs still shows 13–16 Feb as "Booked" (ADR £305, booked 15 Nov)**, last refreshed 21 Nov 09:45Z, so the overnight cancellation has not reached PriceLabs yet.
- **Rows written:** `data/snapshots/2026-11-22/comps.csv` was absent, so I copied it forward from 21 Nov under `flock .comps.csv.lock` (10,908 data rows). I then appended **825 rows** under the same lock: 144 kept (incl. SEG), 641 wider, 40 `:ours`. The file now has 11,733 data rows, all with 11 fields.
  - One blank line from my append was removed under the lock straight away.
  - Every row records platform, URL, stay, adults, basis (cleaning included or not), check time and set.
  - 50 of the 825 rows are labelled `SEG` / `SEG:ours`.

## Overnight: no new edits; the 21 Nov daytime refresh moved our prices (prices.csv 21 Nov vs 22 Nov, open nights)
- **No PriceLabs edit on P05/P06/P11/P14 since 20 Nov 22:52:57Z** (`get_user_logs`). Yesterday's confirm-or-revert items stand unchanged: P05 29 Nov–2 Dec −5%, 7–8 Dec −1%, 13–14 Dec 0%, 4–31 Jan −8%; P11 2 Jan–28 Feb −8%, darts 14–15 Dec −2%.
- The refresh after yesterday's snapshot (21 Nov 09:42–09:45Z) still cut prices:
  - **P05:** −£37 over 27 nights. **7–8 Dec £467 / £450 → £449 / £430** and **13–14 Dec £497 / £482 → £471 / £461**. 21 Dec went £2,010 → £2,109 and 29 Dec £2,398 → £2,422. January fell £2–£23 a night.
  - **P06:** −£28 over 8 nights. The 7-night run 29 Nov–5 Dec went £2,239 → **£2,217**.
  - **P11:** −£248 over 35 nights. **23–25 Dec £285 / £256 / £267 → £266 / £242 / £251.** 3–20 Jan fell £7–£18 a night (e.g. 3 Jan £166 → £157). 18 Dec went £313 → £324.
  - **P14:** −£188, all on 25 Dec–2 Jan (e.g. 31 Dec £691 → £661). £450 flat to 24 Dec.
- **SEG:** today's prices are the first since the base went to 425 (refreshed 21 Nov 19:37Z). Open nights run £252–£555. Many are still below the 3 BR P50 (£389) despite the 425 base.

## Summary

| Ref | Comps kept (n per stay) | Our pct vs kept, open stays | Rating ours vs kept median; review gap | Booked vs market, next 30 / 60 | Supported positioning |
|---|---|---|---|---|---|
| **P11 2BR** | 12 (0–9) | **P14–P40 (−16% to −21%)** on 30 Nov–4 Dec, darts, 15–18 Dec, 23–26 Dec, 3–6 Jan. P50 on 24–26 Nov (−10%, n 2) and 17–19 Dec (−2%). **8 Dec P100 (+53%)** | Booking.com only vs Airbnb kept 4.685 (36.5): not comparable; gap NOT CHECKED | 46.7% (14/30) vs 51%; 38.3% (23/60) vs 38% | `quality_premium` = 0, so **0% vs the median on list all-in**. `recommend` → **raise +5%** at P14–P43; hold at P50–P100. Median-level Smoobu room: **30 Nov–4 Dec £212–£240** (ours £196); **darts £278–£322** (£248); **23–26 Dec £281–£319** (£253); **3–6 Jan £194–£221** (£169). |
| **P05 4BR** | 6 (0–5) | **P0–P33 (−3% to −16%)**; **13–17 Feb P20 / −10%** | **4.79 (38)** vs 4.50 (17); **+21 reviews** | **70.0% (21/30) vs 49%**; 55.0% (33/60) vs 40% | `quality_premium` **+0.116**, so **+12% vs median**. `recommend` → **raise +21.6%**. Smoobu room about **£591 (29 Nov–3 Dec), £623 (7–9 Dec), £557 (13–15 Dec), £536 (13–17 Feb)**. At minimum the median: £523 / £545 / £486 / £474. |
| **P06 2BR** | 12 (0–3) | **29 Nov–2 Dec P0 / −18%** (n 3); wider P17 / −23% (n 46); 6-night run wider P7 / −48% (skewed) | 4.58 (12) vs 4.63 (26); **−14 reviews** | 35.7% (5/14 non-blocked) vs 52%; PriceLabs 73% vs 52% | `quality_premium` −0.02, so **−2% vs median**: about **£351 (kept) – £381 (wider) Smoobu room on 29 Nov–1 Dec**, against today's £287 avg (+22% to +33%). `recommend` → raise +10% on PriceLabs occupancy, fix-listing on Smoobu occupancy (the run only reopened 20 Nov). **Step up at least +10% now.** |
| **SEG 3BR** (reference) | 11 new (0–5) | **29 Nov–2 Dec P0 / −25%; 12–15 Dec P0 / −19%** (wider −11%); 22–24 Dec P33 / −2%; **Christmas 24–27 Dec −18% vs wider (n 9); NYE 30 Dec–3 Jan −31% vs wider (n 6)**; 4–7 Dec n = 0 | No reviews or rating found (no OTA listing id on record) vs 4.84 (26); **−26 reviews** (NOT CHECKED) | PriceLabs 37% vs 45% / 20% vs 35% (counts its 10 blocked nights; no SEG reservation in the Smoobu extract) | `quality_premium` = 0 (no rating), so **0% vs median at most**. `recommend` on PriceLabs occupancy → fix-listing (behind market at P0; the occupancy reading is unreliable). Supported: **hold 22–24 Dec; raise Christmas toward about £525 and NYE toward about £730 all-in** (room = those less our cleaning ÷ n). Near dates: up to the median, not above. |
| P08 2BR | not searched | n/a | – | handback 13 Nov | Moot (policy handback). |
| P14 1BR | 12 (0–7) | P100 | not on Airbnb; kept median 4.885 (20) | 0% vs 48% / 35% | Numbers only (special setup): **+34% to +145% vs kept median, +35% to +73% vs wider**. £450 is +131% vs PriceLabs 1 BR P50 (£195, 21 Nov). |
| P17 1BR | 7 (0–3) | n/a | kept median 4.68 (52) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (same kept ids, repeated stays):**
- **P05 13–15 Dec kept median £517 → £469 and 7–9 Dec £544 → £515.** 1639043256346803626 (4.90, Superhost) cut 13% to £450 on both stays. Ours fell too (Smoobu £489.50 → £466 and £458.50 → £439.50), so we stay at P20 / P0. 29 Nov–3 Dec is flat (£449, n 3).
- **P06 29 Nov–2 Dec kept £428 → £343** (n 4 → 3): 917140285217729256 (£501) and 1452940332365117153 (£323) dropped out, 744585770789956203 came back at £296, and 1399094207699964827 is −5%. Wider £408.50 → £368.50 (n 42 → 46). Ours £288 → £287. The gap therefore narrowed from −38% to −18% (kept) and from −36% to −23% (wider) **because the market fell, not because we moved.**
- **P11 is flat to slightly up in December.** Darts 14–19 Dec £390 → £400 (n 6 → 7); 23–26 Dec £404 → £417; 17–19 Dec £412; 3–6 Jan £304 (n 7 → 9). 24–26 Nov wider £260 → £252. The 30 Nov–2 Dec wider median fell £291 → £276 (P48 → P54).
- **P14:** kept 14–16 Dec £271 → £296 and 17–19 Dec £271 → £290; 7–9 Dec £302 (n 7). Ours flat at £450.
- **P17:** flat (7–9 Dec £224 → £223, 14–16 Dec £212 → £208).

## P11 Camden (3064196; Booking.com only)

| Open nights (stay priced) | Ours room avg (21 Nov) | List all-in ×1.15 (×1.10) | Kept median (n) | **Pct / vs kept** | Wider median (n); pct / vs wider | Median-level Smoobu room* kept / wider |
|---|---|---|---|---|---|---|
| 24–25 Nov (24–26 Nov, midweek default) | £193.50 (£198.50) | £297.02 (£287.35) | £330.00 (2) | P50 / −10% | £252.00 (17); P71 / +18% | £222 / £154 |
| 30 Nov–1 Dec (30 Nov–2 Dec) | £183.00 (£183.00) | £284.95 (£275.80) | £340.00 (8) | P38 / −16% | £276.00 (39); P54 / +3% | £231 / £176 |
| **30 Nov–3 Dec** (30 Nov–4 Dec, 4n, min 2) | **£196.25** | £262.94 (£253.13) | **£314.00 (5)** | **P40 / −16%** | £282.00 (26); P42 / −7% | **£240 / £212** |
| **8 Dec** (8–9 Dec, 1n, min 1) | £305 (£309) | £499.75 (£484.50) | £326.50 (2) | **P100 / +53%** | £350.00 (10); P100 / +43% | £154 / £175 |
| **14–18 Dec, darts** (14–19 Dec, 5n) | **£248.40 (£246.80)** | £315.46 (£303.04) | **£400.00 (7)** | **P14 / −21%** | £349.00 (44); P43 / −10% | **£322 / £278** |
| 15–17 Dec (15–18 Dec) | £233.33 (£234.00) | £318.00 | £388.00 (5) | P0 / −18% | £340.00 (50); P42 / −6% | £294 / £252 |
| 17–18 Dec (17–19 Dec) | £287.50 (£282.50) | £405.12 | £412.00 (8) | P50 / −2% | £385.00 (35); P57 / +5% | £294 / £270 |
| **23–25 Dec** (23–26 Dec, min 2) | **£253.00 (£269.33)** | £340.62 (£327.97) | **£417.00 (7)** | **P14 / −18%** | £373.00 (42); P38 / −9% | **£319 / £281** |
| **3–5 Jan** (3–6 Jan, min 3, −8% DSO) | **£169.33 (£179.00)** | £244.40 (£235.93) | **£304.00 (9)** | **P22 / −20%** | £273.00 (61); P39 / −11% | **£221 / £194** |

\* Median-level Smoobu room = (median − £149 ÷ n) ÷ 1.15. This is the Smoobu rate whose Booking.com list plus cleaning equals the comp median, before promotions. Stacked promotions come on top (policy; their size is the channel lane).

Not open, so excluded: 27–29 Nov (booked; wider £363, n 6, ours list P50 / +0%), 21–23 Dec and 22 Dec (booked).

- **30 Nov–4 Dec (open since Thursday's cancellation):** −16% vs kept (n 5), −7% vs wider (n 26). `recommend` → raise +5%. Supported: **median level, about £212–£240 Smoobu room**, which is +8% to +22% on £196.25.
- **Darts 14–19 Dec:** −21% vs kept (n 7), −10% vs wider (n 44), flat on our side (£246.80 → £248.40). Comps support about **£278 (wider) – £322 (kept) room**, +12% to +30%. The −2% DSO on 14–15 Dec is already with Corentin as confirm-or-revert (vs `darts_override_24oct`); status unchanged, no new proposal.
- **8 Dec:** still +53% / +43% for a 1-night gap between two Booking.com stays (5–8 and 9–14 Dec). Supported: about **£154–£175 room**. The +50% DSO is open item t-p11-8dec-orphan (not new).
- **23–26 Dec: our room fell 6% overnight (£269 → £253)** while the kept median rose £404 → £417. Now −18% / −9%. Supported: about **£281–£319 room** (+11% to +26%).
- **3–6 Jan:** −20% vs kept / −11% vs wider, and the engine cut another 5% overnight (£179 → £169). Supported: **£194–£221 room** (+15% to +31%). Reyhan's −8% (2 Jan–28 Feb) is already confirm-or-revert; the evidence goes against it.
- **Positioning:** `quality_premium` = 0. `recommend(0.467, 0.51, pct, 0)` and `recommend(0.47, 0.51, pct, 0)` both give **raise +5%** at P14–P43 and **hold** at P50–P100. **Supported: comp median (0%) on list all-in.**
- **Differentiators:** basement with patio, no lift. 4 of 12 comps have a lift and 3 a balcony or terrace. 2557770 has 181 reviews; 654396087724294901 is a Superhost.

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272)

| Open nights (stay) | Smoobu room (21 Nov) | Guest sees on Airbnb, all-in/night | Kept median (n) | Pct / vs kept | Wider median (n); pct / vs wider | Supported −2% vs median → Smoobu at 0.835 |
|---|---|---|---|---|---|---|
| **29 Nov–1 Dec** (29 Nov–2 Dec, 3n, min 3) | £286 / £271 / £304 (£283 / £272 / £309) | **£282.67 obs** (0.835) | **£342.67 (3)** | **P0 / −18%** | **£368.50 (46); P17 / −23%** | **£351 (kept) – £381 (wider)** |
| 2–4 Dec (2–5 Dec) | £316 / £323 / £358 (£322 / £330 / £362) | £317.33 obs (0.825) | n = 0 | – | £603.17 (24); P8 / −47% | £664 (skewed) |
| **29 Nov–5 Dec** (6n) | £309.67 avg (7 nights incl. 5 Dec: **£2,217**, was £2,239) | **£278.50 obs** (0.83) | n = 0 | – | £535.25 (14); P7 / −48% | £606 (skewed) |

- **Still at the bottom of the market, but the gap narrowed because comps fell.** Kept 29 Nov–2 Dec: 744585770789956203 £296, 1399094207699964827 £343, 1259401393497276633 £484. Our card at £282.67 is below all three.
- The 2–5 Dec and 6-night wider medians (£603 / £535) are again skewed by what is still available. The supported level rests on **29 Nov–2 Dec** (kept n 3, wider n 46).
- **PriceLabs 2 BR (21 Nov, room):** P25 £322, P50 £418. Ours £271–£359 is below P25 on 4 of the 7 nights.
- **Positioning:** `quality_premium(4.58, 4.63)` = −0.02.
  - `recommend(0.357, 0.52, 0.0, −0.02)` → fix-listing. `recommend(0.73, 0.52, 0.0, −0.02)` (PriceLabs occupancy) → **raise +10%**.
  - Smoobu occupancy counts these 7 nights as unsold although they only reopened on 20 Nov, so "behind market" is not yet a conversion signal.
  - **Supported: −2% vs median = £351–£381 Smoobu room on 29 Nov–1 Dec (+22% to +33% on £287).** With kept n = 3 and a 7-day lead, the defensible move is **at least +10%** (about £316 average), which is still below every kept comp returned.
- 6 Dec on is blocked (policy intentional): excluded and not raised. 24–29 Nov is booked.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Gap (stay) | Smoobu room/night (21 Nov), min | Ours, Airbnb all-in/night | Kept median, 6 ids (n) | Pct / vs median | Wider 4BR ≤1.25 km (n) | +11.6% supported → Smoobu room; median-level |
|---|---|---|---|---|---|---|
| 29 Nov–2 Dec (29 Nov–3 Dec, min 3, DSO −5%) | £491 / £475 / £469 / £498 (£493 / £477 / £472 / £495) | £418.50 obs | £449.00 (3) | P33 / −7% | £449.00 (7): −7% | about **£591**; median-level about **£523** |
| **7–8 Dec** (7–9 Dec, min 2, DSO −1%) | **£449 / £430** (£467 / £450) | £434.00 obs | £514.75 (4) | **P0 / −16%** | £453.00 (10): −4% | about **£623** (kept) / £533 (wider); median-level £545 / £464 |
| **13–14 Dec** (13–15 Dec, min 2, DSO 0%) | **£471 / £461** (£497 / £482) | £454.00 obs | £469.00 (5) | P20 / −3% | £477.25 (10): −5% | about **£557–£569**; median-level £486–£496 |
| **13–16 Feb, Valentine's (13–17 Feb, 4n, min 4; reopened)** | PriceLabs Your Price **£438 / £410 / £407 / £421** (avg £419); uncustomized £495 / £434 / £454 / £465 | **£418.25 obs (£1,673 total; card returned, so bookable on Airbnb)** | **£467.00 (5)** | **P20 / −10%** | £448.50 (10): −7% | about **£536** (kept) / £512 (wider); median-level **£474 / £453** |

- **Valentine's 13–17 Feb (reopened by the overnight cancellation):**
  - The cancelled stay paid £1,219.98 room (£305/night) + £195 cleaning = £353.75 all-in/night. Today's card is £418.25 (+18%), still −10% vs kept and −7% vs wider. Kept comps for the stay: 1610095240357069208 £392, 1363636555926649515 £423, 1606112160333193293 £467, 1481043902711346984 £554, 1639043256346803626 £853.
  - **PriceLabs still treats 13–16 Feb as booked** (`get_listing_prices`: "Booked", ADR £305, last refresh 21 Nov 09:45Z). Its Your Price there is not being used as the live rate, so the £418.25 card comes from whatever Smoobu holds (NOT CHECKED). The implied factor is 0.882, against 0.765 on December stays.
  - Supported: +12% vs median, about £536 room (£512 on wider). At minimum the median, about £474. The uncustomized PriceLabs average (£462) also sits above the £419 Your Price.
- **The thin December set got cheaper overnight** (1639043256346803626 −13%), and our room fell £18–£26 a night. Positions are unchanged: P0 (7–9 Dec), P20 (13–15 Dec), P33 (29 Nov–3 Dec).
- **Reyhan's 20 Nov edits** (29 Nov–2 Dec −5%, 7–8 Dec −1%, 13–14 Dec 0%, 4–31 Jan −8%) are already confirm-or-revert. No change since; the comp evidence still points the other way (`recommend` raise +21.6%).
- **21 Dec (1n, +300% DSO) is now £2,109 (was £2,010).** That is +90% vs kept and +116% vs wider on 21–23 Dec (n 2 / 6). Open action a-p05-dec; not raised as new.
- **Positioning:** `quality_premium(4.79, 4.50)` = **+0.116**. `recommend(0.70, 0.49, 0.0–0.33, 0.116)` and `recommend(0.73, 0.49, …)` → **raise +21.6%**. **Supported: +12% vs median.**
- **Differentiators:** 912053248917940403 (4.97, Superhost, lift, park view; not returned for the 3rd day) and 1639043256346803626 (4.90, Superhost, terrace, parking) are the quality peers. Ours: Abbey Road location; no parking or terrace on record (NOT CHECKED on the page).

## SEG Scott Ellis Gardens 3-bed (PriceLabs 3588993; NW8; reference positioning only)

| Open nights (stay) | PriceLabs room/night (min) | Kept median (n) | Pct / vs kept | Wider 3BR ≤1.0 km (n) | Pct / vs wider | Comp all-in median → room headroom |
|---|---|---|---|---|---|---|
| **29 Nov–1 Dec** (29 Nov–2 Dec) | £318 / £301 / £289 = **£302.67** (min 3/2) | £403.17 (4) | **P0 / −25%** | £403.17 (6) | P0 / −25% | median less cleaning ÷ 3 |
| 4–6 Dec (4–7 Dec) | £379 / £401 / £369 = £383.00 | n = 0 | – | £746.67 (1) | n = 1 | no evidence |
| **12–14 Dec** (12–15 Dec) | £409 / £355 / £335 = **£366.33** | £452.00 (3) | **P0 / −19%** | £410.33 (7) | P14 / −11% | £410–£452 less cleaning ÷ 3 |
| 22–23 Dec (22–24 Dec, 30-day default) | £419 / £410 = £414.50 | £425.00 (3) | P33 / −2% | £434.25 (8) | P38 / −4% | at median: hold |
| **Christmas 24–26 Dec** (24–27 Dec) | £415 / £420 / £454 = **£429.67** (min 3/4) | £734.67 (1) | n = 1 | **£525.33 (9)** | **P22 / −18%** | about £525 less cleaning ÷ 3 |
| **NYE 30 Dec–2 Jan** (30 Dec–3 Jan, 4n) | £555 / £555 / £469 / £444 = **£505.75** (min 4/3) | £789.25 (1) | n = 1 | **£730.38 (6)** | **P17 / −31%** | about £730 less cleaning ÷ 4 |

- **Our figures are room only**, against comps that include cleaning. SEG's real gap is therefore smaller by its cleaning ÷ n (fee NOT CHECKED).
- **PriceLabs 3 BR (room, cleaning excluded):** P25 £317, P50 £389, P75 £477, P90 £623.
  - 29 Nov–1 Dec (£289–£318) is at or below P25. 12–14 Dec straddles P50.
  - 22–24 Dec is at P50–P75. Christmas sits at P50–P75 and NYE between P75 and P90.
  - PriceLabs' own insight puts 26–31 Dec market prices 28.7% above the surrounding dates.
- **Base 425 vs engine output:** even after 295 → 425, only 19 Dec and 22 Dec–2 Jan reach £410–£555. The other open nights from 29 Nov to 21 Dec are £289–£409, so the base change has not lifted the near dates to the median.
- **Positioning:** no rating or review count found for SEG, so `quality_premium` = 0 and nothing supports a premium.
  - A new listing with 0 reviews against a kept median of 4.84 (26 reviews) can justify sitting below the median on near dates.
  - `recommend(0.37, 0.45, 0.0, 0)` → fix-listing. That reading is unreliable: PriceLabs' 37% includes its 10 blocked nights, and there is no SEG reservation in the Smoobu extract.
  - **Supported: up to the comp median, not above.** Hold 22–24 Dec (−2% / −4%). The clearest headroom is **NYE (−31% vs wider, n 6) and Christmas (−18%, n 9)**, where PriceLabs also flags a market surge. 12–15 Dec and 29 Nov–2 Dec are −11% to −25% but rest on n = 3–7.
- **Differentiators:** SEG is 3 bed / **2 bath** (bath counts for comps NOT CHECKED; only 1548502477554034012 states 2 baths). Comps with standout features: 6620546 (315 reviews, 4.92, 4-acre garden), 52560423 (377 reviews, 4.90), 1633989864851131941 (cinema room, garden; 0.35 km), 1269544547244432855 (A/C, rooftop). 7 of the 11 are Superhosts or Guest favourites.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- **Smoobu 22 Nov:** £450 on every night to 24 Dec (min 3–4). 25 Dec–2 Jan £450–£662, cut £188 in total overnight (28 Dec £655 → £624; 31 Dec £691 → £661; 1 Jan £616 → £594).
- **Booked:** 0% next 30 / 60 vs market 48% / 35% (pl_kpis). No P14 Smoobu reservation.
- **PriceLabs last refresh:** 21 Nov 07:17Z (`listings.csv`).
- **Vs kept median, P100 on every priced stay:**
  - 24–26 Nov **+145%** (n 1).
  - 7–9 Dec +49% (7); 14–16 Dec +52% (6); 17–19 Dec +55% (5).
  - **22–24 Dec +34% (5).**
  - 27–29 Nov: kept n = 0, wider +35% (n 5).
- Numbers only. The PriceLabs minimum of 450 (vs £500 in policy) is already in the confirm-or-revert list; not re-raised.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)
- **Kept medians:**
  - 24–26 and 27–29 Nov: n = 0.
  - 7–9 Dec £223 (2); 14–16 Dec £208 (3); 17–19 Dec £237 (3).
  - **22–24 Dec £236 (1).**
- Rating median 4.68 (52). 975294297333089697 has not been returned for 10 days (page HTTP 200, calendar NOT CHECKED). It is the first candidate to replace if its calendar proves closed.

## P08 Islington: handback
- Policy last night 13 Nov. Not searched; no rows written.

## Comp tables

**Source for every comp row:**
- Airbnb public search (airbnb.co.uk), checked 2026-11-22 07:20:59–07:28:09Z.
- Nightly = total ÷ nights, after offers, cleaning included, taxes excluded.
- Rating (reviews) and sleeps come from each listing page (07:22–07:25Z). Dist km is from 17 Nov (SEG: from the PriceLabs pin, 22 Nov).
- (±%) = change vs 21 Nov for the same stay. "n/a" = not returned (booked or min stay).
- "Ours" rows come from the 22 Nov snapshot (P05 Feb from PriceLabs `get_listing_prices`).
- Every priced row is in `data/snapshots/2026-11-22/comps.csv`.

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) 22 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 30 Nov–Wed 2 Dec (2n) | Mon 30 Nov–Fri 4 Dec (4n) | Tue 8 Dec–Wed 9 Dec (1n) | Mon 14 Dec–Sat 19 Dec (5n) | Tue 15 Dec–Fri 18 Dec (3n) | Thu 17 Dec–Sat 19 Dec (2n) | Mon 21 Dec–Wed 23 Dec (2n) | Tue 22 Dec–Thu 24 Dec (2n) | Wed 23 Dec–Sat 26 Dec (3n) | Sun 3 Jan–Wed 6 Jan (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.71 (31) | £408 (-4%) | n/a | £440 | £404 | n/a | £442 | n/a (was £451) | n/a | £560 | £580 | £555 | £273 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (181) | n/a | n/a | n/a | n/a | £400 | £351 | £363 | £388 | £388 | £388 | £392 | £305 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | £252 (-4%) | n/a | £413 | £401 | n/a | £407 | £416 | £490 | £526 | £544 | £520 | £304 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a (was £238) | n/a | £338 | n/a | n/a | £400 | £417 | £438 | £438 | £438 | £417 | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.5 (14) | n/a | n/a | £342 | n/a | n/a | £407 | n/a (was £416) | £490 | £526 | £544 | n/a | £247 | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.69 (13) | n/a | n/a | £358 | £314 | n/a | £382 | £388 | £460 | £508 | n/a | £501 | £415 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a | n/a | £262 | £231 | n/a | n/a (was £325) | £342 | £362 | n/a | n/a | £342 | £342 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.4 (65) | n/a | n/a | n/a | n/a | £253 | £262 | n/a (was £260) | £311 | n/a | n/a | n/a (was £307) | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.73 (88) | n/a | n/a | £210 | £202 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £195 | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (74) | n/a | n/a | n/a | n/a | n/a | n/a | n/a (was £192) | £234 | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.56 (39) | n/a (was £206) | n/a | £238 (+7%) | n/a | n/a | n/a | n/a | n/a | £298 (+1%) | £322 | £339 | £215 | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Kept median (n)** | | | | £330 (2) | – (0) | £340 (8) | £314 (5) | £326 (2) | £400 (7) | £388 (5) | £412 (8) | £508 (7) | £491 (6) | £417 (7) | £304 (9) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £252 (17) | £363 (6) | £276 (39) | £282 (26) | £350 (10) | £349 (44) | £340 (50) | £385 (35) | £429 (28) | £412 (32) | £373 (42) | £273 (61) | |
| **Ours, room/night (status, min)** | | | | £194 Open, min 2 | £251 Booked, min 2 | £183 Open, min 2 | £196 Open, min 2 | £305 Open, min 1 | £248 Open, min 2 | £233 Open, min 2 | £288 Open, min 2 | £252 Booked, min 4 | £250 Booked/Open, min 2/4 | £253 Open, min 2 | £169 Open, min 3 | |
| **Ours, comparable basis** | | | | £297 | £363 | £285 | £263 | £500 | £315 | £318 | £405 | £364 | £362 | £341 | £244 | list = Smoobu ×1.15 (policy) + £149/n |
| **Our pct / vs kept median** | | | | P50 / -10% | excluded (not open) | P38 / -16% | P40 / -16% | P100 / +53% | P14 / -21% | P0 / -18% | P50 / -2% | excluded (not open) | P17 / -26% | P14 / -18% | P22 / -20% | |
| Our pct / vs wider median | | | | P71 / +18% | excluded (not open) | P54 / +3% | P42 / -7% | P100 / +43% | P43 / -10% | P42 / -6% | P57 / +5% | excluded (not open) | P41 / -12% | P38 / -9% | P39 / -11% | |

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) 22 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Mon 21 Dec–Wed 23 Dec (2n) | Tue 22 Dec–Thu 24 Dec (2n) | Sat 13 Feb–Wed 17 Feb (4n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.15 (13) | n/a | n/a | £449 | £453 | £469 | n/a | £469 | £392 | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | n/a | n/a | £552 | £1,020 | £1,020 | n/a | n/a | £467 | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (30) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | £400 | n/a | £376 | n/a | £464 (-3%) | £592 | £574 | £423 | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.9 (30) | n/a | n/a | n/a | £450 (-13%) | £450 (-13%) | n/a | n/a | £853 | Superhost, parking listed, balcony/patio/terrace (house) |
| [1481043902711346984](https://www.airbnb.co.uk/rooms/1481043902711346984) | 1.16 | 8 | 4.76 (17) | n/a | n/a | n/a | £576 (+1%) | £589 | £801 | n/a | £554 | added 18 Nov |
| **Kept median (n)** | | | | £400 (1) | – (0) | £449 (3) | £515 (4) | £469 (5) | £696 (2) | £522 (2) | £467 (5) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £400 (3) | £1,048 (1) | £449 (7) | £453 (10) | £477 (10) | £612 (6) | £520 (6) | £448 (10) | |
| **Ours, room/night (status, min)** | | | | £514 Booked, min 3 | £556 Booked, min 4 | £483 Open, min 3 | £440 Open, min 2 | £466 Open, min 2 | £1,362 Booked/Open, min 1/3 | £614 Booked, min 3 | £419 Open, min 4 | |
| **Ours, comparable basis** | | | | £491 | £523 | £418 obs | £434 obs | £454 obs | £1,323 | £651 | £418 obs | obs = own Airbnb card in same search; else 0.765/0.900 × Smoobu + £195/n |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | P33 / -7% | P0 / -16% | P20 / -3% | P100 / +90% | excluded (not open) | P20 / -10% | |
| Our pct / vs wider median | | | | excluded (not open) | excluded (not open) | P29 / -7% | P20 / -4% | P20 / -5% | P100 / +116% | excluded (not open) | P30 / -7% | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) 22 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Sun 29 Nov–Wed 2 Dec (3n) | Sun 29 Nov–Sat 5 Dec (6n) | Wed 2 Dec–Sat 5 Dec (3n) | Tue 22 Dec–Thu 24 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.62 (13) | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.71 (24) | n/a | n/a | £296 | n/a | n/a | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | £275 | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | n/a | £343 (-5%) | n/a | n/a | £489 | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | n/a (was £354) | n/a | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (54) | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a (was £501) | n/a (was £537) | n/a (was £640) | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | £484 (-2%) | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.6 (25) | n/a (was £283) | n/a | n/a | n/a | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a (was £323) | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | n/a | n/a | n/a | n/a | £590 | parking listed |
| **Kept median (n)** | | | | £275 (1) | – (0) | £343 (3) | – (0) | – (0) | £539 (2) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £398 (25) | £1,276 (7) | £368 (46) | £535 (14) | £603 (24) | £494 (44) | |
| **Ours, room/night (status, min)** | | | | £298 Booked, min 3 | £348 Booked, min 3 | £287 Open, min 3 | £310 Open, min 3 | £332 Open, min 3 | £468 Blocked, min 3 | |
| **Ours, comparable basis** | | | | £311 | £353 | £283 obs | £278 obs | £317 obs | £486 | obs = own Airbnb card; else 0.83/0.900 × Smoobu + £129/n |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | P0 / -18% | n = 0 | n = 0 | excluded (not open) | |
| Our pct / vs wider median | | | | excluded (not open) | excluded (not open) | P17 / -23% | P7 / -48% | P8 / -47% | excluded (not open) | |

### SEG

| Airbnb id | Dist km | Sleeps | Rating (reviews) 22 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Sun 29 Nov–Wed 2 Dec (3n) | Fri 4 Dec–Mon 7 Dec (3n) | Sat 12 Dec–Tue 15 Dec (3n) | Tue 22 Dec–Thu 24 Dec (2n) | Thu 24 Dec–Sun 27 Dec (3n) | Wed 30 Dec–Sun 3 Jan (4n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1633989864851131941](https://www.airbnb.co.uk/rooms/1633989864851131941) | 0.35 | 6 | 4.88 (42) | £522 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | cinema room, garden, Guest favourite |
| [1498503422089605343](https://www.airbnb.co.uk/rooms/1498503422089605343) | 0.43 | 7 | 4.84 (25) | £336 | n/a | £309 | n/a | £452 | £425 | n/a | n/a | ground floor, refurbished (title), Superhost |
| [6620546](https://www.airbnb.co.uk/rooms/6620546) | 0.62 | 6 | 4.92 (315) | n/a | n/a | £376 | n/a | n/a | n/a | n/a | n/a | 4-acre garden, Guest favourite, Superhost |
| [1548502477554034012](https://www.airbnb.co.uk/rooms/1548502477554034012) | 0.62 | 6 | 4.91 (32) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £789 | 2 bath, A/C, Guest favourite (title says sleeps 8; page capacity 6), Superhost |
| [11056472](https://www.airbnb.co.uk/rooms/11056472) | 0.72 | 6 | 4.26 (23) | £414 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Marylebone (title) |
| [1648663792586887168](https://www.airbnb.co.uk/rooms/1648663792586887168) | 0.76 | 6 | 4.85 (13) | £400 | n/a | n/a | n/a | n/a | £400 | n/a | n/a | none in title, Superhost |
| [52560423](https://www.airbnb.co.uk/rooms/52560423) | 0.8 | 6 | 4.9 (377) | n/a | n/a | n/a | n/a | n/a | £444 | n/a | n/a | Guest favourite, Superhost |
| [1165719843393058533](https://www.airbnb.co.uk/rooms/1165719843393058533) | 0.82 | 6 | 4.79 (24) | £536 | n/a | n/a | n/a | £578 | n/a | £735 | n/a | Little Venice (title), Superhost |
| [897028868119653426](https://www.airbnb.co.uk/rooms/897028868119653426) | 0.87 | 6 | 4.64 (22) | n/a | n/a | n/a | n/a | £393 | n/a | n/a | n/a | family home near Little Venice (title) |
| [1269544547244432855](https://www.airbnb.co.uk/rooms/1269544547244432855) | 0.89 | 6 | 4.7 (61) | n/a | n/a | £431 | n/a | n/a | n/a | n/a | n/a | A/C, rooftop (title) |
| [1064528274936916938](https://www.airbnb.co.uk/rooms/1064528274936916938) | 0.91 | 6 | 4.81 (26) | n/a | n/a | £460 | n/a | n/a | n/a | n/a | n/a | by Paddington station (title) |
| **Kept median (n)** | | | | £414 (5) | – (0) | £403 (4) | – (0) | £452 (3) | £425 (3) | £735 (1) | £789 (1) | |
| Wider: same bedrooms, rated, ≤1.0 km (n) | | | | £414 (5) | – (0) | £403 (6) | £747 (1) | £410 (7) | £434 (8) | £525 (9) | £730 (6) | |
| **Ours, room/night (status, min)** | | | | £324 Blocked, min 3 | £398 Blocked, min 4 | £303 Open, min 2/3 | £383 Open, min 2/3 | £366 Open, min 2/3 | £414 Open, min 3 | £430 Open, min 3/4 | £506 Open, min 3/4 | |
| **Ours, comparable basis** | | | | £324 | £398 | £303 | £383 | £366 | £414 | £430 | £506 | PriceLabs room (not in Smoobu); cleaning NOT CHECKED, not added |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | P0 / -25% | n = 0 | P0 / -19% | P33 / -2% | P0 / -42% | P0 / -36% | |
| Our pct / vs wider median | | | | excluded (not open) | excluded (not open) | P0 / -25% | P0 / -49% | P14 / -11% | P38 / -4% | P22 / -18% | P17 / -31% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) 22 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Tue 22 Dec–Thu 24 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | n/a | n/a | £252 | n/a (was £252) | £302 | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | £352 | £352 | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | n/a | £246 | n/a (was £246) | £253 | £334 | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a (was £172) | n/a | £302 | £302 | £302 | n/a | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | n/a | £302 | £302 | n/a | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 4.92 (13) | n/a | n/a | n/a | £290 | £290 | n/a | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.71 (28) | n/a (was £368) | n/a | £402 | n/a | n/a | £402 | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (21) | n/a | n/a | £244 | n/a | n/a | £237 | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (19) | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | n/a | £241 | £241 | £241 | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | £184 | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Kept median (n)** | | | | £184 (1) | – (0) | £302 (7) | £296 (6) | £290 (5) | £334 (5) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £266 (13) | £332 (5) | £302 (23) | £260 (28) | £295 (21) | £314 (21) | |
| **Ours, room/night (status, min)** | | | | £450 Open, min 3 | £450 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3/4 | £450 Open, min 3 | |
| **Ours, comparable basis** | | | | £450 | £450 | £450 | £450 | £450 | £450 | Smoobu room |
| **Our pct / vs kept median** | | | | P100 / +145% | n = 0 | P100 / +49% | P100 / +52% | P100 / +55% | P100 / +34% | |
| Our pct / vs wider median | | | | P100 / +69% | P100 / +35% | P100 / +49% | P100 / +73% | P100 / +52% | P100 / +43% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) 22 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Tue 22 Dec–Thu 24 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.5 (18) | n/a | n/a | n/a | £192 | £199 | n/a | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (52) | n/a | n/a | n/a | £252 | £293 | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | £217 (-2%) | n/a (was £203) | n/a | £236 | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.68 (63) | n/a | n/a | n/a | £208 (-2%) | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.43 (170) | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.76 (29) | n/a | n/a | £228 | n/a | £237 | n/a | none listed |
| **Kept median (n)** | | | | – (0) | – (0) | £223 (2) | £208 (3) | £237 (3) | £236 (1) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £200 (3) | – (0) | £214 (6) | £208 (7) | £236 (9) | £207 (2) | |
| Ours | | | | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | |

Data gaps:
- **Booking.com live prices: NOT CHECKED** (AWS WAF; not attempted, not bypassed). P11 is compared at list (Smoobu × 1.15 policy; × 1.10 alongside) + £149 ÷ n, not at the promoted price a guest sees.
- **P11 review count on Booking.com** is not in `listings.csv`: review gap NOT CHECKED, and `quality_premium` = 0 by construction.
- **P05 13–17 Feb:**
  - PriceLabs still shows the nights as Booked (last refresh 21 Nov 09:45Z).
  - The Smoobu rate for those nights is NOT CHECKED (beyond the 60-day file). The Airbnb card (£1,673 total) is the evidence of what a guest sees.
  - The 0.882 card factor is computed against the PriceLabs Your Price, not the Smoobu rate.
- **SEG:**
  - Not in `id_map`/`policy`.
  - No Smoobu price or reservations in the snapshot. Its 10 "Blocked" nights are unexplained here.
  - Cleaning fee, OTA channel/listing id, rating and reviews: NOT CHECKED. Room-only figures are compared with all-in comps.
  - 4–7 Dec has comp n = 1, and Christmas/NYE kept n = 1, so those rest on wider n = 6–9 that is not review-filtered.
- **Comp activity:** 12 kept ids were not returned on any stay today (P17 975294297333089697 for 10 days, P05 912053248917940403 for 3). All pages are HTTP 200. Calendars NOT CHECKED, so none was replaced.
- **Thin samples:**
  - P06 kept n = 0–3.
  - P05 n = 3–5, with the £1,020 / £853 outliers inside the medians.
  - P11 24–26 Nov and 8 Dec n = 2.
  - P14 24–26 Nov n = 1, 27–29 Nov n = 0; P17 n = 0–3.
- **P06 card factor** is 0.825–0.835 (P05 0.765 in Dec). Cause NOT CHECKED (channel lane).
- **Wider set** is not filtered to at least 10 reviews (cards carry no review count). Whether Airbnb comp prices include VAT: NOT CHECKED.
- **PriceLabs percentiles** are Nearby Listings summary-table room prices for an unspecified window, not the same dates. P05/P06/P11/P14 were not re-pulled today (21 Nov values used). `market.csv` is the market agent's; nothing written to it.
- **P17** is not in PriceLabs or Smoobu. **P08** is a handback and was not searched.
