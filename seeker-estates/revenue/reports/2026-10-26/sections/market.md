# Market & demand calendar — run D = 2026-10-26 (window 26 Oct 2026 – 23 Jan 2027)

## Sources and method
- **Policy:** I read `data/policy.json` first.
  - Excluded: P02, P03, P06 and P07 (intentional blocks). P14 numbers are reported only.
  - Handbacks: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - P13: when one twin is blocked because the other is booked, the night counts as a booking.
  - Not raised: P12 17 Nov +50% and P04 2 Dec (deprioritised), and the P11 darts override (Corentin, 24 Oct).
- **Market occupancy 30/60:** `data/snapshots/2026-10-26/pl_kpis.csv`, columns `market_occupancy_next_30` / `market_occupancy_next_60`.
- **P50/P75:** `data/snapshots/2026-10-25/market.csv` for every row except P12. That is the latest file; today's had no rows at 07:20Z.
  - P12 is from today's `get_neighbourhood_data` (detail). I **appended** it as the only row in `data/snapshots/2026-10-26/market.csv` and saved the verbatim payload to `raw/neighbourhood_P12.json`. No other agent's row was touched.
- **Our prices:**
  - 27 Oct – 25 Dec: `data/snapshots/2026-10-26/prices.csv`, column `pricelabs_price`.
  - 24 Dec – 27 Jan: live `get_listing_prices` field `price`, pulled today for P11, P20, P04 and P13. Saved in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m26/live26.py`.
  - `last_refreshed_at`: P11 26 Oct 05:50Z; P20 25 Oct 22:00Z; P04 25 Oct 21:26Z; P13 25 Oct 21:30Z; P12 25 Oct 11:50Z; P08 25 Oct 07:48Z.
- **Fortnight method:** unchanged from 25 Oct.
  - The comparison is the 7 nights before plus the 7 nights after the event block. Blocked nights and nights above 2× the median are excluded. Booked nights count at their list price.
  - Clean-week rule: 16–20 Dec uses 9–15 Dec; 3 Jan uses 4–10 Jan; 16 Jan uses 9–15 Jan; Bett uses 12–18 Jan.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m26/analyse26.py`. It is analyse25.py pointed at the 26 Oct snapshot and live26, with the same event list.
  - Output: `.../m26/out26.txt`. Comparator: `.../m25/out25.txt`.
- **Change attribution:**
  - `get_user_logs` (listing, 25–26 Oct): 16 entries.
  - `get_customizations` (last-minute / occupancy / booking recency) for P13, P12 and P20.
  - `get_listing_date_overrides` for P12, 15 Nov – 13 Dec.
- **Events:** re-verified 26 Oct 2026 by WebSearch restricted to venue or organiser domains. Direct fetches fail: whufc.com and excel.london give DNS errors, and theo2.co.uk was refused on 25 Oct. These are search-indexed primary pages.
  - Re-checked today:
    - O2: Stevie Wonder, Noah Kahan, Muse, Mariah Carey, Phoebe Bridgers, Kehlani.
    - ExCeL: WTM, Business Show, Vet Show, London Build.
    - Darts; Horse Show; Bett; England v Australia; Arsenal v Hull.
    - New: West Ham v Stoke.
  - Carried from 24–25 Oct without a re-check: J. Cole, The Script, Ally Pally concerts, England v Japan / NZ / Croatia, Finals Weekend, The Darkness / Kasabian / Culture Club, aespa, England Women v Ukraine, Big Game 18, NYE.

## 1. Submarket table (2026-10-26)

| Submarket | Ref | Area | BR | Mkt occ 30/60 (`pl_kpis`) | P50 / P75 £ (`market.csv`) | Our occ 30/60 | Avg open £ 27 Oct–25 Nov (nights) [25 Oct] |
|---|---|---|---|---|---|---|---|
| East | P01 | Canary Wharf (HB after 20 Dec) | 2 | 34 / 26% | 272 / 339 (25 Oct) | 100/100%* | none open |
| | P20 | Canary Wharf | 2 | 36 / 28% | 267 / 327 (25 Oct) | 17 / 8% | 258 (25) [260] |
| | P04 | Barking | 2 | 25 / 20% | 179 / 223 (25 Oct) | 33 / 40% | 164 (20) [167] |
| | P09 | Greenwich (HB after 26 Nov) | 1 | 36 / 31% | 142 / 173 (25 Oct) | 70/85%* | 151 (8) [150] |
| | P12 | Mile End (HB after 13 Dec) | 2 | 40 / 32% | **213 / 258 (26 Oct, 2 BR n=120)** | 70 / 52% | 258 (11) [210]** |
| Central | P08 | Islington (HB after 13 Nov) | 2 | 51 / 44% | 227 / 283 (25 Oct) | 60/80%* | 163 (12) [165] |
| | P11 | Camden | 2 | 44 / 38% | 306 / 361 (25 Oct) | 43 / 52% | 208 (18) [213] |
| | P05 | St John's Wood | 4 | 39 / 37% | 615 / 743 (25 Oct) | 73 / 62% | 448 (8) [471] |
| | P14 | Primrose Hill (report only) | 1 | 40 / 38% | 204 / 255 (25 Oct) | 0 / 0% | 500 (30) |
| West | P13 | Shepherd's Bush | 2 | 40 / 36% | 244 / 302 (25 Oct) | 40 / 33% | 182 (18) [186] |
| | P10 | Hanger Lane (HB after 18 Nov) | 1 | 30 / 24% | 132 / 160 (25 Oct) | 100/100%* | — |

Not in the table: P02, P03, P06 and P07 are intentional blocks; P15–P19 have no PriceLabs listing.
\* Inflated, because PriceLabs counts the handback blocks as occupied.
\*\* The mix of open nights changed. The cheap 27–29 Oct nights were booked, and the dearer 22–25 Nov nights reopened.

- **Market occupancy** moved by 1 point or less everywhere (`pl_kpis` 25 vs 26 Oct).
- **Percentiles:** every P50/P75 is an Airbnb-derived Nearby-Listings figure, not a comp set, with the horizon unstated.
- **Our occupancy:**
  - P12 next-30 rose 63 → 70%: the 26–30 Oct Booking.com stay was added, and the 22–25 Nov nights inside the 30-day window were lost.
  - Next-60 fell 57 → 52% because of the 22–29 Nov cancellation.
  - P11 and P13 fell 3–4 points; P20 fell 3 points.
- **P05** open average fell £23. This is not explained by the 25–26 Oct logs: NOT CHECKED.

## 2. Demand calendar, 26 Oct 2026 – 23 Jan 2027 (today's prices)

Venues use the VENUES map in `/home/user/seeker-social/seeker-estates/build/properties.py`.
- P20 is not in the map, so it is treated as Canary Wharf (O2 + ExCeL).
- P12 Mile End is not in the map either (see §2b).

B = booked, BLK = blocked, HB = after handback. "yes" means our price is above the fortnight. 25 Oct values are in brackets where they changed.

### East (O2 / ExCeL → P01, P04, P09, P20)
| Nights | Event | Source (checked 26 Oct unless noted) | Effect | Our £ vs fortnight £ |
|---|---|---|---|---|
| 2 Nov | J. Cole, O2 (25 Oct) | theo2.co.uk/events/detail/jcole-2026 | compression | P20 256 vs 247 yes (273); P04 163 vs 153 yes; P01, P09 B |
| 2–4 Nov | WTM, ExCeL 3–5 Nov | excel.london/whats-on | compression | P20 256/255/257 vs 248 yes (273–280); P04 163/166/166 vs 154 yes |
| 3, 5 Nov | Stevie Wonder, O2 (listing "3–5 Nov") | theo2.co.uk/events/venue/the-o2-arena | compression | P20 3 Nov 255 yes; **5 Nov 246 vs 250 (newly below; was 258)**; P04 166/156 vs 155 yes |
| 10–11 Nov | Business Show, ExCeL 11–12 Nov | excel.london/whats-on | compression | **P20 260/259 vs 255 yes (was below)**; P04 166/167 vs 162 yes |
| 13–14 Nov | Noah Kahan, O2 13, 14, 17 Nov | theo2.co.uk/events/detail/noah-kahan-2026 | compression | P20 270/282 vs 254 yes; P04 175 vs 163 yes / B |
| 15–16 Nov | Muse, O2 | theo2.co.uk | compression | **P20 243/251 vs 262** (236/246 vs 264); P01, P04, P09 B |
| 17 Nov | Noah Kahan, O2 | as above | compression | **P20 254 vs 264** (250 vs 266) |
| 18–19 Nov | London Vet Show, ExCeL 19–20 Nov | excel.london/whats-on | compression | **P20 18 Nov 266 vs 267**; 19 Nov 279 yes (was below); **P04 163/165 vs 173** |
| 21 Nov | The Script, O2 (24 Oct) | theo2.co.uk/events/detail/the-script-2026 | compression | P04 186 vs 178 yes; P20 BLK |
| 24–25 Nov | London Build Expo, ExCeL 25–26 Nov | excel.london/whats-on/london-build-expo | compression | **P20 263/287 vs 289** (300/313 vs 307); **P04 24 Nov 167 vs 186 (newly below; was 195)**, 25 Nov B |
| 30 Nov | Mariah Carey, O2 (Mon) | theo2.co.uk/events/detail/mariah-carey-2026 | compression (size unstated) | **P20 270 vs 314** (297 vs 342); P04 B |
| 1–2 Dec | Phoebe Bridgers, O2 | theo2.co.uk | compression | **P20 275/296 vs 318** (300/325 vs 346); P04 2 Dec 509 (gap night, was 635) |
| 8 Dec | Kehlani, O2 (Tue) | theo2.co.uk | compression (size unstated) | P20 330 vs 318 yes; **P04 202 vs 206** |
| 16–20 Dec | O2 run (24 Oct) + Horse Show, ExCeL 17–21 Dec | londonhorseshow.com; excel.london | compression | Clean week: **P20 16 Dec 274 vs 310**, 17–20 Dec yes; **P04 16 Dec 199 vs 201 (was level)**, 17–19 Dec yes |
| 31 Dec | NYE (24 Oct) | london.gov.uk | compression | P20 631 vs 354 yes; P04 B |
| 16 Jan | aespa, O2 (24 Oct) | theo2.co.uk | compression | Clean week: P20 269 vs 260 yes; P04 188 vs 179 yes |
| 19–20 Jan | Bett, ExCeL 20–22 Jan | uk.bettshow.com | compression | Clean week: P20 269/275 vs 260 yes; **P04 19 Jan 181 vs 182**, 20 Jan 184 yes |

### Central (Ally Pally → P08, P11; Emirates → P08)
| Nights | Event | Source | Effect | Our £ vs fortnight £ |
|---|---|---|---|---|
| 6–7 Nov | Arsenal v Hull, Sat 7 Nov 15:00 | arsenal.com ticket-information-arsenal-v-hull-city | compression | **P08 188/185 vs 189** (188/187 vs 195) |
| 20–21 Nov | Enter Shikari, Ally Pally (24 Oct) | alexandrapalace.com | compression | P11 264/263 vs 232 yes |
| 26–28 Nov | Nia Archives / Blossoms / Gorgon City (24 Oct) | alexandrapalace.com | compression | P11 278/326 vs 254 yes; 28 Nov B |
| 13–17 Dec | World Darts, 11 Dec – 3 Jan (180,000 tickets) | alexandrapalace.com/whats-on/world-darts-championship-2026-2027/; pdc.tv/wcfaq | compression | **P11 263/245/247/258/274 vs 299 (all below)** |
| 23 Dec | Darts last pre-Christmas session | pdc.tv/wcfaq | compression | P11 328 vs 326 yes |
| 3 Jan | Darts final, Sun 3 Jan 20:00 GMT | pdc.tv/wcfaq | compression | **P11 201 vs 205 (clean week)**. Strict comparison: 294 |

### West (Twickenham / Wembley → P13)
| Nights | Event | Source | Effect | Our £ vs fortnight £ |
|---|---|---|---|---|
| 7–8 Nov | England v Australia, Sun 8 Nov | allianzstadiumtwickenham.com/england-v-australia-nations-championship-pool-match | compression | 7 Nov twin-booked; **8 Nov 162 vs 164 (newly below; was 186 vs 172)** |
| 12 Nov | England v Croatia, Wembley (24 Oct) | englandfootball.com | compression | 185 vs 176 yes |
| 13–14 Nov | England v Japan | englandrugby.com | compression | twin-booked |
| 20–21 Nov | England v New Zealand (25 Oct) | allianzstadiumtwickenham.com | compression | 227/228 vs 207 yes |
| 26–29 Nov | Finals Weekend 27–29 Nov (25 Oct) | allianzstadiumtwickenham.com/nations-championship-finals-weekend | compression | 233/249 vs 220 yes (244/262); 28–29 Nov B |
| 28 Dec / 31 Dec | Big Game 18 / NYE (24 Oct) | allianzstadiumtwickenham.com; london.gov.uk | compression | 399 vs 249; 407 vs 235 yes |

### 2b. P12 Mile End — reopened 22–29 Nov (7 nights, Booking.com cancellation)
Expected effect: **normal**, with the 27–28 Nov weekend slightly firmer. There is no compression to price for, and the flat already sits well above the market median.

| Night | Our £ (`prices.csv`) | PL demand_desc | Mkt median £ | Mkt P75 £ | Mkt occ % | STLY occ % | 7-day pickup (STLY) | Override |
|---|---|---|---|---|---|---|---|---|
| Sun 22 | 264 | Normal | 224 | 281 | 27.9 | 37.1 | 3.6 (1.2) | −2% |
| Mon 23 | 263 | Normal | 219 | 280 | 25.4 | 32.9 | 3.6 (0) | −2% |
| Tue 24 | 247 | Low | 220 | 280 | 25.5 | 34.8 | 2.7 (1.2) | −2% |
| Wed 25 | 250 | Normal | 221 | 282 | 29.4 | 38.6 | 2.7 (1.1) | −2% |
| Thu 26 | 263 | Normal | 233 | 282 | 33.3 | 33.5 | 3.7 (3.1) | −2% |
| Fri 27 | 295 | Good | 246 | 289 | 35.9 | 39.3 | 3.9 (1.6) | −2% |
| Sat 28 | 304 | Good | 236 | 285 | 36.9 | 44.1 | 3.9 (1.7) | −2% |

Sources:
- Market columns: `get_neighbourhood_data` detail, 2699998, pulled 26 Oct (`raw/neighbourhood_P12.json`, `future_prices` and `occupancy.daily`, 2–3 BR band, 137 listings).
- Our price and demand_desc: `raw/prices_2699998.json`.
- Overrides: `get_listing_date_overrides`, set 17 Oct.

- **Market demand vs the surrounding fortnight:**
  - 22–28 Nov averages 30.6% occupancy against 30.2% for 15–21 Nov plus 29 Nov – 5 Dec. Market median is £228 vs £234.
  - It is 6.6 points behind STLY (37.2%), but 7-day pickup is running ahead of STLY on every night.
  - PriceLabs' event list for this listing has nothing in the window; its nearest event is 6–7 Nov "Remembrance Sunday".
- **Our position:**
  - Average £269 against a market median of £228 (+18%).
  - 27 and 28 Nov (295 and 304) are above the market P75 (289 and 285).
  - Our fortnight average is £273.
- **Pickup last year (STLY):** P12 was booked on all the equivalent nights last year. Those bookings were made 4–5 Oct '25 (20–22 and 26–28 Nov) and 31 Oct '25 (23–25 Nov), so the midweek nights were picked up 3–4 weeks out (`past_bookings_stly`). Lead time today is 27 days, so a re-sell is still within last year's window.
- **Nearby events:** none are mapped to P12 in VENUES.
  - West Ham v Stoke City, Sat 28 Nov 15:00, London Stadium. Source: whufc.com/en/tickets/home-matches/stoke-city-h (Championship; capacity not stated). Search-indexed 26 Oct; the direct fetch failed.
  - London Build Expo, ExCeL 25–26 Nov.
  - Neither is evidence of compression for Mile End.
- **Pricing levers now in force (`get_customizations`):**
  - Last-minute: "No Discount" (it was 25% per policy `booking_discount_stack_25oct`).
  - Occupancy: Custom profile; 16–30 days at 40–50% occupancy is −5% to 0%.
  - Booking recency: default (gradual −5% to −15% with no bookings in 15–45 days). It is inactive while bookings keep arriving; the last were 24 and 25 Oct.
- **Revenue at stake:**
  - The cancelled stay paid £1,314.40 for 7 nights, £187.77 a night (Dispatcher facts).
  - The PriceLabs list for the same nights now sums to £1,886.
  - A Booking.com re-sale would arrive through the promotion stack: about 0.556× the Booking.com list and 0.64× PriceLabs on the 25 Oct booking, per policy. That is roughly £1,200 for the same 7 nights before the weekly-rate effect.
  - This is arithmetic on the policy ratio, not a forecast.
- **Handback:** P12 handback is 13 Dec, so these nights are live inventory.

## 3. Missed compression — open event nights at or below the fortnight

| Ref | Night(s) | Event | Our £ | Fortnight £ | Gap £ |
|---|---|---|---|---|---|
| P20 | 5 Nov | Stevie Wonder (**new**) | 246 | 250 | 4 |
| P20 | 15, 16 Nov | Muse | 243, 251 | 262 | 19, 11 |
| P20 | 17 Nov | Noah Kahan | 254 | 264 | 10 |
| P20 | 18 Nov | Vet Show | 266 | 267 | 1 |
| P20 | 24, 25 Nov | London Build (25 Nov **new**) | 263, 287 | 289 | 26, 2 |
| P20 | 30 Nov | Mariah Carey | 270 | 314 | 44 |
| P20 | 1, 2 Dec | Phoebe Bridgers | 275, 296 | 318 | 43, 22 |
| P20 | 16 Dec | Darkness / Horse Show eve | 274 | 310 (clean week) | 36 |
| | | | | **P20 subtotal** | **11 nights / £218** (25 Oct: 12 / £238) |
| P04 | 18, 19 Nov | Vet Show | 163, 165 | 173 | 10, 8 |
| P04 | 24 Nov | London Build (**new**) | 167 | 186 | 19 |
| P04 | 8 Dec | Kehlani | 202 | 206 | 4 |
| P04 | 16 Dec | Darkness / Horse Show eve (**new**, from watch-list) | 199 | 201 | 2 |
| P04 | 19 Jan | Bett eve | 181 | 182 | 1 |
| | | | | **P04 subtotal** | **6 nights / £44** (25 Oct: 4 / £28) |
| P11 | 13–17 Dec | Darts round one | 263, 245, 247, 258, 274 | 299 | 36, 54, 52, 41, 25 = **£208** (25 Oct: £213) |
| P11 | 3 Jan | Darts final | 201 | 205 (clean week) | 4 |
| P08 | 6, 7 Nov | Arsenal v Hull | 188, 185 | 189 | 1, 4 = **£5** (25 Oct: £15) |
| P13 | 8 Nov | England v Australia (**new**) | 162 | 164 | 2 |

**Headline: 26 open nights, £481 below the fortnight** (25 Oct: 24 nights / £498). The event list is the same as 25 Oct, so this is like-for-like.
- **New (5 nights / £29):** P20 5 Nov (£4), P20 25 Nov (£2), P04 24 Nov (£19), P04 16 Dec (£2), P13 8 Nov (£2).
- **Dropped off (3 nights):**
  - P20 10–11 Nov Business Show: now 260/259 vs 255.
  - P20 19 Nov Vet Show: 279 vs 267.
- **Biggest gaps unchanged:** P11 darts round one (£208) and P20 30 Nov – 2 Dec (£109, was £112). These two blocks are 66% of the total.
- **Watch-list (within £2):** P20 18 Nov (£1), P04 19 Jan (£1), P08 6 Nov (£1), P13 8 Nov (£2), P04 16 Dec (£2).
- **Strict fortnight** (no clean-week rule): it still flags:
  - P20 16–20 Dec (vs 356) and P04 16–18 Dec (vs 227).
  - P11 3 Jan (vs 294) and P20 19 Jan (vs 270).
  - These are mostly comparisons against Christmas and NYE nights.

## 4. What changed since 25 Oct
1. **P20 overrides re-set by reyhan@ on 25 Oct, 21:58–21:59Z** (`get_user_logs`):
   - 31 Oct – 19 Nov is now **−2%, min 3**. It was −5% from the 24 Oct log.
   - Also new: 1–31 Jan −2% (min 3), 1–28 Feb −2% (min 4), and 26–27 Oct min-stay 2 with no price change.
   - Effect: P20 nights from 10 to 19 Nov rose £3–7. The Business Show and 19 Nov left the missed list, and the Muse / Kahan gap fell from £62 to £40.
   - This partly applies the cut-negative-overrides direction. The −2% is still negative.
2. **P20 30 Nov – 24 Dec fell £20–30 a night** (e.g. 30 Nov 297 → 270, 1 Dec 300 → 275, 16 Dec 294 → 274). No 25–26 Oct log covers these dates.
   - This matches the base change 380 → 350 (policy, 24 Oct; ratio 0.92) being in today's prices: the refresh was 25 Oct 22:00Z, and the 24 Oct 12:43Z refresh behind yesterday's prices predates it.
   - The fortnights fell by the same proportion, so the Dec gaps barely moved (£45 → £44, £67 → £65). This is inference; the timing of the base change is still not in the logs.
3. **P20 24 Nov 300 → 263 and 25 Nov 313 → 287** (−12% and −8%, more than the base change).
   - Likely cause: these nights crossed into the 16–30-day band of P20's **Aggressive** occupancy profile. That band is −20% at 10–20% occupancy, against −15% / −10% in the 31–60-day band; P20 next-30 occupancy is 17% (`get_customizations`; `pl_kpis`).
   - The same mechanism will hit 30 Nov – 2 Dec within the next 4–6 days. Inference; not confirmed per date.
4. **P13 8 Nov 186 → 162, 9 Nov 183 → 160, 24 Nov 220 → 186.**
   - No P13 price log covers these dates. Reyhan's 25 Oct entries were 26 Oct +35%, 31 Oct +10%, 31 Oct – 3 Nov min 2, and 7–20 Dec min 2.
   - `get_customizations` P13: last-minute **−5% gradual within 14 days ON**; occupancy **Aggressive ON** (0–15 days at 40% occupancy = −20%); booking recency off.
   - 8 Nov is now 13 days out, so both discounts apply. **The 25 Oct "a-discount-cut" (custom 0% last-minute / occupancy / recency) is NOT applied on P13.**
   - On P20 and P12, last-minute is already "No Discount". Occupancy (P20 Aggressive, P12 Custom) and booking recency (default) are still on.
5. **P04 24 Nov 195 → 167:** no log, and P04 customizations were NOT CHECKED. The −8% override (1–24 Nov, 24 Oct log) predates both refreshes.
   - P04 2 Dec gap night 635 → 509: the deprioritised override itself is not re-raised; only the price change is reported.
6. **P11:** darts nights moved £1–2 and the fortnight fell £2 (gap £213 → £208).
   - Nights 27 Oct – 9 Nov fell 6–9% (e.g. 29 Oct 195 → 176). This is consistent with the next-14-day window, but P11 customizations were NOT CHECKED.
7. **P08 Arsenal:** the fortnight fell 195 → 189 because booked 9 Nov is now listed at 155 (was 217). Gap £15 → £5.
8. **P12:**
   - 22–28 Nov reopened at 264 / 263 / 247 / 250 / 263 / 295 / 304 (§2b).
   - 10–21 Nov fell about 5%; 29 Nov – 13 Dec rose about 5%.
   - No 25–26 Oct log. The overrides are unchanged since 17 / 22 Oct; the last-minute change is the only setting change seen.
9. **Event re-verification:** every event on the missed list was re-confirmed today, except the O2 16 Dec acts. That night's gap is anchored by the Horse Show (17–21 Dec, londonhorseshow.com).
   - New find for P12: West Ham v Stoke, 28 Nov.
   - Stevie Wonder is listed "3–5 Nov"; the script keeps 3 and 5 Nov.

Data gaps:
1. **market.csv:** today's file had no rows. Every P50/P75 except P12 is the 25 Oct row.
   - All are Airbnb-derived Nearby-Listings percentiles (not comps, horizon unstated).
   - P11 sells on Booking.com only, and P12's re-sale is a Booking.com cancellation, so Airbnb percentiles are a weak benchmark for both.
   - Daily market occupancy is checked only for P12 today.
2. **Unmapped flats:** P12 and P20 are not in the VENUES map, and P15–P19 have no PriceLabs listing. P12's nearby events (London Stadium, ExCeL) are noted but not mapped.
3. **Events:** checked only through domain-restricted search summaries.
   - whufc.com and excel.london give DNS errors on direct fetch, and theo2.co.uk was refused 25 Oct.
   - Several events are carried from 24–25 Oct (see Sources).
   - Attendance is stated only for darts (180,000 tickets). Mariah Carey, Kehlani and West Ham v Stoke have no capacity stated.
4. **Price freshness:** P12 was refreshed 25 Oct 11:50Z and P08 25 Oct 07:48Z. Overnight changes on those listings are not reflected. The 26 Oct night is not in the snapshot (it starts 27 Oct).
5. **Not checked:**
   - Customizations for P11, P04, P05 and P08, so the drops in P11's next 14 days, P04 24 Nov and P05's open average are unattributed.
   - The timing of the P20 base change (not in 24–26 Oct logs).
6. **P12 inference:** the Booking.com re-sale value uses the policy's 25 Oct stack ratio. The actual promotions on 22–29 Nov (Weekly rate, Last Minute 10% vs 15%, Genius level) were NOT CHECKED in the extranet.
