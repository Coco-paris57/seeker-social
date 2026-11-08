# Competitor positioning: CENTRAL/NORTH (D = 2026-11-08)

**Method**
- **Comp ids:** the same 55 comp ids as 1–7 Nov (`data/snapshots/2026-11-07/comps.csv`, comp-central rows). **No replacements.**
  - Comps that appeared on none of today's stays: P06 917140285217729256 (2nd day). P08 693487869095756237, 1289147258305624118, 1409413462916896898, 1497137911142581794 (7th day). P14 1459390808864489268, 1075245497252121738. P17 975294297333089697, 774061637963678253. Whether any is inactive: NOT CHECKED. P08 has nothing left to sell before its 13 Nov handback, so replacing its comps would change no decision.
- **Searches:** 60 public Airbnb searches (airbnb.co.uk, all result pages, 0 parse failures, no bot challenge), checked 2026-11-08 07:20–07:24Z. Same map boxes and filters as 25 Oct–7 Nov: entire home, minimum bedrooms = ours, adults = our sleeps − 1.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c08s/search.py`. Raw results: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c08/search/*.json`
- **Same stays for every comp and for us:** Tue 10–Thu 12 Nov (midweek), Fri 13–Sun 15 Nov (next Friday–Sunday), **Tue 8–Thu 10 Dec (30 days out, new today)**. Also kept for the day-on-day comparison: 24–26 Nov, 27–29 Nov, 4–6 Dec and 7–9 Dec.
- **Extra stays:**
  - P06: 8–10, 8–11 and 9–11 Nov; 15–17, 15–18 and 16–18 Nov.
  - P11: 10–13, 18–20 and 22–26 Nov; 29 Nov–5 Dec; 8–11, 11–14 and 12–14 Dec; darts 13–17 Dec; 15–19 and 23–26 Dec.
  - P05: 9–10 Nov (tomorrow), 16–18 Nov, 29 Nov–3 Dec, 13–16, 17–20, 20–22 and 29–30 Dec.
  - P08: only 10–12 and 13–15 Nov (both booked, reference only).
- **Our prices:** live **Smoobu GET `/api/rates`**, 8 Nov 07:19:48Z (`/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c08/smoobu_rates08.json`). It equals `prices.csv` (PriceLabs 8 Nov raw) on every night 9 Nov–7 Jan for P05, P06, P08, P11 and P14. Booked or open status comes from Smoobu `reservations.csv` (8 Nov). **None of these five flats has a new or cancelled booking since 7 Nov** (full-row diff).
- **Price basis:**
  - **Comps:** the Airbnb total shown ÷ nights. Excludes taxes, includes cleaning, after any offer.
  - **P05 and P06:** our own Airbnb listing as seen in the same search (13 stays; rows added to `channel_checks.csv`). Where our listing did not appear, the price is derived from the factors seen today:
    - **P06:** stays checking in from 9 Nov are exactly **0.765 × Smoobu + £129 cleaning** (9–11, 10–12, 16–18 Nov). The two stays checking in **today** (8–10 and 8–11 Nov) are exactly **0.850 ×**. One Airbnb discount layer drops on same-day arrival, matching the 0.85 same-day factor in today's brief.
    - **P05:** 0.765 × at 8–25 days out, 0.900 × at 29–51 days out (7–9 Dec now reads 0.900).
  - **P11** (Booking.com only), **P08** and **P14:** Smoobu room rate. P08's comparable price is derived (0.765 × Smoobu + £149 ÷ nights). P11 and P14 room rates exclude cleaning while comps include it, so their percentiles are biased low. P11 is also shown at the Booking.com list price (Smoobu × 1.15, before promotions).
- **Booking.com: NOT CHECKED** (bot check; not retried, not bypassed).
- **Positioning:** `rm/positioning.py` `quality_premium` + `recommend`.
  - Occupancy comes from `reports/2026-11-08/kpi_pack.json`, except **P06 30d = 0.50 from Smoobu**: 7 booked of 14 non-blocked nights, 8 Nov–7 Dec. kpi_pack's `forward_occ_30_ex_blocks` 0.538 is not used.
  - Percentile = mean over open multi-night stays. **14d** = check-in up to 22 Nov, **30d** = up to 8 Dec, **60d** = all.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c08s/analyse08.py`. Output: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c08/analysis.json`
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` (listing, 7–8 Nov) returned **25 entries, all by Reyhan, 7 Nov 12:27–12:33Z**. The ones in this batch: P11 10 Nov–18 Dec −5% → **−2%**. P05 29 Nov–2 Dec −5% → **−2%** and 13–19 Dec −7% → **−2%**. P08 7 Nov **+25% → +35% → +55% → +100%, min 1**.
  - `get_listing_date_overrides` confirms these for P05 (29 Nov–2 Dec, 13–19 Dec) and P11 (10–18 Dec). P06 is unchanged: −5% on 8–14 Nov (updated 4 Nov 01:28Z), and min 2 only on 15–22 Nov.
  - `get_customizations` P11: occupancy-based adjustment, "Aggressive" profile.
- **Commission:** channel's finding stands. Not re-raised here.

## Summary

| Ref | Comps priced per stay | Our pct, open stays: 14d / 30d / 60d | Rating, ours vs comp median; review gap | Booked vs market (30d) | Supported positioning |
|---|---|---|---|---|---|
| **P05 4BR** | 6 (0–4) | **P25 / P25 / P26** | Airbnb 4.77 (35) vs 4.26 (22.5); +12.5 | 72.4% vs 43% | `quality_premium` **+0.15**, so **+15% vs median is supported**. `recommend` 30d / 60d: **raise +25%**. December is 32–39% under the medians. n = 3–4, and three comps rated under 4.3 inflate qp. |
| **P06 2BR** | 12 (2–5 on open stays) | **P5 / P5 / P5** | 4.58 (12) vs 4.67 (25.5); −13.5 | **50.0%** ex-blocks (Smoobu) vs 49% | qp −0.036, so **−4% vs median is supported**. `recommend` 30d: **raise +5%**. Today's 8–10 Nov arrival is P33 / −6%, inside the supported line. Every other open stay is P0, −12% to −32%. |
| **P08 2BR** | 1–2 | n/a: **nothing left to sell** | 4.50 (4) vs 4.87 (29); −25 | 100% vs 51% | qp −0.148, so −15% is supported. Moot: 8–13 Nov is booked up to the handback. |
| **P11 2BR** | 12 (3–9) | **P12 / P10 / P7** at room price | Booking.com 8.0/10 (policy). Not comparable with the Airbnb median 4.67 (35.5) | 44.8% vs 48% (60d 42.4% vs 39%) | qp 0, so **at the median (0%) is supported**. `recommend` 30d / 60d: **raise +5%**. We sit 21–47% under the median at room price, and 9–39% under at list price. |
| P14 1BR | 12 (1–7) | P100 | Not seen on Airbnb; comp median 4.88 (19.5) | 0% vs 46% | Special setup (policy): numbers only. +42% to +117% vs median. |
| P17 1BR | 7 (0–4) | n/a | Comp median 4.54 (51) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (same comp, same stay, 7 Nov → 8 Nov)**
- **Comps were mostly flat:** 152 of 198 comparable comp-stays did not move.
- **Comps that cut prices:**
  - **P11** 1542960049319560709 cut 10–12 and 10–13 Nov by 11% and 13–15 Nov by 8%. 1263490105174331990 (0.08 km) cut 10–12 Nov to £173.50 (−5%).
  - **P06** 1018722159796386217 (4.87) cut 8–11 Nov by 4–5% and 24–26 Nov by 8%. 673753763892997438 cut 27–29 Nov by 9% and 4–6 Dec by 7%, but raised 7–9 Dec by 16%.
  - **P05** 1639043256346803626 cut 10–12 and 16–18 Nov by 6% (to £320) and raised 7–9 Dec by 12%.
- **Sold since yesterday (demand signal):**
  - **P06, 8–11 Nov:** 744585770789956203, 854346637654279747 and 1273781636585601427 are gone from 8–10 and 9–11 Nov, leaving 2–3 comps. On 16–18 Nov, 673753763892997438 and 1018722159796386217 are gone.
  - **P11:** 1542815721953379556 sold 24–26 Nov and 15–19 Dec. 1542960049319560709 sold 18–20 Nov. 1480693526878012391 sold 8–11 and 15–19 Dec.
  - **P14:** three comps are gone from 24–26 Nov.
- **Back on sale:**
  - **P11:** 1480693526878012391 (4.46) is back for 10–12 Nov at £212.50. 1543632408013225027 is back for 18–20 Nov, 24–26 Nov and 29 Nov–5 Dec. 1675590787835266115 is back for 15–19 Dec at £480.50.
  - **P06:** 1273781636585601427 (16–18 Nov) and 673753763892997438 (15–18 Nov) are back.
- **Ours, 7 Nov → 8 Nov:**
  - **P06 rose about 10–12% on every open night**: 8–11 Nov £200/£200/£204/£212 → £219/£223/£228/£236, and 15–17 Nov £237/£237/£244 → **£265/£264/£270**.
    - Source: PriceLabs refresh 7 Nov 08:20:49Z (`raw/prices_3288517.json`, `uncustomized_price` 15 Nov 243 → 258). There is no override change and no log entry, so this is the PriceLabs model.
  - **P11 fell 2–8% on most open nights despite the −5% → −2% override change**, because PriceLabs' uncustomized price fell (10 Nov 208 → 189; 18 Nov 241 → 225). 22–25 Nov rose 3–5%.
  - **P05 29 Nov–2 Dec +3%, 13–19 Dec +5%** (Reyhan's −2%).

## P06 Marylebone 2-bed (3288517): 8–11 Nov and 15–17 Nov (intentional blocks excluded)

**8–11 Nov** (Smoobu £219 / £223 / £228 / £236, min 2; 12–14 Nov booked)

| Stay | Ours, Airbnb all-in/night | Comp median (n) | Pct / vs median | Supported (−4%) |
|---|---|---|---|---|
| 8–10 Nov (arrives today) | **£252.35 observed** (0.850×) | £269.50 (3) | P33 / −6% | about £259 |
| 8–11 Nov | **£232.83 observed** (0.850×) | £266.00 (2) | P0 / −12% | about £256 |
| 9–11 Nov | **£237.01 observed** (0.765×) | £283.00 (3) | P0 / −16% | about £273 |
| 10–12 Nov (11 Nov open, 12 Nov booked) | **£241.98 observed** | £290.00 (3) | P0 / −17% | about £280 |

- **Comps:** the cheapest comp is 1452940332365117153 (4.07) at £233. Three of the six comps open yesterday for 8–11 Nov have sold.
- **Reyhan's −5% on 8–14 Nov is unchanged** (updated 4 Nov 01:28Z). It conflicts with `recommend` +5%. **Corentin to confirm; not a new proposal.**
  - Without the −5%, 9–11 Nov would be about £235/£240 room, still P0.
- **Tonight (8 Nov):** at 0.850× we already sit inside the supported line. **Hold.**

**15–17 Nov** (Smoobu **£265 / £264 / £270**, min 2; open; 18–21 Nov booked; intentional block from 22 Nov)

| Stay | Ours, Airbnb all-in/night | Comp median (n) | Pct / vs median |
|---|---|---|---|
| 15–18 Nov (3n) | £246.74 (derived 0.765×; the third night is booked, so this stay is not sellable) | £357.33 (5) | P0 / −31% |
| 15–17 Nov (2n) | £266.84 (derived 0.765×) | £393.91 (4) | P0 / −32% |
| 16–18 Nov (2n) | **£268.76 observed** | £371.30 (4) | P0 / −28% |

- **The prices are now exactly the pre-refresh £265 / £264 / £270** that t-p06-1521open asked to restore. The PriceLabs model got there itself at the 7 Nov 08:20:49Z refresh (no DSO).
  - **The price half of t-p06-1521open is therefore moot.** Whether opening 15–21 Nov against the intentional block was meant stays **with Corentin to confirm**.
- **Positioning:**
  - `quality_premium(4.58, 4.67)` = −0.036, so **−4% vs median is supported**: about £380/night all-in on 15–17 Nov.
  - `recommend(0.50, 0.49, 0.05, −0.036)` → **raise +5%** (30d). The 60d `fix-listing` output is an artefact: 60d occupancy counts the intentional blocks (policy).
- **Minimum consistent step:** +5% on 15–17 Nov is about £278 / £277 / £284 room, about £277 all-in/night. That is still P0 (−30%). Exposure on 15–17 Nov is £799 room at Smoobu rates.
- **Differentiators:** P06 is on the 2nd floor with no lift. Of the 12 comps, 5 have a lift and 2 are Superhosts.

## P08 Islington 2-bed (3318167): handback 13 Nov — nothing left to sell

- **7 Nov lapsed unsold.** Reyhan opened it at **12:31Z 7 Nov with min 1**, but stacked four overrides (+25%, +35%, +55%, then **+100%**). Smoobu ended at **£417, min 1** (live Smoobu GET `/api/rates` for 7 Nov).
  - a-handback-lastnights had proposed £225. The night stayed open at 1.85× that; `reservations.csv` (8 Nov) has no P08 stay that night.
  - Yesterday's 7–8 Nov search found **zero** bookable comps, so whether £225 would have sold is unknown.
  - **a-handback-lastnights: CLOSED.** Min 1 was applied, at a higher price than proposed, and the night lapsed.
- **8–13 Nov is fully booked** (Airbnb, booked 17 Oct, departs 14 Nov; room £776.46). 13 Nov is the policy last night. **No open night remains before the handback.** No proposal.
- Comp reference for the booked 10–12 Nov stay: median £276.50 (n = 2). 1275323094602434212 cut its price 12% to £145.

## P11 Camden (3064196): next 14 days, darts, December (Smoobu room; Booking.com list × 1.15)

| Stay (open) | Ours room (Smoobu) | Comp median (n) | Pct / vs median | List × 1.15 |
|---|---|---|---|---|
| 10–12 Nov | £191.00 (was £197) | £264.50 (6) | P17 / −28% | £220: P33 / −17% |
| 10–13 Nov | £194.33 | £245.50 (6) | P17 / −21% | £223: P17 / −9% |
| **18–20 Nov** | **£169.00** (£158 / £180) | £294.50 (7) | **P0 / −43%** | £194: P14 / −34% |
| 22–26 Nov | £222.00 | £281.25 (7) | P14 / −21% | £255: P29 / −9% |
| 24–26 Nov | £224.00 | £294.50 (7) | P29 / −24% | £258: P29 / −13% |
| 29 Nov–5 Dec | £239.00 | £400.92 (4) | P0 / −40% | £275: P0 / −31% |
| 8–10 Dec (new, 30 days out) | £237.50 | £374.50 (7) | P0 / −37% | £273: P14 / −27% |
| 8–11 Dec | £244.00 | £416.67 (7) | P0 / −41% | £281: P0 / −33% |
| 11–14 Dec | £285.67 | £432.50 (8) | P0 / −34% | £329: P12 / −24% |
| 12–14 Dec | £270.00 | £457.50 (8) | P0 / −41% | £311: P12 / −32% |
| **13–17 Dec (darts)** | **£210.50** | **£394.00 (9)** | **P11 / −47%** | £242: P22 / −39% |
| 15–19 Dec | £236.00 | £413.38 (6) | P0 / −43% | £271: P17 / −34% |
| 23–26 Dec | £274.33 (was £300) | £388.84 (6) | P0 / −29% | £315: P33 / −19% |

- **Next 14 days:**
  - 18–20 Nov is the deepest gap. PriceLabs is at **£158 against an uncustomized £225** on 18 Nov (8 Nov raw).
  - P11's occupancy-based adjustment is on the "Aggressive" profile: −15% to −30% within 15 days at 10–50% occupancy (`get_customizations`). Together with the −2% DSO, that explains most of the gap. The remainder: NOT CHECKED.
  - The cheapest comp on 18–20 Nov is 1263490105174331990 at £191.
- **Darts 13–17 Dec:**
  - Smoobu now shows £221 / £201 / £205 / £215, plus £236 on 17 Dec: **£1,078 for 13–17 Dec, average £215.60** (was £1,098).
  - Reyhan changed −5% → **−2%** on 10 Nov–18 Dec (7 Nov 12:29Z). PriceLabs' uncustomized price fell at the same refresh, so the net price still went down.
  - This remains a **conflict for Corentin to confirm, not a new proposal**: policy `darts_override_24oct` says +5%, and the 21 Oct intent was "average above £300".
  - Only 1090528454481682946 (4.72, 87 reviews, £197.75) and 1263490105174331990 (4.44, £235) are cheaper.
- **Positioning:**
  - qp 0 (no Airbnb rating).
  - `recommend(0.448, 0.48, 0.10, 0)` → **raise +5%** (30d). `recommend(0.424, 0.39, 0.07, 0)` → **raise +5%** (60d).
  - **Supported: at the comp median (0%).** Going from −2% to +5% (about +7%) still leaves every open stay at P0–P29.
  - Visibility (policy: CTR 0.81% vs 1.70%) remains the larger lever.
- **Differentiators:** P11 is a basement flat with a patio. Of the 12 comps, 4 have a lift and 3 have a terrace or balcony.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214): 9 Nov (tomorrow) and December

| Stay (open) | Ours on Airbnb, all-in (observed) | Comp median (n) | P75 | Pct / vs median | Smoobu room |
|---|---|---|---|---|---|
| **9–10 Nov (1n, tomorrow)** | **£448.44** (£511.80 − "Special offer" £63.36) | £320 (1) | £320 | P100 / +40% | **£1,378** (+300% DSO, min 1) |
| 16–18 Nov | £386.67 | £413.25 (4) | £438.62 | P25 / −6% | £378.00 |
| 29 Nov–3 Dec | £447.31 | £738.63 (4) | £933.94 | P25 / −39% | £521.00 (was £504.75; DSO now −2%) |
| 7–9 Dec | £510.15 | £825.00 (4) | £1,020 | P25 / −38% | £458.50 (7–8 Dec £466 / £451) |
| 8–10 Dec (8 Dec open, 9 Dec booked) | £545.25 (derived 0.900×) | £1,020 (3) | £1,020 | P0 / −47% | £497.50 |
| 13–16 Dec | £579.50 | £951.17 (4) | £980 | P25 / −39% | £571.67 (was £542.67; DSO now −2%) |
| 17–20 Dec | £633.50 | £980.00 (4) | £1,005.83 | P25 / −35% | £631.67 (was £598.33) |
| 20–22 Dec | £691.95 | £1,020 (3) | £1,045 | P33 / −32% | £660.50 |
| 29–30 Dec (1n, min 1) | £1,406.40 | no comp available | n/a | n/a | £1,346 (+100% DSO) |

- **a-p05-9nov: NOT FIXED (ninth check; the night is tomorrow).**
  - Smoobu 9 Nov is £1,378, min 1. The +300% DSO is unchanged (updated 30 Oct 22:09Z).
  - Airbnb 9–10 Nov still shows "1 night x £511.80", "Special offer −£63.36", total £448.44. That is £253.44 room after the £195 cleaning. The offer line is unexplained under policy (manual Airbnb promotions removed 21 Oct).
  - The only comp open that night is 1617681646241740026 (4.28) at £320. Even the Airbnb price is P100 / +40% against it.
  - Price support: `quality_premium` +15% on the £320 gives about £368 all-in.
- **a-p05-dec: partly moved, by Reyhan, not to the proposal.**
  - 13–21 Dec: Smoobu £5,288 → **£5,507** (+£219), from Reyhan's −7% → −2% on 13–19 Dec. Against the ~£5,837 P75 target, **£330 is left**.
  - 7–8 Dec: unchanged at **£917** (£466 + £451; +3% DSO) against ~£1,181.
  - Reyhan's −2% (13–19 Dec, 29 Nov–2 Dec) is still a cut against `recommend` +25%. **Corentin to confirm.**
- **Positioning:**
  - `quality_premium(4.77, 4.26)` = +0.15 (cap).
  - `recommend(0.724, 0.43, 0.25, 0.15)` → **raise +25%** (30d). `recommend(0.627, 0.40, 0.26, 0.15)` → **raise +25%** (60d).
  - Even +25% leaves every December stay 15–24% under the medians. Supported positioning is +15% vs median.
  - Caveat: n = 3–4 per stay. 1610095240357069208 (4.17) and 1606112160333193293 (4.24) ask £1,020 and set the top of the range.
- **Only one comp is under us on every December stay:** 1363636555926649515 (3.92, 1.23 km).
- **Differentiators:**
  - 912053248917940403: Superhost, lift, park view, 4.97.
  - 1639043256346803626: Superhost house with terrace.
  - Three comps list parking.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

- **Smoobu:** £500 (December peaks £514–£604, Christmas week £720–£778), min stay 3–4. Booked 0% vs market 46% at 30d.
- **Comp medians:**

| Stay | Comp median (n) |
|---|---|
| 10–12 Nov | £230.50 (5) |
| 13–15 Nov | £252.50 (1) |
| 24–26 Nov | £240 (4) |
| 27–29 Nov | £351.50 (2) |
| 4–6 Dec | £302.50 (1) |
| 7–9 Dec | £277.50 (7) |
| 8–10 Dec | £302.50 (5) |

- That puts us at P100, **+42% to +117%** vs the median.
- No proposal, per policy.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS

- **Comp medians:**

| Stay | Comp median (n) |
|---|---|
| 10–12 Nov | £227.25 (2) |
| 13–15 Nov | £251.25 (2) |
| 24–26 Nov | £232.50 (4) |
| 27–29 Nov | n/a (0) |
| 4–6 Dec | £326.50 (2) |
| 7–9 Dec | £232.50 (2) |
| 8–10 Dec | £223.50 (2) |

- Comp rating median 4.54 (51). Reference set only.

## Comp tables

**Source for every comp row:** Airbnb public search, checked 2026-11-08 07:20–07:24Z.
- Nightly price excludes taxes and includes cleaning.
- (±%) is the change vs 7 Nov for the same stay.
- "n/a" means the listing was not returned by the date-filtered search (booked, or a minimum-stay clash).
- The "Ours" rows use the live Smoobu rate.

Rows appended under `flock`: **589 comp rows** to `data/snapshots/2026-11-08/comps.csv` and **13 own-listing rows** to `data/snapshots/2026-11-08/channel_checks.csv`. Both files had already been copied forward by another agent.

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Mon 9 Nov–Tue 10 Nov (1n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Sun 13 Dec–Wed 16 Dec (3n) | Thu 17 Dec–Sun 20 Dec (3n) | Sun 20 Dec–Tue 22 Dec (2n) | Tue 29 Dec–Wed 30 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.17 (12) | £419 | £419 | £509 | £920 | £1020 | £1020 | £1020 | n/a | £419 | £960 | £980 | £980 | £1020 | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | n/a | £519 | £476 | n/a | £1020 | £1020 | £1020 | n/a | £498 | £552 | £980 | £980 | £1070 | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (29) | £720 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £925 (-1%) | £922 (+1%) | £1083 | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.28 (46) | n/a | n/a | £328 | n/a | n/a | £322 | n/a | £320 | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.92 (13) | n/a | n/a | £488 (+1%) | n/a | n/a | n/a | n/a | n/a | £408 (-3%) | £435 (+3%) | £453 (-1%) | £529 (-2%) | £630 (-1%) | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (28) | £320 (-6%) | n/a | n/a | n/a | n/a | £630 (+12%) | £560 | n/a | £320 (-6%) | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.26 (22.5) | £419 (3) | £469 (2) | £482 (4) | £920 (1) | £1020 (2) | £825 (4) | £1020 (3) | £320 (1) | £413 (4) | £739 (4) | £951 (4) | £980 (4) | £1020 (3) | n/a (0) | |
| **Ours, Smoobu live rate/night 8 Nov 07:19Z (status, min stay)** | | | | £431 Booked (Smoobu), min 3 | £492 Booked (Smoobu), min 4 | £560 Booked (Smoobu), min 3 | £586 Booked (Smoobu), min 4 | £570 Booked (Smoobu), min 4 | £458 Open, min 2 | £498 Booked (Smoobu)/Open, min 2/3 | £1378 Open, min 1 | £378 Open, min 2 | £521 Open, min 3 | £572 Open, min 3 | £632 Open, min 3 | £660 Open, min 2 | £1346 Open, min 1 | |
| **Ours, comparable basis** | | | | £427 | £474 | £526 | £546 | £534 | £510 obs | £545 | £449 obs | £387 obs | £448 obs | £580 obs | £634 obs | £692 obs | £1407 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P67 / +2% | P50 / +1% | P100 / +9% | P0 / -41% | P0 / -48% | P25 / -38% | P0 / -46% | P100 / +40% | P25 / -6% | P25 / -39% | P25 / -39% | P25 / -35% | P33 / -32% | n/a | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Sun 8 Nov–Tue 10 Nov (2n) | Sun 8 Nov–Wed 11 Nov (3n) | Mon 9 Nov–Wed 11 Nov (2n) | Sun 15 Nov–Wed 18 Nov (3n) | Sun 15 Nov–Tue 17 Nov (2n) | Mon 16 Nov–Wed 18 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.91 (11) | n/a | n/a | n/a | n/a | n/a | n/a (was £420) | £420 | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.7 (23) | £275 | n/a | £296 | n/a | n/a | n/a | n/a | n/a (was £275) | n/a | n/a (was £275) | £280 | £280 | £280 | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | n/a | £348 | n/a | n/a | £358 | £358 | n/a (was £308) | n/a | n/a (was £308) | n/a | n/a | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | £300 | n/a | n/a (was £392) | n/a | n/a | n/a | £398 | n/a | n/a | £310 | n/a | n/a | £328 | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.38 (24) | £290 | n/a | £397 | n/a | n/a | n/a | n/a | £278 | £261 | £283 | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (53) | n/a | £498 | n/a (was £894) | n/a (was £1083) | £1351 (+1%) | £902 (+1%) | £902 | n/a (was £488) | n/a (was £455) | n/a (was £498) | £462 | £498 | £498 | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £389 (-1%) | £408 (-2%) | £415 | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.55 (22) | n/a | n/a | £428 | £464 (+1%) | £480 (+1%) | £436 | £435 | n/a | n/a | n/a | £308 (-3%) | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | £556 (-9%) | £716 (-7%) | £704 (+16%) | £748 | n/a | n/a | n/a | £357 | £380 (-3%) | n/a (was £412) | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £233 (-2%) | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.87 (87) | n/a | n/a | £474 (-8%) | n/a (was £598) | n/a | n/a | n/a | £270 (-5%) | £271 (-4%) | £278 (-4%) | n/a | n/a | n/a (was £357) | parking listed |
| **Comp median (n)** | | | 4.67 (25.5) | £290 (3) | £498 (1) | £397 (5) | £510 (2) | £716 (3) | £570 (4) | £428 (6) | £270 (3) | £266 (2) | £283 (3) | £357 (5) | £394 (4) | £371 (4) | |
| **Ours, Smoobu live rate/night 8 Nov 07:19Z (status, min stay)** | | | | £232 Open, min 2 | £294 Booked (Smoobu), min 2 | £418 Blocked, min 3 | £461 Blocked, min 4 | £494 Blocked, min 4 | £430 Blocked, min 3 | £430 Blocked, min 3 | £221 Open, min 2 | £223 Open, min 2 | £226 Open, min 2 | £266 Open, min 2 | £264 Open, min 2 | £267 Open, min 2 | |
| **Ours, comparable basis** | | | | £242 obs | £289 | £384 | £417 | £442 | £393 | £393 | £252 obs | £233 obs | £238 obs | £247 | £267 | £269 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P0 / -17% | P0 / -42% | excluded | excluded | excluded | excluded | excluded | P33 / -6% | P0 / -12% | P0 / -16% | P0 / -31% | P0 / -32% | P0 / -28% | |

### P08

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | £408 | £408 | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | £145 (-12%) | n/a | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (66) | n/a | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) | 1.22 | 4 | 4.6 (77) | n/a | n/a | none listed |
| [1497137911142581794](https://www.airbnb.co.uk/rooms/1497137911142581794) | 0.8 | 4 | 4.91 (23) | n/a | n/a | Superhost, house (2-bedroom cottage) |
| **Comp median (n)** | | | 4.87 (29.0) | £276 (2) | £408 (1) | |
| **Ours, Smoobu live rate/night 8 Nov 07:19Z (status, min stay)** | | | | £209 Booked (Smoobu), min 2 | £250 Blocked/Booked (Smoobu), min 2 | |
| **Ours, comparable basis** | | | | £234 | £265 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P50 / -15% | excluded | |

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Tue 10 Nov–Fri 13 Nov (3n) | Wed 18 Nov–Fri 20 Nov (2n) | Sun 22 Nov–Thu 26 Nov (4n) | Sun 29 Nov–Sat 5 Dec (6n) | Tue 8 Dec–Fri 11 Dec (3n) | Fri 11 Dec–Mon 14 Dec (3n) | Sat 12 Dec–Mon 14 Dec (2n) | Sun 13 Dec–Thu 17 Dec (4n) | Tue 15 Dec–Sat 19 Dec (4n) | Wed 23 Dec–Sat 26 Dec (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.7 (30) | £298 (-3%) | £320 | n/a (was £440) | £440 | £440 | £440 | n/a | £281 (-2%) | £320 | £404 | £392 | £447 | £529 | £545 | £429 | n/a (was £456) | n/a | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a | £274 | n/a | n/a | £374 | £374 | n/a | n/a | £246 | n/a | £359 | £359 | £374 | £351 | £382 | £440 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | £272 (-4%) | £294 | £294 | £462 | £544 | £463 | n/a | £256 (-3%) | £294 | n/a | £410 | £444 | £494 | £510 | £394 | £420 | n/a | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | £268 | n/a | n/a | n/a | n/a | £438 | £438 | £247 | n/a | £306 | £362 | £417 | £417 | £438 | £406 | £406 | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.5 (12) | £262 (-11%) | £282 (-8%) | £306 | £615 | £544 | £463 | £454 | £244 (-11%) | n/a (was £306) | £270 | £410 | £444 | £494 | £510 | £394 | £420 | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | n/a | £328 | £358 | n/a | £478 | n/a (was £388) | £388 | n/a | £328 | £306 | n/a | £393 | £448 | £478 | £456 | £480 | £513 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | £212 | £312 | £312 | n/a | n/a | £312 | £312 | £225 | £312 | £281 | n/a | n/a (was £292) | £292 | £312 | £281 | n/a (was £281) | £292 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.44 (61) | £174 (-5%) | n/a | £191 | n/a | n/a | n/a | £241 | £175 (-3%) | £191 | £185 | n/a | n/a | n/a | n/a | £235 | £270 | £307 | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (87) | n/a | n/a | £184 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £198 | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.68 (73) | n/a | n/a | n/a | n/a | n/a | £242 (+9%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.54 (37) | n/a | n/a | n/a | n/a | n/a | n/a | £296 | n/a | £278 (+2%) | n/a | n/a | £300 | £338 (-1%) | n/a | n/a | n/a | £361 | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £214 | n/a | n/a | n/a | n/a | £280 | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (35.5) | £264 (6) | £312 (5) | £294 (7) | £462 (3) | £511 (4) | £438 (7) | £374 (7) | £246 (6) | £294 (7) | £281 (7) | £401 (4) | £417 (7) | £432 (8) | £458 (8) | £394 (9) | £413 (6) | £389 (6) | |
| **Ours, Smoobu live rate/night 8 Nov 07:19Z (status, min stay)** | | | | £191 Open, min 2 | £259 Booked (Smoobu)/Open, min 2 | £224 Open, min 2 | £293 Booked (Smoobu), min 2 | £302 Booked (Smoobu)/Open, min 2 | £238 Booked (Smoobu)/Open, min 2 | £238 Open, min 2 | £194 Open, min 2 | £169 Open, min 2 | £222 Open, min 2 | £239 Open, min 2 | £244 Open, min 2 | £286 Open, min 2 | £270 Open, min 2 | £210 Open, min 2 | £236 Open, min 2 | £274 Open, min 2 | |
| **Ours, comparable basis** | | | | £191 | £259 | £224 | £293 | £302 | £238 | £238 | £194 | £169 | £222 | £239 | £244 | £286 | £270 | £210 | £236 | £274 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = Smoobu x 1.15 (before promotions)** | | | | £220 P33 / -17% | £298 P40 / -5% | £258 P29 / -12% | £337 P0 / -27% | £347 P0 / -32% | £274 P14 / -37% | £273 P14 / -27% | £223 P17 / -9% | £194 P14 / -34% | £255 P29 / -9% | £275 P0 / -31% | £281 P0 / -33% | £329 P12 / -24% | £310 P12 / -32% | £242 P22 / -39% | £271 P17 / -34% | £315 P33 / -19% | Smoobu Booking.com markup +15% (policy) |
| **Our percentile / vs median** | | | | P17 / -28% | P0 / -17% | P29 / -24% | P0 / -36% | P0 / -41% | P0 / -46% | P0 / -37% | P17 / -21% | P0 / -43% | P14 / -21% | P0 / -40% | P0 / -41% | P0 / -34% | P0 / -41% | P11 / -47% | P0 / -43% | P0 / -29% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | n/a | £202 | n/a | £302 | £302 | £302 | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | £352 | £428 | n/a | £352 | n/a | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | £236 | n/a | n/a | n/a | n/a | £246 | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | £192 | £252 | n/a (was £302) | n/a | n/a | £302 | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | £192 | n/a | £278 | n/a | n/a | £278 | £278 | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | n/a | n/a | n/a (was £290) | n/a (was £290) | n/a | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | n/a | n/a (was £402) | n/a | n/a | n/a (was £402) | £402 | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (20) | n/a | n/a | n/a | £276 (+1%) | n/a | £258 (-1%) | n/a | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (17) | n/a | n/a | £200 | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | £264 | n/a | n/a | n/a | n/a | £241 | £241 | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.83 (12) | £230 (-4%) | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.88 (19.5) | £230 (5) | £252 (1) | £240 (4) | £352 (2) | £302 (1) | £278 (7) | £302 (5) | |
| **Ours, Smoobu live rate/night 8 Nov 07:19Z (status, min stay)** | | | | £500 Open, min 3 | £500 Open, min 4 | £500 Open, min 3 | £500 Open, min 4 | £500 Open, min 4 | £500 Open, min 3 | £507 Open, min 3 | |
| **Ours, comparable basis** | | | | £500 | £500 | £500 | £500 | £500 | £500 | £507 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +117% | P100 / +98% | P100 / +108% | P100 / +42% | P100 / +65% | P100 / +80% | P100 / +68% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | £190 | £186 | £192 | n/a | n/a | £192 | £192 | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (51) | £264 | n/a | £314 | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | n/a | n/a | £330 (-3%) | £273 (+1%) | £255 | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | £316 | £273 | n/a | £323 | n/a | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.67 (60) | n/a | n/a | £188 (-2%) | n/a | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [774061637963678253](https://www.airbnb.co.uk/rooms/774061637963678253) | 0.54 | 3 | 4.5 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed |
| **Comp median (n)** | | | 4.54 (51) | £227 (2) | £251 (2) | £232 (4) | n/a (0) | £326 (2) | £232 (2) | £224 (2) | |
| **Ours, Smoobu live rate/night 8 Nov 07:19Z (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | excluded | excluded | excluded | |
## Data gaps
- **Booking.com: NOT CHECKED** (bot check, not bypassed). This covers the P11 guest view, P05 and P06 Booking.com rates, and whether P11's NR rate shows.
- **P11 18 Nov £158 vs uncustomized £225:** the occupancy-based Aggressive profile and the −2% DSO explain most of it. The exact factor stack: NOT CHECKED.
- **P05 9 Nov Airbnb £511.80 + Special offer:** the Airbnb calendar or sync log was not opened (no Airbnb host access in this run). The cause: NOT CHECKED.
- **P08 7 Nov at +100%:** why four successive overrides were stacked is unknown. Whether any comp was bookable on 7 Nov after 07:25Z: NOT CHECKED.
- **Comps absent on every stay** (P06 1, P08 4, P14 2, P17 2): whether they are inactive: NOT CHECKED. No replacements were made.
- **Comp samples are thin:** P05 n = 1–4, P06 n = 2–5 on open stays, P08 n = 1–2, and P14 / P17 some stays n = 0–1. The P05 9 Nov comparison rests on one comp.
- **Percentiles are biased low:** P11 and P14 use the room price against cleaning-inclusive comps.
- **No PriceLabs comp set or Market Dashboard pull was made by this agent:** `market.csv` belongs to the market agent.
