## Occupancy & performance

**Portfolio, last 30 nights (25 Sep–24 Oct 2026), 13 units with Smoobu history (P01, P02, P05–P14, P20): occupancy 70.3%, ADR £175.56, RevPAR £123.34, revenue £48,104.45 (274 nights).** Last 365 nights (25 Oct 2025–24 Oct 2026): occupancy 43.8%, ADR £184.61, RevPAR £80.85, revenue £383,629.46 (2,078 nights). Source: `reports/2026-10-25/kpi_pack.json` (`portfolio_last30`, `portfolio_last365`). P03, P04 (in Smoobu only since 20 Oct) and P15–P19 are left out, not counted as zero. The last-365 occupancy is understated (see Data gaps): the denominator is 365 days for every unit, but most units have Smoobu stays only from Nov 2025–May 2026 onward.

**Forward, handback-aware** (recomputed from `data/snapshots/2026-10-25/prices.csv` with the pack's handback filter; PriceLabs `booking_status` matches the Smoobu stays in `reservations.csv` on every night checked, 26 Oct–23 Nov, 13 units). prices.csv starts 26 Oct, so "next 30" = 26 Oct–23 Nov (29 nights) and "next 60" = 26 Oct–23 Dec. Blocked nights (intentional blocks, P01 handback set, P05 27–28 Oct delivery, P20 20–21 Nov delivery) taken out; P03 (no Booked/Blocked labels) and P07 (fully blocked) left out.
- Next 30: **166 of 315 non-blocked nights Booked = 52.7%** (13 units). Yesterday's comparable figure was 51.4% (window 24 Oct–22 Nov, `reports/2026-10-24/sections/occupancy.md`).
- Next 60: **238 of 527 = 45.2%**.

**7-day pickup (bookings made 19–25 Oct; 25 Oct only up to the 06:54 Smoobu pull): 5 bookings, 19 nights, £2,874.62** (sum of kpi_pack `pickup_7d`): P01 1 (Airbnb, 19 Oct), P20 1 (Airbnb, 21 Oct), P09 1 (Airbnb, 23 Oct), P12 1 and P04 1 (both Booking.com, 24 Oct). P04's 20 Oct Smoobu import rows are excluded by the pack.

### Overnight change (24 Oct → 25 Oct snapshot)
- `reservations.csv`: 3 rows added, none removed or changed.
  - **P12 Mile End:** Booking.com, 5–12 Nov, 7 n, £932.90 (£133.27/night), made 24 Oct.
  - **P04 Barking:** Booking.com, 14–18 Nov, 4 n, £437.69 (£109.42/night), made 24 Oct.
  - P09: Booking.com 23–24 Apr 2027, made 13 Jul. This is a window effect only (Dispatcher) and is after P09's handback. It is left out.
- `prices.csv` (overlapping dates):
  - The P12 5–11 Nov, P04 14–17 Nov and P09 13–14 Nov nights are now Booked. The P09 lag noted yesterday has cleared.
  - **P08 26 Oct changed from open to Blocked.** The reason is not in the data.
  - P09 26–31 Oct min stay 2 → 3.
  - P13 13–16 Nov min stay 3 → 2 on both listings (3064856, 3090701).
  - 23 Dec min stay 4 → 3 on P06, P07, P09, P12, P14.

### Raised flats (18 Oct base rises): bookings made 19–25 Oct vs the 14 days before (5–18 Oct)
Source: `data/snapshots/2026-10-25/reservations.csv` `booked_on`, which is a date with no time. The 18 Oct rise day sits in the "before" window. The one booking made that day (P05) is shown separately because whether it came before or after the rise is not in the data. Booked next 30 and market are kpi_pack `forward_occ_30` / `market_occ_30` (PriceLabs market occupancy, next 30). Open nights are from prices.csv and are handback-aware.

| Ref | Base (policy) | Booked next 30 vs market | Made 19–25 Oct | Made 5–18 Oct (confirmed; cancelled) | Open nights next 30 / 60 |
|---|---|---|---|---|---|
| P01 Canary Wharf | 253 | 100% (29/29) vs 33% | 1: 19 Oct, Airbnb, 18–21 Dec, 3 n, £720.90 | 1: 15 Oct, Airbnb, 31 Oct–30 Nov, 30 n, £4,563.90; 0 cancelled | 0 / 0 (sold out to handback 20 Dec) |
| P05 St John's Wood | 500, then 550 on 20 Oct | 65.5% (19/29; 70.4% of non-blocked) vs 38% | **0** | 2: 10 Oct, 18–22 Nov, 4 n, £1,835.10; **18 Oct**, 22–29 Dec, 7 n, £4,527.95 (made before or after the rise: UNKNOWN). 1 cancelled (made 5 Oct, 27–30 Dec) | 8 / 23 |
| P06 Marylebone | 357 | 34.5% (10/29; 76.9% of non-blocked) vs 44% | **0** | 4 confirmed, 18 n, £3,400.07; 1 cancelled (made 15 Oct, 25–30 Oct) | 3 / 3 (5–7 Nov; the rest is blocked on purpose) |
| P09 Greenwich | 176 | 69.0% (20/29) vs 36% | 1: 23 Oct, Airbnb, 13–15 Nov, 2 n, £253.21 | 2 confirmed, 14 n, £1,510.95; 0 cancelled | 9 / 9 (26–31 Oct, 10–12 Nov; handback after 26 Nov) |
| P11 Camden | 286 (13–17 Dec raised 21 Oct) | 44.8% (13/29) vs 44% | **0** | **0**. Last booking made 4 Oct, so 21 days without one | 16 / 28 |
| P12 Mile End | 284 | 62.1% (18/29) vs 40% | 1: 24 Oct, Booking.com, 5–12 Nov, 7 n, £932.90 | 2 confirmed, 5 n, £849.98; 0 cancelled | 11 / 26 (to handback 13 Dec) |
| **Total** | | | **3 bookings, 12 n, £1,907.01** | **11 confirmed, 78 n, £16,687.95; 2 cancelled** | 47 / 89 |

- **Booking rate:** 0.43 per day made 19–25 Oct (3 in 7 days, the last day partial) vs 0.79 per day made 5–18 Oct (11 confirmed in 14 days). Counting the 2 later-cancelled bookings, it was 0.93 per day.
- **Cancellations of earlier bookings found during the post-rise week** (reported in `reports/2026-10-24/sections/occupancy.md`): P12 1–8 Nov (−7 n, −£1,382.86) and P11 19–27 Nov (−8 n, −£1,736.41). reservations.csv does not hold a cancellation date.
- **No booking since the rise on P05, P06 or P11.**
  - P06 has only 3 open nights in the next 60, so its zero says little about demand.
  - P05 has had no booking since the £550 base (20 Oct). It still has 8 open nights in the next 30.
  - P11 sits at market (44.8% vs 44%) with no booking for 21 days.
- **Units without a rise, same windows (19–25 Oct vs 5–18 Oct):**

  | Ref | Made 19–25 Oct | Made 5–18 Oct |
  |---|---|---|
  | P04 | 1 (24 Oct) | 0 (import rows excluded) |
  | P20 | 1 (21 Oct), plus 1 since cancelled | 2 |
  | P13 | 0 (last made 18 Oct) | 6 |
  | P08 | 0 | 1 |
  | P10 | 0 | 2 |
  | P02 | 0 | 2 |

  Across the whole portfolio the booking rate also fell in the post-rise week, so the drop is not specific to the raised flats.

### Per-property table
Windows and sources:
- Occ30, ADR30 and RevPAR30: last 30 nights, 25 Sep–24 Oct (kpi_pack `last30`).
- Fwd occ30: kpi_pack `forward_occ_30` (Booked ÷ nights, 26 Oct–23 Nov, handback-aware). Brackets show booked/nights, Blocked nights, and PriceLabs market occupancy for the next 30.
- Pace30: kpi_pack `pace_30`, stays 25 Oct–23 Nov vs the same window as it stood on 25 Oct 2025.
- Pickup 7d: kpi_pack `pickup_7d`, bookings made 19–25 Oct.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (booked/nights; blocked; mkt) | Pace30 Δ (nights / rev) | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £162.31 | £162.31 | 100.0% (29/29; 0; 33%) | UNKNOWN: no STLY bookings in Smoobu (first stay May 2026). OTB 30 n / £4,625.00 | 1 / 3 / £720.90 | **Compressed** (0 open nights to handback) |
| P02 | Ladbroke Grove | 96.7% | £116.98 | £113.08 | 6.9% (2/29; 26 blocked on purpose; 47%). 66.7% of non-blocked | UNKNOWN: no STLY. OTB 3 n / £312.93 | 0 / 0 / £0 | Not classified: intentional block (policy) |
| P03 | Bayswater | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN: not in Smoobu, no Booked/Blocked labels (49%) | UNKNOWN | UNKNOWN | Not classified: intentional block; inputs missing |
| P04 | Barking | UNKNOWN (Smoobu since 20 Oct) | UNKNOWN | UNKNOWN | 34.5% (10/29; 0; 26%). Was 20.7% | UNKNOWN: no history | 1 / 4 / £437.69 | **Soft** (fwd < 60%) |
| P05 | St John's Wood (4-bed) | 76.7% | £397.42 | £304.69 | 65.5% (19/29; 2 delivery; 38%). 70.4% of non-blocked | UNKNOWN: no STLY. OTB 20 n / £8,481.28 | 0 / 0 / £0 | **Unclassifiable** (60–85%, no STLY) |
| P06 | Marylebone | 66.7% | £209.99 | £139.99 | 34.5% (10/29; 16 blocked on purpose; 44%). 76.9% of non-blocked | UNKNOWN: no STLY. OTB 11 n / £1,956.10 | 0 / 0 / £0 | Not classified: intentional block (policy) |
| P07 | Woolwich | 0.0% | UNKNOWN (0 nights) | £0.00 | 0.0% (0/29; 29 blocked on purpose; 24%) | UNKNOWN: no STLY. OTB 0 | 0 / 0 / £0 | Not classified: intentional block (policy) |
| P08 | Islington | 100.0% | £166.13 | £166.13 | 31.6% (6/19 to handback 13 Nov; 1 blocked: 26 Oct, new; 51%) | UNKNOWN: no STLY. OTB 7 n / £933.28 | 0 / 0 / £0 | **Soft** (12 open nights to handback) |
| P09 | Greenwich | 96.7% | £119.77 | £115.77 | 69.0% (20/29; 0; 36%) | UNKNOWN: no STLY. OTB 20 n / £2,038.18 | 1 / 2 / £253.21 | **Unclassifiable** (60–85%, no STLY) |
| P10 | Ealing / Hanger Lane | 80.0% | £114.57 | £91.66 | 100.0% (24/24 to handback 18 Nov; 0; 31%) | UNKNOWN: no STLY. OTB 25 n / £2,649.10 | 0 / 0 / £0 | **Compressed** (0 open nights to handback) |
| P11 | Camden | 80.0% | £165.64 | £132.52 | 44.8% (13/29; 0; 44%) | UNKNOWN: no STLY (Smoobu from Dec 2025). OTB 14 n / £2,491.21 | 0 / 0 / £0 | **Soft** (fwd < 60%) |
| P12 | Mile End | 73.3% | £200.57 | £147.09 | **62.1% (18/29; 0; 40%). Was 37.9%** | **−3 n / −0.1%** (OTB 19 n / £3,183.86 vs STLY 22 n / £3,187.45) | 1 / 7 / £932.90 | **On track** (revenue within ±10%; nights −13.6%). Was Soft yesterday (−26.8%) |
| P13 | Shepherd's Bush (one flat, 2 listings) | 93.3% | £161.25 | £150.50 | 41.4% (12/29; 0; 41%) | UNKNOWN: no STLY (Smoobu from Dec 2025). OTB 12 n / £1,732.04 | 0 / 0 / £0 | **Soft** (fwd < 60%) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN (0 nights) | £0.00 | 0.0% (0/29; 0; 40%) | UNKNOWN: no STLY. OTB 0 | 0 / 0 / £0 | **Soft** (numbers only, per policy) |
| P15 | Bow / Devons Road | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P16 | Little Venice | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P17 | St John's Wood | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P18 | Fulham | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P19 | Kings Langley | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford Court) | 50.0% | £159.48* | £79.74* | 10.3% (3/29; 2 delivery; 35%). 11.1% of non-blocked | UNKNOWN: no STLY (new listing). OTB 3 n / £529.92 | 1 / 3 / £529.92 | **Soft** (fwd < 60%) |

\* P20: the 18–22 Oct extension nights were paid separately (policy `separate_payments`), so ADR30 and RevPAR30 are understated.

**Class counts:**
- Compressed 2: P01, P10. Both are sold out to handback.
- On track 1: P12.
- Soft 6: P04, P08, P11, P13, P14, P20.
- Unclassifiable 7: P05 and P09 (no STLY), and P15–P19 (no data).
- Not classified by policy: P02, P03, P06, P07.

**P12 pace, more detail** (recomputed from reservations.csv with `rm.metrics.on_the_books`):
- To handback (stays 25 Oct–13 Dec): OTB 24 n / £4,122.72 vs STLY 32 n / £5,412.97, i.e. **−8 n / −23.8%**.
- kpi_pack `pace_90` (stays 25 Oct–22 Jan, not handback-aware) shows −16 n / −47.2% (£4,122.72 vs £7,813.77). The STLY side of that includes 14 Dec–22 Jan nights that are not inventory this year.

**Pace90 for the other units:** UNKNOWN, because there are no STLY bookings in Smoobu. OTB nights / revenue (kpi_pack `pace_90`):

| Ref | OTB nights | OTB revenue |
|---|---|---|
| P01 | 39 | £6,258.68 |
| P02 | 3 | £312.93 |
| P05 | 45 | £22,962.85 |
| P06 | 11 | £1,956.10 |
| P08 | 7 | £933.28 |
| P09 | 23 | £2,346.31 |
| P10 | 25 | £2,649.10 |
| P11 | 40 | £8,783.08 |
| P13 | 20 | £3,145.68 |
| P20 | 3 | £529.92 |

P04 pace is UNKNOWN (pack: in Smoobu since 20 Oct).

**Forward 60** (kpi_pack `forward_occ_60`, 26 Oct–23 Dec, handback-aware; booked/nights from prices.csv; PriceLabs market next 60):

| Ref | Fwd occ 60 | Booked / nights | Market next 60 | Note |
|---|---|---|---|---|
| P01 | 67.9% | 38/56 | 26% | 100% of non-blocked: the 18 Blocked nights are the 30 Nov–17 Dec handback set |
| P02 | 3.4% | 2/59 | 41% | blocked on purpose |
| P04 | 40.7% | 24/59 | 20% | |
| P05 | 57.6% | 34/59 | 36% | |
| P06 | 16.9% | 10/59 | 40% | blocked on purpose |
| P07 | 0% | | 19% | blocked on purpose |
| P08 | 31.6% | 6/19 | 44% | to 13 Nov |
| P09 | 71.9% | 23/32 | 31% | to 26 Nov |
| P10 | 100% | 24/24 | 25% | to 18 Nov |
| P11 | 52.5% | 31/59 | 38% | |
| P12 | 46.9% | 23/49 | 32% | to 13 Dec |
| P13 | 33.9% | 20/59 | 35% | |
| P14 | 0% | 0/59 | 37% | |
| P20 | 5.1% | 3/59 | 28% | |

**Last 365 nights** (kpi_pack `last365`, 25 Oct 2025–24 Oct 2026; denominator 365 for all units, see Data gaps):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 36.7% | £178.74 | £65.62 | £23,951.75 |
| P02 | 78.9% | £128.84 | £101.66 | £37,106.06 |
| P05 | 55.6% | £373.27 | £207.60 | £75,772.85 |
| P06 | 32.9% | £241.07 | £79.26 | £28,928.13 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 37.5% | £176.99 | £66.43 | £24,247.75 |
| P09 | 39.2% | £115.61 | £45.30 | £16,532.84 |
| P10 | 35.9% | £114.87 | £41.23 | £15,047.45 |
| P11 | 75.6% | £174.18 | £131.71 | £48,074.87 |
| P12 | 81.9% | £191.98 | £157.27 | £57,403.11 |
| P13 | 76.7% | £158.75 | £121.78 | £44,450.31 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 | 4.1% | £159.48 | £6.55 | £2,392.24 |

P03, P04 and P15–P19 are UNKNOWN.

**Booking profile** (kpi_pack `booking_profile`: confirmed bookings in reservations.csv, arrivals 21 Oct 2025–23 Apr 2027, Smoobu import rows excluded; lead time in days, LOS in nights, revenue share by channel):

| Ref | Bookings | Lead time | LOS | Revenue share by channel |
|---|---|---|---|---|
| P01 | 21 | 15 | 5 | Airbnb 80.4%, Website 13.0%, Booking.com 6.6% |
| P02 | 71 | 34 | 4 | Airbnb 53.8%, Booking.com 43.0%, Direct 3.2% |
| P04 | 1 | 21 | 4 | Booking.com 100% |
| P05 | 59 | 44 | 4 | Airbnb 100% |
| P06 | 30 | 16 | 4 | Airbnb 71.7%, Booking.com 28.3% |
| P07 | 5 | 3 | 4 | Airbnb 100% |
| P08 | 20 | 16 | 6 | Airbnb 76.2%, Booking.com 23.8% |
| P09 | 24 | 21 | 6 | Airbnb 59.8%, Booking.com 38.7%, Direct 1.5% |
| P10 | 22 | 12 | 5 | Airbnb 69.3%, Booking.com 27.6%, Website 3.1% |
| P11 | 69 | 28 | 4 | Booking.com 54.5%, Airbnb 43.6%, Agoda 1.9% |
| P12 | 84 | 31 | 4 | Booking.com 89.9%, Airbnb 10.1% |
| P13 | 82 | 21 | 3 | Booking.com 52.3%, Airbnb 46.8%, Agoda 0.9% |
| P14 | 1 | 57 | 10 | Airbnb 100% |
| P20 | 3 | 5 | 3 | Airbnb 100% |

P03 and P15–P19: UNKNOWN (no reservations).

### Orphan gaps
**None.** kpi_pack `gaps` is empty for every unit. A recheck of `prices.csv` (handback-aware, P13 twin bookings linked) found no open run between two unavailable nights shorter than its min stay.

Tight runs exactly at the min stay (not orphans; listed for watch):
- P05: 29–30 Oct (2 n, min 2), 16–17 Nov (2 n, min 2), 7–8 Dec (2 n, min 2).
- P12: 12–13 Nov (2 n, min 2). The new 5–12 Nov booking created this run.
- P06: 5–7 Nov (3 n, min 2).
- P09: 10–12 Nov (3 n, min 2).

Policy-settled single nights are not listed (P04 2 Dec, P12 17 Nov, P13 1 Dec).

### Gaps to fill
- STLY for every unit except P12. Smoobu history starts after 25 Oct 2025, and the pack shows `stly_nights: 0`, which is missing history, not a real zero. A PriceLabs or OTA-side last-year booking export would make pace measurable.
- Last-365 capacity should start at each unit's first managed night, not 365 days back.
- P03 forward occupancy: not in Smoobu, and PriceLabs gives no Booked/Blocked labels.
- P15–P19: no PriceLabs or Smoobu data at all.
- Cancellation dates: reservations.csv has none, so cancellations within the review window can only be found from snapshot diffs.
- Reason for P08's new 26 Oct block.
- Corentin's direction to cut PriceLabs-side discounts was NOT CHECKED in this section (no get_customizations / get_user_logs call); it is left to the pricelabs section.

Data gaps:
- Pace vs STLY (30 and 90): UNKNOWN for P01, P02, P05–P11, P13, P14, P20, because reservations.csv has no Smoobu bookings for the STLY window or booked by 25 Oct 2025. For P03, P04 and P15–P19 it is UNKNOWN for lack of history.
- Last 30 / last 365 nights: UNKNOWN for P03 (not in Smoobu), P04 (smoobu_since 20 Oct 2026, id_map.json) and P15–P19 (not mapped). Last-365 occupancy and RevPAR are understated for units whose first Smoobu stay is after 25 Oct 2025.
- Forward occupancy: UNKNOWN for P03 (unlabelled unavailable nights in prices.csv) and P15–P19 (no prices rows).
- Market inputs: kpi_pack `missing` lists market.csv, comps.csv and channel_checks.csv as empty. Market occupancy here is PriceLabs `market_occupancy_next_30/60` (pl_kpis.csv); ARI and RGI are UNKNOWN for all units.
- Pickup and booked_on carry dates only, no times; 25 Oct covers only up to the 06:54 pull.
- P20 ADR30 and RevPAR30 understated (separately paid 18–22 Oct nights, policy).
