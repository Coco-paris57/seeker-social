# Market & demand calendar: run D = 2026-11-20 (window 21 Nov 2026 – 18 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Kept out of findings: P02/P03/P06/P07 intentional blocks (P06 numbers only); handbacks (P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec); P14 numbers only; P13 = one flat (3064856 + 3090701); P20 20–22 Nov delivery block; 15%/20% stay discounts, Booking.com booster, +15% Booking.com markup, P04 2 Dec +200%, P13 1 Dec +50% (intentional_overrides).
- **PriceLabs calls today — all read-only, strictly one at a time (no batch):**
  - `get_neighbourhood_data` (detail, future prices + occupancy), 07:18–07:21Z, in order P04 3562176, P13 3064856, P11 3064196, P05 3166592, P20 3547481, P12 2699998, P01 3320302, P06 3288517. Each file checked (listing_id match, 540 days, `all_operations_ok=true`, source NL) and saved to `scratchpad/m20/neigh_<id>.json`.
  - `get_user_logs` (listing, 19–20 Nov): **1 entry** (below).
  - `get_listing_date_overrides` P04, 20 Nov – 10 Jan: **unchanged** (latest `updated_at` 11 Nov 17:16Z; Christmas −5%, min 3/3/3/4/4/4/4 on 20–26 Dec; 27 Dec min 7).
- **`market.csv`:** `data/snapshots/2026-11-20/market.csv` did not exist. Copied forward from 2026-11-19 (16 rows) and 8 rows dated 20 Nov appended under `.market.csv.lock` (25 lines; `scratchpad/m20/wmarket20.py`). The 20 Nov rows are used below.
- **Prices:** `prices.csv` 20 Nov `pricelabs_price` (21 Nov – 19 Jan). P04/P05/P13/P20/P06 are from the **19 Nov ~09:22–10:56Z** refresh (not yet today); P11 from 20 Nov 00:30Z. After 19 Jan: neighbourhood `final_price`. "unc" = `uncustomized_price` (`raw/prices_<id>.json`). "yday" = 19 Nov `prices.csv`.
- **Occ Δ** = daily `market_occupancy` − `market_occupancy_stly` (points). **Bedroom caveat** as yesterday: daily P25–P90 mix bedrooms (1–3 BR P04/P11/P20/P01/P06; 2–3 BR P13/P12; 3–5 BR P05). Only `summary_table` is bedroom-matched. Ratio matched P50 ÷ mean daily mixed P50, 21 Nov – 20 Dec (**estimate**): P04 1.09, P11 1.14, P20 1.17, P01 1.18, P06 1.03, P12 0.98, P13 0.97, P05 1.26. "est. matched" figures apply these.
- **Fortnight method:** unchanged rebuilt method (`scratchpad/m19/analyse19.py` → `scratchpad/m20/analyse20.py`); only change: cut-off now 21 Nov (first date in `prices.csv`). Same 17 Nov event set, same exclusions. Output `scratchpad/m20/out20.txt`; comparison `scratchpad/m20/cmp.py`; block detail `scratchpad/m20/items20.txt`.

## 1. Submarket table
P25 / **P50 / P75** / P90 (n) = `market.csv` 20 Nov rows (PriceLabs Nearby Listings `summary_table`, bedroom-matched, pulled 07:18–07:21Z). Market occ 30/60 = `market.csv` `market_occ_30/60` (from `pl_kpis.csv` 20 Nov). Our occ = `pl_kpis.csv` `occupancy_next_30/60`.

| Area | Ref | BR | Mkt occ 30/60 (19 Nov) | P25 / **P50 / P75** / P90 £ (n) | P50 19 Nov | Our occ 30/60 (19 Nov) |
|---|---|---|---|---|---|---|
| Camden | P11 | 2 | 51 / 38% (50/38) | 232 / **293 / 335** / 388 (171) | 292 | 50 / 43% (47/43) |
| Shepherd's Bush | P13 | 2 | 47 / 37% (47/37) | 191 / **222 / 273** / 350 (117) | 221 | 73 / 57% (77/58) |
| St John's Wood (4 BR) | P05 | 4 | 47 / 39% (46/39) | 453 / **567 / 695** / 1,231 (92) | 565 | 73 / 60% (73/62) |
| Barking | P04 | 2 | 23 / 19% (23/19) | 139 / **174 / 215** / 249 (89) | 173 | 50 / 38% (47/37) |
| Canary Wharf | P20 | 2 | 38 / 30% (38/30) | 219 / **257 / 322** / 427 (149) | 256 | 60 / 53% (67/57) |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 34 / 28% (34/28) | 221 / **268 / 338** / 434 (145) | 267 | 100 / 100%* |
| Mile End (handback 13 Dec) | P12 | 2 | 44 / 34% (43/34) | 172 / **205 / 234** / 293 (119) | 206 | 80 / 90%* |
| Marylebone (intentional block) | P06 | 2 | 52 / 40% (51/40) | 321 / **414 / 529** / 664 (215) | 410 | 90 / 95%* |
| Primrose Hill (numbers only) | P14 | 1 | 47 / 36% (pl_kpis) | no row | – | 0 / 0% |

\* Inflated by handback or intentional blocks. P20 "our occ" fell 67→60% although a booking was added: PriceLabs has not registered the 19–22 Nov stay (21 Nov shows open, §2).
- **Market flat day on day:** P50 moved −£1 to +£4 on every row; n moved by at most 1.
- No `market.csv` row for Greenwich, Bow, Little Venice, Fulham, Kings Langley, Ladbroke Grove, Bayswater, Woolwich, Hanger Lane or Islington (no pull).

## 2. Items in the brief

### New PriceLabs edits since 19 Nov 06:00Z (`get_user_logs`)
| When | Who | Listing | Change |
|---|---|---|---|
| 19 Nov 10:55:50Z | Reyhan | **P06 Marylebone** 3288517 | DSO 24 Nov – 5 Dec, price_type fixed (no value in log), min 3 |

- P06 is an intentional block: numbers only. In `prices.csv` 30 Nov – 5 Dec changed from `Blocked` to blank status (still `available=False`), min 3 throughout; 30 Nov–5 Dec prices 324/363/376/388/432/472 (yday 311/349/348/371/479/474). Whether the block was lifted on purpose is for Corentin (not a market call).
- **No new edits on P04, P05, P11, P13 or P20.** Reyhan's 18 Nov edits (P13 1 Dec +25%, P11 darts −2%, P05 29 Nov–2 Dec −2%, P11 3–4 Dec −2%, P20 5/26 Dec +100%) are still live — confirm/revert stays with Corentin.

### P20: the 19–22 Nov Airbnb sale vs the market
| 3 nights 19–22 Nov | £ | Sale vs it |
|---|---|---|
| **Sale (room)**, booked 19 Nov (same-day) | **714.55** (£238.18/n) | – |
| PriceLabs list on the booking day (292 [19 Nov, 18 Nov file] / 334 / 282) | 908 | sale = 0.787 × list |
| List × 0.85 (Airbnb last-minute 15%, policy `listing_facts.P20.airbnb_discounts_22oct`) | 771.80 | −57.25 (channel section) |
| Daily market 1–3 BR, 19 Nov pull: P25 / **P50 / P75** / P90 | 555 / **649 / 848** / 1,136 | **+65.55 over P50**; −133.45 vs P75 |
| est. matched 2 BR P50 (649 × 1.16) | ≈ 753 | ≈ −38 |

- Market on those nights (19 Nov pull): occ 59.4 / 57.4 / 56.3%, **Occ Δ −1.3 / −6.6 / −8.6** (today's pull for 20–21 Nov: −8.5 / −10.8). Below STLY, same-day booking: the sale is above the mixed median in a soft market. Read: fair for the market; the only open question is the extra ~7% beyond the last-minute 15% (channel section).
- **Double-sell risk:** `prices.csv` 20 Nov shows **21 Nov `available=True`, status blank, £351** (yday 282; unc 295), min 3. The night is inside the confirmed Smoobu Airbnb stay 19–22 Nov. PriceLabs (refresh 19 Nov 09:23Z) has not registered it; whether Smoobu/Booking.com still sell 21 Nov is NOT CHECKED here (channel section).
- 20–21 Nov = policy delivery block; a guest is now in 19–22 Nov. Whether the delivery still happens is for Corentin.

### P20 22–24 Nov, 14–18 Dec, 5 / 26 Dec
| Block | Ours (yday) | Market P50 / P75 (mixed); est. matched P50 | Occ Δ (occ) | Read |
|---|---|---|---|---|
| 22–24 Nov (min 2) | 290 / 283 / 276 = **£849** (£854) | 643 / 823; ≈ 752 | **−11.6 / −5.6 / −11.2** (40–48%) | +£26 over the mixed P75 and ≈ +£97 over matched P50, 2–4 days out, market below STLY; Nov 2025 median booking window 9 d (`market_history`). No case to raise; the market does not show demand to fill it at this level either. |
| 14–18 Dec (min 3) | 298 / 301 / 301 / **305** / 316 = **£1,521** (£1,550) | 1,105 / 1,422; ≈ 1,293 | −9.5 / −8.7 / −6.8 / −6.7 / −4.7 (24–27%) | £99 over mixed P75, ≈ £228 over matched P50, in a market softer than STLY. 17 Dec fell 332→305 (−£27, 19 Nov refresh) and now mechanically enters §4; not a real miss. Hold. |
| 5 Dec orphan (min 1, +100%) | **528** (531) | P50 229 / P75 297 / P90 409 | +3.2 (52.7%) | 1.29× the mixed P90; 2.05× the 2 BR summary P50 (257). Jingle Bell Ball (O2) 5–6 Dec. |
| 26 Dec orphan (min 1, +100%) | **571** (569) | P50 254 / P75 326 / P90 431 | +0.1 (34.5%) | 1.32× the P90; Disney On Ice. No compression in the market at this level. Fact for Corentin's confirm/revert. |

### P04 Barking: 20–26 Dec and 6–19 Dec
| Block | Ours (yday) | unc | Market P50 / P75 (mixed); est. matched P50 | Occ Δ (occ) | Read |
|---|---|---|---|---|---|
| **20–26 Dec** (min 3/3/3/4/4/4/4, −5%) | 168/171/168/177/181/177/174 = **£1,216** (£1,233) | 1,507 | **1,197 / 1,482**; ≈ 1,305 | +4.7 / +3.2 / +3.0 / +4.5 / +6.2 / **+9.1** / +2.4 (19–29%) | **+£19 over mixed P50, ≈ £89 under matched P50, £266 under P75.** Fell £17 in the 19 Nov refresh while market Δ stayed positive. price ÷ unc 0.807 (yday 0.805). 30–36 days out vs Dec 2025 booking window 19 d. Market supports at least the matched P50 (≈ +£89 on the block); P75 not proven at 19–29% occupancy. Min-stay note: with 27 Dec booked, arrivals 24–26 Dec cannot meet min 4; 23–26 Dec sell only inside a stay ending 27 Dec. |
| **6–19 Dec** (min 3, −5%) | **£2,007** (£2,048) | 2,291 | **2,227 / 2,852**; ≈ 2,427 | −6.2 to +4.5; positive 8, 11–13, 18–19 Dec | **£220 under the mixed P50** (yday £176) and ≈ £420 under matched. 19 Dec fell 175→153. Horse Show nights 17–19 Dec (144/149/153) are still above the fortnight (138.8). |

### P11 Camden: darts (11 Dec – 3 Jan) and 3 Jan
| Nights | Ours (yday) | Market P50 / P75 (mixed); est. matched | Occ Δ (occ) | Read |
|---|---|---|---|---|
| 11–13 Dec | 337 / 343 / 238 Booked | 275 / 266 / 247 | +10.4 / +9.7 / +3.6 | sold |
| **14–17 Dec** (min 3/3/2/2) | 219 / 222 / 229 / 250 = **£920** (£916) | 1,009 / 1,212; ≈ 1,150 | −4.0 / −1.4 / −1.1 / +1.7 (22–29%) | Policy level (21 Oct: above £300/n) £1,200 → **gap £280** (yday £284). £89 under mixed P50, ≈ £230 under matched. Reyhan −2% still live: confirm or revert. |
| 18 Dec (min 2) | 310 (313) | 281 / 342 | −0.9 | above P50 |
| 19–22 Dec | Booked (355 / 289 / 255 / 251) | – | – | sold |
| 23–25 Dec (min 2) | 282 / 256 / 268 = **£806** (£821) | 894 / 1,245; ≈ 1,019 | −3.3 / −6.6 / −10.3 | £88 under mixed P50 in a market below STLY; play on 24–26 Dec UNVERIFIED. |
| 26 Dec – 2 Jan | Booked | – | – | sold |
| **3 Jan** (final, min 3) | **172** (172) | 223 / 280; ≈ 254 | +1.1 (19.6%) | £51 under mixed P50; £20 under the fortnight (192.0); unc 189. |

### P05 St John's Wood (4 BR)
| Nights | Ours (yday) | unc | 4 BR summary P50 × n; daily 3–5 BR P50 / P75 | Occ Δ | Read |
|---|---|---|---|---|---|
| 7–8 Dec (min 2) | 484 / 486 = **£970** (£950) | 1,238 | **1,134**; 879 / 1,135 | +6.5 / +1.1 | **£164 under the 4 BR median** (yday £180); unc £268 above price (cause NOT CHECKED). |
| 13–14 Dec (min 2) | 515 / 500 = **£1,015** (£1,019) | 1,229 | **1,134**; 865 / 1,145 | **+13.5 / +6.8** | £119 under the 4 BR median on P05's most compressed open night. |
| 21 Dec orphan (+300%, min 1) | **2,049** (2,038) | 642 | 4 BR P90 1,231; daily P90 912 | +4.5 | 1.66× the 4 BR P90. Conflict for Corentin unchanged (meant to sell?). |
| 29 Dec orphan (+300%, min 1) | **2,540** (2,536) | 959 | 4 BR P90 1,231; daily P90 1,078 | +3.2 | 2.06× the 4 BR P90. Same. |

### P13 Shepherd's Bush: this weekend, Finals Weekend, December
- **21 Nov (Eng v NZ):** Booked (258). Market occ 69.1%, Δ +0.5.
- **27 Nov (Finals Weekend Fri), only open night 21–29 Nov:** **270** (272), min 1, unc 309. Market P50 238 / P75 295, occ 68.3%, **Δ +7.3** (yday +13.5). Above the fortnight (237.2) by £32.8, £25 under P75. 28–29 Nov Booked.
- **1 Dec:** 229 (232), twin 3090701 161 (163), min 1. Market P50 227 / P75 290, Δ +0.8. Live override +25% vs policy +50% (confirm/revert already with Corentin).
- **13–21 Dec (9 open nights):** 3064856 240/235/232/237/245/260/266/222/233 = **£2,170** (£2,168); twin **£1,914** (£2,020, −£106 overnight). Market P50 £2,103 / P75 £2,656; est. matched ≈ £2,040. Occ Δ +8.8 / +4.8 / −3.0 / +2.5 / +5.0 / +7.4 / **+14.7 / +11.3 / +13.3**.
- **19–21 Dec:** 266 / 222 / 233 = **£721 vs P50 £738 / P75 £949 (−£17)** on the most compressed open nights.
- **Twins identical again on 20–21 Dec (222 / 233 on both)**; 19 Dec now differs (266 vs 226). Policy: keep slightly different prices. Fact for the PriceLabs/channel sections.
- 22–31 Dec Booked or linked-Blocked; 2–12 Dec Booked or Blocked.

## 3. Demand calendar, next 90 days
**Re-checked 20 Nov 2026 ~07:23Z.** `WebFetch` to www.pdc.tv failed again with `ENOTFOUND` (host must be allowed in the session's network settings; other venue hosts not retried). Every event fact below is a **WebSearch summary restricted to the venue/organiser domain, checked 20 Nov 2026, not a page read.**

- **Twickenham (Allianz Stadium)** — [stadium essential info](https://allianzstadiumtwickenham.com/plan-your-visit/england-v-new-zealand-nations-championship-pool-match/essential-information), [England Rugby preview](https://www.englandrugby.com/follow/news-and-media/england-v-new-zealand-preview-2026-nations-championship), [ticketing](https://help.englandrugby.com/support/solutions/articles/103000389096-nations-championship-england-v-new-zealand-saturday-21st-november-2026), [Finals Weekend](https://allianzstadiumtwickenham.com/nations-championship).
  - **England v New Zealand Sat 21 Nov**; kick-off conflict persists: 14:10 GMT (preview) vs 14:50 (stadium/ticketing).
  - **Finals Weekend Fri 27 – Sun 29 Nov** (six fixtures): Sat & Sun 13:10 / 16:40; Friday double-header (times not in today's summary).
  - **England v France Sun 14 Feb 2027**, 15:10 GMT per sixnationsrugby.com ([stadium](https://allianzstadiumtwickenham.com/england-v-france-guinness-mens-six-nations-2027), [ticketing](https://help.englandrugby.com/support/solutions/articles/103000411510-guinness-men-s-six-nations-england-v-france-sunday-14th-february-2027)); ticketing says kick-off TBC.
- **World Darts Championship, Alexandra Palace** — [alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv ticket prices](https://www.pdc.tv/news/2026/august/07/2026-27-paddy-power-world-darts-championship-ticket-prices-confirmed/), [pdc.tv/WCFAQ](https://www.pdc.tv/WCFAQ).
  - **Fri 11 Dec 2026 – Sun 3 Jan 2027**, final 3 Jan; Great Hall; "record 180,000 tickets available" (ticket capacity as stated, not attendance).
  - Conflicts: PDC register/ballot pages say to 4 Jan; today's FAQ summary puts Round One from **Fri 11 Dec** to Sat 19 Dec (19 Nov summary: 14–19 Dec; 18 Nov: from 13 Dec). No-play 24–26 Dec: still UNVERIFIED (the summary infers it from absence only).
- **The O2 arena** — [listing](https://www.theo2.co.uk/events/venue/the-o2-arena) (summary of listing pages; the summary itself flags conflicts/placeholders).
  - Nov: Good Charlotte 20; Myles Smith 21; Bill Bailey 22; **Don Toliver 23**; **Jungle 24–25**; Jessie Ware 28; LOTR in Concert 29.
  - Dec: Mariah Carey / UB40 1–2 (conflict); Level 42 4–5; **Jingle Bell Ball 5–6**; Bryson Tiller 7; **Kehlani 8**; Ocean Colour Scene 9; Mo Gilligan 10; Pete Tong 11–12; RnB Winter Ball 13; McLaren LIVE 14; The Darkness 16; Greg Davies 17; **Kasabian 18**; **Disney On Ice 24 Dec – 3 Jan**.
  - Don Toliver, Kehlani 8 Dec and Kasabian were absent from yesterday's summary and are back today: treat as **listed, unstable** (kept UNVERIFIED in the §4 headline labels for comparability).
- **ExCeL** — [what's on](https://www.excel.london/whats-on), [Horse Show](https://www.excel.london/whats-on/london-international-horse-show), [MegaCon](https://www.excel.london/whats-on/megacon-live), [elementalLONDON](https://www.excel.london/whats-on/elementallondon-2026).
  - Nov: HOMES UK / London Build / elementalLONDON / National Civils **25–26 Nov** (yesterday's summary had HOMES UK 24–25: conflict).
  - Dec: FinTech Connect 1–2; Perfume Exhibition 10–13; **Horse Show 17–21**; Scrooge Cirque 23–28.
  - Jan–Feb: **MegaCon 23–24 Jan**; Genomics 27–28 Jan; **Cisco Live 8–12 Feb**.
- **NYE fireworks** — [london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026): Thu 31 Dec, ticketed (Ticketmaster only, max 4); £20/£35 Londoners, £40/£55 others; **final release today, Fri 20 Nov 12:00**. No attendance figure stated.
- **Attendance figures:** none stated in any source checked today (darts 180,000 is tickets available).

Effect = market Occ Δ (compression ≥ +5, soft ≤ −2). Properties from VENUES in `build/properties.py` (P20 not in VENUES; grouped with P01 for O2/ExCeL). VENUES properties blocked, handed back or without a PriceLabs pull are named only: O2 P01/P09/P07; ExCeL P01/P07/P15; Ally Pally P08; Twickenham P10/P16/P18. Ours vs fortnight = `prices.csv` 20 Nov vs the fortnight mean (`out20.txt`).

| Nights | Event | Venue | Open properties | Effect (Occ Δ) | Ours £ vs fortnight £ | Priced by PriceLabs? |
|---|---|---|---|---|---|---|
| 21 Nov | Eng v NZ; Myles Smith | Twickenham / O2 | P13 booked; P20 sold (19–22 Nov) but **shown open** in PriceLabs | P13 +0.5; P20 −10.8 soft | P20 351 vs 278.4 (sold night) | n/a |
| 22–24 Nov | Bill Bailey 22; Don Toliver 23 (unstable); Jungle 24–25 | O2 | P20; P04 24 Nov (cannot be booked) | P20 −11.6 / −5.6 / −11.2; P04 −1.6 soft | P20 290 / 283 / 276 vs 273.6 / 273.1; P04 **145** vs 178.3 | P20 yes (soft market, above P75); P04 no |
| 25–26 Nov | HOMES UK / London Build / elementalLONDON | ExCeL | P04 booked 21–23; P20 booked from 25 | – | – | – |
| 27 Nov | Finals Weekend Fri | Twickenham | P13 | **+7.3 compression** | 270 vs 237.2 | **yes** |
| 28–29 Nov | Finals Weekend | Twickenham | P13 booked | +6.4 / −1.8 | – | – |
| 5–6 Dec | Jingle Bell Ball (+ Level 42 5 Dec) | O2 | P20 5 Dec; P04 6 Dec | P20 +3.2; P04 −1.7 | P20 528 vs 299.1; P04 **141** vs 162.8 | P20 yes (manual +100%); P04 no |
| 8 Dec | Kehlani (unstable) | O2 | P04 | +0.8 | **140** vs 155.0 | no |
| 11–13 Dec | Darts opens; Pete Tong; RnB Winter Ball | Ally Pally / O2 | P11 booked; P04 | P11 +10.4 / +9.7 / +3.6; P04 +2.4 / +2.7 / +2.9 | P04 150 / 152 / **142** vs 147.7 | 11–12 yes; 13 no (not in headline set) |
| 14–19 Dec | Darts Round One; McLaren / Darkness / Greg Davies / Kasabian | Ally Pally / O2 | P11 14–18; P04; P20 14–18 | P11 −4.0 / −1.4 / −1.1 / +1.7 / −0.9 soft | P11 **219 / 222 / 229 / 250** vs 288.4; 18 Dec 310 | no (−2% override live) |
| 16–19 Dec | Horse Show 17–21 | ExCeL | P04 16–19; P20 16–18 | P04 −0.2 / −0.4 / +3.2 / +4.5; P20 −6.8 / −6.7 / −4.7 | P04 141 / 144 / 149 / 153 vs 138.8; P20 **301 / 305 / 316** vs 317.8 | P04 yes; P20 already above mixed P75 in a soft market |
| 13–21 Dec | pre-Christmas, darts | London | P13 | −3.0 … **+14.7** | £2,170 vs P50 £2,103 | partly (19–21 Dec £17 under P50) |
| 20–26 Dec | Christmas; Disney On Ice from 24; Scrooge Cirque 23–28 | O2 / ExCeL | **P04 (7 n open)** | +2.4 to +9.1 | £173.7/n vs fortnight 143.4 | yes vs fortnight; ≈ £89 under est. matched P50 |
| 23–25 Dec | Darts (play UNVERIFIED) | Ally Pally | P11 | −3.3 / −6.6 / −10.3 soft | **282 / 256 / 268** vs 292.0 | no |
| 26 Dec | Disney On Ice | O2 | P20 | +0.1 | 571 vs 321.7 | yes (manual +100%) |
| 27 Dec – 2 Jan | NYE 31 Dec; darts | Embankment / Ally Pally | P04, P11, P13, P20 all booked | P11 −12.4 to +8.9 | – | – |
| 3 Jan | Darts final | Ally Pally | P11 | +1.1 | **172** vs 192.0 | no |
| 23–24 Jan | MegaCon | ExCeL | P20 | (final_price) | **253 / 238** vs 259.6 | no (too early) |
| 8–12 Feb | Cisco Live | ExCeL | P20, P04 | – | P20 265/261/257/251/273 vs 259.3; P04 163/162/161/158/170 vs 162.5 | level (too early) |
| 14 Feb | Eng v France | Twickenham | P13 | – | 194 vs 193.7 | level (too early) |

## 4. Missed compression: open nights on events priced at or below the fortnight
Same rebuilt method and 17 Nov event set as 18–19 Nov, nights to 17 Jan. Today's `prices.csv`; 19 Nov values in brackets.

| Ref | Night(s) | Event | Ours 20 Nov (19 Nov) | Fortnight £ (19 Nov) | Gap £ (19 Nov) |
|---|---|---|---|---|---|
| P04 | 24 Nov | Jungle (cannot be booked) | 145 (135) | 178.3 (170.5) | 33.3 (35.5) |
| P04 | 6 Dec | Jingle Bell Ball | 141 (143) | 162.8 (155.7) | 21.8 (12.7) |
| P04 | 8 Dec | Kehlani (unstable listing) | 140 (142) | 155.0 (150.0) | 15.0 (8.0) |
| P20 | 16 Dec | Darkness / Horse Show | 301 (303) | 317.8 (317.5) | 16.8 (14.5) |
| P20 | **17 Dec** | Greg Davies / Horse Show (**joined**) | 305 (332) | 317.8 (317.5) | 12.8 (–) |
| P20 | 18 Dec | Kasabian / Horse Show | 316 (314) | 317.8 (317.5) | 1.8 (3.5) |
| **P11** | **14–17 Dec** | Darts Round One | **219, 222, 229, 250** (218, 220, 227, 251) | **288.4** (283.3) | **69.4, 66.4, 59.4, 38.4** (65.3, 63.3, 56.3, 32.3) |
| P11 | 23, 24, 25 Dec | Darts | 282, 256, 268 (285, 263, 273) | 292.0 (286.0) | 10.0, 36.0, 24.0 (1.0, 23.0, 13.0) |
| P11 | 3 Jan | Darts final | 172 (172) | 192.0 (191.7) | 20.0 (19.7) |
| | | **Total, same event set** | | | **14 nights / £425** (19 Nov **13 / £348**) |
| | | Bookable under current min-stay (excl. P04 24 Nov) | | | **13 / £392** (19 Nov 12 / £313) |
| | | Excl. P04 8 Dec (unstable event) | | | 13 / £410 (19 Nov 12 / £340) |

**Change vs yesterday: +1 night / +£77.0.** Check: 425.1 − 348.1 = 77.0.
- **Joined, 1 night / +£12.8:** P20 17 Dec (332 → 305 in the 19 Nov refresh).
- **Left:** none.
- **Changed, 13 nights / +£64.2** = **our prices +£5.0** (net small moves: P04 24 Nov +10 lowers the gap; P11 23–25 Dec −3/−7/−5 widen it) **+ fortnight drift +£59.2** (P04 fortnights +5.0 to +7.8; P11 +5.1 / +6.0; P20 +0.3). The drift comes from neighbouring nights re-priced in the 19 Nov (P04) and 20 Nov 00:30Z (P11) refreshes — the method includes Booked neighbours at their current PriceLabs price (e.g. P11 19 Dec 339→355, 20 Dec 271→289) — and from the cut-off moving to 21 Nov. It is not a market move.
- Sum: 12.8 + 5.0 + 59.2 = **77.0**. Matches.
- **Not counted:** P04 11–13 Dec (not in the 17 Nov set; 13 Dec gap 5.7); beyond 17 Jan (final_price): P20 23–24 Jan 6.6 / 21.6, P20 10–11 Feb 2.3 / 8.3, P04 9–11 Feb 0.5 / 1.5 / 4.5 = 7 nights / £45, too early.

**Read with care:**
- **£234 of the £425 is P11 Round One (14–17 Dec)**, in a market at or below STLY (Δ −4.0 to +1.7). The real reference there is the policy level (£1,200 vs £920, gap £280), not the market.
- P11 23–25 Dec (£70) sit in a soft market (Δ −3.3 to −10.3) and play is UNVERIFIED.
- P20 16–18 Dec (£31) are already above the mixed P75 in a market below STLY: mechanical, not a real miss.
- The real money items are in §2, outside this headline: P04 6–19 Dec £220 under the mixed P50; P04 20–26 Dec ≈ £89 under the matched P50; P05 7–8 Dec £164 and 13–14 Dec £119 under the 4 BR median (13 Dec Δ +13.5); P13 19–21 Dec £17 under P50 on Δ +11 to +15 with the twins identical on 20–21 Dec.

Data gaps:
1. Market figures are PriceLabs Nearby Listings only (Airbnb-derived, `cleaning_fee` null, summary horizon unstated). Daily percentiles mix bedroom counts; "est. matched" figures are ratio estimates. No Market Dashboard / Competitor Listings pulled. P09/P14 and P02/P03/P07/P08/P10/P15–P19 not pulled.
2. `prices.csv` for P04/P05/P06/P13/P20 is the 19 Nov ~09:22–10:56Z refresh; no refresh yet today. P20 21 Nov is shown open although sold (double-sell risk, channel check NOT CHECKED here).
3. P20 sale 0.787 × list vs 0.85 expected: breakdown of Airbnb's discount NOT CHECKED (channel section). P06 DSO 24 Nov–5 Dec "fixed" has no price value in the log; why 30 Nov–5 Dec lost `Blocked`: NOT CHECKED.
4. Causes NOT CHECKED: P05 unc-vs-price gaps (7–8 Dec −£268, 13–14 Dec −£214); P04 6–19 Dec −£41 and 20–26 Dec −£17 overnight in a stable market; P13 twin −£106 on 13–21 Dec.
5. Events are domain-restricted search summaries, not page reads; www.pdc.tv (ENOTFOUND again) must be allowed in the session's network settings (theo2.co.uk, excel.london, englandrugby.com, london.gov.uk not retried today; failed 19 Nov). Conflicts: Eng v NZ kick-off 14:10 vs 14:50; darts Round One start (11 / 13 / 14 Dec) and end (3 / 4 Jan); ExCeL HOMES UK 24–25 vs 25–26 Nov; O2 1–2 Dec (Mariah Carey / UB40). Unstable O2 listings: Don Toliver 23 Nov, Kehlani 8 Dec, Kasabian 18 Dec. UNVERIFIED: darts no-play 24–26 Dec. Winter Wonderland not checked (VENUES flats blocked or no pull).
