## Occupancy & performance

**Portfolio, last 30 nights (27 Oct–25 Nov 2026), the 14 units with Smoobu history:** 224 n, £39,346.56, occupancy 53.3%, ADR £175.65, RevPAR £93.68 (`reports/2026-11-26/kpi_pack.json` `portfolio_last30`). Room revenue only (Smoobu basePrice; cleaning excluded).
- Yesterday (26 Oct–24 Nov) it was 223 n / £38,848.90.
  - 26 Oct leaves: −8 booked (P01, P02, P04, P05, P06, P10, P11, P12; £1,375.73).
  - 25 Nov enters: +9 booked (P01, P04, P05, P06, P09, P11, P12, P13, P20; £1,873.42). **P11 25 Nov was open in yesterday's pull and was sold the same evening** (new Booking.com stay, below). P14 lapsed open.
  - 223 − 8 + 9 = 224. £38,848.90 − £1,375.73 + £1,873.42 = £39,346.59 against the pack's £39,346.56 (3p rounding of per-night pro rata). Per-night figures are from `data/snapshots/2026-11-25/` and `2026-11-26/reservations.csv`. No other night in the overlap changed.

**Last 365 nights (26 Nov 2025–25 Nov 2026):** 2,263 n, £418,693.11, occupancy 47.7%, ADR £185.02, RevPAR £88.24 (kpi_pack `portfolio_last365`). Yesterday it was 2,257 n / £417,233.76.
- 25 Nov 2025 leaves −2 (P02 £92.67, P12 £170.43). 25 Nov 2026 enters +8 (P04 is excluded from last365, so its £150.99 is not counted; £1,722.43). 2,257 − 2 + 8 = 2,263; £417,233.76 − £263.10 + £1,722.43 = £418,693.09 (2p rounding).
- Most units' Smoobu history starts in 2026, so this understates a full year. P04 is excluded (last365 null).

**Booked next 30 (26 Nov–25 Dec): 116 of 220 non-blocked nights = 52.7%, £28,727.89 room revenue on the books.** Yesterday it was 124/224 = 55.4%, £29,789.99.
**Booked next 60 (26 Nov–24 Jan): 155/380 = 40.8%, £40,916.65.** Yesterday it was 166/385 = 43.1%, £42,997.75.
- **Source:** live Smoobu GET `/api/reservations` (guest and reference fields dropped) and GET `/api/rates`, pulled 26 Nov 07:22:06Z. Scratch copies and scripts: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ26/` (`smoobu_res.json`, `smoobu_rates.json`, `pull.py`, `an.py`, `gaps.py`, `pick_rise.py`).
  - **Pagination fault, same as yesterday:** the full pull returned 863 rows but only 860 unique ids. It dropped the same three records (P06 2–3 Jun 2026, P11 16–19 Feb 2026, a cancelled P13 2–5 Jul 2026). Month-by-month pulls recovered all three. Those pulls also returned 13 records that end before 26 Nov 2025; they were discarded as outside the window.
  - After recovery, the 722 non-block reservations on mapped units match `data/snapshots/2026-11-26/reservations.csv` row for row (ref, dates, status, amount). The CSV's 723rd row is P02 24–26 Nov 2025, which departs on the first day of the window and has no night in it. The 2 Scott Ellis Gardens stays (unmapped) are reported separately below.
  - Reservations and `/api/rates` agree on every unit-night in the next 60: 0 mismatches.
  - P13 is read as one calendar. Scott Ellis Gardens is not counted.
- **Excluded:**
  - P02, P03 and P07: blocked on purpose (policy).
  - Handbacks (policy `handbacks`): P08 and P10 fully out, P09 after 26 Nov (tonight is its last night), P12 after 13 Dec, P01 after 20 Dec.
  - Blocks: P01 30 Nov–20 Dec; P06 from 13 Dec; P11 from 5 Jan 2027 (still present; not in policy, see Conflicts).
- **Reconciling next 30 (124/224 → 116/220):**
  - 25 Nov leaves: −8 booked (P01 £152.13, P04 £150.99, P05 £621.47, P06 £201.96, P09 £102.71, P12 £202.47, P13 £127.08, P20 £174.27 = £1,733.08), −10 inventory (P11 and P14 were open in yesterday's pull).
  - **P04 Booking.com 10–14 Dec cancelled: −4 booked, 0 inventory, −£488.35** (£122.09/n). The 4 nights are open again.
  - **P11 Booking.com 25–27 Nov, new: +1 booked in the window (26 Nov), +£140.34.** Its 25 Nov night falls in last-30, not here.
  - 25 Dec enters: +3 booked (P05 £646.85, P13 £168.15, P20 £204.00 = £1,019.00), +6 inventory (P04, P11 and P14 also open).
  - Night-by-night diff of 26 Nov–23 Jan against yesterday's pull: only P04 10–13 Dec (booked → open) and P11 26 Nov (open → booked) changed.
  - 124 − 8 − 4 + 1 + 3 = **116**; 224 − 10 + 6 = **220**. £29,789.99 − £1,733.08 − £488.35 + £140.34 + £1,019.00 = £28,727.90 against £28,727.89 computed (1p rounding).
- **Reconciling next 60 (166/385 → 155/380):**
  - 25 Nov leaves: −8 booked / −10 inventory / −£1,733.08.
  - P04 cancellation −4 booked / −£488.35. P11 new +1 booked / +£140.34.
  - 24 Jan enters: 0 booked / +5 open (P04, P05, P13, P14, P20; P11 is blocked).
  - 166 − 8 − 4 + 1 = **155**; 385 − 10 + 5 = **380**; £42,997.75 − £1,733.08 − £488.35 + £140.34 = £40,916.66 against £40,916.65 (1p rounding).
- PriceLabs `forward_occ_30` in kpi_pack (P01 12.5%, P04 27.6%, P05 69.0%, P06 27.6%, P11 51.7%, P12 76.5%, P13 62.1%, P20 79.3%) uses a different window and denominator (blocked nights stay in it). Smoobu is the truth.

### What changed overnight (25 Nov 07:24Z → 26 Nov 07:22Z)
- **Non-block reservations on mapped units: 722**, the same count as yesterday: +1 new booking (P11) and −1 P02 Nov-2025 row that left the window. **One cancellation (P04).**
- **NEW: P11 Camden, Booking.com, 25–27 Nov (2 n), made 25 Nov 18:13 (lead time 0 d, same-day arrival).**
  - Room £280.67 = **£140.34/n**. Commission £77.34; cleaning £149; VAT element £46.78 (inside the room price); Smoobu total £429.66.
  - **Commission is not 27.6%.** £77.34 is 27.6% of room only. Booking.com charges commission on room plus cleaning: £77.34 / £429.67 = **18.00%**. That is exactly the Camden Visibility Booster rate (18% for Camden check-ins 1 Nov–18 Dec 2026, policy `booking_promotions_camden_21oct`). So it is explained and not a finding. The other P11 stay (27–30 Nov) is also exactly 18.00% on the same basis (£123.79 / £687.73).
  - **The same basis settles yesterday's open Mile End question.** P12 4–7 Dec: £137.48 / (£766.54 + £150) = **15.00%**. That is the standard rate, not a booster; yesterday's "17.9%" was on room only. On the same basis, P12 27–30 Nov is 15.00%, the cancelled P04 10–14 Dec 15.00%, and Scott Ellis 30 Dec–4 Jan 15.00%.
  - **Paid vs Smoobu:** Smoobu at 25 Nov 07:24Z, while the nights were open, was £207 / £229 = £436 (£218.00/n), min 2. PriceLabs `prices.csv` 25 Nov had the same £229 for 26 Nov. **Paid = 0.644× that Smoobu price = £64.37 per £100 Smoobu.**
    - Against a Standard Rate of ceil(Smoobu × 1.10) = £228 + £252 = £480, paid is 0.585×. Against ceil(Smoobu × 1.15) = £239 + £264 = £503, it is 0.558×.
    - **This booking cannot tell ×1.10 from ×1.15.** The stacked promotions (Mobile, Genius, Last Minute, possibly non-refundable) are unknown. The Smoobu price at 18:13 is also unknown: PriceLabs synced P11 at 10:42Z on 25 Nov, and `get_user_logs` shows Reyhan added a 23–25 Dec override at 10:41Z. Whether 25–26 Nov prices moved between 07:24Z and 18:13Z: NOT CHECKED. The Booking.com list price and rate plan sold: NOT CHECKED (channel agent).
  - **The run sold as the exact stay.** Yesterday 25–26 Nov was listed as a run that "sells only as one exact stay" (min 2). It sold exactly that way, last-minute.
  - **After the sale, Smoobu repriced P11 upward:** 26 Nov (now booked) £229 → £254; 27 Nov £250 → £278; 8 Dec £245 → £306; 30 Nov–4 Dec £1,108 → £1,255. 23–25 Dec went down: £291 / £267 / £304 → £278 / £256 / £265 (Reyhan's 25 Nov 10:41Z override). Edits are for the PriceLabs agent.
- **CANCELLED: P04 Barking, Booking.com, 10–14 Dec (4 n), room £488.35, made 22 Nov 22:54, cancelled 25 Nov 12:56:05** (Smoobu `modifiedAt`).
  - The 4 nights are open in Smoobu again: £165 / £174 / £156 / £147 = £642, min 3. That is 1.31× what the stay paid (£488.35).
  - PriceLabs `prices.csv` 26 Nov has £175 / £155 / £156 / £147 for the same nights. 10 and 11 Dec differ by more than £2; that is one of the 18 P04 mismatches (PriceLabs agent).
- **Records modified with no change to dates, amount or status:** P11 27–30 Nov (25 Nov 23:51Z), P12 27–30 Nov (25 Nov 21:15Z), and both Scott Ellis stays (25 Nov 11:06Z). Which field changed: UNKNOWN (not exposed in the fields kept).
- **P04 24–26 Dec minimum stay is now 3 in both Smoobu and PriceLabs `prices.csv`** (yesterday it was 2 in both). The Smoobu price moved from £175 / £188 / £185 to £160 / £159 / £158. PriceLabs has £158 / £159 / £177. This looks like Reyhan's min-2 edit has been reverted. Who reverted it and when: NOT CHECKED (PriceLabs agent `get_user_logs`).
- **Smoobu prices on other open nights tracked here:**
  - P12 26 Nov is £301 (yesterday £290); P12 30 Nov–3 Dec is £274 / £273 / £279 / £282 = £1,108 (yesterday £1,022).
  - P06 2 Dec is £317 (yesterday £363). P06 6–12 Dec is £2,338 (yesterday £2,697).
  - P04 2 Dec is £403 (yesterday £423).
  - No other reservation or block record was created or modified on any mapped apartment after yesterday's pull.

### Scott Ellis Gardens (Smoobu / PriceLabs 3588993), apartment level
- **Reservations: 2 (unchanged).**
  1. Airbnb, 21–26 Dec 2026, 5 n, room £1,481.76, made 22 Nov.
  2. Booking.com, 30 Dec 2026–4 Jan 2027, 5 n, room £2,238.40, made 24 Nov. Commission 15.0% of room plus cleaning.
  - Both records were modified 25 Nov 11:06Z; dates and amounts are unchanged.
- **Blocks:** no change since 23 Nov 10:59. The 20 Nov–10 Dec block and the single-night blocks on 15–16 Dec, 6–7 Jan and 12–13 Jan are still active.
- **Next 30 (26 Nov–25 Dec): 5 booked, 15 blocked, 10 open** (10–14 Dec, min 2–3, £337–£468; 16–20 Dec, min 3–4, £398–£504). Yesterday it was 4 / 16 / 10: 25 Nov (blocked) left the window and 25 Dec (booked) entered.
- **Next 60 (to 24 Jan): 10 booked, 17 blocked, 33 open.** Yesterday it was 10 / 18 / 32: 25 Nov (blocked) left and 24 Jan (open) entered.
- **Gaps:**
  - 26–29 Dec is a 4-night run at £527 / £510 / £634 / £652, with min 4 on 26 Dec (min 7, 5 and 4 on the later nights). It sells only as one exact 26–30 Dec stay.
  - 4–5 Jan is 2 nights (£273 min 2, £267 min 3) before the 6 Jan block. It sells only as one exact 4–6 Jan stay.
- Still not in `build/properties.py`, `data/id_map.json` or `policy.json` (t-scott-ellis-2011). Not counted in any portfolio figure here.

### 7-day pickup, net of cancellations
- **Window:** bookings made 20–26 Nov to 07:22Z (Smoobu `created-at`); cancellations counted by `modifiedAt`. Script: `occ26/pick_rise.py`.
- **Gross made:** 8 bookings / 22 n / £4,037.60. **Still confirmed:** 5 / 14 n / £2,867.80.
- **Cancelled in the window:** 6 / 19 n / £3,672.86:
  - **P04 10–14 Dec £488.35 (new)**
  - P04 17–20 Dec £338.12
  - P05 13–17 Feb £1,219.98
  - P11 28 Nov–2 Dec £605.29
  - P12 4–7 Dec £677.79
  - P20 5 Dec £343.33
- **Net: +3 n / +£364.74.** Yesterday it was +8 n / +£1,286.97.
- **Reconciliation:**
  - 19 Nov leaves the window: P20 19–22 Nov £714.55 (3 n, made 19 Nov); no cancellation on 19 Nov. That is −3 n / −£714.55.
  - Overnight: P11 25–27 Nov +2 n / +£280.67; P04 10–14 Dec cancelled −4 n / −£488.35 (the booking stays on the made side because it was made 22 Nov).
  - 8 − 3 + 2 − 4 = **+3**; £1,286.97 − £714.55 + £280.67 − £488.35 = **+£364.74** (exact).

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| **P04** | 2 / 7 / £826.47 (10–14 Dec £488.35 Booking.com, **now cancelled**; 17–20 Dec £338.12, cancelled) | **7 / £826.47** | **0 / £0** (was +4 / +£488.35) |
| P05 | 0 | 4 / £1,219.98 | −4 / −£1,219.98 |
| P06 | 2 / 6 / £1,281.86 (29 Nov–2 Dec £513.04; 3–6 Dec £768.82, both Airbnb) | — | +6 / +£1,281.86 |
| **P11** | **2 / 5 / £819.40** (27–30 Nov £538.73; **25–27 Nov £280.67, new**) | 4 / £605.29 | **+1 / +£214.11** (was −1 / −£66.56) |
| P12 | 1 / 3 / £766.54 (4–7 Dec Booking.com) | 3 / £677.79 | 0 / +£88.75 |
| **P20** | 1 / 1 / £343.33 (5 Dec, cancelled; 19–22 Nov left the window) | 1 / £343.33 | **0 / £0** (was +3 / +£714.55) |
| P01, P02, P07, P08, P09, P10, P13, P14 | 0 | — | 0 |

kpi_pack `pickup_7d` (gross, confirmed only, not net of cancellations) matches the confirmed made side: P06 2 / 6 / £1,281.86, P11 2 / 5 / £819.40, P12 1 / 3 / £766.54; P04 and P20 are now 0; all others 0.

**Booking.com bookings made since 24 Oct** (Smoobu `created-at`):
- **Mapped units: 29 gross / 17 confirmed / 12 cancelled** (counting the three identical P04 20–23 Nov cancellations, made 26 Oct, once). Raw it is 31 / 17 / 14.
  - Since yesterday: +1 gross and +1 confirmed (P11 25–27 Nov); P04 10–14 Dec moved from confirmed to cancelled.
- Including Scott Ellis Gardens' Booking.com stay: 30 / 18 / 12.
- **Confirmed Booking.com bookings made since 18 Nov (the +15% date):** P11 27–30 Nov (made 20 Nov), P12 4–7 Dec (24 Nov), P11 25–27 Nov (25 Nov). Scott Ellis 30 Dec–4 Jan (24 Nov) is unmapped. Which markup each one evidences: channel agent.

### Pace vs STLY
Cancellations are excluded on both sides (same method as `rm.metrics.on_the_books`, run on `data/snapshots/2026-11-26/reservations.csv`).
- **P12, handback-aware.** Stays 26 Nov–13 Dec 2026 as of 26 Nov 2026, against 26 Nov–13 Dec 2025 as of 26 Nov 2025: **13 n / £2,852.35 vs 15 n / £2,953.78 = −2 n / −£101.43 / −3.4% revenue** (−13.3% on nights).
  - On revenue (the pack's `revenue_delta_pct` basis), it is within ±10% and fwd occ is 72.2% (between 60% and 85%), so **P12 stays On track.** On nights it would be Soft; the basis is unchanged from yesterday, where revenue was −2.2% and nights −12.5%.
  - Reconciliation, OTB: 25 Nov 2026 leaves (−1 n / −£202.47). 14 − 1 = 13; £3,054.82 − £202.47 = £2,852.35 (exact).
  - Reconciliation, STLY: 25 Nov 2025 leaves (−1 n / −£170.43). 16 − 1 = 15; £3,124.21 − £170.43 = £2,953.78 (exact).
  - kpi_pack `pace_30` (26 Nov–25 Dec, not handback-aware): 13 n / £2,852.35 vs 22 n / £4,312.01 = −9 n / −33.9% (yesterday −31.8%).
  - kpi_pack `pace_90`: 13 n vs 53 n / £9,473.24 = −40 n / −69.9%. Nothing after 13 Dec is inventory, so this is not a demand signal.
- **P12 26 Nov (tonight): NOT sold** as of 07:22Z. It is open at £301, min 1, and lapses tonight if unsold.
- **P02:** kpi_pack 30-day 0 vs STLY 11 n / £1,203.97; 90-day 0 vs 25 n / £2,673.96. Blocked on purpose, so not assessed.
- **All other units: UNKNOWN (no STLY).** No booking made on or before 26 Nov 2025 exists for any unit except P02 and P12.

### 18 Oct base rises: running effect, recomputed (same method)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 26 Nov 07:22Z pull.

**Raised group (P01, P05, P06, P09, P11, P12): +37 n / +£9,561.05 including P06; +22 n / +£6,412.58 like-for-like.** Yesterday it was +35 / +£9,280.38 and +20 / +£6,131.91.
- **The whole move is P11: +2 n / +£280.67** (the 25–27 Nov booking, made 25 Nov). **P11 goes from −6 / −£1,633.33 to −4 / −£1,352.66.**
- Check: £9,280.38 + £280.67 = £9,561.05; £6,131.91 + £280.67 = £6,412.58.
- Like-for-like still excludes the 4 P06 stays on the reopened nights (15 n / £3,148.47): 37 − 15 = 22; £9,561.05 − £3,148.47 = £6,412.58. P06 like-for-like stays +6 / +£1,345.77. P06 6–12 Dec (reopened 24 Nov) has no booking yet.
- Made: 33 / 122 n / £26,699.43 (was 32 / 120 / £26,418.76). Cancelled: 16 / 85 n / £17,138.38 (unchanged; no raised unit had a cancellation overnight).

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | 1 / 3 / £720.90 | 0 / £0 |
| P05 | 4 / 16 / £6,135.19 | 1 / 4 / £1,219.98 | +12 / +£4,915.21 |
| P06 | 6 / 21 / £4,494.24 | — | +21 / +£4,494.24 (like-for-like +6 / +£1,345.77) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 | −3 / −£244.70 |
| **P11** | **10 / 34 / £6,119.80** (was 9 / 32 / £5,839.13) | 6 / 38 / £7,472.46 | **−4 / −£1,352.66** (was −6 / −£1,633.33) |
| P12 | 10 / 42 / £8,613.40 | 7 / 31 / £6,864.44 | +11 / +£1,748.96 |

**Comparison groups:**
- Unraised (P02, P08, P10, P14, P20): +54 n / +£10,158.37 (unchanged).
- P13: +27 n / +£4,704.65 (unchanged).
- **P04: +47 n / +£5,933.67 using `total_gbp`** (was +51 / +£6,422.02; the 10–14 Dec cancellation takes −4 n / −£488.35). Counting import-batch records without a basePrice as £0 gives +£3,446.27 (was +£3,934.62).
- **Caveats as before:**
  - The Booking.com markup changes (24 Oct, 12 Nov, 18 Nov), stacked promotions, Reyhan's overrides and the P06 reopenings cannot be separated out.
  - The sample is 1–10 bookings per unit.
  - A cancellation is not evidence about price. The new P11 stay is a same-day booking at 0.644× Smoobu, which is not evidence that the higher base sells.

### Per-property table
**Column sources:**
- Occ30, ADR30, RevPAR30: kpi_pack `last30`, 27 Oct–25 Nov.
- Fwd occ30: Smoobu 26 Nov 07:22Z, 26 Nov–25 Dec, non-blocked and handback-aware. kpi_pack `market_occ_30` is in brackets.
- Pace30: see above.
- Pickup 7d: made 20–26 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £153.49 | £153.49 | 100% 4/4 non-blocked (35%) | UNKNOWN: no STLY | 0 | **Compressed** (0 open nights before the block/handback) |
| P02 | Ladbroke Grove | 3.3% | £104.31 | £3.48 | all blocked (51%) | not assessed (policy) | 0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (52%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| **P04** | Barking | 73.3%† | £122.03† | £89.49† | **30.0%** 9/30 (23%) | UNKNOWN: no STLY | **0 / £0** | **Soft** (fwd30 < 60%; was 46.7%. −4 from the 10–14 Dec cancellation, −1 from 25 Nov leaving) |
| P05 | St John's Wood | 76.7% | £425.66 | £326.34 | 70.0% 21/30 (50%) | UNKNOWN: no STLY | −4 / −£1,219.98 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 70.0% | £200.33 | £140.23 | 52.9% 9/17 non-blocked (52%) | UNKNOWN: no STLY | +6 / +£1,281.86 | **Soft** (fwd30 < 60%; mechanical, because 6–12 Dec was reopened on an intentional-block listing) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (26%) | UNKNOWN | 0 | Not classified: blocked on purpose |
| P08 | Islington | 50.0% | £131.87 | £65.94 | handed back after 13 Nov (54%) | — | 0 | Not classified: handed back |
| P09 | Greenwich | 56.7% | £102.69 | £58.19 | 100% 1/1 (26 Nov, last night) (40%) | UNKNOWN: no STLY | 0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 76.7% | £105.96 | £81.24 | handed back after 18 Nov (32%) | — | 0 | Not classified: handed back |
| **P11** | Camden | 60.0% | £181.26 | £108.76 | **53.3%** 16/30 (50%) | UNKNOWN: no STLY | **+1 / +£214.11** | **Soft** (fwd30 < 60%; was 50.0%) |
| P12 | Mile End | 66.7% | £156.07 | £104.04 | 72.2% 13/18 to handback (43%) | −2 n / −£101.43 / −3.4% handback-aware (pack −33.9%) | 0 / +£88.75 | **On track** (within ±10% on revenue) |
| P13 | Shepherd's Bush (one flat) | 66.7% | £137.44 | £91.62 | 63.3% 19/30 (47%) | UNKNOWN: no STLY | 0 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% 0/30 (47%) | UNKNOWN: no STLY | 0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 46.7% | £190.17 | £88.75 | 80.0% 24/30 (38%) | UNKNOWN: no STLY | **0 / £0** (was +3) | Unclassifiable (60–85%, no STLY) |

† P04 mixes bases: import-batch stays carry the Smoobu `price` because they have no basePrice element.

**Classes:** Compressed 2 (P01, P09); On track 1 (P12); Soft 4 (P04, P06, P11, P14); Unclassifiable 8 (P05, P13, P20, P15–P19); Not classified 5 (P02, P03 and P07 policy blocks; P08 and P10 handed back).
- **No class change today.**
  - P04 46.7% → 30.0% (deeper Soft).
  - P11 50.0% → 53.3%.
  - P12 73.7% → 72.2%.
  - P06 55.6% → 52.9%.
  - P01 5/5 → 4/4; P09 2/2 → 1/1.
  - P05 70.0%, P13 63.3% and P20 80.0% are unchanged.
- **P09:** tonight is its last managed night (handback), so it leaves the table tomorrow.

**Next 30 and next 60, Smoobu, handback-aware (from 26 Nov):**

| Ref | Next 30 booked / revenue | Next 60 booked | Share | Next 60 revenue |
|---|---|---|---|---|
| P01 | 4/4 / £608.52 | 4/4 | 100% | £608.52 |
| P04 | 9/30 / £1,251.96 | 17/60 | 28.3% | £2,328.70 (was 22/60, £2,968.04) |
| P05 | 21/30 / £11,071.54 | 29/60 | 48.3% | £16,200.79 |
| P06 | 9/17 / £1,887.75 | 9/17 | 52.9% | £1,887.75 (block from 13 Dec) |
| P09 | 1/1 / £102.71 | 1/1 | 100% | £102.71 |
| P11 | 16/30 / £3,294.96 | 24/40 | 60.0% | £5,539.80 (denominator cut by the block from 5 Jan) |
| P12 | 13/18 / £2,852.35 | 13/18 | 72.2% | £2,852.35 |
| P13 | 19/30 / £3,167.46 | 27/60 | 45.0% | £5,101.61 |
| P14 | 0/30 / £0 | 0/60 | 0% | £0 |
| P20 | 24/30 / £4,490.64 | 31/60 | 51.7% | £6,294.41 |
| **Total** | **116/220 = 52.7% / £28,727.89** | **155/380** | **40.8%** | **£40,916.65** |

**Last 365 nights** (kpi_pack `last365`, 26 Nov 2025–25 Nov 2026):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 45.5% | £173.98 | £79.13 | £28,881.01 |
| P02 | 78.4% | £129.24 | £101.27 | £36,962.14 |
| P05 | 62.5% | £378.91 | £236.69 | £86,390.60 |
| P06 | 39.2% | £234.20 | £91.76 | £33,490.72 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 41.9% | £172.44 | £72.28 | £26,382.63 |
| P09 | 43.8% | £114.24 | £50.08 | £18,278.53 |
| P10 | 42.7% | £113.44 | £48.48 | £17,696.55 |
| P11 | 81.1% | £174.67 | £141.65 | £51,701.90 |
| P12 | 80.5% | £193.65 | £155.98 | £56,933.30 |
| P13 | 82.2% | £157.33 | £129.31 | £47,199.03 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 (short history) | 7.9% | £174.30 | £13.85 | £5,054.60 |

P03, P04 and P15–P19: UNKNOWN (kpi_pack null).

**Booking profile** (kpi_pack `booking_profile`, confirmed bookings).
- **Changes since yesterday:**
  - **P04:** 8 → 7 bookings (the 10–14 Dec Booking.com cancellation). Median lead 8 → 6 d; Airbnb 75.9% / Booking.com 24.1% (was 66.5% / 33.5%).
  - **P11:** 73 → 74 bookings. Median lead 28 d and median stay 4 n are unchanged; Booking.com 54.8% / Airbnb 43.3% / Agoda 1.9%.
  - All other units are unchanged.

| Ref | Bookings | Median lead | Median stay | Channel revenue share |
|---|---|---|---|---|
| P01 | 20 | 15 d | 5 n | Airbnb 79.9% / Website 13.3% / Booking.com 6.8% |
| P02 | 70 | 36 d | 4 n | Airbnb 54.2% / Booking.com 42.6% / Direct 3.2% |
| P04 | 7 | 6 d | 4 n | Airbnb 75.9% / Booking.com 24.1% |
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
| P20 | 10 | 8 d | 7 n | Airbnb 100% |

### Orphan gaps, next 30 / 60
- **Source:** Smoobu `/api/rates`, 26 Nov 07:22Z (`occ26/gaps.py`). P13 is read as one calendar and handbacks are respected.
- **Definition:** an orphan is an open run where no arrival night's minimum stay fits before the next booking or block.

| Ref | Night(s) | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| P11 | 3–4 Jan (next 60) | £150 / £164, min 3 | 2 nights between the stay ending 3 Jan and the block from 5 Jan. | **Day 4.** Unsellable while min is 3 and the block stands. |

**Only one orphan today. No new orphans.**

**Checked and NOT orphans:**
- **P04 around 10–14 Dec:** the cancellation joined 6–9 Dec, 10–13 Dec and 14–26 Dec into **one 21-night run, 6–26 Dec, min 3 on every night** (£140–£174; 24–26 Dec now min 3, was min 2). Sellable; no orphan. **P04 2 Dec:** single night, £403, min 1. Bookable.
- **P11 around 25–27 Nov:** 25–26 Nov sold. 27–30 Nov is booked, then 30 Nov–4 Dec is a 5-night run, min 2 (£226 / £230 / £242 / £259 / £298 = £1,255). No gap was created. (23–24 Nov is in the past.)
- **P12 26 Nov (tonight):** not sold; single night, **£301, min 1**. Bookable today only. **P12 30 Nov–3 Dec:** 4-night run, min 2, £1,108. Sellable.
- **P06 2 Dec:** single night, £317, min 1. Bookable. **P06 6–12 Dec:** 7-night run, min 3, £361 / £328 / £329 / £338 / £310 / £360 / £312 = £2,338. Sellable. P06 is a policy intentional-block listing.
- **P20:** 5 Dec (£562, min 1) and 26 Dec (£565, min 1) are single bookable nights. 14–18 Dec is a 5-night run, min 3 (£290 / £304 / £302 / £335 / £348 = £1,579).
- **P11 23–25 Dec:** 3-night run, min 2 (£278 / £256 / £265). **P11 14–18 Dec:** 5-night run, min 2. Both sellable.

**Runs that sell only as one exact stay:**
- P05 7–8 Dec (£429 / £405) and 13–14 Dec (£474 / £471), min 2.
- Scott Ellis 26–29 Dec and 4–5 Jan (see above).

**Single nights at min 1 (bookable):** P04 2 Dec £403; P05 21 Dec £2,152 and 29 Dec £2,308; P06 2 Dec £317; P11 8 Dec £306; P12 26 Nov £301; P13 27 Nov (£260 / £226) and 1 Dec (£234 / £203); P20 5 Dec £562 and 26 Dec £565.

**Lapsed:** P11 25 Nov **sold** (no longer a lapse). P14 25 Nov lapsed open.

### Gaps to fill (open nights next 30, 26 Nov–25 Dec, Smoobu 26 Nov 07:22Z): 104 nights
- **P04 (21):**
  - 2 Dec (£403, min 1).
  - 6–25 Dec (20 n, min 3), which includes **10–13 Dec reopened by the cancellation (£165 / £174 / £156 / £147)**. The run continues to 26 Dec.
- **P05 (9):** 29 Nov–2 Dec (£484 / £473 / £469 / £478, min 3); 7–8 Dec; 13–14 Dec; 21 Dec (£2,152, min 1).
- **P06 (8):** 2 Dec (£317, min 1); 6–12 Dec (£2,338, min 3; reopened 24 Nov).
- **P11 (14):**
  - 30 Nov–4 Dec (£1,255, min 2).
  - 8 Dec (£306, min 1).
  - 14–18 Dec (£208 / £218 / £228 / £248 / £313, min 2). The darts nights 14–17 Dec average **£225.50** (unchanged).
  - 23–25 Dec (£278 / £256 / £265).
- **P12 (5):** **26 Nov (£301, min 1, tonight)**; 30 Nov–3 Dec (£1,108, min 2).
- **P13 (11):** 27 Nov and 1 Dec (min 1); 13–21 Dec (9 n, 3064856 £199–£230, min 2–3).
- **P14 (30):** every night (special setup, numbers only).
- **P20 (6):** 5 Dec (£562, min 1); 14–18 Dec (£1,579, min 3).
- **P01, P09:** none.

### Conflicts for Corentin (confirm or revert, not new proposals)
1. **P11 Camden "Blocked channel" 5 Jan 2027–31 Jul 2029** (created 22 Nov 12:18): **still present, day 4.** P11 is not in policy `handbacks`. It removes 20 open nights from the next 60 (5–24 Jan) and causes the 3–4 Jan orphan. Confirm it is a handback (and that the last night is 4 Jan).
2. **P06 6–12 Dec reopening** (Smoobu block start moved from 6 Dec to 13 Dec on 24 Nov 14:13:44Z): still open, no booking, now £2,338. P06 is a policy intentional-block listing. Confirm the reopening is intended.
3. **P12 handback block** in Smoobu runs 14 Dec 2026–29 Jun 2029; policy says blocked 14 Dec 2026 to 21 Oct 2027. Last night 13 Dec agrees; only the end date differs. For the record.
4. **Carried:**
   - **P04 min 2 on 24–26 Dec: now min 3 in both Smoobu and PriceLabs** (it appears reverted). Who reverted it and when: PriceLabs agent.
   - P13 1 Dec +25% (policy +50%): not re-checked by this agent.
   - P11 darts override: 14–17 Dec average £225.50, unchanged.
   - P01 18–20 Dec block versus the policy gap block ending 17 Dec.
   - Scott Ellis Gardens is not in our property list (t-scott-ellis-2011).
   - New edit seen in `get_user_logs`: Reyhan added a P11 23–25 Dec override (percent, min 2) on 25 Nov 10:41Z. Smoobu 23–25 Dec moved from £291 / £267 / £304 to £278 / £256 / £265. For the PriceLabs agent to classify.

Data gaps:
- **P11 25–27 Nov:** the Smoobu price at the booking time (18:13 on 25 Nov) is NOT CHECKED; the only reading is 07:24Z. The Booking.com list price, rate plan and promotions applied are NOT CHECKED (channel agent). So the ×1.10 vs ×1.15 question stays open on this booking.
- **P04 10–14 Dec cancellation:** the reason is UNKNOWN. Which nights the unsynced Barking Airbnb 1455 is still selling: NOT CHECKED here (channel agent).
- **Records modified with no visible change** (P11 27–30 Nov, P12 27–30 Nov, both Scott Ellis stays): which field changed is UNKNOWN.
- **Scott Ellis:** status (new property, test or owner use) is UNKNOWN. Who set its blocks on 23 Nov is UNKNOWN.
- **P06 6–12 Dec unblock:** who changed it and why: UNKNOWN.
- **P11 5 Jan 2027–31 Jul 2029 block purpose:** UNKNOWN (not in policy).
- **Smoobu pagination:** the full pull dropped the same 3 records and duplicated 3 ids. Month-by-month pulls recovered them, and the totals match the snapshot CSV (722 plus 1 row with no night in the window).
- **STLY:** none on or before 26 Nov 2025 except P02 and P12, so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20.
- **P04 import batch** (no basePrice): this affects P04 last30 and the base-rise comparison group. P04 last365 and pace are null (kpi_pack).
- **Market, comps and channel checks:** kpi_pack `missing` lists `market.csv`, `comps.csv` and `channel_checks.csv` as empty for 26 Nov, so ARI, RGI and price percentiles are null.
- **Missing from kpi_pack:** P03 is not in Smoobu; P08, P09 and P10 forward occupancy is null (handback); P15–P19 are not mapped.
- **Revenue scope:** room only (cleaning excluded).
- **PriceLabs connector:** one read-only call by this agent (`get_user_logs`, P11, 24–26 Nov). Smoobu is the source for all forward figures.
