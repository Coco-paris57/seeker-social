## PriceLabs audit (D = 2026-10-25)

**Sources**
- Snapshot `data/snapshots/2026-10-25/`:
  - `raw/prices_*.json`, re-read after the last file write at 07:17Z;
  - `prices.csv` (26 Oct–24 Dec, Smoobu rates merged), `listings.csv`, `reservations.csv` and `market.csv` (P13 and P10 only).
- `reports/2026-10-25/kpi_pack.json`. Its `sync_issues`, `bounds`, `market_percentiles`, `avg_open_price_next30` and `gaps` are all null.
- `data/policy.json`, `data/id_map.json`, `../build/properties.py` and yesterday's `reports/2026-10-24/sections/pricelabs.md`.
- Live read-only PriceLabs calls, one at a time, 07:0x–07:2xZ:
  - `get_user_logs`: listing log for 23–25 Oct; listing base/min/max/push/override-removal for 20–25 Oct; group and account logs for 20–25 Oct;
  - `get_customizations` (toggled_on=false): account level (smoobu), plus 13 listings: 2699998, 3562176, 3064856, 3090701, 3064196, 3547481, 3166592, 3318172, 3318167, 3318177, 3320302, 3288517, 3267077;
  - `get_listing_date_overrides` for 11 listings: 2699998, 3562176, 3064856, 3547481, 3064196, 3166592, 3318172, 3318167, 3318177, 3320302, 3288517 and 3267077.

Nothing was changed. Policy was respected:
- The P02, P03, P06 and P07 blocks are excluded.
- For P14, numbers are reported only.
- P13 1 Dec, P04 2 Dec, P12 17 Nov and the P11 darts nights are not re-raised.
- Nights after each handback date are excluded.

### What changed in PriceLabs since 24 Oct (`get_user_logs`)
Group and account logs are empty. Every listing entry was made by reyhan@:

| Time (Z) | Listing | Change |
|---|---|---|
| 24 Oct 11:23:05 | P04 3562176 | Override 1–24 Nov **−8%**, min stay 3 |
| 24 Oct 11:23:11 | P04 | Override 6–22 Dec **−5%**, min stay 3 |
| 24 Oct 11:23:18 | P04 | Override 1–28 Feb 2027 **−5%**, min stay 4 |
| 24 Oct 11:25:01 | P13 3064856 (copied to 3090701 and Vrbo 12037152) | 25–26 Oct **+10%**, min stay 2 |
| 24 Oct 11:26:36 | P13 (copied) | 1–27 Nov: no price adjustment, min stay 2 (resets the earlier +10%) |
| 24 Oct 11:26:53 | P13 (copied) | 20–21 Nov **+10%**, min stay 2 |
| 24 Oct 11:28:53 | P09 3318172 | 26–31 Oct **−5%**, min stay 3 |
| 24 Oct 12:41:38 | P20 3547481 | 31 Oct–19 Nov **−5%**, min stay 3 |
| 24 Oct 21:14:47 | P13 3064856 (copied to 3090701 and Vrbo) | Base **£235 → £250** |

- **No override was removed.** No customization change shows in the logs. The log API does not record customization edits, so the current state below comes from `get_customizations`.
- **P20 base:** there is no base-price entry for 3547481 between 20 and 25 Oct. Its base already read **£350 in the 23 Oct snapshot** (`data/snapshots/2026-10-23/listings.csv`). So the 380 → 350 recorded in policy for 24 Oct was made earlier, or was not logged.

---

### HIGH

**1. Corentin's direction to cut PriceLabs-side discounts is NOT applied: every sellable listing still carries them** (live `get_customizations`, about 07:10Z)

| Ref (listing) | Last-minute | Occupancy profile | Booking Recency Factor | Far-out | LOS (weekly/monthly) |
|---|---|---|---|---|---|
| P04 (3562176) | **−25%, 15 days, gradual** | **Aggressive custom**: 0–15 d −30% at ≤10% occupancy … −20% at 30–40%; 16–30 d −20% … −10% at 40% | **ON, default** (5% after 15 days without a booking, up to 15% after 45) | +30% after 150 d | off |
| P12 (2699998) | **−25%, 15 d, gradual** | **Aggressive custom** (same table) | **ON, default** | +30% after 150 d | off |
| P11 (3064196) | **−18%, 15 d, gradual** | **Aggressive custom** (same table) | **ON, default** | +30% after 150 d | off |
| P05 (3166592) | **−25%, 15 d, FLAT** (the full 25% on every night inside 15 days) | Custom "Default": 0–15 d −15% … −5%; 16–30 d −10% … −5% | Toggle off, so the algorithm default applies (5–15%) | +30% after 120 d | off |
| P20 (3547481) | **−25%, 15 d, gradual** | Toggle off, so Market Driven | Toggle off, so the default applies | +30% after 89 d | off |
| P13 (3064856 and 3090701, identical) | **−20%, 14 d, gradual** | Market Driven | Toggle off, so the default applies | none | off |
| P09, P08, P10, P01 (identical) | **−18%, 15 d, gradual** | Toggle off, so Market Driven | Toggle off, so the default applies | +20% after 120 d | off |
| P06 (3288517) | Toggle off, so Market Driven: "40% for same-day, reducing to 0% after 12 days" | Market Driven | Default | Market Driven +20% | off |
| P14 (3267077) | **−25%, 30 d, gradual** | Market Driven | Default | Market Driven | off |

- **Account level** (smoobu) customizations: none.
- **Orphan-day discount:** not exposed by `get_customizations`, so it is NOT CHECKED.
- **Switching a toggle off does not stop a discount.** Per the tool's `effective` field, when the Booking Recency Factor or occupancy toggle is off, PriceLabs' own default takes over. To remove the recency discount it must be set explicitly, not just switched off.
- **Check in PriceLabs → Customizations**, per listing:
  - Last-Minute Prices (P04, P12 and P20 at −25%; P05 −25% flat; P14 −25%/30 days);
  - Occupancy Based Adjustments (P04, P11 and P12 "Aggressive", P05 custom);
  - Booking Recency Factor (ON on P04, P11 and P12; the default elsewhere).

**2. The negative date overrides were deepened or added on 24 Oct, not cut.** Overrides with a negative price within the next 30 days (live `get_listing_date_overrides`):

| Ref | Negative override(s) | Last updated |
|---|---|---|
| P04 | 26–31 Oct −10%; **1–30 Nov −8%** (1–24 Nov reset 24 Oct; 25–30 Nov from 20 Oct); 1 Dec −2%; 3–5 Dec −8%; **6–22 Dec −5%**; 23–31 Dec −5%; **Feb 2027 −5%** | 20 Oct and 24 Oct 11:23Z |
| P09 | **26–31 Oct −5%**, min stay 3 (not in policy); 1–7 Nov −1%; 8–9 Nov −3%; 10–26 Nov −2% | 24 Oct 11:28Z; 3–13 Oct |
| P20 | 26–30 Oct −4%; **31 Oct–19 Nov −5%**; 20–30 Nov −2% | 24 Oct 12:41Z; 17 Oct |
| P12 | **26 Oct–15 Nov −4%**; 18–21 Nov −8%; 22–28 Nov −2%; 29 Nov–13 Dec −1% | 22 Oct 18:47Z; 16 Sep; 17 Oct |
| P11 | 26–27 Oct −2%; 28 Oct–13 Nov −1%; 14–17 Nov −5% | 16 Oct; 7 Sep |
| P05 | 26 Oct −8%; 27 Oct −2%; 31 Oct −3%; 10–15 Nov −3%; 29–30 Nov −2% | Sep–13 Oct |
| P13 | 27–30 Oct −1%; 28–30 Nov −1% | 16–17 Oct |
| P08 | 26 Oct–13 Nov −2% | 16 Oct |
| P01 | 26–30 Oct −10%; 31 Oct–21 Nov −2% (all booked); 22–29 Nov and 13–20 Dec −2% | Sep–Oct |

- **No negative overrides:** P10 (+1% to +2%), P06 (+1% / 0), P14 (none).
- **P09:** the 24 Oct change cut 26–28 Oct from **£154 to £145** (`raw/prices_3318172.json`, 24 Oct vs 25 Oct snapshots).
- **P04 and P20:** these cuts are recorded in `policy.json` `price_changes` as Corentin's decisions. They conflict with his later "cut PriceLabs-side discounts" direction, so he needs to say which one stands.
- **Check:** PriceLabs → Date Specific Overrides on 3562176, 3318172, 3547481 and 2699998.

**3. Final price vs uncustomized price, open nights only** (`raw/prices_*.json`, `price` vs `uncustomized_price`; the gap is customizations + overrides + min floor combined)

| Ref | Next 14 (26 Oct–8 Nov) | Days 15–30 (9–24 Nov) |
|---|---|---|
| **P04** | 8 nights: **£1,282 vs £1,888 (−32.1%)** | 12 nights: **£2,050 vs £2,719 (−24.6%)** |
| P11 | 6 nights: £1,188 vs £1,443 (−17.7%) | 11 nights: £2,432 vs £2,766 (−12.1%) |
| P12 | 8 nights: £1,392 vs £1,671 (−16.7%) | 3 nights: £913 vs £885 (+3.2%; includes the 17 Nov +50%) |
| P05 | 5 nights: £2,233 vs £2,547 (−12.3%) | 3 nights: £1,538 vs £1,575 (−2.3%) |
| P20 | 11 nights: £2,806 vs £3,142 (−10.7%) | 14 nights: £3,691 vs £3,859 (−4.4%) |
| P09 | 6 nights: £871 vs £864 (+0.8%) | 3 nights: £480 vs £489 (−1.8%) |
| P08 | 12 nights: £1,979 vs £1,989 (−0.5%) | none open before the 13 Nov handback |
| P06 | 3 nights: £1,057 vs £1,057 (0%) | none open |
| P13 3064856 | 6 nights: £1,011 vs £940 (+7.6%) | 12 nights: £2,341 vs £2,256 (+3.8%) |
| P13 3090701 | 6 nights: £1,212 vs £1,125 (+7.7%) | 12 nights: £2,612 vs £2,516 (+3.8%) |
| P14 | 14 nights: £7,000 vs £4,384 (+59.7%, the £500 floor) | 16 nights: £8,000 vs £5,805 (+37.8%) |
| P01, P10 | No open nights | No open nights |

- **The PriceLabs cut is deepest on P04, P11, P12, P05 and P20 inside 14 days.** That is exactly where the Booking.com Last Minute (10–15%), Mobile, Genius and Weekly/Monthly discounts then stack on top.
- **P04 split:** of the −32.1%, roughly −8 points is the override; the rest is customizations.
- **P12 split:** the override accounts for −4 points.
- Both splits are approximations, because the factors multiply.

**4. The two new Booking.com bookings show the double discount in numbers** (today's PriceLabs prices; the price at booking time is NOT in the snapshot)

| Booking | PriceLabs final today | Uncustomized | Paid (`reservations.csv`) | Paid ÷ final | Paid ÷ uncustomized |
|---|---|---|---|---|---|
| P12, 5–11 Nov (7 nights) | £1,522 (£199 / 213 / 217 / 206 / 207 / 235 / 245) | £1,817 | £932.90 | 0.613 | **0.513** |
| P04, 14–17 Nov (4 nights) | £655 (£177 / 161 / 156 / 161) | £871 | £437.69 | 0.668 | **0.503** |

- The Booking.com side of the stack is in policy (`booking_discount_stack_24oct`, `booking_monthly_rate_issue_24oct`). This table adds only the PriceLabs layer underneath it.

### MEDIUM

**5. Both new bookings are reflected in PriceLabs.**
- **P12 (2699998, refreshed 25 Oct 05:21Z):** 5–11 Nov reads Booked, booked_date 2026-10-24.
- **P04 (3562176, refreshed 24 Oct 21:10Z):** 14–17 Nov reads Booked, booked_date 2026-10-24.
- The effect on `occupancy_next_30` was not re-read.
- **New gap from the P12 booking:** 12–13 Nov is a 2-night hole (£221 / £288, min stay 2) between 5–12 Nov and the 14–17 Nov Airbnb stay. It is sellable as is.
- P04's open runs are 1–13 Nov (13 nights) and 18–24 Nov (7 nights), all at min stay 3. That matches policy (never under 3).

**6. P13: 31 Oct is still +10% (£187 vs uncustomized £168).**
- Policy (24 Oct) says the overrides on "31 Oct–3 Nov, 8–12 Nov and 17–27 Nov" were set to 0%.
- **Live overrides:** 1–27 Nov is 0% (24 Oct 11:26Z), but **31 Oct is still +10%** (updated 20 Oct 09:29Z).
- **New, not in policy:** 20–21 Nov +10% (24 Oct 11:26Z) and base £235 → £250 (24 Oct 21:14Z).
- 3090701 was not re-read; per the logs it got the same 24 Oct copies.
- **Check:** 3064856 → Date Specific Overrides → 31 Oct. Ask whether 20–21 Nov +10% and the £250 base are intended.

**7. Push freshness** (`listings.csv`, checked 07:22Z): every Smoobu listing pushed within 24 h.
- **Close to 24 h:** seven listings last refreshed on 24 Oct:
  - P08 and P10 at 08:57Z, which pass 24 h at 08:57Z today;
  - P01 and P06 at 09:09Z;
  - P05 at 09:24Z;
  - P09 at 11:30Z;
  - P20 at 12:43Z.
- **Re-check after 13:00Z.**
- **P02 Vrbo copy** `_units_0004_ca1ccf61…`: push is on, but the last push was **2026-02-24**. Carried over; the P02 block is intentional.

**8. Sync:** zero open nights with Smoobu ≠ PriceLabs by more than £2 on any Smoobu-mapped listing (`prices.csv`, 26 Oct–24 Dec).
- **Exception:** 3090701 (40 open nights) has no Smoobu rate merged and an empty `ref` in `prices.csv`. NOT CHECKED.

**9. Floor/ceiling** (`prices.csv`, 60 days, open nights):
- **P14:** 49 of 60 at the £500 minimum (82%). Special setup; numbers only.
- **P20:** 26 Oct at the £220 floor (1 of 55).
- **P08:** 1 Nov at the £150 floor (1 of 12).
- No listing hits its maximum.

**10. Base vs market** (`market.csv`, Nearby Listings, bedroom-matched):

| Ref | Base | P50 | P75 |
|---|---|---|---|
| P13 | £250 | £244 (+2.5%) | £302 (−17%) |
| P10 | £160 | £132 (+21%) | £160 (0%) |

- P10 has no sellable night before its 18 Nov handback.
- Other refs: NOT CHECKED (not in `market.csv`).

**11. Min stay** (`prices.csv`):
- Open nights are min 2–3, plus:
  - min 4 on P20 (9 nights, December; source UNKNOWN, carried over) and P14 (24 nights, special setup);
  - min 1 on the deprioritised or intentional nights (P12 17 Nov, P04 2 Dec, P13 1 Dec).
- **Short open runs:**

  | Ref | Nights | Prices | Min stay |
  |---|---|---|---|
  | P12 | 12–13 Nov | £221 / £288 | 2 |
  | P05 | 29–30 Oct | £422 / £426 | 2 |
  | P05 | 16–17 Nov | £504 / £534 | 2 |
  | P05 | 7–8 Dec | £799 / £749 | 2 |
  | P06 | 5–7 Nov | £331 / £361 / £365 | 2 |
  | P09 | 10–12 Nov | £159 / £160 / £161 | 2 |

- All of these are sellable at their current minimum.

**12. Info pack** (`../build/properties.py`) is still out of date (see the 24 Oct list).
- New today: P13 base pack £235 vs PriceLabs £250.
- **Hygiene is unchanged since 24 Oct:**
  - Vrbo copies push separately: P11 12037367, P12 12038157, P13 12037152;
  - P03 is priced via Channex;
  - P15–P19 have no PriceLabs listing;
  - P20 is not in the pack.

Data gaps:
1. The customization change history is not available: `get_user_logs` has no customization actions. "Not cut since 24 Oct" rests on the current live state, not a diff.
2. The orphan-day discount setting is not returned by `get_customizations`: NOT CHECKED.
3. Overrides for 3090701 and the Vrbo copies were not re-read.
4. The PriceLabs price at booking time for P12 5–12 Nov and P04 14–18 Nov is not in the snapshot; today's prices are used.
5. 3090701 Smoobu sync is NOT CHECKED.
6. `market.csv` covers only P13 and P10. The pack's `market_percentiles` / `bounds` / `sync_issues` / `gaps` are null.
7. `prices.csv` covers 60 days only, so the 180-day floor/ceiling check and the 5-night / 7-night far-out min-stay rules are NOT CHECKED.
8. Why P20's base change is missing from the logs is UNKNOWN.
