# Market & demand calendar: run D = 2026-11-15 (window 15 Nov 2026 – 12 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Kept out of every finding: P02/P03/P06/P07 intentional blocks (P06 22–23 Nov is reported as numbers only), nights after handback (P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec), P14 (numbers only), and P13 counted as one flat. Not raised again: 15%/20% stay discounts, Booking.com booster, +10% Booking.com markup, P04 min 3 and 2 Dec, P12 17 Nov, P13 1 Dec +50%, P11 darts +5% (24 Oct).
- **PriceLabs calls, strictly one at a time, each reply saved before the next call** (raw files in `scratchpad/m15/`):
  - `get_user_logs` (listing, 14–15 Nov): **0 entries**. No one has edited PriceLabs since 11 Nov, so every price move below comes from the algorithm.
  - `get_neighbourhood_data` (detail, future prices + occupancy) for 8 listings. Reply times: P13 3064856 07:21:25Z, P11 3064196 07:21:46Z, P05 3166592 07:22:02Z, P04 3562176 07:22:14Z, P20 3547481 07:23:10Z, P12 2699998 07:23:21Z, P01 3320302 07:23:31Z, P06 3288517 07:23:49Z. All show `all_operations_ok=true`.
    - **P13: the live retry worked on the first try**, so the 500 error in `raw/neighbourhood_P13.json` is replaced.
    - **P20: the first call returned `{"success":false,"error":""}`.** It worked on the second try (logged in `scratchpad/m15/errors.txt`).
- **`market.csv`:** `data/snapshots/2026-11-15/market.csv` was copied forward from 14 Nov (143 lines) and 8 rows were added under `.market.csv.lock`, giving 151 lines. Script: `scratchpad/m15/wmarket15.py`.
- **Prices:** `prices.csv` 15 Nov (`pricelabs_price`), with 14 Nov in brackets. Booking state comes from Smoobu `reservations.csv` 15 Nov (confirmed stays only).
- **Fortnight method and event set are the same as 14 Nov**: 7 nights each side, excluding blocked nights and nights above 2× the median. Script `scratchpad/m15/analyse15.py` writes `out15.txt`. Re-running the 14 Nov script on 14 Nov data gives 19 / £419, which matches. The open-night tables come from `scratchpad/m15/open15.py`.
- **Events re-checked 15 Nov 2026.** WebFetch on www.alexandrapalace.com failed again with `ENOTFOUND`, so every event fact below is a WebSearch summary restricted to the venue or organiser domain. None is a full page read.

## 1. Submarket table
- P25/P50/P75/P90 (n) come from `market.csv` 15 Nov: PriceLabs Nearby Listings `summary_table`, bedroom-matched.
- Market occ 30/60 is `market_occ_30/60` in `market.csv`, taken from `pl_kpis.csv` 15 Nov `market_occupancy_next_30/60`.
- Our occ is `pl_kpis.csv` `occupancy_next_30/60`.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | Our occ 30/60 (PriceLabs) | vs 14 Nov |
|---|---|---|---|---|---|---|
| Camden | P11 | 2 | 51 / 39% | 228 / **291 / 330** / 382 (171) | **60 / 50%** (was 33/37) | PriceLabs now shows the 28 Nov–2 Dec and 9–14 Dec stays as booked: **t-pl-sync-1411 looks fixed for P11** |
| Shepherd's Bush | P13 | 2 | 46 / 38% | 193 / **224 / 268** / 345 (116) | 77 / 50% | live retry OK; P50 −1 |
| St John's Wood (4 BR per policy) | P05 | 4 | 46 / 40% | 452 / **584 / 729** / 1,219 (91) | 70 / 65% | ~unchanged |
| Barking | P04 | 2 | 24 / 20% | 141 / **178 / 216** / 264 (90) | 47 / 45% | **PriceLabs has not registered the new Airbnb stay 20–24 Nov** (20–23 Nov `available=True`, no booking status) |
| Canary Wharf | P20 | 2 | 40 / 31% | 216 / **258 / 326** / 426 (151) | 67 / 45% | P50 +3 |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 36 / 29% | 216 / **266 / 338** / 434 (148) | 100 / 100%* | ~unchanged |
| Mile End (handback 13 Dec) | P12 | 2 | 44 / 34% | 172 / **207 / 232** / 292 (118) | 70 / 85%* | 7–14 Dec stay now registered in PriceLabs |
| Marylebone (intentional block) | P06 | 2 | 51 / 41% | 321 / **412 / 522** / 655 (214) | 80 / 90%* | 24–29 Nov now registered in PriceLabs |
| Greenwich (handback 26 Nov) / Primrose Hill (numbers only) | P09 / P14 | 1 / 1 | 40/32; 49/38% | P09 only a 31 Oct row; P14 no row | 100/100*; 0/0% | not pulled |

\* Inflated by handback or intentional blocks. `market.csv` has no row for Bow, Little Venice, Fulham, Kings Langley, Ladbroke Grove, Bayswater, Woolwich, Hanger Lane or Islington.

## 2. Dates where our price should differ from PriceLabs
- Prices are from `prices.csv` 15 Nov, with 14 Nov in brackets.
- Market P50/P75 and occupancy vs the same time last year (STLY, in points) come from `m15/neigh_<id>.json`.

| Item | 15 Nov (14 Nov) | Market | Status |
|---|---|---|---|
| **P11 14–17 Dec** (darts Round One, min 3) | 210 / 207 / 215 / 234 = **£866** (£859); 18 Dec 283 (282) | P50 £1,007 (14–17) / £1,288 (14–18); P75 £1,567 (14–18). Occ vs STLY **−6.3 / −1.5 / −2.2 / +1.8**, 18 Dec −2.1 | The 21 Oct policy level is an average above £300 on the darts nights, so 14–17 Dec should be £1,200 against £866: **gap £334** (was £341). That is also £141 under P50. The market is below STLY, so the only point here is the existing conflict (Reyhan's −3% replaced the +5% that policy says to leave). **For Corentin to confirm, not a new proposal.** |
| **P11 8 Dec** | 200 (202), min 3 | P50 255; occ +5.6 | Still a 1-night gap between the 5–8 Dec and 9–14 Dec stays. It cannot be booked under min 3. |
| **P11 3 Jan** (darts final) | **173** (172) | P50 221 / P75 281; occ 18.9 vs 15.8 (**+3.1**) | £20 under the fortnight (193) and £48 under P50. Raising it to at least the fortnight (+£20) is supported by occ above STLY. |
| **P11 22–27 Nov** | 199/193/215/215/226/276 = £1,324 (£1,224, **+£100**) | P50 £1,450; occ −2.4 to −8.8 | PriceLabs raised these after it registered the bookings (its occupancy went from 33% to 60%). The overnight cut reported on 14 Nov has reversed. The market is below STLY, so nothing is proposed. |
| **P13 Christmas** (3064856; **18–23 Dec now sold**) | 12 open nights (10–17 and 23–26 Dec) = **£2,765** (£2,653); twin 3090701 £2,545 (£2,548). −5% still live (no edit logged). | P50 **£2,924** / P75 £3,655. Occ vs STLY +10.4 / +10.9 / +16.6 / +8.7 / +5.3 / −0.8 / +3.0 / +6.8 and 23–26 Dec **+22.8 / +15.7 / +9.8 / +10.6** | Still under P50 by **£159** (was £459 on 17 nights). The algorithm added £112 overnight, mostly 14–15 Dec (+33 / +31). Under P50 on 6 of 12 nights (16, 17, 23–26 Dec) by £247. Removing the −5% would add about **+£146** (2,765 / 0.95). For Corentin (a-peak-check). |
| **P13 18–23 Dec — SOLD** | Booking.com, 5 nights, room **£847.10 = £169.42/n**, booked 14 Nov. PriceLabs shows the stay on 3064856 (`booked_adr` 141.18); 3090701 is closed by the link. 14 Nov PriceLabs 18–22 Dec = £1,067; ×1.10 = £1,173.70 | P50 18–22 Dec **£1,239**; occ **+8.4 / +14.7 / +12.9 / +16.2 / +20.0** | Sold at **0.72× the Booking.com list** and **£392 under P50**, on nights where the market is 8–20 points above STLY. It sold inside the −5% window. The promotion stack and commission go to the channel section. |
| **P05 7–8 Dec** (+3%, min 2) | **£912** (466 / 446) (£919) | P75 £1,140; occ +6.1 / +1.7 | Open: **+£228** to P75 (was +£227). |
| **P05 13–14 Dec** (+5%, min 2) | **£971** (492 / 479) (£982) | P75 £1,162; occ **+13.0 / +6.8** | Open: **+£191** to P75 (was +£173). The algorithm cut £11. |
| **P05 21 Dec** (+300%, min 1) | **£2,066** (£2,073) | P75 716 / P90 909; uncustomized 707; occ +1.8 | 2.3× P90. **Conflict, Corentin to confirm** whether this night is meant to sell. |
| **P05 29 Dec** (+300%, min 1) | **£2,557** (£2,647) | P75 828 / P90 1,101; uncustomized 1,046; occ +4.4 | 2.3× P90 and £1,511 over uncustomized. Same conflict. |
| **P04 14–19 Dec** (−5%, min 3) | 155/176/179/183/189/195 = **£1,077** (£1,105; **14 Dec 175 → 155**, no edit) | P50 £957 / P75 £1,272; occ +0.9 / −0.2 / +1.8 / +1.3 / +2.3 / +4.5 | Open: **+£195** to P75 (was +£186). |
| **P04 11–13 Dec** | 171/173/162 = £506 (£507) | P75 £637; occ **+4.8 / +7.6 / +5.1** | Unchanged. Yesterday's ask stands: restore the 13 Nov levels (+£58). |
| **P04 18–19 and 24 Nov** | 155 / 158 and 164 (148 / 151 / 153); Smoobu shows 175 / 165 on 18–19 Nov | P50 152 / 156 / 152; occ +5.3 / +0.1 / −2.9 | The new Airbnb stay 20–24 Nov leaves **18–19 Nov as a 2-night gap and 24 Nov as a 1-night gap**, both under the policy minimum of 3, so they cannot be booked. Policy rules out min 2, so nothing is proposed. Why PriceLabs and Smoobu differ on 18–19 Nov goes to the PriceLabs auditor. |
| **P20 20–24 Nov** (−5%; min 3/3/2/2/2) | 258/234/215/214/244 = **£1,165** (£1,179); **23 Nov 245 → 214** | P50 £1,072 / P75 £1,406; occ +1.1 / −3.1 / −4.2 / +1.7 / −5.6 | Between P50 and P75; the market is soft. **t-p20-delivery still open:** policy says delivery 20–22 Nov, but PriceLabs shows 18–19 Nov blocked and 20–24 Nov on sale. The −5% → 0% ask (about +£61) applies only if these nights are meant to sell. |
| **P20 5 Dec** | 298 (306), min 3 | P50 227 / P75 300; occ +0.6 | Still a 1-night gap (1–5 and 6–14 Dec booked). It cannot be booked. |
| **P06 22–23 Nov** (intentional-block listing; numbers only) | 271 / 239 = **£510** (£572), min 2/3 | P25 293 / 293, P50 368 / 368; occ **−7.1 / −12.9** | Still a 2-night gap, now further under P25. PriceLabs has registered 24–29 Nov. No proposal (policy); who reopened it is t-p06-2229open. |
| P12 18–20 Nov, 26 Nov, 30 Nov–3 Dec (handback 13 Dec) | 8 nights £2,324 (17 Nov excluded per policy) | P75 £2,012; occ −0.6 to −18.0 | £312 above P75 with the market below STLY. Numbers only: this belongs to a-p12-trim. |

## 3. Demand calendar, next 90 days
**Re-verified 15 Nov 2026** (WebSearch summaries restricted to official domains):
- **World Darts Championship, Alexandra Palace** ([alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq), [pdc.tv/calendar](https://www.pdc.tv/calendar/)): **11 Dec 2026 – 3 Jan 2027** in the Great Hall, 36 sessions. Quarter-finals Fri 1 Jan; semi-finals Sat 2 Jan 19:30; **final Sun 3 Jan 20:00 GMT**. Sessions run at 12:30 and 19:00. One PDC ticketing item says 4 Jan (conflict).
  - Round Two 20–23 Dec comes from a garbled FAQ snippet. **No sessions 24–29 Dec is an inference from missing dates: UNVERIFIED.**
  - "180,000 tickets" is from the 14 Nov check only; today's summary did not state it.
- **The O2** ([arena listing](https://www.theo2.co.uk/events/venue/the-o2-arena) and event pages):
  - November: Myles Smith Fri 20 Nov; The Script Sat 21; Don Toliver Mon 23; Jungle 24–25; Squeeze 26; Fontaines D.C. 27; **Mariah Carey Mon 30 Nov**.
  - December: Phoebe Bridgers 1–2 Dec; **Capital's Jingle Bell Ball 5–6 Dec**; Bryson Tiller Mon 7 Dec (yesterday's 3-vs-7 conflict now resolves to 7); Kehlani Tue 8; Pete Tong Ibiza Classics 11–12 Dec (a second listing says 10 Dec, conflict); **RnB Winter Ball Sun 13 Dec** (conflicts with earlier 7 Dec and 11–12 Dec readings); **Kasabian Fri 18 Dec**.
  - **Disney On Ice 24 and 26–31 Dec, 2–3 Jan** (no show on 1 Jan) ([page](https://www.theo2.co.uk/events/detail/disney-on-ice-presents-discover-the-magic)).
- **ExCeL** ([what's on](https://www.excel.london/whats-on), [EV Show](https://www.excel.london/visitor/whats-on/london-ev-show), [London Build](https://www.excel.london/whats-on/london-build-expo), [Horse Show](https://www.excel.london/whats-on/london-international-horse-show), [MegaCon](https://www.excel.london/whats-on/megacon-live)):
  - **18–19 Nov co-located shows**: London EV Show, B2B Marketing Live, European Pizza Show, London Biotechnology Show and Contact Centre Expo. London Vet Show 19–20 Nov is given by one listing only. This resolves yesterday's "conflict" into co-location.
  - HOMES UK 24–25 Nov; London Build Expo + elementalLONDON 25–26 Nov.
  - December: Perfume Exhibition 10–13 Dec; **London International Horse Show 17–21 Dec**; Scrooge Cirque 23–28 Dec.
  - January: **MegaCon Live 23–24 Jan**; Festival of Genomics 27–28 Jan.
- **Twickenham** ([England v NZ](https://allianzstadiumtwickenham.com/england-v-new-zealand-nations-championship-pool-match), [Nations Championship](https://allianzstadiumtwickenham.com/nations-championship), [what's on](https://allianzstadiumtwickenham.com/whats-on)):
  - **England v New Zealand Sat 21 Nov, KO 14:10** (one visit page says 14:50, conflict).
  - **Finals Weekend Fri 27 – Sun 29 Nov**, Grand Final Sun 29 Nov. The what's-on page says "Saturday 27 November", but 27 Nov is a Friday (conflict).
- **Alexandra Palace gigs** ([Nia Archives](https://www.alexandrapalace.com/whats-on/nia-archives/), [Blossoms](https://www.alexandrapalace.com/whats-on/blossoms/)): Nia Archives Thu 26 Nov, Blossoms Fri 27 Nov (Great Hall); Enter Shikari 20–21 Nov.
- **NYE fireworks** ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)): 31 Dec, 20:00 to 00:30, ticketed £20–£55; second release Fri 20 Nov 12:00.
- **UNVERIFIED today:** O2 15–17 Nov acts, Camden school holiday dates.
- **Attendance figures:** none stated by any source today.

How to read the table:
- **Effect** = market occ vs STLY from `m15`: compression at +5 or more, soft at −2 or less, normal in between.
- **Open properties** come from VENUES in `build/properties.py`; P20 is shown with P01 for O2/ExCeL.
- **Ours vs fortnight** = `prices.csv` 15 Nov compared with the fortnight mean.

| Nights | Event | Venue | Open properties | Effect | Ours £ vs fortnight £ | Priced by PriceLabs? |
|---|---|---|---|---|---|---|
| 16–17 Nov | (O2, UNVERIFIED) | O2 | P20 | normal (+2.7 / −0.1) | 223 / 239; fortnight n/a | P20 −5% |
| 18–19 Nov | EV Show + co-located expos | ExCeL | P04 (gap under min 3); P20 blocked | +5.3 / +0.1 | **155 / 158** vs 164 | no |
| 20–21 Nov | Myles Smith, The Script / Eng v NZ | O2 / Twickenham | P20 (delivery per policy); P04, P13 booked | P20 +1.1 / −3.1 | P20 258 / 234 vs 230 | yes (above the fortnight) |
| 23 Nov | Don Toliver | O2 | P20 | +1.7 | **214** vs 241 (245 on 14 Nov) | no, cut £31 |
| 24 Nov | Jungle / HOMES UK | O2 / ExCeL | P20; P04 (1-night gap) | P20 −5.6; P04 −2.9 | P20 **244** vs 255; P04 164 vs 160 | no / yes |
| 26–27 Nov | Nia Archives, Blossoms / Squeeze, Fontaines | Ally Pally / O2 | P11 | −5.0 / −2.4 | P11 **226** / 276 vs 238 | 26 Nov no, 27 Nov yes |
| 27 Nov | Finals Weekend | Twickenham | P13 (28 Nov booked) | **compression +14.3** | 304 vs 241 | yes |
| 30 Nov | Mariah Carey | O2 | all booked or blocked | – | – | – |
| 5–6 Dec | Jingle Bell Ball | O2 | P20 5 Dec (cannot be booked); P04 6 Dec | +0.6 / −1.9 | P20 **298** vs 334; P04 **163** vs 163 | no / level with fortnight |
| 7–8 Dec | Bryson Tiller, Kehlani | O2 | P04 | +1.5 / +4.0 | 160 / **160** vs 166 | no |
| 11–13 Dec | Darts opening / RnB Winter Ball 13 | Ally Pally / O2 | P11 sold (9–14 Dec, £172.72/n); P04 open | P11 +7.7 / +6.3 / 0; P04 +4.8 / +7.6 / +5.1 | P04 171 / 173 / 162 (cut on 14 Nov) | P11 sold under the policy level |
| 14–17 Dec | Darts Round One | Ally Pally | P11 | **soft**: −6.3 / −1.5 / −2.2 / +1.8 | **210 / 207 / 215 / 234** vs 272 | no (fortnight inflated, see §4) |
| 16–18 Dec | Horse Show / Kasabian 18 | ExCeL / O2 | P04 16–19; P20 16–18 | P04 +1.8 / +1.3 / +2.3; P20 −1.6 / −0.3 / +0.1 | P04 179 / 183 / 189 vs 166; P20 **271 / 292 / 301** vs 345 | P04 yes; P20 no (fortnight inflated, see §4) |
| 18 Dec | Darts Round One | Ally Pally | P11 | −2.1 | 283 vs 251 | yes |
| 10–26 Dec | pre-Christmas / school holiday | London | P13 (18–23 sold) | **compression, +3 to +23** (15 Dec −0.8) | under P50 on 6 of 12 | **no** (−5%) |
| 23 Dec | Darts Round Two | Ally Pally | P11 | soft −4.1 | **279** vs 299 | no; market soft |
| 26 Dec – 2 Jan | Disney On Ice / NYE | O2 / central | P20; P04 2 Jan | P20 +2.8 to +11.4; P04 2 Jan +8.3 | P20 308–440 vs 256; P04 195 vs 178 | yes |
| 3 Jan | Darts final | Ally Pally | P11 | +3.1 | **173** vs 193 (P50 221) | no |
| 23–24 Jan | MegaCon Live | ExCeL | P20; P04 | P20 **+10.9 / +7.3**; P04 −2.4 / −0.3 | P20 251 / 245 vs ~257 (P50 210 / 207) | P20 above P50 |

## 4. Missed compression: open nights on events priced at or below the fortnight
Same event set and method as 8–14 Nov (`m15/out15.txt`).

| Ref | Night(s) | Event | Ours 15 Nov (14 Nov) | Fortnight £ (14 Nov) | Gap £ (14 Nov) |
|---|---|---|---|---|---|
| P04 | 18, 19 Nov | ExCeL 18–19 Nov (**cannot be booked, min 3**) | 155, 158 (148, 151) | 164 (157) | 9, 6 (9, 6) |
| P20 | 23 Nov | Don Toliver | 214 (245) | 241 (248) | **27** (3) |
| P20 | 24 Nov | Jungle / HOMES UK | 244 (246) | 255 (265) | 11 (19) |
| P11 | 26 Nov | Nia Archives (NEW) | 226 (210) | 238 (206) | 12 (–) |
| P20 | 5 Dec | Jingle Bell Ball (**cannot be booked**) | 298 (306) | 334 (339) | 36 (33) |
| P04 | 6 Dec | Jingle Bell Ball (NEW) | 163 (164) | 163 (164) | 0 (–) |
| P04 | 8 Dec | Kehlani | 160 (162) | 166 (168) | 6 (6) |
| **P11** | **14–17 Dec** | Darts Round One | **210, 207, 215, 234** (201, 209, 216, 233) | **272** (247) | **62, 65, 57, 38** (46, 38, 31, 14) |
| P20 | 16, 17, 18 Dec | Horse Show / Kasabian | 271, 292, 301 (277, 279, 285) | 345 (335) | 74, 53, 44 (58, 56, 50) |
| P11 | 23 Dec | Darts Round Two | 279 (276) | 299 (298) | 20 (22) |
| P11 | 3 Jan | Darts final | 173 (172) | 193 (193) | 20 (21) |
| | | **Total, same method** | | | **17 nights / £540** (14 Nov **19 / £419**) |
| | | Of which bookable (excluding P04 18–19 Nov and P20 5 Dec) | | | 14 / £489 |

**Change vs yesterday: −2 nights / +£121.** Check: 540 − 419 = 121.
- **Dropped (−4 nights / −£7):** P04 20, 23 and 24 Nov and P20 20 Nov. P04 20–23 Nov sold (Airbnb stay 20–24 Nov), and P04 24 Nov is now above its fortnight; P20 20 Nov rose 236 → 258.
- **Added (+2 nights / +£12):** P11 26 Nov and P04 6 Dec (gap £0). Both entered because the fortnight moved, not because our price fell.
- **P11 14–17 Dec +£93: a fortnight artefact.** Once PriceLabs registered the 9–14 Dec stay, it repriced the booked nights about +22% (11 Dec 263 → 330, 12 Dec 266 → 332). That lifted the fortnight from 247 to 272, while our open-night prices moved only +9 / −2 / −1 / +1. The real gap is the policy conflict in §2 (£334), and the market is soft.
- **P20 +£23 net:**
  - 23 Nov is a real algorithm cut: 245 → 214 (−£31, no edit logged; market +1.7 vs STLY).
  - 16–18 Dec (+£7) is again the inflated fortnight from booked 9–13 Dec nights; the market there is −1.6 to +0.1.
  - 24 Nov −£8, 5 Dec +£3.
- **P11 23 Dec / 3 Jan:** −£2 / −£1.

**Supplementary, not in the headline:**
- MegaCon 23–24 Jan, P20: £18 under the fortnight (6 + 12), although above P50.
- P13 Christmas: compared against P50, not the fortnight (−£159 on 12 open nights, see §2).

**Where the market supports a raise** (occ clearly above STLY and our price under P50/P75):
- **P05 7–8 / 13–14 Dec**: +£228 / +£191 to P75.
- **P04 14–19 Dec**: +£195 to P75. **P04 11–13 Dec**: +£58 to restore 13 Nov prices (market +4.8 to +7.6).
- **P13 10–17 and 23–26 Dec**: +£159 to P50 (+£146 by removing the −5%).
- **P11 3 Jan**: +£20 to the fortnight (+£48 to P50); occ +3.1.
- Darts 14–17 Dec (−£334 vs policy) is a policy conflict for Corentin; the market is soft.

Data gaps:
1. Market figures are PriceLabs Nearby Listings: Airbnb-derived, `cleaning_fee` null, not comp sets, horizon unstated. P05 bands may include 3 BR. P09 has only a 31 Oct row; P08/P14 have no row; P10, P15–P19 and P02/P03/P07 were not pulled. The first P20 call failed with an empty `success=false`; the retry succeeded.
2. **P04: PriceLabs has not registered the Airbnb stay 20–24 Nov** (`available=True` on 20–23 Nov, refreshed 14 Nov 08:42Z). Two things are NOT CHECKED: whether this stay came through the Airbnb account not connected to Smoobu (listing 1455…), and why PriceLabs and Smoobu differ on 18–19 Nov. Also NOT CHECKED: why P04 14 Dec fell 175 → 155 and P20 23 Nov fell 245 → 214 with no edit logged (per-date breakdown).
3. The fortnight method includes booked nights, and PriceLabs reprices those after it registers a booking. That inflates the P11 Dec and P20 Dec fortnights; an open-nights-only variant (`analyse15_openonly.py`) gives 4 nights / £28 but lacks data in most windows. Both numbers should be read alongside the P50/STLY test.
4. Live Booking.com/Airbnb prices for any date were NOT CHECKED (no OTA or Smoobu call this run). Overrides were not re-pulled because the logs show 0 edits.
5. Events are domain-restricted search summaries, not page reads. www.alexandrapalace.com has to be allowed in the session's network settings.
   - Open conflicts: O2 RnB Winter Ball 13 vs 7 / 11–12 Dec; Pete Tong 10 vs 11–12 Dec; darts end 3 vs 4 Jan; Twickenham "Saturday 27 Nov" and 14:10 vs 14:50 KO; London Vet Show 19–20 Nov from one listing only.
   - UNVERIFIED: darts no-play 24–29 Dec and Round Two 20–23 Dec (garbled snippet), O2 15–17 Nov acts, school dates.
   - No attendance figures were stated today.
