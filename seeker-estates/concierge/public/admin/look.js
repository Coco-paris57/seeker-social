// How the team app looks and moves on this device: glass strength, background, animations,
// compact mode and the opening animation. Saved per person per device; the brand colours are
// never changed here.
const KEY = 'concierge-look';
export const LOOK_DEFAULTS = { glass: 70, background: 'garden', motion: true, compact: false, opening: true };
export const BACKGROUNDS = { garden: 'Garden', sand: 'Sand', evening: 'Evening' };

export function getLook() {
  try {
    return { ...LOOK_DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') };
  } catch {
    return { ...LOOK_DEFAULTS }; // private window or blocked storage: the defaults
  }
}

export function setLook(change) {
  const next = { ...getLook(), ...change };
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* not saved, still applied */ }
  applyLook(next);
  return next;
}

/** Movement is off when the person has asked their device for less motion, whatever is saved here. */
export const motionOn = () => getLook().motion && !matchMedia('(prefers-reduced-motion: reduce)').matches;

export function applyLook(look = getLook()) {
  const root = document.documentElement;
  const level = Math.min(100, Math.max(0, Number(look.glass) || 0)) / 100;
  root.dataset.look = 'glass';
  root.dataset.lookBg = BACKGROUNDS[look.background] ? look.background : 'garden';
  root.dataset.lookMotion = look.motion ? 'on' : 'off';
  root.dataset.lookCompact = look.compact ? 'on' : 'off';
  // 0 = solid white cards and no blur; 100 = the most see-through.
  root.style.setProperty('--glass-a', String(Math.round((1 - level * 0.52) * 100) / 100));
  root.style.setProperty('--glass-blur', `${Math.round(level * 26)}px`);
}

/** Count a number up to its value (for the dashboard). Shows the final value at once when movement is off. */
export function countUp(el, value, format = (n) => String(Math.round(n))) {
  if (!motionOn() || !Number.isFinite(value) || value === 0) { el.textContent = format(value); return; }
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / 900);
    el.textContent = format(value * (1 - (1 - t) ** 3));
    if (t < 1 && el.isConnected) requestAnimationFrame(step);
    else el.textContent = format(value);
  };
  el.textContent = format(0);
  requestAnimationFrame(step);
}
