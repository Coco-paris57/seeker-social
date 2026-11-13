# Market & demand calendar: run D = 2026-11-13 (window 14 Nov 2026 – 11 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Left out of every finding:
  - P02/P03/P06/P07 intentional blocks.
  - Nights after handback: P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec.
  - P14: numbers only.
  - P13 is one flat (3064856 + 3090701).
- **Not re-raised:** the 15% / 20% stay discounts; the Booking.com booster (Camden 18%); the Booking.com +10% markup (t-bcom-markup-110 is done); P04 min 3 and P04 2 Dec; P12 17 Nov; P13 1 Dec +50%.
- **PriceLabs calls, strictly one at a time, each reply received before the next call (no batching today):**
  - 1 × `get_user_logs` (listing, 12–13 Nov): **0 entries.** Nobody edited PriceLabs after Reyhan's 11 Nov 15:38–17:17Z changes.
  - 7 × `get_neighbourhood_data` (detail, future prices and occupancy), 07:21:17Z → 07:23:11Z, in this order: P11 3064196, P13 3064856, P05 3166592, P04 3562176, P20 3547481, P12 2699998, P01 3320302. All returned `all_operations_ok=true`. Raw files are in `scratchpad/m13/neigh_<id>.json`.
  - 5 × `get_listing_date_overrides` (P11, P13, P05, P04, P20).
  - 1 × `get_customizations` (P11).
- **Raw prices check.** `prices.csv` 13 Nov `pricelabs_price` equals the live neighbourhood `final_price` on **60 of 60 dates for all 7 listings, 0 mismatches**. This covers the 16 prices files the pull agent did not check, for these 7 listings. Dates beyond 60 days use the live `final_price`.
- **`market.csv`:** `data/snapshots/2026-11-13/market.csv` was copied forward from 12 Nov (128 lines) and 7 rows were appended under `.market.csv.lock`, giving 135 lines. Script: `scratchpad/m13/wmarket13.py`.
- **Booking state:** Smoobu `reservations.csv` 13 Nov, confirmed rows only. The Dispatcher found no change overnight.
- **Fortnight method is unchanged from 8–12 Nov:** 7 nights each side, leaving out blocked nights and nights above 2x the median. Script: `scratchpad/m13/analyse13.py`, output `out13.txt`.
  - Re-running it on 12 Nov data (`out12_rerun.txt`) gives **24 / £590**, the same as yesterday.
- **Events re-checked 13 Nov 2026.** WebFetch failed with `ENOTFOUND` on www.alexandrapalace.com, www.theo2.co.uk, www.excel.london and allianzstadiumtwickenham.com, so I stopped trying. I then used WebSearch limited to venue and organiser domains. **Every event fact below is a search summary of an official page, not a page I read.**

## 1. Submarket table
Columns and sources:
- **P25 / P50 / P75 / P90 (n):** `market.csv` 13 Nov, PriceLabs Nearby Listings, bedroom-matched.
- **Mkt occ 30/60:** `market_occ_30/60`, taken from `pl_kpis.csv` 13 Nov `market_occupancy_next_30/60`.
- **Our occ 30/60:** `pl_kpis.csv` `occupancy_next_30/60`.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | Our occ 30/60 | vs 12 Nov |
|---|---|---|---|---|---|---|
| Camden | P11 | 2 | 50 / 39% | 227 / **291 / 329** / 377 (170) | **43 / 42%** (was 60 / 57) | +1 / +1. Our occupancy fell because PriceLabs now sees 8–14 Dec as open |
| Shepherd's Bush | P13 | 2 | 45 / 38% | 193 / **225 / 268** / 345 (115) | 80 / 52% | +1 / +1 |
| St John's Wood (4 BR per policy) | P05 | 4 | 44 / 39% | 459 / **583 / 728** / 1,199 (90) | 73 / 68% | +3 / +2 |
| Barking | P04 | 2 | 25 / 20% | 141 / **178 / 216** / 264 (89) | 47 / 45% | 0 / +1 |
| Canary Wharf | P20 | 2 | 39 / 30% | 216 / **255 / 326** / 425 (150) | 63 / 47% | +1 / +1 |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 35 / 29% | 217 / **263 / 337** / 433 (146) | 100 / 100%** | +1 / +1 |
| Mile End (handback 13 Dec) | P12 | 2 | 42 / 34% | 172 / **207 / 232** / 292 (117) | 47 / 70% | +1 / −1 |
| Greenwich (handback 26 Nov) | P09 | 1 | 39 / 33% | 110 / 134 / 161 / 204 (31 Oct row) | 97 / 98%** | not pulled |
| Marylebone (blocked) / Islington (handback 13 Nov) / Primrose Hill (numbers only) | P06 / P08 / P14 | 2 / 2 / 1 | 50/42; 52/43; 48/38% | P06 312 / 406 / 510 / 625 (31 Oct row); P08 and P14 have no row | 90/95**; 100/100**; 0/0% | not pulled |

\*\* Inflated by handback or intentional blocks.

The market moved by £0–3 overnight. No `market.csv` row exists for Bow, Little Venice, Fulham, Kings Langley, Ladbroke Grove, Bayswater, Woolwich or Hanger Lane.

## 2. Dates where our price should differ from PriceLabs
Sources for this section:
- Prices: `prices.csv` 13 Nov, with 12 Nov in brackets.
- Overrides: `get_listing_date_overrides` 13 Nov.
- Market (P50 / P75 and occupancy vs STLY in points): `m13/neigh_<id>.json`.

| Item | **13 Nov** (12 Nov) | Market | Status |
|---|---|---|---|
| **P11 Camden 8–18 Dec. PriceLabs now sees it open (fixed).** | PriceLabs `booking_status` is empty on 8–14 Dec (refreshed 13 Nov 06:34:59Z), `available=True`, and Smoobu price = PriceLabs on all 11 nights. 202 / 197 / 220 / 263 / 266 / **186 / 201 / 209 / 216 / 233** / 282 = **£2,475 (£2,874, −£399, −13.9%)**, min 3. | P50 £2,856 / P75 £3,487. 8–12 Dec occ **+6.4 / +6.2 / +6.0 / +8.3 / +5.3**; 13–17 Dec −0.1 / −6.4 / −1.6 / −2.5 / +0.3 | **The sync fix brought a price cut.** The override is unchanged (−3% on 22 Nov – 18 Dec, last edited 9 Nov 21:21Z) and no edit is logged. Two things moved: <br>• Uncustomized fell 13–16% (8 Dec 283 → 238, 11 Dec 356 → 310, 13 Dec 254 → 219). <br>• Final / uncustomized fell from about 0.92 to 0.85. <br>This fits the "Aggressive" occupancy profile (`get_customizations`): at 16–30 days, 40% occupancy gives −10% and 50–70% gives 0, and P11 occ30 fell from 60% to 43%. The Booking Recency Factor is on (5–15%). Which factor applies on each date is NOT CHECKED. <br>**8–12 Dec: under P50 on 4 of 5 nights (£1,148 vs P50 £1,322, −£174)** while the market leads STLY by 5–8 pts. **9 Dec (197) and 13 Dec (186) are under P25.** This is where our price should differ from PriceLabs: at least P50 on 8–12 Dec (+£174). |
| **P11 darts 13–17 Dec** | 186 / 201 / 209 / 216 / 233 = **£1,045, average £209** (£1,125, average £225) | P50 £1,253 / P75 £1,527 (about £305 a night) | **Wider gap.** The policy decision of 21 Oct is "average above £300", so the gap is **£455** (was £375). Reyhan's −3% still replaces the +5% that policy (24 Oct) says to leave. **Conflict with a standing decision, for Corentin to confirm.** The market is below STLY on 4 of 5 nights, so I make no new proposal beyond the policy level. |
| **P13 Christmas, 10–26 Dec** (17 open nights, 3064856) | **£3,721** (£3,701). −5% min 3 on all 17 nights is confirmed live (Reyhan, 11 Nov 15:38:45Z). Twin 3090701: £3,705 (£3,760). | P50 **£4,180** / P75 £5,309; occ **+3.6 to +27.3 pts on all 17 nights** | **Not fixed.** Under P50 on 14 of 17 nights (not 10–12 Dec). The gap to P50 is **£459**. Taking the −5% off would add about £196 (3,721 / 0.95). **For Corentin (a-peak-check):** the −5% cuts against the strongest STLY lead in the portfolio. **New:** on 12 Dec the twins swapped places overnight (3064856 225 → 276; 3090701 238 → 210). The cause is NOT CHECKED. |
| **P05 7–8 Dec** (+3%, min 2) | **£949** (479 / 470) (£923) | P75 £1,155; occ +5.1 / +0.8 | **Open: +£206** to P75 (was +£237). |
| **P05 13–14 Dec** (+5%, min 2) | **£975** (494 / 481) (£1,023) | P75 £1,167; occ **+13.1 / +5.9** | **Open: +£192** (was +£145). The algorithm cut £48 with no edit. |
| **P05 21 Dec** (+300%, min 1, 9 Nov) | **£2,074** (£2,198) | P75 698 / P90 897; uncustomized 700; occ +1.2 | Still priced like a soft block (2.3x P90). **Conflict, Corentin to confirm** whether it is meant to sell. |
| **P05 29 Dec** (+300%, min 1) | **£2,712** (£2,777) | P75 824 / P90 1,098; uncustomized 1,131; occ +3.6 | Same: **+£1,581 over uncustomized.** Conflict, Corentin to confirm. |
| **P04 November** (7 open nights, 18–24 Nov; −5% min 3) | **£1,070** (£1,002, **+£68 with no edit**: +£9–10 a night) | P50 £1,097 / P75 £1,492; uncustomized £1,461; occ +3.9 / +2.1 / −0.7 / −1.3 / −0.1 / −0.5 / +0.3 | Under P50 on 4 of 7 nights (18–21). The market is around STLY, so no raise is proposed. <br>• **t-p04-min2-nov is effectively lapsed.** The min-2 override (no price) covers 14–17 Nov, and Smoobu shows all four nights booked. 13 Nov was the only open min-2 night and it is tonight. <br>• **Smoobu is below PriceLabs on 18–20 Nov:** 130 / 135 / 140 vs 147 / 150 / 155 (−£47), in `prices.csv` `smoobu_price`. The cause goes to the PriceLabs auditor. |
| **P04 14–19 Dec to P75** (−5% min 3) | **£1,115** (£1,117) | P75 £1,290; occ **+2.2 / +0.4 / +2.5 / +1.9 / +4.2 / +7.0** | **Open: +£175** (was +£178). Across 6–19 Dec: £2,581, against P50 £2,262 and P75 £2,943. |
| **P20 20–24 Nov** (−5% on all 5; min 3 / 3 / 2 / 2 / 2) | 241 / 242 / 215 / 247 / 245 = **£1,190** (£1,219, −£29, no edit) | P50 £1,066 / P75 £1,422; uncustomized £1,307; occ +2.0 / −1.4 / −3.8 / +3.0 / −2.9 | Between P50 and P75. The market is mixed against STLY. **t-p20-delivery is still open.** Policy says delivery is 20–22 Nov, but PriceLabs and Smoobu show 20–24 Nov on sale and 18–19 Nov blocked. If the nights sell, the open ask (−5% → 0%, about +£63 (1,190 / 0.95)) stands. Not a new proposal. |
| **P20 5 Dec** | £313, PriceLabs `available=False`, min 3 | P50 228 / P75 300; occ −0.7 | **Not fixed** (a 1-night orphan). Smoobu availability today: NOT CHECKED. |
| **P01 18–20 Dec** | Still `Blocked` in PriceLabs | P50 £720 for 3 nights | Not open. Who blocked it: NOT CHECKED. |
| **P12 17–20 Nov** | **£1,117** (267 / 272 / 288 / 290) (£1,048) | P75 £978; occ **−5.2 / −6.8 / −2.6 / −14.5** | Above P75 on all 4 open nights while the market is below STLY. Smoobu is 250 / 250 / 266 on 17–19 Nov (pricelabs section). For Corentin; handback is 13 Dec. |

## 3. Demand calendar, next 90 days
**Re-verified 13 Nov 2026** (WebSearch summaries of official domains):
- **Darts, Alexandra Palace:** the event runs **11 Dec 2026 – 3 Jan 2027** ([alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq)).
  - Round One: **14–19 Dec**, sessions at 12:30 and 19:00. The 11–13 Dec matches are referenced but not shown in full.
  - **Round Two: 20–23 Dec. 23 Dec play is now verified (yesterday it was UNVERIFIED).**
  - **No sessions on 24–26 Dec.**
  - Round Three 27–29 Dec, Round Four 29–30 Dec, quarter-finals 1 Jan, semi-finals 2 Jan, **final 3 Jan at 20:00 GMT**. One PDC item says 4 Jan.
  - **Capacity: "a record 180,000 tickets"** (organiser).
- **The O2** ([arena listing](https://www.theo2.co.uk/events/venue/the-o2-arena); the summary warns the crawl is about a month old):
  - November: **beabadoobee 13–17 Nov** (this replaces the "Kahan / Muse" entry; those stay UNVERIFIED); Good Charlotte 19; Myles Smith 20; **The Script 21**; Bill Bailey 22; **Don Toliver 23**; **Jungle 24–25**; Squeeze 26; Fontaines D.C. 27; Jessie Ware 28; LOTR 29; **Mariah Carey 30**.
  - December: Phoebe Bridgers 1–2; Bryson Tiller 3; **Jingle Bell Ball 5–6**; RnB Winter Ball 7; **Kehlani 8**; Ocean Colour Scene 9; Mo Gilligan 10; Pete Tong Ibiza Classics 11–12; McLaren LIVE 14; The Darkness 16; Greg Davies 17; **Kasabian 18**; Culture Club 19; Amr Diab 20.
  - **Disney On Ice 24 Dec – 3 Jan.**
- **ExCeL** ([what's on](https://www.excel.london/whats-on), [Horse Show](https://www.excel.london/whats-on/london-international-horse-show), [MegaCon](https://www.excel.london/whats-on/megacon-live)):
  - November: **Business Show / Biotech / Contact Centre 18–19 Nov** (this replaces the EV Show); **London Vet Show 19–20**; **HOMES UK 24–25**; Floodex / National Civils 25–26; Dragonmeet 28; Wundrful World of Christmas 14 Nov – 24 Dec.
  - December: FinTech Connect 1–2; Perfume Exhibition 10–13; **London International Horse Show 17–21 Dec**; Scrooge Cirque 23–28.
  - January: **MegaCon Live 23–24 Jan**; Festival of Genomics 27–28 Jan.
  - No attendance figures are stated.
- **Twickenham** ([nations-championship](https://allianzstadiumtwickenham.com/nations-championship), [Eng v NZ](https://allianzstadiumtwickenham.com/england-v-new-zealand-nations-championship-pool-match)): **England v New Zealand Sat 21 Nov**, KO 14:10 (one page says 14:50). **Finals Weekend Fri 27 – Sun 29 Nov**; Grand Final Sun 29 Nov, the Sunday session starting 20:10.
- **Not re-checked today:** NYE fireworks 31 Dec ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026), checked 11 Nov); Camden school holidays 21 Dec – 1 Jan (camden.gov.uk, checked 11 Nov).

How to read the table:
- **Effect** = market occupancy vs STLY in points (`m13`): compression at +5 or more, soft at −2 or less.
- **Properties** come from the VENUES map in `build/properties.py`. P20 is shown with P01 for the O2 and ExCeL.
- **"Ours vs fortnight"** = `prices.csv` 13 Nov vs the mean of the surrounding fortnight.

| Nights | Event | Venue | Open properties | Effect | Ours £ vs fortnight £ | Priced by PL? |
|---|---|---|---|---|---|---|
| 14–17 Nov | beabadoobee | O2 | P20 (P04 and P01 booked) | P20 soft/normal | 286 / 247 / 238 / 241; fortnight n/a (5 clean nights) | P20 −5% on 14–17 Nov |
| 18–19 Nov | Business Show / Vet Show | ExCeL | P04 (P20 blocked) | normal, +3.9 / +2.1 | **147 / 150** vs 157 | no |
| 20–21 Nov | Myles Smith, The Script / Eng v NZ | O2 / Twickenham | P04; P20 (delivery dates per policy); P13 booked | P04 −0.7 / −1.3; P20 +2.0 / −1.4 | P04 **155 / 158** vs 158; P20 **241 / 242** vs 249 | no |
| 23 Nov | Don Toliver | O2 | P04; P20 | P04 −0.5; P20 +3.0 | P04 **153** vs 161; P20 **247** vs 256 | no |
| 24 Nov | Jungle / HOMES UK | O2 / ExCeL | P04; P20 | +0.3 / −2.9 | P04 **154** vs 161; P20 **245** vs 273 | no |
| 27 Nov | Finals Weekend | Twickenham | P13 | **+16.6** | 287 vs 241 (was 322) | yes |
| 30 Nov | Mariah Carey | O2 | all booked or blocked | – | – | – |
| 5–6 Dec | Jingle Bell Ball | O2 | P20 5 Dec (unbookable); P04 6 Dec | P20 −0.7 | P20 **313** vs 336; P04 **181** vs 183 | no |
| 8 Dec | Kehlani | O2 | P04 | normal | **180** vs 184 | no |
| 8–12 Dec | pre-darts week | Camden | **P11** | **compression, +5.3 to +8.3** | 202 / 197 / 220 / 263 / 266 vs P50 257–274 | **no**: cut 13.9% overnight |
| 11–12 Dec | Darts opening | Ally Pally | P11 | +8.3 / +5.3 | 263 / 266 vs 230 | yes, vs the fortnight (but under P50 on 11 Dec) |
| 13–17 Dec | Darts R1 | Ally Pally | P11 | **soft**: −0.1, −6.4, −1.6, −2.5, +0.3 | **186 / 201 / 209 / 216 / 233** vs 247 | no (policy >£300 average not met) |
| 16–18 Dec | Horse Show / Darkness / Kasabian | ExCeL / O2 | P04 16–19; P20 16–18; P01 blocked | P04 +2.5 / +1.9 / +4.2; P20 −0.9 / +2.0 / +1.7 | P04 **183** / 186 / 192 vs 183; P20 **279 / 284 / 290** vs 319 | P04 mostly; P20 no |
| 18 Dec | Darts R1 | Ally Pally | P11 | soft, −4.4 | 282 vs 225 | yes |
| 10–26 Dec | pre-Christmas / school holiday | London | P13 | **compression, +3.6 to +27.3** | under P50 on 14 / 17 nights | **no** (Reyhan −5%) |
| 23 Dec | Darts R2 (**now verified**) | Ally Pally | P11 | **soft, −5.0** | **276** vs 298 | no; market soft |
| 26 Dec – 2 Jan | Disney On Ice / NYE | O2 / central | P20; P04 2 Jan | P20 **+3.0 to +12.3** | P20 312–459 vs 261; P04 198 vs 179 | yes |
| 3 Jan | Darts final | Ally Pally | P11 | +3.3 | **172** vs 193 (P50 222) | no |
| 23–24 Jan | MegaCon Live | ExCeL | P20, P04 | far out | not in totals | – |

## 4. Missed compression: open nights on events at or below the fortnight
Same event set and method as 8–12 Nov (`m13/out13.txt`).

| Ref | Night(s) | Event | Ours 13 Nov (12 Nov) | Fortnight £ (12 Nov) | Gap £ (12 Nov) |
|---|---|---|---|---|---|
| P04 | 18, 19 Nov | Business Show / Vet Show | 147, 150 (138, 140) | 157 (147) | 10, 7 (9, 7) |
| P04 | 20, 21 Nov | The Script | 155, 158 (146, 148) | 158 (152) | 3, 0 (6, 4) |
| P20 | 20, 21 Nov | The Script / Eng v NZ | 241, 242 (242, 251) | 249 (263) | 8, 7 (21, 12) |
| P04 | 23 Nov | Don Toliver | 153 (143) | 161 (156) | 8 (13) |
| P20 | 23 Nov | Don Toliver | 247 (254) | 256 (269) | 9 (15) |
| P04 | 24 Nov | Jungle / HOMES UK | 154 (144) | 161 (157) | 7 (13) |
| P20 | 24 Nov | Jungle / HOMES UK | 245 (252) | 273 (285) | 28 (33) |
| P20 | 5 Dec | Jingle Bell Ball (**unbookable**) | 313 (313) | 336 (341) | 23 (28) |
| P04 | 6 Dec | Jingle Bell Ball | 181 (181) | 183 | 2 (2) |
| P04 | 8 Dec | Kehlani | 180 (181) | 184 | 4 (3) |
| **P11** | **13–17 Dec** | Darts R1 | **186, 201, 209, 216, 233** (231, 208, 215, 225, 246) | **247** (286) | **61, 46, 38, 31, 14** (54, 78, 70, 60, 40) |
| P04 | 16 Dec | Horse Show eve | 183 (182) | 183 | 0 (1) |
| P20 | 16, 17, 18 Dec | Horse Show / Kasabian | 279, 284, 290 (275, 305, 286) | 319 (315) | 40, **35**, 29 (40, 10, 29) |
| P11 | 23 Dec | Darts R2 (now verified) | 276 (293) | 298 (314) | 22 (21) |
| P11 | 3 Jan | Darts final | 172 (182) | 193 (203) | 21 (21) |
| | | **Total, same method** | | | **24 nights / £453** (12 Nov **24 / £590**) |
| | | Of which bookable, excluding P20 5 Dec | | | 23 / £430 |

- **Change vs yesterday: 0 nights / −£137. The gap is smaller, but our event prices are not better.**
  - **P11 −£111** (7 n, £344 → £233). The whole Camden curve was cut after the sync. The darts nights fell £80 (£1,125 → £1,045), and the fortnight around them fell more (286 → 247). Against the policy level (average >£300), the darts gap **widened from £375 to £455**.
  - **P20 −£9** (8 n, £188 → £179). 20–24 Nov −£34, because the fortnight fell faster than our price. 17 Dec +£25 (305 → 284). 5 Dec −£5.
  - **P04 −£17** (9 n, £58 → £41). The algorithm added £9–10 a night to 18–24 Nov with no edit.
  - Check: −111 − 9 − 17 = **−£137**.
- **Supplementary, not in the headline total:** O2 dates first seen in today's listing, all smaller events, same method.
  - P04 22 Nov (Bill Bailey) £7; **P20 22 Nov £38** (215 vs 253).
  - P04 7 Dec (RnB Winter Ball) £5, 9 Dec (Ocean Colour Scene) £5, 10 Dec (Mo Gilligan) £2, 14 Dec (McLaren LIVE) £11.
  - **P20 14 Dec £32** (279 vs 311).
  - Total **7 n / £100**. The market on P20 22 Nov and 14 Dec is below STLY (−3.8 / −3.4), so these are not proposals.
- **Where the market supports a raise** (occupancy clearly above STLY and our price under P50 or P75):
  - **P11 8–12 Dec** to P50: **+£174** (NEW today, caused by the post-sync cut).
  - **P13 10–26 Dec**: +£459 to P50.
  - **P05 7–8 and 13–14 Dec**: +£206 / +£192 to P75.
  - **P04 14–19 Dec**: +£175 to P75.
  - **P11 3 Jan**: +£21 to the fortnight (+£50 to P50), occ +3.3.
  - For the other listed nights the fortnight rule is the only basis and the market is at or below STLY, so I am not proposing them.

Data gaps:
1. **Market figures** are PriceLabs Nearby Listings: Airbnb-derived, `cleaning_fee` null, not comp sets, horizon unstated.
   - P05's bands may include 3 BR.
   - P06/P09 rows are from 31 Oct. P08 and P14 have no row. P10, P15–P19 and P02/P03/P07 were not pulled.
2. **P11 price cut cause:** the occupancy profile and booking-recency settings fit the cut, but the per-date breakdown is NOT CHECKED. Live Booking.com price and availability for 8–18 Dec: NOT CHECKED.
3. **Twin swap on P13 12 Dec** (3064856 +51, 3090701 −28): cause NOT CHECKED.
4. **P04 18–20 Nov Smoobu below PriceLabs** (−£47) and P20 5 Dec Smoobu availability: not checked live (no Smoobu call this run).
5. **Events** are domain-restricted search summaries, not page reads. www.alexandrapalace.com, www.theo2.co.uk, www.excel.london and allianzstadiumtwickenham.com (and www.pdc.tv) must be allowed in the session's network settings before pages can be read. The O2 summary says its crawl is about a month old.
   - **UNVERIFIED:** Noah Kahan / Muse (no longer in the O2 summary; beabadoobee 13–17 Nov is shown instead); darts 11–13 Dec session times; NYE and school dates (11 Nov check only).
   - **Conflicts:** Twickenham kick-off 14:10 vs 14:50; darts end 3 vs 4 Jan.
   - Attendance is stated only for the darts (180,000 tickets).
