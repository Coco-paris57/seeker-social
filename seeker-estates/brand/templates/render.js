// Render Seeker Estates post templates to PNG.
//   node render.js spec.json [out-dir]
// spec.json is one object or an array of objects:
//   { "file": "slide-1.png", "format": "cover", "label": "Landlord day · Wednesday",
//     "headline": "Section 21 is *gone.*", "body": "", "footnote": "Renters' Rights Act 2025", "page": "2 / 6" }
// Formats: cover, cover-dark, inside, cta (1080x1350) · reel-title, story (1080x1920) · tag (transparent strip)
// Optional: "theme": "light" | "dark" | "clay", "width"/"height" to override, "swipe": "Swipe".
const fs = require("fs");
const path = require("path");
let chromium;
try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = require("/opt/node22/lib/node_modules/playwright")); }

const [specPath, outDir = "."] = process.argv.slice(2);
if (!specPath) { console.error("usage: node render.js spec.json [out-dir]"); process.exit(1); }
const specs = [].concat(JSON.parse(fs.readFileSync(specPath, "utf8")));

(async () => {
  const b = await chromium.launch();
  fs.mkdirSync(outDir, { recursive: true });
  for (const [i, s] of specs.entries()) {
    const tall = s.format === "reel-title" || s.format === "story";
    const w = s.width || 1080, h = s.height || (tall ? 1920 : s.format === "tag" ? 140 : 1350);
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto("file://" + path.join(__dirname, "post.html"));
    await p.evaluate(() => document.fonts.ready);
    await p.evaluate((spec) => window.render(spec), s);
    await p.evaluate(() => Promise.all([...document.images].map((im) => im.complete ? 0 : new Promise((r) => { im.onload = im.onerror = r; }))));
    await p.evaluate(() => document.fonts.ready);
    const out = path.join(outDir, s.file || `post-${i + 1}.png`);
    await p.screenshot({ path: out, omitBackground: s.format === "tag" });
    console.log("wrote", out);
    await p.close();
  }
  await b.close();
})();
