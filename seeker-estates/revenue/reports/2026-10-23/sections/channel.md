## Channel parity

Run date D = 2026-10-23. I read `data/policy.json` first.

**Sources**
- `data/snapshots/2026-10-23/reservations.csv` (667 rows), diffed against the 18–22 Oct snapshots.
- `data/snapshots/2026-10-23/prices.csv` and `reports/2026-10-23/kpi_pack.json` (`rate_leak_next_30`, `rate_leak_after_los`, `channel_economics`).
- Smoobu API, GET only, about 06:20Z:
  - `/api/rates` for 3064196 (P11) and 2699998 (P12), 1–27 Nov.
  - `/api/reservations` with cancellations. The `modifiedAt` field is used as a stand-in for the cancellation time.
- PriceLabs connector `get_listing_prices` for 3064196, 19–27 Nov.

**Paid** means Smoobu `total_gbp` (basePrice, before cleaning and commission) ÷ nights.

**Not raised, because `policy.json` settles them**
- the 15%/20% stay discounts
- Visibility Booster commission
- Booking.com promotions stacking
- P13 as one flat
- the P02/P03/P06/P07 blocks
- P14
- P20's separately paid extension, its 20% new-listing promotion, and its 22 Oct discount set
- nights after handback dates

**Config status (`rm/config.py` CHANNELS)**
- Confirmed: Booking.com +20% markup (global). Airbnb price adjustment is 0%.
- Unconfirmed defaults: Vrbo +8% and Direct −10%.
- Smoobu Airbnb default pricing rules are known only for the two Shepherd's Bush listings (changed 21 Oct) and for P20's Airbnb discounts page (22 Oct). They are **unknown for every other flat**.

### Parity checks (displayed guest price)

| Ref | Channel | Date | Smoobu rate | Expected | Displayed | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|
| all | Airbnb | — | — | — | NOT CHECKED: proxy refused the connection to airbnb.co.uk (CONNECT 403, 23 Oct 06:21Z). `channel_checks` is empty in the pack. | — | — | — |
| all | Booking.com | — | — | — | NOT CHECKED: booking.com, same proxy 403. No checks row. | — | — | — |
| all | Vrbo | — | — | — | NOT CHECKED: no checks row, no page loaded | — | — | — |
| all | Direct site | — | — | — | NOT CHECKED: no direct-site URL and no checks row | — | — | — |

Without observations, discount stacking, direct < OTA ordering, displayed fees and displayed min stay could not be checked. The last observed guest prices are still Corentin's 21 Oct P13 mystery shops in `policy.json`.

### 1. Airbnb monitoring (promotions removed 21 Oct; runs until 4 Nov)

Bookings are grouped by `booked_on`:
- last 14 days = 9–22 Oct
- prior 14 days = 25 Sep–8 Oct

Bookings still confirmed are counted separately from those later cancelled.

| Ref | Last 14: bk / nights / £ per night | Prior 14: bk / nights / £ per night | Later cancelled (last / prior) |
|---|---|---|---|
| P01 | 2 / 33 / £160.15 | 0 / 0 / — | 0 / 0 |
| P02 | 2 / 10 / £106.49 | 1 / 3 / £112.48 | 0 / 0 |
| P05 | 2 / 11 / £578.46 | 3 / 18 / £509.96 | 0 / 1 |
| P06 | 4 / 18 / £188.89 | 1 / 4 / £229.03 | 1 / 1 |
| P08 | 1 / 6 / £129.41 | 1 / 9 / £156.82 | 0 / 0 |
| P09 | 2 / 14 / £107.92 | 1 / 9 / £95.62 | 0 / 1 |
| P10 | 1 / 32 / £105.96 | 0 / 0 / — | 0 / 2 |
| P12 | 2 / 5 / £170.00 | 0 / 0 / — | 0 / 0 |
| P13 | 5 / 20 / £157.28 | 1 / 2 / £176.72 | 0 / 0 |
| P20 | 3 / 18 / £162.34 | 0 / 0 / — | 0 / 0 |
| **Portfolio** | **24 / 167 / £171.91 (£28,708.94)** | **8 / 45 / £290.19 (£13,058.37)** | 1 / 5 |
| Portfolio excl. P05 | 22 / 156 / £143.24 | 5 / 27 / £143.67 | |

**There is no 14-day drop.** Volume is 3.0× the prior 14 days by bookings and 3.7× by nights. The fall in £/night comes from the mix: P05 was 70% of prior-window revenue.

**Daily pace is a watch item.** Airbnb bookings by day:

| Booked on | Bookings |
|---|---|
| 9–19 Oct | 25 (about 2.3 per day) |
| 20 Oct | 0 |
| 21 Oct | 1 |
| 22 Oct | 0 |

- Since the promotions were removed (21–22 Oct) there has been 1 booking, against about 4–5 expected at the earlier pace.
- 20 Oct, before the removal, was also zero.
- Two days is too few to call. If 23–25 Oct stay at 0–1 a day, treat it as a real slowdown.

**Paid vs PriceLabs, Airbnb bookings made after 21 Oct: none.** No Airbnb booking was made on 22 Oct, and the Dispatcher reports none since.

The only booking made on the removal day is P20 28–31 Oct (booked 21 Oct).
- It paid £529.92 = 72% of the Smoobu rate pushed after the 21 Oct 08:52Z refresh (£736).
- This matches P20's known Airbnb discounts (last-minute 15% plus the 20% new-listing promo) under `policy.json` `listing_facts.P20`. **Explained, not flagged.**
- PriceLabs now shows 28–30 Oct as Booked: `prices.csv`, `booked_price` 248 and 254, booked ADR £176.64.

So there is still no post-removal evidence on whether the about 0.76–0.80× Airbnb gap persists on flats other than P13 and P20.

### 2. Booking.com bookings and cancellations

**Bookings by `booked_on`**

| Window | Confirmed | Later cancelled | Organic (excl. P04 imports) |
|---|---|---|---|
| Last 14 (9–22 Oct) | 6 bk / 36 n / £5,376.93 | 1 bk / 5 n | **1 bk / 4 n / £472.19** (P13 12–16 Oct, booked 10 Oct) |
| Prior 14 (25 Sep–8 Oct) | 7 bk / 32 n / £4,461.53 (P11 3, P12 2, P02 1, P10 1) | 1 bk / 7 n (P12 1–8 Nov, cancelled today) | 8 bk / 39 n |

- P04's 6 rows are dated 20 Oct in both Smoobu `booked_on` and API `created-at`. They are Channex imports, not new bookings.
- **There has been no organic Booking.com booking for 12 days (11–22 Oct).**

**Cancellations by cancellation time** (Smoobu API `modifiedAt` as a stand-in, London time)

| Window | Booking.com | Airbnb |
|---|---|---|
| Last 14 (10–23 Oct) | **4 bk / 25 n / £5,093.38** | 1 / 5 n / £929.85 (P06 25–30 Oct, cancelled 15 Oct; CSV shows a P06 25 Oct–5 Nov Airbnb booking made 16 Oct) |
| Prior 14 (26 Sep–9 Oct) | 2 bk / 21 n / £3,060.47 (P02 13–24 Oct, P11 28 Oct–7 Nov) | 5 / 35 n |

The four Booking.com cancellations in the last 14 days:

| Ref | Stay | Nights | £ | Booked | Cancelled |
|---|---|---|---|---|---|
| P12 | 5–10 Dec | 5 | £1,292.09 | 20 Sep | 18 Oct 11:03 |
| P04 | 2–7 Nov | 5 | £682.02 | — | 20 Oct (confirmed by Corentin 22 Oct) |
| P12 | 1–8 Nov | 7 | £1,382.86 | 3 Oct | 22 Oct 11:27 |
| P11 | 19–27 Nov | 8 | £1,736.41 | 19 Sep | 23 Oct 06:57 |

The P12 and P11 cancellations are today's two. Together they are 15 nights and £3,119.27.

**Net Booking.com movement over the last 14 days:** +1 organic booking (4 nights, £472) against −4 cancellations (25 nights, £5,093). That is **net −21 nights and −£4,621.**

**Cancellation share by channel** (by booking date, `reservations.csv`)

| Channel | Booked last 365 days | Booked last 90 days |
|---|---|---|
| Booking.com | 109/327 bookings = **33%** (nights 688/1,614 = 43%) | 21/80 = 26% |
| Airbnb | 53/310 = **17%** (nights 282/1,631 = 17%) | 8/84 = 10% |
| Agoda | 6/8 | — |
| VRBO | 1/1 | 1/1 |
| Direct booking | 1/3 | — |

The Agoda, VRBO and Direct figures are small samples.

**The reopened nights are sellable:**
- **P11 19–26 Nov:**
  - Smoobu `/api/rates` shows them available at £255–313, min stay 3/2.
  - PriceLabs still shows them Booked because its data for 3064196 was last refreshed 22 Oct 08:37Z, before the cancellation. This is lag, not a block.
  - Booking.com guest price before promotions = 1.2 × £255–313 = £306–376.
  - The cancelled stay paid £217.05 per night.
- **P12 1–7 Nov:**
  - Available in both Smoobu and PriceLabs at £181–265 (yesterday £216–273).
  - Booking.com before promotions = £217–318.
  - The cancelled stay paid £197.55 per night.

### 3. Gap update (pack `rate_leak_next_30`, booked nights, next 30 days)

These figures need care:
- They compare against today's PriceLabs `price`, not the price at booking.
- They are not split by channel.
- They apply no 1.2× for Booking.com.

The channel mix comes from `reservations.csv`.

| Ref | Main channel | Gap vs PriceLabs | Gap after stay discount | Nights | £ vs expected |
|---|---|---|---|---|---|
| P06 | Airbnb | −44.4% | −35.6% | 11 | −£1,098 |
| P01 | Airbnb | −35.9% | −19.9% | 28 | −£1,078 |
| P11 | Booking.com | −36.3% | −26.8% | 13 | −£701 (more on a 1.2× basis; promotion stacking explains it under policy) |
| P05 | Airbnb | −9.5% | −9.5% | 16 | −£675 |
| P10 | Airbnb | −34.7% | −18.4% | 26 | −£620 |
| P09 | Airbnb | −38.7% | −28.7% | 15 | −£613 |
| P08 | Airbnb | −40.6% | −38.7% | 7 | −£606 |
| P12 | Booking 7 / Airbnb 5 | −24.9% | −24.9% | 8 | −£464 |
| P04 | Booking.com | −20.7% | −20.7% | 6 | −£188 |
| P02 | Airbnb 4 / Booking 1 | −26.7% | −26.7% | 3 | −£114 |
| P13 | Airbnb | +16.3% | +16.3% | 1 | +£25 |
| P20 | Airbnb | −29.3% | −29.3% | 3 | (explained by P20 discounts; not counted) |

- The Airbnb-led flats (P01, P05, P06, P08, P09, P10) total **−£4,690** on forward nights booked before 21 Oct.
- These were mostly booked under the old promotions and the Smoobu Airbnb default rules.

**Net to owner** (pack `channel_economics`, per £100 base): Airbnb £84.50, Booking £102.00, Vrbo £99.36, Direct £90.00. Warnings: none.
- These overstate the OTAs, because config models no Airbnb rules discount and no Booking promotion factor.
- The Vrbo and Direct figures rest on unconfirmed defaults.

### 4. Issues ordered by £ impact

1. **Booking.com is losing more than it books.** Over 14 days: 1 organic booking against 4 cancellations, net −21 nights / −£4,621. The 365-day cancellation share is 33% (Airbnb 17%). The reopened P11 19–26 Nov and P12 1–7 Nov (15 nights, about £3,119 at the old paid rates) need refilling.
   - Extranet > Promotions for P11 and P12: confirm what is live after the 21 Oct changes. Camden has Mobile 10% and Genius L1 10%. P12's promotions have not been seen.
   - Consider a targeted Last Minute Deal (0–14 days) on P12 for 1–7 Nov. Check-in is 9 days away and PriceLabs has already cut it about 17%.
   - Extranet > Policies: review whether the flexible rate's free-cancellation window can be shortened, so late cancellations stop reopening near-term nights. The non-refundable −10% rate already exists (policy).
   - Analytics > Search results for P11, P12, P13, P02 and P10: check the 12-day volume gap.
2. **Smoobu Airbnb default pricing rules on flats other than Shepherd's Bush are unknown and probably still stacking.** Forward Airbnb-led gap: −£4,690.
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules (last-minute, early bird, LOS 5+).
   - Align them with the 21 Oct Shepherd's Bush set-up. Start with P06, P01, P10, P09 and P08.
   - No Airbnb booking made after 21 Oct yet tests whether removing the promotions alone is enough.
3. **Airbnb daily pace:** 1 booking in 21–22 Oct against about 2.3 per day before. Watch only; re-check on 24–25 Oct before attributing it to the promotion removal.

Data gaps:
1. No OTA page was reachable (proxy CONNECT 403 for airbnb.co.uk and booking.com, 23 Oct 06:21Z), and `channel_checks` is empty. Not observed:
   - displayed prices
   - discount stacks
   - direct < OTA ordering
   - displayed fees
   - min stay
2. There are no Airbnb bookings made after 21 Oct to test paid vs PriceLabs.
3. Cancellation dates use Smoobu `modifiedAt` as a stand-in; a later edit would move it. Snapshots exist only from 18 Oct.
4. P11 19–26 Nov still shows Booked in PriceLabs (last refreshed 22 Oct 08:37Z). Re-check after the next PriceLabs sync.
5. Smoobu Airbnb rules are unknown for all flats except the two P13 listings and P20. Booking.com promotions are unknown for every property except P11 and P13.
6. P04 `booked_on` is the import date. The P13 26.3% commission on 12–16 Oct (outside its booster window) is still unanswered from 22 Oct.
7. Pack `rate_leak_*` is not split by channel and uses current prices.
8. Unconfirmed config defaults: Vrbo +8% and Direct −10%.
