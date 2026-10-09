/* ------------------------------------------------------------------ *
 * Graph playground: your own graph, any algorithm.
 * App.jsx swaps in the steps and code of the learner's own run; these
 * defaults (BFS on the lesson graph) are what shows before the first run.
 * ------------------------------------------------------------------ */
import { runGraphOp, GRAPH_DEFAULT, ALGOS } from '../../visuals/graphPlayground.js';

const DEFAULT_RUN = runGraphOp(GRAPH_DEFAULT);

/** Shown in the description: what is running now. */
export const GRAPH_ALGO_META = Object.fromEntries(Object.entries(ALGOS).map(([k, a]) => [k, { ...a.full, time: a.time }]));

export const graphPlaygroundTopics = [
  {
    id: 'graph-playground',
    name: { en: 'Graph Playground: Your Own Graph', bn: 'গ্রাফ প্লেগ্রাউন্ড: তোমার নিজের গ্রাফ' },
    description: {
      en: 'Type your own edges, pick any algorithm — BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Prim, Kruskal, Kahn or DFS topological sort — and press ▶ Play to watch it run line by line.',
      bn: 'নিজের এজ লেখো, যেকোনো অ্যালগরিদম বাছো — BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Prim, Kruskal, Kahn বা DFS টপোলজিক্যাল সর্ট — আর ▶ প্লে চাপো, লাইন ধরে ধরে চলতে দেখো।'
    },
    categoryKey: 'graphs',
    subgroupKey: 'g-play',
    level: 'beginner',
    order: 10,
    icon: '🧪',
    complexity: {
      time: 'O(V + E)',
      space: 'O(V + E)',
      note: { en: 'The time shown is for the algorithm that is running now.', bn: 'যে অ্যালগরিদম এখন চলছে, সময়টা তার।' }
    },
    code: DEFAULT_RUN.code,
    lineMap: DEFAULT_RUN.lineMap,
    steps: DEFAULT_RUN.steps
  }
];
