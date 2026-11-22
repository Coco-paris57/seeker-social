# Market & demand calendar: run D = 2026-11-22 (window 23 Nov 2026 – 20 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Kept out of findings: P02/P03/P06/P07 intentional blocks (P06 numbers only); P14 numbers only; P13 = one flat (3064856 + 3090701); 15%/20% stay discounts; Booking.com Visibility Booster; +15% Booking.com markup and derived rate plans; P04 2 Dec +200%; P13 1 Dec +50% (intentional_overrides).
- **PriceLabs calls today: all read-only, strictly one at a time (never two in one message):**
  - `get_neighbourhood_data` (detail, future prices + occupancy), 07:20–07:22Z, in this order: **3588993 Scott Ellis Gardens (one call)**, P13 3064856, P04 3562176, P11 3064196, P05 3166592, P20 3547481, P12 2699998, P01 3320302, P06 3288517. I checked each file (listing_id match, 540 days, `all_operations_ok=true`, source NL) and saved it to `scratchpad/m22/neigh_<id>.json`. The Dispatcher's `raw/neighbourhood_P13.json` is a summary pull with no daily data, so I did not use it for daily figures.
  - `get_user_logs` (listing, 21–22 Nov): **10 entries, all Reyhan, all on 3588993** (below). **There are no new edits on P04, P05, P11, P13 or P20 since 21 Nov 06:00Z.**
  - `get_listing_date_overrides` from 22 Nov onwards for P05, P13 3064856, P11 and P04.
- **`market.csv`:** `data/snapshots/2026-11-22/market.csv` already existed when I wrote. Its first 33 lines are identical to 21 Nov, and the pricelabs agent had added a `3588993` row with occupancy blank. I appended 9 rows dated 22 Nov under `.market.csv.lock` (now 43 lines; `scratchpad/m22/wmarket22.py`). **My 3588993 row has the same percentiles as the pricelabs agent's row, plus market_occ.** All market figures below come from the 22 Nov rows.
- **Prices:** `prices.csv` 22 Nov, column `pricelabs_price`, 23 Nov – 21 Jan. Refresh times from `raw/prices_<id>.json`: P20 21 Nov 08:48:53Z, P11 09:42:38Z, P13 09:45:25Z (twin 09:45:26Z), P05 09:45:36Z, P04 09:45:41Z, 3588993 19:37:34Z (after its 19:36Z base change). "yday" = 21 Nov `prices.csv`. "unc" = `uncustomized_price`. After 21 Jan I use the neighbourhood `final_price`. **In `prices.csv`, Smoobu equals PriceLabs on every night quoted below.**
- **Occ Δ** = daily `market_occupancy` − `market_occupancy_stly`, in points. **Bedroom caveat:** the daily P25–P90 mix bedroom counts:
  - 1–3 BR for P04, P11, P20, P01 and P06
  - 2–3 BR for P13 and P12
  - 3–5 BR for P05
  - 2–4 BR for 3588993

  Only `summary_table` is bedroom-matched. "est. matched" = mixed P50 × (matched P50 ÷ mean daily mixed P50, 23 Nov – 22 Dec). These are **estimates**. Today's ratios: P04 1.09, P13 0.96, P11 1.14, P05 1.27, P20 1.15, P12 0.97, P01 1.15, P06 1.02, 3588993 1.08.
- **Fortnight method:** unchanged from 17–21 Nov (`scratchpad/m22/analyse22.py`, which is `m21/analyse21.py` with the cut-off moved to 23 Nov, the first date in `prices.csv`). Same 17 Nov event set, same exclusions. Output in `scratchpad/m22/out22.txt`. The comparison with yesterday uses `scratchpad/m21/cmp21.py` and is saved in `scratchpad/m22/cmp22.txt`. Block detail is in `scratchpad/m22/items22.txt`.

## 1. Submarket table
- **P25 / P50 / P75 / P90 (n)** come from the `market.csv` 22 Nov rows (PriceLabs Nearby Listings `summary_table`, bedroom-matched, pulled 07:20–07:22Z).
- **Mkt occ 30/60** comes from `market.csv` `market_occ_30/60` (taken from `pl_kpis.csv` 22 Nov).
- **Our occ 30/60** comes from `pl_kpis.csv` `occupancy_next_30/60`.
- Bracketed values are 21 Nov.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | P50 21 Nov | Our occ 30/60 |
|---|---|---|---|---|---|---|
| Camden | P11 | 2 | 51 / 38% (51/38) | 233 / **293 / 335** / 389 (171) | 292 | 47 / 40% (47/42) |
| Shepherd's Bush | P13 | 2 | 47 / 36% (47/36) | 189 / **222 / 271** / 350 (117) | 222 | 67 / 53% (70/55) |
| St John's Wood (4 BR) | P05 | 4 | 49 / 40% (49/40) | 460 / **582 / 704** / 1,217 (90) | 575 | 73 / 57% (73/58) |
| **St John's Wood NW8 (3 BR)** | **3588993 Scott Ellis Gardens (unmapped)** | 3 | 45 / 35% (pl_kpis 21 Nov: 43/34) | 317 / **389 / 477** / 623 (148) | – (not pulled) | 37 / 20% (27/13) |
| Barking | P04 | 2 | 22 / 18% (23/18) | 139 / **174 / 216** / 249 (89) | 174 | 43 / 35% (47/37) |
| Canary Wharf | P20 | 2 | 38 / 29% (38/29) | 218 / **253 / 321** / 420 (149) | 253 | 70 / 55% (70/57) |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 34 / 27% (34/27) | 218 / **261 / 338** / 430 (145) | 266 | 100 / 100%* |
| Mile End (handback 13 Dec) | P12 | 2 | 45 / 34% (45/34) | 171 / **205 / 234** / 292 (116) | 205 | 83 / 92%* |
| Marylebone (intentional block) | P06 | 2 | 52 / 40% (52/40) | 322 / **412 / 529** / 664 (215) | 418 | 73 / 87%* |
| Primrose Hill (numbers only) | P14 | 1 | 48 / 35% (pl_kpis) | no row | – | 0 / 0% |

\* Inflated by a handback or by intentional blocks.
- **The market is flat day on day.** P50 moved by between −£6 (P06) and +£7 (P05); n moved by at most 2.
- **3588993's own compset shows the NW8 4 BR band** (n=30): P25 457 / P50 561 / P75 628 / P90 1,579. That is close to P05's own 4 BR row (P50 582, n=90). I use it below as a second read for P05.
- There is no `market.csv` row for Greenwich, Bow, Little Venice, Fulham, Kings Langley, Ladbroke Grove, Bayswater, Woolwich, Hanger Lane or Islington (not pulled).
- P04 our occ 30 fell 47 → 43%. That fits the overnight cancellation of the 17–20 Dec stay (made and cancelled 21 Nov).

## 2. Items in the brief

### PriceLabs edits since 21 Nov 06:00Z (`get_user_logs`)
| When (Z) | Listing | Change |
|---|---|---|
| 21 Nov 12:46:09 – 12:46:53 | 3588993 | 7 date overrides with **min stay only** (no price value logged): 29 Nov min 3; 30 Nov–2 Dec 2; 4–5 Dec 3; 6–7 Dec 2; 11–12 Dec 3; 13–14 Dec 2; 1–2 Jan 3; 3–4 Jan 2 |
| 21 Nov 19:33:11 → 19:36:01 | 3588993 | **base 295 → 325 → 425** |

- **No edits on P04, P05, P11, P13 or P20.** All price moves on those listings below came from the 21 Nov ~09:4xZ refresh, not from new edits. Reyhan's 20 Nov edits (P11 22 Nov–7 Dec −2%, 14–15 Dec −2%, 2 Jan–28 Feb −8%; P13 10–26 Dec −2%; P05 29 Nov–2 Dec −5%, 7–8 Dec −1%; P04 23 Dec −5%, 24–26 Dec +5%) are **still live**, per today's `get_listing_date_overrides`.

### 3588993 Scott Ellis Gardens (NW8, 3 BR, base 425): market read vs its prices (one neighbourhood call)
Its 3 BR summary row is P25 317 / **P50 389 / P75 477** / P90 623 (n=148). **The base of 425 is 1.09× the 3 BR median.** The daily figures mix 2–4 BR; est. matched = mixed P50 × 1.08.

| Window (open nights) | Ours £ | Mixed P25 / **P50** / P75 £ | est. matched P50 £ | Ours vs est. matched | Nights > mixed P75 / < mixed P50 | Avg occ / Δ |
|---|---|---|---|---|---|---|
| 23 Nov – 22 Dec (21 open, 9 Blocked) | **7,564** (avg 360) | 6,035 / **7,729** / 10,117 | 8,347 | **−£783 (0.91×)** | 0 / 15 | 46.1% / **+8.2** |
| 23 Dec – 21 Jan (29 open, 1 Blocked) | **10,576** (avg 365) | 7,909 / **10,336** / 13,339 | 11,163 | −£587 (0.95×) | 0 / 18 | 27.3% / +5.5 |
| **All 50 open nights** | **18,140** (avg 363) | 13,944 / **18,065** / 23,456 | 19,510 | **−£1,370 (0.93×)** | **0 / 33** | 35.2% / +6.6 |
| 13–21 Dec (8 open) | 2,947 | 2,350 / 3,042 / 3,978 | 3,285 | **−£338** | 0 / 6 | 40.6% / **+12.5** |
| 27–31 Dec NYE (5 open, min 7/5/4/4/4) | 2,685 (474–555) | 1,752 / 2,435 / 3,084 | 2,630 | +£55 | 0 / 1 | 52.9% / +1.4 |
| 5–21 Jan (16 open) | 4,654 (avg 291) | 3,724 / 4,749 / 6,153 | 5,129 | −£475 | 0 / 12 | 13.9% / +5.6 |

- **Read: after the base rise to 425, the listing still prices at about the mixed 2–4 BR median, which is about 7% under the estimated 3 BR median, and never above the mixed P75.** This is in an NW8 market that runs **above STLY on almost every night** (Δ +8.2 on average over the next 30 days; up to +18.2 on 19 Dec and +18.1 on 13 Dec).
- **The average open-night list (£363) is below the 3 BR summary P50 (£389).** On the 13–21 Dec block, Δ is +9.3 to +18.2 and we are £338 under the est. matched P50.
- **Price equals `uncustomized_price` from 3 Dec onwards.** There are no price overrides: Reyhan's 21 Nov overrides are min-stay only. 29 Nov – 2 Dec sit 4–8% above unc (318/301/289/339 vs 295/282/274/326); the cause is NOT CHECKED.
- January (avg £291, market occ 10–18%) is the soft part of the window.
- **No £4,000 values remain.** The highest open night is £555 (30–31 Dec).
- **The market supports roughly £389–420/night (3 BR P50 to est. matched P50) over the next 30 days, against £360 listed.** It does not support P75 (£477) outside 13–21 Dec and NYE, where occupancy is only 41–53%.
- Not in `id_map.json`/policy (t-scott-ellis-2011), so these are facts only.

### P05 St John's Wood (4 BR): Valentine's 13–17 Feb reopened (4 n; beyond `prices.csv`, so neighbourhood `final_price`)
| Item | £ (4 n) | Note |
|---|---|---|
| Cancelled sale (Airbnb, made 15 Nov, cancelled overnight) | **1,219.98 room** (£305/n) + £195 cleaning | 0.73× today's list |
| **PriceLabs today (final_price 13 / 14 / 15 / 16 Feb)** | **435 / 407 / 416 / 421 = 1,679** | includes a **live −5% override, min 4** (1–28 Feb, updated 15 Nov 19:14Z; author NOT CHECKED). Pre-override ≈ £1,767 (estimate) |
| Fortnight (6–12 + 17–23 Feb final_price) | 421.1/n = 1,684 | **14 Feb (Valentine's, Sun) £407 is £14.1 under the fortnight.** Only Sat 13 Feb is above it (+£13.9) |
| Daily 3–5 BR P25 / P50 / P75 / P90 | 1,199 / **1,535** / 2,110 / 3,488 | – |
| est. matched 4 BR P50 (1,535 × 1.27) | ≈ **1,949** | – |
| 4 BR summary P25 / **P50** / P75 × 4 (P05 compset, n=90) | 1,840 / **2,328** / 2,816 | horizon unstated |
| 4 BR NW8 P25 / P50 × 4 (3588993's compset, n=30) | 1,828 / 2,244 | – |
| Market occ / Δ | 15.7 / 11.5 / 10.4 / 11.1%; **+8.5 / +2.3 / −0.5 / −0.2** | 83–86 days out |

- **Read: PriceLabs does not price Valentine's.** The list is level with the fortnight, and below it on 14 Feb itself.
- **The market shows mild compression only on Sat 13 Feb (Δ +8.5)**, at low absolute occupancy so far out.
- **What the market supports for the 4 nights: about £1,840–1,950**, meaning the 4 BR P25 up to the est. matched 4 BR P50. That is **£160–270 above today's £1,679** and **£620–730 above the cancelled sale**.
- P75 (£2,816) is not supported on 10–16% occupancy and a flat Δ.
- About £88 of the gap is the −5% override (estimate).
- Whether the nights are open again in Smoobu/Airbnb is NOT CHECKED: no Feb prices in today's pull.

### P04 Barking: 20–26 Dec and 6–19 Dec (refresh 21 Nov 09:45Z)
| Block | Ours (yday) | unc | Market P50 / P75 (mixed); est. matched P50 | Occ Δ (occ) | Read |
|---|---|---|---|---|---|
| **20–26 Dec** (min 3/3/3/3/2/2/2) | 150 / **150** / 166 / 170 / 190 / 191 / 190 = **£1,207** (£1,225) | 1,384 | **1,172 / 1,474**; ≈ 1,277 | +5.9 / +3.9 / +3.6 / +5.4 / +6.9 / **+9.8** / +3.2 (20–30%) | **+£35 over the mixed P50, ≈ £70 under the est. matched P50, £267 under P75.** 21 Dec fell 168 → 150 (−£18): unc went 204 → 166 under an unchanged −5%. The market supports ≈ the matched P50, not P75 (occupancy 20–30%). |
| **6–19 Dec** (min 3, −5%) | **£2,023** (£1,983, +£40) | 2,210 | **2,204 / 2,858**; ≈ 2,402 | −6.7 to +5.1; positive on 7–8, 11–13 and 17–19 Dec | **£181 under the mixed P50** (yday £239) and ≈ £379 under the est. matched P50. Almost all of the +£40 is **6 Dec 140 → 174** (unc 155 → 203 under an unchanged −5%; 5 Dec booked, 7 Dec open; cause NOT CHECKED). Horse Show nights 17–19 Dec: 142 / 147 / 153 vs fortnight 136.8 (above). |
| 17–19 Dec sale that was made and cancelled 21 Nov (Airbnb 3 n) | **£338.12 room** (£112.71/n) | – | list on the booking day (21 Nov file) 142 / 146 / 151 = £439; mixed P25 £404 | +0.4 / +3.9 / +5.1 | The sale was **0.77× list and £66 under the mixed P25** on Horse Show nights. The gap came from the channel, not PriceLabs (channel section). Those nights are open again. |

### P20 Waterford Court: 14–18 Dec, 5 / 26 Dec (refresh 21 Nov 08:48Z; Smoobu = PriceLabs)
| Block | Ours (yday) | Market P50 / P75 (mixed); est. matched P50 | Occ Δ (occ) | Read |
|---|---|---|---|---|
| 14–18 Dec (min 3) | 300 / 302 / 301 / **333** / 321 = **£1,557** (£1,541) | 1,098 / 1,402; ≈ 1,263 | −11.5 / −10.4 / −8.2 / −7.4 / −5.7 (25–29%) | **£155 over the mixed P75 and ≈ £294 over the est. matched P50**, in a market 6–12 points below STLY. 17 Dec rose 307 → 333. Hold. No case to go higher. |
| 5 Dec orphan (min 1, +100%) | **520** (512) | P50 228 / P75 296 / P90 396 | +3.9 (56.9%) | **1.31× the mixed P90.** Jingle Bell Ball 5–6 Dec (O2). The 20 Nov sale and cancellation at £343.33 room sat between P75 and P90. The market prices this night at about £230–400. |
| 26 Dec orphan (min 1, +100%) | **539** (543) | P50 251 / P75 323 / P90 415 | +0.6 (35.7%) | **1.30× the P90.** Disney On Ice (O2) from 24 Dec. No compression. A fact for Corentin's confirm/revert. |

### P11 Camden: 30 Nov – 4 Dec, darts and 3 Jan (refresh 21 Nov 09:42Z)
| Nights | Ours (yday) | unc | Market P50 / P75 (mixed); est. matched | Occ Δ (occ) | Read |
|---|---|---|---|---|---|
| **30 Nov – 4 Dec** (min 2, −2% live) | 183 / 183 / 205 / 214 / 259 = **£1,044** (£1,050) | 1,114 | **1,261 / 1,612**; ≈ 1,438 | −1.3 / −2.2 / −2.5 / +1.7 / +2.9 (43–72%) | **£217 under the mixed P50, £64 over the mixed P25.** Mon–Wed are near STLY. The Fri 4 Dec night (71.5% occupancy) is £36 under its P50. The market supports ≈ P50 (+£217), not more. |
| 8 Dec orphan (+50%, min 1) | **305** (309) | 269 | 257 / 316 | +6.2 (39%) | above P50 |
| **14–17 Dec** Round One (min 2, −2%) | 218 / 220 / 229 / 251 = **£918** (£921) | 994 | 1,002 / 1,206; ≈ 1,142 | −4.8 / −1.8 / −0.2 / +2.8 (22–30%) | **£282 under the policy level** (21 Oct: above £300/n, £1,200). £84 under the mixed P50; ≈ £224 under the est. matched P50. |
| 18 Dec | 324 (313) | 351 | 280 / 338 | +0.8 | above P50 |
| **23 Dec** Round Two (+5% live) | **266** (285, −£19) | 273 | 285 / 393 | −2.1 (30.4%) | **£19 under the mixed P50.** Price is 0.97× unc even though a +5% override is live. The cause is NOT CHECKED; there was no edit. |
| 24–25 Dec (no darts) | 242 / 251 (256 / 267) | 248 / 258 | 288 / 404; 309 / 419 | −5.8 / −9.8 | £104 under the mixed P50 in a market well below STLY. **No event on these nights.** |
| **3 Jan** final (min 3, −8% live) | **157** (166) | 184 | 222 / 277; ≈ 253 | +0.7 (19.2%) | **£65 under the mixed P50; £18.6 under the fortnight (175.6).** About £14 of it is the −8% (estimate). |

### P05 St John's Wood: 7–8 / 13–14 / 21 / 29 Dec (refresh 21 Nov 09:45Z)
| Nights | Ours (yday) | unc | 4 BR summary P50 × n; daily 3–5 BR P50 / P75; est. matched | Occ Δ | Read |
|---|---|---|---|---|---|
| **7–8 Dec** (−1%, min 2) | 449 / 430 = **£879** (£917, −£38) | 1,187 | **1,164**; 882 / 1,138; ≈ 1,120 | **+8.1** / +3.5 | **£285 under the 4 BR median** (yday £233) and ≈ £241 under the est. matched P50. Price ÷ unc is 0.74. Unc was nearly unchanged (−£4), so the −£38 is not explained by the −1% override; cause NOT CHECKED. |
| **13–14 Dec** (no price override, min 2) | 471 / 461 = **£932** (£979, −£47) | 1,223 | **1,164**; 867 / 1,149; ≈ 1,101 | **+14.3 / +8.7** | **£232 under the 4 BR median** (yday £171). This is P05's most compressed open night. Price ÷ unc is 0.76 with no price override; cause NOT CHECKED. |
| 21 Dec orphan (+300%, min 1) | **2,109** (2,010) | 727 | 4 BR P90 1,217; daily P90 1,000 | +6.7 | **1.73× the 4 BR P90.** Corentin's conflict (is it meant to sell?) is unchanged. |
| 29 Dec orphan (+300%, min 1) | **2,422** (2,398) | 940 | 4 BR P90 1,217; daily P90 1,164 | +3.9 | **1.99× the 4 BR P90.** Same. |

### P13 Shepherd's Bush: December (refresh 21 Nov 09:45Z)
- **27 Nov (Finals Fri), the only open night before 1 Dec:** 264 (266), +25%, min 1. Market P50 240 / P75 298, occ 68.1%, Δ +3.8. That is **£29.7 over the fortnight (234.3)**, so it is priced in.
- **1 Dec:** 225 (226); twin 158. Market P50 225 / P75 290, Δ +3.1. The live +25% against the policy +50% is already with Corentin.
- **13–21 Dec (9 open nights): 195 / 194 / 191 / 194 / 202 / 215 / 221 / 205 / 213 = £1,830 (yday £1,945, −£115; 20 Nov £2,170).**
  - Market: mixed P50 £2,111 / P75 £2,680; est. matched ≈ £2,027.
  - Occ Δ: +9.6 / +7.9 / −1.0 / +4.7 / +7.2 / +9.4 / **+15.5 / +10.9 / +13.4** (26–50%).
  - **We are now £281 under the mixed P50 and ≈ £197 under the est. matched P50** (yday −£167). The −2% override (20 Nov, Reyhan) is unchanged. Unc fell about £48 and the rest is extra price ÷ unc compression (0.98 → 0.965); cause NOT CHECKED. The confirm/revert on Reyhan's −2% stands.
  - **19–21 Dec: 221 / 205 / 213 = £639 vs P50 £739 / P75 £959 (−£100).**
- **Twins:** 3090701 is now **identical to 3064856 on all 9 open nights 13–21 Dec** (£1,830 each; yday the twin was £1,845). The policy is to keep the twins slightly apart. This is a fact for the PriceLabs/channel sections.
- 2–12 Dec and 22 Dec – 1 Jan are Booked or linked-Blocked.

## 3. Demand calendar, next 90 days
**Re-checked 22 Nov 2026 ~07:30Z.** `WebFetch` of www.alexandrapalace.com failed again with `ENOTFOUND`, so I stopped trying venue hosts. Those hosts must be allowed in the session's network settings. **Every event fact below is a WebSearch summary restricted to the venue or organiser domain, checked 22 Nov 2026. None is a page read.**

- **Twickenham (Allianz Stadium):** [Finals page](https://allianzstadiumtwickenham.com/nations-championship), [Sun visit page](https://allianzstadiumtwickenham.com/plan-your-visit/nations-championship-finals-weekend-sunday/essential-information), [Sun ticketing](https://help.englandrugby.com/support/solutions/articles/103000392936-nations-championship-2026-sunday-29th-november-finals-day).
  - **Fri 27 Nov:** Italy v Fiji 16:40 and Ireland v Australia 20:10.
  - **Sat 28 Nov:** Wales v Japan 13:10 and **England v NZ 16:40**.
  - **Sun 29 Nov:** Scotland v Argentina 13:10 and **France v South Africa Grand Final 16:40**. **Conflict persists:** the Sunday visit page says 15:10 / 18:40 (approximate).
- **England v France, Sun 14 Feb 2027, 15:10**, Twickenham. **Re-verified today**: [Six Nations fixture](https://www.sixnationsrugby.com/en/m6n/fixtures/202700/england-v-france-14022027-1510/build-up), [England Rugby ticketing](https://help.englandrugby.com/support/solutions/articles/103000411510-guinness-men-s-six-nations-england-v-france-sunday-14th-february-2027), [stadium fixtures](https://allianzstadiumtwickenham.com/guinness-six-nations).
- **World Darts Championship, Alexandra Palace:** [event](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [schedule](https://www.alexandrapalace.com/blog/all-you-need-to-know-world-darts-championship/), [PDC tickets](https://www.pdc.tv/paddy-power-world-darts-championship-tickets).
  - **Fri 11 Dec – Sun 3 Jan**, Great Hall.
  - **No sessions 24–26 Dec**: the table runs from Wed 23 Dec to Sun 27 Dec 12:30.
  - QF 1 Jan, SF 2 Jan 19:30, **final 3 Jan 20:00**. **The PDC says tickets have sold out** (new today).
  - The 4 Jan end date on a PDC registration page and the ballot notice still conflicts.
  - Today's summary states no attendance figure.
- **The O2 arena:** [listing](https://www.theo2.co.uk/events/venue/the-o2-arena), [Kehlani](https://www.theo2.co.uk/events/detail/kehlani-2026), [Disney On Ice](https://www.theo2.co.uk/events/detail/disney-on-ice-presents-discover-the-magic).
  - **Nov:** Bill Bailey 22, **Jungle 24–25** (Amr Diab is listed on the same dates), Jessie Ware 28, LOTR in Concert 29.
  - **Dec:** Mariah Carey 1–2 (conflicts with Phoebe Bridgers 1–2); **Jingle Bell Ball 5–6**; **Kehlani Tue 8 Dec** (event page, **now verified**); Pete Tong 11–12; RnB Winter Ball 13; The Darkness 16; Kasabian 18; **Disney On Ice 24 Dec – 3 Jan** (plus a separate 16 Jan listing).
  - **Don Toliver (23 Nov) does not appear today** (UNVERIFIED). Greg Davies 17 Dec was not in today's summary (UNVERIFIED).
- **ExCeL:** [what's on](https://www.excel.london/whats-on), [Horse Show](https://www.excel.london/whats-on/london-international-horse-show), [MegaCon](https://www.excel.london/visitor/whats-on/megacon-live), [Genomics](https://www.excel.london/whats-on/the-festival-of-genomics-biodata-2027), [FinTech Connect](https://www.excel.london/whats-on/fintech-connect), [Perfume](https://www.excel.london/whats-on/london-perfume-exhibition).
  - **Dec:** FinTech Connect 1–2; Perfume 10–13; **Horse Show 17–21**.
  - **Jan:** **MegaCon 23–24 Jan**; Genomics 27–28 Jan.
  - **Feb:** **Cisco Live 8–12 Feb** (in the listing; no dedicated page found).
  - Not re-checked today: the 24–28 Nov shows and Scrooge Cirque 23–28 Dec.
- **NYE fireworks:** [london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026).
  - **Thu 31 Dec 20:00 – Fri 1 Jan 00:30**; entry 20:00–22:30.
  - The second and final batch is on sale via Ticketmaster only, max 4 per purchase. Prices are £20/£35 for Londoners and £40/£55 otherwise.
  - No attendance figure is stated.
- **Valentine's Day: Sun 14 Feb 2027** (calendar date; also Eng v France).
- **Attendance figures:** none stated in any source checked today.

Effect = market Occ Δ (compression ≥ +5, soft ≤ −2). Properties come from VENUES in `build/properties.py`. P20 and 3588993 are not in VENUES; I grouped P20 with P01 for O2/ExCeL. VENUES properties that are blocked, handed back or not pulled are named only: O2 P01/P09/P07; ExCeL P01/P07/P15; Ally Pally P08; Twickenham P10/P16/P18. "Ours vs fortnight" = `prices.csv` 22 Nov against the fortnight mean (`out22.txt`).

| Nights | Event | Venue | Open properties | Effect (Occ Δ) | Ours £ vs fortnight £ | Priced by PriceLabs? |
|---|---|---|---|---|---|---|
| 23–24 Nov | Jungle 24–25 (Don Toliver 23 UNVERIFIED) | O2 | P20; P04 24 Nov (cannot be booked) | P20 −6.6 / −11.9 soft; P04 −4.1 soft | P20 279 / 271 vs 288.2 / 286.1; P04 **142** vs 173.9 | **no** (P20 soft market; 271 = mixed P75); P04 no |
| 27 Nov | Finals Fri | Twickenham | P13 | +3.8 normal | 264 vs 234.3 | **yes** |
| 28–29 Nov | Finals Sat/Sun (Eng v NZ; Grand Final) | Twickenham | P13 booked; P11 sold 27–29 | P13 +4.6 / +0.2 | – | – |
| 5–6 Dec | Jingle Bell Ball | O2 | P20 5 Dec; P04 6 Dec | P20 +3.9; P04 −0.7 | P20 520 vs 300.9; P04 **174** vs 163.9 | P20 yes (manual +100%, 1.31× P90); **P04 yes now** (was 140) |
| 8 Dec | **Kehlani (verified today)** | O2 | P04 | +1.5 | **140** vs 157.1 | no |
| 11–13 Dec | Darts opens; Pete Tong 11–12; RnB Winter Ball 13 | Ally Pally / O2 | P11 booked; P04 | P11 +9.3 / +7.8 / +2.8; P04 +1.8 / +1.7 / +3.1 | P04 148 / 150 / 141 vs ~151 | no (not in the headline set) |
| 14–18 Dec | Darts Round One; Darkness 16; Kasabian 18 | Ally Pally / O2 | P11; P04; P20 | P11 −4.8 / −1.8 / −0.2 / +2.8 / +0.8; P20 −11.5 to −5.7 soft | P11 **218 / 220 / 229 / 251** vs 281.7; 18 Dec 324. P20 300 / 302 / **301** / 333 / 321 vs 311.0 | **P11 no** (−2% live); P20 above P75 in a soft market |
| 16–19 Dec | Horse Show 17–21 | ExCeL | P04; P20 | P04 −1.4 / +0.4 / +3.9 / +5.1 | P04 140 / 142 / 147 / 153 vs 136.8 | P04 yes |
| 13–21 Dec | pre-Christmas, darts | London | P13; P05 13–14; 3588993 | P13 −1.0 … **+15.5**; P05 +14.3 / +8.7; 3588993 +9.3 … **+18.2** | P13 £1,830 vs P50 £2,111; P05 £932 vs 4 BR median £1,164; 3588993 £2,947 vs est. P50 £3,285 | **no** (all under the market median) |
| 20–26 Dec | Christmas; Disney On Ice from 24 | O2 | **P04 (7 n open)** | +3.2 to +9.8 | £172.4/n vs fortnight 141.8 | yes vs the fortnight; ≈ £70 under the est. matched P50 |
| 23 Dec | Darts Round Two | Ally Pally | P11 | −2.1 soft | **266** vs 293.6 | **no** (−£19 overnight with no edit) |
| 24–25 Dec | Christmas (**no darts**) | – | P11 | −5.8 / −9.8 soft | 242 / 251 vs 293.6 | n/a: no event |
| 26 Dec | Disney On Ice | O2 | P20 | +0.6 | 539 vs 312.9 | yes (manual +100%, 1.30× P90) |
| 27 Dec – 2 Jan | NYE 31 Dec; darts | Embankment / Ally Pally | P04, P11, P20 Booked; P13 Blocked; **3588993 open 27–2 Jan** | 3588993 +1.1 … +15.3 (31 Dec +7.7) | 3588993 474–555 vs est. P50 (27–31 Dec) £2,630 vs £2,685 | 3588993: level with the est. matched P50 |
| 3 Jan | Darts final | Ally Pally | P11 | +0.7 | **157** vs 175.6 | no (−8% live) |
| 23–24 Jan | MegaCon | ExCeL | P20 | (final_price) | 255 / **239** vs 250.7 | 24 Jan no (too early) |
| 8–12 Feb | Cisco Live | ExCeL | P20, P04 | – | P20 264 / 257 / 251 / 248 / 276 vs 257.9; P04 10–12 Feb 160 / 159 / 170 vs 162.1 | level (too early) |
| 13–16 Feb | Valentine's (Sun 14) | – | **P05 (reopened)** | +8.5 / +2.3 / −0.5 / −0.2 | 435 / **407** / 416 / 421 vs 421.1 | **no** |
| 14 Feb | Eng v France 15:10 | Twickenham | P13 | −5.1 soft | 193 vs 193.8 | level (too early) |

## 4. Missed compression: open nights on events priced at or below the fortnight
Same rebuilt method and 17 Nov event set as 18–21 Nov, nights up to 17 Jan. Prices are today's `prices.csv`; 21 Nov values are in brackets.

| Ref | Night(s) | Event | Ours 22 Nov (21 Nov) | Fortnight £ (21 Nov) | Gap £ (21 Nov) |
|---|---|---|---|---|---|
| P04 | 24 Nov | Jungle (cannot be booked) | 142 (144) | 173.9 (175.9) | 31.9 (31.9) |
| P04 | 8 Dec | Kehlani (**verified today**) | 140 (140) | 157.1 (157.7) | 17.1 (17.7) |
| **P20** | **23 Nov** | Don Toliver (**UNVERIFIED; joined**) | 279 (282) | 288.2 (278.4) | 9.2 (–) |
| P20 | 24 Nov | Jungle | 271 (273) | 286.1 (278.0) | 15.1 (5.0) |
| P20 | 16 Dec | Darkness / Horse Show | 301 (304) | 311.0 (310.1) | 10.0 (6.1) |
| **P11** | **14–17 Dec** | Darts Round One | **218, 220, 229, 251** (219, 221, 229, 252) | **281.7** (288.4) | **63.7, 61.7, 52.7, 30.7** (69.4, 67.4, 59.4, 36.4) |
| **P11** | **23, 24, 25 Dec** | Darts (24–25: no play) | **266, 242, 251** (285, 256, 267) | 293.6 (292.8) | **27.6, 51.6, 42.6** (7.8, 36.8, 25.8) |
| P11 | 3 Jan | Darts final | 157 (166) | 175.6 (184.6) | 18.6 (18.6) |
| | | **Total, same event set** | | | **13 nights / £432.5** (21 Nov **14 / £410.3**) |
| | | Bookable under current min-stay (excl. P04 24 Nov) | | | 12 / £400.6 (21 Nov 13 / £378) |
| | | Excl. P11 24–25 Dec (no darts) | | | 11 / £338.3 (21 Nov 12 / £348) |
| | | Excl. P04 24 Nov, P11 24–25 Dec and P20 23 Nov (unverified) | | | **9 / £297.2** |

**Change vs yesterday: −1 night / +£22.2** (410.3 → 432.5). This is the same decomposition as 21 Nov (`cmp22.txt`).
- **Joined, 1 night, +£9.2:** P20 23 Nov. The price went 282 → 279 and its fortnight 278.4 → 288.2. The event is UNVERIFIED; it is counted only because it is in the 17 Nov set.
- **Left, 2 nights, −£28.0:**
  - P04 6 Dec (−£24.9): 140 → 174, now £10.1 above.
  - P20 17 Dec (−£3.1): 307 → 333, now £22.0 above.
- **Changed, 11 nights, +£41.0.** Our prices fell £68 in total, and the fortnight drift is −£27.0. Our price moves:
  - **P11 23–25 Dec −19 / −14 / −16**, with no edit; on 23–25 Dec price ÷ unc is 0.97 under a +5% override.
  - P11 3 Jan −9.
  - P04 and P20 −2/−3 each.
  - P11 14–15 and 17 Dec −1 each.

  Fortnight moves: P11 Round One −6.7 × 4; P11 3 Jan −9.0; P20 24 Nov +8.1; P04 −2.0/−0.6; P20 16 Dec +0.9; P11 23–25 Dec +0.8 × 3.
- Sum: 9.2 − 28.0 + 41.0 = **+22.2**. Matches.
- **Not counted:**
  - P04 11–13 Dec (not in the 17 Nov set).
  - Beyond 17 Jan (final_price, too early): P20 24 Jan £11.7; P20 9–11 Feb £0.9 / £6.9 / £9.9; P04 10–11 Feb £2.1 / £3.1; P13 14 Feb £0.8.
  - **P05 14 Feb Valentine's £14.1 (not a venue event; outside the set).**

**Read with care:**
- **£208.8 of the £432.5 is P11 Round One (14–17 Dec)** in a market at or near STLY (Δ −4.8 to +2.8). The fair reference there is the policy level (£1,200 vs £918, gap £282).
- **P11 24–25 Dec (£94.2) are verified no-play nights.** They stay in the headline only for comparability.
- **The new money is P11 23–25 Dec (+£51.4 overnight), caused by PriceLabs (refresh 21 Nov 09:42Z), not by an edit.**
- **The largest under-market items sit outside this headline:**
  - P13 13–21 Dec: £281 under the mixed P50 on Δ up to +15.5.
  - P05 7–8 Dec: £285 under the 4 BR median; 13–14 Dec: £232 under it (Δ +14.3).
  - 3588993 next 30 days: ≈ £783 under the est. matched 3 BR P50 on Δ +8.2.
  - P11 30 Nov – 4 Dec: £217 under the mixed P50.
  - P04 6–19 Dec: £181 under the mixed P50.
  - P05 Valentine's: about £160–270 under the 4 BR P25 / est. matched P50.

Data gaps:
1. **Market data source:** all market figures are PriceLabs Nearby Listings only (Airbnb-derived, `cleaning_fee` null, summary horizon unstated).
   - The daily percentiles mix bedroom counts, so "est. matched" figures are ratio estimates.
   - No Market Dashboard or Competitor Listings were pulled.
   - Not pulled: P09/P14 and P02/P03/P07/P08/P10/P15–P19.
   - 3588993 is not in `id_map.json`/policy.
2. **P05 Valentine's:** availability in Smoobu/Airbnb after the cancellation is NOT CHECKED; Feb is beyond the 60-day `prices.csv`. The author of the 1–28 Feb −5% (updated 15 Nov 19:14Z) is NOT CHECKED.
3. **Causes NOT CHECKED** (none is a logged edit; all came from the 21 Nov refresh):
   - P11 23–25 Dec −£14 to −£19 (price below unc under +5%)
   - P13 13–21 Dec −£115 (price ÷ unc 0.98 → 0.965 under −2%)
   - P05 7–8 Dec −£38 and 13–14 Dec −£47 (price ÷ unc 0.74–0.76)
   - P04 6 Dec +£34 (unc +£48) and 21 Dec −£18 (unc −£38)
   - 3588993 29 Nov – 2 Dec 4–8% above unc
4. **Channel questions** (channel section): the P04 17–20 Dec sale at 0.77× list was made and cancelled on the same day.
5. **Events** come from domain-restricted search summaries, not page reads. www.alexandrapalace.com (ENOTFOUND today), allianzstadiumtwickenham.com and www.pdc.tv must be allowed in the session's network settings.
   - Conflicts: Finals Sunday 13:10/16:40 vs 15:10/18:40; darts end 3 vs 4 Jan; Mariah Carey vs Phoebe Bridgers 1–2 Dec; Disney On Ice 16 Jan.
   - UNVERIFIED: Don Toliver 23 Nov and Greg Davies 17 Dec.
   - Not re-checked: ExCeL 24–28 Nov shows, Scrooge Cirque, Winter Wonderland.
6. **`market.csv`:** it has two 22 Nov rows for 3588993 (the pricelabs agent's row with occupancy blank, and mine). The percentiles are identical.
