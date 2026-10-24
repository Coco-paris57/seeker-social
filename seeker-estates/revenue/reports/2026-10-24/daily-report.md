# Seeker Estates - Daily revenue report, 2026-10-24

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs Corentin's explicit approval.**

Inputs: `kpi_pack.json`, `kpi_summary.md`, `sections/{occupancy,pricelabs,channel,market,comp-east,comp-central,comp-west}.md`, `data/policy.json` (read first), `reports/2026-10-23/daily-report.md`, open dashboard actions at the start of this step, `data/snapshots/2026-10-24/listings.csv` (min/max). No guest data used.

Policy respected: P02/P03/P06/P07 blocks are intentional. P14 gets numbers only. Visibility Booster commission and the 15%/20% stay discounts are expected. P13 is one flat (1 Dec +50% intentional). The Booking.com +20% markup is global and its promotions stack. Nights after the handback dates (P01 20 Dec, P08 13 Nov, P09 26 Nov, P10 18 Nov, P12 13 Dec) are not inventory. P20's Airbnb discounts and its separately paid 18-22 Oct extension are explained.

## Executive summary

1. **Last 30 nights (13 Smoobu units): occupancy 69.7%, ADR £174.56, RevPAR £121.74, revenue £47,479.42** (kpi_pack `portfolio_last30`; 23 Oct: 69.5% / £173.34 / £120.45). **Next 30, handback-aware: 42.0% (171/407)**, down from 43.3% because the window moved, not a cancellation. Next 60: 33.6% (245/730) (occupancy.md).
2. **One new booking: P09 Greenwich, Airbnb, 13-15 Nov, £253.21 (£126.61/night).** It is the first P09 booking since the 18 Oct rise and the first Airbnb booking made after the 21 Oct promotion removal. **It paid 0.77x the PriceLabs price (£162 + £167 = £329), with no stay discount on a 2-night stay.** So the Airbnb gap is still there on P09. P09's Airbnb discount settings have not been seen, so under policy the gap is unexplained (channel.md). PriceLabs does not show the booking yet (last refresh 23 Oct 08:51Z).
3. **t-p11-sync is resolved.** Reyhan's 23 Oct 11:11Z edit replaced the 18/27 Nov orphan overrides with min 2 and 0%. PriceLabs now shows 18-27 Nov open at £2,600 for 10 nights (pricelabs.md item 1). **But the same edit cut the P11 darts override on 12-18 Dec from +20% to +5%.** The 13-17 Dec average fell from £324 to **£256**, below your 21 Oct decision ("average above £300", policy). We need your confirmation; we have not assumed either way. All P11 prices also fell a **median 10.9%** overnight, with no logged cause (comp-central).
4. **P04 Barking 25 Oct (tomorrow) is still min 3 and unbookable.** The night is lost unless min stay goes to 1 today.
5. **Booking.com: no organic booking for 13 days. Net -21 nights / -£4,621 over 14 days** (channel.md §2). **P12 1-7 Nov is still unsold** (£1,327, average £189.6 = P32). Pace to handback is -38.2%.
6. **The raised flats took 3 bookings since 18 Oct (0.5/day), against 1.0/day on 4-17 Oct.** Airbnb daily pace for 20-23 Oct was 0.5/day, against 2.2/day on 9-19 Oct. Decision criteria for the 26 Oct review are set out below (row 3).

## What changed since 23 Oct

### The 18 Oct rises (P01, P05, P06, P09, P11, P12)

Source: occupancy.md "Raised flats" (reservations.csv `booked_on`), comp sections. "Before" means bookings made 4-17 Oct.

| Ref | Base | Bookings since 18 Oct (before) | Cancelled since 18 Oct | Booked next 30 vs market | Position (open nights) | Read today |
|---|---|---|---|---|---|---|
| P01 | £253 | 1 (1) | 0 | 100% vs 33% | 0 open to the 20 Dec handback | Out of the test |
| P05 | £550 (since 20 Oct) | 1 (2), made 18 Oct; **0 since £550** | 0 | 66.7% vs 38% | Next 30 £482 <P25 (-22% vs 4-bed P50 £616); next 60 £554 = P36 | Rule +10%. 27-28 Oct block, reason unknown |
| P06 | £357 | 0 (5) | 0 | 78.6% vs 44% (blocks excluded) | 3 open (5-7 Nov) £354 = P33; 7 Nov 282 -> 366, no log | Rule +10% on 3 nights |
| P09 | £176 | **1 (3), new: 13-15 Nov at 0.77x PriceLabs** | 0 | 66.7% vs 37% (69% in comp-east) | 9 open, £156 = P62 (+9.9%) | Rule +10%; hold (the pickup came at a P33 guest price) |
| P11 | £286 | 0 (1); last booking made 4 Oct (20 days) | 19-27 Nov, -8 n, -£1,736 | 48.3% vs 45% | Next 30 £219 <P25 (-28%); next 60 £244 = P25 | Rule +5% / +10%. Prices fell a median 10.9%, unlogged; darts cut |
| P12 | £284 | 0 (2) | 1-8 Nov, -7 n, -£1,383 | 40% vs 40% | Next 30 £213 = P49; 1-7 Nov P32 | Rule hold (edge case at P49) |
| **Total** | | **3 (14), 12 n, £5,502** | **-15 n, -£3,119** | | | Net nights since 18 Oct: -3 |

Flats with no rise, for comparison: P13 2 since 18 Oct (4 before), P20 1 (2), P08 0 (1), P10 0 (2), P02 0 (2).

### Per property

| Ref | Change since 23 Oct |
|---|---|
| P01 | No change. Sold out to the 20 Dec handback. A cancelled 22-26 Apr 2027 row entered the window only because D+180 moved. |
| P02 | Intentional block. Vrbo 4438728 last push 24 Feb (now 242 days). |
| P03 | Intentional block. No data. |
| P04 | **25 Oct still min 3 / unbookable (£141), now 1 day out.** **2 Dec £601 -> £630** (+200% override; neighbours £202/£204). Open 1-6 Nov fell £11-14, 22 Nov 185 -> 157, all unlogged. Next 30 £163.5 = P40, 21% booked vs 25%. 9 event nights £80 under fortnight (now includes 21 Nov, The Script). |
| P05 | **28 Oct newly Blocked** (27-28 Oct, no reservation). 6 Nov 594 -> 448 (-25%). Open nights otherwise flat (+0.7%). No booking since the £550 base. |
| P06 | 7 Nov 282 -> 366 (+30%, unlogged). 3 open nights, average £354 = P33. |
| P07 | Intentional block. |
| P08 | Open nights -3.4%, the **third unlogged fall in a row**. **7 Nov (Arsenal v Hull) 276 -> 192**, now £10 under its £202 fortnight. **1 Nov at the £150 minimum.** 35% booked vs 50% market at <P25 = fix-listing. |
| P09 | **New Airbnb booking 13-15 Nov at £126.61/night = 0.77x PriceLabs.** Fwd occ 30 60.0% -> 66.7%. PriceLabs still shows 13-14 Nov open. |
| P10 | No change. Sold out to the 18 Nov handback. |
| P11 | **19-27 Nov reopened in PriceLabs** (`occupancy_next_30` 63% -> 53%), and the orphan premiums are gone (18 Nov 314 -> 214, 27 Nov 589 -> 326). **Darts 13-17 Dec override +20% -> +5%** (average £324 -> £256). **All dates median -10.9%** (Oct -5.9%, Nov -10.4%, Dec -11.9%), with no log entry. Candidates: the Booking Recency Factor (5-15% when there has been no booking for 15-45 days; the last booking was made 4 Oct) and the occupancy adjustment. Neither is verified. |
| P12 | 1-7 Nov eased again: £1,407 -> **£1,327** (7 Nov 265 -> 210). Still unsold, 8 days out. No user change since 22 Oct 18:47Z. 17 Nov £378 (+50%, min 1). |
| P13 | **25-26 Oct open at £136/£140**, against market P25 £205/£209. The West half term is 4-9 points ahead of last year. **New fact: 3090701 is a PriceLabs child of 3064856** (get_user_logs, 20 Oct). That is the likely reason prices are identical from 23 Nov (24 open nights). Near prices drifted down £5-10. |
| P14 | Numbers only: 0% booked vs 41% market; 72% of open nights at the £500 minimum. |
| P15-P19 | Not connected (second account). |
| P20 | **20-21 Nov block identified:** a Smoobu "Blocked channel" block (id 160937106), created 21 Oct 20:27. It is not a PriceLabs override, and its purpose is unknown. Open 25 Oct-9 Nov fell £14-23 (algorithm). 11 event nights £215 under their fortnight (was £248), left alone because of the promo (policy). |
| Market | Half term 26-30 Oct: **soft** in Camden (9-12 points behind last year) and Mile End (9-16 behind), **firmer** in Shepherd's Bush (4-9 ahead). Missed compression: **29 nights / £534** (23 Oct: 27 / £418). P11 darts alone is +£162 of the rise. |

## Actions - 2026-10-24

**Formula:** expected effect = price move x current open PriceLabs price x expected nights sold. Expected nights sold = nights in the window from confirmed bookings made in the previous 30 days, capped at the open nights. These counts come from the 23 Oct report's window table; they were not recomputed today. These are upper bounds, because elasticity is not measured. Prices are from today's comp sections and pricelabs.md. All moves are inside the PriceLabs min/max (`listings.csv`: P05 £150-2,500; P06 £200-800; P11 £120-1,200; P13 £110-2,000; P04 £90-2,000).

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P05, P06 (P09, P11, P12 hold) | **a-review-1026 (update): decision criteria for 26 Oct.** Hold all bases until then. **Pass** = booked next 30 at least market + 10 points AND at least 1 booking made 19-26 Oct (half the pre-raise rate, rounded up, for each flat). **P05:** pass -> base £550 -> **£605**; fail -> hold £550, no cut. **P06:** pass -> **+10% override on 5-7 Nov** (£332/£363/£366 -> about £365/£399/£403); fail -> hold. **P09:** hold £176 either way. It passes on count, but the booking paid a P33 guest price, and only 9 nights are left before the 26 Nov handback. **P11:** no base change either way. Rule +5% applies to near nights only, and only if a booking arrives. First find the cause of the -10.9% (row 6). **P12:** hold £284 (rule hold). **P01:** no action (0 open nights). | PriceLabs > Base price; Date-specific overrides | P05 66.7% vs 38% at <P25 = +10%, 0 bookings since £550. P06 78.6% vs 44% at P33 = +10%. P09 66.7% vs 37% at P62 = +10%, overridden (paid £126.61 = P33, 0.77x). P11 48.3% vs 45% at <P25 = +5%, last booking 4 Oct. P12 40% vs 40% at P49 = hold. Raised flats 0.5/day vs 1.0/day. | **About £773/month if both pass.** P05: 10% x (4 x £482 + 8 x £592) = £667 (£592 = remaining 60-day open average). P06: 10% x 3 x £354 = £106. | Corentin (approve) / Claude (review) | 2026-10-26 |
| 2 | P13 | **a-p13-1023 (update).** **25 and 26 Oct: +10%** (£136/£140 -> about £150/£154), replacing yesterday's +5% on these two nights. **19, 20 and 21 Nov: +5%**, as yesterday (20/21 Nov £216/£218 -> about £227/£229). Apply on 3064856. Check that the child 3090701 keeps its gap. **Must be done today for 25 Oct.** | PriceLabs 3064856 (parent) > Date-specific overrides | comp-west: within 14 days 8/14 booked vs 42.9% market (+14 points) at P2 = rule +10%. Next 30 P20 = +5%. market.md §2: market P25 £205/£209 on 25/26 Oct; Shepherd's Bush 4-9 points ahead of last year. 20/21 Nov £3/£1 under the England v NZ fortnight. Still well under P25 after the move. | **About £59 one-off upper bound.** 10% x (£136 + £140) = £28, plus 5% x (£197 + £216 + £218) = £32. 19 Nov £197 is from 23 Oct, not re-checked. 30-day pickup 14 caps at these 5 open nights. | Corentin | 2026-10-26 |
| 3 | P11 | **a-camden-dec (update, needs your decision).** Reyhan's 23 Oct edit set **12-18 Dec to +5%**, and 13-17 Dec now average **£256**. Your 21 Oct decision was "average above £300". Choose one: **(A)** keep +5% (Reyhan's call), and policy.json is updated; or **(B)** set **13-17 Dec to +24%**, which gives about £302 average (£256 / 1.05 x 1.24), and leave 12 and 18 Dec at +5%. This replaces yesterday's +28% proposal. 23 Dec is now above its fortnight (£333 vs £326): no change. | PriceLabs 3064196 > Date-specific overrides (Vrbo 12037367 copies) | pricelabs.md item 2; get_user_logs 23 Oct 11:11:36Z. market.md §4: all 5 darts nights under the £299 fortnight = £214. Against (B): darts-night market occupancy 13-21% and band position P33-P43 (comp-central). | **(B): about £54 one-off.** £46.4/night x 5 nights x 3/13 (P11's W2 sell-through on 23 Oct). | Corentin | 2026-10-26 |
| 4 | P04 | **a-orphans (update).** (a) **25 Oct min stay 3 -> 1, today** (£141; Booking.com shows 1.2x = about £169). After today the night is lost. (b) **2 Dec +200% -> 0%** (£630 now, about £210 at 0%, against neighbours of £202/£204). (c) **P12 17 Nov +50% (£378, min 1): reset to 0%**, or confirm it is intended. | PriceLabs 3562176 / 2699998 > Date-specific overrides | pricelabs.md items 5, 6, 10. 25 Oct is a 1-night gap between the 22-25 Oct and 26 Oct-1 Nov stays. | Not quantified (no sell-through data on 1-night gaps). Up to £141 + £210 + about £252 one-off if all three sell. | Corentin | 2026-10-24 |
| 5 | P09 + portfolio | **a-airbnb-rules (update).** First post-21 Oct evidence: P09 paid **0.77x PriceLabs** with no stay discount. Send the **Smoobu Airbnb default pricing rules for Torrent Lodge (3318172)** and P09's Airbnb Discounts page first, then P06, P08, P05, P12. Also check in Airbnb that the 13-15 Nov reservation is live: Smoobu calls it "modification of booking" and the price text reads "Cancellation Host Fee / Payout". If rules like Shepherd's Bush's old set (last-minute -15% within 28 days) are on, cut them back or price them in, as you prefer (visible discount + uplift). | Smoobu > Channel Manager > Airbnb > Torrent Lodge > Default pricing rules; Airbnb > P09 > Pricing > Discounts | channel.md: £253.21 vs £329 = -23.0%. A -15% last-minute rule would give £279.65, still leaving -9.5% unexplained. Airbnb-led forward book is **-£4,592** vs PriceLabs after stay discounts. On this evidence Airbnb nets about £65 per £100 PriceLabs, against Direct £90. | Not quantified until the rules are seen. Exposure: -£4,592 on forward booked nights. | Corentin | 2026-10-26 |
| 6 | P11 | **a-p11-fall (new).** Find why all P11 prices fell a **median 10.9%** overnight with no log entry. Look at PriceLabs 3064196 > Customizations > **Booking Recency Factor** (5% after 15 days without a booking, up to 15% at 45 days) and the occupancy-based adjustment. If the recency factor is the cause, decide whether to keep it while the flat sells on Booking.com only (it fits Oct-Nov but not December). | PriceLabs 3064196 > Customizations; Price breakdown (calendar) | comp-central: base/min/max unchanged; Oct -5.9%, Nov -10.4%, Dec -11.9%; last booking made 4 Oct (20 days ago). Next 30 now £219 <P25 (-28% vs 2-bed P50 £306). | Not quantified (cause unknown). | Corentin | 2026-10-26 |
| 7 | P12 | **a-p12-hold (update, advice).** Hold £284. No manual cut: 1-7 Nov has already eased to £1,327 (P32, -11.8% vs P50). **Get the data:** send P12's Booking.com promotions screen (never seen). If 1-7 Nov is still unsold on 28 Oct: min stay 2 -> 1 on 1-7 Nov only. | Booking.com extranet > Promotions (Mile End); PriceLabs 2699998 | comp-east; channel.md §2: cancelled stay paid £197.55/night; Booking.com guest price before promotions £212-252. Pace to handback -38.2%. Mile End half term 9-16 points behind last year. | £0 (protects ADR). At stake: 7 nights, £1,327 listed. | Claude | 2026-10-28 |
| 8 | P20 | **a-p20 (update).** The 20-21 Nov cause is found: a Smoobu **"Blocked channel"** block, **id 160937106, created 21 Oct 20:27**. What is it for? If it was not meant, delete it (England v NZ / The Script weekend; £303/£311 listed). Still open: the end date of the 20% new-listing promo, and the source of the December 4-night minimum (4-6, 11-13, 18-20 Dec). | Smoobu > Calendar 3547481 | comp-east (Smoobu GET); pricelabs.md item 8. 13.3% booked next 30 vs 35% market. | Not quantified (W1 pickup 5). Up to £614 list if reopened and sold. | Corentin | 2026-10-26 |
| 9 | P05 | **a-p05-block (new).** Why are **27-28 Oct** blocked? 28 Oct was open on 23 Oct, and there is no reservation behind either night. If not intended, reopen them: 27-30 Oct would become a 4-night run at £345/£399/£419/£404 before the 31 Oct check-in. | Smoobu > Calendar (Abbey Rd) | occupancy.md; comp-central. P05 is 66.7% booked vs 38% market. | Not quantified. Up to £744 list for 27-28 Oct. | Corentin | 2026-10-25 |
| 10 | P13 | **a-p13-twin (update).** New fact: **3090701 is a PriceLabs child of 3064856.** Overrides are copied from the parent, and prices are identical from 23 Nov (24 open nights) even though the uncustomized prices differ by about 10%. Proposal: give the child a **+3% offset** in its child-listing settings rather than per-date overrides. Please confirm how the child link was set up. | PriceLabs 3090701 > child-listing / offset settings | comp-west; policy `listing_facts.P13.twin_listings` (narrow, never identical). | Not quantified (protects against Airbnb duplicate blocking). | Corentin | 2026-10-26 |
| 11 | Portfolio (Airbnb) | **a-airbnb-pace (new, advice).** Decide on 25 Oct. If 24-25 Oct together bring **at most 1 Airbnb booking**, treat it as a real slowdown and bring it into the 26 Oct review, before any rise. No change before that. 20 Oct (before the removal) was also 0, so the cause is not proven. | - | channel.md §1: 2 bookings 20-23 Oct (0.5/day) vs 24 in 9-19 Oct (2.2/day). The 14-day total is still 21 vs 10. | £0 (decision rule). | Claude | 2026-10-25 |
| 12 | P11, P04 | **t-channel-gaps (update).** Camden's last booking was made **4 Oct (20 days ago)**. It has 27 open nights before 18 Dec, on Booking.com only, while Booking.com has had no organic booking for 13 days. Relisting on Airbnb is still the main volume lever. | Airbnb (Camden); Smoobu > Channels | occupancy.md; channel.md §2; policy `listing_facts.P11`. | Not quantified. | Corentin | 2026-10-30 |
| 13 | P08 | **a-p08 (update, advice).** Hold to the 13 Nov handback. Do not lower the £150 minimum: 1 Nov is already on it after the third unlogged fall in a row. Optional: **6-7 Nov +5%** (£191/£192 -> about £201/£202, matching the Arsenal v Hull fortnight). | PriceLabs 3318167 | comp-central: 35% vs 50% at <P25 = fix-listing 0%. The +5% override on 6-7 Nov is justified by the event data (market.md §4: £21 under fortnight). | About £10 one-off (5% x £383 x 0.5 sell-through, upper bound). | Corentin | 2026-10-26 |
| 14 | P11 | **t-p11-sync: done.** Reyhan's 23 Oct 11:11Z edit replaced the 18/27 Nov orphan overrides (now min 2, 0%). PriceLabs shows 18-27 Nov open at £2,600 for 10 nights and `occupancy_next_30` 63% -> 53%. Smoobu matches. Optional: check the Booking.com calendar is open for 19-26 Nov. | - | pricelabs.md item 1; channel.md §2. | - | Claude | - |

Unchanged and still open: a-bcom-cancel (flexible cancellation window), a-p04-raise (comp-east now advises hold, because the +5% rests on a 0.0 quality default; judge at 26 Oct), a-extra-guest, a-titles, a-tidy, t-comps, t-p02-vrbo, t-p13-commission, t-unmapped. No proposed price is outside PriceLabs min/max. P14 is excluded by policy. Every row needs approval.

## Top 5 for today
1. **P04 25 Oct: min stay 3 -> 1 today**, or the night is lost (a-orphans).
2. **P13 25-26 Oct +10%** (£136/£140 against market P25 £205/£209, with Shepherd's Bush ahead of last year). 25 Oct is tomorrow.
3. **P11 darts: confirm (A) keep +5% or (B) +24%** to restore your "above £300" (now £256). Also find the cause of the unlogged -10.9% on all P11 prices.
4. **P09 paid 0.77x PriceLabs on Airbnb.** Send the Smoobu Airbnb rules and the Discounts page for Torrent Lodge (-£4,592 Airbnb exposure).
5. **26 Oct review:** criteria set (row 1). Airbnb pace check on 25 Oct. Also tell us the purpose of the P20 20-21 Nov block (id 160937106) and the P05 27-28 Oct block.

## Growth plays

- **Booking.com volume.** KPI: net Booking.com nights per week. Last 14 days: -21 nights, -£4,621. No organic booking for 13 days. Levers:
  - a tighter flexible cancellation window (a-bcom-cancel);
  - P12 promotions check (row 7);
  - Camden on Airbnb (row 12).
  - Target: net positive every week by 2026-11-06.
- **Airbnb net rate.** KPI: paid vs PriceLabs on post-21 Oct Airbnb bookings. Today: 1 booking at 0.77x (P09). Target: at least 0.95x before stay discounts by 2026-11-04, the end of policy monitoring (row 5).
- **Review score.** KPI: rating. Portfolio Airbnb 4.4 / Booking 8.9 (info pack). Per listing we only have P13 Booking 8.4 (15 reviews) and Camden Booking 8.0. `listings.csv` ratings are blank and there are no comp ratings, so the gap that caps our premium cannot be measured.
  - **Get the data:** Airbnb > Reviews and Booking.com > Guest reviews, per listing.
  - Target 4.8 / 9.3 by 2027-01-31.
- **Listing conversion.** KPI: booked vs market on fix-listing flats.
  - P20: 13.3% vs 35%, no reviews yet. Ask the 22-25 and 28-31 Oct guests for reviews.
  - P08: 35% vs 50% at <P25.
  - P13's weak twin converts at 0.48% vs 2.26%.
  - Superhost / Preferred status: **get the data**.
- **Gap fill.** KPI: unsellable nights. Today: P04 25 Oct.
  - Premium single nights: P04 2 Dec (£630), P12 17 Nov (£378).
  - Proposed standing rule: 1-night gaps go to min stay 1 at 0%.
  - Mid-term (91+ nights): 0 on the books.
- **Direct share.** KPI: direct + website share of stay revenue. 1.53% last 365, 0% forward (23 Oct report; not recomputed). **Get the data:** the direct-site URL and booking engine.
- **Event compression.** KPI: open event nights at or below their fortnight. Today **29 nights / £534**:
  - P20: 11 / £215 (promo, left alone).
  - P11: 5 / £214 (row 3).
  - P04: 9 / £80.
  - P08: 2 / £21 (row 13).
  - P13: 2 / £4 (row 2).

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 Smoobu units) | **69.7%** (kpi_pack) | hold at least 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | **£174.56** | £190 | 2026-12-18 |
| RevPAR, last 30 | **£121.74** | £129 (68% x £190) | 2026-12-18 |
| Revenue, last 30 | £47,479.42 | £51,680 | 2026-12-18 |
| Booked next 30 (handback-aware) | **42.0%** (171/407); next 60 33.6% | each unit at least market + 10 points | 2026-10-26 |
| 7-day pickup | 6 bookings / 22 n / £7,148.59, all Airbnb; Booking.com cancellations -15 n / -£3,119.27; net +7 n | net Booking.com nights positive each week | 2026-11-06 |
| Booking.com net, 14 days | -21 n / -£4,621; 13 days without an organic booking | positive | 2026-11-06 |
| Airbnb paid vs PriceLabs (post-21 Oct) | 0.77x (1 booking, P09) | at least 0.95x before stay discounts | 2026-11-04 |
| Missed compression | 29 nights / £534 | under 10 nights | 2026-11-07 |
| RGI | UNKNOWN: Competitor Listings not enabled, comps.csv empty | above 1.10 on every property | data 2026-10-30; target 2027-03-31 |
| Rating | Airbnb 4.4 / Booking 8.9 (portfolio); per listing blank | 4.8 / 9.3, then top decile | data 2026-11-01; target 2027-01-31 |
| Direct share | 1.53% last 365; 0% forward | 5% | 2027-06-30 |
| Search placement | UNKNOWN (Camden 21 Oct: search views -64% vs market) | page 1 for area search | data source needed |

## Data gaps (get the data)
1. **P09 Smoobu Airbnb pricing rules and Airbnb Discounts page.** Without them the 0.77x gap cannot be split. Also confirm the 13-15 Nov reservation is live (Smoobu wording).
2. **P11 price breakdown** for the -10.9% fall (PriceLabs calendar breakdown / Customizations). The value of the old darts override is not exposed by the API.
3. **Block purposes:** P20 20-21 Nov (Smoobu 160937106) and P05 27-28 Oct. Source: Smoobu calendar notes or Corentin.
4. **P12 Booking.com promotions**; Booking.com flexible cancellation window.
5. **Live OTA prices.** The proxy refuses airbnb.co.uk / booking.com (CONNECT 403, 24 Oct), so `channel_checks.csv` is empty.
6. **Competitor Listings and per-listing ratings** for RGI and the rating gap (t-comps).
7. **PriceLabs refresh lag:** P09 13-14 Nov still open. The `user_price` field lags `price` on overridden dates (P11 18 Nov shows £278 vs £214 live).
8. **Pipeline:** kpi_pack is not handback-aware and lists `market.csv` as empty (the comp agents filled it after the build). 3090701 has no Smoobu rate merged.
9. **P15-P19:** keys for the second account. **P03:** no reservation data.
