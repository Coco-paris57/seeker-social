## PriceLabs audit (D = 2026-11-12)

**Sources**
- Snapshot `data/snapshots/2026-11-12/`: `raw/listing_data.json`, `raw/prices_*.json` (window **13 Nov 2026 - 11 Jan 2027**; 12 Nov is Smoobu only), `listings.csv`, `prices.csv`, `reservations.csv`. Yesterday: `data/snapshots/2026-11-11/raw/` and `reports/2026-11-11/sections/pricelabs.md`.
- Live PriceLabs reads, 12 Nov 07:20-07:30Z, one call at a time:
  - `get_user_logs` for listing, group and account, 11-12 Nov.
  - `get_listing_data` (07:20Z).
  - `get_listing_prices` for P11 3064196, 13 Nov-31 Dec.
  - `get_listing_date_overrides` for P11, P20, P04, P13 3064856, P06, P12 and P05.
  - `get_customizations` for P11 (last-minute, occupancy, booking recency, far-out).
- Live Smoobu GET `/api/rates`, 15 apartments, 12 Nov 2026 - 11 May 2027, taken **07:19:30Z**. Saved, with no guest data, to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live12pl/smoobu_rates_a.json`.
- Booking create/modify/cancel times come from the Dispatcher's guest-free `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live12/smoobu_mod12_pe.json` (07:19:50Z).
- Scripts are in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live12pl/`: `sync.py`, `show.py`, `an.py`, `an2.py`, `gaps.py`.
- `kpi_pack.json`:
  - `sync_issues` is empty for every ref.
  - `market_percentiles` is null for every ref, and `gaps` is empty for every ref.
  - `bounds` is present only for P04, P05, P06, P11, P12, P13, P14 and P20.
  - `missing` says market, comps and channel_checks are empty.
- Policy respected:
  - Blocks on P02/P03/P06/P07; P14 special setup (numbers only); P13 is one flat; handbacks.
  - The 15% / 20% stay discounts.
  - Deprioritised P04 2 Dec and P12 17 Nov.
  - Camden's 18% Visibility Booster commission is expected.

### Changes since 11 Nov 06:00Z
- **`get_user_logs` (listing): 9 entries, all by reyhan@seekerestates.com.** The group and account logs have 0 entries. There are no base, min, max or push changes (live `get_listing_data` = 11 Nov values).

| Time 11 Nov (Z) | Listing | Dates | Setting now (live overrides) |
|---|---|---|---|
| 15:38:45 | P13 3064856, copied to 3090701 and to Vrbo `_3d48…` | 10-26 Dec | **-5% min 3** (was -2% min 3) |
| 17:12:54 | P06 3288517 | 11-17 Nov | **-10% min 2** |
| 17:15:52 | P20 3547481 | 13-15 Nov | -5% min 3, re-saved (it was already min 3 on 11 Nov; the previous % is not in the log) |
| 17:15:58 | P20 | 20-21 Nov | -5% min 3, re-saved |
| 17:16:19 | P04 3562176 | 11-24 Nov | **price removed (0%), min 2** |
| 17:16:39 | P04 | 18-24 Nov | **-5% min 3**, which overwrites the line above |
| 17:16:47 | P04 | 6-22 Dec | **-5% min 3** |

  - So on P04, **12-17 Nov is now 0% min 2**. On 11 Nov it was -4% min 3.
  - Each edit was followed by a refresh and push: P13 15:40:06Z (Vrbo 15:46:08Z), P06 17:13:14Z, P20 17:16:23Z, P04 17:17:09Z.
- **Reyhan's 9-10 Nov settings are all still in place** (live `get_listing_data` and overrides):
  - P04 base **200**; P14 min **450**; P05 max **3500**.
  - P05 21 / 29 Dec **+300% min 1**.
  - P11 22 Nov-18 Dec **-3%**, which covers the darts nights 13-17 Dec.
  - P12 12-20 Nov and 30 Nov-3 Dec **+5%**; P12 7-13 Dec 0% min 3.
  - P13 12 Nov -5%.
  - P20 16-17 and 22-24 Nov **min 2**.
  - P11 has no override `updated_at` after 9 Nov 21:21:47Z.
  - P11 customizations are unchanged: last-minute 0%; occupancy "Aggressive"; Booking Recency default (5-15%); far-out +30% after 150 days.
- **Smoobu side:** P11 Booking.com 8-15 Dec was **cancelled 11 Nov 18:03:27 (Smoobu time)** (reservation 162798595, created 10 Nov 17:26). No other create, modify or cancel since yesterday's file.

---

### CRITICAL

**C1. P11 Camden: PriceLabs still holds 8-14 Dec as Booked, 13 h after the cancellation. Smoobu has the 7 nights back on sale at prices PriceLabs computed while they were booked. There is no price gap: Smoobu = PriceLabs on every date** (live `get_listing_prices` and `get_listing_data` 07:20Z; Smoobu 07:19Z; `smoobu_mod12_pe.json`)
- **Refresh and push times:**
  - PriceLabs `last_refreshed_at` is **11 Nov 15:38:27Z**, before the cancellation, which was at 18:03 Smoobu time, i.e. 17:03Z if Smoobu runs at UTC+1.
  - `last_date_pushed` is **11 Nov 07:46:49Z**. It passes 24 h at **07:46Z today**.
  - The 15:38Z refresh was not followed by a push timestamp. This is the second day running.
  - Yesterday's C1 (the 10 Nov 16:28Z refresh) cleared at the 07:46Z push.
- **8-14 Dec on Smoobu: open, min 3.** 261 / 250 / 274 / 329 / 332 / 231 / 208 = **£1,885**.
  - PriceLabs: "Booked (Check-In)" on 8 Dec, then "Booked" through 14 Dec, at the same prices; `user_price` -1.
  - With 15-18 Dec (215 / 225 / 246 / 303, open), Smoobu has an **11-night open run, 8-18 Dec, = £2,874**. It is not an orphan.
- **Smoobu vs PriceLabs:** every one of the 60 dates (13 Nov-11 Jan) is within £2. So "how far Smoobu sits under PriceLabs" = **£0**.
  - Either the 15:38Z refresh produced the same prices that were pushed at 07:46Z, or it was pushed without updating the timestamp. Not provable from the API.
- **Why this matters:** while PriceLabs counts 8-14 Dec as booked, its occupancy for 16-30 / 31-60 days out is overstated. The "Aggressive" profile adds +5% at 80% occupancy and +10% at 100% for 16-30 days out. Booking Recency also treats Camden as recently booked.
  - So the £1,885 now on sale was computed for a calendar that no longer exists. The re-price after a refresh is NOT CHECKED (no refresh yet).
- **The darts nights 13-17 Dec are on sale at 231 / 208 / 215 / 225 / 246, an average of £225.**
  - Policy (21 Oct) says "average above £300/night".
  - Policy (24 Oct) says leave the darts +5% as it is. Reyhan's -3% (9 Nov) replaced it; reported yesterday for Corentin, still open.
- **Other effects:**
  - PriceLabs `occupancy_next_30` for P11 is 60%, and it counts **4 of the 30 nights (8-11 Dec) as booked that Smoobu has open** (7 nights in the next 60).
  - `kpi_pack` forward occupancy may carry the same error. Use Smoobu as truth.
- **Possible causes** (none proven):
  - A cancellation-triggered refresh has not run yet, or ran without pushing.
  - A push failure.
  - Push is on (`push_enabled` true), so "sync off" is ruled out.
  - A manual Smoobu rate edit: NOT CHECKED.
  - A DSO is not the cause: no override was changed since 9 Nov.
- **Who cancelled and why: UNKNOWN.**
  - The Smoobu record is type "cancellation", with no reason field and no "Cancellation Payout" elements (the Airbnb cancellations have them).
  - It still shows basePrice £1,012.86 and commission £209.13.
  - Check the Booking.com extranet reservation 5529197123.
- **Check:** PriceLabs > 3064196 > Sync Now. Then confirm that PriceLabs shows 8-14 Dec open and re-priced, and that Smoobu 8 Dec matches PriceLabs.

**C2. Reyhan's 11 Nov edits add two new conflicts with standing decisions. They are reported for Corentin to confirm, not proposed** (`get_user_logs`; live overrides; `policy.json`)
- **P04 Barking 12-17 Nov is now min 2.** Policy `listing_facts.P04.min_stay_rule` says "Never open for less than 3 nights".
  - Smoobu now sells 12-13 Nov as a 2-night stay: **£146 / £147, min 2**. 14-17 Nov are booked.
  - The -4% is also removed on 12-17 Nov (0%). 18-24 Nov is -5% and 6-22 Dec is -5%. The policy price change of 24 Oct says -8% on 1-25 Nov.
  - P04 open next 30: 18-24 Nov £138-148 (min 3); 6-12 Dec £179-193.
- **P13 10-26 Dec deepened from -2% to -5%**, the opposite direction to open plan item a-peak-check (see H3).
- **P06 11-17 Nov -10% min 2.** This is an intentional-block listing, so numbers only: 15-17 Nov are open at **£245 / £245 / £254, min 2**.
- **Still open from yesterday:**
  - P14 min 450 vs the £500 special setup.
  - P11 -3% over the darts nights.
  - P20 min 2 on 16-17 and 22-24 Nov (policy: min 3 to 30 Nov); P20 base 330 vs policy 350.
  - P05 +300% on 21 / 29 Dec.
  - P12 +5%.
  - P13 12 Nov -5%.
  - `policy.json` has no record of any 9-11 Nov change (a-p13-record).

**C3. Nights lost tonight to blocks or orphans** (Smoobu 07:19Z; raw 12 Nov)
- **P09 12 Nov (tonight): £117, min 2, open but unsellable.** 13-14 Nov are booked. **t-p09-1112block: not fixed; the night passes unsold** unless a DSO of min 1 is set today on 3318172.
- **P11 12-13 Nov: still blocked** in Smoobu (Smoobu rates £207 / £256). PriceLabs shows 13 Nov "Blocked". Smoobu "Blocked channel" 162775668, 10-14 Nov.
  - **t-p11-1013block: not fixed.** Tonight is lost; 12-13 Nov as a 2-night stay = £463.
  - Who set the block and why: UNKNOWN.
- **P13 12 Nov (tonight): open on both twins, £164 / £155, min 2. 13 Nov is blocked or booked, so tonight is unsellable** (DSO 12 Nov -5% min 2, 9 Nov).

### HIGH

**H1. P20 Waterford: the 21-25 Nov cancellation is now reflected. 20-24 Nov are open in PriceLabs and Smoobu and were re-priced at the 17:16Z refresh** (raw 12 Nov; Smoobu 07:19Z; live `get_listing_data`)
- **20-24 Nov:** **242 / 251 / 220 / 254 / 252 = £1,219**; min 3 / 3 / 2 / 2 / 2; `unbookable` 0.
  - Yesterday Smoobu had £1,355 (234 / 301 / 247 / 294 / 279).
  - The uncustomized price fell on 21 Nov from 352 to 287.
- **13-15 Nov fell** to 276 / 291 / 246 (11 Nov: 324 / 340 / 279). The uncustomized price fell from 318 to 247 on 13 Nov.
- **t-pl-push-fresh for P20: met.** Pushed 11 Nov 17:16:23Z, and Smoobu = PriceLabs on every date.
- **t-p20-delivery is still open:**
  - Policy says 20-22 Nov is a delivery block.
  - Smoobu blocks 18-19 Nov.
  - Reyhan re-saved 20-21 Nov at -5% min 3 (17:15:58Z), so those nights are for sale.
  - Question for Corentin: has the delivery moved to 18-19 Nov?

**H2. a-discount-cut recomputed: next 14 £843, next 30 £1,687, or £1,813 counting P11 8-12 Dec, which is open on Smoobu (yesterday £960 / £1,565). Not done: P04/P05/P11/P20 customizations are unchanged** (raw 12 Nov `uncustomized_price - price`; nights open in both PriceLabs and Smoobu; 14 = 13-26 Nov, 30 = 13 Nov-12 Dec; same exclusions as yesterday: handbacks, P14, P06, P04 2 Dec; `an.py`)

| Ref | Next 14 | Next 30 | Yesterday next 30 |
|---|---|---|---|
| P04 | 8 n £1,149 vs £1,585 (£436) | 15 n £2,437 vs £3,081, -20.9% (**£644**) | £536 |
| P11 | 6 n £280 | 12 n £2,806 vs £3,219 (**£413**). Adding 8-12 Dec (Smoobu-open): 17 n, **£539** | £500 |
| P05 | 2 n £125 | 8 n £3,722 vs £4,091 (**£369**) | £413 |
| P20 | 10 n £162 | 11 n £2,827 vs £3,068 (**£241**) | £303 |
| P12 | -£119 | -£52 | -£52 |
| P13 3064856 / 3090701 | -£14 / -£27 | +£42 / +£30 | -£56 / -£69 |
| P09 | 0 open nights | 0 | -£10 |
| **Total** | **£843** | **£1,687** (incl. P11 8-12 Dec: **£1,813**) | **£1,565** |

- **Same-length windows as yesterday** (13-25 Nov / 13 Nov-11 Dec): £865 / £1,534.
- **P04 is up £108**, although Reyhan removed the -4% on 12-17 Nov. The gap is on 18-24 Nov and 6-12 Dec, at -5% on top of the occupancy and recency layers (uncustomized 186-215 vs price 138-148 on 18-24 Nov).
- **Check:** 3562176 / 3166592 / 3064196 / 3547481 > Customizations > Occupancy profile, Booking Recency and Last-minute.

**H3. Status of the PriceLabs-side plan items, 12 Nov** (Smoobu 07:19Z; raw 12 Nov; live overrides)

| Item | Status | Numbers |
|---|---|---|
| a-discount-cut | **Not done** | £843 / £1,687 (H2) |
| a-p12-trim | **Not done** (P12 overrides unchanged since 10 Nov 16:28:36Z) | 18-20 Nov 247 / 257 / 291 = **£795**. 30 Nov-3 Dec 279 / 280 / 270 / 284 = **£1,113** (target about £957). 7-10 Dec 265 / 271 / 280 / 290 = **£1,106** (about £955). 11-13 Dec 319 / 329 / 292 = **£940** (about £803). 12 and 13 Dec are still min 3 before the 14 Dec handback block, so arrivals on those days cannot sell. |
| a-p05-dec | **Open; DSOs unchanged** | 21 Dec **£2,198** (+300%, min 1, uncustomized £723). 29 Dec **£2,777** (+300%, min 1, uncustomized £1,120). Today's raw and Smoobu do not show the £2,230 / £2,786 in the ctx notes; those were 11 Nov values. 7-8 Dec 471 / 452 = **£923** (+3% min 2). 13-14 Dec 518 / 505 = **£1,023** (+5% min 2). |
| a-peak-check (P13) | **Moved the other way (Reyhan 11 Nov 15:38:45Z: 10-26 Dec -2% -> -5%)** | 17 open nights, 10-26 Dec: 3064856 **£3,701** (was £3,807; uncustomized £4,035). 3090701 **£3,760** (was £3,948; uncustomized £4,222). 3064856 10 Dec is £256 with `user_price` £264. The plan asked for 10-12 Dec +5% and 18-26 Dec 0%. For Corentin. |
| t-p12-26nov-price | **Not fixed; price up** | 26 Nov **£298**, min 1 (was £287). DSO +15% unchanged; uncustomized £276. Target about £247. |
| t-p20-5dec-orphan | **Not fixed** | 5 Dec **£313**, min 3, `unbookable` 1. It sits between 25 Nov-5 Dec and 6-14 Dec, both booked. DSO 1-20 Dec 0% min 3 unchanged (9 Nov 21:25:55Z). |
| t-p11-1013block | **Not fixed** | C3 |
| t-pl-push-fresh | **P20 met; P11 not met** | C1 and M1 |

**H4. Orphans and min stay vs policy, next 60 nights** (Smoobu 07:19Z; `gaps.py`, `an2.py`; policy 2-3 nights, 5 from 11 Jan, 7 from 12 Mar)

The ctx orphan list, re-checked:
- **P11 8-15 Dec:** no longer a stay; open as part of an 11-night run (C1).
- **P20 5 Dec:** unsellable (H3).
- **P01 18-20 Dec:** still blocked.
  - Smoobu "Blocked channel" 160657036 (30 Nov-21 Dec) was modified 10 Nov 14:41:27, 36 s after the Airbnb cancellation. PriceLabs shows "Blocked" at £284 / £276 / £246.
  - Policy says the P01 last night is 20 Dec and the gap block is 30 Nov-17 Dec. Question for Corentin: was the extension intended? P01 has 0 open nights in the next 180.
- **P05 21 / 29 Dec:** open, min 1, at £2,198 / £2,777 (a-p05-dec).
- **P12 7-14 Dec:** 7-13 Dec open, min 3; 14 Dec blocked (handback). Arrivals 7-11 Dec can sell; **12 and 13 Dec cannot** (min 3).

Other findings:
- **Unsellable 1-night gaps tonight:** P09 12 Nov £117; P13 12 Nov £164 / £155 (C3).
- **Min 1 inside 2 months:**
  - P12 26 Nov.
  - P13 17 Nov (£228 / £216) and 27 Nov (£322 / £245).
  - P13 1 Dec (£296 / £226): intentional per policy.
  - P05 21 / 29 Dec.
  - P04 2 Dec (£457): deprioritised.
- **Below 3 that conflicts with policy:** P04 12-13 Nov min 2 (C2). P20 16-17 Nov and 22-24 Nov min 2.
- **Above 3 inside 2 months:** P20 26 Dec min 4, 27-28 Dec min 6, 29-31 Dec min 5 (Christmas DSOs, 11 Oct). P14 Fri-Sun min 4 (special setup).
- **Short runs a gap-fill rule would sell:**
  - P11 18-19 Nov (£162 / £183, min 2) and 23-25 Dec (£293 / £270 / £285, min 2).
  - P12 12-13 Nov (£213 / £263) and 17-20 Nov (min 2).
  - P05 16-17 Nov (£381 / £397), 7-8 Dec and 13-14 Dec (min 2).
  - P04 12-13 Nov (now min 2, see C2).
- **2+ months ahead (from 11 Jan) below 5:**
  - P11 min 3 on 11 Jan-28 Feb (49 n).
  - P13 min 3-4 to 11 Mar.
  - P05 Jan min 3 / Feb min 4.
  - P20 Jan min 3 / Feb-11 Mar min 4.
  - P04 Jan min 3 / Feb min 4.
  - P14 min 4 (special setup).
- **4+ months ahead (from 12 Mar) below 7:** P11 min 5 (60 n); P13 and P20 min 5-6; P09 25 Apr min 5.

### MEDIUM

**M1. Push freshness, 07:20Z: nothing is over 24 h yet. P11 3064196 crosses at 07:46Z with an unpushed refresh and an unregistered cancellation (C1)** (live `get_listing_data`)

| Listing | Last push (Z) | Note |
|---|---|---|
| P11 3064196 | 11 Nov 07:46:49 | refreshed 15:38:27, not pushed; cancellation not registered |
| P08 3318167 | 11 Nov 08:12:45 | fully booked to the 13 Nov handback |
| P05 3166592 / P14 3267077 | 11 Nov 08:57:23 / 08:57:29 | |
| P12 2699998 | 11 Nov 09:16:09 | |
| P13 3064856 / 3090701 | 11 Nov 15:40:06 | after Reyhan's edit |
| P13 Vrbo `_3d48…` | 11 Nov 15:46:08 | |
| P06 / P20 / P04 | 11 Nov 17:13:14 / 17:16:23 / 17:17:09 | after Reyhan's edits |

- **Fresh on 12 Nov:**
  - P02 00:23:13Z; P03 Channex 03:28:32Z; P07 03:57:39Z; P01 04:50:59Z; P10 05:17:26Z.
  - P11 Vrbo `_7fd3…` 06:36:40Z; P12 Vrbo `_386e…` 06:51:38Z; P09 07:02:23Z.
- **Stale with push on:** P02 Vrbo `_ca1c…`, last push **24 Feb 2026**, `last_refreshed_at` null.
- **Check:** `last_date_pushed` on 3064196 after 07:46Z and after Sync Now.

**M2. Floor and ceiling, next 180 nights** (Smoobu open nights 12 Nov-10 May vs PriceLabs min/max; `an2.py`; `kpi_pack` `bounds` = next 60)
- **P14: 66 of 180 open nights (36.7%) at £450 = min.** `kpi_pack` gives 60% of 60. Special setup: numbers only.
- Every other listing: 0 nights at min and 0 at max. P05 max is 3500; the highest night is 29 Dec at £2,777.

**M3. Base vs market** (last row per ref in `data/snapshots/2026-11-11/market.csv`; there is no 12 Nov market file; `kpi_pack` `market_percentiles` is null)

| Ref | Base | P50 | vs P50 | P75 | vs P75 | Row pulled |
|---|---|---|---|---|---|---|
| P12 | £284 | £205 | +38.5% | £232 | +22.4% | 11 Nov |
| P09 | £176 | £133 | +32.3% | £160 | +10.0% | 9 Nov |
| P20 | £330 | £252 | +31.0% | £323 | +2.2% | 11 Nov |
| P04 | £200 | £176 | +13.6% | £213 | -6.1% | 11 Nov |
| P13 | £250 | £223 | +12.1% | £266 | -6.0% | 11 Nov |
| P11 | £286 | £289 | -1.0% | £326 | -12.3% | 11 Nov |
| P01 | £253 | £260 | -2.7% | £335 | -24.5% | 11 Nov |
| P05 (4 BR) | £550 | £577 | -4.7% | £721 | -23.7% | 11 Nov |
| P06 | £357 | £405 | -11.9% | £507 | -29.6% | 2 Nov |

- P02, P03, P07, P08, P10 and P14: no usable row (UNKNOWN, `market.csv`).

**M4. Listing hygiene and info pack: unchanged from 11 Nov** (live `get_listing_data`; `data/id_map.json`; `/home/user/seeker-social/seeker-estates/build/properties.py`)
- **All 20 PriceLabs listings:** `push_enabled` true, `isHidden` false.
- **Vrbo copies push separately and inherit DSOs from the parent:**
  - P13 `_3d48…` got the 11 Nov -5%.
  - P11 `_7fd3…` and P12 `_386e…` also push separately.
  - **P02 `_ca1c…` has been stale since 24 Feb 2026.**
  - Question: should the Vrbo copies push at all?
  - Whether the P11 Vrbo copy (refreshed 06:31Z today) shows 8-14 Dec as open: NOT CHECKED.
- **Duplicates:** P13 3064856 and 3090701 share coordinates 51.5088201, -0.2342476. This is one flat by policy.
- **`_unmatched` (`id_map.json`):** the three Marylebone Vrbo ids (`_a7f5a076…`, `_4a980bb7…`, `_380ddc1a…`) are still **not among PriceLabs' 20 listings**. Question: remove them from `id_map.json`?
- **`confidence: check`:**
  - **P03 is priced via Channex, not Smoobu.** Pushed 12 Nov 03:28:32Z; 323 / 100 / 1500; fully blocked (intentional).
  - **P15-P19 have no PriceLabs listing.** Question: priced elsewhere?
- **Not in the info pack:** P20 3547481, PriceLabs 200 / 330 / 1800. `id_map` and policy say base 350. Question: which is right?
- **Pack vs PriceLabs.** The pack is out of date; these are differences, not errors:
  - P04 base 220 vs 200.
  - P14 min 400 / base 475 vs 450 / 525.
  - P05 base 455 / max 780 vs 550 / 3500.
  - P01 230 vs 253; P06 340 vs 357; P09 160 vs 176; P11 260 vs 286; P12 270 vs 284; P13 235 vs 250.

**M5. 18 Oct base-rise tally (arithmetic only).** Take yesterday's figures and remove the cancelled P11 8-15 Dec stay (7 n / £1,012.86):
- **P11: -11 n / -£2,355.27.**
- **Like-for-like total: +8 n / +£3,888.80**; **+12 n / +£4,745.59 including P06**.
- The full method was not re-run here.

Data gaps:
1. The raw window starts 13 Nov. For 12 Nov, PriceLabs status, `uncustomized_price` and `unbookable` are NOT CHECKED; the figures come from Smoobu.
2. Why P11's 15:38:27Z refresh shows no push, and why the cancellation has not triggered a refresh: UNKNOWN. A manual Smoobu edit: NOT CHECKED, because Smoobu has no rate history over the API.
3. What P11 8-14 Dec will re-price to once PriceLabs registers the cancellation: NOT CHECKED (no refresh yet).
4. Who cancelled P11 8-15 Dec and why: UNKNOWN. Smoobu has no reason field; check Booking.com reservation 5529197123.
5. The Smoobu timestamp zone (UTC vs UTC+1) is inferred and not verified.
6. Override values before Reyhan's 11 Nov edits are not in `get_user_logs`. "Was" figures come from the 11 Nov raw prices and min stays and from yesterday's override read.
7. Overrides were not re-read for P13 3090701, P09 and P14 today. "Unchanged" rests on `get_user_logs` (only the 9 entries above). Customization changes are not in the logs: they were read only for P11 today.
8. `kpi_pack` `market_percentiles` is null; the market gap uses the 11 Nov `market.csv` (P06 2 Nov, P09 9 Nov).
9. Who set the P09 11 Nov and P11 10-14 Nov blocks, and who extended the P01 block to 18-20 Dec: UNKNOWN.
