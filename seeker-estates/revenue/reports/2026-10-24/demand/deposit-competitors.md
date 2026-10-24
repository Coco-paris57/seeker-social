# Deposits, damage waivers and ID checks: Seeker vs London competitors (24 Oct 2026)

**Question.** Every Seeker guest must pass ID verification and then either accept a **£1,000 card hold** or pay a **non-refundable damage waiver** (£99 for 1-bed, £109 for 2-bed, £119 for 3-bed+). Source: data/policy.json `guest_requirements` (Corentin, 24 Oct 2026). Do competing London short lets ask for this, and how much? Does our setup carry platform-policy risk?

## Bottom line

1. **Our ask is far outside the market on Airbnb.** We checked 40 comparable entire-home 2BR listings: 8 in each of Camden, St John's Wood/Marylebone, Shepherd's Bush/W12, Mile End/Bow and Canary Wharf.
   - Only **3 of 40 (7.5%)** mention any security deposit: **£345** (card pre-authorisation), **£500** (which that operator says applies to *non-Airbnb bookings only*), and one with no amount stated.
   - Only **1 of 40 (2.5%)** mentions a damage waiver: **£20**, covering up to £200, again for non-Airbnb bookings only.
   - **6 of 40 (15%)** mention an ID check, and **4 of 40 (10%)** mention a pre-arrival form or portal.
   - **9 of 40 (22.5%)** mention any of these four things.
   - **10 of our 11 Airbnb listings mention all four.** Our £1,000 hold is about **3× the largest deposit any comp asks on Airbnb (£345)**. Our £109 2-bed waiver is **5×** the only waiver seen (£20). It is also about 2.7× the £40 waiver that a London manager's Truvi flow offers (secondary source, see §3).
2. **There is a real platform-policy risk on Airbnb. These are inferences from Airbnb's own policy text, quoted below:**
   - **Deposit and waiver.** Airbnb says "most hosts are not allowed to charge a security deposit or credit card hold". The exceptions are select software-connected hosts, and even they must show the deposit "in the appropriate fee field so that it is disclosed to guests before booking". Mandatory fees may not be collected off-platform except by those select hosts, and must appear in the total price. We disclose the deposit and the waiver only in free-text description, and collect both off-platform through our "guest verification system". That does not match either rule.
   - **ID collection and online check-in.** For **reservations booked on or after 20 Nov 2026**, Airbnb's updated policy says hosts may not collect ID documents, may not require registration on another website or app to gain entry, and generally may not require a separate contract. The only exceptions are where law or a building/HOA rule requires it, or a stay of 28 nights or more. Our "secure online check-in … ID verification, agreement to house rules" before access runs into all three. This takes effect within four weeks.
3. **Booking.com allows a damage deposit, but warns against it.** Its partner help page says "damage deposits tend to result in fewer bookings and more cancellations". Its guest terms say Booking.com tells the guest about a deposit "while you're booking". A non-refundable waiver is not a damage-deposit option on Booking.com. Inference: charged as a condition of stay, it is a mandatory charge outside the displayed price, which conflicts with Booking.com's mandatory-fee display rules and with the UK drip-pricing ban (see §2).
4. **Conversion impact. This is an inference that the data here cannot measure.** On a P13 3-night stay costing £577 on Airbnb (airbnb-live.md §2, 31 Oct–3 Nov), the cheapest way to comply (the £109 waiver) adds **+19%** that is not in the price Airbnb displays. The alternative is a £1,000 hold, which is 1.7× the stay itself. Guests reading the description see this, while 77.5% of the comps around us ask for nothing similar. Booking.com's own guidance links deposits to fewer bookings and more cancellations.

## Method and limits

- **Airbnb pages.** Logged-out `curl` requests to www.airbnb.co.uk on 24 Oct 2026 (about 13:00–13:20 UTC), with a desktop Chrome User-Agent and en-GB, through the session's normal proxy. Requests ran one at a time, 2.5 s apart. Every request returned HTTP 200 and no challenge page appeared. **Note:** the brief's general rule says airbnb.* is blocked, but in practice it was reachable through the normal proxy, as the earlier airbnb-live.md run also found. No bypass was used.
- **Searches.**
  - 2 new searches, 1 page each, for 8–11 Nov, 4 adults, filtered to "Entire home" with exactly 2 bedrooms, in a map box of about 2 km × 2 km: Camden (centre 51.5390, −0.1426) and St John's Wood/Marylebone (centre 51.5280, −0.1650).
  - W12, Mile End and Canary Wharf reused this morning's saved 8–11 Nov searches (same filters; scratchpad `out/s_{w12,me,cw}_2026-11-08_f.json`).
  - In each area I took the **first 8 results in Airbnb's ranking**, leaving out our own listings.
  - Total: **40 competitor listing pages + 2 search pages**. Our own 11 listing pages came from this morning's cache, fetched 24 Oct around 11:50 UTC.
  - A few comp titles say "3BR" or "4BR" even though the search was filtered to 2 bedrooms. Inference: their Airbnb bedroom count differs from the title.
- **What was parsed.** From the JSON embedded in each page: the full description, including "The space", "Guest access" and "Other things to note"; the House rules, including "Additional rules" where the page includes them; and the host's business/individual label (`businessDetails.hostType`). Keyword matches were then **read by hand**, and false positives were dropped: "deposit rubbish bags" on 12896220, and "don't forget your passport" on 1724683358798238179 and 1689934616924498374.
- **Host type.** "Business" means Airbnb's own "hosts as a business" label. I did not count each host's listings. The host's total review count is shown as a proxy for scale.
- **Not checked.**
  - Text that Airbnb loads after the page renders (the price box and the cancellation block). If a comp has a deposit set up in an Airbnb fee field, it may show only in checkout, which was not visited.
  - Booking.com property pages. Our Booking.com Extranet deposit settings (no access).
  - Operator websites: book.passthekeys.com, onefinestay.com, lockeliving.com and theblueground.com were refused by the network policy (`CONNECT tunnel failed, response 403`). Operator facts in §3 therefore come from WebSearch result snippets and are labelled as such.
- **Raw data.** `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/dep/` contains `sel.json` (sample), `comps.json` and `ours.json` (text and matches), and `help/` and `bk/` (saved policy pages).

## 1. What our own Airbnb listings say (host "Seeker Estates LTD", Business host)

Two blocks of text appear on our listings:
- **A soft line in the description (10 of 11 listings):** "Guests **may be** required to complete ID verification and a security deposit of £1000 or damage protection £109 process prior to check-in." The amount varies by listing, as shown in the table.
- **A hard paragraph under "Other things to note" (9 of 11 listings):** "Before check-in, guests **are required** to complete a secure online check-in process for insurance and property protection purposes. This includes ID verification, agreement to house rules, and a refundable security deposit of £1000 or damage protection registration of £109. This process is handled securely through our guest verification system prior to arrival." (Quoted from listing 1414703602412646285. The others match apart from the waiver amount.)

| Ref | Airbnb id | ID verification | Deposit | Waiver | Online check-in / registration | Other |
|---|---|---|---|---|---|---|
| P13 | [1571600691689064213](https://www.airbnb.co.uk/rooms/1571600691689064213) | yes | £1000 | £109 | yes ("are required") | – |
| P13 twin | [1587576514709814818](https://www.airbnb.co.uk/rooms/1587576514709814818) | yes | £1000 | £109 | yes | – |
| P20 Canary Wharf | [1791529331262420081](https://www.airbnb.co.uk/rooms/1791529331262420081) | yes ("may be") | £1,000 | £109 | **no "Other things to note" paragraph** | – |
| P12 Mile End | [1414703602412646285](https://www.airbnb.co.uk/rooms/1414703602412646285) | yes | £1000 | £109 | yes | "Any breach of these rules will result in a **£600 flat fee**" |
| P05 Abbey Rd (4BR) | [1618929775762183214](https://www.airbnb.co.uk/rooms/1618929775762183214) | yes | £1,000 | £119 | yes | – |
| P08 Islington | [1683999279257475317](https://www.airbnb.co.uk/rooms/1683999279257475317) | yes | £1000 | £109 | yes | – |
| P09 Greenwich (1BR) | [1681417771483132994](https://www.airbnb.co.uk/rooms/1681417771483132994) | yes | £1000 | £99 | yes | – |
| P04 Barking | [1455876748739910219](https://www.airbnb.co.uk/rooms/1455876748739910219) | **none** | **none** | **none** | **none** | "a flat fee of **£600** will be charge[d]" for smoking, parties or drugs |
| P06 Marylebone | [1671691529957957272](https://www.airbnb.co.uk/rooms/1671691529957957272) | yes | £1000 | £109 | yes | – |
| P10 Ealing (1BR) | [1681425766690680710](https://www.airbnb.co.uk/rooms/1681425766690680710) | yes | £1000 | £99 | yes | – |
| P01 Bowsprit | [1684808250380202589](https://www.airbnb.co.uk/rooms/1684808250380202589) | yes | £1,000 | "non refundable damage protection of £109.00" | yes | – |

**The wording is inconsistent.** It says "may be required" in one place and "are required" in another. P04 says nothing, and P20 has only the soft line. Inference: a guest cannot tell from the page whether the requirement is certain.

## 2. Platform rules (official pages, read 24 Oct 2026)

### Airbnb
- **Pricing and payment transparency.** [airbnb.co.uk/help/article/2799](https://www.airbnb.co.uk/help/article/2799)
  - "Hosts must disclose all mandatory fees … in the appropriate fee field, or include them in the nightly price."
  - Hosts may not "Collect payment for mandatory fees off-platform … Exception: Some hosts, including select software-connected hosts, may collect mandatory fees off-platform … [they] must still be included in the appropriate pricing field."
  - "**Most hosts are not allowed to charge a security deposit or credit card hold for incidentals.** … Some hosts, including select software-connected hosts, may collect a security deposit off of the Airbnb platform, as long as they include the security deposit in the appropriate fee field so that it is disclosed to guests before booking." Deposits must be refunded or released within 7 days of checkout.
  - Damage is handled through AirCover and the Resolution Center. Enforcement ranges from "warnings" to "suspending or removing listings … or accounts".
- **Collecting fees outside Airbnb.** [airbnb.co.uk/help/article/2827](https://www.airbnb.co.uk/help/article/2827)
  - "Hosts aren't permitted to collect any fees related to Airbnb reservations outside of our platform, unless expressly authorized by us."
  - "For the small number of listings where security deposits are permitted to be collected outside of the Airbnb platform, hosts must disclose them in the appropriate fee field."
- **Fee fields available.** [airbnb.co.uk/help/article/2385](https://www.airbnb.co.uk/help/article/2385)
  - Cleaning, pet and extra-guest fees.
  - Professional-tools users can also add resort, linens, management and community fees.
  - **There is no damage-waiver field.**
- **AirCover for Hosts.** [airbnb.co.uk/help/article/3142](https://www.airbnb.co.uk/help/article/3142): "guest identity verification, reservation screening, $3m Host damage protection, $1m Host liability insurance".
- **ID.** [airbnb.co.uk/help/article/1170](https://www.airbnb.co.uk/help/article/1170): "Airbnb doesn't share your government ID with hosts … hosts may request it after booking **if their listing mentions it is required for legal or compliance reasons**."
- **Limiting host-imposed contracts and other requirements.** [airbnb.co.uk/help/article/4169](https://www.airbnb.co.uk/help/article/4169)
  - **New version, for reservations booked on or after 20 Nov 2026:**
    - Hosts "may not solicit personal data at any point during the booking process or stay", including "Identification details or documents such as a guest's passport, driver's license … or photo".
    - Hosts may only "physically check a guest's ID … in person at check-in if they disclose the requirement in the requests section of their listing; they may not … retain a digital or physical copy".
    - Hosts "may not require use of a third-party app or registration on another website to gain entry to a listing".
    - Hosts "generally may not ask guests to sign a separate contract or rental agreement". The exceptions are: required by law or HOA/building rules, an optional amenity, monthly stays of 28+ nights, or Luxe listings.
    - Credit card or financial data may not be collected "except where permitted under our Pricing and payment transparency policy".
    - Where an exception applies, it must be disclosed in the listing's "requests section" before booking.
  - **Current version, for bookings made before 20 Nov 2026:**
    - Asking guests "to send photos of their government ID prior to arrival" is barred "except where required for legal or compliance reasons", and then it must be in the listing description.
    - Registration on another website "for purposes of gaining entry" is barred unless legally or compliance required.
    - Contracts are allowed only if the actual terms are disclosed in the listing.
- **Software-connected status.** [airbnb.co.uk/help/article/2683](https://www.airbnb.co.uk/help/article/2683) explains how to check PMS connection (Listing editor > Settings > Property management software). It does not say which hosts may collect deposits. Whether Seeker's Smoobu connection gives us Airbnb's "select software-connected" deposit permission is **NOT CHECKED**.

### Booking.com
- **Damage policy options.** [Partner Help, "Everything you need to know about damage policy options"](https://partner.booking.com/en-us/help/policies-payments/guest-payments/everything-you-need-know-about-damage-policy-options), page dated 6 Aug 2026, read 24 Oct 2026.
  - Outside the US, partners choose either a **damage deposit** or the **damage program**.
  - Damage deposit: "your guest gives you a deposit directly. You define how and when you collect this amount … You must collect and return the amount as per the agreement you made at the time of booking." Booking.com also says: "**damage deposits tend to result in fewer bookings and more cancellations**."
  - Setup path: Extranet > **Property > Property policies > Other > Damage policy options > Edit > "Do your guests pay a damage deposit?"**
  - Damage program: no upfront payment. The host requests payment within 14 days of checkout, up to a maximum per stay that the host sets. Booking.com contacts the guest but "can't guarantee payment".
  - The damage program can't be used for smoking, house-rule breaches or routine cleaning.
- **How guests see it.** [Booking.com Terms](https://www.booking.com/content/terms.en-gb.html), read 24 Oct 2026.
  - "The Service Provider might require a 'damage deposit' before or at check-in. If they do, **we'll tell you about it while you're booking** … We won't be involved in any financial settlement related to damage deposits."
  - Policies on "security/damage deposits" appear "on the Service Provider information pages, during the booking process, in the fine print, and in the confirmation email".
  - Whether it also shows on search results is NOT CHECKED (Booking.com search pages were not fetched).
- **Undisclosed fees.**
  - Per WebSearch snippets of Booking.com partner pages, which I did not open: [Complying with EU consumer law](https://partner.booking.com/en-gb/help/legal-security/policies-local-laws/complying-european-union-consumer-law) says all mandatory charges must be shown, and fees marked "incalculable" are removed and should not be charged. [Card/payment fees](https://partner.booking.com/en-gb/help/policies-payments/can-i-charge-credit-card-andor-payment-fees-bookings-i-receive-through) are banned on Booking.com reservations.
  - UK law: the CMA's guidance under the DMCC Act 2024 bans "drip pricing", meaning mandatory charges added after the headline price. It also says that "merely presenting a charge separately … does not make it optional". Source: [CMA207 Unfair commercial practices, gov.uk](https://www.gov.uk/government/publications/unfair-commercial-practices-cma207/unfair-commercial-practices), via WebSearch snippet.
  - Inference: a waiver the guest must pay unless they accept a £1,000 hold is arguably a mandatory charge. Legal review is recommended, and this is not legal advice.

## 3. Operators and serviced-apartment brands

Operator websites were blocked by the network policy (see Method), so these rows come from WebSearch result snippets or from the operator's own Airbnb listing text read today. The source type is marked on each row.

| Operator | Deposit / hold | Damage waiver | ID check / pre-arrival | Source (type) |
|---|---|---|---|---|
| **GuestReady** (Airbnb listing [1199240550363055107](https://www.airbnb.co.uk/rooms/1199240550363055107), Poplar) | £500 refundable, **non-Airbnb bookings only** | £20 non-refundable, covers up to £200, **non-Airbnb bookings only** | "you will be requested to verify your identity before being able to check into the flat" | Airbnb page text, 24 Oct 2026 |
| **City Relay** (Airbnb [1069328087003020991](https://www.airbnb.co.uk/rooms/1069328087003020991), Canary Wharf) | none stated | none | "pre-check-in form prior to arrival … governmental identification" | Airbnb page text |
| **"by Omega"** townhouse (Airbnb [1714482878774877381](https://www.airbnb.co.uk/rooms/1714482878774877381), Mile End) | **£345** card pre-authorisation before check-in | none | ID from each guest within 48 h of booking | Airbnb page text |
| **Pass the Keys** (London listing, Clerkenwell) | £500 refundable + £10 transaction fee, *or* … | … **£40** non-refundable waiver | Online verification with government photo ID and a card (Truvi) | WebSearch snippet of book.passthekeys.com (page itself blocked) |
| **Stay in London** (London property manager) | deposit *or* waiver, guest's choice (amounts not stated) | yes | Truvi screening | Truvi vendor case study, [truvi.com](https://truvi.com/success-stories/avoid-problematic-reservations-with-guest-screening-waivers-and-deposits/) (marketing) |
| **Veeve** (London homes) | **£495** security deposit (card hold or 2 days pre-arrival, varies by listing) | none found | card used to book shown at check-in | WebSearch snippets of Exploreo/Expedia listings (third-party) |
| **Cheval Residences** | card pre-auth **£50–£100 per night**. Knightsbridge: "£100 per night", "£1000 for whole stay" over 7 nights | none | booking card and cardholder present | WebSearch snippets of travel-trade listings (third-party) |
| **Locke** aparthotels | "generally won't pay a deposit". **1% pre-authorisation** on pay-on-arrival rates | none | photo ID "may be requested" (Hotels.com) | WebSearch snippet of lockeliving.com help page (page blocked) |
| **Wilde / Staycity** | card or cash deposit for incidentals "may be required" (amount not stated) | none | government photo ID may be required | WebSearch snippets of Hotels.com/Travelocity |
| **Native** (Numa) | card for incidentals (amount not stated) | none | online registration via secure link before arrival; ID copy requested | WebSearch snippet of Hoteles.com |
| **Sonder** | card for incidentals (if prompted) | none | Persona ID scan + selfies before access | WebSearch snippet of sonder.com help. **Note:** Sonder began wind-down and liquidation around 9–11 Nov 2025 ([CoStar](https://www.costar.com/article/95195380/aparthotel-brand-sonder-to-immediately-stop-operations-begin-liquidation-process), [PhocusWire](https://www.phocuswire.com/marriott-terminates-sonder-licensing-agreement)), so it is no longer a live competitor (inference from those reports) |
| **Blueground** | **£2,330–£7,620** deposit taken at booking (monthly-stay product, not comparable) | none | – | WebSearch snippets of Expedia/Travelocity |
| **Plum Guide** | host may set a deposit; damage claims within 48 h through Plum | none found | – | WebSearch snippets of plumguide.com host pages |
| **Houst** | own insurance for claims over £1,000, "booking deposit" for smaller claims. Says its cover does not apply to Airbnb bookings | not found | guest verification by support team | WebSearch snippet of [houst.com blog](https://www.houst.com/blog/host-guides-hosting-and-home-safety) |
| **Bob W** | not found | not found | guest ID collected at online check-in ("legally required") | WebSearch snippet of universityrooms.com listing |
| **Limehome, Lavanda, Airsorted/Hostmaker, UnderTheDoormat, Frontdesk** | **not found** in search results | not found | Limehome: contactless check-in with code (Hotels.com) | NOT CHECKED (no usable source) |

**Pattern. These are inferences from the table above:**
- Professional operators commonly verify ID. Only aparthotels (Cheval, Wilde, Native, Locke) and off-Airbnb channels routinely take a deposit or hold.
- Where operators do take one, it is **£345–£500 for a short stay**, or a per-night pre-auth of £50–£100.
- Waivers seen are **£20–£40**.
- Two professional operators (GuestReady, and Houst for its insurance) explicitly **exempt Airbnb bookings**. This is consistent with Airbnb's deposit rule.

## 4. Airbnb competitor sample: 40 entire-home 2BR listings, 8–11 Nov 2026 search, first 8 per area (our listings excluded)

Price is the 3-night total Airbnb displays for 4 adults. "–" means the listing text does not mention it.

| Area | Airbnb id | Title (truncated) | Host type | 3-night total | ID verification | Security deposit | Damage waiver | Pre-arrival check-in / registration |
|---|---|---|---|---|---|---|---|---|
| Camden | [1734699964384266503](https://www.airbnb.co.uk/rooms/1734699964384266503) | Newly refurbished two bedroom flat by Camden | Business (245 host reviews) | £510 | - | - | - | - |
| Camden | [1399127748953657476](https://www.airbnb.co.uk/rooms/1399127748953657476) | Ovitzia Top Floor Flat with 2 Balconies | Business (4159 host reviews) | £679 | - | - | - | - |
| Camden | [1629303544721233156](https://www.airbnb.co.uk/rooms/1629303544721233156) | Central Camden Gem with Patio | Individual (192 host reviews) | £890 | - | - | - | - |
| Camden | [12896220](https://www.airbnb.co.uk/rooms/12896220) | Central, Quirky & Modern Detached Home in Cam | Individual (315 host reviews) | £941 | - | - | - | - |
| Camden | [1724683358798238179](https://www.airbnb.co.uk/rooms/1724683358798238179) | Modern King's Cross 2BR Apt near Camden & Reg | Individual (417 host reviews) | £695 | - | - | - | Pre-arrival requirements via guest portal; address withheld until done |
| Camden | [1431050774269771793](https://www.airbnb.co.uk/rooms/1431050774269771793) | Luxury 2-bedroom Flat in Camden | (none shown) (483 host reviews) | £537 | - | - | - | - |
| Camden | [1432477093890181799](https://www.airbnb.co.uk/rooms/1432477093890181799) | Luxury Townhouse Central London / AC / 2BR/2. | Business (1704 host reviews) | £1,040 | - | - | - | - |
| Camden | [1412378094707509010](https://www.airbnb.co.uk/rooms/1412378094707509010) | Camden Vibes – Chic 3BR + Patio | Business (43 host reviews) | £604 | - | - | - | - |
| StJohnsWood_Marylebone | [1771600541145348341](https://www.airbnb.co.uk/rooms/1771600541145348341) | Luxury London 2-Bed 2-Bath Apartment- Free Pa | Business (9 host reviews) | £787 | - | - | - | - |
| StJohnsWood_Marylebone | [1578265737457454927](https://www.airbnb.co.uk/rooms/1578265737457454927) | Central London / Modern / Baker Street / Slee | Individual (4057 host reviews) | £723 | - | - | - | - |
| StJohnsWood_Marylebone | [1766687557518260714](https://www.airbnb.co.uk/rooms/1766687557518260714) | Amazing Apartment in Paddington / Marylebone  | Individual (217 host reviews) | £786 | - | - | - | - |
| StJohnsWood_Marylebone | [1789387972711873624](https://www.airbnb.co.uk/rooms/1789387972711873624) | Marylebone/LDN LUX 6 guest Elevator/AC/Modern | Business (108 host reviews) | £587 | - | - | - | - |
| StJohnsWood_Marylebone | [1695955451099004464](https://www.airbnb.co.uk/rooms/1695955451099004464) | 2BR + Private Terrace / Zone 1 / Sleeps 7 | Business (102 host reviews) | £713 | - | - | - | - |
| StJohnsWood_Marylebone | [1779792664615925746](https://www.airbnb.co.uk/rooms/1779792664615925746) | Edgware Road 2-bed Apartment in Cenral London | Business (586 host reviews) | £777 | - | - | - | - |
| StJohnsWood_Marylebone | [1640618479578935733](https://www.airbnb.co.uk/rooms/1640618479578935733) | Marylebone Charm Apartment - Prime Central Lo | Individual (5104 host reviews) | £477 | - | - | - | - |
| StJohnsWood_Marylebone | [39741384](https://www.airbnb.co.uk/rooms/39741384) | Lovely 3 Bedroom Apartment in Zone 1 | Business (3426 host reviews) | £445 | - | - | - | - |
| ShepherdsBush_W12 | [1689934616924498374](https://www.airbnb.co.uk/rooms/1689934616924498374) | Modern 2BR Flat near Shepherd’s Bush & Hammer | Individual (1257 host reviews) | £520 | - | - | - | Pre-arrival requirements via guest portal; address withheld until done |
| ShepherdsBush_W12 | [1754924301066353249](https://www.airbnb.co.uk/rooms/1754924301066353249) | Modern 3BR near Holland Park / Shepherd’s Bus | Business (794 host reviews) | £718 | - | - | - | - |
| ShepherdsBush_W12 | [1546299047990791016](https://www.airbnb.co.uk/rooms/1546299047990791016) | Newly Refurbished 2BDR West London Retreat | Business (2370 host reviews) | £443 | - | - | - | - |
| ShepherdsBush_W12 | [1759720987098048674](https://www.airbnb.co.uk/rooms/1759720987098048674) | Luxury 3-Bed Home • 2 Baths • Sleeps 8 • Near | Business (68 host reviews) | £824 | - | - | - | - |
| ShepherdsBush_W12 | [1739912823914368985](https://www.airbnb.co.uk/rooms/1739912823914368985) | Ideal for Business Stays / Roof Terrace | Business (124 host reviews) | £560 | - | - | - | - |
| ShepherdsBush_W12 | [1427356510827612998](https://www.airbnb.co.uk/rooms/1427356510827612998) | The Westview: 2BR Penthouse &Terrace in White | Business (1543 host reviews) | £651 | - | - | - | Must fill check-in form from confirmation email to receive access |
| ShepherdsBush_W12 | [1791232914482390535](https://www.airbnb.co.uk/rooms/1791232914482390535) | 2Bed Flat in West London -Free Parking | Individual (2 host reviews) | £647 | - | - | - | - |
| ShepherdsBush_W12 | [1756617199457596634](https://www.airbnb.co.uk/rooms/1756617199457596634) | Spacious 2BR / Steps to Tube Station & Westfi | Business (364 host reviews) | £518 | - | - | - | - |
| MileEnd_Bow | [1777613234672252564](https://www.airbnb.co.uk/rooms/1777613234672252564) | +Cosy 2BR Flat in Mile End (Central Line trai | Business (3566 host reviews) | £290 | - | - | - | - |
| MileEnd_Bow | [1199115199309731731](https://www.airbnb.co.uk/rooms/1199115199309731731) | Family-friendly - Designer - Sunny balcony | Individual (85 host reviews) | £497 | - | - | - | - |
| MileEnd_Bow | [819309330061850206](https://www.airbnb.co.uk/rooms/819309330061850206) | Spacious light two bedroom apartment hackney  | Individual (178 host reviews) | £586 | - | - | - | - |
| MileEnd_Bow | [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | Enjoy the sun with a private rooftop! 2Br/2Ba | Business (43 host reviews) | £640 | - | - | - | - |
| MileEnd_Bow | [1199240550363055107](https://www.airbnb.co.uk/rooms/1199240550363055107) | GuestReady - Modern 2BR w Balcony in Poplar | Business (34 host reviews) | £625 | Verify identity before check-in | £500 refundable OR £20 waiver (covers £200) - stated as non-Airbnb bookings only | yes (with deposit option) | - |
| MileEnd_Bow | [1714482878774877381](https://www.airbnb.co.uk/rooms/1714482878774877381) | 1820s 4BR Townhouse Sleeps 9 Near Tube by Ome | Business (1497 host reviews) | £963 | ID from each guest within 48h of booking + at check-in | £345 card pre-auth before check-in | - | - |
| MileEnd_Bow | [1728603702562072773](https://www.airbnb.co.uk/rooms/1728603702562072773) | Luxury Central London 2BR Apartment  | Business (721 host reviews) | £570 | Photo ID only for last-minute / flagged bookings | - | - | - |
| MileEnd_Bow | [28513020](https://www.airbnb.co.uk/rooms/28513020) | Luxury 2 bedroom modern apartment in East Lon | Individual (40 host reviews) | £665 | - | - | - | - |
| CanaryWharf | [1782144173922818973](https://www.airbnb.co.uk/rooms/1782144173922818973) | Weekly Discount Telegraph Place  | (none shown) (64 host reviews) | £375 | - | - | - | - |
| CanaryWharf | [1697250589187633380](https://www.airbnb.co.uk/rooms/1697250589187633380) | Riverfront Gem with Stunning Views, Canary Wh | Individual (104 host reviews) | £625 | - | - | - | - |
| CanaryWharf | [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | ShyTowerLux Two-Bedrooms | Individual (385 host reviews) | £980 | - | - | - | - |
| CanaryWharf | [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | The Queens Pier | Business (473 host reviews) | £750 | - | - | - | - |
| CanaryWharf | [1452860543390941869](https://www.airbnb.co.uk/rooms/1452860543390941869) | Bright & Airy Apartment, Great Location, Park | Business (451 host reviews) | £675 | - | - | - | - |
| CanaryWharf | [20404597](https://www.airbnb.co.uk/rooms/20404597) | High -Rise  Waterfront Apartment | Business (166 host reviews) | £870 | Valid ID at check-in (building rule) | - | - | - |
| CanaryWharf | [1069328087003020991](https://www.airbnb.co.uk/rooms/1069328087003020991) | Canary Wharf Retreat with Free Secure Parking | Business (14059 host reviews) | £644 | Gov ID via pre-check-in form | - | - | Pre-check-in form |
| CanaryWharf | [1485534484360691747](https://www.airbnb.co.uk/rooms/1485534484360691747) | Luxurious two bedroom penthouse | Business (12 host reviews) | £728 | Copy of photo ID before check-in | Refundable deposit required (amount not stated) | - | - |

Other fees seen in comp text, for context:
- Lost-key or lock-out fees: £50–£200 (12896220, 1546299047990791016, 1640618479578935733, 1432477093890181799, 1199240550363055107).
- A £300 minimum smoking fee (GuestReady).
- A "lead guest must be at least 25" rule (1724683358798238179 and 1689934616924498374, which share the same template).

None of these are deposits.

### Prevalence

| Measure | Comps (n=40) | Business hosts (n=25) | Individual hosts (n=13) | Seeker (n=11) |
|---|---|---|---|---|
| Mentions ID verification | 6 (15%) | 6 | 0 | 10 (91%) |
| Mentions security deposit / hold | 3 (7.5%): £345, £500 (non-Airbnb only), amount not stated | 3 | 0 | 10 (91%): **£1,000** |
| Mentions damage waiver | 1 (2.5%): £20 (non-Airbnb only) | 1 | 0 | 10 (91%): **£99 / £109 / £119** |
| Mentions pre-arrival form / portal / registration | 4 (10%) | 3 | 1 | 9 (82%) |
| Mentions any of the above | 9 (22.5%) | 7 (28%) | 2 (15%) | 10 (91%) |

| Area | Business-host comps | Comps mentioning any of the above |
|---|---|---|
| Camden | 4/8 | 1/8 |
| St John's Wood / Marylebone | 5/8 | 0/8 |
| Shepherd's Bush / W12 | 6/8 | 2/8 |
| Mile End / Bow | 5/8 | 3/8 |
| Canary Wharf | 5/8 | 3/8 |

**Typical amounts on Airbnb.**
- A deposit is asked on Airbnb by **1 in 40** comps with a stated amount (£345), plus one with no amount.
- The median comp asks for **no deposit and no waiver**.
- Ours: £1,000 or £99–£119.

## 5. Risks for Seeker, and what they imply

The following are inferences unless quoted. Not legal advice.

1. **Airbnb deposit and waiver (now).**
   - We describe a £1,000 hold and a £99–£119 waiver in description text and collect them off-platform before access.
   - Airbnb allows off-platform deposits only for "select software-connected hosts", and only when the deposit is "in the appropriate fee field so that it is disclosed to guests before booking" (article 2799). The waiver works as a mandatory fee unless the guest takes the hold, and mandatory fees must be in a fee field or the nightly price (article 2799). There is no waiver fee field (article 2385).
   - Unless Airbnb has authorised Seeker (NOT CHECKED), this matches the conduct the policy names. Airbnb's stated consequences range from warnings to listing or account suspension.
   - It may also cut ranking or conversion. That is not measurable here.
2. **Airbnb ID and online check-in (from 20 Nov 2026 bookings).**
   - The new article 4169 bars collecting ID documents and requiring registration on a third-party site to gain entry. It also generally bars a separate agreement ("agreement to house rules"). This applies unless the requirement comes from law or a documented building rule, disclosed in the listing's requests section.
   - Inference: our current "secure online check-in" flow would conflict for any booking made from 20 Nov unless a legal or building-rule basis applies.
   - AirCover already includes "guest identity verification, reservation screening" (article 3142).
3. **Booking.com (P11 Camden is Booking.com only; P13 is also there).**
   - A damage deposit is permitted, but must be set in the Extranet so that it is shown at booking.
   - Whether our deposit is set there, and how, is NOT CHECKED.
   - A waiver offered as the alternative to a deposit is not a Booking.com damage-policy option. Inference: if guests must pay it, it is a mandatory charge outside the price shown to them.
   - The damage program (no upfront payment, claim within 14 days) is Booking.com's built-in alternative.
4. **Demand effect (inference).**
   - The requirement adds friction that 77.5% of nearby comps do not have, and that no individual-host comp has.
   - The £1,000 figure is 2–3× any short-stay deposit found in this research (£345–£500).
   - Booking.com's own help page states deposits "tend to result in fewer bookings and more cancellations".
   - This cannot be quantified from listing text alone. No review text was checked, so guest complaints about the deposit were NOT CHECKED.

### Options for Corentin to decide

These are not changes made by this agent. Everything was read-only.

- **Airbnb, all listings.**
  1. Remove the off-platform £1,000 hold and the waiver from Airbnb bookings and rely on AirCover. This is what GuestReady and Houst state they do.
  2. Or confirm in writing with Airbnb whether Seeker (via Smoobu) is an authorised "software-connected" host. If so, put the deposit in the fee field.
  3. Before 20 Nov 2026, replace the mandatory online ID upload / registration with an in-person or keybox-compatible ID check disclosed in the listing's "requests" section. The exception is a documented building rule (for example, a concierge requirement), which must then be cited in the listing.
  4. Make the wording consistent across all 11 listings. Today it says "may be" vs "are required", P04 is silent and P20 has only the soft line.
- **Booking.com.**
  1. Either set an explicit damage deposit (Extranet > Property > Property policies > Other > Damage policy options) at a market amount (£300–£500 per the operator evidence above), or use the damage program.
  2. Drop the waiver as a condition of stay, or show it as a mandatory charge in the price.
- **Amount.** If a hold is kept anywhere, the market evidence points to about **£300–£500** for a 2BR short stay, not £1,000. A waiver, if offered as an optional alternative, is seen at **£20–£40**.

## Sources

All read 24 Oct 2026.
- Airbnb listing pages: www.airbnb.co.uk/rooms/{id} for the 40 comps in §4 and our 11 listings in §1. Search URLs: www.airbnb.co.uk/s/London/homes?adults=4&checkin=2026-11-08&checkout=2026-11-11 with map bounds as in Method.
- Airbnb Help Centre: [2799](https://www.airbnb.co.uk/help/article/2799), [2827](https://www.airbnb.co.uk/help/article/2827), [2385](https://www.airbnb.co.uk/help/article/2385), [3142](https://www.airbnb.co.uk/help/article/3142), [1170](https://www.airbnb.co.uk/help/article/1170), [4169](https://www.airbnb.co.uk/help/article/4169), [2683](https://www.airbnb.co.uk/help/article/2683).
- Booking.com: [Partner Help, damage policy options](https://partner.booking.com/en-us/help/policies-payments/guest-payments/everything-you-need-know-about-damage-policy-options) (dated 6 Aug 2026); [Booking.com customer Terms](https://www.booking.com/content/terms.en-gb.html). WebSearch snippets only: [EU consumer law page](https://partner.booking.com/en-gb/help/legal-security/policies-local-laws/complying-european-union-consumer-law), [card fees page](https://partner.booking.com/en-gb/help/policies-payments/can-i-charge-credit-card-andor-payment-fees-bookings-i-receive-through).
- UK law (WebSearch snippet): [CMA207 Unfair commercial practices](https://www.gov.uk/government/publications/unfair-commercial-practices-cma207/unfair-commercial-practices).
- Operators (WebSearch snippets; operator sites blocked):
  - [truvi.com Stay in London case study](https://truvi.com/success-stories/avoid-problematic-reservations-with-guest-screening-waivers-and-deposits/)
  - [houst.com safety guide](https://www.houst.com/blog/host-guides-hosting-and-home-safety)
  - [sonder.com help](https://sonder.com/help/check_in_questions/airbnb-checkin)
  - [lockeliving.com deposit FAQ](https://www.lockeliving.com/en/help/making-a-booking/do-i-have-to-pay-a-deposit)
  - [Exploreo Veeve Marylebone](https://www.exploreo.com/accommodation/r/_0x79a1e)
  - [Expedia Veeve Haggerston](https://www.expedia.com/Veeve-At-Home-In-Haggerston.h19380892.Hotel-Information)
  - [travelagewest Cheval Knightsbridge](https://www.travelagewest.com/Hotels/London/Cheval-Knightsbridge-p6302610), [Cheval Gloucester Park](https://www.travelagewest.com/Hotels/London/Cheval-Gloucester-Park-p9568668), [businesstravelnews Cheval Phoenix House](https://www.businesstravelnews.com/Hotels/London/Cheval-Phoenix-House-p59566099)
  - [Hotels.com Wilde Covent Garden](https://www.hotels.com/ho691561/wilde-aparthotels-by-staycity-covent-garden-london-united-kingdom/)
  - [Hoteles.com Native Hyde Park](https://www.hoteles.com/en/ho415017/native-hyde-park-london-united-kingdom/)
  - [Expedia Blueground Tower Hamlets](https://www.expedia.com/London-Hotels-Blueground-Tower-Hamlets.h120124990.Hotel-Information)
  - [plumguide.com become-a-host](https://www.plumguide.com/become-a-host)
  - [universityrooms.com Bob W Tower of London](https://www.universityrooms.com/es-ES/vendor/bobwtoweroflondon)
  - Pass the Keys listing snippet: book.passthekeys.com/?p=568358
  - Sonder closure: [CoStar](https://www.costar.com/article/95195380/aparthotel-brand-sonder-to-immediately-stop-operations-begin-liquidation-process), [PhocusWire](https://www.phocuswire.com/marriott-terminates-sonder-licensing-agreement)
- Internal: data/policy.json (`guest_requirements`, `airbnb_listings_24oct`); reports/2026-10-24/demand/airbnb-live.md (P13 £577 total, 31 Oct–3 Nov).
