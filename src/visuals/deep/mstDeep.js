/* ------------------------------------------------------------------ *
 * Deep dives for Prim and Kruskal (Graphs chapter), in the order
 * shafaetsplanet.com teaches them:
 *
 * Prim    — the faster version with a priority queue (lazy deletion),
 *           run on the lesson graph; cost; which version when; practice.
 * Kruskal — the disjoint set (union-find) explained on its own: the
 *           friends story, parent[], find, union, path compression,
 *           union by size; why we stop at V − 1 edges; maximum spanning
 *           tree and second-best MST; practice.
 * ------------------------------------------------------------------ */
import { adjOf } from '../graphData.js';
import { T, ek, scene, step, N, allEdges, keyOf, practiceStep } from './common.js';

/* =================================================================== Prim with a heap */

export function primHeapDeep(g) {
  const adj = adjOf(g);
  const inTree = Array(g.V).fill(false);
  const steps = [];
  let heap = [{ w: 0, v: 0, from: -1 }];
  const sortHeap = () => heap.sort((a, b) => a.w - b.w || a.v - b.v);
  const chosen = [];
  let total = 0;
  const show = (h) => h.map((x) => `(${x.w}, ${x.v})`);
  const treeEdges = () => Object.fromEntries(chosen.map(([a, b]) => [keyOf(g, a, b), 'tree']));

  steps.push(step(
    T('Faster Prim: let a heap find the cheapest edge', 'দ্রুত প্রিম: সবচেয়ে সস্তা এজ খুঁজুক একটা হিপ'),
    T(
      `The code above scans **all** V vertices every round to find the smallest key → V rounds × V = **O(V²)**. For V = 10⁵ that is 10¹⁰ steps — far too slow.\n\nThe usual contest version keeps the candidate edges in a **min-priority queue (min-heap)**. It always hands back the cheapest one in O(log n):\n\n\`\`\`\npush (0, start)\nwhile heap not empty:\n    (w, v) = pop smallest\n    if inTree[v]: continue        // old entry, skip it\n    inTree[v] = true; total += w\n    for each (x, wx) in adj[v]:\n        if not inTree[x]: push (wx, x)\n\`\`\`\n\nWe never delete old entries; we just **skip** them when they come out ("lazy deletion"). Let us run it on the same graph. (The heap is drawn sorted so you can read it; inside it is a tree.)`,
      `ওপরের কোড সবচেয়ে ছোট key খুঁজতে প্রতি রাউন্ডে **সব** Vটা ভার্টেক্স দেখে → Vটা রাউন্ড × V = **O(V²)**। V = 10⁵ হলে 10¹⁰টা কাজ — অনেক বেশি ধীর।\n\nকনটেস্টে সাধারণত যে ভার্সন লেখা হয়, সেটা ক্যান্ডিডেট এজগুলো রাখে একটা **মিন-প্রায়োরিটি কিউ (min-heap)**-তে। সেটা সবসময় O(log n)-এ সবচেয়ে সস্তাটা ফেরত দেয়:\n\n\`\`\`\npush (0, start)\nwhile heap not empty:\n    (w, v) = pop smallest\n    if inTree[v]: continue        // পুরনো এন্ট্রি, বাদ\n    inTree[v] = true; total += w\n    for each (x, wx) in adj[v]:\n        if not inTree[x]: push (wx, x)\n\`\`\`\n\nপুরনো এন্ট্রি আমরা মুছি না; বের হলে শুধু **বাদ দিই** ("lazy deletion")। একই গ্রাফে চালিয়ে দেখি। (পড়ার সুবিধার জন্য হিপটা সাজিয়ে আঁকা; ভেতরে আসলে এটা একটা ট্রি।)`
    ),
    scene(g, { tags: { 0: 'start' }, panels: [{ type: 'queue', label: T('min-heap of (weight, vertex)', '(ওজন, ভার্টেক্স)-এর মিন-হিপ'), items: show(heap) }], status: 'push (0, 0)' })
  ));

  while (heap.length) {
    sortHeap();
    const top = heap.shift();
    const before = show([top, ...heap]);
    if (inTree[top.v]) {
      steps.push(step(
        T(`Pop (${top.w}, ${top.v}): ${top.v} is already in the tree → skip`, `Pop (${top.w}, ${top.v}): ${top.v} আগেই ট্রিতে → বাদ`),
        T(
          `The smallest entry is **(${top.w}, ${top.v})**. \`inTree[${top.v}]\` → **true** — this is an **old** entry, pushed before we found a cheaper way to ${top.v}. \`continue\`: throw it away and pop again.\n\nThis is the price of lazy deletion: a few extra pops. At most E entries are ever pushed, so it stays cheap.`,
          `সবচেয়ে ছোট এন্ট্রি **(${top.w}, ${top.v})**। \`inTree[${top.v}]\` → **true** — এটা একটা **পুরনো** এন্ট্রি, ${top.v}-এ সস্তা পথ পাওয়ার আগে ঢোকানো। \`continue\`: ফেলে দিয়ে আবার pop।\n\nlazy deletion-এর দাম এটুকুই: কয়েকটা বাড়তি pop। মোট Eটার বেশি এন্ট্রি কখনো ঢোকে না, তাই খরচ কমই থাকে।`
        ),
        scene(g, {
          nodeState: { ...Object.fromEntries(inTree.map((b, i) => [i, b ? 'setA' : ''])), [top.v]: 'reject' },
          edgeState: { ...allEdges(g, 'dim'), ...treeEdges(), ...(top.from >= 0 ? { [keyOf(g, top.from, top.v)]: 'reject' } : {}) },
          panels: [{ type: 'queue', label: T('min-heap (before the pop)', 'মিন-হিপ (pop-এর আগে)'), items: before, hl: { 0: 'reject' } }],
          status: `inTree[${top.v}] = true → skip`
        })
      ));
      continue;
    }
    inTree[top.v] = true;
    total += top.w;
    if (top.from >= 0) chosen.push([top.from, top.v]);
    const pushed = [];
    for (const { v, w } of adj[top.v]) if (!inTree[v]) { heap.push({ w, v, from: top.v }); pushed.push(`(${w}, ${v})`); }
    sortHeap();
    steps.push(step(
      T(`Pop (${top.w}, ${top.v}): add ${top.v}${top.from >= 0 ? ` with edge ${top.from}–${top.v}` : ''}`, `Pop (${top.w}, ${top.v}): ${top.v} যোগ${top.from >= 0 ? `, এজ ${top.from}–${top.v} দিয়ে` : ''}`),
      T(
        `The smallest entry is **(${top.w}, ${top.v})**. \`inTree[${top.v}]\` → **false**, so it is real: ${top.v} joins the tree${top.from >= 0 ? ` through edge **${top.from}–${top.v}**` : ''}. total = ${total - top.w} + ${top.w} = **${total}**.\n\nThen we push every edge from ${top.v} to a vertex **outside** the tree: ${pushed.length ? pushed.join(', ') : 'none — all its neighbours are already inside'}.`,
        `সবচেয়ে ছোট এন্ট্রি **(${top.w}, ${top.v})**। \`inTree[${top.v}]\` → **false**, তাই এটা আসল: ${top.v} ট্রিতে ঢুকল${top.from >= 0 ? ` এজ **${top.from}–${top.v}** দিয়ে` : ''}। total = ${total - top.w} + ${top.w} = **${total}**।\n\nতারপর ${top.v} থেকে ট্রির **বাইরের** প্রতিটা ভার্টেক্সের এজ push করি: ${pushed.length ? pushed.join(', ') : 'কিছু না — তার সব প্রতিবেশী আগেই ভেতরে'}।`
      ),
      scene(g, {
        nodeState: { ...Object.fromEntries(inTree.map((b, i) => [i, b ? 'setA' : ''])), [top.v]: 'relax' },
        edgeState: { ...allEdges(g, 'dim'), ...treeEdges(), ...Object.fromEntries(adj[top.v].filter((x) => !inTree[x.v]).map((x) => [keyOf(g, top.v, x.v), 'frontier'])) },
        panels: [
          { type: 'queue', label: T('min-heap (after pushing)', 'মিন-হিপ (push-এর পরে)'), items: show(heap) },
          { type: 'output', label: T('tree edges', 'ট্রির এজ'), items: chosen.map(([a, b]) => `${a}–${b}`), fresh: top.from >= 0 }
        ],
        status: `total = ${total}`
      })
    ));
  }
  steps.push(step(
    T(`Same MST, total ${total} — now in O(E log V)`, `একই MST, মোট ${total} — এবার O(E log V)-এ`),
    T(
      `Exactly the same tree as the array version, total **${total}**. Only the way we **find** the cheapest edge changed.\n\nCost: every edge is pushed at most twice (once from each end) and each push/pop costs O(log E) → **O(E log E) = O(E log V)**.\n\n**Which one to write?**\n- **Dense** graph (E close to V², usually given as a matrix, V ≤ ~2000): the simple **O(V²)** array version is faster and shorter.\n- **Sparse** graph (E about V … 10·V, V up to 10⁵ or more): the **heap** version.\n\n> In C++ \`priority_queue\` is a max-heap — push \`{-w, v}\` or use \`greater<>\`. In Java use \`PriorityQueue\` with a comparator, in Python \`heapq\`.`,
      `অ্যারে ভার্সনের হুবহু একই ট্রি, মোট **${total}**। শুধু সবচেয়ে সস্তা এজ **খোঁজার** উপায় বদলেছে।\n\nখরচ: প্রতিটা এজ সর্বোচ্চ দুবার push হয় (দুই মাথা থেকে একবার করে), আর প্রতিটা push/pop-এ O(log E) → **O(E log E) = O(E log V)**।\n\n**কোনটা লিখবে?**\n- **ঘন (dense)** গ্রাফ (E প্রায় V², সাধারণত ম্যাট্রিক্সে দেয়, V ≤ ~2000): সহজ **O(V²)** অ্যারে ভার্সনই দ্রুত আর ছোট।\n- **পাতলা (sparse)** গ্রাফ (E মোটামুটি V … 10·V, V 10⁵ বা তার বেশি): **হিপ** ভার্সন।\n\n> C++-এ \`priority_queue\` হলো ম্যাক্স-হিপ — \`{-w, v}\` push করো বা \`greater<>\` দাও। Java-তে কম্পারেটরসহ \`PriorityQueue\`, পাইথনে \`heapq\`।`
    ),
    scene(g, { nodeState: Object.fromEntries(g.nodes.map((n) => [n.id, 'setA'])), edgeState: { ...allEdges(g, 'dim'), ...treeEdges() }, status: T(`MST total = ${total}`, `MST মোট = ${total}`) })
  ));
  steps.push(practiceStep(
    g,
    T('Practice problems', 'প্র্যাকটিস প্রবলেম'),
    T(
      'Write both versions of Prim once: the O(V²) one for a matrix input and the heap one for an edge-list input. Then try these (the first three are plain MSTs; the last one asks for the second-best tree).',
      'প্রিমের দুটো ভার্সনই একবার করে লেখো: ম্যাট্রিক্স ইনপুটের জন্য O(V²), আর এজ-লিস্ট ইনপুটের জন্য হিপ ভার্সন। তারপর এগুলো চেষ্টা করো (প্রথম তিনটা সোজা MST; শেষটায় দ্বিতীয় সেরা ট্রি চাওয়া হয়েছে)।'
    ),
    [
      ['UVa 908 — Re-connecting Computer Sites', 'plain MST cost', 'সোজা MST খরচ'],
      ['UVa 10034 — Freckles', 'MST on points: every pair is an edge (dense!)', 'বিন্দুর ওপর MST: প্রতিটা জোড়াই এজ (ঘন!)'],
      ['UVa 11228 — Transportation System', 'MST + split roads and railroads', 'MST + রাস্তা আর রেলপথ আলাদা'],
      ['SPOJ MST — Minimum Spanning Tree', 'big sparse input → heap version', 'বড় পাতলা ইনপুট → হিপ ভার্সন'],
      ['UVa 10462 — Is There A Second Way Left?', 'second-best MST', 'দ্বিতীয় সেরা MST']
    ],
    { edgeState: { ...allEdges(g, 'dim'), ...treeEdges() } }
  ));
  return steps;
}

/* =================================================================== Disjoint set + Kruskal */

const FRIENDS = {
  V: 5,
  directed: false,
  weighted: false,
  nodes: N([[0, 70, 90, 'A'], [1, 220, 50, 'B'], [2, 220, 210, 'C'], [3, 420, 70, 'D'], [4, 420, 220, 'E']]),
  edges: [{ u: 0, v: 1 }, { u: 1, v: 2 }, { u: 3, v: 4 }]
};

/** A parent-array forest drawn as a graph: an arrow from every vertex to its parent. */
const forest = (parent, extra = {}, pos = null) => {
  const n = parent.length;
  const nodes = pos || N(parent.map((_, i) => [i, 70 + i * 120, 220]));
  return {
    kind: 'graphx',
    directed: true,
    weighted: false,
    nodes,
    edges: parent.map((p, i) => (p !== i ? { u: i, v: p } : null)).filter(Boolean),
    ...extra,
    panels: [{ type: 'array', label: T('parent[ ]', 'parent[ ]'), cells: parent.map(String), hl: extra.hl || {} }, ...(extra.panels || [])]
  };
};

export function dsuDeep(g) {
  const steps = [];
  const L = (i) => 'ABCDE'[i];

  steps.push(step(
    T('A side question: are these two in the same group?', 'একটা আলাদা প্রশ্ন: এই দুজন কি একই দলে?'),
    T(
      `Kruskal keeps asking one question: "are u and v already connected?". Let us study that question on its own, with friends.\n\nFriendship here is **transitive**: if A is a friend of B and B is a friend of C, then A and C are friends too. We are told A–B, B–C and D–E. Are A and C friends? Yes. A and D? No.\n\nDrawn as a graph, "friends" = "in the same **connected component**". BFS or DFS could answer every question, but each answer would cost O(V + E). The **disjoint set union (DSU)**, also called **union-find**, answers it in almost O(1) — with one array.`,
      `ক্রুসকাল বারবার একটাই প্রশ্ন করে: "u আর v কি আগেই যুক্ত?"। প্রশ্নটা আলাদা করে বন্ধুদের দিয়ে বুঝি।\n\nএখানে বন্ধুত্ব **ট্রানজিটিভ (transitive)**: A যদি B-এর বন্ধু হয় আর B যদি C-এর, তাহলে A আর C-ও বন্ধু। আমাদের বলা হলো A–B, B–C আর D–E। A আর C কি বন্ধু? হ্যাঁ। A আর D? না।\n\nগ্রাফ আঁকলে "বন্ধু" = "একই **কানেক্টেড কম্পোনেন্ট**-এ"। BFS বা DFS দিয়ে প্রতিটা প্রশ্নের উত্তর দেওয়া যায়, কিন্তু প্রতিবার O(V + E) খরচ। **ডিসজয়েন্ট সেট ইউনিয়ন (DSU)**, যাকে **ইউনিয়ন-ফাইন্ড (union-find)**-ও বলে, প্রায় O(1)-এ উত্তর দেয় — একটা মাত্র অ্যারে দিয়ে।`
    ),
    scene(FRIENDS, { nodeState: { 0: 'setA', 1: 'setA', 2: 'setA', 3: 'setB', 4: 'setB' }, status: T('A, B, C are one group · D, E another', 'A, B, C এক দল · D, E আরেক দল') })
  ));

  // the friends example, step by step with parent[]
  const parent = [0, 1, 2, 3, 4];
  const pos = N([[0, 70, 200, 'A'], [1, 200, 200, 'B'], [2, 330, 200, 'C'], [3, 460, 200, 'D'], [4, 590, 200, 'E']]);
  const find = (x) => (parent[x] === x ? x : find(parent[x]));
  steps.push(step(
    T('Every group has a leader: parent[ ]', 'প্রতিটা দলের একজন লিডার: parent[ ]'),
    T(
      `Each person points to a **parent**. Someone who points to **themselves** is the **leader (representative)** of their group. Two people are in the same group **exactly when** they have the same leader.\n\nAt the start nobody knows anybody, so everyone is their own leader:\n\n\`\`\`\nmakeSet(x):  parent[x] = x\n\`\`\`\n\nThe array says it directly: \`parent = [${parent.join(', ')}]\` — five groups of one.`,
      `প্রত্যেকে একজন **parent**-এর দিকে নির্দেশ করে। যে **নিজের** দিকে নির্দেশ করে, সে তার দলের **লিডার (representative)**। দুজন একই দলে **ঠিক তখনই**, যখন তাদের লিডার একই।\n\nশুরুতে কেউ কাউকে চেনে না, তাই প্রত্যেকে নিজেই নিজের লিডার:\n\n\`\`\`\nmakeSet(x):  parent[x] = x\n\`\`\`\n\nঅ্যারেটাই সরাসরি বলছে: \`parent = [${parent.join(', ')}]\` — একজন করে পাঁচটা দল।`
    ),
    forest([...parent], { nodeState: Object.fromEntries(parent.map((_, i) => [i, 'source'])), status: T('everyone is their own leader', 'সবাই নিজের লিডার') }, pos)
  ));
  const unions = [[0, 1], [1, 2], [3, 4], [2, 4]];
  for (const [a, b] of unions) {
    const ra = find(a);
    const rb = find(b);
    const pathA = [];
    for (let x = a; ; x = parent[x]) { pathA.push(x); if (parent[x] === x) break; }
    const pathB = [];
    for (let x = b; ; x = parent[x]) { pathB.push(x); if (parent[x] === x) break; }
    parent[ra] = rb;
    steps.push(step(
      T(`union(${L(a)}, ${L(b)}): leader ${L(ra)} now points to ${L(rb)}`, `union(${L(a)}, ${L(b)}): লিডার ${L(ra)} এখন ${L(rb)}-এর দিকে`),
      T(
        `${a === 2 && b === 4 ? "News: C and E just became friends — so now A and D are friends too, through C and E.\n\n" : ""}\`find(${L(a)})\`: follow parents ${pathA.map(L).join(' → ')} → leader **${L(ra)}**.\n\`find(${L(b)})\`: follow parents ${pathB.map(L).join(' → ')} → leader **${L(rb)}**.\n\n\`${L(ra)} != ${L(rb)}\` → different groups, so we join them by making one leader point to the other: \`parent[${L(ra)}] = ${L(rb)}\`.\n\nNote: we link the **leaders**, not ${L(a)} and ${L(b)} themselves. Linking ${L(a)} directly would cut ${L(a)} away from its old group.\n\n\`\`\`\nunion(a, b):\n    ra = find(a), rb = find(b)\n    if ra != rb: parent[ra] = rb\n\`\`\``,
        `${a === 2 && b === 4 ? "খবর: C আর E এইমাত্র বন্ধু হলো — তাই এখন C আর E-এর মাধ্যমে A আর D-ও বন্ধু।\n\n" : ""}\`find(${L(a)})\`: parent ধরে ${pathA.map(L).join(' → ')} → লিডার **${L(ra)}**।\n\`find(${L(b)})\`: parent ধরে ${pathB.map(L).join(' → ')} → লিডার **${L(rb)}**।\n\n\`${L(ra)} != ${L(rb)}\` → আলাদা দল, তাই এক লিডারকে আরেক লিডারের দিকে নির্দেশ করিয়ে জুড়ে দিই: \`parent[${L(ra)}] = ${L(rb)}\`।\n\nখেয়াল করো: আমরা **লিডারদের** জুড়ি, ${L(a)} আর ${L(b)}-কে সরাসরি না। ${L(a)}-কে সরাসরি জুড়লে ${L(a)} তার পুরনো দল থেকে কেটে যেত।\n\n\`\`\`\nunion(a, b):\n    ra = find(a), rb = find(b)\n    if ra != rb: parent[ra] = rb\n\`\`\``
      ),
      forest([...parent], {
        nodeState: { ...Object.fromEntries(parent.map((p, i) => [i, p === i ? 'source' : ''])), [ra]: 'relax' },
        edgeState: { [ek(ra, rb)]: 'relax' },
        tags: { [a]: 'a', [b]: 'b' },
        hl: { [ra]: 'relax' },
        status: `parent[${L(ra)}] = ${L(rb)}`
      }, pos)
    ));
  }

  // path compression on a long chain
  const chain = [1, 2, 3, 4, 4];
  const cpos = N([[0, 70, 300], [1, 190, 240], [2, 310, 180], [3, 430, 120], [4, 550, 60]]);
  steps.push(step(
    T('The danger: a long chain', 'বিপদ: একটা লম্বা চেইন'),
    T(
      `Unlucky unions can build a **chain**: 0 → 1 → 2 → 3 → 4. Now \`find(0)\` walks 4 steps, and with n people it can walk n − 1 steps — every single time you ask. Many questions × O(n) each is too slow for a contest.\n\nThe fix is one line inside \`find\`, called **path compression**: on the way back, point every vertex we passed **straight at the leader**.\n\n\`\`\`\nfind(x):\n    if parent[x] == x: return x\n    parent[x] = find(parent[x])   // remember the answer!\n    return parent[x]\n\`\`\``,
      `দুর্ভাগ্যজনক কিছু union একটা **চেইন** বানাতে পারে: 0 → 1 → 2 → 3 → 4। এখন \`find(0)\` 4 ধাপ হাঁটে, আর nজন মানুষ হলে n − 1 ধাপ — যতবার জিজ্ঞেস করো ততবার। অনেক প্রশ্ন × প্রতিটায় O(n) কনটেস্টের জন্য অনেক ধীর।\n\nসমাধান \`find\`-এর ভেতরে এক লাইন, যার নাম **পাথ কম্প্রেশন (path compression)**: ফেরার পথে যে যে ভার্টেক্স পার হলাম, সবাইকে **সরাসরি লিডারের দিকে** নির্দেশ করাও।\n\n\`\`\`\nfind(x):\n    if parent[x] == x: return x\n    parent[x] = find(parent[x])   // উত্তরটা মনে রাখো!\n    return parent[x]\n\`\`\``
    ),
    forest([...chain], { nodeState: { 4: 'source', 0: 'compare' }, tags: { 0: 'find(0)', 4: 'leader' }, status: T('find(0) needs 4 jumps', 'find(0)-এ 4টা লাফ') }, cpos)
  ));
  // the recursion goes up …
  const up = [0, 1, 2, 3, 4];
  steps.push(step(
    T('find(0): climb to the leader', 'find(0): লিডার পর্যন্ত ওঠো'),
    T(
      `\`find(0)\` → parent[0] = 1 ≠ 0, so it calls \`find(1)\` → calls \`find(2)\` → calls \`find(3)\` → calls \`find(4)\`.\n\n\`parent[4] == 4\` → **true** → 4 is the leader; \`find(4)\` returns **4**.\n\nNow the calls finish one by one in reverse order: 3, 2, 1, 0. Each one runs \`parent[x] = 4\` before it returns.`,
      `\`find(0)\` → parent[0] = 1 ≠ 0, তাই সে \`find(1)\` ডাকে → সে ডাকে \`find(2)\` → সে \`find(3)\` → সে \`find(4)\`।\n\n\`parent[4] == 4\` → **true** → 4-ই লিডার; \`find(4)\` ফেরত দেয় **4**।\n\nএবার কলগুলো উল্টো ক্রমে একে একে শেষ হয়: 3, 2, 1, 0। প্রত্যেকে ফেরার আগে চালায় \`parent[x] = 4\`।`
    ),
    forest([...chain], {
      nodeState: { 0: 'compare', 1: 'compare', 2: 'compare', 3: 'compare', 4: 'relax' },
      edgeState: Object.fromEntries(up.slice(0, 4).map((x) => [ek(x, chain[x]), 'compare'])),
      panels: [{ type: 'stack', label: T('call stack', 'কল স্ট্যাক'), items: up.map((x) => `find(${x})`) }],
      status: T('find(4) returns 4', 'find(4) ফেরত দেয় 4')
    }, cpos)
  ));
  const flat = [...chain];
  for (const x of [3, 2, 1, 0]) {
    const old = flat[x];
    flat[x] = 4;
    if (old === 4 && x === 3) continue;
    steps.push(step(
      T(`Back in find(${x}): parent[${x}] = 4`, `find(${x})-এ ফিরে: parent[${x}] = 4`),
      T(
        `\`find(${old})\` returned 4, so \`parent[${x}] = 4\` (it was ${old}). Vertex ${x} now points **straight** at the leader.${x === 0 ? `\n\nDone: \`parent = [${flat.join(', ')}]\`. The next \`find(0)\`, \`find(1)\` or \`find(2)\` takes **one** jump. With path compression (and union by size, next step) a find costs **almost O(1)** on average — formally O(α(n)), where α grows so slowly that it is ≤ 4 for any n you will ever see.` : ''}`,
        `\`find(${old})\` ফেরত দিল 4, তাই \`parent[${x}] = 4\` (আগে ছিল ${old})। ভার্টেক্স ${x} এখন **সরাসরি** লিডারের দিকে।${x === 0 ? `\n\nশেষ: \`parent = [${flat.join(', ')}]\`। এরপর \`find(0)\`, \`find(1)\` বা \`find(2)\`-এ **একটাই** লাফ। পাথ কম্প্রেশন (আর পরের ধাপের union by size) থাকলে একটা find গড়ে **প্রায় O(1)** — আনুষ্ঠানিকভাবে O(α(n)), যেখানে α এত ধীরে বাড়ে যে তুমি জীবনে যত বড় n দেখবে তাতেও ≤ 4।` : ''}`
      ),
      forest([...flat], { nodeState: { 4: 'source', [x]: 'relax' }, edgeState: { [ek(x, 4)]: 'relax' }, hl: { [x]: 'relax' }, status: `parent[${x}]: ${old} → 4` }, cpos)
    ));
  }
  steps.push(step(
    T('Union by size: hang the small tree under the big one', 'union by size: ছোট ট্রি ঝোলাও বড়টার নিচে'),
    T(
      `The second trick: keep \`size[leader]\` = how many people are in the group. In \`union\`, always attach the **smaller** group's leader under the **bigger** group's leader:\n\n\`\`\`\nunion(a, b):\n    ra = find(a), rb = find(b)\n    if ra == rb: return false          // already together\n    if size[ra] < size[rb]: swap(ra, rb)\n    parent[rb] = ra\n    size[ra] += size[rb]\n    return true\n\`\`\`\n\nA vertex only gets deeper when its group at least **doubles**, so no tree is deeper than log₂ n even without compression. Use both tricks together — it is just a few lines.\n\nThe \`size[]\` array also answers "how big is my group?" for free (e.g. UVa 11503 — Virtual Friends).`,
      `দ্বিতীয় কৌশল: \`size[leader]\` রাখো = দলে কতজন। \`union\`-এ সবসময় **ছোট** দলের লিডারকে **বড়** দলের লিডারের নিচে লাগাও:\n\n\`\`\`\nunion(a, b):\n    ra = find(a), rb = find(b)\n    if ra == rb: return false          // আগেই একসাথে\n    if size[ra] < size[rb]: swap(ra, rb)\n    parent[rb] = ra\n    size[ra] += size[rb]\n    return true\n\`\`\`\n\nএকটা ভার্টেক্স কেবল তখনই গভীরে নামে যখন তার দল অন্তত **দ্বিগুণ** হয়, তাই কম্প্রেশন ছাড়াও কোনো ট্রি log₂ n-এর বেশি গভীর হয় না। দুটো কৌশল একসাথে লেখো — মাত্র কয়েক লাইন।\n\n\`size[]\` অ্যারে বিনা খরচে "আমার দল কত বড়?"-এর উত্তরও দেয় (যেমন UVa 11503 — Virtual Friends)।`
    ),
    forest([4, 4, 4, 4, 4], { nodeState: { 4: 'source' }, panels: [{ type: 'array', label: T('size[ ] (only leaders matter)', 'size[ ] (শুধু লিডারের মান কাজের)'), cells: ['1', '1', '1', '1', '5'], hl: { 4: 'relax' } }], status: T('flat tree: every find is one jump', 'চ্যাপ্টা ট্রি: প্রতিটা find এক লাফে') }, cpos)
  ));
  return steps;
}

/** After the Kruskal trace: why stop at V − 1, cost, maximum spanning tree, second-best, practice. */
export function kruskalDeep(g) {
  const order = g.edges.map((e, i) => ({ e, i })).sort((a, b) => a.e.w - b.e.w || a.i - b.i).map(({ e }) => e);
  const p = Array.from({ length: g.V }, (_, i) => i);
  const f = (x) => (p[x] === x ? x : (p[x] = f(p[x])));
  const taken = [];
  let checked = 0;
  for (const e of order) {
    if (taken.length === g.V - 1) break;
    checked++;
    if (f(e.u) !== f(e.v)) { p[f(e.u)] = f(e.v); taken.push(e); }
  }
  const total = taken.reduce((s, e) => s + e.w, 0);
  // maximum spanning tree: same algorithm, sorted heaviest first
  const p2 = Array.from({ length: g.V }, (_, i) => i);
  const f2 = (x) => (p2[x] === x ? x : (p2[x] = f2(p2[x])));
  const maxT = [];
  for (const e of [...order].reverse()) if (f2(e.u) !== f2(e.v)) { p2[f2(e.u)] = f2(e.v); maxT.push(e); }
  const maxTotal = maxT.reduce((s, e) => s + e.w, 0);
  const st = (list, s) => Object.fromEntries(list.map((e) => [ek(e.u, e.v), s]));
  const E = g.edges.length;

  return [
    step(
      T('Stop early at V − 1 edges', 'V − 1 এজ হলেই থামো'),
      T(
        `A spanning tree on V vertices has exactly **V − 1** edges. The moment we have taken ${g.V - 1}, every vertex is connected and **every remaining edge** would close a cycle — so a real program adds\n\n\`\`\`\nif (taken == V - 1) break;\n\`\`\`\n\nOn this graph we finish after checking **${checked}** of the ${E} sorted edges. On big graphs this saves a lot of finds.\n\n> Also check the opposite: if the loop ends with **fewer** than V − 1 edges, the graph was not connected — there is no spanning tree, only a spanning **forest**.`,
        `V ভার্টেক্সের স্প্যানিং ট্রিতে ঠিক **V − 1**টা এজ। ${g.V - 1}টা নেওয়া হয়ে গেলেই প্রতিটা ভার্টেক্স যুক্ত, আর **বাকি প্রতিটা এজ** সাইকেল বানাবে — তাই আসল প্রোগ্রামে থাকে\n\n\`\`\`\nif (taken == V - 1) break;\n\`\`\`\n\nএই গ্রাফে সাজানো ${E}টা এজের মধ্যে **${checked}**টা দেখেই কাজ শেষ। বড় গ্রাফে এতে অনেক find বাঁচে।\n\n> উল্টোটাও দেখো: লুপ শেষে V − 1-এর **কম** এজ থাকলে গ্রাফটা কানেক্টেড ছিল না — স্প্যানিং ট্রি নেই, আছে শুধু স্প্যানিং **ফরেস্ট (forest)**।`
      ),
      scene(g, { edgeState: { ...allEdges(g, 'dim'), ...st(taken, 'tree') }, nodeState: Object.fromEntries(g.nodes.map((n) => [n.id, 'setA'])), panels: [{ type: 'edges', label: T('sorted edges', 'সাজানো এজ'), rows: order.map((e, i) => ({ e: `${e.u}–${e.v}`, w: e.w, state: taken.includes(e) ? 'tree' : i < checked ? 'reject' : 'dim', note: i < checked ? (taken.includes(e) ? T('✓ taken', '✓ নেওয়া') : T('✗ cycle', '✗ সাইকেল')) : T('never checked', 'দেখাই লাগেনি') })), notes: true }], status: T(`${g.V - 1} edges after ${checked} checks → break`, `${checked}টা চেকে ${g.V - 1}টা এজ → break`) })
    ),
    step(
      T('Why Kruskal is O(E log E)', 'কেন ক্রুসকাল O(E log E)'),
      T(
        `Two parts:\n\n1. **Sorting** the E edges → O(E log E).\n2. The loop: at most E edges, each with two finds and maybe one union → E · α(V), practically **O(E)**.\n\nSorting is the expensive part, so Kruskal is **O(E log E)** (the same as O(E log V), because E ≤ V²).\n\nWhen is Kruskal the natural choice?\n- the input is already an **edge list** (most contest inputs);\n- the graph is **sparse**;\n- you need the edges in weight order anyway, or you already have a DSU in your template.`,
        `দুটো অংশ:\n\n1. Eটা এজ **সর্ট** করা → O(E log E)।\n2. লুপ: সর্বোচ্চ Eটা এজ, প্রতিটায় দুটো find আর হয়তো একটা union → E · α(V), কার্যত **O(E)**।\n\nসর্টিং-ই দামি অংশ, তাই ক্রুসকাল **O(E log E)** (আর এটা O(E log V)-এর সমান, কারণ E ≤ V²)।\n\nকখন ক্রুসকাল স্বাভাবিক পছন্দ?\n- ইনপুট আগে থেকেই **এজ লিস্ট** (কনটেস্টের বেশিরভাগ ইনপুট);\n- গ্রাফটা **পাতলা (sparse)**;\n- এজগুলো ওজনের ক্রমে এমনিতেই লাগবে, বা তোমার টেমপ্লেটে আগে থেকেই DSU আছে।`
      ),
      {
        kind: 'chart',
        label: T(`work for E = ${E} edges`, `E = ${E}টা এজে কাজ`),
        max: Math.ceil(E * Math.log2(E)),
        items: [
          { label: T('sort: E log E', 'সর্ট: E log E'), v: Math.ceil(E * Math.log2(E)), color: 'var(--amber)', note: `≈ ${Math.ceil(E * Math.log2(E))}` },
          { label: T('loop: ≈ E', 'লুপ: ≈ E'), v: E, color: 'var(--green)', note: String(E) }
        ],
        caption: T('sorting dominates', 'সর্টিং-ই বেশি সময় নেয়')
      }
    ),
    step(
      T(`Variant: the maximum spanning tree (total ${maxTotal})`, `ভ্যারিয়েন্ট: ম্যাক্সিমাম স্প্যানিং ট্রি (মোট ${maxTotal})`),
      T(
        `Sometimes a problem wants the **most expensive** spanning tree, or a tree whose **weakest** edge is as strong as possible (for example: the heaviest truck that can travel between two cities, where each road has a weight limit).\n\nThe same proof works in reverse, so the change is one word: sort the edges **heaviest first**. On this graph that gives ${maxT.map((e) => `${e.u}–${e.v} (${e.w})`).join(', ')} → total **${maxTotal}**.\n\nThe weakest edge on the path between two cities in this tree is the best possible "bottleneck" between them (UVa 544 — Heavy Cargo).`,
        `কখনো প্রবলেম চায় **সবচেয়ে দামি** স্প্যানিং ট্রি, বা এমন ট্রি যার **সবচেয়ে দুর্বল** এজটাও যত শক্ত সম্ভব (যেমন: প্রতিটা রাস্তার ওজন-সীমা আছে, দুই শহরের মধ্যে সবচেয়ে ভারী কোন ট্রাক যেতে পারবে)।\n\nএকই প্রমাণ উল্টো দিকে খাটে, তাই বদল একটা শব্দ: এজগুলো **ভারী আগে** সাজাও। এই গ্রাফে সেটা দেয় ${maxT.map((e) => `${e.u}–${e.v} (${e.w})`).join(', ')} → মোট **${maxTotal}**।\n\nএই ট্রিতে দুই শহরের মধ্যের পথের সবচেয়ে দুর্বল এজটাই তাদের মধ্যে সম্ভাব্য সেরা "বটলনেক (bottleneck)" (UVa 544 — Heavy Cargo)।`
      ),
      scene(g, { edgeState: { ...allEdges(g, 'dim'), ...st(maxT, 'relax') }, status: T(`heaviest first → total ${maxTotal}`, `ভারী আগে → মোট ${maxTotal}`) })
    ),
    step(
      T('Variant: the second-best spanning tree', 'ভ্যারিয়েন্ট: দ্বিতীয় সেরা স্প্যানিং ট্রি'),
      T(
        `"Find the cheapest spanning tree that is **different** from the MST." A simple idea that is fast enough for small graphs:\n\n1. Build the MST once (it has V − 1 = ${g.V - 1} edges).\n2. For each MST edge: **ban** it, run Kruskal again on the other edges, and remember the total.\n3. The smallest of those totals is the second-best tree.\n\nThat is (V − 1) runs of Kruskal → O(V · E) after sorting once. Here the MST costs ${total}, and we would run Kruskal ${g.V - 1} more times.`,
        `"MST থেকে **আলাদা** এমন সবচেয়ে সস্তা স্প্যানিং ট্রি বের করো।" ছোট গ্রাফের জন্য যথেষ্ট দ্রুত একটা সহজ আইডিয়া:\n\n1. একবার MST বানাও (তাতে V − 1 = ${g.V - 1}টা এজ)।\n2. MST-এর প্রতিটা এজের জন্য: সেটাকে **নিষিদ্ধ** করো, বাকি এজ নিয়ে আবার ক্রুসকাল চালাও, মোটটা মনে রাখো।\n3. সেই মোটগুলোর মধ্যে সবচেয়ে ছোটটাই দ্বিতীয় সেরা ট্রি।\n\nমানে (V − 1) বার ক্রুসকাল → একবার সর্টের পরে O(V · E)। এখানে MST-এর খরচ ${total}, আর আমাদের আরও ${g.V - 1} বার ক্রুসকাল চালাতে হবে।`
      ),
      scene(g, { edgeState: { ...allEdges(g, 'dim'), ...st(taken, 'tree') }, panels: [{ type: 'output', label: T('MST edges — ban each one in turn', 'MST-এর এজ — একে একে নিষিদ্ধ করো'), items: taken.map((e) => `${e.u}–${e.v}`) }], status: T(`MST = ${total}`, `MST = ${total}`) })
    ),
    practiceStep(
      g,
      T('Practice problems', 'প্র্যাকটিস প্রবলেম'),
      T(
        'First write a DSU with path compression and union by size, and test it alone on the friends example. Then plug it into Kruskal. The first three problems are pure DSU.',
        'আগে পাথ কম্প্রেশন আর union by size সহ একটা DSU লেখো, আর বন্ধুদের উদাহরণে আলাদা করে টেস্ট করো। তারপর সেটা ক্রুসকালে বসাও। প্রথম তিনটা প্রবলেম শুধু DSU-এর।'
      ),
      [
        ['UVa 459 — Graph Connectivity', 'count the groups', 'দল গোনা'],
        ['UVa 10685 — Nature', 'size of the biggest group', 'সবচেয়ে বড় দলের আকার'],
        ['UVa 11503 — Virtual Friends', 'group sizes with names (map + size[])', 'নামসহ দলের আকার (map + size[])'],
        ['UVa 544 — Heavy Cargo', 'maximum spanning tree / bottleneck', 'ম্যাক্সিমাম স্প্যানিং ট্রি / বটলনেক'],
        ['UVa 10369 — Arctic Network', 'Kruskal, stop early with k groups left', 'ক্রুসকাল, k দল বাকি থাকতে থামো'],
        ['UVa 11733 — Airports', 'MST where a road can be replaced by an airport', 'MST, যেখানে রাস্তার বদলে এয়ারপোর্ট বসানো যায়']
      ],
      { edgeState: { ...allEdges(g, 'dim'), ...st(taken, 'tree') } }
    )
  ];
}
