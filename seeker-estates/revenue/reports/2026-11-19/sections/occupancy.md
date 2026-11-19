## Occupancy & performance

**Portfolio, last 30 nights (20 Oct–18 Nov 2026), the 14 units with Smoobu history:** 241 n, £40,646.92, occupancy 57.4%, ADR £168.66, RevPAR £96.78 (`reports/2026-11-19/kpi_pack.json` `portfolio_last30`). Room revenue only (Smoobu basePrice, cleaning excluded).
- **P04 is in the pack for the first time** (20 n, £2,398.11). Its Smoobu history starts 20 Oct, which is now exactly 30 days back. Its figure mixes bases: the import-batch stays carry the Smoobu `price` because they have no basePrice element.
- **Like-for-like with yesterday (same 13 units, P04 left out):** 221 n / £38,248.81 / 56.7% / ADR £173.07 / RevPAR £98.07. Yesterday (19 Oct–17 Nov) it was 224 n / 57.4% / £172.50 / £99.08.
  - 19 Oct leaves: −9 booked (P01, P02, P05, P08, P09, P10, P12, P13, P20; £1,553.01).
  - 18 Nov enters: +6 (P01, P05, P06, P09, P10, P13; £1,160.85).
  - 224 − 9 + 6 = 221. Recomputed with `rm.metrics.performance` on `data/snapshots/2026-11-19/reservations.csv`.

**Last 365 nights (19 Nov 2025–18 Nov 2026):** 2,228 n, £410,007.59, occupancy 47.0%, ADR £184.02, RevPAR £86.41 (kpi_pack `portfolio_last365`). Yesterday it was 2,224 n / £409,074.16. P04 is still null here (less than 365 days of history). Most units' Smoobu history starts in 2026, so this understates a full year.

**Booked next 30 (19 Nov–18 Dec): 136 of 235 non-blocked nights = 57.9%, £30,478.48 room revenue on the books.** Yesterday 140/238 = 58.8%, £31,018.58.
**Booked next 60 (19 Nov–17 Jan): 196/415 = 47.2%, £49,438.84.** Yesterday 193/418 = 46.2%, £49,395.89.
- **Source:** live Smoobu GET `/api/reservations` (844 records incl. cancellations and blocks; guest fields dropped) and `/api/rates`, pulled 19 Nov 07:18:35Z.
  - Scratch copies: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ19/smoobu_res.json` and `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ19/smoobu_rates.json`.
  - The 718 non-block records match `data/snapshots/2026-11-19/reservations.csv` row for row (ref, dates, status, amount).
- **Check:** reservations and `/api/rates` agree on every unit-night in the next 60 (0 mismatches). P13 is read as one calendar.
- **Excluded:**
  - P02, P03, P07 (blocked on purpose, policy).
  - Nights after handback: P08 and **P10 are now fully out** (P10's last night was 18 Nov); P09 after 26 Nov; P12 after 13 Dec; P01 after 20 Dec.
  - Blocked nights: P01 30 Nov–20 Dec; P06 from 30 Nov.
- **P20 is no longer blocked on 19 Nov.** The Smoobu "Blocked channel" block was shortened from 18–20 Nov to 18–19 Nov (`modifiedAt` 18 Nov 16:16:46). Tonight is open at £311 / min 2. See Conflicts.
- **Reconciling next 30 (140 → 136):** I recounted yesterday's window (18 Nov–17 Dec) on today's pull. It gives 142, which is 140 plus 2 new P04 nights (18 and 19 Nov). Then:
  - 18 Nov leaves: −7 booked (P01, P04, P05, P06, P09, P10, P13).
  - 18 Dec enters: +1 (P05).
  - Net: 142 − 7 + 1 = 136.
  - Denominator: 238, +1 (P20 19 Nov unblocked), −10 (18 Nov), +6 (18 Dec) = 235.
- **Reconciling next 60 (193 → 196):** recounting 18 Nov–16 Jan on today's pull gives 203. That is 193 plus 10 new P04 nights: 18–19 Nov and 27 Dec–3 Jan, the 8 nights of the stay checking out 4 Jan, all 8 inside the window.
  - Then 203 − 7 (18 Nov) + 0 (17 Jan, nothing booked) = 196.
  - Denominator: 418 + 1 − 10 + 6 = 415.

### What changed overnight (18 Nov 07:19Z → 19 Nov 07:18Z)
- **716 → 718 reservations: two new P04 Barking Airbnb bookings.** Nothing rolled out of the 365-day look-back and nothing was deleted (every 18 Nov record is still present).
  - **18–20 Nov**, 2 n, room £254.15 (£127.08/n), cleaning £129, commission £59.39.
    - Created 18 Nov 15:19 (Smoobu `created-at`; the time zone is not stated). Lead time 0 days.
    - It sold the min-2 window. Reyhan set +5% / min 2 on 18–19 Nov at 12:18:46Z (PriceLabs `get_user_logs`).
    - Against Smoobu 07:19Z on 18 Nov (£158 + £159 = £317), the room paid 0.802×. The price live at the moment of booking (after Reyhan's +5% and the 12:20Z push) is NOT CHECKED.
    - Only 19 Nov is in the forward window; 18 Nov is in last-30.
  - **27 Dec–4 Jan**, 8 n, room £1,076.74 (£134.59/n), cleaning £142, commission £188.91.
    - Created 18 Nov 09:27. Lead time 39 days. Analysis below.
  - The Smoobu price elements labelled "Cancellation Host Fee" and "Cancellation Payout" are Smoobu's standard Airbnb labels: payout = price − commission, the same on 100+ other Airbnb records. They are not cancellations. Both bookings are type "modification of booking", which is normal for Airbnb in this pull.
- **Cancellations: none.** The latest is still P04 Booking.com 20 Dec–2 Jan (`modifiedAt` 16 Nov 15:37:54, £2,417.34).
- **Modified: 2 records.**
  - P04 Airbnb 20–24 Nov: only `modifiedAt` moved (14 Nov 20:35:50 → 18 Nov 17:30:53). Dates and room £489.59 are unchanged; what changed on Airbnb's side is NOT CHECKED. Arrival is tomorrow.
  - P20 block: 18–20 Nov became 18–19 Nov (above).
- **PriceLabs edits, 18 Nov (`get_user_logs`, listing, 18–19 Nov): 18 records, all by Reyhan, 12:13:55–12:18:46Z.**
  - P04 18–19 Nov: +5% / min 2.
  - P20 5 Dec and 26 Dec: **+100% / min 1**.
  - P05 29 Nov–2 Dec: −2% / min 3.
  - P13 (both twins plus Vrbo) 27 Nov and 1 Dec: **+25% / min 1**.
  - P11 (plus Vrbo): 18–19 Nov +5% / min 2; 3–4 Dec −2% / min 2; 14–15 Dec −2% / min 3; 16–18 Dec −2% / min 2.
  - None of these units is due a refresh until today's run; the Dispatcher notes the last refresh was 18 Nov ~12:15–12:20Z.

### P04: the two new Airbnb sales
**27 Dec–4 Jan (8 n, £1,076.74 room)**

**What the nights were priced at when it sold.** Smoobu 18 Nov 07:19Z, which equals PriceLabs (`data/snapshots/2026-11-18/prices.csv`), for 27 Dec–3 Jan:
- 175 / 192 / 193 / 194 / 201 / 194 / 164 / 146 = **£1,459** (£182.38/n).
- The 7 nights 27 Dec–2 Jan alone are £1,313, which matches the Dispatcher's figure.

**What it paid, and why.**
- **The room paid exactly £1,459 × 0.900 × 0.82 = £1,076.74**, to the penny. That is the hidden 0.900 Airbnb tier times the 18% weekly discount, the same layers the channel agent fitted on the synced card on 18 Nov (`reports/2026-11-18/sections/channel.md`: 20 Dec–2 Jan factor 0.738).
- Policy expects weekly 15% only: £1,459 × 0.85 = £1,240.15. **The gap is −£163.41 (−13.2%).** It splits into:
  - The 0.900 tier: £124.02.
  - The extra 3 points of weekly (18% vs 15%): £39.39.
- This adds to a-airbnb-rules. The 18–20 Nov sale (0.802×) is the channel agent's to decompose.

**Which listing sold it.**
- It came in on Smoobu Airbnb channel 3263896, the same channel as every other P04 Airbnb booking.
- The Airbnb listing ID is not in the Smoobu record: NOT CHECKED. The exact 0.738 fit matches the synced 1657859794156786222 pattern. An unsynced-listing sale would not normally appear in Smoobu at all, so this points to the synced listing, but it is not a verified fact.

**NYE minimum stay.** It still applied when the stay sold. 27 Dec was min 7 (18 Nov `prices.csv`; today too) and 28–31 Dec min 5. An 8-night stay arriving 27 Dec satisfies both.

**What the 18 Nov occupancy cut cost on the sold nights (arithmetic, not a demand claim).**
- 17 Nov Smoobu for 27 Dec–1 Jan was 208/228/229/230/241/231 = £1,367 (`reports/2026-11-17/sections/occupancy.md`). On 18 Nov the same 6 nights were £1,149: **−£218 (−15.9%)**.
- At the same 0.738 Airbnb factor that is **£160.88 of room revenue**, if the same guest had booked at 17 Nov prices. Whether they would have is unknown.
- 17 Nov prices for 2–3 Jan are not recorded: NOT CHECKED.

**After the sale.** Today PriceLabs prices those 8 nights at 186/204/206/206/213/206/173/156 = £1,550, **+6.2%** on the price that sold (`data/snapshots/2026-11-19/prices.csv`; `booked_adr` 134.59).

**Against the cancelled Booking.com stay** (20 Dec–2 Jan, 13 n, £2,417.34 = £185.95/n):

| Measure | Cancelled Booking.com | New Airbnb | Δ |
|---|---|---|---|
| Per night | £185.95 | £134.59 | **−£51.36 (−27.6%)** |
| Overlap 27 Dec–1 Jan (6 n), pro rata | £1,115.70 | £807.56 | −£308.14 |
| All 8 nights at each rate | £1,487.59 | £1,076.74 | −£410.85 |

- **Of the 13 cancelled nights, 6 are resold** (27 Dec–1 Jan, £807.56 pro rata = 33.4% of £2,417.34). The other 7 (20–26 Dec) are still open. The sale also added 2 nights outside the cancelled window (2–3 Jan, £269.19 pro rata).
- **Caveat:** the cancelled record has no Smoobu price elements (import batch), so £2,417.34 may include cleaning; its room-only split is UNKNOWN.
- Market context from yesterday's market section (`reports/2026-11-18/sections/market.md`, 1–3 BR, 20 Dec–1 Jan): P50 £2,233 (£171.77/n) / P75 £2,849. The Airbnb room rate is net of channel layers, so it is not on the same basis as the market figure.

**18–20 Nov (2 n, £254.15 room):** see "What changed overnight" above.

**What is left of P04 Christmas–NYE:**
- **20–26 Dec, 7 n, open in Smoobu and PriceLabs at 171/174/169/180/183/179/177 = £1,233** (yesterday £1,157, +6.6%). Min 3/3/3/4/4/4/4.
- It is the tail of one open run from 6 Dec to 26 Dec (21 n), which ends at the 27 Dec arrival. A stay arriving 23 Dec must be exactly 23–27 Dec. Arrivals on 24, 25 or 26 Dec cannot meet min 4. The nights themselves are not orphans.
- **4 Jan onward: no new gap.** It is open from 4 Jan through at least 17 Jan at min 3 (£151 / £147 / …).

### 7-day pickup, net of cancellations
Window: bookings made 13–19 Nov to 07:18Z (Smoobu `created-at`); cancellations by `modifiedAt`. Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ19/pick_rise.py`.
- **Gross made:** 12 bookings / 59 n / £10,912.17.
- **Still confirmed:** 11 / 54 n / £10,065.07.
- **Cancelled in the window:** 3 / 21 n / £3,944.84. These are P04 20 Dec–2 Jan £2,417.34, P11 26–29 Nov £680.40 and P13 18–23 Dec £847.10.
- **Net: +38 n / +£6,967.33.** Yesterday (12–18 Nov to 07:19Z) it was +28 n / +£5,636.44.
- **Reconciliation:** nothing was made on 12 Nov or on 19 Nov to 07:18Z, and no cancellation fell in or out of the window. The difference is exactly the two new P04 bookings: +10 n / +£1,330.89 (£254.15 + £1,076.74).
- **That is the first real booking activity since 16 Nov 22:52.**

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P04 | 3 / 14 / £1,820.48 (18–20 Nov £254.15; 20–24 Nov £489.59; 27 Dec–4 Jan £1,076.74) | 20 Dec–2 Jan 13 / £2,417.34 | **+1 / −£596.86** (was −9 / −£1,927.75) |
| P05 | 1 / 4 / £1,219.98 | — | +4 / +£1,219.98 |
| P06 | 1 / 5 / £1,009.82 | — | +5 / +£1,009.82 |
| P11 | 2 / 9 / £1,468.90 | 26–29 Nov 3 / £680.40 | +6 / +£788.50 |
| P12 | 1 / 7 / £1,432.42 | — | +7 / +£1,432.42 |
| P13 | 3 / 13 / £2,156.79 | 18–23 Dec 5 / £847.10 | +8 / +£1,309.69 |
| P20 | 1 / 7 / £1,803.78 | — | +7 / +£1,803.78 |
| P01, P02, P07, P08, P09, P10, P14 | 0 | — | 0 |

kpi_pack `pickup_7d` (gross confirmed, not net) matches: P04 3 / 14 / £1,820.48, P13 2 / 8 / £1,309.69, and so on.

### Pace vs STLY
Cancellations are excluded on both sides (`rm.metrics.on_the_books` on `data/snapshots/2026-11-19/reservations.csv`).
- **P12, handback-aware.** Stays 19 Nov–13 Dec 2026 as of 19 Nov 2026, against 19 Nov–13 Dec 2025 as of 19 Nov 2025: **18 n / £3,775.96 vs 21 n / £3,955.73 = −3 n / −£179.77 / −4.5%. Within ±10%, so On track** (yesterday −7.7%).
  - No P12 booking changed: on the books is unchanged at 18 n / £3,775.96.
  - The move is again the STLY side losing a night, 18 Nov 2025, the last night of the 17–20 Nov 2025 stay (£136.93/n): £4,092.66 − £136.93 = £3,955.73.
  - **Still window-driven, not demand-driven.** 19–20 Nov 2026 are open (£251 / £319, min 2) while the STLY side has 19 Nov 2025 booked.
  - kpi_pack `pace_30` (19 Nov–18 Dec, not handback-aware): −6 n / −13.8% (£3,775.96 vs 24 n / £4,381.06). The difference is STLY 14–17 Dec 2025, after the handback.
  - kpi_pack `pace_90`: −22 n / −52.0% (vs 40 n / £7,871.94). Nothing after 13 Dec is inventory.
- **P02:** kpi_pack 30-day 0 vs STLY 12 n / £1,245.52; 90-day 0 vs 19 n / £1,926.02. Blocked on purpose, so not assessed.
- **Every other unit: pace UNKNOWN (no STLY).** No bookings were made on or before 19 Nov 2025 for P01 or P04–P20. The earliest are P11 9 Dec 2025 and P13 11 Dec 2025 (yesterday's section).
- **On the books, stays 19 Nov–18 Dec** (kpi_pack `pace_30`):

| Ref | Nights | Revenue |
|---|---|---|
| P01 | 11 | £1,673.43 |
| P05 | 22 | £11,358.97 |
| P06 | 8 | £1,652.41 |
| P09 | 8 | £821.67 |
| P11 | 14 | £2,555.08 |
| P12 | 18 | £3,775.96 |
| P13 | 22 | £3,384.46 |
| P20 | 18 | £3,236.90 |
| P04 | 15 | £2,019.62 (Smoobu recount; the pack's pace is null) |

- **On the books, 90-day window** (kpi_pack `pace_90`):

| Ref | Nights | Revenue |
|---|---|---|
| P05 | 43 | £22,342.51 |
| P11 | 26 | £5,896.13 |
| P13 | 34 | £5,991.21 |
| P20 | 32 | £6,468.68 |

### 18 Oct base rises: running effect (same method as yesterday)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 19 Nov 07:18Z pull (`occ19/pick_rise.py`).

**Raised group (P01, P05, P06, P09, P11, P12): +34 n / +£9,196.31 including P06. Unchanged for a third day.**
- **Like-for-like** (excluding the two P06 stays on reopened nights, 18–22 Nov £856.79 and 24–29 Nov £1,009.82): **+25 n / +£7,329.70, unchanged.**
- Made: 28 / 108 n / £23,831.63. Cancelled: 13 / 74 n / £14,635.32.
- No raised unit has had a booking or cancellation since 13 Nov 22:20 (P06 24–29 Nov).

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | 1 / 3 / £720.90 | 0 / £0 |
| P05 | 4 / 16 / £6,135.19 | — | +16 / +£6,135.19 |
| P06 | 4 / 15 / £3,212.38 | — | +15 / +£3,212.38 (like-for-like +6 / +£1,345.77) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 | −3 / −£244.70 |
| P11 | 8 / 29 / £5,300.40 | 5 / 34 / £6,867.17 | −5 / −£1,566.77 |
| P12 | 9 / 39 / £7,846.86 | 6 / 28 / £6,186.65 | +11 / +£1,660.21 |

**Comparison groups:**
- Unraised (P02, P08, P10, P14, P20): +51 n / +£9,443.82, unchanged.
- P13: +27 n / +£4,704.65, unchanged.
- **P04: +47 n / +£5,933.67** with `reservations.csv` `total_gbp`. Yesterday it was +37 n / +£4,602.78; the change is +10 n / +£1,330.89 from the two new Airbnb sales.
  - On the old basis (import-batch records with no basePrice element counted at £0) it is +47 n / +£3,446.27.
  - The P04 group is still unclean: it contains the import batch.

**What this means:** the raised group has been flat for 6 days, while the unraised P04 picked up 10 nights in one day at 0.738× its Smoobu price. Caveats as before: the Booking.com markup changes (24 Oct, 12 Nov, 18 Nov), promotions, Reyhan's overrides and the P06 reopening cannot be separated out. The sample is 1–9 bookings per unit.

### Per-property table
**Column sources:**
- Occ30, ADR30, RevPAR30: kpi_pack `last30`, 20 Oct–18 Nov.
- Fwd occ30: Smoobu 19 Nov 07:18Z, 19 Nov–18 Dec, handback-aware (kpi_pack `market_occ_30` in brackets).
- Pace30: as above.
- Pickup 7d: made 13–19 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £155.86 | £155.86 | 100% 11/11 non-blocked (34%) | UNKNOWN: no STLY | 0 | **Compressed** (0 open nights to handback) |
| P02 | Ladbroke Grove | 26.7% | £98.72 | £26.32 | all blocked (52%) | not assessed (policy) | 0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (54%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | 66.7%† | £119.91† | £79.94† | **50.0%** 15/30 (23%) | UNKNOWN: no STLY | **+1 / −£596.86** | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 76.7% | £380.51 | £291.72 | 73.3% 22/30 (46%) | UNKNOWN: no STLY | +4 / +£1,219.98 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 70.0% | £197.56 | £138.29 | 72.7% 8/11 non-blocked (51%) | UNKNOWN: no STLY | +5 / +£1,009.82 | Unclassifiable (60–85%, no STLY) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (28%) | UNKNOWN | 0 | Not classified: blocked on purpose |
| P08 | Islington | 70.0% | £139.00 | £97.30 | handed back after 13 Nov (57%) | — | 0 | Not classified: handed back |
| P09 | Greenwich | 50.0% | £112.21 | £56.11 | 100% 8/8 to 26 Nov (40%) | UNKNOWN: no STLY | 0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 100.0% | £105.96 | £105.96 | handed back after 18 Nov (32%) | — | 0 | Not classified: handed back (was Compressed) |
| P11 | Camden | 70.0% | £180.25 | £126.17 | **46.7%** 14/30 (50%) | UNKNOWN: no STLY | +6 / +£788.50 | **Soft** (fwd30 < 60%) |
| **P12** | Mile End | 66.7% | £157.07 | £104.72 | 72.0% 18/25 to handback (43%) | **−3 n / −£179.77 / −4.5%** handback-aware (pack −13.8%) | +7 / +£1,432.42 | **On track** |
| P13 | Shepherd's Bush (one flat) | 56.7% | £150.27 | £85.15 | 73.3% 22/30 (47%) | UNKNOWN: no STLY | +8 / +£1,309.69 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% 0/30 (47%) | UNKNOWN: no STLY | 0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 50.0% | £174.70* | £87.35* | 60.0% 18/30 (38%) | UNKNOWN: no STLY | +7 / +£1,803.78 | Unclassifiable (exactly 60%, no STLY) |

† P04 is in the kpi_pack for the first time. Its figures mix bases (see the portfolio line).
\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`). 20–22 Oct is inside this window, so ADR30 and RevPAR30 read low.

**Classes:**
- Compressed 2: P01, P09.
- On track 1: P12.
- Soft 3: P04, P11, P14.
- Unclassifiable 9: P05, P06, P13, P20, P15–P19.
- Not classified 5: P02, P03, P07 (policy blocks); P08, P10 (handed back).
- **Changes since yesterday:**
  - P10 has left (handed back).
  - P20 is now exactly at the 60% Soft line: 18 booked over a denominator of 30, because 19 Nov was unblocked; yesterday it was 64.3%. Its class is unchanged.
  - P04 rose from 46.7% to 50.0% and is still Soft.

**Next 60 (19 Nov–17 Jan), Smoobu, handback-aware:**

| Ref | Booked | Share | Revenue |
|---|---|---|---|
| P01 | 11/11 | 100% | |
| P04 | 23/60 | 38.3% (yesterday 23.3%) | £3,096.36 |
| P05 | 36/60 | 60.0% | £20,063.01 |
| P06 | 8/11 | 72.7% | |
| P09 | 8/8 | 100% | |
| P11 | 26/60 | 43.3% | £5,896.13 |
| P12 | 18/25 | 72.0% | |
| P13 | 34/60 | 56.7% | £5,991.21 |
| P14 | 0/60 | 0% | |
| P20 | 32/60 | 53.3% | £6,468.68 |

Comparisons:
- kpi_pack `forward_occ_60` (PriceLabs): P04 37.3%, P05 59.3%, P11 44.1%, P13 55.9%, P20 54.2%.
- PriceLabs `forward_occ_30`: P04 48.3%, P20 62.1%. These differ from Smoobu by a night or so of window and denominator; Smoobu is the truth.

**Last 365 nights** (kpi_pack `last365`, 19 Nov 2025–18 Nov 2026):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 43.6% | £174.94 | £76.21 | £27,816.10 |
| P02 | 79.5% | £128.72 | £102.27 | £37,328.49 |
| P05 | 60.5% | £373.43 | £226.11 | £82,528.39 |
| P06 | 37.8% | £235.10 | £88.89 | £32,444.20 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 41.9% | £172.44 | £72.28 | £26,382.63 |
| P09 | 41.9% | £114.77 | £48.11 | £17,559.57 |
| P10 | 42.7% | £113.44 | £48.48 | £17,696.55 |
| P11 | 80.3% | £174.51 | £140.09 | £51,131.46 |
| P12 | 80.8% | £192.96 | £155.95 | £56,922.89 |
| P13 | 80.3% | £158.05 | £126.88 | £46,309.43 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 (short history) | 6.8% | £166.63 | £11.41 | £4,165.78 |

P03, P04 and P15–P19: UNKNOWN (kpi_pack null).

**Booking profile** (kpi_pack `booking_profile`). Unchanged from yesterday except P04.

| Ref | Bookings | Median lead | Median stay | Channel revenue share |
|---|---|---|---|---|
| P04 | 7 (was 5) | 6 d | 4 n | Airbnb 75.9% (was 60.7%), Booking.com 24.1% |
| P01 | 20 | 15 d | 5 n | Airbnb 79.9% / Website 13.3% / Booking.com 6.8% |
| P02 | 71 | 34 d | 4 n | Airbnb 53.8% / Booking.com 43.0% / Direct 3.2% |
| P05 | 63 | 44 d | 4 n | Airbnb 100% |
| P06 | 34 | 14 d | 4 n | Airbnb 74.4% / Booking.com 25.6% |
| P07 | 5 | 3 d | 4 n | Airbnb 100% |
| P08 | 22 | 15 d | 6 n | Airbnb 77.3% / Booking.com 22.7% |
| P09 | 25 | 18 d | 5 n | Airbnb 57.3% / Booking.com 41.2% / Direct 1.5% |
| P10 | 22 | 12 d | 5 n | Airbnb 69.3% / Booking.com 27.6% / Website 3.1% |
| P11 | 73 | 28 d | 4 n | Booking.com 54.6% / Airbnb 43.5% / Agoda 1.9% |
| P12 | 80 | 31 d | 4 n | Booking.com 89.7% / Airbnb 10.3% |
| P13 | 87 | 22 d | 3 n | Booking.com 52.3% / Airbnb 46.9% / Agoda 0.9% |
| P14 | 1 | 57 d | 10 n | Airbnb 100% |
| P20 | 9 | 8 d | 7 n | Airbnb 100% |

### Orphan gaps, next 30 / 60
Source: Smoobu `/api/rates`, 19 Nov 07:18Z. P13 is read as one calendar and handbacks are respected (`occ19/gaps.py`). An orphan is an open run where no arrival night's minimum stay fits before the next booking or block.

| Ref | Night | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| P04 | 24 Nov (next 30) | £135 / 3 | The 20–24 Nov stay checks out and the 25 Nov stay arrives. | **Day 5.** Policy: never fewer than 3 nights. PriceLabs `available` False, Smoobu `available` 1. |
| P06 | 29 Nov (next 30) | £255 / 4 | The 24–29 Nov stay checks out and the block starts 30 Nov. | Unchanged. |
| P11 | 19 Nov (tonight) | £172 / 2 | 18 Nov lapsed unsold; the 20 Nov stay arrives. | Lapses tonight. |

- **No longer orphans by min stay: P20 5 Dec and 26 Dec.** Both are now min 1 at **+100%**: £531 (yesterday £265 / 3) and £569 (yesterday £272 / 4). PriceLabs DSOs by Reyhan, 18 Nov 12:17:39Z and 12:17:57Z (`get_listing_date_overrides`, `get_user_logs`). Bookable as single nights at about twice the neighbouring rate. Whether +100% sells is untested.
- **P04 Christmas leftovers 20–26 Dec: not orphans.** They are the tail of the open run 6–26 Dec (21 n), described above.
- **P04 around 4 Jan: no new gap.** The run is open from 4 Jan at min 3.
- **Lapsed since yesterday (18 Nov, open and unsold):** P11 (£164), P12 (£225), P14 (£450), using 18 Nov Smoobu prices from yesterday's section. That is open inventory, not demand evidence. **P04 18 Nov sold** (the 18–20 Nov stay).
- **Runs that sell only as one exact stay (not orphans):**
  - P12 19–20 Nov (£251 / £319, min 2).
  - P06 22–23 Nov (£260 / £245, min 2).
  - P05 7–8 Dec (£485 / £465) and 13–14 Dec (£518 / £501), min 2.
  - P11 2–4 Dec (£200 / £214 / £329, min 3/2/2).
- **Single nights at min 1 (bookable):**
  - P04 2 Dec £428 (policy-deprioritised).
  - P05 21 Dec £2,038 and 29 Dec £2,536.
  - P11 8 Dec £292.
  - P12 26 Nov £310.
  - P13 27 Nov (£272 / £191) and 1 Dec (£232 / £163).
  - P20 5 Dec £531 and 26 Dec £569.

### Gaps to fill (open nights next 30, 19 Nov–18 Dec, Smoobu 19 Nov 07:18Z)
- **P04 (15):**
  - 24 Nov (orphan, £135).
  - 2 Dec (£428, min 1).
  - 6–18 Dec (£136–153, min 3). The run continues through 20–26 Dec (£1,233).
- **P05 (8):** 29 Nov–2 Dec (£501 / £485 / £485 / £510, min 3); 7–8 Dec; 13–14 Dec.
- **P06 (3):** 22–23 Nov; 29 Nov (orphan).
- **P11 (16):**
  - 19 Nov.
  - 22–27 Nov (£183–249, min 3).
  - 2–4 Dec.
  - 8 Dec.
  - 14–18 Dec (£218 / £220 / £227 / £251 / £313; darts nights 14–17 Dec average £229.00, yesterday £236.75).
- **P12 (7):** 19–20 Nov; 26 Nov; 30 Nov–3 Dec (£261 / £286 / £282 / £282, min 2).
- **P13 (8):** 27 Nov and 1 Dec (min 1); 13–18 Dec (min 3; 3064856 £237–264, 3090701 £213–237).
- **P14 (30):** every night, £450 (£456 on 12 Dec, £484 on 18 Dec), min 3–4 (special setup, numbers only).
- **P20 (12):**
  - **19–24 Nov** (£311 / £334 / £282 / £292 / £284 / £278, min 2/3/3/2/2/2). These include the delivery nights; see Conflicts.
  - 5 Dec (£531, min 1).
  - 14–18 Dec (£299–332, min 3).
- **P01, P09:** none. P08 and P10 are handed back.

### Conflicts for Corentin
These are Smoobu/PriceLabs states that conflict with standing decisions. They are "confirm or revert" items, not new proposals.
1. **P04 min stay** (policy: never fewer than 3 nights). Reyhan's 18–19 Nov +5% / min 2 (12:18:46Z) **sold**: £254.15 room for 2 nights. Confirm or revert the rule.
2. **P20 delivery** (policy: block 20–22 Nov is the delivery). The Smoobu block now covers only 18 Nov (shortened 18 Nov 16:16:46). **19–24 Nov are all open** (£278–334). 20 Nov is tomorrow. 22–24 Nov are min 2 against policy "3 nights from 25 Oct to 30 Nov"; 19 Nov is min 2 as well.
3. **P13 1 Dec** (policy `intentional_overrides`: +50% with 1-night minimum). Reyhan set +25% / min 1 on 18 Nov 12:14:53Z, on both twins and Vrbo. Smoobu went from £278 / £194 yesterday to £232 / £163 today.
4. **P11 darts nights** (21 Oct: average above £300/night). Reyhan's −2% on 14–18 Dec moved the open 14–17 Dec average to £229.00, from £236.75.
5. **P01 18–20 Dec** gap block still runs to the 20 Dec handback; the policy gap block ends 17 Dec. Unchanged.
6. **P06 (intentional-block listing):** 22–23 Nov open, 29 Nov orphan at min 4. Reason UNKNOWN. Unchanged.

Data gaps:
- **P04 27 Dec–4 Jan Airbnb listing ID:** not in the Smoobu record. Synced vs unsynced is NOT CHECKED; the 0.738 fit is consistent with the synced listing only.
- **P04 18–20 Nov:** the price live at the moment of booking (after Reyhan's +5% and the 12:20Z push) is NOT CHECKED, so the 0.802× uses the 07:19Z price.
- **P04 cancelled Booking.com 20 Dec–2 Jan (£2,417.34):** no price elements, so the room-only split is UNKNOWN and the £185.95/n comparison may include cleaning. Who cancelled and why: NOT CHECKED.
- **17 Nov prices for 2–3 Jan (P04):** not recorded (no 17 Nov snapshot; the 17 Nov sections list only 20 Dec–1 Jan). The cut cost is computed on 27 Dec–1 Jan only.
- **P04 20–24 Nov Airbnb record modified 18 Nov 17:30:53:** what changed is NOT CHECKED (dates and room unchanged). Whether unsynced Airbnb 1455876748739910219 still sells 20–24 Nov is NOT CHECKED here (channel agent).
- **P20 19–24 Nov on the OTAs** (open in Smoobu): channel availability is NOT CHECKED.
- **STLY:** none before 19 Nov 2025 except P02 and P12, so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20. P12's pace (−4.5%) moves with the window position.
- **P04 import batch** (no basePrice): it affects P04 last30 (now in the pack and in the portfolio), pace and the base-rise comparison group.
- **Market, comps and channel checks:** kpi_pack `missing` lists `market.csv`, `comps.csv` and `channel_checks.csv` as empty for 19 Nov, so ARI, RGI and price percentiles are null. Market percentiles quoted here are from `reports/2026-11-18/sections/market.md`.
- **Missing from kpi_pack:** P03 is not in Smoobu; P04 last365 and pace are null; P08 and P10 forward occupancy are null (handback); P15–P19 are not mapped.
- **No price data past 17–18 Jan** (Smoobu rates pulled to 18 Jan; PriceLabs files run 20 Nov–18 Jan).
- **Revenue scope:** room only (cleaning excluded). P20 18–22 Oct was paid separately and is not in Smoobu.
