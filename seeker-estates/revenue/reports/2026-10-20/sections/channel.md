## Channel parity

Run date D = 2026-10-20. Sources:
- `data/snapshots/2026-10-20/reservations.csv` (661 rows) and `data/snapshots/2026-10-19/reservations.csv`. `total_gbp` is the Smoobu basePrice, before cleaning and commission.
- `prices.csv` from the 18, 19 and 20 Oct snapshots. The 20 Oct pull covers 21 Oct to 19 Dec.
- `reports/2026-10-20/kpi_pack.json`: `rate_leak_after_los`, `channel_economics` and `checks`.
- `data/policy.json`, read first. These are settled and not raised here: the 15% weekly and 20% monthly stay discounts, Visibility Booster commission, P13 as one flat, the P02/P03/P06/P07 blocks and the P14 setup.

**Config status.** `rm/config.py` CHANNELS changed in the 19 Oct run. Booking.com went from +15% markup / -10% discount to **+20% markup / 0% discount**. That value comes from the 1.2000× ratio seen in the data. **Corentin has not confirmed it.** Vrbo (+8%) and Direct (-10%) are still unconfirmed defaults.

Below, "expected" means PriceLabs `booked_price` × channel markup (Booking 1.2, Airbnb 1.0) × (1 − stay discount: 15% for 7-27 nights, 20% for 28+). "Paid" means Smoobu basePrice ÷ nights.

### Parity checks (displayed guest price)

| Ref | Channel | Date | Smoobu rate | Expected | Displayed | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|
| all | Airbnb | — | — | — | NOT CHECKED: OTA pages are blocked from this environment, and `channel_checks.csv` does not exist (pack `missing.channel_checks = empty`) | — | — | — |
| all | Booking.com | — | — | — | NOT CHECKED: same reason | — | — | — |
| all | Vrbo | — | — | — | NOT CHECKED: same reason | — | — | — |
| all | Direct site | — | — | — | NOT CHECKED: no direct-site URL and no checks row | — | — | — |

Without a displayed price, these checks could not be run:
- discount stacking (Genius, mobile, early-booker and country rate on Booking.com; early-bird, last-minute and custom promotions on Airbnb)
- direct < OTA ordering
- displayed fees and minimum stay

Everything below uses booked revenue.

### 1. Has yesterday's Airbnb finding moved?

Yesterday's finding: Airbnb nights booked since 1 Oct, next 30 nights, were -23.4% after stay discounts, -£3,307 on 82 nights. That works out to about £5,221/month (× 30/19).

I matched 143 of 155 booked next-30 nights (21 Oct to 18 Nov) to Smoobu reservations. Two sets are left out:
- P04: 11 nights, no Smoobu reservations.
- P20 on 21 Oct: 1 night, ambiguous. See §2.

| Airbnb, booked since 1 Oct | Nights | Paid | Expected | Gap | £ |
|---|---|---|---|---|---|
| 19 Oct run (19 Oct prices) | 82 | £10,801 | £14,108 | -23.4% | -3,307 |
| Today, vs today's prices (pack method) | 84 | £11,056 | £15,082 | **-26.7%** | **-4,026** |
| Today, vs 18 Oct prices (fixed anchor, closest to booking time) | 82 | £10,697 | £13,885 | **-23.0%** | **-3,188** |
| Same 81 nights, vs 19 Oct prices | 81 | — | — | -23.6% | -3,297 |
| Same 81 nights, vs 20 Oct prices | 81 | — | — | -27.0% | -3,957 |

**On a like-for-like basis the leak has not moved.** On the nights covered by both snapshots:
- Paid is identical on both days (£19,124 on 112 Airbnb nights).
- What changed is the price it is compared with: Airbnb `booked_price` rose 3.4% overnight on these nights, Booking.com 7.7%.
- The rises match the base price changes made on the evening of 18 Oct, which reached booked-night prices only today: P01 +10.0%, P09 +10.7%, P11 +10.0%, P12 +5.2%, P06 +4.9%.
- So the -£719 widening against today's prices is the price moving after the booking, not new leakage.

**Run-rate.** Yesterday's method (shortfall × 30 ÷ booking days since 1 Oct, now 20) gives:
- **£6,039/month** against today's prices
- **£4,782/month** against the 18 Oct anchor, which I recommend using

Both count next-30 stays only. No new Airbnb booking landed in the next-30 window in the last day.

Other cuts of the Airbnb next-30 nights (today's prices):
- **By when booked.** Before 1 Oct: -5.4% (31 nights), or +1.6% against 18 Oct prices. Since 1 Oct: -26.7%. The leak is still concentrated in October bookings.
- **By lead time.** Booked ≤30 days ahead: -22.9% (96 nights). Booked more than 30 days ahead: -8.1% (19 nights).
- **By stay length, after the stay-discount allowance.** 1-6 nights -14.8%, 7-27 nights -28.8%, 28+ nights -17.5%. The 7-27-night gap again points to Airbnb weekly discounts or promotions deeper than the 15% in policy.

### 2. New, changed and cancelled bookings since the 19 Oct snapshot

Matched on ref + channel + arrival + departure + booked_on. The snapshot has no reservation ID.

| Channel | New | Changed | Cancelled |
|---|---|---|---|
| Airbnb | 0 | 1: P20 stay of 10-18 Oct now shows departure 22 Oct (12 nights). The total is unchanged at £1,854.40 base. | 0 |
| Booking.com | 0 | 0 | 0 |
| Direct | 0 net | — | 1: P20 Direct booking 18-22 Oct, £927.20 base (£231.80/night), booked and cancelled after the 19 Oct pull |
| Agoda / Vrbo / Website | 0 | 0 | 0 |

- **P20 21 Oct is inconsistent between sources.**
  - PriceLabs shows the night Booked at ADR £231.80, which is the cancelled direct booking's rate.
  - Smoobu now attributes 18-21 Oct to the Airbnb stay without any extra revenue.
  - Either the Airbnb extension's revenue has not synced, or PriceLabs still holds the cancelled direct booking.
  - I excluded this night. The pack's P20 figure of -11.2% includes it at £231.80. On the clean nights (22-24 Oct Airbnb), P20 is -25.0%.
  - Check: Smoobu reservation for P20 10-22 Oct (price and nights), and the PriceLabs calendar on 18-21 Oct.
- **P01 Airbnb 18-21 Dec (booked 19 Oct; the only Airbnb booking made since 19 Oct).** It was already in yesterday's file, and its price is now visible in PriceLabs.
  - It was paid £240.30/night. PriceLabs `booked_price` on 19 Dec is £280, so it is **-14.2%** with no stay discount applying.
  - Against the 19 Oct pull's open price of £265 (18 Dec), it is -9.3%.
  - This is the same pattern as the October bookings, and it is outside the next-30 window.
- The latest confirmed Booking.com booking was made 10 Oct (any stay date). The latest one with nights in the next-30 window was made 3 Oct.

### 3. Per property and channel, next 30 nights

Today's price is the pack basis. The 18 Oct price is the fixed anchor. Booking.com uses the 1.2 markup from config.

| Ref | Channel | Nights | Gap vs today's price | £ | Gap vs 18 Oct price | £ | Main driver |
|---|---|---|---|---|---|---|---|
| P06 | Airbnb | 12 | -34.9% | -1,181 | -32.4% | -1,054 | 11-night stay booked 16 Oct, £178/night, -35%; 3-night stay -35% |
| P11 | Booking | 15 | -26.2% | -946 | -19.3% | -638 | 7-night stay booked 3 Oct, £147/night, -44% |
| P01 | Airbnb | 28 | -17.0% | -895 | -9.6% | -461 | 30-night stay booked 15 Oct -21%; 37-night stay booked 18 Sep -10% (0% yesterday; base +10%) |
| P10 | Airbnb | 29 | -18.2% | -681 | -16.9% | -627 | 32-night stay booked 9 Oct, £106/night |
| P09 | Airbnb | 12 | -30.2% | -525 | -21.6% | -333 | 9-night stay booked 4 Oct -35% |
| P08 | Airbnb | 10 | -23.3% | -435 | -25.2% | -481 | 6-night stay booked 17 Oct, £129/night, -38% |
| P12 | Booking | 8 | -18.1% | -369 | -14.9% | -292 | 7-night stay booked 3 Oct -25% |
| P05 | Airbnb | 15 | -4.5% | -273 | +4.6% | +255 | Explained by the base price raise of 18 Oct; on price against 18 Oct |
| P12 | Airbnb | 3 | -31.0% | -230 | -26.8% | -188 | 2- and 3-night stays booked 14-15 Oct |
| P02 | Airbnb | 3 | -34.9% | -168 | -34.9% | -168 | 4-night stay booked 15 Oct, £104/night |
| P02 | Booking | 3 | -32.4% | -134 | -34.6% | -148 | 7-night stay booked 28 Sep |
| P20 | Airbnb | 2 | -25.0% | -119 | n/a | — | 3-night stay booked 17 Oct (21 Oct excluded, see §2) |
| P09 | Booking | 2 | -20.8% | -66 | -14.2% | -42 | 10-night stay booked 7 Sep |
| P13 | Airbnb | 1 | +3.3% | +6 | +0.4% | +1 | On price |
| **Airbnb** | | **115** | **-18.8%** | **-4,503** | **-13.8%** | **-3,058** | Since 1 Oct: -26.7% / -23.0% |
| **Booking** | | **28** | **-23.8%** | **-1,515** | **-18.7%** | **-1,120** | Since 1 Oct: -34.6% / -28.5% |
| **All** | | **143** | **-19.8%** | **-6,018** | **-14.8%** | **-4,178** | |

**Booking.com changes from yesterday because of the config change, not because of new data.**
- Yesterday's report put Booking at -0.3% on a "Smoobu basis", with no markup.
- Config now says the 20% is an intended Smoobu markup. On that basis Booking.com is as far under price as Airbnb: -18.7% against 18 Oct, and -28.5% on October bookings, with P11 and P12 driving it.
- If the 1.2 turns out to be VAT or a reporting artefact rather than a markup, Booking is back to about on price. So the Booking.com £ figures depend on Corentin confirming the markup.

### 4. Net to owner

**Pack figures** (`channel_economics`, per £100 Smoobu base, config values):
- Airbnb £84.50
- Booking £102.00 (guest £120, 15% commission)
- Vrbo £99.36
- Direct £90.00
- No warnings.

**Realised commission** (confirmed bookings in the file):
- **Airbnb:** 17.2% of base. That is 15.3% of base + cleaning, so commission is also charged on cleaning. Net is about **£82.80 per £100 base**.
- **Booking.com:** 18.0% of base on average, with 122 of 227 bookings above 15%. Policy says Visibility Booster dates explain this, but booster dates are not supplied, so the split cannot be made. Not flagged. Net is about **£98.40 per £100 Smoobu rate**, if the 1.2 markup holds.

**Realised on next-30 nights, per £100 of the expected price after stay discounts (18 Oct anchor):**
- Airbnb: £86.20 paid → about **£71.40 net**
- Booking.com: £81.30 of the expected 1.2× price → about **£80.00 net** per £100 Smoobu-equivalent

So Booking.com still nets more than Airbnb, and the "Booking ≥ Airbnb net" rule holds.

**Direct:** no direct stay is on the books from today. The only new direct booking (P20) was cancelled.

### 5. Issues ordered by £ impact (next 30 nights)

1. **Airbnb bookings made since 1 Oct are 23% under price after stay discounts: -£3,188 on 82 nights against the 18 Oct anchor (-£4,026 / -26.7% against today's prices).**
   - It has not moved like-for-like since yesterday. The new P01 Dec booking (-14%) shows it is still happening.
   - Main properties: P06 -£1,054, P10 -£627, P08 -£481, P01 -£461, P09 -£333, P12 -£188, P02 -£168, P20 -£119.
   - Settings to check, for each listing in Airbnb: Pricing & availability > Promotions and discounts (early-bird, last-minute, custom, new-listing). The weekly discount must be exactly 15% and the monthly exactly 20%, and Smart Pricing must be off.
   - Setting to check in Smoobu: Channel Manager > Airbnb > price adjustment (%).
   - Start with P06, P08, P10 and P01. Remove any promotion or negative adjustment that is not intended.
2. **Booking.com October bookings are -28.5% against 1.2× PriceLabs: -£1,120 on 28 nights, mostly P11 -£638 and P12 -£292.**
   - This only counts if the +20% markup is intended.
   - Smoobu > Channel Manager > Booking.com > price adjustment: confirm +20% and set `CHANNELS["booking"]` in `rm/config.py` to match.
   - Booking extranet > Promotions: check for Early Booker, Mobile, Country rate or Basic Deal on P11 and P12, and whether they stack with Genius. The P11 3-10 Nov stay at -44% is deeper than any single standard promotion.
3. **P20 18-21 Oct does not match between Smoobu and PriceLabs** after the direct cancellation (see §2). It is small in £, but the pack's P20 leak is understated because of it. Check the Smoobu reservation and the PriceLabs calendar.
4. **Direct is 0% of forward revenue.** It needs a direct-site price check before the 10% direct discount can be confirmed.

Data gaps:
1. Not confirmed by Corentin: the Booking +20% markup (config from observed data, 19 Oct), and the Vrbo +8% and Direct -10% defaults.
2. OTA pages are blocked and `channel_checks.csv` does not exist. No displayed price, discount stack, ordering, fee or minimum stay was observed.
3. There is no price-at-booking history. Snapshots start 18 Oct, after almost every next-30 night was sold. The 18 Oct anchor is the closest available.
4. Airbnb promotion settings, the Smoobu Airbnb/Booking rate adjustments and the Booking extranet promotions are not available.
5. P04: 11 booked next-30 nights in PriceLabs but no Smoobu reservations.
6. P20 18-21 Oct: conflicting revenue between Smoobu and PriceLabs.
7. Visibility Booster dates are not supplied, so Booking.com commission cannot be split into booster and non-booster.
8. `cleaning_gbp` is blank on every Booking.com row.
9. The snapshot has no reservation ID, modification date or cancellation date. Changes are inferred by key match.
