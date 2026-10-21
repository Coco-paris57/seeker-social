## Channel parity

Run date D = 2026-10-21. Sources:
- `data/policy.json` (updated 20 Oct), read first.
- `data/snapshots/2026-10-21/reservations.csv` (666 rows) and `prices.csv`, plus the 18/19/20 Oct snapshots.
- `reports/2026-10-21/kpi_pack.json`: per-property `rate_leak_next_30` / `rate_leak_after_los`, and `channel_economics`. The pack has no portfolio-level rate-leak key.
- `rm/config.py` CHANNELS.
- PriceLabs connector (read-only `get_listing_prices`, pulled 21 Oct) for two P04 listings:
  - Channex listing 7dc96cda…, 18 Dec–3 Jan
  - Smoobu listing 3562176, 22 Oct–3 Jan

These are settled in `policy.json` and not raised here:
- the 15% weekly and 20% monthly stay discounts
- Visibility Booster commission
- P13 as one flat
- the P02/P03/P06/P07 blocks
- the P14 setup
- the P20 extension paid separately

**Config status.**
- **Confirmed:** Booking.com +20% Smoobu markup (Corentin, 20 Oct), and that Booking.com promotions stack.
- **Confirmed but size unknown:** an Airbnb discount beyond the stay discounts is active. Its type and % are not known. `CHANNELS["airbnb"]["discount"]` is still 0.00.
- **Unconfirmed defaults:** Vrbo +8% and Direct −10%.

Below, "expected" means PriceLabs `booked_price` × markup (Booking 1.2, Airbnb 1.0) × stay factor (0.85 for 7–27 nights, 0.80 for 28+). "Paid" means Smoobu basePrice ÷ nights, before cleaning and commission. "Implied extra discount" = 1 − paid ÷ expected. Policy says both gaps are explained (the Airbnb discount, and stacked Booking promotions), so they are reported as the **size of those promotions**, not as unexplained leakage.

### Parity checks (displayed guest price)

| Ref | Channel | Date | Smoobu rate | Expected | Displayed | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|
| all | Airbnb | — | — | — | NOT CHECKED: live OTA pages are blocked from this environment, and there is no `channel_checks.csv` (pack `missing.channel_checks = empty`) | — | — | — |
| all | Booking.com | — | — | — | NOT CHECKED: same reason | — | — | — |
| all | Vrbo | — | — | — | NOT CHECKED: same reason | — | — | — |
| all | Direct site | — | — | — | NOT CHECKED: no direct-site URL and no checks row | — | — | — |

Without a displayed price, these checks could not be run:
- the displayed discount stack
- direct < OTA ordering
- displayed fees and minimum stay

There are also no forward Direct or Website stays to compare with. The last one, P10 12–16 Oct, is past.

### 1. Like-for-like update of yesterday's two gaps

**Fixed basis:** nights 22 Oct–18 Nov, the 18 Oct price anchor, confirmed Smoobu reservations, P04 excluded. Yesterday's file and today's file were run through the same code. That code reproduces yesterday's headline figures exactly: Airbnb since 1 Oct −23.0% / −£3,188 on 82 nights, and Booking −18.7% / −£1,120 on 28 nights.

| Same nights, 18 Oct anchor | 20 Oct file | 21 Oct file | Change |
|---|---|---|---|
| Airbnb, booked since 1 Oct (81 n) | −23.1%, −£3,174 | −23.1%, −£3,174 | none |
| Airbnb, booked before 1 Oct (28 n) | +0.6%, +£45 | +0.6%, +£45 | none |
| Booking, booked since 1 Oct (12 n) | −28.5%, −£823 | −28.5%, −£823 | none |
| Booking, booked before 1 Oct (14 n) | −8.3%, −£231 | −8.3%, −£231 | none |

**Rolled window, today's next 30 nights (22 Oct–19 Nov).**

| Channel | Nights | vs 18 Oct anchor | £ | vs 21 Oct prices | £ |
|---|---|---|---|---|---|
| Airbnb, all | 112 / 114 | −14.4% | −3,204 | −16.8% | −3,903 |
| Airbnb, booked since 1 Oct | 84 / 86 | **−22.3%** | **−3,249** | −25.9% | −4,079 |
| Airbnb, booked before 1 Oct | 28 | +0.6% | +45 | +2.3% | +177 |
| Booking (excl. P04), all | 27 | **−19.1%** | **−1,143** | −21.6% | −1,330 |
| Booking, booked since 1 Oct | 12 | −28.5% | −823 | −32.3% | −985 |
| Booking, booked before 1 Oct | 15 | −10.4% | −320 | −11.1% | −345 |
| P04 Booking (new, see §3) | 7 | −38.2% (vs 1.2×) / −25.7% (vs 1.0×) | −521 / −293 | — | — |

Notes:
- The 114 Airbnb nights against today's prices include 2 P20 nights. P20 is not in the 18 Oct snapshot.
- The first night of each stay has no `booked_price` in PriceLabs, so it is excluded. Yesterday's method did the same.
- Airbnb run-rate on the yesterday method: −£3,249 × 30 ÷ 21 booking days = **about £4,640/month** at the 18 Oct anchor (yesterday £4,782).

Per property, next 30 nights, 18 Oct anchor:

| Ref | Channel | Nights | Gap | £ |
|---|---|---|---|---|
| P06 | Airbnb | 12 | −32.4% | −1,054 |
| P11 | Booking | 15 | −19.3% | −638 |
| P10 | Airbnb | 28 | −17.1% | −613 |
| P04 | Booking | 7 | −38.2% (vs 1.2×) | −521 |
| P01 | Airbnb | 28 | −10.1% | −490 |
| P08 | Airbnb | 9 | −27.1% | −475 |
| P12 | Booking | 9 | −17.0% | −381 |
| P09 | Airbnb | 13 | −20.9% | −348 |
| P12 | Airbnb | 3 | −26.9% | −188 |
| P20 | Airbnb | 2 | −34.2% (21 Oct price) | −186 |
| P02 | Airbnb | 3 | −34.9% | −168 |
| P02 | Booking | 2 | −35.3% | −101 |
| P09 | Booking | 1 | −14.8% | −22 |
| P13 | Airbnb | 1 | +0.4% | +1 |
| P05 | Airbnb | 15 | +2.3% | +132 |

### 2. Implied extra discount per channel: INFERENCE FROM DATA, NOT FACT

**Basis:**
- Every confirmed Airbnb/Booking reservation with nights from 22 Oct onward.
- Each night is priced at the **earliest** snapshot that holds it (18 Oct for nights up to 17 Dec), already after the stay-discount allowance.
- Nights-weighted, with the per-booking median beside it.
- Excluded: 5 P13 bookings with no `booked_price` on 3064856, and 3 bookings beyond the 20 Dec snapshot horizon.

**Main caveat.** There is no price-at-booking history. The anchor is the PriceLabs price on 18 Oct, not the price shown when the guest booked. Airbnb bookings made before October come out on price (+1.5% over 40 nights), which suggests the anchor bias is small. It cannot be proven.

**Airbnb (25 bookings, 153 priced nights)**

| Booked | Bookings / nights | Implied extra discount | £ |
|---|---|---|---|
| Aug | 3 / 15 | −9.1% (paid above price) | +594 |
| 1–15 Sep | 1 / 5 | 5.4% | −119 |
| 16–30 Sep | 5 / 20 | 12.2% | −696 |
| 1–15 Oct | 10 / 88 | 19.5% | −2,907 |
| 16–21 Oct | 6 / 25 | 30.1% | −1,862 |
| **All Oct** | **16 / 113** | **22.6% (median 25.1%, range 9.7–38.2%)** | **−4,769** |

October bookings by lead time:

| Lead time | Bookings | Implied extra discount | Median |
|---|---|---|---|
| ≤14 days | 6 | 25.2% | 30.4% |
| 15–30 days | 4 | 22.4% | 29.8% |
| >30 days | 6 | 18.9% | 18.5% |

October bookings by stay length:

| Stay length | Bookings | Implied extra discount |
|---|---|---|
| 1–6 nights (no stay discount) | 11 | 25.3% (median 29.3%) |
| 7–27 nights | 3 | 27.3% beyond the 15% |
| 28+ nights | 2 | 17.7% beyond the 20% (P10 17.1%, P01 18.1%) |

What the data suggests:
- **It starts in late September and grows through October.** Bookings made before then are on price.
- **It is present at every lead time**, from 5 to 60 days. So it is **not last-minute only** and **not early-bird only**. It is a little deeper at short lead (about 30% median at ≤30 days vs about 18% at >30 days).
- **That pattern fits best with a custom / limited-time promotion, or a negative Airbnb rate adjustment of roughly 20–30%** set around late September, perhaps with a last-minute discount on top for short lead.
- **28+ night stays show less extra discount (about 18%) than short stays (about 29%).** So whatever it is does not stack as one flat % on top of the 20% monthly discount. Airbnb may be applying the larger discount rather than both, or the promotion may exclude long stays. This is inference only.
- **It is getting deeper.** Bookings made 16–21 Oct are at about 30%, against about 19.5% for 1–15 Oct.

**Booking.com (12 bookings excl. P04, 56 priced nights)**

| Booked | Bookings / nights | Implied extra discount vs 1.2× after stay discount | £ |
|---|---|---|---|
| Jul | 1 / 13 | 29.5% (lead 135 d) | −1,149 |
| Sep | 9 / 31 | 21.4% (median 22.1%) | −1,659 |
| Oct | 2 / 12 | 28.5% | −823 |

By lead time:

| Lead time | Bookings | Implied extra discount |
|---|---|---|
| 15–30 days | 4 | 13.6% (median 6.1%) |
| 31–60 days | 3 | 35.4% |
| 61+ days | 5 | 26.5% |

What the data suggests:
- **There is no time trend.** The gap is the same size from July to October, so it looks like a standing stack, not something new.
- **It is bigger at longer lead.** That fits an Early Booker-type deal stacking with standing ones such as Genius or Mobile. For scale: Genius 10% + one 15% deal = 23.5% off; three 10% deals = 27.1% off.
- Overall, Booking paid ≈ **0.90 × PriceLabs** after the stay discount. In practice the +20% markup is being more than used up by the promotions.

### 3. P04 Barking: first measurement (Booking.com)

The 6 Smoobu reservations, all with `booked_on` 2026-10-20 (the import date), are new.
- The **real booking dates** come from the PriceLabs Channex listing (`booked_date`): 18 Sep to 18 Oct.
- The prices compared with are Channex `booked_price` from the 18 Oct snapshot. For 21 Dec–1 Jan they come from the 21 Oct connector pull, because no earlier snapshot holds those dates.
- The stays were sold via Channex before the Smoobu import. So **whether the Smoobu +20% markup applied is unknown**, and both bases are shown.

| Stay | Nights | Booked (Channex) | Lead | Paid/night | Implied vs 1.0× | Implied vs 1.2× | £ vs 1.2× |
|---|---|---|---|---|---|---|---|
| 22–25 Oct | 3 | 16 Oct | 6 | £120.18 | 26.9% | 39.1% | −154 |
| 26 Oct–1 Nov | 6 | 23 Sep | 33 | £120.65 | 25.3% | 37.8% | −366 |
| 25 Nov–2 Dec | 7 | 26 Sep | 60 | £150.99 | 1.5% | 17.9% | −198 |
| 3–6 Dec | 3 | 11 Oct | 53 | £115.35 | 41.3% | 51.1% | −241 |
| 20 Dec–2 Jan | 13 | 18 Oct | 63 | £185.95 | 18.8% | 32.3% | −1,066 |
| **Total** | **32 (27 priced)** | | | | **19.0%** | **32.5%** | **−2,026 (−986 vs 1.0×)** |

What this shows:
- P04 Booking was paid **about 19% below the Channex PriceLabs price even before any markup**. That is a deeper effective discount than the other Booking listings (about 10% below 1.0×), and it does not depend on lead time.
- The 2–7 Nov stay (booked 18 Sep, £682.02) is **cancelled in Smoobu but still "Booked" in the Channex PriceLabs listing** on 21 Oct. The Smoobu PriceLabs listing 3562176 shows 2–7 Nov as open, at £171–176.
- **Two PriceLabs listings now sync P04, both with base 220**:
  - Channex, last push 20 Oct 11:29
  - Smoobu 3562176, 11:30

  Their open prices differ slightly (for example 22 Oct booked_price £150 Channex vs £142 Smoobu). Which one feeds Booking.com from now on, and whether the +20% is set on the Smoobu Barking apartment, is unknown.
- P04 Booking rows carry no commission, so P04 net cannot be calculated.

### 4. New, changed and cancelled bookings since the 20 Oct snapshot

Matched on ref + channel + arrival + departure + booked_on.

| Channel | New | Changed | Cancelled |
|---|---|---|---|
| Airbnb | 0 | 0 | 0 |
| Booking.com | 6 P04 imports: 5 confirmed, 1 cancelled (see §3). No organic new booking. | 0 | 0 |
| Others | 0 | 0 | 0 |

- One P12 Booking row (17–20 Oct **2025**) dropped out of the file. That is the 365-day window rolling forward, not a cancellation.
- The last Airbnb booking was made on 19 Oct (P01 18–21 Dec, 9.7% implied). The last non-P04 Booking.com booking was made on 10 Oct.

### 5. Net to owner

**Pack `channel_economics`** (per £100 Smoobu base, config values): Airbnb £84.50, Booking £102.00 (guest £120, 15%), Vrbo £99.36, Direct £90.00. Warnings: none.

**These overstate both OTAs**, because config has no Airbnb discount and no Booking promotions.

Realised on forward priced nights, per £100 of PriceLabs price after stay discount:

| Channel | Paid | Realised commission | Net to owner |
|---|---|---|---|
| Airbnb, booked before Oct | £98.5 | 17.4% of base (15.4% of base + cleaning) | ≈ £81.4 |
| Airbnb, booked in Oct | £77.4 | 17.4% | **≈ £63.9** |
| Booking.com (excl. P04) | £90.0 | 18.0% avg (122/227 above 15%; booster dates not supplied, so the excess is not flagged) | **≈ £73.8** (£76.5 at 15%) |
| P04 Booking | £81.0 | not in data | n/a |
| Vrbo / Direct | no forward stays | — | — |

**Booking still nets more than Airbnb** (about £73.8 vs about £63.9 on October bookings), so the "Booking ≥ Airbnb net" rule holds. The margin is now coming from the +20% markup absorbing the promotions.

### 6. Issues ordered by £ impact

1. **The Airbnb discount costs about 22.6% on October bookings: −£4,769 on 113 forward nights (−£3,249 in the next 30, about £4,640/month run-rate).** It is getting deeper (about 30% on bookings made 16–21 Oct).
   - The data points to a custom/limited-time promotion or a negative channel adjustment of roughly 20–30%, starting late September and active at all lead times. Inference only.
   - Settings to check:
     - Airbnb > Listing > Pricing & availability > Promotions and discounts: custom / limited-time promotion, last-minute, early-bird. The weekly discount should be exactly 15% and the monthly exactly 20%, and Smart Pricing should be off.
     - Smoobu > Channel Manager > Airbnb > price adjustment (%).
   - Start with P06 (−£1,054), P10, P01, P08 and P09.
   - Once Corentin gives the type and %, set `CHANNELS["airbnb"]["discount"]` in `rm/config.py`.
2. **Booking.com stacked promotions take about 24–29% off the 1.2× price: −£3,631 on 56 forward nights (excl. P04); −£1,143 in the next 30.** Paid ≈ 0.90 × PriceLabs.
   - Explained per policy. Its size is reported for a decision: is a 10% net discount to PriceLabs intended?
   - Setting: Booking extranet > Promotions, plus Genius and Mobile rates. List the active deals per property (P11, P12 first). Remove or limit the Early Booker-type deal if long-lead stays should not get the deepest cut. Alternatively, raise the Smoobu Booking markup above +20% to target the net.
3. **P04 Booking was paid 19% under the Channex price before markup (32.5% vs 1.2×): −£986 to −£2,026 on 27 forward nights.**
   - Settings to check:
     - which PriceLabs listing pushes to Booking.com now (Channex 7dc96cda… or Smoobu 3562176). Turn sync off on the one not in use.
     - whether Smoobu applies +20% to the Barking apartment
     - P04's Booking extranet promotions
   - Also reconcile the 2–7 Nov stay: cancelled in Smoobu, still Booked in the Channex PriceLabs listing.
4. **The Pack `channel_economics` overstates net** (Airbnb £84.50 vs about £63.9 realised on October bookings; Booking £102 vs about £73.8). Add the Airbnb discount and a Booking promotion factor to config once they are confirmed.

Data gaps:
1. Not confirmed: the Airbnb extra discount's type and %, the Booking promotion list and sizes, the Vrbo +8% and Direct −10% defaults. The Booking +20% markup **is** confirmed.
2. Live OTA pages are blocked and `channel_checks.csv` does not exist. No displayed price, discount stack, ordering, fee or minimum stay was observed.
3. There is no price-at-booking history. The 18 Oct anchor is the closest available, so the implied % is an estimate.
4. P13: 5 Airbnb bookings have no `booked_price` on 3064856 and are excluded from §2.
5. P04:
   - the Smoobu `booked_on` is the import date, so the real dates were taken from Channex PriceLabs
   - no commission on any P04 row
   - the 2–7 Nov cancellation is not reflected in Channex PriceLabs
   - the active pushing listing is unknown
   - the P04 mapping to Smoobu 3562176 is still "check" in `id_map.json`
6. Visibility Booster dates are not supplied, so Booking.com commission cannot be split into booster and non-booster.
7. `cleaning_gbp` is blank on every Booking.com row.
8. The pack has no portfolio-level `rate_leak_*` key; the figures here are recomputed from the snapshots.
9. The snapshot has no reservation ID or modification date. Changes are inferred by key match.
