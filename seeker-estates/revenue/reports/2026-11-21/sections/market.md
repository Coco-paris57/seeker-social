# Market & demand calendar: run D = 2026-11-21 (window 22 Nov 2026 – 19 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Kept out of findings: P02/P03/P06/P07 intentional blocks (P06 numbers only); P14 numbers only; P13 = one flat (3064856 + 3090701); 15%/20% stay discounts; Booking.com Visibility Booster; +15% Booking.com markup and derived rate plans; P04 2 Dec +200%; P13 1 Dec +50% (intentional_overrides).
- **PriceLabs calls today: all read-only, strictly one at a time (no batch):**
  - `get_neighbourhood_data` (detail, future prices + occupancy), 07:18–07:20Z, in order P04 3562176, P13 3064856, P11 3064196, P05 3166592, P20 3547481, P12 2699998, P01 3320302, P06 3288517. Each file checked (listing_id match, 540 days, `all_operations_ok=true`, source NL) and saved to `scratchpad/m21/neigh_<id>.json`.
  - `get_user_logs` (listing, 20–21 Nov): **33 entries, all Reyhan** (below).
  - `get_listing_date_overrides`, 21 Nov onwards: P11, P13 3064856, P04, P05.
- **`market.csv`:** `data/snapshots/2026-11-21/market.csv` did not exist. Copied forward from 2026-11-20 (24 rows) and 8 rows dated 21 Nov appended under `.market.csv.lock` (33 lines; `scratchpad/m21/wmarket21.py`). The 21 Nov rows are used below.
- **Prices:** `prices.csv` 21 Nov `pricelabs_price` (22 Nov – 20 Jan). Refresh times (`raw/prices_<id>.json`): P11 20 Nov 22:50:38Z, P13 22:51:36Z (twin 22:51:40Z), P05 22:52:38Z, P04 22:54:25Z. Each one is after Reyhan's edits on that listing (22:49–22:54Z), so I take those edits as included. That is an inference from the timestamps. **P20 is still at 20 Nov 09:20:45Z (stale).** "yday" = 20 Nov `prices.csv`. "unc" = `uncustomized_price`. After 20 Jan: neighbourhood `final_price`.
- **Occ Δ** = daily `market_occupancy` − `market_occupancy_stly` (points). **Bedroom caveat as before:** the daily P25–P90 mix bedroom counts (1–3 BR for P04/P11/P20/P01/P06; 2–3 BR for P13/P12; 3–5 BR for P05). Only `summary_table` is bedroom-matched. "est. matched" = mixed P50 × (matched P50 ÷ mean daily mixed P50, 22 Nov – 21 Dec). These are **estimates**. Today's ratios: P04 1.09, P11 1.13, P20 1.15, P01 1.17, P06 1.04, P12 0.98, P13 0.96, P05 1.26.
- **Fortnight method:** unchanged (`scratchpad/m20/analyse20.py` → `scratchpad/m21/analyse21.py`). Only changes: the cut-off is now 22 Nov (the first date in `prices.csv`), and nights before the cut-off are skipped. Same 17 Nov event set, same exclusions. Output in `scratchpad/m21/out21.txt`, comparison in `scratchpad/m21/cmp21.py`, block detail in `scratchpad/m21/items21.txt`.

## 1. Submarket table
P25 / **P50 / P75** / P90 (n) = `market.csv` 21 Nov rows (PriceLabs Nearby Listings `summary_table`, bedroom-matched, pulled 07:18–07:20Z). Market occ 30/60 = `market.csv` `market_occ_30/60` (from `pl_kpis.csv` 21 Nov). Our occ = `pl_kpis.csv` `occupancy_next_30/60`.

| Area | Ref | BR | Mkt occ 30/60 (20 Nov) | P25 / **P50 / P75** / P90 £ (n) | P50 20 Nov | Our occ 30/60 (20 Nov) |
|---|---|---|---|---|---|---|
| Camden | P11 | 2 | 51 / 38% (51/38) | 232 / **292 / 335** / 389 (171) | 293 | 47 / 42% (50/43) |
| Shepherd's Bush | P13 | 2 | 47 / 36% (47/37) | 189 / **222 / 271** / 350 (116) | 222 | 70 / 55% (73/57) |
| St John's Wood (4 BR) | P05 | 4 | 49 / 40% (47/39) | 462 / **575 / 700** / 1,232 (91) | 567 | 73 / 58% (73/60) |
| Barking | P04 | 2 | 23 / 18% (23/19) | 139 / **174 / 215** / 249 (89) | 174 | 47 / 37% (50/38) |
| Canary Wharf | P20 | 2 | 38 / 29% (38/30) | 218 / **253 / 321** / 418 (149) | 257 | 70 / 57% (60/53) |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 34 / 27% (34/28) | 219 / **266 / 338** / 430 (144) | 268 | 100 / 100%* |
| Mile End (handback 13 Dec) | P12 | 2 | 45 / 34% (44/34) | 172 / **205 / 235** / 293 (118) | 205 | 80 / 90%* |
| Marylebone (intentional block) | P06 | 2 | 52 / 40% (52/40) | 322 / **418 / 529** / 664 (215) | 414 | 73 / 87%* |
| Primrose Hill (numbers only) | P14 | 1 | 47 / 36% (pl_kpis) | no row | – | 0 / 0% |

\* Inflated by a handback or intentional blocks.
- **The market is flat day on day.** P50 moved by −£4 to +£8 on every row (P05 +8, P20 −4); n moved by at most 1.
- P11 our occ 30 went 50 → 47%: the 27–30 Nov booking (3 n) replaced the cancelled 28 Nov – 2 Dec (4 n).
- There is no `market.csv` row for Greenwich, Bow, Little Venice, Fulham, Kings Langley, Ladbroke Grove, Bayswater, Woolwich, Hanger Lane or Islington (not pulled). The new PriceLabs listing 3588993 "Scott Ellis Gardens" (3 BR, not in `id_map.json`) was not pulled. Its `pl_kpis` row shows market occ 30/60 of 43 / 34%.

## 2. Items in the brief

### New PriceLabs edits since 20 Nov 06:00Z (`get_user_logs`; all by Reyhan, 20 Nov)
| When (Z) | Listing | Change | Live now (`get_listing_date_overrides`) |
|---|---|---|---|
| 21:10:15, then 22:49:39, then 22:49:52 | **P11** 3064196 (+ Vrbo child) | 22 Nov–4 Dec −5% min 3 → 22 Nov–7 Dec −2% min 3 → **22 Nov–7 Dec −2% min 2** | −2% min 2 on 22 Nov–7 Dec (replaces the 18 Nov 3–4 Dec −2%) |
| 22:50:01 | P11 | **14–15 Dec −2% min 2** (16–18 Dec −2% from 18 Nov still live) | darts Round One 14–18 Dec now all −2% |
| 22:50:18 | P11 | **2 Jan–28 Feb −8% min 3** | includes the **darts final 3 Jan** and semi-final 2 Jan (booked) |
| 22:50:45 | **P13** 3064856 + twin 3090701 + Vrbo | **10–26 Dec −2% min 3** | replaces earlier settings on 13–19 Dec (price ÷ unc was 1.04–1.14 yesterday, 0.98–1.06 today; the earlier value is NOT CHECKED) |
| 22:51:49 / 22:51:56 / 22:52:01 / 22:52:14 | **P05** 3166592 | 29 Nov–2 Dec **−5%** min 3 (18 Nov: −2%); 7–8 Dec −1% min 2; 13–14 Dec min 2 (no price); 4–31 Jan −8% min 3 | as logged |
| 22:52:45 → 22:52:57 | P06 3288517 | 23 Nov +20% → **+25%** min 1 | intentional block: numbers only |
| 22:53:42 / 22:53:59 | **P04** 3562176 | 23–26 Dec −5% min 3, then **24–26 Dec +5% min 2** | 20–22 Dec −5% min 3; 23 Dec −5% min 3; 24–26 Dec +5% min 2 |
| 17:29–17:35 | 3588993 Scott Ellis Gardens | base 285→265→285→295, min 170, max 4000, sync ON, min stay 27 Dec 7 / 28 Dec 5 / 29–31 Dec 4 | not mapped (pricelabs section) |

- These are new edits on P11, P13 and P05 that cut prices on event or compressed nights. Under the brief rule they go to Corentin as **confirm or revert**, alongside the 18 Nov list. P05 29 Nov–2 Dec has grown from −2% to −5%, and P11 3–4 Dec −2% is now part of 22 Nov–7 Dec.
- **P04 24–26 Dec +5% min 2 fixes yesterday's min-stay trap.** With min 4 and 27 Dec booked, arrivals on 24–26 Dec could not book. Now 24 → 27 (3 n) and 25 → 27 (2 n) can.

### P11 Camden: the new 27–30 Nov Booking.com sale vs the Camden market (Finals Weekend)
| 3 nights 27–29 Nov | £ | Sale vs it |
|---|---|---|
| **Sale (room)**, made 20 Nov, 7 days out | **538.73** (£179.58/n) | – |
| PriceLabs/Smoobu list on the booking day (20 Nov file: 262 / 268 / 197) | 727 | sale = 0.741 × list |
| Booking.com Standard = ceil(list × 1.15) = 302 / 309 / 227 | 838 | sale = 0.643 × Standard (plan/promotion breakdown: channel section) |
| Daily market 1–3 BR (today's pull): P25 / **P50 / P75** / P90 | 620 / **779 / 972** / 1,298 | **£81 under the mixed P25**; −£240 vs P50 |
| est. matched 2 BR P50 (779 × 1.13) | ≈ 880 | ≈ −£341 |
| Today's PriceLabs on those nights (251 / 257 / 190) | 698 | – |

- Market on those nights: occ **74.0 / 77.1 / 52.4%**, Occ Δ **−5.9 / −2.8 / +1.5**. Camden is busy on Fri/Sat but below STLY. Finals Weekend is a Twickenham event (VENUES: P18/P10/P13/P16, not P11) and does not show up in the Camden market. **Read: the sale sits below the bottom quartile of Camden on 74–77% occupancy nights. The gap comes from the channel stack (0.643 × Standard), not from PriceLabs:** the list was £52 under the mixed P50.
- Commission £123.79 = **23.0%** of room, above the 18% Visibility Booster on Camden to 18 Dec. Channel section to explain.
- **Net of the cancellation (28 Nov – 2 Dec, 4 n, £605.29, commission £135.77, made 13 Nov):** gained 27 Nov, lost 30 Nov and 1 Dec. That is **−1 night, −£66.56 room, −£54.58 after commission**. Whether it is the same party is NOT CHECKED.

### P11 reopened 30 Nov – 2 Dec
| Nights | Ours (yday) | Market P25 / P50 / P75 (mixed); est. matched P50 | Occ Δ (occ) | Read |
|---|---|---|---|---|
| 30 Nov / 1 Dec / 2 Dec (min 2) | 182 / 184 / 209 = **£575** (2 Dec 215; 30 Nov–1 Dec were Booked) | 551 / **718** / 924; ≈ 811 | +3.0 / −2.4 / −4.6 (45 / 41 / 43%) | **£143 under the mixed P50, £24 over P25**, 9–11 days out, Mon–Wed in a market near STLY. Reyhan's −2% (22 Nov–7 Dec) is in the price. The market supports ~P50, not more. |

### P20 Waterford Court 22–24 Nov, 14–18 Dec, 5 / 26 Dec (PriceLabs refresh 20 Nov 09:20Z, stale)
| Block | Ours (yday) | Market P50 / P75 (mixed); est. matched P50 | Occ Δ (occ) | Read |
|---|---|---|---|---|
| 22–24 Nov (min 2) | 288 / 282 / 273 = **£843** (£849). **Smoobu 266 / 266 / 250 = £782** (Dispatcher) | 642 / 810; ≈ 738 | **−13.1 / −5.9 / −12.7** (44–50%) | PriceLabs is £33 over the mixed P75. Smoobu (what is sold) is £28 under P75 and ≈ £44 over the matched P50. Soft market, 1–3 days out. The lower Smoobu price does no harm against this market. Its source: channel/pricelabs sections. |
| 14–18 Dec (min 3) | 303 / 305 / 304 / 307 / 322 = **£1,541** (£1,521) | 1,101 / 1,415; ≈ 1,266 | −10.6 / −9.9 / −7.4 / −7.0 / −5.0 (24–28%) | £126 over the mixed P75 and ≈ £275 over the matched P50, in a market below STLY. Hold. |
| 5 Dec orphan (min 1, +100%) | **512** (528) | P50 228 / P75 295 / P90 396 | +3.8 (54.1%) | 1.29× the mixed P90. Sold and cancelled 20 Nov at **£343.33 room**: that is above the P75 (+£48) and £53 under the P90. The market prices this night at ~£230–400, not £512. Jingle Bell Ball 5–6 Dec (O2). |
| 26 Dec orphan (min 1, +100%) | **543** (571) | P50 251 / P75 324 / P90 415 | +0.2 (35.3%) | 1.31× the P90. Disney On Ice. No compression. A fact for Corentin's confirm/revert. |

### P04 Barking: 20–26 Dec and 6–19 Dec
| Block | Ours (yday) | unc | Market P50 / P75 (mixed); est. matched P50 | Occ Δ (occ) | Read |
|---|---|---|---|---|---|
| **20–26 Dec** (min 3/3/3/3/2/2/2) | 149 / 168 / 166 / 170 / **190 / 192 / 190** = **£1,225** (£1,216) | 1,422 | **1,202 / 1,480**; ≈ 1,310 | +5.2 / +3.3 / +3.0 / +4.5 / +6.2 / **+9.1** / +2.4 (19–29%) | **+£23 over the mixed P50, ≈ £85 under the matched P50, £255 under P75.** 24–26 Dec rose +9 / +15 / +16 (Reyhan +5%). **20 Dec fell 168 → 149 (−£19) with no override change** (−5% since 11 Nov); the cause is NOT CHECKED. The market supports ≈ the matched P50; P75 is not proven at 19–29% occupancy. |
| **6–19 Dec** (min 3, −5%) | **£1,983** (£2,007) | 2,155 | **2,222 / 2,843**; ≈ 2,422 | −5.5 to +5.1; positive on 7–8, 11–13, 18–19 Dec | **£239 under the mixed P50** (yday £220) and ≈ £439 under the matched P50. 13 of 14 nights fell £1–3 overnight. On the Horse Show nights 17–19 Dec (142 / 146 / 151) we are still above the fortnight (136.8). |

### P11 Camden: darts (11 Dec – 3 Jan), Christmas and 3 Jan
Darts schedule (search summary of the PDC/Ally Pally schedule, checked today): Round Two **23 Dec** 12:30 and 19:00; **no play 24–26 Dec**; play resumes 27 Dec; QF 1 Jan, SF 2 Jan, **final Sun 3 Jan 20:00**.

| Nights | Ours (yday) | Market P50 / P75 (mixed); est. matched | Occ Δ (occ) | Read |
|---|---|---|---|---|
| 11–13 Dec | 333 / 340 / 237 Booked | 275 / 265 / 247 | +8.5 / +7.8 / +2.6 | sold |
| **14–17 Dec** (min 2) | 219 / 221 / 229 / 252 = **£921** (£920) | 1,006 / 1,209; ≈ 1,137 | −4.0 / −1.4 / −0.9 / +2.1 (22–29%) | Against the policy level (21 Oct: above £300/n, £1,200) the **gap is £279** (yday £280). £85 under the mixed P50, ≈ £216 under the matched P50. Reyhan −2% now covers 14–18 Dec: confirm or revert. |
| 18 Dec (min 2) | 313 (310) | 280 / 341 | −0.1 | above P50 |
| 19–22 Dec | Booked | – | – | sold |
| **23 Dec** (darts, 2 sessions) | **285** (282) | 286 / 400 | −2.5 (30.1%) | level with the mixed P50; +5% override live |
| 24–25 Dec (no darts) | 256 / 267 (256 / 268) | 293 / 410; 313 / 426 | −6.2 / −10.3 | £83 under the mixed P50 on Christmas nights in a market well below STLY. No event on these nights. |
| 26 Dec – 2 Jan | Booked | – | – | sold |
| **3 Jan** (final, min 3) | **166** (172) | 222 / 280; ≈ 251 | +0.7 (19.2%) | £56 under the mixed P50; £18.6 under the fortnight (184.6). **−£6 from Reyhan's −8% (2 Jan–28 Feb)** on the final night. Confirm or revert. |

### P05 St John's Wood (4 BR)
| Nights | Ours (yday) | unc | 4 BR summary P50 × n; daily 3–5 BR P50 / P75 | Occ Δ | Read |
|---|---|---|---|---|---|
| 29 Nov – 2 Dec (min 3) | 493 / 477 / 472 / 495 = **£1,937** (£1,967) | 2,183 | **2,300**; 1,695 / 2,213 | −3.6 / −4.6 / −6.2 / −8.7 | Override −2% → −5%. £363 under the 4 BR median, £242 over the mixed daily P50, in a market below STLY. |
| **7–8 Dec** (min 2) | 467 / 450 = **£917** (£970, −£53) | 1,191 | **1,150**; 886 / 1,144 | **+8.4** / +3.2 | **£233 under the 4 BR median** (yday £180). The −1% override explains ~£9. Unc fell £47 (1,238 → 1,191). |
| **13–14 Dec** (min 2) | 497 / 482 = **£979** (£1,015, −£36) | 1,239 | **1,150**; 867 / 1,148 | **+14.6 / +7.7** | **£171 under the 4 BR median** on P05's most compressed open night (13 Dec Δ +14.6). There is no price override, yet price ÷ unc fell 0.81 → 0.79. The cause is NOT CHECKED. |
| 21 Dec orphan (+300%, min 1) | **2,010** (2,049) | 650 | 4 BR P90 1,232; daily P90 1,002 | +4.9 | 1.63× the 4 BR P90. Corentin's conflict (is it meant to sell?) is unchanged. |
| 29 Dec orphan (+300%, min 1) | **2,398** (2,540) | 931 | 4 BR P90 1,232; daily P90 1,166 | +3.7 | 1.95× the 4 BR P90. Same. |

### P13 Shepherd's Bush: today, Finals Weekend, December
- **21 Nov (Eng v NZ, today):** Booked (20 Nov file 258). Market occ 71.7%, Δ +1.3, P50 224 / P75 256.
- **27 Nov (Finals Fri, double-header), the only open night 22–30 Nov:** **266** (270), min 1, unc 299, +25% override. Market P50 239 / P75 296, occ 68.6%, **Δ +6.1**. That is £33.2 over the fortnight (232.8) and £30 under P75. 28–29 Nov are Booked (Δ +6.0 / 0.0).
- **1 Dec:** 226 (229), twin 158 (161), min 1. Market P50 228 / P75 289, Δ +2.9. The live override is +25% against the policy +50% (already with Corentin).
- **13–21 Dec (9 open nights): 3064856 209 / 205 / 203 / 207 / 215 / 228 / 234 / 217 / 227 = £1,945 (yday £2,170, −£225); twin £1,845 (£1,914, −£69).** Market P50 £2,112 / P75 £2,658; est. matched ≈ £2,028. Occ Δ +9.9 / +6.5 / −1.3 / +4.3 / +6.9 / +9.2 / **+15.9 / +12.8 / +14.0** (24–49%).
  - **We were £58 over the mixed P50 yesterday and are £167 under it today.** The change came from Reyhan's 10–26 Dec −2% replacing a higher setting on 13–19 Dec, on the most compressed open nights we have (19–21 Dec Δ +13 to +16). Confirm or revert.
  - 19–21 Dec: 234 / 217 / 227 = **£678 vs P50 £738 / P75 £951 (−£60)**; yday −£17.
- **Twins:** identical on 21 Dec (227 / 227) and 1 £ apart on 22 Dec. 20 Dec now differs (217 vs 205). The policy is to keep slightly different prices (fact for the PriceLabs/channel sections).
- 22–31 Dec are Booked or linked-Blocked; 2–12 Dec are Booked or Blocked.

## 3. Demand calendar, next 90 days
**Re-checked 21 Nov 2026 ~07:25Z.** `WebFetch` failed with `ENOTFOUND` for www.alexandrapalace.com and allianzstadiumtwickenham.com. Those hosts must be allowed in the session's network settings, so I stopped trying other venue hosts. **Every event fact below is a WebSearch summary restricted to the venue/organiser domain, checked 21 Nov 2026. None is a page read.**

- **Twickenham (Allianz Stadium)**: [Finals Fri ticketing](https://help.englandrugby.com/support/solutions/articles/103000349981-nations-championship-2026-friday-27th-november-finals-day), [Sat](https://help.englandrugby.com/support/solutions/articles/103000392931-nations-championship-2026-saturday-28th-november-finals-day), [Sun](https://help.englandrugby.com/support/solutions/articles/103000392936-nations-championship-2026-sunday-29th-november-finals-day), [Friday page](https://allianzstadiumtwickenham.com/nations-championship-finals-weekend-friday), [Sunday visit page](https://allianzstadiumtwickenham.com/plan-your-visit/nations-championship-finals-weekend-sunday/essential-information), [Eng v NZ ticketing](https://help.englandrugby.com/support/solutions/articles/103000389096-nations-championship-england-v-new-zealand-saturday-21st-november-2026).
  - **Eng v NZ Sat 21 Nov** (today).
  - **Finals Weekend:**
    - **Fri 27 Nov** 16:40 and 20:10 (ticketing calls the times "approximate"; Myles Smith performs at the 20:10 match per the stadium Friday page).
    - **Sat 28 Nov** 13:10 and 16:40.
    - **Sun 29 Nov** 13:10 and 16:40 per the listings and ticketing. **Conflict:** the stadium's Sunday visit page gives 15:10 and 18:40.
  - Eng v France 14 Feb 2027: **not re-checked today** (20 Nov summary only).
- **World Darts Championship, Alexandra Palace**: [event page](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [schedule](https://www.alexandrapalace.com/blog/all-you-need-to-know-world-darts-championship/), [pdc.tv/WCFAQ](https://www.pdc.tv/WCFAQ), [ticket prices](https://www.pdc.tv/news/2026/august/07/2026-27-paddy-power-world-darts-championship-ticket-prices-confirmed/).
  - **Fri 11 Dec 2026 – Sun 3 Jan 2027** in the Great Hall; "record 180,000 tickets" (ticket capacity, not attendance).
  - **New today: no play 24–26 Dec** (resumes 27 Dec 12:30). 23 Dec: Round Two at 12:30 and 19:00. QF 1 Jan, SF 2 Jan 19:30, **final 3 Jan 20:00**.
  - Conflict persists: the PDC ballot notice says the event ends 4 Jan.
- **The O2 arena**: [listing](https://www.theo2.co.uk/events/venue/the-o2-arena). The summary itself flags inconsistent listings.
  - **Nov:** Bill Bailey 22; **Jungle 24–25**; Squeeze 26 (new today); Jessie Ware 28 (one listing 27); LOTR in Concert 29.
  - **Dec:** Mariah Carey 1–2 (Culture Club also 1–2); Phoebe Bridgers 3; Level 42 4–5; **Jingle Bell Ball 5–6**; later Bryson Tiller, Kehlani, Ocean Colour Scene, Pete Tong 11–12, RnB Winter Ball, The Darkness, Greg Davies, **Kasabian 18**; **Disney On Ice 24 Dec – 3 Jan**.
  - Don Toliver 23 Nov is absent today (unstable). UB40 conflicts (23 vs 30 Nov). The Kehlani / Darkness / Greg Davies dates were not given in today's summary.
- **ExCeL**: [what's on](https://www.excel.london/whats-on), [Horse Show](https://www.excel.london/whats-on/london-international-horse-show), [MegaCon](https://www.excel.london/visitor/whats-on/megacon-live), [Genomics](https://www.excel.london/whats-on/the-festival-of-genomics-biodata-2027).
  - **Nov:** HOMES UK / elementalLONDON / London Build / EMEX **24–26 Nov** (London Build and elementalLONDON 25–26); National Civils / HIX 25–26; Dragonmeet / Nursery Management 27–28.
  - **Dec:** FinTech Connect 1–2; Perfume 10–13; **Horse Show 17–21**; Scrooge Cirque 23–28.
  - **Jan:** **MegaCon 23–24 Jan**; Genomics 27–28 Jan.
  - **Cisco Live 8–12 Feb: not in today's summary** (20 Nov only, not re-checked).
- **NYE fireworks**: [london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026). **Thu 31 Dec 20:00 – 1 Jan 00:30**, ticketed via Ticketmaster only, max 4 per purchase. £40/£55 standard, £20/£35 Londoners. The final batch went on sale 20 Nov 12:00 and the page says it is "now available to buy". No attendance figure is stated.
- **Attendance figures:** none stated in any source checked today.

Effect = market Occ Δ (compression ≥ +5, soft ≤ −2). Properties come from VENUES in `build/properties.py`. P20 is not in VENUES; I grouped it with P01 for O2/ExCeL. VENUES properties that are blocked, handed back or not pulled are named only: O2 P01/P09/P07; ExCeL P01/P07/P15; Ally Pally P08; Twickenham P10/P16/P18. "Ours vs fortnight" = `prices.csv` 21 Nov against the fortnight mean (`out21.txt`).

| Nights | Event | Venue | Open properties | Effect (Occ Δ) | Ours £ vs fortnight £ | Priced by PriceLabs? |
|---|---|---|---|---|---|---|
| 21 Nov | Eng v NZ | Twickenham | P13 booked | P13 +1.3 normal | – (before `prices.csv`) | n/a |
| 22–24 Nov | Bill Bailey 22; Jungle 24–25 | O2 | P20; P04 24 Nov (cannot be booked) | P20 −13.1 / −5.9 / −12.7 soft; P04 −3.3 soft | P20 288 / 282 / 273 vs 278.4 / 278.0 (Smoobu 266 / 266 / 250); P04 **144** vs 175.9 | P20 yes (soft market, above P75); P04 no |
| 24–26 Nov | HOMES UK / London Build / elementalLONDON | ExCeL | P04 booked 22–23 Nov; P20 booked from 25 Nov | – | – | – |
| 27 Nov | Finals Fri | Twickenham | P13 | **+6.1 compression** | 266 vs 232.8 | **yes** |
| 27–29 Nov | Finals Weekend | Twickenham (P11 Camden not in VENUES) | P13 booked 28–29; P11 sold 27–29 | P13 +6.0 / 0.0; P11 −5.9 / −2.8 / +1.5 | P11 sale £179.58/n vs list 242 | P11 list yes; **the sale went through the channel stack at 0.64 × Standard** |
| 5–6 Dec | Jingle Bell Ball | O2 | P20 5 Dec; P04 6 Dec | P20 +3.8; P04 −2.6 | P20 512 vs 303.1; P04 **140** vs 164.9 | P20 yes (manual +100%); P04 no |
| 8 Dec | Kehlani (unstable) | O2 | P04 | +1.4 | **140** vs 157.7 | no |
| 11–13 Dec | Darts opens; Pete Tong 11–12; RnB Winter Ball | Ally Pally / O2 | P11 booked; P04 | P11 +8.5 / +7.8 / +2.6; P04 +2.4 / +2.0 / +2.9 | P04 148 / 149 / **140** vs 151.7 | no (not in the headline set) |
| 14–18 Dec | Darts Round One; Darkness / Greg Davies / Kasabian 18 | Ally Pally / O2 | P11; P04; P20 | P11 −4.0 / −1.4 / −0.9 / +2.1 / −0.1 soft-normal | P11 **219 / 221 / 229 / 252** vs 288.4; 18 Dec 313 | no (−2% override live 14–18 Dec) |
| 16–19 Dec | Horse Show 17–21 | ExCeL | P04; P20 16–18 | P04 −1.5 / −0.4 / +3.2 / +5.1; P20 −7.4 / −7.0 / −5.0 | P04 140 / 142 / 146 / 151 vs 136.8; P20 **304 / 307** / 322 vs 310.1 | P04 yes; P20 already above the mixed P75 in a soft market |
| 13–21 Dec | pre-Christmas, darts | London | P13 | −1.3 … **+15.9** | £1,945 vs P50 £2,112 | **no since the overnight −2% (−£225)** |
| 20–26 Dec | Christmas; Disney On Ice from 24; Scrooge Cirque 23–28 | O2 / ExCeL | **P04 (7 n open)** | +2.4 to +9.1 | £175.0/n vs fortnight 141.8 | yes vs the fortnight; ≈ £85 under the est. matched P50 |
| 23 Dec | Darts Round Two | Ally Pally | P11 | −2.5 soft | **285** vs 292.8 | level |
| 24–25 Dec | Christmas (**no darts**) | – | P11 | −6.2 / −10.3 soft | 256 / 267 vs 292.8 | n/a: no event |
| 26 Dec | Disney On Ice | O2 | P20 | +0.2 | 543 vs 309.4 | yes (manual +100%) |
| 27 Dec – 2 Jan | NYE 31 Dec; darts | Embankment / Ally Pally | P04, P11, P13, P20 all booked | P11 −12.8 to +8.9 | – | – |
| 3 Jan | Darts final | Ally Pally | P11 | +0.7 | **166** vs 184.6 | no (−8% override live) |
| 23–24 Jan | MegaCon | ExCeL | P20 | (final_price) | 257 / **243** vs 254.4 | 24 Jan no (too early) |
| 8–12 Feb | Cisco Live (not re-checked) | ExCeL | P20, P04 | – | P20 266 / 260 / 253 / 250 / 274 vs 260.0; P04 162 / 162 / 160 / 158 / 169 vs 161.7 | level (too early) |
| 14 Feb | Eng v France (not re-checked) | Twickenham | P13 | – | 193 vs 193.6 | level (too early) |

## 4. Missed compression: open nights on events priced at or below the fortnight
Same rebuilt method and 17 Nov event set as 18–20 Nov, nights to 17 Jan. Today's `prices.csv`; 20 Nov values in brackets.

| Ref | Night(s) | Event | Ours 21 Nov (20 Nov) | Fortnight £ (20 Nov) | Gap £ (20 Nov) |
|---|---|---|---|---|---|
| P04 | 24 Nov | Jungle (cannot be booked) | 144 (145) | 175.9 (178.3) | 31.9 (33.3) |
| P04 | 6 Dec | Jingle Bell Ball | 140 (141) | 164.9 (162.8) | 24.9 (21.8) |
| P04 | 8 Dec | Kehlani (unstable listing) | 140 (140) | 157.7 (155.0) | 17.7 (15.0) |
| **P20** | **24 Nov** | Jungle (**joined**) | 273 (276) | 278.0 (273.1) | 5.0 (–) |
| P20 | 16 Dec | Darkness / Horse Show | 304 (301) | 310.1 (317.8) | 6.1 (16.8) |
| P20 | 17 Dec | Greg Davies / Horse Show | 307 (305) | 310.1 (317.8) | 3.1 (12.8) |
| **P11** | **14–17 Dec** | Darts Round One | **219, 221, 229, 252** (219, 222, 229, 250) | **288.4** (288.4) | **69.4, 67.4, 59.4, 36.4** (69.4, 66.4, 59.4, 38.4) |
| P11 | 23, 24, 25 Dec | Darts (24–25: no play, see below) | 285, 256, 267 (282, 256, 268) | 292.8 (292.0) | 7.8, 36.8, 25.8 (10.0, 36.0, 24.0) |
| P11 | 3 Jan | Darts final | 166 (172) | 184.6 (192.0) | 18.6 (20.0) |
| | | **Total, same event set** | | | **14 nights / £410** (20 Nov **14 / £425**) |
| | | Bookable under current min-stay (excl. P04 24 Nov) | | | **13 / £378** (20 Nov 13 / £392) |
| | | Excl. P11 24–25 Dec (no darts, verified today) | | | **12 / £348** |
| | | Excl. P04 24 Nov, P04 8 Dec and P11 24–25 Dec | | | 10 / £298 |

**Change vs yesterday: 0 nights / −£14.8** (425.1 → 410.3).
- **Joined, 1 night, +£5.0:** P20 24 Nov. The price went 276 → 273 and its fortnight 273.1 → 278.0.
- **Left, 1 night, −£1.8:** P20 18 Dec. The price went 316 → 322 and its fortnight 317.8 → 310.1; it is now £11.9 above.
- **Changed, 13 nights, −£18.0.** Our prices net £0.0 (P11 3 Jan −6, P04 −1/−1, P11 15 and 25 Dec −1; against P11 17 Dec +2, 23 Dec +3, P20 16–17 Dec +3/+2). The fortnight drift is −£18.0:
  - P20 −7.7 × 2: neighbouring nights re-priced in the 20 Nov 09:20Z file.
  - P11 3 Jan −7.4: Reyhan's −8% on the January neighbours.
  - P04 +2.4 and P11 23–25 Dec +2.4.
- Sum: 5.0 − 1.8 − 18.0 = **−14.8**. Matches.
- **Not counted:**
  - P04 11–13 Dec (not in the 17 Nov set; gaps 3.7 / 2.7 / 11.7).
  - Beyond 17 Jan (final_price; too early): P20 24 Jan 11.4; P20 9–11 Feb 0 / 7.0 / 10.0; P04 10–11 Feb 1.7 / 3.7; P13 14 Feb 0.6.

**Read with care:**
- **£233 of the £410 is P11 Round One (14–17 Dec)**, in a market at or below STLY (Δ −4.0 to +2.1). The real reference there is the policy level (£1,200 vs £921, gap £279), not the market.
- **P11 24–25 Dec (£62.6) are no-play nights** per today's schedule summary. They stay in the headline only for comparability.
- P20 16–17 Dec (£9) are already above the mixed P75 in a market below STLY. They are mechanical, not a real miss.
- **The real money items are in §2, outside this headline:**
  - **P13 13–21 Dec is now £167 under the mixed P50** on Δ up to +15.9 (−£225 overnight from Reyhan's −2% edit).
  - P04 6–19 Dec is £239 under the mixed P50.
  - P05 7–8 Dec is £233 and 13–14 Dec £171 under the 4 BR median (13 Dec Δ +14.6).
  - P11 27–29 Nov sold at £81 under the Camden P25 on 74–77% occupancy nights (channel stack).
  - P04 20–26 Dec is ≈ £85 under the matched P50.

Data gaps:
1. Market figures are PriceLabs Nearby Listings only (Airbnb-derived, `cleaning_fee` null, summary horizon unstated). Daily percentiles mix bedroom counts, and "est. matched" figures are ratio estimates. No Market Dashboard or Competitor Listings were pulled. P09/P14, P02/P03/P07/P08/P10/P15–P19 and the new 3588993 Scott Ellis Gardens were not pulled.
2. P20 `prices.csv` is from the stale 20 Nov 09:20Z refresh. Smoobu 22–24 Nov is £61 under PriceLabs (source: channel/pricelabs sections). For the other listings I infer from timestamps that Reyhan's edits are included.
3. Causes NOT CHECKED:
   - P04 20 Dec −£19 with an unchanged −5% override.
   - P05 13–14 Dec −£36 with no price override, and 7–8 Dec −£53 (only ~£9 explained by −1%).
   - The value of the P13 13–19 Dec setting that the 20 Nov −2% replaced.
   - Whether the P11 27–30 Nov rebooking is the same party as the cancelled 28 Nov – 2 Dec stay.
   - The P11 Booking.com plan/promotion breakdown and the 23.0% commission (channel section).
4. Events are domain-restricted search summaries, not page reads. www.alexandrapalace.com and allianzstadiumtwickenham.com (ENOTFOUND today) and www.pdc.tv (ENOTFOUND 19–20 Nov) must be allowed in the session's network settings.
   - Conflicts: Finals Sunday kick-offs 13:10/16:40 vs 15:10/18:40; darts end 3 vs 4 Jan; Jessie Ware 27 vs 28 Nov; UB40 23 vs 30 Nov; Phoebe Bridgers 3 vs 1–2 Dec.
   - Unstable O2 listings: Don Toliver (absent today), Kehlani 8 Dec, Kasabian 18 Dec.
   - Not re-checked today: Eng v France 14 Feb and Cisco Live 8–12 Feb.
   - Winter Wonderland was not checked (its VENUES flats are blocked or not pulled).
