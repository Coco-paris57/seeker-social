// Renders promo.html to an MP4, frame by frame, so the motion is smooth and repeatable:
//   node render.cjs            full video
//   node render.cjs stills     one picture per scene, for checking
const { chromium } = require('playwright');
const { spawn } = require('node:child_process');
const path = require('node:path');
const FPS = 30, SECONDS = 60, DIR = __dirname;
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(DIR, 'promo.html'));
  await page.evaluate(() => document.fonts.ready);
  const seek = (ms) => page.evaluate((t) => { for (const a of document.getAnimations()) { a.pause(); a.currentTime = t; } }, ms);
  if (process.argv[2] === 'stills') {
    for (const s of [4.6, 9.5, 14, 19.5, 26.5, 29.5, 35, 39.5, 46.5, 51.5, 58.5]) { await seek(s * 1000); await page.screenshot({ path: path.join(DIR, `still-${String(s).padStart(4, '0')}.png`) }); }
    await browser.close();
    return;
  }
  const out = path.join(DIR, 'seeker-concierge-promo.mp4');
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < FPS * SECONDS; f++) {
    await seek((f / FPS) * 1000);
    const shot = await page.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(shot)) await new Promise((r) => ff.stdin.once('drain', r));
    if (f % 300 === 0) console.log(`${Math.round(f / FPS)}s`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  await browser.close();
  console.log('done', out);
})().catch((e) => { console.error(e); process.exit(1); });
