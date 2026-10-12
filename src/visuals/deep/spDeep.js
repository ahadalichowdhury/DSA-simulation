/* ------------------------------------------------------------------ *
 * Deep dives for the shortest-path lessons (Graphs chapter), in the order
 * shafaetsplanet.com teaches them:
 *
 * Dijkstra      — "a BFS that may update a vertex again": the plain-queue
 *                 version and why it wastes work; the priority-queue
 *                 version with lazy deletion; printing the path; stopping
 *                 early; cost; practice.
 * Bellman-Ford  — printing the path with parent[]; "at most k edges";
 *                 cost; practice.
 * Floyd-Warshall— the next[][] matrix and path printing; transitive
 *                 closure; review questions; cost; practice.
 * ------------------------------------------------------------------ */
import { adjOf } from '../graphData.js';
import { T, ek, fmt, scene, step, N, allEdges, keyOf, practiceStep } from './common.js';

const distPanel = (dist, hl = {}, label = T('dist[ ]', 'dist[ ]')) => ({ type: 'array', label, cells: dist.map(fmt), hl });
const subsOf = (dist) => Object.fromEntries(dist.map((d, i) => [i, fmt(d)]));
const pathEdges = (g, path, st) => Object.fromEntries(path.slice(1).map((v, i) => [keyOf(g, path[i], v), st]));

/* =================================================================== Dijkstra */

// with a plain FIFO queue vertex 1 and 3 are updated twice
const G_FIFO = {
  V: 4,
  directed: false,
  weighted: true,
  nodes: N([[0, 70, 160], [1, 300, 60], [2, 300, 270], [3, 520, 160]]),
  edges: [{ u: 0, v: 1, w: 5 }, { u: 0, v: 2, w: 1 }, { u: 2, v: 1, w: 1 }, { u: 1, v: 3, w: 1 }]
};

function fifoRun(g, s) {
  const adj = adjOf(g);
  const dist = Array(g.V).fill(Infinity);
  const updates = Array(g.V).fill(0);
  dist[s] = 0;
  const q = [s];
  const log = [];
  let pops = 0;
  while (q.length) {
    const u = q.shift();
    pops++;
    const changed = [];
    for (const { v, w } of adj[u]) if (dist[u] + w < dist[v]) { changed.push(`${v}: ${fmt(dist[v])} → ${dist[u] + w}`); dist[v] = dist[u] + w; updates[v]++; q.push(v); }
    log.push({ u, changed, dist: [...dist], q: [...q], updates: [...updates] });
  }
  return { log, pops, updates, dist };
}

function heapRun(g, s, { stopAt = null } = {}) {
  const adj = adjOf(g);
  const dist = Array(g.V).fill(Infinity);
  const parent = Array(g.V).fill(-1);
  dist[s] = 0;
  let heap = [{ d: 0, v: s }];
  const log = [];
  while (heap.length) {
    heap.sort((a, b) => a.d - b.d || a.v - b.v);
    const top = heap.shift();
    const before = [top, ...heap];
    if (top.d > dist[top.v]) { log.push({ kind: 'stale', top, heap: before, dist: [...dist] }); continue; }
    const changed = [];
    for (const { v, w } of adj[top.v]) {
      if (dist[top.v] + w < dist[v]) { changed.push({ v, old: dist[v], nw: dist[top.v] + w, w }); dist[v] = dist[top.v] + w; parent[v] = top.v; heap.push({ d: dist[v], v }); }
    }
    heap.sort((a, b) => a.d - b.d || a.v - b.v);
    log.push({ kind: 'pop', top, heap: before, after: [...heap], changed, dist: [...dist], parent: [...parent] });
    if (stopAt === top.v) break;
  }
  return { log, dist, parent };
}

export function dijkstraDeep(g, s, t) {
  const steps = [];
  const showHeap = (h) => h.map((x) => `(${fmt(x.d)}, ${x.v})`);

  // 1. the plain queue version
  const fifo = fifoRun(G_FIFO, 0);
  steps.push(step(
    T('Dijkstra is a BFS that may update a vertex again', 'ডায়াক্সট্রা হলো এমন BFS যে একটা ভার্টেক্স আবার আপডেট করতে পারে'),
    T(
      `Here is the simplest way to think of it. Take BFS and change one thing: instead of "visit each vertex once", push a vertex again **whenever its distance gets smaller**:\n\n\`\`\`\ndist[s] = 0; queue = [s]\nwhile queue not empty:\n    u = pop front\n    for (v, w) in adj[u]:\n        if dist[u] + w < dist[v]:     // relaxation\n            dist[v] = dist[u] + w\n            push v\n\`\`\`\n\nIt gives correct answers. But watch it on this little graph: the direct road 0–1 costs 5, the detour 0–2–1 costs only 2.`,
      `সবচেয়ে সহজভাবে এভাবে ভাবো। BFS নাও আর একটা জিনিস বদলাও: "প্রতিটা ভার্টেক্সে একবার" না, বরং **যখনই কোনো ভার্টেক্সের দূরত্ব কমে** তখনই তাকে আবার push করো:\n\n\`\`\`\ndist[s] = 0; queue = [s]\nwhile queue not empty:\n    u = pop front\n    for (v, w) in adj[u]:\n        if dist[u] + w < dist[v]:     // রিল্যাক্সেশন\n            dist[v] = dist[u] + w\n            push v\n\`\`\`\n\nউত্তর ঠিকই আসে। কিন্তু এই ছোট গ্রাফে দেখো: সরাসরি 0–1 রাস্তার খরচ 5, ঘুরপথ 0–2–1-এর খরচ মাত্র 2।`
    ),
    scene(G_FIFO, { nodeState: { 0: 'source' }, tags: { 0: 'start' }, subs: subsOf([0, Infinity, Infinity, Infinity]), status: T('plain queue (first in, first out)', 'সাধারণ queue (আগে এলে আগে যাবে)') })
  ));
  fifo.log.forEach((e, k) => {
    const again = e.changed.filter((c) => !c.includes('∞ →'));
    steps.push(step(
      T(`Plain queue: pop ${e.u}${again.length ? ' — an update AGAIN' : ''}`, `সাধারণ queue: pop ${e.u}${again.length ? ' — আবার আপডেট' : ''}`),
      T(
        `Pop **${e.u}** (dist ${fmt(e.dist[e.u])}). Updates: ${e.changed.length ? e.changed.join(', ') : 'none'}.${!again.length ? ` ${e.changed.length ? 'These vertices are pushed to the back of the queue.' : 'Nothing became shorter, so nothing is pushed.'} The queue serves vertices in the order they arrived, not by distance.` : ''}${again.length ? `\n\n**${again.join(', ')}** — a vertex that already had a distance got a better one. Everything we did with its old distance was **wasted** work, and it goes into the queue again.` : ''}${k === fifo.log.length - 1 ? `\n\nTotal: **${fifo.pops} pops** for ${G_FIFO.V} vertices. Vertex 1 was updated ${fifo.updates[1]}×, vertex 3 ${fifo.updates[3]}×. On bad graphs this blows up badly.` : ''}`,
        `**${e.u}** pop (dist ${fmt(e.dist[e.u])})। আপডেট: ${e.changed.length ? e.changed.join(', ') : 'কিছু না'}।${!again.length ? ` ${e.changed.length ? 'এই ভার্টেক্সগুলো queue-এর পেছনে ঢুকল।' : 'কিছুই ছোট হয়নি, তাই কিছু push হয় না।'} queue ভার্টেক্স দেয় যে ক্রমে এসেছে সেই ক্রমে, দূরত্ব দেখে না।` : ''}${again.length ? `\n\n**${again.join(', ')}** — যার আগেই একটা দূরত্ব ছিল, সে আরও ভালো একটা পেল। পুরনো দূরত্ব দিয়ে যা করেছিলাম সব **বৃথা** গেল, আর সে আবার queue-তে ঢুকল।` : ''}${k === fifo.log.length - 1 ? `\n\nমোট: ${G_FIFO.V}টা ভার্টেক্সে **${fifo.pops}বার pop**। ভার্টেক্স 1 আপডেট হয়েছে ${fifo.updates[1]} বার, ভার্টেক্স 3 ${fifo.updates[3]} বার। খারাপ গ্রাফে এটা ভয়ংকরভাবে বাড়ে।` : ''}`
      ),
      scene(G_FIFO, {
        nodeState: { [e.u]: 'current', ...Object.fromEntries(e.changed.map((c) => [Number(c.split(':')[0]), 'relax'])) },
        subs: subsOf(e.dist),
        panels: [{ type: 'queue', label: T('queue after this pop', 'এই pop-এর পরে queue'), items: e.q }, { type: 'array', label: T('how many times dist[v] was updated', 'dist[v] কতবার আপডেট হলো'), cells: e.updates.map(String), hl: Object.fromEntries(e.updates.map((x, i) => [i, x > 1 ? 'reject' : ''])) }],
        status: e.changed.length ? e.changed.join(' · ') : T('no update', 'আপডেট নেই')
      })
    ));
  });
  const heapSmall = heapRun(G_FIFO, 0);
  steps.push(step(
    T('The fix: always pop the closest vertex first', 'সমাধান: সবসময় সবচেয়ে কাছেরটা আগে pop করো'),
    T(
      `The waste came from popping 1 (distance 5) **before** 2 (distance 1). If we always pop the vertex with the **smallest distance**, then by the time a vertex is popped nothing can make it smaller any more — every other route goes through a vertex that is at least as far.\n\nOn the same graph with a priority queue: pops ${heapSmall.log.filter((x) => x.kind === 'pop').map((x) => x.top.v).join(' → ')}, every vertex finalised **once**.\n\nThat single change — a **min-priority queue** instead of a plain queue — is Dijkstra's algorithm.`,
      `অপচয় হয়েছে কারণ 2 (দূরত্ব 1)-এর **আগে** 1 (দূরত্ব 5) pop করেছি। যদি সবসময় **সবচেয়ে কম দূরত্বের** ভার্টেক্স pop করি, তাহলে একটা ভার্টেক্স pop হওয়ার সময় আর কিছুই তাকে ছোট করতে পারে না — অন্য প্রতিটা রুট এমন ভার্টেক্স দিয়ে যায় যেটা অন্তত ততটাই দূরে।\n\nএকই গ্রাফে প্রায়োরিটি কিউ দিয়ে: pop ক্রম ${heapSmall.log.filter((x) => x.kind === 'pop').map((x) => x.top.v).join(' → ')}, প্রতিটা ভার্টেক্স **একবারেই** চূড়ান্ত।\n\nএই একটা বদল — সাধারণ queue-এর বদলে **মিন-প্রায়োরিটি কিউ** — এটাই ডায়াক্সট্রার অ্যালগরিদম।`
    ),
    scene(G_FIFO, { nodeState: Object.fromEntries([0, 1, 2, 3].map((v) => [v, 'done'])), subs: subsOf(heapSmall.dist), edgeState: { '0-2': 'tree', '2-1': 'tree', '1-3': 'tree', '0-1': 'dim' }, status: T('each vertex popped once', 'প্রতিটা ভার্টেক্স একবার pop') })
  ));

  // 2. the priority-queue version on the lesson graph
  const run = heapRun(g, s);
  steps.push(step(
    T('The contest version: a heap with lazy deletion', 'কনটেস্টের ভার্সন: lazy deletion সহ হিপ'),
    T(
      `The code lesson above picked the closest vertex by **scanning** an array (O(V²)). Most real code uses a heap of pairs \`(distance, vertex)\`:\n\n\`\`\`\ndist[s] = 0; push (0, s)\nwhile heap not empty:\n    (d, u) = pop smallest\n    if d > dist[u]: continue       // an old, outdated entry\n    for (v, w) in adj[u]:\n        if dist[u] + w < dist[v]:\n            dist[v] = dist[u] + w\n            parent[v] = u\n            push (dist[v], v)\n\`\`\`\n\nWe never "decrease" an entry inside the heap; we push a **new** one and skip the old one later with \`d > dist[u]\`. Same graph as before, from ${s}:`,
      `ওপরের কোড লেসন সবচেয়ে কাছের ভার্টেক্স বেছেছিল একটা অ্যারে **স্ক্যান** করে (O(V²))। বাস্তবের বেশিরভাগ কোড \`(দূরত্ব, ভার্টেক্স)\` জোড়ার একটা হিপ ব্যবহার করে:\n\n\`\`\`\ndist[s] = 0; push (0, s)\nwhile heap not empty:\n    (d, u) = pop smallest\n    if d > dist[u]: continue       // পুরনো, বাতিল এন্ট্রি\n    for (v, w) in adj[u]:\n        if dist[u] + w < dist[v]:\n            dist[v] = dist[u] + w\n            parent[v] = u\n            push (dist[v], v)\n\`\`\`\n\nহিপের ভেতরের কোনো এন্ট্রি আমরা "কমাই" না; একটা **নতুন** এন্ট্রি push করি, আর পুরনোটা পরে \`d > dist[u]\` দিয়ে বাদ দিই। আগের গ্রাফেই, ${s} থেকে:`
    ),
    scene(g, { nodeState: { [s]: 'source' }, tags: { [s]: 'start' }, subs: subsOf(Array(g.V).fill(Infinity).map((x, i) => (i === s ? 0 : x))), panels: [{ type: 'queue', label: T('min-heap of (dist, vertex)', '(dist, ভার্টেক্স)-এর মিন-হিপ'), items: [`(0, ${s})`] }], status: `push (0, ${s})` })
  ));
  const done = new Set();
  for (const e of run.log) {
    if (e.kind === 'stale') {
      steps.push(step(
        T(`Pop (${e.top.d}, ${e.top.v}): outdated → skip`, `Pop (${e.top.d}, ${e.top.v}): পুরনো → বাদ`),
        T(
          `\`d > dist[u]\` → \`${e.top.d} > ${fmt(e.dist[e.top.v])}\` → **true**. This entry was pushed when ${e.top.v} was still ${e.top.d} away; later we found ${fmt(e.dist[e.top.v])}. Skip it — ${e.top.v} is already final.`,
          `\`d > dist[u]\` → \`${e.top.d} > ${fmt(e.dist[e.top.v])}\` → **true**। এই এন্ট্রিটা push হয়েছিল যখন ${e.top.v} ছিল ${e.top.d} দূরে; পরে আমরা ${fmt(e.dist[e.top.v])} পেয়েছি। বাদ দাও — ${e.top.v} আগেই চূড়ান্ত।`
        ),
        scene(g, { nodeState: { ...Object.fromEntries([...done].map((v) => [v, 'done'])), [e.top.v]: 'reject' }, subs: subsOf(e.dist), panels: [{ type: 'queue', label: T('min-heap (before the pop)', 'মিন-হিপ (pop-এর আগে)'), items: showHeap(e.heap), hl: { 0: 'reject' } }], status: `${e.top.d} > ${fmt(e.dist[e.top.v])} → skip` })
      ));
      continue;
    }
    done.add(e.top.v);
    const tree = Object.fromEntries([...done].filter((v) => e.parent[v] >= 0).map((v) => [keyOf(g, e.parent[v], v), 'tree']));
    steps.push(step(
      T(`Pop (${e.top.d}, ${e.top.v}): ${e.top.v} is final`, `Pop (${e.top.d}, ${e.top.v}): ${e.top.v} চূড়ান্ত`),
      T(
        `\`d > dist[u]\` → \`${e.top.d} > ${e.top.d}\` → false, so this entry is current: **dist[${e.top.v}] = ${e.top.d}** is final.\n\nRelax its edges: ${e.changed.length ? e.changed.map((c) => `\`${e.top.d} + ${c.w} < ${fmt(c.old)}\` → true → dist[${c.v}] = ${c.nw}, push (${c.nw}, ${c.v})`).join('; ') : 'nothing gets shorter'}.`,
        `\`d > dist[u]\` → \`${e.top.d} > ${e.top.d}\` → false, তাই এন্ট্রিটা হালনাগাদ: **dist[${e.top.v}] = ${e.top.d}** চূড়ান্ত।\n\nতার এজগুলো রিল্যাক্স করি: ${e.changed.length ? e.changed.map((c) => `\`${e.top.d} + ${c.w} < ${fmt(c.old)}\` → true → dist[${c.v}] = ${c.nw}, push (${c.nw}, ${c.v})`).join('; ') : 'কিছুই ছোট হয় না'}।`
      ),
      scene(g, {
        nodeState: { ...Object.fromEntries([...done].map((v) => [v, 'done'])), [e.top.v]: 'current', ...Object.fromEntries(e.changed.map((c) => [c.v, 'relax'])) },
        edgeState: { ...tree, ...Object.fromEntries(e.changed.map((c) => [keyOf(g, e.top.v, c.v), 'relax'])) },
        subs: subsOf(e.dist),
        panels: [{ type: 'queue', label: T('min-heap (after pushing)', 'মিন-হিপ (push-এর পরে)'), items: showHeap(e.after) }, distPanel(e.dist, { [e.top.v]: 'done' })],
        status: `dist[${e.top.v}] = ${e.top.d} ✓`
      })
    ));
  }

  // 3. path printing
  const path = [];
  for (let v = t; v !== -1; v = run.parent[v]) path.push(v);
  path.reverse();
  steps.push(step(
    T(`Printing the shortest path ${s} → ${t}`, `সবচেয়ে ছোট পথ প্রিন্ট: ${s} → ${t}`),
    T(
      `Exactly like BFS: every time we improved \`dist[v]\` we also wrote \`parent[v] = u\`. Walk back from ${t}:\n\n${path.slice().reverse().map((v) => `\`parent[${v}] = ${run.parent[v]}\``).join(' → ')}\n\nReversed: **${path.join(' → ')}**, length **${run.dist[t]}**. The green edges (all parent links together) form the **shortest-path tree** from ${s}.`,
      `হুবহু BFS-এর মতো: যতবার \`dist[v]\` ভালো করেছি, ততবার \`parent[v] = u\`-ও লিখেছি। ${t} থেকে উল্টো হাঁটো:\n\n${path.slice().reverse().map((v) => `\`parent[${v}] = ${run.parent[v]}\``).join(' → ')}\n\nউল্টে নিলে: **${path.join(' → ')}**, দৈর্ঘ্য **${run.dist[t]}**। সবুজ এজগুলো (সব parent লিংক মিলে) হলো ${s} থেকে **শর্টেস্ট-পাথ ট্রি (shortest-path tree)**।`
    ),
    scene(g, {
      nodeState: Object.fromEntries(path.map((v) => [v, 'relax'])),
      edgeState: { ...allEdges(g, 'dim'), ...Object.fromEntries([...Array(g.V).keys()].filter((v) => run.parent[v] >= 0).map((v) => [keyOf(g, run.parent[v], v), 'tree'])), ...pathEdges(g, path, 'relax') },
      subs: subsOf(run.dist),
      tags: { [s]: 'start', [t]: 'goal' },
      panels: [{ type: 'array', label: T('parent[ ]', 'parent[ ]'), cells: run.parent.map(String) }, { type: 'output', label: T('the route', 'রুট'), items: path }],
      status: `${path.join(' → ')} = ${run.dist[t]}`
    })
  ));

  // 4. early stop, negative edges, cost
  const early = heapRun(g, s, { stopAt: path[Math.max(1, Math.floor(path.length / 2))] });
  const mid = path[Math.max(1, Math.floor(path.length / 2))];
  steps.push(step(
    T('Only one target? Stop when it is popped', 'লক্ষ্য একটাই? সেটা pop হলেই থামো'),
    T(
      `If the question is only "how far is **${mid}**?", you can \`break\` the moment ${mid} comes out of the heap (not when it is pushed — a pushed distance can still improve). Popped vertices so far: ${early.log.filter((x) => x.kind === 'pop').map((x) => x.top.v).join(', ')} — the rest of the graph is never finished.\n\n**Do not** use Dijkstra with **negative** edges: a popped vertex is supposed to be final, but a negative edge found later could make it smaller (see the ideas lesson). With a negative **cycle** the plain-queue version above even loops forever. Use Bellman-Ford there.\n\n**Cost:** every edge can push one entry → at most E entries, each push/pop O(log E) → **O((V + E) log V)**. V = 10⁵, E = 2·10⁵ → about 5·10⁶ steps.`,
      `প্রশ্ন যদি শুধু হয় "**${mid}** কত দূরে?", তাহলে ${mid} হিপ থেকে **বের হওয়ার** মুহূর্তেই \`break\` করতে পারো (push-এর সময় না — push হওয়া দূরত্ব এখনো কমতে পারে)। এ পর্যন্ত pop হয়েছে: ${early.log.filter((x) => x.kind === 'pop').map((x) => x.top.v).join(', ')} — বাকি গ্রাফ শেষই করা লাগে না।\n\n**নেগেটিভ** এজে ডায়াক্সট্রা **চালাবে না**: pop হওয়া ভার্টেক্সকে চূড়ান্ত ধরা হয়, কিন্তু পরে পাওয়া কোনো নেগেটিভ এজ তাকে আরও ছোট করে দিতে পারে (আইডিয়া লেসনে দেখেছ)। নেগেটিভ **সাইকেল** থাকলে ওপরের সাধারণ-queue ভার্সন তো চিরকাল ঘুরতেই থাকে। সেখানে বেলম্যান-ফোর্ড।\n\n**খরচ:** প্রতিটা এজ একটা এন্ট্রি push করতে পারে → সর্বোচ্চ Eটা এন্ট্রি, প্রতিটা push/pop O(log E) → **O((V + E) log V)**। V = 10⁵, E = 2·10⁵ → মোটামুটি 5·10⁶টা কাজ।`
    ),
    scene(g, { nodeState: { ...Object.fromEntries(early.log.filter((x) => x.kind === 'pop').map((x) => [x.top.v, 'done'])), [mid]: 'current' }, subs: subsOf(early.dist), tags: { [s]: 'start', [mid]: 'target' }, status: T(`${mid} popped → break`, `${mid} pop হলো → break`) })
  ));
  steps.push(practiceStep(
    g,
    T('Practice problems', 'প্র্যাকটিস প্রবলেম'),
    T(
      'Write the heap version with `parent[]` from memory, print the path, and test it on this graph (answer for 0 → 5: ' + path.join(' → ') + '). Then:',
      'মুখস্থ থেকে `parent[]`সহ হিপ ভার্সন লেখো, পাথ প্রিন্ট করো, আর এই গ্রাফে টেস্ট করো (0 → 5-এর উত্তর: ' + path.join(' → ') + ')। তারপর:'
    ),
    [
      ['Codeforces 20C — Dijkstra?', 'shortest path + print it, big input', 'সবচেয়ে ছোট পথ + প্রিন্ট, বড় ইনপুট'],
      ['UVa 10986 — Sending email', 'plain Dijkstra with a heap', 'হিপসহ সোজা ডায়াক্সট্রা'],
      ['LightOJ 1099 — Not the Best', 'the second shortest path', 'দ্বিতীয় সবচেয়ে ছোট পথ'],
      ['LightOJ 1281 — New Traffic System', 'state = (vertex, new roads used)', 'স্টেট = (ভার্টেক্স, কয়টা নতুন রাস্তা নেওয়া হলো)']
    ],
    { edgeState: Object.fromEntries([...Array(g.V).keys()].filter((v) => run.parent[v] >= 0).map((v) => [keyOf(g, run.parent[v], v), 'tree'])), subs: subsOf(run.dist) }
  ));
  return steps;
}

/* =================================================================== Bellman-Ford */

export function bellmanDeep(g, s, t) {
  const dist = Array(g.V).fill(Infinity);
  const parent = Array(g.V).fill(-1);
  dist[s] = 0;
  let passes = 0;
  for (let p = 1; p < g.V; p++) {
    let changed = false;
    for (const e of g.edges) if (dist[e.u] !== Infinity && dist[e.u] + e.w < dist[e.v]) { dist[e.v] = dist[e.u] + e.w; parent[e.v] = e.u; changed = true; }
    passes = p;
    if (!changed) break;
  }
  const path = [];
  for (let v = t; v !== -1; v = parent[v]) path.push(v);
  path.reverse();
  // at most k edges: copy dist before every pass
  const k = 2;
  let lim = Array(g.V).fill(Infinity);
  lim[s] = 0;
  for (let p = 0; p < k; p++) {
    const prev = [...lim];
    for (const e of g.edges) if (prev[e.u] !== Infinity && prev[e.u] + e.w < lim[e.v]) lim[e.v] = prev[e.u] + e.w;
  }
  const tree = Object.fromEntries([...Array(g.V).keys()].filter((v) => parent[v] >= 0).map((v) => [ek(parent[v], v), 'tree']));
  const V = g.V;
  const E = g.edges.length;
  return [
    step(
      T(`Printing the path ${s} → ${t}`, `পাথ প্রিন্ট: ${s} → ${t}`),
      T(
        `Same trick as BFS and Dijkstra: whenever an edge u → v makes \`dist[v]\` smaller, also write \`parent[v] = u\`. The last write wins, and the last write belongs to the best route.\n\nWalking back from ${t}: ${path.slice().reverse().map((v) => `parent[${v}] = ${parent[v]}`).join(', ')}.\n\nRoute: **${path.join(' → ')}**, cost **${dist[t]}** — notice it uses negative edges on purpose.\n\n> With a negative cycle reachable on the way, parent[] can itself form a loop — so only print paths after the check pass said "no negative cycle".`,
        `BFS আর ডায়াক্সট্রার একই কৌশল: যখনই u → v এজ \`dist[v]\` ছোট করে, সাথে \`parent[v] = u\`-ও লেখো। শেষ লেখাটাই থাকে, আর শেষ লেখাটাই সেরা রুটের।\n\n${t} থেকে উল্টো হাঁটলে: ${path.slice().reverse().map((v) => `parent[${v}] = ${parent[v]}`).join(', ')}।\n\nরুট: **${path.join(' → ')}**, খরচ **${dist[t]}** — খেয়াল করো, ইচ্ছা করেই নেগেটিভ এজ ব্যবহার করছে।\n\n> পথে নেগেটিভ সাইকেল থাকলে parent[] নিজেই একটা লুপ হয়ে যেতে পারে — তাই চেক পাস "নেগেটিভ সাইকেল নেই" বললে তবেই পাথ প্রিন্ট করো।`
      ),
      scene(g, { nodeState: Object.fromEntries(path.map((v) => [v, 'relax'])), edgeState: { ...allEdges(g, 'dim'), ...tree, ...pathEdges(g, path, 'relax') }, subs: subsOf(dist), tags: { [s]: 'start', [t]: 'goal' }, panels: [{ type: 'array', label: T('parent[ ]', 'parent[ ]'), cells: parent.map(String) }, { type: 'output', label: T('the route', 'রুট'), items: path }], status: `${path.join(' → ')} = ${dist[t]}` })
    ),
    step(
      T(`Variant: at most ${k} edges`, `ভ্যারিয়েন্ট: সর্বোচ্চ ${k}টা এজ`),
      T(
        `Bellman-Ford has a hidden meaning: after pass p, dist[v] is at most the best route that uses **≤ p edges**. Some problems ask exactly that ("at most k flights").\n\nBut inside one pass a lucky edge order can chain several edges together, so you must read from a **copy** made before the pass:\n\n\`\`\`\nrepeat k times:\n    prev = copy of dist\n    for each edge (u, v, w):\n        if prev[u] + w < dist[v]: dist[v] = prev[u] + w\n\`\`\`\n\nWith k = ${k} from ${s}: \`[${lim.map(fmt).join(', ')}]\`. Compare with the unlimited answer \`[${dist.map(fmt).join(', ')}]\` — some vertices are farther (or ∞) because their best route needs more than ${k} edges.`,
        `বেলম্যান-ফোর্ডের একটা লুকানো অর্থ আছে: p নম্বর পাসের পরে dist[v] সর্বোচ্চ **≤ pটা এজ** ব্যবহার করা সেরা রুটের সমান। কিছু প্রবলেম ঠিক এটাই চায় ("সর্বোচ্চ kটা ফ্লাইট")।\n\nকিন্তু এক পাসের ভেতরেই ভাগ্যক্রমে এজের ক্রম কয়েকটা এজ জুড়ে দিতে পারে, তাই পাসের আগে বানানো একটা **কপি** থেকে পড়তে হয়:\n\n\`\`\`\nrepeat k times:\n    prev = copy of dist\n    for each edge (u, v, w):\n        if prev[u] + w < dist[v]: dist[v] = prev[u] + w\n\`\`\`\n\n${s} থেকে k = ${k} হলে: \`[${lim.map(fmt).join(', ')}]\`। সীমাহীন উত্তর \`[${dist.map(fmt).join(', ')}]\`-এর সাথে মেলাও — কিছু ভার্টেক্স দূরে (বা ∞), কারণ তাদের সেরা রুটে ${k}টার বেশি এজ লাগে।`
      ),
      scene(g, { nodeState: Object.fromEntries(lim.map((d, i) => [i, d === dist[i] ? 'done' : 'compare'])), subs: subsOf(lim), tags: { [s]: 'start' }, panels: [distPanel(lim, Object.fromEntries(lim.map((d, i) => [i, d === dist[i] ? '' : 'compare'])), T(`dist with ≤ ${k} edges`, `≤ ${k} এজে dist`)), distPanel(dist, {}, T('dist with any number of edges', 'যত খুশি এজে dist'))], status: T(`orange = needs more than ${k} edges`, `কমলা = ${k}টার বেশি এজ লাগে`) })
    ),
    step(
      T('Cost: O(V · E), and when to use it', 'খরচ: O(V · E), আর কখন ব্যবহার করবে'),
      T(
        `Up to V − 1 passes, each over all E edges → **O(V · E)**. Here at most ${V - 1} × ${E} = ${(V - 1) * E} relax checks; the early stop finished after **${passes}** passes.\n\nCompare: V = 10⁴, E = 10⁵ → Bellman-Ford ~10⁹ (too slow), Dijkstra ~2·10⁶. So:\n- all weights ≥ 0 → **Dijkstra**;\n- some negative edges, or you must **detect a negative cycle** → **Bellman-Ford**;\n- the problem says "at most k edges" → Bellman-Ford with k passes and a copy.\n\nA negative cycle is detected by one extra pass: if anything still gets shorter, a cycle is reachable. To list **which** vertices are affected, mark every vertex that is still relaxed and everything reachable from them.`,
        `সর্বোচ্চ V − 1টা পাস, প্রতিটায় সব Eটা এজ → **O(V · E)**। এখানে সর্বোচ্চ ${V - 1} × ${E} = ${(V - 1) * E}টা রিল্যাক্স চেক; আগে-থামা কৌশলে **${passes}**টা পাসেই শেষ।\n\nতুলনা করো: V = 10⁴, E = 10⁵ → বেলম্যান-ফোর্ড ~10⁹ (অনেক ধীর), ডায়াক্সট্রা ~2·10⁶। তাই:\n- সব ওজন ≥ 0 → **ডায়াক্সট্রা**;\n- কিছু নেগেটিভ এজ আছে, বা **নেগেটিভ সাইকেল ধরতে** হবে → **বেলম্যান-ফোর্ড**;\n- প্রবলেম বলে "সর্বোচ্চ kটা এজ" → k পাস আর কপিসহ বেলম্যান-ফোর্ড।\n\nনেগেটিভ সাইকেল ধরা পড়ে একটা বাড়তি পাসে: তখনও কিছু ছোট হলে একটা সাইকেলে পৌঁছানো যায়। **কোন কোন** ভার্টেক্স প্রভাবিত তা জানতে, যারা তখনও রিল্যাক্স হয় তাদের আর তাদের থেকে যেখানে যাওয়া যায় সবাইকে চিহ্নিত করো।`
      ),
      scene(g, { nodeState: Object.fromEntries(dist.map((_, i) => [i, 'done'])), edgeState: tree, subs: subsOf(dist), status: T(`${passes} passes × ${E} edges`, `${passes}টা পাস × ${E}টা এজ`) })
    ),
    practiceStep(
      g,
      T('Practice problems', 'প্র্যাকটিস প্রবলেম'),
      T(
        'Write Bellman-Ford with the early stop, the extra check pass and parent[]. Make up a graph with a negative cycle and check that your program says so. Then:',
        'আগে-থামা, বাড়তি চেক পাস আর parent[]সহ বেলম্যান-ফোর্ড লেখো। নেগেটিভ সাইকেলওয়ালা একটা গ্রাফ বানিয়ে দেখো তোমার প্রোগ্রাম সেটা বলে কিনা। তারপর:'
      ),
      [
        ['UVa 558 — Wormholes', 'is there a negative cycle?', 'নেগেটিভ সাইকেল আছে কি?'],
        ['UVa 10449 — Traffic', 'negative edges + which vertices are spoiled by a cycle', 'নেগেটিভ এজ + কোন ভার্টেক্স সাইকেলে নষ্ট'],
        ['LightOJ 1108 — Instant View of Big Bang', 'print every vertex that can reach a negative cycle', 'যে ভার্টেক্স থেকে নেগেটিভ সাইকেলে যাওয়া যায় সব প্রিন্ট'],
        ['UVa 11280 — Flying to Fredericton', 'cheapest route with at most k stops', 'সর্বোচ্চ k স্টপে সবচেয়ে সস্তা রুট']
      ],
      { edgeState: tree, subs: subsOf(dist) }
    )
  ];
}

/* =================================================================== Floyd-Warshall */

export function floydDeep(g, from, to) {
  const V = g.V;
  const D = Array.from({ length: V }, (_, i) => Array.from({ length: V }, (_, j) => (i === j ? 0 : Infinity)));
  const next = Array.from({ length: V }, () => Array(V).fill(-1));
  for (let i = 0; i < V; i++) next[i][i] = i;
  for (const e of g.edges) { D[e.u][e.v] = e.w; next[e.u][e.v] = e.v; }
  const next0 = next.map((r) => [...r]);
  for (let k = 0; k < V; k++) for (let i = 0; i < V; i++) for (let j = 0; j < V; j++) {
    if (D[i][k] + D[k][j] < D[i][j]) { D[i][j] = D[i][k] + D[k][j]; next[i][j] = next[i][k]; }
  }
  const idx = [...Array(V).keys()];
  const nfmt = (x) => (x === -1 ? '·' : String(x));
  const nextPanel = (m, label, hl = {}) => ({ type: 'matrix', label, rows: idx, cols: idx, cells: m.map((r) => r.map(nfmt)), corner: 'i\\j', hl });
  const steps = [];

  steps.push(step(
    T('Which way? A second matrix: next[i][j]', 'কোন পথে? দ্বিতীয় একটা ম্যাট্রিক্স: next[i][j]'),
    T(
      `D[i][j] tells **how far**, not **which way**. Keep one more matrix: \`next[i][j]\` = the **first vertex to go to** when you walk from i to j on the best route.\n\n- Start: \`next[i][j] = j\` for every edge i → j (go straight there), \`next[i][i] = i\`, and "none" (·) otherwise.\n- Inside the triple loop, when the route through k wins, the first step towards j becomes the first step towards k:\n\n\`\`\`\nif D[i][k] + D[k][j] < D[i][j]:\n    D[i][j]    = D[i][k] + D[k][j]\n    next[i][j] = next[i][k]\n\`\`\``,
      `D[i][j] বলে **কত দূর**, **কোন পথে** না। আরও একটা ম্যাট্রিক্স রাখো: \`next[i][j]\` = সেরা রুটে i থেকে j-তে হাঁটলে **প্রথমে কোন ভার্টেক্সে যাবে**।\n\n- শুরুতে: প্রতিটা এজ i → j-এর জন্য \`next[i][j] = j\` (সোজা সেখানে যাও), \`next[i][i] = i\`, আর বাকি সব "নেই" (·)।\n- তিন লুপের ভেতরে, যখন k দিয়ে যাওয়া রুট জেতে, তখন j-এর দিকে প্রথম ধাপ হয়ে যায় k-এর দিকে প্রথম ধাপ:\n\n\`\`\`\nif D[i][k] + D[k][j] < D[i][j]:\n    D[i][j]    = D[i][k] + D[k][j]\n    next[i][j] = next[i][k]\n\`\`\``
    ),
    scene(g, { panels: [nextPanel(next0, T('next[ ][ ] at the start', 'শুরুতে next[ ][ ]'))], status: T('next[i][j] = j for every edge', 'প্রতিটা এজে next[i][j] = j') })
  ));
  steps.push(step(
    T('next[ ][ ] after the triple loop', 'তিন লুপের পরে next[ ][ ]'),
    T(
      `After all V rounds of k, every cell is filled. Changed cells are highlighted: for those, the best route is **not** the direct edge.\n\nFor example \`D[${from}][${to}] = ${fmt(D[from][to])}\` and \`next[${from}][${to}] = ${next[from][to]}\`: to go from ${from} to ${to}, **first** walk to ${next[from][to]}. Let us follow it.`,
      `k-এর Vটা রাউন্ড শেষে প্রতিটা ঘর ভরে গেছে। যে ঘরগুলো বদলেছে সেগুলো আলাদা রঙে: সেখানে সেরা রুট সরাসরি এজ **না**।\n\nযেমন \`D[${from}][${to}] = ${fmt(D[from][to])}\` আর \`next[${from}][${to}] = ${next[from][to]}\`: ${from} থেকে ${to}-এ যেতে **প্রথমে** ${next[from][to]}-এ হাঁটো। চলো সেটা ধরে এগোই।`
    ),
    scene(g, { panels: [nextPanel(next, T('next[ ][ ] at the end', 'শেষে next[ ][ ]'), Object.fromEntries(idx.flatMap((i) => idx.map((j) => [`${i},${j}`, next[i][j] !== next0[i][j] ? 'relax' : ''])).filter(([, v]) => v)))], status: `next[${from}][${to}] = ${next[from][to]}` })
  ));
  const walk = [from];
  for (let u = from; u !== to;) { u = next[u][to]; walk.push(u); }
  walk.forEach((u, k) => {
    if (k === walk.length - 1) return;
    const nx = next[u][to];
    steps.push(step(
      T(`Walk ${from} → ${to}: at ${u}, next[${u}][${to}] = ${nx}`, `${from} → ${to} হাঁটা: ${u}-এ, next[${u}][${to}] = ${nx}`),
      T(
        `We stand on **${u}**. \`next[${u}][${to}]\` = **${nx}** → step to ${nx}.${nx !== to ? ` We have not arrived at ${to} yet, so we look up the same column again from the new vertex: next[${nx}][${to}].` : ''}${nx === to ? `\n\nWe reached ${to}. Route: **${walk.join(' → ')}**, cost ${walk.slice(1).map((v, i) => g.edges.find((e) => e.u === walk[i] && e.v === v).w).join(' + ')} = **${fmt(D[from][to])}** = D[${from}][${to}] ✓\n\n\`\`\`\npath(i, j):\n    if next[i][j] == -1: no path\n    print i\n    while i != j: i = next[i][j]; print i\n\`\`\`` : ''}`,
        `আমরা আছি **${u}**-এ। \`next[${u}][${to}]\` = **${nx}** → ${nx}-এ যাও।${nx !== to ? ` এখনো ${to}-এ পৌঁছাইনি, তাই নতুন ভার্টেক্স থেকে একই কলাম আবার দেখি: next[${nx}][${to}]।` : ''}${nx === to ? `\n\n${to}-এ পৌঁছে গেলাম। রুট: **${walk.join(' → ')}**, খরচ ${walk.slice(1).map((v, i) => g.edges.find((e) => e.u === walk[i] && e.v === v).w).join(' + ')} = **${fmt(D[from][to])}** = D[${from}][${to}] ✓\n\n\`\`\`\npath(i, j):\n    if next[i][j] == -1: no path\n    print i\n    while i != j: i = next[i][j]; print i\n\`\`\`` : ''}`
      ),
      scene(g, {
        nodeState: { ...Object.fromEntries(walk.slice(0, k + 1).map((v) => [v, 'relax'])), [u]: 'current', [to]: nx === to ? 'done' : 'compare' },
        edgeState: { ...allEdges(g, 'dim'), ...Object.fromEntries(walk.slice(1, k + 2).map((v, i) => [ek(walk[i], v), 'relax'])) },
        tags: { [from]: 'from', [to]: 'to' },
        panels: [nextPanel(next, T('next[ ][ ]', 'next[ ][ ]'), { [`${u},${to}`]: 'relax' }), { type: 'output', label: T('route so far', 'এ পর্যন্ত রুট'), items: walk.slice(0, k + 2), fresh: true }],
        status: `next[${u}][${to}] = ${nx}`
      })
    ));
  });

  // transitive closure
  const R = Array.from({ length: V }, (_, i) => Array.from({ length: V }, (_, j) => (i === j || g.edges.some((e) => e.u === i && e.v === j) ? 1 : 0)));
  const R0 = R.map((r) => [...r]);
  for (let k = 0; k < V; k++) for (let i = 0; i < V; i++) for (let j = 0; j < V; j++) R[i][j] = R[i][j] || (R[i][k] && R[k][j]) ? 1 : 0;
  steps.push(step(
    T('Variant: only "can I get there?" (transitive closure)', 'ভ্যারিয়েন্ট: শুধু "যাওয়া যায় কি?" (ট্রানজিটিভ ক্লোজার)'),
    T(
      `Sometimes distances do not matter, only **reachability**. Put 1 where an edge exists (and on the diagonal), 0 elsewhere, and replace "min of sums" by "or of ands":\n\n\`\`\`\nreach[i][j] = reach[i][j] || (reach[i][k] && reach[k][j])\n\`\`\`\n\n"i can reach j if it already could, **or** if i reaches k **and** k reaches j." Same three loops, same O(V³), but only bits — with bitsets it runs about 64 times faster.\n\nOn this graph every vertex can reach every other one (it is strongly connected), so the matrix becomes all 1s. Before: ${R0.flat().filter((x) => !x).length} zeros.`,
      `কখনো দূরত্ব লাগে না, শুধু **পৌঁছানো যায় কিনা (reachability)**। যেখানে এজ আছে (আর কর্ণে) 1 বসাও, বাকি সব 0, আর "যোগফলের min"-এর বদলে লেখো "and-এর or":\n\n\`\`\`\nreach[i][j] = reach[i][j] || (reach[i][k] && reach[k][j])\n\`\`\`\n\n"i থেকে j-তে যাওয়া যায় যদি আগে থেকেই যেত, **অথবা** i থেকে k-তে **আর** k থেকে j-তে যাওয়া যায়।" একই তিন লুপ, একই O(V³), কিন্তু শুধু বিট — bitset দিয়ে প্রায় 64 গুণ দ্রুত চলে।\n\nএই গ্রাফে প্রতিটা ভার্টেক্স থেকে বাকি সবগুলোতে যাওয়া যায় (এটা strongly connected), তাই ম্যাট্রিক্স পুরোটাই 1 হয়ে যায়। আগে ছিল ${R0.flat().filter((x) => !x).length}টা শূন্য।`
    ),
    scene(g, { panels: [
      { type: 'matrix', label: T('reach before', 'আগে reach'), rows: idx, cols: idx, cells: R0.map((r) => r.map(String)), corner: 'i\\j' },
      { type: 'matrix', label: T('reach after', 'পরে reach'), rows: idx, cols: idx, cells: R.map((r) => r.map(String)), corner: 'i\\j', hl: Object.fromEntries(idx.flatMap((i) => idx.map((j) => [`${i},${j}`, R[i][j] !== R0[i][j] ? 'relax' : ''])).filter(([, v]) => v)) }
    ], status: T('min/+ → or/and', 'min/+ → or/and') })
  ));
  steps.push(step(
    T('Questions to think about', 'ভেবে দেখার মতো প্রশ্ন'),
    T(
      `**1. Can the k loop go inside?** No. Round k assumes that D already holds the best routes using stops 0 … k − 1 for **every** pair. If k is the innermost loop, D[i][k] and D[k][j] are read before they are ready, and some routes are missed. k must be the **outer** loop.\n\n**2. Negative edges?** Allowed — Floyd-Warshall never "finalises" anything early.\n\n**3. Negative cycle?** After the loops, if some \`D[i][i] < 0\`, vertex i lies on a negative cycle (going round it makes the way home negative).\n\n**4. How big can V be?** V³ steps: V = 100 → 10⁶, V = 400 → 6.4·10⁷ (fine), V = 1000 → 10⁹ (too slow). Use it when V is small and you need **many** pairs.`,
      `**১. k-এর লুপ কি ভেতরে যেতে পারে?** না। রাউন্ড k ধরে নেয় যে **প্রতিটা** জোড়ার জন্য D-তে আগেই 0 … k − 1 স্টপ দিয়ে সেরা রুট আছে। k সবচেয়ে ভেতরের লুপ হলে D[i][k] আর D[k][j] তৈরি হওয়ার আগেই পড়া হয়, ফলে কিছু রুট বাদ পড়ে। k-কে **বাইরের** লুপ হতেই হবে।\n\n**২. নেগেটিভ এজ?** চলবে — ফ্লয়েড-ওয়ার্শাল আগেভাগে কিছু "চূড়ান্ত" করে না।\n\n**৩. নেগেটিভ সাইকেল?** লুপ শেষে কোনো \`D[i][i] < 0\` হলে ভার্টেক্স i একটা নেগেটিভ সাইকেলে আছে (সেটা ঘুরে বাড়ি ফেরার খরচ নেগেটিভ)।\n\n**৪. V কত বড় হতে পারে?** V³টা কাজ: V = 100 → 10⁶, V = 400 → 6.4·10⁷ (ঠিক আছে), V = 1000 → 10⁹ (অনেক ধীর)। V ছোট আর **অনেকগুলো** জোড়ার উত্তর লাগলে এটা ব্যবহার করো।`
    ),
    { kind: 'chart', label: T('V³ steps', 'V³টা কাজ'), max: 1000, items: [{ label: 'V=100', v: 1, color: 'var(--green)', note: '10⁶' }, { label: 'V=400', v: 64, color: 'var(--green)', note: '6.4·10⁷' }, { label: 'V=1000', v: 1000, color: 'var(--red)', note: '10⁹' }], caption: T('about 10⁸ simple steps fit in one second', 'এক সেকেন্ডে মোটামুটি 10⁸টা সাধারণ কাজ') }
  ));
  steps.push(practiceStep(
    g,
    T('Practice problems', 'প্র্যাকটিস প্রবলেম'),
    T('Write Floyd-Warshall with next[][] and print the route for every pair of this graph. Then:', 'next[][]সহ ফ্লয়েড-ওয়ার্শাল লেখো, আর এই গ্রাফের প্রতিটা জোড়ার রুট প্রিন্ট করো। তারপর:'),
    [
      ['UVa 821 — Page Hopping', 'average of all-pairs distances', 'সব জোড়ার দূরত্বের গড়'],
      ['UVa 11015 — 05-2 Rendezvous', 'pick the vertex with the smallest total distance', 'মোট দূরত্ব সবচেয়ে কম এমন ভার্টেক্স বাছো'],
      ['UVa 523 — Minimum Transport Cost', 'all pairs + print the path', 'সব জোড়া + পাথ প্রিন্ট'],
      ['UVa 10246 — Asterix and Obelix', 'Floyd with an extra "most expensive city" cost', 'বাড়তি "সবচেয়ে দামি শহর" খরচসহ ফ্লয়েড']
    ]
  ));
  return steps;
}
