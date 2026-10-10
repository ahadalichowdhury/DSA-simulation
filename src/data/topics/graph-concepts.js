/* ------------------------------------------------------------------ *
 * Graphs chapter — the idea lessons: what a graph is, the words we use,
 * the kinds of graphs, three ways to store one, and spanning trees.
 *
 * Every step draws the real graph (scene kind 'graphx'). Code is tagged
 * per line (see src/visuals/codeTags.js), so a step names the line it is
 * about and the panel finds it in every language.
 * ------------------------------------------------------------------ */
import { G_INTRO, G_W, G_DAG, adjOf, edgeRows } from '../../visuals/graphData.js';
import { program } from '../../visuals/codeTags.js';

// identical text is code (e.g. `dist[3]: ∞ → 6`), so it is stored once as a plain string
const T = (en, bn) => (en === bn ? en : { en, bn });
const scene = (g, extra = {}) => ({ kind: 'graphx', directed: g.directed, weighted: g.weighted, nodes: g.nodes, edges: g.edges, ...extra });
const step = (title, explanation, sc, line, state) => ({ title, explanation, scene: sc, ...(line ? { line } : {}), ...(state ? { state } : {}) });
const ek = (u, v) => `${u}-${v}`;
const allNodes = (g, st) => Object.fromEntries(g.nodes.map((n) => [n.id, st]));
const allEdges = (g, st) => Object.fromEntries(g.edges.map((e) => [ek(e.u, e.v), st]));
const N = (list) => list.map(([id, x, y]) => ({ id, label: String(id), x, y }));

/* --------------------------------------------------------------- shared code wrappers */

/** Wrap top-level statement lines into a whole program for each language. */
function wrap(lang, lines, { imports = '' } = {}) {
  const body = lines.join('\n');
  const ind = (s, n) => s.split('\n').map((l) => (l.trim() ? ' '.repeat(n) + l : l)).join('\n');
  if (lang === 'java') return `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n${ind(body, 8)}\n    }\n}`;
  if (lang === 'cpp') return `#include <iostream>\n#include <vector>${imports ? `\n${imports}` : ''}\nusing namespace std;\n\nint main() {\n${ind(`${body}\nreturn 0;`, 4)}\n}`;
  return body;
}

/** The edge list literal of a graph, as tagged lines for one language. */
function edgesDecl(g, lang, tag) {
  const rows = edgeRows(g, lang);
  const open = { js: 'const edges = [', python: 'edges = [', java: 'int[][] edges = {', cpp: 'vector<vector<int>> edges = {' }[lang];
  const close = { js: '];', python: ']', java: '};', cpp: '};' }[lang];
  return [`${open}  @${tag}`, ...rows.map((r, i) => `    ${r}${i < rows.length - 1 ? ',' : ''}  @${tag}`), `${close}  @${tag}`];
}

const D_INTRO = { ...G_INTRO, directed: true, edges: [{ u: 0, v: 1 }, { u: 0, v: 2 }, { u: 2, v: 1 }, { u: 1, v: 3 }, { u: 2, v: 4 }, { u: 4, v: 3 }] };

/* ===================================================================== 1. What is a graph */

const introCode = (() => {
  const text = {
    a1: ['V = 5             ← the vertices are 0, 1, 2, 3, 4', 'V = 5             ← ভার্টেক্সগুলো 0, 1, 2, 3, 4'],
    a2: ['E = (0,1) (0,2) (1,2) (1,3) (2,4) (3,4)      ← the edges', 'E = (0,1) (0,2) (1,2) (1,3) (2,4) (3,4)      ← এজগুলো'],
    a3: ['print "vertices:", V', 'প্রিন্ট "ভার্টেক্স:", V'],
    a4: ['print "edges:", how many pairs are in E', 'প্রিন্ট "এজ:", E-তে কতগুলো জোড়া'],
    a5: ['for each edge (u, v) in E:', 'E-এর প্রতিটা এজ (u, v)-এর জন্য:'],
    a6: ['    if u == 1: print v      ← v is a neighbour of 1', '    u == 1 হলে: v প্রিন্ট করো      ← v হলো 1-এর প্রতিবেশী'],
    a7: ['    if v == 1: print u', '    v == 1 হলে: u প্রিন্ট করো'],
    c1: ['A graph is just two things: vertices and edges', 'গ্রাফ মানে শুধু দুটো জিনিস: ভার্টেক্স আর এজ'],
    c2: ['Neighbours of vertex 1: the other end of every edge that touches 1', 'ভার্টেক্স 1-এর প্রতিবেশী: 1-কে ছোঁয়া প্রতিটা এজের অন্য মাথা']
  };
  const g = G_INTRO;
  const src = {
    pseudo: '{{a1}}  @v\n{{a2}}  @e\n{{a3}}  @pv\n{{a4}}  @pe\n{{a5}}  @nbr\n{{a6}}  @nbr\n{{a7}}  @nbr',
    js: wrap('js', ['// {{c1}}  @v', 'const V = 5;  @v', ...edgesDecl(g, 'js', 'e'), '', 'console.log("vertices:", V);  @pv', 'console.log("edges:", edges.length);  @pe', '', '// {{c2}}  @nbr', 'for (const [u, v] of edges) {  @nbr', '    if (u === 1) console.log(v);  @nbr', '    if (v === 1) console.log(u);  @nbr', '}  @nbr']),
    python: wrap('python', ['# {{c1}}  @v', 'V = 5  @v', ...edgesDecl(g, 'python', 'e'), '', 'print("vertices:", V)  @pv', 'print("edges:", len(edges))  @pe', '', '# {{c2}}  @nbr', 'for u, v in edges:  @nbr', '    if u == 1: print(v)  @nbr', '    if v == 1: print(u)  @nbr']),
    java: wrap('java', ['// {{c1}}  @v', 'int V = 5;  @v', ...edgesDecl(g, 'java', 'e'), '', 'System.out.println("vertices: " + V);  @pv', 'System.out.println("edges: " + edges.length);  @pe', '', '// {{c2}}  @nbr', 'for (int[] e : edges) {  @nbr', '    if (e[0] == 1) System.out.println(e[1]);  @nbr', '    if (e[1] == 1) System.out.println(e[0]);  @nbr', '}  @nbr']),
    cpp: wrap('cpp', ['// {{c1}}  @v', 'int V = 5;  @v', ...edgesDecl(g, 'cpp', 'e'), '', 'cout << "vertices: " << V << endl;  @pv', 'cout << "edges: " << edges.size() << endl;  @pe', '', '// {{c2}}  @nbr', 'for (auto& e : edges) {  @nbr', '    if (e[0] == 1) cout << e[1] << endl;  @nbr', '    if (e[1] == 1) cout << e[0] << endl;  @nbr', '}  @nbr'])
  };
  return program(src, text);
})();

const edgeTable = (g, hl = {}) => ({
  type: 'edges',
  label: T('E — the list of edges', 'E — এজের তালিকা'),
  head: [T('edge', 'এজ')],
  rows: g.edges.map((e, i) => ({ e: `${e.u}–${e.v}`, state: hl[i] || '' }))
});

const NO_CYCLE_TREE = {
  ...G_INTRO,
  edges: [{ u: 0, v: 1 }, { u: 0, v: 2 }, { u: 1, v: 3 }, { u: 2, v: 4 }]
};

const whatIsGraph = {
  id: 'graph-what-is',
  name: { en: 'What is a Graph?', bn: 'গ্রাফ কী?' },
  description: { en: 'Dots and lines: vertices, edges and G = (V, E)', bn: 'বিন্দু আর রেখা: ভার্টেক্স, এজ আর G = (V, E)' },
  categoryKey: 'graphs',
  subgroupKey: 'g-basics',
  level: 'beginner',
  order: 10,
  icon: '🕸️',
  complexity: { time: 'O(E)', space: 'O(V + E)', note: { en: 'Storing a graph means storing its vertices and its edges. Listing the neighbours of one vertex from a plain edge list scans every edge.', bn: 'গ্রাফ রাখা মানে তার ভার্টেক্স আর এজ রাখা। সাধারণ এজ-তালিকা থেকে এক ভার্টেক্সের প্রতিবেশী বের করতে সব এজ দেখতে হয়।' } },
  code: introCode.code,
  lineMap: introCode.lineMap,
  steps: [
    step(
      T('Five cities and their roads', 'পাঁচটা শহর আর তাদের রাস্তা'),
      T(
        'Look at the picture as a little **map**: each circle is a city and each line is a road between two cities.\n\nThat is all a **graph** is — **things** (circles) and **connections** between them (lines).\n\nYou already use graphs every day: Google Maps (places + roads), Facebook (people + friendships), the internet (computers + cables).',
        'ছবিটাকে একটা ছোট **ম্যাপ** ভাবো: প্রতিটা বৃত্ত একটা শহর আর প্রতিটা রেখা দুই শহরের মধ্যে একটা রাস্তা।\n\n**গ্রাফ (graph)** মানে শুধু এটুকুই — **জিনিস** (বৃত্ত) আর তাদের মধ্যে **সংযোগ** (রেখা)।\n\nতুমি প্রতিদিনই গ্রাফ ব্যবহার করো: গুগল ম্যাপ (জায়গা + রাস্তা), ফেসবুক (মানুষ + বন্ধুত্ব), ইন্টারনেট (কম্পিউটার + তার)।'
      ),
      scene(G_INTRO, { label: T('0 Dhaka · 1 Sylhet · 2 Rajshahi · 3 Chattogram · 4 Khulna', '0 ঢাকা · 1 সিলেট · 2 রাজশাহী · 3 চট্টগ্রাম · 4 খুলনা'), status: T('circles = cities, lines = roads', 'বৃত্ত = শহর, রেখা = রাস্তা') }),
      'v'
    ),
    step(
      T('Vertices: the things', 'ভার্টেক্স: জিনিসগুলো'),
      T(
        'Each circle is called a **vertex** (plural: **vertices**). Some books say **node** — same thing.\n\nWe number them **0, 1, 2, 3, 4**, just like array indexes, so the code can use them directly.\n\nThe set of all vertices is written **V = {0, 1, 2, 3, 4}**, and the count is **|V| = 5**.',
        'প্রতিটা বৃত্তকে বলে **ভার্টেক্স (vertex)**, বহুবচনে **vertices**। কিছু বইয়ে বলে **নোড (node)** — একই জিনিস।\n\nআমরা এদের **0, 1, 2, 3, 4** নম্বর দিই, অ্যারের ইনডেক্সের মতো, যাতে কোড সরাসরি ব্যবহার করতে পারে।\n\nসব ভার্টেক্সের সেট লেখা হয় **V = {0, 1, 2, 3, 4}**, আর সংখ্যা **|V| = 5**।'
      ),
      scene(G_INTRO, { nodeState: allNodes(G_INTRO, 'current'), edgeState: allEdges(G_INTRO, 'dim'), status: T('V = {0, 1, 2, 3, 4}   |V| = 5', 'V = {0, 1, 2, 3, 4}   |V| = 5') }),
      'v'
    ),
    step(
      T('Edges: the connections', 'এজ: সংযোগগুলো'),
      T(
        'Each line is an **edge**. An edge is simply a **pair of vertices**: the road between 0 and 1 is the edge **(0, 1)**.\n\nOur graph has 6 edges: (0,1), (0,2), (1,2), (1,3), (2,4), (3,4). So **|E| = 6**.\n\nHere the roads are two-way, so (0, 1) and (1, 0) are the same edge.',
        'প্রতিটা রেখা একটা **এজ (edge)**। এজ মানে শুধু **দুটো ভার্টেক্সের একটা জোড়া**: 0 আর 1-এর মধ্যের রাস্তা হলো এজ **(0, 1)**।\n\nআমাদের গ্রাফে ৬টা এজ: (0,1), (0,2), (1,2), (1,3), (2,4), (3,4)। তাই **|E| = 6**।\n\nএখানে রাস্তাগুলো দুই দিকেই চলে, তাই (0, 1) আর (1, 0) একই এজ।'
      ),
      scene(G_INTRO, { edgeState: allEdges(G_INTRO, 'tree'), panels: [edgeTable(G_INTRO)], status: T('|E| = 6', '|E| = 6') }),
      'e'
    ),
    step(
      T('The definition: G = (V, E)', 'সংজ্ঞা: G = (V, E)'),
      T(
        'Put the two together and you have the formal definition:\n\n> A **graph** G is a pair **G = (V, E)**: a set of vertices V and a set of edges E, where each edge joins two vertices of V.\n\nThe code does exactly this: it keeps `V = 5` and the list of `edges`, then prints how many there are.',
        'দুটো একসঙ্গে রাখলেই আনুষ্ঠানিক সংজ্ঞা:\n\n> একটা **গ্রাফ** G হলো একটা জোড়া **G = (V, E)**: ভার্টেক্সের সেট V আর এজের সেট E, যেখানে প্রতিটা এজ V-এর দুটো ভার্টেক্সকে জোড়ে।\n\nকোড ঠিক এটাই করে: `V = 5` আর `edges`-এর তালিকা রাখে, তারপর কয়টা আছে প্রিন্ট করে।'
      ),
      scene(G_INTRO, { panels: [{ type: 'text', label: T('a graph', 'একটা গ্রাফ'), text: T('**G = (V, E)**  ·  V = {0, 1, 2, 3, 4}  ·  E = {(0,1), (0,2), (1,2), (1,3), (2,4), (3,4)}', '**G = (V, E)**  ·  V = {0, 1, 2, 3, 4}  ·  E = {(0,1), (0,2), (1,2), (1,3), (2,4), (3,4)}') }], status: T('vertices: 5, edges: 6', 'ভার্টেক্স: 5, এজ: 6') }),
      ['pv', 'pe']
    ),
    step(
      T('Neighbours (adjacent vertices)', 'প্রতিবেশী (অ্যাডজাসেন্ট ভার্টেক্স)'),
      T(
        'Two vertices joined by an edge are **neighbours** — the official word is **adjacent**.\n\nThe neighbours of **1** are **0, 2 and 3**: from Sylhet you can drive straight to Dhaka, Rajshahi or Chattogram.\n\nThe code finds them by walking through every edge and printing the **other end** whenever one end is 1.',
        'একটা এজ দিয়ে যুক্ত দুটো ভার্টেক্স হলো **প্রতিবেশী** — আনুষ্ঠানিক শব্দ **অ্যাডজাসেন্ট (adjacent)**।\n\n**1**-এর প্রতিবেশী **0, 2 আর 3**: সিলেট থেকে সরাসরি ঢাকা, রাজশাহী বা চট্টগ্রামে যাওয়া যায়।\n\nকোড প্রতিটা এজ ঘুরে দেখে, আর এক মাথা 1 হলে **অন্য মাথাটা** প্রিন্ট করে এদের খুঁজে পায়।'
      ),
      scene(G_INTRO, { nodeState: { 1: 'current', 0: 'compare', 2: 'compare', 3: 'compare', 4: 'dim' }, edgeState: { '0-1': 'compare', '1-2': 'compare', '1-3': 'compare', '0-2': 'dim', '2-4': 'dim', '3-4': 'dim' }, edgeFrom: { '0-1': 1, '1-2': 1, '1-3': 1 }, panels: [edgeTable(G_INTRO, { 0: 'compare', 2: 'compare', 3: 'compare' })], status: T('neighbours of 1: 0, 2, 3', '1-এর প্রতিবেশী: 0, 2, 3') }),
      'nbr'
    ),
    step(
      T('Is every graph a tree? No!', 'প্রতিটা গ্রাফ কি ট্রি? না!'),
      T(
        'You already know **trees**. A tree is a special graph: everything is connected and there is **no loop**.\n\nOur graph has a loop: **0 → 1 → 2 → 0** (red). You can leave Dhaka and come back without using a road twice. A loop like this is called a **cycle**, so this graph is **not** a tree.\n\nGraphs are more free: any vertex may connect to any other, and cycles are allowed.',
        'তুমি **ট্রি** আগেই চেনো। ট্রি হলো বিশেষ ধরনের গ্রাফ: সব যুক্ত আর কোনো **লুপ নেই**।\n\nআমাদের গ্রাফে একটা লুপ আছে: **0 → 1 → 2 → 0** (লাল)। ঢাকা থেকে বেরিয়ে কোনো রাস্তা দুবার ব্যবহার না করেই ফেরা যায়। এমন লুপকে বলে **সাইকেল (cycle)**, তাই এই গ্রাফ **ট্রি নয়**।\n\nগ্রাফ বেশি স্বাধীন: যেকোনো ভার্টেক্স যেকোনোটার সঙ্গে যুক্ত হতে পারে, সাইকেলও চলে।'
      ),
      scene(G_INTRO, { nodeState: { 0: 'reject', 1: 'reject', 2: 'reject' }, edgeState: { '0-1': 'reject', '1-2': 'reject', '0-2': 'reject' }, status: T('cycle: 0 → 1 → 2 → 0', 'সাইকেল: 0 → 1 → 2 → 0') }),
      'e'
    ),
    step(
      T('Remove the cycles → a tree', 'সাইকেল সরাও → একটা ট্রি'),
      T(
        'Keep only 4 roads — (0,1), (0,2), (1,3), (2,4) — and every city is still reachable, but there is no loop any more.\n\nNow it **is** a tree: **5 vertices, 4 edges**. A tree with V vertices always has exactly **V − 1** edges. Remember this — it comes back in Spanning Trees.',
        'শুধু ৪টা রাস্তা রাখো — (0,1), (0,2), (1,3), (2,4) — তবুও প্রতিটা শহরে যাওয়া যায়, কিন্তু আর কোনো লুপ নেই।\n\nএখন এটা **ট্রি**: **৫টা ভার্টেক্স, ৪টা এজ**। V ভার্টেক্সের একটা ট্রিতে সবসময় ঠিক **V − 1**টা এজ থাকে। এটা মনে রাখো — স্প্যানিং ট্রিতে আবার আসবে।'
      ),
      scene(NO_CYCLE_TREE, { edgeState: allEdges(NO_CYCLE_TREE, 'tree'), nodeState: { 0: 'source' }, status: T('5 vertices, 4 edges, no cycle → a tree', '৫ ভার্টেক্স, ৪ এজ, সাইকেল নেই → ট্রি') }),
      'e'
    ),
    step(
      T('What we learned', 'কী শিখলাম'),
      T(
        '- A **graph** is **G = (V, E)**: vertices (things) and edges (connections).\n- Vertices joined by an edge are **adjacent** (neighbours).\n- A **cycle** is a path that comes back to where it started. A **tree** is a connected graph with **no** cycle and V − 1 edges.\n\nNext: the words we use to describe graphs — degree, path, cycle, connected.',
        '- **গ্রাফ** হলো **G = (V, E)**: ভার্টেক্স (জিনিস) আর এজ (সংযোগ)।\n- একটা এজ দিয়ে যুক্ত ভার্টেক্সরা **অ্যাডজাসেন্ট** (প্রতিবেশী)।\n- **সাইকেল** এমন পথ যা শুরুর জায়গায় ফেরে। **ট্রি** হলো যুক্ত গ্রাফ যাতে **কোনো** সাইকেল নেই আর V − 1টা এজ।\n\nপরে: গ্রাফ বোঝাতে যে শব্দগুলো লাগে — ডিগ্রি, পাথ, সাইকেল, কানেক্টেড।'
      ),
      scene(G_INTRO, { status: T('G = (V, E)', 'G = (V, E)') }),
      ['pv', 'pe']
    )
  ]
};

/* ===================================================================== 2. Graph words */

const termsCode = (() => {
  const text = {
    b1: ['degree = [0, 0, 0, 0, 0]          ← one counter per vertex', 'degree = [0, 0, 0, 0, 0]          ← প্রতি ভার্টেক্সে একটা কাউন্টার'],
    b2: ['for each edge (u, v):', 'প্রতিটা এজ (u, v)-এর জন্য:'],
    b3: ['    degree[u] = degree[u] + 1       ← the edge touches u', '    degree[u] = degree[u] + 1       ← এজটা u-কে ছোঁয়'],
    b4: ['    degree[v] = degree[v] + 1       ← and it touches v', '    degree[v] = degree[v] + 1       ← আর v-কেও ছোঁয়'],
    b5: ['total = sum of all degrees', 'total = সব ডিগ্রির যোগফল'],
    b6: ['print total, 2 × number of edges    ← always equal!', 'প্রিন্ট total, 2 × এজের সংখ্যা    ← সবসময় সমান!'],
    c1: ['Every edge has two ends, so it adds 1 to two vertices', 'প্রতিটা এজের দুটো মাথা, তাই এটা দুটো ভার্টেক্সে 1 যোগ করে'],
    c2: ['Handshaking lemma: sum of degrees = 2 × edges', 'হ্যান্ডশেকিং লেমা: ডিগ্রির যোগফল = 2 × এজ']
  };
  const g = G_INTRO;
  const src = {
    pseudo: '{{b1}}  @init\n{{b2}}  @loop\n{{b3}}  @inc\n{{b4}}  @inc\n{{b5}}  @sum\n{{b6}}  @check',
    js: wrap('js', ['const V = 5;  @init', ...edgesDecl(g, 'js', 'init'), 'const degree = new Array(V).fill(0);  @init', '', '// {{c1}}  @loop', 'for (const [u, v] of edges) {  @loop', '    degree[u]++;  @inc', '    degree[v]++;  @inc', '}', '', '// {{c2}}  @sum', 'const total = degree.reduce((a, b) => a + b, 0);  @sum', 'console.log(degree, total, 2 * edges.length);  @check']),
    python: wrap('python', ['V = 5  @init', ...edgesDecl(g, 'python', 'init'), 'degree = [0] * V  @init', '', '# {{c1}}  @loop', 'for u, v in edges:  @loop', '    degree[u] += 1  @inc', '    degree[v] += 1  @inc', '', '# {{c2}}  @sum', 'total = sum(degree)  @sum', 'print(degree, total, 2 * len(edges))  @check']),
    java: wrap('java', ['int V = 5;  @init', ...edgesDecl(g, 'java', 'init'), 'int[] degree = new int[V];  @init', '', '// {{c1}}  @loop', 'for (int[] e : edges) {  @loop', '    degree[e[0]]++;  @inc', '    degree[e[1]]++;  @inc', '}', '', '// {{c2}}  @sum', 'int total = 0;  @sum', 'for (int d : degree) total += d;  @sum', 'System.out.println(Arrays.toString(degree) + " " + total + " " + 2 * edges.length);  @check']),
    cpp: wrap('cpp', ['int V = 5;  @init', ...edgesDecl(g, 'cpp', 'init'), 'vector<int> degree(V, 0);  @init', '', '// {{c1}}  @loop', 'for (auto& e : edges) {  @loop', '    degree[e[0]]++;  @inc', '    degree[e[1]]++;  @inc', '}', '', '// {{c2}}  @sum', 'int total = 0;  @sum', 'for (int d : degree) total += d;  @sum', 'cout << total << " " << 2 * edges.size() << endl;  @check'])
  };
  return program(src, text);
})();

const termsSteps = (() => {
  const g = G_INTRO;
  const steps = [];
  const deg = Array(g.V).fill(0);
  const degPanel = (hl = {}) => ({ type: 'array', label: T('degree[ ]', 'degree[ ]'), cells: [...deg], hl });
  steps.push(step(
    T('Degree: how many edges touch a vertex', 'ডিগ্রি: একটা ভার্টেক্সকে কতগুলো এজ ছোঁয়'),
    T(
      'The **degree** of a vertex is the number of edges that touch it — in a road map, how many roads leave that city.\n\nVertex **1** has three roads (to 0, 2 and 3), so **deg(1) = 3**.\n\nThe code will count every degree by starting each counter at 0.',
      'একটা ভার্টেক্সের **ডিগ্রি (degree)** হলো তাকে ছোঁয়া এজের সংখ্যা — রাস্তার ম্যাপে, সেই শহর থেকে কয়টা রাস্তা বের হয়।\n\nভার্টেক্স **1**-এর তিনটা রাস্তা (0, 2 আর 3-এ), তাই **deg(1) = 3**।\n\nকোড প্রতিটা কাউন্টার 0 থেকে শুরু করে সব ডিগ্রি গুনবে।'
    ),
    scene(g, { nodeState: { 1: 'current' }, edgeState: { '0-1': 'compare', '1-2': 'compare', '1-3': 'compare' }, subs: { 1: 'deg 3' }, panels: [degPanel()], status: T('deg(1) = 3', 'deg(1) = 3') }),
    'init'
  ));
  g.edges.forEach((e, i) => {
    deg[e.u]++;
    deg[e.v]++;
    const done = Object.fromEntries(g.edges.slice(0, i).map((x) => [ek(x.u, x.v), 'tree']));
    steps.push(step(
      T(`Edge ${e.u}–${e.v}: +1 for ${e.u} and ${e.v}`, `এজ ${e.u}–${e.v}: ${e.u} আর ${e.v}-এ +1`),
      T(
        `Edge **(${e.u}, ${e.v})** has two ends, so it adds 1 to \`degree[${e.u}]\` **and** 1 to \`degree[${e.v}]\`.\n\nNow degree = [${deg.join(', ')}].${i === 0 ? '\n\nThe green edges are the ones already counted.' : ''}`,
        `এজ **(${e.u}, ${e.v})**-এর দুটো মাথা, তাই এটা \`degree[${e.u}]\`-এ 1 **আর** \`degree[${e.v}]\`-এ 1 যোগ করে।\n\nএখন degree = [${deg.join(', ')}]।${i === 0 ? '\n\nসবুজ এজগুলো আগেই গোনা হয়ে গেছে।' : ''}`
      ),
      scene(g, { nodeState: { [e.u]: 'relax', [e.v]: 'relax' }, edgeState: { ...done, [ek(e.u, e.v)]: 'compare' }, subs: Object.fromEntries(deg.map((d, v) => [v, `deg ${d}`])), panels: [degPanel({ [e.u]: 'relax', [e.v]: 'relax' })], status: T(`degree[${e.u}]++, degree[${e.v}]++`, `degree[${e.u}]++, degree[${e.v}]++`) }),
      ['loop', 'inc'],
      { u: e.u, v: e.v }
    ));
  });
  const total = deg.reduce((a, b) => a + b, 0);
  const odd = deg.map((d, v) => (d % 2 ? v : null)).filter((v) => v != null);
  steps.push(step(
    T('The handshaking lemma', 'হ্যান্ডশেকিং লেমা'),
    T(
      `Add up all degrees: ${deg.join(' + ')} = **${total}**. And 2 × edges = 2 × ${g.edges.length} = **${2 * g.edges.length}**. Equal!\n\nThis is always true, for every undirected graph:\n\n> **sum of all degrees = 2 × |E|**\n\nWhy? Every edge has **two ends**, so it is counted exactly twice. Like a handshake: each one involves two hands.`,
      `সব ডিগ্রি যোগ করো: ${deg.join(' + ')} = **${total}**। আর 2 × এজ = 2 × ${g.edges.length} = **${2 * g.edges.length}**। সমান!\n\nপ্রতিটা আনডিরেক্টেড গ্রাফে এটা সবসময় সত্য:\n\n> **সব ডিগ্রির যোগফল = 2 × |E|**\n\nকেন? প্রতিটা এজের **দুটো মাথা**, তাই এটা ঠিক দুবার গোনা হয়। হ্যান্ডশেকের মতো: প্রতিটায় দুটো হাত লাগে।`
    ),
    scene(g, { edgeState: allEdges(g, 'tree'), subs: Object.fromEntries(deg.map((d, v) => [v, `deg ${d}`])), panels: [degPanel(), { type: 'text', label: T('check', 'যাচাই'), text: `${deg.join(' + ')} = **${total}** = 2 × ${g.edges.length}` }], status: T(`${total} = 2 × ${g.edges.length}`, `${total} = 2 × ${g.edges.length}`) }),
    ['sum', 'check']
  ));
  steps.push(step(
    T('Odd degrees come in pairs', 'বিজোড় ডিগ্রি জোড়ায় জোড়ায় আসে'),
    T(
      `A neat result of the lemma: the number of vertices with an **odd** degree is always **even**.\n\nHere the odd ones are **${odd.join(' and ')}** (degree 3) — two of them. The total ${total} is even, and odd numbers can only add up to an even total if there is an even count of them.`,
      `লেমার একটা মজার ফল: **বিজোড়** ডিগ্রির ভার্টেক্সের সংখ্যা সবসময় **জোড়**।\n\nএখানে বিজোড়গুলো **${odd.join(' আর ')}** (ডিগ্রি 3) — দুটো। মোট ${total} জোড়, আর বিজোড় সংখ্যা যোগ করে জোড় পেতে হলে তাদের সংখ্যাও জোড় হতে হয়।`
    ),
    scene(g, { nodeState: Object.fromEntries(odd.map((v) => [v, 'compare'])), subs: Object.fromEntries(deg.map((d, v) => [v, `deg ${d}`])), panels: [degPanel(Object.fromEntries(odd.map((v) => [v, 'compare'])))], status: T(`odd-degree vertices: ${odd.join(', ')}`, `বিজোড় ডিগ্রির ভার্টেক্স: ${odd.join(', ')}`) }),
    'check'
  ));
  steps.push(step(
    T('Path: a walk along edges', 'পাথ: এজ ধরে হাঁটা'),
    T(
      'A **path** is a sequence of vertices where each next one is a neighbour of the previous: **0 → 1 → 3 → 4**.\n\nIts **length** is the number of edges used: here **3**.\n\nA **simple path** never visits the same vertex twice. There can be many paths between two vertices — 0 → 2 → 4 also reaches 4, with only 2 edges.',
      '**পাথ (path)** হলো ভার্টেক্সের এমন ক্রম যেখানে প্রতিটা পরেরটা আগেরটার প্রতিবেশী: **0 → 1 → 3 → 4**।\n\nএর **দৈর্ঘ্য** হলো ব্যবহৃত এজের সংখ্যা: এখানে **3**।\n\n**সিম্পল পাথ** একই ভার্টেক্সে দুবার যায় না। দুটো ভার্টেক্সের মধ্যে অনেক পাথ থাকতে পারে — 0 → 2 → 4-ও 4-এ পৌঁছায়, মাত্র ২টা এজে।'
    ),
    scene(g, { nodeState: { 0: 'source', 1: 'visited', 3: 'visited', 4: 'done' }, edgeState: { '0-1': 'tree', '1-3': 'tree', '3-4': 'tree' }, edgeFrom: { '0-1': 0, '1-3': 1, '3-4': 3 }, status: T('path 0 → 1 → 3 → 4, length 3', 'পাথ 0 → 1 → 3 → 4, দৈর্ঘ্য 3') })
  ));
  steps.push(step(
    T('Cycle: a path that comes home', 'সাইকেল: ঘরে ফেরা পাথ'),
    T(
      'A **cycle** is a path that **starts and ends at the same vertex** without reusing an edge.\n\nHere **1 → 2 → 4 → 3 → 1** is a cycle of length 4. (0 → 1 → 2 → 0 is another, of length 3.)\n\nCycles matter a lot: BFS and DFS need a `visited` array so they do not walk around a cycle forever.',
      '**সাইকেল (cycle)** এমন পাথ যা **একই ভার্টেক্সে শুরু আর শেষ** হয়, কোনো এজ আবার ব্যবহার না করে।\n\nএখানে **1 → 2 → 4 → 3 → 1** দৈর্ঘ্য ৪-এর একটা সাইকেল। (0 → 1 → 2 → 0 আরেকটা, দৈর্ঘ্য ৩।)\n\nসাইকেল খুব গুরুত্বপূর্ণ: BFS আর DFS-এর `visited` অ্যারে লাগে যাতে তারা সাইকেলে চিরকাল না ঘোরে।'
    ),
    scene(g, { nodeState: { 1: 'reject', 2: 'reject', 4: 'reject', 3: 'reject' }, edgeState: { '1-2': 'reject', '2-4': 'reject', '3-4': 'reject', '1-3': 'reject' }, status: T('cycle 1 → 2 → 4 → 3 → 1', 'সাইকেল 1 → 2 → 4 → 3 → 1') })
  ));
  const split = { ...g, edges: [{ u: 0, v: 1 }, { u: 0, v: 2 }, { u: 1, v: 2 }, { u: 3, v: 4 }] };
  steps.push(step(
    T('Connected or not?', 'কানেক্টেড নাকি না?'),
    T(
      'A graph is **connected** if there is a path between **every** pair of vertices. Our map is connected.\n\nNow imagine roads 1–3 and 2–4 are flooded. You can no longer get from {0, 1, 2} to {3, 4}. The graph breaks into two **connected components** (blue and orange) — islands with no bridge between them.',
      'যদি **প্রতিটা** জোড়া ভার্টেক্সের মধ্যে একটা পাথ থাকে, গ্রাফটা **কানেক্টেড (connected)**। আমাদের ম্যাপ কানেক্টেড।\n\nএবার ভাবো রাস্তা 1–3 আর 2–4 বন্যায় ডুবে গেছে। {0, 1, 2} থেকে আর {3, 4}-এ যাওয়া যায় না। গ্রাফটা দুটো **কানেক্টেড কম্পোনেন্টে** (নীল আর কমলা) ভেঙে যায় — দুটো দ্বীপ, মাঝে কোনো সেতু নেই।'
    ),
    scene(split, { nodeState: { 0: 'setA', 1: 'setA', 2: 'setA', 3: 'setB', 4: 'setB' }, status: T('2 components: {0, 1, 2} and {3, 4}', '২টা কম্পোনেন্ট: {0, 1, 2} আর {3, 4}') })
  ));
  steps.push(step(
    T('What we learned', 'কী শিখলাম'),
    T(
      '- **Degree** = number of edges touching a vertex. **Sum of degrees = 2 × |E|** (handshaking lemma).\n- **Path** = walk along edges; its length = number of edges.\n- **Cycle** = path that returns to its start.\n- **Connected** = a path exists between every pair; otherwise the graph splits into **components**.',
      '- **ডিগ্রি** = একটা ভার্টেক্সকে ছোঁয়া এজের সংখ্যা। **ডিগ্রির যোগফল = 2 × |E|** (হ্যান্ডশেকিং লেমা)।\n- **পাথ** = এজ ধরে হাঁটা; দৈর্ঘ্য = এজের সংখ্যা।\n- **সাইকেল** = শুরুতে ফিরে আসা পাথ।\n- **কানেক্টেড** = প্রতিটা জোড়ার মধ্যে পাথ আছে; না থাকলে গ্রাফ **কম্পোনেন্টে** ভাগ হয়।'
    ),
    scene(g, { subs: Object.fromEntries(deg.map((d, v) => [v, `deg ${d}`])), status: T('degree · path · cycle · connected', 'ডিগ্রি · পাথ · সাইকেল · কানেক্টেড') }),
    'check'
  ));
  return steps;
})();

const graphTerms = {
  id: 'graph-terms',
  name: { en: 'Graph Words: Degree, Path, Cycle', bn: 'গ্রাফের শব্দ: ডিগ্রি, পাথ, সাইকেল' },
  description: { en: 'Degree, the handshaking lemma, paths, cycles and connected components', bn: 'ডিগ্রি, হ্যান্ডশেকিং লেমা, পাথ, সাইকেল আর কানেক্টেড কম্পোনেন্ট' },
  categoryKey: 'graphs',
  subgroupKey: 'g-basics',
  level: 'beginner',
  order: 20,
  icon: '🔤',
  complexity: { time: 'O(V + E)', space: 'O(V)', note: { en: 'Counting every degree touches each edge once (plus one counter per vertex).', bn: 'সব ডিগ্রি গুনতে প্রতিটা এজ একবার দেখতে হয় (আর প্রতি ভার্টেক্সে একটা কাউন্টার)।' } },
  code: termsCode.code,
  lineMap: termsCode.lineMap,
  steps: termsSteps
};

/* ===================================================================== 3. Types of graphs */

const W_INTRO = { ...G_INTRO, weighted: true, edges: [{ u: 0, v: 1, w: 5 }, { u: 0, v: 2, w: 3 }, { u: 1, v: 2, w: 2 }, { u: 1, v: 3, w: 6 }, { u: 2, v: 4, w: 4 }, { u: 3, v: 4, w: 1 }] };
const MULTI = { V: 3, directed: false, weighted: false, nodes: N([[0, 70, 200], [1, 260, 200], [2, 450, 200]]), edges: [{ u: 0, v: 1 }, { u: 0, v: 1, bend: 34 }, { u: 1, v: 1 }, { u: 1, v: 2 }] };
const K5 = {
  V: 5,
  directed: false,
  weighted: false,
  nodes: N([[0, 220, 40], [1, 344, 130], [2, 296, 275], [3, 144, 275], [4, 96, 130]]),
  edges: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]].map(([u, v]) => ({ u, v }))
};
const BIP = {
  V: 6,
  directed: false,
  weighted: false,
  nodes: N([[0, 80, 60], [1, 80, 170], [2, 80, 280], [3, 380, 60], [4, 380, 170], [5, 380, 280]]),
  edges: [[0, 3], [0, 4], [1, 3], [1, 5], [2, 4], [2, 5]].map(([u, v]) => ({ u, v }))
};

const typesCode = (() => {
  const text = {
    t1: ['ADD-EDGE(u, v, w, directed)', 'ADD-EDGE(u, v, w, directed)'],
    t2: ['    adj[u].add( (v, w) )                ← road from u to v', '    adj[u].add( (v, w) )                ← u থেকে v-তে রাস্তা'],
    t3: ['    if not directed:', '    directed না হলে:'],
    t4: ['        adj[v].add( (u, w) )            ← and back again', '        adj[v].add( (u, w) )            ← আর ফিরতি পথও'],
    t5: ['MAX-EDGES(V) = V × (V − 1) / 2        ← simple undirected graph', 'MAX-EDGES(V) = V × (V − 1) / 2        ← সিম্পল আনডিরেক্টেড গ্রাফ'],
    c1: ['One function handles every type: weight w, and a directed flag', 'একটা ফাংশনেই সব ধরন: ওজন w, আর একটা directed ফ্ল্যাগ'],
    c2: ['Every pair of distinct vertices can have at most one edge', 'আলাদা দুটো ভার্টেক্সের মধ্যে বড়জোর একটা এজ']
  };
  const src = {
    pseudo: '{{t1}}  @header\n{{t2}}  @fwd\n{{t3}}  @back\n{{t4}}  @back\n\n{{t5}}  @max',
    js: `// {{c1}}  @header
function addEdge(adj, u, v, w = 1, directed = false) {  @header
    adj[u].push([v, w]);  @fwd
    if (!directed) {  @back
        adj[v].push([u, w]);  @back
    }
}

// {{c2}}  @max
function maxEdges(V) {  @max
    return V * (V - 1) / 2;  @max
}

const adj = Array.from({ length: 5 }, () => []);
addEdge(adj, 0, 1, 5);                 // undirected, weight 5  @fwd
addEdge(adj, 0, 2, 3, true);           // one-way 0 → 2  @back
console.log(maxEdges(5));              // 10  @max`,
    java: `import java.util.*;

public class Main {

    // {{c1}}  @header
    static void addEdge(List<List<int[]>> adj, int u, int v, int w, boolean directed) {  @header
        adj.get(u).add(new int[]{v, w});  @fwd
        if (!directed) {  @back
            adj.get(v).add(new int[]{u, w});  @back
        }
    }

    // {{c2}}  @max
    static int maxEdges(int V) {  @max
        return V * (V - 1) / 2;  @max
    }

    public static void main(String[] args) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < 5; i++) adj.add(new ArrayList<>());
        addEdge(adj, 0, 1, 5, false);      // undirected, weight 5  @fwd
        addEdge(adj, 0, 2, 3, true);       // one-way 0 → 2  @back
        System.out.println(maxEdges(5));   // 10  @max
    }
}`,
    python: `# {{c1}}  @header
def add_edge(adj, u, v, w=1, directed=False):  @header
    adj[u].append((v, w))  @fwd
    if not directed:  @back
        adj[v].append((u, w))  @back


# {{c2}}  @max
def max_edges(V):  @max
    return V * (V - 1) // 2  @max


adj = [[] for _ in range(5)]
add_edge(adj, 0, 1, 5)                 # undirected, weight 5  @fwd
add_edge(adj, 0, 2, 3, directed=True)  # one-way 0 → 2  @back
print(max_edges(5))                    # 10  @max`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;

// {{c1}}  @header
void addEdge(vector<vector<pair<int, int>>>& adj, int u, int v, int w = 1, bool directed = false) {  @header
    adj[u].push_back({v, w});  @fwd
    if (!directed) {  @back
        adj[v].push_back({u, w});  @back
    }
}

// {{c2}}  @max
int maxEdges(int V) {  @max
    return V * (V - 1) / 2;  @max
}

int main() {
    vector<vector<pair<int, int>>> adj(5);
    addEdge(adj, 0, 1, 5);              // undirected, weight 5  @fwd
    addEdge(adj, 0, 2, 3, true);        // one-way 0 → 2  @back
    cout << maxEdges(5) << endl;        // 10  @max
    return 0;
}`
  };
  return program(src, text);
})();

const inOut = (() => {
  const inD = Array(5).fill(0);
  const outD = Array(5).fill(0);
  for (const e of D_INTRO.edges) { outD[e.u]++; inD[e.v]++; }
  return { inD, outD };
})();

const graphTypes = {
  id: 'graph-types',
  name: { en: 'Types of Graphs', bn: 'গ্রাফের ধরন' },
  description: { en: 'Directed, weighted, simple, complete and bipartite graphs', bn: 'ডিরেক্টেড, ওয়েটেড, সিম্পল, কমপ্লিট আর বাইপার্টাইট গ্রাফ' },
  categoryKey: 'graphs',
  subgroupKey: 'g-basics',
  level: 'beginner',
  order: 30,
  icon: '🧩',
  complexity: { time: 'O(1)', space: 'O(V + E)', note: { en: 'Adding one edge is O(1). An undirected edge is stored twice (once from each end).', bn: 'একটা এজ যোগ করা O(1)। আনডিরেক্টেড এজ দুবার রাখা হয় (প্রতিটা মাথা থেকে একবার)।' } },
  code: typesCode.code,
  lineMap: typesCode.lineMap,
  steps: [
    step(
      T('Undirected: two-way roads', 'আনডিরেক্টেড: দুই-মুখী রাস্তা'),
      T(
        'In an **undirected** graph every edge works **both ways**. If 0 is connected to 1, then 1 is connected to 0 — like a two-way road, or a friendship on Facebook.\n\nIn code, `addEdge` stores the edge **twice**: once in `adj[u]` and once in `adj[v]`.',
        '**আনডিরেক্টেড (undirected)** গ্রাফে প্রতিটা এজ **দুই দিকেই** চলে। 0 যদি 1-এর সঙ্গে যুক্ত থাকে, তাহলে 1-ও 0-এর সঙ্গে যুক্ত — দুই-মুখী রাস্তার মতো, বা ফেসবুকের বন্ধুত্বের মতো।\n\nকোডে `addEdge` এজটা **দুবার** রাখে: একবার `adj[u]`-তে, একবার `adj[v]`-তে।'
      ),
      scene(G_INTRO, { edgeState: { '0-1': 'compare' }, nodeState: { 0: 'current', 1: 'current' }, status: T('0 – 1 means 0 → 1 and 1 → 0', '0 – 1 মানে 0 → 1 আর 1 → 0') }),
      ['fwd', 'back']
    ),
    step(
      T('Directed: one-way streets', 'ডিরেক্টেড: একমুখী রাস্তা'),
      T(
        'In a **directed** graph (a **digraph**) each edge has an **arrow**: **u → v** lets you go from u to v, **not** back. Think one-way streets, or following someone on Instagram (they may not follow you back).\n\nIn code: `directed = true`, so `addEdge` stores only `adj[u]` and skips the "back" line.',
        '**ডিরেক্টেড (directed)** গ্রাফে (**ডাইগ্রাফ**) প্রতিটা এজে একটা **তীর** থাকে: **u → v** দিয়ে u থেকে v-তে যাওয়া যায়, **ফেরা যায় না**। একমুখী রাস্তা ভাবো, বা ইনস্টাগ্রামে কাউকে ফলো করা (সে তোমাকে ফলো নাও করতে পারে)।\n\nকোডে: `directed = true`, তাই `addEdge` শুধু `adj[u]`-তে রাখে আর "ফিরতি" লাইনটা বাদ দেয়।'
      ),
      scene(D_INTRO, { edgeState: allEdges(D_INTRO, 'compare'), status: T('arrows show the only allowed direction', 'তীর দেখায় একমাত্র অনুমোদিত দিক') }),
      'fwd'
    ),
    step(
      T('In-degree and out-degree', 'ইন-ডিগ্রি আর আউট-ডিগ্রি'),
      T(
        `With arrows, "degree" splits in two:\n\n- **in-degree** = arrows coming **in**\n- **out-degree** = arrows going **out**\n\nVertex 1 has in ${inOut.inD[1]}, out ${inOut.outD[1]}. Vertex 3 has out-degree 0 — a dead end, you can arrive but never leave. The sum of all in-degrees = sum of all out-degrees = |E| = ${D_INTRO.edges.length}.`,
        `তীর থাকলে "ডিগ্রি" দুই ভাগে ভাগ হয়:\n\n- **ইন-ডিগ্রি (in-degree)** = **ভেতরে** আসা তীর\n- **আউট-ডিগ্রি (out-degree)** = **বাইরে** যাওয়া তীর\n\nভার্টেক্স 1-এর in ${inOut.inD[1]}, out ${inOut.outD[1]}। ভার্টেক্স 3-এর আউট-ডিগ্রি 0 — একটা কানাগলি, ঢোকা যায় কিন্তু বের হওয়া যায় না। সব ইন-ডিগ্রির যোগফল = সব আউট-ডিগ্রির যোগফল = |E| = ${D_INTRO.edges.length}।`
      ),
      scene(D_INTRO, { nodeState: { 1: 'current', 3: 'reject' }, subs: Object.fromEntries(inOut.inD.map((d, v) => [v, `in ${d} · out ${inOut.outD[v]}`])), status: T('in-degree / out-degree under each vertex', 'প্রতিটা ভার্টেক্সের নিচে ইন / আউট ডিগ্রি') }),
      'fwd'
    ),
    step(
      T('Weighted: edges with a cost', 'ওয়েটেড: খরচসহ এজ'),
      T(
        'In a **weighted** graph each edge carries a number, its **weight** — distance in km, travel time, ticket price…\n\nNow the "best" route is not the one with the fewest roads but the **cheapest** one: 0 → 1 directly costs **5**, but 0 → 2 → 1 costs 3 + 2 = **5** too, and 0 → 2 → 4 → 3 costs 3 + 4 + 1 = **8** versus 0 → 1 → 3 = **11**.\n\nIn code the weight `w` is stored next to the neighbour: `(v, w)`.',
        '**ওয়েটেড (weighted)** গ্রাফে প্রতিটা এজে একটা সংখ্যা থাকে, তার **ওজন** — কিমিতে দূরত্ব, যাত্রার সময়, টিকিটের দাম…\n\nএখন "সেরা" রাস্তা সবচেয়ে কম এজের নয়, সবচেয়ে **সস্তা**টা: 0 → 1 সরাসরি **5**, কিন্তু 0 → 2 → 1-ও 3 + 2 = **5**, আর 0 → 2 → 4 → 3-এ 3 + 4 + 1 = **8**, যেখানে 0 → 1 → 3-এ **11**।\n\nকোডে ওজন `w` প্রতিবেশীর পাশে রাখা হয়: `(v, w)`।'
      ),
      scene(W_INTRO, { nodeState: { 0: 'source', 3: 'done' }, edgeState: { '0-2': 'tree', '2-4': 'tree', '3-4': 'tree' }, edgeFrom: { '0-2': 0, '2-4': 2, '3-4': 4 }, status: T('0 → 2 → 4 → 3 costs 8 (cheaper than 0 → 1 → 3 = 11)', '0 → 2 → 4 → 3 খরচ 8 (0 → 1 → 3 = 11-এর চেয়ে সস্তা)') }),
      'header'
    ),
    step(
      T('Simple graphs: no loops, no double edges', 'সিম্পল গ্রাফ: লুপ নেই, ডাবল এজ নেই'),
      T(
        'This picture breaks two rules:\n\n- a **self-loop** — an edge from 1 back to **1 itself**;\n- **parallel edges** — **two** different edges between 0 and 1.\n\nA graph with neither is a **simple graph**. Almost every graph in this course is simple.',
        'এই ছবিটা দুটো নিয়ম ভাঙে:\n\n- একটা **সেলফ-লুপ (self-loop)** — 1 থেকে **নিজের কাছেই** একটা এজ;\n- **প্যারালাল এজ (parallel edges)** — 0 আর 1-এর মধ্যে **দুটো** আলাদা এজ।\n\nদুটোর কোনোটাই না থাকলে সেটা **সিম্পল গ্রাফ (simple graph)**। এই কোর্সের প্রায় সব গ্রাফ সিম্পল।'
      ),
      scene(MULTI, { nodeState: { 0: 'compare', 1: 'reject' }, edgeState: { '0-1': 'reject', '1-1': 'reject' }, status: T('self-loop at 1, two parallel edges 0–1 → NOT simple', '1-এ সেলফ-লুপ, 0–1-এ দুটো প্যারালাল এজ → সিম্পল নয়') })
    ),
    step(
      T('Complete graph: everyone connected', 'কমপ্লিট গ্রাফ: সবাই যুক্ত'),
      T(
        'In a **complete graph** every pair of distinct vertices has an edge. With 5 vertices it is called **K₅**.\n\nHow many edges? Each of the 5 vertices connects to the other 4, that is 5 × 4 = 20 ends, and each edge has 2 ends: **5 × 4 / 2 = 10** edges.\n\nIn general **K_V has V(V − 1)/2 edges** — the most a simple undirected graph can ever have. `maxEdges(5)` returns 10.',
        '**কমপ্লিট গ্রাফে (complete graph)** প্রতিটা আলাদা জোড়া ভার্টেক্সের মধ্যে একটা এজ থাকে। ৫টা ভার্টেক্স হলে নাম **K₅**।\n\nকয়টা এজ? ৫টা ভার্টেক্সের প্রতিটা বাকি ৪টার সঙ্গে যুক্ত, মানে 5 × 4 = 20টা মাথা, আর প্রতিটা এজের ২টা মাথা: **5 × 4 / 2 = 10**টা এজ।\n\nসাধারণভাবে **K_V-এ V(V − 1)/2টা এজ** — একটা সিম্পল আনডিরেক্টেড গ্রাফে সর্বোচ্চ এটুকুই হতে পারে। `maxEdges(5)` ফেরত দেয় 10।'
      ),
      scene(K5, { edgeState: allEdges(K5, 'tree'), status: T('K₅: 5 × 4 / 2 = 10 edges', 'K₅: 5 × 4 / 2 = 10টা এজ') }),
      'max'
    ),
    step(
      T('Bipartite: two teams', 'বাইপার্টাইট: দুটো দল'),
      T(
        'A graph is **bipartite** if its vertices split into **two groups** so that **every edge goes across**, never inside a group.\n\nExample: students {0, 1, 2} (blue) and courses {3, 4, 5} (orange); an edge means "student takes course". A student never "takes" another student.\n\nA fact worth remembering: a graph is bipartite **exactly when it has no odd-length cycle**.',
        'যদি ভার্টেক্সগুলো **দুটো দলে** ভাগ করা যায় যাতে **প্রতিটা এজ দুই দলের মাঝে যায়**, কোনো দলের ভেতরে নয় — গ্রাফটা **বাইপার্টাইট (bipartite)**।\n\nউদাহরণ: ছাত্র {0, 1, 2} (নীল) আর কোর্স {3, 4, 5} (কমলা); এজ মানে "ছাত্রটা কোর্সটা নিয়েছে"। এক ছাত্র কখনো আরেক ছাত্রকে "নেয়" না।\n\nমনে রাখার মতো তথ্য: গ্রাফ বাইপার্টাইট **ঠিক তখনই, যখন এতে কোনো বিজোড় দৈর্ঘ্যের সাইকেল নেই**।'
      ),
      scene(BIP, { nodeState: { 0: 'setA', 1: 'setA', 2: 'setA', 3: 'setB', 4: 'setB', 5: 'setB' }, label: T('students (left) · courses (right)', 'ছাত্র (বামে) · কোর্স (ডানে)'), status: T('every edge goes from blue to orange', 'প্রতিটা এজ নীল থেকে কমলায় যায়') })
    ),
    step(
      T('DAG: arrows and no cycles', 'DAG: তীর আছে, সাইকেল নেই'),
      T(
        'A **DAG** (**D**irected **A**cyclic **G**raph) has arrows and **no cycle** — you can never follow arrows and come back to where you started.\n\nDAGs describe **"do this before that"**: course prerequisites, cooking steps, build steps. They are what **topological sort** (the last part of this chapter) puts in order.',
        '**DAG** (**D**irected **A**cyclic **G**raph)-এ তীর আছে আর **কোনো সাইকেল নেই** — তীর ধরে চললে কখনো শুরুর জায়গায় ফেরা যায় না।\n\nDAG বোঝায় **"এটার আগে ওটা করো"**: কোর্সের পূর্বশর্ত, রান্নার ধাপ, বিল্ডের ধাপ। এই অধ্যায়ের শেষ অংশ **টপোলজিক্যাল সর্ট** এগুলোকেই সাজায়।'
      ),
      scene(G_DAG, { edgeState: allEdges(G_DAG, 'compare'), status: T('follow any arrows: you never return', 'যেকোনো তীর ধরো: কখনো ফিরে আসবে না') }),
      'fwd'
    ),
    step(
      T('What we learned', 'কী শিখলাম'),
      T(
        '- **Undirected** (two-way) vs **directed** (one-way arrows, with in/out-degree).\n- **Weighted**: every edge has a cost.\n- **Simple**: no self-loops, no parallel edges.\n- **Complete K_V**: all V(V − 1)/2 edges present.\n- **Bipartite**: two groups, edges only across; no odd cycle.\n- **DAG**: directed with no cycle.\n\nOne `addEdge(u, v, w, directed)` function builds all of them.',
        '- **আনডিরেক্টেড** (দুই-মুখী) বনাম **ডিরেক্টেড** (একমুখী তীর, ইন/আউট-ডিগ্রিসহ)।\n- **ওয়েটেড**: প্রতিটা এজের একটা খরচ।\n- **সিম্পল**: সেলফ-লুপ নেই, প্যারালাল এজ নেই।\n- **কমপ্লিট K_V**: সব V(V − 1)/2টা এজ আছে।\n- **বাইপার্টাইট**: দুটো দল, এজ শুধু মাঝে; বিজোড় সাইকেল নেই।\n- **DAG**: ডিরেক্টেড আর সাইকেল নেই।\n\nএকটাই `addEdge(u, v, w, directed)` ফাংশন এদের সবাইকে বানায়।'
      ),
      scene(W_INTRO, { status: T('one addEdge for every type', 'সব ধরনের জন্য একটাই addEdge') }),
      'header'
    )
  ]
};

/* ===================================================================== 4. Adjacency matrix */

const matrixCode = (() => {
  const text = {
    m1: ['M = V × V table filled with 0', 'M = V × V টেবিল, সব 0'],
    m2: ['for each edge (u, v):', 'প্রতিটা এজ (u, v)-এর জন্য:'],
    m3: ['    M[u][v] = 1', '    M[u][v] = 1'],
    m4: ['    M[v][u] = 1          ← undirected: mirror it', '    M[v][u] = 1          ← আনডিরেক্টেড: আয়নার মতো উল্টো ঘরেও'],
    m5: ['hasEdge(u, v): return M[u][v] == 1          ← one look: O(1)', 'hasEdge(u, v): M[u][v] == 1 ফেরত দাও          ← এক নজরে: O(1)'],
    m6: ['neighbours(u): every j where M[u][j] == 1   ← scan a row: O(V)', 'neighbours(u): যেসব j-তে M[u][j] == 1   ← পুরো সারি: O(V)'],
    c1: ['A V × V grid of zeros', 'শূন্যে ভরা V × V গ্রিড'],
    c2: ['Is there an edge u–v? Just look at one cell', 'u–v এজ আছে? শুধু একটা ঘর দেখো'],
    c3: ['All neighbours of u: walk along row u', 'u-এর সব প্রতিবেশী: সারি u ধরে হাঁটো']
  };
  const g = G_INTRO;
  const src = {
    pseudo: '{{m1}}  @init\n{{m2}}  @loop\n{{m3}}  @set\n{{m4}}  @mirror\n{{m5}}  @has\n{{m6}}  @row',
    js: wrap('js', ['const V = 5;  @init', ...edgesDecl(g, 'js', 'init'), '// {{c1}}  @init', 'const M = Array.from({ length: V }, () => new Array(V).fill(0));  @init', '', 'for (const [u, v] of edges) {  @loop', '    M[u][v] = 1;  @set', '    M[v][u] = 1;  @mirror', '}', '', '// {{c2}}  @has', 'console.log(M[1][3] === 1);  @has', '', '// {{c3}}  @row', 'for (let j = 0; j < V; j++)  @row', '    if (M[2][j] === 1) console.log(j);  @row']),
    python: wrap('python', ['V = 5  @init', ...edgesDecl(g, 'python', 'init'), '# {{c1}}  @init', 'M = [[0] * V for _ in range(V)]  @init', '', 'for u, v in edges:  @loop', '    M[u][v] = 1  @set', '    M[v][u] = 1  @mirror', '', '# {{c2}}  @has', 'print(M[1][3] == 1)  @has', '', '# {{c3}}  @row', 'for j in range(V):  @row', '    if M[2][j] == 1: print(j)  @row']),
    java: wrap('java', ['int V = 5;  @init', ...edgesDecl(g, 'java', 'init'), '// {{c1}}  @init', 'int[][] M = new int[V][V];  @init', '', 'for (int[] e : edges) {  @loop', '    M[e[0]][e[1]] = 1;  @set', '    M[e[1]][e[0]] = 1;  @mirror', '}', '', '// {{c2}}  @has', 'System.out.println(M[1][3] == 1);  @has', '', '// {{c3}}  @row', 'for (int j = 0; j < V; j++)  @row', '    if (M[2][j] == 1) System.out.println(j);  @row']),
    cpp: wrap('cpp', ['int V = 5;  @init', ...edgesDecl(g, 'cpp', 'init'), '// {{c1}}  @init', 'vector<vector<int>> M(V, vector<int>(V, 0));  @init', '', 'for (auto& e : edges) {  @loop', '    M[e[0]][e[1]] = 1;  @set', '    M[e[1]][e[0]] = 1;  @mirror', '}', '', '// {{c2}}  @has', 'cout << (M[1][3] == 1) << endl;  @has', '', '// {{c3}}  @row', 'for (int j = 0; j < V; j++)  @row', '    if (M[2][j] == 1) cout << j << endl;  @row'])
  };
  return program(src, text);
})();

const matrixSteps = (() => {
  const g = G_INTRO;
  const V = g.V;
  const M = Array.from({ length: V }, () => Array(V).fill(0));
  const idx = [0, 1, 2, 3, 4];
  const mp = (hl = {}, extra = {}) => ({ type: 'matrix', label: T('M[u][v] — 1 = edge, 0 = no edge', 'M[u][v] — 1 = এজ আছে, 0 = নেই'), rows: idx, cols: idx, corner: 'u \\ v', cells: M.map((r) => [...r]), hl, ...extra });
  const steps = [];
  steps.push(step(
    T('Idea: a V × V table', 'ধারণা: একটা V × V টেবিল'),
    T(
      'Computers do not see pictures, so we must **store** the graph somehow. The simplest way is a table called the **adjacency matrix**.\n\nMake a grid with one **row** and one **column** per vertex: 5 × 5 = 25 cells. Cell `M[u][v]` answers one question: **is there an edge between u and v?** Start with every cell **0** (no edges yet).',
      'কম্পিউটার ছবি দেখে না, তাই গ্রাফটা কোনোভাবে **রাখতে** হয়। সবচেয়ে সহজ উপায় একটা টেবিল, যার নাম **অ্যাডজাসেন্সি ম্যাট্রিক্স (adjacency matrix)**।\n\nপ্রতিটা ভার্টেক্সের জন্য একটা **সারি** আর একটা **কলাম** নিয়ে গ্রিড বানাও: 5 × 5 = 25টা ঘর। ঘর `M[u][v]` একটাই প্রশ্নের উত্তর দেয়: **u আর v-এর মধ্যে কি এজ আছে?** শুরুতে সব ঘর **0** (এখনো কোনো এজ নেই)।'
    ),
    scene(g, { edgeState: allEdges(g, 'dim'), panels: [mp()], status: T('5 × 5 = 25 cells, all 0', '5 × 5 = 25টা ঘর, সব 0') }),
    'init'
  ));
  g.edges.forEach((e, i) => {
    M[e.u][e.v] = 1;
    M[e.v][e.u] = 1;
    const doneE = Object.fromEntries(g.edges.slice(0, i).map((x) => [ek(x.u, x.v), 'tree']));
    const rest = Object.fromEntries(g.edges.slice(i + 1).map((x) => [ek(x.u, x.v), 'dim']));
    steps.push(step(
      T(`Edge ${e.u}–${e.v}: two cells become 1`, `এজ ${e.u}–${e.v}: দুটো ঘর 1 হয়`),
      T(
        `Edge **(${e.u}, ${e.v})**: set \`M[${e.u}][${e.v}] = 1\` (row ${e.u}, column ${e.v}).\n\nThe road is two-way, so also set \`M[${e.v}][${e.u}] = 1\` — the **mirror** cell.${i === 0 ? ' Every undirected edge fills **two** cells.' : ''}`,
        `এজ **(${e.u}, ${e.v})**: \`M[${e.u}][${e.v}] = 1\` করো (সারি ${e.u}, কলাম ${e.v})।\n\nরাস্তা দুই-মুখী, তাই \`M[${e.v}][${e.u}] = 1\`-ও করো — **আয়নার** ঘর।${i === 0 ? ' প্রতিটা আনডিরেক্টেড এজ **দুটো** ঘর ভরে।' : ''}`
      ),
      scene(g, { nodeState: { [e.u]: 'current', [e.v]: 'current' }, edgeState: { ...doneE, ...rest, [ek(e.u, e.v)]: 'relax' }, edgeFrom: { [ek(e.u, e.v)]: e.u }, panels: [mp({ [`${e.u},${e.v}`]: 'relax', [`${e.v},${e.u}`]: 'relax' })], status: T(`M[${e.u}][${e.v}] = M[${e.v}][${e.u}] = 1`, `M[${e.u}][${e.v}] = M[${e.v}][${e.u}] = 1`) }),
      ['loop', 'set', 'mirror'],
      { u: e.u, v: e.v }
    ));
  });
  steps.push(step(
    T('The matrix is symmetric', 'ম্যাট্রিক্সটা সিমেট্রিক'),
    T(
      'All 6 edges are in. Two things to notice:\n\n- The **diagonal** (`M[0][0]`, `M[1][1]` …) is all 0 — no vertex has an edge to itself.\n- The table is a **mirror image** across that diagonal: `M[u][v] = M[v][u]`. That is true for every **undirected** graph. A directed graph would only fill `M[u][v]`.',
      '৬টা এজই বসানো শেষ। দুটো জিনিস খেয়াল করো:\n\n- **কোণাকুণি** ঘরগুলো (`M[0][0]`, `M[1][1]` …) সব 0 — কোনো ভার্টেক্সের নিজের সঙ্গে এজ নেই।\n- টেবিলটা ওই কোণাকুণির দুই পাশে **আয়নার প্রতিবিম্ব**: `M[u][v] = M[v][u]`। প্রতিটা **আনডিরেক্টেড** গ্রাফে এটা সত্য। ডিরেক্টেড গ্রাফ শুধু `M[u][v]` ভরত।'
    ),
    scene(g, { edgeState: allEdges(g, 'tree'), panels: [mp(Object.fromEntries(idx.map((i) => [`${i},${i}`, 'source'])))], status: T('purple diagonal = 0, the rest mirrors across it', 'বেগুনি কোণাকুণি = 0, বাকিটা দুই পাশে আয়নার মতো') }),
    'mirror'
  ));
  steps.push(step(
    T('Is there an edge 1–3? One look', '1–3 এজ আছে? এক নজরে'),
    T(
      'To test an edge, read **one cell**: `M[1][3]` is **1**, so yes, 1 and 3 are connected. `M[0][4]` is 0, so 0 and 4 are not.\n\nThis takes **O(1)** time — the same speed no matter how big the graph is. That is the matrix\'s superpower.',
      'এজ আছে কিনা দেখতে **একটা ঘর** পড়ো: `M[1][3]` **1**, তাই হ্যাঁ, 1 আর 3 যুক্ত। `M[0][4]` 0, তাই 0 আর 4 যুক্ত নয়।\n\nএতে **O(1)** সময় লাগে — গ্রাফ যত বড়ই হোক, একই গতি। এটাই ম্যাট্রিক্সের বিশেষ ক্ষমতা।'
    ),
    scene(g, { nodeState: { 1: 'current', 3: 'current' }, edgeState: { '1-3': 'relax' }, panels: [mp({ '1,3': 'relax', '0,4': 'reject' })], status: T('M[1][3] = 1 → yes;  M[0][4] = 0 → no', 'M[1][3] = 1 → হ্যাঁ;  M[0][4] = 0 → না') }),
    'has'
  ));
  steps.push(step(
    T('Neighbours of 2: scan the whole row', '2-এর প্রতিবেশী: পুরো সারি দেখো'),
    T(
      'To list the neighbours of 2, walk along **row 2** and collect every column that holds a 1: **0, 1, 4**.\n\nWe must check **all V cells** of the row, even the zeros, so this costs **O(V)**. For a vertex with only a few neighbours in a huge graph, that is a lot of wasted looking.',
      '2-এর প্রতিবেশী বের করতে **সারি 2** ধরে হাঁটো আর যেসব কলামে 1 আছে সেগুলো নাও: **0, 1, 4**।\n\nসারির **সব V-টা ঘর** দেখতে হয়, শূন্যগুলোও, তাই খরচ **O(V)**। বিশাল গ্রাফে অল্প প্রতিবেশীওয়ালা ভার্টেক্সের জন্য এটা অনেক অপচয়।'
    ),
    scene(g, { nodeState: { 2: 'current', 0: 'compare', 1: 'compare', 4: 'compare' }, edgeState: { '0-2': 'compare', '1-2': 'compare', '2-4': 'compare' }, edgeFrom: { '0-2': 2, '1-2': 2, '2-4': 2 }, panels: [mp({ '2,0': 'relax', '2,1': 'relax', '2,4': 'relax', '2,2': 'compare', '2,3': 'compare' }, { rowHl: 2 })], status: T('row 2 → neighbours 0, 1, 4 (checked all 5 cells)', 'সারি 2 → প্রতিবেশী 0, 1, 4 (৫টা ঘরই দেখা হলো)') }),
    'row'
  ));
  const WM = [['0', '4', '3', '∞', '∞', '∞'], ['4', '0', '1', '2', '∞', '∞'], ['3', '1', '0', '4', '∞', '∞'], ['∞', '2', '4', '0', '2', '∞'], ['∞', '∞', '∞', '2', '0', '6'], ['∞', '∞', '∞', '∞', '6', '0']];
  steps.push(step(
    T('Weighted graphs: store the weight', 'ওয়েটেড গ্রাফ: ওজন রাখো'),
    T(
      'For a weighted graph, put the **weight** in the cell instead of 1, and **∞** (or a special value) where there is no edge.\n\nThis is exactly the table that **Floyd-Warshall** starts from later in this chapter.',
      'ওয়েটেড গ্রাফে ঘরে 1-এর বদলে **ওজন** রাখো, আর এজ না থাকলে **∞** (বা বিশেষ কোনো মান)।\n\nএই অধ্যায়ের পরে **ফ্লয়েড-ওয়ার্শাল** ঠিক এই টেবিল থেকেই শুরু করে।'
    ),
    scene(G_W, { panels: [{ type: 'matrix', label: T('M[u][v] = weight, ∞ = no edge', 'M[u][v] = ওজন, ∞ = এজ নেই'), rows: [0, 1, 2, 3, 4, 5], cols: [0, 1, 2, 3, 4, 5], corner: 'u \\ v', cells: WM, hl: { '0,1': 'relax', '1,0': 'relax' } }], status: T('M[0][1] = 4 = weight of edge 0–1', 'M[0][1] = 4 = এজ 0–1-এর ওজন') }),
    'set'
  ));
  steps.push(step(
    T('What we learned', 'কী শিখলাম'),
    T(
      '- **Adjacency matrix** = V × V table; `M[u][v]` says whether u–v is an edge.\n- **Edge test: O(1)** — just one cell.\n- **Neighbours of u: O(V)** — scan the whole row.\n- **Memory: O(V²)** — always, even if there are few edges. Our 5 vertices use 25 cells for only 6 edges (most cells are 0).\n\nBest for **dense** graphs, where most pairs are connected anyway.',
      '- **অ্যাডজাসেন্সি ম্যাট্রিক্স** = V × V টেবিল; `M[u][v]` বলে u–v এজ কিনা।\n- **এজ যাচাই: O(1)** — শুধু একটা ঘর।\n- **u-এর প্রতিবেশী: O(V)** — পুরো সারি দেখতে হয়।\n- **মেমরি: O(V²)** — সবসময়, এজ কম হলেও। আমাদের ৫টা ভার্টেক্সে মাত্র ৬টা এজের জন্য ২৫টা ঘর (বেশিরভাগই 0)।\n\n**ঘন (dense)** গ্রাফে সবচেয়ে ভালো, যেখানে বেশিরভাগ জোড়াই যুক্ত।'
    ),
    scene(g, { edgeState: allEdges(g, 'tree'), panels: [mp()], status: T('25 cells for 6 edges', '৬টা এজের জন্য ২৫টা ঘর') }),
    'init'
  ));
  return steps;
})();

const adjMatrix = {
  id: 'graph-adj-matrix',
  name: { en: 'Adjacency Matrix', bn: 'অ্যাডজাসেন্সি ম্যাট্রিক্স' },
  description: { en: 'Store a graph as a V × V table of 0s and 1s', bn: 'গ্রাফকে 0 আর 1-এর V × V টেবিল হিসেবে রাখা' },
  categoryKey: 'graphs',
  subgroupKey: 'g-store',
  level: 'beginner',
  order: 10,
  icon: '🔢',
  complexity: { time: 'O(1) edge test', worst: 'O(V) neighbours', space: 'O(V²)', note: { en: 'Instant edge lookups, but the table always needs V² cells, even for a graph with very few edges.', bn: 'এজ খোঁজা তাৎক্ষণিক, কিন্তু টেবিলে সবসময় V²টা ঘর লাগে, এজ খুব কম হলেও।' } },
  code: matrixCode.code,
  lineMap: matrixCode.lineMap,
  steps: matrixSteps
};

/* ===================================================================== 5. Adjacency list */

const listCode = (() => {
  const text = {
    l1: ['adj = V empty lists', 'adj = V-টা খালি তালিকা'],
    l2: ['for each edge (u, v):', 'প্রতিটা এজ (u, v)-এর জন্য:'],
    l3: ['    add v to adj[u]', '    adj[u]-তে v যোগ করো'],
    l4: ['    add u to adj[v]          ← undirected: both ends', '    adj[v]-তে u যোগ করো          ← আনডিরেক্টেড: দুই মাথাতেই'],
    l5: ['neighbours(u): just read adj[u]               ← O(deg(u))', 'neighbours(u): শুধু adj[u] পড়ো               ← O(deg(u))'],
    l6: ['hasEdge(u, v): search for v inside adj[u]     ← O(deg(u))', 'hasEdge(u, v): adj[u]-এর ভেতরে v খোঁজো     ← O(deg(u))'],
    c1: ['One list per vertex, all empty at first', 'প্রতি ভার্টেক্সে একটা তালিকা, শুরুতে সব খালি'],
    c2: ['Neighbours are stored directly — no zeros to skip', 'প্রতিবেশী সরাসরি রাখা — বাদ দেওয়ার মতো কোনো শূন্য নেই']
  };
  const g = G_INTRO;
  const src = {
    pseudo: '{{l1}}  @init\n{{l2}}  @loop\n{{l3}}  @add\n{{l4}}  @addBack\n{{l5}}  @nbrs\n{{l6}}  @has',
    js: wrap('js', ['const V = 5;  @init', ...edgesDecl(g, 'js', 'init'), '// {{c1}}  @init', 'const adj = Array.from({ length: V }, () => []);  @init', '', 'for (const [u, v] of edges) {  @loop', '    adj[u].push(v);  @add', '    adj[v].push(u);  @addBack', '}', '', '// {{c2}}  @nbrs', 'console.log(adj[1]);  @nbrs', 'console.log(adj[1].includes(3));  @has']),
    python: wrap('python', ['V = 5  @init', ...edgesDecl(g, 'python', 'init'), '# {{c1}}  @init', 'adj = [[] for _ in range(V)]  @init', '', 'for u, v in edges:  @loop', '    adj[u].append(v)  @add', '    adj[v].append(u)  @addBack', '', '# {{c2}}  @nbrs', 'print(adj[1])  @nbrs', 'print(3 in adj[1])  @has']),
    java: wrap('java', ['int V = 5;  @init', ...edgesDecl(g, 'java', 'init'), '// {{c1}}  @init', 'List<List<Integer>> adj = new ArrayList<>();  @init', 'for (int i = 0; i < V; i++) adj.add(new ArrayList<>());  @init', '', 'for (int[] e : edges) {  @loop', '    adj.get(e[0]).add(e[1]);  @add', '    adj.get(e[1]).add(e[0]);  @addBack', '}', '', '// {{c2}}  @nbrs', 'System.out.println(adj.get(1));  @nbrs', 'System.out.println(adj.get(1).contains(3));  @has']),
    cpp: wrap('cpp', ['int V = 5;  @init', ...edgesDecl(g, 'cpp', 'init'), '// {{c1}}  @init', 'vector<vector<int>> adj(V);  @init', '', 'for (auto& e : edges) {  @loop', '    adj[e[0]].push_back(e[1]);  @add', '    adj[e[1]].push_back(e[0]);  @addBack', '}', '', '// {{c2}}  @nbrs', 'for (int v : adj[1]) cout << v << " ";  @nbrs', 'cout << (find(adj[1].begin(), adj[1].end(), 3) != adj[1].end()) << endl;  @has'], { imports: '#include <algorithm>' })
  };
  return program(src, text);
})();

const listSteps = (() => {
  const g = G_INTRO;
  const V = g.V;
  const finalAdj = adjOf(g).map((items) => items.map((x) => x.v));
  let adj = Array.from({ length: V }, () => []);
  // adjacency-list panel: one row per vertex; `fresh` marks entries that were just added
  const lp = ({ rows = adj, fresh = [], rowHl = null, itemHl = {}, label } = {}) => ({
    type: 'adjlist',
    label: label || T('adj — row u lists the neighbours of u', 'adj — সারি u-তে u-এর প্রতিবেশীরা'),
    rows: rows.map((items, u) => ({
      head: u,
      state: rowHl === u ? 'current' : '',
      items: items.map((v, k) => ({ v, state: fresh.some(([a, b]) => a === u && b === k) ? 'relax' : itemHl[`${u},${k}`] || '' }))
    }))
  });
  const codeText = `adj = [ ${finalAdj.map((r) => `[${r.join(', ')}]`).join(', ')} ]`;
  const steps = [];

  steps.push(step(
    T('The idea: a contact list for every vertex', 'ধারণা: প্রতিটা ভার্টেক্সের একটা কন্টাক্ট লিস্ট'),
    T(
      'Think of the **contacts on your phone**: you do not store everyone in the world, only the people **you know**.\n\nAn **adjacency list** gives every vertex its own short list of **its neighbours** (the vertices it is joined to by an edge). That is all it is.\n\nRead the highlighted row: **`1 → 0 → 2 → 3`** means "**from 1 you can go straight to 0, 2 and 3**". Compare with the picture — 1 has exactly those three lines.',
      'তোমার **ফোনের কন্টাক্ট লিস্ট** ভাবো: পৃথিবীর সবাইকে রাখো না, শুধু **যাদের চেনো** তাদের।\n\n**অ্যাডজাসেন্সি লিস্ট (adjacency list)** প্রতিটা ভার্টেক্সকে **তার প্রতিবেশীদের** (যাদের সঙ্গে একটা এজ দিয়ে যুক্ত) একটা ছোট নিজস্ব তালিকা দেয়। ব্যস, এটুকুই।\n\nহাইলাইট করা সারিটা পড়ো: **`1 → 0 → 2 → 3`** মানে "**1 থেকে সরাসরি 0, 2 আর 3-এ যাওয়া যায়**"। ছবির সঙ্গে মেলাও — 1-এর ঠিক ওই তিনটা রেখাই আছে।'
    ),
    scene(g, { nodeState: { 1: 'current', 0: 'compare', 2: 'compare', 3: 'compare' }, edgeState: { '0-1': 'compare', '1-2': 'compare', '1-3': 'compare' }, edgeFrom: { '0-1': 1, '1-2': 1, '1-3': 1 }, panels: [lp({ rows: finalAdj, rowHl: 1 })], status: T('row 1: 1 → 0 → 2 → 3', 'সারি 1: 1 → 0 → 2 → 3') }),
    'nbrs'
  ));
  steps.push(step(
    T('What it looks like in code', 'কোডে দেখতে কেমন'),
    T(
      `In code it is simply a **list of lists**:\n\n\`${codeText}\`\n\n- \`adj\` has one slot per vertex: **slot number = vertex number**.\n- \`adj[1]\` is the list for vertex 1 → \`[0, 2, 3]\`.\n- \`adj[1][0]\` is the **first** neighbour of 1 → \`0\`.\n\nSo "who are the neighbours of u?" is just: **read \`adj[u]\`**.`,
      `কোডে এটা শুধু **তালিকার একটা তালিকা (list of lists)**:\n\n\`${codeText}\`\n\n- \`adj\`-এ প্রতিটা ভার্টেক্সের জন্য একটা ঘর: **ঘরের নম্বর = ভার্টেক্সের নম্বর**।\n- \`adj[1]\` হলো ভার্টেক্স 1-এর তালিকা → \`[0, 2, 3]\`।\n- \`adj[1][0]\` হলো 1-এর **প্রথম** প্রতিবেশী → \`0\`।\n\nতাই "u-এর প্রতিবেশী কারা?" মানে শুধু: **\`adj[u]\` পড়ো**।`
    ),
    scene(g, { nodeState: { 1: 'current', 0: 'relax' }, edgeState: { '0-1': 'relax' }, edgeFrom: { '0-1': 1 }, panels: [lp({ rows: finalAdj, rowHl: 1, itemHl: { '1,0': 'relax' } }), { type: 'text', label: T('in code', 'কোডে'), text: `\`${codeText}\`` }], status: T('adj[1] = [0, 2, 3]   adj[1][0] = 0', 'adj[1] = [0, 2, 3]   adj[1][0] = 0') }),
    'nbrs'
  ));
  steps.push(step(
    T('Building it: start with empty lists', 'বানানো: খালি তালিকা দিয়ে শুরু'),
    T(
      'Now let us **build** that list from the graph\'s edges, the way the code does.\n\nStart with **one empty list per vertex** — 5 vertices, so 5 empty rows (∅ means "empty"). Then we will read the edges one by one.',
      'এবার গ্রাফের এজ থেকে ওই তালিকাটা **বানাই**, কোড যেভাবে বানায়।\n\nশুরু করো **প্রতিটা ভার্টেক্সের জন্য একটা খালি তালিকা** দিয়ে — ৫টা ভার্টেক্স, তাই ৫টা খালি সারি (∅ মানে "খালি")। তারপর এজগুলো একে একে পড়ব।'
    ),
    scene(g, { edgeState: allEdges(g, 'dim'), panels: [lp()], status: T('5 empty lists', '৫টা খালি তালিকা') }),
    'init'
  ));
  g.edges.forEach((e, i) => {
    adj = adj.map((r) => [...r]);
    adj[e.u].push(e.v);
    adj[e.v].push(e.u);
    const doneE = Object.fromEntries(g.edges.slice(0, i).map((x) => [ek(x.u, x.v), 'tree']));
    const rest = Object.fromEntries(g.edges.slice(i + 1).map((x) => [ek(x.u, x.v), 'dim']));
    steps.push(step(
      T(`Edge ${e.u}–${e.v}: write it in both lists`, `এজ ${e.u}–${e.v}: দুই তালিকাতেই লেখো`),
      T(
        `Edge **${e.u} – ${e.v}** is a two-way road, so **both ends** must know about it:\n- add **${e.v}** to the list of ${e.u} → \`adj[${e.u}] = [${adj[e.u].join(', ')}]\`\n- add **${e.u}** to the list of ${e.v} → \`adj[${e.v}] = [${adj[e.v].join(', ')}]\`${i === 0 ? '\n\nThe green boxes are the ones just added.' : ''}`,
        `এজ **${e.u} – ${e.v}** দুই-মুখী রাস্তা, তাই **দুই মাথাকেই** জানতে হবে:\n- ${e.u}-এর তালিকায় **${e.v}** যোগ → \`adj[${e.u}] = [${adj[e.u].join(', ')}]\`\n- ${e.v}-এর তালিকায় **${e.u}** যোগ → \`adj[${e.v}] = [${adj[e.v].join(', ')}]\`${i === 0 ? '\n\nসবুজ বক্সগুলো এইমাত্র যোগ হলো।' : ''}`
      ),
      scene(g, { nodeState: { [e.u]: 'current', [e.v]: 'current' }, edgeState: { ...doneE, ...rest, [ek(e.u, e.v)]: 'relax' }, edgeFrom: { [ek(e.u, e.v)]: e.u }, panels: [lp({ fresh: [[e.u, adj[e.u].length - 1], [e.v, adj[e.v].length - 1]] })], status: T(`adj[${e.u}].add(${e.v}), adj[${e.v}].add(${e.u})`, `adj[${e.u}].add(${e.v}), adj[${e.v}].add(${e.u})`) }),
      ['loop', 'add', 'addBack'],
      { u: e.u, v: e.v }
    ));
  });
  const entries = adj.reduce((s, r) => s + r.length, 0);
  steps.push(step(
    T('Why is every edge written twice?', 'প্রতিটা এজ দুবার লেখা কেন?'),
    T(
      `Count the boxes in all the lists: **${entries}**. But the graph has only **${g.edges.length}** edges. ${entries} = 2 × ${g.edges.length}.\n\nThat is not a mistake: in an **undirected** graph an edge belongs to **both** of its ends. Edge 1–3 appears as "3" in row 1 **and** as "1" in row 3, so you can start from either side.\n\n> **For directed graphs** (one-way arrows) each edge is written **once**, only in the row it leaves from — see a few steps ahead.`,
      `সব তালিকার বক্স গোনো: **${entries}**টা। কিন্তু গ্রাফে এজ মাত্র **${g.edges.length}**টা। ${entries} = 2 × ${g.edges.length}।\n\nএটা ভুল নয়: **আনডিরেক্টেড** গ্রাফে একটা এজ তার **দুই** মাথারই। এজ 1–3 সারি 1-এ "3" হিসেবে **আর** সারি 3-এ "1" হিসেবে আছে, তাই যেকোনো দিক থেকে শুরু করা যায়।\n\n> **ডিরেক্টেড গ্রাফে** (একমুখী তীর) প্রতিটা এজ **একবারই** লেখা হয়, শুধু যে সারি থেকে বের হয় সেখানে — কয়েক ধাপ পরে দেখো।`
    ),
    scene(g, { nodeState: { 1: 'current', 3: 'current' }, edgeState: { ...allEdges(g, 'tree'), '1-3': 'relax' }, panels: [lp({ itemHl: { '1,2': 'relax', '3,0': 'relax' } })], status: T(`${entries} entries = 2 × ${g.edges.length} edges`, `${entries}টা এন্ট্রি = 2 × ${g.edges.length}টা এজ`) }),
    'addBack'
  ));
  steps.push(step(
    T('Using it: the neighbours of 1', 'ব্যবহার: 1-এর প্রতিবেশী'),
    T(
      'The most common question in graph algorithms (BFS, DFS, Dijkstra…) is "**who are the neighbours of u?**".\n\nWith an adjacency list the answer is already written down: `adj[1] = [0, 2, 3]`. Just read the row.\n\nThis takes **as many steps as 1 has neighbours** (here 3) — written **O(deg(u))**. That is why BFS and DFS use adjacency lists.',
      'গ্রাফ অ্যালগরিদমে (BFS, DFS, Dijkstra…) সবচেয়ে বেশি আসা প্রশ্ন "**u-এর প্রতিবেশী কারা?**"।\n\nঅ্যাডজাসেন্সি লিস্টে উত্তর আগে থেকেই লেখা: `adj[1] = [0, 2, 3]`। শুধু সারিটা পড়ো।\n\nএতে লাগে **1-এর যতজন প্রতিবেশী ততটা ধাপ** (এখানে 3) — লেখা হয় **O(deg(u))**। এজন্যই BFS আর DFS অ্যাডজাসেন্সি লিস্ট ব্যবহার করে।'
    ),
    scene(g, { nodeState: { 1: 'current', 0: 'compare', 2: 'compare', 3: 'compare' }, edgeState: { '0-1': 'compare', '1-2': 'compare', '1-3': 'compare' }, edgeFrom: { '0-1': 1, '1-2': 1, '1-3': 1 }, panels: [lp({ rowHl: 1 })], status: T('adj[1] = [0, 2, 3]', 'adj[1] = [0, 2, 3]') }),
    'nbrs'
  ));
  steps.push(step(
    T('Is there an edge 1–3? Search the row', '1–3 এজ আছে? সারিতে খোঁজো'),
    T(
      'Another question: "**is 1 connected to 3?**" Now we must **search** row 1 for 3: is it 0? no. 2? no. 3? **yes**.\n\nIn the worst case we read the whole row — again **O(deg(u))**. An adjacency **matrix** answers this in one look (O(1)); that is the price we pay for saving memory.',
      'আরেকটা প্রশ্ন: "**1 কি 3-এর সঙ্গে যুক্ত?**" এবার সারি 1-এ 3 **খুঁজতে** হবে: 0? না। 2? না। 3? **হ্যাঁ**।\n\nসবচেয়ে খারাপ ক্ষেত্রে পুরো সারি পড়তে হয় — আবার **O(deg(u))**। অ্যাডজাসেন্সি **ম্যাট্রিক্স** এটা এক নজরে বলে (O(1)); মেমরি বাঁচানোর জন্য এই দামটা দিতে হয়।'
    ),
    scene(g, { nodeState: { 1: 'current', 3: 'relax' }, edgeState: { '1-3': 'relax' }, panels: [lp({ rowHl: 1, itemHl: { '1,0': 'reject', '1,1': 'reject', '1,2': 'relax' } })], status: T('0 ✗, 2 ✗, 3 ✓ → edge 1–3 exists', '0 ✗, 2 ✗, 3 ✓ → এজ 1–3 আছে') }),
    'has'
  ));
  const dAdj = adjOf(D_INTRO).map((items) => items.map((x) => x.v));
  steps.push(step(
    T('Directed graphs: one entry per arrow', 'ডিরেক্টেড গ্রাফ: প্রতি তীরে একটা এন্ট্রি'),
    T(
      `With **one-way arrows**, an arrow **u → v** is written **only in row u** ("from u you can go to v"). Row v does not get u, because you cannot go back.\n\nHere: \`adj[2] = [${dAdj[2].join(', ')}]\` (arrows 2 → 1 and 2 → 4), and \`adj[3] = []\` — no arrow leaves 3. Now the list has exactly **${D_INTRO.edges.length}** entries, one per arrow.`,
      `**একমুখী তীর** থাকলে, তীর **u → v** লেখা হয় **শুধু সারি u-তে** ("u থেকে v-তে যাওয়া যায়")। সারি v-তে u যায় না, কারণ ফেরা যায় না।\n\nএখানে: \`adj[2] = [${dAdj[2].join(', ')}]\` (তীর 2 → 1 আর 2 → 4), আর \`adj[3] = []\` — 3 থেকে কোনো তীর বের হয় না। এখন তালিকায় ঠিক **${D_INTRO.edges.length}**টা এন্ট্রি, প্রতি তীরে একটা।`
    ),
    scene(D_INTRO, { nodeState: { 2: 'current' }, edgeState: { '2-1': 'compare', '2-4': 'compare' }, edgeFrom: { '2-1': 2, '2-4': 2 }, panels: [lp({ rows: dAdj, rowHl: 2, label: T('adj for one-way arrows', 'একমুখী তীরের adj') })], status: T(`adj[2] = [${dAdj[2].join(', ')}]`, `adj[2] = [${dAdj[2].join(', ')}]`) }),
    'add'
  ));
  steps.push(step(
    T('Memory: only what exists', 'মেমরি: শুধু যা আছে'),
    T(
      `Count the storage: ${V} row heads + ${entries} neighbour boxes = **${V + entries}**. An adjacency matrix for the same graph needs ${V} × ${V} = **${V * V}** cells, mostly zeros.\n\nThe gap grows fast. A city map with 10,000 crossings and 15,000 roads needs about **40,000** list entries — but a matrix would need **100,000,000** cells.\n\n> **In short:** memory **O(V + E)** for the list vs **O(V²)** for the matrix.`,
      `জায়গা গোনো: ${V}টা সারির মাথা + ${entries}টা প্রতিবেশী বক্স = **${V + entries}**। একই গ্রাফের অ্যাডজাসেন্সি ম্যাট্রিক্সে লাগে ${V} × ${V} = **${V * V}**টা ঘর, বেশিরভাগই শূন্য।\n\nপার্থক্য দ্রুত বাড়ে। ১০,০০০ মোড় আর ১৫,০০০ রাস্তার একটা শহরের ম্যাপে তালিকায় লাগে প্রায় **৪০,০০০** এন্ট্রি — কিন্তু ম্যাট্রিক্সে লাগত **১০,০০,০০,০০০**টা ঘর।\n\n> **সংক্ষেপে:** তালিকার মেমরি **O(V + E)**, ম্যাট্রিক্সের **O(V²)**।`
    ),
    scene(g, { edgeState: allEdges(g, 'tree'), panels: [lp()], status: T(`${V + entries} boxes vs ${V * V} matrix cells`, `${V + entries}টা বক্স বনাম ${V * V}টা ম্যাট্রিক্স ঘর`) }),
    'init'
  ));
  steps.push(step(
    T('Weighted graphs: store (neighbour, weight)', 'ওয়েটেড গ্রাফ: (প্রতিবেশী, ওজন) রাখো'),
    T(
      'If edges have **weights** (distance, cost…), each box stores **two numbers**: the neighbour **and** the weight of the road to it.\n\nThe small number under each box is the weight: `adj[0] = [(1, 4), (2, 3)]` means "0 → 1 costs 4, 0 → 2 costs 3".\n\nDijkstra and Prim read exactly this.',
      'এজের **ওজন** (দূরত্ব, খরচ…) থাকলে প্রতিটা বক্সে **দুটো সংখ্যা**: প্রতিবেশী **আর** সেখানে যাওয়ার রাস্তার ওজন।\n\nপ্রতিটা বক্সের নিচের ছোট সংখ্যাটা ওজন: `adj[0] = [(1, 4), (2, 3)]` মানে "0 → 1-এর খরচ 4, 0 → 2-এর খরচ 3"।\n\nDijkstra আর Prim ঠিক এটাই পড়ে।'
    ),
    scene(G_W, { panels: [{ type: 'adjlist', label: T('adj[u] = (neighbour, weight)', 'adj[u] = (প্রতিবেশী, ওজন)'), rows: adjOf(G_W).map((items, u) => ({ head: u, state: u === 0 ? 'current' : '', items: items.map((it) => ({ v: it.v, w: it.w })) })) }], nodeState: { 0: 'current' }, edgeState: { '0-1': 'compare', '0-2': 'compare' }, status: T('adj[0] = [(1, 4), (2, 3)]', 'adj[0] = [(1, 4), (2, 3)]') }),
    'add'
  ));
  steps.push(step(
    T('Common mistakes and summary', 'সাধারণ ভুল আর সারসংক্ষেপ'),
    T(
      '**Beginner mistakes to avoid:**\n- forgetting the second line `adj[v].add(u)` in an undirected graph → the edge only works one way;\n- adding it in a **directed** graph → arrows that point backwards by accident;\n- thinking the order inside a row matters — it does not, it only changes which neighbour is visited first.\n\n**Summary:** one list of neighbours per vertex · memory **O(V + E)** · neighbours of u in **O(deg u)** · the default choice for most real graphs (which are sparse).',
      '**যে ভুলগুলো এড়াবে:**\n- আনডিরেক্টেড গ্রাফে দ্বিতীয় লাইন `adj[v].add(u)` ভুলে যাওয়া → এজ শুধু এক দিকে কাজ করে;\n- **ডিরেক্টেড** গ্রাফে সেটা যোগ করা → ভুল করে উল্টো দিকের তীর;\n- ভাবা যে সারির ভেতরের ক্রম গুরুত্বপূর্ণ — না, এটা শুধু কোন প্রতিবেশী আগে দেখা হবে তা বদলায়।\n\n**সারসংক্ষেপ:** প্রতি ভার্টেক্সে একটা প্রতিবেশী-তালিকা · মেমরি **O(V + E)** · u-এর প্রতিবেশী **O(deg u)**-এ · বেশিরভাগ বাস্তব (পাতলা) গ্রাফের স্বাভাবিক পছন্দ।'
    ),
    scene(g, { edgeState: allEdges(g, 'tree'), panels: [lp()], status: T('memory O(V + E)', 'মেমরি O(V + E)') }),
    ['add', 'addBack']
  ));
  return steps;
})();

const adjList = {
  id: 'graph-adj-list',
  name: { en: 'Adjacency List', bn: 'অ্যাডজাসেন্সি লিস্ট' },
  description: { en: 'Each vertex keeps a list of its neighbours — the usual choice', bn: 'প্রতিটা ভার্টেক্স তার প্রতিবেশীদের তালিকা রাখে — সাধারণ পছন্দ' },
  categoryKey: 'graphs',
  subgroupKey: 'g-store',
  level: 'beginner',
  order: 20,
  icon: '📇',
  complexity: { time: 'O(deg(u)) neighbours', space: 'O(V + E)', note: { en: 'Memory grows with the real number of edges. Listing neighbours is as fast as possible; testing one edge means searching a list.', bn: 'মেমরি আসল এজের সংখ্যার সঙ্গে বাড়ে। প্রতিবেশী বের করা সবচেয়ে দ্রুত; একটা এজ যাচাই মানে তালিকায় খোঁজা।' } },
  code: listCode.code,
  lineMap: listCode.lineMap,
  steps: listSteps
};

/* ===================================================================== 6. Edge list & choosing */

const edgeListCode = (() => {
  const text = {
    e1: ['edges = list of (u, v, weight)', 'edges = (u, v, weight)-এর তালিকা'],
    e2: ['hasEdge(a, b):', 'hasEdge(a, b):'],
    e3: ['    for each (u, v, w) in edges:', '    edges-এর প্রতিটা (u, v, w)-এর জন্য:'],
    e4: ['        if (u, v) is (a, b) or (b, a): return true', '        (u, v) যদি (a, b) বা (b, a) হয়: true ফেরত দাও'],
    e5: ['    return false            ← had to look at every edge: O(E)', '    false ফেরত দাও            ← সব এজ দেখতে হলো: O(E)'],
    e6: ['sort edges by weight      ← easy! (Kruskal needs this)', 'এজগুলো ওজন অনুযায়ী সাজাও      ← সহজ! (ক্রুসকালের লাগে)'],
    c1: ['The simplest storage: one row per edge', 'সবচেয়ে সহজ উপায়: প্রতি এজে একটা সারি'],
    c2: ['Testing one edge means scanning the whole list', 'একটা এজ যাচাই মানে পুরো তালিকা দেখা']
  };
  const g = G_W;
  const src = {
    pseudo: '{{e1}}  @init\n{{e2}}  @has\n{{e3}}  @scan\n{{e4}}  @scan\n{{e5}}  @miss\n{{e6}}  @sort',
    js: `// {{c1}}  @init
${edgesDecl(g, 'js', 'init').join('\n')}

// {{c2}}  @has
function hasEdge(edges, a, b) {  @has
    for (const [u, v] of edges)  @scan
        if ((u === a && v === b) || (u === b && v === a)) return true;  @scan
    return false;  @miss
}

console.log(hasEdge(edges, 1, 3));  @has
edges.sort((x, y) => x[2] - y[2]);  @sort`,
    python: `# {{c1}}  @init
${edgesDecl(g, 'python', 'init').join('\n')}


# {{c2}}  @has
def has_edge(edges, a, b):  @has
    for u, v, w in edges:  @scan
        if (u, v) in ((a, b), (b, a)):  @scan
            return True  @scan
    return False  @miss


print(has_edge(edges, 1, 3))  @has
edges.sort(key=lambda e: e[2])  @sort`,
    java: `import java.util.*;

public class Main {

    // {{c2}}  @has
    static boolean hasEdge(int[][] edges, int a, int b) {  @has
        for (int[] e : edges)  @scan
            if ((e[0] == a && e[1] == b) || (e[0] == b && e[1] == a)) return true;  @scan
        return false;  @miss
    }

    public static void main(String[] args) {
        // {{c1}}  @init
${edgesDecl(g, 'java', 'init').map((l) => `        ${l}`).join('\n')}
        System.out.println(hasEdge(edges, 1, 3));  @has
        Arrays.sort(edges, (x, y) -> x[2] - y[2]);  @sort
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// {{c2}}  @has
bool hasEdge(vector<vector<int>>& edges, int a, int b) {  @has
    for (auto& e : edges)  @scan
        if ((e[0] == a && e[1] == b) || (e[0] == b && e[1] == a)) return true;  @scan
    return false;  @miss
}

int main() {
    // {{c1}}  @init
${edgesDecl(g, 'cpp', 'init').map((l) => `    ${l}`).join('\n')}
    cout << hasEdge(edges, 1, 3) << endl;  @has
    sort(edges.begin(), edges.end(), [](auto& x, auto& y) { return x[2] < y[2]; });  @sort
    return 0;
}`
  };
  return program(src, text);
})();

const CMP_ROWS = [T('Adjacency matrix', 'অ্যাডজাসেন্সি ম্যাট্রিক্স'), T('Adjacency list', 'অ্যাডজাসেন্সি লিস্ট'), T('Edge list', 'এজ লিস্ট')];
const CMP_COLS = [T('memory', 'মেমরি'), T('is u–v an edge?', 'u–v কি এজ?'), T('neighbours of u', 'u-এর প্রতিবেশী'), T('best for', 'কোথায় ভালো')];
const CMP_CELLS = [
  ['O(V²)', 'O(1)', 'O(V)', T('dense graphs, quick edge tests', 'ঘন গ্রাফ, দ্রুত এজ যাচাই')],
  ['O(V + E)', 'O(deg u)', 'O(deg u)', T('most graphs; BFS, DFS, Dijkstra', 'বেশিরভাগ গ্রাফ; BFS, DFS, Dijkstra')],
  ['O(E)', 'O(E)', 'O(E)', T('Kruskal, Bellman-Ford', 'ক্রুসকাল, বেলম্যান-ফোর্ড')]
];
const cmpPanel = (hl = {}) => ({ type: 'matrix', wide: true, label: T('which storage to choose?', 'কোন উপায় বাছবে?'), rows: CMP_ROWS, cols: CMP_COLS, corner: '', cells: CMP_CELLS, hl });

const SPARSE = {
  V: 8,
  directed: false,
  weighted: false,
  nodes: N([[0, 60, 60], [1, 200, 60], [2, 340, 60], [3, 480, 60], [4, 60, 200], [5, 200, 200], [6, 340, 200], [7, 480, 200]]),
  edges: [[0, 1], [1, 2], [2, 3], [0, 4], [5, 6], [3, 7], [6, 7]].map(([u, v]) => ({ u, v }))
};

const edgeList = {
  id: 'graph-edge-list',
  name: { en: 'Edge List & Which to Choose', bn: 'এজ লিস্ট আর কোনটা বাছবে' },
  description: { en: 'The simplest storage, and a side-by-side comparison of all three', bn: 'সবচেয়ে সহজ উপায়, আর তিনটার পাশাপাশি তুলনা' },
  categoryKey: 'graphs',
  subgroupKey: 'g-store',
  level: 'beginner',
  order: 30,
  icon: '📜',
  complexity: { time: 'O(E) edge test', space: 'O(E)', note: { en: 'Tiny and easy to sort, but finding anything means scanning every edge.', bn: 'ছোট আর সাজানো সহজ, কিন্তু কিছু খুঁজতে সব এজ দেখতে হয়।' } },
  code: edgeListCode.code,
  lineMap: edgeListCode.lineMap,
  steps: [
    step(
      T('Edge list: just write the edges down', 'এজ লিস্ট: শুধু এজগুলো লিখে রাখো'),
      T(
        'The third way is the simplest of all: keep a plain **list of edges**, one row per edge: **(u, v, weight)**.\n\nNo table, no per-vertex lists. Our weighted graph becomes just 7 rows. Memory: **O(E)**.',
        'তৃতীয় উপায়টা সবচেয়ে সহজ: শুধু একটা **এজের তালিকা** রাখো, প্রতি এজে একটা সারি: **(u, v, weight)**।\n\nকোনো টেবিল নেই, প্রতি ভার্টেক্সে তালিকাও নেই। আমাদের ওয়েটেড গ্রাফ মাত্র ৭টা সারি। মেমরি: **O(E)**।'
      ),
      scene(G_W, { panels: [{ type: 'edges', label: T('edges', 'edges'), rows: G_W.edges.map((e) => ({ e: `${e.u}–${e.v}`, w: e.w })) }], status: T('7 rows = 7 edges', '৭টা সারি = ৭টা এজ') }),
      'init'
    ),
    step(
      T('Is 1–3 an edge? Scan the list', '1–3 কি এজ? তালিকা দেখো'),
      T(
        'To test one edge we have no shortcut: read the rows **one by one** until we find (1, 3) — here it is the 4th row.\n\nIf the edge did not exist we would read **all E rows** before saying "no". So an edge test costs **O(E)**, and listing neighbours also costs O(E).',
        'একটা এজ যাচাইয়ের কোনো শর্টকাট নেই: (1, 3) না পাওয়া পর্যন্ত সারিগুলো **একটা একটা করে** পড়ো — এখানে এটা ৪র্থ সারি।\n\nএজটা না থাকলে "না" বলার আগে **সব E-টা সারি** পড়তে হতো। তাই এজ যাচাইয়ে খরচ **O(E)**, প্রতিবেশী বের করতেও O(E)।'
      ),
      scene(G_W, { nodeState: { 1: 'current', 3: 'current' }, edgeState: { '1-3': 'relax' }, panels: [{ type: 'edges', label: T('edges', 'edges'), rows: G_W.edges.map((e, i) => ({ e: `${e.u}–${e.v}`, w: e.w, state: i < 3 ? 'reject' : i === 3 ? 'tree' : '' })) }], status: T('rows 1–3 ✗, row 4 ✓', 'সারি ১–৩ ✗, সারি ৪ ✓') }),
      ['has', 'scan']
    ),
    step(
      T('Where the edge list shines', 'এজ লিস্ট কোথায় ভালো'),
      T(
        'Some algorithms only ever **walk through all the edges**, never asking "who are my neighbours?":\n\n- **Kruskal** sorts the edges by weight and picks the cheap ones.\n- **Bellman-Ford** relaxes every edge again and again.\n\nFor them an edge list is perfect — and sorting it is one line of code.',
        'কিছু অ্যালগরিদম শুধু **সব এজ ঘুরে দেখে**, কখনো "আমার প্রতিবেশী কারা?" জিজ্ঞেস করে না:\n\n- **ক্রুসকাল** ওজন অনুযায়ী এজ সাজিয়ে সস্তাগুলো বাছে।\n- **বেলম্যান-ফোর্ড** প্রতিটা এজ বারবার রিল্যাক্স করে।\n\nএদের জন্য এজ লিস্ট একদম ঠিক — আর সাজানো মাত্র এক লাইনের কোড।'
      ),
      scene(G_W, { panels: [{ type: 'edges', label: T('sorted by weight', 'ওজন অনুযায়ী সাজানো'), rows: [...G_W.edges].sort((a, b) => a.w - b.w).map((e) => ({ e: `${e.u}–${e.v}`, w: e.w })) }], status: T('sorted: 1, 2, 2, 3, 4, 4, 6', 'সাজানো: 1, 2, 2, 3, 4, 4, 6') }),
      'sort'
    ),
    step(
      T('All three side by side', 'তিনটা পাশাপাশি'),
      T(
        'Here is the whole comparison.\n\n- **Matrix:** fastest edge test, but V² memory.\n- **List:** small memory and fast neighbours — the everyday choice.\n- **Edge list:** smallest and simplest, slow to search, great for edge-by-edge algorithms.',
        'পুরো তুলনাটা এখানে।\n\n- **ম্যাট্রিক্স:** সবচেয়ে দ্রুত এজ যাচাই, কিন্তু V² মেমরি।\n- **লিস্ট:** কম মেমরি আর দ্রুত প্রতিবেশী — রোজকার পছন্দ।\n- **এজ লিস্ট:** সবচেয়ে ছোট ও সহজ, খুঁজতে ধীর, এজ-ধরে-চলা অ্যালগরিদমে দারুণ।'
      ),
      { kind: 'graphx', nodes: [], edges: [], panels: [cmpPanel()], status: T('pick by what your algorithm asks most', 'তোমার অ্যালগরিদম কী বেশি জিজ্ঞেস করে, সেটা দেখে বাছো') },
      'init'
    ),
    step(
      T('Dense graph → matrix', 'ঘন গ্রাফ → ম্যাট্রিক্স'),
      T(
        'A graph is **dense** when it has close to the maximum V(V − 1)/2 edges, like **K₅** here (10 of 10).\n\nThen the matrix wastes almost nothing — nearly every cell is a 1 anyway — and you get O(1) edge tests for free.',
        'যখন সর্বোচ্চ V(V − 1)/2-এর কাছাকাছি এজ থাকে, গ্রাফটা **ঘন (dense)**, যেমন এখানে **K₅** (১০-এর মধ্যে ১০)।\n\nতখন ম্যাট্রিক্স প্রায় কিছুই নষ্ট করে না — প্রায় সব ঘরেই 1 — আর O(1) এজ যাচাই বিনামূল্যে পাও।'
      ),
      scene(K5, { edgeState: allEdges(K5, 'tree'), panels: [cmpPanel({ '0,0': 'relax', '0,1': 'relax', '0,2': 'relax', '0,3': 'relax' })], status: T('10 edges out of 10 possible', 'সম্ভাব্য ১০-এর মধ্যে ১০টা এজ') }),
      'init'
    ),
    step(
      T('Sparse graph → list', 'পাতলা গ্রাফ → লিস্ট'),
      T(
        'A graph is **sparse** when it has far fewer edges than V². Here 8 vertices could have 28 edges, but only **7** exist.\n\nA matrix would be 64 cells, mostly zeros. An adjacency list stores just 8 + 14 entries. Road maps, social networks and the web are all sparse — so **lists win** in real life.',
        'যখন V²-এর চেয়ে অনেক কম এজ থাকে, গ্রাফটা **পাতলা (sparse)**। এখানে ৮টা ভার্টেক্সে ২৮টা এজ হতে পারত, আছে মাত্র **৭টা**।\n\nম্যাট্রিক্সে লাগত ৬৪টা ঘর, বেশিরভাগই শূন্য। অ্যাডজাসেন্সি লিস্টে মাত্র ৮ + ১৪টা এন্ট্রি। রাস্তার ম্যাপ, সোশ্যাল নেটওয়ার্ক, ওয়েব — সবই পাতলা — তাই বাস্তবে **লিস্টই জেতে**।'
      ),
      scene(SPARSE, { edgeState: allEdges(SPARSE, 'tree'), panels: [cmpPanel({ '1,0': 'relax', '1,1': 'relax', '1,2': 'relax', '1,3': 'relax' })], status: T('7 edges out of 28 possible', 'সম্ভাব্য ২৮-এর মধ্যে ৭টা এজ') }),
      'init'
    ),
    step(
      T('What we learned', 'কী শিখলাম'),
      T(
        '- **Edge list:** O(E) memory, O(E) to find anything, trivial to sort.\n- **Rule of thumb:**\n  - need fast "is u–v an edge?" on a dense graph → **matrix**\n  - need neighbours (BFS, DFS, Dijkstra, Prim) → **adjacency list**\n  - process edges one by one (Kruskal, Bellman-Ford) → **edge list**',
        '- **এজ লিস্ট:** O(E) মেমরি, কিছু খুঁজতে O(E), সাজানো খুব সহজ।\n- **মোটা দাগের নিয়ম:**\n  - ঘন গ্রাফে দ্রুত "u–v কি এজ?" দরকার → **ম্যাট্রিক্স**\n  - প্রতিবেশী দরকার (BFS, DFS, Dijkstra, Prim) → **অ্যাডজাসেন্সি লিস্ট**\n  - এজ একটা একটা করে প্রসেস (ক্রুসকাল, বেলম্যান-ফোর্ড) → **এজ লিস্ট**'
      ),
      { kind: 'graphx', nodes: [], edges: [], panels: [cmpPanel()], status: T('matrix · list · edge list', 'ম্যাট্রিক্স · লিস্ট · এজ লিস্ট') },
      'sort'
    )
  ]
};

/* ===================================================================== 7. Spanning trees */

const spanCode = (() => {
  const text = {
    s1: ['IS-SPANNING-TREE(V, chosen)', 'IS-SPANNING-TREE(V, chosen)'],
    s2: ['    if chosen does not have exactly V − 1 edges: return false', '    chosen-এ ঠিক V − 1টা এজ না থাকলে: false'],
    s3: ['    reached = {0}', '    reached = {0}'],
    s4: ['    repeat V times: for each chosen edge (u, v):', '    V বার করো: প্রতিটা chosen এজ (u, v)-এর জন্য:'],
    s5: ['        if u or v is reached: mark both reached', '        u বা v reached হলে: দুটোকেই reached করো'],
    s6: ['    return (every vertex is reached)', '    (প্রতিটা ভার্টেক্স reached কিনা) ফেরত দাও'],
    c1: ['1. A tree on V vertices has exactly V − 1 edges', '১. V ভার্টেক্সের ট্রিতে ঠিক V − 1টা এজ'],
    c2: ['2. Spread out from 0 along the chosen edges', '২. chosen এজ ধরে 0 থেকে ছড়িয়ে পড়ো'],
    c3: ['3. V − 1 edges + everything connected = no room for a cycle', '৩. V − 1 এজ + সব যুক্ত = সাইকেলের জায়গা নেই']
  };
  const src = {
    pseudo: '{{s1}}  @header\n{{s2}}  @count\n{{s3}}  @conn\n{{s4}}  @conn\n{{s5}}  @conn\n{{s6}}  @yes',
    js: `function isSpanningTree(V, chosen) {  @header
    // {{c1}}  @count
    if (chosen.length !== V - 1) return false;  @count

    // {{c2}}  @conn
    const reached = new Array(V).fill(false);  @conn
    reached[0] = true;  @conn
    for (let round = 0; round < V; round++)  @conn
        for (const [u, v] of chosen)  @conn
            if (reached[u] || reached[v]) reached[u] = reached[v] = true;  @conn

    // {{c3}}  @yes
    return reached.every(Boolean);  @yes
}

const chosen = [[1, 2], [1, 3], [3, 4], [0, 2], [4, 5]];
console.log(isSpanningTree(6, chosen));   // true  @yes`,
    java: `import java.util.*;

public class Main {

    static boolean isSpanningTree(int V, int[][] chosen) {  @header
        // {{c1}}  @count
        if (chosen.length != V - 1) return false;  @count

        // {{c2}}  @conn
        boolean[] reached = new boolean[V];  @conn
        reached[0] = true;  @conn
        for (int round = 0; round < V; round++)  @conn
            for (int[] e : chosen)  @conn
                if (reached[e[0]] || reached[e[1]]) reached[e[0]] = reached[e[1]] = true;  @conn

        // {{c3}}  @yes
        for (boolean r : reached) if (!r) return false;  @yes
        return true;  @yes
    }

    public static void main(String[] args) {
        int[][] chosen = {{1, 2}, {1, 3}, {3, 4}, {0, 2}, {4, 5}};
        System.out.println(isSpanningTree(6, chosen));   // true  @yes
    }
}`,
    python: `def is_spanning_tree(V, chosen):  @header
    # {{c1}}  @count
    if len(chosen) != V - 1:  @count
        return False  @count

    # {{c2}}  @conn
    reached = [False] * V  @conn
    reached[0] = True  @conn
    for _ in range(V):  @conn
        for u, v in chosen:  @conn
            if reached[u] or reached[v]:  @conn
                reached[u] = reached[v] = True  @conn

    # {{c3}}  @yes
    return all(reached)  @yes


chosen = [(1, 2), (1, 3), (3, 4), (0, 2), (4, 5)]
print(is_spanning_tree(6, chosen))   # True  @yes`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;

bool isSpanningTree(int V, vector<pair<int, int>>& chosen) {  @header
    // {{c1}}  @count
    if ((int)chosen.size() != V - 1) return false;  @count

    // {{c2}}  @conn
    vector<bool> reached(V, false);  @conn
    reached[0] = true;  @conn
    for (int round = 0; round < V; round++)  @conn
        for (auto [u, v] : chosen)  @conn
            if (reached[u] || reached[v]) reached[u] = reached[v] = true;  @conn

    // {{c3}}  @yes
    for (bool r : reached) if (!r) return false;  @yes
    return true;  @yes
}

int main() {
    vector<pair<int, int>> chosen = {{1, 2}, {1, 3}, {3, 4}, {0, 2}, {4, 5}};
    cout << isSpanningTree(6, chosen) << endl;   // 1  @yes
    return 0;
}`
  };
  return program(src, text);
})();

const pick = (g, pairs, rest = 'dim') => {
  const es = Object.fromEntries(g.edges.map((e) => [ek(e.u, e.v), rest]));
  for (const [u, v] of pairs) {
    const k = g.edges.some((e) => e.u === u && e.v === v) ? ek(u, v) : ek(v, u);
    es[k] = 'tree';
  }
  return es;
};
const costOf = (pairs) => pairs.reduce((s, [u, v]) => s + G_W.edges.find((e) => (e.u === u && e.v === v) || (e.u === v && e.v === u)).w, 0);
const TREE_A = [[0, 1], [1, 3], [3, 4], [4, 5], [2, 3]];
const MST = [[1, 2], [1, 3], [3, 4], [0, 2], [4, 5]];
const K4 = {
  V: 4,
  directed: false,
  weighted: false,
  nodes: N([[0, 70, 60], [1, 270, 60], [2, 270, 240], [3, 70, 240]]),
  edges: [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]].map(([u, v]) => ({ u, v }))
};

const spanningTree = {
  id: 'graph-spanning-tree',
  name: { en: 'Spanning Trees & MST', bn: 'স্প্যানিং ট্রি ও MST' },
  description: { en: 'Connect every vertex with V − 1 edges, and find the cheapest way', bn: 'V − 1টা এজে সব ভার্টেক্স জোড়া, আর সবচেয়ে সস্তা উপায় খোঁজা' },
  categoryKey: 'graphs',
  subgroupKey: 'g-mst',
  level: 'beginner',
  order: 10,
  icon: '🌳',
  complexity: { time: 'O(V · E)', space: 'O(V)', note: { en: 'This simple checker repeats V rounds over the chosen edges. Prim and Kruskal build an MST far more cleverly.', bn: 'এই সহজ যাচাইকারী chosen এজগুলোর ওপর V বার ঘোরে। প্রিম আর ক্রুসকাল আরও বুদ্ধি করে MST বানায়।' } },
  code: spanCode.code,
  lineMap: spanCode.lineMap,
  steps: [
    step(
      T('The problem: connect everyone cheaply', 'সমস্যা: সবাইকে সস্তায় জোড়া'),
      T(
        'Six villages want electricity. The numbers are the cost of laying a cable along each possible route.\n\nWe do not need **every** cable — we only need every village to be **connected** to every other one, somehow. Which cables should we lay so the **total cost is as small as possible**?',
        'ছয়টা গ্রামে বিদ্যুৎ দরকার। সংখ্যাগুলো প্রতিটা সম্ভাব্য পথে কেবল টানার খরচ।\n\n**সব** কেবল লাগবে না — শুধু দরকার প্রতিটা গ্রাম যেকোনোভাবে অন্য সবার সঙ্গে **যুক্ত** থাকুক। কোন কেবলগুলো টানলে **মোট খরচ সবচেয়ে কম** হবে?'
      ),
      scene(G_W, { status: T('7 possible cables, total if we laid all: 22', '৭টা সম্ভাব্য কেবল, সব টানলে মোট: 22') }),
      'header'
    ),
    step(
      T('A spanning tree', 'একটা স্প্যানিং ট্রি'),
      T(
        `A **spanning tree** picks some edges so that:\n\n- it **spans** — touches **every** vertex, and everything is connected;\n- it is a **tree** — **no cycle**.\n\nThe green edges are one spanning tree. It uses **5 = V − 1** edges and costs ${costOf(TREE_A)}.`,
        `**স্প্যানিং ট্রি (spanning tree)** এমনভাবে কিছু এজ বাছে যাতে:\n\n- এটা **ছড়িয়ে থাকে (spans)** — **প্রতিটা** ভার্টেক্স ছোঁয়, আর সব যুক্ত;\n- এটা **ট্রি** — **কোনো সাইকেল নেই**।\n\nসবুজ এজগুলো একটা স্প্যানিং ট্রি। এতে **5 = V − 1**টা এজ, খরচ ${costOf(TREE_A)}।`
      ),
      scene(G_W, { edgeState: pick(G_W, TREE_A), nodeState: allNodes(G_W, 'done'), status: T(`5 edges, cost ${costOf(TREE_A)}`, `৫টা এজ, খরচ ${costOf(TREE_A)}`) }),
      ['count', 'conn']
    ),
    step(
      T('Too few edges: not connected', 'এজ কম: যুক্ত নয়'),
      T(
        'Here only **4** edges are chosen. Vertex **5** is cut off — nobody can reach it.\n\nWith fewer than **V − 1** edges you can **never** connect V vertices. The code\'s first check (`chosen.length != V − 1`) already says **false**.',
        'এখানে মাত্র **৪টা** এজ বাছা হয়েছে। ভার্টেক্স **5** বিচ্ছিন্ন — কেউ সেখানে পৌঁছাতে পারে না।\n\n**V − 1**-এর কম এজ দিয়ে V-টা ভার্টেক্স **কখনোই** জোড়া যায় না। কোডের প্রথম যাচাই (`chosen.length != V − 1`) আগেই বলে **false**।'
      ),
      scene(G_W, { edgeState: pick(G_W, [[0, 1], [1, 3], [3, 4], [2, 3]]), nodeState: { 5: 'reject' }, status: T('4 edges → vertex 5 unreachable', '৪টা এজ → ভার্টেক্স 5-এ যাওয়া যায় না') }),
      'count'
    ),
    step(
      T('A cycle: not a tree', 'সাইকেল: ট্রি নয়'),
      T(
        'Now 5 edges again, but **0–1, 1–2, 0–2** form a **cycle**, so one of them is wasted — and vertex **4–5** are left out.\n\nA set of exactly V − 1 edges that reaches every vertex can **never** contain a cycle. So the code\'s second check — "is every vertex reached?" — is all we need.',
        'আবার ৫টা এজ, কিন্তু **0–1, 1–2, 0–2** একটা **সাইকেল**, তাই এর একটা অপচয় — আর **4–5** বাদ পড়ে গেছে।\n\nঠিক V − 1টা এজ যদি প্রতিটা ভার্টেক্সে পৌঁছায়, তাতে **কখনো** সাইকেল থাকতে পারে না। তাই কোডের দ্বিতীয় যাচাই — "প্রতিটা ভার্টেক্সে পৌঁছানো গেছে?" — এটুকুই যথেষ্ট।'
      ),
      scene(G_W, { edgeState: { ...pick(G_W, [[1, 3], [3, 4]]), '0-1': 'reject', '1-2': 'reject', '0-2': 'reject' }, nodeState: { 5: 'reject' }, status: T('cycle 0–1–2 wastes an edge; 5 is unreachable', 'সাইকেল 0–1–2 একটা এজ নষ্ট করে; 5-এ যাওয়া যায় না') }),
      'conn'
    ),
    step(
      T('There are many spanning trees', 'স্প্যানিং ট্রি অনেকগুলো'),
      T(
        'A graph usually has **many** spanning trees. For a complete graph Kₙ there is a beautiful formula, **Cayley\'s formula**:\n\n> Kₙ has **nⁿ⁻²** spanning trees.\n\nThis K₄ has 4² = **16** of them; the green one is just one. K₁₀ already has 100,000,000 — far too many to try one by one.',
        'একটা গ্রাফে সাধারণত **অনেকগুলো** স্প্যানিং ট্রি থাকে। কমপ্লিট গ্রাফ Kₙ-এর জন্য একটা সুন্দর সূত্র আছে, **কেইলির সূত্র (Cayley\'s formula)**:\n\n> Kₙ-এ **nⁿ⁻²**টা স্প্যানিং ট্রি।\n\nএই K₄-এ 4² = **16**টা; সবুজটা তার একটা মাত্র। K₁₀-এ ইতিমধ্যে ১০ কোটি — একটা একটা করে চেষ্টা করা অসম্ভব।'
      ),
      scene(K4, { edgeState: pick(K4, [[0, 1], [1, 2], [2, 3]]), status: T('K₄ → 4² = 16 spanning trees', 'K₄ → 4² = 16টা স্প্যানিং ট্রি') }),
      'yes'
    ),
    step(
      T('The minimum spanning tree (MST)', 'মিনিমাম স্প্যানিং ট্রি (MST)'),
      T(
        `Among all spanning trees, the one with the **smallest total weight** is the **Minimum Spanning Tree (MST)**.\n\nFor our villages it is the green tree: ${MST.map(([u, v]) => `${u}–${v}`).join(', ')} with cost **${costOf(MST)}**, cheaper than the ${costOf(TREE_A)} we saw before.\n\nThe code confirms it is a spanning tree: 5 edges, and spreading out from 0 reaches all 6 vertices.`,
        `সব স্প্যানিং ট্রির মধ্যে যেটার **মোট ওজন সবচেয়ে কম**, সেটা **মিনিমাম স্প্যানিং ট্রি (MST)**।\n\nআমাদের গ্রামগুলোর জন্য সেটা সবুজ ট্রি: ${MST.map(([u, v]) => `${u}–${v}`).join(', ')}, খরচ **${costOf(MST)}** — আগের ${costOf(TREE_A)}-এর চেয়ে সস্তা।\n\nকোড নিশ্চিত করে এটা স্প্যানিং ট্রি: ৫টা এজ, আর 0 থেকে ছড়িয়ে ৬টা ভার্টেক্সেই পৌঁছানো যায়।`
      ),
      scene(G_W, { edgeState: pick(G_W, MST, 'reject'), nodeState: allNodes(G_W, 'done'), panels: [{ type: 'text', label: T('MST cost', 'MST খরচ'), text: `${MST.map(([u, v]) => costOf([[u, v]])).join(' + ')} = **${costOf(MST)}**` }], status: T(`MST cost = ${costOf(MST)}  (red = not used)`, `MST খরচ = ${costOf(MST)}  (লাল = ব্যবহার হয়নি)`) }),
      'yes'
    ),
    step(
      T('The cut rule: why greedy works', 'কাট নিয়ম: লোভী পদ্ধতি কেন কাজ করে'),
      T(
        'Split the vertices into two groups — blue {0, 1, 2} and orange {3, 4, 5}. That split is called a **cut**.\n\nThe edges crossing it are 1–3 (2) and 2–3 (4). The **cut property** says: the **cheapest edge crossing any cut is always safe** to put in the MST. Here that is **1–3**.\n\nBoth Prim and Kruskal are built on this one idea.',
        'ভার্টেক্সগুলো দুই দলে ভাগ করো — নীল {0, 1, 2} আর কমলা {3, 4, 5}। এই ভাগকে বলে **কাট (cut)**।\n\nএটা পার হওয়া এজ 1–3 (2) আর 2–3 (4)। **কাট প্রপার্টি** বলে: **যেকোনো কাট পার হওয়া সবচেয়ে সস্তা এজ MST-তে রাখা সবসময় নিরাপদ**। এখানে সেটা **1–3**।\n\nপ্রিম আর ক্রুসকাল দুটোই এই একটা ধারণার ওপর দাঁড়িয়ে।'
      ),
      scene(G_W, { nodeState: { 0: 'setA', 1: 'setA', 2: 'setA', 3: 'setB', 4: 'setB', 5: 'setB' }, edgeState: { '1-3': 'relax', '2-3': 'compare', '0-1': 'dim', '0-2': 'dim', '1-2': 'dim', '3-4': 'dim', '4-5': 'dim' }, status: T('crossing edges: 1–3 (2) ✓ cheapest, 2–3 (4)', 'পার হওয়া এজ: 1–3 (2) ✓ সবচেয়ে সস্তা, 2–3 (4)') })
    ),
    step(
      T('Two ways to find the MST', 'MST খোঁজার দুটো উপায়'),
      T(
        '- **Prim** grows **one tree** from a start vertex; each round it adds the cheapest edge leaving the tree (a cut between "in the tree" and "not yet").\n- **Kruskal** looks at the **whole graph**, takes edges from cheapest to most expensive, and skips any that would make a cycle.\n\nBoth give the same total cost. The next two lessons show each one, step by step.',
        '- **প্রিম** একটা শুরুর ভার্টেক্স থেকে **একটা ট্রি** বড় করে; প্রতি রাউন্ডে ট্রি থেকে বের হওয়া সবচেয়ে সস্তা এজ যোগ করে ("ট্রিতে আছে" আর "এখনো নেই"-এর মধ্যে একটা কাট)।\n- **ক্রুসকাল** **পুরো গ্রাফ** দেখে, সস্তা থেকে দামি ক্রমে এজ নেয়, আর সাইকেল বানালে বাদ দেয়।\n\nদুটোই একই মোট খরচ দেয়। পরের দুটো লেসনে প্রতিটা ধাপে ধাপে দেখানো হয়েছে।'
      ),
      scene(G_W, { edgeState: pick(G_W, MST), status: T(`both find cost ${costOf(MST)}`, `দুটোই খরচ ${costOf(MST)} পায়`) }),
      'yes'
    )
  ]
};

export const graphConceptTopics = [whatIsGraph, graphTerms, graphTypes, adjMatrix, adjList, edgeList, spanningTree];
