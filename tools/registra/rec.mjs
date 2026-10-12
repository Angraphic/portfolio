// Registra anteprime dei progetti: screencast CDP di Chrome -> JPEG a 30 fps -> webm VP8 (ffmpeg di Playwright).
// uso: node rec.mjs <id> [<id>...]   |   node rec.mjs probe <url> <w> <h> <out.jpg>
import { createRequire } from 'module';
import { spawn } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/Utente/Downloads/inpelle-configuratore/node_modules/playwright-core');
const FF = 'C:/Users/Utente/AppData/Local/ms-playwright/ffmpeg-1011/ffmpeg-win64.exe';
const OUT = 'C:/Users/Utente/Downloads/antonio-portfolio/assets/lavori';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const sleep = ms => new Promise(r => setTimeout(r, ms));

// scroll "umano": rotella a piccoli passi con velocità a campana, così funziona anche con Lenis/GSAP
export async function glide(page, dist, ms) {
  // a orologio: ogni passo porta lo scroll dove dovrebbe essere a quell'istante (velocità a campana)
  const t0 = Date.now();
  let done = 0;
  for (;;) {
    const k = Math.min((Date.now() - t0) / ms, 1);
    const target = dist * (1 - Math.cos(Math.PI * k)) / 2;
    if (target - done >= 1) { await page.mouse.wheel(0, Math.round(target - done)); done += Math.round(target - done); }
    if (k >= 1) break;
    await sleep(16);
  }
}

const desk = { w: 1440, h: 900, ow: 1280, oh: 800 };
const phone = { w: 390, h: 844, ow: 390, oh: 844, scale: 2, mobile: true };
const scrollTour = (stops, first = 2200) => async page => {
  await sleep(first);
  for (const [d, ms, pause] of stops) { await glide(page, d, ms); await sleep(pause); }
};

export const jobs = {};
const J = (id, o) => (jobs[id] = o);
import('./jobs.mjs').then(async m => {
  m.default({ J, desk, phone, scrollTour, glide, sleep });
  (await import('./jobs2.mjs')).default({ J, desk, glide, sleep });
  const args = process.argv.slice(2);
  if (args[0] === 'probe') return probe(...args.slice(1));
  for (const id of args) await record(id, jobs[id]);
});

async function launch(v) {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--autoplay-policy=no-user-gesture-required', '--hide-scrollbars'] });
  const ctx = await browser.newContext({ viewport: { width: v.w, height: v.h }, deviceScaleFactor: v.scale || 1, isMobile: !!v.mobile, hasTouch: !!v.mobile, locale: 'it-IT', ...(v.ctx || {}) });
  return { browser, ctx, page: await ctx.newPage() };
}

async function probe(url, w = 1440, h = 900, out = 'probe.jpg', wait = 3000) {
  const { browser, page } = await launch({ w: +w, h: +h });
  await page.goto(url, { waitUntil: 'load', timeout: 60000 }).catch(e => console.log('goto', e.message));
  await sleep(+wait);
  await page.screenshot({ path: out, type: 'jpeg', quality: 70 });
  console.log('ok', out, await page.evaluate(() => [document.title, document.documentElement.scrollHeight]));
  await browser.close();
}

async function record(id, j) {
  const v = j.view || desk;
  const { browser, page } = await launch(v);
  if (j.before) await j.before(page);
  await page.goto(j.url, { waitUntil: 'load', timeout: 90000 }).catch(e => console.log('goto', e.message));
  if (j.prep) await j.prep(page);
  await page.mouse.move(v.w / 2, v.h / 2);
  const cdp = await page.context().newCDPSession(page);
  const frames = [];
  cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
    frames.push({ b: Buffer.from(data, 'base64'), t: metadata.timestamp });
    cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 90, maxWidth: v.ow * (v.scale || 1), maxHeight: v.oh * (v.scale || 1), everyNthFrame: 1 });
  const t0 = Date.now() / 1000;
  let poster = false;
  await j.run(page, async () => { await page.screenshot({ path: `${OUT}/${id}.jpg`, type: 'jpeg', quality: 78 }); poster = true; });
  if (!poster) await page.screenshot({ path: `${OUT}/${id}.jpg`, type: 'jpeg', quality: 78 });
  const t1 = Date.now() / 1000;
  await cdp.send('Page.stopScreencast');
  await browser.close();
  if (!frames.length) return console.log(id, 'no frames');
  // timeline a fps costante: per ogni istante l'ultimo frame arrivato
  const start = Math.max(frames[0].t, t0 - 0.05) + (j.trim || 0), end = frames.at(-1).t + 0.3 > t1 ? t1 : frames.at(-1).t + 0.3;
  const fps = 30, seq = [];
  for (let t = start, k = 0; t < end; t += 1 / fps) {
    while (k + 1 < frames.length && frames[k + 1].t <= t) k++;
    seq.push(frames[k].b);
  }
  // questo ffmpeg non ha il protocollo pipe: i JPEG vanno in un file unico letto con image2pipe
  const tmp = `${OUT}/_${id}.mjpg`;
  writeFileSync(tmp, Buffer.concat(seq));
  const vf = j.vf || (v.ow > 1000 ? 'scale=1280:-2' : `scale=${v.ow}:-2`);
  const ff = spawn(FF, ['-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-r', String(fps), '-i', tmp, '-vf', vf, '-c:v', 'libvpx', '-b:v', j.bitrate || '1.6M', '-crf', '10', '-deadline', 'good', '-cpu-used', '1', '-g', '60', '-an', `${OUT}/${id}.webm`], { stdio: ['ignore', 'ignore', 'pipe'] });
  let err = ''; ff.stderr.on('data', d => (err += d));
  const code = await new Promise(r => ff.on('close', r));
  unlinkSync(tmp);
  console.log(id, code === 0 ? `ok ${seq.length} frames ${(seq.length / fps).toFixed(1)}s` : 'ffmpeg fail ' + err.slice(-400));
}
