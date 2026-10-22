# Seeker Estates - Daily revenue report, 2026-10-22

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs Corentin's explicit approval.**

Inputs: `kpi_pack.json`, `kpi_summary.md`, `sections/{occupancy,pricelabs,channel,market,comp-east,comp-central,comp-west}.md`, `data/policy.json` (21 Oct version, read first), `reports/2026-10-21/daily-report.md`, `reports/2026-10-18/kpi_pack.json`. Window figures recomputed from `data/snapshots/2026-10-22/{prices.csv,reservations.csv}` (no guest data used).

Policy respected: P02/P03/P06/P07 blocks are intentional and not lost demand. P14 gets numbers only. Visibility Booster commission (Camden 1 Nov-18 Dec and Jan-Feb; Shepherd's Bush from 21 Oct check-ins) is not flagged. 15%/20% stay discounts are expected. P13 is one flat; its 1 Dec +50% is intentional. Booking.com +20% markup is global and its promotions stack. Nights after the handbacks (P01 20 Dec, P08 13 Nov, P09 26 Nov, P10 18 Nov, P12 13 Dec) are not inventory. P20's 20% Airbnb new-listing promotion and its separately paid 18-22 Oct extension are explained.

## Executive summary

1. **Last 30 nights (13 Smoobu units): occupancy 69.7%, ADR £172.76, RevPAR £120.49, revenue £46,990.16** (kpi_pack `portfolio_last30`; matches the brief). 21 Oct: 70.0% / £172.56 / £120.79 / £47,109.79. The change is the window moving, not a lost booking. **Next 30, handback-aware: 45.8% booked (182/397 inventory nights)**; next 60: 37.4% (265/708) (occupancy.md).
2. **One new booking overnight: P20 Airbnb 28-31 Oct, booked 21 Oct, £529.92 = £176.64/night.** PriceLabs had £234/£248/£254 (refresh 21 Oct 08:52Z). Even after the 20% new-listing promotion (expected £637.60), it is **£107.68 (-16.9%) short**; on PriceLabs' 20 Oct prices the residual is -10% (channel.md §1, comp-east). This fits a Smoobu Airbnb default pricing rule on P20 (the same cause fixed on Shepherd's Bush on 21 Oct). P20's rules have not been seen, so this is inference.
3. **Booking.com has had no organic booking for 12 days (11-21 Oct).** The prior 14 days had 10 bookings / 47 nights / £7,746 (P11 4, P12 4, P02 1, P10 1). The last 14 days had 1 booking / 4 nights / £472 (P13). That is a volume problem, not a rate problem (channel.md §2). It also clouds the 26 Oct judgement on P11 and P12, which sell mostly on Booking.com (P11 55.8%, P12 90.0% of last-365 revenue, occupancy.md).
4. **P04 Barking is now priced from Smoobu 3562176 only.** The Channex listing's push was switched off on 21 Oct at 09:06Z, and it now shows as deleted. **2-6 Nov are open again** at £187/£192/£185/£183/£160, because Smoobu has the 2-7 Nov Booking.com stay (£682.02) as cancelled. Whether Booking.com shows it as cancelled is **unknown**: if it does not, those 5 nights could be double-booked (pricelabs.md HIGH 2).
5. **18 Oct base rises: 1 booking in about 3 days across the six units** (P01, 19 Oct, 18-21 Dec, £240.30/night). Before the raise the same units took 12 bookings in 4-17 Oct (0.86/day). Three days is too short to judge, and the Booking.com drop hits P11 and P12. Hold everything to 26 Oct (a-review-1026).

## What changed since 21 Oct, per property (including the 18 Oct rises)

### Effect of the 18 Oct base rises (P01, P05, P06, P09, P11, P12)

Sources: kpi_pack 2026-10-18 and 2026-10-22 (`forward_occ_30`, `avg_open_price_next30`, `pace_90`), occupancy.md "Effect so far", comp sections. Open-price averages cover different nights on each date (the window rolls), so treat them as indicative.

| Ref | Base (18 Oct -> now) | Bookings made since the raise | Open avg next 30: 18 Oct -> 22 Oct | Booked next 30: 18 Oct -> 22 Oct (market) | Pace | Position now | Read |
|---|---|---|---|---|---|---|---|
| P01 | £230 -> £253 | 1 (booked 19 Oct, stay 18-21 Dec, 3 n, £720.90, ADR £240.30) | no open nights | 100% -> 100% (32%) | No STLY. OTB 90 days 43 -> 42 n | 0 sellable nights to the 20 Dec handback | Nothing left to sell. Out of the test. |
| P05 | £455 -> £500 (18 Oct) -> £550 (20 Oct) | 0 (the 22-29 Dec booking was made before the raise) | £449.12 -> £478.56 (+6.6%) | 69.0% -> 65.5% (38%) | No STLY. OTB 90 days 52 -> 48 n | Next 30 £479 <P25 (-22% vs 4-bed P50 £612); next 60 £541 = P35 | Base +20.9%, open price only +6.6%. The 4-bed median rose 591 -> 612 overnight. Still 27.5 points ahead of market. |
| P06 | £340 -> £357 | 0 (4 in the 14 days before) | £291.17 -> £299.67 (+2.9%) | 48.3% -> 44.8% (42%); 81% of unblocked nights | No STLY | 3 open nights (5-7 Nov), £300 <P25 | Little at stake. 5 Nov rose 253 -> 336 with no log. |
| P09 | £160 -> £176 | 0 (3 in the 14 days before) | £151.58 -> £157.27 (+3.8%) | 58.6% -> 58.6% (37%) | No STLY. OTB 90 days 28 -> 24 n | 11 open nights to 26 Nov, P63 (+10.8% vs 1-bed P50 £142) | PriceLabs recommended base £167, below our £176. No pickup in 4 days. |
| P11 | £260 -> £286 (+ darts +20% 13-18 Dec on 21 Oct) | 0 (1 in the 14 days before) | £201.08 -> £237.36 (+18.0%) | 58.6% -> 62.1% (45%) | No STLY. OTB 90 days 53 -> 51 n | Next 30 £237 <P25 (-22%); next 60 £294 = P45 | Rise is passing through. Booking.com-only flat during a Booking.com-wide drop. |
| P12 | £270 -> £284 | 0 (2 in the 14 days before) | £218.00 -> £240.00 (+10.1%) | 58.6% -> 62.1% (40%) | Pace30 +15.6% revenue / -4 n; to handback -13.1% / -9 n; pace90 -30.6% / -13 n (includes post-handback nights) | Next 30 P67 (+14.1%); 31-60 P83 (+30.5%) | Hold. Pace to handback is negative. |

Six units together: 1 booking since 18 Oct (about 0.33/day) vs 0.86/day in 4-17 Oct and 1.17/day in 18 Sep-17 Oct (occupancy.md). Supply also shrank: P01 has 0 open nights and P09 sells only to 26 Nov. Formal judgement on 26 Oct.

### Per property

| Ref | Change since 21 Oct |
|---|---|
| P01 | No change. 41 of 41 inventory nights booked to the 20 Dec handback; 30 Nov-17 Dec block now explained by policy. |
| P02 | Intentional block. Fwd30 6 -> 5 booked nights (window). Vrbo 4438728 last push 24 Feb (now 240 days). |
| P03 | Intentional block. No data. |
| P04 | Channex listing gone from PriceLabs (push off 21 Oct 09:06Z); 3562176 is the only priced listing. Fwd30 48.3% -> **27.6%** (source change, not a lost booking). 2-6 Nov open again. Open prices **+8.0%** (£168 -> £182 on 38 nights) with no logged change. Next 30 £166.6 = P43 (-5.9% vs 2-bed P50 £177). 2 Dec orphan £551 -> **£612** (+200% override). 25 Oct is an unsellable orphan (1 night, min stay 3). Vrbo copy 12038555 still carries the old Channex overrides (no effect while fully blocked). |
| P05 | Prices flat (-0.4% on open nights). 4-bed P50 591 -> 612, so position P25 -> <P25 (-22%). No booking since £550. 27 Oct still blocked, reason unknown. |
| P06 | 5 Nov 253 -> 336 (no log). Last-30 occupancy 70.0% -> 66.7% (window). |
| P07 | Intentional block. No change. |
| P08 | Handback after 13 Nov now in policy. Booked 40.9% (9/22) vs 49% market at P31: `recommend` moves from raise +5% to **fix-listing, 0%**. 5 Nov 233 -> 184 (no log). |
| P09 | No booking. 11 open nights to 26 Nov. P65 -> P63. |
| P10 | No change. 27 of 27 inventory nights booked to the 18 Nov handback. |
| P11 | Darts override live: +20%, min stay 2, **13-18 Dec** (policy says 13-17 Dec). 13-17 Dec average £296 -> **£322**; 18 Dec £354 -> £390. Missed darts compression £170 -> £53 (14/15/16 Dec still £25/£20/£8 under the £331 fortnight). Near open nights +3.3% (no log). No pickup in 7 days. |
| P12 | No booking. Pace30 revenue +4.6% -> +15.6%; pace to handback -13.1%. The 3 PriceLabs/Smoobu differences (£3 on 26, 28, 29 Oct) are a snapshot timing artefact; live prices now match (pricelabs.md MEDIUM 4). 22 Oct still open (no reservation covers it). |
| P13 | No booking since the 20 Oct +10%; all 11 raised nights still open. Near open nights -£6 to -£9 (algorithm). Next 30 P25.8 -> P24.9 (-17.7% vs P50 £244). **Twins have identical PriceLabs prices on all 22 open nights 22 Nov-21 Dec**, though policy says they must differ. 20 Nov fell 232 -> 218, now £4 under its event fortnight. |
| P14 | Numbers only: 0% booked next 30 vs 41% market; 65% of open nights at the £500 minimum. |
| P15-P19 | Not connected (second account). |
| P20 | **New Airbnb booking 28-31 Oct** (£176.64/night; above). Fwd30 10% -> **17%** vs 34% market at P50. PriceLabs still shows 28-30 Oct open (last refresh 21 Oct 08:52Z, data lag). |

## Actions - 2026-10-22

**Windows** (prices.csv, pre-handback): W1 = 23 Oct-21 Nov, W2 = 22 Nov-21 Dec.

**Formula used throughout:** expected effect = price move % x average open PriceLabs price in the window x expected nights sold. Expected nights sold = nights placed in that window by confirmed bookings made 22 Sep-21 Oct (30-day pickup), capped at open nights. These are upper bounds: elasticity is not measured.

| Ref | W1 open / avg £ / 30d pickup | W2 open / avg £ / 30d pickup |
|---|---|---|
| P05 | 9 / £478.6 / 4 | 15 / £592.8 / 8 |
| P06 | 3 / £299.7 / 13 | 0 (policy block) |
| P08 | 13 / £193.4 / 9 | 0 (handback) |
| P09 | 11 / £157.3 / 18 | 0 (handback) |
| P11 | 11 / £237.4 / 12 | 8 / £372.6 / 3 |
| P12 | 11 / £240.7 / 15 | 15 / £275.3 / 0 |
| P13 (3064856) | 16 / £200.8 / 14 | 22 / £239.2 / 8 |
| P20 | 25 / £269.4 / 5 | 30 / £335.0 / 0 |
| P04 | 21 / £168.4 / n/a | 18 / £221.6 (incl. £612 orphan) / n/a (imported rows, not pickup) |
| P01, P10 | 0 open | 0 open |

Ranked by expected monthly £; "not quantified" rows follow, ranked by risk.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P05, P11, P09, P06 (P12 hold) | **a-review-1026 (update).** Hold all bases to 26 Oct. Pass test for each unit: booked next 30 still at least market + 10 points AND bookings made 19-26 Oct at least half the unit's pre-raise rate. **For P11 and P12, read the result against Booking.com volume across the portfolio** (no organic Booking.com booking since 10 Oct), not only their own pickup. If pass: P05 £550 -> **£605**; P11 £286 -> **£315**; P09 £176 -> **£185**; P06 £357 -> **£375**; P12 no rise. All within max (P05 £2,500, P11 £1,200, P09 £550, P06 £800). | PriceLabs > each listing > Base price | Effect table above. `recommend`: P05 raise +10% (65.5% vs 38%, <P25); P11 +10% (62.1% vs 45%, <P25); P09 +10% (58.6% vs 37%, P63) sized down to +5% because recommended base is £167 and there has been no pickup; P06 +10% on 3 nights sized to +5%; P12 +10% overridden to hold (pace to handback -13.1% / -9 n; 31-60 already P83). | **About £1,170/month if all pass:** P05 10% x (4 x £478.6 + 8 x £592.8) = £666; P11 10% x (11 x £237.4 + 3 x £372.6) = £373; P09 5% x 11 x £157.3 = £87; P06 5% x 3 x £299.7 = £45; P12 £0. | Corentin (approve) / Claude (review) | 2026-10-26 |
| 2 | P11 | **a-camden-dec (update).** (a) Confirm whether **18 Dec** is meant to be inside the +20% override (live: 13-18 Dec; policy: 13-17 Dec). (b) Raise the override on **14-16 Dec only from +20% to +28%** (about £326/£332/£345 vs the £331 fortnight). Keep 13 and 17 Dec at +20%. (c) Keep £300+ until 12 Nov, then step down to +10% if still open (unchanged). | PriceLabs 3064196 > Date-specific overrides | market.md §3: 14/15/16 Dec at £306/£311/£323, £53 under the fortnight; darts round one confirmed 13-17 Dec (14 Dec evening only). Against the week before only, 14 and 15 Dec are £16 and £11 under. | **About £20 one-off** = £53 gap x W2 sell-through 3/8. | Corentin | 2026-10-26 |
| 3 | P04 | **t-p04-2nov (new, critical).** Check the Booking.com extranet: is reservation **2-7 Nov (£682.02)** cancelled? If not, close 2-6 Nov in Smoobu at once and tell us. | Booking.com extranet > Reservations; Smoobu > Calendar 3562176 | pricelabs.md HIGH 2: 2-6 Nov open at £187/£192/£185/£183/£160 since the Channex listing went; Smoobu says cancelled; Booking.com status unknown. | Not quantified (risk control). Exposure: 5 nights, £907 list, double booking if the stay is live. | Corentin | 2026-10-23 |
| 4 | P11, P12, P13, P02, P10 | **t-bcom-down (update).** No organic Booking.com booking in 12 days. In the extranet, for P11, P12 and P13 (P02 and P10 are blocked or handed back): check (1) calendar open and synced on unbooked dates, (2) rate plans live, (3) Analytics > Search results for late Oct (data lags to 10 Oct), (4) any penalty or payment notice. St John's Wood screenshots still to send. | Booking.com extranet (each property) | channel.md §2: prior 14 days 10 bookings / 47 n / £7,746; last 14 days 1 / 4 n / £472 (P13). Camden 21 Oct: search views -64%, page visits -83% vs market (policy). The 21 Oct promotion changes are less than a day old, so they are not the cause. | Not quantified (recovery unknown). At stake: £7,274 per 14 days (£7,746 - £472). | Corentin | 2026-10-24 |
| 5 | P20 first, then P06, P08, P09, P12, P05 | **a-airbnb-rules (update).** Send screenshots of each flat's Smoobu Airbnb Default pricing rules. Proposed set-up, in line with your preference for visible discounts: in Smoobu set **last-minute and early-bird rules to 0%** on every flat (PriceLabs already applies last-minute and far-out pricing, and Smoobu rule discounts show no strikethrough). Keep 7+ nights -15% and 28+ nights -20% (policy). Where a near-date discount is wanted, run it as an **Airbnb promotion** so guests see the strikethrough. On Shepherd's Bush, the same switch would replace the -10% within 14 days rule. | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules; Airbnb > Listing > Pricing > Promotions | channel.md §1: the only Airbnb booking made since promotions were removed (P20) is £107.68 (-16.9%) under PriceLabs after the 20% new-listing promo. Policy: SB rules were -15% within 28 days and -12/-15% early bird before 21 Oct, and the systematic gap was 0.76-0.80x PriceLabs. Rules unknown for every flat but SB. | Not quantified (1 post-change booking). P20 alone: £35.89 per night sold (£107.68 / 3). | Corentin | 2026-10-24 |
| 6 | P20 | **a-p20 (update).** (1) Check Booking.com shows **28-30 Oct closed** (PriceLabs still shows them open; last refresh 21 Oct 08:52Z). (2) Send P20's Smoobu Airbnb rules (row 5) and the **end date of the 20% new-listing promotion**. (3) No price change while the promo runs (policy). (4) Listing work: photo order (parking and view first, matching the title), first reviews from the 22-25 Oct and 28-31 Oct guests. (5) Source of the 4-night minimum on 4-6, 11-13 and 18-20 Dec (no override): set 3. Min £220 / base £350 unchanged. | Booking.com extranet > Calendar; Smoobu; Airbnb listing; PriceLabs 3547481 > min-stay | Pack: 17% booked next 30 vs 34% market at P50 = `recommend` fix-listing 0%. 31-60: 0% vs 27% at P77 = lower -7%, not proposed because policy says the promo is why price is not adjusted. Event nights 10 / £283 under the fortnight (market.md), left alone for the same reason. | Not quantified: W1 pickup 5, W2 pickup 0. | Corentin | 2026-10-26 |
| 7 | P04, P11, P12 | **a-orphans (update).** (a) P04 **25 Oct min stay 3 -> 1** at £161 (unsellable now). (b) P04 **2 Dec +200% -> 0%** (now £612, 3.0x its £197-£203 neighbours; would be about £204). (c) P11 18 Nov +30% (£318) and 27 Nov +60% (£590), P12 17 Nov +50% (£364): reset to 0%, or confirm the premium is intended. P13 1 Dec is intentional (policy) and stays. | PriceLabs 3562176 / 3064196 / 2699998 > Date-specific overrides | pricelabs.md HIGH 3 and MEDIUM 6. 2 Dec override was copied from Channex on 20 Oct; not in policy. | Not quantified (no sell-through data on 1-night gaps). Up to £161 (25 Oct) + £204 (2 Dec) one-off if they sell. | Corentin | 2026-10-23 |
| 8 | P04 | **a-p04-raise (update: smaller).** Remove the extra **-5% override on 1-24 Nov** (set to 0%, keep min stay 3). Hold base £220 (was: £220 -> £242). Min £90 / max £2,000 unchanged. | PriceLabs 3562176 > Date-specific overrides | comp-east: next 30 £166.6 = P43 (-5.9% vs P50 £177), booked 29% vs 25% market (+4 points) = `recommend` raise +5%, which the -5% override alone explains. Not +10%: open prices already rose 8% overnight with no logged cause, and there is no real P04 pickup. Also narrows 7 of the 9 P04 event nights under the fortnight (£89 of £93, market.md). | Not quantified (no P04 pickup history). | Corentin | 2026-10-26 |
| 9 | P13 | **a-p13-twin (update).** Twins must differ: add **+3% on 3090701 for 22 Nov-21 Dec** (now identical to 3064856 on all 22 open nights). Keep improving 3064856 with 3090701's selling points (2.26% vs 0.48% conversion). Within P13 min £110 / max £2,000 (3064856 bounds in pack; 3090701 bounds not in pack). | PriceLabs 3090701 > Date-specific overrides; Airbnb listing 3064856 | comp-west: 0.0% gap on 22 open nights 22 Nov-21 Dec; next 30 gap +7.0%. policy `listing_facts.P13.twin_listings`. | Not quantified (protects against Airbnb duplicate blocking). | Corentin | 2026-10-24 |
| 10 | P13 | **t-p13-commission (new).** Was a Visibility Booster or another fee on the **12-16 Oct** Booking.com stay? Commission £124.24 on £472.19 = 26.3%; the booster window starts at 21 Oct check-ins. | Booking.com extranet > Reservation > Commission | channel.md §2. | £53.41 above 15% on this stay (£124.24 - 15% x £472.19). | Corentin | 2026-10-25 |
| 11 | All | **t-comps (new).** Enable PriceLabs **Competitor Listings** (or a Market Dashboard) for at least P05, P11, P12, P13, P20, and load our per-listing ratings into `listings.csv`. Without them RGI, ARI and the rating gap cannot be measured. | PriceLabs > Market Dashboard / Neighbourhood data sources | All comp sections: "Competitor Listings source is not enabled"; `comps.csv` and `channel_checks.csv` empty (pack `missing`); `quality_premium` 0 by default. | Not quantified (data for goal 3). | Corentin | 2026-10-30 |
| 12 | P02 | **t-p02-vrbo (update).** Vrbo 4438728: reconnect, or switch push off if the Vrbo listing is not live. | PriceLabs > Vrbo 4438728 > Sync | pricelabs.md CRITICAL 1: push on, last push 24 Feb, **240 days**. Block itself is intentional. | Not quantified (hygiene). | Corentin | 2026-10-25 |
| 13 | P04, P13, info pack | **a-tidy (update).** Add: P04 Vrbo copy **12038555** still pushes the old Channex overrides (1 Nov +150% min 1, 2 Dec +200%): switch push off if not live, or re-link to 3562176. Refresh `build/properties.py` (bases P01 £253, P05 £550 and 4 bedrooms, P06 £357, P09 £176, P11 £286, P12 £284; add P20). | PriceLabs > Listings; info pack | pricelabs.md HIGH 2, item 11. | Not quantified. | Corentin / Claude | 2026-10-25 |
| 14 | P08 | **a-p08 (update: hold).** Drop the +5% idea; hold price to the 13 Nov handback. | - | comp-central: 40.9% vs 49% market at P31 = `recommend` fix-listing 0%. Yesterday's +5% came from 43.5% vs 48%; the threshold was crossed by the window rolling, not a lost booking. With 13 open nights left, listing work will not pay back. | £0 (yesterday's £100/month withdrawn). | Claude | 2026-10-26 |
| 15 | P12 | **a-p12-22oct (expires tonight).** 22 Oct min stay 2 -> 1 at £188 still applies today only. No reservation covers 22 Oct (reservations.csv). Close it tomorrow if not done. | PriceLabs 2699998 > Date-specific override | 21 Oct report item 8. | Up to £188 one-off. | Corentin | 2026-10-22 |

No proposed price is outside PriceLabs min/max. P14 is excluded by policy. Every row needs approval.

## Top 5 for today
1. **t-p04-2nov** - is the Barking 2-7 Nov Booking.com stay really cancelled? 5 nights (£907) are open for sale.
2. **t-bcom-down** - no organic Booking.com booking in 12 days (prior 14 days: 10 bookings, £7,746). Check P11, P12, P13 in the extranet.
3. **a-airbnb-rules** - send P20's Smoobu Airbnb rules first: its new booking is 16.9% under PriceLabs even after the 20% promo. Switch invisible rules to visible Airbnb promotions.
4. **a-review-1026** - 26 Oct base judgement. 1 booking in 3 days on the six raised units; read P11/P12 against the Booking.com drop.
5. **a-p20** - Waterford: check 28-30 Oct is closed on Booking.com, promo end date, listing fixes (17% vs 34% market at P50).

## Growth plays

- **Rate integrity (KPI: paid vs PriceLabs after stay discounts).** The only post-21 Oct Airbnb booking is -16.9% beyond its promo. Smoobu Airbnb rules are known only for Shepherd's Bush. Target: Airbnb paid within 5% of PriceLabs after stay discounts on bookings made after the rules change, by 2026-11-15. Airbnb monitoring (to 4 Nov): 24 bookings in the last 14 days vs 9 in the prior 14, so no drop yet; only 1 day has passed since the promotions were removed (channel.md §1).
- **Booking.com volume (KPI: organic Booking.com bookings per week).** 0 in 12 days. Booking.com nets £102 per £100 base vs Airbnb £84.50 (pack `channel_economics`, before promotions), so losing it costs margin as well as volume. Target: back to 5 a week (prior 14 days had 10) by 2026-11-05.
- **Review score (KPI: rating).** Airbnb 4.4 / Booking 8.9 (info pack, portfolio). Per listing we only have: P13 Booking 8.4 (15 reviews), one P13 twin Airbnb 4.63 (8), Camden Booking 8.0, P20 none (policy). Per-listing ratings are blank in `listings.csv` and there are no comp ratings, so the gap that caps our premium cannot be measured. **Get the data:** Airbnb > Reviews and Booking extranet > Guest reviews per listing, plus Competitor Listings (row 11). Operational fixes to target once we see the review text: cleaning checklist sign-off, check-in instructions, noise and heating notes. Target 4.8 / 9.3 by 2027-01-31.
- **Listing conversion (KPI: booked vs market on soft units).** P20 17% vs 34% at P50 and P08 40.9% vs 49% at P31 are listing problems by our rule. P13's weak twin converts at 0.48% vs 2.26%. Superhost / Preferred status: **get the data** from Airbnb and Booking.com settings.
- **Gap fill and length of stay (KPI: unsellable nights).** Unsellable today: P04 25 Oct (min stay 3) and P12 22 Oct. Single nights carrying premiums: P04 2 Dec, P11 18 and 27 Nov, P12 17 Nov. Propose a standing rule: 1-night gaps go to min stay 1 at no premium. Mid-term (91+ nights): 0 on the books; hold until the Airbnb rules are fixed, as 28+ night stays carry the rule discounts too.
- **Direct share (KPI: direct + website share of stay revenue).** **1.57% of last-365 revenue** (Direct 0.39% + Website 1.18% of £378,269) and **0% of the £65,952 forward** (excl. P04; reservations.csv). Direct nets £90 per £100 (config default, unconfirmed). **Get the data:** direct-site URL and booking engine for `channel_checks.csv`.
- **Event compression (KPI: open event nights below their fortnight).** 24 nights / £441 under, down from 26 / £566 on 21 Oct (market.md). P20 10 / £283 (left alone: promo), P04 9 / £93 (row 8 fixes most), P11 3 / £53 (row 2), P13 2 / £12 (hold; P13 still within the post-21 Oct wait). New dates to watch: darts final Sun 3 Jan (P11 £208, clean week £204, not missed), NYE tickets on sale 23 Oct (P20 £625, P13 £392, already above), Bett 20-22 Jan (P20 above).

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 Smoobu units) | **69.7%** (kpi_pack) | hold at least 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | **£172.76** | £190 | 2026-12-18 |
| RevPAR, last 30 | **£120.49** | £129 (68% x £190) | 2026-12-18 |
| Revenue, last 30 | £46,990.16 | £51,680 (272 n x £190) | 2026-12-18 |
| Booked next 30 (handback-aware) | **45.8%** (182/397; occupancy.md) | each unit at least market + 10 points | 2026-10-26 |
| 7-day pickup | 9 bookings / 45 n / £11,061.52, all Airbnb | at least 1 Booking.com booking a day | 2026-11-05 |
| Airbnb paid vs PriceLabs (after stay discounts) | -16.9% beyond promo on the single post-21 Oct booking (P20) | within 5% | 2026-11-15 |
| RGI | UNKNOWN: no market ADR/RevPAR, comps.csv empty | above 1.10 on every property | data 2026-10-30; target 2027-03-31 |
| Rating | Airbnb 4.4 / Booking 8.9 (portfolio); per listing blank | 4.8 / 9.3, then top decile | data 2026-11-01; target 2027-01-31 |
| Direct share | 1.57% last 365; 0% forward | 5% | 2027-06-30 |
| Search placement | UNKNOWN (Camden 21 Oct: search views -64% vs market, policy) | page 1 for area search | data source needed |

## Data gaps (get the data)

1. **Booking.com status of P04 2-7 Nov** and whether the Channex property still serves any OTA. Source: Booking.com extranet, Channex dashboard.
2. **Smoobu Airbnb Default pricing rules for every flat except Shepherd's Bush**, and P20's promo end date. Source: Smoobu > Channel Manager > Airbnb; Airbnb > Promotions.
3. **Booking.com extranet** for P11, P12, P13: sync, rate plans, ranking after 10 Oct.
4. **Live OTA prices:** Airbnb and Booking.com did not respond from this environment (22 Oct 06:09Z); `channel_checks.csv` is empty.
5. **Competitor Listings / ratings** for RGI and the rating gap (row 11).
6. **Unlogged price moves:** P04 +8%, P06 5 Nov +33%, P08 5 Nov -21%, P11 near nights +3%. Source: PriceLabs UI price breakdown.
7. **P05 27 Oct block** reason (P09 25 Oct is in policy).
8. **Pipeline:** kpi_pack `pace_90` still counts post-handback nights (P12 -30.6% vs -13.1% to handback). PriceLabs data in the snapshot was mostly last refreshed on 21 Oct, so P20 28-30 Oct still shows open there.
9. **P15-P19:** second-account keys. **P03:** no reservation data.
