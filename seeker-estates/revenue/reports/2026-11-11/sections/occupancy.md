## Occupancy & performance

**Portfolio, last 30 nights (12 Oct–10 Nov 2026), the 13 units with Smoobu history (P01, P02, P05–P14, P20):** 247 n, £41,822.67, occupancy 63.3%, ADR £169.32, RevPAR £107.24 (`reports/2026-11-11/kpi_pack.json` `portfolio_last30`). Revenue is Smoobu basePrice: room only, cleaning excluded. Yesterday (11 Oct–9 Nov): 250 n / 64.1% / £170.06 / £109.01.

**Last 365 nights (11 Nov 2025–10 Nov 2026):** 2,187 n, £401,996.36, occupancy 46.1%, ADR £183.81, RevPAR £84.72 (kpi_pack `portfolio_last365`). Most Smoobu history starts in 2026, so this understates a full year.

**Booked next 30 nights (11 Nov–10 Dec): 158 of 261 non-blocked nights = 60.5%.** Yesterday (10 Nov–9 Dec): 164/265 = 61.9%.
- **Next 60 (11 Nov–9 Jan):** 224/444 = 50.5%. Yesterday: 231/452 = 51.1%.
- **Source:** live Smoobu GET `/api/reservations` (901 records incl. cancellations and blocks; guest fields dropped) and `/api/rates`, both pulled 11 Nov 07:18:15Z. Saved to scratch `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ11/smoobu_res.json` and `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ11/smoobu_rates.json`. The two endpoints agree on every unit-night for the next 60 (0 mismatches; P13 is read as one calendar).
- **Excluded from the counts:**
  - P02, P03 and P07, which are blocked on purpose (policy).
  - Every night after a handback: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - Blocked nights:
    - P01 30 Nov–20 Dec (see below: **the block now runs to 20 Dec**)
    - P06 from 22 Nov (policy)
    - P20 18–19 Nov
    - P09 11 Nov (reason NOT KNOWN)
    - P11 11–13 Nov (162775668, reason NOT KNOWN)
- **Smoobu as truth vs kpi_pack:** kpi_pack `forward_occ_30` for **P20 is 69.0% (74.1% ex blocks)**. It still counts the cancelled 21–24 Nov nights as booked: `raw/prices_3547481` was refreshed 10 Nov 09:27:29Z and shows them "Booked". Smoobu says 17/28 = **60.7%**.
  - kpi_pack `pace_30` on-the-books equals Smoobu for every unit: P01 19, P05 22, P06 7, P08 3, P09 14, P10 8, P11 15, P12 15, P13 24, P20 17. So the cancellations are already out of pace and pickup.

### Overnight changes
**P11 Camden Booking.com, 8–15 Dec (7 n), NEW.** Smoobu 162798595, created 10 Nov 17:26 Smoobu time, 28 days before arrival. Room £1,012.86 (ADR £144.69), commission £209.13. Booking.com total £1,161.86, including the £149 element outside the nightly rates.
- **Occupancy effect:** it fills 8–14 Dec. P11 next 60 is 31/57 = 54.4% (was 24/56 = 42.9%). Next 30 is 15/27 = 55.6% (was 46.2%), because 8–10 Dec fall inside the window.
- **Orphans it leaves:** none.
  - 5–7 Dec (161640886) checks out on 8 Dec, the day this stay arrives: a clean changeover.
  - 15–18 Dec is a 4-night run (£201/£211/£234/£288, min 3) up to the 19 Dec arrival, so it fits.
  - 3 Jan opens a run of 7+ nights (3–9 Jan, £174–208, min 3), so it is not an orphan.
- **Timing hint:** PriceLabs `raw/prices_3064196`, refreshed 10 Nov 16:28:54Z, already shows the stay booked (ADR 120.58). So "17:26 Smoobu time" was before 16:29Z, which fits Smoobu time = UTC+1. Still not verified.
- **Price not pushed:** that refresh has not been pushed; the last push was 10 Nov 09:27:10Z. kpi_pack: "20 nights differ by more than £2". The pricelabs section owns this.

**P20 Waterford Court Airbnb, 21–25 Nov (162781746, £638.54), CANCELLED** 11 Nov 04:37:07 Smoobu time.
- **Open now (Smoobu `/api/rates` 07:18Z):** **20–24 Nov, a 5-night run.**
  - 20 Nov £234, min 3
  - 21 Nov £301, min 3
  - 22 Nov £247, min 2
  - 23 Nov £294, min 2
  - 24 Nov £279, min 2
  - 21–24 Nov sum £1,121, against the £638.54 the cancelled booking paid.
- **No orphan:** 20 Nov is no longer an orphan, because a 3-night stay from 20 Nov fits. 25 Nov is the arrival of 161733361.
- **PriceLabs is stale:** `raw/prices_3547481` still shows 20 Nov "unbookable 1" and 21–24 Nov "Booked". It was refreshed 10 Nov 09:27:29Z, before the cancellation.
- **t-p20-delivery is still open, for Corentin to confirm.** Policy `listing_facts.P20.block_20_21_nov` says the delivery block is 20–22 Nov. Smoobu blocks only 18–19 Nov (162432556), and **20–22 Nov are now open for sale**. The booking that sold those nights is gone, but the mismatch between the dates is not.

**P01 Bowsprit Point Airbnb, 18–21 Dec (160573351, £720.90, booked 19 Oct), CANCELLED** 10 Nov 14:40:51 Smoobu time.
- **Open now: nothing.** At 14:41:27, 36 seconds after the cancellation, the gap block **160657036 was modified from 30 Nov–18 Dec to 30 Nov–21 Dec**. 18–20 Dec are now "Blocked channel" up to the 20 Dec handback (Smoobu `available 0`; PriceLabs `raw/prices_3320302`, refreshed 11 Nov 04:47:55Z, shows "Blocked").
  - My 10 Nov pull showed this block's departure as 18 Dec.
  - Policy `handbacks.P01.gap_block` says the block is 30 Nov–17 Dec.
  - Policy also says "before the date, maximise revenue normally".
  - **Whether closing 18–20 Dec was intended is NOT KNOWN, for Corentin to confirm.** Smoobu prices on those nights are £284 / £279 / £243, min 3.
- **P01 next 30 is 19/19 = 100% of non-blocked nights.** It has 0 open nights to the handback.

### Booked vs market, next 30 / next 60
Booked figures are Smoobu at 11 Nov 07:18Z. Market figures are kpi_pack `market_occ_30/60`.

| Ref | Booked next 30 (bk/n) | Mkt 30 | Booked next 60 (bk/n) | Mkt 60 | kpi_pack fwd30 (PriceLabs) |
|---|---|---|---|---|---|
| P01 | 100% (19/19 non-blocked; 11 blocked) | 35% | 100% (19/19 to handback; 21 blocked) | 29% | 62.1% (100% ex blocks) |
| P04 | 46.7% (14/30) | 24% | 45.0% (27/60) | 21% | 48.3% |
| P05 | 73.3% (22/30) | 43% | 70.0% (42/60) | 39% | 72.4% |
| P06 | 63.6% of 11 non-blocked (7/11; 19 blocked by policy) | 49% | 7/11 (49 blocked) | 42% | 24.1% (69.9% ex blocks) |
| P08 | 100% (3/3 to handback 13 Nov) | 51% | same | 43% | 100% |
| P09 | 93.3% (14/15 non-blocked to handback 26 Nov) | 38% | same | 32% | 93.3% |
| P10 | 100% (8/8 to handback 18 Nov) | 31% | same | 25% | 100% |
| P11 | 55.6% (15/27; 11–13 Nov blocked) | 49% | 54.4% (31/57) | 39% | 51.7% (55.5% ex blocks) |
| P12 | 50.0% (15/30) | 42% | 45.5% (15/33 to handback 13 Dec) | 34% | 48.3% |
| P13 (one flat) | 80.0% (24/30) | 43% | 51.7% (31/60) | 37% | 82.8% |
| P14 (special setup, numbers only) | 0% (0/30) | 46% | 0% (0/60) | 38% | 0% |
| P20 | **60.7%** (17/28; 18–19 Nov blocked) | 38% | 46.6% (27/58) | 30% | 69.0%: still counts the cancelled 21–24 Nov |

### 7-day pickup, net of cancellations (bookings made 5–11 Nov, to 07:18Z)
**Sources:** Smoobu `created-at`, and `modifiedAt` for cancellations. No imported past stays fall in the window.

**Totals:**
- **Gross made:** 12 bookings / 57 n / £12,060.60. Still confirmed: 8 / 42 n / £9,279.75, which equals the kpi_pack `pickup_7d` sum.
- **Cancelled in the window:** 7 bookings / 31 n / £5,434.79.
- **Net: +26 n / +£6,625.81.** Yesterday (4–10 Nov) it was +26 n / +£6,972.39.
- **How the change reconciles exactly:** +P11 8–15 Dec (+7 / +£1,012.86), −P01 18–21 Dec cancellation (−3 / −£720.90), −P20 21–25 Nov cancellation (−4 / −£638.54). Nothing dropped out of the window.

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P20 | 3 / 19 / £3,560.79 (21–25 Nov £638.54; 6–14 Dec £1,494.25; 19–26 Dec £1,428.00) | **21–25 Nov 4 / £638.54** | **+15 / +£2,922.25** (was +19 / +£3,560.79) |
| P05 | 1 / 6 / £2,962.17 (15–21 Dec) | — | +6 / +£2,962.17 |
| P11 | **1 / 7 / £1,012.86 (8–15 Dec, NEW)** | — | **+7 / +£1,012.86** |
| P06 | 1 / 4 / £856.79 (18–22 Nov) | — | +4 / +£856.79 |
| P13 | 3 / 12 / £2,113.70 (7–10 Dec £485.20; 11–15 Dec and 20–25 Dec made and cancelled) | 9 / £1,628.50 | +3 / +£485.20 |
| P12 | 2 / 5 / £1,191.60 (4–7 Dec £677.79; 11–13 Dec cancelled) | 3–7 Dec 4 / £1,072.44; 11–13 Dec 2 / £513.81 | −1 / −£394.65 |
| P09 | 1 / 4 / £362.69 (7–11 Nov) | 1–10 Nov 9 / £860.60 | −5 / −£497.91 |
| P01 | 0 | **18–21 Dec 3 / £720.90 (booked 19 Oct)** | **−3 / −£720.90** |
| P02, P04, P07, P08, P10, P14 | 0 | — | 0 |

### Pace vs STLY (stays from 11 Nov; cancelled bookings excluded on both sides)
**P12** (kpi_pack `pace_30` / `pace_90`; the handback row is recomputed with `rm.metrics.on_the_books` on `data/snapshots/2026-11-11/reservations.csv`):

| P12 measure | 10 Nov | 11 Nov |
|---|---|---|
| Pace30 (stays 11 Nov–10 Dec) | −10 n / −£1,194.87 / −27.6% | **15 n / £3,008.01 vs 26 n / £4,336.15 = −11 n / −£1,328.14 / −30.6%** |
| To handback (stays 11 Nov–13 Dec) | −13 n / −£1,788.87 / −36.3% | **15 n / £3,008.01 vs 29 n / £4,930.15 = −14 n / −£1,922.14 / −39.0%** |
| Pace90 (stays 11 Nov–8 Feb; nothing after 13 Dec is inventory) | −25 n / −60.2% | 15 n / £3,008.01 vs 41 n / £7,882.85 = −26 n / −£4,874.84 / −61.8% |

The change from yesterday is 10 Nov, a booked night, passing out of the window: −1 n / −£133.27 (£3,141.28 yesterday minus £3,008.01 today, kpi_pack `pace_30`). There was no new P12 booking or cancellation overnight.

**Every other unit: pace UNKNOWN.** Their first Smoobu arrival is after the STLY as-of date of 11 Nov 2025 (`reservations.csv`: P11 11 Dec 2025, P13 14 Dec 2025, the rest in 2026). P02 has STLY 5 n / £453.88, but it is blocked on purpose, so it is not assessed.
- **Caveat:** `reservations.csv` starts at arrival 11 Nov 2025, so any STLY stay that arrived before then is missing.
- **On the books, stays 11 Nov–10 Dec** (kpi_pack `pace_30`, equal to Smoobu):
  - P01 19 n / £2,890.47
  - P05 22 / £11,050.21
  - P06 7 / £1,397.79
  - P08 3 / £388.23
  - P09 14 / £1,485.71
  - P10 8 / £847.71
  - P11 15 / £3,117.81
  - P13 24 / £3,665.30
  - P20 17 / £3,016.56
  - P04: UNKNOWN in the pack

### 18 Oct base rises: running effect (same corrected method)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 11 Nov 07:18Z pull.

**Raised group (P01, P05, P06, P09, P11, P12): +19 n / +£5,758.45 including P06.** Yesterday it was +15 / +£5,466.49.
- **Like-for-like, excluding P06 18–22 Nov (reopened 5 Nov by the block change): +15 n / +£4,901.66.** Yesterday it was +11 / +£4,609.70.
- **The change is exactly two bookings:** the P11 8–15 Dec stay (+7 / +£1,012.86) and the P01 18–21 Dec cancellation (−3 / −£720.90).
- Made: 23 / 83 n / £18,700.51. Cancelled: 11 / 64 n / £12,942.06.

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | **1 / 3 / £720.90** | **0 / £0** (was +3 / +£720.90; its whole gain is gone) |
| P05 | 3 / 12 / £4,915.21 | — | +12 / +£4,915.21 |
| P06 | 3 / 10 / £2,202.56 | — | +10 / +£2,202.56 (incl. 18–22 Nov reopened, +4 / +£856.79) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 (booked before the rise) | −3 / −£244.70 |
| P11 | **6 / 20 / £3,831.50** | 3 / 24 / £5,173.91 (all booked before the rise) | **−4 / −£1,342.41** (was −11 / −£2,355.27) |
| P12 | 8 / 32 / £6,414.44 | 6 / 28 / £6,186.65 | +4 / +£227.79 |

**The P11 "gain" was sold below the raised price.** The 8–15 Dec stay was made at the raised base (PriceLabs base 286, per kpi_pack settings and policy), but its room paid:
- **0.578×** the PriceLabs price at the 9 Nov 21:22Z refresh (`2026-11-10/raw/prices_3064196`: 227+226+256+313+315+221+195 = £1,753)
- 0.5267× the Booking.com Standard rate (Dispatcher facts)

So the night count credits the rise, but the rate does not reflect it.

**Comparison groups:**
- Unraised (P02, P08, P10, P14, P20): +44 n / +£7,640.04. It was +48 / +£8,278.58; the change is the P20 cancellation.
- P13: +19 n / +£3,394.96, unchanged.
- P04: +46 n / +£1,625.79, unchanged.

**Caveats (unchanged):** the rise cannot be separated from:
- the 24 Oct Booking.com markup cut
- Booking.com promotions (incl. the 15% "Portfolio deals" Last Minute from 6 Nov)
- Reyhan's overrides
- the P06 block change

The sample is small: 1–8 bookings per property.

### P11 13–14 Dec, the darts nights, sold far below the >£300 decision
Policy `price_changes` 21 Oct says: "P11 Camden darts nights 13–17 Dec raised (Corentin); average above £300/night".
- **Sold:** 13 Dec £126.94 + 14 Dec £113.24 = **£240.18 room, £120.09/night.** Per-night figures are the Dispatcher's computation; the 7-night sum of £1,012.86 is exact against Smoobu.
- **Against the decision:** 2 × £300 = £600 floor, so the shortfall is **at least £359.82 (−60%)**. The two nights sold at 40% of the floor: 42.3% and 37.7% of £300.
- **How the PriceLabs price on 13 / 14 Dec moved (`raw/prices_3064196`; 13–17 Dec average in brackets):**

  | Snapshot (PriceLabs refresh) | 13 / 14 Dec | 13–17 Dec avg |
  |---|---|---|
  | 22 Oct (21 Oct 15:49Z, after Corentin's raise) | price 332 / 306 | £322.2, met the decision |
  | 24 Oct (23 Oct 11:12Z) | user_price 299 / 276 | £292.6 |
  | 25 Oct (25 Oct 05:47Z) | 265 / 245 | £259.0 |
  | 10 Nov (9 Nov 21:22Z) | price 221 / 195 | £211.6 |
  | After the booking (10 Nov 16:28Z) | 230 / 205 | — |

- **Paid vs each reference, for the 2 nights:**
  - **0.376×** the 22 Oct price of £638 (−£397.82)
  - 0.577× the PriceLabs price at booking of £416 (−£175.82)
  - 0.679× that price after the policy 15% weekly discount, £353.60 (−£113.42)
  - 0.5267× the Booking.com Standard rate of 241 + 215 = £456 (−£215.82)
- **Override now in force:** `get_listing_date_overrides` (3064196) shows 13–18 Dec at **−3%, min 3, updated 9 Nov 21:21:47Z**. That is Reyhan's 9 Nov 22 Nov–18 Dec edit, set the evening before the booking.
- **Two policy entries conflict with it.** For Corentin to confirm; this is not a new proposal:
  1. The 21 Oct decision, "average above £300/night".
  2. The 24 Oct entry, "leave the darts override as it is (+5% set by Reyhan 23 Oct). Do not re-raise".

  Reyhan's 9 Nov −3% replaced that +5%. The >£300 average had already stopped holding by the 24–25 Oct snapshots.
- **Remaining darts nights, 15–17 Dec, are open:** Smoobu £201 / £211 / £234 (average £215.33), min 3, inside the 15–18 Dec run.

### Per-property table
**Column sources:**
- **Occ30, ADR30, RevPAR30:** kpi_pack `last30`, 12 Oct–10 Nov.
- **Fwd occ30:** Smoobu, 11 Nov–10 Dec, handback-aware, with market in brackets.
- **Pace30:** stays 11 Nov–10 Dec.
- **Pickup 7d:** made 5–11 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net (n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £158.58 | £158.58 | 100% of 19 non-blocked (35%) | UNKNOWN: no STLY | −3 / −£720.90 | **Compressed** (0 open nights to handback) |
| P02 | Ladbroke Grove | 53.3% | £100.55 | £53.63 | all blocked (50%) | not assessed (policy block) | 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (54%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: kpi_pack null | UNKNOWN | UNKNOWN | 46.7% (24%) | UNKNOWN: no history | 0 / £0 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 70.0% | £368.02 | £257.61 | 73.3% (43%) | UNKNOWN: no STLY | +6 / +£2,962.17 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 76.7% | £202.73 | £155.43 | 63.6% of 11 non-blocked (49%) | UNKNOWN | +4 / +£856.79 | Unclassifiable (60–85%, no STLY); **was Soft** |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (27%) | UNKNOWN | 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 86.7% | £148.03 | £128.29 | 100% to 13 Nov (51%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** (sold out to handback) |
| P09 | Greenwich | 56.7% | £119.02 | £67.44 | 93.3% to 26 Nov (38%) | UNKNOWN: no STLY | −5 / −£497.91 | **Compressed** (≥ 85%) |
| P10 | Ealing / Hanger Lane | 93.3% | £110.36 | £103.00 | 100% to 18 Nov (31%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P11 | Camden | 73.3% | £168.28 | £123.40 | 55.6% of 27 non-blocked (49%) | UNKNOWN: no STLY | +7 / +£1,012.86 | **Soft** (fwd30 < 60%) |
| P12 | Mile End | 76.7% | £170.57 | £130.77 | 50.0% (42%) | **−11 n / −£1,328.14 / −30.6%** | −1 / −£394.65 | **Soft** (pace and fwd30) |
| P13 | Shepherd's Bush (one flat) | 66.7% | £148.04 | £98.70 | 80.0% (43%) | UNKNOWN: no STLY | +3 / +£485.20 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% (46%) | UNKNOWN: no STLY | 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 70.0% | £167.46* | £117.22* | **60.7%** of 28 non-blocked (38%) | UNKNOWN: no STLY | +15 / +£2,922.25 | Unclassifiable (60–85%, no STLY); 0.7 pts above the Soft line |

\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`), so ADR30 and RevPAR30 read low.

**Classes:**
- Compressed 4: P01, P08, P09, P10.
- On track 0.
- Soft 4: P04, P11, P12, P14.
- Unclassifiable 9: P05, P06, P13, P20, P15–P19.
- Blocked by policy 3: P02, P03, P07.
- **Change from yesterday: P06 moved Soft → Unclassifiable.** Its fwd30 went from 58.3% to 63.6%: the unsold 10 Nov left the window, and the denominator is now 11 non-blocked nights.
- P11 stays Soft, even though fwd30 rose from 46.2% to 55.6%.

**Last 365 nights** (kpi_pack `last365`, 11 Nov 2025–10 Nov 2026; occ / ADR / RevPAR / revenue):
- P01 41.4% / £176.15 / £72.87 / £26,599.06
- P02 79.7% / £128.59 / £102.52 / £37,418.99
- P05 58.9% / £372.07 / £219.17 / £79,995.86
- P06 36.7% / £236.49 / £86.82 / £31,689.00
- P07 11.5% / £133.90 / £15.41 / £5,623.70
- P08 41.1% / £173.30 / £71.22 / £25,994.40
- P09 40.3% / £114.94 / £46.29 / £16,895.53
- P10 40.5% / £113.84 / £46.16 / £16,848.84
- P11 79.2% / £173.75 / £137.57 / £50,214.31
- P12 81.9% / £191.41 / £156.80 / £57,232.84
- P13 78.9% / £158.19 / £124.82 / £45,559.65
- P14 2.7% / £409.84 / £11.23 / £4,098.40
- P20 6.3% / £166.34 / £10.48 / £3,825.78 (short history)
- P03, P04, P15–P19: UNKNOWN

**Booking profile** (kpi_pack `booking_profile`: bookings / median lead / median stay / channel revenue share):
- P01 20 / 15 d / 5 n: Airbnb 79.9%, Website 13.3%, Booking.com 6.8% (was 21; the cancellation dropped out)
- P02 71 / 34 / 4: Airbnb 53.8%, Booking.com 43.0%, Direct 3.2%
- P04 4 / 8 / 4: Booking.com 51.1%, Airbnb 48.9%
- P05 62 / 44 / 4: Airbnb 100%
- P06 33 / 14 / 4: Airbnb 73.6%, Booking.com 26.4%
- P07 5 / 3 / 4: Airbnb 100%
- P08 22 / 15 / 6: Airbnb 77.3%, Booking.com 22.7%
- P09 25 / 18 / 5: Airbnb 57.3%, Booking.com 41.2%, Direct 1.5%
- P10 22 / 12 / 5: Airbnb 69.3%, Booking.com 27.6%, Website 3.1%
- P11 73 / 28 / 4: Booking.com 54.8%, Airbnb 43.3%, Agoda 1.9% (was 72)
- P12 81 / 31 / 4: Booking.com 89.6%, Airbnb 10.4%
- P13 85 / 21 / 3: Booking.com 52.0%, Airbnb 47.2%, Agoda 0.9%
- P14 1 / 57 / 10: Airbnb 100%
- P20 8 / 8 / 7: Airbnb 100% (was 9 / 8 / 4)

### Orphan gaps, next 60 (Smoobu `/api/rates` 11 Nov 07:18Z; P13 as one calendar; handbacks respected)
An orphan is an open night that no stay can cover, given the min stay on each arrival night and the bookings, blocks or handback around it. All units were checked by script.

| Ref | Night(s) | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| **P09** | **12 Nov (TOMORROW)** | £120 / 2 | It sits between the 11 Nov "Blocked channel" block (162726554, created 7 Nov 18:37, reason NOT KNOWN) and the 13 Nov arrival (161131246). | **NOT FIXED** (t-p09-1112block). There is no P09 entry in `get_user_logs` 10–11 Nov. PriceLabs `raw/prices_3318172` (refreshed 10 Nov 07:27:39Z): user_price 123, min 2, **unbookable 1**. The last chance to act is today. |
| **P06** | **11 Nov (TONIGHT)**, NEW | £200 / 2 | 10 Nov passed unsold, and the 12–15 Nov stay (162228256) arrives tomorrow. | Single night at min 2. It cannot sell as set. |
| **P20** | **5 Dec** | £311 / 3 | The 25 Nov–5 Dec stay checks out and the 6–14 Dec stay arrives the next day. | **NOT FIXED** (t-p20-5dec-orphan). PriceLabs raw: user_price 309, min 3, **unbookable 1**. Still Reyhan's 1–20 Dec min 3. |

**Checked as requested, not orphans now:**
- **P20 20–25 Nov:** now a 5-night open run, 20–24 Nov (£234–301, min 3/3/2/2/2). The old 20 Nov orphan is gone. 25 Nov is an arrival.
- **P01 18–20 Dec:** not open at all; it is blocked to the handback by the extended gap block (see above).
- **P11 8–15 Dec:** booked.
  - 5–7 Dec checks out on 8 Dec, the arrival day: a changeover.
  - 15–18 Dec: 4 n at min 3, fits.
  - 3 Jan starts a run of 7+ nights at min 3.
  - Others that fit: 18–19 Nov (2 n, min 2), 22–25 Nov (4 n, min 3), 29 Nov–4 Dec (6 n, min 3), 23–25 Dec (3 n, min 2).
- **P12 7–13 Dec:** a 7-night run to the handback (£267–334, min 3). That min stay is Reyhan's override, set 10 Nov 16:28:36Z (`get_user_logs`). It fits.
  - Reyhan's other 10 Nov edits: 12–20 Nov +5% min 2, and 30 Nov–3 Dec +5% min 2.
  - 26 Nov stays at min 1 (£287).
- **P05:**
  - 13–14 Dec: 2 n at min 2 (£518 / £505), fits.
  - 21 Dec and 29 Dec: single nights at min 1 (£2,230 / £2,786, from Reyhan's +300% overrides; a-p05-dec). They are bookable as set but unsold.
- **P13:** 17 Nov, 27 Nov and 1 Dec are at min 1 (1 Dec is intentional per policy). 11–12 Nov is 2 n at min 2. 10–26 Dec is a 17-night run.
- **P04:** 2 Dec at min 1 (£459, policy-deprioritised). 11–13 Nov is 3 n at min 3.

### Gaps to fill (open nights next 30, 11 Nov–10 Dec, Smoobu 11 Nov 07:18Z)
- **P09:** 12 Nov (orphan, tomorrow).
- **P06** (min 2): 11 Nov tonight (orphan, £200) and 15–17 Nov (£237–244).
- **P20:** 13–17 Nov (£268–340, min 3/3/3/2/2); **20–24 Nov reopened** (£234–301); 5 Dec (orphan).
- **P05:** 16–17 Nov (£378 / £393, min 2); 29 Nov–2 Dec (£500–515, min 3); 7–8 Dec (£471 / £452, min 2).
- **P04** (min 3): 11–13 Nov (£137–141), 18–24 Nov (£139–150) and 6–10 Dec (£184–189). Also 2 Dec (policy).
- **P11:**
  - 18–19 Nov (£150 / £170, min 2)
  - 22–25 Nov (£201–203, min 3)
  - 29 Nov–4 Dec (£201–319, min 3)
  - 11–13 Nov is blocked, reason NOT KNOWN.
- **P12:**
  - 12–13 Nov (£216 / £269, min 2)
  - 17–20 Nov (£262–299, min 2)
  - 26 Nov (£287, min 1)
  - 30 Nov–3 Dec (£266–291, min 2)
  - 7–10 Dec (£267–291, min 3), and on to 13 Dec at the handback
- **P13:** 11–12 Nov (£200 / £204 and £179 / £182, min 2); 17 Nov, 27 Nov and 1 Dec (min 1); 10 Dec onwards (min 3).
- **P14:** all 30 nights (special setup, numbers only).
- **P01, P08, P10:** none.

**PriceLabs changes since 10 Nov 06:00Z** (`get_user_logs`, listing, 10–11 Nov): 6 entries, all by Reyhan at 10 Nov 16:28Z, all on P12 (Smoobu 2699998 and its Vrbo child):
- 12–20 Nov +5% min 2
- 30 Nov–3 Dec +5% min 2
- 7–13 Dec min 3

There were no edits to P01, P09, P11 or P20.

Data gaps:
- STLY history for every unit except P12, so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20. `reservations.csv` starts at arrival 11 Nov 2025, so STLY stays that arrived earlier are missing.
- Reasons NOT KNOWN for:
  - P01 gap block 160657036, extended to 30 Nov–21 Dec at 10 Nov 14:41:27 Smoobu time (policy says to 17 Dec). Who did it is not known.
  - P09 11 Nov block (162726554), which creates the 12 Nov orphan.
  - P11 10–13 Nov block (162775668).
- P20 delivery dates: policy says 20–22 Nov, Smoobu blocks 18–19 Nov, and 20–22 Nov are now open. Corentin needs to confirm.
- P11 darts nights: the 21 Oct ">£300 average" and 24 Oct "leave +5%" policy entries vs Reyhan's 9 Nov −3% override. Corentin needs to confirm.
- PriceLabs raws predate the cancellations, so kpi_pack P20 `forward_occ_30` 69.0% is overstated vs Smoobu 60.7%:
  - P20 `prices_3547481` was refreshed 10 Nov 09:27Z.
  - P09 `prices_3318172` was refreshed 10 Nov 07:27Z.
- P11 post-booking refresh (16:28:54Z) not pushed; last push 09:27:10Z.
- P11 8–15 Dec: the fifth 10% Booking.com layer and the guest count are NOT CHECKED. Per-night split of 13/14 Dec is computed, not seen.
- Smoobu `created-at` / `modifiedAt` time zone is not stated. The P11 timing fits UTC+1; not verified.
- P03: not in Smoobu. P04: last-30 and last-365 null in kpi_pack. P15–P19: not mapped.
- `market.csv`, `comps.csv` and `channel_checks.csv` were empty when the 11 Nov kpi_pack was built (kpi_pack `missing`), so there is no ARI or RGI.
- P20 18–22 Oct revenue was paid separately and is not in Smoobu. `total_gbp` excludes cleaning, so all revenue is room only.
