# Competitor positioning: CENTRAL/NORTH (D = 2026-11-23)

**Method**
- **Policy read first** (`data/policy.json`). Not raised again: P06 intentional blocks (6 Dec on), P14 special setup (numbers only), Booking.com Visibility Booster, promotion stacking, 15%/20% stay discounts, Booking.com markup +15% (18 Nov) and derived rate plans, P08 handback (last night 13 Nov).
- **Comp ids: the same 49 as 18–22 Nov plus the 11 SEG ids from 22 Nov** (P05 6, P06 12, P11 12, P14 12, P17 7, SEG 11). **None replaced, none added.**
  - All 60 comp pages and our 2 Airbnb pages returned **HTTP 200** (checked 2026-11-23 07:20:23–07:22:11Z). Rating, reviews and capacity refreshed; every kept comp has at least 12 reviews.
  - Changes overnight: 744585770789956203 24 → 25 reviews (4.71 → 4.72); 2557770 181 → 182 (4.72 → 4.73); 1675590787835266115 13 → 14 (4.69 → 4.71); 1659680062193836633 19 → 20; SEG 1648663792586887168 13 → 14 (4.85 → 4.86). **P05 (ours) 38 → 39 reviews, 4.79.**
  - **Not returned on any stay today:** P17 975294297333089697 (**11th day**), 1242000869201075198 (3rd); P05 912053248917940403 (**4th day**); P11 1515051936255130803 (3rd), 654396087724294901 (1st); P14 1075245497252121738 (3rd); SEG 1633989864851131941 (1st); P06 8 of 12 (most P06 stays are now booked or blocked, so only 1-night and Christmas stays were open to compare). Pages are live; calendars not probed, so "bookable in the next 60 days" is **NOT CHECKED** and no comp was replaced.
- **Searches:** 51 public Airbnb map searches (airbnb.co.uk, 380 result pages, 4,816 cards), **checked 2026-11-23 07:19:58–07:27:51Z**, no parse failure, no bot challenge. Same boxes, filters and adults as yesterday (P05 7 / P06 5 / P11 5 / P14 3 / P17 3 / SEG 6). "Wider" = same bedroom count, rated, within 1.25 km (SEG 1.0 km), **not filtered to at least 10 reviews** (cards carry no review count).
- **Stays priced for every comp and for us:** Fri 27–Sun 29 Nov (next Fri–Sun), Tue 24–Thu 26 Nov (midweek), **Wed 23–Fri 25 Dec (30 days out)**; 22–24 Dec repeated for the trend. Brief stays: P06 29 Nov–2 Dec, **3–6 Dec** and the 2–3 Dec orphan; P05 13–17 Feb, 7–9 Dec, 13–15 Dec, 29 Nov–3 Dec (and 21–23 Dec); P11 30 Nov–4 Dec (+30 Nov–2 Dec), darts 14–19 Dec (+15–18, 17–19), 8–9 Dec, 23–26 Dec, 3–6 Jan; SEG 29 Nov–2 Dec, 4–7 Dec, 12–15 Dec, Christmas 24–27 Dec, NYE 30 Dec–3 Jan; P14/P17 7–9, 14–16, 17–19 Dec.
- **Our prices:** `data/snapshots/2026-11-23/prices.csv` (Smoobu = PriceLabs on every central night). Booked/open from Smoobu `reservations.csv`; **SEG booked nights from the PriceLabs prices file** (the SEG reservation is not in the Smoobu extract). P05 13–17 Feb from PriceLabs `get_listing_prices` (today) plus our own Airbnb card.
- **Price basis:** comps = Airbnb total ÷ nights after offers, **cleaning included**, taxes excluded. P05/P06 = our own Airbnb card in the same search ("obs"). P11 = list all-in = Smoobu × 1.15 + £149 ÷ n (Booking.com live **NOT CHECKED**, AWS WAF, not attempted). SEG = PriceLabs room only (cleaning NOT CHECKED). P06/SEG paid rates = Smoobu `basePrice` / PriceLabs ADR (+ cleaning for P06).
- **PriceLabs (read-only, strictly one call at a time, 7 calls):** `get_user_logs` (listing, 21–23 Nov; P05, P06, P11, P14, SEG); `get_listing_prices` P05 10–18 Feb; `get_listing_date_overrides` P06 24 Nov–6 Dec; `get_neighbourhood_data` SEG, P06, P11, P05.
- **Rows written:** `data/snapshots/2026-11-23/comps.csv` was absent, so I copied it forward from 22 Nov under `flock .comps.csv.lock` (13,855 data rows), then appended **889 rows** under the same lock: 154 kept, 688 wider, 44 `:ours`, **3 `:paid`** (P06 29 Nov–2 Dec, P06 3–6 Dec, SEG 21–26 Dec; no guest data, no booking references). File: 14,744 data rows, all 11 fields, no blank lines. 66 of the new rows are `SEG*`.

## Overnight: edits and price moves (PriceLabs logs; prices.csv 22 Nov vs 23 Nov, open nights)
- **New Reyhan edits since yesterday's check** (`get_user_logs`):
  - **SEG base 425 → 475 (22 Nov 09:18Z) → 450 (23 Nov 00:17Z)**, source "reviewPrices". This answers yesterday's "who/when NOT CHECKED".
  - **P06 2 Dec DSO +25%, min stay 1 (23 Nov 00:11Z)**: prices the orphan night left between the two new stays. Smoobu 2 Dec £316 → £349.
  - **P11 23–26 Nov DSO, min stay 2, no price (23 Nov 00:07Z).** Smoobu `prices.csv` now shows 24–26 Nov **available** at £200 / £197 / £219 (t-p11-block-2211). Whether the Smoobu block is still there is for the PriceLabs/occupancy lane; flagged, not re-analysed here.
  - **No edit on P05 or P14.**
- **P05:** +£177 over 27 nights. **7–8 Dec cut again: £449 / £430 → £428 / £407.** 13–14 Dec rose £471 / £461 → £485 / £479; 29 Nov–2 Dec +£17 a night on average; 21 Dec £2,109 → £2,215.
- **P11:** +£4 net over 17 nights. **8 Dec £305 → £233 (−24%).** **23–25 Dec £266 / £242 / £251 → £290 / £280 / £291 (+15%).** Darts 14–18 Dec −£4 to −£12 a night.
  - **P11 3–6 Jan is no longer sellable:** 3–4 Jan unavailable with no status, 5–6 Jan "Blocked" in PriceLabs, and no reservation in Smoobu. Yesterday all four nights were open. Cause NOT CHECKED.
- **P14:** −£83, all 27 Dec–2 Jan (e.g. 31 Dec £661 → £648). £450 flat to 26 Dec.
- **SEG:** +£1,649 over 45 open nights after the base moved (e.g. 29 Nov £318 → £347, 12 Dec £409 → £453, 30–31 Dec £555 → £636 / £637).
- **P05 Valentine's (t-pl-push-1811):** PriceLabs now shows 13–16 Feb **open** (no booking status; refreshed 23 Nov 00:10:58Z). Your Price is £438 / £409 / £406 / £416 (avg £417.25). This is one overnight refresh; one night is not a pattern.

## Summary

| Ref | Comps kept (n per stay) | Our pct vs kept, open stays | Rating ours vs kept median; review gap | Booked vs market, next 30 / 60 | Supported positioning |
|---|---|---|---|---|---|
| **P06 2BR** | 12 (0–2) | Sold stays: **29 Nov–2 Dec paid P0 / −38% vs kept (n 3, 22 Nov), P4–P5 / −42% vs wider (n 44–46)**; **3–6 Dec paid P0 vs wider today (n 20; cheapest £404), P8 / −50% on 22 Nov (2–5 Dec, n 24)**. Open orphan 2–3 Dec: wider **P48 / −2%** (n 25) | 4.58 (12) vs 4.63 (26); −14 reviews | 84.6% (11/13 non-blocked) vs 52%; PriceLabs 93% / 97% vs 52% / 39% | `quality_premium` −0.02 → **−2% vs median**. The two stays sold **36–58% below** that level (estimate: about £366–£441 short on 29 Nov–2 Dec all-in, £194–£449 room on 3–6 Dec). The 2 Dec +25% orphan now sits at −2% = **hold**. `recommend` says raise +10%. |
| **P05 4BR** | 6 (0–5) | **P0–P40 (−18% to 0%)**; **13–17 Feb P20 / −10%** | **4.79 (39)** vs 4.50 (17); **+22 reviews** | **70.0% (21/30) vs 50%**; 53.3% (32/60) vs 40% | `quality_premium` **+0.116** → **+12% vs median**. `recommend` → **raise +21.6%**. Smoobu room about **£591 (29 Nov–3 Dec), £533–£614 (7–9 Dec), £556 (13–15 Dec), £531 (13–17 Feb)**. At minimum the median: £523 / £465–£537 / £485 / £470. |
| **P11 2BR** | 12 (0–8) | **P12–P40 (−13% to −22%)** on 30 Nov–4 Dec, darts, 15–18 / 17–19 Dec, 22–25 Dec. **23–26 Dec P50 / +4%** (was −18%). **8 Dec P100 / +28%** | Booking.com only vs Airbnb kept 4.685 (36.5): not comparable; gap NOT CHECKED | 50.0% (15/30) vs 51%; 56.1% (23/41 sellable) vs 38% (PriceLabs 67%) | `quality_premium` = 0 → **0% vs median on list all-in**. `recommend` → **raise +5%** below P50, **hold** at P50–P100. Median-level Smoobu room: **30 Nov–4 Dec £215–£240** (ours £197); **darts £278–£301** (£242); **23–26 Dec £274–£276** (£287, at median: hold); **8 Dec £154–£170** (£233). |
| **SEG 3BR** (reference) | 11 (0–3) | **29 Nov–2 Dec P0 / −24%**; **12–15 Dec P67 / +4%** (now above median); **NYE P25 / −21% vs wider (n 8)**; Christmas not sellable (24–25 Dec booked); 4–7 Dec n = 0 | No rating or reviews (no OTA id on record) vs 4.84 (26); −26 reviews (NOT CHECKED) | First booking **21–26 Dec**, **paid room £296.35 = P0 vs kept (−27% / −33%) and P0–P12 vs wider (−41% / −38%)**, below PriceLabs 3BR P25 £317 | `quality_premium` = 0 → **up to the median, not above**. `recommend` → fix-listing (Smoobu-less occupancy 2/22 vs 45%; PriceLabs 37%). Supported: **12–15 Dec hold or trim** (room already +4% before cleaning); **NYE up to about £714 all-in**; 29 Nov–2 Dec up to about £403 all-in. |
| P08 2BR | not searched | n/a | – | handback 13 Nov | Moot (policy handback). |
| P14 1BR | 12 (0–8) | P100 | not on Airbnb; kept median 4.885 (20.5) | 0% vs 47% / 35% | Numbers only (special setup): **+38% to +74% vs kept median, +23% to +64% vs wider.** |
| P17 1BR | 7 (0–4) | n/a | kept median 4.68 (52) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (same kept ids, repeated stays):**
- **P11:** 17–19 Dec kept £412 → £458 (n 8 → 7); 22–24 Dec £491 → £508; darts £400 → £376 (n 7 → 6; 1543632408013225027 and 1675590787835266115 dropped out); **23–26 Dec £417 → £367** (n 7 → 6; 1542815721953379556 £555 and 1675590787835266115 £501 dropped out). With our +13% there, P14 → P50.
- **P05:** 7–9 Dec £515 → £508 (1639043256346803626 −6% to £424). 13–15 Dec and 29 Nov–3 Dec flat (£469 / £449). Valentine's flat at £467 (n 5).
- **P06:** 29 Nov–2 Dec kept £343 (n 3 → 1; 744585770789956203 and 1259401393497276633 not returned); wider £368 (n 44). 22–24 Dec kept £539 → £440.
- **SEG:** 12–15 Dec kept £452 → £394 (1498503422089605343 −15% to £383). NYE kept 1548502477554034012 £789 → £881 (+12%); wider £730 → £714.
- **P14:** kept 17–19 Dec £290 → £271, 22–24 Dec £334 → £316; 7–9 / 14–16 Dec £302.
- **P17:** 7–9 Dec £223 → £232, 14–16 Dec £208 → £203, 17–19 Dec £237 → £225.

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272): where the two sold stays sat

| Stay (booked 22 Nov) | Paid room (Smoobu basePrice) | Paid all-in/night (+ £129 cleaning) | Smoobu 22 Nov / PL booked_price | Paid ÷ Smoobu 22 Nov / ÷ PL booked_price / ÷ our 22 Nov card | Kept median (n) | Wider median (n) | **Paid pct / vs median** | PriceLabs 2BR room (23 Nov) |
|---|---|---|---|---|---|---|---|---|
| **29 Nov–2 Dec (3n)** | £513.04 (£171.01/n) | **£214.01** | £861 / £789 (270+250+269) | 0.60 / 0.65 / **0.757** (card £282.67) | **£342.67 (3)** on 22 Nov; £343 (1) today | **£368.50 (46)** on 22 Nov; £368 (44) today | **P0 / −38% kept; P4 / −42% wider** (cheapest wider £199) | room £171 vs **P25 £321** (−47%), P50 £414 (−59%) |
| **3–6 Dec (3n)** | £768.82 (£256.27/n) | **£299.27** | £1,040 / £1,005 (332+334+339) | 0.74 / 0.765 / n/a (no card for this stay) | n = 0 | £708 (20) today, cheapest £404; 22 Nov 2–5 Dec £603 (24) | **P0 vs wider today; P8 / −50% on 22 Nov** | room £256 vs **P25 £321** (−20%), P50 £414 (−38%) |
| 2–3 Dec orphan (open, 1n, min 1) | Smoobu £349 (+25% DSO, was £316) | card **£416 obs** | – | card factor 0.822 | n = 0 | **£425 (25)** | **P48 / −2%** | room £349, P25–P50 |

- **Answer: both stays sold at the very bottom of the market.** 29 Nov–2 Dec was cheaper than every kept comp returned (£296 / £343 / £484 on 22 Nov) and than all but 2 of the 44–46 wider 2-beds. 3–6 Dec was cheaper than every wider 2-bed still available today and sits below the PriceLabs 2BR P25 on room alone.
- **The cut is not in PriceLabs.** `get_listing_date_overrides` shows min-stay-only DSOs on 29 Nov–1 Dec and 3–5 Dec (no price). The guest on 29 Nov–2 Dec paid **0.757× the card we saw on 22 Nov at 07:2xZ**, so something applied at or after booking (special offer, Airbnb rule or a price change before the booking) took another quarter off. The cause is NOT CHECKED here (channel lane). Under policy `airbnb_discount`, a gap this size on a booking made after 21 Oct is unexplained.
- **Supported level (−2% vs median):** about **£336 (kept) – £361 (wider) all-in a night on 29 Nov–2 Dec**, against £214 paid. Estimate: **£366–£441 short on the stay**. For 3–6 Dec the comp evidence is thin and skewed (kept n = 0; wider median £603–£708). Using the PriceLabs 2BR room bands instead, the stay was **£194 (to P25) – £449 (to −2% of P50) short**. Both are estimates, not refunds or lost revenue already counted elsewhere.
- **Was yesterday's +10% advice overtaken?** Yes. The run sold the same day (22 Nov), and no PriceLabs price change was made first. Even +10% on the Smoobu price would not have closed a 0.60–0.74× downstream factor.
- **2 Dec orphan:** Reyhan's +25% (min 1) puts the 1-night all-in card at £416, P48 / −2% vs the 1-night wider median (n 25). That is exactly the quality-supported level: **hold**. `recommend(0.846, 0.52, 0.48, −0.02)` → raise +10% (booked +33 pts vs market). That is optional for a single night 9 days out.
- 6 Dec on is blocked (policy intentional): excluded, not raised.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Gap (stay) | Smoobu room/night (22 Nov), min | Ours, Airbnb all-in/night | Kept median (n) | Pct / vs median | Wider 4BR ≤1.25 km (n) | +11.6% supported → Smoobu room; median-level |
|---|---|---|---|---|---|---|
| 29 Nov–2 Dec (29 Nov–3 Dec, min 3) | £508 / £493 / £486 / £493 = £495 (£483.25) | £427.50 obs | £449 (3) | **P33 / −5%** | £449 (7): P29 / −5% | about **£591**; median-level **£523** |
| **7–8 Dec** (7–9 Dec, min 2) | **£428 / £407 = £417.50** (£439.50) | £417.00 obs | £508.50 (4) | **P0 / −18%** | £453 (11): P9 / −8% | about **£614** (kept) / £533 (wider); median-level £537 / £465 |
| 13–14 Dec (13–15 Dec, min 2) | £485 / £479 = £482 (£466) | £466.50 obs | £469 (5) | P40 / −0% | £469 (9): P33 / −0% | about **£556**; median-level £485 |
| **13–16 Feb, Valentine's (13–17 Feb, 4n, min 4)** | PriceLabs Your Price **£438 / £409 / £406 / £416 = £417.25**; uncustomized £500 / £439 / £459 / £465 | **£420.25 obs (£1,681 total)** | **£467 (5)** | **P20 / −10%** | £467 (11): P27 / −10% | about **£531**; median-level **£470** |

- **Valentine's:** now open in PriceLabs as well as on Airbnb. The card is £420.25 a night (factor 0.89 vs PriceLabs Your Price), still −10% vs both kept and wider. Kept: 1610095240357069208 £392, 1363636555926649515 £422, 1606112160333193293 £467, 1481043902711346984 £552, 1639043256346803626 £845. Uncustomized PriceLabs averages £466, i.e. the customizations hold it about 10% under the engine's own price.
- **7–9 Dec got cheaper again (−5%) and is the weakest position: P0 / −18% vs kept.** The engine cut it while 3 of the 4 kept comps returned are above £450.
- **13–15 Dec is now at the median (P40 / −0%)** after +3%. Quality still supports +12%.
- **Reyhan's 20 Nov edits** (29 Nov–2 Dec −5%, 7–8 Dec −1%, 13–14 Dec 0%, 4–31 Jan −8%) are already confirm-or-revert; nothing new. The comp evidence still points the other way.
- 21 Dec (1n, +300% DSO) is now £2,215: +71% vs kept / +95% vs wider on 21–23 Dec. Open action a-p05-dec; not raised as new.
- **Positioning:** `quality_premium(4.79, 4.50)` = +0.116. `recommend(0.70, 0.50, 0.0–0.40, 0.116)` → **raise +21.6%**. **Supported: +12% vs median.**
- **Differentiators:** 912053248917940403 (4.97, Superhost, lift, park view; not returned for the 4th day) and 1639043256346803626 (4.90, Superhost, terrace, parking) are the quality peers. Ours: Abbey Road location; parking or terrace NOT CHECKED.

## P11 Camden (3064196; Booking.com only)

| Open nights (stay priced) | Ours room avg (22 Nov) | List all-in ×1.15 (×1.10) | Kept median (n) | **Pct / vs kept** | Wider median (n); pct / vs wider | Median-level Smoobu room* kept / wider |
|---|---|---|---|---|---|---|
| 24–25 Nov (24–26 Nov) — see t-p11-block-2211 | £198.50 (£193.50) | £302.77 (£292.85) | £330 (2) | P50 / −8% | £252 (17); P71 / +20% | £222 / £154 |
| 30 Nov–1 Dec (30 Nov–2 Dec) | £186.00 (£183.00) | £288.40 (£279.10) | £350 (6) | P33 / −18% | £294 (40); P47 / −2% | £240 / £191 |
| **30 Nov–3 Dec** (30 Nov–4 Dec, 4n, min 2) | **£197.00** (£196.25) | £263.80 (£253.95) | **£314 (5)** | **P40 / −16%** | £285 (26); P38 / −7% | **£240 / £215** |
| **8 Dec** (8–9 Dec, 1n, min 1) | **£233** (£305) | £416.95 (£405.30) | £326.50 (2) | **P100 / +28%** | £344 (11); P82 / +21% | £154 / £170 |
| **14–18 Dec, darts** (14–19 Dec, 5n) | **£241.60** (£248.40) | £307.64 (£295.56) | **£376 (6)** | **P17 / −18%** | £349 (35); P31 / −12% | **£301 / £278** |
| 15–17 Dec (15–18 Dec) | £229.33 (£233.33) | £313.40 | £402 (8) | P12 / −22% | £342 (49); P37 / −8% | £306 / £254 |
| 17–18 Dec (17–19 Dec) | £281.00 (£287.50) | £397.65 | £458 (7) | P29 / −13% | £406 (31); P48 / −2% | £333 / £288 |
| 23–24 Dec (23–25 Dec, 30-day default) | £285.00 | £402.25 | £420 (6) | P33 / −4% | £372 (29); P52 / +8% | £300 / £259 |
| **23–25 Dec** (23–26 Dec, min 2) | **£287.00** (£253.00) | £379.72 (£365.37) | **£367 (6)** | **P50 / +4%** | £364 (40); P53 / +4% | **£276 / £274** |
| 3–5 Jan (3–6 Jan) | £167.67 | £242.48 | £305 (8) | **not sellable today** | £275 (55) | £221 / £194 |

\* Median-level Smoobu room = (median − £149 ÷ n) ÷ 1.15: the Smoobu rate whose Booking.com list plus cleaning equals the comp median, before stacked promotions (policy).

- **30 Nov–4 Dec:** unchanged at −16% vs kept / −7% vs wider. `recommend` → raise +5%. Supported: **median level, about £215–£240 room** (+9% to +22% on £197).
- **Darts 14–19 Dec:** −18% / −12%, and our side fell again (£248.40 → £241.60). Supported **£278–£301 room** (+15% to +25%). The −2% DSO on 14–15 Dec is already with Corentin as confirm-or-revert (vs `darts_override_24oct`); no new proposal.
- **8 Dec:** the engine cut it 24% to £233, so it is now +28% / +21% (was +53% / +43%). Supported about £154–£170 room. Open item t-p11-8dec-orphan (not new).
- **23–26 Dec: now at the median (P50 / +4%)**, because ours rose 13% and the kept median fell. **Hold.**
- **3–6 Jan:** yesterday open at −20%; today 3–4 Jan unavailable and 5–6 Jan Blocked with no reservation. Comps were priced and kept for the trend; position not scored. Cause NOT CHECKED. Reyhan's −8% (2 Jan–28 Feb) is already confirm-or-revert.
- **Positioning:** `quality_premium` = 0. `recommend(0.50, 0.51, pct, 0)` → **raise +5%** at P12–P47 and **hold** at P50–P100. **Supported: comp median (0%) on list all-in.**
- **Differentiators:** basement with patio, no lift. 4 of 12 comps have a lift and 3 a balcony or terrace. 2557770 has 182 reviews; 654396087724294901 is a Superhost.

## SEG Scott Ellis Gardens 3-bed (PriceLabs 3588993; NW8; reference positioning only)

| Stay | PriceLabs room/night 23 Nov (22 Nov) | Kept median (n) | Pct / vs kept | Wider 3BR ≤1.0 km (n) | Pct / vs wider | Supported |
|---|---|---|---|---|---|---|
| **29 Nov–1 Dec** (29 Nov–2 Dec) | £347 / £322 / £308 = **£325.67** (£302.67) | £430.67 (3) | **P0 / −24%** | £403.17 (4) | P25 / −19% | up to about £403 all-in (less cleaning ÷ 3) |
| 4–6 Dec (4–7 Dec) | £398 / £421 / £385 = £401.33 (£383) | n = 0 | – | n = 0 | – | no evidence |
| **12–14 Dec** (12–15 Dec) | £453 / £401 / £376 = **£410.00** (£366.33) | £394.33 (3) | **P67 / +4%** | £394.33 (7) | P71 / +4% | **hold or trim**: already above median on room alone |
| **Sold: 21–26 Dec (5n), booked 22 Nov** | **paid ADR £296.35** room; PL booked_price £428 / £426 / £468 / £461 / £466 (avg £449.80) → **0.66×** | 22–24 Dec £404 (3); 23–25 Dec £440 (3) | **P0 / −27%; P0 / −33%** | £502 (7); £476 (8) | **P0 / −41%; P12 / −38%** | below PriceLabs 3BR P25 £317 (−7%) and P50 £384 (−23%), before cleaning |
| Christmas 24–26 Dec (24–27 Dec) | 24–25 Dec booked; 26 Dec £497 open (min 4) | £735 (1) | excluded | £521 (9) | excluded | not sellable as this stay |
| **NYE 30 Dec–2 Jan** (30 Dec–3 Jan, 4n) | £636 / £637 / £508 / £471 = **£563.00** (£505.75) | £881 (1) | P0 / −36% | **£713.50 (8)** | **P25 / −21%** | **up to about £714 all-in** (less cleaning ÷ 4) |

- **First reservation:** 21–26 Dec, 5 nights, booked 22 Nov (PriceLabs `booked_date`), ADR £296.35. Channel NOT CHECKED (not in the Smoobu extract). The 0.66× gap vs PriceLabs is about the size of the 20% Airbnb special offer reported yesterday plus channel rules, but that is not verified here. **It sold below every kept comp and below the PriceLabs 3BR P25 on room alone.** The base had just gone 425 → 475 (09:18Z the same day).
- **PriceLabs 3BR (23 Nov, room):** P25 £317, P50 £384, P75 £475, P90 £618 (n 148). The market surges 27–31 Dec (+30.8% price; +22.0% occupancy 27 Dec–1 Jan).
- **Base 450 vs evidence:** 12–15 Dec moved from −19% to +4%. 29 Nov–2 Dec is still −24% (n 3) and NYE −21% (wider n 8). The base change lifted every night; the gaps that remain are on near dates and NYE.
- **Positioning:** no rating or review count on record, so `quality_premium` = 0 and nothing supports a premium. `recommend(2/22, 0.45, …)` and `recommend(0.37, 0.45, …)` → fix-listing (behind market at P0–P71). That occupancy reading is unreliable: PriceLabs counts its blocked nights (24–28 Nov, 3, 8, 15 Dec, 5 Jan) and the listing is new. **Supported: up to the comp median, not above.**
- **Differentiators:** 3 bed / **2 bath** (bath counts for comps NOT CHECKED; only 1548502477554034012 states 2 baths). Standouts: 6620546 (315 reviews, 4.92, garden), 52560423 (377 reviews, 4.90), 1633989864851131941 (cinema room, garden, 0.35 km; not returned today), 1269544547244432855 (A/C, rooftop). 7 of the 11 are Superhosts or Guest favourites.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- **Smoobu 23 Nov:** £450 every night to 26 Dec (min 3–4); 27 Dec–2 Jan £515–£648, −£83 in total overnight.
- **Booked:** 0% next 30 / 60 vs market 47% / 35% (pl_kpis). No P14 reservation in that window.
- **PriceLabs refresh:** listing_data still 22 Nov 07:16Z; prices file refreshed 23 Nov 07:03Z (Dispatcher pull notes).
- **Vs kept median, P100 on every stay:** 24–26 Nov +74% (n 2); 7–9 Dec +49% (5); 14–16 Dec +49% (5); 17–19 Dec +66% (6); 22–24 Dec +42% (7); **23–25 Dec +38% (8)**. 27–29 Nov kept n = 0, wider +23% (4).
- Numbers only. The PriceLabs minimum of 450 (vs £500 in policy) is already confirm-or-revert; not re-raised.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)
- **Kept medians:** 7–9 Dec £232 (2); 14–16 Dec £203 (4); 17–19 Dec £225 (4); 22–24 Dec £226 (1); 23–25 Dec and 24–29 Nov n = 0. Rating median 4.68 (52).
- 975294297333089697 not returned for **11 days** (page HTTP 200; calendar NOT CHECKED). It is the first to replace once its calendar is shown closed.

## P08 Islington: handback
- Policy last night 13 Nov. Not searched; no rows written.

## Comp tables

**Source for every comp row:**
- Airbnb public search (airbnb.co.uk), checked 2026-11-23 07:19:58–07:27:51Z.
- Nightly = total ÷ nights, after offers, cleaning included, taxes excluded.
- Rating (reviews) and sleeps come from each listing page (07:20–07:22Z). Dist km is from 17 Nov (SEG: from the PriceLabs pin, 22 Nov).
- (±%) = change vs 22 Nov for the same stay; "n/a" = not returned (booked or min stay).
- "Ours" rows come from the 23 Nov snapshot (P05 Feb from PriceLabs `get_listing_prices` 23 Nov).
- Every priced row is in `data/snapshots/2026-11-23/comps.csv`.

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) 23 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 30 Nov–Wed 2 Dec (2n) | Mon 30 Nov–Fri 4 Dec (4n) | Tue 8 Dec–Wed 9 Dec (1n) | Mon 14 Dec–Sat 19 Dec (5n) | Tue 15 Dec–Fri 18 Dec (3n) | Thu 17 Dec–Sat 19 Dec (2n) | Tue 22 Dec–Thu 24 Dec (2n) | Wed 23 Dec–Fri 25 Dec (2n) | Wed 23 Dec–Sat 26 Dec (3n) | Sun 3 Jan–Wed 6 Jan (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.71 (31) | £408 | n/a | £440 | £404 | n/a | £442 | £451 | £524 | £580 | £586 | n/a (was £555) | n/a (was £273) | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.73 (182) | n/a | n/a | n/a | n/a | £400 | £351 | £363 | £388 | £388 | £402 | £392 | £305 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | £252 | n/a | £413 | £401 | n/a | n/a (was £407) | £416 | £490 | £544 | n/a | £520 | £304 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a | n/a | n/a (was £338) | n/a | n/a | £400 | £417 | £438 | £438 | £438 | £417 | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.5 (14) | n/a | n/a | £342 | n/a | n/a | £407 | £416 | £490 | £544 | n/a | n/a | £247 | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.71 (14) | n/a | n/a | £358 | £314 | n/a | n/a (was £382) | £388 | £458 | £508 | £508 | n/a (was £501) | £414 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a | n/a | £262 | £231 | n/a | £325 | £342 | n/a (was £362) | n/a | £362 | £342 | £342 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.4 (65) | n/a | n/a | n/a | n/a | £253 | £262 | £260 | £311 | n/a | n/a | £307 | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.73 (88) | n/a | n/a | £210 | £202 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £195 | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (74) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a (was £234) | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.56 (39) | n/a | n/a | n/a (was £238) | n/a | n/a | n/a | n/a | n/a | £320 | £349 | £339 | £215 | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Kept median (n)** | | | | £330 (2) | – (0) | £350 (6) | £314 (5) | £326 (2) | £376 (6) | £402 (8) | £458 (7) | £508 (7) | £420 (6) | £367 (6) | £305 (8) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £252 (17) | £330 (4) | £294 (40) | £285 (26) | £344 (11) | £349 (35) | £342 (49) | £406 (31) | £416 (32) | £372 (29) | £364 (40) | £275 (55) | |
| **Ours, room/night (status, min)** | | | | £198 Open, min 2 | £254 Booked, min 2 | £186 Open, min 2 | £197 Open, min 2 | £233 Open, min 1 | £242 Open, min 2 | £229 Open, min 2 | £281 Open, min 2 | £272 Booked/Open, min 2/4 | £285 Open, min 2 | £287 Open, min 2 | £168 Blocked, min 3 | |
| **Ours, comparable basis** | | | | £303 | £366 | £288 | £264 | £417 | £308 | £313 | £398 | £388 | £402 | £380 | £242 (not sellable) | list = Smoobu ×1.15 (policy) + £149/n |
| **Our pct / vs kept median** | | | | P50 / -8% | excluded (not open) | P33 / -18% | P40 / -16% | P100 / +28% | P17 / -18% | P12 / -22% | P29 / -13% | P29 / -24% | P33 / -4% | P50 / +4% | excluded (not open) | |
| Our pct / vs wider median | | | | P71 / +20% | excluded (not open) | P47 / -2% | P38 / -7% | P82 / +21% | P31 / -12% | P37 / -8% | P48 / -2% | P44 / -7% | P52 / +8% | P53 / +4% | excluded (not open) | |

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) 23 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Mon 21 Dec–Wed 23 Dec (2n) | Tue 22 Dec–Thu 24 Dec (2n) | Wed 23 Dec–Fri 25 Dec (2n) | Sat 13 Feb–Wed 17 Feb (4n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.15 (13) | n/a | n/a | £449 | £453 | £469 | n/a | £469 | n/a | £392 | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | n/a | n/a | £552 | £1,020 | £1,020 | n/a | n/a | n/a | £467 | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (30) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | £400 | n/a | £376 | n/a | £458 (-1%) | £590 | £596 (+4%) | £589 | £422 | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.9 (30) | n/a | n/a | n/a | £424 (-6%) | £424 (-6%) | n/a | n/a | n/a | £845 (-1%) | Superhost, parking listed, balcony/patio/terrace (house) |
| [1481043902711346984](https://www.airbnb.co.uk/rooms/1481043902711346984) | 1.16 | 8 | 4.76 (17) | n/a | n/a | n/a | £564 (-2%) | £588 | £807 (+1%) | £806 | n/a | £552 | added 18 Nov |
| **Kept median (n)** | | | | £400 (1) | – (0) | £449 (3) | £508 (4) | £469 (5) | £698 (2) | £596 (3) | £589 (1) | £467 (5) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £400 (3) | £1,048 (1) | £449 (7) | £453 (11) | £469 (9) | £611 (6) | £570 (7) | £770 (2) | £467 (11) | |
| **Ours, room/night (status, min)** | | | | £528 Booked, min 3 | £570 Booked, min 4 | £495 Open, min 3 | £418 Open, min 2 | £482 Open, min 2 | £1,433 Booked/Open, min 1/3 | £656 Booked, min 3 | £630 Booked, min 3 | £417 Open, min 4 | |
| **Ours, comparable basis** | | | | £501 | £534 | £428 obs | £417 obs | £466 obs | £1,194 | £688 | £664 | £420 obs | obs = own Airbnb card in same search; else 0.765/0.900 × Smoobu + £195/n |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | P33 / -5% | P0 / -18% | P40 / -0% | P100 / +71% | excluded (not open) | excluded (not open) | P20 / -10% | |
| Our pct / vs wider median | | | | excluded (not open) | excluded (not open) | P29 / -5% | P9 / -8% | P33 / -0% | P100 / +95% | excluded (not open) | excluded (not open) | P27 / -10% | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) 23 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Sun 29 Nov–Wed 2 Dec (3n) | Wed 2 Dec–Thu 3 Dec (1n) | Thu 3 Dec–Sun 6 Dec (3n) | Tue 22 Dec–Thu 24 Dec (2n) | Wed 23 Dec–Fri 25 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.62 (13) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.72 (25) | n/a | n/a | n/a (was £296) | n/a | n/a | £390 | £390 | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | £275 | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | n/a | £343 | n/a | n/a | £489 | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | £354 | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (54) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a (was £484) | n/a | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.6 (25) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | n/a | n/a | n/a | n/a | n/a (was £590) | n/a | parking listed |
| **Kept median (n)** | | | | £314 (2) | – (0) | £343 (1) | – (0) | – (0) | £440 (2) | £390 (1) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £332 (21) | £1,151 (6) | £368 (44) | £425 (25) | £708 (20) | £508 (48) | £501 (40) | |
| **Ours, room/night (status, min)** | | | | £370 Booked, min 3 | £428 Booked, min 3 | £344 Booked, min 3 | £349 Open, min 1 | £414 Booked, min 3 | £416 Blocked, min 3 | £454 Blocked, min 3 | |
| **Ours, comparable basis** | | | | £371 | £419 | £328 | £416 obs | £386 | £439 | £474 | obs = own Airbnb card; else 0.83/0.900 × Smoobu + £129/n |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | excluded (not open) | n = 0 | excluded (not open) | excluded (not open) | excluded (not open) | |
| Our pct / vs wider median | | | | excluded (not open) | excluded (not open) | excluded (not open) | P48 / -2% | excluded (not open) | excluded (not open) | excluded (not open) | |

### SEG

| Airbnb id | Dist km | Sleeps | Rating (reviews) 23 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Sun 29 Nov–Wed 2 Dec (3n) | Fri 4 Dec–Mon 7 Dec (3n) | Sat 12 Dec–Tue 15 Dec (3n) | Tue 22 Dec–Thu 24 Dec (2n) | Wed 23 Dec–Fri 25 Dec (2n) | Thu 24 Dec–Sun 27 Dec (3n) | Wed 30 Dec–Sun 3 Jan (4n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1633989864851131941](https://www.airbnb.co.uk/rooms/1633989864851131941) | 0.35 | 6 | 4.88 (42) | n/a (was £522) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | cinema room, garden, Guest favourite |
| [1498503422089605343](https://www.airbnb.co.uk/rooms/1498503422089605343) | 0.43 | 7 | 4.84 (25) | £364 (+8%) | n/a | n/a (was £309) | n/a | £383 (-15%) | £425 | £440 | n/a | n/a | ground floor, refurbished (title), Superhost |
| [6620546](https://www.airbnb.co.uk/rooms/6620546) | 0.62 | 6 | 4.92 (315) | n/a | n/a | £376 | n/a | n/a | n/a | n/a | n/a | n/a | 4-acre garden, Guest favourite, Superhost |
| [1548502477554034012](https://www.airbnb.co.uk/rooms/1548502477554034012) | 0.62 | 6 | 4.91 (32) | n/a | n/a | n/a | n/a | n/a | n/a | £623 | n/a | £881 (+12%) | 2 bath, A/C, Guest favourite (title says sleeps 8; page capacity 6), Superhost |
| [11056472](https://www.airbnb.co.uk/rooms/11056472) | 0.72 | 6 | 4.26 (23) | £414 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Marylebone (title) |
| [1648663792586887168](https://www.airbnb.co.uk/rooms/1648663792586887168) | 0.76 | 6 | 4.86 (14) | £400 | n/a | n/a | n/a | n/a | £400 | £400 | n/a | n/a | none in title, Superhost |
| [52560423](https://www.airbnb.co.uk/rooms/52560423) | 0.8 | 6 | 4.9 (377) | n/a | n/a | n/a | n/a | n/a | £404 (-9%) | n/a | n/a | n/a | Guest favourite, Superhost |
| [1165719843393058533](https://www.airbnb.co.uk/rooms/1165719843393058533) | 0.82 | 6 | 4.79 (24) | n/a (was £536) | n/a | n/a | n/a | £578 | n/a | n/a | £735 | n/a | Little Venice (title), Superhost |
| [897028868119653426](https://www.airbnb.co.uk/rooms/897028868119653426) | 0.87 | 6 | 4.64 (22) | n/a | n/a | n/a | n/a | £394 | n/a | n/a | n/a | n/a | family home near Little Venice (title) |
| [1269544547244432855](https://www.airbnb.co.uk/rooms/1269544547244432855) | 0.89 | 6 | 4.7 (61) | n/a | n/a | £431 | n/a | n/a | n/a | n/a | n/a | n/a | A/C, rooftop (title) |
| [1064528274936916938](https://www.airbnb.co.uk/rooms/1064528274936916938) | 0.91 | 6 | 4.81 (26) | n/a | n/a | £460 | n/a | n/a | n/a | n/a | n/a | n/a | by Paddington station (title) |
| **Kept median (n)** | | | | £400 (3) | – (0) | £431 (3) | – (0) | £394 (3) | £404 (3) | £440 (3) | £735 (1) | £881 (1) | |
| Wider: same bedrooms, rated, ≤1.0 km (n) | | | | £400 (3) | – (0) | £403 (4) | – (0) | £394 (7) | £502 (7) | £476 (8) | £521 (9) | £714 (8) | |
| **Ours, room/night (status, min)** | | | | £340 Blocked, min 3 | £418 Blocked, min 4 | £326 Open, min 2/3 | £401 Open, min 2/3 | £410 Open, min 2/3 | £448 Booked, min 3 | £452 Booked, min 3 | £468 Booked/Open, min 3/4 | £563 Open, min 3/4 | |
| **Ours, comparable basis** | | | | £340 | £418 | £326 | £401 | £410 | £448 | £452 | £468 | £563 | PriceLabs room (not in Smoobu); cleaning NOT CHECKED, not added |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | P0 / -24% | n = 0 | P67 / +4% | excluded (not open) | excluded (not open) | excluded (24–25 Dec booked; 26 Dec open, min 4) | P0 / -36% | |
| Our pct / vs wider median | | | | excluded (not open) | excluded (not open) | P25 / -19% | n = 0 | P71 / +4% | excluded (not open) | excluded (not open) | excluded (24–25 Dec booked) | P25 / -21% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) 23 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Tue 22 Dec–Thu 24 Dec (2n) | Wed 23 Dec–Fri 25 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | n/a | n/a | £252 | £252 | £302 | £302 | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | £352 | £352 | £352 | n/a (was £352) | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | n/a | n/a (was £246) | n/a | £253 | £334 | £334 | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | n/a | £302 | £302 | £302 | £302 | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | n/a | £302 | £302 | n/a | n/a | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 4.92 (13) | n/a | n/a | n/a | £290 | £290 | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.71 (28) | £333 | n/a | n/a (was £402) | n/a | n/a | £402 | £402 | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (21) | n/a | n/a | £234 (-4%) | n/a | n/a | £235 (-1%) | £238 | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a | £350 | £350 | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | n/a | £241 | n/a (was £241) | £241 | £316 | £316 | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | £184 | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Kept median (n)** | | | | £258 (2) | – (0) | £302 (5) | £302 (5) | £271 (6) | £316 (7) | £325 (8) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £275 (12) | £366 (4) | £302 (21) | £277 (27) | £288 (22) | £302 (25) | £308 (21) | |
| **Ours, room/night (status, min)** | | | | £450 Open, min 3 | £450 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3/4 | £450 Open, min 3 | £450 Open, min 3 | |
| **Ours, comparable basis** | | | | £450 | £450 | £450 | £450 | £450 | £450 | £450 | Smoobu room |
| **Our pct / vs kept median** | | | | P100 / +74% | n = 0 | P100 / +49% | P100 / +49% | P100 / +66% | P100 / +42% | P100 / +38% | |
| Our pct / vs wider median | | | | P100 / +64% | P100 / +23% | P100 / +49% | P100 / +62% | P100 / +56% | P100 / +49% | P100 / +46% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) 23 Nov | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Tue 22 Dec–Thu 24 Dec (2n) | Wed 23 Dec–Fri 25 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.5 (18) | n/a | n/a | n/a | £192 | £199 | n/a | n/a | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (52) | n/a | n/a | n/a | £252 | £293 | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | £236 (+9%) | £200 | £214 | £226 (-4%) | n/a | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.68 (63) | n/a | n/a | n/a | £206 (-1%) | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.43 (170) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.76 (29) | n/a | n/a | £228 | n/a | £237 | n/a | n/a | none listed |
| **Kept median (n)** | | | | – (0) | – (0) | £232 (2) | £203 (4) | £225 (4) | £226 (1) | – (0) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £150 (1) | – (0) | £228 (5) | £202 (7) | £225 (10) | £200 (3) | £244 (4) | |
| Ours | | | | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | |

Data gaps:
- **Booking.com live prices: NOT CHECKED** (AWS WAF; not attempted, not bypassed). P11 is compared at list (Smoobu × 1.15 policy; × 1.10 alongside) + £149 ÷ n, not at the promoted price a guest sees.
- **P11 review count on Booking.com** is not in `listings.csv`: review gap NOT CHECKED, `quality_premium` = 0 by construction. **P11 3–6 Jan closure** (no reservation): cause NOT CHECKED. **P11 24–26 Nov** shows available in `prices.csv` after Reyhan's 23 Nov 00:07Z min-stay DSO: Smoobu block status NOT CHECKED here.
- **P06 sold stays:** the cause of the 0.60–0.74× gap (special offer, Airbnb/Smoobu rules, or a price change before booking) is NOT CHECKED. PriceLabs shows no price DSO on those nights. The paid all-in assumes the guest paid room + £129 cleaning (Smoobu `basePrice` + `cleaningFee`). 3–6 Dec has kept n = 0 and a wider set skewed by thin availability. Shortfall figures are estimates.
- **SEG:**
  - Not in `id_map`/`policy`. Its reservation (21–26 Dec) comes from PriceLabs, not the Smoobu extract; channel NOT CHECKED.
  - Cleaning fee, OTA listing id, rating and reviews: NOT CHECKED. Room-only figures are compared with all-in comps.
  - 4–7 Dec n = 0; NYE kept n = 1 (rests on wider n = 8, not review-filtered).
- **Comp activity:** 8 kept ids were not returned on any stay today (P17 975294297333089697 for 11 days, P05 912053248917940403 for 4). All pages are HTTP 200; calendars NOT CHECKED, so none was replaced.
- **Thin samples:** P06 kept n = 0–2 today; P05 n = 1–5 with £1,020 / £845 outliers inside; P11 24–26 Nov and 8 Dec n = 2; SEG kept n = 0–3; P14 24–26 Nov n = 2, 27–29 Nov n = 0; P17 n = 0–4.
- **Wider set** is not filtered to at least 10 reviews. Whether Airbnb comp prices include VAT: NOT CHECKED.
- **PriceLabs percentiles** are Nearby Listings summary-table room prices for an unspecified window, not the same dates: P05 4BR 460 / 582 / 704 / 1,217; P06 2BR 321 / 414 / 528 / 664; P11 2BR 233 / 292 / 332 / 390; SEG 3BR 317 / 384 / 475 / 618 (23 Nov). P14 was not re-pulled. `market.csv` is the market agent's; nothing written to it.
- **P17** is not in PriceLabs or Smoobu. **P08** is a handback and was not searched.
