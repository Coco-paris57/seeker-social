## Channel parity

Run date D = 2026-10-19. Sources:
- `data/snapshots/2026-10-19/reservations.csv`: 660 Smoobu rows (490 confirmed, 170 cancelled). `total_gbp` is Smoobu basePrice, before cleaning and commission.
- `data/snapshots/2026-10-19/prices.csv` and `data/snapshots/2026-10-18/prices.csv`: PriceLabs price, booked_price and booked_adr for each night, 60 days ahead.
- `reports/2026-10-19/kpi_pack.json`: `properties[].rate_leak_after_los` and `channel_economics`.
- PriceLabs `get_user_logs`: read-only call, run 2026-10-19. It lists base/min/max price changes and date-specific overrides (DSOs) from 2026-09-01.
- `data/policy.json`, read first. The 15% weekly and 20% monthly discounts, Booking.com Visibility Booster commission and the P13 one-flat setup are all treated as settled and are not raised below.

**Config status.** The markups and discounts in `rm/config.py` CHANNELS are still unconfirmed placeholders: Booking +15% markup and -10% discount, Vrbo +8%, Direct -10%. Corentin has not yet confirmed them, so every "expected guest price" and every `channel_economics` figure rests on them.

### Parity checks

| Ref | Channel | Date | Smoobu rate | Expected | Displayed | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|
| all | Airbnb | — | — | — | NOT CHECKED: airbnb.com is blocked from this environment, and `channel_checks.csv` does not exist | — | — | — |
| all | Booking.com | — | — | — | NOT CHECKED: booking.com is blocked, and there is no checks file | — | — | — |
| all | Vrbo | — | — | — | NOT CHECKED: vrbo.com is blocked, and there is no checks file | — | — | — |
| all | Direct site | — | — | — | NOT CHECKED: no direct-site URL and no checks row | — | — | — |

No guest-facing price was observed, so these checks were not run:
- discount stacking (Genius, mobile, early-booker, country rate on Booking.com; early-bird, last-minute, promotions on Airbnb)
- the ordering check (direct < OTA)
- displayed fees and minimum stay

Everything below uses booked revenue from Smoobu.

### 1. Paid-rate gap after stay discounts (`rate_leak_after_los`, next 30 nights)

**How the pack calculates it.** Expected = today's PriceLabs `booked_price` × (1 − 15% for 7-27 nights, or 20% for 28+). Paid = PriceLabs `booked_adr`.

**What I did.** I matched 147 of the 158 booked nights between 19 Oct and 17 Nov to Smoobu reservations, by property and night. The other 11 are P04, which has no Smoobu reservations.

**Booking.com factor.** On all 31 Booking.com nights, Smoobu basePrice per night = 1.2000 × PriceLabs `booked_adr`. On all 116 Airbnb nights the ratio is 1.0000. The "Smoobu basis" column below uses basePrice.

| Ref | Nights (Airbnb / Booking) | Pack gap (PriceLabs ADR) | Gap on Smoobu basis | £ vs expected, Smoobu basis | Gap vs 18 Oct price | What the data explains |
|---|---|---|---|---|---|---|
| P06 | 12 / 0 | -31.7% | -31.7% | -1,022 | -32.4% | Airbnb 11-night stay booked 16 Oct at £178 vs £261 expected (-32%); 3-night stay -31%. Not explained. |
| P10 | 29 / 0 | -17.0% | -17.0% | -628 | -17.0% | One 32-night Airbnb stay booked 9 Oct at £106/night. That is 33.6% under the PriceLabs price, against the 20% monthly discount in policy. Not explained. |
| P08 | 11 / 0 | -23.5% | -23.5% | -488 | -23.5% | 6-night Airbnb stay booked 17 Oct at £129 vs £209 (-38%, no stay discount applies). 9-night stay booked 29 Sep at -9%. |
| P01 | 28 / 0 | -8.2% | -8.2% | -389 | -9.0% | 37-night stay booked 18 Sep: exactly on expected (0%). 30-night stay booked 15 Oct: -13%. |
| P09 | 11 / 3 | -21.1% | -17.6% | -318 | -20.3% | Airbnb -24% (9-night stay booked 4 Oct at -27%). Booking +7% on Smoobu basis. |
| P02 | 3 / 4 | -35.0% | -28.5% | -273 | -34.5% | Airbnb 4-night stay booked 15 Oct at £104 vs £165 (-37%). Booking 7-night stay -20% on Smoobu basis. |
| P05 | 16 / 0 | -3.3% | -3.3% | -215 | +5.6% | Fully explained by the base price raise on 18 Oct (455 to 500, PriceLabs log). Against the 18 Oct price P05 is +5.6%. |
| P12 | 3 / 9 | -15.6% | -2.9% | -72 | -16.2% | Booking +7% on Smoobu basis, so its whole pack gap is the 1.2 factor. Two Airbnb stays (3 nights) are -27%, -£193. |
| P11 | 0 / 15 | -18.8% | -2.6% | -71 | -19.3% | All Booking.com. 16 of the 18.8 points are the 1.2 factor. |
| P20 | 2 / 0 | -29.3% | -29.3% | -148 | n/a | 3-night Airbnb stay booked 17 Oct. The base price was cut 450 to 350 on 9-16 Oct, so prices fell over this period rather than rose. Not explained. |
| P13 | 1 / 0 | +0.4% | +0.4% | +1 | +0.4% | On price. |
| **All** | 116 / 31 | -15.6% | -12.6% | **-3,622** | -14.0% | Airbnb -15.3% (-£3,609). Booking.com -0.3% on Smoobu basis (-£14), or -16.9% (-£894) on the PriceLabs ADR basis. |

**What the data explains:**

1. **The Booking.com 1.2× factor accounts for the whole Booking.com gap.**
   - On the Smoobu basis, Booking nights are 0.3% under expected.
   - Which basis is right depends on what the 20% is:
     - If it is a 20% Smoobu channel markup, the intended guest price is 1.2 × PriceLabs × (1 − stay discount), and Booking is 16.9% under it (£894).
     - If the factor is VAT or a reporting artefact, Booking is on price.
     - The config assumes 1.15 × 0.90 = 1.035, and on that basis Booking is -3.6%.
   - This cannot be settled without the Smoobu Booking.com price adjustment setting.
2. **Bookings made long before the stay at lower prices do not explain the gap. The data points the other way.**
   - Airbnb nights booked more than 30 days ahead: -7.2%. Booked 0-30 days ahead: -18.4%.
   - Airbnb nights booked before 1 Oct: -3.2% (34 nights). Booked since 1 Oct: -23.4% (82 nights, -£3,307, 92% of the Airbnb shortfall).
3. **Price drift since booking is small where it can be measured.**
   - There are 11 Airbnb bookings made 12-18 Oct. I compared each with the 18 Oct snapshot, taken 0-6 days after booking. All 11 are 17-38% under that day's expected price.
   - Between those booking dates and 18 Oct, the PriceLabs log shows no base price change on these listings. The only DSOs added in that window were ±1-3% (P06, P12, P13).
   - From 18 to 19 Oct, `booked_price` moved on 95 of 145 nights, but by only +0.7% on average (mean absolute change £11 where it moved).
   - The base price raises on the evening of 18 Oct (P01 +10%, P05 +10%, P09 +10%, P11 +10%, P06 +5%, P12 +5%) changed booked-night `booked_price` materially only on P05 (+9.2%). They add 1.6 points to the portfolio gap.
4. **Stay length.** After the 15%/20% allowance, Airbnb is still -13.4% on 1-6-night stays, -25.0% on 7-27 nights and -12.0% on 28+ nights.
   - The implied total discount against the PriceLabs price is 13% on 1-6 nights, 36% on 7-27 and 30% on 28+.
   - So recent short Airbnb stays, where no stay discount applies, are also 30-38% under (P02, P06 3-night, P08, P12, P20).

**What cannot be proven without price-at-booking history (daily snapshots start 18 Oct):**
- **The exact price shown when each guest booked.** Every booked night in the window was booked before the first snapshot. The 0-6-day test above suggests drift is small, but it cannot exclude intraday price moves or algorithm moves before 18 Oct.
- **The cause of the remaining Airbnb gap**, about -£3,600 on 116 nights. It looks like an Airbnb-side reduction on bookings made in October, but the data cannot tell between these causes:
  - an Airbnb promotion (early-bird, last-minute, custom or new-listing)
  - a negative Smoobu Airbnb rate adjustment
  - Airbnb Smart Pricing or a manual Airbnb price
  - weekly/monthly discounts deeper than the 15%/20% in policy (P10's 32-night stay implies 33.6%; P06's 11-night stay implies 42%)
- **P13's 4-8 Nov booking.** It was made on 18 Oct at £150/night, probably on linked listing 3090701, whose own price is not in the snapshot. So its -27% against 3064856's price is not like-for-like.

### 2. New bookings and cancellations since yesterday (18 Oct to 19 Oct snapshot)

Matched on ref + channel + arrival + departure + booked_on. The snapshot has no reservation ID or cancellation date.

| Channel | New | Cancelled | Changed |
|---|---|---|---|
| Airbnb | 1: P01, 18-21 Dec, 3 nights, £720.90 base (£240.30/night), cleaning £149, commission £134.83 = 15.5% of base + cleaning, booked 19 Oct, 60 days ahead | 0 | 0 |
| Booking.com | 0 | 0 | 0 |
| Direct / Website | 0 | 0 | 0 |
| Agoda / Vrbo | 0 | 0 | 0 |

- The three bookings made 18 Oct (P13 4-8 Nov, P13 28 Nov-1 Dec, P05 22-29 Dec) were already in yesterday's snapshot.
- P01's new booking: 18 Dec shows PriceLabs £265, still "available" in today's pull, so the pull came before the booking synced. 19-20 Dec are beyond the 60-day window. P01's base was raised 10% on the evening of 18 Oct, so I cannot say which price applied.
- One duplicate row exists in the reservations file: P13 Booking.com 6-10 May 2026.

### 3. Direct share

| Window | Direct bookings | Share of confirmed revenue | Share of nights |
|---|---|---|---|
| All confirmed (490) | 4 | 1.34% | 1.29% |
| Arrivals 19 Oct 2025 to 18 Oct 2026 | 4 | 1.55% | 1.44% |
| Booked in last 30 days (55 bookings) | 2 | 1.32% | 1.86% |
| Future arrivals from 19 Oct (39 bookings, £60,237) | 0 | 0.0% | 0.0% |

- The last direct booking was made 30 Sep (P10, Website).
- No direct stay is on the books from today onwards.
- The rule that direct must be the cheapest guest price (10% discount) cannot be tested without a direct-site price.

### 4. Net-to-owner per £100 base (`channel_economics`, placeholder config)

- Airbnb £84.50, Booking £87.97, Vrbo £99.36, Direct £90.00. No warnings.
- Airbnb's real commission is 15.5% of (base + cleaning), which comes to about 17% of base. The new P01 booking matches that exactly.
- Booking's figure assumes a 15% markup and 15% commission, and both are unconfirmed. Booking commission above 15% on Visibility Booster dates is intended (policy) and is not flagged.

### 5. Issues ordered by £ impact (next 30 nights)

1. **Recent Airbnb bookings pay 17-38% under the Smoobu/PriceLabs rate after stay discounts: about -£3,600 on 116 nights.**
   - Main properties: P06 -£1,022, P10 -£628, P08 -£488, P01 -£389, P09 -£344, P12 -£193, P02 -£182 and P20 -£148.
   - Settings to check, Airbnb (each listing): Pricing & availability > Promotions and discounts (early-bird, last-minute, custom promotions, new-listing). Also confirm the weekly/monthly discounts are exactly 15%/20% and Smart Pricing is off.
   - Setting to check, Smoobu: Channel Manager > Airbnb > price adjustment (%).
   - Action: Corentin to send screenshots for P06, P08, P10, P02 and P20 first. Remove or reduce any active promotion that is not intended.
2. **The Booking.com 1.2× basis changes the reported gap by £880 on 31 nights (P02, P09, P11, P12).**
   - Setting to check: Smoobu > Channel Manager > Booking.com > price adjustment (%).
   - Once confirmed, set `CHANNELS["booking"]["markup"]` in `rm/config.py` to the real value (1.2 total factor vs the current 1.035).
   - Until then, the pack's P11 and P12 leaks of -19% and -16% overstate the problem: they are about -3% on the Smoobu basis.
3. **P13 4-8 Nov looks open for a second booking.** It is an Airbnb booking made 18 Oct, but PriceLabs listing 3064856 shows 4-7 Nov "available" in both the 18 and 19 Oct pulls. P13's other linked bookings (27-30 Oct, 13-16 Nov) show as Blocked there. Setting to check: Smoobu calendar for 3064856, 4-7 Nov. Confirm it is blocked on all channels.
4. **Direct is 0% of forward revenue.** Not a pricing fix. It needs a direct-site price check before the 10% direct discount can be confirmed.

Data gaps:
1. The CHANNELS markups and discounts in `rm/config.py` are unconfirmed defaults (Corentin has not confirmed them).
2. OTA websites are blocked and `channel_checks.csv` does not exist. No displayed price, discount stack, ordering, fee or minimum stay was observed.
3. There is no price-at-booking history. Snapshots start 18 Oct, after every booked night in the window was sold.
4. The meaning of the exact 1.2 factor between Smoobu basePrice and PriceLabs ADR on Booking.com is unknown (markup or VAT).
5. Airbnb promotion settings and the Smoobu Airbnb rate adjustment are not available.
6. P04 has 11 booked next-30 nights in PriceLabs but no Smoobu reservations.
7. `cleaning_gbp` is blank on every Booking.com row, so it is unknown whether cleaning sits inside basePrice.
8. Visibility Booster dates are not supplied, so Booking.com commission cannot be split into booster and non-booster.
9. The P13 linked listing 3090701 has no prices in the snapshot.
10. There is no reservation ID or cancellation date in the snapshot. New bookings and cancellations are inferred by key match.
