import { foundationTopics } from './tree-foundations.js';
import { traversalTopics } from './tree-traversals.js';
import { bstOpsTopics } from './bst-ops.js';
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
    { key: 'foundations', label: { en: 'Tree Foundations & Math', bn: 'ট্রি ভিত্তি ও গণিত' } },
    { key: 'traversals', label: { en: 'Traversals & Construction', bn: 'ট্রাভার্সাল ও গঠন' } },
    { key: 'bst', label: { en: 'BST Operations & Analysis', bn: 'BST অপারেশন ও এনালাইসিস' } },
    { key: 'avl', label: { en: 'AVL Trees & Balancing', bn: 'AVL ট্রি ও ব্যালান্সিং' } },
    { key: 'multiway', label: { en: '2-3 Trees & B-Trees', bn: '২-৩ ট্রি ও B-ট্রি' } },
    { key: 'heaps', label: { en: 'Binary Heaps & Priority Queues', bn: 'হিপ ও প্রায়োরিটি কিউ' } }
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
