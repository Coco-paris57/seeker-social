## PriceLabs audit (D = 2026-11-03)

**Sources**
- Snapshot `data/snapshots/2026-11-03/`: `raw/listing_data.json` (06:55Z), `raw/prices_*.json` (06:57-07:18Z), `prices.csv` (07:18Z; `smoobu_price` = Smoobu rate, `pricelabs_price` = PriceLabs `price`), `listings.csv`, `reservations.csv` (Smoobu, room only, cleaning excluded).
  - **Raw window is 4 Nov 2026 - 2 Jan 2027.** Tonight (3 Nov) comes from live `get_listing_prices` (P13 3064856, P12).
- Baseline: `data/snapshots/2026-11-02/` and `reports/2026-11-02/sections/pricelabs.md`.
- **Live read-only calls, 3 Nov 07:20-07:40Z**, one at a time except one pair (group and account `get_user_logs`). That pair ran in parallel; both returned 200 and empty.
  - `get_user_logs` listing / group / account, 2-3 Nov.
  - `get_listing_data` (all 20 listings, 07:21Z).
  - `get_customizations` (toggled_on=false; last-minute, occupancy, booking recency, seasonality, demand, far-out): P04, P05, P06, P11, P12, P13 3064856 + 3090701, P20, P09.
  - `get_listing_date_overrides`: P12, P11, P04, P13 3064856, P05, P20, P06.
  - `get_listing_prices`: P13 3064856 3-4 Nov; P12 3-4 Nov.
- `kpi_pack.json`: `sync_issues` lists only P12 4 Nov. `gaps` is [] for every property. `market_percentiles` are all null, and market/comps/channel_checks are "empty". Base vs market therefore uses the 2 Nov rows of `data/snapshots/2026-11-02/market.csv`, plus `raw/neighbourhood_P13.json` for P13 (2 BR n=117, P50 £224, P75 £280).
- Policy respected: P02/P03/P06/P07 blocks, P14 special setup, handbacks (P01 20 Dec, P08 13 Nov, P09 26 Nov, P10 18 Nov, P12 13 Dec), P13 1 Dec intentional, P13 = one flat. Reyhan edits that cross a standing decision are reported as conflicts for Corentin to confirm. They are not new proposals.

### What changed since 2 Nov 06:00Z
- **Logs (`get_user_logs`, listing):** 35 entries since 2 Nov 00:00Z. All are from reyhan@ (same IP as before). Group and account logs have 0 entries.
- **No `base_price` entry after 2 Nov 00:16:02Z.** The base review (a-base-review-1102) produced no base change in PriceLabs. **P20 is still 330** (Corentin's 24 Oct decision was 350), and P13 is still 250.
- **New edits, 2 Nov 15:02-15:05Z (parents, each mirrored to its Vrbo copy via `add_custom_pricing_from_parent`):**

| Time (Z) | Listing | Change |
|---|---|---|
| 15:02:05 | P12 2699998 | **2-4 Nov -10%, min 2** |
| 15:02:15 | P12 | **12-13 Nov -5%, min 2** |
| 15:02:55 | P12 | **16 Nov-13 Dec -10%, min 2** (covers 17 Nov; replaces the -7% of 31 Oct) |
| 15:04:14 | P12 | **26 Nov +25%, min 1** |
| 15:05:01 | P11 3064196 | **10 Nov-18 Dec -5%, min 2** (re-adds a cut that was removed at 00:11:52Z; covers the darts nights 13-17 Dec) |
| 15:05:27 | P13 3064856 (+3090701, Vrbo) | **8-12 Nov -5%, min 2** (re-adds a cut on dates Corentin set to 0% on 24 Oct) |
| 15:05:33 | P13 (3 listings) | **7-20 Dec -2% -> -5%, min 2** |
| **23:26:31** | **P20 3547481** | **16-19 Nov -5% -> -2%, min 3 -> min 2** |

- **Customizations: no change vs 2 Nov** on P04, P05, P06, P11, P12, P13 (both), P20 and P09 (live `get_customizations`).
- **Overrides with no change since 2 Nov:** P04, P05, P06. P20 changed only on 16-19 Nov.
- `listings.csv`: no change to base, min or max. Recommended base is unchanged (P13 237/236, P20 347, P12 273).

---

### CRITICAL

**C1. Push freshness: nothing priced through Smoobu pushed overnight on its own. P09 crosses 24 h at 07:53Z today. P04's Smoobu gap is gone.** (live `get_listing_data` 07:21Z)

| Ref | Last push | Age at 07:21Z | What triggered it |
|---|---|---|---|
| **P09 3318172** | 2 Nov 07:53:39Z | **23 h 28 m; crosses 24 h at 07:53Z** | no log entry |
| P05 3166592 | 2 Nov 08:54:33Z | 22 h 27 m (crosses 08:54Z) | no log entry |
| P04 3562176 | 2 Nov 08:54:44Z | 22 h 27 m (crosses 08:54Z) | no log entry |
| P06 3288517 | 2 Nov 09:39:38Z | 21 h 42 m (crosses 09:39Z) | no log entry |
| P12 2699998 | 2 Nov 15:05:17Z | 16 h 16 m | Reyhan's DSOs at 15:02-15:04Z |
| P11 3064196 | 2 Nov 15:05:46Z | 16 h 15 m | DSO at 15:05:01Z |
| P13 3064856 / 3090701 | 2 Nov 15:06:10Z / 15:06:13Z | 16 h 15 m | DSOs at 15:05:27-33Z |
| P20 3547481 | 2 Nov 23:30:16Z | 7 h 51 m | DSO at 23:26:31Z |

- **Pushed overnight on their own schedule (no logged edit):** P02 00:24Z, P03 (Channex) 03:14Z, P14 04:33Z, P07 04:38Z, P01 05:54Z, P10 06:02Z, P08 06:02Z, P12 Vrbo 07:09Z.
  - Every listing in that group is fully blocked, sold out, or a handback/special setup.
  - **None of the 8 listings priced through Smoobu with open nights (P04, P05, P06, P09, P11, P12, P13, P20) pushed overnight unless an edit triggered it.**
  - The 2 Nov pushes for P04/P05 (08:54Z), P06 (09:39Z) and P09 (07:53Z) have no log entry, so they look like a daily slot about 1 hour earlier than 1 Nov's (P09 07:55Z, P04/P05/P06 09:13Z). If that holds, **P09 should push at about 07:53Z, P04/P05 at about 08:54Z and P06 at about 09:39Z today. Re-read `last_date_pushed` after 09:45Z.**
- **P04 Smoobu-vs-PriceLabs gap 9-13 Nov: GONE.** PriceLabs £167 / £169 / £170 / £174 / £179 = £859, and Smoobu is identical (`prices.csv`). It was closed by the 2 Nov 08:54:44Z push, which has no log entry.
- **New sync gap: P12 4 Nov.** PriceLabs **£196** vs Smoobu **£170** (**-£26**; `kpi_pack.sync_issues`, `prices.csv`).
  - Live: 3 Nov £189 and 4 Nov £196 (refreshed 15:05:16Z, DSO -10%, min 2); `user_price` reads £195 / £203. Smoobu's 3 Nov rate is not in the snapshot (NOT CHECKED).
  - £170 matches no PriceLabs field.
  - Possible causes, none proven: a manual Smoobu rate, a push failure for that date, a Smoobu-side rule. The DSO cannot explain it, because the DSO is already inside the £196.
  - 3-4 Nov is P12's only open run before 5 Nov.
- **PriceLabs has not seen the P11 Booking.com 20-22 Nov booking** (booked 2 Nov): raw (07:10Z) shows 20-21 Nov open at £230 / £231. P11's last refresh was 15:05:44Z, so the booking most likely arrived after that refresh. Until P11 refreshes, its occupancy and booking-recency layers treat 20-21 Nov as unsold.
- **Check:** PriceLabs > Sync / push history for 3318172, 3166592, 3562176, 3288517 after 09:45Z. Check Smoobu's 4 Nov rate on Mile End for a manual price. Use a manual "Sync now" on 3064196 only if Corentin wants it (read-only here).

### HIGH

**H1. Reyhan conflicts with standing decisions: three got worse on 2 Nov 15:02-15:05Z, one is new at 23:26Z, the rest are unchanged** (`get_user_logs`; live overrides; raw prices; `policy.json`)

| Conflict | Policy | PriceLabs now | Prices now (raw, 3 Nov) | Status vs 2 Nov |
|---|---|---|---|---|
| (a) **P12 17 Nov** | `deprioritised`: Corentin won't change Mile End 17 Nov +50% | **-10%, min 2** (15:02:55Z; was -7%) | **£226** (uncust £276) | **Worse** (-7% -> -10%) |
| (b) **P11 darts 13-17 Dec** | 21 Oct "average above £300/night"; "+5%, leave as is" | **-5%, min 2** (15:05:01Z; was 0% after 00:11:52Z) | **£228 / £202 / £207 / £217 / £237 = £1,091, avg £218.20** (2 Nov raw £1,150, avg £230) | **Reversed**: yesterday's improvement is undone; avg is now £81.80 below £300 |
| (c) **P13 8-12 Nov** | 24 Oct: overrides set to 0% (Corentin) | **-5%, min 2** (15:05:27Z, 3 listings) | 3064856 10-12 Nov **£151 / £150 / £151** (were £159 each); 3090701 £183 x3 (were £193) | **Re-broken** (it was fixed at 00:12Z) |
| (d) **P20 base 350 / -5% 31 Oct-19 Nov** | `price_24oct` (Corentin) | base **330**, min 200 (no change since 00:16:02Z); 6-15 and 20-24 Nov -5% min 3; **16-19 Nov -2%, min 2** (23:26:31Z) | 6-9 Nov **£229 / £233 / £228 / £241**; 16-19 Nov **£245 / £248 / £295 / £293** | **Base conflict open** (no base review action). **New: min 2 on 16-19 Nov** conflicts with `listing_facts.P20.min_stay` "3 nights from 25 Oct to 30 Nov" |
| (e) **P04 -8% on 1-25 Nov, min 3** | 24 Oct (Corentin) | **9-24 Nov -10%, min 3** (31 Oct 22:11:36Z) | 9-13 Nov £167-£179 | **Unchanged** |
| (f) **P13 base 250** | not in `price_changes` | **250** (recommended 237 / 236) | - | **Unchanged** |

- The 2 Nov afternoon edits reverse two of the three items marked "fixed/better" in yesterday's audit, (b) and (c).
- **Check:** PriceLabs > Date Specific Overrides on 2699998 16 Nov-13 Dec (especially 17 Nov), 3064196 10 Nov-18 Dec (especially 13-17 Dec), 3064856 8-12 Nov, 3547481 16-19 Nov (min stay) and 3547481 > Base. Corentin to confirm each.

**H2. a-discount-cut: the gap widened again, mostly from the 15:02-15:05Z DSOs** (raw `price` vs `uncustomized_price` on PriceLabs-open nights; handback nights excluded; P05 9 Nov and P04 2 Dec excluded; P13 netted; P06 and P14 excluded from totals)
- **Layers still active (identical to 2 Nov):**

| Ref | Last-minute | Occupancy | Booking recency | Seasonality | Demand | Far-out |
|---|---|---|---|---|---|---|
| P04 | -5% gradual, 15 d | Aggressive | ON default (5-15%) | off | Conservative | +30% after 150 d |
| P05 | -1% gradual, 15 d | Aggressive | ON default | off | Conservative | +30% after 150 d |
| P11 | 0% | Aggressive | ON default | off | off | +30% after 150 d |
| P12 | 0% | Custom (milder) | ON default | off | Mod. Conservative | +30% after 150 d |
| P13 3064856 / 3090701 | 0% (14 d) | Aggressive | ON default | Mod. Conservative ON | Conservative | +30% after 150 d |
| P20 | 0% | Aggressive | ON default | off | off | +30% after 150 d |
| P06 | 0% | Aggressive | ON default | off | off | Market Driven (Balanced) |
| P09 | **-18%** gradual, 15 d | Market Driven (toggle off) | off, so the default applies | off | Mod. Aggressive | +20% after 120 d |

- **Final vs uncustomized.** Windows: next 14 = **4-17 Nov**, next 30 = **4 Nov-3 Dec**. "2 Nov raw" = the same dates in yesterday's raw, which for P11/P12/P13 is after the 00:12Z edits and before the 15:05Z edits.

| Ref | Next 14 now | 2 Nov raw | Next 30 now | 2 Nov raw |
|---|---|---|---|---|
| P12 | 4 n £883 vs £1,032, **-14.4% (£149)** | -7.9% (£81) | 11 n £2,647 vs £3,148, **-15.9% (£501)** | -9.3% (£275) |
| P11 | 4 n £879 vs £1,068, **-17.7% (£189)** | -13.5% (£144) | 20 n £4,195 vs £4,769, **-12.0% (£574)** | -7.5% (£356) |
| P20 | 9 n £2,148 vs £2,537, **-15.3% (£389)** | -11.5% (£262) | 16 n £4,166 vs £4,773, **-12.7% (£607)** | -10.9% (£492) |
| P04 | 5 n £859 vs £1,099, -21.8% (£240) | -21.8% | 12 n £2,178 vs £2,746, **-20.7% (£568)** | -20.6% |
| P05 | 2 n £771 vs £997, -22.7% (£226) | -21.4% | 6 n £2,928 vs £3,343, -12.4% (£415) | -12.0% |
| P13 3064856 | 6 n £913 vs £974, -6.3% (£61) | -2.4% | 8 n £1,561 vs £1,521, +2.6% | +5.1% |
| P13 3090701 | 6 n £1,110 vs £1,179, -5.9% (£69) | -1.9% | 8 n £1,581 vs £1,605, -1.5% (£24) | +1.3% |
| P09 | 3 n £389 vs £413, -5.8% (£24) | -5.1% | same (handback) | |
| P08 | 3 n £594 vs £577, +2.9% | +0.8% | same (handback) | |
| P06 (8-11 Nov) | 4 n £987 vs £1,067, -7.5% (£80) | -10.5% (£104) | same | same |

- **Net uncustomized minus final (P06 and P14 excluded, P13 netted): next 14 £1,330** (2 Nov raw, same dates £1,009); **next 30 £2,656** (same dates £2,009). With P06 included: £1,410 / £2,736. Yesterday's headline (3 Nov-2 Dec) was £2,281.
- **Of the +£647 on next 30:** P12 +£226 and P11 +£218 come from the re-added DSOs; P13 +£83 from 8-12 Nov -5%; P20 +£115 (algorithm movement and the 10-13 Nov booking: 6-9 Nov finals rose to £229-£241 while uncustomized rose more).
- **Caveat:** P11 counts 20-21 Nov as open (PriceLabs has not seen the booking, C1), and P20 counts 20-22 Nov as open (delivery block, M3).
- **Check:** PriceLabs > listing > Customizations. Still open: P04 -5% / P05 -1% / P09 -18% last-minute, Aggressive occupancy (all except P12 and P09), and Booking Recency default on all. To get no adjustment, a layer must be set to "Custom 0%"; switching the toggle off lets the PriceLabs default apply.

**H3. Orphans and peak nights** (live overrides and prices; raw; `reservations.csv`)
- **P13 3 Nov (tonight, t-p13-3nov): NOT fixed. It cannot sell.**
  - 3064856 3 Nov is **£124, min 2** (DSO min-only, 2 Nov 00:12:22Z); live, refreshed 15:06:09Z.
  - 4 Nov is "Blocked" because 3090701 carries the Airbnb 4-8 Nov stay (a booking, per policy). A min-2 arrival tonight cannot fit.
  - Needs a min-1 DSO on 3 Nov (3064856 and 3090701).
- **P12 26 Nov (a-p12-26nov): min fixed, but priced high.**
  - DSO **+25%, min 1** (15:04:14Z): **£352** (uncust £303; neighbours booked 25 Nov £254 and 27 Nov £267).
  - It is now sellable as a 1-night stay at 1.32-1.39x its neighbours. Corentin to judge the +25%.
  - `kpi_pack.gaps` no longer lists it.
- **P05 9 Nov (a-p05-9nov): unchanged.** DSO +300%, min 1 (30 Oct 22:09:42Z): **£1,435** (uncust £412); neighbours booked 8 Nov £444 and 10 Nov £450.
- **P05 29 Dec: unchanged.** DSO +100%, min 1 (18 Oct 20:34:32Z): **£1,354** (uncust £1,121); neighbours booked 28 Dec £790 and 30 Dec £831.
- **P13 25-26 Dec: unchanged.**
  - DSO 23-26 Dec -3%, **min 3** (27 Oct 11:58:10Z). 3064856 24 / 25 / 26 Dec £228 / £229 / £232; 3090701 £229 / £232.
  - 27 Dec is taken by the 3090701 Airbnb 27 Dec-3 Jan stay, so **arrivals on 25 or 26 Dec cannot fit.**
- **Check:** 3064856 / 3090701 DSO 3 Nov and 25-26 Dec (min stay); 2699998 DSO 26 Nov; 3166592 DSO 9 Nov and 29 Dec (a-peak-check).

**H4. New bookings vs PriceLabs** (raw; `reservations.csv`)

| Booking | PriceLabs sees it? | PriceLabs price on the nights | Room paid | Ratio |
|---|---|---|---|---|
| **P06 Airbnb 12-15 Nov** (booked 1 Nov) | **Yes, now** (`booked_date` 2026-11-01, after the 2 Nov 09:39Z refresh; occupancy next 30 went from 77% to 87%) | `booked_price` now reads £285 + £319 + £324 = £928 (recomputed after booking, not the price at booking time) | £541.00 | n/a (price at booking time UNKNOWN; yesterday's estimate was £832 or £891) |
| **P20 Airbnb 10-13 Nov** (booked 2 Nov) | **Yes** (`booked_date` 2026-11-02) | `booked_price` £233 + £234 + £239 = **£706** | £510.00 | **0.722x** |
| **P11 Booking.com 20-22 Nov** (booked 2 Nov) | **No** (C1) | before 15:05Z £241 + £243 = **£484**; after the -5% DSO £230 + £231 = **£461** | £430.11 | **0.889x / 0.933x** (booking time unknown, so both are shown; before the Smoobu +15% Booking.com markup) |

- P06's remaining open nights 8-11 Nov rose to **£236 / £240 / £246 / £265 = £987** (2 Nov raw £891). The DSO is unchanged (-2%), so the rise comes from the occupancy layer after the 12-15 Nov booking.
- The P20 0.722x is OTA-side (Airbnb rules); for that, see the channel section.

### MEDIUM

**M1. P20 min stay 16-19 Nov is 2 against policy 3** (H1d). Prices £245 / £248 / £295 / £293. Check 3547481 DSO 16-19 Nov.

**M2. Floor / ceiling** (`kpi_pack.bounds`, 60-day raw)
- 0% at min and 0% at max on every priced listing. **P14 is 75% at the £500 minimum** (special setup: numbers only).
- 180-day check: NOT POSSIBLE, because raw ends 2 Jan.

**M3. Other plan items on the PriceLabs side**
- **a-raise-1012nov (P13 12 Nov):** moved the wrong way. 3064856 12 Nov **£151** and 3090701 **£183** (were £159 / £193), after the -5% DSO. P09 10-12 Nov £117 / £127 / £145 (were £120 / £144 / £146).
- **a-p13-orphan-price:** DSOs unchanged (17 Nov +35% min 1; 27 Nov +50% min 1). 17 Nov is still **£170 / £207**; 27 Nov £336 / £244.
- **a-p05-dec:** not done. 7-8 Dec **£487 / £483**, +3% min 2.
- **t-p20-delivery:** 20-22 Nov is still open in PriceLabs at **£294 / £300 / £287**, min 3. Whether the Smoobu delivery block is in place: NOT CHECKED here.
- **P12 other cuts (15:02Z):** 12-13 Nov **£205 / £256** (were £216 / £272); 30 Nov **£225** (was £253); 12 Dec **£274** (was £314). P12 is the listing furthest **above** its recommended base (+£11) and market P75 (M5), yet Reyhan is cutting its DSOs.

**M4. Min stay vs policy** (`prices.csv`, PriceLabs-open nights)
- **Below 2:** P05 9 Nov and 29 Dec; P12 26 Nov; P13 17 Nov and 27 Nov (both listings); P13 1 Dec (intentional); P04 2 Dec (deprioritised).
- **Above 3 inside 2 months:**
  - P20 25-26 Dec min 4: no DSO, so it comes from a min-stay profile; which one is UNKNOWN.
  - P20 27-28 Dec min 6 and 29-31 Dec min 5 (DSOs of 11 Oct / 30 Oct).
  - P12 27 Dec min 7 and 28 Dec-1 Jan min 5 are after the P12 handback, so excluded.
- 5-night (2+ months) and 7-night (4+ months) rules are outside the raw window: NOT CHECKED.
- **Short open runs at min 2:** P12 3-4 Nov (£189 / £196, C1) and 12-13 Nov; P05 16-17 Nov (£377 / £394) and 7-8 Dec; P08 5-7 Nov (£186 / £205 / £203); P09 10-12 Nov; P11 23-25 Dec (min 3 / 2 / 2; £314 / £310 / £321).

**M5. Base vs market** (`listings.csv`; 2 Nov rows of `data/snapshots/2026-11-02/market.csv`, Nearby Listings, bedroom-matched, horizon unstated, cleaning inclusion unknown; P13 from `raw/neighbourhood_P13.json`)

| Ref | Base | PL recommended | P50 | Gap | P75 | Gap |
|---|---|---|---|---|---|---|
| P01 | £253 | £255 | £258 | -1.9% | £331 | -23.6% |
| P04 | £220 | Unavailable | £171 | +28.7% | £218 | +0.9% |
| P05 (4 BR) | £550 | £548 | £578 | -4.8% | £717 | -23.3% |
| P06 | £357 | £357 | £405 | -11.9% | £507 | -29.6% |
| P09 | £176 | £176 | £132 | +33.3% | £160 | +10.0% |
| P11 | £286 | £285 | £289 | -1.0% | £331 | -13.6% |
| P12 | £284 | £273 | £206 | +37.9% | £246 | +15.4% |
| P13 | £250 | £237 / £236 | £224 | +11.6% | £280 | -10.7% |
| **P20** | **£330** | £347 | £252 | +31.0% | £314 | +5.1% |

- P08, P10 and P14 have no market row: UNKNOWN.
- **Running effect of the 18 Oct rises** (P01, P05, P06, P09, P11, P12; `reservations.csv`, confirmed, by booked date):
  - 4-18 Oct: **13 bookings, 91 nights, £18,199.03, ADR £200**.
  - 19 Oct-2 Nov: **14 bookings, 48 nights, £10,030.33, ADR £209** (through 1 Nov: 13 / 46 / £9,600). The P11 Booking.com 20-22 Nov booking adds 2 n / £430.11 (ADR £215).
  - Inventory is smaller (P01 sold out, handbacks). Do not over-read.

**M6. Min/max vs info pack** (`/home/user/seeker-social/seeker-estates/build/properties.py`, mtime 13 Oct)
- Mins match PriceLabs for P01-P13. The P14 pack says 400 while PriceLabs has 500 (special setup).
- The pack's "high" (350-780) differs from every PriceLabs max (500-2,500), and the pack bases are older (e.g. P05 455 vs 550, P20 not in the pack).
- **The pack is out of date**, not PriceLabs.

**M7. Listing hygiene** (live `get_listing_data`; `data/id_map.json`, last committed 22 Oct)
- **`_unmatched`:** the three Marylebone Vrbo listings (`_units_0001_a7f5a076…`, `_4a980bb7…`, `_380ddc1a…`) are still not among the 20 PriceLabs listings. **Question:** were they removed on purpose? If so, update `id_map.json`.
- **`confidence: check`:**
  - P03 is priced via **Channex**: push on, last push 3 Nov 03:14:34Z, fully blocked (intentional).
  - **P15-P19 have no PriceLabs listing.** **Question:** should they be priced?
- **P02 Vrbo copy `_units_0004_ca1ccf61`:** push on, last push **24 Feb 2026**, `last_refreshed_at` null. **Question:** turn push off or remove it?
- **Vrbo copies (P11 `_7fd3…`, P12 `_386e…`, P13 `_3d48…`)** receive every parent DSO (`add_custom_pricing_from_parent`) and push separately (15:08Z, 07:09Z today, 15:06Z).
  - **Question:** does the P11 Vrbo copy see the 20-22 Nov booking? Vrbo availability source: UNKNOWN.
- P13 3064856 and 3090701 share coordinates (51.5088201, -0.2342476). Policy says they are one flat: fact only.
- P04 recommended base reads "Unavailable". P20 is not in the info pack.

### Open plan items: status 3 Nov

| Item | Status |
|---|---|
| t-push-check | P04 gap 9-13 Nov **gone** (2 Nov 08:54Z push). No priced listing pushed overnight without an edit. P09 crosses 24 h at 07:53Z; P04/P05 08:54Z; P06 09:39Z. New P12 4 Nov gap (-£26). PriceLabs has not seen the P11 20-22 Nov booking (C1) |
| a-base-review-1102 | **No base change logged.** P20 330 vs 350 still open; P13 250 vs recommended 237 still open |
| Reyhan conflicts | P12 17 Nov **worse** (-10%); P11 darts **reversed** (-5%, avg £218); P13 8-12 Nov **re-broken** (-5%); P20 base 330 open plus **new min 2 on 16-19 Nov**; P04 -10% unchanged; P13 base unchanged (H1) |
| a-p13-record | Nothing recorded in PriceLabs; all five values above still differ from Corentin's |
| a-discount-cut | **Widened**: next 30 £2,656 (same dates yesterday £2,009); layers unchanged (H2) |
| New bookings | P06 12-15 Nov **now seen**; P20 10-13 Nov seen; **P11 20-22 Nov not seen** (H4) |
| t-p13-3nov | **Not fixed**: £124, min 2, cannot sell tonight (H3) |
| a-p12-26nov | **Min fixed** (min 1) at **£352 (+25%)** (H3) |
| a-p05-9nov / a-peak-check | P05 9 Nov £1,435, 29 Dec £1,354; P13 25-26 Dec min 3: all unchanged (H3) |
| a-raise-1012nov | **Wrong way**: P13 12 Nov £151 / £183 (M3) |
| a-p05-dec, a-p13-orphan-price, t-p20-delivery | Not done (M3) |
| t-p06-open | 12-14 Nov sold and seen; 8-11 Nov open at £987 for 4 nights (H4) |
| t-p04-doublebook, a-airbnb-rules, t-channel-gaps, a-p20-conversion, a-p05-earlybird, a-p13-twin, a-p12-genius, t-p04-weekly | OTA side: NOT CHECKED here (PriceLabs cannot see the unsynced Barking Airbnb listing 1455876748739910219). PriceLabs does show P04 3-9 Nov as booked |

Data gaps:
1. The raw window is **4 Nov-2 Jan**. Tonight comes only from live calls for P13 and P12. The 180-day floor/ceiling check and the 5-night / 7-night rules are NOT CHECKED.
2. `kpi_pack.json`: `market_percentiles` null and market/comps/channel_checks empty, so base vs market uses the 2 Nov `market.csv` rows. P08, P10 and P14 have no market row.
3. Push status after 07:40Z (P09 07:53Z, P04/P05 08:54Z, P06 09:39Z) is NOT CHECKED because this run ended before those times. What triggered the 2 Nov 07:53Z / 08:54Z / 09:39Z pushes is NOT CHECKED (no log entry).
4. Cause of the P12 4 Nov Smoobu £170 is UNKNOWN. Smoobu's 3 Nov rate for P12 is not in the snapshot.
5. P11 20-22 Nov booking time on 2 Nov is unknown, so the PriceLabs price it was booked against (£484 or £461) is unknown. The P06 12-15 Nov booking price at booking time is also unknown.
6. Not read live today: overrides on P01, P08, P09, P10, P14 and the Vrbo copies (mirrored per the `_from_parent` logs); customizations on P01, P08, P10, P14, P02, P03, P07; the P20 min-stay profile behind 25-26 Dec min 4.
7. Whether the Smoobu P20 20-22 Nov delivery block exists (PriceLabs shows the nights open) is NOT CHECKED.
8. One pair of `get_user_logs` calls (group, account) ran in parallel against the one-at-a-time rule. Both returned 200 and empty.
