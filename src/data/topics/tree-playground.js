/* ------------------------------------------------------------------ *
 * Tree playground: your own values, any tree algorithm.
 * App.jsx swaps in the steps and code of the learner's own run; these
 * defaults (inorder on a balanced BST) show before the first run.
 * ------------------------------------------------------------------ */
import { runTreeOp, TREE_DEFAULT, TREE_ALGOS } from '../../visuals/treePlayground.js';

const DEFAULT_RUN = runTreeOp(TREE_DEFAULT);

/** Shown in the description: what is running now. */
export const TREE_ALGO_META = Object.fromEntries(Object.entries(TREE_ALGOS).map(([k, a]) => [k, { en: a.en, bn: a.bn, time: k === 'avl' ? 'O(n log n)' : k.startsWith('heap') ? 'O(log n) each' : 'O(n)' }]));

export const treePlaygroundTopics = [
  {
    id: 'tree-playground',
    name: { en: 'Tree Playground: Your Own Values', bn: 'ট্রি প্লেগ্রাউন্ড: তোমার নিজের মান' },
    description: {
      en: 'Type your own values, pick a tree algorithm — preorder, inorder, postorder, level order, AVL insert, build a min-heap or extract the minimum — and press ▶ Play to watch it run line by line.',
      bn: 'নিজের মান লেখো, একটা ট্রি অ্যালগরিদম বাছো — প্রি-অর্ডার, ইন-অর্ডার, পোস্ট-অর্ডার, লেভেল অর্ডার, AVL ইনসার্ট, মিন-হিপ বানানো বা মিনিমাম বের করা — আর ▶ প্লে চাপো, লাইন ধরে ধরে চলতে দেখো।'
    },
    categoryKey: 'trees',
    subgroupKey: 'playground',
    level: 'beginner',
    order: 20,
    icon: '🌲',
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      note: { en: 'The time shown is for the algorithm that is running now.', bn: 'যে অ্যালগরিদম এখন চলছে, সময়টা তার।' }
    },
    code: DEFAULT_RUN.code,
    lineMap: DEFAULT_RUN.lineMap,
    steps: DEFAULT_RUN.steps
  }
];
