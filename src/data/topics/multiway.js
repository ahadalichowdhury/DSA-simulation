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
      en: '2-nodes, 3-nodes, equal leaf depth invariant, and temporary 4-node median promotion',
      bn: '২-নোড, ৩-নোড, সমান লিফ ডেপথ এবং অস্থায়ী ৪-নোড মিডিয়ান প্রমোশন'
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
        title: { en: 'Multiway Trees: Breaking the 2-Child Barrier', bn: 'মাল্টিওয়ে ট্রি: ২-সন্তানের সীমাবদ্ধতা অতিক্রম' },
        explanation: {
          en: 'In standard binary trees, every node holds only **1 key** and can have at most **2 children**.\n\nA **Multiway Search Tree** breaks this limitation: a single node can store **multiple sorted keys** and have **multiple children**!\n\nIn a **2-3 Tree**:\n- **2-Node**: Holds **1 key**, has **2 children**.\n- **3-Node**: Holds **2 keys**, has **3 children**.\n- **Universal Rule**: All leaf nodes appear at the **exact same depth**!',
          bn: 'সাধারণ বাইনারি ট্রিতে প্রতিটি নোডে কেবল **১টি কি** থাকে এবং সর্বোচ্চ **২টি সন্তান** থাকতে পারে।\n\nএকটি **মাল্টিওয়ে সার্চ ট্রি (Multiway Search Tree)** এই সীমাবদ্ধতা ভেঙে দেয়: এখানে একটি একক নোডের ভেতর **একাধিক সর্টেড কি** এবং **একাধিক সন্তান** থাকতে পারে!\n\nএকটি **২-৩ ট্রিতে (2-3 Tree)**:\n- **২-নোড**: এতে থাকে **১টি কি**, সন্তান থাকে **২টি**।\n- **৩-নোড**: এতে থাকে **২টি কি**, সন্তান থাকে **৩টি**।\n- **অলঙ্ঘনীয় নিয়ম**: সমস্ত লিফ নোড সর্বদা **একদম একই গভীরতায়** অবস্থান করে!',
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
        title: { en: 'Insertion into a 2-Node (Simple Case)', bn: '২-নোডে ইনসার্ট (সহজ ক্ষেত্র)' },
        explanation: {
          en: 'Let\'s insert key **`15`** into the tree:\n1. Search down to leaf `[10]` (which is a 2-node with 1 key).\n2. Because a 2-node has room to hold up to 2 keys, we **insert 15 directly into the leaf** in sorted order!\n3. Leaf `[10]` smoothly expands into a 3-node **`[10, 15]`**.\n\nNo rotations, no tree height change! The operation takes $O(\\log N)$ time.',
          bn: 'ধরি আমরা ট্রিতে **`15`** ইনসার্ট করতে চাই:\n১. নিচে নেমে লিফ নোড `[10]`-এ পৌঁছাও (যা ১টি কি বিশিষ্ট ২-নোড)।\n২. যেহেতু একটি ২-নোড ২টি কি পর্যন্ত ধারণ করতে পারে, তাই সরাসরি সর্টেড ক্রমে **১৫-কে ওই নোডেই ঢুকিয়ে দেওয়া হয়**!\n৩. লিফ `[10]` স্বাভাবিকভাবে প্রসারিত হয়ে ৩-নোড **`[10, 15]`**-এ পরিণত হয়।\n\nকোনো রোটেশন নেই, কোনো উচ্চতা পরিবর্তন নেই! মাত্র $O(\\log N)$ সময়ে কাজ সম্পন্ন।',
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
        title: { en: 'Insertion into a 3-Node: Overflow & Splitting', bn: '৩-নোডে ইনসার্ট: ওভারফ্লো ও স্প্লিটিং' },
        explanation: {
          en: 'Now what happens if we insert **`35`** into leaf `[30, 40]` (already full)?\n\n1. **Temporary 4-Node**: Inserting 35 creates `[30, 35, 40]` (3 keys = overflow!).\n2. **The Split Operation**:\n   - The **Median key (`35`)** is **promoted UP** into the parent node!\n   - Left key (`30`) becomes its own separate 2-node `[30]`.\n   - Right key (`40`) becomes its own separate 2-node `[40]`.',
          bn: 'এখন যদি আমরা পূর্ণ লিফ `[30, 40]`-এর ভেতর নতুন সংখ্যা **`35`** ইনসার্ট করি?\n\n১. **অস্থায়ী ৪-নোড**: ৩৫ ঢোকার ফলে তৈরি হয় `[30, 35, 40]` (৩টি কি = ওভারফ্লো!)।\n২. **স্প্লিট অপারেশন (Split)**:\n   - **মাঝখানের মিডিয়ান কি (`35`)** ধাক্কা খেয়ে **উপরে প্যারেন্টে প্রমোট** হয়ে যায়!\n   - বামের কি (`30`) আলাদা হয়ে নতুন ২-নোড `[30]` হয়।\n   - ডানের কি (`40`) আলাদা হয়ে নতুন ২-নোড `[40]` হয়।',
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
        title: { en: 'Cascading Splits & Root Growth', bn: 'ক্যাসকেডিং স্প্লিট ও ট্রির ঊর্ধ্বমুখী বৃদ্ধি' },
        explanation: {
          en: 'What if the parent node was already full when receiving a promoted key?\n\nThe split **cascades upward**! The parent also splits and promotes its median to its parent.\n\n### How 2-3 Trees Grow:\nIf the **Root node splits**, a brand new root node is created containing only the promoted median key!\n\n> **Fundamental Property**: Unlike binary trees which grow downward, a 2-3 tree **grows uniformly UPWARD from the root**! This is why all leaves are guaranteed to stay at the exact same level forever.',
          bn: 'প্যারেন্ট নোডটিও যদি আগে থেকেই পূর্ণ থাকে এবং নতুন প্রমোটেড কি গ্রহণ করে?\n\nস্প্লিট প্রক্রিয়াটি **উপরের দিকে ক্যাসকেড** করে! প্যারেন্টও একইভাবে বিভক্ত হয়ে তার মিডিয়ানকে আরও উপরে পাঠায়।\n\n### ২-৩ ট্রি কীভাবে বৃদ্ধি পায়:\nযদি **রুট নোড স্প্লিট হয়**, তবে প্রমোটেড মিডিয়ান কি নিয়ে সবার উপরে একটি সম্পূর্ণ নতুন রুট তৈরি হয়!\n\n> **অনন্য বৈশিষ্ট্য**: সাধারণ ট্রির মতো নিচের দিকে না বেড়ে, ২-৩ ট্রি **নিচ থেকে উপরের দিকে বৃদ্ধি পায়**! এই কারণেই সমস্ত লিফ সর্বদা অবিকল একই লেভেলে অবস্থান করে।',
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
      en: 'B-Tree invariants, order m properties, and why multiway branching optimizes disk block storage',
      bn: 'B-ট্রির ৫টি শর্ত, অর্ডার m বৈশিষ্ট্য এবং কীভাবে এটি ডিস্ক ব্লক স্টোরেজ অপ্টিমাইজ করে'
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
        title: { en: 'Why B-Trees? The Disk I/O Bottleneck', bn: 'B-ট্রি কেন? ডিস্ক I/O-এর গতি সমস্যা' },
        explanation: {
          en: 'Reading data from **RAM takes ~10 nanoseconds**, while fetching a block from a **hard disk or SSD takes ~1 to 10 milliseconds** ($1,000,000\\times$ slower!).\n\nIf we stored 1 billion database records in an AVL tree:\n- Height $= \\log_2(10^9) \\approx 30$.\n- Searching requires **30 disk accesses** $\\implies 30 \\times 10\\text{ms} = \\mathbf{300\\text{ milliseconds}}$ per query. Catastrophically slow!\n\nComputers read disks in **pages/blocks (typically 4KB or 8KB)**. A B-Tree designs each node to fit **exactly inside one disk block**, holding hundreds of keys!',
          bn: '**RAM থেকে ডেটা পড়তে লাগে ~১০ ন্যানোসেকেন্ড**, আর **হার্ডডিস্ক বা SSD থেকে একটি ব্লক আনতে লাগে ~১ থেকে ১০ মিলিসেকেন্ড** (১০ লাখ গুণ ধীরগতির!).\n\nযদি আমরা ১০০ কোটি ডেটাবেস রেকর্ড একটি সাধারণ AVL ট্রিতে রাখতাম:\n- উচ্চতা $= \\log_2(10^9) \\approx 30$।\n- একটি রেকর্ড খুঁজতে **৩০টি ডিস্ক রিড** লাগত $\\implies 30 \\times 10\\text{ms} = \\mathbf{৩০০\\text{ মিলিসেকেন্ড}}$। অত্যন্ত ধীরগতির!\n\nকম্পিউটার ডিস্ক থেকে একবারে একটি **পেজ বা ব্লক (৪KB বা ৮KB)** পড়ে। B-ট্রি এমনভাবে ডিজাইন করা হয়েছে যাতে প্রতিটি নোড **হুবহু একটি ডিস্ক ব্লকে** এঁটে যায় এবং শত শত কি ধারণ করতে পারে!',
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
        title: { en: 'The 5 Invariants of a B-Tree of Order m', bn: 'অর্ডার m-এর B-ট্রির ৫টি কঠোর নিয়ম' },
        explanation: {
          en: 'A **B-Tree of Order m** is a balanced multiway search tree satisfying 5 conditions:\n1. Every node has at most **$m$ children** and at most **$m - 1$ keys**.\n2. Every internal node (except root) has at least **$\\lceil m / 2 \\rceil$ children** and **$\\lceil m / 2 \\rceil - 1$ keys**.\n3. The **root has at least 2 children** (unless the tree has only 1 node).\n4. **All leaves appear at the exact same level**.\n5. A non-leaf node with $k$ children contains exactly $k - 1$ keys in sorted order, partitioning the child subtrees.',
          bn: '**অর্ডার m-এর B-ট্রি** হলো একটি ব্যালান্সড মাল্টিওয়ে ট্রি যা ৫টি শর্ত পূরণ করে:\n১. প্রতিটি নোডে সর্বোচ্চ **$m$ টি সন্তান** এবং **$m - 1$ টি কি** থাকে।\n২. রুট বাদে সমস্ত ইন্টারনাল নোডে কমপক্ষে **$\\lceil m / 2 \\rceil$ টি সন্তান** এবং **$\\lceil m / 2 \\rceil - 1$ টি কি** থাকতে হবে।\n৩. **রুটে কমপক্ষে ২টি সন্তান** থাকে (যদি না ট্রিতে মোট ১টি নোড থাকে)।\n৪. **সমস্ত লিফ নোড ঠিক একই লেভেলে** অবস্থান করে।\n৫. $k$ সন্তান বিশিষ্ট নোডে $k - 1$ টি সর্টেড কি থাকে যা সন্তানদের মানকে সুনির্দিষ্টভাবে ভাগ করে।',
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
          note: 'Notice node b3 holds 3 keys (max allowed for m = 4). Every node satisfies order invariants.'
        }
      },
      {
        title: { en: 'B-Tree Search Algorithm: Traversing Child Blocks', bn: 'B-ট্রি সার্চ: সাব-ট্রি ব্লক অনুসন্ধান' },
        explanation: {
          en: 'Searching in a B-Tree is lightning fast:\n1. Search for `key = 45`.\n2. Fetch root block `[30, 60]` from disk (1 disk seek).\n3. Inside the block (in fast RAM), binary search among keys: $30 < 45 < 60$.\n4. Follow the middle child pointer to block `[40, 50]` (2nd disk seek).\n5. Binary search inside block: 45 is not present $\\implies$ **Search terminates in only 2 disk seeks**!',
          bn: 'B-ট্রিতে সার্চ প্রক্রিয়া অবিশ্বাস্য দ্রুত:\n১. আমরা `key = 45` খুঁজতে চাই।\n২. ডিস্ক থেকে রুট ব্লক `[30, 60]` আনা হলো (১টি ডিস্ক সিক)।\n৩. দ্রুতগতির RAM-এ ব্লকের ভেতরের কি-গুলোর মধ্যে বাইনারি সার্চ করো: $30 < 45 < 60$।\n৪. মাঝখানের চাইল্ড পয়েন্টার ধরে ব্লক `[40, 50]`-এ নামো (২য় ডিস্ক সিক)।\n৫. ব্লকের ভেতরে ৪৫ নেই $\\implies$ **মাত্র ২টি ডিস্ক সিকেই সার্চ শেষ**!',
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
        title: { en: 'Logarithmic Drop: 1 Billion Keys in 3 Disk Seeks', bn: 'লগারিদমের শক্তি: ১০০ কোটি ডেটা মাত্র ৩টি সিকে' },
        explanation: {
          en: 'Let\'s calculate the tree height for $N = 1,000,000,000$ (1 billion) records with block order $m = 1000$:\n$$\\text{Height} \\approx \\log_{m/2} N = \\log_{500}(10^9) = \\frac{\\log_{10}(10^9)}{\\log_{10}(500)} = \\frac{9}{2.699} \\approx \\mathbf{3.33}$$\n\n### The Miracle:\nA tree of **1 billion records** has a height of only **3 or 4**! Even the worst-case search requires only 3 or 4 disk seeks ($\approx 0.03\\text{ seconds}$). This is why every modern file system (NTFS, ext4, APFS) and database is powered by B-Trees.',
          bn: 'ব্লক অর্ডার $m = 1000$ হলে $N = ১,০০,০০,০০,০০০$ (১০০ কোটি) রেকর্ডের জন্য ট্রির উচ্চতা হিসাব করি:\n$$\\text{উচ্চতা} \\approx \\log_{m/2} N = \\log_{500}(10^9) = \\frac{9}{2.699} \\approx \\mathbf{৩.৩৩}$$\n\n### অভূতপূর্ব সাফল্য:\n**১০০ কোটি ডেটা** থাকা সত্ত্বেও ট্রির উচ্চতা মাত্র **৩ বা ৪**! যেকোনো ডেটা খুঁজতে সর্বোচ্চ মাত্র ৩-৪টি ডিস্ক অ্যাক্সেস লাগে ($\approx ০.০৩$ সেকেন্ড)। এই কারণেই পৃথিবীর সমস্ত ফাইল সিস্টেম (NTFS, ext4, APFS) এবং ডেটাবেস ইঞ্জিন B-ট্রি দিয়ে তৈরি।',
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
      en: 'Routing keys vs data records, linked leaves sequence, and O(1) sequential range query scans',
      bn: 'রাউটিং কি বনাম ডেটা রেকর্ড, লিঙ্কড লিফ সিকোয়েন্স এবং O(1) রেঞ্জ কোয়েরি স্ক্যান'
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
        title: { en: 'B+ Tree Architecture: Internal Index vs Leaf Data', bn: 'B+ ট্রি আর্কিটেকচার: ইন্টারনাল ইনডেক্স বনাম লিফ ডেটা' },
        explanation: {
          en: 'A **B+ Tree** is an optimized variation of the B-Tree created specifically for database query engines:\n\n1. **Internal Nodes**: Contain **only routing keys (indices) and child pointers** — NO record data! Because indices take very little memory, an internal node can hold thousands of child pointers.\n2. **Leaf Nodes**: Contain **all actual data records** (or record pointers) and duplicates of index keys.\n3. **Sequential Leaf Chaining**: All leaf nodes are linked together in a continuous **Linked List** (`leaf.next`)!',
          bn: '**B+ ট্রি (B+ Tree)** হলো ডেটাবেস কোয়েরি ইঞ্জিনের জন্য বিশেষভাবে তৈরি B-ট্রির একটি উন্নত সংস্করণ:\n\n১. **ইন্টারনাল নোড**: এতে থাকে **কেবলমাত্র রাউটিং ইনডেক্স এবং চাইল্ড পয়েন্টার** — কোনো আসল রেকর্ড ডেটা থাকে না! ইনডেক্স খুব কম মেমোরি নেয় বলে প্রতিটি নোড হাজার হাজার সন্তান ধারণ করতে পারে।\n২. **লিফ নোড**: সমস্ত **আসল ডেটা রেকর্ড** এবং সূচক কি-গুলোর একটি ডুপ্লিকেট কপি ধারণ করে।\n৩. **লিঙ্কড লিফ চেইন**: সমস্ত লিফ নোড নিজেদের মধ্যে একটি অবিচ্ছিন্ন **লিঙ্কড লিস্টের** মাধ্যমে যুক্ত থাকে (`leaf.next`)!',
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
        title: { en: 'B-Tree vs B+ Tree Comparison', bn: 'B-ট্রি বনাম B+ ট্রির তুলনামূলক পার্থক্য' },
        explanation: {
          en: 'Why did database architects replace B-Trees with B+ Trees?\n\n| Feature | Standard B-Tree | B+ Tree (MySQL InnoDB / Postgres) |\n|---|---|---|\n| **Data Storage** | Records stored in *every* node (internal + leaf) | Records stored **strictly in leaf nodes** |\n| **Branching Factor** | Lower (large record payloads take space) | **Massive** (internal nodes only store small keys) |\n| **Range Queries** | In-Order tree traversal (slow disk jumping) | **Sequential leaf scan** via linked list ($O(1)$ block jumps) |\n| **Search Stability** | Can terminate early at root or deep at leaf | **Consistent $O(\\log N)$** (every search reaches leaf) |',
          bn: 'ডেটাবেস ইঞ্জিনিয়াররা B-ট্রির জায়গায় B+ ট্রি কেন বেছে নিলেন?\n\n| বৈশিষ্ট্য | সাধারণ B-ট্রি | B+ ট্রি (MySQL InnoDB / Postgres) |\n|---|---|---|\n| **ডেটা সংরক্ষণ** | সব নোডেই রেকর্ড সংরক্ষিত থাকে | রেকর্ড থাকে **কেবলমাত্র লিফ নোডগুলোতে** |\n| **ব্রাঞ্চিং ফ্যাক্টর** | কম (রেকর্ড বেশি জায়গা দখল করে) | **অত্যন্ত বিশাল** (ইন্টারনাল নোডে শুধু ছোট কি থাকে) |\n| **রেঞ্জ কোয়েরি** | ট্রির ভেতর ইন-অর্ডার লাফিয়ে চলা (ধীর) | লিঙ্কড লিস্ট ধরে **সোজা স্ক্যান** ($O(1)$ ব্লক জাম্প) |\n| **সার্চ ধারাবাহিকতা** | রুট বা লিফে থামতে পারে | **একটানা ধারাবাহিক $O(\\log N)$** (সব সার্চ লিফে পৌঁছায়) |',
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
        title: { en: 'Executing Range Query: SELECT WHERE key BETWEEN 25 AND 60', bn: 'রেঞ্জ কোয়েরি সম্পাদন: ২৫ থেকে ৬০ পর্যন্ত রেকর্ড' },
        explanation: {
          en: 'Let\'s execute SQL query: `SELECT * FROM users WHERE id BETWEEN 25 AND 60`:\n\n1. **Step 1 (Binary Search to minKey)**: Traverse from root `[25, 50]` to find the starting leaf `[25, 30, 40]`. Takes $O(\\log N)$ time.\n2. **Step 2 (Sequential Scan via `leaf.next`)**: Once in leaf `[25, 30, 40]`, collect `25, 30, 40`. Then simply follow **`leaf.next` pointer** to sibling leaf `[50, 60, 70]` and collect `50, 60`!\n\n**Zero tree backtracking**! The internal nodes are never visited again.',
          bn: 'ধরি আমরা SQL কোয়েরি চালালাম: `SELECT * FROM users WHERE id BETWEEN 25 AND 60`:\n\n১. **ধাপ ১ (শুরুর নোড খোঁজা)**: রুট `[25, 50]` থেকে নিচে নেমে প্রারম্ভিক লিফ `[25, 30, 40]` খুঁজে নাও। সময় $O(\\log N)$।\n২. **ধাপ ২ (লিঙ্কড লিস্ট ধরে সোজা স্ক্যান)**: ওই লিফে `25, 30, 40` সংগ্রহ করো। তারপর আর উপরে না উঠে সরাসরি **`leaf.next` পয়েন্টার** ধরে পাশের লিফে যাও এবং `50, 60` তুলে নাও!\n\n**কোনো ব্যাকট্র্যাকিং নেই!** ইন্টারনাল নোডগুলোতে পুনরায় আর ফিরে যাওয়ার কোনো প্রয়োজনই পড়ে না।',
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
        title: { en: 'Complete Query Result in O(K) Time', bn: 'O(K) সময়ে সম্পূর্ণ কোয়েরির ফলাফল' },
        explanation: {
          en: 'Result set extracted: `[25, 30, 40, 50, 60]` (5 records).\n\nTotal Complexity:\n$$\\text{Time} = O(\\log_m N + K)$$\nwhere $K$ is the number of records in the range query.\n\nBecause adjacent leaf nodes reside consecutively on disk sectors, modern operating systems pre-fetch them with high-throughput sequential disk reads!',
          bn: 'ফলাফল পাওয়া গেল: `[25, 30, 40, 50, 60]` (৫টি রেকর্ড)।\n\nমোট জটিলতা:\n$$\\text{সময়} = O(\\log_m N + K)$$\nযেখানে $K$ হলো রেঞ্জের ভেতরের মোট রেকর্ডের সংখ্যা।\n\nযেহেতু পাশাপাশি লিফ নোডগুলো ডিস্কে পরপর ব্লকে থাকে, তাই অপারেটিং সিস্টেম হাই-থ্রুপুট সিকোয়েনশিয়াল রিডের মাধ্যমে চোখের পলকে ডেটা লোড করে!',
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
      en: 'Standard BST, AVL, 2-3 Tree, B-Tree, B+ Tree, and Red-Black tree head-to-head comparison',
      bn: 'সাধারণ BST, AVL, ২-৩ ট্রি, B-ট্রি, B+ ট্রি এবং রেড-ব্ল্যাক ট্রির মুখোমুখি বিশ্লেষণ'
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
        title: { en: 'The Master Search Tree Comparison Table', bn: 'মাস্টার সার্চ ট্রি তুলনামূলক ছক' },
        explanation: {
          en: 'Here is the comprehensive head-to-head comparison of all search trees:\n\n| Data Structure | Search Time | Insert Time | Delete Time | Max Height Bound | Primary Application |\n|---|---|---|---|---|---|\n| **Standard BST** | $O(N)$ worst | $O(N)$ worst | $O(N)$ worst | $N - 1$ (skewed) | Simple lookup tables |\n| **AVL Tree** | **$O(\\log N)$** | **$O(\\log N)$** | **$O(\\log N)$** | **$1.44 \\log_2 N$** | Read-heavy in-memory data |\n| **2-3 Tree** | $O(\\log N)$ | $O(\\log N)$ | $O(\\log N)$ | $\\log_3 N$ to $\\log_2 N$ | Conceptual model for B-Trees |\n| **B-Tree ($m$)** | $O(\\log_m N)$ | $O(\\log_m N)$ | $O(\\log_m N)$ | $\\log_{\\lceil m/2 \\rceil} N$ | File systems, block storage |\n| **B+ Tree** | $O(\\log_m N)$ | $O(\\log_m N)$ | $O(\\log_m N)$ | $\\log_{\\lceil m/2 \\rceil} N$ | **Relational DB range indexing** |\n| **Red-Black Tree** | $O(\\log N)$ | $O(\\log N)$ | $O(\\log N)$ | $2 \\log_2(N + 1)$ | **`std::map`, Java `TreeMap`** |',
          bn: 'সমস্ত সার্চ ট্রির মুখোমুখি তুলনামূলক ছক:\n\n| ডেটা স্ট্রাকচার | সার্চ সময় | ইনসার্ট সময় | ডিলিট সময় | সর্বোচ্চ উচ্চতার সীমা | প্রধান বাস্তব প্রয়োগ |\n|---|---|---|---|---|---|\n| **সাধারণ BST** | $O(N)$ খারাপ | $O(N)$ খারাপ | $O(N)$ খারাপ | $N - 1$ (স্কিউড) | সাধারণ ছোট টেবিল |\n| **AVL ট্রি** | **$O(\\log N)$** | **$O(\\log N)$** | **$O(\\log N)$** | **১.৪৪ $\\log_2 N$** | রিড-প্রধান মেমোরি ডেটা |\n| **২-৩ ট্রি** | $O(\\log N)$ | $O(\\log N)$ | $O(\\log N)$ | $\\log_3 N$ হতে $\\log_2 N$ | B-ট্রির মৌলিক মডেল |\n| **B-ট্রি ($m$)** | $O(\\log_m N)$ | $O(\\log_m N)$ | $O(\\log_m N)$ | $\\log_{\\lceil m/2 \\rceil} N$ | ফাইল সিস্টেম ও ডিস্ক ব্লকিং |\n| **B+ ট্রি** | $O(\\log_m N)$ | $O(\\log_m N)$ | $O(\\log_m N)$ | $\\log_{\\lceil m/2 \\rceil} N$ | **ডেটাবেস রেঞ্জ ইনডেক্সিং** |\n| **রেড-ব্ল্যাক ট্রি** | $O(\\log N)$ | $O(\\log N)$ | $O(\\log N)$ | ২ $\\log_2(N + 1)$ | **`std::map`, Java `TreeMap`** |',
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
        title: { en: 'AVL vs Red-Black: The In-Memory Battle', bn: 'AVL বনাম রেড-ব্ল্যাক: মেমোরির লড়াই' },
        explanation: {
          en: 'Both trees guarantee $O(\\log N)$ worst-case time, but they make different engineering trade-offs:\n\n- **AVL Tree**: More **rigidly balanced** ($h \\le 1.44 \\log_2 N$). Search requires fewer comparisons. However, insertions and deletions do more rotation work.\n  - *Pick AVL when*: Your application does **many reads and few writes** (e.g. dictionary lookups, game asset caches).\n\n- **Red-Black Tree**: Slightly looser balance ($h \\le 2 \\log_2(N+1)$). But insertions require at most 2 rotations, and deletions at most 3 rotations!\n  - *Pick Red-Black when*: Your application has **frequent insertions and deletions** (e.g. dynamic symbol tables, process schedulers).',
          bn: 'উভয় ট্রিই $O(\\log N)$ সময়ের নিশ্চয়তা দেয়, কিন্তু তাদের মধ্যে সূক্ষ্ম পার্থক্য রয়েছে:\n\n- **AVL ট্রি**: অনেক বেশি **কঠোরভাবে ব্যালান্সড** ($h \\le 1.44 \\log_2 N$)। অনুসন্ধানে কম তুলনা লাগে। কিন্তু ইনসার্ট ও ডিলিটে রোটেশন বেশি করতে হয়।\n  - *AVL বেছে নাও যখন*: তোমার প্রোগ্রামে **পড়ার কাজ (Read) বেশি এবং লেখার কাজ কম** (যেমন অভিধান সার্চ, গেমিং ক্যাশ)।\n\n- **রেড-ব্ল্যাক ট্রি**: সামান্য ঢিলেঢালা ব্যালান্স ($h \\le 2 \\log_2(N+1)$)। কিন্তু ইনসার্টে সর্বোচ্চ ২টি এবং ডিলিটে সর্বোচ্চ ৩টি রোটেশন লাগে!\n  - *রেড-ব্ল্যাক বেছে নাও যখন*: প্রোগ্রামে **ঘনঘন নতুন ডেটা আসে এবং মোছা হয়** (যেমন প্রসেস শিডিউলার, `std::map`)।',
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
        title: { en: 'B-Tree vs B+ Tree: The Storage Engine Standard', bn: 'B-ট্রি বনাম B+ ট্রি: ডেটাবেস ইঞ্জিনের পছন্দ' },
        explanation: {
          en: 'Why do all major database systems (**MySQL InnoDB, PostgreSQL, SQLite, Oracle**) implement **B+ Trees** rather than standard B-Trees?\n\n1. **Range Queries**: Relational databases exist to run queries like `WHERE age > 21`. In a B+ Tree, this scans along the **horizontal leaf linked list** without revisiting upper tree nodes.\n2. **Cache Density**: Because B+ tree internal nodes don\'t store records, the top levels of the index can be kept **permanently in RAM buffer pool**, meaning only 1 physical disk read is needed for the leaf!',
          bn: 'পৃথিবীর প্রায় সমস্ত বিখ্যাত ডেটাবেস (**MySQL InnoDB, PostgreSQL, SQLite, Oracle**) কেন সাধারণ B-ট্রির বদলে **B+ ট্রি** ব্যবহার করে?\n\n১. **রেঞ্জ কোয়েরি**: ডেটাবেসের বেশিরভাগ কোয়েরি রেঞ্জ সংক্রান্ত (`WHERE age > 21`)। B+ ট্রিতে এটি লিফের **অনুভূমিক লিঙ্কড লিস্ট** ধরে স্ক্যান করে, ট্রির ওপরে উঠতে হয় না।\n২. **ক্যাশ ঘনত্ব**: B+ ট্রির ইন্টারনাল নোডগুলো কোনো ভারী রেকর্ড না রাখায়, ট্রির ওপরের লেভেলগুলো **RAM-এর বাফার পুলে স্থায়ীভাবে** রেখে দেওয়া যায়! ফলে ডিস্ক থেকে শুধু নিচের লিফটি পড়তে হয়।',
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
        title: { en: 'Summary: You Mastered Advanced Tree Architecture', bn: 'সারসংক্ষেপ: উন্নত ট্রি আর্কিটেকচার আয়ত্ত' },
        explanation: {
          en: '### You have completed the complete Trees curriculum!\nYou now understand:\n- **Foundations**: Terminology, Strict/Complete/Perfect/Skewed binary trees, Catalan numbers, height proofs ($N_0 = N_2 + 1$).\n- **Traversals & Construction**: Pre/In/Post DFS, 3-point boundary flag trick, $2N+1$ calls, Queue creation.\n- **BST Operations**: Trailing-pointer insertion, all 3 deletion cases, post-order metrics.\n- **Self-Balancing Trees**: AVL balance factors, LL/RR/LR/RL animated rotations, $1.44 \\log N$ height proof, Red-Black 5 invariants.\n- **Multiway & Database Structures**: 2-3 tree median splitting, order-$m$ B-Trees, B+ tree leaf linked range queries.\n\nYou are fully equipped to implement, analyze, and optimize any tree data structure in C++, Java, Python, or JavaScript!',
          bn: '### অভিনন্দন! তুমি সম্পূর্ণ ট্রি কারিকুলাম সম্পন্ন করেছো!\nতুমি এখন গভীর ও সুস্পষ্টভাবে জানো:\n- **ফাউন্ডেশন**: পরিভাষা, স্ট্রিক্ট/কমপ্লিট/পারফেক্ট/স্কিউড ট্রি, কাতালান সংখ্যা, উচ্চতা প্রমাণ ($N_0 = N_2 + 1$)।\n- **ট্রাভার্সাল ও গঠন**: Pre/In/Post DFS, ৩-পয়েন্ট ফ্ল্যাগ ট্রিক, $2N+1$ ফাংশন কল, কিউ দিয়ে ডাইনামিক গঠন।\n- **BST অপারেশন**: ট্রেইলিং পয়েন্টার ইনসার্ট, ৩টি ডিলিট কেস, পোস্ট-অর্ডার মেট্রিক্স।\n- **সেলফ-ব্যালান্সিং**: AVL ব্যালান্স ফ্যাক্টর, LL/RR/LR/RL অ্যানিমেটেড রোটেশন, ১.৪৪ $\\log N$ প্রমাণ, রেড-ব্ল্যাকের ৫ শর্ত।\n- **মাল্টিওয়ে ও ডেটাবেস**: ২-৩ ট্রি মিডিয়ান স্প্লিট, অর্ডার-$m$ B-ট্রি, B+ ট্রির লিঙ্কড লিফ রেঞ্জ কোয়েরি।\n\nএখন যেকোনো কোডিং ইন্টারভিউ বা বাস্তব প্রজেক্টে C++, Java, Python, কিংবা JavaScript-এ যেকোনো ট্রি ডেটা স্ট্রাকচার বাস্তবায়ন করতে তুমি শতভাগ প্রস্তুত!',
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
