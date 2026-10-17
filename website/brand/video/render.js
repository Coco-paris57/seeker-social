// Export rebrand.html to MP4: node render.js [out.mp4]
// Draws each frame with render(t), screenshots it and pipes JPEGs into ffmpeg (H.264, 30 fps, 1080x1920).
const path = require("path");
const { spawn } = require("child_process");
let chromium;
try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = require("/opt/node22/lib/node_modules/playwright")); }
const FPS = 30;
const out = path.resolve(process.argv[2] || path.join(__dirname, "seeker-estates-rebrand-30s.mp4"));
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto("file://" + path.join(__dirname, "rebrand.html"));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  const dur = await p.evaluate(() => window.DURATION);
  const ff = spawn("ffmpeg", ["-y", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-",
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "slow", "-crf", "18", "-movflags", "+faststart", out], { stdio: ["pipe", "inherit", "inherit"] });
  const n = Math.round(dur * FPS);
  for (let i = 0; i < n; i++) {
    await p.evaluate((t) => window.render(t), i / FPS);
    const buf = await p.screenshot({ type: "jpeg", quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
  }
  ff.stdin.end();
  await new Promise((r) => ff.on("close", r));
  await b.close();
  console.log("wrote", out);
})();
