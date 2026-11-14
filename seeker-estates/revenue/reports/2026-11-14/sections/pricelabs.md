## PriceLabs audit (D = 2026-11-14)

**Sources**
- Snapshot `data/snapshots/2026-11-14/`: `raw/listing_data.json`, `raw/prices_*.json` (window 15 Nov 2026 - 13 Jan 2027), `prices.csv`, `listings.csv`, `reservations.csv`. There is no `market.csv` for 14 Nov, so base vs market uses `data/snapshots/2026-11-13/market.csv`. Yesterday's files: `data/snapshots/2026-11-13/raw/`, `reports/2026-11-13/sections/pricelabs.md`, `reports/2026-11-13/daily-report.md` (JSON plan).
- Live PriceLabs reads, 14 Nov 07:18-07:23Z, one call at a time:
  - `get_user_logs`: listing, group and account for 13-14 Nov, plus a control read of listing logs for 11-14 Nov.
  - `get_listing_prices`:
    - P11 3064196, 14 Nov-20 Dec.
    - P06 3288517, 14 Nov-1 Dec.
    - P13 3064856 and 3090701, 14 Nov-26 Dec, read after their 07:20Z refresh.
    - P20 3547481, 14-15 Nov.
  - `get_listing_data`, about 07:20Z.
  - `get_listing_date_overrides` for P11, P06, P04, P20, P12, P05, P13 3064856 and P13 3090701 (December).
  - `get_customizations` for P11: occupancy, booking recency, last-minute and far-out.
- Live Smoobu GETs:
  - `/api/rates` for 15 apartments, 14 Nov 2026 - 13 May 2027, taken twice: **07:19:24Z** (`smoobu_rates_a.json`) and **07:21:53Z** (`smoobu_rates_b.json`, after the P13 push).
  - `/api/reservations` modified since 12 Nov, taken 07:19:25Z, 9 records. Guest fields were dropped before saving (`smoobu_mod14_pe.json`).
  - The files and the scripts `sync.py`, `an.py` and `an2.py` are in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live14pl/`.
- `kpi_pack.json`:
  - `sync_issues` is empty for every ref.
  - `market_percentiles` is null for every ref.
  - `gaps` lists P06 29 Nov (1 night, min 4) and P11 8 Dec (1 night, min 3).
  - `bounds` covers the next 60 days.
- Policy respected:
  - Blocks P02/P03/P06/P07; P14 is a special setup (numbers only); P13 is one flat; handbacks.
  - 15% / 20% stay discounts; Booking.com +10% markup.
  - Camden Visibility Booster at 18%. The new Camden commissions are exactly 18.0% of room plus cleaning, so they are not flagged.
  - Deprioritised items (P04 2 Dec, P12 17 Nov) are not raised.
- **Smoobu clock.**
  - The Smoobu cancellation of P11 26-29 Nov is stamped **13 Nov 11:46:12** (Smoobu time). PriceLabs refreshed P11 at **10:47:05Z**, and that refresh already shows the nights open.
  - This fits Smoobu time = UTC+1, which is inferred, not verified. Below, Smoobu times are given as Smoobu shows them.

### Changes since 13 Nov 06:00Z
- **PriceLabs settings: none.**
  - `get_user_logs` has 0 entries for listing, group and account on 13-14 Nov. The control read returns the known 9 entries; the latest is Reyhan's at 11 Nov 17:16:47Z.
  - Live base, min, max and push settings are identical to 13 Nov on all 20 listings.
  - Every override `updated_at` read today is on or before 11 Nov 17:16:47Z.
- **Refreshes and pushes since yesterday's audit (live `last_date_pushed`):**
  - 13 Nov: P13 07:39:54 / 07:39:57Z; P08 08:10:37Z; P05 / P14 08:32:19 / 08:32:21Z; **P06 / P04 / P20 09:07:38 / 09:07:40 / 09:07:53Z**; **P11 10:47:06Z** (Vrbo copy 10:47:16Z); P13 Vrbo 15:23:12Z.
  - 14 Nov: P02 00:24Z; P03 Channex 03:19Z; P07 03:58Z; P01 04:42Z; P10 05:13Z; P12 Vrbo 05:47Z; **P12 05:49:56Z**; P09 06:49Z; P13 Vrbo 06:57Z; **P13 3064856 / 3090701 07:20:24 / 07:20:27Z** (during this audit).
  - What triggered the 09:07Z and 10:47Z refreshes is UNKNOWN. Sync Now is not in `get_user_logs`.
- **Smoobu (reservations modified since 12 Nov):**
  - P11: cancellation 26-29 Nov (162505051, 13 Nov 11:46:12).
  - P11: new 28 Nov-2 Dec (162878135, created 13 Nov 23:20).
  - P11: new 9-14 Dec (162880151, created 14 Nov 05:48).
  - P06: new Airbnb 24-29 Nov (162877292, created 13 Nov 22:20).
  - P04 161276416 modified 13 Nov 18:14:12 with no change to dates or amounts.
  - These agree with the Dispatcher.

---

### CRITICAL

**C1. P11 Camden: PriceLabs has not registered either new Booking.com stay. 9 nights that are booked in Smoobu are still "open" in PriceLabs and are being priced and occupancy-discounted as unsold. The cancellation is registered.** (live `get_listing_prices` 3064196; `get_listing_data`; Smoobu rates 07:21:53Z; Smoobu reservations)
- **Last refresh is 13 Nov 10:47:05Z** (pushed 10:47:06Z). That is before both bookings were created: 13 Nov 23:20 and 14 Nov 05:48 (Smoobu time).
- **PriceLabs shows these open (`booking_status` "") although Smoobu has them unavailable:**
  - 28 Nov-1 Dec: 260 / 188 / 170 / 176 = **£794**.
  - 9-13 Dec: 197 / 220 / 263 / 266 / 186 = **£1,132**.
- **The cancellation is registered.** 26-27 Nov are open in both PriceLabs and Smoobu at 210 / 261, min 3. 28 Nov belongs to the new stay.
- **Occupancy is understated:**
  - The PriceLabs listing shows `occupancy_next_30` **33%** (it was 43% yesterday).
  - Smoobu has **18 of 30** nights unavailable from 14 Nov to 13 Dec, which is **60%**. That matches the P11 Vrbo copy (60%, refreshed 07:15:49Z) and `kpi_summary` (59%).
- **Why it matters:**
  - P11 runs the **Aggressive** occupancy profile: 0-15 days out, -20% at 30-40% occupancy against -10% at 60%; 16-30 days out, -15% at 30% against 0% at 50-60%.
  - Booking Recency is on at the default, "gradual 5% to 15%" when there have been no recent bookings.
  - Both read PriceLabs' view of the calendar. So the open nights 18-19 Nov (143 / 166), 22-27 Nov (184 / 191 / 189 / 189 / 210 / 261), 2-4 Dec (192 / 211 / 259), 8 Dec (202) and 14-18 Dec (201 / 209 / 216 / 233 / 282) are priced against 33% occupancy, not 60%.
  - The size of the effect is UNKNOWN until PriceLabs re-reads the calendar.
- **Price is in sync:** Smoobu = PriceLabs on all 12 open nights in the next 30 (0 nights off by more than £2).
- **Push freshness:** the last push crosses 24 h at **10:47Z today**.
- **Check:** PriceLabs 3064196 > Sync Now. Then confirm 28 Nov-1 Dec and 9-13 Dec show Booked, `occupancy_next_30` is about 60%, and `last_date_pushed` is after 10:47Z.

**C2. P06 Marylebone (intentional-block listing; numbers only): PriceLabs has not registered the 24-29 Nov Airbnb stay. Since 13 Nov 09:07:38Z it does show 22-29 Nov as open, not Blocked, and has re-priced them.** (live `get_listing_prices` 3288517; Smoobu rates and reservations; `get_listing_date_overrides` 3288517)
- **Yesterday's "still Blocked" is resolved.**
  - The 13 Nov 09:07:38Z refresh (pushed 09:07:38Z) re-priced 22-29 Nov at **282 / 290 / 291 / 293 / 303 / 338 / 328 / 274 = £2,399**.
  - Smoobu had held **£2,982** (346 / 348 / 350 / 353 / 358 / 400 / 445 / 382), so the change is **-£583 (-19.6%)**.
  - `user_price` on those dates is still the old Smoobu figure (346-445), which shows PriceLabs overwrote it.
- **Not registered:**
  - 24-28 Nov is booked in Smoobu (162877292, created 13 Nov 22:20).
  - PriceLabs still shows the nights open at 291 / 293 / 303 / 338 / 328. The last refresh was 09:07:38Z, before the booking.
- **Priced at booking:**
  - Smoobu after the 09:07:38Z push: **£1,553**. Room paid **£1,009.82** (£201.96/n), so **0.650x**.
  - Against the 13 Nov 07:24Z Smoobu prices (350 / 353 / 358 / 400 / 445 = £1,906), the room is 0.530x.
  - 0.650 = 0.765 (the observed Airbnb factor up to 28 days out, `reports/2026-11-13/daily-report.md`) x 0.850.
  - No rule on file explains the 0.850. The P06 Airbnb pricing rules are NOT CHECKED, and the policy lists only the Shepherd's Bush rules: LOS 5+ is -8% / -10%, not -15%.
  - Commission is £176.52 = 15.5% of room plus cleaning.
- **The 22-23 Nov pair:**
  - Open in Smoobu and PriceLabs at **282 / 290 = £572**, with min stay **2 / 3**. 22 Nov carries a min 2 DSO (4 Nov 12:52:23Z).
  - 18-21 Nov and 24-28 Nov are booked, so 22-23 Nov is a 2-night orphan. It **can sell** as a 22-24 Nov arrival.
- **29 Nov is a new 1-night orphan:** **£274, min 4, cannot sell**. It sits between the 24-29 Nov departure and the 30 Nov block start (`kpi_pack` `gaps`).
- **P06 open nights in the next 180:** 15-17 Nov (211 / 210 / 216; Reyhan's -10% min 2), 22-23 Nov and 29 Nov, so 6 in all.
- **Who reopened 22-29 Nov, and why: UNKNOWN** (t-p06-2229open, with Corentin).
- **Check:** PriceLabs 3288517 > Sync Now (24-28 Nov should show Booked). Corentin to confirm the reopening so `policy.json intentional_blocks` can get a date note.

### HIGH

**H1. t-smoobu-manual-1213: fixed. Every 12-13 Nov Smoobu-side cut has been overwritten by PriceLabs pushes, and PriceLabs = Smoobu on every open night in the next 30** (`sync.py`: 0 price, status or min-stay mismatches outside C1 / C2; raw `user_price` = the manual values PriceLabs read before pushing)

| Ref | Dates | Smoobu manual (= `user_price`) | Now in Smoobu = PriceLabs | Overwritten by |
|---|---|---|---|---|
| P12 2699998 | 17-19 Nov | 250 / 250 / 266 | 269 / 275 / 287 | 13 Nov 07:22:41Z; again 14 Nov 05:49:56Z |
| P06 3288517 | 15-17 Nov | 222 / 222 / 233 | 211 / 210 / 216 | 13 Nov 09:07:38Z |
| P20 3547481 | 14-17 Nov | 270 / 222 / 210 / 222 | 282 / 244 / 232 / 238 | 13 Nov 09:07:53Z |
| P04 3562176 | 18-20 Nov | 130 / 135 / 140 | 148 / 151 / 154 | 13 Nov 09:07:40Z |

- **Min stays restored:** P20 15 Nov is min 3 again (Smoobu and PriceLabs). P12 13 Nov has passed.
- **P06 went below its manual level.** PriceLabs re-priced P06 15-17 Nov to 211 / 210 / 216, which is *below* the manual 222 / 222 / 233, under Reyhan's -10% DSO.
- **Who made the edits: still UNKNOWN.** Close the item once Corentin or Reyhan answers.

**H2. Reyhan's settings: all still in place, unchanged since 11 Nov 17:16:47Z. These are conflicts with standing decisions for Corentin to confirm, not new proposals** (live overrides; `get_listing_data`; `policy.json`)
- **P04:**
  - 14-17 Nov min 2 (policy: never under 3; 14-17 Nov is booked, so no effect).
  - 18-24 Nov -5% min 3, and 6-22 Dec -5% min 3. Policy price change of 24 Oct says -8% on 1-25 Nov.
  - Base 200.
- **P11:** 22 Nov-18 Dec **-3%**.
  - The darts nights 13-17 Dec are 186 / 201 / 209 / 216 / 233, an average of **£209**. Policy wants above £300 and "leave the darts override (+5%)".
  - **13 Dec has now sold at £186** inside the 9-14 Dec stay.
- **P13:** 10-26 Dec -5% min 3 on both twins (11 Nov 15:38:45Z).
- **P20:**
  - Min 2 on 16-17 Nov and 22-24 Nov. Policy says min 3 from 25 Oct to 30 Nov.
  - Base 330; policy and `id_map` say 350.
- **P05:**
  - 21 and 29 Dec +300% min 1; max 3500; 29 Nov-2 Dec -5%.
  - Also 13-14 Dec +5% and 7-8 Dec +3% (30 Oct).
- **P12:** 14-20 Nov and 30 Nov-3 Dec +5%.
- **P14:** min 450 vs the £500 special setup (numbers only).
- **P06:** 14-17 Nov -10% min 2 (numbers only).
- **NOT CHECKED today:** P14 and P09 overrides. Customizations other than P11.

**H3. PriceLabs-side plan items, 14 Nov** (live and raw prices; overrides above; Smoobu 07:21:53Z)

| Item | Status | Numbers today (yesterday) |
|---|---|---|
| a-discount-cut | **Not done.** P11's four target settings are unchanged (Aggressive; Recency default; last-minute 0%; far-out +30%). P04 / P05 / P20 customizations NOT CHECKED today; no log entries. | **Next 14: £650 (£633). Next 30: £1,502 (£1,875).** Four targets: £829 / £1,614 (£790 / £1,962). Next 30 by listing: P04 15 n £2,387 vs £3,149 (**£762**, -24.2%); P11 12 n £2,397 vs £2,954 (**£557**, -18.9%); P05 9 n (**£244**); P20 9 n (**£51**); P13 3064856 / 3090701 **£117 / £52**; P12 **-£281**. P11 fell because 9 nights are now booked in Smoobu. Method as yesterday: `uncustomized - price` on nights open in both systems; P13 uses the live 07:20Z values; P06, P14, handbacks and P04 2 Dec excluded (`an.py`). |
| a-p12-trim | **Not done.** P12 overrides unchanged (last `updated_at` 10 Nov 16:28:36Z). | After the 14 Nov 05:49Z refresh: **17-20 Nov 269 / 275 / 287 / 322 = £1,153** (£1,120), min 2. **30 Nov-3 Dec 252 / 267 / 269 / 275 = £1,063** (£1,077). **7-10 Dec 259 / 249 / 267 / 287 = £1,062** (£1,083). **11-13 Dec 317 / 323 / 287 = £927** (£872). 12-13 Dec are still min 3 before the 14 Dec handback. |
| a-p05-dec | **Open; DSOs unchanged** (21 Dec 9 Nov 14:08:13Z; 29 Dec 14:08:30Z) | **21 Dec £2,073** (uncustomized £696), min 1. **29 Dec £2,647** (uncustomized £1,086), min 1. **7-8 Dec 471 / 448 = £919** (£949). **13-14 Dec 496 / 486 = £982** (£975). Smoobu = PriceLabs. |
| a-peak-check (P13) | **Not done; Reyhan's -5% still set** | 10-26 Dec, all 17 nights open, live 07:20Z: **3064856 £3,717** (uncustomized £4,137; yesterday £3,721); **3090701 £3,622** (uncustomized £4,059; yesterday £3,705). |
| t-p12-26nov-price | **Not fixed** | 26 Nov **£306**, min 1, uncustomized £290 (yesterday £306 / £283). DSO +15% unchanged (4 Nov 01:24:21Z). |
| t-p20-5dec-orphan | **Not fixed (5th day)** | 5 Dec **£306** (£313), min 3, uncustomized £383. 4 and 6 Dec are booked. DSO 1-20 Dec 0% min 3 unchanged (9 Nov 21:25:55Z). |
| t-smoobu-manual-1213 | **Fixed** (H1) | 0 mismatches in the next 30 |
| t-p06-2229open | **Open (who / why UNKNOWN).** Now partly sold. | C2 |

**H4. Push freshness: nothing is over 24 h at about 07:21Z, but six Smoobu listings cross 24 h today unless they refresh** (live `get_listing_data`)

| Listing | Last push (Z) | Crosses 24 h at |
|---|---|---|
| P08 3318167 | 13 Nov 08:10:37 | 08:10Z (handed back after 13 Nov; 100% blocked) |
| P05 3166592 / P14 3267077 | 13 Nov 08:32:19 / 08:32:21 | 08:32Z |
| P06 3288517 / P04 3562176 / P20 3547481 | 13 Nov 09:07:38 / 09:07:40 / 09:07:53 | 09:07-09:08Z |
| P11 3064196 (+ Vrbo `_7fd3…`) | 13 Nov 10:47:06 (10:47:16) | 10:47Z |

- **P11 Vrbo copy** refreshed 14 Nov 07:15:49Z but was **not pushed**.
- **Stale with push on:** P02 Vrbo `_ca1c…`, last push **24 Feb 2026**, `last_refreshed_at` null.
- **Check:** `last_date_pushed` on these listings after 11:00Z. The P11 and P06 refreshes are also what fixes C1 and C2.

**H5. Orphans and min stay vs policy, next 180 nights** (Smoobu 07:21:53Z, `an2.py`. Policy: 2-3 nights; 5 from 14 Jan; 7 from 14 Mar.)
- **New orphans from the overnight bookings:**
  - **P11 8 Dec, 1 night, £202, min 3: cannot sell.** It sits between the 5-8 Dec stay and the new 9-14 Dec stay. A gap-fill rule (min 1) would sell it.
  - **P11 2-4 Dec, 3 nights, 192 / 211 / 259 = £662, min 3.** It sells only as exactly 2-5 Dec.
  - **P11 14 Dec is not an orphan.** 14-18 Dec is a 5-night run (201 / 209 / 216 / 233 / 282) before the 19 Dec stay.
  - **P11 26-27 Nov rejoined 22-27 Nov** (6 nights, 184-261, min 3).
  - **P06 29 Nov** £274, min 4: cannot sell (C2).
  - **P06 22-23 Nov:** can sell (C2).
- **Other short runs:**
  - P20 5 Dec cannot sell (H3).
  - P20 14-17 Nov: 282 / 244 / 232 / 238, min 3 / 3 / 2 / 2.
  - P11 18-19 Nov: 143 / 166, min 2.
  - P11 23-25 Dec: 276 / 259 / 266, min 2.
  - P12: 17-20 Nov; 26 Nov (min 1); 30 Nov-3 Dec (min 2).
  - P05: 16-17 Nov 380 / 394 (min 2); 29 Nov-2 Dec (min 3); 7-8 Dec; 13-14 Dec.
- **Min 1 inside 2 months:**
  - P12 26 Nov.
  - P13 17 Nov (242 / 218) and 27 Nov (303 / 273).
  - P13 1 Dec (276 / 221): intentional per policy.
  - P05 21 / 29 Dec.
  - P04 2 Dec £410: deprioritised.
- **Above 3 inside 2 months:**
  - P20 26 Dec min 4; 27-28 Dec min 6; 29-31 Dec min 5.
  - P06 29 Nov min 4.
  - P14 Fri-Sun min 4 (special setup).
- **2-4 months ahead (14 Jan-13 Mar) below 5:** P11 46 of 59 open nights; P13 46 / 59 on each twin; P05 43 / 56; P20 54 / 59; P04 46 / 59; P14 special setup.
- **4+ months ahead (14 Mar on) below 7:** P11 60 / 60; P13 60 / 60 on each twin; P20 60 / 60. P05 and P04 are at 7 or more.
- **P04:** no open run of 4 nights or fewer apart from 2 Dec. 18-24 Nov is open at 148-157, min 3.

### MEDIUM

**M1. P11: what the nights were priced at when booked, raw 13 Nov vs today. The paid rates match the Booking.com promotion stack, so this is reported for size, not as a leak** (raw `prices_3064196.json` 13 and 14 Nov; Smoobu reservations)
- **Cancelled 26-29 Nov** (booked 3 Nov):
  - Room £680.40, commission £149.29 (18.0% of room plus £149 cleaning).
  - When the stay was cancelled, PriceLabs dropped those nights from 236 / 293 / 292 (£821) to **210 / 261 / 260 (£731)**. Once reopened, the occupancy adjustments apply to them.
- **New 28 Nov-2 Dec** (4 nights, 4 adults):
  - Smoobu at booking = PriceLabs after the 10:47Z push: 260 / 188 / 170 / 176 = **£794**. On the 13 Nov raw it was £826, when 28 Nov was still £292 inside the old stay.
  - Booking.com list = £794 x 1.10 = £873.40. Room paid **£605.29**, which is **0.693x list** and 0.762x Smoobu.
  - Commission £135.77 = 18.0% of room plus cleaning (booster).
- **New 9-14 Dec** (5 nights, 3 adults):
  - Smoobu = PriceLabs on both days: 197 / 220 / 263 / 266 / 186 = **£1,132**. Booking.com list £1,245.20.
  - Room paid **£863.61 = 0.694x list**. Commission £182.27 = 18.0%.
- **Both stays fit the Booking.com promotion stack.** 0.9 Mobile x 0.9 Genius L1 x 0.9 Last Minute (within 30 days) x 0.95 occupancy = **0.6926**. That predicts £604.87 and £862.38, within £1.23 of what was paid.
  - The breakdown of each stay is NOT CHECKED (no Booking.com reservation detail). The 0.95 occupancy step is assumed from the P04 / NR occupancy pricing in policy.
  - For a-p11-bcom-stack, the channel agent owns the analysis.
- **Net P11 change:** -3 nights / -£680.40, then +9 nights / +£1,468.90. That is **+6 nights, +£788.50 room**.

**M2. Floor and ceiling, next 180 nights** (Smoobu open nights 14 Nov 2026 - 12 May 2027 vs live min / max; `kpi_pack` `bounds` = next 60)
- **P14: 71 of 180 open nights (39.4%) at £450 = min.** `kpi_pack`: 0.7 of 60. Special setup: numbers only.
- **Every other listing: 0 nights at min and 0 at max.**
  - Open nights: P11 150, P13 150 per twin, P20 153, P04 153, P05 129, P12 16, P06 6.
  - P05: max 3500, highest night £2,647 (29 Dec).

**M3. Base vs market: unchanged from 13 Nov.** Bases are unchanged, and no new `market.csv` exists. Last bedroom-matched row per ref, `data/snapshots/2026-11-13/market.csv`:

| Ref | Base | vs P50 | vs P75 |
|---|---|---|---|
| P12 | £284 | +37.2% (P50 £207) | +22.4% (P75 £232) |
| P09 | £176 | +32.3% (£133) | +10.0% (£160), row from 9 Nov |
| P20 | £330 | +29.4% (£255) | +1.2% (£326) |
| P04 | £200 | +12.4% (£178) | -7.4% (£216) |
| P13 | £250 | +11.1% (£225) | -6.7% (£268) |
| P11 | £286 | -1.7% (£291) | -13.1% (£329) |
| P01 | £253 | -3.8% (£263) | -24.9% (£337) |
| P05 (4 BR) | £550 | -5.7% (£583) | -24.5% (£728) |
| P06 | £357 | -11.9% (£405) | -29.6% (£507), row from 2 Nov |

- P02, P03, P07, P08, P10 and P14: UNKNOWN (no row in `market.csv`).

**M4. Listing hygiene and info pack: unchanged from 13 Nov** (live `get_listing_data`; `data/id_map.json`; `/home/user/seeker-social/seeker-estates/build/properties.py`, last commit 22 Oct)
- **All 20 PriceLabs listings:** `push_enabled` true, `isHidden` false.
- **Vrbo copies push separately:**
  - P13 `_3d48…`: pushed 14 Nov 06:57Z.
  - P11 `_7fd3…`: refreshed 07:15Z, not pushed since 13 Nov 10:47Z.
  - P12 `_386e…`: pushed 05:47Z.
  - P02 `_ca1c…`: stale since 24 Feb 2026.
  - Question: should the Vrbo copies push at all? The P11 copy currently reads the correct 60% occupancy while its parent reads 33%.
- **Duplicates:** P13 3064856 and 3090701 share coordinates 51.5088201, -0.2342476. This is one flat by policy.
- **`_unmatched`:** Marylebone Vrbo `_a7f5a076…`, `_4a980bb7…` and `_380ddc1a…` are not among PriceLabs' 20 listings. Question: remove them from `id_map.json`?
- **`confidence: check`:**
  - **P03** is priced via **Channex**: 100 / 323 / 1500, pushed 14 Nov 03:19Z, fully blocked (intentional).
  - **P15-P19:** no PriceLabs listing. Question: are they priced elsewhere?
- **Not in the info pack:** P20 3547481, PriceLabs 200 / 330 / 1800. Question: is base 330 or 350?
- **Pack vs PriceLabs.** The pack is out of date (22 Oct), so these are differences, not errors.
  - Base: P04 220 vs 200; P05 455 vs 550; P01 230 vs 253; P06 340 vs 357; P09 160 vs 176; P11 260 vs 286; P12 270 vs 284; P13 235 vs 250.
  - P14: min 400 / base 475 vs 450 / 525.
  - Every PriceLabs max is above the pack "high".
  - The pack says P05 is "5-bed"; policy says 4 bedrooms.

Data gaps:
1. Who made the 12-13 Nov Smoobu edits, and who / why reopened P06 22-29 Nov: UNKNOWN. Neither Smoobu record has a user field.
2. What triggered the 13 Nov 09:07Z (P04 / P06 / P20) and 10:47Z (P11) refreshes, and when P11 / P06 will next refresh: UNKNOWN. Sync Now is not in `get_user_logs`.
3. P06 Airbnb pricing rules (the 0.850 residual in C2): NOT CHECKED. Booking.com breakdown of the two P11 stays: NOT CHECKED.
4. The effect on P11's open-night prices of the understated occupancy (33% vs 60%): UNKNOWN until PriceLabs re-reads the calendar.
5. NOT CHECKED today: overrides for P14, P09, and P13 3090701 outside December; customizations for every listing except P11. "Unchanged" rests on `get_user_logs`, which does not log customization changes.
6. Smoobu timestamps taken as UTC+1: inferred from the P11 cancellation and refresh timing, not verified.
7. Market: `kpi_pack` `market_percentiles` is null, there is no 14 Nov `market.csv`, and the P06 (2 Nov) and P09 (9 Nov) rows are old.
