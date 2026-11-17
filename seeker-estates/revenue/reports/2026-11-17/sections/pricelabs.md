## PriceLabs audit (D = 2026-11-17)

**Sources**
- Snapshot `data/snapshots/2026-11-17/`: `raw/prices_*.json` (window 18 Nov 2026-16 Jan 2027), `raw/listing_data.json`, `raw/neighbourhood_P13.json`, `listings.csv`, `prices.csv`, `reservations.csv`. Yesterday: `reports/2026-11-16/sections/pricelabs.md` and the plan JSON in `reports/2026-11-16/daily-report.md`.
- `kpi_pack.json` 17 Nov: `sync_issues` is [] for every ref, and so is `gaps`. `bounds` exists for P04, P05, P06, P11, P12, P13, P14 and P20. `market_percentiles` and `avg_open_price_next30` are null except where the bounds refs carry `avg_open_price_next30`.
- Live PriceLabs reads, 17 Nov about 07:19-07:28Z:
  - `get_user_logs` listing, group and account, 16-17 Nov.
  - `get_listing_prices`: P04 3562176 15 Dec-5 Jan; P13 3064856 and 3090701 20-28 Dec.
  - `get_listing_date_overrides`: P04 and P20.
  - `get_customizations`: P04 (all); P05, P11 and P20 (occupancy, booking recency, last-minute).
  - `get_listing_data` (all 20 listings).
  - `get_neighbourhood_data` P04 (detail, prices).
  - Calls were one at a time except the three customization reads, which went out together. All returned 200.
- Live Smoobu GETs:
  - `/api/rates` for 15 apartments, 17 Nov 2026-16 May 2027, taken **07:18:36Z**.
  - `/api/reservations` modified since 16 Nov, taken 07:18:43Z, 5 records. Guest fields were dropped before saving.
  - Saved in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live17pl/`, with the scripts `sync.py`, `an17.py` (a-discount-cut) and `an2.py` (floor, ceiling and orphans), plus `nbh_P04.json`.
- Smoobu times are given as Smoobu shows them; their time zone is not verified.
- Policy respected:
  - P02/P03/P06/P07 blocks are intentional, so P06 gets numbers only.
  - P14 is a special setup.
  - P13 is one flat.
  - Handbacks: P12's last night is 13 Dec. P01, P08, P09 and P10 are not inventory.
  - The 15% / 20% stay discounts are policy.
  - Deprioritised items (P04 2 Dec, P12 17 Nov) are not raised.
  - Where Reyhan's edits conflict with policy, they are reported as conflicts, not as proposals.
- **Field note:** `price` is what was pushed: Smoobu equals `price` on every open night. `user_price` carries the value from the previous refresh.

### Changes since 16 Nov 06:00Z
- **No PriceLabs edits.** `get_user_logs` returns 0 entries for listing, group and account, 16-17 Nov. As a control, the 15-17 Nov listing query returns total 25, the same 25 of Reyhan's 15 Nov edits as yesterday.
- `get_listing_data`: base, min, max and push are unchanged on all 20 listings.
- The P04 and P20 overrides carry no `updated_at` after 15 Nov 19:17:38Z.
- Customizations are not logged. Those read today match yesterday's.
- **Every price move since yesterday is the engine's own**, from the 16 Nov 09:40-09:43Z refresh. **No refresh of the 9 active Smoobu listings since then** (H1).

---

### CRITICAL

**C1. P04 Barking 20 Dec-1 Jan: the Booking.com cancellation is not registered in PriceLabs. The 13 nights are OPEN in Smoobu but shown "Booked" in PriceLabs.**
Sources: live `get_listing_prices` 3562176 07:2xZ; Smoobu rates 07:18:36Z; Smoobu reservation 160754186; live overrides and customizations; `nbh_P04.json`.
- **Smoobu:** the reservation is `cancellation`, modified **16 Nov 15:37:54**; it was booked 20 Oct; room £2,417.34, £185.95 a night. The 20 Dec-1 Jan nights are `available` 1.
- **PriceLabs:** live, the same nights show `booking_status` "Booked", `booked_date` 2026-10-20, ADR 185.92 and `demand_desc` "Unavailable". `last_refreshed_at` is **2026-11-16T09:43:29Z**, about 6 h before the cancellation. The listing has not been re-read since.
- **What is bookable now.** Smoobu carries the prices last pushed for those nights:

| Night | Smoobu = PL `price` | min stay | uncustomized | Market P50 / P75 (NL, 1-3 BR) |
|---|---|---|---|---|
| 20 Dec | 189 | 3 | 217 | 159 / 210 |
| 21 Dec | 193 | 3 | 226 | 162 / 212 |
| 22 Dec | 187 | 3 | 212 | 163 / 215 |
| 23 Dec | 200 | 4 | 242 | 165 / 218 |
| 24 Dec | 204 | 4 | 252 | 171 / 222 |
| 25 Dec | 198 | 4 | 236 | 180 / 223 |
| 26 Dec | 195 | 4 | 232 | 185 / 226 |
| 27 Dec | 208 | **7** | 267 | 173 / 225 |
| 28 Dec | 228 | 5 | 311 | 179 / 227 |
| 29 Dec | 229 | 5 | 316 | 176 / 228 |
| 30 Dec | 230 | 5 | 317 | 182 / 229 |
| 31 Dec | 241 | 5 | 342 | 179 / 228 |
| 1 Jan | 231 | 4 | 303 | 172 / 217 |
| **Total** | **£2,733** (£210.23 a night) | | **£3,473** | **£2,246 / £2,880** |

- **Totals against references:**
  - £2,733 is 0.787x uncustomized.
  - It is +21.7% over market P50 and -5.1% under P75.
  - It is +£315.66 over the cancelled room revenue.
  - With the Booking.com x1.10 markup, the list price is about £3,006.
  - The market source is PriceLabs Nearby Listings for 1-3 BR, n=187. It is not comps. Its insight says "26-31 Dec market prices 10.4% higher" and "27-31 Dec occupancy +19.8%".
- **What sets these prices:**
  - DSOs created 20 Oct: -5% with min 3 on 20-22 Dec; -5% with min 4/4/4/4/7/5/5/5/5 on 23-31 Dec; -2% with min 4 on 1 Jan.
  - Aggressive occupancy. In the 31-60-day band it gives -15% at 10% occupancy, -10% at 20-30% and -5% at 40%.
  - Demand factor Conservative.
  - Booking recency at its default, which affects only the next 30 days (to 16 Dec).
  - The remaining gap below uncustomized is not explained by the visible settings: 27 Dec-1 Jan is 0.70-0.78x.
- **Risk once PriceLabs registers the cancellation (estimate, not a reading):**
  - Today PriceLabs counts these 13 nights as booked. Smoobu has **0 of 30 nights booked for days 31-60 (18 Dec-16 Jan)**.
  - On the Aggressive profile the 31-60-day band would move to the 10% bucket (-15%).
  - If the current bucket is -5%, the block would fall by roughly 10%, to about £2,445. If it is 0%, the fall is 15%, to about £2,323.
  - So the first re-read is likely to **cut Christmas-NYE prices**, not raise them.
- **Occupancy effect:**
  - PriceLabs `occupancy_next_60` reads 48%. Smoobu truth is **15 of 60 = 25%**. Next 30 is 15 of 30 = 50% in both (`kpi_pack` `forward_occ_30` 0.483).
  - The 13 nights are 33-45 days out.
  - Pickup: this is -13 nights and -£2,417.34 of room on the books.
- **Policy check:**
  - P04 rule: never fewer than 3 nights. Every reopened night is min ≥ 3, so it complies.
  - The general 2-3-night rule inside 2 months is exceeded on 23 Dec-1 Jan (min 4-7, M2).
  - **Base 200 conflict:** Reyhan cut base 220 -> 200 on 9 Nov. The pack (`build/properties.py`) and earlier plans assume 220. `recommended_base_price` is "Unavailable", live and in `listings.csv`. Corentin to confirm 200 or 220. At 220, uncustomized prices would scale up; by how much is not quantified.
- **Not checked:** whether the nights are bookable on Booking.com and on the unsynced Barking Airbnb 1455 (channel agent). Who cancelled and why is NOT CHECKED; Smoobu shows only `type` cancellation.
- **Check in PriceLabs:** Barking > Sync Now (a write, so it was not done here). Confirm 20 Dec-1 Jan shows open. Then read the new prices before the occupancy cut lands. Corentin to decide whether to replace the 20 Oct -5% DSOs (made when the block was sold) with 0% or a premium, and whether the 4-7-night minimums stay.

### HIGH

**H1. PriceLabs has not re-read the 9 active Smoobu listings since 16 Nov 09:40-09:43Z, so two Smoobu events are missing.** (live `get_listing_data` 07:2xZ; sync check `sync.py`; Smoobu reservations)
- **Price sync:** 0 open nights differ by more than £2. The check covers 18 Nov-16 Jan on all 15 Smoobu listings, 237 open nights equal. This matches `kpi_pack` `sync_issues` [].
- **Status mismatches** (availability, not price):
  - **P04**, 13 nights (C1): PriceLabs Booked, Smoobu open.
  - **P13**, 22-26 Dec on **both** twins: PriceLabs open, Smoobu unavailable (H2).
- **Push age at 07:23Z:**
  - **P04, P05, P06, P11, P12, P13 x2 and P20:** 21 h 40 m-21 h 43 m.
  - **P14 3267077:** pushed 16 Nov 08:06:53Z, so **23 h 16 m**. It crosses 24 h at 08:07Z.
  - P08 3318167: pushed 17 Nov 07:16:31Z, fresh.
  - Fresh overnight: P01, P02 (Smoobu), P03 (Channex), P07, P09 and P10.
  - **P02 Vrbo `_ca1c…`:** last push 24 Feb 2026, push on. It is intentionally blocked: hygiene only.
- Likely causes, unconfirmed: the daily refresh simply has not run since 09:43Z, or a missed webhook. Push is on for all listings.
- **Check:** `last_refreshed_at` on 3562176, 3064856 and 3090701 after about 09:45Z today. If it has not moved, use Sync Now. P14 `last_date_pushed` after 08:07Z.

**H2. New P13 Booking.com stay, 22-27 Dec (5 nights), is on twin 3064856 in Smoobu. PriceLabs has not registered it on either twin.** (Smoobu 162947708, created 16 Nov 22:52; live `get_listing_prices` 3064856 / 3090701, refresh 09:42:53Z)
- **Smoobu:** apartment **3064856**, "Top-Floor 2Bed …". This matches the Booking.com page title in policy. Both twins show 22-26 Dec unavailable, so there is no double-sale risk.
- **PriceLabs:**
  - 3064856: 22-26 Dec open at 216 / 225 / 219 / 220 / 222 = **£1,102**, min 3.
  - 3090701: open at 229 / 238 / 232 / 233 / 235 = £1,167.
  - Expected after a refresh: Booked on 3064856 and Blocked on 3090701.
- **Price paid vs pushed:**
  - Room **£840.75** = **0.763x** the 3064856 price, and 0.694x the Booking.com list at x1.10 (£1,212.20).
  - Commission £148.61 = **15.0% of room plus £150 cleaning** (£990.75). It is 17.7% of room only. So it is standard 15% on the gross, not the booster.
  - Booking was 36 days out, so Last Minute (0-30 days) does not apply. Black Friday (bookable from 19 Nov) does not apply either. The breakdown of the 0.694x is for the channel agent.
- **Market:** P13 Nearby Listings 2 BR (raw `neighbourhood_P13.json`) gives P50 £223 / P75 £273. That is static, not date-level; the Christmas-date market is NOT CHECKED. The pushed £220 a night sits about at P50.
- **Check:** PriceLabs > both Shepherd's Bush listings > `last_refreshed_at` / Sync Now.

**H3. t-pl-sync-1611 is fixed: P20 NYE 27 Dec-3 Jan is registered.** (raw `prices_3547481.json`, refresh 16 Nov 09:43:29Z)
- 27 Dec-2 Jan show Booked, `booked_date` 2026-11-15, ADR 257.68.
- PriceLabs `occupancy_next_60` is now 57%, up from 45%.

**H4. PriceLabs-side plan items** (raw 17 Nov; Smoobu 07:18Z; live overrides and customizations; `an17.py`)

| Item | Status | Today (yesterday) |
|---|---|---|
| a-discount-cut | **Not done.** P04, P05, P11 and P20 are all still Aggressive occupancy with Booking Recency default. Last-minute: P04 5% gradual, P05 1% gradual, P11 / P20 0%. | **Next 13 (18-30 Nov): £277 (£351). Next 30 (18 Nov-16 Dec): £1,348 (£1,296).** Four targets: **£487 / £1,643** (£553 / £1,595). Next 30 by listing: **P05 8 n £659 (-14.5%)**; **P04 14 n £492 (-19.2%)**; P11 15 n £273 (-7.3%); P20 9 n £219 (-7.8%). P12 (-£172) and P13 3090701 (-£149) are priced above uncustomized; 3064856 is +£26. Method as yesterday. The window starts 18 Nov because raw starts there. |
| a-p04-dec-1611 | **Not done, and worse.** The DSO is still -5% on 6-22 Dec (11 Nov 17:16:47Z). | **6-16 Dec: 144 / 142 / 142 / 142 / 145 / 152 / 154 / 144 / 137 / 141 / 143 = £1,586**, against £1,702 at the previous refresh (-6.8%) and uncustomized £1,997. **16 Dec 179 -> 143 (-20%)** as it entered the 30-day booking-recency window, the same pattern as 15 Dec yesterday. |
| a-p12-trim | Unchanged since Reyhan's +5% -> 0%. | 18-20 Nov 268 / 268 / 296 = **£832** (uncustomized £695), min 2. 30 Nov-3 Dec 253 / 270 / 299 / 308 = **£1,130** (£1,121), uncustomized £1,138. |
| a-p05-dec | **Open.** Logs show no edits. | 21 Dec **£2,054** (uncustomized £680), min 1. 29 Dec **£2,563** (£1,020), min 1. 7-8 Dec 463 / 460 = £923. 13-14 Dec 488 / 474 = £962. |
| t-p12-26nov-price | **Not fixed** | 26 Nov **£307** (£301), min 1, uncustomized £264. |
| t-p20-5dec-orphan | **Not fixed (day 8)** | 5 Dec **£277** (£286), min 3, `unbookable` 1. DSO 0% min 3 (9 Nov 21:25:55Z). |
| t-p20-26dec-orphan | **Not fixed** | 26 Dec **£271** (£300), **min 4**, `unbookable` 1. The DSO is -5% with no min-stay field (4 Nov), so the source of min 4 is UNKNOWN (min-stay customization NOT CHECKED). `kpi_pack` `gaps` no longer lists it. |
| t-p11-8dec-orphan | As yesterday: min 1, +50%. | 8 Dec **£310** (£308), uncustomized £269. |
| t-p13-twins | **Not fixed** | 13-16 Dec is 244 / 240 / 237 / 241 on **both** twins. **124 of 145** open nights over the next 180 are identical (125 yesterday). The runs are 13-16 Dec and 16 Jan-15 May. |
| P11 darts (conflict) | Unchanged | 14-17 Dec 227 / 228 / 236 / 246, **average £234.25** (£227.75). Policy says above £300 / +5%. For Corentin. |

**H5. Min stays that conflict with policy, set in PriceLabs** (live overrides; Smoobu 07:18Z)
- **P04 18-19 Nov:** DSO +10%, min 2 (Reyhan, 15 Nov 19:17:38Z). It is open at **£167 / £170**, min 2. This conflicts with the P04 rule (never fewer than 3). Not reverted. The 17 Nov min 2 DSO is moot, because 17 Nov is booked.
- **P20 min 2 against `listing_facts.P20.min_stay` ("3 nights from 25 Oct to 30 Nov"):**
  - 17 Nov is open at £208, min 2 (Reyhan, 15 Nov).
  - **22-24 Nov is open at 254 / 257 / 239, min 2** (DSO -5% min 2, `updated_at` 8 Nov 12:41:16Z).
  - 18-19 Nov also carries min 2 but is unavailable.
- **P20 20-21 Nov:** open in both systems at **£300 / £299**, min 3. Policy `block_20_21_nov` says Smoobu block 20-22 Nov = delivery. That block is not in Smoobu today. Owned by t-p20-delivery.
- **Check:** Barking DSO 18-19 Nov and Waterford DSOs 17 and 22-24 Nov. Corentin to confirm or restore min 3.

### MEDIUM

**M1. Orphans and min stay, next 180 nights** (`an2.py`; policy: 2-3 nights; 5 from 17 Jan; 7 from 17 Mar)
- **Unsellable 1-night orphans:**
  - **P20 26 Dec**: £271, min 4.
  - **P20 5 Dec**: £277, min 3.
  - P06 29 Nov: £256, min 4 (numbers only).
  - P04 24 Nov: £143, min 3 (P04 rule: numbers only).
  - Tonight (17 Nov): P05 £373, P06 £230 and P20 £208, each min 2.
  - A gap-fill rule (min 1 for 1-night gaps) would sell P20 26 Dec and 5 Dec. **`kpi_pack` `gaps` is [] for every ref**, so it misses both (data gap).
- **Min 1 inside 2 months:**
  - P12 26 Nov.
  - P13 17 Nov, 27 Nov and 1 Dec. 1 Dec is intentional.
  - P11 8 Dec.
  - P05 21 and 29 Dec.
  - P04 2 Dec (deprioritised).
- **Above 3 inside 2 months:**
  - **P04 23 Dec-1 Jan, now open** (min 4 / 4 / 4 / 4 / 7 / 5 / 5 / 5 / 5 / 4, 20 Oct DSOs). These minimums were set for the 13-night stay. A 27 Dec arrival must stay 7 nights.
  - P20 26 Dec min 4.
  - P06 29 Nov min 4.
  - P14 Fri-Sun min 4 (special setup).
- **17 Jan-16 Mar below 5:** P11 43 / 59 nights; P13 47 / 59 per twin; P05 36 / 52; P20 53 / 59; P04 43 / 59.
- **17 Mar on below 7:** P11, P13 and P20 are 60 / 60. P05 and P04 comply.

**M2. Floor and ceiling, next 180 nights** (Smoobu open nights vs live min / max)
- **P14: 75 of 180 nights (41.7%) at the £450 minimum.** `kpi_pack` `bounds` gives 73.3% of the next 60. Special setup: numbers only.
- **Every other listing: 0 at the minimum and 0 at the maximum.**
  - Open nights: P04 165 (+13 reopened), P11 153, P13 145 per twin, P20 146, P05 127, P12 9 and P06 4.
  - P05 peaks at £2,563 (29 Dec) against a £3,500 maximum.

**M3. Base vs market** (`data/snapshots/2026-11-16/market.csv`, bedroom-matched; live P04 and raw P13 neighbourhood 17 Nov)

| Ref | Base | vs P50 | vs P75 |
|---|---|---|---|
| P12 | £284 | +37.2% (£207) | +22.4% (£232) |
| P09 | £176 | +32.3% (£133) | +10.0% (£160), row from 9 Nov |
| P20 | £330 | +29.4% (£255) | +2.8% (£321) |
| P04 | £200 | +14.3% (£175, 2 BR n=89, live) | -7.0% (£215) |
| P13 | £250 | +12.1% (£223, n=116, raw 17 Nov) | -8.4% (£273) |
| P11 | £286 | -1.4% (£290) | -13.3% (£330) |
| P05 (4 BR) | £550 | -4.5% (£576) | -24.6% (£729) |
| P01 | £253 | -4.9% (£266) | -25.4% (£339) |
| P06 | £357 | -13.1% (£411) | -31.7% (£523) |

- P02, P03, P07, P08, P10 and P14: UNKNOWN (no usable row in `market.csv`). `kpi_pack` `market_percentiles` is null.
- Barking `recommended_base_price` is still "Unavailable". It is the only listing without one.

**M4. Listing hygiene and the info pack: unchanged from 16 Nov** (live `get_listing_data`; `data/id_map.json`, last commit 22 Oct; `/home/user/seeker-social/seeker-estates/build/properties.py`)
- **All 20 PriceLabs listings:** push on, none hidden.
- **Vrbo copies push separately:** P11 `_7fd3…` (16 Nov 18:08Z), P12 `_386e…` (17 Nov 07:01Z) and P13 `_3d48…` (16 Nov 12:48Z).
  - Whether the P13 Vrbo copy reflects 22-27 Dec is NOT CHECKED.
  - Question: should the Vrbo copies push?
- **Duplicates:** P13 3064856 and 3090701 share 51.5088201, -0.2342476. That is one flat by policy. M1 / t-p13-twins is its side-effect.
- **`_unmatched`:** the Marylebone Vrbo listings `_a7f5a076…`, `_4a980bb7…` and `_380ddc1a…` are not among the 20 listings `get_listing_data` returns. Question: remove them from `id_map.json`?
- **`confidence: check`:**
  - **P03** is priced via **Channex** (100 / 323 / 1500), pushed 17 Nov 03:01:34Z, fully blocked (intentional).
  - **P15-P19:** no PriceLabs listing. Question: are they priced elsewhere?
- **Not in the info pack:** P20 3547481 (200 / 330 / 1800). Policy says base 350 from 24 Oct; PriceLabs shows 330. Question: is it 330 or 350?
- **Pack vs PriceLabs (pack likely out of date):**
  - P04 base 220 vs 200; max 450 vs 2000.
  - P14 min 400 vs 450; base 475 vs 525.
  - P05 base 455 vs 550.
  - P11 260 vs 286; P12 270 vs 284; P13 235 vs 250; P06 340 vs 357; P01 230 vs 253; P09 160 vs 176.
  - The pack's "high" values (250-800) are all below the PriceLabs maximums.

Data gaps:
1. When PriceLabs will re-read P04 and P13, and what P04 20 Dec-1 Jan will price at afterwards: NOT CHECKED, because Sync Now is a write. The -10% to -15% is an estimate from the visible occupancy profile.
2. Bookability of P04 20 Dec-1 Jan on Booking.com and on Barking Airbnb 1455: NOT CHECKED (channel agent). The cancellation's cause: NOT CHECKED.
3. P13 22-27 Dec: the 0.694x-of-list breakdown and the Christmas date-level market: NOT CHECKED (channel / comp-west).
4. The source of P20 26 Dec min 4 (no DSO min stay) and of the P04 27 Dec-1 Jan gap below uncustomized (0.70-0.78x) beyond the DSO and occupancy settings: UNKNOWN. Account and group customizations NOT CHECKED.
5. `kpi_pack` `gaps` is [] although Smoobu has the P20 5 Dec and 26 Dec orphans (`rm` gap detection to check).
6. The 18 Oct base-rise like-for-like recompute is not done in this section. Overrides for P05, P11, P12, P13 and P14 were not re-read; no log entries exist for them since 15 Nov.
7. The raw PriceLabs window is 60 days (18 Nov-16 Jan). The price-sync check beyond 16 Jan is NOT CHECKED. Floor, ceiling and min-stay checks use Smoobu to 15 May.
