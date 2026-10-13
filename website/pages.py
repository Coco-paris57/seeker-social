"""Page content for the Seeker Estates website. Each function returns (path, html)."""
import site_config as C
from components import (E, Ctx, area_art, bookbar, crumbs, crumbs_schema, cta_band, faq_block, faq_schema,
                        icon, lead_form, lodging_schema, mini_estimator, org_schema, page, section_head)

F = C.FACTS
P = C.PRICING
BOOK = 'href="~/book/" data-book'

# ------------------------------------------------------------------ shared FAQ copy
FAQ_GUEST = [
    ("Why should I book direct instead of on Airbnb or Booking.com?",
     f"Same homes, same team, lower price. Booking direct avoids the platform's service fees, so we pass the saving on: our direct rate is {F['direct_discount']} below what you'll see on the big booking sites. You also deal with us directly from the first message to check-out."),
    ("What's included in every stay?",
     "A whole, private apartment or house with a fully equipped kitchen, fresh linen and towels, Wi-Fi, toiletries to get you started and self check-in. Every home is cleaned and checked by our team between stays."),
    ("How does check-in work?",
     "Self check-in, so you can arrive when it suits you. Your check-in guide with the address, entry instructions and house notes is sent before arrival, and the team is reachable during your stay if you need anything."),
    ("Do you ask for ID or a deposit?",
     "Yes. All guests are ID-verified and a refundable security deposit applies. It protects the homes, the neighbours and the next guest, and it's part of why our homes stay in the condition you see in the photos."),
    ("Is there a minimum stay?",
     "Usually two or three nights. For bookings made further ahead, the minimum can be longer. Your dates will show what's available on the booking page."),
    ("Can I stay for a month or longer?",
     "Yes, and longer stays get a better rate. See our <a href=\"~/mid-term-stays/\">mid-term and corporate stays</a> page, or send us your dates and we'll quote."),
]

FAQ_OWNER = [
    ("How much could my property earn?",
     "It depends on the location, size and finish of the home. Our <a href=\"~/revenue-calculator/\">earnings calculator</a> gives you a range in seconds. For a figure you can rely on, ask for a free appraisal: we price your home against real comparables on your street."),
    ("Is short letting legal in London?",
     "In Greater London, a home can be let as short-term accommodation for up to 90 nights in a calendar year without planning permission, provided the conditions in the law are met. We build every plan around that: short stays up to the limit, then furnished mid-term stays of a month or more for the rest of the year. General information, not legal advice."),
    ("What does it cost?",
     f"Fully managed is {P['managed_fee']}% of booking revenue + VAT, with no set-up fee. Mid-term-only management is {P['midterm_fee']}% + VAT. Guaranteed rent has no fee at all: you receive a fixed monthly rent. Full details are on our <a href=\"~/pricing/\">pricing page</a>."),
    ("Who pays for cleaning, utilities and repairs?",
     "Guests pay a cleaning fee on each short stay, which covers turnover cleaning and fresh linen. On the managed plans the owner covers utilities, Wi-Fi and council tax, and repairs beyond small fixes are agreed with you first. On guaranteed rent, we cover the running costs."),
    ("Do I need permission from my lender, freeholder or insurer?",
     "Often, yes. We read your lease before anything is signed, and we'll tell you what consents your mortgage, lease and insurance need. If the property can't be run properly, we'll say so."),
    ("How are guests vetted?",
     "Every guest is ID-verified, a security deposit applies and house rules are clear before booking. The team checks the home between every stay, so problems are spotted early, not at the end of a tenancy."),
    ("How quickly can my property go live?",
     "Once the home is furnished to standard and the agreement is signed, we photograph it, write the listing and publish it. We'll give you a date at the appraisal."),
    ("Can I use my property myself?",
     "On the managed plans, yes. Block the dates you want in advance and they're yours. On guaranteed rent, the home is let to us for the agreed term."),
]


def proof_block():
    return f"""
<section class="section section--white">
  <div class="wrap split split--wide-right">
    <div class="reveal">
      <span class="eyebrow">Same money, more home</span>
      <h2>Four nights in East London. <em>One apartment or three hotel rooms.</em></h2>
      <p class="lead">For five guests, 20–24 September 2026, our two-bedroom apartment in Barking was priced at £784. Three local hotels quoted £752 to £792 for the same dates, split across two or three separate rooms with no kitchen and no living room.</p>
      <p class="small muted">Prices as displayed on Booking.com, searched 10 September 2026. Hotel names withheld.</p>
      <a class="btn" {BOOK}>Find your dates</a>
    </div>
    <div class="reveal">
      <div class="table-scroll"><table class="compare">
        <thead><tr><th></th><th class="us">Seeker Estates</th><th>Hotel 1</th><th>Hotel 2</th><th>Hotel 3</th></tr></thead>
        <tbody>
          <tr><td>Price, 4 nights</td><td class="us">£784</td><td>£792</td><td>£752</td><td>£775</td></tr>
          <tr><td>Review score</td><td class="us">9.9</td><td>6.7</td><td>5.8</td><td>5.2</td></tr>
          <tr><td>Space</td><td class="us">2 bedrooms + living room</td><td>2 rooms</td><td>3 rooms</td><td>2 rooms</td></tr>
          <tr><td>Kitchen</td><td class="us yes">Yes</td><td class="no">No</td><td class="no">No</td><td class="no">No</td></tr>
          <tr><td>Everyone together</td><td class="us yes">Yes</td><td class="no">No</td><td class="no">No</td><td class="no">No</td></tr>
        </tbody>
      </table></div>
    </div>
  </div>
</section>"""


def areas_grid(ctx, limit=None, cols=4):
    items = C.AREAS[:limit] if limit else C.AREAS
    cards = "".join(
        f'<a class="area reveal" href="{ctx.url("areas/" + a["slug"] + "/")}">{area_art(a)}<h3>{E(a["name"])}</h3><span>{E(a["postcode"])} · {E(a["short"])}</span></a>'
        for a in items)
    return f'<div class="areas{" areas--3" if cols == 3 else ""}">{cards}</div>'


def amenity_cards():
    items = [
        ("home", "The whole place", "A private apartment or house. Your own front door, living room and kitchen. No shared spaces."),
        ("bed", "Hotel-standard linen", "Fresh linen and towels on arrival, beds made, the home cleaned and checked between every stay."),
        ("wifi", "Wi-Fi & workspace", "Fast Wi-Fi in every home and space to open a laptop. Good for work trips and longer stays."),
        ("key", "Self check-in", "Arrive when your train lands, not when reception opens. Clear instructions before you travel."),
        ("chat", "A team on call", "One team for questions before you book and help during your stay. You talk to people who know the home."),
        ("shield", "Safe & verified", "ID-verified guests and a refundable security deposit. Public liability insured."),
    ]
    return '<div class="grid grid-3">' + "".join(
        f'<div class="card reveal"><div class="icon">{icon(i)}</div><h3>{t}</h3><p class="muted">{d}</p></div>' for i, t, d in items) + "</div>"


def stats_band(light=False):
    cls = "section--white" if light else "section--green"
    return f"""
<section class="section--tight {cls}">
  <div class="wrap stats">
    <div class="stat reveal"><b>{F['homes']}</b><span>homes across London</span></div>
    <div class="stat reveal"><b>{F['reviews']}</b><span>verified guest reviews</span></div>
    <div class="stat reveal"><b>{F['occupancy']}</b><span>average occupancy</span></div>
    <div class="stat reveal"><b>{F['booking_score']}</b><span>guest score on Booking.com</span></div>
  </div>
</section>"""


def owner_steps():
    return """<ol class="steps">
  <li class="reveal"><h3>Free appraisal</h3><p>We visit or video-call, read your lease and give you real numbers for your home. No obligation.</p></li>
  <li class="reveal"><h3>Plan &amp; agreement</h3><p>Pick fully managed, mid-term or guaranteed rent. Clear terms, a clear fee, nothing in small print.</p></li>
  <li class="reveal"><h3>Set-up</h3><p>Styling advice, professional photos, the listing, pricing, keys and safety checks. We do it for you.</p></li>
  <li class="reveal"><h3>Earn, monthly</h3><p>Guests arrive, the home is looked after, and you get a clear statement and your payout every month.</p></li>
</ol>"""


# ------------------------------------------------------------------ HOME
def home():
    ctx = Ctx("")
    body = f"""
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <span class="eyebrow">Serviced apartments &amp; property management · London</span>
      <h1>London homes, <em>properly run.</em></h1>
      <p class="lead">Stay in a whole apartment with a kitchen, space and a team on call. Or let us run your property and earn more from it, without the work. Either way, it's handled.</p>
      <div data-tabs>
        <div class="audience" role="tablist" aria-label="I am…">
          <button role="tab" id="t-guest" aria-controls="p-guest" aria-selected="true">I'm looking for a stay</button>
          <button role="tab" id="t-owner" aria-controls="p-owner" aria-selected="false" tabindex="-1">I own a property</button>
        </div>
        <div id="p-guest" role="tabpanel" aria-labelledby="t-guest" data-panel>{bookbar()}</div>
        <div id="p-owner" role="tabpanel" aria-labelledby="t-owner" data-panel hidden>{mini_estimator(ctx)}</div>
      </div>
      <ul class="trust" style="margin-top:28px">
        <li>{icon('star')} {F['reviews']} guest reviews</li>
        <li>{icon('id')} ID-verified guests</li>
        <li>{icon('home')} {F['homes']} homes across London</li>
      </ul>
    </div>
    <div class="hero-art">
      <div class="arch"><img src="{ctx.asset('img/hero-london.svg')}" alt="Illustration of the London skyline at dusk through an arched window" width="400" height="500"></div>
      <div class="float-card float-card--b"><span class="dot">{icon('tag')}</span><span><strong>−{F['direct_discount']}</strong>when you book direct</span></div>
      <div class="float-card float-card--a"><span class="dot">{icon('chart')}</span><span><strong>{F['occupancy']} occupancy</strong>across our homes</span></div>
    </div>
  </div>
</section>

<section class="section--white" style="padding:28px 0">
  <div class="wrap strip"><span>Find our homes on Airbnb</span><span>Booking.com</span><span>— or book direct here and pay {F['direct_discount']} less</span></div>
</section>

<section class="section">
  <div class="wrap">
    {section_head("Two ways in", "Whether you're staying or letting, <em>we run it like a hotel.</em>", center=True)}
    <div class="paths">
      <div class="path path--guest reveal">
        <span class="path-tag">For guests</span>
        <h3>Stay like you live here.</h3>
        <p class="muted">Whole apartments and houses in {F['homes']} London locations. For a weekend, a work trip or a few months.</p>
        <ul>
          <li>{icon('check')} {F['direct_discount']} cheaper than on Airbnb and Booking.com</li>
          <li>{icon('check')} Kitchen, living space, fast Wi-Fi, fresh linen</li>
          <li>{icon('check')} Self check-in and a team you can reach</li>
          <li>{icon('check')} Monthly rates for stays of a month or more</li>
        </ul>
        <a class="btn" {BOOK}>Check availability {icon('arrow')}</a>
      </div>
      <div class="path path--owner reveal">
        <span class="path-tag">For landlords</span>
        <h3>Your property, earning, without the work.</h3>
        <p>We furnish advice, list, price, clean, host and maintain. You get a monthly statement and a payout, or a fixed guaranteed rent.</p>
        <ul>
          <li>{icon('check')} Fully managed from {P['managed_fee']}% + VAT, no set-up fee</li>
          <li>{icon('check')} Guaranteed rent option: fixed income, no voids</li>
          <li>{icon('check')} Built around London's 90-night rule</li>
          <li>{icon('check')} Your lease read before anything is signed</li>
        </ul>
        <a class="btn btn--clay" href="{ctx.url('revenue-calculator/')}">See what you could earn {icon('arrow')}</a>
      </div>
    </div>
  </div>
</section>

{stats_band()}

<section class="section">
  <div class="wrap">
    {section_head("Why guests choose us", "Everything a hotel does well. <em>Plus a front door.</em>", "Every home is a full apartment or house, kept to the same standard by the same team.")}
    {amenity_cards()}
  </div>
</section>

{proof_block()}

<section class="section">
  <div class="wrap">
    {section_head("Where we host", "Homes in the London <em>you actually want to be in.</em>", "From Canary Wharf to St John's Wood. Close to the stadiums, venues, parks and stations people travel for.")}
    {areas_grid(ctx, cols=3)}
  </div>
</section>

<section class="section section--green">
  <div class="wrap split">
    <div class="reveal">
      <span class="eyebrow">For property owners</span>
      <h2>More from your property. <em>Less on your plate.</em></h2>
      <p class="lead">Since the Renters' Rights Act, a long let means periodic tenancies, tribunal-tested rent rises and longer routes to getting your home back. We offer a different model: furnished stays, run by professionals, inside the rules.</p>
      <ul class="checklist">
        <li>{icon('pound')}<div><strong>Earn more, honestly</strong><span>Short stays up to 90 nights a year, furnished mid-term stays the rest. Real numbers, never fantasy yields.</span></div></li>
        <li>{icon('shield')}<div><strong>Guests, not tenancies</strong><span>ID-verified guests, security deposits, a check after every stay. No assured periodic tenancy to unwind.</span></div></li>
        <li>{icon('calendar')}<div><strong>Or a fixed monthly rent</strong><span>Prefer certainty? Our guaranteed rent pays the same amount every month, occupied or not.</span></div></li>
      </ul>
      <a class="btn btn--light" href="{ctx.url('landlords/')}">How it works for landlords {icon('arrow')}</a>
    </div>
    <div class="card card--white reveal">
      <span class="eyebrow">Earnings estimate</span>
      <h3>What could your home earn?</h3>
      <p class="muted">Enter your postcode and bedrooms. You'll see an estimated monthly figure next to a typical long let.</p>
      {mini_estimator(ctx)}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    {section_head("How it works for landlords", "From first call to first payout, <em>in four steps.</em>")}
    {owner_steps()}
  </div>
</section>

<section class="section section--sand">
  <div class="wrap">
    {section_head("Questions", "Good questions, <em>straight answers.</em>")}
    {faq_block(FAQ_GUEST[:3] + FAQ_OWNER[:3])}
    <p style="margin-top:28px"><a class="link-arrow" href="{ctx.url('faq/')}">All questions {icon('arrow')}</a></p>
  </div>
</section>

{cta_band(ctx)}
"""
    schema = [org_schema(), lodging_schema(), {
        "@context": "https://schema.org", "@type": "WebSite", "name": C.BRAND, "url": C.SITE_URL + "/",
        "publisher": {"@id": C.SITE_URL + "/#org"}}, faq_schema(FAQ_GUEST[:3] + FAQ_OWNER[:3])]
    return ctx.path, page(ctx,
        title="Serviced Apartments London | Book Direct & Save 10% | Seeker Estates",
        description=f"Whole serviced apartments and homes across London: kitchen, Wi-Fi, self check-in. Book direct for {F['direct_discount']} off. Landlords: property management and guaranteed rent.",
        body=body, schema=schema)


# ------------------------------------------------------------------ STAYS
def stays():
    ctx = Ctx("stays/")
    rows = [
        ("Price", f"Our best rate: {F['direct_discount']} below the platforms", "Includes the platform's service fees"),
        ("Who you talk to", "Our team, directly, from the first message", "The platform's messaging and support"),
        ("Longer stays", "Monthly rates and invoices on request", "Standard nightly pricing"),
        ("The home", "The same homes, the same standards", "The same homes, the same standards"),
    ]
    trs = "".join(f'<tr><td>{a}</td><td class="us">{b}</td><td>{c}</td></tr>' for a, b, c in rows)
    body = f"""
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      {crumbs(ctx, [("", "Home"), ("stays/", "Stay with us")])}
      <span class="eyebrow">Serviced apartments in London</span>
      <h1>Stay in London <em>like you live here.</em></h1>
      <p class="lead">Whole apartments and houses, cleaned to hotel standard, with a kitchen, fast Wi-Fi and self check-in. Book direct and pay {F['direct_discount']} less than on Airbnb or Booking.com.</p>
      {bookbar()}
      <ul class="trust" style="margin-top:28px">
        <li>{icon('star')} {F['reviews']} reviews</li><li>{icon('users')} Sleeps 2 to 8</li><li>{icon('clock')} Average stay {F['avg_stay']}</li>
      </ul>
    </div>
    <div class="hero-art">
      <div class="arch"><img src="{ctx.asset('img/hero-london.svg')}" alt="" width="400" height="500"></div>
      <div class="float-card float-card--a"><span class="dot">{icon('key')}</span><span><strong>Self check-in</strong>arrive on your schedule</span></div>
    </div>
  </div>
</section>

<section class="section section--white">
  <div class="wrap">
    {section_head("In every home", "The space of an apartment. <em>The standards of a hotel.</em>")}
    {amenity_cards()}
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div class="reveal">
      <span class="eyebrow">Book direct</span>
      <h2>Same home. <em>Better price.</em></h2>
      <p class="lead">You'll find our homes on the big booking sites too. Booking here costs less because there's no platform fee in the middle, and we pass that saving to you.</p>
      <a class="btn btn--clay" {BOOK}>See prices for your dates {icon('arrow')}</a>
    </div>
    <div class="reveal table-scroll">
      <table class="compare"><thead><tr><th></th><th class="us">Book direct</th><th>Booking platforms</th></tr></thead><tbody>{trs}</tbody></table>
    </div>
  </div>
</section>

<section class="section section--white">
  <div class="wrap">
    {section_head("Good for", "Built for the way people <em>actually travel to London.</em>")}
    <div class="grid grid-4">
      <div class="card reveal"><div class="icon">{icon('users')}</div><h3>Families &amp; groups</h3><p class="muted">Everyone under one roof, with a kitchen and a living room to share. Homes sleep up to 8.</p></div>
      <div class="card reveal"><div class="icon">{icon('briefcase')}</div><h3>Work trips</h3><p class="muted">Wi-Fi, a desk-friendly table and quick links to Canary Wharf, the City and the West End.</p></div>
      <div class="card reveal"><div class="icon">{icon('sparkle')}</div><h3>Concerts &amp; events</h3><p class="muted">Close to The O2, ExCeL, Wembley, Lord's, Stamford Bridge and the Emirates.</p></div>
      <div class="card reveal"><div class="icon">{icon('calendar')}</div><h3>Longer stays</h3><p class="muted">Relocating, renovating or on a project? <a href="{ctx.url('mid-term-stays/')}">Monthly rates</a> for a month or more.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    {section_head("Where we host", "Pick your <em>part of London.</em>")}
    {areas_grid(ctx, cols=3)}
  </div>
</section>

{proof_block()}

<section class="section section--sand">
  <div class="wrap">
    {section_head("Guest questions", "Before you <em>book.</em>")}
    {faq_block(FAQ_GUEST)}
  </div>
</section>

{cta_band(ctx)}
"""
    schema = [lodging_schema(), faq_schema(FAQ_GUEST), crumbs_schema(ctx, [("", "Home"), ("stays/", "Stay with us")])]
    return ctx.path, page(ctx,
        title="Book Serviced Apartments in London Direct | Seeker Estates",
        description=f"Whole apartments and houses across London with kitchen, Wi-Fi and self check-in. Book direct and save {F['direct_discount']} vs Airbnb and Booking.com.",
        body=body, schema=schema)


# ------------------------------------------------------------------ BOOK
def book():
    ctx = Ctx("book/")
    body = f"""
<section class="page-hero" style="padding-bottom:24px">
  <div class="wrap">
    {crumbs(ctx, [("", "Home"), ("book/", "Book direct")])}
    <span class="eyebrow">Book direct · {F['direct_discount']} below Airbnb &amp; Booking.com</span>
    <h1>Choose your dates <em>and your home.</em></h1>
    <p class="lead">Live availability and prices for all {F['homes']} homes. Secure payment, instant confirmation, and our team on hand from the first message.</p>
    <ul class="trust">
      <li>{icon('lock')} Secure payment</li><li>{icon('tag')} Best rate, guaranteed direct</li><li>{icon('star')} {F['reviews']} guest reviews</li>
    </ul>
  </div>
</section>
<section class="section--tight" id="booking" style="padding-top:0">
  <div class="wrap">
    <div class="booking-frame">
      <iframe id="booking-frame" title="Seeker Estates booking engine" loading="eager" allow="payment" referrerpolicy="strict-origin-when-cross-origin"></iframe>
    </div>
    <p class="small muted" style="margin-top:14px">Booking engine not loading? <a id="booking-newtab" href="{C.BOOKING_URL}" target="_blank" rel="noopener">Open it in a new tab</a> or email <a href="mailto:{C.EMAIL}">{C.EMAIL}</a>.</p>
  </div>
</section>
<section class="section section--sand">
  <div class="wrap">
    {section_head("Before you book", "Good to <em>know.</em>")}
    {faq_block(FAQ_GUEST[:5])}
  </div>
</section>
"""
    return ctx.path, page(ctx, scripts=("book.js",),
        title="Book Direct: London Serviced Apartments | Seeker Estates",
        description=f"Check live availability and book a Seeker Estates home directly. {F['direct_discount']} below Airbnb and Booking.com, secure payment, instant confirmation.",
        body=body, schema=[lodging_schema(), faq_schema(FAQ_GUEST[:5]), crumbs_schema(ctx, [("", "Home"), ("book/", "Book direct")])])


# ------------------------------------------------------------------ MID-TERM
FAQ_MID = [
    ("How long can I stay?", "From one month to around six months. Tell us your dates and we'll confirm availability and a monthly price."),
    ("What's included in the monthly price?", "The furnished home, utilities, Wi-Fi and council tax. Mid-stay cleaning and linen changes can be added."),
    ("Can my company pay and get an invoice?", "Yes. We invoice companies, relocation agents and insurers directly."),
    ("Is this a tenancy?", "No. Mid-term stays are furnished accommodation for people living temporarily in London, for work, relocation, study or while their own home is unavailable. We'll confirm the right agreement for your situation."),
]


def mid_term():
    ctx = Ctx("mid-term-stays/")
    body = f"""
<section class="page-hero">
  <div class="wrap">
    {crumbs(ctx, [("", "Home"), ("mid-term-stays/", "Mid-term & corporate stays")])}
    <span class="eyebrow">Furnished monthly stays · London</span>
    <h1>A London home for a month, <em>or six.</em></h1>
    <p class="lead">Furnished apartments with bills, Wi-Fi and council tax included in one monthly price. For relocations, project teams, insurance claims and anyone between homes.</p>
    <div class="hero-actions"><a class="btn btn--clay" href="#enquire">Request a monthly quote</a><a class="btn btn--ghost" {BOOK}>Check dates online</a></div>
  </div>
</section>

<section class="section section--white">
  <div class="wrap">
    {section_head("Who we host", "Companies and people <em>who need more than a hotel.</em>")}
    <div class="grid grid-3">
      <div class="card reveal"><div class="icon">{icon('briefcase')}</div><h3>Corporate &amp; project teams</h3><p class="muted">Consultants, contractors and secondees near Canary Wharf, the City, the West End and Heathrow.</p></div>
      <div class="card reveal"><div class="icon">{icon('home')}</div><h3>Relocation</h3><p class="muted">Land in London, settle in, then find your long-term home without rushing into a lease.</p></div>
      <div class="card reveal"><div class="icon">{icon('shield')}</div><h3>Insurance &amp; displacement</h3><p class="muted">Flood, fire or renovation? A whole home for the family while yours is put right.</p></div>
      <div class="card reveal"><div class="icon">{icon('users')}</div><h3>Families visiting</h3><p class="muted">Space for everyone during a long visit, a birth or a hospital stay nearby.</p></div>
      <div class="card reveal"><div class="icon">{icon('file')}</div><h3>One invoice</h3><p class="muted">One monthly price, one invoice. No utility accounts, no deposits scheme paperwork, no furniture to buy.</p></div>
      <div class="card reveal"><div class="icon">{icon('chat')}</div><h3>One point of contact</h3><p class="muted">A named team for the whole stay. Maintenance handled quickly, with no tenancy back-and-forth.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div class="reveal">
      <span class="eyebrow">Monthly quote</span>
      <h2>Tell us the dates. <em>We'll do the rest.</em></h2>
      <p class="lead">Send us the area, dates and number of people. We'll reply within one working day with the homes that fit and a monthly price.</p>
      <ul class="checklist">
        <li>{icon('check')}<div><strong>All-inclusive</strong><span>Utilities, Wi-Fi and council tax in one price.</span></div></li>
        <li>{icon('check')}<div><strong>Flexible</strong><span>From one month, extend if your plans change and the home is free.</span></div></li>
        <li>{icon('check')}<div><strong>Company-friendly</strong><span>Invoices to companies and agents.</span></div></li>
      </ul>
    </div>
    <div class="card reveal" id="enquire">{lead_form(ctx, kind="contact", title="Request a monthly quote", button="Send my request")}</div>
  </div>
</section>

<section class="section section--sand">
  <div class="wrap">
    {section_head("Questions", "Mid-term stays, <em>explained.</em>")}
    {faq_block(FAQ_MID)}
  </div>
</section>

{cta_band(ctx, title="Need a home in London next month?", text="Tell us where and when. We'll reply with options and a monthly price within one working day.")}
"""
    schema = [faq_schema(FAQ_MID), crumbs_schema(ctx, [("", "Home"), ("mid-term-stays/", "Mid-term & corporate stays")])]
    return ctx.path, page(ctx,
        title="Furnished Monthly Rentals & Corporate Housing London | Seeker Estates",
        description="Furnished London apartments for 1–6 months with bills, Wi-Fi and council tax included. Corporate housing, relocation and insurance stays. Request a monthly quote.",
        body=body, schema=schema)


# ------------------------------------------------------------------ LANDLORDS
def plans_html(ctx):
    return f"""
<div class="plans">
  <div class="plan reveal">
    <h3>Mid-term lets</h3>
    <p class="for">Furnished stays of one month or more. Fewer turnovers, steady income.</p>
    <div class="price">{P['midterm_fee']}%<small> + VAT</small></div>
    <p class="price-note">of rent collected · no set-up fee</p>
    <ul>
      <li>{icon('check')} Corporate, relocation &amp; insurance guests</li>
      <li>{icon('check')} Vetting, contracts and payments</li>
      <li>{icon('check')} Cleaning between stays</li>
      <li>{icon('check')} Maintenance coordination</li>
      <li>{icon('check')} Monthly statement &amp; payout</li>
    </ul>
    <a class="btn btn--ghost btn--block" href="{ctx.url('landlords/')}#enquire">Get an appraisal</a>
  </div>
  <div class="plan plan--featured reveal">
    <span class="plan-badge">Most popular</span>
    <h3>Fully managed</h3>
    <p class="for">Short stays up to 90 nights a year, mid-term stays the rest. The most income.</p>
    <div class="price">{P['managed_fee']}%<small> + VAT</small></div>
    <p class="price-note">of booking revenue · {P['setup_fee']} set-up fee</p>
    <ul>
      <li>{icon('check')} Everything in Mid-term lets</li>
      <li>{icon('check')} Listing on Airbnb, Booking.com &amp; direct</li>
      <li>{icon('check')} Professional photos &amp; listing copy</li>
      <li>{icon('check')} Daily dynamic pricing</li>
      <li>{icon('check')} Guest messaging &amp; check-in, 7 days</li>
      <li>{icon('check')} Hotel-standard cleaning &amp; linen</li>
      <li>{icon('check')} 90-night tracking, every calendar year</li>
    </ul>
    <a class="btn btn--clay btn--block" href="{ctx.url('landlords/')}#enquire">Get an appraisal</a>
  </div>
  <div class="plan reveal">
    <h3>Guaranteed rent</h3>
    <p class="for">A fixed rent every month, whether the home is occupied or not.</p>
    <div class="price">Fixed<small> / month</small></div>
    <p class="price-note">no management fee · agreed per property</p>
    <ul>
      <li>{icon('check')} Same amount, same day, every month</li>
      <li>{icon('check')} No voids, no arrears</li>
      <li>{icon('check')} We cover utilities &amp; running costs</li>
      <li>{icon('check')} Home returned in the condition received, fair wear and tear excepted</li>
      <li>{icon('check')} Terms from 1 to 5 years</li>
    </ul>
    <a class="btn btn--ghost btn--block" href="{ctx.url('landlords/')}#enquire">Request an offer</a>
  </div>
</div>"""


def landlords():
    ctx = Ctx("landlords/")
    services = [
        ("camera", "Photos & listing", "Professional photography and listing copy written to rank and convert."),
        ("chart", "Dynamic pricing", "Prices set daily against demand, events and seasonality."),
        ("tag", "Multi-channel", "Airbnb, Booking.com and our own direct-booking site."),
        ("id", "Guest vetting", "ID verification and a security deposit on every booking."),
        ("chat", "Guest communication", "Enquiries, check-in and support, 7 days a week."),
        ("sparkle", "Cleaning & linen", "Hotel-standard turnovers, linen and restocking after every stay."),
        ("wrench", "Maintenance", "Small fixes handled, larger jobs quoted and agreed with you first."),
        ("eye", "Inspections", "The home is checked after every stay, not once a year."),
        ("scale", "90-night tracking", "Short-stay nights counted per calendar year, with mid-term stays filling the rest."),
        ("file", "Monthly statements", "Every booking, fee and cost itemised, with your payout every month."),
        ("lock", "Smart access", "Self check-in with secure key handling."),
        ("shield", "Public liability insured", "Our operations are covered by public liability insurance."),
    ]
    svc = "".join(f'<div class="card reveal"><div class="icon">{icon(i)}</div><h3>{t}</h3><p class="muted">{d}</p></div>' for i, t, d in services)
    body = f"""
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      {crumbs(ctx, [("", "Home"), ("landlords/", "For landlords")])}
      <span class="eyebrow">Property management · London</span>
      <h1>Your London property, earning more. <em>Without the work.</em></h1>
      <p class="lead">We turn your home into a professionally run serviced apartment: furnished stays for guests and companies, managed end to end, inside London's rules. Or we pay you a fixed rent every month.</p>
      {mini_estimator(ctx)}
      <ul class="trust" style="margin-top:28px">
        <li>{icon('check')} From {P['managed_fee']}% + VAT</li><li>{icon('check')} {P['setup_fee']} set-up</li><li>{icon('check')} {F['occupancy']} average occupancy</li>
      </ul>
    </div>
    <div class="card reveal" id="enquire" style="box-shadow:var(--shadow)">
      {lead_form(ctx)}
    </div>
  </div>
</section>

{stats_band()}

<section class="section">
  <div class="wrap">
    {section_head("Three ways to work with us", "Choose income, <em>or choose certainty.</em>", "All plans include the same team and the same standards. We'll recommend the right one for your property at the appraisal.")}
    {plans_html(ctx)}
    <p class="small muted" style="margin-top:20px">Prices exclude VAT. Guests pay a cleaning fee on short stays. See <a href="{ctx.url('pricing/')}">full pricing</a> for who pays what.</p>
  </div>
</section>

<section class="section section--white">
  <div class="wrap">
    {section_head("What we handle", "Everything between <em>the keys and the payout.</em>")}
    <div class="grid grid-4">{svc}</div>
  </div>
</section>

<section class="section section--green">
  <div class="wrap split">
    <div class="reveal">
      <span class="eyebrow">Compliant by design</span>
      <h2>Inside London's rules. <em>Every night of the year.</em></h2>
      <p class="lead">In Greater London a home can be let for short stays for up to 90 nights in a calendar year without planning permission. Plenty of operators quietly ignore that. We plan around it.</p>
      <ul class="checklist">
        <li>{icon('calendar')}<div><strong>90 nights, counted</strong><span>Short-stay nights are tracked per property, per calendar year, and stop at the limit.</span></div></li>
        <li>{icon('briefcase')}<div><strong>Mid-term stays fill the rest</strong><span>Furnished stays of a month or more for corporate, relocation and insurance guests.</span></div></li>
        <li>{icon('file')}<div><strong>We read your lease first</strong><span>Before anything is signed, we check your lease and tell you what lender, freeholder and insurer consents you need.</span></div></li>
        <li>{icon('scale')}<div><strong>We say no when it's no</strong><span>If a property can't be run properly, we'll tell you, even if it costs us the business.</span></div></li>
      </ul>
      <p class="small muted">General information, not legal advice.</p>
    </div>
    <div class="reveal">
      <div class="card card--white">
        <span class="eyebrow">A year, planned</span>
        <h3>How a managed year typically looks</h3>
        <div class="bars" style="margin-top:20px">
          <div class="bar"><div class="bar-row"><span>Short stays (nights)</span><strong>up to 90</strong></div><div class="bar-track" style="background:var(--green-50)"><div class="bar-fill" style="width:25%;background:var(--clay)"></div></div></div>
          <div class="bar"><div class="bar-row"><span>Mid-term stays (nights)</span><strong>the rest</strong></div><div class="bar-track" style="background:var(--green-50)"><div class="bar-fill" style="width:68%;background:var(--green)"></div></div></div>
          <div class="bar"><div class="bar-row"><span>Your own use</span><strong>blocked in advance</strong></div><div class="bar-track" style="background:var(--green-50)"><div class="bar-fill" style="width:7%;background:var(--sand)"></div></div></div>
        </div>
        <p class="muted small">Illustrative. Your plan depends on your property, lease and planning position.</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    {section_head("Honest comparison", "Long let, managed or guaranteed? <em>Here's the trade-off.</em>", "We'd rather you choose with the full picture than be surprised later.")}
    <div class="table-scroll"><table class="compare">
      <thead><tr><th></th><th>Traditional long let</th><th class="us">Seeker fully managed</th><th class="us">Seeker guaranteed rent</th></tr></thead>
      <tbody>
        <tr><td>Income</td><td>Fixed rent, rises once a year by notice and can be challenged at tribunal</td><td class="us">Variable, typically higher. Priced daily</td><td class="us">Fixed, agreed up front</td></tr>
        <tr><td>Empty periods</td><td>Your loss</td><td class="us">Shared: we only earn when you do</td><td class="us">Our risk, not yours</td></tr>
        <tr><td>Arrears</td><td>Your risk</td><td class="us">Guests pay before they arrive</td><td class="us">None</td></tr>
        <tr><td>Getting the home back</td><td>Section 8 grounds and notice periods since May 2026</td><td class="us">Guests leave at check-out</td><td class="us">At the end of the agreed term</td></tr>
        <tr><td>Condition</td><td>Inspected occasionally</td><td class="us">Cleaned and checked after every stay</td><td class="us">Cleaned and checked by us</td></tr>
        <tr><td>Running costs</td><td>Paid by the tenant</td><td class="us">Paid by you, from higher income</td><td class="us">Paid by us</td></tr>
        <tr><td>Your own use</td><td>No</td><td class="us">Yes, block your dates</td><td class="us">No, during the term</td></tr>
      </tbody>
    </table></div>
    <p class="small muted" style="margin-top:14px">General information, not legal or tax advice.</p>
  </div>
</section>

<section class="section section--white">
  <div class="wrap">
    {section_head("How it works", "From first call <em>to first payout.</em>")}
    {owner_steps()}
  </div>
</section>

<section class="section">
  <div class="wrap">
    {section_head("Who we work with", "Built for owners <em>who want it done properly.</em>")}
    <div class="grid grid-3">
      <div class="card reveal"><h3>Landlords leaving the long-let market</h3><p class="muted">The Renters' Rights Act changed the maths. Keep the asset and change the model.</p></div>
      <div class="card reveal"><h3>Owners abroad or too busy</h3><p class="muted">A London home that earns while you're elsewhere, with one clear statement each month.</p></div>
      <div class="card reveal"><h3>Self-managing Airbnb hosts</h3><p class="muted">Get your evenings back. Better pricing, better reviews, the 90 nights tracked properly.</p></div>
      <div class="card reveal"><h3>Homes between sales or tenants</h3><p class="muted">Turn an empty home into income while you decide what's next.</p></div>
      <div class="card reveal"><h3>Developers &amp; new builds</h3><p class="muted">Furnished, photographed and earning from completion.</p></div>
      <div class="card reveal"><h3>Accidental landlords</h3><p class="muted">Inherited or kept a flat? We'll explain your options in plain English.</p></div>
    </div>
  </div>
</section>

<section class="section section--sand">
  <div class="wrap">
    {section_head("Landlord questions", "What owners <em>ask us first.</em>")}
    {faq_block(FAQ_OWNER)}
  </div>
</section>

{cta_band(ctx, "owner")}
"""
    schema = [
        {"@context": "https://schema.org", "@type": "Service", "name": "Serviced accommodation & property management in London",
         "serviceType": "Short-let and mid-term property management", "provider": {"@id": C.SITE_URL + "/#org"},
         "areaServed": {"@type": "City", "name": "London"},
         "offers": [
             {"@type": "Offer", "name": "Fully managed", "description": f"{P['managed_fee']}% of booking revenue + VAT"},
             {"@type": "Offer", "name": "Mid-term lets", "description": f"{P['midterm_fee']}% of rent + VAT"},
             {"@type": "Offer", "name": "Guaranteed rent", "description": "Fixed monthly rent, no management fee"}]},
        faq_schema(FAQ_OWNER), crumbs_schema(ctx, [("", "Home"), ("landlords/", "For landlords")])]
    return ctx.path, page(ctx, audience="owner",
        title="Property Management London | Short Let & Guaranteed Rent | Seeker Estates",
        description=f"London serviced accommodation management from {P['managed_fee']}% + VAT, or guaranteed rent. Built around the 90-night rule. Free appraisal and instant earnings estimate.",
        body=body, schema=schema)


# ------------------------------------------------------------------ PRICING
def pricing():
    ctx = Ctx("pricing/")
    who = [
        ("Turnover cleaning & linen", "Guest (cleaning fee)", "Guest / included", "Us"),
        ("Platform & payment fees", "Deducted from bookings", "Deducted from rent", "Us"),
        ("Utilities, Wi-Fi, council tax", "Owner", "Owner", "Us"),
        ("Consumables & restocking", "Owner, at cost", "Owner, at cost", "Us"),
        ("Small repairs", "Owner, at cost, with receipts", "Owner, at cost, with receipts", "Us, up to an agreed limit"),
        ("Larger repairs & replacements", "Owner, agreed first", "Owner, agreed first", "Owner, agreed first"),
        ("Furnishing to standard", "Owner (we advise)", "Owner (we advise)", "Owner (we advise)"),
        ("Buildings & landlord insurance", "Owner", "Owner", "Owner"),
    ]
    trs = "".join(f'<tr><td>{a}</td><td class="us">{b}</td><td>{c}</td><td>{d}</td></tr>' for a, b, c, d in who)
    faq = FAQ_OWNER[2:4] + [
        ("Is there a minimum term?", f"The initial agreement is {P['min_term']}, then {P['notice']} notice either side. Guaranteed rent terms run from 1 to 5 years."),
        ("When do I get paid?", "Monthly, with a statement showing every booking, our fee and any costs. Guaranteed rent is paid on the same date every month."),
        ("Are there hidden fees?", "No. Our fee, VAT, and costs at cost with receipts. Nothing else."),
    ]
    body = f"""
<section class="page-hero">
  <div class="wrap">
    {crumbs(ctx, [("", "Home"), ("landlords/", "For landlords"), ("pricing/", "Pricing")])}
    <span class="eyebrow">Pricing</span>
    <h1>Simple fees. <em>Nothing in the small print.</em></h1>
    <p class="lead">One percentage, VAT shown, costs passed on at cost with receipts. Or no fee at all with guaranteed rent.</p>
  </div>
</section>
<section class="section--tight" style="padding-top:0">
  <div class="wrap">{plans_html(ctx)}</div>
</section>
<section class="section">
  <div class="wrap">
    {section_head("Who pays what", "Every cost, <em>accounted for.</em>")}
    <div class="table-scroll"><table class="compare">
      <thead><tr><th>Cost</th><th class="us">Fully managed</th><th>Mid-term lets</th><th>Guaranteed rent</th></tr></thead>
      <tbody>{trs}</tbody></table></div>
  </div>
</section>
<section class="section section--white">
  <div class="wrap split">
    <div class="reveal">
      <span class="eyebrow">Not sure which plan?</span>
      <h2>See the numbers <em>for your home.</em></h2>
      <p class="lead">The calculator compares the fully managed plan with a typical long let for your postcode and bedrooms, after fees and costs.</p>
      <a class="btn btn--clay" href="{ctx.url('revenue-calculator/')}">Open the calculator {icon('arrow')}</a>
    </div>
    <div class="reveal">{faq_block(faq)}</div>
  </div>
</section>
{cta_band(ctx, "owner")}
"""
    schema = [faq_schema(faq), crumbs_schema(ctx, [("", "Home"), ("landlords/", "For landlords"), ("pricing/", "Pricing")])]
    return ctx.path, page(ctx, audience="owner",
        title="Airbnb & Serviced Accommodation Management Fees London | Seeker Estates",
        description=f"Transparent London property management pricing: fully managed {P['managed_fee']}% + VAT, mid-term {P['midterm_fee']}% + VAT, or guaranteed rent with no fee. {P['setup_fee']} set-up.",
        body=body, schema=schema)


# ------------------------------------------------------------------ CALCULATOR
def calculator():
    ctx = Ctx("revenue-calculator/")
    K = C.CALC
    beds = "".join(
        f'<input type="radio" name="beds" id="b{k}" value="{k}"{" checked" if k == "2" else ""}><label for="b{k}">{v["label"].replace(" beds", "").replace(" bed", "")}</label>'
        for k, v in K["beds"].items())
    bands = "".join(f'<option value="{k}"{" selected" if k == "inner" else ""}>{v["label"]}</option>' for k, v in K["bands"].items())
    faq = [
        ("How accurate is the estimate?", "It's a range built from typical London rents and nightly rates, adjusted for your area and size. Finish, floor, views, outdoor space and the exact street all move the number, which is why we follow up with a free appraisal using real comparables."),
        ("Why not 365 nights of short stays?", "Because in Greater London that isn't allowed without planning permission. Short stays are limited to 90 nights per calendar year. The estimate assumes short stays up to that limit and furnished mid-term stays for the rest of the year."),
        ("Does the estimate include tax?", "No. Figures are before income tax. Since April 2025 furnished holiday lettings no longer have a special tax regime, so speak to your accountant about your own position."),
        ("What about guaranteed rent?", "Guaranteed rent is a fixed figure we agree per property. It's usually lower than the managed estimate, because we take on the risk of empty nights and the running costs. Ask for an offer and we'll show you both."),
    ]
    body = f"""
<section class="page-hero">
  <div class="wrap">
    {crumbs(ctx, [("", "Home"), ("landlords/", "For landlords"), ("revenue-calculator/", "Earnings calculator")])}
    <span class="eyebrow">Earnings calculator</span>
    <h1>How much could your London property <em>earn?</em></h1>
    <p class="lead">An instant estimate for your postcode and size, after our fee and running costs, next to a typical long let. No email needed.</p>
  </div>
</section>

<section class="section--tight" id="calculator" style="padding-top:0">
  <div class="wrap">
    <div class="calc" data-calculator>
      <div class="calc-in">
        <h2 class="visually-hidden">Your property</h2>
        <label class="field"><span>Postcode</span><input class="input" id="calc-postcode" placeholder="e.g. E14 8NT" autocomplete="postal-code"><span class="band-hint" id="calc-band-hint" aria-live="polite"></span></label>
        <fieldset class="seg"><legend class="field"><span>Bedrooms</span></legend>{beds}</fieldset>
        <label class="field"><span>Area</span><select class="select input" id="calc-band">{bands}</select><small>Set automatically from your postcode. Change it if your street is better or worse than average.</small></label>
        <label class="field"><span>Current or expected monthly rent (optional)</span><input class="input" id="calc-rent" type="number" inputmode="numeric" min="0" step="50" placeholder="e.g. 2400"><small>For a more personal comparison. Leave blank and we'll use typical rents for your area.</small></label>
      </div>
      <div class="calc-out" aria-live="polite">
        <span class="label">Estimated net to you, fully managed</span>
        <div class="calc-big"><span data-out="range">—</span> <small>/ month</small></div>
        <p class="calc-sub"><span data-out="annual">—</span> a year after our fee and running costs. <span data-out="diff"></span></p>
        <div class="bars">
          <div class="bar"><div class="bar-row"><span>Seeker fully managed</span><strong data-out="ours">—</strong></div><div class="bar-track"><div class="bar-fill" data-bar="ours"></div></div></div>
          <div class="bar"><div class="bar-row"><span>Typical long let, after voids &amp; agency fee</span><strong data-out="long">—</strong></div><div class="bar-track"><div class="bar-fill bar-fill--muted" data-bar="long"></div></div></div>
        </div>
        <table class="breakdown"><tbody>
          <tr><td>Estimated booking revenue (a year)</td><td data-out="gross">—</td></tr>
          <tr><td>Seeker fee ({P['managed_fee']}% + VAT)</td><td data-out="fee">—</td></tr>
          <tr><td>Platform &amp; payment fees</td><td data-out="platform">—</td></tr>
          <tr><td>Utilities, Wi-Fi, council tax, consumables</td><td data-out="running">—</td></tr>
          <tr class="total"><td>Net to you (a year, mid-point)</td><td data-out="net">—</td></tr>
        </tbody></table>
        <details><summary>How we estimate this</summary>
          <p>Short stays up to {K['shortCap']} nights a year (we assume {K['shortNights'][0]}–{K['shortNights'][1]} nights sold), furnished mid-term stays for the rest of the year at {int(K['midPremium'][0] * 100 - 100)}–{int(K['midPremium'][1] * 100 - 100)}% above an unfurnished long-let rent with {int(K['midOcc'][0] * 100)}–{int(K['midOcc'][1] * 100)}% occupancy. Cleaning is paid by guests and excluded. The long let assumes a {int(K['longVoid'] * 100)}% void allowance and a 12% + VAT agency fee. Figures are before tax and are estimates, not a guarantee of income.</p>
        </details>
        <span data-calc-summary hidden></span>
        <a class="btn btn--clay" href="#enquire">Get my exact figure, free</a>
      </div>
    </div>
  </div>
</section>

<section class="section" id="enquire">
  <div class="wrap split">
    <div class="reveal">
      <span class="eyebrow">Free appraisal</span>
      <h2>Turn the estimate into <em>a real number.</em></h2>
      <p class="lead">We'll look at your actual home, read your lease and price it against real comparables nearby. You'll get the managed figure and a guaranteed-rent offer side by side.</p>
      <ul class="checklist">
        <li>{icon('check')}<div><strong>No obligation</strong><span>An appraisal, not a sales call.</span></div></li>
        <li>{icon('check')}<div><strong>Within one working day</strong><span>We'll reply to arrange a visit or video call.</span></div></li>
        <li>{icon('check')}<div><strong>Honest</strong><span>If a long let is better for your home, we'll tell you.</span></div></li>
      </ul>
    </div>
    <div class="card reveal">{lead_form(ctx)}</div>
  </div>
</section>

<section class="section section--sand">
  <div class="wrap">
    {section_head("About the estimate", "Read this <em>before you trust any number.</em>")}
    {faq_block(faq)}
  </div>
</section>
"""
    schema = [
        {"@context": "https://schema.org", "@type": "WebApplication", "name": "London property earnings calculator",
         "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "url": ctx.abs(),
         "offers": {"@type": "Offer", "price": "0", "priceCurrency": "GBP"}, "provider": {"@id": C.SITE_URL + "/#org"}},
        faq_schema(faq), crumbs_schema(ctx, [("", "Home"), ("landlords/", "For landlords"), ("revenue-calculator/", "Earnings calculator")])]
    return ctx.path, page(ctx, audience="owner", scripts=("calculator.js",),
        title="Airbnb & Short Let Income Calculator London (Free) | Seeker Estates",
        description="How much could your London property earn as a serviced apartment? Free instant estimate by postcode and bedrooms, after fees and costs, compared with a long let.",
        body=body, schema=schema)


# ------------------------------------------------------------------ AREAS
def areas_index():
    ctx = Ctx("areas/")
    body = f"""
<section class="page-hero">
  <div class="wrap">
    {crumbs(ctx, [("", "Home"), ("areas/", "Areas")])}
    <span class="eyebrow">Where we host</span>
    <h1>Serviced apartments <em>across London.</em></h1>
    <p class="lead">Homes near the stations, stadiums, venues and parks people come to London for. Pick an area to see what's nearby, then check dates.</p>
  </div>
</section>
<section class="section--tight" style="padding-top:0"><div class="wrap">{areas_grid(ctx, cols=3)}</div></section>
{cta_band(ctx)}
"""
    schema = [crumbs_schema(ctx, [("", "Home"), ("areas/", "Areas")]),
              {"@context": "https://schema.org", "@type": "ItemList", "itemListElement": [
                  {"@type": "ListItem", "position": i + 1, "url": ctx.abs("areas/" + a["slug"] + "/"), "name": a["name"]}
                  for i, a in enumerate(C.AREAS)]}]
    return ctx.path, page(ctx, title="Serviced Apartments by Area: London | Seeker Estates",
        description="Serviced apartments in Canary Wharf, Marylebone, St John's Wood, Camden, Islington, Greenwich, Notting Hill, West London and near the Studio Tour. Book direct.",
        body=body, schema=schema)


def area_page(a):
    ctx = Ctx(f"areas/{a['slug']}/")
    venues = "".join(f'<li>{icon("pin")}<div><strong>{E(n)}</strong><span>{E(d)}</span></div></li>' for n, d in a["near"])
    faq = [
        (f"Where are your apartments in {a['name']}?",
         f"In and around {a['short']} ({a['postcode']}). The exact address is shared with your booking confirmation."),
        (f"How do I get around from {a['name']}?", f"Nearest stations and lines: {a['lines']}."),
        ("Is it cheaper to book direct?", f"Yes. Our direct rate is {F['direct_discount']} below the price on Airbnb and Booking.com for the same home."),
    ]
    others = [o for o in C.AREAS if o["slug"] != a["slug"]][:4]
    other_cards = "".join(
        f'<a class="area reveal" href="{ctx.url("areas/" + o["slug"] + "/")}">{area_art(o)}<h3>{E(o["name"])}</h3><span>{E(o["postcode"])}</span></a>' for o in others)
    title_name = a["name"] if a["slug"] != "harry-potter-studio-tour" else "Kings Langley, near the Warner Bros. Studio Tour"
    body = f"""
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      {crumbs(ctx, [("", "Home"), ("areas/", "Areas"), (ctx.path, a["name"])])}
      <span class="eyebrow">{E(a['postcode'])} · {E(a['short'])}</span>
      <h1>Serviced apartments in <em>{E(title_name)}.</em></h1>
      <p class="lead">{E(a['pitch'])}</p>
      {bookbar()}
    </div>
    <div class="hero-art">
      <div class="arch" style="position:relative">{area_art(a, 400, 500)}</div>
      <div class="float-card float-card--a"><span class="dot">{icon('train')}</span><span><strong>Getting around</strong>{E(a['lines'].split(',')[0].split('(')[0].strip())}</span></div>
    </div>
  </div>
</section>

<section class="section section--white">
  <div class="wrap split">
    <div class="reveal">
      <span class="eyebrow">What's nearby</span>
      <h2>Why stay in <em>{E(a['name'])}.</em></h2>
      <p class="lead">Popular with: {E(a['who'])}</p>
      <p><strong>Our homes here:</strong> {E(a['homes'])}</p>
      <a class="btn btn--clay" {BOOK}>Check availability {icon('arrow')}</a>
    </div>
    <ul class="venues reveal">{venues}</ul>
  </div>
</section>

<section class="section">
  <div class="wrap">
    {section_head("In every home", "Everything you need, <em>nothing you don't.</em>")}
    {amenity_cards()}
  </div>
</section>

<section class="section section--sand">
  <div class="wrap split">
    <div class="reveal">{section_head("Questions", f"Staying in <em>{E(a['name'])}.</em>")}{faq_block(faq)}</div>
    <div class="card card--green reveal">
      <span class="eyebrow" style="color:#F0A483">For property owners</span>
      <h3>Own a property in {E(a['postcode'])}?</h3>
      <p class="muted">See what it could earn as a professionally managed serviced apartment, after fees and costs.</p>
      <a class="btn btn--clay" href="{ctx.url('revenue-calculator/')}?postcode={a['postcode']}#calculator">Estimate my earnings {icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    {section_head("More areas", "Elsewhere <em>in London.</em>")}
    <div class="areas">{other_cards}</div>
  </div>
</section>

{cta_band(ctx, title=f"Your {E(a['name'])} stay starts here.")}
"""
    schema = [faq_schema(faq), crumbs_schema(ctx, [("", "Home"), ("areas/", "Areas"), (ctx.path, a["name"])]),
              {"@context": "https://schema.org", "@type": "LodgingBusiness", "name": f"{C.BRAND} — {a['name']}",
               "url": ctx.abs(), "image": C.SITE_URL + "/assets/img/og.png", "priceRange": "££",
               "address": {"@type": "PostalAddress", "addressLocality": "London" if a["postcode"] != "WD4" else "Kings Langley",
                           "postalCode": a["postcode"], "addressCountry": "GB"},
               "parentOrganization": {"@id": C.SITE_URL + "/#org"}}]
    if a["slug"] == "harry-potter-studio-tour":
        title = "Apartment Near Warner Bros. Studio Tour London, with Parking | Seeker Estates"
        desc = "Modern two-bedroom apartment in Kings Langley, around 10 minutes from the Warner Bros. Studio Tour London. Sleeps 6, parking included. Book direct and save 10%."
    else:
        title = f"Serviced Apartments {a['name']}, London ({a['postcode']}) | Seeker Estates"
        desc = f"Serviced apartments in {a['short']}: whole homes with kitchen, Wi-Fi and self check-in, near {a['near'][0][0]}. Book direct and save {F['direct_discount']}."
    return ctx.path, page(ctx, title=title, description=desc, body=body, schema=schema)


# ------------------------------------------------------------------ ABOUT
def about():
    ctx = Ctx("about/")
    body = f"""
<section class="page-hero">
  <div class="wrap">
    {crumbs(ctx, [("", "Home"), ("about/", "About")])}
    <span class="eyebrow">About {C.BRAND}</span>
    <h1>A London operator, <em>run like a hotel.</em></h1>
    <p class="lead">We manage {F['homes']} homes across London, from a one-bedroom flat in Greenwich to a five-bedroom house in St John's Wood. Guests get a real home with hotel standards. Owners get income, and a team that does the work properly.</p>
  </div>
</section>
{stats_band(light=True)}
<section class="section">
  <div class="wrap split">
    <div class="reveal">
      <span class="eyebrow">What we stand for</span>
      <h2>Professional. Premium. <em>Reliable.</em></h2>
      <p class="lead">Three words we hold ourselves to with every guest message, every turnover and every owner statement.</p>
    </div>
    <ul class="checklist reveal">
      <li>{icon('check')}<div><strong>Professional</strong><span>Clear agreements, clear statements, clear answers. A business, not a side project.</span></div></li>
      <li>{icon('check')}<div><strong>Premium</strong><span>Homes cleaned and checked to hotel standard after every stay, with a {F['booking_score']} guest score on Booking.com to show for it.</span></div></li>
      <li>{icon('check')}<div><strong>Reliable</strong><span>{F['occupancy']} average occupancy and an average stay of {F['avg_stay']}. Guests come back, owners stay.</span></div></li>
    </ul>
  </div>
</section>
<section class="section section--green">
  <div class="wrap">
    {section_head("Our promises", "What we will <em>never</em> do.")}
    <div class="grid grid-3">
      <div class="card reveal"><h3>Promise numbers we can't hit</h3><p class="muted">No "triple your rent". Our estimates show the costs, the rules and the range.</p></div>
      <div class="card reveal"><h3>Take a home we can't run legally</h3><p class="muted">We read the lease, plan around the 90-night rule and say no when the answer is no.</p></div>
      <div class="card reveal"><h3>Hide a fee</h3><p class="muted">One percentage, VAT shown, costs at cost with receipts.</p></div>
    </div>
  </div>
</section>
{cta_band(ctx)}
"""
    return ctx.path, page(ctx, title="About Seeker Estates | London Serviced Apartments & Property Management",
        description=f"Seeker Estates manages {F['homes']} serviced homes across London for guests and landlords. Professional, premium, reliable, and honest about the numbers.",
        body=body, schema=[org_schema(), crumbs_schema(ctx, [("", "Home"), ("about/", "About")])])


# ------------------------------------------------------------------ FAQ
def faq_page():
    ctx = Ctx("faq/")
    body = f"""
<section class="page-hero">
  <div class="wrap">
    {crumbs(ctx, [("", "Home"), ("faq/", "FAQ")])}
    <span class="eyebrow">FAQ</span>
    <h1>Questions, <em>answered.</em></h1>
    <p class="lead">Can't find what you need? <a href="{ctx.url('contact/')}">Ask us</a>. We reply within one working day.</p>
  </div>
</section>
<section class="section--tight" style="padding-top:0"><div class="wrap"><h2>For guests</h2>{faq_block(FAQ_GUEST + FAQ_MID[:2])}</div></section>
<section class="section"><div class="wrap"><h2>For landlords</h2>{faq_block(FAQ_OWNER)}</div></section>
{cta_band(ctx)}
"""
    return ctx.path, page(ctx, title="FAQ: Booking, Stays & Property Management | Seeker Estates",
        description="Answers about booking direct, check-in, deposits and longer stays, plus fees, the 90-night rule and how our property management works.",
        body=body, schema=[faq_schema(FAQ_GUEST + FAQ_MID[:2] + FAQ_OWNER), crumbs_schema(ctx, [("", "Home"), ("faq/", "FAQ")])])


# ------------------------------------------------------------------ CONTACT
def contact():
    ctx = Ctx("contact/")
    phone = f'<li>{icon("phone")}<div><strong>Phone</strong><span><a href="tel:{C.PHONE.replace(" ", "")}">{E(C.PHONE)}</a></span></div></li>' if C.PHONE else ""
    wa = f'<li>{icon("chat")}<div><strong>WhatsApp</strong><span><a href="https://wa.me/{C.WHATSAPP}">Message us</a></span></div></li>' if C.WHATSAPP else ""
    body = f"""
<section class="page-hero">
  <div class="wrap split" style="align-items:start">
    <div>
      {crumbs(ctx, [("", "Home"), ("contact/", "Contact")])}
      <span class="eyebrow">Contact</span>
      <h1>Talk to <em>the team.</em></h1>
      <p class="lead">Questions about a stay, a monthly quote for your company, or a property you'd like us to manage. We reply within one working day.</p>
      <ul class="checklist">
        <li>{icon('mail')}<div><strong>Email</strong><span>{" · ".join(f'<a href="mailto:{e}">{e}</a>' for e in C.EMAILS)}</span></div></li>
        {phone}{wa}
        <li>{icon('calendar')}<div><strong>Ready to book?</strong><span><a {BOOK}>Check availability and book direct</a></span></div></li>
        <li>{icon('home')}<div><strong>Own a property?</strong><span><a href="{ctx.url('landlords/')}#enquire">Request a free appraisal</a></span></div></li>
      </ul>
    </div>
    <div class="card">{lead_form(ctx, kind="contact", title="Send us a message", button="Send message")}</div>
  </div>
</section>
"""
    return ctx.path, page(ctx, title="Contact Seeker Estates | London Serviced Apartments",
        description="Contact Seeker Estates about a stay, a corporate or monthly booking, or property management in London. We reply within one working day.",
        body=body, schema=[crumbs_schema(ctx, [("", "Home"), ("contact/", "Contact")])])


# ------------------------------------------------------------------ PRIVACY
def privacy():
    ctx = Ctx("privacy/")
    body = f"""
<section class="page-hero"><div class="wrap prose">
  {crumbs(ctx, [("", "Home"), ("privacy/", "Privacy & cookies")])}
  <h1>Privacy &amp; cookies</h1>
  <p class="note">Template: have this reviewed before launch and add your company details.</p>
  <p>This notice explains how {C.BRAND} ("we") uses personal data collected through this website, under the UK GDPR and the Data Protection Act 2018.</p>
  <h2>What we collect</h2>
  <ul><li>Details you send us through our forms: name, email, phone, property postcode and your message.</li>
  <li>Booking details, which are processed by our booking partner when you book through our booking pages.</li>
  <li>If you accept cookies: analytics and advertising data (pages visited, device, approximate location, ad clicks) via Google Analytics and Google Ads.</li></ul>
  <h2>Why we use it</h2>
  <ul><li>To reply to your enquiry and provide an appraisal or quote (our legitimate interests, or steps before a contract).</li>
  <li>To manage your stay or management agreement (contract).</li>
  <li>To measure and improve our website and advertising (your consent, which you can withdraw at any time).</li></ul>
  <h2>Cookies</h2>
  <p>We only set analytics and advertising cookies after you click "Accept". To change your choice, clear this site's data in your browser and you'll be asked again.</p>
  <h2>How long we keep it</h2>
  <p>Enquiries that don't lead to a booking or agreement are deleted after 24 months. Booking and contract records are kept as long as the law requires.</p>
  <h2>Your rights</h2>
  <p>You can ask for a copy of your data, ask us to correct or delete it, or object to how we use it. Email <a href="mailto:{C.EMAIL}">{C.EMAIL}</a>. You can also complain to the Information Commissioner's Office (ico.org.uk).</p>
</div></section>
"""
    return ctx.path, page(ctx, title="Privacy & Cookies | Seeker Estates",
        description="How Seeker Estates uses personal data and cookies on this website.", body=body)


def not_found():
    ctx = Ctx("")
    ctx.absolute = True
    body = f"""
<section class="section"><div class="wrap" style="text-align:center;max-width:640px">
  <span class="eyebrow">404</span>
  <h1>This door <em>doesn't open.</em></h1>
  <p class="lead" style="margin:0 auto 28px">The page you're looking for has moved or never existed.</p>
  <div class="hero-actions" style="justify-content:center"><a class="btn" href="{ctx.url('')}">Home</a><a class="btn btn--ghost" href="{ctx.url('landlords/')}">For landlords</a></div>
</div></section>"""
    return "404.html", page(ctx, title="Page not found | Seeker Estates", description="Page not found.", body=body, noindex=True)


def all_pages():
    out = [home(), book(), stays(), mid_term(), landlords(), pricing(), calculator(), areas_index(), about(), faq_page(),
           contact(), privacy(), not_found()]
    out += [area_page(a) for a in C.AREAS]
    return out
