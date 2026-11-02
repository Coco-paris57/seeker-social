## PriceLabs audit (D = 2026-11-02)

**Sources**
- Snapshot `data/snapshots/2026-11-02/`: `raw/listing_data.json` (07:00Z), `raw/prices_*.json` (07:01-07:22Z), `prices.csv` (07:23Z), `listings.csv`, `reservations.csv` (Smoobu, room only, cleaning excluded).
  - **Raw window is 3 Nov 2026 - 1 Jan 2027.** Tonight (2 Nov) is not in raw; 2 Nov values below come from live `get_listing_prices`.
  - `prices.csv` `available` is PriceLabs' view (`user_price != -1 and not unbookable`, `rm/pricelabs_ingest.py:90`), not Smoobu's.
- Baseline: `data/snapshots/2026-11-01/` and `reports/2026-11-01/sections/pricelabs.md`.
- **Live read-only calls, 2 Nov 07:24-07:30Z**, one at a time except one pair (group + account `get_user_logs`) that ran in parallel; both returned 200.
  - `get_user_logs` listing / group / account, 1-2 Nov.
  - `get_listing_data` (all 20 listings, 07:25Z).
  - `get_listing_date_overrides`: P04 3562176, P20 3547481, P13 3064856 + 3090701, P11 3064196, P12 2699998, P05 3166592 (to 28 Feb 2027), P06 3288517.
  - `get_customizations` (toggled_on=false; last-minute, occupancy, booking recency, seasonality, demand, far-out): P06, P04, P05, P11, P12, 3064856, 3090701, P20, P09.
  - `get_listing_prices`: P04 2-30 Nov, P12 2 Nov-13 Dec (refreshed 07:22:46Z), P06 2-16 Nov, P05 27 Jan-2 Feb 2027, P11 2-4 Nov, P13 3064856 2-3 Nov.
- `kpi_pack.json`: `sync_issues` P04 5 nights, P12 13 nights, others []; `market_percentiles` all null; `gaps` only P12 26 Nov; `missing` market/comps/channel_checks = empty. Base vs market therefore uses the latest (1 Nov) rows of `data/snapshots/2026-11-01/market.csv`, and today's `raw/neighbourhood_P13.json` for P13 (2 BR n=117, P50 £225, P75 £280).
- Policy respected: P02/P03/P06/P07 blocks, P14 special setup, handbacks (P01 20 Dec, P08 13 Nov, P09 26 Nov, P10 18 Nov, P12 13 Dec), P13 1 Dec intentional, P11 darts "+5% leave as is", P04 2 Dec and P12 17 Nov deprioritised. Reyhan edits that cross a standing decision are reported as conflicts for Corentin to confirm.

### What changed since 1 Nov 06:00Z
- **Logs (`get_user_logs`)**: **18 listing entries, all reyhan@, all 2 Nov 00:10:52-00:16:48Z** (IP 2a01:4b00:…). No entries on 1 Nov after 06:00Z. Group and account logs: 0.

| Time (Z) | Listing | Change |
|---|---|---|
| 00:10:52 / 00:11:10 / 00:11:22 | P11 3064196 (+ Vrbo `_7fd3…`) | 2 Nov DSO +10% -> +20% -> **+10%, min 1** |
| 00:11:52 | P11 (+ Vrbo) | **10 Nov-18 Dec: % removed (0%), min 2 kept** (was -7% / -5%) |
| 00:12:22 | P13 3064856 (+ 3090701, Vrbo `_3d48…`) | **2-12 Nov: % removed (0%), min 2** (was -5% / -3% / -5%) |
| 00:12:54 | P13 (3 listings) | 7-20 Dec -5% -> **-2%**, min 2 |
| **00:16:02** | **P20 3547481** | **Base 350 -> 330** (`source: reviewPrices`); **Min 220 -> 200** |
| 00:16:39 / 00:16:48 | P20 | 6-24 Nov -10% -> -3% -> **-5%, min 3** |

- **Not logged but changed (customizations are not logged):** **P13 last-minute -5% gradual (14 d) -> Custom 0% "No Discount"** on both 3064856 and 3090701. Who and when: NOT CHECKED.
- Customizations unchanged vs 1 Nov on P04, P05, P06, P11, P12, P20, P09.
- Overrides unchanged since 31 Oct on P04, P05, P06, P12.
- `listings.csv`: the only base/min/max change is P20 (330 / 200 / 1800). Recommended base moved P13 233/232 -> **237/236**, P08 252 -> 254, P10 166 -> 165.

---

### CRITICAL

**C1. Push freshness: four priced listings will cross 24 h this morning; P04 refreshed without pushing** (live `get_listing_data` 07:25Z)

| Ref | Last push | Age at 07:25Z | Crosses 24 h | Last refresh | Note |
|---|---|---|---|---|---|
| P09 3318172 | 1 Nov 07:55:36Z | 23 h 30 m | **07:55Z today** | 1 Nov 07:55:34Z | 3 open nights 10-12 Nov |
| P05 3166592 | 1 Nov 09:13:53Z | 22 h 11 m | **09:13Z** | 1 Nov 09:13:51Z | |
| P06 3288517 | 1 Nov 09:13:55Z | 22 h 11 m | **09:13Z** | 1 Nov 09:13:53Z | has not seen the 12-15 Nov booking (H3) |
| P04 3562176 | 1 Nov 09:14:21Z | 22 h 11 m | **09:14Z** | **2 Nov 00:17:15Z** | **refreshed but did not push**; see sync below |

- **P04 sync (real):** 5 open nights **9-13 Nov**. PriceLabs £167 / £169 / £173 / £175 / £179 = **£863**; Smoobu £159 / £161 / £164 / £166 / £170 = **£820** (-£8 to -£9 a night, -£43). Smoobu equals PriceLabs' previous price (`user_price`), so the 00:17Z recalculation was not pushed (`kpi_pack.sync_issues`; live `get_listing_prices` 3562176). Causes to check, none proven: push failure, push skipped after refresh, manual Smoobu rate. Sync is on and there is no DSO change on these dates since 31 Oct 22:11Z.
- **P12 sync (artefact, not real):** the 13 nights in `kpi_pack.sync_issues` (3-4 Nov, 13 Nov, 17-20 Nov, 26 Nov, 30 Nov-2 Dec, 12-13 Dec) compare raw PriceLabs from **1 Nov 09:13:38Z** with Smoobu read after PriceLabs' **07:22:48Z push today**. Live prices (refreshed 07:22:46Z) match Smoobu on every one (e.g. 3 Nov £195, 17 Nov £233, 30 Nov £232, 12 Dec £283). The 07:22Z push has no log entry: trigger NOT CHECKED.
- **t-push-check: did anything push overnight on its own schedule?**
  - **Yes, without a logged edit:** P02 00:24Z, P03 (Channex) 03:12Z, P14 04:32Z, P07 04:44Z, P01 06:02Z, P08 06:15Z, P10 06:15Z, P12 Vrbo 06:37Z, **P12 07:22Z**. Also **1 Nov 09:13-09:14Z on P04, P05, P06, P12**, with no listing/group/account log that day, so these were not triggered by a logged DSO/base edit (an unlogged customization edit or manual refresh cannot be ruled out).
  - **Edit-triggered (0-4 min after Reyhan's 00:10-00:16Z edits):** P11 00:12:14Z, P13 3064856/3090701 00:15:24Z, P20 00:20:25Z, P11 Vrbo 00:23Z, P13 Vrbo 00:31Z.
  - So yesterday's "edit-only" pattern no longer holds for P04/P05/P06/P12. If 09:13Z is their daily slot, they should push again at about 09:13Z today. **Re-read `last_date_pushed` after 09:15Z**; if P04/P05/P06 still show 1 Nov, this is a push failure.
- **Check:** PriceLabs > listing > Sync status / push history for 3318172, 3562176, 3166592, 3288517. For P04, look for a failed or skipped push after the 00:17:15Z refresh.

### HIGH

**H1. Reyhan conflicts with standing decisions: status after the 2 Nov 00:10-00:16Z edits** (live overrides; `get_user_logs`; raw / live prices; `policy.json`)

| Conflict | Policy | PriceLabs now | Prices now | Status |
|---|---|---|---|---|
| (a) **P12 17 Nov** | `deprioritised`: Corentin won't change Mile End 17 Nov +50% | **-7%, min 2** (31 Oct 22:05:35Z, not edited) | **£233** (live 07:22Z; uncust £276) | **Unchanged** |
| (b) **P11 darts 13-17 Dec** | 21 Oct "average above £300/night"; `darts_override_24oct` "+5%, leave as is" | **0%, min 2** (% removed 2 Nov 00:11:52Z) | **£240 / £213 / £218 / £229 / £250 = £1,150, avg £230** (1 Nov £1,043, avg £208.60) | **Better, not fixed**: -5% removed, +5% not restored; avg still £70 below £300 |
| (c) **P04 -8% on 1-25 Nov, min 3** | 24 Oct (Corentin) | 3-8 Nov -7% min 3 (booked); **9-24 Nov -10%, min 3**; 2 Nov +20% **min 2** | 9-13 Nov PL £167-£179 (Smoobu £159-£170, C1) | **9-24 Nov still -10% vs -8%.** 1 Nov lapsed; 2 Nov is a 1-night gap before the 3 Nov arrival, `unbookable=1`, so the min 2 cannot sell |
| (d) **P20 -5% (31 Oct-19 Nov) and base 350** | `price_24oct`: base 380->350, -5% 31 Oct-19 Nov (Corentin) | **6-24 Nov -5%, min 3** (00:16:48Z) **but base 350 -> 330 and min 220 -> 200** (00:16:02Z) | 6-9 Nov **£216 / £219 / £215 / £227** (1 Nov £221 / £224 / £220 / £220) | **DSO now matches Corentin's -5% (and runs to 24 Nov, not 19), but the base cut gives the same or lower prices**: -5% on 330 = 0.896 x 350, about the old -10%. **New conflict: base 330 vs Corentin's 350.** 8 Nov £215 is below the old £220 floor |
| (e) **P13 base 250** | not in `price_changes` | base **250** (no base log) | recommended **237 / 236** (`get_listing_data`; was 233/232) | **Unchanged.** Corentin to confirm or revert |
| (f) **P13 1-3 / 8-12 Nov** | 24 Oct: overrides set to 0% (Corentin) | **0%, min 2 on 2-12 Nov** (00:12:22Z; 3 listings) | 3064856 2 / 3 Nov **£122 / £124** (min 2, a 2-night run); 10-12 Nov **£159 / £159 / £159** (1 Nov £144 / £145 / £147); 3090701 12 Nov £193 | **Fixed** |
| (g) P04 1-2 Nov min 2 | 24 Oct "never fewer than 3" | 1 Nov past; 2 Nov min 2, unbookable | - | **Lapsed** |

- **Check:** PriceLabs > Date Specific Overrides on 2699998 17 Nov; 3064196 13-17 Dec; 3562176 9-24 Nov; 3547481 > Base / Min and 6-24 Nov; 3064856 > Base.

**H2. a-discount-cut: partly moving. The gap narrowed, mostly from Reyhan removing DSO cuts and the unlogged P13 last-minute change; the P20 "narrowing" is partly the base cut**
- Sources: live `get_customizations`; raw `price` vs `uncustomized_price` on PriceLabs-open nights; P12 from live 07:22Z prices; handback nights excluded; P06 12-14 Nov excluded (booked in Smoobu); P05 9 Nov and P04 2 Dec excluded.
- **Layers still active (vs Custom 0%):**

| Ref | Last-minute | Occupancy | Booking recency | Seasonality | Demand | Far-out |
|---|---|---|---|---|---|---|
| P04 | -5% gradual, 15 d | Aggressive | ON default (5-15%) | off | Conservative | +30% after 150 d |
| P05 | -1% gradual, 15 d | Aggressive | ON default | off | Conservative | +30% after 150 d |
| P11 | 0% | Aggressive | ON default | off | off | +30% after 150 d |
| P12 | 0% | Custom (milder) | ON default | off | Mod. Conservative | +30% after 150 d |
| **P13 3064856 / 3090701** | **0% (was -5%, unlogged)** | Aggressive | ON default | Mod. Conservative ON | Conservative | +30% after 150 d |
| P20 | 0% | Aggressive | ON default | off | off | +30% after 150 d |
| P06 | 0% (since 1 Nov, unlogged) | Aggressive | ON default | off | off | Market Driven (Balanced) |
| P09 | **-18%** gradual, 15 d | Market Driven (toggle off) | off, so the default applies | off | Mod. Aggressive | +20% after 120 d |

- **Final vs uncustomized.** Windows: next 14 = **3-16 Nov**, next 30 = **3 Nov-2 Dec** (2 Nov not in raw). "1 Nov raw" column = the same dates in yesterday's raw.

| Ref | Next 14 now | 1 Nov raw, same dates | Next 30 now | 1 Nov raw, same dates |
|---|---|---|---|---|
| P04 | 5 n £863 vs £1,104, **-21.8% (£241)** | -27.1% (£309) | 12 n £2,190 vs £2,758, **-20.6% (£568)** | -22.7% (£636) |
| P20 | 11 n £2,492 vs £2,829, **-11.9% (£337)** | -16.8% (£510) | 19 n £4,737 vs £5,341, **-11.3% (£604)** | -17.5% (£977) |
| P11 | 4 n £924 vs £1,068, **-13.5% (£144)** | -19.3% (£195) | 19 n £4,119 vs £4,470, **-7.9% (£351)** | -17.6% (£832) |
| P05 | 1 n £382 vs £485, -21.2% (£103) | -17.8% (£88) | 6 n £2,935 vs £3,335, **-12.0% (£400)** | -11.1% (£369) |
| P12 (live) | 4 n £882 vs £934, -5.6% (£52) | -5.2% (£52) | 11 n £2,574 vs £3,023, **-14.9% (£449)** | -9.7% (£289) |
| P06 (8-11 Nov) | 4 n £891 vs £995, -10.5% (£104) | -7.9% (£82) | same | same |
| P09 | 3 n £410 vs £432, -5.1% (£22) | -4.7% | same (handback) | |
| P08 | 3 n £612 vs £607, +0.8% | +0.6% | same (handback) | |
| P13 3064856 | 6 n £907 vs £923, -1.7% (£16) | -9.6% (£91) | 9 n £1,725 vs £1,643, +5.0% | +1.7% |
| P13 3090701 | 6 n £1,102 vs £1,118, -1.4% (£16) | -3.0% (£32) | 9 n £1,780 vs £1,754, +1.5% | +3.0% |

- **Net uncustomized minus final** (P06 and P14 excluded, P13 netted): **next 14 £926** (1 Nov raw, same dates: £1,295); **next 30 £2,281** (same dates: £3,040). With P06: £1,030 / £2,385. Yesterday's headline (2 Nov-1 Dec) was £3,125.
- **Caveats:**
  - **P20:** uncustomized fell £5,584 -> £5,341 on the same dates because the base dropped 350 -> 330. Final rose only £130 (£4,607 -> £4,737). The cut moved from a DSO into the base; it was not removed.
  - **P12:** the gap widened (£289 -> £449) and final fell £108; Reyhan's -7% is unchanged, so the algorithm moved.
  - P11 and P13 gains come from Reyhan removing her own -7% / -5% DSOs and the P13 last-minute change.
- **Check:** PriceLabs > listing > Customizations. Set Last-minute, Occupancy and Booking Recency to **Custom 0%** explicitly (toggling a layer off lets the default apply). Still open on P04 (-5% last-minute), P05 (-1%), P09 (-18%), Aggressive occupancy everywhere except P12 and P09, and Booking Recency default everywhere.

**H3. The three new bookings: PriceLabs sees two of three** (live `get_listing_prices`; `reservations.csv` diff 1 -> 2 Nov)

| Booking | PriceLabs | PL price on the nights | Room paid (Smoobu) | Ratio |
|---|---|---|---|---|
| **P06 Airbnb 12-15 Nov** (booked 1 Nov) | **Not seen.** Last refresh 1 Nov 09:13:53Z; 12-14 Nov still open at £256 / £286 / £290 | £832 since the 09:13Z push; **£891** before it (31 Oct 22:10Z refresh) | £541.00 | **0.650x / 0.607x** (booking time unknown, so both shown) |
| P12 Booking.com 27-30 Nov | **Seen** (`booked_date` 2026-11-01, live 07:22Z) | `booked_price` £268 + £299 + £257 = **£824** | £653.39 | **0.793x** (before the Smoobu +15% Booking.com markup; promotions stack, per policy) |
| P05 Airbnb 29 Jan-1 Feb 2027 | **Seen** (`booked_date` 2026-11-01) | `booked_price` £410 + £414 + £380 = **£1,204** (uncust £1,411); DSO **-7%, min 3** on 29-31 Jan (Reyhan 31 Oct 22:08:26Z) | £1,059.52 | **0.880x**: fits a 12% Airbnb early-bird at 88 days out. P05's Airbnb rules: NOT CHECKED |

- P06: PriceLabs occupancy and booking-recency layers still treat 12-14 Nov as unsold until P06 refreshes (C1). The booking falls inside P06's 8-14 Nov open run in an intentional-block flat (t-p06-open); whether that run is meant to sell is for Corentin. P06's remaining open nights are **8-11 Nov: £214 / £217 / £222 / £238**, still under DSO -2% (31 Oct 22:09:46Z).
- **Check:** 3288517 > refresh / sync log.

**H4. P05 9 Nov and 29 Dec orphans: unchanged** (live overrides 3166592; raw)
- **9 Nov:** DSO **+300%, min 1** (30 Oct 22:09:42Z). **£1,451** (uncust £425). Neighbours booked: 8 Nov £456, 10 Nov £454 (3.2x). The Airbnb £253 side (a-p05-9nov) is OTA-side: NOT CHECKED here.
- **29 Dec:** DSO **+100%, min 1** (18 Oct 20:34:32Z). **£1,342** (uncust £1,081). Neighbours booked: 28 Dec £784, 30 Dec £820 (1.7x).
- **Check:** 3166592 > DSO 9 Nov, 29 Dec. Corentin to confirm (a-peak-check).

### MEDIUM

**M1. Tonight (2 Nov) and short gaps** (live prices; overrides)
- **P11 2 Nov orphan (t-p11-2nov): now sellable.** DSO **+10%, min 1** (00:11:22Z; Reyhan set +20% at 00:11:10Z, then back to +10%). Price **£176** (uncust £139), pushed 00:12:14Z. Before arrival 3 Nov. **Min fixed; priced 27% above uncustomized for a same-day orphan on a "Low Demand" night**; Corentin to judge.
- P12 2-4 Nov: open 3-night run, min 2, £202 / £195 / £203 (live).
- P13 3064856 2-3 Nov: 2-night run, min 2, £122 / £124.
- P04 2 Nov: `unbookable` (min 2, 1-night gap).
- **P12 26 Nov is now a 1-night orphan** between Booking.com 21-26 Nov and the new 27-30 Nov booking. DSO -7%, **min 2**, `unbookable=1`, £262 (live). Matches `kpi_pack.gaps`. A gap-fill rule would sell it; it would need a min-1 DSO. **Check:** 2699998 > DSO 26 Nov.

**M2. P13 25-26 Dec still min 3** (3064856 / 3090701 DSO 23-26 Dec -3%, min 3, 27 Oct 11:58:10Z, not edited)
- 3064856 24 / 25 / 26 Dec **£228 / £229 / £232**; 3090701 25 / 26 Dec £229 / £232. 27 Dec is blocked by the 3090701 Airbnb 27 Dec-3 Jan stay (a booking, per policy). **Arrivals on 25 or 26 Dec cannot fit.**
- **Check:** 3064856 DSO 25-26 Dec, min stay.

**M3. Other plan items on the PriceLabs side**
- **a-p13-orphan-price:** DSOs unchanged (17 Nov +35% min 1; 27 Nov +50% min 1). **3064856 17 Nov fell to £170** (1 Nov £271; uncust 243 -> 173), so the +35% no longer lifts it above its neighbours. 3090701 £207 (was £222). 27 Nov £336 / £244. Cause of the 17 Nov drop: UNKNOWN (the algorithm, not a logged edit).
- **a-raise-1012nov (P13 12 Nov):** no raise. It went up to £159 / £193 only because Reyhan's -5% was removed. P09 10-12 Nov £120 / £144 / £146 (1 Nov £145 / £147 / £153).
- **a-p05-dec:** not done. 7-8 Dec **£490 / £483**, +3% min 2.
- **t-p20-delivery:** 20-22 Nov still open in PriceLabs, **£301 / £299 / £290**, min 3, now -5%.
- **P12 22-28 Nov (a-p12-2228nov):** 27-29 Nov now booked (H3). 26 Nov orphan (M1).

**M4. Floor / ceiling** (`kpi_pack.bounds`, 60-day raw)
- 0% at min and 0% at max on every priced listing except **P14 75%** at the £500 minimum (special setup: numbers only).
- **P20 floor cut 220 -> 200** (Reyhan 00:16:02Z). 6 / 8 Nov now **£216 / £215**, below the old £220 floor.
- 180-day check: NOT POSSIBLE (raw ends 1 Jan).

**M5. Min stay vs policy** (`prices.csv`, PriceLabs-open nights)
- **Below 2:** P05 9 Nov and 29 Dec (H4); P13 17 Nov, 27 Nov, 1 Dec (1 Dec intentional); P11 2 Nov (tonight orphan, M1); P04 2 Dec (deprioritised; also below P04's 3).
- **Above 3 inside 2 months:** P20 25-26 Dec min 4 (no DSO, so from a min-stay profile; which setting: UNKNOWN), 27-28 Dec min 6, 29-31 Dec min 5 (DSOs of 11 Oct / 30 Oct).
- 5-night rule (2+ months, from 2 Jan) and 7-night rule: outside the window, NOT CHECKED (P05 1-2 Feb shows min 5).
- **Short gaps at min 2 now:** P11 23-25 Dec (min 3 / 2 / 2, £313 / £310 / £321); P05 16-17 Nov (£382 / £421) and 7-8 Dec; P12 12-13 Nov (£215 / £269 live); P08 5-7 Nov (£190 / £209 / £213); P09 10-12 Nov.

**M6. Base vs PriceLabs recommended base vs market: input to today's base review (a-base-review-1102)**
- Sources: `listings.csv` / live `get_listing_data` for base and recommended; 1 Nov rows of `data/snapshots/2026-11-01/market.csv` (bedroom-matched Nearby Listings, horizon unstated, cleaning inclusion unknown); P13 from today's `raw/neighbourhood_P13.json`. Occupancy: PriceLabs `occupancy_next_30` vs `market_occupancy_next_30` (live).

| Ref | Base | PL recommended | Base vs rec | P50 | Gap | P75 | Gap | Occ next 30 vs market |
|---|---|---|---|---|---|---|---|---|
| P01 | £253 | £255 | -£2 | £257 | -1.6% | £331 | -23.6% | 100% vs 34% (sold to handback) |
| P05 (4 BR) | £550 | £548 | +£2 | £577 | -4.7% | £719 | -23.5% | 83% vs 40% |
| P06 | £357 | £357 | 0 | £406 | -12.1% | £508 | -29.7% | 77% vs 46% (stale, H3) |
| P09 | £176 | £176 | 0 | £132 | +33.3% | £162 | +8.6% | 90% vs 36% |
| P11 | £286 | £285 | +£1 | £288 | -0.7% | £330 | -13.3% | **37% vs 46%** |
| P12 | £284 | **£273** | **+£11** | £206 | +37.9% | £244 | +16.4% | 60% vs 40% |
| P13 | £250 | **£237 / £236** | **+£13 / +£14** | £225 | +11.1% | £280 | -10.7% | 67% vs 41% |
| **P20** | **£330 (was 350 until 00:16Z)** | £347 | **-£17** | £254 | +29.9% | £314 | +5.1% | 37% vs 37% |
| P04 | £220 | Unavailable | - | £168 | +31.0% | £218 | +0.9% | 57% vs 24% |

- **Running effect of the 18 Oct rises** (P01, P05, P06, P09, P11, P12; `reservations.csv`, confirmed, by booked date):
  - 4-18 Oct (15 days): **13 bookings, 91 nights, £18,199, ADR £200**;
  - 19 Oct-1 Nov (14 days): **13 bookings, 46 nights, £9,600, ADR £209** (yesterday 10 / 37 / £7,346). It now includes P06 3 n £541 (ADR £180), P12 3 n £653 (ADR £218) and P05 3 n £1,060 (ADR £353, Jan).
  - Fewer nights, partly because inventory is smaller (P01 sold out, handbacks). Do not over-read.
- **PriceLabs-side notes, by property:**
  - **P20** is now the only listing set *below* PriceLabs' recommendation (-£17), after Reyhan's base cut on the base review day. This conflicts with Corentin's 24 Oct base 350 (H1d).
  - **P12** and **P13** are still above recommended (+£11, +£13/£14). Recommended P13 rose £4.
  - **P11** is the only raised flat below market occupancy (37% vs 46%). Its open nights next 30 are now -7.9% vs uncustomized (was -17.6%) after Reyhan's DSO removal.
  - P05, P06, P09 and P01 bases equal recommended within £2.
  - Nothing in PriceLabs changes yesterday's hold on P01, P05, P06, P09, P11, P12 and P13. **P20 is the open question.**

**M7. Listing hygiene** (live `get_listing_data`; `data/id_map.json`, last committed 22 Oct)
- **`_unmatched`:** the three Marylebone Vrbo listings (`_units_0001_a7f5a076…`, `_4a980bb7…`, `_380ddc1a…`) are still not among the 20 PriceLabs listings. **Question:** removed on purpose? If so, update `id_map.json`.
- **`confidence: check`:**
  - P03 is priced via **Channex**: push on, last push 2 Nov 03:12:48Z, fully blocked (intentional).
  - **P15-P19 have no PriceLabs listing.** **Question:** should they be priced?
- **P02 Vrbo copy `_units_0004_ca1ccf61`:** push on, last push **24 Feb 2026** (P02 intentional block). **Question:** turn push off or remove it?
- **Vrbo copies (P11 `_7fd3…`, P12 `_386e…`, P13 `_3d48…`)** get every parent DSO via `add_custom_pricing_from_parent` and push separately (00:23Z, 06:37Z, 00:31Z).
- P13 3064856 / 3090701 share coordinates (51.5088201, -0.2342476); one flat per policy.
- P20 is not in the info pack. P04 recommended base reads "Unavailable".
- **Info pack** (`/home/user/seeker-social/seeker-estates/build/properties.py`, mtime 13 Oct): same differences as 1 Nov, plus P20's new base/min. **The pack is out of date.**

### Open plan items: status 2 Nov

| Item | Status |
|---|---|
| t-push-check | P09 crosses 24 h at 07:55Z; P04 / P05 / P06 at 09:13-09:14Z. P04 refreshed 00:17Z without pushing (5-night sync gap). Several listings pushed without a logged edit, so the edit-only theory is weaker (C1) |
| Reyhan conflicts | P13 1-3 / 8-12 Nov **fixed**; P11 darts **better** (0%, not +5%); P20 -10% -> -5% **but base 350 -> 330 and min 220 -> 200 (new conflict)**; P04 -10% unchanged; P12 17 Nov unchanged; P13 base 250 unchanged; P04 1-2 Nov lapsed (H1) |
| a-discount-cut | Partly moving: £2,281 / £926 (same dates yesterday £3,040 / £1,295). P13 last-minute set to 0% (unlogged). P04 / P05 / P09 last-minute, Aggressive occupancy and Booking Recency still on (H2) |
| P06 unlogged layer change | Still in place (0% last-minute, Aggressive occupancy, recency default, far-out Market Driven); identical to 1 Nov; author NOT CHECKED |
| New bookings | P12, P05 seen; **P06 12-15 Nov not seen by PriceLabs** (H3) |
| t-p11-2nov | **Fixed** (min 1, £176, +10%) (M1) |
| a-p05-9nov / a-peak-check | P05 9 Nov £1,451, 29 Dec £1,342, unchanged (H4); P13 25-26 Dec min 3, unchanged (M2) |
| a-raise-1012nov, a-p13-orphan-price, a-p05-dec, t-p20-delivery | Not done (M3); P13 17 Nov fell to £170 |
| t-p06-open | 12-14 Nov sold (Airbnb £541); 8-11 Nov still open, £891 for 4 nights (H3) |
| a-base-review-1102 | Inputs in M6; Reyhan cut the P20 base at 00:16Z |
| t-p04-doublebook, a-airbnb-rules, a-bcom-cancel, a-p20-conversion | OTA side: NOT CHECKED here |

Data gaps:
1. Raw window is **3 Nov-1 Jan**: tonight (2 Nov) comes only from live calls for P04, P11, P12, P13. The 180-day floor/ceiling check and the 5-night / 7-night rules are NOT CHECKED.
2. `kpi_pack.json`: `market_percentiles` null; market/comps/channel_checks empty, so base vs market uses the 1 Nov `market.csv` rows. The 13 P12 `sync_issues` are a timing artefact (see C1).
3. Push status after 07:30Z (P09 07:55Z deadline; P04 / P05 / P06 09:13Z) is NOT CHECKED: the run ended at about 07:31Z, before these times. What triggered the 1 Nov 09:13Z and 2 Nov 07:22Z pushes is NOT CHECKED (no log).
4. Customization edits are not logged: who changed P13's last-minute (and P06's layers on 31 Oct-1 Nov), and when, is NOT CHECKED.
5. Not read live today: overrides on P01, P08, P09, P10, P14 and the Vrbo copies (mirrored per `_from_parent` logs); customizations on P01, P08, P10, P14, P02, P03, P07; the P20 min-stay profile behind 25-26 Dec min 4.
6. P06 booking time on 1 Nov is unknown (`reservations.csv` has the date only), so the PriceLabs price it was booked against (£832 or £891) is unknown.
7. Cause of the P13 3064856 17 Nov drop (£271 -> £170 under an unchanged +35% DSO) is UNKNOWN.
8. One pair of `get_user_logs` calls (group, account) ran in parallel against the one-at-a-time rule; both returned 200 and empty.
