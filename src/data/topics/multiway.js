/**
 * Multiway Search Trees, B-Trees, B+ Trees & Architecture Comparison
 * Covers: 2-3 Trees & Node Splitting, B-Trees of Order m & Disk I/O Block Optimization,
 * B+ Trees with Linked Leaf Range Pointers, and the Master Data Structure Comparison.
 * Grounded in: advanced-search-trees-avl-btree-guide.pdf
 */

export const multiwayTopics = [
  {
    id: 'two-three-trees',
    name: { en: '2-3 Trees & Node Splitting', bn: '২-৩ ট্রি ও নোড স্প্লিটিং' },
    description: {
      en: 'Nodes with 1 or 2 keys, and how a full node splits',
      bn: '১ বা ২ কী-ওয়ালা নোড, আর ভরা নোড কীভাবে ভাগ হয়'
    },
    categoryKey: 'trees',
    subgroupKey: 'multiway',
    level: 'intermediate',
    order: 10,
    icon: '🌱',
    complexity: {
      time: 'O(log n) strictly',
      space: 'O(n)',
      note: {
        en: 'In a 2-3 tree, all leaves appear at the exact same depth. Node splits grow the tree uniformly upward from the root, guaranteeing perfect balance.',
        bn: '২-৩ ট্রিতে সমস্ত লিফ নোড একদম একই গভীরতায় থাকে। নোড স্প্লিট হয়ে ট্রিটি নিচ থেকে উপরের দিকে বৃদ্ধি পায়।'
      }
    },
    code: {
      pseudo: {
        en: [
          "// 2-3 Tree Node Structure & Split Logic",
          "class Node23:",
          "  keys = []      // 1 key (2-node) or 2 keys (3-node)",
          "  children = []  // 2 children or 3 children",
          "",
          "function insertKey(node, key):",
          "  // 1. Traverse down to appropriate leaf",
          "  // 2. Add key into leaf keys in sorted order",
          "  if node.keys.length == 3: // Temporary 4-node overflow!",
          "    median = node.keys[1]   // Middle key",
          "    leftNode  = new Node23([node.keys[0]])",
          "    rightNode = new Node23([node.keys[2]])",
          "    promoteToParent(median, leftNode, rightNode)",
          ""
        ],
        bn: [
          "// ২-৩ ট্রি নোড স্ট্রাকচার ও স্প্লিট লজিক",
          "class Node23:",
          "  keys = []      // ১টি কি (২-নোড) বা ২টি কি (৩-নোড)",
          "  children = []  // ২টি সন্তান বা ৩টি সন্তান",
          "",
          "function insertKey(node, key):",
          "  // ১. নিচে নেমে সঠিক লিফে পৌঁছাও",
          "  // ২. লিফের ভেতর সর্টেড ক্রমে কি যোগ করো",
          "  if node.keys.length == 3: // অস্থায়ী ৪-নোড ওভারফ্লো!",
          "    median = node.keys[1]   // মাঝখানের মিডিয়ান কি",
          "    leftNode  = new Node23([node.keys[0]])",
          "    rightNode = new Node23([node.keys[2]])",
          "    promoteToParent(median, leftNode, rightNode)",
          ""
        ]
      },
      js: {
        en: [
          "// JavaScript 2-3 Tree Node Structure",
          "class Node23 {",
          "  constructor(keys = [], children = []) {",
          "    this.keys = keys;",
          "    this.children = children;",
          "  }",
          "  isLeaf() { return this.children.length === 0; }",
          "}",
          "function split(node) {",
          "  const median = node.keys[1];",
          "  const left = new Node23([node.keys[0]]);",
          "  const right = new Node23([node.keys[2]]);",
          "  return { median, left, right };",
          "}"
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট ২-৩ ট্রি নোড স্ট্রাকচার",
          "class Node23 {",
          "  constructor(keys = [], children = []) {",
          "    this.keys = keys;",
          "    this.children = children;",
          "  }",
          "  isLeaf() { return this.children.length === 0; }",
          "}",
          "function split(node) {",
          "  const median = node.keys[1];",
          "  const left = new Node23([node.keys[0]]);",
          "  const right = new Node23([node.keys[2]]);",
          "  return { median, left, right };",
          "}"
        ]
      },
      java: {
        en: [
          "// Java 2-3 Tree Node Structure",
          "class Node23 {",
          "  List<Integer> keys = new ArrayList<>();",
          "  List<Node23> children = new ArrayList<>();",
          "  Node23(int... k) { for (int x : k) keys.add(x); }",
          "  boolean isLeaf() { return children.isEmpty(); }",
          "}",
          "record SplitResult(int median, Node23 left, Node23 right) {}",
          "SplitResult split(Node23 node) {  // the middle key goes up",
          "  int median = node.keys.get(1);",
          "  Node23 left = new Node23(node.keys.get(0));",
          "  Node23 right = new Node23(node.keys.get(2));",
          "  return new SplitResult(median, left, right);",
          "}"
        ],
        bn: [
          "// জাভা ২-৩ ট্রি নোড স্ট্রাকচার",
          "class Node23 {",
          "  List<Integer> keys = new ArrayList<>();",
          "  List<Node23> children = new ArrayList<>();",
          "  Node23(int... k) { for (int x : k) keys.add(x); }",
          "  boolean isLeaf() { return children.isEmpty(); }",
          "}",
          "record SplitResult(int median, Node23 left, Node23 right) {}",
          "SplitResult split(Node23 node) {  // মাঝের কী ওপরে যায়",
          "  int median = node.keys.get(1);",
          "  Node23 left = new Node23(node.keys.get(0));",
          "  Node23 right = new Node23(node.keys.get(2));",
          "  return new SplitResult(median, left, right);",
          "}"
        ]
      },
      python: {
        en: [
          "# Python 2-3 Tree Node Structure",
          "class Node23:",
          "  def __init__(self, keys=None, children=None):",
          "    self.keys = list(keys) if keys else []",
          "    self.children = list(children) if children else []",
          "",
          "  def is_leaf(self):",
          "    return len(self.children) == 0",
          "",
          "def split(node):",
          "  median = node.keys[1]",
          "  left = Node23([node.keys[0]])",
          "  right = Node23([node.keys[2]])",
          "  return median, left, right"
        ],
        bn: [
          "# পাইথন ২-৩ ট্রি নোড স্ট্রাকচার",
          "class Node23:",
          "  def __init__(self, keys=None, children=None):",
          "    self.keys = list(keys) if keys else []",
          "    self.children = list(children) if children else []",
          "",
          "  def is_leaf(self):",
          "    return len(self.children) == 0",
          "",
          "def split(node):",
          "  median = node.keys[1]",
          "  left = Node23([node.keys[0]])",
          "  right = Node23([node.keys[2]])",
          "  return median, left, right"
        ]
      },
      cpp: {
        en: [
          "// C++ 2-3 Tree Node Structure",
          "struct Node23 {",
          "  vector<int> keys;",
          "  vector<Node23*> children;",
          "  Node23(initializer_list<int> k) : keys(k) {}",
          "  bool isLeaf() const { return children.empty(); }",
          "};",
          "// Split a 3-key node: the middle key goes up, the other two become nodes",
          "tuple<int, Node23*, Node23*> split(Node23* node) {",
          "  int median = node->keys[1];",
          "  Node23* left = new Node23({node->keys[0]});",
          "  Node23* right = new Node23({node->keys[2]});",
          "  return {median, left, right};",
          "}"
        ],
        bn: [
          "// সি++ ২-৩ ট্রি নোড স্ট্রাকচার",
          "struct Node23 {",
          "  vector<int> keys;",
          "  vector<Node23*> children;",
          "  Node23(initializer_list<int> k) : keys(k) {}",
          "  bool isLeaf() const { return children.empty(); }",
          "};",
          "// ৩-কী নোড ভাগ: মাঝের কী ওপরে যায়, বাকি দুটো আলাদা নোড হয়",
          "tuple<int, Node23*, Node23*> split(Node23* node) {",
          "  int median = node->keys[1];",
          "  Node23* left = new Node23({node->keys[0]});",
          "  Node23* right = new Node23({node->keys[2]});",
          "  return {median, left, right};",
          "}"
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'More than one key per node',
          bn: 'এক নোডে একাধিক কী'
        },
        explanation: {
          en: 'In a binary tree each node holds **1 value** and has **at most 2 children**. A **multiway tree** lets one node hold **several sorted values** and have **more children**.\n\nThe simplest is the **2-3 tree**:\n- a **2-node** holds **1 key** and has **2 children**;\n- a **3-node** holds **2 keys** and has **3 children** (smaller than both · in between · bigger than both).\n\nIts special rule: **all leaves are always on the same level** — the tree is always perfectly balanced.',
          bn: 'বাইনারি ট্রিতে প্রতিটা নোডে **১টা মান** আর **বড়জোর ২টা চাইল্ড**। **মাল্টিওয়ে ট্রি** একটা নোডকে **কয়েকটা সাজানো মান** রাখতে আর **বেশি চাইল্ড** নিতে দেয়।\n\nসবচেয়ে সহজটা **২-৩ ট্রি**:\n- **২-নোড**-এ **১টা কী** আর **২টা চাইল্ড**;\n- **৩-নোড**-এ **২টা কী** আর **৩টা চাইল্ড** (দুটোর চেয়েই ছোট · মাঝামাঝি · দুটোর চেয়েই বড়)।\n\nএর বিশেষ নিয়ম: **সব লিফ সবসময় একই লেভেলে** — ট্রি সবসময় পুরোপুরি ব্যালান্সড।'
        },
        line: 0,
        iteration: { i: 1, of: 4, label: { en: 'Invariants', bn: 'শর্তাবলী' } },
        state: { twoNode: '1 key, 2 kids', threeNode: '2 keys, 3 kids', allLeavesAtSameDepth: true },
        scene: {
          kind: 'multiway',
          order: 3,
          label: '2-3 Tree: Root is a 3-node [20, 50] with 3 subtrees; all leaves at depth 1',
          nodes: [
            { id: 'root', keys: [20, 50], children: ['c1', 'c2', 'c3'], state: 'active' },
            { id: 'c1', keys: [10], state: 'ok' },
            { id: 'c2', keys: [30, 40], state: 'ok' },
            { id: 'c3', keys: [60, 70], state: 'ok' }
          ],
          note: 'Notice all leaf nodes [10], [30, 40], [60, 70] are aligned at the exact same depth.'
        }
      },
      {
        title: {
          en: 'Insert into a node with room',
          bn: 'জায়গা আছে এমন নোডে ইনসার্ট'
        },
        explanation: {
          en: 'Insert **15**:\n\n1. walk down like a search and arrive at the leaf `[10]`;\n2. that leaf has only 1 key, so there is **room for one more**;\n3. put 15 inside, in order → the leaf becomes `[10, 15]`.\n\nNothing moves, no rotation, and the height does not change.',
          bn: '**15** ইনসার্ট করো:\n\n১. সার্চের মতো নিচে নামো আর লিফ `[10]`-এ পৌঁছাও;\n২. সেই লিফে মাত্র ১টা কী, তাই **আরেকটার জায়গা আছে**;\n৩. 15 ভেতরে ক্রম মেনে বসাও → লিফ হয় `[10, 15]`।\n\nকিছুই সরে না, কোনো রোটেশন নেই, উচ্চতাও বদলায় না।'
        },
        line: 5,
        iteration: { i: 2, of: 4, label: { en: 'Insert into 2-Node', bn: '২-নোডে ইনসার্ট' } },
        state: { inserted: 15, targetLeaf: '[10]', resultLeaf: '[10, 15]', treeHeight: 1 },
        scene: {
          kind: 'multiway',
          order: 3,
          label: 'Leaf [10] absorbs new key 15 → Expands to 3-Node [10, 15]',
          nodes: [
            { id: 'root', keys: [20, 50], children: ['c1', 'c2', 'c3'] },
            { id: 'c1', keys: [10, 15], state: 'new', hlKeys: { 1: 'ok' } },
            { id: 'c2', keys: [30, 40] },
            { id: 'c3', keys: [60, 70] }
          ],
          note: 'Node c1 successfully expanded to [10, 15] without disturbing the rest of the tree.'
        }
      },
      {
        title: {
          en: 'Insert into a full node: split it',
          bn: 'ভরা নোডে ইনসার্ট: ভাগ করো'
        },
        explanation: {
          en: 'Insert **35** into the leaf `[30, 40]`, which is already full (2 keys).\n\n1. For a moment it holds **3 keys**: `[30, 35, 40]` — too many.\n2. **Split** it:\n   - the **middle** key `35` moves **up** into the parent;\n   - `30` becomes its own node `[30]`;\n   - `40` becomes its own node `[40]`.\n\nThe parent now has one more key, and one more child — exactly what it needs.',
          bn: 'আগেই ভরা (২টা কী) লিফ `[30, 40]`-এ **35** ইনসার্ট করো।\n\n১. মুহূর্তের জন্য এতে **৩টা কী**: `[30, 35, 40]` — বেশি হয়ে গেল।\n২. **ভাগ** করো:\n   - **মাঝের** কী `35` **ওপরে** প্যারেন্টে চলে যায়;\n   - `30` নিজেই একটা নোড `[30]`;\n   - `40` নিজেই একটা নোড `[40]`।\n\nপ্যারেন্টে এখন একটা কী আর একটা চাইল্ড বেশি — ঠিক যা দরকার।'
        },
        line: 7,
        iteration: { i: 3, of: 4, label: { en: 'Node Split', bn: 'নোড স্প্লিট' } },
        state: { overflowNode: '[30, 35, 40]', medianPromoted: 35, leftSplit: '[30]', rightSplit: '[40]' },
        scene: {
          kind: 'multiway',
          order: 3,
          label: 'Median 35 promotes to parent; remaining keys split into [30] and [40]',
          nodes: [
            { id: 'root', keys: [20, 35, 50], children: ['c1', 'c2a', 'c2b', 'c3'], state: 'split', hlKeys: { 1: 'promote' } },
            { id: 'c1', keys: [10, 15] },
            { id: 'c2a', keys: [30], state: 'new' },
            { id: 'c2b', keys: [40], state: 'new' },
            { id: 'c3', keys: [60, 70] }
          ],
          note: 'Key 35 promoted upward into root; the overflowed node cleanly split into two.'
        }
      },
      {
        title: {
          en: 'Splits can climb to the top',
          bn: 'ভাগ ওপর পর্যন্ত উঠতে পারে'
        },
        explanation: {
          en: 'What if the parent was already full too? Then the parent **splits as well** and pushes its middle key up — the split can climb all the way up.\n\nIf the **root** splits, a brand new root is made from the middle key. That is the only way a 2-3 tree gets taller.\n\n> **Key idea:** a BST grows **downward** (new leaves at the bottom); a 2-3 tree grows **upward** (a new root on top). That is why all its leaves always stay on the same level.',
          bn: 'প্যারেন্টও আগে থেকে ভরা থাকলে? তখন প্যারেন্টও **ভাগ হয়** আর তার মাঝের কী ওপরে পাঠায় — ভাগটা একদম ওপর পর্যন্ত উঠতে পারে।\n\n**রুট** ভাগ হলে, মাঝের কী দিয়ে একদম নতুন একটা রুট বানানো হয়। ২-৩ ট্রি লম্বা হওয়ার এটাই একমাত্র উপায়।\n\n> **মূল ধারণা:** BST **নিচের দিকে** বাড়ে (নতুন লিফ নিচে); ২-৩ ট্রি বাড়ে **ওপরের দিকে** (ওপরে নতুন রুট)। এজন্যই এর সব লিফ সবসময় একই লেভেলে থাকে।'
        },
        line: 11,
        iteration: { i: 4, of: 4, label: { en: 'Tree Growth', bn: 'ট্রির বৃদ্ধি' } },
        state: { growthDirection: 'Upward from root', leafBalance: '100% equal depth', time: 'O(log N)' },
        scene: {
          kind: 'multiway',
          order: 3,
          label: { en: 'The root split → a new root [40] appeared on top', bn: 'রুট ভাগ হয়েছে → ওপরে নতুন রুট [40] তৈরি' },
          root: 'r',
          nodes: [
            { id: 'r', keys: [40], children: ['a', 'b'] },
            { id: 'a', keys: [20], children: ['a1', 'a2'] },
            { id: 'b', keys: [60], children: ['b1', 'b2'] },
            { id: 'a1', keys: [10] },
            { id: 'a2', keys: [30] },
            { id: 'b1', keys: [50] },
            { id: 'b2', keys: [70, 80] }
          ],
          highlights: { promote: ['r'], split: ['a', 'b'] },
          note: { en: 'The tree grew one level <b>at the top</b>, so every leaf is still on the same level.', bn: 'ট্রি <b>ওপরের দিকে</b> এক লেভেল বাড়ল, তাই সব লিফ এখনো একই লেভেলে।' }
        }
      }
    ]
  },

  {
    id: 'b-trees',
    name: { en: 'B-Trees of Order m & Disk I/O', bn: 'অর্ডার m-এর B-ট্রি ও ডিস্ক I/O' },
    description: {
      en: 'Wide, short trees that need very few disk reads',
      bn: 'চওড়া, খাটো ট্রি যাতে খুব কম ডিস্ক রিড লাগে'
    },
    categoryKey: 'trees',
    subgroupKey: 'multiway',
    level: 'intermediate',
    order: 20,
    icon: '🗄️',
    complexity: {
      time: 'O(log_m n)',
      space: 'O(n)',
      note: {
        en: 'A B-Tree of order m has branching factor m. Height drops to log_m N. For m = 1000, 1 billion records are searched in just 3 disk seeks!',
        bn: 'm অর্ডারের B-ট্রিতে ব্রাঞ্চিং ফ্যাক্টর m। উচ্চতা কমে হয় log_m N। m = ১০০০ হলে ১০০ কোটি রেকর্ড মাত্র ৩টি ডিস্ক সিকে খুঁজে পাওয়া যায়!'
      }
    },
    code: {
      pseudo: {
        en: [
          "// B-Tree of Order m Properties:",
          "// 1. Every node has at most m children and m - 1 keys",
          "// 2. Every internal node (except root) has at least ceil(m/2) children",
          "// 3. The root has at least 2 children (unless tree has 1 node)",
          "// 4. All leaves appear at the exact same depth",
          "// 5. A node with k children contains k - 1 sorted keys",
          "",
          "function btreeSearch(node, key):",
          "  i = 0",
          "  while i < node.keys.length and key > node.keys[i]: i++",
          "  if i < node.keys.length and key == node.keys[i]: return node // Found!",
          "  if node.isLeaf(): return null // Not found",
          "  return btreeSearch(node.children[i], key) // Recurse child block"
        ],
        bn: [
          "// অর্ডার m-এর B-ট্রির শর্তাবলী:",
          "// ১. প্রতিটি নোডে সর্বোচ্চ m সন্তান এবং m - ১টি কি থাকে",
          "// ২. রুট বাদে সমস্ত ইন্টারনাল নোডে কমপক্ষে ceil(m/2) সন্তান থাকে",
          "// ৩. রুটে কমপক্ষে ২টি সন্তান থাকে",
          "// ৪. সমস্ত লিফ একদম একই লেভেলে অবস্থান করে",
          "// ৫. k সন্তান বিশিষ্ট নোডে k - ১টি সর্টেড কি থাকে",
          "",
          "function btreeSearch(node, key):",
          "  i = 0",
          "  while i < node.keys.length and key > node.keys[i]: i++",
          "  if i < node.keys.length and key == node.keys[i]: return node // পাওয়া গেছে!",
          "  if node.isLeaf(): return null // নেই",
          "  return btreeSearch(node.children[i], key) // সাব-ট্রি ব্লকে যাও"
        ]
      },
      js: {
        en: [
          "// JavaScript B-Tree Search",
          "function btreeSearch(node, key) {",
          "  let i = 0;",
          "  while (i < node.keys.length && key > node.keys[i]) i++;",
          "  if (i < node.keys.length && key === node.keys[i]) return node;",
          "  if (!node.children.length) return null;",
          "  return btreeSearch(node.children[i], key);",
          "}",
          "// Branching factor m reduces tree height dramatically",
          "",
          "",
          "",
          ""
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট B-ট্রি সার্চ",
          "function btreeSearch(node, key) {",
          "  let i = 0;",
          "  while (i < node.keys.length && key > node.keys[i]) i++;",
          "  if (i < node.keys.length && key === node.keys[i]) return node;",
          "  if (!node.children.length) return null;",
          "  return btreeSearch(node.children[i], key);",
          "}",
          "// ব্রাঞ্চিং ফ্যাক্টর m ট্রির উচ্চতা বহুগুণ কমিয়ে আনে",
          "",
          "",
          "",
          ""
        ]
      },
      java: {
        en: [
          "// Java B-Tree Search",
          "BTreeNode btreeSearch(BTreeNode node, int key) {",
          "  int i = 0;",
          "  while (i < node.keys.size() && key > node.keys.get(i)) i++;",
          "  if (i < node.keys.size() && key == node.keys.get(i)) return node;",
          "  if (node.children.isEmpty()) return null;",
          "  return btreeSearch(node.children.get(i), key);",
          "}",
          "// Huge fan-out minimizes secondary storage disk reads",
          "",
          "",
          "",
          ""
        ],
        bn: [
          "// জাভা B-ট্রি সার্চ",
          "BTreeNode btreeSearch(BTreeNode node, int key) {",
          "  int i = 0;",
          "  while (i < node.keys.size() && key > node.keys.get(i)) i++;",
          "  if (i < node.keys.size() && key == node.keys.get(i)) return node;",
          "  if (node.children.isEmpty()) return null;",
          "  return btreeSearch(node.children.get(i), key);",
          "}",
          "// বিশাল ফ্যান-আউট সেকেন্ডারি স্টোরেজের ডিস্ক রিড কমায়",
          "",
          "",
          "",
          ""
        ]
      },
      python: {
        en: [
          "# Python B-Tree Search",
          "def btree_search(node, key):",
          "  i = 0",
          "  while i < len(node.keys) and key > node.keys[i]: i += 1",
          "  if i < len(node.keys) and key == node.keys[i]: return node",
          "  if not node.children: return None",
          "  return btree_search(node.children[i], key)",
          "",
          "# Order m minimizes disk block seeks",
          "",
          "",
          "",
          ""
        ],
        bn: [
          "# পাইথন B-ট্রি সার্চ",
          "def btree_search(node, key):",
          "  i = 0",
          "  while i < len(node.keys) and key > node.keys[i]: i += 1",
          "  if i < len(node.keys) and key == node.keys[i]: return node",
          "  if not node.children: return None",
          "  return btree_search(node.children[i], key)",
          "",
          "# m অর্ডার ডিস্কের ব্লক রিড সবচেয়ে কমিয়ে আনে",
          "",
          "",
          "",
          ""
        ]
      },
      cpp: {
        en: [
          "// C++ B-Tree Search",
          "BTreeNode* btreeSearch(BTreeNode* node, int key) {",
          "  int i = 0;",
          "  while (i < node->keys.size() && key > node->keys[i]) i++;",
          "  if (i < node->keys.size() && key == node->keys[i]) return node;",
          "  if (node->children.empty()) return nullptr;",
          "  return btreeSearch(node->children[i], key);",
          "}",
          "// Log_m(N) disk blocks visited",
          "",
          "",
          "",
          ""
        ],
        bn: [
          "// সি++ B-ট্রি সার্চ",
          "BTreeNode* btreeSearch(BTreeNode* node, int key) {",
          "  int i = 0;",
          "  while (i < node->keys.size() && key > node->keys[i]) i++;",
          "  if (i < node->keys.size() && key == node->keys[i]) return node;",
          "  if (node->children.empty()) return nullptr;",
          "  return btreeSearch(node->children[i], key);",
          "}",
          "// মাত্র Log_m(N) টি ডিস্ক ব্লক ভিজিট করতে হয়",
          "",
          "",
          "",
          ""
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'Why B-trees? Disks are slow',
          bn: 'B-ট্রি কেন? ডিস্ক ধীর'
        },
        explanation: {
          en: 'Big databases do not fit in memory; they live on **disk**. Reading from disk is **thousands of times slower** than reading from memory.\n\nA disk is read in **blocks** (for example 4 KB at a time). Reading 1 value costs about the same as reading a whole block.\n\nSo with a billion values in an AVL tree (height about 30), one search could mean **30 slow disk reads**. A **B-tree** fixes this by putting **hundreds of keys in each node** — one node fills one disk block — so the tree becomes very **short and wide**.',
          bn: 'বড় ডেটাবেস মেমরিতে আঁটে না; থাকে **ডিস্কে**। ডিস্ক থেকে পড়া মেমরি থেকে পড়ার চেয়ে **হাজার হাজার গুণ ধীর**।\n\nডিস্ক পড়া হয় **ব্লকে ব্লকে** (যেমন একবারে 4 KB)। ১টা মান পড়তে প্রায় পুরো একটা ব্লক পড়ার সমান খরচ।\n\nতাই একশো কোটি মানের AVL ট্রিতে (উচ্চতা প্রায় ৩০) একটা সার্চে লাগতে পারে **৩০টা ধীর ডিস্ক রিড**। **B-ট্রি** এটা ঠিক করে **প্রতিটা নোডে শত শত কী** রেখে — একটা নোডে একটা ডিস্ক ব্লক ভরে — তাই ট্রিটা খুব **খাটো আর চওড়া** হয়।'
        },
        line: 0,
        iteration: { i: 1, of: 4, label: { en: 'Disk Bottleneck', bn: 'ডিস্ক সমস্যা' } },
        state: { ramSpeed: '10 ns', diskSpeed: '10 ms', speedDifference: '1,000,000x slower' },
        scene: {
          kind: 'chart',
          label: { en: 'Disk reads to find 1 record among 1 billion', bn: '১০০ কোটি রেকর্ডের মধ্যে ১টা খুঁজতে কতবার ডিস্ক পড়তে হয়' },
          max: 30,
          items: [
            { label: { en: 'AVL tree', bn: 'AVL ট্রি' }, v: 30, color: 'var(--red)', note: { en: '2 keys per node · ≈ 300 ms', bn: 'নোডে ২টা কী · ≈ 300 ms' } },
            { label: { en: 'B-tree', bn: 'B-ট্রি' }, v: 4, color: 'var(--green)', note: { en: '512 keys per node · ≈ 40 ms', bn: 'নোডে ৫১২টা কী · ≈ 40 ms' } }
          ],
          caption: { en: 'one node = one disk block, so a wide node saves disk reads', bn: 'একটা নোড = একটা ডিস্ক ব্লক, তাই চওড়া নোডে ডিস্ক পড়া কমে' }
        }
      },
      {
        title: {
          en: 'The rules of a B-tree of order m',
          bn: 'অর্ডার m-এর B-ট্রির নিয়ম'
        },
        explanation: {
          en: '**Order m** = the most children a node may have. The rules:\n\n1. a node has at most **m children** and **m − 1 keys**;\n2. every node except the root is **at least half full** (at least ⌈m/2⌉ children) — so no space is wasted;\n3. the root has at least 2 children (unless it is the only node);\n4. **all leaves are on the same level**;\n5. a node with k children holds k − 1 sorted keys that separate those children.\n\nA 2-3 tree is simply a B-tree of order 3.',
          bn: '**অর্ডার m** = একটা নোড সর্বোচ্চ কয়টা চাইল্ড নিতে পারে। নিয়মগুলো:\n\n১. একটা নোডে বড়জোর **m টা চাইল্ড** আর **m − 1টা কী**;\n২. রুট ছাড়া প্রতিটা নোড **অন্তত অর্ধেক ভরা** (অন্তত ⌈m/2⌉টা চাইল্ড) — তাই জায়গা নষ্ট হয় না;\n৩. রুটের অন্তত ২টা চাইল্ড (যদি না এটাই একমাত্র নোড হয়);\n৪. **সব লিফ একই লেভেলে**;\n৫. k টা চাইল্ডওয়ালা নোডে k − 1টা সাজানো কী, যা চাইল্ডগুলোকে আলাদা করে।\n\n২-৩ ট্রি আসলে অর্ডার ৩-এর একটা B-ট্রি।'
        },
        line: 1,
        iteration: { i: 2, of: 4, label: { en: '5 Invariants', bn: '৫টি নিয়ম' } },
        state: { order: 'm', maxKids: 'm', minKids: 'ceil(m/2)', maxKeys: 'm - 1', minKeys: 'ceil(m/2) - 1' },
        scene: {
          kind: 'multiway',
          order: 4,
          label: 'B-Tree of Order m = 4: Max 4 children, max 3 keys per node',
          nodes: [
            { id: 'r', keys: [30, 60], children: ['b1', 'b2', 'b3'], state: 'active' },
            { id: 'b1', keys: [10, 20], state: 'ok' },
            { id: 'b2', keys: [40, 50], state: 'ok' },
            { id: 'b3', keys: [70, 80, 90], state: 'ok' }
          ],
          note: 'Notice node b3 holds 3 keys (max allowed for m = 4). Every node follows the B-tree rules.'
        }
      },
      {
        title: {
          en: 'Searching a B-tree',
          bn: 'B-ট্রিতে সার্চ'
        },
        explanation: {
          en: 'Search for **45**:\n\n1. Read the root block `[30, 60]` from disk (**1 disk read**).\n2. Inside it (fast, in memory): 30 < 45 < 60 → follow the **middle** child.\n3. Read block `[40, 50]` (**2nd disk read**).\n4. 45 is not there, and this is a leaf → **not found**.\n\nOnly **2** disk reads. Comparing keys inside a block is cheap; the slow part is the reads, and the tree keeps them few.',
          bn: '**45** খোঁজো:\n\n১. ডিস্ক থেকে রুট ব্লক `[30, 60]` পড়ো (**১টা ডিস্ক রিড**)।\n২. এর ভেতরে (দ্রুত, মেমরিতে): 30 < 45 < 60 → **মাঝের** চাইল্ড ধরো।\n৩. ব্লক `[40, 50]` পড়ো (**২য় ডিস্ক রিড**)।\n৪. 45 সেখানে নেই, আর এটা লিফ → **পাওয়া যায়নি**।\n\nমাত্র **২টা** ডিস্ক রিড। ব্লকের ভেতরে কী তুলনা সস্তা; ধীর অংশ হলো রিড, আর ট্রি সেগুলো কম রাখে।'
        },
        line: 8,
        iteration: { i: 3, of: 4, label: { en: 'B-Tree Search', bn: 'B-ট্রি সার্চ' } },
        state: { target: 45, diskSeeks: 2, comparisonsInRAM: 4, found: false },
        scene: {
          kind: 'multiway',
          order: 4,
          label: 'Target 45: Root [30, 60] (Seek 1) → Middle child [40, 50] (Seek 2)',
          nodes: [
            { id: 'r', keys: [30, 60], children: ['b1', 'b2', 'b3'], state: 'active', hlKeys: { 0: 'ok', 1: 'ok' } },
            { id: 'b1', keys: [10, 20], state: 'dim' },
            { id: 'b2', keys: [40, 50], state: 'active' },
            { id: 'b3', keys: [70, 80, 90], state: 'dim' }
          ],
          note: 'Each multiway node fetched from disk eliminates hundreds of candidates simultaneously.'
        }
      },
      {
        title: {
          en: 'A billion records in about 4 reads',
          bn: 'একশো কোটি রেকর্ড প্রায় ৪টা রিডে'
        },
        explanation: {
          en: 'Take **1,000,000,000** records and order **m = 1000**. Each node has at least 500 children, so every level multiplies the reach by at least 500:\n\n500 → 250,000 → 125,000,000 → 62,500,000,000.\n\nSo the tree is only about **4 levels** tall: any record is found in **3–4 disk reads**, instead of about 30 for a binary tree. This is why databases and file systems are built on B-trees.',
          bn: '**১০০,০০,০০,০০০** (একশো কোটি) রেকর্ড আর অর্ডার **m = 1000** নাও। প্রতিটা নোডে অন্তত ৫০০টা চাইল্ড, তাই প্রতিটা লেভেল নাগাল অন্তত ৫০০ গুণ বাড়ায়:\n\n500 → 2,50,000 → 12,50,00,000 → 62,50,00,00,000।\n\nতাই ট্রিটা মাত্র প্রায় **৪ লেভেল** লম্বা: যেকোনো রেকর্ড পাওয়া যায় **৩–৪টা ডিস্ক রিডে**, বাইনারি ট্রির প্রায় ৩০টার বদলে। এজন্যই ডেটাবেস আর ফাইল সিস্টেম B-ট্রির ওপর বানানো।'
        },
        line: 12,
        iteration: { i: 4, of: 4, label: { en: 'Disk Seeks', bn: 'ডিস্ক সিক' } },
        state: { records: '1,000,000,000', order: 1000, treeHeight: 3, diskAccessTime: '~0.03 sec' },
        scene: {
          kind: 'chart',
          label: 'Tree Height for 1 Billion Records: BST (30 seeks) vs B-Tree (3 seeks)',
          unit: ' seeks',
          max: 35,
          items: [
            { label: 'Binary Tree (m=2)', v: 30, color: 'var(--red)', note: '30 disk seeks (300 ms)' },
            { label: 'B-Tree (m=100)', v: 5, color: 'var(--yellow)', note: '5 disk seeks (50 ms)' },
            { label: 'B-Tree (m=1000)', v: 3, color: 'var(--green)', note: '3 disk seeks (30 ms)!' }
          ],
          note: 'Increasing order m compresses tree height by orders of magnitude.'
        }
      }
    ]
  },

  {
    id: 'b-plus-trees',
    name: { en: 'B+ Trees & Range Queries', bn: 'B+ ট্রি ও রেঞ্জ কোয়েরি' },
    description: {
      en: 'The database index: data in linked leaves, fast ranges',
      bn: 'ডেটাবেস ইনডেক্স: জোড়া লিফে ডেটা, দ্রুত রেঞ্জ'
    },
    categoryKey: 'trees',
    subgroupKey: 'multiway',
    level: 'intermediate',
    order: 30,
    icon: '🔗',
    complexity: {
      time: 'O(log_m n) point lookup, O(k) range scan',
      space: 'O(n)',
      note: {
        en: 'B+ Trees store actual records ONLY in the leaves. All leaves are chained into a linked list, enabling lightning-fast range queries (WHERE age BETWEEN 20 AND 30). Used in MySQL InnoDB and PostgreSQL.',
        bn: 'B+ ট্রিতে আসল রেকর্ড কেবল লিফ নোডেই থাকে। সমস্ত লিফ একটি লিঙ্কড লিস্ট দিয়ে যুক্ত থাকে, যা ডেটাবেসের রেঞ্জ কোয়েরিকে অবিশ্বাস্য দ্রুত করে।'
      }
    },
    code: {
      pseudo: {
        en: [
          "// B+ Tree Architecture & Range Query",
          "// Internal Nodes: Store routing indices ONLY (no actual records)",
          "// Leaf Nodes: Store all data records + duplicate keys",
          "// Linked Leaves: Each leaf points to next leaf (leaf.next)",
          "",
          "function rangeQuery(root, minKey, maxKey):",
          "  // 1. Point search to find starting leaf containing minKey in O(log N)",
          "  leaf = findLeaf(root, minKey)",
          "  results = []",
          "  // 2. Linear scan through linked leaves in O(K) without touching root!",
          "  while leaf != null:",
          "    for entry in leaf.records:",
          "      if entry.key >= minKey and entry.key <= maxKey: results.add(entry)",
          "      else if entry.key > maxKey: return results",
          "    leaf = leaf.next // Jump to next sibling block in O(1)",
          "  return results"
        ],
        bn: [
          "// B+ ট্রি আর্কিটেকচার ও রেঞ্জ কোয়েরি",
          "// ইন্টারনাল নোড: শুধুমাত্র রাউটিং ইনডেক্স রাখে (আসল রেকর্ড থাকে না)",
          "// লিফ নোড: সমস্ত আসল ডেটা রেকর্ড ও কি রাখে",
          "// লিঙ্কড লিফ: প্রতিটি লিফ পরের লিফের সাথে যুক্ত (leaf.next)",
          "",
          "function rangeQuery(root, minKey, maxKey):",
          "  // ১. minKey ধারণকারী শুরুর লিফে নামো O(log N) সময়ে",
          "  leaf = findLeaf(root, minKey)",
          "  results = []",
          "  // ২. লিফ চেইন ধরে সোজা সামনে এগিয়ে যাও O(K) সময়ে!",
          "  while leaf != null:",
          "    for entry in leaf.records:",
          "      if entry.key >= minKey and entry.key <= maxKey: results.add(entry)",
          "      else if entry.key > maxKey: return results",
          "    leaf = leaf.next // O(1) সময়ে পরের ব্লকে যাও",
          "  return results"
        ]
      },
      js: {
        en: [
          "// JavaScript B+ Tree Range Query",
          "function rangeQuery(root, minKey, maxKey) {",
          "  let leaf = findLeaf(root, minKey);",
          "  const results = [];",
          "  while (leaf) {",
          "    for (const item of leaf.records) {",
          "      if (item.key >= minKey && item.key <= maxKey) results.push(item);",
          "      else if (item.key > maxKey) return results;",
          "    }",
          "    leaf = leaf.next;",
          "  }",
          "  return results;",
          "}",
          "",
          "",
          ""
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট B+ ট্রি রেঞ্জ কোয়েরি",
          "function rangeQuery(root, minKey, maxKey) {",
          "  let leaf = findLeaf(root, minKey);",
          "  const results = [];",
          "  while (leaf) {",
          "    for (const item of leaf.records) {",
          "      if (item.key >= minKey && item.key <= maxKey) results.push(item);",
          "      else if (item.key > maxKey) return results;",
          "    }",
          "    leaf = leaf.next;",
          "  }",
          "  return results;",
          "}",
          "",
          "",
          ""
        ]
      },
      java: {
        en: [
          "// Java B+ Tree Range Query",
          "List<Record> rangeQuery(BPlusNode root, int minKey, int maxKey) {",
          "  BPlusLeaf leaf = findLeaf(root, minKey);",
          "  List<Record> results = new ArrayList<>();",
          "  while (leaf != null) {",
          "    for (Record rec : leaf.records) {",
          "      if (rec.key >= minKey && rec.key <= maxKey) results.add(rec);",
          "      else if (rec.key > maxKey) return results;",
          "    }",
          "    leaf = leaf.next;",
          "  }",
          "  return results;",
          "}",
          "",
          "",
          ""
        ],
        bn: [
          "// জাভা B+ ট্রি রেঞ্জ কোয়েরি",
          "List<Record> rangeQuery(BPlusNode root, int minKey, int maxKey) {",
          "  BPlusLeaf leaf = findLeaf(root, minKey);",
          "  List<Record> results = new ArrayList<>();",
          "  while (leaf != null) {",
          "    for (Record rec : leaf.records) {",
          "      if (rec.key >= minKey && rec.key <= maxKey) results.add(rec);",
          "      else if (rec.key > maxKey) return results;",
          "    }",
          "    leaf = leaf.next;",
          "  }",
          "  return results;",
          "}",
          "",
          "",
          ""
        ]
      },
      python: {
        en: [
          "# Python B+ Tree Range Query",
          "def range_query(root, min_key, max_key):",
          "  leaf = find_leaf(root, min_key)",
          "  results = []",
          "  while leaf:",
          "    for key, val in leaf.records:",
          "      if min_key <= key <= max_key: results.append((key, val))",
          "      elif key > max_key: return results",
          "    leaf = leaf.next",
          "  return results",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        bn: [
          "# পাইথন B+ ট্রি রেঞ্জ কোয়েরি",
          "def range_query(root, min_key, max_key):",
          "  leaf = find_leaf(root, min_key)",
          "  results = []",
          "  while leaf:",
          "    for key, val in leaf.records:",
          "      if min_key <= key <= max_key: results.append((key, val))",
          "      elif key > max_key: return results",
          "    leaf = leaf.next",
          "  return results",
          "",
          "",
          "",
          "",
          "",
          ""
        ]
      },
      cpp: {
        en: [
          "// C++ B+ Tree Range Query",
          "vector<Record> rangeQuery(BPlusNode* root, int minKey, int maxKey) {",
          "  BPlusLeaf* leaf = findLeaf(root, minKey);",
          "  vector<Record> results;",
          "  while (leaf != nullptr) {",
          "    for (const auto& rec : leaf->records) {",
          "      if (rec.key >= minKey && rec.key <= maxKey) results.push_back(rec);",
          "      else if (rec.key > maxKey) return results;",
          "    }",
          "    leaf = leaf->next;",
          "  }",
          "  return results;",
          "}",
          "",
          "",
          ""
        ],
        bn: [
          "// সি++ B+ ট্রি রেঞ্জ কোয়েরি",
          "vector<Record> rangeQuery(BPlusNode* root, int minKey, int maxKey) {",
          "  BPlusLeaf* leaf = findLeaf(root, minKey);",
          "  vector<Record> results;",
          "  while (leaf != nullptr) {",
          "    for (const auto& rec : leaf->records) {",
          "      if (rec.key >= minKey && rec.key <= maxKey) results.push_back(rec);",
          "      else if (rec.key > maxKey) return results;",
          "    }",
          "    leaf = leaf->next;",
          "  }",
          "  return results;",
          "}",
          "",
          "",
          ""
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'B+ tree: data only in the leaves',
          bn: 'B+ ট্রি: ডেটা শুধু লিফে'
        },
        explanation: {
          en: 'A **B+ tree** is a B-tree tuned for databases. Two changes:\n\n1. **Upper nodes hold only signposts** (keys that say which way to go), never the actual records. Signposts are small, so each upper node fits even more children → the tree is even shorter.\n2. **All records live in the leaves**, and every leaf has a `next` link to the leaf on its right — the leaves form one **sorted chain**.',
          bn: '**B+ ট্রি** হলো ডেটাবেসের জন্য সাজানো একটা B-ট্রি। দুটো পরিবর্তন:\n\n১. **ওপরের নোডে শুধু দিকনির্দেশক** (কোন দিকে যেতে হবে বলে এমন কী), কখনো আসল রেকর্ড নয়। দিকনির্দেশক ছোট, তাই প্রতিটা ওপরের নোডে আরও বেশি চাইল্ড আঁটে → ট্রি আরও খাটো।\n২. **সব রেকর্ড থাকে লিফে**, আর প্রতিটা লিফের ডানের লিফে একটা `next` লিংক — লিফগুলো মিলে একটা **সাজানো চেইন**।'
        },
        line: 0,
        iteration: { i: 1, of: 4, label: { en: 'Architecture', bn: 'কাঠামো' } },
        state: { internalNodes: 'Routing Keys Only', leafNodes: 'All Data Records', leafLink: true },
        scene: {
          kind: 'multiway',
          order: 3,
          label: 'B+ Tree Architecture: Root routes queries; Leaves hold data linked via red arrows',
          leafLink: true,
          nodes: [
            { id: 'root', keys: [25, 50], children: ['l1', 'l2', 'l3'], state: 'active' },
            { id: 'l1', keys: [10, 20], state: 'ok' },
            { id: 'l2', keys: [25, 30, 40], state: 'ok' },
            { id: 'l3', keys: [50, 60, 70], state: 'ok' }
          ],
          note: 'Notice the red horizontal link connecting leaves [10, 20] → [25, 30, 40] → [50, 60, 70].'
        }
      },
      {
        title: {
          en: 'B-tree vs B+ tree',
          bn: 'B-ট্রি বনাম B+ ট্রি'
        },
        explanation: {
          en: '| | B-tree | B+ tree |\n|---|---|---|\n| Where records live | in every node | **only in the leaves** |\n| Children per node | fewer | **many more** (upper nodes are small) |\n| "All values from 25 to 60" | jump up and down the tree | **walk along the leaf chain** |\n| Every search | may stop early | always reaches a leaf (predictable speed) |\n\nThat is why MySQL, PostgreSQL and SQLite all store their indexes as B+ trees.',
          bn: '| | B-ট্রি | B+ ট্রি |\n|---|---|---|\n| রেকর্ড কোথায় | প্রতিটা নোডে | **শুধু লিফে** |\n| নোডপ্রতি চাইল্ড | কম | **অনেক বেশি** (ওপরের নোড ছোট) |\n| "25 থেকে 60-এর সব মান" | ট্রিতে ওঠানামা | **লিফ চেইন ধরে হাঁটা** |\n| প্রতিটা সার্চ | আগেই থামতে পারে | সবসময় লিফে পৌঁছায় (নির্ভরযোগ্য গতি) |\n\nএজন্যই MySQL, PostgreSQL আর SQLite তাদের ইনডেক্স B+ ট্রি হিসেবে রাখে।'
        },
        line: 4,
        iteration: { i: 2, of: 4, label: { en: 'Comparison', bn: 'তুলনা' } },
        state: { btreeRange: 'Requires full tree traversal', bplusRange: 'O(1) sequential leaf scan' },
        scene: {
          kind: 'multiway',
          isBPlus: true,
          label: { en: 'B+ tree: upper nodes hold only keys; records live in the linked leaves', bn: 'B+ ট্রি: ওপরের নোডে শুধু কী; রেকর্ড থাকে লিংক করা লিফে' },
          root: 'r',
          nodes: [
            { id: 'r', keys: [30, 60], children: ['l1', 'l2', 'l3'] },
            { id: 'l1', keys: [10, 20], sub: 'records' },
            { id: 'l2', keys: [30, 40, 50], sub: 'records' },
            { id: 'l3', keys: [60, 70, 80], sub: 'records' }
          ],
          highlights: { active: ['l1', 'l2', 'l3'] },
          note: { en: 'Green dashed arrows link the leaves, so a range scan just walks sideways.', bn: 'সবুজ ড্যাশ তীরগুলো লিফ জোড়ে, তাই রেঞ্জ খুঁজতে পাশাপাশি হাঁটলেই হয়।' }
        }
      },
      {
        title: {
          en: 'A range query: ids from 25 to 60',
          bn: 'রেঞ্জ কোয়েরি: id 25 থেকে 60'
        },
        explanation: {
          en: 'SQL: `SELECT * FROM users WHERE id BETWEEN 25 AND 60`\n\n1. **Find the start:** go down from the root to the leaf that holds 25 → leaf `[25, 30, 40]`. Collect 25, 30, 40.\n2. **Walk the chain:** follow `next` to leaf `[50, 60, 70]`. Collect 50 and 60; 70 is too big → stop.\n\nAfter finding the start, we never go back up the tree — we just walk right along the leaves.',
          bn: 'SQL: `SELECT * FROM users WHERE id BETWEEN 25 AND 60`\n\n১. **শুরু খোঁজো:** রুট থেকে নিচে 25-ওয়ালা লিফে যাও → লিফ `[25, 30, 40]`। 25, 30, 40 নাও।\n২. **চেইন ধরে হাঁটো:** `next` ধরে লিফ `[50, 60, 70]`-এ যাও। 50 আর 60 নাও; 70 বেশি বড় → থামো।\n\nশুরু পাওয়ার পর আর কখনো ট্রিতে ওপরে উঠি না — শুধু লিফ ধরে ডানে হাঁটি।'
        },
        line: 9,
        iteration: { i: 3, of: 4, label: { en: 'Range Scan', bn: 'রেঞ্জ স্ক্যান' } },
        state: { minKey: 25, maxKey: 60, initialSeek: 'O(log N)', scanTime: 'O(K) linear', result: '[25, 30, 40, 50, 60]' },
        scene: {
          kind: 'multiway',
          order: 3,
          label: 'Range Query [25 .. 60]: Hits leaf [25, 30, 40] then scans sequentially to [50, 60]',
          leafLink: true,
          nodes: [
            { id: 'root', keys: [25, 50], children: ['l1', 'l2', 'l3'], state: 'dim' },
            { id: 'l1', keys: [10, 20], state: 'dim' },
            { id: 'l2', keys: [25, 30, 40], state: 'active', hlKeys: { 0: 'ok', 1: 'ok', 2: 'ok' } },
            { id: 'l3', keys: [50, 60, 70], state: 'active', hlKeys: { 0: 'ok', 1: 'ok', 2: 'dim' } }
          ],
          note: 'Cyan highlighted leaves stream results sequentially without bouncing up and down the tree.'
        }
      },
      {
        title: {
          en: 'Result and cost',
          bn: 'ফলাফল আর খরচ'
        },
        explanation: {
          en: 'Result: `25, 30, 40, 50, 60` — 5 records.\n\nCost = **finding the start** (a few steps, the height of the tree) **+ one step per record returned**. Written as **O(log N + K)**, where K is how many records match.\n\nBonus: neighbouring leaves are usually stored next to each other on disk, so walking the chain is very fast.',
          bn: 'ফলাফল: `25, 30, 40, 50, 60` — ৫টা রেকর্ড।\n\nখরচ = **শুরু খোঁজা** (কয়েক ধাপ, ট্রির উচ্চতা) **+ প্রতিটা ফেরত রেকর্ডে এক ধাপ**। লেখা হয় **O(log N + K)**, যেখানে K হলো কয়টা রেকর্ড মিলেছে।\n\nবোনাস: পাশাপাশি লিফগুলো সাধারণত ডিস্কেও পাশাপাশি থাকে, তাই চেইন ধরে হাঁটা খুব দ্রুত।'
        },
        line: 14,
        iteration: { i: 4, of: 4, label: { en: 'Query Output', bn: 'কোয়েরি আউটপুট' } },
        state: { returnedRecords: 5, timeComplexity: 'O(log N + K)' },
        scene: {
          kind: 'array',
          label: 'Streamed Result Records: [25, 30, 40, 50, 60] ready for SQL Client',
          cells: [25, 30, 40, 50, 60],
          showIndex: true,
          highlights: { sorted: [0, 1, 2, 3, 4] },
          note: 'Sorted range results generated in optimal O(log N + K) time.'
        }
      }
    ]
  },

  {
    id: 'tree-comparison',
    name: { en: 'Comprehensive Search Tree Comparison', bn: 'সার্চ ট্রির পূর্ণাঙ্গ তুলনামূলক গাইড' },
    description: {
      en: 'Which search tree to use, and when',
      bn: 'কোন সার্চ ট্রি কখন ব্যবহার করবে'
    },
    categoryKey: 'trees',
    subgroupKey: 'multiway',
    level: 'intermediate',
    order: 40,
    icon: '📊',
    complexity: {
      time: 'O(log n) master guide',
      space: 'O(n)',
      note: {
        en: 'The definitive architectural decision matrix for software engineers: when to pick BST, AVL, Red-Black, B-Tree, or B+ Tree for real-world production systems.',
        bn: 'বাস্তব সফটওয়্যার ইঞ্জিনিয়ারিংয়ে কোন কাজের জন্য কোন ট্রি নির্বাচন করতে হবে তার পূর্ণাঙ্গ সিদ্ধান্ত গাইড।'
      }
    },
    code: {
      pseudo: {
        en: [
          "// Master Decision Matrix: Which Tree to Choose?",
          "// 1. In-memory read-heavy lookup -> AVL Tree (Rigid 1.44 log N)",
          "// 2. In-memory dynamic insert/delete -> Red-Black Tree (Fewer rotations)",
          "// 3. Disk file systems & block storage -> B-Tree of order m (Minimizes seeks)",
          "// 4. Relational database indices -> B+ Tree (Linked leaves for fast range queries)",
          "// 5. Priority queues & heapsort -> Binary Heap in array",
          "",
          "function selectTree(isDiskBased, isRangeQueryHeavy, isReadHeavy):",
          "  if isDiskBased and isRangeQueryHeavy: return \"B+ Tree\"",
          "  if isDiskBased: return \"B-Tree\"",
          "  if isReadHeavy: return \"AVL Tree\"",
          "  return \"Red-Black Tree\"",
          ""
        ],
        bn: [
          "// মাস্টার সিদ্ধান্ত গাইড: কোন ট্রি কখন ব্যবহার করবেন?",
          "// ১. মেমোরিতে রিড-প্রধান সার্চ -> AVL ট্রি (কঠোর ১.৪৪ log N)",
          "// ২. মেমোরিতে ঘনঘন ইনসার্ট ও ডিলিট -> রেড-ব্ল্যাক ট্রি (কম রোটেশন)",
          "// ৩. ডিস্ক ফাইল সিস্টেম ও স্টোরেজ -> অর্ডার m-এর B-ট্রি (কম ডিস্ক সিক)",
          "// ৪. ডেটাবেস ইনডেক্স ও রেঞ্জ কোয়েরি -> B+ ট্রি (লিঙ্কড লিফ চেইন)",
          "// ৫. প্রায়োরিটি কিউ ও সর্টিং -> বাইনারি হিপ অ্যারে",
          "",
          "function selectTree(isDiskBased, isRangeQueryHeavy, isReadHeavy):",
          "  if isDiskBased and isRangeQueryHeavy: return \"B+ Tree\"",
          "  if isDiskBased: return \"B-Tree\"",
          "  if isReadHeavy: return \"AVL Tree\"",
          "  return \"Red-Black Tree\"",
          ""
        ]
      },
      js: {
        en: [
          "// JavaScript Tree Selection Helper",
          "function selectTree({ isDiskBased, isRangeQueryHeavy, isReadHeavy }) {",
          "  if (isDiskBased && isRangeQueryHeavy) return \"B+ Tree\";",
          "  if (isDiskBased) return \"B-Tree\";",
          "  if (isReadHeavy) return \"AVL Tree\";",
          "  return \"Red-Black Tree\";",
          "}",
          "// Red-Black: C++ std::map, Java TreeMap",
          "// B+ Tree: MySQL InnoDB, PostgreSQL",
          "// B-Tree: Linux ext4, Apple APFS",
          "",
          "",
          ""
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট ট্রি নির্বাচন সহায়ক",
          "function selectTree({ isDiskBased, isRangeQueryHeavy, isReadHeavy }) {",
          "  if (isDiskBased && isRangeQueryHeavy) return \"B+ Tree\";",
          "  if (isDiskBased) return \"B-Tree\";",
          "  if (isReadHeavy) return \"AVL Tree\";",
          "  return \"Red-Black Tree\";",
          "}",
          "// রেড-ব্ল্যাক: C++ std::map, Java TreeMap",
          "// B+ ট্রি: MySQL InnoDB, PostgreSQL",
          "// B-ট্রি: Linux ext4, Apple APFS",
          "",
          "",
          ""
        ]
      },
      java: {
        en: [
          "// Java Tree Selection Helper",
          "String selectTree(boolean isDisk, boolean isRange, boolean isRead) {",
          "  if (isDisk && isRange) return \"B+ Tree\";",
          "  if (isDisk) return \"B-Tree\";",
          "  if (isRead) return \"AVL Tree\";",
          "  return \"Red-Black Tree\";",
          "}",
          "// AVL for fastest in-memory search lookup",
          "// Red-Black for balanced insertion/deletion speed",
          "// B/B+ for block disk storage",
          "",
          "",
          ""
        ],
        bn: [
          "// জাভা ট্রি নির্বাচন সহায়ক",
          "String selectTree(boolean isDisk, boolean isRange, boolean isRead) {",
          "  if (isDisk && isRange) return \"B+ Tree\";",
          "  if (isDisk) return \"B-Tree\";",
          "  if (isRead) return \"AVL Tree\";",
          "  return \"Red-Black Tree\";",
          "}",
          "// মেমোরি সার্চে সবচেয়ে দ্রুত AVL ট্রি",
          "// ইনসার্ট ও ডিলিটে দ্রুত রেড-ব্ল্যাক ট্রি",
          "// ডিস্ক ব্লকের জন্য B ও B+ ট্রি",
          "",
          "",
          ""
        ]
      },
      python: {
        en: [
          "# Python Tree Selection Helper",
          "def select_tree(is_disk=False, is_range=False, is_read=True):",
          "  if is_disk and is_range: return \"B+ Tree\"",
          "  if is_disk: return \"B-Tree\"",
          "  if is_read: return \"AVL Tree\"",
          "  return \"Red-Black Tree\"",
          "",
          "# AVL: 1.44 log2 N height bound",
          "# Red-Black: 2 log2(N + 1) height bound",
          "# B-Tree: log_m N height bound",
          "",
          "",
          ""
        ],
        bn: [
          "# পাইথন ট্রি নির্বাচন সহায়ক",
          "def select_tree(is_disk=False, is_range=False, is_read=True):",
          "  if is_disk and is_range: return \"B+ Tree\"",
          "  if is_disk: return \"B-Tree\"",
          "  if is_read: return \"AVL Tree\"",
          "  return \"Red-Black Tree\"",
          "",
          "# AVL: ১.৪৪ log2 N উচ্চতা সীমা",
          "# রেড-ব্ল্যাক: ২ log2(N + ১) উচ্চতা সীমা",
          "# B-ট্রি: log_m N উচ্চতা সীমা",
          "",
          "",
          ""
        ]
      },
      cpp: {
        en: [
          "// C++ Tree Selection Helper",
          "string selectTree(bool isDisk, bool isRange, bool isRead) {",
          "  if (isDisk && isRange) return \"B+ Tree\";",
          "  if (isDisk) return \"B-Tree\";",
          "  if (isRead) return \"AVL Tree\";",
          "  return \"Red-Black Tree\";",
          "}",
          "// Production mappings: std::map -> Red-Black, SQLite -> B+ Tree",
          "// File systems -> B-Tree, read-heavy in-memory lookup -> AVL",
          "",
          "",
          "",
          ""
        ],
        bn: [
          "// সি++ ট্রি নির্বাচন সহায়ক",
          "string selectTree(bool isDisk, bool isRange, bool isRead) {",
          "  if (isDisk && isRange) return \"B+ Tree\";",
          "  if (isDisk) return \"B-Tree\";",
          "  if (isRead) return \"AVL Tree\";",
          "  return \"Red-Black Tree\";",
          "}",
          "// বাস্তব প্রয়োগ: std::map -> রেড-ব্ল্যাক, SQLite -> B+ ট্রি",
          "// ফাইল সিস্টেম -> B-ট্রি, গেমিং লুকআপ -> AVL",
          "",
          "",
          "",
          ""
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'All search trees side by side',
          bn: 'সব সার্চ ট্রি পাশাপাশি'
        },
        explanation: {
          en: '| Tree | Search / insert / delete | Worst height | Used for |\n|---|---|---|---|\n| Plain BST | can be **N** | N − 1 (a line) | small, simple tables |\n| AVL | **log N** | about 1.44 log₂ N | many reads, few changes |\n| Red-Black | **log N** | about 2 log₂ N | `std::map`, Java `TreeMap` |\n| 2-3 tree | **log N** | log₂ N | the idea behind B-trees |\n| B-tree | **log N** (few disk reads) | tiny (wide nodes) | file systems |\n| B+ tree | **log N** + fast ranges | tiny | database indexes |',
          bn: '| ট্রি | সার্চ / ইনসার্ট / ডিলিট | সবচেয়ে খারাপ উচ্চতা | কোথায় ব্যবহার |\n|---|---|---|---|\n| সাধারণ BST | **N** হতে পারে | N − 1 (একটা লাইন) | ছোট, সহজ টেবিল |\n| AVL | **log N** | প্রায় 1.44 log₂ N | বেশি পড়া, কম বদল |\n| রেড-ব্ল্যাক | **log N** | প্রায় 2 log₂ N | `std::map`, Java `TreeMap` |\n| ২-৩ ট্রি | **log N** | log₂ N | B-ট্রির পেছনের ধারণা |\n| B-ট্রি | **log N** (কম ডিস্ক রিড) | খুব ছোট (চওড়া নোড) | ফাইল সিস্টেম |\n| B+ ট্রি | **log N** + দ্রুত রেঞ্জ | খুব ছোট | ডেটাবেস ইনডেক্স |'
        },
        line: 0,
        iteration: { i: 1, of: 4, label: { en: 'Master Table', bn: 'মাস্টার ছক' } },
        state: { bestForRead: 'AVL Tree', bestForWrite: 'Red-Black Tree', bestForDisk: 'B-Tree', bestForRangeQuery: 'B+ Tree' },
        scene: {
          kind: 'chart',
          label: { en: 'Worst-case height with N = 1,000,000 keys', bn: 'N = 1,000,000 কী থাকলে সবচেয়ে খারাপ উচ্চতা' },
          max: 40,
          items: [
            { label: 'AVL', v: 29, color: 'var(--cyan)', note: '1.44·log₂N' },
            { label: 'Red-Black', v: 40, color: 'var(--red)', note: '2·log₂(N+1)' },
            { label: '2-3 tree', v: 20, color: 'var(--purple)', note: '≤ log₂N' },
            { label: 'B-tree m=512', v: 3, color: 'var(--green)', note: 'log₂₅₆ N' }
          ],
          caption: { en: 'a plain BST can reach 999,999 — far off this chart', bn: 'সাধারণ BST 999,999 পর্যন্ত যেতে পারে — চার্টের অনেক বাইরে' }
        }
      },
      {
        title: {
          en: 'AVL or Red-Black?',
          bn: 'AVL না রেড-ব্ল্যাক?'
        },
        explanation: {
          en: 'Both are always fast (log N). The difference is small but real:\n\n- **AVL** is kept more tightly balanced → searches are a little faster, but changes do more rotations. Pick it when you **read much more than you change** (like a dictionary lookup).\n- **Red-Black** is a bit looser → searches a little slower, but changes are cheaper (at most 2 rotations per insert, 3 per delete). Pick it when data **changes often**.',
          bn: 'দুটোই সবসময় দ্রুত (log N)। পার্থক্য ছোট কিন্তু আসল:\n\n- **AVL** আরও কড়াভাবে ব্যালান্সড → খোঁজা একটু দ্রুত, কিন্তু বদলে বেশি রোটেশন। বেছে নাও যখন **বদলের চেয়ে পড়া অনেক বেশি** (যেমন অভিধানে শব্দ খোঁজা)।\n- **রেড-ব্ল্যাক** একটু ঢিলা → খোঁজা একটু ধীর, কিন্তু বদল সস্তা (প্রতি ইনসার্টে বড়জোর ২টা, ডিলিটে ৩টা রোটেশন)। বেছে নাও যখন ডেটা **প্রায়ই বদলায়**।'
        },
        line: 8,
        iteration: { i: 2, of: 4, label: { en: 'In-Memory Battle', bn: 'মেমোরির লড়াই' } },
        state: { avlHeight: '1.44 log N (shorter)', rbRotations: 'Max 2-3 rotations (faster writes)' },
        scene: {
          kind: 'chart',
          label: 'Maximum Height Comparison: AVL (1.44 log N) vs Red-Black (2.00 log N)',
          unit: ' height',
          max: 40,
          items: [
            { label: 'Perfect BST', v: 20, color: 'var(--green)', note: 'log2(10^6) = 20' },
            { label: 'AVL Tree', v: 28, color: 'var(--cyan)', note: '1.44 * 20 = 28' },
            { label: 'Red-Black Tree', v: 40, color: 'var(--yellow)', note: '2.00 * 20 = 40' }
          ],
          note: 'AVL is 30% shorter on average, making searches faster at the cost of more rotation work.'
        }
      },
      {
        title: {
          en: 'B-tree or B+ tree?',
          bn: 'B-ট্রি না B+ ট্রি?'
        },
        explanation: {
          en: 'Databases (MySQL, PostgreSQL, SQLite, Oracle) choose **B+ trees** for two reasons:\n\n1. **Range queries** like `WHERE age > 21` just walk along the linked leaves.\n2. The small upper nodes fit **in memory**, so a lookup usually needs only **one** real disk read — for the leaf.',
          bn: 'ডেটাবেস (MySQL, PostgreSQL, SQLite, Oracle) দুটো কারণে **B+ ট্রি** বেছে নেয়:\n\n১. `WHERE age > 21`-এর মতো **রেঞ্জ কোয়েরি** শুধু জোড়া লিফ ধরে হাঁটে।\n২. ছোট ওপরের নোডগুলো **মেমরিতে** আঁটে, তাই একটা খোঁজে সাধারণত মাত্র **১টা** আসল ডিস্ক রিড লাগে — লিফের জন্য।'
        },
        line: 9,
        iteration: { i: 3, of: 4, label: { en: 'Storage Engines', bn: 'স্টোরেজ ইঞ্জিন' } },
        state: { innoDbEngine: 'B+ Tree', postgresIndex: 'B+ Tree', rangeScanSpeed: 'Optimal' },
        scene: {
          kind: 'multiway',
          isBPlus: true,
          label: { en: 'WHERE age > 21 — find the first leaf once, then walk the leaf chain', bn: 'WHERE age > 21 — একবার প্রথম লিফ খুঁজে, তারপর লিফ চেইন ধরে হাঁটো' },
          root: 'r',
          nodes: [
            { id: 'r', keys: [21, 35], children: ['l1', 'l2', 'l3'] },
            { id: 'l1', keys: [18, 20] },
            { id: 'l2', keys: [21, 25, 30] },
            { id: 'l3', keys: [35, 40] }
          ],
          highlights: { active: ['l2', 'l3'], insert: ['r'] },
          note: { en: 'The upper levels are small enough to stay in RAM — only the leaves need disk reads.', bn: 'ওপরের লেভেলগুলো ছোট, তাই RAM-এ থাকে — শুধু লিফের জন্য ডিস্ক পড়তে হয়।' }
        }
      },
      {
        title: {
          en: 'What you learned in the tree chapter',
          bn: 'ট্রি অধ্যায়ে কী শিখলে'
        },
        explanation: {
          en: '- **Basics:** root, parent, child, leaf, height; full / complete / perfect / skewed trees; how to count tree shapes.\n- **Traversals:** preorder, inorder, postorder, level order — with recursion, a stack or a queue.\n- **BST:** search, insert and delete (all 3 cases) by going left or right.\n- **Balancing:** AVL balance factors and the 4 rotations; Red-Black colour rules.\n- **Multiway trees:** 2-3 splits, B-trees and B+ trees for disks and databases.\n\nNow try your own values in the **Tree Playgrounds** at the end of this chapter.',
          bn: '- **বেসিক:** রুট, প্যারেন্ট, চাইল্ড, লিফ, উচ্চতা; ফুল / কমপ্লিট / পারফেক্ট / স্কিউড ট্রি; ট্রির আকার গোনা।\n- **ট্রাভার্সাল:** প্রি-অর্ডার, ইন-অর্ডার, পোস্ট-অর্ডার, লেভেল অর্ডার — রিকার্শন, স্ট্যাক বা queue দিয়ে।\n- **BST:** বামে-ডানে গিয়ে সার্চ, ইনসার্ট আর ডিলিট (৩টা কেসই)।\n- **ব্যালান্সিং:** AVL ব্যালান্স ফ্যাক্টর আর ৪টা রোটেশন; রেড-ব্ল্যাকের রঙের নিয়ম।\n- **মাল্টিওয়ে ট্রি:** ২-৩ ভাগ, ডিস্ক আর ডেটাবেসের জন্য B-ট্রি ও B+ ট্রি।\n\nএবার এই অধ্যায়ের শেষে **ট্রি প্লেগ্রাউন্ডে** নিজের মান দিয়ে চেষ্টা করো।'
        },
        line: 12,
        iteration: { i: 4, of: 4, label: { en: 'Mastery', bn: 'মাস্টারি' } },
        state: { topicsCovered: 'All 3 Reference Guides', implementationReady: true, status: 'Completed' },
        scene: {
          kind: 'none',
          title: { en: 'Trees curriculum complete', bn: 'ট্রি কারিকুলাম শেষ' },
          desc: { en: 'Foundations → traversals → BST → AVL & Red-Black → 2-3, B and B+ trees.', bn: 'ভিত্তি → ট্রাভার্সাল → BST → AVL ও রেড-ব্ল্যাক → ২-৩, B ও B+ ট্রি।' }
        }
      }
    ]
  }
];
