## PriceLabs audit (D = 2026-10-22)

**Sources:**
- Snapshot `data/snapshots/2026-10-22/` (`prices.csv`, `listings.csv`, `reservations.csv`, `raw/*.json`), written 05:55–06:06Z. The price window is 23 Oct–21 Dec.
- `reports/2026-10-22/kpi_pack.json`, `data/id_map.json`, `data/policy.json` (21 Oct version), `../build/properties.py`, and the 21 Oct snapshot and report for the diff.
- Live read-only PriceLabs calls, about 06:09Z:
  - `get_listing_data`
  - `get_user_logs` (listing, group and account, 20–22 Oct)
  - `get_listing_prices` (2699998)
  - `get_listing_date_overrides` (3562176, Vrbo 12038555, 2699998, 3064196, 3064856, 3166592, 3547481)
  - `get_customizations` (3562176)

**Nothing was changed.**

**Policy respected:**
- P02, P03, P06 and P07 blocks are not raised.
- P14 numbers are reported only.
- P13 is one flat, and its 1 Dec +50% is intentional.
- Nights after the handback dates (P01 20 Dec, P08 13 Nov, P09 26 Nov, P10 18 Nov, P12 13 Dec) are excluded.
- Stay discounts and the Booking.com markup are not raised.

### Changes logged since 21 Oct (`get_user_logs`)
- No group-level or account-level entries.
- Nothing on 22 Oct up to 06:09Z.

| Time (Z, 21 Oct) | Who | Change |
|---|---|---|
| 09:06:01 | reyhan@ | Channex `7dc96cda…6bc10c0` (Barking) price sync **OFF**. The log entity now reads "***DELETED LISTING -- NO NAME***". |
| 10:12:07 | reyhan@ | P11 3064196 override **+20%, min stay 2, 13–18 Dec**. Copied to Vrbo 12037367. |

The other 21 Oct changes in `policy.json` (Airbnb rules, Booking.com promotions, cleaning fees) were made outside PriceLabs. None of them appear in the PriceLabs logs, which is expected.

---

### CRITICAL

**1. P02 Vrbo copy `_units_0004_ca1ccf61…` (Vrbo 4438728): push is on, but the last push was 2026-02-24T07:31:33Z (240 days ago).**
- Unchanged (live `get_listing_data`, `listings.csv`). The P02 block itself is intentional and not raised.
- **Check:** PriceLabs → Vrbo 4438728 → Sync toggle. Is this Vrbo listing still live? If not, switch push off.

### HIGH

**2. P04 Barking: the Channex listing and old Smoobu 3254047 are gone from PriceLabs (confirmed). Smoobu 3562176 now prices the flat alone. The Vrbo copy still pushes the old Channex overrides.**

*Confirmed removed:*
- Neither `7dc96cda-18fc-4184-b562-1d5f65cb0161___46180933-ae56-4589-abde-6b6690bc10c0` nor `3254047` appears in:
  - live `get_listing_data` (30 listings, against 32 in the 21 Oct `raw/listing_data.json`);
  - the 22 Oct `raw/listing_data.json` (05:57Z);
  - `listings.csv`.
- The only related log entry is the 09:06:01Z push-off. Nothing records the removal itself, and nothing at all is logged for 3254047 (push off, never pushed). How the two listings were removed (Channex disconnect or a PriceLabs delete) is UNKNOWN.

*3562176 is the sole priced listing:*
- push on; last push **2026-10-21T09:33:33Z** (27 min after Channex was switched off);
- min £90 / base £220 / max £2000; recommended base "Unavailable";
- occupancy 30% for the next 30 days vs 25% market.
- **Customizations are unchanged** from 21 Oct: last-minute 25% gradual within 15 days, far-out +30% after 150 days, demand factor "Moderately Conservative", occupancy profile "Aggressive", booking-recency factor at default.
- **Overrides are unchanged** (last updated 2026-10-20 11:29:26Z).
- **Smoobu matches PriceLabs** on all 39 open nights (`prices.csv`).

*2–6 Nov are now open for sale:*
- In the 21 Oct snapshot (Channex), 2–6 Nov were Booked. Now they are open at £187 / £192 / £185 / £183 / £160, min stay 3.
- This matches Smoobu, where Booking.com reservation **2–7 Nov, £682.02, is "cancelled"** (`reservations.csv`).
- Whether Booking.com itself shows the reservation as cancelled is still **UNKNOWN**. If it does not, these 5 nights could be double-booked.

*Vrbo copy `_units_0001_20df1e73…` (Vrbo 12038555):*
- Still present. Push on, last push **2026-10-22T06:01:29Z**. Occupancy 100% for the next 7, 30 and 60 days; next-360 ADR shows "Fully Blocked". min £90 / base £220 / max £2000.
- **Its overrides are the old Channex set, not 3562176's:**
  - 1 Nov **+150%, min stay 1**
  - 2–6 Nov −8%
  - 7–24 Nov −3%
  - 2 Dec +200%, min stay 1
- 3562176 has 1–24 Nov at −5%, min stay 3.
- No commercial effect while the Vrbo calendar is fully blocked.
- Its parent link after the Channex deletion is not exposed by the API (UNKNOWN).

*Questions to resolve:*
- (a) Is Booking.com reservation 2–7 Nov (£682.02) cancelled in the extranet?
- (b) Is the Channex property still connected to any OTA? Removing it from PriceLabs does not prove it is disconnected.
- (c) Is Vrbo 12038555 a live listing? If not, should its push be switched off? If it is, should it be re-linked to 3562176 so it gets the current overrides?

*Check in PriceLabs:* Vrbo 12038555 → Sync toggle and Date Specific Overrides (1 Nov, 2–6 Nov); 3562176 → Calendar 2–6 Nov.

**3. P04, 2 Dec: £612 for one night, min stay 1 (yesterday £551).**
- **What it is:** a 1-night orphan between two Booking.com stays, both confirmed in `reservations.csv`: the 25 Nov–2 Dec stay checks out that morning and the 3–6 Dec stay checks in the next day.
- **How the £612 is built** (`raw/prices_3562176.json`):
  - algorithm price before customizations: £236;
  - after customizations: about £204;
  - date-specific override **+200%** → £612.
  - On 21 Oct, the Channex listing had £209 before customizations and £551 after the override.
  - The whole rise of £61 comes from the algorithm's base price. The override did not change.
- **Against neighbouring nights:** 1 Dec and 3 Dec are priced at £197 (booked), and the next open night, 6 Dec, is £203. 2 Dec is therefore about **3.0×** its neighbours.
- **Where the override came from:**
  - created on the Channex listing 2026-09-09T15:59:27Z and last updated 2026-10-13T23:58:15Z (timestamps from the Vrbo copy, which still mirrors the old Channex overrides);
  - copied into 3562176 at mapping, 2026-10-20T10:32:25Z (log `add_custom_pricing_from_parent_during_mapping`).
- **Not covered by policy:** `policy.json` `intentional_overrides` covers only P13 1 Dec.
- **Question:** is a premium on orphan nights intended, or should a gap-fill discount sell this night?
- **Check:** PriceLabs → 3562176 → Date Specific Overrides → 2 Dec 2026 (+200%, min stay 1).

### MEDIUM

**4. P12: the 3 nights more than £2 apart are a snapshot timing artefact, not a sync fault.**

*The pack's sync issues:*

| Night | PriceLabs | Smoobu | Gap |
|---|---|---|---|
| 26 Oct | £190 | £187 | −£3 |
| 28 Oct | £201 | £198 | −£3 |
| 29 Oct | £206 | £203 | −£3 |

*Why the numbers differ:*
- The snapshot's PriceLabs prices (`raw/prices_2699998.json`, fetched 06:02Z) carry `last_refreshed_at` **2026-10-21T06:56:07Z**, so they are the previous day's calculation.
- PriceLabs recalculated 2699998 at **2026-10-22T05:59:05Z** and pushed at **05:59:08Z** (live `get_listing_data`).
- Live `get_listing_prices` now returns **£187 / £198 / £203** for 26 / 28 / 29 Oct, which equals the Smoobu rates.
- The live `user_price` field still holds the old values: £190 / £201 / £206.

*Ruled out:*
- sync off (push is on);
- push failure (the push came 3 s after the recalculation);
- date-specific overrides (26–29 Oct have had −2%, min stay 2 since 2026-10-17T20:44:44Z; unchanged);
- manual Smoobu override (Smoobu equals the new PriceLabs price).

*No action needed.* The snapshot's PriceLabs price lags one recalculation for any listing that refreshes after the fetch (see Data gaps).

**5. P04: open-night prices rose 8% on 21 Oct with no logged change.**
- Measured against yesterday's 3562176 prices (the `smoobu_price` column in the 21 Oct `prices.csv`), on 38 shared open nights excluding 2 Dec: average **£168 → £182 (+8.0%)**.
  - 1–6 Nov: £162 → £180
  - 7–24 Nov: £152 → £167 (e.g. 8 Nov £138 → £161)
  - 6–19 Dec: £192 → £201
- **Ruled out:** user changes, overrides and customizations (none changed).
- The recalculation ran at 2026-10-21T09:33:31Z, after the Channex push-off. The per-factor breakdown is not exposed, so the cause is UNKNOWN.

**6. Orphan and short gaps** (`prices.csv` with live overrides; the pack's `gaps` field is empty):

| Ref | Night(s) | Override | Price | Min stay | Note |
|---|---|---|---|---|---|
| P04 | 25 Oct (1) | −5% | £161 | 3 | **Unbookable** (`unbookable=1`): 1 night between the 22–25 Oct check-out and the 26 Oct check-in |
| P04 | 2 Dec (1) | +200% | £612 | 1 | Item 3 |
| P12 | 17 Nov (1) | +50% (updated 2026-10-15) | £364 | 1 | — |
| P11 | 18 Nov (1) | +30% | £318 | 1 | — |
| P11 | 27 Nov (1) | +60% | £590 | 1 | — |
| P13 | 25–26 Oct (2) | −1% | £153 / £159 | 2 | Sellable as a 2-night stay |
| P05 | 28–30 Oct (3) | +15% | £412 / £419 / £410 | 2 | — |
| P05 | 16–17 Nov (2) | +15% | £452 / £504 | 2 | — |
| P05 | 7–8 Dec (2) | +40% | £780 / £761 | 2 | — |
| P06 | 5–7 Nov (3) | none | £336 / £281 / £282 | 2 | — |

- P13's 1 Dec £344 (+50%, min stay 1) is intentional per policy.
- A gap-fill rule would sell P04 25 Oct, the only orphan that cannot sell now, and would discount the 1-night premiums instead.
- **Check:** whether the orphan premiums are intended. Settings to look at:
  - 3562176 → 25 Oct, min stay 3;
  - 2699998 → 17 Nov;
  - 3064196 → 18 Nov and 27 Nov.

**7. P11: the logged 21 Oct change covers 13–18 Dec; `policy.json` says 13–17 Dec.**
- **Override:** +20%, min stay 2, on **13–18 Dec** (live overrides, updated 2026-10-21T10:12:07Z). Pushed 10:13:37Z; Smoobu matches PriceLabs.
- **Prices:**

  | Night | Before | After |
  |---|---|---|
  | 13 Dec | £306 | £332 |
  | 14 Dec | £285 | £306 |
  | 15 Dec | £284 | £311 |
  | 16 Dec | £295 | £323 |
  | 17 Dec | £310 | £339 |
  | 18 Dec | £354 | £390 |

- **13–17 Dec average: £322**, which meets the policy's "above £300".
- 18 Dec is raised too.
- **Question:** is 18 Dec meant to be included?

**8. P20 Waterford Court (3547481): occupancy is still well below market.**
- **Occupancy (live):** 13% for the next 30 days vs 34% market; 7% for the next 60 days vs 27%.
- **Settings:** min £220 / base £350 / max £1800; recommended base "Unavailable".
- **Floor/cap:** 0 of 55 open nights at the minimum or the maximum (pack `bounds`).
- **Overrides are unchanged:** −4% on 22–31 Oct and −2% on 1–30 Nov, min stay 3.
- **Overnight moves** are all in the algorithm's price before customizations, with no log entry:
  - 25 Oct £259 → £237
  - 30 Oct £277 → £254
  - 20 Dec £372 → £333
- **4-night minimum on 4–6, 11–13 and 18–20 Dec:** no override on those dates, so the source is UNKNOWN.
- Numbers only: policy says Airbnb's 20% new-listing discount is why the price has not been adjusted.

**9. Push freshness: every push-enabled listing is within 24 h at 06:09Z, except item 1.**
- They pass 24 h today at these times (Z):

  | Time | Listing |
  |---|---|
  | 07:00 | P07 |
  | 07:18 | P14 |
  | 08:52 | P08, P20, P10 |
  | 09:03 | P09 |
  | 09:05 | P01 |
  | 09:06 | P06 |
  | 09:26 | P05 |
  | 09:28 | P13 3064856 / 3090701 |
  | 09:33 | P04 3562176 |
  | 10:13 | P13 Vrbo, P11, P11 Vrbo |

- Pushed today: P02 at 00:23Z, P03 at 02:42Z, P12 Vrbo at 05:24Z, P12 at 05:59Z, P04 Vrbo at 06:01Z.
- **Check** after 10:15Z.

**10. Floor/ceiling** (pack `bounds`; 60-day window only):
- P14: **65% of open nights at the £500 minimum** (39 of 60). Special setup, numbers only. P14 occupancy is 0% for the next 60 days vs 38% market.
- Every other listing: 0% at the minimum and 0% at the maximum.

**11. The info pack (`../build/properties.py`) is still out of date** (unchanged; most likely the pack is simply stale, not PriceLabs wrong).
- **Minimums match everywhere except P14** (pack £400 vs PriceLabs £500, special setup).
- **Base differences** (pack → PriceLabs):
  - P01: £230 → £253
  - P05: £455 → £550 (the pack also says "5-bed"; PriceLabs and policy say 4 bedrooms)
  - P06: £340 → £357
  - P09: £160 → £176
  - P11: £260 → £286
  - P12: £270 → £284
  - P14: £475 → £525
- **Pack "high" vs PriceLabs max:** every listing's max is above the pack's high (e.g. P04 £450 vs £2000).
- **P20** is not in the pack.

**12. Listing hygiene** (unchanged apart from item 2):
- **Channex copies with push off** (last refreshed 2026-08-20): P01, P08, P09 and P10.
- **Three unmatched Vrbo listings at Marylebone coordinates**, push off: 11561696, 11560218 and one blank.
- **P13:** two blank Vrbo copies with push off; Vrbo 12037152 pushing.
- **P11 Vrbo 12037367 and P12 Vrbo 12038157** push separately as copies.
- **P15–P19** have no PriceLabs listing.
- **P03** is priced through Channex (not in Smoobu); it is blocked on purpose.

Data gaps:
1. `market.csv` is absent (pack `missing.market` = "empty"), so `market_percentiles` are null for every ref and base-vs-market was not measured today. Neighbourhood tools were not in today's allowed tool set.
2. The snapshot's PriceLabs prices can lag one recalculation. `raw/prices_*.json` returns the last calculation at fetch time; P12 recalculated at 05:59Z, but the 06:02Z fetch still carried 21 Oct 06:56Z data. This is the source of the pack's P12 sync issues.
3. `prices.csv` covers 23 Oct–21 Dec only. The 180-day floor/ceiling check and the 5-night (2+ months) and 7-night (4+ months) min-stay rules could not be tested; the window ends before 22 Dec.
4. The Booking.com status of reservation 2–7 Nov (£682.02) is UNKNOWN: Smoobu says "cancelled". So are the Channex property's remaining OTA connections and whether Vrbo 12038555 is live (not exposed by PriceLabs).
5. How Channex `7dc96cda…` and Smoobu 3254047 were removed from PriceLabs is UNKNOWN (no log entry beyond the push-off). Vrbo 12038555's parent link is not exposed.
6. Per-date factor breakdowns are not exposed, so the causes of the P04 +8% move, the P20 moves and the P04 2 Dec base rise are UNKNOWN.
7. The source of P20's 4-night minimum on 4–6, 11–13 and 18–20 Dec is UNKNOWN: no override exists, and min-stay settings are not in `get_customizations`.
8. Overrides were not re-read today for 3090701, P01, P06, P08, P09, P10 or P14. No log entries for them since 20 Oct.
