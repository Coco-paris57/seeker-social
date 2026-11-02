## Channel parity

Run date D = 2026-11-02 (Monday, GMT). `data/policy.json` read first; nothing it settles is re-raised (15%/20% stay discounts, Booking.com promotion stacking — sizes only, Visibility Booster, P13 = one flat, P02/P03/P06/P07 blocks, P14, P20's recorded Airbnb discounts, nights after handback, deprioritised items).

**Sources (all read-only)**
- Smoobu GET `/api/rates` 2026-11-02T07:25:16Z → `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live02/smoobu_rates02.json`; `/api/reservations?modifiedFrom=2026-09-29` (with priceElements) 07:25:18Z, guest fields dropped (key names only) → `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live02/smoobu_mod02_pe.json`. Rate-plan lines of the 3 new bookings read in memory only (only "booker_is_genius" found, on P12).
- PriceLabs: `get_listing_prices` (P05 27 Jan–2 Feb, P06 8–15 Nov, P12 26–30 Nov; `booked_price` = "Your Price" at booking), `get_listing_date_overrides` P06 8–15 Nov, `get_user_logs` listing 1–2 Nov (18 entries, all Reyhan, 2 Nov 00:10–00:16Z; **none on 1 Nov**), `data/snapshots/2026-11-02/raw/listing_data.json` (last_date_pushed).
- Live Airbnb: 25 plain public airbnb.co.uk searches (curl, no workarounds), 07:28:21Z–07:31:02Z; JSON + `log.txt` in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live02/air/`. **34 rows appended under lock to `data/snapshots/2026-11-02/channel_checks.csv`** (URL, stay, guests, timestamp, Smoobu rates per row). "Displayed room" = card total before taxes minus cleaning (P20/P12/P13 £150, P05 £195, P08 £149, synced Barking £142, P06 £129 — all from Smoobu bookings; every synced card fits Smoobu × factor + cleaning to the penny).
- **Booking.com: NOT CHECKED** — one plain search 07:32:50Z returned HTTP 202 AWS WAF challenge (`live02/bk/search.html`); not circumvented. **Vrbo / Direct: NOT CHECKED** (no URL, no checks row).
- Config: Booking.com +15% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct −10% remain unconfirmed defaults** (`rm/config.py` CHANNELS) until Corentin confirms.

### 1. New bookings (all made 1 Nov): paid vs PriceLabs at booking, exact stack

No PriceLabs edit was logged on 1 Nov, and P05/P06/P12 were last refreshed and pushed at 1 Nov 09:13Z (`listing_data.json`), so the Smoobu rate at booking = the 09:13Z push. The Dispatcher's ratios used the 31 Oct 22:10Z prices; the at-booking ratios differ.

| Booking (Smoobu id) | Booked (lead) | Smoobu priceElements | PriceLabs/Smoobu at booking | Stack (exact) | Paid ÷ PL | Unexplained |
|---|---|---|---|---|---|---|
| **P06 Airbnb 12–15 Nov** (162228256), 3 adults | 1 Nov 19:40 (11 d) | base £541.00, cleaning £129, commission £103.85 (15.5% of £670) | **£832** (256/286/290; pushed 09:13:55Z; still in Smoobu today). Not £891 — that was 31 Oct 22:10Z | £832 × **0.765** (hidden Airbnb ≤28-day layer, seen live today on P06 8–11 Nov at lead 6) = £636.48, × **0.850** residual = **£541.00** (to the penny per night) | **0.650** (Dispatcher's 0.607 used £891) | **×0.850 = £95.48** not explained by any listing-level rule: the 3-night 8–11 Nov card at lead 6 shows 0.765 only, no discount line. Modified 13 min after creation (19:53); a guest-specific special offer is the likely cause (inference; host inbox NOT CHECKED). Hidden layer itself cost £195.52 |
| **P12 Booking.com 27–30 Nov** (162251811), 6 adults, Genius booker | 1 Nov 22:33 (26 d) | base £653.39 (VAT incl., VAT £108.90), cleaning £150, commission £120.51 (15.0% of £803.39) | **£824** (PL `booked_price` 268/299/257). Smoobu now 276/283/270 after today's 07:22Z refresh | List = Smoobu × 1.15 rounded up per night (309+344+296 = £949; rounding is inferred) × **0.6885** = £653.39 exactly. 0.6885 = 0.90 × 0.90 × 0.85: Genius (confirmed by Smoobu notice) + two of Mobile 10% / Last Minute 10% (≤30 d) / Genius 15% / LM 15%. Best fit with the 25 Oct P12 stack: Genius 15% × Mobile 10% × Last Minute 10%. 6 guests → no occupancy discount | **0.793** (Dispatcher 0.797 used £820); 0.661 ex-VAT | None (policy: stacked promotions). **Size: 31.15% off Booking.com list, £295.61** |
| **P05 Airbnb 29 Jan–1 Feb 2027** (162153936), 4 adults 3 children | 1 Nov 09:32 (89 d) | base £1,059.52, cleaning £195, commission £194.45 | **£1,204** (PL `booked_price` 410/414/380; refreshed 09:13:51Z). Now 415/421/383 | £1,204 × **1.000** lead-time layer (60+ d) × **0.88** visible "Early booking discount" 12% = **£1,059.52 exactly** | **0.880** | 12% early-booking (£144.48) — visible to guests, but **not in policy for P05** (a-p05-earlybird). Lead-time layer confirmed 1.000 |

Note: P06 12–15 Nov sits inside the 8–14 Nov run that policy lists as an intentional block, yet the run is open and sold (t-p06-open). PriceLabs still shows 12–14 Nov as available (no refresh since 09:13Z on 1 Nov). For Corentin to confirm whether opening was intended; not a new proposal. 8–11 Nov is still bookable on Airbnb (£628.54 card, 3 adults).

### 2. Barking (P04): the unsynced listing STILL double-sells; the first arrival is TOMORROW

Smoobu live (3562176): 3–6 Nov Booking.com 161785771 **confirmed** (room £393.18, arrival Tue 3 Nov); 6–9 Nov Airbnb 161888271 via synced 1657… **confirmed** (£355.72); 18–24 Nov open (17 and 25 Nov booked); 6–19 Dec open (20 Dec on booked). Min 3.

| Stay (2 adults) | Smoobu | Unsynced 1455876748739910219 | Synced 1657859794156786222 | Verdict | Source (`live02/air/`) |
|---|---|---|---|---|---|
| **3–6 Nov** | booked (Booking.com) | **bookable, £518.20 card** | not offered | **DOUBLE-SELL, arrival tomorrow** | p04_0306nov 07:28:21Z |
| **6–9 Nov** | booked (Airbnb) | **bookable, £514.20 card** | not offered | **DOUBLE-SELL** | p04_0609nov 07:28:28Z |
| 18–24 Nov (6 n) | open £1,141 | bookable £944.84 | £1,168.90 − "Long stay discount" £102.69 = £1,066.21 (0.900 × 0.90 = 0.810) | both sell the same nights | p04_1824nov |
| 18–21 / 21–24 Nov | open £569 / £572 | £525.80 / £538.04 | £577.28 / £579.57 (0.765) | both sell | p04_1821nov, p04_2124nov |
| 6–19 Dec (13 n) | open £2,475 | £2,514.80 − "Weekly stay discount" £239.58 = **£2,275.22** | £2,369.50 − "Weekly stay discount" £400.96 = **£1,968.54** (room 0.900, then weekly **18%**) | both sell | p04_0619dec 07:29:07Z |
| 6–9 Dec / 16–19 Dec | open £554 / £585 | £672.50 / £677.90 ("originally £748") | £640.60 / £668.50 (0.900) | both sell | p04_0609dec, p04_1619dec |

- **t-p04-doublebook: NOT fixed (third day).** 1455… still sells 3–9 Nov over two confirmed stays: **£748.90 room at risk** plus relocation cost, first guest arrives 3 Nov. It also sells every open Barking night checked (18–24 Nov, 6–19 Dec); a sale on either listing can double-book the other.
- New: the synced listing's weekly discount on 6–19 Dec is **18%** of room (£400.96 / £2,227.50), not the policy 15%: £66.83 extra on that stay. 1455…'s weekly line is 10% if its cleaning is £129 (inference).

### 3. Live Airbnb parity, 2 Nov (lead-time layers and requested re-checks)

Expected = Smoobu rate × (1 + 0%) × the discounts policy recognises (P20 last-minute 15% at 0–14 d; P13 last-minute 10% within 14 d and early bird 10% at 60+ d; weekly 15%). Gap = displayed ÷ expected − 1.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source (`live02/air/`) |
|---|---|---|---|---|---|---|---|---|---|
| **P05** | Airbnb | **9–10 Nov, 1 n (7)** | 7 and 2 | **£1,451** | £1,451.00 | **£253.44** (£511.80 → £448.44 after **"Special offer −£63.36"** = 20% of £316.80 room) | **−82.5%** | **FLAG** | p05_0910nov_1n 07:29:29Z, _a2 |
| P20 | Airbnb | 9–12 Nov (7) | 2 | £694 | £589.90 (LM15) | £530.90 (£680.90) = 0.765 | −10.0% | FLAG | p20_0912nov 07:29:55Z |
| P20 | Airbnb | 5–8 Dec (33) | 2 | £792 | £792.00 | £712.80 (£862.80) = 0.900 | −10.0% | FLAG | p20_0508dec |
| P20 | Airbnb | 3–6 Jan (62) | 2 | £814 | £814.00 | £814.00 (£964.00) | 0.0% | ok | p20_0306jan |
| P12 | Airbnb | 18–21 Nov (16) | 2 | £742 | £742.00 | £567.63 (£717.63) = 0.765 | **−23.5%** | FLAG | p12_1821nov 07:30:20Z |
| P12 | Airbnb | 30 Nov–3 Dec (28–30) | 2 | £717 | £717.00 | £613.98 (£763.98): 0.765 on night 1, 0.900 after | −14.4% | FLAG | p12_3003dec |
| P12 | Airbnb | 7–10 Dec (35) | 2 | £801 | £801.00 | £720.90 (£870.90) = 0.900 | −10.0% | FLAG | p12_0710dec |
| P13 3090701 (1587576514709814818) | Airbnb | 8–11 Nov (6) | 4 | £565 | £508.50 (LM10) | £432.22 (£582.22) = 0.765, no offer line | −15.0% | FLAG | p13_0811nov 07:30:36Z |
| P13 3064856 (1571600691689064213) | Airbnb | 8–11 Nov (6) | 4 | £465 | £418.50 | £355.72 (£505.72) = 0.765 | −15.0% | FLAG | same |
| P13 both | Airbnb | 7–10 Dec (35) | 4 | £655 each | £655.00 | £589.50 (£739.50) = 0.900, **identical on both** | −10.0% | FLAG | p13_0710dec |
| P13 both | Airbnb | 3–6 Jan (62) | 4 | £617 each | £555.30 (EB10) | £555.30 (visible "Early booking discount −£61.70"), **identical on both** | 0.0% | ok | p13_0306jan |
| P05 | Airbnb | 16–18 Nov (14) | 7 | £803 | £803.00 | £614.29 (£809.29) = 0.765 | **−23.5%** | FLAG | p05_1618nov |
| P05 | Airbnb | 29 Nov–2 Dec (27–29) | 7 | £1,609 | £1,609.00 | £1,303.91 (£1,498.91): 0.765 to lead 28, 0.900 at 29 | −19.0% | FLAG | p05_2902dec |
| P05 | Airbnb | 13–16 Dec (41) | 7 | £1,693 | £1,693.00 | £1,523.70 (£1,718.70) = 0.900 | −10.0% | FLAG | p05_1316dec |
| P05 | Airbnb | 4–7 Jan (63) | 7 | £1,252 | £1,252.00 | £1,101.76 (visible **"Early booking discount −£150.24" = 12.0%**) | −12.0% | FLAG (visible) | p05_0407jan |
| P08 | Airbnb | 5–7 Nov (3) | 4 | £399 | £399.00 | £305.23 (£454.23) = 0.765 | −23.5% | FLAG | p08_0507nov 07:31:02Z |
| P06 | Airbnb | 8–11 Nov (6) | 3 | £653 | £653.00 | £499.54 (£628.54) = 0.765 | −23.5% | FLAG (intentional-block flat; layer check only) | p06_0811nov |
| P04 synced | Airbnb | 18–21 / 21–24 Nov (16–21) | 2 | £569 / £572 | Smoobu | 0.765 | −23.5% | FLAG | §2 |
| P04 synced | Airbnb | 18–24 Nov, 6 n | 2 | £1,141 | £1,141 | £924.21 = 0.810 (0.900 × visible 10% long stay) | −19.0% | FLAG | §2 |
| P04 synced | Airbnb | 6–19 Dec, 13 n (34–46) | 2 | £2,475 | £2,103.75 (weekly 15%) | £1,826.54 = 0.900 × 0.82 | −13.2% | FLAG | §2 |
| P04 synced | Airbnb | 6–9 / 16–19 Dec | 2 | £554 / £585 | Smoobu | 0.900 | −10.0% | FLAG | §2 |
| all | Booking.com | — | — | — | — | NOT CHECKED: AWS WAF challenge 07:32:50Z | — | — | live02/bk/search.html |
| all | Vrbo / Direct | — | — | — | — | NOT CHECKED: no URL, no checks row | — | — | — |

**a-airbnb-rules: NOT fixed (fourth day).** Every synced listing (P20, P12, both P13, P05, P08, P06, synced Barking) resolves per night to the same hidden layers: **0.765 at ≤28 days, 0.900 at 29 to at least 46 days, 1.000 at 62+ days**. The boundary is exact: lead 28 = 0.765, lead 29 = 0.900 (P05 29 Nov–2 Dec, P12 30 Nov–3 Dec). Guests see none of it. Reyhan's 2 Nov P20 cuts (base 350 → 330, min 220 → 200, 6–24 Nov −5%; logged 00:16Z) compound with it; base 330 conflicts with policy `price_24oct` (base 350) — for Corentin to confirm.

**a-p05-9nov: NOT fixed.** Smoobu £1,451 (min 1, open); Airbnb still builds the night on a £316.80 room and adds a 20% "Special offer" → £253.44 room. Identical to 31 Oct and 1 Nov. No P05 log since 31 Oct.

**a-p05-earlybird:** visible 12% on 4–7 Jan, and now realised on the new 29 Jan booking (£144.48). **a-p13-twin:** the two P13 listings are identical in Smoobu on 54 of 64 jointly open dates from 7 Dec (was 39 of 49 yesterday) and show identical Airbnb cards (£739.50, £767.00) — policy says never identical.

### 4. Monitoring (last day: until 4 Nov)

**a) Airbnb bookings, last 14 days (booked 20 Oct–2 Nov) vs prior 14 (6–19 Oct).** `data/snapshots/2026-11-02/reservations.csv`, confirmed, room £ (cleaning excluded), imported past stays excluded; Smoobu live shows no booking created on 2 Nov.

| Window | Bookings | Nights | Room £ | £/night | Cancelled |
|---|---|---|---|---|---|
| Last 14 | 12 | 50 | £9,881.53 | £198 | 2 (P08 duplicate; P04 19–20 Dec) |
| Prior 14 | 23 | 164 | £28,179.02 | £172 | 1 |
| **Change** | **−48%** | **−70% (>50%)** | **−65% (>50%)** | +15% | |
| Excluding 28+ night stays (prior P01 30 n, P10 32 n) | 12 vs 21 | 50 vs 102 | £9,881.53 vs £20,224.27 | | |
| Change | −43% | **−51%** | **−51%** | | |
| Uninhibited flats (P04, P05, P08, P12, P13, P20) | 9 vs 12 | 42 vs 57 | £8,282.55 vs £13,527.41 | £197 vs £237 | |
| Change | −25% | −26% | −39% | | |

| Property | Last 14 (count / nights / £ per n) | Prior 14 | >50% drop? |
|---|---|---|---|
| P01 | 0 | 2 / 33 / £160 | yes (−100%); gap block + handback, inventory-limited |
| P02 | 0 | 2 / 10 / £106 | intentional block, not raised |
| P04 | 1 / 3 / £119 | 0 | — (+1 cancelled) |
| **P05** | 2 / 6 / £326 | 2 / 11 / £578 | **£ −69%** (nights −45%); Flexible test flat |
| P06 | 2 / 6 / £224 | 4 / 18 / £189 | yes (nights −67%, £ −60%); intentional-block flat, not lost demand |
| P08 | 2 / 9 / £134 | 1 / 6 / £129 | no (handback 13 Nov) |
| P09 | 1 / 2 / £127 | 2 / 14 / £108 | yes; handback 26 Nov |
| P10 | 0 | 1 / 32 / £106 | yes; sold to its 18 Nov handback |
| **P12** | **0** | 2 / 5 / £170 | **yes, −100%; not inventory** (bookable at 0.765/0.900 today) |
| **P13** | 1 / 7 / £252 | 5 / 20 / £157 | **yes: count −80%, nights −65%** |
| P20 | 3 / 17 / £177 | 2 / 15 / £159 | no |

The portfolio stays over the 50% line on nights and £ (also excluding 28+ night stays); on unconstrained flats the drop is 25–39%. Two bookings came on 1 Nov after a 3-day gap.

**Paid ÷ PriceLabs, Airbnb bookings made after 21 Oct:** 9 standing rows as in `reports/2026-10-30/sections/channel.md` §3 (P04 19–20 Dec cancelled 31 Oct) plus 2 new: P06 12–15 Nov **0.650** (0.765 layer + unexplained ×0.850) and P05 29 Jan **0.880** (visible 12% early-booking, not in policy). **10 of 11 are below PriceLabs minus the policy stay discounts**; only P13 27 Dec–3 Jan (0.903) is explained.

**Flexible-cancellation test (P20, P06, P05 since 24 Oct; day 9 of 14):** test group 6 bookings (P20 ×2, P06 ×2, P05 ×2), 0 cancelled; others 4 confirmed (P08 ×2, P13, P04) and 2 cancelled. Small sample; review 7 Nov.

**b) Booking.com since the markup cut (+30% → +15%, 24 Oct 13:38).** One new booking: P12 27–30 Nov, £653.39, PL £824, **0.793**.

| Measure | Bookings | Nights | Room £ (VAT incl.) | PL at booking | Ratio |
|---|---|---|---|---|---|
| Gross since cut (8.7 days) | 12 | 52 | £8,774.74 | £11,250 | 0.780 |
| Still confirmed | 10 | 45 | £7,301.93 | £9,537 | 0.766 |
| Net of all cancellations (incl. −25 n / −£5,051.37 on pre-cut bookings) | | **+20 n** | **+£2,250.56** | | |

- Pace 1.4/day gross, 1.1/day net (vs ~0.33/day before). Gap of 73.5 h (29 Oct 21:04 → 1 Nov 22:33) before this one. No Booking.com cancellation since 30 Oct (the 2 Nov 00:51 modification of P12 5–12 Nov changed no dates or price).
- Still not attributable to the cut alone (Last Minute 10% started the same day). Earlier PL-at-booking values carried from the 30 Oct section.

### 5. Net to owner per £100 PriceLabs price (`channel_economics` in `kpi_pack.json`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model | £115.00 | £97.75 |
| Booking.com P12 27–30 Nov (0.793, 15%) | £79.30 | £67.40 (VAT inside, as in the pack) |
| Booking.com since cut, confirmed (0.766) | £76.60 | ~£61–65 |
| Airbnb model | £100.00 | £84.50 |
| Airbnb live 62+ d | £100 (P13 £90, P05 £88 visible early bird) | £84.50 (£76.05 / £74.36) |
| Airbnb live 29–46 d (0.900) | £90.00 | £76.05 |
| Airbnb live ≤28 d (0.765) | £76.50 | £64.64 |
| Airbnb P06 booking 1 Nov (0.650) | £65.00 | £54.93 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (−10%, unconfirmed) | £90.00 | £90.00 |

Pack `warnings` is empty, but observed prices break both rules: **direct (£90) is not the cheapest** (Airbnb ≤46 d £76.50–£90, Booking.com as sold £76.60–£79.30); **Booking.com as sold (£61–67) nets below the Airbnb model (£84.50)**, though the new P12 stay (£67.40) nets above Airbnb at ≤28 d (£64.64). Same-date ordering is NOT CHECKED (Booking.com WAF; no Vrbo/direct URL).

### 6. Fees and min stay, displayed vs Smoobu

- Cleaning unchanged and exact on every card: P04 synced £142, P05 £195, P08 £149, P12/P13/P20 £150, P06 £129. Booking.com P12 cleaning £150 (Smoobu).
- P04: the 1–3 Nov 2-night conflict has lapsed; no sub-3-night Barking stay was offered today. Min stay on all other checks matched Smoobu (searches at Smoobu min were offered; none below).
- P05 9 Nov min 1 in Smoobu and offered as 1 night on Airbnb (at the wrong price, §3).

### Issues ordered by £ impact

1. **Critical — P04 unsynced Airbnb listing 1455876748739910219 double-sells 3–6 and 6–9 Nov; guest arrives TOMORROW.** £748.90 room at risk plus relocation; it also sells all open Barking nights (18–24 Nov, 6–19 Dec). **Setting:** Airbnb host 551951609 "Seeker Estates LTD" > listing 1455876748739910219 > Calendar: block 2–9 Nov **today**, and block 18–24 Nov and 6–19 Dec while unsynced; then map it in Smoobu > Channel Manager > Airbnb to apartment 3562176, or snooze/unlist it (Barking already sells through 1657859794156786222).
2. **High — hidden Airbnb layers 0.765 (≤28 d) / 0.900 (29–~60 d) on every synced listing (a-airbnb-rules).** Realised: P20 £574, P05 £328.76, P04 £109.28, now **P06 £195.52**. **Setting:** Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules (and any global rule): remove the ≤28-day last-minute rule and the ~10% ≤60-day rule; if a discount is wanted, use a visible Airbnb discount (`airbnb_visible_discounts`).
3. **High — P05 9 Nov sells on Airbnb at £253.44 room (20% Special offer on a £316.80 base) vs Smoobu £1,451.** **Setting:** Airbnb > listing 1618929775762183214 > Calendar > 9 Nov: remove the custom price / Special offer; check Smoobu > Channel Manager > Airbnb sync log for 9 Nov; block 9 Nov on Airbnb if the orphan should not sell.
4. **Medium — P05 visible 12% early-booking discount at 60+ days**, now realised on 29 Jan–1 Feb (£144.48). Not in policy. **Confirm with Corentin, or set:** Smoobu > Channel Manager > Airbnb > Abbey Rd > pricing rules > Early bird.
5. **Medium — P06 12–15 Nov paid an extra ×0.850 (£95.48) beyond the hidden layer**, not a listing-level rule. **Check:** Airbnb host inbox for reservation 162228256 (special offer / pre-approval price); if a host-sent offer, stop sending sub-rate offers on P06.
6. **Medium — P04 synced Barking weekly discount 18% vs policy 15%** (£66.83 on a 6–19 Dec stay). **Setting:** Airbnb host 660820693 > Barking listing 1657859794156786222 > Pricing > Discounts > Weekly: 15% (or Smoobu Airbnb pricing rule for 3562176, whichever holds it — not seen).
7. **Medium — Booking.com P12 27–30 Nov stack 31.15% (£295.61)**; size only (policy). Genius 15% at Mile End (a-p12-genius) is the lever: **Booking.com extranet > Mile End > Promotions > Genius: untick Level 2&3**, as done on Camden/Shepherd's Bush.
8. **Medium — Airbnb volume:** portfolio −70% nights / −65% £ (−51% / −51% excluding 28+ night stays); P12 0, P13 and P05 down >50%. Monitoring ends 4 Nov.
9. **Medium — P13 twins identical** from 7 Dec (54 of 64 open dates; identical Airbnb cards) — a-p13-twin: keep a small gap.

Data gaps:
1. Booking.com displayed prices/promotions: NOT CHECKED (AWS WAF 07:32:50Z, not circumvented). The P12 stack is inferred from paid ÷ list (list rounding up per night is an inference); which two promotions joined Genius is not identified.
2. P06 ×0.850 residual: cause NOT CHECKED (Airbnb host inbox not visible).
3. Listing 1455…'s own reservations and cleaning fee: NOT CHECKED (not in Smoobu).
4. Why Airbnb uses £316.80 instead of Smoobu's £1,451 for P05 9 Nov: NOT CHECKED.
5. Vrbo +8% and Direct −10% are unconfirmed defaults; direct < OTA ordering is model-only.
6. Barking synced weekly 18%: where it is set (Airbnb vs Smoobu rule) is NOT CHECKED.
7. PriceLabs-at-booking for pre-1 Nov rows carried from the 29–30 Oct sections. PriceLabs P05/P06 were not refreshed after 1 Nov 09:13Z (P06 12–14 Nov still shown available in PriceLabs).
