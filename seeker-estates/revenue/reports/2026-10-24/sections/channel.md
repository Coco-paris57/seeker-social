## Channel parity

Run date D = 2026-10-24. `data/policy.json` read first.

**Sources**
- `data/snapshots/2026-10-24/reservations.csv` (669 rows), diffed day by day against the 18–23 Oct snapshots.
- `data/snapshots/2026-10-{20..24}/prices.csv` and `raw/prices_3318172.json` (P09), `raw/prices_3064196.json` (P11).
- `reports/2026-10-24/kpi_pack.json`: `rate_leak_next_30`, `rate_leak_after_los`, `channel_economics`. `missing.channel_checks` = "empty".
- Smoobu API, GET only, 24 Oct ~06:20Z: `/api/reservations` (with cancellations; `modifiedAt` used as the cancellation time) and `/api/rates` for 3318172 (P09), 12–15 Nov.

**Paid** = Smoobu `total_gbp` (basePrice, before cleaning and commission) / nights.

**Not raised (settled by `policy.json`)**: 15%/20% stay discounts; Visibility Booster commission; Booking.com promotion stacking; P13 as one flat; P02/P03/P06/P07 blocks; P14; P20 separate payment, 20% new-listing promotion and 22 Oct discount set; nights after handback dates.

**Config status (`rm/config.py` CHANNELS)**: Booking.com +20% (global) and Airbnb 0% adjustment are confirmed by Corentin. **Vrbo +8% and Direct −10% are unconfirmed defaults.** Smoobu Airbnb default pricing rules are known only for the two Shepherd's Bush listings (changed 21 Oct) and P20 (22 Oct discounts page); **unknown for P09 and every other flat.**

### Parity checks (displayed guest price)

| Ref | Channel | Date | Smoobu rate | Expected | Displayed | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|
| all | Airbnb | — | — | — | NOT CHECKED: proxy refused airbnb.co.uk (CONNECT 403, 24 Oct 06:21Z); `channel_checks` empty | — | — | — |
| all | Booking.com | — | — | — | NOT CHECKED: booking.com, same proxy 403; no checks row | — | — | — |
| all | Vrbo | — | — | — | NOT CHECKED: no checks row, no page loaded | — | — | — |
| all | Direct site | — | — | — | NOT CHECKED: no direct-site URL and no checks row | — | — | — |

Discount stacks as displayed, direct < OTA ordering, displayed fees and displayed min stay: NOT CHECKED (no observation). Last observed guest prices remain Corentin's 21 Oct P13 mystery shops in `policy.json`.

**Paid-vs-PriceLabs test (not a displayed price, but the first clean post-21 Oct evidence):**

| Ref | Channel | Stay | PriceLabs pushed (user_price) | Expected after stay discounts | Paid (room) | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|
| P09 | Airbnb | 13–15 Nov (2 n, 3 adults), booked 23 Oct 13:33 | £162 + £167 = £329 (same in 22 Oct snapshot, refreshed 21 Oct 09:03Z: £165+£168 = £333; 23 Oct snapshot, 22 Oct 08:05Z: £162+£167; 24 Oct snapshot, 23 Oct 08:51Z, the push live at booking: £162+£167) | £329 (2 nights: no LOS discount) | £253.21 (£126.61/n) | **−23.0% (−£75.79)** | **FLAG (>3%)** | `raw/prices_3318172.json` 22/23/24 Oct; `reservations.csv`; Smoobu reservation 161131246 |

- Same −23% as the ~0.76–0.80x systematic Airbnb gap recorded in `policy.json` monitoring. Removing the manual promotions on 21 Oct did not close it on P09.
- Lead time 21 days. If P09's Smoobu Airbnb default rules match the old Shepherd's Bush set (last-minute −15% within 28 days), that alone gives £279.65; the remaining −9.5% would still be unexplained. P09's rules are unknown, so per policy this is **unexplained** until P09's Smoobu Airbnb pricing rules / Airbnb discounts page are seen.
- Smoobu shows total £378.21 incl. £125 implied cleaning, host fee £58.62 (15.5% of £378.21). Smoobu type is "modification of booking" and its `price-details` text reads "Cancellation Host Fee / Cancellation Payout"; nights 13–14 Nov show unavailable in Smoobu rates. Treated as a live booking; the wording should be checked in Airbnb.
- PriceLabs has not yet registered it: 13–14 Nov still open in the 24 Oct snapshot (refreshed 23 Oct 08:51Z, before the booking), so pack `rate_leak_next_30` for P09 excludes it.

### 1. Airbnb monitoring (promotions removed 21 Oct; runs until 4 Nov)

By `booked_on`: last 14 = 10–23 Oct, prior 14 = 26 Sep–9 Oct. Confirmed bookings: bookings / nights / £ per night; later-cancelled counted separately.

| Ref | Last 14 | Prior 14 | Later cancelled (last / prior) |
|---|---|---|---|
| P01 | 2 / 33 / £160.15 | 0 | 0 / 0 |
| P02 | 1 / 4 / £104.31 | 2 / 9 / £109.46 | 0 / 0 |
| P05 | 2 / 11 / £578.46 | 1 / 4 / £433.25 | 0 / 1 |
| P06 | 3 / 16 / £183.92 | 2 / 6 / £228.91 | 1 / 1 |
| P08 | 1 / 6 / £129.41 | 1 / 9 / £156.82 | 0 / 0 |
| P09 | 2 / 14 / £106.12 | 2 / 11 / £103.55 | 0 / 1 |
| P10 | 0 | 1 / 32 / £105.96 | 0 / 2 |
| P12 | 2 / 5 / £170.00 | 0 | 0 / 0 |
| P13 | 5 / 20 / £157.28 | 1 / 2 / £176.72 | 0 / 0 |
| P20 | 3 / 18 / £162.34 | 0 | 0 / 0 |
| **Portfolio** | **21 / 127 / £190.46 (£24,187.85)** | **10 / 73 / £142.28 (£10,386.32)** | 1 / 5 |
| Portfolio excl. P05 | 19 / 116 / £153.66 | 9 / 69 / £125.41 | |

The 14-day window still shows no drop (2.1x bookings, 1.7x nights), but it is front-loaded. **Daily pace is now the signal:**

| Booked on | Airbnb bookings |
|---|---|
| 9–19 Oct | 24 in 11 days (2.2/day) |
| 20 Oct | 0 |
| 21 Oct (removal day) | 1 (P20) |
| 22 Oct | 0 |
| 23 Oct | 1 (P09) |

- 20–23 Oct: 2 bookings in 4 days (0.5/day) vs 2.2/day before; 22–23 Oct (fully post-removal): 1 vs ~4.4 expected. 20 Oct, before the removal, was also 0, so the slowdown cannot yet be attributed to the removal alone. Yesterday's trigger (0–1/day on 23–25 Oct) is met for 23 Oct; confirm on 25 Oct.
- Airbnb cancellations by `modifiedAt`: last 14 (11–24 Oct) 1 (P06 25–30 Oct, 15 Oct); prior 14 (27 Sep–10 Oct) 5 (P06 28 Sep, P10 x2 29–30 Sep, P09 30 Sep, P05 8 Oct).

### 2. Booking.com bookings and cancellations

| Window (`booked_on`) | Confirmed | Later cancelled | Organic (excl. P04 Channex imports dated 20 Oct) |
|---|---|---|---|
| Last 14 (10–23 Oct) | 6 / 36 n / £5,376.93 | 1 / 5 n | **1 / 4 n / £472.19** (P13 12–16 Oct, booked 10 Oct) |
| Prior 14 (26 Sep–9 Oct) | 7 / 32 n / £4,461.53 | 1 / 7 n (P12 1–8 Nov) | 8 / 39 n |

**No organic Booking.com booking for 13 days (11–23 Oct).** No new Booking.com row in the 24 Oct snapshot.

Cancellations by Smoobu `modifiedAt`:

| Window | Booking.com | Detail |
|---|---|---|
| Last 14 (11–24 Oct) | **4 / 25 n / £5,093.38** | P12 5–10 Dec (18 Oct), P04 2–7 Nov (20 Oct), P12 1–8 Nov (22 Oct), P11 19–27 Nov (23 Oct 06:57) |
| Prior 14 (27 Sep–10 Oct) | 2 / 21 n / £3,060.47 | P02 13–24 Oct (28 Sep), P11 28 Oct–7 Nov (3 Oct) |

No new cancellation since 23 Oct 06:57. Net Booking.com, last 14 days: +1 organic (4 n, £472) vs −4 cancellations (25 n, £5,093) = **−21 nights, −£4,621**.

Reopened nights, status today:
- **P11 19–26 Nov:** PriceLabs now shows them available (3064196 refreshed 23 Oct 11:12Z), £236–282, min stay 2 (`prices.csv`). Yesterday's PriceLabs-lag item (t-p11-sync) is resolved. Booking.com guest price before promotions = 1.2x = £283–338; cancelled stay paid £217.05/n.
- **P12 1–7 Nov:** still unsold, now £177–210 (yesterday £181–265), min stay 2. Booking.com before promotions £212–252; cancelled stay paid £197.55/n. Check-in 8 days out.

### 3. Gap update (pack `rate_leak_next_30`, booked nights in next 30 days)

Caveats: compared with today's PriceLabs `price`, not the price at booking; not split by channel; no 1.2x for Booking.com. Channel mix from `reservations.csv` (confirmed nights 24 Oct–22 Nov).

| Ref | Main channel | Gap vs PriceLabs | Gap after stay discount | Nights | £ vs expected (after LOS) | vs 23 Oct |
|---|---|---|---|---|---|---|
| P01 | Airbnb | −36.5% | −20.6% | 28 | −£1,121 | −£1,078 |
| P06 | Airbnb | −46.1% | −36.6% | 10 | −£1,025 | −£1,098 |
| P05 | Airbnb | −9.9% | −9.9% | 15 | −£662 | −£675 |
| P09 | Airbnb | −40.2% | −29.6% | 15 (excl. new 13–14 Nov) | −£624 | −£613 |
| P08 | Airbnb | −43.9% | −43.0% | 6 | −£605 | −£606 |
| P10 | Airbnb | −33.9% | −17.3% | 25 | −£555 | −£620 |
| P11 | Booking.com | −29.1% | −20.0% | 12 | −£440 (promotion stacking explains it under policy) | −£701 |
| P12 | Booking 7 / Airbnb 5 | −26.1% | −26.1% | 7 | −£425 | −£464 |
| P04 | Booking.com | −20.1% | −20.1% | 5 | −£152 | −£188 |
| P02 | Airbnb | −21.8% | −21.8% | 3 | −£87 | −£114 |
| P20 | Airbnb | −33.8% | −33.8% | 2 | −£181 (explained by P20 discounts; not counted) | −£220 |

Airbnb-led flats P01, P05, P06, P08, P09, P10: **−£4,592** on forward booked nights (yesterday −£4,690; change is nights rolling off, not new evidence). P13 no longer has a `rate_leak_next_30` entry (yesterday 1 night, +£25).

**Net to owner per £100 base** (pack `channel_economics`): Airbnb £84.50, Booking £102.00, Vrbo £99.36, Direct £90.00; warnings: none. These overstate the OTAs (config models no Airbnb rules discount and no Booking promotion factor). On the P09 evidence, a £100 PriceLabs night nets about £77 room x 0.845 = **~£65** on Airbnb, below the direct £90. Vrbo/Direct rest on unconfirmed defaults.

### 4. Issues ordered by £ impact

1. **Booking.com is losing more than it books** (net −21 nights / −£4,621 over 14 days; 13 days without an organic booking). P12 1–7 Nov (7 nights, 8 days out) is the most urgent refill; P11 19–26 Nov is now sellable again.
   - Booking.com extranet > Promotions > P12: confirm what is live (P12's promotions have never been seen); if nothing beyond Mobile/Genius, add a Last Minute Deal 0–14 days for 1–7 Nov.
   - Extranet > Analytics > Search results for P11, P12, P13, P02, P10 to see where the 13-day volume gap comes from.
2. **Systematic Airbnb gap confirmed after the promotion removal: P09 paid 23% under the pushed PriceLabs price** on a 2-night stay with no LOS discount. Applied to the Airbnb-led forward book (−£4,592) this is the largest structural leak.
   - Setting: Smoobu > Channel Manager > Airbnb > Torrent Lodge (3318172) > Default pricing rules (last-minute, early bird, LOS 5+), and the Airbnb Discounts page for the P09 listing. Then the same for P01, P06, P10, P08, P05.
   - Per Corentin's stated preference, if the rules stay, price them in (Smoobu Airbnb uplift + visible discount) rather than accepting an invisible −23%. Note the Smoobu Airbnb adjustment is global (0%).
3. **Airbnb daily pace 0.5/day for 20–23 Oct** vs 2.2/day before. Watch; decide on 25 Oct. Do not attribute to the removal yet (20 Oct was zero before it).

Data gaps:
1. No OTA page reachable (proxy CONNECT 403 for airbnb.co.uk and booking.com, 24 Oct 06:21Z) and `channel_checks` empty: displayed prices, discount stacks, direct < OTA ordering, displayed fees and min stay NOT CHECKED.
2. P09 Smoobu Airbnb pricing rules and Airbnb discounts unknown, so the −23% cannot be split; the Smoobu `price-details` "Cancellation ..." wording on reservation 161131246 is unexplained. P09 cleaning £125 is implied (total − basePrice), not seen as a setting.
3. PriceLabs P09 data predates the booking (refreshed 23 Oct 08:51Z); 13–14 Nov not yet Booked there.
4. Cancellation times use Smoobu `modifiedAt` as a stand-in.
5. Smoobu Airbnb rules unknown for all flats except P13 (both listings) and P20; Booking.com promotions unknown except P11 and P13.
6. Pack `rate_leak_*` not split by channel and uses current prices. P04 `booked_on` is the Channex import date. The P13 26.3% commission on 12–16 Oct is still unanswered.
7. Unconfirmed config defaults: Vrbo +8%, Direct −10%.
