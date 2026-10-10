/**
 * Builds the tree for the interactive "Tree Traversals" lesson from the
 * learner's input (as a BST, or level by level). The steps themselves come
 * from treePlayground.js (lessonTraversalSteps), the same engine as the Tree Playground.
 */

export function buildTree(inputStr, mode = 'bst') {
  if (!inputStr || !inputStr.trim()) return null;
  const rawParts = inputStr.split(/[\s,]+/).map((s) => s.trim()).filter(Boolean);
  if (!rawParts.length) return null;

  if (mode === 'level') {
    const nodes = rawParts.map((v) => ({ v: isNaN(Number(v)) ? v : Number(v) }));
    for (let i = 0; i < nodes.length; i++) {
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      if (l < nodes.length) nodes[i].l = nodes[l];
      if (r < nodes.length) nodes[i].r = nodes[r];
    }
    return nodes[0];
  }

  // Default: BST
  let root = null;
  function insert(node, val) {
    if (!node) return { v: val };
    const numVal = Number(val);
    const nodeVal = Number(node.v);
    const isNum = !isNaN(numVal) && !isNaN(nodeVal);
    const cmp = isNum ? numVal < nodeVal : String(val).localeCompare(String(node.v)) < 0;
    if (cmp) {
      node.l = insert(node.l, val);
    } else if (isNum ? numVal > nodeVal : String(val).localeCompare(String(node.v)) > 0) {
      node.r = insert(node.r, val);
    }
    return node;
  }

  rawParts.forEach((v) => {
    const val = isNaN(Number(v)) ? v : Number(v);
    root = insert(root, val);
  });
  return root;
}
