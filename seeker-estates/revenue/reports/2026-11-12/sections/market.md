# Market & demand calendar: run D = 2026-11-12 (window 13 Nov 2026 – 10 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Left out of every finding:
  - P02/P03/P06/P07 intentional blocks.
  - Nights after handback: P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec.
  - P14: numbers only.
  - P13 is one flat (3064856 + 3090701).
- **Not re-raised:** the 15% / 20% stay discounts; the Booking.com booster (Camden 18% for check-ins 1 Nov – 18 Dec); P04 min stay 3 and P04 2 Dec; P12 17 Nov; P13 1 Dec +50%; the P11 darts +5% ("do not re-raise").
- **Market data:** `get_neighbourhood_data` (detail, future prices + occupancy) was pulled 12 Nov for 7 listings, and all 7 returned `all_operations_ok=true`. Raw files are `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m12/neigh_<id>.json`.
  - **Pulled one at a time:** P11 3064196 (07:20:05Z), P12 2699998 (07:21:07Z) and P01 3320302 (07:21:29Z).
  - **Process breach (same mistake as yesterday):** P13 3064856, P04 3562176, P20 3547481 and P05 3166592 were issued in one batch (07:20:32–39Z). None failed. This is recorded in the `market.csv` source column.
- **`market.csv`:** `data/snapshots/2026-11-12/market.csv` was copied forward from 11 Nov (121 lines) and 7 rows were appended under `.market.csv.lock`, giving 128 lines.
- **PriceLabs edits since 11 Nov 06:00Z** (`get_user_logs`, listing, 11–12 Nov): **9 entries, all by Reyhan on 11 Nov 15:38–17:17Z.**
  - P13 3064856 (copied to 3090701 and the Vrbo unit): **10–26 Dec −5%, min 3.**
  - P04: **11–24 Nov override with no price, min 2**; then **18–24 Nov −5%, min 3**; then **6–22 Dec −5%, min 3**.
  - P20: **13–15 Nov −5%, min 3** and **20–21 Nov −5%, min 3**.
  - P06 Marylebone 3288517: 11–17 Nov −10%, min 2. P06 is an intentional block, so no comment here.
  - **Nothing on P05, P11 or P12.**
- **Our prices** = `prices.csv` 12 Nov `pricelabs_price`, which equals the neighbourhood `final_price`.
- **Smoobu GET `rates`** (07:22:27Z) for P11 3064196, P20 3547481 and P01 3320302 over 12 Nov – 25 Dec: **0 price mismatches vs `prices.csv` on 44/44 dates each.** Saved as `scratchpad/m12/smoobu_rates12.json` (no guest data).
- **Booking state:** Smoobu `reservations.csv` 12 Nov, confirmed rows only.
- **Fortnight method is unchanged from 8–11 Nov:** 7 nights each side, leaving out blocked nights and nights above 2x the median; the Horse Show and 3 Jan use one clean week. Script: `scratchpad/m12/analyse12.py`, output `out12.txt`.
  - Re-running it on 11 Nov data (`out11_rerun.txt`) gives **21 / £456**, the same as yesterday.
- **Events were re-checked 12 Nov 2026** with WebSearch limited to venue and organiser domains. WebFetch to www.pdc.tv still fails with `ENOTFOUND` (the host is not allowed in this session), so I stopped trying. **Every event fact below is a search summary of an official page, not a page I read.**

## 1. Submarket table
Columns and sources:
- **P25 / P50 / P75 / P90 (n):** `market.csv` 12 Nov, PriceLabs Nearby Listings, bedroom-matched.
- **Mkt occ 30/60:** `market_occ_30/60`, taken from `pl_kpis.csv` 12 Nov `market_occupancy_next_30/60`.
- **Our occ 30/60:** `pl_kpis.csv` `occupancy_next_30/60`.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | Our occ 30/60 | vs 11 Nov |
|---|---|---|---|---|---|---|
| Camden | P11 | 2 | 49 / 39% | 227 / **290 / 328** / 376 | 60 / 57%* | P50 +1, P75 +2 |
| Shepherd's Bush | P13 | 2 | 45 / 38% | 192 / **224 / 267** / 344 (115) | 80 / 52% | +1 / +1; mkt occ30 +2 pts |
| St John's Wood (4 BR per policy) | P05 | 4 | 43 / 39% | 455 / **580 / 726** / 1,196 | 73 / 70% | +3 / +5 |
| Barking | P04 | 2 | 24 / 20% | 140 / **178 / 215** / 263 | 47 / 45% | +2 / +2 |
| Canary Wharf | P20 | 2 | 38 / 30% | 215 / **254 / 325** / 423 | **63** / 48% (was 77 / 57) | +2 / +2 |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 35 / 28% | 216 / **262 / 336** / 432 | 100 / 100%** | +2 / +1 |
| Mile End (handback 13 Dec) | P12 | 2 | 42 / 34% | 171 / **206 / 233** / 291 | 50 / 70% | +1 / +1 |
| Greenwich (handback 26 Nov) | P09 | 1 | 38 / 32% | 110 / 133 / 160 / 204 (9 Nov row) | 97 / 98%** | not pulled |
| Marylebone (blocked) / Islington (handback 13 Nov) / Primrose Hill (numbers only) | P06 / P08 / P14 | 2 / 2 / 1 | 50/42; 51/43; 46/38% | P06 314 / 405 / 507 / 618 (older row); P08 and P14 have no row | 87/93**; 100/100**; 0/0% | not pulled |

\* PriceLabs still shows P11 8–14 Dec as Booked, so its occupancy counts the cancelled stay. Smoobu is the source of truth.
\*\* Inflated by handback or intentional blocks.

The market barely moved overnight (±£1–5). No `market.csv` row exists for Bow, Little Venice, Fulham, Kings Langley, Ladbroke Grove, Bayswater, Woolwich or Hanger Lane.

## 2. Dates where our price should differ from PriceLabs
Sources for this section:
- Prices: `prices.csv` 12 Nov, with 11 Nov in brackets.
- Market: `m12/neigh_<id>.json`.
- Open or closed status: Smoobu reservations, plus the rates where stated.

| Item | 11 Nov | **12 Nov** | Market (P50 / P75; occ vs STLY) | Status |
|---|---|---|---|---|
| **P11 Camden 8–18 Dec, reopened** (Booking.com 8–15 Dec stay cancelled) | 8–14 Dec sold | **Smoobu `available=1` on 8–18 Dec** (11 nights; 5–7 and 19 Dec+ booked), prices = PriceLabs: 261 / 250 / 274 / 329 / 332 / **231 / 208 / 215** / 225 / 246 / 303 = **£2,874**, min 3. **PriceLabs still shows 8–14 Dec Booked** (refresh 11 Nov 15:38Z). | P50 £2,842 / P75 £3,477. 8–12 Dec occ **+5.3 to +9.8**; 13–17 Dec **+0.8, −6.1, −1.9, −2.8, +1.1** | **Darts 13–15 Dec average £218; 13–17 Dec average £225.** The policy decision of 21 Oct is "darts 13–17 Dec average above £300", so the gap is **£375 on 13–17 Dec (£246 on 13–15 Dec)**. Market P75 for 13–17 Dec is £1,522, about £304 a night, so the policy level matches P75. **Conflict with a standing decision, for Corentin to confirm.** Reyhan's −3% still replaces the +5% that policy (24 Oct) says to leave. The market on 14–16 Dec is below STLY, so I make **no new proposal**. Any rebooking on Booking.com would again go through the 0.5267× stack (a-p11-bcom-stack): at £231, that is about £122 paid. |
| **P13 Christmas, 10–26 Dec** (17 open nights on 3064856) | £3,807 | **£3,701 (−£106)**: Reyhan **−5%, min 3** (11 Nov 15:38Z). Twin 3090701: £3,760 (−£188) | P50 **£4,167** / P75 £5,291; occ **+4.9 to +27.3 pts on all 17 nights** | **Moved away from the open +10% ask.** Under P50 on 16 of 17 nights (all except 11 Dec, at 277). The gap to P50 is now **£466** (was £352). +10% on today's price is +£370. Min stay is 3 on the whole range, including 25–26 Dec (the ask was min 2). **For Corentin:** Reyhan's −5% cuts against the strongest STLY lead in the portfolio. |
| **P05 7–8 Dec** | £923 | **£923** (471 / 452), min 2 | P75 £1,160; occ +5.6 / +0.1 | **Open: +£237.** |
| **P05 13–14 Dec** | £1,023 | **£1,023** (518 / 505), min 2 | P75 £1,168; occ **+11.8 / +4.8** | **Open: +£145.** |
| **P05 21 Dec** (Reyhan +300%, min 1) | £2,230 | **£2,198** | P75 700 / P90 903; uncustomized 723; occ +1.4 | Still priced like a soft block (2.4x P90). **Conflict, Corentin to confirm** whether it is meant to sell; if it is, the price would be about £700–903. |
| **P05 29 Dec** (Reyhan +300%, min 1; max 3,500) | £2,786 | **£2,777** | P75 817 / P90 1,093; uncustomized 1,120; occ +2.9 | Same: **+£1,657 over uncustomized.** Conflict, Corentin to confirm. |
| **P04 November** (8 open nights: 13, 18–24 Nov) | £1,292 (9 n) | **£1,149**. 13 Nov rose 141 → 147. 18–24 Nov fell £1–2 a night on Reyhan's −5%. | P50 £1,256 / P75 £1,721; uncustomized £1,585; occ **−0.9 to +4.4** (18–19 Nov +4.4 / +3.1) | **Under P50 on 7 of 8 nights.** The market is around STLY, so no raise is proposed. **Conflicts with standing decisions, for Corentin to confirm:** (a) Reyhan's 11–24 Nov override sets **min 2**, and `prices.csv` shows **13 Nov at min_stay 2**, against policy "never open for less than 3 nights"; (b) the policy −8% on 1–25 Nov is now 0% on 11–17 Nov and −5% on 18–24 Nov. |
| **P04 14–19 Dec to P75** | £1,156 | **£1,117 (−£39)**: Reyhan −5% on 6–22 Dec, min 3 | P75 £1,295; occ **+1.9 to +6.8** | **Open: +£178** (was +£132). Moved away from the ask. Across all 14 open nights (6–19 Dec), our price is £2,585, between P50 £2,253 and P75 £2,947. |
| **P20 20–24 Nov, reopened** | PriceLabs "Booked" (stale) | **PriceLabs now sees the cancellation** (refresh and push 11 Nov 17:16Z). Smoobu `available=1` on 20–24 Nov. 242 / 251 / 220 / 254 / 252 = **£1,219**, min 3 / 3 / 2 / 2 / 2. Reyhan −5% on 20–21 Nov. | P50 £1,061 / P75 £1,415; uncustomized £1,394; occ +4.5 / +0.5 / −1.3 / +5.6 / −0.2 | **Fixed as a sync issue.** It is a 5-night open run, priced between P50 and P75. That is **£136 below yesterday's model (£1,355)**: 21 Nov 301 → 251, 23 Nov 294 → 254, 24 Nov 279 → 252. 20, 21, 23 and 24 Nov sit under their fortnight (§4). |
| **P20 5 Dec** | £311, unbookable | **£313; PriceLabs `available=False`**, Smoobu `available=1`, min 3 | P50 227 / P75 300; occ +2.3 | **Not fixed.** It is a 1-night gap with a min stay of 3. |
| **P01 18–20 Dec** | blocked | **Still blocked** in PriceLabs; Smoobu `available=0` | P50 719 for 3 nights | Not open. Who blocked it: **NOT CHECKED**. Corentin to confirm. |
| **P12 13–20 Nov** (Reyhan +5%, 10 Nov) | 5 open nights £1,372 | **£1,311** (263 / 253 / 247 / 257 / 291) | P75 £1,246; occ **−3.9 to −16.8** | **Still above P75 on all 5 open nights** while the market runs below STLY. For Corentin; handback is 13 Dec. |

## 3. Demand calendar, next 90 days
**Re-verified 12 Nov 2026** (WebSearch summaries of official domains):
- **Darts, Alexandra Palace:** the event runs **11 Dec 2026 – 3 Jan 2027**, with the final on **Sun 3 Jan at 20:00 GMT** ([alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq)).
  - **Round One** sessions run **Mon 14 Dec (19:00) to Sat 19 Dec, at 12:30 and 19:00**. The sessions for 11–13 Dec were not shown in the summary.
  - **Round Two** begins **Sun 20 Dec**. Whether there is play on 23 Dec is **UNVERIFIED**.
  - One PDC news item gives the end date as 4 Jan.
  - The 180,000 tickets figure is from 11 Nov and was not re-checked today.
- **The O2** ([arena listing](https://www.theo2.co.uk/events/venue/the-o2-arena), [Don Toliver](https://www.theo2.co.uk/events/detail/don-toliver-2026)):
  - Hatsune Miku 12 Nov; beabadoobee / Good Charlotte 19–20 Nov; Myles Smith 20 Nov; **The Script 21 Nov**; **Don Toliver Mon 23 Nov** (event page; one listing says 24–25 Nov); **Jungle 24–25 Nov**; Fontaines D.C. 27 Nov; Jessie Ware 28 Nov; LOTR 29 Nov; **Mariah Carey 30 Nov**.
  - December: Phoebe Bridgers 1–2 Dec; **UB40 / Capital's Jingle Bell Ball 5–6 Dec**; **Kehlani 8 Dec**; The Darkness 16 Dec; Greg Davies 17 Dec; **Kasabian 18 Dec**; Culture Club 19 Dec; Amr Diab 20 Dec; **Disney On Ice 24 Dec – 3 Jan**.
  - **Not in today's summary, so UNVERIFIED today:** Noah Kahan 13 / 14 / 17 Nov and Muse 15–16 Nov.
- **ExCeL** ([what's on](https://www.excel.london/whats-on), [Horse Show](https://www.excel.london/m/visitor/whats-on/london-international-horse-show), [MegaCon](https://www.excel.london/whats-on/megacon-live)):
  - November: School & College Leaver Festival 17–18 Nov; **London Vet Show 19–20 Nov** (confirmed today); **HOMES UK 24–25 Nov**; Floodex / HIX 25–26 Nov; Wundrful World of Christmas 14 Nov – 24 Dec.
  - December: FinTech Connect 1–2 Dec; London Perfume Exhibition 10–13 Dec; **London International Horse Show 17–21 Dec**; Scrooge Cirque 23–28 Dec.
  - January: **MegaCon Live 23–24 Jan**.
  - Not in today's summary: London EV Show 18–19 Nov (UNVERIFIED today). Cisco Live is listed today without dates.
  - No attendance figures are stated.
- **Twickenham** ([nations-championship](https://allianzstadiumtwickenham.com/nations-championship), [Eng v NZ](https://allianzstadiumtwickenham.com/england-v-new-zealand-nations-championship-pool-match)): **England v New Zealand Sat 21 Nov** (kick-off 14:10 or 14:50, sources conflict); **Finals Weekend Fri 27 – Sun 29 Nov**, Grand Final Sun 29 Nov.
- **Not re-checked today (from the 11 Nov check):** NYE fireworks 31 Dec ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)); Camden school holidays 21 Dec – 1 Jan ([camden.gov.uk](https://www.camden.gov.uk/term-dates)).

How to read the table:
- **Effect** = market occupancy vs STLY in points (`m12`).
- **Properties** come from the VENUES map in `build/properties.py`. P20 is shown with P01 for the O2 and ExCeL.
- **"Ours vs fortnight"** = `prices.csv` 12 Nov vs the mean of the surrounding fortnight.

| Nights | Event | Venue | Open properties | Effect | Ours £ vs fortnight £ | Priced by PL? |
|---|---|---|---|---|---|---|
| 13–17 Nov | Kahan / Muse (**UNVERIFIED today**) | O2 | P04 13; P20 13–17 | P04 +0.4; P20 −3.9, −9.3, −5.8, +2.1, +6.3 | P04 147 vs 143; P20 276 / 291 / 246 / 237 / 245 (fortnight n/a, only 5 clean nights) | P04 yes (just); P20 cut −5% by Reyhan on 13–15 Nov |
| 18–19 Nov | Leaver Festival / Vet Show | ExCeL | P04 (P20 blocked) | normal, +4.4 / +3.1 | **138 / 140** vs 147 | no |
| 20–21 Nov | Myles Smith, The Script / Eng v NZ | O2 / Twickenham | P04; **P20 (reopened)**; P13 booked | P04 +0.8 / +0.4; P20 +4.5 / +0.5 | P04 **146 / 148** vs 152; P20 **242 / 251** vs 263 | no (P20 −5% by Reyhan) |
| 23 Nov | Don Toliver | O2 | P04; P20 | P04 +0.5; P20 **+5.6** | P04 **143** vs 156; P20 **254** vs 269 | no |
| 24 Nov | Jungle / HOMES UK | O2 / ExCeL | P04; P20 | −0.9 / −0.2 | P04 **144** vs 157; P20 **252** vs 285 | no |
| 27 Nov | Finals Weekend | Twickenham | P13 | **+18.3** | 322 vs 242 | yes |
| 30 Nov | Mariah Carey | O2 | all booked or blocked | – | – | – |
| 5–6 Dec | Jingle Bell Ball / UB40 | O2 | P20 5 Dec (unbookable); P04 6 Dec | P20 +2.3; P04 −0.4 | P20 **313** vs 341; P04 **181** vs 183 | no |
| 8 Dec | Kehlani | O2 | P04 | +6.3 | **181** vs 184 | no (−£3) |
| 11–12 Dec | Darts opening | Ally Pally | **P11 (reopened)** | +9.8 / +5.3 | 329 / 332 vs 271 | yes |
| 13–17 Dec | Darts R1 | Ally Pally | **P11 (13–14 reopened)** | **soft**: +0.8, −6.1, −1.9, −2.8, +1.1 | **231 / 208 / 215 / 225 / 246** vs 286 | no (policy >£300 average not met) |
| 16–18 Dec | Horse Show / Darkness / Kasabian | ExCeL / O2 | P04 16–19; P20 16–18; P01 blocked | P04 +4.9 / +1.9 / +3.9; P20 −1.2 / +2.1 / +2.0 | P04 **182** / 186 / 193 vs 183; P20 **275 / 305 / 286** vs 315 | P04 mostly; P20 no |
| 18 Dec | Darts R1 | Ally Pally | P11 | −3.4 | 303 vs 255 | yes |
| 10–26 Dec | pre-Christmas / school holiday | London | P13 | **+4.9 to +27.3** | under P50 on 16 / 17 nights | **no** (Reyhan −5%) |
| 23 Dec | Darts R2? (**UNVERIFIED**) | Ally Pally | P11 | −3.6 | **293** vs 314 | no; market soft |
| 26 Dec – 2 Jan | Disney On Ice / NYE | O2 / central | P20; P04 2 Jan | P20 +2.7 to +12.3; P04 +8.0 | P20 313–475 vs 263; P04 199 vs 180 | yes |
| 3 Jan | Darts final | Ally Pally | P11 | +3.5 | **182** vs 203 | no |
| 23–24 Jan | MegaCon Live | ExCeL | P20, P04 | far out | not in totals | – |

## 4. Missed compression: open nights on events at or below the fortnight
Same event set and method as 8–11 Nov (`m12/out12.txt`).

| Ref | Night(s) | Event | Ours 12 Nov (11 Nov) | Fortnight £ | Gap £ |
|---|---|---|---|---|---|
| P04 | 18, 19 Nov | Leaver Fest / Vet Show | 138, 140 (139, 141) | 147 | 9, 7 |
| P04 | 20, 21 Nov | The Script | 146, 148 (147, 150) | 152 | 6, 4 |
| **P20** | **20, 21 Nov** | The Script / Eng v NZ (**reopened**) | 242, **251** (234 unbookable, PL booked) | 263 | 21, **12 (new)** |
| P04 | 23 Nov | Don Toliver | 143 (145) | 156 | 13 |
| **P20** | **23 Nov** | Don Toliver (**reopened**) | **254** (PL booked) | 269 | **15 (new)** |
| P04 | 24 Nov | Jungle / HOMES UK | 144 (146) | 157 | 13 |
| P20 | 24 Nov | Jungle / HOMES UK | 252 (279) | 285 | 33 |
| P20 | 5 Dec | Jingle Bell Ball (**unbookable**) | 313 (311) | 341 | 28 |
| P04 | **6 Dec** | Jingle Bell Ball | 181 (187) | 183 | **2 (new)** |
| P04 | 8 Dec | Kehlani | 181 (186) | 184 | 3 |
| **P11** | **13, 14 Dec** | Darts R1 (**reopened**) | 231, 208 (sold) | 286 | **54, 78 (new)** |
| P11 | 15, 16, 17 Dec | Darts R1 | 215, 225, 246 (212, 222, 246) | 286 | 70, 60, 40 |
| P04 | 16 Dec | Horse Show eve | 182 (189) | 183 | 1 |
| P20 | 16, 17, 18 Dec | Horse Show / Kasabian | 275, 305, 286 (291, 295, 305) | 315 | 40, 10, 29 |
| P11 | 23 Dec | Darts R2 (UNVERIFIED) | 293 (289) | 314 | 21 |
| P11 | 3 Jan | Darts final | 182 (183) | 203 | 21 |
| | | **Total, same method** | | | **24 nights / £590** (11 Nov **21 / £456**) |
| | | Without 23 Dec (UNVERIFIED) | | | 23 / £569 |
| | | Of which bookable, excluding P20 5 Dec | | | 22 / £541 |

- **Change vs yesterday: +3 nights / +£134.** The causes add up exactly:
  - **P11 cancellation: +2 n / +£132.** 13–14 Dec are back on sale at 231 / 208 against a fortnight of 286.
  - **P20 now synced, plus Reyhan's −5%: +2 n / £0 net.** 20 Nov −£38 (now bookable at 242, and the fortnight fell 293 → 263 as the cut nights came in); 21 Nov +£12 and 23 Nov +£15 are new; 24 Nov +£11.
  - **P20 December: +£25.** 16 Dec +15, 17 Dec −11, 18 Dec +18, 5 Dec +3.
  - **P04 Reyhan −5%: +1 n / £0 net.** December +£4: 6 Dec is new (+2), 8 Dec +1, 16 Dec +1. November −£4.
  - **P04 13 Nov out: −1 n / −£3.** It rose 141 → 147, above its fortnight of 143.
  - **Night passed: −1 n / −£13** (P13 12 Nov).
  - **P11 other nights: −£7.** 15–17 Dec −£2, 23 Dec −£6, 3 Jan +£1.
  - Check: 132 + 0 + 25 + 0 − 3 − 13 − 7 = **+£134**.
- **By property:** P11 7 n / £344 (darts 13–17 Dec £302); P20 8 n / £188; P04 9 n / £58.
- **Where the market supports a raise** (occupancy clearly above STLY and our price under P50 or the fortnight): **P13 10–26 Dec** (+£466 to P50), **P05 7–8 and 13–14 Dec** (+£237 / +£145), **P04 14–19 Dec** (+£178 to P75), **P11 3 Jan** (+£21, occ +3.5), and **P20 20 and 23 Nov** (occ +4.5 / +5.6). For the other listed nights the fortnight rule is the only basis and the market is at or below STLY, so I am not proposing them.
- **Darts 13–17 Dec:** the gap is the policy conflict in §2, not a new proposal.

Data gaps:
1. **Market figures** are PriceLabs Nearby Listings: Airbnb-derived, `cleaning_fee` null, not comp sets, horizon unstated.
   - P05's bands may include 3 BR.
   - P06/P09 rows are older (2 Nov / 9 Nov). P08 and P14 have no row. P10, P15–P19 and P02/P03/P07 were not pulled.
   - 4 of 7 calls were batched against the one-at-a-time rule (none failed).
2. **P11 8–18 Dec:** open on Smoobu at PriceLabs prices, but PriceLabs still shows 8–14 Dec as Booked (refresh 11 Nov 15:38Z; cancellation not yet seen). Not checked: the live Booking.com price and availability, who cancelled, and the cancellation reason (I made no reservation-detail call).
   - Smoobu prices equal the 15:38Z refresh even though `last_date_pushed` is 07:46Z, so the "not pushed" flag may be stale for Smoobu. Booking.com was not checked.
3. **Not pulled:** customizations, so the exact P11 darts override value today, the P05 21/29 Dec override detail and the P13 twin divergence are not confirmed. P01 18–20 Dec block author: NOT CHECKED.
4. **Events** are domain-restricted search summaries, not page reads. `www.pdc.tv` (and on earlier days alexandrapalace.com, theo2.co.uk and excel.london) must be allowed in the session's network settings before pages can be read.
   - **UNVERIFIED today:** Kahan / Muse 13–17 Nov, EV Show 18–19 Nov, darts play on 23 Dec, darts 11–13 Dec session times, NYE and school dates (11 Nov check only).
   - **Conflicts:** Don Toliver 23 vs 24–25 Nov; Twickenham kick-off 14:10 vs 14:50; darts end 3 vs 4 Jan.
   - Attendance is stated only for the darts (180,000 tickets, 11 Nov check).
