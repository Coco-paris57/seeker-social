# Competitor positioning: CENTRAL/NORTH (D = 2026-11-07)

**Method**
- **Comp ids:** the same 55 comp ids as 1–6 Nov (`data/snapshots/2026-11-06/comps.csv`, comp-central rows). **No replacements.**
  - Comps that appeared on none of today's stays: P06 917140285217729256. P08 693487869095756237, 1289147258305624118, 1409413462916896898, 1497137911142581794 (**6 days running**). P14 1075245497252121738. P17 975294297333089697, 774061637963678253. Whether they are inactive: NOT CHECKED. P08 has no sellable night after tonight, so replacing its comps would change no decision.
- **Searches:** 61 public Airbnb searches (airbnb.co.uk, all result pages, 0 parse failures, no bot challenge). Same map boxes and filters as 25 Oct–6 Nov: entire home, minimum bedrooms = ours, adults = our sleeps − 1. Checked 2026-11-07 07:20–07:25Z.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c07s/search.py`. Raw: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c07/search/*.json`
- **Same stays for every comp and for us:** Tue 10–Thu 12 Nov (midweek), Fri 13–Sun 15 Nov (next Friday–Sunday), **Mon 7–Wed 9 Dec (30 days out, new)**, plus 24–26 Nov, 27–29 Nov and 4–6 Dec kept for the day-on-day comparison.
- **Extra stays:** P06 8–10 / 8–11 / 9–11 Nov, the reopened **15–17 / 15–18 / 16–18 Nov**, and **18–22 Nov (the new booking)**. P08 7–8 Nov (tonight, 1 night). P11 10–13, 18–20, 22–26 Nov, 29 Nov–5 Dec, 8–11 / 11–14 / 12–14 Dec, **darts 13–17 Dec**, 15–19 and 23–26 Dec. P05 9–10 Nov, 16–18 Nov and the December gaps.
- **Our prices:** live **Smoobu GET `/api/rates`** at 7 Nov 07:19Z for P05, P06, P08, P11, P14 (`/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c07/smoobu_rates07.json`). It equals `prices.csv` (PriceLabs 7 Nov raw) on every night 8 Nov–31 Dec for these five. Booked or open status comes from Smoobu `reservations.csv` (7 Nov).
- **Price basis:**
  - **Comps:** Airbnb total shown ÷ nights. Excludes taxes, includes cleaning, after any offer.
  - **P05, P06:** our own Airbnb listing as seen in the same search (14 stays; rows added to `channel_checks.csv`). Every P06 observation today is exactly **0.765 × Smoobu + £129 cleaning** (8–10, 8–11, 9–11, 10–12, 15–18, 16–18 Nov). Where our listing did not appear, the price is derived the same way.
  - **P11** (Booking.com only), **P08** and **P14:** Smoobu room rate, except P08 derived (0.765 × Smoobu + £149 ÷ nights). P11/P14 room rates exclude cleaning while comps include it, so those percentiles are biased low. P11 is also shown at the Booking.com list price (Smoobu × 1.15, before promotions).
- **Booking.com: NOT CHECKED** (bot check, not retried or bypassed).
- **Positioning:** `rm/positioning.py` `quality_premium` + `recommend`. Occupancy from `reports/2026-11-07/kpi_pack.json`, except **P06 30d = 0.533 from Smoobu** (8 booked of 15 non-blocked nights 7 Nov–6 Dec, including the new 18–22 Nov booking; kpi_pack `forward_occ_30_ex_blocks` 0.499 comes from the 6 Nov 08:40Z PriceLabs refresh and predates it). Percentile = mean over open multi-night stays. **14d** = check-in up to 21 Nov, **30d** = up to 7 Dec, **60d** = all.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c07s/analyse07.py`. Output: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c07/analysis.json`.
- **PriceLabs (read-only, one call at a time):** `get_user_logs` (listing, 6–7 Nov) returned **0 entries**. `get_listing_date_overrides` for P06, P08, P11 and P05: no override updated since 5 Nov 10:55Z.
- **Commission:** channel's finding stands. Not re-raised here.

## Summary

| Ref | Comps priced per stay | Our pct, open stays: 14d / 30d / 60d | Rating, ours vs comp median; review gap | Booked vs market (30d) | Supported positioning |
|---|---|---|---|---|---|
| **P05 4BR** | 6 (0–4) | **P25 / P25 / P26** | Airbnb 4.77 (35) vs 4.26 (22.5); +12.5 | 75.9% vs 43% | `quality_premium` **+0.15**, so **+15% vs median is supported**. `recommend` 30d / 60d: **raise +25%** (n = 3–4; three comps under 4.3 inflate qp). December sits 32–42% under the medians. |
| **P06 2BR** | 12 (3–6 on open stays) | **P0 / P0 / P0** | 4.58 (12) vs 4.67 (25.5); −13.5 | **53.3%** ex-blocks (Smoobu) vs 48% | qp −0.036, so **−4% vs median is supported**. `recommend` 30d: **raise +5%**. Airbnb shows us 22–39% under the median on every open stay. The 60d fix-listing output is an artefact: 60d occupancy counts the intentional blocks (policy). |
| **P08 2BR** | 0–2 | n/a: **no comp is available for 7–8 Nov** | 4.50 (4) vs 4.87 (29); −25 | 100% vs 49% | qp −0.148, so **−15% vs median is supported**. `recommend`: raise +10% (P50 on the booked 10–12 Nov stay, n = 2). **Tonight is the last sellable night and it is unsellable (min 2).** |
| **P11 2BR** | 12 (3–9) | **P13 / P14 / P9** at room price | Booking.com 8.0/10 (policy). Not comparable with the Airbnb median 4.67 (35.5) | 44.8% vs 46% (60d 44.1% vs 39%) | qp 0, so **at the median (0%) is supported**. `recommend` 30d / 60d: **raise +5%**. We sit 23–46% under the median at room price and 11–38% under at list price. |
| P14 1BR | 12 (1–7) | P100 | Not seen on Airbnb; comp median 4.88 (19.5) | 0% vs 46% | Special setup (policy): numbers only. +65% to +111% vs median. |
| P17 1BR | 7 (0–4) | n/a | Comp median 4.54 (51) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (same comp, same stay, 6 Nov → 7 Nov)**
- **Comps were mostly flat:** 130 of 170 comparable comp-stays did not move.
- **Comps that cut prices:**
  - **P05** 1610095240357069208 cut 10–12, 13–15 and 16–18 Nov from £509 to £419 (−18%). 1639043256346803626 cut 10–12 and 16–18 Nov from £380 to £340 (−11%).
  - **P06** 1273781636585601427 (lift; the dear outlier) cut 13–15 Nov by 15% and 8–11 Nov by 6–7%.
  - **P11** 1675590787835266115 cut 13–15 Nov by 8%.
- **Sold since yesterday (demand signal):**
  - **P06:** 854346637654279747 sold 10–12 and 8–11 Nov. 1273781636585601427 sold 10–12 Nov. 1315177393080154583 sold 24–26 Nov.
  - **P11:** 10–12 Nov lost 1675590787835266115 and 1480693526878012391 (the £212 comp). 1543632408013225027 sold 18–20 Nov and 29 Nov–5 Dec. 1675590787835266115 sold 15–19 Dec.
- **Back on sale:** P11 1263490105174331990 (4.44, 0.08 km) is back for 10–12 Nov at £182.50, after selling out yesterday at £191. It is also open for darts 13–17 Dec at £235. P06 854346637654279747, 1420126228540342938 and 1018722159796386217 reopened for 8–11 Nov.
- **Ours, 6 Nov → 7 Nov:**
  - **No logged edit** (`get_user_logs` 6–7 Nov: 0 entries).
  - **The PriceLabs refresh on 6 Nov at 08:40Z lowered P06 by about 10%** on every open night (detail below).
  - **P11 10–12 Nov:** Smoobu moved from £175 / £179 to £194 / £200, now equal to PriceLabs. **The P11 Smoobu-below-PriceLabs gap is closed.**
  - **P08 7 Nov:** £193 → £225.
  - **P05:** 29 Nov–2 Dec down about 5% (Smoobu £531.75 → £504.75 average).

## P06 Marylebone 2-bed (3288517): the 18–22 Nov booking, the reopened 15–17 Nov nights, and 8–11 Nov (intentional blocks excluded)

**The new 18–22 Nov booking** (Airbnb, booked 6 Nov, 4 nights: room £856.79 + £129 cleaning; `reservations.csv` 7 Nov)
- **Paid vs the price on sale:** room £856.79 = **exactly 0.765 ×** the Smoobu rates after the 6 Nov 08:40Z PriceLabs refresh (£247 + £264 + £301 + £308 = £1,120). That is the same Airbnb-rules factor seen on every P06 stay today, so the booking contains **no unexplained discount**.
- **Before that refresh, the same nights were dearer:**
  - Smoobu at 6 Nov 07:19Z showed £277 / £295 / £342 / £430 = £1,344 (`c06/smoobu_rates06.json`). Against that, the booking is 0.6375×.
  - The refresh (`raw/prices_3288517.json`, `last_refreshed_at` 2026-11-06T08:40:13Z) cut them by 11% / 11% / 12% / **28%**. PriceLabs' own `uncustomized_price` fell too (302 → 263, 324 → 285, 375 → 325, 430 → 332).
  - The only overrides on 15–22 Nov are min-stay 2 (set 4 Nov 12:52Z; `get_listing_date_overrides`), and no edit was logged. So this was the PriceLabs model, not a user change. Why the model fell: NOT CHECKED.
  - **Cost:** at 0.765×, the pre-refresh rates would have paid £1,028.16 room, **£171.37 more** than the booking.
- **Vs comps:** only **one comp** was bookable for 18–22 Nov today: 1273781636585601427 (lift, 4.7, the dear outlier) at £806.50/night. So the P0 / −69% in the table is not meaningful on its own.
  - Read against the adjacent stays instead. Our booking works out at **£246.45/night all-in**. The 16–18 Nov median is £357 (n = 5) and the 15–18 median £355 (n = 4), so the booking is about **−31%** and below every comp seen on those stays (the cheapest is 744585770789956203 at £280).
  - PriceLabs Nearby Listings for 2-bed P06 (`market.csv` 6 Nov snapshot, 2 Nov pull): p25 £314 / p50 £405. The booking's £214.20 room per night is under p25.
  - That 11 of 12 comps were unavailable for 18–22 Nov is itself a demand signal.
- **Effect on the 18 Oct base-rise tally:** for the PriceLabs/KPI agent. Not recomputed here.

**The reopened nights still open: 15, 16 and 17 Nov** (Smoobu £237 / £237 / £244, min 2; £265 / £264 / £270 before the refresh)

| Stay | Ours, Airbnb all-in/night | Comp median (n) | Pct / vs median |
|---|---|---|---|
| 15–18 Nov (3n) | **£226.09 observed** (3 × £226.09 = £678.26, no offer line) | £355.13 (4) | P0 / −36% |
| 15–17 Nov (2n) | £245.81 (derived 0.765×) | £402.80 (4) | P0 / −39% |
| 16–18 Nov (2n) | **£248.48 observed** | £357.00 (5) | P0 / −30% |

- **Exposure:** £718 room at Smoobu rates. After 15–17 Nov sells, P06 has no open night before the intentional block from 22 Nov.

**8–11 Nov** (Smoobu £200 / £200 / £204 / £212, min 2; 12–15 Nov booked)
- **Prices:** 10–11 Nov fell from £226 / £238 to £204 / £212 with the refresh. On 8–9 Nov, PriceLabs now recommends £200 itself (`uncustomized` 174 / 189), so these nights sit at what looks like the minimum price.
- **What guests see on Airbnb (5 adults, 07:20Z):** 8–10 Nov **£217.50** vs median £280.25 (n = 6), **P0 / −22%**. 9–11 Nov **£219.03** vs £299 (6), **P0 / −27%**. 8–11 Nov **£197.02** vs £282.33 (3), **P0 / −30%**.
  - The cheapest comp is 1452940332365117153 at £238.50 (rated 4.07).
- **t-p06-2pound: FIXED.** 9 Nov is £200 in Smoobu, and PriceLabs `price` / `user_price` / `booked_price` are all 200 (7 Nov raw).
- **Reyhan's −5% on 8–14 Nov is unchanged** (updated 4 Nov 01:28Z). It conflicts with the +5% below: Corentin to confirm.

**Positioning**
- `quality_premium(4.58, 4.67)` = −0.036, so **−4% vs median is supported**: about £341/night all-in on 15–18 Nov and about £269–£287 on 8–11 Nov.
- `recommend(0.533, 0.48, 0.0, −0.036)` → **raise +5%**.
- **Minimum consistent step:** put 15–17 Nov back to the pre-refresh £265 / £264 / £270. At 0.765× that is still **P0 (about £247 all-in/night, −30%)**.
- **Differentiators:** P06 is on the 2nd floor with no lift. Of the 12 comps, 5 have a lift and 2 are Superhosts.

## P08 Islington 2-bed (3318167): the last sellable night before the 13 Nov handback

- **Tonight (7 Nov) is the only sellable night left.** Smoobu (07:19Z) shows **£225, min 2**. 8–14 Nov is booked (Airbnb, booked 17 Oct), and policy makes 13 Nov the last night.
  - With 8 Nov booked, **a min-2 night cannot sell**. 6 Nov did not sell either (`reservations.csv` has no P08 booking that night).
- **a-handback-lastnights: NOT DONE.** The PriceLabs override on 7 Nov still has min_stay 2 (+5%, updated 5 Nov 10:55:55Z), and no log since.
- **Comps:** the 7–8 Nov search returned **zero** entire-home 2-beds in the box (4 adults). No percentile is possible.
- **Positioning:** qp −0.148, so −15% vs the last observed median is supported (£408, 28354043, n = 1) = about £347 all-in. Our derived £321 all-in sits under that.
- **What would make tonight sellable:** min 1 on 7 Nov, applied today. Worth at most about £172 room at 0.765 × £225. After today nothing is left to price before handback.

## P11 Camden (3064196): next 14 days, darts, December (Smoobu room; Booking.com list × 1.15)

| Stay (open) | Ours room (Smoobu) | Comp median (n) | Pct / vs median | List × 1.15 |
|---|---|---|---|---|
| 10–12 Nov | £197.00 (was £177; now = PL) | £283.50 (5) | P20 / −30% | £227: P20 / −20% |
| 10–13 Nov | £201.00 | £263.00 (5) | P20 / −24% | £231: P20 / −12% |
| 18–20 Nov | £177.50 | £306.50 (7) | **P0 / −42%** | £204: P14 / −33% |
| 22–26 Nov | £213.00 | £281.25 (7) | P14 / −24% | £245: P14 / −13% |
| 24–26 Nov | £214.00 | £306.50 (7) | P29 / −30% | £246: P29 / −20% |
| 29 Nov–5 Dec | £232.00 | £392.17 (3) | P0 / −41% | £267: P0 / −32% |
| 8–11 Dec | £249.00 | £404.00 (8) | P0 / −38% | £286: P0 / −29% |
| 11–14 Dec | £291.67 | £432.50 (8) | P0 / −33% | £335: P12 / −22% |
| 12–14 Dec | £276.50 | £457.50 (8) | P0 / −40% | £318: P25 / −30% |
| **13–17 Dec (darts)** | **£214.25** | **£394.00 (9)** | **P11 / −46%** | £246: P22 / −37% |
| 15–19 Dec | £240.50 | £406.25 (7) | P0 / −41% | £277: P14 / −32% |
| 23–26 Dec | £300.00 | £388.84 (6) | P17 / −23% | £345: P33 / −11% |

- **Darts 13–17 Dec:**
  - Smoobu shows £227 / £202 / £209 / £219.
  - Reyhan's −5% (updated 2 Nov 15:05Z) is still on every night, and on all of 10 Nov–18 Dec. **Unchanged.**
  - This remains a conflict for Corentin to confirm, not a new proposal: policy `darts_override_24oct` says +5%, and the 21 Oct intent was "average above £300".
  - Only 1090528454481682946 (4.72, 87 reviews, 0.08 km, £197.75) and 1263490105174331990 (4.44, 61 reviews, 0.08 km, £235) are cheaper.
- **Positioning:**
  - qp 0 (no Airbnb rating).
  - `recommend(0.448, 0.46, 0.14, 0)` → **raise +5%** (30d). `recommend(0.441, 0.39, 0.09, 0)` → **raise +5%** (60d).
  - **Supported:** at the comp median (0%). Removing Reyhan's −5% is that +5%, and it still leaves us P0–P29 on every open stay.
  - Visibility (policy: CTR 0.81% vs 1.70%) remains the larger lever.
- **Differentiators:** P11 is a basement flat with a patio. Of the 12 comps, 4 have a lift and 3 have a terrace or balcony.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214): December

| Stay (open) | Ours on Airbnb, all-in (observed) | Comp median (n) | Pct / vs median | Smoobu room |
|---|---|---|---|---|
| 16–18 Nov | £387.00 | £419.00 (4) | P25 / −8% (two comps cut 11–18%) | £378.00 |
| 29 Nov–3 Dec | £435.00 | £744.13 (4) | P25 / −42% | £504.75 (−5% override) |
| 7–9 Dec | £511.50 | £790.00 (4) | P25 / −35% | £460.00 |
| 13–16 Dec | £553.67 | £945.50 (4) | P25 / −41% | £542.67 (−7%) |
| 17–20 Dec | £603.67 | £980.00 (4) | P25 / −38% | £598.33 (−7% to 19 Dec) |
| 20–22 Dec | £691.50 | £1,020.00 (3) | P33 / −32% | £659.50 |
| 29–30 Dec (1n, min 1) | £1,406.40 | no comp available | n/a | £1,346 (+100% override) |

- **Only one comp is under us on every December stay:** 1363636555926649515 (3.92 rating, 1.23 km).
- **a-p05-9nov: NOT FIXED (eighth check).**
  - Smoobu 9 Nov is £1,376 (min 1). The +300% override is unchanged (updated 30 Oct 22:09Z).
  - Airbnb 9–10 Nov still shows "1 night x £511.80", "Special offer −£63.36", total **£448.44**. The offer line is unexplained under policy (manual Airbnb promotions removed 21 Oct).
  - The one comp open that night asks £320.
- **Reyhan's 4 Nov −7% on 13–19 Dec and −5% on 29 Nov–2 Dec are unchanged** (`get_listing_date_overrides` 7 Nov). This is a conflict with a-p05-dec for Corentin to confirm, not a new proposal.
- **Positioning:**
  - `quality_premium(4.77, 4.26)` = +0.15 (cap).
  - `recommend(0.759, 0.43, 0.25, 0.15)` → **raise +25%** (30d). `recommend(0.644, 0.40, 0.26, 0.15)` → **raise +25%** (60d).
  - Even +25% leaves every December stay 15–28% under the medians.
  - Caveat: n = 3–4 per stay.
- **Differentiators:**
  - 912053248917940403: Superhost, lift, park view, 4.97.
  - 1639043256346803626: Superhost house with terrace.
  - Three comps list parking.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

- **Smoobu:** £500 (Dec peaks £510–£622), min stay 3–4. 0% booked vs 46% market at 30d.
- **Comp medians:**

| Stay | Comp median (n) |
|---|---|
| 10–12 Nov | £236.50 (5) |
| 13–15 Nov | £252.50 (1) |
| 24–26 Nov | £296 (6) |
| 27–29 Nov | £289.50 (3) |
| 4–6 Dec | £302.50 (1) |
| 7–9 Dec | £277.50 (7) |

- That puts us at P100, +65% to +111% vs the median.
- No proposal, per policy.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS

- **Comp medians:**

| Stay | Comp median (n) |
|---|---|
| 10–12 Nov | £227.25 (2) |
| 13–15 Nov | £251.25 (2) |
| 24–26 Nov | £232.50 (4) |
| 27–29 Nov | n/a (0) |
| 4–6 Dec | £331 (2) |
| 7–9 Dec | £231.75 (2) |

- Comp rating median 4.54 (51). Reference set only.

## Comp tables

**Source for every comp row:** Airbnb public search, checked 2026-11-07 07:20–07:25Z.
- Nightly price excludes taxes and includes cleaning.
- (±%) is the change vs 6 Nov for the same stay.
- "n/a" means the listing was not returned by the date-filtered search (booked, or a minimum-stay clash).
- The "Ours" rows use the live Smoobu rate.

Rows appended: **582 comp rows** to `data/snapshots/2026-11-07/comps.csv` and **14 own-listing rows** to `data/snapshots/2026-11-07/channel_checks.csv`, both under `flock`. Both files had already been copied forward by another agent.

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Mon 9 Nov–Tue 10 Nov (1n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Sun 13 Dec–Wed 16 Dec (3n) | Thu 17 Dec–Sun 20 Dec (3n) | Sun 20 Dec–Tue 22 Dec (2n) | Tue 29 Dec–Wed 30 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.17 (12) | £419 (-18%) | £419 (-18%) | £509 | £920 | £1020 | £1020 | n/a | £419 (-18%) | £960 | £980 | £980 | £1020 | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | n/a (was £519) | £519 | £476 | n/a | £1020 | £1020 | n/a | £498 | £552 | £980 | £980 | £1070 | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (29) | £720 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £936 | £911 | £1082 | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.28 (46) | n/a | n/a | £328 (-2%) | n/a | n/a | £322 (-2%) | £320 | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.92 (13) | n/a | n/a | £483 (+2%) | n/a | n/a | n/a | n/a | £419 (-2%) | £424 (+3%) | £457 | £537 (+2%) | £634 | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (28) | £340 (-11%) | n/a | n/a | n/a | n/a | £560 | n/a | £340 (-11%) | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.26 (22.5) | £419 (3) | £469 (2) | £480 (4) | £920 (1) | £1020 (2) | £790 (4) | £320 (1) | £419 (4) | £744 (4) | £946 (4) | £980 (4) | £1020 (3) | n/a (0) | |
| **Ours, Smoobu live rate/night 7 Nov 07:20Z (status, min stay)** | | | | £430 Booked (Smoobu), min 3 | £492 Booked (Smoobu), min 4 | £559 Booked (Smoobu), min 3 | £588 Booked (Smoobu), min 4 | £572 Booked (Smoobu), min 4 | £460 Open, min 2 | £1376 Open, min 1 | £378 Open, min 2 | £505 Open, min 3 | £543 Open, min 3 | £598 Open, min 3 | £660 Open, min 2 | £1346 Open, min 1 | |
| **Ours, comparable basis** | | | | £426 | £474 | £525 | £547 | £535 | £512 obs | £449 obs | £387 obs | £435 obs | £554 obs | £604 obs | £692 obs | £1407 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P67 / +2% | P50 / +1% | P100 / +10% | P0 / -40% | P0 / -48% | P25 / -35% | P100 / +40% | P25 / -8% | P25 / -42% | P25 / -41% | P25 / -38% | P33 / -32% | n/a | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 8 Nov–Tue 10 Nov (2n) | Sun 8 Nov–Wed 11 Nov (3n) | Mon 9 Nov–Wed 11 Nov (2n) | Sun 15 Nov–Wed 18 Nov (3n) | Sun 15 Nov–Tue 17 Nov (2n) | Mon 16 Nov–Wed 18 Nov (2n) | Wed 18 Nov–Sun 22 Nov (4n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.91 (11) | n/a | n/a | n/a | n/a | n/a | £420 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.7 (23) | £275 | n/a | £296 | n/a | n/a | n/a | £275 | n/a | £275 | £280 | £280 | £280 | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a (was £308) | n/a | £348 | n/a | n/a | £358 | £308 | n/a (was £292) | £308 | n/a | n/a | n/a | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | £300 | n/a | £392 | n/a | n/a | n/a | n/a | n/a | £310 | n/a | n/a | £328 | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.38 (24) | £290 | n/a | £397 | n/a | n/a | n/a | £278 | £261 | £283 | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (53) | n/a (was £528) | £498 (-15%) | £894 (-1%) | £1083 | £1339 (-1%) | £894 | £488 (-7%) | £455 (-7%) | £498 (-6%) | £462 | £498 | n/a | £806 | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £394 | £415 | £415 | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.55 (22) | n/a | n/a | n/a (was £425) | £461 (-3%) | £474 (-2%) | n/a | n/a | n/a | n/a | £316 | n/a | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | £608 (-2%) | £766 (-2%) | £610 | n/a | n/a | n/a | n/a | £390 | £412 | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | n/a | £238 (-1%) | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.87 (87) | n/a | n/a | £516 (-1%) | £598 | n/a | n/a | £282 (-2%) | £282 (-1%) | £290 | n/a | n/a | £357 | n/a | parking listed |
| **Comp median (n)** | | | 4.67 (25.5) | £290 (3) | £498 (1) | £394 (6) | £604 (4) | £766 (3) | £515 (4) | £280 (6) | £282 (3) | £299 (6) | £355 (4) | £403 (4) | £357 (5) | £806 (1) | |
| **Ours, Smoobu live rate/night 7 Nov 07:20Z (status, min stay)** | | | | £208 Open, min 2 | £264 Booked (Smoobu), min 2 | £416 Blocked, min 3 | £462 Blocked, min 4 | £484 Blocked, min 4 | £449 Blocked, min 3 | £200 Open, min 2 | £201 Open, min 2 | £202 Open, min 2 | £239 Open, min 2 | £237 Open, min 2 | £240 Open, min 2 | £280 Booked (Smoobu), min 2 | |
| **Ours, comparable basis** | | | | £224 obs | £266 | £383 | £418 | £435 | £408 | £218 obs | £197 obs | £220 obs | £226 obs | £246 | £248 obs | £246 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P0 / -23% | P0 / -46% | excluded | excluded | excluded | excluded | P0 / -22% | P0 / -30% | P0 / -27% | P0 / -36% | P0 / -39% | P0 / -30% | P0 / -69% | |

### P08

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Sat 7 Nov–Sun 8 Nov (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | £408 (-4%) | £408 | £408 | £408 | £408 | £408 | n/a | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | £165 | n/a | £182 | n/a | n/a | £182 | n/a | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (66) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) | 1.22 | 4 | 4.6 (77) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1497137911142581794](https://www.airbnb.co.uk/rooms/1497137911142581794) | 0.8 | 4 | 4.91 (23) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, house (2-bedroom cottage) |
| **Comp median (n)** | | | 4.87 (29.0) | £286 (2) | £408 (1) | £295 (2) | £408 (1) | £408 (1) | £295 (2) | n/a (0) | |
| **Ours, Smoobu live rate/night 7 Nov 07:20Z (status, min stay)** | | | | £200 Booked (Smoobu), min 2 | £245 Blocked/Booked (Smoobu), min 2 | £252 Blocked, min 3 | £311 Blocked, min 3 | £310 Blocked, min 3 | £258 Blocked, min 3 | £225 Open, min 2 | |
| **Ours, comparable basis** | | | | £227 | £262 | £267 | £312 | £312 | £272 | £321 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P50 / -21% | excluded | excluded | excluded | excluded | excluded | n/a | |

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 10 Nov–Fri 13 Nov (3n) | Wed 18 Nov–Fri 20 Nov (2n) | Sun 22 Nov–Thu 26 Nov (4n) | Sun 29 Nov–Sat 5 Dec (6n) | Tue 8 Dec–Fri 11 Dec (3n) | Fri 11 Dec–Mon 14 Dec (3n) | Sat 12 Dec–Mon 14 Dec (2n) | Sun 13 Dec–Thu 17 Dec (4n) | Tue 15 Dec–Sat 19 Dec (4n) | Wed 23 Dec–Sat 26 Dec (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.7 (30) | £309 (-3%) | £320 | £440 | £440 | £440 | £440 | £288 | £320 | £404 | £392 | £447 | £529 | £545 | £429 | £456 | n/a | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a | £274 (-1%) | n/a | n/a | £374 | n/a | n/a | £246 | n/a | £359 | £359 | £374 | £351 | £382 | £440 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | £284 (-4%) | £294 | n/a | £462 | £544 | £463 | £263 | n/a (was £294) | n/a | n/a (was £410) | £444 | £494 | £510 | £394 | £420 | n/a | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | £268 | n/a | n/a (was £338) | n/a | n/a | £438 | £247 | n/a | £306 | £362 | £417 | £417 | £438 | £406 | £406 | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.5 (12) | £295 (-4%) | £306 | £306 | £615 | £544 | £463 | £275 | £306 | £270 | £410 | £444 | £494 | £510 | £394 | £420 | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | n/a (was £286) | £328 (-8%) | £358 | n/a | £478 | £388 | n/a | £328 | £306 | n/a | £391 (+5%) | £448 | £478 | £456 | n/a (was £472) | £511 (+2%) | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a (was £212) | £312 | £312 | n/a | n/a | £312 | n/a | £312 | £281 | n/a | £292 | £292 | £312 | £281 | £281 | £292 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.44 (61) | £182 | n/a | £191 | n/a | n/a | n/a | £181 | £191 | £185 | n/a | n/a | n/a | n/a | £235 | £270 | £307 | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (87) | n/a | n/a | £184 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £198 | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.68 (73) | n/a | n/a | n/a | n/a | n/a | £222 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.54 (37) | n/a | n/a (was £294) | n/a | n/a | n/a | n/a | n/a | £273 | n/a | n/a | £302 (-1%) | £343 (-1%) | n/a | n/a | n/a | £361 | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £214 | n/a | n/a | n/a | n/a | £280 | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (35.5) | £284 (5) | £312 (5) | £306 (7) | £462 (3) | £511 (4) | £412 (8) | £263 (5) | £306 (7) | £281 (7) | £392 (3) | £404 (8) | £432 (8) | £458 (8) | £394 (9) | £406 (7) | £389 (6) | |
| **Ours, Smoobu live rate/night 7 Nov 07:20Z (status, min stay)** | | | | £197 Open, min 2 | £266 Booked (Smoobu)/Open, min 2 | £214 Open, min 2 | £285 Booked (Smoobu), min 2 | £295 Booked (Smoobu)/Open, min 2 | £251 Booked (Smoobu)/Open, min 2 | £201 Open, min 2 | £178 Open, min 2 | £213 Open, min 2 | £232 Open, min 2 | £249 Open, min 2 | £292 Open, min 2 | £276 Open, min 2 | £214 Open, min 2 | £240 Open, min 2 | £300 Open, min 2 | |
| **Ours, comparable basis** | | | | £197 | £266 | £214 | £285 | £295 | £251 | £201 | £178 | £213 | £232 | £249 | £292 | £276 | £214 | £240 | £300 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = Smoobu x 1.15 (before promotions)** | | | | £227 P20 / -20% | £306 P20 / -2% | £246 P29 / -20% | £328 P0 / -29% | £339 P0 / -34% | £289 P12 / -30% | £231 P20 / -12% | £204 P14 / -33% | £245 P14 / -13% | £267 P0 / -32% | £286 P0 / -29% | £335 P12 / -22% | £318 P25 / -30% | £246 P22 / -38% | £277 P14 / -32% | £345 P33 / -11% | Smoobu Booking.com markup +15% (policy) |
| **Our percentile / vs median** | | | | P20 / -30% | P0 / -15% | P29 / -30% | P0 / -38% | P0 / -42% | P12 / -39% | P20 / -24% | P0 / -42% | P14 / -24% | P0 / -41% | P0 / -38% | P0 / -33% | P0 / -40% | P11 / -46% | P0 / -41% | P17 / -23% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a (was £152) | n/a | £202 | n/a | £302 | £302 | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | £352 | £428 | n/a | n/a | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | £236 | n/a | n/a | n/a | n/a | £246 | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | £192 | £252 | £302 | n/a | n/a | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | £192 | n/a | n/a (was £278) | n/a | n/a | £278 | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | n/a | n/a | £290 | £290 | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | n/a | £402 | n/a | n/a | £402 | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (20) | n/a | n/a | n/a | £272 | n/a | £261 | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (17) | n/a | n/a | £200 | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | £264 | n/a | n/a | n/a | n/a | £241 | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.83 (12) | £240 | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.88 (19.5) | £236 (5) | £252 (1) | £296 (6) | £290 (3) | £302 (1) | £278 (7) | |
| **Ours, Smoobu live rate/night 7 Nov 07:20Z (status, min stay)** | | | | £500 Open, min 3 | £500 Open, min 4 | £500 Open, min 3 | £500 Open, min 4 | £500 Open, min 4 | £500 Open, min 3 | |
| **Ours, comparable basis** | | | | £500 | £500 | £500 | £500 | £500 | £500 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +111% | P100 / +98% | P100 / +69% | P100 / +73% | P100 / +65% | P100 / +80% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | £190 | £186 | £192 | n/a | n/a | £192 | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (51) | £264 | n/a | £314 | n/a | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | n/a | n/a | £339 (-4%) | £272 | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | £316 (+1%) | £273 (+3%) | n/a | £323 (-4%) | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.67 (60) | n/a | n/a | £191 (-2%) | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [774061637963678253](https://www.airbnb.co.uk/rooms/774061637963678253) | 0.54 | 3 | 4.5 (34) | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed |
| **Comp median (n)** | | | 4.54 (51) | £227 (2) | £251 (2) | £232 (4) | n/a (0) | £331 (2) | £232 (2) | |
| **Ours, Smoobu live rate/night 7 Nov 07:20Z (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | excluded | excluded | |
## Data gaps
- **Booking.com: NOT CHECKED** (bot check, not bypassed). This covers the P11 guest view and the P06 Booking.com rate on its open nights.
- **P06:** why the 6 Nov 08:40Z PriceLabs refresh cut the recommended and uncustomized prices 10–28% on 10–21 Nov: NOT CHECKED.
  - The P06 PriceLabs raw is from 6 Nov 08:40Z. Whether PriceLabs has registered the 18–22 Nov booking: NOT CHECKED (the raw still shows those nights open).
  - The 18–22 Nov comparison rests on **one** comp for the exact stay; the adjacent stays (n = 4–5) are used instead.
- **P08:** whether the five absent comps are inactive: NOT CHECKED. No comp is available on its only sellable night.
- **Comp samples are thin:** P05 n = 3–4, P06 n = 3–6 on open stays, P08 n = 0–2, and P14 / P17 some stays n = 1.
- **Percentiles are biased low:** P11 and P14 use the room price against cleaning-inclusive comps.
- **No PriceLabs comp set or Market Dashboard data was pulled today:** `market.csv` belongs to the market agent. The P06 Nearby Listings p25/p50 cited come from its 2 Nov pull.
