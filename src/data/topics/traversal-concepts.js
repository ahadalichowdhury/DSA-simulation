/* ------------------------------------------------------------------ *
 * Graphs chapter — "Graph Traversal: The Ideas": the concept lesson that
 * comes before the BFS / DFS code lessons.
 *
 * No code here on purpose: why we traverse, why `visited` is needed, the
 * ripple (BFS, queue) vs the explorer (DFS, stack), both run by hand on the
 * same graph the code lessons use (generated from a real run, neighbours in
 * the same order as the code's adjacency list), and when to use which.
 * ------------------------------------------------------------------ */
import { G_TRAV, adjOf } from '../../visuals/graphData.js';

const T = (en, bn) => (en === bn ? en : { en, bn });
const scene = (g, extra = {}) => ({ kind: 'graphx', directed: g.directed, weighted: g.weighted, nodes: g.nodes, edges: g.edges, ...extra });
const step = (title, explanation, sc) => ({ title, explanation, scene: sc });
const ek = (u, v) => `${u}-${v}`;
const keyOf = (g, u, v) => (g.edges.some((e) => e.u === u && e.v === v) ? ek(u, v) : ek(v, u));
const list = (a) => (a.length ? a.join(', ') : '—');

const G = G_TRAV;
const ADJ = adjOf(G).map((row) => row.map((x) => x.v));

/* --------------------------------------------------------------- BFS by hand */

function bfsRun(start) {
  const visited = Array(G.V).fill(false);
  const level = Array(G.V).fill(null);
  const parent = Array(G.V).fill(-1);
  const q = [start];
  visited[start] = true;
  level[start] = 0;
  const order = [];
  const rounds = [];
  while (q.length) {
    const qBefore = [...q];
    const u = q.shift();
    order.push(u);
    const checks = ADJ[u].map((v) => {
      const seen = visited[v];
      if (!seen) { visited[v] = true; level[v] = level[u] + 1; parent[v] = u; q.push(v); }
      return { v, seen };
    });
    rounds.push({ u, qBefore, qAfter: [...q], checks, order: [...order], visited: [...visited], level: [...level], parent: [...parent] });
  }
  return { rounds, order, level, parent };
}

function bfsSteps() {
  const { rounds, order, level, parent } = bfsRun(0);
  const out = rounds.map((r, i) => {
    const edgeState = Object.fromEntries(G.edges.map((e) => [ek(e.u, e.v), 'dim']));
    for (let v = 0; v < G.V; v++) if (r.parent[v] >= 0) edgeState[keyOf(G, r.parent[v], v)] = 'tree';
    for (const c of r.checks) edgeState[keyOf(G, r.u, c.v)] = c.seen ? (edgeState[keyOf(G, r.u, c.v)] === 'tree' ? 'tree' : 'compare') : 'relax';
    const nodeState = {};
    r.order.forEach((v) => { nodeState[v] = 'done'; });
    r.qAfter.forEach((v) => { nodeState[v] = 'frontier'; });
    nodeState[r.u] = 'current';
    const lines = (lang) => r.checks.map((c) => `- ${c.v}: ${c.seen ? (lang === 'bn' ? 'আগেই দেখা → বাদ' : 'already seen → skip') : (lang === 'bn' ? `নতুন → চিহ্ন দাও, পেছনে লাইনে দাঁড় করাও (লেভেল ${r.level[c.v]})` : `new → mark it, join the back of the line (level ${r.level[c.v]})`)}`).join('\n');
    return step(
      T(`BFS by hand ${i + 1}: serve ${r.u}`, `হাতে-কলমে BFS ${i + 1}: ${r.u}-কে সার্ভ করো`),
      T(
        `${i === 0 ? 'Start: mark 0 as seen and put it in the line (queue).\n\n' : ''}Line before: [${list(r.qBefore)}]. Take the **front**: **${r.u}** (level ${r.level[r.u]}) → visit it.\n\nIts neighbours, in order:\n${lines('en')}\n\nLine now: [${list(r.qAfter)}].`,
        `${i === 0 ? 'শুরু: 0-কে দেখা হয়েছে বলে চিহ্ন দাও আর লাইনে (queue) রাখো।\n\n' : ''}আগের লাইন: [${list(r.qBefore)}]। **সামনের** জনকে নাও: **${r.u}** (লেভেল ${r.level[r.u]}) → ভিজিট করো।\n\nতার প্রতিবেশীরা, ক্রমে:\n${lines('bn')}\n\nএখনকার লাইন: [${list(r.qAfter)}]।`
      ),
      scene(G, {
        nodeState,
        edgeState,
        edgeFrom: Object.fromEntries(r.checks.map((c) => [keyOf(G, r.u, c.v), r.u])),
        subs: Object.fromEntries(r.level.map((l, v) => [v, l == null ? '' : `L${l}`])),
        panels: [{ type: 'queue', label: T('the line (queue) — front is served first', 'লাইন (queue) — সামনের জন আগে'), items: r.qAfter }, { type: 'output', label: T('visit order', 'ভিজিটের ক্রম'), items: r.order, fresh: true }],
        status: T(`serve ${r.u} · queue [${list(r.qAfter)}]`, `${r.u} সার্ভ · queue [${list(r.qAfter)}]`)
      })
    );
  });
  return { steps: out, order, level, parent };
}

/* --------------------------------------------------------------- DFS by hand */

function dfsRun(start) {
  const visited = Array(G.V).fill(false);
  const parent = Array(G.V).fill(-1);
  const order = [];
  const events = []; // { type: 'enter' | 'leave', u, stack }
  const stack = [];
  const go = (u) => {
    visited[u] = true;
    order.push(u);
    stack.push(u);
    events.push({ type: 'enter', u, stack: [...stack], order: [...order], parent: [...parent] });
    for (const v of ADJ[u]) if (!visited[v]) { parent[v] = u; go(v); }
    stack.pop();
    events.push({ type: 'leave', u, stack: [...stack] });
  };
  go(start);
  return { events, order, parent };
}

function dfsSteps() {
  const { events, order, parent } = dfsRun(0);
  const out = [];
  let backtracked = [];
  events.forEach((ev, idx) => {
    if (ev.type === 'leave') { backtracked.push(ev.u); return; }
    const u = ev.u;
    const from = ev.parent[u];
    const edgeState = Object.fromEntries(G.edges.map((e) => [ek(e.u, e.v), 'dim']));
    for (let v = 0; v < G.V; v++) if (ev.parent[v] >= 0 && ev.order.includes(v)) edgeState[keyOf(G, ev.parent[v], v)] = 'tree';
    if (from >= 0) edgeState[keyOf(G, from, u)] = 'relax';
    const nodeState = {};
    ev.order.forEach((v) => { nodeState[v] = 'done'; });
    ev.stack.forEach((v) => { nodeState[v] = 'frontier'; });
    nodeState[u] = 'current';
    // look ahead: which neighbours of u are already seen when we arrive
    const seenNow = ADJ[u].filter((v) => ev.order.includes(v) && v !== u);
    const back = backtracked.length ? backtracked : null;
    backtracked = [];
    const nextLeaveOnly = events.slice(idx + 1).findIndex((e) => e.type === 'enter') === -1;
    out.push(step(
      T(`DFS by hand ${out.length + 1}: ${from < 0 ? `start at ${u}` : `${from} → ${u}`}`, `হাতে-কলমে DFS ${out.length + 1}: ${from < 0 ? `${u} থেকে শুরু` : `${from} → ${u}`}`),
      T(
        `${back ? `**Dead end:** ${back.join(', ')} had no unseen neighbour left, so we **walked back** (backtracked) to ${from}. ` : ''}${from < 0 ? `Start at **${u}**: mark it and visit it.` : `${from}'s next unseen neighbour is **${u}** → go there **right away**, mark it, visit it.`}\n\n${seenNow.length ? `Neighbours of ${u} already seen: ${seenNow.join(', ')} (skip them). ` : ''}The trail behind us (call stack): ${ev.stack.join(' → ')}.${nextLeaveOnly ? `\n\nAfter this, every vertex is seen: DFS walks all the way back along the trail and ends.` : ''}`,
        `${back ? `**কানাগলি:** ${back.join(', ')}-এর আর কোনো না-দেখা প্রতিবেশী নেই, তাই আমরা ${from}-এ **ফিরে গেলাম** (ব্যাকট্র্যাক)। ` : ''}${from < 0 ? `**${u}** থেকে শুরু: চিহ্ন দাও আর ভিজিট করো।` : `${from}-এর পরের না-দেখা প্রতিবেশী **${u}** → **সঙ্গে সঙ্গে** সেখানে যাও, চিহ্ন দাও, ভিজিট করো।`}\n\n${seenNow.length ? `${u}-এর যে প্রতিবেশীরা আগেই দেখা: ${seenNow.join(', ')} (বাদ)। ` : ''}পেছনের পথ (কল স্ট্যাক): ${ev.stack.join(' → ')}।${nextLeaveOnly ? `\n\nএরপর সব ভার্টেক্স দেখা হয়ে গেছে: DFS পথ ধরে পুরোটা ফিরে যায় আর শেষ হয়।` : ''}`
      ),
      scene(G, {
        nodeState,
        edgeState,
        edgeFrom: from >= 0 ? { [keyOf(G, from, u)]: from } : {},
        panels: [{ type: 'stack', label: T('the trail (call stack) — top = where we are', 'পেছনের পথ (কল স্ট্যাক) — ওপরে = এখন যেখানে'), items: ev.stack.map((v) => `dfs(${v})`) }, { type: 'output', label: T('visit order', 'ভিজিটের ক্রম'), items: ev.order, fresh: true }],
        status: T(`at ${u} · trail ${ev.stack.join(' → ')}`, `${u}-এ · পথ ${ev.stack.join(' → ')}`)
      })
    ));
  });
  return { steps: out, order, parent };
}

/* --------------------------------------------------------------- the lesson */

const bfs = bfsSteps();
const dfs = dfsSteps();
const treeState = (parent) => Object.fromEntries(G.edges.map((e) => [ek(e.u, e.v), parent[e.v] === e.u || parent[e.u] === e.v ? 'tree' : 'dim']));

const WHICH_ROWS = [T('moves like', 'চলে যেমন'), T('memory tool', 'মেমরির হাতিয়ার'), T('finds', 'খুঁজে দেয়'), T('great for', 'যেখানে দারুণ'), T('time', 'সময়')];
const WHICH_CELLS = [
  [T('a ripple: level by level', 'ঢেউ: লেভেল ধরে'), T('an explorer: deep, then back', 'অভিযাত্রী: গভীরে, তারপর ফেরা')],
  [T('queue (first in, first out)', 'queue (আগে এলে আগে)'), T('stack / recursion (last in, first out)', 'stack / রিকার্শন (শেষে এলে আগে)')],
  [T('fewest-edge path to every vertex', 'প্রতিটা ভার্টেক্সে সবচেয়ে কম এজের পথ'), T('a path, not the shortest', 'একটা পথ, সবচেয়ে ছোট না')],
  [T('shortest path (unweighted), levels, nearest X', 'শর্টেস্ট পাথ (ওজন ছাড়া), লেভেল, সবচেয়ে কাছের X'), T('cycles, topological sort, mazes, backtracking', 'সাইকেল, টপোলজিক্যাল সর্ট, গোলকধাঁধা, ব্যাকট্র্যাকিং')],
  ['O(V + E)', 'O(V + E)']
];

const travIdeas = {
  id: 'graph-traversal-ideas',
  name: { en: 'Graph Traversal: The Ideas', bn: 'গ্রাফ ট্রাভার্সাল: ধারণাগুলো' },
  description: { en: 'Why visited[] is needed, the ripple (BFS) vs the explorer (DFS) by hand, and when to use which', bn: 'visited[] কেন লাগে, হাতে-কলমে ঢেউ (BFS) বনাম অভিযাত্রী (DFS), আর কখন কোনটা' },
  categoryKey: 'graphs',
  subgroupKey: 'g-traverse',
  level: 'beginner',
  order: 5,
  icon: '🧩',
  complexity: { time: 'O(V + E)', space: 'O(V)', note: { en: 'Both visit every vertex once and look at every edge from both ends (adjacency list).', bn: 'দুটোই প্রতিটা ভার্টেক্স একবার ভিজিট করে আর প্রতিটা এজ দুই মাথা থেকে দেখে (অ্যাডজাসেন্সি লিস্ট)।' } },
  steps: [
    step(
      T('The problem: visit every vertex', 'সমস্যা: প্রতিটা ভার্টেক্স ঘোরা'),
      T(
        'Many questions start with "**go through the whole graph from here**":\n\n- Who can I reach from vertex 0? (Is the network connected?)\n- Friends of friends on Facebook: who is 1 step away, 2 steps away…?\n- Is there a way out of this maze?\n- How many separate islands does the map have?\n\nA **traversal** is a plan for visiting every reachable vertex **exactly once**. There are two classic plans: **BFS** and **DFS**.',
        'অনেক প্রশ্ন শুরু হয় "**এখান থেকে পুরো গ্রাফটা ঘোরো**" দিয়ে:\n\n- ভার্টেক্স 0 থেকে কার কাছে পৌঁছানো যায়? (নেটওয়ার্ক কি যুক্ত?)\n- ফেসবুকে বন্ধুর বন্ধু: কে ১ ধাপ দূরে, কে ২ ধাপ দূরে…?\n- এই গোলকধাঁধা থেকে বের হওয়ার পথ আছে?\n- ম্যাপে কয়টা আলাদা দ্বীপ?\n\n**ট্রাভার্সাল (traversal)** মানে পৌঁছানো যায় এমন প্রতিটা ভার্টেক্স **ঠিক একবার** ঘোরার পরিকল্পনা। দুটো ক্লাসিক পরিকল্পনা: **BFS** আর **DFS**।'
      ),
      scene(G, { nodeState: { 0: 'source' }, tags: { 0: 'start' }, status: T('visit every vertex reachable from 0, each once', '0 থেকে পৌঁছানো যায় এমন প্রতিটা ভার্টেক্স, প্রতিটা একবার') })
    ),
    step(
      T('The danger: cycles', 'বিপদ: সাইকেল'),
      T(
        'Look at the loop **0 – 1 – 4 – 2 – 0**. If we just "go to every neighbour", we go 0 → 1 → 4 → 2 → 0 → 1 → … **forever**, and print vertices again and again.\n\nThe fix is one array: `visited[v]` = "have I already seen v?". **Before** going to a neighbour, check it; once a vertex is seen, never add it again.\n\nBoth BFS and DFS use exactly this rule. That is why every traversal code starts with `visited = all false`.',
        '**0 – 1 – 4 – 2 – 0** লুপটা দেখো। শুধু "প্রতিটা প্রতিবেশীতে যাও" করলে আমরা যাব 0 → 1 → 4 → 2 → 0 → 1 → … **চিরকাল**, আর ভার্টেক্স বারবার প্রিন্ট হবে।\n\nসমাধান একটা অ্যারে: `visited[v]` = "v কি আগেই দেখেছি?"। প্রতিবেশীতে যাওয়ার **আগে** এটা দেখো; একবার দেখা হলে আর কখনো যোগ করবে না।\n\nBFS আর DFS দুটোই ঠিক এই নিয়ম মানে। এজন্যই প্রতিটা ট্রাভার্সাল কোড শুরু হয় `visited = সব false` দিয়ে।'
      ),
      scene(G, { edgeState: { ...Object.fromEntries(G.edges.map((e) => [ek(e.u, e.v), 'dim'])), '0-1': 'reject', '1-4': 'reject', '2-4': 'reject', '0-2': 'reject' }, nodeState: { 0: 'reject', 1: 'reject', 4: 'reject', 2: 'reject' }, status: T('0 → 1 → 4 → 2 → 0 → … forever without visited[]', 'visited[] ছাড়া 0 → 1 → 4 → 2 → 0 → … চিরকাল') })
    ),
    step(
      T('Two plans: the ripple and the explorer', 'দুটো পরিকল্পনা: ঢেউ আর অভিযাত্রী'),
      T(
        '- **BFS (Breadth-First Search) — the ripple.** Drop a stone in water: first the start, then everything **1 edge** away, then everything **2 edges** away… It finishes a whole level before moving on. Tool: a **queue** (a fair waiting line — first come, first served).\n- **DFS (Depth-First Search) — the explorer in a maze.** Walk forward as far as you can; at a dead end, **walk back** to the last fork and try the next way. Tool: a **stack** — in code, usually **recursion** (the function calls itself).\n\nSame graph, same `visited` rule — only the **order** of visiting is different. Let\'s run both by hand.',
        '- **BFS (Breadth-First Search) — ঢেউ।** পানিতে ঢিল ফেলো: আগে শুরু, তারপর **১ এজ** দূরের সবাই, তারপর **২ এজ** দূরের সবাই… একটা পুরো লেভেল শেষ করে তবেই এগোয়। হাতিয়ার: একটা **queue** (ন্যায্য লাইন — আগে এলে আগে)।\n- **DFS (Depth-First Search) — গোলকধাঁধার অভিযাত্রী।** যতদূর পারো সামনে হাঁটো; কানাগলিতে শেষ মোড় পর্যন্ত **ফিরে যাও** আর পরের পথ চেষ্টা করো। হাতিয়ার: একটা **stack** — কোডে সাধারণত **রিকার্শন** (ফাংশন নিজেকে কল করে)।\n\nএকই গ্রাফ, একই `visited` নিয়ম — শুধু ঘোরার **ক্রম** আলাদা। চলো দুটোই হাতে-কলমে চালাই।'
      ),
      scene(G, { nodeState: { 0: 'source', 1: 'frontier', 2: 'frontier', 3: 'frontier' }, edgeState: { '0-1': 'frontier', '0-2': 'frontier', '0-3': 'frontier' }, tags: { 0: 'start' }, status: T('BFS: all of 1, 2, 3 first · DFS: 1, then deeper', 'BFS: আগে 1, 2, 3 সবাই · DFS: 1, তারপর আরও গভীরে') })
    ),
    ...bfs.steps,
    step(
      T('Why the queue gives levels', 'queue কেন লেভেল দেয়'),
      T(
        `BFS visited: **${bfs.order.join(', ')}**. Levels (edges from 0): ${bfs.order.map((v) => `${v}: L${bfs.level[v]}`).join(', ')}.\n\nThe queue is **first in, first out**. Everyone at level 1 joins the line before anyone at level 2, so all of level 1 is served before level 2 even starts.\n\nResult: the green tree gives the **fewest-edge path** from 0 to every vertex. So on an **unweighted** graph, BFS **is** a shortest-path algorithm.`,
        `BFS ভিজিট করল: **${bfs.order.join(', ')}**। লেভেল (0 থেকে এজ): ${bfs.order.map((v) => `${v}: L${bfs.level[v]}`).join(', ')}।\n\nqueue হলো **আগে এলে আগে যাবে**। লেভেল ১-এর সবাই লেভেল ২-এর কারো আগে লাইনে দাঁড়ায়, তাই লেভেল ২ শুরুর আগেই লেভেল ১-এর সবার সার্ভ শেষ।\n\nফল: সবুজ ট্রি 0 থেকে প্রতিটা ভার্টেক্সে **সবচেয়ে কম এজের পথ** দেয়। তাই **ওজনহীন** গ্রাফে BFS **নিজেই** একটা শর্টেস্ট-পাথ অ্যালগরিদম।`
      ),
      scene(G, { edgeState: treeState(bfs.parent), nodeState: Object.fromEntries(G.nodes.map((n) => [n.id, 'done'])), subs: Object.fromEntries(bfs.level.map((l, v) => [v, `L${l}`])), panels: [{ type: 'output', label: T('BFS order', 'BFS ক্রম'), items: bfs.order }], status: T('green = BFS tree = fewest-edge paths', 'সবুজ = BFS ট্রি = সবচেয়ে কম এজের পথ') })
    ),
    ...dfs.steps,
    step(
      T('Why the stack goes deep', 'stack কেন গভীরে যায়'),
      T(
        `DFS visited: **${dfs.order.join(', ')}**.\n\nThe stack is **last in, first out**: we always continue from the **newest** vertex, so DFS keeps going deeper until it gets stuck, then pops back to the most recent fork. With recursion, the computer\'s **call stack** keeps this trail for us: each \`dfs(v)\` call waits until its child calls return.\n\nThe green **DFS tree** is long and thin — very different from BFS\'s short, wide tree on the same graph.`,
        `DFS ভিজিট করল: **${dfs.order.join(', ')}**।\n\nstack হলো **শেষে এলে আগে যাবে**: আমরা সবসময় **সবচেয়ে নতুন** ভার্টেক্স থেকে চালিয়ে যাই, তাই আটকে না যাওয়া পর্যন্ত DFS আরও গভীরে যায়, তারপর সবচেয়ে কাছের মোড়ে ফিরে আসে। রিকার্শনে কম্পিউটারের **কল স্ট্যাক** আমাদের জন্য এই পথ মনে রাখে: প্রতিটা \`dfs(v)\` কল তার চাইল্ড কলগুলো ফেরা পর্যন্ত অপেক্ষা করে।\n\nসবুজ **DFS ট্রি** লম্বা আর সরু — একই গ্রাফে BFS-এর খাটো, চওড়া ট্রি থেকে একদম আলাদা।`
      ),
      scene(G, { edgeState: treeState(dfs.parent), nodeState: Object.fromEntries(G.nodes.map((n) => [n.id, 'done'])), panels: [{ type: 'output', label: T('DFS order', 'DFS ক্রম'), items: dfs.order }], status: T('green = DFS tree: deep and thin', 'সবুজ = DFS ট্রি: গভীর আর সরু') })
    ),
    step(
      T('BFS or DFS: when to use which', 'BFS না DFS: কখন কোনটা'),
      T(
        `Same graph, two orders: BFS **${bfs.order.join(', ')}** · DFS **${dfs.order.join(', ')}**. Both are O(V + E). Pick by the question:\n\n- "**Fewest steps** from A to B", "everyone within 2 hops", "nearest exit" → **BFS**.\n- "Is there a **cycle**?", "put tasks in order" (**topological sort**), "explore every path of a maze", backtracking puzzles → **DFS**.\n- "Is the graph connected / how many islands?" → **either** works.\n\nMemory: BFS keeps a whole **level** in its queue (can be wide); DFS keeps one **path** on its stack (can be deep).`,
        `একই গ্রাফ, দুই ক্রম: BFS **${bfs.order.join(', ')}** · DFS **${dfs.order.join(', ')}**। দুটোই O(V + E)। প্রশ্ন দেখে বাছো:\n\n- "A থেকে B-তে **সবচেয়ে কম ধাপ**", "২ ধাপের মধ্যে সবাই", "সবচেয়ে কাছের বের হওয়ার পথ" → **BFS**।\n- "**সাইকেল** আছে?", "কাজগুলো ক্রমে সাজাও" (**টপোলজিক্যাল সর্ট**), "গোলকধাঁধার প্রতিটা পথ ঘোরো", ব্যাকট্র্যাকিং ধাঁধা → **DFS**।\n- "গ্রাফ কি যুক্ত / কয়টা দ্বীপ?" → **যেকোনোটা**।\n\nমেমরি: BFS তার queue-তে একটা পুরো **লেভেল** রাখে (চওড়া হতে পারে); DFS তার stack-এ একটা **পথ** রাখে (গভীর হতে পারে)।`
      ),
      scene(G, { edgeState: treeState(bfs.parent), panels: [{ type: 'matrix', label: T('BFS vs DFS', 'BFS বনাম DFS'), rows: WHICH_ROWS, cols: ['BFS', 'DFS'], cells: WHICH_CELLS, wide: true }], status: T('fewest steps → BFS · cycles / order / mazes → DFS', 'সবচেয়ে কম ধাপ → BFS · সাইকেল / ক্রম / গোলকধাঁধা → DFS') })
    ),
    step(
      T('From idea to code', 'ধারণা থেকে কোডে'),
      T(
        '- **BFS code:** `visited[]` + a `queue`. Mark the start and push it. `while (queue not empty)`: `u = queue.shift()` (take the front), print it, then `for v of adj[u]`: `if (!visited[v])` → mark, `queue.push(v)`.\n- **DFS code:** one function `dfs(u)`: mark u, print it, then `for v of adj[u]`: `if (!visited[v]) dfs(v)` — the function **calls itself**, and the computer\'s call stack remembers the way back.\n\nNotice: BFS marks a vertex **when it joins the line** (so it never joins twice); DFS marks it **when it enters**. In the code lessons each of these lines is traced with real values.',
        '- **BFS কোড:** `visited[]` + একটা `queue`। শুরুকে চিহ্ন দিয়ে push করো। `while (queue খালি না)`: `u = queue.shift()` (সামনের জন), প্রিন্ট করো, তারপর `for v of adj[u]`: `if (!visited[v])` → চিহ্ন দাও, `queue.push(v)`।\n- **DFS কোড:** একটা ফাংশন `dfs(u)`: u-কে চিহ্ন দাও, প্রিন্ট করো, তারপর `for v of adj[u]`: `if (!visited[v]) dfs(v)` — ফাংশন **নিজেকেই কল করে**, আর কম্পিউটারের কল স্ট্যাক ফেরার পথ মনে রাখে।\n\nখেয়াল করো: BFS ভার্টেক্সকে চিহ্ন দেয় **লাইনে দাঁড়ানোর সময়** (তাই দুবার দাঁড়ায় না); DFS চিহ্ন দেয় **ঢোকার সময়**। কোড লেসনে এই প্রতিটা লাইন আসল মান দিয়ে ট্রেস করা আছে।'
      ),
      scene(G, { nodeState: { 0: 'current', 1: 'frontier', 2: 'frontier', 3: 'frontier' }, edgeState: { '0-1': 'tree', '0-2': 'tree', '0-3': 'tree' }, panels: [{ type: 'queue', label: T('BFS after serving 0', '0-কে সার্ভ করার পর BFS'), items: [1, 2, 3] }, { type: 'stack', label: T('DFS after 0 → 1', '0 → 1-এর পর DFS'), items: ['dfs(0)', 'dfs(1)'] }], status: T('queue vs call stack', 'queue বনাম কল স্ট্যাক') })
    ),
    step(
      T('Check yourself', 'নিজেকে যাচাই করো'),
      T(
        `1. Without \`visited\`, what goes wrong on this graph?\n2. BFS from 0: which vertices are at level 2?\n3. In DFS, after reaching 2 (from 4), why do we go back to 4?\n4. Unweighted road map, fewest roads from A to B: BFS or DFS?\n5. Which tool does each use: queue or stack?\n\n> **Answers:** 1) The cycle 0–1–4–2 makes it loop forever and print vertices again. 2) ${bfs.order.filter((v) => bfs.level[v] === 2).join(', ')}. 3) 2's neighbours (0 and 4) are already seen — a dead end. 4) BFS. 5) BFS → queue, DFS → stack (recursion).`,
        `১. \`visited\` ছাড়া এই গ্রাফে কী ভুল হয়?\n২. 0 থেকে BFS: লেভেল ২-এ কোন ভার্টেক্সগুলো?\n৩. DFS-এ (4 থেকে) 2-তে পৌঁছানোর পর আমরা 4-এ ফিরি কেন?\n৪. ওজনহীন রোড ম্যাপ, A থেকে B-তে সবচেয়ে কম রাস্তা: BFS না DFS?\n৫. কে কোন হাতিয়ার ব্যবহার করে: queue না stack?\n\n> **উত্তর:** ১) সাইকেল 0–1–4–2 চিরকাল ঘোরায় আর ভার্টেক্স আবার প্রিন্ট করে। ২) ${bfs.order.filter((v) => bfs.level[v] === 2).join(', ')}। ৩) 2-এর প্রতিবেশী (0 আর 4) আগেই দেখা — কানাগলি। ৪) BFS। ৫) BFS → queue, DFS → stack (রিকার্শন)।`
      ),
      scene(G, { nodeState: Object.fromEntries(bfs.order.filter((v) => bfs.level[v] === 2).map((v) => [v, 'compare'])), subs: Object.fromEntries(bfs.level.map((l, v) => [v, `L${l}`])), status: T('question 2: level 2', 'প্রশ্ন ২: লেভেল ২') })
    )
  ]
};

export const traversalConceptTopics = [travIdeas];
