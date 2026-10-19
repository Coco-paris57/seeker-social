## PriceLabs audit (D = 2026-10-19)

Scope: 15 priced listings: 13 via Smoobu (P01, P02, P05–P14, P20) and 2 via Channex (P03, P04). P15–P19 have no PriceLabs listing.
Sources:
- Snapshot `data/snapshots/2026-10-19/{prices.csv, listings.csv, raw/listing_data.json, reservations.csv}`.
- `reports/2026-10-19/kpi_pack.json`, `data/id_map.json`, `data/policy.json`, `../build/properties.py`.
- Yesterday's snapshot and `reports/2026-10-18/sections/pricelabs.md`, used for the diff.
- Live read-only PriceLabs calls on 2026-10-19: `get_listings`, `get_listing_data` (syncing listings), `get_listing_date_overrides` (P01 and P11 for 10–20 Dec; P20 for all dates), `get_customizations` (P20), and `get_listing_neighborhood_market` (P05, P20).

No PriceLabs setting was changed.

Policy respected:
- P02, P03, P06 and P07 are blocked on purpose and are not raised as lost demand.
- P14 numbers are reported only, with no proposal.
- P13 (3064856 + 3090701) is one flat and is not raised as a duplicate.
- P05 is benchmarked against 4-bed listings.

### 1. Did yesterday's changes reach Smoobu? Yes, all 8.
These are live PriceLabs values (`get_listings`/`get_listing_data`), matching `listings.csv`. The prices compare `prices.csv` today against `data/snapshots/2026-10-18/prices.csv`.

| Change | PriceLabs now | Pushed | Effect on PriceLabs price (open nights, vs yesterday) | Smoobu = PriceLabs |
|---|---|---|---|---|
| P01 base £230→£253 | 253 | 2026-10-18 20:40:16Z | +11.5% avg over 18 nights | yes, 0 diffs |
| P05 base £455→£500 | 500 | 2026-10-18 21:10:14Z | +9.9% over 20 nights | yes |
| P06 base £340→£357 | 357 | 2026-10-18 20:40:58Z | +5.0% over 5 nights | yes |
| P09 base £160→£176 | 176 | 2026-10-18 20:38:12Z | +10.3% over 33 nights | yes |
| P11 base £260→£286 | 286 (Vrbo copy 12037367 also 286, pushed 20:49:40Z) | 2026-10-18 20:43:56Z | +13.8% over 19 nights | yes |
| P12 base £270→£284 | 284 (Vrbo copy 12038157 also 284, pushed 20:41:56Z) | 2026-10-18 20:40:26Z | +7.5% over 28 nights | yes |

Date overrides were confirmed live with `get_listing_date_overrides`:
- **P11, 12–18 Dec 2026:** +10% percent overrides, min stay 2, updated 2026-10-18 20:35:17Z. PriceLabs = Smoobu on every date: 12 Dec £394, 13 Dec £309, 14 Dec £287, 15 Dec £285, 16 Dec £297, 17 Dec £312, 18 Dec £324. Yesterday's prices were £323/£253/£234/£233/£243/£255, so the change is about +22% (base +10% × override +10%). 10–11 Dec are booked.
- **P01, 16–17 Dec 2026:** +10% overrides, replacing −2%, min stay 3, updated 2026-10-18 20:38:38Z. 16 Dec is £254 in both PriceLabs and Smoobu (was £206). 17 Dec is £291 in both (was £236). The neighbouring nights with the −2% override rose only by the base change: 15 Dec £208→£229 and 18 Dec £265.

### 2. Sync check: 0 differences
I compared PriceLabs and Smoobu prices on **361 open nights** across 13 Smoobu-priced listings, 2026-10-20 → 2026-12-18:

| Ref | Open nights compared |
|---|---|
| P01 | 19 |
| P05 | 21 |
| P06 | 5 |
| P08 | 48 |
| P09 | 34 |
| P10 | 30 |
| P11 | 20 |
| P12 | 28 |
| P13 | 39 |
| P14 | 60 |
| P20 | 57 |
| P02, P07 | 0 (blocked) |

**0 nights differ by more than £2.** On all 780 Smoobu rows, including booked and blocked nights, there are also 0 differences. This agrees with the pack's `sync_issues` (empty for every property).

P03 and P04 (Channex) have no `smoobu_price`, so 0 nights could be compared for them. Their prices on the OTAs are UNKNOWN.

### CRITICAL
1. **P02 Vrbo copy `_units_0004_ca1ccf61…` (Vrbo 4438728): push is on, but the last push was 2026-02-24T07:31:33Z, 237 days ago.** Unchanged since yesterday. PriceLabs shows "Fully Blocked", 100% occupancy for the next 7, 30 and 60 days, and `last_refreshed_at = null` (live `get_listing_data`, `listings.csv`). The P02 calendar block itself is intentional and is not the issue; the issue is a push-enabled listing that is not syncing.
   - **Check:** PriceLabs → Vrbo account → 4438728 → sync status.
   - **Question:** is Vrbo 4438728 still live, or should push be switched off on this copy?

### HIGH
2. **P20 Waterford Court (Smoobu 3547481, 2-bed Canary Wharf) is priced above its market and is not selling.** The settings are min £220 / base £350 / max £1800, and PriceLabs' recommended base is "Unavailable" (new listing).
   - **Occupancy:** 10% for the next 30 days vs a 35% market (live `get_listing_data`), and 5% vs 27% for the next 60 days. In `prices.csv`, 57 of 60 nights are open. The only booked nights are 22–24 Oct (Airbnb, £223/£232/£246); the stay was booked on 2026-10-17.
   - **Base vs 2-bed market:** PriceLabs nearby listings (151 2-bed listings, `get_listing_neighborhood_market`) have P25 £216, P50 £254, P75 £319, P90 £401. P20's base is **+38% vs P50** and **+10% vs P75**.
   - **20 Oct – 18 Nov (27 open nights):** P20 averages £256 vs the date-matched P50 of £239 and median booked price of £227. It is above P50 on 21 of 27 nights.
   - **19 Nov – 18 Dec (30 open nights, 0 booked):** P20 averages **£336** vs P50 £248 and P75 £320. It is above P50 on all 30 nights and above P75 on 21. Prices range from £290 to £411.
   - **Comparison with P01 Bowspirit:** P01 (3320302) is a 2-bed in the same area (about 0.6 km away, by coordinates in `listing_data.json`). Its base is £253 and it is 100% booked for the next 30 days.
   - **Floor and cap:** the minimum binds on 2 of 57 open nights (3.5%: 20 and 21 Oct at £220) and the maximum on none. The £220 minimum is about at the market P25 (£216), so it blocks most of the 25% last-minute discount.
   - **Customizations (live):** 25% gradual last-minute discount within 15 days; flat +30% far-out premium after 89 days.
   - **Date overrides (live):** −4% on 19–31 Oct and −2% on 1–30 Nov (both min stay 3); min stay 7/6/5/5/5 on 27–31 Dec.
   - **Minimum stay:** 4 nights on 4–6 Dec, 11–13 Dec and 18 Dec. This does not come from a date override, so the source (a min-stay profile?) is UNKNOWN.
   - **Check:** PriceLabs → 3547481 → Base Price (£350 vs P50 £254 / P75 £319). Also check whether the +30% far-out premium after 89 days should stack on this base, and check the Min Price (£220).
   - P20 is not in the info pack (`build/properties.py`).

### MEDIUM
3. **P05 bedroom count: PriceLabs now shows 4 bedrooms.** It showed 5 in yesterday's snapshot (`raw/listing_data.json`: `no_of_bedrooms` 5 → 4; confirmed live). The Smoobu name is "Abbey Rd 4Bed Flat". This resolves the issue, but two records are now out of date: `data/policy.json` → `property_facts.P05` still says "PriceLabs currently has it as 5 bedrooms", and the info pack still says "5-bed", base £455, high £780.
   - **Against the 4-bed market** (90 listings, live): P25 £463, P50 £589, P75 £711, P90 £1139. The new £500 base is **−15% vs P50** and **−30% vs P75**. Over the 21 open nights, P05 averages £547 vs the date-matched P50 of £588.
   - Occupancy is 73% for the next 30 days vs a 33% market, and PriceLabs' recommended base is £467.
   - **Check:** P05 still has room to move Base Price toward the 4-bed P50. Watch pickup after yesterday's +£45 first.
4. **Push freshness is OK at the snapshot, but 9 listings will pass 24 h today.** All 21 push-enabled listings except item 1 pushed between 2026-10-18 06:43Z and 2026-10-19 02:46Z. The capture was at or after 02:46Z, so all were under 24 h old then.
   - These listings were last pushed between 06:43Z and 10:14Z on 18 Oct, so they will be more than 24 h old from the same times on 19 Oct unless the daily sync runs again:
     - P07 3288427 (06:43:06Z)
     - P14 3267077 (07:11:00Z)
     - P04 Vrbo copy 12038555 (07:33:39Z)
     - P10 3318177 (09:11:58Z)
     - P13 3064856 and 3090701 (09:25:53Z)
     - P08 3318167 (09:25:55Z)
     - P20 3547481 (09:25:57Z)
     - P13 Vrbo copy 12037152 (10:14:25Z)
   - Sync is on for every priced listing, so none is critical.
   - **Check:** PriceLabs → Sync status on those listings after today's run.
5. **The P04 Vrbo copy `_units_0001_20df1e73…` (Vrbo 12038555) is pushing but fully blocked.** It has push on and a fresh push, but PriceLabs shows "Fully Blocked" and 100% occupancy for the next 7, 30 and 60 days. The Channex P04 listing (7dc96cda…) shows 57% / 50% / 42% (live `get_listing_data`). The two have the same coordinates and the same 90/220/2000 settings.
   - **Question:** is P04 bookable on Vrbo at all? If not, the Vrbo copy should not push. If it should be bookable, the Vrbo calendar needs to be unblocked.
6. **Orphan nights are still pinned with premium percentage overrides, and yesterday's base raises lifted them further.** The pack's `gaps` field is still empty for all properties. The orphans (`prices.csv`):
   - 1-night gaps with a 1-night minimum stay:
     - P04: 2026-11-01 £462, 2026-12-02 £548.
     - P11: 2026-11-18 £348 (yesterday £316), 2026-11-27 £595 (yesterday £542).
     - P12: 2026-11-17 £377 (yesterday £358).
     - P13: 2026-10-22 £211.
   - 2-night gaps with a 2-night minimum stay:
     - P12: 2026-10-21→22, £185/£197.
     - P13: 2026-10-25→26, £170/£176.
     - P05: 2026-11-16→17, £513/£533.
     - P05: 2026-12-07→08, £723/£689.
   - 3-night gaps: P05 2026-10-28→30 (£452/£444/£437); P06 2026-11-05→07 (£316/£351/£358; P06 is intentionally blocked otherwise).
   - **Check:** the date overrides on these dates, and the orphan-day setting, if a gap-fill discount is wanted rather than a premium.
7. **P09 and P12 bases are now further above their market** (market values from yesterday's live `get_listing_neighborhood_market`, bedroom-matched):
   - P09: £176 vs 1-bed P50 £134 / P75 £165 (+31% / +7%).
   - P12: £284 vs 2-bed P50 £205 / P75 £242 (+39% / +17%).
   - Both still beat market occupancy for the next 30 days: P09 60% vs 38%, P12 60% vs 40% (live).
   - **Check:** pickup over the next 7 days before raising further.
8. **The info pack (`build/properties.py`, dated 10 Sep 2026) is out of date.** P20 is missing. The P05 type is "5-bed" with base £455. Bases differ from PriceLabs:
   - P01: £230 → £253
   - P06: £340 → £357
   - P09: £160 → £176
   - P11: £260 → £286
   - P12: £270 → £284
   - P14: £475 → £525 (min £400 → £500)

   The pack's "high" column is below the PriceLabs max on every listing; this is unchanged from yesterday, and 0% of open nights are at the maximum. Most likely the pack is simply out of date rather than PriceLabs being wrong.

### Other checks
- **Floor/ceiling (60 days only):**
  - At min: P14 40 of 60 open nights (66.7%; special setup, numbers only) and P20 2 of 57 (3.5%). All others are 0%.
  - At max: 0% everywhere (`kpi_pack.json` `bounds`).
- **Base vs market:** P01 £253 vs 2-bed P50 £266 / P75 £332 (−5% / −24%). P06 £357 vs £404 / £511 (−12% / −30%). P11 £286 vs £291 / £341 (−2% / −16%). P05 and P20 are above; P09 and P12 are in item 7.
- **P14:** min £500, base £525, max £2000. 60 of 60 nights open, 0% booked for the next 30 days, 4-night minimum stay on open Fri–Sun nights (5 on 18 Dec). Reported only, per policy.
- **Minimum stay vs policy:** all open nights in the window are 2–3 nights except:
  - the 1-night orphan overrides (item 6);
  - P14's 4-night weekends (policy setup);
  - P20's 4-night weekends from 4 Dec.

  The window ends 18 Dec, so the 5-night (2+ months) and 7-night (4+ months) rules could not be tested.
- **Fixed since yesterday:** the KPI pack now reads the correct PriceLabs listing for P01, P08, P09, P10 and P13 (`settings.sync_on = true`, correct bases), and it now includes P20.

Data gaps:
1. `market.csv` is not in the snapshot, and `kpi_pack.json` `missing.market = "empty"`, so `market_percentiles` is null for every property. Base vs market used the live PriceLabs `get_listing_neighborhood_market`: today for P05 and P20, yesterday's values for the others.
2. `prices.csv` covers only 60 days (to 2026-12-18), so the 180-day floor/ceiling check and the 5- and 7-night minimum-stay rules could not be tested.
3. P03 and P04 (Channex) have no Smoobu rate in `prices.csv`, so the prices that reach the OTAs are UNKNOWN.
4. Prices for the linked P13 listing 3090701 are not in the snapshot.
5. PriceLabs minimum-stay profiles are not exposed by `get_customizations`, so the source of the P14 and P20 4-night weekends is UNKNOWN.
6. The snapshot capture time is not recorded. From the latest push in the data, it was at or after 2026-10-19 02:46Z.
7. P15–P19 have no PriceLabs listing and no prices (`id_map.json`).
8. P20 recommended base is "Unavailable" in PriceLabs, which has no history for it yet.
