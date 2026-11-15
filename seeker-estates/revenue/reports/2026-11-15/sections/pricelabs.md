## PriceLabs audit (D = 2026-11-15)

**Sources**
- Snapshot `data/snapshots/2026-11-15/`: `prices.csv`, `listings.csv`, `reservations.csv`, `raw/listing_data.json`, `raw/prices_*.json`. The raw price files were read 06:57-07:15Z. Every listing except P11 matches the live `last_refreshed_at`. P11 refreshed again at 07:08:47Z, after its raw file was read at 07:00Z.
- Market data: `data/snapshots/2026-11-14/market.csv`, bedroom-matched rows pulled 14 Nov (P09 row 9 Nov). `kpi_pack.json`: `sync_issues`, `gaps`, `bounds`; `market_percentiles` is null for every ref.
- Live PriceLabs reads, 15 Nov 07:21-07:30Z, one call at a time:
  - `get_user_logs`: listing, group and account for 14-15 Nov, plus a control read of listing logs for 10-15 Nov.
  - `get_listing_prices`: P06 3288517 (15-30 Nov), P20 3547481, P04 3562176 (15 Nov-14 Dec) and P11 3064196 (15 Nov-14 Jan).
  - `get_listing_data`.
  - `get_listing_date_overrides`: P06, P20, P04, P12 and P13 3064856.
  - `get_customizations`: P06 and P11.
- Live Smoobu GETs:
  - `/api/rates` for 15 apartments, 15 Nov 2026-13 May 2027, taken **07:21:26Z**.
  - `/api/reservations` modified since 14 Nov, taken 07:21:27Z, 5 records. Guest fields were dropped before saving.
  - Saved in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live15pl/` (`smoobu_rates_a.json`, `smoobu_mod15_pe.json`), with the scripts `sync.py` (sync and status check), `an.py` (a-discount-cut) and `an2.py` (floor, ceiling and orphan runs).
- Policy respected:
  - Blocks P02/P03/P06/P07: P06 gets numbers only.
  - P14 is a special setup (numbers only). P13 is one flat.
  - Handbacks: P12 last night 13 Dec; P01, P09 and P10 are not inventory.
  - 15% / 20% stay discounts; Booking.com +10% markup; Visibility Booster on P11 and P13.
  - Deprioritised items (P04 2 Dec, P12 17 Nov) are not raised. P04 "never fewer than 3 nights" is respected: no min-1/2 proposal.

### Changes since 14 Nov 06:00Z
- **PriceLabs settings: none.**
  - `get_user_logs` has 0 entries for listing, group and account on 14-15 Nov. The control read for 10-15 Nov returns 15 entries; the latest is Reyhan's at 11 Nov 17:16:47Z.
  - Base, min, max and push are unchanged on all 20 listings (`get_listing_data`).
  - Every override read today has `updated_at` on or before 11 Nov 17:16:47Z.
  - Customization changes are not logged. P06 and P11 are live and unchanged from 14 Nov.
- **Refreshes and pushes (live `last_date_pushed`):**
  - 14 Nov: P08 07:32:41Z; P05 / P14 08:08:43Z; **P04 / P06 / P20 08:42:41 / 08:42:42 / 08:42:51Z**; **P11 09:03:17Z**.
  - 15 Nov: P02 00:23Z; P03 Channex 03:13Z; P07 04:18Z; P01 04:36Z; P10 05:15Z; P12 Vrbo 05:26Z; **P12 05:48:43Z**; P11 Vrbo 06:37Z; P09 06:48Z; **P13 twins 06:55:55Z**; **P11 07:08:48Z**.
- **Smoobu, reservations modified since 14 Nov:**
  - New P04 Airbnb 20-24 Nov (162894484, created 14 Nov 20:29).
  - New P12 Booking.com 7-14 Dec (162886727, 13:51).
  - New P13 Booking.com 18-23 Dec on 3064856, linked to 3090701 (162896042, 22:03).
  - P11 9-14 Dec (created 14 Nov 05:48, already known).
  - P04 161276416 (14-18 Nov) modified 14 Nov 11:02:21, with the same amounts as on file.
  - These agree with the Dispatcher.

---

### CRITICAL

**C1. Smoobu-side overwrites are back on P06, P20 and P04 (t-smoobu-manual-1213 has recurred). PriceLabs pushed at 14 Nov 08:42Z, and since then someone or something has written other values into Smoobu for the first open nights of each listing. P11's 9 nights were only a pricing lag and are already in sync.** (live `get_listing_prices` vs live Smoobu `/api/rates` 07:21:26Z; `get_listing_date_overrides`; `get_user_logs`; `prices.csv`)

| Ref | Dates | PriceLabs (live) | Smoobu (live) | PL `user_price` at 14 Nov 08:42Z refresh | Verdict |
|---|---|---|---|---|---|
| P06 3288517 | 15-17 Nov | 247 / 249 / 254 = **£750**, min 2 | **222 / 222 / 233 = £677**, min 2 | 211 / 210 / 216 | Smoobu write after 08:42:42Z. These are **exactly the 12 Nov manual values** (`reports/2026-11-14/sections/pricelabs.md` H1). **-£73** |
| P20 3547481 | 15-17 Nov | 232 / 223 / 239 = **£694**, min 3/2/2 | **200 / 200 / 210 = £610**, min 3/2/2 | 244 / 232 / 238 | Smoobu write after 08:42:51Z. These are new round values, not the 12 Nov ones (270 / 222 / 210 / 222). 15-16 Nov sit at the **£200 PriceLabs min**. **-£84** |
| P04 3562176 | 18-19 Nov | 155 / 158 = **£313**, **min 3** | **175 / 165 = £340**, **min 2** | 148 / 151 | Smoobu write after 08:42:40Z. **Smoobu is higher (+£27), and min stay was cut from 3 to 2.** The 2-night gap only appeared with the 14 Nov 20:29 Airbnb booking. |
| P11 3064196 | 22, 24, 25 Nov; 2, 14, 15, 18 Dec; 8, 14 Jan (±£3-13) | = Smoobu on every night | = PriceLabs | — | **Pricing lag, not a fault.** The snapshot raw was read 07:00Z. PriceLabs refreshed and pushed at 07:08:47-48Z, and live Smoobu equals live PriceLabs on all 26 open nights from 15 Nov to 14 Jan. |

The other causes on the checklist were ruled out as follows:
- **Not sync off:** `push_enabled` is true on all three listings.
- **Not a PriceLabs DSO:**
  - No fixed-price override exists on these dates. The overrides are P06 -10% min 2 (11 Nov 17:12:54Z); P20 15 Nov -5% min 3 and 16-17 Nov -5% min 2; P04 18-19 Nov -5% **min 3**.
  - `get_user_logs` is empty since 11 Nov.
- **Not a whole-push failure:** the same 08:42Z pushes did land on every later date.
  - P06: 22-23 Nov shows 271 / 239 in Smoobu, against a `user_price` of 282 / 290.
  - P20: 20 Nov onwards matches PriceLabs.
  - P04: 20 Nov onwards matches PriceLabs.
- **What is not known:** a push that failed only on these dates cannot be excluded. But on P06 a failed push would have left 211 / 210 / 216 in Smoobu, not 222 / 222 / 233, and on P04 it would not have changed min stay.
- **So the pattern is a Smoobu-side write after the last push.** It fits a manual Smoobu edit; another tool writing to Smoobu is also possible. Smoobu's API records no user, so **who made it is UNKNOWN.**

What this means:
- The next PriceLabs push will overwrite these values again, as it did on 13 Nov.
- That push is due when P04 / P06 / P20 refresh. Their last push crosses 24 h at about **08:42Z today**.
- **P04 policy conflict for Corentin:** Smoobu min 2 on 18-19 Nov contradicts "never open for fewer than 3 nights". This is reported as a conflict, not a proposal.
- **Check:** Smoobu > Rates for P06 15-17 Nov, P20 15-17 Nov and P04 18-19 Nov. Ask who edits Smoobu rates directly. After the next push, confirm Smoobu = PriceLabs and that P04 is back to min 3.

**C2. P04 Barking: PriceLabs has not registered the new Airbnb stay 20-24 Nov. 4 nights that are booked in Smoobu are still "open" in PriceLabs.** (live `get_listing_prices` 3562176; Smoobu reservations and rates)
- **Last refresh is 14 Nov 08:42:40Z**, before the booking was created (14 Nov 20:29, Smoobu time). PriceLabs shows 20-23 Nov open at 161 / 164 / 158 / 157 = **£640**, min 3. Smoobu has them unavailable.
- **The booking is in Smoobu and is synced.** It arrived through Smoobu's Airbnb channel on apartment 3562176, so this Barking Airbnb listing is connected to Smoobu (policy listed that as unconfirmed). Which Airbnb listing ID sent it (for example 1455876748739910219) is not in the Smoobu record.
- **Priced at booking:**
  - Smoobu was £640, the 08:42Z push, which already carries Reyhan's -5% DSO (policy says -8%).
  - Room paid **£489.59 (£122.40/n) = 0.765x Smoobu exactly**. Uncustomized was 206 / 216 / 202 / 200 = £824, so the room is 0.594x that.
  - Commission £97.90 = 15.5% of room plus the £142 cleaning.
  - This is the same hidden 0.765 Airbnb layer seen on P06 (a-airbnb-rules). The stay is 4 nights, so no stay discount applies. Under policy (`airbnb_discount`) the 23.5% gap is unexplained. P04 Airbnb pricing rules: NOT CHECKED.
- **Odd price elements:** the Smoobu record carries "Cancellation Host Fee £97.90" and "Cancellation Payout £533.69", while its type is "modification of booking" (not cancelled). This is a question for the channel agent: is it a cancelled-and-paid stay, or Airbnb's standard element naming?
- **Left open on 18-24 Nov:**
  - 18-19 Nov is a 2-night gap: Smoobu 175 / 165 min 2, PriceLabs 155 / 158 min 3 (C1).
  - 24 Nov is a new 1-night orphan: £164, min 3, cannot sell.
  - Under the P04 rule neither gap sells. Numbers only.
- **Check:** PriceLabs 3562176 > Sync Now. 20-23 Nov should show Booked, and `last_date_pushed` should be after 08:42Z.

### HIGH

**H1. P13 Shepherd's Bush: the new 18-23 Dec stay is registered on 3064856 but not on its twin 3090701. That twin still shows 18-22 Dec open in PriceLabs; Smoobu has them unavailable.** (raw `prices_3090701.json` refreshed 15 Nov 06:55:54Z; Smoobu rates)
- **3090701 in PriceLabs:** 18-22 Dec open at 240 / 244 / 226 / 227 / 229 = **£1,166** (uncustomized £1,325).
- **3064856:** shows them Booked (`booked_date` 14 Nov).
- **The twins' earlier linked stays are registered on both**, for example 6-9 Dec. Only this new one is missing.
- **Effect:** no double-sale, because Smoobu is closed. But 3090701's occupancy feeds its occupancy adjustments and is understated by 5 nights. Policy: the twins' combined bookings are bookings.
- **Check:** PriceLabs 3090701 > Sync Now, then confirm 18-22 Dec show Booked or Blocked.

**H2. t-pl-sync-1411 is fixed. The P11 and P06 bookings were registered by the 14 Nov refreshes, and P11 re-priced upward on its corrected occupancy. P12's new stay is registered too.** (live `get_listing_prices` 3064196 / 3288517; `get_listing_data`; raw `prices_2699998.json`)
- **P11 (09:03:16Z, again 07:08:47Z today):**
  - 28 Nov-1 Dec is Booked (`booked_date` 13 Nov) and 9-13 Dec is Booked (14 Nov).
  - `occupancy_next_30` is **57%**, up from 33% on 14 Nov.
  - Open nights against 14 Nov:
    - 18-19 Nov: 153 / 177 (143 / 166).
    - 22-27 Nov: 205 / 195 / 203 / 208 / 224 / 277 = £1,312 (£1,224).
    - 2-4 Dec: 247 / 263 / 318 = £828 (£662).
    - 8 Dec: 199 (202).
    - 14-18 Dec: 214 / 220 / 215 / 235 / 286 = £1,170 (£1,141).
  - That is **+£301 on 14 open nights.** It resolves yesterday's data gap 4.
- **P06 (08:42:41Z):** 24-28 Nov is Booked (`booked_date` 13 Nov). 29 Nov stays a 1-night orphan (H6).
- **P12 (15 Nov 05:48:42Z):** 7-13 Dec is Booked (`booked_date` 14 Nov). 14 Dec onwards is Blocked (handback).
- **Not yet registered:** P04 20-23 Nov (C2) and P13 3090701 18-22 Dec (H1).

**H3. PriceLabs-side plan items, 15 Nov** (raw `prices_*.json`; live P11 / P04 / P06 / P20; overrides above; Smoobu 07:21:26Z)

| Item | Status | Numbers today (yesterday) |
|---|---|---|
| a-discount-cut | **Not done.** P11's four target settings are unchanged (Aggressive occupancy; Booking Recency default 5-15%; last-minute 0%; far-out +30% after 150 days). P04 / P05 / P20 customizations NOT CHECKED. No log entries. | **Next 14: £280 (£650). Next 30: £1,445 (£1,502).** Four targets: **£559 / £1,525** (£829 / £1,614). Window is 16-29 Nov / 16 Nov-15 Dec, because raw starts 16 Nov; yesterday's was 14-27 Nov / 14 Nov-13 Dec. Next 30 by listing: **P11 14 n £3,103 vs £3,654 (£551, -15.1%)**; **P04 13 n £2,119 vs £2,617 (£498, -19.0%)**; P05 10 n (£345, -6.9%); P20 10 n (£131); P13 3064856 / 3090701 £61 / £27; P12 -£168. The next-14 fall is mostly P04 (20-23 Nov sold) and P12 (17-20 Nov now above uncustomized). Method as yesterday: `uncustomized - price` on nights open in both systems; P11 uses live 07:08Z values; P06, P14, handbacks and P04 2 Dec excluded (`an.py`). |
| a-p12-trim | **Not done; overrides unchanged** (last `updated_at` 10 Nov 16:28:36Z). **The 7-13 Dec block has sold**, so only 9 open nights remain before the 13 Dec handback. | 17-20 Nov 269 / 270 / 270 / 311 = **£1,120** (£1,153), min 2, uncustomized £969 (+5% DSO). 26 Nov £303. 30 Nov-3 Dec 267 / 297 / 299 / 307 = **£1,170** (£1,063), min 2. 7-13 Dec: **sold** (M1). |
| a-p05-dec | **Open.** DSOs not re-read today; logs are empty. | **21 Dec £2,066** (uncustomized £707), min 1. **29 Dec £2,557** (uncustomized £1,046), min 1. 7-8 Dec 466 / 446 = **£912** (£919). 13-14 Dec 492 / 479 = **£971** (£982). Smoobu = PriceLabs. |
| a-peak-check (P13) | **Not done.** Reyhan's -5% (10-26 Dec, min 3, 11 Nov 15:38:45Z) is still set on 3064856 (live read); 3090701 not re-read. **The 18-22 Dec stay sold under it.** | 3064856: 12 open nights, **£2,765** (uncustomized £3,067); 18-22 Dec sold. 3090701: 12 truly open nights £2,545 (uncustomized £2,826), plus 18-22 Dec shown open (H1). The new stay's Smoobu price at booking was 215 / 218 / 203 / 209 / 210 = **£1,055**. Without the -5% it would be about £1,111, so about **£56** of Smoobu price, or about **£45 of room** at the 0.803 paid ratio. This assumes the -5% applied multiplicatively. |
| t-p12-26nov-price | **Not fixed** | 26 Nov **£303** (£306), min 1, uncustomized £279. DSO +15% min 1 unchanged (4 Nov 01:24:21Z). |
| t-p20-5dec-orphan | **Not fixed (6th day)** | 5 Dec **£298** (£306), min 3, uncustomized £373, PriceLabs `unbookable` 1. DSO 1-20 Dec 0% min 3 unchanged (9 Nov 21:25:55Z). |
| t-p11-8dec-orphan | **Not fixed** | 8 Dec **£199** (£202), min 3, uncustomized £280, `unbookable` 1. It sits between the 5-8 Dec and 9-14 Dec stays. P11 has no DSO on it (none logged). |
| t-smoobu-manual-1213 | **Recurred** (C1) | 7 open nights. P06 -£73, P20 -£84, P04 +£27 with min 2. |
| t-pl-sync-1411 | **Fixed** (H2) | New gaps: C2, H1 |

**H4. Reyhan's settings: unchanged since 11 Nov 17:16:47Z. These are conflicts with standing decisions for Corentin to confirm, not proposals** (live overrides; `get_listing_data`; `policy.json`)
- **P04:**
  - 18-24 Nov -5% min 3; 6-22 Dec -5% min 3. Policy says -8% on 1-25 Nov. The new 20-23 Nov stay sold at the -5% price.
  - 15-17 Nov min 2, but those nights are booked.
  - Base 200.
- **P20:**
  - Base 330; policy and `id_map` say 350.
  - Min 2 on 16-17 Nov and 22-24 Nov; policy says min 3 to 30 Nov. Smoobu shows 22-24 Nov at min 2.
- **P13:** -5% on 10-26 Dec, both twins (a-peak-check).
- **P11:** 22 Nov-18 Dec -3% (DSO not re-read today; no logs). The darts nights 13-17 Dec are 228 (booked, 13 Dec) / 214 / 220 / 215 / 235. Policy wants above £300 and +5%.
- **P06:** 15-17 Nov -10% min 2 (numbers only).
- **P14:** min 450 against the £500 special setup (numbers only).
- **P12:** +5% on 15-20 Nov and 30 Nov-3 Dec.
- **P06 oddity:** live PriceLabs has 15-17 Nov at 247 / 249 / 254, *above* uncustomized 198 / 220 / 237, despite the -10% DSO. P06's visible customizations cannot add a premium 0-15 days out: Aggressive occupancy (max 0%), last-minute 0%, recency default. Cause: UNKNOWN (account or group customizations NOT CHECKED).

**H5. Push freshness at 07:25Z** (live `get_listing_data`)
- **Over 24 h now:**
  - **P13 Vrbo copy `_3d48…`**: last push 14 Nov 06:57:11Z, last refresh 06:52:17Z. It is **24 h 28 min** old.
  - **P02 Vrbo `_ca1c…`**: last push 24 Feb 2026, `last_refreshed_at` null, push on.
- **Crossing 24 h today:**
  - P08 3318167 at 07:32Z (handed back, 100% blocked).
  - P05 / P14 at 08:08Z.
  - **P04 / P06 / P20 at 08:42Z.** Their next push is what clears C1 and C2.
- **Within 24 h:** P11 (07:08Z), P13 twins (06:55Z), P12 (05:48Z) and all the rest.
- **Check:** `last_date_pushed` on P04 / P06 / P20 / P05 / P14 after 09:00Z. Should the P13 and P02 Vrbo copies push at all?

**H6. Orphans and min stay vs policy, next 180 nights** (Smoobu 07:21:26Z, `an2.py`. Policy: 2-3 nights; 5 from 15 Jan; 7 from 15 Mar.)
- **Orphans that cannot sell under current min stay:**
  - **P11 8 Dec** £199, 1 night, min 3. A gap-fill rule (min 1) would sell it.
  - **P20 5 Dec** £298, 1 night, min 3. Same.
  - **P06 29 Nov** £258, 1 night, min 4 (numbers only).
  - **P04 24 Nov** £164, 1 night, min 3, new. Under the P04 rule: numbers only.
  - **P04 18-19 Nov** 2 nights. Sellable only because of the Smoobu min 2 (C1). PriceLabs min 3.
- **`kpi_pack` `gaps`** lists only P04 18 Nov (2 n, min 3) and 24 Nov (1 n). It does not list P11 8 Dec, P20 5 Dec or P06 29 Nov, which PriceLabs flags `unbookable` 1.
- **Short runs that can sell:**
  - P11: 18-19 Nov 153 / 177 (min 2); 2-4 Dec 247 / 263 / 318 (min 3, only as exactly 2-5 Dec); 23-25 Dec 281 / 260 / 269 (min 2).
  - P06: 22-23 Nov 271 / 239 (min 2 / 3).
  - P20: 15-17 Nov 200 / 200 / 210 in Smoobu (min 3 / 2 / 2).
  - P05: 16-17 Nov 378 / 391; 29 Nov-2 Dec; 7-8 Dec; 13-14 Dec.
  - P13: 23-26 Dec, 4 nights on each twin (min 3).
- **Min 1 inside 2 months:**
  - P12 26 Nov.
  - P13 17 Nov (244 / 207) and 27 Nov (304 / 258).
  - P13 1 Dec (279 / 223): intentional.
  - P05 21 and 29 Dec.
  - P04 2 Dec: deprioritised.
- **Above 3 inside 2 months:**
  - P20 26 Dec min 4; 27-28 Dec min 6; 29-31 Dec min 5.
  - P06 29 Nov min 4.
  - P14 Fri-Sun min 4 (special setup).
- **2-4 months ahead (15 Jan-14 Mar) below 5:** P11 45 / 59 open nights; P13 46 / 59 per twin; P05 42 / 56; P20 53 / 59; P04 45 / 59.
- **4+ months ahead (15 Mar on) below 7:** P11 60 / 60; P13 60 / 60 per twin; P20 60 / 60. P05 and P04 are at 7 or more.

### MEDIUM

**M1. What the three new stays were priced at. Reported for size; the channel agent owns the stack analysis** (Smoobu reservations; PriceLabs `booked_price` = Smoobu at booking; Smoobu rates 14 Nov 07:21:53Z)
- **P12 7-14 Dec** (7 n, 4 adults):
  - Smoobu at booking was 259 / 249 / 267 / 287 / 317 / 323 / 287 = **£1,989**. Booking.com list (x1.10) was £2,187.90.
  - Room paid **£1,432.42** = **0.720x Smoobu, 0.655x list**.
  - The best fit is Weekly 0.85 x Mobile 0.9 x Genius 0.9 x occupancy 0.95 = 0.654, which predicts £1,431.05. With Genius 15% (0.650) it would be £1,422.71. The breakdown is NOT CHECKED.
  - Commission £237.36 = **15.0%** of room plus cleaning, so no booster.
  - PriceLabs ADR 170.53 is the VAT-stripped room.
- **P13 18-23 Dec** (5 n, 3 adults 2 children, booked on 3064856):
  - Smoobu at booking was 215 / 218 / 203 / 209 / 210 = **£1,055**. List was £1,160.50.
  - Room paid **£847.10** = **0.803x Smoobu, 0.730x list**.
  - Three 10% layers give 0.729 (for example NR x Mobile x Genius L1), which predicts £846.0. That is a fit, not verified.
  - Commission £179.64 = **18.0%**, which is the P13 booster (check-ins to 20 Dec): expected.
- **P04 20-24 Nov:** see C2 (0.765x Smoobu).

**M2. Floor and ceiling, next 180 nights** (Smoobu open nights 15 Nov 2026-13 May 2027 vs live min / max)
- **P14: 68 of 180 open nights (37.8%) at £450 = min.** `kpi_pack` `bounds`: 71.7% of the next 60. Special setup: numbers only.
- **P20: 2 of 153 at the £200 min** (15-16 Nov). This is caused by the Smoobu edit in C1, not by PriceLabs.
- **Every other listing: 0 at min and 0 at max.**
  - Open nights: P11 151, P13 146 per twin, P04 150, P05 130, P12 9, P06 6.
  - P05 peak is £2,557 (29 Dec) against a £3,500 max.

**M3. Base vs market** (`data/snapshots/2026-11-14/market.csv`, last bedroom-matched row per ref; bases unchanged)

| Ref | Base | vs P50 | vs P75 |
|---|---|---|---|
| P12 | £284 | +37.2% (£207) | +21.9% (£233) |
| P09 | £176 | +32.3% (£133) | +10.0% (£160), row from 9 Nov |
| P20 | £330 | +29.4% (£255) | 0.0% (£330) |
| P04 | £200 | +12.4% (£178) | -7.4% (£216) |
| P13 | £250 | +11.1% (£225) | -7.1% (£269) |
| P11 | £286 | -2.1% (£292) | -13.3% (£330) |
| P01 | £253 | -4.5% (£265) | -25.1% (£338) |
| P05 (4 BR) | £550 | -6.0% (£585) | -24.7% (£730) |
| P06 | £357 | -14.2% (£416) | -31.5% (£521) |

- P02, P03, P07, P08, P10 and P14: UNKNOWN (no usable row in `market.csv`).
- `neighbourhood_P13.json` today is an error reply (PriceLabs 500). P13 live market was not re-pulled.

**M4. Listing hygiene and info pack: unchanged from 14 Nov** (live `get_listing_data`; `data/id_map.json` last commit 22 Oct; `/home/user/seeker-social/seeker-estates/build/properties.py` last commit 11 Sep)
- **All 20 PriceLabs listings:** push on, none hidden.
- **Vrbo copies push separately:**
  - P11 `_7fd3…`: 06:37Z.
  - P12 `_386e…`: 05:26Z.
  - P13 `_3d48…`: stale over 24 h (H5).
  - P02 `_ca1c…`: stale since 24 Feb.
  - Question: should the Vrbo copies push?
- **Duplicates:** P13 3064856 and 3090701 share coordinates 51.5088201, -0.2342476. This is one flat by policy; H1 is the cost of PriceLabs treating them separately.
- **`_unmatched`:** the three Marylebone Vrbo listings `_a7f5a076…`, `_4a980bb7…` and `_380ddc1a…` are not among the 20 PriceLabs listings returned. Question: remove them from `id_map.json`?
- **`confidence: check`:**
  - **P03** is priced via **Channex** (100 / 323 / 1500), pushed 03:13Z, fully blocked (intentional).
  - **P15-P19:** no PriceLabs listing. Question: are they priced elsewhere?
- **Not in the info pack:** P20 3547481 (200 / 330 / 1800). Question: is base 330 or 350?
- **Pack vs PriceLabs:** these are differences only, because the pack is out of date. The pack has P04 220, P05 455, P01 230, P06 340, P09 160, P11 260, P12 270, P13 235; P14 min 400 / base 475 against 450 / 525; P05 as "5-bed" against 4 BR in policy.

Data gaps:
1. Who or what wrote the P06 / P20 / P04 Smoobu rates after the 14 Nov 08:42Z push, and the P04 min 2: UNKNOWN. Smoobu's API has no user field and no rate-change log.
2. Why P06 15-17 Nov is priced above uncustomized despite the -10% DSO: UNKNOWN. Account and group customizations are NOT CHECKED.
3. Customizations for P04, P05, P20, P12 and P13: NOT CHECKED today, and customization changes are not in `get_user_logs`. Overrides for P11, P05, P14, P09 and P13 3090701 were not re-read; they are "unchanged" on the strength of empty logs.
4. P04 Airbnb pricing rules (the 0.765 layer) and the "Cancellation Host Fee / Payout" elements on 162894484: NOT CHECKED. Which Airbnb listing ID booked it: UNKNOWN. Booking.com breakdowns for the P12 and P13 stays: NOT CHECKED.
5. The 18 Oct base-rise like-for-like recompute is not done in this section.
6. Market: `kpi_pack` `market_percentiles` is null, the P13 neighbourhood pull failed (500), and the P09 row is from 9 Nov.
7. Smoobu times are shown as Smoobu gives them (taken as UTC+1, inferred on 14 Nov, not verified).
