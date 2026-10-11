/* ------------------------------------------------------------------ *
 * Graphs chapter — "Topological Sort: The Ideas": the concept lesson that
 * comes before the Kahn / DFS topological-sort code lessons.
 *
 * No code here on purpose: what "a valid order" means, why a cycle makes it
 * impossible, Kahn's "do whatever waits for nothing" idea and the DFS
 * "finish order, reversed" idea, both run by hand on the same DAG the code
 * lessons use (generated, same neighbour order as the code), and when to
 * use which.
 * ------------------------------------------------------------------ */
import { G_DAG, adjOf } from '../../visuals/graphData.js';

const T = (en, bn) => (en === bn ? en : { en, bn });
const scene = (g, extra = {}) => ({ kind: 'graphx', directed: g.directed, weighted: g.weighted, nodes: g.nodes, edges: g.edges, ...extra });
const step = (title, explanation, sc) => ({ title, explanation, scene: sc });
const ek = (u, v) => `${u}-${v}`;
const list = (a) => (a.length ? a.join(', ') : '—');

const G = G_DAG;
const V = G.V;
const ADJ = adjOf(G).map((row) => row.map((x) => x.v));
const allEdges = (st) => Object.fromEntries(G.edges.map((e) => [ek(e.u, e.v), st]));

/** Is `order` valid: every arrow u → v has u before v? Returns the first broken arrow or null. */
const broken = (order) => G.edges.find((e) => order.indexOf(e.u) > order.indexOf(e.v)) || null;

// a tiny cycle for the "impossible" step
const G_CYC = {
  V: 3,
  directed: true,
  weighted: false,
  nodes: [{ id: 0, label: '0', x: 80, y: 220 }, { id: 1, label: '1', x: 250, y: 60 }, { id: 2, label: '2', x: 420, y: 220 }],
  edges: [{ u: 0, v: 1 }, { u: 1, v: 2 }, { u: 2, v: 0 }]
};

/* --------------------------------------------------------------- Kahn by hand */

function kahnSteps() {
  const indeg = Array(V).fill(0);
  for (const e of G.edges) indeg[e.v]++;
  const start = [...indeg];
  const queue = [];
  for (let v = 0; v < V; v++) if (indeg[v] === 0) queue.push(v);
  const firstQueue = [...queue];
  const order = [];
  const used = new Set();
  const out = [];
  const subsOf = () => Object.fromEntries([...Array(V).keys()].map((v) => [v, order.includes(v) ? '✓' : `in ${indeg[v]}`]));
  out.push(step(
    T('Kahn by hand: count what each task waits for', 'হাতে-কলমে কান: প্রতিটা কাজ কীসের অপেক্ষায় গোনো'),
    T(
      `For every task, count the arrows pointing **into** it — its **in-degree** = how many tasks it still waits for: ${[...Array(V).keys()].map((v) => `${v}: ${start[v]}`).join(', ')}.\n\nTasks with in-degree **0** wait for nothing — they can start **now**: **${firstQueue.join(', ')}**. Put them in a line (queue).`,
      `প্রতিটা কাজে কয়টা তীর **ঢোকে** গোনো — তার **ইন-ডিগ্রি (in-degree)** = সে এখনো কয়টা কাজের অপেক্ষায়: ${[...Array(V).keys()].map((v) => `${v}: ${start[v]}`).join(', ')}।\n\nইন-ডিগ্রি **0** মানে কিছুরই অপেক্ষা নেই — এখনই শুরু করা যায়: **${firstQueue.join(', ')}**। এদের একটা লাইনে (queue) রাখো।`
    ),
    scene(G, { nodeState: Object.fromEntries(firstQueue.map((v) => [v, 'frontier'])), subs: subsOf(), panels: [{ type: 'queue', label: T('ready to start (queue)', 'শুরু করার জন্য তৈরি (queue)'), items: [...queue] }, { type: 'output', label: T('order', 'ক্রম'), items: [] }], status: T(`in-degree 0 → ready: ${firstQueue.join(', ')}`, `ইন-ডিগ্রি 0 → তৈরি: ${firstQueue.join(', ')}`) })
  ));
  while (queue.length) {
    const qBefore = [...queue];
    const u = queue.shift();
    order.push(u);
    const lines = { en: [], bn: [] };
    const freed = [];
    for (const v of ADJ[u]) {
      indeg[v]--;
      used.add(ek(u, v));
      if (indeg[v] === 0) { queue.push(v); freed.push(v); }
      lines.en.push(`- ${u} → ${v}: in-degree of ${v} goes ${indeg[v] + 1} → **${indeg[v]}**${indeg[v] === 0 ? ` → ${v} is ready, join the line` : ''}`);
      lines.bn.push(`- ${u} → ${v}: ${v}-এর ইন-ডিগ্রি ${indeg[v] + 1} → **${indeg[v]}**${indeg[v] === 0 ? ` → ${v} তৈরি, লাইনে দাঁড়াও` : ''}`);
    }
    const edgeState = allEdges('');
    for (const k of used) edgeState[k] = 'dim';
    for (const v of ADJ[u]) edgeState[ek(u, v)] = 'relax';
    const nodeState = {};
    order.forEach((x) => { nodeState[x] = 'done'; });
    queue.forEach((x) => { nodeState[x] = 'frontier'; });
    nodeState[u] = 'current';
    freed.forEach((x) => { nodeState[x] = 'relax'; });
    out.push(step(
      T(`Kahn by hand: do task ${u}`, `হাতে-কলমে কান: কাজ ${u} করো`),
      T(
        `Line: [${list(qBefore)}]. Take the front: **${u}** → add it to the order (**${order.join(', ')}**).\n\n${u} is done, so every task waiting for it now waits for **one less** thing:\n${lines.en.length ? lines.en.join('\n') : `- nothing waits for ${u}`}\n\nLine now: [${list(queue)}].`,
        `লাইন: [${list(qBefore)}]। সামনের জন নাও: **${u}** → ক্রমে যোগ করো (**${order.join(', ')}**)।\n\n${u} শেষ, তাই যে কাজগুলো এর অপেক্ষায় ছিল তাদের অপেক্ষা **একটা কমে**:\n${lines.bn.length ? lines.bn.join('\n') : `- কেউ ${u}-এর অপেক্ষায় নেই`}\n\nএখনকার লাইন: [${list(queue)}]।`
      ),
      scene(G, { nodeState, edgeState, edgeFrom: Object.fromEntries(ADJ[u].map((v) => [ek(u, v), u])), subs: subsOf(), panels: [{ type: 'queue', label: T('ready to start (queue)', 'শুরু করার জন্য তৈরি (queue)'), items: [...queue] }, { type: 'output', label: T('order', 'ক্রম'), items: [...order], fresh: true }], status: T(`do ${u} · order ${order.join(', ')}`, `${u} করো · ক্রম ${order.join(', ')}`) })
    ));
  }
  return { steps: out, order };
}

/* --------------------------------------------------------------- DFS by hand */

function dfsSteps() {
  const visited = Array(V).fill(false);
  const finished = [];
  const out = [];
  const trail = [];
  const events = [];
  const go = (u) => {
    visited[u] = true;
    trail.push(u);
    for (const v of ADJ[u]) if (!visited[v]) go(v);
    finished.push(u);
    events.push({ u, trail: [...trail], finished: [...finished], waited: ADJ[u] });
    trail.pop();
  };
  const roots = [];
  for (let i = 0; i < V; i++) if (!visited[i]) { roots.push(i); go(i); }
  events.forEach((ev) => {
    const nodeState = {};
    ev.finished.forEach((x) => { nodeState[x] = 'done'; });
    ev.trail.forEach((x) => { nodeState[x] = 'frontier'; });
    nodeState[ev.u] = 'relax';
    const edgeState = allEdges('dim');
    for (const v of ev.waited) edgeState[ek(ev.u, v)] = 'tree';
    out.push(step(
      T(`DFS by hand: ${ev.u} is finished`, `হাতে-কলমে DFS: ${ev.u} শেষ`),
      T(
        `${ev.waited.length ? `Everything ${ev.u} points to (${ev.waited.join(', ')}) is already finished` : `${ev.u} points to nothing`} — so **${ev.u} is finished**. Put it on the result stack.\n\nTrail at this moment: ${ev.trail.join(' → ')}. Finished so far, in order: **${ev.finished.join(', ')}**.`,
        `${ev.waited.length ? `${ev.u} যাদের দিকে তীর দেয় (${ev.waited.join(', ')}) তারা সবাই আগেই শেষ` : `${ev.u} কারো দিকে তীর দেয় না`} — তাই **${ev.u} শেষ**। একে রেজাল্ট স্ট্যাকে রাখো।\n\nএই মুহূর্তের পথ: ${ev.trail.join(' → ')}। এ পর্যন্ত শেষ হওয়া, ক্রমে: **${ev.finished.join(', ')}**।`
      ),
      scene(G, { nodeState, edgeState, panels: [{ type: 'stack', label: T('result stack (finished)', 'রেজাল্ট স্ট্যাক (শেষ হওয়া)'), items: [...ev.finished] }], status: T(`finished: ${ev.finished.join(', ')}`, `শেষ: ${ev.finished.join(', ')}`) })
    ));
  });
  return { steps: out, finished, order: [...finished].reverse(), roots };
}

/* --------------------------------------------------------------- the lesson */

const kahn = kahnSteps();
const dfs = dfsSteps();
const BAD = [...kahn.order].reverse();
const badArrow = broken(BAD);

const WHICH_ROWS = [T('idea', 'ধারণা'), T('tools', 'হাতিয়ার'), T('cycle?', 'সাইকেল?'), T('nice when', 'যেখানে ভালো'), T('time', 'সময়')];
const WHICH_CELLS = [
  [T('do what waits for nothing, repeat', 'যার অপেক্ষা নেই সেটা করো, আবার'), T('finish order, reversed', 'শেষ হওয়ার ক্রম, উল্টো')],
  [T('in-degree[ ] + queue', 'in-degree[ ] + queue'), T('visited[ ] + recursion + stack', 'visited[ ] + রিকার্শন + stack')],
  [T('order shorter than V → cycle', 'ক্রম V-এর চেয়ে ছোট → সাইকেল'), T('needs an extra "on the trail" check', 'বাড়তি "পথে আছে" যাচাই লাগে')],
  [T('you want "ready" tasks step by step', 'ধাপে ধাপে "তৈরি" কাজ চাও'), T('you are already doing DFS', 'আগে থেকেই DFS করছ')],
  ['O(V + E)', 'O(V + E)']
];

const topoIdeas = {
  id: 'graph-topo-ideas',
  name: { en: 'Topological Sort: The Ideas', bn: 'টপোলজিক্যাল সর্ট: ধারণাগুলো' },
  description: { en: 'Valid orders, why cycles break them, Kahn and DFS by hand, and when to use which', bn: 'সঠিক ক্রম, সাইকেল কেন ভাঙে, হাতে-কলমে কান ও DFS, আর কখন কোনটা' },
  categoryKey: 'graphs',
  subgroupKey: 'g-topo',
  level: 'beginner',
  order: 5,
  icon: '🧭',
  complexity: { time: 'O(V + E)', space: 'O(V)', note: { en: 'Both Kahn and the DFS version look at every task once and every arrow once.', bn: 'কান আর DFS সংস্করণ দুটোই প্রতিটা কাজ একবার আর প্রতিটা তীর একবার দেখে।' } },
  steps: [
    step(
      T('The problem: tasks that must wait', 'সমস্যা: যে কাজগুলোকে অপেক্ষা করতে হয়'),
      T(
        'Each circle is a **task**, and an arrow **u → v** means "**u must be done before v**".\n\nWe want a **list of all tasks** in an order that respects **every** arrow. That list is a **topological order**.\n\nReal life: university courses and their prerequisites, installing packages that depend on other packages (npm, pip), cells in a spreadsheet that use other cells, the steps of a recipe.',
        'প্রতিটা বৃত্ত একটা **কাজ**, আর তীর **u → v** মানে "**v-এর আগে u শেষ করতে হবে**"।\n\nআমরা চাই **সব কাজের একটা তালিকা**, এমন ক্রমে যা **প্রতিটা** তীর মানে। সেই তালিকাই **টপোলজিক্যাল ক্রম (topological order)**।\n\nবাস্তবে: বিশ্ববিদ্যালয়ের কোর্স আর তাদের প্রি-রিকুইজিট, অন্য প্যাকেজের ওপর নির্ভর করা প্যাকেজ ইনস্টল (npm, pip), স্প্রেডশিটের যে ঘর অন্য ঘর ব্যবহার করে, রান্নার রেসিপির ধাপ।'
      ),
      scene(G, { status: T('arrow u → v: do u before v', 'তীর u → v: v-এর আগে u') })
    ),
    step(
      T('Valid and invalid orders', 'সঠিক আর ভুল ক্রম'),
      T(
        `**${kahn.order.join(', ')}** is valid: check any arrow, its tail comes earlier in the list.\n\n**${BAD.join(', ')}** is **not** valid: arrow **${badArrow.u} → ${badArrow.v}** says ${badArrow.u} first, but the list puts ${badArrow.v} first (red).\n\nUsually there are **several** valid orders — any one of them is a correct answer. (Kahn and DFS below will even give two different ones.)`,
        `**${kahn.order.join(', ')}** সঠিক: যেকোনো তীর দেখো, তার লেজ তালিকায় আগে আসে।\n\n**${BAD.join(', ')}** সঠিক **নয়**: তীর **${badArrow.u} → ${badArrow.v}** বলে ${badArrow.u} আগে, কিন্তু তালিকা ${badArrow.v}-কে আগে রেখেছে (লাল)।\n\nসাধারণত **একাধিক** সঠিক ক্রম থাকে — যেকোনো একটাই সঠিক উত্তর। (নিচে কান আর DFS এমনকি দুটো আলাদা ক্রম দেবে।)`
      ),
      scene(G, { edgeState: { [ek(badArrow.u, badArrow.v)]: 'reject' }, nodeState: { [badArrow.u]: 'reject', [badArrow.v]: 'reject' }, panels: [{ type: 'output', label: T('valid ✓', 'সঠিক ✓'), items: kahn.order }, { type: 'output', label: T('not valid ✗', 'সঠিক নয় ✗'), items: BAD }], status: T(`${BAD.join(', ')} breaks ${badArrow.u} → ${badArrow.v}`, `${BAD.join(', ')} ভাঙে ${badArrow.u} → ${badArrow.v}`) })
    ),
    step(
      T('A cycle makes it impossible', 'সাইকেল থাকলে অসম্ভব'),
      T(
        '0 before 1, 1 before 2, 2 before 0. Who goes first? Whoever you pick is waiting for someone else — **no valid order exists**.\n\nSo topological sort works only on a **DAG** — a **D**irected **A**cyclic **G**raph (arrows, no cycle). A good algorithm should not just fail silently: it should **tell us** when there is a cycle. Both algorithms below can.',
        '1-এর আগে 0, 2-এর আগে 1, 0-এর আগে 2। প্রথমে কে? যাকেই বাছো সে অন্য কারো অপেক্ষায় — **কোনো সঠিক ক্রম নেই**।\n\nতাই টপোলজিক্যাল সর্ট শুধু **DAG**-এ কাজ করে — **D**irected **A**cyclic **G**raph (তীর আছে, সাইকেল নেই)। ভালো অ্যালগরিদম চুপচাপ ব্যর্থ হয় না: সাইকেল থাকলে সে **জানিয়ে দেয়**। নিচের দুটো অ্যালগরিদমই পারে।'
      ),
      scene(G_CYC, { edgeState: { '0-1': 'reject', '1-2': 'reject', '2-0': 'reject' }, nodeState: { 0: 'reject', 1: 'reject', 2: 'reject' }, status: T('0 → 1 → 2 → 0: everyone waits for someone', '0 → 1 → 2 → 0: সবাই কারো না কারো অপেক্ষায়') })
    ),
    step(
      T('Kahn\'s idea: do whatever waits for nothing', 'কানের ধারণা: যার কোনো অপেক্ষা নেই সেটা করো'),
      T(
        'Think of it like a to-do list:\n\n1. Find the tasks that wait for **nothing** (no arrow comes in).\n2. Do one of them and **cross it off** — its outgoing arrows disappear.\n3. Some tasks may now wait for nothing too. Repeat.\n\nTo know "waits for nothing" quickly, keep a count per task: **in-degree** = arrows still coming in. Let\'s run it.',
        'একটা করণীয় তালিকার মতো ভাবো:\n\n1. যে কাজগুলো **কিছুরই** অপেক্ষায় নেই (কোনো তীর ঢোকে না) তাদের খোঁজো।\n2. একটা করো আর **কেটে দাও** — তার বের হওয়া তীরগুলো মুছে যায়।\n3. এখন হয়তো আরও কিছু কাজের অপেক্ষা শেষ। আবার করো।\n\n"কিছুর অপেক্ষা নেই" দ্রুত জানতে প্রতিটা কাজে একটা গণনা রাখো: **ইন-ডিগ্রি** = এখনো কয়টা তীর ঢোকে। চলো চালাই।'
      ),
      scene(G, { subs: Object.fromEntries([...Array(V).keys()].map((v) => [v, `in ${G.edges.filter((e) => e.v === v).length}`])), status: T('in-degree = arrows coming in', 'ইন-ডিগ্রি = ঢোকা তীরের সংখ্যা') })
    ),
    ...kahn.steps,
    step(
      T('Kahn done — and how it spots a cycle', 'কান শেষ — আর সাইকেল কীভাবে ধরে'),
      T(
        `Order: **${kahn.order.join(', ')}** — all ${V} tasks, and every arrow points forward.\n\nOn a graph **with a cycle**, the tasks on the cycle all keep in-degree ≥ 1 (each waits for the one before it), so they **never** join the line. Kahn stops early with fewer than V tasks in the order → "**there is a cycle**".`,
        `ক্রম: **${kahn.order.join(', ')}** — ${V}টা কাজই, আর প্রতিটা তীর সামনের দিকে।\n\n**সাইকেলওয়ালা** গ্রাফে সাইকেলের কাজগুলোর ইন-ডিগ্রি সবসময় ≥ 1 থাকে (প্রত্যেকে আগের জনের অপেক্ষায়), তাই তারা **কখনো** লাইনে আসে না। কান V-এর কম কাজ নিয়ে আগেই থামে → "**সাইকেল আছে**"।`
      ),
      scene(G, { nodeState: Object.fromEntries([...Array(V).keys()].map((v) => [v, 'done'])), subs: Object.fromEntries(kahn.order.map((v, i) => [v, `#${i + 1}`])), panels: [{ type: 'output', label: T('Kahn order', 'কানের ক্রম'), items: kahn.order }], status: T(`order: ${kahn.order.join(', ')}`, `ক্রম: ${kahn.order.join(', ')}`) })
    ),
    step(
      T('The DFS idea: finish order, reversed', 'DFS ধারণা: শেষ হওয়ার ক্রম, উল্টো করে'),
      T(
        `Now a completely different idea. Run **DFS**, and say a task is **finished** when DFS has explored everything it points to.\n\nKey fact: a task always finishes **after** every task that must come after it. So the finish order is a valid order **backwards**. Push each finished task on a stack; at the end, read the stack from the top.\n\nWe start DFS from every task not yet visited, in number order: ${dfs.roots.join(', ')}.`,
        `এবার একদম আলাদা ধারণা। **DFS** চালাও, আর একটা কাজকে **শেষ** বলো যখন সে যাদের দিকে তীর দেয় তাদের সবাইকে DFS ঘুরে ফেলেছে।\n\nমূল কথা: একটা কাজ সবসময় শেষ হয় তার **পরে** যাদের আসতে হবে তাদের সবার **পরে**। তাই শেষ হওয়ার ক্রম হলো সঠিক ক্রমের **উল্টো**। প্রতিটা শেষ হওয়া কাজ একটা স্ট্যাকে রাখো; শেষে স্ট্যাক ওপর থেকে পড়ো।\n\nএখনো ভিজিট হয়নি এমন প্রতিটা কাজ থেকে নম্বরের ক্রমে DFS শুরু: ${dfs.roots.join(', ')}।`
      ),
      scene(G, { status: T('finish = everything it points to is done', 'শেষ = যাদের দিকে তীর দেয় সবাই শেষ') })
    ),
    ...dfs.steps,
    step(
      T('Read the stack from the top', 'স্ট্যাক ওপর থেকে পড়ো'),
      T(
        `Finished in this order: ${dfs.finished.join(', ')}. Read it **backwards** (stack top first): **${dfs.order.join(', ')}**.\n\nCheck: ${broken(dfs.order) ? 'something is wrong' : 'every arrow points forward ✓'}. It is a **different** valid order from Kahn's (${kahn.order.join(', ')}) — both are correct.`,
        `এই ক্রমে শেষ হয়েছে: ${dfs.finished.join(', ')}। **উল্টো** পড়ো (স্ট্যাকের ওপর আগে): **${dfs.order.join(', ')}**।\n\nযাচাই: ${broken(dfs.order) ? 'কিছু ভুল আছে' : 'প্রতিটা তীর সামনের দিকে ✓'}। এটা কানের (${kahn.order.join(', ')}) থেকে **আলাদা** একটা সঠিক ক্রম — দুটোই ঠিক।`
      ),
      scene(G, { nodeState: Object.fromEntries([...Array(V).keys()].map((v) => [v, 'done'])), subs: Object.fromEntries(dfs.order.map((v, i) => [v, `#${i + 1}`])), panels: [{ type: 'output', label: T('DFS order (reversed finish)', 'DFS ক্রম (শেষের উল্টো)'), items: dfs.order }, { type: 'output', label: T('Kahn order', 'কানের ক্রম'), items: kahn.order }], status: T(`DFS: ${dfs.order.join(', ')} · Kahn: ${kahn.order.join(', ')}`, `DFS: ${dfs.order.join(', ')} · কান: ${kahn.order.join(', ')}`) })
    ),
    step(
      T('Kahn or DFS: when to use which', 'কান না DFS: কখন কোনটা'),
      T(
        'Both are O(V + E) and both give a correct order. Differences:\n\n- **Kahn** builds the order from the **front**, and at every moment you know which tasks are **ready** — handy for scheduling ("what can run in parallel now?"). Detecting a cycle is free: the order ends up shorter than V.\n- **DFS** is short to write if you already know DFS, but it builds the order **backwards**, and detecting a cycle needs an extra "is this vertex still on my trail?" check.',
        'দুটোই O(V + E) আর দুটোই সঠিক ক্রম দেয়। পার্থক্য:\n\n- **কান** ক্রম **সামনে** থেকে বানায়, আর প্রতি মুহূর্তে জানো কোন কাজগুলো **তৈরি** — শিডিউলিংয়ে কাজের ("এখন একসঙ্গে কী চালানো যায়?")। সাইকেল ধরা বিনা খরচে: ক্রম V-এর চেয়ে ছোট হয়।\n- **DFS** লেখা ছোট যদি DFS আগে থেকেই জানো, কিন্তু ক্রম বানায় **উল্টো দিক থেকে**, আর সাইকেল ধরতে বাড়তি "এই ভার্টেক্স কি এখনো আমার পথে?" যাচাই লাগে।'
      ),
      scene(G, { panels: [{ type: 'matrix', label: T('Kahn vs DFS', 'কান বনাম DFS'), rows: WHICH_ROWS, cols: [T('Kahn', 'কান'), 'DFS'], cells: WHICH_CELLS, wide: true }], status: T('ready-list → Kahn · already DFS → DFS', 'তৈরি-তালিকা → কান · আগেই DFS → DFS') })
    ),
    step(
      T('From idea to code, and check yourself', 'ধারণা থেকে কোডে, আর নিজেকে যাচাই'),
      T(
        `- **Kahn code:** count \`indeg[]\` from the edges; push every \`indeg == 0\` vertex into a queue; \`while\` the queue is not empty: take \`u\`, add it to the order, and for each arrow \`u → v\`: \`indeg[v]--\`, \`if (indeg[v] == 0) queue.push(v)\`.\n- **DFS code:** \`for\` every unvisited vertex call \`dfs(i)\`; inside, visit the neighbours first, then \`stack.push(u)\` at the very **end**; finally pop everything.\n\n**Check yourself:** 1) Is ${BAD.join(', ')} valid? 2) Which tasks are ready at the very start? 3) What does Kahn do on a cycle?\n\n> **Answers:** 1) No — it breaks ${badArrow.u} → ${badArrow.v}. 2) ${kahn.steps.length ? kahn.order.filter((v) => G.edges.every((e) => e.v !== v)).join(', ') : ''} (in-degree 0). 3) Stops with fewer than V tasks → reports a cycle.`,
        `- **কানের কোড:** এজ থেকে \`indeg[]\` গোনো; প্রতিটা \`indeg == 0\` ভার্টেক্স queue-তে রাখো; queue খালি না হওয়া পর্যন্ত: \`u\` নাও, ক্রমে যোগ করো, আর প্রতিটা তীর \`u → v\`-এর জন্য: \`indeg[v]--\`, \`if (indeg[v] == 0) queue.push(v)\`।\n- **DFS কোড:** প্রতিটা না-দেখা ভার্টেক্সে \`dfs(i)\` কল; ভেতরে আগে প্রতিবেশীদের ঘোরো, তারপর একদম **শেষে** \`stack.push(u)\`; শেষে সব pop করো।\n\n**নিজেকে যাচাই:** ১) ${BAD.join(', ')} কি সঠিক? ২) একদম শুরুতে কোন কাজগুলো তৈরি? ৩) সাইকেল থাকলে কান কী করে?\n\n> **উত্তর:** ১) না — ${badArrow.u} → ${badArrow.v} ভাঙে। ২) ${kahn.order.filter((v) => G.edges.every((e) => e.v !== v)).join(', ')} (ইন-ডিগ্রি 0)। ৩) V-এর কম কাজ নিয়ে থামে → সাইকেল জানায়।`
      ),
      scene(G, { nodeState: Object.fromEntries(kahn.order.filter((v) => G.edges.every((e) => e.v !== v)).map((v) => [v, 'frontier'])), status: T('question 2: in-degree 0 at the start', 'প্রশ্ন ২: শুরুতে ইন-ডিগ্রি 0') })
    )
  ]
};

export const topoConceptTopics = [topoIdeas];
