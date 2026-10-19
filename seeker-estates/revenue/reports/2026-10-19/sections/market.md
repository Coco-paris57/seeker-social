# Market & demand calendar — run D = 2026-10-19

Sources used:
- **Market occupancy:** `data/snapshots/2026-10-19/pl_kpis.csv`, columns `market_occupancy_next_30` / `market_occupancy_next_60` (PriceLabs, snapshot 2026-10-19). There is still no `market.csv`; this file stands in for it.
- **Market P50/P75:** PriceLabs `get_neighbourhood_data` `summary_table.table_data[].50_percentile_price` / `75_percentile_price`. P20 was pulled today (2026-10-19). All other rows reuse yesterday's pull (2026-10-18). The payload does not say which dates the percentiles cover.
- **Our prices:** `data/snapshots/2026-10-19/prices.csv`, column `pricelabs_price`, 20 Oct – 18 Dec 2026, 15 properties (P20 is new). Yesterday's numbers come from `data/snapshots/2026-10-18/prices.csv`.
- **What changed overnight:** PriceLabs `get_user_logs` and `get_listing_date_overrides`, read 2026-10-19. On 18 Oct (20:33–20:43 UTC) these base prices were raised: P11 260→286, P01 230→253, P09 160→176, P12 270→284, P05 455→500, P06 340→357. New overrides: P11 +10% on 12–18 Dec (min stay 2), P01 +10% on 16–17 Dec (min stay 3), P12 +1% on 29 Nov–13 Dec. The base rises lift every date, the surrounding fortnight included, so an event night only improves relative to its fortnight through the override.
- **Events:** VERIFIED events are carried over from `reports/2026-10-18/sections/market.md` without re-checking. To look for new events I ran WebSearch on 2026-10-19. Direct WebFetch of theo2.co.uk and excel.london failed again (`getaddrinfo ENOTFOUND`).
- **Policy:** P02, P03, P06 and P07 are intentional blocks, so their nights are left out of every gap. P14 is reported only.

## 1. Submarket table

| Ref | Area | Type | Mkt occ 30d | Mkt occ 60d | P50 £ | P75 £ | Our occ 30/60 (PL) |
|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 2-bed | 33% | 25% | 266 | 332 | 100% / 72% |
| P20 | Canary Wharf (Waterford Ct) | 2-bed | 35% | 27% | 254 | 319 (n=151, pulled 19 Oct) | **10% / 5%** |
| P04 | Barking | 2-bed | 28% | 21% | 159 | 214 | 50% / 42% |
| P09 | Greenwich | 1-bed | 38% | 30% | 134 | 165 | 60% / 47% |
| P12 | Mile End | 2-bed | 40% | 33% | 205 | 242 | 60% / 53% |
| P08 | Islington | 2-bed | 50% | 43% | 215 | 262 | 47% / 23% |
| P11 | Camden | 2-bed | 46% | 39% | 291 | 341 | 60% / 68% |
| P05 | St John's Wood | 4-bed (per policy) | 33% | 33% | 598 (4BR) | 733 (4BR) | 73% / 68% |
| P10 | Hanger Lane | 1-bed | 32% | 25% | 125 | 149 | 100% / 53% |
| P13 | Shepherd's Bush | 2-bed | 42% | 35% | 225 | 283 | 47% / 37% |
| P14 | Primrose Hill (special setup) | 1-bed | 42% | 38% | 192 | 233 | 0% / 0% |
| P02 / P03 / P06 / P07 | Ladbroke Grove / Bayswater / Marylebone / Woolwich | — | 46 / 48 / 43 / 26% | 40 / 43 / 40 / 19% | see 18 Oct | | intentional blocks |
| P15–P19 | Bow, Little Venice, SJW 1-bed, Fulham, Kings Langley | — | n/a | n/a | n/a | n/a | no PriceLabs listing |

For P20, PriceLabs `occ_insights` and `fp_insights` (19 Oct) report a single surge inside the window: 28 Dec – 1 Jan, with occupancy +11.2% and prices +22.2% (27–31 Dec). The Canary Wharf feed shows no ExCeL or O2 signal.

## 2. Re-check of yesterday's flagged nights (open nights only)

Method, unchanged from yesterday: the fortnight is the 7 nights before plus the 7 nights after, leaving out the event nights. For darts and the Horse Show, whose later nights fall beyond the price data, it is the 14 nights before. **Correction to yesterday:** P04 has two one-night gaps priced at £462 (1 Nov) and £548 (2 Dec), both with min-stay 1. They inflated P04's fortnights, so I now leave them out. P04 Build Expo 24 Nov becomes £171 vs £176 (yesterday reported £171 vs £203), and the Horse Show nights become £188 vs £188 (yesterday £187 vs £187 on a narrower window).

| Item | Yesterday (event £ / fortnight £) | Today (event £ / fortnight £) | Status |
|---|---|---|---|
| P11 Camden, darts 12 Dec | 323 / 309 | **394 / 340** | **FIXED** (+£54) |
| P11 Camden, darts 13–18 Dec | 233–255 / 309 (−14%) | 285–324 / 340 | **STILL BELOW** by £16–55 a night. Against the same weekday 1–2 weeks earlier they are now about level: 13 Dec 309 vs 311, 14 Dec 287 vs 296, 15 Dec 285 vs 295, 16 Dec 297 vs 292, 17 Dec 312 vs 318, 18 Dec 324 vs Fri 362. The +10% override only cancels the dip; it adds no event premium |
| P01 Canary Wharf, Horse Show 16 Dec | 206 / 258 | 254 / 294 | **STILL BELOW** £40. Same weekday 278 |
| P01 Canary Wharf, Horse Show 17 Dec | 236 / 258 | 291 / 294 | **STILL BELOW** £3, so near parity. Same weekday 302 |
| P01, 18 Dec (Horse Show + Kasabian, new in data) | — | 265 / 294 | **BELOW** £29. Same Friday average 331. A −2% override on 18 Dec (set 11 Oct) still applies |
| P01, Phoebe Bridgers 1 Dec | 226 / 264 | 249 / 290 | **STILL BELOW** £41. Same weekday 248, so level by weekday |
| P04 Barking, Business Show 10–11 Nov | 151, 157 / 159 | unchanged / 159 | **STILL BELOW** £8, £2 |
| P04, O2 run 15–17 Nov | 160, 150, 152 / 166 | unchanged | **STILL BELOW** £6, £16, £14. Only 17 Nov (Noah Kahan) is VERIFIED; 15–16 Nov is Muse, UNVERIFIED |
| P04, Vet Show 18–19 Nov | 169, 172 / 169 | unchanged | 18 Nov level (£0). 19 Nov is £3 above, which is flat |
| P04, Build Expo 24 Nov | 171 / 203 | 171 / **176** (orphan night removed) | **BELOW** £5 (yesterday overstated it as £32) |
| P04, Horse Show 16–18 Dec | 188, 186 / 187 | 188, 186, 208 / 188 | 16–17 Dec at or below (£0, £2). 18 Dec +£20. A −3% override on 6–22 Dec (set 17 Oct) covers these nights |
| P12 Mile End, half term 26–27 Oct | 193, 199 / 214 | 203, 209 / 229 | **STILL BELOW** £26, £20. A −2% override on 26 Oct – 15 Nov (set 17 Oct) still applies. 28–29 Oct are 230/231 vs 229, flat |
| P11, half term 28–31 Oct | 189–201 / 202 | 208–221 / 226 | **STILL BELOW** £5–18 (not a major event) |
| P08 Islington, darts 13/14/16/17 Dec | 200/188/186/202 / 204 | unchanged | **STILL BELOW** £4/16/18/2. About level by weekday. No change made |
| P09 Greenwich, Phoebe 1 Dec | 169 / 185 | 187 / 203 | **STILL BELOW** £16. Above by weekday (167) |
| P13 Shepherd's Bush, Croatia 12 Nov | 194 / 197 | unchanged | **STILL BELOW** £3 |

## 3. P20 Waterford Court (Canary Wharf, O2 and ExCeL), first read

P20 pricing context: forward occupancy is 10% (30d) vs 35% market. Most fortnights sit at £255–350, above the 2-bed P50 of £254 and often above the P75 of £319. Overrides set 17 Oct: −4% on 18–31 Oct and −2% on 1–30 Nov.

| Night(s) | Event | Status | P20 £ | Fortnight £ | Result |
|---|---|---|---|---|---|
| 2–4 Nov | WTM (ExCeL) | UNVERIFIED | 272/284/282 | 253 | +10.3%, priced |
| 3 Nov | Stevie Wonder (O2) | VERIFIED | 284 | 257 | +10.3%, priced |
| 10–11 Nov | Business Show (ExCeL) | VERIFIED | 255 / 264 | 265 | below by £10 / £1 |
| 13, 14, 17 Nov | Noah Kahan (O2) | VERIFIED | 275 / 292 / 244 | 282 | 13 Nov −£7, 14 Nov +£10, 17 Nov −£38 |
| 15–16 Nov | Muse (O2) | UNVERIFIED | 238 / 244 | 282 | −£44 / −£38 (not counted) |
| 18–19 Nov | Vet Show (ExCeL) | VERIFIED | 283 / 296 | 288 | −£5 / +£8 |
| 24–25 Nov | Build Expo (ExCeL) | VERIFIED | 309 / 319 | 314 | −£5 / +£5 |
| 1 Dec | Phoebe Bridgers (O2) | VERIFIED | 302 | 348 | −£46. Same weekday 300 |
| 16–17 Dec | Horse Show (ExCeL) | VERIFIED | 290 / 328 | 350 | −£60 / −£22. Same weekday 336 / 351 |
| 18 Dec | Horse Show + Kasabian (O2) | VERIFIED | 382 | 350 | +9%, priced |

## 4. Demand calendar additions (to 16 Jan 2027), checked 2026-10-19

No new event could be verified from a primary source. These candidates are listed for information and are not used in the gaps:
- Thu 17 Dec, Greg Davies "Full Fat Legend", The O2. **UNVERIFIED (secondary):** ents24.com/london-events/the-o2/greg-davies/7411816, timeout.com, engagehospitality.co.uk. If confirmed, P01, P09, P04 and P20 on 17 Dec would also count as O2 nights. P01 £291 and P20 £328 are already below their fortnights.
- Sat 16 Jan 2027, aespa, The O2. **UNVERIFIED (secondary):** ents24.com/london-events/the-o2. Falls beyond prices.csv.
- Bett UK, ExCeL, 20–22 Jan 2027. Dates appear on the organiser site (uk.bettshow.com, via search summary). It falls **outside** the 16 Jan window and is noted for the next run.
- The Emirates FA Cup 3rd Round is Sat 9 Jan 2027 (thefa.com/competitions/thefacup/round-dates), but the venues are not drawn, so it cannot be mapped.
- Twickenham: per search, the next England home game is 14 Feb 2027, outside the window. Not re-verified.

Yesterday's verified calendar otherwise stands: darts 11 Dec – 3 Jan, Horse Show 17–21 Dec, Kasabian 18 Dec, Winter Wonderland (its properties are blocked), Christmas holidays.

## 5. Missed compression: verified events, open nights, our price at or below the fortnight

| Ref | Nights | Event | Our £ | Fortnight £ | Gap £ |
|---|---|---|---|---|---|
| P11 | 13 / 14 / 15 / 16 / 17 / 18 Dec | Darts | 309 / 287 / 285 / 297 / 312 / 324 | 340 | 31 / 53 / 55 / 43 / 28 / 16 = **225** |
| P20 | 10, 11, 13, 17, 18, 24 Nov; 1, 16, 17 Dec | ExCeL / O2 (see §3) | 255, 264, 275, 244, 283, 309, 302, 290, 328 | 265, 265, 282, 282, 288, 314, 348, 350, 350 | 10, 1, 7, 38, 5, 5, 46, 60, 22 = **193** |
| P01 | 1 Dec; 16, 17, 18 Dec | Phoebe; Horse Show (+Kasabian 18th) | 249; 254, 291, 265 | 290; 294 | 41; 40, 3, 29 = **113** |
| P08 | 13 / 14 / 16 / 17 Dec | Darts | 200 / 188 / 186 / 202 | 204 | 4 / 16 / 18 / 2 = **41** |
| P09 | 1 Dec; 18 Dec | Phoebe; Kasabian | 187; 169 | 203; 191 | 16; 22 = **38** |
| P04 | 10, 11, 17, 18, 24 Nov; 16, 17 Dec | Business Show, Kahan, Vet, Build, Horse Show | 151, 157, 152, 169, 171; 188, 186 | 159, 159, 166, 169, 176; 188, 188 | 8, 2, 14, 0, 5; 0, 2 = **32** |
| P13 | 12 Nov | England v Croatia | 194 | 197 | **3** |

**Total: 33 open nights, about £645 below the fortnight.** Yesterday it was 22 nights and about £579; today's set adds P20 (9 nights, £193) and the 18 Dec nights. Taking the same-weekday comparison into account, the gaps that are real event shortfalls are **P01 16 Dec and 18 Dec** (£254 vs 278 Wed; £265 vs 331 Fri), **P20 16–17 Dec** (£290 vs 336; £328 vs 351), **P11 18 Dec** (£324 vs Fri 362), **P09 18 Dec** (£169 vs Fri 217) and **P04/P20 17 Nov** (£152 vs Tue 165; £244 vs Tue 288). P11 13–17 Dec and the P08 darts nights are now level by weekday, with no event premium.

Data gaps:
1. There is still no `market.csv`. Occupancy comes from PriceLabs `pl_kpis.csv`. P50/P75 come from neighbourhood `summary_table` (P20 pulled 19 Oct, the rest 18 Oct), and the window those percentiles cover is not stated.
2. `prices.csv` ends on 18 Dec. Darts after 18 Dec, Horse Show 19–20 Dec, Christmas/NYE (the PriceLabs surge on 27 Dec – 1 Jan) and 1–16 Jan cannot be compared.
3. theo2.co.uk and excel.london cannot be reached from here (DNS failure). No new event could be primary-verified, and Greg Davies (17 Dec) and aespa (16 Jan) stay UNVERIFIED.
4. Muse (15–16 Nov) and WTM (2–4 Nov) remain UNVERIFIED, so P04's and P20's 15–16 Nov gaps (£22 and £82) are not counted.
5. P04's fortnights are distorted by orphan nights priced at £462/£548 (min stay 1). I left those two nights out; yesterday's P04 Build Expo gap (£32) was overstated.
6. P15–P19 have no PriceLabs listing, so they have no market or price data.
7. On booked nights the fortnight uses PriceLabs list prices, not paid rates. The whole P11 pre-darts window (2–11 Dec) is booked.
8. No attendance figures beyond those carried over from yesterday.
