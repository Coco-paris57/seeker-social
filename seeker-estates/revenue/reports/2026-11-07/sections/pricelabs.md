## PriceLabs audit (D = 2026-11-07)

**Sources**
- Snapshot `data/snapshots/2026-11-07/`: `raw/listing_data.json` (06:57Z), `raw/prices_*.json` (06:58-07:14Z, window **8 Nov 2026 - 6 Jan 2027**), `listings.csv`, `prices.csv`, `reservations.csv`. Yesterday: `data/snapshots/2026-11-06/` and `reports/2026-11-06/sections/pricelabs.md`.
- **Live PriceLabs reads, one at a time, 7 Nov ~07:20-07:35Z:**
  - `get_user_logs`: listing, group and account for 6-7 Nov, plus a 5-7 Nov listing control call.
  - `get_listing_data`.
  - `get_listing_date_overrides` for P06 3288517 and P20 3547481.
  - `get_customizations` for P04 3562176.
  - `get_listing_prices` for P08 3318167, 7-8 Nov.
- **Live Smoobu GET `/api/rates`**, 15 apartments, 7 Nov 2026 - 5 May 2027, at **07:19:10Z**. Saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live07pl/smoobu_rates_a.json`; it holds no guest data. It is compared with yesterday's `.../scratchpad/live06pl/smoobu_rates_a.json` (07:18:36Z).
- Booking times come from the Dispatcher's guest-free extract `.../scratchpad/live07/smoobu_mod07_pe.json`. Its timestamps are Smoobu local time (UK; equal to UTC in November).
- `prices.csv` `smoobu_price` equals `pricelabs_price` on all 960 rows, so it is not an independent Smoobu reading. Sync was checked against the live Smoobu pull instead.
- `kpi_pack.json`: `sync_issues`, `bounds`, `market_percentiles` and `avg_open_price_next30` are all **null**. Everything below was recomputed.
- Policy respected:
  - P02/P03/P06/P07 blocks, the P14 special setup, and P13 as one flat.
  - Handbacks: P01 20 Dec, P08 13 Nov, P09 26 Nov, P10 18 Nov, P12 13 Dec.
  - Weekly 15% and monthly 20% stay discounts.
  - P12 17 Nov and P04 2 Dec are deprioritised (numbers only).

### What changed since 6 Nov 06:00Z
- **`get_user_logs`: 0 listing entries, 0 group entries and 0 account entries for 6-7 Nov.**
- The control call for 5-7 Nov returns yesterday's 16 entries (all reyhan@, 5 Nov 10:53:39-10:57:23Z), so the logs endpoint works. **No PriceLabs setting (DSO, base, min, max, customization) has been edited since 5 Nov 10:57:23Z.**
- **Bounds are unchanged** on all 20 listings: base, min, max and sync are identical in `listings.csv` 7 Nov vs 6 Nov.
- Recommended base: P13 3064856 £237 and 3090701 £236 (base 250). P20 £351 (base 330). P04 "Unavailable".
- **P06 overrides are unchanged** (live):
  - 8-14 Nov: -5%, min 2 (last updated 4 Nov 01:28:22Z).
  - 15-22 Nov: min 2 only (4 Nov 12:52:23Z).
- **P04 customizations are unchanged** (live):
  - Last-minute -5% gradual over 15 days.
  - Occupancy profile "Aggressive": -30% to 0% at 0-15 days; -20% to +10% at 16-30 days.
  - Booking Recency default (5-15%).
  - Demand factor Conservative.
  - Far-out +30% after 150 days.
- **Price movements without a log entry** come from the algorithm and the 6 Nov 08:40-08:49Z refresh. The largest is P06 (H2).

---

### CRITICAL

**C1. Push freshness: 7 Smoobu listings and 1 Vrbo copy were last pushed on 6 Nov. They cross 24 h at 08:22-08:49Z today, about 1-1.5 h after this check** (live `get_listing_data`, checked ~07:25Z)

| Ref | Listing | Last refresh / last push | Crosses 24 h |
|---|---|---|---|
| P13 Vrbo copy | `_units_0001_3d48ae56…` | 6 Nov 08:16:57Z / 08:22:36Z | **08:22Z** |
| P06 | 3288517 | 08:40:13Z / 08:40:14Z | 08:40Z |
| P11 | 3064196 | 08:48:26Z / 08:48:27Z | 08:48Z |
| P13 | 3064856 / 3090701 | 08:48:29-30Z / 08:48:30-31Z | 08:48Z |
| P09 | 3318172 | 08:48:45Z / 08:48:46Z | 08:48Z |
| P08 | 3318167 | 08:48:46Z / 08:48:47Z | 08:48Z |
| P04 | 3562176 | 08:48:53Z / 08:48:54Z | 08:48Z |

- **Not past 24 h yet** (about 22 h 35 m to 23 h old at 07:25Z).
- **Pushed 7 Nov:**
  - P02 00:24Z, P05 01:28Z, P20 01:30Z, P03 (Channex) 03:31Z.
  - P07 04:14Z, P14 04:42Z, P01 05:22Z, P10 05:36Z.
  - P12 06:55Z, P12 Vrbo copy 06:44Z, P11 Vrbo copy 07:16Z.
- **Yesterday's watch (t-pl-push-fresh):** all eight listings due at 10:34-10:58Z pushed early, between **6 Nov 08:40:14Z and 08:48:54Z**, about 22 h after the previous push. P12 pushed again at 7 Nov 06:55Z.
  - No log entry covers those refreshes, so they were system cycles or manual "Sync Now". Which one is UNKNOWN.
  - **t-pl-push-fresh: met for 6 Nov.** It needs re-arming for today.
- **What PriceLabs has not yet seen:**
  - P06 18-22 Nov booked (6 Nov 21:22, after P06's 08:40Z refresh). PriceLabs still shows 18-21 Nov open at £247 / £264 / £301 / £308 (H2).
  - The P13 20-25 Dec booking and its cancellation (6 Nov 11:08 / 11:18). The net effect is nil.
- P02 Vrbo copy `_ca1c…` was last pushed **24 Feb 2026** (P02 is fully blocked; unchanged, see M4).
- **Check at ~09:00Z:** PriceLabs > each listing above > `last_date_pushed`. If any still shows 6 Nov, it is past 24 h: Sync Now.

### HIGH

**H1. Sync next 30: PriceLabs = Smoobu on every open night. The 15 Smoobu-below-PriceLabs nights on 8-12 Nov were overwritten by the 6 Nov 08:40-08:49Z pushes** (raw 7 Nov `price` vs live Smoobu 07:19:10Z; yesterday's Smoobu 07:18:36Z)

| Ref | Nights | Smoobu 6 Nov (manual) | **Smoobu now = PriceLabs `price`** | PriceLabs `user_price` now |
|---|---|---|---|---|
| P13 3090701 | 8-11 Nov | £150 / £150 / £150 / £160 | **£161 / £162 / £165 / £170** | £150 / £150 / £150 / £160 |
| P11 3064196 | 10-12 Nov | £175 / £179 / £189 | **£194 / £200 / £209** | £175 / £179 / £189 |
| P04 3562176 | 9-11 Nov | £140 x 3 | **£157 / £157 / £158** | £140 x 3 |
| P09 3318172 | 8-10 Nov | £100 x 3 | **£113 / £110 / £111** | £100 x 3 |
| P06 3288517 | 8-9 Nov | £200 / £200 | **£200 / £200** (now PriceLabs' own floor, M1) | £200 / £200 |

- **15 nights: £2,273 -> £2,467 (+£194).** The new values are PriceLabs' recalculated prices, not yesterday's PriceLabs prices (for example 3090701 8 Nov £173 -> £161).
- **"Your Price" (`user_price`, and `booked_price` on open nights) now holds yesterday's manual Smoobu values.** This confirms that field records the previous value in Smoobu, as on P06 9 Nov (H3).
- **Mismatch count, nights open in PriceLabs or in Smoobu, 8 Nov-6 Jan (`scratchpad/live07pl/sync.py`): 0 on every listing except P06.** On P06, 18-21 Nov (£247 / £264 / £301 / £308) are open in PriceLabs but booked in Smoobu. That is timing (C1, H2), not a price gap. Min stays are equal everywhere.
- 7 Nov is outside the raw window and comes from Smoobu only: P08 £225 min 2, P09 £132 min 2 open.
- **t-smoobu-below-pl: CLOSE** (overwritten). Who typed the manual values is still UNKNOWN: Smoobu keeps no rate history over the API.
- **Check:** if anyone still edits rates in Smoobu by hand, PriceLabs will overwrite those edits on the next push. Use a PriceLabs DSO instead.

**H2. P06 Marylebone 15-22 Nov: PriceLabs opened 15-21 Nov at its 6 Nov 08:40Z refresh. 18-22 Nov then sold on Airbnb at 0.765x the price on sale. PriceLabs still shows 18-21 Nov as open** (raw 6 vs 7 Nov `prices_3288517`; Smoobu rates; `reservations.csv`; mod extract id 162710482)
- **PriceLabs status 15-21 Nov:**
  - 6 Nov raw (refreshed 5 Nov 10:33:59Z): "Blocked".
  - 7 Nov raw (refreshed 6 Nov 08:40:13Z): **open** (`booking_status` empty).
  - So PriceLabs did pick up the 5 Nov 17:31 shortening of Smoobu block 143402691. The ctx line "PriceLabs still blocked 15-21 Nov" is out of date. 22 Nov+ stays "Blocked".
- **The 08:40Z push cut the prices on these nights** (Smoobu followed):

| Night | 6 Nov raw / Smoobu 6 Nov 07:18Z | 7 Nov raw = Smoobu now |
|---|---|---|
| 15 Nov | £265 | £237 |
| 16 Nov | £264 | £237 |
| 17 Nov | £270 | £244 |
| 18 Nov | £277 | £247 |
| 19 Nov | £295 | £264 |
| 20 Nov | £342 | £301 |
| 21 Nov | **£430** | **£308** |

  - There is no DSO or log change behind the cut. Uncustomized on 15-21 Nov is now £243-£332. Which customization drove it is UNKNOWN; P06 customizations were not read.
  - Other P06 nights also fell: 10 Nov £226 -> £204, 11 Nov £238 -> £212.
- **New booking: Airbnb 18-22 Nov, 4 nights**, created 6 Nov 21:22. Room **£856.79**, cleaning £129, commission £152.80.
  - Against the price on sale at booking time (Smoobu after the 08:40Z push, £247 + £264 + £301 + £308 = **£1,120**): **0.765x**. No weekly discount applies (4 nights).
  - Against the pre-push 6 Nov raw (£1,344): 0.637x.
  - The 0.765 matches the hidden Airbnb layer in a-airbnb-rules (channel section).
- **Still open in Smoobu:** 15-17 Nov at £237 / £237 / £244 (£718), min 2. This is now a 3-night run before the booking.
- Policy: P06 is an intentional-block property. **t-p06-1521open is still for Corentin to confirm.** The booking shows the opening is being sold. This is reported as a fact, not a proposal.
- **Check:** PriceLabs > 3288517 > Sync Now after the booking. Then confirm 18-21 Nov shows "Booked" and decide whether 15-17 Nov stays open.

**H3. a-discount-cut recomputed: next 14 £1,108, next 30 £1,897 (yesterday £997 / £1,807)** (raw 7 Nov `uncustomized_price - price`, nights open in PriceLabs AND Smoobu)
- Windows: 8-20 Nov and 8 Nov-6 Dec. The raw starts 8 Nov.
- Excluded: handback nights, P14, P06, P05 9 Nov and P04 2 Dec. P13 premiums are netted.

| Ref | Next 14 | Next 30 | Yesterday n30 |
|---|---|---|---|
| P04 | 8 n £1,285 vs £1,772, **-27.5% (£487)** | 13 n £2,223 vs £2,942, **-24.4% (£719)** | £651 |
| P11 | 6 n -17.7% (£262) | 16 n -11.0% (£428) | £426 |
| P12 | 6 n -11.8% (£198) | 11 n -10.9% (£353) | £407 |
| P05 | 2 n -19.1% (£178) | 6 n -11.0% (£343) | £342 |
| P20 | 8 n -1.9% (£35) | 14 n -7.2% (£275) | £223 |
| P13 3064856 / 3090701 | -£26 / -£14 | -£127 / -£82 | -£135 / -£62 |
| P09 | 5 n +2.1% (-£12) | same | -£22 |
| **Total** | **£1,108** | **£1,897** | **£1,807** |

- **Why it rose:** the window rolled forward a day, and P04's uncustomized prices rose while its customization layers (above) stayed the same. P20's 13 Nov uncustomized rose from £244 to £281 (price £232 to £271).
- **Status: NOT done.**
- **Check:** PriceLabs > 3562176 > Customizations > Last-minute, Occupancy profile and Booking Recency: Custom 0%.

**H4. Plan items, PriceLabs side, status 7 Nov**

| Item | Status | Numbers (raw 7 Nov unless stated) |
|---|---|---|
| t-p06-2pound | **Close** | 9 Nov `price`, `user_price` and `booked_price` are all **£200**, and Smoobu has £200. The £2 is gone from PriceLabs too. £200 is P06's min: uncustomized £189 less the -5% DSO is about £180, clamped to £200 (M1). Airbnb and Booking.com display NOT CHECKED |
| t-pl-push-fresh | **Met 6 Nov; re-arm** (C1) | Due 08:22-08:49Z today |
| t-smoobu-below-pl | **Close** (H1) | Overwritten; +£194 |
| t-p06-1521open | **Still for Corentin** (H2) | PriceLabs open since 6 Nov 08:40Z; 18-22 Nov sold £856.79 |
| a-p13-record | **Not done** | No log entry since 5 Nov, so nothing recorded or confirmed. P13 8-12 Nov -10%: 3064856 **£781**, 3090701 **£830**. P13 7-20 Dec -7%. P04 9-24 Nov -7%: 12 open n **£2,035**. P12 17 Nov -5%: **£242**. P11 darts 13-17 Dec **£1,098** (avg £219.60). P20 base 330, 16-17 Nov min 2 (£213 / £230). Jan-Feb min 3-4 (M2) |
| a-discount-cut | **Not done** (H3) | £1,108 / £1,897 vs £997 / £1,807 |
| a-p12-trim | **Not done; moved up** | Open 30 Nov-3 Dec £260 / £266 / £277 / £284 = **£1,087** (was £1,083). 7-10 Dec £272 / £274 / £288 / £293 = **£1,127** (was £1,034). Min 2. DSO still -5% |
| a-raise-1012nov | **Not done** | 3064856 12 Nov **£162**, min 2 (target >= £176, min 1). 3090701 12 Nov **£172** (was £183), now also below £176 |
| a-handback-lastnights | **Not done; tonight is lost unless changed now** | `reservations.csv` has no P08 stay covering 6 Nov, so it passed unsold. 7 Nov is open in Smoobu at **£225, min 2**, before the 8-14 Nov check-in. That makes a 1-night orphan that min 2 blocks. Live `get_listing_prices`: £225 vs uncustomized **£163** (+38%), "Low Demand", `user_price` £193. Check: PriceLabs > 3318167 > 7 Nov DSO min 1 |
| a-p05-dec | **Not done** | 7-8 Dec £469 / £451 = **£920** (target about £1,171). 13-21 Dec **£5,288** (target about £5,813). Min 3 / 2 |
| a-peak-check | **Not done** | **P13 7-26 Dec:** 3064856 **£4,133** (£4,148), 3090701 **£4,373** (£4,389); 21-26 Dec min 3. **P05 29 Dec:** **£1,346**, min 1 (uncustomized £1,071). **P20 Christmas (below)** |
| t-p12-26nov-price | **Not fixed** | **£323** (was £316), uncustomized £310, min 1, Smoobu £323 |
| t-channel-gaps (P11 23 Dec) | Partly | 23 Dec **£305**, min 2 (target >= £317). 3 Jan £188, min 3 |

- **P20 Christmas** (live overrides; `reservations.csv`; mod extract id 162694102):
  - **Booking:** Airbnb 19-26 Dec, 7 nights, created 6 Nov 09:33. Room **£1,428.00**, cleaning £150, commission £244.59.
  - **Price on sale:** P20's last refresh before the booking was 6 Nov 01:29:53Z. 6 Nov raw 19-25 Dec: £278 / £257 / £281 / £285 / £292 / £294 / £290 = **£1,977** (uncustomized £2,236).
  - **Ratio:** **0.722x**. The policy weekly 15% applies (7 nights), giving £1,680.45. Paid is **0.850x** of that, a further £252 (channel section).
  - **Reyhan's -5% DSOs:** 19-20 Dec (min 3) and 21-26 Dec (no min stay) cover all seven nights. They are part of the gap to uncustomized.
  - **Christmas positioning now:** 21-26 Dec has **one open night, 26 Dec: £310, min 4** (uncustomized £363). 27-28 Dec are min 6 and 29-31 Dec min 5. Reyhan's 21-26 Dec -5% now touches only 26 Dec.
  - PriceLabs repriced the sold nights upward after the booking: 7 Nov raw 19-25 Dec = £2,069.
- **P05 9 Nov (numbers only):** `price` **£1,376** = Smoobu. `user_price` £1,383. Uncustomized **£334** (**4.12x**). Min 1.
- **P04 2 Dec (deprioritised, numbers only):** `price` **£500** = Smoobu. `user_price` £496. Uncustomized **£229** (**2.18x**). Min 1.

### MEDIUM

**M1. Floor and ceiling** (live Smoobu, available nights 7 Nov-5 May, vs PriceLabs min/max; `scratchpad/live07pl/an2.py`)
- **P06: 2 of 7 open nights (29%) at the £200 min** (8-9 Nov). This is now PriceLabs' own output: uncustomized £174 / £189 less the -5% DSO falls below £200.
  - The floor is setting the price on P06's open nights. P06 is an intentional-block property; this is a fact for Corentin, not a proposal.
  - Check: PriceLabs > 3288517 > min price 200, and the 8-14 Nov -5% DSO.
- P09 now 0 of 7 at the £100 min (yesterday 3 of 8).
- P14: 108 of 180 (60%) at £500 (special setup: numbers only).
- All others: 0% at min and 0% at max.

**M2. Min stay vs policy** (Smoobu = PriceLabs wherever both exist)
- **Below 2:**
  - P12 26 Nov (£323).
  - P13 17 Nov, 27 Nov and 1 Dec, both listings.
  - P05 9 Nov (£1,376) and 29 Dec (£1,346).
  - P04 2 Dec (deprioritised).
- **Above 3 inside 2 months:** P20 26 Dec min 4, 27-28 Dec min 6, 29-31 Dec min 5 (P20 DSOs from 11 Oct). P14 weekends min 4 is a special setup.
- **2+ months ahead (from 6 Jan), below 5:**
  - P11 min 3, 6 Jan-28 Feb (54 n).
  - P13 min 3, 6 Jan-4 Feb, then min 4 on Mon-Thu runs to 4 Mar.
  - P05 3 (6-28 Jan) / 4 (Feb).
  - P20 3 (Jan) / 4 (1 Feb-4 Mar).
  - P04 3 (Jan) / 4 (Feb).
- **4+ months ahead (from 7 Mar), below 7:** P11 min 5 (7 Mar-5 May); P13 and P20 min 5-6; P09 25 Apr min 5.
- **Orphan or short runs a gap-fill rule would sell:**
  - **P08 7 Nov (1 n, tonight, min 2: unsellable).**
  - P06 8-11 Nov (4 n) and 15-17 Nov (3 n).
  - P09 7-12 Nov (6 n, £132 + £575).
  - P12 26 Nov (1 n).
  - P13 17 Nov, 27 Nov and 1 Dec (1 n each).
  - P20 26 Dec (1 n inside a min-4 rule).
  - `kpi_pack` has no gaps field.

**M3. Base vs market** (last row per ref in `data/snapshots/2026-11-06/market.csv`; no 7 Nov `market.csv`)

| Ref | Base | P50 | Gap vs P50 | P75 | Gap vs P75 |
|---|---|---|---|---|---|
| P12 | £284 | £203 | **+39.9%** | £234 | +21.4% |
| P09 | £176 | £132 | +33.3% | £158 | +11.4% |
| P20 | £330 | £249 | +32.5% | £316 | +4.4% |
| P04 | £220 | £172 | +27.9% | £217 | +1.4% |
| P13 | £250 | £223 | +12.1% | £274 | -8.8% |
| P11 | £286 | £287 | -0.3% | £327 | -12.5% |
| P01 (2 Nov row) | £253 | £258 | -1.9% | £331 | -23.6% |
| P05 (4 BR) | £550 | £570 | -3.5% | £714 | -23.0% |
| P06 (2 Nov row) | £357 | £405 | -11.9% | £507 | -29.6% |

- P02, P03, P07, P08, P10 and P14: no usable row (UNKNOWN).

**M4. Listing hygiene** (live `get_listing_data`; `data/id_map.json`; `build/properties.py`)
- **All 20 listings: `push_enabled` true, `isHidden` false.**
- **Vrbo copies pushing separately:**
  - P13 `_3d48…`: 6 Nov 08:22:36Z (C1).
  - P11 `_7fd3…`: 7 Nov 07:16:37Z.
  - P12 `_386e…`: 7 Nov 06:44:38Z.
  - **P02 `_ca1c…`: 24 Feb 2026**, `last_refreshed_at` null.
  - Question: should Vrbo copies push at all?
- **`_unmatched`:** the three Marylebone Vrbo ids (`_units_0001_a7f5a076…`, `_4a980bb7…`, `_380ddc1a…`, note "push off") are still absent from PriceLabs' 20 listings. Remove them from `id_map.json`?
- **`confidence: check`:**
  - **P03 is priced via Channex, not Smoobu.** Push on, last push 7 Nov 03:31:57Z, fully blocked (intentional).
  - **P15-P19 have no PriceLabs listing** (t-unmapped). Question: connect the second account?
- **Duplicates:** P13 3064856 and 3090701 share coordinates 51.5088201, -0.2342476. This is one flat by policy, now in sync.
- **Not in the info pack:** P20 Waterford Court 3547481 (min 200, base 330, max 1800). `id_map.json` P20 note says min 220 / base 350.
- **Min/max vs info pack** (`build/properties.py` low/high/base):
  - No change in PriceLabs since 6 Nov.
  - The pack is out of date on several listings: P01 high 450 vs max 650; P04 high 450 vs max 2000; P02 high 350 vs max 800; P03 high 500 vs max 1500. P05 base and P14 were already noted (P14 is a special setup).
  - The pack may simply be stale.

Data gaps:
1. Who typed the 6 Nov manual Smoobu rates is UNKNOWN. Whether the 6 Nov 08:40-08:49Z refreshes were system cycles or manual Sync Now is UNKNOWN (no log entry).
2. Why P06 PriceLabs prices fell 10-28% on 15-21 Nov at the 08:40Z refresh is NOT CHECKED: P06 customizations were not read.
3. Overrides were read live for P06 and P20 only, and customizations for P04 only. For every other listing, no-change rests on `get_user_logs` (0 entries since 5 Nov 10:57Z) plus the raw prices.
4. Channel displays (Airbnb, Booking.com) for P06 9 Nov, P06 15-17 Nov, P05 9 Nov and P08 7 Nov: NOT CHECKED.
5. Raw window is 8 Nov-6 Jan. 7 Nov and 7 Jan-5 May come from Smoobu only, except P08 7 Nov (live `get_listing_prices`).
6. No 7 Nov `market.csv`. P01 and P06 percentiles are from 2 Nov rows.
7. The 18 Oct base-rise tracker (P06 18-22 Nov booking) was not re-run here: NOT CHECKED.
8. The push status after 08:49Z today is NOT CHECKED (this check ran at ~07:25Z).
