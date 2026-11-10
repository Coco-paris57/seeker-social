# Market & demand calendar: run D = 2026-11-10 (window 10 Nov 2026 – 7 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Left out: P02/P03/P06/P07 intentional blocks; nights after handback (P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec); P14 numbers only; P13 = one flat (3064856 + 3090701). Not re-raised: P13 1 Dec +50%, 15%/20% stay discounts, Booking.com booster, P04 min stay 3, P04 2 Dec override (deprioritised; now £458 / user £495, min 1, numbers only).
- **Market data pulled 10 Nov 07:26–07:28Z, strictly one call at a time** (each call returned before the next was sent): `get_neighbourhood_data` (detail, future prices + occupancy) for P05 3166592, P13 3064856, P04 3562176, P11 3064196, P20 3547481, P12 2699998. All `all_operations_ok=true`. P09 (handback 26 Nov, 97% booked) not pulled; its 9 Nov row is carried forward. Raw: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m10/neigh_<id>.json`.
- `data/snapshots/2026-11-10/market.csv`: **copied forward from 9 Nov (108 lines) and 6 rows appended** under `.market.csv.lock` (114 lines).
- **PriceLabs edits since 9 Nov 06:00Z:** `get_user_logs` (listing, 9–10 Nov) = **49 entries, all by Reyhan, 9 Nov 14:06–14:10Z and 21:20–22:30Z.** Every listing changed was refreshed after the last edit (`raw/prices_<id>.json last_refreshed_at`: P11 21:22:03Z, P13 21:23:03Z, P05 21:24:06Z, P20 21:26:36Z, P04 21:27:47Z, P12 22:30:29Z), so `prices.csv` 10 Nov reflects them. Market-relevant ones:
  - **P05:** 13–14 Dec **+5% min 2**; 21 Dec and 29 Dec **+300% min 1**; **max 2,500 → 3,500** (14:08:54Z); 29 Nov–2 Dec −5% min 3; 4–31 Jan −10% min 3; Feb −8% min 4.
  - **P13 (3064856, copied to 3090701 + Vrbo):** 10 Dec +40% min 1 (14:07Z), then **10–26 Dec −2% min 3** (21:22:44Z, replaces 8 Nov's −5% min 2 on 10–20 Dec); 9–12 Nov −5% min 2.
  - **P11:** 22 Nov–18 Dec −8% min 3 (21:21:32Z) then **−3% min 3** (21:21:47Z, latest); 23–25 Dec **+5% min 2**; 10–13 and 18–19 Nov min 2 (no price).
  - **P04:** **base 220 → 200** (21:26:45Z, source `reviewPrices`); 9–24 Nov −7% then **−4%** min 3; 6–22 Dec −7% then **−3%** min 3; Jan −8% min 3; Feb −8% min 4.
  - **P20:** 1–20 Dec **0% min 3**; 13–15 and 20–21 Nov min 3 (no price, so the 8 Nov −5% is gone on those nights); Jan −5% min 3; Feb −5% min 4.
  - **P12:** **7–14 Dec −5% min 3** (22:30:10Z, after the 11–13 Dec cancellation); 12–20 Nov and 30 Nov–10 Dec −2% min 2.
  - **P14:** **min 500 → 450** (21:24:24Z). P06: 9–17 Nov −8% (blocked by policy; not assessed).
- **Our prices:** `data/snapshots/2026-11-10/prices.csv` `pricelabs_price` (11 Nov – 9 Jan); after 9 Jan the neighbourhood `final_price`. "Yesterday" = 9 Nov `prices.csv`. 10 Nov (tonight) is not in `prices.csv` and is not assessed.
- **Booking state:** Smoobu `reservations.csv` 10 Nov, confirmed rows only (P12 11–13 Dec and P13 11–15 Dec cancellations therefore count as open).
- **Fortnight method unchanged:** 7 nights each side; booked or blocked nights and nights above 2x the median left out; Horse Show and 3 Jan use one clean week. Scripts: `scratchpad/m10/analyse10.py` (same event set as 8–9 Nov), `ext10.py`, `open10.py`, `p04base.py`. Output: `scratchpad/m10/out10.txt`.
- **Events re-checked 10 Nov 2026** by WebSearch restricted to venue/organiser domains. WebFetch still returns `ENOTFOUND` for www.theo2.co.uk (that host, plus excel.london and alexandrapalace.com, must be allowed in the session's network settings). **Every event fact is a search summary of an official page, not a page read.**

## 1. Submarket table
Sources: `market.csv` 10 Nov (`p25/p50/p75/p90`, n = bedroom-matched PriceLabs Nearby Listings; `market_occ_30/60` from `pl_kpis.csv` 10 Nov `market_occupancy_next_30/60`); our occ = `pl_kpis.csv` `occupancy_next_30/60`.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | Our occ 30/60 | vs 9 Nov |
|---|---|---|---|---|---|---|
| Canary Wharf | P20 | 2 | 38 / 31% | 213 / **250 / 318** / 418 (153) | 60 / 50% | P50 −2, P75 −2 |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 35 / 29% | 2 Nov row: 214 / 258 / 331 / 421 | 100 / 100%* | not pulled |
| Barking | P04 | 2 | 24 / 20% | 138 / **174 / 216** / 259 (90) | 47 / 45% | P50 −2, P75 −3 |
| Greenwich (handback 26 Nov) | P09 | 1 | 37 / 32% | 9 Nov row: 110 / 133 / 160 / 204 | 97 / 98%* | not pulled |
| Mile End (handback 13 Dec) | P12 | 2 | 42 / 34% | 171 / **204 / 230** / 287 (118) | 57 / 70%** | P50 −1, P75 −3 |
| Marylebone (blocked on purpose) | P06 | 2 | 49 / 42% | 2 Nov row | 80 / 90%* | not pulled |
| Camden | P11 | 2 | 48 / 38% | 226 / **288 / 325** / 381 (169) | 57 / 48% | P50 −1, P75 −3 |
| St John's Wood | P05 | 4 | 43 / 39% | 451 / **572 / 715** / 1,175 (90) | 70 / 72% | P50 −3, P75 −5 |
| Shepherd's Bush | P13 | 2 | 43 / 37% | 190 / **221 / 275** / 340 (116) | 77 / 52% | P50 −1, P75 −2 |
| Islington (handback 13 Nov) / Primrose Hill (numbers only) | P08 / P14 | 2 / 1 | 51 / 43%; 46 / 38% | 27 Oct rows only | 100 / 100%*; 0 / 0% | not pulled |

\* Inflated by handback or intentional blocks. \*\* May still count the cancelled 11–13 Dec Booking.com nights (PriceLabs vs Smoobu; Smoobu is truth). Percentiles slipped £1–5 everywhere overnight; no submarket moved materially. No `market.csv` row for Bow, Little Venice, Fulham, Kings Langley, Ladbroke Grove, Bayswater, Woolwich or Hanger Lane.

## 2. Open raises re-checked (prices.csv 10 Nov vs 9 Nov; market = `m10/neigh_<id>.json`)
| Ask | 9 Nov | **10 Nov** | Market today | Status |
|---|---|---|---|---|
| **P13 Christmas +10%, min 2 on 25–26 Dec** (3064856, 17 open nights 10–26 Dec) | £3,623 | **£3,754 (+£131)**: Reyhan's 10–26 Dec −2% min 3 replaced 8 Nov's −5% min 2. Twin 3090701 £3,973. | P50 £4,137 / P75 £5,289; default (`uncustomized`) £3,877; **occ +3.8 to +25.7 pts vs STLY on all 17 nights** | **Better, still open.** Now under P50 on all 17 nights, no longer under P25 anywhere. +10% = **+£375**; to P50 = **+£383**. Min is now **3 on 25–26 Dec** (ask was min 2): conflict unchanged, Corentin to confirm. |
| **P05 7–8 Dec to ~P75** | £913 | **£947** (475 / 472), min 2 | P75 £1,149; default £1,171; occ **+5.8 / +2.3** | **Still open: +£202** (was +£257). |
| **P05 13–14 Dec orphan** (min 3 on a 2-night gap) | £1,144, min 3 | **£1,021** (520 / 501), **min 2** | P75 £1,159; occ **+11.5 / +5.0** | **Min-stay fixed** (Reyhan +5% min 2, 14:07:58Z): now sellable. Price is £138 under P75; the +5% did not hold the price (it fell £123 overnight; default 637/584). |
| **P05 21 Dec** (1-night orphan before 22 Dec check-in) | £645, min 2 (unsellable) | **£2,207** (user £2,177), min 1 | P75 £704, **P90 £891**, default £732; occ +3.6 | **Priced as a soft block**: Reyhan **+300% min 1** (14:08:13Z). 2.48x P90, 3.0x default. Min stay now allows a 1-night sale, but at this price the orphan will not sell. Not caused by the max change (2,207 < old max 2,500). |
| **P05 29 Dec down to ~default** (1-night orphan) | £1,332, min 1 | **£2,855** (user £2,825), min 1 | P90 £1,073, default £1,176; occ +1.7 | **Worse: +£1,679 above default** (was +£264). Reyhan **+300% min 1** (14:08:30Z); £2,855 is only possible because **max went 2,500 → 3,500** at 14:08:54Z. **CONFLICT with our open ask**: Corentin to confirm whether 21/29 Dec are meant to be blocked. |
| **P11 3 Jan ≥ fortnight** | £174 | **£174**, min 3 | fortnight £195; **P25 £178** / P50 £222; occ 17.8 vs 13.4 (**+4.4**) | **Still open: +£21; £4 under P25.** |
| **P11 23 Dec** | £281 | **£276**, min 2 (Reyhan +5% 23–25 Dec) | P50 £301; fortnight £300; occ −4.5 | Hold: market soft. |
| **P11 darts R1 13–17 Dec** (policy: 21 Oct Corentin raised to "average above £300"; 24 Oct "leave the +5% darts override as it is") | avg £207.8 | **avg £211.6** (221/195/200/209/233): Reyhan **−3%** min 3 on 22 Nov–18 Dec | P50 £242–264; occ −1.4, −8.4, −4.9, −4.9, +0.3 | **CONFLICT with a recorded decision** (the +5% Corentin said to keep is now −3%). Market soft on R1: no new proposal. Corentin to confirm. |
| **P04 14–19 Dec to P75** | £1,213 | **£1,141 (−£72)** | P75 £1,276; P50 £965; default £1,247; occ **+2.8 to +7.4** | **Worse: gap +£135** (was +£66). Cause: **base 220 → 200** plus 6–22 Dec −3%. Still a conflict with Reyhan's December override. |
| **P04 base cut 220 → 200** (Reyhan 9 Nov 21:26:45Z) | – | 31 open nights 11 Nov–9 Jan (excl. 2 Dec): **£5,287 vs £5,714 (−£427, −7.5%)**; Nov −£156, Dec −£164, Jan −£107 | P50 £4,852 / P75 £6,427 for the same nights; Nov open nights £1,450 vs P50 £1,550 | **Base decision: for Corentin to confirm.** Market: Nov soft on the event nights checked (occ −0.8 to −5.0 vs STLY), Dec open nights firm (+0.2 to +11.7). The cut is defensible for November, not for 14–19 Dec. |
| **P12 11–13 Dec reopened** (cancelled Booking.com 11–13 Dec) | 13 Dec £364, min 1 | **309 / 321 / 283 = £913**, min 3 (Reyhan 7–14 Dec −5% min 3) | P75 £813, P90 £1,046; occ **+5.4 / +6.7 / +9.7** | **OK.** Above P75 on every night. 7–13 Dec is a 7-night open block with min 3, so 13 Dec is no longer an orphan (sells as the last night of 11–13). 13 Dec fell £81 overnight. |

**Other nights:**
- **P20 5 Dec** still `unbookable=1`, min 3, £309 (default £386; occ +6.0). Reyhan's 1–20 Dec 0% override kept min 3. **Not fixed.**
- **P20 20 Nov** (new): open at £259, **min 3**, between the 18–19 Nov Smoobu block and the new 21–25 Nov Airbnb stay. A 1-night gap that cannot sell under min 3. 25 Nov is a check-in (no orphan there). The new stay covers 21–22 Nov, which `policy.json` lists as part of the delivery block (20–22 Nov); PriceLabs shows the block only on 18–19 Nov. For Corentin / ops.

## 3. Demand calendar, next 90 days
**Re-verified 10 Nov 2026** (WebSearch on official domains; summaries):
- **Wembley:** England v Croatia Thu 12 Nov 19:45, tickets on sale (general sale from 5 Nov) ([wembleystadium.com](https://www.wembleystadium.com/events/2026/England-v-Croatia), [England match centre](https://www.englandfootball.com/england/mens-senior-team/fixtures-results/2026-27/nations-league/england-v-croatia-uefa-nations-league-thursday-12-november-2026-match-centre)). Yesterday's "sold out" is not repeated.
- **Twickenham:** England v Japan Sat 14 Nov 16:40 (one page says 17:20); England v New Zealand Sat 21 Nov 14:10; Finals Weekend 27–29 Nov, Grand Final Sun 29 Nov ([allianzstadiumtwickenham.com/nations-championship](https://allianzstadiumtwickenham.com/nations-championship), [englandrugby.com](https://www.englandrugby.com/follow/news-and-media/england-v-japan-preview-2026-nations-championship)).
- **The O2** ([arena listing](https://www.theo2.co.uk/events/venue/the-o2-arena), [Noah Kahan](https://www.theo2.co.uk/events/detail/noah-kahan-2026), [Don Toliver](https://www.theo2.co.uk/events/detail/don-toliver-2026), [Kasabian](https://www.theo2.co.uk/events/detail/kasabian-2026)):
  - Confirmed today: Pokémon Night Out 10, SBTV20 11, Hatsune Miku 12, **Noah Kahan 13/14/17** (event page), Muse 15, The Script 21, Bill Bailey 22, **Don Toliver 23 Nov** (event page), Jungle 24–25, Squeeze 26, Fontaines D.C. 27, Jessie Ware 28, LOTR in Concert 29, Mariah Carey 30 Nov; Phoebe Bridgers 1–2, Kehlani 8, Ocean Colour Scene 9, Greg Davies 16, **Kasabian 18 Dec** (event page), Amr Diab 19, Disney On Ice 24 Dec – 3 Jan.
  - **Conflicts today:** the events index shows Don Toliver 24–25 Nov; a premium-seating page shows Kasabian 19 Dec; the venue listing shows Kahan 15–16 Nov; Bryson Tiller shows 3 Dec (yesterday 7 Dec); Myles Smith 20–21 Nov (yesterday 20). **beabadoobee 18 / Good Charlotte 19 Nov did not appear today: UNVERIFIED today.** I keep event-page dates.
  - **Jingle Bell Ball Sat 5 – Sun 6 Dec**, Capital says sold out ([theo2 event page](https://www.theo2.co.uk/events/detail/capitals-jingle-bell-ball-2026), [capitalfm.com](https://www.capitalfm.com/news/jingle-bell-ball-2026-date-venue-info/)). One O2 entry says 7 Dec (looks wrong).
- **ExCeL** ([what's on](https://www.excel.london/whats-on)): Business Show 11–12 Nov; Wundrful World of Christmas 14 Nov – 24 Dec; London Build Expo / elementalLONDON 25–26 Nov; FinTech Connect 1–2 Dec; Perfume Exhibition 10–13 Dec; **London International Horse Show 17–21 Dec** ([excel.london](https://www.excel.london/visitor/whats-on/london-international-horse-show)); Scrooge Cirque 23–28 Dec; **MegaCon Live Sat 23 – Sun 24 Jan** ([excel.london](https://www.excel.london/whats-on/megacon-live)); Festival of Genomics 27–28 Jan. **EV Show / Vet Show 18–20 Nov and HOMES UK 24–25 Nov: still UNVERIFIED** (absent from today's summary).
- **Alexandra Palace:** **World Darts 11 Dec – 3 Jan**: R1 11–20 Dec, R2 20–23, R3 27–29, R4 29–30 Dec, QF 1 Jan, SF 2 Jan, final 3 Jan 20:00; **180,000 tickets** (stated), ballot closed ([alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq)). One PDC news item still says 4 Jan.
- **NYE** Thu 31 Dec 20:00 – 00:30, Ticketmaster only, £20–55, second batch date not announced ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)).
- **School holidays:** Camden Christmas break Mon 21 Dec – Fri 1 Jan; spring term from Mon 4 Jan; **spring half-term Mon 15 – Fri 19 Feb** (outside the window) ([camden.gov.uk/term-dates](https://www.camden.gov.uk/term-dates)). Tower Hamlets not re-read today. 28 Dec bank-holiday substitute not re-checked.
- **Hyde Park Winter Wonderland** (19 Nov – 3 Jan, 9 Nov check): VENUES properties P03/P06 blocked, P16 no data; not assessed.

Effect = market occupancy vs STLY (pts, `m10`). "Our £ vs fortnight £" = `prices.csv` 10 Nov vs fortnight average. Properties from the VENUES map in `build/properties.py` (P20 shown as nearby for the O2/ExCeL; P05/P12/P13 not on the map).

| Nights | Event | Venue | Open properties | Effect | Our £ vs fortnight £ | Priced by PL? |
|---|---|---|---|---|---|---|
| 11 Nov | Business Show | ExCeL | P04 (P01, P20 booked) | **soft** −5.0 | P04 **139** vs 141 | no |
| 12 Nov | England v Croatia | Wembley | P13 (P10 booked) | **soft** −11.5 | **192** vs 202 | no |
| 13–17 Nov | Kahan / Muse | O2 | P04 13; P20 13–17 | P04 −0.8; P20 −2.7, −9.7, −8.7, −0.5, +5.1 | P04 **144** vs 145; P20 294 / 306 / **249 / 243 / 237** vs 250 | P20 13–14 yes (min 3, −5% removed) |
| 18–19 Nov | EV / Vet + O2 (UNVERIFIED today) | ExCeL / O2 | P04 (P20 blocked) | −1.6 / −2.0 | P04 **140 / 144** vs 152 | no |
| 20–21 Nov | Script / Eng v NZ | O2 / Twickenham | P04; P20 20 (orphan, min 3) | P04 −0.9 / −3.0; P20 +4.7 | P04 **149 / 152** vs 158; P20 **259** vs 278 | no |
| 23 Nov | Don Toliver | O2 | P04 (P20 now booked) | −2.9 | P04 **147** vs 163 | no |
| 24 Nov | Jungle (HOMES UK UNVERIFIED) | O2 / ExCeL | P04 | −1.9 | P04 **148** vs 162 (9 Nov £199) | **no, newly** (base cut) |
| 27 Nov | Finals Weekend | Twickenham | P13 | **+18.0** | 338 vs 245 | yes |
| 5–6 Dec | Jingle Bell Ball (sold out) | O2 | P20 5 (unbookable); P04 6 | P20 +6.0; P04 +1.7 | P20 **309** vs 334; P04 **186** vs 186 | no |
| 8 Dec | Kehlani | O2 | P04 | +6.8 | **185** vs 188 | no (−£3) |
| 11–12 Dec | Darts opening | Ally Pally | P11 | +9.2 / +3.3 | 313 / 315 vs 246 | yes |
| 11–13 Dec | (no event; reopened) | Mile End | P12 | +5.4 / +6.7 / +9.7 | 309 / 321 / 283, above P75 | yes |
| 13–17 Dec | Darts R1 | Ally Pally | P11 | **soft** −8.4 to +0.3 | **221 / 195 / 200 / 209 / 233** vs 264 | no (Reyhan −3%) |
| 16–19 Dec | Horse Show / Greg Davies / Kasabian 18 | ExCeL / O2 | P04 16–19; P20 16–18 | P04 +5.4 (16); P20 −3.2 / – / +2.0 | P04 **187** / 189 / 197 / 204 vs 188; P20 **294** / 323 / **304** vs 311 | mostly |
| 10–26 Dec | pre-Christmas / school holiday from 21 Dec | London | P13 | **+3.8 to +25.7** | under P50 every night (§2) | **no for P13** |
| 23–25 Dec | Darts R2 / Christmas | Ally Pally | P11 | −4.5 to −7.4 | 276 / 257 / 267 vs 300 (23 Dec) | no; market soft |
| 24 Dec – 3 Jan | Disney On Ice | O2 | P20 26 Dec – 2 Jan; P04 2 Jan | – | P20 325–515 vs 280; P04 202 vs 181 | yes |
| 31 Dec | NYE | central | P20 | – | 515 vs 289 | yes |
| 3 Jan | Darts final | Ally Pally | P11 | +4.4 | **174** vs 195 | no |
| 22–23 Jan | MegaCon Live (no attendance stated) | ExCeL | P20, P04 (neighbourhood `final_price`) | P20 +7.5 / +8.6, P04 −1.4 / −2.9 (absolute 2–11%) | P20 **251** / 273 vs 258; P04 164 / 168 vs 162 | mostly; far out, not in totals |
| 27–28 Jan | Festival of Genomics | ExCeL | P20, P04 | absolute 2–8% | P20 278 / 270; P04 160 / 161 | normal; not assessed |

## 4. Missed compression: open nights on verified events at or below the fortnight
Same event set and method as 8–9 Nov (`m10/out10.txt`).

| Ref | Night(s) | Event | Our £ 10 Nov (9 Nov) | Fortnight £ | Gap £ | Market (occ vs STLY) |
|---|---|---|---|---|---|---|
| P04 | 11 Nov | ExCeL expos | 139 (150) | 141 | 2 | −5.0 |
| P13 | 12 Nov | England v Croatia | 192 (181) | 202 | **10** | −11.5 |
| P04 | 13 Nov | Kahan | 144 (154) | 145 | 1 | −0.8 |
| P20 | 15, 16, 17 Nov | Muse / Kahan | 249, 243, 237 (232, 224, 221) | 250 | 1, 7, 13 = **21** | −8.7 / −0.5 / +5.1 |
| P04 | 18, 19 Nov | EV / Vet + O2 (**UNVERIFIED today**) | 140, 144 (154, 155) | 152 | 12, 8 | −1.6 / −2.0 |
| P04 | 20, 21 Nov | Script | 149, 152 (162, 165) | 158 | 9, 6 | −0.9 / −3.0 |
| P20 | 20 Nov | Script (**min-3 orphan**) | 259 (239) | 278 | 19 | +4.7 |
| P04 | 23 Nov | Don Toliver | 147 (158) | 163 | 16 | −2.9 |
| **P04** | **24 Nov** | Jungle / HOMES UK | **148 (199)** | 162 | **14 (new)** | −1.9 |
| P04 | 6 Dec | Jingle Bell Ball | 186 (197) | 186 | 0 | +1.7 |
| P20 | 5 Dec | Jingle Bell Ball (**unbookable orphan**) | 309 (281) | 334 | 25 | +6.0 |
| P04 | 8 Dec | Kehlani | 185 (197) | 188 | 3 | +6.8 |
| P04 | 16 Dec | Horse Show eve | 187 (198) | 188 | 1 | +5.4 |
| P20 | 16 Dec | Horse Show | 294 (277) | 311 | 17 | −3.2 |
| **P20** | **18 Dec** | Horse Show / Kasabian | **304 (291)** | 311 | **7 (new)** | +2.0 |
| P11 | 23 Dec | Darts R2 | 276 (281) | 300 | 24 | −4.5 |
| P11 | 3 Jan | Darts final | 174 (174) | 195 | 21 | +4.4 |
| P11 | 13–17 Dec | Darts R1 (Reyhan −3%) | 221 / 195 / 200 / 209 / 233 | 264 | 43, 69, 64, 55, 31 = **262** (was 281) | −8.4 to +0.3 |
| | | **Total, same method as yesterday** | | | **26 nights / £478** (9 Nov **29 / £683**) | |
| | | Of which bookable, excluding darts R1 and the two orphans | | | **19 nights / £172** | |

- **Change vs yesterday: −3 nights / −£205.** This is mostly **not** PriceLabs catching up:
  - **Booked: −2 nights / −£68.** The new P20 Airbnb 21–25 Nov stay took 21 Nov (£26) and 23 Nov (£42).
  - **Reyhan's 9 Nov P20 / P11 edits: −£131.** P20 13–15 Nov lost its −5%: 14 Nov now above the fortnight (−£22, −1 night), 15–17 Nov −£67. P20 20 Nov −£14. P20 1–20 Dec 0%: 5 Dec −£15; 16–18 Dec +£6 net (17 Dec out, −1 night; 18 Dec in, +1 night, as the fortnight rose). P11 R1 −5% → −3%: −£19.
  - **Night passed:** P04 10 Nov dropped (−£2, −1 night).
  - **P04 base cut + new overrides: −£8 net.** P04 prices fell £10–51 a night, but the fortnight fell too: the other November nights −£17, December −£5. **New: P04 24 Nov (+£14, +1 night)**, which fell £51 (199 → 148). The fortnight rule hides the absolute P04 drop: **−£427 on 31 open nights** (§2).
  - Other: P13 12 Nov +£2 (fortnight 189 → 202); P11 23 Dec +£3; P11 3 Jan −£1. Check: −68 −2 −131 −8 +4 = −£205.
- **Extra event nights outside the set** (`ext10.py`; not in totals): P04 7 Dec £186 vs £187 (Bryson Tiller, date now conflicting: 3 vs 7 Dec); P20 22 Jan £251 vs £258 (MegaCon, far out).
- **Where the market supports a raise** (occ clearly above STLY and our price under P50 or the fortnight): **P13 10–26 Dec**, **P05 7–8 Dec and 13–14 Dec**, **P04 14–19 Dec**, **P11 3 Jan**, **P20 5 Dec** (blocked by min stay, not price). The rest rest on the fortnight rule alone with market at or below STLY: not proposed.

## 5. Dates where our price should differ from PriceLabs
Nothing new beyond the open asks; three settings changes need Corentin.
- **St John's Wood P05:** 7–8 Dec to ~P75 **+£202**; 13–14 Dec (now sellable, min 2) to ~P75 **+£138**; **21 and 29 Dec +300% (£2,207 / £2,855)** are soft blocks: if the intent is to sell the orphans, 21 Dec ~£704–891 (P75–P90) and 29 Dec ~£1,073–1,176 (P90–default). **Conflict, Corentin to confirm.** Max 2,500 → 3,500 (Reyhan 14:08:54Z) only matters for 29 Dec.
- **Shepherd's Bush P13 Christmas:** +10% = **+£375** (to P50 +£383); min 3 on 25–26 Dec still conflicts with the min 2 ask.
- **Camden P11:** darts R1 avg **£211.6**: **conflict** with the recorded "+5% / average above £300" decisions (now −3%); 3 Jan ≥ £195 (**+£21**, £4 under P25); 23 Dec hold.
- **Barking P04:** **base 220 → 200 for Corentin to confirm** (−£427 on 31 open nights); 14–19 Dec to P75 **+£135**.
- **Primrose Hill P14:** **min 500 → 450** (Reyhan 21:24:24Z) **conflicts with `policy.json` special_setups.P14** ("incl. the £500 minimum"). Reported for Corentin; no proposal.
- **Canary Wharf P20:** 5 Dec orphan still unbookable (min 3); 20 Nov now a min-3 orphan too.
- **Mile End P12:** 11–13 Dec fine (above P75, min 3).

Data gaps:
1. Market figures are PriceLabs Nearby Listings: Airbnb-derived, `cleaning_fee` null, not comp sets, horizon unstated. P05 bands may include 3 BR. P01/P06 rows date from 2 Nov, P08/P14 from 27 Oct, P09 from 9 Nov. P10, P15–P19 and P02/P03/P07 not pulled.
2. Why P05 13–14 Dec fell £123 overnight despite the +5%, and why P05 21 Dec = 4 x £551.75 rather than 4 x the default £732: NOT CHECKED (customizations not pulled).
3. P12 `pl_kpis` occupancy may still count the cancelled 11–13 Dec nights; the Smoobu block for P20's delivery (policy 20–22 Nov) vs PriceLabs' 18–19 Nov block: NOT CHECKED in Smoobu.
4. Events are domain-restricted WebSearch summaries, not page reads. WebFetch fails with `ENOTFOUND` for www.theo2.co.uk (plus excel.london and alexandrapalace.com): those hosts must be allowed in the session's network settings. Open conflicts: Don Toliver 23 vs 24–25 Nov; Kasabian 18 vs 19 Dec; Kahan 13/14/17 vs 15–16; Bryson Tiller 3 vs 7 Dec; Jingle Bell Ball stray 7 Dec entry; darts 3 vs 4 Jan; EV/Vet Show 18–20 Nov, HOMES UK 24–25 Nov, beabadoobee/Good Charlotte 18–19 Nov UNVERIFIED today; 28 Dec bank holiday not re-checked. Attendance stated only for darts (180,000 tickets).
5. Live Smoobu and channel rates NOT CHECKED here; all figures are from the `prices.csv` snapshot (refreshed after Reyhan's edits; push not confirmed).
