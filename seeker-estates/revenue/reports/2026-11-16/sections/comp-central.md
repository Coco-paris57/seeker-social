# Competitor positioning: CENTRAL/NORTH (D = 2026-11-16)

**Method**
- **Policy read first** (`data/policy.json`). These are not raised again: P06 intentional blocks (nights from 30 Nov), the P14 special setup (numbers only), the Camden Booking.com Visibility Booster at 18%, Booking.com promotion stacking (size only), the 15%/20% stay discounts, the Booking.com markup of +10% (12 Nov), `darts_override_24oct`, and the P08 handback (last night 13 Nov).
- **Commission:** I use the channel agent's finding (Camden ~18% = Visibility Booster, expected). Not raised again.
- **Comp ids:** kept from 15 Nov (comp-central rows in `data/snapshots/2026-11-15/comps.csv`). **One replacement event:** P05 comp **1617681646241740026 is inactive**: its `/rooms` page returns **HTTP 410 Gone** (checked 16 Nov 07:25Z). I dropped it, which leaves P05 with 5 kept comps. **No replacement qualifies:**
  - 1293429681283799279 sleeps 11.
  - 1488706195139704513 sleeps 12.
  - 734516999957733627 sleeps 10 and is 1.3 km away.
  - Every other 4BR returned has fewer than 10 reviews.
- **Kept ids returned on no stay for the 4th day:** P06 917140285217729256 and 1452940332365117153, P14 1075245497252121738 and 1659680062193836633, P17 975294297333089697. All five `/rooms` pages return HTTP 200 (16 Nov 07:25Z), so they are kept. Their calendars: NOT CHECKED. **P08 not searched** (handback).
- **Searches:** 96 public Airbnb searches on airbnb.co.uk, **checked 2026-11-16 07:18:08–07:24:37Z**. 0 parse failures, no bot challenge.
  - Same map boxes and filters as 25 Oct–15 Nov: entire home, min bedrooms = ours, adults P05 7 / P06 5 / P11 5 / P14 3 / P17 3.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c16s/search.py`.
  - Raw results: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c16/search/*.json`.
  - Analysis scripts `analyse16.py`, `extra16.py` and `key16.py` (same `c16s` folder) write `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c16/analysis.json`.
- **Stays priced for every comp and for us:**
  - Fri 20–Sun 22 Nov (next Fri–Sun).
  - Tue 17–Thu 19 Nov (midweek).
  - **Wed 16–Fri 18 Dec (30 days out, new).**
  - The 15 Nov stays repeated, for day-on-day comparison.
  - Extras per brief:
    - P05: **13–17 Feb 2027 (new)**, 7–9 / 7–8 Dec, 13–15 / 13–14 Dec, 21–22 / 20–22 Dec, 29–30 / 28–30 Dec, 29 Nov–3 Dec.
    - P11: 18–20 Nov, 22–27 / 22–25 / 24–27 Nov, 2–5 Dec, 8–9 Dec, 14–19 / 15–18 Dec, 23–26 Dec, 3–4 / 3–6 Jan.
    - P06: 22–24 Nov, 29–30 Nov.
- **Our prices:** live **Smoobu GET `/api/rates`, 16 Nov 07:18:33Z** (`/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c16/smoobu_rates16.json`). It equals `prices.csv` 16 Nov on every night checked. Booked or open status comes from Smoobu `reservations.csv` 16 Nov (confirmed stays only).
- **Price basis:** comps are the Airbnb total ÷ nights. Taxes excluded, **cleaning included**, after offers.
  - P05 and P06 are our own Airbnb listings as seen in the same search ("obs"). Where they were not returned, I derive the figure as 0.765 × Smoobu (0.900 for nights more than 28 days out) + cleaning ÷ n.
  - Re-verified today: P06 22–24 Nov obs £501.00 = 0.765 × (£250 + £236) + £129 = £500.79. P05 13–15 Dec obs £931.00 = 0.765 × (£487 + £475) + £195 = £930.93. 14 Dec is now 28 days out, so 0.765 applies to both nights.
  - P11 (Booking.com only) is shown at the Smoobu room price and at **list all-in** = Smoobu × 1.10 + £149 ÷ n. List all-in is the Booking.com price before promotions.
- **Booking.com live: NOT CHECKED** (AWS WAF since 11–12 Nov; not attempted, not bypassed).
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` listing 15–16 Nov: 25 entries, all from one team member, 15 Nov 18:47–19:17Z.
  - `get_listing_date_overrides` for P11 3064196, P06 3288517 and P05 3166592.
  - `get_listing_prices` P05 3166592, 10–18 Feb 2027.
- **Rows written** under `flock` (the files already existed, copied forward by another agent):
  - **917 comp rows** appended to `data/snapshots/2026-11-16/comps.csv`. That is 916 stay rows plus 1 inactive-comp row.
  - **6 own-listing rows** appended to `channel_checks.csv`.

## Summary

| Ref | Comps (n per stay) | Our pct, open stays 14d / 30d / 60d (kept set) | Rating ours vs comp median; review gap | Booked (Smoobu) vs market, next 30 / 60 | Supported positioning |
|---|---|---|---|---|---|
| **P11 2BR** | 12 (0–11) | room **P21 / P14 / P12**. List all-in: **P80–P100 on 18–27 Nov**, P0–P55 on Dec–Jan | Booking.com 8.0/10 (policy, 21 Oct) vs Airbnb comp median 4.67 (36): not comparable; review gap NOT CHECKED | **53.3% (16/30) vs 50%**; 46.7% (28/60) vs 38% | `quality_premium` 0, so **at the median (0%) on list all-in**. `recommend` gives raise +5% at both 30 and 60 days. **18–27 Nov is now +15% to +21% above median: no raise.** **14–18 Dec darts −26% (kept) / −14% (wider): raise.** 23–25 Dec −5%/−9%: small raise. 2–4 Dec at the wider median (+1%): hold. 3–5 Jan −16%/−4%. **8 Dec +93%/+72%: not supported.** |
| **P05 4BR** | **5** (0–4; 1 inactive) | P25 / P8 / P8 | Airbnb 4.77 (35) vs 4.24 (17); **+18 reviews** | **66.7% (20/30) vs 46%**; 61.7% (37/60) vs 39% | `quality_premium` +0.15 (cap), so **+15% vs median**. `recommend` gives raise +25% at 30 and 60 days. Open gaps: 7–8 Dec −18%, 13–14 Dec −17%, 29 Nov–2 Dec −12%. **Valentine's 13–17 Feb sold at −22% vs median (paid basis).** 21 and 29 Dec: no qualifying comp. |
| **P06 2BR** | 12 (0–8) | P0 / P0 / P0 | 4.58 (12) vs 4.62 (26); **−14 reviews** | **64.3% (9/14) vs 51%**; 64.3% (9/14) vs 40% (16 and 46 intentionally blocked nights excluded) | `quality_premium` −0.016, so **−2% vs median**. `recommend` gives raise +10% (30d and 60d). **22–23 Nov −17% vs kept / −23% vs wider: raise to about £302/night Smoobu.** |
| P08 2BR | not searched | n/a | – | handback 13 Nov | Moot (policy handback). |
| P14 1BR | 12 (0–7) | P100 | not seen on Airbnb; comp median 4.88 (19.5) | 0% vs 49% / 37% (kpi_pack) | Special setup: numbers only. **+49% to +147% vs median.** |
| P17 1BR | 7 (0–5) | n/a | comp median 4.68 (52) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (like-for-like median change of the kept comps on repeated stays):**
- 0% on almost every stay.
- P06 17–19 Nov −4.1% (n = 2).
- P11 18–20 Nov −3.5% (n = 6).
- P17 15–17 Dec −2.4% (n = 1).
- Single P05 comp 1639043256346803626: −25% on 13–15 Dec (£740 → £552) and −7% on 7–9 / 8–10 Dec.

**Our prices moved overnight** (Smoobu 15 Nov 07:21Z → 16 Nov 07:18Z). This time there are user logs: overrides were set 15 Nov 18:47–19:17Z (`get_user_logs`), followed by the evening refresh and push.

- **P11:**
  - 18–19 Nov £153 / £177 → **£169 / £195**: new DSO +10%, min 2.
  - 22 Nov–2 Dec about −2%: DSO −5% for 22 Nov–18 Dec (updated 18:48Z), min 3.
  - 3–4 Dec £263 / £318 → £270 / £328: price DSO removed, min 3 → 2.
  - **8 Dec £199 → £308: DSO +50%, min 3 → 1.**
  - **14–18 Dec £214–£286 → £220–£295 (+3%): the darts price override is gone.** Only min-stay overrides remain (14–15 Dec min 3, 16–18 Dec min 2; `get_listing_date_overrides`).
- **P06:**
  - 16–17 Nov £222 / £233 → £264 / £268.
  - **22–23 Nov £271 / £239 → £250 / £236.** The fixed DSO for 15–23 Nov was removed; only min 2 remains.
  - Booked nights 24–30 Nov −£15 to −£66.
- **P05:**
  - November −£22 to −£37.
  - 29 Nov–2 Dec +£1 to +£22 (price DSO removed, min 3).
  - 7–8 Dec −£2 / +£12; 13–14 Dec −£5 / −£4.
  - 4–14 Jan +£23 to +£26 despite the −5% Jan DSO (re-saved 19:14Z).
- **P14:** −£2 to −£16 on most December nights.

## P11 Camden (3064196; Booking.com only)

### Open nights vs like-for-like comps (Smoobu 16 Nov 07:18Z; comps all-in)

| Open nights (stay priced) | Ours room (15 Nov) | List all-in (×1.10 + £149/n) | Kept median (n) | Room pct / vs median | **List all-in pct / vs kept** | Wider: all 2BR, ≥10 reviews, median (n); list vs wider | Median-level Smoobu room* (kept / wider) |
|---|---|---|---|---|---|---|---|
| **18–19 Nov** (18–20 Nov, min 2) | £182.00 (£165.00) | £274.70 | £231.50 (6) | P17 / −21% | **P100 / +19%** | £252.00 (19); P84 / +9% | £143 / £161 |
| **22–26 Nov** (22–27 Nov, 5n) | £202.80 (£207.00) | £252.88 | £220.60 (5) | P20 / −8% | **P80 / +15%** | £213.30 (12); +19% | £173 / £167 |
| 22–24 Nov (22–25 Nov) | £197.00 (£201.00) | £266.37 | £221.67 (5) | P20 / −11% | P80 / +20% | £221.67 (15); +20% | £156 / £156 |
| 24–26 Nov (24–27 Nov) | £207.33 (£211.67) | £277.73 | £242.00 (5) | P20 / −14% | P80 / +15% | £229.33 (14); +21% | £175 / £163 |
| 27 Nov | £271 (£277) | – | n = 0 (27–29 Nov; 28 Nov booked) | – | – | – | – |
| **2–4 Dec** (2–5 Dec; 3–4 Dec now min 2) | £280.00 (£276.00) | £357.67 | £464.33 (**1**) | P0 / −40% | P0 / −23% (n = 1) | **£353.67 (11); P55 / +1%** | £377 / **£276** |
| **8 Dec** (8–9 Dec, 1n; now min 1, DSO +50%) | **£308 (£199)** | £487.80 | £253.00 (3) | P67 / +22% | **P100 / +93%** | £283.00 (9); P100 / +72% | £95 / £122 |
| **14–18 Dec, darts** (14–19 Dec, 5n) | £241.20 (£234.00) | £295.12 | **£398.20 (8)** | P0 / −39% | **P12 / −26%** | £342.60 (30); P40 / −14% | **£335 / £284** |
| 15–17 Dec (15–18 Dec) | £230.33 (£223.33) | £303.03 | £402.00 (8) | P0 / −43% | P12 / −25% | £356.67 (35); −15% | £320 / £279 |
| **23–25 Dec** (23–26 Dec, min 2) | £270.33 (£270.00) | £347.03 | £366.67 (6) | P0 / −26% | P50 / −5% | £380.00 (27); P41 / −9% | £288 / £300 |
| **3 Jan** (3–4 Jan, 1n, min 3) | £173 (£173) | £339.30 | £485.00 (**1**) | P0 / −64% | P0 / −30% | £258.00 (11); +32% | – |
| 3–5 Jan (3–6 Jan, min 3) | £186.33 (£186.00) | £254.63 | £304.33 (9) | P0 / −39% | P33 / −16% | £264.67 (40); P42 / −4% | £232 / £195 |
| 30 days out (16–18 Dec, 2n) | £232.00 (£225.00) | £329.70 | £417.50 (9) | P11 / −44% | P22 / −21% | £379.25 (26); −13% | £312 / £277 |

\* Median-level Smoobu room = (median − £149 ÷ n) ÷ 1.10. That is the Smoobu rate whose Booking.com list price plus cleaning equals the median, before Booking.com promotions. Promotions stack on top (policy; size is the channel agent's).

**18–27 Nov: over the median on list.**
- The new +10% DSO on 18–19 Nov takes list all-in to **P100 / +19%** vs kept and +9% vs wider. Yesterday it was P43 / −2%.
- 22–26 Nov sits at +15% to +21% after the −5% DSO.
- No raise is supported. A cut on the list basis would point to about £156–£175 Smoobu room. But guests on promotions pay well under list (~0.69× list on the last two bookings, 14 Nov section), so a cut is not clearly supported either. **Supported: hold.**

**Darts 14–18 Dec: the price override has been removed (conflict for Corentin to confirm).**
- The policy note says "average above £300/night" (21 Oct) and `darts_override_24oct` says "leave the darts override as it is (+5%)".
- Today `get_listing_date_overrides` shows only min-stay overrides on 14–18 Dec (updated 15 Nov 18:48:42Z / 18:48:52Z). There is no price override, and the room averages **£241** a night (£220 / £227 / £222 / £242 / £295).
- Comps support about **£335 Smoobu room (kept) / £284 (wider)**. That matches the policy intent. I report this as a conflict with a standing decision, not a new proposal.

**2–4 Dec:** list all-in is at the wider median (+1%, n = 11). Kept has n = 1 (−23%). **Hold.**

**8 Dec:**
- The +50% DSO with min 1 puts list all-in at **+72% to +93%** vs median (P100).
- A 1-night stay carries the full £149 cleaning, so the comp median supports only about £122 room on the wider sample.
- This is the orphan from t-p11-8dec-orphan. Opening it to min 1 is the right lever, but the comps do not support +50%. Supported: about the wider median, Smoobu about £122–£150.

**23–25 Dec:** −5% (kept) / −9% (wider). Supported: about £288–£300 room (+7% to +11%).

**3 Jan:** price it as 3–5 Jan: −16% vs kept, −4% vs wider. Supported: about £195–£232 room.

**Positioning:**
- `quality_premium` = 0 (no comparable rating).
- `recommend(0.533, 0.50, 0.14, 0)` → raise +5%. `recommend(0.467, 0.38, 0.12, 0)` → raise +5%.
- **Supported: the comp median (0%) on list all-in.** That means:
  - hold 18–27 Nov;
  - raise December open stays (darts 14–18 Dec to about £284–£335; 23–25 Dec to about £288–£300);
  - hold 2–4 Dec;
  - bring 8 Dec down toward about £122–£150.

**Differentiators:**
- P11 is a basement flat with a patio and no lift.
- 4 of the 12 comps have a lift (1542815721953379556, 1543632408013225027, 654396087724294901, 1515051936255130803).
- 3 have a terrace or balcony.

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272)

| Open nights (stay) | Smoobu room (15 Nov) | **Guest sees on Airbnb, all-in/night** | Kept median (n) | Pct / vs kept | Wider 2BR ≥10 rev median (n) | Pct / vs wider | Supported (−2%) all-in → Smoobu room |
|---|---|---|---|---|---|---|---|
| **22–23 Nov** (22–24 Nov, min 2) | **£250 / £236** (£271 / £239) | **£250.50 obs** (£501.00 total) | **£301.75 (4)** | **P0 / −17%** | £325.25 (22) | P18 / −23% | £295.72 → about **£302/night** ((2 × 295.72 − 129) / (2 × 0.765)) |
| 17 Nov (1n; 16–17 open, 18–22 booked; min 2) | £268 (£233) | – | – | – | – | – | 1-night orphan at min 2: cannot sell |
| 29 Nov (min 4; from 30 Nov intentional block) | £243 (£258) | £314.89 derived | £413.10 (2) | P0 / −24% | £437.00 (15) | P20 / −28% | cannot sell (min 4) |

- **22–23 Nov is the only sellable P06 pair (t-p06-2229open).** Smoobu cut it again overnight (−£21 / −£3). The 15–23 Nov fixed DSO was removed 15 Nov 19:14:48Z; only min 2 remains.
- It is P0 vs kept and P18 vs wider. Lead is 6 days.
- Comps support about **£302 a night Smoobu (−2% vs median)**, not a cut.
- **Positioning:**
  - `quality_premium(4.58, 4.62)` = −0.016.
  - `recommend(0.643, 0.51, 0.0, −0.016)` and `recommend(0.643, 0.40, 0.0, −0.016)` → raise +10%. Only 14 sellable nights in 30 and 60.
  - **Supported: −2% vs median.**

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

### Valentine's 13–17 Feb 2027 (new booking, Airbnb, booked 15 Nov, 90 days out)

| Basis | Ours | Kept median (n = 4) | Pct / vs kept | Wider 4BR ≥10 rev median (n = 6) | Pct / vs wider |
|---|---|---|---|---|---|
| **Paid: room £1,219.98 + £195 cleaning = £353.75/night** (`reservations.csv`) | £353.75 | £451.25 | **P0 / −22%** | £503.00 | P0 / −30% |
| PriceLabs `price` 437 / 407 / 417 / 425 = £421.50 room (live, refreshed 15 Nov 19:14:36Z) | (room only) | – | – | – | – |
| Derived Airbnb guest price before booking (0.900 × £421.50 + £48.75) | £428.10 | £451.25 | P25 / −5% | £503.00 | P17 / −15% |

- **Comps for 13–17 Feb (checked 16 Nov):**
  - 1610095240357069208 £392 (4.15, 13 reviews).
  - 1363636555926649515 £436 (3.93, 14).
  - 1606112160333193293 £467 (4.24, 17).
  - 1639043256346803626 £680 (4.89, 28; Superhost, house).
  - Wider sample also includes £539 and £802.50.
- **PriceLabs priced the stay at £1,686 room** (`get_listing_prices`): `uncustomized_price` 506 / 438 / 461 / 479 = £1,884; `booked_price` 424 / 393 / 403 / 411. The −5% Feb DSO applies (`get_listing_date_overrides`; created 9 Sep, re-saved 15 Nov 19:14:20Z). All four nights are "Normal Demand"; there is no Valentine's uplift.
- **Paid = 0.7236 × PriceLabs `price`.** This does not match a known tier: 0.900 × 0.88 early bird = 0.792. The gap between paid and PL is for the channel agent (a-airbnb-rules). Smoobu rate at booking: NOT CHECKED.
- **Against comps:** the paid all-in is −22% vs kept. The supported +15% would be about £519 all-in, which is about £470 room/night. **Shortfall vs supported: about £165/night (£660 room on the stay). Shortfall vs the comp median: £97.50/night (£390).** The PriceLabs price itself (£421.50 room, £470 all-in) was about at the median. The discount came after PriceLabs.

### Open gaps

| Gap (stay) | Smoobu room/night (15 Nov), min | Ours, Airbnb all-in/night | Kept median (n) | Pct / vs median | Wider 4BR ≥10 rev (n) | +15% supported all-in → Smoobu room |
|---|---|---|---|---|---|---|
| **7–8 Dec** (7–9 Dec) | £464 / £458 (£466 / £446), min 2 | **£450.50 obs** | £552.50 (3) | **P0 / −18%** | £530.75 (4): −15% | £635.38 → about **£703** ((1,270.75 − 195) / 1.53); median-level about £595 |
| **13–14 Dec** (13–15 Dec) | £487 / £475 (£492 / £479), min 2 | **£465.50 obs** | £561.25 (4) | **P0 / −17%** | £552.50 (5): −16% | £645.44 → about **£716**; median-level about £606 |
| 29 Nov–2 Dec (29 Nov–3 Dec, min 3) | £496–£533 | £439.00 obs | £500.50 (4) | P25 / −12% | £449.00 (5): −2% | £575.58 → about £689 ((2,302.30 − 195) / 3.06) |
| **21 Dec** (1n, min 1) | £2,063 (£2,066) | £2,052.00 obs | **n = 0** | – | 0 qualifying | no comp support |
| **29 Dec** (1n, min 1) | £2,556 (£2,557) | £2,496.00 obs | **n = 0** | – | 0 qualifying | no comp support |

- **13–14 Dec:** the gap to the median narrowed from −23% to −17% because comp 1639043256346803626 cut from £740 to £552. Our price is flat.
- **21 and 29 Dec:** no qualifying 4BR comp (≥10 reviews) was returned for either night. Reyhan's +300% DSO is open action a-p05-dec, not raised as new.
- **Thin set:** n = 3–4 after the inactive comp was dropped. 1606112160333193293 at £1,020 sits inside every December median. Even at the wider medians, 7–9 and 13–15 Dec are −15% / −16%.
- **Positioning:**
  - `quality_premium(4.77, 4.24)` = +0.15 (cap).
  - `recommend(0.667, 0.46, 0.08, 0.15)` and `recommend(0.617, 0.39, 0.08, 0.15)` → **raise +25%**.
  - **Supported: +15% vs median.** At minimum, the median: about £595 (7–8 Dec) and £606 (13–14 Dec) Smoobu room.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- **Smoobu 16 Nov:** £450 on most nights to 10 Dec (min 3–4). 11–12 Dec £450 / £472; 16–17 Dec £450 / £454; 18–20 Dec £534 / £575 / £494; 28–31 Dec £673–£741; 1–2 Jan £656 / £586.
- **Booked:** 0% vs market 49% (30d) and 37% (60d) (kpi_pack 16 Nov). There is no P14 Smoobu reservation.
- **Vs comp median, P100 on every priced stay:**
  - November: 17–19 Nov **+147%** (n 5); 24–26 Nov +111% (6).
  - 7–12 Dec: 7–9 Dec +49% (6); 8–10 Dec +49% (6); 9–11 Dec +52% (6); 10–12 Dec +49% (5); 11–13 Dec +56% (4).
  - 12–18 Dec: 12–14 Dec +52% (5); 13–15 Dec +52% (6); 14–16 Dec +62% (6); 15–17 Dec +55% (7); **16–18 Dec +67% (6)**.
  - 20–22 Nov, 27–29 Nov and 4–6 Dec: n = 0.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)
- **Comp medians:**
  - November: 17–19 Nov £190.50 (2); 24–26 Nov £193 (2).
  - December: 4–6 Dec £272.50 (1); 7–9 Dec £228.50 (3); 8–10 Dec £228.50 (3); 9–11 Dec £232.50 (3); 10–12 Dec £235.25 (2); 11–13 Dec £313 (2); 12–14 Dec £293.25 (2); 13–15 Dec £242 (3); 14–16 Dec £221.50 (5); 15–17 Dec £208 (2); **16–18 Dec £235.25 (4)**.
  - 20–22 and 27–29 Nov: n = 0.
- **Rating:** median 4.68 (52).

## P08 Islington: handback
- Policy last night 13 Nov. Not searched; no rows written.

## Comp tables

**Source for every comp row:** Airbnb public search, checked 2026-11-16 07:18:08–07:24:37Z.
- Nightly excludes taxes, includes cleaning, and is after offers.
- (±%) = change vs 15 Nov for the same stay.
- "n/a" = not returned (booked or min-stay).
- "Ours" rows = live Smoobu 16 Nov 07:18Z.
- P05 13–17 Feb "comparable basis" is the derived pre-booking price; the **paid** basis (£353.75) is in the P05 section.
- Every stay row is also in `comps.csv`.

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Tue 15 Dec–Thu 17 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Wed 16 Dec–Fri 18 Dec (2n) | Sat 13 Feb–Wed 17 Feb (4n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 21 Dec–Tue 22 Dec (1n) | Tue 29 Dec–Wed 30 Dec (1n) | Sun 20 Dec–Tue 22 Dec (2n) | Mon 28 Dec–Wed 30 Dec (2n) | Mon 7 Dec–Tue 8 Dec (1n) | Sun 13 Dec–Mon 14 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.15 (13) | n/a | £420 | £570 | £570 | £570 | £570 | £570 | £509 | £509 | n/a (was £509) | £509 | £509 | £509 | £540 | £570 | £392 | £449 | n/a | n/a | £570 | n/a | n/a | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | n/a | n/a (was £370) | £1020 | £1020 | £1020 | £1020 | £1020 | n/a | n/a | £1020 | £1020 | £1020 | £1020 | £1020 | £1020 | £467 | £552 | n/a | n/a | £1070 | n/a | n/a | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (29) | n/a | £750 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £688 | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | n/a | £400 | £484 (+6%) | £482 | £512 | n/a | n/a | £400 | n/a | n/a | n/a | n/a | n/a | n/a | £473 | £436 | £397 (-5%) | n/a | n/a | £572 (-1%) | n/a | n/a | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (28) | n/a | n/a | n/a | n/a | £552 (-25%) | n/a | n/a | n/a | n/a | n/a | £552 (-7%) | £552 (-7%) | n/a | n/a | n/a | £680 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.24 (17) | n/a (0) | £420 (3) | £570 (3) | £570 (3) | £561 (4) | £795 (2) | £795 (2) | £454 (2) | £509 (1) | £1020 (1) | £552 (3) | £552 (3) | £764 (2) | £780 (2) | £570 (3) | £451 (4) | £500 (4) | n/a (0) | n/a (0) | £572 (3) | n/a (0) | n/a (0) | n/a (0) | |
| **Ours, Smoobu live rate/night 16 Nov 07:18Z (status, min stay)** | | | | £524 Booked (Smoobu), min 3 | £420 Booked (Smoobu)/Open, min 2/3 | £566 Booked (Smoobu), min 3 | £519 Booked (Smoobu)/Open, min 2/3 | £481 Open, min 2 | £555 Booked (Smoobu)/Open, min 2/3 | £614 Booked (Smoobu), min 3 | £510 Booked (Smoobu), min 3 | £546 Booked (Smoobu), min 4 | £574 Booked (Smoobu), min 4 | £461 Open, min 2 | £506 Booked (Smoobu)/Open, min 2/3 | £558 Booked (Smoobu), min 3 | £584 Booked (Smoobu), min 3 | £580 Booked (Smoobu), min 3 | £422 Booked (Smoobu), min 4 | £510 Open, min 3 | £2063 Open, min 1 | £2556 Open, min 1 | £1348 Booked (Smoobu)/Open, min 1/2 | £1664 Booked (Smoobu)/Open, min 1/3 | £464 Open, min 2 | £487 Open, min 2 | |
| **Ours, comparable basis** | | | | £498 | £418 | £606 | £495 | £466 obs | £522 | £567 | £488 | £515 | £537 | £450 obs | £484 | £525 | £544 | £619 | £428 | £439 obs | £2052 obs | £2496 obs | £1311 | £1595 | £550 | £568 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P33 / -0% | P67 / +6% | P33 / -13% | P0 / -17% | P0 / -34% | P0 / -29% | P50 / +7% | P100 / +1% | P0 / -47% | P0 / -18% | P0 / -12% | P50 / -31% | P50 / -30% | P67 / +9% | P25 / -5% | P25 / -12% | n/a | n/a | P100 / +129% | n/a | n/a | n/a | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Tue 15 Dec–Thu 17 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Wed 16 Dec–Fri 18 Dec (2n) | Sun 22 Nov–Tue 24 Nov (2n) | Sun 29 Nov–Mon 30 Nov (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.58 (12) | n/a | £263 (-8%) | £460 | £460 | £460 | n/a | n/a | £330 | £394 | n/a | £420 | £420 | £440 | n/a | £460 | £286 (-1%) | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.71 (24) | n/a | n/a | n/a (was £340) | £340 | £340 | n/a | n/a | £296 | n/a | n/a | n/a | n/a | n/a | £296 | £340 | £296 | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | n/a (was £308) | n/a (was £342) | £342 | n/a | n/a | n/a | £308 | n/a | n/a | £342 | £342 | £342 | n/a | £342 | £308 | £335 | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | £318 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £398 | £402 | n/a | n/a | n/a | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | n/a | n/a | £384 | £386 | £382 | n/a | n/a | £397 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (54) | n/a | n/a | £962 (+1%) | £962 (+1%) | £987 | £1008 | £1008 | n/a | £1008 | £1098 | £1008 | £1008 | £1008 | £1008 | £1077 | n/a | n/a | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | £475 (+1%) | £469 (+1%) | £492 (-1%) | £582 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £476 | n/a | £491 (-4%) | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.58 (24) | n/a | n/a | n/a (was £421) | £408 | n/a (was £426) | £472 (-1%) | £507 (-1%) | n/a (was £412) | n/a | n/a | £426 | £418 | £438 | £482 | £436 | n/a (was £377) | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | £519 (+2%) | n/a | n/a | n/a | n/a | £788 (+1%) | n/a (was £660) | £681 | £624 (+4%) | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | n/a | £476 (+3%) | £478 (+3%) | £492 (+1%) | n/a | n/a | £416 (+3%) | n/a | n/a | n/a | n/a | n/a | n/a | £500 | £376 (+4%) | n/a | parking listed |
| **Comp median (n)** | | | 4.62 (26.0) | n/a (0) | £291 (2) | £475 (5) | £434 (8) | £492 (7) | £582 (3) | £757 (2) | £330 (5) | £700 (2) | £943 (2) | £423 (4) | £419 (6) | £439 (6) | £482 (3) | £460 (7) | £302 (4) | £413 (2) | |
| **Ours, Smoobu live rate/night 16 Nov 07:18Z (status, min stay)** | | | | £377 Booked (Smoobu), min 2 | £275 Booked (Smoobu)/Open, min 2 | £407 Blocked, min 3 | £383 Blocked, min 3 | £400 Blocked, min 3/4 | £456 Blocked, min 4 | £497 Blocked, min 4 | £311 Booked (Smoobu), min 3 | £364 Booked (Smoobu), min 4 | £474 Blocked, min 4 | £392 Blocked, min 3 | £384 Blocked, min 3 | £411 Blocked, min 3 | £466 Blocked, min 3/4 | £445 Blocked, min 3 | £243 Open, min 2 | £243 Open, min 4 | |
| **Ours, comparable basis** | | | | £353 | £275 | £376 | £358 | £371 | £413 | £445 | £302 | £343 | £427 | £364 | £358 | £379 | £421 | £405 | £250 obs | £315 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P50 / -6% | excluded | excluded | excluded | excluded | excluded | P20 / -8% | P0 / -51% | excluded | excluded | excluded | excluded | excluded | excluded | P0 / -17% | P0 / -24% | |

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Tue 15 Dec–Thu 17 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Wed 16 Dec–Fri 18 Dec (2n) | Wed 18 Nov–Fri 20 Nov (2n) | Sun 22 Nov–Fri 27 Nov (5n) | Sun 22 Nov–Wed 25 Nov (3n) | Tue 24 Nov–Fri 27 Nov (3n) | Wed 2 Dec–Sat 5 Dec (3n) | Tue 8 Dec–Wed 9 Dec (1n) | Mon 14 Dec–Sat 19 Dec (5n) | Tue 15 Dec–Fri 18 Dec (3n) | Wed 23 Dec–Sat 26 Dec (3n) | Sun 3 Jan–Mon 4 Jan (1n) | Sun 3 Jan–Wed 6 Jan (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.71 (31) | n/a (was £306) | £260 | £459 | £460 | £472 | £545 | £589 | £440 | n/a | £440 | £440 | £440 | £486 | £550 | £483 | £260 (-3%) | £397 | £416 | £416 | n/a (was £416) | n/a | £442 | £451 | n/a | n/a | £273 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (181) | n/a | n/a | £374 | £374 | £374 | n/a | n/a | n/a | n/a | n/a | £374 | £374 | £374 | n/a | £381 | n/a | n/a | n/a | n/a | n/a | £422 | £351 | £363 | £392 | £485 | £307 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | £252 | £424 | £425 | £436 | £510 | £554 | £272 | n/a | £544 | £463 | £454 | £470 | £516 | £448 | £252 (-4%) | n/a | n/a | n/a | £464 | n/a | £407 | £416 | n/a | n/a | £304 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a | n/a | £438 | £438 | £438 | £438 | £438 | £268 | n/a | n/a | £438 | £438 | £438 | £438 | £438 | n/a | £230 | £247 | £247 | n/a | n/a | £400 | £417 | £417 | n/a | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.54 (13) | n/a | £262 | £424 | £425 | £436 | £510 | £554 | n/a | n/a | n/a | £463 | £454 | £470 | £516 | £448 | £262 (-4%) | n/a | n/a | n/a | n/a | n/a | £407 | £416 | n/a | n/a | £247 | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | n/a | n/a (was £256) | n/a (was £418) | £418 | £418 | £418 | £418 | n/a | n/a | n/a (was £424) | £388 | £388 | £458 (+12%) | £472 (+11%) | £418 | n/a (was £286) | n/a | n/a | n/a | n/a (was £350) | n/a | £396 (+1%) | £388 | £513 (+2%) | n/a | £373 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a | £192 | £362 | £362 | £362 | n/a | n/a | £242 | n/a | n/a | £362 | n/a (was £362) | n/a | n/a | £362 | £192 | £205 | £222 | £222 | n/a | n/a | £325 | £342 | £342 | n/a | £342 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.42 (64) | n/a | n/a | £241 | £241 | £241 | n/a | n/a | £191 | n/a | n/a | n/a | £241 | £241 | £241 | £276 | £174 (-5%) | £184 | £187 | £187 | n/a | £253 | £262 | £260 | £307 | n/a | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.73 (88) | n/a | n/a | £214 | £218 | £218 | n/a | n/a | £184 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £195 | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (74) | n/a | n/a | £222 | £212 (-4%) | £202 (-5%) | n/a | n/a | n/a | n/a | n/a | £212 | n/a | n/a | n/a | £222 | n/a | n/a | n/a | n/a | n/a | £234 | n/a | n/a (was £215) | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.55 (38) | n/a | £195 (-14%) | n/a | £268 (-2%) | £268 | n/a | n/a | £236 (-6%) | n/a | n/a | n/a | £294 (-1%) | £328 (-1%) | n/a | n/a | n/a | £221 (-6%) | £212 (-5%) | £242 | n/a | n/a | n/a | n/a | £339 | n/a | £223 (+2%) | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | £250 | n/a | n/a | n/a | £280 | £280 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £211 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (36.0) | n/a (0) | £251 (6) | £374 (9) | £374 (11) | £374 (11) | £474 (6) | £496 (6) | £242 (7) | n/a (0) | £492 (2) | £412 (8) | £412 (8) | £448 (8) | £494 (6) | £418 (9) | £232 (6) | £221 (5) | £222 (5) | £242 (5) | £464 (1) | £253 (3) | £398 (8) | £402 (8) | £367 (6) | £485 (1) | £304 (9) | |
| **Ours, Smoobu live rate/night 16 Nov 07:18Z (status, min stay)** | | | | £265 Booked (Smoobu), min 2 | £174 Booked (Smoobu)/Open, min 2 | £224 Open, min 2/3 | £224 Open, min 3 | £222 Booked (Smoobu)/Open, min 3 | £276 Booked (Smoobu), min 3 | £328 Booked (Smoobu), min 3 | £202 Open, min 3 | £271 Booked (Smoobu)/Open, min 3 | £324 Booked (Smoobu)/Open, min 2/3 | £277 Booked (Smoobu)/Open, min 1/3 | £272 Booked (Smoobu)/Open, min 1/3 | £251 Booked (Smoobu), min 3 | £296 Booked (Smoobu), min 3 | £232 Open, min 2 | £182 Open, min 2 | £203 Open, min 3 | £197 Open, min 3 | £207 Open, min 3 | £280 Open, min 2/3 | £308 Open, min 1 | £241 Open, min 2/3 | £230 Open, min 2/3 | £270 Open, min 2 | £173 Open, min 3 | £186 Open, min 3 | |
| **Ours, comparable basis** | | | | £265 | £174 | £224 | £224 | £222 | £276 | £328 | £202 | £271 | £324 | £277 | £272 | £251 | £296 | £232 | £182 | £203 | £197 | £207 | £280 | £308 | £241 | £230 | £270 | £173 | £186 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = Smoobu x 1.10 (before promotions)** | | | | £292 | £191 P0 / -24% | £247 P33 / -34% | £246 P27 / -34% | £244 P27 / -35% | £304 P17 / -36% | £360 P17 / -27% | £222 P29 / -9% | £298 | £357 P0 / -28% | £305 P12 / -26% | £299 P25 / -28% | £276 P12 / -38% | £325 P17 / -34% | £255 P11 / -39% | £200 P33 / -14% | £223 P60 / +1% | £217 P40 / -2% | £228 P40 / -6% | £308 P0 / -34% | £339 P67 / +34% | £265 P12 / -33% | £253 P0 / -37% | £297 P0 / -19% | £190 P0 / -61% | £205 P11 / -33% | Smoobu Booking.com markup +10% (policy, 12 Nov) |
| **Our percentile / vs median** | | | | n/a | P0 / -31% | P22 / -40% | P18 / -40% | P18 / -41% | P0 / -42% | P17 / -34% | P29 / -17% | n/a | P0 / -34% | P12 / -33% | P12 / -34% | P12 / -44% | P17 / -40% | P11 / -44% | P17 / -21% | P20 / -8% | P20 / -11% | P20 / -14% | P0 / -40% | P67 / +22% | P0 / -39% | P0 / -43% | P0 / -26% | P0 / -64% | P0 / -39% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Tue 15 Dec–Thu 17 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Wed 16 Dec–Fri 18 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | £162 | £252 | £252 | n/a | n/a | n/a | £192 | n/a | n/a | n/a | n/a | £202 | n/a | £252 | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | £352 | £352 | £352 | £352 | n/a (was £352) | £228 | n/a (was £278) | n/a | £352 | £352 | n/a (was £352) | n/a (was £352) | n/a | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | n/a (was £236) | £246 | £246 | £246 | £253 | £260 | n/a | n/a | n/a | n/a (was £246) | £246 | n/a (was £246) | £253 | £246 | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | £182 | £302 | £302 | £302 | £302 | £302 | £202 | n/a | n/a | £302 | £302 | £302 | £302 | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | £182 | £302 | £302 | £302 | £302 | £302 | £202 | n/a | n/a | £302 | £302 | £302 | £302 | £302 | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | n/a | n/a (was £290) | £290 | n/a (was £290) | £290 | £290 | £290 | n/a | n/a | n/a | n/a | n/a | £290 | £290 | £290 | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £368 | n/a | n/a | £402 | £402 | £402 | £402 | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a (was £236) | n/a | n/a (was £260) | n/a | n/a (was £232) | n/a | £236 (-1%) | n/a (was £248) | n/a (was £247) | n/a (was £254) | n/a | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (17) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | £264 | £241 | £241 | £241 | n/a | n/a | n/a | n/a | n/a | £241 | £241 | £241 | n/a | £241 | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | n/a | £224 | n/a | n/a | n/a | n/a | n/a | £224 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.88 (19.5) | n/a (0) | £182 (5) | £290 (7) | £278 (6) | £296 (6) | £302 (5) | £296 (4) | £213 (6) | n/a (0) | n/a (0) | £302 (6) | £302 (6) | £296 (6) | £302 (5) | £271 (6) | |
| **Ours, Smoobu live rate/night 16 Nov 07:18Z (status, min stay)** | | | | £450 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3/4 | £461 Open, min 4 | £461 Open, min 4 | £450 Open, min 3 | £450 Open, min 4 | £450 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3/4 | £452 Open, min 3 | |
| **Ours, comparable basis** | | | | £450 | £450 | £450 | £450 | £450 | £461 | £461 | £450 | £450 | £450 | £450 | £450 | £450 | £450 | £452 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P100 / +147% | P100 / +55% | P100 / +62% | P100 / +52% | P100 / +52% | P100 / +56% | P100 / +111% | n/a | n/a | P100 / +49% | P100 / +49% | P100 / +52% | P100 / +49% | P100 / +67% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Tue 15 Dec–Thu 17 Dec (2n) | Mon 14 Dec–Wed 16 Dec (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Wed 16 Dec–Fri 18 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | n/a | £190 | £192 | £192 | £192 | n/a | n/a | £174 | n/a | n/a | £192 | £192 | £192 | £199 | £192 | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (52) | n/a (was £292) | n/a | n/a (was £264) | £264 | £293 | £309 | £319 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £293 | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | £224 (-2%) | £218 (-2%) | n/a | n/a | n/a | n/a | n/a | £272 | £234 (+2%) | £230 (+2%) | £232 (+3%) | n/a | n/a | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | n/a | n/a | £222 | £242 | £278 | £307 | £212 | n/a | n/a | n/a | n/a | £238 (-2%) | £272 | £242 | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.68 (62) | n/a | n/a | n/a | £223 (+1%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.75 (28) | n/a | £190 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £228 | £228 | n/a | n/a | £228 | none listed |
| **Comp median (n)** | | | 4.68 (52) | n/a (0) | £190 (2) | £208 (2) | £222 (5) | £242 (3) | £293 (2) | £313 (2) | £193 (2) | n/a (0) | £272 (1) | £228 (3) | £228 (3) | £232 (3) | £235 (2) | £235 (4) | |
| **Ours, Smoobu live rate/night 16 Nov 07:18Z (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | |
Data gaps:
- **Booking.com live prices: NOT CHECKED** (WAF 11–12 Nov; not attempted, not bypassed).
  - The P11 percentile uses the Smoobu room and list (× 1.10 + £149 cleaning ÷ n), not the promoted price a guest sees.
  - The P11 Booking.com review count is not in `listings.csv`, so the review gap is NOT CHECKED and `quality_premium` = 0 by construction.
- **P05 13–17 Feb paid 0.7236 × PriceLabs price:** the component split is NOT CHECKED, and so is the Smoobu rate at booking time (the booking was 15 Nov, time unknown; the Feb DSO was re-saved 19:14:20Z). Comps were read 16 Nov, the day after the booking.
- **Darts 14–18 Dec price override removed:** whether this was intended is NOT CHECKED. It conflicts with `darts_override_24oct`; for Corentin to confirm.
- **`get_user_logs` does not show override values** for 'fixed' and some 'percent' entries (P06 15–23 Nov, P11 3–4 Dec, 14–18 Dec, P05 29 Nov–2 Dec). The current state is from `get_listing_date_overrides`; the earlier values are NOT CHECKED.
- **Comp ids:**
  - P05 1617681646241740026 inactive (HTTP 410). No qualifying replacement, so P05 is down to 5 kept comps.
  - Five kept ids were not returned for 4 days (P06 ×2, P14 ×2, P17 ×1). Their pages return HTTP 200; calendars NOT CHECKED.
- **Thin samples:**
  - P11 2–5 Dec and 3–4 Jan kept n = 1 (wider used); 8–9 Dec n = 3; 27 Nov n = 0.
  - P06 22–24 Nov n = 4; 29–30 Nov n = 2.
  - P05 n = 3–4 with one £1,020 outlier; 7–8 / 13–14 Dec 1-night n = 0; 21 and 29 Dec n = 0 qualifying.
  - P14 20–22 Nov, 27–29 Nov and 4–6 Dec n = 0.
- **Whether Airbnb comp prices include VAT: NOT CHECKED.**
- **P05/P06 hidden Airbnb layer** (0.765 / 0.900 by lead time) is assumed from exact fits on today's observed totals. Its source is the channel agent's (a-airbnb-rules).
- P17 is not in PriceLabs or Smoobu.
