/* ------------------------------------------------------------------ *
 * Concept steps placed BEFORE the code trace of an algorithm lesson.
 *
 * They carry no code line (the code panel stays quiet): first the idea in
 * one picture, then how the code remembers what we did by hand. The longer
 * by-hand walk-throughs live in the concept lessons (e.g. mst-concepts.js).
 * ------------------------------------------------------------------ */

const T = (en, bn) => (en === bn ? en : { en, bn });
const ek = (u, v) => `${u}-${v}`;
const scene = (g, extra = {}) => ({ kind: 'graphx', directed: g.directed, weighted: g.weighted, nodes: g.nodes, edges: g.edges, ...extra });
const step = (title, explanation, sc) => ({ title, explanation, scene: sc });
const keyOf = (g, u, v) => (g.edges.some((e) => e.u === u && e.v === v) ? ek(u, v) : ek(v, u));

/** Prim by hand from 0: the edges in the order they join. */
function primOrder(g) {
  const inT = [0];
  const order = [];
  while (inT.length < g.V) {
    const cross = g.edges.filter((e) => inT.includes(e.u) !== inT.includes(e.v));
    if (!cross.length) break;
    const best = cross.reduce((b, e) => (e.w < b.w ? e : b));
    order.push(best);
    inT.push(inT.includes(best.u) ? best.v : best.u);
  }
  return order;
}

/** Kruskal by hand: every edge in sorted order with take / skip. */
function kruskalOrder(g) {
  const p = Array.from({ length: g.V }, (_, i) => i);
  const f = (x) => (p[x] === x ? x : f(p[x]));
  return g.edges.map((e, i) => ({ e, i })).sort((a, b) => a.e.w - b.e.w || a.i - b.i).map(({ e }) => {
    const take = f(e.u) !== f(e.v);
    if (take) p[f(e.u)] = f(e.v);
    return { e, take };
  });
}

export function primConcept(g) {
  const order = primOrder(g);
  const total = order.reduce((s, e) => s + e.w, 0);
  const treeState = Object.fromEntries(g.edges.map((e) => [ek(e.u, e.v), order.includes(e) ? 'tree' : 'dim']));
  // run the real code for three rounds (0 plus two added vertices) and read its arrays
  const key = Array(g.V).fill(Infinity);
  const parent = Array(g.V).fill(-1);
  const inTree = Array(g.V).fill(false);
  key[0] = 0;
  for (let round = 0; round < 3; round++) {
    let u = -1;
    for (let i = 0; i < g.V; i++) if (!inTree[i] && (u === -1 || key[i] < key[u])) u = i;
    inTree[u] = true;
    for (const e of g.edges) {
      const v = e.u === u ? e.v : e.v === u ? e.u : null;
      if (v != null && !inTree[v] && e.w < key[v]) { key[v] = e.w; parent[v] = u; }
    }
  }
  const tree = [...Array(g.V).keys()].filter((v) => inTree[v]);
  const fmt = (x) => (x === Infinity ? '∞' : String(x));
  const outside = [...Array(g.V).keys()].filter((v) => !inTree[v]);
  const next = outside.reduce((b2, v) => (key[v] < key[b2] ? v : b2), outside[0]);

  return [
    step(
      T('Before the code: Prim in one minute', 'কোডের আগে: এক মিনিটে প্রিম'),
      T(
        `**Goal:** connect every vertex as cheaply as possible (an MST).\n\n**Idea:** grow **one tree** from vertex 0. Every round, add the **cheapest edge that leaves the tree** — the cut rule says that edge is always safe.\n\nBy hand on this graph the edges join in this order: ${order.map((e) => `${e.u}–${e.v} (${e.w})`).join(', ')} → total **${total}**.\n\n> If this order is not obvious yet, open **How MST Algorithms Think** first — it runs Prim by hand, round by round.`,
        `**লক্ষ্য:** সবচেয়ে সস্তায় প্রতিটা ভার্টেক্স জোড়া (একটা MST)।\n\n**ধারণা:** ভার্টেক্স 0 থেকে **একটা ট্রি** বড় করো। প্রতি রাউন্ডে **ট্রি থেকে বের হওয়া সবচেয়ে সস্তা এজ** যোগ করো — কাট নিয়ম বলে সেটা সবসময় নিরাপদ।\n\nএই গ্রাফে হাতে করলে এজগুলো এই ক্রমে যোগ হয়: ${order.map((e) => `${e.u}–${e.v} (${e.w})`).join(', ')} → মোট **${total}**।\n\n> এই ক্রমটা এখনো পরিষ্কার না লাগলে আগে **MST অ্যালগরিদম কীভাবে ভাবে** লেসনটা খোলো — সেখানে প্রিম হাতে-কলমে, রাউন্ড ধরে ধরে চালানো আছে।`
      ),
      scene(g, { edgeState: treeState, nodeState: Object.fromEntries(g.nodes.map((n) => [n.id, 'setA'])), tags: { 0: 'start' }, panels: [{ type: 'output', label: T('edges join in this order', 'এজ যে ক্রমে যোগ হয়'), items: order.map((e) => `${e.u}–${e.v}`) }], status: T(`Prim by hand → total ${total}`, `হাতে-কলমে প্রিম → মোট ${total}`) })
    ),
    step(
      T('How the code remembers "cheapest edge leaving the tree"', 'কোড কীভাবে মনে রাখে "ট্রি থেকে বের হওয়া সবচেয়ে সস্তা এজ"'),
      T(
        `Listing **every** edge that leaves the tree, every round, would be slow. The code uses a trick: each vertex outside the tree keeps **one number**:\n\n- \`key[v]\` = the cheapest edge from the tree to v found so far (∞ = none yet)\n- \`parent[v]\` = which tree vertex that edge comes from\n- \`inTree[v]\` = is v already in the tree?\n\nThen one round of the code is just:\n1. **scan** all vertices, pick the outside one with the **smallest key** → that is the cheapest leaving edge;\n2. put it in the tree;\n3. only **its** edges can make a key smaller → check its neighbours and lower their keys.\n\nIn the picture: tree {${tree.join(', ')}}, keys under the circles. Next round picks **${next}** (key ${fmt(key[next])}).`,
        `প্রতি রাউন্ডে ট্রি থেকে বের হওয়া **প্রতিটা** এজ লেখা ধীর হবে। কোড একটা কৌশল নেয়: ট্রির বাইরের প্রতিটা ভার্টেক্স **একটা সংখ্যা** রাখে:\n\n- \`key[v]\` = এ পর্যন্ত পাওয়া ট্রি থেকে v-তে সবচেয়ে সস্তা এজ (∞ = এখনো নেই)\n- \`parent[v]\` = সেই এজ ট্রির কোন ভার্টেক্স থেকে আসে\n- \`inTree[v]\` = v কি আগেই ট্রিতে?\n\nতাহলে কোডের এক রাউন্ড মানে শুধু:\n1. সব ভার্টেক্স **খুঁজে** বাইরের যার **key সবচেয়ে ছোট** তাকে বাছো → সেটাই সবচেয়ে সস্তা বের-হওয়া এজ;\n2. তাকে ট্রিতে নাও;\n3. শুধু **তার** এজগুলোই কোনো key কমাতে পারে → তার প্রতিবেশী দেখে key কমাও।\n\nছবিতে: ট্রি {${tree.join(', ')}}, বৃত্তের নিচে key। পরের রাউন্ড বাছবে **${next}** (key ${fmt(key[next])})।`
      ),
      scene(g, {
        nodeState: { ...Object.fromEntries(tree.map((v) => [v, 'setA'])), [next]: 'compare' },
        edgeState: { ...Object.fromEntries(g.edges.map((e) => [ek(e.u, e.v), 'dim'])), ...Object.fromEntries(order.slice(0, 2).map((e) => [ek(e.u, e.v), 'tree'])), ...(parent[next] >= 0 ? { [keyOf(g, parent[next], next)]: 'compare' } : {}) },
        subs: Object.fromEntries(key.map((k, i) => [i, fmt(k)])),
        panels: [
          { type: 'array', label: T('inTree[ ]', 'inTree[ ]'), cells: [...Array(g.V).keys()].map((v) => (tree.includes(v) ? 'T' : 'F')), hl: Object.fromEntries(tree.map((v) => [v, 'done'])) },
          { type: 'array', label: T('key[ ]', 'key[ ]'), cells: key.map(fmt), hl: { [next]: 'compare' } },
          { type: 'array', label: T('parent[ ] (− = none)', 'parent[ ] (− = নেই)'), cells: parent.map((p) => (p < 0 ? '−' : p)) }
        ],
        status: T(`smallest key outside the tree: key[${next}] = ${fmt(key[next])}`, `ট্রির বাইরে সবচেয়ে ছোট key: key[${next}] = ${fmt(key[next])}`)
      })
    )
  ];
}

export function kruskalConcept(g) {
  const run = kruskalOrder(g);
  const taken = run.filter((r) => r.take).map((r) => r.e);
  const total = taken.reduce((s, e) => s + e.w, 0);
  // Union-Find after the first two taken edges, exactly as the code does it: parent[find(u)] = find(v)
  const p = Array.from({ length: g.V }, (_, i) => i);
  const f = (x) => { while (p[x] !== x) x = p[x]; return x; };
  for (const e of taken.slice(0, 2)) p[f(e.u)] = f(e.v);
  const first = taken[0];
  const climb = [first.u];
  for (let x = first.u; p[x] !== x; x = p[x]) climb.push(p[x]);
  return [
    step(
      T('Before the code: Kruskal in one minute', 'কোডের আগে: এক মিনিটে ক্রুসকাল'),
      T(
        `**Goal:** connect every vertex as cheaply as possible (an MST).\n\n**Idea:** forget "one tree". **Sort** all edges, cheapest first, and walk the list: if an edge joins **two different islands**, take it; if both ends are already in the **same island**, skip it (it would close a cycle).\n\nBy hand on this graph: ${run.map((r) => `${r.e.u}–${r.e.v} (${r.e.w}) ${r.take ? '✓' : '✗'}`).join(', ')} → total **${total}**.\n\n> If this is not obvious yet, open **How MST Algorithms Think** first — it runs Kruskal by hand, edge by edge.`,
        `**লক্ষ্য:** সবচেয়ে সস্তায় প্রতিটা ভার্টেক্স জোড়া (একটা MST)।\n\n**ধারণা:** "একটা ট্রি" ভুলে যাও। সব এজ সস্তা থেকে **সাজাও** আর তালিকা ধরে হাঁটো: এজটা **দুটো আলাদা দ্বীপ** জুড়লে নাও; দুই মাথা আগে থেকেই **একই দ্বীপে** থাকলে বাদ দাও (সাইকেল বন্ধ করবে)।\n\nএই গ্রাফে হাতে করলে: ${run.map((r) => `${r.e.u}–${r.e.v} (${r.e.w}) ${r.take ? '✓' : '✗'}`).join(', ')} → মোট **${total}**।\n\n> এটা এখনো পরিষ্কার না লাগলে আগে **MST অ্যালগরিদম কীভাবে ভাবে** লেসনটা খোলো — সেখানে ক্রুসকাল হাতে-কলমে, এজ ধরে ধরে চালানো আছে।`
      ),
      scene(g, {
        edgeState: Object.fromEntries(run.map((r) => [ek(r.e.u, r.e.v), r.take ? 'tree' : 'reject'])),
        nodeState: Object.fromEntries(g.nodes.map((n) => [n.id, 'done'])),
        panels: [{ type: 'edges', label: T('sorted edges', 'সাজানো এজ'), rows: run.map((r) => ({ e: `${r.e.u}–${r.e.v}`, w: r.e.w, state: r.take ? 'tree' : 'reject', note: r.take ? T('✓ take', '✓ নাও') : T('✗ cycle', '✗ সাইকেল') })), notes: true }],
        status: T(`Kruskal by hand → total ${total}`, `হাতে-কলমে ক্রুসকাল → মোট ${total}`)
      })
    ),
    step(
      T('How the code knows "same island?": Union-Find', 'কোড কীভাবে জানে "একই দ্বীপ?": ইউনিয়ন-ফাইন্ড'),
      T(
        `By eye we just **see** the islands. The code needs a fast way to ask "are u and v in the same island?" — that is **Union-Find**:\n\n- every island has one **leader**; \`parent[x]\` is an arrow from x toward its leader (a leader points to **itself**);\n- \`find(x)\`: follow the arrows until a vertex points to itself → that is x's leader;\n- **same leader** = same island → skip the edge;\n- **different leaders** → take the edge and **merge** the islands with one line: \`parent[leader of u] = leader of v\`.\n\nIn the picture, ${taken.slice(0, 2).map((e) => `${e.u}–${e.v}`).join(' and ')} are taken: \`parent = [${p.join(', ')}]\`. \`find(${first.u})\` climbs ${climb.join(' → ')}, so the leader of that island is **${f(first.u)}**.`,
        `চোখে আমরা দ্বীপগুলো সোজা **দেখি**। কোডের দ্রুত জিজ্ঞেস করার উপায় লাগে "u আর v কি একই দ্বীপে?" — সেটাই **ইউনিয়ন-ফাইন্ড (Union-Find)**:\n\n- প্রতিটা দ্বীপের একজন **লিডার**; \`parent[x]\` হলো x থেকে তার লিডারের দিকে একটা তীর (লিডার **নিজের দিকেই** নির্দেশ করে);\n- \`find(x)\`: তীর ধরে যাও যতক্ষণ না কেউ নিজের দিকে নির্দেশ করে → সে-ই x-এর লিডার;\n- **একই লিডার** = একই দ্বীপ → এজ বাদ;\n- **আলাদা লিডার** → এজ নাও আর এক লাইনে দ্বীপ **মেশাও**: \`parent[u-এর লিডার] = v-এর লিডার\`।\n\nছবিতে ${taken.slice(0, 2).map((e) => `${e.u}–${e.v}`).join(' আর ')} নেওয়া হয়েছে: \`parent = [${p.join(', ')}]\`। \`find(${first.u})\` ওঠে ${climb.join(' → ')}, তাই ওই দ্বীপের লিডার **${f(first.u)}**।`
      ),
      scene(g, {
        edgeState: { ...Object.fromEntries(g.edges.map((e) => [ek(e.u, e.v), 'dim'])), ...Object.fromEntries(taken.slice(0, 2).map((e) => [ek(e.u, e.v), 'tree'])) },
        nodeState: Object.fromEntries(climb.map((x) => [x, 'compare'])),
        tags: { [f(first.u)]: 'leader' },
        panels: [{ type: 'array', label: T('parent[ ] — arrow toward the island leader', 'parent[ ] — দ্বীপের লিডারের দিকে তীর'), cells: [...p], hl: { ...Object.fromEntries(climb.map((x) => [x, 'compare'])), [f(first.u)]: 'current' } }],
        status: T(`find(${first.u}): ${climb.join(' → ')} → leader ${f(first.u)}`, `find(${first.u}): ${climb.join(' → ')} → লিডার ${f(first.u)}`)
      })
    )
  ];
}


/* ---------------------------------------------------------------- shortest paths */

const SP_POINTER = T(
  '\n\n> If this is not obvious yet, open **Shortest Paths: The Ideas** first — it explains relaxation and runs the algorithms by hand.',
  '\n\n> এটা এখনো পরিষ্কার না লাগলে আগে **শর্টেস্ট পাথ: ধারণাগুলো** লেসনটা খোলো — সেখানে রিল্যাক্সেশন বোঝানো আর অ্যালগরিদমগুলো হাতে-কলমে চালানো আছে।'
);

export function dijkstraConcept(g, src) {
  return [step(
    T('Before the code: Dijkstra in one minute', 'কোডের আগে: এক মিনিটে ডাইকস্ট্রা'),
    T(
      `**Goal:** the shortest distance from vertex ${src} to every vertex.\n\n**Idea:** keep \`dist[v]\` = best distance found so far (start 0, others ∞). Each round, take the unfinished vertex with the **smallest dist** — it is **final** — and **relax** its edges: if \`dist[u] + w < dist[v]\`, lower \`dist[v]\`.\n\n**Condition:** no negative weights. (With one, use Bellman-Ford.)\n\nThe code is almost the same as Prim: same scan, same inner loop. The only change is the question — Prim asks \`w < key[v]\` (one edge), Dijkstra asks \`dist[u] + w < dist[v]\` (the whole trip from ${src}).${SP_POINTER.en}`,
      `**লক্ষ্য:** ভার্টেক্স ${src} থেকে প্রতিটা ভার্টেক্সের সবচেয়ে ছোট দূরত্ব।\n\n**ধারণা:** \`dist[v]\` = এ পর্যন্ত পাওয়া সেরা দূরত্ব রাখো (শুরু 0, বাকি ∞)। প্রতি রাউন্ডে শেষ-না-হওয়াদের মধ্যে **সবচেয়ে ছোট dist**-এর ভার্টেক্স নাও — সেটা **চূড়ান্ত** — আর তার এজগুলো **রিল্যাক্স** করো: \`dist[u] + w < dist[v]\` হলে \`dist[v]\` কমাও।\n\n**শর্ত:** কোনো নেগেটিভ ওজন নয়। (থাকলে বেলম্যান-ফোর্ড।)\n\nকোড প্রায় প্রিমের মতোই: একই খোঁজা, একই ভেতরের লুপ। শুধু প্রশ্নটা বদলায় — প্রিম জিজ্ঞেস করে \`w < key[v]\` (একটা এজ), ডাইকস্ট্রা জিজ্ঞেস করে \`dist[u] + w < dist[v]\` (${src} থেকে পুরো যাত্রা)।${SP_POINTER.bn}`
    ),
    scene(g, { nodeState: { [src]: 'source' }, tags: { [src]: 'start' }, subs: Object.fromEntries(g.nodes.map((n) => [n.id, n.id === src ? '0' : '∞'])), status: T(`dist[${src}] = 0, others ∞ · smallest unfinished → final → relax`, `dist[${src}] = 0, বাকি ∞ · সবচেয়ে ছোট শেষ-না-হওয়া → চূড়ান্ত → রিল্যাক্স`) })
  )];
}

export function bellmanConcept(g, src) {
  return [step(
    T('Before the code: Bellman-Ford in one minute', 'কোডের আগে: এক মিনিটে বেলম্যান-ফোর্ড'),
    T(
      `**Goal:** the shortest distance from vertex ${src} to every vertex — **even with negative weights**.\n\n**Idea:** one **pass** = relax **every** edge once (\`if dist[u] + w < dist[v]\`). Repeat up to **V − 1** passes: after pass k, every shortest route with ≤ k edges is correct, and no shortest route has more than V − 1 edges. Stop early if a pass changes nothing.\n\n**Then one extra check:** if some edge can **still** be relaxed, there is a **negative cycle** — no shortest path exists.\n\nIn the code that is: \`for pass\` (outer) → \`for (u, v, w) in edges\` (inner) → relax, plus a \`changed\` flag.${SP_POINTER.en}`,
      `**লক্ষ্য:** ভার্টেক্স ${src} থেকে প্রতিটা ভার্টেক্সের সবচেয়ে ছোট দূরত্ব — **নেগেটিভ ওজন থাকলেও**।\n\n**ধারণা:** এক **পাস** = **প্রতিটা** এজ একবার রিল্যাক্স (\`if dist[u] + w < dist[v]\`)। সর্বোচ্চ **V − 1**টা পাস চালাও: পাস k-এর পর ≤ kটা এজের প্রতিটা সবচেয়ে ছোট পথ ঠিক, আর কোনো সবচেয়ে ছোট পথে V − 1-এর বেশি এজ থাকে না। কোনো পাসে কিছু না বদলালে আগেই থামো।\n\n**তারপর আরেকটা যাচাই:** কোনো এজ **তখনো** রিল্যাক্স হলে **নেগেটিভ সাইকেল** আছে — সবচেয়ে ছোট পথ বলে কিছু নেই।\n\nকোডে সেটা: \`for pass\` (বাইরে) → \`for (u, v, w) in edges\` (ভেতরে) → রিল্যাক্স, সঙ্গে একটা \`changed\` ফ্ল্যাগ।${SP_POINTER.bn}`
    ),
    scene(g, { nodeState: { [src]: 'source' }, tags: { [src]: 'start' }, edgeState: Object.fromEntries(g.edges.filter((e) => e.w < 0).map((e) => [ek(e.u, e.v), 'compare'])), status: T('amber = negative edges · relax every edge, V − 1 passes', 'হলুদ = নেগেটিভ এজ · প্রতিটা এজ রিল্যাক্স, V − 1টা পাস') })
  )];
}

export function floydConcept(g) {
  return [step(
    T('Before the code: Floyd-Warshall in one minute', 'কোডের আগে: এক মিনিটে ফ্লয়েড-ওয়ার্শাল'),
    T(
      `**Goal:** the shortest distance between **every pair** of vertices.\n\n**Idea:** a table \`D[i][j]\` starts with the direct arrows (0 on the diagonal, ∞ where there is no arrow). Then allow vertex **0** as a middle stop, then **1**, and so on. For each new stop **k** and each pair (i, j): if **i → k → j** is shorter — \`D[i][k] + D[k][j] < D[i][j]\` — update the cell.\n\nIn the code: three loops inside each other, \`for k\` (outside!) → \`for i\` → \`for j\`. \`k\` must be the outer loop: a round must finish allowing stop k everywhere before stop k + 1 is allowed.\n\nNegative edges are fine; a negative number on the diagonal means a negative cycle.${SP_POINTER.en}`,
      `**লক্ষ্য:** **প্রতিটা জোড়া** ভার্টেক্সের সবচেয়ে ছোট দূরত্ব।\n\n**ধারণা:** একটা টেবিল \`D[i][j]\` শুরু হয় সরাসরি তীর দিয়ে (কোণাকুণিতে 0, তীর না থাকলে ∞)। তারপর ভার্টেক্স **0**-কে মাঝপথের স্টপ হিসেবে অনুমতি দাও, তারপর **1**, এভাবে। প্রতিটা নতুন স্টপ **k** আর প্রতিটা জোড়া (i, j)-এর জন্য: **i → k → j** ছোট হলে — \`D[i][k] + D[k][j] < D[i][j]\` — ঘরটা আপডেট করো।\n\nকোডে: একটার ভেতরে আরেকটা তিনটা লুপ, \`for k\` (সবার বাইরে!) → \`for i\` → \`for j\`। \`k\`-কেই বাইরের লুপ হতে হবে: স্টপ k + 1-এর অনুমতির আগে সব জায়গায় স্টপ k-এর রাউন্ড শেষ হতে হবে।\n\nনেগেটিভ এজ চলে; কোণাকুণিতে নেগেটিভ সংখ্যা মানে নেগেটিভ সাইকেল।${SP_POINTER.bn}`
    ),
    scene(g, { status: T('allow one more middle stop each round: k = 0, 1, 2, …', 'প্রতি রাউন্ডে আরেকটা মাঝের স্টপ: k = 0, 1, 2, …') })
  )];
}

/* ---------------------------------------------------------------- traversals */

const TRAV_POINTER = T(
  '\n\n> If this is not obvious yet, open **Graph Traversal: The Ideas** first — it runs BFS and DFS by hand on this same graph.',
  '\n\n> এটা এখনো পরিষ্কার না লাগলে আগে **গ্রাফ ট্রাভার্সাল: ধারণাগুলো** লেসনটা খোলো — সেখানে এই গ্রাফেই BFS আর DFS হাতে-কলমে চালানো আছে।'
);

export function bfsConcept(g, start) {
  return [step(
    T('Before the code: BFS in one minute', 'কোডের আগে: এক মিনিটে BFS'),
    T(
      `**Goal:** visit every vertex reachable from ${start}, nearest first.\n\n**Idea:** a **ripple**. Keep a **queue** (a fair line). Mark ${start} as seen and put it in the line. Then repeat: take the **front** vertex, visit it, and put each **unseen** neighbour at the **back** of the line (marking it seen right away, so it never joins twice).\n\n**Why a queue?** First in, first out → all vertices 1 edge away are served before any vertex 2 edges away. So BFS also finds the **fewest-edge path** to every vertex.\n\n**Rule:** never add a seen vertex again — that is what stops BFS from going round a cycle forever.${TRAV_POINTER.en}`,
      `**লক্ষ্য:** ${start} থেকে পৌঁছানো যায় এমন প্রতিটা ভার্টেক্স ঘোরা, কাছের জন আগে।\n\n**ধারণা:** একটা **ঢেউ**। একটা **queue** (ন্যায্য লাইন) রাখো। ${start}-কে দেখা হয়েছে বলে চিহ্ন দিয়ে লাইনে রাখো। তারপর বারবার: **সামনের** ভার্টেক্স নাও, ভিজিট করো, আর প্রতিটা **না-দেখা** প্রতিবেশীকে লাইনের **পেছনে** রাখো (সঙ্গে সঙ্গে চিহ্ন দিয়ে, যাতে দুবার না দাঁড়ায়)।\n\n**queue কেন?** আগে এলে আগে যাবে → ১ এজ দূরের সবাই ২ এজ দূরের কারো আগে সার্ভ হয়। তাই BFS প্রতিটা ভার্টেক্সে **সবচেয়ে কম এজের পথ**-ও খুঁজে দেয়।\n\n**নিয়ম:** দেখা ভার্টেক্স আর কখনো যোগ করবে না — এটাই BFS-কে সাইকেলে চিরকাল ঘোরা থেকে থামায়।${TRAV_POINTER.bn}`
    ),
    scene(g, { nodeState: { [start]: 'source' }, tags: { [start]: 'start' }, status: T('ripple: level 0, then 1, then 2 …', 'ঢেউ: লেভেল 0, তারপর 1, তারপর 2 …') })
  )];
}

export function dfsConcept(g, start) {
  return [step(
    T('Before the code: DFS in one minute', 'কোডের আগে: এক মিনিটে DFS'),
    T(
      `**Goal:** visit every vertex reachable from ${start}.\n\n**Idea:** an **explorer in a maze**. Enter a vertex, mark it, visit it. Then go into its first **unseen** neighbour **right away** and do the same there — deeper and deeper. When a vertex has no unseen neighbour left (a dead end), **walk back** to where you came from and try its next neighbour.\n\n**How the code remembers the way back:** recursion. \`dfs(u)\` calls \`dfs(v)\` for a neighbour; when \`dfs(v)\` returns, we are back inside \`dfs(u)\`, exactly where we left off. The computer\'s **call stack** is the trail of breadcrumbs.${TRAV_POINTER.en}`,
      `**লক্ষ্য:** ${start} থেকে পৌঁছানো যায় এমন প্রতিটা ভার্টেক্স ঘোরা।\n\n**ধারণা:** **গোলকধাঁধার অভিযাত্রী**। একটা ভার্টেক্সে ঢোকো, চিহ্ন দাও, ভিজিট করো। তারপর তার প্রথম **না-দেখা** প্রতিবেশীর ভেতরে **সঙ্গে সঙ্গে** ঢোকো আর সেখানেও একই কাজ — আরও গভীরে। কোনো ভার্টেক্সের আর না-দেখা প্রতিবেশী না থাকলে (কানাগলি), যেখান থেকে এসেছিলে সেখানে **ফিরে যাও** আর তার পরের প্রতিবেশী চেষ্টা করো।\n\n**ফেরার পথ কোড কীভাবে মনে রাখে:** রিকার্শন। \`dfs(u)\` একটা প্রতিবেশীর জন্য \`dfs(v)\` কল করে; \`dfs(v)\` ফিরলে আমরা আবার \`dfs(u)\`-এর ভেতরে, ঠিক যেখানে থেমেছিলাম। কম্পিউটারের **কল স্ট্যাক** হলো ফেরার পথের চিহ্ন।${TRAV_POINTER.bn}`
    ),
    scene(g, { nodeState: { [start]: 'source' }, tags: { [start]: 'start' }, status: T('go deep, then backtrack', 'গভীরে যাও, তারপর ফেরো') })
  )];
}

/* ---------------------------------------------------------------- topological sort */

const TOPO_POINTER = T(
  '\n\n> If this is not obvious yet, open **Topological Sort: The Ideas** first — it runs Kahn and DFS by hand on this same graph.',
  '\n\n> এটা এখনো পরিষ্কার না লাগলে আগে **টপোলজিক্যাল সর্ট: ধারণাগুলো** লেসনটা খোলো — সেখানে এই গ্রাফেই কান আর DFS হাতে-কলমে চালানো আছে।'
);

export function kahnConcept(g) {
  const indeg = Object.fromEntries(g.nodes.map((n) => [n.id, g.edges.filter((e) => e.v === n.id).length]));
  const ready = g.nodes.map((n) => n.id).filter((v) => indeg[v] === 0).sort((a, b) => a - b);
  return [step(
    T('Before the code: Kahn in one minute', 'কোডের আগে: এক মিনিটে কান'),
    T(
      `**Goal:** list the tasks so that for every arrow u → v, u comes before v.\n\n**Idea:** a to-do list. \`indeg[v]\` = how many tasks v still waits for. Tasks with \`indeg 0\` are **ready** (here: ${ready.join(', ')}) → put them in a queue. Take one, add it to the order, and lower the \`indeg\` of every task it points to; any that reaches 0 becomes ready too. Repeat until the queue is empty.\n\n**Cycle check:** if the order has fewer than V tasks at the end, some tasks were waiting on each other forever → there is a cycle.${TOPO_POINTER.en}`,
      `**লক্ষ্য:** কাজগুলো এমনভাবে সাজাও যাতে প্রতিটা তীর u → v-এ u আগে আসে।\n\n**ধারণা:** একটা করণীয় তালিকা। \`indeg[v]\` = v এখনো কয়টা কাজের অপেক্ষায়। \`indeg 0\` মানে **তৈরি** (এখানে: ${ready.join(', ')}) → queue-তে রাখো। একটা নাও, ক্রমে যোগ করো, আর সে যাদের দিকে তীর দেয় তাদের \`indeg\` কমাও; কারো 0 হলে সেও তৈরি। queue খালি না হওয়া পর্যন্ত চালাও।\n\n**সাইকেল যাচাই:** শেষে ক্রমে V-এর কম কাজ থাকলে কিছু কাজ চিরকাল একে অন্যের অপেক্ষায় ছিল → সাইকেল আছে।${TOPO_POINTER.bn}`
    ),
    scene(g, { subs: Object.fromEntries(Object.entries(indeg).map(([v, d]) => [v, `in ${d}`])), nodeState: Object.fromEntries(ready.map((v) => [v, 'frontier'])), status: T(`ready (indeg 0): ${ready.join(', ')}`, `তৈরি (indeg 0): ${ready.join(', ')}`) })
  )];
}

export function topoDfsConcept(g) {
  return [step(
    T('Before the code: topological sort with DFS in one minute', 'কোডের আগে: এক মিনিটে DFS দিয়ে টপোলজিক্যাল সর্ট'),
    T(
      `**Goal:** list the tasks so that for every arrow u → v, u comes before v.\n\n**Idea:** run DFS from every unvisited vertex. A vertex is **finished** when everything it points to has been explored — so it always finishes **after** all the tasks that must come after it. Push each vertex on a stack **at the moment it finishes**. At the end, pop the stack: that is a valid order.\n\nIn the code the only new line compared with plain DFS is \`stack.push(u)\` at the **end** of \`dfs(u)\`, after the neighbour loop.${TOPO_POINTER.en}`,
      `**লক্ষ্য:** কাজগুলো এমনভাবে সাজাও যাতে প্রতিটা তীর u → v-এ u আগে আসে।\n\n**ধারণা:** প্রতিটা না-দেখা ভার্টেক্স থেকে DFS চালাও। একটা ভার্টেক্স **শেষ** হয় যখন সে যাদের দিকে তীর দেয় সবাই ঘোরা হয়ে যায় — তাই সে সবসময় তার পরে যাদের আসতে হবে তাদের সবার **পরে** শেষ হয়। প্রতিটা ভার্টেক্সকে **শেষ হওয়ার মুহূর্তে** একটা স্ট্যাকে রাখো। শেষে স্ট্যাক pop করো: সেটাই সঠিক ক্রম।\n\nসাধারণ DFS-এর তুলনায় কোডে নতুন লাইন শুধু \`stack.push(u)\`, \`dfs(u)\`-এর একদম **শেষে**, প্রতিবেশী লুপের পরে।${TOPO_POINTER.bn}`
    ),
    scene(g, { status: T('push on finish, pop at the end', 'শেষ হলে push, শেষে pop') })
  )];
}
