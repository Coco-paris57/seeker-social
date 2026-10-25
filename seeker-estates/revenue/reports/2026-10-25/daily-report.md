# Seeker Estates - Daily revenue report, 2026-10-25

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval.**

Inputs: `kpi_pack.json`, `kpi_summary.md`, `sections/{occupancy,pricelabs,channel,market,comp-east,comp-central,comp-west}.md`, `data/snapshots/2026-10-25/comps.csv` (297 rows, first real Airbnb comp set: East and Central only, West has 0), `data/snapshots/2026-10-25/listings.csv` (min/max), `prices.csv`, `reports/2026-10-24/daily-report.md` and `demand/`, `data/policy.json` (read first), open dashboard actions. No guest data used.

Policy respected: P02/P03/P06/P07 blocks are intentional; P14 numbers only (not included in any setting below); Visibility Booster commission, 15%/20% stay discounts and Booking.com promotion stacking are settled; P13 is one flat; nights after handbacks (P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec) are not inventory. Not re-raised: P04 2 Dec, P12 17 Nov, P11 darts (+5%, your 24 Oct call), P13 twin order, P09 Airbnb rules screen, P12 key safe, P20 max guests 4, P04 min 3.

## Executive summary

1. **Your 24 Oct instruction (keep Booking.com discounts, cut PriceLabs-side discounts) has not been applied yet.** Live `get_customizations` (about 07:10Z) still shows last-minute discounts on every sellable listing, Aggressive occupancy on P04/P11/P12, and Booking Recency on P04/P11/P12 (on by default on the rest). Inside the next 14 days, final price vs PriceLabs' uncustomized price is **P04 -32.1%, P11 -17.7%, P12 -16.7%, P05 -12.3%, P20 -10.7%** (pricelabs.md item 3). Row 1 gives the exact settings for each listing.
2. **Booking.com is selling again, but at about half of PriceLabs' uncustomized price.** Two bookings were made on 24 Oct, both after the 13:38 markup overwrite. They are the first on Smoobu flats since 10 Oct. P12 5-12 Nov paid £932.90 and P04 14-18 Nov paid £437.69. That is **0.513x and 0.503x the uncustomized price**: PriceLabs discounts first, then Booking.com's stack on top (channel.md, pricelabs.md item 4).
3. **Last 30 nights: occupancy 70.3%, ADR £175.56, RevPAR £123.34, revenue £48,104.45** (kpi_pack; 24 Oct: 69.7% / £174.56 / £121.74). **Next 30 days, handback-aware: 52.7% booked (166/315), against 51.4% yesterday on the same method.** Next 60: 45.2%. The rise comes from P12 (37.9% -> 62.1%) and P04 (20.7% -> 34.5%).
4. **The Airbnb pace trigger is met.** There were 0 Airbnb bookings on 24 Oct and 0 on 25 Oct up to 07:20Z. The pace for 20-24 Oct is 0.40/day, against 1.67/day for 11-19 Oct (channel.md §2). So I treat it as a slowdown at tomorrow's review: no base rise unless a flat passes the test.
5. **First real comps confirm that we are cheap where we book well:** P12 is 22.5% under the comp median while 64% booked, and P06 sits at P17 while 77% booked. They also confirm that **Airbnb sells below PriceLabs before cleaning** on P06 (0.765x), P08 (0.85x), P12 (0.81x) and P20 (0.90x). The likely cause is the Smoobu Airbnb default rules (inferred, not seen).

## What changed since 24 Oct

### The 18 Oct rises: status one day before the review
Sources: occupancy.md (bookings made 19-25 Oct vs 5-18 Oct), comp-east, comp-central.

| Ref | Base | Booked next 30 vs market | Bookings made 19-25 Oct | Comp position today | Read |
|---|---|---|---|---|---|
| P01 | £253 | 100% vs 33% | 1 | 0 open nights | Out of the test |
| P05 | £550 | 70.4% (blocks excl.) vs 38% | **0** | P50 on thin comps (n = 2-4); rating 4.76 vs 4.29 | Occupancy passes, booking count fails so far |
| P06 | £357 | 76.9% (blocks excl.) vs 44% | **0** | **P17 to P33, -17% / -19% vs median**; rating 4.56 vs 4.64 | Only 3 open nights in 60, so the count test cannot work |
| P09 | £176 | 69.0% vs 36% | 1 (Airbnb, paid 0.77x) | About £184 all-in vs comp median £165 (n = 3); 2 reviews | Passes; hold anyway (handback 26 Nov) |
| P11 | £286 | 44.8% vs 44% | **0** (none for 21 days) | P7 room-only, biased low (comps include cleaning) | Fails |
| P12 | £284 | 62.1% vs 40% | 1 (Booking.com, 24 Oct) | **P0: Airbnb £211.66 vs median £273 (-22.5%)**; rating 4.27 vs 4.88 | Passes |

- Raised flats: 0.43 bookings/day after the rise vs 0.79/day before.
- **The unraised flats slowed as well:** P13 0 vs 6, P08 0 vs 1, P10 0 vs 2, P02 0 vs 2, P20 1 vs 2, P04 1 vs 0. In total 2 vs 13.
- So the slowdown is portfolio-wide (Booking.com stall since 3-10 Oct, then Airbnb from 20 Oct). It is not specific to the rises.

### Per property

| Ref | Change since 24 Oct |
|---|---|
| P01 | No change. Sold out to the 20 Dec handback. |
| P02 | Intentional block. The Vrbo copy was last pushed 24 Feb. |
| P03 | Intentional block. No data. |
| P04 | **New Booking.com booking, 14-18 Nov, £437.69** (sold on the Monthly rate; you have since rebuilt that plan). Booked next 30 is 34.5% vs 26% market (was 20.7%). Reyhan's 24 Oct edits: **-8% on 1-24 Nov, -5% on 6-22 Dec and -5% on 1-28 Feb** (the Dec and Feb cuts are not in policy). Next 14 days: -32.1% vs uncustomized. The 25 Oct night stayed closed (your min-3 rule). |
| P05 | No booking since the £550 base. **The flat last-minute -25% hits each night as it comes within about 13 days of arrival:** 6 Nov fell 594 -> 448 on 24 Oct, and 7 Nov fell 630 -> 459 today. Both are about -25%, and neither is logged. The 27-28 Oct block is a delivery (policy). |
| P06 | No change. 3 open nights (5-7 Nov: £331 / £361 / £365). Comps put us at P17-P33. Airbnb shows 0.765x PriceLabs before cleaning. |
| P07 | Intentional block. |
| P08 | **26 Oct changed from open to Blocked (reason unknown).** We are the cheapest listing in the comp set (P0, -46% / -23%), and booked 32% vs 51%: fix-listing. Airbnb shows 0.85x PriceLabs. 1 Nov is at the £150 floor. |
| P09 | **Reyhan set -5% on 26-31 Oct with min stay 3** (not in policy). 26-28 Oct went from £154 to £145. The P09 13-15 Nov booking now shows in PriceLabs. |
| P10 | No change. Sold out to the 18 Nov handback. |
| P11 | Still no booking (last one made 4 Oct, 21 days ago). **The cause of the 24 Oct -10.9% is now visible in the settings:** Booking Recency is ON (5% after 15 days without a booking, up to 15%), occupancy is Aggressive and last-minute is -18%. 23-24 Nov fell another 16-19% today. Darts nights are left as you decided. |
| P12 | **New Booking.com booking, 5-12 Nov, £932.90.** Booked next 30 is 62.1% vs 40% market (was 37.9%), and pace to 30 days is now -0.1% vs last year (was -26.8%). The booking leaves 12-13 Nov as a 2-night run (£221 / £288, min 2), which is sellable. Airbnb shows 0.81x PriceLabs. |
| P13 | **Reyhan changed the base from £235 to £250 on 24 Oct 21:14Z, and added +10% on 20-21 Nov** (England v NZ is now £227/£228, above its £215 fortnight). Neither is in policy. 25-26 Oct got +10% as proposed. **31 Oct still carries +10%** (policy says it was reset). The twin gap is now about +20% to 23 Nov and -9% after. |
| P14 | Numbers only: 0% booked vs 40% market; 82% of open nights at the £500 minimum. |
| P15-P19 | Not connected (second account). |
| P20 | No booking. Booked next 30 is 10.3% vs 35% market. The 20-21 Nov block is a delivery (policy). **At D+30, Airbnb shows £333.50 all-in, +12.2% over the comp median of £297, with 0 reviews.** Free parking on site is unique among the 12 comps. 12 event nights are £238 under their fortnight. |
| Market | Market occupancy moved 1 point or less everywhere, flat for a third day. Missed compression: **24 nights / £498** (24 Oct: 29 / £534). New O2 dates: J. Cole 2 Nov (we are priced above), Mariah Carey 30 Nov (P20 £45 under), Kehlani 8 Dec (P04 £5 under). |

## Actions - 2026-10-25

**Formula:** expected effect = price change on open nights x sell-through. Sell-through is the flat's own booked share of the next 30 days (kpi_pack `forward_occ_30`, blocks excluded). Price change is in PriceLabs £. What guests pay is lower after channel discounts: the two 24 Oct Booking.com bookings paid 0.61-0.67x PriceLabs final. The figures are upper bounds, because elasticity is not measured. Every move is inside PriceLabs min/max (`listings.csv`: P04 £90-2,000; P05 £150-2,500; P06 £200-800; P11 £120-1,200; P12 £100-2,000; P20 £220-1,800).

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P04 P05 P06 P08 P09 P11 P12 P13 P20 | **a-discount-cut (new): apply your 24 Oct instruction, keeping Booking.com discounts and cutting PriceLabs-side ones.** Per-listing settings are in the table below. **Set each value explicitly to 0%. Do not just switch the toggle off:** when a toggle is off, PriceLabs falls back to its own default (Booking Recency 5-15%; last-minute Market Driven, e.g. P06 "40% same-day, 0% after 12 days"). Leave far-out premiums as they are (they only add). P14 is excluded (special setup). **Your own negative overrides need your decision, not ours (see "Conflict" below).** | PriceLabs > each listing > Customizations > Last-Minute Prices / Occupancy Based Adjustments / Booking Recency Factor; Date Specific Overrides | pricelabs.md items 1-4: next-14-day final vs uncustomized P04 -32.1%, P11 -17.7%, P12 -16.7%, P05 -12.3%, P20 -10.7%. The 24 Oct Booking.com bookings paid **0.513x / 0.503x** uncustomized. P05's flat -25% cut 7 Nov from 630 to 459 overnight. Booking.com keeps Last Minute 10% (0-30 days), Mobile and Genius, so a last-minute layer stays. | **About £1,176 PriceLabs £ over the next 30 days (upper bound). Next 14 days:** P04 £606 x 34.5% = £209; P05 £314 x 70.4% = £221; P12 £279 x 62.1% = £173; P11 £255 x 44.8% = £114; P20 £336 x 10.3% = £35 (£752). **Days 15-30:** P04 £669 x 34.5% = £231; P11 £334 x 44.8% = £150; P05 £37 x 70.4% = £26; P20 £168 x 10.3% = £17 (£424). P04 and P20 include their overrides; if you keep those, it is lower. | Corentin (apply) / Claude (watch daily) | 2026-11-01 |
| 2 | P05 P06 P09 P11 P12 | **a-review-1026 (update): decision rule per flat for tomorrow.** Test: booked next 30 at least market + 10 points AND at least 1 booking made 19-26 Oct. Results are in the review table below. | PriceLabs > Base price; Date Specific Overrides | See the review table. The Airbnb pace trigger is met (0.40/day vs 1.67/day), so no rise without a pass. | P05 pass: 10% x 8 open nights x £471 x 70.4% = **£265**. P06: 10% x £1,057 x 76.9% = **£81**. Others £0. | Corentin (approve) / Claude (run) | 2026-10-26 |
| 3 | P06 P08 P12 P20 (P09) | **a-airbnb-rules (update): Airbnb sells below PriceLabs before cleaning on four more flats.** Please send the Smoobu Airbnb default pricing rules for P06, P12, P20 and P08 (P09 is already requested). If they are like Shepherd's Bush's old set (last-minute -15% within 28 days, early bird -12/-15%, 5-night -8/-10%), take them back to stay discounts only (7+ nights -15%, 28+ -20%). Alternatively, keep one visible Airbnb last-minute discount as the single last-minute layer, now that PriceLabs' is being cut, and price it in as you prefer. | Smoobu > Channel Manager > Airbnb > each listing > Default pricing rules; Airbnb > listing > Pricing > Discounts | comp-central: P06 = 0.765 x PriceLabs + £129, P08 = 0.85 x PriceLabs + £149 (fitted on 2-, 3- and 4-night stays). comp-east: P12 £274 room vs PriceLabs £339 = 0.81x; P20 £851 vs £945 = 0.90x at D+30, outside its 0-14 day rule. Policy: a post-21 Oct gap is unexplained. Airbnb revenue share: P20 100%, P08 76%, P06 72%. | Not quantified until the rules are seen. | Corentin | 2026-10-28 |
| 4 | P04 P09 P12 P20 | **a-amenities (new): free Airbnb listing fixes. Add only what is true** (facts from `build/properties.py`). **Lift:** P04, P09, P12. **Balcony:** P04, P09, P12. **View:** P04, P12 (Canary Wharf). **P20:** check that "Free parking on premises" is ticked, and make the first photo show the parking or the view. The title already leads with Parking (policy). P01 needs the same, but it has 0 open nights. | Airbnb > Listing > Amenities; Photo tour | comp-east: 0 of our 5 East listings list a lift (15 of 57 comps do); 11 of 57 comps list a view. P20's free parking is unique among its 12 comps (7 have paid parking). Airbnb bottom-10% quality flag on P04 and P12 (policy). P20 is 10.3% vs 35% booked and +12.2% vs the comp median with 0 reviews. | Not quantified (conversion). | Corentin | 2026-10-30 |
| 5 | P13 | **a-p13-record (new): confirm Reyhan's 24 Oct changes so policy can record them.** Base £235 -> £250 (21:14Z); +10% on 20-21 Nov; **31 Oct still +10%** (£187 vs £168 uncustomized), although policy says 31 Oct-3 Nov was reset. Keep or reset 31 Oct? | PriceLabs 3064856 > Date Specific Overrides (copied to 3090701) | pricelabs.md item 6; comp-west. Next 30 is at P14 (parent) with booked 43% vs 41%: rule +5%. The £250 base (+6.4%) already covers that, so no further rise. | £0 (record only). | Corentin | 2026-10-27 |
| 6 | P04 | **a-p04-monthly (new): check the Booking.com rate-plan rebuild worked.** On any date in Nov-Dec, a 4-night search should show only Standard / NR (and Weekly only for 7+ nights). Monthly (rebuilt, 28-night minimum) should show only for 28+ nights. If the rebuilt Monthly has a new ID, confirm it is derived ("Not XML") or mapped in Smoobu. Also: why was Booking.com Last Minute 10% missing from the 14-18 Nov stack? | Booking.com extranet > Barking > Rates & Availability > Rate plans; Promotions | channel.md: 4 nights priced at Monthly -20% x occupancy -5% x Mobile x Genius = 0.6156 of list, -£142 at list. Last Minute was not in that stack, although the stay was 21 days out. | Not quantified (protects ADR on future short stays). | Corentin | 2026-10-27 |
| 7 | P11 P12 P13 | **a-bcom-lm (new, advice): which Booking.com Last Minute deal is live?** P12's booking had **Last Minute 15%**, while your 24 Oct change was 10%. There may be two deals; Booking.com applies only one. Keep the one you intend, and tell us the value so the model is right. | Booking.com extranet > each property > Promotions | policy `booking_discount_stack_24oct` (0.556 stack incl. LM 15%); `monitoring.booking_last_minute_24oct` (10%). | Not quantified. | Corentin | 2026-10-27 |
| 8 | Portfolio | **a-deposit (new, advice): decide on the deposit / ID requirement before Airbnb's 20 Nov rule change.** For Airbnb reservations booked on or after 20 Nov 2026, Airbnb's updated policy restricts collecting ID documents and requiring registration on another site, except where law or a building rule requires it or the stay is 28+ nights. Options: fold the waiver into the nightly rate for short stays, and show any requirement before booking. | Airbnb listing rules / house rules; guest verification flow | deposit-competitors.md: 3 of 40 comps mention any deposit (max £345) vs our £1,000 hold; 1 of 40 mentions a waiver (£20) vs our £109; 10 of our 11 Airbnb listings mention all four requirements. deposit-guest-impact.md: the waiver adds about 14-17% to a typical stay. | Not quantified (conversion and policy risk). | Corentin | 2026-11-13 |
| 9 | P11 P04 | **t-channel-gaps (update).** Camden has now gone **21 days** without a booking (last made 4 Oct), and it sells on Booking.com only. 16 open nights in the next 30, 28 in 60. Relisting on Airbnb is still the main volume lever. Barking's Airbnb account connection is still unconfirmed. | Airbnb (Camden); Smoobu > Channels | occupancy.md; comp-central (P11 comps on Airbnb, median £293-£322 all-in). | Not quantified. | Corentin | 2026-10-30 |
| 10 | Portfolio | **t-comps (update).** `comps.csv` now has 297 real Airbnb comp rows for East and Central. **Still missing:** West (P13: 0 rows, the fetch failed in that agent), Booking.com (bot challenge) and comp occupancy. So **RGI is still not measurable**. Get the data: switch on PriceLabs Competitor Listings ("not enabled for this account") and re-run West comps tomorrow with the same ids. | PriceLabs > Neighborhood data > Competitor Listings; comp-west run | comp-east / comp-central / comp-west data gaps. | £0 (measurement). | Claude / Corentin | 2026-10-26 |
| 11 | Portfolio | **a-tidy (update).** `rm/config.py` still has the Booking.com markup at 0.20. Change it to 0.15 (policy since 24 Oct) so that `channel_economics` stops overstating Booking.com net (£102 vs about £54-60 observed per £100). Please also confirm which markup was live before 24 Oct: policy says +20% in one place and +30% for about 11 months in another. That changes every older Booking.com paid-vs-price comparison. | `rm/config.py` CHANNELS; `policy.json` | channel.md "Config status" and §4. | £0. | Claude (after your OK) / Corentin (confirm) | 2026-10-27 |

### Row 1 detail: per-listing settings (your instruction)

| Ref (PriceLabs id) | Last-minute: now -> proposed | Occupancy profile: now -> proposed | Booking Recency: now -> proposed | Negative overrides on open nights |
|---|---|---|---|---|
| P04 (3562176) | -25% / 15 d gradual -> **0%** | Aggressive custom (0-15 d -30% ... -20%; 16-30 d -20% ... -10%) -> **custom, 0% on every band** | ON (default 5-15%) -> **0%** | **Yours / Reyhan's: ask** (-8% 1-24 Nov; -5% 6-22 Dec; -5% Feb). Older ones -> 0%: 25-30 Nov -8%, 3-5 Dec -8%, 23-31 Dec -5% |
| P11 (3064196) | -18% / 15 d gradual -> **0%** | Aggressive custom -> **custom 0%** | ON -> **0%** | -1% 28 Oct-13 Nov, -5% 14-17 Nov -> 0% |
| P12 (2699998) | -25% / 15 d gradual -> **0%** | Aggressive custom -> **custom 0%** | ON -> **0%** | -4% 26 Oct-15 Nov, -8% 18-21 Nov, -2% 22-28 Nov, -1% 29 Nov-13 Dec -> 0% |
| P05 (3166592) | **-25% / 15 d FLAT** -> **0%** | Custom "Default" (0-15 d -15% ... -5%; 16-30 d -10% ... -5%) -> **custom 0%** | Off, so the default applies -> **0%** | -3% 10-15 Nov, -2% 29-30 Nov -> 0% |
| P20 (3547481) | -25% / 15 d gradual -> **0%** | Market Driven -> leave | Off, so the default applies -> **0%** | **Yours: ask** (-5% 31 Oct-19 Nov). Older ones -> 0%: -4% 26-30 Oct, -2% 20-30 Nov |
| P13 (3064856; child 3090701 follows) | -20% / 14 d gradual -> **0%** | Market Driven -> leave | Default -> **0%** | -1% 28-30 Nov -> 0% |
| P09 (3318172) | -18% / 15 d gradual -> **0%** | Market Driven -> leave | Default -> **0%** | **Reyhan's: ask** (-5% 26-31 Oct). Older ones -> 0%: -1% 1-7 Nov, -3% 8-9 Nov, -2% 10-26 Nov |
| P08 (3318167) | -18% / 15 d gradual -> **0%** | Market Driven -> leave | Default -> **0%** | -2% 26 Oct-13 Nov -> 0% |
| P06 (3288517) | Toggle off = Market Driven (40% same day -> 0% at 12 d) -> **custom 0%** | Market Driven -> leave | Default -> **0%** | none |
| P01 (3320302), P10 (3318177) | -18% / 15 d -> 0% (hygiene only; 0 open nights before handback) | leave | -> 0% | n/a (all booked) |
| P14 (3267077) | -25% / 30 d: **not proposed** (special setup, numbers only) | - | - | - |

- **Conflict: we need your call.** Your 24 Oct decisions (policy) set **P04 -8% on 1-24/25 Nov** and **P20 -5% on 31 Oct-19 Nov**. On the same day Reyhan added **P04 -5% on 6-22 Dec and 1-28 Feb** and **P09 -5% on 26-31 Oct**. All four are negative PriceLabs overrides, which your later instruction says to cut. For each one, does the override stand, or does it go to 0%? We have not assumed either way.
- **Not checked:** the orphan-day discount is not returned by the API. Please look at Customizations > Orphan Day Prices on the same listings.
- **Safety net (Claude, daily):** for 7 days after the cut, count bookings per flat. If a flat takes 0 bookings in 7 days AND its booked-next-30 falls below market, we propose bringing PriceLabs last-minute back at 10% on that flat only. Today's baselines: P04 34.5% vs 26%, P11 44.8% vs 44%, P12 62.1% vs 40%, P05 70.4% vs 38%, P20 10.3% vs 35%.

### Row 2 detail: decision rule for the 26 Oct review

| Ref | Test as of 25 Oct (occupancy / booking 19-26 Oct) | If a booking arrives by end of 26 Oct | If not | Why (positioning.py + comps) |
|---|---|---|---|---|
| P05 | +32 points pass / 0 fail | **Base £550 -> £605 (+10%)** | **Hold £550, no cut.** The discount cut (row 1) is the test instead: it lifts the next 14 days by about 12%. | `recommend` says +25%, but **override to +10%**: only 2-4 comp prices per stay, and 0 bookings since £550. Rating 4.76 vs 4.29 supports a premium. |
| P06 | +33 points pass / 0 (3 open nights) | +10% override on 5-7 Nov (£331 / £361 / £365 -> about £364 / £397 / £402) | **Same: +10% on 5-7 Nov.** Override of the count test, because with 3 open nights in 60 it cannot be met. | Comps P17-P33, -17% / -19% vs median, rating level (4.56 vs 4.64): `recommend` +10%. |
| P09 | +33 points pass / 1 pass | Hold £176 | Hold £176 | Comps do not back the rule's +10%: about £184 all-in vs £165 median (n = 3), 2 reviews, 9 open nights to handback, and the booking paid 0.77x. |
| P11 | +1 point fail / 0 fail | No base change | No base change | The row 1 cut restores about 18% on the next 14 days. Do not add a base rise on 21 days without a booking. The comp P7 is a room-only lower bound. |
| P12 | +22 points pass / 1 pass | Hold base £284; near term via row 1 | Same | Near-term comps support +10% (P0, -22.5% vs a -15% quality cap). Days 31-60 support -7% (NL P77, 25% vs 32%). A base move hits both horizons, and the row 1 cut (-16.7% today) delivers the near-term rise. **The -7% December cut is not taken:** you asked to stop PriceLabs-side cuts, and the 5-12 Nov booking paid 0.513x uncustomized. |
| P01 | n/a | No action | No action | 0 open nights. |

### Closed or changed today (dashboard)
- **a-orphans:** dismissed. You decided that P04 stays at min 3 (25 Oct stayed closed), and P04 2 Dec and P12 17 Nov are deprioritised.
- **a-camden-dec:** dismissed. You decided on 24 Oct to leave the darts override at +5%.
- **a-p13-1023:** done. Reyhan set 25-26 Oct +10% and 20-21 Nov +10% on 24 Oct.
- **a-p05-block:** done. 27-28 Oct is a delivery.
- **a-p20:** done. 20-21 Nov is a delivery. The source of the December 4-night minimum is still unknown and moves to data gaps.
- **a-p11-fall:** done. The cause is visible: Booking Recency ON, Aggressive occupancy and last-minute -18%. It is folded into row 1.
- **a-p04-raise:** dismissed. It is superseded by your -8% decision and the row 1 conflict question.
- **a-airbnb-pace:** done. The trigger was met (0 on 24 Oct, 0 on 25 Oct to 07:20Z) and is applied in row 2.
- **a-p12-hold:** updated. 5-11 Nov is now sold. The remaining short run, 12-13 Nov (£221 / £288, min 2), is sellable as it is. No min-stay change.

Unchanged and still open: a-bcom-cancel, a-extra-guest, a-p08, a-p13-twin (gap now about +20% to 23 Nov, -9% after; narrow it, never make it identical), a-titles, t-p02-vrbo, t-p13-commission, t-unmapped.

## Top 5 for today
1. **Apply your own instruction: cut the PriceLabs-side discounts** (row 1 table; set 0% explicitly, do not just toggle off). The double discount is why the 24 Oct Booking.com bookings paid 0.51x uncustomized.
2. **Tell us which of the four negative overrides stand:** P04 -8% Nov, P04 -5% Dec/Feb, P20 -5% 31 Oct-19 Nov, P09 -5% 26-31 Oct.
3. **26 Oct review rule** (row 2): P05 +10% only if a booking arrives; P06 +10% on 5-7 Nov; hold P09, P11 and P12.
4. **Send the Smoobu Airbnb rules for P06, P12, P20 and P08** (Airbnb shows 0.765-0.90x PriceLabs before cleaning).
5. **Free Airbnb fixes:** lift, balcony and view on P04, P09 and P12. P20: free parking ticked and shown in the first photo.

## Growth plays

- **Booking.com net rate.** KPI: paid ÷ PriceLabs uncustomized on new Booking.com bookings. Today 0.513x (P12) and 0.503x (P04).
  - Levers: row 1 (PriceLabs layer), row 6 (P04 rate plans), row 7 (one Last Minute deal).
  - Target: at least 0.65x by 2026-11-08. That is the 0.556 Booking.com stack on a PriceLabs price with no PriceLabs-side cut, before the weekly discount.
- **Booking.com volume.** KPI: bookings per day. 0 in the 13 days before the cut, 2 on 24 Oct after it. Target: at least 0.33/day (the 30-day average before the stall) over 25 Oct-7 Nov.
- **Airbnb net rate and pace.** KPI: Airbnb room ÷ PriceLabs before stay discounts. Today 0.77x paid (P09) and 0.765-0.90x displayed (P06, P08, P12, P20). Pace is 0.40/day vs 1.67/day. Target: at least 0.95x by 2026-11-04 (row 3).
- **Review score.** Per-listing Airbnb ratings are now known (comp sections):

  | Ref | Ours (reviews) | Comp median |
  |---|---|---|
  | P05 | 4.76 (34) | 4.29 |
  | P04 | 4.69 (26) | 4.83 |
  | P06 | 4.56 (9) | 4.64 |
  | P08 | 4.33 (3) | 4.82 |
  | P12 | 4.27 (15) | 4.88 |
  | P13 | 4.31 (13) / 4.67 (9) | NOT CHECKED (no West comps) |
  | P09 | 5.0 (2) | - |
  | P20 | new | - |

  - P12's gap (-0.61) caps its premium at -15% (`quality_premium`).
  - Fixes: P12 check-in score 4.27 (key collection cannot change, policy; the info is already in the listing, so the lever is arrival messaging and reviews); P13 1571600691689064213 cleanliness 3.85 and value 3.92 (cleaning checklist and photo accuracy); ask the P20 guests for reviews.
  - Target: P12 4.5 and P13 (weak twin) 4.5 by 2027-01-31; portfolio 4.8 / Booking 9.3, then top decile.
- **Listing conversion.** KPI: booked vs market on fix-listing flats. P20 10.3% vs 35%; P08 32% vs 51% at P0. Levers: row 4 (amenities), row 8 (deposit / ID friction). Superhost / Preferred status: we are not a Superhost (airbnb-live.md).
- **Gap fill and length of stay.** No orphan gaps (kpi_pack `gaps` empty). Short runs exactly at min stay: P12 12-13 Nov, P05 29-30 Oct, 16-17 Nov and 7-8 Dec, P06 5-7 Nov, P09 10-12 Nov. Mid-term (91+ nights) pipeline: 0.
- **Direct share.** 1.53% last 365 (23 Oct, not recomputed). Direct is not the cheapest price: a Genius mobile guest pays £64-71 per £100 on Booking.com vs about £90 direct (channel.md §4, default unconfirmed). Get the data: direct-site URL and booking engine.
- **Event compression.** **24 nights / £498** under their fortnight:
  - P20: 12 / £238, incl. Mariah Carey 30 Nov £45 and Phoebe Bridgers 1-2 Dec £67.
  - P11 darts: 5 / £213 (left as you decided).
  - P04: 4 / £28.
  - P08: 2 / £15.

  The row 1 cut lifts the near nights. P20's 30 Nov-2 Dec nights sit outside its -5% override and are a candidate for +10% once you answer the override question.

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 Smoobu units) | **70.3%** (kpi_pack) | hold at least 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | **£175.56** | £190 | 2026-12-18 |
| RevPAR, last 30 | **£123.34** | £129 | 2026-12-18 |
| Booked next 30 (handback-aware) | **52.7%** (166/315; 51.4% on 24 Oct); next 60 45.2% | each unit at least market + 10 points | 2026-11-08 |
| 7-day pickup | 5 bookings / 19 n / £2,874.62 | at least 10 bookings / week | 2026-11-08 |
| Booking.com paid ÷ PL uncustomized | **0.51x** (2 bookings) | at least 0.65x | 2026-11-08 |
| Airbnb room ÷ PriceLabs | 0.77x paid (P09); 0.765-0.90x displayed | at least 0.95x before stay discounts | 2026-11-04 |
| Missed compression | 24 nights / £498 | under 10 nights | 2026-11-07 |
| Comp price position (Airbnb, all-in) | P12 -22.5%, P06 -17/-19%, P08 -46/-23%, P20 +12.2%, P05 P50 | each flat within its quality-supported band | 2026-11-08 |
| RGI | **UNKNOWN**: comp prices exist, comp occupancy does not | above 1.10 on every property | data 2026-10-30; target 2027-03-31 |
| Rating (Airbnb) | 4.27-4.76 on listings with 9+ reviews; comp medians 4.29-4.88 | 4.8 / Booking 9.3, then top decile | 2027-01-31 |
| Direct share | 1.53% last 365 | 5% | 2027-06-30 |
| Search placement | Booking.com (24 Oct): P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. Smoobu Airbnb default pricing rules for P06, P08, P09, P12 and P20 (Smoobu > Channel Manager > Airbnb).
2. The orphan-day discount setting (PriceLabs > Customizations; not in the API). The customization change history is not in `get_user_logs`.
3. West comps (P13: 0 rows) and Booking.com comps (bot challenge). Comp occupancy for RGI (PriceLabs Competitor Listings).
4. The reason for the P08 26 Oct block, and the source of P20's December 4-night minimum.
5. Which Booking.com Last Minute deal is live per property (10% vs 15%), and the P04 rebuilt Monthly plan ID.
6. The markup that was live before 24 Oct (+20% or +30%).
7. STLY for every unit except P12 (Smoobu history starts Nov 2025).
8. P15-P19: second-account keys.

```json
{"scoreboard":{"note":"25 Oct 2026. Last 30 nights, 13 Smoobu units (kpi_pack). Next 30 is handback-aware (occupancy.md). Booking.com ratio is paid / PriceLabs uncustomized on the two 24 Oct bookings (pricelabs.md item 4). RGI still unknown: comp prices exist, comp occupancy does not.","items":[{"label":"Occupancy last 30","value":"70.3%"},{"label":"ADR last 30","value":"£175.56"},{"label":"RevPAR last 30","value":"£123.34"},{"label":"Revenue last 30","value":"£48,104"},{"label":"Booked next 30","value":"52.7% (166/315; 51.4% yesterday)"},{"label":"7-day pickup","value":"5 bookings / 19 n / £2,875"},{"label":"Booking.com paid / PL uncustomized","value":"0.51x (P12, P04)"},{"label":"Airbnb room / PriceLabs","value":"0.77x paid P09; 0.765-0.90x displayed"},{"label":"Missed compression","value":"24 nights / £498"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"a-discount-cut","type":"task","priority":"critical","ref":"P04 P05 P06 P08 P09 P11 P12 P13 P20","status":"open","title":"Apply your 24 Oct instruction: set PriceLabs last-minute, occupancy and Booking Recency discounts to 0% (keep Booking.com's); decide the 4 negative overrides","why":"Not applied: get_customizations 25 Oct shows last-minute on every listing (P04/P12/P20 -25% gradual, P05 -25% FLAT, P11/P01/P08/P09/P10 -18%, P13 -20%), Aggressive occupancy on P04/P11/P12, Booking Recency ON on P04/P11/P12 (default 5-15% elsewhere). Next 14 days final vs uncustomized: P04 -32%, P11 -18%, P12 -17%, P05 -12%, P20 -11%. 24 Oct Booking.com bookings paid 0.513x / 0.503x uncustomized. P05 7 Nov fell 630->459 overnight (flat -25%). Conflict to decide: P04 -8% 1-24 Nov and -5% Dec/Feb, P20 -5% 31 Oct-19 Nov, P09 -5% 26-31 Oct (Reyhan).","where":"PriceLabs > each listing > Customizations > Last-Minute Prices = custom 0%; Occupancy Based Adjustments = custom 0% on every band (P04, P11, P12, P05); Booking Recency Factor = custom 0%. Set explicitly, not toggle off (off falls back to PriceLabs defaults). Date Specific Overrides: older negatives on open nights -> 0%. P14 excluded.","impact":"About £1,176 PriceLabs £ over 30 days (upper bound): next 14 days P04 £209, P05 £221, P12 £173, P11 £114, P20 £35; days 15-30 £424. Formula: (uncustomized - final) on open nights x flat's booked share next 30.","source":"Daily run 25 Oct 2026 (pricelabs.md items 1-4; channel.md)"},
{"id":"a-review-1026","type":"task","priority":"high","ref":"P05 P06 P09 P11 P12","status":"open","title":"26 Oct review rule: P05 £550->£605 only if a booking arrives by 26 Oct; P06 +10% on 5-7 Nov; hold P09 £176, P11 £286, P12 £284","why":"Test = market +10 pts AND 1 booking 19-26 Oct. P05 70.4% vs 38%, 0 bookings, comps P50 thin (n=2-4), rating 4.76 vs 4.29 (recommend +25%, capped to +10%). P06 76.9% vs 44%, P17-P33 vs comps, only 3 open nights, so the count test is overridden. P09 passes but £184 all-in vs £165 comp median, 2 reviews. P11 +1 pt, 0 bookings for 21 days. P12 passes; Airbnb -22.5% vs comps near term but 31-60 days NL P77 -> lift via the discount cut, no base move. Airbnb pace trigger met (0.40/day vs 1.67/day). Raised flats 0.43/day vs 0.79; unraised also slowed (2 vs 13).","where":"PriceLabs 3166592 > Base price; 3288517 > Date Specific Overrides 5-7 Nov","impact":"P05 10% x 8 x £471 x 70.4% = £265; P06 10% x £1,057 x 76.9% = £81","source":"Daily run 25 Oct 2026 (occupancy.md, comp-central, comp-east)"},
{"id":"a-airbnb-rules","type":"task","priority":"high","ref":"P06 P08 P12 P20 P09","status":"open","title":"Airbnb sells below PriceLabs on P06 0.765x, P08 0.85x, P12 0.81x, P20 0.90x: send the Smoobu Airbnb rules and cut them back to stay discounts","why":"comp-central fits P06 = 0.765 x PL + £129 and P08 = 0.85 x PL + £149 on 2-4 night stays. comp-east: P12 £274 room vs PL £339; P20 £851 vs £945 at D+30 (outside its 0-14 day rule). P09 paid 0.77x. Policy: a post-21 Oct gap is unexplained. Cause inferred: Smoobu Airbnb default rules.","where":"Smoobu > Channel Manager > Airbnb > each listing > Default pricing rules; Airbnb > Pricing > Discounts","impact":"Not quantified until the rules are seen. Airbnb share: P20 100%, P08 76%, P06 72%.","source":"Daily run 25 Oct 2026 (comp-central, comp-east, channel.md)"},
{"id":"a-amenities","type":"task","priority":"medium","ref":"P04 P09 P12 P20","status":"open","title":"Free Airbnb fixes: add Lift (P04, P09, P12), balcony (P04, P09, P12), view (P04, P12); P20 free parking ticked and in the first photo","why":"0 of our 5 East listings list a lift (15 of 57 comps do); 11 of 57 comps list a view. P20's free parking is unique among its 12 comps; P20 is 10.3% vs 35% booked at +12.2% vs comp median with 0 reviews. P04 and P12 are in Airbnb's bottom-10% quality bucket. Title already leads with Parking (policy).","where":"Airbnb > Listing > Amenities; Photo tour","impact":"Not quantified (conversion)","source":"Daily run 25 Oct 2026 (comp-east)"},
{"id":"a-p13-record","type":"task","priority":"medium","ref":"P13","status":"open","title":"Confirm Reyhan's P13 changes: base £235->£250, +10% on 20-21 Nov; and 31 Oct still +10% (keep or reset?)","why":"get_user_logs 24 Oct: base 21:14Z, 20-21 Nov +10% 11:26Z, neither in policy. 31 Oct £187 vs £168 uncustomized, although policy says it was reset. Next 30 at P14 with 43% vs 41% = rule +5%, already covered by the +6.4% base.","where":"PriceLabs 3064856 > Base price / Date Specific Overrides (copied to 3090701)","impact":"£0 (record)","source":"Daily run 25 Oct 2026 (pricelabs.md item 6, comp-west)"},
{"id":"a-p04-monthly","type":"task","priority":"medium","ref":"P04","status":"open","title":"Check the Barking Booking.com rate-plan rebuild: Monthly only for 28+ nights, Weekly for 7+; and why Last Minute was missing","why":"14-18 Nov (4 n) priced at Monthly -20% x occupancy -5% x Mobile x Genius = 0.6156 of list (-£142 at list). Last Minute 10% was not in the stack at 21 days out.","where":"Booking.com extranet > Barking > Rates & Availability > Rate plans; Promotions","impact":"Not quantified (protects ADR)","source":"Daily run 25 Oct 2026 (channel.md)"},
{"id":"a-bcom-lm","type":"advice","priority":"medium","ref":"P11 P12 P13","status":"open","title":"Which Booking.com Last Minute deal is live? P12 booking had 15%, your 24 Oct change was 10%","why":"P12 stack 0.556 incl. LM 15% (policy). Two deals may exist; Booking.com applies only one.","where":"Booking.com extranet > each property > Promotions","impact":"Not quantified","source":"Daily run 25 Oct 2026 (channel.md)"},
{"id":"a-deposit","type":"advice","priority":"high","ref":"Portfolio","status":"open","title":"Decide on the £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change","why":"3 of 40 comps mention any deposit (max £345) vs our £1,000; 1 of 40 mentions a waiver (£20) vs our £109; 10 of our 11 Airbnb listings mention all four requirements. Airbnb's policy for bookings from 20 Nov 2026 restricts ID collection and off-platform registration (except where law requires it or 28+ nights). The waiver adds about 14-17% to a stay.","where":"Airbnb house rules / listing; guest verification flow","impact":"Not quantified (conversion and policy risk)","source":"Daily run 25 Oct 2026 (demand/deposit-competitors.md, deposit-guest-impact.md)"},
{"id":"t-channel-gaps","type":"task","priority":"high","ref":"P11 P04","status":"open","title":"Relist Camden on Airbnb (21 days without a booking); confirm Barking's Airbnb account is connected","why":"Last P11 booking made 4 Oct; 16 open nights next 30, 28 next 60, Booking.com only. Airbnb comps around Camden sit at £293-£322 all-in.","where":"Airbnb; Smoobu > Channels","impact":"Not quantified","source":"Daily run 25 Oct 2026 (occupancy.md, comp-central)"},
{"id":"t-comps","type":"task","priority":"medium","ref":"Portfolio","status":"open","title":"Comps: 297 Airbnb rows now (East, Central); still need West (P13 0 rows), Booking.com and Competitor Listings for RGI","why":"First real comp set 25 Oct. comp-west fetch failed (0 rows); Booking.com bot challenge; PriceLabs Competitor Listings not enabled, so no comp occupancy and RGI cannot be measured.","where":"PriceLabs > Neighborhood data > Competitor Listings; re-run comp-west","impact":"£0 (measurement)","source":"Daily run 25 Oct 2026 (comp sections)"},
{"id":"a-tidy","type":"task","priority":"medium","ref":"Portfolio","status":"open","title":"Set rm/config.py Booking.com markup to 0.15; confirm whether +20% or +30% was live before 24 Oct","why":"config still 0.20, so channel_economics shows Booking.com £102 per £100 vs about £54-60 observed. Policy says +20% in one note and +30% for about 11 months in another. Earlier items (Vrbo 12038555, id_map, info pack) still open.","where":"rm/config.py CHANNELS; policy.json","impact":"£0","source":"Daily run 25 Oct 2026 (channel.md)"},
{"id":"a-p12-hold","type":"advice","priority":"medium","ref":"P12","status":"open","title":"Mile End: 5-11 Nov now sold; hold £284; 12-13 Nov 2-night run sellable as is","why":"Booking.com 5-12 Nov £932.90 made 24 Oct; booked next 30 62.1% vs 40% (was 37.9%); pace to 30 days -0.1% vs LY. 12-13 Nov £221/£288, min 2.","where":"PriceLabs 2699998","impact":"£0","source":"Daily run 25 Oct 2026 (occupancy.md, pricelabs.md item 5)"},
{"id":"a-orphans","type":"task","priority":"critical","ref":"P04 P12","status":"dismissed","title":"Barking 25 Oct min 1 / 2 Dec / Mile End 17 Nov","why":"Decided by Corentin 24 Oct: P04 never under 3 nights (25 Oct stayed closed); P04 2 Dec and P12 17 Nov deprioritised (policy).","where":"-","impact":"-","source":"Daily run 25 Oct 2026 (policy.json)"},
{"id":"a-camden-dec","type":"task","priority":"high","ref":"P11","status":"dismissed","title":"Camden darts override","why":"Corentin 24 Oct: leave Reyhan's +5% as it is (policy darts_override_24oct).","where":"-","impact":"-","source":"Daily run 25 Oct 2026 (policy.json)"},
{"id":"a-p13-1023","type":"task","priority":"high","ref":"P13","status":"done","title":"Shepherd's Bush 25-26 Oct +10%; England v NZ nights","why":"get_user_logs 24 Oct: 25-26 Oct +10% and 20-21 Nov +10% set by Reyhan; England v NZ now £227/£228 vs £215 fortnight.","where":"-","impact":"-","source":"Daily run 25 Oct 2026 (pricelabs.md, market.md)"},
{"id":"a-p05-block","type":"task","priority":"medium","ref":"P05","status":"done","title":"St John's Wood 27-28 Oct block","why":"Delivery block (Corentin 24 Oct, policy).","where":"-","impact":"-","source":"Daily run 25 Oct 2026 (policy.json)"},
{"id":"a-p20","type":"task","priority":"high","ref":"P20","status":"done","title":"Waterford 20-21 Nov block","why":"Delivery block (Corentin 24 Oct, policy). The December 4-night minimum source moves to data gaps.","where":"-","impact":"-","source":"Daily run 25 Oct 2026 (policy.json)"},
{"id":"a-p11-fall","type":"task","priority":"high","ref":"P11","status":"done","title":"Camden -10.9% fall: cause found","why":"get_customizations: Booking Recency ON (last booking 4 Oct), Aggressive occupancy, last-minute -18%. Folded into a-discount-cut.","where":"-","impact":"-","source":"Daily run 25 Oct 2026 (pricelabs.md item 1, comp-central)"},
{"id":"a-p04-raise","type":"task","priority":"medium","ref":"P04","status":"dismissed","title":"Barking: remove the -5% on 1-24 Nov","why":"Superseded: Corentin set -8% on 1-24/25 Nov on 24 Oct (policy); the question is now in a-discount-cut. comp-east: only 3 comps, hold.","where":"-","impact":"-","source":"Daily run 25 Oct 2026 (policy.json, comp-east)"},
{"id":"a-airbnb-pace","type":"advice","priority":"medium","ref":"Portfolio","status":"done","title":"Airbnb pace trigger met","why":"0 Airbnb bookings 24 Oct and 0 on 25 Oct to 07:20Z; 0.40/day for 20-24 Oct vs 1.67/day for 11-19 Oct. Applied in the a-review-1026 rule (no rise without a pass).","where":"-","impact":"-","source":"Daily run 25 Oct 2026 (channel.md §2)"}
],
"finds":[
{"agent":"pricelabs","severity":"critical","ref":"P04 P05 P11 P12 P20","title":"PriceLabs-side discounts still on; next 14 days final vs uncustomized P04 -32%, P11 -18%, P12 -17%, P05 -12%, P20 -11%","evidence":"get_customizations 25 Oct ~07:10Z; raw/prices_*.json price vs uncustomized_price"},
{"agent":"pricelabs","severity":"high","ref":"P04 P12","title":"24 Oct Booking.com bookings paid 0.513x (P12) and 0.503x (P04) of PriceLabs uncustomized","evidence":"reservations.csv £932.90 vs £1,817; £437.69 vs £871 (pricelabs.md item 4)"},
{"agent":"pricelabs","severity":"high","ref":"P04 P09 P20","title":"New negative overrides 24 Oct: P04 -5% Dec and Feb, P09 -5% 26-31 Oct (not in policy); P20 -5% and P04 -8% conflict with the cut instruction","evidence":"get_user_logs 24 Oct 11:23Z, 11:28Z, 12:41Z"},
{"agent":"comp-central","severity":"high","ref":"P05","title":"P05 flat -25% last-minute cuts each night by about 25% at about 13 days out","evidence":"prices.csv: 6 Nov 594->448 (24 Oct), 7 Nov 630->459 (25 Oct), unlogged"},
{"agent":"comp-central","severity":"high","ref":"P06 P08","title":"Airbnb sells P06 at 0.765x and P08 at 0.85x PriceLabs before cleaning","evidence":"Airbnb search 25 Oct, fitted on 2-4 night stays with £129 / £149 cleaning"},
{"agent":"comp-east","severity":"high","ref":"P12 P20","title":"Airbnb room P12 0.81x and P20 0.90x PriceLabs; P12 at -22.5% vs comp median while 64% booked","evidence":"P12 27-29 Oct £424 all-in vs PL £339; P20 24-27 Nov £1,001 vs PL £945; comp median £273"},
{"agent":"comp-east","severity":"medium","ref":"P04 P09 P12 P20","title":"Airbnb amenities missing: Lift, balcony, view; P20 free parking unique among 12 comps","evidence":"Airbnb listing pages 25 Oct vs build/properties.py"},
{"agent":"channel","severity":"high","ref":"Portfolio","title":"Airbnb pace 0.40/day for 20-24 Oct vs 1.67/day for 11-19 Oct; trigger met","evidence":"reservations.csv booked_on; Smoobu created-at to 07:20Z"},
{"agent":"pricelabs","severity":"medium","ref":"P13","title":"P13 base £235->£250 and 20-21 Nov +10% by Reyhan not in policy; 31 Oct still +10%","evidence":"get_user_logs 24 Oct 21:14Z / 11:26Z; get_listing_date_overrides"},
{"agent":"channel","severity":"medium","ref":"P12","title":"P12 Booking.com Last Minute applied at 15% vs 10% recorded on 24 Oct","evidence":"policy booking_discount_stack_24oct vs monitoring.booking_last_minute_24oct"},
{"agent":"occupancy","severity":"medium","ref":"P08","title":"P08 26 Oct newly blocked, reason unknown","evidence":"prices.csv 24 vs 25 Oct"}
],
"top5":["Apply your instruction: set PriceLabs last-minute, Aggressive occupancy and Booking Recency to 0% explicitly on P04, P05, P06, P08, P09, P11, P12, P13 and P20 (24 Oct Booking.com bookings paid 0.51x uncustomized)","Decide the four negative overrides: P04 -8% Nov, P04 -5% Dec/Feb, P20 -5% 31 Oct-19 Nov, P09 -5% 26-31 Oct","26 Oct review: P05 £550->£605 only if a booking arrives; P06 +10% on 5-7 Nov; hold P09, P11 and P12","Send the Smoobu Airbnb rules for P06, P12, P20 and P08 (Airbnb 0.765-0.90x PriceLabs before cleaning)","Free Airbnb fixes: lift, balcony and view on P04, P09 and P12; P20 free parking ticked and in the first photo"],
"per_property":[
{"ref":"P01","change":"No change; sold out to the 20 Dec handback."},
{"ref":"P04","change":"New Booking.com 14-18 Nov £437.69 (Monthly rate, since rebuilt); booked 34.5% vs 26% (was 20.7%); Reyhan -8% 1-24 Nov, -5% Dec and Feb; next 14 days -32% vs uncustomized."},
{"ref":"P05","change":"No booking since £550; flat -25% last-minute cut 7 Nov 630->459; comps P50 (thin), rating 4.76 vs 4.29."},
{"ref":"P06","change":"No change; 3 open nights; comps P17-P33 while 77% booked; Airbnb 0.765x PriceLabs."},
{"ref":"P08","change":"26 Oct newly blocked (reason unknown); cheapest in comp set (P0) and 32% vs 51%: fix-listing; Airbnb 0.85x."},
{"ref":"P09","change":"Reyhan -5% on 26-31 Oct, min 3 (£154->£145); 13-15 Nov booking now in PriceLabs."},
{"ref":"P10","change":"No change; sold out to the 18 Nov handback."},
{"ref":"P11","change":"No booking for 21 days; Booking Recency ON, Aggressive, -18% last-minute confirmed; 23-24 Nov fell 16-19%."},
{"ref":"P12","change":"New Booking.com 5-12 Nov £932.90; booked 62.1% vs 40% (was 37.9%); pace -0.1% vs LY; Airbnb 0.81x, -22.5% vs comps."},
{"ref":"P13","change":"Reyhan base £235->£250 and 20-21 Nov +10%; 31 Oct still +10%; twin gap +20% to 23 Nov, -9% after."},
{"ref":"P14","change":"Numbers only: 0% vs 40%; 82% of open nights at £500."},
{"ref":"P20","change":"No booking; 10.3% vs 35%; +12.2% vs comp median at D+30 with 0 reviews; free parking unique; Airbnb 0.90x."}
]}
```
