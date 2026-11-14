## Occupancy & performance

**Portfolio, last 30 nights (15 Oct–13 Nov 2026), the 13 units with Smoobu history (P01, P02, P05–P14, P20):** 239 n, £41,189.17, occupancy 61.3%, ADR £172.34, RevPAR £105.61 (`reports/2026-11-14/kpi_pack.json` `portfolio_last30`). Revenue is Smoobu basePrice: room only, cleaning excluded. Yesterday (14 Oct–12 Nov) it was 241 n / 61.8% / £171.30 / £105.85.

**Last 365 nights (14 Nov 2025–13 Nov 2026):** 2,203 n, £405,210.46, occupancy 46.4%, ADR £183.94, RevPAR £85.40 (kpi_pack `portfolio_last365`). Most Smoobu history starts in 2026, so this understates a full year.

**Booked next 30 nights (14 Nov–13 Dec): 152 of 258 non-blocked nights = 58.9%.** Yesterday (13 Nov–12 Dec) it was 147/262 = 56.1%.
- **Next 60 (14 Nov–12 Jan):** 209/438 = 47.7%. Yesterday: 205/443 = 46.3%.
- **Source:** live Smoobu GET `/api/reservations` (904 records incl. cancellations and blocks; guest fields dropped) and `/api/rates`, both pulled 14 Nov 07:19:08Z. Saved to scratch `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ14/smoobu_res.json` and `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ14/smoobu_rates.json`. The two endpoints agree on every unit-night for the next 60 (0 mismatches; P13 read as one calendar).
- **Excluded from the counts:**
  - P02, P03 and P07 (blocked on purpose, policy).
  - Every night after a handback: **P08 now fully out (last night 13 Nov)**, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - Blocked nights: P01 30 Nov–20 Dec; P06 from 30 Nov; P20 18–19 Nov.
- **How +5 booked nights reconciles:**
  - New bookings: +14 (P06 +5, P11 +4 and +5).
  - Cancellation: −3 (P11 26–28 Nov).
  - Window roll: 13 Nov out −7 (P01, P05, P06, P08, P09, P10, P13); 13 Dec in +1 (P20).
  - Net: 147 + 14 − 3 − 7 + 1 = 152.
  - The denominator fell by 4: −11 (13 Nov non-blocked) +7 (13 Dec).

### Smoobu full-record diff (14 Nov 07:19Z vs 13 Nov 07:20Z), blocks included
- **Blocks: no block was created, removed or changed.** P06 143402691 still starts 30 Nov, P01 160657036 is still 30 Nov–21 Dec departure, and P20 162432556 is still 18–19 Nov.
- **NEW** 162877292 P06 Airbnb 24–29 Nov, created 13 Nov 22:20.
- **NEW** 162878135 P11 Booking.com 28 Nov–2 Dec, created 13 Nov 23:20.
- **NEW** 162880151 P11 Booking.com 9–14 Dec, created 14 Nov 05:48.
- **CANCELLED** 162505051 P11 26–29 Nov (`modifiedAt` 13 Nov 11:46:12).
- **Touch only:** P04 161276416 (14–18 Nov), `modifiedAt` 13 Nov 18:14:12, no field changed.
- These match the Dispatcher's `reservations.csv` diff (14 Nov vs 13 Nov) exactly.

### Booked vs market, next 30 / next 60
Booked figures are Smoobu at 14 Nov 07:19Z. Market figures are kpi_pack `market_occ_30/60`.

| Ref | Booked next 30 (bk/n) | Mkt 30 | Booked next 60 (bk/n) | Mkt 60 | kpi_pack fwd30 (PriceLabs) |
|---|---|---|---|---|---|
| P01 | 100% (16/16 non-blocked; 14 blocked) | 36% | 100% (16/16 to handback; 21 blocked) | 29% | 51.7% (incl. blocks) |
| P04 | 46.7% (14/30) | 25% | 45.0% (27/60) | 20% | 44.8% |
| P05 | 70.0% (21/30) | 45% | 65.0% (39/60) | 39% | 69.0% |
| P06 | **62.5%** (10/16 non-blocked; 14 blocked) | 50% | 10/16 (44 blocked) | 41% | 31.0% (stale: the 24–29 Nov booking is not in PriceLabs) |
| P08 | handed back (last night 13 Nov) | 53% | — | 43% | null |
| P09 | 100% (13/13 to handback 26 Nov) | 39% | same | 32% | 100% |
| P10 | 100% (5/5 to handback 18 Nov) | 32% | same | 26% | 100% |
| P11 | **60.0%** (18/30) | 50% | 50.0% (30/60) | 39% | 58.6% (stale: both new bookings are not in PriceLabs) |
| P12 | 46.7% (14/30, to handback 13 Dec) | 43% | same | 34% | 44.8% |
| P13 (one flat) | 76.7% (23/30) | 46% | 50.0% (30/60) | 38% | 75.9% |
| P14 (special setup, numbers only) | 0% (0/30) | 48% | 0% (0/60) | 38% | 0% |
| P20 | 64.3% (18/28; 18–19 Nov blocked) | 39% | 43.1% (25/58) | 30% | 62.1% |

**PriceLabs has not registered the overnight bookings.**
- **P11:** live `get_listing_prices` 3064196 (14 Nov; `last_refreshed_at` 13 Nov 10:47:05Z) shows 26 Nov–4 Dec and 8–18 Dec all open (`booking_status` ""). So the 26–29 Nov cancellation is in, but 28 Nov–1 Dec and 9–13 Dec are not shown as booked.
- **P06:** raw `prices_3288517.json` (refreshed 13 Nov 09:07:38Z) now shows 22–29 Nov open, so the block change is in. The 24–28 Nov booking is not.
- **Smoobu is the source for every forward figure here.**

### 7-day pickup, net of cancellations (bookings made 8–14 Nov, to 07:19Z)
**Sources:** Smoobu `created-at`, and `modifiedAt` for cancellations. No imported past stays fall in the window.

- **Gross made:** 7 bookings / 35 n / £7,803.06.
- **Still confirmed:** 4 / 20 n / £5,440.89 (P05 £2,962.17, P06 £1,009.82, P11 £1,468.90). This equals the kpi_pack `pickup_7d` sum.
- **Cancelled in window:** 6 / 23 n / £4,277.28.
- **Net: +12 n / +£3,525.78.** Yesterday (7–13 Nov) it was +16 n / +£4,069.60.
- **Reconciliation:**
  - 7 Nov left the window: P09 7–11 Nov, P20 6–14 Dec, P13 7–10 Dec = −15 n / −£2,342.14.
  - New bookings: +14 n / +£2,478.72.
  - P11 cancellation: −3 n / −£680.40.

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P05 | 1 / 6 / £2,962.17 (15–21 Dec) | — | +6 / +£2,962.17 |
| **P06** | **1 / 5 / £1,009.82 (24–29 Nov, made 13 Nov)** | — | **+5 / +£1,009.82** |
| **P11** | 3 / 16 / £2,481.76 (**28 Nov–2 Dec £605.29**; **9–14 Dec £863.61**; 8–15 Dec made and cancelled £1,012.86) | 8–15 Dec 7 / £1,012.86; **26–29 Nov 3 / £680.40 (booked 3 Nov)** | **+6 / +£788.50** |
| P13 | 1 / 4 / £710.77 (11–15 Dec, made and cancelled) | 4 / £710.77 | 0 / £0 |
| P20 | 1 / 4 / £638.54 (21–25 Nov, made and cancelled) | 4 / £638.54 | 0 / £0 |
| P12 | 0 | 11–13 Dec 2 / £513.81 (booked 5 Nov) | −2 / −£513.81 |
| P01 | 0 | 18–21 Dec 3 / £720.90 (booked 19 Oct) | −3 / −£720.90 |
| P02, P04, P07, P08, P09, P10, P14 | 0 | — | 0 |

**Paid vs Smoobu on the three new bookings.** Smoobu prices are those at 14 Nov 07:19Z. PriceLabs last pushed P06 at 13 Nov 09:07Z and P11 at 13 Nov 10:47Z, both before the bookings, so these were very likely the prices at booking. Smoobu has no price history to prove it.
- **P11 28 Nov–2 Dec** (4 n; booked 13 Nov 23:20; 15 days out):
  - Smoobu 260 + 188 + 170 + 176 = £794.
  - Paid room £605.29 = **0.762× Smoobu**, or **0.693× Smoobu ×1.10** (the Booking.com markup, £873.40).
  - Commission £135.77 = 18.0% of room + £149 cleaning. That is the Camden Visibility Booster (18%, check-ins 1 Nov–18 Dec, policy), so it is expected.
  - 28 Nov was £292 in Smoobu at 13 Nov 07:20Z. It fell to £260 after the 10:47Z push.
- **P11 9–14 Dec** (5 n; booked 14 Nov 05:48; 25 days out):
  - Smoobu 197 + 220 + 263 + 266 + 186 = £1,132.
  - Paid room £863.61 = **0.763× Smoobu**, or **0.694× Smoobu ×1.10** (£1,245.20).
  - Commission £182.27 = 18.0% of room + £149, which is the booster again.
- **a-p11-bcom-stack:** both bookings paid the same ratio (0.762–0.763× Smoobu). Policy says stacked promotions explain a Booking.com rate below 1.2× price, so report the size, not a leak: **30.7% / 30.6% below the ×1.10 list.**
  - One candidate stack is ×1.10 × Mobile 10% × Genius L1 10% × Last Minute 10% × occupancy −5%. It gives £604.87 and £862.36, which is £0.42 and £1.25 off the paid amounts, so it is not exact.
  - The real breakdown is NOT CHECKED (no extranet reservation screenshot).
  - The ×1.10 Booking.com list was not seen on Booking.com (channel checks).
- **P06 24–29 Nov Airbnb** (5 n; booked 13 Nov 22:20; 11 days out):
  - Smoobu 291 + 293 + 303 + 338 + 328 = £1,553 (after the 09:07Z PriceLabs push; the same nights were £1,906 at 13 Nov 07:20Z).
  - Paid room £1,009.82 = **0.650× Smoobu** (0.530× the 13 Nov 07:20Z prices).
  - £1,553 × 0.765 × 0.85 = £1,009.84, a 2p match. The 0.85 would fit Airbnb's last-minute 15% (0–14 days).
  - The LOS 5+ −8% reading does not fit: £1,553 × 0.765 × 0.92 = £1,092.98.
  - P06's Smoobu Airbnb pricing rules are not in policy (only Shepherd's Bush's are), so the 0.765 layer is NOT CHECKED. Policy says a gap after 21 Oct beyond the 15%/20% stay discounts is unexplained. It goes to the channel analyst.
  - Commission £176.52 = 15.5% of room + £129 cleaning.

### Pace vs STLY (stays from 14 Nov; cancelled bookings excluded on both sides)
**P12** (kpi_pack `pace_30` / `pace_90`):

| P12 measure | 13 Nov | 14 Nov |
|---|---|---|
| Pace30 = to handback (stays 14 Nov–13 Dec) | −12 n / −£1,651.49 / −36.5% (to 12 Dec) | **14 n / £2,874.74 vs 26 n / £4,621.27 = −12 n / −£1,746.53 / −37.8%** |
| Pace90 (stays 14 Nov–11 Feb; nothing after 13 Dec is inventory) | −28 n / −64.5% | 14 n / £2,874.74 vs 41 n / £7,999.30 = −27 n / −£5,124.56 / −64.1% |

No new P12 booking or cancellation. The move is the window rolling forward one day. Today the pace30 window ends exactly on the 13 Dec handback.

**Every other unit: pace UNKNOWN.** The kpi_pack shows STLY 0 because the Smoobu history starts after the STLY as-of date of 14 Nov 2025. First `booked_on` in `data/snapshots/2026-11-14/reservations.csv`: P11 9 Dec 2025, P13 11 Dec 2025, the rest 2026. P02 STLY 6 n / £577.88 vs 0 on the books, but it is blocked on purpose and not assessed.
- **On the books, stays 14 Nov–13 Dec** (kpi_pack `pace_30`):
  - From the kpi_pack: P01 16 n / £2,434.08; P05 21 / £10,672.46; P09 13 / £1,359.11; P10 5 / £529.82; P13 23 / £3,509.62; P20 18 / £3,236.90.
  - P06 10 / £2,046.94 and P11 18 / £3,472.23 are on `reservations.csv`, so both include the new stays.
  - P04: UNKNOWN in the pack.
- **Not used:** PriceLabs `booking_status_STLY` / `ADR_STLY`. For example, P11 10–13 Dec 2025 shows "Booked" at £117, booked 9 Dec 2025. That is a booking made inside the window, not an as-of-STLY figure.

### 18 Oct base rises: running effect (same method)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 14 Nov 07:19Z pull (`occ14/rise.py`).

**Raised group (P01, P05, P06, P09, P11, P12): +23 n / +£6,543.91 incl. P06.** Yesterday: +12 / +£4,745.59.
- **Like-for-like, excluding both P06 stays on the reopened nights, +14 n / +£4,677.30.** Yesterday: +8 / +£3,888.80.
  - The excluded stays are 18–22 Nov (opened 5 Nov, 4 n / £856.79) and the new 24–29 Nov (opened 12 Nov, 5 n / £1,009.82).
  - If only 18–22 Nov is excluded, as yesterday, the figure is +19 / +£5,687.12.
- **Day-on-day:** P06 +5 / +£1,009.82 (new stay); P11 +6 / +£788.50 (two new stays +9 / +£1,468.90, one cancellation −3 / −£680.40).
- Made: 26 / 97 n / £21,179.23. Cancelled: 13 / 74 n / £14,635.32.

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | 1 / 3 / £720.90 | 0 / £0 |
| P05 | 3 / 12 / £4,915.21 | — | +12 / +£4,915.21 |
| P06 | 4 / 15 / £3,212.38 | — | +15 / +£3,212.38 (like-for-like +6 / +£1,345.77) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 (booked before the rise) | −3 / −£244.70 |
| P11 | 8 / 29 / £5,300.40 | 5 / 34 / £6,867.17 | **−5 / −£1,566.77** (was −11 / −£2,355.27) |
| P12 | 8 / 32 / £6,414.44 | 6 / 28 / £6,186.65 | +4 / +£227.79 |

**Comparison groups (unchanged):** unraised (P02, P08, P10, P14, P20) +44 n / +£7,640.04; P13 +19 / +£3,394.96; P04 +46 / +£1,625.79.

**What this means:** P05 is still most of the like-for-like gain. Without P05 the raised group is +2 n / −£237.91 (yesterday −4 / −£1,026.41). The caveats are unchanged:
- The rise cannot be separated from the 24 Oct and 12 Nov Booking.com markup changes, the Booking.com promotions, Reyhan's overrides or the P06 block changes.
- The sample is 1–8 bookings per property.

### Per-property table
**Column sources:**
- Occ30, ADR30, RevPAR30: kpi_pack `last30`, 15 Oct–13 Nov.
- Fwd occ30: Smoobu, 14 Nov–13 Dec, handback-aware (market in brackets).
- Pace30: stays 14 Nov–13 Dec.
- Pickup 7d: made 8–14 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net (n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £157.56 | £157.56 | 100% of 16 non-blocked (36%) | UNKNOWN: no STLY | −3 / −£720.90 | **Compressed** (0 open nights to handback) |
| P02 | Ladbroke Grove | 43.3% | £98.85 | £42.83 | all blocked (52%) | not assessed (policy block) | 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (56%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: kpi_pack null | UNKNOWN | UNKNOWN | 46.7% (25%) | UNKNOWN: no history | 0 / £0 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 80.0% | £373.86 | £299.09 | 70.0% (45%) | UNKNOWN: no STLY | +6 / +£2,962.17 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 73.3% | £199.48 | £146.28 | **62.5%** of 16 non-blocked (50%) | UNKNOWN: no STLY | +5 / +£1,009.82 | Unclassifiable (60–85%, no STLY); **was Soft**. The move is the new 24–29 Nov stay |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (28%) | UNKNOWN | 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 86.7% | £143.40 | £124.28 | handed back after 13 Nov (53%) | — | 0 / £0 | Not classified: no inventory (handed back) |
| P09 | Greenwich | 50.0% | £118.39 | £59.19 | 100% to 26 Nov (39%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 93.3% | £107.06 | £99.93 | 100% to 18 Nov (32%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P11 | Camden | 70.0% | £167.55 | £117.28 | **60.0%** (50%) | UNKNOWN: no STLY | +6 / +£788.50 | Unclassifiable (exactly 60.0%, no STLY); **was Soft**, now on the line |
| P12 | Mile End | 73.3% | £165.45 | £121.33 | 46.7% to handback (43%) | **−12 n / −£1,746.53 / −37.8%** | −2 / −£513.81 | **Soft** (pace and fwd30) |
| P13 | Shepherd's Bush (one flat) | 60.0% | £153.47 | £92.08 | 76.7% (46%) | UNKNOWN: no STLY | 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% (48%) | UNKNOWN: no STLY | 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 66.7% | £169.66* | £113.10* | 64.3% of 28 non-blocked (39%) | UNKNOWN: no STLY | 0 / £0 | Unclassifiable (60–85%, no STLY) |

\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`), so ADR30 and RevPAR30 read low.

**Classes:**
- Compressed 3: P01, P09, P10.
- On track 0.
- Soft 3: P04, P12, P14.
- Unclassifiable 10: P05, **P06**, **P11**, P13, P20, P15–P19.
- Not classified 4: blocked by policy P02, P03, P07; P08 handed back.

**Last 365 nights** (kpi_pack `last365`, 14 Nov 2025–13 Nov 2026; occ / ADR / RevPAR / revenue):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 42.2% | £175.68 | £74.12 | £27,055.45 |
| P02 | 79.7% | £128.59 | £102.52 | £37,418.99 |
| P05 | 59.7% | £372.66 | £222.58 | £81,240.11 |
| P06 | 37.3% | £235.66 | £87.81 | £32,049.67 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 41.9% | £172.44 | £72.28 | £26,382.63 |
| P09 | 40.5% | £115.01 | £46.64 | £17,022.13 |
| P10 | 41.4% | £113.69 | £47.03 | £17,166.73 |
| P11 | 79.2% | £173.75 | £137.57 | £50,214.31 |
| P12 | 81.4% | £192.11 | £156.32 | £57,057.23 |
| P13 | 79.2% | £158.18 | £125.25 | £45,715.33 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 (short history) | 6.8% | £166.63 | £11.41 | £4,165.78 |

P03, P04 and P15–P19: UNKNOWN.

**Booking profile** (kpi_pack `booking_profile`; bookings / median lead / median stay / channel revenue share):

| Ref | Bookings | Median lead | Median stay | Channel revenue share |
|---|---|---|---|---|
| P01 | 20 | 15 d | 5 n | Airbnb 79.9%, Website 13.3%, Booking.com 6.8% |
| P02 | 71 | 34 d | 4 n | Airbnb 53.8%, Booking.com 43.0%, Direct 3.2% |
| P04 | 4 | 8 d | 4 n | Booking.com 51.1%, Airbnb 48.9% |
| P05 | 62 | 44 d | 4 n | Airbnb 100% |
| P06 | **34** | 14 d | 4 n | Airbnb **74.4%**, Booking.com **25.6%** |
| P07 | 5 | 3 d | 4 n | Airbnb 100% |
| P08 | 22 | 15 d | 6 n | Airbnb 77.3%, Booking.com 22.7% |
| P09 | 25 | 18 d | 5 n | Airbnb 57.3%, Booking.com 41.2%, Direct 1.5% |
| P10 | 22 | 12 d | 5 n | Airbnb 69.3%, Booking.com 27.6%, Website 3.1% |
| P11 | **73** | 28 d | 4 n | Booking.com **54.6%**, Airbnb **43.5%**, Agoda 1.9% |
| P12 | 81 | 31 d | 4 n | Booking.com 89.6%, Airbnb 10.4% |
| P13 | 85 | 21 d | 3 n | Booking.com 52.0%, Airbnb 47.2%, Agoda 0.9% |
| P14 | 1 | 57 d | 10 n | Airbnb 100% |
| P20 | 8 | 8 d | 7 n | Airbnb 100% |

### Orphan gaps, next 60 (Smoobu `/api/rates` 14 Nov 07:19Z; P13 as one calendar; handbacks respected)
An orphan is an open night that no stay can cover, given the min stay on each arrival night and the bookings, blocks or handback around it. All units were checked by script (`occ14/orph.py`).

| Ref | Night(s) | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| **P06** | **29 Nov, NEW** | £274 / 4 | The new 24–29 Nov stay checks out and block 143402691 starts 30 Nov. | Created by the 13 Nov booking. kpi_pack `gaps` flags it too (29 Nov, 1 n, min 4). P06 is an intentional-block listing; this night is open, not blocked. |
| **P11** | **8 Dec, NEW** | £202 / 3 | The 5–8 Dec stay checks out and the new 9–14 Dec stay arrives the next day. | Created by the 14 Nov booking. kpi_pack `gaps` flags it too. PriceLabs (not yet refreshed) still shows 8–18 Dec open. |
| **P20** | **5 Dec** | £306 / 3 (was £313) | The 25 Nov–5 Dec stay checks out and the 6–14 Dec stay arrives the next day. | **t-p20-5dec-orphan: NOT FIXED.** Raw `prices_3547481.json` (refreshed 13 Nov 09:07:52Z): min 3, **unbookable 1**. |

**Re-checked as asked:**
- **P06 22–23 Nov: not an orphan, but only one stay fits.** It is a 2-night run (£282 min 2 / £290 min 3) between the stay that checks out 22 Nov and the 24 Nov arrival. Only a 22–24 Nov 2-night stay can sell it, because 23 Nov needs 3 nights.
- **P11 26–27 Nov: not an orphan.** The cancellation reopened them, and they join 22–25 Nov as a 6-night run, 22–27 Nov (£184–261, min 3), ending at the 28 Nov arrival.
- **P11 14–15+ Dec: not an orphan.** 14–18 Dec is a 5-night run (£201 / £209 / £216 / £233 / £282, min 3), ending at the 19 Dec arrival (157014486).
- **P11 2–4 Dec:** an exact 3-night run at min 3 (£192 / £211 / £259), so it fits, but only a 2–5 Dec stay can sell it.
- **Lapsed overnight:** P04 13 Nov (yesterday's orphan) passed unsold. P12 13 Nov also passed unsold.
- **Single nights at min 1 (bookable, not orphans):**
  - P12 26 Nov (£306).
  - P13 17 Nov (£242 / £229), 27 Nov (£304 / £289) and 1 Dec (£276 / £220).
  - P05 21 Dec (£2,073) and 29 Dec (£2,647).
  - P04 2 Dec (£410; policy-deprioritised).
- **No other orphans.**

### P11 darts nights (13–17 Dec)
- **13 Dec is now sold, inside the 9–14 Dec booking.**
  - That stay's room rate is **£863.61 / 5 = £172.72 per night**. Smoobu does not split it by night.
  - The 13 Dec Smoobu price is £186, the lowest of the five stay nights. The Booking.com list would be £204.60 at ×1.10 (not seen on Booking.com).
  - Pro rata at the booking's 0.763 ratio, 13 Dec earned about £141.90. That figure is arithmetic on the booking, not a Smoobu field.
- **Policy decision (21 Oct): "average above £300/night".** 13 Dec sold well under it.
- **The remaining darts nights 14–17 Dec are open** at Smoobu £201 / £209 / £216 / £233 = **average £214.75**. The full 13–17 Dec Smoobu average is £209.00, unchanged from yesterday.
- **PriceLabs** live (14 Nov) `price` is the same as Smoobu. `user_price` is 186 / 201 / 209 / 216 / 233 for 13–17 Dec.
- Policy also says to leave Reyhan's 23 Oct darts override as it is. So this is reported as a conflict for Corentin, not a proposal.

### Gaps to fill (open nights next 30, 14 Nov–13 Dec, Smoobu 14 Nov 07:19Z)
- **P04:** 18–24 Nov (£148–157, min 3); 2 Dec (£410, min 1, policy); 6–13 Dec (£161–173, min 3; the run continues to 19 Dec).
- **P05:** 16–17 Nov (£380 / £394, min 2); 29 Nov–2 Dec (£492–514, min 3); 7–8 Dec (£471 / £448, min 2); 13 Dec (£496, min 2; runs into 14 Dec).
- **P06:** 15–17 Nov (£210–216, min 2); 22–23 Nov (£282 / £290); 29 Nov (orphan).
- **P11:** 18–19 Nov (£143 / £166, min 2); 22–27 Nov (£184–261, min 3); 2–4 Dec (£192–259, min 3); 8 Dec (orphan). 14–18 Dec is beyond the window.
- **P12:** 17–20 Nov (£269–322, min 2); 26 Nov (£306, min 1); 30 Nov–3 Dec (£252–275, min 2); 7–13 Dec (£249–323, min 3; to the 13 Dec handback).
- **P13:** 17 Nov, 27 Nov and 1 Dec (min 1); 10–13 Dec (£247–263 / £187–211, min 3; the run continues to 26 Dec).
- **P14:** all 30 nights at £450–472 (special setup, numbers only).
- **P20:** 14–17 Nov (£282 / £244 / £232 / £238, min 3/3/2/2; 14 Nov is tonight); 20–24 Nov (£212–246); 5 Dec (orphan).
- **P01, P09, P10:** none. P08 is handed back.

### Conflicts for Corentin (Smoobu state or Reyhan's edits vs standing decisions; not new proposals)
1. **P11 darts nights.** The 21 Oct decision is "average above £300/night".
   - 13 Dec sold within a stay averaging £172.72/n room (Smoobu list £186).
   - 14–17 Dec are open at an average of £214.75.
   - Reyhan's override stands, per the 24 Oct note.
2. **P06 Marylebone (intentional-block listing).** The 12 Nov block change has now taken a booking: 24–29 Nov, 5 n, £1,009.82 room.
   - It also left a min-4 orphan on 29 Nov, and 22–23 Nov is sellable only as a 2-night stay.
   - Who reopened the nights and why is UNKNOWN (t-p06-2229open).
3. **P20 delivery.** Policy says the delivery block is 20–22 Nov. Smoobu blocks only 18–19 Nov (162432556, unchanged), and 20–22 Nov are open.
4. **P01 18–20 Dec.** The gap block (160657036) still runs to the 20 Dec handback. Policy says the block runs to 17 Dec.
5. **P04 min stay** (policy: never fewer than 3). The 13 Nov min-2 orphan lapsed unsold. 18–24 Nov is back at min 3.

**PriceLabs changes since 13 Nov** (`get_user_logs`, listing, 13–14 Nov): **0 entries.**

Data gaps:
- **PriceLabs does not hold the overnight bookings.** P11 3064196 was last refreshed 13 Nov 10:47Z (live check 14 Nov) and P06 3288517 13 Nov 09:07Z.
  - As a result, kpi_pack `forward_occ_30` is stale for P06 (31.0%) and P11 (58.6%). Smoobu is the source used here.
  - kpi_pack `gaps` nonetheless catches both new orphans, because it reads `reservations.csv`.
- **P06 block change:** who reopened 22–29 Nov and why: UNKNOWN (no Smoobu field; no `get_user_logs` entry).
- **P06's Smoobu Airbnb pricing rules:** NOT CHECKED. They are not in policy, so the 0.650× paid-vs-Smoobu on the 24–29 Nov stay cannot be decomposed.
- **P11 Booking.com promotion breakdown on the two new bookings:** NOT CHECKED. The ×1.10 Booking.com list price was not seen on Booking.com.
- **Smoobu prices at the moment of booking:** not recorded. Smoobu has no price history, so the 14 Nov 07:19Z values are used, after the last PriceLabs push for each unit.
- **STLY history for every unit except P12,** so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20. PriceLabs `booking_status_STLY` / `ADR_STLY` exist on price rows but are not an as-of-STLY measure and are not used.
- **Reasons NOT KNOWN:** P01 gap block to 21 Dec; P20 block 18–19 Nov vs the 20–22 Nov delivery in policy.
- **Smoobu time zones:** `created-at` / `modifiedAt` time zone not stated.
- **Not in the data:**
  - P03 is not in Smoobu.
  - P04 last-30 / last-365 are null in kpi_pack.
  - P08 `forward_occ_30` is null (handed back).
  - P15–P19 are not mapped.
- **Market and comps inputs:** `market.csv`, `comps.csv` and `channel_checks.csv` are empty in the 14 Nov kpi_pack (`missing`), so there is no ARI or RGI.
- **Revenue scope:**
  - P20 18–22 Oct revenue was paid separately and is not in Smoobu.
  - `total_gbp` excludes cleaning, so all revenue is room only.
