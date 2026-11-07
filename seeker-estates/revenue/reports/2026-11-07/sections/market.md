# Market & demand calendar: run D = 2026-11-07 (window 7 Nov 2026 – 4 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Left out: P02/P03/P06/P07 intentional blocks (the new P06 18–22 Nov booking is not analysed here); nights after handback (P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec); P14 numbers only; P13 = one flat (3064856 + 3090701). Not re-raised: P13 1 Dec +50%, 15%/20% stay discounts, Booking.com booster, P04 2 Dec, P12 17 Nov, P11 darts override.
- **Market data pulled 7 Nov 07:18–07:20Z, one call at a time, every call `all_operations_ok=true`.** Tool: `get_neighbourhood_data` (detail, future prices + occupancy) for P13 3064856, P05 3166592, P04 3562176, P11 3064196, P20 3547481, P12 2699998, P09 3318172. Raw files: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m07/neigh_<id>.json`.
- `data/snapshots/2026-11-07/market.csv`: **copied forward from 6 Nov, with 7 rows appended** under `.market.csv.lock` (94 lines). P05 uses the 4 BR row (`property_facts.P05`).
- **PriceLabs edits since 6 Nov 06:00Z:** `get_user_logs` listing and group, 6–7 Nov: **0 entries**. Nothing changed by hand. Every move below comes from the algorithm or a refresh.
- **Our prices:** `data/snapshots/2026-11-07/prices.csv` `pricelabs_price`. Refresh times come from `raw/prices_<id>.json last_refreshed_at`: P20 7 Nov 01:30Z, P05 01:28Z, P12 06:55Z. P04, P09, P11, P13 (both ids) and P06 are still at **6 Nov 08:40–08:48Z**. "Yesterday" means the 6 Nov `prices.csv`. "Default" means `uncustomized_price`. For dates after 5 Jan I used the neighbourhood `final_price`.
- **Booking state:** Smoobu `reservations.csv` 7 Nov (702 rows), confirmed rows only. The P13 20–25 Dec booking is `cancelled`, so those nights count as open.
- **Fortnight method unchanged:** 7 nights on each side; booked or blocked nights and nights above 2x the median are left out. Horse Show and 3 Jan use one clean week. Scripts: `scratchpad/m07/analyse07.py <day> [neigh dir]` and `scratchpad/m07/open07.py <ref> <from> <to>`. I re-ran `analyse07.py` on the 6 Nov data with today's event list to get a like-for-like baseline: **27 n / £612, identical to yesterday's reported total.**
- **Events re-checked 7 Nov 2026** with WebSearch restricted to venue and organiser domains. WebFetch of theo2.co.uk fails (`ENOTFOUND`: the host is not in the session's allowed network domains). As on earlier days, every event fact here is a search summary of an official page, not a page I read myself.

## 1. Submarket table
Sources: `market.csv` 7 Nov (`p25/p50/p75/p90`, n = bedroom-matched Nearby Listings, `market_occ_30/60`), `pl_kpis.csv` 7 Nov (`occupancy_next_30/60`).

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | Our occ 30/60 | vs 6 Nov |
|---|---|---|---|---|---|---|
| Canary Wharf | P20 | 2 | 37 / 30% | 215 / **251 / 316** / 419 (154) | 50 / **37%** | P50 +2; our 60-day 25 → 37% (19–26 Dec booking) |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 35 / 29% (pl_kpis) | 2 Nov row: 214 / 258 / 331 / 421 | 100 / 100%* | not pulled |
| Barking | P04 | 2 | 24 / 20% | 140 / **174 / 217** / 263 (90) | 57 / 50% | P50 +2 |
| Greenwich (handback 26 Nov) | P09 | 1 | 36 / 31% | 110 / **133 / 160** / 203 (126) | 77 / 88%* | +1 / +2 |
| Mile End (handback 13 Dec) | P12 | 2 | 42 / 34% | 172 / **205 / 238** / 295 (120) | 63 / 73% | +2 / +4 |
| Marylebone (blocked on purpose) | P06 | 2 | 48 / 42% (pl_kpis) | 2 Nov row | 63 / 82%* | not pulled |
| Camden | P11 | 2 | 46 / 39% | 228 / **290 / 330** / 395 (169) | 47 / 47% | +3 / +3 |
| St John's Wood | P05 | 4 | 43 / 40% | 461 / **575 / 720** / 1,178 (90) | 77 / 65% | +5 / +6 |
| Shepherd's Bush | P13 | 2 | 43 / 38% | 191 / **225 / 276** / 350 (117) | 73 / 50% | +2 / +2 |
| Islington (handback 13 Nov) / Primrose Hill (numbers only) | P08 / P14 | 2 / 1 | 49 / 43%; 46 / 39% (pl_kpis) | 27 Oct rows only | 93 / 97%*; 0 / 0% | not pulled |

\* Inflated by handback or intentional blocks. `pl_kpis` own occupancy may also count Smoobu-cancelled nights. There is no `market.csv` row for Bow, Little Venice, Fulham, P17, Kings Langley, Ladbroke Grove, Bayswater, Woolwich or Hanger Lane.

## 2. Open raises re-checked (prices.csv 7 Nov; market = `neigh_<id>.json` 7 Nov)
| Ask | 6 Nov | **7 Nov** | Market today | Status |
|---|---|---|---|---|
| **P13 12 Nov ≥ £176, min 1** | £163, min 2 | **£162**, min 2 (twin 3090701 **£172**, was £183) | P25 £174 / P50 £207; occ 44.4 vs 55.5 STLY (**−11.1**, was −8.7) | **Not done; still conflicts** with Reyhan's 8–12 Nov −10% (5 Nov). Gap **£14** (was £13). We sit below the market P25 on a market that is weakening. The market does not support the raise. The case for it is Wembley plus the floor. Corentin to decide. |
| **P13 Christmas +10%, min 2 on 25–26 Dec** (3064856, 7–26 Dec, 20 open n) | £4,148 | **£4,133**; 21–26 Dec min 3 (twin £4,373) | P50 £4,895 / P75 £6,210; default £4,432; **occ +4.8 to +25.3 pts vs STLY on all 20 nights** | **Not done; still conflicts** with Reyhan's 7–20 Dec −7% and 21–26 Dec −5% min 3. +10% = **+£413**; to P50 = +£762. We are below P25 on 7, 9, 17, 24, 25 and 26 Dec. The 6 Nov Airbnb booking for 20–25 Dec (5 n, £917.73 room = £184/n) was cancelled, so the nights are open again. Every Christmas night is under the P50. |
| **P05 7–8 Dec to ~P75** | £922 | **£920** (469/451), min 2 | P75 £1,181; default £1,147; occ **+6.5 / +1.8** | **Still open: +£261** (was +£249). |
| **P05 13–21 Dec to P75** (9 n) | £5,316 | **£5,288** | P75 £5,837; default £5,562; P50 £4,415; occ **+2.5 to +10.4 on all 9 nights** | **Still open: +£549** (was +£497). Reyhan's 13–19 Dec −7% is unchanged; Corentin to confirm. |
| **P20 13–16 Nov +10%** | £903 | **£939** (271/234/221/213); overrides −5% min 3 (13–15) and −5% min 2 (16) still set | P50 £856, P75 £1,144; occ **+1.3, −9.4, −9.7, −1.9** | **Weaker.** 13 Nov jumped 232 → 271 on the 7 Nov 01:30Z refresh, with no edit. All 4 nights are now above the P50. +10% = +£94, and the market does not support it (soft on 14–15). The only case left is conversion. Suggest dropping the ask. |
| **P05 29 Dec ~ default** (min 1, 1-night orphan) | £1,351 | **£1,346**, min 1 | default **£1,071**, P90 £1,082, P75 £819; occ 53.2 vs 51.3 (+1.9) | **Still open: £264–275 above P90/default.** |
| **P11 3 Jan ≥ fortnight** | £189 | **£188**, min 3 | fortnight £204; P50 £230; occ 18.8 vs 13.9 (**+4.9**) | **Still open: +£16.** |
| P11 23 Dec ≥ £317 (Reyhan +7%) | £300 | **£305** (P11 not refreshed since 6 Nov 08:48Z) | P50 £308; occ −4.0 | Moving the right way; still **£15** under the fortnight (£320). |

### 2b. Was the P20 19–26 Dec booking (£1,428 room) under-priced vs market?
The booking: Smoobu `reservations.csv` 7 Nov, Airbnb, 7 nights, booked 6 Nov, room £1,428.00 (= £204/night), cleaning £150, commission £244.59.

| Comparator (7 nights 19–25 Dec) | £ | Paid as share |
|---|---|---|
| PriceLabs `price` 6 Nov (01:29Z, `2026-11-06/raw/prices_3547481.json`) 278/257/281/285/292/294/290 | **1,977** (Smoobu `smoobu_price` identical) | **0.722** |
| PriceLabs after weekly 15% (policy) | 1,680 | 0.850 |
| PriceLabs default (`uncustomized_price`) | 2,236 | 0.639 |
| Market P25 / **P50** / P75 (`m06/neigh_3547481.json`) | 1,372 / **1,676** / 2,167 | 1.04 / **0.852** / 0.659 |
| Market P50 after the same weekly 15% | 1,425 | 1.00 |
| Market booked-P50 (`booked_50_percentile_price`) | 1,420 | 1.01 |

- **Against PriceLabs:** the guest paid 0.722x. That equals 0.85 x 0.85 (1,977 x 0.7225 = £1,428.38). The weekly 15% accounts for one 0.85. **The second 15% is not explained by policy.** Last-minute does not apply at 43 days out. Early bird is not set on P20 (`listing_facts.P20.airbnb_discounts_22oct`). This gap is worth **£252** (1,680 − 1,428) and goes to the channel auditor as an unexplained Airbnb gap. Cause NOT CHECKED.
- On top of that, PriceLabs already carried Reyhan's −5% on every night: 19–20 Dec (set 27 Oct) and 21–25 Dec (set 4 Nov; `get_listing_date_overrides` 7 Nov). Without those overrides the list price would have been about £2,081, and the same 0.7225 would have paid about **£1,504 (+£75)**.
- **Against the market:** £204/night is about the market booked-median (£203/n) and about P25-plus. It is **15% below the nightly P50**. With the same weekly 15% applied to the P50, it is exactly at market. Market occupancy on these nights is **−3.0 to +6.1 pts vs STLY** (no strong compression). **Verdict: not under-priced against the market. Under-priced against our own PriceLabs price by an unexplained second 15% (£252) and by Reyhan's −5% (about £75).**
- **Effect on P20's Christmas position:** 19–25 Dec are now sold. Of Reyhan's 21–26 Dec −5%, only **26 Dec** is still open (£310, P50 £262, occ +5.9). 27 Dec–2 Jan are open at £369–483, above the P50 (£233–267), and NYE is +14.7. They are priced (§3). PriceLabs raised the sold nights by 4–5% on the 7 Nov refresh (292–309): its occupancy adjustment reacted after the sale.

### 2c. Points from the overnight list that touch market pricing
- **P09 8–10 Nov:** `prices.csv` 7 Nov `smoobu_price` now **113/110/111 = PriceLabs**. The £100 seen on 6 Nov has been overwritten in the snapshot. Live channel rate NOT CHECKED. Market 7 Nov: we are at P25 (P50 £135–136) and occupancy is +1.2 to +2.3 vs STLY. Hold, no cut.
- **P04 21 Nov fell 201 → 172 (−£29)** at the 6 Nov 08:48Z refresh. No edit was logged. The default is £253. This puts 21 Nov on the missed list (§4).

## 3. Demand calendar, next 90 days
**Re-verified 7 Nov 2026** (WebSearch on official domains; search summaries):
- **Twickenham:** England v Australia Sun 8 Nov 15:10; England v Japan Sat 14 Nov (16:40); England v New Zealand Sat 21 Nov (14:10); Finals Weekend 27–29 Nov, Grand Final Sun 29 Nov ([englandrugby.com match centre](https://www.englandrugby.com/fixtures-and-results/match-centre/nations-championship-2026-england-v-australia), [allianzstadiumtwickenham.com/nations-championship](https://allianzstadiumtwickenham.com/nations-championship), [finals weekend](https://allianzstadiumtwickenham.com/nations-championship-finals-weekend), [Eng v NZ](https://allianzstadiumtwickenham.com/england-v-new-zealand-nations-championship-pool-match)).
- **Wembley:** England v Croatia, Thu 12 Nov 19:45 ([wembleystadium.com](https://www.wembleystadium.com/events/2026/England-v-Croatia), [match centre](https://www.englandfootball.com/england/mens-senior-team/fixtures-results/2026-27/nations-league/england-v-croatia-uefa-nations-league-thursday-12-november-2026-match-centre)). The sale-status conflict remains: general sale from 5 Nov with "buy tickets" vs an older "sold out" snapshot.
- **The O2** ([arena listing](https://www.theo2.co.uk/events/venue/the-o2-arena)): Noah Kahan 13–17 Nov run, Muse 15–16, The Script 21 ([page](https://www.theo2.co.uk/events/detail/the-script-2026)), Don Toliver 23, Mariah Carey 30 Nov ([page](https://www.theo2.co.uk/events/detail/mariah-carey-2026)), Jingle Bell Ball 5–6 Dec ([page](https://www.theo2.co.uk/events/detail/capitals-jingle-bell-ball-2026); one listing says 3 Dec; ticket status conflicts with yesterday's "on sale 6 Nov"), Kehlani 8 Dec (another listing says 7 Dec), Kasabian 18 Dec, **Disney On Ice 24 Dec – 3 Jan** (yesterday 24, 26–31 Dec and 2 Jan; the end date now conflicts: 2 vs 3 Jan). **Listed for the first time today and not used for pricing** (a single arena night each): Hatsune Miku 12, beabadoobee 18, Good Charlotte 19, Myles Smith 20, Bill Bailey 22, Jungle 24–25, Squeeze 26, Fontaines D.C. 27, Jessie Ware 28, LOTR in concert 29 Nov; Mo Gilligan 10, Pete Tong 11–12, RnB Winter Ball 13, Culture Club 19 Dec; RNBLAND NYE 31 Dec.
- **ExCeL** ([what's on](https://www.excel.london/whats-on)): #RISK 10–11; Business Show / Retail Supply Chain / Event Tech Live 11–12; Grad Fest 17–18; EV Show / B2B Marketing Live 18–19; Vet Show 19–20; elementalLONDON + London Build 25–26 Nov ([page](https://www.excel.london/whats-on/london-build-expo); the page states "25,000+ visitors"); FinTech Connect 1–2 Dec; Perfume Exhibition 10–13; **London International Horse Show 17–21 Dec**; Scrooge Cirque 23–28 Dec. New today: Wundrful World of Christmas 11 Nov – 24 Dec ([page](https://www.excel.london/visitor/whats-on/wundrful-world-of-christmas)), a long-run family attraction, not used for pricing. HOMES UK 24–25 Nov did **not** appear today: UNVERIFIED (kept in the analysis for continuity; P20 24 Nov and P04 24 Nov are above the fortnight anyway).
- **Alexandra Palace** ([what's on](https://www.alexandrapalace.com/whats-on/)): Fireworks & Drone 7–8 Nov ([page](https://www.alexandrapalace.com/whats-on/fireworks-drone-festival/)), Courteeners 14, Nia Archives 26, Blossoms 27 Nov. **Enter Shikari 20 Nov and Gorgon City 28 Nov were not confirmed today: UNVERIFIED, so I removed them** (no effect on totals: P11 is booked those nights). **World Darts 11 Dec – 3 Jan**, final Sun 3 Jan 20:00; the venue page states "a record 180,000 tickets" ([alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq)). One source says 4 Jan.
- **NYE** Thu 31 Dec, Ticketmaster only, £20–55. First batch went on sale 23 Oct; the second batch date is not announced ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)).
- **School holidays:** Christmas Mon 21 Dec – Fri 1 Jan ([Tower Hamlets](https://www.towerhamlets.gov.uk/lgnl/education_and_learning/schools/term_and_holiday_dates.aspx), [Camden](https://www.camden.gov.uk/term-dates), [H&F](https://www.lbhf.gov.uk/children-and-young-people/schools-and-colleges/school-term-and-holiday-dates)). Bank holidays 25, 26 and 28 Dec (Camden). February half term is outside the window.

How to read the table: "Our £ vs fortnight £" compares `prices.csv` 7 Nov with the fortnight average. "Effect" is market occupancy vs STLY from `neigh_<id>.json` 7 Nov. Properties come from the VENUES map in `build/properties.py`. P20 is not in that map, so it is shown as "nearby".

| Nights | Event | Venue | Open properties | Effect (mkt occ vs STLY) | Our £ vs fortnight £ | Priced by PL? |
|---|---|---|---|---|---|---|
| 8 Nov | Eng v Australia | Twickenham | P13 (P10 booked) | **soft** −11.1 | P13 **152** vs 166 | no |
| 7–8 Nov | Fireworks & Drone | Ally Pally | P08/P11 booked 8 Nov | – | – | – |
| 8–12 Nov | no verified event in map | – | P09 | +1.2 to +5.8 | 707 (8–12 + 7 Nov) vs P50 822 | at P25 |
| 10–11 Nov | #RISK + expos | ExCeL | P04 (P01, P20 booked) | **soft** −6.2 / −9.5 | P04 **157 / 158** vs 158 | no (level) |
| 12 Nov | England v Croatia | Wembley | P13 (P10 booked) | **soft** −11.1 | **162** vs 170 | no |
| 13–17 Nov | Kahan / Muse | O2 | P04 13; P20 13–17 | P04 −5.0; P20 +1.3, −9.4, −9.7, −1.9, +5.0 | P04 **161** vs 169; P20 271/**234/221/213/230** vs 249 | P20 13 Nov **yes now**; rest no |
| 14 Nov | Eng v Japan / Courteeners | Twickenham / Ally Pally | P13, P10, P11 booked | – | booked | – |
| 18–19 Nov | EV / Vet shows | ExCeL | P04 (P20 blocked: delivery) | soft −4.8 / −6.0 | P04 **161 / 162** vs 176 | no |
| 20–21 Nov | Script / Eng v NZ | O2 / Twickenham | P04, P20 (P13, P01, P09 booked) | P04 −2.8 / −2.2; P20 +3.7 / +0.3 | P04 **170 / 172** vs 181; P20 **239 / 244** vs 264 | no (P04 21 Nov fell 201 → 172) |
| 23–24 Nov | Don Toliver / (HOMES UK UNVERIFIED) | O2 / ExCeL | P04, P20 | P04 −3.2 / −2.4; P20 +6.1 / +0.4 | P04 193 / 193 vs 184; P20 301 / 301 vs 266–275 | yes |
| 26–28 Nov | Ally Pally gigs / Finals | Ally Pally / Twickenham | P13 27 Nov (P11 booked) | P13 **+11.2** | 333 vs 247 | yes |
| 30 Nov | Mariah Carey | O2 | P04, P20 booked; P01 blocked | – | – | – |
| 5–6 Dec | Jingle Bell Ball | O2 | P04 6; P20 5–6 | P04 −0.7; P20 +3.3 / +2.9 | P04 **188** vs 194; P20 332 / **293** vs 295 | P20 5 Dec yes; 6 Dec now £2 under |
| 8 Dec | Kehlani (7 or 8) | O2 | P04, P20 | P04 +1.8; P20 +2.2 | P04 **185** vs 194; P20 **277** vs 294 | no |
| 11–12 Dec | Darts opening | Ally Pally | P11 | **+9.5 / +3.3** | 322 / 326 vs 254 | yes |
| 13–17 Dec | Darts R1 | Ally Pally | P11 | **soft** −0.2 to −8.1 | **227/202/209/219/241** vs 280 | no (override conflict) |
| 16–18 Dec | Horse Show / Kasabian | ExCeL / O2 | P04 16–19; P20 16–18 | P04 +4.3 to +6.0; P20 −2.4, +1.5, +3.1 | P04 **189**/190/199/204 vs 190; P20 **268 / 269** / 279 vs 278 | mostly |
| 19–26 Dec | School Christmas holiday | London | P13 7–26 Dec open; P20 sold 19–25 | P13 +4.8 to +25.3 | P13 under P50 every night (§2) | **no for P13** |
| 23 Dec | Darts R2 | Ally Pally | P11 | −4.0 | **305** vs 320 | partly |
| 24 Dec – 2/3 Jan | Disney On Ice | O2 | P20 26 Dec – 2 Jan; P04 2 Jan | P20 +5.3 to +14.7; P04 +6.0 | P20 310–483 vs 259; P04 219 vs 193 | yes |
| 31 Dec | NYE | central | P20 | **+14.7** | 483 vs 271 | yes |
| 3 Jan | Darts final | Ally Pally | P11 | +4.9 | **188** vs 204 | no |
| 4 Jan – 4 Feb | no verified event | – | – | – | – | – |

## 4. Missed compression: open nights on verified events at or below the fortnight
| Ref | Night(s) | Event | Our £ 7 Nov (6 Nov) | Fortnight £ | Gap £ | Market support |
|---|---|---|---|---|---|---|
| P13 | 8 Nov | Eng v Australia | 152 (154) | 166 | **14** | none: −11.1 |
| P13 | 12 Nov | England v Croatia | 162 (163) | 170 | **8** | none: −11.1 |
| P04 | 10, 11 Nov | ExCeL expos | 157, 158 (153, 158) | 158 | 1, 0 | none |
| P04 | 13 Nov | Kahan | 161 | 169 | 8 | none: −5.0 |
| P20 | 14–17 Nov | Kahan / Muse | 234, 221, 213, 230 | 249 | 15, 28, 36, 19 = **98** | mixed: −9.7 to +5.0 |
| P04 | 18, 19 Nov | EV / Vet | 161, 162 | 176 | 15, 14 | none |
| P04 | 20, 21 Nov | Script | 170, **172 (201)** | 181 | 11, 9 | none |
| P20 | 20, 21 Nov | Script | 239, 244 | 264 | 24, 20 | +3.7 / +0.3 |
| P04 | 6 Dec | Jingle Bell Ball | 188 (186) | 194 | 6 | none: −0.7 |
| P20 | 6 Dec | Jingle Bell Ball | 293 (298) | 295 | 2 | +2.9 |
| P04 | 8 Dec | Kehlani | 185 | 194 | 9 | +1.8 |
| P20 | 8 Dec | Kehlani | 277 (243) | 294 | 17 | +2.2 |
| P04 | 16 Dec | Horse Show eve | 189 | 190 | 1 | +4.3 |
| P20 | 16, 17 Dec | Horse Show | 268, 269 (252, 256) | 278 | 10, 9 | −2.4 / +1.5 |
| P11 | 23 Dec | Darts R2 | 305 (300) | 320 | 15 | none: −4.0 |
| P11 | 3 Jan | Darts final | 188 | 204 | 16 | +4.9 |
| | | **Excluding darts R1** | | | **24 nights / £307** | |
| P11 | 13–17 Dec | Darts R1 (override conflict) | 227/202/209/219/241 | 280 | 53, 78, 71, 61, 39 = **£302** | none: −0.2 to −8.1 |
| | | **Full total** | | | **29 nights / £609** (6 Nov **27 / £612**) | |

- **Change vs yesterday: +2 nights / −£3.** The like-for-like baseline (6 Nov data, today's event list) is also 27 / £612.
  - **Off the list (−1 n / −£15):** P20 13 Nov (232 → 271 on the 7 Nov 01:30Z refresh, now above the fortnight).
  - **New (+3 n / +£11):** P04 21 Nov (201 → 172 on the 6 Nov 08:48Z refresh; £9); P04 11 Nov (now equal to the fortnight; £0); P20 6 Dec (293 vs a fortnight that rose from 276 to 295; £2).
  - **Larger:** P20 16 Nov £22 → £36; P20 Horse Show £6 → £19 (P20's December fortnight rose faster than the event nights); P11 darts R1 £297 → £302.
  - **Smaller:** P20 8 Dec £34 → £17 (243 → 277); P04 10 Nov £5 → £1; P13 12 Nov £10 → £8; P20 15 Nov £34 → £28; P11 23 Dec £17 → £15.
- **Where the market supports a raise** (occupancy clearly above STLY and our price under the fortnight or P50): **P13 Christmas** (+4.8 to +25.3, under P50 on all 20 nights), **P05 7–8 Dec and 13–21 Dec**, **P04 14–19 Dec** (+2.3 to +6.0; +£155 to P75), **P11 3 Jan** (+4.9). The other gaps (P04 and P13 in November, P20 14–16 Nov) rest only on the fortnight rule while the market runs below STLY. **I am not proposing those.**

## 5. Dates where our price should differ from PriceLabs
Nothing new proposed. All PriceLabs moves since yesterday are algorithmic; no edits were logged on 6–7 Nov.
- **Shepherd's Bush P13: CONFLICT for Corentin (unchanged).** (a) 12 Nov: ask ≥ £176 min 1 vs Reyhan's −10% min 2. Now £162; the market fell to −11.1 vs STLY and P25 is £174. (b) Christmas: ask +10% on 7–26 Dec (**+£413**) and min 2 on 25–26 Dec vs Reyhan's −7% and −5% min 3. Market +4.8 to +25.3; we are under P50 on all 20 nights. The cancelled 20–25 Dec booking (£184/n) shows Airbnb demand at about our current level.
- **St John's Wood P05:** 7–8 Dec to ~P75 (**+£261**); 13–21 Dec to P75 (**+£549**; Reyhan's 13–19 Dec −7% still in place, Corentin to confirm); 29 Dec down to about £1,071–1,082 (**−£264 to −£275**).
- **Canary Wharf P20:** suggest **dropping** the 13–16 Nov +10% ask: PriceLabs now prices all 4 nights above the P50 (£939 vs £856) and the market is −9.4/−9.7 on 14–15 Nov. 19–25 Dec is sold (§2b). 26 Dec–2 Jan and NYE are priced. **Unexplained second 15% on the Christmas booking: £252 → channel auditor.**
- **Camden P11:** 3 Jan ≥ £204 (+£16). 23 Dec: check after the next refresh (P11 not re-priced since 6 Nov 08:48Z).
- **Barking P04:** 14–19 Dec to P75: **£1,152 → £1,307 (+£155)**. Default £1,358; market occupancy +2.3 to +6.0 vs STLY, but absolute occupancy is low (9.7–22.9%). 21 Nov fell £29 at the refresh. The market does not support raising it back (−2.2).
- **Greenwich P09 8–12 Nov:** hold. The Smoobu £100 is gone from the snapshot.

Data gaps:
1. Market figures are PriceLabs Nearby Listings (Airbnb-derived, `cleaning_fee` null, not comp sets, horizon unstated). P05 bands may include 3 BR. P01/P06 rows date from 2 Nov; P08/P14 from 27 Oct. P10, P15–P19 and P02/P03/P07 were not pulled.
2. P04, P09, P11, P13 and P06 were last re-priced 6 Nov 08:40–08:48Z. Today's gaps on those listings will move at the next refresh; the size is NOT CHECKED.
3. P20 Christmas booking: the source of the second 0.85 (beyond the weekly 15%) is NOT CHECKED. The Airbnb price breakdown was not seen.
4. Events come from domain-restricted WebSearch summaries, not page reads (theo2.co.uk: `ENOTFOUND`, host not in the allowed network domains). Open conflicts: Croatia sold out vs on sale; Jingle Bell Ball 3 Dec vs 5–6 Dec and ticket status; Kehlani 7 vs 8 Dec; Disney On Ice end 2 vs 3 Jan; darts end 3 vs 4 Jan; Kahan run dates (13–17 range vs 13/14/17); HOMES UK 24–25 Nov, Enter Shikari 20 Nov and Gorgon City 28 Nov not re-confirmed (UNVERIFIED). Attendance is stated only for darts (180,000 tickets) and London Build (25,000+).
5. Live Smoobu and channel rates (P09 8–10 Nov) are NOT CHECKED here; the figures come from the `prices.csv` `smoobu_price` snapshot.
