/* ------------------------------------------------------------------ *
 * Deep dives for topological sort (Graphs chapter), in the order
 * shafaetsplanet.com teaches it:
 *
 * story    — a morning routine as a graph, in-degree by hand.
 * Kahn     — many valid orders; the smallest order with a min-heap;
 *            counting all orders; cost; practice.
 * DFS topo — why "reverse finishing time" is always valid; practice.
 * ------------------------------------------------------------------ */
import { adjOf } from '../graphData.js';
import { T, ek, scene, step, N, allEdges, practiceStep } from './common.js';

const TASKS = [
  ['wake up', 'ঘুম থেকে ওঠা'],
  ['brush teeth', 'দাঁত ব্রাশ'],
  ['breakfast', 'নাস্তা'],
  ['get dressed', 'জামা পরা'],
  ['pack the bag', 'ব্যাগ গোছানো'],
  ['leave for class', 'ক্লাসে রওনা']
];
const G_MORNING = {
  V: 6,
  directed: true,
  weighted: false,
  nodes: N([[0, 60, 160], [1, 220, 60], [2, 400, 60], [3, 220, 260], [4, 400, 260], [5, 580, 160]]),
  edges: [{ u: 0, v: 1 }, { u: 0, v: 3 }, { u: 1, v: 2 }, { u: 2, v: 5 }, { u: 3, v: 5 }, { u: 4, v: 5 }]
};
const legend = T(TASKS.map(([en], i) => `**${i}** ${en}`).join(' · '), TASKS.map(([, bn], i) => `**${i}** ${bn}`).join(' · '));

export function topoStory() {
  const g = G_MORNING;
  const indeg = Array(g.V).fill(0);
  for (const e of g.edges) indeg[e.v]++;
  return [
    step(
      T('A morning with rules', 'নিয়মে বাঁধা একটা সকাল'),
      T(
        `Your morning has six jobs, and some must come before others:\n\n- wake up before you brush your teeth, and before you get dressed;\n- brush before breakfast;\n- you can only leave after breakfast, after getting dressed and after packing the bag.\n\nPacking the bag needs nothing before it — do it whenever you like.\n\nWrite every job as a vertex and every rule "A before B" as an arrow **A → B**. The question "in which order can I do everything?" becomes: list the vertices so that **every arrow points forward**. That list is a **topological order**.`,
        `তোমার সকালে ছয়টা কাজ, আর কিছু কাজ অন্যগুলোর আগে করতেই হবে:\n\n- দাঁত ব্রাশের আগে ঘুম থেকে উঠতে হবে, জামা পরার আগেও;\n- নাস্তার আগে ব্রাশ;\n- রওনা দেওয়া যাবে কেবল নাস্তা, জামা পরা আর ব্যাগ গোছানোর পরে।\n\nব্যাগ গোছানোর আগে কিছুই লাগে না — যখন খুশি করো।\n\nপ্রতিটা কাজকে একটা ভার্টেক্স আর প্রতিটা নিয়ম "A আগে, তারপর B"-কে একটা তীর **A → B** হিসেবে লেখো। "কোন ক্রমে সব কাজ করা যায়?" প্রশ্নটা হয়ে যায়: ভার্টেক্সগুলো এমনভাবে সাজাও যাতে **প্রতিটা তীর সামনের দিকে** যায়। এই তালিকাটাই **টপোলজিক্যাল অর্ডার (topological order)**।`
      ),
      scene(g, { panels: [{ type: 'text', label: T('the jobs', 'কাজগুলো'), text: legend }], status: T('arrow A → B = "A before B"', 'তীর A → B = "আগে A, তারপর B"') })
    ),
    step(
      T('How many jobs must happen first? In-degree', 'আগে কয়টা কাজ শেষ হতে হবে? ইন-ডিগ্রি'),
      T(
        `For every job, count the arrows **coming in**. That number, the **in-degree**, is "how many jobs must be finished before this one".\n\n${TASKS.map(([en], i) => `- ${i} (${en}): **${indeg[i]}**`).join('\n')}\n\nJobs with in-degree **0** can be done right now: ${indeg.map((d, i) => (d === 0 ? i : null)).filter((x) => x != null).join(' and ')}. Do one, cross out its arrows, and some other job's count drops — maybe to 0. Repeat until everything is done. That is the whole of Kahn's algorithm; the rest of this lesson makes it precise.`,
        `প্রতিটা কাজের জন্য **ভেতরে আসা** তীর গোনো। এই সংখ্যাটা, **ইন-ডিগ্রি (in-degree)**, মানে "এই কাজের আগে কয়টা কাজ শেষ হতে হবে"।\n\n${TASKS.map(([, bn], i) => `- ${i} (${bn}): **${indeg[i]}**`).join('\n')}\n\nইন-ডিগ্রি **0** এমন কাজ এখনই করা যায়: ${indeg.map((d, i) => (d === 0 ? i : null)).filter((x) => x != null).join(' আর ')}। একটা করো, তার তীরগুলো কেটে দাও, তাহলে অন্য কোনো কাজের গোনা কমবে — হয়তো 0-তে নামবে। সব কাজ শেষ না হওয়া পর্যন্ত এভাবে চলো। এটাই পুরো Kahn-এর অ্যালগরিদম; লেসনের বাকিটা এটাকে নিখুঁত করবে।`
      ),
      scene(g, { nodeState: Object.fromEntries(indeg.map((d, i) => [i, d === 0 ? 'relax' : ''])), subs: Object.fromEntries(indeg.map((d, i) => [i, `in ${d}`])), panels: [{ type: 'array', label: T('indeg[ ]', 'indeg[ ]'), cells: indeg.map(String), hl: Object.fromEntries(indeg.map((d, i) => [i, d === 0 ? 'relax' : ''])) }, { type: 'text', label: T('the jobs', 'কাজগুলো'), text: legend }], status: T('green = ready now (in-degree 0)', 'সবুজ = এখনই করা যায় (ইন-ডিগ্রি 0)') })
    )
  ];
}

function countOrders(g) {
  const adj = adjOf(g);
  const indeg = Array(g.V).fill(0);
  for (const e of g.edges) indeg[e.v]++;
  const used = Array(g.V).fill(false);
  const cur = [];
  const all = [];
  const go = () => {
    if (cur.length === g.V) { all.push([...cur]); return; }
    for (let v = 0; v < g.V; v++) {
      if (used[v] || indeg[v]) continue;
      used[v] = true; cur.push(v);
      for (const { v: x } of adj[v]) indeg[x]--;
      go();
      for (const { v: x } of adj[v]) indeg[x]++;
      used[v] = false; cur.pop();
    }
  };
  go();
  return all;
}

/** After the Kahn trace: many orders, the smallest one with a heap, counting, cost, practice. */
export function kahnDeep(g) {
  const adj = adjOf(g);
  const indeg = Array(g.V).fill(0);
  for (const e of g.edges) indeg[e.v]++;
  const all = countOrders(g);
  const steps = [];

  // smallest order with a min-heap
  const deg = [...indeg];
  let heap = [...Array(g.V).keys()].filter((v) => deg[v] === 0);
  const order = [];
  steps.push(step(
    T(`Not one answer: ${all.length} valid orders`, `উত্তর একটা না: ${all.length}টা সঠিক ক্রম`),
    T(
      `Whenever two tasks are ready at the same time, either can go first — so a DAG usually has **many** topological orders. This one has **${all.length}**, for example:\n\n${all.slice(0, 4).map((o) => `- ${o.join(', ')}`).join('\n')}\n\nAll of them respect every arrow. Many judges accept **any** valid order ("special judge"). Some problems ask for one particular order, most often the **smallest** in dictionary order — when there is a choice, take the smallest ready task.\n\n> To list (or count) **all** orders you need backtracking: try every ready task, recurse, undo. Only possible for small V — the number of orders can be up to V!.`,
      `যখনই দুটো কাজ একসাথে তৈরি থাকে, যেকোনোটা আগে যেতে পারে — তাই একটা DAG-এর সাধারণত **অনেকগুলো** টপোলজিক্যাল অর্ডার থাকে। এটার আছে **${all.length}**টা, যেমন:\n\n${all.slice(0, 4).map((o) => `- ${o.join(', ')}`).join('\n')}\n\nসবগুলোই প্রতিটা তীর মানে। অনেক জাজ **যেকোনো** সঠিক ক্রম মেনে নেয় ("special judge")। কিছু প্রবলেম একটা নির্দিষ্ট ক্রম চায়, সবচেয়ে বেশি চায় ডিকশনারির ক্রমে **সবচেয়ে ছোটটা** — বাছাই করার সুযোগ এলে সবচেয়ে ছোট তৈরি কাজটা নাও।\n\n> **সব** ক্রম লিখতে (বা গুনতে) ব্যাকট্র্যাকিং লাগে: প্রতিটা তৈরি কাজ চেষ্টা করো, রিকার্শন, তারপর ফিরিয়ে নাও। কেবল ছোট V-তেই সম্ভব — ক্রমের সংখ্যা V! পর্যন্ত হতে পারে।`
    ),
    scene(g, { panels: [{ type: 'list', label: T('some valid orders', 'কয়েকটা সঠিক ক্রম'), items: all.slice(0, 6).map((o) => o.join(' → ')) }], status: T(`${all.length} valid orders`, `${all.length}টা সঠিক ক্রম`) })
  ));
  while (heap.length) {
    heap.sort((a, b) => a - b);
    const ready = [...heap];
    const u = heap.shift();
    order.push(u);
    const freed = [];
    for (const { v } of adj[u]) if (--deg[v] === 0) { heap.push(v); freed.push(v); }
    steps.push(step(
      T(`Smallest order: ready {${ready.join(', ')}} → take ${u}`, `সবচেয়ে ছোট ক্রম: তৈরি {${ready.join(', ')}} → ${u} নাও`),
      T(
        `Replace Kahn's plain queue with a **min-heap** (priority queue). Ready tasks now: **{${ready.join(', ')}}** — the heap gives the smallest, **${u}**.\n\nCross out its arrows: ${adj[u].length ? adj[u].map(({ v }) => `indeg[${v}] → ${deg[v]}`).join(', ') : 'it has none'}.${freed.length ? ` Newly ready: ${freed.join(', ')}.` : ''}\n\nOrder so far: **${order.join(', ')}**.${!heap.length ? `\n\nDone. The plain queue gave a different order; the heap gives the **smallest** one. Cost: each push/pop is O(log V) → O(V log V + E).` : ''}`,
        `Kahn-এর সাধারণ queue বদলে দাও একটা **মিন-হিপ (priority queue)** দিয়ে। এখন তৈরি কাজ: **{${ready.join(', ')}}** — হিপ দেয় সবচেয়ে ছোটটা, **${u}**।\n\nতার তীরগুলো কাটো: ${adj[u].length ? adj[u].map(({ v }) => `indeg[${v}] → ${deg[v]}`).join(', ') : 'কোনো তীর নেই'}।${freed.length ? ` নতুন তৈরি: ${freed.join(', ')}।` : ''}\n\nএ পর্যন্ত ক্রম: **${order.join(', ')}**।${!heap.length ? `\n\nশেষ। সাধারণ queue একটা আলাদা ক্রম দিয়েছিল; হিপ দেয় **সবচেয়ে ছোটটা**। খরচ: প্রতিটা push/pop O(log V) → O(V log V + E)।` : ''}`
      ),
      scene(g, {
        nodeState: { ...Object.fromEntries(order.map((v) => [v, 'done'])), ...Object.fromEntries(heap.map((v) => [v, 'frontier'])), [u]: 'current' },
        edgeState: Object.fromEntries(g.edges.map((e) => [ek(e.u, e.v), order.includes(e.u) ? 'dim' : ''])),
        subs: Object.fromEntries(deg.map((d, i) => [i, order.includes(i) ? '✓' : `in ${d}`])),
        panels: [{ type: 'queue', label: T('min-heap of ready tasks', 'তৈরি কাজের মিন-হিপ'), items: [...heap].sort((a, b) => a - b) }, { type: 'output', label: T('order', 'ক্রম'), items: [...order], fresh: true }],
        status: `pop ${u}`
      })
    ));
  }
  steps.push(step(
    T('Cost of Kahn, and the slow way to avoid', 'Kahn-এর খরচ, আর যে ধীর উপায় এড়াবে'),
    T(
      `A first attempt often looks like this: "repeat V times: **scan all** vertices for one with in-degree 0". Each scan is O(V), so that is **O(V²)** — fine for 100 tasks, too slow for 10⁵.\n\nThe queue removes the scan: a task enters the queue exactly when its count reaches 0, so\n- every vertex is pushed and popped **once** → V,\n- every arrow is crossed out **once** → E,\n\ntotal **O(V + E)**. The min-heap version adds a log: O(V log V + E).\n\n> Cycle check for free: if the output has fewer than V tasks, the remaining ones wait on each other in a cycle.`,
      `প্রথম চেষ্টায় অনেকে এভাবে লেখে: "V বার করো: ইন-ডিগ্রি 0 এমন একটা খুঁজতে **সব** ভার্টেক্স স্ক্যান করো"। প্রতিটা স্ক্যান O(V), তাই মোট **O(V²)** — ১০০টা কাজে চলে, 10⁵-এ অনেক ধীর।\n\nqueue স্ক্যানটাই সরিয়ে দেয়: একটা কাজ queue-তে ঢোকে ঠিক যখন তার গোনা 0 হয়, তাই\n- প্রতিটা ভার্টেক্স **একবার** push আর pop → V,\n- প্রতিটা তীর **একবার** কাটা হয় → E,\n\nমোট **O(V + E)**। মিন-হিপ ভার্সনে একটা log যোগ হয়: O(V log V + E)।\n\n> বিনা খরচে সাইকেল চেক: আউটপুটে Vটার কম কাজ থাকলে, বাকিরা একটা সাইকেলে একে অপরের জন্য অপেক্ষা করছে।`
    ),
    { kind: 'chart', label: T('steps for V = 10⁵, E = 2·10⁵', 'V = 10⁵, E = 2·10⁵-এ কাজ'), max: 10000, items: [{ label: T('scan: V²', 'স্ক্যান: V²'), v: 10000, color: 'var(--red)', note: '10¹⁰' }, { label: T('queue: V + E', 'queue: V + E'), v: 3, color: 'var(--green)', note: '3·10⁵' }], caption: T('the queue version is about 30 000 times faster here', 'এখানে queue ভার্সন প্রায় ৩০,০০০ গুণ দ্রুত') }
  ));
  steps.push(practiceStep(
    g,
    T('Practice problems', 'প্র্যাকটিস প্রবলেম'),
    T('Write Kahn with a queue, then change one line to get the smallest order with a heap. Then:', 'queue দিয়ে Kahn লেখো, তারপর এক লাইন বদলে হিপ দিয়ে সবচেয়ে ছোট ক্রম বের করো। তারপর:'),
    [
      ['UVa 10305 — Ordering Tasks', 'any valid order', 'যেকোনো সঠিক ক্রম'],
      ['UVa 11060 — Beverages', 'a specific order: earliest-listed first (heap by index)', 'নির্দিষ্ট ক্রম: যে আগে লেখা সে আগে (ইনডেক্স ধরে হিপ)'],
      ['UVa 124 — Following Orders', 'print ALL orders with backtracking', 'ব্যাকট্র্যাকিং দিয়ে সব ক্রম প্রিন্ট'],
      ['UVa 200 — Rare Order', 'build the arrows from sorted words, then sort', 'সাজানো শব্দ থেকে তীর বানাও, তারপর সর্ট'],
      ['UVa 872 — Ordering', 'all orders, or "NO" if none', 'সব ক্রম, না থাকলে "NO"']
    ]
  ));
  return steps;
}

/** After the DFS topological-sort trace: why it works, and practice. */
export function topoDfsDeep(g) {
  const adj = adjOf(g);
  const seen = Array(g.V).fill(false);
  const f = Array(g.V).fill(0);
  let time = 0;
  const dfs = (u) => { seen[u] = true; time++; for (const { v } of adj[u]) if (!seen[v]) dfs(v); f[u] = ++time; };
  for (let i = 0; i < g.V; i++) if (!seen[i]) dfs(i);
  const order = [...Array(g.V).keys()].sort((a, b) => f[b] - f[a]);
  return [
    step(
      T('Why reversed finishing order always works', 'কেন উল্টো ফিনিশিং ক্রম সবসময় কাজ করে'),
      T(
        `Take any arrow **u → v**. We need u **before** v in the answer, i.e. u must finish **later** than v: \`f[u] > f[v]\`. When DFS looks at this arrow from u, v is in one of three states:\n\n- **white** (not visited) → DFS goes into v and finishes v **before** it can finish u;\n- **black** (finished) → v finished already, u finishes later;\n- **grey** (still open) → v is an ancestor of u, so u → v closes a **cycle** — impossible in a DAG.\n\nIn every possible case f[u] > f[v]. Check it on this graph:\n\n${g.edges.map((e) => `- ${e.u} → ${e.v}: f[${e.u}] = ${f[e.u]} > f[${e.v}] = ${f[e.v]} ✓`).join('\n')}\n\nSorting by f from big to small gives **${order.join(', ')}**.`,
        `যেকোনো একটা তীর **u → v** নাও। উত্তরে u-কে v-এর **আগে** লাগবে, মানে u-কে v-এর **পরে** শেষ হতে হবে: \`f[u] > f[v]\`। DFS যখন u থেকে এই তীরটা দেখে, v তখন তিন অবস্থার একটায়:\n\n- **সাদা** (দেখা হয়নি) → DFS v-এর ভেতরে যায়, আর u শেষ হওয়ার **আগেই** v শেষ করে;\n- **কালো** (শেষ) → v আগেই শেষ, u পরে শেষ হবে;\n- **ধূসর** (এখনো খোলা) → v হলো u-এর পূর্বপুরুষ, তাই u → v একটা **সাইকেল** বন্ধ করে — DAG-এ অসম্ভব।\n\nপ্রতিটা সম্ভাব্য ক্ষেত্রেই f[u] > f[v]। এই গ্রাফে মিলিয়ে দেখো:\n\n${g.edges.map((e) => `- ${e.u} → ${e.v}: f[${e.u}] = ${f[e.u]} > f[${e.v}] = ${f[e.v]} ✓`).join('\n')}\n\nf বড় থেকে ছোট সাজালে পাই **${order.join(', ')}**।`
      ),
      scene(g, { nodeState: Object.fromEntries(g.nodes.map((n) => [n.id, 'done'])), edgeState: allEdges(g, 'tree'), subs: Object.fromEntries(f.map((x, i) => [i, `f=${x}`])), panels: [{ type: 'output', label: T('sorted by f, biggest first', 'f অনুযায়ী, বড়টা আগে'), items: order }], status: T('every arrow: f[u] > f[v]', 'প্রতিটা তীরে: f[u] > f[v]') })
    ),
    step(
      T('Kahn or DFS — and cycles in the DFS version', 'Kahn না DFS — আর DFS ভার্সনে সাইকেল'),
      T(
        `Both are **O(V + E)** and both give a valid order.\n\n- **DFS** is shorter if you already have a DFS, and the finishing order is reused later (e.g. for strongly connected components).\n- **Kahn** finds a cycle without extra work (fewer than V tasks come out), and is easy to change into "smallest order" with a heap.\n\nThe DFS version as written above **does not notice** a cycle — it would print some order anyway. Add the grey check from the DFS lesson: an edge into a **grey** vertex means "cycle, no topological order".`,
        `দুটোই **O(V + E)**, দুটোই একটা সঠিক ক্রম দেয়।\n\n- তোমার কাছে আগে থেকেই DFS থাকলে **DFS** ছোট, আর ফিনিশিং ক্রম পরে আবার কাজে লাগে (যেমন স্ট্রংলি কানেক্টেড কম্পোনেন্টে)।\n- **Kahn** বাড়তি কাজ ছাড়াই সাইকেল ধরে (Vটার কম কাজ বের হয়), আর হিপ দিয়ে সহজেই "সবচেয়ে ছোট ক্রম"-এ বদলানো যায়।\n\nওপরে যেভাবে লেখা, DFS ভার্সন সাইকেল **টের পায় না** — যেভাবেই হোক একটা ক্রম প্রিন্ট করে দেবে। DFS লেসনের ধূসর চেকটা যোগ করো: **ধূসর** ভার্টেক্সের দিকে এজ মানে "সাইকেল আছে, টপোলজিক্যাল অর্ডার নেই"।`
      ),
      scene(g, { nodeState: Object.fromEntries(g.nodes.map((n) => [n.id, 'done'])), subs: Object.fromEntries(f.map((x, i) => [i, `f=${x}`])), status: T('both O(V + E)', 'দুটোই O(V + E)') })
    ),
    practiceStep(
      g,
      T('Practice problems', 'প্র্যাকটিস প্রবলেম'),
      T('Solve the first problem twice — once with Kahn, once with DFS — and compare the orders you print. Then:', 'প্রথম প্রবলেমটা দুবার সমাধান করো — একবার Kahn দিয়ে, একবার DFS দিয়ে — আর প্রিন্ট হওয়া ক্রম দুটো মিলিয়ে দেখো। তারপর:'),
      [
        ['UVa 10305 — Ordering Tasks', 'any valid order', 'যেকোনো সঠিক ক্রম'],
        ['UVa 11504 — Dominos', 'finishing order + a second DFS', 'ফিনিশিং ক্রম + দ্বিতীয় DFS'],
        ['UVa 452 — Project Scheduling', 'longest path in a DAG along a topological order', 'টপোলজিক্যাল ক্রম ধরে DAG-এ সবচেয়ে লম্বা পথ']
      ]
    )
  ];
}
