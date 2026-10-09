/**
 * BST Playground — interactive CRUD lesson.
 *
 * The steps of this lesson are NOT written by hand: App.jsx generates them from
 * the user's own tree with `src/visuals/bstGenerator.js`. This file holds the
 * topic card plus the code shown for each operation (5 languages, every variant
 * with the same number of lines so the active-line highlight lines up).
 */

import { runBstOp, BST_DEFAULT } from '../../visuals/bstGenerator.js';
import { codeFor } from '../../visuals/bstCode.js';

// The lesson's default content: building the default tree.
const DEFAULT_RUN = runBstOp(null, { type: 'build', ...BST_DEFAULT });
const DEFAULT_RUN_CODE = codeFor({ type: 'build' }, { queue: DEFAULT_RUN.queue, mode: DEFAULT_RUN.mode });

export const BST_OP_META = {
  build: { en: 'Create (insert the values one by one)', bn: 'তৈরি (মানগুলো একে একে ইনসার্ট)', time: 'O(n log n) avg · O(n²) worst' },
  insert: { en: 'Insert a key', bn: 'কী ঢোকানো (Insert)', time: 'O(h)' },
  search: { en: 'Search (Read one key)', bn: 'খোঁজা (Search)', time: 'O(h)' },
  delete: { en: 'Delete a key', bn: 'কী মোছা (Delete)', time: 'O(h)' },
  update: { en: 'Update = delete + insert', bn: 'আপডেট = ডিলিট + ইনসার্ট', time: 'O(h)' },
  traverse: { en: 'Traverse (visit every node)', bn: 'ট্রাভার্স (সব নোড দেখা)', time: 'O(n)' }
};

export const bstPlaygroundTopics = [
  {
    id: 'bst-crud-playground',
    name: { en: 'BST Playground: Create, Read, Update, Delete', bn: 'BST প্লেগ্রাউন্ড: তৈরি, পড়া, আপডেট, ডিলিট' },
    description: {
      en: 'Build your own BST from preorder, inorder or postorder values, then search, insert, update and delete — every move animated.',
      bn: 'প্রি-অর্ডার, ইন-অর্ডার বা পোস্ট-অর্ডার মান দিয়ে নিজের BST বানাও, তারপর সার্চ, ইনসার্ট, আপডেট ও ডিলিট — প্রতিটা ধাপ অ্যানিমেশনে।'
    },
    categoryKey: 'trees',
    level: 'beginner',
    order: 35,
    icon: '🧪',
    subgroupKey: 'bst',
    complexity: {
      time: 'O(h)',
      best: 'O(log n)',
      worst: 'O(n)',
      space: 'O(h)',
      note: {
        en: 'h = height of the tree. Balanced tree: h ≈ log n. Skewed tree (sorted inserts): h = n.',
        bn: 'h = ট্রির উচ্চতা। ব্যালান্সড ট্রি: h ≈ log n। একদিকে হেলে পড়া ট্রি (সাজানো ক্রমে ইনসার্ট): h = n।'
      }
    },
    code: DEFAULT_RUN_CODE.code,
    lineMap: DEFAULT_RUN_CODE.lineMap,
    // Default run (build the default tree). App.jsx swaps in the steps of whatever the user runs.
    steps: DEFAULT_RUN.steps
  }
];
