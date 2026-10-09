import { foundationTopics } from './tree-foundations.js';
import { traversalTopics } from './tree-traversals.js';
import { bstOpsTopics } from './bst-ops.js';
import { bstPlaygroundTopics } from './bst-playground.js';
import { avlTopics } from './avl.js';
import { multiwayTopics } from './multiway.js';
import { treeTopics } from './trees.js';
import { treePlaygroundTopics } from './tree-playground.js';
import { graphConceptTopics } from './graph-concepts.js';
import { graphAlgorithmTopics } from './graph-algorithms.js';
import { graphPlaygroundTopics } from './graph-playground.js';

/** Active chapters, in course order. */
export const CATEGORIES = [
  { key: 'trees', label: { en: 'Tree Data Structures', bn: 'ট্রি ডেটা স্ট্রাকচার' } },
  { key: 'graphs', label: { en: 'Graph Data Structures', bn: 'গ্রাফ ডেটা স্ট্রাকচার' } }
];

/**
 * Sub-topics shown inside the Trees curriculum.
 * Each section covers a major domain from the 3 masterclass textbooks.
 */
export const SUBGROUPS = {
  trees: [
    { key: 'foundations', label: { en: 'Tree Basics', bn: 'ট্রির বেসিক' }, desc: { en: 'Words, shapes, counting trees, storing them in memory', bn: 'শব্দ, আকার, ট্রি গোনা, মেমরিতে রাখা' } },
    { key: 'traversals', label: { en: 'Traversals', bn: 'ট্রাভার্সাল' }, desc: { en: 'Visiting every node: pre, in, post, level order', bn: 'সব নোড ঘোরা: প্রি, ইন, পোস্ট, লেভেল অর্ডার' } },
    { key: 'bst', label: { en: 'Binary Search Tree (BST)', bn: 'বাইনারি সার্চ ট্রি (BST)' }, desc: { en: 'Search, insert, delete, successor', bn: 'সার্চ, ইনসার্ট, ডিলিট, সাকসেসর' } },
    { key: 'avl', label: { en: 'Self-Balancing Trees', bn: 'নিজে ব্যালান্স হওয়া ট্রি' }, desc: { en: 'AVL rotations and Red-Black trees', bn: 'AVL রোটেশন আর রেড-ব্ল্যাক ট্রি' } },
    { key: 'multiway', label: { en: 'Multiway Trees', bn: 'মাল্টিওয়ে ট্রি' }, desc: { en: '2-3, B and B+ trees used by databases', bn: 'ডেটাবেসে ব্যবহৃত ২-৩, B ও B+ ট্রি' } },
    { key: 'heaps', label: { en: 'Heaps & Priority Queues', bn: 'হিপ ও প্রায়োরিটি কিউ' }, desc: { en: 'Always get the smallest (or biggest) first', bn: 'সবসময় সবচেয়ে ছোট (বা বড়) আগে পাও' } },
    { key: 'playground', label: { en: 'Tree Playgrounds', bn: 'ট্রি প্লেগ্রাউন্ড' }, desc: { en: 'Your own values, any tree algorithm, ▶ Play', bn: 'নিজের মান, যেকোনো ট্রি অ্যালগরিদম, ▶ প্লে' } }
  ],
  graphs: [
    { key: 'g-basics', label: { en: 'Graph Basics', bn: 'গ্রাফের বেসিক' }, desc: { en: 'Vertices, edges, degree, paths and kinds of graphs', bn: 'ভার্টেক্স, এজ, ডিগ্রি, পাথ আর গ্রাফের ধরন' } },
    { key: 'g-store', label: { en: 'Storing a Graph', bn: 'গ্রাফ রাখার উপায়' }, desc: { en: 'Adjacency matrix, adjacency list, edge list', bn: 'অ্যাডজাসেন্সি ম্যাট্রিক্স, লিস্ট, এজ লিস্ট' } },
    { key: 'g-traverse', label: { en: 'Graph Traversals', bn: 'গ্রাফ ট্রাভার্সাল' }, desc: { en: 'Visit every vertex: BFS and DFS', bn: 'সব ভার্টেক্স ঘোরা: BFS আর DFS' } },
    { key: 'g-mst', label: { en: 'Minimum Spanning Trees', bn: 'মিনিমাম স্প্যানিং ট্রি' }, desc: { en: 'Connect everything cheaply: Prim and Kruskal', bn: 'সস্তায় সব জোড়া: প্রিম আর ক্রুসকাল' } },
    { key: 'g-shortest', label: { en: 'Shortest Paths', bn: 'সবচেয়ে ছোট পথ' }, desc: { en: 'Dijkstra, Bellman-Ford, Floyd-Warshall', bn: 'ডাইকস্ট্রা, বেলম্যান-ফোর্ড, ফ্লয়েড-ওয়ার্শাল' } },
    { key: 'g-topo', label: { en: 'Topological Sort', bn: 'টপোলজিক্যাল সর্ট' }, desc: { en: 'Put tasks in a valid order', bn: 'কাজগুলো সঠিক ক্রমে সাজানো' } },
    { key: 'g-play', label: { en: 'Graph Playground', bn: 'গ্রাফ প্লেগ্রাউন্ড' }, desc: { en: 'Your own graph, any algorithm, ▶ Play', bn: 'নিজের গ্রাফ, যেকোনো অ্যালগরিদম, ▶ প্লে' } }
  ]
};

export const categoryOrder = CATEGORIES.map((c) => c.key);

const byKey = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));

function decorate(topic, index) {
  const cat = byKey[topic.categoryKey] || CATEGORIES[0];
  const groups = SUBGROUPS[cat.key] || [];
  const grp = groups.find((g) => g.key === topic.subgroupKey);
  return {
    ...topic,
    categoryKey: cat.key,
    category: cat.label,
    subgroup: grp || null,
    subgroupIndex: grp ? groups.indexOf(grp) : -1,
    order: index + 1
  };
}

const raw = [
  ...foundationTopics,
  ...traversalTopics,
  ...bstOpsTopics,
  ...bstPlaygroundTopics,
  ...avlTopics,
  ...multiwayTopics,
  ...treeTopics,
  ...treePlaygroundTopics,
  ...graphConceptTopics,
  ...graphAlgorithmTopics,
  ...graphPlaygroundTopics
];

export const topics = raw
  .filter(Boolean)
  .sort((a, b) => {
    const ca = categoryOrder.indexOf(a.categoryKey || 'trees');
    const cb = categoryOrder.indexOf(b.categoryKey || 'trees');
    if (ca !== cb) return ca - cb;
    const groups = SUBGROUPS[a.categoryKey || 'trees'] || [];
    const ga = groups.findIndex((g) => g.key === a.subgroupKey);
    const gb = groups.findIndex((g) => g.key === b.subgroupKey);
    if (ga !== gb) return ga - gb;
    return (a.order || 0) - (b.order || 0);
  })
  .map(decorate);

export function getTopic(id) {
  return topics.find((t) => t.id === id) || topics[0];
}
