## PriceLabs audit (D = 2026-11-08)

**Sources**
- Snapshot `data/snapshots/2026-11-08/`:
  - `raw/listing_data.json` (06:55Z).
  - `raw/prices_*.json` (06:56-07:15Z). The window is **9 Nov 2026 - 7 Jan 2027**, so 8 Nov comes from Smoobu only.
  - `listings.csv` and `reservations.csv`.
- Yesterday: `data/snapshots/2026-11-07/` and `reports/2026-11-07/sections/pricelabs.md`.
- **Live PriceLabs reads, one at a time, 8 Nov ~07:20-07:35Z:**
  - `get_user_logs` for listing, group and account, 7-8 Nov.
  - `get_listing_date_overrides` for P12 2699998, P13 3064856, P11 3064196, P05 3166592, P08 3318167, P20 3547481 and P04 3562176.
  - `get_customizations` for P04 and P20.
  - `get_listing_data` (live push status).
- **Live Smoobu GET `/api/rates`**, 15 apartments, 8 Nov 2026 - 6 May 2027, taken **07:18:09Z**. Saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live08pl/smoobu_rates_a.json`; it holds no guest data.
  - A second GET for 7-8 Nov on P08 and P09 was not saved.
  - Compared with yesterday's `.../scratchpad/live07pl/smoobu_rates_a.json` (7 Nov 07:19:10Z).
- Booking creation times come from the Dispatcher's guest-free `.../scratchpad/live08/smoobu_mod08_pe.json`. Its times are Smoobu local time, which is UTC in November.
- Scripts: `.../scratchpad/live08pl/sync.py`, `an.py`, `an2.py`, `gaps.py`.
- `kpi_pack.json` fields `sync_issues`, `bounds`, `market_percentiles` and `avg_open_price_next30` are all **null**. Everything below was recomputed.
- Policy respected:
  - Blocks on P02/P03/P06/P07, the P14 special setup, and P13 as one flat.
  - Handbacks: P01 20 Dec, P08 13 Nov, P09 26 Nov, P10 18 Nov, P12 13 Dec.
  - Weekly 15% and monthly 20% stay discounts.
  - P12 17 Nov and P04 2 Dec are deprioritised, so numbers only.

### What changed since 7 Nov 06:00Z (`get_user_logs`)
- **25 listing entries, all from reyhan@, 7 Nov 12:27:39-12:33:52Z, all "Added Date Specific Override".**
- Group and account logs: 0 entries.
- Base, min, max and sync in `listings.csv` are unchanged on all 20 listings, 7 Nov vs 8 Nov. Only P04's `recommended_base` changed, from empty to 221.

| Time (Z) | Ref / listing | DSO now (live overrides) | Before (7 Nov section) |
|---|---|---|---|
| 12:27:39 | P12 2699998 (+ Vrbo copy) | 12-20 Nov: **no price, min 2** | 17 Nov -5% (policy: +50%, deprioritised) |
| 12:27:45 | P12 2699998 (+ Vrbo copy) | 30 Nov-10 Dec: **no price, min 2** | -5% on 30 Nov-3 Dec and 7-10 Dec |
| 12:27:54 | P12 2699998 (+ Vrbo copy) | 13 Dec **+15%, min 1** | min 2, no DSO price |
| 12:29:40 | P11 3064196 (+ Vrbo copy) | 10 Nov-18 Dec **-2%**, min 2 (includes darts 13-17 Dec) | -5% |
| 12:30:10 | P13 3064856 / 3090701 / Vrbo copy | 8-12 Nov **-5%**, min 2 | -10% |
| 12:30:20 | P13 3064856 / 3090701 / Vrbo copy | 10-20 Dec **-2%**, min 2 | -7% (7-9 Dec stay -7%, now booked) |
| 12:30:51 / 12:30:56 | P05 3166592 | 29 Nov-2 Dec -2% min 3; 13-19 Dec **-2%** min 3 | 13-19 Dec -7% |
| 12:31:20-12:31:48 | P08 3318167 | 7 Nov: +25%, then +35%, then +55%, then **+100%, min 1** | min 2, £225 |
| 12:32:44 / 12:32:55 / 12:33:01 | P20 3547481 | 7-9, 13-17 and 20-24 Nov: **no price, min 2** | -5% / min 3 (policy) |
| 12:33:43 | P04 3562176 | 9-24 Nov **-3%**, min 3 | -7% (policy -8%) |
| 12:33:52 | P04 3562176 | 6-22 Dec -5%, min 3 | Previous value NOT CHECKED |

- Customizations are unchanged on P04 (live):
  - Last-minute -5% gradual over 15 days.
  - Occupancy profile "Aggressive" (-30% to 0% at 0-15 days).
  - Booking Recency on default (5-15%).
  - Demand factor Conservative.
  - Far-out +30% after 150 days.
- No log entries for P06, P09, P01, P02, P03, P07, P10 or P14.

---

### CRITICAL

**C1. Policy conflicts in Reyhan's 7 Nov edits. These are reported for Corentin to confirm, not proposed** (log above; policy.json; raw 8 Nov)
- **P11 darts 13-17 Dec is now -2%.** Policy says darts is +5%, set by Reyhan on 23 Oct and to be left as it is (Corentin, 24 Oct), with an average above £300 a night (21 Oct).
  - Now £221 / £201 / £205 / £215 / £236 = **£1,078, average £215.60**, all open.
  - Check: PriceLabs > 3064196 > DSO 13-17 Dec.
- **P20: the -5% on 7-9 and 13-17 Nov was removed, and min stay was set to 2 on 7-9, 13-17 and 20-24 Nov.**
  - Policy: -5% override 31 Oct-19 Nov, and min 3 nights 25 Oct-30 Nov (Corentin, 24 Oct).
  - Now 13-17 Nov £285 / £246 / £233 / £224 / £242 and 20-24 Nov £252 / £257 / £247 / £333 / £333, all min 2.
  - Effect: 8-9 Nov (£220 / £223) is a sellable 2-night gap.
  - 10-12 and 18-19 Nov keep -5%.
- **P04 9-24 Nov is now -3%.** Policy says -8% on 1-25 Nov (Corentin, 24 Oct).
- **P13 8-12 Nov is now -5% on both twins.** Policy says 0% on these dates (24 Oct).
- **P12 17 Nov has no price override.** Policy (deprioritised) says +50%, which Corentin will not change. Numbers only: 17 Nov £254, min 2, uncustomized £269.

### HIGH

**H1. Push freshness. Yesterday 5 listings crossed 24 h, and the 12:30Z pushes were manual. Today P09 is due 08:16Z and P06 08:20Z** (live `get_listing_data` ~07:30Z; 7 Nov section)
- **Yesterday's crossings.** These five were last pushed 6 Nov 08:22-08:49Z and were not pushed again until Reyhan's edits:

| Listing | Crossed 24 h (7 Nov) | Next push (7 Nov) | Late by |
|---|---|---|---|
| P11 3064196 | 08:48:27Z | 12:30:20Z | 3 h 42 m |
| P13 3064856 / 3090701 | 08:48:31Z | 12:30:42Z | 3 h 42 m |
| P08 3318167 | 08:48:47Z | 12:32:13Z | 3 h 43 m |
| P04 3562176 | 08:48:54Z | 12:34:39Z | 3 h 46 m |
| P13 Vrbo copy `_3d48…` | 08:22:36Z | 12:32:38Z | **4 h 10 m** |

  - P06 (08:20:50Z) and P09 (08:16:19Z) pushed just before 24 h. They have no log entry, so whether that was the system cycle or Sync Now is UNKNOWN.
- **The 12:30-12:34Z pushes were manual.** Each came 13-47 s after Reyhan's DSO save on the same listing:
  - P12: DSO 12:27:54Z, push 12:30:09Z (a 2 m 15 s lag).
  - P11: 12:29:40Z -> 12:30:20Z.
  - P13: 12:30:20Z -> 12:30:42Z.
  - P05: 12:30:56Z -> 12:31:17Z.
  - P08: 12:31:48Z -> 12:32:13Z.
  - P20: 12:33:01Z -> 12:33:57Z.
  - P04: 12:33:52Z -> 12:34:39Z.
  - So t-pl-push-fresh was **not met** on 7 Nov. The system cycle did not push these listings within 24 h.
- **P09 3318172 refreshed at 12:32:12Z but did not push.** It has no DSO and no log entry. `last_date_pushed` is still **7 Nov 08:16:19Z**.
- **Due today (from `last_date_pushed`):**

| Listing | Due (8 Nov, Z) |
|---|---|
| **P09** | **08:16** |
| **P06** | **08:20** |
| P12 | 12:30 |
| P11 | 12:30 |
| P13 x2 | 12:31 |
| P11 Vrbo | 12:31 |
| P05 | 12:31 |
| P08 | 12:32 |
| P13 Vrbo | 12:33 |
| P20 | 12:34 |
| P04 | 12:35 |

  - Pushed overnight, so not due today: P02 00:23Z, P03 (Channex) 03:25Z, P07 04:11Z, P14 04:45Z, P01 05:11Z, P10 05:24Z, P12 Vrbo copy **07:21:12Z** (live).
- **Check at ~08:30Z:** PriceLabs > 3318172 and 3288517 > `last_date_pushed`. If either still shows 7 Nov, press Sync Now. P09 needs it anyway (H2). Check the rest at ~12:45Z.

**H2. Sync, next 30 (8 Nov-7 Dec): PriceLabs = Smoobu on every open night except P09. Three of the four new bookings are fully registered in PriceLabs** (raw 8 Nov vs Smoobu 07:18:09Z; `scratchpad/live08pl/sync.py`)
- **P09 3318172: 2 mismatches, both caused by P09 not pushing since 08:16:19Z (H1):**
  - **12 Nov: PriceLabs £141 vs Smoobu £128 (+£13), open, min 2.** `user_price` holds Smoobu's £128.
  - **11 Nov: PriceLabs shows it open at £132 (`user_price` £120). Smoobu has it closed at £120.** The closure is a Smoobu "Blocked channel" block 162726554 for 11-12 Nov, created 7 Nov 18:37. PriceLabs has not registered it.
  - The block makes 12 Nov a **1-night orphan with min 2 (unsellable)** between the 7-11 Nov and 13-15 Nov stays (M2). Before it, 11-12 Nov was a sellable 2-night gap.
  - Who blocked it is UNKNOWN.
  - Likely causes for the price gap: push failure, or no push cycle since 08:16Z. A sync-off cause is ruled out because `push_enabled` is true. No DSO exists on P09 per the logs. A manual Smoobu edit is ruled out because Smoobu = `user_price`.
  - Check: PriceLabs > 3318172 > Sync Now. Then confirm 11 Nov shows "Blocked", and ask who placed the 11 Nov block.
- **Every other listing: 0 price mismatches over £2 and 0 min-stay mismatches**, 9 Nov-7 Jan. 8 Nov is Smoobu only.
- **The new bookings in PriceLabs** (raw `booking_status` / `booked_date`):

| Booking | Created | PriceLabs status | Price on sale at booking (Smoobu, last push before creation) | Paid room / ratio |
|---|---|---|---|---|
| **P06** Airbnb 18-22 Nov | 6 Nov 21:22 | **Booked** 18-21 Nov (`booked_date` 6 Nov) after the 7 Nov 08:20Z refresh. 22 Nov+ "Blocked" | £247 / £264 / £301 / £308 = £1,120 (7 Nov section) | £856.79 = 0.765x |
| **P09** Airbnb 7-11 Nov | 7 Nov 13:23 | **Booked** 9-10 Nov (`booked_date` 7 Nov). 7-8 Nov are outside the raw window (NOT CHECKED in PriceLabs; closed in Smoobu) | 7 Nov **£154**, 8 Nov £119, 9 Nov £115, 10 Nov £114 = **£502**, from the 08:16:19Z push. Yesterday's 07:19Z Smoobu figures (132/113/110/111) are superseded | **£362.69 = 0.7225x = 0.85 x 0.85 exactly**. 4 nights, so no weekly discount |
| **P20** Airbnb 6-14 Dec | 7 Nov 12:03 | **Booked** 6-13 Dec (`booked_date` 7 Nov). PriceLabs repriced the sold nights afterwards (now £2,517) | 7 Nov raw = Smoobu 07:19Z: £293 / £306 / £277 / £281 / £273 / £288 / £295 / £285 = **£2,298**. Push 01:30Z; the next push was 12:33:57Z, after the booking | **£1,494.25 = 0.6502x** (0.85 weekly x 0.85 x 0.90 = 0.65025). After the policy weekly 15% (£1,953.30) it is 0.765x, **-£459.05** |
| **P13** Booking.com 7-10 Dec | 7 Nov 13:20, **on Smoobu 3064856** | 3064856: **Booked** 7-9 Dec. **3090701: still open in PriceLabs** (`booking_status` empty, `user_price` -1) while Smoobu has it closed (linked block). See M3 | 3064856 £252 / £193 / £191 = **£636**, from the 12:30:42Z push (Reyhan's 7-9 Dec -7% included). Before that push (7 Nov 07:19Z) it was £195 / £194 / £191 | £485.20 = 0.763x PriceLabs, and 0.663x the Booking.com list at +15% (£731.40). Commission £127.04 = 20.0% of room + £150 cleaning (Visibility Booster on for P13). Promotion stack size: £246.20 below list |

- The ratios are context for the channel section; PriceLabs pushed the prices shown.

**H3. a-discount-cut recomputed: next 14 £820, next 30 £1,510 (yesterday £1,108 / £1,897). P04 customizations unchanged, so NOT done** (raw 8 Nov `uncustomized_price - price`, nights open in PriceLabs AND Smoobu; `scratchpad/live08pl/an.py`)
- Windows: 9-21 Nov and 9 Nov-7 Dec (the raw starts 9 Nov).
- Exclusions match yesterday: handback nights, P14, P06, P05 9 Nov and P04 2 Dec. P13 premiums are netted.

| Ref | Next 14 | Next 30 | Yesterday next 30 |
|---|---|---|---|
| P04 | 9 n £1,411 vs £1,925, **-26.7% (£514)** | 14 n £2,378 vs £3,080, **-22.8% (£702)** | £719 |
| P05 | 2 n £180 | 7 n £3,306 vs £3,716, -11.0% (£410) | £343 |
| P11 | 6 n £198 | 16 n £3,497 vs £3,871, -9.7% (£374) | £428 |
| P12 | 6 n £120 | 12 n £3,317 vs £3,563, -6.9% (£246) | £353 |
| P20 | 8 n £7 | 12 n £3,154 vs £3,307, -4.6% (£153) | £275 |
| P13 3064856 / 3090701 | -£93 / -£93 | -£195 / -£167 | -£127 / -£82 |
| P09 | -£13 (12 Nov) | -£13 | -£12 |
| **Total** | **£820** | **£1,510** | **£1,897** |

- **Why it fell:** Reyhan reduced the negative DSOs on P11, P12, P13 and P20 (C1, log). PriceLabs' own discount layers are unchanged.
- **P04 is still the largest gap, at -22.8%** (customizations above).
- **Check:** PriceLabs > 3562176 > Customizations > Last-minute, Occupancy profile and Booking Recency: Custom 0%.

**H4. Status of the plan items on the PriceLabs side, 8 Nov**

| Item | Status | Numbers (raw 8 Nov / Smoobu 07:18Z) |
|---|---|---|
| a-p13-record | **Not done; values moved again** | Nothing is recorded in policy.json. Reyhan's DSOs to record or confirm:<br>- P13 8-12 Nov -5% (was -10%) and 10-20 Dec -2% (was -7%); 21-26 Dec -5% unchanged.<br>- P04 9-24 Nov -3% (was -7%) and 6-22 Dec -5%.<br>- P11 10 Nov-18 Dec -2% (was -5%; darts conflict, C1).<br>- P12 12-20 Nov and 30 Nov-10 Dec price DSOs removed, 13 Dec +15%.<br>- P05 13-19 Dec and 29 Nov-2 Dec -2%.<br>- P20 Nov min 2 with -5% removed on 7-9 and 13-17 Nov.<br>- P13 base 250 is unchanged. |
| a-discount-cut | **Not done** (H3) | £820 / £1,510 vs £1,108 / £1,897 |
| a-p12-trim | **Not done; Reyhan moved the other way** | -5% removed on 30 Nov-3 Dec and 7-10 Dec:<br>- 30 Nov-3 Dec £274 / £280 / £291 / £299 = **£1,144** (was £1,087; target about £973).<br>- 7-10 Dec £286 / £289 / £303 / £308 = **£1,186** (was £1,127; target about £889).<br>- Min 2, all open.<br>The trim lowers a PriceLabs price, so it is Corentin's call. |
| a-raise-1012nov | **Price met on 12 Nov; min not** | Both twins: 10 Nov £173, 11 Nov £177, **12 Nov £181**, min 2. The target was >= £176 with min 1. 3090701's supported figure of about £200 is not met. |
| a-p05-dec | **Partly** | 7-8 Dec £466 / £451 = **£917**, DSO +3% unchanged (target about £1,181). 13-21 Dec **£5,507** (was £5,288; target about £5,837): Reyhan's -7% became -2% (+£219). |
| a-peak-check | **Partly** | **P13 7-26 Dec:**<br>- 3064856 **£4,311**, of which 7-9 Dec is booked (£636) and 17 open nights are £3,675.<br>- 3090701 **£4,500**.<br>- Comparison: P50 £4,895 (7 Nov ref).<br>- 10-20 Dec moved from -7% to -2%; 21-26 Dec is still -5% with min 3 (target min 2 on 25-26 Dec).<br>**P05 29 Dec:** £1,346, +100% DSO, min 1, unchanged (uncustomized £1,067). |
| t-p12-26nov-price | **Not fixed** | 26 Nov **£323**, min 1, DSO +15% (last updated 4 Nov), uncustomized £310. Smoobu £323. |
| t-p12-13dec-orphan | **Min-stay part done; price raised** | Reyhan set 13 Dec min 1 and +15% (12:27:54Z). It is sellable now at **£369** (was £273; uncustomized £351). The plan said keep the price: it is now +35%. |
| a-handback-lastnights (P08 7 Nov) | **Closed: lapsed unsold** | DSO min 1 set at 12:31:48Z, but at +100%. Smoobu 7 Nov (GET this morning) shows **£417, min 1, available**. `reservations.csv` has no 7 Nov stay, so the night passed unsold. The plan was £225 with min 1 (uncustomized £163). |
| t-pl-push-fresh | **Not met 7 Nov** (H1) | Re-arm: P09 08:16Z and P06 08:20Z today |

### MEDIUM

**M1. Floor and ceiling** (Smoobu available nights 8 Nov-6 May vs PriceLabs min/max; `an2.py`)
- **No listing has open nights at its min or max, except P14.**
  - P14: 109 of 180 nights (60.6%) at £500. Special setup, numbers only.
  - P06: 0 of 7 at the £200 min (yesterday 2 of 7). 8-11 Nov are now £219 / £223 / £228 / £236.
- **P06 15-17 Nov are back at £265 / £264 / £270 after the 7 Nov 08:20Z push** (yesterday £237 / £237 / £244). These are the "restore" figures in t-p06-1521open. Opening those nights is still for Corentin to confirm.

**M2. Min stay vs policy, and orphans** (Smoobu = PriceLabs; `gaps.py`)
- **Unsellable now:**
  - **P20 5 Dec: 1 night, min 3, £279.** PriceLabs flags it `unbookable` = 1 (`user_price` £332). It sits between the 25 Nov-5 Dec and 6-14 Dec stays.
    - PriceLabs cut it from £332 to £279, but min 3 blocks it. The cut is 27% below uncustomized £384; why is UNKNOWN, because orphan/gap rules are not exposed by `get_customizations`. P20 shows last-minute 0%, Aggressive occupancy and Booking Recency default.
    - Outside the policy's min-3 window (to 30 Nov).
    - Check: PriceLabs > 3547481 > DSO 5 Dec, min 1.
  - **P09 12 Nov: 1 night, min 2, Smoobu £128 / PriceLabs £141** (H2). Check: DSO 12 Nov min 1, or find out why 11 Nov is blocked.
- **Min 1:**
  - P12 13 Dec (£369, now sellable) and 26 Nov (£323).
  - P13 17 Nov (£207 both), 27 Nov (£332 / £272) and 1 Dec (£309 / £253; intentional per policy).
  - P05 9 Nov (**£1,378** tomorrow; uncustomized £335) and 29 Dec (£1,346).
  - P04 2 Dec (£498, deprioritised).
- **Short runs a gap-fill rule would sell:**
  - P06 8-11 Nov (4 n, from tonight at £219) and 15-17 Nov (3 n).
  - P12 12-13 Nov (2 n, £223 / £257).
  - P11 18-19 Nov (2 n, £158 / £180).
  - P05 16-17 Nov (£371 / £385) and 7-8 Dec (£466 / £451).
  - P20 8-9 Nov (£220 / £223, min 2 from Reyhan's DSO; C1).
  - `kpi_pack` has no gaps field.
- **Above 3 inside 2 months:** P20 26 Dec min 4 (£344), 27-28 Dec min 6 and 29-31 Dec min 5. P14 weekends min 4 (special setup).
- **2+ months ahead (from 7 Jan), below 5:**
  - P11 min 3, 7 Jan-28 Feb (53 n).
  - P13 min 3, 7 Jan-4 Feb, then min 4 on Mon-Thu runs to 4 Mar.
  - P05 3 / 4.
  - P20 3 / 4.
  - P04 3 / 4.
- **4+ months ahead (from 8 Mar), below 7:** P11 min 5; P13 and P20 min 5-6; P09 25 Apr min 5.
- These are unchanged from yesterday apart from the dates rolling forward.

**M3. P13 3090701 does not show the 7-9 Dec linked block** (raw `prices_3090701` vs Smoobu)
- 7-9 Dec have an empty `booking_status` (shown as open) at £206 / £204 / £202. `user_price` is -1, and Smoobu has the nights closed.
- 3064856 shows them "Booked".
- For the 2-7 Dec stay, 3090701 shows 5-6 Dec as "Blocked", so the linked block normally registers.
- Check after the next sync: 3090701 7-9 Dec should show "Blocked". Policy counts it as one flat.

**M4. Base vs market** (last row per ref in `data/snapshots/2026-11-07/market.csv`; no 8 Nov file)

| Ref | Base | P50 | vs P50 | P75 | vs P75 | Row |
|---|---|---|---|---|---|---|
| P12 | £284 | £205 | **+38.5%** | £238 | +19.3% | 7 Nov |
| P09 | £176 | £133 | +32.3% | £160 | +10.0% | 7 Nov |
| P20 | £330 | £251 | +31.5% | £316 | +4.4% | 7 Nov |
| P04 | £220 | £174 | +26.4% | £217 | +1.4% | 7 Nov |
| P13 | £250 | £225 | +11.1% | £276 | -9.4% | 7 Nov |
| P11 | £286 | £290 | -1.4% | £330 | -13.3% | 7 Nov |
| P01 | £253 | £258 | -1.9% | £331 | -23.6% | 2 Nov |
| P05 (4 BR) | £550 | £575 | -4.3% | £720 | -23.6% | 7 Nov |
| P06 | £357 | £405 | -11.9% | £507 | -29.6% | 2 Nov |

- P02, P03, P07, P08, P10 and P14: no usable row (UNKNOWN).

**M5. Listing hygiene and info pack** (live `get_listing_data`; `data/id_map.json`; `build/properties.py`)
- All 20 listings: `push_enabled` true, `isHidden` false. No listing has push off.
- **Vrbo copies pushing separately:**
  - P13 `_3d48…`: 7 Nov 12:32:38Z.
  - P11 `_7fd3…`: 12:31:15Z.
  - P12 `_386e…`: 8 Nov 07:21:12Z.
  - Reyhan's DSOs were copied to them "from parent".
  - **P02 `_ca1c…`: last pushed 24 Feb 2026**, `last_refreshed_at` null.
  - Question: should the Vrbo copies push at all?
- **`_unmatched`:** the three Marylebone Vrbo ids (`_units_0001_a7f5a076…`, `_4a980bb7…`, `_380ddc1a…`, note "push off") are not among PriceLabs' 20 listings.
  - The same applies to P13's `_d0a5f202…` and `_125c15c5…` Vrbo copies, and to the Channex `pricelabs_other` ids on P01, P08, P09 and P10.
  - Question: remove them from `id_map.json` (a-tidy)?
- **`confidence: check`:**
  - **P03 is priced via Channex, not Smoobu.** Push on, last push 8 Nov 03:25:04Z, fully blocked (intentional).
  - **P15-P19 have no PriceLabs listing** (t-unmapped). Question: connect the second account?
- **Duplicates:** P13 3064856 and 3090701 share coordinates 51.5088201, -0.2342476. This is one flat by policy (M3).
- **Not in the info pack:** P20 3547481 (min 200 / base 330 / max 1800). The `id_map` note says 220 / 350.
- **Pack (10 Sep) vs PriceLabs:**
  - Mins match everywhere except P14 (400 vs 500, special setup).
  - **Every max is higher in PriceLabs.** Examples:
    - P01 450 vs 650.
    - P02 350 vs 800.
    - P03 500 vs 1500.
    - P04 450 vs 2000.
    - P05 780 vs 2500.
    - P11 400 vs 1200.
    - P12 400 vs 2000.
    - P13 380 vs 2000.
  - Bases differ on P01 (230 vs 253), P05 (455 vs 550), P06 (340 vs 357), P09 (160 vs 176), P11 (260 vs 286), P12 (270 vs 284) and P13 (235 vs 250). These are the 18-20 Oct rises.
  - The pack is out of date. Nothing changed in PriceLabs since 7 Nov.

Data gaps:
1. The 7 Nov 08:16Z (P09) and 08:20Z (P06) pushes and the 8 Nov overnight pushes have no log entry. System cycle vs manual Sync Now is UNKNOWN. Why P09's 12:32:12Z refresh did not push is UNKNOWN.
2. Push status after 08:16Z today is NOT CHECKED (live read ~07:30Z).
3. Who created the Smoobu block on P09 11 Nov (7 Nov 18:37) is UNKNOWN.
4. Why P20 5 Dec was cut to £279 is UNKNOWN: orphan/gap rules are not exposed by `get_customizations`.
5. Overrides were read live for P12, P13 3064856, P11, P05, P08, P20 and P04. For P06, P09 and the blocked listings, "no change" rests on `get_user_logs` (0 entries) and the raw prices. P04's 6-22 Dec value before 7 Nov is NOT CHECKED.
6. P09 7-8 Nov PriceLabs status is outside the raw window (NOT CHECKED in PriceLabs; Smoobu closed).
7. Prices on sale at booking time are inferred from the last Smoobu values written before creation. A manual Smoobu edit in between cannot be excluded: Smoobu keeps no rate history over the API.
8. No 8 Nov `market.csv`. P01 and P06 percentiles are from 2 Nov rows. The 18 Oct base-rise tracker is not re-run here (NOT CHECKED).
