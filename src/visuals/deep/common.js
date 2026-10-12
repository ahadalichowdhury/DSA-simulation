/* ------------------------------------------------------------------ *
 * Shared helpers for the "deep dive" steps of the Graphs chapter.
 *
 * Deep-dive steps follow the way Shafaet's Planet (shafaetsplanet.com)
 * teaches each algorithm in Bangla: a real-life problem first, the rules
 * written down, one example run by hand, then the extras a programmer
 * needs (path printing, variants, the cost, contest tips and practice
 * problems). The text is our own; every number comes from really running
 * the algorithm here, so pictures and words always agree.
 * ------------------------------------------------------------------ */

export const T = (en, bn) => (en === bn ? en : { en, bn });
export const ek = (u, v) => `${u}-${v}`;
export const fmt = (x) => (x === Infinity ? '∞' : String(x));
export const scene = (g, extra = {}) => ({ kind: 'graphx', directed: g.directed, weighted: g.weighted, nodes: g.nodes, edges: g.edges, ...extra });
export const step = (title, explanation, sc, extra = {}) => ({ title, explanation, scene: sc, ...extra });
export const N = (list) => list.map(([id, x, y, label]) => ({ id, label: label ?? String(id), x, y }));
export const allEdges = (g, st) => Object.fromEntries(g.edges.map((e) => [ek(e.u, e.v), st]));
export const allNodes = (g, st) => Object.fromEntries(g.nodes.map((n) => [n.id, st]));
/** The key of an edge as it is stored in g.edges (undirected edges may be stored either way round). */
export const keyOf = (g, u, v) => (g.edges.some((e) => e.u === u && e.v === v) ? ek(u, v) : ek(v, u));

/** A "practice problems" board: rows of [name, what it trains]. */
export function practiceStep(g, title, intro, problems, extra = {}) {
  const items = problems.map(([name, en, bn]) => T(`**${name}** — ${en}`, `**${name}** — ${bn}`));
  return step(
    title,
    intro,
    scene(g, { ...extra, panels: [{ type: 'list', label: T('practice — solve these yourself', 'প্র্যাকটিস — নিজে সমাধান করো'), items }] })
  );
}

/** A numbered "rules" board drawn under the graph. */
export const rulesPanel = (label, items, active) => ({ type: 'list', label, items, ...(active != null ? { active } : {}) });
