## Channel parity

Run date D = 2026-10-30 (GMT). I read `data/policy.json` first and do not raise anything it settles again:
- the 15%/20% stay discounts;
- Booking.com promotion stacking (I report sizes only);
- the Visibility Booster (P13 18–27 Nov 20% commission is booster-covered);
- P13 = one flat;
- the P02/P03/P06/P07 blocks and P14;
- P20's recorded Airbnb discounts;
- nights after handback;
- the deprioritised items.

**Sources (all read-only)**
- **Smoobu API GET, 30 Oct 07:22Z:** `/api/reservations?modifiedFrom=2026-09-28&includePriceElements=true`. Guest fields were dropped; the only note snippet kept is `booker_is_genius`. Saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live30/smoobu_mod30_pe.json`.
- **Smoobu `/api/rates`, 07:24:01Z:** saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live30/smoobu_rates30.json`.
- **PriceLabs price at booking time** = the last `last_refreshed_at` before Smoobu `created-at`, read from `data/snapshots/2026-10-27..30/raw/prices_*.json`.
- **PriceLabs `get_user_logs`** (listing, 29–30 Oct): **0 entries**. Nobody edited a listing between yesterday's run and the three new bookings.
- **Live Airbnb:** 40 plain public airbnb.co.uk searches with curl and no workarounds, 30 Oct 07:24:34Z–07:31:21Z. One JSON per search is in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live30/air/`, with the log in `.../live30/air/log.txt`. I also loaded two room pages (07:32:42Z) for host identity: `.../live30/rooms/`. I appended 25 rows under lock to `data/snapshots/2026-10-30/channel_checks.csv`; each row carries the URL, stay, guests, timestamp and Smoobu rates.
- **Booking.com: NOT CHECKED.** One plain search at 07:34:10Z returned an HTTP 202 AWS WAF challenge (`.../live30/bk/search.html`). I did not try to get around it. **Vrbo / Direct: NOT CHECKED.** There is no URL and no checks row.
- **Config:** Booking.com +15% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct −10% are still unconfirmed defaults.**
- `reservations.csv` `total_gbp` is room only. On Booking.com it includes 20% VAT (Smoobu `VAT` = basePrice/6 on all three new Booking.com rows).

### 1. New bookings (booked 29 Oct): paid vs PriceLabs at booking, with the stack

| Ref | Channel | Stay / guests / lead | Smoobu created | PriceLabs at booking (refresh used) | Paid room (Smoobu basePrice) | Paid ÷ PriceLabs | Stack | Commission | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| **P05** | Airbnb | 6–9 Nov, 3 n, 7 adults, 8 d | 29 Oct 16:07 (modified 20:33) | **£1,399** (463/477/459; refresh 29 Oct 08:57:56Z; no edits since). The Dispatcher's £1,386 was the 28 Oct refresh. | £893.52 (+£195 cleaning) | **0.639** (0.645 against £1,386) | Policy expects £1,399: 3 nights, no stay discount, and P05 has no Airbnb discount recorded. The hidden ≤28-day layer gives 0.765: £1,070.24 against the 29 Oct refresh, or £1,060.29 against 28 Oct. comp-central saw exactly £1,060.29 room (card £1,255.29) on 29 Oct (`snapshots/2026-10-29/channel_checks.csv`). **Paid is a further 0.835–0.843 below that card.** No clean factor fits. A host "Special offer" (lines of this size seen on P08 on 29 Oct and on P13 3090701 today, §2) or a price change at the 20:33 modification would explain it. **NOT CHECKED:** Airbnb's reservation price breakdown. | £168.72 = 15.5% of room + cleaning | **£505.48 below policy.** Of that, **£328.76** is the hidden 0.765 layer and **£176.72 is unexplained**. Report. |
| **P04** | Airbnb | 6–9 Nov, 3 n, 5 adults, 8 d | 29 Oct 18:58 | **£465** (154/155/156; refresh 29 Oct 09:09:41Z; no edits since). The Dispatcher's £472 was the 28 Oct refresh. | £355.72 (+£142 cleaning) | **0.765 exactly** (465 × 0.765 = 355.725) | **Channel: Smoobu → Airbnb listing 1657859794156786222, host 660820693 "Seeker Estates".** The price used was the **Smoobu/PriceLabs rate × the hidden 0.765 layer**, not the other Barking listing's own price: that listing quotes £474.68 card for the same dates. Evidence: (a) that listing's 9–12 Nov card is £504.61 = 474 × 0.765 + £142, exact to the penny; (b) it is not offered on any Smoobu-booked date (3–6, 6–9, 20–23 Nov); (c) its £142 cleaning matches this booking and the 28 Sep stay imported on 26 Oct. That import suggests the listing was connected to Smoobu around 26 Oct (inference). | £77.15 = 15.5% | **£109.28 below policy, all of it the hidden layer.** |
| **P12** | Booking.com | 3–7 Dec, 4 n, 3 adults + 3 children (6, full occupancy), 35 d, Genius booker | 29 Oct 21:04 | **£1,148–£1,186.** £1,148 is the 28 Oct 12:45Z refresh (273/301/310/264). The next refresh in the snapshots is 30 Oct 06:19Z, at £1,186. No edits on 29 Oct (logs), but a 29 Oct auto-refresh is not in the snapshots. | £1,072.44 (+£150 cleaning; VAT £178.74 inside) | **0.934** (0.904 against £1,186) | List = £1,148 × 1.15 = £1,320 (rounded per night). Paid = **0.812 of list** = **two 10% layers** (0.81 → £1,069.4, +£3). The candidates are Genius 10% × Mobile 10%, or NR 10% × Genius 10%. No Last Minute (35 d > 30), no occupancy discount (6 guests), not Weekly (4 n). Genius 15% (L2/3) × Mobile would be 0.765 (£1,010) and does not fit. Smoobu does not show the rate plan. | £183.37 = 15.0% | **Explained by promotions** (19% off list). It resells 3 of the 4 nights of the cancelled 4–8 Dec booking (£279/n) at £268/n. 7 Dec is still open. |

### 2. Live Airbnb parity, 30 Oct (lead-time layers)

How the columns are built:
- **Expected** = Smoobu rate × (1 + 0%) × the discounts policy recognises: P20 last-minute 15% at 0–14 d; P13 last-minute 10% within 14 d and early-bird 10% at 60+ d (`airbnb_smoobu_settings_21oct.changed_21oct`).
- **Displayed room** = card total (incl. cleaning, before taxes) − cleaning (P20/P12/P13 £150, P05 £195, P08 £149, P04 synced listing £142).
- The **gap** is after any visible line on the card.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source (`live30/air/`) |
|---|---|---|---|---|---|---|---|---|---|
| P20 | Airbnb | 9–12 Nov (10) | 2 | £736 | £625.60 (LM15) | £563.03 (£713.03) | −10.0% | FLAG | p20_0912nov 07:28:14Z |
| P20 | Airbnb | 5–8 Dec (36) | 2 | £937 | £937.00 | £843.30 (£993.30) | −10.0% | FLAG | p20_0508dec |
| P20 | Airbnb | 3–6 Jan (65) | 2 | £893 | £893.00 | £893.00 (£1,043.00) | 0.0% | ok | p20_0306jan 07:31:09Z |
| P12 | Airbnb | 18–21 Nov (19) | 2 | £814 | £814.00 | £622.70 (£772.70) | **−23.5%** | FLAG | p12_1821nov |
| P12 | Airbnb | 29 Nov–2 Dec (30) | 2 | £814 | £814.00 | £732.60 (£882.60) | −10.0% | FLAG | p12_2902dec |
| P12 | Airbnb | 8–11 Dec (39) | 2 | £810 | £810.00 | £729.00 (£879.00) | −10.0% | FLAG | p12_0811dec 07:31:14Z |
| P13 3090701 | Airbnb | 8–11 Nov (9) | 4 | £568 | £511.20 (LM10) | £426.11. Card £696.30 struck to £576.11 by a **"Special offer −£120.19"**. Before the offer the room is £546.30 (0.962 of Smoobu). | **−16.6%** | FLAG | p13_0811nov 07:29:51Z |
| P13 3064856 | Airbnb | 8–11 Nov (9) | 4 | £467 | £420.30 (LM10) | £357.25 (£507.25) | −15.0% | FLAG | same |
| P13 both | Airbnb | 8–11 Dec (39) | 4 | £663 | £663.00 | £596.70 (£746.70) | −10.0% | FLAG | p13_0811dec |
| P13 both | Airbnb | 3–6 Jan (65) | 4 | £609 | £548.10 (EB10) | £548.10 (£759 → £698.10, visible "Early booking discount −£60.90") | 0.0% | ok | p13_0306jan |
| P05 | Airbnb | 16–18 Nov (17) | 7 | £876 | £876.00 | £670.14 (£865.14) | **−23.5%** | FLAG | p05_1618nov |
| P05 | Airbnb | 29 Nov–3 Dec (30) | 7 | £2,152 | £2,152.00 | £1,936.80 (£2,131.80) | −10.0% | FLAG | p05_2903dec |
| P05 | Airbnb | 7–9 Dec (38) | 7 | £1,015 | £1,015.00 | £913.50 (£1,108.50) | −10.0% | FLAG | p05_0709dec |
| P05 | Airbnb | 4–7 Jan (66) | 7 | £1,269 | £1,269.00 (no P05 early-bird in policy) | £1,116.72 (£1,464 → £1,311.72, visible "Early booking discount −£152.28" = 12% of room) | −12.0% | FLAG (visible) | p05_0407jan |
| P08 | Airbnb | 5–7 Nov (6) | 4 | £421 | £421.00 | £322.06 (£471.06), **no Special offer line** | −23.5% | FLAG | p08_0507nov 07:25:13Z |
| P04 synced listing 1657859794156786222 | Airbnb | 9–12 / 10–13 Nov (10–11) | 2 | £474 | £474.00 | £362.61 (£504.61) | −23.5% | FLAG | scan_barking_0912nov, p04b_1013nov |
| P04 synced listing | Airbnb | 23–25 Nov, **2 n** (24) | 2 | £407 (Smoobu min 2) | not bookable (policy min 3) | **bookable**, £298.35 (£440.35) | −26.7% + min-stay | FLAG | p04b_2326nov 07:27:43Z |
| P04 listing 1455876748739910219 (host 551951609) | Airbnb | **3–6 Nov** | 2 | Smoobu **booked** (Booking.com, 28 Oct) | not bookable | **bookable, £518.20 card** | double-sell | **FLAG** | p04_0306nov 07:24:34Z, p04b_0306nov |
| P04 listing 1455… | Airbnb | **6–9 Nov** | 2 and 5 | Smoobu **booked** (Airbnb via 1657…, 29 Oct) | not bookable | **bookable, £474.68 card** | double-sell | **FLAG** | p04_0609nov, p04_0609nov_5ad, p04b_0609nov |
| P04 listing 1455… | Airbnb | **20–23 Nov** | 2 | Smoobu **booked** (Booking.com, 26 Oct) | not bookable | **bookable, £541.64 card** | double-sell | **FLAG** | p04_2023nov, p04b_2023nov |
| P04 listing 1455… | Airbnb | 14–17 Nov, 26–29 Nov, 3–6 Dec, 30 Oct–2 Nov | 2 | Smoobu booked | not bookable | not offered | — | ok | p04_1417nov, p04_2629nov, p04_0306dec, p04_3001nov |
| P04 listing 1455… | Airbnb | 1 n: 1–2, 3–4, 10–11, 18–19 Nov; 2 n: 10–12, 18–20 Nov | 2 | min 3 (policy) | not bookable | **not offered** | — | ok (t-p04-airbnb-minstay fixed) | p04_*_1n, p04_1012nov_2n, p04_1820nov_2n |
| P04 listing 1455… | Airbnb | 9–12 / 10–13 Nov | 2 | £474 | — | £497.00 / £513.56 card (own pricing, not Smoobu) | — | info | p04_0912nov, p04b_1013nov |
| all | Booking.com | — | — | — | — | NOT CHECKED: AWS WAF challenge 07:34:10Z | — | — | live30/bk/search.html |
| all | Vrbo / Direct | — | — | — | — | NOT CHECKED: no URL, no checks row | — | — | — |

**a-airbnb-rules: not fixed.** All 25 Smoobu-synced cards resolve exactly, per night:
- **0.765** at ≤28 days;
- **0.900** at 29–39 days (seen today); yesterday it also held up to 58 days;
- **1.000** at 65+ days.

The same layers apply on P20, P12, both P13 listings, P05, P08, and now also the Smoobu-synced Barking listing. They are not shown to guests.

At 64+ days, a **visible** "Early booking discount" appears: 10% on P13 (policy) and **12% on P05 (not in policy)**.

**Barking has two live Airbnb listings for one flat:**
- **1657859794156786222** (host 660820693 "Seeker Estates", 9 reviews) is synced with Smoobu. It took the 6–9 Nov booking.
- **1455876748739910219** (host 551951609 "Seeker Estates LTD", the same host as the other flats, 26 reviews) is **not synced**. It runs its own prices and still sells three stays that Smoobu has booked.

This corrects the past assumption that 1455… is "the separate account". On host ids, it is the other way round. Policy only says "a different Airbnb account", so which one Corentin meant is for him to confirm.

**t-p08-offer: no longer showing.** P08 5–7 Nov is plain 0.765 with no offer line (also comp-central, 5–8 Nov, "no offer line shown"). But a **"Special offer" now appears on P13 3090701**: −£120.19 on 8–11 Nov (mine) and −£80.39 on 8–10 Nov (comp-west row). On 8–11 Nov it takes the net to 0.750 of Smoobu, below the twin's 0.765. Policy says all manual Airbnb promotions were removed on 21 Oct, so the source is unknown.

### 3. Monitoring (until 4 Nov)

**a) Airbnb bookings, last 14 days (17–30 Oct) vs prior 14 (3–16 Oct).** Source: `data/snapshots/2026-10-30/reservations.csv`, confirmed rows by `booked_on`, room £. The P04 28 Sep stay imported on 26 Oct is excluded as not pickup.

| Window | Bookings | Nights | Room £ | £/night | Cancelled |
|---|---|---|---|---|---|
| Last 14 | 17 | 71 | £16,176.77 | £228 | 1 (P08 duplicate) |
| Prior 14 | 18 | 147 | £21,359.86 | £145 | 2 |
| Change | −6% | **−52% (>50% drop)** | −24% | +57% | |
| Prior without the two 28+ night stays (P01 30 n, P10 32 n) | 16 | 85 | £13,405.11 | £158 | |
| Change on that basis | +6% | −16% | +21% | +44% | |

| Property | Last 14 (count / nights / £/n) | Prior 14 | >50% drop? |
|---|---|---|---|
| P01 | 1 / 3 / £240 | 1 / 30 / £152 | nights −90%: one 30-night stay; gap block and handback (inventory) |
| P02 | 0 | 2 / 10 / £106 | intentional block, not raised |
| P04 | 2 / 4 / £143 | 0 | — (both via Airbnb; 6–9 Nov on synced listing) |
| P05 | 2 / 10 / £542 | 1 / 4 / £459 | no |
| P06 | 1 / 3 / £268 | 4 / 18 / £189 | **yes, count −75% / nights −83%**. Intentional-block flat on the Flexible test; reported, not raised as lost demand |
| P08 | 3 / 15 / £132 | 0 | — |
| P09 | 1 / 2 / £127 | 3 / 23 / £103 | **yes, −67% / −91%**. Handback 26 Nov; inventory-limited |
| P10 | 0 | 1 / 32 / £106 | **yes, −100%**. Sold out to its 18 Nov handback |
| **P12** | **0** | **2 / 5 / £170** | **yes, −100%**. Not inventory: Airbnb shows P12 bookable 18–21 Nov, 29 Nov–2 Dec and 8–11 Dec (§2) |
| P13 | 3 / 14 / £206 | 3 / 13 / £156 | no |
| P20 | 4 / 20 / £177 | 1 / 12 / £155 | no |

Paid ÷ PriceLabs at booking, Airbnb bookings made after 21 Oct:

| Booked | Ref | Stay (lead) | Paid ÷ PriceLabs | After policy stay discounts | Explained? |
|---|---|---|---|---|---|
| 23 Oct | P09 | 13–15 Nov (21) | 0.770 | 0.770 | rules deprioritised |
| 25 Oct | P08 | 31 Oct–5 Nov (6) | 0.850 | 0.850 | no |
| 25 Oct | P06 | 5–8 Nov (11) | 0.765 | 0.765 | no: hidden layer |
| 26 Oct | P04 | 19–20 Dec (54) | 0.947 | 0.947 | listing not identified (cleaning £129 and a 1-night stay fit 1455…, not the synced 1657…). NOT CHECKED |
| 26 Oct | P13 | 27 Dec–3 Jan (62) | 0.768 | 0.903 | yes (weekly × early-bird) |
| 27 Oct | P08 | 27–31 Oct (0) | 0.772 | 0.772 | no |
| 27 Oct | P20 | 2–6 Nov (6) | 0.738 | 0.868 vs LM15 | partly |
| 28 Oct | P20 | 25 Nov–5 Dec (28) | 0.639 | 0.752 | no: hidden 0.765 layer (£574) |
| **29 Oct** | **P05** | **6–9 Nov (8)** | **0.639** | **0.639** | **no: 0.765 layer + £176.72 unexplained** |
| **29 Oct** | **P04** | **6–9 Nov (8)** | **0.765** | **0.765** | **no: hidden layer (£109.28)** |

Rows before 29 Oct are from `reports/2026-10-29/sections/channel.md`. **9 of the 10 are below policy.** No Airbnb booking made after 21 Oct is close to PriceLabs minus the stay discounts.

**Flexible-cancellation test** (P20, P06, P05 since 24 Oct; day 6 of 14):
- Test group: 4 bookings (P20 ×2, P06, P05), 0 cancelled.
- Others: 4 organic (P08 ×2, P13, P04), 1 cancelled (P08 duplicate).
- Too early to read.

**b) Booking.com since the markup cut (+30% → +15%, 24 Oct 13:38).** The P04 duplicates of 26 Oct (2 cancelled) and the Channex imports dated 20 Oct are excluded.

| Booked | Booking | Nights | Room £ | PriceLabs at booking | Paid ÷ PriceLabs |
|---|---|---|---|---|---|
| 24 Oct | P12 5–12 Nov | 7 | £932.90 | £1,456 | 0.641 |
| 24 Oct | P04 14–18 Nov | 4 | £437.69 | £617 | 0.709 |
| 25 Oct | P12 26–30 Oct | 4 | £434.76 | £679 | 0.640 |
| 26 Oct | P04 20–23 Nov | 3 | £355.82 | £533 | 0.668 |
| 26 Oct | P12 4–8 Dec (**cancelled 28 Oct**) | 4 | £1,116.99 | £1,180 | 0.947 |
| 27 Oct | P13 18–27 Nov | 9 | £1,143.76 | £1,709 | 0.669 |
| 27 Oct | P11 5–8 Dec | 3 | £656.07 | £809 | 0.811 |
| 28 Oct | P11 28–31 Oct | 3 | £565.38 | £617 | 0.916 |
| 28 Oct | P04 3–6 Nov | 3 | £393.18 | £469 | 0.838 |
| 28 Oct | P12 21–26 Nov | 5 | £1,012.36 | £1,209 | 0.837 |
| **29 Oct** | **P12 3–7 Dec** | **4** | **£1,072.44** | **£1,148** | **0.934** |
| **Gross since cut (5.7 days)** | **11** | **49** | **£8,121.35** | £10,426 | **0.779** |
| **Still confirmed** | **10** | **45** | **£7,004.36** | £9,246 | **0.758** |

- Pace: **1.9 bookings/day gross, 1.8/day net.** Before the cut it was about 0.33/day (28 Oct section).
- **No new cancellations since 29 Oct** (Smoobu, modified since 29 Oct 07:00).
- Cancellations since the cut of bookings made before it total 25 n, −£5,051.37: P12 22–29 Nov £1,314.40, P11 28 Nov–12 Dec £2,950.82, P12 18–22 Nov £786.15.
- **Net of cancellations: +20 nights, +£1,952.99** (yesterday +16 n, +£880.55).
- The cut still cannot be credited on its own. Last Minute 10% started the same day, and the confirmed bookings sold at 0.64–0.93 of PriceLabs.

### 4. Net to owner per £100 PriceLabs price (`channel_economics`, plus what was observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (pack) | £115.00 | £97.75 |
| Booking.com P12 3–7 Dec (0.934, 15%) | £93.4 | **£79.4** (VAT inside, as in the pack) |
| Booking.com since cut, confirmed (0.758, 15–20%) | £75.8 | ~£61–64 |
| Airbnb model (pack) | £100.00 | £84.50 |
| Airbnb live 65+ d | £100.00 (P13 £90, P05 £88 with visible early-bird) | £84.50 (£76.05 / £74.36) |
| Airbnb live 29–~60 d (0.900) | £90.00 | £76.05 |
| Airbnb live ≤28 d (0.765) | £76.50 | £64.64 |
| Airbnb P05 booking 29 Oct (0.639) | £63.9 | **£54.0** |
| Direct (−10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` list is empty. The observed figures break its rule, though: **direct is not the cheapest guest price.** Airbnb at ≤60 days (£76.50–£90) and Booking.com since the cut (£75.8) are at or below the £90 direct price.
- Booking.com ≥ Airbnb net holds on the new P12 stay: £79.4 vs £76.05 for Airbnb at 35 days.
- Ordering of direct < Airbnb/Booking/Vrbo on the same dates is NOT CHECKED: Booking.com was blocked, and Vrbo/direct have no URL.

### 5. Fees and min stay, displayed vs Smoobu

**P04 Barking (two Airbnb listings)**
- Listing 1455… no longer offers 1- or 2-night stays. **t-p04-airbnb-minstay is fixed.**
- The synced listing 1657… sells **2 nights on 23–25 Nov**, because Smoobu has min 2 there from Reyhan's 27 Oct override. That conflicts with "never under 3" (`listing_facts.P04`). It is reported for Corentin to confirm, not proposed.
- Cleaning on the synced listing is **£142**. Smoobu Booking.com cleaning is £129; the 19–20 Dec Airbnb booking carried £129.

**Cleaning and commission on the new bookings**
- P05 £195 (policy); P12 Booking.com £150.
- Commission: Airbnb 15.5% (P05, P04); Booking.com P12 15.0%.

**PriceLabs sync**
- The 30 Oct raw now shows P12 21–25 Nov and 3–6 Dec as Booked, and P04 3–5 Nov as Booked. **The t-pl-sync P12 part is fixed.**
- P04 6–8 Nov is not yet seen: the refresh at 09:09Z was before the 18:58 booking.

### Issues ordered by £ impact

1. **P04 Barking Airbnb listing 1455876748739910219 double-sells three Smoobu stays (t-p04-doublebook: not fixed, worse). Critical.**
   - It is bookable on 3–6 Nov (Booking.com £393.18), 6–9 Nov (Airbnb via the synced listing, £355.72) and 20–23 Nov (Booking.com £355.82).
   - **£1,104.72 of room revenue at risk**, plus relocation cost (not quantified). Arrival 3 Nov is 4 days away.
   - **Setting:** Airbnb host 551951609 "Seeker Estates LTD" > listing 1455876748739910219 > Calendar: **block 3–8 Nov and 20–22 Nov now.** Then either map it in Smoobu > Channel Manager > Airbnb to apartment 3562176, or snooze or unlist it. Barking already sells through 1657859794156786222.
2. **Hidden Airbnb layers (a-airbnb-rules: not fixed).** Nights ≤28 days out sell at 0.765 and nights 29–~60 days out at 0.900, on every synced listing: P20, P12, P13 ×2, P05, P08 and P04.
   - The two bookings of 29 Oct lost **£438.04** to the layers: P05 £328.76 and P04 £109.28. Yesterday's P20 booking lost £545.
   - **Setting:** Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the "last-minute −15% within 28 days" rule and the ~−10% rule with a ~60-day window. Check for a global rule: Shepherd's Bush still shows 0.765 at 9 days despite its 21 Oct reset.
   - If a discount is wanted, set it as a visible Airbnb discount (`airbnb_visible_discounts`).
3. **P05 6–9 Nov: £176.72 below even the 0.765 card.** Cause unknown.
   - **Check:** Airbnb > Reservations > this stay > price breakdown. Was a Special offer sent, or was the price changed at the 20:33 modification?
4. **"Special offer" on P13 3090701 (8–11 Nov −£120.19, 8–10 Nov −£80.39).** It takes the net to 0.750 of Smoobu, below the twin's 0.765. It conflicts with the 21 Oct removal of all manual promotions, so it is for Corentin to decide.
   - **Setting:** Airbnb > listing 1587576514709814818 > Pricing > Promotions / Special offers.
   - The P08 offer (t-p08-offer) is gone.
5. **P05 visible "Early booking discount" 12% at 60+ days (−£152.28 on 4–7 Jan).** It is visible, which fits Corentin's preference, but it is not recorded in policy for P05.
   - **Confirm, or set:** Smoobu > Channel Manager > Airbnb > Abbey Rd > pricing rules (early bird).
6. **P04 synced listing sells 2-night stays (23–25 Nov).** This is a conflict with "never under 3", for Corentin to confirm.
   - **Setting:** PriceLabs 3562176 > date-specific overrides 18–20 and 23–25 Nov (min 2, Reyhan 27 Oct).
7. **P12 Airbnb: no bookings in 14 days (−100%).** It is bookable at 0.765/0.900 (§2), so not inventory. Not quantified.

Data gaps:
1. Booking.com displayed prices and promotions: NOT CHECKED (AWS WAF; not circumvented). The P12 3–7 Dec stack (two 10% layers) is inferred from paid ÷ list; the rate plan is not in Smoobu.
2. PriceLabs at the P12 booking is bounded at £1,148–£1,186. A 29 Oct auto-refresh is not in the snapshots.
3. The P05 6–9 Nov price breakdown (special offer or alteration) is not exposed by the Smoobu API.
4. Which Barking Airbnb listing took the 19–20 Dec booking (26 Oct), and whether 1455…'s bookings reach Smoobu at all: NOT CHECKED.
5. Policy calls one Barking listing "a different Airbnb account". On host ids, the unsynced listing 1455… is on host 551951609 (the same host as the other flats) and the synced 1657… is on host 660820693. Corentin to confirm.
6. Vrbo +8% and Direct −10% are unconfirmed defaults. There is no direct URL, so the direct < OTA ordering is model-only.
7. Airbnb cleaning amounts are taken from Smoobu bookings and exact factor fits, not from an itemised page.
8. `data/snapshots/2026-10-30/channel_checks.csv` had already been started by other agents without the 29 Oct rows. I appended to it and did not copy the 29 Oct rows forward. They remain in `data/snapshots/2026-10-29/channel_checks.csv`.
