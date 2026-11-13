## Occupancy & performance

**Portfolio, last 30 nights (14 Oct–12 Nov 2026), the 13 units with Smoobu history (P01, P02, P05–P14, P20):** 241 n, £41,282.39, occupancy 61.8%, ADR £171.30, RevPAR £105.85 (`reports/2026-11-13/kpi_pack.json` `portfolio_last30`). Revenue is Smoobu basePrice: room only, cleaning excluded. Yesterday (13 Oct–11 Nov) it was 243 n / 62.3% / £170.10 / £105.98.

**Last 365 nights (13 Nov 2025–12 Nov 2026):** 2,197 n, £404,048.55, occupancy 46.3%, ADR £183.91, RevPAR £85.15 (kpi_pack `portfolio_last365`). Most Smoobu history starts in 2026, so this understates a full year.

**Booked next 30 nights (13 Nov–12 Dec): 147 of 262 non-blocked nights = 56.1%.** Yesterday (12 Nov–11 Dec) it was 151/258 = 58.5%.
- **Next 60 (13 Nov–11 Jan):** 205/443 = 46.3%. Yesterday: 211/440 = 48.0%.
- **Source:** live Smoobu GET `/api/reservations` (901 records incl. cancellations and blocks; guest fields dropped) and `/api/rates`, both pulled 13 Nov 07:20:53Z. Saved to scratch `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ13/smoobu_res.json` and `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ13/smoobu_rates.json`. The two endpoints agree on every unit-night for the next 60 (0 mismatches; P13 read as one calendar).
- **Excluded from the counts:**
  - P02, P03 and P07 (blocked on purpose, policy).
  - Every night after a handback: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - Blocked nights: P01 30 Nov–20 Dec; P06 from **30 Nov** (was 22 Nov, see below); P20 18–19 Nov; P11 13 Nov (162775668).
- **How −4 booked nights reconciles (no booking changed):** 12 Nov booked dropped out for P01, P05, P06, P08, P10, P20 (−6); 12 Dec booked came in for P05 and P20 (+2). The denominator rose by 4: −11 (12 Nov non-blocked nights) +7 (12 Dec) +8 (P06 22–29 Nov reopened).

### Overnight change the reservations.csv diff cannot see: P06 Marylebone block shortened
The Dispatcher diff of `reservations.csv` (13 Nov vs 12 Nov) is right that there are no new bookings and no cancellations. But `reservations.csv` carries no blocks. A full-record diff of the live Smoobu pull (13 Nov 07:20Z vs 12 Nov 07:19Z) finds **one real change and three touches**:
- **P06 block 143402691 ("Blocked channel", departure 31 Dec 2027): arrival moved 22 Nov → 30 Nov, `modifiedAt` 12 Nov 12:59:51** (Smoobu time). **22–29 Nov (8 nights) are now open and bookable in Smoobu** (`/api/rates`: £346 / £348 / £350 / £353 / £358 / £400 / £445 / £382, min 2/3/3/3/3/4/4/4). It is an 8-night run, so it is not an orphan.
  - Who changed it and why: NOT CHECKED (Smoobu has no such field).
  - **PriceLabs has not caught up:** live `get_listing_prices` 3288517 (13 Nov; last_refreshed 12 Nov 09:23:14Z, before the change) still shows 22–30 Nov "Blocked". So kpi_pack P06 `forward_occ_30` 17.2% counts these as blocked. The Smoobu open-night prices are the values PriceLabs pushed when the nights were blocked.
  - Policy lists P06 among the intentional blocks. This is a Smoobu state change for Corentin to confirm (see Conflicts), not a new proposal.
- `modifiedAt` only, no field changed: P09 161131246 (12 Nov 13:13:24), P11 155581236 (12 Nov 12:51:21), P13 159544716 (13 Nov 00:46:31).

### Booked vs market, next 30 / next 60
Booked figures are Smoobu at 13 Nov 07:20Z. Market figures are kpi_pack `market_occ_30/60`.

| Ref | Booked next 30 (bk/n) | Mkt 30 | Booked next 60 (bk/n) | Mkt 60 | kpi_pack fwd30 (PriceLabs) |
|---|---|---|---|---|---|
| P01 | 100% (17/17 non-blocked; 13 blocked) | 35% | 100% (17/17 to handback; 21 blocked) | 29% | 55.2% (incl. blocks) |
| P04 | 46.7% (14/30) | 25% | 45.0% (27/60) | 20% | 48.3% |
| P05 | 73.3% (22/30) | 44% | 66.7% (40/60) | 39% | 72.4% |
| P06 | **35.3%** (6/17 non-blocked; 13 blocked) | 50% | 6/17 (43 blocked) | 42% | 17.2% (still counts 22–29 Nov as blocked) |
| P08 | 100% (1/1 to handback 13 Nov) | 52% | same | 43% | UNKNOWN (null) |
| P09 | 100% (14/14 to handback 26 Nov) | 39% | same | 33% | 100% |
| P10 | 100% (6/6 to handback 18 Nov) | 32% | same | 25% | 100% |
| P11 | 41.4% (12/29; 13 Nov blocked) | 50% | 40.7% (24/59) | 39% | 41.4% (now matches Smoobu) |
| P12 | 46.7% (14/30) | 42% | 45.2% (14/31 to handback 13 Dec) | 34% | 48.3% |
| P13 (one flat) | 80.0% (24/30) | 45% | 51.7% (31/60) | 38% | 79.3% |
| P14 (special setup, numbers only) | 0% (0/30) | 48% | 0% (0/60) | 38% | 0% |
| P20 | 60.7% (17/28; 18–19 Nov blocked) | 39% | 43.1% (25/58) | 30% | 58.6% |

### 7-day pickup, net of cancellations (bookings made 7–13 Nov, to 07:20Z)
**Sources:** Smoobu `created-at`, and `modifiedAt` for cancellations. No imported past stays fall in the window. No booking or cancellation since yesterday's pull.

- **Gross made:** 7 bookings / 36 n / £7,666.48.
- **Still confirmed:** 4 / 21 n / £5,304.31 (equals the kpi_pack `pickup_7d` sum).
- **Cancelled in window:** 5 / 20 n / £3,596.88.
- **Net: +16 n / +£4,069.60.** Yesterday (6–12 Nov) it was +27 n / +£6,354.39.
- **Reconciliation:** the whole change is 6 Nov leaving the window: P06 18–22 Nov (−4 / −£856.79) and P20 19–26 Dec (−7 / −£1,428.00) = −11 / −£2,284.79.

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P05 | 1 / 6 / £2,962.17 (15–21 Dec) | — | +6 / +£2,962.17 |
| P20 | 2 / 12 / £2,132.79 (6–14 Dec £1,494.25; 21–25 Nov made and cancelled) | 21–25 Nov 4 / £638.54 | +8 / +£1,494.25 |
| P13 | 2 / 7 / £1,195.97 (7–10 Dec £485.20; 11–15 Dec made and cancelled) | 4 / £710.77 | +3 / +£485.20 |
| P09 | 1 / 4 / £362.69 (7–11 Nov) | — | +4 / +£362.69 |
| P11 | 1 / 7 / £1,012.86 (8–15 Dec) | 8–15 Dec 7 / £1,012.86 | 0 / £0 |
| P12 | 0 | 11–13 Dec 2 / £513.81 (booked 5 Nov) | −2 / −£513.81 |
| P01 | 0 | 18–21 Dec 3 / £720.90 (booked 19 Oct) | −3 / −£720.90 |
| P02, P04, P06, P07, P08, P10, P14 | 0 | — | 0 |

### Pace vs STLY (stays from 13 Nov; cancelled bookings excluded on both sides)
**P12** (kpi_pack `pace_30` / `pace_90`; the handback row is `rm.metrics.on_the_books` on `data/snapshots/2026-11-13/reservations.csv`):

| P12 measure | 12 Nov | 13 Nov |
|---|---|---|
| Pace30 (stays 13 Nov–12 Dec) | −12 n / −£1,556.45 / −35.1% | **14 n / £2,874.74 vs 26 n / £4,526.23 = −12 n / −£1,651.49 / −36.5%** |
| To handback (stays 13 Nov–13 Dec) | −14 n / −£1,952.45 / −40.4% | **14 n / £2,874.74 vs 27 n / £4,724.23 = −13 n / −£1,849.49 / −39.1%** |
| Pace90 (stays 13 Nov–10 Feb; nothing after 13 Dec is inventory) | −26 n / −63.0% | 14 n / £2,874.74 vs 42 n / £8,102.26 = −28 n / −£5,227.52 / −64.5% |

No new P12 booking or cancellation. The move is the window rolling forward one day.

**Every other unit: pace UNKNOWN.** The first Smoobu arrival is after the STLY as-of date of 13 Nov 2025 (`reservations.csv` first arrivals: P02 18 Nov 2025, P11 11 Dec 2025, P13 14 Dec 2025, the rest in 2026). P02 STLY 5 n / £453.88 vs 0 on the books, but it is blocked on purpose and not assessed.
- **On the books, stays 13 Nov–12 Dec** (kpi_pack `pace_30`): P01 17 n / £2,586.21; P05 22 / £11,087.21; P06 6 / £1,217.46; P08 1 / £129.41; P09 14 / £1,485.71; P10 6 / £635.78; P11 12 / £2,683.73; P13 24 / £3,665.30; P20 17 / £3,050.12; P04 UNKNOWN in the pack.

### 18 Oct base rises: running effect (same method)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 13 Nov 07:20Z pull.

**Raised group (P01, P05, P06, P09, P11, P12): +12 n / +£4,745.59 incl. P06. Unchanged from yesterday.**
- **Like-for-like, excluding P06 18–22 Nov (reopened 5 Nov by a block change; 4 n / £856.79): +8 n / +£3,888.80.** Unchanged.
- Made: 23 / 83 n / £18,700.51. Cancelled: 12 / 71 n / £13,954.92.

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | 1 / 3 / £720.90 | 0 / £0 |
| P05 | 3 / 12 / £4,915.21 | — | +12 / +£4,915.21 |
| P06 | 3 / 10 / £2,202.56 | — | +10 / +£2,202.56 (incl. 18–22 Nov, +4 / +£856.79) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 (booked before the rise) | −3 / −£244.70 |
| P11 | 6 / 20 / £3,831.50 | 4 / 31 / £6,186.77 | −11 / −£2,355.27 |
| P12 | 8 / 32 / £6,414.44 | 6 / 28 / £6,186.65 | +4 / +£227.79 |

**Comparison groups (unchanged):** unraised (P02, P08, P10, P14, P20) +44 n / +£7,640.04; P13 +19 / +£3,394.96; P04 +46 / +£1,625.79.

**What this means:** P05 is still the whole like-for-like gain. Without P05 the raised group is −4 n / −£1,026.41. The P06 22–29 Nov reopening adds open nights to a raised unit from today; any booking on them will need the same like-for-like exclusion. Caveats unchanged: the rise cannot be separated from the 24 Oct and 12 Nov Booking.com markup changes, Booking.com promotions, Reyhan's overrides or the P06 block changes, and the sample is 1–8 bookings per property.

### Per-property table
**Column sources:** Occ30, ADR30, RevPAR30 = kpi_pack `last30`, 14 Oct–12 Nov. Fwd occ30 = Smoobu, 13 Nov–12 Dec, handback-aware (market in brackets). Pace30 = stays 13 Nov–12 Dec. Pickup 7d = made 7–13 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net (n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £157.90 | £157.90 | 100% of 17 non-blocked (35%) | UNKNOWN: no STLY | −3 / −£720.90 | **Compressed** (0 open nights to handback) |
| P02 | Ladbroke Grove | 46.7% | £99.50 | £46.43 | all blocked (51%) | not assessed (policy block) | 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (55%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: kpi_pack null | UNKNOWN | UNKNOWN | 46.7% (25%) | UNKNOWN: no history | 0 / £0 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 76.7% | £372.08 | £285.26 | 73.3% (44%) | UNKNOWN: no STLY | +6 / +£2,962.17 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 73.3% | £199.33 | £146.17 | **35.3%** of 17 non-blocked (50%) | UNKNOWN: no STLY | 0 / £0 | **Soft** (fwd30 < 60%; was Unclassifiable at 7/10. The drop is the 8 reopened nights, not lost bookings) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (27%) | UNKNOWN | 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 86.7% | £144.95 | £125.62 | 100% to 13 Nov (52%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** (sold out to handback tonight) |
| P09 | Greenwich | 50.0% | £118.35 | £59.17 | 100% to 26 Nov (39%) | UNKNOWN: no STLY | +4 / +£362.69 | **Compressed** |
| P10 | Ealing / Hanger Lane | 93.3% | £108.16 | £100.95 | 100% to 18 Nov (32%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P11 | Camden | 70.0% | £167.55 | £117.28 | 41.4% of 29 non-blocked (50%) | UNKNOWN: no STLY | 0 / £0 | **Soft** (fwd30 < 60%) |
| P12 | Mile End | 76.7% | £167.22 | £128.20 | 46.7% (42%) | **−12 n / −£1,651.49 / −36.5%** | −2 / −£513.81 | **Soft** (pace and fwd30) |
| P13 | Shepherd's Bush (one flat) | 60.0% | £151.38 | £90.83 | 80.0% (45%) | UNKNOWN: no STLY | +3 / +£485.20 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% (48%) | UNKNOWN: no STLY | 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 70.0% | £168.94* | £118.25* | 60.7% of 28 non-blocked (39%) | UNKNOWN: no STLY | +8 / +£1,494.25 | Unclassifiable (60–85%, no STLY); 0.7 pts above the Soft line |

\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`), so ADR30 and RevPAR30 read low.

**Classes:** Compressed 4 (P01, P08, P09, P10); On track 0; Soft 5 (P04, **P06 new**, P11, P12, P14); Unclassifiable 8 (P05, P13, P20, P15–P19); blocked by policy 3 (P02, P03, P07). P08 leaves management after tonight.

**Last 365 nights** (kpi_pack `last365`, 13 Nov 2025–12 Nov 2026; occ / ADR / RevPAR / revenue): P01 41.9% / £175.84 / £73.71 / £26,903.32; P02 79.7% / £128.59 / £102.52 / £37,418.99; P05 59.5% / £372.47 / £221.44 / £80,825.36; P06 37.0% / £236.07 / £87.31 / £31,869.33; P07 11.5% / £133.90 / £15.41 / £5,623.70; P08 41.6% / £172.72 / £71.93 / £26,253.22; P09 40.3% / £114.94 / £46.29 / £16,895.53; P10 41.1% / £113.74 / £46.74 / £17,060.77; P11 79.2% / £173.75 / £137.57 / £50,214.31; P12 81.6% / £191.81 / £156.60 / £57,160.19; P13 78.9% / £158.19 / £124.82 / £45,559.65; P14 2.7% / £409.84 / £11.23 / £4,098.40; P20 6.8% / £166.63 / £11.41 / £4,165.78 (short history). P03, P04, P15–P19: UNKNOWN.

**Booking profile** (kpi_pack `booking_profile`; bookings / median lead / median stay / channel revenue share; unchanged from yesterday): P01 20 / 15 d / 5 n, Airbnb 79.9%, Website 13.3%, Booking.com 6.8%; P02 71 / 34 / 4, Airbnb 53.8%, Booking.com 43.0%, Direct 3.2%; P04 4 / 8 / 4, Booking.com 51.1%, Airbnb 48.9%; P05 62 / 44 / 4, Airbnb 100%; P06 33 / 14 / 4, Airbnb 73.6%, Booking.com 26.4%; P07 5 / 3 / 4, Airbnb 100%; P08 22 / 15 / 6, Airbnb 77.3%, Booking.com 22.7%; P09 25 / 18 / 5, Airbnb 57.3%, Booking.com 41.2%, Direct 1.5%; P10 22 / 12 / 5, Airbnb 69.3%, Booking.com 27.6%, Website 3.1%; P11 72 / 28 / 4, Booking.com 54.0%, Airbnb 44.1%, Agoda 1.9%; P12 81 / 31 / 4, Booking.com 89.6%, Airbnb 10.4%; P13 85 / 21 / 3, Booking.com 52.0%, Airbnb 47.2%, Agoda 0.9%; P14 1 / 57 / 10, Airbnb 100%; P20 8 / 8 / 7, Airbnb 100%.

### Orphan gaps, next 60 (Smoobu `/api/rates` 13 Nov 07:20Z; P13 as one calendar; handbacks respected)
An orphan is an open night that no stay can cover, given the min stay on each arrival night and the bookings, blocks or handback around it. All units checked by script.

| Ref | Night(s) | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| **P04** | **13 Nov (TONIGHT), NEW** | £130 / 2 | 12 Nov passed unsold (£130, min 2) and the 14 Nov arrival (161276416) is tomorrow. | Cannot sell as set. It comes from Reyhan's 11–17 Nov min 2 override (see Conflicts 1). |
| **P20** | **5 Dec** | £313 / 3 | 25 Nov–5 Dec stay checks out, 6–14 Dec stay arrives the next day. | **t-p20-5dec-orphan: NOT FIXED.** Live `get_listing_prices` 3547481 (13 Nov; refreshed 12 Nov 09:23:20Z): user_price 313, min 3, **unbookable 1**. |

**Re-checked as requested:**
- **P13, 12 Nov (t-p13-1112-orphan): LAPSED, passed unsold.** Smoobu now shows 12 Nov at £200 / £200, **min 1** on both listings (was £164 / £155, min 2 at 12 Nov 07:19Z), so it was made bookable during 12 Nov. But it did not sell (no booking in the pull). When and by whom the min stay changed is NOT CHECKED: `get_user_logs` (listing, 12–13 Nov) returns 0 entries.
- **P09, 12 Nov (t-p09-1112block): passed unsold** (£117, min 2). It closes as lost. No other open P09 night to handback.
- **P12, 13 Nov (tonight):** now min 1 at £274 (was min 2 at £263 yesterday), so it is bookable and not an orphan. 12 Nov passed unsold (£237). Cause of the min change NOT CHECKED (no log entry).
- **P11, 8–18 Dec:** an 11-night open run at min 3, between the 5–8 Dec stay (161640886) and the 19 Dec arrival (157014486). No orphan.
  - **PriceLabs is now synced.** Live `get_listing_prices` 3064196 (13 Nov; last_refreshed 13 Nov 06:34:59Z) shows 8–18 Dec open (no "Booked"). kpi_pack P11 `forward_occ_30` 41.4% now equals Smoobu 12/29.
  - **Darts nights 13–17 Dec:** Smoobu £186 / £201 / £209 / £216 / £233 = **average £209.00** (yesterday £225.00). PriceLabs "Your Price" (`booked_price`) is 221 / 200 / 207 / 215 / 235 = average £215.60. Both are below the 21 Oct ">£300/night" decision (Conflicts 2). Smoobu 13 Dec £186 vs PriceLabs £221 differs by £35; this is for the PriceLabs auditor.
  - Smoobu P11 prices fell overnight after the 13 Nov 06:35Z refresh and push: 29 Nov–4 Dec £170–259 (was £221–349) and 8–12 Dec £197–266 (was £250–332). Numbers only, for the strategy director.
  - Other P11 runs: 18–19 Nov (2 n, min 2), 22–25 Nov (4 n, min 3), 29 Nov–4 Dec (6 n, min 3), 23–25 Dec (3 n, min 2) and 3 Jan onward. All fit.
  - 13 Nov is still blocked by 162775668 (10–13 Nov), reason NOT KNOWN.
- **P20, 20–24 Nov:** a 5-night open run, Smoobu £241 / £242 / £215 / £247 / £245 (average £238.00), min 3/3/2/2/2. Not an orphan. PriceLabs live "Your Price" 242 / 251 / 220 / 254 / 252 (average £243.80). The delivery block is still 18–19 Nov only (162432556), unchanged (Conflicts 3). I could not reproduce the "£224.50/night" from today's data.
- **P01, 18–20 Dec:** still "Blocked channel" (160657036, 30 Nov–21 Dec departure, unchanged). t-p01-1820block: NOT CHANGED (Conflicts 4).
- **P12, 7–13 Dec:** a 7-night run to the handback, £268–300, min 3. It fits. Other P12 nights: 17–20 Nov (4 n, min 2); 26 Nov single night at min 1 (£304, bookable, not an orphan); 30 Nov–3 Dec (4 n, min 2).
- **P06:** 15–17 Nov (£222 / £222 / £233, min 2) fits; the new 22–29 Nov run fits (above).
- **P05:** 21 Dec (£2,074) and 29 Dec (£2,712) are single nights at min 1, bookable but unsold (a-p05-dec); 13–14 Dec 2 n at min 2.
- **P04:** 2 Dec single night at min 1 (£459; policy-deprioritised). 18–24 Nov back at min 3.
- **P13:** 17 Nov, 27 Nov and 1 Dec single nights at min 1 (1 Dec intentional per policy); 10–26 Dec 17-night run at min 3.
- **No new orphans** other than P04 13 Nov.

### Gaps to fill (open nights next 30, 13 Nov–12 Dec, Smoobu 13 Nov 07:20Z)
- **P04:** 13 Nov (orphan, tonight); 18–24 Nov (£130–158, min 3); 2 Dec (policy); 6–12 Dec (£179–193, min 3; the run continues to 19 Dec).
- **P05:** 16–17 Nov (£382 / £398, min 2); 29 Nov–2 Dec (£494–517, min 3); 7–8 Dec (£479 / £470, min 2).
- **P06:** 15–17 Nov (£222–233, min 2); **22–29 Nov reopened** (£346–445, min 2–4).
- **P11:** 18–19 Nov (£160 / £187, min 2); 22–25 Nov (£207–215, min 3); 29 Nov–4 Dec (£170–259, min 3); 8–12 Dec (£197–266; the run continues to 18 Dec).
- **P12:** 13 Nov (£274, min 1, tonight); 17–20 Nov (£250–290, min 2); 26 Nov (£304, min 1); 30 Nov–3 Dec (£258–284, min 2); 7–12 Dec (£268–300, min 3; to the 13 Dec handback).
- **P13:** 17 Nov (£228 / £216); 27 Nov (£287 / £272); 1 Dec (£294 / £224), all min 1; 10–12 Dec (£253–276 / £193–210, min 3; the run continues to 26 Dec).
- **P14:** all 30 nights (special setup, numbers only).
- **P20:** 13–17 Nov (£210–270, min 3/3/2/2/2); 20–24 Nov (£215–247); 5 Dec (orphan).
- **P01, P08, P09, P10:** none.

### Conflicts for Corentin (Smoobu state or Reyhan's edits vs standing decisions; not new proposals)
1. **P04 min stay.** Policy `price_changes` 24 Oct: "Minimum stay stays 3 nights: never open for fewer than 3". Reyhan's 11 Nov override keeps 11–17 Nov at min 2. **Result today: 13 Nov is a 1-night orphan at min 2** (12 Nov passed unsold).
2. **P11 darts nights.** The 21 Oct decision is "average above £300/night". 13–17 Dec average £209.00 in Smoobu (£215.60 PriceLabs "Your Price"), down from £225.00 yesterday. Reyhan's 9 Nov −3% override (13–18 Dec) is still in force.
3. **P20 delivery.** Policy says the delivery block is 20–22 Nov. Smoobu blocks only 18–19 Nov; 20–22 Nov are open.
4. **P01 18–20 Dec.** The gap block runs to the 20 Dec handback; policy says the gap block is to 17 Dec and "before the date, maximise revenue normally".
5. **NEW: P06 Marylebone block shortened.** Policy `intentional_blocks` lists P06. Block 143402691 now starts 30 Nov instead of 22 Nov (Smoobu `modifiedAt` 12 Nov 12:59:51), opening 22–29 Nov. Confirm it is intended. PriceLabs (last refreshed 12 Nov 09:23Z) still treats the nights as blocked.

**PriceLabs changes since 12 Nov 06:00Z** (`get_user_logs`, listing, 12–13 Nov): **0 entries.**

Data gaps:
- **P06 block change:** who moved the 143402691 start date and why: NOT CHECKED (no Smoobu field). PriceLabs P06 not refreshed since 12 Nov 09:23Z, so kpi_pack P06 `forward_occ_30` (17.2%) is stale vs Smoobu.
- **`reservations.csv` carries no blocks,** so a booking-only diff misses block changes like P06. The full Smoobu record diff caught it.
- **P13 12 Nov and P12 13 Nov min-stay changes to 1:** who and when NOT CHECKED (no `get_user_logs` entry 12–13 Nov; may be an automated PriceLabs rule, not verified).
- **STLY history for every unit except P12,** so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20 (`reservations.csv` first arrival 11 Nov 2025). PriceLabs price rows carry `booking_status_STLY` / `ADR_STLY`, which are not used by the pack.
- **Reasons NOT KNOWN:** P01 gap block to 21 Dec; P11 10–13 Nov block 162775668; P09 11 Nov block (12 Nov lost).
- Smoobu `created-at` / `modifiedAt` time zone not stated.
- **Raw prices files:** P11 3064196, P06 3288517 and P20 3547481 were confirmed live today (values match raw). The other raw prices files were not value-checked by me.
- **Not in the data:** P03 not in Smoobu; P04 last-30 / last-365 null in kpi_pack; P08 `forward_occ_30` null in kpi_pack; P15–P19 not mapped.
- `market.csv`, `comps.csv` and `channel_checks.csv` were empty when the 13 Nov kpi_pack was built (kpi_pack `missing`), so there is no ARI or RGI.
- P20 18–22 Oct revenue paid separately, not in Smoobu. `total_gbp` excludes cleaning, so all revenue is room only.
