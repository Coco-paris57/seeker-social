const fs=require('fs');
const {Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,WidthType,ShadingType,AlignmentType,HeadingLevel,BorderStyle,LevelFormat,PageBreak,Header,Footer,PageNumber}=require('docx');

const NAVY="1F3A5F", BRASS="8F6119", GREY="666666", FILL="FFF9DB", HEAD="1F3A5F", LIGHT="F2EEE7";
const F="Arial";
const b=(t,o={})=>new TextRun({text:t,bold:true,font:F,...o});
const r=(t,o={})=>new TextRun({text:t,font:F,...o});
const P=(children,o={})=>new Paragraph({children:Array.isArray(children)?children:[r(children)],spacing:{after:120},...o});
const H1=t=>new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun({text:t,font:F,bold:true,color:NAVY,size:30})],spacing:{before:360,after:160}});
const H2=t=>new Paragraph({heading:HeadingLevel.HEADING_2,children:[new TextRun({text:t,font:F,bold:true,color:NAVY,size:24})],spacing:{before:240,after:100}});
const tag=(t,c)=>new TextRun({text:` ${t} `,font:F,bold:true,size:16,color:"FFFFFF",shading:{type:ShadingType.CLEAR,fill:c,color:c}});
const why=t=>new Paragraph({children:[new TextRun({text:"Why: ",font:F,bold:true,size:19,color:BRASS}),new TextRun({text:t,font:F,size:19,color:GREY})],spacing:{after:160}});
const bullet=t=>new Paragraph({numbering:{reference:"bul",level:0},children:[r(t)],spacing:{after:60}});

const bord={style:BorderStyle.SINGLE,size:4,color:"C8C2B6"};
const B={top:bord,bottom:bord,left:bord,right:bord};
function cell(text,w,opts={}){
  const {head=false,fill=null,bold=false,size=18}=opts;
  return new TableCell({width:{size:w,type:WidthType.DXA},borders:B,
    shading:head?{type:ShadingType.CLEAR,fill:HEAD,color:HEAD}:(fill?{type:ShadingType.CLEAR,fill,color:fill}:undefined),
    margins:{top:70,bottom:70,left:100,right:100},
    children:[new Paragraph({children:[new TextRun({text,font:F,size,bold:head||bold,color:head?"FFFFFF":"222222"})]})]});
}
function table(headers,widths,rows,fillCols=[]){
  const tw=widths.reduce((a,c)=>a+c,0);
  return new Table({width:{size:tw,type:WidthType.DXA},columnWidths:widths,rows:[
    new TableRow({tableHeader:true,children:headers.map((h,i)=>cell(h,widths[i],{head:true}))}),
    ...rows.map(row=>new TableRow({children:row.map((c,i)=>cell(c,widths[i],{fill:(fillCols.includes(i)&&c==="")?FILL:null,size:17}))}))
  ]});
}
const blank=n=>Array(n).fill("");
const gap=()=>new Paragraph({spacing:{after:160}});

const doc=new Document({
  styles:{default:{document:{run:{font:F,size:21}}}},
  numbering:{config:[{reference:"bul",levels:[{level:0,format:LevelFormat.BULLET,text:"•",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:480,hanging:240}}}}]}]},
  sections:[{
    properties:{page:{margin:{top:1100,bottom:1000,left:1100,right:1100}}},
    headers:{default:new Header({children:[new Paragraph({children:[new TextRun({text:"SEEKER ESTATES  ·  Information request for the content team",font:F,size:16,color:GREY})]})]})},
    footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.RIGHT,children:[new TextRun({text:"Page ",font:F,size:16,color:GREY}),new TextRun({children:[PageNumber.CURRENT],font:F,size:16,color:GREY})]})]})},
    children:[
      new Paragraph({children:[new TextRun({text:"What the content team needs from you",font:F,bold:true,size:44,color:NAVY})],spacing:{after:120}}),
      P([r("Prepared 10 September 2026. Ten sections. Yellow cells are yours to fill; everything else is context. Send it back by attaching it to the chat, with files attached alongside — photos, exports, PDFs, whatever you have. Half-finished is fine: send what you have now, the rest later.",{color:GREY})]),
      gap(),
      table(["Section","What","Priority","Unlocks"],[600,3600,1300,4200],[
        ["1","Accounts & access","BLOCKING","Everything. Nothing can be scheduled until this is done."],
        ["2","Brand basics","BLOCKING","Every visual. The Monday title card, all thumbnails."],
        ["3","The property list","BLOCKING","About 40 of the 68 posts — every location and venue post."],
        ["4","Pricing & hotel comparisons","Week 1","The honest comparison posts (15 Sep, 27 Oct)."],
        ["5","Reviews export","Week 1","The whole Thursday trust pillar — 12 posts."],
        ["6","Your real numbers","Week 2","The landlord economics posts, and honest pricing content."],
        ["7","The landlord offer","Week 2","All 13 Wednesday posts have to describe a real offer."],
        ["8","People & capacity","Week 1","Who shoots, who approves, who taps publish on TikTok."],
        ["9","Compliance facts","Week 2","So we never publish a claim about you that isn't true."],
        ["10","Week-one capture","Week 1","The first four shoots — already scheduled in the spreadsheet."],
      ]),
      new Paragraph({children:[new PageBreak()]}),

      // ---------- 1 ----------
      H1("1 · Accounts & access"),
      why("Metricool is connected to Claude, but the Seeker Estates brand inside Metricool has no social networks attached yet. Until Instagram, Facebook and TikTok are connected inside Metricool (Settings → Connections), nothing can be scheduled. This is the single most important item in the document."),
      table(["Network","Exists?","Handle / URL","Who has the login","Business account?","Connected in Metricool?"],[1300,900,2300,1900,1400,1900],[
        ["Instagram","","","","",""],["Facebook Page","","","","",""],["TikTok","","","","",""],["Google Business Profile","","","","","n/a"]],[1,2,3,4,5]),
      gap(),
      P([b("Instagram must be a Business account linked to the Facebook Page, "),r("both inside one Meta Business Suite portfolio that the company owns — not a personal profile. If they are not linked yet, do that before connecting to Metricool; Metricool will refuse an unlinked Instagram account.")]),
      P([b("TikTok: "),r("switching to a Business account restricts you to the Commercial Music Library — no trending audio. Every format in the plan is built around that, so switch it. Also note: automated TikTok publishing may land as a draft that someone taps to publish. Tell us who that person is in section 8.")]),
      table(["Item","Your answer"],[3200,6500],[
        ["Direct-booking website URL",""],["Booking engine you use (e.g. Lodgify, Guesty, Hostaway, own site)",""],
        ["OTA listings (Airbnb / Booking.com profile links)",""],["Email or phone that answers guest enquiries",""],
        ["Do you already have a link-in-bio tool? Which?",""]],[1]),

      // ---------- 2 ----------
      H1("2 · Brand basics"),
      why("The Monday 'London This Week' title card opens 13 posts and needs your logo and colours. If none of this exists, say so — creating it is the first design job and takes a day."),
      table(["Item","Your answer / attach"],[3200,6500],[
        ["Logo files (attach: PNG on transparent, SVG if you have it)",""],["Brand colours (hex codes if known, or 'we don't have any')",""],
        ["Fonts (or 'none chosen')",""],["Three words that describe how Seeker should sound",""],
        ["Three things Seeker must never say or do on social",""],["Two accounts (any industry) whose social you admire",""],
        ["Tagline or one-line description, if one exists",""]],[1]),

      // ---------- 3 ----------
      H1("3 · The property list"),
      why("This is the single most useful document for the whole team. Without it every location post is guesswork and the timed-walk format can't be planned. One row per property. Rates can be a range. The example row shows the level of detail."),
      table(["#","Postcode & area","Nearest station(s)","Type","Sleeps","Rate £/night (low–high)","Nearest big venue","Photos exist?","Notes (lift, parking, view, quirks)"],[400,1450,1350,700,760,1100,1300,860,1780],[
        ["ex","E14 9, Canary Wharf","Canary Wharf (Jubilee / Eliz.)","2-bed","4","160–260","ExCeL 12 min, O2 9 min","Yes, 2024","6th floor, lift, river view, no parking"],
        ...Array.from({length:20},(_,i)=>[String(i+1),"","","","","","","",""])],[1,2,3,4,5,6,7,8]),
      gap(),
      P([b("Also tell us: "),r("which ONE property is your flagship — the best-looking, the one you'd photograph first. And which three or four sit near Twickenham, Wembley, The O2, ExCeL or Alexandra Palace, because those get the event posts.")]),

      new Paragraph({children:[new PageBreak()]}),
      // ---------- 4 ----------
      H1("4 · Pricing & hotel comparisons"),
      why("Two posts compare a hotel and a Seeker flat in the same postcode at the same price. They only work if the numbers are real, checkable and dated. Never invented."),
      bullet("Screenshot three comparable hotel listings (same area, same dates, similar standard) showing the nightly price, with the date you took the screenshot visible. Attach them."),
      bullet("Your rate for a comparable flat on the same dates."),
      table(["Question","Your answer"],[3200,6500],[
        ["Do you offer a direct-booking discount vs Airbnb/Booking? How much?",""],["Minimum stay policy (weekday / weekend / peak)",""],
        ["Do you do group or corporate rates? How?",""],["Typical length of stay (nights)",""],
        ["Rough guest mix: % corporate / leisure / family / long-stay",""]],[1]),

      // ---------- 5 ----------
      H1("5 · Reviews export"),
      why("The Thursday 'Proof' pillar publishes real reviews — including the bad ones, followed by what you changed. That format is the strongest trust content that exists and it needs raw material."),
      bullet("Export every review from the last 12 months: Airbnb, Booking.com, Google, anywhere else. CSV, PDF or screenshots — whatever the platform allows. Attach."),
      bullet("Your three worst reviews, and what you did about each one. Two lines each."),
      bullet("One long-stay guest who was happy and might agree to have their story told (first name and country is enough). We will draft the request."),
      table(["Question","Your answer"],[3200,6500],[
        ["Overall rating by platform (e.g. Airbnb 4.8 / Booking 9.1)",""],["Number of reviews in total",""],
        ["Anything a guest has said that you'd rather never see published — tell us so we know",""]],[1]),

      // ---------- 6 ----------
      H1("6 · Your real numbers"),
      why("The landlord track sells certainty, not a yield multiple, because the honest numbers don't support a multiple. To be honest we need your actual figures. These will be aggregated and rounded before anything is published — no property is identified."),
      table(["Cost line — per property, per month (typical)","£"],[6500,3200],[
        ["Cleaning & turnover",""],["Linen & laundry",""],["Utilities (gas, electric, water)",""],["Wifi / TV",""],
        ["Insurance",""],["OTA commission (as £ or %)",""],["Restocking / consumables",""],["Maintenance allowance",""],
        ["Licensing / registration fees",""],["Council tax or business rates",""],["Void allowance (nights empty × rate)",""],["Anything else",""]],[1]),
      gap(),
      table(["Portfolio-level","Your answer"],[3200,6500],[
        ["Average occupancy, last 12 months (%)",""],["Average nightly rate achieved (£)",""],
        ["Average nights per stay",""],["How many properties are under a 90-night limit vs. have planning / other basis",""]],[1]),

      new Paragraph({children:[new PageBreak()]}),
      // ---------- 7 ----------
      H1("7 · The landlord offer"),
      why("Thirteen Wednesday posts educate landlords and end with a save or a DM — never a pitch. But the DM has to land on a real offer, so we need to know exactly what it is."),
      table(["Question","Your answer"],[3200,6500],[
        ["What do you offer a landlord? (guaranteed rent / % management / hybrid / other)",""],
        ["Fee or rent level — how is it calculated?",""],["Contract length and notice period",""],
        ["Who pays for: furnishing, utilities, damage, wear and tear?",""],["Who holds any deposit? Client money protection?",""],
        ["What insurance do you carry? (public liability, contents, landlord)",""],["Memberships: STAA, ASAP, Propertymark, redress scheme — which, if any?",""],
        ["What's the minimum property you'd take on? (size, area, condition)",""],["A real property you turned down in the last year, and why (anonymised)",""],
        ["How does a landlord contact you? (email / form / phone)",""]],[1]),

      // ---------- 8 ----------
      H1("8 · People & capacity"),
      why("The plan assumes someone can shoot on a phone about 3–4 hours a week and that you approve five posts every Friday in 15 minutes. If that's wrong, tell us now and we'll resize it."),
      table(["Role","Name","Notes"],[2800,2400,4500],[
        ["Approves posts every Friday","",""],["Shoots content (phone) weekly","",""],
        ["Taps 'publish' on TikTok drafts","",""],["Replies to comments in the first 30 min after a post","",""],
        ["On camera — founder / face of the brand","","Willing? Yes / No / Sometimes"],
        ["Cleaning team — how many, willing to appear?","","Voice-only or hands-only is fine. Pay them for their time."],
        ["Designer, if any","","Or we generate graphics"]],[1,2]),

      // ---------- 9 ----------
      H1("9 · Compliance facts about Seeker"),
      why("Wednesday posts explain the 90-night rule, licensing and the new landlord database. We must never publish a claim about your own compliance that isn't true. Tick what applies."),
      table(["Statement","True / False / Partly","Notes"],[5000,1700,3000],[
        ["All our properties operate within the 90-night rule or have planning permission to exceed it","",""],
        ["We hold the relevant licences in every borough that requires one","",""],
        ["We have written consent from every freeholder / lender where required","",""],
        ["We are registered (or will register) on the national landlord database from 15 Dec 2026","",""],
        ["We are a member of a redress scheme","",""],
        ["We are a member of STAA or ASAP","",""]],[1,2]),

      // ---------- 10 ----------
      H1("10 · Week-one capture"),
      why("These four shoots are already in the Asset Requests tab of the spreadsheet with dates. Listed here so the whole week is on one page."),
      table(["Shoot","When","Time","Done?"],[5400,1700,1200,1400],[
        ["Flagship flat — every room from the doorway corner, daylight, plus ten 3–5s clips","by Mon 14 Sep","3 hrs",""],
        ["Founder on camera — six clips, 20s each, window light, don't memorise","by Mon 14 Sep","1 hr",""],
        ["One full turnover — 15 short clips AND one continuous unedited take, no music","by Wed 16 Sep","2 hrs",""],
        ["London B-roll walk — 30 clips: tube, escalator, cab, Thames, terrace street, rain on glass","by Fri 18 Sep","2 hrs",""]],[3]),
      gap(),
      P([b("How to send footage: "),r("a shared Google Drive or Dropbox folder link is easiest — Metricool can pull media straight from either when it schedules a post. Name files by date and place: "),r("2026-09-14_E14-flagship_kitchen-01.mp4",{font:"Courier New",size:18}),r(". Vertical (9:16) for video, always.")]),
      gap(),
      P([r("Send back whatever is ready. The property list and section 1 unblock the most, so start there.",{color:GREY,italics:true})]),
    ]
  }]
});
Packer.toBuffer(doc).then(buf=>{fs.writeFileSync('/home/claude/seeker-estates/outputs/Seeker-Estates-Information-Request.docx',buf);console.log('ok',buf.length);});
