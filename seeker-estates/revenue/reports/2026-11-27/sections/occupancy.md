## Occupancy & performance

**Portfolio, last 30 nights (28 Oct–26 Nov 2026), the 14 units with Smoobu history:** 223 n, £39,796.70, occupancy 53.1%, ADR £178.46, RevPAR £94.75 (`reports/2026-11-27/kpi_pack.json` `portfolio_last30`). Room revenue only (Smoobu basePrice; cleaning excluded).
- Yesterday (27 Oct–25 Nov) it was 224 n / £39,346.56.
  - 27 Oct leaves: −9 booked (P01, P02, P04, P06, P08, P10, P11, P12, P13; £1,220.82).
  - 26 Nov enters: +8 booked (P01 £152.13, P04 £150.99, P05 £621.47, P06 £201.96, P09 £102.71, P11 £140.34, P13 £127.08, P20 £174.27 = £1,670.95). **P12 26 Nov lapsed unsold.** P14 26 Nov lapsed open.
  - 224 − 9 + 8 = 223. £39,346.56 − £1,220.82 + £1,670.95 = £39,796.69 against the pack's £39,796.70 (1p rounding). Per-night figures from `data/snapshots/2026-11-27/reservations.csv`.

**Last 365 nights (27 Nov 2025–26 Nov 2026):** 2,269 n, £420,042.63, occupancy 47.8%, ADR £185.12, RevPAR £88.52 (kpi_pack `portfolio_last365`). Yesterday 2,263 n / £418,693.11.
- 26 Nov 2025 leaves −1 (P12 £170.43). 26 Nov 2026 enters +7 (P04 is excluded from last365, so its £150.99 is not counted; £1,519.96). 2,263 − 1 + 7 = 2,269; £418,693.11 − £170.43 + £1,519.96 = £420,042.64 (1p rounding).
- Most units' Smoobu history starts in 2026, so this understates a full year. P04 is excluded (last365 null).

**Booked next 30 (27 Nov–26 Dec): 115 of 216 non-blocked nights = 53.2%, £28,957.22 room revenue on the books.** Yesterday 116/220 = 52.7%, £28,727.89.
**Booked next 60 (27 Nov–25 Jan): 151/375 = 40.3%, £40,050.38.** Yesterday 155/380 = 40.8%, £40,916.65.
- **Source:** live Smoobu GET `/api/reservations` (guest and reference fields dropped) and GET `/api/rates`, pulled 27 Nov 07:19:18Z. Scratch copies and scripts: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ27/` (`smoobu_res.json`, `smoobu_rates.json`, `pull.py`, `an.py`, `recon.py`, `gaps.py`, `pick_rise.py`).
  - **Pagination fault, smaller today:** the full pull returned 864 rows / 863 unique ids. Month-by-month pulls recovered 1 in-window record the full pull missed (P01 2–4 Jun 2026; yesterday it was 3 different records). 14 recovered records ended before the window and were discarded.
  - After recovery, the 723 non-block reservations on mapped units match `data/snapshots/2026-11-27/reservations.csv` row for row (ref, dates, status, amount). The CSV's 724th row is P12 24–27 Nov 2025, which has no night in the window. The 2 Scott Ellis Gardens stays (unmapped) are reported separately.
  - Reservations and `/api/rates` agree on every unit-night in the next 60: 0 mismatches. PriceLabs `prices.csv` 27 Nov also shows the two new stays as booked (P04 10–12 Dec, P20 5 Dec).
  - P13 read as one calendar. Scott Ellis not counted.
- **Excluded:** P02, P03, P07 (blocked on purpose, policy). Handbacks (policy `handbacks`): P08, P10 and now **P09 fully out (last night 26 Nov)**; P12 after 13 Dec; P01 after 20 Dec. Blocks: P01 30 Nov–20 Dec; P06 from 13 Dec; P11 from 5 Jan 2027 (still present; see Conflicts).
- **Reconciling next 30 (116/220 → 115/216):**
  - 26 Nov leaves: −8 booked (£1,670.95, list above), −10 inventory (P12 and P14 were open).
  - **P20 Airbnb 5–6 Dec, new: +1 booked, +£426.00.**
  - **P04 Airbnb 10–13 Dec, new: +3 booked, +£378.66** (£126.22/n pro rata of £378.67).
  - 26 Dec enters: +3 booked (P05 £646.85, P11 £280.61, P13 £168.15 = £1,095.61), +6 inventory (P04, P14, P20 open).
  - Night-by-night diff of 27 Nov–25 Dec against yesterday's pull: only P04 10–12 Dec and P20 5 Dec changed (open → booked).
  - 116 − 8 + 1 + 3 + 3 = **115**; 220 − 10 + 6 = **216**. £28,727.89 − £1,670.95 + £426.00 + £378.66 + £1,095.61 = £28,957.21 against £28,957.22 (1p rounding).
- **Reconciling next 60 (155/380 → 151/375):**
  - 26 Nov leaves −8 booked / −10 inventory / −£1,670.95. New P20 +1 / +£426.00; new P04 +3 / +£378.66.
  - 25 Jan enters: 0 booked / +5 open (P04, P05, P13, P14, P20; P11 is blocked).
  - 155 − 8 + 4 = **151**; 380 − 10 + 5 = **375**; £40,916.65 − £1,670.95 + £804.66 = £40,050.36 against £40,050.38 (2p rounding).
- PriceLabs `forward_occ_30` in kpi_pack (P01 8.7%, P04 34.5%, P05 69.0%, P06 24.1% [46.6% ex-blocks], P11 51.7%, P12 75.0%, P13 65.5%, P20 79.3%) uses a different window and denominator (blocked and handback nights stay in it). Smoobu is the truth.

### What changed overnight (26 Nov 07:22Z → 27 Nov 07:19Z)
- **Non-block reservations on mapped units: 723** (CSV 724 incl. the no-night P12 row): +2 new bookings, −1 P12 Nov-2025 row that left the window. **No cancellations. No new Booking.com booking.**
- **NEW: P20 Waterford Court, Airbnb, 5–6 Dec (1 n), made 26 Nov 16:51 (lead 9 d).**
  - Room £426.00; cleaning £150; commission £89.28 = 15.50% of room + cleaning (standard Airbnb host fee basis).
  - **Paid vs Smoobu:** Smoobu 26 Nov 07:22Z had 5 Dec at **£562, min 1** (PriceLabs `prices.csv` 26 Nov £562 too). **Paid = 0.758× = £75.80 per £100 Smoobu.** It is NOT the 0.765 tier: 0.765 × £562 = £429.93. 0.765 would need Smoobu at £556.86 when the booking was made. The Smoobu price at 16:51 is NOT CHECKED (only the 07:22Z reading exists). Airbnb last-minute 15% alone (policy P20 `airbnb_discounts_22oct`, 0–14 days) would give £477.70; paid is 0.892× that.
  - **Min stay:** policy P20 `min_stay` covers 25 Oct–30 Nov only ("3 nights"); 5 Dec is outside it. Smoobu and PriceLabs had min 1 on 5 Dec, so the 1-night sale was allowed by the settings.
  - It fills the single night between the 4 Dec and 6 Dec stays. **P20 is now booked solid 27 Nov–13 Dec (17 n).** After the sale, Smoobu repriced the booked 5 Dec to £686.
  - kpi_pack `booking_profile` P20: 10 → 11 bookings, median stay 7 → 4 n, median lead 8 d (unchanged), Airbnb 100%.
- **NEW: P04 Barking, Airbnb, 10–13 Dec (3 n), made 27 Nov 02:59 (lead 13 d).** It refills 3 of the 4 nights reopened by the 25 Nov Booking.com cancellation (10–14 Dec, £488.35).
  - Room £378.67 = £126.22/n; cleaning £142; commission £80.70 = 15.50% of room + cleaning.
  - **Paid vs Smoobu:** Smoobu 26 Nov 07:22Z: £165 / £174 / £156 = **£495**. **Paid = 0.765× exactly** (0.765 × £495 = £378.675). PriceLabs `prices.csv` 27 Nov `booked_price` records £174 and £156 for 11 and 12 Dec, which supports £495 as the price at booking. Against PriceLabs 26 Nov (£175 / £155 / £156 = £486) it is 0.779×. Which discounts make up 0.765 (for example 0.85 × 0.90) is NOT CHECKED.
  - Against the cancelled Booking.com stay on the same nights (£122.09/n), this pays £126.22/n.
  - **Which Barking Airbnb listing** (synced 1657… or unsynced 1455…): NOT CHECKED. The Smoobu record carries only the generic Airbnb channel, the same one used by P06 and P20; the listing id is not in the fields kept. It arrived in Smoobu, so it came through a Smoobu-connected Airbnb channel. Channel agent to confirm.
  - kpi_pack `booking_profile` P04: 7 → 8 bookings, median lead 6 → 8 d, median stay 4 n, Airbnb 78.3% / Booking.com 21.7%.
- **Records modified with no change to dates, amount or status:** P04 20–24 Nov (27 Nov 04:37Z) and P06 3–6 Dec (26 Nov 16:10Z). Which field changed: UNKNOWN.
- **Blocks:** no block created, moved or removed on any mapped apartment or Scott Ellis since yesterday's pull.
- Both new bookings' Smoobu price-details read "Cancellation Host Fee / Cancellation Payout". The type is "modification of booking", not cancellation, and the same labels sit on the confirmed P04 20–24 Nov and P06 3–6 Dec records. Recorded here as a label only; not treated as a cancellation.

### Scott Ellis Gardens (Smoobu / PriceLabs 3588993), apartment level
- **Reservations: 2 (unchanged):** Airbnb 21–26 Dec 2026 (5 n, room £1,481.76, made 22 Nov); Booking.com 30 Dec 2026–4 Jan 2027 (5 n, room £2,238.40, made 24 Nov). No modification since 25 Nov 11:06Z.
- **Blocks:** unchanged since 23 Nov 10:59 (20 Nov–9 Dec; single nights 15 Dec, 6 Jan, 12 Jan).
- **Next 30 (27 Nov–26 Dec): 5 booked, 14 blocked, 11 open.** Yesterday 5 / 15 / 10: 26 Nov (blocked) left, 26 Dec (open) entered.
  - Open: 10–14 Dec (£342 / £385 / £388 / £413 / £389, min 3,3,3,2,2; yesterday £337–£468); 16–20 Dec (£397–£503, min 3–4); 26 Dec (£526, min 4).
- **Next 60 (to 25 Jan): 10 booked, 16 blocked, 34 open.** Yesterday 10 / 17 / 33: 26 Nov (blocked) left, 25 Jan (open) entered.
- **Runs that sell only as one exact stay:** 26–29 Dec (£526 / £520 / £630 / £650, min 4 / 7 / 5 / 4) and 4–5 Jan (£270 min 2, £263 min 3, before the 6 Jan block).
- Still not in `build/properties.py`, `data/id_map.json` or `policy.json` (t-scott-ellis-2011). Not counted in any portfolio figure.

### 7-day pickup, net of cancellations
- **Window:** bookings made 21–27 Nov to 07:19Z (Smoobu `created-at`); cancellations by `modifiedAt`. Script `occ27/pick_rise.py`.
- **Gross made:** 8 bookings / 22 n / £3,960.21. **Still confirmed:** 6 / 15 n / £3,133.74 (matches kpi_pack `pickup_7d` summed: P04 1/3/£378.67, P06 2/6/£1,281.86, P11 1/2/£280.67, P12 1/3/£766.54, P20 1/1/£426.00).
- **Cancelled in the window:** 4 / 14 n / £2,724.24 (P04 10–14 Dec £488.35; P04 17–20 Dec £338.12; P05 13–17 Feb £1,219.98; P12 4–7 Dec £677.79).
- **Net: +8 n / +£1,235.97.** Yesterday +3 n / +£364.74.
- **Reconciliation:**
  - 20 Nov leaves the window. Made that day: P11 27–30 Nov 3 n / £538.73, P20 5 Dec 1 n / £343.33 (since cancelled). Cancelled that day: P11 28 Nov–2 Dec 4 n / £605.29, P20 5 Dec 1 n / £343.33. Net effect +1 n / +£66.56.
  - Overnight: P20 5–6 Dec +1 n / +£426.00; P04 10–13 Dec +3 n / +£378.67.
  - 3 + 1 + 1 + 3 = **+8**; £364.74 + £66.56 + £426.00 + £378.67 = **+£1,235.97** (exact).

| Ref | Made 21–27 Nov (n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| **P04** | 10 / £1,205.14 (**10–13 Dec Airbnb £378.67, new**; 10–14 Dec and 17–20 Dec, both cancelled) | 7 / £826.47 | **+3 / +£378.67** (was 0) |
| P05 | 0 | 4 / £1,219.98 | −4 / −£1,219.98 |
| P06 | 6 / £1,281.86 (29 Nov–2 Dec, 3–6 Dec, Airbnb) | — | +6 / +£1,281.86 |
| P11 | 2 / £280.67 (25–27 Nov) | — | +2 / +£280.67 (was +1 / +£214.11; 20 Nov left) |
| P12 | 3 / £766.54 (4–7 Dec Booking.com) | 3 / £677.79 | 0 / +£88.75 |
| **P20** | 1 / £426.00 (**5–6 Dec Airbnb, new**) | — | **+1 / +£426.00** (was 0) |
| P01, P02, P07, P08, P09, P10, P13, P14 | 0 | — | 0 |

**Booking.com bookings made since 18 Nov (the +15% date), confirmed:** unchanged at 3 on mapped units (P11 27–30 Nov, P12 4–7 Dec, P11 25–27 Nov) plus Scott Ellis 30 Dec–4 Jan (unmapped). No new Booking.com booking overnight.

### Pace vs STLY
Cancellations excluded on both sides (`rm.metrics.on_the_books` on `data/snapshots/2026-11-27/reservations.csv`).
- **P12, handback-aware.** Stays 27 Nov–13 Dec 2026 as of 27 Nov 2026 vs 27 Nov–13 Dec 2025 as of 27 Nov 2025: **13 n / £2,852.35 vs 14 n / £2,783.35 = −1 n / +£69.00 / +2.5% revenue** (−7.1% on nights).
  - **On track** (within ±10% on revenue; fwd occ 76.5%, between 60% and 85%). Yesterday −3.4% revenue / −13.3% nights.
  - OTB unchanged: **26 Nov lapsed unsold** (it was open at £301, min 1, and nothing booked it), so 26 Nov leaving removes no booked night. 13 n / £2,852.35, same as yesterday.
  - STLY: 26 Nov 2025 leaves (−1 n / −£170.43); no booking made on 27 Nov 2025 enters. 15 − 1 = 14; £2,953.78 − £170.43 = £2,783.35 (exact).
  - kpi_pack `pace_30` (27 Nov–26 Dec, not handback-aware): 13 n / £2,852.35 vs 22 n / £4,508.56 = −9 n / −36.7%. `pace_90`: 13 n vs 53 n / £9,464.20 = −40 n / −69.9%. Nothing after 13 Dec is inventory, so neither is a demand signal.
- **P02:** kpi_pack 30-day 0 vs STLY 11 n / £1,203.97; 90-day 0 vs 25 n / £2,673.96. Blocked on purpose, not assessed.
- **All other units: UNKNOWN (no STLY).** Only P02 and P12 have bookings made on or before 27 Nov 2025.

### 18 Oct base rises: running effect, recomputed (same method)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including later-cancelled ones), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 27 Nov 07:19Z pull.

**Raised group (P01, P05, P06, P09, P11, P12): +37 n / +£9,561.05 including P06; +22 n / +£6,412.58 like-for-like. Unchanged from yesterday.** No raised unit had a booking or cancellation overnight (both new bookings are P04 and P20).
- Like-for-like excludes the 4 P06 stays on reopened nights (15 n / £3,148.47): 37 − 15 = 22; £9,561.05 − £3,148.47 = £6,412.58. P06 like-for-like +6 / +£1,345.77. P06 6–12 Dec (reopened 24 Nov) still has no booking.
- Made: 33 / 122 n / £26,699.43. Cancelled: 16 / 85 n / £17,138.38.

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | 1 / 3 / £720.90 | 0 / £0 |
| P05 | 4 / 16 / £6,135.19 | 1 / 4 / £1,219.98 | +12 / +£4,915.21 |
| P06 | 6 / 21 / £4,494.24 | — | +21 / +£4,494.24 (like-for-like +6 / +£1,345.77) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 | −3 / −£244.70 (handed back; final) |
| P11 | 10 / 34 / £6,119.80 | 6 / 38 / £7,472.46 | −4 / −£1,352.66 |
| P12 | 10 / 42 / £8,613.40 | 7 / 31 / £6,864.44 | +11 / +£1,748.96 |

**Comparison groups:**
- Unraised (P02, P08, P10, P14, P20): **+55 n / +£10,584.37** (was +54 / +£10,158.37; P20 5–6 Dec +1 / +£426.00). P20 alone +46 / +£9,382.77.
- P13: +27 n / +£4,704.65 (unchanged).
- **P04: +50 n / +£6,312.34 using `total_gbp`** (was +47 / +£5,933.67; the 10–13 Dec Airbnb stay adds +3 / +£378.67). Counting import-batch records without a basePrice as £0: +£3,824.94 (was +£3,446.27).
- **Caveats as before:** the Booking.com markup changes (24 Oct, 12 Nov, 18 Nov), stacked promotions, Reyhan's overrides and the P06 reopenings cannot be separated out. The sample is 1–10 bookings per unit. A cancellation is not evidence about price.

### Per-property table
**Column sources:** Occ30 / ADR30 / RevPAR30: kpi_pack `last30`, 28 Oct–26 Nov. Fwd occ30: Smoobu 27 Nov 07:19Z, 27 Nov–26 Dec, non-blocked and handback-aware (kpi_pack `market_occ_30` in brackets). Pace30: see above. Pickup 7d: made 21–27 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £153.15 | £153.15 | 100% 3/3 non-blocked (37%) | UNKNOWN: no STLY | 0 | **Compressed** (0 open nights before the block/handback) |
| P02 | Ladbroke Grove | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (50%) | not assessed (policy) | 0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (52%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| **P04** | Barking | 73.3%† | £123.40† | £90.50† | **36.7%** 11/30 (24%) | UNKNOWN: no STLY | **+3 / +£378.67** | **Soft** (fwd30 < 60%; was 30.0%) |
| P05 | St John's Wood | 80.0% | £433.82 | £347.05 | 70.0% 21/30 (50%) | UNKNOWN: no STLY | −4 / −£1,219.98 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 70.0% | £201.48 | £141.04 | 50.0% 8/16 non-blocked (51%) | UNKNOWN: no STLY | +6 / +£1,281.86 | **Soft** (fwd30 < 60%; mechanical, 6–12 Dec reopened on an intentional-block listing) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (27%) | UNKNOWN | 0 | Not classified: blocked on purpose |
| P08 | Islington | 46.7% | £131.91 | £61.56 | handed back after 13 Nov (54%) | — | 0 | Not classified: handed back |
| **P09** | Greenwich | 60.0% | £102.69 | £61.61 | **handed back after 26 Nov** (41%) | — | 0 | **Not classified: handed back** (was Compressed) |
| P10 | Ealing / Hanger Lane | 73.3% | £105.96 | £77.71 | handed back after 18 Nov (32%) | — | 0 | Not classified: handed back |
| P11 | Camden | 60.0% | £178.94 | £107.36 | 53.3% 16/30 (49%) | UNKNOWN: no STLY | +2 / +£280.67 | **Soft** (fwd30 < 60%) |
| P12 | Mile End | 63.3% | £158.56 | £100.42 | 76.5% 13/17 to handback (42%) | −1 n / +£69.00 / +2.5% handback-aware (pack −36.7%) | 0 / +£88.75 | **On track** |
| P13 | Shepherd's Bush (one flat) | 66.7% | £137.41 | £91.60 | 63.3% 19/30 (46%) | UNKNOWN: no STLY | 0 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% 0/30 (46%) | UNKNOWN: no STLY | 0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 50.0% | £189.11 | £94.55 | 80.0% 24/30 (38%) | UNKNOWN: no STLY | **+1 / +£426.00** | Unclassifiable (60–85%, no STLY) |

† P04 mixes bases: import-batch stays carry the Smoobu `price` because they have no basePrice element.

**Classes:** Compressed 1 (P01); On track 1 (P12); Soft 4 (P04, P06, P11, P14); Unclassifiable 8 (P05, P13, P20, P15–P19); Not classified 6 (P02, P03, P07 policy blocks; P08, P09, P10 handed back).
- **Only class change: P09 Compressed → Not classified (handback, as flagged yesterday).**
- P04 30.0% → 36.7% (new Airbnb stay). P06 52.9% → 50.0% (26 Nov booked night left). P12 72.2% → 76.5% (26 Nov open night left). P01 4/4 → 3/3. P05 70.0%, P11 53.3%, P13 63.3%, P20 80.0% unchanged.
- P20 at 80.0% is 5 points under the Compressed line (85%); 6 open nights in the next 30.

**Next 30 and next 60, Smoobu, handback-aware (from 27 Nov):**

| Ref | Next 30 booked / revenue | Next 60 booked | Share | Next 60 revenue |
|---|---|---|---|---|
| P01 | 3/3 / £456.39 | 3/3 | 100% | £456.39 |
| P04 | 11/30 / £1,479.65 | 19/60 | 31.7% | £2,556.39 (was 17/60, £2,328.70) |
| P05 | 21/30 / £11,096.92 | 28/60 | 46.7% | £15,579.32 |
| P06 | 8/16 / £1,685.79 | 8/16 | 50.0% | £1,685.79 (block from 13 Dec) |
| P11 | 16/30 / £3,435.23 | 23/39 | 59.0% | £5,399.46 (block from 5 Jan) |
| P12 | 13/17 / £2,852.35 | 13/17 | 76.5% | £2,852.35 |
| P13 | 19/30 / £3,208.53 | 26/60 | 43.3% | £4,974.53 |
| P14 | 0/30 / £0 | 0/60 | 0% | £0 |
| P20 | 24/30 / £4,742.37 | 31/60 | 51.7% | £6,546.15 |
| **Total** | **115/216 = 53.2% / £28,957.22** | **151/375** | **40.3%** | **£40,050.38** |

**Last 365 nights** (kpi_pack `last365`, 27 Nov 2025–26 Nov 2026):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 45.8% | £173.85 | £79.54 | £29,033.14 |
| P02 | 78.4% | £129.24 | £101.27 | £36,962.14 |
| P05 | 62.7% | £379.97 | £238.39 | £87,012.07 |
| P06 | 39.5% | £233.98 | £92.31 | £33,692.68 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 41.9% | £172.44 | £72.28 | £26,382.63 |
| P09 | 44.1% | £114.17 | £50.36 | £18,381.24 |
| P10 | 42.7% | £113.44 | £48.48 | £17,696.55 |
| P11 | 81.4% | £174.55 | £142.03 | £51,842.24 |
| P12 | 80.3% | £193.73 | £155.51 | £56,762.87 |
| P13 | 82.5% | £157.23 | £129.66 | £47,326.11 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 (short history) | 8.2% | £174.30 | £14.33 | £5,228.86 |

P03, P04 and P15–P19: UNKNOWN (kpi_pack null).

**Booking profile** (kpi_pack `booking_profile`, confirmed bookings). Changes since yesterday: **P04** 7 → 8 bookings (lead 6 → 8 d; Airbnb 78.3% / Booking.com 21.7%); **P20** 10 → 11 (median stay 7 → 4 n); **P02** 70 → 69 (a Nov-2025 stay left the window; Airbnb 54.5% / Booking.com 42.3% / Direct 3.2%). Others unchanged.

| Ref | Bookings | Median lead | Median stay | Channel revenue share |
|---|---|---|---|---|
| P01 | 20 | 15 d | 5 n | Airbnb 79.9% / Website 13.3% / Booking.com 6.8% |
| P02 | 69 | 36 d | 4 n | Airbnb 54.5% / Booking.com 42.3% / Direct 3.2% |
| P04 | 8 | 8 d | 4 n | Airbnb 78.3% / Booking.com 21.7% |
| P05 | 62 | 44 d | 4 n | Airbnb 100% |
| P06 | 36 | 13 d | 4 n | Airbnb 75.3% / Booking.com 24.7% |
| P07 | 5 | 3 d | 4 n | Airbnb 100% |
| P08 | 22 | 15 d | 6 n | Airbnb 77.3% / Booking.com 22.7% |
| P09 | 25 | 18 d | 5 n | Airbnb 57.3% / Booking.com 41.2% / Direct 1.5% |
| P10 | 22 | 12 d | 5 n | Airbnb 69.3% / Booking.com 27.6% / Website 3.1% |
| P11 | 74 | 28 d | 4 n | Booking.com 54.8% / Airbnb 43.3% / Agoda 1.9% |
| P12 | 78 | 31 d | 4 n | Booking.com 89.6% / Airbnb 10.4% |
| P13 | 87 | 22 d | 3 n | Booking.com 52.3% / Airbnb 46.9% / Agoda 0.9% |
| P14 | 1 | 57 d | 10 n | Airbnb 100% |
| P20 | 11 | 8 d | 4 n | Airbnb 100% |

### Orphan gaps, next 30 / 60
- **Source:** Smoobu `/api/rates`, 27 Nov 07:19Z (`occ27/gaps.py`). P13 read as one calendar; handbacks respected.
- **Definition:** an open run where no arrival night's minimum stay fits before the next booking or block.

| Ref | Night(s) | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| P11 | 3–4 Jan (next 60) | £148 / £163, min 3 | 2 nights between the stay ending 3 Jan and the block from 5 Jan | **Day 5.** Unsellable while min is 3 and the block stands |

**Only one orphan. No new orphan from either new booking.**

**Checked and NOT orphans:**
- **P04 13 Dec:** not an orphan. The 10–13 Dec stay departs 13 Dec, and 13 Dec opens a **14-night run 13–26 Dec, min 3 on every night** (£142–£158), followed by a stay from 27 Dec.
- **P04 around 10–13 Dec:** 6–9 Dec is a 4-night run between the stay ending 6 Dec and the new 10 Dec arrival, min 3 (£172 / £173 / £173 / £169 = £687). Sellable as a 3- or 4-night stay. A 3-night sale would leave a 1-night run (6 Dec or 9 Dec) under the min-3 rule (policy P04 `min_stay_rule`). **P04 2 Dec:** single night, £425, min 1 (bookable).
- **P20 after 5 Dec sold:** no gap. 27 Nov–13 Dec is booked solid. Open: 14–18 Dec 5-night run, min 3 (£290 / £304 / £302 / £335 / £317 = £1,548); 26 Dec single night, £563, min 1.
- **P12 30 Nov–3 Dec:** 4-night run, min 2, £269 / £279 / £282 / £288 = **£1,118** (yesterday £1,108). These are the last open nights before the 13 Dec handback. P12 26 Nov lapsed unsold.
- **P06 2 Dec:** single night, £294, min 1 (yesterday £317). **P06 6–12 Dec:** 7-night run, min 3, £333 / £302 / £304 / £317 / £312 / £333 / £324 = **£2,225** (yesterday £2,338), no booking. P06 is a policy intentional-block listing.
- **P11:** 30 Nov–4 Dec 5 n, min 2 (£1,263); 14–18 Dec 5 n, min 2 (darts nights 14–17 Dec average **£224.50**, was £225.50); 23–25 Dec 3 n, min 2 (£277 / £255 / £264). All sellable.

**Runs that sell only as one exact stay:** P05 7–8 Dec (£425 / £399) and 13–14 Dec (£471 / £468), min 2; Scott Ellis 26–29 Dec and 4–5 Jan.

**Single nights at min 1 (bookable):** P04 2 Dec £425; P05 21 Dec £2,141 and 29 Dec £2,290; P06 2 Dec £294; P11 8 Dec £298; P13 27 Nov tonight (3064856 £261 / 3090701 £237) and 1 Dec (£235 / £213); P20 26 Dec £563.

**Lapsed:** P12 26 Nov (open at £301, min 1) and P14 26 Nov.

### Gaps to fill (open nights next 30, 27 Nov–26 Dec, Smoobu 27 Nov 07:19Z): 101 nights
- **P04 (19):** 2 Dec (£425, min 1); 6–9 Dec (£687, min 3); 13–26 Dec (14 n, min 3, £142–£158).
- **P05 (9):** 29 Nov–2 Dec (£473 / £463 / £460 / £468, min 3; yesterday £1,904, now £1,864); 7–8 Dec; 13–14 Dec; 21 Dec (£2,141, min 1).
- **P06 (8):** 2 Dec (£294); 6–12 Dec (£2,225, min 3).
- **P11 (14):** 30 Nov–4 Dec (£1,263); 8 Dec (£298); 14–18 Dec (£212 / £216 / £226 / £244 / £308); 23–25 Dec.
- **P12 (4):** 30 Nov–3 Dec (£1,118, min 2).
- **P13 (11):** 27 Nov and 1 Dec (min 1); 13–21 Dec (9 n, 3064856 £200–£232, min 2–3).
- **P14 (30):** every night (special setup, numbers only).
- **P20 (6):** 14–18 Dec (£1,548, min 3); 26 Dec (£563, min 1).
- **P01:** none.

### Conflicts for Corentin (confirm or revert, not new proposals)
1. **P11 Camden "Blocked channel" 5 Jan 2027–31 Jul 2029** (created 22 Nov 12:18): **still present, day 5.** P11 is not in policy `handbacks`. It removes 21 nights (5–25 Jan) from the next 60 and causes the 3–4 Jan orphan. Confirm it is a handback (last night 4 Jan).
2. **P06 6–12 Dec reopening** (block start moved 6 → 13 Dec on 24 Nov 14:13:44Z): still open, no booking, now £2,225. Confirm intended.
3. **P12 handback block** in Smoobu runs 14 Dec 2026–29 Jun 2029; policy says to 21 Oct 2027. The last night (13 Dec) agrees. For the record.
4. **Carried:** P01 block runs 30 Nov–20 Dec, while policy's gap block ends 17 Dec (18–20 Dec). P13 1 Dec +25% vs policy +50% (PriceLabs agent). P11 23–25 Dec override (Reyhan, 25 Nov). Scott Ellis Gardens not in our property list (t-scott-ellis-2011).

Data gaps:
- **P20 5–6 Dec:** the Smoobu price at the booking time (26 Nov 16:51) is NOT CHECKED (only the 07:22Z reading of £562). So whether this is a 0.765 booking or 0.758 is open. The Smoobu Airbnb default pricing rules for P20 are NOT CHECKED (policy records them for Shepherd's Bush only).
- **P04 10–13 Dec:** which Airbnb listing it came through (synced vs unsynced 1455) is NOT CHECKED; the Smoobu fields kept carry only the generic Airbnb channel. Whether 1455 still sells 10–13 Dec: NOT CHECKED (channel agent). The breakdown of the 0.765 factor is NOT CHECKED.
- **Records modified with no visible change** (P04 20–24 Nov, P06 3–6 Dec): which field changed is UNKNOWN.
- **Scott Ellis:** status (new property, test or owner use) and who set its 23 Nov blocks: UNKNOWN.
- **P06 6–12 Dec unblock** and **P11 2029 block:** who and why are UNKNOWN (not in policy).
- **Smoobu pagination:** the full pull missed 1 in-window record (P01 2–4 Jun 2026) and duplicated 1 id. Month pulls recovered it; totals match the CSV.
- **STLY:** none on or before 27 Nov 2025 except P02 and P12, so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20.
- **P04 import batch** (no basePrice): this affects P04 last30 and the base-rise comparison group. P04 last365 and pace are null (kpi_pack).
- **Market, comps and channel checks:** kpi_pack `missing` lists `market.csv`, `comps.csv` and `channel_checks.csv` as empty for 27 Nov, so ARI, RGI and price percentiles are null.
- **Missing from kpi_pack:** P03 not in Smoobu; P08, P09 and P10 forward occupancy null (handback); P15–P19 not mapped.
- **Revenue scope:** room only (cleaning excluded).
- **PriceLabs connector:** no call made by this agent today. PriceLabs-side facts come from `data/snapshots/2026-11-27/prices.csv` and the kpi_pack. Smoobu is the source for all forward figures.
