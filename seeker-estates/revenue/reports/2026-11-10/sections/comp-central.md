# Competitor positioning: CENTRAL/NORTH (D = 2026-11-10)

**Method**
- **Comp ids:** the same 55 comp ids as 1–9 Nov (comp-central rows in `data/snapshots/2026-11-09/comps.csv`). **No replacements.**
  - Not returned on any of today's stays: P06 917140285217729256 and 1452940332365117153; P08 693487869095756237, 1289147258305624118, 1409413462916896898 and 1497137911142581794; P14 1075245497252121738; P17 975294297333089697 and 774061637963678253. Whether any is inactive: NOT CHECKED.
- **Searches:** 72 public Airbnb searches on airbnb.co.uk, checked 2026-11-10 07:27–07:39Z. Every result page was read, with 0 parse failures and no bot challenge. Same map boxes and filters as 25 Oct–9 Nov: entire home, minimum bedrooms = ours, adults = our sleeps − 1.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c10s/search.py`. Raw results: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c10/search/*.json`.
- **Same stays for every comp and for us:** Tue 10–Thu 12 Nov (midweek, arrives today), Fri 13–Sun 15 Nov (next Friday–Sunday), **Thu 10–Sat 12 Dec (30 days out, new)**, **Tue 17–Thu 19 Nov (next midweek, new)**. Kept for day-on-day: 24–26 Nov, 27–29 Nov, 4–6 Dec, 7–9 Dec, 8–10 Dec, 9–11 Dec.
- **Extra stays:**
  - P05: 16–18 Nov, 29 Nov–3 Dec, 13–15 Dec, **21–22 Dec**, **29–30 Dec**, plus 20–22 and 28–30 Dec (overlapping comps for the single nights).
  - P06: 11–12, 15–17, 15–18 and 16–18 Nov.
  - P11: 18–20 Nov, 22–26 Nov, 29 Nov–5 Dec, 8–11, 11–14, 12–14 Dec, **darts 13–17 Dec**, 15–19 Dec, 23–26 Dec.
- **Our prices:** live **Smoobu GET `/api/rates`** at 10 Nov 07:26:27Z (`/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c10/smoobu_rates10.json`). Booked or open status is from Smoobu `reservations.csv` (10 Nov). Full-row diff 9 → 10 Nov: **no new, changed or cancelled reservation for P05, P06, P08, P11 or P14**.
- **Price basis:**
  - **Comps:** Airbnb total ÷ nights. Excludes taxes, includes cleaning, after any offer.
  - **P05 and P06:** our own Airbnb listing as seen in the same search (10 stays; rows in `channel_checks.csv`). Where it was not returned, the price is derived: P06 0.765 × Smoobu + £129 cleaning per stay; P05 0.765 × at ≤28 days out and 0.900 × at 29–56 days out, + £195 cleaning per stay.
  - **Factors re-confirmed today:** P05 7–9 Dec (27–28 d) £919.45 = 0.765 × (475 + 472) + 195. 13–15 Dec (33 d) £1,113.90 = 0.900 × (520 + 501) + 195. 21 Dec £2,181.30 = 0.900 × 2,207 + 195. 29 Dec £2,764.50 = 0.900 × 2,855 + 195.
  - **P11** (Booking.com only) and **P14:** Smoobu room rate. It excludes cleaning while the comps include it, so their percentiles are biased low. P11 is also shown at Booking.com list (Smoobu × 1.15, before promotions).
- **Booking.com: NOT CHECKED.** Not attempted (bot check on earlier days; not bypassed).
- **Positioning:** `rm/positioning.py` `quality_premium` + `recommend`.
  - Occupancy from Smoobu `reservations.csv` (confirmed only), 10 Nov–9 Dec (30d) and 10 Nov–8 Jan (60d):
    - P05: 0.733 / 0.717.
    - P06: 0.583 excluding intentional blocks (7 booked of 12 non-blocked nights, 30d and 60d).
    - P11: 0.462 / 0.429 excluding the 10–13 Nov block (see P11). Including it: 0.400 / 0.400.
  - Market occupancy from `reports/2026-11-10/kpi_pack.json`. Market percentiles (Nearby Listings, not comps) from today's `market.csv`.
  - Percentile = mean over open multi-night stays (14d = check-in up to 24 Nov, 30d = up to 10 Dec). Script `.../c10s/analyse10.py`, output `.../c10/analysis.json`.
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` (listing, 9–10 Nov): 49 entries, all by Reyhan, on 9 Nov 14:06–14:10Z and 21:20–22:30Z. In this batch (times Z, 9 Nov):
    - **P05:** 14:07:58 13–14 Dec +5% min 2. 14:08:13 21 Dec +300% min 1. 14:08:30 29 Dec +300% min 1 (was +100%). **14:08:54 max 2,500 → 3,500.** 14:09:07 4–31 Jan −10% min 3. 14:09:13 Feb −8% min 4. 21:23:47 29 Nov–2 Dec −5% min 3.
    - **P06:** 21:24:50 9–17 Nov −8% min 2 (was −5%).
    - **P11:** 14:06:06 10–13 Nov min 2 with no price (the −5% removed). 14:06:15 23–25 Dec +5% min 2. 21:21:18 18–19 Nov min 2 with no price. 21:21:32 22 Nov–18 Dec −8% min 3, replaced at 21:21:47 by **−3% min 3**.
    - **P14:** **21:24:24 minimum price 500 → 450.**
    - Nothing on P08.
  - `get_listing_date_overrides` (P05, P11) confirms these values as current.
- **Commission:** the channel agent's finding stands. Not re-raised here.

## Summary

| Ref | Comps priced per stay | Our pct, open stays: 14d / 30d / 60d | Rating, ours vs comp median; review gap | Booked vs market (30d, Smoobu) | Supported positioning |
|---|---|---|---|---|---|
| **P05 4BR** | 6 (0–4) | **P0 / P17 / P19** | Airbnb 4.77 (35) vs 4.26 (22.5); +12.5 | 73.3% vs 43% | `quality_premium` **+0.15**, so **+15% vs median is supported**. `recommend` 30d and 60d: **raise +25%**. **Exception: 21 Dec (£2,207) and 29 Dec (£2,855) single nights sit far above every reference** (below). |
| **P06 2BR** | 12 (1–6 on open stays) | **P0 / P0 / P0** | 4.58 (12) vs 4.62 (26); −14 | **58.3%** ex-blocks vs 49% | qp −0.016, so **−2% vs median is supported**. `recommend` 30d: **raise +5%**. Every open stay is −7% to −30% vs median. |
| **P08 2BR** | 1 | n/a: **nothing left to sell** | 4.50 vs 4.87 (29) | 100% vs 51% | Moot: booked up to the 13 Nov handback. |
| **P11 2BR** | 12 (1–9) | **P13 / P5 / P4** at room price | Booking.com 8.0/10 (policy); not comparable with the Airbnb median 4.67 (36) | 46.2% vs 48% ex-block (40.0% incl.) | qp 0, so **at the median (0%) is supported**. `recommend` 30d and 60d: **raise +5%**. Including the unexplained 10–13 Nov block, 30d is `fix-listing` (borderline). We are 26–45% under the median at room price, and 15–36% under at list. |
| P14 1BR | 12 (0–8) | P100 | Not seen on Airbnb; comp median 4.88 (19.5) | 0% vs 46% | Special setup (policy): numbers only. **+28% to +95% vs median at the new £450 minimum.** |
| P17 1BR | 7 (0–3) | n/a | Comp median 4.54 (52) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (same comp, same stay, 9 Nov → 10 Nov)**
- **Most comps did not move.** Moves of 5% or more:
  - **P05:** 912053248917940403 (4.97 Superhost) cut 29 Nov–3 Dec by 26% to £688.25. 1639043256346803626 (4.89) cut 7–9 Dec by 7% to £595.
  - **P06:** 673753763892997438 (4.85) cut 15–18 Nov by 15% to £317.33.
  - **P11:** 1480693526878012391 cut Nov stays by 16–22% (13–15 Nov £242.50). 1159915905276842600 cut 29 Nov–5 Dec by 18%. 1543632408013225027 cut by 8–11%.
  - **P14:** 1405104068242896146 cut 10–12 Nov by 26% to £142.50.
- **Comps gone since yesterday (sold or min-stay; a demand signal):**
  - **P06:** 744585770789956203 (4.70 Superhost, £280) from 15–17 and 16–18 Nov. 1273781636585601427 from 15–17 Nov. **We stay unsold on 15–17 Nov while the cheapest.**
  - **P11:** 1543632408013225027 and 1542960049319560709 (both £394) from darts 13–17 Dec. 2557770 from 15–19 Dec. 1542815721953379556 and 1568808216094734994 from 18–20 Nov.
  - **P05:** 1639043256346803626 from 16–18 Nov.
- **Ours, 9 Nov → 10 Nov (Smoobu):**
  - **P05:** 13/14 Dec £579/£565 min 3 → **£520/£501 min 2**. 21 Dec £645 min 2 → **£2,207 min 1**. 29 Dec £1,332 → **£2,855**. 7/8 Dec £464/£449 → £475/£472. 29 Nov–2 Dec down 2–3%.
  - **P06:** 15–17 Nov £249/£249/£255 → £241/£238/£246 (Reyhan's −8%). 10/11 Nov £213/£224 → £218/£231.
  - **P11:** 18/19 Nov £143/£161 → £165/£191. Darts £203 → £206.25 average. Min stay 2 → 3 on 22 Nov–18 Dec.
  - **P14:** £500 → **£450** on most nights to 8 Dec.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

### The four December gaps (caller's list)

| Gap (stay) | Smoobu room/night (min stay) | Ours, Airbnb all-in/night | Comp median (n) | Pct / vs median | Market NL 4BR (10 Nov) | Sellable? |
|---|---|---|---|---|---|---|
| **7–8 Dec** (7–9 Dec) | £475 / £472 (min 2; +3% DSO) | **£459.73 observed** (0.765) | £807.50 (4) | **P25 / −43%** | P50 £572 / P75 £715 | Yes |
| **13–14 Dec** (13–15 Dec) | **£520 / £501 (min 2; +5% DSO since 9 Nov 14:07Z)** | **£556.95 observed** (0.900) | £850 (4) | **P25 / −34%** | as above | **Yes, now:** t-p05-dec-orphans 13–14 Dec **FIXED** |
| **21 Dec** (21–22 Dec, 1 night) | **£2,207 (min 1)**; PriceLabs user_price £2,177; uncustomized £732 | **£2,181.30 observed** (0.900 + £195) | **n = 0** (no kept comp bookable). Overlapping 20–22 Dec: kept comps £1,020 (3); all 4BR with ≥10 reviews £792.50 (5) | **P100 vs every reference**: +114% vs £1,020; +175% vs £792.50 | **+86% vs P90 £1,175** | Min stay fixed, but **the price blocks the sale** |
| **29 Dec** (29–30 Dec, 1 night) | **£2,855 (min 1)**; user_price £2,825; uncustomized £1,176 | **£2,764.50 observed** (0.900 + £195) | **n = 0** (no kept comp, and no ≥10-review 4BR, bookable 29–30 or 28–30 Dec) | n/a | **+135% vs P90 £1,175** | Bookable; no comp evidence supports the level |

**Why 21 Dec is £2,207 and 29 Dec £2,855: the DSOs, not an orphan premium.**
- Reyhan set **+300% min 1 on 21 Dec (9 Nov 14:08:13Z)** and **+300% on 29 Dec (14:08:30Z; was +100%)**. 21 Dec was £645 at +0% the day before, so the min-1 opening came with the +300%.
- Price ÷ uncustomized is 3.02× on 21 Dec and 2.43× on 29 Dec (`raw/prices_3166592.json`, refreshed 9 Nov 21:24:06Z). How PriceLabs applies a +300% DSO to give these exact figures: NOT CHECKED.
- **The new max (2,500 → 3,500, 14:08:54Z) does not affect 21 Dec**, because £2,207 is below the old max. On **29 Dec it does matter**: £2,855 is above the old £2,500 max, so the max rise is what lets the price reach that level. Whether a percentage DSO was capped by the old max: NOT CHECKED.
- **The 21 Dec price does block the orphan.** 21 Dec is a 1-night gap: 15–21 Dec departs on the 21st and 22–29 Dec arrives on the 22nd. It is a Monday that PriceLabs rates "Normal Demand".
  - The only 4-bed bookable on Airbnb for that single night at a normal price is 1694996617222055382 (4.88, 8 reviews, under the 10-review rule, so not a comp), at £500 all-in.
  - Two 0-review listings ask £2,132–£2,149. They are not comps.
- **Supported for 21 Dec:**
  - Comp median +15% (qp) is **about £911–£1,173 all-in**, using the ≥10-review overlapping median £792.50 or the kept-comp median £1,020.
  - On Airbnb that is **about £796–£1,087 Smoobu room** (all-in = 0.900 × room + £195). The current £2,207 is 2.0–2.8× that.
- **Supported for 29 Dec:** price position unknown. No qualifying comp is bookable, and NL P90 is £1,175. `recommend` gives a **hold-signal** only. £2,855 rests on no comp evidence.

**a-p05-9nov: CLOSED, lapsed unsold.** `reservations.csv` 10 Nov has no new P05 row, and 9 Nov has passed. No realised loss.

### Other open P05 stays
- **16–18 Nov:** £392.50 observed vs £419 (3), **P0 / −6%**. Supported (+15%) is about £482 all-in.
- **29 Nov–3 Dec:** £436.25 observed vs £620.13 (4), **P25 / −30%**.
  - Reyhan's **−5% on 29 Nov–2 Dec (9 Nov 21:23:47Z) runs against `recommend` +25%** while we sit at P25. Corentin to confirm.

**Positioning:**
- `quality_premium(4.77, 4.26)` = +0.15 (cap).
- `recommend(0.733, 0.43, 0.17, 0.15)` → **raise +25%** (30d). `recommend(0.717, 0.39, 0.19, 0.15)` → **raise +25%** (60d).
- **At +25%:**
  - 7–8 Dec ≈ £594 / £590 Smoobu → about £550 all-in, still P25 / −32%.
  - 13–14 Dec ≈ £650 / £626 → about £672 all-in, still P25 / −21%.
- **Caveat:** n = 2–4 per stay. Two comps rated 4.17/4.24 ask £1,020 on most December stays and set the top. Three of the six comps are rated under 4.3, which inflates qp.

**Differentiators:**
- 912053248917940403: Superhost, lift, park view, 4.97.
- 1639043256346803626: Superhost house with terrace.
- Three comps list parking.

## P06 Marylebone 2-bed (3288517): open nights only (intentional blocks excluded)

| Stay | Ours, Airbnb all-in/night (observed) | Comp median (n) | Pct / vs median | Supported (−2%) | Smoobu room |
|---|---|---|---|---|---|
| 10–12 Nov (arrives today) | £255.33 | £275.00 (3) | P0 / −7% | about £270 | £218 / £231 |
| 15–17 Nov | £248 | £336.50 (1) | P0 / −26% | about £330 | £241 / £238 |
| 15–18 Nov | £227.88 | £298.67 (4) | P0 / −24% | about £293 | £241 / £238 / £246 |
| 16–18 Nov | £250 | £355.25 (4) | P0 / −30% | about £348 | £238 / £246 |
| 17–19 Nov (17th open only) | £263 derived | £329.50 (6) | P0 / −20% | – | £246 / booked |

- **Open nights:** 10, 11, 15, 16 and 17 Nov. 12–14 and 18–21 Nov are booked; the intentional block starts 22 Nov (policy; not raised).
  - If 10 Nov does not sell tonight, **11 Nov becomes a 1-night gap under min 2** (12–15 Nov is booked).
- **Reyhan cut 9–17 Nov from −5% to −8% (9 Nov 21:24:50Z).** Against `recommend` +5%, and we are already the cheapest on every open stay. **Corentin to confirm.**
- **Positioning:**
  - `quality_premium(4.58, 4.62)` = −0.016.
  - `recommend(0.583, 0.49, 0.00, −0.016)` → **raise +5%** (30d).
  - 60d ex-blocks gives `raise +10%` but rests on the same 7 nights, so it is not used.
- **Mixed signal:**
  - A 4.70 Superhost at £280 sold 15–17 and 16–18 Nov overnight while we, at £228–£250 all-in, did not.
  - At P0 the gap is not price-led. That points to conversion: 4.58 from 12 reviews, 2nd floor, no lift.
- **Differentiators:** of the 12 comps, 5 have a lift and 2 are Superhosts.

## P08 Islington 2-bed (3318167): handback 13 Nov, nothing left to sell
- Booked 8–14 Nov (Airbnb). 13 Nov is the policy last night. No proposal.
- Comp 28354043 (£408) sold 10–12 Nov.

## P11 Camden (3064196): open stays and darts (Smoobu room; Booking.com list = × 1.15)

| Stay (open) | Ours room (Smoobu) | Comp median (n) | Pct / vs median | List × 1.15 |
|---|---|---|---|---|
| 18–20 Nov | **£178.00** (£165 / £191; was £152) | £267.00 (6) | P0 / −33% | £205: P17 / −23% |
| 22–26 Nov | £214.25 | £288.25 (6) | P17 / −26% | £246: P33 / −15% |
| 24–26 Nov | £215.50 | £306.50 (9) | P22 / −30% | £248: P22 / −19% |
| 29 Nov–5 Dec | £242.00 | £385.50 (4) | P0 / −37% | £278: P0 / −28% |
| 8–10 Dec | £226.50 | £381.00 (8) | P0 / −41% | £260: P12 / −32% |
| 8–11 Dec | £236.33 | £369.67 (6) | P0 / −36% | £272: P0 / −26% |
| 9–11 Dec | £241.00 | £421.00 (7) | P0 / −43% | £277: P0 / −34% |
| **10–12 Dec (30 days out)** | £284.50 | £476.50 (6) | P0 / −40% | £327: P17 / −31% |
| 11–14 Dec | £283.00 | £432.50 (8) | P0 / −35% | £325: P12 / −25% |
| **13–17 Dec (darts)** | **£206.25** (£221 / £195 / £200 / £209 = £825; was £203) | **£350.75 (7)** | **P14 / −41%** | £237: P29 / −32% |
| 15–19 Dec | £233.25 | £420.50 (7) | P0 / −45% | £268: P0 / −36% |
| 23–26 Dec | £266.67 (+5% DSO) | £377.84 (6) | P0 / −29% | £307: P17 / −19% |

- **New: 10–13 Nov is closed.** Smoobu shows it unavailable, and PriceLabs 11–13 Nov reads "Blocked" (refresh 9 Nov 21:22Z). There is no Smoobu reservation. Yesterday it was open at £170–£234.
  - The cause (owner, maintenance or channel block) is NOT CHECKED. It removes 4 nights, including tonight.
  - Reyhan's 9 Nov 14:06Z edit on 10–13 Nov only removed the −5%.
- **Min stay 2 → 3 on 22 Nov–18 Dec** (Reyhan 21:21:47Z). 12–14 Dec (2 nights, P0 / −41%) can no longer be booked as a 2-night stay. Open runs are long enough for 3 nights, so no orphans were created.
- **Darts 13–17 Dec:**
  - Now −3% (from −5%) under Reyhan's 22 Nov–18 Dec DSO. Policy `darts_override_24oct` says to leave the darts override at +5%. **This remains a conflict with a standing decision, for Corentin to confirm. Not a new proposal.**
  - Two £394 comps (4.50) sold darts overnight. Only 1090528454481682946 (4.72, £194.50) is cheaper.
- **Positioning:**
  - qp 0 (no Airbnb rating).
  - `recommend(0.462, 0.48, 0.05, 0)` → **raise +5%** (30d). `recommend(0.429, 0.38, 0.04, 0)` → **raise +5%** (60d).
  - **Supported: at the comp median (0%).**
  - Counting the 10–13 Nov block, 30d is `fix-listing` (behind market −8% at P5). Visibility (policy: CTR 0.81% vs 1.70%) remains the larger lever.
- **Differentiators:** P11 is a basement flat with a patio. Of the 12 comps, 4 have a lift and 3 have a terrace or balcony.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- **Minimum price 500 → 450 by Reyhan, 9 Nov 21:24:24Z** (`get_user_logs`). The policy special setup names "incl. the £500 minimum". **This is a conflict with a standing decision, reported for Corentin to confirm. No proposal.**
- **Smoobu now:** £450 on 10 Nov–8 Dec (except 4 Dec £451 and 5 Dec £510), then £473–£783 in December. Min stay 3–4. Was £500 flat.
- **Booked:** 0% vs market 46% at 30d (kpi_pack, Smoobu).

| Stay | Ours (Smoobu room) | Comp median (n) | vs median |
|---|---|---|---|
| 10–12 Nov | £450 | £237.00 (4) | P100 / +90% |
| 13–15 Nov | £450 | n/a (0) | n/a |
| 17–19 Nov | £450 | £236.50 (5) | P100 / +90% |
| 24–26 Nov | £450 | £252.50 (7) | P100 / +78% |
| 27–29 Nov | £450 | £351.75 (2) | P100 / +28% |
| 4–6 Dec | £480.50 | n/a (0) | n/a |
| 7–9 Dec | £450 | £280.25 (6) | P100 / +61% |
| 8–10 Dec | £472 | £277.50 (7) | P100 / +70% |
| 9–11 Dec | £523 | £283.50 (8) | P100 / +84% |
| 10–12 Dec | £590 | £302.50 (5) | P100 / +95% |

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)

| Stay | Comp median (n) |
|---|---|
| 10–12 Nov | £200.75 (2) |
| 13–15 Nov | £248.75 (2) |
| 17–19 Nov | £174.50 (1) |
| 24–26 Nov | £183.50 (3) |
| 27–29 Nov | n/a (0) |
| 4–6 Dec | £314.25 (2) |
| 7–9 Dec | £222 (2) |
| 8–10 Dec | £219.25 (2) |
| 9–11 Dec | £249 (3) |
| 10–12 Dec | £246.25 (2) |

- Comp rating median 4.54 (52).

## Comp tables

**Source for every comp row:** Airbnb public search, checked 2026-11-10 07:27–07:39Z.
- Nightly price excludes taxes and includes cleaning.
- (±%) is the change vs 9 Nov for the same stay.
- "n/a" means the listing was not returned by the date-filtered search (booked, or a minimum-stay clash).
- The "Ours" rows use the live Smoobu rate.

Rows appended under `flock` (`.comps.csv.lock`, `.channel_checks.csv.lock`): **700 comp rows** to `data/snapshots/2026-11-10/comps.csv` and **10 own-listing rows** to `data/snapshots/2026-11-10/channel_checks.csv`. Both files had already been copied forward by another agent.

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Sun 13 Dec–Tue 15 Dec (2n) | Mon 21 Dec–Tue 22 Dec (1n) | Tue 29 Dec–Wed 30 Dec (1n) | Sun 20 Dec–Tue 22 Dec (2n) | Mon 28 Dec–Wed 30 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.17 (12) | n/a | £419 | £1020 | £419 | £509 | £920 | £1020 | £1020 | £1020 | £1020 | £419 | £960 | £1020 | n/a | n/a | £1020 | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | n/a | £519 | £1020 | £476 | £476 | n/a | £1020 | £1020 | £1020 | £1020 | £498 | £552 | £1020 | n/a | n/a | £1070 | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (29) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £688 (-26%) | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.28 (46) | n/a | n/a | n/a | £266 | £323 | n/a | n/a | £332 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | n/a | n/a | n/a | £400 | £472 (-4%) | £529 (+3%) | n/a | n/a | n/a | n/a | £400 (-1%) | £432 (+3%) | £461 | n/a | n/a | £588 (-2%) | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (28) | £276 (+4%) | n/a | n/a | n/a | n/a | n/a | n/a | £595 (-7%) | £648 (+2%) | n/a | n/a (was £308) | n/a | £680 (+4%) | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.26 (22.5) | £276 (1) | £469 (2) | £1020 (2) | £409 (4) | £474 (4) | £724 (2) | £1020 (2) | £808 (4) | £1020 (3) | £1020 (2) | £419 (3) | £620 (4) | £850 (4) | n/a (0) | n/a (0) | £1020 (3) | n/a (0) | |
| **Ours, Smoobu live rate/night 10 Nov 07:26Z (status, min stay)** | | | | £435 Booked (Smoobu), min 3 | £490 Booked (Smoobu), min 4 | £630 Booked (Smoobu), min 3 | £444 Booked (Smoobu)/Open, min 2/3 | £548 Booked (Smoobu), min 3 | £584 Booked (Smoobu), min 4 | £576 Booked (Smoobu), min 4 | £474 Open, min 2 | £506 Booked (Smoobu)/Open, min 2/3 | £573 Booked (Smoobu), min 3 | £385 Open, min 2 | £506 Open, min 3 | £510 Open, min 2 | £2207 Open, min 1 | £2855 Open, min 1 | £1448 Booked (Smoobu)/Open, min 1/2 | £1842 Booked (Smoobu)/Open, min 1/3 | |
| **Ours, comparable basis** | | | | £430 | £472 | £664 | £437 | £517 | £544 | £539 | £460 obs | £485 | £613 | £392 obs | £436 obs | £557 obs | £2182 obs | £2765 obs | £1401 | £1755 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +56% | P50 / +1% | P0 / -35% | P75 / +7% | P100 / +9% | P50 / -25% | P0 / -47% | P25 / -43% | P0 / -52% | P0 / -40% | P0 / -6% | P25 / -30% | P25 / -34% | n/a | n/a | P100 / +37% | n/a | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Sun 15 Nov–Wed 18 Nov (3n) | Sun 15 Nov–Tue 17 Nov (2n) | Mon 16 Nov–Wed 18 Nov (2n) | Wed 11 Nov–Thu 12 Nov (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.58 (12) | n/a | n/a | n/a | £290 | n/a | n/a | n/a | £420 | £420 | £440 | n/a | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.7 (23) | £275 | n/a | £296 | £280 | £296 | n/a | n/a | n/a | n/a | n/a | £280 | n/a (was £280) | n/a (was £280) | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | n/a | n/a | £328 | £348 | n/a | n/a | £358 | £358 | £358 | n/a | n/a | n/a | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | £300 | n/a | n/a | £332 | n/a | n/a | n/a | n/a | £398 | £402 | n/a | n/a | £328 | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | £274 (-5%) | n/a | n/a | n/a | £397 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (53) | n/a | n/a | £1312 | £498 | £902 (+1%) | £1168 (+1%) | £1432 (+1%) | £1042 (+1%) | £1042 | £1133 (+1%) | £462 | n/a (was £498) | £498 | n/a | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | n/a | £497 (-4%) | £587 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.55 (22) | n/a | n/a | n/a | n/a | £474 (+9%) | £460 (-1%) | £489 | n/a (was £421) | £408 (-3%) | n/a (was £453) | £270 | n/a | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | n/a | n/a (was £566) | £707 (-2%) | n/a (was £718) | £740 (-3%) | £705 (-4%) | £317 (-15%) | £336 (-12%) | £370 (-5%) | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | n/a | n/a | £354 | £438 (-7%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £341 (+1%) | n/a | parking listed |
| **Comp median (n)** | | | 4.62 (26.0) | £275 (3) | n/a (0) | £804 (2) | £330 (6) | £438 (7) | £587 (3) | £707 (3) | £420 (3) | £414 (6) | £440 (5) | £299 (4) | £336 (1) | £355 (4) | n/a (0) | |
| **Ours, Smoobu live rate/night 10 Nov 07:26Z (status, min stay)** | | | | £224 Open, min 2 | £284 Booked (Smoobu), min 2 | £510 Blocked, min 3/4 | £260 Booked (Smoobu)/Open, min 2 | £390 Blocked, min 3 | £458 Blocked, min 4 | £494 Blocked, min 4 | £404 Blocked, min 3 | £392 Blocked, min 3 | £437 Blocked, min 3 | £242 Open, min 2 | £240 Open, min 2 | £242 Open, min 2 | £231 Open, min 2 | |
| **Ours, comparable basis** | | | | £256 obs | £282 | £455 | £263 | £363 | £415 | £442 | £374 | £364 | £399 | £228 obs | £248 obs | £250 obs | £306 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P0 / -7% | n/a | excluded | P0 / -20% | excluded | excluded | excluded | excluded | excluded | excluded | P0 / -24% | P0 / -26% | P0 / -30% | n/a | |

### P08

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | n/a (was £408) | £408 | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | £140 (-3%) | n/a | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (66) | n/a | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) | 1.22 | 4 | 4.6 (77) | n/a | n/a | none listed |
| [1497137911142581794](https://www.airbnb.co.uk/rooms/1497137911142581794) | 0.8 | 4 | 4.91 (23) | n/a | n/a | Superhost, house (2-bedroom cottage) |
| **Comp median (n)** | | | 4.87 (29.0) | £140 (1) | £408 (1) | |
| **Ours, Smoobu live rate/night 10 Nov 07:26Z (status, min stay)** | | | | £204 Booked (Smoobu), min 2 | £255 Blocked/Booked (Smoobu), min 2 | |
| **Ours, comparable basis** | | | | £231 | £270 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +65% | excluded | |

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Wed 18 Nov–Fri 20 Nov (2n) | Sun 22 Nov–Thu 26 Nov (4n) | Sun 29 Nov–Sat 5 Dec (6n) | Tue 8 Dec–Fri 11 Dec (3n) | Fri 11 Dec–Mon 14 Dec (3n) | Sat 12 Dec–Mon 14 Dec (2n) | Sun 13 Dec–Thu 17 Dec (4n) | Tue 15 Dec–Sat 19 Dec (4n) | Wed 23 Dec–Sat 26 Dec (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.7 (30) | £287 (-4%) | £297 (-7%) | £550 | £306 | £440 | n/a | £440 | £440 | £440 | £486 | n/a (was £320) | £404 | £392 | n/a (was £447) | £529 | £545 | £429 | £456 | n/a | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a | £374 | n/a | £270 | n/a | n/a | £374 | £374 | £374 | n/a | £244 | n/a | £359 | £359 | £374 | £351 | n/a (was £382) | £440 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a (was £272) | £262 (-11%) | £516 | £272 | £272 (-8%) | n/a (was £462) | £544 | £463 | £454 | n/a | £272 (-8%) | n/a | £379 (-8%) | £444 | £494 | £510 | n/a (was £394) | £420 | n/a | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a | n/a | £438 | n/a | £338 | n/a | n/a | £438 | n/a (was £438) | £438 | n/a | £306 | £296 (-18%) | n/a | £417 | £438 | £406 | £406 | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.5 (12) | n/a | n/a (was £282) | £516 | £282 | £306 | £615 | £544 | £463 | £454 | £470 | £282 | £270 | £410 | £444 | £494 | £510 | n/a (was £394) | £420 | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | n/a | £316 (-4%) | n/a | £316 | £358 | n/a | £478 | n/a | £388 | £421 (-4%) | £316 (-4%) | £306 | n/a | £381 (-3%) | £448 | £478 | £456 | £480 | £513 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | £172 | £242 (-22%) | £312 | £212 | £312 | n/a | n/a | £312 | £312 | £312 | £262 (-16%) | n/a | n/a | £292 | £292 | £312 | £281 | £281 | £292 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.44 (61) | n/a | n/a | n/a | n/a | £191 | n/a | n/a | n/a | £241 | n/a | £191 | £185 | n/a | n/a | n/a | n/a | £235 | £270 | £307 | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (87) | n/a | n/a | n/a | n/a | £184 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £194 | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.68 (73) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £201 (-5%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.55 (38) | n/a | n/a | n/a | £239 | n/a | n/a | n/a | n/a | £322 (+1%) | £348 (+5%) | n/a (was £278) | n/a | n/a | £325 (+2%) | £345 | n/a | n/a | n/a | £339 (-6%) | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | £250 | n/a | n/a | n/a | n/a | n/a | n/a | £212 | n/a | n/a | n/a | n/a | £280 | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (36.0) | £230 (2) | £280 (4) | £476 (6) | £272 (7) | £306 (9) | £615 (1) | £511 (4) | £438 (7) | £381 (8) | £421 (7) | £267 (6) | £288 (6) | £386 (4) | £370 (6) | £432 (8) | £458 (8) | £351 (7) | £420 (7) | £378 (6) | |
| **Ours, Smoobu live rate/night 10 Nov 07:26Z (status, min stay)** | | | | £188 Blocked/Unavailable, min 2 | £257 Blocked/Booked (Smoobu), min 2 | £284 Open, min 3 | £179 Booked (Smoobu)/Open, min 2 | £216 Open, min 3 | £291 Booked (Smoobu), min 3 | £307 Booked (Smoobu)/Open, min 3 | £224 Booked (Smoobu)/Open, min 3 | £226 Open, min 3 | £241 Open, min 3 | £178 Open, min 2 | £214 Open, min 3 | £242 Open, min 3 | £236 Open, min 3 | £283 Open, min 3 | £268 Open, min 3 | £206 Open, min 3 | £233 Open, min 3 | £267 Open, min 2 | |
| **Ours, comparable basis** | | | | £188 | £257 | £284 | £179 | £216 | £291 | £307 | £224 | £226 | £241 | £178 | £214 | £242 | £236 | £283 | £268 | £206 | £233 | £267 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = Smoobu x 1.15 (before promotions)** | | | | £216 P50 / -6% | £296 P50 / +6% | £327 P17 / -31% | £206 P0 / -24% | £248 P22 / -19% | £335 P0 / -46% | £353 P0 / -31% | £258 P14 / -41% | £260 P12 / -32% | £277 P0 / -34% | £205 P17 / -23% | £246 P33 / -14% | £278 P0 / -28% | £272 P0 / -26% | £325 P12 / -25% | £308 P12 / -33% | £237 P29 / -32% | £268 P0 / -36% | £307 P17 / -19% | Smoobu Booking.com markup +15% (policy) |
| **Our percentile / vs median** | | | | P50 / -18% | P25 / -8% | P0 / -40% | P0 / -34% | P22 / -30% | P0 / -53% | P0 / -40% | P14 / -49% | P0 / -41% | P0 / -43% | P0 / -33% | P17 / -26% | P0 / -37% | P0 / -36% | P0 / -35% | P0 / -41% | P14 / -41% | P0 / -44% | P0 / -29% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | n/a | n/a | £202 | £202 | n/a | n/a (was £302) | n/a (was £302) | £202 (-33%) | n/a (was £302) | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | £352 | n/a | £352 | £428 | n/a | £352 | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | £236 | n/a | £253 | £236 | n/a | n/a | n/a | £246 | £246 | £246 | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | £142 (-26%) | n/a (was £252) | £302 | n/a | £252 (-17%) | n/a | n/a | £302 | £302 | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a (was £172) | n/a | n/a | £202 | £252 (-9%) | n/a | n/a | n/a (was £278) | £278 | £278 | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | n/a | n/a | n/a | £290 | n/a | n/a | n/a | n/a | n/a | £290 | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | n/a | £402 | n/a | £368 | n/a | n/a | £402 | £402 | £402 | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (20) | n/a | n/a | £272 | n/a | n/a | £276 (-3%) | n/a | £258 (+2%) | n/a (was £264) | £267 (+2%) | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (17) | n/a | n/a | n/a | n/a | £200 | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | £264 | n/a | n/a | n/a | n/a | n/a | n/a | £241 | £241 | £241 | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.83 (12) | £238 | n/a | n/a | £238 | £238 | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.88 (19.5) | £237 (4) | n/a (0) | £302 (5) | £236 (5) | £252 (7) | £352 (2) | n/a (0) | £280 (6) | £278 (7) | £284 (8) | |
| **Ours, Smoobu live rate/night 10 Nov 07:26Z (status, min stay)** | | | | £450 Open, min 3 | £450 Open, min 4 | £590 Open, min 3/4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 4 | £480 Open, min 4 | £450 Open, min 3 | £472 Open, min 3 | £523 Open, min 3 | |
| **Ours, comparable basis** | | | | £450 | £450 | £590 | £450 | £450 | £450 | £480 | £450 | £472 | £523 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +90% | n/a | P100 / +95% | P100 / +90% | P100 / +78% | P100 / +28% | n/a | P100 / +61% | P100 / +70% | P100 / +84% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | £190 | £204 | £199 | £174 | £184 (-4%) | n/a | n/a | £192 | £192 | £192 | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (52) | £211 (-10%) | n/a | n/a | n/a | n/a (was £314) | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | n/a | n/a | n/a | n/a | £306 (-5%) | £252 | £246 (-4%) | £249 (-1%) | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | £294 (-4%) | £294 | n/a | £243 (-11%) | n/a | £323 | n/a | n/a | £273 (-4%) | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.67 (61) | n/a | n/a | n/a | n/a | £178 (-4%) | n/a | n/a | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [774061637963678253](https://www.airbnb.co.uk/rooms/774061637963678253) | 0.54 | 3 | 4.5 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed |
| **Comp median (n)** | | | 4.54 (52) | £201 (2) | £249 (2) | £246 (2) | £174 (1) | £184 (3) | n/a (0) | £314 (2) | £222 (2) | £219 (2) | £249 (3) | |
| **Ours, Smoobu live rate/night 10 Nov 07:26Z (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | |
## Data gaps
- **Booking.com: NOT CHECKED** (not attempted; bot check on earlier days). This covers the P11 guest view and darts list price, and the P05/P06 Booking.com rates.
- **P05 21 and 29 Dec:** no kept comp is bookable for either single night, so the evidence is overlapping stays and NL percentiles only. How a +300% DSO produces £2,207 / £2,855: NOT CHECKED. Whether the old £2,500 max would have capped 29 Dec: NOT CHECKED.
- **P11 10–13 Nov block:** no Smoobu reservation, PriceLabs "Blocked". Who set it and why: NOT CHECKED. It moves `recommend` between raise +5% and fix-listing.
- **P05 long-stay 10% (t-p05-los):** not re-tested today (no 5–6-night search). NOT CHECKED.
- **Comps absent on every stay** (P06 2, P08 4, P14 1, P17 2): whether they are inactive is NOT CHECKED. No replacements were made.
- **Thin samples:** P05 n = 0–4, P06 n = 1–6 on open stays, P08 n = 1, P14 / P17 some stays n = 0–2.
- **P11 and P14 percentiles are biased low:** room price is compared with cleaning-inclusive comps.
- **Comp asks are unsold asks.** The prices at which comps that disappeared actually sold are unknown.
- **No PriceLabs comp-set or Market Dashboard pull was made by this agent.** NL percentiles come from the market agent's `market.csv` (10 Nov).
