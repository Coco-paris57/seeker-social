# Market & demand calendar: run D = 2026-11-11 (window 12 Nov 2026 – 9 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Left out: P02/P03/P06/P07 intentional blocks; nights after handback (P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec); P14 numbers only; P13 = one flat (3064856 + 3090701). Not re-raised: P13 1 Dec +50%, the 15%/20% stay discounts, the Booking.com booster (P11 8–15 Dec 18% commission is the booster), P04 min stay 3, P04 2 Dec, P12 17 Nov, P11 darts +5% ("do not re-raise").
- **Market data pulled 11 Nov 07:18–07:20Z** with `get_neighbourhood_data` (detail, future prices and occupancy) for P11 3064196, P13 3064856, P05 3166592, P04 3562176, P20 3547481, P12 2699998 and P01 3320302. All returned `all_operations_ok=true`. **Process breach:** P11 and P13 went one at a time, but P05/P04/P20/P12 were sent together (they finished within 0.7 s of each other). None failed. P01 went alone afterwards. Raw files: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m11/neigh_<id>.json`.
- `data/snapshots/2026-11-11/market.csv`: **copied forward from 10 Nov (114 lines) and 7 rows added** (P13, P05, P04, P11, P20, P12, P01) under `.market.csv.lock`, giving 121 lines.
- **PriceLabs edits since 10 Nov 06:00Z** (`get_user_logs`, listing, 10–11 Nov): **6 entries, all made by Reyhan on 10 Nov at 16:28Z, all on P12** (and copied to its Vrbo child): 12–20 Nov +5% min 2; 30 Nov–3 Dec +5% min 2; 7–13 Dec an override with no price and min 3, which takes away the 9 Nov −5%. **Nothing on P01, P04, P05, P11, P13 or P20.**
- **Our prices** come from `prices.csv` 11 Nov `pricelabs_price`, which is the same as the neighbourhood `final_price`. Refresh and push times are from `raw/listing_data.json`:
  - **P20** was last refreshed and pushed **10 Nov 09:27Z**, before the cancellation, so PriceLabs still shows 21–24 Nov as Booked.
  - **P11** was refreshed 10 Nov 16:28:54Z but last **pushed 09:27:10Z**. Its `prices.csv` figures therefore may not be live on Booking.com.
  - P01 was refreshed and pushed 11 Nov 04:47Z.
- **Booking state:** Smoobu `reservations.csv` 11 Nov, confirmed rows only. The P20 21–25 Nov and P01 18–21 Dec cancellations therefore count as open unless PriceLabs shows a block.
- **Fortnight method is the same as on 8–10 Nov.** It takes 7 nights each side. It leaves out blocked nights and nights above 2x the median. Horse Show and 3 Jan use one clean week. Scripts are in `scratchpad/m11/`: `analyse11.py` (output `out11.txt`), `open11.py` and `p04base.py`. Re-running the 10 Nov script on the 10 Nov data gives **26 / £478**, the same as yesterday.
- **Events re-checked 11 Nov 2026** with WebSearch limited to venue and organiser domains. WebFetch returns `ENOTFOUND` for www.alexandrapalace.com and www.pdc.tv, so I stopped trying further hosts. **Every event fact below is a search summary of an official page, not a page I read.**

## 1. Submarket table
Sources:
- Percentiles: `market.csv` 11 Nov (`p25/p50/p75/p90`, PriceLabs Nearby Listings, bedroom-matched).
- Market occupancy: `market_occ_30/60` = `pl_kpis.csv` 11 Nov `market_occupancy_next_30/60`.
- Our occupancy: `pl_kpis.csv` `occupancy_next_30/60`.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | Our occ 30/60 | vs 10 Nov |
|---|---|---|---|---|---|---|
| Canary Wharf | P20 | 2 | 38 / 30% | 214 / **252 / 323** / 421 (150) | 77 / 57%* | P50 +2, P75 +5 |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 35 / 29% | 215 / **260 / 335** / 429 (146) | 100 / 100%** | first pull since 2 Nov (258 / 331) |
| Barking | P04 | 2 | 24 / 21% | 140 / **176 / 213** / 261 (90) | 47 / 45% | P50 +2, P75 −3 |
| Mile End (handback 13 Dec) | P12 | 2 | 42 / 34% | 170 / **205 / 232** / 289 (119) | 53 / 70% | P50 +1, P75 +2 |
| Camden | P11 | 2 | 49 / 39% | 227 / **289 / 326** / 374 (169) | 60 / 58% | P50 +1, P75 +1 |
| St John's Wood (4 BR per policy) | P05 | 4 | 43 / 39% | 459 / **577 / 721** / 1,191 (88) | 73 / 72% | P50 +5, P75 +6 |
| Shepherd's Bush | P13 | 2 | 43 / 37% | 191 / **223 / 266** / 342 (115) | 80 / 52% | P50 +2, P75 **−9** |
| Greenwich (handback 26 Nov) | P09 | 1 | 38 / 32% | 9 Nov row 110 / 133 / 160 / 204 | 97 / 98%** | not pulled |
| Marylebone (blocked) / Islington (handback 13 Nov) / Primrose Hill (numbers only) | P06 / P08 / P14 | 2 / 2 / 1 | 49/42; 51/43; 46/38% | 2 Nov / 27 Oct rows | 83/92**; 100/100**; 0/0% | not pulled |

\* P20's PriceLabs figures still count the cancelled 21–24 Nov stay (stale refresh). Smoobu is the source of truth.
\*\* Inflated by handback or intentional blocks.

No submarket moved much overnight; percentiles shifted by ±£1–9. No `market.csv` row exists for Bow, Little Venice, Fulham, Kings Langley, Ladbroke Grove, Bayswater, Woolwich or Hanger Lane.

## 2. Open raises and reopened nights re-checked (prices.csv 11 Nov vs 10 Nov; market = `m11/neigh_<id>.json`)
| Ask | 10 Nov | **11 Nov** | Market today (P50 / P75; occ vs STLY) | Status |
|---|---|---|---|---|
| **P13 Christmas +10%, min 2 on 25–26 Dec** (3064856, 17 open nights 10–26 Dec) | £3,754 | **£3,807 (+£53)**; twin 3090701 £3,948 | P50 **£4,159** / P75 £5,258; uncustomized £3,965; **+4.3 to +26.9 pts on all 17 nights** | **Still open.** Under P50 on 16 of 17 nights (all except 10 Dec, which went 221 → 272 while the twin went 234 → 207). +10% = **+£381**; reaching P50 = **+£352**. Min stay is still **3 on 25–26 Dec** against the min-2 ask, so the conflict stands for Corentin. |
| **P05 7–8 Dec to ~P75** | £947 | **£923** (471 / 452), min 2 | P75 £1,158; default 583 / 529; occ +5.0 / +1.0 | **Still open: +£235** (was +£202). Slipped £24 overnight. |
| **P05 13–14 Dec** (sellable since 9 Nov, min 2) | £1,021 | **£1,023** (518 / 505) | P75 £1,161; default 633 / 592; occ **+11.4 / +4.3** | **Still open: +£138.** |
| **P05 21 Dec** (Reyhan +300% min 1) | £2,207 | **£2,230** | P75 702 / P90 898; default 762; occ +2.1 | Still priced as a soft block (2.5x P90). **Conflict, Corentin to confirm** whether it is meant to sell. |
| **P05 29 Dec** (Reyhan +300% min 1; max 3,500) | £2,855 | **£2,786** | P90 1,088; default 1,148; occ +2.2 | Same: **+£1,638 above default**. Conflict, Corentin to confirm. |
| **P11 darts 13–17 Dec** (policy 21 Oct "average above £300"; 24 Oct "leave the +5%") | 221 / 195 / 200 / 209 / 233 | **13–14 Dec SOLD** in the Booking.com 8–15 Dec stay (room £126.94 / £113.24; PriceLabs today 230 / 205). **15–17 Dec open 212 / 222 / 246** (avg £226.7), min 3 | P50 237 / 252 / 265; occ **−3.3 / −3.7 / +1.2** | **Conflict with the recorded decision unchanged** (Reyhan's −3% replaced the +5%). The sold darts nights realised 0.55x the PriceLabs price because of the Booking.com stack (Dispatcher facts). Market soft on 15–17 Dec: **no new proposal**. |
| **P11 3 Jan ≥ fortnight** | £174 | **£183** (not pushed: last P11 push 10 Nov 09:27Z) | fortnight £203; P25 £179 / P50 £220; occ **+4.2** | **Still open: +£20.** The live channel price may still be £174 (NOT CHECKED). |
| **P11 23 Dec** | £276 | **£289**, min 2 | P50 £294; fortnight £316; occ **−5.5** | Hold: market soft. |
| **P04 November after the base cut** (9 open nights: 12, 13, 18–24 Nov) | £1,311 | **£1,292 (−£19)**; uncustomized £1,681 | P50 **£1,411** / P75 £1,922; occ **−4.0, −1.1, +0.6, +0.1, −1.7, −1.5, −1.0, −2.0, −2.7** | **Under P50 on all 9 nights, but the market is at or below STLY.** No raise proposed. Base 200 still in `listing_data` (Reyhan's 9 Nov cut, for Corentin to confirm). Reyhan's 9–24 Nov **−4%** also replaces Corentin's policy **−8% on 1–25 Nov** (24 Oct). That is a conflict with a standing decision, for Corentin to confirm. |
| **P04 14–19 Dec to P75** | £1,141 | **£1,156** | P75 £1,288; occ **+3.2, +2.9, +5.5, +3.0, +5.0, +8.0** | **Still open: +£132.** |
| **P20 21–24 Nov (reopened: Airbnb £638.54 stay cancelled)** | booked | PriceLabs **still shows Booked** (last refresh/push 10 Nov 09:27Z). Model price 301 / 247 / 294 / 279 = **£1,121**, min 3/2/2/2 | P50 £847 / P75 £1,128; occ **+0.4 / −1.1 / +6.2 / +0.5** | At about P75 if pushed. **PriceLabs has not seen the cancellation**: P20 needs a sync or refresh (ops; not done, read-only). Whether the Smoobu or channel calendars are open, and at what price: **NOT CHECKED**. |
| **P20 20 Nov** | £259, min 3, orphan | **£234, `unbookable=1`**, min 3 | P50 217 / P75 285; occ +3.5 | Still unbookable only because PriceLabs thinks 21 Nov is a check-in. Once synced, **20–24 Nov is a 5-night open run** (£1,355 at model prices). It is not an orphan. The delivery-block conflict (policy 20–22 Nov) is gone. |
| **P20 5 Dec** | £309, unbookable | **£311, unbookable**, min 3 | P50 226 / P75 299; occ **+4.4** | **Not fixed** (1-night gap between the 25 Nov–5 Dec and 6–14 Dec stays). |
| **P01 18–20 Dec (reopened: Airbnb £720.90 stay cancelled)** | booked | **Blocked in PriceLabs** (refresh 11 Nov 04:47Z). Model 284 / 279 / 243 = **£806**, min 3 | P50 £710 / P75 £951; occ **+3.5 / +3.5 / −4.9** | **Not open.** These are the last 3 nights before handback (policy last night 20 Dec; policy's gap block is 30 Nov–17 Dec). **Who blocked them and why: NOT CHECKED.** If the block is not intended, the 3 nights could be sold at the model price (£806, above P50). Corentin to confirm. |
| **P12 (Reyhan 10 Nov 16:28Z)** | – | 12–20 Nov open: 216 / 269 / 262 / 268 / 274 / 299 | P75 246 / 256 / 237 / 237 / 244 / 256; occ **−7.3, −4.8, −11.2, −11.7, −5.7, −17.5** | **Above P75 on 5 of 6 nights while the market is well below STLY.** The +5% runs against the market. 7–13 Dec £2,070 vs P75 £1,880 (occ −0.2 to +10.2): fine. For Corentin; handback 13 Dec. |

## 3. Demand calendar, next 90 days
**Re-verified 11 Nov 2026** (WebSearch on official domains, summaries only):
- **Alexandra Palace darts (the dates behind policy's Camden 13–17 Dec decision):** the tournament runs **11 Dec 2026 – 3 Jan 2027**, final **Sun 3 Jan 20:00 GMT**, semi-finals Sat 2 Jan, **record 180,000 tickets** (stated), ballot closed ([alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq)).
  - The PDC FAQ summary lists Round One sessions on **Fri 11 Dec (evening), Sat 12 and Sun 13 Dec (afternoon and evening)**, with Round One continuing **through 19 Dec**. So **13–17 Dec are Round One session days**; afternoon/evening detail for 14–17 Dec was not seen.
  - **Conflicts:**
    - One summary says Round One "starts on the evening of Monday 14 December".
    - Round Two is 20 Dec in one summary and 22–23 Dec in another.
    - Round Three 27–29 Dec is consistent.
    - The quarter-final on 1 Jan is **UNVERIFIED** today.
    - One PDC ballot item says the event ends 4 Jan.
- **The O2** (event pages via search, [noah-kahan-2026](https://www.theo2.co.uk/events/detail/noah-kahan-2026), [don-toliver-2026](https://www.theo2.co.uk/events/detail/don-toliver-2026), [kasabian-2026](https://www.theo2.co.uk/events/detail/kasabian-2026), [jingle bell ball](https://www.theo2.co.uk/events/detail/capitals-jingle-bell-ball-2026), [arena listing](https://www.theo2.co.uk/events/venue/the-o2-arena)):
  - Event pages: **Noah Kahan Fri 13 / Sat 14 / Tue 17 Nov**; **Don Toliver Mon 23 Nov**; **Jingle Bell Ball Sat 5 – Sun 6 Dec** (sale status inconsistent: "on sale now" vs "on sale 6 Nov"; Capital's "sold out" was not re-checked); **Kasabian Fri 18 Dec**.
  - Listing page: Muse 15, Myles Smith 20, The Script 21, Jungle 24–25, Jessie Ware 28, LOTR 29, Mariah Carey 30 Nov (one entry says 29); Kehlani / OCS / The Enemy 8–10 Dec (layout ambiguous); The Darkness 16–17, Greg Davies 18 Dec; Disney On Ice and Culture Club 24 Dec – 3 Jan.
  - Conflicts: Kahan 15–16 on one listing; Kasabian 19 Dec on one listing; Bryson Tiller now **1–2 Dec** (3 Dec yesterday, 7 Dec before that); UB40 5–7 Dec. The summary says the listings were indexed about 4 weeks ago.
- **ExCeL** ([what's on](https://www.excel.london/whats-on)): **London EV Show 18–19 Nov** and **HOMES UK 24–25 Nov** are now listed (UNVERIFIED yesterday); London Build Expo 25–26 Nov; **London International Horse Show 17–21 Dec**; **MegaCon Live 23–24 Jan**; **Cisco Live 8–12 Feb 2027** (new; edge of window; [excel.london](https://www.excel.london/visitor/whats-on/cisco-live-2027)). No attendance stated. The Vet Show 19–20 Nov was not in today's summary: UNVERIFIED.
- **Wembley:** England v Croatia **Thu 12 Nov 19:45**, tickets £25–120, England's last home game of 2026 ([wembleystadium.com](https://www.wembleystadium.com/events/2026/England-v-Croatia)).
- **Twickenham:** England v New Zealand **Sat 21 Nov** (kick-off 14:10 or 14:50, conflicting; some hospitality sold out); **Finals Weekend Fri 27 – Sun 29 Nov** ([allianzstadiumtwickenham.com/nations-championship](https://allianzstadiumtwickenham.com/nations-championship), [whats-on](https://allianzstadiumtwickenham.com/whats-on)). England v Japan 14 Nov was not re-checked today (P13 and P10 are booked that night).
- **NYE:** Thu 31 Dec 20:00 – 00:30; Ticketmaster only; £20 / £35 for Londoners, £40 / £55 for others; second batch date to be confirmed ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)).
- **School holidays (Camden):** autumn term ends Fri 18 Dec; **Christmas break Mon 21 Dec – Fri 1 Jan**; spring term from Mon 4 Jan; spring half-term 15–19 Feb, outside the window ([camden.gov.uk/term-dates](https://www.camden.gov.uk/term-dates)). Tower Hamlets was not re-read.

Effect = market occupancy vs STLY in points (`m11`). Properties come from the VENUES map in `build/properties.py`; P20 is shown with P01 for the O2 and ExCeL.

| Nights | Event | Venue | Open properties | Effect | Our £ vs fortnight £ | Priced by PL? |
|---|---|---|---|---|---|---|
| 12 Nov | England v Croatia | Wembley | P13 (P10 booked) | **soft** −10.0 | **204** vs 217 | no |
| 13–17 Nov | Kahan / Muse | O2 | P04 13; P20 13–17 | P04 −1.1; P20 −4.9, −10.4, −9.0, −1.5, +4.3 | P04 **141** vs 144; P20 324 / 340 / 279 / 268 / 275 (fortnight n/a: only 6 clean nights; their mean £274) | P20 yes (above P75 on 13–14 Nov) |
| 18–19 Nov | London EV Show | ExCeL | P04 (P20 blocked) | normal +0.6 / +0.1 | **139 / 141** vs 148 | no |
| 20–21 Nov | The Script / Eng v NZ | O2 / Twickenham | P04; P20 20 (unbookable), 21 (reopened, PL still booked) | P04 −1.7 / −1.5; P20 +3.5 / +0.4 | P04 **147 / 150** vs 154; P20 **234** / 301 vs 293 | P04 no; P20 21 yes |
| 23 Nov | Don Toliver | O2 | P04; P20 (reopened) | P04 −2.0; P20 **+6.2** | P04 **145** vs 159; P20 294 vs 286 | P04 no; P20 yes |
| 24 Nov | Jungle / HOMES UK | O2 / ExCeL | P04; P20 (reopened) | −2.7 / +0.5 | P04 **146** vs 161; P20 **279** vs 301 | no |
| 27 Nov | Finals Weekend | Twickenham | P13 | **+19.7** | 322 vs 241 | yes |
| 5–6 Dec | Jingle Bell Ball | O2 | P20 5 (unbookable); P04 6 | P20 +4.4; P04 −1.0 | P20 **311** vs 336; P04 187 vs 187 | P20 no; P04 flat |
| 8 Dec | Kehlani (date layout ambiguous) | O2 | P04 | +6.1 | **186** vs 188 | no (−£2) |
| 13–14 Dec | Darts R1 | Ally Pally | P11 **booked** (Booking.com 8–15 Dec) | −0.3 / −7.0 | sold £126.94 / £113.24 room | – |
| 15–17 Dec | Darts R1 | Ally Pally | P11 | **soft** −3.3 / −3.7 / +1.2 | **212 / 222 / 246** vs 284 | no |
| 16–18 Dec | Horse Show / Kasabian 18 | ExCeL / O2 | P04 16–19; P20 14–18; P01 18 (blocked) | P04 +5.5 / +3.0 / +5.0; P20 −2.4 / +0.9 / +1.2 | P04 **189** / 191 / 201 vs 189; P20 **291 / 295 / 305** vs 316 | P04 mostly; P20 no |
| 10–26 Dec | pre-Christmas, school holiday from 21 Dec | London | P13 | **+4.3 to +26.9** | under P50 on 16 / 17 nights (§2) | **no** |
| 23–24 Dec | Darts R2 (date conflict) / Christmas Eve | Ally Pally | P11 | −5.5 / −6.6 | 289 / 267 vs 316 | no; market soft |
| 26 Dec – 2 Jan | Disney On Ice | O2 | P20 26 Dec – 2 Jan; P04 2 Jan | P04 2 Jan +7.1 | P20 326–494 vs 276; P04 202 vs 183 | yes |
| 31 Dec | NYE | central | P20 | **+11.3** | 494 vs 290 | yes |
| 3 Jan | Darts final | Ally Pally | P11 | +4.2 | **183** vs 203 | no |
| 22–23 Jan | MegaCon Live | ExCeL | P20, P04 | P20 +8.0 / +9.2; P04 −1.3 / −3.0 | P20 252 / 274 (P50 213 / 210); P04 163 / 168 | yes / normal (far out; not in totals) |
| 8–9 Feb | Cisco Live (no attendance stated) | ExCeL | P20 | +3.7 / +3.4 | 255 / 256 vs P50 216 / 214 | yes; not in totals |

## 4. Missed compression: open nights on verified events at or below the fortnight
Same event set and method as 8–10 Nov (`m11/out11.txt`).

| Ref | Night(s) | Event | Our £ 11 Nov (10 Nov) | Fortnight £ | Gap £ | Market (occ vs STLY) |
|---|---|---|---|---|---|---|
| P13 | 12 Nov | England v Croatia | 204 (192) | 217 | 13 | −10.0 |
| P04 | 13 Nov | Kahan | 141 (144) | 144 | 3 | −1.1 |
| P04 | 18, 19 Nov | EV Show | 139, 141 (140, 144) | 148 | 9, 7 | +0.6 / +0.1 |
| P04 | 20, 21 Nov | The Script | 147, 150 (149, 152) | 154 | 7, 4 | −1.7 / −1.5 |
| P20 | 20 Nov | The Script (**unbookable, PL stale**) | 234 (259) | 293 | **59** | +3.5 |
| P04 | 23 Nov | Don Toliver | 145 (147) | 159 | 14 | −2.0 |
| P04 | 24 Nov | Jungle / HOMES UK | 146 (148) | 161 | 15 | −2.7 |
| **P20** | **24 Nov** | Jungle / HOMES UK (**reopened**) | **279** (booked) | 301 | **22 (new)** | +0.5 |
| P20 | 5 Dec | Jingle Bell Ball (**unbookable**) | 311 (309) | 336 | 25 | +4.4 |
| P04 | 8 Dec | Kehlani | 186 (185) | 188 | 2 | +6.1 |
| P11 | 15, 16, 17 Dec | Darts R1 (Reyhan −3%) | 212, 222, 246 (200, 209, 233) | 284 | 72, 62, 38 = **172** | −3.3 / −3.7 / +1.2 |
| P04 | 16 Dec | Horse Show eve | 189 (187) | 189 | 0 | +5.5 |
| P20 | 16, **17**, 18 Dec | Horse Show / Kasabian | 291, **295**, 305 (294, 323, 304) | 316 | 25, **21 (new)**, 11 | −2.4 / +0.9 / +1.2 |
| P11 | 23 Dec | Darts R2 | 289 (276) | 316 | 27 | −5.5 |
| P11 | 3 Jan | Darts final | 183 (174) | 203 | 20 | +4.2 |
| | | **Total, same method** | | | **21 nights / £456** (10 Nov **26 / £478**) | |
| | | Of which bookable, excluding darts R1 and the two unbookable P20 nights | | | **16 nights / £200** (10 Nov 19 / £172) | |

- **Change vs yesterday: −5 nights / −£22.** The causes add up exactly:
  - **Booked: −2 n / −£112.** P11 13–14 Dec sold in the Booking.com 8–15 Dec stay, at room £126.94 / £113.24 against PriceLabs 230 / 205. They leave the list, but at a loss to the price, not because the price was fixed.
  - **Night passed: −1 n / −£2** (P04 11 Nov).
  - **Window edge: −3 n / −£21.** P20 15–17 Nov dropped out because the fortnight has only 6 clean nights now that 11 Nov has left `prices.csv`. Their prices also rose £25–38 a night on PriceLabs' 10 Nov 09:27Z refresh, and on a 6-night mean only 16 Nov (−£6) would still be under.
  - **P20 cancellation: +1 n / +£62.** 24 Nov is new (+£22). On 20 Nov the fortnight rose from 278 to 293 as the dearer 21–24 Nov nights came back in, while the price fell from 259 to 234 (+£40).
  - **P20 December: +1 n / +£33.** 17 Dec is new (323 → 295, +£21); 16 and 18 Dec add +£12 as the fortnight rose 311 → 316.
  - **P11: +£24.** 15–17 Dec +£22 (the fortnight rose 264 → 284 on the unpushed 16:28Z refresh); 23 Dec +£3; 3 Jan −£1.
  - **P04: −1 n / −£9** (6 Dec now £187, just above its fortnight; the other nights moved £1–3).
  - **P13 12 Nov: +£3.**
  - Check: −112 −2 −21 +62 +33 +24 −9 +3 = **−£22**.
- **Where the market supports a raise** (occupancy clearly above STLY and our price under P50 or the fortnight): **P13 10–26 Dec**, **P05 7–8 and 13–14 Dec**, **P04 14–19 Dec**, **P11 3 Jan**. **P20 5 Dec** is blocked by min stay, not price. For the rest the fortnight rule is the only basis and the market is at or below STLY, so I am not proposing them.

## 5. Dates where our price should differ from PriceLabs
- **Shepherd's Bush P13, 10–26 Dec:** +10% = **+£381** (reaching P50 = +£352). Occupancy runs +4.3 to +26.9 pts over STLY on every night. Min stay is 3 on 25–26 Dec against the min-2 ask: conflict, Corentin to confirm.
- **St John's Wood P05:** 7–8 Dec **+£235**; 13–14 Dec **+£138**. 21 and 29 Dec at +300% (£2,230 / £2,786) are soft blocks; if they are meant to sell, 21 Dec at ~£702–898 and 29 Dec at ~£1,088–1,148. **Conflict, Corentin to confirm.**
- **Barking P04:** 14–19 Dec to P75 **+£132**. November: no raise (soft market). Two items for Corentin to confirm: the base cut 220 → 200, and the −4% on 9–24 Nov, which conflicts with policy's −8% on 1–25 Nov.
- **Camden P11:**
  - 3 Jan to at least the fortnight, **+£20**.
  - 15–17 Dec darts: no new proposal. The conflict with the recorded +5% decision stands.
  - The **P11 refresh at 16:28Z was not pushed**, so channel prices may be the 09:27Z set (NOT CHECKED).
- **Canary Wharf P20:**
  - **PriceLabs has not registered the 21–24 Nov cancellation** (last refresh/push 10 Nov 09:27Z). Until it syncs, 20 Nov stays unbookable and PriceLabs is not pricing 21–24 Nov.
  - Model prices: 20–24 Nov **£1,355**; 21–24 Nov £1,121 ≈ P75.
  - 5 Dec is still unbookable (min 3).
- **Canary Wharf P01, 18–20 Dec:** the cancelled nights are **blocked**, not open (£806 model, above P50 £710). If the block is not intended, they are sellable inventory before the 20 Dec handback. Corentin to confirm.
- **Mile End P12, 12–20 Nov:** Reyhan's +5% (10 Nov 16:28Z) puts 5 of 6 open nights above P75 while the market runs 5–18 pts **below** STLY. Flagged for Corentin; downside risk before the 13 Dec handback.

Data gaps:
1. Market figures are PriceLabs Nearby Listings: Airbnb-derived, `cleaning_fee` null, not comp sets, horizon unstated. P05 bands may include 3 BR; P13's P75 fell £9 overnight with n 116 → 115. P06/P08/P14 rows date from 27 Oct – 2 Nov and P09 from 9 Nov. P10, P15–P19 and P02/P03/P07 were not pulled.
2. P20 21–24 Nov and P01 18–20 Dec: live Smoobu availability, channel prices, and who blocked P01 18–20 Dec: **NOT CHECKED** (no Smoobu call made by this section). P20 `pl_kpis` occupancy (77% next 30) still counts the cancelled stay.
3. P11 channel prices after the unpushed 16:28Z refresh: NOT CHECKED. Neither are the reason P13 3064856 10 Dec rose 221 → 272 while 3090701 fell 234 → 207, or P05 21/29 Dec defaults vs the +300% (customizations not pulled).
4. Events are domain-restricted WebSearch summaries, not page reads. WebFetch fails with `ENOTFOUND` for www.alexandrapalace.com and www.pdc.tv (and, on 10 Nov, www.theo2.co.uk and excel.london); those hosts must be allowed in the session's network settings.
   - Open conflicts: darts Round One start (11 vs 14 Dec), Round Two (20 vs 22–23 Dec), QF 1 Jan UNVERIFIED, end 3 vs 4 Jan; Kahan 13/14/17 vs 15–16 Nov; Kasabian 18 vs 19 Dec; Bryson Tiller 1–2 / 3 / 7 Dec; Mariah Carey 29 vs 30 Nov; Kehlani 8 Dec layout ambiguous; Jingle Bell Ball sale status; Vet Show and England v Japan not re-checked today; Tower Hamlets term dates not read.
   - Attendance stated only for the darts (180,000 tickets).
5. The PriceLabs market calls broke the one-at-a-time rule for 4 calls (none failed); recorded in the `market.csv` source column.
