# Competitor positioning: CENTRAL/NORTH (D = 2026-11-09)

**Method**
- **Comp ids:** the same 55 comp ids as 1–8 Nov (comp-central rows in `data/snapshots/2026-11-08/comps.csv`). **No replacements.**
  - Comps returned on none of today's stays: P06 917140285217729256 (3rd day) and 1452940332365117153 (1st day). P08 693487869095756237, 1289147258305624118, 1409413462916896898 and 1497137911142581794 (8th day). P14 1459390808864489268 and 1075245497252121738. P17 975294297333089697 and 774061637963678253. Whether any of them is inactive: NOT CHECKED.
- **Searches:** 66 public Airbnb searches on airbnb.co.uk, checked 2026-11-09 07:21–07:26Z. Every result page was read, with 0 parse failures and no bot challenge. Same map boxes and filters as 25 Oct–8 Nov: entire home, minimum bedrooms = ours, adults = our sleeps − 1.
  - Also 4 P05 length-of-stay test searches for 4–8, 4–9, 4–10 and 4–11 Jan 2027 (56 days out), checked ~07:28Z.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c09s/search.py`. Raw results: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c09/search/*.json` and `.../c09/los/*.json`.
- **Same stays for every comp and for us:** Tue 10–Thu 12 Nov (midweek), Fri 13–Sun 15 Nov (next Friday–Sunday), **Wed 9–Fri 11 Dec (30 days out, new today)**. Kept for the day-on-day comparison: 24–26 Nov, 27–29 Nov, 4–6 Dec, 7–9 Dec and 8–10 Dec.
- **Extra stays:**
  - P05: 9–10 Nov (tonight), 16–18 Nov, 29 Nov–3 Dec, **13–15 Dec (new)**, 13–16 Dec, **15–21 Dec (the new booking, new)**, 17–20 Dec, 20–22 Dec, **21–22 Dec (new)**, 29–30 Dec.
  - P06: 9–11, 15–17, 15–18 and 16–18 Nov.
  - P11: the same 10 stays as 8 Nov, including darts 13–17 Dec.
- **Our prices:** live **Smoobu GET `/api/rates`** at 9 Nov 07:19:48Z (`/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c09/smoobu_rates09.json`). Booked or open status is from Smoobu `reservations.csv` (9 Nov). The only change in this batch since 8 Nov is **P05's new 15–21 Dec booking** (full-row diff). There are no cancellations.
- **Price basis:**
  - **Comps:** Airbnb total ÷ nights. Excludes taxes, includes cleaning, after any offer.
  - **P05 and P06:** our own Airbnb listing seen in the same search (10 stays, plus 4 LOS tests; rows added to `channel_checks.csv`).
    - Where our listing was not returned, the price is derived from today's observed factors.
    - **P06:** 0.765 × Smoobu + £129 cleaning, or 0.851 × for a same-day arrival (9–11 Nov).
    - **P05:** 0.765 × at ≤28 days out, 0.900 × at 29–56 days out, + £195 cleaning. The 7–9 Dec stay shows both: 7 Dec at 28 days × 0.765 and 8 Dec at 29 days × 0.900 = £954.06, exactly what Airbnb showed.
  - **P11** (Booking.com only) and **P14:** Smoobu room rate, which excludes cleaning while the comps include it, so their percentiles are biased low. P11 is also shown at the Booking.com list price (Smoobu × 1.15, before promotions).
- **Booking.com: NOT CHECKED.** Not attempted (bot check on earlier days; not bypassed).
- **Positioning:** `rm/positioning.py` `quality_premium` + `recommend`.
  - **Occupancy is from Smoobu** `reservations.csv` (confirmed only), 9 Nov–8 Dec (30d) and 9 Nov–7 Jan (60d):
    - P05: 0.700 / 0.717
    - P06: 0.538 ex intentional blocks (7 booked of 13 non-blocked nights)
    - P11: 0.433 / 0.417
  - Market occupancy is from `reports/2026-11-09/kpi_pack.json`.
  - Percentile = mean over open multi-night stays (14d = check-in up to 23 Nov, 30d = up to 9 Dec).
  - Script: `.../c09s/analyse09.py`. Output: `.../c09/analysis.json`.
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` (listing, 8–9 Nov): 8 entries, all by Reyhan at 8 Nov 12:38–12:41Z.
    - In this batch only: **P11 (and its Vrbo child) 10 Nov–18 Dec −2% → −5%, min 2** (12:38:36Z).
    - Nothing on P05, P06, P08 or P14.
  - `get_listing_date_overrides` confirms P11 −5% on 10 Nov–18 Dec (updated 8 Nov 12:38:35Z).
    - P05 is unchanged: +300% min 1 on 9 Nov; −2% min 3 on 13–19 Dec; min 2 on 20–21 Dec; +3% min 2 on 7–8 Dec; +100% min 1 on 29 Dec.
    - P06 is unchanged: −5% on 9–14 Nov; min 2 only on 15–22 Nov.
- **Commission:** the channel agent's finding stands. Not re-raised here.

## Summary

| Ref | Comps priced per stay | Our pct, open stays: 14d / 30d / 60d | Rating, ours vs comp median; review gap | Booked vs market (30d, Smoobu) | Supported positioning |
|---|---|---|---|---|---|
| **P05 4BR** | 6 (0–4) | **P25 / P25 / P25** | Airbnb 4.77 (35) vs 4.26 (22.5); +12.5 | 70.0% vs 43% | `quality_premium` **+0.15**, so **+15% vs median is supported**. `recommend` 30d and 60d: **raise +25%**. The new 15–21 Dec booking sold at **−44% vs the comp median**. |
| **P06 2BR** | 12 (3–5 on open stays) | **P0 / P0 / P0** | 4.58 (12) vs 4.62 (26); −14 | **53.8%** ex-blocks vs 49% | qp −0.016, so **−2% vs median is supported**. `recommend` 30d: **raise +5%**. Every open stay is −12% to −37% vs median. |
| **P08 2BR** | 1–2 | n/a: **nothing left to sell** | 4.50 (4) vs 4.87 (29); −25 | 100% vs 51% | qp −0.148. Moot: booked up to the 13 Nov handback. |
| **P11 2BR** | 12 (2–9) | **P12 / P8 / P6** at room price | Booking.com 8.0/10 (policy). Not comparable with the Airbnb median 4.67 (36) | 43.3% vs 48% (60d 41.7% vs 39%) | qp 0, so **at the median (0%) is supported**. `recommend` 30d and 60d: **raise +5%**. On kpi_pack's 41.4% the 30d output would be `fix-listing`, so this is borderline. We are 24–49% under the median at room price, and 13–42% under at list price. |
| P14 1BR | 12 (1–8) | P100 | Not seen on Airbnb; comp median 4.88 (19.5) | 0% vs 46% | Special setup (policy): numbers only. +41% to +111% vs median. |
| P17 1BR | 7 (0–4) | n/a | Comp median 4.54 (51) | n/a | Not in PriceLabs or Smoobu: reference set only. |

**Day-on-day (same comp, same stay, 8 Nov → 9 Nov)**
- **Most comps did not move:** 155 of 202 comparable comp-stays are unchanged.
- **Comps that cut:**
  - **P05** 1639043256346803626 (4.89 Superhost) cut 10–12 Nov by 17% to £266.50 and raised 8–10 Dec by 14% to £637. 1363636555926649515 (3.92) cut its December stays by 3–5%.
  - **P11** 1480693526878012391 cut 10–13 Nov by 24% to £171.67. 654396087724294901 cut 7–9 Dec by 13% to £211.
- **Sold since yesterday (demand signal):**
  - **P06 15–18 Nov:** 1259401393497276633 is gone from 15–17, 15–18 and 16–18 Nov. 1315177393080154583 is gone from 15–18 Nov. **We stay unsold while being the cheapest** (see P06).
  - **P11:** 1159915905276842600 sold 10–12 Nov, 10–13 Nov and 8–11 Dec. 1542960049319560709 sold 10–12 Nov, 24–26 Nov and 8–10 Dec. 1263490105174331990 sold 10–12 and 10–13 Nov. 1675590787835266115 sold 8–10 Dec and 23–26 Dec.
  - **P05:** 912053248917940403 and 1610095240357069208 are gone from 10–12 Nov.
- **Ours, 8 Nov → 9 Nov:**
  - **P11 fell 2–10% on every open night.** 10–12 Nov £191 → £174.50. 18–20 Nov £169 → **£152**. Darts £210.50 → £203.
    - Cause: Reyhan's −2% → −5% (8 Nov 12:38Z), plus PriceLabs' uncustomized price falling (18 Nov 225 → 218).
  - **P06 fell 5–7%:** 9–11 Nov £223/£228/£236 → £211/£213/£224, and 15–17 Nov £265/£264/£270 → £249/£249/£255.
    - Cause: PriceLabs refresh 8 Nov 08:00Z, with uncustomized 15 Nov 258 → 245 (`raw/prices_3288517.json`). No DSO change and no log entry, so this is the PriceLabs model.
  - **P05 December fell 1–3%** (15–21 Dec 3,700 → 3,657 before it sold), from the PriceLabs refresh at 8 Nov 12:39Z.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

### 15–21 Dec booking (booked 8 Nov, 37 days out): sold cheap — yes

| Measure | Value | Source |
|---|---|---|
| Paid, room | **£2,962.17** (£493.70/night); cleaning £195; all-in **£526.20/night** | `reservations.csv` 9 Nov |
| Smoobu rate for the 6 nights | 569+576+604+613+650+645 = **£3,657** (avg £609.50). Same as the PriceLabs 8 Nov 12:39Z refresh; the 8 Nov 07:19Z Smoobu read was £3,700 | Smoobu `/api/rates` 9 Nov; `raw/prices_3166592.json` |
| Paid ÷ Smoobu | **0.8100 exactly** (3,657 × 0.81 = 2,962.17) = 0.900 × 0.900 | calc |
| PriceLabs uncustomized | £3,757. Reyhan's −2% DSO on 13–19 Dec accounts for −£100 | raw 9 Nov |
| Comps still bookable for the same 15–21 Dec stay | £940 (1610095240357069208, 4.17), £940 (1606112160333193293, 4.24), £477.33 (1363636555926649515, 3.92). **Median £940 (n=3)** | Airbnb search 9 Nov |
| Our percentile / vs median | **P33 / −44%** (only the 3.92-rated comp is cheaper) | calc |
| Overlapping stays | 13–16 Dec median £951 (4); 17–20 Dec £980 (4). 912053248917940403 (4.97 Superhost) asks £922 and £1,083 | Airbnb search 9 Nov |
| Market (Nearby Listings 4 BR, not comps) | P25 £461 / P50 £575 / **P75 £720** / P90 £1,180. Our room £493.70 is under P50 and 31% under P75. Cleaning inclusion unknown | `market.csv` 9 Nov |

- **Discount stack:**
  - The 0.900 layer at 29–56 days out shows again today: 8 Dec (29 d), 29 Dec (50 d), and 4 Jan (56 d) = 0.900.
  - **LOS test, 56 days out (4 Jan 2027), shown to guests:**
    - 4 nights: 0.900, no discount line.
    - 5 and 6 nights: list at 1.00 × Smoobu, with a visible **"Long stay discount" of exactly 10% of the room**. Net 0.900.
    - 7 nights: "Weekly stay discount" 15%. Net 0.850.
  - **At 56 days, then, the lead-time layer and the long-stay discount do not stack.** The 15–21 Dec booking paid **0.81, i.e. both 10% layers stacked**. That is **£329.13 room below the 0.900 that a 6-night stay shows today**, and £694.83 below the Smoobu rate.
  - A 5–6-night 10% long-stay discount is **not in policy**: policy covers only 15% at 7+ nights and 20% at 28+.
  - Why it stacked at 37 days and not at 56 days: NOT CHECKED. The Airbnb reservation breakdown was not seen. Leak sizing belongs to the channel agent.
- **Positioning:**
  - Even the Smoobu rate (£609.50 + cleaning, about £642 all-in at 1.00×) would have been −32% vs the £940 median.
  - What the evidence supported: about +15% vs the median.
  - The comp asks are unsold asks, not cleared prices, and the two £940 comps are rated 4.17/4.24. Against the best-rated cleared reference, 1639043256346803626 (4.89) at £637–£656 for 7–9 and 13–15 Dec, we still sold 18–20% under.
- **a-p05-dec, after this booking:**
  - 15–21 Dec is now sold.
  - P05 is **sellable on only 7–8 Dec and 29 Dec**. 13–14 Dec and 21 Dec are orphan gaps closed by min stay (below).

### Remaining December (open nights)

| Stay | Ours, Airbnb all-in/night | Comp median (n) | Pct / vs median | Smoobu room | Min stay | Sellable? |
|---|---|---|---|---|---|---|
| 7–9 Dec (7–8 Dec) | **£477.03 observed** (7 Dec 0.765 + 8 Dec 0.900) | £828.50 (4) | P25 / −42% | £464 / £449 (+3% DSO) | 2 | Yes |
| 13–15 Dec (13–14 Dec) | £612.30 (derived 0.900) | £838 (4) | P25 / −27% | £579 / £565 | **3** | **No:** a 2-night gap (9–13 Dec departs 13th, 15–21 Dec arrives 15th) under DSO min 3 (updated 7 Nov 12:30:56Z) |
| 21–22 Dec (21 Dec) | £775.50 (derived 0.900, 1 night) | no comp returned (n=0) | n/a | £645 | **2** | **No:** a 1-night gap (15–21 Dec departs 21st, 22–29 Dec arrives 22nd) under DSO min 2 (26 Oct) |
| 29–30 Dec (29 Dec) | **£1,393.80 observed** (0.900) | no comp returned (n=0) | n/a; above the NL P90 £1,180 | £1,332 (+100% DSO, uncustomized £1,068) | 1 | Yes |

- **13–14 Dec (£1,144 Smoobu, about £1,030 room at 0.900) and 21 Dec (£645, about £580 room) cannot be booked** under the current minimums.
  - Lowering 13–14 Dec to min 2 and 21 Dec to min 1 is the only way to sell them. This is a new finding today, created by the 15–21 Dec booking.
  - The 13–15 Dec comps (£461.50–£1,020; 4.89-rated 1639043256346803626 at £656) say the 2-night stay is already **P25 / −27% at today's price**, so no price cut is needed to sell it.
- **7–8 Dec:** P25 / −42%. `recommend` +25% → Smoobu about £580 / £561 → about £572 all-in, still P25 (−31%). Reyhan's +3% DSO is in place.
- **29 Dec:** no Airbnb comp is bookable for that night, so there is no comp evidence for or against £1,332. NL P90 is £1,180. **Hold-signal: price position unknown.**

### 9 Nov (tonight): a-p05-9nov NOT FIXED (10th check)
- Airbnb 9–10 Nov now shows **"1 night x £547.00", "Special offer −£70.40", total £476.60**. That is £281.60 room after the £195 cleaning. Yesterday: £511.80 − £63.36 = £448.44.
- Smoobu is £1,403, min 1 (+300% DSO, unchanged since 30 Oct 22:09Z). Airbnb is not showing the Smoobu price, and the offer line remains unexplained under policy (manual Airbnb promotions removed 21 Oct).
- The only comp open tonight is 1617681646241740026 (4.28) at £320. Against it we sit at **P100 / +49%**. Supported (+15%) is about £368 all-in.
- The night lapses unless booked today.

### Other open P05 stays
- 16–18 Nov: £388.97 observed vs £410.75 (4), P25 / −5%. Supported +15% is about £472.
- 29 Nov–3 Dec: £445.21 observed vs £738.63 (4), P25 / −40%.

**Positioning:**
- `quality_premium(4.77, 4.26)` = +0.15 (cap).
- `recommend(0.700, 0.43, 0.25, 0.15)` → **raise +25%** (30d). `recommend(0.717, 0.40, 0.25, 0.15)` → **raise +25%** (60d).
- Caveat: n = 2–4 per stay. Two comps rated 4.17/4.24 ask £1,020 and set the top. Three of six comps are rated under 4.3, which inflates qp.

**Differentiators:**
- 912053248917940403: Superhost, lift, park view, 4.97.
- 1639043256346803626: Superhost house with terrace.
- Three comps list parking.

## P06 Marylebone 2-bed (3288517): open nights (intentional blocks excluded)

| Stay | Ours, Airbnb all-in/night (observed) | Comp median (n) | Pct / vs median | Supported (−2%) | Smoobu room |
|---|---|---|---|---|---|
| 9–11 Nov (arrives today, 0.851×) | £244.70 | £279.00 (4) | P0 / −12% | about £273 | £211 / £213 (−5% DSO) |
| 10–12 Nov | £231.65 | £290.00 (3) | P0 / −20% | about £284 | £213 / £224 |
| 15–17 Nov | £254.98 | £384.00 (3) | P0 / −34% | about £376 | £249 / £249 |
| 15–18 Nov | £235.01 | £372.67 (3) | P0 / −37% | about £365 | £249 / £249 / £255 |
| 16–18 Nov | £257.28 | £337.00 (5) | P0 / −24% | about £330 | £249 / £255 |

- **Open nights:** 9, 10 and 11 Nov, and 15, 16 and 17 Nov. 12–14 and 18–21 Nov are booked; the intentional block starts 22 Nov.
- **Cheapest comps:**
  - 9–11 Nov: 1018722159796386217 (4.87, 87 reviews) at £271.50.
  - 15–18 Nov: 744585770789956203 (4.70) at £280.
  - We are under every comp on every open stay.
- **Positioning:**
  - `quality_premium(4.58, 4.62)` = −0.016.
  - `recommend(0.538, 0.49, 0.00, −0.016)` → **raise +5%** (30d).
  - The 60d output (`raise +10%` ex-blocks; `fix-listing` on kpi_pack's 0.119) is not used, because 60d is mostly intentional blocks (policy).
- **Supported:** −2% vs median, e.g. about £376 all-in on 15–17 Nov.
- **Minimum consistent step:** +5% on 15–17 Nov is about £261 / £261 / £268 room, about £264 all-in/night, still P0 (−31%). PriceLabs itself cut these nights 6% overnight.
- **Mixed signal:** two comps sold 15–18 Nov overnight while we, the cheapest, did not. At P0 the gap is not price-led, which points to listing conversion (4.58 from 12 reviews; 2nd floor, no lift).
- **Reyhan's −5% on 9–14 Nov is unchanged** (4 Nov 01:28Z). It conflicts with `recommend` +5%, as reported 8 Nov. **Corentin to confirm.**
- **Differentiators:** of the 12 comps, 5 have a lift and 2 are Superhosts.

## P08 Islington 2-bed (3318167): handback 13 Nov — nothing left to sell
- **Booked through the handback:** 8–14 Nov (Airbnb, booked 17 Oct). 13 Nov is the policy last night. No proposal.
- **Reference for the booked 10–12 Nov stay:** comp median £276.50 (n=2), no change.

## P11 Camden (3064196): next 14 days, darts, December (Smoobu room; Booking.com list × 1.15)

| Stay (open) | Ours room (Smoobu) | Comp median (n) | Pct / vs median | List × 1.15 |
|---|---|---|---|---|
| 10–12 Nov | £174.50 (was £191) | £285.50 (2) | P0 / −39% | £201: P0 / −30% |
| 10–13 Nov | £178.33 | £237.33 (3) | P33 / −25% | £205: P33 / −14% |
| **18–20 Nov** | **£152.00** (£143 / £161; was £169) | £288.50 (8) | **P0 / −47%** | £175: P0 / −39% |
| 22–26 Nov | £208.50 | £288.25 (6) | P17 / −28% | £240: P17 / −17% |
| 24–26 Nov | £219.50 | £303.50 (8) | P25 / −28% | £252: P25 / −17% |
| 29 Nov–5 Dec | £231.83 | £400.92 (4) | P0 / −42% | £267: P0 / −34% |
| 8–10 Dec | £225.50 | £374.50 (7) | P0 / −40% | £259: P14 / −31% |
| **9–11 Dec (new, 30 days out)** | £240.50 | £405.75 (6) | P0 / −41% | £277: P0 / −32% |
| 8–11 Dec | £234.33 | £417.83 (6) | P0 / −44% | £269: P0 / −36% |
| 11–14 Dec | £278.67 | £432.50 (8) | P0 / −36% | £320: P12 / −26% |
| 12–14 Dec | £263.50 | £477.50 (7) | P0 / −45% | £303: P14 / −37% |
| **13–17 Dec (darts)** | **£203.00** (was £210.50) | **£394.00 (9)** | **P11 / −48%** | £233: P11 / −41% |
| 15–19 Dec | £228.25 | £413.38 (8) | P0 / −45% | £262: P0 / −37% |
| 23–26 Dec | £274.33 | £361.00 (5) | P0 / −24% | £315: P40 / −13% |

- **Next 14 days:**
  - 18 Nov is £143 against an uncustomized £218 (−34%), from the occupancy-based "Aggressive" profile (per 8 Nov `get_customizations`) and the −5% DSO.
  - The cheapest comp on 18–20 Nov is 1263490105174331990 at £191.
- **Darts 13–17 Dec:**
  - Smoobu now reads **£217 / £193 / £197 / £205 = £812 for 4 nights, average £203**. With 17 Dec (£227) it is £1,039 for 5 nights, average £207.80 (was £215.60).
  - Reyhan moved 10 Nov–18 Dec from −2% to **−5%** (8 Nov 12:38Z). Policy `darts_override_24oct` says leave the darts override at +5%, and the 21 Oct intent was an average above £300.
  - **This is a conflict with a standing decision, for Corentin to confirm. Not a new proposal.**
  - Only 1090528454481682946 (4.72, £194.50) is cheaper. 1263490105174331990 (4.44) is at £235.
- **Positioning:**
  - qp 0 (no Airbnb rating).
  - `recommend(0.433, 0.48, 0.08, 0)` → **raise +5%** (30d). `recommend(0.417, 0.39, 0.06, 0)` → **raise +5%** (60d).
  - **Supported: at the comp median (0%).**
  - The move from −2% to −5% went against `recommend`, and every open stay is still P0–P33. Visibility (policy: CTR 0.81% vs 1.70%) remains the larger lever.
- **Differentiators:** P11 is a basement flat with a patio. Of the 12 comps, 4 have a lift and 3 have a terrace or balcony.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- **Smoobu:** £500–£525.50 on the reference stays, min 3–4.
  - Pushed 9 Nov 04:49Z. Some December nights rose: 5 Dec £500 → £544, 12 Dec £561 → £658.
  - Booked 0% vs market 46% at 30d.
- **Comp medians:**

| Stay | Comp median (n) |
|---|---|
| 10–12 Nov | £236.50 (5) |
| 13–15 Nov | £252.50 (1) |
| 24–26 Nov | £290 (4) |
| 27–29 Nov | £355.50 (2) |
| 4–6 Dec | £302.50 (1) |
| 7–9 Dec | £290 (8) |
| 8–10 Dec | £290 (8) |
| 9–11 Dec | £302.50 (7) |

- That puts us at P100, **+41% to +111%** vs the median.
- No proposal, per policy.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS
- **Comp medians:**

| Stay | Comp median (n) |
|---|---|
| 10–12 Nov | £212.75 (2) |
| 13–15 Nov | £254.75 (2) |
| 24–26 Nov | £232.50 (4) |
| 27–29 Nov | n/a (0) |
| 4–6 Dec | £322 (2) |
| 7–9 Dec | £192 (1) |
| 8–10 Dec | £223.75 (2) |
| 9–11 Dec | £252.50 (3) |

- Comp rating median 4.54 (51). Reference set only.

## Comp tables

**Source for every comp row:** Airbnb public search, checked 2026-11-09 07:21–07:26Z.
- Nightly price excludes taxes and includes cleaning.
- (±%) is the change vs 8 Nov for the same stay.
- "n/a" means the listing was not returned by the date-filtered search (booked, or a minimum-stay clash).
- The "Ours" rows use the live Smoobu rate.

Rows appended under `flock` (`.comps.csv.lock`, `.channel_checks.csv.lock`): **632 comp rows** to `data/snapshots/2026-11-09/comps.csv` and **14 own-listing rows** (10 searches + 4 LOS tests) to `data/snapshots/2026-11-09/channel_checks.csv`. Both files had already been copied forward by another agent.

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Mon 9 Nov–Tue 10 Nov (1n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Sun 13 Dec–Tue 15 Dec (2n) | Sun 13 Dec–Wed 16 Dec (3n) | Tue 15 Dec–Mon 21 Dec (6n) | Thu 17 Dec–Sun 20 Dec (3n) | Sun 20 Dec–Tue 22 Dec (2n) | Mon 21 Dec–Tue 22 Dec (1n) | Tue 29 Dec–Wed 30 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.17 (12) | n/a (was £419) | £419 | £1020 | £509 | £920 | £1020 | £1020 | £1020 | n/a | £419 | £960 | £1020 | £980 | £940 | £980 | £1020 | n/a | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | n/a | £519 | £1020 | £476 | n/a | £1020 | £1020 | £1020 | n/a | £498 | £552 | £1020 | £980 | £940 | £980 | £1070 | n/a | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (29) | n/a (was £720) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £925 | n/a | £922 | n/a | £1083 | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.28 (46) | n/a | n/a | n/a | £323 (-1%) | n/a | n/a | £332 (+3%) | n/a | £320 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.92 (13) | n/a | n/a | n/a | £493 (+1%) | £512 | n/a | n/a | n/a | n/a | £402 (-1%) | £420 (-4%) | £462 | £440 (-3%) | £477 | £510 (-4%) | £599 (-5%) | n/a | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (28) | £266 (-17%) | n/a | n/a | n/a | n/a | n/a | £637 (+1%) | £637 (+14%) | n/a | £308 (-4%) | n/a | £656 | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.26 (22.5) | £266 (1) | £469 (2) | £1020 (2) | £484 (4) | £716 (2) | £1020 (2) | £828 (4) | £1020 (3) | £320 (1) | £411 (4) | £739 (4) | £838 (4) | £951 (4) | £940 (3) | £980 (4) | £1020 (3) | n/a (0) | n/a (0) | |
| **Ours, Smoobu live rate/night 9 Nov 07:19Z (status, min stay)** | | | | £431 Booked (Smoobu), min 3 | £491 Booked (Smoobu), min 4 | £566 Booked (Smoobu), min 3 | £551 Booked (Smoobu), min 3 | £580 Booked (Smoobu), min 4 | £568 Booked (Smoobu), min 4 | £456 Open, min 2 | £497 Booked (Smoobu)/Open, min 2/3 | £1403 Open, min 1 | £381 Open, min 2 | £518 Open, min 3 | £572 Open, min 3 | £571 Booked (Smoobu)/Open, min 3 | £610 Booked (Smoobu), min 2/3 | £622 Booked (Smoobu), min 3 | £645 Booked (Smoobu)/Open, min 2 | £645 Open, min 2 | £1332 Open, min 1 | |
| **Ours, comparable basis** | | | | £427 | £473 | £607 | £519 | £541 | £532 | £478 obs | £545 | £477 obs | £389 obs | £445 obs | £612 | £579 | £526 | £625 | £678 | £776 | £1394 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +60% | P50 / +1% | P0 / -40% | P100 / +7% | P50 / -24% | P0 / -48% | P25 / -42% | P0 / -47% | P100 / +49% | P25 / -5% | P25 / -40% | P25 / -27% | P25 / -39% | n/a | P25 / -36% | P33 / -34% | n/a | n/a | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Mon 9 Nov–Wed 11 Nov (2n) | Sun 15 Nov–Wed 18 Nov (3n) | Sun 15 Nov–Tue 17 Nov (2n) | Mon 16 Nov–Wed 18 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.58 (12) | n/a | n/a | £440 | n/a | n/a | n/a | n/a | £420 | n/a | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.7 (23) | £275 | n/a | n/a | n/a (was £296) | n/a | n/a | n/a | n/a | £275 | £280 | £280 | £280 | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | n/a | £358 | £348 | n/a | n/a | £358 | £358 | n/a | n/a | n/a | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | £300 | n/a | £402 | n/a | n/a | n/a | n/a | £398 | £310 | n/a | n/a | £328 | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | £290 | n/a | n/a | £397 | n/a | n/a | n/a | n/a | £283 | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (53) | n/a | n/a (was £498) | £1122 | £894 | £1158 | £1418 (+5%) | £1032 (+14%) | n/a (was £902) | n/a | £462 | £498 | £498 | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | £516 | £586 | n/a | n/a | n/a | n/a | n/a (was £389) | n/a (was £408) | n/a (was £415) | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.55 (22) | n/a | n/a | £453 | £436 (+2%) | £462 (-1%) | £488 (+2%) | £421 (-3%) | £420 (-4%) | n/a | n/a (was £308) | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | £732 | n/a | £566 (+2%) | £720 (+1%) | £718 (+2%) | £762 (+2%) | n/a | £373 (+4%) | £384 (+1%) | £388 | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | n/a | n/a | £470 (-1%) | n/a | n/a | n/a | n/a | £272 (-2%) | n/a | n/a | £337 | parking listed |
| **Comp median (n)** | | | 4.62 (26.0) | £290 (3) | n/a (0) | £446 (6) | £453 (6) | £576 (4) | £720 (3) | £570 (4) | £420 (5) | £279 (4) | £373 (3) | £384 (3) | £337 (5) | |
| **Ours, Smoobu live rate/night 9 Nov 07:19Z (status, min stay)** | | | | £218 Open, min 2 | £276 Booked (Smoobu), min 2 | £456 Blocked, min 3 | £428 Blocked, min 3 | £460 Blocked, min 4 | £492 Blocked, min 4 | £408 Blocked, min 3 | £410 Blocked, min 3 | £212 Open, min 2 | £251 Open, min 2 | £249 Open, min 2 | £252 Open, min 2 | |
| **Ours, comparable basis** | | | | £232 obs | £276 | £413 | £392 | £417 | £441 | £377 | £379 | £245 obs | £235 obs | £255 obs | £258 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P0 / -20% | n/a | excluded | excluded | excluded | excluded | excluded | excluded | P0 / -12% | P0 / -37% | P0 / -34% | P0 / -24% | |

### P08

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | £408 | £408 | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | £145 | n/a | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (66) | n/a | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) | 1.22 | 4 | 4.6 (77) | n/a | n/a | none listed |
| [1497137911142581794](https://www.airbnb.co.uk/rooms/1497137911142581794) | 0.8 | 4 | 4.91 (23) | n/a | n/a | Superhost, house (2-bedroom cottage) |
| **Comp median (n)** | | | 4.87 (29.0) | £276 (2) | £408 (1) | |
| **Ours, Smoobu live rate/night 9 Nov 07:19Z (status, min stay)** | | | | £204 Booked (Smoobu), min 2 | £248 Blocked/Booked (Smoobu), min 2 | |
| **Ours, comparable basis** | | | | £230 | £264 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P50 / -17% | excluded | |

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Tue 10 Nov–Fri 13 Nov (3n) | Wed 18 Nov–Fri 20 Nov (2n) | Sun 22 Nov–Thu 26 Nov (4n) | Sun 29 Nov–Sat 5 Dec (6n) | Tue 8 Dec–Fri 11 Dec (3n) | Fri 11 Dec–Mon 14 Dec (3n) | Sat 12 Dec–Mon 14 Dec (2n) | Sun 13 Dec–Thu 17 Dec (4n) | Tue 15 Dec–Sat 19 Dec (4n) | Wed 23 Dec–Sat 26 Dec (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.7 (30) | £298 | £320 | £486 | £440 | n/a (was £440) | £440 | £440 | £440 | £274 (-2%) | £320 | £404 | £392 | £447 | £529 | £545 | £429 | £456 | n/a | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a | £374 | £270 (-1%) | n/a | n/a | £374 | £374 | n/a | n/a | £244 (-1%) | n/a | £359 | £359 | £374 | £351 | £382 | £440 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | £272 | £294 | n/a | £294 | £462 | £544 | £463 | £454 | n/a (was £256) | £294 | n/a | £410 | £444 | £494 | £510 | £394 | £420 | n/a | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a (was £268) | n/a | n/a | £338 | n/a | n/a | £438 | £438 | n/a (was £247) | n/a | £306 | £362 | n/a (was £417) | £417 | £438 | £406 | £406 | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.5 (12) | n/a (was £262) | £282 | £470 | n/a (was £306) | £615 | £544 | £463 | n/a (was £454) | £237 (-3%) | £282 | £270 | £410 | £444 | £494 | £510 | £394 | £420 | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | n/a | £328 | £437 | £358 | n/a | £478 | n/a | n/a (was £388) | n/a | £328 | £306 | n/a | £391 | £448 | £478 | £456 | £479 | n/a (was £513) | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a (was £212) | £312 | £312 | £312 | n/a | n/a | £312 | £312 | £172 (-24%) | £312 | n/a (was £281) | n/a | n/a | £292 | n/a (was £312) | £281 | £281 | £292 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.44 (61) | n/a (was £174) | n/a | n/a | £191 | n/a | n/a | n/a | £241 | n/a (was £175) | £191 | £185 | n/a | n/a | n/a | n/a | £235 | £270 | £307 | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (87) | n/a | n/a | n/a | £184 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £194 (-2%) | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.68 (73) | n/a | n/a | n/a | n/a | n/a | n/a | £211 (-13%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.55 (38) | n/a | n/a | £330 | n/a | n/a | n/a | n/a | £317 (+7%) | n/a | £278 | n/a | n/a | £318 (+6%) | £345 (+2%) | n/a | n/a | n/a | £361 | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £212 (-1%) | n/a | n/a | n/a | n/a | £280 | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (36.0) | £286 (2) | £312 (5) | £406 (6) | £304 (8) | £538 (2) | £511 (4) | £438 (7) | £374 (7) | £237 (3) | £288 (8) | £288 (6) | £401 (4) | £418 (6) | £432 (8) | £478 (7) | £394 (9) | £413 (8) | £361 (5) | |
| **Ours, Smoobu live rate/night 9 Nov 07:19Z (status, min stay)** | | | | £174 Open, min 2 | £238 Booked (Smoobu)/Open, min 2 | £240 Open, min 2 | £220 Open, min 2 | £282 Booked (Smoobu), min 2 | £290 Booked (Smoobu)/Open, min 2 | £222 Booked (Smoobu)/Open, min 2 | £226 Open, min 2 | £178 Open, min 2 | £152 Open, min 2 | £208 Open, min 2 | £232 Open, min 2 | £234 Open, min 2 | £279 Open, min 2 | £264 Open, min 2 | £203 Open, min 2 | £228 Open, min 2 | £274 Open, min 2 | |
| **Ours, comparable basis** | | | | £174 | £238 | £240 | £220 | £282 | £290 | £222 | £226 | £178 | £152 | £208 | £232 | £234 | £279 | £264 | £203 | £228 | £274 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = Smoobu x 1.15 (before promotions)** | | | | £201 P0 / -30% | £273 P0 / -13% | £277 P0 / -32% | £252 P25 / -17% | £325 P0 / -40% | £334 P0 / -35% | £255 P14 / -42% | £259 P14 / -31% | £205 P33 / -14% | £175 P0 / -39% | £240 P17 / -17% | £267 P0 / -34% | £269 P0 / -36% | £320 P12 / -26% | £303 P14 / -36% | £233 P11 / -41% | £262 P0 / -36% | £315 P40 / -13% | Smoobu Booking.com markup +15% (policy) |
| **Our percentile / vs median** | | | | P0 / -39% | P0 / -24% | P0 / -41% | P25 / -28% | P0 / -48% | P0 / -43% | P14 / -49% | P0 / -40% | P33 / -25% | P0 / -47% | P17 / -28% | P0 / -42% | P0 / -44% | P0 / -36% | P0 / -45% | P11 / -48% | P0 / -45% | P0 / -24% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | n/a | £302 | n/a (was £202) | n/a | £302 | £302 | £302 | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | £352 | £352 | £428 | n/a | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | £236 | n/a | £246 | n/a | n/a | n/a | £246 | £246 | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | £192 | £252 | £302 | £302 | n/a | n/a | £302 | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | £172 (-10%) | n/a | n/a | £278 | n/a | n/a | £278 | £278 | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | n/a | £402 | n/a | n/a | n/a | £402 | £402 | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (20) | n/a | n/a | £260 | n/a | £284 (+3%) | n/a | £252 (-2%) | £264 | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (17) | n/a | n/a | n/a | £200 | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | £264 | n/a | £241 | n/a | n/a | n/a | £241 | £241 | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.83 (12) | £238 (+3%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.88 (19.5) | £236 (5) | £252 (1) | £302 (7) | £290 (4) | £356 (2) | £302 (1) | £290 (8) | £290 (8) | |
| **Ours, Smoobu live rate/night 9 Nov 07:19Z (status, min stay)** | | | | £500 Open, min 3 | £500 Open, min 4 | £526 Open, min 3 | £500 Open, min 3 | £500 Open, min 4 | £522 Open, min 4 | £500 Open, min 3 | £500 Open, min 3 | |
| **Ours, comparable basis** | | | | £500 | £500 | £526 | £500 | £500 | £522 | £500 | £500 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +111% | P100 / +98% | P100 / +74% | P100 / +72% | P100 / +41% | P100 / +73% | P100 / +72% | P100 / +72% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 10 Nov–Thu 12 Nov (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | £190 | £204 (+9%) | £192 | £192 | n/a | n/a | £192 | £192 | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (51) | £235 (-11%) | n/a | n/a | £314 | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | £252 | n/a | n/a | £321 (-3%) | n/a (was £273) | £256 | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | £306 (-3%) | £284 | £273 | n/a | £323 | n/a | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.67 (60) | n/a | n/a | n/a | £186 (-1%) | n/a | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [774061637963678253](https://www.airbnb.co.uk/rooms/774061637963678253) | 0.54 | 3 | 4.5 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed |
| **Comp median (n)** | | | 4.54 (51) | £213 (2) | £255 (2) | £252 (3) | £232 (4) | n/a (0) | £322 (2) | £192 (1) | £224 (2) | |
| **Ours, Smoobu live rate/night 9 Nov 07:19Z (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | |
## Data gaps
- **Booking.com: NOT CHECKED** (not attempted; bot check on earlier days). This covers the P11 guest view and darts list price, and the P05/P06 Booking.com rates.
- **P05 15–21 Dec, why 0.81 (two 10% layers stacked) and not the non-stacking 0.900 seen today at 56 days:** the Airbnb reservation price breakdown was not seen (no host access). NOT CHECKED. A 5+ night long-stay rule on P05 is not in policy; its source (Smoobu Airbnb pricing rules or the Airbnb side) is NOT CHECKED.
- **P05 9 Nov:** Airbnb shows £547 against Smoobu's £1,403, plus a "Special offer". The Airbnb calendar and sync log were not opened, so the cause is NOT CHECKED.
- **P05 29 Dec and 21 Dec:** no comp is bookable on Airbnb for those single nights, so there is no comp evidence for the price.
- **Comp asks are unsold asks:** for a stay already sold (P05 15–21 Dec), the comps still bookable are the survivors (n=3). The comps that sold, and at what price, are unknown.
- **Comps absent on every stay** (P06 2, P08 4, P14 2, P17 2): whether they are inactive is NOT CHECKED. No replacements were made.
- **Thin samples:** P05 n = 0–4, P06 n = 3–5 on open stays, P11 10–12 Nov n = 2, P14 / P17 some stays n = 0–1.
- **P11 and P14 percentiles are biased low:** room price is compared with cleaning-inclusive comps.
- **P11 occupancy:** Smoobu 43.3% vs kpi_pack 41.4% puts `recommend` either side of the −5% threshold (raise +5% vs fix-listing).
- **No PriceLabs comp-set or Market Dashboard pull was made by this agent.** Market percentiles come from the market agent's `market.csv`.
