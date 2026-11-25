## Occupancy & performance

**Portfolio, last 30 nights (26 Oct–24 Nov 2026), the 14 units with Smoobu history:** 223 n, £38,848.90, occupancy 53.1%, ADR £174.21, RevPAR £92.50 (`reports/2026-11-25/kpi_pack.json` `portfolio_last30`). Room revenue only (Smoobu basePrice; cleaning excluded).
- Yesterday (25 Oct–23 Nov) it was 225 n / £38,983.58.
  - 25 Oct leaves: −8 booked (P01, P02, P05, P06, P08, P10, P11, P12; £1,542.50).
  - 24 Nov enters: +6 booked (P01, P05, P06, P09, P12, P13; £1,407.82). P04, P11, P14 and P20 were open on 24 Nov and lapsed unsold.
  - 225 − 8 + 6 = 223. £38,983.58 − £1,542.50 + £1,407.82 = **£38,848.90 (exact)**. Per-night figures are pro rata, from `data/snapshots/2026-11-24/` and `2026-11-25/reservations.csv`. No other night in the overlap changed.

**Last 365 nights (25 Nov 2025–24 Nov 2026):** 2,257 n, £417,233.76, occupancy 47.6%, ADR £184.86, RevPAR £87.93 (kpi_pack `portfolio_last365`). Yesterday it was 2,253 n / £416,089.04.
- 24 Nov 2025 leaves −2 (P02 £92.67, P12 £170.43). 24 Nov 2026 enters +6 (£1,407.82). 2,253 − 2 + 6 = 2,257; £416,089.04 − £263.10 + £1,407.82 = £417,233.76 (exact).
- Most units' Smoobu history starts in 2026, so this understates a full year. P04 is excluded (last365 null).

**Booked next 30 (25 Nov–24 Dec): 124 of 224 non-blocked nights = 55.4%, £29,789.99 room revenue on the books.** Yesterday it was 124/221 = 56.1%, £29,412.28.
**Booked next 60 (25 Nov–23 Jan): 166/385 = 43.1%, £42,997.75.** Yesterday it was 169/383 = 44.1%, £43,639.04.
- **Source:** live Smoobu GET `/api/reservations` (guest and reference fields dropped) and GET `/api/rates`, pulled 25 Nov 07:24:21Z. Scratch copies and scripts: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ25/` (`smoobu_res.json`, `smoobu_rates.json`, `an.py`, `recon.py`, `gaps.py`, `pick_rise.py`, `supp2.py`).
  - **Pagination fault, worse than on previous days:** the full pull returned 862 rows but only 859 unique ids. It dropped P06 2–3 Jun 2026, P11 16–19 Feb 2026 and a cancelled P13 2–5 Jul 2026. A narrow pull and then month-by-month pulls recovered all three. Those pulls also returned 13 records that end before 25 Nov 2025; they were discarded as outside the window.
  - After recovery, the 722 non-block reservations on mapped units match `data/snapshots/2026-11-25/reservations.csv` row for row (ref, dates, status, amount). The 2 Scott Ellis Gardens stays (unmapped) are reported separately below.
  - Reservations and `/api/rates` agree on every unit-night in the next 60: 0 mismatches.
  - P13 is read as one calendar. Scott Ellis Gardens is not counted.
- **Excluded:**
  - P02, P03 and P07: blocked on purpose (policy).
  - Handbacks (policy `handbacks`): P08 and P10 fully out, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - Blocks: P01 30 Nov–20 Dec; **P06 from 13 Dec (was from 6 Dec)**; P11 from 5 Jan 2027 (still present; not in policy, see Conflicts).
- **Reconciling next 30 (124/221 → 124/224):**
  - 24 Nov leaves: −6 booked (P01 £152.13, P05 £621.47, P06 £201.96, P09 £102.71, P12 £202.47, P13 £127.08 = £1,407.82), −10 inventory (P04, P11, P14 and P20 were also open).
  - **P12 Booking.com 4–7 Dec rebooked: +3 booked, 0 inventory, +£766.54.**
  - **P06 6–12 Dec unblocked: +7 inventory, 0 booked.** The Smoobu "Blocked channel" record (13 Dec 2026–31 Dec 2027) was modified 24 Nov 14:13:44 so that it now starts 13 Dec (it started 6 Dec in yesterday's pull). P06 is a policy intentional-block listing; the reopened nights are now open inventory, at £384 / £364 / £332 / £340 / £396 / £447 / £434 = £2,697, min 3. Who changed it and why: UNKNOWN.
  - 24 Dec enters: +3 booked (P05 £646.85, P13 £168.15, P20 £204.00 = £1,019.00), +6 inventory (P04, P11 and P14 also open).
  - Night-by-night diff of 25 Nov–22 Jan against yesterday's pull: only P06 6–12 Dec (blocked → open) and P12 4–6 Dec (open → booked) changed.
  - 124 − 6 + 3 + 3 = **124**; 221 − 10 + 7 + 6 = **224**. £29,412.28 − £1,407.82 + £766.54 + £1,019.00 = £29,790.00 against £29,789.99 computed (1p rounding).
- **Reconciling next 60 (169/383 → 166/385):**
  - 24 Nov leaves: −6 booked / −10 inventory / −£1,407.82.
  - P12 4–7 Dec rebooked: +3 booked / +£766.54. P06 6–12 Dec unblocked: +7 inventory.
  - 23 Jan enters: 0 booked / +5 open (P04, P05, P13, P14, P20; P11 is blocked).
  - 169 − 6 + 3 = **166**; 383 − 10 + 7 + 5 = **385**; £43,639.04 − £1,407.82 + £766.54 = £42,997.76 against £42,997.75 (1p rounding).
- PriceLabs `forward_occ_30` in kpi_pack (P04 44.8%, P06 31.0%, P11 51.7%, P12 72.2%, P13 62.1%, P20 79.3%) uses a different window and denominator (blocked nights stay in it). Smoobu is the truth.

### What changed overnight (24 Nov 07:20Z → 25 Nov 07:24Z)
- **Non-block reservations on mapped units: 722.** Yesterday there were 723; +1 new booking (P12) and −2 P12 Nov-2025 rows (21–24 Nov 2025, one confirmed and one cancelled) that left the 365-day window. **No cancellation.**
- **NEW: P12 Mile End, Booking.com, 4–7 Dec (3 n), made 24 Nov 20:39.**
  - Room £766.54 = **£255.51/n**. Commission £137.48 (17.9% of room); cleaning £150; VAT element £127.76; Smoobu total £916.54.
  - **Paid vs Smoobu:** Smoobu on 24 Nov 07:20Z, while the nights were open, was £312 / £332 / £271 = £915 (£305.00/n). **Paid = 0.838× Smoobu = £83.78 per £100 Smoobu.** Today's Smoobu on the now-booked nights is £311 / £331 / £267 = £909 (0.843×). The Booking.com price live at 20:39 and the rate plan and promotions applied: NOT CHECKED (channel agent).
  - **Against the cancelled stay it replaces** (same nights, made 5 Nov, cancelled 23 Nov, room £677.79 = £225.93/n, 0.74× the 24 Nov Smoobu): **+£88.75 (+13.1%)**, +£29.58/n.
  - Commission is above 15% on this stay (17.9%) and on the cancelled one (£124.17 / £677.79 = 18.3%). Policy names Visibility Booster dates for Camden and Shepherd's Bush only, not Mile End. **Whether the booster is on for Mile End on these dates: NOT CHECKED. Ask before assuming** (policy `booking_visibility_booster`).
- **P06 block shortened** (see above): +7 open nights, 6–12 Dec.
- **Scott Ellis Gardens: a new Booking.com reservation** (below).
- No other reservation or block record was created or modified on any apartment after yesterday's pull.
- **Smoobu prices on P12 open nights:** 26 Nov £290 (yesterday £294); 30 Nov–3 Dec £242 / £257 / £258 / £265 = £1,022 (yesterday £242 / £241 / £256 / £275).

### Scott Ellis Gardens (Smoobu / PriceLabs 3588993), apartment level
- **Reservations: 2 (was 1).**
  1. Airbnb, 21–26 Dec 2026, 5 n, room £1,481.76, made 22 Nov (unchanged).
  2. **NEW: Booking.com, 30 Dec 2026–4 Jan 2027, 5 n, room £2,238.40 = £447.68/n, made 24 Nov 23:47** (lead time 36 days).
     - Commission £358.26 (16.0% of room); cleaning £150; VAT element £373.07; Smoobu total £2,388.40.
     - **Paid vs Smoobu:** Smoobu on 24 Nov 07:20Z (open) was £619 / £618 / £502 / £466 / £339 = £2,544 (£508.80/n), min stay 4 on 30–31 Dec. **Paid = 0.880× Smoobu = £87.99 per £100 Smoobu.** Today's Smoobu on the booked nights is £619 / £618 / £501 / £465 / £339 = £2,542. The Booking.com price and promotions applied: NOT CHECKED.
- **Blocks:** no change since 23 Nov 10:59 (the 20 Nov–10 Dec block and the single-night blocks on 15–16 Dec, 6–7 Jan and 12–13 Jan are still active).
- **Next 30 (25 Nov–24 Dec): 4 booked, 16 blocked, 10 open** (10–14 Dec, min 3; 16–20 Dec, min 3–4). Yesterday it was 3 / 17 / 10: 24 Nov (blocked) left the window and 24 Dec (booked) entered.
- **Next 60 (to 23 Jan): 10 booked, 18 blocked, 32 open.** Yesterday it was 5 / 19 / 36.
- **Gaps:**
  - 26–29 Dec is a 4-night run at £490 / £503 / £591 / £623, with min 4 on 26 Dec (min 7, 5 and 4 on the later nights). It sells only as one exact 26–30 Dec stay.
  - 4–5 Jan is 2 nights (£332 min 2, £321 min 3) before the 6 Jan block. It sells only as one exact 4–6 Jan stay.
- Still not in `build/properties.py`, `data/id_map.json` or `policy.json` (t-scott-ellis-2011). Not counted in any portfolio figure here.

### 7-day pickup, net of cancellations
- **Window:** bookings made 19–25 Nov to 07:24Z (Smoobu `created-at`); cancellations counted by `modifiedAt`. Script: `occ25/pick_rise.py`.
- **Gross made:** 8 bookings / 23 n / £4,471.48. **Still confirmed:** 6 / 19 n / £3,790.03.
- **Cancelled in the window:** 5 / 15 n / £3,184.51. Unchanged: P05 13–17 Feb £1,219.98; P11 28 Nov–2 Dec £605.29; P20 5 Dec £343.33; P04 17–20 Dec £338.12; P12 4–7 Dec £677.79.
- **Net: +8 n / +£1,286.97.** Yesterday it was +15 n / +£1,851.32.
- **Reconciliation:**
  - 18 Nov leaves the window: P04 18–20 Nov £254.15 (2 n) and P04 27 Dec–4 Jan £1,076.74 (8 n), both made 18 Nov; no cancellation on 18 Nov. That is −10 n / −£1,330.89.
  - Overnight: P12 rebook +3 n / +£766.54.
  - 15 − 10 + 3 = **+8**; £1,851.32 − £1,330.89 + £766.54 = **+£1,286.97** (exact).

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P04 | 2 / 7 / £826.47 (10–14 Dec £488.35 Booking.com; 17–20 Dec £338.12, cancelled) | 3 / £338.12 | +4 / +£488.35 |
| P05 | 0 | 4 / £1,219.98 | −4 / −£1,219.98 |
| P06 | 2 / 6 / £1,281.86 (29 Nov–2 Dec £513.04; 3–6 Dec £768.82, both Airbnb) | — | +6 / +£1,281.86 |
| P11 | 1 / 3 / £538.73 (27–30 Nov) | 4 / £605.29 | −1 / −£66.56 |
| **P12** | **1 / 3 / £766.54 (4–7 Dec Booking.com, new)** | 3 / £677.79 | **0 / +£88.75** (was −3 / −£677.79) |
| P20 | 2 / 4 / £1,057.88 (19–22 Nov £714.55; 5 Dec £343.33, cancelled) | 1 / £343.33 | +3 / +£714.55 |
| P01, P02, P07, P08, P09, P10, P13, P14 | 0 | — | 0 |

kpi_pack `pickup_7d` (gross, confirmed only, not net of cancellations) matches the confirmed made side: P04 1 / 4 / £488.35, P06 2 / 6 / £1,281.86, P11 1 / 3 / £538.73, P12 1 / 3 / £766.54, P20 1 / 3 / £714.55; all others 0.

**Booking.com bookings made since 24 Oct** (Smoobu `created-at`):
- **Mapped units: 28 gross / 17 confirmed / 11 cancelled** (counting the three identical P04 20–23 Nov cancellations, made 26 Oct at £484.82 each, once). That **matches the brief.** Raw it is 30 / 17 / 13. The only change since yesterday is the P12 rebook.
- Including Scott Ellis Gardens' new Booking.com stay: 29 / 18 / 11.

### Pace vs STLY
Cancellations are excluded on both sides (same method as `rm.metrics.on_the_books`, run on `data/snapshots/2026-11-25/reservations.csv`).
- **P12, handback-aware.** Stays 25 Nov–13 Dec 2026 as of 25 Nov 2026, against 25 Nov–13 Dec 2025 as of 25 Nov 2025: **14 n / £3,054.82 vs 16 n / £3,124.21 = −2 n / −£69.39 / −2.2%.** That is within ±10% of STLY, and fwd occ is 73.7% (between 60% and 85%), so **P12 is On track (was Soft at −24.4%).**
  - Reconciliation, OTB: 24 Nov 2026 leaves (−1 n / −£202.47); the 4–7 Dec rebook adds +3 n / +£766.54. 12 − 1 + 3 = 14; £2,490.75 − £202.47 + £766.54 = £3,054.82 (exact).
  - Reconciliation, STLY: 24 Nov 2025 leaves (−1 n / −£170.43). 17 − 1 = 16; £3,294.64 − £170.43 = £3,124.21 (exact).
  - kpi_pack `pace_30` (25 Nov–24 Dec, not handback-aware): 14 n / £3,054.82 vs 23 n / £4,482.44 = −9 n / −31.8% (yesterday −43.6%).
  - kpi_pack `pace_90`: 14 n vs 54 n / £9,643.67 = −40 n / −68.3%. Nothing after 13 Dec is inventory, so this is not a demand signal.
- **P02:** kpi_pack 30-day 0 vs STLY 12 n / £1,296.64; 90-day 0 vs 26 n / £2,766.63. Blocked on purpose, so not assessed.
- **All other units: UNKNOWN (no STLY).** No booking made on or before 25 Nov 2025 exists for any unit except P02 (8 bookings) and P12 (15 bookings).

### 18 Oct base rises: running effect, recomputed (same method)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 25 Nov 07:24Z pull.

**Raised group (P01, P05, P06, P09, P11, P12): +35 n / +£9,280.38 including P06; +20 n / +£6,131.91 like-for-like.** Yesterday it was +32 / +£8,513.84 and +17 / +£5,365.37.
- **The whole move is P12: +3 n / +£766.54** (the 4–7 Dec rebook, made 24 Nov). **P12 goes from +8 / +£982.42 to +11 / +£1,748.96.**
- Check: £8,513.84 + £766.54 = £9,280.38; £5,365.37 + £766.54 = £6,131.91.
- Like-for-like still excludes the 4 P06 stays on the reopened nights (15 n / £3,148.47); P06 like-for-like stays +6 / +£1,345.77. P06 6–12 Dec, reopened 24 Nov, has no booking yet.
- Made: 32 / 120 n / £26,418.76 (was 31 / 117 / £25,652.22). Cancelled: 16 / 85 n / £17,138.38 (unchanged).

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | 1 / 3 / £720.90 | 0 / £0 |
| P05 | 4 / 16 / £6,135.19 | 1 / 4 / £1,219.98 | +12 / +£4,915.21 |
| P06 | 6 / 21 / £4,494.24 | — | +21 / +£4,494.24 (like-for-like +6 / +£1,345.77) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 | −3 / −£244.70 |
| P11 | 9 / 32 / £5,839.13 | 6 / 38 / £7,472.46 | −6 / −£1,633.33 |
| **P12** | **10 / 42 / £8,613.40** (was 9 / 39 / £7,846.86) | 7 / 31 / £6,864.44 | **+11 / +£1,748.96** (was +8 / +£982.42) |

**Comparison groups (unchanged overnight):**
- Unraised (P02, P08, P10, P14, P20): +54 n / +£10,158.37.
- P13: +27 n / +£4,704.65.
- P04: +51 n / +£6,422.02 using `total_gbp`; counting import-batch records without a basePrice as £0 gives +£3,934.62.
- **Caveats as before:**
  - The Booking.com markup changes (24 Oct, 12 Nov, 18 Nov), stacked promotions, Reyhan's overrides and the P06 reopenings cannot be separated out.
  - The sample is 1–10 bookings per unit.
  - A cancellation is not evidence about price. The P12 rebook paid 13.1% more than the stay it replaced, but that is one booking.

### Per-property table
**Column sources:**
- Occ30, ADR30, RevPAR30: kpi_pack `last30`, 26 Oct–24 Nov.
- Fwd occ30: Smoobu 25 Nov 07:24Z, 25 Nov–24 Dec, non-blocked and handback-aware. kpi_pack `market_occ_30` is in brackets.
- Pace30: see above.
- Pickup 7d: made 19–25 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £153.83 | £153.83 | 100% 5/5 non-blocked (35%) | UNKNOWN: no STLY | 0 | **Compressed** (0 open nights before the block/handback) |
| P02 | Ladbroke Grove | 6.7% | £104.31 | £6.95 | all blocked (51%) | not assessed (policy) | 0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (52%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | 73.3%† | £120.65† | £88.47† | **46.7%** 14/30 (23%) | UNKNOWN: no STLY | +4 / +£488.35 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 76.7% | £416.63 | £319.42 | 70.0% 21/30 (50%) | UNKNOWN: no STLY | −4 / −£1,219.98 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 70.0% | £199.18 | £139.43 | **55.6%** 10/18 non-blocked (52%) | UNKNOWN: no STLY | +6 / +£1,281.86 | **Soft** (fwd30 < 60%; **was Compressed** 11/12. The change is mechanical: 7 nights, 6–12 Dec, unblocked 24 Nov 14:13Z, and booked 24 Nov left the window. Intentional-block listing) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (26%) | UNKNOWN | 0 | Not classified: blocked on purpose |
| P08 | Islington | 50.0% | £131.87 | £65.94 | handed back after 13 Nov (55%) | — | 0 | Not classified: handed back |
| P09 | Greenwich | 53.3% | £102.69 | £54.77 | 100% 2/2 to 26 Nov (40%) | UNKNOWN: no STLY | 0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 80.0% | £105.96 | £84.77 | handed back after 18 Nov (32%) | — | 0 | Not classified: handed back |
| P11 | Camden | 60.0% | £183.59 | £110.15 | **50.0%** 15/30 (50%) | UNKNOWN: no STLY | −1 / −£66.56 | **Soft** (fwd30 < 60%) |
| **P12** | Mile End | 66.7% | £151.38 | £100.92 | **73.7%** 14/19 to handback (43%) | **−2 n / −£69.39 / −2.2%** handback-aware (pack −31.8%) | **0 / +£88.75** | **On track** (within ±10%; **was Soft**) |
| P13 | Shepherd's Bush (one flat) | 63.3% | £137.98 | £87.39 | 63.3% 19/30 (46%) | UNKNOWN: no STLY | 0 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% 0/30 (48%) | UNKNOWN: no STLY | 0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 43.3% | £191.39 | £82.94 | 80.0% 24/30 (38%) | UNKNOWN: no STLY | +3 / +£714.55 | Unclassifiable (60–85%, no STLY) |

† P04 mixes bases: import-batch stays carry the Smoobu `price` because they have no basePrice element.

**Classes:** Compressed 2 (P01, P09); On track 1 (P12); Soft 4 (P04, P06, P11, P14); Unclassifiable 8 (P05, P13, P20, P15–P19); Not classified 5 (P02, P03 and P07 policy blocks; P08 and P10 handed back).
- **Two class changes:**
  - **P12 Soft → On track:** the 4–7 Dec rebook took fwd30 from 60.0% to 73.7% and pace from −24.4% to −2.2%.
  - **P06 Compressed → Soft:** 91.7% → 55.6%. This is the 6–12 Dec unblock, not lost demand.
- **No class change:**
  - P04 46.7% (24 Nov open left, 24 Dec open entered). P11 50.0%.
  - P20 76.7% → 80.0% (24 Nov open left, 24 Dec booked entered).
  - P05 70.0% and P13 63.3% unchanged.
  - P01 6/6 → 5/5; P09 3/3 → 2/2.

**Next 60 (25 Nov–23 Jan), Smoobu, handback-aware:**

| Ref | Booked | Share | Revenue |
|---|---|---|---|
| P01 | 5/5 | 100% | £760.65 |
| P04 | 22/60 | 36.7% | £2,968.04 |
| P05 | 30/60 | 50.0% | £16,822.27 |
| P06 | 10/18 | 55.6% | £2,089.72 (was 11/12; block now from 13 Dec) |
| P09 | 2/2 | 100% | £205.42 |
| P11 | 23/41 | 56.1% | £5,399.46 (denominator cut by the block from 5 Jan) |
| P12 | 14/19 | 73.7% | £3,054.82 (was 12/20, £2,490.75) |
| P13 | 28/60 | 46.7% | £5,228.70 |
| P14 | 0/60 | 0% | £0 |
| P20 | 32/60 | 53.3% | £6,468.68 |

**Last 365 nights** (kpi_pack `last365`, 25 Nov 2025–24 Nov 2026):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 45.2% | £174.11 | £78.71 | £28,728.88 |
| P02 | 78.6% | £129.11 | £101.52 | £37,054.81 |
| P05 | 62.2% | £377.84 | £234.98 | £85,769.12 |
| P06 | 38.9% | £234.43 | £91.20 | £33,288.75 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 41.9% | £172.44 | £72.28 | £26,382.63 |
| P09 | 43.6% | £114.31 | £49.80 | £18,175.82 |
| P10 | 42.7% | £113.44 | £48.48 | £17,696.55 |
| P11 | 80.8% | £174.78 | £141.26 | £51,561.57 |
| P12 | 80.5% | £193.54 | £155.89 | £56,901.26 |
| P13 | 81.9% | £157.43 | £128.96 | £47,071.94 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 (short history) | 7.7% | £174.30 | £13.37 | £4,880.33 |

P03, P04 and P15–P19: UNKNOWN (kpi_pack null).

**Booking profile** (kpi_pack `booking_profile`, confirmed bookings). Change since yesterday: **P12 stays at 78 bookings** (the rebook in, one Nov-2025 stay out of the window). Median lead is 31 d and median stay 4 n; Booking.com share is 89.6% (yesterday 89.5%). All other units unchanged.

| Ref | Bookings | Median lead | Median stay | Channel revenue share |
|---|---|---|---|---|
| P01 | 20 | 15 d | 5 n | Airbnb 79.9% / Website 13.3% / Booking.com 6.8% |
| P02 | 70 | 36 d | 4 n | Airbnb 54.2% / Booking.com 42.6% / Direct 3.2% |
| P04 | 8 | 8 d | 4 n | Airbnb 66.5% / Booking.com 33.5% |
| P05 | 62 | 44 d | 4 n | Airbnb 100% |
| P06 | 36 | 13 d | 4 n | Airbnb 75.3% / Booking.com 24.7% |
| P07 | 5 | 3 d | 4 n | Airbnb 100% |
| P08 | 22 | 15 d | 6 n | Airbnb 77.3% / Booking.com 22.7% |
| P09 | 25 | 18 d | 5 n | Airbnb 57.3% / Booking.com 41.2% / Direct 1.5% |
| P10 | 22 | 12 d | 5 n | Airbnb 69.3% / Booking.com 27.6% / Website 3.1% |
| P11 | 73 | 28 d | 4 n | Booking.com 54.6% / Airbnb 43.5% / Agoda 1.9% |
| P12 | 78 | 31 d | 4 n | Booking.com 89.6% / Airbnb 10.4% |
| P13 | 87 | 22 d | 3 n | Booking.com 52.3% / Airbnb 46.9% / Agoda 0.9% |
| P14 | 1 | 57 d | 10 n | Airbnb 100% |
| P20 | 10 | 8 d | 7 n | Airbnb 100% |

Note: `rm.metrics.booking_profile` run directly on today's CSV gives P04 12 bookings (Booking.com 59.3% / Airbnb 40.7%), against the pack's 8. The pack figure is quoted; the difference (the pack's P04 filtering) is a data gap.

### Orphan gaps, next 30 / 60
- **Source:** Smoobu `/api/rates`, 25 Nov 07:24Z (`occ25/gaps.py`). P13 is read as one calendar and handbacks are respected.
- **Definition:** an orphan is an open run where no arrival night's minimum stay fits before the next booking or block.

| Ref | Night(s) | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| P11 | 3–4 Jan (next 60) | £151 / £163, min 3 | 2 nights between the stay ending 3 Jan and the block from 5 Jan. | **Day 3.** Unsellable while min is 3 and the block stands. |

**Only one orphan today. No new orphans.**
- **Lapsed unsold, 24 Nov:** P04 24 Nov (orphan, day 10, never sellable under the 3-night rule) and P20 24 Nov (orphan, min 2). P11 and P14 also lapsed open.

**Checked and NOT orphans:**
- **P12 30 Nov–3 Dec: now a 4-night run** (the rebook closed 4–6 Dec), **min 2, £242 / £257 / £258 / £265 = £1,022**, between the 27–30 Nov and 4–7 Dec stays. Sellable (2, 3 or 4 nights). Not an orphan.
- **P12 26 Nov:** single night, **£290, min 1** (yesterday £294). Bookable. Lapses tomorrow night if unsold.
- **P06 2 Dec:** single night, **£363, min 1** (unchanged). Bookable. P06 is a policy intentional-block listing.
- **P06 6–12 Dec (new, reopened):** 7-night run, min 3, £2,697. Sellable; not an orphan.
- **P20:** the 24 Nov orphan lapsed. 5 Dec (£588, min 1) and 26 Dec (£516, min 1) are single bookable nights. 14–18 Dec is a 5-night run, min 3 (£289 / £306 / £302 / £336 / £348).
- **P11 30 Nov–4 Dec:** 5-night run at min 2, £200 / £199 / £208 / £235 / £266 = £1,108 (yesterday £1,086). **P11 23–25 Dec:** 3-night run at min 2 (£291 / £267 / £304). Both sellable.
- **P04 6–9 Dec:** 4-night run at min 3 (£163 / £164 / £164 / £161 = £652). **P04 14–26 Dec:** 13-night run before the 27 Dec arrival, min 3 on 14–23 Dec (£140–£158), min 2 on 24–26 Dec. Neither is an orphan.

**Runs that sell only as one exact stay:**
- P11 25–26 Nov, from tonight (£207 / £229, min 2).
- P05 7–8 Dec (£428 / £407) and 13–14 Dec (£483 / £477), min 2.

**Single nights at min 1 (bookable):** P04 2 Dec £423; P05 21 Dec £2,193 and 29 Dec £2,247; P06 2 Dec £363; P11 8 Dec £245; P12 26 Nov £290; P13 27 Nov (£263 / £210) and 1 Dec (£233 / £186); P20 5 Dec £588 and 26 Dec £516.

### Gaps to fill (open nights next 30, 25 Nov–24 Dec, Smoobu 25 Nov 07:24Z): 100 nights
- **P04 (16):** 2 Dec (£423, min 1); 6–9 Dec (£652, min 3); 14–24 Dec (11 n, min 3 to 23 Dec, min 2 on 24 Dec). The run continues 25–26 Dec.
- **P05 (9):** 29 Nov–2 Dec (£488 / £473 / £469 / £475, min 3); 7–8 Dec; 13–14 Dec; 21 Dec (£2,193, min 1).
- **P06 (8):** 2 Dec (£363, min 1); **6–12 Dec (£2,697, min 3; reopened 24 Nov)**.
- **P11 (15):** 25–26 Nov (£436, min 2); 30 Nov–4 Dec (£1,108, min 2); 8 Dec (£245, min 1); 14–18 Dec (£207 / £218 / £228 / £249 / £315, min 2); 23–24 Dec (£291 / £267). The darts nights 14–17 Dec average **£225.50** (yesterday £220.75).
- **P12 (5):** 26 Nov (£290, min 1); **30 Nov–3 Dec (£1,022, min 2)**.
- **P13 (11):** 27 Nov and 1 Dec (min 1); 13–21 Dec (9 n, 3064856 £189–£217, min 2–3).
- **P14 (30):** every night (special setup, numbers only).
- **P20 (6):** 5 Dec (£588, min 1); 14–18 Dec (£1,581, min 3).
- **P01, P09:** none.

### Conflicts for Corentin (confirm or revert, not new proposals)
1. **P11 Camden "Blocked channel" 5 Jan 2027–31 Jul 2029** (created 22 Nov 12:18): **still present, day 3.** P11 is not in policy `handbacks`. It removes 19 open nights from the next 60 (5–23 Jan) and causes the 3–4 Jan orphan. Confirm it is a handback (and the last night, 4 Jan).
2. **P06 block start moved from 6 Dec to 13 Dec** (Smoobu record modified 24 Nov 14:13:44Z): P06 is a policy intentional-block listing. Confirm the 6–12 Dec reopening is intended (it adds 7 open nights at £2,697).
3. **P12 handback block** in Smoobu runs 14 Dec 2026–29 Jun 2029; policy says blocked 14 Dec 2026 to 21 Oct 2027. Last night 13 Dec agrees; only the end date differs. For the record.
4. **Carried:**
   - P04 min 2 on 24–26 Dec (policy: never fewer than 3).
   - P13 1 Dec +25% (policy +50%).
   - P11 darts −2%.
   - P01 18–20 Dec block versus the policy gap block ending 17 Dec.
   - Scott Ellis Gardens is not in our property list (t-scott-ellis-2011).
   - (The P20 24 Nov min-2 item lapsed.)

Data gaps:
- **P12 4–7 Dec rebook:** the Booking.com price live at 24 Nov 20:39, the rate plan sold and the promotions applied: NOT CHECKED (channel agent). Ratios are against the Smoobu price only. Mile End Visibility Booster status (commission 17.9%): NOT CHECKED.
- **Scott Ellis 30 Dec–4 Jan:** the Booking.com price, rate plan and promotions: NOT CHECKED. Scott Ellis status (new property, test, owner use): UNKNOWN. Who set its blocks on 23 Nov: UNKNOWN.
- **P06 6–12 Dec unblock:** who changed it and why: UNKNOWN.
- **P11 5 Jan 2027–31 Jul 2029 block purpose:** UNKNOWN (not in policy).
- **Smoobu pagination:** the full pull dropped 3 records (P06 2–3 Jun, P11 16–19 Feb, P13 2–5 Jul 2026 cancelled) and duplicated 3 ids. Month-by-month pulls recovered them, and the totals match the snapshot CSV (722).
- **STLY:** none before 25 Nov 2025 except P02 and P12, so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20.
- **P04 import batch** (no basePrice): this affects P04 last30, pace and the base-rise comparison group. P04 last365 and pace are null (kpi_pack). The P04 booking count in the pack (8) differs from the raw CSV (12).
- **Market, comps and channel checks:** kpi_pack `missing` lists `market.csv`, `comps.csv` and `channel_checks.csv` as empty for 25 Nov, so ARI, RGI and price percentiles are null.
- **Missing from kpi_pack:** P03 is not in Smoobu; P08 and P10 forward occupancy is null (handback); P15–P19 are not mapped.
- **Revenue scope:** room only (cleaning excluded).
- **PriceLabs connector:** no call by this agent today. Smoobu is the source for all forward figures. Edits and refreshes since 24 Nov 06:00Z are for the PriceLabs agent (`get_user_logs`).
