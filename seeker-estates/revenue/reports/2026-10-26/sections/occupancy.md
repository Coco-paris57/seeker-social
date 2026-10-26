## Occupancy & performance

**Portfolio, last 30 nights (26 Sep–25 Oct 2026), 13 units with Smoobu history (P01, P02, P05–P14, P20):** occupancy 70.0%, ADR £175.66, RevPAR £122.96, revenue £47,955.46 (273 nights).
- **Last 365 nights (26 Oct 2025–25 Oct 2026):** occupancy 43.9%, ADR £184.66, RevPAR £81.14, revenue £385,010.80 (2,085 nights). The occupancy is understated: every unit is divided by 365 days, but most have Smoobu history only from late 2025 or 2026.
- Source: `reports/2026-10-26/kpi_pack.json` (`portfolio_last30`, `portfolio_last365`). P03, P04 (in Smoobu only since 20 Oct) and P15–P19 are left out, not counted as zero.

**Forward next 30 (27 Oct–24 Nov; prices.csv starts 27 Oct), handback-aware: 171 of 312 non-blocked nights booked = 54.8%** across 13 units. Yesterday it was 52.7% (166/315, 26 Oct–23 Nov).
- Sources: kpi_pack `forward_occ_30` × nights, and Blocked counts from `data/snapshots/2026-10-26/prices.csv`.
- Left out: P03 (nights unlabelled), P07 (fully blocked on purpose), and blocked nights in general (P02, P06 intentional; P05 27–28 Oct and P20 20–21 Nov delivery).

**7-day pickup (bookings made 20–26 Oct; kpi_pack `pickup_7d`): 7 bookings, 28 nights, £4,069.85.**
- P12: 2 bookings, 11 n, £1,367.66
- P06: 1, 3 n, £804.77
- P08: 1, 5 n, £676.60
- P20: 1, 3 n, £529.92
- P04: 1, 4 n, £437.69
- P09: 1, 2 n, £253.21
- No booking was made on 26 Oct up to the Smoobu pull.

### Overnight change (25 Oct → 26 Oct, `reservations.csv` diff)
- **Added:**
  - P06: Airbnb 5–8 Nov, 3 n, £804.77
  - P08: Airbnb 31 Oct–5 Nov, 5 n, £676.60
  - P12: Booking.com 26–30 Oct, 4 n, £434.76
  - All three were made 25 Oct.
- **Status change:** P12 Booking.com 22–29 Nov (7 n, £1,314.40, made 15 Sep) went from confirmed to **cancelled**.
- **Window effects only:**
  - P09 Booking.com 24–25 Apr 2027 (made 14 Jul) entered the file. It falls after P09's handback, so it is ignored.
  - P12 21–25 Oct 2025 (£533.79) left the file.
- **PriceLabs lag:** PriceLabs still shows the new P06 5–7 Nov and P08 31 Oct–4 Nov nights as open.
  - Source: `prices.csv`, and `get_listing_prices` for P06 (`last_refreshed_at` 2026-10-25T07:59).
  - Both were booked in Smoobu after that refresh. The kpi_pack forward figures already count them as booked.

### Review of the 18 Oct base rises: bookings made 18–26 Oct (9 days) vs 4–17 Oct (14 days)
How this was built:
- Source: `data/snapshots/2026-10-26/reservations.csv` `booked_on`. Confirmed bookings only. A booking made in the window and since cancelled is noted separately.
- `booked_on` is a date with no time. Bookings made on 18 Oct sit in the "after" window, but whether they came before or after the rise is UNKNOWN.
- 26 Oct is a partial day.
- "Booked next 30 vs market" uses kpi_pack `forward_occ_30` / `market_occ_30` (PriceLabs market occupancy, next 30). The 18 Oct value is from `reports/2026-10-18/kpi_pack.json`. Both are rolling windows, so the two dates cover different nights.

| Ref (base) | Made 18–26 Oct: bk / n / £ (per day bk / n / £) | Made 4–17 Oct: bk / n / £ (per day) | Booked next 30 vs mkt: 18 Oct → 26 Oct | Open nights next 30 |
|---|---|---|---|---|
| P01 (253) | 1 / 3 / £720.90 (0.11 / 0.33 / £80.10): 19 Oct, Airbnb 18–21 Dec | 1 / 30 / £4,563.90 (0.07 / 2.14 / £325.99) | 100% vs 34% → 100% vs 34% | 0 (sold out to handback) |
| P05 (500, 550 from 20 Oct) | 1 / 7 / £4,527.95 (0.11 / 0.78 / £503.11): **made 18 Oct, before or after the rise UNKNOWN**. **None since 18 Oct, so none at £550.** | 1 / 4 / £1,835.10 (0.07 / 0.29 / £131.08); plus 1 made 5 Oct, since cancelled | 69.0% vs 32% → 65.5% vs 39% | 8: 29–30 Oct, 6–9 Nov, 16–17 Nov |
| P06 (357) | 1 / 3 / £804.77 (0.11 / 0.33 / £89.42): 25 Oct, Airbnb 5–8 Nov | 4 / 18 / £3,400.07 (0.29 / 1.29 / £242.86); plus 1 made 15 Oct, since cancelled | 48.3% vs 43% → 41.4% vs 44% (100% of non-blocked) | 0 (rest blocked on purpose) |
| P09 (176) | 1 / 2 / £253.21 (0.11 / 0.22 / £28.13): 23 Oct, Airbnb 13–15 Nov | 3 / 23 / £2,371.55 (0.21 / 1.64 / £169.40) | 58.6% vs 38% → 72.4% vs 36% | 8: 27–31 Oct, 10–12 Nov (to handback 26 Nov) |
| P11 (286) | **0** | 1 / 4 / £650.48 (0.07 / 0.29 / £46.46), made 4 Oct | 58.6% vs 47% → **41.4% vs 44%** | 17 |
| P12 (284) | 2 / 11 / £1,367.66 (0.22 / 1.22 / £151.96): Booking.com 24 Oct (5–12 Nov) and 25 Oct (26–30 Oct) | 2 / 5 / £849.98 (0.14 / 0.36 / £60.71) | 58.6% vs 41% → 65.5% vs 40% | 10 |
| **Raised, total** | **6 / 26 / £7,674.49 (0.67 / 2.89 / £852.72)**. Without P05's 18 Oct booking: 5 / 19 / £3,146.54 (0.56 / 2.11 / £349.62) | **12 / 84 / £13,671.08 (0.86 / 6.00 / £976.51)** | | 43 |

**Unraised flats, same windows:**
- Units: P02, P08, P10, P13, P14, P20.
- Left out: P04 (in Smoobu only since 20 Oct, so its 4–17 Oct window is UNKNOWN; it had 1 / 4 / £437.69 on 24 Oct) and P03/P07 (blocked).

| Ref | Made 18–26 Oct | Made 4–17 Oct | Booked next 30 vs mkt: 18 Oct → 26 Oct |
|---|---|---|---|
| P02 | 0 | 2 / 10 / £1,064.94 | 31.0% → 3.4% (blocked on purpose) |
| P08 | 1 / 5 / £676.60 | 1 / 6 / £776.46 | 44.8% vs 50% → 61.1% vs 51% (to handback 13 Nov) |
| P10 | 0 | 2 / 37 / £3,821.19 | 100% → 100% (sold out to handback) |
| P13 | 2 / 7 / £1,116.61 (both 18 Oct) | 4 / 17 / £2,501.26 | 58.6% vs 42% → 41.4% vs 40% |
| P14 | 0 | 0 | 0% → 0% |
| P20 | 1 / 3 / £529.92; plus 1 Direct booking made 19 Oct, since cancelled | 2 / 15 / £2,392.24 | — → 10.3% vs 36% |
| **Unraised, total** | **4 / 15 / £2,323.13 (0.44 / 1.67 / £258.13 per day)** | **11 / 85 / £10,556.09 (0.79 / 6.07 / £754.01 per day)** | |

**What the data shows (no price advice):**
- **Bookings per day fell in both groups:**
  - Raised flats: down to 0.78× the earlier rate (0.67 vs 0.86).
  - Unraised flats: down to 0.56× (0.44 vs 0.79).
  - Revenue per day: raised 0.87×, unraised 0.34×.
  - If P05's 18 Oct booking (timing UNKNOWN) is removed, raised flats fall to 0.65× in bookings and 0.36× in revenue, which is close to the unraised group.
  - So the data does not isolate a rise effect: the whole portfolio slowed over the same 9 days.
- **Booked next 30 rose since 18 Oct on P09 (+13.8 pts) and P12 (+6.9 pts). It fell on P11 (−17.2 pts, now at market), P05 (−3.5 pts, still 26 pts above market) and P06 (on blocks).**
- **P11 Camden has had no booking since 4 Oct (22 days).** It has 17 open nights in the next 30, and its forward occupancy has slipped below market (41.4% vs 44%).
- **P05 has had no booking since the £550 base (20 Oct).** The a-review-1026 condition (a booking by end of 26 Oct) was not met as of this snapshot.
- Supply limits the comparison:
  - P01 and P10 are sold out to handback.
  - P06 has no open nights left (P06 is in the Airbnb flexible-cancellation test from 24 Oct, policy `monitoring`; this is its only booking since).
  - P02 is blocked on purpose.

### P12 22–29 Nov cancellation: effect
Recomputed with `rm.metrics.pace_vs_stly` / `on_the_books` on `reservations.csv`, both as it stands and with that booking restored. The counterfactual is shown only to measure the effect.

| Measure | Now | Without the cancellation | Effect |
|---|---|---|---|
| Pace30 (stays 26 Oct–24 Nov vs STLY 21 n / £3,026.29) | 20 n / £3,003.79 = **−1 n / −0.7%** | 23 n / £3,567.10 = +2 n / +17.9% | −3 n, −£563.31. **Class moves from Compressed to On track** |
| To handback (stays 26 Oct–13 Dec vs STLY 31 n / £5,251.81) | 20 n / £3,003.79 = **−11 n / −42.8%** | 27 n / £4,318.19 = −4 n / −17.8% | −7 n, −£1,314.40 |
| Pace90, kpi_pack (stays 26 Oct–23 Jan, not handback-aware; STLY 39 n / £7,652.61) | −19 n / −60.7% | −12 n / −43.6% | the STLY side includes nights after the 13 Dec handback |
| Booked next 30 (kpi_pack, 29 nights) | 65.5% (19/29) | 75.9% (22/29) | −10.3 pts |

- **Run-rate since yesterday (to handback):**
  - Yesterday: 24 n / £4,122.72 (`reports/2026-10-25/sections/occupancy.md`).
  - Changes: −1 night for 25 Oct leaving the window (£239.29), −7 n / −£1,314.40 for the cancellation, +4 n / +£434.76 for the 26–30 Oct booking.
  - Today: 20 n / £3,003.79.
- **The new 26–30 Oct booking paid £108.69/night, against £186.38/night for the cancelled stay.**
- **P12 has 3 cancelled Booking.com stays in the period up to handback:** 1–8 Nov (−£1,382.86, cancellation found 24 Oct), 22–29 Nov (−£1,314.40, found 26 Oct) and 5–10 Dec (£1,292.09, date of cancellation unknown). reservations.csv holds no cancellation dates.
- **Open nights to handback:** 1–4 Nov, 12–13 Nov, 17 Nov, and 22 Nov–13 Dec (22 nights in one run). The cancellation reopened 22–28 Nov, joining the existing open run from 29 Nov. No orphan was created.
- Last year's same booking windows for P12, for context (`reservations.csv`, P12 is the only unit with 2025 bookings): made 18–26 Oct 2025 = 2 / 7 n / £1,241.78; made 4–17 Oct 2025 = 6 / 20 n / £4,071.61.

### Per-property table
Windows and sources:
- Occ30, ADR30 and RevPAR30: last 30 nights, 26 Sep–25 Oct (kpi_pack `last30`).
- Fwd occ30: kpi_pack `forward_occ_30`, 27 Oct–24 Nov, handback-aware. Brackets show booked/nights, blocked nights, and PriceLabs market occupancy next 30.
- Pace30: kpi_pack `pace_30`, stays 26 Oct–24 Nov vs the same window as it stood on 26 Oct 2025.
- Pickup 7d: kpi_pack `pickup_7d`, bookings made 20–26 Oct.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (bk/n; blocked; mkt) | Pace30 Δ (n / rev) | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £162.31 | £162.31 | 100% (29/29; 0; 34%) | UNKNOWN: no STLY in Smoobu. OTB 30 n / £4,614.82 | 0 / 0 / £0 | **Compressed** (sold out to handback) |
| P02 | Ladbroke Grove | 96.7% | £116.06 | £112.19 | 3.4% (1/29; 27 blocked; 47%) | UNKNOWN: no STLY. OTB 2 n / £208.62 | 0 / 0 / £0 | Not classified: intentional block |
| P03 | Bayswater | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN (unlabelled; 48%) | UNKNOWN | UNKNOWN | Not classified: intentional block, inputs missing |
| P04 | Barking | UNKNOWN (Smoobu since 20 Oct) | UNKNOWN | UNKNOWN | 31.0% (9/29; 0; 25%) | UNKNOWN: no history | 1 / 4 / £437.69 | **Soft** (fwd < 60%) |
| P05 | St John's Wood | 76.7% | £396.68 | £304.12 | 65.5% (19/29; 2 delivery; 39%). 70.4% of non-blocked | UNKNOWN: no STLY. OTB 20 n / £8,688.93 | 0 / 0 / £0 | **Unclassifiable** (60–85%, no STLY) |
| P06 | Marylebone | 66.7% | £208.30 | £138.87 | 41.4% (12/29; 17 blocked; 44%). 100% of non-blocked | UNKNOWN: no STLY. OTB 13 n / £2,583.04 | 1 / 3 / £804.77 | Not classified: intentional block |
| P07 | Woolwich | 0.0% | UNKNOWN (0 n) | £0.00 | 0% (0/29; 29 blocked; 23%) | UNKNOWN | 0 / 0 / £0 | Not classified: intentional block |
| P08 | Islington | 100.0% | £165.71 | £165.71 | 61.1% (11/18 to handback 13 Nov; 0; 51%) | UNKNOWN: no STLY. OTB 11 n / £1,453.06 | 1 / 5 / £676.60 | **Unclassifiable** (60–85%, no STLY). Was Soft |
| P09 | Greenwich | 93.3% | £118.86 | £110.94 | 72.4% (21/29; 0; 36%) | UNKNOWN: no STLY. OTB 21 n / £2,140.89 | 1 / 2 / £253.21 | **Unclassifiable** (60–85%, no STLY) |
| P10 | Ealing / Hanger Lane | 83.3% | £114.23 | £95.19 | 100% (23/23 to handback 18 Nov; 0; 30%) | UNKNOWN: no STLY. OTB 24 n / £2,543.14 | 0 / 0 / £0 | **Compressed** (sold out to handback) |
| P11 | Camden | 80.0% | £168.05 | £134.44 | 41.4% (12/29; 0; 44%) | UNKNOWN: no STLY. OTB 13 n / £2,309.05 | 0 / 0 / £0 | **Soft** (fwd < 60%) |
| P12 | Mile End | 73.3% | £204.54 | £149.99 | 65.5% (19/29; 0; 40%) | **−1 n / −0.7%** (OTB 20 n / £3,003.79 vs STLY 21 n / £3,026.29) | 2 / 11 / £1,367.66 | **On track** (would be Compressed, +17.9%, without the 22–29 Nov cancellation). To handback −42.8% |
| P13 | Shepherd's Bush (one flat, 2 listings) | 90.0% | £161.12 | £145.01 | 41.4% (12/29; 0; 40%) | UNKNOWN: no STLY. OTB 12 n / £1,732.04 | 0 / 0 / £0 | **Soft** (fwd < 60%) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN (0 n) | £0.00 | 0% (0/29; 0; 40%) | UNKNOWN | 0 / 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford Court) | 50.0% | £159.48* | £79.74* | 10.3% (3/29; 2 delivery; 36%) | UNKNOWN: no STLY. OTB 3 n / £529.92 | 1 / 3 / £529.92 | **Soft** (fwd < 60%) |

\* P20: the 18–22 Oct extension nights were paid separately (policy `separate_payments`), so ADR30 and RevPAR30 are understated.

**Class counts:**
- Compressed 2: P01, P10.
- On track 1: P12.
- Soft 5: P04, P11, P13, P14, P20.
- Unclassifiable 8: P05, P08, P09 and P15–P19.
- Not classified by policy: P02, P03, P06, P07.

**Forward 60** (kpi_pack `forward_occ_60`, 27 Oct–25 Dec, handback-aware; PriceLabs market next 60):

| Ref | Fwd occ 60 | Market next 60 |
|---|---|---|
| P01 | 67.3% | 26% |
| P04 | 40.7% | 20% |
| P05 | 57.6% | 37% |
| P06 | 20.3% | 41% (blocked on purpose) |
| P08 | 61.1% | 44% |
| P09 | 74.2% | 31% |
| P10 | 100% | 24% |
| P11 | 50.8% | 38% |
| P12 | 39.6% | 32% |
| P13 | 33.9% | 36% |
| P14 | 0% | 38% |
| P20 | 5.1% | 28% |

**Last 365 nights** (kpi_pack `last365`, 26 Oct 2025–25 Oct 2026; denominator 365):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 37.0% | £178.62 | £66.07 | £24,114.06 |
| P02 | 79.2% | £128.76 | £101.95 | £37,210.37 |
| P05 | 55.9% | £373.46 | £208.73 | £76,186.67 |
| P06 | 33.2% | £240.55 | £79.74 | £29,105.96 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 37.8% | £176.84 | £66.86 | £24,404.57 |
| P09 | 39.2% | £115.61 | £45.30 | £16,532.84 |
| P10 | 36.2% | £114.80 | £41.52 | £15,153.41 |
| P11 | 75.9% | £174.21 | £132.21 | £48,257.03 |
| P12 | 81.9% | £192.24 | £157.48 | £57,481.24 |
| P13 | 76.7% | £158.75 | £121.78 | £44,450.31 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 | 4.1% | £159.48 | £6.55 | £2,392.24 |

P03, P04 and P15–P19: UNKNOWN.

**Booking profile** (kpi_pack `booking_profile`; median lead time in days, median length of stay in nights, revenue share by channel):

| Ref | Bookings | Lead time | LOS | Revenue share by channel |
|---|---|---|---|---|
| P01 | 21 | 15 | 5 | Airbnb 80.4%, Website 13.0%, Booking.com 6.6% |
| P02 | 71 | 34 | 4 | Airbnb 53.8%, Booking.com 43.0%, Direct 3.2% |
| P04 | 1 | 21 | 4 | Booking.com 100% |
| P05 | 59 | 44 | 4 | Airbnb 100% |
| P06 | 31 | 15 | 4 | Airbnb 72.4%, Booking.com 27.6% |
| P07 | 5 | 3 | 4 | Airbnb 100% |
| P08 | 21 | 15 | 6 | Airbnb 76.8%, Booking.com 23.2% |
| P09 | 25 | 21 | 5 | Airbnb 58.4%, Booking.com 40.1%, Direct 1.5% |
| P10 | 22 | 12 | 5 | Airbnb 69.3%, Booking.com 27.6%, Website 3.1% |
| P11 | 69 | 28 | 4 | Booking.com 54.5%, Airbnb 43.6%, Agoda 1.9% |
| P12 | 83 | 31 | 4 | Booking.com 89.7%, Airbnb 10.3% |
| P13 | 82 | 21 | 3 | Booking.com 52.3%, Airbnb 46.8%, Agoda 0.9% |
| P14 | 1 | 57 | 10 | Airbnb 100% |
| P20 | 3 | 5 | 3 | Airbnb 100% |

### Orphan gaps
**None.** kpi_pack `gaps` is empty for every unit.
- Recheck: `prices.csv`, handback-aware, with today's Smoobu bookings overlaid (because of the PriceLabs lag on P06 and P08) and the P13 twins linked. No open run between two unavailable nights is shorter than its min stay.
- Runs exactly at the min stay (not orphans):
  - P05: 29–30 Oct, 16–17 Nov, 7–8 Dec (2 n, min 2)
  - P12: 12–13 Nov (2 n, min 2)
- Policy-settled single nights are not listed: P04 2 Dec, P12 17 Nov, P13 1 Dec.
- The P06 5–7 Nov and P08 31 Oct–4 Nov runs are now booked.

### Gaps to fill
- STLY for every unit except P12. Smoobu history starts after Oct 2025, and the pack's `stly_nights: 0` means missing history, not a real zero.
- The time of day on `booked_on`. Without it, 18 Oct bookings (P05 £4,527.95; P13 ×2) cannot be placed before or after the rise.
- Cancellation dates (not in reservations.csv).
- PriceLabs has not refreshed since the 25 Oct bookings (P06, P08 still shown open).
- P03 forward occupancy, and all data for P15–P19.
- Not checked in this section: whether a-discount-cut was applied (get_customizations), which is left to the pricelabs section.

Data gaps:
- Pace vs STLY (30/90): UNKNOWN for P01, P02, P05–P11, P13, P14, P20, because reservations.csv has no bookings for the STLY window. For P03, P04 and P15–P19 it is UNKNOWN for lack of history.
- Last 30 / 365: UNKNOWN for P03 (not in Smoobu), P04 (`smoobu_since` 2026-10-20, `data/id_map.json`) and P15–P19 (not mapped). Last-365 occupancy is understated (365-day denominator).
- Pre-rise window (4–17 Oct) for P04: UNKNOWN (P04 was not yet in Smoobu).
- Forward occupancy: UNKNOWN for P03 (unlabelled) and P15–P19 (no prices rows). prices.csv has no row for 26 Oct.
- Market: kpi_pack `missing` lists market, comps and channel_checks as empty. Market occupancy is PriceLabs `market_occ_30/60`. ARI and RGI are UNKNOWN.
- `booked_on` has dates only. 26 Oct covers the time up to the Smoobu pull only.
- P20 ADR30 and RevPAR30 are understated (separately paid nights, per policy).
