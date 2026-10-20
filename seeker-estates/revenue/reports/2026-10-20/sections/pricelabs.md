## PriceLabs audit (D = 2026-10-20)

Scope: 15 priced listings. 13 are priced via Smoobu (P01, P02, P05–P14, P20) and 2 via Channex (P03, P04). P15–P19 have no PriceLabs listing.

Sources:
- Snapshot `data/snapshots/2026-10-20/{prices.csv, listings.csv, pl_kpis.csv, reservations.csv}`, written at about 06:06Z.
- `reports/2026-10-20/kpi_pack.json`, `data/id_map.json`, `data/policy.json` and `../build/properties.py`.
- Snapshots from 18 and 19 Oct and `reports/2026-10-19/sections/pricelabs.md`, used for the diff.
- Live read-only PriceLabs calls on 2026-10-20, around 06:10Z:
  - `get_listing_data` (syncing listings)
  - `get_user_logs` (listing, group and account, 18–20 Oct)
  - `get_listing_date_overrides` (P01, P04, P05, P06, P11, P12, P13 3064856, P20)
  - `get_customizations` (P20)
  - `get_listing_neighborhood_market` (P01, P05, P06, P09, P11, P12, P20)
  - `get_pms_reservations` (P13 3064856 and 3090701, 1–10 Nov)

No PriceLabs setting was changed.

Policy respected:
- P02, P03, P06 and P07 are blocked on purpose and are not raised as lost demand.
- P14 numbers are reported only.
- P13 (3064856 + 3090701) is one flat.
- P05 is benchmarked against 4-bed listings.
- 15% weekly / 20% monthly stay discounts are not raised.

### 1. Sync check: 0 differences (unchanged)
- `prices.csv` covers 2026-10-21 → 2026-12-19. On **358 open nights** across 11 Smoobu-priced listings with open dates, **0 nights differ by more than £2** between PriceLabs and Smoobu: P01 18, P05 22, P06 4, P08 49, P09 35, P10 31, P11 19, P12 28, P13 36, P14 60, P20 56. P02 and P07 have 0 open nights (blocked on purpose).
- Across all 780 Smoobu rows, including booked and blocked nights, there are also 0 differences. The pack's `sync_issues` is empty for every property.
- P03 and P04 (Channex) have no `smoobu_price`, so their OTA rates are UNKNOWN.
- `smoobu_price` equals `pricelabs_price` on every row, so it is the base Smoobu rate. The Booking.com rate after the ×1.2 markup is not in the snapshot and could not be checked (Data gaps).

### 2. Are the 18 Oct base rises live? Yes in settings for all 6. On prices, P05 and P06 have fallen back below their pre-raise level.
`get_user_logs`: the last change was 2026-10-18 20:43:46Z (reyhan@). **There were no listing, group or account changes on 19 or 20 Oct.**

| Ref | Base now (live = listings.csv) | Last push | Avg PriceLabs price, same open nights: vs 18 Oct / vs 19 Oct | Smoobu = PriceLabs |
|---|---|---|---|---|
| P01 | £253 | 2026-10-19 09:38:17Z | +9.7% / −1.4% (18 nights) | yes |
| P05 | £500 | 2026-10-19 09:38:46Z | **−3.0% / −11.2%** (20 / 21 nights) | yes |
| P06 | £357 | 2026-10-19 09:38:24Z | **−3.4% / −8.1%** (4 nights) | yes |
| P09 | £176 | 2026-10-19 09:37:59Z | +8.2% / −1.5% (33 / 34 nights) | yes |
| P11 | £286 (Vrbo copy 12037367 £286, pushed 2026-10-19 07:29:40Z) | 2026-10-19 09:38:26Z | +11.7% / −1.5% (18 / 19 nights) | yes |
| P12 | £284 (Vrbo copy 12038157 £284, pushed 2026-10-19 07:02:29Z) | 2026-10-19 09:38:23Z | +4.2% / −3.3% (28 nights) | yes |

- The 18 Oct date overrides are still in place (live):
  - P11, 12–18 Dec: +10%, min stay 2. Prices: 12 Dec £392, 13 Dec £307, 14 Dec £284, 15 Dec £283, 16 Dec £295, 17 Dec £312, 18 Dec £354.
  - P01, 16–17 Dec: +10%, min stay 3. Prices: 16 Dec £255, 17 Dec £292.
  - P12, 29 Nov–13 Dec: +1%, min stay 2.
- **New, not in yesterday's report:** P05 has a **+100%** override on **29 Dec 2026** with min stay 1, set 2026-10-18 20:34:32Z (first +90%, then +100%). It is outside the snapshot window, so its price is UNKNOWN.

### CRITICAL
1. **P02 Vrbo copy `_units_0004_ca1ccf61…` (Vrbo 4438728): push is on, but the last push was 2026-02-24T07:31:33Z, 238 days ago.** Unchanged since yesterday. It shows "Fully Blocked", 100% occupancy for the next 7, 30 and 60 days, and `last_refreshed_at` null (live `get_listing_data`, `listings.csv`). The P02 calendar block is intentional; the issue is a push-enabled listing that is not syncing.
   - **Check:** PriceLabs → Vrbo account → 4438728 → sync status.
   - **Question:** is Vrbo 4438728 still live, or should push be switched off on this copy?

### HIGH
2. **P05 St John's Wood: yesterday's +£45 base rise has been cancelled out on price.** The open-night average is now £486 vs £547 on 19 Oct (−11.2%), and below the 18 Oct level before the raise (−3.0%).
   - **Date by date** (19 Oct → 20 Oct):
     - 28–30 Oct: £452/£444/£437 → £386/£388/£377
     - 16 Nov: £513 → £406
     - 30 Nov: £583 → £454
     - 14 Dec: £539 → £441
     - 15 Dec: £545 → £442
   - **Cause: part established, the rest UNKNOWN** (follow-up requested by the coordinator). Evidence:
     - **Where the drop is:** PriceLabs' own `uncustomized_price` fell. This is the algorithm's price before customizations and date overrides (`raw/prices_3166592.json` 19 Oct vs 20 Oct; live `get_listing_prices` matches today's file). On the same 21 open nights it fell **−9.4%**, against −11.2% for the final price. Examples:
       - 28 Oct: £548 → £458 (final £452 → £386)
       - 16 Nov: £558 → £457 (final £513 → £406)
       - 30 Nov: £624 → £517 (final £583 → £454)
       - 17 Nov: final £533 → £451, −15.4%

       So about 85% of the fall comes from the algorithm's price before customizations, not from an override.
     - **When:** the new prices come from PriceLabs' recalculation at **2026-10-19 09:38:44Z** (`last_refreshed_at`). The previous one was 2026-10-18 21:10:13Z, straight after the base rise.
     - **Ruled out by evidence:**
       - Base is still £500 (live).
       - There are no user logs after 2026-10-18 20:43:46Z (listing, group and account).
       - Every P05 date override was last updated on or before 2026-10-18 20:34Z (live).
       - Customizations (live, including switched-off ones): seasonality is off ("recommended"); day-of-week is off; demand factor is "Moderately Aggressive"; occupancy-based adjustment is on with the default profile; last-minute is 25% flat within 15 days; far-out premium is +30% after 120 days; booking-recency factor is off (the default applies). The tool does not give change dates, so "unchanged" rests only on the empty logs.
     - **Bedroom change is not shown to be the cause:** `no_of_bedrooms` was 5 in the 18 Oct snapshot, but it was **already 4 at the 18 Oct 21:10Z refresh**, and that refresh produced the *higher* prices. The recommended base is **£467 in all three snapshots** (5-bed on 18 Oct, 4-bed on 19 and 20 Oct). So the change did not move PriceLabs' base recommendation.
     - **What remains open:** whether the 19 Oct 09:38Z run re-benchmarked P05 against a different comp set or seasonality curve (for example after the 5→4 bedroom change) cannot be seen. The read-only tools give no factor breakdown per date. Today's DS neighbourhood file (`raw/neighbourhood_P05.json`) shows "4 BR" with a 3–5 bedroom range and best category "3 BR" (median £386), but there is no 19 Oct P05 neighbourhood file to compare with.
     - The fall is in what is live: Smoobu shows the new prices (`smoobu_price` comes from the Smoobu rates API, `rm/snapshot.py`). The `user_price` field in the PriceLabs response still shows the old values (£452 on 28 Oct, etc.); its meaning is not documented, so it is not used here.
     - The coordinator's −13.4% and my −11.2% are measured on different sets of nights.
   - **Against the 4-bed market** (live, 90 listings: P25 £473, P50 £590, P75 £713, P90 £1143):
     - Base £500 is **−15% vs P50** and **−30% vs P75**. Recommended base is £467.
     - 20 Oct–18 Nov: P05 averages **£439 vs the date-matched P50 of £543**. It is below P50 on all 9 open nights.
     - 19 Nov–19 Dec: it averages £529 vs P50 £643 (above P50 on 2 of 13 nights).
   - Occupancy for the next 30 days is 70% vs a 33% market (live).
   - **Check:** PriceLabs → 3166592 → Calendar → price breakdown on 28 Oct, 16 Nov and 30 Nov (the market/seasonality and demand factors behind the £548→£458-type drop in the algorithm's price), and the comp set / bedroom range the listing now uses. Then check the Base Price against the 4-bed P50 of £590.
3. **P20 Waterford Court (Smoobu 3547481): still well above its market. The only new nights are an extension of the existing stay. Prices for 25 Oct–3 Nov rose about 15% overnight with no logged change.**
   - **Settings (live):** min £220 / base £350 / max £1800. Recommended base is "Unavailable". Last push 2026-10-19 09:18:34Z; sync is on.
   - **Occupancy (live):** 86% for the next 7 days, **20% for the next 30 days vs a 34% market**, and 10% for the next 60 days vs 27%. Yesterday's 30-day figure was 10%. The pack's `forward_occ_30` is 0.138.
   - **Bookings (`reservations.csv`):**
     - The Airbnb stay from 10 Oct now departs **22 Oct instead of 18 Oct**, but its total is **unchanged at £1854.40**.
     - A direct booking for 18–22 Oct (£927.20) was created and cancelled on 19 Oct.
     - The Airbnb booking for 22–25 Oct (£537.84) is unchanged.
     - 21 Oct is now closed. Every night from 25 Oct to 19 Dec is open: 56 of 60 nights.
   - **Base vs 2-bed market** (live, 151 listings: P25 £219, P50 £260, P75 £321, P90 £412): base £350 is **+35% vs P50** and **+9% vs P75**.
     - 20 Oct–18 Nov (25 open nights): P20 averages £274 vs the date-matched P50 of £249. It is above P50 on 24 nights and above P75 on 1.
     - **19 Nov–19 Dec (31 open nights, 0 booked):** it averages **£337 vs P50 £262 / P75 £333**. It is above P50 on all 31 nights and above P75 on 18. The range is £288–£413.
   - **Overnight price moves:**
     - 25 Oct–3 Nov rose from £236/£233/£232/£236/£249/£253/£258/£269/£272/£284 to **£272/£267/£267/£266/£293/£298/£303/£316/£316/£327** (+15–18%).
     - The date overrides are unchanged (live): −4% on 20–31 Oct and −2% on 1–30 Nov (min stay 3), updated 2026-10-17.
     - The customizations are unchanged (live): 25% gradual last-minute discount within 15 days; flat +30% far-out premium after 89 days.
     - No setting change was logged, so the cause is UNKNOWN.
   - **Comparison:** P01 Bowspirit (2-bed, about 0.6 km away) has a base of £253 and is 100% booked for the next 30 days.
   - **Floor and cap:** 0 of 56 open nights are at the £220 minimum or at the maximum.
   - **Check:** PriceLabs → 3547481 → Base Price (£350 vs P50 £260 / P75 £321). Then check the price breakdown on 1 Nov, to see why 25 Oct–3 Nov rose. In Smoobu, check the 10 Oct Airbnb reservation: 4 nights were added but the total stayed at £1854.40.
   - P20 is not in the info pack (`build/properties.py`).

### MEDIUM
4. **Push freshness: everything is fresh at the snapshot, but all 13 Smoobu listings and 3 Vrbo copies pass 24 h today unless today's run pushes.**
   - At about 06:06Z, every push-enabled listing except item 1 had pushed within 24 h:
     - Smoobu listings: 2026-10-19 06:38Z–09:38Z
     - P02 (Smoobu 2999946): 2026-10-20 00:24Z
     - P03 and P04 (Channex): 02:36Z and 05:34Z on 2026-10-20
   - They will pass 24 h at these times today:
     - P04 Vrbo 12038555: 06:29:29Z
     - P07: 06:38:41Z
     - P13 Vrbo 12037152: 06:39:53Z
     - P12 Vrbo: 07:02:29Z
     - P14: 07:21:23Z
     - P11 Vrbo: 07:29:40Z
     - P10: 08:58:24Z
     - P13 3064856 and 3090701, P08 and P20: 09:18Z
     - P09, P01, P12, P06, P11 and P05: 09:37Z–09:38Z
   - Yesterday's run re-pushed everything in the same 06:29Z–09:38Z window. Sync is on everywhere, so none of these is critical.
   - **Check:** after 09:40Z, PriceLabs → Sync status shows 20 Oct pushes.
5. **P04 Vrbo copy `_units_0001_20df1e73…` (Vrbo 12038555) pushes but is fully blocked** (unchanged). It shows 100% occupancy for the next 7, 30 and 60 days and "Fully Blocked". The Channex P04 listing shows 71% / 50% / 42% (live).
   - **Question:** is P04 meant to be bookable on Vrbo? If not, switch push off on this copy. If it is, unblock the Vrbo calendar.
6. **Orphan nights are still pinned with premium date overrides** (all confirmed live with `get_listing_date_overrides`; prices from `prices.csv`). The pack's `gaps` field is empty for all properties. The orphans are:
   - **P04** (Channex):
     - 1 Nov 2026: **+150%**, min stay 1 → **£475** (neighbouring nights about £140–£150).
     - 2 Dec 2026: **+200%**, min stay 1 → **£551**.
   - **P11:**
     - 18 Nov: +30%, min stay 1 → £317 (yesterday £348).
     - 27 Nov: +60%, min stay 1 → £595.
   - **P12:** 17 Nov: +50%, min stay 1 → £373.
   - **P13:** 22 Oct: +40%, min stay 1 → £199.
   - **P05:**
     - 7–8 Dec: +40%, min stay 2 → £737/£704.
     - 16–17 Nov: +15%, min stay 2 → £406/£451.
     - 28–30 Oct: +15%, min stay 2 → £386/£388/£377.
   - **P13:** 25–26 Oct, 2-night gap, min stay 2, −1% override → £170/£172.
   - **P06:** 5–7 Nov, 3-night gap, min stay 2, no price override → £288/£319/£327.

   **Check:** whether these premiums are intended. A gap-fill rule would discount these nights rather than mark them up. The orphan-day setting itself is not exposed (Data gaps).
7. **P09 and P12 bases are above their market; P01, P06 and P11 are below.** Live bedroom-matched base-price percentiles:

   | Ref | Base | Recommended | P50 | P75 | Gap vs P50 / P75 | Occupancy, next 30 (live) vs market |
   |---|---|---|---|---|---|---|
   | P09 (1-bed) | £176 | £162 | £137 | £168 | **+28% / +5%** | 60% vs 38% |
   | P12 (2-bed) | £284 | £280 | £207 | £248 | **+37% / +15%** | 57% vs 40% |
   | P01 (2-bed) | £253 | £231 | £269 | £335 | −6% / −24% | 100% vs 33% |
   | P06 (2-bed) | £357 | £339 | £407 | £529 | −12% / −33% | 80% vs 43% |
   | P11 (2-bed) | £286 | £267 | £299 | £350 | −4% / −18% | 60% vs 46% |

   - P09 is above the date-matched P75 on 16 of 23 nights in 19 Nov–19 Dec.
   - P12 is above P75 on 8 of 15 nights in that period.
   - P06's 4 open nights average £302 vs P50 £360.

   **Check:** pickup over the next 7 days before any further move.
8. **The info pack (`build/properties.py`) is out of date.** This is unchanged; most likely the pack is simply out of date rather than PriceLabs being wrong.
   - P20 is missing.
   - P05 is listed as "5-bed", base £455, high £780; PriceLabs has 4 bedrooms and base £500.
   - Bases differ from PriceLabs (pack → PriceLabs):
     - P01: £230 → £253
     - P06: £340 → £357
     - P09: £160 → £176
     - P11: £260 → £286
     - P12: £270 → £284
     - P14: £475 → £525 (min £400 → £500)
   - The pack's "high" is below the PriceLabs max on every listing. Examples (pack → PriceLabs): P01 £450 → £650, P13 £380 → £2000, P04 £450 → £2000.

### Resolved since 19 Oct
- **P13, 4–8 Nov open/closed mismatch: resolved.** The Airbnb booking for 4–8 Nov (£598.71 rental, booked 2026-10-18 18:43Z) is on the **linked listing 3090701** (live `get_pms_reservations`; 3064856 has no reservation in 1–10 Nov). Yesterday's snapshot showed 3064856 open on 4–7 Nov. Today it shows **Blocked** on 4–7 Nov (£202/£201/£210/£212), and 8 Nov is open again (£197). Under policy, these blocked nights count as a booking, not a block.
- No settings were changed on 19 or 20 Oct (logs).

### Other checks
- **Floor/ceiling (60-day window only):**
  - At min: P14 39 of 60 open nights (65%; special setup, numbers only). Every other listing is 0%.
  - At max: 0% everywhere (`kpi_pack.json` `bounds`, matching my count from `prices.csv`).
- **Base vs recommended base (live):**
  - P02 £175 / £175; P03 £323 / £322; P04 £220 / £228; P07 £226 / £223; P08 £250 / £243; P10 £160 / £164; P13 £235 / £230; P14 £525 / £520.
  - P20: UNKNOWN (recommended base is "Unavailable").
  - Day-on-day changes in the recommended base: P10 £165 → £164; P13 3064856 £229 → £230; 3090701 £234 → £233.
- **Minimum stay vs policy (2–3 nights):** every open night in 21 Oct–19 Dec is 2 or 3 nights, except:
  - the 1-night orphan overrides (item 6);
  - P14's 4-night Fri–Sun nights and 5 nights on 19 Dec (special setup);
  - **P20: 4 nights on 4–6 Dec, 11–13 Dec and 18–19 Dec.** P20 has no date override on those dates, so the source is UNKNOWN.

  The 5-night rule (2+ months ahead) starts on 20 Dec, after the window ends on 19 Dec, so neither it nor the 7-night rule could be tested. Live overrides beyond the window set 27–31 Dec minimum stays of 7/6/5/5/5 on P20, 7/5/4/4/4 on P01, 7/5/4/4/4 on P13 and 3 on P05.
- **New closures since 19 Oct** (`prices.csv`):
  - P01: 18 Dec
  - P04: 21 Oct
  - P13: 4–7 Nov (see above)
  - P20: 21 Oct
- **P05, 27 Oct:** still Blocked, reason UNKNOWN (pack check "3% blocked").

Data gaps:
1. `market.csv` is not in the snapshot, and `kpi_pack.json` has `missing.market = "empty"`, so `market_percentiles` and `avg_open_price_next30`-based percentiles are null. Base vs market used live `get_listing_neighborhood_market` for P01, P05, P06, P09, P11, P12 and P20 only. P08, P10, P13 and P14 market percentiles are UNKNOWN today.
2. `prices.csv` covers only 60 days (to 2026-12-19). The 180-day floor/ceiling check, the 5- and 7-night minimum-stay rules, and the price of the P05 29 Dec +100% override could not be tested.
3. The Booking.com rate in Smoobu (stated as PriceLabs ×1.2) is not in `prices.csv`, and the ×1.2 markup is not written in `data/policy.json` (only `kpi_pack.json` `channel_economics` uses 120 per 100). The Booking.com price parity is therefore UNKNOWN.
4. P03 and P04 (Channex) have no Smoobu or OTA rate in `prices.csv`.
5. Prices for the linked P13 listing 3090701 are not in the snapshot.
6. The factor-level causes of the 19→20 Oct price falls on P05 (−11.2%, of which −9.4% is in the algorithm's price before customizations; see item 2) and P06 (−8.1%, all of it in the algorithm's price before customizations) and the rise on P20 25 Oct–3 Nov (+15–18%) are UNKNOWN. The read-only tools expose no per-date price breakdown.
7. The source of the P14 and P20 4-night weekends is UNKNOWN: minimum-stay profiles and orphan-day settings are not returned by `get_customizations`.
8. P15–P19 have no PriceLabs listing (`id_map.json`). P20's recommended base is "Unavailable".
