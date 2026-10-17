// Export a motion HTML (with window.render(t) and window.DURATION) to MP4:
//   node render.js sting-london-this-week.html [out.mp4]
const path = require("path"); const { spawn } = require("child_process");
let chromium; try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = require("/opt/node22/lib/node_modules/playwright")); }
const FPS = 30, src = path.resolve(process.argv[2]), out = path.resolve(process.argv[3] || src.replace(/\.html$/, ".mp4"));
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto("file://" + src); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const dur = await p.evaluate(() => window.DURATION);
  const ff = spawn("ffmpeg", ["-y", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-movflags", "+faststart", out], { stdio: ["pipe", "ignore", "ignore"] });
  for (let i = 0; i < Math.round(dur * FPS); i++) { await p.evaluate((t) => window.render(t), i / FPS); const buf = await p.screenshot({ type: "jpeg", quality: 95 }); if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r)); }
  ff.stdin.end(); await new Promise((r) => ff.on("close", r)); await b.close(); console.log("wrote", out);
})();
