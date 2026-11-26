## PriceLabs audit (D = 2026-11-26)

**Sources**
- Snapshot `data/snapshots/2026-11-26/`: `raw/listing_data.json` (21 listings, none added or removed; fetched 06:56Z), `raw/prices_*.json` (27 Nov 2026-25 Jan 2027, 17 files incl. 3588993; P04 file fetched 07:01:33Z), `listings.csv`, `prices.csv` (built 07:20:54Z), `reservations.csv`. `market.csv` for 26 Nov is not in the snapshot yet; the 25 Nov file is used (latest rows dated 25 Nov). Baseline: `reports/2026-11-25/sections/pricelabs.md`, `data/snapshots/2026-11-25/raw/*`, Smoobu 25 Nov 07:24:35Z (`scratchpad/pl25/`).
- Live PriceLabs reads, 26 Nov about 07:23-07:40Z, all 200, read only, **each call sent alone**: `get_user_logs` listing, then group, then account (25-26 Nov); `get_listing_date_overrides` P04 3562176, P05 3166592, P13 3064856, P11 3064196, P20 3547481; `get_listing_prices` P04 (27 Nov-26 Jan); `get_listings` P04; `get_listing_data` (all); `get_customizations` P11, P05, P20 (last-minute, occupancy, booking recency, far-out, demand). No write, sync or refresh tool was called.
- Live Smoobu reads (GET only), taken **07:22:23Z**: `/api/rates` for 16 apartments 26 Nov 2026-25 May 2027; `/api/reservations` 15 Nov 2026-31 Dec 2029 (dates, created / modified times, type, channel, amount, commission only; no guest fields).
- Scripts and data: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/pl26/` (`fetch.py`, `an26.py`, `det26.py`, `smoobu_rates.json`, `smoobu_res.json`, `p04_live_0717.json`, `listing_data_live_0725.json`).
- **Policy respected:** P02/P03/P06/P07 blocks intentional (P06 numbers only); P14 special setup (numbers only); P13 is one flat; 15% / 20% stay discounts and Visibility Booster are policy; P04 never under 3 nights; handbacks (P01, P08, P09, P10, P12 after 13 Dec) excluded. Reyhan's policy conflicts go to Corentin as **confirm or revert**.

### Changes since 25 Nov 06:00Z
- **PriceLabs logs: 3 listing entries, all Reyhan. Group and account logs: 0.** No `push_price` or `remove_custom_pricing` entry.

| Time (Z) | Listing | Dates | Change (live override confirms) |
|---|---|---|---|
| 25 Nov 10:41:42 | P11 3064196 (+ Vrbo copy `_7fd3…`) | 23-25 Dec | **+5% removed** (20 Nov report: DSO +5%), min 2 kept |
| 25 Nov 17:02:02 | P04 3562176 | 6-26 Dec | One DSO, **min 3, no price**. Replaces the -5% on 6-23 Dec and the +5% min 2 on 24-26 Dec (all 21 dates `updated_at` 17:02:01Z) |

- **Settings** (`listings.csv` 25 vs 26 Nov): every base, min, max and push flag unchanged on all 21 listings. Recommended base moved: P12 284 -> 288, P11 280 -> 287, P20 351 -> 342.
- **Smoobu changes** (`modifiedAt`, Smoobu clock, CET inferred):
  - **NEW: P11 Booking.com 25-27 Nov**, created 25 Nov 18:13; Smoobu total £429.66, commission £77.34; room £280.67 per `reservations.csv`.
  - **CANCELLED: P04 Booking.com 10-14 Dec**, modified 25 Nov 12:56:05.
  - Modified with no change to amount or commission: P12 Booking.com 27-30 Nov (21:15:54), P11 Booking.com 27-30 Nov (23:51:24), 3588993 Airbnb 21-26 Dec and Booking.com 30 Dec-4 Jan (11:06).
  - No block changed: P11 5 Jan 2027-31 Jul 2029 (last modified 22 Nov 12:18:28), Scott Ellis blocks (23 Nov 10:58-10:59), P06 13 Dec 2026-31 Dec 2027 (24 Nov 14:13:44).

---

### CRITICAL

**C1. t-pl-push-1811 (day 9): better, but you cannot close it yet. All 9 listings refreshed and pushed this morning, 26 Nov 06:09-07:17Z. No logged edit triggered them. They still sit outside the normal overnight run, and the 25 Nov daytime gap is not accounted for.** (Sources: `get_listing_data` live about 07:25Z; `raw/listing_data.json`; `get_user_logs` listing / group / account 25-26 Nov.)

| Listing | Last refresh / push | Logged edit before it | Reading |
|---|---|---|---|
| P13 3064856 / 3090701 | 26 Nov 06:09:55Z / 06:09:56Z | none | not edit-triggered |
| P12 2699998 | 06:22:59Z / 06:23:00Z | none | not edit-triggered |
| P05 3166592 | 06:48:21Z / 06:48:22Z | none | not edit-triggered |
| P20 3547481 | 06:48:25Z / 06:48:26Z | none | not edit-triggered |
| 3588993 Scott Ellis | 06:48:45Z / 06:48:45Z | none | not edit-triggered |
| P06 3288517 | 06:50:27Z / 06:50:28Z | none | not edit-triggered |
| P11 3064196 | 06:59:42Z / 06:59:43Z | 25 Nov 10:41:42Z (that edit triggered the 10:42:24Z push, +42 s) | 26 Nov push not edit-triggered |
| P04 3562176 | **07:17:30Z / 07:17:31Z** | 25 Nov 17:02:02Z (that edit triggered the 17:02:27Z refresh, +25 s) | 26 Nov push not edit-triggered |

- **Answer to (b): Sync Now or edits? Not edits.** The only 3 log entries since 25 Nov 06:00Z are the P11 and P04 DSOs above. They explain the 25 Nov 10:42Z (P11) and 17:02Z (P04) refreshes, and nothing on 26 Nov. Whether the 26 Nov 06:09-07:17Z refreshes came from a dashboard Sync Now, a late batch or a PriceLabs retry is **NOT KNOWN**. `get_user_logs` lists `push_price` as a loggable action, and none was logged. That points away from a manual push, but it is not proof that Sync Now is logged. The timing looks like a batch: P05, P20 and Scott Ellis came within 24 s of each other at 06:48Z.
- The other 7 Smoobu listings and Channex P03 refreshed in the usual run, 00:23-05:17Z (P02 00:23, P03 02:43, P07 02:56, P01 03:07, P10 03:37, P08 04:34, P09 04:38, P14 05:17).
- **Stale periods on 25 Nov.** No refresh between the 24 Nov daytime one and this morning is on record (only the latest value is kept). If there was none, the listings were past 24 h for these periods:
  - P13 twins: 25 Nov 09:38Z-26 Nov 06:09Z.
  - P12: 09:43Z-06:22Z.
  - P05: 10:51Z-06:48Z.
  - P20: 10:52Z-06:48Z.
  - Scott Ellis: 10:55Z-06:48Z.
  - P06: 13:15Z-06:50Z.
  - P11: 10:50Z-10:42Z on 25 Nov.
  - P04: 25 Nov 10:54Z-17:02Z. The 10-14 Dec cancellation (Smoobu 12:56:05, about 11:56Z) fell inside this window. PriceLabs only registered it after Reyhan's 17:02Z save.
- **Fixed: P12 4-6 Dec and Scott Ellis 30 Dec-3 Jan now show as booked in PriceLabs.**
  - P12 4 Dec "Booked (Check-In)" and 5-6 Dec "Booked", `booked_date` 2026-11-24.
  - Scott Ellis 30 Dec "Booked (Check-In)" and 31 Dec-3 Jan "Booked", `booked_date` 2026-11-24.
  - Source: `raw/prices_2699998.json` (refresh 06:22:59Z) and `raw/prices_3588993.json` (06:48:45Z). PriceLabs and Smoobu availability now match on every listing (M1).
- **Vrbo copies did not refresh overnight. They cross 24 h this morning:**
  - P12 `_386e…`: last 25 Nov 08:11:58Z, past 24 h at 08:12Z.
  - P13 `_3d48…`: last 25 Nov 08:27:35Z, past 24 h at 08:27Z.
  - P11 `_7fd3…`: last 25 Nov 10:42:27Z, past 24 h at 10:42Z.
  - As on 24-25 Nov, these refresh in daytime only.
- **Close condition: 2 clean nights in a row, with the 9 listings in the 00:00-05:30Z run.** Not met: 26 Nov is the second morning in 9 with an un-triggered refresh, and it was late (06:09-07:17Z). Whether the support ticket was sent is NOT CHECKED (no source). Keep yesterday's ticket text, and add the 26 Nov times above and the P04 25 Nov 10:54-17:02Z gap.
- **Check:** PriceLabs > Listings > Last Sync for the 9 IDs at about 01:00Z on 27 Nov, and the 3 Vrbo copies after 10:42Z today.

**C2. t-p11-block2029-2311: the P11 Camden "Blocked channel" block, 5 Jan 2027-31 Jul 2029, is unchanged** (made and last modified 22 Nov 12:18:28). It is not in `policy.json` handbacks. (Sources: Smoobu `/api/reservations` and `/api/rates` 07:22:23Z; `raw/prices_3064196.json`; live overrides.)
- **3-4 Jan is still a 2-night orphan that cannot sell at min 3: 150 / 164 = £314** (uncustomized 203 / 223). The -8% min 3 DSO on 2 Jan-28 Feb is unchanged (`updated_at` 20 Nov 22:50:18Z).
- Open nights in the next 180: **16** (yesterday 18; 26 Nov is now booked and 25 Nov has rolled off).
- **Question for Corentin (unchanged):** is Camden handed back after 4 Jan? If yes, add it to `policy.json` handbacks (last night 4 Jan) and set 3-4 Jan to min 2. If no, remove the block in Smoobu.

### HIGH

**H1. Answer to (a): Smoobu is not stale and was not edited by hand. It matches PriceLabs' current pushed price on every open date. The 18 "mismatches" came from timing: a 07:01Z PriceLabs file was compared with Smoobu read after PriceLabs pushed P04 again at 07:17:31Z.** (Sources: `get_listing_prices` P04 live, `last_refreshed_at` 07:17:30Z; `get_listing_data` P04 `last_date_pushed` 07:17:31Z; Smoobu `/api/rates` 07:22:23Z; `raw/prices_3562176.json` (refresh 25 Nov 17:02:27Z, fetched 07:01:33Z); `kpi_pack.json` P04 `sync_issues`.)
- **Smoobu vs live PriceLabs `price`: 0 differences over £2 on the 45 open nights 27 Nov-26 Jan.** Examples: 2 Dec **403 / 403**, 11 Dec **174 / 174**, 26 Dec **158 / 158**, 7 Jan 131 / 131, 25 Jan 138 / 138.
- **Why the dispatcher saw 18 gaps.** The snapshot's `price` (from the 17:02:27Z calculation) equals the live `user_price` on every open date. Smoobu holds the 07:17Z `price`.
- **This was a PriceLabs push, not a manual Smoobu edit.** Smoobu P04 rates changed on **153 of 181 dates** between 25 Nov 07:24Z and 26 Nov 07:22Z, by -£70 to +£20 across 26 Nov-23 May, booked nights included. Every changed date in 27 Nov-26 Jan (the live window read) equals the new PriceLabs `price`. A manual edit would not touch booked nights 180 days out.
- **Live on the OTAs:** what Smoobu holds now (2 Dec £403, 6-9 Dec 163 / 163 / 164 / 161, 26 Dec £158), with the Booking.com markup on top. OTA pages are NOT CHECKED in this section. See the channel section.
- **Open question for PriceLabs. On 18 open dates the pushed `price` differs from "Your Price" (`user_price` = `booked_price`, the Download-prices "Your Price" column).** Net: Your Price is **£111 higher over the 18 nights**.

| Dates | Pushed `price` (= Smoobu) | Your Price | Gap |
|---|---|---|---|
| 2 Dec | 403 | 424 | +21 |
| 6-10 Dec | 163 / 163 / 164 / 161 / 165 = £816 | 174 / 174 / 175 / 171 / 175 = £869 | +£53 |
| 11 Dec | 174 | 155 | -19 |
| 23 Dec | 160 | 156 | -4 |
| 26 Dec | 158 | 177 | +19 |
| 7-13 and 16 Jan | 131-141 | 133-144 | +£3-5 a night |
| 25 Jan | 138 | 153 | +15 |

- **Pushed price on 6-9 Dec did not rise when the -5% came off.** It is 163 / 163 / 164 / 161 = **£651**, against £652 yesterday with the -5%. Your Price is £694.
- **Same pattern yesterday.** Yesterday's audit also had Smoobu = `price` with `user_price` different (6 Dec 163 vs 168), so this did not start today. Which of the two PriceLabs means to push is NOT KNOWN.
- **Check:** PriceLabs 3562176 > Calendar 6-10 Dec and 26 Dec: compare the price shown with the Smoobu rate. Ask PriceLabs support which value is pushed.

**H2. a-reyhan-2011: P04 reverted (both items). P05 -8% and P13 1 Dec +25% still in place. A new P11 premium was removed. Confirm or revert.** (Sources: `get_user_logs`; live overrides P04, P05, P13 3064856, P11, P20; Smoobu 07:22:23Z vs 25 Nov 07:24:35Z.)
- **Reverted. In line with "cut PriceLabs discounts" and the P04 min-3 rule:**
  - **P04 6-23 Dec -5%: removed** (25 Nov 17:02:02Z; DSO now min 3 with no price). Open nights 6-9 + 14-19 Dec (the a-p04-dec-1611 set): pushed **£1,534** (yesterday £1,541), uncustomized £1,685 (-9.0%). The gain from the removal does not show up in pushed prices (H1).
  - **P04 24-26 Dec min 2 (and +5%): now min 3**, in both PriceLabs and Smoobu. Pushed **160 / 159 / 158 = £477** (yesterday 175 / 188 / 185 = £548, -£71). Your Price is 158 / 159 / 177.
- **Still in place (confirm or revert):**
  - **P05 29 Nov-2 Dec -8% min 3** (`updated_at` 24 Nov 10:50:38Z): **484 / 473 / 469 / 478 = £1,904** (yesterday £1,905), uncustomized £1,827.
  - **P13 1 Dec +25% min 1** (18 Nov 12:14:53Z; policy +50%): 3064856 **£234**, 3090701 **£203**. 27 Nov is also +25% min 1: **260 / 226**.
- **New since yesterday (confirm or revert):**
  - **P11 23-25 Dec +5% removed, min 2 kept** (25 Nov 10:41:42Z). Pushed **278 / 256 / 265 = £799** (yesterday 291 / 267 / 304 = £862, -£63). Uncustomized is 276 / 254 / 263.
  - This is the opposite of the t-channel-gaps recommendation in the 20 Nov daily report (DSO +5% -> about +10%).
- **Unchanged (live):** P05 7-8 Dec -1% min 2 (**429 / 405**); P05 13-14 Dec min 2 (**474 / 471**); P05 4-31 Jan -8% min 3; P11 / P13 2 Jan-28 Feb -8% min 3; P04 2 Jan-28 Feb -8% (min 3 / 4); P04 26 Nov-5 Dec -8% min 3.
- **Check:** each listing > Calendar > Date Specific Overrides on the dates above.

**H3. P04 10-14 Dec reopened after the cancellation. The 6-26 Dec run is now 21 nights with no orphan.** (Sources: Smoobu 07:22:23Z; live P04 prices; live P04 overrides.)
- **Prices, pushed:** 10-14 Dec **165 / 174 / 156 / 147 / 140 = £782**, min 3 on every night. Uncustomized 201 / 220 / 172 / 152 / 138 = £883 (-11.4%).
- **Against the lost booking:** 10-13 Dec pushed £642 vs the cancelled booking at £488.35.
- **Orphan risk: none.**
  - 3-5 Dec and 27 Dec-3 Jan are booked, so 6-26 Dec is one open run of 21 nights at min 3. Any 3-night stay leaves at least 3 nights either side, unless a stay starts on 7-8 Dec or ends on 24-25 Dec. Those leave 1-2 night stubs (6 Dec, or 6-7 Dec / 25-26 Dec), which cannot sell at min 3.
  - 2 Dec stays a 1-night gap at **£403**, min 1 (+200% DSO; deprioritised).
- **Not checked here:** the comp position of 10-14 Dec (see the comp sections) and whether unsynced Airbnb 1455 is selling P04 nights (channel section).

**H4. P12: 26 Nov is unsold for tonight at £301. 30 Nov-3 Dec moved further above the a-p12-trim target.** (Sources: Smoobu 07:22:23Z; `raw/prices_2699998.json`.)
- **26 Nov: £301, min 1, still open** (yesterday £290). Target from t-p12-26nov-price: about £224-230. PriceLabs raw starts 27 Nov, so the 26 Nov uncustomized price is UNKNOWN. The DSO is +15% min 1 (4 Nov 01:24:21Z, per yesterday's live read; not re-read today).
- **30 Nov-3 Dec: 274 / 273 / 279 / 282 = £1,108, min 2** (yesterday £1,022, +£86). Uncustomized £1,034 (+7.2%). The a-p12-trim target was about £995, so it is now **+£113** above.
- **Orphan risk unchanged:** only a 2+2 split or one 4-night stay fills 30 Nov-3 Dec cleanly.
- Customizations were not re-read today (24-25 Nov: custom occupancy profile, Booking Recency default). The rise lines up with PriceLabs registering the 4-7 Dec booking at 06:22Z (C1); the cause is NOT CONFIRMED.

**H5. Scott Ellis Gardens 3588993 (t-seg-blocks-2411): blocks unchanged; 26-29 Dec still sells only as one exact 4-night stay; still unmapped.** (Sources: Smoobu; `raw/prices_3588993.json`; `market.csv` 25 Nov.)
- **Blocks:** 20 Nov-10 Dec block (modified 23 Nov 10:58:39) and 1-night blocks on 15 Dec, 6 Jan and 12 Jan, all unchanged. Author NOT KNOWN.
- **26-29 Dec: 527 / 510 / 634 / 652 = £2,323** (yesterday £2,207). Min stays 4 / 7 / 5 / 4, so only a 26-30 Dec arrival sells it.
- **4-5 Jan: 273 / 267** (yesterday 332 / 321), min 2 / 3. Sells only as a 4 Jan arrival for 2 nights.
- Open nights in the next 180: **153**. 0 at min (170), 0 at max (4000).
- **Market:** 3 BR P50 £383, P75 £470 (25 Nov). **Base 450 is +17.5% vs P50 and -4.3% vs P75.**
- **Question for Corentin (unchanged):** are the 29 Nov-9 Dec blocks intended, and is this flat P21 for `id_map.json`, `policy.json` and the pack?

**H6. P06 6-12 Dec: open, with the block from 13 Dec as yesterday. Prices fell £359 overnight.** Intentional block per `policy.json`, so numbers only. (Sources: Smoobu; `raw/prices_3288517.json`, refresh 06:50:27Z.)
- **6-12 Dec: 361 / 328 / 329 / 338 / 310 / 360 / 312 = £2,338**, min 3 (yesterday £2,697, -13.3%). Uncustomized fell too: 10-12 Dec went from 396 / 447 / 434 to 319 / 373 / 328.
- 11 and 12 Dec arrivals still cannot sell at min 3.
- 2 Dec: **£317**, min 1 (yesterday £363).
- Cause of the drop: NOT KNOWN. Customizations were not read.

**H7. a-discount-cut: no PriceLabs discount on the four target listings was cut. P04's -5% came off, but the pushed P04 prices barely moved (H1).**
- Source: `an26.py` logic, with the P04 rows taken from the live 07:17Z prices. Gap = uncustomized minus pushed price on Smoobu-open nights. The window is now 27 Nov-20 Dec because the raw files start on 27 Nov, so it is not like for like with yesterday's 26 Nov-20 Dec.

| Listing | 27 Nov-4 Dec (net) | 27 Nov-20 Dec (net) | 27 Nov-20 Dec positive-only |
|---|---|---|---|
| P05 | 4 n -£77 | **8 n £354** (-8.8%) | £436 |
| P04 | 1 n -£209 (2 Dec +200%) | 16 n £53 | £269 |
| P11 | 5 n -£34 | 11 n -£87 | £0 |
| P20 | 0 n | 6 n -£32 (5 Dec +100%) | £157 |
| **Four targets** | **-£320** | **£288** (yesterday £598) | **£862** (yesterday £1,099) |

- **Customizations (live).** Last-minute and occupancy settings:
  - P05: last-minute **1% off within 15 days** (gradual).
  - P11 and P20: last-minute 0%.
  - All three: **Aggressive** occupancy profile (down to -30% at 10% occupancy within 15 days).
- Also on all three: Booking Recency default (5% to 15% off when there are no bookings in 15-45 days), far-out +30% after 150 days. P05 demand factor: Conservative.
- These two layers (occupancy, booking recency) set the engine discount under the DSOs. Cutting them is the lever for a-discount-cut.
- **Check:** 3166592 / 3562176 / 3064196 / 3547481 > Customizations > Occupancy Based Adjustment and Booking Recency Factor.

**H8. Plan items (PriceLabs side)** (Smoobu 07:22:23Z vs 25 Nov 07:24:35Z)

| Item | Status | Today (yesterday) |
|---|---|---|
| t-pl-push-1811 | **Not closable, day 9** (C1) | 9 listings refreshed 06:09-07:17Z, none edit-triggered; Vrbo copies not overnight |
| t-p11-block2029-2311 | **Block still there** (C2) | 3-4 Jan **150 / 164 = £314**, min 3 |
| t-seg-blocks-2411 | **Blocks still there** (H5) | 26-29 Dec **£2,323** (£2,207), only a 4-night stay sells it |
| t-p04-xmas-1711 | Reyhan's +5% / min 2 gone; engine only | 20-26 Dec **155 / 154 / 153 / 160 / 160 / 159 / 158 = £1,099** (£1,169); min 3 |
| a-p04-dec-1611 | **-5% removed** (H2); pushed price did not move (H1) | 6-9 + 14-19 Dec **£1,534** (£1,541); uncustomized £1,685 |
| a-p12-trim | No edit; engine further above target | 30 Nov-3 Dec **£1,108** (£1,022); target about £995 (+£113) |
| t-p12-26nov-price | **Not fixed, tonight unsold** | 26 Nov **£301** (£290); target about £224-230 |
| a-p05-dec | Open; +300% min 1 unchanged (`updated_at` 9 Nov 14:08Z) | 21 Dec **£2,152** (uncustomized £706); 29 Dec **£2,308** (uncustomized £907); 29 Nov-2 Dec **£1,904** at -8%; 7-8 Dec £834; 13-14 Dec £945 |
| t-p05-valentine-2211 | Open; 1-28 Feb -5% min 4 unchanged (15 Nov 19:14:20Z) | 13-16 Feb **435 / 409 / 415 / 417 = £1,676** (£1,683), min 4 |
| t-p11-8dec-orphan | DSO +50% min 1 unchanged (15 Nov 18:48:33Z); **moved away from target** | 8 Dec **£306** (£245; uncustomized 263). Target about £150-159 |
| t-p13-twins | **Split flipped on 13-21 Dec; no DSO change** | 120 of 154 jointly open nights identical (121 / 153). 13-21 Dec: **3064856 £1,912 vs 3090701 £1,708 (+£204)**; yesterday 3090701 was the higher one. 3-23 Jan: **£3,341 vs £3,595 (-£254, 21 n)**. 27 Nov **260 / 226**, 1 Dec **234 / 203**. Both refreshed at 06:09:55Z. Cause NOT KNOWN |
| P20 5 / 26 Dec +100% | Unchanged (18 Nov 12:17Z, live) | 5 Dec **£562** (£588; uncustomized £373); 26 Dec **£565** (£516; uncustomized £388); min 1 |

### MEDIUM

**M1. Sync (Smoobu 07:22:23Z vs PriceLabs `price`; P04 from the live 07:17Z read, the rest from the snapshot, 27 Nov-25 Jan open nights): 0 differences over £2 on all 16 Smoobu listings. Min stay and availability match on every date.** `kpi_pack` `sync_issues` for P04 (18 dates) is a timing artefact (H1). Every other ref is [].

**M2. P11 prices jumped overnight; new booking 25-27 Nov.** (Sources: Smoobu; `raw/prices_3064196.json`, refresh 06:59:42Z; live customizations.)
- 30 Nov-4 Dec **226 / 230 / 242 / 259 / 298 = £1,255** (yesterday £1,108, +13.3%). Uncustomized £1,221.
- Booked nights rose too (27 Nov 250 -> 278, 28 Nov 286 -> 323).
- The jump fits Booking Recency dropping its 5% discount after the 25 Nov booking, plus the Aggressive occupancy profile seeing higher occupancy. Cause NOT CONFIRMED.
- **Booking.com 25-27 Nov:** room £280.67 vs Smoobu 25 Nov rates **207 + 229 = £436**, a ratio of **0.644**. That is 0.585 of x1.10 and 0.560 of x1.15. It was a same-day booking, so stacked promotions apply (policy `booking_stacked_promotions`). Which markup it fits cannot be told from this. The commission check is the channel section's job.

**M3. Min stay and orphans, next 180 nights** (Smoobu 07:22:23Z, `an26.py`). Policy: 2-3 nights to 25 Jan; 5 from 26 Jan; 7 from 26 Mar.
- **Unsellable orphans:** **P11 3-4 Jan** (£150 / £164, min 3; C2). P09 25 Apr £466 min 5 (handback, ignored).
- **Gaps where only one stay shape sells:**
  - 3588993 26-29 Dec, and 3588993 4-5 Jan (4 Jan arrival only) (H5).
  - P06 6-12 Dec (no 11-12 Dec arrivals).
- **Sellable short gaps a gap-fill rule would cover:**
  - P12 26 Nov £301 (min 1) and 30 Nov-3 Dec.
  - P13 27 Nov (260 / 226) and 1 Dec (234 / 203), min 1.
  - P11 8 Dec £306 (min 1) and 23-25 Dec **278 / 256 / 265** (min 2).
  - P05 7-8 Dec (429 / 405) and 13-14 Dec (474 / 471) at min 2; 21 Dec and 29 Dec at min 1.
  - P20 5 Dec and 26 Dec (min 1).
  - P06 2 Dec £317 (min 1).
  - P04 2 Dec £403 (deprioritised).
- **Below policy:** none. P04 24-26 Dec is now min 3.
- **Above 3 within 2 months:** 3588993 20 Dec (4), 26 Dec (4), 27 Dec (7), 28 Dec (5), 29 Dec (4) and January weekends (4). P14 weekends (4, special).
- **2-4 months out, below 5:** P13 47 / 59 per twin; P05 31 / 49; P20 50 / 59; P04 34 / 59; 3588993 47 / 59; P14 35 / 59 (special).
- **4+ months out, below 7:** P13, P20 and 3588993 60 / 60. P05 (0 / 58) and P04 (0 / 60) comply. P14 34 / 60 (special).
- Gap-fill / Orphan Day settings: **UNKNOWN** (`get_customizations` returns no orphan field).

**M4. Floor and ceiling, next 180 nights** (Smoobu open nights vs `listings.csv` min / max)
- **P14: 77 of 180 (42.8%) at the £450 minimum**, 26 Nov-21 Mar (yesterday 71 / 180). `kpi_pack` `bounds` next 30: 88.3% at min, average open price £450. Uncustomized on 27-28 Nov is £301 / £356, so the floor sets the price. Special setup: numbers only.
- **P20: 1 of 149 at the £200 minimum** (10 Jan £200; uncustomized £218). `kpi_pack` next 30: 3.3%.
- **Every other listing: 0 at min and 0 at max.** Open nights: P04 163, P13 153 per twin, 3588993 153, P20 149, P05 139, P11 16, P06 8, P12 5, P09 1.

**M5. Listing hygiene and the info pack** (`get_listing_data` live; `data/id_map.json` and `seeker-estates/build/properties.py`, both last changed 22 Oct, so likely out of date)
- **21 PriceLabs listings, all push on, none hidden.** No change to base, min or max.
- **Vrbo copies push separately and only in daytime (C1):** P12 `_386e…` 25 Nov 08:11:58Z, P13 `_3d48…` 08:27:35Z, P11 `_7fd3…` 10:42:27Z. They inherit Reyhan's DSOs (25 Nov 10:41:42Z `add_custom_pricing_from_parent` on the P11 copy). **Question (unchanged): should they push at all?**
- **Unchanged:**
  - P02 Vrbo copy `_ca1c…` has not pushed since 24 Feb (P02 fully blocked).
  - 3588993 is not in id_map, policy or the pack.
  - id_map entries not in PriceLabs: `_unmatched` Marylebone Vrbo x3; P01 / P04 / P08 / P09 / P10 `pricelabs_other`; P13 Vrbo `_d0a5…` / `_125c…`.
  - P13 twins share coordinates (one flat, policy).
  - P03 is priced via Channex (pushed 02:43:32Z).
  - P15-P19 have no PriceLabs listing. P20 is not in the info pack.
- **Pack vs PriceLabs (unchanged; the pack is likely out of date):**
  - Mins match, except P14 (pack 400, PriceLabs 450).
  - Every PriceLabs max is above the pack's.
  - Bases differ on P01, P04, P05, P06, P09, P11, P12, P13 and P14.
  - P05 is 5-bed in the pack and 4-bed in PriceLabs.
- **P12 handback block:** Smoobu has 14 Dec 2026-29 Jun 2029; `policy.json` has 14 Dec 2026-21 Oct 2027 (unchanged; excluded either way).
- **Smoobu `/api/reservations` returned the 3588993 Booking.com 30 Dec-4 Jan booking twice** (same amount and timestamps), probably a pagination overlap. Counted once here.
- `kpi_pack` `gaps` is [] for every ref, so it misses P11 3-4 Jan and 3588993 26-29 Dec.

**M6. Base vs market** (`market.csv` 25 Nov rows, bedroom-matched; P13 re-confirmed in today's `raw/neighbourhood_P13.json`, 2 BR P50 220 / P75 269, n = 116). Base vs P50 / P75:

| Listing | Base | P50 / P75 | vs P50 / vs P75 |
|---|---|---|---|
| P12 | 284 | 203 / 231 | **+39.9% / +22.9%** |
| P20 | 330 | 252 / 316 | +31.0% / +4.4% |
| 3588993 (3 BR) | 450 | 383 / 470 | +17.5% / -4.3% |
| P04 | 200 | 174 / 210 | +14.9% / -4.8% |
| P13 | 250 | 220 / 269 | +13.6% / -7.1% |
| P11 | 286 | 292 / 328 | -2.1% / -12.8% |
| P01 | 253 | 261 / 335 | -3.1% / -24.5% |
| P05 (4 BR) | 550 | 572 / 701 | -3.8% / -21.5% |
| P06 | 357 | 410 / 526 | -12.9% / -32.1% |

- UNKNOWN (no row in `market.csv`): P02, P03, P07, P08, P09, P10, P14. `kpi_pack` `market_percentiles` are empty.

Data gaps:
1. What triggered the 26 Nov 06:09-07:17Z refreshes on the 9 listings: NOT KNOWN. No logged edit, no `push_price` log entry. Whether a dashboard Sync Now appears in `get_user_logs` is NOT KNOWN.
2. Refreshes between 24 Nov daytime and 26 Nov morning: NOT KNOWN (only the latest `last_refreshed_at` is kept), so the 25 Nov stale periods in C1 are upper bounds.
3. Which P04 field PriceLabs pushes when `price` and "Your Price" (`user_price` / `booked_price`) differ: NOT KNOWN (H1). Smoobu matches `price`.
4. Support ticket for t-pl-push-1811 sent or not: NOT CHECKED.
5. Not re-read live today: customizations on P04, P12, P13, P06, 3588993; overrides on P12, P06, 3090701, 3588993. For these, "unchanged" rests on the logs (3 entries, none on these listings).
6. Causes of the overnight price moves on P11 (+13%), P12 (+£86 on 30 Nov-3 Dec), P06 (-£359 on 6-12 Dec) and the P13 twin flip: NOT KNOWN. The API keeps no customization history.
7. P12 26 Nov uncustomized price: UNKNOWN (raw starts 27 Nov).
8. Orphan Day / gap-fill settings: UNKNOWN on every listing.
9. OTA live prices: NOT CHECKED in this section.
10. `market.csv` for 26 Nov: not yet in the snapshot; the 25 Nov rows were used.
