# Competitor positioning: EAST batch (D = 2026-10-18)

**Source for every market figure below:** PriceLabs neighbourhood data, pulled 2026-10-18 through the read-only `get_neighbourhood_data` call (include_competitors=true, include_prices=true). Comp-set source check (`get_neighborhood_data_sources`, P01): Nearby Listings is the only source available. Market Dashboards: "No Market Dashboard reports available". Competitor Listings (CCC): "not enabled for this account".

**No individual comps.** PriceLabs returned no comp rows (no nearby_listings or competitor_analytics, and additional_details was empty) for any of the five listings. A retry on P01 that requested those fields explicitly also came back empty. Live OTA checks (Airbnb, Booking, Vrbo): **NOT CHECKED**, because those sites are blocked from this environment. This means no comp table, comp median, comp rating, review-count gap or comp ids can be produced. `comps.csv` was created with its header and **0 rows**, so nothing was invented. Everything below is labelled as **PriceLabs Nearby Listings percentiles**, not a comp set.

There are two PriceLabs benchmarks, and they are not the same thing:
- **Bedroom-matched table** (`summary_table`): P25/P50/P75/P90 per bedroom count. The forward horizon is not stated in the payload. It is used here for the percentile position.
- **Daily series** (`future_prices`): P25/P50/P75/P90 per stay date, plus the median booked price ("booked P50"). This series is **blended across bedroom bands**, as stated in PriceLabs' own insight text (P01: 1-3 BR; P04: Studio-10 BR; P07/P09: Studio-2 BR; P12: 2-3 BR). For 2-beds it understates the like-for-like market.

Stay dates: Fri 23 and Sat 24 Oct (Fri-Sun stay), Tue 27 and Wed 28 Oct (Tue-Thu stay), Tue 17 Nov (about 30 days out). "Our price" is the PriceLabs recommended price (`prices.csv`, equal to Smoobu). It is excluding taxes, and PriceLabs does not say whether cleaning is included. The positioning call uses `rm/positioning.py`. Our ratings are blank in `listings.csv` and no comp ratings exist, so `quality_premium(None, None) = 0.0` for every property. Occupancy figures come from `kpi_pack.json` (forward_occ_30 vs market_occ_30).

---

## P01 Canary Wharf 2-bed (3320302 smoobu): sleeps 5, 21st floor, river and City view, balcony, lift
Bedroom-matched 2 BR (n=147): P25 220 / P50 266 / P75 332 / P90 419.

| Night | Our price | Status | Daily P25 | P50 | P75 | P90 | Booked P50 |
|---|---|---|---|---|---|---|---|
| Fri 23 Oct | 198 | Booked (ADR 162.31) | 198 | 237 | 319 | 421 | 217 |
| Sat 24 Oct | 219 | Booked (ADR 162.31) | 196 | 233 | 308 | 390 | 215 |
| Tue 27 Oct | 202 | Booked (ADR 162.31) | 185 | 226 | 299 | 367 | 205 |
| Wed 28 Oct | 206 | Booked (ADR 162.31) | 184 | 229 | 291 | 374 | 202 |
| Tue 17 Nov | 198 | Booked (ADR 152.13) | 178 | 219 | 296 | 384 | 166 |

- Average PriceLabs price over the next 30 nights is 212.8, which is **below the 2 BR P25** (-20% vs 2 BR P50 266). Realised booked ADR over the next 30 nights is 156.49 (kpi_pack rate_leak), which is -41% vs the 2 BR P50.
- Comp median: none. Our rating vs comp median: unknown. Review gap: unknown.
- Occupancy: fwd30 100% vs market 34%; fwd60 71% vs market 26%.
- `recommend` with the PriceLabs percentile (0.25, an upper bound) gives **raise +10%**: booked +66% vs market while priced at or below P25 of 2-beds, with view, balcony and lift on top. With no comp percentile it gives raise-signal. There are no open nights in the next 30, so this applies to new dates and base price (230), not to current inventory.

## P04 Barking 2-bed (channex 7dc96cda...): sleeps 6, 5th floor, lift, balcony, Canary Wharf view
Bedroom-matched 2 BR (n=60): P25 127 / P50 159 / P75 214 / P90 301.

| Night | Our price | Status | Daily P25 | P50 | P75 | P90 | Booked P50 |
|---|---|---|---|---|---|---|---|
| Fri 23 Oct | 160 | Booked (ADR 120.18) | 145 | 177 | 230 | 304 | 161 |
| Sat 24 Oct | 172 | Booked (ADR 120.18) | 144 | 178 | 232 | 304 | 154 |
| Tue 27 Oct | 150 | Booked (ADR 120.65) | 133 | 165 | 198 | 285 | 138 |
| Wed 28 Oct | 157 | Booked (ADR 120.65) | 136 | 168 | 199 | 288 | 138 |
| Tue 17 Nov | 152 | Open | 135 | 165 | 208 | 285 | 140 |

- Average price over the next 30 nights is 167.3, about P54 of 2 BR (+5% vs P50 159). The average over the 14 open nights is 177.8. Booked ADR over the next 30 nights is 126.29, about P25.
- Occupancy: fwd30 48% vs market 28%.
- `recommend` gives **raise +10%**: booked +20% vs market at about P54, plus lift, balcony and view.
- Caveat: the daily series is blended across Studio-10 BR. Another PriceLabs listing for the same flat (3254047 smoobu, sync off, 100% blocked) and a Vrbo unit also exist.

## P07 Woolwich 1-bed (3288427 smoobu): sleeps 4, ground floor, terrace, riverside
Bedroom-matched 1 BR (n=88): P25 98 / P50 116 / P75 145 / P90 186.

| Night | Our price | Status | Daily P25 | P50 | P75 | P90 | Booked P50 |
|---|---|---|---|---|---|---|---|
| Fri 23 Oct | 235 | Blocked | 133 | 155 | 210 | 293 | 138 |
| Sat 24 Oct | 252 | Blocked | 130 | 156 | 214 | 286 | 139 |
| Tue 27 Oct | 209 | Blocked | 121 | 148 | 195 | 259 | 141 |
| Wed 28 Oct | 224 | Blocked | 121 | 145 | 199 | 260 | 147 |
| Tue 17 Nov | 235 | Blocked | 121 | 146 | 174 | 255 | 118 |

- The calendar is 100% blocked for the next 30 nights (kpi_pack blocked_next_30 = 1.0; PriceLabs fully_blocked_next_360 = True). Average price is 234.3, **above the 1 BR P90 of 186** (+102% vs P50 116). The PriceLabs min is 165, which is itself above the 1 BR P75.
- `recommend` would mechanically return "lower -7%", but that result is **not valid**: 0% occupancy comes from the block, not from demand. Recommendation: none until the block is lifted. Before it reopens, the min of 165 and base of 226 need review against the 1 BR market (P50 116, P90 186).

## P09 Greenwich 1-bed (3318172 smoobu): sleeps 4, 1st floor, lift, balcony
Bedroom-matched 1 BR (n=126): P25 110 / P50 134 / P75 165 / P90 206.

| Night | Our price | Status | Daily P25 | P50 | P75 | P90 | Booked P50 |
|---|---|---|---|---|---|---|---|
| Fri 23 Oct | 151 | Booked (check-in) | 124 | 149 | 177 | 231 | 130 |
| Sat 24 Oct | 171 | Booked (ADR 139.22) | 124 | 145 | 175 | 235 | 131 |
| Tue 27 Oct | 153 | Open | 116 | 140 | 173 | 221 | 141 |
| Wed 28 Oct | 152 | Open | 117 | 138 | 176 | 220 | 139 |
| Tue 17 Nov | 132 | Booked (ADR 102.71) | 116 | 138 | 171 | 216 | 129 |

- Average price over the next 30 nights is 150.0, about P63 of 1 BR (+12% vs P50 134). Booked ADR over the next 30 nights is 101.92, which is below P25.
- Occupancy: fwd30 59% vs market 38%.
- `recommend` gives **raise +10%**: booked +21% vs market at about P63. The daily blend includes studios and 2-beds, so the true 1 BR position may sit higher than P63.

## P12 Mile End 2-bed (2699998 smoobu): sleeps 6, 4th floor, lift, balcony, Canary Wharf view
Bedroom-matched 2 BR (n=119): P25 174 / P50 205 / P75 242 / P90 293.

| Night | Our price | Status | Daily P25 | P50 | P75 | P90 | Booked P50 |
|---|---|---|---|---|---|---|---|
| Fri 23 Oct | 179 | Booked (check-in) | 176 | 208 | 253 | 337 | 188 |
| Sat 24 Oct | 189 | Booked (ADR 199.41) | 174 | 203 | 252 | 337 | 182 |
| Tue 27 Oct | 199 | Open | 162 | 191 | 236 | 313 | 179 |
| Wed 28 Oct | 219 | Open | 167 | 189 | 237 | 321 | 178 |
| Tue 17 Nov | 358 | Open | 161 | 189 | 250 | 321 | 170 |

- Average price over the next 30 nights is 220.3, about P60 of 2 BR (+7.5% vs P50 205). The 17 Nov price of 358 is **above the daily P90 of 321**, which looks like an isolated spike (min-stay 1). Booked ADR over the next 30 nights is 172.57.
- Occupancy: fwd30 59% vs market 41%.
- `recommend` gives **raise +10%**: booked +18% vs market at about P60. The exception is 17 Nov, which is already above P90: hold it, and check whether it is an event or orphan-night rule.

## P15 Bow / Devons Road 1-bed
**NOT IN SYSTEMS** (not in PriceLabs or Smoobu). No analysis.

---

Data gaps:
1. No individual comps for P01, P04, P07, P09 or P12. PriceLabs CCC is not enabled, there are no Market Dashboards, and Nearby Listings returned percentiles only. `comps.csv` has 0 rows, and there are no comp ids to track day to day.
2. Live OTA checks (Airbnb, Booking, Vrbo) were NOT CHECKED because they are blocked from this environment. As a result there are no comp ratings, review counts, Superhost status, cancellation policies or cleaning-fee treatment.
3. Our own ratings and review counts are blank in `listings.csv`, so quality_premium is 0.0 by default for every property, not by evidence.
4. The daily PriceLabs percentiles are blended across bedroom bands (P04 spans Studio-10 BR). The bedroom-matched table has no stated horizon or stay dates.
5. Booked ADR runs 22-31% below the PriceLabs price on every listing (kpi_pack rate_leak). The fee and commission basis has not been confirmed.
6. P07 has no demand signal because it is 100% blocked. P15 is not in any system. `market.csv` is not present in the snapshot.
