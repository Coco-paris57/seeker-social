## Channel parity

Run date D = 2026-10-22. I read `data/policy.json` (updated 21 Oct) first.

**Sources**
- `data/snapshots/2026-10-22/reservations.csv` (667 rows) and `prices.csv`. The 21 Oct snapshot was used for the diff.
- `reports/2026-10-22/kpi_pack.json`.
- PriceLabs connector, read-only `get_listing_prices` for P20 (3547481, 23 Oct–1 Nov), pulled 22 Oct about 06:05Z.

**Paid** means Smoobu `total_gbp` (basePrice, before cleaning and commission) ÷ nights.

**Not raised, because `policy.json` settles them**
- the 15%/20% stay discounts
- Visibility Booster commission
- P13 as one flat
- the P02/P03/P06/P07 blocks
- P14
- P20's separately paid extension
- P20's 20% Airbnb new-listing promotion
- Booking.com promotions stacking

**Config status**
- Confirmed: Booking.com +20% markup (global).
- Airbnb price adjustment is 0%.
- Airbnb Smoobu default pricing rules: known only for the two Shepherd's Bush listings (changed 21 Oct). They are **unknown for every other flat**.
- Unconfirmed defaults: Vrbo +8% and Direct −10%.

### Parity checks (displayed guest price)

| Ref | Channel | Date | Smoobu rate | Expected | Displayed | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|
| all | Airbnb | — | — | — | NOT CHECKED: airbnb.co.uk did not respond from this environment (curl, 22 Oct 06:09Z). `channel_checks` is empty in the pack. | — | — | — |
| all | Booking.com | — | — | — | NOT CHECKED: booking.com did not respond (same test). No checks row. | — | — | — |
| all | Vrbo | — | — | — | NOT CHECKED: no checks row, page unreachable | — | — | — |
| all | Direct site | — | — | — | NOT CHECKED: no direct-site URL and no checks row | — | — | — |

The latest observed guest prices are Corentin's 21 Oct P13 mystery shops, recorded in `policy.json`. No new observation was made today.

### 1. Airbnb monitoring (promotions removed 21 Oct; runs until 4 Nov)

**Windows**
- Bookings by `booked_on`: last 14 days = 8–21 Oct; prior 14 days = 24 Sep–7 Oct.
- 22 Oct is excluded because the snapshot was taken early that morning.
- Counts are bookings still confirmed. Bookings later cancelled are shown separately.
- **Only one day (21 Oct) of the last window falls after the promotions were removed.** This comparison is a baseline, not yet a test of the change.

| Ref | Last 14: bk / nights / £ per night | Prior 14: bk / nights / £ per night | Cancelled (last / prior) |
|---|---|---|---|
| P01 | 2 / 33 / £160.15 | 0 / 0 / — | 0 / 0 |
| P02 | 2 / 10 / £106.49 | 1 / 3 / £112.48 | 0 / 0 |
| P05 | 2 / 11 / £578.46 | 4 / 22 / £504.72 | 0 / 1 |
| P06 | 4 / 18 / £188.89 | 1 / 4 / £229.03 | 1 / 1 |
| P08 | 1 / 6 / £129.41 | 1 / 9 / £156.82 | 0 / 0 |
| P09 | 2 / 14 / £107.92 | 1 / 9 / £95.62 | 0 / 1 |
| P10 | 1 / 32 / £105.96 | 0 / 0 / — | 0 / 2 |
| P12 | 2 / 5 / £170.00 | 0 / 0 / — | 0 / 0 |
| P13 | 5 / 20 / £157.28 | 1 / 2 / £176.72 | 0 / 0 |
| P20 | 3 / 18 / £162.34 | 0 / 0 / — | 0 / 0 |
| **Portfolio** | **24 / 167 / £171.91 (£28,708.94)** | **9 / 49 / £305.77 (£14,982.93)** | 1 / 5 |
| Portfolio excl. P05 | 22 / 156 / £143.24 | 5 / 27 / £143.67 | |

What the table shows:
- **There is no drop.** Airbnb volume in the last 14 days is 2.7× the prior 14 by bookings and 3.4× by nights, so the ">half drop" flag does not apply.
- The fall in portfolio £/night comes from the mix: P05 made up 74% of prior-window revenue. Excluding P05, the rate is flat (£143.24 vs £143.67).
- Since the removal there has been 1 Airbnb booking (21 Oct). Before that, 8–20 Oct averaged about 1.8 per day. **One day is too little to judge volume.** Re-check daily.

**Paid vs PriceLabs, Airbnb bookings made on or after 21 Oct**

| Ref | Stay | Booked | Lead | Nights | Paid | Paid/night | PriceLabs (Your Price, data refreshed 21 Oct 08:52Z) | After stay discount (none, 3 n) | Gap | After 20% new-listing promo | Residual gap |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P20 | 28–31 Oct | 21 Oct | 7 d | 3 | £529.92 | £176.64 | £252 + £268 + £277 = £797 | £797 | **−33.5% (−£267.08)** | £637.60 | **−16.9% (−£107.68)** |

Notes on this booking:
- On PriceLabs' lower `price` column for the same refresh (£234 + £248 + £254 = £736), the gap is −28.0%. After the 20% promotion the residual is −10.0%.
- The exact time of the booking on 21 Oct is unknown. So it is also unknown whether the manual promotions had already been removed when the guest booked.
- **Is the ~20–25% under-PriceLabs pattern still there?** On this single booking, yes, beyond what policy explains. The 20% new-listing promo is policy-explained; a further 10–17% is not.
  - This fits a Smoobu Airbnb last-minute rule on P20. The Shepherd's Bush rule before 21 Oct was −15% within 28 days, and this booking had a 7-day lead.
  - That is inference only: P20's Smoobu rules have not been seen.
  - One booking on a listing with its own promotion is not enough to judge the portfolio.

### 2. Booking.com bookings since 10 Oct

| Ref | Stay | Booked | Nights | Paid/night | Commission | Note |
|---|---|---|---|---|---|---|
| P13 | 12–16 Oct | 10 Oct | 4 | £118.05 | £124.24 = 26.3% of base | The only organic Booking.com booking since 10 Oct |
| P04 | 6 rows (5 confirmed, 1 cancelled) | 20 Oct in Smoobu | 32 confirmed | £153.27 | blank | Imports from Channex, not new bookings. Real booking dates were 18 Sep–18 Oct per yesterday's §3; 3 of them fall in 8–21 Oct (11, 16 and 18 Oct). |

- **No organic Booking.com booking in 12 days (11–21 Oct), and none in today's diff.** The prior 14 days (24 Sep–7 Oct) had 10 bookings / 47 nights / £164.82 per night: P11 4, P12 4, P02 1, P10 1.
  - Excluding P04 imports, the last 14 days had 1 booking / 4 nights. **That is a drop of more than half.**
  - The 21 Oct promotion changes for Camden and Shepherd's Bush are less than a day old, so they cannot explain it.
  - Camden's 21 Oct screenshot showed search views −64% and page visits −83% against the market (`policy.json`).
- The P13 commission of 26.3% is above 15%. The policy booster window for P13 starts at check-ins on 21 Oct, so this 12–16 Oct stay falls outside it. **Ask Corentin** whether a booster or another fee applied. Not assumed.

### 3. Changes since the 21 Oct snapshot

- New: 1 booking, P20 Airbnb 28–31 Oct (above).
- Changed: none.
- Cancelled: none.
- PriceLabs still shows P20 28–30 Oct as available (£234 / £248 / £254). Its data for 3547481 was last refreshed 21 Oct 08:52Z, apparently before the booking reached PriceLabs.
  - 13 of 15 price files in today's snapshot were last refreshed on 21 Oct.
  - This is data lag. It is not evidence of a double booking.

### 4. Gap update (pack `rate_leak_*`, next 30 days)

Gap vs expected after stay discount (pack `rate_leak_after_los`):

| Ref | Gap | Nights |
|---|---|---|
| P06 | −35.0% | 12 |
| P08 | −32.4% | 8 |
| P02 | −30.5% | 4 |
| P20 | −30.4% | 2 (23–24 Oct only; 28–30 Oct not yet in PriceLabs) |
| P09 | −28.5% | 14 |
| P11 | −26.1% | 15 |
| P12 | −21.9% | 13 |
| P10 | −19.3% | 27 |
| P01 | −19.0% | 28 |
| P04 | −16.9% | 7 |
| P05 | −7.3% | 16 |
| P13 | +16.3% | 1 |

These figures need care:
- The pack compares against today's PriceLabs `price`, not the price when the guest booked.
- It mixes channels, and applies no 1.2× for Booking.com.
- So it is **not like for like** with yesterday's channel split (Airbnb October bookings −22.6%, Booking −24–29% vs 1.2×).
- No new settings data has arrived, so yesterday's conclusions stand, with one update. Policy now names the main Airbnb cause: the Smoobu Airbnb default pricing rules stacking on PriceLabs. They have been fixed for Shepherd's Bush only.

**Net to owner** (pack `channel_economics`, per £100 base): Airbnb £84.50, Booking £102.00, Vrbo £99.36, Direct £90.00. Warnings: none.
- These still overstate both OTAs: config has no Airbnb rules discount and no Booking promotion factor.
- Yesterday's realised figures were about £63.9 for Airbnb October bookings and about £73.8 for Booking.

### 5. Issues ordered by £ impact

1. **Smoobu Airbnb default pricing rules on the flats other than Shepherd's Bush are unknown and probably still active.** The October Airbnb gap was −£4,769 on 113 forward nights (yesterday). The single post-21 Oct booking, P20, is −£107.68 even after the 20% new-listing promo.
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules (last-minute, early bird, LOS 5+).
   - Align with the Shepherd's Bush change, or remove these rules: PriceLabs already applies last-minute and far-out logic.
   - Start with P06, P08, P09, P01, P10 and P20.
2. **Booking.com has had no organic booking for 12 days** (prior 14 days: 10 bookings, £7,746). This is a volume issue, not a rate issue.
   - Re-check in the Booking.com extranet, for P11, P12, P13, P02 and P10: availability and sync, then promotions and ranking (Analytics > Search results / Sales statistics).
   - The Camden and Shepherd's Bush promotion changes on 21 Oct are less than a day old.
3. **P13 Booking.com commission of 26.3% on the 12–16 Oct stay** (£124.24 on £472.19). Ask whether this is booster or another fee before treating it as a leak.

Data gaps:
1. No live OTA page was reachable (Airbnb and Booking.com did not respond, 22 Oct 06:09Z). `channel_checks` is empty. Not observed:
   - displayed price
   - discount stack
   - direct < OTA ordering
   - fees
   - min stay
2. Only 1 day of Airbnb bookings exists since the promotions were removed. The time of the P20 booking on 21 Oct is unknown, relative to the removal.
3. Smoobu Airbnb pricing rules are unknown for every flat except the two Shepherd's Bush listings.
4. PriceLabs data in today's snapshot was mostly last refreshed on 21 Oct. P20 28–30 Oct does not yet show as booked, so it is missing from the pack's rate leak.
5. There is no price-at-booking history. P20 is anchored to the PriceLabs data refreshed 21 Oct 08:52Z.
6. P04 Smoobu `booked_on` is the import date, and P04 rows carry no commission. P04's Smoobu Booking.com markup is unconfirmed.
7. The pack's `rate_leak_*` is not split by channel and uses current prices.
8. Unconfirmed config defaults: Vrbo +8% and Direct −10%.
