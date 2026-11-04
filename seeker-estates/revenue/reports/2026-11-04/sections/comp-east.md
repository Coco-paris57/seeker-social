# Competitor positioning: EAST batch (D = 2026-11-04)

Batch: P01, P04, P07, P09, P12, P15. P20 is not in this batch today.

**Method**
- **Comp ids.** Same comp ids as 3 Nov (`data/snapshots/2026-11-03/comps.csv`), with the same search boxes and guest counts: 4 guests for 2-beds and 3 for 1-beds. P04 uses a 2.5 km box, P09 1.8 km, the others 1.3 km.
- **One comp replaced (P01).** 20404597 has now been missing for 3 days in a row:
  - It was not returned for any trend stay on 3 or 4 Nov.
  - Today it was also missing from all 15 three-night and 15 seven-night stays tested, from 5 Nov to 3 Jan, in a 0.3 km box around it. The page still loads (4.67, 24 reviews), so the listing exists.
  - By the "inactive in the next 60 days" rule it is replaced by **1439222085860877494**: 0.70 km away, 2BR, sleeps 5, 4.93 from 42 reviews, Superhost, Guest favourite, lift and balcony. It is the nearest unused candidate within 1.3 km that showed up on 3 of today's 5 stays.
  - P04 comp 1343991336860365461 was not bookable on any stay today (its only price on 3 Nov was for 3-6 Nov). It stays in the set for now.
- **Access.** Plain public Airbnb pages (HTTP 200), same method as 26 Oct-3 Nov. There were 49 wide searches. Comps or our listings that the wide pass missed got a 0.3 km box search each (248 searches); prices from that pass are marked `*`. "–" means not bookable for that stay in either pass. **Booking.com was not tried.**
- **Price basis.** Airbnb guest-paid **all-in total ÷ nights**: after any discount, with cleaning and Airbnb fees **included**. Airbnb shows no separate taxes. Our own listings are priced the same way. PriceLabs and Smoobu figures are room-only (cleaning excluded) and are labelled as such.
- **Stays.** Trend stays are 6-8 Nov (next Fri-Sun), 10-12 Nov (next Tue-Thu), 24-27 Nov, 1-3 Dec, and new today **4-6 Dec** (the Fri-Sun 30 days out). Open-night stays come from `prices.csv` and `reservations.csv` (4 Nov):
  - **P04** (min 3): 9-12, 10-13, 18-21, 20-23, 21-24 and 18-24 Nov; 6-9, 9-12, 11-14, 14-17, 17-20 and 6-13 Dec.
  - **P04 double-sell check:** 4-7, 5-8, 4-8 and 6-9 Nov.
  - **P12:** **4-5 Nov (tonight)**, 12-14, 18-20 and 17-21 Nov, **26-27 Nov**, 30 Nov-3 Dec, 1-3 Dec, 7-10, 7-13 and 11-13 Dec.
  - **P09:** 10-12 Nov. This is the only gap before the 26 Nov handback; 13 Nov is booked.
- **Data written.** `data/snapshots/2026-11-04/comps.csv` was copied forward from 3 Nov (2,264 rows) under `flock` on `.comps.csv.lock`. **487 rows** were then appended under the same lock:
  - 356 `comp-east`: every stored comp × its stays, with NOT RETURNED rows kept;
  - 58 `east-refband`: the P12 band, not stored comps;
  - 73 `east-ours`: our own prices on the same stays, the P04 double-sell checks and the P12 4 Nov PriceLabs/Smoobu rate. These are not comps.
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` for 3-4 Nov: 37 entries, all Reyhan, all 4 Nov 01:24-01:31Z.
  - `get_neighbourhood_data` ×4 (P12, P04, P09, P01): all `all_operations_ok`.
  - `get_listing_prices` for P12 on 4-5 Nov.
  - `get_listing_date_overrides` for P09 on 4-26 Nov.
- **Smoobu:** one GET of rates for P12, P09 and P04 on 4-13 Nov. No guest data was read.

## What changed in PriceLabs since 3 Nov 06:00Z (this batch, `get_user_logs`)
| Listing | Change (Reyhan, 4 Nov) | Effect seen today |
|---|---|---|
| P12 2699998 | **4 Nov +15%, min 1** | PriceLabs price **302**, but user_price 209 and uncustomized 178 (`get_listing_prices`). Smoobu also holds 302, min 1, available. Airbnb shows **£382 all-in** for tonight. A +15% override on 178 would give about 205; why the price is 302 was NOT CHECKED. |
| P12 | 12-13 Nov -10% (same as before), min 2 | 12-14 Nov is £234 all-in (3 Nov: £239). |
| P12 | **16-25 Nov -15%** (was -10%) | 18-20 Nov £236 (3 Nov: £238); 17-21 Nov £212.75 (3 Nov: £218.25). |
| P12 | **26 Nov +15%, min 1** (was +25%) | PriceLabs 311. Airbnb **£363** for 1 night (3 Nov: £395). |
| P12 | **27 Nov-13 Dec -15%** (was -10% from 16 Nov) | 30 Nov-3 Dec £210.33 (3 Nov: £237.67); 1-3 Dec £225.50 (£258); 7-10 Dec £253.67 (£282.33); 11-13 Dec £310 (£320.50). |
| P04 3562176 | **9-24 Nov -15%, min 3** (was -10%) | 9-12 Nov £161.67 (3 Nov: £176.67); 18-21 Nov £173 (£191.67). See the conflict below. |
| P04 | Jan 2027 -10% min 3; Feb 2027 -10% min 4 | Outside this horizon. |
| P09 3318172, P01 3320302 | none | The P09 -5% override on 4-12 Nov (set 26 Oct) is still there (`get_listing_date_overrides`). |

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 4 Nov)
| Ref | Band (n) | P25/P50/P75/P90 today | 3 Nov | Market occ 30 / 60 (`pl_kpis.csv` 4 Nov) | Our PriceLabs average on sellable open nights, with its NL percentile (4 Nov-3 Dec / 4-31 Dec) |
|---|---|---|---|---|---|
| P01 | 2BR (147) | 214/257/330/422 | 213/258/330/420 | 34% / 29% | no open nights |
| P04 | 2BR (91) | 138/170/218/257 | 139/170/218/257 | 23% / 20% | £163.3, P45 / £188.2, P59 |
| P09 | 1BR (126) | 109/133/160/203 | 109/133/160/204 | 36% / 32% | £123.7, P40 / handback |
| P12 | 2BR (121) | 170/205/**235/292** | 170/205/242/296 | 40% / 34% | £231.7, P72 / £245.9, P78 (to 13 Dec) |

- **These are market bands, not comps.** PriceLabs does not say what horizon they cover or whether cleaning is included.
- **Band moves.** P12's P75/P90 eased again, by £7 and £4. The others moved by £0-2.
- **PriceLabs `occ_insights` demand rises:**
  - P12: 5-7 Dec, +9.2%.
  - P04: 3-5 Dec, +8.2%. Those P04 nights are booked.
  - P09: 7-10 Dec, +9.0%, after the handback.
  - All markets: 27 Dec-1 Jan.
- **Same comp, same stay vs 3 Nov:** the median change is **0.0%** on every ref and stay except P01 10-12 Nov (-3.6%, n=5), P01 6-8 Nov (+2.2%, n=2), P12 12-14 Nov (-1.7%) and P12 6-8 Nov (-0.7%).
- **Comp moves over £5:**
  - P01: 41905186 10-12 Nov 465→394 and 6-8 Nov 457→477; 1316210326145130709 10-12 Nov 416→364 and 24-27 Nov 372→357.33.
  - P09: 1501211872839579235 10-12 Nov 156.50→**176**.
  - P04: 1733027244747346716 10-12 Nov 114→103.
  - P12: 1120913156789373408 30 Nov-3 Dec 215.33→223; 1383544079404594066 12-14 Nov 293.50→286 and 7-10 Dec 323.67→330.
- **Reading.** The market held flat while our P04 and P12 prices fell 3-14% (Reyhan's overnight overrides) and P09 fell 8% (stale push, below).

## Next 14 days and key December dates: our percentile vs like-for-like comps (Airbnb all-in £/night)

**Next 14 days (4-18 Nov)**

| Ref | Stay | Ours | Comp median (n) | Our pctl | vs median | 3 Nov |
|---|---|---|---|---|---|---|
| P12 | **4-5 Nov (tonight, 1 n)** | **382** | 282 (band 3: 238/282/285) | **P100** | **+35.5%** | not bookable (min 2) |
| P04 | 9-12 Nov | 161.67 | 211 (2) | P0 | -23.4% | 176.67, P33, -20.4% |
| P04 | 10-13 Nov | 163.33 | 193.17 (4) | P25 | -15.4% | 178.33, P50, -7.7% |
| P09 | **10-12 Nov** | **143** | 172 (4) | **P0** | **-16.9%** | 156, P0, -6.3% |
| P12 | 12-14 Nov | 234 | stored 261.75 (2) / band 270.50 (5) | P0 / band P20 | -10.6% / band -13.5% | 239 |
| P12 | 17-21 Nov | 212.75 | stored 233.25 (6) / band 218.75 (11) | P33 / band P45 | -8.8% / band -2.7% | 218.25 |
| P12 | 18-20 Nov | 236 | stored 245.75 (4) / band 245.75 (8) | P25 / band P38 | -4.0% / band -4.0% | 238 |
| P04 | 18-21 Nov | 173 | 239.84 (2) | P0 | -27.9% | 191.67, -20.1% |

**Rest of November and December**

| Ref | Stay | Ours | Comp median (n) | Our pctl | vs median |
|---|---|---|---|---|---|
| P04 | 20-23 / 21-24 / 18-24 Nov | 185.33 / 183.67 / 162.33 | 248.33 (3) / 248.33 (3) / 187.58 (2) | P33 / P33 / P50 | -25.4% / -26.0% / -13.5% |
| P12 | **26-27 Nov (1 n)** | **363** | 284 (band 3: 213/284/297) | **P100** | **+27.8%** (3 Nov +39.1%) |
| P12 | 30 Nov-3 Dec | 210.33 | band 225 (15) | band P33 | -6.5% |
| P12 | 1-3 Dec | 225.50 | band 241.50 (11) | band P27 | -6.6% |
| P12 | 7-10 Dec | 253.67 | band 225 (13) | band P54 | +12.7% |
| P12 | 7-13 Dec | 245.83 | band 263 (13) | band P46 | -6.5% |
| P12 | 11-13 Dec | 310 | band 297 (7) | band P57 | +4.4% |
| P04 | 6-9 Dec | 212* | 222 (3) | P33 | -4.5% |
| P04 | 9-12 Dec | 215.67 | 257.66 (2) | P0 | -16.3% |
| P04 | 11-14 Dec | 221 | 222 (1) | P0 | -0.5% |
| P04 | 14-17 Dec | 213.67 | 260 (3) | P0 | -17.8% |
| P04 | 17-20 Dec | 224.33 | 241 (2) | P50 | -6.9% |
| P04 | 6-13 Dec (7 n) | 158.14 | 207 (1) | P0 | -23.6%; about -10% once the 15% weekly discount `policy.json` settles is taken out |

- **P12 band.** The band is every 2BR with 10+ reviews within 1.3 km in the same searches. Stored comps are included. The placeholder-priced 29297702 and 39790006 and our own listing are excluded.
- **Band quality.** The band's rating median is 4.83 on 4-5 Nov and 4.86 on 30 Nov-3 Dec. Against our 4.27 (15), `quality_premium` = **-0.15** (cap), the same as against the stored comps (4.86).

## Summary per property

**Columns**
- **Booked 30 / 60** = confirmed Smoobu nights ÷ sellable nights, for 4 Nov-3 Dec and 4-31 Dec. Handback nights, the deprioritised P04 2 Dec and P12 17 Nov, and orphan nights below min stay are excluded.
- **Pctl** = `rm/positioning.py` `percentile_rank` against comps priced for the same stay.
- **`recommend`** is run on the median comp percentile of our priced stays in each window, with `quality_premium`. A rating needs at least 5 reviews to count; otherwise `quality_premium` = 0.

| Ref | Our price range (Airbnb all-in £/n) | Comp median range | Our pctl range | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market | `recommend` 30 / 60 (comp pctl) |
|---|---|---|---|---|---|---|---|---|
| P01 | none open: booked to 30 Nov; 30 Nov-17 Dec handback gap block; 18-20 Dec booked | 430.50 (2) / 362 (6) / 353 (9) / 389 (7) / 478 (3) on the 5 trend stays | n/a | 4.67 vs 4.71 | 3 vs 32 (-29) | 0.0 (<5 reviews) | 100% / 100% vs 34% / 29% | raise-signal; nothing to sell |
| P04 (synced 1657…) | 158.14-224.33 | 187.58-257.66 (n 1-4) | **P0-P50; -0.5% to -27.9%** | **4.11 vs 4.83** | 9 vs 27 (-18) | **-0.15** (cap) | 57% / 50% vs 23% / 20% | raise +10% (P29) / raise +10% (P0) |
| P04 unsynced 1455… | **sells 4-7, 5-8, 4-8 and 6-9 Nov** (£515, £515, £648, £515 totals); 165.67-231.67 on open stays | as above | 2-5% over the synced listing on 9-13 Nov; -3% to +1% vs it on 18-24 Nov; 3-6% over it on 3-night December stays, and 17% over on 6-13 Dec (no weekly discount seen) | 4.69 vs 4.83 | 26 vs 27 (-1) | -0.056 | n/a | n/a |
| P09 | 10-12 Nov **143** (3 Nov 156) | 172 (4) | **P0 (-16.9%)** | 5.0 vs 4.58 | 3 vs 24.5 (-21.5) | 0.0 (<5 reviews) | 86% vs 36% / handback | raise +10% (P0) / n/a |
| P12 | 210.33-382 (see the tables above) | stored 225-294; band 218.75-297 | Nov multi-night band P20-P45; Dec band P27-P57; **1-night stays P100** | 4.27 vs 4.86 | 15 vs 18 (-3) | **-0.15** | 68% / 30% vs 40% / 34% (60-day window = 4-13 Dec, before the handback) | raise +10% (P25) / hold (P50) |
| P15 | no listing of ours | 146 (2) / 159.67 (5) / 155.50 (4) / 218 (1) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a |
| P07 | Blocked on purpose (policy). Not analysed. | | | | | | | |

## Supported positioning
- **P04: about -15% vs comp median (quality-adjusted parity); December hold, no cut.**
  - **Reasoning:** `quality_premium` is capped at -0.15 (4.11 from 9 reviews vs 4.83). `recommend` says raise +10% in both windows (57% booked vs 23% market; 50% vs 20%).
  - **Nov 9-24 after Reyhan's -15%:**
    - Below the supported level: 9-12 Nov (-23%), 18-21 (-28%), 20-23 (-25%) and 21-24 Nov (-26%).
    - At the supported level: 10-13 Nov (-15%) and 18-24 Nov (-13.5%).
  - **The overnight cut moved P04 further below what the evidence supports.** Raising the November stays toward -15% is supported.
  - **Barking December** (14 open nights, 6-19 Dec, all min 3):
    - Below the supported level: 9-12 Dec (-16%) and 14-17 Dec (-18%).
    - Above it: 6-9 Dec (-4.5%), 11-14 Dec (-0.5%, n=1) and 17-20 Dec (-7%).
    - The 6-13 Dec 7-night stay sits at about -10% once the settled weekly discount is taken out.
    - The NL percentile is P59. The evidence supports **holding** December, with at most +2-3% on 9-12 and 14-17 Dec. It does not support a cut.
  - Comp n is only 1-4 per stay.
- **P09 10-12 Nov: raise to about comp parity, +15-20% on the guest price (about £170/n all-in).**
  - **Reasoning:** the stay is P0 at -16.9% vs 172 (n=4), on 86% booked vs 36% market. Our 5.0 rests on 3 reviews, so `quality_premium` is 0 and parity is the supported level.
  - **Two things hold the price down:**
    1. The -5% override on 4-12 Nov is still on, and the planned +10% (a-handback-lastnights) was **not applied**.
    2. **Smoobu holds 100 / 110 on 10 / 11 Nov while PriceLabs shows 115 / 125.** PriceLabs last refreshed and pushed P09 on 3 Nov 07:37Z (`listings.csv`). Airbnb sells at the Smoobu rate (£142.83/n all-in).
  - These are the last 3 nights before the 26 Nov handback, 6 days out.
- **P12 multi-night stays: hold, no further cut.**
  - **Reasoning:** after Reyhan's -15% (16-25 Nov and 27 Nov-13 Dec), the November stays sit at band P20-P45 (-2.7% to -13.5%) and December at band P27-P57 (-6.6% to +12.7%). That is between the -15% the review gap supports and parity.
  - `recommend` gives raise +10% for the next 30 days (68% booked vs 40%) and hold for 4-13 Dec (30% vs 34%).
  - 12-14 Nov is the cheapest point (band -13.5%) and is already at the supported level.
- **P12 4 Nov tonight: at most the band median (about £282 all-in), not £382.**
  - **Reasoning:** £382 is P100, +35.5% vs 1-night band prices of 238, 282 and 285 (n=3).
  - It is a same-day orphan night, and with a -0.15 quality cap the evidence supports about -15% to 0% vs that median (£240-282 all-in).
  - The +15% override and the unexplained PriceLabs price of 302 (against a Your Price of 209) push it to the top. The 3 Nov Smoobu-vs-PriceLabs gap (170 vs 196) is closed: both now show 302.
- **P12 26 Nov (1 night): about -15% to 0% vs the 1-night band median (£240-284 all-in), not £363.**
  - **Reasoning:** £363 is still P100, +27.8% vs 213, 284 and 297 (n=3), even after Reyhan cut +25% to +15%.
  - A -15% override, matching the nights on either side, with min 1 kept, fits the evidence. n=3.
- **P01: no action.** There are 0 sellable nights before the 20 Dec handback. The comp set is kept for trend only.
- **P15: reference only.** The 1-bed median is £146-160 all-in in November and £155.50 on 1-3 Dec.

## Critical / high findings
- **CRITICAL: P04 double-booking exposure is still live, day 5 (t-p04-doublebook NOT fixed).**
  - Checked 4 Nov in an Airbnb public search: the unsynced Barking listing **1455876748739910219 is bookable 4-7 Nov (£515), 5-8 Nov (£515), 4-8 Nov (£648) and 6-9 Nov (£515)**.
  - At the same time the Booking.com guest is in residence (3-6 Nov), and 6-9 Nov is a confirmed Airbnb stay (`reservations.csv` 4 Nov). The synced 1657859794156786222 correctly shows none of these stays.
  - **No double-booking has happened yet.** 1455 still sells those nights, so no booking has closed them. 1455's own bookings are not visible in Smoobu or PriceLabs (NOT CHECKED).
  - **Action:** Corentin should close 4-9 Nov on 1455… now, or unlist it.
- **HIGH: P04 -15% on 9-24 Nov conflicts with a standing decision.**
  - Reyhan set it on 4 Nov 01:30Z (`get_user_logs`). `policy.json` (24 Oct) records Corentin's **-8% on 1-25 Nov**.
  - The comp evidence does not back a deeper cut: the stays are already 13-28% under the comp median, at P0-P50.
  - **For Corentin to confirm.** This is not a new proposal.
- **HIGH: P09 10-11 Nov push gap.**
  - Smoobu holds 100 / 110 against PriceLabs 115 / 125. PriceLabs last refreshed P09 on 3 Nov 07:37Z, about 24 hours stale.
  - Airbnb sells 10-12 Nov at £143/n all-in, P0 and -17% vs comps. a-handback-lastnights (+10%) was not applied.
- **HIGH: P12 tonight (4 Nov) is priced at the top of the 1-night market.**
  - £382 all-in, P100, +35.5% (n=3). The PriceLabs price is 302 against a user_price of 209 under a +15% override. The cause is NOT CHECKED.
  - Unless it is cut today, the night will most likely go unsold.
- **MEDIUM: P12 26 Nov** is still P100 (+27.8%) after the +25% → +15% change.
- **MEDIUM: P04 November is deeper than the review gap explains** (-23% to -28% on 9-12 and 18-24 Nov).

## Plan items in this batch (logs read 4 Nov)
| Item | Status |
|---|---|
| t-p04-doublebook | **NOT fixed** (above). |
| t-p12-4nov | **Partly done.** Min 1 is set and Smoobu now matches PriceLabs (302 / 302), but at +15% the night is P100 (+35.5%). |
| t-p12-26nov-price | **Partly done.** +25% → +15% (PriceLabs 311, £363 all-in), still P100 (+27.8%). |
| a-handback-lastnights (P09 10-12 Nov +10%) | **NOT done.** The -5% override is still on, and Smoobu is below PriceLabs. |
| a-p04-dec | No P04 December edit since 3 Nov. December is at -0.5% to -18% (see the positioning above). |
| a-p13-record items in this batch | P12 -10% on 16 Nov-13 Dec was replaced by -15% on 16-25 Nov and 27 Nov-13 Dec. This conflicts with no standing decision. Reyhan's P04 -10% is now -15%, and still conflicts with Corentin's -8%. P12 17 Nov is deprioritised and not re-raised. |
| Base changes | No `base_price` change on P01, P04, P09 or P12 since 3 Nov 06:00Z. |
| 18 Oct base rises, running effect | Bookings made from 19 Oct vs 4-18 Oct (`reservations.csv` 4 Nov): P01 1 vs 1; P09 1 vs 3; P12 5 confirmed + 1 cancelled vs 2. **No change since 3 Nov.** |

## Comp tables

Airbnb, guest-paid all-in £/night including cleaning and fees; checked 2026-11-04. "3 Nov x" is the same comp and stay on 3 Nov, shown where it differs by more than £1. The full source for each row is in `data/snapshots/2026-11-04/comps.csv`. `*` means the price was found by the 0.3 km second pass.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.67 (3)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec |
|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | 193.33 (3 Nov 186.67) | – | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 477 (3 Nov 457) | 394 (3 Nov 465) | 424.33 (3 Nov 449.67) | 409 | 575* |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.45 (154) | none listed | – | 188 (3 Nov 195) | 195 (3 Nov 200) | 208 | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (55) | Lift | – | 364 (3 Nov 416) | 357.33 (3 Nov 372) | – | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.61 (28) | Lift/River view/balcony | – | – | 255 | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | – | 389 | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | 353 | 422 | 454 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.81 (16) | Lift | – | 285 | – | 335 | – |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.64 | 5 | 4.37 (38) | Paid parking on premises | 384 | 384 | 379 | 384 | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (42) | Lift/Private patio or balcony/Superhost/Guest favourite (added 4 Nov, replaces inactive 20404597) | – | 360 | – | 416 | 478 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.71 (32.0) | | **430.50** (2) | **362** (6) | **353** (9) | **389** (7) | **478** (3) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.11 (9); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 4 Nov-6 Nov | 6 Nov-9 Nov | 9 Nov-12 Nov | 10 Nov-13 Nov | 18 Nov-21 Nov | 20 Nov-23 Nov | 21 Nov-24 Nov | 18 Nov-24 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | 257.67 | – | – | – | 257.67 | 257.67* | 257.67 | 257.67 | 257.67 | 257.67 | 250.17 | – | – | – | 260* | 260 | – |
| [1083936003491396261](https://www.airbnb.co.uk/rooms/1083936003491396261) | 1.24 | 5 | 4.9 (41) | Superhost (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | 125 | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (24) | Free parking on premises/Superhost/Guest favourite | – | 103 (3 Nov 114) | 138.67 | – | – | – | – | – | 103.33 (3 Nov 112) | – | – | – | – | – | – | – | – | – | – |
| [1343991336860365461 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1343991336860365461) | 1.81 | 6 | 4.43 (14) | Paid parking on premises | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.82 (39) | Free parking on premises/Superhost (added 30 Oct) | – | – | 248.33 | – | – | – | – | – | – | – | 248.33 | 248.33 | – | 293.33 | 293.33 | – | 293.33 | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | – | 222 | – | 222* | 222 | – | – | – | 222 | 222 | – | – | – | 222 | 222 | 222 | 222 | 222 | 207 |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 | 6 | 4.85 (27) | Parking (in name) (added 1 Nov) | 173 | 173 | 178 | – | – | – | 164.33 | 164.33 | 164.33 | – | 178 | 178 | – | 178 | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **161.67** | **163.33** | **173** | **185.33** | **183.67** | **162.33** | **212*** | **215.67** | **221** | **213.67** | **224.33** | **158.14** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | 171.67 | 165.67 | 171.33 | 175.33 | 180.67 | 179.67 | 157.50 | 224.33 | 225 | 227 | 219.67 | 231.67 | 184.43 |
| **Comp median (n)** | | | 4.83 (27) | | **173** (1) | **173** (3) | **213.17** (4) | **222** (1) | **222** (1) | n/a (0) | **211** (2) | **211** (2) | **193.17** (4) | **239.84** (2) | **248.33** (3) | **248.33** (3) | **187.58** (2) | **222** (3) | **257.66** (2) | **222** (1) | **260** (3) | **241** (2) | **207** (1) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | P0 (-23.4%) | P25 (-15.4%) | P0 (-27.9%) | P33 (-25.4%) | P33 (-26.0%) | P50 (-13.5%) | P33 (-4.5%) | P0 (-16.3%) | P0 (-0.5%) | P0 (-17.8%) | P50 (-6.9%) | P0 (-23.6%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec |
|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 168 | 168 | – | – | – |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 165 | 165* | – | – | – |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.73 (22) | none listed | – | – | 159.33 | 168 (3 Nov 166.50) | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | – | 200.50 | 196.67 | 248.50 | 248.50 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | 176 (3 Nov 156.50) | – | 242.50 (3 Nov 248) | – |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | 242.67 (3 Nov 244.33) | – | – |
| **Ours** | | | | | not bookable | **143** | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.58 (24.5) | | **166.50** (2) | **172** (4) | **196.67** (3) | **242.50** (3) | **248.50** (1) |
| **Our pctl (vs median)** | | | | | – | P0 (-16.9%) | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 4 Nov-5 Nov | 12 Nov-14 Nov | 18 Nov-20 Nov | 17 Nov-21 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 7 Dec-10 Dec | 7 Dec-13 Dec | 11 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.50 (3 Nov 242.50) | 237.50 (3 Nov 242.50) | 225 | 237.50 | – | – | 237.50 (3 Nov 240) | 237.50 | 218.75 | – | 225 | 225 | 212.50 | 237.50 |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (18) | Paid parking on premises | – | – | 311.67 | – | – | – | – | – | 297.50 | – | 316.67 | – | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (78) | Superhost | – | – | 201.33 | – | – | – | – | – | 200.50 (3 Nov 198.75) | – | 223 (3 Nov 215.33) | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | – | 175 | 185 | 220 | – | – | – | 185 | 185 | – | 208.33 | 220 | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (119) | Superhost/balcony/Guest favourite | – | 254 | 250.67 | 254 | – | 282 | – | 254 | 247.75 | 284 | 250.67 | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | 1042.50 (3 Nov 1035) | 1035 | 1032.33 | 1035 | 1035 | – | 1035* (3 Nov 1052.50) | 1035 | 1031 | 1043 | 1032.33 | 1032.33 | 1029.67 (3 Nov 1034.17) | 1035 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | – | 282 | 314.33 (3 Nov 312.67) | 298 | 374 | – | 286 (3 Nov 293.50) | 290 (3 Nov 297) | 297.25 (3 Nov 300.50) | – | 295.67 | 330 (3 Nov 323.67) | 336.83 (3 Nov 331.17) | 350.50 (3 Nov 346) |
| **Ours** | | | | | not bookable | not bookable | not bookable | **225.50** | not bookable | **382** | **234** | **236** | **212.75** | **363** | **210.33** | **253.67** | **245.83** | **310** |
| **Comp median (n)** | | | 4.86 (18) | | **237.50** (1) | **245.75** (4) | **237.83** (6) | **245.75** (4) | **374** (1) | **282** (1) | **261.75** (2) | **245.75** (4) | **233.25** (6) | **284** (1) | **237.83** (6) | **225** (3) | **274.66** (2) | **294** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | P25 (-8.2%) | – | P100 (+35.5%) | P0 (-10.6%) | P25 (-4.0%) | P33 (-8.8%) | P100 (+27.8%) | P17 (-11.6%) | P67 (+12.7%) | P50 (-10.5%) | P50 (+5.4%) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec |
|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 159.67 | 170.50 | 218 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | – | 157 | 164.33 | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | – | 135 | 135 | 135 | – |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | 159.67 | – | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.92 (25) | Free parking on premises/Guest favourite | – | – | – | 181 | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (201) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | – | – | – | 140.50* | – |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | 146.67 | – | – |
| **Comp median (n)** | | | 4.84 (14) | | n/a (0) | **146** (2) | **159.67** (5) | **155.50** (4) | **218** (1) |

- **Comp attributes.** Lift, view and parking come from earlier amenity reads (25 Oct-4 Nov). Ratings and review counts come from today's search cards where returned, otherwise from 3 Nov. Comp cancellation policies are NOT CHECKED.

## P07 Woolwich, 1-bed
Blocked on purpose (policy). No comps, no advice.

---

Data gaps:
1. **Booking.com NOT CHECKED** (not tried). The comps are Airbnb only, and our Booking.com displayed prices are not covered.
2. **Thin comp n.**
   - P04 has 1-4 priced comps per stay. 593405916827094880 prices £222 on every 3-night date, and the 11-14 Dec and 6-13 Dec readings rest on n=1. 1343991336860365461 was not bookable on any stay today.
   - P12 stored comps have n=1-6, so P12 positioning rests on the band. The band's sleeps are NOT CHECKED, and its 1-night readings are n=3.
   - P09 10-12 Nov has n=4. P15 6-8 Nov has n=0, and 4-6 Dec is n=1 for P04, P09, P12 and P15.
3. **4-6 Dec is new today** and has no 3 Nov baseline.
4. **P12 4 Nov price.** Why the PriceLabs price is 302 against a user_price of 209 and an uncustomized 178 under a +15% override is NOT CHECKED (`get_customizations` was not read). `prices.csv` 4 Nov starts on 5 Nov, so tonight's rate comes from `get_listing_prices` and the Smoobu GET.
5. **P04 1455….** Its bookings, the account that holds it, its pricing rule and its cleaning fee are NOT CHECKED. Bookability comes from public search only.
6. **P09 push.** The Smoobu < PriceLabs gap on 10-11 Nov is seen in the Smoobu rates GET and `prices.csv`. Whether a newer PriceLabs refresh is pending was NOT CHECKED.
7. **PriceLabs.** The NL percentiles are a market band, not comps. Competitor Listings and Market Dashboard were not used, and the raw neighbourhood JSON was not saved. Overrides were read in full only for P09; for the other listings, changes come from `get_user_logs` (3-4 Nov).
8. **Not analysed:** P15 (no listing of ours) and P07 (blocked, policy). Cancellation policies, ours and comps, are NOT CHECKED.
