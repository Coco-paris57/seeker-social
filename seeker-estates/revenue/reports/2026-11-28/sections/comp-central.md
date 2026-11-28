# Competitor positioning: CENTRAL/NORTH (D = 2026-11-28)

**Method**
- **Policy read first** (`data/policy.json`). Not raised again: the P06 intentional blocks (P06 gets numbers only), the P14 special setup (numbers only), the Booking.com Visibility Booster, promotion stacking, the 15%/20% stay discounts, the Booking.com +15% markup with derived rate plans, and the P08 handback.
- **Comp ids: the same as yesterday, no replacement** (P05 6, P06 12, P11 12, P14 12, P17 7, SEG 11; the list is in `comps.csv`).
  - All 60 comp pages and our 3 Airbnb pages returned **HTTP 200** (checked 2026-11-28 07:29:49–07:31:40Z). Every kept comp still has at least 12 reviews.
  - **7 comps got a new review overnight**, which shows they are active. Three of them are P17 comps that were not returned on any stay: 975294297333089697 (170 → 171, **16th day not returned**), 1242000869201075198 (89 → 90) and 1182369331195783741 (53 → 54). That is why they were kept.
  - **Ratings:** P06 is still **4.38 (13)** and P05 **4.79 (39)**. Scott Ellis on Airbnb ([1823298025501355473](https://www.airbnb.co.uk/rooms/1823298025501355473), the id the channel lane identified on 22 Nov) shows **"New", 0 reviews**.
  - **Not returned on any stay today:**
    - P05: 912053248917940403 (**9th day**)
    - P11: 1090528454481682946, 654396087724294901, 1515051936255130803
    - P06: 1420126228540342938, 917140285217729256, 1315177393080154583, 1018722159796386217
    - P14: 1435253477626754812, 1075245497252121738, 1659680062193836633, 1595613237427991150
    - P17: the three listed above
    - SEG: 1633989864851131941, 6620546, 1548502477554034012, 11056472, 52560423, 897028868119653426
  - Their pages are live. Calendars were not read, so "bookable in the next 60 days" is **NOT CHECKED** for them, and none was replaced.
- **Searches:** 45 public Airbnb map searches (airbnb.co.uk; 323 result pages; 4,136 cards), **checked 2026-11-28 07:20:17–07:29:48Z**. No parse failure and no bot challenge. Same boxes, filters and search parameters as yesterday.
  - "Wider" means the same bedroom count, rated, within 1.25 km (SEG 1.0 km). It is **not filtered to at least 10 reviews**.
- **Stays priced for every comp and for us:**
  - Default stays: Fri 4–Sun 6 Dec (next Fri–Sun), Tue 1–Thu 3 Dec (midweek), Sun 27–Tue 29 Dec (contains D+30 = 28 Dec), and Fri 25–Sun 27 Dec for the trend.
  - Requested stays:
    - P05: 29 Nov–3 Dec, 7–9 Dec, 13–15 Dec, Valentine's 13–17 Feb
    - P06: 2–3 Dec; **6–8 Dec** (the new 2-night gap); **8–12 Dec as sold**. 6–9, 9–12 and 6–12 Dec were dropped because 8–11 Dec is now booked.
    - P11: 30 Nov–4 Dec, 1–3 Dec, 8–9 Dec, darts 14–19 Dec, 23–26 Dec
    - SEG: open December stays 10–13, 12–15 and 16–20 Dec, plus 26–30 Dec
    - P14 and P17: 7–9, 14–16 and 17–19 Dec
- **Our prices:**
  - From `data/snapshots/2026-11-28/prices.csv` (Smoobu and PriceLabs columns), with booked/open status from `reservations.csv`.
  - **P05/P06: Smoobu and PriceLabs disagree today, so our own Airbnb card is the comparable ("obs")**, as the brief asks.
  - **The cards follow Smoobu, not the current PriceLabs price:**
    - P05 card room = **0.765 × Smoobu** on all three December stays (for example 29 Nov–3 Dec: (£1,530 − £195) ÷ 4 = £333.75 = 0.765 × £436.25). Feb is 0.880 × Smoobu.
    - P06 2 Dec: (£400 − £129) = 0.826 × Smoobu £328.
    - **So the Smoobu price is the one live on Airbnb.**
  - SEG: **our own Airbnb card, all-in, is used for the first time.** Until yesterday SEG was compared on PriceLabs room only, because cleaning was NOT CHECKED. This is a method change, explained in the SEG section.
  - P05 13–17 Feb: PriceLabs `get_listing_prices` today (refreshed 28 Nov 07:07:15Z).
- **Price basis:**
  - Comps: Airbnb total ÷ nights, after offers, cleaning included, taxes excluded.
  - P11: list all-in = Smoobu × 1.15 + £149 ÷ n. Booking.com live prices are NOT CHECKED (AWS WAF; not attempted).
  - P14: Smoobu room.
- **PriceLabs (read-only, 9 calls, strictly one per message):**
  - `get_user_logs` (listing, 27–28 Nov)
  - `get_listing_date_overrides` (P05, P06, P11)
  - `get_listing_prices` (P05, 12–17 Feb)
  - `get_neighbourhood_data` (P05, P06, P11, SEG, P14)
  - All returned 200. No write tool was used and no sync was triggered.
- **Rows written:** `data/snapshots/2026-11-28/comps.csv` already existed (another agent had copied it forward; 30,901 data rows). Under `flock .comps.csv.lock` I appended **672 rows**:
  - 109 kept, 525 wider and 38 `:ours`
  - 40 of the rows are `SEG*`
  - The file now has 31,573 data rows, all with 11 fields.
  - No guest data and no booking references. `adults=` in the source text is the search parameter.

## Overnight: edits and price moves
- **The 27 Nov ~15:00Z daytime batch was edit-triggered (`get_user_logs`):** Reyhan made 9 listing-level edits between 14:56:39Z and 15:02:33Z. All of them deepen PriceLabs discounts.
  - **P05 (3166592):**
    - **29 Nov–2 Dec −8% → −10%** (min 3), 15:00:25Z
    - **4–31 Jan −8% → −10%** (min 3), 15:00:31Z
    - **1–28 Feb −5% → −8%** (min 4), 15:00:37Z. This covers Valentine's.
  - **P06 (3288517): 3–13 Dec −2%** (min 3), new at 15:02:01Z. It covers the 8–12 Dec nights that sold the same day.
  - East lane (reported only): P04 6–26 Dec −5% (min 3); P12 30 Nov–6 Dec and 7–10 Dec −2% (min 2), incl. the Vrbo copy.
  - **All of these run against Corentin's "cut PriceLabs discounts" and against the comp evidence below, so they go to Corentin as confirm or revert.**
  - P11: no edit. The 8 Dec +50% (min 1), darts 14–18 Dec min 2 only and 23–25 Dec min 2 only are unchanged. **None of Reyhan's earlier items has been reverted.**
- **Price moves, 27 → 28 Nov:**
  - **P05:** Smoobu 29 Nov–2 Dec **£466.00 → £436.25** (PriceLabs £458.50), 7–8 Dec £412.00 → £383.50 (PL £413.50), 13–14 Dec £469.50 → £445.00 (PL £471.00).
    - The cards fell **£405.25 → £382.50, £413.00 → £391.00 and £457.00 → £438.00 a night**.
    - Valentine's (PriceLabs `price`) is now 421/400/396/402 = **£404.75** (was £416.25), against uncustomized £455.50, so it is **11.1% under uncustomized** (was 8.2%).
  - **P06:** 2 Dec Smoobu £294 → £328 (PL £294) and the card **£374 → £400**. 6–7 Dec Smoobu is 271/262 (PL 326/296).
  - **P11:** −£38 over 12 open nights. Darts are £237.60 (was £241.20), 23–25 Dec £264.67 (was £265.33).
  - **SEG:** −£395 over 33 nights. 10–12 Dec **£371.67 → £360.33** (13 Dec £413 → £340), 26–29 Dec **£581.50 → £556.75**.
  - **P14:** £450 flat to 27 Dec. 28 Dec–2 Jan −£98 net.
- **New booking: P06 8–12 Dec, Airbnb, £948.60 room plus £129 cleaning, made 27 Nov.**
  - **It is not registered in PriceLabs:** `raw/prices_3288517.json` shows 8–12 Dec with a blank booking_status, last refreshed 27 Nov 15:02:19Z.
  - P05, P11 and P14 have no new booking or cancellation. SEG is unchanged: 21–26 Dec and 30 Dec–3 Jan booked, 29 Nov–9 Dec and 15 Dec blocked.

## Summary

| Ref | Comps kept (n per stay) | Our pct vs kept, open/sold stays | Rating ours vs kept median; review gap | Booked vs market, next 30 / 60 | Supported positioning |
|---|---|---|---|---|---|
| **P05 4BR** | 6 (1–5) | **7–9 Dec P25 / −23%** (wider −14%); **13–15 Dec P25 / −16%** (wider −7%); **Valentine's 13–17 Feb P20 / −13%** (wider −13%); 29 Nov–3 Dec P33 / −6% (wider P17 / −8%); 1–3 Dec P33 / −7% | **4.79 (39)** vs 4.50 (17); **+22 reviews** | **70.0% (21/30) vs 50%**; 45.0% (27/60) vs 38% (PriceLabs 70% / 47%) | `quality_premium` **+0.116, so +12% vs median.** `recommend` → **raise +21.6%** at every open stay. Supported Smoobu room: **29 Nov–3 Dec £527–£543** (now £436.25), **7–9 Dec £533–£611** (now £383.50), **13–15 Dec £557–£634** (now £445.00), **13–17 Feb £537** (now £404.75). Median-level room: £466–£480 / £465–£534 / £486–£555 / £475. **Reyhan's 27 Nov edits moved the other way** (−10% / −10% / −8%). |
| **P06 2BR** | 12 (0–4) | **8–12 Dec as sold: P0 / −51%** kept (n 3), **P5 / −45% vs trimmed wider** (£494, n 38); 6–8 Dec (gap, unsellable at min 3) P0 / −18% kept, P19 / −28% trimmed; **2–3 Dec**: kept n 0, **P48 / −5% trimmed** (£423, n 21) | **4.38 (13)** vs 4.635 (26); −13 reviews | 73.3% (11/15 sellable) vs 50%; PriceLabs 73% / 87% (8–12 Dec not yet registered in PriceLabs) | `quality_premium` **−0.102, so −10% vs median.** Even after that, **8–12 Dec sold about 40% under the quality-adjusted market**: £269.40 all-in vs about £444–£493, which is **about £700–£890 over 4 nights (estimate)**. **2 Dec: hold** (the £400 card is above the quality-adjusted £380). 6–7 Dec: numbers only (policy). |
| **P11 2BR** | 12 (0–8) | **Darts P25 / −20%** (wider P40 / −10%); **23–26 Dec P43 / −15%** (wider −4%); 30 Nov–4 Dec P100 / +2% (n 3; wider +11%); 1–3 Dec P86 / +5% (wider +12%); 8 Dec P100 / +94% (n 1; wider +57%) | Booking.com only vs kept Airbnb 4.655 (37): not comparable, gap NOT CHECKED | 53.3% (16/30) vs 49%; 61.1% (22/36 sellable) vs 36% (PriceLabs 53% / 73%) | `quality_premium` 0, so **0% vs median on list all-in.** `recommend` → **raise +5% on the darts (to about £249 room)** and **+5% on 23–26 Dec (about £278)**. The median-level room is £268–£305 and £276–£319. **Hold** 30 Nov–4 Dec, 1–3 Dec and 8 Dec. |
| **SEG 3BR** (reference) | 11 (0–3) | **On our own Airbnb card (all-in): 10–13 Dec P0 / −35%** kept (n 2), **P0 / −42% wider** (n 4); **12–15 Dec P0 / −31%**, −38% wider; **16–20 Dec P0 / −43% wider** (n 3); **26–30 Dec P20 / −42% wider** (n 5) | **"New", 0 reviews** vs 4.84 (33); −33 reviews | 27.8% (5/18 sellable) vs 44%; PriceLabs 60% / 42% vs 44% / 32% (inflated by the 29 Nov–9 Dec block) | `quality_premium` 0 (no rating), so **up to the median, not above.** The gap comes mainly from the Airbnb layer: card room = **0.72 × PriceLabs**, and the card carries a 17–19% strikethrough. **Without the offer the cards would still be −16% to −31%.** Median-level all-in: 10–13 Dec £478–£533 (now £310), 12–15 Dec £456–£506 (£316), 16–20 Dec about £626 (£355), 26–30 Dec about £749 (£439). With 0 reviews, aim below the median. |
| P08 2BR | not searched | n/a | – | handback | Moot (policy). |
| P14 1BR | 12 (0–6) | P100 on every kept stay | not on Airbnb; kept median 4.885 (20.5) | 0% vs 46% / 32% | Numbers only (special setup): **+31% to +122% vs kept median, +28% to +101% vs wider.** PriceLabs 1BR P50 £191, P90 £272 (n 171). |
| P17 1BR | 7 (0–3) | n/a | kept median 4.69 (54) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (same kept ids, same stays):**
- **P05: our cards fell 2.5–5.6% overnight** (Reyhan's −10% DSO plus engine moves on stale Smoobu prices) while the comps held, so every gap widened:
  - 29 Nov–3 Dec: −3% → **−6%** kept, −10% → −8% wider (the wider median fell £449 → £416)
  - 7–9 Dec: −20% → **−23%**, the **5th day at P25**
  - 13–15 Dec: **−3% → −16%**. The kept median rose £469 → £522 because 1639043256346803626 (£393) was not returned. On the same four comps the gap went −12% → −16%.
  - Valentine's: −11% → **−13%** (6th day at or below P40)
- **P11:**
  - Darts: kept £400 (n 7) → **£380 (n 8)**, because 1480693526878012391 returned at £325. We moved P29 / −23% → **P25 / −20%** (**4th day below P30**).
  - 23–26 Dec: kept £382 → £417, because 1480693526878012391 (£342) dropped out. We moved P50 / −7% → **P43 / −15%**; the wider median rose £361 → £367.
  - 1–3 Dec: kept £300 → £329. 30 Nov–4 Dec: kept £271 → £304 (n 3).
- **P06:** 2 Dec card £374 → £400 and trimmed wider £380 → £423, so we are still at the median (−2% → −5%).
- **SEG (room basis, for continuity):**
  - 10–13 Dec: PriceLabs room £360.33 vs wider £533 (n 4) = −32% (yesterday −24% vs £492). The wider median rose because yesterday's cheapest wider comp (1423195425061586598, £363) was not returned.
  - Card: 10–13 Dec £317.67 → £309.67, 26–30 Dec £456.25 → £438.50.
- **P14:** kept 14–16 Dec £290 → £271, 17–19 Dec £290 → £271, 25–27 Dec £334 → £344.
- **P17:** 7–9 Dec £218 → £226 (n 3), 17–19 Dec £244 → £202.

## P11 Camden (3064196; Booking.com only)

| Open nights (stay priced) | Ours room avg 28 Nov (27 Nov) | List all-in ×1.15 (×1.10) | Kept median (n) | **Pct / vs kept** | Wider median (n); pct / vs wider | Median-level Smoobu room* kept / wider |
|---|---|---|---|---|---|---|
| 30 Nov–3 Dec (30 Nov–4 Dec, 4n, min 2) | £238.25 (£240.75) | £311.24 (£299.33) | £304 (3) | P100 / +2% | £281 (21); P76 / +11% | £232 / £212 |
| 1–2 Dec (Tue 1–Thu 3 Dec, midweek) | £236.00 (£238.00) | £345.90 (£334.10) | £329 (7) | P86 / +5% | £308 (34); P76 / +12% | £221 / £203 |
| **8 Dec** (8–9 Dec, 1n, min 1; +50% DSO) | £297 (£298) | £490.55 (£475.70) | £253 (1) | P100 / +94% | £312 (14); **P86 / +57%** | £90 / £142 |
| **14–18 Dec, darts** (14–19 Dec, 5n, min 2) | **£237.60** (£241.20) | £303.04 (£291.16) | **£380 (8)** | **P25 / −20%** | £338 (40); P40 / −10% | **£305 / £268** |
| **23–25 Dec** (23–26 Dec, 3n, min 2) | £264.67 (£265.33) | £354.03 (£340.80) | £417 (7) | **P43 / −15%** | £367 (42); P45 / −4% | £319 / £276 |
| 4–5 Dec (Fri 4–Sun 6 Dec) | £297.50 | £416.62 | n = 0 | excluded (5 Dec booked) | £368 (2) | – |
| 27–28 Dec (Sun 27–Tue 29 Dec, D+30) | £351.50 | £478.72 | £585 (3) | excluded (booked 26 Dec–3 Jan) | £585 (14) | – |

\* Median-level Smoobu room = (median − £149 ÷ n) ÷ 1.15: the Smoobu rate whose Booking.com list price plus cleaning equals the comp median, before stacked promotions (policy).

- **Darts 14–19 Dec is the clearest gap for the 4th day:** −20% vs kept, −10% vs wider.
  - Supported: **+5%, to about £249 room** (the `recommend` step). The median-level room is £268–£305.
  - Policy: Corentin asked on 24 Oct to leave the darts override as it is, and today it is still **min-stay 2 only, with no % override**. Reported as fact, not re-raised.
- **23–26 Dec moved back to −15% kept** (−4% wider), as the cheap comp 1480693526878012391 sold.
  - Supported: **+5% (about £278)**. This is Reyhan's removed premium, so it stays **confirm or revert** for Corentin.
- **30 Nov–4 Dec, 1–3 Dec and 8 Dec are above the median** (+11% to +57% vs wider). `recommend` → **hold**. 8 Dec is the +50% DSO orphan (open item t-p11-8dec-orphan).
- **Positioning:** `quality_premium` = 0 (no Booking.com review data). `recommend(0.53, 0.49, pct, 0)` → raise +5% below P50, hold at P50 and above. **Supported: the comp median (0%) on list all-in.**
- **Differentiators:** our flat is a basement with a patio and no lift. Among the comps, 4 of 12 have a lift and 3 a balcony or terrace. 2557770 has 182 reviews. 654396087724294901 is a Superhost (not returned).
- **PriceLabs 2BR:** P25 £232, P50 £292, P75 £329, P90 £388 (n 171). Surge 26–31 Dec +44.0%. Occupancy is 80.3% on 5 Dec (+10.1% on 5–7 Dec).

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Gap (stay) | Smoobu room/night 28 Nov (27 Nov); PriceLabs; min | Ours, Airbnb card all-in/night (27 Nov) | Kept median (n) | Pct / vs median | Wider 4BR ≤1.25 km (n) | +11.6% supported → Smoobu room; median-level |
|---|---|---|---|---|---|---|
| **29 Nov–2 Dec** (29 Nov–3 Dec, min 3) | 442/429/432/442 = **£436.25** (£466.00); PL £458.50; **Reyhan −10% DSO** (was −8%) | **£382.50** (£405.25) | £405 (3) | P33 / −6% | £416 (6): **P17 / −8%** | **£527 (kept) / £543 (wider)**; median-level £466 / £480 |
| 1–2 Dec (Tue 1–Thu 3 Dec; inside the gap) | £437.00 (£464.00) | £431.81 derived (card not returned) | £465 (3) | P33 / −7% | £465 (7): P29 / −7% | (inside the 29 Nov–3 Dec gap) |
| **7–8 Dec** (7–9 Dec, min 2; −1% DSO) | 395/372 = **£383.50** (£412.00); PL £413.50 | **£391.00** (£413.00) | **£506 (4)** | **P25 / −23%** | £453 (11): P27 / −14% | **£611 (kept) / £533 (wider)**; median-level £534 / £465 |
| **13–14 Dec** (13–15 Dec, min 2) | 404/486 = **£445.00** (£469.50); PL £471.00 | **£438.00** (£457.00); card shows strikethrough £498 | £522 (4) | **P25 / −16%** | £469 (9): P33 / −7% | **£557–£634**; median-level £486 / £555 |
| **13–16 Feb, Valentine's** (13–17 Feb, 4n, min 4) | PriceLabs `price` **421/400/396/402 = £404.75** (£416.25); uncustomized £455.50; **Reyhan −8% DSO** (was −5%) | **£405.00** (£415.25); strikethrough £453.50 | **£467 (5)** | **P20 / −13%** | £467 (11): P27 / −13% | **£537**; median-level **£475** |

- **P05 is booked 20 points above the market (70% vs 50%) yet priced at P17–P33 on every open stay**, with the best rating in its set. Reyhan's 27 Nov edits cut further: 29 Nov–2 Dec −8% → −10%, 4–31 Jan −8% → −10%, Feb −5% → −8%. **Confirm or revert** (against "cut PriceLabs discounts").
- **29 Nov–3 Dec checks in tomorrow** (4 nights, min 3), at −6% to −8%. Removing the −10% brings the room to about £485 (estimate from the Smoobu ÷ 0.90 inverse), still below the supported £527–£543.
- **Smoobu sits £22–£30 a night below PriceLabs on the December stays.** The cards match Smoobu exactly (0.765 × Smoobu + £195 ÷ n), so the lower Smoobu price is the one guests see. A push would raise the live price by about 5–8% on its own (PriceLabs ÷ Smoobu = 1.05–1.08).
- **Strikethroughs on our cards:** 13–15 Dec (£996 → £876) and 13–17 Feb (£1,814 → £1,620) show strikethroughs. Yesterday 7–9 and 13–15 Dec did. They vary day to day; the cause (Airbnb display or a Smoobu rule) is NOT CHECKED.
- 21 Dec (£2,178, 1n) and 29 Dec (£2,172, 1n) are +300% DSO orphans (open action a-p05-dec). Not raised as new.
- **Positioning:** `quality_premium(4.79, 4.50)` = +0.116. `recommend(0.70, 0.50, 0.17–0.33, 0.116)` → **raise +21.6%**. **Supported: +12% vs median.**
- **Differentiators:**
  - Quality peers: 912053248917940403 (4.97, Superhost, lift, park view; not returned for the 9th day) and 1639043256346803626 (4.91, Superhost, terrace, parking).
  - The cheap end is rated well below us: 1610095240357069208 (4.15) and 1363636555926649515 (3.93).
  - Ours: Abbey Road location. Parking or a terrace is NOT CHECKED.
- **PriceLabs 4BR:** P25 £452, P50 £580, P75 £702, P90 £1,217 (n 91). Surge 26–31 Dec +30.0%. Occupancy +23.6% on 28 Dec–1 Jan.

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272): numbers only (policy)

| Stay | Smoobu room 28 Nov; PriceLabs | Ours (basis) | Kept median (n) | Wider raw (n) | Trimmed wider < £1,000 (n): pct / vs | At q −10% vs trimmed |
|---|---|---|---|---|---|---|
| **8–12 Dec (4n), SOLD 27 Nov** | 334/343/334/364 (booked); PL 298/310/306/326 = £310.00; PL user_price 304/317/312/333 = £316.50 | **£269.40 paid all-in** (£948.60 + £129 ÷ 4; room **£237.15**) | **£549 (3)**: P0 / −51% | £549 (43): P5 / −51% | **£494 (38): P5 / −45%** | about £444 all-in |
| **6–8 Dec (2n gap, min 3)** | 271/262 = £266.50; PL 326/296 | £286 derived (card not returned: min 3) | £350 (4): P0 / −18% | £465 (36): P17 / −39% | £396 (31): P19 / −28% | about £356 |
| **2–3 Dec (1n, min 1)** | **£328** (PL £294; +25% DSO) | **£400 card** | n = 0 | £470 (24): P42 / −15% | **£423 (21): P48 / −5%** | about £380 |

- **The 8–12 Dec booking was sold far under the market:**
  - Paid room £237.15 a night is **0.749 × the PriceLabs user_price (£316.50, the 27 Nov Smoobu rate)** and **0.765 × the PriceLabs price (£310.00, after Reyhan's −2%)**. That fits the 0.765 Airbnb tier (last-minute −15% × 0.90; estimate of the mechanism).
  - **All-in £269.40 sits at P0–P5, −45% to −51% vs comps** asking for the same nights. Even at the quality discount (−10%), the market supported about £444–£493 all-in.
  - That is **about £700–£890 over 4 nights (estimate)**. Comp asks are the remaining inventory, so they lean high.
  - Reyhan set **−2% on 3–13 Dec at 15:02:01Z** the same day. The booking is **not yet in PriceLabs** (booking_status blank).
- **6–7 Dec is a 2-night gap that cannot sell at min 3:** 5 Dec checks out on 6 Dec and 8 Dec is booked. Comps for 6–8 Dec: kept £350 (n 4), trimmed wider £396 (n 31). Whether to open it at min 2 is Corentin's call (policy intentional block). Not raised as an opportunity.
- **2 Dec: hold.** The £400 card is at the trimmed median (−5%) and above the quality-adjusted level (about £380).
- **Positioning:** `quality_premium(4.38, 4.635)` = −0.102. `recommend(0.73, 0.50, pct, −0.102)` → raise +10% on PriceLabs occupancy. **Supported: −10% vs median.** The rating, not the price, is the constraint (t-p06-review-2711).
- **PriceLabs 2BR:** P25 £320, P50 £414, P75 £529, P90 £664 (n 217). The 5 Dec occupancy is 75.3% (+8.7%). Surge 26–31 Dec +29.4%.

## SEG Scott Ellis Gardens 3-bed (PriceLabs 3588993; Airbnb 1823298025501355473; NW8; reference positioning only, not mapped)

| Stay | PriceLabs room/night 28 Nov (27 Nov) | Status (min) | **Our Airbnb card all-in/night** (strikethrough) | Kept median (n); pct / vs | Wider 3BR ≤1.0 km (n); pct / vs | Median-level all-in |
|---|---|---|---|---|---|---|
| **10–12 Dec** (10–13 Dec, 3n) | 324/374/383 = **£360.33** (£371.67) | Open (min 3) | **£309.67** (£374.33) | £478 (2): **P0 / −35%** | £533 (4): **P0 / −42%** | £478–£533 |
| 12–14 Dec (12–15 Dec, 3n) | 383/340/384 = £369.00 (£396.67) | Open (min 2/3); 15 Dec blocked | **£316.00** (£382.33) | £456 (2): P0 / −31% | £506 (4): P0 / −38% | £456–£506 |
| **16–19 Dec** (16–20 Dec, 4n) | 391/416/469/489 = **£441.25** (£451.50) | Open (min 3) | **£355.25** (£434.75) | n = 0 | £626 (3): **P0 / −43%** | about £626 |
| **26–29 Dec** (26–30 Dec, 4n) | 517/501/593/616 = **£556.75** (£581.50) | Open (min 4; 27 Dec min 7) | **£438.50** (£538.75) | n = 0 | £749 (5): **P20 / −42%** | about £749 |
| 27–28 Dec (27–29 Dec, D+30) | 501/593 = £547.00 | Open (min 7 on 27 Dec) | not returned | n = 0 | £600 (5): P40 / −9% (room only) | hold |

- **Method change:** SEG is now compared on its own Airbnb card (all-in, as guests see it), not on PriceLabs room only. On the old basis, 10–13 Dec would be −25% kept / −32% wider today.
- **Every open December stay is at P0–P20 and 31–43% under the comp median.** Much of that gap is the Airbnb layer:
  - Card room ex-£150 cleaning = £259.67 = **0.72 × PriceLabs** on 10–13 Dec.
  - The card shows a 17–19% strikethrough, which is the special offer the channel lane reports (t-scott-ellis-2011).
  - **Without the offer the cards would still be −16% to −31%** (£374–£539 a night vs £456–£749).
- **Supported:** `quality_premium` = 0 (0 reviews). The evidence supports **up to the comp median, not above**. With 0 reviews against a kept median of 33, aim below it.
  - `recommend` on PriceLabs occupancy (0.60 vs 0.44) → raise +10%. On booked-only (5/18 = 28% vs 44%) → fix-listing, which fits a new listing with no reviews.
  - Yesterday's resolution stands: no PriceLabs rise on an unmapped flat; **the Airbnb layer is the lever.**
- 27 Dec min 7 still blocks short arrivals into the surge (+27.9% prices 26–31 Dec; +23.1% occupancy 27 Dec–1 Jan).
- **Differentiators:** SEG is 3 bed / **2 bath**; comp bath counts are NOT CHECKED, and only 1548502477554034012 states 2 baths. Standouts: 6620546 (315 reviews, garden), 52560423 (378 reviews), 40810873 (penthouse, 4.95 from 91 reviews). 6 of the 11 were not returned today.
- **PriceLabs 3BR:** P25 £312, P50 £378, P75 £473, P90 £645 (n 149).

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- **Smoobu 28 Nov:** £450 every night to 27 Dec (min 3–4). 28 Dec–2 Jan £473–£603 (−£98 net overnight).
- **Booked:** 0% next 30 / 60 vs market 46% / 32% (pl_kpis). No P14 edit in the 27–28 Nov log.
- **Vs kept median (P100 on every kept stay):**

| Stay | vs kept median (n) |
|---|---|
| 1–3 Dec | +122% (1) |
| 7–9 Dec | +49% (5) |
| 14–16 Dec | +66% (6) |
| 17–19 Dec | +66% (6) |
| 25–27 Dec | +31% (4) |
| 27–29 Dec | +37% (1) |

  On 4–6 Dec the kept n is 0; we are +32% vs wider (n 3).
- **PriceLabs neighbourhood:** 1BR P25 £147, P50 £191, P75 £237, P90 £272 (n 171). £450 is 1.65× the 1BR P90.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)

| Stay | Kept median (n) |
|---|---|
| 1–3 Dec | £186 (1) |
| 4–6 Dec | – (0) |
| 7–9 Dec | £226 (3) |
| 14–16 Dec | £200 (2) |
| 17–19 Dec | £202 (2) |
| 25–27 Dec | £222 (2) |
| 27–29 Dec | £260 (1) |

- Rating median 4.69 (54).
- 975294297333089697 has not been returned for 16 days, but it gained a review overnight (171), so it is active and was kept.

## P08 Islington: handback
- Moot under policy. Not searched; no rows written.

## Comp tables

**Source for every comp row:**
- Airbnb public search (airbnb.co.uk), checked 2026-11-28 07:20:17–07:29:48Z.
- Nightly = total ÷ nights, after offers, cleaning included, taxes excluded.
- Rating (reviews) and sleeps come from each listing page (07:29–07:31Z). Distance in km is from 17 Nov (SEG: from the PriceLabs pin, 22 Nov).
- (±%) is the change vs 27 Nov for the same stay. "n/a" means not returned (booked or min stay).
- "excluded (not open)" means at least one night is booked or blocked. "sold" means the paid price.
- Every priced row is in `data/snapshots/2026-11-28/comps.csv`.

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) 28 Nov | Mon 30 Nov–Fri 4 Dec (4n) | Tue 1 Dec–Thu 3 Dec (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Tue 8 Dec–Wed 9 Dec (1n) | Mon 14 Dec–Sat 19 Dec (5n) | Wed 23 Dec–Sat 26 Dec (3n) | Fri 25 Dec–Sun 27 Dec (2n) | Sun 27 Dec–Tue 29 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.63 (32) | £304 (-2%) | £340 | n/a | n/a | £442 | £555 | £573 | £620 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.73 (182) | n/a | n/a | n/a | n/a | £289 | £348 | £418 | £418 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | £310 (-2%) | £346 (-4%) | n/a | n/a | £407 | £520 | £538 | £585 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a | £338 | n/a | n/a | £400 | £417 | £438 | n/a | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.5 (14) | n/a | £329 (-4%) | n/a | n/a | £407 | n/a | n/a | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.71 (14) | n/a | n/a | n/a | n/a | £360 (-1%) | £507 | n/a | n/a | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | £231 | £262 | n/a | n/a | £325 | n/a (was £342) | n/a | n/a | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.39 (66) | n/a | £230 | n/a | £253 | £262 | £307 | n/a | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (89) | n/a (was £202) | n/a (was £210) | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (74) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.58 (40) | n/a | £217 | n/a | n/a | n/a | £339 | n/a | n/a | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Kept median (n)** | | | | £304 (3) | £329 (7) | – (0) | £253 (1) | £380 (8) | £417 (7) | £488 (4) | £585 (3) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £281 (21) | £308 (34) | £368 (2) | £312 (14) | £338 (40) | £367 (42) | £436 (26) | £585 (14) | |
| **Ours, room/night (status, min)** | | | | £238 Open, min 2 | £236 Open, min 2 | £298 Booked/Open, min 2 | £297 Open, min 1 | £238 Open, min 2 | £265 Open, min 2 | £278 Booked/Open, min 2/4 | £352 Booked, min 4/5 | |
| **Ours, comparable basis** | | | | £311 | £346 | £417 | £491 | £303 | £354 | £394 | £479 | list = Smoobu ×1.15 (policy) + £149/n |
| **Our pct / vs kept median** | | | | P100 / +2% | P86 / +5% | excluded (not open) | P100 / +94% | P25 / -20% | P43 / -15% | excluded (not open) | excluded (not open) | |
| Our pct / vs wider median | | | | P76 / +11% | P76 / +12% | excluded (not open) | P86 / +57% | P40 / -10% | P45 / -4% | excluded (not open) | excluded (not open) | |

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) 28 Nov | Sun 29 Nov–Thu 3 Dec (4n) | Tue 1 Dec–Thu 3 Dec (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Fri 25 Dec–Sun 27 Dec (2n) | Sun 27 Dec–Tue 29 Dec (2n) | Sat 13 Feb–Wed 17 Feb (4n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.15 (13) | £416 (-7%) | £476 (-6%) | n/a | £453 | £469 | n/a | n/a | £392 | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | £405 | £465 | £542 | £620 | £620 | n/a | n/a | £467 | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (30) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | £375 (-2%) | £400 (-4%) | n/a | n/a | £437 (+6%) | £518 | £606 (-6%) | £406 (-1%) | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.91 (32) | n/a | n/a | n/a | £384 (-2%) | n/a (was £393) | n/a | n/a | £805 | Superhost, parking listed, balcony/patio/terrace (house) |
| [1481043902711346984](https://www.airbnb.co.uk/rooms/1481043902711346984) | 1.16 | 8 | 4.76 (17) | n/a | n/a | n/a | £560 (-3%) | £576 (+1%) | n/a | n/a | £528 | added 18 Nov |
| **Kept median (n)** | | | | £405 (3) | £465 (3) | £542 (1) | £506 (4) | £522 (4) | £518 (1) | £606 (1) | £467 (5) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £416 (6) | £465 (7) | £796 (2) | £453 (11) | £469 (9) | £760 (2) | £606 (1) | £467 (11) | |
| **Ours, room/night (status, min)** | | | | £436 Open, min 3 | £437 Open, min 3 | £516 Booked, min 4 | £384 Open, min 2 | £445 Open, min 2 | £689 Booked, min 3 | £735 Booked, min 3 | £405 Open, min 4 | |
| **Ours, comparable basis** | | | | £382 obs | £432 | £492 | £391 obs | £438 obs | £625 | £759 | £405 obs | obs = own Airbnb card in same search; else 0.765/0.900 × Smoobu + £195/n |
| **Our pct / vs kept median** | | | | P33 / -6% | P33 / -7% | excluded (not open) | P25 / -23% | P25 / -16% | excluded (not open) | excluded (not open) | P20 / -13% | |
| Our pct / vs wider median | | | | P17 / -8% | P29 / -7% | excluded (not open) | P27 / -14% | P33 / -7% | excluded (not open) | excluded (not open) | P27 / -13% | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) 28 Nov | Tue 1 Dec–Thu 3 Dec (2n) | Wed 2 Dec–Thu 3 Dec (1n) | Fri 4 Dec–Sun 6 Dec (2n) | Sun 6 Dec–Tue 8 Dec (2n) | Tue 8 Dec–Sat 12 Dec (4n) | Fri 25 Dec–Sun 27 Dec (2n) | Sun 27 Dec–Tue 29 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.64 (14) | n/a | n/a | n/a | £384 | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.72 (25) | £296 | n/a | n/a | £296 | n/a | n/a | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | n/a | n/a | £315 | n/a | n/a | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.63 (40) | £354 | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (54) | n/a | n/a | £1,008 | £828 | £909 | n/a | £1,188 | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a (was £771) | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | n/a | £549 | n/a | £754 (-4%) | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.6 (25) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | n/a | n/a | £720 (-1%) | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | £316 | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (89) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| **Kept median (n)** | | | | £325 (2) | – (0) | £1,008 (1) | £350 (4) | £549 (3) | – (0) | £754 (3) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £389 (46) | £470 (24) | £1,098 (9) | £465 (36) | £549 (43) | £660 (31) | £782 (25) | |
| **Ours, room/night (status, min)** | | | | £322 Booked/Open, min 1/3 | £328 Open, min 1 | £374 Booked, min 3 | £266 Open, min 3 | £344 Booked, min 3 | £434 Blocked, min 4 | £480 Blocked, min 3/4 | |
| **Ours, comparable basis** | | | | £332 | £400 obs | £375 | £286 | £269 sold | £424 | £497 | obs = own Airbnb card; sold = paid room + £129 cleaning ÷ n; else 0.83/0.900 × Smoobu + £129/n |
| **Our pct / vs kept median** | | | | excluded (not open) | n = 0 | excluded (not open) | P0 / -18% | P0 / -51% | excluded (not open) | excluded (not open) | |
| Our pct / vs wider median | | | | excluded (not open) | P42 / -15% | excluded (not open) | P17 / -39% | P5 / -51% | excluded (not open) | excluded (not open) | |

### SEG

| Airbnb id | Dist km | Sleeps | Rating (reviews) 28 Nov | Tue 1 Dec–Thu 3 Dec (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Thu 10 Dec–Sun 13 Dec (3n) | Sat 12 Dec–Tue 15 Dec (3n) | Wed 16 Dec–Sun 20 Dec (4n) | Fri 25 Dec–Sun 27 Dec (2n) | Sat 26 Dec–Wed 30 Dec (4n) | Sun 27 Dec–Tue 29 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1633989864851131941](https://www.airbnb.co.uk/rooms/1633989864851131941) | 0.35 | 6 | 4.88 (43) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | cinema room, garden, Guest favourite |
| [1498503422089605343](https://www.airbnb.co.uk/rooms/1498503422089605343) | 0.43 | 7 | 4.84 (25) | n/a (was £347) | n/a | £374 | £360 (-3%) | n/a | n/a | n/a | n/a | ground floor, refurbished (title), Superhost |
| [6620546](https://www.airbnb.co.uk/rooms/6620546) | 0.62 | 6 | 4.92 (315) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | 4-acre garden, Guest favourite, Superhost |
| [1548502477554034012](https://www.airbnb.co.uk/rooms/1548502477554034012) | 0.62 | 6 | 4.91 (33) | n/a | n/a | n/a | n/a | n/a | n/a | n/a (was £780) | n/a | 2 bath, A/C, Guest favourite (title says sleeps 8; page capacity 6), Superhost |
| [11056472](https://www.airbnb.co.uk/rooms/11056472) | 0.72 | 6 | 4.26 (23) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Marylebone (title) |
| [52560423](https://www.airbnb.co.uk/rooms/52560423) | 0.8 | 6 | 4.9 (378) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite, Superhost |
| [1165719843393058533](https://www.airbnb.co.uk/rooms/1165719843393058533) | 0.82 | 6 | 4.8 (25) | n/a | n/a | £582 | £553 | n/a | n/a | n/a | n/a | Little Venice (title), Superhost |
| [897028868119653426](https://www.airbnb.co.uk/rooms/897028868119653426) | 0.87 | 6 | 4.65 (23) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | family home near Little Venice (title) |
| [1269544547244432855](https://www.airbnb.co.uk/rooms/1269544547244432855) | 0.89 | 6 | 4.7 (61) | £456 (-8%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | A/C, rooftop (title) |
| [1064528274936916938](https://www.airbnb.co.uk/rooms/1064528274936916938) | 0.91 | 6 | 4.81 (26) | £584 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | by Paddington station (title) |
| [40810873](https://www.airbnb.co.uk/rooms/40810873) | 0.93 | 6 | 4.95 (91) | £360 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | penthouse, Little Venice (title), Superhost; ADDED 27 Nov replacing 1648663792586887168 (HTTP 410) |
| **Kept median (n)** | | | | £456 (3) | – (0) | £478 (2) | £456 (2) | – (0) | – (0) | – (0) | – (0) | |
| Wider: same bedrooms, rated, ≤1.0 km (n) | | | | £374 (8) | – (0) | £533 (4) | £506 (4) | £626 (3) | £600 (3) | £749 (5) | £600 (5) | |
| **Ours, room/night (status, min)** | | | | £310 Blocked, min 2 | £401 Blocked, min 3 | £360 Open, min 3 | £369 Open, min 2/3 | £441 Open, min 3 | £494 Booked/Open, min 4 | £557 Open, min 4/5/7 | £547 Open, min 5/7 | |
| **Ours, comparable basis** | | | | £310 | £401 | £310 obs | £316 obs | £355 obs | £494 | £438 obs | £547 | obs = own Airbnb card 1823298025501355473 (all-in, after the special offer); else PriceLabs room, cleaning not added |
| **Our pct / vs kept median** | | | | excluded (not open) | excluded (not open) | P0 / -35% | P0 / -31% | n = 0 | excluded (not open) | n = 0 | n = 0 | |
| Our pct / vs wider median | | | | excluded (not open) | excluded (not open) | P0 / -42% | P0 / -38% | P0 / -43% | excluded (not open) | P20 / -42% | P40 / -9% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) 28 Nov | Tue 1 Dec–Thu 3 Dec (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Fri 25 Dec–Sun 27 Dec (2n) | Sun 27 Dec–Tue 29 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | £202 | n/a | n/a | £252 | £252 | n/a | n/a | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | £352 | n/a (was £352) | £352 | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | n/a | n/a | £246 | £253 | £334 | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a (was £232) | n/a | £302 | £302 | £302 | £352 | n/a | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | n/a | £302 | £302 | n/a | n/a | n/a (was £302) | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 4.92 (13) | n/a | n/a | n/a | £290 | £290 | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.71 (28) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (21) | n/a | n/a | £218 | n/a | n/a | £236 | n/a | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | n/a | £241 | £241 | £241 | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Kept median (n)** | | | | £202 (1) | – (0) | £302 (5) | £271 (6) | £271 (6) | £344 (4) | £352 (1) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £224 (11) | £342 (3) | £302 (15) | £250 (28) | £276 (22) | £352 (14) | £356 (16) | |
| **Ours, room/night (status, min)** | | | | £450 Open, min 3 | £450 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3/4 | £450 Open, min 4 | £483 Open, min 3/4 | |
| **Ours, comparable basis** | | | | £450 | £450 | £450 | £450 | £450 | £450 | £483 | Smoobu room |
| **Our pct / vs kept median** | | | | P100 / +122% | n = 0 | P100 / +49% | P100 / +66% | P100 / +66% | P100 / +31% | P100 / +37% | |
| Our pct / vs wider median | | | | P100 / +101% | P100 / +32% | P100 / +49% | P100 / +80% | P100 / +63% | P93 / +28% | P100 / +36% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) 28 Nov | Tue 1 Dec–Thu 3 Dec (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Fri 25 Dec–Sun 27 Dec (2n) | Sun 27 Dec–Tue 29 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.5 (18) | £186 | n/a | £174 | n/a (was £176) | £176 | £206 | n/a | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (54) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a (was £212) | n/a (was £245) | £226 (+4%) | £218 (-3%) | n/a (was £244) | £238 (-2%) | £260 (-1%) | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (90) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.69 (64) | n/a | n/a | n/a | £182 (-2%) | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.43 (171) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.76 (29) | n/a (was £228) | n/a | £228 | n/a | £228 | n/a | n/a | none listed |
| **Kept median (n)** | | | | £186 (1) | – (0) | £226 (3) | £200 (2) | £202 (2) | £222 (2) | £260 (1) | |
| Wider: same bedrooms, rated, ≤1.25 km (n) | | | | £186 (3) | – (0) | £200 (7) | £150 (5) | £208 (7) | £280 (9) | £289 (2) | |
| Ours | | | | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | |

Data gaps:
- **Booking.com live prices: NOT CHECKED** (AWS WAF; not attempted, not bypassed). P11 is compared at list price (Smoobu × 1.15 per policy, with × 1.10 shown alongside) + £149 ÷ n, not at the promoted price a guest sees.
- **Comp activity / calendars: NOT CHECKED.**
  - 24 kept ids were not returned on any stay today (P05 1, P11 3, P06 4, P14 4, P17 3, SEG 6). All pages are HTTP 200.
  - The 3 P17 ids gained a review overnight, so they are active. None was replaced.
  - P05 912053248917940403 has been missing for 9 days and P17 975294297333089697 for 16.
- **P06:**
  - The ~£700–£890 shortfall on 8–12 Dec is an **estimate** from comp asking prices (remaining inventory) at the −10% quality discount. It is not a booked-comp ADR.
  - The 0.765-tier mechanism is inferred, not confirmed.
  - The 8–12 Dec booking is not yet in PriceLabs (pricelabs lane).
  - The review that took the rating to 4.38 has not been read.
  - Whether 6–7 Dec should open at min 2 is Corentin's call (policy).
- **SEG:**
  - The card basis assumes the card in the search is ours (id 1823298025501355473 from the channel lane, 22 Nov; 0 reviews, capacity 6). The £150 cleaning in the 0.72× room ratio is the channel lane's inferred figure.
  - Kept n is 0–3 on every stay, and wider n is 3–5.
  - The cause of the 29 Nov–9 Dec and 15 Dec blocks is NOT CHECKED.
- **P05:**
  - Kept n is 3 on 29 Nov–3 Dec and 1–3 Dec. Our card was not returned for 1–3 Dec, so that stay uses the derived basis (0.765 × Smoobu + £195 ÷ n). 1639043256346803626 (£805) is an outlier in the Valentine's set.
  - The strikethroughs on our cards: cause NOT CHECKED.
  - Why Smoobu is below PriceLabs after the 15:00Z push is NOT CHECKED (pricelabs lane).
- **P11 darts:** whether a darts % override is still meant to be set is NOT CHECKED.
- **Thin samples:** P11 8 Dec kept n 1 and 30 Nov–4 Dec n 3; P06 8–12 Dec kept n 3 (£316–£909); P14 1–3 and 27–29 Dec n 1; P17 n 0–3.
- **Wider set** is not filtered to at least 10 reviews. Whether Airbnb comp prices include VAT: NOT CHECKED.
- **PriceLabs percentiles** are Nearby Listings summary-table room prices for an unspecified window, not the same dates (28 Nov):

| Listing | Band | P25 / P50 / P75 / P90 (n) |
|---|---|---|
| P05 | 4BR | 452 / 580 / 702 / 1,217 (91) |
| P06 | 2BR | 320 / 414 / 529 / 664 (217) |
| P11 | 2BR | 232 / 292 / 329 / 388 (171) |
| SEG | 3BR | 312 / 378 / 473 / 645 (149) |
| P14 | 1BR | 147 / 191 / 237 / 272 (171) |

  `market.csv` belongs to the market agent; nothing was written to it.
- **Group and account logs** were not pulled (pricelabs lane). The 15:00Z batch is explained by the listing log, but the P11 push at 15:00:17Z has no P11 listing edit, so its trigger is NOT CHECKED.
- **P17** is not in PriceLabs or Smoobu. **P08** is a handback and was not searched.
