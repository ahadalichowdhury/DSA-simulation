/**
 * Graph playground: the learner types their own edges, picks an algorithm
 * and presses ▶ Play. This file turns that input into a graph (with an
 * automatic layout), checks it, and runs the same step generators and code
 * programs that the Graphs lessons use.
 *
 * op = { algo, edges: '0-1:4, 0-2:3', directed, start }
 */
import { G_TRAV, G_W, G_BF, G_NEGCYCLE, G_FW, G_DAG } from './graphData.js';
import { genBFS, genDFS, genDijkstra, genPrim, genKruskal, genBellmanFord, genFloyd, genKahn, genTopoDFS, weightMatrix } from './graphAlgos.js';
import { bfsProgram, dfsProgram, dijkstraProgram, primProgram, kruskalProgram, bellmanProgram, floydProgram, kahnProgram, topoDfsProgram } from './graphCode.js';

const T = (en, bn) => ({ en, bn });
const N = (list) => list.map(([id, x, y]) => ({ id, label: String(id), x, y }));
const E = (list) => list.map(([u, v, w]) => (w == null ? { u, v } : { u, v, w }));

/**
 * What each algorithm needs.
 * dir: 'either' (learner chooses), 'directed' or 'undirected' (fixed).
 */
export const ALGOS = {
  bfs: { en: 'BFS', bn: 'BFS', full: T('Breadth-First Search', 'ব্রেডথ-ফার্স্ট সার্চ'), weighted: false, dir: 'either', start: true, presets: 'traverse', time: 'O(V + E)', hint: T('Visits level by level with a queue.', 'queue দিয়ে লেভেল ধরে ধরে ভিজিট করে।') },
  dfs: { en: 'DFS', bn: 'DFS', full: T('Depth-First Search', 'ডেপথ-ফার্স্ট সার্চ'), weighted: false, dir: 'either', start: true, presets: 'traverse', time: 'O(V + E)', hint: T('Dives as deep as it can, then backtracks.', 'যত গভীরে পারে ডুব দেয়, তারপর ফিরে আসে।') },
  dijkstra: { en: 'Dijkstra', bn: 'ডাইকস্ট্রা', full: T("Dijkstra's shortest path", 'ডাইকস্ট্রার শর্টেস্ট পাথ'), weighted: true, dir: 'either', start: true, presets: 'weighted', time: 'O(V²)', hint: T('Shortest distance from the start to every vertex. Weights must not be negative.', 'শুরু থেকে প্রতিটা ভার্টেক্সের সবচেয়ে ছোট দূরত্ব। ওজন নেগেটিভ হতে পারবে না।') },
  bellman: { en: 'Bellman-Ford', bn: 'বেলম্যান-ফোর্ড', full: T('Bellman-Ford', 'বেলম্যান-ফোর্ড'), weighted: true, dir: 'directed', start: true, presets: 'bellman', time: 'O(V · E)', hint: T('Shortest distances even with negative weights; finds negative cycles.', 'নেগেটিভ ওজনেও সবচেয়ে ছোট দূরত্ব; নেগেটিভ সাইকেল ধরে।') },
  floyd: { en: 'Floyd-Warshall', bn: 'ফ্লয়েড-ওয়ার্শাল', full: T('Floyd-Warshall (all pairs)', 'ফ্লয়েড-ওয়ার্শাল (সব জোড়া)'), weighted: true, dir: 'either', start: false, presets: 'floyd', time: 'O(V³)', maxV: 7, hint: T('Shortest distance between every pair. Up to 7 vertices, so the table stays readable.', 'প্রতিটা জোড়ার সবচেয়ে ছোট দূরত্ব। সর্বোচ্চ ৭টা ভার্টেক্স, যাতে টেবিলটা পড়া যায়।') },
  prim: { en: 'Prim', bn: 'প্রিম', full: T("Prim's MST", 'প্রিমের MST'), weighted: true, dir: 'undirected', start: false, presets: 'weighted', time: 'O(V²)', connected: true, hint: T('Grows one cheapest tree from vertex 0. The graph must be connected.', 'ভার্টেক্স 0 থেকে একটা সবচেয়ে সস্তা ট্রি বড় করে। গ্রাফ যুক্ত হতে হবে।') },
  kruskal: { en: 'Kruskal', bn: 'ক্রুসকাল', full: T("Kruskal's MST", 'ক্রুসকালের MST'), weighted: true, dir: 'undirected', start: false, presets: 'weighted', time: 'O(E log E)', hint: T('Takes the cheapest edges first and skips cycles.', 'সস্তা এজ আগে নেয়, সাইকেল হলে বাদ দেয়।') },
  kahn: { en: 'Kahn', bn: 'কান', full: T("Kahn's topological sort", 'কান-এর টপোলজিক্যাল সর্ট'), weighted: false, dir: 'directed', start: false, presets: 'kahn', time: 'O(V + E)', hint: T('Orders tasks using in-degrees; spots cycles.', 'ইন-ডিগ্রি দিয়ে কাজ সাজায়; সাইকেল ধরে।') },
  topo: { en: 'Topo (DFS)', bn: 'টপো (DFS)', full: T('Topological sort with DFS', 'DFS দিয়ে টপোলজিক্যাল সর্ট'), weighted: false, dir: 'directed', start: false, presets: 'dag', time: 'O(V + E)', dag: true, hint: T('Orders tasks with DFS. The graph must have no cycle.', 'DFS দিয়ে কাজ সাজায়। গ্রাফে সাইকেল থাকা চলবে না।') }
};

export const ALGO_GROUPS = [
  { label: T('Traverse', 'ট্রাভার্স'), keys: ['bfs', 'dfs'] },
  { label: T('Shortest path', 'ছোট পথ'), keys: ['dijkstra', 'bellman', 'floyd'] },
  { label: T('Spanning tree', 'স্প্যানিং ট্রি'), keys: ['prim', 'kruskal'] },
  { label: T('Order', 'ক্রম'), keys: ['kahn', 'topo'] }
];

/* ------------------------------------------------------------ presets */

const CYCLE6 = { V: 6, directed: false, weighted: false, nodes: N([[0, 250, 40], [1, 420, 120], [2, 420, 280], [3, 250, 360], [4, 80, 280], [5, 80, 120]]), edges: E([[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]]) };
const ISLANDS = { V: 7, directed: false, weighted: false, nodes: N([[0, 80, 60], [1, 220, 60], [2, 150, 190], [3, 400, 60], [4, 540, 60], [5, 400, 190], [6, 540, 190]]), edges: E([[0, 1], [0, 2], [1, 2], [3, 4], [3, 5], [4, 6], [5, 6]]) };
const TREE7 = { V: 7, directed: false, weighted: false, nodes: N([[0, 300, 40], [1, 160, 150], [2, 440, 150], [3, 90, 260], [4, 230, 260], [5, 370, 260], [6, 510, 260]]), edges: E([[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]]) };
const GRIDW = { V: 6, directed: false, weighted: true, nodes: N([[0, 70, 70], [1, 260, 70], [2, 450, 70], [3, 70, 260], [4, 260, 260], [5, 450, 260]]), edges: E([[0, 1, 7], [1, 2, 8], [0, 3, 5], [1, 4, 2], [2, 5, 3], [3, 4, 6], [4, 5, 9], [1, 3, 4]]) };
const UNDIR_FW = { V: 4, directed: false, weighted: true, nodes: N([[0, 80, 70], [1, 330, 70], [2, 330, 300], [3, 80, 300]]), edges: E([[0, 1, 5], [1, 2, 1], [2, 3, 2], [3, 0, 9], [0, 2, 8]]) };
const COURSES = { V: 6, directed: true, weighted: false, nodes: N([[0, 60, 80], [1, 60, 260], [2, 240, 80], [3, 240, 260], [4, 420, 170], [5, 600, 170]]), edges: E([[0, 2], [1, 3], [2, 3], [2, 4], [3, 4], [4, 5]]) };
const DAG_CYCLE = { V: 5, directed: true, weighted: false, nodes: N([[0, 60, 170], [1, 230, 60], [2, 400, 60], [3, 400, 280], [4, 230, 280]]), edges: E([[0, 1], [1, 2], [2, 3], [3, 4], [4, 1]]) };

const P = (key, en, bn, g) => ({ key, label: T(en, bn), g });
export const PRESETS = {
  traverse: [P('lesson', 'Lesson graph', 'লেসনের গ্রাফ', G_TRAV), P('tree', 'A tree', 'একটা ট্রি', TREE7), P('cycle', 'One big cycle', 'একটা বড় সাইকেল', CYCLE6), P('islands', 'Two islands', 'দুটো দ্বীপ', ISLANDS)],
  weighted: [P('guide', 'Guide example', 'গাইডের উদাহরণ', G_W), P('grid', 'Grid of roads', 'রাস্তার গ্রিড', GRIDW)],
  bellman: [P('lesson', 'Negative edges', 'নেগেটিভ এজ', G_BF), P('negcycle', 'Negative cycle', 'নেগেটিভ সাইকেল', G_NEGCYCLE)],
  floyd: [P('lesson', 'Lesson graph', 'লেসনের গ্রাফ', G_FW), P('undirected', 'Two-way roads', 'দুই-মুখী রাস্তা', UNDIR_FW)],
  dag: [P('lesson', 'Tasks', 'কাজগুলো', G_DAG), P('courses', 'Course plan', 'কোর্সের পরিকল্পনা', COURSES)],
  kahn: [P('lesson', 'Tasks', 'কাজগুলো', G_DAG), P('courses', 'Course plan', 'কোর্সের পরিকল্পনা', COURSES), P('cycle', 'With a cycle', 'সাইকেলসহ', DAG_CYCLE)]
};

export const edgesText = (g) => g.edges.map((e) => `${e.u}-${e.v}${g.weighted ? `:${e.w}` : ''}`).join(', ');

export const presetOp = (algo, p) => ({ algo, edges: edgesText(p.g), directed: p.g.directed, start: 0 });

export const GRAPH_DEFAULT = presetOp('bfs', PRESETS.traverse[0]);


/* ------------------------------------------------------------ parsing */

const isDirected = (op) => (ALGOS[op.algo].dir === 'either' ? !!op.directed : ALGOS[op.algo].dir === 'directed');

const EDGE_RE = /^(\d+)\s*(?:->|→|-|>|–|\s)\s*(\d+)\s*(?:[:=(]\s*(-?\d+)\s*\)?)?$/;

/** Text → { V, edges } or { error }. */
export function parseEdges(text, { weighted, directed }) {
  const parts = String(text || '').split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean);
  if (parts.length === 0) return { error: T('Type at least one edge, like 0-1', 'অন্তত একটা এজ লেখো, যেমন 0-1') };
  if (parts.length > 20) return { error: T('Please use at most 20 edges, so the picture stays readable.', 'সর্বোচ্চ ২০টা এজ দাও, যাতে ছবিটা পরিষ্কার থাকে।') };
  const edges = [];
  const seen = new Set();
  for (const p of parts) {
    const m = p.match(EDGE_RE);
    if (!m) return { error: T(`"${p}" is not an edge. Write it like 0-1${weighted ? ':4 (from-to:weight)' : ' (from-to)'}.`, `"${p}" এজ নয়। এভাবে লেখো 0-1${weighted ? ':4 (থেকে-পর্যন্ত:ওজন)' : ' (থেকে-পর্যন্ত)'}।`) };
    const u = +m[1];
    const v = +m[2];
    if (u > 9 || v > 9) return { error: T('Use vertex numbers 0 to 9.', '০ থেকে ৯ পর্যন্ত ভার্টেক্স নম্বর ব্যবহার করো।') };
    if (u === v) return { error: T(`${p} joins ${u} to itself (a self-loop). Please remove it.`, `${p} ${u}-কে নিজের সঙ্গেই জোড়ে (সেলফ-লুপ)। এটা সরাও।`) };
    if (weighted && m[3] == null) return { error: T(`Edge ${u}-${v} needs a weight, like ${u}-${v}:4`, `এজ ${u}-${v}-এর ওজন দরকার, যেমন ${u}-${v}:4`) };
    const key = directed ? `${u}>${v}` : `${Math.min(u, v)}-${Math.max(u, v)}`;
    if (seen.has(key)) return { error: T(`Edge ${u}-${v} is written twice.`, `এজ ${u}-${v} দুবার লেখা হয়েছে।`) };
    seen.add(key);
    edges.push(weighted ? { u, v, w: +m[3] } : { u, v });
  }
  const V = Math.max(...edges.flatMap((e) => [e.u, e.v])) + 1;
  return { V, edges };
}

function reachableFrom(V, edges, directed, s) {
  const adj = Array.from({ length: V }, () => []);
  for (const e of edges) { adj[e.u].push(e.v); if (!directed) adj[e.v].push(e.u); }
  const seen = new Set([s]);
  const q = [s];
  while (q.length) { const u = q.shift(); for (const v of adj[u]) if (!seen.has(v)) { seen.add(v); q.push(v); } }
  return seen;
}

function hasCycleDirected(V, edges) {
  const indeg = Array(V).fill(0);
  const adj = Array.from({ length: V }, () => []);
  for (const e of edges) { adj[e.u].push(e.v); indeg[e.v]++; }
  const q = [];
  for (let v = 0; v < V; v++) if (indeg[v] === 0) q.push(v);
  let n = 0;
  while (q.length) { const u = q.shift(); n++; for (const v of adj[u]) if (--indeg[v] === 0) q.push(v); }
  return n < V;
}

/** null when the op can run, otherwise a bilingual message. */
export function checkGraphOp(op) {
  const A = ALGOS[op?.algo];
  if (!A) return T('Pick an algorithm.', 'একটা অ্যালগরিদম বাছো।');
  const directed = isDirected(op);
  const parsed = parseEdges(op.edges, { weighted: A.weighted, directed });
  if (parsed.error) return parsed.error;
  const { V, edges } = parsed;
  if (A.maxV && V > A.maxV) return T(`${A.en} draws a V × V table, so use at most ${A.maxV} vertices (0 to ${A.maxV - 1}).`, `${A.bn} একটা V × V টেবিল আঁকে, তাই সর্বোচ্চ ${A.maxV}টা ভার্টেক্স (0 থেকে ${A.maxV - 1}) দাও।`);
  if (A.start) {
    if (String(op.start ?? '').trim() === '') return T('Type the start vertex.', 'শুরুর ভার্টেক্স লেখো।');
    const s = Number(op.start);
    if (!Number.isInteger(s) || s < 0 || s >= V) return T(`The start must be a vertex from 0 to ${V - 1}.`, `শুরু 0 থেকে ${V - 1}-এর মধ্যে একটা ভার্টেক্স হতে হবে।`);
  }
  if (op.algo === 'dijkstra') {
    const neg = edges.find((e) => e.w < 0);
    if (neg) return T(`Edge ${neg.u}-${neg.v} has a negative weight. Dijkstra can give wrong answers then — try Bellman-Ford.`, `এজ ${neg.u}-${neg.v}-এর ওজন নেগেটিভ। তখন Dijkstra ভুল উত্তর দিতে পারে — Bellman-Ford চেষ্টা করো।`);
  }
  if (A.connected && reachableFrom(V, edges, false, 0).size < V) return T(`${A.en} needs a connected graph: some vertices cannot be reached from 0. Kruskal works on any graph.`, `${A.bn}-এর জন্য যুক্ত গ্রাফ লাগে: কিছু ভার্টেক্সে 0 থেকে যাওয়া যায় না। ক্রুসকাল যেকোনো গ্রাফে চলে।`);
  if (A.dag && hasCycleDirected(V, edges)) return T('This graph has a cycle, so no topological order exists. Try Kahn — it shows where it gets stuck.', 'এই গ্রাফে সাইকেল আছে, তাই কোনো টপোলজিক্যাল অর্ডার নেই। কান চেষ্টা করো — কোথায় আটকায় দেখাবে।');
  return null;
}

/* ------------------------------------------------------------ layout */

/** Place vertices in rows (BFS levels) or, for a DAG, in columns (longest path). */
function layout(V, edges, directed, root) {
  const pos = Array(V);
  const nbrs = Array.from({ length: V }, () => []);
  for (const e of edges) { nbrs[e.u].push(e.v); nbrs[e.v].push(e.u); }

  if (directed && !hasCycleDirected(V, edges)) {
    const depth = Array(V).fill(0);
    const indeg = Array(V).fill(0);
    const out = Array.from({ length: V }, () => []);
    for (const e of edges) { out[e.u].push(e.v); indeg[e.v]++; }
    const q = [];
    for (let v = 0; v < V; v++) if (indeg[v] === 0) q.push(v);
    while (q.length) { const u = q.shift(); for (const v of out[u]) { depth[v] = Math.max(depth[v], depth[u] + 1); if (--indeg[v] === 0) q.push(v); } }
    const cols = [];
    for (let v = 0; v < V; v++) (cols[depth[v]] = cols[depth[v]] || []).push(v);
    const tallest = Math.max(...cols.map((c) => c.length));
    cols.forEach((col, d) => {
      if (d > 0) col.sort((a, b) => avgY(a) - avgY(b));
      col.forEach((v, i) => { pos[v] = { x: 60 + d * 170, y: 50 + ((tallest - col.length) / 2 + i) * 110 }; });
    });
    function avgY(v) { const ys = edges.filter((e) => e.v === v && pos[e.u]).map((e) => pos[e.u].y); return ys.length ? ys.reduce((a, b) => a + b, 0) / ys.length : 0; }
    return pos;
  }

  // BFS levels from the root; other islands get their own rows underneath
  const level = Array(V).fill(-1);
  const rows = [];
  let base = 0;
  const order = [root, ...Array.from({ length: V }, (_, i) => i).filter((i) => i !== root)];
  for (const s of order) {
    if (level[s] !== -1) continue;
    level[s] = base;
    const q = [s];
    let deepest = base;
    while (q.length) {
      const u = q.shift();
      (rows[level[u]] = rows[level[u]] || []).push(u);
      deepest = Math.max(deepest, level[u]);
      for (const v of nbrs[u]) if (level[v] === -1) { level[v] = level[u] + 1; q.push(v); }
    }
    base = deepest + 1;
  }
  const widest = Math.max(...rows.map((r) => r.length));
  const W = Math.max(widest, 2) * 130;
  rows.forEach((row, r) => {
    if (r > 0) {
      // keep each vertex near the neighbours placed above it (fewer crossings)
      const avgX = (v) => { const xs = nbrs[v].filter((n) => pos[n]).map((n) => pos[n].x); return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : W / 2; };
      row.sort((a, b) => avgX(a) - avgX(b));
    }
    const gap = W / row.length;
    // a slight zig-zag stops an edge from running straight through a middle vertex
    row.forEach((v, i) => { pos[v] = { x: 40 + gap * (i + 0.5), y: 40 + r * 105 + (row.length > 2 && i % 2 ? 18 : 0) }; });
  });
  return pos;
}

/** The op as a graph object the generators understand. */
export function graphOf(op) {
  const A = ALGOS[op.algo];
  const directed = isDirected(op);
  const { V, edges } = parseEdges(op.edges, { weighted: A.weighted, directed });
  // a preset keeps its hand-made positions
  const text = String(op.edges).replace(/\s+/g, '');
  for (const list of Object.values(PRESETS)) {
    for (const p of list) {
      const same = edgesText({ ...p.g, weighted: A.weighted && p.g.weighted }).replace(/\s+/g, '') === text;
      if (same && p.g.V === V) return { V, directed, weighted: A.weighted, nodes: p.g.nodes, edges };
    }
  }
  const pos = layout(V, edges, directed, A.start ? Number(op.start) : 0);
  return { V, directed, weighted: A.weighted, nodes: pos.map((p, id) => ({ id, label: String(id), x: p.x, y: p.y })), edges };
}

/* ------------------------------------------------------------ run */

/** Run the op: { steps, code, lineMap }. Call checkGraphOp first. */
export function runGraphOp(op) {
  const g = graphOf(op);
  const s = Number(op.start) || 0;
  const pick = {
    bfs: () => [genBFS(g, s), bfsProgram(g, s)],
    dfs: () => [genDFS(g, s), dfsProgram(g, s)],
    dijkstra: () => [genDijkstra(g, s), dijkstraProgram(g, s)],
    bellman: () => [genBellmanFord(g, s, null), bellmanProgram(g, s)],
    floyd: () => [genFloyd(g), floydProgram(g, weightMatrix(g))],
    prim: () => [genPrim(g), primProgram(g)],
    kruskal: () => [genKruskal(g), kruskalProgram(g)],
    kahn: () => [genKahn(g, null), kahnProgram(g)],
    topo: () => [genTopoDFS(g), topoDfsProgram(g)]
  }[op.algo];
  const [steps, prog] = pick();
  return { steps, code: prog.code, lineMap: prog.lineMap, graph: g };
}

/** A random graph that suits the algorithm (connected; a DAG when needed; no negative cycle). */
export function randomOp(algo, directed) {
  const A = ALGOS[algo];
  const V = 6 + Math.floor(Math.random() * 2);
  const dir = A.dir === 'either' ? !!directed : A.dir === 'directed';
  const perm = Array.from({ length: V }, (_, i) => i).sort(() => Math.random() - 0.5);
  const pairs = new Set();
  const list = [];
  const add = (a, b) => {
    const k = `${Math.min(a, b)}-${Math.max(a, b)}`;
    if (a === b || pairs.has(k)) return;
    pairs.add(k);
    list.push([a, b]);
  };
  for (let v = 1; v < V; v++) add(Math.floor(Math.random() * v), v);
  for (let k = 0; k < 3; k++) add(Math.floor(Math.random() * V), Math.floor(Math.random() * V));
  const acyclic = algo === 'kahn' || algo === 'topo' || algo === 'bellman';
  const edges = list.map(([a, b]) => {
    // for an acyclic result the arrow always goes from the smaller rank to the bigger one
    let [u, v] = acyclic ? [perm[Math.min(a, b)], perm[Math.max(a, b)]] : [a, b];
    if (dir && !acyclic && Math.random() < 0.5) [u, v] = [v, u];
    const w = algo === 'bellman' ? Math.floor(Math.random() * 12) - 3 : 1 + Math.floor(Math.random() * 9);
    return `${u}-${v}${A.weighted ? `:${w}` : ''}`;
  });
  return { algo, edges: edges.join(', '), directed: dir, start: 0 };
}
