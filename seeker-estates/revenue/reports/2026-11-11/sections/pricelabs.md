## PriceLabs audit (D = 2026-11-11)

**Sources**
- Snapshot `data/snapshots/2026-11-11/`: `raw/listing_data.json`, `raw/prices_*.json` (window **12 Nov 2026 - 10 Jan 2027**; 11 Nov is Smoobu only), `listings.csv`, `prices.csv`, `reservations.csv`. Yesterday: `data/snapshots/2026-11-10/` and `reports/2026-11-10/sections/pricelabs.md`.
- Live PriceLabs reads, 11 Nov ~07:15-07:30Z:
  - `get_user_logs` for listing, group and account, 10-11 Nov.
  - `get_listing_data`, at 07:18Z and again at the end of the run.
  - `get_listing_date_overrides` for P11 3064196, P12 2699998, P05 3166592, P20 3547481 and P13 3064856.
  - `get_customizations` for P11, P05 and P20 (last-minute, occupancy, booking recency, far-out, demand).
- Live Smoobu GET `/api/rates`, 15 apartments, 11 Nov 2026 - 10 May 2027, taken **07:18:44Z**. Saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live11pl/smoobu_rates_a.json`, which holds no guest data.
- Booking create, modify and cancel times come from the Dispatcher's guest-free `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live11/smoobu_mod11_pe.json` (07:18:49Z).
- Scripts are in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live11pl/`: `sync.py`, `show.py`, `an.py`, `an2.py`, `gaps.py`.
- `kpi_pack.json` coverage:
  - `sync_issues` lists only P11 (20 nights, below).
  - `bounds` and `avg_open_price_next30` are present for P04, P05, P06, P11, P12, P13, P14 and P20 only.
  - `market_percentiles` is null for every ref, and `gaps` is empty for every ref.
  - The pack's `missing` field says market, comps and channel_checks are empty for 11 Nov.
- Policy respected: blocks on P02/P03/P06/P07; P14 special setup (numbers only); P13 counted as one flat; handbacks; the 15% / 20% stay discounts; the deprioritised P04 2 Dec and P12 17 Nov items. Camden's 18% Visibility Booster commission is expected.

### Changes since 10 Nov 06:00Z
- **`get_user_logs` (listing): 6 entries, all by reyhan@seekerestates.com, 10 Nov 16:28:21-16:28:36Z.** All are on P12 2699998, each copied "from parent" to the P12 Vrbo copy `_386e…`. The group and account logs have 0 entries.

| Time (Z) | P12 dates | Before (9 Nov) | Now (live overrides) |
|---|---|---|---|
| 16:28:21 | 12-20 Nov | -2% min 2 | **+5% min 2** |
| 16:28:30 | 30 Nov-3 Dec | -2% min 2 | **+5% min 2** |
| 16:28:36 | 7-13 Dec | -5% min 3 | **price removed (0%), min 3** |

  - Effect on Smoobu, 07:18Z:
    - 12-13 Nov: £201 / £250 -> **£216 / £269**.
    - 17-20 Nov: £245 / £250 / £256 / £280 -> **£262 / £268 / £274 / £299**.
    - 30 Nov-3 Dec: £1,126 -> **£1,116**. The uncustomized price fell, so the +5% nets about flat.
    - 7-13 Dec: £2,037 -> **£2,070**.
  - P12 pushed at 16:30:08Z (the Vrbo copy at 16:29:30Z).
- **Reyhan's 9 Nov settings are all still in place** (live `get_listing_data` 07:18Z; no base/min/max log entries since 10 Nov):
  - P04 3562176 base **200**.
  - P14 3267077 min **450**.
  - P05 3166592 max **3500**.
  - P11, P05, P20 and P13 3064856 overrides are unchanged from yesterday's list: no `updated_at` after 9 Nov 22:30:10Z.
- **Smoobu-side changes**, not in the PriceLabs logs. Times are Smoobu-local, from `smoobu_mod11_pe.json`:
  - P11 Booking.com **8-15 Dec created 10 Nov 17:26**.
  - P01 Airbnb **18-21 Dec cancelled 10 Nov 14:40:51**. P01 "Blocked channel" 160657036 (30 Nov-21 Dec) was **modified 36 s later, at 14:41:27**.
  - P20 Airbnb 25 Nov-5 Dec modified 10 Nov 15:46:46.
  - P13 3090701 Airbnb 13-17 Nov modified 11 Nov 01:39:41.
  - P20 Airbnb **21-25 Nov cancelled 11 Nov 04:37:07**.
- **Smoobu clock (inference, not verified):** Smoobu timestamps appear to be UTC+1, not UTC.
  - PriceLabs' P11 refresh at **16:28:54Z** already shows 8-14 Dec as Booked, yet Smoobu says the booking was created at 17:26.
  - Yesterday's P12 cancellation (Smoobu 9 Nov 23:30:03) was already reflected in a PriceLabs refresh at 22:30:29Z.
  - If this holds, P11 was booked at about 16:26Z and refreshed 2-3 minutes later.

---

### CRITICAL

**C1. P11 Camden: PriceLabs refreshed after the 8-15 Dec booking (10 Nov 16:28:54Z) but did not push. Smoobu is still selling the 09:27:10Z prices, £9-£35 a night under PriceLabs on 20 open nights (£325 in total)** (live `get_listing_data`; raw 11 Nov vs Smoobu 07:18Z; `kpi_pack` `sync_issues` P11 = the same 20 dates)

| Dates (open) | PriceLabs (raw 11 Nov) | Smoobu now | Gap |
|---|---|---|---|
| 29 Nov-4 Dec (6 n, inside next 30) | 241 / 224 / 237 / 260 / 299 / 354 = **£1,615** | 217 / 201 / 214 / 234 / 269 / 319 = **£1,454** | **-£161** |
| 15-18 Dec (4 n) | 212 / 222 / 246 / 304 | 201 / 211 / 234 / 288 | -£50 |
| 23-25 Dec (3 n) | 289 / 267 / 285 | 274 / 254 / 270 | -£43 |
| 3-9 Jan (7 n) | 183-219 | 174-208 | -£71 |

- **What matches:**
  - Smoobu equals PriceLabs on 18-19 and 22-25 Nov.
  - Min stays match on every date.
  - On the 20 mismatched dates, Smoobu equals the raw `user_price` field. That is the value from before the 16:28Z refresh.
- **The booking is registered in PriceLabs:** 8 Dec "Booked (Check-In)" through 14 Dec "Booked" (raw 11 Nov).
- **Push freshness:** `last_date_pushed` is still **10 Nov 09:27:10Z** at 07:18Z (22 h). It passes 24 h at 09:27Z today.
- **Possible causes** (none proven):
  - The booking-triggered refresh does not push.
  - The push failed.
  - Push is on (`push_enabled` true), so "sync off" is ruled out.
  - A manual Smoobu rate edit: not checked, because Smoobu keeps no rate history over the API.
  - A DSO is not the cause: overrides are unchanged since 9 Nov 21:21:47Z.
- **Why prices rose (not checked):** it fits P11's Booking Recency factor ("default", 5-15% for the next 30 days when there are no recent bookings) easing after the booking. Occupancy-based "Aggressive" moved too. Live `get_customizations` P11.
- Check: PriceLabs > 3064196 > "Sync Now", or the next daily push. Then confirm 29 Nov in Smoobu = £241.

**C2. Reyhan's 9-10 Nov edits are still live and unrecorded; several conflict with standing decisions. Reported for Corentin to confirm, not proposed** (live `get_listing_data`, overrides; `policy.json` unchanged since commit 16a005f, 25 Oct)
- **P14 min 450**: conflicts with `special_setups.P14` (the £500 minimum).
  - **65 of 180** Smoobu-open nights are at £450 (36.1%).
  - **28 of 30** in the next 30 are at £450 (£13,611 for 30 nights).
  - Numbers only, per policy.
- **P04 base 200** (pack and `id_map` 220; `recommended_base_price` 221).
  - P04 9-24 Nov is -4%; policy (24 Oct) says -8%.
  - Open next 30: 11-13 Nov £137 / £138 / £141; 18-24 Nov £139-£150; 6-11 Dec £184-£196; all min 3, per policy.
- **P11 darts nights 13-14 Dec are now sold under Reyhan's 22 Nov-18 Dec -3%.** The policy says the darts nights are +5% and "leave as it is".
  - Smoobu had £219 / £195.
  - The 8-15 Dec stay paid **£126.94 / £113.24 room** on those nights.
  - 15-17 Dec are still open at £201 / £211 / £234 on Smoobu (PriceLabs: £212 / £222 / £246).
- **P05 max 3500** and the +300% DSOs on 21 and 29 Dec (H4): not covered by policy.
- **P20 16-17 Nov and 22-24 Nov are min 2** (DSO 8 Nov). The policy says min 3 from 25 Oct to 30 Nov. P20 base is 330; policy says 350.
- **P13 9-12 Nov is -5%** (policy 0%).
- **P12 10 Nov edits** (above) run against open plan item a-p12-trim.

**C3. Two sellable nights are lost to calendar blocks, one of them tomorrow** (Smoobu 07:18Z; raw 11 Nov)
- **P09 12 Nov (tomorrow): £120, min 2, `unbookable` 1.** 11 Nov is blocked (Smoobu block 162726554) and 13-15 Nov is booked. The P09 DSO 9-12 Nov min 2 is still there. **t-p09-1112block: not fixed.** Check: 3318172 > DSO 12 Nov min 1, or delete the 11 Nov block.
- **P11 11-13 Nov are still blocked** (Smoobu "Blocked channel" 162775668, 10-14 Nov, created 9 Nov 18:37). Tonight is lost. Smoobu rates on those nights are £182 / £195 / £243; PriceLabs shows 12-13 Nov "Blocked". **t-p11-1013block: not fixed; who set it and why is unknown.**

### HIGH

**H1. P20: the 21-25 Nov Airbnb cancellation is not in PriceLabs yet. Smoobu has 20-24 Nov open as a 5-night run at prices PriceLabs computed while those nights were booked** (raw 11 Nov; Smoobu 07:18Z; live `get_listing_data`)
- **Cancelled at 11 Nov 04:37:07 (Smoobu time).** P20's last refresh and push was **10 Nov 09:27:29Z**. PriceLabs still shows 21 Nov "Booked (Check-In)" through 24 Nov "Booked".
- **On sale in Smoobu now:** 20 Nov £234 (min 3), 21 Nov £301 (min 3), 22-24 Nov £247 / £294 / £279 (min 2) = **£1,355**.
  - Yesterday at 07:26Z, 21-24 Nov were £266 / £219 / £250 / £247. The 09:27Z refresh after the booking raised them by £139 to £1,121.
  - 20 Nov still carries `unbookable` 1 from when it was an orphan. It is now sellable: min 3 fits inside the 5-night run.
- **20 Nov is no longer an orphan.** The 20-22 Nov delivery conflict (t-p20-delivery) changes shape:
  - Policy `listing_facts.P20.block_20_21_nov` says Smoobu blocks 20-22 Nov for delivery.
  - Smoobu actually blocks 18-19 Nov.
  - **20-22 Nov are now open for sale.** Question for Corentin: has the delivery moved to 18-19 Nov (then record it), or should 20-22 Nov be blocked?
- **`kpi_pack` `sync_issues` for P20 is empty.** The pack compares price only, so it misses the Booked/open status mismatch.
- Check: 3547481 > Sync Now. Then confirm that 21-24 Nov show open and that the prices are recomputed.

**H2. P11 8-15 Dec (Booking.com, room £1,012.86, booked 10 Nov): PriceLabs' share of the discount** (raw 10 / 11 Nov; Smoobu 07:18Z = the 09:27Z push; Dispatcher's extranet facts in `ctx11.md`)

| Layer | 8-14 Dec, 7 nights | Factor |
|---|---|---|
| PriceLabs uncustomized (raw 10 Nov, computed 9 Nov 21:22Z) | 253 / 252 / 283 / 347 / 349 / 244 / 216 = **£1,944** | |
| PriceLabs final on Smoobu at booking (09:27Z push) | 232 / 224 / 245 / 314 / 316 / 219 / 195 = **£1,745** | **0.898 (-£199)** |
| Booking.com Standard (extranet sync 12:50) | 256 / 247 / 270 / 346 / 348 / 241 / 215 = £1,923 | **1.102 x Smoobu** (1.100-1.103 every night) |
| Paid (room) | £1,012.86 | 0.5267 x Standard; 0.580 x Smoobu; **0.521 x uncustomized** |

- **PriceLabs layers took £199 (10.2%) off the uncustomized price.**
  - **Reyhan's -3% DSO accounts for about £54 of that** (£1,745 / 0.97 = £1,799).
  - The other about £145 comes from P11's occupancy profile ("Aggressive"; 28 days out falls in the 16-30 day band) and Booking Recency (default). Last-minute is 0% (live `get_customizations`). How the £145 splits between them is UNKNOWN.
- **Because the Booking.com stack is multiplicative, the -3% cost about £31 on the paid amount** (£1,012.86 / 0.97 = £1,044).
- **Booking.com cut £910 off its own Standard, and the Smoobu markup added back only £178.** So about 82% of the gap between uncustomized and paid sits on the Booking.com side, not in PriceLabs.
- After the booking, PriceLabs re-priced the same nights at 258 / 249 / 272 / 330 / 332 / 230 / 205 (£1,876; uncustomized £2,064). That matches Corentin's PriceLabs screenshot.
- **New observation for the channel section (not checked):**
  - Booking.com Standard is **1.10 x** the Smoobu rate on all 7 nights.
  - Policy `channel_pricing.booking_markup` says +15% since 24 Oct, which would be 1.15 x (£2,007).
  - The Smoobu rates for these nights did not change between the 09:27Z push and the 12:50 extranet sync: the next PriceLabs event was 16:28Z, which was not pushed.
  - So either the Smoobu Booking.com markup is now +10%, or something else lowered it. Check: Smoobu > Channel Manager > Booking.com > price settings.
- **18 Oct base-rise tally, using the Dispatcher's figures.** P11 base was 286 at booking (raised 18 Oct), so this stay counts: **+7 n / +£1,012.86**. P01 loses +3 n / -£720.90. Yesterday's like-for-like +11 n / £4,609.70 becomes **+15 n / £4,901.66** (plain arithmetic on the Dispatcher's figures; the method itself was not re-run here).

**H3. a-discount-cut recomputed: next 14 £960, next 30 £1,565 (yesterday £861 / £1,591). Not done: the PriceLabs discount layers are unchanged** (raw 11 Nov `uncustomized_price - price`; nights open in both PriceLabs and Smoobu; 14 = 12-25 Nov, 30 = 12 Nov-11 Dec; same exclusions as yesterday: handback nights, P14, P06, P04 2 Dec; `an.py`)

| Ref | Next 14 | Next 30 | Yesterday next 30 |
|---|---|---|---|
| P04 | 9 n £1,292 vs £1,681 (£389) | 15 n £2,420 vs £2,956, -18.1% (**£536**) | £462 |
| P11 | 6 n £352 | 12 n £2,741 vs £3,241 (**£500**). On the Smoobu prices actually on sale (£2,580): **£661** | £610 |
| P05 | 2 n £150 | 8 n £3,717 vs £4,130 (**£413**) | £493 |
| P20 | 6 n £226 | 7 n £2,031 vs £2,334 (**£303**). It excludes the reopened 21-24 Nov (PriceLabs still shows Booked); adding them on Smoobu prices gives +£242 | £145 |
| P12 | -£62 | -£52 | £153 |
| P13 3064856 / 3090701 | -£40 / -£45 | -£56 / -£69 | -£139 / -£129 |
| P09 | -£10 | -£10 | -£4 |
| **Total** | **£960** | **£1,565** | **£1,591** |

- **P12 turned negative** because of Reyhan's +5% DSOs.
- **Windows trimmed to match yesterday's** (12-24 Nov / 12 Nov-10 Dec): **£911 / £1,447**.
- **Customizations read live today** (P04 was read yesterday and has no change logged):
  - **P11:** last-minute 0% (linear, 15 d); occupancy "Aggressive" (0-15 d: -30% at 10% occupancy up to 0% at 100%; 16-30 d: -20% up to +10%); Booking Recency default (5-15%, next 30 d); far-out +30% after 150 d.
  - **P05:** last-minute 1% gradual over 15 d; occupancy Aggressive; Booking Recency default; demand Conservative; far-out +30%.
  - **P20:** last-minute 0%; occupancy Aggressive; Booking Recency default; far-out +30%.
- Check: 3562176 / 3166592 / 3064196 / 3547481 > Customizations > Occupancy profile and Booking Recency.

**H4. Status of the PriceLabs-side plan items, 11 Nov** (Smoobu 07:18Z; live overrides)

| Item | Status | Numbers |
|---|---|---|
| a-p13-record | **Not done** | `policy.json` is unchanged since 25 Oct. Add to the list: P12 10 Nov 16:28Z (12-20 Nov +5%, 30 Nov-3 Dec +5%, 7-13 Dec 0% min 3). Everything from yesterday (C2) is still to record. |
| a-discount-cut | **Not done** | £960 / £1,565 (H3) |
| a-p12-trim | **Moved the other way (Reyhan, 10 Nov 16:28Z)** | 30 Nov-3 Dec 282 / 266 / 277 / 291 = **£1,116** (target about £957). 7-10 Dec 267 / 274 / 285 / 291 = **£1,117** (target about £955). 11-13 Dec 322 / 334 / 297 = **£953** (target about £803). 18-20 Nov £268 / £274 / £299 at +5% (target about -9%). **12 Dec and 13 Dec are still min 3 before the 14 Dec handback block, so arrivals on those days cannot sell.** For Corentin. |
| a-p05-dec | **Open; DSOs unchanged** | 21 Dec **£2,230** (+300%, min 1, uncustomized £762). 29 Dec **£2,786** (+300%, min 1, uncustomized £1,148). 7-8 Dec £471 / £452 = **£923** (+3% min 2; was £947). 13-14 Dec £518 / £505 = £1,023 (+5% min 2). |
| a-peak-check (P13) | **Not moved** | 10-26 Dec still -2% min 3 on both twins (live 3064856 overrides, `updated_at` 9 Nov 21:22:44). 17 open nights: 3064856 **£3,807**, 3090701 **£3,948**. On 10 Dec the twins swapped order: 3064856 £221 -> £272, 3090701 £234 -> £207. 25-26 Dec are min 3 (£222 / £226; £235 / £239). |
| t-p12-26nov-price | **Not fixed** | 26 Nov **£287**, min 1, DSO +15% (4 Nov) unchanged. The price fell from £306 only because the uncustomized price fell (£271 -> £256). Target about £247. |
| t-p20-5dec-orphan | **Not fixed** | 5 Dec **£311**, min 3, `unbookable` 1. Sits between 25 Nov-5 Dec and 6-14 Dec, both booked. DSO 1-20 Dec 0% min 3 unchanged. |
| t-p11-1013block | **Not fixed** | C3 |
| t-p09-1112block | **Not fixed; the night is tomorrow** | C3 |
| t-p20-delivery | **Changed: 20-22 Nov now open** | H1 |

**H5. Orphans and min stay vs policy, next 60 nights** (Smoobu 07:18Z; `gaps.py`; policy 2-3 nights, 5 from 10 Jan, 7 from 11 Mar)
- **Unsellable 1-night gaps:**
  - **P09 12 Nov** £120 min 2 (C3).
  - **P20 5 Dec** £311 min 3.
  - **P06 11 Nov (tonight)** £200 (= min) min 2. This is an intentional-block listing; numbers only.
- **Gone since yesterday:**
  - **P20 20 Nov** is no longer an orphan (H1).
  - **P01 18-20 Dec did not reopen:** Smoobu blocked them in the handback block 36 s after the cancellation (question for Corentin in M3). P01 has **0 open nights** in the next 180.
- **Min 1 inside 2 months:**
  - P12 26 Nov (£287).
  - P13 17 Nov (+35%; £227 / £203), 27 Nov (+50%; £322 / £245) and 1 Dec (+50%, intentional per policy).
  - P05 21 and 29 Dec.
  - P04 2 Dec (£459; deprioritised).
- **Above 3 inside 2 months:**
  - P20 26-31 Dec min 4-6 (Christmas DSOs, 11 Oct).
  - P14 Fri-Sun min 4 (special setup).
- **Short runs a gap-fill rule would sell:**
  - P13 11-12 Nov (3064856 £200 / £204; 3090701 £179 / £182; min 2).
  - P04 11-13 Nov (£137 / £138 / £141, min 3; P04 is never under 3).
  - P12 12-13 Nov (£216 / £269, min 2).
  - P11 18-19 Nov (£150 / £170, min 2).
  - P05 16-17 Nov (£378 / £393), 7-8 Dec (£471 / £452) and 13-14 Dec (£518 / £505), all min 2.
  - P11 23-25 Dec (£274 / £254 / £270, min 2).
  - P12 11-13 Dec. Only a 3-night stay arriving 11 Dec fits; see a-p12-trim.
- **2+ months ahead (from 10 Jan) below 5:**
  - P11 min 3 on 10 Jan-28 Feb (50 n).
  - P13 min 3 on 10 Jan-4 Feb, then min 4 on Mon-Thu runs to 10 Mar.
  - P05 Jan min 3 / Feb min 4.
  - P20 Jan min 3 / Feb-4 Mar min 4.
  - P04 Jan min 3 / Feb min 4.
  - P14 min 4 (special setup).
- **4+ months ahead (from 11 Mar) below 7:** P11 min 5 (60 n); P13 and P20 min 5-6; P14 min 5; P09 25 Apr min 5.

### MEDIUM

**M1. Push freshness at 07:18Z: no Smoobu or Channex listing is over 24 h yet, but eleven are due to go stale during the morning unless the daily push runs** (live `get_listing_data`)

| Listing | Last push (Z) | Over 24 h from |
|---|---|---|
| P09 3318172 | 10 Nov 07:27:40 | 07:27Z today |
| P11 Vrbo `_7fd3…` | 10 Nov 08:02:22 | 08:02Z |
| P08 3318167 | 10 Nov 08:22:42 | 08:22Z (fully booked to the 13 Nov handback) |
| P13 Vrbo `_3d48…` | 10 Nov 08:30:49 | 08:30Z |
| P11 3064196 | 10 Nov 09:27:10 (refreshed 16:28:54, not pushed: C1) | 09:27Z |
| P13 3064856 / 3090701 | 09:27:12 / 09:27:14 | 09:27Z |
| P05, P06, P14 | 09:27:23 | 09:27Z |
| P20 3547481 | 09:27:29 (cancellation pending: H1) | 09:27Z |
| P04 3562176 | 09:27:32 | 09:27Z |

- **Fresh:** P12 16:30:08Z (P12 Vrbo 16:29:30Z), P02 00:23:39Z, P03 Channex 03:29:18Z, P07 03:59:04Z, P01 04:47:56Z, P10 05:13:55Z (all 11 Nov except the P12 pair).
- **Stale with push on:** P02 Vrbo `_ca1c…`, last push **24 Feb 2026**, `last_refreshed_at` null.
- Check: `last_date_pushed` on P09 after 07:28Z, and on the 09:27Z group after 09:30Z.

**M2. Floor and ceiling, next 180 nights** (Smoobu open nights 11 Nov-9 May vs PriceLabs min/max; `an2.py`; `kpi_pack` `bounds` = first 60 days)
- **P14: 65 of 180 open nights (36.1%) at £450 = min.** `kpi_pack` gives 61.7% of 60. Special setup: numbers only.
- **P06:** 1 of 4 open nights at the £200 min (11 Nov). Intentional-block listing.
- Every other listing: 0 at min and 0 at max. P05 max is 3500; 29 Dec £2,786 is the highest night.

**M3. P01 18-20 Dec: blocked, not reopened, after the Airbnb cancellation** (`smoobu_mod11_pe.json`; raw 11 Nov; Smoobu)
- **Fact:** "Blocked channel" 160657036 now runs 30 Nov-21 Dec. It was modified 10 Nov 14:41:27, 36 s after the 14:40:51 cancellation. PriceLabs (refreshed 11 Nov 04:47:55Z) shows 18-20 Dec "Blocked" at £284 / £279 / £243.
- **Policy:** the P01 handback's last night is 20 Dec, and the gap block covers 30 Nov-17 Dec. Nights before the date should be sold normally.
- **Question for Corentin:** was blocking 18-20 Dec intended? Who extended the block is UNKNOWN.

**M4. Base vs market** (last row per ref in `data/snapshots/2026-11-10/market.csv`; there is no 11 Nov market file; `kpi_pack` `market_percentiles` is null)

| Ref | Base | P50 | vs P50 | P75 | vs P75 | Row pulled |
|---|---|---|---|---|---|---|
| P12 | £284 | £204 | +39.2% | £230 | +23.5% | 10 Nov |
| P09 | £176 | £133 | +32.3% | £160 | +10.0% | 9 Nov |
| P20 | £330 | £250 | +32.0% | £318 | +3.8% | 10 Nov |
| P04 | £200 | £174 | +14.9% | £216 | -7.4% | 10 Nov |
| P13 | £250 | £221 | +13.1% | £275 | -9.1% | 10 Nov |
| P11 | £286 | £288 | -0.7% | £325 | -12.0% | 10 Nov |
| P01 | £253 | £258 | -1.9% | £331 | -23.6% | 2 Nov |
| P05 (4 BR) | £550 | £572 | -3.8% | £715 | -23.1% | 10 Nov |
| P06 | £357 | £405 | -11.9% | £507 | -29.6% | 2 Nov |

- P02, P03, P07, P08, P10 and P14: no usable row (UNKNOWN, `market.csv`).

**M5. Listing hygiene and info pack** (live `get_listing_data`; `data/id_map.json`; `/home/user/seeker-social/seeker-estates/build/properties.py`)
- **All 20 PriceLabs listings:** `push_enabled` true, `isHidden` false. No listing has push off.
- **Vrbo copies push separately and inherit DSOs "from parent":**
  - P11 `_7fd3…`, P12 `_386e…` (got Reyhan's 10 Nov DSOs) and P13 `_3d48…`.
  - **P02 `_ca1c…` has been stale since 24 Feb 2026.**
  - Question: should the Vrbo copies push at all, and should P02's be removed?
- **Duplicates:** P13 3064856 and 3090701 share coordinates 51.5088201, -0.2342476. This is one flat by policy, not an issue.
- **`_unmatched` (`id_map.json`):** the three Marylebone Vrbo ids (`_a7f5a076…`, `_4a980bb7…`, `_380ddc1a…`) are **not among PriceLabs' 20 listings today**.
  - The same is true of these `pricelabs_other` ids:
    - P01, P08, P09 and P10 (Channex).
    - P04 Vrbo `_20df1e73…`.
    - P13 `_d0a5f202…` and `_125c15c5…`.
  - Question: remove them from `id_map.json`?
- **`confidence: check`:**
  - **P03 is priced via Channex, not Smoobu.** Last push 11 Nov 03:29:18Z; base 323 / min 100 / max 1500. It is fully blocked (intentional).
  - **P15-P19 have no PriceLabs listing.** Question: priced elsewhere, or in another account?
- **Not in the info pack:** P20 3547481, PriceLabs 200 / 330 / 1800. `id_map` says min 220 / base 350, and policy says base 350. Question: which is right?
- **Pack (`build/properties.py`) vs PriceLabs.** The pack is out of date; these are differences, not errors:
  - **P04 base 220 vs 200.**
  - **P14 min 400 / base 475 vs 450 / 525.**
  - **P05 base 455 / max 780 vs 550 / 3500.**
  - Bases also differ on P01 (230 vs 253), P06 (340 vs 357), P09 (160 vs 176), P11 (260 vs 286), P12 (270 vs 284) and P13 (235 vs 250).
  - Every PriceLabs max is above the pack's (e.g. P01 450 vs 650, P08 350 vs 1000, P12 400 vs 2000).

Data gaps:
1. The raw window starts 12 Nov. For 11 Nov, PriceLabs status, `uncustomized_price` and `unbookable` are NOT CHECKED; the figures come from Smoobu.
2. Why P11's 16:28:54Z refresh was not pushed (push failure vs a refresh-only trigger) is UNKNOWN. A manual Smoobu edit is NOT CHECKED, because Smoobu has no rate history over the API.
3. The Smoobu timestamp zone (UTC vs UTC+1) is inferred from two refresh/booking pairs and not verified.
4. How P11's other £145 of PriceLabs discount splits between occupancy and Booking Recency is UNKNOWN.
5. The 1.10 x Booking.com / Smoobu ratio on P11 8-14 Dec has not been checked against the Smoobu channel price setting.
6. Live overrides were read for P11, P12, P05, P20, P13 3064856, P09 and P04. P09 still has 12 Nov min 2 (`updated_at` 5 Nov 10:56:24Z); P04's 9 Nov DSOs are unchanged. For P06, P13 3090701, P14 and the blocked listings, "unchanged" rests on `get_user_logs` (0 entries since 10 Nov 06:00Z) plus the raw prices. Customization changes are not covered by `get_user_logs`: NOT CHECKED for P04, P12, P13 and P14 today.
7. `kpi_pack` `market_percentiles` is null, and `bounds` is missing for P01-P03 and P07-P10. Market gaps use the 10 Nov `market.csv`.
8. P20 21-24 Nov and P11 prices after the next refresh/push: NOT CHECKED (see the end-of-run push check below).
9. Who extended the P01 block to 18-20 Dec, and who set the P09 11 Nov and P11 10-14 Nov blocks: UNKNOWN.
