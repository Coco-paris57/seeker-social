# Market & demand calendar: run D = 2026-11-16 (window 16 Nov 2026 – 14 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Kept out of findings: P02/P03/P06/P07 intentional blocks (P06 shown as numbers only), nights after handback (P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec), P14 (numbers only), P13 = one flat (3064856 + 3090701). Not re-raised: 15%/20% stay discounts, Booking.com booster, +10% Booking.com markup, P13 1 Dec +50%.
- **PriceLabs, strictly one call at a time, each reply saved before the next** (raw in `scratchpad/m16/`):
  - `get_user_logs` (listing, 15–16 Nov): **25 entries, all by Reyhan, 15 Nov 18:47:37–19:17:38Z** (date-specific overrides, not base/min/max). The pull note "no base/min/max/push changes" holds, but override edits did happen. Details in §2.
  - `get_listing_date_overrides` for P11 3064196, P13 3064856, P05 3166592 (current values below).
  - `get_neighbourhood_data` (detail, future prices + occupancy), 8 listings, all `all_operations_ok=true`, first try: P05 07:19:26Z, P11 07:19:44Z, P13 07:19:56Z, P20 07:20:06Z, P04 07:20:17Z, P12 07:20:29Z, P01 07:20:40Z, P06 07:20:59Z.
- **`market.csv`:** `data/snapshots/2026-11-16/market.csv` copied forward from 15 Nov (151 lines), 8 rows appended under `.market.csv.lock` → 159 lines. Script `scratchpad/m16/wmarket16.py`.
- **Prices:** `prices.csv` 16 Nov `pricelabs_price` (PriceLabs refreshed 15 Nov 18:50–19:20Z, after Reyhan's edits), with 15 Nov in brackets. Past 15 Jan: neighbourhood `final_price` pulled today. Booking state: Smoobu `reservations.csv` 16 Nov (confirmed).
- **Fortnight method and event set unchanged from 14–15 Nov** (7 nights each side, blocked nights and >2× median excluded): `scratchpad/m16/analyse16.py` → `out16.txt`. Re-running the 15 Nov script on 15 Nov data gives 17 / £540, which matches. Open-night tables: `scratchpad/m16/open16.py`.
- **Events re-checked 16 Nov 2026.** WebFetch to www.alexandrapalace.com and www.pdc.tv both failed with `ENOTFOUND` (these hosts have to be allowed in the session's network settings). Every event fact below is a **WebSearch summary restricted to the venue or organiser domain**, not a page read.

## 1. Submarket table
- P25 / P50 / P75 / P90 (n) = `market.csv` 16 Nov (PriceLabs Nearby Listings `summary_table`, bedroom-matched).
- Market occ 30/60 = `market.csv` `market_occ_30/60` (from `pl_kpis.csv` 16 Nov). Our occ = `pl_kpis.csv` `occupancy_next_30/60`.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | Our occ 30/60 | vs 15 Nov |
|---|---|---|---|---|---|---|
| Camden | P11 | 2 | 50 / 38% | 228 / **290 / 330** / 381 (171) | 57 / 48% (60/50) | mkt −1 pt; P50 −1 |
| Shepherd's Bush | P13 | 2 | 47 / 37% | 193 / **225 / 271** / 351 (117) | **83** / 53% (77/50) | new 10–13 Dec stay registered (on twin 3090701); 18–22 Dec reopened |
| St John's Wood (4 BR per policy) | P05 | 4 | 46 / 39% | 449 / **576 / 729** / 1,219 (92) | 67 / 63% (70/65) | P50 −8 |
| Barking | P04 | 2 | 24 / 19% | 140 / **175 / 215** / 260 (88) | **57 / 50%** (47/45) | **PriceLabs now shows 20–23 Nov booked**, so t-pl-sync for P04 20–24 Nov looks fixed |
| Canary Wharf | P20 | 2 | 39 / 30% | 216 / **255 / 321** / 426 (151) | 67 / 45% (67/45) | NYE stay 27 Dec–3 Jan registered (booked 27 Dec–2 Jan) |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 35 / 28% | 217 / **266 / 339** / 435 (146) | 100 / 100%* | ~unchanged |
| Mile End (handback 13 Dec) | P12 | 2 | 43 / 33% | 172 / **207 / 232** / 291 (118) | 70 / 85%* | ~unchanged |
| Marylebone (intentional block) | P06 | 2 | 51 / 40% | 321 / **411 / 523** / 670 (215) | 80 / 90%* | ~unchanged |
| Primrose Hill (numbers only) | P14 | 1 | 49 / 37% | no row | 0 / 0% | not pulled |

\* Inflated by handback or intentional blocks. `market.csv` has no row for Greenwich (P09 only a 31 Oct row), Bow, Little Venice, Fulham, Kings Langley, Ladbroke Grove, Bayswater, Woolwich, Hanger Lane or Islington.

## 2. Dates where our price should differ from PriceLabs
Market P50/P75 and occ vs STLY (points) from `m16/neigh_<id>.json`.

### Reyhan's 15 Nov edits (logs 18:47–19:17Z; current values from `get_listing_date_overrides`)
- **P04 18–19 Nov +10%, min stay 2** (19:17:38Z). **Conflicts with policy** (`price_changes` 24 Oct: P04 "never open for fewer than 3"). This is a conflict for Corentin to confirm, not a new proposal. Prices are now 166 / 168 (155 / 158). With min 2, the 2-night gap between the 17 Nov and 20–24 Nov stays can now be booked.
- **P11:**
  - 14–18 Dec: the −3% was removed (min stay only now; 16–18 Dec min 2).
  - 22 Nov–13 Dec: −5% re-applied (min 3).
  - 8 Dec: +50% with min 1 (price 200 → 308), which deals with the t-p11-8dec-orphan gap.
  - 18–19 Nov +10% (min 2); 3–4 Dec min 2.
- **P13 10–26 Dec:** the −5% was removed on both twins (min 3 only).
- **P05:**
  - Jan 4–31: −5% (prices +£23–26/night vs 15 Nov, so the old value was a deeper cut; old value NOT CHECKED).
  - **Feb 1–28: −5%, min 4** (19:14:20Z). This covers the Valentine's stay booked the same day.
  - 29 Nov–2 Dec: min 3 only.
- **P20 15–17 Nov −2%, min 2.** P12 17–20 Nov and 30 Nov–3 Dec, P06 15–23 Nov: min-stay or reset only (numbers only).

### Items
| Item | 16 Nov (15 Nov) | Market | Status |
|---|---|---|---|
| **P20 NYE week 27 Dec–2 Jan — SOLD** (Airbnb, 7 n, room **£1,803.78 = £257.68/n**, booked 15 Nov) | PriceLabs on these nights **£2,774** (£2,873 on 15 Nov); ÷7 = £396 (£410) | P50 **£1,780** (£254/n), P75 **£2,399** (£343/n). Occ vs STLY **+6.1 / +9.3 / +4.7 / +4.6 / +13.6 / +13.2 / +11.1** | Sold at **0.65× today's PriceLabs and 0.63× the 15 Nov PriceLabs**. That is level with market P50 (+£24) and **£595 under P75**, on the most compressed nights of the window. After the 15% weekly discount, 15 Nov PriceLabs gives £2,442; the sale is 0.739× that. The rest of the gap (Airbnb tier / hidden layer) goes to the channel section. PriceLabs itself priced the week well: £396 against a £254 fortnight. |
| **P13 10–12 Dec — SOLD** (Airbnb 10–13 Dec, £156.31/n, booked 15 Nov) | Registered on **twin 3090701** (Booked); 3064856 blocked. 15 Nov morning prices: 3090701 **194 / 209 / 210 = £613**, while 3064856 was 242 / 261 / 263 = £766 | P50 £712; occ **+9.8 / +10.5 / +16.2** | Sold **£244 under P50** on compressed nights. It sold through the twin, which was priced **20% under the parent** before the 19:12Z edits. £468.94 / £613 = **0.765** (matches the hidden 0.765 layer in the ctx). Since the edits the twin matches the parent on 8–15 Dec. For channel / PriceLabs auditor. |
| **P13 Christmas open nights** (13–26 Dec, 14 n; −5% removed, 18–22 Dec reopened) | 3064856 **£3,125** (£3,104); twin 3090701 £3,269 | P50 **£3,448** / P75 £4,377. Occ vs STLY +7.9 / +4.7 / −1.4 / +2.5 / +6.4 / +8.0 / +14.3 / +11.1 / +14.0 / +18.2 / +20.5 / +13.9 / +8.1 / +8.2 | **£323 under P50.** Removing the −5% lifted only 13–15 Dec (+£12 each). On 16–26 Dec, PriceLabs' own uncustomized price fell after the cancellation (for example 18 Dec 258 → 238, 23 Dec 254 → 234, raw `prices_3064856.json`), so these nights are flat. The cause of that fall (occupancy-based adjustment?) is NOT CHECKED. a-peak-check: +£323 to P50. |
| **P05 Valentine's 13–17 Feb — SOLD** (Airbnb, 4 n, £1,219.98 = £305/n, booked 15 Nov, 90 d out) | PriceLabs 13–16 Feb: **15 Nov 07:22Z £1,627** (424 / 391 / 404 / 408); today £1,686 (437 / 407 / 417 / 425) after the Feb −5% | P25 £1,214, **P50 £1,535**, P75 £2,060. Occ vs STLY +8.1 / +3.4 / +1.7 / +2.9 | Sold at **P25 (+£6), £315 under P50**, at 0.750× the PriceLabs price on the morning of booking. With the 12% early-bird applied: £1,627 × 0.88 = £1,432, so **£212 is unexplained (0.852×)**, for the channel section. The market shows no Valentine's premium: P50 on 13–16 Feb (377–389) is level with 8–12 Feb (376–400). PriceLabs priced above P50; the leak is downstream of PriceLabs. |
| **P11 14–17 Dec** (darts Round One; −3% removed) | 220 / 227 / 222 / 242 = **£911** (£866); 18 Dec 295 (283) | P50 £1,006; occ **−5.5 / −1.1 / −1.0 / +3.5** | Policy level (21 Oct: darts average above £300) would be £1,200, so the gap is **£289** (was £334). Still £95 under P50. Prices sit at about 0.92× uncustomized with no price override; cause NOT CHECKED. Market soft, so this remains the existing conflict **for Corentin to confirm**. |
| **P11 3 Jan** (darts final; −5% since Oct) | **173** (173), min 3 | P50 220 / P75 280; occ 18.5 vs 16.5 (**+2.0**) | £19 under the fortnight (192) and £47 under P50. Removing the −5% gives about 182. |
| **P11 8 Dec** | **308** (200), +50%, min 1 | P50 255 / P75 312; occ +6.1 | Now bookable as a single night and priced near P75. |
| **P05 7–8 Dec** (+3%, min 2) | **£922** (464 / 458) (£912) | P75 £1,133; occ +6.6 / +1.2 | +£211 to P75. |
| **P05 13–14 Dec** (+5%, min 2) | **£962** (487 / 475) (£971) | P75 £1,154; occ **+11.9 / +5.2** | +£192 to P75. |
| **P05 21 Dec** (+300%, min 1) | **£2,063** (£2,066) | P75 716 / P90 910; uncustomized 696; occ +2.1 | 2.3× P90. Conflict for Corentin: is this night meant to sell? (unchanged) |
| **P05 29 Dec** (+300%, min 1) | **£2,556** (£2,557) | P75 829 / P90 1,091; uncustomized 1,034; occ +4.8 | Same conflict. |
| **P04 14–19 Dec** (−5%, min 3) | 145 / 148 / 179 / 181 / 187 / 193 = **£1,033** (£1,077; 14 Dec 155 → 145, 15 Dec 176 → 148, no edit logged) | P50 £956 / P75 £1,254; occ +1.4 / +0.8 / +2.8 / +3.5 / +4.4 / +5.2 | +£221 to P75 (was +£195). |
| **P04 11–13 Dec** | 160 / 163 / 151 = £474 (£506) | P75 £634; occ **+3.8 / +6.3 / +5.5** | Algorithm cut a further £32 overnight with no edit. |
| **P04 24 Nov** | **143** (164), min 3 | P50 150; uncustomized 200; occ −2.5 | 1-night gap between the 20–24 and 25 Nov stays, so it cannot be booked under min 3. |
| **P20 20–24 Nov** | 297 / 302 / 257 / 244 / 230 = **£1,330** (£1,165, **+£165**); now equal to uncustomized (294 / 307 / 268 / 259 / 248), so the −5% is gone (policy: −5% to 19 Nov) | P50 £1,076 / P75 £1,410; occ +1.0 / −3.3 / −3.3 / +3.0 / −4.6 | Now £254 over P50 with the market soft. **t-p20-delivery is still open:** policy says the delivery block is 20–22 Nov, but PriceLabs shows 18–19 Nov blocked and 20–24 Nov open (min 3/3/2/2/2). If these nights are meant to sell, the risk now runs the other way (priced near P75 in a soft week). |
| **P20 5 Dec** | 286 (298), min 3 | P50 228 / P75 297; occ +0.6 | Still a 1-night gap; cannot be booked. |
| **P06 22–23 Nov** (numbers only) | 250 / 236 (271 / 239), min 2 | P25 292 / 291; occ −6.4 / −12.2 | No proposal (policy). |

## 3. Demand calendar, next 90 days
**Re-verified 16 Nov 2026** (WebSearch summaries restricted to official domains):
- **World Darts Championship, Alexandra Palace** ([alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq), [pdc.tv/calendar](https://www.pdc.tv/calendar/), [ticket prices](https://www.pdc.tv/news/2026/august/07/2026-27-paddy-power-world-darts-championship-ticket-prices-confirmed/)): **11 Dec 2026 – 3 Jan 2027**.
  - Round One from 14 Dec; Round Four 30 Dec; quarter-finals 1 Jan; semi-finals Sat 2 Jan; **final Sun 3 Jan 20:00 GMT**.
  - "Record 180,000 tickets" is stated in today's PDC/AP summary. One PDC page says it ends 4 Jan (conflict).
  - No-play days 24–26 Dec: UNVERIFIED.
- **The O2** ([arena listing](https://www.theo2.co.uk/events/venue/the-o2-arena)). Cached pages conflict with each other:
  - November: Jungle (late Nov); **Jessie Ware Sat 28 Nov** (new); Squeeze 21 Nov (15 Nov reading: 26 Nov, conflict); Fontaines D.C.
  - December: Jingle Bell Ball 5–6 Dec (a 7 Dec date also listed); Pete Tong 11–12 Dec; RnB Winter Ball 13 Dec; **McLaren Racing LIVE 14 Dec**, **The Darkness Wed 16 Dec**, **Greg Davies 17 Dec** (all new); Kasabian 18 Dec (inconsistent across pages).
  - **Disney On Ice 24 Dec – 3 Jan.**
  - January: Hot Wheels Monster Trucks 9–10 Jan or 15/16 Jan (conflict); Anirudh 15 Jan; aespa 16 Jan; Five Finger Death Punch 23 or 27 Jan (conflict).
- **ExCeL** ([what's on](https://www.excel.london/whats-on), [EV Show](https://www.excel.london/visitor/whats-on/london-ev-show), [Horse Show](https://www.excel.london/whats-on/london-international-horse-show)):
  - London EV Show 18–19 Nov; HOMES UK / London Build 24–26 Nov (15 Nov check, not restated today).
  - London International Horse Show 17–21 Dec; Scrooge Cirque 23–28 Dec.
  - MegaCon Live 23–24 Jan; Festival of Genomics 27–28 Jan; **Cisco Live 8–12 Feb 2027** (new, one summary only).
- **Twickenham** ([England v NZ](https://allianzstadiumtwickenham.com/england-v-new-zealand-nations-championship-pool-match), [Nations Championship](https://allianzstadiumtwickenham.com/nations-championship), [England Rugby preview](https://www.englandrugby.com/follow/news-and-media/england-v-new-zealand-preview-2026-nations-championship)):
  - **England v New Zealand Sat 21 Nov, KO 14:10** (one visitor guide says 14:50).
  - **Finals Weekend 27–29 Nov**, six matches, Grand Final Sun 29 Nov.
- **NYE fireworks** ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)): Thu 31 Dec 20:00 to Fri 1 Jan 00:30, ticketed £20–£55; second release Fri 20 Nov 12:00.
- **Valentine's Day:** Sun 14 Feb 2027 is a calendar date, not a venue event. No primary source states a demand effect; the market data shows none (§2).
- **Attendance figures:** only the darts "180,000 tickets" (capacity, not attendance).

How to read the table:
- **Effect** = market occ vs STLY from `m16` (compression at +5 or more, soft at −2 or less).
- **Open properties** from VENUES in `build/properties.py` (P20 grouped with P01 for O2/ExCeL; NYE: all open).
- **Ours vs fortnight** = `prices.csv` 16 Nov vs the fortnight mean (`out16.txt`).

| Nights | Event | Venue | Open properties | Effect | Ours £ vs fortnight £ | Priced by PriceLabs? |
|---|---|---|---|---|---|---|
| 18–19 Nov | EV Show + co-located | ExCeL | P04 (min 2 now, policy conflict); P20 blocked | +6.1 / +2.7 | **166 / 168** vs 178 | no |
| 20–21 Nov | Script / Squeeze; Eng v NZ | O2 / Twickenham | P20 (delivery?); P04, P13 booked | P20 +1.0 / −3.3 | P20 297 / 302 vs 248 | yes |
| 23 Nov | Don Toliver | O2 | P20 | +3.0 | **244** vs 257 | no |
| 24 Nov | Jungle / HOMES UK | O2 / ExCeL | P20; P04 (1-night gap) | −4.6 / −2.5 | P20 **230** vs 269; P04 **143** vs 174 | no |
| 26–27 Nov | Nia Archives, Blossoms | Ally Pally | P11 | soft | P11 **219** / 271 vs 234 | 26 no, 27 yes |
| 27 Nov | Finals Weekend | Twickenham | P13 (28–29 booked) | **compression +14.4** | 304 vs 241 | yes (+50% override) |
| 28 Nov | Jessie Ware | O2 | P20, P04 booked | – | – | – |
| 5–6 Dec | Jingle Bell Ball | O2 | P20 5 Dec (cannot be booked); P04 6 Dec | +0.6 / – | P20 **286** vs 316; P04 **152** vs 160 | no |
| 8 Dec | Kehlani | O2 | P04 | – | **150** vs 154 | no |
| 11–13 Dec | Darts opening / RnB Winter Ball | Ally Pally / O2 | P11 sold; P04 open | P04 +3.8 / +6.3 / +5.5 | P04 160 / 163 / 151 | P04 cut |
| 14–17 Dec | Darts Round One; McLaren / Darkness / Greg Davies | Ally Pally / O2 | P11; P04; P20 16–18 | P11 **soft** −5.5 / −1.1 / −1.0 / +3.5 | P11 **220 / 227 / 222 / 242** vs 278 | no (fortnight inflated by repriced booked nights) |
| 16–18 Dec | Horse Show / Kasabian | ExCeL / O2 | P04 16–19; P20 16–18 | P04 +2.8 / +3.5 / +4.4 | P04 179 / 181 / 187 vs 153; P20 **271 / 292 / 301** vs 334 | P04 yes; P20 no (fortnight inflated) |
| 10–26 Dec | pre-Christmas | London | P13 13–26 open | **compression** mostly +5 to +20 | £3,125 vs P50 £3,448 | **no** |
| 23 Dec | Darts | Ally Pally | P11 | soft | **282** vs 304 | no |
| 26 Dec – 2 Jan | Disney On Ice / NYE | O2 / central | P20 sold 27 Dec–2 Jan; P20 26 Dec open; P04 2 Jan | **compression +4.6 to +13.6** | P20 NYE week £396/n vs £254 | **yes, but sold at £257.68/n** |
| 3 Jan | Darts final | Ally Pally | P11 | +2.0 | **173** vs 192 | no |
| 23–24 Jan | MegaCon | ExCeL | P20 | **+10.0 / +6.5** | 252 / 250 (P50 208 / 207) | above P50 |
| 8–12 Feb | Cisco Live | ExCeL | P20, P04 | P20 +1.8 to +3.4 (low occ) | P20 266–279 vs P50 216–224 | above P50 |
| 13–16 Feb | Valentine's | – | P05 sold | +1.7 to +8.1 (occ 11–14%) | PriceLabs £422/n vs P50 £384/n | yes, sold at £305/n |

## 4. Missed compression: open nights on events priced at or below the fortnight
Same event set and method as 14–15 Nov (`m16/out16.txt`).

| Ref | Night(s) | Event | Ours 16 Nov (15 Nov) | Fortnight £ (15 Nov) | Gap £ (15 Nov) |
|---|---|---|---|---|---|
| P04 | 18, 19 Nov | ExCeL (bookable only via the min-2 policy conflict) | 166, 168 (155, 158) | 178 (164) | 12, 10 (9, 6) |
| P20 | 23 Nov | Don Toliver | 244 (214) | 257 (241) | 13 (27) |
| P20 | 24 Nov | Jungle / HOMES UK | 230 (244) | 269 (255) | 39 (11) |
| **P04** | **24 Nov** | Jungle / HOMES UK (**NEW; cannot be booked, 1-night gap, min 3**) | 143 (164) | 174 (160) | **31** (–) |
| P11 | 26 Nov | Nia Archives | 219 (226) | 234 (238) | 15 (12) |
| P20 | 5 Dec | Jingle Bell Ball (cannot be booked) | 286 (298) | 316 (334) | 30 (36) |
| P04 | 6 Dec | Jingle Bell Ball | 152 (163) | 160 (163) | 8 (0) |
| P04 | 8 Dec | Kehlani | 150 (160) | 154 (166) | 4 (6) |
| **P11** | **14–17 Dec** | Darts Round One | **220, 227, 222, 242** (210, 207, 215, 234) | **278** (272) | **58, 51, 56, 36** (62, 65, 57, 38) |
| P20 | 16, 17, 18 Dec | Horse Show / Kasabian | 271, 292, 301 (same) | 334 (345) | 63, 42, 33 (74, 53, 44) |
| P11 | 23 Dec | Darts | 282 (279) | 304 (299) | 22 (20) |
| P11 | 3 Jan | Darts final | 173 (173) | 192 (193) | 19 (20) |
| | | **Total, same method** | | | **18 nights / £542** (15 Nov **17 / £540**) |
| | | Of which bookable under current min-stay (excluding P04 24 Nov and P20 5 Dec) | | | 16 / £481 (14 / £489 on 15 Nov) |

**Change vs yesterday: +1 night / +£2.** Check: 542 − 540 = 2.
- **Added: P04 24 Nov, +1 night / +£31.** The algorithm cut 164 → 143 with no edit logged, on a night that cannot be booked.
- **P04 (+£28 on other nights):**
  - 18–19 Nov +£7: Reyhan's +10% raised the price, but the fortnight rose more once 20–23 Nov were registered as booked.
  - 6 Dec +£8, 8 Dec −£2: algorithm cuts with no edit.
- **P20 −£15 net:** 24 Nov +£28 (230 vs 244 overnight; fortnight up). 23 Nov −£14 (244 vs 214, back to uncustomized now that the −5% has ended). 5 Dec −£6. 16–18 Dec −£33, a fortnight artefact (booked 9–13 Dec nights repriced down).
- **P11 −£21 net:** 14–17 Dec −£21 (−3% removed, +£45 on price, while the fortnight rose +£6). 26 Nov +£3, 23 Dec +£2, 3 Jan −£1.
- Sum of changes: +31 +7 +8 −2 +28 −14 −6 −33 −21 +3 +2 −1 = +2. Matches.

**Supplementary, not in the headline:**
- **Sold under compression on 15 Nov:**
  - P20 NYE week: £595 under P75, level with P50.
  - P13 10–12 Dec: £244 under P50.
  - P05 Valentine's: £315 under P50, at P25.
- **Open nights where the market supports a raise:**
  - P13 13–26 Dec: +£323 to P50.
  - P04 14–19 Dec: +£221 to P75. P04 11–13 Dec: +£160 to P75 (market +3.8 to +6.3).
  - P05 7–8 / 13–14 Dec: +£211 / +£192 to P75.
  - P11 3 Jan: +£19 to the fortnight.
- Darts 14–17 Dec (−£289 vs policy): policy conflict for Corentin; the market is soft.

Data gaps:
1. Market figures are PriceLabs Nearby Listings: Airbnb-derived, `cleaning_fee` null, not comp sets, horizon unstated. P05 4 BR bands may still include 3 BR (best_category 3 BR). P09/P14 and P02/P03/P07/P08/P10/P15–P19 were not pulled; no Market Dashboard or Competitor Listings.
2. Reyhan's 15 Nov overrides:
   - Only current values are known. The previous values for P05 Jan/Feb and the P20 20–24 Nov override are NOT CHECKED (the 15 Nov PriceLabs price for 13–16 Feb is known from `m15/neigh_3166592.json`).
   - P04 and P20 overrides were not re-pulled (logs used).
   - NOT CHECKED: why P11 14–17 Dec sit at about 0.92× uncustomized with no price override; why P13 16–26 Dec uncustomized fell about 8% after the cancellation; why P04 24 Nov / 11–15 Dec fell with no edit.
3. Timing of the 15 Nov bookings against the 18:47–19:20Z edits and refresh: `booked_on` is a date only. Which price each stay saw at booking is NOT CHECKED (the P13 0.765 match uses the 06:55Z twin price).
4. The fortnight includes booked nights that PriceLabs reprices (P11, P20 Dec). Read the headline with the P50 / STLY test.
5. Live Airbnb / Booking.com prices NOT CHECKED in this section (no OTA or Smoobu call).
6. Events are domain-restricted search summaries; www.alexandrapalace.com and www.pdc.tv have to be allowed in the session's network settings.
   - Open conflicts: darts end 3 vs 4 Jan; Squeeze 21 vs 26 Nov; Kasabian 18 Dec inconsistent; Jingle Bell Ball 7 Dec; Monster Trucks and Five Finger Death Punch dates; Twickenham 14:10 vs 14:50.
   - Cisco Live 8–12 Feb comes from one summary.
   - UNVERIFIED: darts no-play days, school holidays.
