## Occupancy & performance

**Portfolio, last 30 nights (18 Sep–17 Oct 2026), the 12 Smoobu-mapped units (P01, P02, P05–P14): occupancy 67.5%, ADR £177.24, RevPAR £119.64, revenue £43,069.94 (243 nights).** Last 365 nights (18 Oct 2025–17 Oct 2026): occupancy 44.6%, ADR £185.58, RevPAR £82.79, revenue £362,619.44 (1,954 nights). Forward: 48.0% of the next 29 nights (19 Oct–16 Nov) are Booked, plus 18.3% Blocked; 36.1% Booked over 19 Oct–16 Dec (13 units with a PriceLabs calendar, P03 left out). 7-day pickup (bookings made 12–18 Oct): 11 bookings, 85 nights, £16,091.79.
Sources: `reports/2026-10-18/kpi_pack.json` (portfolio_last30/365 and per-property fields), with forward/pickup totals recomputed from `data/snapshots/2026-10-18/prices.csv` and `reservations.csv`. Revenue is Smoobu basePrice, before cleaning and commission. P03, P04 and P15–P19 are not in these totals because their figures are unknown. They are left out, not counted as zero.

### Info-pack claim vs data
`build/properties.py` FACTS says **90% occupancy, £290 ADR, 6-night average stay, 5% long-stay**. The data doesn't support this:
- Occupancy: 44.6% over the last 365 nights and 67.5% over the last 30 (kpi_pack). No unit reaches 90% on the pack's 365-night basis. The highest is P12 at 82.2%. Over the last 30 nights only P01 (100%), P02 (96.7%), P09 (96.7%) and P08 (93.3%) are at or above 90%.
- The 365-night figure divides by 365 nights for every unit, but 10 of the 12 units have their first Smoobu stay after 18 Oct 2025 (P01 21 May 26, P05 28 Feb 26, P06 21 May 26, P07 30 Apr 26, P08 14 May 26, P09 16 May 26, P10 17 May 26, P11 11 Dec 25, P13 14 Dec 25, P14 3 Sep 26). Counting nights booked against nights since each unit's first Smoobu stay gives 71–88% for the 10 active units (e.g. P09 87.7%, P11 87.1%, P01 84.7%) and 22–25% for P07/P14. This assumes each unit was not live before its first Smoobu stay, which the data cannot confirm. Either way, none reaches 90%.
- ADR: £185.58 over the last 365 nights and £177.24 over the last 30 (basePrice). Only P05 (£372.56) and P14 (£409.84, from one 10-night stay) beat £290 over the last 365.
- Stay length: mean 4.76 nights and median 4 across 472 confirmed bookings (all stays in reservations.csv). This is below the claimed 6.

### Per-property table
Windows: occ30/ADR30/RevPAR30 = last 30 nights 18 Sep–17 Oct 2026 (kpi_pack `last30`, Smoobu). Fwd occ30 = Booked nights ÷ 29 nights 19 Oct–16 Nov (kpi_pack `forward_occ_30`, prices.csv; the night of 18 Oct is not in prices.csv), with Blocked share in brackets. Pace30 = stays 18 Oct–16 Nov on the books today vs the same window on 18 Oct 2025 (kpi_pack `pace_30`). Pickup 7d = bookings made 12–18 Oct (kpi_pack `pickup_7d`).

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (blocked) | Pace30 Δ (nights / rev) | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100% | £161.56 | £161.56 | 100% (0%) | UNKNOWN: no STLY (first stay 21 May 26); OTB 30 n / £4,696 | 1 / 30 / £4,564 | Compressed |
| P02 | Ladbroke Grove | 96.7% | £120.88 | £116.85 | 31.0% (65.5%) | UNKNOWN: no STLY (first stay 18 Nov 25); OTB 10 n / £976 | 1 / 4 / £417 | Soft* (block-driven) |
| P03 | Bayswater | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN (60/60 nights unavailable, no Booked/Blocked label; PriceLabs incl. blocks 100%) | UNKNOWN | UNKNOWN | Unclassifiable |
| P04 | Barking | UNKNOWN | UNKNOWN | UNKNOWN | 48.3% (0%) | UNKNOWN: no reservations | UNKNOWN | Soft |
| P05 | St John's Wood | 76.7% | £396.37 | £303.89 | 69.0% (3.4%) | UNKNOWN: no STLY (first stay 28 Feb 26); OTB 21 n / £8,154 | 1 / 7 / £4,528 | Unclassifiable (no STLY; 60–85%) |
| P06 | Marylebone | 80.0% | £214.69 | £171.75 | 48.3% (31.0%) | UNKNOWN: no STLY (first stay 21 May 26); OTB 14 n / £2,589 | 2 / 13 / £2,310 | Soft* (31% blocked) |
| P07 | Woolwich | 0% | UNKNOWN (0 nights) | £0 | 0% (100%) | UNKNOWN: no STLY; OTB 0 | 0 / 0 / £0 | Soft* (fully blocked, nothing open to sell) |
| P08 | Islington | 93.3% | £169.06 | £157.79 | 44.8% (0%) | UNKNOWN: no STLY (first stay 14 May 26); OTB 14 n / £2,031 | 1 / 6 / £776 | Soft |
| P09 | Greenwich | 96.7% | £115.36 | £111.51 | 58.6% (0%) | UNKNOWN: no STLY (first stay 16 May 26); OTB 18 n / £1,975 | 1 / 12 / £1,233 | Soft |
| P10 | Ealing / Hanger Lane | 76.7% | £112.07 | £85.92 | 100% (0%) | UNKNOWN: no STLY (first stay 17 May 26); OTB 30 n / £3,179 | 0 / 0 / £0 | Compressed |
| P11 | Camden | 86.7% | £152.12 | £131.84 | 58.6% (0%) | UNKNOWN: no STLY (first stay 11 Dec 25); OTB 18 n / £3,153 | 0 / 0 / £0 | Soft |
| P12 | Mile End | 80.0% | £201.69 | £161.35 | 58.6% (0%) | −4 n (18 vs 22) / +8.9% (£3,569 vs £3,278) | 2 / 5 / £850 | Soft |
| P13 | Shepherd's Bush | 23.3% | £142.28 | £33.20 | 6.9% (37.9%) | UNKNOWN: no STLY (first stay 14 Dec 25); OTB 2 n / £353 | 2 / 8 / £1,414 | Soft |
| P14 | Primrose Hill | 0% | UNKNOWN (0 nights) | £0 | 0% (0%) | UNKNOWN: no STLY; OTB 0 | 0 / 0 / £0 | Soft |
| P15 | Bow / Devons Road | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P16 | Little Venice | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P17 | St John's Wood | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P18 | Fulham | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P19 | Kings Langley | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |

How classes were set: Compressed = fwd occ30 ≥ 85%. Soft = fwd occ30 < 60% or pace behind STLY by > 10%. On track needs an STLY figure, so a unit at 60–85% without STLY is Unclassifiable. *Soft\** means the class comes from the Booked-only count, but a large share of the window is Blocked, so the result reflects closed inventory rather than weak demand. PriceLabs' own figure, which counts blocks as booked (`pricelabs_occ_next_30_incl_blocks`), is P02 97%, P06 77%, P07 100% and P13 47%.

### Last 365 nights, forward 60, pace 90, booking profile
Last 365 = 18 Oct 2025–17 Oct 2026 (kpi_pack `last365`, capacity 365 for all). Fwd60 = Booked ÷ 59 nights 19 Oct–16 Dec. Pace90 = stays 18 Oct 2026–15 Jan 2027 vs the same window on 18 Oct 2025. Profile = all confirmed bookings in reservations.csv (kpi_pack `booking_profile`).

| Ref | Occ365 | ADR365 | RevPAR365 | Rev365 | Fwd60 | Pace90 Δ (nights / rev) | Bookings | Median lead | Median LOS | Channel revenue share |
|---|---|---|---|---|---|---|---|---|---|---|
| P01 | 34.8% | £179.65 | £62.51 | £22,815.55 | 71.2% | no STLY; OTB 43 n / £6,674 | 20 | 15 d | 5 n | Airbnb 79.9%, Website 13.3%, Booking.com 6.8% |
| P02 | 77.0% | £129.69 | £99.84 | £36,443.00 | 15.3% | no STLY; OTB 10 n / £976 | 71 | 34 d | 4 n | Airbnb 53.8%, Booking.com 43.0%, Direct 3.2% |
| P04 | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | 40.7% | UNKNOWN | — | — | — | UNKNOWN |
| P05 | 53.7% | £372.56 | £200.06 | £73,022.09 | 66.1% | no STLY; OTB 52 n / £25,714 | 59 | 44 d | 4 n | Airbnb 100% |
| P06 | 32.1% | £241.84 | £77.52 | £28,295.48 | 23.7% | no STLY; OTB 14 n / £2,589 | 30 | 16 d | 4 n | Airbnb 71.7%, Booking.com 28.3% |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 | 0% | no STLY; OTB 0 | 5 | 3 d | 4 n | Airbnb 100% |
| P08 | 35.6% | £178.08 | £63.42 | £23,149.98 | 22.0% | no STLY; OTB 14 n / £2,031 | 20 | 16 d | 6 n | Airbnb 76.2%, Booking.com 23.8% |
| P09 | 37.3% | £114.88 | £42.81 | £15,624.34 | 45.8% | no STLY; OTB 28 n / £3,002 | 22 | 18 d | 7 n | Airbnb 60.5%, Booking.com 37.9%, Direct 1.6% |
| P10 | 34.0% | £115.37 | £39.19 | £14,305.70 | 52.5% | no STLY; OTB 32 n / £3,391 | 22 | 12 d | 5 n | Airbnb 69.3%, Booking.com 27.6%, Website 3.1% |
| P11 | 74.2% | £174.11 | £129.27 | £47,183.62 | 67.8% | no STLY; OTB 53 n / £11,411 | 70 | 31 d | 4 n | Booking.com 55.8%, Airbnb 42.3%, Agoda 1.9% |
| P12 | 82.2% | £190.77 | £156.80 | £57,230.47 | 47.5% | **−10 n (29 vs 39) / −24.4% (£5,669 vs £7,496)** | 85 | 31 d | 4 n | Booking.com 90.1%, Airbnb 9.9% |
| P13 | 60.3% | £158.31 | £95.42 | £34,827.11 | 16.9% | no STLY; OTB 10 n / £1,767 | 67 | 21 d | 3 n | Booking.com 68.0%, Airbnb 32.0% |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 | 0% | no STLY; OTB 0 | 1 | 57 d | 10 n | Airbnb 100% |

Portfolio profile (472 confirmed bookings, reservations.csv): median lead 24 days, median LOS 4 nights, channel revenue share Airbnb 61.4%, Booking.com 37.0%, Website 1.0%, Direct 0.3%, Agoda 0.3%. 164 of 636 bookings (25.8%) are cancelled. The highest cancellation counts are P11 (39 cancelled vs 70 confirmed), P12 (36 vs 85) and P13 (28 vs 67).

### Length-of-stay mix (mid-term check)
Source: reservations.csv, confirmed bookings, whole stays, revenue = basePrice. A stay counts in the band of its total length.

| Scope | Bookings | Nights | Share of nights 1–6 / 7–27 / 28–90 / 91+ | ADR 1–6 / 7–27 / 28–90 / 91+ |
|---|---|---|---|---|
| All confirmed stays (arrivals 17 Oct 2025–Mar 2027) | 472 | 2,249 | 64.0% / 31.6% / 4.4% / 0% | £196 / £188 / £141 / — |
| Arrivals 18 Oct 2025–17 Oct 2026 | 436 | 1,992 | 68.2% / 30.0% / 1.9% / 0% | £190 / £175 / £162 / — |

- **Share of nights from stays of 28+ nights: 4.4%. From 91+ nights: 0%.** There are only 3 bookings of 28+ nights: P01 ×2 (67 nights, £10,570, ADR £158) and P10 ×1 (32 nights, £3,391, ADR £106). No other unit has a 28+ night stay, and the longest stay elsewhere is 27 nights (P08). In practice the portfolio runs as short-let, not mid-term-first.
- Stays of 28–90 nights earn a lower ADR (£141) than 1–6 night stays (£196) across all stays.
- Units where 7–27 night stays dominate (share of nights): P09 75.0%, P07 71.4%, P08 70.8%. Units where 1–6 nights dominate: P13 92.6%, P12 84.2%, P02 77.0%, P05 74.7%.

### Gaps to fill (prices.csv, 19 Oct–17 Dec 2026)
- **No orphan gaps.** No open run between two bookings is shorter than the min stay in force. This matches kpi_pack `gaps: []` for every unit and was re-checked against prices.csv.
- Single open nights between bookings, where min stay is already 1: P04 1 Nov and 2 Dec; P11 18 Nov and 27 Nov; P12 17 Nov; P13 22 Oct.
- Two-night open runs at min stay 2: P05 16–17 Nov and 7–8 Dec; P12 21–22 Oct; P13 25–26 Oct.
- Large open blocks inside the 30-day window: P08 26 Oct–7 Nov (13 nights); P13 31 Oct–12 Nov (13) and 17–27 Nov (11); P09 25–31 Oct (7); P11 28 Oct–2 Nov (6); P14 all 60 nights open, with 68.3% of open nights at the minimum price (kpi_pack `bounds.at_min_share`).
- Blocked inventory: P07 60/60 nights Blocked; P02 50/60; P06 40/60; P13 11/60; P12 4/60; P05 1/60. The reasons for these blocks are not in the data.

### Notes on reading the numbers
- P13's figures cover Smoobu apartment 3064856 only. A second Shepherd's Bush apartment, 3090701 (21 bookings, same coordinates), is left out pending mapping. P13 may therefore be understated.
- STLY exists only for P12. For every other unit, STLY nights = 0 because there are no Smoobu bookings before its first stay, so their pace "delta" equals what is on the books today and is reported as UNKNOWN, not as "ahead". STLY also leaves out bookings that were later cancelled, so it reads slightly low.
- PriceLabs' ADR past 30 (`pl_kpis.csv`) differs from the Smoobu basePrice ADR for some units (e.g. P11 £127 vs £152.12, P10 £90 vs £112.07). This table uses the Smoobu figures.

Data gaps:
1. P03 Bayswater: no reservations (not in Smoobu, priced via Channex), so last-30/365 occupancy, ADR, RevPAR, revenue, pace, pickup and booking profile are UNKNOWN.
2. P03 Bayswater: prices.csv shows 60/60 nights unavailable with no Booked/Blocked label, so forward occupancy 30/60 is UNKNOWN. PriceLabs reports `fully_blocked_next_360 = True`.
3. P04 Barking: no reservations (not in Smoobu), so last-30/365, pace, pickup and booking profile are UNKNOWN.
4. P15 Bow / Devons Road: not in PriceLabs or Smoobu. All KPIs UNKNOWN.
5. P16 Little Venice: not in PriceLabs or Smoobu. All KPIs UNKNOWN.
6. P17 St John's Wood 1-bed: not in PriceLabs or Smoobu. All KPIs UNKNOWN.
7. P18 Fulham: not in PriceLabs or Smoobu. All KPIs UNKNOWN.
8. P19 Kings Langley: not in PriceLabs or Smoobu. All KPIs UNKNOWN.
9. STLY: no Smoobu bookings for the year-ago windows for P01, P02, P05–P11, P13 and P14, so pace 30/90 vs STLY is UNKNOWN for 11 of 12 mapped units.
10. Smoobu apartment 3090701 (second Shepherd's Bush listing, 21 bookings) is unmapped and excluded. Corentin needs to confirm whether it belongs to P13.
11. Smoobu apartment 3547481 Waterford Court (2 bookings) is not in the info pack and is excluded.
12. Block reasons (owner use, off-platform let or closure) are missing for P02, P06, P07 and P13, so Booked-only forward occupancy can't separate demand from closed inventory.
13. prices.csv starts 19 Oct, so the night of 18 Oct is missing and forward occupancy 30 covers 29 nights (60 covers 59).
14. Cancellation dates are not in reservations.csv, so STLY cannot include bookings that were live a year ago and cancelled later.
15. market.csv is empty, so market ADR, price percentiles and ARI/RGI are UNKNOWN.
16. comps.csv is empty, so comp-set positioning is UNKNOWN.
17. channel_checks.csv is empty, so channel parity is UNKNOWN.
