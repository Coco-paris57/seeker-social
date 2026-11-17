# Competitor positioning: CENTRAL/NORTH (D = 2026-11-17)

**Method**
- **Policy read first** (`data/policy.json`). Not raised again: P06 intentional blocks (from 30 Nov), P14 special setup (numbers only), Camden Booking.com Visibility Booster 18%, Booking.com promotion stacking (size only), 15%/20% stay discounts, Booking.com markup +10% (12 Nov), `darts_override_24oct`, P08 handback (last night 13 Nov).
- **Commission:** channel agent's finding used (Camden ~18% = Visibility Booster, expected). Not re-raised.
- **Comp ids:** kept unchanged from 16 Nov (comp-central rows in `data/snapshots/2026-11-16/comps.csv`). **No replacement today.** P05 stays at 5 kept comps (1617681646241740026 dropped 16 Nov, HTTP 410; no qualifying replacement then).
  - Kept ids not returned on any stay, **5th day running**: P06 917140285217729256 and 1452940332365117153; P14 1075245497252121738 and 1659680062193836633; P17 975294297333089697. All five `/rooms` pages return HTTP 200 (checked 17 Nov 07:36Z), so they are kept. Calendars NOT CHECKED, so whether they are still "bookable in the next 60 days" is unproven.
  - **P08 not searched** (handback).
- **Searches:** 95 public Airbnb searches on airbnb.co.uk, **checked 2026-11-17 07:19:18–07:35:48Z**. 0 parse failures, no bot challenge.
  - Same map boxes and filters as 25 Oct–16 Nov: entire home, min bedrooms = ours, adults P05 7 / P06 5 / P11 5 / P14 3 / P17 3.
  - Scripts: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c17s/` (`search.py`, `analyse16.py`, `key16.py`, `extra16.py`, `append16.py`).
  - Raw results: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c17/search/*.json`. Analysis: `.../c17/analysis.json`.
- **Stays priced for every comp and for us:**
  - **Fri 20–Sun 22 Nov** (next Fri–Sun).
  - **Tue 24–Thu 26 Nov** (midweek; 17–19 Nov dropped because check-in is today).
  - **Thu 17–Sat 19 Dec** (30 days out, new).
  - The 16 Nov stays repeated for day-on-day comparison.
  - Brief extras: P11 18–20 Nov, 22–27 / 22–25 / 24–27 Nov, 2–5 Dec, 8–9 Dec, 14–19 / 15–18 Dec, 23–26 Dec, 3–4 / 3–6 Jan. P05 7–9 / 7–8 Dec, 13–15 / 13–14 Dec, 21–22 / 20–22 Dec, 29–30 / 28–30 Dec, 29 Nov–3 Dec. P06 22–24 Nov, 29–30 Nov.
- **Our prices:** live **Smoobu GET `/api/rates`, 17 Nov 07:18:45Z** (`.../c17/smoobu_rates17.json`). It equals PriceLabs in `prices.csv` 17 Nov on every open night (0 mismatches). Booked/open status is from Smoobu `reservations.csv` 17 Nov (confirmed only). No P05/P06/P11/P14 reservation changed overnight (full-row diff, 16 vs 17 Nov).
- **Price basis:** comps are the Airbnb total ÷ nights. Taxes excluded, **cleaning included**, after offers.
  - P05 and P06 are our own Airbnb listings, seen in the same search ("obs"). Where they were not returned, the figure is derived as 0.765 × Smoobu (0.900 beyond 28 days) + cleaning ÷ n. Re-verified today: P06 22–24 Nov obs £261.50 vs 0.765 × £257 + £64.50 = £261.11. P05 7–9 Dec obs £451.00 vs 0.765 × £461.50 + £97.50 = £450.55.
  - P11 (Booking.com only) is shown at the Smoobu room price and at **list all-in** = Smoobu × 1.10 + £149 ÷ n. That is the Booking.com price before promotions.
- **Booking.com live: NOT CHECKED** (AWS WAF since 11–12 Nov; not attempted, not bypassed).
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` listing 16–17 Nov: **0 entries**. There were no manual edits since yesterday's run. The overnight moves below come from the 16 Nov ~09:40Z refresh and push.
  - `get_listing_date_overrides` P11 3064196, 17 Nov–10 Jan: unchanged vs 16 Nov.
- **Rows written** under `flock` (both files already existed, copied forward by another agent):
  - **911 comp rows** appended to `data/snapshots/2026-11-17/comps.csv`.
  - **6 own-listing rows** appended to `channel_checks.csv`.

## Summary

| Ref | Comps (n per stay) | Our pct, open stays 14d / 30d / 60d (kept set) | Rating ours vs comp median; review gap | Booked (Smoobu) vs market, next 30 / 60 | Supported positioning |
|---|---|---|---|---|---|
| **P11 2BR** | 12 (0–11) | room **P24 / P16 / P14**. List all-in: **P80–P100 on 18–27 Nov**, P0–P50 Dec–Jan | Booking.com 8.0/10 (policy, 21 Oct) vs Airbnb comp median 4.67 (36): not comparable; review gap NOT CHECKED | **50.0% (15/30) vs 50%**; 45.0% (27/60) vs 38% | `quality_premium` 0, so **at the median (0%) on list all-in**. `recommend` gives raise +5% at 30 and 60 days. 18–27 Nov is **+20% to +23%** above the median: hold. **Darts 14–18 Dec −24% (kept) / −11% (wider): raise.** 23–25 Dec −13% / −9%: raise. 2–4 Dec −1% vs wider: hold. 3–5 Jan −17% / −4%. **8 Dec +94% / +70%: not supported.** |
| **P05 4BR** | 5 (0–4) | P25 / P8 / P8 | Airbnb 4.77 (35) vs 4.24 (17); **+18 reviews** | **70.0% (21/30) vs 46%**; 61.7% (37/60) vs 39% | `quality_premium` +0.15 (cap), so **+15% vs median**. `recommend` gives raise +25% at 30 and 60 days. Open gaps: 7–8 Dec −16%, 13–14 Dec −16%, 29 Nov–2 Dec −13%. 21 and 29 Dec: no qualifying comp. |
| **P06 2BR** | 12 (0–8) | P0 / P0 / P0 | 4.58 (12) vs 4.62 (26); **−14 reviews** | **69.2% (9/13) vs 51%**; 69.2% (9/13) vs 40% (17 and 47 intentionally blocked nights excluded) | `quality_premium` −0.016, so **−2% vs median**. `recommend` gives raise +10% (30 and 60 days). **22–23 Nov −12% vs kept (n = 3) / −33% vs wider: raise to about £295/night Smoobu.** |
| P08 2BR | not searched | n/a | – | handback 13 Nov | Moot (policy handback). |
| P14 1BR | 12 (0–8) | P100 | not seen on Airbnb; comp median 4.88 (19.5) | 0% vs 48% / 37% (kpi_pack) | Special setup: numbers only. **+49% to +122% vs median.** |
| P17 1BR | 7 (0–5) | n/a | comp median 4.68 (52) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day** (median change of the kept comps on repeated stays):
- 0% on almost every stay.
- P06 22–24 Nov −6.9% (n = 2): 854346637654279747 cut to £265 (−13.8%). The same comp is −4% to −11% on all its stays.
- P06 29–30 Nov −4.3% (n = 2).
- P11: 1568808216094734994 −2% to −6% on its November stays and +5% to +6% on December. 1480693526878012391 18–20 Nov −10%.
- P05: 1639043256346803626 −2.4% on 7–9 / 8–10 / 13–15 Dec (£552.50 → £539.50).

**Our prices moved overnight** (Smoobu 16 Nov 07:18Z → 17 Nov 07:18:45Z). No user logs, so these are algorithm moves.
- **P06:** **22–23 Nov £250 / £236 → £265 / £249**; 17 Nov £268 → £230; 29 Nov £243 → £256.
- **P11:** 18–19 Nov £169 / £195 → £166 / £191. Darts 14–18 Dec £220 / £227 / £222 / £242 / £295 → **£227 / £228 / £236 / £246 / £303** (+£7 a night on average). 8 Dec £308 → **£310**. 23–25 Dec +£3 to +£4. 3–4 Jan −£2.
- **P05:** 1 Dec £523 → £495; 21 Dec £2,063 → £2,054; 29 Dec £2,556 → £2,563; other open nights ±£2.
- **P14:** 17–20 Dec £454 / £534 / £575 / £494 → £462 / £542 / £559 / £467; 28–31 Dec +£3 to +£19.

## P11 Camden (3064196; Booking.com only)

### Open nights vs like-for-like comps (Smoobu 17 Nov 07:18:45Z; comps all-in)

| Open nights (stay priced) | Ours room (16 Nov) | List all-in (×1.10 + £149/n) | Kept median (n) | Room pct / vs median | **List all-in pct / vs kept** | Wider: all 2BR, ≥10 reviews, median (n); list vs wider | Median-level Smoobu room* (kept / wider) |
|---|---|---|---|---|---|---|---|
| 18–19 Nov (18–20 Nov, min 2) | £178.50 (£182.00) | £270.85 | £226.00 (6) | P33 / −21% | **P100 / +20%** | £239.75 (14); P86 / +13% | £138 / £150 |
| 22–26 Nov (22–27 Nov, 5n) | £203.20 (£202.80) | £253.32 | £210.80 (5) | P20 / −4% | **P80 / +20%** | £205.00 (11); P82 / +24% | £165 / £159 |
| 24–25 Nov (24–26 Nov, midweek default) | £203.00 (£201.50) | £297.80 | £242.50 (7) | P29 / −16% | P86 / +23% | £247.75 (16); P75 / +20% | £153 / £158 |
| **2–4 Dec** (2–5 Dec) | £281.67 (£280.00) | £359.50 | £440.33 (**2**) | P0 / −36% | P0 / −18% (n = 2) | **£364.34 (12); P50 / −1%** | £355 / **£286** |
| **8 Dec** (8–9 Dec, 1n, min 1, DSO +50%) | **£310 (£308)** | £490.00 | £253.00 (3) | P67 / +23% | **P100 / +94%** | £288.00 (9); P100 / +70% | £95 / £126 |
| **14–18 Dec, darts** (14–19 Dec, 5n) | £248.00 (£241.20) | £302.60 | **£397.70 (8)** | P0 / −38% | **P12 / −24%** | £341.80 (31); P42 / −11% | **£334 / £284** |
| 15–17 Dec (15–18 Dec) | £236.67 (£230.33) | £310.00 | £388.33 (9) | P11 / −39% | P22 / −20% | £356.67 (37); P41 / −13% | £308 / £279 |
| **17–18 Dec** (17–19 Dec, 30 days out) | £274.50 (£268.50) | £376.45 | £437.50 (9) | P11 / −37% | P33 / −14% | £387.50 (25); P40 / −3% | £330 / £285 |
| **23–25 Dec** (23–26 Dec, min 2) | £273.67 (£270.33) | £350.70 | £404.17 (8) | P0 / −32% | P38 / −13% | £385.84 (32); P44 / −9% | £322 / £306 |
| **3 Jan** (3–4 Jan, 1n, min 3) | £171 (£173) | £337.10 | £485.00 (**1**) | P0 / −65% | P0 / −31% | £258.00 (12); P83 / +31% | – |
| 3–5 Jan (3–6 Jan, min 3) | £184.33 (£186.33) | £252.43 | £304.33 (9) | P0 / −39% | P33 / −17% | £262.67 (43); P44 / −4% | £232 / £194 |

\* Median-level Smoobu room = (median − £149 ÷ n) ÷ 1.10. That is the Smoobu rate whose Booking.com list price plus cleaning equals the comp median, before promotions. Promotions stack on top (policy; their size is the channel agent's finding).

**18–27 Nov: above the median on list.** List all-in is +20% to +23% vs kept (P80–P100) and +13% to +24% vs wider. A raise is not supported. On the list basis the median points to about £138–£165 Smoobu room, but guests on promotions pay well under list (~0.69× list on the last two bookings, 14 Nov section). A cut is therefore not clearly supported either. **Supported: hold.**

**Darts 14–18 Dec: still no price override (standing conflict, carried from 16 Nov, for Corentin to confirm).**
- `get_listing_date_overrides` today shows only min-stay overrides on 14–18 Dec (min 3 / 3 / 2 / 2 / 2, last updated 15 Nov 18:48Z). The room averages **£248** a night (£227 / £228 / £236 / £246 / £303).
- The policy says "average above £300/night" (21 Oct) and `darts_override_24oct` says "leave the darts override as it is (+5%)".
- Comps support about **£334 Smoobu room (kept) / £284 (wider)**, in line with the policy intent. I report this as a conflict with a standing decision, not a new proposal.

**8 Dec (open, 1 night, min 1, £310):** list all-in is **+94% vs kept / +70% vs wider** (P100). A 1-night stay carries the full £149 cleaning, so the wider median supports only about **£126 room**. Opening the night at min 1 is the right lever, but the +50% DSO is not supported by the comps.

**2–4 Dec:** list all-in is at the wider median (−1%, n = 12). Kept has n = 2 (−18%). **Hold.**

**23–25 Dec:** −13% (kept, n = 8; yesterday n = 6, −5%) / −9% (wider). Supported: about **£306–£322 room** (+12% to +18% on the current £274 average).

**3 Jan:** the 1-night price is not usable (kept n = 1, and min stay is 3). Priced as 3–5 Jan it is −17% vs kept and −4% vs wider. Supported: about £194–£232 room.

**30 days out, 17–18 Dec:** −14% vs kept / −3% vs wider. Supported: about £285–£330 room.

**Positioning:**
- `quality_premium` = 0 (no comparable rating).
- `recommend(0.50, 0.50, 0.16, 0)` → raise +5% ("in line with market but priced below what quality supports"). `recommend(0.45, 0.38, 0.14, 0)` → raise +5%.
- **Supported: the comp median (0%) on list all-in.** In practice:
  - hold 18–27 Nov (above the median);
  - raise the December open stays: darts 14–18 Dec to about £284–£334, 23–25 Dec to about £306–£322, 17–18 Dec to about £285–£330;
  - hold 2–4 Dec;
  - bring 8 Dec down toward about £126–£150.

**Differentiators:**
- P11 is a basement flat with a patio and no lift.
- 4 of the 12 comps have a lift (1542815721953379556, 1543632408013225027, 654396087724294901, 1515051936255130803).
- 3 have a terrace or balcony.
- 2557770 has 181 reviews.

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272)

| Open nights (stay) | Smoobu room (16 Nov) | **Guest sees on Airbnb, all-in/night** | Kept median (n) | Pct / vs kept | Wider 2BR ≥10 rev median (n) | Pct / vs wider | Supported (−2%) all-in → Smoobu room |
|---|---|---|---|---|---|---|---|
| **22–23 Nov** (22–24 Nov, min 2) | **£265 / £249** (£250 / £236) | **£261.50 obs** (£523.00 total) | **£296.00 (3)** | **P0 / −12%** | £392.50 (22) | P23 / −33% | £290.08 → about **£295/night** ((2 × 290.08 − 129) / (2 × 0.765)) |
| 29 Nov (min 4; intentional block from 30 Nov) | £256 (£243) | £324.84 derived | £396.80 (2) | P50 / −18% | £435.00 (15) | P33 / −25% | cannot sell (min 4) |

- **22–23 Nov is the only sellable P06 pair.** The algorithm raised it overnight (+£15 / +£13), so the gap to kept narrowed from −17% to −12%.
- Kept n fell from 4 to 3: 1700204078606711134 and 1018722159796386217 were not returned (booked or min-stay), and 1315177393080154583 (£347) was returned. Comp 854346637654279747 cut to £265. The wider sample is very dispersed (£134.50–£2,600), so I weight kept.
- Lead time is 5 days.
- **Positioning:**
  - `quality_premium(4.58, 4.62)` = −0.016.
  - `recommend(0.692, 0.51, 0.0, −0.016)` and `recommend(0.692, 0.40, 0.0, −0.016)` → raise +10%. Only 13 sellable nights in the next 30 (17 intentionally blocked) and 13 in 60 (47 blocked).
  - **Supported: −2% vs median**, which is about **£295/night Smoobu** (now £257 on average, so +15%). This is not a cut.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Gap (stay) | Smoobu room/night (16 Nov), min | Ours, Airbnb all-in/night | Kept median (n) | Pct / vs median | Wider 4BR ≥10 rev (n) | +15% supported all-in → Smoobu room; median-level |
|---|---|---|---|---|---|---|
| **7–8 Dec** (7–9 Dec) | £463 / £460 (£464 / £458), min 2 | **£451.00 obs** | £539.50 (3) | **P0 / −16%** | £524.25 (4): −14% | £620.43 → about **£684** ((1,240.85 − 195) / 1.53); median-level about £578 |
| **13–14 Dec** (13–15 Dec) | £488 / £474 (£487 / £475), min 2 | **£465.50 obs** | £554.75 (4) | **P0 / −16%** | £539.50 (5): −14% | £637.96 → about **£706**; median-level about £598 |
| 29 Nov–2 Dec (29 Nov–3 Dec, min 3) | £496 / £488 / £495 / £532 | £433.50 obs | £500.50 (4) | P25 / −13% | £449.00 (5): −3% | £575.58 → about £689 ((2,302.30 − 195) / 3.06); median-level about £591 |
| **21 Dec** (1n, min 1) | £2,054 (£2,063) | £2,044.00 obs | **n = 0** | – | 0 qualifying | no comp support |
| **29 Dec** (1n, min 1) | £2,563 (£2,556) | £2,502.00 obs | **n = 0** | – | 0 qualifying | no comp support |

- **7–8 / 13–14 Dec** are both min-2 pairs, so I price them as 2-night stays. The 1-night searches (7–8 and 13–14 Dec) returned no kept comp, and only one wider comp each (£507 / £575).
- **Thin set:** n = 3–4. 1606112160333193293 at £1,020 sits inside every December median. Even at the wider medians, 7–9 and 13–15 Dec are −14%.
- **29 Nov–2 Dec:** −13% vs kept but only −3% vs wider. Lead is 12 days. Supported at least the median, about £591 room.
- **21 and 29 Dec:** no qualifying 4BR comp (≥10 reviews) returned for either night. The nearest priced stay, 20–22 Dec, has a kept median of £573.50 (n = 3). Reyhan's +300% DSO is open action a-p05-dec; not raised as new.
- **Positioning:**
  - `quality_premium(4.77, 4.24)` = +0.15 (cap).
  - `recommend(0.70, 0.46, 0.08, 0.15)` and `recommend(0.617, 0.39, 0.08, 0.15)` → **raise +25%**.
  - **Supported: +15% vs median.** At minimum the median: about £578 (7–8 Dec) and £598 (13–14 Dec) Smoobu room.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- **Smoobu 17 Nov:** £450 on most nights to 10 Dec (min 3–4). 11–12 Dec £454 / £471. 17–20 Dec £462 / £542 / £559 / £467. 28–31 Dec £679–£747. 1–2 Jan £668 / £581.
- **Booked:** 0% vs market 48% (30d) and 37% (60d) (kpi_pack 17 Nov). There is no P14 Smoobu reservation.
- **Vs comp median, P100 on every priced stay:**
  - November: 24–26 Nov **+111%** (n 6); 27–29 Nov +122% (n 1).
  - 7–12 Dec: 7–9 Dec +49% (7); 8–10 Dec +49% (6); 9–11 Dec +52% (8); 10–12 Dec +49% (6); 11–13 Dec +53% (5).
  - 12–19 Dec: 12–14 Dec +52% (5); 13–15 Dec +52% (6); 14–16 Dec +55% (7); 15–17 Dec +66% (6); 16–18 Dec +58% (7); **17–19 Dec +73% (7)**.
  - 20–22 Nov and 4–6 Dec: n = 0.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)
- **Comp medians:**
  - November: 20–22 Nov £292.50 (1); 24–26 Nov £201 (2); 27–29 Nov n = 0.
  - December: 4–6 Dec £271.50 (1); 7–9 Dec £228.50 (3); 8–10 Dec £228.50 (3); 9–11 Dec £232 (3); 10–12 Dec £233.25 (2); 11–13 Dec £309 (2); 12–14 Dec £291.25 (2); 13–15 Dec £242 (3); 14–16 Dec £219.50 (5); 15–17 Dec £215.75 (4); 16–18 Dec £229.50 (5); **17–19 Dec £245 (4)**.
- **Rating:** median 4.68 (52).

## P08 Islington: handback
- Policy last night 13 Nov. Not searched; no rows written.

## Comp tables

**Source for every comp row:** Airbnb public search, checked 2026-11-17 07:19:18–07:35:48Z.
- Nightly excludes taxes, includes cleaning, and is after offers.
- (±%) = change vs 16 Nov for the same stay.
- "n/a" = not returned (booked or min-stay).
- "Ours" rows = live Smoobu 17 Nov 07:18:45Z.
- Every stay row is also in `comps.csv`.

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Tue 15 Dec–Thu 17 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Wed 16 Dec–Fri 18 Dec (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 21 Dec–Tue 22 Dec (1n) | Tue 29 Dec–Wed 30 Dec (1n) | Sun 20 Dec–Tue 22 Dec (2n) | Mon 28 Dec–Wed 30 Dec (2n) | Mon 7 Dec–Tue 8 Dec (1n) | Sun 13 Dec–Mon 14 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.15 (13) | n/a | £509 | £570 | £570 | £570 | £570 | £570 | £570 | n/a (was £509) | n/a | £509 | £509 | £509 | £540 | £570 | £449 | n/a | n/a | £570 | n/a | n/a | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | n/a | n/a | £1020 | £1020 | £1020 | £1020 | £1020 | £1020 | n/a | £1020 | £1020 | £1020 | £1020 | £1020 | £1020 | £552 | n/a | n/a | £1070 | n/a | n/a | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (30) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £688 | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | n/a | £400 | £519 | £486 | £484 | £513 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £506 (+7%) | £375 (-6%) | n/a | n/a | £574 | n/a | n/a | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (28) | n/a | n/a | n/a | n/a | n/a | £540 (-2%) | n/a | n/a | n/a | n/a | £540 (-2%) | £540 (-2%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.24 (17) | n/a (0) | £454 (2) | £570 (3) | £570 (3) | £570 (3) | £555 (4) | £795 (2) | £795 (2) | n/a (0) | £1020 (1) | £540 (3) | £540 (3) | £764 (2) | £780 (2) | £570 (3) | £500 (4) | n/a (0) | n/a (0) | £574 (3) | n/a (0) | n/a (0) | n/a (0) | |
| **Ours, Smoobu live rate/night 17 Nov 07:18:45Z (status, min stay)** | | | | £530 Booked (Smoobu), min 3 | £510 Booked (Smoobu), min 3 | £600 Booked (Smoobu), min 3 | £564 Booked (Smoobu), min 3 | £516 Booked (Smoobu)/Open, min 2/3 | £481 Open, min 2 | £556 Booked (Smoobu)/Open, min 2/3 | £614 Booked (Smoobu), min 3 | £545 Booked (Smoobu), min 4 | £574 Booked (Smoobu), min 4 | £462 Open, min 2 | £506 Booked (Smoobu)/Open, min 2/3 | £558 Booked (Smoobu), min 3 | £585 Booked (Smoobu), min 3 | £580 Booked (Smoobu), min 3 | £503 Open, min 3 | £2054 Open, min 1 | £2563 Open, min 1 | £1342 Booked (Smoobu)/Open, min 1/2 | £1668 Booked (Smoobu)/Open, min 1/3 | £463 Open, min 2 | £488 Open, min 2 | |
| **Ours, comparable basis** | | | | £503 | £488 | £637 | £529 | £493 | £466 obs | £523 | £568 | £514 | £536 | £451 obs | £484 | £524 | £545 | £619 | £434 obs | £2044 obs | £2502 obs | £1306 | £1599 | £549 | £568 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P50 / +7% | P67 / +12% | P33 / -7% | P33 / -14% | P0 / -16% | P0 / -34% | P0 / -29% | n/a | P0 / -47% | P0 / -16% | P0 / -10% | P50 / -31% | P50 / -30% | P67 / +9% | P25 / -13% | n/a | n/a | P100 / +128% | n/a | n/a | n/a | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Tue 15 Dec–Thu 17 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Wed 16 Dec–Fri 18 Dec (2n) | Sun 22 Nov–Tue 24 Nov (2n) | Sun 29 Nov–Mon 30 Nov (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.58 (12) | n/a | £326 (-1%) | £470 | £460 | n/a (was £460) | n/a (was £460) | n/a | n/a | £394 | n/a | £420 | £420 | £440 | n/a | £460 | n/a (was £286) | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.71 (24) | n/a | £296 | £340 | £340 | n/a (was £340) | £340 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £296 | £340 | £296 | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | £275 (-11%) | n/a | £330 | £330 (-4%) | n/a | n/a | n/a | n/a | n/a | £315 (-8%) | £315 (-8%) | £315 (-8%) | n/a | £330 (-4%) | £265 (-14%) | £315 (-6%) | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £398 | £402 | n/a | n/a | n/a | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | n/a | £397 | n/a | £384 | £386 | £382 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (54) | n/a | n/a | £1188 | £953 (-1%) | £953 (-1%) | £982 | £1008 | £1008 | £1008 | £1098 | £1008 | £1008 | £1008 | £1008 | £1072 | n/a | n/a | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | £484 (+2%) | £466 (-1%) | £488 (-1%) | £573 (-1%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £488 (+3%) | n/a | £479 (-3%) | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.58 (24) | n/a | £378 | £460 | £414 | £408 | £422 | £469 (-1%) | £505 | n/a | n/a | £430 (+1%) | £420 | £438 | £482 | £430 (-1%) | £347 | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | n/a | £510 (-2%) | n/a | n/a | n/a | £770 (-2%) | £648 | £671 (-1%) | £616 (-1%) | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | n/a (was £416) | £549 | £464 (-2%) | £459 (-4%) | £474 (-4%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £500 | n/a (was £376) | n/a | parking listed |
| **Comp median (n)** | | | 4.62 (26.0) | n/a (0) | £326 (5) | £470 (5) | £437 (8) | £433 (6) | £474 (7) | £573 (3) | £756 (2) | £700 (2) | £934 (2) | £430 (5) | £420 (6) | £439 (6) | £482 (3) | £460 (7) | £296 (3) | £397 (2) | |
| **Ours, Smoobu live rate/night 17 Nov 07:18:45Z (status, min stay)** | | | | £399 Booked (Smoobu), min 2 | £326 Booked (Smoobu), min 3 | £480 Blocked, min 3/4 | £389 Blocked, min 3 | £381 Blocked, min 3 | £398 Blocked, min 3/4 | £454 Blocked, min 4 | £494 Blocked, min 4 | £384 Booked (Smoobu), min 4 | £473 Blocked, min 4 | £397 Blocked, min 3 | £386 Blocked, min 3 | £410 Blocked, min 3 | £464 Blocked, min 3/4 | £429 Blocked, min 3 | £257 Open, min 2 | £256 Open, min 4 | |
| **Ours, comparable basis** | | | | £370 | £314 | £431 | £362 | £356 | £369 | £411 | £443 | £359 | £426 | £368 | £359 | £378 | £419 | £393 | £262 obs | £325 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P40 / -4% | excluded | excluded | excluded | excluded | excluded | excluded | P0 / -49% | excluded | excluded | excluded | excluded | excluded | excluded | P0 / -12% | P50 / -18% | |

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Tue 15 Dec–Thu 17 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Wed 16 Dec–Fri 18 Dec (2n) | Wed 18 Nov–Fri 20 Nov (2n) | Sun 22 Nov–Fri 27 Nov (5n) | Sun 22 Nov–Wed 25 Nov (3n) | Tue 24 Nov–Fri 27 Nov (3n) | Wed 2 Dec–Sat 5 Dec (3n) | Tue 8 Dec–Wed 9 Dec (1n) | Mon 14 Dec–Sat 19 Dec (5n) | Tue 15 Dec–Fri 18 Dec (3n) | Wed 23 Dec–Sat 26 Dec (3n) | Sun 3 Jan–Mon 4 Jan (1n) | Sun 3 Jan–Wed 6 Jan (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.71 (31) | n/a | £440 | £524 | £459 | £460 | £472 | £545 | £589 | n/a | £440 | £440 | £440 | £486 | £550 | £483 | £260 | £397 | £416 | £416 | £416 | n/a | £442 | £451 | £555 | n/a | £273 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (181) | n/a | n/a | £388 | £374 | £374 | £374 | n/a | n/a | n/a | n/a | n/a (was £374) | £374 | £374 | n/a | £381 | n/a | n/a | n/a | n/a | n/a | £422 | £351 | £363 | £392 | £485 | £308 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | £272 | £490 | £424 | £425 | £436 | £510 | £554 | n/a | £544 | £463 | £454 | £470 | £516 | £448 | £242 (-4%) | n/a | n/a | n/a | £464 | n/a | £407 | £416 | £520 | n/a | £304 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a | £268 | £438 | £438 | £438 | £438 | £438 | £438 | n/a | n/a | £438 | £438 | £438 | £438 | £438 | n/a | £230 | £247 | £247 | n/a | n/a | £400 | £417 | £417 | n/a | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.54 (13) | n/a | n/a | £490 | £424 | £425 | £436 | £510 | £554 | n/a | n/a | £463 | £454 | £470 | £516 | £448 | £262 | n/a | n/a | n/a | n/a | n/a | £407 | £416 | n/a | n/a | £247 | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | n/a | n/a | £494 | £418 | £418 | £418 | £418 | £418 | n/a | n/a | £388 | £388 | £455 (-1%) | £470 (-1%) | £418 | n/a | n/a | n/a | n/a | n/a | n/a | £395 | £388 | £511 | n/a | £371 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a | £242 | £362 | n/a (was £362) | n/a (was £362) | £362 | n/a | n/a | n/a | n/a | £362 | £362 | n/a | n/a | £362 | £172 (-10%) | £205 | £222 | £222 | n/a | n/a | £325 | £342 | £342 | n/a | £342 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.42 (64) | n/a | £191 | £311 | £241 | £241 | £241 | n/a | n/a | n/a | n/a | n/a | £241 | £241 | £241 | £276 | £174 | £184 | £187 | £187 | n/a | £253 | £262 | £260 | £307 | n/a | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.73 (88) | n/a | £184 | n/a | £211 (-1%) | £216 (-1%) | £216 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £195 | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (74) | n/a | n/a | £248 | £212 (-4%) | £202 (-5%) | £212 (+4%) | n/a | n/a | n/a | n/a | £212 | n/a | n/a | n/a | £222 | n/a | n/a | n/a | n/a | n/a | £234 | n/a | £208 | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.55 (38) | n/a | £222 (-6%) | n/a | n/a | £284 (+6%) | £283 (+6%) | n/a | n/a | n/a | n/a | n/a | £308 (+5%) | £345 (+5%) | n/a | n/a | n/a | £211 (-4%) | £207 (-2%) | £227 (-6%) | n/a | n/a | n/a | n/a | £339 | n/a | £222 (-1%) | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | £280 | £280 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £210 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (36.0) | n/a (0) | £242 (7) | £438 (9) | £418 (9) | £396 (10) | £374 (11) | £474 (6) | £496 (6) | n/a (0) | £492 (2) | £438 (7) | £388 (9) | £446 (8) | £493 (6) | £418 (9) | £226 (6) | £211 (5) | £222 (5) | £227 (5) | £440 (2) | £253 (3) | £398 (8) | £388 (9) | £404 (8) | £485 (1) | £304 (9) | |
| **Ours, Smoobu live rate/night 17 Nov 07:18:45Z (status, min stay)** | | | | £261 Booked (Smoobu), min 2 | £203 Open, min 3 | £274 Open, min 2 | £232 Open, min 2/3 | £228 Open, min 3 | £226 Booked (Smoobu)/Open, min 3 | £279 Booked (Smoobu), min 3 | £330 Booked (Smoobu), min 3 | £267 Booked (Smoobu)/Open, min 3 | £325 Booked (Smoobu)/Open, min 2/3 | £278 Booked (Smoobu)/Open, min 1/3 | £274 Booked (Smoobu)/Open, min 1/3 | £252 Booked (Smoobu), min 3 | £298 Booked (Smoobu), min 3 | £241 Open, min 2 | £178 Open, min 2 | £203 Open, min 3 | £199 Open, min 3 | £208 Open, min 3 | £282 Open, min 2/3 | £310 Open, min 1 | £248 Open, min 2/3 | £237 Open, min 2/3 | £274 Open, min 2 | £171 Open, min 3 | £184 Open, min 3 | |
| **Ours, comparable basis** | | | | £261 | £203 | £274 | £232 | £228 | £226 | £279 | £330 | £267 | £325 | £278 | £274 | £252 | £298 | £241 | £178 | £203 | £199 | £208 | £282 | £310 | £248 | £237 | £274 | £171 | £184 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = Smoobu x 1.10 (before promotions)** | | | | £287 | £223 P43 / -8% | £302 P11 / -31% | £255 P33 / -39% | £250 P30 / -37% | £249 P27 / -34% | £307 P17 / -35% | £364 P17 / -27% | £294 | £358 P0 / -27% | £306 P14 / -30% | £301 P11 / -22% | £278 P12 / -38% | £328 P17 / -34% | £265 P11 / -36% | £196 P33 / -13% | £224 P60 / +6% | £219 P40 / -1% | £228 P60 / +1% | £310 P0 / -30% | £341 P67 / +35% | £273 P12 / -31% | £260 P22 / -33% | £301 P0 / -26% | £188 P0 / -61% | £203 P11 / -33% | Smoobu Booking.com markup +10% (policy, 12 Nov) |
| **Our percentile / vs median** | | | | n/a | P29 / -16% | P11 / -37% | P22 / -44% | P20 / -43% | P18 / -40% | P0 / -41% | P17 / -33% | n/a | P0 / -34% | P14 / -36% | P11 / -29% | P12 / -43% | P17 / -40% | P11 / -42% | P33 / -21% | P20 / -4% | P20 / -10% | P20 / -8% | P0 / -36% | P67 / +22% | P0 / -38% | P11 / -39% | P0 / -32% | P0 / -65% | P0 / -39% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Tue 15 Dec–Thu 17 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Wed 16 Dec–Fri 18 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | £178 (-8%) | £252 | £252 | £252 | n/a | n/a | n/a | £202 | n/a | n/a | n/a | £202 | n/a | £252 | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | £228 | £352 | n/a (was £352) | £352 | £352 | £352 | £352 | n/a | n/a | £352 | £352 | £352 | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | n/a | £253 | £246 | £246 | £246 | £253 | £260 | n/a | n/a | £246 | £246 | £246 | £253 | £246 | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | £202 | £302 | £302 | £302 | £302 | £302 | £302 | n/a | n/a | £302 | £302 | £302 | £302 | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | £202 | £302 | £302 | £302 | £302 | £302 | £302 | n/a | n/a | £302 | £302 | £302 | £302 | £302 | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 4.92 (13) | n/a | n/a | £290 | £290 | £290 | £290 | £290 | £290 | n/a | n/a | n/a | n/a | £290 | £290 | £290 | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | £368 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £402 | £402 | £402 | £402 | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £250 (+6%) | n/a | n/a | n/a | n/a | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (17) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | n/a | £241 | £241 | £241 | £241 | n/a | n/a | n/a | n/a | £241 | £241 | £241 | n/a | £241 | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | n/a | £224 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.88 (19.5) | n/a (0) | £213 (6) | £290 (7) | £271 (6) | £290 (7) | £296 (6) | £302 (5) | £302 (5) | £202 (1) | n/a (0) | £302 (7) | £302 (6) | £296 (8) | £302 (6) | £290 (7) | |
| **Ours, Smoobu live rate/night 17 Nov 07:18:45Z (status, min stay)** | | | | £450 Open, min 4 | £450 Open, min 3 | £502 Open, min 3/4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3/4 | £460 Open, min 4 | £462 Open, min 4 | £450 Open, min 4 | £450 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3 | £452 Open, min 3/4 | £456 Open, min 3 | |
| **Ours, comparable basis** | | | | £450 | £450 | £502 | £450 | £450 | £450 | £460 | £462 | £450 | £450 | £450 | £450 | £450 | £452 | £456 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P100 / +111% | P100 / +73% | P100 / +66% | P100 / +55% | P100 / +52% | P100 / +52% | P100 / +53% | P100 / +122% | n/a | P100 / +49% | P100 / +49% | P100 / +52% | P100 / +49% | P100 / +57% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Thu 17 Dec–Sat 19 Dec (2n) | Tue 15 Dec–Thu 17 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Wed 16 Dec–Fri 18 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | n/a | £174 | £199 | £192 | £192 | £192 | n/a | n/a | n/a | n/a | £192 | £192 | £192 | £199 | £192 | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (52) | n/a | n/a | £299 | £264 | £264 | £293 | £309 | £319 | n/a | n/a | n/a | n/a | n/a | n/a | £293 | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | £254 | £214 (-4%) | £216 (-1%) | n/a | n/a | n/a | n/a | £272 | £232 (-1%) | £228 | £232 | n/a | £230 | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | £292 | £228 (+8%) | n/a | £218 | £222 | £242 | £274 (-1%) | £299 (-3%) | n/a | n/a | n/a | n/a | £238 | £268 (-1%) | £234 (-3%) | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.68 (63) | n/a | n/a | n/a | n/a | £220 (-2%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.75 (28) | n/a | n/a | £236 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £228 | £228 | n/a | n/a | £228 | none listed |
| **Comp median (n)** | | | 4.68 (52) | £292 (1) | £201 (2) | £245 (4) | £216 (4) | £220 (5) | £242 (3) | £291 (2) | £309 (2) | n/a (0) | £272 (1) | £228 (3) | £228 (3) | £232 (3) | £233 (2) | £230 (5) | |
| **Ours, Smoobu live rate/night 17 Nov 07:18:45Z (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | |
Data gaps:
- **Booking.com live prices: NOT CHECKED** (WAF 11–12 Nov; not attempted, not bypassed).
  - The P11 percentile uses the Smoobu room and list price (× 1.10 + £149 cleaning ÷ n), not the promoted price a guest sees.
  - P11's Booking.com review count is not in `listings.csv`, so the review gap is NOT CHECKED and `quality_premium` = 0 by construction.
- **Darts 14–18 Dec: no price override.** Whether that is intended is NOT CHECKED. It conflicts with `darts_override_24oct`; for Corentin to confirm (carried, not new).
- **Comp ids:** five kept ids have not been returned on any stay for 5 days (P06 ×2, P14 ×2, P17 ×1). Their pages return HTTP 200; calendars NOT CHECKED, so whether they are active is unproven. P05 is still at 5 kept comps.
- **Thin samples:**
  - P11: 2–5 Dec kept n = 2 and 3–4 Jan n = 1 (wider used); 8–9 Dec n = 3; 27 Nov n = 0.
  - P06: 22–24 Nov n = 3; 29–30 Nov n = 2.
  - P05: n = 3–4 with one £1,020 outlier; 1-night 7–8 / 13–14 Dec n = 0; 21 and 29 Dec n = 0 qualifying.
  - P14: 20–22 Nov and 4–6 Dec n = 0; 27–29 Nov n = 1.
- **Whether Airbnb comp prices include VAT: NOT CHECKED.**
- **P05/P06 hidden Airbnb layer** (0.765 / 0.900 by lead time) is assumed from exact fits on today's observed totals. Its source belongs to the channel agent (a-airbnb-rules).
- **PriceLabs Market Dashboard / comp-set percentiles for 17 Nov:** not pulled by me (`market.csv` is the market agent's). Comps here are public Airbnb only.
- P17 is not in PriceLabs or Smoobu.
