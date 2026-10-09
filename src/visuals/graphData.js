/**
 * The example graphs used across the Graphs chapter. Vertices are numbered
 * 0, 1, 2 … exactly like the arrays in the code, so the picture, the memory
 * boxes and the code always use the same names.
 */

const N = (list) => list.map(([id, x, y]) => ({ id, label: String(id), x, y }));
const E = (list) => list.map(([u, v, w]) => (w == null ? { u, v } : { u, v, w }));

/** A small friendly graph for the first lessons (5 cities / friends). */
export const G_INTRO = {
  V: 5,
  directed: false,
  weighted: false,
  nodes: N([[0, 70, 160], [1, 210, 60], [2, 210, 260], [3, 370, 60], [4, 370, 260]]),
  edges: E([[0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 4]])
};

/** Traversal graph: has a cycle (0-1-4-2-0) and a dead end (7), so BFS and DFS look different. */
export const G_TRAV = {
  V: 8,
  directed: false,
  weighted: false,
  nodes: N([[0, 300, 40], [1, 140, 140], [2, 300, 140], [3, 460, 140], [4, 220, 245], [5, 460, 245], [6, 340, 340], [7, 570, 340]]),
  edges: E([[0, 1], [0, 2], [0, 3], [1, 4], [2, 4], [3, 5], [4, 6], [5, 6], [5, 7]])
};

/** The weighted graph from the reference guide's C++ program (Graph g(6)). */
export const G_W = {
  V: 6,
  directed: false,
  weighted: true,
  nodes: N([[0, 60, 170], [1, 210, 60], [2, 210, 280], [3, 370, 170], [4, 520, 170], [5, 670, 170]]),
  edges: E([[0, 1, 4], [0, 2, 3], [1, 2, 1], [1, 3, 2], [2, 3, 4], [3, 4, 2], [4, 5, 6]])
};

/** Bellman-Ford: directed, with negative edges but no negative cycle (Abdul Bari's example, numbered from 0). */
export const G_BF = {
  V: 7,
  directed: true,
  weighted: true,
  nodes: N([[0, 60, 170], [1, 230, 50], [2, 230, 170], [3, 230, 290], [4, 410, 90], [5, 410, 260], [6, 570, 170]]),
  edges: E([[0, 1, 6], [0, 2, 5], [0, 3, 5], [1, 4, -1], [2, 1, -2], [2, 4, 1], [3, 2, -2], [3, 5, -1], [4, 6, 3], [5, 6, 3]])
};

/** A tiny graph with a negative cycle 1 → 2 → 1 (total −1), for the warning at the end of Bellman-Ford. */
export const G_NEGCYCLE = {
  V: 3,
  directed: true,
  weighted: true,
  nodes: N([[0, 60, 150], [1, 250, 150], [2, 450, 150]]),
  edges: E([[0, 1, 4], [1, 2, -3], [2, 1, 2]])
};

/** Floyd-Warshall: 4 vertices, directed (Abdul Bari's example, numbered from 0). */
export const G_FW = {
  V: 4,
  directed: true,
  weighted: true,
  nodes: N([[0, 80, 70], [1, 330, 70], [2, 330, 300], [3, 80, 300]]),
  edges: E([[0, 1, 3], [0, 3, 7], [1, 0, 8], [1, 2, 2], [2, 0, 5], [2, 3, 1], [3, 0, 2]])
};

/** A DAG of tasks for topological sort. */
export const G_DAG = {
  V: 6,
  directed: true,
  weighted: false,
  nodes: N([[5, 60, 60], [2, 240, 60], [3, 420, 60], [4, 60, 260], [0, 240, 170], [1, 420, 260]]),
  edges: E([[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]])
};

/** Adjacency list in the same order the code builds it (edges in list order; both ways if undirected). */
export function adjOf(g) {
  const adj = Array.from({ length: g.V }, () => []);
  for (const e of g.edges) {
    adj[e.u].push(g.weighted ? { v: e.v, w: e.w } : { v: e.v });
    if (!g.directed) adj[e.v].push(g.weighted ? { v: e.u, w: e.w } : { v: e.u });
  }
  return adj;
}

/** Edge-list literal for the code panel, 4 edges per line. */
export function edgeRows(g, lang) {
  const one = (e) => {
    const parts = g.weighted ? [e.u, e.v, e.w] : [e.u, e.v];
    if (lang === 'python') return `(${parts.join(', ')})`;
    if (lang === 'js') return `[${parts.join(', ')}]`;
    return `{${parts.join(', ')}}`;
  };
  const rows = [];
  for (let i = 0; i < g.edges.length; i += 4) rows.push(g.edges.slice(i, i + 4).map(one).join(', '));
  return rows;
}

export const INF = '∞';
