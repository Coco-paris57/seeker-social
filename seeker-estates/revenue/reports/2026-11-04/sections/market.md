# Market & demand calendar: run D = 2026-11-04 (window 4 Nov 2026 – 2 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Left out: P02/P03/P06/P07 intentional blocks; nights after the handback dates (P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec); P14 numbers only; P13 counted as one flat (3064856 + 3090701). Not raised again: P13 1 Dec +50%, the 15%/20% stay discounts, the Booking.com booster.
- **Market data pulled today 4 Nov ~07:3xZ, one call at a time, all `all_operations_ok=true`.** Tool: `get_neighbourhood_data` in detail mode for P13 3064856, P05 3166592, P04 3562176, P11 3064196, P20 3547481 and P12 2699998. Raw files: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m04/neigh_<id>.json`. P01, P09 and P06 are carried from 2 Nov rows in `market.csv`.
  - I copied `market.csv` forward from 3 Nov and **appended 6 rows** to `data/snapshots/2026-11-04/market.csv`, under `.market.csv.lock`. For P05 I used the **4 BR** row as `property_facts.P05` says. The summary's `best_category` for P05 is "3 BR".
  - Daily bands come from `future_prices.market_25/75/90_percentile_prices` and `market_price` (= P50). Market occupancy comes from `occupancy.daily.market_occupancy` and `_stly`.
- **Our prices:** `data/snapshots/2026-11-04/prices.csv` `pricelabs_price`. On every night quoted it equals `smoobu_price`. **PL default** = `uncustomized_price` in `raw/prices_<id>.json` (4 Nov). "Yesterday" = `data/snapshots/2026-11-03/prices.csv`.
  - Each listing's `last_refreshed_at` is **after** Reyhan's 01:24–01:31Z edits: P12 01:25, P11 01:26, P13 01:27, P05 01:28, P20 01:30, P04 01:31Z. So today's prices already include those edits.
  - P09 3318172 has not refreshed since 3 Nov 07:37Z.
- **Booking state:** Smoobu `reservations.csv` 4 Nov, confirmed rows only. `total_gbp` is the room price only.
- **Fortnight method (same as 3 Nov):** 7 nights either side of the event. Booked and blocked nights are left out, and so is any night above 2x the median. For 16–20 Dec and 3 Jan I used one clean week on one side only.
  - Scripts: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m04/analyse04.py` and `.../m04/open04.py <ref> <from> <to>`.
- **Events re-checked 4 Nov 2026** with WebSearch restricted to the venue or organiser domain. Direct WebFetch of `wembleystadium.com`, `theo2.co.uk` and `alexandrapalace.com` fails (ENOTFOUND: those domains are not allowed from this session). The event facts below are search summaries of the official pages, not page reads.

## 0. PriceLabs edits since 3 Nov 06:00Z
Source: `get_user_logs` listing, 3–4 Nov. 37 entries, all by reyhan, all between **4 Nov 01:24 and 01:31Z**. There were no entries on 3 Nov after 06:00Z and no `base_price` change.

| Ref | Edit (4 Nov) | Market read |
|---|---|---|
| **P13** (both twins + Vrbo) | 8–12 Nov **−7%** (was −5%); **21–26 Dec −5%, min 3** (new); 2–31 Jan −10% min 3; Feb −10% | Moves **against** a-raise-1012nov and the Christmas raise (§2). |
| **P05** | **13–19 Dec −7%, min 3**; Feb −5% min 4 | Moves **against** the 13–21 Dec raise to P75 (§2). |
| **P04** | **9–24 Nov −15%, min 3**; 2–31 Jan −10% min 3; Feb −10% min 4 | **Conflicts with a standing decision.** `policy.price_changes` P04 (Corentin, 24 Oct) says −8% on 1–25 Nov. Corentin to confirm. Market occupancy 9–24 Nov is **−3.1 to −13.9 pts vs STLY (open nights)** (`neigh_3562176`), so the market itself is soft. |
| P12 | 26 Nov **+15%, min 1** (was +25%); 16–25 Nov and 27 Nov–13 Dec **−15%** (was −10%); 12–13 Nov −10%; 4 Nov +15% min 1 | 26 Nov is £352 → **£311** (default £298, P90 £331). Yesterday's "to default (£303)" is **essentially done** (£8 above default). |
| P11 | 23 Dec **+5%**, min 3; 24–25 Dec **+7%**, min 2 | 23 Dec is still £298 vs yesterday £314, because the default fell from £313 to £290 (see §3). |
| P20 | 16–19 Nov **−5%, min 2** (re-set); 21–26 Dec −5%; Jan −10% min 3; Feb −7% min 4 | **Min 2 still conflicts with `listing_facts.P20.min_stay`** (3 nights to 30 Nov): Corentin to confirm. **18–19 Nov now `Blocked` in PriceLabs** (3 Nov: open, £295/£293). 20–22 Nov now open. Reason NOT CHECKED (possibly the delivery block moved: t-p20-delivery). Base still **330** (Corentin's figure 350). |
| P06, P08 | P06 8–14 Nov −5%; P08 4–21 Nov −5% | P06 is blocked on purpose and P08 nights from 14 Nov are after the handback: no comment. |

## 1. Submarket table
Sources: `market.csv` 4 Nov; occupancy = `pl_kpis.csv` 4 Nov `market_occupancy_next_30/60` and `occupancy_next_30/60`.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50** / **P75** / P90 £ (n) | Our occ 30/60 | Base / PL rec |
|---|---|---|---|---|---|---|
| Canary Wharf | P20 | 2 | 36 / 30% | 212 / **249 / 313** / 410 (152) | 53 / 28% | **330** / 347 |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 34 / 29% | 214 / **258 / 331** / 421 (2 Nov) | 100 / 100%* | 253 / 255 |
| Barking | P04 | 2 | 23 / 20% | 138 / **170 / 218** / 257 (91) | 57 / 53% | 220 / "Unavailable" |
| Greenwich (handback 26 Nov) | P09 | 1 | 36 / 32% | 110 / **132 / 160** / 204 (2 Nov) | 90 / 95%* | 176 / 176 |
| Mile End (handback 13 Dec) | P12 | 2 | 40 / 34% | 170 / **205 / 235** / 292 (121) | 63 / 70% | 284 / 284 |
| Marylebone (blocked on purpose) | P06 | 2 | 47 / 42% | 314 / **405 / 507** / 618 (2 Nov) | 87 / 93%* | 357 / 357 |
| Camden | P11 | 2 | 45 / 40% | 229 / **288 / 330** / 390 (173) | 50 / 50% | 286 / 283 |
| St John's Wood | P05 | 4 | 40 / 39% | 448 / **570 / 713** / 1,156 (92) | 77 / 68% | 550 / 544 |
| Shepherd's Bush | P13 | 2 | 41 / 38% | 188 / **222 / 279** / 347 (117) | 73 / 53% | 250 / 237 (3090701: 236) |
| Islington (handback 13 Nov) / Primrose Hill (numbers only) | P08 / P14 | 2 / 1 | 48 / 43%; 42 / 39% | `market.csv` 27 Oct only: 183/228/284/334; 153/205/255/298 | 90 / 95%*; 0 / 0% | 250 / 254; 525 / 503 |

\* Inflated by handback or intentional blocks.
- Moves vs 3 Nov are all within ±£7 at P75 and ±£3 at P50. The largest is P12 P75, £242 → £235.
- Mkt occ 30-day moved −1 to +1 pt; P11 fell 46 → 45%.
- No `market.csv` row for Bow, Little Venice, Fulham, St John's Wood P17, Kings Langley, Ladbroke Grove, Bayswater, Woolwich or Hanger Lane (not pulled, or blocked).

## 2. Yesterday's raises re-checked against today's prices
| Ask (3 Nov) | 3 Nov | **4 Nov** | Market today | Status |
|---|---|---|---|---|
| **P13 12 Nov ≥ £176, min 1** (3064856) | £151, min 2 | **£170, min 2** (twin 3090701 £191) | P25 £176 / P50 £212; mkt occ 42.5 vs 50.6% STLY | **Still open.** The price rose £19, because the default rose (unc £171), even though Reyhan deepened 8–12 Nov to −7%. It is still **£6 under the £176 ask** and **min is still 2** (13 Nov booked, so it only sells as 11–12 Nov). |
| **P13 Christmas +10%** (7–26 Dec, 20 open nights) | £4,506 | **£4,221** (3064856); 3090701 £4,467 | P50 £4,943 / P75 £6,205; default £4,640; mkt occ **+5.5 to +24.9 pts vs STLY on every night** | **Still open and gap wider.** +10% on today's price = £4,643 (+£422); to P50 = +£722 (3 Nov: +£455). Reyhan's new 21–26 Dec −5% conflicts with this ask: Corentin to confirm. 7–20 Dec overrides are unchanged (−5%, set 2 Nov 15:05Z), yet 3064856 fell ~£12/night while 3090701 held. Cause NOT CHECKED (see Data gaps). The twins now differ by £246 (3064856 is lower). |
| **P05 7–8 Dec to ~P75** | £970 | **£933** (476/457) | P75 £1,183; default £1,201; mkt occ +10.6 / +6.3 | **Still open, gap wider:** +£250 (3 Nov +£214). |
| **P05 13–21 Dec to P75** (9 n) | £5,453 | **£5,274** | P75 £5,866; default £5,857; P50 £4,451; mkt occ +0.7 to +9.4, all 9 nights up | **Changed the opposite way.** Reyhan put 13–19 Dec at −7% today. Gap to P75 is **+£592** (3 Nov +£404–492). Corentin to confirm. |
| **P04 14–19 Dec to 0%** (remove −10%) | £1,157 | **£1,143** (182/185/187/189/197/203) | P75 £1,300; default £1,346; mkt occ +1.6 to +4.0 vs STLY | **Still open.** No P04 December edit in the logs. Gap: to P75 +£157, to default +£203. |
| **P05 29 Dec ~£1,100** (1-night orphan, min 1) | £1,354 | **£1,277** | P90 £1,091; default **£1,039** (3 Nov £1,121); mkt occ −1.1 | **Partly.** Down £77 from the default moving, not from an edit. Still £186–238 above P90/default. |
| (P12 26 Nov to default) | £352 | £311 | default £298, P90 £331 | **Done in substance** (Reyhan +25% → +15%). |

## 3. Demand calendar, next 90 days
Columns: our £ vs fortnight £ from `prices.csv` 4 Nov; market occupancy vs STLY from `neigh_<id>.json` 4 Nov.

**Verified 4 Nov 2026** (WebSearch restricted to official domains):
- **Wembley:** England v Croatia, Thu 12 Nov, 19:45, sold out. Sources: [wembleystadium.com/events/2026/England-v-Croatia](https://www.wembleystadium.com/events/2026/England-v-Croatia) and the [englandfootball.com match centre](https://www.englandfootball.com/england/mens-senior-team/fixtures-results/2026-27/nations-league/england-v-croatia-uefa-nations-league-thursday-12-november-2026-match-centre). Attendance not stated.
- **Twickenham:** England v Japan, Sat 14 Nov ([page](https://allianzstadiumtwickenham.com/england-v-japan-nations-championship-pool-match); kick-off given as 16:40 and as 17:20 on the same site). England v New Zealand, Sat 21 Nov, 14:10. Finals Weekend Fri 27–Sun 29 Nov ([page](https://allianzstadiumtwickenham.com/nations-championship-finals-weekend)).
- **The O2** ([venue listing](https://www.theo2.co.uk/events/venue/the-o2-arena); listing summary only, venue domain not fetchable):
  - Noah Kahan "13–17 Nov"; 3 Nov's event page gave 13/14/17.
  - Muse 15–16 Nov.
  - The Script Sat 21 Nov ([page](https://www.theo2.co.uk/events/detail/the-script-2026)).
  - Don Toliver Mon 23 Nov ([page](https://www.theo2.co.uk/events/detail/don-toliver-2026)).
  - Mariah Carey Mon 30 Nov ([page](https://www.theo2.co.uk/events/detail/mariah-carey-2026)).
  - Kehlani Tue 8 Dec.
  - Kasabian Fri 18 Dec.
  - Disney On Ice 24 Dec–3 Jan.
  - Listing-only, not on event pages and not used for pricing: Hatsune Miku 12 Nov, Good Charlotte 19 Nov, Myles Smith 20 Nov (also listed 18 Nov), Jungle 24–25 Nov, Pete Tong 11–12 Dec, The Darkness 16 Dec, Culture Club 19 Dec, RNBLAND NYE 31 Dec.
- **ExCeL** ([what's on](https://www.excel.london/whats-on)): #RISK Europe ([page](https://www.excel.london/whats-on/risk-europe-2026)) and Business Show / Going Global / Retail Supply Chain on 10–12 Nov; London EV Show 18–19 Nov; London Vet Show 19–20 Nov; HOMES UK 24–25 Nov; London Build 25–26 Nov ([page](https://www.excel.london/whats-on/london-build-expo)); Care Management Show 27 Nov. **London International Horse Show Thu 17–Mon 21 Dec** ([londonhorseshow.com](https://londonhorseshow.com/), [excel.london](https://www.excel.london/whats-on/london-international-horse-show)).
- **Ally Pally:** World Darts 11 Dec–3 Jan ([alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq)). Round 1 starts Fri 11 Dec, semi-finals Sat 2 Jan 19:30, final Sun 3 Jan 20:00. The venue states "record 180,000" fans. One PDC ballot release says the event runs to 4 Jan, but the same release names 3 Jan as the final.
- **NYE:** Thu 31 Dec, 20:00–00:30, ticketed through Ticketmaster only, £20–55; the second batch has no date yet ([london.gov.uk/events/london-new-years-eve-2026](https://www.london.gov.uk/events/london-new-years-eve-2026)). Attendance not stated.
- **School holidays:** Christmas Mon 21 Dec 2026 – Fri 1 Jan 2027 ([Camden](https://www.camden.gov.uk/term-dates), [H&F](https://www.lbhf.gov.uk/children-and-young-people/schools-and-colleges/school-term-and-holiday-dates), [Westminster/RBKC](https://www.westminster.gov.uk/media/document/bi-borough-determined-term-and-holiday-dates-2026-27)). February half term 15–19 Feb 2027 ([Tower Hamlets](https://www.towerhamlets.gov.uk/lgnl/education_and_learning/schools/term_and_holiday_dates.aspx)) falls **outside** the window.

| Nights | Event | Venue | Open properties (VENUES map) | Effect (mkt occ vs STLY) | Our £ vs fortnight £ | Priced by PL? |
|---|---|---|---|---|---|---|
| 10–11 Nov | #RISK + expos | ExCeL | P04 (P01, P20 booked) | **soft** (−9.7, −13.9) | P04 **149 / 151** vs 158 | no |
| 12 Nov | England v Croatia (sold out) | Wembley | P13 3064856 | **soft** (−8.1) | **170** vs 177 | no |
| 13–17 Nov | Kahan / Muse | O2 | P04 13 Nov; P20 (not in map, nearby) | P04 −5.8; P20 +2.1, −7.9, −12.4, −4.4, +2.7 | P04 **156** vs 164; P20 **226/233/230/227/234** vs 257 | no (default £273–282, all under Reyhan's −5%) |
| 14 Nov | England v Japan | Twickenham | P13 | – | booked | – |
| 18–19 Nov | EV / Vet shows | ExCeL | P04 (P20 now blocked) | **soft** (−8.5, −11.2) | P04 **155 / 155** vs 171 | no |
| 20–21 Nov | The Script / Eng v NZ | O2 / Twickenham | P04, P20 (P11, P13 booked) | P04 −3.8 / −3.1; P20 n/a | P04 182/184 vs 174; P20 300/305 vs 267 | yes |
| 23 Nov | Don Toliver | O2 | P04, P20 | P04 −5.9 | P04 **176** vs 181; P20 302 vs 281 | P20 yes; P04 no |
| 24 Nov | HOMES UK | ExCeL | P04, P20 | P04 −6.9 | P04 **176** vs 180; P20 301 vs 292 | P20 yes; P04 no |
| 26–28 Nov | Ally Pally gigs / Nations Finals | Ally Pally / Twickenham | P11 now **booked 26–28** (booked 3 Nov); P13 27 Nov | – | P13 27 Nov 335 vs 255 | yes |
| 30 Nov | Mariah Carey | O2 | P04, P20 booked; P01 blocked | – | – | – |
| 8 Dec | Kehlani | O2 | P04, P20 | P04 −1.9 | P04 **180** vs 191; P20 **256** vs 275 | no |
| 11–12 Dec | Darts opening | Ally Pally | P11 (**12–13 Dec reopened**: the 3 Nov booking was cancelled; both available in PL) | **+10.3 / +6.8** | 318 / 321 vs 254 | **yes** |
| 13–17 Dec | Darts Round 1 | Ally Pally | P11 | **soft** (−1.2 to −7.7) | **229/203/207/218/237** vs 278 | no (override conflict, below) |
| 16–20 Dec | Horse Show 17–21 / Kasabian 18 | ExCeL / O2 | P04 16–19, P20 16–20 | P04 +3.8, +4.0, +2.9, +3.6 | P04 **187**/189/197/203 vs 187; P20 **250/249**/260/275/**257** vs 258 | P04 thin; P20 16–17 and 20 Dec no |
| 18 Dec | Darts | Ally Pally | P11 | −4.9 | 282 vs 248 | yes |
| 21 Dec–1 Jan | School Christmas holiday | London | P13 21–26 Dec, P11 23–24 Dec, P20 21–27 Dec + 28 Dec–2 Jan (P05, P04 booked) | P13 +9.9 to +24.9; P11 −0.4, −3.6; P20 28 Dec–2 Jan +4.7 to +14.6 | P13 216/217/223/212/214/217 vs P50 259–287 | no for P13 (now −5%) |
| 23 Dec | Darts Round 2 | Ally Pally | P11 | −0.4 | **298** vs 311 | no (Reyhan +5%, but the default fell £313 → £290) |
| 31 Dec | NYE | central | P20 (others booked) | +12.2 | 465 vs 272 | **yes** |
| 3 Jan | Darts final | Ally Pally | P11 | – | **188** vs 203 (clean week) | no |
| 4 Jan–2 Feb | no verified event | – | – | – | Reyhan's Jan −10% on P04, P13, P20 | – |

## 4. Missed compression: open nights on verified events at or below the fortnight
| Ref | Night(s) | Event | Our £ 4 Nov (3 Nov) | Fortnight £ | Gap £ | Market support |
|---|---|---|---|---|---|---|
| P13 | 12 Nov | England v Croatia | 170 (151) | 177 | **7** (3 Nov 18) | weak: occ −8.1; £6 under P25 |
| P20 | 13, 14, 15, 16, 17 Nov | Kahan / Muse | 226, 233, 230, 227, 234 (241, 244, 239, 245, 248) | 257 | 31, 24, 27, 30, 23 = **135** (3 Nov 88) | weak: occ mixed, P50 flat £208–216 |
| P20 | 8 Dec | Kehlani | 256 (255) | 275 | 19 | weak (P20 not in the O2 map) |
| P20 | 16, 17, 20 Dec | Horse Show | 250, 249, 257 | 258 | 8, 9, 1 = 18 | P04 occ +3.8/+4.0 on the same map |
| P04 | 10, 11 Nov | ExCeL expos | 149, 151 (169, 170) | 158 | 8, 6 | **none**: occ −9.7 / −13.9 |
| P04 | 13 Nov | Kahan | 156 (179) | 164 | 8 | none: −5.8 |
| P04 | 18, 19 Nov | EV / Vet | 155, 155 (185, 185) | 171 | 16, 16 | none: −8.5 / −11.2 |
| P04 | 23, 24 Nov | Don Toliver / HOMES UK | 176, 176 (185, 186) | 181, 180 | 5, 4 | none: −5.9 / −6.9 |
| P04 | 8 Dec | Kehlani | 180 (182) | 191 | 11 | none: −1.9 |
| P04 | 16 Dec | Horse Show eve | 187 (189) | 187 | 0 | +3.8 |
| P11 | 23 Dec | Darts R2 | 298 (314) | 311 | 13 | none: −0.4 |
| P11 | 3 Jan | Darts final | 188 (185) | 203 | 15 | not in data |
| | | **Excluding darts R1** | | | **21 nights / £281** (3 Nov: 23 / £211) | |
| P11 | 13–17 Dec | Darts R1 (conflict) | 229/203/207/218/237 (228/202/207/217/237) | 278 | 49, 75, 71, 60, 41 = **£296** (3 Nov £319) | **none**: occ −1.2 to −7.7 |
| | | **Full total** | | | **26 nights / £577** (3 Nov: 28 / £530) | |

- **Why the total rose:** Reyhan's 01:24–01:31Z cuts. P04 9–24 Nov is now −15%: its 12 open nights total £1,960 vs £2,178 yesterday. P20's Kahan nights fell £67 over the 5 nights. The P04 gaps rest on the fortnight rule alone, and the market shows the opposite (occupancy 3.1–13.9 pts below STLY). **I do not propose raising P04 in November on event grounds.** What needs settling there is the policy conflict: −15% vs Corentin's −8%.
- **Fell off the list:** P20 23–24 Nov (now above the fortnight); P20 18–19 Nov (now blocked); P11 26 Nov (booked 3 Nov).
- **The only verified events where the market is clearly ahead of STLY are already priced by PriceLabs:** P11 11–12 Dec (darts opening) and P20 31 Dec (NYE). Christmas school holiday for P13 is the exception: occupancy is +13.8 to +24.9 pts and our price is under P50 on every night.

## 5. Dates where our price should differ from PriceLabs, by submarket
- **Shepherd's Bush P13:**
  - 12 Nov to ≥ £176, min 1 (+£6; default £171).
  - Christmas 7–26 Dec to at least +10% on today (**+£422**), or to P50 (+£722).
  - The 21–26 Dec −5% (new) and 7–20 Dec −5% run against this: Corentin to confirm which stands.
  - Keep the twins slightly apart. Today they are £246 apart over 20 nights, which is wider than "small".
- **St John's Wood P05:**
  - Above current: 7–8 Dec to ~P75 (**+£250**); 13–21 Dec to P75 (**+£592**). The latter conflicts with Reyhan's new 13–19 Dec −7%.
  - Below current: 29 Dec to £1,039–1,091 (default–P90; **−£186 to −£238**).
- **Barking P04:**
  - 14–19 Dec to P75 (+£157) by removing the −10% for those nights. Market +1.6 to +4.0 pts vs STLY, with the Horse Show on 17–21 Dec.
  - November: no event-based raise (market soft). The −15% on 9–24 Nov **conflicts with Corentin's −8% (policy, 24 Oct)**: Corentin to confirm.
- **Camden P11:**
  - 23 Dec ≥ £311 (+£13); 3 Jan ≥ £203 (+£15).
  - 12–13 Dec reopened at £321 / £229 after the cancellation: fine for 12 Dec (P75 £326). 13 Dec sits in the darts R1 conflict.
  - Darts 13–17 Dec: Corentin's +5% on the default (`darts_override_24oct`) would be ≈ £1,239 (default £1,180 x 1.05) vs £1,094 today (+£145). This is a conflict, not a new proposal, and the market is soft on these nights.
- **Canary Wharf P20:**
  - 13–17 Nov to the fortnight (+£135) only if Corentin reads Kahan/Muse as compression; the market does not show it.
  - 8 Dec +£19; 16–17 Dec +£17.
  - Hold 28 Dec–2 Jan (£2,627: above P75 £2,094, under P90 £3,038; NYE priced).
  - Conflicts to confirm: base 330 vs 350; 16–19 Nov min 2 vs min 3.
- **Mile End P12:** 26 Nov done (£311, default £298). Rest: hold.
- **Marylebone P06:** blocked on purpose; nothing proposed.

Data gaps:
1. All market figures are PriceLabs Nearby Listings: Airbnb-derived, host-fee, `cleaning_fee` null, not comp sets, horizon not stated. The daily bands are bedroom ranges, and for P05 they may include 3 BR (the summary's `best_category` is 3 BR). P01, P09 and P06 rows are from 2 Nov; P08 and P14 from 27 Oct. P10, P15–P19 and P02/P03/P07 were not pulled.
2. Events come from domain-restricted WebSearch summaries, not page reads. `wembleystadium.com`, `theo2.co.uk` and `alexandrapalace.com` must be allowed in the session's network settings before the pages can be read directly.
   - Open conflicts: Kahan 13–17 (listing) vs 13/14/17 (3 Nov event page); Twickenham kick-off 14 Nov 16:40 vs 17:20; Myles Smith 18 vs 20 Nov.
   - Ticket status is known only for England v Croatia (sold out). Attendance is stated only for darts (180,000).
3. **P13 3064856 fell ~£12/night on 7–20 Dec** while its overrides (−5%, 2 Nov) and the twin 3090701's prices stayed the same. The cause was NOT CHECKED. `get_customizations` shows an active "Aggressive" occupancy-based adjustment (31–60-day band −15% to +20%) and a booking-recency factor; either could differ between the twins, but I have not confirmed either.
4. **P20 18–19 Nov `Blocked` in PriceLabs:** the reason and whether it is a Smoobu block were NOT CHECKED.
5. P04 December overrides were not re-read today. There are no P04 December log entries, so the 2 Nov reading of −10% 6–22 Dec is assumed to still apply.
6. P09 PriceLabs has not refreshed since 3 Nov 07:37Z.
7. Not covered by this section: the running effect of the 18 Oct base rises, the Barking double-booking check, P11 commission. Those belong to the occupancy and channel sections.
