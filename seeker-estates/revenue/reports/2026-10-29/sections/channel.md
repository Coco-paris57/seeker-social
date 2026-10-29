## Channel parity

Run date D = 2026-10-29 (GMT). `data/policy.json` read first. Nothing it settles is raised again: the 15%/20% stay discounts, Booking.com promotion stacking (sizes reported only), the Visibility Booster, P13 = one flat, the P02/P03/P06/P07 blocks, P14, P20's recorded Airbnb discounts, nights after handback, and the deprioritised items (P04 2 Dec, P12 17 Nov, P09 Airbnb rules, P13 twin order).

**Sources (all read-only)**
- Smoobu API GET, 29 Oct 07:21Z: `/api/reservations?modifiedFrom=2026-09-28&includePriceElements=true` (guest fields dropped) → `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live29/smoobu_mod29_pe.json`; Booking.com `price-details` + rate keywords from notes → `.../live29/smoobu_bk_details.json`; `/api/rates` 07:24:35Z → `.../live29/smoobu_rates29.json`.
- PriceLabs price at booking time = last `last_refreshed_at` before Smoobu `created-at`, from `data/snapshots/2026-10-26..29/raw/prices_*.json` (script `.../live29scripts/plat.py`). PriceLabs `get_user_logs` (listing, 27–29 Oct) and `get_listing_date_overrides` (P12 2699998, 15 Nov–13 Dec).
- Live Airbnb: 26 plain public airbnb.co.uk map searches (curl, no workarounds), 29 Oct 07:24:59Z–07:28:44Z. Log `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live29/air/log.txt`, one JSON per search; 26 rows appended under lock to `data/snapshots/2026-10-29/channel_checks.csv` (URL, stay dates, guests, timestamp in each row).
- **Booking.com: NOT CHECKED** — one plain search at 07:29:28Z returned HTTP 202 AWS WAF challenge (`.../live29/bk/search.html`); not circumvented. **Vrbo / Direct: NOT CHECKED** — no URL, no checks rows.
- Config: Booking.com +15% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct −10% remain unconfirmed defaults.**
- `reservations.csv` `total_gbp` = Smoobu basePrice = room only, cleaning excluded. For Booking.com it **includes 20% VAT** (Smoobu `VAT` element = basePrice/6 on every Booking.com row checked).

### 1. Airbnb parity (live, 29 Oct)

Expected = Smoobu rate × (1 + 0%) × discounts policy recognises: P20 last-minute 15% at 0–14 days (`listing_facts.P20.airbnb_discounts_22oct`), P13 last-minute 10% within 14 days (`airbnb_smoobu_settings_21oct.changed_21oct`), P12 none recorded; weekly 15% on 7+ nights. Displayed room = card total − £150 cleaning (card totals include cleaning, before taxes).

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|---|
| P20 | Airbnb | 6–9 Nov (8) | 2 | £779 | £662.15 (LM15) | £595.93 (£745.93) | −10.0% | FLAG | air/p20_0609nov.json 07:24:59Z |
| P20 | Airbnb | 9–12 Nov (11) | 2 | £783 | £665.55 (LM15) | £598.99 (£748.99) | −10.0% | FLAG | air/p20_0912nov.json |
| P20 | Airbnb | 13–16 Nov (15) | 2 | £799 | £799.00 | £611.23 (£761.23) | **−23.5%** | FLAG | air/p20_1316nov.json |
| P20 | Airbnb | 16–19 Nov (18) | 2 | £785 | £785.00 | £600.52 (£750.52) | **−23.5%** | FLAG | air/p20_1619nov.json |
| P20 | Airbnb | 22–25 Nov (24) | 2 | £789 | £789.00 | £603.58 (£753.58) | **−23.5%** | FLAG | air/p20_2225nov.json |
| P20 | Airbnb | 5–8 Dec (37) | 2 | £954 | £954.00 | £858.60 (£1,008.60) | −10.0% | FLAG | air/p20_0508dec.json |
| P20 | Airbnb | 5–12 Dec, 7 n (37) | 2 | £2,215 | £1,882.75 (weekly 15%) | £1,694.46 (£2,143.50 struck → £1,844.46; "Weekly stay discount −£299.04" shown) | −10.0% | FLAG | air/p20_0512dec_7n.json |
| P20 | Airbnb | 8–11 Dec (40) | 2 | £934 | £934.00 | £840.60 (£990.60) | −10.0% | FLAG | air/p20_0811dec.json |
| P20 | Airbnb | 14–17 Dec (46) | 2 | £819 | £819.00 | £737.10 (£887.10) | −10.0% | FLAG | air/p20_1417dec.json |
| P20 | Airbnb | 21–24 Dec (53) | 2 | £1,062 | £1,062.00 | £955.80 (£1,105.80) | −10.0% | FLAG | air/p20_2124dec.json |
| P20 | Airbnb | 24–27 Dec (56) | 2 | £1,077 | £1,077.00 | £969.30 (£1,119.30) | −10.0% | FLAG | air/p20_2427dec.json |
| P20 | Airbnb | 1–4 Jan (64) | 2 | £1,379 | £1,379.00 | £1,379.00 (£1,529.00) | 0.0% | ok | air/p20_0104jan.json |
| P20 | Airbnb | 3–6 Jan (66) | 2 | £901 | £901.00 | £901.00 (£1,051.00) | 0.0% | ok | air/p20_0306jan.json |
| P20 | Airbnb | 11–14 Jan (74) | 2 | £817 | £817.00 | £817.00 (£967.00) | 0.0% | ok | air/p20_1114jan.json |
| P12 | Airbnb | 17–20 Nov (19) | 2 | £680 | £680.00 | £520.19 (£670.19) | **−23.5%** | FLAG | air/p12_1720nov.json |
| P12 | Airbnb | 26–29 Nov (28–30) | 2 | £832 (246/274/312) | £832.00 | £715.59 (£865.59) | −14.0% (night at 28 d ×0.765, nights at 29–30 d ×0.900 = £715.59 exactly) | FLAG | air/p12_2629nov.json |
| P12 | Airbnb | 27–30 Nov (29) | 2 | £849 | £849.00 | £764.10 (£914.10) | −10.0% | FLAG | air/p12_2730nov.json |
| P12 | Airbnb | 1–4 Dec (33) | 2 | £795 | £795.00 | £715.50 (£865.50) | −10.0% | FLAG | air/p12_0104dec.json |
| P13 3090701 | Airbnb | 8–11 Nov (10) | 4 | £582 | £523.80 (LM10) | £445.22 (£595.22) | −15.0% | FLAG | air/p13_0811nov.json |
| P13 3064856 | Airbnb | 8–11 Nov (10) | 4 | £480 | £432.00 (LM10) | £367.20 (£517.20) | −15.0% | FLAG | same |
| P13 3090701 | Airbnb | 8–11 Dec (40) | 4 | £633 | £633.00 | £569.70 (£719.70) | −10.0% | FLAG | air/p13_0811dec.json |
| P13 3064856 | Airbnb | 8–11 Dec (40) | 4 | £670 | £670.00 | £603.00 (£753.00) | −10.0% | FLAG | same |
| P04 | Airbnb (separate account) | 10–11 Nov, **1 night** | 2 | £159, Smoobu min 3 | not bookable | **bookable**, £239.96 card | min-stay breach | FLAG | air/p04_1011nov_1n.json 07:26:53Z |
| P04 | Airbnb (separate account) | 18–19 Nov, **1 night** | 2 | £191, Smoobu min 2 | not bookable (policy min 3) | **bookable**, £251.48 card | min-stay breach | FLAG | air/p04_1819nov_1n.json 07:27:05Z |
| P04 | Airbnb (separate account) | 10–12 / 10–13 Nov | 2 | £318 / £479 | — | £376.76 / £513.56 card | flat £136.80/night + ~£103.16 cleaning, ignoring Smoobu's 159/159/161 | info | air/p04_1012nov_2n.json, p04_1013nov_3n.json |
| all | Booking.com | — | — | — | — | NOT CHECKED: AWS WAF challenge 07:29:28Z | — | — | live29/bk/search.html |
| all | Vrbo / Direct | — | — | — | — | NOT CHECKED: no URL, no checks row | — | — | — |

**The Airbnb hidden layers are still on (a-airbnb-rules not fixed), and they work per night, not per stay.**
- Every card resolves exactly. Nights ≤28 days out are sold at **0.765** of the Smoobu rate (0.85 × 0.90). Nights 29 to at least 58 days out are sold at **0.900**. Nights 64+ days out are sold at **1.000**. The cut-off is somewhere between 59 and 63 days.
- The proof is P12 26–29 Nov. That one stay mixed the two factors night by night (£715.59, exact to the penny). Airbnb's own last-minute or early-bird discounts are applied to the whole stay, based on when the guest books. A factor that changes night by night means the reduced nightly rates are being pushed per date. That points to Smoobu > Channel Manager > Airbnb pricing rules ("last-minute −15% within 28 days" is the old default in `airbnb_smoobu_settings_21oct`, plus a −10% rule with a window of about 60 days), not to the Airbnb Discounts page.
- The rules hit P20, P12 and both P13 listings the same way, so they are not per flat. Only Shepherd's Bush's rules were reset on 21 Oct, and its Airbnb cards still show 0.765 at 10 days, against the 0.90 its new rule should give.
- No strikethrough is shown, so guests do not see these cuts. Only the weekly 15% is visible (P20 7-night card). This goes against `airbnb_visible_discounts`.

### 2. New bookings (booked 28 Oct): paid vs PriceLabs at booking time, with the stack

| Ref | Channel | Stay / guests / lead | Smoobu created | PriceLabs at booking (refresh used) | Paid room (Smoobu basePrice) | Paid ÷ PriceLabs | Stack (policy factors) | Commission | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| **P04** | Booking.com | 3–6 Nov, 3 n, 4 adults, 6 d, Genius booker | 28 Oct 21:16 | **£469** (156/157/156; refresh 28 Oct 10:33Z, right after Reyhan's −7% 1–17 Nov at 10:32). The Dispatcher's £477 was the 27 Oct refresh. | £393.18 (+£129 cleaning, VAT £65.53 inside) | **0.838** (Dispatcher 0.824) | List = £469 × 1.15 = £539.35. Paid = **0.729 of list** = Standard (flexible) × Last Minute 10% (0–30 d, added 24 Oct) × Mobile 10% × Genius 10% → £393.20 (−£0.02). Not the NR plan: NR carries −5% occupancy for 1–4 guests (`non_refundable_rate`), which would give 0.693. Not Weekly/Monthly (3 nights). | £78.33 = 15.0% | Fully explained by promotions. Promotions take £146 off list (27%). |
| **P12** | Booking.com | 21–26 Nov, 5 n, 4 adults, 24 d, **not** a Genius booker (no `booker_is_genius`) | 28 Oct 18:06 | **£1,209** (262/240/243/222/242; refresh 28 Oct 12:45Z, right after Reyhan's 12:44 edits that replaced the a-p12-2228nov fixed overrides with −2% for 16 Nov–13 Dec). The Dispatcher's £1,366 was the 27 Oct refresh. | £1,012.36 (+£150 cleaning, VAT £168.73 inside) | **0.837** (Dispatcher 0.741) | List = £1,209 × 1.15 = £1,390.35 (£1,389 rounded per night). Paid = **0.728 of list** = three 10% layers (0.729; −£0.22 on rounded list): Last Minute 10% × Mobile 10% × one more 10%. With no Genius, the third is most likely the NR rate (−10%). The alternative LM 15% × Mobile 10% × occupancy −5% = 0.727 fits within £2. Rate plan not visible in Smoobu. Not Weekly (5 nights). | £174.35 = 15.0% | Explained by promotions. PriceLabs moved down £157 before the booking (£1,366 → £1,209), which is 44% of the £354 gap implied by the Dispatcher's figure. That part is not the channel. |
| **P20** | Airbnb | 25 Nov–5 Dec, **10 n**, 3 adults, 28 d | 28 Oct 14:11 | **£2,726** (refresh 27 Oct 14:42Z, which already includes Reyhan's −10% 13–30 Nov and −5% 1–20 Dec). The next refresh (28 Oct 14:20Z, after the booking) gave £2,840. Any refresh between them is unknown, so the price at booking was £2,726–£2,840. | £1,742.65 (+£150 cleaning) | **0.639** (0.614 against £2,840) | **Weekly 15% applies (10 nights)**: policy expectation = £2,726 × 0.85 = **£2,317.10**. Paid = 0.752 of that. Live layers: night 25 Nov was 28 d out → 0.765. The same factor on all nights gives £2,726 × 0.85 × 0.765 = £1,772.57; paid is −1.7% from that, within the refresh uncertainty. Nights 26 Nov–4 Dec were 29–37 d out, which would be ×0.900 (£2,085) if the per-night rule seen today applied. At booking the whole stay seems to have been sold at 0.765, so the window may have been 28-day booking-lead on 28 Oct, or rates were pushed before the 28 Oct 14:20 refresh. NOT CHECKED. | £293.36 = 15.5% of room + cleaning | **£574 below policy (−24.8%)**, of which ~£545 is the hidden 0.765 layer. Unexplained by policy: report. |

Smoobu labels on the P20 booking ("Cancellation Host Fee / Cancellation Payout") are Airbnb's standard payout lines. They also appear on the active 2–6 Nov booking. They are not a cancellation.

### 3. P12 Booking.com cancellations, last 30 days (Smoobu, modifiedFrom 28 Sep)

| Stay | Nights | Room £ (£/n) | Booked | Cancelled | Genius booker | Rate plan | Dates since |
|---|---|---|---|---|---|---|---|
| 5–10 Dec | 5 | £1,292.09 (£258) | 20 Sep | 18 Oct 11:03 | yes | NOT VISIBLE in Smoobu | 5–8 Dec rebooked 26 Oct, then cancelled (below); 5–10 Dec open now |
| 1–8 Nov | 7 | £1,382.86 (£198) | 3 Oct | 22 Oct 11:27 | no | NOT VISIBLE | 5–12 Nov resold 24 Oct at £932.90 (£133/n); 1–4 Nov open |
| 22–29 Nov | 7 | £1,314.40 (£188) | 15 Sep | 25 Oct 11:57 | yes | NOT VISIBLE | 22–25 Nov resold within 21–26 Nov at £202/n; 26–28 Nov open |
| 18–22 Nov | 4 | £786.15 (£197) | 19 Sep | 28 Oct 13:27 | yes | NOT VISIBLE | 21 Nov resold (21–26 Nov booking 4.6 h later); 18–20 Nov open |
| 4–8 Dec | 4 | £1,116.99 (£279) | 26 Oct 18:49 | 28 Oct 22:12 (~51 h) | yes | NOT VISIBLE. Paid 0.823 of list (PriceLabs £1,180 at 26 Oct 18:35Z) has no clean stack fit (two 10% layers = 0.81). | open |

- **Total cancelled in 30 days: £5,892.49, 27 nights.** Resold so far: 5–12 Nov (£932.90) and 21–26 Nov (£1,012.36).
- Smoobu shows no rate plan or refundability on any of them:
  - priceElements show only basePrice, commission, cleaning and VAT.
  - `price-details` shows only cleaning and VAT.
  - The notes show only `booker_is_genius`.
- No cancelled row carries a cancellation-fee element. That fits free (flexible) cancellations, but it does not prove them.
- **The pattern:** 4 of the 5 were booked 15 Sep–3 Oct, under the +30% markup, at £188–258/night. All 4 were cancelled 18–28 Oct, around the 24 Oct cut to +15% plus the new Last Minute 10%. That is consistent with guests on a free-cancellation rate rebooking cheaper. It cannot be confirmed:
  - Smoobu issues a new guest id per booking.
  - Guest details were not used.
- P12's Standard rate is Flexible-7 days, and Corentin saw no NR option on Mile End on 24 Oct (policy `listing_facts.P12`).

### 4. Monitoring

**a) Airbnb after the promotions were removed (21 Oct → 4 Nov).** Source: `data/snapshots/2026-10-29/reservations.csv`, confirmed rows by `booked_on`, room £. The P04 28 Sep stay imported on 26 Oct is excluded as not pickup.

| Window | Bookings | Nights | Room £ | £/night | Cancelled |
|---|---|---|---|---|---|
| Last 14 days (16–29 Oct) | 17 | 81 | £17,779.37 | £219.50 | 1 (P08 duplicate) |
| Prior 14 days (2–15 Oct) | 16 | 131 | £18,508.02 | £141.28 | 2 |
| Change | +6% | −38% | −4% | +55% | |

By week: 2–8 Oct 1, 9–15 Oct 15, 16–22 Oct 9, 23–29 Oct 8 bookings.

| Property | Last 14 (count / nights / £/n) | Prior 14 | >50% drop? |
|---|---|---|---|
| P01 | 1 / 3 / £240 | 1 / 30 / £152 | nights −90%: inventory (30-night stay; gap block; handback 20 Dec) |
| P02 | 0 | 2 / 10 / £106 | intentional block, not raised |
| P04 | 1 / 1 / £216 | 0 | — |
| P05 | 1 / 7 / £647 | 1 / 4 / £459 | no |
| P06 | 2 / 14 / £197 | 3 / 7 / £206 | count −33% |
| P08 | 3 / 15 / £132 | 0 | — |
| P09 | 1 / 2 / £127 | 3 / 23 / £103 | **yes** (−67% / −91%); handback 26 Nov, inventory-limited |
| P10 | 0 | 1 / 32 / £106 | **yes** (−100%); 100% booked to its 18 Nov handback |
| **P12** | **0** | **2 / 5 / £170** | **yes (−100%)**. Not explained by inventory: Airbnb shows P12 bookable 17–20 Nov, 26 Nov–4 Dec at 0.765–0.900 |
| P13 | 4 / 19 / £199 | 2 / 8 / £142 | no |
| P20 | 4 / 20 / £177 | 1 / 12 / £155 | no |

- **Portfolio: no drop over 50%** on count or revenue. Nights are −38% because the prior window had two 30+ night stays (P01, P10).
- £/night is up 55%, but the bookings made after 21 Oct still sell well below PriceLabs.

| Booked | Ref | Stay (lead) | Paid ÷ PriceLabs at booking | After policy stay discounts | Explained? |
|---|---|---|---|---|---|
| 23 Oct | P09 | 13–15 Nov (21) | 0.770 | 0.770 | rules deprioritised |
| 25 Oct | P08 | 31 Oct–5 Nov (6) | 0.850 | 0.850 | no (P08 rules not in policy) |
| 25 Oct | P06 | 5–8 Nov (11) | 0.765 | 0.765 | no: hidden layers |
| 26 Oct | P04 | 19–20 Dec (54) | 0.947 | 0.947 | separate account |
| 26 Oct | P13 | 27 Dec–3 Jan (62) | 0.768 | 0.903 | yes (weekly × early-bird) |
| 27 Oct | P08 | 27–31 Oct (0) | 0.772 | 0.772 | no |
| 27 Oct | P20 | 2–6 Nov (6) | 0.738 | 0.868 vs LM15 | partly (LM 15% allowed; hidden 10% not) |
| **28 Oct** | **P20** | **25 Nov–5 Dec (28)** | **0.639** | **0.752** | **no: hidden 0.765 layer** |

Rows before 28 Oct are from `reports/2026-10-28/sections/channel.md`.

**Flexible-cancellation test (P20, P06, P05 since 24 Oct, day 5 of 14):**
- Test group: 3 bookings (P20 ×2, P06), 0 cancelled.
- Other flats: 3 organic bookings (P08 ×2, P13), plus 1 P04 booking on its separate account. 1 cancelled (a P08 same-day duplicate).
- Too early to read.

**b) Booking.com since the markup cut (+30% → +15%, 24 Oct 13:38).** Organic bookings only. P04 Channex imports dated 20 Oct and the two P04 same-day duplicates are excluded.

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
| 28 Oct | **P04 3–6 Nov** | 3 | £393.18 | £469 | 0.838 |
| 28 Oct | **P12 21–26 Nov** | 5 | £1,012.36 | £1,209 | 0.837 |
| **Gross since cut (4.7 days)** | **10** | **45** | **£7,048.91** | £9,278 | **0.760** |
| **Still confirmed** | **9** | **41** | **£5,931.92** | £8,098 | **0.733** |

- Booking pace: **2.1 bookings/day gross, 1.9/day net**. Before the cut it was about 0.33/day over 30 days and 0 over the 13 days before (28 Oct section).
- Cancellations since the cut of bookings made before it:
  - P12 22–29 Nov: −£1,314.40.
  - P11 28 Nov–12 Dec: −£2,950.82 (booked in July).
  - P12 18–22 Nov: −£786.15.
  - Total: 25 nights, −£5,051.37.
- **Net of cancellations: +16 nights, +£880.55** (yesterday +£1,378.15).
- The cut still cannot be credited on its own. Last Minute 10% started the same day, and 8 of the 9 confirmed bookings sold at 0.64–0.84 of PriceLabs.
- The 18 Oct base rises (review closed 26 Oct, hold) show in these PriceLabs figures. They are offset at the channel by the promotions.

### 5. `rate_leak_next_30` (pack) and a correction

| Ref | Pack gap | Booked nights | VAT-corrected gap (my recalc., 29 Oct–27 Nov) |
|---|---|---|---|
| P13 | −59.1% | 8 | −50.9% |
| P12 | −46.0% | 9 | −38.4% |
| P04 | −41.4% | 9 | −29.1% |
| P08 | −39.6% | 10 | same (Airbnb) |
| P01 | −39.3% | 28 | same |
| P09 | −36.8% | 20 | same |
| P06 | −33.0% | 8 | same |
| P20 | −32.1% | 6 | same |
| P10 | −31.9% | 20 | same |
| P11 | −31.4% | 10 | −17.6% |
| P05 | −16.1% | 18 | same |

- The pack uses PriceLabs `ADR`, which strips the 20% VAT from Booking.com bookings. Example: P13 18–27 Nov ADR £105.90 = (£1,143.76 − £190.63 VAT) / 9. PriceLabs prices include VAT (guest-facing).
- So the pack overstates the gap on Booking.com-heavy flats (P04, P11, P12, P13) by about 8–14 points.
- It also compares against today's PriceLabs price, not the price at booking. The per-booking ratios above are the like-for-like measure.

### 6. Net to owner per £100 PriceLabs price

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com, model (pack) | £115.00 | £97.75 |
| Booking.com, P04 3–6 Nov / P12 21–26 Nov (0.838 / 0.837, 15%) | £83.8 | **£71.2** |
| Booking.com, since cut, confirmed (0.733, ~15–20%) | £73.3 | ~£59–62 |
| Airbnb, model (pack) | £100.00 | £84.50 |
| Airbnb live, 64+ days (1.000) | £100.00 | £84.50 |
| Airbnb live, 29–58 days (0.900) | £90.00 | £76.05 |
| Airbnb live, ≤28 days (0.765) | £76.50 | £64.64 |
| Airbnb live, 7–27 nights ≤28 days (0.765 × weekly 0.85) | £65.03 | **£54.95** (policy expects £71.83) |
| Direct (−10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `channel_economics.warnings` is empty. The observed figures break its rule, though: **direct is not the cheapest guest price**. Airbnb within 58 days and every Booking.com sale since the cut are below the £90 direct price.
- Booking.com ≥ Airbnb net holds for this week's two Booking.com bookings (£71.2 vs £64.6 for Airbnb ≤28 days).

### 7. Fees and min stay, displayed vs Smoobu

- **P04 Airbnb (separate account):**
  - 1-night stays are bookable on 10–11 and 18–19 Nov. Smoobu min is 3 and 2 there; policy says never fewer than 3. **t-p04-airbnb-minstay is not fixed.**
  - Pricing looks independent of Smoobu: a flat £136.80/night with about £103 cleaning, against Smoobu's £129 cleaning.
- **Reyhan's PriceLabs overrides conflict with standing decisions.** For Corentin to confirm, not new proposals:
  - P04 has min stay 2 on 18–19 and 23–24 Nov in Smoobu (and 25 Nov), from Reyhan's 27 Oct overrides. Policy says never fewer than 3.
  - P04 is at −7% for 1–17 Nov plus +15% on 18–20 and 23–25 Nov (28 Oct 10:32). Corentin's 24 Oct decision was −8% for 1–25 Nov.
  - P20 has min 2 on 31 Oct–1 Nov. Policy says 3 nights from 25 Oct to 30 Nov.
- Booking.com cleaning on the new bookings matches settings: P04 £129, P12 £150. Airbnb cleaning of £150 is inferred from exact factor fits, not from an itemised page.
- **a-p12-2228nov is fixed:** P12 22–25 Nov is now a −2% override (`get_listing_date_overrides`, updated 28 Oct 12:44Z), not fixed prices.

### Issues ordered by £ impact

1. **Hidden Airbnb pricing layers, portfolio-wide (P20, P12, P13 both listings; seen in P06/P08 bookings).**
   - Nights ≤28 days out sell at 0.765 of the Smoobu rate, nights 29–~60 days out at 0.900. The layers are applied per night, so they are pushed rates, not Airbnb discounts.
   - This week's cost: P20 25 Nov–5 Dec is £574 below policy. Each 3-night stay loses £180–190 at ≤28 days and about £80–95 at 29–60 days.
   - **Not fixed since 28 Oct.**
   - **Setting:** Smoobu > Channel Manager > Airbnb > (each apartment) Default pricing rules / price settings. Remove the last-minute −15% within 28 days and the −10% rule (window about 60 days) on every apartment. Shepherd's Bush also still shows 0.765 at 10 days, despite its 21 Oct reset to −10% within 14 days, so check whether a global Airbnb rule overrides the per-apartment one.
   - If a discount is wanted, set it as a visible Airbnb discount (`airbnb_visible_discounts`).
2. **P12 Booking.com cancellations: £5,892 in 30 days, 27 nights.** The pattern fits flexible-rate guests rebooking after the price fell (see §3), but the rate plan cannot be seen in Smoobu.
   - **Check:** Booking.com extranet > Mile End > Reservations, filtered on cancelled. Read the policy line on the 5 bookings (Flexible-7 days vs Non-refundable) and whether the same guest rebooked.
   - **Setting to review:** Booking.com extranet > Mile End > Rates & availability > Rate plans. Is NR (−10%) live and shown to guests? Policy notes it is hidden when promotions make Standard cheaper.
3. **P04 Airbnb sells 1-night stays.** 1-night cards: £240–252.
   - **Setting:** the Barking Airbnb account > listing 1455876748739910219 > Availability > Minimum nights = 3.
   - **For Corentin to confirm:** PriceLabs > Barking > date-specific overrides 18–20 and 23–25 Nov have min stay 2 (Reyhan), which conflicts with the 24 Oct "never fewer than 3" decision.
4. **Data correction (Dispatcher ratios).**
   - P04 is 0.838, not 0.824 (PriceLabs at booking £469, not £477).
   - P12 is 0.837, not 0.741 (£1,209 after Reyhan's 28 Oct 12:44 edit and refresh, not £1,366).
   - P20 is 0.639 against £2,726 (0.752 after weekly 15%).
   - The pack's `rate_leak_next_30` is overstated on Booking.com flats by the VAT strip (§5).

Data gaps:
1. Booking.com displayed prices and promotions: NOT CHECKED (AWS WAF; not circumvented). The P04/P12 stacks are inferred from paid ÷ list. An extranet reservation screenshot would confirm the rate plan (LM10 vs NR on P12).
2. The rate plan (NR vs flexible) of the P12 cancellations is not exposed by the Smoobu API. Whether the same guests rebooked is not determinable without guest data.
3. The PriceLabs price at the P20 booking (14:11Z, 28 Oct) is bounded at £2,726–£2,840. A refresh between 27 Oct 14:42Z and 28 Oct 14:20Z, if any, is not in the snapshots.
4. The exact cut-off of the Airbnb 0.900 layer is between 59 and 63 days (58 → 0.9, 64 → 1.0). Whether the 28 Oct sale applied 0.765 to all 10 nights (rather than per night) is unresolved.
5. The P04 Airbnb account's link to Smoobu is unconfirmed (its prices do not follow Smoobu).
6. Vrbo +8% and Direct −10% are unconfirmed defaults. There is no direct URL, so the direct < OTA ordering is model-only.
7. Airbnb cleaning (£150) is inferred from exact factor fits, not from an itemised page.
