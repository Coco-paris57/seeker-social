# Competitor positioning: CENTRAL/NORTH (D = 2026-11-21)

**Method**
- **Policy read first** (`data/policy.json`). Not raised again: P06 intentional blocks (22 Nov and 6 Dec on are blocked), P14 special setup (numbers only), Booking.com Visibility Booster, Booking.com promotion stacking (size only), 15%/20% stay discounts, Booking.com markup (+15% from 18 Nov), derived rate plans, `darts_override_24oct` (status only), P08 handback (last night 13 Nov).
- **Commission:** today's channel section was not written when this ran. I used the occupancy section's figure (21 Nov). The new P11 commission of £123.79 is **18.0% of the £687.73 Smoobu total** (room £538.73 + £149 cleaning). That matches the Camden Visibility Booster (18%, check-ins to 18 Dec), so it is expected and not raised.
- **Comp ids: the same 49 ids as 18–20 Nov** (P05 6, P06 12, P11 12, P14 12, P17 7). **No comp replaced, none added.**
  - All 49 listing pages returned **HTTP 200** (checked 2026-11-21 07:18–07:20Z). Rating, review count and capacity were refreshed from each page, and every kept comp has at least 12 reviews.
  - Two comps gained a review overnight: 1435253477626754812 (27 → 28, 4.70 → 4.71) and 836419796998711919 (17 → 18, 4.47 → 4.50).
  - **Not returned on any stay today (9):**
    - P06 1700204078606711134, 744585770789956203, 1273781636585601427 and 673753763892997438.
    - P17 975294297333089697 (**9th day**) and 1242000869201075198.
    - P11 1515051936255130803. P05 912053248917940403 (2nd day). P14 1075245497252121738.
  - **Back today after 8 days:** P06 917140285217729256 and 1452940332365117153, and P14 1659680062193836633.
  - All pages are live. Calendars were not probed, so "bookable in the next 60 days" is **NOT CHECKED** and no comp was replaced.
- **Searches:** 49 public Airbnb map searches on airbnb.co.uk (373 result pages, 4,762 cards), **checked 2026-11-21 07:18:46–07:23:13Z**. No parse failure and no bot challenge.
  - Filters, boxes and flat centres are the same as 18–20 Nov: entire home, min bedrooms = ours, adults P05 7 / P06 5 / P11 5 / P14 3 / P17 3.
  - "Wider" means the same bedroom count exactly, a numeric rating shown, and within 1.25 km. Search cards carry no review count, so **the wider set is NOT filtered to at least 10 reviews**.
  - Scripts: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c21s/`. Raw results: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c21/search/*.json`. Analysis: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c21/analysis.json`.
- **Stays priced for every comp and for us:**
  - Defaults: Fri 27–Sun 29 Nov (next Fri–Sun), Tue 24–Thu 26 Nov (midweek), and Mon 21–Wed 23 Dec (30 days out). Sun 20–Tue 22 Dec is repeated for the trend.
  - Brief stays:
    - P11: the **27–30 Nov sale stay**, **30 Nov–2 Dec (reopened)** and 30 Nov–5 Dec, 22–25 / 22–27 Nov, 2–5 Dec, 8–9 Dec, darts 14–19 / 15–18 / 17–19 Dec, 23–26 Dec, 3–6 Jan.
    - P05: 29 Nov–3 Dec, 7–8 / 7–9 Dec, 13–14 / 13–15 Dec, 21–22 Dec, 29–30 Dec.
    - P06: **23–24 Nov**, **29 Nov–5 Dec** plus its halves 29 Nov–2 Dec and 2–5 Dec.
    - P14/P17: 7–9, 14–16 and 17–19 Dec.
- **Our prices** come from `data/snapshots/2026-11-21/prices.csv` (Smoobu = PriceLabs on every night checked). Booked/open status comes from Smoobu `reservations.csv` (confirmed stays only).
- **Price basis:** comps = Airbnb total ÷ nights, after offers, **cleaning included**, taxes excluded.
  - P05 and P06 use our own Airbnb card from the same search ("obs"). Otherwise the price is derived as 0.765 × Smoobu (0.900 beyond 28 days) + cleaning ÷ n.
  - **P05 obs fits 0.765 exactly again** (7–9 Dec £897 = 0.765 × £917 + £195).
  - **P06 obs implies about 0.83, not 0.765:** 23 Nov £360 = 0.84 × £275 + £129; 29 Nov–5 Dec £1,686 = 0.83 × £1,878 + £129; 2–5 Dec 0.82. So P06 rows derived at 0.765 (29 Nov–2 Dec) understate the guest price by about 7%. Both are shown. Why P06 differs from P05 is channel lane, NOT CHECKED.
  - P11 (Booking.com only) is priced at **list all-in = Smoobu × 1.15 (policy markup) + £149 ÷ n**, before promotions. The × 1.10 result is in `analysis.json`. Booking.com live: **NOT CHECKED** (AWS WAF; not attempted, not bypassed). The **paid** price of the new stay is compared as well.
- **PriceLabs (read-only, one call at a time, 7 calls):**
  - `get_user_logs` (listing, 19–21 Nov, P05/P06/P11/P14) returned 12 entries, all from Reyhan. **11 are new, made 20 Nov 21:10–22:53Z** (see "New edits" below).
  - `get_listing_date_overrides` for P11, P05 and P06 confirms those edits are now live.
  - `get_neighbourhood_data` (Nearby Listings summary table; room price, cleaning excluded, window unspecified):
    - **P11 2 BR: P25 232 / P50 292 / P75 335 / P90 389 (n 171).**
    - **P05 4 BR: 462 / 575 / 700 / 1,232 (n 91).**
    - **P06 2 BR: 322 / 418 / 529 / 664 (n 215)** (first time pulled).
    - **P14 1 BR: 149 / 195 / 234 / 279 (n 172).**
    - P11, P05 and P14 are within £1–9 of 20 Nov.
- **Rows written:** `data/snapshots/2026-11-21/comps.csv` was absent, so I copied it forward from 20 Nov under `flock .comps.csv.lock` (7,915 rows). I then appended **887 rows** under the same lock: 146 kept, 698 wider, 42 `Pxx:ours` and 1 `P11:ours_paid` (the sale stay). The file now has 8,802 rows, all with 11 fields. Every row records platform, URL, stay, adults, basis (cleaning included), check time and set.

## New edits since 20 Nov 06:00Z (PriceLabs logs; all Reyhan, 20 Nov 21:10–22:53Z; overrides confirm they are live)

| Ref | Dates | Was (20 Nov) | Now | Comp evidence today | Direction vs Corentin's "cut PriceLabs discounts" |
|---|---|---|---|---|---|
| P11 | 22 Nov–2 Dec | −5%, min 3 | **−2%, min 2** | Nov list +21% to +30% vs kept; 30 Nov–2 Dec −16% | Discount cut: in line |
| P11 | 3–4 Dec (+5–7 Dec, booked) | −2% (3–4 Dec) | −2%, min 2 to 7 Dec | 2–5 Dec −23% vs kept (n 2), −13% vs wider | Unchanged; was already on the confirm-or-revert list |
| P11 | 14–15 Dec (darts) | −2% | −2% re-saved, **min 3 → 2** | darts −20% vs kept, −12% vs wider | Still on (already confirm-or-revert) |
| P11 | **2 Jan–28 Feb** | −5% on 3–10 Jan | **−8%, min 3, extended to 28 Feb** | 3–6 Jan **−16% vs kept, −6% vs wider** | **Deeper discount: confirm or revert** |
| P05 | **29 Nov–2 Dec** | −2% (already confirm-or-revert) | **−5%** | −7% vs kept, −5% vs wider; `recommend` raise +21.6% | **Deeper discount: confirm or revert** |
| P05 | **7–8 Dec** | +3% | **−1%** | 7–9 Dec **−18% vs kept (P0)** | **Premium turned into a discount: confirm or revert** |
| P05 | **13–14 Dec** | +5% | **0% (min-stay only, min 2)** | 13–15 Dec −9% vs kept | **Premium removed: confirm or revert** |
| P05 | **4–31 Jan** | prior value not recorded on 20 Nov (DSO rows exist since 9 Sep) | **−8%, min 3** | not priced (no January stay searched) | **New discount: confirm or revert** |
| P06 | 23 Nov | min 1 (15 Nov DSO) | **+25%, min 1** (set at +20%, then +25%) | 23 Nov **−16% vs wider** (n 27) | Premium: in line with the evidence |

- **Overnight effect on our prices (open nights in both snapshots):**
  - **P05 −£817 over 26 nights.** January is −£29 to −£37 a night (−7% to −8%, consistent with the −8%). 7–8 Dec £484 / £486 → **£467 / £450**; 13–14 Dec £515 / £500 → **£497 / £482**; 29 Nov–2 Dec −£6 to −£10; 21 Dec −£39; 29 Dec −£142.
  - **P11 −£175 over 34 nights**, even though the 22 Nov–2 Dec discount went from −5% to −2%. 22–26 Nov fell −£6 to −£8 a night, 3–4 Dec −£15 / −£17, and 3 Jan on −£6 to −£21. The engine refresh at 20 Nov 22:50Z outweighed the smaller discount (refresh time from `listings.csv`).
  - **P06 29 Nov–5 Dec (reopened): £2,624 → £2,239 (−£385, −14.7%)** for the 7 nights, on the refresh after the reopening (22:53Z). 23 Nov £255 → £275.
  - P14 −£85 over 59 nights (20 Dec £486 → £450).
- **Minimum stays:** the drop of P11 to min 2 on 22 Nov–7 Dec and 14–15 Dec, which the occupancy agent saw (source "NOT CHECKED"), comes from these Reyhan DSOs (20 Nov 22:49:39–22:50:01Z).

## Summary

| Ref | Comps kept (n per stay) | Our pct vs kept, open stays | Rating ours vs kept median; review gap | Booked vs market, next 30 / 60 | Supported positioning |
|---|---|---|---|---|---|
| **P11 2BR** | 12 (0–8) | Nov: **P67–P75 (+21% to +30%)**. 30 Nov–Jan: **P0–P50 (−3% to −26%)**, except 8 Dec P100 (+55%). **Sale 27–30 Nov paid P0 / −26% vs wider** | Booking.com only vs Airbnb kept 4.685 (36.5): not comparable; gap NOT CHECKED | 46.7% (14/30) vs 51%; 40.0% (24/60) vs 38% | `quality_premium` = 0, so **0% vs the median on list all-in**. `recommend` → hold at P50–P100 (Nov, 17–19 Dec, 8 Dec); **raise +5%** at P0–P38. Smoobu room at median level: 30 Nov–2 Dec £188–£231; darts £285–£314; 23–26 Dec £287–£308; 3–6 Jan £194–£221. |
| **P05 4BR** | 6 (0–5) | **P0–P33 (−7% to −18%)** | **4.79 (38)** vs 4.50 (17); **+21 reviews** | **73.3% (22/30) vs 49%**; 56.7% (34/60) vs 40% | `quality_premium` **+0.116**, so **+12% vs median**. `recommend` → **raise +21.6%** (both horizons). Smoobu room about **£666 (7–9 Dec), £627 (13–15 Dec), £591 (29 Nov–3 Dec)**. At minimum the median: £583 / £548 / £523. Reyhan's overnight cuts move the other way. |
| **P06 2BR** | 12 (0–4) | **29 Nov–5 Dec P0 (−38% to −50%)**, wider P6–P12; 23 Nov wider P41 (−16%) | 4.58 (12) vs 4.63 (26); **−14 reviews** | 42.9% (6/14 non-blocked) vs 52%; PriceLabs 73% vs 52% | `quality_premium` −0.02, so **−2% vs median**: about **£400–£419 all-in on 29 Nov–2 Dec = £431–£453 Smoobu** at the observed 0.83 card factor (today £288). `recommend` → fix-listing on Smoobu occupancy, raise +10% on PriceLabs occupancy. The 7 nights only reopened on 20 Nov, so the occupancy test is not fair yet. **Step up at least +10% now.** |
| P08 2BR | not searched | n/a | – | handback 13 Nov | Moot (policy handback). |
| P14 1BR | 12 (0–6) | P100 | not on Airbnb; kept median 4.885 (19.5) | 0% vs 47% / 36% | Numbers only (special setup): **+49% to +145% vs kept median**. £450 is +131% vs PriceLabs 1 BR P50 (£195). |
| P17 1BR | 7 (0–3) | n/a | kept median 4.68 (52) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (same kept ids, repeated stays):**
- **P11 November softened.** Kept 22–27 Nov median £215 → £200 (−7%) and 24–26 Nov £292 → £250 (−14%); wider 24–26 Nov £274 → £260.
  - 1159915905276842600 cut 13–24% (24–26 Nov £312 → £238), 1568808216094734994 cut 5–9% and 1542815721953379556 cut 2–4%.
  - Our room fell too (22–27 Nov £204.60 → £197.20), but our list is still +21% to +30% over kept.
- **P11 December is mixed.** Kept 17–19 / 20–22 Dec £438 → £412 (n 9 → 8) and 23–26 Dec £417 → £404. Darts 14–19 Dec £386 → £390 (n 3 → 6). Wider 20–22 Dec £467 → £421.
- **P05 gaps widened from our side.** Kept 7–9 Dec £553 → £544 and 13–15 Dec £530 → £517: 1639043256346803626 −2% and 1363636555926649515 −6%.
  - Ours fell more: Smoobu 7–9 Dec £485.00 → £458.50 (−5.5%) and 13–15 Dec £507.50 → £489.50 (−3.5%).
  - Result: 7–9 Dec −15% → **−18%** (P25 → **P0**), 13–15 Dec −8% → −9%, 29 Nov–3 Dec −5% → −7%.
- **P14:** kept 24–26 Nov £196 → £184 (1595613237427991150 −16%) and 14–16 Dec £290 → £271. Ours is flat at £450.
- **P17:** flat to slightly higher. 7–9 Dec £210 → £224 (n 2).

## P11 Camden (3064196; Booking.com only)

### The new sale: 27–30 Nov (Booking.com, made 20 Nov, £538.73 room)
- **Paid all-in £229.24/night** (£538.73 + £149 cleaning = £687.73 ÷ 3). Room only: £179.58/night.
- **Like-for-like comps for 27–30 Nov (Airbnb, checked 21 Nov 07:19Z):**
  - Kept n = 0: none of the 12 kept ids was returned for this stay.
  - **Wider n = 6: £233.67 / £256.67 / £271.00 / £349.00 / £360.00 / £396.67; median £310.00.**
  - **The paid price sits at P0, −26% vs the wider median**, below the cheapest same-size comp (£233.67).
- **List vs paid:** our list all-in at today's Smoobu (£251 / £257 / £190) is £317.23 (P50, +2% vs wider). At the 20 Nov snapshot prices in force when it was booked (£262 / £268 / £197) it is £328.35 (P50, +6%).
  - **Paid room = 0.644 × the Smoobu × 1.15 room (£836.05)**, or 0.643 × the ceil'd Standard (£838).
  - The guest therefore bought about **36% under our Standard list** and about **26% under the market median**.
  - Which plan or promotion produced the 0.64 (Non-refundable −10% plus stacked promotions) is channel lane, NOT CHECKED here. Per policy, report its size and do not call it unexplained.
- **Net with the cancellation (28 Nov–2 Dec, £605.29, 4 n): −1 night, −£66.56** (occupancy section). The per-night rate rose from £151.32 to £179.58.
- **Pricing read:** the market median for this Fri–Mon stay supported about **£226 Smoobu room** ((£310 − £49.67) ÷ 1.15), against the £242.33 average at booking time (£262 / £268 / £197), so the list was near the median (+6%); the leak is in the Booking.com plan and promotion stack (channel lane), not in the PriceLabs price.

### Open nights vs like-for-like comps (comps all-in, Airbnb, checked 21 Nov 07:18–07:23Z)

| Open nights (stay priced) | Ours room avg (20 Nov) | List all-in ×1.15 (×1.10) | Kept median (n) | **Pct / vs kept** | Wider median (n); pct / vs wider | Median-level Smoobu room* kept / wider |
|---|---|---|---|---|---|---|
| **22–26 Nov** (22–27 Nov, 5n, min 2) | £197.20 (£204.60) | £256.58 (£246.72) | £200.00 (3) | **P67 / +28%** | £195.20 (10); P90 / +31% | £148 / £144 |
| 22–24 Nov (22–25 Nov) | £190.33 (£197.33) | £268.55 | £206.67 (3) | P67 / +30% | £197.33 (13); P85 / +36% | – |
| **24–25 Nov** (24–26 Nov, midweek default) | £198.50 (£206.00) | £302.77 (£292.85) | £249.75 (4) | **P75 / +21%** | £260.00 (21); P76 / +16% | £152 / £161 |
| **30 Nov–1 Dec** (30 Nov–2 Dec, **reopened**, min 2) | **£183.00** (booked) | £284.95 (£275.80) | £340.00 (**8**) | **P38 / −16%** | £290.75 (42); P48 / −2% | **£231 / £188** |
| 30 Nov–4 Dec (30 Nov–5 Dec, 5n) | £210.00 | £271.30 (£260.80) | £366.50 (2) | P0 / −26% | £319.00 (15); P27 / −15% | £293 / £251 |
| 2–4 Dec (2–5 Dec) | £228.00 (£240.67) | £311.87 (£300.47) | £407.33 (2) | P0 / −23% | £357.33 (14); P21 / −13% | £311 / £268 |
| **8 Dec** (8–9 Dec, 1n, min 1, DSO +50%) | £309 (£311) | £504.35 (£488.90) | £326.50 (2) | **P100 / +55%** | £332.00 (12); P100 / +52% | £154 / £159 |
| **14–18 Dec, darts** (14–19 Dec, 5n, min 2) | **£246.80 (£246.00)** | £313.62 (£301.28) | £390.50 (**6**) | **P0 / −20%** | £358.00 (37); P35 / −12% | **£314 / £285** |
| 15–17 Dec (15–18 Dec) | £234.00 (£233.67) | £318.77 | £389.33 (8) | P25 / −18% | £362.83 (50); P40 / −12% | £295 / £272 |
| 17–18 Dec (17–19 Dec) | £282.50 (£280.00) | £399.38 | £412.50 (8) | P50 / −3% | £385.00 (36); P61 / +4% | £294 / £270 |
| **23–25 Dec** (23–26 Dec, min 2) | £269.33 (£268.67) | £359.40 (£345.93) | £404.17 (8) | **P38 / −11%** | £380.00 (39); P46 / −5% | £308 / £287 |
| **3–5 Jan** (3–6 Jan, min 3, **−8% DSO**) | **£179.00 (£186.33)** | £255.52 (£246.57) | £304.33 (7) | **P29 / −16%** | £273.33 (51); P45 / −6% | £221 / £194 |

\* Median-level Smoobu room = (median − £149 ÷ n) ÷ 1.15. This is the Smoobu rate whose Booking.com list price plus cleaning equals the comp median, before promotions (at × 1.10 add about 4.5%). Promotions stack on top (policy; their size is the channel agent's lane).

Not open, so excluded: 27–29 Nov and 5–7 Dec are booked, and 19–23 Dec is booked. The default Fri 27–Sun 29 Nov stay (wider £325, n 5) and the 30-day stay 21–23 Dec (kept £507.50, n 7) are therefore not open.

- **22–27 Nov: hold.** List is +21% to +31% (P67–P90). The market fell 7–14% overnight on the kept ids. Room prices went down too (−£6 to −£8 a night). `recommend(0.467, 0.51, 0.67–0.75, 0)` → hold.
- **30 Nov–2 Dec (reopened by the cancellation): −16% vs kept (n 8), −2% vs wider (n 42).** `recommend` → raise +5%. Supported: median level, about **£188–£231 Smoobu room**, which is +3% to +26% on £183.
- **Darts 14–18 Dec: still −20% vs kept / −12% vs wider (P0 / P35), flat at £246.80.** Comps support about **£285 (wider) – £314 (kept) Smoobu room**.
  - Reyhan re-saved the −2% on 14–15 Dec at 20 Nov 22:50Z, still at −2% but now min 2. It is already with Corentin as confirm-or-revert (vs `darts_override_24oct`), so this is not a new proposal; the re-save is a status update.
- **2–4 Dec: −13% vs wider (n 14; kept n 2).** 3–4 Dec fell another £15–£17 overnight. Supported: about £268 room (+18% on £228).
- **8 Dec: +55% vs kept / +52% vs wider (n 12).** It is now a 1-night gap between the 5–8 Dec and 9–14 Dec stays. A 1-night stay carries the full £149 cleaning. Supported: about **£154–£159 room**. The +50% DSO is open item t-p11-8dec-orphan (not new).
- **23–25 Dec:** −11% vs kept / −5% vs wider. Supported: about **£287–£308 room** (+7% to +14%).
- **3–5 Jan:** −16% vs kept / −6% vs wider, and **Reyhan deepened the discount to −8% (2 Jan–28 Feb)**, so room fell £186.33 → £179.00. Supported: £194–£221 room (+8% to +23%). **The −8% goes against the comp evidence and against "cut PriceLabs discounts": confirm or revert.**
- **PriceLabs cross-check (room, 2 BR):** open December nights at £184–£313 sit mostly between P25 £232 and P75 £335. 3–6 Jan £166–£191 is below P25.
- **Positioning:** `quality_premium` = 0 (no comparable rating). `recommend(0.467, 0.51, pct, 0)` and `recommend(0.40, 0.38, pct, 0)` both give **hold** at P50–P100 (22–27 Nov, 8 Dec, 17–19 Dec) and **raise +5%** at P0–P38 (30 Nov–5 Dec, darts, 15–18 Dec, 23–26 Dec, 3–6 Jan). **Supported: the comp median (0%) on list all-in.**
- **Differentiators:** P11 is a basement flat with a patio and no lift. 4 of the 12 comps have a lift (1542815721953379556, 1543632408013225027, 654396087724294901, 1515051936255130803) and 3 have a balcony or terrace. 2557770 has 181 reviews; 654396087724294901 is a Superhost.

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272)

| Open nights (stay) | Smoobu room (20 Nov) | Guest sees on Airbnb, all-in/night | Kept median (n) | Pct / vs kept | Wider median (n); pct / vs wider | Supported −2% vs median → Smoobu at 0.83 |
|---|---|---|---|---|---|---|
| **23 Nov** (23–24 Nov, 1n, min 1, **DSO +25%**) | **£275** (£255) | **£360 obs** (0.84) | – (0) | n = 0 | **£430 (27); P41 / −16%** | £352 (+28%) |
| **29 Nov–1 Dec** (29 Nov–2 Dec, 3n, min 3) | **£283 / £272 / £309** (was blocked: £269 / £324 / £363) | card not returned: £263 at 0.765, about £282 at 0.83 | **£427.50 (4)** | **P0 / −38%** (−34% at 0.83) | **£408.50 (42); P12 / −36%** | **£431 (wider) – £453 (kept)** |
| 2–4 Dec (2–5 Dec, 3n) | £322 / £330 / £362 (was £376 / £388 / £432) | **£321.67 obs** (0.82) | £640.33 (1) | P0 / −50% | £623.33 (25); P8 / −48% | £684–£704 (thin; see below) |
| **29 Nov–5 Dec** (6n, the whole reopened run) | £313.00 avg (£2,239 for 7 nights incl. 5 Dec; was £2,624) | **£281.00 obs** (0.83) | £537.33 (1) | P0 / −48% | £880.08 (16); P6 / −68% | £609 (kept n 1) |

- **Kept comps returned:** 29 Nov–2 Dec 1399094207699964827 £361, 1452940332365117153 £323 (back after 8 days), 917140285217729256 £501 (back after 8 days) and 1259401393497276633 £494. On 2–5 Dec and 29 Nov–5 Dec only 917140285217729256 was returned (£640 / £537).
- **The reopened 29 Nov–5 Dec is priced at the bottom of the market** on every basis:
  - The PriceLabs 2 BR P25 is £322 and P50 £418 (room). Ours is £272–£362.
  - The engine cut the run by £385 (−14.7%) on the refresh right after the reopening.
- **The 2–5 Dec and 6-night wider medians (£623 / £880) look skewed** by what is still available (cheap stock booked out). I therefore rest the supported level on **29 Nov–2 Dec** (kept n 4, wider n 42), not on those.
- **Positioning:** `quality_premium(4.58, 4.63)` = −0.02, so **−2% vs median**.
  - `recommend(0.429, 0.52, 0.0, −0.02)` → fix-listing (behind market −9% at P0). `recommend(0.73, 0.52, 0.0, −0.02)` (PriceLabs occupancy) → **raise +10%**.
  - Smoobu occupancy counts the 7 nights as unsold supply although they only reopened on 20 Nov. "Behind market" is therefore not yet a conversion signal.
  - **Supported: −2% vs median, about £400–£419 all-in, which is about £431–£453 Smoobu room on 29 Nov–1 Dec (+50% to +57% on £288).** With kept n = 4 and an 8-day lead, the defensible move today is **at least the +10% that `recommend` gives** (about £317 average on 29 Nov–1 Dec, which is still below every kept comp returned). Re-test tomorrow against the same ids.
- **23 Nov (1-night gap, Reyhan +25% DSO at 22:52Z):** £275 Smoobu (+£20, +8% vs yesterday; the pre-override engine price is NOT CHECKED). The guest sees £360 all-in, −16% vs wider (P41, n 27; kept n 0). Supported −2% vs wider: about £352 room. Reyhan's +25% is in the direction of the evidence.
- **Card factor:** P06's own card implies 0.82–0.84 × Smoobu today (0.845 on 19 Nov), while P05's is exactly 0.765. Cause NOT CHECKED (channel lane).
- 22 Nov and 6 Dec on are blocked (policy intentional): excluded and not raised. 24–29 Nov is booked.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Gap (stay) | Smoobu room/night (20 Nov), min | Ours, Airbnb all-in/night | Kept median, 6 ids (n) | Pct / vs median | Wider 4BR ≤1.25 km (n) | +11.6% supported → Smoobu room; median-level |
|---|---|---|---|---|---|---|
| **7–8 Dec** (7–9 Dec) | **£467 / £450** (£484 / £486), min 2, **DSO −1% (was +3%)** | **£448.50 obs** | £543.75 (4) | **P0 / −18%** | £517.00 (9): −13% | about **£666**; median-level about **£583** |
| **13–14 Dec** (13–15 Dec) | **£497 / £482** (£515 / £500), min 2, **DSO 0% (was +5%)** | **£472.00 obs** | £517.00 (5) | **P20 / −9%** | £502.25 (10): −6% | about **£627**; median-level about **£548** |
| 29 Nov–2 Dec (29 Nov–3 Dec, min 3, **DSO −5% (was −2%)**) | £493 / £477 / £472 / £495 (£500 / £484 / £482 / £501) | £419.25 obs | £449.00 (3) | P33 / −7% | £439.50 (8): −5% | about £591; median-level about £523 |
| 21 Dec (1n, min 1, +300%) | £2,010 (£2,049) | £2,004.00 obs | n = 0 | – | £643 (3) | +212% vs wider |
| 29 Dec (1n, min 1, +300%) | £2,398 (£2,540) | £2,354.00 obs | n = 0 | – | £430 (1) | +447% vs wider (n = 1) |

- The 1-night 7–8 / 13–14 Dec searches returned no kept comp. Wider n = 3 (£494 / £553); ours derived is +12% / +4% (the full £195 cleaning falls on 1 night).
- **Thin set:** n = 3–5, with 1606112160333193293 at £1,020 inside every December median. At the wider medians (n = 9–10), 7–9 / 13–15 Dec are −13% / −6%.
- **Reyhan's overnight edits moved P05 further below the comps.** 7–8 Dec went +3% → −1% and 13–14 Dec +5% → 0%, cutting these four nights by £17–£36. 29 Nov–2 Dec went −2% → −5%, and 4–31 Jan is at −8%.
  - The 29 Nov–2 Dec −2% was already in the confirm-or-revert list; today's −5% deepens it.
  - The other three are new. All four go against both the comp evidence (`recommend` raise +21.6%) and Corentin's "cut PriceLabs discounts". **Confirm or revert.**
- **PriceLabs 4 BR cross-check (room):** £450–£497 is at or below P25 £462 – P50 £575. 21 and 29 Dec are above P90 (£1,232). Reyhan's +300% DSO is open action a-p05-dec; not raised as new.
- **Positioning:** `quality_premium(4.79, 4.50)` = **+0.116**. `recommend(0.733, 0.49, 0.0–0.33, 0.116)` and `recommend(0.567, 0.40, …)` → **raise +21.6%**. **Supported: +12% vs median**, about **£666 (7–8 Dec) / £627 (13–14 Dec) / £591 (29 Nov–2 Dec) Smoobu room**. At minimum the median: about **£583 / £548 / £523**, which is +27% / +12% / +8% on today's prices.
- **Differentiators:** 912053248917940403 (4.97, Superhost, lift, park view; not returned for the 2nd day) and 1639043256346803626 (4.90, Superhost, terrace, parking) are the quality peers. 3 comps list parking and 3 a balcony or terrace. Ours: Abbey Road location; no parking or terrace on record (NOT CHECKED on the page today).

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- **Smoobu 21 Nov:** £450 on every night to 24 Dec (min 3–4). 19–20 Dec went £471 / £486 → £450 / £450. 25–31 Dec £453–£691 (was £451–£700). 1–2 Jan £616 / £546.
- **Booked:** 0% next 30 / 60 vs market 47% / 36% (pl_kpis). No P14 Smoobu reservation.
- **PriceLabs refresh is still stale** (20 Nov 07:49Z, `listings.csv`).
- **Vs kept median, P100 on every priced stay:**
  - 24–26 Nov **+145%** (n 3; median £196 → £184).
  - 7–9 Dec +49% (6); 14–16 Dec +66% (6); 17–19 Dec +66% (6).
  - 20–22 Dec +55% (4); **21–23 Dec +49% (5)**.
  - 27–29 Nov: kept n = 0, wider +42% (n 6).
- **PriceLabs 1 BR:** P50 £195, P90 £279. £450 is +131% vs P50.
- Engine move −£85 over 59 open nights. Numbers only. The PriceLabs minimum of 450 (vs the £500 in policy) is already in the confirm-or-revert list; not re-raised.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)
- **Kept medians:**
  - 24–26 and 27–29 Nov: n = 0 (wider n = 0).
  - 7–9 Dec £224.50 (2); 14–16 Dec £212.50 (3); 17–19 Dec £237.00 (3).
  - 20–22 Dec £213.00 (2); **21–23 Dec £242.00 (1)**.
- Rating median 4.68 (52).

## P08 Islington: handback
- Policy last night 13 Nov. Not searched; no rows written.

## Comp tables

**Source for every comp row:**
- Airbnb public search (airbnb.co.uk), checked 2026-11-21 07:18:46–07:23:13Z.
- Nightly = total ÷ nights, after offers, cleaning included, taxes excluded.
- Rating (reviews) and sleeps come from each listing page (07:18–07:20Z). Dist km is from 17 Nov.
- (±%) = change vs 20 Nov for the same stay. "n/a" = not returned (booked or min stay).
- "Ours" rows come from the 21 Nov snapshot (Smoobu = PriceLabs).
- Every priced row is in `data/snapshots/2026-11-21/comps.csv`.

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) 21 Nov | Sun 22 Nov–Wed 25 Nov (3n) | Sun 22 Nov–Fri 27 Nov (5n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 27 Nov–Mon 30 Nov (3n) | Mon 30 Nov–Wed 2 Dec (2n) | Mon 30 Nov–Sat 5 Dec (5n) | Wed 2 Dec–Sat 5 Dec (3n) | Tue 8 Dec–Wed 9 Dec (1n) | Mon 14 Dec–Sat 19 Dec (5n) | Tue 15 Dec–Fri 18 Dec (3n) | Thu 17 Dec–Sat 19 Dec (2n) | Sun 20 Dec–Tue 22 Dec (2n) | Mon 21 Dec–Wed 23 Dec (2n) | Wed 23 Dec–Sat 26 Dec (3n) | Sun 3 Jan–Wed 6 Jan (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.71 (31) | £383 (-3%) | £377 (-2%) | £424 (-4%) | n/a | n/a | £440 | n/a | n/a | n/a | £442 | £451 | n/a (was £524) | £560 | £560 | £555 | £273 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (181) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £400 | £351 | £363 | £388 | £388 | £388 | £392 | £305 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | n/a | £262 (-3%) | n/a | n/a | £413 | £415 | £464 | n/a | n/a | £416 | £490 | n/a (was £525) | £526 | £520 | £304 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | £207 (-19%) | £200 (-13%) | £238 (-24%) | n/a | n/a | £338 | n/a | n/a | n/a | £400 | £417 | £438 | £438 | £438 | £417 | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.54 (13) | n/a | n/a | n/a | n/a | n/a | £342 | n/a | n/a | n/a | £407 | £416 | £490 | £525 | £526 | n/a | £247 | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.69 (13) | n/a | n/a | n/a | n/a | n/a | £358 | £318 | £350 | n/a | £381 (-1%) | n/a (was £388) | £458 (-2%) | £494 | £508 | £499 (-2%) | £414 (-2%) | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a (was £175) | n/a (was £169) | n/a | n/a | n/a | £262 | n/a | n/a | n/a | £325 | £342 | £362 | n/a | n/a | £342 | n/a (was £342) | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.42 (64) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £253 | n/a | £260 | £311 | £311 | n/a | £307 | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.73 (88) | n/a | n/a | n/a | n/a | n/a | £210 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a (was £195) | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (74) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £192 | £234 | £222 | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.56 (39) | £181 (-9%) | £183 (-8%) | £206 (-5%) | n/a | n/a | £223 | n/a | n/a | n/a | n/a | n/a | n/a | £314 (+1%) | £296 | £339 | £215 | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Kept median (n)** | | | | £207 (3) | £200 (3) | £250 (4) | – (0) | – (0) | £340 (8) | £366 (2) | £407 (2) | £326 (2) | £390 (6) | £389 (8) | £412 (8) | £412 (8) | £508 (7) | £404 (8) | £304 (7) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £197 (13) | £195 (10) | £260 (21) | £325 (5) | £310 (6) | £291 (42) | £319 (15) | £357 (14) | £332 (12) | £358 (37) | £363 (50) | £385 (36) | £421 (24) | £487 (26) | £380 (39) | £273 (51) | |
| **Ours, Smoobu room/night (status, min)** | | | | £190 Open, min 2 | £197 Open, min 2 | £198 Open, min 2 | £254 Booked, min 2 | £233 Booked, min 2 | £183 Open, min 2 | £210 Open, min 2 | £228 Open, min 2 | £309 Open, min 1 | £247 Open, min 2 | £234 Open, min 2 | £282 Open, min 2 | £272 Booked, min 4 | £253 Booked, min 4 | £269 Open, min 2 | £179 Open, min 3 | |
| **Ours, comparable basis** | | | | £269 | £257 | £303 | £367 | £317 | £285 | £271 | £312 | £504 | £314 | £319 | £399 | £388 | £365 | £359 | £256 | list = Smoobu ×1.15 (policy) + £149/n |
| **Our pct / vs kept median** | | | | P67 / +30% | P67 / +28% | P75 / +21% | excluded (not open) | excluded (not open) | P38 / -16% | P0 / -26% | P0 / -23% | P100 / +55% | P0 / -20% | P25 / -18% | P50 / -3% | excluded (not open) | excluded (not open) | P38 / -11% | P29 / -16% | |
| Our pct / vs wider median | | | | P85 / +36% | P90 / +31% | P76 / +16% | excluded | excluded | P48 / -2% | P27 / -15% | P21 / -13% | P100 / +52% | P35 / -12% | P40 / -12% | P61 / +4% | excluded | excluded | P46 / -5% | P45 / -6% | |

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) 21 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 7 Dec–Tue 8 Dec (1n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Mon 14 Dec (1n) | Sun 13 Dec–Tue 15 Dec (2n) | Sun 20 Dec–Tue 22 Dec (2n) | Mon 21 Dec–Tue 22 Dec (1n) | Mon 21 Dec–Wed 23 Dec (2n) | Tue 29 Dec–Wed 30 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.15 (13) | n/a (was £498) | n/a | £449 | n/a | £453 | n/a | £469 | n/a | n/a | n/a | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | n/a | n/a | £552 | n/a | £1,020 | n/a | £1,020 | £1,070 | n/a | n/a | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (30) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | £400 | n/a | £375 | n/a | n/a | n/a | £480 (-6%) | £606 (+10%) | n/a | £593 | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.9 (30) | n/a | n/a | n/a | n/a | £517 (-2%) | n/a | £517 (-2%) | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| [1481043902711346984](https://www.airbnb.co.uk/rooms/1481043902711346984) | 1.16 | 8 | 4.76 (17) | n/a | n/a | n/a | n/a | £570 (-1%) | n/a | £590 | n/a | n/a | n/a | n/a | added 18 Nov |
| **Kept median (n)** | | | | £400 (1) | – (0) | £449 (3) | – (0) | £544 (4) | – (0) | £517 (5) | £838 (2) | – (0) | £593 (1) | – (0) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £517 (2) | £1,048 (1) | £440 (8) | £494 (3) | £517 (9) | £553 (3) | £502 (10) | £712 (6) | £643 (3) | £593 (5) | £430 (1) | |
| **Ours, Smoobu room/night (status, min)** | | | | £518 Booked, min 3 | £561 Booked, min 4 | £484 Open, min 3 | £467 Open, min 2 | £458 Open, min 2 | £497 Open, min 2 | £490 Open, min 2 | £1,348 Booked/Open, min 1/2 | £2,010 Open, min 1 | £1,314 Booked/Open, min 1/3 | £2,398 Open, min 1 | |
| **Ours, comparable basis** | | | | £494 | £527 | £419 obs | £552 | £448 obs | £575 | £472 obs | £1,310 | £2,004 obs | £1,281 | £2,354 obs | obs = own Airbnb card in same search; else 0.765/0.900 × Smoobu + cleaning/n |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | P33 / -7% | n = 0 | P0 / -18% | n = 0 | P20 / -9% | P100 / +56% | n = 0 | P100 / +116% | n = 0 | |
| Our pct / vs wider median | | | | excluded | excluded | P38 / -5% | P67 / +12% | P22 / -13% | P67 / +4% | P30 / -6% | P100 / +84% | P100 / +212% | P100 / +116% | P100 / +447% | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) 21 Nov | Mon 23 Nov–Tue 24 Nov (1n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Sun 29 Nov–Wed 2 Dec (3n) | Sun 29 Nov–Sat 5 Dec (6n) | Wed 2 Dec–Sat 5 Dec (3n) | Sun 20 Dec–Tue 22 Dec (2n) | Mon 21 Dec–Wed 23 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.62 (13) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.71 (24) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | £275 | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | n/a | n/a | £361 | n/a | n/a | £589 | £594 | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | n/a | £354 | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (54) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | £501 | £537 | £640 | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | £494 | n/a | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.6 (25) | n/a | £283 (-17%) | n/a | n/a | n/a | n/a | n/a (was £470) | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | £323 | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | n/a | n/a | n/a | n/a | n/a | £566 (-4%) | £586 | parking listed |
| **Kept median (n)** | | | | – (0) | £283 (3) | – (0) | £428 (4) | £537 (1) | £640 (1) | £578 (2) | £590 (2) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £430 (27) | £361 (25) | £1,214 (10) | £408 (42) | £880 (16) | £623 (25) | £630 (31) | £586 (41) | |
| **Ours, Smoobu room/night (status, min)** | | | | £275 Open, min 1 | £304 Booked, min 3 | £338 Booked, min 3 | £288 Open, min 3 | £313 Open, min 3 | £338 Open, min 3 | £488 Blocked, min 3/4 | £479 Blocked, min 3 | |
| **Ours, comparable basis** | | | | £360 obs | £297 | £323 | £263 | £281 obs | £322 obs | £504 | £496 | obs = own Airbnb card in same search; else 0.765/0.900 × Smoobu + cleaning/n |
| **Our pct / vs kept median** | | | | n = 0 | excluded (not open) | excluded (not open) | P0 / -38% | P0 / -48% | P0 / -50% | excluded (not open) | excluded (not open) | |
| Our pct / vs wider median | | | | P41 / -16% | excluded | excluded | P12 / -36% | P6 / -68% | P8 / -48% | excluded | excluded | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) 21 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Sun 20 Dec–Tue 22 Dec (2n) | Mon 21 Dec–Wed 23 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | n/a | n/a | £252 | £252 | £278 | £302 | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | £352 | n/a (was £352) | £352 | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | n/a | n/a (was £246) | £246 | £253 | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | £172 | n/a | £302 | £302 | £302 | £302 | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a (was £172) | n/a | £302 | £302 | n/a | n/a | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 4.92 (13) | n/a | n/a | n/a | £290 | £290 | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.71 (28) | £368 | n/a | £402 | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (20) | n/a | n/a | £243 | n/a | n/a | £236 | £236 | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (19) | n/a | n/a | n/a | n/a | n/a | n/a | £350 | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | n/a | £241 | £241 | £241 | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | £184 (-16%) | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Kept median (n)** | | | | £184 (3) | – (0) | £302 (6) | £271 (6) | £271 (6) | £290 (4) | £302 (5) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £224 (15) | £316 (6) | £302 (21) | £246 (29) | £288 (23) | £302 (21) | £302 (27) | |
| **Ours, Smoobu room/night (status, min)** | | | | £450 Open, min 3 | £450 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3/4 | £450 Open, min 3/4 | £450 Open, min 3 | |
| **Ours, comparable basis** | | | | £450 | £450 | £450 | £450 | £450 | £450 | £450 | Smoobu room |
| **Our pct / vs kept median** | | | | P100 / +145% | n = 0 | P100 / +49% | P100 / +66% | P100 / +66% | P100 / +55% | P100 / +49% | |
| Our pct / vs wider median | | | | P100 / +101% | P100 / +42% | P100 / +49% | P100 / +83% | P100 / +56% | P100 / +49% | P100 / +49% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) 21 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Sun 20 Dec–Tue 22 Dec (2n) | Mon 21 Dec–Wed 23 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.5 (18) | n/a | n/a | n/a (was £192) | n/a (was £192) | £199 | £192 | n/a | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (52) | n/a | n/a | n/a | £252 | £293 | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | £220 | £203 | n/a (was £230) | £234 (-4%) | £242 | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.68 (63) | n/a | n/a | n/a | £212 (-1%) | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.43 (170) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.75 (28) | n/a | n/a | £228 | n/a | £237 | n/a | n/a | none listed |
| **Kept median (n)** | | | | – (0) | – (0) | £224 (2) | £212 (3) | £237 (3) | £213 (2) | £242 (1) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | – (0) | – (0) | £228 (5) | £206 (6) | £225 (10) | £200 (5) | £220 (3) | |
| Ours | | | | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | |

Data gaps:
- **Booking.com live prices: NOT CHECKED** (AWS WAF; not attempted, not bypassed).
  - P11 is compared at list (Smoobu × 1.15 policy; × 1.10 alongside) + £149 cleaning ÷ n, not at the promoted price a guest sees.
  - Whether +15% has reached the Booking.com Standard rate, and which plan or promotion produced the 0.64 × list on the 27–30 Nov sale, are NOT CHECKED (channel lane).
- **Today's channel section** was not written when this ran. The commission figure (18.0% of £687.73 = Visibility Booster) is taken from today's occupancy section.
- **P11 review count on Booking.com** is not in `listings.csv`: review gap NOT CHECKED, and `quality_premium` = 0 by construction.
- **P06 card factor** is 0.82–0.84 today (P05 0.765). The 29 Nov–2 Dec card was not returned, so that stay is shown at both 0.765 and 0.83. Cause NOT CHECKED.
- **P06 23 Nov:** the engine price before Reyhan's +25% DSO is NOT CHECKED (Smoobu £255 → £275, +8%).
- **P05 4–31 Jan:** the −8% DSO's previous value is not in the 20 Nov record. No January stay was searched for P05.
- **Comp activity:** 9 kept ids were not returned on any stay today (P17 975294297333089697 for 9 days). All pages are HTTP 200. Calendars: NOT CHECKED, so none was replaced.
- **Thin samples:**
  - P11: 27–30 Nov sale kept n = 0 (wider n = 6); Nov n = 3–4; 30 Nov–5 Dec and 2–5 Dec n = 2; 8 Dec n = 2.
  - P06: kept n = 0–4. The 2–5 Dec and 6-night wider medians look skewed by what is still available.
  - P05: n = 3–5 with a £1,020 outlier; 1-night stays and 21 / 29 Dec n = 0–1.
  - P14 27–29 Nov n = 0; P17 n = 0–3.
- **Wider set** is not filtered to at least 10 reviews (cards carry no review count).
- **Whether Airbnb comp prices include VAT:** NOT CHECKED.
- **PriceLabs percentiles** are Nearby Listings summary-table room prices for an unspecified window, not the same dates. `market.csv` is the market agent's; nothing was written to it.
- **P17** is not in PriceLabs or Smoobu. **P08** is a handback and was not searched.
