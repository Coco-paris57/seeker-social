## Occupancy & performance

**Portfolio, last 30 nights (30 Sep–29 Oct 2026), 13 units with Smoobu history (P01, P02, P05–P14, P20):** occupancy 70.0%, ADR £172.68, RevPAR £120.87, revenue £47,140.41 (273 nights). Yesterday's window (29 Sep–28 Oct): 70.0% / £173.19 / £121.23 / £47,281.30.
- **Last 365 nights (30 Oct 2025–29 Oct 2026):** occupancy 44.5%, ADR £184.23, RevPAR £82.00, revenue £389,089.94 (2,112 nights). The occupancy is understated because the denominator is 365 days and most units' Smoobu history starts in 2026.
- Source: `reports/2026-10-30/kpi_pack.json` (`portfolio_last30`, `portfolio_last365`). Revenue is Smoobu `basePrice` (room only, cleaning excluded). P03, P04 (in Smoobu since 20 Oct) and P15–P19 are left out, not counted as zero.

**Forward next 30 nights (31 Oct–28 Nov; `prices.csv` starts 31 Oct, so 29 nights), handback-aware, Smoobu confirmed stays as truth:** 187 of 303 non-blocked nights booked = **61.7%**. Yesterday: 60.1% (185/308).
- Units counted: P01, P04, P05, P06, P08–P14 and P20. P02, P03 and P07 are left out (blocked on purpose).
- Blocked nights excluded (18): P06 14 (blocked on purpose), P20 2 (20–21 Nov delivery, policy), P04 2 (1–2 Nov, see orphan gaps).

**Forward next 60 nights (31 Oct–28 Dec, 59 nights), handback-aware:** 251 of 502 non-blocked nights = **50.0%**. Yesterday: 48.3% (246/509).
- Blocked nights excluded (66): P01 18 (30 Nov–17 Dec, in the handback block set), P06 44, P20 2, P04 2.
- **Fixed since 29 Oct:** PriceLabs now agrees with Smoobu on P12 (the cancelled 4–7 Dec nights are cleared and the new 3–7 Dec stay shows Booked). kpi_pack P12 `forward_occ_60` 45.5% now equals the Smoobu count (20/44).
- **Still lagging in PriceLabs** (`prices.csv` vs `reservations.csv`): P04 6–8 Nov and P05 6–8 Nov are booked in Smoobu (made 29 Oct) but show available in PriceLabs. They are counted as booked here.
- P13's 3064856 shows Blocked on 4–7 Nov, 13–16 Nov and 27–28 Dec because those nights are booked on its linked twin 3090701. Under policy `linked_listings` they count as bookings.

### Booked vs market, next 30 and next 60 (Smoobu truth)
Market is PriceLabs `market_occupancy_next_30/60` from `pl_kpis.csv` 30 Oct. Last-30 market occupancy is UNKNOWN: `pl_kpis.csv` has no past-30 market field and kpi_pack `missing.market` = "empty".

| Ref | Booked next 30 (bk/n; blocked) | Mkt 30 | Booked next 60 (bk/n; blocked) | Mkt 60 |
|---|---|---|---|---|
| P01 | 100% (29/29) | 34% | 100% of non-blocked (33/51; 18 handback blocks) | 27% |
| P04 | 62.1% (18/29; 2 closed) / 66.7% of non-blocked | 25% | 57.6% (34/59; 2) | 20% |
| P05 | 89.7% (26/29) | 39% | 69.5% (41/59) | 37% |
| P06 | 27.6% (8/29; 14 blocked on purpose) / 53.3% of non-blocked | 45% | 8/15 non-blocked (44 blocked) | 40% |
| P08 | 78.6% (11/14, to handback 13 Nov) | 50% | same | 44% |
| P09 | 85.2% (23/27, to handback 26 Nov) | 36% | same | 31% |
| P10 | 100% (19/19, to handback 18 Nov) | 29% | same | 24% |
| P11 | 37.9% (11/29) | 46% | 35.6% (21/59) | 39% |
| P12 | 55.2% (16/29) | 40% | 45.5% (20/44, to handback 13 Dec) | 33% |
| P13 (one flat) | 62.1% (18/29) | 40% | 45.8% (27/59) | 36% |
| P14 (special setup) | 0% (0/29) | 41% | 0% (0/59) | 37% |
| P20 | 27.6% (8/29; 2 delivery) / 29.6% of non-blocked | 37% | 23.7% (14/59; 2) / 24.6% of non-blocked | 29% |

Below market on next 30: **P11** (37.9% vs 46%) and **P20** (29.6% of non-blocked vs 37%). P14 is at 0% (numbers only, per policy).

### 7-day pickup (bookings made 24–30 Oct; 30 Oct partial, none yet). Past-stay imports excluded.
**Total: 18 bookings, 84 nights, £14,502.24 room revenue.** Source: `reservations.csv` `booked_on`, confirmed rows.
- **Excluded:** the P04 Airbnb stay of 28 Sep–2 Oct (£439.20), imported 26 Oct after it had ended.
- **Also left out:** P04 Airbnb 19–20 Dec (1 n, £216.00). It came in the same 26 Oct import batch, so its real booking date is UNKNOWN. Counting it gives 19 / 85 / £14,718.24.
- kpi_pack P04 `pickup_7d` (6 / 18 / £2,197.61) includes both of these.

**Cancellations made 24–30 Oct: 4 real, 29 nights, £6,168.36 room revenue.** All four are Booking.com.
- Cancel time is Smoobu `modifiedAt` (GET /api/reservations, modified 25 Sep–30 Oct, pulled 30 Oct).
- Duplicates replaced by live bookings are left out: P04 20–23 Nov ×2 (26 Oct) and P08 27–30 Oct (27 Oct).
- **No cancellations overnight (29→30 Oct).**

**Net 7-day change: +55 nights, +£8,333.88.**

| Ref | Pickup 24–30 Oct (bk / n / £) | Cancelled 24–30 Oct (stay, n / £, cancel date) |
|---|---|---|
| P12 | 4 / 20 / £3,452.46 | 22–29 Nov 7 n / £1,314.40 (25 Oct); 18–22 Nov 4 n / £786.15 (28 Oct); 4–8 Dec 4 n / £1,116.99 (28 Oct) |
| P13 | 2 / 16 / £2,909.76 | — |
| P20 | 2 / 14 / £2,476.27 | — |
| P04 | 4 / 13 / £1,542.41 (+19–20 Dec, date unknown) | duplicates only |
| P11 | 2 / 6 / £1,221.45 | 28 Nov–12 Dec 14 n / £2,950.82 (27 Oct) |
| P08 | 2 / 9 / £1,201.60 | duplicate only |
| P05 | 1 / 3 / £893.52 | — |
| P06 | 1 / 3 / £804.77 | — |
| P01, P02, P09, P10, P14 | 0 | — |

**Overnight new bookings** (`reservations.csv` 29 Oct → 30 Oct diff; created times from Smoobu):
- **P05:** Airbnb 6–9 Nov, 3 n, £893.52 (£297.84/n), created 29 Oct 16:07. That is 0.645× the PriceLabs price in the 29 Oct `prices.csv` (464 + 466 + 456 = £1,386). It is P05's first booking made after the rise (see below). It leaves **9 Nov as a 1-night orphan**.
- **P04:** Airbnb 6–9 Nov, 3 n, £355.72, created 29 Oct 18:58. That is 0.754× the 29 Oct PriceLabs price (£472). It shows in Smoobu `reservations.csv`. Whether it came from the separate Barking Airbnb account is NOT CHECKED here (channel section).
- **P12:** Booking.com 3–7 Dec, 4 n, £1,072.44 (£268.11/n), created 29 Oct 21:04. That is 0.934× the 29 Oct PriceLabs price (273 + 301 + 310 + 264 = £1,148). It rebooks 4–6 Dec of the cancelled 4–8 Dec stay.
- These ratios use the 29 Oct snapshot price, not the price at booking time.

### Pace vs STLY
Source: `rm.metrics` / kpi_pack `pace_30`, `pace_90`. Cancelled bookings are excluded on both sides.

**P12 Mile End** is the only unit with Smoobu stays in the STLY windows.

| Measure | 29 Oct | 30 Oct |
|---|---|---|
| Pace30 (stays 30 Oct–28 Nov vs STLY) | −4 n / −7.2% | **17 n / £2,795.24 vs 22 n / £3,147.03 = −5 n / −11.2%** |
| To handback (stays 30 Oct–13 Dec vs as of 30 Oct 2025) | −13 n / −44.0% | **21 n / £3,867.68 vs 30 n / £5,028.87 = −9 n / −23.1%** |
| Pace90 (kpi_pack, not handback-aware) | −21 n / −61.7% | 21 n / £3,867.68 vs 38 n / £7,429.67 = −17 n / −47.9% |

- Pace30 slipped from −7.2% to −11.2% as the window rolled forward (the 30 Oct night is booked at £159.39, `prices.csv`; STLY gained the 28 Nov night). It is now behind STLY by more than 10%.
- The to-handback gap narrowed from −13 n to −9 n because of the 3–7 Dec booking.
- **Pace for every other unit is UNKNOWN** (no STLY stays in `reservations.csv`).

On-the-books for stays 30 Oct–28 Nov, n / £ (kpi_pack `pace_30`): P01 30 / £4,574.08; P05 26 / £11,654.52; P06 9 / £1,871.73; P08 12 / £1,584.31; P09 23 / £2,346.31; P10 20 / £2,119.28; P11 12 / £2,133.19; P13 19 / £2,665.46; P20 9 / £1,607.32; P02, P07, P14 0.

### 18 Oct base rises: running effect
**New fact today: the rises were logged at 20:33–20:43Z on 18 Oct** (PriceLabs `get_user_logs` base_price, by Reyhan):

| Ref | Old → new base | Logged (UTC) |
|---|---|---|
| P05 | 455 → 500 (18 Oct 20:33), then → 550 (20 Oct 09:26) | |
| P09 | 160 → 176 | 18 Oct 20:37 |
| P01 | 230 → 253 | 18 Oct 20:38 |
| P12 | 270 → 284 | 18 Oct 20:39 |
| P06 | 340 → 357 | 18 Oct 20:40 |
| P11 | 260 → 286 | 18 Oct 20:43 |

**Consequences of the timing:**
- **Every 18 Oct booking was made before the rise.** That includes P05 22–29 Dec (£4,527.95), whose Smoobu `created-at` is 18 Oct 03:12. So 18 Oct is now counted in the pre-rise window. This replaces yesterday's "time of rise UNKNOWN".
- **Correction to the unraised group:** the same log shows **P13 base 235 → 250 on 24 Oct 21:14Z (Reyhan)**. That change is not in policy `price_changes`, and yesterday P13 was counted as unraised. It is reported separately below.
- The P20 base cut 380 → 350 (policy, 24 Oct) does not appear in the base_price log.

**Method:**
- **Windows:** bookings made 19–29 Oct (11 full days, after the rise) vs 4–18 Oct (15 days, before it). No bookings dated 30 Oct yet.
- **Cancellations:** split at 18 Oct 20:33Z using Smoobu `modifiedAt`.
- **Bookings:** confirmed rows in `reservations.csv`, past-stay imports excluded. P04 is excluded (in Smoobu only since 20 Oct).

| Group | Made 19–29 Oct: bk / n / £ (per day) | Made 4–18 Oct: bk / n / £ (per day) | Ratio post/pre per day (bk / n / £) | Cancelled after the rise | Cancelled 4 Oct–rise |
|---|---|---|---|---|---|
| **Raised** (P01, P05, P06, P09, P11, P12) | 10 / 37 / £7,346.31 (0.91 / 3.36 / £667.85) | 13 / 91 / £18,199.03 (0.87 / 6.07 / £1,213.27) | **1.05× / 0.55× / 0.55×** | **6 / 44 n / £9,287.63**. 5 of these were booked before the rise (40 n / £8,170.64); the sixth is P12 4–8 Dec, booked and cancelled after it | 2 / 8 n / £3,179.09 (P05 27–30 Dec on 8 Oct; P12 5–10 Dec on 18 Oct 11:03) |
| **Unraised** (P02, P08, P10, P14, P20*) | 5 / 26 / £4,207.79 (0.45 / 2.36 / £382.53) | 7 / 68 / £8,054.83 (0.47 / 4.53 / £536.99) | **0.97× / 0.52× / 0.71×** | 0 real (P08 duplicate only) | 0 |
| P13 (base +6.4% on 24 Oct) | 2 / 16 / £2,909.76 (both made after its 24 Oct rise) | 6 / 24 / £3,617.87 | 0.45× / 0.91× / 1.10× | 0 | 0 |

\* P20's base was cut 380 → 350 on 24 Oct (policy).

**Per raised flat, since the rise (19–30 Oct):**
- **P01 (+10%):** 1 bk, 18–21 Dec, £720.90 (£240.30/n). Sold out next 30 (100% vs market 34%). Next 60 is 100% of the nights left before the handback blocks.
- **P05 (+20.9% in two steps):** 1 bk, 6–9 Nov, £893.52 (£297.84/n), made 29 Oct. That is the first booking at the new base after 11 days with none, and it paid 0.645× the 29 Oct PriceLabs price.
  - Next 30: 89.7% vs market 39%.
  - Next 60: 69.5% vs 37%.
  - Open after 9 Nov: 16–17 Nov, 29 Nov–2 Dec, 7–8 Dec and 13–21 Dec.
- **P06 (+5%):** 1 bk, 5–8 Nov, £804.77. The only open run before the intentional block is **8–14 Nov (7 n)**. Next 30 is 53.3% of non-blocked nights vs market 45%.
- **P09 (+10%):** 1 bk, 13–15 Nov, £253.21. Next 30 to handback (26 Nov) is 85.2% vs market 36%. Open: 31 Oct and 10–12 Nov.
- **P11 (+10%):** 2 bk, 6 n, £1,221.45 (28–31 Oct £188.46/n; 5–8 Dec £218.69/n).
  - **2 cancellations: 22 n / £4,687.23**, both booked before the rise (Jul and Sep).
  - Of the 22 released nights, 3 have been rebooked (5–7 Dec, +3.8% per night vs the cancelled stay) and 19 are still open.
  - Next 30: 37.9% vs market 46%. Next 60: 35.6% vs 39%.
  - pl_kpis occupancy next 30 went from 60% (18 Oct) to 40% (30 Oct), against market 47% → 46% (`pl_kpis.csv`, PriceLabs basis).
- **P12 (+5.2%):** 4 bk, 20 n, £3,452.46 (£108.69 / £133.27 / £202.47 / £268.11 per night). The two cheapest came after the 24 Oct markup cut, with the Booking.com promotion stack (policy `booking_discount_stack_24oct/25oct`).
  - **4 cancellations after the rise, 22 n / £4,600.40.** 3 were booked before the rise (18 n / £3,483.41); the fourth is 4–8 Dec, booked 26 Oct and cancelled 28 Oct. The 5–10 Dec cancellation (18 Oct 11:03) came before the rise.
  - Of the 24 distinct nights released since 18 Oct, **11 have been rebooked** (5–7 Nov, 21–25 Nov, 4–6 Dec) and **13 are still open** (1–4 Nov, 18–20 Nov, 26–28 Nov, 7–9 Dec).
  - Next 30: 55.2% vs market 40%. Pace30 −11.2%.

**Running line (30 Oct):**
- **Booking rate:**
  - Raised flats take as many bookings per day as before the rise (1.05×), but shorter ones: nights and revenue per day are 0.55× each.
  - Unraised flats: 0.97× bookings, 0.52× nights, 0.71× revenue per day.
  - So both groups' nights per day roughly halved. Raised revenue per day fell further (0.55× vs 0.71×). Part of that drop is the single £4,527.95 P05 booking of 18 Oct, which now sits in the pre-rise window.
- **Cancellations:**
  - Since the rise, raised flats lost **40 nights / £8,170.64 of bookings made before it**, all Booking.com and all P11/P12. They also lost the post-rise P12 4–8 Dec booking (4 n / £1,116.99).
  - Unraised flats and P13 had none.
- **Net booked since the rise** (made minus cancelled): **raised −7 nights / −£1,941.32**, unraised +26 n / +£4,207.79, P13 +16 n / +£2,909.76.
- **Not separable:**
  - The cancelled stays were priced before the rise, so their cancellation is not a guest reaction to the new price.
  - All P11/P12 post-rise bookings came after the 24 Oct Booking.com markup cut (+30% → +15%) and the Last Minute 10% (policy).
  - P05 and P06 are in the Airbnb flexible-cancellation test from 24 Oct (policy `monitoring`).

### What the 2 Nov base review should look at, per raised flat (facts to check, not price proposals)
PriceLabs `recommended_base` on 30 Oct is from `listings.csv`.

- **P01** (base 253, recommended 255):
  - Sold out to 30 Nov. After that only 18–20 Dec is open before handback, and it is booked.
  - There is nothing left to sell, so the review question is only whether the price was left too low on nights already sold.
  - The pace of the remaining inventory is not measurable.
- **P05** (base 550, recommended 548):
  - The one post-rise booking (6–9 Nov) paid 0.645× PriceLabs on Airbnb. Check how much of that gap is Smoobu Airbnb rules versus the base.
  - Whether the 9 Nov orphan sells.
  - Pickup into the open runs 29 Nov–2 Dec and 13–21 Dec.
  - Next 30 is 89.7%, so the compression signal is in the data.
- **P06** (base 357, recommended 342):
  - Only 8–14 Nov is sellable in the next 60. Check whether it is booked by 2 Nov.
  - The calendar is blocked on purpose, so occupancy is measured on 15 non-blocked nights.
- **P09** (base 176, recommended 176):
  - Only 4 open nights to handback in `prices.csv` (31 Oct, 10–12 Nov). Check whether 10–12 Nov sells.
  - Only 1 booking since the rise.
- **P11** (base 286, recommended 285):
  - Below market on next 30 and next 60.
  - 19 nights from the two cancellations are still open: 19 Nov–4 Dec and 8–11 Dec, inside the open runs 18 Nov–4 Dec (17 n) and 8–18 Dec (11 n).
  - 2 bookings since the rise.
  - The Visibility Booster (18%) is on for 1 Nov–18 Dec check-ins (policy). Look at pickup on those runs between now and 2 Nov.
- **P12** (base 284, recommended 273):
  - Pace30 is −11.2% (now Soft on both tests).
  - Open: 1–4 Nov, 12–13 Nov, 17–20 Nov, 26 Nov–2 Dec and 7–13 Dec (to handback).
  - Cancellation count after 30 Oct. The September Booking.com cohort is mostly cancelled already.
  - Paid-per-night on new Booking.com bookings vs the cancelled ones: 11 rebooked nights so far.

### Per-property table
Windows and sources:
- Occ30, ADR30 and RevPAR30: kpi_pack `last30`, 30 Sep–29 Oct.
- Fwd occ30: next 30 (31 Oct–28 Nov), Smoobu confirmed stays on the `prices.csv` calendar, handback-aware. Market is `pl_kpis.csv`.
- Pace30: kpi_pack, stays 30 Oct–28 Nov.
- Pickup 7d: bookings made 24–30 Oct, recomputed without the past-stay import.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (bk/n; mkt) | Pace30 Δ (n / rev) | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £162.31 | £162.31 | 100% (29/29; 34%) | UNKNOWN: no STLY stays. OTB 30 n | 0 / 0 / £0 | **Compressed** |
| P02 | Ladbroke Grove | 90.0% | £112.95 | £101.66 | 0% (all blocked; 47%) | UNKNOWN | 0 / 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | UNKNOWN: calendar unlabelled (50%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: in Smoobu since 20 Oct | UNKNOWN | UNKNOWN | 62.1% (18/29; 25%); 66.7% of non-blocked | UNKNOWN: no history | 4 / 13 / £1,542.41 | Unclassifiable (60–85%, no STLY); was Soft |
| P05 | St John's Wood | 66.7% | £399.43 | £266.29 | 89.7% (26/29; 39%) | UNKNOWN: no STLY. OTB 26 n | 1 / 3 / £893.52 | **Compressed** (fwd30 ≥ 85%); was Unclassifiable |
| P06 | Marylebone | 76.7% | £202.86 | £155.53 | 27.6% (8/29, 14 blocked; 45%); 53.3% of non-blocked | UNKNOWN | 1 / 3 / £804.77 | Not classified: blocked on purpose |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 nights | £0.00 | 0% (all blocked; 24%) | UNKNOWN | 0 / 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 96.7% | £161.62 | £156.23 | 78.6% (11/14 to 13 Nov; 50%) | UNKNOWN | 2 / 9 / £1,201.60 | Unclassifiable (60–85%, no STLY) |
| P09 | Greenwich | 83.3% | £119.05 | £99.21 | 85.2% (23/27 to 26 Nov; 36%) | UNKNOWN | 0 / 0 / £0 | **Compressed** (fwd30 ≥ 85%); was Unclassifiable |
| P10 | Ealing / Hanger Lane | 83.3% | £110.71 | £92.26 | 100% (19/19 to 18 Nov; 29%) | UNKNOWN | 0 / 0 / £0 | **Compressed** |
| P11 | Camden | 86.7% | £174.33 | £151.09 | 37.9% (11/29; 46%) | UNKNOWN | 2 / 6 / £1,221.45 | **Soft** (fwd30 < 60%) |
| P12 | Mile End | 83.3% | £191.30 | £159.42 | 55.2% (16/29; 40%) | **−5 n / −11.2%** | 4 / 20 / £3,452.46 | **Soft** (fwd30 < 60% and pace < −10%) |
| P13 | Shepherd's Bush (one flat) | 86.7% | £156.73 | £135.83 | 62.1% (18/29; 40%) | UNKNOWN | 2 / 16 / £2,909.76 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 nights | £0.00 | 0% (0/29; 41%) | UNKNOWN | 0 / 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 56.7% | £161.50* | £91.52* | 27.6% (8/29, 2 delivery; 37%); 29.6% of non-blocked | UNKNOWN: first stay 10 Oct | 2 / 14 / £2,476.27 | **Soft** (fwd30 < 60%) |

\* P20: the 18–22 Oct extension was paid separately (policy `separate_payments`), so ADR30 and RevPAR30 are understated.

**Class counts:**
- Compressed 4: P01, P05, P09, P10.
- On track 0.
- Soft 4: P11, P12, P14, P20.
- Unclassifiable 8: P04, P08, P13, P15–P19.
- Not classified by policy: P02, P03, P06, P07.
- **Changes since 29 Oct:**
  - P05 and P09 → Compressed (forward occupancy reached ≥ 85%).
  - P04 Soft → Unclassifiable (fwd30 51.7% → 62.1%).
  - P12 is now Soft on both tests (pace −11.2%).

**Last 365 nights** (kpi_pack `last365`, 30 Oct 2025–29 Oct 2026; occ / ADR / RevPAR / revenue):
- P01 38.1% / £178.15 / £67.84 / £24,763.32
- P02 79.7% / £128.59 / £102.52 / £37,418.99
- P05 56.2% / £373.66 / £209.86 / £76,600.49
- P06 34.2% / £238.54 / £81.69 / £29,817.27
- P07 11.5% / £133.90 / £15.41 / £5,623.70
- P08 38.6% / £175.87 / £67.94 / £24,798.32
- P09 39.2% / £115.61 / £45.30 / £16,532.84
- P10 37.3% / £114.54 / £42.68 / £15,577.27
- P11 77.0% / £174.37 / £134.24 / £48,998.27
- P12 81.9% / £191.58 / £156.94 / £57,282.27
- P13 77.5% / £158.42 / £122.83 / £44,833.28
- P14 2.7% / £409.84 / £11.23 / £4,098.40
- P20 4.7% / £161.50 / £7.52 / £2,745.52
- P03, P04 and P15–P19: UNKNOWN.

**Booking profile** (kpi_pack `booking_profile`, all confirmed bookings; bookings / median lead in days / median LOS in nights / revenue share by channel):
- P01: 21 / 15 / 5 / Airbnb 80.4%, Website 13.0%, Booking.com 6.6%
- P02: 71 / 34 / 4 / Airbnb 53.8%, Booking.com 43.0%, Direct 3.2%
- P04: 6 / 21 / 3 / Booking.com 54.0%, Airbnb 46.0% (distorted: includes the past-stay import)
- P05: 60 / 44 / 4 / Airbnb 100%
- P06: 31 / 15 / 4 / Airbnb 72.4%, Booking.com 27.6%
- P07: 5 / 3 / 4 / Airbnb 100%
- P08: 22 / 15 / 6 / Airbnb 77.3%, Booking.com 22.7%
- P09: 25 / 21 / 5 / Airbnb 58.4%, Booking.com 40.1%, Direct 1.5%
- P10: 22 / 12 / 5 / Airbnb 69.3%, Booking.com 27.6%, Website 3.1%
- P11: 70 / 28 / 4 / Booking.com 53.1%, Airbnb 44.9%, Agoda 2.0%
- P12: 83 / 31 / 4 / Booking.com 89.8%, Airbnb 10.2%
- P13: 84 / 21 / 3 / Booking.com 51.5%, Airbnb 47.6%, Agoda 0.9%
- P14: 1 / 57 / 10 / Airbnb 100%
- P20: 5 / 6 / 4 / Airbnb 100%

### Orphan gaps
Checked on the `prices.csv` calendar (31 Oct–28 Dec) with Smoobu confirmed stays overlaid, P13 as one calendar, handbacks respected, and P02, P03 and P07 left out.

**Orphans (open run shorter than the PriceLabs min stay):**
- **P05 9 Nov** (1 n, min 2, PriceLabs £426). It is new, created by the 6–9 Nov booking made 29 Oct, and sits between that stay and the next booking from 10 Nov. kpi_pack `gaps` lists the same night.

**Changed since 29 Oct:**
- **P04 1–2 Nov is no longer open.** `prices.csv` shows `available=False` with no Booked/Blocked label, so it is not sellable and not an orphan. Who closed it and why is UNKNOWN. It is consistent with policy (P04 never open for fewer than 3 nights).

**Runs exactly at the PriceLabs min stay (bookable, not orphans):**
- P04 18–19 Nov and 23–24 Nov (2 n at min 2). Policy says P04's minimum is 3. Reyhan's min-2 edit is an open conflict for Corentin, not a new finding.
- P04 2 Dec (1 n at min 1, settled by policy).
- P05 16–17 Nov and 7–8 Dec (2 n, min 2).
- P12 12–13 Nov (2 n, min 2).
- P20 31 Oct–1 Nov (2 n at min 2). Policy says min 3; Reyhan's P20 min-2 edit is the open conflict.
- P20 22–24 Nov (3 n, min 3).
- P11 23–25 Dec (3 n, min 3).
- P13 17 Nov, 27 Nov and 1 Dec (1 n, min 1; 1 Dec is settled by policy).

### Gaps to fill
- **P11:** 18 Nov–4 Dec (17 n) and 8–18 Dec (11 n) are open. Next 30 is 37.9% vs market 46%, and 19 of the 22 nights from the two Booking.com cancellations are still unsold.
- **P12:** 1–4 Nov (4 n), 12–13 Nov (2), 17–20 Nov (4), 26 Nov–2 Dec (7) and 7–13 Dec (7, to handback). Next 30 is 55.2%; pace30 −11.2%; to handback −9 n.
- **P20:** 31 Oct–1 Nov (2 n), 6–19 Nov (14 n), 22–24 Nov (3 n) and 5–9 Dec (5 n). Next 30 is 29.6% of non-blocked nights vs market 37%.
- **P05 9 Nov:** 1-night orphan at min 2.
- **P06 8–14 Nov:** the only sellable run in the next 60.
- **P13:** 31 Oct–3 Nov (4 n), 8–12 Nov (5 n) and 7–26 Dec (20 n).

Data gaps:
- **Pace vs STLY:** UNKNOWN for every unit except P12. `reservations.csv` has no stays in the STLY windows for P01, P02, P05–P11, P13, P14 and P20, and P03, P04 and P15–P19 have no history. P12 pace90 is not handback-aware. Cancelled bookings are excluded from STLY, which understates it.
- **Last 30 / 365:** UNKNOWN for P03 (not in Smoobu), P04 (Smoobu since 20 Oct) and P15–P19 (not mapped). Last-365 occupancy is understated (365-day denominator).
- **Market:**
  - Last-30 market occupancy is UNKNOWN (not in `pl_kpis.csv`; kpi_pack `missing.market` = empty).
  - ARI and RGI are UNKNOWN (`comps` empty).
- **Forward occupancy:**
  - UNKNOWN for P03 (calendar unlabelled) and P15–P19 (no prices rows).
  - `prices.csv` starts 31 Oct, so tonight (30 Oct) is not in the forward windows.
  - PriceLabs has not picked up the P04 and P05 6–8 Nov bookings.
- **Pickup:** the real booking date of P04 19–20 Dec is UNKNOWN (26 Oct import batch). kpi_pack P04 `pickup_7d` and `booking_profile` include the past-stay import.
- **Cancellations:**
  - `reservations.csv` has no cancel date. Cancel times are Smoobu `modifiedAt` (fetched for 25 Sep–30 Oct).
  - Rate plan (NR or Standard) and any cancellation fee kept on the P11 and P12 cancellations: UNKNOWN.
- **Base-rise analysis:**
  - The Smoobu `created-at` timezone is not stated. All three 18 Oct bookings (03:12–18:43) fall before 20:33Z under either UTC or UK time.
  - The P13 base rise of 24 Oct (235 → 250) is not in policy: Corentin to confirm.
  - The P20 base cut is not in the PriceLabs base_price log.
- **Paid vs PriceLabs ratios** on the overnight bookings use the 29 Oct snapshot price, not the price at booking time.
- **P04 6–9 Nov:** whether it came from the separate Barking Airbnb account is NOT CHECKED here.
