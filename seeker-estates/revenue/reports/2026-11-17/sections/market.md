# Market & demand calendar: run D = 2026-11-17 (window 17 Nov 2026 – 15 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Kept out of findings: P02/P03/P06/P07 intentional blocks (P06 numbers only), nights after handback (P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec), P14 (numbers only), P13 = one flat (3064856 + 3090701). Not re-raised: 15%/20% stay discounts, Booking.com booster, +10% Booking.com markup, P13 1 Dec +50%, P04 2 Dec, P11 darts +5% (24 Oct).
- **PriceLabs, strictly one call at a time, each reply saved before the next** (raw in `scratchpad/m17/`):
  - `get_user_logs` (listing, 16–17 Nov): **0 entries**. Nothing has been edited since Reyhan's 15 Nov changes, so every overnight price move below comes from the algorithm or a refresh.
  - `get_neighbourhood_data` (detail, future prices + occupancy), 8 listings, all `all_operations_ok=true`, first try: P04 07:18:52Z, P13 07:19:12Z, P11 07:19:29Z, P05 07:19:44Z, P20 07:20:00Z, P12 07:20:15Z, P01 07:20:27Z, P06 07:20:58Z. Other agents were writing neighbourhood replies at the same time. The P01 file was first mis-picked (it was a Barking reply) and then re-copied by exact filename. Every saved file was checked: its listing_id matches and it holds 540 days.
  - `get_listing_date_overrides` P04 3562176, 17 Nov – 10 Jan.
- **`market.csv`:** `data/snapshots/2026-11-17/market.csv` was copied forward from 16 Nov (159 lines). 8 rows were appended under `.market.csv.lock`, giving 167 lines (script `scratchpad/m17/wmarket17.py`).
- **Prices:** `prices.csv` 17 Nov `pricelabs_price` (PriceLabs refreshed 16 Nov ~09:40Z). The 16 Nov file is shown in brackets. After 15 Jan: neighbourhood `final_price` pulled today. Booking state = Smoobu `reservations.csv` 17 Nov (confirmed only), so P04 20 Dec – 1 Jan counts as **open**.
- **Fortnight method and event set unchanged** (7 nights each side, blocked nights and anything over 2× the median excluded). Script `scratchpad/m17/analyse17.py`, output `out17.txt`. Re-running the 16 Nov script on 16 Nov data gives **18 / £542**, which matches.
- **Correction to earlier sections:** the *daily* P25–P90 series are **not** bedroom-matched. PriceLabs mixes bedroom counts (`compset_settings.br_range_selected`):
  - 1–3 BR for P04, P11, P20, P01 and P06.
  - 2–3 BR for P13 and P12.
  - 3–5 BR for P05.
  - Only the `summary_table` (submarket table) is bedroom-matched.
  - The 1 BR share pulls the daily P50 down for 2 BR flats (Barking: 1 BR P50 £120 vs 2 BR £175). The 3 BR share pulls it down for P05 (3 BR P50 £370 vs 4 BR £575).

## 1. Submarket table
- P25 / P50 / P75 / P90 (n) = `market.csv` 17 Nov (PriceLabs Nearby Listings `summary_table`, bedroom-matched).
- Market occ 30/60 = `market.csv` `market_occ_30/60` (from `pl_kpis.csv` 17 Nov).
- Our occ = `pl_kpis.csv` `occupancy_next_30/60`.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | Our occ 30/60 (16 Nov) | vs 16 Nov |
|---|---|---|---|---|---|---|
| Camden | P11 | 2 | 50 / 38% | 230 / **291 / 332** / 384 (171) | 53 / 47% (57/48) | P50 +1 |
| Shepherd's Bush | P13 | 2 | 47 / 37% | 192 / **223 / 273** / 348 (116) | 80 / 52% (83/53) | P50 −2. New 22–27 Dec stay is **not yet in PriceLabs** (neither twin shows it booked) |
| St John's Wood (4 BR per policy) | P05 | 4 | 46 / 39% | 455 / **575 / 731** / 1,222 (92) | 67 / 62% (67/63) | ~unchanged |
| Barking | P04 | 2 | 24 / 19% | 139 / **175 / 215** / 260 (89) | 53 / **48%** (57/50) | **PriceLabs 60-day figure still counts the cancelled 13 nights. Smoobu truth: 30 d 15/30 = 50%, 60 d 15/60 = 25%, 90 d 16.7%** |
| Canary Wharf | P20 | 2 | 39 / 30% | 217 / **256 / 323** / 427 (149) | 67 / **57%** (67/45) | NYE stay 27 Dec – 3 Jan now registered in PriceLabs (+12 pts at 60 days) |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 34 / 28% | 218 / **267 / 341** / 437 (144) | 100 / 100%* | ~unchanged |
| Mile End (handback 13 Dec) | P12 | 2 | 43 / 33% | 172 / **207 / 233** / 291 (118) | 70 / 85%* | unchanged |
| Marylebone (intentional block) | P06 | 2 | 51 / 40% | 321 / **414 / 525** / 665 (215) | 83 / 92%* | numbers only |
| Primrose Hill (numbers only) | P14 | 1 | 48 / 37% (pl_kpis) | no row | 0 / 0% | not pulled |

\* Inflated by handback or intentional blocks. `market.csv` has no row for Greenwich (P09 only a 31 Oct row), Bow, Little Venice, Fulham, Kings Langley, Ladbroke Grove, Bayswater, Woolwich, Hanger Lane or Islington.

## 2. Dates where our price should differ from PriceLabs
In this section:
- Market = daily NL series from `m17/neigh_<id>.json` (br_range caveat above).
- "Occ Δ" = market occupancy minus STLY, in points.
- "unc" = `uncustomized_price` from raw `prices_<id>.json` 17 Nov.

### P04 Barking 20 Dec – 1 Jan: reopened by the Booking.com cancellation (13 nights)
- **Smoobu:** 20 Dec – 2 Jan Booking.com stay is `cancelled` (17 Nov file; it was confirmed on 16 Nov). Room was £2,417.34 = £185.95/n.
- **PriceLabs still treats the stay as booked.** All 13 nights show `available=False`, `Booked`, `booked_adr 185.92`, and `minstay_data` still lists them.
  - The prices on these nights were computed with the stay booked. The next refresh may reprice them; the direction is NOT CHECKED.
  - Whether the nights are open in Smoobu and on Booking.com, and on Barking Airbnb 1455, is NOT CHECKED here (channel section).
- **Overrides** (`get_listing_date_overrides`, all created 20 Oct 10:32Z):
  - 20–22 Dec −5% / min 3; 23–26 Dec −5% / min 4; **27 Dec −5% / min 7**; 28–31 Dec −5% / min 5.
  - 1 Jan −2% / min 4; 2–10 Jan −8% / min 3.
  - **The proposed a-p04-dec-1611 (+15% 6–15 Dec) is not applied:** 6–22 Dec still carry −5% (edited 11 Nov 17:16Z).

| 13 nights | PriceLabs now | unc | Market P25 / **P50 / P75** / P90 | Cancelled booking |
|---|---|---|---|---|
| £ total | **£2,733** (£210/n) (16 Nov £2,744) | £3,473 (£267/n) | £1,779 / **£2,246 / £2,880** / £3,819 | £2,417.34 (£186/n) |

- **Market occupancy and STLY:**
  - Market occ 19.3–41.0%; Occ Δ **+2.8 to +18.2** on every night.
  - The rise starts on 24 Dec (+8.0) and peaks on **31 Dec (41.0% vs 22.8%, +18.2)**, 30 Dec (+11.8) and 1 Jan (+12.2).
  - PriceLabs' own insight gives occupancy +19.8% on 27–31 Dec and market prices +10.4% on 26–31 Dec vs surrounding dates.
- **What the market supports (price):**
  - The current price runs at about P75 across the block: £2,733 vs P75 £2,880 (−£147), and 31 Dec 241 vs P75 228.
  - That is +£487 over the 1–3 BR P50, and the cancelled booking sat at 1.08× that P50.
  - Nothing in the market data supports cutting below the current level.
  - Uncustomized £3,473 sits between P75 and P90. The −5% overrides plus the booked-state pricing hold it down by £740.
  - On 28–31 Dec (occ 33–41%, Δ +6 to +18) uncustomized is 311–342 vs P90 298–317, so a move above P75 on those 4 nights would put us at P90. That is a decision for Corentin; the market does not prove it.
  - Absolute market occupancy is low (19–41%; Barking 60-day market occ 19%). The 1–3 BR mix understates the 2 BR P50.
- **What the market supports (min stay):**
  - NOT CHECKED. Nearby Listings data carries no length-of-stay figures (`minstay_data` is ours).
  - Facts only:
    - The current set lets 20–22 Dec sell as a 3-night stay and 23–26 Dec as a 4-night Christmas stay.
    - 28 Dec – 2 Jan sells only as 5+ nights.
    - A 27 Dec arrival must stay 7 nights.
    - Policy floor: never under 3 nights.
- **Effect:** P04 forward occupancy at 60 days falls from 48% in PriceLabs to **25% on Smoobu**. Pickup: −£2,417.34 room on the books. Who cancelled and why: NOT CHECKED (Smoobu row has no reason field).
- **Barking is now open as one 27-night run, 6 Dec – 1 Jan, except 2 Dec** (6–19 Dec was already open). It continues 2–5 Jan.

### P13 Shepherd's Bush 22–27 Dec: SOLD on Booking.com (5 n, room £840.75 = £168.15/n, booked 16 Nov)

| 22–26 Dec | £ | Sale ÷ |
|---|---|---|
| Sale (room) | **840.75** | – |
| PriceLabs 3064856 (16 = 17 Nov) | 1,102 (216/225/219/220/222) | 0.763 |
| PriceLabs twin 3090701 | 1,167 (229/238/232/233/235) | 0.720 |
| Booking.com list = 3064856 × 1.10 | 1,212 | 0.694 |
| Market P25 / **P50** / P75 | 1,046 / **1,354** / 1,688 | 0.80 / **0.62** / 0.50 |

- **Market:** occ 44–47%; **Occ Δ +18.5 / +21.6 / +15.9 / +9.9 / +10.9**, the most compressed nights in the Shepherd's Bush series this window.
- **Sold £513 under P50 and £205 under P25** (2–3 BR series).
- **PriceLabs itself priced Christmas near P25:**
  - 216–225 vs P25 206–216 and P50 257–288. The gap starts in PriceLabs, not only downstream.
  - Uncustomized is only £1,134, so no override is holding it down (Reyhan removed the −5% on 15 Nov).
- **Which twin it sold through: NOT CHECKED.** PriceLabs (refreshed before the booking) still shows 22–26 Dec `available=True` on **both** twins. If Smoobu has not blocked the other twin and Airbnb, there is a double-booking risk; for the channel section.
- **Price ratio:** 0.694× the Booking.com list. One candidate stack is NR −10% × Mobile 10% × Genius 10% × occupancy −5% = 0.6926, which gives £839.5 against £840.75. **UNVERIFIED**; for the channel section. Black Friday 30% only becomes bookable on 19 Nov, so it does not apply.
- **Commission:** £148.61 = 17.7%. The booster covers check-ins only to 20 Dec, so this is the channel section's call (policy: ask before assuming).
- **P13 still open 13–21 Dec (9 n):** 3064856 **£2,057** (£2,023) vs P50 £2,095 / P75 £2,693.
  - Occ Δ +8.2 / +4.9 / −1.1 / +2.8 / +6.0 / +8.3 / **+14.7 / +12.2 / +14.4**.
  - 19–21 Dec are 230 / 212 / 214 vs P50 247 / 239 / 248, so **£78 under P50 on the three most compressed nights**.
  - 16 Dec moved 206 → 241 overnight with no edit logged.

### Other items
| Item | 17 Nov (16 Nov) | Market | Status |
|---|---|---|---|
| **P11 14–17 Dec** (darts Round One) | 227 / 228 / 236 / 246 = **£937** (£911); 18 Dec 303 (295) | P50 £1,014 / P75 £1,215; Occ Δ **−5.0 / −0.8 / −1.3 / +3.0** | Policy level (21 Oct: darts average above £300) would be £1,200, so the gap is **£263** (was £289). Still £77 under P50. No price override is in place (darts override removed 15 Nov; the 24 Oct "+5%, leave as is" no longer exists). **Conflict for Corentin to confirm**, not a new proposal. The market is soft. |
| **P11 23–25 Dec** (darts, min 2) | 286 / 263 / 272 | P50 296 / 303 / 323; Occ Δ −3.0 / −4.1 / **−8.2** | Under P50 by £101 over the three nights, but the market is softer than STLY. Hold. |
| **P11 3 Jan** (darts final) | **171** (173), min 3 | P50 220 / P75 279; occ 18.8%, Δ +1.5 | £20 under the fortnight (191), £49 under P50. The −8% override still applies; without it ≈ 186 (unc 193). |
| **P05 7–8 Dec** (+3%, min 2) | **£923** (463 / 460) (£922) | P75 £1,131 (3–5 BR); Occ Δ +6.5 / +0.8 | +£208 to P75. |
| **P05 13–14 Dec** (+5%, min 2) | **£962** (488 / 474) (£962) | P75 £1,155; Occ Δ **+12.4 / +5.8** | +£193 to P75. 13 Dec is P05's most compressed open night. |
| **P05 21 Dec** (+300%, min 1) | **£2,054** (£2,063) | P75 715 / P90 908; unc 680; Δ +2.3 | 2.3× P90. **Conflict for Corentin:** is this night meant to sell? (unchanged) |
| **P05 29 Dec** (+300%, min 1) | **£2,563** (£2,556) | P75 823 / P90 1,079; unc 1,020; Δ +4.3 | Same conflict; 2.4× P90. |
| **P04 6–19 Dec** (−5%, min 3, 14 n) | **£2,150** (**£2,263, −£113 overnight, no edit logged**; 16 Dec 179 → 143) | P50 £2,234 / P75 £2,892; Occ Δ −3.0 to +6.1 (positive on 8 Dec, 11–13 Dec and 17–19 Dec) | Now £84 under the 1–3 BR P50 and £742 under P75. **6–15 Dec (10 n): £1,443 vs P50 £1,588 / P75 £2,053.** a-p04-dec-1611 (+15% on 6–15 Dec) would make it £1,659 (+£216, still under P75). 17–19 Dec 182 / 188 / 194 are above P50 (159 / 164 / 167), at Δ +3.5 / +4.5 / +5.8. |
| **P20 20–24 Nov** | 300 / 299 / 254 / 257 / 239 = **£1,349** (£1,330); min 3 / 3 / 2 / 2 / 2, all `available=True` | P50 £1,074 / P75 £1,410; Occ Δ **−2.6 / −6.5 / −6.6 / +0.6 / −6.6** | **£275 over P50 in a soft week**, close to P75, 3 days out. Price = unc (301 / 312 / 273 / 282 / 268, no override). Policy says 20–22 Nov is the delivery block, but PriceLabs shows 18–19 Nov blocked and 20–24 Nov open (t-p20-delivery is still open). If these nights are meant to sell, the market supports P50–P75, and the 20–21 Nov nights sit at P75+. |
| **P20 14–18 Dec** (5-night gap, min 3) | 318 / 319 / 325 / 338 / 345 = **£1,645** (£1,481, **+£164 overnight, no edit**) | P50 £1,108 / P75 £1,432; Occ Δ **−6.5 / −5.6 / −4.0 / −2.2 / −2.2** | All P20 Dec nights rose about 13% once the NYE stay was registered (an occupancy-based effect? NOT CHECKED). The gap now sits **£213 over P75 in a soft market**. It drops out of the missed-compression list, but the risk is now overpricing. |
| **P20 26 Dec** | 271 (300), `available=False`, min 4 | P50 256 / P75 335; Δ +3.1 | 1-night orphan between 19–26 Dec and 27 Dec – 3 Jan; cannot be booked (t-p20-26dec-orphan). |
| **P04 24 Nov** | 143, `available=False`, min 3 | P50 150; unc 198; Δ −3.2 | 1-night gap; cannot be booked. |
| **P20 5 Dec** | 277 (286), `available=False`, min 3 | P50 228 / P75 298; Δ +2.2 | 1-night gap; cannot be booked (t-p20-5dec-orphan, day 8). |

## 3. Demand calendar, next 90 days
**Re-checked 17 Nov 2026.** `WebFetch` to www.pdc.tv failed with `ENOTFOUND` (www.pdc.tv and www.alexandrapalace.com have to be allowed in the session's network settings). Every event fact below is a **WebSearch summary restricted to the venue or organiser domain**, not a page read.
- **World Darts Championship, Alexandra Palace** ([alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq), [ballot news](https://www.pdc.tv/news/2026/september/08/general-ballot-now-open-for-2026-27-paddy-power-world-darts-championship-tickets/)):
  - **11 Dec 2026 – 3 Jan 2027.** FAQ: Round One from Mon 14 Dec 19:00; quarter-finals 1 Jan; semi-finals Sat 2 Jan 19:30; **final Sun 3 Jan 20:00 GMT**.
  - The ballot page says "to January 4" but names 3 Jan as the final day, so it looks like a typo. The FAQ also conflicts on whether play starts 11 or 14 Dec.
  - No-play days 24–26 Dec: UNVERIFIED.
  - Attendance figure not restated today.
- **The O2** ([arena listing](https://www.theo2.co.uk/events/venue/the-o2-arena)). Today's summary:
  - November: Jungle 24–25 Nov; Squeeze 27 Nov (**now the third date seen**: 21 / 26 / 27); Jessie Ware 28 Nov and Fontaines D.C. 28 Nov (same arena, same night: conflict); LOTR concert 29 Nov.
  - December: Jingle Bell Ball 5–6 Dec; UB40 5–7 Dec (conflict); Mo Gilligan 9 Dec; Pete Tong 11–12 Dec; RnB Winter Ball 13 Dec; McLaren LIVE 14 Dec; The Darkness 16 Dec; Greg Davies 17 Dec; **Disney On Ice 24 Dec – 3 Jan**.
  - January: Monster Trucks 9–10 Jan; Anirudh 15 Jan; aespa 16 Jan; Five Finger Death Punch 23 Jan; BLOK3 29 Jan; Jack Whitehall 30 Jan.
  - The Script (21 Nov), Don Toliver (23 Nov), Mariah Carey (30 Nov), Kehlani (8 Dec) and Kasabian (18 Dec) were **not in today's summary: UNVERIFIED today**. They are kept in the fortnight event set only so the method stays comparable with 16 Nov.
- **ExCeL** ([what's on](https://www.excel.london/whats-on), [Horse Show](https://www.excel.london/whats-on/london-international-horse-show), [MegaCon](https://www.excel.london/visitor/whats-on/megacon-live)):
  - November: EV Show / Vet Show / B2B Marketing Live 17–20 Nov; **HOMES UK / London Build / National Civils 24–27 Nov**.
  - December: London Perfume Exhibition 10–13 Dec; **Horse Show 17–21 Dec**; Scrooge Cirque 23–28 Dec.
  - January–February: MegaCon 23–24 Jan; Festival of Genomics 27–28 Jan; **Cisco Live 8–12 Feb**; Motor Show / Motorsport Expo 26–28 Feb (outside the window).
- **Twickenham** ([England Rugby preview](https://www.englandrugby.com/follow/news-and-media/england-v-new-zealand-preview-2026-nations-championship), [plan your visit](https://allianzstadiumtwickenham.com/plan-your-visit/england-v-new-zealand-nations-championship-pool-match/essential-information), [Nations Championship](https://allianzstadiumtwickenham.com/nations-championship)):
  - **England v New Zealand Sat 21 Nov, KO 14:10 GMT** (14:50 on one page).
  - **Finals Weekend:** Friday double-header plus double-headers on Sat 28 and Sun 29 Nov (13:10 / 16:40). The Friday date (27 Nov) is not clearly stated on the page.
- **Alexandra Palace other events** ([Nia Archives](https://www.alexandrapalace.com/whats-on/nia-archives/), [Blossoms](https://www.alexandrapalace.com/whats-on/blossoms/)):
  - Nia Archives 26 Nov (other listings give 27 Nov).
  - Blossoms 27 Nov (listing gives 28 Nov).
- **NYE fireworks** ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)):
  - Thu 31 Dec 20:00 to Fri 1 Jan 00:30, ticketed; £55 / £40 (£35 / £20 for London postcodes).
  - **Final release Fri 20 Nov 12:00** (Mayor's press release dated 13 Nov).
- **Attendance figures:** none stated in today's sources.

How to read the table:
- **Effect** = market Occ Δ from `m17` (compression at +5 or more, soft at −2 or less).
- **Open properties** from VENUES in `build/properties.py` (P20 grouped with P01 for O2/ExCeL; NYE: all open).
- **Ours vs fortnight** = `prices.csv` 17 Nov vs the fortnight mean (`out17.txt`).

| Nights | Event | Venue | Open properties | Effect (Occ Δ) | Ours £ vs fortnight £ | Priced by PriceLabs? |
|---|---|---|---|---|---|---|
| 18–19 Nov | EV / Vet Show | ExCeL | P04 (min 2, policy conflict); P20 blocked | +7.4 / +1.9 | **167 / 170** vs 176 | no |
| 20–21 Nov | Eng v NZ; (Script UNVERIFIED) | Twickenham / O2 | P20 (delivery?); P04, P13 booked | P20 −2.6 / −6.5 soft | P20 300 / 299 vs 248 | yes (over-priced for a soft market) |
| 23 Nov | (Don Toliver, UNVERIFIED) | O2 | P20 | +0.6 | 257 vs 256.7 | level |
| 24 Nov | Jungle / HOMES UK | O2 / ExCeL | P20; P04 (cannot be booked) | −6.6 / −3.2 soft | P20 **239** vs 266; P04 **143** vs 176 | no |
| 26–27 Nov | Nia Archives / Blossoms | Ally Pally | P11 | −3.3 / −3.6 soft | **217** / 267 vs 232 | 26 no, 27 yes |
| 27 Nov | Finals Weekend | Twickenham | P13 (28 Nov – 1 Dec booked) | **+11.6 compression** | 289 vs 234 | yes |
| 5–6 Dec | Jingle Bell Ball | O2 | P20 5 Dec (cannot be booked); P04 6 Dec | +2.2 / −1.9 | P20 **277** vs 313; P04 **144** vs 156 | no |
| 8 Dec | (Kehlani UNVERIFIED) / Mo Gilligan 9 Dec | O2 | P04 | +4.3 | **142** vs 149 | no |
| 11–13 Dec | Darts opening; Pete Tong / RnB Winter Ball | Ally Pally / O2 | P11 sold; P04 open | P04 +3.7 / +6.1 / +5.3 | P04 152 / 154 / 144 (P50 167 / 170 / 156) | no (under P50) |
| 14–17 Dec | Darts Round One; McLaren / Darkness / Greg Davies | Ally Pally / O2 | P11; P04; P20 14–18 | P11 **soft** −5.0 / −0.8 / −1.3 / +3.0; P20 −6.5 to −2.2 | P11 **227 / 228 / 236 / 246** vs 282 | no (fortnight inflated by repriced booked nights) |
| 16–20 Dec | Horse Show 17–21 | ExCeL | P04 16–19 (+20 Dec reopened); P20 16–18 | P04 +2.7 / +3.5 / +4.5 / +5.8 | P04 **143** / 182 / 188 / 194 vs 145; P20 **325 / 338** / 345 vs 338 | P04 17–19 yes; P20 already above P75 |
| 13–21 Dec | pre-Christmas | London | P13 open | +8.2 … **+14.7** | £2,057 vs P50 £2,095 | **no** (19–21 Dec £78 under P50) |
| 20 Dec – 1 Jan | Christmas / NYE / Disney On Ice 24 Dec – 3 Jan | central / O2 | **P04 reopened (13 n)** | **+2.8 to +18.2** | £210/n vs fortnight 176–181; P75 £222/n | **yes** (31 Dec 241 vs 181) |
| 22–26 Dec | Christmas | London | P13 sold £168/n | **+9.9 to +21.6** | PriceLabs £220/n vs P50 £271/n | **no, and sold at £168** |
| 23–25 Dec | Darts | Ally Pally | P11 | soft −3.0 / −4.1 / −8.2 | 286 / 263 / 272 (23 Dec vs 308) | no |
| 26 Dec | Disney On Ice | O2 | P20 (orphan, cannot be booked) | +3.1 | **271** vs 287 | no |
| 3 Jan | Darts final | Ally Pally | P11 | +1.5 | **171** vs 191 | no |
| 23–24 Jan | MegaCon | ExCeL | P20 | **+9.9 / +6.5** (occ 12.4 / 8.6%) | 252 / 249 vs P50 208 / 206 | above P50 |
| 8–12 Feb | Cisco Live | ExCeL | P20, P04 | P20 +1.3 to +3.9; P04 −3.7 to +2.5 (occ 3–6%) | P20 253–279 vs P50 215–225; P04 161–172 vs P50 154–161 | above P50 |

## 4. Missed compression: open nights on events priced at or below the fortnight
Same event set and method as 14–16 Nov (`m17/out17.txt`).

| Ref | Night(s) | Event | Ours 17 Nov (16 Nov) | Fortnight £ (16 Nov) | Gap £ (16 Nov) |
|---|---|---|---|---|---|
| P04 | 18, 19 Nov | ExCeL (bookable only via the min-2 policy conflict) | 167, 170 (166, 168) | 176 (178) | 9, 6 (12, 10) |
| P04 | 24 Nov | Jungle / HOMES UK (cannot be booked) | 143 (143) | 176 (174) | 34 (31) |
| P20 | 24 Nov | Jungle / HOMES UK | 239 (230) | 266 (269) | 27 (39) |
| P11 | 26 Nov | Nia Archives | 217 (219) | 232 (234) | 15 (15) |
| P20 | 5 Dec | Jingle Bell Ball (cannot be booked) | 277 (286) | 313 (316) | 36 (30) |
| P04 | 6 Dec | Jingle Bell Ball | 144 (152) | 156 (160) | 12 (8) |
| P04 | 8 Dec | Kehlani (UNVERIFIED today) | 142 (150) | 149 (154) | 7 (4) |
| **P11** | **14–17 Dec** | Darts Round One | **227, 228, 236, 246** (220, 227, 222, 242) | **282** (278) | **55, 54, 46, 36** (58, 51, 56, 36) |
| P04 | 16 Dec | Horse Show (**NEW**) | 143 (179) | 145 (153) | 2 (–) |
| P20 | 16, 17 Dec | Horse Show | 325, 338 (271, 292) | 338 (334) | 13, 0 (63, 42) |
| P11 | 23 Dec | Darts | 286 (282) | 308 (304) | 22 (22) |
| P20 | 26 Dec | Disney On Ice (**NEW**; cannot be booked) | 271 (300) | 287 (254) | 16 (–) |
| P11 | 3 Jan | Darts final | 171 (173) | 191 (192) | 20 (19) |
| | | **Total, same method** | | | **18 nights / £410** (16 Nov **18 / £542**) |
| | | Of which bookable under current min-stay (excluding P04 24 Nov, P20 5 Dec, P20 26 Dec) | | | **15 / £324** (16 Nov 16 / £481) |

**Change vs yesterday: 0 nights / −£132.** Check: 410 − 542 = −132.

Nights that left or joined the list:
- **Left, −2 nights:**
  - P20 23 Nov (−£13): price 244 → 257, now £0.3 over a fortnight of 256.7.
  - P20 18 Dec (−£33): price 301 → 345.
- **Joined, +2 nights:**
  - P04 16 Dec (+£2): the algorithm cut 179 → 143.
  - P20 26 Dec (+£16): fortnight up 254 → 287 once the NYE week was repriced as booked. It cannot be booked.

Changes by flat:
- **P20 −£128:** 24 Nov −12; 5 Dec +6; 16 Dec −50; 17 Dec −42; 18 Dec −33 (left); 23 Nov −13 (left); 26 Dec +16 (new).
  - The 16–18 Dec moves come from Dec prices rising about 13% after the NYE booking registered; no edit logged.
- **P04 +£5:** 18 Nov −3; 19 Nov −4; 24 Nov +3; 6 Dec +4; 8 Dec +3; 16 Dec +2 (new). All are algorithm moves; no edits logged.
- **P11 −£9:** 14–17 Dec −10 (prices +£26, fortnight +£4); 3 Jan +1; 26 Nov and 23 Dec unchanged.

Sum: −128 + 5 − 9 = **−132**. Matches.

**Read with care:** most of the £132 improvement is P20 Dec nights rising **above P75 in a soft market** (Occ Δ −2 to −6.5). That is a fortnight artefact, not a gain. The real compression items are elsewhere and are not in the headline:
- **P13 Christmas:** sold 22–26 Dec £513 under P50 (Occ Δ +10 to +22). 19–21 Dec open, £78 under P50.
- **P04 20 Dec – 1 Jan:** reopened, priced near P75; uncustomized would be near P90 on 28–31 Dec.
- **P04 6–15 Dec:** £145 under the 1–3 BR P50.
- **P05 7–8 / 13–14 Dec:** +£208 / +£193 to P75.

Data gaps:
1. Market figures are PriceLabs Nearby Listings: Airbnb-derived, `cleaning_fee` null, not comp sets, horizon unstated.
   - **Daily percentile series mix bedroom counts** (1–3 BR for P04/P11/P20/P01/P06; 2–3 BR for P13/P12; 3–5 BR for P05). Daily P50/P75 for 2 BR and 4 BR flats are understated vs the bedroom-matched summary. Earlier sections did not state this.
   - No Market Dashboard or Competitor Listings. P09/P14 and P02/P03/P07/P08/P10/P15–P19 not pulled.
2. P04 20 Dec – 1 Jan: PriceLabs still shows the cancelled stay as booked.
   - NOT CHECKED: whether Smoobu, Booking.com and Barking Airbnb 1455 show the nights open, and how PriceLabs reprices them after the next refresh.
   - Market length-of-stay data does not exist in this source, so the min stay the market supports is NOT CHECKED.
3. P13 22–27 Dec: which twin took the stay is NOT CHECKED (neither twin shows it in PriceLabs). The promotion decomposition (0.6926) is UNVERIFIED. Black Friday is not yet bookable.
4. No logged edits 16–17 Nov. Causes NOT CHECKED for:
   - P20 Dec +13% (occupancy-based?);
   - P04 6–16 Dec −£8/night and 16 Dec −£36;
   - P13 3064856 16 Dec +£35.
5. The fortnight includes booked nights that PriceLabs reprices (P11, P20 Dec, P20 26 Dec). Read the headline with the P50 / STLY test.
6. Live Airbnb / Booking.com prices NOT CHECKED in this section.
7. Events are domain-restricted search summaries; www.pdc.tv and www.alexandrapalace.com have to be allowed in the session's network settings.
   - Not confirmed today: The Script 21 Nov, Don Toliver 23 Nov, Mariah Carey 30 Nov, Kehlani 8 Dec, Kasabian 18 Dec.
   - Conflicts: Squeeze 21 / 26 / 27 Nov; Jessie Ware vs Fontaines D.C. 28 Nov; UB40 5–7 Dec; darts start 11 vs 14 Dec and end 3 vs 4 Jan; Nia Archives 26 / 27 Nov; Blossoms 27 / 28 Nov; Twickenham 14:10 vs 14:50; Finals Friday date.
   - UNVERIFIED: darts no-play days, school holidays.
