## PriceLabs audit (D = 2026-11-27)

**Sources**
- Snapshot `data/snapshots/2026-11-27/`: `raw/listing_data.json` (21 listings, none added or removed), `raw/prices_*.json` (28 Nov 2026-26 Jan 2027, 17 files incl. 3588993), `raw/neighbourhood_P13.json`, `listings.csv`, `reservations.csv`. `market.csv` for 27 Nov is not in the snapshot; the 26 Nov rows are used (P13 updated from today's `neighbourhood_P13.json`). Baseline: `reports/2026-11-26/sections/pricelabs.md`, `data/snapshots/2026-11-26/`, Smoobu 26 Nov 07:22:23Z (`scratchpad/pl26/`).
- Live PriceLabs reads, 27 Nov about 07:20-07:30Z, all 200, read only, **each call sent alone**, in this order: `get_user_logs` listing, group, account (26-27 Nov); control `get_user_logs` listing 25-27 Nov; `get_listing_date_overrides` P05 3166592, P13 3064856, P11 3064196, P04 3562176, P20 3547481; `get_listing_data` (all); `get_listing_date_overrides` P13 3090701. No write, sync or refresh tool was called.
- Live Smoobu reads (GET only), taken **07:19:07Z**: `/api/rates` for 16 apartments 27 Nov 2026-26 May 2027; `/api/reservations` 15 Nov 2026-31 Dec 2029 (dates, created / modified times, type, channel, amount, commission only; no guest fields). This pull had a pagination overlap (one P05 cancellation listed twice, P13 3090701 27 Dec-3 Jan missing); `reservations.csv` has that stay, so nothing is lost.
- Scripts and data: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/pl27/` (`fetch.py`, `an27.py`, `det27.py`, `items.py`, `smoobu_rates.json`, `smoobu_res.json`).
- **Policy respected:** P02/P03/P06/P07 blocks intentional (P06 numbers only); P14 special setup (numbers only); P13 is one flat; 15% / 20% stay discounts and Visibility Booster are policy; P04 never under 3 nights; P04 2 Dec deprioritised; handbacks (P01, P08, P09, P10, P12 after 13 Dec) excluded. Reyhan's policy conflicts go to Corentin as **confirm or revert**.

### Changes since 26 Nov 06:00Z
- **PriceLabs logs: 0 listing, 0 group, 0 account entries.** The control read (25-27 Nov) returns the same 3 entries as yesterday, all on 25 Nov (P11 10:41:42Z plus its Vrbo copy, P04 17:02:02Z), so the log API is working and nobody edited PriceLabs since then. No `push_price` entry.
- **Live overrides** on P05, P13 3064856, P13 3090701, P11, P04 and P20: newest `updated_at` is 25 Nov 17:02:01Z (P04). Nothing newer on any of the six.
- **Settings** (`listings.csv` 26 vs 27 Nov): every base, min, max, push flag and recommended base unchanged on all 21 listings; only `last_push` moved.
- **Smoobu changes** (Smoobu clock, CET; Z = minus 1 h):
  - **NEW: P20 Airbnb 5-6 Dec**, created 26 Nov 16:51 (15:51Z), total £576.00 = room £426.00 + cleaning £150; commission £89.28.
  - **NEW: P04 Airbnb 10-13 Dec**, created 27 Nov 02:59 (01:59Z), total £520.67 = room £378.67 + cleaning £142; commission £80.70.
  - Modified with no change to amount or commission: P06 Airbnb 3-6 Dec (26 Nov 16:10:13; £897.82 / £139.16), P04 Airbnb 20-24 Nov, a past stay (27 Nov 04:37:04; £631.59 / £97.90).
  - No cancellation. No block changed: P11 5 Jan 2027-31 Jul 2029 (22 Nov 12:18:28), Scott Ellis blocks (23 Nov 10:58-10:59), P06 13 Dec 2026-31 Dec 2027 (24 Nov 14:13:44), P01 30 Nov-21 Dec (10 Nov 14:41:27; handback).

---

### CRITICAL

**C1. t-p11-block2029-2311 (day 5): the P11 Camden "Blocked channel" block, 5 Jan 2027-31 Jul 2029, is unchanged** (created and last modified 22 Nov 12:18:28). It is not in the `policy.json` handbacks. (Sources: Smoobu `/api/reservations` and `/api/rates` 07:19:07Z; `raw/prices_3064196.json`; live P11 overrides.)
- **3-4 Jan is still a 2-night orphan that cannot sell at min 3: 148 / 163 = £311** (yesterday £314; uncustomized 202 / 222 = £424). The -8% min 3 DSO on 2 Jan-28 Feb is unchanged (`updated_at` 20 Nov 22:50:18Z).
- Open P11 nights in the next 180: **16**, all before 5 Jan.
- **Question for Corentin (unchanged):** is Camden handed back after 4 Jan? If yes, add it to `policy.json` handbacks (last night 4 Jan) and set 3-4 Jan to min 2 in P11 > Date Specific Overrides. If no, remove the block in Smoobu.

### HIGH

**H1. t-pl-push-1811 (day 10): a second day of an early-morning batch, 05:59-06:49Z. No logged edit triggered it. No listing went past 24 h, so it is no longer critical by the freshness rule. But the original close condition is still not met.** (Sources: `raw/listing_data.json`; live `get_listing_data` about 07:24Z, identical; `get_user_logs` listing / group / account 26-27 Nov; `listings.csv` 26 and 27 Nov.)

| Listing | Push 26 Nov (Z) | Push 27 Nov (Z) | Gap | Logged edit before it |
|---|---|---|---|---|
| P12 2699998 | 06:23:00 | **05:59:50** | 23 h 37 m | none |
| P13 3090701 / 3064856 | 06:09:55 / 06:09:56 | **06:09:49 / 06:09:50** | **23 h 59 m 54 s** | none |
| P05 3166592 | 06:48:22 | **06:34:01** | 23 h 46 m | none |
| P20 3547481 | 06:48:26 | **06:34:03** | 23 h 46 m | none |
| 3588993 Scott Ellis | 06:48:45 | **06:34:17** | 23 h 46 m | none |
| P06 3288517 | 06:50:28 | **06:35:26** | 23 h 45 m | none |
| P11 3064196 | 06:59:43 | **06:46:29** | 23 h 47 m | none |
| P04 3562176 | 07:17:31 | **06:49:43** | 23 h 32 m | none |

- Gaps assume no refresh in between. Only the latest time is kept, so a refresh in between cannot be ruled out. Either way, no listing went past 24 h between the two mornings.
- **Edits behind them: none.** There are 0 log entries since 25 Nov 17:02:02Z, and the control read shows the log API works. So the 27 Nov refreshes were not triggered by an edit.
  - Whether they were a dashboard Sync Now or a PriceLabs schedule is NOT KNOWN. `push_price` was not logged. The pattern looks scheduled: P13 ran at the same time of day both days (06:09:5x), and P05, P20 and Scott Ellis came within 16 s of each other.
- **Other listings, normal run, 00:23-05:13Z:** P02 00:23, P03 (Channex) 02:45, P07 02:54, P01 03:03, P10 03:33, P08 04:29, P09 04:33, P14 05:13.
- **New bookings: both are registered in PriceLabs.**
  - **P20 5 Dec** shows "Booked (Check-In)", `booked_date` 2026-11-26, in the 06:34:02Z file.
  - **P04 10-12 Dec** shows "Booked (Check-In)" / "Booked" / "Booked", `booked_date` 2026-11-27, in the 06:49:42Z file. 13 Dec is open, and is correctly not shown as booked.
  - Availability and min stay match Smoobu on every date of all 16 listings (M1).
- **Registration lag:**
  - P04 was booked at 01:59Z and registered at the 06:49Z refresh: **4 h 51 m**.
  - P20 was booked at 15:51Z on 26 Nov. If there was no daytime refresh, it was registered **14 h 43 m** later, at 06:34Z (upper bound).
  - There is no double-sale risk from this, because Smoobu closes the dates on every channel itself. The cost is that PriceLabs reprices the nearby nights late. P04 6-9 Dec rose from 163 / 163 / 164 / 161 to **172 / 173 / 173 / 169 (+£36)** at 06:49Z; the cause is NOT CONFIRMED.
- **Is the pattern acceptable?** On the evidence so far, it is workable.
  - Prices land by 06:49 London time on both days, before UK daytime booking traffic.
  - No push was past 24 h.
  - The overnight bookings were priced on the previous morning's push. That would also be true under the 00:00-05:30Z run.
- **What is still wrong:**
  - The 9 listings sit 0.5-1.3 h after the run the other 8 use.
  - P13 came within **6 s of 24 h**. Any slip later turns it stale.
  - The 24-25 Nov daytime gaps (up to about 20 h past 24 h) are not explained.
  - Bookings made in the evening wait up to about 15 h before PriceLabs reprices around them.
- **What would close the task (Corentin's choice):**
  - **(a) Keep the original rule:** 2 clean nights in a row with the 9 listings in the 00:00-05:30Z run. Not met (day 2 of 2 in a 05:59-07:17Z batch). The fix is a PriceLabs support answer on why these 9 listings left the overnight run.
  - **(b) Accept the batch:** close if, for 3 mornings in a row (27, 28 and 29 Nov), every Smoobu listing pushes less than 24 h after its previous push and by 07:00Z. Today is morning 1, but P13's 23 h 59 m 54 s is a near miss. I would keep (a) until support answers.
  - Whether the ticket was sent: NOT CHECKED (no source). Add today's times and the P13 6-second margin to it.
- **Vrbo copies are still daytime only, and not yet stale at 07:24Z:**
  - P12 `_386e…` last 26 Nov 08:00:25Z / push 08:01:46Z: crosses 24 h at **08:01Z today**.
  - P13 `_3d48…` 08:03:40Z / 08:10:10Z: crosses at **08:10Z**.
  - P11 `_7fd3…` 08:33:46Z / 08:34:22Z: crosses at **08:34Z**.
  - The day before, they pushed at 08:11 / 08:27 / 10:42Z, so they too run about every 24 h, in daytime.
- **Check:** PriceLabs > Listings > Last Sync for the 9 IDs at about 01:00Z and 06:00Z on 28 Nov, and the 3 Vrbo copies after 08:34Z today.

**H2. t-p04-pushprice-2611: answered from the data. PriceLabs pushes `price`. "Your Price" (`user_price` / `booked_price`) is the previous push.** (Sources: all 16 `raw/prices_*.json` 27 Nov; Smoobu `/api/rates` 26 Nov 07:22:23Z and 27 Nov 07:19:07Z.)
- **Open nights where `price` and `user_price` differ by more than £2:** 83 across 10 listings. **On all 83, today's `user_price` equals the rate Smoobu held on 26 Nov** (to within £1).
  - Examples: P04 2 Dec `price` 425 / `user_price` 403 (Smoobu 26 Nov 403); P04 6-9 Dec 172 / 173 / 173 / 169 vs 163 / 163 / 164 / 161; P05 29 Nov-2 Dec 473 / 463 / 460 / 468 vs 484 / 473 / 469 / 478; P06 6 Dec 333 vs 361.
- **Smoobu today equals `price`** on every open night (M1).
- So the 18 "mismatches" on 26 Nov and the P04 Airbnb 1657 vs Smoobu question were the same thing: "Your Price" / the Download-prices CSV is one push behind. Use `price` (or Smoobu) as the pushed rate.
- **To close:** Corentin's OK, or one line from PriceLabs support confirming it. The open P04 question is no longer *which value is pushed*. It is that the P04 room sits below comps (comp sections).

**H3. a-reyhan-2011: none of the three conflicts was reverted. No new edit since 25 Nov 17:02Z. Confirm or revert.** (Sources: live overrides; Smoobu 07:19:07Z vs 26 Nov 07:22:23Z; `raw/prices_*.json`.)

| Edit (Reyhan) | `updated_at` | Live today | Pushed today (yesterday) | Uncustomized |
|---|---|---|---|---|
| **P05 29 Nov-2 Dec -8%, min 3** | 24 Nov 10:50:38Z | still -8% min 3 | **473 / 463 / 460 / 468 = £1,864** (£1,904) | £1,701 |
| **P13 1 Dec +25%, min 1** (policy: +50% intentional) | 18 Nov 12:14:53Z | +25% min 1 on **both** 3064856 and 3090701 | **£235 / £213** (£234 / £203) | 221 / 183 |
| **P11 23-25 Dec +5% removed, min 2 kept** | 25 Nov 10:41:42Z | min 2 only, no price | **277 / 255 / 264 = £796** (£799) | £778 |

- P13 27 Nov (tonight) is also +25% min 1 (18 Nov 12:14:46Z): **£261 / £237**, open.
- **Check:** P05 3166592, P13 3064856 and 3090701, P11 3064196 > Calendar > Date Specific Overrides on these dates.

**H4. P04 Barking after the 10-13 Dec Airbnb booking: 13 Dec is not an orphan. The new risk is 6-9 Dec, a 4-night pocket at min 3.** (Sources: Smoobu `/api/rates` 07:19:07Z; `raw/prices_3562176.json`; live P04 overrides, the 6-26 Dec min 3 DSO from 25 Nov 17:02:01Z.)
- **The booking:** room **£378.67** for 10-12 Dec, against the rates Smoobu and PriceLabs held when it was made (26 Nov 07:17Z push: **165 / 174 / 156 = £495**). Ratio **0.765**.
  - PriceLabs has since repriced the booked nights to 175 / 184 / 189. That does not matter, because they are booked.
  - Which Airbnb listing took it (synced 1657 or unsynced 1455): NOT CHECKED here. Smoobu shows only "Airbnb". See the channel section.
- **13 Dec:** open at **£149, min 3**. It is the first night of a **14-night run, 13-26 Dec: £2,118** (13-19 Dec £1,029; 20-26 Dec £1,089). A 13 Dec arrival sells.
  - Stubs appear only if a stay starts on 14 or 15 Dec (leaving 13 Dec, or 13-14 Dec), or ends on 24 or 25 Dec.
- **6-9 Dec: 172 / 173 / 173 / 169 = £687, min 3.** It sits between the 3-5 Dec stay and the 10 Dec arrival.
  - It sells cleanly only as one exact 4-night stay.
  - A 3-night stay on 6-8 Dec leaves 9 Dec unsellable; one on 7-9 Dec leaves 6 Dec unsellable.
  - Uncustomized is £786: the engine has the run 12.6% below its own default.
  - **Check:** whether a 1-night gap-fill exception fits P04's min-3 rule is Corentin's call. I make no proposal under the P04 rule.
- **2 Dec:** £425, min 1 (+200% DSO). Deprioritised, numbers only.
- **P04 min stay:** every December night except 2 Dec is at min 3 or more, so the rule is met.

**H5. P20 after 5 Dec sold: 26 Dec is the only short gap; 14-18 Dec is the only open December run.** (Sources: Smoobu 07:19:07Z; `raw/prices_3547481.json`; live P20 overrides.)
- **5 Dec sold:** room **£426.00** vs £562 pushed when it was booked (26 Nov 06:48Z push; Smoobu 26 Nov). Ratio **0.758**.
  - Against the uncustomized £373 that day, it is **1.14x**. So the +100% DSO (18 Nov 12:17:39Z) earned about +£53 over the engine price after the channel reduction.
  - The 0.76 factor matches the known Smoobu Airbnb pricing rules (policy `monitoring`). That is for the channel section.
- **P20 min stay policy:** `policy.json` `listing_facts.P20.min_stay` covers only "3 nights from 25 Oct to 30 Nov". For December onwards it is UNKNOWN (`policy.json`). The 5 Dec night was sold at min 1 under the DSO.
- **26 Dec: £563, min 1, +100% DSO** (18 Nov 12:17:57Z), uncustomized £387 (+45.5%). Yesterday it was £565. This is a 1-night gap between the 19-26 Dec and 27 Dec-3 Jan stays.
- **14-18 Dec: 290 / 304 / 302 / 335 / 317 = £1,548, min 3**, under a 0% DSO. Uncustomized is £1,703, so the engine is 9.1% lower.
- After that, P20 is open from 3 Jan. 10 Jan sits at the £200 minimum (M4).

**H6. a-discount-cut: no PriceLabs discount on the four target listings has been cut. There was no edit.** Gap = uncustomized minus pushed price, on Smoobu-open nights. The window is 28 Nov-20 Dec, because the raw files now start 28 Nov. Yesterday's window was 27 Nov-20 Dec, so the two are not like for like.

| Listing | 28 Nov-4 Dec (net) | 28 Nov-20 Dec (net) | Positive-only |
|---|---|---|---|
| P05 | 4 n -£163 | **8 n £236** | £399 |
| P04 | 1 n -£238 (2 Dec +200%) | 13 n -£57 | £181 |
| P11 | 5 n -£91 | 11 n -£169 | £0 |
| P20 | 0 n | 5 n £155 (14-18 Dec) | £155 |
| **Four targets** | **-£492** | **£165** (yesterday £288) | **£735** (yesterday £862) |

- The fall is mostly from nights that sold (P04 10-12 Dec, P20 5 Dec) and the window losing 27 Nov. It is not from any cut.
- The levers are unchanged from 26 Nov (customizations not re-read today; 0 log entries):
  - P05: last-minute 1% within 15 days.
  - P05, P11 and P20: Aggressive occupancy profile and default Booking Recency.
- **Check:** 3166592 / 3562176 / 3064196 / 3547481 > Customizations > Occupancy Based Adjustment and Booking Recency Factor.

**H7. Plan items (PriceLabs side)** (Smoobu 07:19:07Z vs 26 Nov 07:22:23Z; uncustomized from `raw/prices_*.json`)

| Item | Status | Today (yesterday) |
|---|---|---|
| t-pl-push-1811 | **Not closable, day 10** (H1) | 9 listings 05:59-06:49Z, none edit-triggered; all under 24 h (P13 by 6 s) |
| t-p04-pushprice-2611 | **Explained** (H2): `user_price` = previous push on 83 of 83 dates | P04 2 Dec 425 / 403; 6-9 Dec £687 / £651 |
| t-p11-block2029-2311 | **Block still there** (C1) | 3-4 Jan **148 / 163 = £311** (£314), min 3 |
| t-seg-blocks-2411 | **Blocks unchanged** (H8) | 26-29 Dec **£2,326** (£2,323) |
| t-p04-xmas-1711 | Engine only, min 3 | 20-26 Dec **154 / 153 / 152 / 158 / 158 / 157 / 157 = £1,089** (£1,099); uncustomized £1,214 |
| a-p04-dec-1611 | -5% gone since 25 Nov; engine rose slightly | 6-9 + 14-19 Dec **£1,567** (£1,534); uncustomized £1,720 |
| a-p12-trim | No edit; engine further above target | 30 Nov-3 Dec **269 / 279 / 282 / 288 = £1,118** (£1,108); target about £995 (**+£123**); min 2 |
| t-p12-26nov-price | **Lapsed unsold** | 26 Nov ended open at **£301** (Smoobu 26 Nov; no P12 stay on 26 Nov in `reservations.csv`) |
| a-p05-dec | Open; +300% min 1 unchanged (9 Nov 14:08Z) | 21 Dec **£2,141** (uncustomized £705); 29 Dec **£2,290** (£880); 29 Nov-2 Dec **£1,864** at -8%; 7-8 Dec 425 / 399 = £824; 13-14 Dec 471 / 468 = £939 |
| t-p05-valentine-2211 | Open; 1-28 Feb -5% min 4 unchanged (15 Nov 19:14:20Z) | 13-16 Feb **434 / 412 / 408 / 411 = £1,665** (£1,676), min 4 |
| t-p11-8dec-orphan | DSO +50% min 1 unchanged (15 Nov 18:48:33Z) | 8 Dec **£298** (£306; uncustomized £248). Target about £150-159 |
| t-p13-twins | No DSO change; the gap persists | 119 of 154 jointly open nights identical (yesterday 120 / 154). 13-21 Dec **3064856 £1,926 vs 3090701 £1,718 (+£208)**. 3-23 Jan **£3,349 vs £3,586 (-£237, 21 n)**. Widest single night: 18 Dec **227 / 202 (12.4%)**. Both refreshed 06:09:4xZ. Cause NOT KNOWN |
| P20 5 / 26 Dec +100% | 5 Dec **sold** (£426 room); 26 Dec unchanged | 26 Dec **£563** (£565; uncustomized £387), min 1 |

**H8. Scott Ellis Gardens 3588993 (t-seg-blocks-2411): blocks unchanged; still unmapped.** (Sources: Smoobu; `raw/prices_3588993.json`; `market.csv` 26 Nov.)
- **Blocks:** 20 Nov-10 Dec (modified 23 Nov 10:58:39) and 1-night blocks on 15 Dec, 6 Jan and 12 Jan, all modified 23 Nov 10:58-10:59. Smoobu `/rates` shows 5 Jan open, although a 5-6 Jan block record exists (23 Nov 10:58:58); `/rates` is taken as authoritative. Who set the blocks is NOT KNOWN.
- **26-29 Dec: 526 / 520 / 630 / 650 = £2,326.** Min stays 4 / 7 / 5 / 4, so only a 4-night stay arriving 26 Dec sells it.
- **4-5 Jan: 270 / 263.** Min 2 / 3, so it sells only as a 2-night stay arriving 4 Jan.
- Open nights in the next 180: **154**. 0 at the £170 minimum, 0 at the £4,000 maximum.
- **Question for Corentin (unchanged):** are the blocks intended, and is this flat P21 for `id_map.json`, `policy.json` and the pack?

**H9. P06 Marylebone 2 and 6-12 Dec: open, prices down again. Intentional-block listing (block from 13 Dec), numbers only.** (Sources: Smoobu; `raw/prices_3288517.json`, refresh 06:35:25Z.)
- **6-12 Dec: 333 / 302 / 304 / 317 / 312 / 333 / 324 = £2,225**, min 3 (yesterday £2,338, -4.8%; 25 Nov £2,697). Uncustomized is £2,320.
- 11 and 12 Dec arrivals still cannot sell at min 3.
- **2 Dec: £294**, min 1 (yesterday £317).
- No P06 log entry. Overrides and customizations were not read today. Cause NOT KNOWN.

### MEDIUM

**M1. Sync: 0 differences over £2 on all 16 Smoobu listings.** Comparison: Smoobu 07:19:07Z vs PriceLabs `price` in the snapshot, open nights 28 Nov-26 Jan. Min stay and availability also match on every date. `kpi_pack` `sync_issues` is [] for every ref. There is no cause to list (sync off, manual Smoobu override, DSO or push failure), because there is no mismatch.

**M2. Min stay and orphans, next 180 nights** (Smoobu 07:19:07Z, `an27.py`). Policy: 2-3 nights to 26 Jan; 5 from 27 Jan; 7 from 27 Mar.
- **Unsellable orphans:** **P11 3-4 Jan** (£148 / £163, min 3; C1). P09 25 Apr £466, min 5 (handback, ignored).
- **Gaps where only one stay shape sells:**
  - **P04 6-9 Dec** (£687; H4), new today.
  - 3588993 26-29 Dec and 4-5 Jan (H8).
  - P06 6-12 Dec (no 11 or 12 Dec arrivals).
- **Sellable short gaps a gap-fill rule would cover:**
  - P13 27 Nov (261 / 237) and 1 Dec (235 / 213), min 1.
  - P11 8 Dec £298 (min 1) and 23-25 Dec 277 / 255 / 264 (min 2).
  - P05 7-8 Dec (425 / 399) and 13-14 Dec (471 / 468) at min 2; 21 Dec £2,141 and 29 Dec £2,290 at min 1.
  - P20 26 Dec £563 (min 1).
  - P06 2 Dec £294 (min 1).
  - P04 2 Dec £425 (deprioritised).
  - P12 30 Nov-3 Dec (£1,118 at min 2; only a 2+2 split or one 4-night stay fills it cleanly).
- **Below policy (under 2 within 2 months):** only the DSO min-1 nights listed above.
- **Above 3 within 2 months:**
  - 3588993: 20 Dec (4), 26 Dec (4), 27 Dec (7), 28 Dec (5), 29 Dec (4), and 10 Jan and the January weekends (4).
  - P14 weekends (4; special setup).
- **2-4 months out, below 5:** P13 46 / 59 per twin; P05 30 / 48; P20 49 / 59; P04 33 / 59; 3588993 46 / 59; P14 34 / 59 (special).
- **4+ months out, below 7:** P13, P20 and 3588993 60 / 60. P05 (0 / 59) and P04 (0 / 60) comply. P14 35 / 60 (special).
- `kpi_pack` `gaps` is [] for every ref, so it misses P11 3-4 Jan and P04 6-9 Dec.
- Gap-fill / Orphan Day settings: **UNKNOWN** (`get_customizations` returns no orphan field).

**M3. Floor and ceiling, next 180 nights** (Smoobu open nights vs `listings.csv` min / max)
- **P14: 78 of 180 (43.3%) at the £450 minimum**, 27 Nov-21 Mar (yesterday 77 / 180). `kpi_pack` `bounds` for the next 30: 88.3% at min, average open price £450.00. The floor is setting the price. Special setup: numbers only.
- **P20: 1 of 149 at the £200 minimum** (10 Jan). `kpi_pack` next 30: 3.3%.
- **Every other listing: 0 at min and 0 at max.** Open nights: P04 161, P13 154 per twin, 3588993 154, P20 149, P05 140, P11 16, P06 8, P12 4, P09 1.

**M4. Listing hygiene and the info pack** (live `get_listing_data`; `data/id_map.json` and `seeker-estates/build/properties.py`, both last changed 22 Oct, so likely out of date)
- **21 PriceLabs listings, all push on, none hidden.** No change to base, min or max.
- **Vrbo copies push separately, in daytime only (H1).** P12 `_386e…`, P13 `_3d48…` and P11 `_7fd3…` inherit Reyhan's DSOs through `add_custom_pricing_from_parent`. **Question (unchanged): should they push at all?**
- **Unchanged:**
  - P02 Vrbo copy `_ca1c…` has not pushed since 24 Feb 07:31:33Z (P02 fully blocked).
  - 3588993 is not in id_map, policy or the pack.
  - id_map entries not in PriceLabs: `_unmatched` Marylebone Vrbo x3; P01 / P04 / P08 / P09 / P10 `pricelabs_other`; P13 Vrbo `_d0a5…` / `_125c…`.
  - P13 twins share coordinates 51.5088201, -0.2342476 (one flat, policy).
  - P03 is priced via Channex (pushed 02:45:30Z).
  - P15-P19 have no PriceLabs listing. P20 is not in the info pack.
- **Pack vs PriceLabs (unchanged; the pack is likely out of date):**
  - Mins match, except P14 (pack 400, PriceLabs 450).
  - Every PriceLabs max is above the pack's.
  - Bases differ on P01, P04, P05, P06, P09, P11, P12, P13 and P14.
  - P05 is 5-bed in the pack and 4-bed in PriceLabs.
- **P12 handback block:** Smoobu has 14 Dec 2026-29 Jun 2029; `policy.json` has 14 Dec 2026-21 Oct 2027 (unchanged; excluded either way).

**M5. Base vs market** (`market.csv` 26 Nov rows, bedroom-matched; P13 from today's `raw/neighbourhood_P13.json`, 2 BR P50 217 / P75 266, n = 116). Base vs P50 / P75:

| Listing | Base | P50 / P75 | vs P50 / vs P75 |
|---|---|---|---|
| P12 | 284 | 203 / 230 | **+39.9% / +23.5%** |
| P20 | 330 | 252 / 311 | +31.0% / +6.1% |
| 3588993 (3 BR) | 450 | 383 / 472 | +17.5% / -4.7% |
| P13 | 250 | 217 / 266 | +15.2% / -6.0% |
| P04 | 200 | 174 / 210 | +14.9% / -4.8% |
| P11 | 286 | 292 / 328 | -2.1% / -12.8% |
| P01 | 253 | 263 / 331 | -3.8% / -23.6% |
| P05 (4 BR) | 550 | 573 / 701 | -4.0% / -21.5% |
| P06 | 357 | 409 / 526 | -12.7% / -32.1% |

- UNKNOWN (no row in `market.csv`): P02, P03, P07, P08, P09, P10, P14. `kpi_pack` `market_percentiles` are empty for every ref.

Data gaps:
1. What triggers the 9-listing 05:59-06:49Z batch (PriceLabs schedule or dashboard Sync Now): NOT KNOWN. No logged edit and no `push_price` entry. Whether Sync Now is logged at all is NOT KNOWN.
2. Refreshes between the 26 Nov and 27 Nov mornings: NOT KNOWN (only the latest time is kept). So the P20 registration lag (14 h 43 m) is an upper bound.
3. Support ticket for t-pl-push-1811 sent or not: NOT CHECKED.
4. "`user_price` = previous push" (H2) is inferred from 83 of 83 dates. PriceLabs has not confirmed it.
5. Which Airbnb listing (1657 or 1455) took P04 10-13 Dec: NOT CHECKED here (Smoobu shows only "Airbnb").
6. P20 min-stay policy from 1 Dec: UNKNOWN (`policy.json` `listing_facts.P20` ends 30 Nov).
7. Not re-read live today: all customizations; overrides on P12, P06 and 3588993. For these, "unchanged" rests on the logs (0 entries since 25 Nov 17:02Z).
8. Causes of the overnight moves on P06 (-£113 on 6-12 Dec), P04 6-9 Dec (+£36) and the P13 twin gap: NOT KNOWN.
9. Orphan Day / gap-fill settings: UNKNOWN on every listing.
10. `market.csv` for 27 Nov: not in the snapshot; the 26 Nov rows were used.
11. OTA live prices: NOT CHECKED in this section.
