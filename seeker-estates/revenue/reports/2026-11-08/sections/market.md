# Market & demand calendar: run D = 2026-11-08 (window 8 Nov 2026 – 5 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Left out: P02/P03/P06/P07 intentional blocks; nights after handback (P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec); P14 numbers only; P13 = one flat (3064856 + 3090701). Not re-raised: P13 1 Dec +50%, 15%/20% stay discounts, Booking.com booster, P04 min stay 3.
- **Market data pulled 8 Nov 07:17–07:23Z, one call at a time, every call `all_operations_ok=true`.** Tool: `get_neighbourhood_data` (detail, future prices + occupancy) for P13 3064856, P05 3166592, P04 3562176, P11 3064196, P20 3547481, P12 2699998, P09 3318172. Raw files: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m08/neigh_<id>.json`. Market at booking time for the new bookings comes from yesterday's pull (`.../scratchpad/m07/neigh_<id>.json`, 7 Nov 07:18–07:20Z).
- `data/snapshots/2026-11-08/market.csv`: **copied forward from 7 Nov, with 7 rows appended** under `.market.csv.lock` (101 lines). P05 uses the 4 BR row (`property_facts.P05`).
- **PriceLabs edits since 7 Nov 06:00Z.** `get_user_logs` (listing) 7–8 Nov returned **25 entries, all by Reyhan, 7 Nov 12:27:39–12:33:52Z**. The group log is empty. These edits explain the 12:30–12:34Z pushes in the pull notes:
  - P12: 12–20 Nov and 30 Nov–10 Dec min 2; **13 Dec +15%, min 1**.
  - P11: **10 Nov–18 Dec −2%, min 2**. This covers the darts nights 13–17 Dec (confirmed with `get_listing_date_overrides`: updated 12:29:40Z).
  - P13 (3064856, copied to 3090701 and the Vrbo listing): 8–12 Nov −5% min 2 (was −10%); **10–20 Dec −2% min 2** (was −7% on 7–20 Dec).
  - P05: 29 Nov–2 Dec −2% min 3; **13–19 Dec −2% min 3** (was −7%).
  - P08: 7 Nov stepped +25 / +35 / +55 / +100%, min 1.
  - P20: 7–9, 13–17 and 20–24 Nov now **min 2 only, with no price change**. The −5% is gone on those dates (`get_listing_date_overrides` 8 Nov). The −5% stays on 10–12, 18–19 Nov and 1–26 Dec.
  - P04: **9–24 Nov −3% min 3; 6–22 Dec −5% min 3**.
- **Our prices:** `data/snapshots/2026-11-08/prices.csv` `pricelabs_price`. Every listing below was last re-priced 7 Nov 12:30:07–12:34:39Z (`raw/prices_<id>.json last_refreshed_at`). "Yesterday" means the 7 Nov `prices.csv`. "Default" means `uncustomized_price`. For dates after 5 Jan I used the neighbourhood `final_price`. `prices.csv` starts on 9 Nov, so tonight (8 Nov) cannot be assessed.
- **Booking state:** Smoobu `reservations.csv` 8 Nov (705 rows), confirmed rows only.
- **Fortnight method unchanged:** 7 nights on each side; booked or blocked nights and nights above 2x the median are left out. Horse Show and 3 Jan use one clean week. Scripts: `scratchpad/m08/analyse08.py`, `scratchpad/m08/open08.py`. Output: `scratchpad/m08/out08.txt`.
- **Events re-checked 8 Nov 2026** with WebSearch restricted to venue and organiser domains. WebFetch fails with `ENOTFOUND` for theo2.co.uk, excel.london and alexandrapalace.com (those hosts are not in the session's allowed network domains). Every event fact here is a search summary of an official page, not a page I read myself.

## 1. Submarket table
Sources: `market.csv` 8 Nov (`p25/p50/p75/p90`, n = bedroom-matched Nearby Listings, `market_occ_30/60`); `pl_kpis.csv` 8 Nov (`occupancy_next_30/60`).

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | Our occ 30/60 | vs 7 Nov |
|---|---|---|---|---|---|---|
| Canary Wharf | P20 | 2 | 38 / 31% | 214 / **251 / 320** / 420 (153) | 53 / **50%** | P50 0. Our 60-day occupancy rose 37 → 50% (6–14 Dec booking) |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 36 / 30% (pl_kpis) | 2 Nov row: 214 / 258 / 331 / 421 | 100 / 100%* | not pulled |
| Barking | P04 | 2 | 24 / 21% | 140 / **176 / 219** / 264 (89) | 53 / 48% | P50 +2 |
| Greenwich (handback 26 Nov) | P09 | 1 | 36 / 31% | 110 / **134 / 160** / 204 (125) | 93 / 97%* | P50 +1. The 7–11 Nov booking filled the reopened nights |
| Mile End (handback 13 Dec) | P12 | 2 | 42 / 34% | 171 / **205 / 233** / 290 (120) | 63 / 73% | P50 0, P75 −5 |
| Marylebone (blocked on purpose) | P06 | 2 | 49 / 42% (pl_kpis) | 2 Nov row | 77 / 88%* | not pulled |
| Camden | P11 | 2 | 48 / 39% | 228 / **289 / 330** / 382 (170) | 47 / 45% | P50 −1 |
| St John's Wood | P05 | 4 | 43 / 40% | 461 / **575 / 720** / 1,180 (90) | 77 / 65% | 0 |
| Shepherd's Bush | P13 | 2 | 44 / 39% | 191 / **224 / 277** / 348 (117) | 73 / 53% | P50 −1. Our 60-day occupancy rose 50 → 53% (7–10 Dec booking) |
| Islington (handback 13 Nov) / Primrose Hill (numbers only) | P08 / P14 | 2 / 1 | 51 / 44%; 46 / 38% (pl_kpis) | 27 Oct rows only | 97 / 98%*; 0 / 0% | not pulled |

\* Inflated by handback or intentional blocks. There is no `market.csv` row for Bow, Little Venice, Fulham, Kings Langley, Ladbroke Grove, Bayswater, Woolwich or Hanger Lane.

## 2. Open raises re-checked (prices.csv 8 Nov; market = `m08/neigh_<id>.json`)
| Ask | 7 Nov | **8 Nov** | Market today | Status |
|---|---|---|---|---|
| **P13 12 Nov ≥ £176, min 1** | £162, min 2 | **£181**, min 2 (default £175) | P25 £178 / P50 £210; occupancy 43.1% vs 57.1% STLY (**−14.0**, was −11.1) | **Price met.** Reyhan cut the discount to −5%; the price is now £5 over the ask and £3 over P25. Min 1 is not done. The market keeps weakening, so I would close the price ask and leave min 1 for Corentin. |
| **P13 Christmas +10%, min 2 on 25–26 Dec** (3064856) | 20 open nights, £4,133 | **17 open nights (10–26 Dec), £3,675.** Like-for-like, these 17 nights were £3,553 yesterday: +£122. Min 2 on 10–20 Dec, min 3 on 21–26 Dec. Twin 3090701: £3,888. | P50 £4,176 / P75 £5,346; default £3,929; **occupancy +5.1 to +25.3 pts vs STLY on all 17 nights** | **Partly moved.** Reyhan changed 10–20 Dec from −7% to −2%; 21–26 Dec −5% min 3 is unchanged. We are still **under P50 on every open night** (by £8–66). The price is above P25 on 10–24 Dec, level on 25 Dec (£214 vs £214) and below it on 26 Dec (£217 vs £221). +10% = **+£368**; to P50 = **+£501**. The **min 2 on 25–26 Dec** ask still conflicts with Reyhan's min 3. Corentin to confirm. |
| **P05 7–8 Dec to ~P75** | £920 | **£917** (466 / 451), min 2 | P75 £1,175; default £1,139; occupancy **+6.4 / +2.2** | **Still open: +£258.** |
| **P05 13–21 Dec to P75** (9 nights) | £5,288 | **£5,507** (+£219: 13–19 Dec override −7% → −2%) | P75 £5,818; P50 £4,403; default £5,563; occupancy **+2.9 to +10.6 on all 9 nights** | **Gap narrowed to +£311** (was +£549). The price is now 25% over P50 and close to the default. |
| **P05 29 Dec ~ default** (min 1, 1-night orphan) | £1,346 | **£1,346**, min 1 | default **£1,067**, P90 £1,085, P75 £818; occupancy 53.0% vs 51.0% (+2.0) | **Still open: £261–279 above P90 / default.** |
| **P11 3 Jan ≥ fortnight** | £188 | **£178**, min 3 (override −5%) | fortnight £199; P25 £180 / P50 £230; occupancy 17.7% vs 13.9% (**+3.8**) | **Worse: +£21** (was +£16). The price is now under P25. |
| **P11 23 Dec ≥ fortnight** (Reyhan +7%) | £305 | **£281** (−£24 at the 7 Nov 12:30Z refresh; the +7% override is unchanged) | P50 £303; fortnight £303; occupancy 24.4% vs 27.1% (−2.7) | **Worse: £22 under the fortnight and P50** (was £15). The market does not support a raise. |
| **P04 14–19 Dec to P75** | £1,152 | **£1,218** (+£66 even after Reyhan's new 6–22 Dec −5% min 3) | P75 £1,305; P50 £970; default £1,361; occupancy **+2.8 to +6.2** (absolute 9.6–22.9%) | **Gap narrowed to +£87.** This now **conflicts** with Reyhan's −5% added 7 Nov. Corentin to confirm. |

### 2b. New bookings checked against the market
**P20 Waterford Court, Airbnb, 6–14 Dec (8 nights)**, booked 7 Nov. Room £1,494.25 (£186.78/night), cleaning £150, commission £254.86 (`reservations.csv` 8 Nov).

| Comparator, 6–13 Dec (8 nights) | £ | Paid as share |
|---|---|---|
| PriceLabs `price`, 7 Nov 01:30Z (`2026-11-07/raw/prices_3547481.json`): 293/306/277/281/273/288/295/285. Matches `booked_price` 8 Nov. | **2,298** | **0.650** |
| PriceLabs after weekly 15% (policy) | 1,953 | 0.765 |
| PriceLabs default (`uncustomized_price`) | 2,687 (`m07`) | 0.556 |
| Market P25 / **P50** / P75 (`m07/neigh_3547481.json`) | 1,483 / **1,776** / 2,365 | 1.008 / **0.841** / 0.632 |
| Market P50 after the same weekly 15% | 1,510 | 0.990 |
| Market booked-P50 | 1,593 | 0.938 |

- **Against PriceLabs:** the guest paid 0.650x. 0.650 = 0.85 × 0.765, and 0.765 = 0.85 × **0.900**. The weekly 15% accounts for one 0.85. **A further 10% (0.900) is not explained by policy.** The booking was 29 days out, so the 0–14-day last-minute discount does not apply, and early bird is not set on P20 (`listing_facts.P20.airbnb_discounts_22oct`). That 10% is worth **£459** (1,953 − 1,494). This is a different second layer from the 19–26 Dec booking (0.85 × 0.85). Cause NOT CHECKED; passing to the channel auditor.
- PriceLabs also carried Reyhan's −5% on all 8 nights (1–20 Dec, set 27 Oct). Without it, the same 0.650 would have paid about **£1,573 (+£79)**.
- **Against the market:** the paid price sits at P25 (1.008x) and equals the P50 after the weekly 15% (0.99x). Market occupancy was **+1.7 to +8.3 pts vs STLY on 6–12 Dec** and −6.6 on 13 Dec. **Verdict: not below market. It is below our own PriceLabs price by an unexplained 10% (£459) and by Reyhan's −5% (about £79).** PriceLabs raised the sold nights to £2,517 after the sale (occupancy reaction).
- **Knock-on:** 5 Dec is now a 1-night gap between the 4 Dec stay and this stay. `raw/prices_3547481.json` 8 Nov shows `unbookable=1`, price £279 (default £384), and the −5% override with min 3 still on that night. **It cannot sell at any price under min 3.** The fix is min stay, not price. Market 5 Dec: P50 £231, occupancy +5.0.

**P13 Shepherd's Bush, Booking.com, 7–10 Dec (3 nights)**, booked 7 Nov. Room £485.20 (£161.73/night), cleaning blank, commission £127.04.
- **Which listing:** **3064856.** Its `raw/prices_3064856.json` 8 Nov shows 7 Dec "Booked (Check-In)" and 8–9 Dec "Booked". Twin **3090701 still shows 7–9 Dec open and bookable** (refreshed 7 Nov 12:30:41Z, possibly before the booking reached it). Whether Smoobu has blocked the twin is NOT CHECKED (double-booking risk).
- **Against PriceLabs:** the 3064856 price at the time was the 6 Nov 08:48Z refresh: 195/194/191 = **£580**, which carried Reyhan's −7%. With the +15% Smoobu Booking.com markup (policy) that is £667. Paid = **0.727x the marked-up rate**, i.e. 27.3% of stacked Booking.com promotions. Shepherd's Bush Last Minute 0–30 days was set 21 Oct, and this booking was 30 days out. Policy says promotions stack: this is reported as size, not as unexplained. Without the −7%, the list would have been about £624, i.e. about **+£37 paid** at the same ratio.
- **Commission:** £127.04 = exactly 20.0% of (£485.20 + £150 cleaning), or 26.2% of room alone. This is above 15%. Whether the Visibility Booster was on for Shepherd's Bush on these dates is NOT CHECKED; per policy, ask before treating it as a leak (channel auditor).
- **Against the market** (`m07/neigh_3064856.json`): P25 £582 / **P50 £694** / P75 £849; booked-P50 £684. Paid £485 = **0.834x P25, 0.699x P50**. Market occupancy was **+7.9 / +10.7 / +10.0 pts vs STLY**, a compressing set of nights. **Verdict: sold below market. It is £97 under P25 and £209 under P50.** The causes are the Booking.com promotion stack (27%) on top of a list price already below P25 (£580 vs £582). Part of the cause is Reyhan's −7%, which has since been cut to −2% for 10–20 Dec but was in force at the time.

**P09 Torrent Lodge, Airbnb, 7–11 Nov (4 nights)**, market context only. Paid £90.67/night. Market P25 sums to £444 (`m07`), so the stay sold at 0.82x P25. Market occupancy was +1.2 to +9.2 vs STLY. These were handback nights sold on the day of arrival. The discount-layer ratio is left to the channel auditor.

## 3. Demand calendar, next 90 days
**Re-verified 8 Nov 2026** (WebSearch on official domains; search summaries):
- **Twickenham:** England v Australia Sun 8 Nov; England v Japan Sat 14 Nov; England v New Zealand Sat 21 Nov 14:10; Finals Weekend Fri 27 – Sun 29 Nov, Grand Final Sun 29 Nov ([allianzstadiumtwickenham.com/nations-championship](https://allianzstadiumtwickenham.com/nations-championship), [finals weekend](https://allianzstadiumtwickenham.com/nations-championship-finals-weekend)). One England Rugby ticketing page calls Sat 28 Nov "Finals Day".
- **Wembley:** England v Croatia, Thu 12 Nov 19:45 ([wembleystadium.com](https://www.wembleystadium.com/events/2026/England-v-Croatia), [match centre](https://www.englandfootball.com/england/mens-senior-team/fixtures-results/2026-27/nations-league/england-v-croatia-uefa-nations-league-thursday-12-november-2026-match-centre)). The England squad article of 6 Nov says tickets "remain on sale", so it is **not sold out** ([englandfootball.com](https://www.englandfootball.com/articles/2026/Nov/06/england-senior-mens-squad-announcement-for-croatia-spain-games-20261106)).
- **The O2** ([arena listing](https://www.theo2.co.uk/events/venue/the-o2-arena)): Hatsune Miku 12, Noah Kahan 13–17 Nov, The Script 21 ([page](https://www.theo2.co.uk/events/detail/the-script-2026)), Don Toliver 23, Jungle 24–25, Fontaines D.C. 27, Jessie Ware 28, Mariah Carey 30 Nov ([page](https://www.theo2.co.uk/events/detail/mariah-carey-2026)), Phoebe Bridgers 1–2 Dec.
  - **Jingle Bell Ball Sat 5 – Sun 6 Dec** ([theo2 page](https://www.theo2.co.uk/events/detail/capitals-jingle-bell-ball-2026), [capitalfm.com](https://www.capitalfm.com/news/jingle-bell-ball-2026-date-venue-info/)). The arena listing still says 3 Dec. Capital says general sale is sold out; The O2 says on sale.
  - Bryson Tiller / Kehlani 7–8 Dec, Pete Tong 11–12, Kasabian 18, Culture Club 19, **Disney On Ice 24 Dec – 3 Jan** (last listed session 2 Jan; [page](https://www.theo2.co.uk/events/detail/disney-on-ice-presents-discover-the-magic)), RNBLAND NYE 31 Dec.
  - **Muse 15–16 Nov did not appear in today's summary: UNVERIFIED today.** It does not change the 13–17 Nov range, which Kahan covers.
- **ExCeL** ([what's on](https://www.excel.london/whats-on)): #RISK 10–11; Business Show / Retail Supply Chain / Event Tech Live 11–12; EV Show / B2B Marketing Live 18–19; Vet Show 19–20; elementalLONDON / London Build / emex 25–26 Nov; FinTech Connect 1–2 Dec; Perfume Exhibition 10–13 Dec; **London International Horse Show Thu 17 – Mon 21 Dec** ([londonhorseshow.com](https://londonhorseshow.com/), [excel.london](https://www.excel.london/whats-on/london-international-horse-show)); Scrooge Cirque 23–28 Dec. **HOMES UK 24–25 Nov is still not listed: UNVERIFIED.** It does not affect the totals, because P04 and P20 24 Nov are above the fortnight.
- **Alexandra Palace:** **World Darts Fri 11 Dec – Sun 3 Jan**, semi-finals 2 Jan, final 3 Jan 20:00. The venue states a "record 180,000 tickets" ([alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq)). One PDC ballot notice says 4 Jan. The November Ally Pally gigs were not re-checked today; P11 is booked on those nights.
- **NYE** Thu 31 Dec: Ticketmaster only, £20–55; the second batch date is not announced ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)).
- **School holidays:** Christmas Mon 21 Dec – Fri 1 Jan ([Tower Hamlets](https://www.towerhamlets.gov.uk/lgnl/education_and_learning/schools/term_and_holiday_dates.aspx), [Camden](https://www.camden.gov.uk/term-dates), [H&F](https://www.lbhf.gov.uk/children-and-young-people/schools-and-colleges/school-term-and-holiday-dates)). Bank holidays are 25 Dec, plus 28 Dec as the substitute for Boxing Day. February half term is outside the window.

How to read the table: "Our £ vs fortnight £" compares `prices.csv` 8 Nov with the fortnight average. "Effect" is market occupancy vs STLY in percentage points from `m08/neigh_<id>.json`. Properties come from the VENUES map in `build/properties.py` (P20 is shown as "nearby").

| Nights | Event | Venue | Open properties | Effect (mkt occ vs STLY) | Our £ vs fortnight £ | Priced by PL? |
|---|---|---|---|---|---|---|
| 8 Nov | Eng v Australia | Twickenham | P13 | NOT CHECKED (not in snapshot) | – | – |
| 10–11 Nov | #RISK + expos | ExCeL | P04 (P01, P20 booked) | **soft** −4.5 / −5.7 | P04 **152 / 152** vs 153 | no (level) |
| 12 Nov | England v Croatia | Wembley | P13 (P10 booked) | **soft** −14.0 | **181** vs 186 | no |
| 13–17 Nov | Kahan (Muse UNVERIFIED) | O2 | P04 13; P20 13–17 | P04 −1.5; P20 −1.7, −9.1, −11.0, −0.2, +5.3 | P04 **156** vs 166; P20 285 / **246 / 233 / 224 / 242** vs 266 | P20 13 Nov yes; rest no |
| 18–19 Nov | EV / Vet shows | ExCeL | P04 (P20 blocked: delivery) | soft −2.7 / −2.5 | P04 **156 / 158** vs 172 | no |
| 20–21 Nov | Script / Eng v NZ | O2 / Twickenham | P04, P20 (P13 booked) | P04 −0.3 / −0.7; P20 +1.9 / +0.1 | P04 **166 / 169** vs 178; P20 **252 / 257** vs 280 | no |
| 23–24 Nov | Don Toliver / Jungle (HOMES UK UNVERIFIED) | O2 / ExCeL | P04, P20 | P20 +5.6 / +0.3 | P04 205 / 206 vs 181–182; P20 333 / 333 vs 281–291 | yes |
| 27 Nov | Finals Weekend | Twickenham | P13 | (yesterday +11.2) | 332 vs 244 | yes |
| 5–6 Dec | Jingle Bell Ball | O2 | P04 6; P20 5 (unbookable) | P04 6 Dec −2.7; P20 +5.0 | P04 **198** vs 200; P20 **279** vs 317 | P04 no (−£2); P20 5 Dec orphan |
| 7–8 Dec | Kehlani | O2 | P04 | P04 +1.6 / +3.3 | P04 197 / **195** vs 201 (8 Dec) | no (8 Dec) |
| 11–12 Dec | Darts opening | Ally Pally | P11 | **+10.3 / +4.1** | 317 / 319 vs 250 | yes |
| 13–17 Dec | Darts R1 | Ally Pally | P11 | **soft** 0.0, −7.1, −4.4, −5.1, +0.8 | **221 / 201 / 205 / 215 / 236** vs 268 | no (Reyhan −2%, see §5) |
| 16–19 Dec | Horse Show / Kasabian | ExCeL / O2 | P04 16–19; P20 16–18 | P04 +2.8 to +6.2 | P04 **199** / 202 / 210 / 216 vs 200; P20 **298 / 299** / 310 vs 309 | mostly |
| 10–26 Dec | School holiday from 21 Dec / pre-Christmas | London | P13 | P13 +5.1 to +25.3 | P13 under P50 every night (§2) | **no for P13** |
| 23 Dec | Darts R2 | Ally Pally | P11 | −2.7 | **281** vs 303 | no |
| 24 Dec – 3 Jan | Disney On Ice | O2 | P20 26 Dec – 2 Jan; P04 2 Jan | P20 positive (yesterday +5.3 to +14.7) | P20 344–537 vs 282; P04 219 vs 197 | yes |
| 31 Dec | NYE | central | P20 | (yesterday +14.7) | 537 vs 298 | yes |
| 3 Jan | Darts final | Ally Pally | P11 | +3.8 | **178** vs 199 | no |
| 4 Jan – 5 Feb | no verified event | – | – | – | – | – |

## 4. Missed compression: open nights on verified events at or below the fortnight
| Ref | Night(s) | Event | Our £ 8 Nov (7 Nov) | Fortnight £ | Gap £ | Market support |
|---|---|---|---|---|---|---|
| P04 | 10, 11 Nov | ExCeL expos | 152, 152 (157, 158) | 153 | 1, 1 | none |
| P13 | 12 Nov | England v Croatia | 181 (162) | 186 | **5** | none: −14.0 |
| P04 | 13 Nov | Kahan | 156 (161) | 166 | 10 | none |
| P20 | 14–17 Nov | Kahan | 246, 233, 224, 242 (234, 221, 213, 230) | 266 | 20, 33, 42, 24 = **119** | mixed: −11.0 to +5.3 |
| P04 | 18, 19 Nov | EV / Vet | 156, 158 | 172 | 16, 14 | none |
| P04 | 20, 21 Nov | Script | 166, 169 | 178 | 12, 10 | none |
| P20 | 20, 21 Nov | Script | 252, 257 | 280 | 28, 23 | +1.9 / +0.1 |
| P04 | 6 Dec | Jingle Bell Ball | 198 (188) | 200 | 2 | none: −2.7 |
| P04 | 8 Dec | Kehlani | 195 (185) | 201 | 6 | +3.3 |
| P04 | 16 Dec | Horse Show eve | 199 (189) | 200 | 1 | +4.0 |
| P20 | 16, 17 Dec | Horse Show | 298, 299 (268, 269) | 309 | 11, 10 | – |
| P11 | 23 Dec | Darts R2 | 281 (305) | 303 | 22 | none: −2.7 |
| P11 | 3 Jan | Darts final | 178 (188) | 199 | 21 | +3.8 |
| | | **Bookable, excluding darts R1** | | | **21 nights / £312** (7 Nov: 24 / £307) | |
| P11 | 13–17 Dec | Darts R1 (Reyhan −2%) | 221 / 201 / 205 / 215 / 236 | 268 | 47, 67, 63, 53, 32 = **£262** (was £302) | none |
| | | **Bookable total** | | | **26 nights / £574** | |
| P20 | 5 Dec | Jingle Bell Ball (**unbookable orphan**, min 3) | 279 | 317 | 38 | +5.0 |
| | | **Full total, same method as yesterday** | | | **27 nights / £612** (7 Nov **29 / £609**) | |

- **Change vs yesterday: −2 nights / +£3 like-for-like (29 / £609 → 27 / £612).**
  - **Off the list (−3 nights / −£33):**
    - P13 8 Nov: tonight, not in the 8 Nov `prices.csv` (£14).
    - P20 6 Dec and 8 Dec: sold in the 6–14 Dec booking (£2 + £17).
  - **New (+1 night / +£38):** P20 5 Dec. It is now a 1-night orphan with `unbookable=1`, so the gap is not a price problem.
  - **Smaller:**
    - P11 darts R1 £302 → £262 (the fortnight fell from 280 to 268).
    - P13 12 Nov £8 → £5 (Reyhan −10% → −5%).
    - P04 6 Dec £6 → £2 and 8 Dec £9 → £6.
  - **Larger:**
    - P20 November £142 → £170. Reyhan removed the −5% on 13–17 and 20–24 Nov, so prices rose £11–14, but the fortnight rose more: 249 → 266 and 264 → 280.
    - P11 23 Dec £15 → £22 (£305 → £281, no edit on that date).
    - P11 3 Jan £16 → £21.
    - P04 13 and 18–21 Nov: +£1–2 each. Prices fell £3–6 after the 12:34Z refresh even though the override is now −3%; cause NOT CHECKED.
- **Where the market supports a raise** (occupancy clearly above STLY and our price under P50 or the fortnight):
  - **P13 10–26 Dec** (+5.1 to +25.3, under P50 on all 17 nights).
  - **P05 7–8 Dec and 13–21 Dec**.
  - **P04 14–19 Dec** (+2.8 to +6.2; +£87 to P75).
  - **P11 3 Jan** (+3.8, now under P25).
  - The other gaps (P04 and P13 in November, P20 14–16 Nov, P11 23 Dec) rest only on the fortnight rule while the market runs at or below STLY. **I am not proposing those.**

## 5. Dates where our price should differ from PriceLabs
Nothing new is proposed beyond the open raises. Reyhan's 7 Nov edits move several of them; they are listed here as conflicts where they cut against an open ask or a recorded decision.
- **Camden P11 darts 13–17 Dec: CONFLICT with a recorded decision.** `policy.json price_changes` (21 Oct) says Corentin raised the darts nights to an "average above £300/night". Reyhan's 10 Nov–18 Dec −2% (7 Nov 12:29Z) now covers those dates. The nights average **£215.6** (221/201/205/215/236), against P50 £244–266. The market is soft on R1 (0.0 to −7.1), so I am not proposing a raise. Corentin to confirm which setting stands.
- **P11 3 Jan:** ≥ £199 (+£21; now under P25 £180). **P11 23 Dec:** £281 vs £303; the market is −2.7, so hold.
- **Shepherd's Bush P13:**
  - (a) 12 Nov: the price is met (£181 ≥ £176), so close that ask. Min 1 is still for Corentin.
  - (b) Christmas: +10% on 10–26 Dec = **+£368** (to P50 +£501). Min 2 on 25–26 Dec is still in **CONFLICT** with Reyhan's 21–26 Dec −5% min 3.
  - (c) The 7–10 Dec Booking.com stay sold **£97 under market P25** on compressing nights. The 27% promotion stack and the 20%-of-room-plus-cleaning commission go to the channel auditor.
  - (d) Twin 3090701 still shows 7–9 Dec open in PriceLabs.
- **St John's Wood P05:** 7–8 Dec to ~P75 (**+£258**); 13–21 Dec to P75 (**+£311**; Reyhan's −2% replaced −7%); 29 Dec down to about £1,067–1,085 (**−£261 to −£279**).
- **Barking P04:** 14–19 Dec to P75, **+£87**. This **conflicts** with Reyhan's new 6–22 Dec −5% min 3. Corentin to confirm.
- **Canary Wharf P20:**
  - 13–16 Nov +10% ask: Reyhan removed the −5%, so the four nights are now **£988** (was £939). P50 is £852 and the market is −9.1 / −11.0 on 14–15 Nov. **Drop the ask.**
  - **5 Dec orphan:** unbookable under min 3. A min-stay change is needed for it to sell (Reyhan / Corentin).
  - **6–14 Dec booking:** an unexplained 10% Airbnb layer worth **£459** goes to the channel auditor. The booking is not under market.
- **Mile End P12 13 Dec** (handback night): now **£369 min 1** (+15%), against P50 £210 / P90 £339 and occupancy +7.5. The orphan is open at min 1, which looks fixed. The price is above P90; whether it sells is the test.

Data gaps:
1. Market figures are PriceLabs Nearby Listings: Airbnb-derived, `cleaning_fee` null, not comp sets, horizon unstated. P05 bands may include 3 BR. P01/P06 rows date from 2 Nov and P08/P14 from 27 Oct. P10, P15–P19 and P02/P03/P07 were not pulled.
2. `prices.csv` 8 Nov starts at 9 Nov, so tonight (P13 8 Nov, Eng v Australia) is NOT CHECKED.
3. The P20 6–14 Dec extra 0.900 layer and the 19–26 Dec extra 0.85 layer are NOT CHECKED (Airbnb price breakdown not seen). Whether the P13 7–10 Dec commission (20% of room + £150) comes from the Visibility Booster is NOT CHECKED. Whether Smoobu has blocked P13 twin 3090701 on 7–9 Dec is NOT CHECKED.
4. P04 November prices fell £3–6 at the 7 Nov 12:34Z refresh despite the −3% override (policy recorded −8% on 24 Oct). They sit 22–31% under the default. Cause NOT CHECKED (customizations not pulled).
5. Events come from domain-restricted WebSearch summaries, not page reads. WebFetch returns `ENOTFOUND` for theo2.co.uk, excel.london and alexandrapalace.com; those hosts need to be allowed in the session's network settings. Open conflicts:
   - Jingle Bell Ball 3 Dec (arena listing) vs 5–6 Dec (event page and Capital), and its ticket status.
   - Kehlani 7–8 Dec.
   - Disney On Ice: end 3 Jan, last listed session 2 Jan.
   - Darts end 3 vs 4 Jan.
   - Finals Day 28 Nov (ticketing page) vs a weekend of 27–29 Nov.
   - Muse 15–16 Nov, HOMES UK 24–25 Nov and the November Ally Pally gigs were not re-confirmed today (UNVERIFIED).
   - Attendance is stated only for darts (180,000 tickets).
6. Live Smoobu and channel rates are NOT CHECKED here; all figures come from the `prices.csv` snapshot.
