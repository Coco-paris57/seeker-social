## Occupancy & performance

**Portfolio, last 30 nights (27 Sep–26 Oct 2026), 13 units with Smoobu history (P01, P02, P05–P14, P20):** occupancy 69.2%, ADR £175.52, RevPAR £121.52, revenue £47,391.13 (270 nights).
- **Last 365 nights (27 Oct 2025–26 Oct 2026):** occupancy 44.1%, ADR £184.65, RevPAR £81.37, revenue £386,104.72 (2,091 nights). Occupancy is understated (365-day denominator; most units have Smoobu history only from late 2025 or 2026).
- Source: `reports/2026-10-27/kpi_pack.json` (`portfolio_last30`, `portfolio_last365`). P03, P04 (`smoobu_since` 2026-10-20) and P15–P19 are left out, not counted as zero.

**Forward next 30 (28 Oct–25 Nov, 29 nights; prices.csv starts 28 Oct), handback-aware: 170 of 309 non-blocked nights booked = 55.0%** across the same 13 units (incl. P04). Yesterday: 54.8% (171/312, 27 Oct–24 Nov).
- Sources: kpi_pack `forward_occ_30` × `price_nights_next_30`; blocked counts from `data/snapshots/2026-10-27/prices.csv`. Left out: P03 (unlabelled), P07 (fully blocked on purpose), blocked nights generally.

**7-day pickup (bookings made 21–27 Oct; kpi_pack `pickup_7d`): 12 bookings, 47 nights, £7,963.86.** This total **includes one P04 Airbnb row that is not pickup** (28 Sep–2 Oct, a past stay imported on 26 Oct, 4 n, £439.20; see P04 below). Without it: **11 bookings, 43 n, £7,524.66.**
- P12: 3 bk, 15 n, £2,484.65
- P13: 1, 7 n, £1,766.00
- P04: 4, 12 n, £1,448.71 in the pack (real pickup 2–3 bk, 7–8 n, £793.51–£1,009.51; see P04)
- P06: 1, 3 n, £804.77
- P08: 1, 5 n, £676.60
- P20: 1, 3 n, £529.92
- P09: 1, 2 n, £253.21

### Overnight change (26 Oct → 27 Oct, `reservations.csv` diff; created times from Smoobu `GET /api/reservations`)
- **P12 Mile End, Booking.com 4–8 Dec, 4 n, £1,116.99 room (£279.25/n), made 26 Oct (39 days' lead).**
  - Sits inside the dates of the cancelled 5–10 Dec stay (£1,292.09, £258.42/n).
  - Splits P12's open run before handback (22 Nov–13 Dec, 22 n) into 22 Nov–3 Dec (12 n) and 8–13 Dec (6 n). Both are longer than the 2-night min stay, so no orphan. PriceLabs already shows 4–7 Dec as Booked (`prices.csv`).
  - Falls outside the 30-day pace window. It counts in pace90 and in the run-to-handback.
- **P13 Shepherd's Bush, Airbnb 27 Dec–3 Jan, 7 n, £1,766.00 room (£252.29/n; cleaning £150 is separate), made 26 Oct (62 days' lead), New Year.**
  - It is after the end of `prices.csv` (26 Dec), so it is outside fwd30/fwd60. It counts in pace90: P13 OTB is 27 n, £4,911.68. Pace vs STLY is UNKNOWN (no 2025 Smoobu history).
  - Gaps against PriceLabs nights after 26 Dec: NOT CHECKED (not in the snapshot).
  - Paid vs price: NOT CHECKED here (channel section). It is a 7-night stay, so the weekly 15% discount applies (policy).
- **P04 Barking, three changes:**
  - Airbnb 28 Sep–2 Oct (£439.20) and Airbnb 19–20 Dec (1 n, £216.00) appeared, both `booked_on` 26 Oct.
  - The Booking.com 20–23 Nov booking (£355.82) shows as 3 rows: 2 cancelled and **1 confirmed**. Smoobu: reservation 5518058686 was created 12:09 and cancelled; 5648752525 was created 12:45 and cancelled by 14:03; **5565863568 was created 14:22 and is live**.
  - So **20–23 Nov is booked, not cancelled.** This corrects the dispatcher's note. PriceLabs shows 20–22 Nov as Booked, and kpi_pack counts it.
- No row left the file apart from window effects.

### P04: are the Airbnb rows a sign that the Airbnb account now flows into Smoobu?
**What the data shows:**
- **Both Airbnb reservations were created in Smoobu on 26 Oct at 14:08, 10 seconds apart** (ids 161475846 and 161475851). Both carry Airbnb confirmation codes on Smoobu's Airbnb channel (channel_id 74).
- One is a stay that ended 2 Oct, 24 days before it was "booked". A guest booking cannot be created after the stay. So `booked_on` here is the date Smoobu imported the reservation, not the date it was booked. This is the same pattern as the 20 Oct move, when all of P04's Booking.com reservations were created at 12:44.
- **On 26 Oct, 19 Dec was still open and bookable in PriceLabs/Smoobu** (`data/snapshots/2026-10-26/prices.csv`: available, min 3). Today it is Booked (Check-In). Before 26 Oct, the Airbnb night was not blocking the Smoobu calendar.

**Inference:**
- The pattern fits Barking's separate Airbnb account being connected to Smoobu around 14:08 on 26 Oct, with its existing reservations imported.
- **Not confirmed:**
  - The Smoobu API reports one Airbnb channel id (3263896) for every apartment, so it cannot show which Airbnb host account a reservation came from.
  - It is not yet proven that new Airbnb bookings will flow, or that Smoobu prices and availability now push to that listing.
  - The test is the next P04 Airbnb booking appearing with a real creation time. Confirmation from Corentin is needed.
- The real booking date of the 19–20 Dec night is UNKNOWN. If it was booked before 26 Oct, the night was open for sale on Booking.com through Smoobu at the same time.
- 19–20 Dec is a 1-night stay. Policy says P04 should never be open for fewer than 3 nights. It was sold under the other account's rules, which Smoobu did not control.

**Effect on P04's numbers:**
- **Pickup 7d is inflated.** The pack's 4 bk / 12 n / £1,448.71 counts the imported past stay. The analyser drops imports only when they fall on `smoobu_since` (20 Oct), not on 26 Oct.
  - Confirmed real pickup: 14–18 Nov (made 24 Oct, £437.69) and 20–23 Nov (made 26 Oct, £355.82), so 2 bk / 7 n / £793.51.
  - The 19–20 Dec night (£216.00) has an unknown booking date.
- **The booking profile is distorted.** The pack shows 4 bookings, median lead 25 days, Airbnb 45.2% of revenue. That includes a −28-day lead (the past stay) and the 19 Dec import date as if it were a booking date.
- **Last 30 / 365 stay UNKNOWN.** Smoobu now has one pre-20 Oct Airbnb stay (28 Sep–2 Oct) but no Booking.com history before 20 Oct, and maybe not all Airbnb history either. The pack is right to keep `smoobu_since` at 20 Oct, and this one stay must not be read as P04's September occupancy.
- **The forward figures are fine:**
  - fwd30 is 41.4% (12/29), from 31.0% yesterday. The gain is the 20–23 Nov booking: +3 n.
  - fwd60 is 47.5%, from 40.7%. That adds the 20–23 Nov booking and 19 Dec.
- **Run-rate impact on forward revenue** (P04 stays 27 Oct–2 Jan, confirmed rows): +£355.82 (20–23 Nov) and +£216.00 (19–20 Dec).

### Review of the 18 Oct base rises (running line): bookings made 18–26 Oct (9 full days) vs 4–17 Oct (14 days)
How this was built:
- Source: `data/snapshots/2026-10-27/reservations.csv` `booked_on`, confirmed only. 26 Oct is now a full day.
- `booked_on` has no time, so whether the P05 18 Oct booking came before or after the rise is UNKNOWN.
- Booked next 30 vs market comes from kpi_pack `forward_occ_30` / `market_occ_30`. The 18 Oct values are from `reports/2026-10-18/kpi_pack.json`.

| Ref (base) | Made 18–26 Oct: bk / n / £ (per day) | Made 4–17 Oct: bk / n / £ (per day) | Booked next 30 vs mkt: 18 Oct → 27 Oct | Open nights next 30 (28 Oct–25 Nov) |
|---|---|---|---|---|
| P01 (253) | 1 / 3 / £720.90 (0.11 / 0.33 / £80.10) | 1 / 30 / £4,563.90 (0.07 / 2.14 / £325.99) | 100% vs 34% → 100% vs 35% | 0 (sold out to handback) |
| P05 (550 from 20 Oct) | 1 / 7 / £4,527.95 (made 18 Oct, timing UNKNOWN). **None since; none at £550 (7 full days)** | 1 / 4 / £1,835.10; plus 1 since cancelled | 69.0% vs 32% → 69.0% vs 38% | 8: 29–30 Oct, 6–9 Nov, 16–17 Nov |
| P06 (357) | 1 / 3 / £804.77 | 4 / 18 / £3,400.07; plus 1 since cancelled | 48.3% vs 43% → 37.9% vs 44% (100% of non-blocked) | 0 (rest blocked on purpose) |
| P09 (176) | 1 / 2 / £253.21 | 3 / 23 / £2,371.55 | 58.6% vs 38% → 75.9% vs 36% | 7: 28–31 Oct, 10–12 Nov |
| P11 (286) | **0** | 1 / 4 / £650.48 (made 4 Oct) | 58.6% vs 47% → **37.9% vs 43%** | 18 |
| P12 (284) | **3 / 15 / £2,484.65** (24, 25, 26 Oct; all Booking.com) | 2 / 5 / £849.98 | 58.6% vs 41% → 62.1% vs 39% | 11 |
| **Raised, total** | **7 / 30 / £8,791.48 (0.78 / 3.33 / £976.83)**. Without P05 18 Oct: 6 / 23 / £4,263.53 (0.67 / 2.56 / £473.73) | **12 / 84 / £13,671.08 (0.86 / 6.00 / £976.51)** | | 44 |
| **Unraised** (P02, P08, P10, P13, P14, P20) | **5 / 22 / £4,089.13 (0.56 / 2.44 / £454.35)**: P08 ×1, P13 ×3 (2 made 18 Oct, 1 made 26 Oct), P20 ×1 | **11 / 85 / £10,556.09 (0.79 / 6.07 / £754.01)** | | |

**Running line (27 Oct):**
- Bookings per day are 0.91× the earlier rate for the raised flats (0.78 vs 0.86) and 0.70× for the unraised (0.56 vs 0.79). Revenue per day is 1.00× raised and 0.60× unraised.
- Without P05's 18 Oct booking (timing UNKNOWN), raised flats are 0.78× in bookings and 0.49× in revenue.
- Yesterday's figures (26 Oct partial) were raised 0.78× bookings, unraised 0.56×. The 26 Oct bookings on P12 and P13 lifted both groups.
- So the data still does not isolate a rise effect. P12 accounts for 3 of the 7 raised bookings, all on Booking.com in the 3 days after the 24 Oct markup cut (+30% → +15%), which confounds it.
- **P11 Camden: no booking since 4 Oct (23 days).** fwd30 is 37.9%, below the 43% market.
- **P05: no booking since 18 Oct.**
- P04 is excluded: it was not in Smoobu before 20 Oct.

### P12: run-rate to handback (stays 27 Oct–13 Dec vs the same stays as of 27 Oct 2025)
Recomputed with `rm.metrics.on_the_books` on `reservations.csv`.

| Measure | 26 Oct | 27 Oct | Change |
|---|---|---|---|
| Pace30 (kpi_pack `pace_30`, stays 27 Oct–25 Nov) | −1 n / −0.7% | **19 n / £2,895.10 vs STLY 20 n / £2,865.12 = −1 n / +1.0%** | window roll only; still On track |
| To handback (27 Oct–13 Dec) | 20 n / £3,003.79 vs 31 n / £5,251.81 = −11 n / −42.8% | **23 n / £4,012.09 vs 30 n / £5,090.64 = −7 n / −21.2%** | +4 n / +£1,116.99 (4–8 Dec), −1 n for 26 Oct leaving the window |
| Pace90 (kpi_pack, 27 Oct–24 Jan, not handback-aware) | −19 n / −60.7% | −15 n / −46.4% (STLY 38 n / £7,491.44 includes nights after the 13 Dec handback) | |

### Per-property table
Windows and sources:
- Occ30, ADR30 and RevPAR30: last 30 nights, 27 Sep–26 Oct (kpi_pack `last30`).
- Fwd occ30: `forward_occ_30`, 28 Oct–25 Nov, handback-aware. Brackets show booked/nights, blocked nights, and PriceLabs market next 30.
- Pace30: `pace_30`, stays 27 Oct–25 Nov vs STLY.
- Pickup 7d: `pickup_7d`, bookings made 21–27 Oct.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (bk/n; blocked; mkt) | Pace30 Δ (n / rev) | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £162.31 | £162.31 | 100% (29/29; 0; 35%) | UNKNOWN: no STLY. OTB 30 n / £4,604.63 | 0 / 0 / £0 | **Compressed** (sold out to handback) |
| P02 | Ladbroke Grove | 96.7% | £115.13 | £111.29 | 0% (0/29; 28 blocked; 47%) | UNKNOWN: no STLY. OTB 1 n / £104.31 | 0 / 0 / £0 | Not classified: intentional block |
| P03 | Bayswater | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN (unlabelled; 49%) | UNKNOWN | UNKNOWN | Not classified: intentional block |
| P04 | Barking | UNKNOWN (Smoobu since 20 Oct) | UNKNOWN | UNKNOWN | 41.4% (12/29; 0; 25%) | UNKNOWN: no history | 4 / 12 / £1,448.71 in pack; **real 2 / 7 / £793.51** (+ 19 Dec, date UNKNOWN) | **Soft** (fwd < 60%) |
| P05 | St John's Wood | 76.7% | £395.94 | £303.55 | 69.0% (20/29; 1 delivery; 38%). 71.4% of non-blocked | UNKNOWN: no STLY. OTB 20 n / £8,896.59 | 0 / 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 66.7% | £206.62 | £137.74 | 37.9% (11/29; 18 blocked; 44%). 100% of non-blocked | UNKNOWN: no STLY. OTB 12 n / £2,405.22 | 1 / 3 / £804.77 | Not classified: intentional block |
| P07 | Woolwich | 0.0% | UNKNOWN (0 n) | £0.00 | 0% (0/29; 29 blocked; 23%) | UNKNOWN | 0 / 0 / £0 | Not classified: intentional block |
| P08 | Islington | 96.7% | £165.58 | £160.06 | 64.7% (11/17 to handback 13 Nov; 0; 51%) | UNKNOWN: no STLY. OTB 11 n / £1,453.06 | 1 / 5 / £676.60 | Unclassifiable (60–85%, no STLY) |
| P09 | Greenwich | 90.0% | £117.90 | £106.11 | 75.9% (22/29; 0; 36%) | UNKNOWN: no STLY. OTB 22 n / £2,243.60 | 1 / 2 / £253.21 | Unclassifiable (60–85%, no STLY) |
| P10 | Ealing / Hanger Lane | 83.3% | £113.35 | £94.46 | 100% (22/22 to handback 18 Nov; 0; 30%) | UNKNOWN: no STLY. OTB 23 n / £2,437.17 | 0 / 0 / £0 | **Compressed** (sold out to handback) |
| P11 | Camden | 80.0% | £170.46 | £136.36 | 37.9% (11/29; 0; 43%) | UNKNOWN: no STLY. OTB 12 n / £2,126.89 | 0 / 0 / £0 | **Soft** (fwd < 60%) |
| P12 | Mile End | 73.3% | £202.56 | £148.55 | 62.1% (18/29; 0; 39%) | **−1 n / +1.0%** (19 n / £2,895.10 vs 20 n / £2,865.12) | 3 / 15 / £2,484.65 | **On track**. To handback −7 n / −21.2% |
| P13 | Shepherd's Bush (one flat, 2 listings) | 86.7% | £160.99 | £139.52 | 37.9% (11/29; 0; 41%) | UNKNOWN: no STLY. OTB 12 n / £1,732.04 | 1 / 7 / £1,766.00 | **Soft** (fwd < 60%) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN (0 n) | £0.00 | 0% (0/29; 0; 40%) | UNKNOWN | 0 / 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford Court) | 50.0% | £159.48* | £79.74* | 10.3% (3/29; 2 delivery; 36%) | UNKNOWN: no STLY. OTB 3 n / £529.92 | 1 / 3 / £529.92 | **Soft** (fwd < 60%) |

\* P20: the 18–22 Oct extension nights were paid separately (policy `separate_payments`), so ADR30 and RevPAR30 are understated.

**Class counts (unchanged from 26 Oct):**
- Compressed 2: P01, P10.
- On track 1: P12.
- Soft 5: P04, P11, P13, P14, P20.
- Unclassifiable 8: P05, P08, P09, P15–P19.
- Not classified by policy: P02, P03, P06, P07.

**Forward 60** (kpi_pack `forward_occ_60`, 28 Oct–26 Dec, handback-aware; market next 60):

| Ref | Fwd occ 60 | Market next 60 |
|---|---|---|
| P01 | 66.7% | 27% |
| P04 | 47.5% | 20% |
| P05 | 59.3% | 37% |
| P06 | 18.6% | 40% (blocked on purpose) |
| P08 | 64.7% | 44% |
| P09 | 76.7% | 31% |
| P10 | 100% | 24% |
| P11 | 49.2% | 38% |
| P12 | 46.8% | 33% |
| P13 | 32.2% | 36% |
| P14 | 0% | 37% |
| P20 | 5.1% | 28% |

**Pace90** (kpi_pack `pace_90`, stays 27 Oct–24 Jan, OTB n / £):
- STLY is UNKNOWN for every unit except P12 (−15 n / −46.4%).
- P01 37 / £5,934.05; P02 1 / £104.31; P05 43 / £22,135.21; P06 12 / £2,405.22; P08 11 / £1,453.06; P09 23 / £2,346.31; P10 23 / £2,437.17; P11 38 / £8,418.76; P13 27 / £4,911.68; P14 0; P20 3 / £529.92.
- P04: not computed (no history).

**Last 365 nights** (kpi_pack `last365`, 27 Oct 2025–26 Oct 2026; denominator 365):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 37.3% | £178.50 | £66.51 | £24,276.38 |
| P02 | 79.5% | £128.67 | £102.23 | £37,314.68 |
| P05 | 56.2% | £373.66 | £209.86 | £76,600.49 |
| P06 | 33.4% | £240.03 | £80.23 | £29,283.78 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 37.8% | £176.84 | £66.86 | £24,404.57 |
| P09 | 39.2% | £115.61 | £45.30 | £16,532.84 |
| P10 | 36.4% | £114.73 | £41.81 | £15,259.38 |
| P11 | 76.2% | £174.24 | £132.71 | £48,439.19 |
| P12 | 81.9% | £192.07 | £157.34 | £57,428.76 |
| P13 | 76.7% | £158.75 | £121.78 | £44,450.31 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 | 4.1% | £159.48 | £6.55 | £2,392.24 |

P03, P04 and P15–P19: UNKNOWN.

**Booking profile** (kpi_pack `booking_profile`; confirmed bookings in the file; median lead time in days, median length of stay in nights, revenue share by channel):

| Ref | Bookings | Lead | LOS | Revenue share by channel |
|---|---|---|---|---|
| P01 | 21 | 15 | 5 | Airbnb 80.4%, Website 13.0%, Booking.com 6.6% |
| P02 | 71 | 34 | 4 | Airbnb 53.8%, Booking.com 43.0%, Direct 3.2% |
| P04 | 4 | 25 | 4 | Booking.com 54.8%, Airbnb 45.2%. **Distorted by 26 Oct imports** (see P04) |
| P05 | 59 | 44 | 4 | Airbnb 100% |
| P06 | 31 | 15 | 4 | Airbnb 72.4%, Booking.com 27.6% |
| P07 | 5 | 3 | 4 | Airbnb 100% |
| P08 | 21 | 15 | 6 | Airbnb 76.8%, Booking.com 23.2% |
| P09 | 25 | 21 | 5 | Airbnb 58.4%, Booking.com 40.1%, Direct 1.5% |
| P10 | 22 | 12 | 5 | Airbnb 69.3%, Booking.com 27.6%, Website 3.1% |
| P11 | 69 | 28 | 4 | Booking.com 54.5%, Airbnb 43.6%, Agoda 1.9% |
| P12 | 84 | 31 | 4 | Booking.com 89.8%, Airbnb 10.2% |
| P13 | 83 | 21 | 3 | Booking.com 50.4%, Airbnb 48.7%, Agoda 0.9% |
| P14 | 1 | 57 | 10 | Airbnb 100% |
| P20 | 3 | 5 | 3 | Airbnb 100% |

### Orphan gaps
kpi_pack `gaps` is empty for every unit. The analyser measures runs against the PriceLabs min stay on each night. Rechecked on `prices.csv`, handback-aware, with today's Smoobu confirmed bookings overlaid and P04's policy minimum of 3 nights applied.

**New today: P04 has two 2-night orphans, created by the 20–23 Nov booking:**
- **18–19 Nov** (between 14–18 Nov and 20–23 Nov)
- **23–24 Nov** (between 20–23 Nov and 25 Nov–2 Dec)
- On both pairs **PriceLabs now shows min stay 2**. On 26 Oct the same dates were min 3 (`data/snapshots/2026-10-26/prices.csv`).
- These nights are bookable for 2 nights. Policy (P04 `min_stay_rule`) says P04 must never be open for fewer than 3 nights. Reported as a fact for the pricelabs section to check where the 2 comes from. No price or min-stay proposal.

**Runs exactly at the min stay (not orphans):**
- P05: 29–30 Oct, 16–17 Nov, 7–8 Dec (2 n, min 2)
- P12: 12–13 Nov (2 n, min 2)

**Not listed (policy-settled single nights):** P04 2 Dec, P12 17 Nov, P13 1 Dec.

### Gaps to fill
- **P04 Airbnb connection:** whether Barking's separate Airbnb account is connected to Smoobu, and whether future bookings, prices and availability flow both ways. Unconfirmed; ask Corentin. Also the real booking date of the 19–20 Dec Airbnb night.
- **P04 pickup and profile:** the analyser should treat the 26 Oct Airbnb import as a migration, like it does for 20 Oct. Until then, P04 `pickup_7d` and `booking_profile` overstate pickup.
- **STLY** for every unit except P12 (Smoobu history starts after Oct 2025).
- **Time of day on `booked_on`**, and cancellation dates (reservations.csv has neither). The Smoobu `created-at`/`modifiedAt` fields have them.
- **P13 nights after 26 Dec** are not in `prices.csv` (60-day horizon), so the 27 Dec–3 Jan booking's surroundings were not checked.
- **P03 forward occupancy**, and all data for P15–P19.

Data gaps:
- Pace vs STLY (30/90): UNKNOWN for P01, P02, P05–P11, P13, P14 and P20 (reservations.csv has no bookings for the STLY window). UNKNOWN for P03, P04 and P15–P19 (no history).
- Last 30 / 365: UNKNOWN for P03 (not in Smoobu), P04 (`smoobu_since` 2026-10-20; only one pre-20 Oct Airbnb stay imported 26 Oct, Booking.com history before 20 Oct absent) and P15–P19 (not mapped). Last-365 occupancy is understated (365-day denominator).
- Forward occupancy: UNKNOWN for P03 (unlabelled) and P15–P19 (no prices rows). prices.csv has no row for 27 Oct and ends 26 Dec.
- Market: kpi_pack `missing` lists market.csv, comps.csv and channel_checks.csv as empty for 27 Oct. Market occupancy is PriceLabs `market_occ_30/60`. ARI and RGI are UNKNOWN.
- P04 pickup_7d and booking_profile include a non-pickup import (28 Sep–2 Oct, £439.20), and the 19–20 Dec booking date is unknown.
- P20 ADR30 and RevPAR30 are understated (separately paid nights, per policy).
- Paid vs price for the new P12 and P13 bookings: NOT CHECKED in this section.
