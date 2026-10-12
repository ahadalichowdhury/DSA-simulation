/* ------------------------------------------------------------------ *
 * Deep dives for BFS and DFS (Graphs chapter), in the order
 * shafaetsplanet.com teaches them:
 *
 * BFS — the rules of levels; level[] and parent[]; printing the path;
 *       why it is O(V + E); BFS on a grid with direction arrays; what BFS
 *       cannot do; practice.
 * DFS — white / grey / black; discovery and finishing times; tree edges
 *       and back edges; finding a cycle (undirected and directed); deep
 *       recursion; practice.
 * ------------------------------------------------------------------ */
import { adjOf } from '../graphData.js';
import { T, ek, scene, step, N, allEdges, keyOf, practiceStep, rulesPanel } from './common.js';

/* =================================================================== BFS */

function bfsRun(g, s) {
  const adj = adjOf(g);
  const level = Array(g.V).fill(-1);
  const parent = Array(g.V).fill(-1);
  const order = [];
  level[s] = 0;
  const q = [s];
  while (q.length) {
    const u = q.shift();
    order.push(u);
    for (const { v } of adj[u]) if (level[v] === -1) { level[v] = level[u] + 1; parent[v] = u; q.push(v); }
  }
  return { level, parent, order };
}

/** Opening of the BFS lesson: the problem and the five rules of BFS. */
export function bfsStory(g, s, t) {
  const { level } = bfsRun(g, s);
  const rules = [
    T('The source gets **level 0**.', 'সোর্সের **লেভেল 0**।'),
    T('Every unvisited neighbour of a level-k vertex gets **level k + 1**.', 'লেভেল-k ভার্টেক্সের প্রতিটা না-দেখা প্রতিবেশী পায় **লেভেল k + 1**।'),
    T('A vertex gets a level **only once** — never visit it twice.', 'একটা ভার্টেক্স লেভেল পায় **একবারই** — দুবার যাওয়া যাবে না।'),
    T('Finish **all** of level k before touching level k + 1.', 'লেভেল k **পুরোটা** শেষ করে তবেই লেভেল k + 1।'),
    T('The level of a vertex = the **fewest edges** from the source to it.', 'একটা ভার্টেক্সের লেভেল = সোর্স থেকে সেখানে যেতে **সবচেয়ে কম কয়টা এজ**।')
  ];
  return [
    step(
      T(`The problem: fewest roads from ${s} to ${t}`, `সমস্যা: ${s} থেকে ${t}-এ সবচেয়ে কম রাস্তা`),
      T(
        `Think of the circles as cities and the lines as roads. Every road takes the same time. You live in city **${s}** and want to reach city **${t}** crossing as **few roads** as possible.\n\nYou could try every route — but the number of routes explodes as the map grows. **Breadth-First Search (BFS)** answers the question for **every** city at once, and it never tries the same city twice.\n\nBFS works whenever every edge "costs the same" (an **unweighted** graph). Keep that condition in mind — we come back to it at the end.`,
        `বৃত্তগুলোকে শহর আর রেখাগুলোকে রাস্তা ভাবো। প্রতিটা রাস্তা পার হতে একই সময় লাগে। তুমি থাকো শহর **${s}**-এ, যেতে চাও শহর **${t}**-এ, যত **কম রাস্তা** পার হয়ে যাওয়া যায়।\n\nসব রাস্তা একে একে চেষ্টা করা যায় — কিন্তু ম্যাপ বড় হলে রাস্তার সংখ্যা হু হু করে বাড়ে। **ব্রেডথ-ফার্স্ট সার্চ (BFS)** একসাথে **সব** শহরের উত্তর দিয়ে দেয়, আর কোনো শহরে দুবার যায় না।\n\nBFS কাজ করে যখন প্রতিটা এজের "খরচ সমান" (**আনওয়েটেড (unweighted)** গ্রাফ)। এই শর্তটা মাথায় রাখো — শেষে আবার আসব।`
      ),
      scene(g, { nodeState: { [s]: 'source', [t]: 'compare' }, tags: { [s]: 'start', [t]: 'goal' }, status: T(`fewest roads from ${s} to ${t}?`, `${s} থেকে ${t}-এ সবচেয়ে কম কয়টা রাস্তা?`) })
    ),
    step(
      T('The five rules of BFS', 'BFS-এর পাঁচটা নিয়ম'),
      T(
        `Before any simulation, write the rules down. BFS gives every vertex a **level**:\n\n1. The source gets level 0.\n2. Every unvisited neighbour of a level-k vertex gets level k + 1.\n3. A vertex gets a level only once.\n4. All of level k is finished before level k + 1 starts.\n5. So the level of a vertex is the **fewest edges** from the source.\n\nRules 2 and 4 together are the whole trick. In the picture the levels are already written under the circles — city ${t} has level **${level[t]}**, so ${level[t]} roads is the best possible. Now let us see **how** the code keeps these rules.`,
        `সিমুলেশনের আগে নিয়মগুলো লিখে ফেলি। BFS প্রতিটা ভার্টেক্সকে একটা **লেভেল (level)** দেয়:\n\n1. সোর্স পায় লেভেল 0।\n2. লেভেল-k ভার্টেক্সের প্রতিটা না-দেখা প্রতিবেশী পায় লেভেল k + 1।\n3. একটা ভার্টেক্স লেভেল পায় একবারই।\n4. লেভেল k পুরোটা শেষ হলে তবেই লেভেল k + 1 শুরু।\n5. তাই একটা ভার্টেক্সের লেভেল = সোর্স থেকে **সবচেয়ে কম কয়টা এজ**।\n\nনিয়ম 2 আর 4 মিলেই পুরো কৌশল। ছবিতে লেভেলগুলো বৃত্তের নিচে লেখা আছে — শহর ${t}-এর লেভেল **${level[t]}**, মানে ${level[t]}টা রাস্তাই সবচেয়ে ভালো। এবার দেখি কোড **কীভাবে** নিয়মগুলো মানে।`
      ),
      scene(g, {
        nodeState: Object.fromEntries(level.map((l, i) => [i, i === s ? 'source' : l === 1 ? 'frontier' : l >= 2 ? 'visited' : ''])),
        subs: Object.fromEntries(level.map((l, i) => [i, `L${l}`])),
        tags: { [s]: 'start', [t]: 'goal' },
        panels: [rulesPanel(T('the rules', 'নিয়মগুলো'), rules, 1)],
        status: T(`level[${t}] = ${level[t]} → ${level[t]} roads`, `level[${t}] = ${level[t]} → ${level[t]}টা রাস্তা`)
      })
    )
  ];
}

/** After the BFS trace: level[] and parent[], path printing, cost, grid BFS, limits, practice. */
export function bfsDeep(g, s, t) {
  const { level, parent } = bfsRun(g, s);
  const V = g.V;
  const steps = [];
  const treeEdges = Object.fromEntries([...Array(V).keys()].filter((v) => parent[v] >= 0).map((v) => [keyOf(g, parent[v], v), 'tree']));
  const arrPanels = (hl = {}) => [
    { type: 'array', label: T('level[ ] — fewest edges from the source', 'level[ ] — সোর্স থেকে সবচেয়ে কম এজ'), cells: level.map(String), hl },
    { type: 'array', label: T('parent[ ] — the vertex we came from (−1 = none)', 'parent[ ] — কোন ভার্টেক্স থেকে এসেছি (−1 = কেউ না)'), cells: parent.map(String), hl }
  ];

  steps.push(step(
    T('Two more arrays: level[ ] and parent[ ]', 'আরও দুটো অ্যারে: level[ ] আর parent[ ]'),
    T(
      `The code above only printed the visiting order. A real BFS usually remembers two more things, set at the **same moment** we mark a neighbour visited:\n\n\`\`\`\nlevel[v]  = level[u] + 1   // rule 2\nparent[v] = u              // "I reached v from u"\n\`\`\`\n\nWith \`level[s] = 0\` and \`parent[s] = −1\` at the start, after the run you get the arrays below. \`level[v]\` answers "how many roads to v?". \`parent[v]\` answers "which road did BFS use to reach v?" — the green edges form the **BFS tree**.\n\n> Instead of a separate \`visited[]\` you can start \`level[]\` filled with −1 and treat "level −1" as "not visited yet".`,
      `ওপরের কোড শুধু ঘোরার ক্রম প্রিন্ট করেছে। আসল BFS সাধারণত আরও দুটো জিনিস মনে রাখে, ঠিক যে **মুহূর্তে** প্রতিবেশীকে visited করি তখনই:\n\n\`\`\`\nlevel[v]  = level[u] + 1   // নিয়ম 2\nparent[v] = u              // "v-তে এসেছি u থেকে"\n\`\`\`\n\nশুরুতে \`level[s] = 0\` আর \`parent[s] = −1\` দিলে, রান শেষে নিচের অ্যারেগুলো পাও। \`level[v]\` বলে "v-তে যেতে কয়টা রাস্তা?"। \`parent[v]\` বলে "BFS কোন রাস্তা দিয়ে v-তে এসেছিল?" — সবুজ এজগুলো মিলে **BFS ট্রি (BFS tree)**।\n\n> আলাদা \`visited[]\` না রেখে \`level[]\` শুরুতে −1 দিয়ে ভরে "লেভেল −1" মানে "এখনো দেখা হয়নি" ধরতে পারো।`
    ),
    scene(g, { edgeState: { ...allEdges(g, 'dim'), ...treeEdges }, nodeState: { [s]: 'source' }, subs: Object.fromEntries(level.map((l, i) => [i, `L${l}`])), tags: { [s]: 'start' }, panels: arrPanels(), status: T('green edges = parent links = the BFS tree', 'সবুজ এজ = parent লিংক = BFS ট্রি') })
  ));

  // walk back from t to s along parent[]
  const path = [];
  for (let v = t; v !== -1; v = parent[v]) path.push(v);
  const walked = [];
  path.forEach((v, k) => {
    walked.push(v);
    const p = parent[v];
    const pathEdges = Object.fromEntries(walked.slice(1).map((x, i) => [keyOf(g, walked[i], x), 'relax']));
    steps.push(step(
      T(`Printing the path: at ${v}, parent[${v}] = ${p}`, `পাথ প্রিন্ট: ${v}-এ আছি, parent[${v}] = ${p}`),
      T(
        `${k === 0 ? `BFS told us **how far** ${t} is (level ${level[t]}), but not **which way**. parent[] knows the way — backwards. Start at the goal and keep jumping to the parent until you reach −1.\n\n` : ''}We are at **${v}**. \`parent[${v}]\` = **${p}** → ${p === -1 ? 'that means "no parent": we reached the source, so we stop.' : `the road we used came from ${p}, so jump to ${p}.`}\n\nCollected so far (goal first): **${walked.join(' ← ')}**.${p === -1 ? `\n\nRead it **backwards** and you get the route: **${[...walked].reverse().join(' → ')}** — exactly ${level[t]} roads, as level[${t}] promised.` : ''}`,
        `${k === 0 ? `BFS বলে দিয়েছে ${t} **কত দূরে** (লেভেল ${level[t]}), কিন্তু **কোন পথে** তা না। parent[] পথটা জানে — উল্টো দিক থেকে। লক্ষ্য থেকে শুরু করো, −1 না আসা পর্যন্ত parent-এ লাফাতে থাকো।\n\n` : ''}আমরা আছি **${v}**-এ। \`parent[${v}]\` = **${p}** → ${p === -1 ? 'মানে "parent নেই": সোর্সে পৌঁছে গেছি, তাই থামি।' : `যে রাস্তা দিয়ে এসেছিলাম সেটা ${p} থেকে, তাই ${p}-এ লাফ দাও।`}\n\nএ পর্যন্ত জমা হলো (লক্ষ্য আগে): **${walked.join(' ← ')}**।${p === -1 ? `\n\nএটা **উল্টো** করে পড়লেই রুট: **${[...walked].reverse().join(' → ')}** — ঠিক ${level[t]}টা রাস্তা, যেমন level[${t}] কথা দিয়েছিল।` : ''}`
      ),
      scene(g, {
        edgeState: { ...allEdges(g, 'dim'), ...treeEdges, ...pathEdges },
        nodeState: { ...Object.fromEntries(walked.map((x) => [x, 'relax'])), [v]: 'current' },
        tags: { [s]: 'start', [t]: 'goal' },
        panels: [...arrPanels({ [v]: 'current' }), { type: 'output', label: T('collected (goal first)', 'জমা হলো (লক্ষ্য আগে)'), items: [...walked], fresh: true }],
        status: `parent[${v}] = ${p}`
      })
    ));
  });
  steps.push(step(
    T('The path printer in code', 'কোডে পাথ প্রিন্টার'),
    T(
      `Two common ways to print the route s → … → t:\n\n**1. Loop, then reverse**\n\`\`\`\nfor (v = t; v != -1; v = parent[v]) path.push(v)\nreverse(path)\n\`\`\`\n\n**2. Recursion — prints in the right order by itself**\n\`\`\`\nprintPath(v):\n    if v == -1: return\n    printPath(parent[v])   // first print the way up to my parent\n    print v                // then me\n\`\`\`\n\nThe recursion goes up to the source first and prints on the way **back**, so the order comes out right: ${[...path].reverse().join(' → ')}.\n\n> If \`level[t]\` is still −1 after BFS, t cannot be reached at all — check that before printing.`,
      `s → … → t রুট প্রিন্ট করার দুটো চেনা উপায়:\n\n**1. লুপ, তারপর উল্টানো**\n\`\`\`\nfor (v = t; v != -1; v = parent[v]) path.push(v)\nreverse(path)\n\`\`\`\n\n**2. রিকার্শন — নিজেই ঠিক ক্রমে প্রিন্ট করে**\n\`\`\`\nprintPath(v):\n    if v == -1: return\n    printPath(parent[v])   // আগে আমার parent পর্যন্ত পথ প্রিন্ট\n    print v                // তারপর আমি\n\`\`\`\n\nরিকার্শন আগে সোর্স পর্যন্ত উঠে যায় আর **ফেরার পথে** প্রিন্ট করে, তাই ক্রম ঠিক আসে: ${[...path].reverse().join(' → ')}।\n\n> BFS-এর পরেও \`level[t]\` −1 থাকলে t-তে যাওয়াই যায় না — প্রিন্টের আগে সেটা দেখে নাও।`
    ),
    scene(g, {
      edgeState: { ...allEdges(g, 'dim'), ...treeEdges, ...Object.fromEntries(path.slice(1).map((x, i) => [keyOf(g, path[i], x), 'relax'])) },
      nodeState: Object.fromEntries(path.map((x) => [x, 'relax'])),
      tags: { [s]: 'start', [t]: 'goal' },
      panels: [{ type: 'output', label: T('printed route', 'প্রিন্ট হওয়া রুট'), items: [...path].reverse() }],
      status: [...path].reverse().join(' → ')
    })
  ));

  const E = g.edges.length;
  steps.push(step(
    T('Why BFS is O(V + E)', 'কেন BFS-এর খরচ O(V + E)'),
    T(
      `Count the work, not the seconds:\n\n- Each vertex enters the queue **once** (rule 3) and leaves it once → **V** pushes and pops.\n- When a vertex leaves, we read its adjacency list once. Every undirected edge sits in two lists, so all lists together hold **2E** entries.\n\nTotal ≈ V + 2E → **O(V + E)**. Here: ${V} + 2·${E} = ${V + 2 * E} small steps.\n\nWith an **adjacency matrix** reading the neighbours of one vertex costs a whole row (V cells), so BFS becomes **O(V²)**.\n\n> Contest rule of thumb: about 10⁸ simple steps per second. V = 10⁵, E = 2·10⁵ → about 5·10⁵ steps for BFS with a list, instant. The same graph as a matrix needs 10¹⁰ cells — it does not even fit in memory.`,
      `সেকেন্ড না, কাজ গোনো:\n\n- প্রতিটা ভার্টেক্স queue-তে ঢোকে **একবার** (নিয়ম 3), বেরও হয় একবার → **V** বার push আর pop।\n- একটা ভার্টেক্স বের হলে তার অ্যাডজাসেন্সি লিস্ট একবার পড়ি। আনডিরেক্টেড প্রতিটা এজ দুটো লিস্টে থাকে, তাই সব লিস্ট মিলে **2E**টা ঘর।\n\nমোট ≈ V + 2E → **O(V + E)**। এখানে: ${V} + 2·${E} = ${V + 2 * E}টা ছোট কাজ।\n\n**অ্যাডজাসেন্সি ম্যাট্রিক্স** হলে এক ভার্টেক্সের প্রতিবেশী পড়তে পুরো একটা সারি (Vটা ঘর) লাগে, তাই BFS হয়ে যায় **O(V²)**।\n\n> কনটেস্টের হিসাব: সেকেন্ডে মোটামুটি 10⁸টা সাধারণ কাজ। V = 10⁵, E = 2·10⁵ হলে লিস্টে BFS-এ প্রায় 5·10⁵ কাজ, চোখের পলকে। একই গ্রাফ ম্যাট্রিক্সে রাখতে 10¹⁰টা ঘর — মেমরিতেই আঁটবে না।`
    ),
    {
      kind: 'chart',
      label: T(`work for V = ${V}, E = ${E}`, `V = ${V}, E = ${E}-এ কাজ`),
      max: V * V,
      items: [
        { label: T('list: V + 2E', 'লিস্ট: V + 2E'), v: V + 2 * E, color: 'var(--green)', note: String(V + 2 * E) },
        { label: T('matrix: V²', 'ম্যাট্রিক্স: V²'), v: V * V, color: 'var(--red)', note: String(V * V) }
      ],
      caption: T('the gap grows fast as the graph grows', 'গ্রাফ বড় হলে ফারাকটা দ্রুত বাড়ে')
    }
  ));

  steps.push(...gridBfs());

  steps.push(step(
    T('When BFS gives the wrong answer', 'BFS কখন ভুল উত্তর দেয়'),
    T(
      `BFS counts **edges**, not kilometres. If roads have different lengths (a **weighted** graph), the route with fewer roads can be the longer one.\n\n- Different positive weights → **Dijkstra** (a BFS whose queue always serves the closest vertex).\n- Negative weights → **Bellman-Ford**.\n- Only weights 0 and 1 → **0-1 BFS** with a deque (push 0-edges to the front, 1-edges to the back).\n\nBFS itself also answers other questions: is the graph connected, which vertices are reachable, is it **bipartite** (colour levels alternately and look for an edge inside one level).`,
      `BFS **এজ** গোনে, কিলোমিটার না। রাস্তাগুলোর দৈর্ঘ্য আলাদা হলে (**ওয়েটেড (weighted)** গ্রাফ), কম রাস্তার রুটটাই লম্বা হতে পারে।\n\n- আলাদা আলাদা পজিটিভ ওজন → **ডায়াক্সট্রা (Dijkstra)** (এমন BFS যার queue সবসময় সবচেয়ে কাছের ভার্টেক্স আগে দেয়)।\n- নেগেটিভ ওজন → **বেলম্যান-ফোর্ড (Bellman-Ford)**।\n- ওজন শুধু 0 আর 1 → deque দিয়ে **0-1 BFS** (0-এজ সামনে, 1-এজ পেছনে push)।\n\nBFS নিজেও আরও প্রশ্নের উত্তর দেয়: গ্রাফটা কানেক্টেড কিনা, কোন কোন ভার্টেক্সে যাওয়া যায়, গ্রাফটা **বাইপারটাইট (bipartite)** কিনা (লেভেলগুলো পালা করে দুই রঙে রাঙাও, একই লেভেলের ভেতরে এজ আছে কিনা দেখো)।`
    ),
    scene(DIJ_TRAP, { nodeState: { 0: 'source', 2: 'compare' }, edgeState: { '0-2': 'reject', '0-1': 'tree', '1-2': 'tree' }, tags: { 0: 'start', 2: 'goal' }, status: T('BFS picks 0–2 (1 road, 10 km); 0–1–2 is 2 roads but only 4 km', 'BFS বাছে 0–2 (১টা রাস্তা, ১০ কিমি); 0–1–2 দুটো রাস্তা কিন্তু মাত্র ৪ কিমি') })
  ));

  steps.push(practiceStep(
    g,
    T('Practice problems', 'প্র্যাকটিস প্রবলেম'),
    T(
      'Reading is not enough — BFS becomes yours only after you code it a few times. Start from the top; each problem adds one idea from this lesson.\n\nTry first on your own: print the path from 0 to every vertex, and check whether a graph is bipartite.',
      'শুধু পড়লে হবে না — কয়েকবার নিজে কোড করলে তবেই BFS তোমার হবে। ওপর থেকে শুরু করো; প্রতিটা প্রবলেমে এই লেসনের একটা করে আইডিয়া লাগবে।\n\nআগে নিজে চেষ্টা করো: 0 থেকে প্রতিটা ভার্টেক্সের পাথ প্রিন্ট করো, আর একটা গ্রাফ বাইপারটাইট কিনা বের করো।'
    ),
    [
      ['UVa 336 — A Node Too Far', 'levels: which vertices are farther than k edges', 'লেভেল: কোন ভার্টেক্স k এজের চেয়ে দূরে'],
      ['UVa 10004 — Bicoloring', 'bipartite check with BFS', 'BFS দিয়ে বাইপারটাইট চেক'],
      ['UVa 439 — Knight Moves', 'BFS on a chessboard, 8 directions', 'দাবার বোর্ডে BFS, ৮ দিক'],
      ['UVa 10653 — Bombs! NO they are Mines!!', 'grid BFS with blocked cells', 'বাধাওয়ালা গ্রিডে BFS'],
      ['UVa 762 — We Ship Cheap', 'shortest route + path printing', 'সবচেয়ে ছোট রুট + পাথ প্রিন্ট']
    ],
    { edgeState: treeEdges, subs: Object.fromEntries(level.map((l, i) => [i, `L${l}`])) }
  ));
  return steps;
}

// BFS counts roads, not kilometres
const DIJ_TRAP = {
  V: 3,
  directed: false,
  weighted: true,
  nodes: N([[0, 80, 220], [1, 260, 60], [2, 440, 220]]),
  edges: [{ u: 0, v: 1, w: 2 }, { u: 1, v: 2, w: 2 }, { u: 0, v: 2, w: 10 }]
};

/* ------------------------------------------------------------- BFS on a grid */

const GRID = [
  'S..#..',
  '.#.#.#',
  '.#....',
  '..##.T',
  '#.....'
];

function gridBfs() {
  const R = GRID.length;
  const C = GRID[0].length;
  const id = (r, c) => r * C + c;
  const cell = (r, c) => GRID[r][c];
  let S = 0;
  let G = 0;
  const nodes = [];
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
    const ch = cell(r, c);
    if (ch === 'S') S = id(r, c);
    if (ch === 'T') G = id(r, c);
    nodes.push({ id: id(r, c), label: ch === '#' ? '#' : ch === 'S' ? 'S' : ch === 'T' ? 'T' : `${r},${c}`, x: 60 + c * 92, y: 50 + r * 78 });
  }
  const edges = [];
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
    if (cell(r, c) === '#') continue;
    if (c + 1 < C && cell(r, c + 1) !== '#') edges.push({ u: id(r, c), v: id(r, c + 1) });
    if (r + 1 < R && cell(r + 1, c) !== '#') edges.push({ u: id(r, c), v: id(r + 1, c) });
  }
  const g = { V: R * C, directed: false, weighted: false, nodes, edges };
  const walls = Object.fromEntries(nodes.filter((n) => n.label === '#').map((n) => [n.id, 'dim']));

  // BFS with the direction arrays, exactly like the code shown
  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];
  const dist = Array(R * C).fill(-1);
  const par = Array(R * C).fill(-1);
  dist[S] = 0;
  const q = [S];
  while (q.length) {
    const u = q.shift();
    const r = Math.floor(u / C);
    const c = u % C;
    for (let k = 0; k < 4; k++) {
      const nr = r + dr[k];
      const nc = c + dc[k];
      if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
      if (cell(nr, nc) === '#' || dist[id(nr, nc)] !== -1) continue;
      dist[id(nr, nc)] = dist[u] + 1;
      par[id(nr, nc)] = u;
      q.push(id(nr, nc));
    }
  }
  const maxD = Math.max(...dist);
  const subsUpTo = (L) => Object.fromEntries(dist.map((d, i) => [i, d]).filter(([, d]) => d >= 0 && d <= L).map(([i, d]) => [i, String(d)]));
  const treeUpTo = (L) => Object.fromEntries(dist.map((d, i) => [i, d]).filter(([i, d]) => d >= 1 && d <= L).map(([i]) => [keyOf(g, par[i], i), 'tree']));
  const code = [
    'int dr[] = {1, -1, 0, 0};   // down, up, right, left',
    'int dc[] = {0, 0, 1, -1};',
    'for (int k = 0; k < 4; k++) {',
    '    int nr = r + dr[k], nc = c + dc[k];',
    '    if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;  // off the board',
    "    if (grid[nr][nc] == '#' || dist[nr][nc] != -1) continue;",
    '    dist[nr][nc] = dist[r][c] + 1;',
    '    q.push({nr, nc});',
    '}'
  ].join('\n');

  const steps = [];
  steps.push(step(
    T('BFS on a grid: every cell is a vertex', 'গ্রিডে BFS: প্রতিটা ঘর একটা ভার্টেক্স'),
    T(
      `A huge share of BFS problems never mention a "graph". They give a **map**: S is the start, T the target, \`#\` a wall, and you may step up, down, left or right.\n\nThat **is** a graph: each open cell is a vertex \`(row, col)\`, and two neighbouring open cells share an edge. We never build an adjacency list — the neighbours of \`(r, c)\` are computed on the fly with two **direction arrays**:\n\n\`\`\`\n${code}\n\`\`\`\n\nThe loop over k tries the 4 directions. The first \`if\` keeps us **inside the board**; the second skips walls and cells that already have a distance. A chess knight? Just put its 8 jumps into dr/dc.`,
      `BFS-এর অনেক প্রবলেমে "গ্রাফ" শব্দটাই থাকে না। দেয় একটা **ম্যাপ**: S শুরু, T লক্ষ্য, \`#\` দেয়াল, আর তুমি ওপরে, নিচে, ডানে বা বামে এক ঘর যেতে পারো।\n\nএটা **আসলেই** একটা গ্রাফ: প্রতিটা খোলা ঘর একটা ভার্টেক্স \`(row, col)\`, আর পাশাপাশি দুটো খোলা ঘরের মধ্যে একটা এজ। অ্যাডজাসেন্সি লিস্ট বানাই না — \`(r, c)\`-এর প্রতিবেশী সাথে সাথে বের করি দুটো **ডিরেকশন অ্যারে (direction array)** দিয়ে:\n\n\`\`\`\n${code}\n\`\`\`\n\nk-এর লুপ ৪টা দিক চেষ্টা করে। প্রথম \`if\` আমাদের **বোর্ডের ভেতরে** রাখে; দ্বিতীয়টা দেয়াল আর আগেই দূরত্ব পাওয়া ঘর বাদ দেয়। দাবার ঘোড়া? শুধু তার ৮টা লাফ dr/dc-তে বসিয়ে দাও।`
    ),
    scene(g, { nodeState: { ...walls, [S]: 'source', [G]: 'compare' }, edgeState: allEdges(g, 'dim'), status: T('open cells = vertices · side-by-side open cells = edges', 'খোলা ঘর = ভার্টেক্স · পাশাপাশি খোলা ঘর = এজ') })
  ));
  for (let L = 1; L <= Math.min(maxD, dist[G]); L++) {
    const ring = dist.map((d, i) => [i, d]).filter(([, d]) => d === L).map(([i]) => i);
    const names = ring.map((i) => `(${Math.floor(i / C)},${i % C})`);
    const hitGoal = dist[G] === L;
    if (L > 2 && L < dist[G] - 1) continue; // middle waves are folded into one picture below
    steps.push(step(
      T(`Grid wave ${L}: cells at distance ${L}`, `গ্রিডের ঢেউ ${L}: দূরত্ব ${L}-এর ঘরগুলো`),
      T(
        `${L === 3 || (L > 2 && L === dist[G] - 1) ? 'The middle waves work exactly the same, so we jump ahead. ' : ''}Wave **${L}**: every open cell next to a distance-${L - 1} cell that has no distance yet gets **${L}**: ${names.join(', ')}.${hitGoal ? `\n\n**T is reached at distance ${L}.** Because BFS finishes distance ${L - 1} before ${L}, no shorter way exists.` : '\n\nWalls stay grey; the numbers spread around them like water.'}`,
        `${L === 3 || (L > 2 && L === dist[G] - 1) ? 'মাঝের ঢেউগুলো হুবহু একই, তাই একটু এগিয়ে যাই। ' : ''}ঢেউ **${L}**: দূরত্ব-${L - 1} ঘরের পাশের যে খোলা ঘরের এখনো দূরত্ব নেই, সে পায় **${L}**: ${names.join(', ')}।${hitGoal ? `\n\n**দূরত্ব ${L}-এ T-তে পৌঁছালাম।** BFS দূরত্ব ${L - 1} শেষ করে তবেই ${L}-এ যায়, তাই এর চেয়ে ছোট পথ নেই।` : '\n\nদেয়ালগুলো ধূসরই থাকে; সংখ্যাগুলো পানির মতো তাদের ঘিরে ছড়ায়।'}`
      ),
      scene(g, {
        nodeState: { ...walls, ...Object.fromEntries(dist.map((d, i) => [i, d]).filter(([, d]) => d >= 0 && d < L).map(([i]) => [i, 'visited'])), ...Object.fromEntries(ring.map((i) => [i, 'relax'])), [S]: 'source' },
        edgeState: { ...allEdges(g, 'dim'), ...treeUpTo(L) },
        subs: subsUpTo(L),
        status: T(`distance ${L}: ${ring.length} cell(s)`, `দূরত্ব ${L}: ${ring.length}টা ঘর`)
      })
    ));
  }
  const route = [];
  for (let v = G; v !== -1; v = par[v]) route.push(v);
  route.reverse();
  steps.push(step(
    T(`Grid answer: ${dist[G]} steps`, `গ্রিডের উত্তর: ${dist[G]} ধাপ`),
    T(
      `\`dist[T] = ${dist[G]}\`, and following the parents back gives one shortest route (green). The code is the same BFS as before — only "who are my neighbours?" changed.\n\nThings that go wrong in grid BFS:\n- forgetting the **bounds check** → reading outside the array;\n- marking a cell visited when you **pop** it instead of when you **push** it → the same cell enters the queue many times;\n- mixing up (row, col) with (x, y).\n\nCost: R·C cells, 4 checks each → **O(R·C)**.`,
      `\`dist[T] = ${dist[G]}\`, আর parent ধরে উল্টো হাঁটলে একটা সবচেয়ে ছোট রুট পাই (সবুজ)। কোডটা আগের BFS-ই — শুধু "আমার প্রতিবেশী কারা?" বদলেছে।\n\nগ্রিড BFS-এ যেসব ভুল হয়:\n- **সীমা চেক (bounds check)** ভুলে যাওয়া → অ্যারের বাইরে পড়া;\n- ঘরটা **push**-এর সময় না করে **pop**-এর সময় visited করা → একই ঘর বারবার queue-তে ঢোকে;\n- (row, col) আর (x, y) গুলিয়ে ফেলা।\n\nখরচ: R·Cটা ঘর, প্রতিটায় ৪টা চেক → **O(R·C)**।`
    ),
    scene(g, {
      nodeState: { ...walls, ...Object.fromEntries(route.map((v) => [v, 'relax'])), [S]: 'source', [G]: 'done' },
      edgeState: { ...allEdges(g, 'dim'), ...Object.fromEntries(route.slice(1).map((v, i) => [keyOf(g, route[i], v), 'tree'])) },
      subs: Object.fromEntries(route.map((v) => [v, String(dist[v])])),
      status: T(`shortest: ${dist[G]} steps`, `সবচেয়ে ছোট: ${dist[G]} ধাপ`)
    })
  ));
  return steps;
}

/* =================================================================== DFS */

/** DFS with colours and a clock, one event per entry/exit, in adjacency-list order. */
function dfsTimes(g, s) {
  const adj = adjOf(g);
  const color = Array(g.V).fill('white');
  const d = Array(g.V).fill(null);
  const f = Array(g.V).fill(null);
  const parent = Array(g.V).fill(-1);
  const events = [];
  const back = [];
  let time = 0;
  const stack = [];
  const visit = (u) => {
    color[u] = 'grey';
    d[u] = ++time;
    stack.push(u);
    events.push({ kind: 'enter', u, time, color: [...color], d: [...d], f: [...f], stack: [...stack] });
    for (const { v } of adj[u]) {
      if (color[v] === 'white') { parent[v] = u; visit(v); }
      else if (color[v] === 'grey' && v !== parent[u] && !back.some((b) => (b.u === v && b.v === u))) back.push({ u, v, time });
    }
    color[u] = 'black';
    f[u] = ++time;
    stack.pop();
    events.push({ kind: 'exit', u, time, color: [...color], d: [...d], f: [...f], stack: [...stack] });
  };
  visit(s);
  return { events, d, f, parent, back };
}

const colorState = (c) => (c === 'grey' ? 'compare' : c === 'black' ? 'done' : '');

/** After the DFS trace: colours and times, edge kinds, cycles, recursion depth, practice. */
export function dfsDeep(g, s) {
  const { events, d, f, parent, back } = dfsTimes(g, s);
  const steps = [];
  const treeOf = (upto) => Object.fromEntries([...Array(g.V).keys()].filter((v) => parent[v] >= 0 && upto.d[v] != null).map((v) => [keyOf(g, parent[v], v), 'tree']));
  const timeSubs = (ev) => Object.fromEntries([...Array(g.V).keys()].filter((v) => ev.d[v] != null).map((v) => [v, `${ev.d[v]}/${ev.f[v] ?? '·'}`]));

  steps.push(step(
    T('Three colours and a clock', 'তিনটা রং আর একটা ঘড়ি'),
    T(
      `A classic way to run DFS gives every vertex one of three **colours**:\n\n- **white** — not discovered yet;\n- **grey** — discovered, but DFS is still inside it (some neighbours are not finished);\n- **black** — completely finished.\n\nIt also keeps a **clock** that ticks on every entry and every exit. \`d[u]\` = the time we **entered** u (it turned grey), \`f[u]\` = the time we **left** u (it turned black).\n\nIn the pictures grey is drawn **orange** and black is drawn **green**; under each circle you see \`d/f\`. Watch the grey vertices: at any moment they are exactly the **call stack**.`,
      `DFS চালানোর একটা ক্লাসিক কৌশলে প্রতিটা ভার্টেক্সকে তিনটা **রং**-এর একটা দেয়:\n\n- **সাদা (white)** — এখনো খুঁজে পাইনি;\n- **ধূসর (grey)** — পেয়েছি, কিন্তু DFS এখনো তার ভেতরেই আছে (কিছু প্রতিবেশী শেষ হয়নি);\n- **কালো (black)** — পুরোপুরি শেষ।\n\nসাথে একটা **ঘড়ি (clock)** রাখে, যেটা প্রতিবার ঢোকা আর বের হওয়ায় এক করে বাড়ে। \`d[u]\` = u-তে **ঢোকার** সময় (ধূসর হলো), \`f[u]\` = u থেকে **বের হওয়ার** সময় (কালো হলো)।\n\nছবিতে ধূসর আঁকা **কমলা** রঙে আর কালো আঁকা **সবুজ** রঙে; বৃত্তের নিচে \`d/f\`। ধূসরগুলো খেয়াল করো: যেকোনো মুহূর্তে ওরাই ঠিক **কল স্ট্যাক**।`
    ),
    scene(g, { nodeState: { [s]: 'source' }, tags: { [s]: 'start' }, panels: [rulesPanel(T('colours', 'রং'), [T('white → not seen', 'সাদা → দেখা হয়নি'), T('grey (orange) → inside it now', 'ধূসর (কমলা) → এখন এর ভেতরে'), T('black (green) → finished', 'কালো (সবুজ) → শেষ')])], status: T('clock = 0, everyone white', 'ঘড়ি = 0, সবাই সাদা') })
  ));
  for (const ev of events) {
    if (ev.kind !== 'exit') continue;
    const greys = ev.stack;
    steps.push(step(
      T(`Time ${ev.time}: ${ev.u} turns black (d = ${ev.d[ev.u]}, f = ${ev.f[ev.u]})`, `সময় ${ev.time}: ${ev.u} কালো হলো (d = ${ev.d[ev.u]}, f = ${ev.f[ev.u]})`),
      T(
        `Vertex **${ev.u}** was entered at time ${ev.d[ev.u]} and every neighbour of it is now done, so it leaves at time **${ev.f[ev.u]}** and turns black.\n\nStill grey (still on the call stack): ${greys.length ? `**${greys.join(' → ')}**` : 'nobody — DFS is over'}.${ev.u === s ? '\n\nLook at the pairs: one vertex\'s [d, f] interval is either **inside** another\'s (a descendant) or completely **separate** — they never half-overlap. That is the "parenthesis" structure of DFS.' : ''}`,
        `ভার্টেক্স **${ev.u}**-এ ঢুকেছিলাম সময় ${ev.d[ev.u]}-এ, আর এখন তার সব প্রতিবেশী শেষ, তাই সময় **${ev.f[ev.u]}**-এ বের হয়ে কালো হলো।\n\nএখনো ধূসর (এখনো কল স্ট্যাকে): ${greys.length ? `**${greys.join(' → ')}**` : 'কেউ না — DFS শেষ'}।${ev.u === s ? '\n\nজোড়াগুলো দেখো: একটা ভার্টেক্সের [d, f] ব্যবধান হয় আরেকটার **ভেতরে** (বংশধর), নয়তো পুরোপুরি **আলাদা** — কখনো আধাআধি মেশে না। এটাই DFS-এর "বন্ধনী (parenthesis)" গঠন।' : ''}`
      ),
      scene(g, {
        nodeState: { ...Object.fromEntries(ev.color.map((c, i) => [i, colorState(c)])), [ev.u]: 'relax' },
        edgeState: { ...allEdges(g, 'dim'), ...treeOf(ev) },
        subs: timeSubs(ev),
        panels: [
          { type: 'stack', label: T('grey vertices = call stack', 'ধূসর ভার্টেক্স = কল স্ট্যাক'), items: greys.map((v) => `dfs(${v})`) },
          { type: 'array', label: T('d[ ] — entered at', 'd[ ] — ঢোকার সময়'), cells: ev.d.map((x) => (x == null ? '·' : String(x))) },
          { type: 'array', label: T('f[ ] — left at', 'f[ ] — বের হওয়ার সময়'), cells: ev.f.map((x) => (x == null ? '·' : String(x))), hl: { [ev.u]: 'relax' } }
        ],
        status: `clock = ${ev.time}`
      })
    ));
  }

  // edge kinds and the cycle
  const b = back[0];
  steps.push(step(
    T('Tree edges and back edges', 'ট্রি এজ আর ব্যাক এজ'),
    T(
      `While DFS stands on a grey vertex u and looks at a neighbour v:\n\n- v is **white** → we walk into it. u–v is a **tree edge** (green). The tree edges form the **DFS tree**.\n- v is **grey** (and not the parent we just came from) → v is still on the call stack, so it is an **ancestor** of u. u–v is a **back edge** — it closes a loop.\n\n${b ? `Here: standing on **${b.u}**, DFS saw **${b.v}** already grey. Path in the tree from ${b.v} down to ${b.u}, plus the edge ${b.u}–${b.v} back up = a **cycle**.` : 'This graph has no back edge, so it has no cycle.'}\n\n> **Rule:** a graph has a cycle **exactly when** DFS finds a back edge.`,
      `DFS যখন একটা ধূসর ভার্টেক্স u-তে দাঁড়িয়ে প্রতিবেশী v দেখে:\n\n- v **সাদা** → আমরা তার ভেতরে যাই। u–v হলো **ট্রি এজ (tree edge)** (সবুজ)। ট্রি এজগুলো মিলে **DFS ট্রি**।\n- v **ধূসর** (আর এইমাত্র যে parent থেকে এলাম সে না) → v এখনো কল স্ট্যাকে, মানে সে u-এর **পূর্বপুরুষ (ancestor)**। u–v হলো **ব্যাক এজ (back edge)** — একটা লুপ বন্ধ করে।\n\n${b ? `এখানে: **${b.u}**-এ দাঁড়িয়ে DFS দেখল **${b.v}** আগেই ধূসর। ট্রিতে ${b.v} থেকে নিচে ${b.u} পর্যন্ত পথ, আর ${b.u}–${b.v} এজ দিয়ে ওপরে ফেরা = একটা **সাইকেল**।` : 'এই গ্রাফে কোনো ব্যাক এজ নেই, তাই সাইকেলও নেই।'}\n\n> **নিয়ম:** গ্রাফে সাইকেল আছে **ঠিক তখনই**, যখন DFS একটা ব্যাক এজ পায়।`
    ),
    (() => {
      const cyc = [];
      if (b) for (let x = b.u; x !== -1; x = parent[x]) { cyc.push(x); if (x === b.v) break; }
      const ce = b ? Object.fromEntries([...cyc.slice(1).map((x, i) => [keyOf(g, cyc[i], x), 'relax']), [keyOf(g, b.u, b.v), 'reject']]) : {};
      return scene(g, {
        nodeState: Object.fromEntries(cyc.map((x) => [x, 'compare'])),
        edgeState: { ...allEdges(g, 'dim'), ...Object.fromEntries([...Array(g.V).keys()].filter((v) => parent[v] >= 0).map((v) => [keyOf(g, parent[v], v), 'tree'])), ...ce },
        tags: b ? { [b.u]: 'u', [b.v]: 'v' } : {},
        status: b ? T(`back edge ${b.u}–${b.v} → cycle ${[...cyc].reverse().join('–')}–${b.v}`, `ব্যাক এজ ${b.u}–${b.v} → সাইকেল ${[...cyc].reverse().join('–')}–${b.v}`) : T('no back edge', 'ব্যাক এজ নেই')
      });
    })()
  ));

  steps.push(step(
    T('Directed graphs: why "visited" is not enough', 'ডিরেক্টেড গ্রাফ: কেন শুধু "visited" যথেষ্ট না'),
    T(
      `In an **undirected** graph, meeting any visited vertex that is not your parent already means a cycle.\n\nIn a **directed** graph that is wrong. Left picture: DFS from 0 goes 0 → 1 → 2, finishes 2 (black), comes back and tries 0 → 2. Vertex 2 is visited — but **black**, not grey. The arrows 0 → 1 → 2 and 0 → 2 do **not** make a cycle; you cannot come back to 0.\n\nRight picture: 0 → 1 → 2 → 0. When DFS stands on 2, vertex 0 is **grey** (still on the stack) → back edge → real cycle.\n\n> Directed cycle test: an edge to a **grey** vertex. Black means "already finished, no way back".`,
      `**আনডিরেক্টেড** গ্রাফে parent ছাড়া আগে-দেখা যেকোনো ভার্টেক্স পেলেই সাইকেল।\n\n**ডিরেক্টেড** গ্রাফে এটা ভুল। বাম ছবি: 0 থেকে DFS যায় 0 → 1 → 2, 2 শেষ করে (কালো), ফিরে এসে 0 → 2 চেষ্টা করে। ভার্টেক্স 2 দেখা হয়েছে — কিন্তু **কালো**, ধূসর না। 0 → 1 → 2 আর 0 → 2 তীরগুলো **সাইকেল না**; 0-তে ফেরা যায় না।\n\nডান ছবি: 0 → 1 → 2 → 0। DFS যখন 2-এ, ভার্টেক্স 0 **ধূসর** (এখনো স্ট্যাকে) → ব্যাক এজ → আসল সাইকেল।\n\n> ডিরেক্টেড সাইকেল পরীক্ষা: একটা **ধূসর** ভার্টেক্সের দিকে এজ। কালো মানে "আগেই শেষ, ফেরার পথ নেই"।`
    ),
    scene(DIR_PAIR, {
      nodeState: { 0: 'done', 1: 'done', 2: 'done', 3: 'compare', 4: 'compare', 5: 'compare' },
      edgeState: { '0-1': 'tree', '1-2': 'tree', '0-2': 'compare', '3-4': 'tree', '4-5': 'tree', '5-3': 'reject' },
      tags: { 0: 'no cycle', 3: 'cycle' },
      status: T('left: edge to a black vertex · right: edge to a grey vertex', 'বামে: কালো ভার্টেক্সে এজ · ডানে: ধূসর ভার্টেক্সে এজ')
    })
  ));

  steps.push(step(
    T('Cost and the recursion limit', 'খরচ আর রিকার্শনের সীমা'),
    T(
      `Like BFS, DFS enters each vertex once and reads each adjacency list once → **O(V + E)**.\n\nBFS is usually the safer choice for "shortest" questions; DFS is usually **shorter to write** and is the base of many later algorithms: topological sort, cycle finding, bridges and articulation points, strongly connected components, flood fill on grids.\n\n> One danger: recursion depth. A path of 10⁵ vertices makes 10⁵ nested calls — some judges (and Python, by default limited to ~1000) crash with a **stack overflow**. Then write DFS with your own stack, or raise the limit.`,
      `BFS-এর মতোই DFS প্রতিটা ভার্টেক্সে একবার ঢোকে, প্রতিটা অ্যাডজাসেন্সি লিস্ট একবার পড়ে → **O(V + E)**।\n\n"সবচেয়ে ছোট" প্রশ্নে সাধারণত BFS নিরাপদ; DFS সাধারণত **লিখতে ছোট**, আর পরের অনেক অ্যালগরিদমের ভিত্তি: টপোলজিক্যাল সর্ট, সাইকেল খোঁজা, ব্রিজ ও আর্টিকুলেশন পয়েন্ট, স্ট্রংলি কানেক্টেড কম্পোনেন্ট, গ্রিডে ফ্লাড ফিল (flood fill)।\n\n> একটা বিপদ: রিকার্শনের গভীরতা। 10⁵ ভার্টেক্সের একটা লম্বা পথে 10⁵টা কল একটার ভেতরে আরেকটা — কিছু জাজ (আর পাইথন, যার ডিফল্ট সীমা ~1000) **স্ট্যাক ওভারফ্লো** দিয়ে ক্র্যাশ করে। তখন নিজের স্ট্যাক দিয়ে DFS লেখো, বা সীমা বাড়াও।`
    ),
    scene(g, { nodeState: Object.fromEntries([...Array(g.V).keys()].map((v) => [v, 'done'])), edgeState: { ...allEdges(g, 'dim'), ...Object.fromEntries([...Array(g.V).keys()].filter((v) => parent[v] >= 0).map((v) => [keyOf(g, parent[v], v), 'tree'])) }, subs: Object.fromEntries([...Array(g.V).keys()].map((v) => [v, `${d[v]}/${f[v]}`])), status: T('each vertex once, each list once → O(V + E)', 'প্রতিটা ভার্টেক্স একবার, প্রতিটা লিস্ট একবার → O(V + E)') })
  ));

  steps.push(practiceStep(
    g,
    T('Practice problems', 'প্র্যাকটিস প্রবলেম'),
    T(
      'First, without looking: write DFS that records d[] and f[], then add the grey-vertex check and print "cycle" when you find a back edge. Then solve these.',
      'আগে না দেখে: এমন DFS লেখো যেটা d[] আর f[] রাখে, তারপর ধূসর-ভার্টেক্স চেক যোগ করে ব্যাক এজ পেলে "cycle" প্রিন্ট করো। তারপর এগুলো সমাধান করো।'
    ),
    [
      ['UVa 280 — Vertex', 'which vertices can a DFS reach', 'DFS কোন কোন ভার্টেক্সে পৌঁছায়'],
      ['UVa 572 — Oil Deposits', 'flood fill on a grid: count components', 'গ্রিডে ফ্লাড ফিল: কম্পোনেন্ট গোনা'],
      ['UVa 469 — Wetlands of Florida', 'flood fill, size of a component', 'ফ্লাড ফিল, কম্পোনেন্টের আকার'],
      ['UVa 11518 — Dominos 2', 'reachability from several starts', 'কয়েকটা শুরু থেকে কোথায় পৌঁছানো যায়'],
      ['UVa 11504 — Dominos', 'finishing times + a second DFS', 'ফিনিশিং টাইম + দ্বিতীয় DFS']
    ],
    { nodeState: allNodesDone(g), subs: Object.fromEntries([...Array(g.V).keys()].map((v) => [v, `${d[v]}/${f[v]}`])) }
  ));
  return steps;
}

const allNodesDone = (g) => Object.fromEntries(g.nodes.map((n) => [n.id, 'done']));

// two little directed graphs side by side: 0→1→2 + 0→2 (no cycle) and 3→4→5→3 (cycle)
const DIR_PAIR = {
  V: 6,
  directed: true,
  weighted: false,
  nodes: [
    { id: 0, label: '0', x: 60, y: 60 }, { id: 1, label: '1', x: 200, y: 60 }, { id: 2, label: '2', x: 130, y: 220 },
    { id: 3, label: '0', x: 380, y: 60 }, { id: 4, label: '1', x: 520, y: 60 }, { id: 5, label: '2', x: 450, y: 220 }
  ],
  edges: [{ u: 0, v: 1 }, { u: 1, v: 2 }, { u: 0, v: 2 }, { u: 3, v: 4 }, { u: 4, v: 5 }, { u: 5, v: 3 }]
};
