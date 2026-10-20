# Market & demand calendar — run D = 2026-10-20 (window 20 Oct 2026 – 18 Jan 2027)

## Sources and method
- **Market occupancy.** `reports/2026-10-20/kpi_pack.json` → `market_occ_30` / `market_occ_60`. These come from PriceLabs `pl_kpis.csv` (snapshot 2026-10-20), columns `market_occupancy_next_30` / `market_occupancy_next_60`. **No `market.csv` exists for 2026-10-20.** `kpi_pack.missing.market = "empty"` and every `market_percentiles` value is null.
- **Market P50/P75.** Pulled today (2026-10-20) with PriceLabs `get_neighbourhood_data`, fields `summary_table.table_data[].50_percentile_price` / `75_percentile_price`, matched to our bedroom count. These are Nearby-Listings percentiles, not comps, and the date window they cover is not stated. The blocked units P06 and P07 reuse `data/snapshots/2026-10-19/market.csv`.
- **Our prices.** `data/snapshots/2026-10-20/prices.csv`, column `pricelabs_price`, covering 21 Oct – 19 Dec. Yesterday's prices come from `data/snapshots/2026-10-19/prices.csv`, same column. To see past 19 Dec I pulled PriceLabs `get_listing_prices` (field `price`) for P01, P08, P11 and P20, 5/12 Dec 2026 – 18 Jan 2027, on 2026-10-20.
- **Changes and overrides.** PriceLabs `get_user_logs` (listing, group and account, 19–20 Oct) and `get_listing_date_overrides` for P01, P04, P08, P09, P10, P11, P13 and P20, read 2026-10-20.
- **Events.** Every event was re-verified today (2026-10-20). Yesterday's file had carried them over without re-checking. Direct fetches of theo2.co.uk, excel.london, pdc.tv, londonhorseshow.com, englandrugby.com and wembleystadium.com still fail (`getaddrinfo ENOTFOUND`; curl gets proxy 403). So "VERIFIED" here means the date appears on the **primary domain's own page**, read through WebSearch restricted to that domain (`allowed_domains`) on 2026-10-20. I did not load the pages myself.
- **Fortnight.** The 7 nights before plus the 7 nights after, with the event's own nights left out. Nights priced above 2× the window median are also left out (P04's one-night gaps: 1 Nov at £462 and 2 Dec at £551, both min-stay 1). For darts and the Horse Show, whose later nights fall outside the data, the fortnight is the 7 nights before. **Same-weekday** is the average of the same weekday 1 and 2 weeks earlier.
- **Demand nights.** For a concert or match it is the night of the event. For a multi-day show it is the night before each show day (e.g. Business Show 11–12 Nov → nights 10–11 Nov).
- **Policy.** P02, P03, P06 and P07 are intentional blocks and are left out of every gap. P14 numbers are reported only. Nights on P13 that are blocked may be linked-listing bookings, so they are not counted as open.

## 1. Submarket table

| Submarket | Ref | Area | Type | Mkt occ 30d / 60d | P50 £ / P75 £ (n) | Our occ 30/60 | Avg open £ next 30 |
|---|---|---|---|---|---|---|---|
| **East / Canary Wharf / ExCeL** | P01 | Canary Wharf | 2-bed | 33% / 25% | 269 / 335 (146) | 100% / 70% | — (full) |
| | P20 | Canary Wharf (Waterford Ct) | 2-bed | 34% / 27% | 260 / 321 (151) | **14% / 7%** | 274 |
| | P04 | Barking | 2-bed | 27% / 21% | 161 / 218 (60) | 48% / 41% | 173 |
| | P09 | Greenwich | 1-bed | 38% / 30% | 137 / 168 (127) | 59% / 42% | 162 |
| | P12 | Mile End | 2-bed | 40% / 33% | 207 / 248 (118) | 55% / 44% | 237 |
| | P07 | Woolwich | 1-bed | 26% / 20% | 116 / 144 (19 Oct) | intentional block | — |
| | P15 | Bow / Devons Rd | — | n/a | n/a | no PriceLabs listing | — |
| **Central** | P08 | Islington | 2-bed | 49% / 43% | 221 / 261 (145) | 38% / 19% | 201 |
| | P11 | Camden | 2-bed | 46% / 39% | 298 / 350 (171) | 62% / 68% | 230 |
| | P05 | St John's Wood | 4-bed (policy) | 33% / 33% | 590 / 713 (90, 4BR) | 66% / 63% | 439 |
| | P14 | Primrose Hill (special setup, report only) | 1-bed | 41% / 38% | 196 / 239 (173) | 0% / 0% | 500 |
| | P06 / P03 | Marylebone / Bayswater | 2-bed / 3-bed | 43/40% · 48/43% | P06 404 / 508 (19 Oct) | intentional blocks | — |
| | P16 / P17 | Little Venice / SJW 1-bed | — | n/a | n/a | no PriceLabs listing | — |
| **West** | P13 | Shepherd's Bush | 2-bed | 41% / 35% | 228 / 298 (116) | 52% / 39% | 186 |
| | P10 | Hanger Lane | 1-bed | 31% / 24% | 129 / 155 (120) | 100% / 49% | — (full) |
| | P02 | Ladbroke Grove | 1-bed | 46% / 39% | — | intentional block | — |
| | P18 / P19 | Fulham / Kings Langley | — | n/a | n/a | no PriceLabs listing | — |

PriceLabs neighbourhood signals inside the window (`fp_insights` / `occ_insights`, pulled 2026-10-20). All of them show the Christmas–New Year surge:
- **East:** Canary Wharf prices +24.4% on 27 Dec – 1 Jan and occupancy +11.4% (P01). P20: prices +22.8% on 27–31 Dec, occupancy +11.0% on 28 Dec – 1 Jan. Greenwich: prices +29.9% on 27–31 Dec. Mile End: prices +18.9% on 26–31 Dec, occupancy +15.9%, plus **occupancy +8.1% on 6 Dec**. Barking: prices +7.8% on 25–31 Dec, plus **occupancy +8.1% on 3–5 Dec**.
- **Central:** Camden prices +32.1% on 26–31 Dec, plus **occupancy +12.1% on 5–7 Dec**. Islington prices +20.2%. St John's Wood prices +24.4%. Primrose Hill prices +22.3%, plus **occupancy +11.0% on 3 Dec**.
- **West:** Shepherd's Bush prices +29.5%, plus **occupancy +9.9% on 1–6 Dec and +8.4% on 27 Oct**. Hanger Lane prices +11.8% on 26–30 Dec.
- None of the feeds shows an ExCeL, O2, darts or Twickenham spike.

## 2. Demand calendar, 20 Oct 2026 – 18 Jan 2027 (all checked 2026-10-20)

"Priced?" compares our price on each open night with its fortnight: **our £ / fortnight £**. B = booked.

### East / Canary Wharf / ExCeL
Properties affected, from the VENUES map: O2 → P01, P09, P04 (P07 blocked); ExCeL → P01, P04 (P07 blocked; P15 has no PriceLabs listing). P20 is not in the VENUES map. It is mapped like P01 (Canary Wharf).

| Nights | Event | Source (primary) | Effect | Priced? |
|---|---|---|---|---|
| 2–4 Nov | WTM London, ExCeL 3–5 Nov | wtm.com/london/en-gb.html | compression | P20 316/327/286 vs 274: **yes**. P01 and P04 B |
| 3, 5 Nov | Stevie Wonder, O2 (event page says 3 & 5 Nov; another O2 listing shows 4 Nov) | theo2.co.uk/events/detail/stevie-wonder | compression | P20 3 Nov 327 vs 278 yes; **5 Nov 272 vs 278 no**. P01 and P09 B |
| 10–11 Nov | The Business Show + Retail Supply Chain / Smart Retail / Event Tech Live, ExCeL 11–12 Nov | excel.london/whats-on/the-business-show-london-2026; greatbritishbusinessshow.co.uk | compression | **No**: P20 250/260 vs 268; P04 140/146 vs 153. P01 B |
| 13, 14, 17 Nov | Noah Kahan, O2 | theo2.co.uk/events/detail/noah-kahan-2026 | compression | P20 276/292/245 vs 283 (14th yes; 13th and 17th no). P04 159/158/142 vs 157 (17th no). P09 169/170 vs 159 yes (17th B) |
| 15–16 Nov | Muse, O2 (**now VERIFIED**; yesterday UNVERIFIED) | theo2.co.uk/events/detail/muse-2026 | compression | **No**: P20 238/241 vs 280; P04 149/139 vs 156. P01 and P09 B |
| 18–19 Nov | London Vet Show, ExCeL 19–20 Nov | excel.london/whats-on/london-vet-show-2026 | compression | P20 259/293 vs 290 (18th no). **P04 142/144 vs 162 no**. P01 B |
| 24–25 Nov | London Build Expo + elementalLONDON, ExCeL 25–26 Nov. Organiser gives "over 25,000" and "45,000+" visitors on different pages | londonbuildexpo.com/plan-your-visit; excel.london/whats-on/london-build-expo | compression | Flat: P20 315/321 vs 318; P04 172 vs 170 (25th B) |
| 1–2 Dec | Phoebe Bridgers, O2, **2 nights** (yesterday only 1 Dec was listed) | theo2.co.uk/events/detail/phoebe-bridgers | compression | **No**: P01 254/269 vs 289; P20 312/328 vs 351; P09 188/186 vs 199. P04 1 Dec B; 2 Dec is the £551 one-night gap |
| 16–20 Dec | London International Horse Show, ExCeL 17–21 Dec | londonhorseshow.com; excel.london/whats-on/london-international-horse-show | compression | P01 16 Dec 255 vs 275 **no**; 17 Dec 292 yes; 18–20 Dec B. P20 288/327 vs 330 **no**; 18–20 Dec 345/404/375 yes. P04 191/188/199/216 vs 189 (17th −1) |
| 17 Dec | Greg Davies "Full Fat Legend", O2 (**now VERIFIED**: gregdavies.co.uk lists "Last Few") | theo2.co.uk/events/detail/greg-davies; gregdavies.co.uk | compression | P01 292 vs 275 yes. **P09 170 vs 182 no**. P20 327 vs 335 no. P04 188 vs 194 no |
| 18 Dec | Kasabian, O2 | theo2.co.uk/events/detail/kasabian-2026 | compression | P20 345 vs 332 yes; P04 199 vs 193 yes; **P09 180 vs 180 level**. P01 now B |
| 28 Dec – 2 Jan | Christmas–NYE surge (PriceLabs neighbourhood, above); NYE fireworks Thu 31 Dec from 20:00 | london.gov.uk/events/london-new-years-eve-2026 | compression | **Yes, strongly.** 31 Dec: P01 467 vs 260; P20 624 vs 365 (fortnight = 21–27 Dec + 3–9 Jan) |
| Nov – Dec, most nights | Other O2 arena dates (Jungle 24–25 Nov, Fontaines D.C. 27 Nov, Mariah Carey 30 Nov, Pete Tong 11–12 Dec, Disney On Ice 24 Dec – 3 Jan, etc.) | theo2.co.uk venue listing, via search summary; event pages **not individually checked** | normal | Not used for gaps. The O2 has a show on most nights, so the "fortnight" baseline itself includes O2 nights |

### Central
Properties affected: Alexandra Palace → P08, P11; Emirates → P08; Hyde Park → P03 / P06 (blocked), P16 (no PriceLabs listing).

| Nights | Event | Source (primary) | Effect | Priced? |
|---|---|---|---|---|
| 24 Nov | Arsenal v Borussia Dortmund, UCL, Emirates, 20:00 | help.arsenal.com/support/solutions/articles/101000593887 ; uefa.com club page | compression (midweek) | **No**: P08 174 vs 199 |
| 9 Dec | Arsenal v Real Madrid, UCL, Emirates, 20:00 | same | compression | **No**: P08 195 vs 212 (same weekday 184) |
| 11 Dec – 2 Jan | Paddy Power World Darts Championship, Alexandra Palace (Great Hall), 11 Dec – 3 Jan. Venue and PDC state "a record 180,000 fans". One PDC notice says 4 Jan | alexandrapalace.com/whats-on/world-darts-championship-2026-2027/ ; pdc.tv news 7 Aug 2026 | compression | P11: 12 Dec 392 vs 331 yes; 18 Dec 354 yes; **13–17 Dec 307/284/283/295/312 vs 331 no**; 19 Dec – 2 Jan B. P08: 11/12/18/19 Dec yes; **13–17 Dec 200/184/202/185/198 vs 216 no**; 20–26 Dec 222–276 and 27 Dec – 2 Jan 314–429 all above the pre-event fortnight (216) |
| 19 Nov – 3 Jan | Hyde Park Winter Wonderland (closed 25 Dec) | hydeparkwinterwonderland.com | compression | Affects only intentional blocks or units without a PriceLabs listing. Not assessed |
| 9–16 Jan | Johnstone's Paint Masters snooker, Alexandra Palace West Hall, 10–17 Jan (venue page also shows a stray 23 Jan entry). No attendance stated | alexandrapalace.com/whats-on/johnstones-paint-masters-snooker-2027/ | normal | PriceLabs prices it slightly soft: P08 avg 186 vs 199 (3–8 Jan); P11 avg 199 vs 207. Not counted as missed |
| 7–8 Nov | Ally Pally Fireworks & Drone Festival | alexandrapalace.com | — | **UNVERIFIED**: the venue shows both 7–8 Nov and 13 Nov – 6 Dec. Not used |

### West
Properties affected: Twickenham → P10, P13 (P18 and P16 have no PriceLabs listing); Wembley → P10, P13 (P02 blocked).

| Nights | Event | Source (primary) | Effect | Priced? |
|---|---|---|---|---|
| 7–8 Nov | England v Australia, Nations Championship, Twickenham, Sun 8 Nov 15:10 | englandrugby.com news "England fixtures confirmed…"; help.englandrugby.com ticketing article 103000350147 | compression | P13 8 Nov 197 vs 192 yes (7 Nov blocked). P10 B |
| 12 Nov | England v Croatia, **UEFA Nations League** (the starting calendar wrongly says WC qualifier), Wembley, 19:45 | englandfootball.com match centre; wembleystadium.com/events/2026/England-v-Croatia | compression | P13 197 vs 197 level. P10 B |
| 13–14 Nov | England v Japan, Twickenham, Sat 14 Nov 16:40 | help.englandrugby.com article 103000389067 | compression | P13 blocked (linked?); P10 B |
| 20–21 Nov | England v New Zealand, Twickenham, Sat 21 Nov 14:10 | help.englandrugby.com article 103000389096 | compression | P13 233/237 vs 212 yes. P10 **144 vs 154 (20th) no**; 157 vs 154 (21st) |
| 26–29 Nov | Nations Championship Finals, Twickenham, 27/28/29 Nov (double-headers) | help.englandrugby.com articles 103000349981, 103000392931, 103000392936 | compression | P13 26 Nov 228 vs 232 no; 27 Nov 251 yes; 28–29 Nov B. P10 149/152/160 yes; **29 Nov 144 vs 147 no** |
| 5 Dec | England v Ukraine, Wembley, Sat 17:30. **Only source is wembleystadium.com's events listing**; not on englandfootball.com in search | wembleystadium.com/events | compression | P10 187 vs 148 yes. P13 B |

### Citywide
| Dates | Item | Source | Effect | Priced? |
|---|---|---|---|---|
| 26–30 Oct | School half term (Tower Hamlets, Camden, Islington, H&F, Westminster bi-borough) | towerhamlets.gov.uk, camden.gov.uk/term-dates, islington.gov.uk, lbhf.gov.uk, westminster.gov.uk term-date pages | normal (family) | Mostly booked. Open nights are flat to below fortnight; e.g. P12 26–29 Oct 198–219 vs 230, P11 28–30 Oct 204–205 vs 219 |
| 21 Dec – 1 Jan | Christmas school holiday (Camden term ends 18 Dec) | same council pages | compression late Dec (PriceLabs surge 26/27 Dec – 1 Jan) | See NYE row |

Out of window or not mappable: Bett (ExCeL, 20–22 Jan); the FA Cup 3rd round on 9 Jan (venues not drawn); aespa at the O2 on 16 Jan (UNVERIFIED).

## 3. Missed compression: verified events, open nights, our price at or below the fortnight

| Submarket | Ref | Night(s) | Event | Our £ | Fortnight £ | Gap £ | Below same weekday too? |
|---|---|---|---|---|---|---|---|
| East | P20 | 5, 10, 11, 13, 15, 16, 17, 18, 24 Nov; 1, 2, 16, 17 Dec | Stevie, Business Show, Kahan, Muse, Vet, Build, Phoebe, Horse Show / Greg | 272, 250, 260, 276, 238, 241, 245, 259, 315, 312, 328, 288, 327 | 278, 268, 268, 283, 280, 280, 283, 290, 318, 351, 351, 330, 330 | 6, 18, 8, 7, 42, 39, 38, 31, 3, 39, 23, 42, 3 = **299** | Yes for the Nov nights except 24 Nov, and for 16–17 Dec. No for 1–2 Dec (weekday 280/290) |
| East | P04 | 10, 11, 15, 16, 17, 18, 19 Nov; 17 Dec | Business Show, Muse, Kahan, Vet, Horse Show / Greg | 140, 146, 149, 139, 142, 142, 144, 188 | 153, 153, 156, 156, 157, 162, 162, 189 | 13, 7, 7, 17, 15, 20, 18, 1 = **98** | Yes for all Nov nights (weekday 148–172); 17 Dec no |
| East | P01 | 1, 2, 16 Dec | Phoebe; Horse Show | 254, 269, 255 | 289, 289, 275 | 35, 20, 20 = **75** | 16 Dec only (weekday 269) |
| East | P09 | 1, 2, 17, 18 Dec | Phoebe; Greg; Kasabian | 188, 186, 170, 180 | 199, 199, 182, 180 | 11, 13, 12, 0 = **36** | 17 Dec (198) and 18 Dec (Fri 218) |
| Central | P11 | 13, 14, 15, 16, 17 Dec | Darts | 307, 284, 283, 295, 312 | 331 | 24, 47, 48, 36, 19 = **174** | Slightly: 310 / 294 / 296 / 294 / 318 |
| Central | P08 | 24 Nov; 9 Dec; 13, 14, 15, 16, 17 Dec | Arsenal v Dortmund, v Real Madrid; darts | 174, 195, 200, 184, 202, 185, 198 | 199, 212, 216 ×5 | 25, 17, 16, 32, 14, 31, 18 = **153** | 24 Nov and 14 / 16 / 17 Dec yes |
| West | P10 | 20, 29 Nov | Eng v NZ (eve); Finals day 3 | 144, 144 | 154, 147 | 10, 3 = **13** | Yes (162 / 154) |
| West | P13 | 12, 26 Nov | Eng v Croatia; Finals (eve) | 197, 228 | 197, 232 | 0, 4 = **4** | No |

**Total: 44 open nights, £852 below the fortnight.** By submarket: East 28 nights, £508; Central 12 nights, £327; West 4 nights, £17.

The same event set and method applied to the 19 Oct prices gives 44 nights and £794, so the position worsened by £58 overnight. Yesterday's file reported 33 nights and £645, but that figure used a narrower event set: Muse and Greg Davies were unverified, Phoebe 2 Dec, Arsenal and the rugby / Wembley dates were missing, and its fortnight windows differed.

PriceLabs itself labels P11's 13–17 Dec, P20's 13–17 Dec and P01's 14–17 Dec as **"Low Demand"** (`get_listing_prices.demand_desc`). Its algorithm does not see the darts or Horse Show week.

## 4. Where price should sit above or below the PriceLabs default (evidence only)

**Above. Our own negative overrides sit on verified event nights** (`get_listing_date_overrides`, read 2026-10-20). Removing them only takes these nights back to the PriceLabs default. On the darts nights, P11 needs more than that.
- **P08 Islington.** −5% on 1–22 Dec and −5% on 22–30 Nov (set 11 Oct) cover Arsenal on 24 Nov and 9 Dec plus darts 11–22 Dec. On 13–17 Dec the PriceLabs `uncustomized_price` is 210 / 198 / 212 / 199 / 211, against our 200 / 184 / 202 / 185 / 198. So the override puts us £8–14 a night **below the default**, on nights already £14–32 under the fortnight.
- **P04 Barking.** −3% on 7–24 Nov (set 16 Oct) covers the Business Show, Kahan, Muse, Vet Show and Build nights. −3% on 6–22 Dec covers the Horse Show, Greg Davies and Kasabian. This −3% sits on the 8 P04 gap nights in §3.
- **P09 Greenwich.** −2% on 10–28 Nov (Kahan, Muse) and −2% on 1–22 Dec (Phoebe, Greg, Kasabian).
- **P20 Waterford Ct.** −2% on 1–30 Nov covers every November ExCeL and O2 night. (See "Below" for the conflicting signal.)
- **P10 / P13.** −1% on 19–30 Nov (P10: NZ and Finals). −1% / −3% on P13 (5 Dec is booked).
- **P11 Camden.** A +10% override on 12–18 Dec (set 18 Oct) already lifts darts nights well above the default: `uncustomized_price` on 14 Dec is £244 against our £284. Even so, 13–17 Dec sits £19–48 under the fortnight and slightly under the same weekday. The evidence (verified darts, 180,000 stated) supports pricing 13–17 Dec **above** the current level. No other evidence supports a specific amount.
- **Not event-driven:** P12 6 Dec (PriceLabs Mile End occupancy +8.1%) is £273 vs £280 open, a minor gap.

**Below.** One evidence-based case:
- **P20 non-event shoulder nights, 24 Oct – 1 Nov.** Overnight, with no log entry and no override change, PriceLabs raised P20 by £35–45 a night; 28 Oct went from £236 to £266, and `uncustomized_price` from £268 to £306. P20 is 14% booked over the next 30 nights against a 34% market, and its average open price (£274) is above the 2-bed P50 of £260. On 29–31 Oct (half term only, with no PriceLabs spike for Canary Wharf) it sits at £293–303. The evidence supports holding these nights at or below the default, not letting them rise.
- **No evidence for cutting January.** The starting list's "4–24 Jan trough" is an analytical estimate (UNVERIFIED), so I did not use it. PriceLabs `fp_insights` says P01's January prices are "much lower than the market" and P20's are "towards the higher end".

## 5. What changed since 19 Oct
- **No human pricing change.** `get_user_logs` returns 0 entries at listing, group and account level for 19–20 Oct. The latest override `updated_at` on every listing I checked is 18 Oct or earlier. Every overnight move is the PriceLabs algorithm.
- **Algorithm moves:**
  - **P05:** average −£53 a night, up to −£196 (22 Nov £730 → £534). On open nights: 28–30 Oct £437–452 → £377–388; 14–17 Dec £524–589 → £441–495. The timing matches PriceLabs now listing 4 bedrooms (policy fact, 19 Oct), but the cause is not confirmed.
  - **P20:** +£8.6 on average, concentrated in 24 Oct – 4 Nov: +£35–45 a night, with WTM 2–3 Nov at £272/284 → £316/327.
  - **P12:** −£8.9 on average.
  - **P04:** November event nights −£10–28 (Vet Show 18–19 Nov £169/172 → £142/144); WTM 3–4 Nov +£27–29 (now booked).
  - **P11:** 18 Dec £324 → £354, which closes yesterday's gap.
  - **P08:** 18 Dec £255 → £219.
  - **P09:** 18 Dec £169 → £180.
- **New bookings and status changes:**
  - **P01** has booked 18–20 Dec. It was booked on 19 Oct; the listed price on 18 Dec was £265, which is the night yesterday flagged as £29 under its fortnight. That night is no longer open.
  - **P20** has booked 21 Oct.
  - **P13**'s 4–7 Nov changed from open to Blocked. It may be the linked listing 3090701 (policy), but this is not confirmed.
- **Market:**
  - Market occupancy on the 30-day measure slipped 1 point for P04 (28 → 27%), P08 (50 → 49%), P10, P13, P14 and P20. The 60-day measure is unchanged.
  - P50 and P75 rose slightly everywhere: P11 2-bed £290/340 → £298/350; P13 £223/284 → £228/298; P01 £266/332 → £269/335; P20 £254/319 → £260/321.
- **Events, after today's re-verification:**
  - Now VERIFIED: Muse (15–16 Nov), Greg Davies (17 Dec) and WTM (3–5 Nov).
  - Phoebe Bridgers is **two** nights (1–2 Dec).
  - England v Croatia is a Nations League match.
  - Added: Arsenal UCL on 24 Nov and 9 Dec; Twickenham on 8, 14 and 21 Nov plus Finals 27–29 Nov; England v Ukraine on 5 Dec (single source); NYE; Masters snooker.
  - Ally Pally fireworks dropped to UNVERIFIED because the venue gives conflicting dates.

Data gaps:
1. There is no `market.csv` for 2026-10-20, and `kpi_pack` market_percentiles are null. Occupancy comes from `pl_kpis` via kpi_pack. P50/P75 are today's `get_neighbourhood_data` pulls, which do not state their horizon or whether cleaning is included. P06 and P07 percentiles are from 19 Oct; P02 and P03 have none.
2. Primary event pages cannot be fetched directly (DNS failure in WebFetch, proxy 403 in curl). Verification relies on primary-domain pages read through domain-restricted WebSearch summaries. England v Ukraine (5 Dec) has a single source. Stevie Wonder and Muse also show stray alternative dates on other O2 pages.
3. `prices.csv` ends on 19 Dec. I extended P01, P08, P11 and P20 to 18 Jan through `get_listing_prices`. P04, P09, P10, P12 and P13 are still uncompared after 19 Dec (P04: Horse Show 20 Dec; all of them: NYE).
4. `get_listing_prices` returns both `price` and `user_price`, and they differ on some nights (P20 18 Dec: £345 vs £382; P08 21 Dec: £257 vs £218). Both snapshots use `price`. Which of the two is live on the OTAs is not confirmed.
5. The only attendance figures are darts (180,000, venue/PDC) and London Build (organiser pages say both 25,000+ and 45,000+). No others are stated.
6. P15–P19 have no PriceLabs listing, so they have no market or price data. P20 is not in the `build/properties.py` VENUES map.
7. On booked nights the fortnight uses list prices, not paid rates. Several East fortnights include O2 nights, because the O2 has shows on most nights, so East gaps are conservative.
8. The cause of P05's −£53 a night overnight drop and P20's +£35–45 lift is not visible in logs or overrides.
9. P13's blocked nights (4–7 Nov newly blocked today; 13–14 Nov already blocked yesterday) cannot be confirmed as linked-listing bookings from the data I read.
