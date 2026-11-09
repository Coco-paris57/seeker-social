# Market & demand calendar: run D = 2026-11-09 (window 9 Nov 2026 – 6 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Left out: P02/P03/P06/P07 intentional blocks; nights after handback (P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec); P14 numbers only; P13 = one flat (3064856 + 3090701). Not re-raised: P13 1 Dec +50%, 15%/20% stay discounts, Booking.com booster, P04 min stay 3.
- **Market data pulled 9 Nov ~07:20Z** with `get_neighbourhood_data` (detail, future prices + occupancy) for P05 3166592, P13 3064856, P04 3562176, P11 3064196, P20 3547481, P12 2699998, P09 3318172. **Process error:** P05 was pulled on its own, but I then sent the other six calls together, which breaks the one-call-at-a-time rule. None failed (every call `all_operations_ok=true`). Raw files: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m09/neigh_<id>.json`. Market at booking time for the P05 booking comes from yesterday's pull (`.../scratchpad/m08/neigh_3166592.json`, 8 Nov 07:17Z).
- `data/snapshots/2026-11-09/market.csv`: **copied forward from 8 Nov, with 7 rows appended** under `.market.csv.lock` (108 lines).
- **PriceLabs edits since 8 Nov 06:00Z.** `get_user_logs` (listing, 8–9 Nov) returned **8 entries, all by Reyhan, 8 Nov 12:38:36–12:41:48Z. Every one is a further cut:**
  - **P11** 10 Nov–18 Dec: **−5%** min 2 (was −2%). This covers the darts nights.
  - **P13** 10–20 Dec: **−5%** min 2 (was −2%), copied to 3090701 and the Vrbo listing.
  - **P20**: −5% min 2 **re-added** on 13–17 and 20–24 Nov. Yesterday these nights had min 2 with no price change.
  - **P04** 9–24 Nov: **−5%** min 3 (was −3%). Confirmed with `get_listing_date_overrides` (updated 12:41:47Z).
  - Nothing was logged for P05 or P12.
- **Our prices:** `data/snapshots/2026-11-09/prices.csv` `pricelabs_price`. Last refresh per listing (`raw/prices_<id>.json last_refreshed_at`): P04, P05, P11, P12, P13 and P20 8 Nov 12:37–12:42Z; P09 8 Nov 07:56Z. "Yesterday" means the 8 Nov `prices.csv`. For dates after 5 Jan I used the neighbourhood `final_price`. `prices.csv` starts on 10 Nov, so tonight (9 Nov) is not assessed.
- **Booking state:** Smoobu `reservations.csv` 9 Nov, confirmed rows only.
- **Fortnight method unchanged from 8 Nov:** 7 nights on each side; booked or blocked nights and nights above 2x the median are left out. Horse Show and 3 Jan use one clean week. Scripts: `scratchpad/m09/analyse09.py` (same event set as 8 Nov), `scratchpad/m09/ext09.py` (extra event nights), `scratchpad/m09/open09.py`. Output: `scratchpad/m09/out09.txt`.
- **Events re-checked 9 Nov 2026** with WebSearch restricted to venue and organiser domains. WebFetch still fails with `ENOTFOUND` for www.theo2.co.uk; that host (and excel.london and alexandrapalace.com, which failed on 8 Nov) must be allowed in the session's network settings. **Every event fact here is a search summary of an official page, not a page I read myself.**

## 1. Submarket table
Sources: `market.csv` 9 Nov (`p25/p50/p75/p90`, n = bedroom-matched Nearby Listings, `market_occ_30/60`); `pl_kpis.csv` 9 Nov (`occupancy_next_30/60`).

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | Our occ 30/60 | vs 8 Nov |
|---|---|---|---|---|---|---|
| Canary Wharf | P20 | 2 | 38 / 31% | 214 / **252 / 320** / 420 (153) | 57 / 50% | P50 +1 |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 35 / 29% (pl_kpis) | 2 Nov row: 214 / 258 / 331 / 421 | 100 / 100%* | not pulled |
| Barking | P04 | 2 | 24 / 20% | 140 / **176 / 219** / 261 (89) | 50 / 47% | P90 −3 |
| Greenwich (handback 26 Nov) | P09 | 1 | 37 / 32% | 110 / **133 / 160** / 204 (124) | 97 / 98%* | P50 −1 |
| Mile End (handback 13 Dec) | P12 | 2 | 42 / 35% | 173 / **205 / 233** / 290 (120) | 60 / 73% | P25 +2 |
| Marylebone (blocked on purpose) | P06 | 2 | 49 / 42% (pl_kpis) | 2 Nov row | 77 / 88%* | not pulled |
| Camden | P11 | 2 | 48 / 39% | 228 / **289 / 328** / 383 (169) | 47 / 43% | P75 −2 |
| St John's Wood | P05 | 4 | 43 / 40% | 461 / **575 / 720** / 1,180 (90) | 73 / 63%** | 0 |
| Shepherd's Bush | P13 | 2 | 44 / 39% | 190 / **222 / 277** / 342 (116) | 73 / 52% | P50 −2 |
| Islington (handback 13 Nov) / Primrose Hill (numbers only) | P08 / P14 | 2 / 1 | 51 / 44%; 46 / 38% (pl_kpis) | 27 Oct rows only | 100 / 100%*; 0 / 0% | not pulled |

\* Inflated by handback or intentional blocks. \*\* The P05 figure leaves out the new 15–21 Dec booking. PriceLabs had not synced it at the 8 Nov 12:39Z refresh: `booking_status` is blank on 15–20 Dec. There is no `market.csv` row for Bow, Little Venice, Fulham, Kings Langley, Ladbroke Grove, Bayswater, Woolwich or Hanger Lane.

## 2. New booking: P05 St John's Wood, Airbnb, 15–21 Dec (6 nights), booked 8 Nov (37 days out)
Source: `reservations.csv` 9 Nov. Room **£2,962.17** (£493.70/night), cleaning £195, commission £489.36.

| Comparator, 15–20 Dec (6 nights) | £ | Paid as share |
|---|---|---|
| PriceLabs `price`, 8 Nov 12:39Z refresh (`2026-11-09/raw/prices_3166592.json`): 569/576/604/613/650/645. Equals 9 Nov `booked_price`. | **3,657** | **0.8100 exactly** (3,657 × 0.81 = 2,962.17) |
| PriceLabs `price`, 7 Nov 12:31Z refresh (`2026-11-08/raw`): 569/576/616/622/657/660 | 3,700 | 0.801 |
| PriceLabs default (`uncustomized_price`, 9 Nov raw) | 3,757 | 0.788 |
| Market P25 / **P50** / **P75** / P90 at booking (`m08/neigh_3166592.json`, 8 Nov 07:17Z, 4 BR) | 2,301 / **2,969** / **3,932** / 4,889 | 1.287 / **0.998** / **0.753** / 0.606 |
| Market booked-P50 at booking | 2,777 | 1.067 |
| Market P75 today (`m09`) | 3,914 | 0.757 |

- **Against PriceLabs:** the guest paid **exactly 0.81x** the 8 Nov 12:39Z PriceLabs price. The policy weekly 15% does **not** apply to a 6-night stay. That leaves **19% off (£694.83) unexplained by policy.** 0.81 = 0.9 × 0.9, which fits two 10% layers. One could be a length-of-stay 5+ rule (the Shepherd's Bush Airbnb listings had one in `policy.json` 21 Oct; P05's Airbnb rules are NOT CHECKED). The other could be the same unexplained 0.900 layer seen on P20 6–14 Dec (29 days out). Cause NOT CHECKED; passing to the channel auditor.
  - The pull notes say P05 was refreshed at ~12:37–12:40Z on 8 Nov without a push. The exact match to that refresh suggests the Smoobu/Airbnb rate did carry it; NOT CHECKED.
- Reyhan's **−2% on 13–19 Dec** applied to 15–19 Dec. Without it, the same 0.81 would have paid about **+£50**.
- **Against the market: yes, it sold below market P75, by £970** (0.753x). It sold **at P50** (£7 under) and 1.07x the market booked-P50.
  - Market occupancy was **+6.3, +5.4, +7.8, +2.9, +8.5 and +3.0 pts vs STLY** on 15–20 Dec (`m08`), so these were compressing nights.
  - Our list price was already **£275 under P75** (0.930x). The 19% Airbnb layer did the rest (£695).
  - Had the list price been at P75 with the same 0.81, the stay would have paid about **£3,185 (+£223)**.
- **Knock-on: orphans.** 13–14 Dec is now a 2-night gap (9–13 Dec stay, then this one) with **min 3**. 21 Dec is a 1-night gap before the 22 Dec check-in, with **min 2**. The 9 Nov raw still shows them bookable (`unbookable=0`), but only because PriceLabs had not yet synced the booking. Once it syncs, they **cannot sell under the current min stays**. Market: 13 Dec +10.9, 14 Dec +3.6, 21 Dec +3.4. Our £579 / £565 / £645 vs P75 £587 / £589 / £708. The fix is min stay (Reyhan / Corentin), not price.
- **P05 tonight (9 Nov):** `reservations.csv` has no stay on 9 Nov (6–9 Nov departs today; next arrival 10 Nov). The Airbnb £253.44 Special Offer was NOT CHECKED here (channel auditor). `prices.csv` does not cover 9 Nov.

## 3. Open raises re-checked (prices.csv 9 Nov; market = `m09/neigh_<id>.json`)
| Ask | 8 Nov | **9 Nov** | Market today | Status |
|---|---|---|---|---|
| **P13 Christmas +10%, min 2 on 25–26 Dec** (3064856; 17 open nights, 10–26 Dec) | £3,675 | **£3,623 (−£52)**: Reyhan **−5% on 10–20 Dec** (was −2%). Min 2 on 10–20 Dec, min 3 on 21–26 Dec. Twin 3090701: £3,834. | P50 £4,181 / P75 £5,326; default £3,922; **occupancy +4.2 to +25.6 pts vs STLY on all 17 nights** | **Worse, and now a CONFLICT.** We are under P50 on every night and **under P25 on 25–26 Dec** (£216 vs £219; £219 vs £221). +10% = **+£362**; to P50 = **+£558**. Reyhan cut again the same day the market rose. Corentin to confirm which stands. The min 2 vs min 3 conflict on 25–26 Dec is unchanged. |
| **P05 7–8 Dec to ~P75** | £917 | **£913** (464 / 449), min 2 | P75 £1,170; default £1,114; occupancy **+6.5 / +3.0** | **Still open: +£257.** |
| **P05 13–21 Dec to P75** | 9 nights, £5,507 | **15–20 Dec sold (§2).** 13, 14 and 21 Dec are open at £1,789. | P75 £1,884 | The price gap is **+£95**. These three nights are now **min-stay orphans** (§2); the price ask is secondary. |
| **P05 29 Dec ~ default** (min 1, 1-night orphan) | £1,346 | **£1,332**, min 1 | default **£1,068**, P90 £1,084, P75 £817; occupancy 53.7% vs 51.0% (+2.7) | **Still open: £248–264 above P90 / default.** |
| **P11 3 Jan ≥ fortnight** | £178 | **£174**, min 3 | fortnight £196; **P25 £180** / P50 £226; occupancy 17.5% vs 13.9% (**+3.6**) | **Worse: +£22**, and **£6 under P25**. |
| **P11 23 Dec** | £281 | **£281** | P50 £299; fortnight £302; occupancy −3.2 | Hold: the market does not support a raise. |
| **P04 14–19 Dec to P75** | £1,218 | **£1,213** | P75 £1,279; P50 £968; default £1,354; occupancy **+1.5 to +6.3** (absolute 9.6–24.1%) | **Gap +£66** (was +£87). Still a **CONFLICT** with Reyhan's 6–22 Dec −5% min 3. |
| **P11 darts R1 13–17 Dec** (policy 21 Oct: Corentin raised to "average above £300/night") | avg £215.6 | **avg £207.8** (217/193/197/205/227): Reyhan **−5%** (was −2%) | P50 £243–266; occupancy −0.6, −7.7, −5.1, −5.7, 0.0 | **CONFLICT with a recorded decision, now deeper (−£39 on 5 nights).** The market is soft on R1, so I make no new proposal. Corentin to confirm. |

**Other nights:**
- **P20 5 Dec** is still `unbookable=1`, min 3, £281 (default £370; market +5.0). Not fixed.
- **P12 13 Dec** £364, min 1 (P50 £210, P90 £365, occupancy +8.8). It is bookable and priced at P90.
- **P04 2 Dec** is a +200% min 1 override (set 20 Oct, `get_listing_date_overrides`), priced at £498 (P90 £292). It works as a soft block on a 1-night orphan; I make no proposal.

## 4. Demand calendar, next 90 days
**Re-verified 9 Nov 2026** (WebSearch on official domains; search summaries):
- **Twickenham:** England v Japan Sat 14 Nov 16:40; England v New Zealand Sat 21 Nov 14:10; Finals Weekend Fri 27 – Sun 29 Nov, with double-headers each day and the Grand Final Sun 29 Nov ([allianzstadiumtwickenham.com/nations-championship](https://allianzstadiumtwickenham.com/nations-championship), [England Rugby finals FAQ](https://help.englandrugby.com/support/solutions/articles/103000396133-nations-championship-finals-weekend-faqs)).
- **Wembley:** England v Croatia, Thu 12 Nov 19:45 ([wembleystadium.com](https://www.wembleystadium.com/events/2026/England-v-Croatia)). Ticket status conflicts: a homepage snapshot says "Sold out", while the event page and the [England match centre](https://www.englandfootball.com/england/mens-senior-team/fixtures-results/2026-27/nations-league/england-v-croatia-uefa-nations-league-thursday-12-november-2026-match-centre) still sell.
- **The O2** ([arena listing](https://www.theo2.co.uk/events/venue/the-o2-arena)):
  - November: Pokémon Night Out 10, SBTV20 11, Hatsune Miku 12, Noah Kahan 13–17 (the description says 13, 14 and 17), **Muse 15–16 (re-verified today)**, beabadoobee 18, Good Charlotte 19, Myles Smith 20, The Script 21, Bill Bailey 22, Don Toliver 23, Jungle 24–25, Squeeze 26, Fontaines D.C. 27, Jessie Ware 28, Mariah Carey 30 Nov ([page](https://www.theo2.co.uk/events/detail/mariah-carey-2026)).
  - December: Phoebe Bridgers 1–2, Bryson Tiller 7, Kehlani 8 ([page](https://www.theo2.co.uk/events/detail/kehlani-2026)), **Kasabian Fri 18 Dec** ([page](https://www.theo2.co.uk/events/detail/kasabian-2026)), Culture Club 19 ([page](https://www.theo2.co.uk/events/detail/culture-club-2026)), **Disney On Ice 24 Dec – 3 Jan**.
  - **Jingle Bell Ball Sat 5 – Sun 6 Dec** ([event page](https://www.theo2.co.uk/events/detail/capitals-jingle-bell-ball-2026), [capitalfm.com](https://www.capitalfm.com/news/jingle-bell-ball-2026-date-venue-info/)). Capital says sold out. The arena listing summary still says 3 Dec.
- **ExCeL** ([what's on](https://www.excel.london/whats-on)): #RISK 10–11; Business Show / Retail Supply Chain / Event Tech Live 11–12; London Build / elementalLONDON 25–26 Nov; Perfume Exhibition 10–13 Dec; **London International Horse Show Thu 17 – Mon 21 Dec** ([londonhorseshow.com](https://londonhorseshow.com/)); Scrooge Cirque 23–28 Dec; Wundrful World of Christmas (Excel Waterfront) 11 Nov – 24 Dec.
  - **EV Show / B2B Marketing Live 18–19 and Vet Show 19–20 Nov did not appear in today's summary: UNVERIFIED today** (verified 8 Nov). The 18–19 Nov nights are still covered by the O2 dates (beabadoobee, Good Charlotte).
  - **HOMES UK 24–25 Nov: still UNVERIFIED.** It does not affect the totals, because P04 and P20 24 Nov are above the fortnight.
- **Alexandra Palace:** **World Darts Fri 11 Dec – Sun 3 Jan**, semi-finals 2 Jan, final 3 Jan 20:00. Tickets are capped at **180,000 across 36 sessions** (stated by the source) ([alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq)). One snippet from the venue's what's-on page says "4–23 Dec" and one PDC ballot notice says 4 Jan; the event page and the PDC schedule agree on 11 Dec – 3 Jan.
  - Gigs ([what's on](https://www.alexandrapalace.com/whats-on/)): Courteeners 14, **Enter Shikari 20–21 (new)**, Nia Archives 26, Blossoms 27, **Gorgon City 28 Nov (new)**; Cinderella On Ice 3–6 Dec.
- **Hyde Park Winter Wonderland:** 19 Nov – 3 Jan, closed 25 Dec ([hydeparkwinterwonderland.com](https://hydeparkwinterwonderland.com/)). Its VENUES properties are P03 and P06 (blocked by policy) and P16 (no PriceLabs data), so it is not assessed.
- **NYE** Thu 31 Dec, 8pm – 00:30: Ticketmaster only, £20–55; the second batch date is not announced ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)).
- **School holidays:** Christmas Mon 21 Dec – Fri 1 Jan; spring term starts Mon 4 Jan ([Camden](https://www.camden.gov.uk/term-dates), [Tower Hamlets](https://www.towerhamlets.gov.uk/lgnl/education_and_learning/schools/term_and_holiday_dates.aspx)). Bank holidays are 25 Dec, plus 28 Dec as the substitute for Boxing Day (not re-checked today).

How to read the table: "Our £ vs fortnight £" compares `prices.csv` 9 Nov with the fortnight average. "Effect" is market occupancy vs STLY in percentage points from `m09/neigh_<id>.json`. Properties come from the VENUES map in `build/properties.py`; P20 is shown as "nearby" for the O2 and ExCeL, and P05 / P12 / P13 are not on the map.

| Nights | Event | Venue | Open properties | Effect (mkt occ vs STLY) | Our £ vs fortnight £ | Priced by PL? |
|---|---|---|---|---|---|---|
| 10–11 Nov | #RISK + expos | ExCeL | P04 (P01, P20 booked) | **soft** −2.9 / −3.5 | P04 **149 / 150** vs 151 | no (level) |
| 12 Nov | England v Croatia | Wembley | P13 (P10 booked) | **soft** −12.6 | **181** vs 189 | no |
| 13–17 Nov | Kahan / Muse | O2 | P04 13; P20 13–17 | P04 −1.1; P20 14–17: −8.1, −7.9, +0.9, +6.9 | P04 **154** vs 160; P20 265 / **233 / 232 / 224 / 221** vs 255 | P20 13 Nov only |
| 14 Nov | England v Japan / Courteeners | Twickenham / Ally Pally | P13, P11 booked | – | – | – |
| 18–20 Nov | beabadoobee / Good Charlotte / Myles Smith (EV / Vet UNVERIFIED today) | O2 / ExCeL | P04; P20 20 (18–19 delivery block) | P04 −1.1 / −1.9 / −0.2; P20 20 +4.6 | P04 **154 / 155 / 162** vs 166–173; P20 **239** vs 263–272 | no |
| 20–21 Nov | Script / Eng v NZ / Enter Shikari | O2 / Twickenham / Ally Pally | P04, P20 (P13, P11 booked) | P04 −0.2 / −2.5; P20 +4.6 / +1.9 | P04 **162 / 165** vs 173; P20 **239 / 246** vs 272 | no |
| 23 Nov | Don Toliver | O2 | P04, P20 | P04 −2.8; P20 **+6.5** | P04 **158** vs 180 (8 Nov £205); P20 **244** vs 286 (8 Nov £333) | **no, newly** |
| 24 Nov | Jungle (HOMES UK UNVERIFIED) | O2 / ExCeL | P04, P20 | – | P04 199 vs 176; P20 333 vs 291 | yes |
| 26–28 Nov | Finals Weekend / Ally Pally gigs / O2 | Twickenham etc. | P13 27 Nov (rest booked) | P13 **+12.6** | P13 334 vs 241 | yes |
| 5–6 Dec | Jingle Bell Ball | O2 | P04 6; P20 5 (unbookable) | P04 −0.5; P20 +5.0 | P04 **197** vs 200; P20 **281** vs 321 | P04 no (−£3); P20 5 Dec orphan |
| 7–8 Dec | Bryson Tiller / Kehlani | O2 | P04 | +3.4 / +5.2 | P04 **197 / 197** vs 200 / 201 | no (−£3 / −£4) |
| 11–12 Dec | Darts opening | Ally Pally | P11 | **+9.5 / +3.3** | 309 / 310 vs 241 | yes |
| 13–17 Dec | Darts R1 | Ally Pally | P11 | **soft** −0.6 to −7.7 | **217 / 193 / 197 / 205 / 227** vs 264 | no (Reyhan −5%) |
| 16–19 Dec | Horse Show / Kasabian / Culture Club | ExCeL / O2 | P04 16–19; P20 16–18 | P04 16 +4.1; P20 −2.4 / +1.7 | P04 **198** / 201 / 209 / 216 vs 200; P20 **277 / 281** / 291 vs 288 | mostly |
| 15–20 Dec | pre-Christmas | St John's Wood | **P05 sold 8 Nov at P50 (§2)** | +2.9 to +8.5 | – | sold £970 under P75 |
| 10–26 Dec | pre-Christmas / school holiday from 21 Dec | London | P13 | **+4.2 to +25.6** | P13 under P50 every night (§3) | **no for P13** |
| 23–25 Dec | Darts R2 | Ally Pally | P11 | −3.2 to −6.0 | 281 / 267 / 275 vs 302 (23 Dec) | no; market soft |
| 24 Dec – 3 Jan | Disney On Ice | O2 | P20 26 Dec – 2 Jan; P04 2 Jan | – | P20 326–502 vs 267; P04 217 vs 196 | yes |
| 31 Dec | NYE | central | P20 | – | 502 vs 281 | yes |
| 3 Jan | Darts final | Ally Pally | P11 | +3.6 | **174** vs 196 | no |
| 4 Jan – 6 Feb | no verified event | – | – | – | – | – |

## 5. Missed compression: open nights on verified events at or below the fortnight
Same event set and method as 8 Nov (`m09/out09.txt`).

| Ref | Night(s) | Event | Our £ 9 Nov (8 Nov) | Fortnight £ | Gap £ | Market support |
|---|---|---|---|---|---|---|
| P04 | 10, 11 Nov | ExCeL expos | 149, 150 (152, 152) | 151 | 2, 1 | none |
| P13 | 12 Nov | England v Croatia | 181 (181) | 189 | **8** | none: −12.6 |
| P04 | 13 Nov | Kahan | 154 (156) | 160 | 6 | none |
| P20 | 14–17 Nov | Kahan / Muse | 233, 232, 224, 221 (246, 233, 224, 242) | 255 | 22, 23, 31, 34 = **110** | mixed: −8.1 to +6.9 |
| P04 | 18, 19 Nov | EV / Vet (UNVERIFIED today) + O2 | 154, 155 | 166 | 12, 11 | none |
| P04 | 20, 21 Nov | Script | 162, 165 | 173 | 11, 8 | none |
| P20 | 20, 21 Nov | Script | 239, 246 (252, 257) | 272 | 33, 26 | +4.6 / +1.9 |
| **P04** | **23 Nov** | Don Toliver | **158 (205)** | 180 | **22 (new)** | none: −2.8 |
| **P20** | **23 Nov** | Don Toliver | **244 (333)** | 286 | **42 (new)** | **+6.5** |
| P04 | 6 Dec | Jingle Bell Ball | 197 (198) | 200 | 3 | none |
| P04 | 8 Dec | Kehlani | 197 (195) | 201 | 4 | +5.2 |
| P04 | 16 Dec | Horse Show eve | 198 (199) | 200 | 2 | +4.1 |
| P20 | 16, 17 Dec | Horse Show | 277, 281 (298, 299) | 288 | 11, 7 | −2.4 / +1.7 |
| P11 | 23 Dec | Darts R2 | 281 (281) | 302 | 21 | none: −3.2 |
| P11 | 3 Jan | Darts final | 174 (178) | 196 | 22 | +3.6 |
| | | **Bookable, excluding darts R1** | | | **23 nights / £362** (8 Nov: 21 / £312) | |
| P11 | 13–17 Dec | Darts R1 (Reyhan −5%) | 217 / 193 / 197 / 205 / 227 | 264 | 47, 71, 67, 59, 37 = **£281** (was £262) | none |
| P20 | 5 Dec | Jingle Bell Ball (**unbookable orphan**, min 3) | 281 | 321 | 40 | +5.0 |
| | | **Full total, same method as yesterday** | | | **29 nights / £683** (8 Nov **27 / £612**) | |

- **Change vs yesterday: +2 nights / +£71.**
  - **New (+2 nights / +£64): 23 Nov on P04 (£22) and P20 (£42).**
    - PriceLabs' own default fell on that night: P04 `uncustomized_price` 236 → 212, P20 348 → 274 (8 Nov vs 9 Nov raw).
    - Reyhan's −5% (8 Nov 12:41Z) sits on top of that.
    - The market for P20 on 23 Nov is **+6.5 vs STLY**.
  - **Reyhan's 8 Nov cuts:**
    - P11 darts R1 +£19 (−2% → −5%).
    - P20 20–21 Nov +£8.
    - Most of the P04 November and P20 14–17 Nov moves come from the same cuts, but there the fortnight fell too: P20 14–17 Nov −£9, P04 13–21 Nov −£14 net.
  - **Other movements:** P13 12 Nov +£3 (the fortnight rose 186 → 189); P20 5 Dec +£2; P20 16–17 Dec −£3; P11 23 Dec −£1 and 3 Jan +£1; P04 Dec nights net £0.
- **Extra event nights outside the 8 Nov set** (`ext09.py`; not in the totals): P04 7 Dec (Bryson Tiller) £197 vs £200, gap £3. Enter Shikari 20–21 Nov and Gorgon City 28 Nov fall on nights where P11 is booked.
- **Where the market supports a raise** (occupancy clearly above STLY and our price under P50 or the fortnight):
  - **P13 10–26 Dec**.
  - **P05 7–8 Dec** (13–14 and 21 Dec need min stay first).
  - **P04 14–19 Dec**.
  - **P11 3 Jan**.
  - **P20 23 Nov** (+6.5; £244 vs P50 £211, so it is above P50: the fortnight rule only, with a weak case).
  - The other gaps (P04 and P13 in November, P20 14–15 Nov, P11 23 Dec and R1) rest only on the fortnight rule while the market runs at or below STLY. **I am not proposing those.**

## 6. Dates where our price should differ from PriceLabs
Nothing new is proposed beyond the open raises. Reyhan's 8 Nov 12:38–12:41Z edits moved four of them the wrong way; they are listed here as conflicts.
- **St John's Wood P05:**
  - 7–8 Dec to ~P75: **+£257**.
  - **13–14 Dec and 21 Dec: min-stay orphans** created by the 15–21 Dec booking (min 3 and min 2). The price gap is only +£95.
  - 29 Dec down to about £1,068–1,084: **−£248 to −£264**.
  - The 15–21 Dec booking sold **£970 under market P75, at P50**. The cause is an unexplained 19% Airbnb layer (£695) on top of a list price £275 under P75. The 19% goes to the channel auditor.
- **Shepherd's Bush P13 Christmas:** +10% = **+£362** (to P50 +£558). This **CONFLICTS** with Reyhan's new 10–20 Dec −5%. Min 2 on 25–26 Dec still **conflicts** with min 3. Corentin to confirm.
- **Camden P11:**
  - Darts R1 at avg **£207.8** against the policy's recorded "average above £300". This **CONFLICTS**, now deeper after Reyhan's −5%. Corentin to confirm.
  - 3 Jan ≥ £196 (**+£22**; now £6 under P25).
  - 23 Dec: hold.
- **Barking P04:**
  - 14–19 Dec to P75, **+£66**. This **conflicts** with Reyhan's 6–22 Dec −5%.
  - 23 Nov fell £47 overnight (to £158), mostly from PriceLabs' own default. Cause beyond the −5% is NOT CHECKED. The market is −2.8, so I make no proposal.
- **Canary Wharf P20:**
  - Reyhan re-added −5% on 13–17 and 20–24 Nov. 14–17 Nov is now £910 (was £945) against P50 £845. The market is −8.1 / −7.9 on 14–15 Nov, so no proposal.
  - **23 Nov £244** (was £333): the market is +6.5. A partial raise toward the fortnight (£286) is defensible, but it rests on the fortnight rule, so it is for Corentin.
  - **5 Dec orphan:** still unbookable (min 3). Not fixed.

Data gaps:
1. Market figures are PriceLabs Nearby Listings: Airbnb-derived, `cleaning_fee` null, not comp sets, horizon unstated. P05 bands may include 3 BR. P01/P06 rows date from 2 Nov and P08/P14 from 27 Oct. P10, P15–P19 and P02/P03/P07 were not pulled.
2. **Process:** six of today's seven neighbourhood calls were issued together, against the one-call-at-a-time rule. None failed; I am recording it.
3. Whether the P05 15–21 Dec 0.81 factor is a Smoobu LOS rule, a hidden Airbnb layer, or both is NOT CHECKED. So is whether the 8 Nov 12:39Z prices were actually pushed (the pull notes say no push, yet the paid amount matches them to the penny). PriceLabs had not synced the booking at its last refresh, so P05 pl_kpis occupancy and the 13–14 / 21 Dec unbookable flags are stale.
4. The 23 Nov drop in PriceLabs' default (P04 −£24, P20 −£74) is NOT CHECKED (customizations not pulled).
5. Events come from domain-restricted WebSearch summaries, not page reads. WebFetch returns `ENOTFOUND` for www.theo2.co.uk; that host (plus excel.london and alexandrapalace.com) must be allowed in the session's network settings. Open conflicts:
   - Jingle Bell Ball 3 Dec (arena listing) vs 5–6 Dec (event page and Capital).
   - Wembley 12 Nov sold-out status.
   - Darts "4–23 Dec" snippet and 4 Jan ballot notice vs 11 Dec – 3 Jan.
   - EV / Vet Show 18–20 Nov and HOMES UK 24–25 Nov are UNVERIFIED today.
   - The 28 Dec bank holiday was not re-checked.
   - Attendance is stated only for darts (180,000 tickets).
6. Live Smoobu and channel rates are NOT CHECKED here; all figures come from the `prices.csv` snapshot. The P05 9 Nov Airbnb Special Offer is NOT CHECKED (channel auditor).
