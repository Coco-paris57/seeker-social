# Competitor positioning: CENTRAL/NORTH (D = 2026-11-06)

**Method**
- **Comp ids:** the same 55 comp ids as 1–5 Nov (`data/snapshots/2026-11-05/comps.csv`, comp-central rows). **No replacements.**
  - Comps that appeared on none of today's stays: P06 917140285217729256, 1259401393497276633. P08 1275323094602434212, 693487869095756237, 1289147258305624118, 1409413462916896898, 1497137911142581794. P11 654396087724294901. P14 1075245497252121738, 1460955085260023644. P17 975294297333089697, 774061637963678253.
  - The four long-absent P08 comps are now absent **5 days running**. Whether they are inactive was NOT CHECKED (listing-page calendar fetch not done). P08 is handed back after 13 Nov and has only 6–7 Nov to sell, so replacing them would not change any decision.
- **Searches:** 60 public Airbnb searches (airbnb.co.uk, all result pages, 0 parse failures, no bot challenge). Same map boxes and filters as 25 Oct–5 Nov: entire home, minimum bedrooms = ours, adults = our sleeps − 1. Checked 2026-11-06, 07:19–07:27Z.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c06s/search.py`
  - Raw results: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c06/search/*.json`
- **Same stays for every comp and for us:** Fri 6–Sun 8 Nov (this weekend), Tue 10–Thu 12 Nov (midweek), **Fri 13–Sun 15 Nov (next Friday–Sunday, new today)**, Fri 4–Sun 6 Dec (30 days out), plus 24–26 Nov and 27–29 Nov kept for the day-on-day comparison.
- **Extra stays:** P11 open stays (10–12 / 10–14 / 18–20 / 22–26 Nov, 29 Nov–5 Dec, 8–11 / 11–14 / 12–14 Dec, darts 13–17 Dec, 15–19 Dec, 23–26 Dec). P05 9 Nov, 16–18 Nov and December gaps. P06 8–10, 8–11, 9–11 Nov and a 9–10 Nov 1-night probe. P08 6–8 Nov plus 1-night probes on 6 and 7 Nov.
- **Our prices:** a **live Smoobu GET `/api/rates`** (6 Nov 07:19Z) for P05, P06, P08, P11, P14. This is what the channels are sold. Saved at `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c06/smoobu_rates06.json`. Booked or open status comes from Smoobu `reservations.csv` (6 Nov).
  - Smoobu = PriceLabs `price` (6 Nov raw) on every open night to 31 Dec, **except P06 8–9 Nov** (Smoobu £200 / £200 vs PL £213 / £219) and **P11 10–12 Nov** (Smoobu £175 / £179 / £189 vs PL £189 / £199 / £212). Cause of the P11 gap: NOT CHECKED. No P11 edit on 10–12 Nov in `get_user_logs` 5–6 Nov.
- **Price basis:**
  - **Comps:** Airbnb displayed total ÷ nights. Excludes taxes, includes cleaning, after any offer.
  - **P05, P06, P08:** our own Airbnb listing as seen in the same search (13 stays; rows added to `channel_checks.csv`). Where it did not appear, the price is derived as 0.765 × Smoobu + cleaning ÷ nights.
  - **P11** (Booking.com only) and **P14:** Smoobu room rate. This excludes cleaning while comps include it, so these percentiles are biased low. P11 is also shown at the Booking.com list price (Smoobu × 1.15, before promotions).
- **Booking.com: NOT CHECKED.** The bot check was not retried or bypassed.
- **Positioning:** `rm/positioning.py` `quality_premium` + `recommend`. Occupancy is from `reports/2026-11-06/kpi_pack.json`; P06 uses `forward_occ_30_ex_blocks` 0.50. Percentile = mean over open multi-night stays. **14d** = check-in up to 20 Nov, **30d** = up to 6 Dec, **60d** = all.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c06s/analyse06.py`. Output: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c06/analysis.json`.
- **Commission:** per channel's finding, Booking.com charges on room + cleaning. Not re-raised here.

## Summary

| Ref | Comps priced per stay | Our pct, open stays: 14d / 30d / 60d | Rating, ours vs comp median; review gap | Booked vs market (30d) | Supported positioning |
|---|---|---|---|---|---|
| **P05 4BR** | 6 (0–4) | **P25 / P25 / P26** | Airbnb 4.77 (35) vs 4.27 (22.5); +12.5 | 75.9% vs 41% | `quality_premium` **+0.15**: **+15% vs median supported**. `recommend` 30d / 60d: **raise +25%** (n = 3–4; three comps under 4.3 inflate qp). December sits 32–41% under the medians. |
| **P06 2BR** | 12 (4–5 on open stays) | **P0 / P0 / P0** (only 8–11 Nov open) | **4.58 (12)** vs 4.67 (25.5); −13.5. One new review since 5 Nov: 4.64 (11) → 4.58 (12) | 50% ex-blocks vs 47% | qp −0.036: **−4% vs median supported**. `recommend` 30d: **raise +5%**. Airbnb shows 19–30% under the median. 60d `recommend` says fix-listing, but that is an artefact: 60d occupancy 6.8% counts the intentional blocks (policy). |
| **P08 2BR** | 0–1 | n/a on 6–8 Nov (**no comp available**). P0 on 10–12 Nov (booked) | 4.50 (4) vs 4.87 (29); −25 | 85.7% vs 49% | qp −0.148: **−15% vs median supported**. `recommend`: **raise +10%** (from n = 1). There is no comp price on the only sellable stay. |
| **P11 2BR** | 12 (1–8) | **P0 / P7 / P8** room. At the Booking.com list price: P4 / P9 / P12 | Booking.com 8.0/10 (policy). Not comparable with the Airbnb median 4.67 (35.5) | 44.8% vs 45% (60d 45.8% vs 39%) | qp 0: **at the median (0%) supported**. `recommend` 30d / 60d: **raise +5%**. We are 24–45% under the median at room price and 12–37% under at list price. |
| P14 1BR | 12 (1–7) | P100 | Not seen on Airbnb; comp median 4.88 (19.5) | 0% vs 44% | Special setup (policy): numbers only. +65% to +160% vs median. |
| P17 1BR | 7 (0–4) | n/a | Comp median 4.54 (51) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (same comp, same stay, 5 Nov → 6 Nov)**
- **Comps were flat:** the like-for-like median change is 0% on 38 of 48 comparable stays.
- **Moves:**
  - P05 1606112160333193293 6–8 Nov £389 → £420 (+8%). 1363636555926649515 16–18 Nov £400 → £428 (+7%).
  - P06 1420126228540342938 8–11 Nov £320 → £261 (−18%) and 9–11 Nov £340 → £283.
  - P14 6–8 Nov: 1248499039857613537 £188 → £173 (−8%) and 1039993866991009459 £218 → £208 (−5%).
- **Sold out since yesterday (demand signal):**
  - **P08 6–8 Nov:** 28354043, the only comp available yesterday (£408), is gone. **No P08 comp is bookable for 6–8 Nov.**
  - **P05 10–12 Nov:** 1363636555926649515 (£400) is gone. **27–29 Nov:** 1606112160333193293 is gone.
  - **P11 10–12 Nov:** 1263490105174331990 (£191) is gone.
- **Ours, 5 Nov → 6 Nov.** `get_user_logs` 5–6 Nov shows only three edits, all Reyhan's, at 5 Nov 10:54–10:56Z:
  - **P08 3318167:** DSO 5–21 Nov changed from −5% to **+5%**, min 2. `get_listing_date_overrides` confirms it on 5–14 Nov.
  - **P11 3064196:** 23 Dec override changed from 0% to **+7%**, min 2.
  - **P08** also has a price-less save at 10:55:47Z, which was overwritten 8 s later.
  - Nothing on P05, P06 or P14.

## P06 Marylebone 2-bed (3288517): 8–11 Nov, and what guests see on 9 Nov (intentional blocks excluded)

- **The £2 is gone from Smoobu.** Live Smoobu GET `/api/rates` at 6 Nov 07:19Z:
  - 8 Nov **£200**, 9 Nov **£200**, 10 Nov £226, 11 Nov £238. All available, min 2.
  - `prices.csv` (07:16Z) matches.
  - Yesterday Smoobu showed £200 / **£2** / £241 / £255.
- **PriceLabs still holds £2.** The 6 Nov raw (`prices_3288517.json`, last refreshed **5 Nov 10:33:59Z**) shows "Your Price" (user_price / booked_price) **£2 on 9 Nov** and £200 on 8 Nov, against recommended prices of £219 and £213.
  - `get_listing_date_overrides` shows only the −5% on 9 Nov. There is **no fixed £2 override**.
  - No P06 edit appears in `get_user_logs` 5–6 Nov.
  - So the £2 is not an override, and where it comes from is NOT CHECKED. Who or what set Smoobu 9 Nov to £200 is also NOT CHECKED: no log, and the kpi_summary shows the last P06 push at 5 Nov 10:34:00Z.
  - **Risk:** the next P06 refresh or push could write £2 back. Confirm in PriceLabs that 9 Nov "Your Price" is no longer £2 after the next sync.
- **What guests see on Airbnb now** (listing 1671691529957957272, 5 adults, 07:19Z). Cleaning is folded into Airbnb's per-night figure:
  - **9–11 Nov: £454.89 total, £227.45/night, no offer line** = 0.765 × (£200 + £226) + £129. Comp median **£296.75** (n = 4). **P0, −23%.**
  - 8–10 Nov: £435.00, £217.50/night = 0.765 × (£200 + £200) + £129. Median £281 (n = 4). **P0, −23%.** The cheapest comp is 1452940332365117153 at £242 (4.07 rating).
  - 8–11 Nov: £607.89, £202.63/night. Median £288.17 (n = 4). **P0, −30%.**
  - 10–12 Nov: £483.96 (2 × £241.98), but this stay is not sellable because 12 Nov is booked.
  - A 9–10 Nov single night is not bookable (min 2). For information, the comps that are open for 9–10 Nov ask £318 and £339.
  - Airbnb follows Smoobu, so the £2 never reached Airbnb. Booking.com for 8–11 Nov: **NOT CHECKED**. At the +15% markup, the list price would be about £230 / £230 / £260 / £274 before promotions.
- **8–9 Nov are selling at the £200 floor,** below PriceLabs' own £213 / £219 and below the 4 Nov £228 / £233.
- **Positioning:**
  - `quality_premium(4.58, 4.67)` = −0.036, so **−4% vs median is supported**. That is about £286/night all-in on 9–11 Nov, or about £290/night room ((2 × 286 − 129) ÷ 0.765 ÷ 2).
  - `recommend(0.50, 0.47, 0.0, −0.036)` → **raise +5%**. In practice: restore 8–9 Nov at least to PriceLabs' own £213 / £219 (+6.5% / +9.5% on £200), and lift 10–11 Nov by +5% to about £237 / £250.
  - Reyhan's −5% on 8–14 Nov is unchanged. It is **not fixed**, and it conflicts with this +5%: Corentin to confirm.
  - **Exposure:** the 4 open nights are £864 room at Smoobu rates. The +5% step is worth about £43 if they sell.
- **Differentiators:** P06 is on the 2nd floor with no lift. Of the 12 comps, 5 have a lift and 2 are Superhosts. 1273781636585601427 (lift, 4.7, 53 reviews) prices at £492–£528, which inflates the 8–12 Nov medians. Without it, the 9–11 Nov median is £283 (n = 3) and we are still P0.

## P08 Islington 2-bed (3318167): 6–8 Nov, the last sellable nights before the 13 Nov handback

- **Smoobu (07:19Z):** 6 Nov **£175**, 7 Nov **£193**, both available, min 2. 8–14 Nov is booked (Airbnb, booked 17 Oct).
- **a-handback-lastnights: half done.** Reyhan's +5% DSO (5 Nov 10:55:55Z) reached 7 Nov (£175 → £193, the level proposed yesterday). **6 Nov stayed at £175.** The 6 Nov raw has no 6 Nov row, so why it did not move is NOT CHECKED.
- **What guests see on Airbnb (1683999279257475317, 4 adults):** 6–8 Nov **£461.80 total (2 × £230.90)**, no offer line.
  - That is (£461.80 − £149) ÷ (£175 + £193) = **0.85 × Smoobu**, not the 0.765 seen yesterday on this stay. Which Airbnb rule changed is NOT CHECKED.
- **Comps:** **none of the 6 comps is available for 6–8 Nov or for either single night.** 28354043 (£408 yesterday) is now gone. So no percentile is possible today.
  - The supply signal is strong: every comparable 2-bed in the box is taken this weekend.
- **Positioning:** `quality_premium(4.5, 4.87)` = −0.148, so −15% vs the last observed median (£408, n = 1, 5 Nov) is supported: about £347/night all-in. `recommend(0.857, 0.49, 0.0, −0.148)` → **raise +10%**.
  - Arrival would be **today**, so only a same-day booking can use 6–8 Nov.
  - **New:** if 6 Nov does not sell today, **7 Nov becomes a 1-night orphan with min 2**, and is unsellable (8 Nov is booked). Min 1 on 7 Nov from tonight would keep it sellable before handback. Under policy the 7 Nov night is inventory (the last night is 13 Nov).

## P11 Camden (3064196): next 14 days, darts, December (Smoobu room; Booking.com list × 1.15)

| Stay (open) | Ours room (Smoobu) | Comp median (n) | Pct / vs median | List × 1.15 |
|---|---|---|---|---|
| 10–12 Nov | **£177.00** (Smoobu £175/£179; PL £189/£199) | £290.00 (6) | P0 / −39% | £204: P0 / −30% |
| 10–14 Nov | £201.00 | £264.25 (4) | P0 / −24% | £231: P0 / −12% |
| 18–20 Nov (2-night gap) | £167.00 | £300.50 (8) | **P0 / −44%** | £192: P12 / −36% |
| 22–26 Nov | £209.75 | £281.25 (7) | P14 / −25% | £241: P14 / −14% |
| 29 Nov–5 Dec | £231.67 | £400.92 (4) | P0 / −42% | £266: P0 / −34% |
| 8–11 Dec | £249.33 | £374.33 (7) | P0 / −33% | £287: P0 / −23% |
| 11–14 Dec | £292.33 | £448.33 (7) | P14 / −35% | £336: P14 / −25% |
| 12–14 Dec | £277.00 | £457.50 (8) | P0 / −40% | £319: P25 / −30% |
| **13–17 Dec (darts)** | **£215.00** | **£394.00 (7)** | **P14 / −45%** | £247: P14 / −37% |
| 15–19 Dec | £237.75 | £420.50 (7) | P0 / −44% | £273: P14 / −35% |
| 23–26 Dec | £293.33 (23 Dec now +7%) | £416.67 (5) | P20 / −30% | £337: P20 / −19% |

- **Darts 13–17 Dec:**
  - Smoobu is £228 / £204 / £210 / £218. Every night still carries Reyhan's −5% (`get_listing_date_overrides` 6 Nov; updated 2 Nov 15:05Z).
  - This is **unchanged**, and it remains a conflict for Corentin to confirm: policy `darts_override_24oct` says +5%, and the 21 Oct intent was "average above £300".
  - Only 1090528454481682946 (4.72, 87 reviews, 0.08 km, £197) is cheaper.
- **The −5% on 10 Nov–18 Dec is still on every date.** It is unchanged since 2 Nov, so **not fixed**.
- **10–12 Nov:** Smoobu sells 7–11% under PriceLabs (cause NOT CHECKED). That deepens the gap on the nearest open stay: 1263490105174331990 (£191) sold since yesterday, and the cheapest open comp is now £212.
- **Positioning:**
  - `quality_premium` = 0 (no Airbnb rating).
  - `recommend(0.448, 0.45, 0.07, 0)` → **raise +5%** (30d). `recommend(0.458, 0.39, 0.08, 0)` → **raise +5%** (60d).
  - **Supported:** the comp median (0%). Removing Reyhan's −5% is that +5%.
  - Visibility (policy: CTR 0.81% vs 1.70%) remains the larger lever.
- **Differentiators:** P11 is a basement flat with a patio. Of the 12 comps, 4 have a lift and 3 have a terrace or balcony.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214): December

| Stay (open) | Ours on Airbnb, all-in (observed) | Comp median (n) | Pct / vs median | Smoobu room |
|---|---|---|---|---|
| 16–18 Nov | £387.50 | £462.75 (4) | P25 / −16% | £378.50 |
| 29 Nov–3 Dec | £455.54 | £744.38 (4) | P25 / −39% | £531.75 (−5% override) |
| 7–9 Dec | £512.40 | £790 (4) | P25 / −35% | £461 |
| 13–16 Dec | £557.00 | £945.84 (4) | P25 / −41% | £546.67 (−7%) |
| 17–20 Dec | £606.20 | £980 (4) | P25 / −38% | £601.33 (−7% to 19 Dec) |
| 20–22 Dec | £692.85 | £1,020 (3) | P33 / −32% | £661.50 |
| 29–30 Dec (1n, min 1) | £1,410.90 | no comp available | n/a | £1,351 (+100% override) |

- **4–6 Dec** is booked (3–7 Dec). The comp median for it is £1,020 (n = 2).
- **Only one comp is under us on every December stay:** 1363636555926649515 (3.92 rating, 1.23 km).
- **a-p05-9nov: NOT FIXED (seventh check).**
  - Smoobu 9 Nov is £1,383 (min 1), with the +300% override unchanged.
  - Airbnb 9–10 Nov still shows "1 night x £511.80", "Special offer −£63.36", total **£448.44**, the same since 31 Oct.
  - The one comp open that night asks £320.
- **Reyhan's 4 Nov −7% on 13–19 Dec and −5% on 29 Nov–2 Dec are unchanged** (`get_listing_date_overrides` 6 Nov). This is a conflict with a-p05-dec for Corentin to confirm, not a new proposal.
- **Positioning:**
  - `quality_premium(4.77, 4.27)` = +0.15 (cap).
  - `recommend(0.759, 0.41, 0.25, 0.15)` → **raise +25%** (30d). `recommend(0.661, 0.40, 0.26, 0.15)` → **raise +25%** (60d).
  - Even +25% leaves every December stay 15–26% under the medians.
  - Caveat: n = 3–4 per stay, and three comps rated under 4.3 inflate qp.
- **Differentiators:**
  - 912053248917940403: Superhost, lift, park view, 4.97.
  - 1639043256346803626: Superhost house with terrace.
  - Three comps list parking.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

- **Smoobu:** £500 (Dec peaks £521–£623), min stay 3–4. 0% booked vs 44% market at 30d.
- **Comp medians:**

| Stay | Comp median (n) |
|---|---|
| 6–8 Nov | £207.50 (3) |
| 10–12 Nov | £192.50 (4) |
| 13–15 Nov | £252.50 (1) |
| 24–26 Nov | £289.50 (7) |
| 27–29 Nov | £289.50 (3) |
| 4–6 Dec | £302.50 (1) |

- That puts us at P100, +65% to +160% vs the median.
- No proposal, per policy.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS

- **Comp medians:**

| Stay | Comp median (n) |
|---|---|
| 6–8 Nov | £204 (1) |
| 10–12 Nov | £227.25 (2) |
| 13–15 Nov | £250.25 (2) |
| 24–26 Nov | £229.75 (4) |
| 27–29 Nov | n/a (0) |
| 4–6 Dec | £346.25 (2) |

- Comp rating median 4.54 (51). Reference set only.

## Comp tables

**Source for every comp row:** Airbnb public search, checked 2026-11-06 07:19–07:27Z.
- Nightly price excludes taxes and includes cleaning.
- (±%) is the change vs 5 Nov for the same stay.
- "n/a" means the listing was not returned by the date-filtered search (booked, or a minimum-stay clash).
- The "Ours" rows use the live Smoobu rate, not the PriceLabs recommendation.

Rows appended: **558 comp rows** to `data/snapshots/2026-11-06/comps.csv` and **13 own-listing rows** to `data/snapshots/2026-11-06/channel_checks.csv`, both under `flock`. Both files had already been copied forward by another agent.

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 9 Nov–Tue 10 Nov (1n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Wed 16 Dec (3n) | Thu 17 Dec–Sun 20 Dec (3n) | Sun 20 Dec–Tue 22 Dec (2n) | Tue 29 Dec–Wed 30 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.17 (12) | n/a | £509 | £509 | £509 | £920 | £1020 | n/a | £509 | £960 | £1020 | £980 | £980 | £1020 | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | £420 (+8%) | £519 | £519 | £476 | n/a (was £476) | £1020 | n/a | £498 | £552 | £1020 | £980 | £980 | £1070 | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (29) | £887 (-1%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £937 (+1%) | n/a | £912 | £1082 | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.29 (45) | n/a | n/a | n/a | £332 | n/a | n/a | £320 | n/a | n/a | £328 (+1%) | n/a | n/a | n/a | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.92 (13) | n/a | n/a (was £400) | n/a | £474 | n/a | n/a | n/a | £428 (+7%) | £410 (-2%) | n/a | £456 | £529 (+3%) | £632 (+5%) | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (28) | n/a | £380 (-5%) | n/a | n/a | n/a | n/a | n/a | £380 (-5%) | n/a | £560 | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.27 (22.5) | £654 (2) | £509 (3) | £514 (2) | £475 (4) | £920 (1) | £1020 (2) | £320 (1) | £463 (4) | £744 (4) | £790 (4) | £946 (4) | £980 (4) | £1020 (3) | n/a (0) | |
| **Ours, Smoobu live rate/night 6 Nov 07:19Z (status, min stay)** | | | | £460 Booked (Smoobu), min 2 | £433 Booked (Smoobu), min 3 | £496 Booked (Smoobu), min 4 | £592 Booked (Smoobu), min 3 | £619 Booked (Smoobu), min 4 | £601 Booked (Smoobu), min 4 | £1383 Open, min 1 | £378 Open, min 2 | £532 Open, min 3 | £461 Open, min 2 | £547 Open, min 3 | £601 Open, min 3 | £662 Open, min 2 | £1351 Open, min 1 | |
| **Ours, comparable basis** | | | | £449 | £429 | £477 | £551 | £571 | £557 | £449 obs | £388 obs | £456 obs | £512 obs | £557 obs | £606 obs | £693 obs | £1411 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P50 / -31% | P33 / -16% | P0 / -7% | P100 / +16% | P0 / -38% | P0 / -45% | P100 / +40% | P25 / -16% | P25 / -39% | P25 / -35% | P25 / -41% | P25 / -38% | P33 / -32% | n/a | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Sun 8 Nov–Tue 10 Nov (2n) | Sun 8 Nov–Wed 11 Nov (3n) | Mon 9 Nov–Wed 11 Nov (2n) | Mon 9 Nov–Tue 10 Nov (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.91 (11) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £339 | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.7 (23) | n/a | £275 | n/a | £296 | n/a | n/a | £275 | n/a (was £275) | £275 | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | £308 | n/a | £348 | n/a | n/a | n/a | £292 | n/a (was £308) | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | £300 (-2%) | n/a | £392 | n/a | n/a | n/a | n/a | £310 | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.38 (24) | n/a (was £340) | £290 | n/a | £397 | n/a | n/a | n/a | £261 (-18%) | £283 (-17%) | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (53) | £564 (-2%) | £528 | £588 | £902 (+1%) | n/a (was £1102) | £1351 (+1%) | £528 | £492 | £528 | n/a | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.55 (22) | n/a | n/a | n/a | £425 (-1%) | £475 (-1%) | £483 (-2%) | n/a | n/a | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | £622 | £780 (-1%) | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | n/a | £242 (-3%) | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.87 (87) | n/a | n/a | n/a | £521 | £600 | n/a | £287 (-1%) | £285 | n/a (was £292) | £318 | parking listed |
| **Comp median (n)** | | | 4.67 (25.5) | £564 (1) | £300 (5) | £588 (1) | £397 (7) | £600 (3) | £780 (3) | £281 (4) | £288 (4) | £297 (4) | £328 (2) | |
| **Ours, Smoobu live rate/night 6 Nov 07:19Z (status, min stay)** | | | | £271 Booked (Smoobu), min 2 | £232 Open, min 2 | £294 Booked (Smoobu), min 2 | £408 Blocked, min 3 | £469 Blocked, min 4 | £480 Blocked, min 4 | £200 Open, min 2 | £209 Open, min 2 | £213 Open, min 2 | £200 Open, min 2 | |
| **Ours, comparable basis** | | | | £272 | £242 obs | £289 | £377 | £423 | £432 | £218 obs | £203 obs | £228 obs | £282 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P0 / -52% | P0 / -19% | P0 / -51% | excluded | excluded | excluded | P0 / -23% | P0 / -30% | P0 / -23% | P0 / -14% | |

### P08

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Fri 6 Nov–Sat 7 Nov (1n) | Sat 7 Nov–Sun 8 Nov (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | n/a (was £408) | £425 (+4%) | £408 | £408 | £408 | £408 | n/a | n/a | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | n/a | n/a (was £165) | n/a | n/a (was £182) | n/a | n/a | n/a | n/a | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (66) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) | 1.22 | 4 | 4.6 (77) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1497137911142581794](https://www.airbnb.co.uk/rooms/1497137911142581794) | 0.8 | 4 | 4.91 (23) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, house (2-bedroom cottage) |
| **Comp median (n)** | | | 4.87 (29.0) | n/a (0) | £425 (1) | £408 (1) | £408 (1) | £408 (1) | £408 (1) | n/a (0) | n/a (0) | |
| **Ours, Smoobu live rate/night 6 Nov 07:19Z (status, min stay)** | | | | £184 Open, min 2 | £190 Booked (Smoobu), min 2 | £236 Blocked/Booked (Smoobu), min 2 | £255 Blocked, min 3 | £318 Blocked, min 3 | £308 Blocked, min 3 | £175 Open, min 2 | £193 Open, min 2 | |
| **Ours, comparable basis** | | | | £231 obs | £219 | £255 | £270 | £318 | £310 | £283 | £297 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P0 / -48% | excluded | excluded | excluded | excluded | n/a | n/a | |

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Tue 10 Nov–Sat 14 Nov (4n) | Wed 18 Nov–Fri 20 Nov (2n) | Sun 22 Nov–Thu 26 Nov (4n) | Sun 29 Nov–Sat 5 Dec (6n) | Tue 8 Dec–Fri 11 Dec (3n) | Fri 11 Dec–Mon 14 Dec (3n) | Sat 12 Dec–Mon 14 Dec (2n) | Sun 13 Dec–Thu 17 Dec (4n) | Tue 15 Dec–Sat 19 Dec (4n) | Wed 23 Dec–Sat 26 Dec (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.7 (30) | n/a | £320 | £320 | £440 | £440 | £440 | n/a (was £283) | £320 | £404 | £392 | £447 | £529 | £545 | £429 | £456 | n/a | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a | n/a | £275 | n/a | n/a | n/a | n/a | £247 | n/a | £359 | £359 | £374 | £351 | n/a (was £382) | £440 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | £294 | £294 | n/a | £462 | £544 | £258 | £294 | n/a (was £258) | £410 | £444 | £494 | £510 | £394 | £420 | n/a | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a | £268 | n/a | £338 | n/a | n/a | n/a | n/a | £306 | £362 | n/a (was £417) | n/a (was £417) | £438 | £406 | £406 | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.5 (12) | n/a | £306 | £306 | £306 | £615 | £544 | £270 | £306 | £270 | £410 | £444 | £494 | £510 | £394 | £420 | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | £316 (-2%) | £286 | £358 | £358 | n/a | £478 | £278 | £328 | £306 | n/a | £374 | £448 | £478 | n/a (was £456) | £472 | £501 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a | £212 | £312 | n/a (was £312) | n/a | n/a | £231 | £312 | £281 | n/a | £292 | £292 | £312 | £281 | £281 | £292 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.5 (60) | n/a | n/a (was £191) | n/a | £191 | n/a | n/a | n/a | £191 | £185 | n/a | n/a | n/a | n/a | n/a | £270 | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (87) | n/a | n/a | n/a | £184 (-3%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £197 | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.68 (73) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.54 (37) | n/a | n/a | £294 | n/a | n/a | n/a | n/a | £274 (+7%) | n/a | n/a | £303 | £347 (-2%) | n/a | n/a | n/a | £361 | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £213 | n/a | n/a | n/a | n/a | £280 | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (35.5) | £316 (1) | £290 (6) | £310 (6) | £306 (7) | £462 (3) | £511 (4) | £264 (4) | £300 (8) | £281 (7) | £401 (4) | £374 (7) | £448 (7) | £458 (8) | £394 (7) | £420 (7) | £417 (5) | |
| **Ours, Smoobu live rate/night 6 Nov 07:19Z (status, min stay)** | | | | £240 Booked (Smoobu), min 2 | £177 Open, min 2 | £266 Booked (Smoobu)/Open, min 2 | £212 Open, min 2 | £293 Booked (Smoobu), min 2 | £292 Booked (Smoobu)/Open, min 2 | £201 Open, min 2 | £167 Open, min 2 | £210 Open, min 2 | £232 Open, min 2 | £249 Open, min 2 | £292 Open, min 2 | £277 Open, min 2 | £215 Open, min 2 | £238 Open, min 2 | £293 Open, min 2 | |
| **Ours, comparable basis** | | | | £240 | £177 | £266 | £212 | £293 | £292 | £201 | £167 | £210 | £232 | £249 | £292 | £277 | £215 | £238 | £293 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = Smoobu x 1.15 (before promotions)** | | | | £275 P0 / -13% | £204 P0 / -30% | £306 P33 / -1% | £243 P29 / -21% | £337 P0 / -27% | £335 P0 / -34% | £231 P0 / -12% | £192 P12 / -36% | £241 P14 / -14% | £266 P0 / -34% | £287 P0 / -23% | £336 P14 / -25% | £319 P25 / -30% | £247 P14 / -37% | £273 P14 / -35% | £337 P20 / -19% | Smoobu Booking.com markup +15% (policy) |
| **Our percentile / vs median** | | | | P0 / -24% | P0 / -39% | P0 / -14% | P29 / -31% | P0 / -36% | P0 / -43% | P0 / -24% | P0 / -44% | P14 / -25% | P0 / -42% | P0 / -33% | P14 / -35% | P0 / -40% | P14 / -45% | P0 / -44% | P20 / -30% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | £172 (-8%) | £152 | n/a | £202 | n/a | £302 | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | £208 (-5%) | n/a | n/a | £352 | £428 | n/a | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | £236 | n/a (was £236) | n/a | n/a | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | £192 | £252 | £302 | n/a | n/a | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a (was £202) | £192 | n/a | £278 | n/a | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | n/a | n/a | n/a | £290 | £290 | n/a | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | n/a (was £322) | n/a | £402 | n/a | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (20) | n/a | n/a | n/a | n/a | £272 (-6%) | n/a | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (16) | n/a | n/a | n/a | £200 | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | n/a (was £264) | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.83 (12) | n/a | £240 | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.88 (19.5) | £208 (3) | £192 (4) | £252 (1) | £290 (7) | £290 (3) | £302 (1) | |
| **Ours, Smoobu live rate/night 6 Nov 07:19Z (status, min stay)** | | | | £500 Open, min 4 | £500 Open, min 3 | £500 Open, min 4 | £500 Open, min 3 | £500 Open, min 4 | £500 Open, min 4 | |
| **Ours, comparable basis** | | | | £500 | £500 | £500 | £500 | £500 | £500 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +141% | P100 / +160% | P100 / +98% | P100 / +73% | P100 / +73% | P100 / +65% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | £204 | £190 | £186 | £192 | n/a | n/a | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (51) | n/a | £264 (-5%) | n/a | £314 | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | n/a | n/a | n/a | £354 (+3%) | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | n/a | £314 | £264 | n/a | £338 | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.67 (60) | n/a | n/a | n/a | £196 (-4%) | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [774061637963678253](https://www.airbnb.co.uk/rooms/774061637963678253) | 0.54 | 3 | 4.5 (34) | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed |
| **Comp median (n)** | | | 4.54 (51) | £204 (1) | £227 (2) | £250 (2) | £230 (4) | n/a (0) | £346 (2) | |
| **Ours, Smoobu live rate/night 6 Nov 07:19Z (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | excluded | excluded | |

## Data gaps
- **Booking.com: NOT CHECKED** (bot check, not bypassed). This covers the P11 guest view, the P06 Booking.com rate on 8–11 Nov, and whether any £2-era price was bookable there.
- **P06 9 Nov:** what produces the PriceLabs "Your Price" of £2 (no override, no log), and who moved Smoobu to £200: NOT CHECKED. The PriceLabs raw for P06 is stale (5 Nov 10:33Z).
- **P11 10–12 Nov:** cause of Smoobu sitting 7–11% under PriceLabs: NOT CHECKED.
- **P08:** why 6 Nov did not take the +5%, and why Airbnb now applies 0.85× rather than 0.765×: NOT CHECKED. Whether the five absent comps are inactive: NOT CHECKED.
- **Comp samples are thin:** P08 has n = 0–1, P05 and P06 open stays n = 3–5, and P14 / P17 some stays n = 1.
- **Percentiles are biased low:** P11 and P14 percentiles use the room price against cleaning-inclusive comps.
- **No PriceLabs comp set or Market Dashboard data was used today:** `market.csv` belongs to the market agent, and no `get_neighbourhood_data` call was made.
