const fs=require('fs');
const {Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,WidthType,ShadingType,AlignmentType,HeadingLevel,BorderStyle,PageBreak,Header,Footer,PageNumber}=require('docx');
const NAVY="1F3A5F",BRASS="8F6119",GREY="666666",F="Arial";
const r=(t,o={})=>new TextRun({text:t,font:F,...o}); const b=(t,o={})=>new TextRun({text:t,font:F,bold:true,...o});
const P=(ch,o={})=>new Paragraph({children:Array.isArray(ch)?ch:[r(ch)],spacing:{after:110},...o});
const H1=t=>new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun({text:t,font:F,bold:true,color:NAVY,size:28})],spacing:{before:300,after:120}});
const lab=t=>new Paragraph({children:[new TextRun({text:t.toUpperCase(),font:F,bold:true,size:16,color:BRASS,characterSpacing:40})],spacing:{before:200,after:60}});
const bord={style:BorderStyle.SINGLE,size:4,color:"C8C2B6"}; const B={top:bord,bottom:bord,left:bord,right:bord};
const cell=(t,w,o={})=>new TableCell({width:{size:w,type:WidthType.DXA},borders:B,shading:o.head?{type:ShadingType.CLEAR,fill:NAVY,color:NAVY}:(o.fill?{type:ShadingType.CLEAR,fill:o.fill,color:o.fill}:undefined),margins:{top:60,bottom:60,left:90,right:90},
  children:(Array.isArray(t)?t:[t]).map(x=>new Paragraph({children:[new TextRun({text:x,font:F,size:17,bold:!!o.head,color:o.head?"FFFFFF":"222222"})]}))});
const meta=(rows)=>new Table({width:{size:9700,type:WidthType.DXA},columnWidths:[2200,7500],rows:rows.map(([k,v])=>new TableRow({children:[cell(k,2200,{fill:"F2EEE7"}),cell(v,7500)]}))});
const shots=(rows)=>new Table({width:{size:9700,type:WidthType.DXA},columnWidths:[700,1400,4000,3600],rows:[
  new TableRow({tableHeader:true,children:["#","Seconds","What's on screen (footage)","On-screen text"].map((h,i)=>cell(h,[700,1400,4000,3600][i],{head:true}))}),
  ...rows.map(row=>new TableRow({children:row.map((c,i)=>cell(c,[700,1400,4000,3600][i]))}))]});
const need=t=>new Paragraph({children:[b("Needs from you: ",{color:BRASS}),r(t)],shading:{type:ShadingType.CLEAR,fill:"FFF9DB",color:"FFF9DB"},spacing:{before:120,after:160}});
const cap=lines=>lines.map(l=>new Paragraph({children:[new TextRun({text:l,font:F,size:19,color:"333333"})],spacing:{after:l===""?60:40},indent:{left:300}}));
const PB=()=>new Paragraph({children:[new PageBreak()]});
const link="https://seekerestates.myweb.smoobu.com";
const utm=(n,c)=>`${link}?utm_source=${n}&utm_medium=social&utm_campaign=2026-09-${c}`;

const doc=new Document({styles:{default:{document:{run:{font:F,size:21}}}},sections:[{
  properties:{page:{margin:{top:1000,bottom:900,left:1100,right:1100}}},
  headers:{default:new Header({children:[new Paragraph({children:[new TextRun({text:"SEEKER ESTATES  ·  Week 1 approval pack  ·  11–19 September 2026",font:F,size:16,color:GREY})]})]})},
  footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.RIGHT,children:[new TextRun({text:"Page ",font:F,size:16,color:GREY}),new TextRun({children:[PageNumber.CURRENT],font:F,size:16,color:GREY})]})]})},
  children:[
    new Paragraph({children:[new TextRun({text:"Week 1 — the approval pack",font:F,bold:true,size:40,color:NAVY})],spacing:{after:80}}),
    P([r("Six posts. For each: approve, kill, or reply with the change. Media you need to send is in the yellow line. Everything else is ready or will be produced by the studio once your files arrive.",{color:GREY})]),
    P([b("Publishing mode: "),r("Instagram stays a personal account, so Instagram and TikTok posts are scheduled in Metricool with auto-publish OFF — you get a push notification on the Metricool app at the scheduled time and tap once to publish. Facebook publishes automatically.")]),
    P([b("Booking link everywhere: "),r(link+"  (the /reservation/ page on the website is empty; this is the Smoobu page it links to). Put it in the Instagram and TikTok bios today.")]),
    meta([["Fri 11 Sep","POST A · Bayeux Tapestry carousel — PRODUCED, in the zip. Ready to schedule."],["Sat 12 Sep","POST B · Launch reel — needs your flagship footage"],["Mon 14 Sep","POST 1 · London This Week — needs nothing from you (stock + title sting)"],["Tue 15 Sep","POST 2 · £230 in Canary Wharf: hotel vs flat — needs hotel screenshots + P01 photos"],["Wed 16 Sep","POST 3 · Section 21 is gone — needs nothing from you"],["Thu 17 Sep","POST 4 · The turnover — needs your turnover footage"],["Sat 19 Sep","POST 5 · Open House weekend — needs nothing from you"]]),

    PB(), H1("POST A · Fri 11 Sep · The Bayeux Tapestry — carousel (produced)"),
    meta([["Platforms","Instagram carousel · Facebook · TikTok photo mode"],["Format","6 slides, 1080×1350, typographic on the brand frame"],["Publish","Fri 11 Sep, 12:30 (lunchtime scroll; the story broke yesterday, so today is the last day it's news)"],["Files","Post_2026-09-11_Bayeux-Carousel.zip — slide-1 … slide-6, caption.txt, first-comment.txt"]]),
    lab("Caption"),...cap(["The Bayeux Tapestry is in London for the first time in 950 years.","","It opened at the British Museum yesterday and runs until 11 July 2027 — the biggest cultural loan the UK has received in a generation. Nearly seventy metres of embroidered linen telling the story of 1066.","","Ticketed and timed, so book ahead. Tottenham Court Road, Holborn and Russell Square are all under eight minutes on foot.","","Save this for when you book London.","","#BayeuxTapestry #BritishMuseum #LondonThisWeek #VisitLondon #ServicedApartmentsLondon"]),
    lab("First comment (the only place the link goes)"),...cap(["Staying in London for it? Our Marylebone, St John's Wood and Bayswater apartments are 15 minutes away. Book direct, 10% under the OTA rate: "+utm("instagram","bayeux")]),
    need("Nothing. Approve and it's scheduled. One check: confirm the exhibition's closing date (11 July 2027) on britishmuseum.org — it's from our research, not from the museum's page."),

    PB(), H1("POST B · Sat 12 Sep · Launch reel — \"Nineteen flats across London\""),
    meta([["Platforms","Instagram Reel · TikTok · Facebook Reel"],["Format","Vertical video, 22–25 s, no face, ambient sound + optional voiceover"],["Publish","Sat 12 Sep, 09:00. Pin it on all three."],["Hook (0–2 s)","Nineteen flats across London. This is what 7am looks like when you run them."]]),
    lab("Shot list"),shots([
      ["1","0–2","Black to the 21st-floor balcony view, Canary Wharf, early light","Nineteen flats across London."],
      ["2","2–4","Keys on a hook or in a hand; door opening","This is what 7am looks like"],
      ["3","4–7","Turnover in progress: stripping a bed, fast","when you run them."],
      ["4","7–10","Kettle, worktop, a made bed, tight shots","(no text — let it breathe)"],
      ["5","10–13","Tube platform or a street, movement","Canary Wharf · Marylebone · Greenwich · Camden"],
      ["6","13–17","A finished room, still, daylight","Short stays. Long stays. Nineteen addresses."],
      ["7","17–22","Wide of the flagship living room, slow push","Seeker Estates — Exceptional stays. Professionally managed."],
      ["8","22–25","Brand end card (navy, logo tile)","Follow for London, every Monday."]]),
    lab("Caption"),...cap(["Nineteen flats across London. This is what 7am looks like when you run them.","","We manage serviced apartments from Canary Wharf to Little Venice — for a weekend, a work placement, or three months between homes. Every guest ID-verified. Every turnover done properly. Every Monday we post what's actually on in London that week.","","Follow along.","","#LondonApartments #ServicedApartmentsLondon #StayInLondon #LondonLife #SeekerEstates"]),
    need("A Drive/Dropbox link to the flagship flat footage you've already shot, plus 3–4 clips of a turnover (you said that's done too). If you'd like a voiceover, record the caption's first two sentences as a voice memo in a quiet room — otherwise it runs text-only. Confirm the flagship is P01 Canary Wharf."),

    PB(), H1("POST 1 · Mon 14 Sep · London This Week — #1"),
    meta([["Platforms","Instagram Reel · TikTok · Facebook Reel"],["Format","Vertical video, ~30 s. Opens with the 2.5 s title sting (in the brand kit)."],["Publish","Mon 14 Sep, 07:30 (commute)"],["Hook","This is the busiest week in London until Christmas. Here's what's actually on."],["Dates verified","London Fashion Week SS27 Thu 17–Mon 21 Sep (British Fashion Council, confirmed) · London Design Festival 12–20 Sep (confirmed) · Open House London 12–26 Sep (confirmed)"]]),
    lab("Script"),shots([
      ["1","0–2.5","Title sting: LONDON THIS WEEK · Monday 14 September","—"],
      ["2","2.5–5","Stock/B-roll: a London street, movement","The busiest week until Christmas."],
      ["3","5–12","Stock: Fashion Week crowd or Strand/Soho street style","1 · London Fashion Week · Thu–Mon · Oxford Circus / Charing Cross · Public shows at Selfridges and M&S this year"],
      ["4","12–19","Stock: a design installation, King's Cross or Shoreditch","2 · London Design Festival · until Sunday · 11 districts, most of it free · Try King's Cross or Brompton"],
      ["5","19–26","Stock: a grand building interior","3 · Open House London · until 26 Sep · Buildings you can't normally enter, free · Most need no booking"],
      ["6","26–30","Brand end card","Every Monday. Follow so you don't miss one."]]),
    lab("Caption"),...cap(["This is the busiest week in London until Christmas. Here's what's actually on.","","London Fashion Week runs Thursday to Monday — and this year Selfridges and M&S are doing public shows, so you don't need an invite. London Design Festival is in its last week, spread across eleven districts and mostly free. Open House London runs until the 26th: buildings you can't normally walk into, open, free.","","Tube stops on screen. Save it for the week.","","#LondonThisWeek #LondonFashionWeek #LondonDesignFestival #OpenHouseLondon #ThingsToDoInLondon"]),
    need("Nothing. Produced from the title sting and licensed stock. If you happen to be near Oxford Circus or King's Cross this week, 20 seconds of phone footage of either would replace the stock and look better."),

    PB(), H1("POST 2 · Tue 15 Sep · £230 a night in Canary Wharf"),
    meta([["Platforms","Instagram carousel · Facebook · TikTok photo mode"],["Format","8 slides, 1080×1350. Alternating hotel / flat, same annotations."],["Publish","Tue 15 Sep, 12:30"],["Hook (slide 1)","£230 a night in Canary Wharf. A hotel room — or a 21st-floor two-bed with a balcony."]]),
    lab("Slides"),shots([
      ["1","cover","Navy frame, hook text","£230 a night in Canary Wharf…"],
      ["2","hotel","Hotel screenshot: room, price, date visible (hotel unnamed, blurred)","Hotel · £230 · one room · ~22 m²"],
      ["3","flat","P01 living room + balcony view","Seeker · £230 · two bedrooms · balcony · 21st floor"],
      ["4","hotel","Hotel screenshot: breakfast price","Breakfast for four · £68"],
      ["5","flat","P01 kitchen","Full kitchen · breakfast for four · whatever Tesco charges"],
      ["6","hotel","Hotel: laundry service price, if listed","Laundry · per item"],
      ["7","flat","P01 washing machine / second bedroom","Washing machine · second bedroom · a door between you and the kids"],
      ["8","end","Navy end card","Same money. Book direct, 10% under the OTA rate. Link in bio."]]),
    lab("Caption"),...cap(["£230 a night in Canary Wharf. A hotel room — or a 21st-floor two-bed with a balcony.","","Same postcode, same dates, same price. One gets you a room. The other gets you two bedrooms, a kitchen, a washing machine and a river view. Twelve minutes to ExCeL, nine to the O2.","","We're not saying hotels are wrong. We're saying look at what the same money buys.","","#CanaryWharf #LondonApartments #ServicedApartmentsLondon #ExCeLLondon #StayInLondon"]),
    need("Three screenshots of Canary Wharf hotels for a date in the next fortnight, price and date visible (we blur the names). The P01 photo set (or the Drive link). Confirm £230 is the base rate you're happy to show publicly."),

    PB(), H1("POST 3 · Wed 16 Sep · Landlord Day — Section 21 is gone"),
    meta([["Platforms","Instagram carousel · Facebook (no TikTok)"],["Format","7 slides, 1080×1350, typographic. Cover already designed in the brand kit sample."],["Publish","Wed 16 Sep, 08:00"],["Hook","Section 21 is gone. Here's what that means if you own a London flat."]]),
    lab("Slides"),shots([
      ["1","cover","Mist frame","Section 21 is gone. Here's what that means if you own a London flat."],
      ["2","","Renters' Rights Act 2025 — in force since 1 May 2026","No more no-fault evictions. Every tenancy is now periodic."],
      ["3","","Selling","To sell, you need Ground 1A: four months' notice, and you can't use it in the first twelve months."],
      ["4","","Arrears","The arrears threshold for a mandatory possession order moved from two months to three."],
      ["5","","Rent","One increase a year, by notice. Tenants can challenge it at tribunal."],
      ["6","","What it means","Getting a flat back is slower and less certain than it was. That changes how you think about voids, tenants and who manages it."],
      ["7","end","Navy end card","Save this. Send it to a landlord who hasn't read it. — General information, not legal advice."]]),
    lab("Caption"),...cap(["Section 21 is gone. Here's what that means if you own a London flat.","","The Renters' Rights Act 2025 has been in force since 1 May. No-fault evictions have ended, every tenancy is periodic, selling needs four months' notice, and the arrears threshold has moved to three months.","","None of this is a reason to panic. It is a reason to understand it. Save this and send it to a landlord who hasn't read it yet.","","General information, not legal advice.","","#LondonLandlord #RentersRightsAct #Section21 #UKLandlord #PropertyManagementLondon"]),
    need("Nothing. Every clause is checked against the Act before the slides are produced. No mention of Seeker's own licensing or memberships, as agreed."),

    PB(), H1("POST 4 · Thu 17 Sep · Proof — the turnover"),
    meta([["Platforms","Instagram Reel · TikTok · Facebook Reel"],["Format","Vertical video, ~20 s, fast cuts, real sound, no music"],["Publish","Thu 17 Sep, 18:30"],["Hook","Nobody photographs this part of a short-let. So we did."]]),
    lab("Script"),shots([
      ["1","0–2","Stripping a bed, fast","Nobody photographs this part."],
      ["2","2–6","Laundry bags out, linen count","So we did."],
      ["3","6–11","Under the sofa, behind the bathroom door, the kettle descaled","Every turnover. Every guest."],
      ["4","11–15","Restocking: towels, loo roll, coffee","ID-verified guests. Security deposit held. Public liability insured."],
      ["5","15–19","The finished room, one still wide shot","This happens between every single guest."],
      ["6","19–21","Brand end card","Seeker Estates"]]),
    lab("Caption"),...cap(["Nobody photographs this part of a short-let. So we did.","","This is what happens between every guest: full strip, full clean, linen counted out and counted back, everything restocked. Unglamorous, and the whole reason people come back.","","#ServicedApartmentsLondon #BehindTheScenes #LondonApartments #ShortLetLondon #SeekerEstates"]),
    need("The turnover footage you've shot — the Drive link. If the clips have music or talking over them, send the originals."),

    PB(), H1("POST 5 · Sat 19 Sep · Open House weekend"),
    meta([["Platforms","Instagram Reel · TikTok"],["Format","Vertical video, ~25 s, fast list with stock/press stills and tube stops"],["Publish","Sat 19 Sep, 08:00 — a Saturday post at 4pm has missed the plan"],["Hook","Open House weekend: eight London buildings you can walk into free, this weekend."]]),
    lab("Script"),shots([["1–8","2.5 s each","One building per beat, exterior still, name + nearest tube on screen","Eight buildings, verified open this weekend from openhouse.org.uk on Thursday"],["9","end","Brand end card","Send this to whoever you're going with."]]),
    lab("Caption"),...cap(["Open House weekend: eight London buildings you can walk into free, this weekend.","","No tickets, no queue at most of them. Tube stops on screen. Send it to whoever you're going with.","","#OpenHouseLondon #ThingsToDoInLondon #LondonThisWeekend #LondonArchitecture #FreeLondon"]),
    need("Nothing. The London desk pulls the eight from the Open House programme on Thursday, when the weekend's listings are final, and the studio produces it Friday."),
  ]}]});
Packer.toBuffer(doc).then(buf=>{fs.writeFileSync('/mnt/user-data/outputs/Week-1-Approval-Pack.docx',buf);console.log('ok',buf.length)});
