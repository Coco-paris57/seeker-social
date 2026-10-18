## Channel parity

Run date D = 2026-10-18. Sources:
- `data/snapshots/2026-10-18/reservations.csv`: 636 Smoobu bookings. `total_gbp` is Smoobu basePrice, before cleaning and commission.
- `data/snapshots/2026-10-18/raw/prices_*.json`: PriceLabs listing_prices, refreshed 2026-10-18. It gives ADR, booked_price and booked_date for each booked night.
- `reports/2026-10-18/kpi_pack.json`: `rate_leak_next_30` and `channel_economics`.
- PriceLabs `get_customizations`: read-only call, run on 2026-10-18.

**Config status.** The markups and discounts in `rm/config.py` CHANNELS are unconfirmed placeholders. Corentin has not yet sent his Smoobu channel markups or OTA promotions. The current values are Booking +15% markup and -10% discount, Vrbo +8%, and Direct -10%. Every "expected price" and every `channel_economics` figure below rests on these placeholders.

### Parity checks (observed OTA price vs expected)

| Ref | Channel | Date | Smoobu rate | Expected | Displayed | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|
| all | Airbnb | — | — | — | NOT CHECKED: airbnb.com is blocked from this environment, and `channel_checks.csv` is empty | — | — | — |
| all | Booking.com | — | — | — | NOT CHECKED: booking.com is blocked, and `channel_checks.csv` is empty | — | — | — |
| all | Vrbo | — | — | — | NOT CHECKED: vrbo.com is blocked, and `channel_checks.csv` is empty | — | — | — |
| all | Direct site | — | — | — | NOT CHECKED: no direct-site URL and no checks row | — | — | — |

These checks were not run, because no guest-facing price was observed:
- discount stacking (Genius, mobile, early-booker, country rate on Booking.com; weekly, monthly, early-bird, last-minute on Airbnb)
- the ordering check (direct < OTA)
- displayed fees and minimum stay

The analysis below uses booked revenue from Smoobu, not displayed prices.

### 1. Reservations by channel (all 636 Smoobu bookings, arrivals 2025-10-17 to 2027-03-19)

Revenue, nights, ADR and net figures count confirmed bookings only. Cancellation rates use all bookings. Commission % = commission_gbp / total_gbp.

| Channel | Bookings | Confirmed | Nights | Revenue £ | ADR £ | Commission % | Net after commission £ | Net ADR £ | Cancel rate (count) | Cancel rate (value) |
|---|---|---|---|---|---|---|---|---|---|---|
| Airbnb | 288 | 239 | 1,261 | 264,065 | 209 | 17.2% | 218,589 | 173 | 17.0% | 21.2% |
| Booking.com | 338 | 228 | 952 | 159,196 | 167 | 18.0% | 130,586 | 137 | 32.5% | 47.9% |
| Direct (Direct booking + Website) | 4 | 4 | 30 | 5,944 | 198 | 0.0% | 5,944 | 198 | 0.0% | 0.0% |
| Agoda | 5 | 1 | 6 | 1,090 | 182 | 0.0% (not recorded) | 1,090 | 182 | 80.0% | 75.9% |
| VRBO | 1 | 0 | 0 | 0 | — | — | 0 | — | 100.0% | — |
| **All** | 636 | 472 | 2,249 | 430,295 | 191 | 17.2% | 356,210 | 158 | 25.8% | 33.9% |

**Channel mix of confirmed revenue:**
- All arrivals: Airbnb 61.4%, Booking.com 37.0%, Direct 1.4%, Agoda 0.3%.
- Stays arriving 2025-10-18 to 2026-10-17 (£369,073): Airbnb 59.3%, Booking.com 38.8%, Direct 1.6%, Agoda 0.3%.

**Direct bookings share:**
- 4 of 636 bookings (0.6%), 30 of 2,249 confirmed nights (1.3%), 1.4% of revenue.
- The 4 bookings are P02, P01, P09 and P10. There have been none since 2026-09-30.
- The 10% direct discount cannot be verified. The direct ADR (£198) is not like-for-like with OTA ADR: it covers different properties and dates.

**Net after commission per £100 of Smoobu basePrice, observed:**
- Airbnb £82.78
- Booking.com £82.03
- Direct £100

`channel_economics` in the KPI pack shows Airbnb £84.50, Booking £87.97, Vrbo £99.36 and Direct £90.00, with no warnings. Those figures use the placeholder markups and 15% / 15.5% commission, so they overstate what Booking actually nets (see issue 2).

### 2. Reservations by length-of-stay band

| LOS band | Bookings | Confirmed | Nights | Revenue £ | ADR £ | Commission % | Net after commission £ | Net ADR £ | Cancel rate (count) | Cancel rate (value) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1-6 | 506 | 397 | 1,440 | 282,570 | 196 | 17.6% | 232,922 | 162 | 21.5% | 26.4% |
| 7-27 | 126 | 72 | 710 | 133,764 | 188 | 16.6% | 111,556 | 157 | 42.9% | 46.3% |
| 28-90 | 4 | 3 | 99 | 13,960 | 141 | 16.0% | 11,731 | 118 | 25.0% | 22.1% |
| 91+ | 0 | 0 | 0 | 0 | — | — | 0 | — | — | — |

| Channel | LOS | Bookings | Confirmed | Nights | Revenue £ | ADR £ | Commission % | Cancel rate (count) |
|---|---|---|---|---|---|---|---|---|
| Airbnb | 1-6 | 236 | 198 | 743 | 164,325 | 221 | 17.7% | 16.1% |
| Airbnb | 7-27 | 49 | 38 | 419 | 85,779 | 205 | 16.5% | 22.4% |
| Airbnb | 28-90 | 3 | 3 | 99 | 13,960 | 141 | 16.0% | 0.0% |
| Booking.com | 1-6 | 263 | 195 | 679 | 115,132 | 170 | 17.9% | 25.9% |
| Booking.com | 7-27 | 74 | 33 | 273 | 44,064 | 161 | 18.3% | 55.4% |
| Booking.com | 28-90 | 1 | 0 | 0 | 0 | — | — | 100.0% |
| Direct | 1-6 | 3 | 3 | 12 | 2,023 | 169 | 0.0% | 0.0% |
| Direct | 7-27 | 1 | 1 | 18 | 3,921 | 218 | 0.0% | 0.0% |
| Agoda | 1-6 / 7-27 | 4 / 1 | 1 / 0 | 6 / 0 | 1,090 / 0 | 182 / — | — | 75% / 100% |
| VRBO | 7-27 | 1 | 0 | 0 | 0 | — | — | 100.0% |

Nights split by band: 1-6 = 64%, 7-27 = 32%, 28-90 = 4%, 91+ = 0%. Monthly stays (28-90) are only 3 confirmed bookings, so they cannot explain the gap on most properties.

### 3. Why booked ADR is 22-41% below the PriceLabs price (next 30 nights)

I matched the 185 booked nights between 2026-10-19 and 2026-11-17 in the PriceLabs data to Smoobu reservations, by property and stay date. 171 nights matched. The other 14 are P04, which has no Smoobu reservations in the snapshot. The kpi_pack `rate_leak_next_30` gaps reproduce exactly from PriceLabs `ADR` vs `booked_price`.

**Proven from the data:**

1. **PriceLabs reports Booking.com ADR as exactly Smoobu basePrice / 1.2.**
   - On all 39 matched Booking.com nights, the Smoobu ADR / PriceLabs ADR ratio is 1.2000 (min 1.19997, max 1.20007).
   - On all 132 Airbnb nights the ratio is 1.0000.
   - Effect on Booking nights: the gap is -26.6% on the PriceLabs ADR basis and -11.9% on the Smoobu basePrice basis.
   - Effect on the portfolio: -22.8% becomes -19.8%.
   - Effect by property: P11 goes from -28.8% to -14.6%, P12 from -22.9% to -11.9%, P02 from -39.2% to -33.4%, P09 from -29.5% to -26.3%.
   - Whether the /1.2 basis or the Smoobu basis is the like-for-like comparison depends on what the 20% is. It could be a Smoobu Booking.com channel markup of 20%, or VAT. **This needs Corentin's Smoobu channel settings.** Config assumes a 15% Booking markup, which does not match a 1.2 factor.
2. **PriceLabs applies no length-of-stay discount.** On P01, P06, P10, P11 and P12 (checked with `get_customizations`), `weekly_discount` and `monthly_discount` are both off. The account level has no customizations. So `booked_price` is a full nightly rate with no LOS discount built in.
3. **The gap is concentrated in stays of 7 nights or more.** Next-30 matched nights, Smoobu basis:

   | LOS band | Nights | Booked ADR £ | PriceLabs price now £ | Gap | £ below PriceLabs |
   |---|---|---|---|---|---|
   | 1-6 | 49 | 260 | 271 | -4.3% | -570 |
   | 7-27 | 62 | 150 | 206 | -27.2% | -3,472 |
   | 28-90 | 60 | 131 | 187 | -29.8% | -3,332 |
   | **All matched** | 171 | 175 | 218 | -19.8% | -7,374 |

   - Stays of 7+ nights account for £6,804 of the £7,374 shortfall (92%).
   - Excluding P05, short stays are -19.3%, but that is only 29 nights.
   - Per booking:
     - P10: 32 nights at £106 vs £159, -33%.
     - P01: 37 nights at £162 and 30 nights at £152, vs £214, -27%.
     - P06: 11 nights at £178 plus 3 nights at £211, vs £310, -40%.
     - P09: 9, 10 and 12 nights at £96-126 vs £147.
   - P05 is the only property above PriceLabs (+8.6%). All its next-30 stays are 5-6-night Airbnb bookings made 63-83 days ahead.
4. **Lead time does not explain the pattern on its own.** Median lead is 32 days for short stays and about 28-31 days for long stays, so lead times are similar. Short stays at that lead are only about 4% below PriceLabs.

**Not proven (needs Corentin's channel settings or price history):**

- **Whether Airbnb or Booking LOS discounts cause the long-stay gap.** PriceLabs has none, so if one exists it sits in the Airbnb listing (weekly/monthly discount) or the Booking extranet (long-stay or Genius deals).
  - Across all history, Airbnb 7-27-night bookings show an ADR index (stay ADR / same property-month 1-6-night ADR) that falls by booking quarter: 1.20 (Q1 2026), 0.73 (Q2), 0.68 (Q3), 0.49 (Q4, 6 bookings).
  - That trend is consistent with a weekly/monthly discount added or deepened during 2026, but it is a correlation.
  - Some long stays in the window price at par with short stays in the same month (P10 index 0.98), which points to PriceLabs pricing above what converts, not to a discount.
  - Booking.com 7-27-night bookings price at 0.86 of same-month short stays over all history.
- **Price drift since booking.** `booked_price` is today's PriceLabs price for the date, not the price shown when the guest booked (median 27-33 days ago). The snapshot has no price history, so this drift cannot be separated from channel discounts.
- **Booking.com cleaning.** `cleaning_gbp` is blank on all 338 Booking.com rows but filled on 283 of 288 Airbnb rows. If Booking.com cleaning is embedded in basePrice, Booking ADR is overstated.

### 4. Issues ordered by £ impact

1. **Long-stay discounting: about £6,800 below PriceLabs on the next 30 days.** This is 122 nights, mainly P01, P10, P06, P09 and P08, plus P02, P11 and P12 on Booking.
   - Setting to check: the Airbnb listing's Pricing > Discounts > Weekly / Monthly discount for P01, P06, P08, P09 and P10.
   - Also check the Booking extranet Promotions (Long-stay deal, Genius level, Early-booker) for P02, P09, P11 and P12.
   - Next step: Corentin to send the current values. If a weekly discount deeper than about 10-15% is set, reduce it. Alternatively, move the LOS discount into PriceLabs `weekly_discount` / `monthly_discount` so it is visible and controlled.
2. **Booking.com commission is creeping up: £4,730 above 15% on confirmed stays, £3,810 of it on bookings made since July 2026.**
   - Effective rate by booking quarter: 15.0% (Q4 2025), 15.9% (Q1 2026), 16.6% (Q2), 21.4% (Q3, 64 bookings), 21.9% (Q4).
   - 33 bookings since 2026-06-17 carry 26-46% commission. P10's median is 27.9%, P09's 23.4%, P01's 21.3%.
   - 33 bookings sit at exactly 18.0%, which equals 15% x 1.2.
   - Setting to check: Booking extranet > Opportunities / Visibility Booster / Preferred Partner programme, and Finance > commission statement for these reservations.
   - At 21.9%, Booking nets £78.10 per £100 basePrice against Airbnb's £82.78. That breaks the rule that Booking must net at least what Airbnb nets, unless the Smoobu Booking markup covers the difference.
3. **Booking.com cancellations: 47.9% of booked value cancelled (£146,277 across 110 bookings), against Airbnb's 21.2% (£70,995).**
   - Booking 7-27-night stays cancel at 55.4% by count.
   - Booking stays booked 31-90 days out cancel at 41.2%, and those booked 91+ days out at 63.4%.
   - Setting to check: Booking extranet > Policies. Look for a non-refundable rate plan and whether the free-cancellation window is too long.
4. **The Booking.com /1.2 ADR basis affects every "rate leak" figure for P02, P09, P11 and P12.** On the 39 Booking nights the shortfall is £2,025 on the PriceLabs-ADR basis but £908 on the Smoobu basePrice basis. That makes £1,117 of it a matter of reporting basis, not lost revenue, if the 20% is a markup. The kpi_pack total of £8,987 also includes £496 for P04, whose reservations are not in the snapshot. Setting to check: Smoobu > Channel Manager > Booking.com > price adjustment (%). Then update `CHANNELS["booking"]["markup"]` in `rm/config.py` once confirmed.
5. **The direct channel is negligible: 1.4% of revenue, 4 bookings.** The 10% direct-discount rule cannot be tested without a direct-site price check.
6. **Airbnb commission matches config.** It is 15.5% of (basePrice + cleaning) on 234 of 237 confirmed bookings, which is 17.2% of basePrice because the fee also applies to cleaning (£33,261). This is not an issue. Analyses should use 17.2% when working on basePrice.

### Data gaps:
1. Smoobu channel markups (Booking, Airbnb, Vrbo) and OTA promotions are not supplied. CHANNELS values are unconfirmed placeholders.
2. `channel_checks.csv` is empty, and Airbnb, Booking.com and Vrbo pages are blocked. No displayed price, discount stack, fee or minimum stay was observed.
3. The meaning of the exact 1.2 factor between Smoobu basePrice and PriceLabs ADR on Booking.com reservations is unknown (markup or VAT).
4. There is no PriceLabs price history at booking date, so price drift cannot be separated from channel discounts.
5. `cleaning_gbp` is blank for every Booking.com reservation.
6. P04 has 14 booked next-30 nights in PriceLabs but no Smoobu reservations in the snapshot, so its channel and length of stay are unknown.
7. Agoda commission is not recorded (5 rows), and 13 rows have no commission_gbp.
8. No direct-site URL or price is available to test the direct-cheapest rule.
