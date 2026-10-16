// Render PNG assets (OG share image, logo.png, app icons) from the SVG sources.
// Run via: python3 website/build.py --images
const path = require("path");
const fs = require("fs");
const os = require("os");
let chromium;
try { ({ chromium } = require("playwright")); }
catch (e) { ({ chromium } = require("/opt/node22/lib/node_modules/playwright")); }

const IMG = path.join(__dirname, "..", "src", "assets", "img");
const FONTS = path.join(__dirname, "..", "src", "assets", "fonts");
const f = (p) => "file://" + p;

const og = `<!doctype html><html><head><style>
@font-face{font-family:F;src:url(${f(FONTS + "/fraunces-latin-wght-normal.woff2")})}
@font-face{font-family:FI;font-style:italic;src:url(${f(FONTS + "/fraunces-latin-wght-italic.woff2")})}
@font-face{font-family:J;src:url(${f(FONTS + "/plus-jakarta-sans-latin-600-normal.woff2")})}
body{margin:0;width:1200px;height:630px;background:#F6F1E7;display:flex;font-family:J;color:#13221C;overflow:hidden}
.l{flex:1;padding:64px 0 64px 72px;display:flex;flex-direction:column}
.l img{height:84px;width:auto;align-self:flex-start}
h1{font:560 76px/1.02 F;letter-spacing:-.02em;margin:auto 0 24px}
h1 em{font-family:FI;font-weight:480;color:#A9441F}
p{font-size:24px;color:#4E5E56;margin:0}
.r{width:420px;margin:48px 64px 0 0;border-radius:999px 999px 0 0;overflow:hidden;align-self:flex-end;height:582px}
.r img{width:100%;height:100%;object-fit:cover}
</style></head><body><div class="l"><img src="${f(IMG + "/logo.svg")}"><h1>London homes,<br><em>properly run.</em></h1>
<p>Serviced apartments · Book direct · Property management</p></div><div class="r"><img src="${f(IMG + "/hero-london.svg")}"></div></body></html>`;

const svgPage = (file, w, h, bg = "transparent") =>
  `<!doctype html><body style="margin:0;background:${bg}"><img src="${f(IMG + "/" + file)}" style="width:${w}px;height:${h}px;display:block"></body>`;

(async () => {
  const b = await chromium.launch();
  const shot = async (html, w, h, out, transparent = false) => {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    // Load from a real file:// page; setContent() runs on about:blank, which may not read file:// SVGs or fonts.
    const tmp = path.join(os.tmpdir(), "seeker-render-" + out + ".html");
    fs.writeFileSync(tmp, html);
    await p.goto("file://" + tmp, { waitUntil: "load" });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(IMG, out), omitBackground: transparent });
    await p.close();
  };
  await shot(og, 1200, 630, "og.png");
  await shot(svgPage("logo.svg", 819, 264), 819, 264, "logo.png", true);
  await shot(svgPage("favicon.svg", 180, 180), 180, 180, "apple-touch-icon.png", true);
  await shot(svgPage("favicon.svg", 512, 512), 512, 512, "icon-512.png", true);
  await b.close();
})();
