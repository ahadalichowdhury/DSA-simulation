import { foundationTopics } from './tree-foundations.js';
import { traversalTopics } from './tree-traversals.js';
import { bstOpsTopics } from './bst-ops.js';
import { bstPlaygroundTopics } from './bst-playground.js';
import { avlTopics } from './avl.js';
import { multiwayTopics } from './multiway.js';
import { treeTopics } from './trees.js';

/** Active categories: Focused exclusively on Tree Data Structures */
export const CATEGORIES = [
  { key: 'trees', label: { en: 'Tree Data Structures', bn: 'ট্রি ডেটা স্ট্রাকচার' } }
];

/**
 * Sub-topics shown inside the Trees curriculum.
 * Each section covers a major domain from the 3 masterclass textbooks.
 */
export const SUBGROUPS = {
  trees: [
    { key: 'foundations', label: { en: 'Tree Basics', bn: 'ট্রির বেসিক' }, desc: { en: 'Words, shapes, counting trees, storing them in memory', bn: 'শব্দ, আকার, ট্রি গোনা, মেমরিতে রাখা' } },
    { key: 'traversals', label: { en: 'Traversals', bn: 'ট্রাভার্সাল' }, desc: { en: 'Visiting every node: pre, in, post, level order', bn: 'সব নোড ঘোরা: প্রি, ইন, পোস্ট, লেভেল অর্ডার' } },
    { key: 'bst', label: { en: 'Binary Search Tree (BST)', bn: 'বাইনারি সার্চ ট্রি (BST)' }, desc: { en: 'Search, insert, delete — and the playground', bn: 'সার্চ, ইনসার্ট, ডিলিট — আর প্লেগ্রাউন্ড' } },
    { key: 'avl', label: { en: 'Self-Balancing Trees', bn: 'নিজে ব্যালান্স হওয়া ট্রি' }, desc: { en: 'AVL rotations and Red-Black trees', bn: 'AVL রোটেশন আর রেড-ব্ল্যাক ট্রি' } },
    { key: 'multiway', label: { en: 'Multiway Trees', bn: 'মাল্টিওয়ে ট্রি' }, desc: { en: '2-3, B and B+ trees used by databases', bn: 'ডেটাবেসে ব্যবহৃত ২-৩, B ও B+ ট্রি' } },
    { key: 'heaps', label: { en: 'Heaps & Priority Queues', bn: 'হিপ ও প্রায়োরিটি কিউ' }, desc: { en: 'Always get the smallest (or biggest) first', bn: 'সবসময় সবচেয়ে ছোট (বা বড়) আগে পাও' } }
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
  ...treeTopics
];

export const topics = raw
  .filter(Boolean)
  .sort((a, b) => {
    const groups = SUBGROUPS.trees;
    const ga = groups.findIndex((g) => g.key === a.subgroupKey);
    const gb = groups.findIndex((g) => g.key === b.subgroupKey);
    if (ga !== gb) return ga - gb;
    return (a.order || 0) - (b.order || 0);
  })
  .map(decorate);

export function getTopic(id) {
  return topics.find((t) => t.id === id) || topics[0];
}
