## PriceLabs audit (D = 2026-10-18)

Scope: the 14 priced listings in `data/id_map.json` (`pricelabs`): 12 via Smoobu, plus P03 and P04 via Channex. P15–P19 have no PriceLabs listing.
Sources: `data/snapshots/2026-10-18/{prices.csv, listings.csv, raw/listing_data.json, raw/prices_*.json, reservations.csv}`, `reports/2026-10-18/kpi_pack.json`, `build/properties.py`. Live read-only PriceLabs calls on 2026-10-18: `get_customizations` (14 listings + account smoobu/channex), `get_listing_date_overrides` (14), `get_listing_neighborhood_market` (14). No PriceLabs settings were changed.

### Sync verification (check 1)
- I compared `prices.csv` `pricelabs_price` with `smoobu_price` on every row of the 12 Smoobu-mapped listings, 2026-10-19 → 2026-12-17: **299 open nights** (P01 18, P05 20, P06 6, P08 47, P09 33, P10 29, P11 20, P12 28, P13 38, P14 60; P02 0, P07 0). **0 nights differ by more than £2.** On all 720 rows, including booked and blocked nights, there are also 0 differences. This confirms the pack's 0 sync issues.
- P03 and P04 (Channex): 0 nights compared, because `smoobu_price` is blank (neither unit is in Smoobu). What actually reaches the OTAs for these two is UNKNOWN.
- Push freshness (check 2): all 14 priced listings have `push_enabled=true` and a `last_date_pushed` on 2026-10-18, between 00:23:49Z (P02) and 18:17:43Z (P04). None is stale. The snapshot capture time is not recorded, so I measured "<24 h" against D.

### CRITICAL
1. **P14 Primrose Hill: the minimum price is setting the price, and nothing is selling.** 41 of 60 open nights (68.3%) sit exactly at the £500 minimum, and 0 nights are at the maximum (`prices.csv`, `listings.csv`). Without customizations, PriceLabs would charge an average of £439, as low as £262 (2026-10-19), and on 41 of 60 nights it would charge less than £500 (`raw/prices_3267077.json` `uncustomized_price`). Result: 60/60 nights open in the next 60 days, 0 booked, and 0 nights / £0 in the last 30 days (`kpi_pack.json` last30, pace_30). The 25% last-minute discount within 30 days (`get_customizations`) has no effect, because the minimum blocks it. Against PriceLabs' nearby 1-bed listings (174 Airbnb listings), P50 = £192, P75 = £233, P90 = £292. P14's base of £525 is +173% vs P50 and +125% vs P75, and its £500 minimum is 71% above P90. The info pack says min £400 / base £475 / max £800 (`build/properties.py`), so PriceLabs is £100 higher at the minimum and £50 higher at the base. No date overrides on P14. Open Fri/Sat/Sun nights also carry a 4-night minimum stay (24 nights, 2026-10-23 → 2026-12-13), which is above the 2–3 night policy. **Check:** PriceLabs → 3267077 → Min Price (500), Base Price (525). Decide whether to go back to the pack's £400 / £475 or lower. Also check the minimum-stay profile behind the 4-night weekends.
2. **P02 Vrbo copy `_units_0004_ca1ccf61…` (Vrbo 4438728): push is on, but the last push was 2026-02-24T07:31:33Z.** That is 236 days stale. PriceLabs shows `adr_next_360 = "Fully Blocked"`, occupancy 100% for the next 7, 30 and 60 days, and `last_refreshed_at = null` (`raw/listing_data.json`). Its settings (60/175/800) match the Smoobu listing 2999946. Possible causes: broken Vrbo connection, a listing that has been removed, or a calendar fully blocked on Vrbo. **Check:** PriceLabs → Vrbo account → listing 4438728 sync status. **Question:** is Vrbo 4438728 still live, or should this copy be switched off or removed?

### HIGH
3. **P03 Bayswater (Channex 518457d0…): PriceLabs sees every night as unavailable.** All 60 nights have `occupancy=1`, a blank `booking_status`, and "Unavailable" demand (`raw/prices_518457d0….json`). `fully_blocked_next_360 = true` (`kpi_pack.json` → pricelabs). Push is still on (last push 2026-10-18T03:27:31Z). The unit is not in Smoobu, so no reservations are visible. This contradicts the pack, which reports `blocked_next_30 = 0.0`. Its £323 base is −26% vs PriceLabs' 3-bed P50 of £434 (26 listings). No date overrides. **Question:** is P03 actually sold out through a channel we can't see, or blocked or delisted in Channex? **Check:** the Channex availability for this property.
4. **P07 Woolwich (3288427): all 60 nights blocked.** `fully_blocked_next_360 = true`, 0 nights in the last 30 days, push on (`prices.csv`, `kpi_pack.json`). The settings would also price it far above the market once it reopens: the £165 minimum is above the 1-bed P75 of £145, and the £226 base is +95% vs P50 £116 (88 listings). PriceLabs' own ADR year-to-date is £134. No date overrides; the only customizations are a 25% last-minute discount and a market-driven far-out premium. **Question:** why is P07 blocked (owner use, works, delisted)? **Check:** the Smoobu calendar blocks, then Min/Base in PriceLabs before it reopens.
5. **Duplicate and orphan listings (hygiene, check 6).**
   (a) P13: two Smoobu listings at identical coordinates (51.5088201, −0.2342476), 3064856 and 3090701, are both pushing 110/235/2000. A Vrbo copy (`_units_0001_3d48ae56…`) is also pushing, and two more Vrbo copies have push off.
   (b) P04: priced through Channex 7dc96cda…. The old Smoobu listing 3254047 has push off. The Vrbo copy `_units_0001_20df1e73…` is pushing with the same coordinates and settings.
   (c) Waterford Court, Smoobu 3547481 (220/350/1800, pushing), is not in the info pack.
   (d) Three Vrbo listings at Marylebone coordinates have push off.
   (e) The Channex copies for P01, P08, P09 and P10 have push off (`raw/listing_data.json`, `id_map.json`).
   (f) P15–P19 have no PriceLabs listing.
   **Questions:** Is 3090701 a second unit (then the info pack is missing a property) or the same flat listed twice (double-booking risk)? Should the P04 and P13 Vrbo copies push separately, or come through one source? Is Waterford Court a managed property? How are P15–P19 priced?
6. **The KPI pack reads the wrong PriceLabs listing for P01, P08, P09, P10 and P13 (data error, not a PriceLabs error).** For these five, `kpi_pack.json` `settings` show `sync_on: false`, `last_push: ""` and bases of £200 / £185 / £155 / £134 / null. Those values belong to the push-off Channex or Vrbo duplicates. The priced Smoobu listings (3320302, 3318167, 3318172, 3318177, 3064856) actually have sync on, pushed 2026-10-18, and bases of £230 / £250 / £160 / £160 / £235 (`listings.csv`). The pack's `bounds.min/max` for these five are info-pack values (e.g. P01 120/450), not PriceLabs values (120/650). The pack also has `bounds = null` for P02, P03 and P07. **Action:** fix the ref→listing join in analyse so it uses `id_map.json` `pricelabs[0]`. Until then, don't raise a "sync off" alarm from the pack.

### MEDIUM
7. **Orphan nights (check 8) are pinned with manual date overrides that add a premium.** These are all percentage overrides with a 1-night minimum stay, so the gap is bookable but priced high (`get_listing_date_overrides`, `prices.csv`):
   - P04: 2026-11-01 +150% → £462; 2026-12-02 +200% → £548.
   - P11: 2026-11-18 +30% → £316; 2026-11-27 +60% → £542.
   - P12: 2026-11-17 +50% → £358.
   - P13: 2026-10-22 +40% → £211 (PriceLabs' own price: £163).

   2-night gaps with a 2-night minimum: P12 2026-10-21→22 (£176 / £188), P13 2026-10-25→26 (£170 / £176), P05 2026-11-16→17 (£467 / £485), P05 2026-12-07→08 (£658 / £627, override +40%). The pack's `gaps` field is empty for all 19 properties, so its orphan detection missed these. **Check:** whether premium orphan pricing is intended. PriceLabs' orphan-day setting would normally discount these nights.
8. **Rate leak (`rate_leak_next_30`: booked 22–41% below the PriceLabs price on 10 properties) is not explained by PriceLabs length-of-stay settings.** Weekly and monthly discounts are off on P02 and P14 (checked including switched-off settings). No weekly or monthly discount appears in the effective customizations of any of the 14 listings. Minimum stay changes which stays can be booked, not the nightly rate. The confirmed stays in the next 30 days are long, though: P01 37 and 30 nights, P10 32, P09 9/10/12, P08 6/9, P02 4/7 (`reservations.csv`). Possible explanations: weekly or monthly discounts on Airbnb, Booking.com or Smoobu, or bookings made earlier at lower prices. I can't tell which from PriceLabs data. The channel auditor owns this.
9. **Info-pack max differs from PriceLabs max on all 13 comparable listings. Min and base match everywhere except P14.** Pack high → PriceLabs max: P01 £450→£650, P02 £350→£800, P03 £500→£1500, P04 £450→£2000, P05 £780→£2500, P06 £450→£800, P07 £350→£500, P08 £350→£1000, P09 £250→£550, P10 £250→£500, P11 £400→£1200, P12 £400→£2000, P13 £380→£2000. 0% of open nights are at the maximum on any listing, so the caps are not costing revenue. The pack's "high" figure is probably a typical peak rate rather than the PriceLabs cap, or the pack may just be out of date. **Check:** with Corentin, which number the pack is meant to hold.
10. **P05 St John's Wood 5-bed may be underpriced.** Base £455 vs PriceLabs' 5-bed P50 of £972 (−53%) and P75 of £1308 (34 listings). Forward occupancy for the next 30 days is 69% vs a market 32%, and booked ADR is +6.6% above the PriceLabs price (`kpi_pack.json`). PriceLabs recommends a base of £467. The 5-bed comparison set is small, and the property has no lift. **Check:** Base Price on 3166592.

### Base vs market (check 4)
`market.csv` does not exist in the snapshot, and the pack's `market_percentiles` are null. As a substitute I used PriceLabs `get_listing_neighborhood_market` → "Summary Table Base Price" (nearby Airbnb listings, bedroom-matched). Base vs P50 / P75:

| Ref | Base | P50 | P75 | vs P50 | vs P75 |
|---|---|---|---|---|---|
| P01 | 230 | 266 | 332 | −14% | −31% |
| P02 | 175 | 189 | 223 | −7% | −22% |
| P03 | 323 | 434 | 511 | −26% | −37% |
| P04 | 220 | 159 | 214 | +38% | +3% |
| P05 | 455 | 972 | 1308 | −53% | −65% |
| P06 | 340 | 404 | 511 | −16% | −33% |
| P07 | 226 | 116 | 145 | +95% | +56% |
| P08 | 250 | 215 | 262 | +16% | −5% |
| P09 | 160 | 134 | 165 | +19% | −3% |
| P10 | 160 | 125 | 149 | +28% | +7% |
| P11 | 260 | 291 | 341 | −11% | −24% |
| P12 | 270 | 205 | 242 | +32% | +12% |
| P13 | 235 | 225 | 283 | +4% | −17% |
| P14 | 525 | 192 | 233 | +173% | +125% |

### Floor / ceiling (check 3)
This covers 60 days only (`prices.csv`); 180 days was not available. Open nights at the minimum: P14 41/60 (68.3%). All other listings with open nights are at 0% at the minimum and 0% at the maximum: P01 0/18, P04 0/35, P05 0/20, P06 0/6, P08 0/47, P09 0/33, P10 0/29, P11 0/20, P12 0/28, P13 0/38. P02, P03 and P07 have 0 open nights.

### Customizations and overrides (check 7)
- **Fixed-price overrides:** none. Every date override on all 14 listings is a percentage, and no override sets a minimum price. P03, P07 and P14 have no date overrides.
- **P01, P02, P04, P05, P08, P09, P10, P11, P12, P13:** dense percentage overrides (mostly −1% to −15%) plus minimum stays through 2027-02-28.
- **Account-level customizations:** none on smoobu or channex.
- **Listing customizations:**
  - P01, P08, P09, P10: −18% last-minute within 15 days, +20% after 120 days, moderately aggressive demand factor.
  - P02, P04, P11, P12: last-minute −18% to −35%, +30% after 150 days, aggressive or default occupancy profile, default booking-recency factor.
  - P05: −25% last-minute (flat), +30% after 120 days.
  - P06: none.
  - P07: −25% last-minute, market-driven far-out premium.
  - P13: −40% last-minute within 14 days, +5% after 45 days, moderately conservative seasonality.
  - P14: −25% last-minute within 30 days only.
- **Minimum stay vs policy:** within the 60-day window, the open-night minimum stay is 2–3 everywhere except the 1-night orphan overrides (item 7) and P14's 4-night weekends (item 1). Beyond the window, the overrides set Jan 2027 minimum stays to 3 (P01, P04, P10, P12) and Feb 2027 to 4 (P04). The policy is 5 for 2+ months ahead and 7 for 4+ months ahead. The Christmas/New Year minimum stays (4–7) are mostly in line.

Data gaps:
1. `market.csv` is missing from the snapshot, and the pack's `market_percentiles` / `avg_open_price_next30` are null for most properties. Base vs market used the live PriceLabs neighbourhood endpoint instead.
2. `prices.csv` covers 60 days, so the 180-day floor/ceiling check could not be run.
3. Smoobu rates for P03 and P04 (Channex) are not in `prices.csv`, so the rates actually pushed for those two are UNKNOWN.
4. Prices for the second P13 Smoobu listing, 3090701, are not in the snapshot.
5. PriceLabs minimum-stay profile settings are not exposed by `get_customizations`, so the source of P14's 4-night weekends is UNKNOWN.
6. The snapshot capture time is not recorded. Push freshness was judged against D = 2026-10-18.
7. P15–P19 have no PriceLabs listing and no prices (`id_map.json`).
