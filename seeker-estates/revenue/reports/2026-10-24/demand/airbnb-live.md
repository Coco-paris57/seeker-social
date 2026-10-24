# Airbnb as a guest sees it — live check, 24 Oct 2026 (~11:40–12:00 UTC)

**Method.** Logged-out curl requests to www.airbnb.co.uk with a desktop Chrome User-Agent and `Accept-Language: en-GB`. I parsed the JSON embedded in each page (`data-deferred-state-0` → `niobeClientData`). Requests ran one at a time with 2.5 s gaps, about 300 pages in total. No challenge or captcha page appeared, and every request returned HTTP 200.
- **Searches:** a map box of about 2 km × 2 km around each flat's PriceLabs coordinates, 4 adults, 3-night stays. Each stay was searched twice: (a) unfiltered, which is what a guest sees first (up to 5 pages, 18 results per page); (b) "Entire home" with the same bedroom count, for comps (up to 4 pages).
- **Prices:** every price is the **total Airbnb displays, including cleaning and fees** (Airbnb UK "regulated total"). Where a listing shows a strikethrough, the old price is given as "was".
- **Raw data:** `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/out/` (`s_<area>_<checkin>_{all,f}.json`, `ours_pdp.jsonl`).
- **NOT CHECKED: review text.** Airbnb loads review text, the price box and the cancellation-policy block from its internal API after the page loads. My one attempt to call that API was refused by this session's permission check, and the image/JS CDN (a0.muscache.com) is blocked by the network policy. So there are **no review snippets**, and cover photos could not be viewed. I report what the page itself holds instead: the rating breakdown by stars, the category scores, Airbnb's quality flag, the photo count and the amenities shown.
- **Not covered:** Camden (P11) is not on Airbnb. Marylebone (P06) and Barking (P04) were not in the brief, but their page data is in the listing table below.

## 1. Our Airbnb listings (host "Seeker Estates LTD", host id 551951609, 272 host ratings, not a Superhost)

Public titles differ from the Smoobu names. Every listing below shows "Hosted by Seeker Estates LTD" on its page.

| Ref | Airbnb id / URL | Public title | Rating (reviews) | Stars breakdown | Category scores (clean / accuracy / check-in / value) | Airbnb quality flag | Photos | Guests |
|---|---|---|---|---|---|---|---|---|
| P13 (Smoobu 3064856, inferred) | [1571600691689064213](https://www.airbnb.co.uk/rooms/1571600691689064213) | Elegant flat in Shepherds Bush with Terrace | 4.31 (13) | 5★ 31% · 4★ 69% | **3.85** / 4.46 / 4.62 / **3.92** | **BOTTOM_10** | 31, cover is a .png | 6 |
| P13 twin (Smoobu 3090701) | [1587576514709814818](https://www.airbnb.co.uk/rooms/1587576514709814818) | 2 Bed Near Westfield with view & Terrace | 4.67 (9) | 5★ 89% · 2★ 11% | 4.56 / 4.67 / 4.56 / 4.78 | none | 28 | 6 |
| P20 Waterford Ct | [1791529331262420081](https://www.airbnb.co.uk/rooms/1791529331262420081) | Parking & Views - 2 Bedrooms in Canary Wharf | New (0) | – | – | new listing | 28 | **4** (2BR, 3 beds) |
| P12 Mile End | [1414703602412646285](https://www.airbnb.co.uk/rooms/1414703602412646285) | **Preferred choice flat for summer with open views** | 4.27 (15) | 5★ 67% · 4★ 20% · **1★ 13%** | 4.60 / 4.53 / **4.27** / 4.40 | **BOTTOM_10** | 35 | 6 |
| P05 Abbey Rd | [1618929775762183214](https://www.airbnb.co.uk/rooms/1618929775762183214) | Abbey Rd 4Bed 2.5Bath\| Sleeps 8 \| Beatles Crossing | 4.76 (34) | 5★ 79% · 4★ 18% · 3★ 3% | 4.76 / 4.82 / 4.94 / 4.74 | none | 32 | 8 |
| P08 Islington | [1683999279257475317](https://www.airbnb.co.uk/rooms/1683999279257475317) | Central London 2 Bed Oasis with Private Terrace | 4.33 (3) | 5★ 67% · **3★ 33%** | 4.00 / 4.33 / 4.33 / 4.00 | none | 39 | 5 |
| P09 Greenwich | [1681417771483132994](https://www.airbnb.co.uk/rooms/1681417771483132994) | Modern 1Bed Flat w/ Balcony Near O2 & Greenwich | no stars shown (2 reviews, both 5.0) | – | 5 / 5 / 5 / 4.5 | "few reviews" | 24 | 4 |
| P04 Barking | [1455876748739910219](https://www.airbnb.co.uk/rooms/1455876748739910219) | Fantastic 2 bed Flat with amazing view in Barking | 4.69 (26) | 5★ 73% · 4★ 23% · 3★ 4% | **4.19** / 4.73 / 4.65 / 4.46 | **BOTTOM_10** | **7** | 6 |
| P06 Marylebone | [1671691529957957272](https://www.airbnb.co.uk/rooms/1671691529957957272) | Elegant 2Bed Marylebone Stay \| Great Location | 4.56 (9) | 5★ 56% · 4★ 44% | 4.56 / 4.67 / 4.44 / 4.33 | none | **10**, cover is a .png | 6 |
| P10 Ealing | [1681425766690680710](https://www.airbnb.co.uk/rooms/1681425766690680710) | Modern 1Bed Flat in Ealing \| Near Tube & Shops | 4.0 (5) | 1★ 20% | 4.4 / 4 / 3.8 / 3.6 | **BOTTOM_10** | 27 | 4 |
| P01 Bowsprit | [1684808250380202589](https://www.airbnb.co.uk/rooms/1684808250380202589) | 21st Floor Canary Wharf Gem with Private Balcony | 4.67 (3) | – | – | none | 29 | 5 |

**Notes on the table**
- **Quality flag:** the field is `qualityScorePercentileBucket` in each listing's page data, shown next to `allowsDisplayBottomQualityInformation: true`. Inference: Airbnb puts 4 of our 11 listings in its bottom 10% for quality and may show guests a warning. A competitor's page was earlier seen with a "bottom-10%" label (reports/2026-10-21/listing-review.md, line 177).
- **Badges:** none of our listings has **Guest favourite** (`isGuestFavorite: false` on every page), and the host is not a Superhost. A "Business host" label is shown.
- **Free cancellation:** none of our listings shows a "Free cancellation" or "Pay £0 today" pill in any of the 14 searches. Among same-size comps the pill appears on 30–55% of listings in W12, Canary Wharf and Mile End, and on 75% of the St John's Wood 4BRs for 29 Nov. Inference: our Airbnb cancellation policy is Firm, Strict or non-refundable. The policy block itself was NOT CHECKED (it loads from the API).
- **Minimum nights:** not shown before dates are picked. From PriceLabs (prices.csv, 24 Oct): P13 and P08 min 2, P20 min 3, P12 min 2, P05 min 2–4, P09 min 2–3.
- **Amenities shown first** (page preview): Wifi, kitchen, TV, washer, bath. P20 adds free parking, tumble dryer and balcony. The P13 pair, P08 and P01 show terrace or balcony. P05 shows no TV in its preview.

## 2. Search position and displayed price for the test stays (4 adults, 3 nights)

"Rank" means our position among unique listings in the unfiltered search for that map box (18 per page). The "same-size comps" columns use only entire homes with the same bedroom count.

| Property | Stay | Rank (page) | Our total | Comps: n · median · p25 | Comps cheaper than us | Rated comps rated above us | Comps with more reviews |
|---|---|---|---|---|---|---|---|
| P13 twin 1587576514709814818 | 31 Oct–3 Nov | **4 (p1)** | £577 | 28 · £797 · £615 | 4/28 | 14/20 | 15 |
| P13 1571600691689064213 | 31 Oct–3 Nov | 21 (p2) | £513 | same | 1/28 | 15/20 | 9 |
| P13 twin | 8–11 Nov | 26 (p2) | £717 | 44 · £710 · £642 | 23/44 | 20/33 | 25 |
| P13 | 8–11 Nov | 41 (p3) | £669 | same | 19/44 | 29/33 | 18 |
| P13 twin | 17–20 Nov | 28 (p2) | £710 | 44 · £752 · £672 | 18/44 | 21/33 | 23 |
| P13 | 17–20 Nov | 42 (p3) | £681 | same | 13/44 | 28/33 | 16 |
| P20 Canary Wharf | 31 Oct–3 Nov | **4 (p1)** | £743 | 37 · £1,037 · £702 | 11/37 | n/a (new) | 19/19 rated comps |
| P20 | 8–11 Nov | 22 (p2) | £868 | 50 · £808 · £644 | 29/50 | n/a | 31/31 |
| P20 | 17–20 Nov | 21 (p2) | £883 | 47 · £850 · £680 | 26/47 | n/a | 28/28 |
| P12 Mile End | 1–4 Nov* | **1 (p1)** | £550 | 24 · £743 · £620 | 4/24 | **16/16** | 5 |
| P12 | 8–11 Nov | 11 (p1) | £628 (was £666, "Special offer −£38") | 31 · £675 · £586 | 12/31 | **21/21** | 9 |
| P08 Islington | 31 Oct–3 Nov | 8 (p1) | £554 | 13 · £744 · £716 | **0/13** | 8/8 | 8 |
| P08 | 4–7 Nov* | 8 (p1) | £590 | 12 · £1,116 · £762 | **0/12** | 7/7 | 6 |
| P09 Greenwich (1BR) | 28–31 Oct* | 7 (p1) | £493 | 4 · £584 | 1/4 | – | 2 |
| P09 | 10–13 Nov* | 21 (p2) | £493 | 6 · £586 · £417 | – | – | – |
| P05 Abbey Rd (4BR) | 6–9 Nov* | 8 (p1); #1 of 4BRs | £1,373 | 5 · £1,605 | 1/5 | 1/3 | 0 |
| P05 | 29 Nov–2 Dec* | 22 (p2); #1 of 4BRs | £1,606 | 12 · £2,788 · £1,920 | 3/12 | 4/9 | 1 |

\* These replace test dates the flat is not available for (PriceLabs prices.csv, 24 Oct): P12 31 Oct and 17–20 Nov; P08 8 Nov on; P09 31 Oct–3 Nov and 8–9 Nov; P05 most of 31 Oct–20 Nov. Airbnb hides unavailable listings from dated searches, so on those dates these flats cannot be booked at all.

**Comp benchmarks (same-size entire homes):**
- Median rating 4.80–4.84 in W12, 4.62–4.84 in Canary Wharf, 4.83–4.84 in Mile End and 4.88–4.91 in Islington.
- Median reviews 13–19 (Islington 35–39).
- 7–15% carry Guest favourite.
- 15–25% show a strikethrough or discount.

### Top 10 comps per area (stay in brackets; displayed total; rating (reviews); badges)

**W12 / Shepherd's Bush 2BR (8–11 Nov)**
1. Modern 2BR Flat near Shepherd's Bush & Hammersmith: £520, 5.0 (6), Free cancellation, Pay £0 today
2. Newly Refurbished 2BDR West London Retreat: £443 (was £547), 4.52 (44)
3. Ideal for Business Stays | Roof Terrace: £560, new, Superhost
4. The Westview: 2BR Penthouse & Terrace in White City: £651 (was £796), 4.47 (19)
5. 2Bed Flat in West London - Free Parking: £647, new
6. Spacious 2BR | Steps to Tube Station & Westfield: £518, new, Superhost
7. West London 2BR 2BA | Near Westfield | Sleeps 6: £660 (was £808), 4.78 (49), Superhost
8. Modern flat mins from Westfield: £621, 4.6 (81)
9. Spacious 2BDR 2BA near Shepherds Bush Oasis (17–20 Nov): £577, 5.0 (8), Guest favourite
10. Shepherds Bush | 2 Bed Apartment (17–20 Nov): £727, 4.83 (161)

For 31 Oct, page 1 is led by "Marvellous 2Bed Apt Central London" (£596, 4.9 (10), Guest favourite) and "Bright & Spacious Garden Flat" (£885, 4.93 (27), Guest favourite).

Title hooks in this area: "Westfield", "Tube", "2BA", "Sleeps 6", "Free Parking", "Superhost", "Roof Terrace".

**Canary Wharf 2BR (8–11 / 17–20 Nov)**
1. Weekly Discount Telegraph Place: £375 (was £504), new
2. ShyTowerLux Two-Bedrooms: £980, 4.8 (15), Free cancellation
3. The Queens Pier: £750, 4.85 (13)
4. Bright & Airy Apartment, Great Location, Parking: £675, 4.62 (63)
5. High-Rise Waterfront Apartment: £870, 4.64 (22), Superhost
6. Canary Wharf Retreat with Free Secure Parking: £644, 4.75 (32)
7. Canary Premium Hub: £564 (was £630), 4.47 (146)
8. Stunning Thames River Apart/Free Parking Sleeps 6: £1,065, 4.95 (21), Guest favourite
9. Canary Wharf 2 bedroom apartment: £687, 4.4 (20), Free cancellation
10. Canary Wharf 2BR | Skyline View + Work Ready: £776, 5.0 (12), Guest favourite

Several comps sell "Free Parking", our main hook. 31 Oct also had "Docks View | Free Parking | OwnTerrace" at £713, 4.87 (23), Guest favourite.

**Mile End 2BR (8–11 Nov)**
1. +Cosy 2BR Flat in Mile End (Central Line train): £290 (was £466), new
2. Family-friendly - Designer - Sunny balcony: £497, 4.84 (31)
3. Spacious light two bedroom apartment hackney wick: £586, 4.93 (178), Guest favourite
4. Enjoy the sun with a private rooftop! 2Br|2Ba: £640, 4.93 (15), Guest favourite
5. GuestReady - Modern 2BR w Balcony in Poplar: £625 (was £709), 4.68 (34)
6. Luxury Central London 2BR Apartment: £570, 4.67 (9), Free cancellation
7. Luxury 2 bedroom modern apartment in East London: £665, 4.83 (40)
8. Stratford Flat near ABBA Arena: £651, 4.9 (10)
9. LDN City Home - Close Station: £609 (was £751), 4.79 (24), Superhost
10. Prime Location | 2 Bed | WiFi | East London: £576, 4.47 (38)

**Islington 2BR (31 Oct–3 Nov)**
1. Open plan design: £736, 4.88 (42)
2. Luxurious & Spacious Central Modern 2bed: £716, 4.69 (75), Free cancellation
3. Spacious 2 Bed North London Flat with Balconies: £708 (was £768), 4.89 (9), Guest favourite
4. Flamingo 2 bedroom garden flat Islington: £744 (was £842), 4.98 (64), Guest favourite
5. Stylish London Home near Angel & Upper Street: £655 (was £781), new
6. Stylish flat in Haggerston: £729, 5.0 (15), Guest favourite
7. Angel London Home with Workspace: £690, 4.43 (7)
8. 2-bedroom cottage in Islington (4–7 Nov): £768, 4.91 (22), Superhost
9. Light bright 2 bed Highbury flat (4–7 Nov): £674, 4.6 (77)
10. Large 1,000 sqft Canal Penthouse: £1,200, 4.91 (46)

**Greenwich 1BR (10–13 Nov).** Few 1BRs inside the box. Listed in order:
- Cosy 1-bed flat, SE Zone 2: £417, 4.83 (6), Superhost
- 1 bed flat near ExCeL, free parking: £623, 4.86 (35), Guest favourite
- Luxury 1-Bed, Free Parking: £652, new
- Greenwich Heights Apartment: £579, 4.43 (88), Free cancellation
- Greenwich Height Apartment: £592, 4.22 (27)
- Riverview Flat in Greenwich: £409, unrated

**St John's Wood 4BR (29 Nov–2 Dec)**
1. 4BR + Free Parking near Paddington & Little Venice: £1,472 (was £1,623), 4.56 (73)
2. Residence Next To Regents Park AC: £1,920 (was £2,400), 4.88 (25), Guest favourite
3. Luxury n' Spacious AirCon 4 Bed 4.5 Bath: £2,366, 5.0 (27), Guest favourite
4. Spacious, modern 4-bedroom flat in St John's Wood: £1,480, 4.88 (8), Pay £0 today
5. Grand Marylebone House: £2,637, 4.96 (25), Guest favourite
6. The Marylebone Residence: £1,446, 3.91 (11)
7. The London Scene at Wellington with Parking: £2,940, 4.75 (4)
8. Comfortable Stay by Regent's Park: £2,940, 4.38 (16)
9. Wellington Road Residence with Parking: £2,940, 4.17 (12)
10. 4 Bedroom Deluxe Apartment: £5,818, unrated

## 3. Why a guest would not pick us, by property (numbers as displayed)

**Overall finding (Airbnb only):** price and visibility are **not** the main blockers on Airbnb.
- For the nearest stays we sit on page 1 and are often among the cheapest. The P13 twin and P20 are rank 4 for 31 Oct, Mile End is rank 1 for 1–4 Nov, and Islington is rank 8 and cheaper than all 13 comps.
- The repeated weaknesses are trust signals: below-market ratings, no Guest favourite, no Superhost, a "Business host" label, no free-cancellation pill, and 4 listings flagged BOTTOM_10.
- Further out (8–20 Nov) the W12 and Canary Wharf listings drop to page 2–3, where few guests look.

**P13 Shepherd's Bush: two listings competing with each other**
- Listing 1571600691689064213 is our weakest page: 4.31 against a comp median of 4.80, and 29 of 33 rated comps score higher. Cleanliness is 3.85 and value 3.92. Airbnb flags it BOTTOM_10. It sits at rank 41–42 (page 3) for 8–20 Nov, even though it is the cheaper of our two (£669–681 against a comp median of £710–752).
- The twin 1587576514709814818 (4.67 from 9 reviews) is rank 4 and cheap for 31 Oct (£577 against £797). For 8–20 Nov it is on page 2 (rank 26–28) at about the comp median. Its 11% two-star share is visible in the star breakdown.
- Neither listing has a badge or a free-cancellation pill.
- Fixes:
  1. Fix cleaning on the flat (it is the lowest category score).
  2. Consider snoozing or merging the BOTTOM_10 copy so the twin collects the reviews and the ranking. Inference: the bottom-10 copy drags down host-level quality signals.
  3. Turn on a flexible or moderate cancellation policy. In Smoobu, set Airbnb cancellation, or in the Airbnb app: Listing → Policies & rules → Cancellation policy.
  4. Add "2 guests per room · Westfield · Central line" hooks to the title.

**P20 Waterford Court, Canary Wharf (new, 0 reviews)**
- Visible for 31 Oct (rank 4 at £743, below the £1,037 median). Page 2 for 8–20 Nov (rank 21–22) at about the median (£868–883 against £808–850); 26–29 comps are cheaper, and every one of them has reviews.
- Capacity is set to **4 guests** for a 2-bed, 3-bed flat, while most comps say "Sleeps 6". It drops out of every 5–6 guest search (inference; capacity is on its page).
- "Free parking" is our hook, but at least 4 page-1 comps also sell free parking, some with Guest favourite.
- Fixes:
  1. Raise max guests to 5–6 if the beds allow (Listing → Number of guests).
  2. Price 8–20 Nov at about the comp p25 (≈ £650–680 total) until 3–5 reviews arrive, or use Airbnb's new-listing promotion (Corentin's decision).
  3. Allow 2-night stays on weekdays; PriceLabs min stay is 3.
  4. Use a flexible cancellation policy.

**P12 Mile End**
- Rank 1 and among the cheapest (1–4 Nov: £550 against a £743 median), yet the rating 4.27 is the lowest of every rated comp (16/16 and 21/21 score higher).
- **13% one-star reviews** (2 of 15), check-in score 4.27. Airbnb flags it BOTTOM_10.
- The title "Preferred choice flat for summer with open views" reads as out of season in November.
- The 8–11 Nov "Special offer −£38" shows that a discount is already being used.
- Fixes:
  1. Retitle now, e.g. "2BR/2BA by Mile End Tube · Canal & City Views · Sleeps 6" (the page says 2 bathrooms; the title does not).
  2. Fix check-in instructions; that is the weakest category score.
  3. Reply publicly to the 1-star reviews.
  4. Calendar: closed on 31 Oct and 17–20 Nov, so the test stays cannot be booked.

**P08 Islington**
- Cheapest 2BR in the box (£554–590 against a median of £744–1,116) and rank 8 on page 1. But it has only 3 reviews at 4.33, one of them 3★ (33%), against comps at 4.88–4.91 with 35–39 reviews.
- Calendar closes from 8 Nov (handback 13 Nov).
- Fixes: nothing price-related. Win reviews from the remaining stays: a cleaning check plus a check-out message. Use a flexible cancellation policy. Inference: at this price, the low rating is the main reason guests pass.

**P09 Greenwich 1BR**
- With 2 reviews, Airbnb shows **no star rating**.
- £493 for 3 nights is below most 1BR comps (£579–652), but those comps have 27–88 reviews.
- Only two short bookable windows remain before handback: 26–31 Oct and 10–14 Nov.
- Rank 7 for 28–31 Oct; page 2 (rank 21) for 10–13 Nov.
- Fixes: a 2-night minimum on all open dates, and a flexible cancellation policy.

**P05 Abbey Road 4BR**
- Healthy: 4.76 (34), #1 of the 4BRs in its box, and cheaper than most (£1,606 against a median of £2,788 for 29 Nov–2 Dec).
- The limit is availability: only small gaps are open in November, with min stay 3–4 on some nights.
- No Guest favourite badge; 3 of the 12 comps have one, at 4.88–5.0.
- The preview shows no TV.
- Fix: inference only — the price looks low against comps. A rate test is Corentin's decision under policy.

## 4. Fixes ranked by expected booking impact (Airbnb)
1. **Cancellation policy → Flexible or Moderate on all Airbnb listings.** None of ours shows "Free cancellation" in 14 searches; 30–75% of comps do. Where: Airbnb host app → Listings → (listing) → Policies & rules → Cancellation policy, or the Smoobu Airbnb channel settings if it is managed there. Verify the current policy first; it was NOT CHECKED directly.
2. **Act on the four BOTTOM_10 listings:**
   - P13 copy 1571600691689064213: cleaning 3.85, value 3.92.
   - P12 Mile End: 13% one-star reviews, check-in 4.27.
   - P04 Barking: cleaning 4.19, 7 photos.
   - P10 Ealing: one-star reviews.

   Do a deep clean and a check-in instruction audit, and reply to low reviews. For P13, consider letting the twin 1587576514709814818 carry the flat.
3. **P20 capacity 4 → 6 and a review-building price for 8–20 Nov** (≈ £650–680 total for 3 nights against £868–883 now).
4. **Retitle P12** (drop "summer"; add 2 bath, Tube, sleeps 6). Add photos to P04 (7) and P06 (10); comps show 24–39.
5. **Open calendars where policy allows.** Airbnb cannot show the flats on blocked test dates (P12 17–20 Nov, P08 after 7 Nov, P09 31 Oct–3 Nov, P05 most of November). Several of these blocks are intentional (handbacks, policy.json), so this is a check, not a change.
