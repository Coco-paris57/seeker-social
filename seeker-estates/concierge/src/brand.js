// Branding: the name, colours and logo of the company running this copy of the app. Each agency
// runs its own copy (its own server and database), and sets these in Settings. The defaults are
// Seeker Estates, and with the defaults nothing here changes what is served.
import fs from 'node:fs';
import path from 'node:path';
import { config } from './config.js';
import { getRaw, setRaw, parseJson } from './db.js';
import { HttpError } from './util.js';

export const BRAND_DEFAULTS = { name: 'Seeker', company: config.company.name, app: 'Seeker Concierge', color: '#0F3D2E', accent: '#C8582F' };
const SLOTS = { logo: 'The logo', mark: 'The square icon' };
const TYPES = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/svg+xml': 'svg' };
const dir = () => path.join(config.dataDir, 'brand');

const savedBrand = () => parseJson(getRaw('brand') || '{}', {}) || {};

let cached = null;
/** The brand in force: saved values over the defaults. */
export function brand() {
  if (cached) return cached;
  const saved = savedBrand();
  const b = { ...BRAND_DEFAULTS, ...Object.fromEntries(Object.entries(saved).filter(([, v]) => v != null && v !== '')) };
  b.custom = ['name', 'company', 'app', 'color', 'accent'].some((k) => b[k] !== BRAND_DEFAULTS[k]) || !!b.logo || !!b.mark;
  cached = b;
  return b;
}
export const resetBrandCache = () => { cached = null; };

// Names appear inside pages and scripts, so they are limited to characters that are safe there.
const cleanName = (v, max) => String(v ?? '').replace(/[^\p{L}\p{N} &.,'’()+-]/gu, '').replace(/'/g, '’').replace(/\s+/g, ' ').trim().slice(0, max);
const hex = (v) => (/^#[0-9a-f]{6}$/i.test(String(v || '')) ? String(v).toUpperCase() : null);
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (h, other, share) => `#${rgb(h).map((c, i) => Math.round(c + (other[i] - c) * share).toString(16).padStart(2, '0')).join('')}`.toUpperCase();
const lum = (h) => { const [r, g, b] = rgb(h).map((c) => { const x = c / 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
/** Contrast of a colour against white, as WCAG measures it. */
export const contrastOnWhite = (h) => 1.05 / (lum(h) + 0.05);

export function saveBrand(input) {
  const next = { ...savedBrand() };
  for (const [key, max] of [['name', 30], ['company', 80], ['app', 40]]) {
    if (input[key] === undefined) continue;
    const v = cleanName(input[key], max);
    if (!v) throw new HttpError(400, 'Names cannot be empty.');
    next[key] = v;
  }
  for (const [key, label, min] of [['color', 'The main colour', 4.5], ['accent', 'The accent colour', 3]]) {
    if (input[key] === undefined) continue;
    const v = hex(input[key]);
    if (!v) throw new HttpError(400, `${label} must be a colour code such as #0F3D2E.`);
    // Buttons, the menu and badges put white text on these colours.
    if (contrastOnWhite(v) < min) throw new HttpError(400, `${label} is too light: white text on it would be hard to read. Choose a darker shade.`);
    next[key] = v;
  }
  setRaw('brand', JSON.stringify(next));
  resetBrandCache();
  return brand();
}

export function resetBrand() {
  for (const slot of Object.keys(SLOTS)) removeFile(slot);
  setRaw('brand', '{}');
  resetBrandCache();
  return brand();
}

function removeFile(slot) {
  const saved = savedBrand();
  if (saved[slot]) fs.rmSync(path.join(dir(), `${slot}.${saved[slot].ext}`), { force: true });
}

/** Store an uploaded logo or icon. Only real pictures, and no script inside an SVG. */
export function saveBrandFile(slot, buffer, contentType) {
  if (!SLOTS[slot]) throw new HttpError(400, 'Unknown picture.');
  const ext = TYPES[String(contentType || '').split(';')[0].trim()];
  if (!ext || !Buffer.isBuffer(buffer) || !buffer.length) throw new HttpError(415, 'Use a PNG, JPEG, WebP or SVG picture.');
  if (buffer.length > 600_000) throw new HttpError(413, 'That picture is too large. Keep it under 600 KB.');
  const head = buffer.subarray(0, 12);
  const looks = {
    png: head.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
    jpg: head[0] === 0xff && head[1] === 0xd8,
    webp: head.subarray(0, 4).toString() === 'RIFF' && head.subarray(8, 12).toString() === 'WEBP',
    svg: /<svg[\s>]/i.test(buffer.toString('utf8', 0, 2000)),
  }[ext];
  if (!looks) throw new HttpError(415, 'That file is not the kind of picture its name says it is.');
  if (ext === 'svg' && /<script|\son\w+\s*=|javascript:|<foreignObject|<iframe/i.test(buffer.toString('utf8'))) throw new HttpError(415, 'This SVG contains scripts or embedded pages. Export it as a plain picture.');
  fs.mkdirSync(dir(), { recursive: true });
  removeFile(slot);
  fs.writeFileSync(path.join(dir(), `${slot}.${ext}`), buffer);
  const saved = savedBrand();
  saved[slot] = { ext, v: Date.now() };
  setRaw('brand', JSON.stringify(saved));
  resetBrandCache();
  return brand();
}

/** The uploaded picture for a slot, or null to fall back to the built-in one. */
export function brandFile(slot) {
  const f = brand()[slot];
  if (!f) return null;
  const file = path.join(dir(), `${slot}.${f.ext}`);
  return fs.existsSync(file) ? { file, mime: Object.keys(TYPES).find((k) => TYPES[k] === f.ext), ext: f.ext } : null;
}

/** Colour tokens that follow the two brand colours. Empty when the colours are the defaults. */
export function brandCss() {
  const b = brand();
  if (b.color === BRAND_DEFAULTS.color && b.accent === BRAND_DEFAULTS.accent) return '';
  const white = [255, 255, 255];
  const black = [0, 0, 0];
  return `:root {
  --brand: ${b.color}; --brand-800: ${mix(b.color, black, 0.2)}; --brand-600: ${mix(b.color, white, 0.14)}; --brand-tint: ${mix(b.color, white, 0.86)}; --brand-50: ${mix(b.color, white, 0.93)};
  --surface-2: ${mix(b.color, white, 0.93)}; --ok: ${mix(b.color, white, 0.14)}; --ok-ground: ${mix(b.color, white, 0.86)};
  --clay: ${b.accent}; --clay-700: ${mix(b.accent, black, 0.18)}; --clay-100: ${mix(b.accent, white, 0.8)};
  --focus: 0 0 0 3px #FFFFFF, 0 0 0 6px ${b.color};
}
`;
}

/**
 * The same page or script with this agency's names, colours and pictures in place of the
 * built-in ones. Used for the pages, scripts and manifests the browser loads.
 */
export function brandText(text) {
  const b = brand();
  if (!b.custom) return text;
  const shortCompany = b.company.replace(/\s+(ltd|limited|llc|inc|plc|gmbh|sarl|sas|srl)\.?$/i, '');
  const icon = brandFile('mark');
  let out = text
    .replaceAll('href="/shared/tokens.css">', 'href="/shared/tokens.css">\n<link rel="stylesheet" href="/brand.css">')
    .replaceAll('Seeker Estates LTD', b.company)
    .replaceAll('Seeker Estates', shortCompany)
    .replaceAll('Seeker Concierge', b.app)
    .replaceAll('Seeker-Team', `${b.name}-Team`)
    .replace(/\bSeeker\b(?! Assistant)/g, b.name)
    .replaceAll('#0F3D2E', b.color);
  if (brandFile('logo')) out = out.replaceAll('/shared/logo.svg', `/brand/logo?v=${b.logo.v}`).replaceAll('/shared/logo-reversed.svg', `/brand/logo?v=${b.logo.v}`);
  if (icon) {
    out = out.replaceAll('/shared/mark-reversed.svg', `/brand/mark?v=${b.mark.v}`).replaceAll('/shared/mark.svg', `/brand/mark?v=${b.mark.v}`).replaceAll('type="image/svg+xml"', `type="${icon.mime}"`);
    // Home-screen icons must be bitmap pictures; an SVG icon keeps the built-in ones.
    if (icon.ext !== 'svg') out = out.replace(/\/shared\/(apple-touch-icon|icon-192|icon-512|icon-maskable-512)\.png/g, `/brand/mark?v=${b.mark.v}`);
  }
  return out;
}
