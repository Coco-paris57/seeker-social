# Market & demand calendar: run D = 2026-11-18 (window 19 Nov 2026 – 16 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Kept out of findings:
  - P02/P03/P06/P07 intentional blocks (P06: numbers only).
  - Nights after handback: P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec.
  - P14: numbers only. P13 = one flat (3064856 + 3090701).
  - P20 20–22 Nov delivery block.
  - Not re-raised: 15%/20% stay discounts, Booking.com booster, +10% Booking.com markup, P13 1 Dec +50%, P04 2 Dec +200%.
- **PriceLabs, strictly one call at a time.** Each reply was saved to `scratchpad/m18/` and checked (listing_id matches, 540 days, `all_operations_ok=true`) before the next call:
  - `get_user_logs` (listing, 17–18 Nov): **0 entries**. Every price move since 17 Nov comes from the algorithm or a refresh.
  - `get_neighbourhood_data` (detail, future prices + occupancy), first try, 07:19–07:22Z: P04 3562176, P13 3064856, P11 3064196, P05 3166592, P20 3547481, P12 2699998, P01 3320302, P06 3288517.
    - Other agents were writing neighbourhood replies at the same time. Each file was copied by exact name and its listing_id re-checked.
  - `get_listing_date_overrides` P04, 18 Nov – 10 Jan.
  - `get_customizations` P04 (listing level).
- **`market.csv`:** `data/snapshots/2026-11-18/market.csv` did not exist. It was created with the `rm/snapshot.py` header, and 8 rows were appended under `.market.csv.lock` (9 lines; script `scratchpad/m18/wmarket18.py`). Nothing was copied forward.
- **Prices and booking state:**
  - `prices.csv` 18 Nov `pricelabs_price` for 19 Nov – 17 Jan. PriceLabs last refreshed 17 Nov 09:08–09:10Z; P12 and P01 on 18 Nov.
  - After 17 Jan: neighbourhood `final_price` pulled today.
  - Booking state = `booking_status` in `prices.csv`, cross-checked with Smoobu `reservations.csv` 18 Nov.
  - "unc" = `uncustomized_price` from `raw/prices_<id>.json`.
- **Occ Δ** = `market_occupancy` minus `market_occupancy_stly`, in points (daily NL series).
- **Bedroom caveat (unchanged):** the *daily* P25–P90 series mix bedroom counts (`compset_settings.br_range_selected`). Only `summary_table` is bedroom-matched.
  - The mixes are 1–3 BR for P04/P11/P20/P01/P06, 2–3 BR for P13/P12 and 3–5 BR for P05.
  - Ratio of bedroom-matched P50 to the mean daily mixed P50 over the next 30 days (an **estimate**; the summary horizon is not stated):
    - P04 1.10, P11 1.14, P20 1.17: the daily P50 **understates** a 2 BR.
    - P13 0.96: the 3 BR share **overstates** it.
    - P05 1.29: the 3 BR share **understates** a 4 BR.
  - Figures marked "est. matched" below apply these ratios.
- **Fortnight method: rebuilt.** The 17 Nov scripts were lost with the container (`scratchpad/m18/analyse18.py`, output `out18.txt`).
  - Event block per property. The fortnight is 7 calendar nights before the block plus 7 after it.
  - Excluded from the fortnight: Blocked nights, the property's other event nights, the NYE week 26 Dec – 2 Jan, and anything over 2× the median.
  - Tested nights are those not Booked or Blocked; nights that cannot be booked are counted, as on 17 Nov.
  - Today's data reproduces 17 Nov's fortnight for P11 3 Jan (190.4 vs 191) and P11 14–17 Dec (283.5 vs 282). It cannot reproduce every 17 Nov figure exactly, so part of the day-on-day change is method, not price (see §4).

## 1. Submarket table
- P25 / P50 / P75 / P90 (n) = `market.csv` 18 Nov (PriceLabs Nearby Listings `summary_table`, bedroom-matched).
- Market occ = `market.csv` `market_occ_30/60` (from `pl_kpis.csv` 18 Nov).
- Our occ = `pl_kpis.csv` `occupancy_next_30/60`.

| Area | Ref | BR | Mkt occ 30/60 (17 Nov) | P25 / **P50 / P75** / P90 £ (n) | P50 17 Nov | Our occ 30/60 (17 Nov) | Note |
|---|---|---|---|---|---|---|---|
| Camden | P11 | 2 | 50 / 38% (50/38) | 230 / **290 / 331** / 384 (172) | 291 | 50 / 45% (53/47) | |
| Shepherd's Bush | P13 | 2 | 47 / 37% (47/37) | 187 / **220 / 272** / 347 (116) | 223 | 77 / 58% (80/52) | 22–27 Dec stay now registered (3064856 Booked; twin 3090701 closed) |
| St John's Wood (4 BR per policy) | P05 | 4 | 46 / 39% (46/39) | 455 / **568 / 689** / 1,221 (92) | 575 | 70 / 62% (67/62) | |
| Barking | P04 | 2 | 23 / 19% (24/19) | 138 / **174 / 214** / 265 (89) | 175 | 50 / **25%** (53/48) | PriceLabs now counts the 20 Dec – 1 Jan cancellation (matches Smoobu) |
| Canary Wharf | P20 | 2 | 38 / 30% (39/30) | 217 / **256 / 323** / 426 (149) | 256 | 67 / 57% (67/57) | |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 34 / 28% (34/28) | 218 / **267 / 340** / 427 (144) | 267 | 100 / 100%* | |
| Mile End (handback 13 Dec) | P12 | 2 | 42 / 33% (43/33) | 172 / **206 / 232** / 291 (119) | 207 | 73 / 87%* | |
| Marylebone (intentional block) | P06 | 2 | 51 / 40% (51/40) | 319 / **409 / 525** / 658 (214) | 414 | 87 / 93%* | numbers only |
| Primrose Hill (numbers only) | P14 | 1 | 48 / 36% (pl_kpis) | no row | – | 0 / 0% | not pulled |

\* Inflated by handback or intentional blocks.
- Market history (`initialize_detail.market_history`, the same pulls), December 2025 (December 2024):
  - Barking occ 43% (45%), ADR £159 (£136), median LOS 2 (3), **median booking window 19 (23) days**.
  - Camden 71% (73%), window 25 (31).
  - Shepherd's Bush 69% (75%), window 22 (36).
  - Canary Wharf 62% (69%), window 17 (15).
  - St John's Wood 66% (64%), window 43 (48).
- No `market.csv` row for Greenwich, Bow, Little Venice, Fulham, Kings Langley, Ladbroke Grove, Bayswater, Woolwich, Hanger Lane or Islington.

## 2. Dates where our price should differ from PriceLabs

### P04 Barking 20 Dec – 1 Jan (13 n, reopened by the Booking.com cancellation): is the cut justified?
| 13 nights | £ |
|---|---|
| PriceLabs now (18 Nov file) | **2,306** (162/162/159/169/173/167/165/175/192/193/194/201/194) |
| Smoobu / PriceLabs 17 Nov (booked-state) | 2,733 (−427, −15.6%) |
| Uncustomized now (17 Nov) | 2,833 (3,473) |
| Daily market P25 / **P50 / P75** / P90, 1–3 BR (17 Nov) | 1,764 / **2,233 / 2,849** / 3,802 (1,779 / 2,246 / 2,880 / 3,819) |
| est. matched 2 BR P50 (×1.10, estimate) | ≈ 2,450 |
| Cancelled booking (room) | 2,417.34 |

- **The market did not move.** P50 is −£13 and P75 −£31 vs yesterday.
- **Demand is above STLY on all 13 nights:**
  - Occ Δ +7.5 / +6.1 / +4.7 / +6.9 / +8.2 / +9.6 / +3.3 / +1.7 / +6.4 / +10.3 / +11.5 / **+17.9** / +12.9.
  - Market occ 19.1–41.4%; 31 Dec 41.4% vs 23.5% STLY.
- **What drove the cut is our own occupancy, not the market:**
  - Overrides are unchanged (`get_listing_date_overrides`): −5% on 20–31 Dec, −2% on 1 Jan, same min stays.
  - The remaining cut matches `occupancy_based_adjustment`, profile "Aggressive" (`get_customizations`). For 31–60 days out it applies −15% at ≤10% occupancy and −10% at 20%.
  - The cancellation emptied that window: price ÷ unc = 0.814, and 0.814 ÷ 0.95 = 0.857, so about −14%. This is an **estimate**: the applied factor is not exposed per date.
  - On top of that, unc itself fell £640 once the nights became available.
- **It will cut further without an edit:**
  - From 20 Nov, 20 Dec enters the 16–30-day band: −20% at ≤20% occupancy, −15% at 30%.
  - `booking_factor` adds −5% to −15% after 15–45 days without a booking. The last P04 booking was made 14 Nov.
- **Timing:** we are 32–44 days out. The market's December median booking window is 19 days (2025) and 23 days (2024), so most Barking December demand has not booked yet. The market has not "failed to show up".
- **Verdict:** the market does **not** justify the cut. £2,306 is +£73 over the mixed 1–3 BR P50 but about £144 under the estimated 2 BR P50, and £111 under what the same 13 nights sold for (£186/n).
  - The market supports holding £2,417 (the cancelled sale) to £2,849 (P75). 28 Dec – 1 Jan carry the strongest Δ (+6.4 to +17.9).
  - Absolute occupancy is low (19–41%; Barking 60-day market occ 19%), so P75 is not proven.
  - Lever, for Corentin: a floor or fixed override for these 13 nights, or switching off occupancy-based adjustment for them. Corentin's call.
- **Min stay (fact, not a proposal):** 3/3/3/4/4/4/4/**7**/5/5/5/5/4. The market's median booked LOS was 2 in Dec 2025 and 3 in Dec 2024. Policy floor is 3. Barking Airbnb 1455 and Booking.com state are for the channel section.

### Other items
| Item | 18 Nov (17 Nov) | Market (daily mix; est. matched) | Read |
|---|---|---|---|
| **P04 6–19 Dec** (−5%, min 3, 14 n) | **£2,044** (£2,150: −£106, no edit; 16 Nov £2,263) | P50 £2,224 / P75 £2,888; est. matched P50 ≈ £2,440. Occ Δ −2.7 to +6.2 (positive on 7–8, 11–14, 16–19 Dec) | **£180 under the 1–3 BR P50, two days running down.** unc £2,522. The same occupancy-based mechanism applies (price ÷ unc 0.81). **6–15 Dec (10 n): £1,432 vs P50 £1,581 / P75 £2,065.** a-p04-dec-1611 (+15%) would give ≈ £1,647 (estimate), still under P75. 17–19 Dec 146/159/164 vs P50 158/163/167: now under P50 (was over yesterday). |
| **P20 20–24 Nov** | 317 / 331 / 278 / 274 / 268 = **£1,468** (£1,349: +£119, no edit); min 3/3/2/2/2; all open in PriceLabs | P50 £1,071 / P75 £1,399; est. matched P50 ≈ £1,250. Occ Δ **−2.6 / −6.1 / −7.1 / −0.6 / −7.0** | 20–21 Nov = policy delivery block (numbers only; PriceLabs shows them open: t-p20-delivery). **22–24 Nov £820 vs P50 £637 / P75 £832; est. matched P50 ≈ £743.** At P75 in a soft market, 4–6 days out (market Nov median window 9 days). The market does not support the overnight rise; it does not force a cut either. Min 2 on 22–24 Nov is "confirm or revert" (brief item 3). |
| **P20 14–18 Dec** (5-n gap, min 3) | 297 / 300 / 302 / 332 / 311 = **£1,542** (£1,645: −£103, no edit) | P50 £1,105 / P75 £1,423; est. matched P50 ≈ £1,290. Occ Δ **−8.4 / −7.5 / −4.7 / −3.8 / −3.3** | £119 over P75 (mixed) but between the matched P50 and P75. Soft market, 26–30 days out (Dec window 17 days). Hold; no market case for a rise. |
| **P11 14–17 Dec** (darts Round One) | 229 / 227 / 233 / 258 = **£947** (£937); 18 Dec 314 (303) | P50 £998 / P75 £1,208; est. matched P50 ≈ £1,141 (2 BR summary P50 £290/n). Occ Δ **−4.8 / −1.0 / −2.1 / +2.0** | Policy level (21 Oct: darts average above £300) is £1,200, so the gap is **£253** (was £263). No override on these nights. **Conflict for Corentin to confirm** (24 Oct "+5%, leave" vs override no longer present), not a new proposal. On the bedroom-matched benchmark we are ~£194 under the 2 BR median, but the market is softer than STLY. |
| **P11 23–25 Dec** (min 2) | 291 / 276 / 273 = £840 (£821) | P50 £891 / P75 £1,244. Occ Δ −3.2 / −4.5 / −8.2 | £51 under the mixed P50 (matched ≈ £1,018, estimate). Soft vs STLY. Hold. Darts no-play days UNVERIFIED. |
| **P11 3 Jan** (darts final, min 3) | **170** (171) | P50 220 / P75 278; est. matched ≈ 251. occ 19.7%, Δ +0.8 | £20 under the fortnight (190.4). unc 193 (the −8% override noted 17 Nov). Low absolute demand; the final is one evening session. |
| **P05 7–8 Dec** (min 2) | **£973** (487 / 486) (£923: +£50) | Daily 3–5 BR P50 £875 / P75 £1,125; **4 BR summary P50 £568/n = £1,136**; est. matched ≈ £1,125. Occ Δ +5.2 / −0.6 | **Under the 4 BR median.** unc £1,243 (+£270 over the price); the cause is NOT CHECKED (P05 customizations not pulled). |
| **P05 13–14 Dec** (min 2) | **£1,016** (516 / 500) (£962: +£54) | Daily P50 £858 / P75 £1,137; 4 BR P50 £1,136; est. matched ≈ £1,103. Occ Δ **+12.4 / +5.8** | 13 Dec is P05's most compressed open night. £120 under the 4 BR summary P50; unc £1,233. |
| **P05 21 Dec** (+300%, min 1) | **£2,039** (£2,054) | Daily P90 898; 4 BR P90 £1,221; unc 660; Δ +2.0 | 1.7× the 4 BR P90. 1-night orphan between 15–21 Dec and 22–29 Dec. **Conflict for Corentin** (unchanged): is it meant to sell? |
| **P05 29 Dec** (+300%, min 1) | **£2,569** (£2,563) | Daily P90 1,047; 4 BR P90 £1,221; unc 1,011; Δ +1.8 | 2.1× the 4 BR P90; orphan between 22–29 Dec and 30 Dec – 4 Jan. Same conflict. |
| **P13 open December nights** | 1 Dec 278 (twin 194), min 1: policy +50%, numbers only. **13–21 Dec (9 n): 3064856 £2,142** (£2,057: +£85, no edit); twin 3090701 £2,074 | 2–3 BR daily P50 £2,099 / P75 £2,693; est. matched 2 BR P50 ≈ £2,023. Occ Δ +9.2 / +5.7 / −0.2 / +3.7 / +5.3 / +7.8 / **+14.3 / +11.7 / +13.9** | At or above the 2 BR median overall. **19–21 Dec 243 / 224 / 226 = £693 vs mixed P50 £732 (−£39, was −£78); est. matched ≈ £706.** The three most compressed open nights sit at the median, nowhere near P75 (£957). The market data supports raising 19–21 Dec toward P75 but does not prove it. 22–27 Dec now Booked in PriceLabs. |

## 3. Demand calendar, next 90 days
**Re-checked 18 Nov 2026.**
- `WebFetch` failed with `ENOTFOUND` for www.pdc.tv, www.alexandrapalace.com and www.theo2.co.uk. These hosts have to be allowed in the session's network settings.
- Every event fact below is a **WebSearch summary restricted to the venue or organiser domain** (checked 18 Nov 2026), not a page read.

**World Darts Championship, Alexandra Palace**
- Sources: [alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq), [pdc.tv/calendar](https://www.pdc.tv/calendar/).
- **Fri 11 Dec 2026 – Sun 3 Jan 2027**; Great Hall for the first time.
- QF Fri 1 Jan; SF Sat 2 Jan 19:30; **final Sun 3 Jan 20:00 GMT**.
- Conflicts:
  - Round One start: today's summary gives **Sun 13 Dec**; 17 Nov gave Mon 14 Dec. UNVERIFIED.
  - A PDC registration page and the ballot news say the event runs "until January 4".
- No-play days 24–26 Dec: UNVERIFIED.
- "180,000 tickets available" appears in the summary but the page was not read: UNVERIFIED.

**Twickenham (Allianz Stadium)**
- Sources: [England Rugby preview](https://www.englandrugby.com/follow/news-and-media/england-v-new-zealand-preview-2026-nations-championship), [Fri 27 Nov ticketing](https://help.englandrugby.com/support/solutions/articles/103000349981-nations-championship-2026-friday-27th-november-finals-day), [Sat 28 Nov](https://help.englandrugby.com/support/solutions/articles/103000392931-nations-championship-2026-saturday-28th-november-finals-day), [Sun 29 Nov](https://help.englandrugby.com/support/solutions/articles/103000392936-nations-championship-2026-sunday-29th-november-finals-day).
- **England v New Zealand Sat 21 Nov, 14:10.**
- **Finals Weekend:**
  - **Fri 27 Nov 16:40 / 20:10** (the Friday date is now confirmed).
  - Sat 28 Nov 13:10 / 16:40.
  - Sun 29 Nov 13:10 / 16:40. The Sunday page also shows 17:20 (conflict).
- **England v France Sun 14 Feb 2027, 15:10 (TBC)** ([ticketing](https://help.englandrugby.com/support/solutions/articles/103000411510-guinness-men-s-six-nations-england-v-france-sunday-14th-february-2027), [stadium](https://allianzstadiumtwickenham.com/guinness-six-nations)).

**The O2** ([arena listing](https://www.theo2.co.uk/events/venue/the-o2-arena); summary of cached pages, flagged by the search as possibly stale)
- November: Jungle 24–25 Nov; **Fontaines D.C. 27 Nov** (17 Nov: 28 Nov); Jessie Ware 28 Nov; LOTR 29 Nov (11:30); **Kehlani 29 Nov** (17 Nov had 8 Dec, UNVERIFIED).
- December: Jingle Bell Ball 5–6 Dec; Pete Tong 11–12 Dec; RnB Winter Ball 13 Dec; McLaren LIVE 14 Dec; The Darkness 16 Dec; Greg Davies 17 Dec; **Kasabian 18 Dec** (back in today's summary); **Disney On Ice 24 Dec – 3 Jan**.
- January: Anirudh 15 Jan; aespa 16 Jan; Five Finger Death Punch 23 Jan.
- Not in today's summary (UNVERIFIED): The Script 21 Nov, Don Toliver 23 Nov, Squeeze, UB40, Mo Gilligan, Mariah Carey, Monster Trucks dates.

**ExCeL** ([what's on](https://www.excel.london/whats-on), [Horse Show](https://www.excel.london/whats-on/london-international-horse-show), [elementalLONDON](https://www.excel.london/whats-on/elementallondon-2026), [MegaCon](https://www.excel.london/visitor/whats-on/megacon-live))
- November: EV Show / B2B Marketing Live 17–20 Nov; **elementalLONDON + London Build 25–26 Nov** (17 Nov: HOMES UK / London Build 24–27, conflict); Dragonmeet 28 Nov.
- December: FinTech Connect 1–2 Dec; Perfume Exhibition 10–13 Dec; **Horse Show 17–21 Dec**; Scrooge Cirque 23–28 Dec.
- January–February: MegaCon 23–24 Jan; Genomics 27–28 Jan; **Cisco Live 8–12 Feb**.

**NYE fireworks** ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026))
- Thu 31 Dec, ticketed; £20 / £35 for Londoners, £40 / £55 for everyone else.
- **Final release Fri 20 Nov 12:00**.

**Attendance figures:** none stated in a source page read today.

How to read the table:
- **Effect** = market Occ Δ (compression at +5 or more, soft at −2 or less).
- **Properties** from VENUES in `build/properties.py`:
  - P20 is not in VENUES; it is grouped with P01 for O2/ExCeL.
  - VENUES properties that are blocked, handed back or have no PriceLabs listing are named only: O2 P01/P09/P07; ExCeL P01/P07/P15; Ally Pally P08; Twickenham P10/P16/P18.
- **Ours vs fortnight** = `prices.csv` 18 Nov vs the rebuilt fortnight mean (`out18.txt`).

| Nights | Event (source above) | Venue | Open properties | Effect (Occ Δ) | Ours £ vs fortnight £ | Priced by PriceLabs? |
|---|---|---|---|---|---|---|
| 19 Nov | EV Show / B2B Mktg Live | ExCeL | P04 (min 2: policy conflict) | +3.1 normal | **159** vs 171.3 | no |
| 20–21 Nov | Eng v NZ (21) | Twickenham / Canary Wharf | P13 booked; P20 = delivery block (policy) | P20 −2.6 / −6.1 soft | P20 317 / 331 vs 257.6 | n/a (policy block) |
| 22–24 Nov | Jungle 24–25 | O2 | P20; P04 24 Nov (cannot be booked) | P20 −7.1 / −0.6 / −7.0; P04 −2.2 soft | P20 278 / 274 / 268 vs 258–259; P04 **135** vs 170.5 | P20 yes (above, soft market); P04 no |
| 25–26 Nov | elementalLONDON / London Build | ExCeL | P04 and P20 booked | – | – | – |
| 27 Nov | Finals Weekend Fri; Fontaines D.C. (O2) | Twickenham | P13 | **+12.1 compression** | 304 vs 242.7 | **yes** |
| 28–29 Nov | Finals Weekend | Twickenham | P13 booked | +13.2 / +4.2 | – | – |
| 5–6 Dec | Jingle Bell Ball | O2 | P20 5 Dec (cannot be booked); P04 6 Dec | +4.3 / −1.0 | P20 **265** vs 299.0; P04 **143** vs 152.4 | no |
| 8 Dec | (Kehlani: now 29 Nov, UNVERIFIED for 8 Dec) | O2 | P04 | +4.4 | **141** vs 146.7 | no |
| 11–13 Dec | Darts opens; Pete Tong / RnB Winter Ball | Ally Pally / O2 | P11 booked; P04 | P04 +3.9 / +6.2 / +5.3 | P04 151 / 153 / **143** vs 143.3 | 11–12 yes; 13 level |
| 14–17 Dec | Darts Round One; McLaren / Darkness / Greg Davies | Ally Pally / O2 | P11; P04; P20 | P11 −4.8 / −1.0 / −2.1 / +2.0 soft | P11 **229 / 227 / 233 / 258** vs 283.5 | no (fortnight lifted by booked 5–13 Dec and 19–22 Dec) |
| 16–19 Dec | Horse Show 17–21; Kasabian 18 | ExCeL / O2 | P04 16–19; P20 16–18 | P04 +1.6 / +2.3 / +4.1 / +5.4; P20 −4.7 / −3.8 / −3.3 | P04 143 / 146 / 159 / 164 vs 140.0; P20 **302** / 332 / **311** vs 317.9 | P04 yes; P20 mixed (already above the mixed P75) |
| 13–21 Dec | pre-Christmas, darts | London | P13 open | +9.2 … **+14.3** | £2,142 vs P50 £2,099 | partly (19–21 Dec £39 under P50) |
| 20 Dec – 1 Jan | Christmas / NYE / Disney On Ice 24 Dec – 3 Jan | central / O2 | **P04 (13 n open)** | +1.7 to **+17.9** | £177/n vs fortnight 141.3 (13–19 Dec, 2–8 Jan) | **yes vs the fortnight, but cut −£427 overnight** (§2) |
| 23–25 Dec | Darts (no-play days UNVERIFIED) | Ally Pally | P11 | −3.2 / −4.5 / −8.2 soft | 291 / **276 / 273** vs 288.0 | 23 yes; 24–25 no |
| 26 Dec | Disney On Ice | O2 | P20 (orphan, cannot be booked) | +1.3 | **272** vs 321.0 | no |
| 31 Dec | NYE fireworks | Embankment | P04 only open flat in the set (P05 31 Dec booked) | P04 +17.9 | P04 201 vs 141.3 | yes |
| 3 Jan | Darts final | Ally Pally | P11 | +0.8 | **170** vs 190.4 | no |
| 23–24 Jan | MegaCon | ExCeL | P20 | **+9.2 / +5.7** (occ 12.6 / 8.8%) | **252 / 249** vs 258.9 (final_price) | no (but above the mixed P50 208 / 202) |
| 8–12 Feb | Cisco Live | ExCeL | P20, P04 | P20 +1.7 to +4.2; P04 −3.7 to +2.4 (occ 2.5–6.5%) | P20 264 / 260 / 256 / 252 / 274 vs 264.0; P04 166 / 164 / 163 / 160 / 171 vs 164.1 | level (occ too low to read) |
| 14 Feb | Eng v France | Twickenham | P13 | −4.4 (occ 6.3%) | 193 vs 195.1 | level (too early) |

## 4. Missed compression: open nights on events priced at or below the fortnight
Rebuilt method (§ Sources), 17 Nov event set, nights to 17 Jan. Today's prices; 17 Nov values in brackets.

| Ref | Night(s) | Event | Ours 18 Nov (17 Nov) | Fortnight £ (17 Nov) | Gap £ (17 Nov) |
|---|---|---|---|---|---|
| P04 | 19 Nov | ExCeL (bookable only via the min-2 policy conflict) | 159 (170) | 171.3 (176) | 12.3 (6) |
| P04 | 24 Nov | Jungle (cannot be booked) | 135 (143) | 170.5 (176) | 35.5 (34) |
| P04 | 6 Dec | Jingle Bell Ball | 143 (144) | 152.4 (156) | 9.4 (12) |
| P04 | 8 Dec | Kehlani (UNVERIFIED for 8 Dec) | 141 (142) | 146.7 (149) | 5.7 (7) |
| P20 | 5 Dec | Jingle Bell Ball (cannot be booked) | 265 (277) | 299.0 (313) | 34.0 (36) |
| P20 | 16 Dec | Darkness / Horse Show | 302 (325) | 317.9 (338) | 15.9 (13) |
| P20 | 18 Dec | Kasabian / Horse Show (**joined**) | 311 (345) | 317.9 | 6.9 (–) |
| P20 | 26 Dec | Disney On Ice (cannot be booked) | 272 (271) | 321.0 (287) | 49.0 (16) |
| **P11** | **14–17 Dec** | Darts Round One | **229, 227, 233, 258** (227, 228, 236, 246) | **283.5** (282) | **54.5, 56.5, 50.5, 25.5** (55, 54, 46, 36) |
| P11 | 24, 25 Dec | Darts (**joined**) | 276, 273 | 288.0 | 12.0, 15.0 (–) |
| P11 | 3 Jan | Darts final | 170 (171) | 190.4 (191) | 20.4 (20) |
| | | **Total, same event set** | | | **15 nights / £403** (17 Nov **18 / £410**) |
| | | Of which bookable under current min-stay (excluding P04 24 Nov, P20 5 Dec, P20 26 Dec) | | | **12 / £285** (17 Nov 15 / £324) |
| | | Of which on events verified today (excluding P04 8 Dec) | | | 14 / £397 |

**Change vs yesterday: −3 nights / −£7.** Check: 403 − 410 = −7.
- **Left, 6 nights / −£75:**
  - P04 18 Nov (−9): the window rolled.
  - P20 24 Nov (−27): 239 → 268, now £9.9 over the fortnight.
  - P11 26 Nov (−15): the stay was cancelled and the price rose to 231 vs 227.6; the event is UNVERIFIED anyway.
  - P04 16 Dec (−2): 143 vs 140.0.
  - P20 17 Dec (0): 332 vs 323.2.
  - P11 23 Dec (−22): 291 vs 288.0.
- **Joined, 3 nights / +£34:** P20 18 Dec +6.9; P11 24 Dec +12.0; P11 25 Dec +15.0. All are fortnight-driven: the booked 19–22 Dec nights are priced above these.
- **Changed, 12 nights staying on the list / +£34:**
  - P04: 19 Nov +6.3; 24 Nov +1.5; 6 Dec −2.6; 8 Dec −1.3.
  - P20: 5 Dec −2.0; 16 Dec +2.9; **26 Dec +33.0** (fortnight 287 → 321, mostly the rebuilt method).
  - P11: 14 Dec −0.5; 15 Dec +2.5; 16 Dec +4.5; 17 Dec −10.5; 3 Jan +0.4.
- Sum: −75 + 34 + 34 = **−7**. Matches (rounded).
- **Beyond 17 Jan (final_price, not in the 17 Nov set):** P20 23–24 Jan 6.9 / 9.9; P20 8–11 Feb 0 / 4 / 8 / 12; P04 9–11 Feb 0.1 / 1.1 / 4.1; P13 14 Feb 2.1.
  - That is 10 nights / £48 at market occupancy of 2.5–12.6%: too early to call missed.
- **New event block tested:** P04 13 Dec (RnB Winter Ball) gap £0.3.

**Read with care:** the headline is mostly fortnight artefacts in soft markets:
- P11 Round One: Occ Δ −4.8 to +2.0.
- P11 24–25 Dec: Δ −4.5 / −8.2.
- P20 Dec: Δ −3 to −5.
- P20 26 Dec and 5 Dec cannot be booked.

The real items are in §2 and are not in the headline:
- **P04 Christmas −£427 overnight** in a market that is flat and above STLY.
- **P04 6–19 Dec −£106 overnight**, now £180 under the 1–3 BR P50.
- **P05 7–8 / 13–14 Dec** priced under the 4 BR median.
- **P13 19–21 Dec** at the median on Occ Δ +12 to +14.

Data gaps:
1. Market figures are PriceLabs Nearby Listings only: Airbnb-derived, `cleaning_fee` null, not comp sets, summary horizon unstated.
   - The daily percentiles mix bedroom counts. The "est. matched" figures are estimates built from a 30-day ratio.
   - No Market Dashboard or Competitor Listings pulled.
   - P09/P14 and P02/P03/P07/P08/P10/P15–P19 not pulled (blocked, handback, special setup or no PriceLabs listing).
2. P04 Christmas cut:
   - The occupancy-based factor actually applied per date is not exposed. The decomposition (−5% override × ~−15% OBA) is an estimate.
   - Why unc itself fell £640: NOT CHECKED.
   - The next step (−20% band from 20 Nov) is inferred from the customization table, not observed.
   - The min stay the market supports for Christmas: NOT CHECKED (only the monthly median LOS exists).
3. P05 unc vs price gap (7–8 Dec −£270, 13–14 Dec −£217): cause NOT CHECKED (P05 customizations not pulled).
4. Fortnight method rebuilt after the 17 Nov scripts were lost. It reproduces 17 Nov on P11 3 Jan and P11 14–17 Dec, but the 17 Nov exclusion rules around Christmas cannot be fully checked. Part of the −£7 change (notably P20 26 Dec +£33) is method, not price.
5. No logged edits 17–18 Nov. Overnight moves on P04 6–19 Dec −£106, P20 20–24 Nov +£119, P20 14–18 Dec −£103, P13 13–21 Dec +£85 and P05 +£50 / +£54 are algorithm moves; their exact causes are NOT CHECKED.
6. Events are domain-restricted search summaries, not page reads. www.pdc.tv, www.alexandrapalace.com and www.theo2.co.uk have to be allowed in the session's network settings.
   - Conflicts: darts Round One 13 vs 14 Dec, end 3 vs 4 Jan; Fontaines D.C. 27 vs 28 Nov; Kehlani 29 Nov vs 8 Dec; London Build 25–26 vs 24–27 Nov; Twickenham Sun 16:40 vs 17:20.
   - UNVERIFIED: darts no-play days, 180,000 tickets, The Script, Don Toliver, UB40, Mo Gilligan, Mariah Carey.
   - Winter Wonderland not re-checked (its VENUES flats are all blocked or have no PriceLabs listing).
7. Live Airbnb / Booking.com prices and the open state on channels (P04 Christmas, P20 20–22 Nov) NOT CHECKED here (channel section).
