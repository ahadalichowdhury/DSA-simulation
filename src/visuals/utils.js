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

/* ---------------- noob-friendly helpers ---------------- */

const TEX_SYMBOLS = {
  implies: '⟹', to: '→', rightarrow: '→', leftarrow: '←', times: '×', cdot: '·', le: '≤', leq: '≤', ge: '≥', geq: '≥',
  neq: '≠', ne: '≠', approx: '≈', in: '∈', infty: '∞', dots: '…', ldots: '…', pm: '±', lceil: '⌈', rceil: '⌉',
  lfloor: '⌊', rfloor: '⌋', log: 'log', max: 'max', min: 'min', sum: 'Σ', left: '', right: ''
};

/**
 * Lesson text was written with LaTeX math between $…$ ($\log_2 N$, $\mathbf{2N + 1}$ …), which a
 * browser shows as raw symbols. This turns it into plain readable text with real sub/superscripts.
 */
export function texToHtml(str) {
  if (!str || str.indexOf('$') < 0) return str;
  const frac = (top, bot, cls = '') => `<span class="mfrac${cls}"><span>${top}</span><span>${bot}</span></span>`;
  const conv = (m, block = false) => {
    let x = m.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\\[,;!]/g, ' ');
    for (let k = 0; k < 4; k++) {
      x = x
        .replace(/\\mathbf\{([^{}]*)\}/g, '<b>$1</b>')
        .replace(/\\text\{([^{}]*)\}/g, '$1')
        .replace(/_\{([^{}]*)\}/g, '<sub>$1</sub>')
        .replace(/\^\{([^{}]*)\}/g, '<sup>$1</sup>')
        // fractions are drawn stacked: top, a line, bottom
        .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, (_, a, b) => frac(a, b))
        .replace(/\\binom\{([^{}]*)\}\{([^{}]*)\}/g, (_, a, b) => `(${frac(a, b, ' mbinom')})`)
        .replace(/\\sqrt\{([^{}]*)\}/g, '√($1)');
    }
    x = x.replace(/\\([a-zA-Z]+)/g, (all, name) => (TEX_SYMBOLS[name] != null ? TEX_SYMBOLS[name] : name));
    x = x.replace(/_([A-Za-z0-9])/g, '<sub>$1</sub>').replace(/\^([A-Za-z0-9])/g, '<sup>$1</sup>');
    return `<span class="math${block ? ' math-block' : ''}">${x.replace(/[{}]/g, '').trim()}</span>`;
  };
  // only $…$ on one line that does not start or end with a space (so "$5 and $6" stays as is)
  return str
    .replace(/\n?\$\$([^$`]{1,240}?)\$\$\n?/g, (_, m) => conv(m.trim(), true))
    .replace(/\$(?=\S)([^$\n`]{1,160}?)(?<=\S)\$/g, (_, m) => conv(m));
}

/**
 * Turn a scene string (plain, HTML, or the lesson's light markdown) into HTML.
 * Lesson notes use **bold** and `code` but used to show the raw asterisks.
 */
export function rich(obj, lang) {
  const s = t(obj, lang);
  if (!s) return '';
  return texToHtml(String(s))
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

/**
 * What every highlight colour MEANS, in plain words. Used to build the
 * automatic "colour key" so a beginner never has to guess.
 * `swatch` is a CSS class on .key-swatch that mirrors how the mark is drawn.
 */
export const HL_MEANING = {
  current:  { swatch: 'k-yellow',  en: 'Looking here now',     bn: 'এখন এখানে দেখছি' },
  active:   { swatch: 'k-yellow',  en: 'Working on this',      bn: 'এটা নিয়ে কাজ চলছে' },
  compare:  { swatch: 'k-cyan',    en: 'Comparing these',      bn: 'এগুলো তুলনা হচ্ছে' },
  swap:     { swatch: 'k-amber',   en: 'Swapping places',      bn: 'জায়গা বদল হচ্ছে' },
  pivot:    { swatch: 'k-purple',  en: 'Pivot (split point)',  bn: 'পিভট (ভাগের বিন্দু)' },
  target:   { swatch: 'k-red',     en: 'What we are looking for', bn: 'যেটা খুঁজছি' },
  insert:   { swatch: 'k-green',   en: 'Just added',           bn: 'এইমাত্র যোগ হলো' },
  remove:   { swatch: 'k-red-x',   en: 'Being removed',        bn: 'সরানো হচ্ছে' },
  sorted:   { swatch: 'k-green',   en: 'Done / in final place', bn: 'শেষ / সঠিক জায়গায়' },
  ok:       { swatch: 'k-green',   en: 'Correct',              bn: 'ঠিক আছে' },
  mark:     { swatch: 'k-yellow-o', en: 'Marked',              bn: 'চিহ্নিত' },
  path:     { swatch: 'k-green',   en: 'Path we took',         bn: 'যে পথে গেছি' },
  visited:  { swatch: 'k-green-o', en: 'Already visited',      bn: 'আগেই দেখা হয়েছে' },
  frontier: { swatch: 'k-cyan-d',  en: 'Waiting in line (next up)', bn: 'লাইনে অপেক্ষায় (পরের পালা)' },
  reject:   { swatch: 'k-red-d',   en: 'Ruled out',            bn: 'বাদ পড়েছে' },
  dim:      { swatch: 'k-dim',     en: 'Not needed now',       bn: 'এখন দরকার নেই' },
  overflow: { swatch: 'k-red',     en: 'Too full — must split', bn: 'বেশি ভরা — ভাগ করতে হবে' },
  split:    { swatch: 'k-amber',   en: 'Splitting',            bn: 'ভাগ হচ্ছে' },
  promote:  { swatch: 'k-yellow',  en: 'Moving up to parent',  bn: 'প্যারেন্টে উঠছে' },
  // BST playground states
  cursor:   { swatch: 'k-orange-ring', en: 'Where we are now (carries the key)', bn: 'এখন যেখানে আছি (কী সঙ্গে নিয়ে)' },
  cmp:      { swatch: 'k-amber',   en: 'Comparing with the key', bn: 'কী-র সঙ্গে তুলনা' },
  found:    { swatch: 'k-green',   en: 'Found', bn: 'পাওয়া গেছে' },
  succ:     { swatch: 'k-purple',  en: 'Inorder successor', bn: 'ইন-অর্ডার সাকসেসর' },
  bad:      { swatch: 'k-red',     en: 'Breaks the BST rule', bn: 'BST নিয়ম ভাঙে' },
  // hash-table states
  new:      { swatch: 'k-yellow',  en: 'Just added',           bn: 'এইমাত্র যোগ হলো' },
  col:      { swatch: 'k-amber',   en: 'Collision (same bucket)', bn: 'কোলিশন (একই বাকেট)' },
  probe:    { swatch: 'k-cyan',    en: 'Checking this one',    bn: 'এটা যাচাই হচ্ছে' },
  hit:      { swatch: 'k-green',   en: 'Found it',             bn: 'পাওয়া গেছে' },
  miss:     { swatch: 'k-red',     en: 'Not here',             bn: 'এখানে নেই' },
  // graph chapter states
  source:   { swatch: 'k-purple',  en: 'Start vertex',         bn: 'শুরুর ভার্টেক্স' },
  done:     { swatch: 'k-green',   en: 'Finished — answer is final', bn: 'শেষ — উত্তর চূড়ান্ত' },
  tree:     { swatch: 'k-green',   en: 'Edge we used / kept',  bn: 'যে এজ ব্যবহার / রাখা হয়েছে' },
  relax:    { swatch: 'k-green',   en: 'Just got better (updated)', bn: 'এইমাত্র আরও ভালো হলো (আপডেট)' },
  setA:     { swatch: 'k-blue',    en: 'Group A',              bn: 'দল A' },
  setB:     { swatch: 'k-amber',   en: 'Group B',              bn: 'দল B' }
};

function nonEmpty(v) {
  if (v == null) return false;
  if (Array.isArray(v)) return v.length > 0;
  return v !== '';
}

/** Which highlight keys does this scene actually use (in a stable order)? */
export function usedHighlightKeys(scene) {
  const keys = new Set();
  const addFrom = (hl) => {
    if (!hl) return;
    for (const k of Object.keys(hl)) if (HL_MEANING[k] && nonEmpty(hl[k])) keys.add(k);
  };
  addFrom(scene.highlights);
  if (scene.kind === 'bst') {
    if (scene.cursor != null) keys.add('cursor');
    // a BST node in state 'new' is drawn green, like an array 'insert'
    Object.values(scene.states || {}).forEach((st) => { const k = st === 'new' ? 'insert' : st; if (HL_MEANING[k]) keys.add(k); });
    if ((scene.lit || []).length) keys.add('path');
    (scene.panels || []).forEach((p) => Object.values(p.hl || {}).forEach((st) => { if (HL_MEANING[st]) keys.add(st); }));
  }
  if (scene.kind === 'graphx') {
    const add = (st) => { if (st && HL_MEANING[st]) keys.add(st); };
    Object.values(scene.nodeState || {}).forEach(add);
    Object.values(scene.edgeState || {}).forEach(add);
    if (scene.cursor != null) keys.add('cursor');
    (scene.panels || []).forEach((p) => {
      Object.values(p.hl || {}).forEach(add);
      (p.rows || []).forEach((r) => { add(r.state); (r.items || []).forEach((it) => add(it.state)); });
    });
  }
  (Array.isArray(scene.aux) ? scene.aux : []).forEach((a) => addFrom(a && a.highlights));
  (scene.cells || []).forEach((c) => c && typeof c === 'object' && c.state && keys.add(c.state));
  (scene.buckets || []).forEach((b) => {
    if (b.state && HL_MEANING[b.state]) keys.add(b.state);
    (b.entries || []).forEach((e) => e.state && HL_MEANING[e.state] && keys.add(e.state));
  });
  return Object.keys(HL_MEANING).filter((k) => keys.has(k));
}

/**
 * Plain-language "how do I read this picture?" text for every scene kind.
 * Shown behind the "How to read" button on the canvas.
 */
export const READ_GUIDE = {
  array: {
    en: ['Each **box** is one slot in memory holding one value.', 'The small grey number under a box is its **index** (position). Counting starts at **0**.', 'Coloured tags like `i` or `lo` are **pointers** — names for a position the code is looking at.'],
    bn: ['প্রতিটা **বক্স** মেমরির একটা ঘর, যেখানে একটা মান থাকে।', 'বক্সের নিচের ছোট ধূসর সংখ্যা হলো **ইনডেক্স (index)** — অবস্থান। গোনা শুরু **0** থেকে।', '`i` বা `lo` এর মতো রঙিন ট্যাগ হলো **পয়েন্টার (pointer)** — কোড যে জায়গাটা দেখছে তার নাম।']
  },
  bars: {
    en: ['Each **bar** is one number — taller bar = bigger number.', 'The number under a bar is its **index** (position, from 0).', 'Watch the colours: when the bars climb evenly from left to right, the list is sorted.'],
    bn: ['প্রতিটা **বার** একটা সংখ্যা — উঁচু বার মানে বড় সংখ্যা।', 'বারের নিচের সংখ্যাটা **ইনডেক্স** (অবস্থান, 0 থেকে)।', 'রং খেয়াল করো: বাম থেকে ডানে বারগুলো সমানভাবে উঁচু হলে লিস্ট সাজানো হয়ে গেছে।']
  },
  linkedlist: {
    en: ['Each **box** is a node: it holds a value and an **arrow** to the next node.', '**head** is where the list starts — the only node we can reach directly.', 'The **∅ null** box means "no next node" — the end of the list.'],
    bn: ['প্রতিটা **বক্স** একটা নোড: এতে একটা মান আর পরের নোডের দিকে একটা **তীর** থাকে।', '**head** হলো লিস্টের শুরু — একমাত্র নোড যেটায় সরাসরি যাওয়া যায়।', '**∅ null** বক্স মানে "পরে আর কিছু নেই" — লিস্টের শেষ।']
  },
  stack: {
    en: ['Think of a **pile of plates**: you add and remove only at the **top**.', 'The bottom item went in first; the top item went in last.', '**push** = put on top · **pop** = take from top. Last In, First Out (LIFO).'],
    bn: ['ভাবো **প্লেটের স্তূপ**: শুধু **ওপরে (top)** রাখা আর তোলা যায়।', 'নিচের জিনিসটা সবার আগে ঢুকেছে; ওপরেরটা সবার শেষে।', '**push** = ওপরে রাখো · **pop** = ওপর থেকে তোলো। শেষে ঢুকলে আগে বের (LIFO)।']
  },
  queue: {
    en: ['Think of a **line at a shop**: people join at the **rear** (right) and leave from the **front** (left).', '**enqueue** = join the back · **dequeue** = leave from the front.', 'First In, First Out (FIFO) — nobody cuts the line.'],
    bn: ['ভাবো **দোকানের লাইন**: মানুষ **পেছনে (rear, ডানে)** যোগ দেয়, **সামনে (front, বামে)** থেকে বের হয়।', '**enqueue** = পেছনে যোগ দাও · **dequeue** = সামনে থেকে বের হও।', 'আগে এলে আগে যাবে (FIFO) — কেউ লাইন ভাঙে না।']
  },
  tree: {
    en: ['Each **circle** is a node. The one at the very top is the **root**.', 'Lines go from a **parent** down to its **children** (at most two: left and right).', 'Nodes with no children are **leaves**.'],
    bn: ['প্রতিটা **বৃত্ত** একটা নোড। একদম ওপরেরটা **রুট (root)**।', 'রেখাগুলো **প্যারেন্ট** থেকে নিচে তার **চাইল্ড**-এ যায় (সর্বোচ্চ দুটি: বাম ও ডান)।', 'যে নোডের কোনো চাইল্ড নেই সেটা **লিফ (leaf)**।']
  },
  graph: {
    en: ['Each **circle** is a node (a place, a person, a city…).', 'Each **line** (edge) means the two nodes are connected. An arrow means you can only go one way.', 'A number on a line is its **weight** — like distance or cost.'],
    bn: ['প্রতিটা **বৃত্ত** একটা নোড (একটা জায়গা, মানুষ, শহর…)।', 'প্রতিটা **রেখা (edge)** মানে দুই নোড যুক্ত। তীর থাকলে শুধু এক দিকে যাওয়া যায়।', 'রেখার ওপরের সংখ্যা হলো **ওজন (weight)** — যেমন দূরত্ব বা খরচ।']
  },
  hash: {
    en: ['A **hash function** turns a key into a bucket number — shown at the top.', 'Each **row** is a bucket. Keys that land in the same bucket line up in a chain.', 'Because we jump straight to one bucket, finding a key is usually instant.'],
    bn: ['**হ্যাশ ফাংশন** একটা কী (key)-কে বাকেট নম্বরে বদলায় — ওপরে দেখানো।', 'প্রতিটা **সারি** একটা বাকেট। একই বাকেটে পড়া কী-গুলো চেইনে সারি বাঁধে।', 'সরাসরি একটা বাকেটে লাফ দিই বলে খোঁজা সাধারণত মুহূর্তেই হয়।']
  },
  multiway: {
    en: ['Each **wide box** is one node holding **several sorted keys**.', 'Lines lead to children: keys smaller than the first key go left, bigger ones go right, in-between ones go in the middle.', 'When a node gets too full it **splits** and pushes its middle key up.'],
    bn: ['প্রতিটা **চওড়া বক্স** একটা নোড, যাতে **কয়েকটা সাজানো কী** থাকে।', 'রেখাগুলো চাইল্ডে যায়: প্রথম কী-র চেয়ে ছোট বামে, বড় ডানে, মাঝেরগুলো মাঝখানে।', 'নোড বেশি ভরে গেলে সেটা **ভাগ (split)** হয় আর মাঝের কী-টা ওপরে পাঠায়।']
  },
  chart: {
    en: ['Each **bar** shows how much work one approach needs.', 'Taller bar = more steps = slower.', 'Compare the heights, not the exact numbers.'],
    bn: ['প্রতিটা **বার** দেখায় একটা পদ্ধতিতে কত কাজ লাগে।', 'উঁচু বার = বেশি ধাপ = ধীর।', 'সঠিক সংখ্যা নয়, উচ্চতাগুলো তুলনা করো।']
  }
};
READ_GUIDE.bst = {
  en: ['Every node follows one rule: **smaller keys on the left, bigger keys on the right**.', 'The **orange ring** is where the algorithm is right now. It carries the key and walks down the edges; the edges it walked turn orange.', 'Press **▶ Play** to watch it move, or use **‹ ›** to go one move at a time. The line under the tree says what just happened.'],
  bn: ['প্রতিটা নোড একটা নিয়ম মানে: **ছোট কী বামে, বড় কী ডানে**।', '**কমলা রিং** দেখায় অ্যালগরিদম এখন কোথায়। এটা কী-টা নিয়ে এজ ধরে নিচে নামে; যে এজ দিয়ে গেছে সেগুলো কমলা হয়ে যায়।', 'চলতে দেখতে **▶ প্লে** চাপো, অথবা **‹ ›** দিয়ে এক এক ধাপ দেখো। ট্রির নিচের লাইনে লেখা থাকে এইমাত্র কী হলো।']
};
READ_GUIDE.graphx = {
  en: ['Each **circle** is a **vertex** (a place, a person, a task). Each **line** is an **edge** joining two vertices. An arrow means you may only go one way.', 'A number on an edge is its **weight** — think distance, time or cost.', 'The boxes under the graph are the algorithm\'s **memory** (queue, stack, arrays, tables). Watch them change together with the picture; the line at the bottom says what just happened.'],
  bn: ['প্রতিটা **বৃত্ত** একটা **ভার্টেক্স (vertex)** — একটা জায়গা, মানুষ বা কাজ। প্রতিটা **রেখা** একটা **এজ (edge)**, যা দুটো ভার্টেক্সকে জোড়ে। তীর থাকলে শুধু এক দিকে যাওয়া যায়।', 'এজের ওপরের সংখ্যা হলো **ওজন (weight)** — দূরত্ব, সময় বা খরচ ভাবো।', 'গ্রাফের নিচের বক্সগুলো অ্যালগরিদমের **মেমরি** (কিউ, স্ট্যাক, অ্যারে, টেবিল)। ছবির সঙ্গে এগুলোও কীভাবে বদলায় দেখো; একদম নিচের লাইনে লেখা থাকে এইমাত্র কী হলো।']
};
READ_GUIDE.forest = READ_GUIDE.tree;
READ_GUIDE['tree-memory'] = READ_GUIDE.tree;
