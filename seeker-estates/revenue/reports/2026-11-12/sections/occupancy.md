## Occupancy & performance

**Portfolio, last 30 nights (13 Oct–11 Nov 2026), the 13 units with Smoobu history (P01, P02, P05–P14, P20):** 243 n, £41,333.93, occupancy 62.3%, ADR £170.10, RevPAR £105.98 (`reports/2026-11-12/kpi_pack.json` `portfolio_last30`). Revenue is Smoobu basePrice: room only, cleaning excluded. Yesterday (12 Oct–10 Nov) it was 247 n / 63.3% / £169.32 / £107.24.

**Last 365 nights (12 Nov 2025–11 Nov 2026):** 2,192 n, £402,998.92, occupancy 46.2%, ADR £183.85, RevPAR £84.93 (kpi_pack `portfolio_last365`). Most Smoobu history starts in 2026, so this understates a full year.

**Booked next 30 nights (12 Nov–11 Dec): 151 of 258 non-blocked nights = 58.5%.** Yesterday (11 Nov–10 Dec) it was 158/261 = 60.5%.
- **Next 60 (12 Nov–10 Jan):** 211/440 = 48.0%. Yesterday: 224/444 = 50.5%.
- **Source:** live Smoobu GET `/api/reservations` (901 records incl. cancellations and blocks; guest fields dropped) and `/api/rates`, both pulled 12 Nov 07:19:36Z. Saved to scratch `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ12/smoobu_res.json` and `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ12/smoobu_rates.json`.
  - The two endpoints agree on every unit-night for the next 60 (0 mismatches; P13 is read as one calendar).
  - A full-record diff against the 11 Nov 07:18Z pull finds **one change**: P11 162798595 `type` changed to cancellation and its `modifiedAt` moved. There are no new records and none removed.
- **Excluded from the counts:**
  - P02, P03 and P07, which are blocked on purpose (policy).
  - Every night after a handback: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - Blocked nights:
    - P01 30 Nov–20 Dec
    - P06 from 22 Nov (policy)
    - P20 18–19 Nov
    - P11 12–13 Nov (162775668, reason NOT KNOWN)
- **The −7 booked nights vs yesterday:**
  - P11: −3 (8–10 Dec cancelled).
  - −1 each for P01, P08, P10 and P12: a booked 11 Nov passed out of the window and the new 11 Dec is blocked, past the handback or open.

### Overnight change: P11 Camden Booking.com 8–15 Dec CANCELLED
**The record:** Smoobu 162798595, created 10 Nov 17:26, cancelled (`modifiedAt`) **11 Nov 18:03:27** Smoobu time, about 24.6 h after it was made.
- 7 n, 2 adults, room £1,012.86, commission £209.13, Booking.com total £1,161.86 (incl. the £149 cleaning element and VAT £168.81, which is carried inside the base price).

**Who cancelled and why: NOT CHECKED (not in Smoobu).** The reservation record has no cancelled-by or reason field: only `type`, `modifiedAt` and the unchanged price fields. Per the data rules I did not read the `notice` free-text field. The Booking.com extranet was not opened.

**Back on sale?**
- **Smoobu: yes.** `/api/rates` 12 Nov 07:19Z shows 8–18 Dec as **one 11-night open run, min 3**:

  | Night | 8 Dec | 9 Dec | 10 Dec | 11 Dec | 12 Dec | 13 Dec | 14 Dec | 15 Dec | 16 Dec | 17 Dec | 18 Dec |
  |---|---|---|---|---|---|---|---|---|---|---|---|
  | Smoobu price | £261 | £250 | £274 | £329 | £332 | £231 | £208 | £215 | £225 | £246 | £303 |

  - 8–14 Dec sum £1,885, against the £1,012.86 the cancelled stay paid.
  - **Darts nights 13–17 Dec average £225.00** (yesterday 15–17 Dec were £201 / £211 / £234). That is below the 21 Oct ">£300/night" decision (see "Conflicts for Corentin").
- **PriceLabs: still shows it booked.** `raw/prices_3064196`, last_refreshed 11 Nov 15:38:27Z (before the cancellation), still shows 8–14 Dec "Booked", ADR 120.58, booked_date 10 Nov. Its `price` values equal the Smoobu rates above.
  - The last push is still 11 Nov 07:46:49Z (kpi_summary).
- **Booking.com live price for 8–15 Dec: NOT CHECKED.**

**Effects (all recomputed below):**
- **P11 forward occupancy:**
  - Next 30: 12/28 = 42.9% (was 15/27 = 55.6%).
  - Next 60: 24/58 = 41.4% (was 31/57 = 54.4%).
  - kpi_pack `forward_occ_30` 55.2% is overstated: it is 16/29 on 13 Nov–11 Dec and still counts 8–11 Dec from the stale PriceLabs file. Use Smoobu.
- **7-day pickup:** P11 nets 0 / £0 (made and cancelled in the window). It was +7 / +£1,012.86.
- **18 Oct base-rise tally:** P11 is back to **−11 n / −£2,355.27** (was −4 / −£1,342.41).
- **Booking.com bookings created since the 24 Oct cut** (Smoobu `created-at` ≥ 24 Oct 13:38; Smoobu time zone not stated):
  - 22 made; **13 live / 52 n / £8,502.99 room / £1,795.33 commission**; 9 cancelled / 32 n / £5,981.01.
  - Live is down by exactly this stay: −1 / −7 n / −£1,012.86 / −£209.13 commission.
- **t-cleaning-commission:** this stay's £209.13 commission on a £1,161.86 total (which included the £149 cleaning element) is no longer revenue. The channel section owns the total.
- **a-p11-bcom-stack:** the stay that showed the 0.5267× stack is gone, but the stack itself is unchanged as far as Smoobu and PriceLabs show. Booking.com promotion settings: NOT CHECKED.

### Booked vs market, next 30 / next 60
Booked figures are Smoobu at 12 Nov 07:19Z. Market figures are kpi_pack `market_occ_30/60`.

| Ref | Booked next 30 (bk/n) | Mkt 30 | Booked next 60 (bk/n) | Mkt 60 | kpi_pack fwd30 (PriceLabs, 13 Nov–11 Dec) |
|---|---|---|---|---|---|
| P01 | 100% (18/18 non-blocked; 12 blocked) | 35% | 100% (18/18 to handback; 21 blocked) | 28% | 58.6% (100% ex blocks) |
| P04 | 46.7% (14/30) | 24% | 45.0% (27/60) | 20% | 48.3% |
| P05 | 73.3% (22/30) | 43% | 68.3% (41/60) | 39% | 72.4% |
| P06 | 70.0% of 10 non-blocked (7/10; 20 blocked by policy) | 50% | 7/10 (50 blocked) | 42% | 20.7% (66.8% ex blocks) |
| P08 | 100% (2/2 to handback 13 Nov) | 51% | same | 43% | 100% |
| P09 | 93.3% (14/15 to handback 26 Nov) | 38% | same | 32% | 100% (window starts 13 Nov, so excludes the 12 Nov orphan) |
| P10 | 100% (7/7 to handback 18 Nov) | 32% | same | 25% | 100% |
| P11 | **42.9%** (12/28; 12–13 Nov blocked) | 49% | **41.4%** (24/58) | 39% | 55.2%: still counts the cancelled 8–11 Dec |
| P12 | 46.7% (14/30) | 42% | 43.8% (14/32 to handback 13 Dec) | 34% | 48.3% |
| P13 (one flat) | 80.0% (24/30) | 45% | 51.7% (31/60) | 38% | 82.8% |
| P14 (special setup, numbers only) | 0% (0/30) | 46% | 0% (0/60) | 38% | 0% |
| P20 | 60.7% (17/28; 18–19 Nov blocked) | 38% | 44.8% (26/58) | 30% | 55.2% (window excludes the booked 12 Nov) |

### 7-day pickup, net of cancellations (bookings made 6–12 Nov, to 07:19Z)
**Sources:** Smoobu `created-at`, and `modifiedAt` for cancellations. No imported past stays fall in the window.

**Totals:**
- **Gross made:** 10 bookings / 52 n / £10,869.00.
- **Still confirmed:** 6 / 32 n / £7,589.10, which equals the kpi_pack `pickup_7d` sum.
- **Cancelled in the window:** 5 bookings / 25 n / £4,514.61.
- **Net: +27 n / +£6,354.39.** Yesterday (5–11 Nov) it was +26 n / +£6,625.81.
- **How the change reconciles exactly:**
  - −P11 8–15 Dec cancellation (−7 / −£1,012.86).
  - 5 Nov dropped out of the window: P12 made 4–7 Dec and 11–13 Dec (+5 / +£1,191.60); P12 3–7 Dec cancellation (−4 / −£1,072.44); P09 1–10 Nov cancellation (−9 / −£860.60). Net +8 / +£741.44.

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P20 | 3 / 19 / £3,560.79 (21–25 Nov, cancelled; 6–14 Dec £1,494.25; 19–26 Dec £1,428.00) | 21–25 Nov 4 / £638.54 | +15 / +£2,922.25 |
| P05 | 1 / 6 / £2,962.17 (15–21 Dec) | — | +6 / +£2,962.17 |
| P06 | 1 / 4 / £856.79 (18–22 Nov) | — | +4 / +£856.79 |
| P13 | 3 / 12 / £2,113.70 (7–10 Dec £485.20; 11–15 Dec and 20–25 Dec made and cancelled) | 9 / £1,628.50 | +3 / +£485.20 |
| P09 | 1 / 4 / £362.69 (7–11 Nov) | — | +4 / +£362.69 |
| **P11** | 1 / 7 / £1,012.86 (8–15 Dec) | **8–15 Dec 7 / £1,012.86 (11 Nov 18:03)** | **0 / £0** (was +7 / +£1,012.86) |
| P12 | 0 | 11–13 Dec 2 / £513.81 (booked 5 Nov) | −2 / −£513.81 |
| P01 | 0 | 18–21 Dec 3 / £720.90 (booked 19 Oct) | −3 / −£720.90 |
| P02, P04, P07, P08, P10, P14 | 0 | — | 0 |

### Pace vs STLY (stays from 12 Nov; cancelled bookings excluded on both sides)
**P12** (kpi_pack `pace_30` / `pace_90`; the handback row is recomputed with `rm.metrics.on_the_books` on `data/snapshots/2026-11-12/reservations.csv`):

| P12 measure | 11 Nov | 12 Nov |
|---|---|---|
| Pace30 (stays 12 Nov–11 Dec) | −11 n / −£1,328.14 / −30.6% | **14 n / £2,874.74 vs 26 n / £4,431.19 = −12 n / −£1,556.45 / −35.1%** |
| To handback (stays 12 Nov–13 Dec) | −14 n / −£1,922.14 / −39.0% | **14 n / £2,874.74 vs 28 n / £4,827.19 = −14 n / −£1,952.45 / −40.4%** |
| Pace90 (stays 12 Nov–9 Feb; nothing after 13 Dec is inventory) | −26 n / −61.8% | 14 n / £2,874.74 vs 40 n / £7,779.89 = −26 n / −£4,905.15 / −63.0% |

There was no new P12 booking or cancellation overnight. The move is the window rolling forward one day.

**Every other unit: pace UNKNOWN.** Their first Smoobu arrival is after the STLY as-of date of 12 Nov 2025 (`reservations.csv` first arrivals: P11 11 Dec 2025, P13 14 Dec 2025, P02 18 Nov 2025, the rest in 2026).
- P02 has STLY 5 n / £453.88 against 0 on the books, but it is blocked on purpose, so it is not assessed.
- **On the books, stays 12 Nov–11 Dec** (kpi_pack `pace_30`, equal to Smoobu):
  - P01 18 n / £2,738.34
  - P05 22 / £11,068.71
  - P06 7 / £1,397.79
  - P08 2 / £258.82
  - P09 14 / £1,485.71
  - P10 7 / £741.75
  - **P11 12 / £2,683.73** (the cancellation is already out)
  - P13 24 / £3,665.30
  - P20 17 / £3,033.34
  - P04: UNKNOWN in the pack

### 18 Oct base rises: running effect (same method)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 12 Nov 07:19Z pull.

**Raised group (P01, P05, P06, P09, P11, P12): +12 n / +£4,745.59 including P06.** Yesterday it was +19 / +£5,758.45.
- **Like-for-like, excluding P06 18–22 Nov (reopened 5 Nov by the block change; 4 n / £856.79): +8 n / +£3,888.80.** Yesterday it was +15 / +£4,901.66.
- **The change is exactly one record:** the P11 8–15 Dec cancellation, −7 / −£1,012.86.
- Made: 23 / 83 n / £18,700.51. Cancelled: 12 / 71 n / £13,954.92.

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | 1 / 3 / £720.90 | 0 / £0 |
| P05 | 3 / 12 / £4,915.21 | — | +12 / +£4,915.21 |
| P06 | 3 / 10 / £2,202.56 | — | +10 / +£2,202.56 (incl. 18–22 Nov reopened, +4 / +£856.79) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 (booked before the rise) | −3 / −£244.70 |
| **P11** | 6 / 20 / £3,831.50 | **4 / 31 / £6,186.77** (3 booked before the rise, plus 8–15 Dec) | **−11 / −£2,355.27** (was −4 / −£1,342.41) |
| P12 | 8 / 32 / £6,414.44 | 6 / 28 / £6,186.65 | +4 / +£227.79 |

**Comparison groups (unchanged):**
- Unraised (P02, P08, P10, P14, P20): +44 n / +£7,640.04.
- P13: +19 / +£3,394.96.
- P04: +46 / +£1,625.79.

**What this means:** the only like-for-like gain left is P05 (+12 / +£4,915.21). Without P05 the raised group is −4 n / −£1,026.41 like-for-like.

**Caveats (unchanged):** the rise cannot be separated from:
- the 24 Oct Booking.com markup cut
- Booking.com promotions
- Reyhan's overrides
- the P06 block change

The sample is small: 1–8 bookings per property.

### Per-property table
**Column sources:**
- **Occ30, ADR30, RevPAR30:** kpi_pack `last30`, 13 Oct–11 Nov.
- **Fwd occ30:** Smoobu, 12 Nov–11 Dec, handback-aware, with market in brackets.
- **Pace30:** stays 12 Nov–11 Dec.
- **Pickup 7d:** made 6–12 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net (n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £158.24 | £158.24 | 100% of 18 non-blocked (35%) | UNKNOWN: no STLY | −3 / −£720.90 | **Compressed** (0 open nights to handback) |
| P02 | Ladbroke Grove | 50.0% | £100.06 | £50.03 | all blocked (51%) | not assessed (policy block) | 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (54%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: kpi_pack null | UNKNOWN | UNKNOWN | 46.7% (24%) | UNKNOWN: no history | 0 / £0 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 73.3% | £370.14 | £271.44 | 73.3% (43%) | UNKNOWN: no STLY | +6 / +£2,962.17 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 73.3% | £201.54 | £147.80 | 70.0% of 10 non-blocked (50%) | UNKNOWN | +4 / +£856.79 | Unclassifiable (60–85%, no STLY) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (27%) | UNKNOWN | 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 86.7% | £146.49 | £126.96 | 100% to 13 Nov (51%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** (sold out to handback) |
| P09 | Greenwich | 53.3% | £118.83 | £63.37 | 93.3% to 26 Nov (38%) | UNKNOWN: no STLY | +4 / +£362.69 | **Compressed** (≥ 85%) |
| P10 | Ealing / Hanger Lane | 93.3% | £109.26 | £101.98 | 100% to 18 Nov (32%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P11 | Camden | 70.0% | £167.55 | £117.28 | **42.9%** of 28 non-blocked (49%) | UNKNOWN: no STLY | 0 / £0 | **Soft** (fwd30 < 60%; fell from 55.6%) |
| P12 | Mile End | 76.7% | £167.22 | £128.20 | 46.7% (42%) | **−12 n / −£1,556.45 / −35.1%** | −2 / −£513.81 | **Soft** (pace and fwd30) |
| P13 | Shepherd's Bush (one flat) | 63.3% | £149.62 | £94.76 | 80.0% (45%) | UNKNOWN: no STLY | +3 / +£485.20 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% (46%) | UNKNOWN: no STLY | 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 70.0% | £168.20* | £117.74* | 60.7% of 28 non-blocked (38%) | UNKNOWN: no STLY | +15 / +£2,922.25 | Unclassifiable (60–85%, no STLY); 0.7 pts above the Soft line |

\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`), so ADR30 and RevPAR30 read low.

**Classes:**
- Compressed 4: P01, P08, P09, P10.
- On track 0.
- Soft 4: P04, P11, P12, P14.
- Unclassifiable 9: P05, P06, P13, P20, P15–P19.
- Blocked by policy 3: P02, P03, P07.
- There are no class changes from yesterday. P11 stays Soft and is now further below the line.

**Last 365 nights** (kpi_pack `last365`, 12 Nov 2025–11 Nov 2026; occ / ADR / RevPAR / revenue):
- P01 41.6% / £175.99 / £73.29 / £26,751.19
- P02 79.7% / £128.59 / £102.52 / £37,418.99
- P05 59.2% / £372.27 / £220.30 / £80,410.61
- P06 36.7% / £236.49 / £86.82 / £31,689.00
- P07 11.5% / £133.90 / £15.41 / £5,623.70
- P08 41.4% / £173.01 / £71.57 / £26,123.81
- P09 40.3% / £114.94 / £46.29 / £16,895.53
- P10 40.8% / £113.79 / £46.45 / £16,954.80
- P11 79.2% / £173.75 / £137.57 / £50,214.31
- P12 81.9% / £191.52 / £156.89 / £57,263.15
- P13 78.9% / £158.19 / £124.82 / £45,559.65
- P14 2.7% / £409.84 / £11.23 / £4,098.40
- P20 6.6% / £166.49 / £10.95 / £3,995.78 (short history)
- P03, P04, P15–P19: UNKNOWN

**Booking profile** (kpi_pack `booking_profile`: bookings / median lead / median stay / channel revenue share):
- P01 20 / 15 d / 5 n: Airbnb 79.9%, Website 13.3%, Booking.com 6.8%
- P02 71 / 34 / 4: Airbnb 53.8%, Booking.com 43.0%, Direct 3.2%
- P04 4 / 8 / 4: Booking.com 51.1%, Airbnb 48.9%
- P05 62 / 44 / 4: Airbnb 100%
- P06 33 / 14 / 4: Airbnb 73.6%, Booking.com 26.4%
- P07 5 / 3 / 4: Airbnb 100%
- P08 22 / 15 / 6: Airbnb 77.3%, Booking.com 22.7%
- P09 25 / 18 / 5: Airbnb 57.3%, Booking.com 41.2%, Direct 1.5%
- P10 22 / 12 / 5: Airbnb 69.3%, Booking.com 27.6%, Website 3.1%
- **P11 72 / 28 / 4: Booking.com 54.0%, Airbnb 44.1%, Agoda 1.9%** (was 73 and Booking.com 54.8%; the cancellation dropped out)
- P12 81 / 31 / 4: Booking.com 89.6%, Airbnb 10.4%
- P13 85 / 21 / 3: Booking.com 52.0%, Airbnb 47.2%, Agoda 0.9%
- P14 1 / 57 / 10: Airbnb 100%
- P20 8 / 8 / 7: Airbnb 100%

### Orphan gaps, next 60 (Smoobu `/api/rates` 12 Nov 07:19Z; P13 as one calendar; handbacks respected)
An orphan is an open night that no stay can cover, given the min stay on each arrival night and the bookings, blocks or handback around it. All units were checked by script.

| Ref | Night(s) | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| **P09** | **12 Nov (TONIGHT)** | £117 / 2 | 11 Nov was blocked (162726554) and the 13 Nov arrival (161131246) is tomorrow. | **t-p09-1112block: NOT FIXED and passing unsold.** It cannot sell as set. There is no P09 entry in `get_user_logs` 11–12 Nov. `raw/prices_3318172` (refreshed 12 Nov 07:02Z) starts at 13 Nov. Next 60 has no other open P09 night. |
| **P13** | **12 Nov (TONIGHT), NEW** | £164 / £155, min 2 | 11 Nov passed unsold (£165/£157, min 2), and the 13–17 Nov stay (159544716) arrives tomorrow. | It cannot sell as set. |
| **P20** | **5 Dec** | £313 / 3 | The 25 Nov–5 Dec stay checks out and the 6–14 Dec stay arrives the next day. | **t-p20-5dec-orphan: NOT FIXED.** `raw/prices_3547481` (11 Nov 17:16Z): user_price 313, min 3, **unbookable 1**. |

**Re-checked as requested:**
- **P06, 11 Nov: passed UNSOLD** (Smoobu £200, min 2; t-p06-open closes as lost). The next P06 open nights are 15–17 Nov (£245 / £245 / £254, min 2), a 3-night run that fits. Reyhan set 11–17 Nov −10% min 2 on 11 Nov 17:12:54Z (`get_user_logs`).
- **P11, around 8–15 Dec:** no orphan. 8–18 Dec is an 11-night open run at min 3, between the 5–8 Dec stay (161640886) and the 19 Dec arrival (157014486).
  - Other P11 runs: 18–19 Nov (2 n, min 2), 22–25 Nov (4 n, min 3), 29 Nov–4 Dec (6 n, min 3), 23–25 Dec (3 n, min 2) and 3 Jan onward.
  - All fit.
- **P11, 11–13 Nov block (t-p11-1013block):** 162775668 still blocks 10–13 Nov, unchanged. 12–13 Nov are inside the next 30. Reason NOT KNOWN.
- **P20, 20–24 Nov:** a 5-night open run (Smoobu £242 / £251 / £220 / £254 / £252, min 3/3/2/2/2). Not an orphan.
  - **t-pl-push-fresh (P20): PriceLabs now matches the cancellation.** `raw/prices_3547481` (11 Nov 17:16:22Z) shows 20–24 Nov open (no longer "Booked").
  - Reyhan set 20–21 Nov −5% min 3 at 11 Nov 17:15:58Z.
  - t-p20-delivery is still open: see "Conflicts for Corentin".
- **P01, 18–20 Dec:** still "Blocked channel" (160657036, 30 Nov–21 Dec departure, unchanged since 10 Nov). t-p01-1820block: NOT CHANGED, still for Corentin.
- **P12, 7–13 Dec:** a 7-night run to the handback (£265–329, min 3). It fits.
  - Other P12 nights:
    - 12–13 Nov: 2 n, min 2.
    - 17–20 Nov: 4 n, min 2.
    - **26 Nov: single night at min 1 (£298).** It is bookable, so it is not an orphan; t-p12-26nov-price is for the pricing section.
    - 30 Nov–3 Dec: 4 n, min 2.
- **P05:**
  - 21 Dec (£2,198) and 29 Dec (£2,777): single nights at min 1. They are bookable but unsold (a-p05-dec).
  - 13–14 Dec: 2 n at min 2.
- **P04:**
  - 2 Dec: single night at min 1 (£457; policy-deprioritised).
  - 12–13 Nov: 2 n, now **min 2**. See "Conflicts for Corentin".
- **P13:**
  - 17 Nov, 27 Nov and 1 Dec: single nights at min 1 (1 Dec is intentional per policy).
  - 10–26 Dec: 17-night run at min 3, with Reyhan's −5% override set 11 Nov 15:38Z.

### Gaps to fill (open nights next 30, 12 Nov–11 Dec, Smoobu 12 Nov 07:19Z)
- **P09:** 12 Nov (orphan, tonight).
- **P13:**
  - 12 Nov (orphan, tonight).
  - 17 Nov (£228/£216), 27 Nov (£322/£245) and 1 Dec (£296/£226), all min 1.
  - 10–11 Dec (£256/£195, £277/£211; min 3, run to 26 Dec).
- **P06:** 15–17 Nov (£245–254, min 2).
- **P20:**
  - 13–17 Nov (£237–291, min 3/3/3/2/2).
  - 20–24 Nov (£220–254).
  - 5 Dec (orphan).
- **P05:**
  - 16–17 Nov (£381 / £397, min 2).
  - 29 Nov–2 Dec (£499–514, min 3).
  - 7–8 Dec (£471 / £452, min 2).
- **P04:**
  - 12–13 Nov (£146 / £147, min 2).
  - 18–24 Nov (£138–148, min 3).
  - 2 Dec (policy).
  - 6–11 Dec (£179–190, min 3).
- **P11:**
  - 18–19 Nov (£162 / £183, min 2).
  - 22–25 Nov (£214–215, min 3).
  - 29 Nov–4 Dec (£221–349, min 3).
  - **8–11 Dec reopened** (£250–329; the run continues to 18 Dec).
- **P12:**
  - 12–13 Nov (£213 / £263, min 2).
  - 17–20 Nov (£247–291, min 2).
  - 26 Nov (£298, min 1).
  - 30 Nov–3 Dec (£270–284, min 2).
  - 7–11 Dec (£265–319, min 3), and on to 13 Dec at the handback.
- **P14:** all 30 nights (special setup, numbers only).
- **P01, P08, P10:** none.

### Conflicts for Corentin (Reyhan's edits or Smoobu state vs standing decisions; not new proposals)
1. **P04 min stay.** Policy `price_changes` 24 Oct says "Minimum stay stays 3 nights: never open for fewer than 3".
   - Reyhan's override at 11 Nov 17:16:19Z sets **11–24 Nov min 2**. The later 17:16:39Z edit sets 18–24 Nov −5% min 3, so 11–17 Nov stay at min 2.
   - Smoobu now shows 12–13 Nov at min 2 (11 Nov was min 2).
2. **P11 darts nights.** The 21 Oct decision is "average above £300/night". The reopened 13–17 Dec average £225.00 in Smoobu. Reyhan's 9 Nov −3% override (13–18 Dec) is still in force.
3. **P20 delivery.** Policy says the delivery block is 20–22 Nov. Smoobu blocks only 18–19 Nov. 20–22 Nov are open, and Reyhan priced 20–21 Nov on 11 Nov.
4. **P01 18–20 Dec.** The gap block runs to the 20 Dec handback; policy says the block is to 17 Dec and "before the date, maximise revenue normally".

**PriceLabs changes since 11 Nov 06:00Z** (`get_user_logs`, listing, 11–12 Nov): 9 entries, all by Reyhan, all 11 Nov.
- P13 3064856 / 3090701 / Vrbo child: 10–26 Dec −5% min 3 (15:38:45Z)
- P06: 11–17 Nov −10% min 2 (17:12:54Z)
- P20:
  - 13–15 Nov −5% min 3 (17:15:52Z)
  - 20–21 Nov −5% min 3 (17:15:58Z)
- P04:
  - 11–24 Nov min 2 (17:16:19Z)
  - 18–24 Nov −5% min 3 (17:16:39Z)
  - 6–22 Dec −5% min 3 (17:16:47Z)

There were no entries for P01, P05, P09, P11, P12 or P14.

Data gaps:
- **P11 8–15 Dec cancellation:**
  - Who cancelled (guest or host) and why: NOT CHECKED. Smoobu's reservation record has no such field, the `notice` text was not read (data rules) and the Booking.com extranet was not opened.
  - The live Booking.com price for 8–15 Dec / darts 13–15 Dec: NOT CHECKED. Booking.com promotion stack (a-p11-bcom-stack): NOT CHECKED today.
- **P11 PriceLabs is stale:** `raw/prices_3064196` (refreshed 11 Nov 15:38Z) predates the cancellation and still shows 8–14 Dec booked, so kpi_pack P11 `forward_occ_30` 55.2% is overstated vs Smoobu 42.9%. The last P11 push is 11 Nov 07:46Z.
- STLY history for every unit except P12, so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20. `reservations.csv` starts at arrival 11 Nov 2025.
- **Reasons NOT KNOWN for:**
  - P01 gap block extended to 21 Dec.
  - P09 11 Nov block (which caused the 12 Nov orphan).
  - P11 10–13 Nov block 162775668.
- Smoobu `created-at` / `modifiedAt` time zone not stated.
- P03: not in Smoobu. P04: last-30 and last-365 null in kpi_pack. P15–P19: not mapped.
- `market.csv`, `comps.csv` and `channel_checks.csv` were empty when the 12 Nov kpi_pack was built (kpi_pack `missing`), so there is no ARI or RGI.
- P20 18–22 Oct revenue was paid separately and is not in Smoobu. `total_gbp` excludes cleaning, so all revenue is room only.
