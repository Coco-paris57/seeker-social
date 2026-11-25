## PriceLabs audit (D = 2026-11-25)

**Sources**
- Snapshot `data/snapshots/2026-11-25/`: `raw/listing_data.json` (21 listings, none added or removed), `raw/prices_*.json` (window 26 Nov 2026-24 Jan 2027, 17 files incl. 3588993), `listings.csv`, `prices.csv`, `reservations.csv`, `market.csv` (already copied forward by another agent; 25 Nov rows present). Baseline: `data/snapshots/2026-11-24/raw/*`, `reports/2026-11-24/sections/pricelabs.md`, Smoobu rates 24 Nov 07:20:44Z (`scratchpad/pl24/smoobu_rates.json`).
- Live PriceLabs reads, 25 Nov about 07:25-07:45Z, all 200, all read only, **each call sent alone**. No write, sync or refresh tool was called.
  - `get_user_logs` listing, then group, then account, 24-25 Nov.
  - `get_listing_date_overrides`: P11 3064196, P04 3562176, P05 3166592, P20 3547481, P13 3064856, P12 2699998.
  - `get_customizations`: P12 2699998 (all), P04 3562176 (last-minute, occupancy, booking recency).
- Live Smoobu reads (GET only), taken **07:24:35Z**: `/api/rates` for 16 apartments 25 Nov 2026-24 May 2027; `/api/reservations` 15 Nov 2026-31 Dec 2029 (only dates, created / modified times, type, channel, amount, commission kept; no guest fields).
- Scripts and data: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/pl25/` (`an25.py`, `det25.py`, `disc25.py`, `smoobu_rates.json`, `smoobu_res.json`).
- **Policy respected:** P02/P03/P06/P07 blocks intentional (P06 numbers only); P14 special setup (numbers only); P13 is one flat; 15% / 20% stay discounts and Visibility Booster are policy; P04 never under 3 nights; handbacks (P01, P08, P09, P10, P12 after 13 Dec) excluded. Reyhan's policy conflicts go to Corentin as **confirm or revert**.
- **Smoobu clock:** new evidence for CET (UTC+1). Smoobu logs the P06 block change at 14:13:44; Reyhan's matching P06 DSO is logged 13:14:35Z and PriceLabs refreshed P06 at 13:15:16Z already showing 6-12 Dec open. Read as 13:13:44Z, the block change came 51 s before the DSO. Still NOT CONFIRMED.

### Changes since 24 Nov 06:00Z
- **PriceLabs listing logs: 10 entries, all Reyhan, two sessions (24 Nov 10:48:14-10:54:54Z from IP `2a01:4b00:…`; 13:14:35Z from `2a00:23ee:…`).** Group and account logs: 0. No `remove_custom_pricing` entry.

| Time (Z) | Listing | Dates | Change (live override confirms) |
|---|---|---|---|
| 10:48:14 | P11 3064196 (+ Vrbo copy `_7fd3…`) | 30 Nov-4 Dec | **-2% removed**, min 2 kept |
| 10:48:20 | P11 3064196 (+ Vrbo copy) | 14-18 Dec | **-2% removed**, min 2 kept |
| 10:50:38 | P05 3166592 | 29 Nov-2 Dec | **-5% -> -8%**, min 3 |
| 10:51:18 | P20 3547481 | 24 Nov (same night) | **+25%, min 1** (night went unsold) |
| 10:52:35 | P04 3562176 | 6-23 Dec | **-2% -> -5%**, min 3 |
| 10:54:33 / 10:54:54 | 3588993 Scott Ellis | 17-19 Dec; 7-9 Jan | min 3, no price |
| 13:14:35 | P06 3288517 | 6-13 Dec | min 3, no price |

- **Settings** (`listing_data.json`, 24 vs 25 Nov): every base, min, max, push and hidden flag unchanged on all 21 listings.
- **Smoobu changes** (`modifiedAt`, Smoobu clock):
  - **P12 Booking.com 4-7 Dec rebooked** (created 24 Nov 20:39; Smoobu total £916.54, commission £137.48; room £766.54 per `reservations.csv`).
  - **3588993 Booking.com 30 Dec-4 Jan, 5 n** (created 24 Nov 23:47; Smoobu total £2,388.40, commission £358.26 = 15.0%). Smoobu rates on 24 Nov for those nights: 619 / 618 / 502 / 466 / 339 = £2,544, so the total is 0.94x (whether the total includes cleaning is NOT KNOWN; unmapped flat).
  - **P06 handback-style block moved from 6 Dec to 13 Dec start** (modified 24 Nov 14:13:44): 6-12 Dec now open (H4).
  - No cancellations.

---

### CRITICAL

**C1. t-pl-push-1811 (day 8): NOT closable. The 24->25 Nov night was not clean. The same 9 Smoobu listings got no overnight refresh; their 24 Nov refreshes were daytime, and 6 of the 9 came 30-140 s after one of Reyhan's saves.** (Sources: `raw/listing_data.json` `last_refreshed_at` / `last_date_pushed`; `get_user_logs` 24-25 Nov; Smoobu `/api/reservations` 07:24:35Z.)

| Listing | Logged edit (24 Nov) | Refresh / push (24 Nov) | Reading | 24 h stale at (25 Nov) |
|---|---|---|---|---|
| P12 Vrbo `_386e…` | none | 08:32:19Z / 08:33:21Z | no edit; trigger NOT KNOWN | 08:33Z |
| P13 Vrbo `_3d48…` | none | 09:10:33Z / 09:17:48Z | no edit | 09:17Z |
| P13 3090701 | none | 09:37:59Z / 09:38:00Z | **no edit**; trigger NOT KNOWN | **09:38Z** |
| P13 3064856 | none | refresh **10:50:13Z** / push **09:38:04Z** | no edit; refreshed again inside Reyhan's session **without pushing** | **09:38Z** |
| P12 2699998 | none | 09:43:06Z / 09:43:08Z | **no edit**; trigger NOT KNOWN | **09:43Z** |
| P11 3064196 | 10:48:14 / 10:48:20Z | 10:50:41Z / 10:50:42Z | **edit-triggered (+140 s)** | 10:50Z |
| P11 Vrbo `_7fd3…` | 10:48:20Z (copied) | 10:53:23Z / 10:54:27Z | edit-triggered; fixes yesterday's stale push | 10:54Z |
| P05 3166592 | 10:50:38Z | 10:51:08Z / 10:51:09Z | **edit-triggered (+30 s)** | 10:51Z |
| P20 3547481 | 10:51:18Z | 10:52:17Z / 10:52:18Z | **edit-triggered (+58 s)** | 10:52Z |
| P04 3562176 | 10:52:35Z | 10:54:10Z / 10:54:10Z | **edit-triggered (+94 s)** | 10:54Z |
| 3588993 | 10:54:54Z | 10:55:25Z / 10:55:26Z | **edit-triggered (+31 s)** | 10:55Z |
| P06 3288517 | 13:14:35Z | 13:15:16Z / 13:15:17Z | **edit-triggered (+40 s)** | 13:15Z |

- The usual overnight group ran: P02 00:22:58Z, P03 (Channex) 03:24:14Z, P07 03:43:35Z, P01 04:02:24Z, P10 04:37:27Z, P08 05:56:34Z, P09 06:02:26Z, P14 06:53:01Z (within 24 h of 24 Nov 06:57:35Z).
- **Nothing is past 24 h at 07:25Z, but all 9 cross 24 h between 09:38Z and 13:15Z today** unless something triggers them.
- **Proven consequence: the PriceLabs calendar is missing both bookings made last night.** PriceLabs still shows **P12 4-6 Dec** (311 / 331 / 267) and **3588993 30 Dec-3 Jan** (5 nights) as open (`booking_status` blank), while Smoobu has them booked. Both bookings were made after the listings' last refresh (Smoobu 20:39 and 23:47). Prices on booked nights are not sold, so there is no rate leak, but occupancy-based and booking-recency layers on P12 and 3588993 are running on stale occupancy (P12 has a custom occupancy profile with -15% within 15 days at low occupancy; live `get_customizations`).
- **Pattern after 8 days (18-25 Nov): 1 clean night in 8.** 18 and 19 Nov: daytime only, after edits. 20-22 Nov: no overnight refresh (P20 missed a booking on 20 Nov). 23 Nov: an overnight refresh, but it coincided with Reyhan's 00:07-00:17Z edits. 24 Nov: the only clean night (6 listings 00:30-00:31Z, P12/P13 in the evening). 25 Nov: none. The same 9 listings fail every time; the other 7 Smoobu listings and the Channex one refresh nightly. Reading (evidence-based, cause NOT KNOWN): **these 9 are dropping out of the nightly run and only refresh when a save on the listing triggers it** (lags 30-140 s). P12 / P13 / their Vrbo copies at 08:32-09:43Z had no logged edit; what triggered them is NOT KNOWN (a dashboard Sync Now or a PriceLabs retry would not appear in `get_user_logs` as far as we can tell).
- **Close condition is not met.** Raise the support ticket now.
- **Support ticket content (for Corentin to send):**
  1. Account: Smoobu integration. Affected listing IDs: 2699998, 3064196, 3064856, 3090701, 3166592, 3288517, 3547481, 3562176, 3588993 (plus Vrbo copies `_386e…`, `_3d48…`, `_7fd3…`). Unaffected Smoobu IDs for contrast: 2999946, 3267077, 3288427, 3318167, 3318172, 3318177, 3320302.
  2. Symptom: since 18 Nov these listings are not refreshed / pushed in the nightly run on 7 of 8 nights. They refresh only within 30-140 s of a saved Date Specific Override. Give the 24 Nov table above as evidence (edit time vs `last_refreshed_at`).
  3. Impact: pushed prices go over 24 h old (P20 missed a booking on 20 Nov); the PriceLabs calendar misses new reservations (P12 4-7 Dec and 3588993 30 Dec-4 Jan booked 24 Nov evening, still shown open on 25 Nov 07:25Z).
  4. Also report: 3064856 refreshed at 24 Nov 10:50:13Z but its last push stays 09:38:04Z (refresh without push; same as the P11 Vrbo copy on 24 Nov 02:26:49Z).
  5. Ask: why are these listings missing the nightly sync, is there a sync queue / connector error for them, and please restore the nightly refresh + push. Confirm whether Sync Now / dashboard refreshes are logged anywhere.
- **Check:** PriceLabs > Listings > Last Sync for the 9 IDs after 13:15Z today. Sync Now is a user action; this audit does not trigger it.

**C2. t-p11-block2029-2311: P11 Camden Smoobu "Blocked channel" block 5 Jan 2027-31 Jul 2029 is still there** (made and last modified 22 Nov 12:18:28; unchanged). Not in `policy.json` handbacks. (Smoobu `/api/reservations` and `/api/rates` 07:24:35Z; `raw/prices_3064196.json`.)
- Open nights in the next 180: **18** (yesterday 19; 25 Nov rolled off).
- **3-4 Jan still an unsellable 2-night orphan at min 3: 151 / 163 = £314** (uncustomized 205 / 222). The -8% min 3 DSO (2 Jan-28 Feb, updated 20 Nov 22:50:18Z) is unchanged (live).
- Who made the block is NOT KNOWN (Smoobu has no author field).
- **Question for Corentin (unchanged):** is Camden handed back after 4 Jan? If yes, add it to `policy.json` handbacks (last night 4 Jan) and 3-4 Jan needs min 2. If no, remove the block in Smoobu.
- **Check:** Smoobu > Camden calendar from 5 Jan; PriceLabs 3064196 > Calendar 3-4 Jan min stay.

### HIGH

**H1. a-reyhan-2011: partial revert on P11 only; two discounts deepened on 24 Nov. Confirm or revert.** (`get_user_logs`; live overrides P11, P04, P05, P20; Smoobu 07:24:35Z vs 24 Nov 07:20:44Z.)
- **Reverted (in line with "cut PriceLabs discounts"):** P11 -2% removed on 30 Nov-4 Dec and 14-18 Dec (min 2 kept).
  - 30 Nov-4 Dec **200 / 199 / 208 / 235 / 266 = £1,108** (yesterday £1,086), now +1.7% above uncustomized £1,090.
  - Darts 14-17 Dec **207 / 218 / 228 / 249, average £225.50** (yesterday £220.75); 18 Dec **£315** (£309). Still about -2.4% under uncustomized (212 / 223 / 233 / 254 / 323) from another layer (customizations, not read on P11 today). Policy 21 Oct note: darts average above £300.
- **New conflicts (confirm or revert):**
  - **P04 6-23 Dec -2% -> -5%, min 3** (10:52:35Z). Open nights 6-9 and 14-23 Dec moved **£2,230 -> £2,162 (-£68 over 14 nights)**. 6-9 + 14-19 Dec **163 / 164 / 164 / 161 / 140 / 143 / 146 / 149 / 153 / 158 = £1,541** (yesterday £1,589), uncustomized £1,885 (-18.2%).
  - **P05 29 Nov-2 Dec -5% -> -8%, min 3** (10:50:38Z): **488 / 473 / 469 / 475 = £1,905** (yesterday £1,966, -£61); uncustomized £1,962.
  - **P20 24 Nov +25%, min 1** (10:51:18Z, same night). `listing_facts.P20.min_stay` is 3 nights 25 Oct-30 Nov. The night went unsold (no Smoobu reservation); now in the past, so record only.
- **Still in place, no change:** P04 24-26 Dec +5% **min 2** (20 Nov 22:53:59Z; breaches `listing_facts.P04` min-stay rule), Smoobu **175 / 188 / 185**. P13 1 Dec +25% min 1 (policy +50%): 3064856 **£233**, 3090701 **£186**. P05 7-8 Dec -1% min 2 (**428 / 407**), 13-14 Dec no % min 2 (**483 / 477**). P05 4-31 Jan -8% min 3. P11 / P13 2 Jan-28 Feb -8% min 3.
- **In line with policy:** P06 6-13 Dec min 3; 3588993 17-19 Dec and 7-9 Jan min 3.
- **Check:** each listing > Calendar > Date Specific Overrides on the dates above.

**H2. P12 (t-p12-reopen-2411 can close): 4-7 Dec rebooked on Booking.com, room £766.54 (+£88.75 vs the cancelled £677.79; 0.84x the £915 Smoobu rate on 24 Nov). Five open nights remain before the 13 Dec handback: £1,312.** (Smoobu 07:24:35Z; `reservations.csv`; `raw/prices_2699998.json`; live overrides and customizations.)
- **Remaining open nights:** **26 Nov £290 (min 1)** and **30 Nov-3 Dec 242 / 257 / 258 / 265 = £1,022 (min 2)**. Everything else to 13 Dec is booked; 14 Dec onward is the handback block.
- **Orphan risk, 30 Nov-3 Dec** (4 nights between the 27-30 Nov stay and the 4 Dec check-in, min 2): a 3-night stay strands 30 Nov (£242) or 3 Dec (£265) as a single night; a 1-3 Dec stay strands both. Only 2+2 or one 4-night stay fills it cleanly. 26 Nov is already a 1-night orphan (sellable at min 1).
- Gap-fill / Orphan Day settings: **UNKNOWN** (`get_customizations` for 2699998 returns no orphan field).
- **P12 customizations (live):** last-minute 0% (no discount, gradual, 15 days); far-out +30% after 150 days; demand factor moderately conservative; **custom occupancy profile** (-15% at 10-20% occupancy within 15 days, up to +15% at high occupancy 31-60 days); Booking Recency default (5% to 15%).
- **PriceLabs still shows 4-6 Dec open** (C1), so occupancy-based adjustments on 26 Nov and 30 Nov-3 Dec use stale occupancy.
- **Check:** 2699998 > Calendar 26 Nov-3 Dec; Customizations > Orphan Day.

**H3. Scott Ellis Gardens 3588993 (t-seg-blocks-2411): blocks still there; second reservation is Booking.com 30 Dec-4 Jan; the new booking leaves 26-29 Dec sellable only as one exact 4-night stay. Still unmapped.** (Smoobu `/api/reservations` and `/api/rates`; `raw/listing_data.json`; `market.csv`.)
- **Blocks unchanged:** 20 Nov-10 Dec block (modified 23 Nov 10:58:39) keeps 29 Nov-2 Dec, 4-7 Dec and 9 Dec closed; 1-night blocks 15 Dec, 6 Jan, 12 Jan still there. Author NOT KNOWN.
- **Reservations (apartment level):** Airbnb 21-26 Dec (Smoobu total £1,631.76, made 22 Nov) and **Booking.com 30 Dec-4 Jan (£2,388.40, commission £358.26, made 24 Nov 23:47 Smoobu clock)**.
- **26-29 Dec gap (4 nights, 490 / 503 / 591 / 623 = £2,207):** min stays are **4 / 7 / 5 / 4**, so 27, 28 and 29 Dec arrivals are impossible. Only a 26-30 Dec stay sells it. A gap-fill rule would open shorter stays here.
- **4-5 Jan gap (332 / 321, min 2 / 3):** sellable only as a 4 Jan arrival for 2 nights.
- **PriceLabs still shows 30 Dec-3 Jan open** (C1).
- Open nights next 180: **152** (yesterday 156). 0 at min 170 or max 4000.
- **Market:** 3 BR row dated 25 Nov: P50 £383, P75 £470. **Base 450 is +17.5% / -4.3%.**
- **Question for Corentin (unchanged):** are the 29 Nov-9 Dec blocks intended, and is this P21 for `id_map.json`, `policy.json` and the pack?
- **Check:** 3588993 > Calendar 26-29 Dec min stay; Smoobu > Scott Ellis calendar 29 Nov-9 Dec.

**H4. P06 Marylebone: the Smoobu "Blocked channel" block now starts 13 Dec, not 6 Dec (modified 24 Nov 14:13:44 Smoobu clock). 6-12 Dec is open: 384 / 364 / 332 / 340 / 396 / 447 / 434 = £2,697, min 3.** P06 is an intentional block in `policy.json`, so numbers only. (Smoobu rates and reservations 07:24:35Z; `raw/prices_3288517.json`; `get_user_logs`.)
- Reyhan set a 6-13 Dec min 3 DSO 51 s later (13:14:35Z, if the Smoobu clock is CET), so this looks deliberate.
- 11 and 12 Dec arrivals cannot sell at min 3 (only 2 and 1 nights remain before 13 Dec).
- PriceLabs raw lists 6-12 Dec as open but `user_price` -1 on those dates. Why is NOT KNOWN.
- Open nights next 180: **8** (2 Dec £363 min 1, plus 6-12 Dec). Yesterday: 1.
- **Question for Corentin:** confirm that 6-12 Dec is meant to be sold, and update `policy.json` intentional_blocks for P06 with the new dates.

**H5. a-discount-cut: not done. The gap grew because two discounts were deepened (H1).** (`disc25.py`. Gap = uncustomized minus pushed `price` on Smoobu-open nights, 26 Nov-20 Dec. Raw starts 26 Nov, so this is not like for like with yesterday's 25 Nov start.)

| Listing | 26 Nov-4 Dec (net) | 26 Nov-20 Dec (net) | 26 Nov-20 Dec positive-only |
|---|---|---|---|
| P05 | 4 n £57 | **8 n £522** (-12.4%) | £522 |
| P04 | 1 n -£225 (2 Dec +200%) | 12 n £164 | £389 |
| P11 | 6 n -£54 | 12 n -£63 | £29 |
| P20 | 0 n | 6 n -£25 (5 Dec +100%) | £159 |
| **Four targets** | **-£222** | **£598** (yesterday £470) | **£1,099** (yesterday £1,023) |

- **P04 customizations (live):** last-minute 5% within 15 days (gradual); **Aggressive** occupancy profile (down to -30% at 10% occupancy within 15 days); Booking Recency default (5% to 15%). P05 / P11 / P20 customizations not re-read today.
- **Check:** 3166592 / 3562176 / 3064196 / 3547481 > Customizations > Occupancy Based Adjustment, Booking Recency Factor, Last Minute; and the H1 DSOs.

**H6. Plan items (PriceLabs side)** (Smoobu 07:24:35Z vs 24 Nov 07:20:44Z)

| Item | Status | Today (yesterday) |
|---|---|---|
| t-pl-push-1811 | **Not closable, day 8** (C1) | 9 listings daytime-only on 24 Nov; 1 clean night of 8; raise ticket |
| t-p11-block2029-2311 | **Block still there** (C2) | 3-4 Jan **151 / 163 = £314**, min 3 |
| t-p12-reopen-2411 | **Close: rebooked** (H2) | 4-7 Dec Booking.com room £766.54 |
| t-seg-blocks-2411 | **Blocks still there** (H3) | 30 Dec-4 Jan booked; 26-29 Dec gap |
| t-p04-xmas-1711 | Engine only on 24-26 Dec; 20-23 Dec now under the new -5% | 20-26 Dec **155 / 155 / 154 / 157 / 175 / 188 / 185 = £1,169** (£1,189); 24-26 Dec min 2 |
| a-p04-dec-1611 | **Moved the wrong way: -2% -> -5%** (H1) | 6-9 + 14-19 Dec **£1,541** (£1,589); uncustomized £1,885 (-18.2%) |
| a-p12-trim | No edit; engine above target | 30 Nov-3 Dec **242 / 257 / 258 / 265 = £1,022** (£1,014); targets about 235 / 250 / 250 / 260 = £995 (+£27) |
| t-p12-26nov-price | **Not fixed, last day to sell** | 26 Nov **£290** (£294); DSO +15% min 1 (4 Nov 01:24:21Z, live); uncustomized **£197** (£216); target about £224-230 |
| a-p05-dec | Open; +300% min 1 unchanged (live) | 21 Dec **£2,193** (unc. £733); 29 Dec **£2,247** (unc. £888); 29 Nov-2 Dec **£1,905** (£1,966) at -8%; 7-8 Dec £835; 13-14 Dec £960 |
| t-p05-valentine-2211 | Open; -5% min 4 DSO unchanged (15 Nov 19:14:20Z, live) | 13-16 Feb **438 / 408 / 417 / 420 = £1,683**, min 4 (unchanged) |
| t-p11-8dec-orphan | DSO +50% min 1 unchanged (15 Nov 18:48:33Z, live) | 8 Dec **£245** (£245; uncustomized £208). Target about £150-159 |
| t-p13-twins | **Split widened, no DSO change** | 121 of 153 jointly open nights identical (yesterday 123 of 152). **3064856 now £10-11 a night cheaper on 3-23 Jan: £3,349 vs £3,575 (-£226, 21 n)**, from a lower uncustomized price (e.g. 3 Jan 157 -> 153; 23 Jan 210 -> 170) after its 10:50:13Z refresh. 3090701 still +£5-7 on 13-21 Dec (£1,863 vs £1,809). 27 Nov **263 / 210**, 1 Dec **233 / 186**. 3064856 DSOs unchanged (live, latest 23 Nov 00:08:04Z). Cause NOT KNOWN |
| P20 5 / 26 Dec +100% | Unchanged (18 Nov, live) | 5 Dec **£588** (£582; unc. £404); 26 Dec **£516** (£509; unc. £344); min 1 |

### MEDIUM

**M1. Sync (Smoobu 07:24:35Z vs PriceLabs `price`, 26 Nov-24 Jan open nights): 0 differences over £2 on all 16 Smoobu listings, incl. P14 and 3588993.** Min stay matches on every open night. `kpi_pack` `sync_issues` is [] for every ref.
- **Availability does not match on 8 nights:** P12 4-6 Dec and 3588993 30 Dec-3 Jan are booked in Smoobu but open in PriceLabs (C1). Likely cause: no refresh since the bookings. Other candidates (sync off, manual Smoobu override, DSO, push failure) do not fit: push is on, and the prices match.

**M2. Min stay and orphans, next 180 nights** (Smoobu 07:24:35Z, `an25.py`). Policy: 2-3 nights to 24 Jan; 5 from 25 Jan; 7 from 25 Mar.
- **Unsellable orphans:** **P11 3-4 Jan** (£151 / £163, min 3; C2). P09 25 Apr £463 min 5 (handback, ignored).
- **Gaps where only one stay shape sells:** **3588993 26-29 Dec** (H3); 3588993 4-5 Jan (4 Jan arrival only); P06 6-12 Dec (no 11-12 Dec arrivals at min 3).
- **Sellable short gaps a gap-fill rule would cover:**
  - P12 26 Nov £290 (min 1) and 30 Nov-3 Dec (H2).
  - P13 27 Nov (263 / 210) and 1 Dec (233 / 186), min 1.
  - P11 8 Dec £245 (min 1) and 23-25 Dec **291 / 267 / 304** (min 2).
  - P05 7-8 Dec (428 / 407) and 13-14 Dec (483 / 477) at min 2; 21 Dec and 29 Dec at min 1.
  - P20 5 Dec and 26 Dec (min 1).
  - P06 2 Dec £363 (min 1).
  - P04 2 Dec £423 (deprioritised).
- **Below policy:** P04 24-26 Dec min 2 (H1).
- **Above 3 within 2 months:** 3588993 20 Dec (4), 26 Dec (4), 27 Dec (7), 28 Dec (5), 29 Dec (4) and January weekends (4). P14 (special).
- **2-4 months out, below 5:** P13 47 / 59 per twin; P05 32 / 50; P20 50 / 59; P04 35 / 59; 3588993 47 / 59; P14 35 / 59 (special).
- **4+ months out, below 7:** P13, P20, 3588993 60 / 60; P05 0 / 57 and P04 0 / 60 comply; P14 33 / 60 (special).

**M3. Floor and ceiling, next 180 nights** (Smoobu open nights vs `listings.csv` min / max)
- **P14: 71 of 180 (39.4%) at the £450 minimum**, 25 Nov-21 Mar (yesterday 71 / 180). `kpi_pack` `bounds` next 30: 86.7% at min, average open price £450. Special setup: numbers only.
- **Every other listing: 0 at min and 0 at max.** Open nights: P04 158, P13 152 per twin, 3588993 152, P20 148, P05 138, P11 18, P06 8, P12 5, P09 1.

**M4. Listing hygiene and the info pack** (`listing_data.json`; `data/id_map.json` and `seeker-estates/build/properties.py`, both last changed 22 Oct, so likely out of date)
- **21 PriceLabs listings, all push on, none hidden.**
- **The P11 Vrbo copy `_7fd3…` pushed again** (24 Nov 10:54:27Z, after the parent DSO was copied). It is no longer stale.
- **3064856 refreshed without pushing** (refresh 10:50:13Z, push 09:38:04Z; C1).
- **Unchanged:**
  - P02 Vrbo copy `_ca1c…` has not pushed since 24 Feb.
  - Vrbo copies inherit Reyhan's DSOs (`add_custom_pricing_from_parent`). Question (unchanged): should they push at all?
  - 3588993 is not in id_map, policy or the pack.
  - id_map entries not in PriceLabs: `_unmatched` Marylebone Vrbo x3; P01 / P04 / P08 / P09 / P10 `pricelabs_other`; P13 Vrbo `_d0a5…` / `_125c…`.
  - P13 twins share coordinates (one flat, policy).
  - P03 is priced via Channex (pushed 03:24:14Z).
  - P15-P19 have no PriceLabs listing. P20 is not in the info pack.
- **Pack vs PriceLabs (unchanged; pack likely out of date):** mins match except P14 (pack 400, PriceLabs 450); every PriceLabs max is above the pack's; bases differ on P01, P04, P05, P06, P09, P11, P12, P13, P14; P05 is 5-bed in the pack, 4 in PriceLabs.
- **P12 handback block:** Smoobu 14 Dec 2026-29 Jun 2029 vs `policy.json` 14 Dec 2026-21 Oct 2027 (unchanged; excluded either way).
- **P06 block dates changed** (H4). `policy.json` intentional_blocks has no dates to update, but the note should say 6-12 Dec is open.
- `kpi_pack` `gaps` is [] for every ref. It misses P11 3-4 Jan and 3588993 26-29 Dec.

**M5. Base vs market** (`market.csv`, bedroom-matched rows dated 25 Nov; base vs P50 / P75)
- P12 284 vs 203 / 231: **+39.9% / +22.9%**
- P20 330 vs 252 / 316: +31.0% / +4.4%
- 3588993 450 vs 383 / 470 (3 BR): +17.5% / -4.3%
- P04 200 vs 174 / 210: +14.9% / -4.8%
- P13 250 vs 220 / 269: +13.6% / -7.1%
- P11 286 vs 292 / 328: -2.1% / -12.8%
- P01 253 vs 261 / 335: -3.1% / -24.5%
- P05 550 vs 572 / 701 (4 BR): -3.8% / -21.5%
- P06 357 vs 410 / 526: -12.9% / -32.1%
- UNKNOWN (no row in `market.csv`): P02, P03, P07, P08, P09, P10, P14.
- `kpi_pack` `market_percentiles` are empty (the pack was built before `market.csv` was filled).

Data gaps:
1. Trigger of the 24 Nov 08:32-09:43Z refreshes on P12, P13 3090701 and the P12 / P13 Vrbo copies: NOT KNOWN. No logged edit. Whether Sync Now shows in `get_user_logs` is NOT KNOWN.
2. Why 3064856's uncustomized price fell on 3-23 Jan (-£10-11 a night vs 3090701) with no DSO change: NOT KNOWN. Customizations have no history in the API, and P13 customizations were not read today.
3. Orphan Day / gap-fill settings on any listing: UNKNOWN. `get_customizations` does not return them.
4. Not re-read live today: customizations on P05, P11, P13, P20, 3588993, P06; overrides on P06, 3090701, 3588993. For these, "unchanged" rests on the logs (no entries beyond the 10 listed).
5. Who changed the P06 and Scott Ellis Smoobu blocks: NOT KNOWN. The Smoobu time zone (CET) is inferred, NOT CONFIRMED.
6. 3588993 Booking.com total £2,388.40: whether cleaning is included is NOT KNOWN (unmapped flat, not in `reservations.csv` mapping).
7. Why P06 6-12 Dec shows `user_price` -1 in PriceLabs raw while `booking_status` is blank: NOT KNOWN.
8. 18 Oct base-rise like-for-like (P12 recompute after the rebook) was not computed in this section.
9. H5's window starts 26 Nov (raw), so it is not like for like with yesterday's.
