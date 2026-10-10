/**
 * Tree playground: the learner types values, picks a tree algorithm and
 * presses ▶ Play. Like the graph playground, every run is a real trace:
 * one step per executed code line, drawn with the animated tree canvas
 * (scene kind 'bst', which tweens nodes when rotations or swaps move them).
 *
 * op = { algo, values: '50, 30, 70', shape: 'bst' | 'level' }
 */
import { program } from './codeTags.js';
import { genTraverse } from './bstGenerator.js';
import { TEXT as BST_TEXT, traversalFn } from './bstCode.js';

const T = (en, bn) => (en === bn ? en : { en, bn });
const fmt = (a) => (a.length ? a.join(', ') : '—');

/* ================================================================ algorithms */

export const TREE_ALGOS = {
  preorder: { en: 'Preorder', bn: 'প্রি-অর্ডার', group: 'traverse', shape: true, hint: T('Root → Left → Right.', 'রুট → বাম → ডান।') },
  inorder: { en: 'Inorder', bn: 'ইন-অর্ডার', group: 'traverse', shape: true, hint: T('Left → Root → Right. On a BST the output is sorted.', 'বাম → রুট → ডান। BST-তে আউটপুট সাজানো আসে।') },
  postorder: { en: 'Postorder', bn: 'পোস্ট-অর্ডার', group: 'traverse', shape: true, hint: T('Left → Right → Root. Children before parents.', 'বাম → ডান → রুট। প্যারেন্টের আগে চাইল্ড।') },
  levelorder: { en: 'Level order', bn: 'লেভেল অর্ডার', group: 'traverse', shape: true, hint: T('Row by row with a queue (BFS on a tree).', 'queue দিয়ে সারি ধরে ধরে (ট্রিতে BFS)।') },
  avl: { en: 'AVL insert', bn: 'AVL ইনসার্ট', group: 'avl', shape: false, hint: T('Inserts the values one by one and rotates whenever a node gets unbalanced.', 'মানগুলো একে একে ইনসার্ট করে, কোনো নোড অসমান হলেই রোটেট করে।') },
  heapBuild: { en: 'Build min-heap', bn: 'মিন-হিপ বানাও', group: 'heap', shape: false, hint: T('Inserts the values one by one; each new value bubbles up while its parent is bigger.', 'মানগুলো একে একে ইনসার্ট; প্যারেন্ট বড় হলে নতুন মান ওপরে ওঠে।') },
  heapExtract: { en: 'Extract min', bn: 'মিন বের করো', group: 'heap', shape: false, hint: T('Builds the heap, then removes the smallest value and sinks the last value down.', 'হিপ বানায়, তারপর সবচেয়ে ছোট মান বের করে শেষ মানটা নিচে নামায়।') }
};

export const TREE_GROUPS = [
  { label: T('Traverse', 'ট্রাভার্স'), keys: ['preorder', 'inorder', 'postorder', 'levelorder'] },
  { label: T('Self-balancing', 'নিজে ব্যালান্স'), keys: ['avl'] },
  { label: T('Heap', 'হিপ'), keys: ['heapBuild', 'heapExtract'] }
];

const P = (en, bn, values, shape = 'bst') => ({ label: T(en, bn), values, shape });
export const TREE_PRESETS = {
  traverse: [P('Balanced BST', 'ব্যালান্সড BST', '50, 30, 70, 20, 40, 60, 80'), P('Leaning tree', 'হেলানো ট্রি', '10, 20, 30, 25, 40'), P('Numbers 1–7, level by level', '১–৭, লেভেল ধরে', '1, 2, 3, 4, 5, 6, 7', 'level')],
  avl: [P('Sorted 10–70 (many rotations)', 'সাজানো ১০–৭০ (অনেক রোটেশন)', '10, 20, 30, 40, 50, 60, 70'), P('Zig-zag (LR and RL cases)', 'আঁকাবাঁকা (LR আর RL)', '30, 10, 20, 40, 60, 50'), P('Already balanced', 'আগেই ব্যালান্সড', '40, 20, 60, 10, 30, 50, 70')],
  heap: [P('Mixed numbers', 'মিশ্র সংখ্যা', '40, 20, 50, 10, 30, 5'), P('Big to small', 'বড় থেকে ছোট', '70, 60, 50, 40, 30, 20, 10'), P('Already a heap', 'আগেই হিপ', '5, 10, 20, 30, 40')]
};
export const presetsOf = (algo) => TREE_PRESETS[TREE_ALGOS[algo].group];
export const TREE_DEFAULT = { algo: 'inorder', values: TREE_PRESETS.traverse[0].values, shape: 'bst' };

/* ================================================================ input */

export function parseValues(text) {
  const parts = String(text || '').split(/[\s,;]+/).filter(Boolean);
  if (!parts.length) return { error: T('Type a few numbers, like 50, 30, 70', 'কয়েকটা সংখ্যা লেখো, যেমন 50, 30, 70') };
  if (parts.length > 15) return { error: T('Please use at most 15 values, so the tree fits on screen.', 'সর্বোচ্চ ১৫টা মান দাও, যাতে ট্রি স্ক্রিনে আঁটে।') };
  const vals = [];
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return { error: T(`"${p}" is not a whole number from 0 to 999.`, `"${p}" ০ থেকে ৯৯৯-এর পূর্ণ সংখ্যা নয়।`) };
    const v = Number(p);
    if (vals.includes(v)) return { error: T(`${v} appears twice. Please use different numbers.`, `${v} দুবার আছে। আলাদা আলাদা সংখ্যা দাও।`) };
    vals.push(v);
  }
  return { vals };
}

export const checkTreeOp = (op) => (TREE_ALGOS[op?.algo] ? parseValues(op.values).error || null : T('Pick an algorithm.', 'একটা অ্যালগরিদম বাছো।'));

/* ================================================================ trees */

const cloneT = (n) => (n ? { v: n.v, l: cloneT(n.l), r: cloneT(n.r) } : null);
function bstInsert(root, v) {
  if (!root) return { v, l: null, r: null };
  if (v < root.v) root.l = bstInsert(root.l, v);
  else root.r = bstInsert(root.r, v);
  return root;
}
const buildBST = (vals) => vals.reduce((r, v) => bstInsert(r, v), null);
/** Array → complete binary tree (index i has children 2i+1 and 2i+2). */
function fromArray(arr) {
  const nodes = arr.map((v) => ({ v, l: null, r: null }));
  nodes.forEach((n, i) => { n.l = nodes[2 * i + 1] || null; n.r = nodes[2 * i + 2] || null; });
  return nodes[0] || null;
}
const buildTreeOf = (vals, shape) => (shape === 'level' ? fromArray(vals) : buildBST(vals));

const frame = (root, o = {}) => ({ kind: 'bst', root: cloneT(root), ...o });
function pathTo(root, v) {
  const out = [];
  (function walk(n) { if (!n) return false; out.push(n.v); if (n.v === v || walk(n.l) || walk(n.r)) return true; out.pop(); return false; })(root);
  return out;
}
const lit = (path) => path.slice(1).map((v, i) => [path[i], v]);
const states = (map) => { const s = {}; for (const [k, vs] of Object.entries(map)) for (const v of [].concat(vs ?? [])) if (v != null) s[v] = k; return s; };

/* ================================================================ code */

const TEXT = {
  ...BST_TEXT,
  q_main: ['MAIN', 'MAIN (মূল অংশ)'],
  q_values: ['the values you typed', 'তোমার লেখা মানগুলো'],
  q_bst: ['Build a BST: insert the values one by one', 'BST বানাও: মানগুলো একে একে ইনসার্ট করো'],
  q_level: ['Build level by level: index i has children 2i+1 and 2i+2', 'লেভেল ধরে বানাও: i-এর চাইল্ড 2i+1 আর 2i+2'],
  q_bstP: ['root = insert each value (smaller left, bigger right)', 'root = প্রতিটা মান ইনসার্ট (ছোট বামে, বড় ডানে)'],
  q_levelP: ['root = place the values row by row, left to right', 'root = মানগুলো সারি ধরে, বাম থেকে ডানে বসাও'],
  // level order
  l_p0: ['LEVEL-ORDER(root)', 'LEVEL-ORDER(root)'],
  l_p1: ['    queue = [root]', '    queue = [root]'],
  l_p2: ['    while the queue is not empty:', '    যতক্ষণ queue খালি না:'],
  l_p3: ['        node = take the FRONT of the queue', '        node = queue-এর সামনে থেকে নাও'],
  l_p4: ['        print node', '        node প্রিন্ট করো'],
  l_p5: ['        if node has a left child: add it to the BACK', '        বাম চাইল্ড থাকলে: পেছনে যোগ করো'],
  l_p6: ['        if node has a right child: add it to the BACK', '        ডান চাইল্ড থাকলে: পেছনে যোগ করো'],
  l_c1: ['A queue keeps the nodes in row order', 'queue নোডগুলোকে সারির ক্রমে রাখে'],
  // AVL
  a_p0: ['INSERT(node, value)', 'INSERT(node, value)'],
  a_p1: ['    if node is empty: return a new node', '    node খালি হলে: নতুন নোড ফেরত দাও'],
  a_p2: ['    if value < node.data: node.left = INSERT(node.left, value)', '    value < node.data হলে: node.left = INSERT(node.left, value)'],
  a_p3: ['    else: node.right = INSERT(node.right, value)', '    নইলে: node.right = INSERT(node.right, value)'],
  a_p4: ['    node.height = 1 + max(height(left), height(right))', '    node.height = 1 + max(height(left), height(right))'],
  a_p5: ['    bf = height(left) − height(right)      ← balance factor', '    bf = height(left) − height(right)      ← ব্যালান্স ফ্যাক্টর'],
  a_p6: ['    if bf > 1 and value < node.left.data: return ROTATE-RIGHT(node)     ← LL', '    bf > 1 আর value < node.left.data হলে: ROTATE-RIGHT(node)     ← LL'],
  a_p7: ['    if bf < −1 and value > node.right.data: return ROTATE-LEFT(node)    ← RR', '    bf < −1 আর value > node.right.data হলে: ROTATE-LEFT(node)    ← RR'],
  a_p8: ['    if bf > 1 and value > node.left.data:                               ← LR', '    bf > 1 আর value > node.left.data হলে:                               ← LR'],
  a_p9: ['        node.left = ROTATE-LEFT(node.left)', '        node.left = ROTATE-LEFT(node.left)'],
  a_p10: ['        return ROTATE-RIGHT(node)', '        ROTATE-RIGHT(node) ফেরত দাও'],
  a_p11: ['    if bf < −1 and value < node.right.data:                              ← RL', '    bf < −1 আর value < node.right.data হলে:                              ← RL'],
  a_p12: ['        node.right = ROTATE-RIGHT(node.right)', '        node.right = ROTATE-RIGHT(node.right)'],
  a_p13: ['        return ROTATE-LEFT(node)', '        ROTATE-LEFT(node) ফেরত দাও'],
  a_p14: ['    return node                             ← balanced, nothing to fix', '    node ফেরত দাও                             ← ব্যালান্সড, কিছু ঠিক করার নেই'],
  a_r0: ['ROTATE-RIGHT(y): x = y.left; y.left = x.right; x.right = y; update heights; return x', 'ROTATE-RIGHT(y): x = y.left; y.left = x.right; x.right = y; উচ্চতা আপডেট; x ফেরত'],
  a_r1: ['ROTATE-LEFT(x):  y = x.right; x.right = y.left; y.left = x; update heights; return y', 'ROTATE-LEFT(x):  y = x.right; x.right = y.left; y.left = x; উচ্চতা আপডেট; y ফেরত'],
  a_c1: ['1. A normal BST insert', '১. সাধারণ BST ইনসার্ট'],
  a_c2: ['2. On the way back up: fix the height, measure the balance', '২. ফেরার পথে: উচ্চতা ঠিক করো, ব্যালান্স মাপো'],
  a_c3: ['3. Too tall on one side? Rotate (four cases)', '৩. এক পাশ বেশি লম্বা? রোটেট করো (চারটা কেস)'],
  a_cr: ['Left side too tall: the left child becomes the parent', 'বাম পাশ বেশি লম্বা: বাম চাইল্ড প্যারেন্ট হয়'],
  a_cl: ['Right side too tall: the right child becomes the parent', 'ডান পাশ বেশি লম্বা: ডান চাইল্ড প্যারেন্ট হয়'],
  a_empty: ['root = empty tree', 'root = খালি ট্রি'],
  // heap
  h_p0: ['INSERT(heap, value)', 'INSERT(heap, value)'],
  h_p1: ['    add value at the END of the array; i = its index', '    value-কে অ্যারের শেষে যোগ করো; i = তার ইনডেক্স'],
  h_p2: ['    while i > 0 and heap[parent(i)] > heap[i]:     ← parent bigger?', '    যতক্ষণ i > 0 আর heap[parent(i)] > heap[i]:     ← প্যারেন্ট বড়?'],
  h_p3: ['        swap heap[i] and heap[parent(i)]; i = parent(i)      ← bubble up', '        heap[i] আর heap[parent(i)] অদলবদল; i = parent(i)      ← ওপরে ওঠো'],
  h_e0: ['EXTRACT-MIN(heap)', 'EXTRACT-MIN(heap)'],
  h_e1: ['    min = heap[0]                          ← the root is the smallest', '    min = heap[0]                          ← রুট সবচেয়ে ছোট'],
  h_e2: ['    move the LAST value to the root, shrink the array', '    শেষ মানটা রুটে আনো, অ্যারে ছোট করো'],
  h_e3: ['    SINK-DOWN(heap, 0)', '    SINK-DOWN(heap, 0)'],
  h_e4: ['    return min', '    min ফেরত দাও'],
  h_s0: ['SINK-DOWN(heap, i)', 'SINK-DOWN(heap, i)'],
  h_s1: ['    repeat:', '    বারবার:'],
  h_s2: ['        smallest = whichever of i, left child, right child is smallest', '        smallest = i, বাম চাইল্ড, ডান চাইল্ডের মধ্যে সবচেয়ে ছোট'],
  h_s3: ['        if smallest == i: stop                 ← already in place', '        smallest == i হলে: থামো                 ← জায়গামতো আছে'],
  h_s4: ['        swap heap[i] and heap[smallest]; i = smallest   ← sink down', '        heap[i] আর heap[smallest] অদলবদল; i = smallest   ← নিচে নামো'],
  h_c1: ['Array formulas: parent of i is (i − 1) / 2; children are 2i + 1 and 2i + 2', 'অ্যারের সূত্র: i-এর প্যারেন্ট (i − 1) / 2; চাইল্ড 2i + 1 আর 2i + 2'],
  h_c2: ['Bubble up: swap with the parent while the parent is bigger', 'ওপরে ওঠা: প্যারেন্ট বড় হলে তার সঙ্গে অদলবদল'],
  h_c3: ['Sink down: swap with the smaller child while it is smaller', 'নিচে নামা: ছোট চাইল্ড ছোট হলে তার সঙ্গে অদলবদল'],
  h_empty: ['heap = empty array', 'heap = খালি অ্যারে']
};

const LANGS = ['pseudo', 'js', 'java', 'python', 'cpp'];
const arrLit = (vals, lang) => (lang === 'java' || lang === 'cpp' ? `{${vals.join(', ')}}` : `[${vals.join(', ')}]`);

const NODE_SRC = {
  js: 'class Node {\n    constructor(value) {\n        this.data = value;\n        this.left = null;\n        this.right = null;\n    }\n}',
  java: 'static class Node {\n    int data;\n    Node left, right;\n    Node(int value) { data = value; }\n}',
  python: 'class Node:\n    def __init__(self, value):\n        self.data = value\n        self.left = None\n        self.right = None',
  cpp: 'struct Node {\n    int data;\n    Node* left = nullptr;\n    Node* right = nullptr;\n    Node(int value) : data(value) {}\n};'
};

/** Builders shown in the program (not traced: the trace starts at the call). */
const BUILD_SRC = {
  bst: {
    js: '// {{q_bst}}\nfunction insert(root, value) {\n    if (root === null) return new Node(value);\n    if (value < root.data) root.left = insert(root.left, value);\n    else root.right = insert(root.right, value);\n    return root;\n}',
    java: '// {{q_bst}}\nstatic Node insert(Node root, int value) {\n    if (root == null) return new Node(value);\n    if (value < root.data) root.left = insert(root.left, value);\n    else root.right = insert(root.right, value);\n    return root;\n}',
    python: '# {{q_bst}}\ndef insert(root, value):\n    if root is None:\n        return Node(value)\n    if value < root.data:\n        root.left = insert(root.left, value)\n    else:\n        root.right = insert(root.right, value)\n    return root',
    cpp: '// {{q_bst}}\nNode* insert(Node* root, int value) {\n    if (root == nullptr) return new Node(value);\n    if (value < root->data) root->left = insert(root->left, value);\n    else root->right = insert(root->right, value);\n    return root;\n}'
  },
  level: {
    js: '// {{q_level}}\nfunction buildLevelOrder(values) {\n    const nodes = values.map((v) => new Node(v));\n    nodes.forEach((node, i) => {\n        node.left = nodes[2 * i + 1] || null;\n        node.right = nodes[2 * i + 2] || null;\n    });\n    return nodes[0];\n}',
    java: '// {{q_level}}\nstatic Node buildLevelOrder(int[] values) {\n    Node[] nodes = new Node[values.length];\n    for (int i = 0; i < values.length; i++) nodes[i] = new Node(values[i]);\n    for (int i = 0; i < values.length; i++) {\n        if (2 * i + 1 < values.length) nodes[i].left = nodes[2 * i + 1];\n        if (2 * i + 2 < values.length) nodes[i].right = nodes[2 * i + 2];\n    }\n    return nodes[0];\n}',
    python: '# {{q_level}}\ndef build_level_order(values):\n    nodes = [Node(v) for v in values]\n    for i, node in enumerate(nodes):\n        if 2 * i + 1 < len(nodes):\n            node.left = nodes[2 * i + 1]\n        if 2 * i + 2 < len(nodes):\n            node.right = nodes[2 * i + 2]\n    return nodes[0]',
    cpp: '// {{q_level}}\nNode* buildLevelOrder(vector<int> values) {\n    vector<Node*> nodes;\n    for (int v : values) nodes.push_back(new Node(v));\n    for (int i = 0; i < (int)nodes.size(); i++) {\n        if (2 * i + 1 < (int)nodes.size()) nodes[i]->left = nodes[2 * i + 1];\n        if (2 * i + 2 < (int)nodes.size()) nodes[i]->right = nodes[2 * i + 2];\n    }\n    return nodes[0];\n}'
  }
};

const LEVEL_SRC = {
  pseudo: '{{l_p0}}  @header\n{{l_p1}}  @init\n{{l_p2}}  @whileCheck\n{{l_p3}}  @pop\n{{l_p4}}  @visit\n{{l_p5}}  @pushL\n{{l_p6}}  @pushR',
  js: 'function levelOrder(root) {  @header\n    // {{l_c1}}  @init\n    const queue = [root];  @init\n    while (queue.length > 0) {  @whileCheck\n        const node = queue.shift();  @pop\n        console.log(node.data);  @visit\n        if (node.left !== null) queue.push(node.left);  @pushL\n        if (node.right !== null) queue.push(node.right);  @pushR\n    }\n}',
  java: 'static void levelOrder(Node root) {  @header\n    // {{l_c1}}  @init\n    Queue<Node> queue = new LinkedList<>();  @init\n    queue.add(root);  @init\n    while (!queue.isEmpty()) {  @whileCheck\n        Node node = queue.poll();  @pop\n        System.out.print(node.data + " ");  @visit\n        if (node.left != null) queue.add(node.left);  @pushL\n        if (node.right != null) queue.add(node.right);  @pushR\n    }\n}',
  python: 'def level_order(root):  @header\n    # {{l_c1}}  @init\n    queue = deque([root])  @init\n    while queue:  @whileCheck\n        node = queue.popleft()  @pop\n        print(node.data, end=" ")  @visit\n        if node.left is not None:  @pushL\n            queue.append(node.left)  @pushL\n        if node.right is not None:  @pushR\n            queue.append(node.right)  @pushR',
  cpp: 'void levelOrder(Node* root) {  @header\n    // {{l_c1}}  @init\n    queue<Node*> q;  @init\n    q.push(root);  @init\n    while (!q.empty()) {  @whileCheck\n        Node* node = q.front();  @pop\n        q.pop();  @pop\n        cout << node->data << " ";  @visit\n        if (node->left != nullptr) q.push(node->left);  @pushL\n        if (node->right != nullptr) q.push(node->right);  @pushR\n    }\n}'
};

const AVL_SRC = {
  pseudo: '{{a_r0}}\n{{a_r1}}\n\n{{a_p0}}  @header\n{{a_p1}}  @newNode\n{{a_p2}}  @goLeft\n{{a_p3}}  @goRight\n{{a_p4}}  @upd\n{{a_p5}}  @bf\n{{a_p6}}  @caseLL\n{{a_p7}}  @caseRR\n{{a_p8}}  @caseLR\n{{a_p9}}  @caseLR\n{{a_p10}}  @caseLR2\n{{a_p11}}  @caseRL\n{{a_p12}}  @caseRL\n{{a_p13}}  @caseRL2\n{{a_p14}}  @ret',
  js: `class Node {
    constructor(value) {
        this.data = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

const height = (n) => (n === null ? 0 : n.height);
const update = (n) => { n.height = 1 + Math.max(height(n.left), height(n.right)); };

// {{a_cr}}
function rotateRight(y) {
    const x = y.left;
    y.left = x.right;
    x.right = y;
    update(y);
    update(x);
    return x;
}

// {{a_cl}}
function rotateLeft(x) {
    const y = x.right;
    x.right = y.left;
    y.left = x;
    update(x);
    update(y);
    return y;
}

function insert(node, value) {  @header
    // {{a_c1}}  @newNode
    if (node === null) return new Node(value);  @newNode
    if (value < node.data) node.left = insert(node.left, value);  @goLeft
    else node.right = insert(node.right, value);  @goRight

    // {{a_c2}}  @upd
    update(node);  @upd
    const bf = height(node.left) - height(node.right);  @bf

    // {{a_c3}}  @caseLL
    if (bf > 1 && value < node.left.data) return rotateRight(node);  @caseLL
    if (bf < -1 && value > node.right.data) return rotateLeft(node);  @caseRR
    if (bf > 1 && value > node.left.data) {  @caseLR
        node.left = rotateLeft(node.left);  @caseLR
        return rotateRight(node);  @caseLR2
    }
    if (bf < -1 && value < node.right.data) {  @caseRL
        node.right = rotateRight(node.right);  @caseRL
        return rotateLeft(node);  @caseRL2
    }
    return node;  @ret
}`,
  java: `static class Node {
    int data, height = 1;
    Node left, right;
    Node(int value) { data = value; }
}

static int height(Node n) { return n == null ? 0 : n.height; }
static void update(Node n) { n.height = 1 + Math.max(height(n.left), height(n.right)); }

// {{a_cr}}
static Node rotateRight(Node y) {
    Node x = y.left;
    y.left = x.right;
    x.right = y;
    update(y);
    update(x);
    return x;
}

// {{a_cl}}
static Node rotateLeft(Node x) {
    Node y = x.right;
    x.right = y.left;
    y.left = x;
    update(x);
    update(y);
    return y;
}

static Node insert(Node node, int value) {  @header
    // {{a_c1}}  @newNode
    if (node == null) return new Node(value);  @newNode
    if (value < node.data) node.left = insert(node.left, value);  @goLeft
    else node.right = insert(node.right, value);  @goRight

    // {{a_c2}}  @upd
    update(node);  @upd
    int bf = height(node.left) - height(node.right);  @bf

    // {{a_c3}}  @caseLL
    if (bf > 1 && value < node.left.data) return rotateRight(node);  @caseLL
    if (bf < -1 && value > node.right.data) return rotateLeft(node);  @caseRR
    if (bf > 1 && value > node.left.data) {  @caseLR
        node.left = rotateLeft(node.left);  @caseLR
        return rotateRight(node);  @caseLR2
    }
    if (bf < -1 && value < node.right.data) {  @caseRL
        node.right = rotateRight(node.right);  @caseRL
        return rotateLeft(node);  @caseRL2
    }
    return node;  @ret
}`,
  python: `class Node:
    def __init__(self, value):
        self.data = value
        self.left = None
        self.right = None
        self.height = 1


def height(n):
    return 0 if n is None else n.height


def update(n):
    n.height = 1 + max(height(n.left), height(n.right))


# {{a_cr}}
def rotate_right(y):
    x = y.left
    y.left = x.right
    x.right = y
    update(y)
    update(x)
    return x


# {{a_cl}}
def rotate_left(x):
    y = x.right
    x.right = y.left
    y.left = x
    update(x)
    update(y)
    return y


def insert(node, value):  @header
    # {{a_c1}}  @newNode
    if node is None:  @newNode
        return Node(value)  @newNode
    if value < node.data:  @goLeft
        node.left = insert(node.left, value)  @goLeft
    else:  @goRight
        node.right = insert(node.right, value)  @goRight

    # {{a_c2}}  @upd
    update(node)  @upd
    bf = height(node.left) - height(node.right)  @bf

    # {{a_c3}}  @caseLL
    if bf > 1 and value < node.left.data:  @caseLL
        return rotate_right(node)  @caseLL
    if bf < -1 and value > node.right.data:  @caseRR
        return rotate_left(node)  @caseRR
    if bf > 1 and value > node.left.data:  @caseLR
        node.left = rotate_left(node.left)  @caseLR
        return rotate_right(node)  @caseLR2
    if bf < -1 and value < node.right.data:  @caseRL
        node.right = rotate_right(node.right)  @caseRL
        return rotate_left(node)  @caseRL2
    return node  @ret`,
  cpp: `struct Node {
    int data, height = 1;
    Node* left = nullptr;
    Node* right = nullptr;
    Node(int value) : data(value) {}
};

int height(Node* n) { return n == nullptr ? 0 : n->height; }
void update(Node* n) { n->height = 1 + max(height(n->left), height(n->right)); }

// {{a_cr}}
Node* rotateRight(Node* y) {
    Node* x = y->left;
    y->left = x->right;
    x->right = y;
    update(y);
    update(x);
    return x;
}

// {{a_cl}}
Node* rotateLeft(Node* x) {
    Node* y = x->right;
    x->right = y->left;
    y->left = x;
    update(x);
    update(y);
    return y;
}

Node* insert(Node* node, int value) {  @header
    // {{a_c1}}  @newNode
    if (node == nullptr) return new Node(value);  @newNode
    if (value < node->data) node->left = insert(node->left, value);  @goLeft
    else node->right = insert(node->right, value);  @goRight

    // {{a_c2}}  @upd
    update(node);  @upd
    int bf = height(node->left) - height(node->right);  @bf

    // {{a_c3}}  @caseLL
    if (bf > 1 && value < node->left->data) return rotateRight(node);  @caseLL
    if (bf < -1 && value > node->right->data) return rotateLeft(node);  @caseRR
    if (bf > 1 && value > node->left->data) {  @caseLR
        node->left = rotateLeft(node->left);  @caseLR
        return rotateRight(node);  @caseLR2
    }
    if (bf < -1 && value < node->right->data) {  @caseRL
        node->right = rotateRight(node->right);  @caseRL
        return rotateLeft(node);  @caseRL2
    }
    return node;  @ret
}`
};

const HEAP_INSERT_SRC = {
  pseudo: '{{h_c1}}  @formula\n\n{{h_p0}}  @hHeader\n{{h_p1}}  @hPush\n{{h_p2}}  @hLoop\n{{h_p3}}  @hSwap',
  js: `// {{h_c1}}  @formula
function insert(heap, value) {  @hHeader
    heap.push(value);  @hPush
    let i = heap.length - 1;  @hPush
    // {{h_c2}}  @hLoop
    while (i > 0 && heap[Math.floor((i - 1) / 2)] > heap[i]) {  @hLoop
        const p = Math.floor((i - 1) / 2);  @hSwap
        [heap[i], heap[p]] = [heap[p], heap[i]];  @hSwap
        i = p;  @hSwap
    }
}`,
  java: `// {{h_c1}}  @formula
static void insert(List<Integer> heap, int value) {  @hHeader
    heap.add(value);  @hPush
    int i = heap.size() - 1;  @hPush
    // {{h_c2}}  @hLoop
    while (i > 0 && heap.get((i - 1) / 2) > heap.get(i)) {  @hLoop
        int p = (i - 1) / 2;  @hSwap
        Collections.swap(heap, i, p);  @hSwap
        i = p;  @hSwap
    }
}`,
  python: `# {{h_c1}}  @formula
def insert(heap, value):  @hHeader
    heap.append(value)  @hPush
    i = len(heap) - 1  @hPush
    # {{h_c2}}  @hLoop
    while i > 0 and heap[(i - 1) // 2] > heap[i]:  @hLoop
        p = (i - 1) // 2  @hSwap
        heap[i], heap[p] = heap[p], heap[i]  @hSwap
        i = p  @hSwap`,
  cpp: `// {{h_c1}}  @formula
void insert(vector<int>& heap, int value) {  @hHeader
    heap.push_back(value);  @hPush
    int i = heap.size() - 1;  @hPush
    // {{h_c2}}  @hLoop
    while (i > 0 && heap[(i - 1) / 2] > heap[i]) {  @hLoop
        int p = (i - 1) / 2;  @hSwap
        swap(heap[i], heap[p]);  @hSwap
        i = p;  @hSwap
    }
}`
};

const HEAP_EXTRACT_SRC = {
  pseudo: '{{h_e0}}  @eHeader\n{{h_e1}}  @eTake\n{{h_e2}}  @eLast\n{{h_e3}}  @eSink\n{{h_e4}}  @eRet\n\n{{h_s0}}  @sHeader\n{{h_s1}}  @sLoop\n{{h_s2}}  @sPick\n{{h_s3}}  @sStop\n{{h_s4}}  @sSwap',
  js: `function extractMin(heap) {  @eHeader
    const min = heap[0];  @eTake
    const last = heap.pop();  @eLast
    if (heap.length > 0) {  @eLast
        heap[0] = last;  @eLast
        sinkDown(heap, 0);  @eSink
    }
    return min;  @eRet
}

// {{h_c3}}
function sinkDown(heap, i) {  @sHeader
    while (true) {  @sLoop
        const l = 2 * i + 1, r = 2 * i + 2;  @sPick
        let smallest = i;  @sPick
        if (l < heap.length && heap[l] < heap[smallest]) smallest = l;  @sPick
        if (r < heap.length && heap[r] < heap[smallest]) smallest = r;  @sPick
        if (smallest === i) return;  @sStop
        [heap[i], heap[smallest]] = [heap[smallest], heap[i]];  @sSwap
        i = smallest;  @sSwap
    }
}`,
  java: `static int extractMin(List<Integer> heap) {  @eHeader
    int min = heap.get(0);  @eTake
    int last = heap.remove(heap.size() - 1);  @eLast
    if (!heap.isEmpty()) {  @eLast
        heap.set(0, last);  @eLast
        sinkDown(heap, 0);  @eSink
    }
    return min;  @eRet
}

// {{h_c3}}
static void sinkDown(List<Integer> heap, int i) {  @sHeader
    while (true) {  @sLoop
        int l = 2 * i + 1, r = 2 * i + 2;  @sPick
        int smallest = i;  @sPick
        if (l < heap.size() && heap.get(l) < heap.get(smallest)) smallest = l;  @sPick
        if (r < heap.size() && heap.get(r) < heap.get(smallest)) smallest = r;  @sPick
        if (smallest == i) return;  @sStop
        Collections.swap(heap, i, smallest);  @sSwap
        i = smallest;  @sSwap
    }
}`,
  python: `def extract_min(heap):  @eHeader
    smallest_value = heap[0]  @eTake
    last = heap.pop()  @eLast
    if heap:  @eLast
        heap[0] = last  @eLast
        sink_down(heap, 0)  @eSink
    return smallest_value  @eRet


# {{h_c3}}
def sink_down(heap, i):  @sHeader
    while True:  @sLoop
        l, r = 2 * i + 1, 2 * i + 2  @sPick
        smallest = i  @sPick
        if l < len(heap) and heap[l] < heap[smallest]:  @sPick
            smallest = l  @sPick
        if r < len(heap) and heap[r] < heap[smallest]:  @sPick
            smallest = r  @sPick
        if smallest == i:  @sStop
            return  @sStop
        heap[i], heap[smallest] = heap[smallest], heap[i]  @sSwap
        i = smallest  @sSwap`,
  cpp: `int extractMin(vector<int>& heap) {  @eHeader
    int minValue = heap[0];  @eTake
    int last = heap.back();  @eLast
    heap.pop_back();  @eLast
    if (!heap.empty()) {  @eLast
        heap[0] = last;  @eLast
        sinkDown(heap, 0);  @eSink
    }
    return minValue;  @eRet
}`
};
// C++ needs sinkDown declared before extractMin uses it
const SINK_CPP = `// {{h_c3}}
void sinkDown(vector<int>& heap, int i) {  @sHeader
    while (true) {  @sLoop
        int l = 2 * i + 1, r = 2 * i + 2;  @sPick
        int smallest = i;  @sPick
        if (l < (int)heap.size() && heap[l] < heap[smallest]) smallest = l;  @sPick
        if (r < (int)heap.size() && heap[r] < heap[smallest]) smallest = r;  @sPick
        if (smallest == i) return;  @sStop
        swap(heap[i], heap[smallest]);  @sSwap
        i = smallest;  @sSwap
    }
}`;

/** main() lines for each algorithm. */
function mainOf(op, vals, lang) {
  const A = op.algo;
  const v = arrLit(vals, lang);
  const cm = { pseudo: '— ', js: '// ', java: '// ', python: '# ', cpp: '// ' }[lang];
  if (A === 'avl') {
    const empty = { pseudo: '{{a_empty}}', js: 'let root = null;', java: 'Node root = null;', python: 'root = None', cpp: 'Node* root = nullptr;' }[lang];
    const put = (x) => ({ pseudo: `root = INSERT(root, ${x})`, js: `root = insert(root, ${x});`, java: `root = insert(root, ${x});`, python: `root = insert(root, ${x})`, cpp: `root = insert(root, ${x});` }[lang]);
    return [`${empty}  @rootNull`, ...vals.map((x, i) => `${put(x)}  @put${i}`)];
  }
  if (A === 'heapBuild' || A === 'heapExtract') {
    const empty = { pseudo: '{{h_empty}}', js: 'const heap = [];', java: 'List<Integer> heap = new ArrayList<>();', python: 'heap = []', cpp: 'vector<int> heap;' }[lang];
    const put = (x) => ({ pseudo: `INSERT(heap, ${x})`, js: `insert(heap, ${x});`, java: `insert(heap, ${x});`, python: `insert(heap, ${x})`, cpp: `insert(heap, ${x});` }[lang]);
    if (A === 'heapBuild') return [`${empty}  @rootNull`, ...vals.map((x, i) => `${put(x)}  @put${i}`)];
    const loop = { pseudo: `for v in ${v}: INSERT(heap, v)`, js: `for (const v of ${v}) insert(heap, v);`, java: `for (int v : new int[]${v}) insert(heap, v);`, python: `for v in ${v}:\n    insert(heap, v)`, cpp: `for (int v : vector<int>${v}) insert(heap, v);` }[lang];
    const call = { pseudo: 'min = EXTRACT-MIN(heap)', js: 'const min = extractMin(heap);', java: 'int min = extractMin(heap);', python: 'smallest = extract_min(heap)', cpp: 'int minValue = extractMin(heap);' }[lang];
    return [`${empty}  @build`, ...loop.split('\n').map((l) => `${l}  @build`), `${call}  @call`];
  }
  // traversals
  const level = op.shape === 'level';
  const build = level
    ? { pseudo: '{{q_levelP}}', js: `const root = buildLevelOrder(${v});`, java: `Node root = buildLevelOrder(new int[]${v});`, python: `root = build_level_order(${v})`, cpp: `Node* root = buildLevelOrder(${v});` }[lang]
    : { pseudo: '{{q_bstP}}', js: `let root = null;\nfor (const v of ${v}) root = insert(root, v);`, java: `Node root = null;\nfor (int v : new int[]${v}) root = insert(root, v);`, python: `root = None\nfor v in ${v}:\n    root = insert(root, v)`, cpp: `Node* root = nullptr;\nfor (int v : vector<int>${v}) root = insert(root, v);` }[lang];
  const fn = { preorder: 'preorder', inorder: 'inorder', postorder: 'postorder', levelorder: { pseudo: 'LEVEL-ORDER', js: 'levelOrder', java: 'levelOrder', python: 'level_order', cpp: 'levelOrder' }[lang] }[A];
  const call = lang === 'pseudo' ? `${typeof fn === 'string' && A !== 'levelorder' ? fn.toUpperCase() : fn}(root)` : `${fn}(root)${lang === 'python' ? '' : ';'}`;
  return [`${cm}{{q_values}}: ${vals.join(', ')}`, ...build.split('\n').map((l) => `${l}  @build`), `${call}  @call`];
}

function assemble(op, vals, lang) {
  const A = op.algo;
  const done = {
    avl: { pseudo: 'print root', js: 'console.log("root:", root.data);', java: 'System.out.println("root: " + root.data);', python: 'print("root:", root.data)', cpp: 'cout << "root: " << root->data << endl;' },
    heapBuild: { pseudo: 'print heap', js: 'console.log(heap);', java: 'System.out.println(heap);', python: 'print(heap)', cpp: 'for (int v : heap) cout << v << " ";' },
    heapExtract: { pseudo: 'print min', js: 'console.log(min);', java: 'System.out.println(min);', python: 'print(smallest)', cpp: 'cout << minValue << endl;' }
  }[A]?.[lang] || { pseudo: '{{mDone}}', js: 'console.log("done");', java: 'System.out.println("done");', python: 'print("done")', cpp: 'cout << "done" << endl;' }[lang];
  const main = [...mainOf(op, vals, lang), `${done}  @done`];
  let fns = [];
  let node = true;
  if (A === 'avl') { fns = [AVL_SRC[lang]]; node = false; }
  else if (A === 'heapBuild') { fns = [HEAP_INSERT_SRC[lang]]; node = false; }
  else if (A === 'heapExtract') { fns = lang === 'cpp' ? [HEAP_INSERT_SRC.cpp, SINK_CPP, HEAP_EXTRACT_SRC.cpp] : [HEAP_INSERT_SRC[lang], HEAP_EXTRACT_SRC[lang]]; node = false; }
  else {
    const travel = A === 'levelorder' ? LEVEL_SRC[lang] : traversalFn(A, lang).replace(/^ {4}/gm, lang === 'java' ? '' : '    ').replace(/^ {4}(?=\S)/gm, (m) => m);
    fns = lang === 'pseudo' ? [travel] : [BUILD_SRC[op.shape === 'level' ? 'level' : 'bst'][lang], travel];
  }
  if (lang === 'pseudo') {
    // the heap/AVL pseudo shows its own algorithm; traversals show only the traversal
    return `${fns.join('\n\n')}\n\n{{q_main}}\n${main.map((l) => `    ${l}`).join('\n')}`;
  }
  const ind = (s, n) => s.split('\n').map((l) => (l.trim() ? ' '.repeat(n) + l : l)).join('\n');
  if (lang === 'js') return `${node ? `${NODE_SRC.js}\n\n` : ''}${fns.join('\n\n')}\n\n${main.join('\n')}`;
  if (lang === 'python') {
    const imports = A === 'levelorder' ? 'from collections import deque\n\n\n' : '';
    return `${imports}${node ? `${NODE_SRC.python}\n\n\n` : ''}${fns.join('\n\n\n')}\n\n\n${main.join('\n')}`;
  }
  if (lang === 'java') {
    return `import java.util.*;\n\npublic class Main {\n\n${node ? `${ind(NODE_SRC.java, 4)}\n\n` : ''}${fns.map((f) => ind(f, 4)).join('\n\n')}\n\n    public static void main(String[] args) {\n${ind(main.join('\n'), 8)}\n    }\n}`;
  }
  const inc = '#include <iostream>\n#include <vector>\n#include <queue>\n#include <algorithm>\nusing namespace std;';
  return `${inc}\n\n${node ? `${NODE_SRC.cpp}\n\n` : ''}${fns.join('\n\n')}\n\nint main() {\n${ind([...main, 'return 0;'].join('\n'), 4)}\n}`;
}

export function treeProgram(op, vals) {
  const src = {};
  for (const lang of LANGS) src[lang] = assemble(op, vals, lang);
  return program(src, TEXT);
}

/* ================================================================ steps: level order */

function genLevelOrder(root, vals) {
  const steps = [];
  const out = [];
  let queue = [];
  const subsNow = () => Object.fromEntries(out.map((v, i) => [v, `#${i + 1}`]));
  const panel = (hl = {}) => ({ type: 'queue', label: T('queue — the waiting line', 'queue — অপেক্ষার লাইন'), items: queue.map((n) => n.v), hl, empty: T('empty', 'খালি') });
  const scene = (o) => frame(root, { output: [...out], outputLabel: T('Level-order output:', 'লেভেল-অর্ডার আউটপুট:'), subs: subsNow(), ...o });
  const push = (title, explanation, sc, line, state) => steps.push({ title, explanation, scene: sc, line, ...(state ? { state } : {}) });

  push(
    T('main(): levelOrder(root)', 'main() কল করে: levelOrder(root)'),
    T(
      `The tree is built from your values (${fmt(vals)}). **Level order** visits it **row by row, left to right** — first the root, then its children, then their children.\n\nA **queue** makes this work: nodes wait in line in exactly the order we discovered them.`,
      `তোমার মানগুলো (${fmt(vals)}) দিয়ে ট্রি বানানো হয়েছে। **লেভেল অর্ডার** এটা **সারি ধরে, বাম থেকে ডানে** দেখে — আগে রুট, তারপর তার চাইল্ড, তারপর তাদের চাইল্ড।\n\nএটা সম্ভব করে একটা **queue**: নোডগুলো ঠিক যে ক্রমে পেয়েছি, সেই ক্রমে লাইনে অপেক্ষা করে।`
    ),
    scene({ cursor: root.v, states: {}, panels: [panel()], status: T(`levelOrder(<b>${root.v}</b>)`, `levelOrder(<b>${root.v}</b>)`) }),
    ['call', 'header']
  );
  queue = [root];
  const val = (n) => n.v;
  const withQ = (o) => ({ ...o, panels: [panel(o.qhl || {})] });
  push(
    T(`Put the root ${root.v} in the queue`, `রুট ${root.v}-কে queue-তে রাখো`),
    T(`The queue starts with just the root: **[${root.v}]**.`, `queue শুরু হয় শুধু রুট দিয়ে: **[${root.v}]**।`),
    scene(withQ({ cursor: root.v, states: states({ active: root.v }), qhl: { 0: 'relax' }, status: T(`queue = [${root.v}]`, `queue = [${root.v}]`) })),
    ['init']
  );
  while (queue.length) {
    const n = queue.shift();
    out.push(n.v);
    push(
      T(`Take ${n.v} from the front, print it`, `সামনে থেকে ${n.v} নাও, প্রিন্ট করো`),
      T(
        `The queue is not empty, so take the node at the **front**: **${n.v}**, and print it (output #${out.length}).${queue.length ? ` Still waiting: ${queue.map(val).join(', ')}.` : ''}`,
        `queue খালি নয়, তাই **সামনের** নোডটা নাও: **${n.v}**, আর প্রিন্ট করো (আউটপুট #${out.length})।${queue.length ? ` এখনো অপেক্ষায়: ${queue.map(val).join(', ')}।` : ''}`
      ),
      scene(withQ({ cursor: n.v, states: states({ visited: out.slice(0, -1), found: n.v, active: queue.map(val) }), status: T(`print <b>${n.v}</b>`, `<b>${n.v}</b> প্রিন্ট`) })),
      ['whileCheck', 'pop', 'visit'],
      { node: n.v }
    );
    for (const [side, child] of [['left', n.l], ['right', n.r]]) {
      const word = side === 'left' ? T('left', 'বাম') : T('right', 'ডান');
      if (child) queue.push(child);
      push(
        child ? T(`${side} child ${child.v} → back of the queue`, `${word.bn} চাইল্ড ${child.v} → queue-এর পেছনে`) : T(`no ${side} child`, `${word.bn} চাইল্ড নেই`),
        child
          ? T(`${n.v} has a ${word.en} child, **${child.v}**. It joins the **back** of the queue, so it is printed after everything already waiting — that is what keeps the rows in order.`, `${n.v}-এর একটা ${word.bn} চাইল্ড আছে, **${child.v}**। এটা queue-এর **পেছনে** যোগ দেয়, তাই আগে থেকে অপেক্ষারত সবার পরে প্রিন্ট হবে — এভাবেই সারির ক্রম ঠিক থাকে।`)
          : T(`${n.v} has no ${word.en} child, so nothing joins the queue here.`, `${n.v}-এর কোনো ${word.bn} চাইল্ড নেই, তাই এখানে queue-তে কেউ যোগ হয় না।`),
        scene(withQ({ cursor: child ? child.v : n.v, lit: child ? [[n.v, child.v]] : [], states: states({ visited: out, active: queue.map(val), new: child ? child.v : null }), qhl: child ? { [queue.length - 1]: 'relax' } : {}, status: child ? T(`queue.push(<b>${child.v}</b>)`, `queue.push(<b>${child.v}</b>)`) : T(`${side} is null`, `${side} null`) })),
        [side === 'left' ? 'pushL' : 'pushR'],
        { node: n.v }
      );
    }
  }
  push(
    T('Queue empty → level order done ✓', 'queue খালি → লেভেল অর্ডার শেষ ✓'),
    T(
      `The queue is empty, so the loop stops. Level order: **${out.join(' → ')}**.\n\n> Each node enters and leaves the queue once: **O(n)** time. The queue holds at most one row at a time.`,
      `queue খালি, তাই লুপ থামে। লেভেল অর্ডার: **${out.join(' → ')}**।\n\n> প্রতিটা নোড একবার queue-তে ঢোকে আর বের হয়: **O(n)** সময়। queue-তে একবারে বড়জোর একটা সারি থাকে।`
    ),
    scene(withQ({ states: states({ visited: out }), status: T(`level order: <b>${out.join(' ')}</b>`, `লেভেল অর্ডার: <b>${out.join(' ')}</b>`) })),
    ['done']
  );
  return steps;
}

/* ================================================================ steps: AVL */

function heightOf(n) { return n ? 1 + Math.max(heightOf(n.l), heightOf(n.r)) : 0; }
const bfOf = (n) => heightOf(n.l) - heightOf(n.r);
function allVals(n, out = []) { if (n) { allVals(n.l, out); out.push(n.v); allVals(n.r, out); } return out; }
const bfSubs = (root) => Object.fromEntries(allVals(root).map((v) => { let n = root; while (n && n.v !== v) n = v < n.v ? n.l : n.r; const b = bfOf(n); return [v, `bf ${b > 0 ? '+' : ''}${b}`]; }));

function rotR(y) { const x = y.l; y.l = x.r; x.r = y; return x; }
function rotL(x) { const y = x.r; x.r = y.l; y.l = x; return y; }

function genAvl(vals) {
  const steps = [];
  const box = { root: null };
  let rotations = 0;
  const push = (title, explanation, sc, line, state) => steps.push({ title, explanation, scene: sc, line, ...(state ? { state } : {}) });
  const scene = (o) => frame(box.root, { pending: vals, subs: box.root ? bfSubs(box.root) : {}, ...o });

  push(
    T('Start with an empty AVL tree', 'খালি AVL ট্রি দিয়ে শুরু'),
    T(
      `An **AVL tree** is a BST that keeps itself **balanced**: at every node, the heights of the left and right side may differ by at most **1**.\n\nThat difference is the **balance factor**: \`bf = height(left) − height(right)\`. The tag under each node shows it. If a node reaches **+2** or **−2**, the tree **rotates** to fix it.`,
      `**AVL ট্রি** হলো এমন BST যা নিজেকে **ব্যালান্সড** রাখে: প্রতিটা নোডে বাম আর ডান পাশের উচ্চতার পার্থক্য বড়জোর **১**।\n\nএই পার্থক্যই **ব্যালান্স ফ্যাক্টর**: \`bf = height(left) − height(right)\`। প্রতিটা নোডের নিচের ট্যাগে এটা দেখানো। কোনো নোড **+2** বা **−2** হলে ট্রি **রোটেট** করে ঠিক করে।`
    ),
    scene({ pendingIndex: 0, status: T('root = null', 'root = null') }),
    ['rootNull']
  );

  vals.forEach((key, idx) => {
    push(
      T(`insert(root, ${key})`, `insert(root, ${key})`),
      T(`Insert **${key}** (value ${idx + 1} of ${vals.length}). First it walks down like a normal BST insert.`, `**${key}** ইনসার্ট করো (${vals.length}টার মধ্যে ${idx + 1} নম্বর)। প্রথমে সাধারণ BST ইনসার্টের মতো নিচে নামে।`),
      scene({ pendingIndex: idx, cursor: box.root ? box.root.v : null, keyBadge: key, status: T(`insert <b>${key}</b>`, `<b>${key}</b> ইনসার্ট`) }),
      [`put${idx}`, 'header'],
      { value: key }
    );
    const path = [];
    function ins(node, setter) {
      if (!node) {
        const n = { v: key, l: null, r: null };
        setter(n);
        push(
          T(`Empty spot → new node ${key}`, `খালি জায়গা → নতুন নোড ${key}`),
          T(`We reached an empty spot, so **${key}** becomes a new leaf. A new leaf has height 1 and balance factor 0.`, `খালি জায়গায় পৌঁছেছি, তাই **${key}** নতুন লিফ হয়। নতুন লিফের উচ্চতা 1, ব্যালান্স ফ্যাক্টর 0।`),
          scene({ pendingIndex: idx, cursor: key, lit: lit([...path, key]), states: states({ path, new: key }), status: T(`new node <b>${key}</b>`, `নতুন নোড <b>${key}</b>`) }),
          ['newNode']
        );
        return n;
      }
      path.push(node.v);
      const left = key < node.v;
      push(
        T(`${key} ${left ? '<' : '>'} ${node.v} → go ${left ? 'left' : 'right'}`, `${key} ${left ? '<' : '>'} ${node.v} → ${left ? 'বামে' : 'ডানে'} যাও`),
        T(`Compare with **${node.v}**: ${key} is ${left ? 'smaller' : 'bigger'}, so insert into the **${left ? 'left' : 'right'}** subtree.`, `**${node.v}**-এর সঙ্গে তুলনা: ${key} ${left ? 'ছোট' : 'বড়'}, তাই **${left ? 'বাম' : 'ডান'}** সাব-ট্রিতে ইনসার্ট।`),
        scene({ pendingIndex: idx, cursor: node.v, keyBadge: key, lit: lit(path), states: states({ path: path.slice(0, -1), cmp: node.v }), status: T(`${key} ${left ? '<' : '>'} ${node.v}`, `${key} ${left ? '<' : '>'} ${node.v}`) }),
        [left ? 'goLeft' : 'goRight']
      );
      if (left) node.l = ins(node.l, (c) => { node.l = c; });
      else node.r = ins(node.r, (c) => { node.r = c; });

      // unwinding: height + balance at this node
      const bf = bfOf(node);
      const h = heightOf(node);
      if (Math.abs(bf) <= 1) {
        push(
          T(`Back at ${node.v}: bf = ${bf > 0 ? '+' : ''}${bf} → balanced`, `${node.v}-এ ফিরে: bf = ${bf > 0 ? '+' : ''}${bf} → ব্যালান্সড`),
          T(`On the way back up, update **${node.v}**: height = ${h}, balance factor = ${bf}. That is between −1 and +1, so ${node.v} is fine — return it unchanged.`, `ফেরার পথে **${node.v}** আপডেট: উচ্চতা = ${h}, ব্যালান্স ফ্যাক্টর = ${bf}। এটা −1 আর +1-এর মধ্যে, তাই ${node.v} ঠিক আছে — যেমন আছে ফেরত দাও।`),
          scene({ pendingIndex: idx, cursor: node.v, states: states({ visited: node.v }), status: T(`height(${node.v}) = ${h}, bf = ${bf}`, `height(${node.v}) = ${h}, bf = ${bf}`) }),
          ['upd', 'bf', 'ret'],
          { node: node.v, height: h, bf }
        );
        path.pop();
        return node;
      }
      const leftHeavy = bf > 1;
      const child = leftHeavy ? node.l : node.r;
      const outer = leftHeavy ? key < child.v : key > child.v;
      const kind = leftHeavy ? (outer ? 'LL' : 'LR') : (outer ? 'RR' : 'RL');
      push(
        T(`${node.v} is unbalanced: bf = ${bf > 0 ? '+' : ''}${bf} → ${kind} case`, `${node.v} অসমান: bf = ${bf > 0 ? '+' : ''}${bf} → ${kind} কেস`),
        T(
          `Update **${node.v}**: balance factor = **${bf}** — the ${leftHeavy ? 'left' : 'right'} side is 2 levels taller. Too much!\n\nThe new value ${key} went ${leftHeavy ? 'left' : 'right'}, then ${outer === leftHeavy ? 'left' : 'right'} of ${child.v}: that is the **${kind}** case. ${outer ? `One rotation fixes it (rotate **${leftHeavy ? 'right' : 'left'}** at ${node.v}).` : `It needs **two** rotations: first at ${child.v}, then at ${node.v}.`}`,
          `**${node.v}** আপডেট: ব্যালান্স ফ্যাক্টর = **${bf}** — ${leftHeavy ? 'বাম' : 'ডান'} পাশ ২ লেভেল বেশি লম্বা। খুব বেশি!\n\nনতুন মান ${key} গেছে ${leftHeavy ? 'বামে' : 'ডানে'}, তারপর ${child.v}-এর ${outer === leftHeavy ? 'বামে' : 'ডানে'}: এটা **${kind}** কেস। ${outer ? `একটা রোটেশনেই ঠিক হয় (${node.v}-এ **${leftHeavy ? 'ডানে' : 'বামে'}** রোটেট)।` : `**দুটো** রোটেশন লাগে: আগে ${child.v}-এ, তারপর ${node.v}-এ।`}`
        ),
        scene({ pendingIndex: idx, cursor: node.v, states: states({ bad: node.v, cmp: child.v }), status: T(`bf(${node.v}) = ${bf} → <b>${kind}</b>`, `bf(${node.v}) = ${bf} → <b>${kind}</b>`) }),
        ['upd', 'bf', `case${kind}`],
        { node: node.v, bf, case: kind }
      );
      let top;
      if (kind === 'LR' || kind === 'RL') {
        const mid = kind === 'LR' ? rotL(child) : rotR(child);
        if (kind === 'LR') node.l = mid; else node.r = mid;
        setter(node);
        rotations++;
        push(
          T(`First rotate ${kind === 'LR' ? 'left' : 'right'} at ${child.v}`, `আগে ${child.v}-এ ${kind === 'LR' ? 'বামে' : 'ডানে'} রোটেট`),
          T(`Rotate **${kind === 'LR' ? 'left' : 'right'}** at ${child.v}: **${mid.v}** moves up and ${child.v} becomes its child. Now the shape is a straight line (${kind === 'LR' ? 'LL' : 'RR'}), which one more rotation can fix.`, `${child.v}-এ **${kind === 'LR' ? 'বামে' : 'ডানে'}** রোটেট: **${mid.v}** ওপরে ওঠে আর ${child.v} তার চাইল্ড হয়। এখন আকারটা একটা সোজা লাইন (${kind === 'LR' ? 'LL' : 'RR'}), আরেকটা রোটেশনেই ঠিক হবে।`),
          scene({ pendingIndex: idx, cursor: mid.v, states: states({ bad: node.v, succ: mid.v }), status: T(`rotate${kind === 'LR' ? 'Left' : 'Right'}(${child.v})`, `rotate${kind === 'LR' ? 'Left' : 'Right'}(${child.v})`) }),
          [`case${kind}`]
        );
      }
      top = leftHeavy ? rotR(node) : rotL(node);
      setter(top);
      rotations++;
      push(
        T(`Rotate ${leftHeavy ? 'right' : 'left'} at ${node.v} → ${top.v} on top`, `${node.v}-এ ${leftHeavy ? 'ডানে' : 'বামে'} রোটেট → ${top.v} ওপরে`),
        T(`Rotate **${leftHeavy ? 'right' : 'left'}** at ${node.v}: **${top.v}** becomes the parent, ${node.v} becomes its ${leftHeavy ? 'right' : 'left'} child. The BST order is unchanged, but the heights are even again — every balance factor is back between −1 and +1.`, `${node.v}-এ **${leftHeavy ? 'ডানে' : 'বামে'}** রোটেট: **${top.v}** প্যারেন্ট হয়, ${node.v} তার ${leftHeavy ? 'ডান' : 'বাম'} চাইল্ড। BST-র ক্রম একই থাকে, কিন্তু উচ্চতা আবার সমান — প্রতিটা ব্যালান্স ফ্যাক্টর আবার −1 থেকে +1-এর মধ্যে।`),
        scene({ pendingIndex: idx, cursor: top.v, states: states({ found: top.v, succ: node.v }), status: T(`rotate${leftHeavy ? 'Right' : 'Left'}(${node.v}) → <b>${top.v}</b>`, `rotate${leftHeavy ? 'Right' : 'Left'}(${node.v}) → <b>${top.v}</b>`) }),
        [kind === 'LR' || kind === 'RL' ? `case${kind}2` : `case${kind}`]
      );
      path.pop();
      return top;
    }
    box.root = ins(box.root, (c) => { box.root = c; });
  });

  push(
    T(`AVL tree ready: height ${heightOf(box.root)}`, `AVL ট্রি তৈরি: উচ্চতা ${heightOf(box.root)}`),
    T(
      `All ${vals.length} values are in, with **${rotations}** rotation${rotations === 1 ? '' : 's'}. Height = **${heightOf(box.root)}**${vals.length ? `, while a plain BST of the same values would be ${heightOf(buildBST(vals))} tall` : ''}.\n\n> Because it stays balanced, search, insert and delete are always **O(log n)**.`,
      `${vals.length}টা মানই বসেছে, **${rotations}টা** রোটেশনে। উচ্চতা = **${heightOf(box.root)}**${vals.length ? `, যেখানে একই মানের সাধারণ BST হতো ${heightOf(buildBST(vals))} উঁচু` : ''}।\n\n> ব্যালান্সড থাকে বলে সার্চ, ইনসার্ট আর ডিলিট সবসময় **O(log n)**।`
    ),
    scene({ pendingIndex: vals.length, states: states({ visited: allVals(box.root) }), status: T(`inorder: <b>${allVals(box.root).join(' ')}</b>`, `ইন-অর্ডার: <b>${allVals(box.root).join(' ')}</b>`) }),
    ['done']
  );
  return steps;
}

/* ================================================================ steps: heap */

const heapPanel = (arr, hl = {}) => ({ type: 'array', label: T('the heap is really this array', 'হিপ আসলে এই অ্যারে'), cells: [...arr], hl });

function siftUpSteps(heap, push, sceneOf, idx) {
  let i = heap.length - 1;
  for (;;) {
    if (i === 0) {
      push(
        T(`${heap[0]} reached the root`, `${heap[0]} রুটে পৌঁছেছে`),
        T(`**${heap[0]}** is at index 0 — the root has no parent, so the loop stops. It is the smallest value so far.`, `**${heap[0]}** ইনডেক্স 0-তে — রুটের কোনো প্যারেন্ট নেই, তাই লুপ থামে। এ পর্যন্ত এটাই সবচেয়ে ছোট মান।`),
        sceneOf({ cursor: heap[0], states: states({ found: heap[0] }), hl: { 0: 'done' }, status: T('i = 0 → stop', 'i = 0 → থামো') }, idx),
        ['hLoop']
      );
      return;
    }
    const p = Math.floor((i - 1) / 2);
    if (heap[p] > heap[i]) {
      const a = heap[i];
      const b = heap[p];
      push(
        T(`Parent ${b} > ${a} → swap`, `প্যারেন্ট ${b} > ${a} → অদলবদল`),
        T(`The parent of index ${i} is index ${p} (\`(${i} − 1) / 2\`), holding **${b}**. ${b} > ${a}, which breaks the heap rule (a parent must be ≤ its children). **Swap** them: ${a} moves up.`, `ইনডেক্স ${i}-এর প্যারেন্ট ইনডেক্স ${p} (\`(${i} − 1) / 2\`), তাতে **${b}**। ${b} > ${a}, যা হিপের নিয়ম ভাঙে (প্যারেন্টকে চাইল্ডের ≤ হতে হবে)। **অদলবদল** করো: ${a} ওপরে ওঠে।`),
        sceneOf({ cursor: a, states: states({ cmp: [a, b] }), hl: { [i]: 'compare', [p]: 'compare' }, status: T(`heap[${p}] = ${b} > heap[${i}] = ${a}`, `heap[${p}] = ${b} > heap[${i}] = ${a}`) }, idx),
        ['hLoop'],
        { i, parent: p }
      );
      [heap[i], heap[p]] = [heap[p], heap[i]];
      push(
        T(`${a} bubbles up to index ${p}`, `${a} ইনডেক্স ${p}-এ উঠল`),
        T(`After the swap, **${a}** sits at index ${p} and ${b} at index ${i}. Keep checking ${a} against its new parent.`, `অদলবদলের পর **${a}** আছে ইনডেক্স ${p}-এ আর ${b} ইনডেক্স ${i}-এ। এবার ${a}-কে তার নতুন প্যারেন্টের সঙ্গে মেলাও।`),
        sceneOf({ cursor: a, states: states({ new: a }), hl: { [p]: 'relax', [i]: 'relax' }, status: T(`swap → i = ${p}`, `অদলবদল → i = ${p}`) }, idx),
        ['hSwap'],
        { i: p }
      );
      i = p;
    } else {
      push(
        T(`Parent ${heap[p]} ≤ ${heap[i]} → stop`, `প্যারেন্ট ${heap[p]} ≤ ${heap[i]} → থামো`),
        T(`The parent **${heap[p]}** is not bigger than **${heap[i]}**, so the heap rule holds. ${heap[i]} stays at index ${i}.`, `প্যারেন্ট **${heap[p]}** **${heap[i]}**-এর চেয়ে বড় নয়, তাই হিপের নিয়ম ঠিক আছে। ${heap[i]} ইনডেক্স ${i}-এই থাকে।`),
        sceneOf({ cursor: heap[i], states: states({ found: heap[i], visited: heap[p] }), hl: { [i]: 'done', [p]: 'visited' }, status: T(`${heap[p]} ≤ ${heap[i]} → stop`, `${heap[p]} ≤ ${heap[i]} → থামো`) }, idx),
        ['hLoop'],
        { i, parent: p }
      );
      return;
    }
  }
}

function genHeapBuild(vals) {
  const steps = [];
  const heap = [];
  const push = (title, explanation, sc, line, state) => steps.push({ title, explanation, scene: sc, line, ...(state ? { state } : {}) });
  const sceneOf = (o, idx) => frame(fromArray(heap), { pending: vals, pendingIndex: idx, ...o, panels: [heapPanel(heap, o.hl)] });

  push(
    T('Start with an empty min-heap', 'খালি মিন-হিপ দিয়ে শুরু'),
    T(
      `A **min-heap** is a complete binary tree where every parent is **≤ its children**, so the smallest value is always at the **root**.\n\nIt is stored as a plain **array**: the node at index i has children at **2i + 1** and **2i + 2**, and its parent at **(i − 1) / 2**. The picture and the array below are the same data.`,
      `**মিন-হিপ** এমন একটা কমপ্লিট বাইনারি ট্রি যেখানে প্রতিটা প্যারেন্ট **তার চাইল্ডের ≤**, তাই সবচেয়ে ছোট মান সবসময় **রুটে**।\n\nএটা একটা সাধারণ **অ্যারে** হিসেবে রাখা হয়: ইনডেক্স i-এর নোডের চাইল্ড **2i + 1** আর **2i + 2**-এ, প্যারেন্ট **(i − 1) / 2**-এ। ছবি আর নিচের অ্যারে একই ডেটা।`
    ),
    sceneOf({ status: T('heap = []', 'heap = []') }, 0),
    ['rootNull']
  );
  vals.forEach((x, idx) => {
    heap.push(x);
    push(
      T(`insert(heap, ${x}): add at the end`, `insert(heap, ${x}): শেষে যোগ`),
      T(`Add **${x}** at the **end** of the array (index ${heap.length - 1}). In the picture that is the next free spot of the last row — the tree stays complete.${heap.length > 1 ? ' Now it may be smaller than its parent, so it may need to bubble up.' : ''}`, `**${x}**-কে অ্যারের **শেষে** যোগ করো (ইনডেক্স ${heap.length - 1})। ছবিতে এটা শেষ সারির পরের খালি জায়গা — ট্রি কমপ্লিট থাকে।${heap.length > 1 ? ' এখন এটা প্যারেন্টের চেয়ে ছোট হতে পারে, তাই ওপরে উঠতে হতে পারে।' : ''}`),
      sceneOf({ cursor: x, states: states({ new: x }), hl: { [heap.length - 1]: 'relax' }, status: T(`heap.push(<b>${x}</b>)`, `heap.push(<b>${x}</b>)`) }, idx),
      [`put${idx}`, 'hHeader', 'hPush'],
      { value: x, i: heap.length - 1 }
    );
    siftUpSteps(heap, push, sceneOf, idx);
  });
  push(
    T(`Min-heap ready: root ${heap[0]}`, `মিন-হিপ তৈরি: রুট ${heap[0]}`),
    T(
      `All values are in. Array: **[${heap.join(', ')}]**. Every parent is ≤ its children, and the smallest value, **${heap[0]}**, is at the root.\n\n> Each insert climbs at most the height of the tree: **O(log n)**. Reading the minimum is **O(1)**.`,
      `সব মান বসেছে। অ্যারে: **[${heap.join(', ')}]**। প্রতিটা প্যারেন্ট তার চাইল্ডের ≤, আর সবচেয়ে ছোট মান **${heap[0]}** রুটে।\n\n> প্রতিটা ইনসার্ট বড়জোর ট্রির উচ্চতা পর্যন্ত ওঠে: **O(log n)**। মিনিমাম পড়া **O(1)**।`
    ),
    sceneOf({ states: states({ found: heap[0], visited: heap.slice(1) }), hl: Object.fromEntries(heap.map((_, i) => [i, 'done'])), status: T(`heap = [${heap.join(', ')}]`, `heap = [${heap.join(', ')}]`) }, vals.length),
    ['done']
  );
  return steps;
}

function genHeapExtract(vals) {
  const steps = [];
  const heap = [];
  for (const x of vals) {
    heap.push(x);
    for (let i = heap.length - 1; i > 0;) { const p = Math.floor((i - 1) / 2); if (heap[p] <= heap[i]) break; [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; }
  }
  const out = [];
  const push = (title, explanation, sc, line, state) => steps.push({ title, explanation, scene: sc, line, ...(state ? { state } : {}) });
  const sceneOf = (o) => frame(fromArray(heap), { output: [...out], outputLabel: T('returned:', 'ফেরত দিল:'), ...o, panels: [heapPanel(heap, o.hl)] });

  push(
    T('The heap built from your values', 'তোমার মান দিয়ে বানানো হিপ'),
    T(
      `First \`main()\` inserts your values (${fmt(vals)}) into a min-heap. The result is the array **[${heap.join(', ')}]** — the smallest value, **${heap[0]}**, is at the root.\n\nNow we call **extractMin**: remove the smallest value and repair the heap.`,
      `প্রথমে \`main()\` তোমার মানগুলো (${fmt(vals)}) একটা মিন-হিপে ইনসার্ট করে। ফল হলো অ্যারে **[${heap.join(', ')}]** — সবচেয়ে ছোট মান **${heap[0]}** রুটে।\n\nএবার **extractMin** কল করি: সবচেয়ে ছোট মান বের করে হিপটা মেরামত করো।`
    ),
    sceneOf({ status: T(`heap = [${heap.join(', ')}]`, `heap = [${heap.join(', ')}]`) }),
    ['build', 'call']
  );
  const min = heap[0];
  push(
    T(`The minimum is the root: ${min}`, `মিনিমাম হলো রুট: ${min}`),
    T(`In a min-heap the smallest value is always at index 0. Save it: \`min = ${min}\`.`, `মিন-হিপে সবচেয়ে ছোট মান সবসময় ইনডেক্স 0-তে। সেটা রেখে দাও: \`min = ${min}\`।`),
    sceneOf({ cursor: min, states: states({ found: min }), hl: { 0: 'current' }, status: T(`min = heap[0] = <b>${min}</b>`, `min = heap[0] = <b>${min}</b>`) }),
    ['eHeader', 'eTake']
  );
  const last = heap.pop();
  if (heap.length) heap[0] = last;
  out.push(min);
  push(
    heap.length ? T(`Move the last value ${last} to the root`, `শেষ মান ${last} রুটে আনো`) : T('The heap is now empty', 'হিপ এখন খালি'),
    heap.length
      ? T(`We cannot leave a hole at the root. Take the **last** value, **${last}**, put it at index 0 and shrink the array by one. The tree stays complete — but ${last} is probably too big for the root.`, `রুটে ফাঁকা রাখা যায় না। **শেষ** মান **${last}** নিয়ে ইনডেক্স 0-তে বসাও আর অ্যারে এক ঘর ছোট করো। ট্রি কমপ্লিট থাকে — কিন্তু ${last} সম্ভবত রুটের জন্য বেশি বড়।`)
      : T(`${min} was the only value, so after removing it the heap is empty.`, `${min} ছিল একমাত্র মান, তাই সরানোর পর হিপ খালি।`),
    sceneOf({ cursor: heap.length ? last : null, states: states({ bad: heap.length ? last : null }), hl: heap.length ? { 0: 'compare' } : {}, status: T(`heap[0] = ${heap.length ? last : '—'}`, `heap[0] = ${heap.length ? last : '—'}`) }),
    ['eLast']
  );
  let i = 0;
  if (heap.length) {
    push(
      T(`sinkDown(heap, 0)`, `sinkDown(heap, 0)`),
      T(`Now **sink** ${heap[0]} down until both its children are bigger.`, `এবার ${heap[0]}-কে **নিচে নামাও**, যতক্ষণ না দুই চাইল্ডই বড় হয়।`),
      sceneOf({ cursor: heap[0], states: states({ bad: heap[0] }), hl: { 0: 'compare' }, status: T('sinkDown(heap, 0)', 'sinkDown(heap, 0)') }),
      ['eSink', 'sHeader']
    );
    for (;;) {
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      let s = i;
      if (l < heap.length && heap[l] < heap[s]) s = l;
      if (r < heap.length && heap[r] < heap[s]) s = r;
      const kids = [l, r].filter((k) => k < heap.length);
      const kidTxt = kids.length ? kids.map((k) => `${heap[k]} (index ${k})`).join(' and ') : 'none';
      const kidTxtBn = kids.length ? kids.map((k) => `${heap[k]} (ইনডেক্স ${k})`).join(' আর ') : 'নেই';
      if (s === i) {
        push(
          T(`${heap[i]} is in place → stop`, `${heap[i]} জায়গামতো → থামো`),
          T(`Children of index ${i}: ${kidTxt}. ${kids.length ? `None is smaller than **${heap[i]}**` : `**${heap[i]}** is a leaf`}, so the heap rule holds again. Stop.`, `ইনডেক্স ${i}-এর চাইল্ড: ${kidTxtBn}। ${kids.length ? `কেউই **${heap[i]}**-এর চেয়ে ছোট নয়` : `**${heap[i]}** একটা লিফ`}, তাই হিপের নিয়ম আবার ঠিক। থামো।`),
          sceneOf({ cursor: heap[i], states: states({ found: heap[i], visited: kids.map((k) => heap[k]) }), hl: Object.fromEntries([[i, 'done'], ...kids.map((k) => [k, 'visited'])]), status: T(`smallest = i → stop`, `smallest = i → থামো`) }),
          ['sLoop', 'sPick', 'sStop'],
          { i }
        );
        break;
      }
      const a = heap[i];
      const b = heap[s];
      push(
        T(`Smaller child ${b} < ${a} → swap`, `ছোট চাইল্ড ${b} < ${a} → অদলবদল`),
        T(`Children of index ${i}: ${kidTxt}. The smallest is **${b}**, and ${b} < ${a}. **Swap** them: ${a} sinks one level, ${b} moves up.`, `ইনডেক্স ${i}-এর চাইল্ড: ${kidTxtBn}। সবচেয়ে ছোট **${b}**, আর ${b} < ${a}। **অদলবদল** করো: ${a} এক লেভেল নামে, ${b} ওপরে ওঠে।`),
        sceneOf({ cursor: a, states: states({ cmp: [a, b] }), hl: { [i]: 'compare', [s]: 'compare' }, status: T(`heap[${s}] = ${b} < ${a}`, `heap[${s}] = ${b} < ${a}`) }),
        ['sLoop', 'sPick'],
        { i, smallest: s }
      );
      [heap[i], heap[s]] = [heap[s], heap[i]];
      push(
        T(`${a} sinks to index ${s}`, `${a} ইনডেক্স ${s}-এ নামল`),
        T(`After the swap, **${b}** is at index ${i} and **${a}** at index ${s}. Check ${a} against its new children.`, `অদলবদলের পর **${b}** ইনডেক্স ${i}-এ আর **${a}** ইনডেক্স ${s}-এ। এবার ${a}-কে তার নতুন চাইল্ডদের সঙ্গে মেলাও।`),
        sceneOf({ cursor: a, states: states({ new: b, bad: a }), hl: { [i]: 'relax', [s]: 'relax' }, status: T(`swap → i = ${s}`, `অদলবদল → i = ${s}`) }),
        ['sSwap'],
        { i: s }
      );
      i = s;
    }
  }
  push(
    T(`extractMin returns ${min}`, `extractMin ফেরত দেয় ${min}`),
    T(
      `\`extractMin\` returns **${min}**. The heap is valid again: **[${heap.join(', ') || 'empty'}]**${heap.length ? `, with the next smallest value, **${heap[0]}**, at the root` : ''}.\n\n> The value sinks at most the height of the tree: **O(log n)**. Calling extractMin again and again gives the values in sorted order — that is **heapsort**.`,
      `\`extractMin\` ফেরত দেয় **${min}**। হিপ আবার ঠিক: **[${heap.join(', ') || 'খালি'}]**${heap.length ? `, পরের সবচেয়ে ছোট মান **${heap[0]}** রুটে` : ''}।\n\n> মানটা বড়জোর ট্রির উচ্চতা পর্যন্ত নামে: **O(log n)**। বারবার extractMin কল করলে মানগুলো সাজানো ক্রমে আসে — এটাই **হিপসর্ট**।`
    ),
    sceneOf({ states: states({ found: heap[0] }), hl: Object.fromEntries(heap.map((_, k) => [k, 'done'])), status: T(`return <b>${min}</b>`, `return <b>${min}</b>`) }),
    ['eRet', 'done']
  );
  return steps;
}

/* ================================================================ run */

export function runTreeOp(op) {
  const { vals } = parseValues(op.values);
  const A = op.algo;
  let steps;
  if (A === 'avl') steps = genAvl(vals);
  else if (A === 'heapBuild') steps = genHeapBuild(vals);
  else if (A === 'heapExtract') steps = genHeapExtract(vals);
  else {
    const root = buildTreeOf(vals, op.shape);
    steps = A === 'levelorder' ? genLevelOrder(root, vals) : genTraverse(root, A).steps;
  }
  const prog = treeProgram(op, vals);
  return { steps, code: prog.code, lineMap: prog.lineMap };
}

export function randomTreeOp(algo, shape) {
  const n = 6 + Math.floor(Math.random() * 3);
  const set = new Set();
  while (set.size < n) set.add(1 + Math.floor(Math.random() * 99));
  return { algo, values: [...set].join(', '), shape: TREE_ALGOS[algo].shape ? shape : 'bst' };
}

/* ================================================================ the traversal lesson */

/**
 * Steps for the "Tree Traversals" lesson. It shows its own short code (one
 * function per order, numbered lines), so the named lines of the traced steps
 * are translated to that code's line numbers.
 */
const LESSON_LINES = {
  preorder: { call: 1, header: 1, ifNull: 2, visit: 3, left: 4, right: 5, done: 6 },
  inorder: { call: 1, header: 1, ifNull: 2, left: 3, visit: 4, right: 5, done: 6 },
  postorder: { call: 1, header: 1, ifNull: 2, left: 3, right: 4, visit: 5, done: 6 },
  bfs: { call: 1, header: 1, init: 3, whileCheck: 4, pop: 5, visit: 6, pushL: 7, pushR: 8, done: 9 }
};
export function lessonTraversalSteps(root, kind) {
  if (!root) return [];
  const vals = allVals(root);
  const steps = kind === 'bfs' ? genLevelOrder(root, vals) : genTraverse(root, kind).steps;
  const map = LESSON_LINES[kind] || LESSON_LINES.inorder;
  return steps.map((s) => ({ ...s, line: [...new Set([].concat(s.line).map((l) => map[l]).filter((l) => l != null))] }));
}
