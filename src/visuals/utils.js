// Shared helpers for the AlgoSim visual engine.

/** Pick the right language out of a string or {en, bn} object. */
export function t(obj, lang) {
  if (obj == null) return '';
  if (typeof obj === 'string') return obj;
  if (typeof obj === 'object') {
    if (lang && obj[lang] != null) return obj[lang];
    return obj.en ?? Object.values(obj)[0] ?? '';
  }
  return String(obj);
}

/**
 * Stable identity for array cells, derived from the cell's CONTENT (value +
 * how many times that value already appeared). Sorting two equal numbers keeps
 * their ids, so the browser can animate the move instead of jumping.
 */
export function contentIds(cells) {
  const seen = new Map();
  return cells.map((v) => {
    const k = JSON.stringify(v);
    const c = seen.get(k) || 0;
    seen.set(k, c + 1);
    return `${k}#${c}`;
  });
}

/** Priority order of cell highlight states (first match wins). */
const HL_ORDER = [
  ['swap', 'h-swap'],
  ['compare', 'h-compare'],
  ['active', 'h-active'],
  ['pivot', 'h-pivot'],
  ['target', 'h-target'],
  ['insert', 'h-insert'],
  ['remove', 'h-remove'],
  ['sorted', 'h-sorted'],
  ['ok', 'h-ok'],
  ['mark', 'h-mark'],
  ['frontier', 'h-frontier'],
  ['visited', 'h-visited'],
  ['dim', 'h-dim']
];

/** Build a class-name lookup for index-based highlights. */
export function hlClass(highlights, i) {
  if (!highlights) return '';
  const classes = [];
  for (const [key, cls] of HL_ORDER) {
    const v = highlights[key];
    if (v == null) continue;
    if (Array.isArray(v)) {
      if (v.some((x) => (typeof x === 'object' ? x.i === i : Number(x) === i))) classes.push(cls);
    } else if (Number(v) === i) {
      classes.push(cls);
    }
  }
  return classes.join(' ');
}

export function hasHl(highlights, i) {
  return hlClass(highlights, i).length > 0;
}

/** Normalise an index highlight that may be a number or {i}. */
export function hlIndex(x) {
  return typeof x === 'object' && x !== null ? x.i : Number(x);
}

export function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

/** Translate a list of node ids/values into a Set of matching node ids. */
export function resolveRefs(nodes, refs) {
  const out = new Set();
  if (refs == null) return out;
  const list = Array.isArray(refs) ? refs : [refs];
  for (const ref of list) {
    for (const n of nodes) {
      if (n.id === ref || String(n.value) === String(ref) || String(n.label) === String(ref)) out.add(n.id);
    }
  }
  return out;
}

export const TONE_VAR = {
  cyan: 'v-cyan',
  amber: 'v-amber',
  green: 'v-green',
  purple: 'v-purple',
  red: 'v-red',
  yellow: 'v-yellow'
};

export function tone(toneName, fallback = 'v-cyan') {
  return TONE_VAR[toneName] || fallback;
}
