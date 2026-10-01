/**
 * Tree Foundations & Mathematical Analysis
 * Covers: General Tree Terminology, Binary Tree Classifications,
 * Catalan Numbers & Counting Math, Array vs Linked Memory Representations.
 * Grounded in: data-structures-binary-trees-guide.pdf
 */

export const foundationTopics = [
  {
    id: 'tree-fundamentals',
    name: { en: 'Tree Terminology & Hierarchy', bn: 'ট্রি টার্মিনোলজি ও হায়ারার্কি' },
    description: {
      en: 'Root, parent, child, degrees, levels, height and forest terminology',
      bn: 'রুট, প্যারেন্ট, চাইল্ড, ডিগ্রি, লেভেল, হাইট ও ফরেস্টের পরিচিতি'
    },
    categoryKey: 'trees',
    subgroupKey: 'foundations',
    level: 'intermediate',
    order: 10,
    icon: '🌱',
    complexity: {
      time: 'O(1) to O(n)',
      space: 'O(1)',
      note: {
        en: 'A tree with N nodes always contains exactly N - 1 directed edges. Any node access via direct pointer is O(1); tree traversal touches all N nodes.',
        bn: 'N সংখ্যক নোডের একটি ট্রিতে ঠিক N - 1 টি এজ থাকে। ডিরেক্ট পয়েন্টার দিয়ে নোড অ্যাক্সেস O(1); পুরো ট্রিতে ঘোরা O(N)।'
      }
    },
    code: {
      pseudo: {
        en: [
          '// Tree Node Structure and Metrics',
          'class TreeNode:',
          '  val = 0',
          '  children = []',
          '  constructor(val): this.val = val',
          '',
          'function getDegree(node):',
          '  return node.children.length',
          '',
          'function isLeaf(node):',
          '  return node.children.length == 0',
          '',
          '// N nodes always have exactly N - 1 edges',
          'edgeCount = nodeCount - 1'
        ],
        bn: [
          '// ট্রি নোড স্ট্রাকচার ও মেট্রিক্স',
          'class TreeNode:',
          '  val = 0',
          '  children = []',
          '  constructor(val): this.val = val',
          '',
          'function getDegree(node):',
          '  return node.children.length',
          '',
          'function isLeaf(node):',
          '  return node.children.length == 0',
          '',
          '// N টি নোডে ঠিক N - 1 টি এজ থাকে',
          'edgeCount = nodeCount - 1'
        ]
      },
      js: {
        en: [
          '// JavaScript Tree Node Definition',
          'class TreeNode {',
          '  val = 0;',
          '  children = [];',
          '  constructor(val) { this.val = val; }',
          '',
          '  getDegree() {',
          '    return this.children.length; }',
          '',
          '  isLeaf() {',
          '    return this.children.length === 0; }',
          '',
          '  // N nodes have N - 1 edges',
          '}'
        ],
        bn: [
          '// জাভাস্ক্রিপ্ট ট্রি নোড ডেফিনিশন',
          'class TreeNode {',
          '  val = 0;',
          '  children = [];',
          '  constructor(val) { this.val = val; }',
          '',
          '  getDegree() {',
          '    return this.children.length; }',
          '',
          '  isLeaf() {',
          '    return this.children.length === 0; }',
          '',
          '  // N নোডে N - 1 এজ',
          '}'
        ]
      },
      java: {
        en: [
          '// Java Tree Node Definition',
          'class TreeNode {',
          '  int val = 0;',
          '  List<TreeNode> children = new ArrayList<>();',
          '  TreeNode(int val) { this.val = val; }',
          '',
          '  int getDegree() {',
          '    return children.size(); }',
          '',
          '  boolean isLeaf() {',
          '    return children.isEmpty(); }',
          '',
          '  // N nodes have N - 1 edges',
          '}'
        ],
        bn: [
          '// জাভা ট্রি নোড ডেফিনিশন',
          'class TreeNode {',
          '  int val = 0;',
          '  List<TreeNode> children = new ArrayList<>();',
          '  TreeNode(int val) { this.val = val; }',
          '',
          '  int getDegree() {',
          '    return children.size(); }',
          '',
          '  boolean isLeaf() {',
          '    return children.isEmpty(); }',
          '',
          '  // N নোডে N - 1 এজ',
          '}'
        ]
      },
      python: {
        en: [
          '# Python Tree Node Definition',
          'class TreeNode:',
          '  val = 0',
          '  children = []',
          '  def __init__(self, val): self.val = val; self.children = []',
          '',
          '  def get_degree(self):',
          '    return len(self.children)',
          '',
          '  def is_leaf(self):',
          '    return len(self.children) == 0',
          '',
          '  # N nodes have N - 1 edges',
          '  # edge_count = node_count - 1'
        ],
        bn: [
          '# পাইথন ট্রি নোড ডেফিনিশন',
          'class TreeNode:',
          '  val = 0',
          '  children = []',
          '  def __init__(self, val): self.val = val; self.children = []',
          '',
          '  def get_degree(self):',
          '    return len(self.children)',
          '',
          '  def is_leaf(self):',
          '    return len(self.children) == 0',
          '',
          '  # N নোডে N - 1 এজ',
          '  # edge_count = node_count - 1'
        ]
      },
      cpp: {
        en: [
          '// C++ Tree Node Definition',
          'struct TreeNode {',
          '  int val = 0;',
          '  vector<TreeNode*> children;',
          '  TreeNode(int v) : val(v) {}',
          '',
          '  int getDegree() const {',
          '    return children.size(); }',
          '',
          '  bool isLeaf() const {',
          '    return children.empty(); }',
          '',
          '  // N nodes have N - 1 edges',
          '};'
        ],
        bn: [
          '// সি++ ট্রি নোড ডেফিনিশন',
          'struct TreeNode {',
          '  int val = 0;',
          '  vector<TreeNode*> children;',
          '  TreeNode(int v) : val(v) {}',
          '',
          '  int getDegree() const {',
          '    return children.size(); }',
          '',
          '  bool isLeaf() const {',
          '    return children.empty(); }',
          '',
          '  // N নোডে N - 1 এজ',
          '};'
        ]
      }
    },
    steps: [
      {
        title: { en: 'What is a Tree Data Structure?', bn: 'ট্রি ডেটা স্ট্রাকচার কী?' },
        explanation: {
          en: 'A **Tree** is a non-linear, hierarchical data structure composed of **nodes** connected by directed **edges** without any cycles.\n\nKey Invariant: A tree with **N nodes** always contains exactly **N - 1 edges**. If there are loops or disconnected components, it is not a tree.\n\nEvery node (except the root) has exactly **one incoming edge** (one parent).',
          bn: 'একটি **ট্রি (Tree)** হলো একটি নন-লিনিয়ার হায়ারার্কিকাল ডেটা স্ট্রাকচার যা **নোড** ও দিকনির্দেশক **এজ** দিয়ে গঠিত, যেখানে কোনো সাইকেল বা লুপ থাকে না।\n\nপ্রধান বৈশিষ্ট্য: **N সংখ্যক নোড** থাকলে ট্রিতে ঠিক **N - 1 টি এজ** থাকবে। যদি লুপ থাকে বা কোনো নোড বিচ্ছিন্ন থাকে, তবে তা ট্রি নয়।\n\nরুট বাদে প্রতিটি নোডের ঠিক **একটি ইনকামিং এজ** (একটি প্যারেন্ট) থাকে।'
        },
        line: 0,
        iteration: { i: 1, of: 6, label: { en: 'Concept', bn: 'ধারণা' } },
        state: { nodes: 7, edges: 6, cycles: false },
        scene: {
          kind: 'tree',
          label: 'General Tree: N = 7 nodes, N - 1 = 6 edges',
          root: {
            v: 'A',
            sub: 'Root',
            l: { v: 'B', l: { v: 'D' }, r: { v: 'E' } },
            r: { v: 'C', l: { v: 'F' }, r: { v: 'G' } }
          },
          highlights: { current: 'A', path: ['A', 'B', 'C'] },
          legend: [
            { label: 'Root (Top node)', color: 'var(--yellow)' },
            { label: 'Branches (Edges)', color: 'var(--cyan)' }
          ],
          note: 'A tree has one top node (Root) and branches outward with <b>zero cycles</b>.'
        }
      },
      {
        title: { en: 'Root, Parent, Child & Siblings', bn: 'রুট, প্যারেন্ট, চাইল্ড ও সিবলিং' },
        explanation: {
          en: '- **Root**: The topmost node with no parent (`A`). Every non-empty tree has exactly 1 root.\n- **Parent**: A node that has directed links to lower nodes. `A` is parent of `B` and `C`.\n- **Child**: A node directly descended from a parent. `B` and `C` are children of `A`.\n- **Siblings**: Nodes that share the exact same parent node. `D` and `E` are siblings (both children of `B`).',
          bn: '- **রুট (Root)**: সবার উপরের নোড যার কোনো প্যারেন্ট নেই (`A`)। প্রতিটি ট্রিতে ঠিক ১টি রুট থাকে।\n- **প্যারেন্ট (Parent)**: যে নোড থেকে নিচের নোডে এজ যায়। `A` হলো `B` ও `C`-এর প্যারেন্ট।\n- **চাইল্ড (Child)**: প্যারেন্ট নোডের নিচের নোড। `B` ও `C` হলো `A`-এর চাইল্ড।\n- **সিবলিং (Siblings)**: যাদের প্যারেন্ট একই নোড। `D` ও `E` সিবলিং (উভয়েই `B`-এর সন্তান)।'
        },
        line: 2,
        iteration: { i: 2, of: 6, label: { en: 'Relations', bn: 'সম্পর্ক' } },
        state: { root: 'A', parent: 'B', siblings: 'D, E' },
        scene: {
          kind: 'tree',
          label: 'Parent B and Siblings D, E',
          root: {
            v: 'A',
            l: { v: 'B', l: { v: 'D' }, r: { v: 'E' } },
            r: { v: 'C', l: { v: 'F' }, r: { v: 'G' } }
          },
          highlights: { current: 'B', frontier: ['D', 'E'], path: ['A', 'B'] },
          legend: [
            { label: 'Parent B', color: 'var(--yellow)' },
            { label: 'Siblings (D, E)', color: 'var(--cyan)' }
          ],
          note: 'Nodes <b>D</b> and <b>E</b> are siblings because they share parent <b>B</b>.'
        }
      },
      {
        title: { en: 'Ancestors vs Descendants', bn: 'পূর্বপুরুষ (Ancestors) বনাম বংশধর (Descendants)' },
        explanation: {
          en: '- **Ancestors**: All nodes on the direct path from the node up to the root. For node `D`, its ancestors are `B` and `A`.\n- **Descendants**: All nodes reachable by following edges downward from a node. For node `A`, all other nodes (`B, C, D, E, F, G`) are its descendants.\n- **Subtree**: Any node together with all of its descendants forms a complete subtree.',
          bn: '- **পূর্বপুরুষ (Ancestors)**: কোনো নোড থেকে রুটের দিকে যাওয়ার পথের সব নোড। `D` নোডের পূর্বপুরুষ হলো `B` এবং `A`।\n- **বংশধর (Descendants)**: কোনো নোড থেকে নিচের দিকে নেমে যত নোডে যাওয়া যায়। `A`-এর বংশধর হলো ট্রির অন্য সব নোড।\n- **সাব-ট্রি (Subtree)**: একটি নোড এবং তার নিচের সব বংশধর নোড মিলে একটি পূর্ণ সাব-ট্রি গঠন করে।'
        },
        line: 4,
        iteration: { i: 3, of: 6, label: { en: 'Paths', bn: 'পথ' } },
        state: { target: 'D', ancestors: 'B, A', descendants_of_B: 'D, E' },
        scene: {
          kind: 'tree',
          label: 'Path of Ancestors for Node D: [A → B → D]',
          root: {
            v: 'A',
            l: { v: 'B', l: { v: 'D' }, r: { v: 'E' } },
            r: { v: 'C', l: { v: 'F' }, r: { v: 'G' } }
          },
          highlights: { current: 'D', path: ['A', 'B', 'D'], dim: ['C', 'F', 'G'] },
          legend: [
            { label: 'Target node D', color: 'var(--yellow)' },
            { label: 'Ancestors (B, A)', color: 'var(--green)' }
          ],
          note: 'Green path traces the ancestors from <b>D</b> straight back to root <b>A</b>.'
        }
      },
      {
        title: { en: 'Degree of Node & Leaf vs Internal Nodes', bn: 'নোডের ডিগ্রি ও লিফ বনাম ইন্টারনাল নোড' },
        explanation: {
          en: '- **Degree of a Node**: The number of direct children it has. `A` has degree 2; `B` has degree 2; `D` has degree 0.\n- **Degree of a Tree**: The maximum degree of any node in the tree. Here, Degree = 2.\n- **Leaf (External) Node**: A node with **degree 0** (no children). `D, E, F, G` are leaves.\n- **Internal (Non-Leaf) Node**: Any node with **degree > 0** (has at least 1 child). `A, B, C` are internal nodes.',
          bn: '- **ডিগ্রি (Degree)**: একটি নোডের সরাসরি সন্তানের সংখ্যা। `A`-এর ডিগ্রি ২; `D`-এর ডিগ্রি ০।\n- **ট্রির ডিগ্রি**: পুরো ট্রির যেকোনো নোডের সর্বোচ্চ ডিগ্রি। এই ট্রির ডিগ্রি = ২।\n- **লিফ / এক্সটারনাল নোড (Leaf)**: যে নোডের কোনো সন্তান নেই (**ডিগ্রি ০**)। `D, E, F, G` হলো লিফ নোড।\n- **ইন্টারনাল নোড (Internal)**: যে নোডের অন্তত একটি সন্তান আছে (**ডিগ্রি > ০**)। `A, B, C` হলো ইন্টারনাল নোড।'
        },
        line: 6,
        iteration: { i: 4, of: 6, label: { en: 'Degrees', bn: 'ডিগ্রি' } },
        state: { leafNodes: 'D, E, F, G', internalNodes: 'A, B, C', maxDegree: 2 },
        scene: {
          kind: 'tree',
          label: 'Leaves (green degree 0) vs Internal Nodes (cyan degree 2)',
          root: {
            v: 'A',
            sub: 'deg: 2',
            l: { v: 'B', sub: 'deg: 2', l: { v: 'D', sub: 'leaf' }, r: { v: 'E', sub: 'leaf' } },
            r: { v: 'C', sub: 'deg: 2', l: { v: 'F', sub: 'leaf' }, r: { v: 'G', sub: 'leaf' } }
          },
          highlights: { visited: ['D', 'E', 'F', 'G'], active: ['A', 'B', 'C'] },
          legend: [
            { label: 'Internal Nodes (deg > 0)', color: 'var(--cyan)' },
            { label: 'Leaf Nodes (deg = 0)', color: 'var(--green)' }
          ],
          note: 'Leaves have degree 0 (no children), while internal nodes branch downward.'
        }
      },
      {
        title: { en: 'Levels, Depth, and Height', bn: 'লেভেল, ডেপথ ও হাইট' },
        explanation: {
          en: '- **Level**: Measured level-by-level from top to bottom. Root `A` is at **Level 1** (or 0); `B, C` at Level 2; `D, E, F, G` at Level 3.\n- **Depth of a Node**: Number of edges from root to the node. Depth of root = 0; Depth of `D` = 2.\n- **Height of a Node**: Number of edges on the longest downward path from node to a leaf.\n- **Height of Tree**: Height of the root node. In this tree, height $h = 2$ (or 3 levels).',
          bn: '- **লেভেল (Level)**: উপর থেকে নিচে গোনা হয়। রুট `A` হলো **লেভেল ১** (বা ০); `B, C` লেভেল ২; `D, E, F, G` লেভেল ৩।\n- **ডেপথ (Depth)**: রুট থেকে ওই নোড পর্যন্ত এজের সংখ্যা। রুটের ডেপথ = ০; `D`-এর ডেপথ = ২।\n- **হাইট (Height)**: নোড থেকে সবচেয়ে দূরের লিফ পর্যন্ত এজের সংখ্যা।\n- **ট্রির হাইট**: রুট নোডের হাইট। এই ট্রিতে হাইট $h = 2$ (অথবা ৩টি লেভেল)।'
        },
        line: 9,
        iteration: { i: 5, of: 6, label: { en: 'Metrics', bn: 'পরিমাপ' } },
        state: { treeHeight: 2, totalLevels: 3, rootDepth: 0, leafDepth: 2 },
        scene: {
          kind: 'tree',
          label: 'Level 1: [A] · Level 2: [B, C] · Level 3: [D, E, F, G]',
          root: {
            v: 'A',
            sub: 'L1 · h=2',
            l: { v: 'B', sub: 'L2 · h=1', l: { v: 'D', sub: 'L3 · h=0' }, r: { v: 'E', sub: 'L3 · h=0' } },
            r: { v: 'C', sub: 'L2 · h=1', l: { v: 'F', sub: 'L3 · h=0' }, r: { v: 'G', sub: 'L3 · h=0' } }
          },
          highlights: { current: 'A', frontier: ['B', 'C'], active: ['D', 'E', 'F', 'G'] },
          legend: [
            { label: 'Level 1 (h=2)', color: 'var(--yellow)' },
            { label: 'Level 2 (h=1)', color: 'var(--cyan)' },
            { label: 'Level 3 (h=0)', color: 'var(--green)' }
          ],
          note: 'Height is measured from bottom-up; Depth and Level are measured top-down.'
        }
      },
      {
        title: { en: 'Forest: Collection of Disjoint Trees', bn: 'ফরেস্ট: একাধিক বিচ্ছিন্ন ট্রির সংগ্রহ' },
        explanation: {
          en: 'A **Forest** is a set of zero or more disjoint trees.\n\nKey Property: If you **delete the root node** of any tree, the remaining subtrees immediately become a **Forest**!\n\nConversely, adding a common parent root node over a forest merges it into a single larger tree.',
          bn: '**ফরেস্ট (Forest)** হলো একাধিক বিচ্ছিন্ন (disjoint) ট্রির সমষ্টি।\n\nমজার নিয়ম: যেকোনো ট্রির **রুট নোড কেটে ফেললে**, তার নিচের প্রতিটি সাব-ট্রি আলাদা হয়ে একটি **ফরেস্ট** গঠন করে!\n\nআবার, একটি ফরেস্টের সব ট্রির উপরে একটি সাধারণ রুট নোড যুক্ত করলে একটি একক ট্রি গঠিত হয়।'
        },
        line: 13,
        iteration: { i: 6, of: 6, label: { en: 'Forest', bn: 'ফরেস্ট' } },
        state: { originalRoot: 'Deleted', treesInForest: 2 },
        scene: {
          kind: 'forest',
          label: 'Removing Root A leaves a Forest of 2 Subtrees: T1 (root B) and T2 (root C)',
          trees: [
            { root: { v: 'B', l: { v: 'D' }, r: { v: 'E' } }, caption: 'Subtree T1' },
            { root: { v: 'C', l: { v: 'F' }, r: { v: 'G' } }, caption: 'Subtree T2' }
          ],
          highlights: { active: [0, 1] },
          legend: [
            { label: 'Tree 1 in Forest', color: 'var(--cyan)' },
            { label: 'Tree 2 in Forest', color: 'var(--green)' }
          ],
          note: 'A forest is simply multiple independent trees existing together.'
        }
      }
    ]
  },

  {
    id: 'binary-tree-types',
    name: { en: 'Binary Tree Classifications', bn: 'বাইনারি ট্রির প্রকারভেদ' },
    description: {
      en: 'Strict/Full, Complete, Perfect and Skewed binary tree structures',
      bn: 'স্ট্রিক্ট/ফুল, কমপ্লিট, পারফেক্ট এবং স্কিউড ট্রির তুলনামূলক বিশ্লেষণ'
    },
    categoryKey: 'trees',
    subgroupKey: 'foundations',
    level: 'intermediate',
    order: 20,
    icon: '🌳',
    complexity: {
      time: 'O(n) to verify',
      space: 'O(h) recursion',
      note: {
        en: 'A balanced complete tree achieves O(log n) height; a skewed tree degenerates to O(n) height like a linked list.',
        bn: 'কমপ্লিট ট্রি O(log n) ব্যালান্সড হাইট বজায় রাখে; স্কিউড ট্রি লিঙ্কড লিস্টের মতো O(n) হাইটে অবনমিত হয়।'
      }
    },
    code: {
      pseudo: {
        en: [
          '// Classify Binary Tree Types',
          'function isFullBinaryTree(node):',
          '  if node == null: return true',
          '  if node.left == null and node.right == null: return true',
          '  if node.left != null and node.right != null:',
          '    return isFullBinaryTree(node.left) and isFullBinaryTree(node.right)',
          '  return false // Degree 1 violation!',
          '',
          '// Complete: Filled left-to-right with no gaps',
          '// Perfect: All internal nodes have 2 children, all leaves at same depth',
          '// Skewed: Degenerates to linked list (every node has exactly 1 child)'
        ],
        bn: [
          '// বাইনারি ট্রির ধরন যাচাই',
          'function isFullBinaryTree(node):',
          '  if node == null: return true',
          '  if node.left == null and node.right == null: return true',
          '  if node.left != null and node.right != null:',
          '    return isFullBinaryTree(node.left) and isFullBinaryTree(node.right)',
          '  return false // ১ চাইল্ড থাকলে ফুল ট্রি নয়!',
          '',
          '// কমপ্লিট: বাম থেকে ডানে ফাঁক ছাড়া ভরা',
          '// পারফেক্ট: সব ইন্টারনাল নোডে ২টি চাইল্ড, সব লিফ একই লেভেলে',
          '// স্কিউড: একপাশে হেলে লিঙ্কড লিস্টের মতো হয়ে যাওয়া'
        ]
      },
      js: {
        en: [
          '// JavaScript Binary Tree Type Checker',
          'function isFullBinaryTree(node) {',
          '  if (!node) return true;',
          '  if (!node.left && !node.right) return true;',
          '  if (node.left && node.right) {',
          '    return isFullBinaryTree(node.left) && isFullBinaryTree(node.right);',
          '  }',
          '  return false; // Degree 1 node detected',
          '// Complete: sequential levels without gap',
          '// Perfect: 2^(h+1) - 1 nodes strictly',
          '}'
        ],
        bn: [
          '// জাভাস্ক্রিপ্ট বাইনারি ট্রি টাইপ চেকার',
          'function isFullBinaryTree(node) {',
          '  if (!node) return true;',
          '  if (!node.left && !node.right) return true;',
          '  if (node.left && node.right) {',
          '    return isFullBinaryTree(node.left) && isFullBinaryTree(node.right);',
          '  }',
          '  return false; // ১ চাইল্ড নোড পাওয়া গেছে',
          '// কমপ্লিট: কোনো ফাঁক ছাড়া বাম থেকে ডানে পূর্ণ',
          '// পারফেক্ট: পুরোপুরি 2^(h+1) - 1 নোড',
          '}'
        ]
      },
      java: {
        en: [
          '// Java Binary Tree Type Checker',
          'boolean isFullBinaryTree(Node node) {',
          '  if (node == null) return true;',
          '  if (node.left == null && node.right == null) return true;',
          '  if (node.left != null && node.right != null) {',
          '    return isFullBinaryTree(node.left) && isFullBinaryTree(node.right);',
          '  }',
          '  return false; // Has exactly one child',
          '// Complete: array index i maps to 2i and 2i+1',
          '// Perfect: all leaves at same maximum height',
          '}'
        ],
        bn: [
          '// জাভা বাইনারি ট্রি টাইপ চেকার',
          'boolean isFullBinaryTree(Node node) {',
          '  if (node == null) return true;',
          '  if (node.left == null && node.right == null) return true;',
          '  if (node.left != null && node.right != null) {',
          '    return isFullBinaryTree(node.left) && isFullBinaryTree(node.right);',
          '  }',
          '  return false; // ঠিক একটি সন্তান আছে',
          '// কমপ্লিট: অ্যারে ইনডেক্স i থেকে 2i ও 2i+1',
          '// পারফেক্ট: সব লিফ একই সর্বোচ্চ হাইটে',
          '}'
        ]
      },
      python: {
        en: [
          '# Python Binary Tree Type Checker',
          'def is_full_binary_tree(node):',
          '  if not node: return True',
          '  if not node.left and not node.right: return True',
          '  if node.left and node.right:',
          '    return is_full_binary_tree(node.left) and is_full_binary_tree(node.right)',
          '  return False  # Violation: single child',
          '',
          '# Complete: BFS visits null only after all nodes',
          '# Perfect: Exactly 2**(h + 1) - 1 nodes',
          '# Skewed: Degenerates to linked list'
        ],
        bn: [
          '# পাইথন বাইনারি ট্রি টাইপ চেকার',
          'def is_full_binary_tree(node):',
          '  if not node: return True',
          '  if not node.left and not node.right: return True',
          '  if node.left and node.right:',
          '    return is_full_binary_tree(node.left) and is_full_binary_tree(node.right)',
          '  return False  # ১ সন্তান নোড পাওয়া গেছে',
          '',
          '# কমপ্লিট: BFS-এ সব নোড আসার পরই কেবল নাল আসবে',
          '# পারফেক্ট: ঠিক 2**(h + 1) - 1 টি নোড',
          '# স্কিউড: লিঙ্কড লিস্টের রূপ নেয়'
        ]
      },
      cpp: {
        en: [
          '// C++ Binary Tree Type Checker',
          'bool isFullBinaryTree(Node* node) {',
          '  if (!node) return true;',
          '  if (!node->lchild && !node->rchild) return true;',
          '  if (node->lchild && node->rchild) {',
          '    return isFullBinaryTree(node->lchild) && isFullBinaryTree(node->rchild);',
          '  }',
          '  return false; // Degree 1 found',
          '// Complete: heap array representation valid',
          '// Perfect: all leaf heights equal',
          '}'
        ],
        bn: [
          '// সি++ বাইনারি ট্রি টাইপ চেকার',
          'bool isFullBinaryTree(Node* node) {',
          '  if (!node) return true;',
          '  if (!node->lchild && !node->rchild) return true;',
          '  if (node->lchild && node->rchild) {',
          '    return isFullBinaryTree(node->lchild) && isFullBinaryTree(node->rchild);',
          '  }',
          '  return false; // ১ ডিগ্রি পাওয়া গেছে',
          '// কমপ্লিট: হিপ অ্যারে মডেল শতভাগ প্রযোজ্য',
          '// পারফেক্ট: সব লিফের উচ্চতা সমান',
          '}'
        ]
      }
    },
    steps: [
      {
        title: { en: 'Definition of a Binary Tree', bn: 'বাইনারি ট্রির মূল সংজ্ঞা' },
        explanation: {
          en: 'A **Binary Tree** is a tree where every node can have **at most two children**, explicitly designated as the **Left Child** and the **Right Child**.\n\nEvery node has degree 0, 1, or 2. Unlike general trees, the position matters: left is distinct from right.',
          bn: '**বাইনারি ট্রি (Binary Tree)** হলো এমন একটি ট্রি যেখানে প্রতিটি নোডের **সর্বোচ্চ দুটি সন্তান** থাকতে পারে, যাদের সুনির্দিষ্টভাবে **বাম সন্তান (Left Child)** এবং **ডান সন্তান (Right Child)** বলা হয়।\n\nপ্রতিটি নোডের ডিগ্রি ০, ১, বা ২। সাধারণ ট্রির মতো নয় — এখানে বাম ও ডানের অবস্থান অত্যন্ত গুরুত্বপূর্ণ।'
        },
        line: 0,
        iteration: { i: 1, of: 5, label: { en: 'Classification', bn: 'শ্রেণিবিভাগ' } },
        state: { maxChildren: 2, leftChild: true, rightChild: true },
        scene: {
          kind: 'tree',
          label: 'Standard Binary Tree: Each node has ≤ 2 children',
          root: {
            v: 1,
            l: { v: 2, l: { v: 4 }, r: { v: 5 } },
            r: { v: 3, r: { v: 6 } }
          },
          highlights: { current: 1, frontier: [2, 3] },
          legend: [
            { label: 'Parent', color: 'var(--yellow)' },
            { label: 'Left/Right Children', color: 'var(--cyan)' }
          ],
          note: 'Notice node 3 has only 1 child (6), which is completely allowed in a general binary tree.'
        }
      },
      {
        title: { en: 'Full / Strict / Proper Binary Tree', bn: 'ফুল / স্ট্রিক্ট বাইনারি ট্রি' },
        explanation: {
          en: 'In a **Full (Strict / Proper) Binary Tree**, every single node has **either 0 or 2 children**.\n\n> **Strict Rule**: No node is ever allowed to have exactly 1 child!\n\nIf a node has children, it must have **both** left and right children.',
          bn: 'একটি **ফুল বা স্ট্রিক্ট বাইনারি ট্রিতে (Full / Strict Binary Tree)** প্রতিটি নোডের **ঠিক ০ অথবা ২ টি সন্তান** থাকে।\n\n> **কঠোর নিয়ম**: কোনো নোডের কখনোই ঠিক ১টি সন্তান থাকতে পারবে না!\n\nসন্তান থাকলে অবশ্যই **উভয় সন্তানই (বাম ও ডান)** থাকতে হবে।'
        },
        line: 1,
        iteration: { i: 2, of: 5, label: { en: 'Strict Tree', bn: 'স্ট্রিক্ট ট্রি' } },
        state: { allowedDegrees: '0 or 2', disallowedDegree: '1' },
        scene: {
          kind: 'tree',
          label: 'Strict Binary Tree: Every node has 0 or 2 children',
          root: {
            v: 10,
            sub: 'deg: 2',
            l: { v: 20, sub: 'deg: 2', l: { v: 40, sub: 'deg: 0' }, r: { v: 50, sub: 'deg: 0' } },
            r: { v: 30, sub: 'deg: 2', l: { v: 60, sub: 'deg: 0' }, r: { v: 70, sub: 'deg: 0' } }
          },
          highlights: { active: [10, 20, 30], visited: [40, 50, 60, 70] },
          legend: [
            { label: 'Nodes with 2 children', color: 'var(--cyan)' },
            { label: 'Leaves (0 children)', color: 'var(--green)' }
          ],
          note: 'Notice: every internal node has exactly 2 children; no node has degree 1.'
        }
      },
      {
        title: { en: 'Complete Binary Tree', bn: 'কমপ্লিট বাইনারি ট্রি' },
        explanation: {
          en: 'A **Complete Binary Tree** satisfies two conditions:\n1. All levels are completely filled, except possibly the last level.\n2. The last level is filled **strictly from left to right** without any gaps!\n\nWhy it matters: Complete binary trees can be stored in a **contiguous array** with zero wasted memory slots (foundation of Heaps!).',
          bn: '**কমপ্লিট বাইনারি ট্রি (Complete Binary Tree)** দুটি শর্ত পূরণ করে:\n১. শেষ লেভেল বাদে বাকি সব লেভেল পুরোপুরি পূর্ণ থাকে।\n২. শেষ লেভেলে নোডগুলো **কঠোরভাবে বাম থেকে ডানে পরপর** বসে, কোনো ফাঁক থাকে না!\n\nকেন গুরুত্বপূর্ণ: কমপ্লিট ট্রিকে কোনো মেমোরি নষ্ট না করে সরাসরি **অ্যারেতে** রাখা যায় (হিপের ভিত্তি)।'
        },
        line: 8,
        iteration: { i: 3, of: 5, label: { en: 'Complete Tree', bn: 'কমপ্লিট ট্রি' } },
        state: { lastLevelLeftToRight: true, arrayCompatible: true },
        scene: {
          kind: 'tree',
          label: 'Complete Binary Tree: Filled level-by-level, left to right',
          root: {
            v: 'A',
            l: { v: 'B', l: { v: 'D' }, r: { v: 'E' } },
            r: { v: 'C', l: { v: 'F' } }
          },
          highlights: { path: ['A', 'B', 'C'], active: ['D', 'E', 'F'] },
          legend: [
            { label: 'Filled Levels', color: 'var(--cyan)' },
            { label: 'Last Level (Left-packed)', color: 'var(--green)' }
          ],
          note: 'Node C has left child F but no right child. Because F is left-aligned, this tree is <b>Complete</b>.'
        }
      },
      {
        title: { en: 'Perfect Binary Tree', bn: 'পারফেক্ট বাইনারি ট্রি' },
        explanation: {
          en: 'A **Perfect Binary Tree** is completely filled at every single level:\n- All internal nodes have **exactly 2 children**.\n- All leaf nodes appear at the **exact same depth**.\n\nA perfect tree of height $h$ contains exactly **$2^{h+1} - 1$** nodes. (e.g., $h=2 \\implies 2^3 - 1 = 7$ nodes).',
          bn: '**পারফেক্ট বাইনারি ট্রি (Perfect Binary Tree)** প্রতিটি লেভেলে সম্পূর্ণভাবে পূর্ণ থাকে:\n- সমস্ত ইন্টারনাল নোডের **ঠিক ২টি সন্তান** থাকে।\n- সমস্ত লিফ নোড **একদম একই গভীরতায় (same depth)** থাকে।\n\n$h$ হাইটের পারফেক্ট ট্রিতে মোট নোড থাকে ঠিক **$2^{h+1} - 1$** টি (যেমন $h=2$ হলে $2^3 - 1 = 7$ টি নোড)।'
        },
        line: 9,
        iteration: { i: 4, of: 5, label: { en: 'Perfect Tree', bn: 'পারফেক্ট ট্রি' } },
        state: { height: 2, totalNodes: 7, formula: '2^(2+1) - 1 = 7' },
        scene: {
          kind: 'tree',
          label: 'Perfect Binary Tree: Height = 2, Total Nodes = 2^(2+1) - 1 = 7',
          root: {
            v: 1,
            l: { v: 2, l: { v: 4 }, r: { v: 5 } },
            r: { v: 3, l: { v: 6 }, r: { v: 7 } }
          },
          highlights: { current: 1, active: [2, 3], visited: [4, 5, 6, 7] },
          legend: [
            { label: 'Root (Level 1)', color: 'var(--yellow)' },
            { label: 'Level 2', color: 'var(--cyan)' },
            { label: 'Level 3 Leaves', color: 'var(--green)' }
          ],
          note: 'Every single branch is fully grown to maximum depth. Maximum possible node density!'
        }
      },
      {
        title: { en: 'Skewed Binary Tree (Degenerate Case)', bn: 'স্কিউড বাইনারি ট্রি (ডিজেনারেট কেস)' },
        explanation: {
          en: 'A **Skewed Binary Tree** occurs when every internal node has only **one child**, causing the tree to lean entirely to one side:\n- **Left-Skewed**: Every node has only a left child.\n- **Right-Skewed**: Every node has only a right child.\n\nWorst-Case Disaster: Height becomes **$h = N - 1$**. Searching degrades from $O(\\log N)$ to **$O(N)$** linear time, behaving identically to a Linked List!',
          bn: '**স্কিউড বাইনারি ট্রিতে (Skewed Binary Tree)** প্রতিটি নোডের কেবল **একটি সন্তান** থাকে, যার ফলে ট্রিটি একপাশে কাত হয়ে যায়:\n- **লেফট-স্কিউড**: প্রতিটি নোডের শুধু বাম সন্তান থাকে।\n- **রাইট-স্কিউড**: প্রতিটি নোডের শুধু ডান সন্তান থাকে।\n\nসবচেয়ে খারাপ অবস্থা: হাইট হয়ে যায় **$h = N - 1$**। সার্চিং $O(\\log N)$ থেকে নেমে **$O(N)$** লিনিয়ার টাইম হয়ে যায়, যা হুবহু একটি লিঙ্কড লিস্টের মতো কাজ করে!'
        },
        line: 10,
        iteration: { i: 5, of: 5, label: { en: 'Skewed Tree', bn: 'স্কিউড ট্রি' } },
        state: { height: 3, nodes: 4, complexity: 'O(N) search' },
        scene: {
          kind: 'tree',
          label: 'Right-Skewed Binary Tree: Height = N - 1 = 3 (Degenerates into Linked List)',
          root: {
            v: 10,
            r: {
              v: 20,
              r: {
                v: 30,
                r: { v: 40 }
              }
            }
          },
          highlights: { current: 10, path: [10, 20, 30, 40] },
          legend: [
            { label: 'Linear chain of nodes', color: 'var(--red)' }
          ],
          note: 'Every node has degree 1 except the bottom leaf. Tree structure is completely ruined!'
        }
      }
    ]
  },

  {
    id: 'catalan-and-tree-math',
    name: { en: 'Catalan Numbers & Tree Math', bn: 'কাতালান সংখ্যা ও ট্রির গণিত' },
    description: {
      en: 'Catalan counting formulas, all 5 shapes for N=3, height vs nodes proofs',
      bn: 'কাতালান সূত্র, ৩ নোডের ৫টি গঠন, হাইট বনাম নোডের গাণিতিক প্রমাণ'
    },
    categoryKey: 'trees',
    subgroupKey: 'foundations',
    level: 'intermediate',
    order: 30,
    icon: '📐',
    complexity: {
      time: 'O(n) math',
      space: 'O(1)',
      note: {
        en: 'For N unlabeled nodes, Catalan formula T(N) = (2N)! / ((N+1)! N!) gives the total distinct binary tree structures. For N labeled nodes, multiply by N! permutations.',
        bn: 'N টি আনলেবেলড নোডের জন্য কাতালান সূত্র T(N) মোট পৃথক ট্রির গঠন গণনা করে। লেবেলড নোডের ক্ষেত্রে N! পারমিউটেশন দিয়ে গুণ করতে হয়।'
      }
    },
    code: {
      pseudo: {
        en: [
          '// Catalan Number Calculation: T(N) = C(2N, N) / (N + 1)',
          'function catalan(n):',
          '  c = 1',
          '  for i = 0 to n - 1:',
          '    c = c * 2 * (2 * i + 1) / (i + 2)',
          '  return c',
          '',
          '// Mathematical Theorems:',
          '// 1. Min nodes for height h: Nmin = h + 1 (skewed)',
          '// 2. Max nodes for height h: Nmax = 2^(h + 1) - 1 (full)',
          '// 3. Strict Binary Tree: N0 = N2 + 1 (Leaves = Deg2 + 1)',
          '// 4. Max height trees for N nodes = 2^(N - 1)'
        ],
        bn: [
          '// কাতালান সংখ্যা হিসাব: T(N) = C(2N, N) / (N + 1)',
          'function catalan(n):',
          '  c = 1',
          '  for i = 0 to n - 1:',
          '    c = c * 2 * (2 * i + 1) / (i + 2)',
          '  return c',
          '',
          '// গাণিতিক সূত্রাবলী:',
          '// ১. h হাইটে সর্বনিম্ন নোড: Nmin = h + 1 (স্কিউড)',
          '// ২. h হাইটে সর্বোচ্চ নোড: Nmax = 2^(h + 1) - 1 (ফুল)',
          '// ৩. স্ট্রিক্ট ট্রি উপপাদ্য: N0 = N2 + 1 (লিফ = ২-ডিগ্রি + ১)',
          '// ৪. সর্বোচ্চ হাইটের ট্রি সংখ্যা = 2^(N - 1)'
        ]
      },
      js: {
        en: [
          '// JavaScript Catalan Number Calculator',
          'function catalan(n) {',
          '  let c = 1;',
          '  for (let i = 0; i < n; i++) {',
          '    c = (c * 2 * (2 * i + 1)) / (i + 2);',
          '  }',
          '  return Math.round(c);',
          '}',
          '// 1. Nmin = h + 1 (skewed tree)',
          '// 2. Nmax = Math.pow(2, h + 1) - 1 (perfect tree)',
          '// 3. N0 = N2 + 1 (Leaf theorem)',
          '// 4. Max height trees = Math.pow(2, n - 1)'
        ],
        bn: [
          '// জাভাস্ক্রিপ্ট কাতালান ক্যালকুলেটর',
          'function catalan(n) {',
          '  let c = 1;',
          '  for (let i = 0; i < n; i++) {',
          '    c = (c * 2 * (2 * i + 1)) / (i + 2);',
          '  }',
          '  return Math.round(c);',
          '}',
          '// ১. Nmin = h + 1 (স্কিউড ট্রি)',
          '// ২. Nmax = Math.pow(2, h + 1) - 1 (পারফেক্ট ট্রি)',
          '// ৩. N0 = N2 + 1 (লিফ নোড উপপাদ্য)',
          '// ৪. সর্বোচ্চ উচ্চতার ট্রি = Math.pow(2, n - 1)'
        ]
      },
      java: {
        en: [
          '// Java Catalan Number Calculator',
          'long catalan(int n) {',
          '  long c = 1;',
          '  for (int i = 0; i < n; i++) {',
          '    c = c * 2 * (2 * i + 1) / (i + 2);',
          '  }',
          '  return c;',
          '}',
          '// 1. Minimum nodes: Nmin = h + 1',
          '// 2. Maximum nodes: Nmax = (1L << (h + 1)) - 1',
          '// 3. Leaf theorem: E = I + 1',
          '// 4. Max height trees: 1L << (n - 1)'
        ],
        bn: [
          '// জাভা কাতালান ক্যালকুলেটর',
          'long catalan(int n) {',
          '  long c = 1;',
          '  for (int i = 0; i < n; i++) {',
          '    c = c * 2 * (2 * i + 1) / (i + 2);',
          '  }',
          '  return c;',
          '}',
          '// ১. সর্বনিম্ন নোড: Nmin = h + 1',
          '// ২. সর্বোচ্চ নোড: Nmax = (1L << (h + 1)) - 1',
          '// ৩. লিফ উপপাদ্য: E = I + 1',
          '// ৪. সর্বোচ্চ উচ্চতার ট্রি: 1L << (n - 1)'
        ]
      },
      python: {
        en: [
          '# Python Catalan Number Calculator',
          'def catalan(n):',
          '  c = 1',
          '  for i in range(n):',
          '    c = c * 2 * (2 * i + 1) // (i + 2)',
          '  return c',
          '',
          '# Mathematical Theorems:',
          '# 1. N_min = h + 1 (skewed)',
          '# 2. N_max = 2**(h + 1) - 1 (full)',
          '# 3. N_0 = N_2 + 1 (Leaves = Deg2 + 1)',
          '# 4. Max height trees = 2**(n - 1)'
        ],
        bn: [
          '# পাইথন কাতালান ক্যালকুলেটর',
          'def catalan(n):',
          '  c = 1',
          '  for i in range(n):',
          '    c = c * 2 * (2 * i + 1) // (i + 2)',
          '  return c',
          '',
          '# গাণিতিক সূত্রাবলী:',
          '# ১. N_min = h + 1 (স্কিউড)',
          '# ২. N_max = 2**(h + 1) - 1 (ফুল)',
          '# ৩. N_0 = N_2 + 1 (লিফ = ২-ডিগ্রি + ১)',
          '# ৪. সর্বোচ্চ উচ্চতার ট্রি = 2**(n - 1)'
        ]
      },
      cpp: {
        en: [
          '// C++ Catalan Number Calculator',
          'long long catalan(int n) {',
          '  long long c = 1;',
          '  for (int i = 0; i < n; i++) {',
          '    c = c * 2 * (2 * i + 1) / (i + 2);',
          '  }',
          '  return c;',
          '}',
          '// 1. Minimum nodes: Nmin = h + 1',
          '// 2. Maximum nodes: Nmax = (1ULL << (h + 1)) - 1',
          '// 3. Strict binary tree: leaves = internal + 1',
          '// 4. Max height trees = 1ULL << (n - 1)'
        ],
        bn: [
          '// সি++ কাতালান ক্যালকুলেটর',
          'long long catalan(int n) {',
          '  long long c = 1;',
          '  for (int i = 0; i < n; i++) {',
          '    c = c * 2 * (2 * i + 1) / (i + 2);',
          '  }',
          '  return c;',
          '}',
          '// ১. সর্বনিম্ন নোড: Nmin = h + 1',
          '// ২. সর্বোচ্চ নোড: Nmax = (1ULL << (h + 1)) - 1',
          '// ৩. স্ট্রিক্ট ট্রি: লিফ = ইন্টারনাল + ১',
          '// ৪. সর্বোচ্চ উচ্চতার ট্রি = 1ULL << (n - 1)'
        ]
      }
    },
    steps: [
      {
        title: { en: 'Catalan Numbers: Counting Distinct Tree Shapes', bn: 'কাতালান সংখ্যা: ট্রির সম্ভাব্য গঠন গণনা' },
        explanation: {
          en: 'How many distinct structural shapes can be formed with **N unlabeled nodes**?\n\nThe answer is given by the **Catalan Number** formula:\n$$T(N) = \\frac{1}{N + 1} \\binom{2N}{N} = \\frac{(2N)!}{(N + 1)! N!}$$\n\nOr recursively: $T(N) = \\sum_{i=1}^{N} T(i - 1) \\cdot T(N - i)$\n- $T(0) = 1, T(1) = 1, T(2) = 2, \\mathbf{T(3) = 5}, T(4) = 14, T(5) = 42, T(6) = 132$.',
          bn: '**N সংখ্যক আনলেবেলড নোড** দিয়ে কয়টি ভিন্ন ভিন্ন আকৃতির বাইনারি ট্রি তৈরি করা সম্ভব?\n\nএর উত্তর দেয় বিশ্ববিখ্যাত **কাতালান সংখ্যা (Catalan Numbers)** সূত্র:\n$$T(N) = \\frac{1}{N + 1} \\binom{2N}{N} = \\frac{(2N)!}{(N + 1)! N!}$$\n\nরিকারসিভ রূপ: $T(N) = \\sum_{i=1}^{N} T(i - 1) \\cdot T(N - i)$\n- $T(0) = 1, T(1) = 1, T(2) = 2, \\mathbf{T(3) = 5}, T(4) = 14, T(5) = 42, T(6) = 132$।'
        },
        line: 1,
        iteration: { i: 1, of: 5, label: { en: 'Catalan Math', bn: 'কাতালান সূত্র' } },
        state: { N: 3, T_3: 5, T_4: 14, T_5: 42 },
        scene: {
          kind: 'catalan-calc',
          label: 'Interactive Catalan Tree Calculator & Growth Analyzer',
          note: 'Use the interactive calculator to compute Catalan numbers T(N), labeled permutations, and height bounds!'
        }
      },
      {
        title: { en: 'All 5 Distinct Shapes for N = 3 Nodes', bn: '৩টি নোডের জন্য ৫টি ভিন্ন গঠন' },
        explanation: {
          en: 'Here are the **exact 5 distinct tree shapes** guaranteed by $T(3) = 5$:\n1. **Straight Left Skewed**: Root → Left → Left\n2. **Zig-Zag Left-Right**: Root → Left → Right\n3. **Balanced Full Tree**: Root with both Left and Right children\n4. **Zig-Zag Right-Left**: Root → Right → Left\n5. **Straight Right Skewed**: Root → Right → Right\n\nEvery possible binary tree of 3 nodes is isomorphic to one of these 5!',
          bn: 'এখানে $T(3) = 5$ সূত্রের প্রমাণ হিসেবে **হুবহু ৫টি ভিন্ন গঠন** প্রদর্শিত হলো:\n১. **সোজা লেফট স্কিউড**: রুট → বাম → বাম\n২. **জিগ-জ্যাগ লেফট-রাইট**: রুট → বাম → ডান\n৩. **ব্যালান্সড ট্রি**: রুটের বাম ও ডান দুই পাশেই নোড\n৪. **জিগ-জ্যাগ রাইট-লেফট**: রুট → ডান → বাম\n৫. **সোজা রাইট স্কিউড**: রুট → ডান → ডান\n\n৩টি নোড বিশিষ্ট পৃথিবীর যেকোনো বাইনারি ট্রি এই ৫টি গঠনের যেকোনো একটির হুবহু অনুরূপ!'
        },
        line: 5,
        iteration: { i: 2, of: 5, label: { en: '5 Shapes', bn: '৫টি রূপ' } },
        state: { shapesCount: 5, leftSkewed: 1, balanced: 1, rightSkewed: 1, zigzags: 2 },
        scene: {
          kind: 'forest',
          label: 'The 5 Distinct Binary Tree Shapes for N = 3 Nodes: T(3) = 5',
          trees: [
            { root: { v: '•', l: { v: '•', l: { v: '•' } } }, caption: '1. Left Line' },
            { root: { v: '•', l: { v: '•', r: { v: '•' } } }, caption: '2. Left-Right' },
            { root: { v: '•', l: { v: '•' }, r: { v: '•' } }, caption: '3. Balanced' },
            { root: { v: '•', r: { v: '•', l: { v: '•' } } }, caption: '4. Right-Left' },
            { root: { v: '•', r: { v: '•', r: { v: '•' } } }, caption: '5. Right Line' }
          ],
          highlights: { active: [2] },
          legend: [
            { label: 'Balanced (Shape 3)', color: 'var(--yellow)' },
            { label: 'Skewed & Zigzags', color: 'var(--cyan)' }
          ],
          note: 'Only Shape 3 achieves minimal height h = 1; shapes 1, 2, 4, 5 have maximum height h = 2.'
        }
      },
      {
        title: { en: 'Labeled Nodes & Maximum Height Trees', bn: 'লেবেলযুক্ত নোড ও সর্বোচ্চ উচ্চতার ট্রি' },
        explanation: {
          en: '- **Labeled Nodes**: If the $N$ nodes have distinct values (e.g., keys A, B, C), each of the $T(N)$ structural shapes can be filled in $N!$ permutations:\n$$\\text{Total Labeled Trees} = T(N) \\times N! = \\left[ \\frac{1}{N+1} \\binom{2N}{N} \\right] \\times N!$$\nFor $N = 3$: $5 \\times 3! = 5 \\times 6 = \\mathbf{30\\text{ distinct labeled trees}}$.\n\n- **Maximum Height Trees ($h = N - 1$)**: The number of trees having maximum possible height is given by **$2^{N - 1}$**. For $N = 3$, $2^{3-1} = 4$ trees (shapes 1, 2, 4, 5).',
          bn: '- **লেবেলযুক্ত নোড (Labeled Nodes)**: নোডগুলোতে যদি নাম বা মান থাকে (যেমন A, B, C), তবে প্রতিটি কাঠামোর ভেতর নোডগুলোকে $N!$ ভাবে সাজানো যায়:\n$$\\text{মোট লেবেলড ট্রি} = T(N) \\times N! = \\left[ \\frac{1}{N+1} \\binom{2N}{N} \\right] \\times N!$$\n$N = 3$ হলে: $5 \\times 3! = 5 \\times 6 = \\mathbf{30টি\\text{ পৃথক ট্রি}}$।\n\n- **সর্বোচ্চ উচ্চতার ট্রি ($h = N - 1$)**: $N$ নোডের জন্য সর্বোচ্চ উচ্চতা ($h = N-1$) বিশিষ্ট ট্রি সংখ্যা হলো **$2^{N - 1}$**। $N=3$ হলে $2^{3-1} = 4$ টি (আগের স্লাইডের ১, ২, ৪ ও ৫ নং গঠন)।'
        },
        line: 6,
        iteration: { i: 3, of: 5, label: { en: 'Permutations', bn: 'পারমিউটেশন' } },
        state: { N: 3, structuralShapes: 5, permutations: 6, totalLabeledTrees: 30, maxHeightTrees: 4 },
        scene: {
          kind: 'cards',
          label: 'Labeled Nodes Permutations for N = 3',
          cards: [
            { icon: '🌲', title: 'Unlabeled Shapes', desc: 'T(3) = 5 shapes without values.', state: 'ok', tag: 'Catalan', accent: 'var(--cyan)' },
            { icon: '🔤', title: 'Key Permutations', desc: '3! = 6 ways to place A, B, C.', state: 'active', tag: 'N!', accent: 'var(--yellow)' },
            { icon: '🎯', title: 'Total Labeled', desc: '5 × 6 = 30 distinct trees.', state: 'ok', tag: 'Result', accent: 'var(--green)' },
            { icon: '📏', title: 'Max Height Trees', desc: '2^(N-1) = 2^2 = 4 tall trees.', state: 'dim', tag: '2^(N-1)', accent: 'var(--purple)' }
          ],
          caption: 'Total Labeled = Catalan T(N) × N! permutations'
        }
      },
      {
        title: { en: 'Height vs Node Bounds & Proof', bn: 'হাইট বনাম নোড উপপাদ্যের প্রমাণ' },
        explanation: {
          en: 'Rigorous formulas link tree height $h$ and node count $N$:\n\n1. **Given Height $h$ → Min & Max Nodes**:\n   - **Minimum Nodes**: $N_{min} = h + 1$ (occurs in a skewed tree).\n   - **Maximum Nodes**: $N_{max} = 2^{h + 1} - 1$ (occurs in a perfect tree).\n   - *Proof*: Level 0 has 1 node, Level 1 has 2, ..., Level $h$ has $2^h$. Summing Geometric Progression: $S = 1 + 2 + 4 + \\dots + 2^h = 1 \\cdot \\frac{2^{h+1}-1}{2-1} = \\mathbf{2^{h+1}-1}$.\n\n2. **Given $N$ Nodes → Min & Max Height**:\n   - **Maximum Height**: $h_{max} = N - 1$\n   - **Minimum Height**: $h_{min} = \\lfloor \\log_2 N \\rfloor$',
          bn: 'ট্রির উচ্চতা $h$ এবং নোড সংখ্যা $N$-এর মধ্যে সম্পর্ক:\n\n১. **উচ্চতা $h$ জানা থাকলে → সর্বনিম্ন ও সর্বোচ্চ নোড**:\n   - **সর্বনিম্ন নোড**: $N_{min} = h + 1$ (স্কিউড ট্রির ক্ষেত্রে)।\n   - **সর্বোচ্চ নোড**: $N_{max} = 2^{h + 1} - 1$ (পারফেক্ট ট্রির ক্ষেত্রে)।\n   - *প্রমাণ*: লেভেল ০-এ ১টি, লেভেল ১-এ ২টি, ..., লেভেল $h$-এ $2^h$ টি নোড। গুণোত্তর ধারা যোগ করে পাই: $1 + 2 + 4 + \\dots + 2^h = \\mathbf{2^{h+1}-1}$।\n\n২. **$N$ নোড জানা থাকলে → সর্বনিম্ন ও সর্বোচ্চ উচ্চতা**:\n   - **সর্বোচ্চ উচ্চতা**: $h_{max} = N - 1$\n   - **সর্বনিম্ন উচ্চতা**: $h_{min} = \\lfloor \\log_2 N \\rfloor$।'
        },
        line: 8,
        iteration: { i: 4, of: 5, label: { en: 'GP Proof', bn: 'ধারার প্রমাণ' } },
        state: { height: 2, N_min: 3, N_max: 7, formula: '1 + 2 + 4 = 7' },
        scene: {
          kind: 'tree',
          label: 'Geometric Series: Level 0 (1) + Level 1 (2) + Level 2 (4) = 7 nodes',
          root: {
            v: 'L0: 1',
            l: { v: 'L1: 2', l: { v: 'L2: 4' }, r: { v: 'L2: 4' } },
            r: { v: 'L1: 2', l: { v: 'L2: 4' }, r: { v: 'L2: 4' } }
          },
          highlights: { current: 'L0: 1', frontier: ['L1: 2'], active: ['L2: 4'] },
          legend: [
            { label: 'Level 0: 2^0 = 1', color: 'var(--yellow)' },
            { label: 'Level 1: 2^1 = 2', color: 'var(--cyan)' },
            { label: 'Level 2: 2^2 = 4', color: 'var(--green)' }
          ],
          note: 'Sum of GP: 1 + 2 + 4 = 2^(2+1) - 1 = 7 nodes.'
        }
      },
      {
        title: { en: 'The Leaf Node Theorem: N0 = N2 + 1', bn: 'লিফ নোড উপপাদ্য: N0 = N2 + 1' },
        explanation: {
          en: '### Universal Binary Tree Theorem:\nIn **any** binary tree whatsoever, the number of leaf nodes (degree 0, denoted $N_0$) is always **exactly one more** than the number of degree-2 nodes ($N_2$):\n$$\\mathbf{N_0 = N_2 + 1}$$\n\n*Proof*:\n- Total nodes $N = N_0 + N_1 + N_2$\n- Total edges $E = N - 1 = 0 \\cdot N_0 + 1 \\cdot N_1 + 2 \\cdot N_2$\n- Subtracting: $(N_0 + N_1 + N_2) - 1 = N_1 + 2N_2 \\implies \\mathbf{N_0 = N_2 + 1}$.\n\nAlso, for Strict Binary Trees, External nodes $E = I + 1$ (Leaf nodes = Internal nodes + 1).',
          bn: '### সার্বজনীন বাইনারি ট্রি উপপাদ্য:\nযেকোনো বাইনারি ট্রিতে লিফ নোডের সংখ্যা ($N_0$) সর্বদা ২-ডিগ্রি সম্পন্ন নোডের সংখ্যার ($N_2$) চেয়ে **ঠিক ১ বেশি** হয়:\n$$\\mathbf{N_0 = N_2 + 1}$$\n\n*সহজ গাণিতিক প্রমাণ*:\n- মোট নোড: $N = N_0 + N_1 + N_2$\n- মোট এজ: $E = N - 1 = 0 \\cdot N_0 + 1 \\cdot N_1 + 2 \\cdot N_2$\n- মান বসিয়ে বিয়োগ করলে পাওয়া যায়: $(N_0 + N_1 + N_2) - 1 = N_1 + 2N_2 \\implies \\mathbf{N_0 = N_2 + 1}$।\n\nঅনুরূপভাবে, স্ট্রিক্ট ট্রিতে এক্সটারনাল নোড $E = I + 1$ (লিফ = ইন্টারনাল + ১)।'
        },
        line: 10,
        iteration: { i: 5, of: 5, label: { en: 'Theorem', bn: 'উপপাদ্য' } },
        state: { N0_leaves: 4, N2_deg2: 3, N1_deg1: 0, verified: '4 = 3 + 1' },
        scene: {
          kind: 'tree',
          label: 'Verification: 3 yellow degree-2 nodes (N2=3) → 4 green leaves (N0 = 3 + 1 = 4)',
          root: {
            v: 50,
            sub: 'N2',
            l: { v: 25, sub: 'N2', l: { v: 10, sub: 'N0' }, r: { v: 30, sub: 'N0' } },
            r: { v: 75, sub: 'N2', l: { v: 60, sub: 'N0' }, r: { v: 90, sub: 'N0' } }
          },
          highlights: { active: [50, 25, 75], visited: [10, 30, 60, 90] },
          legend: [
            { label: 'Degree 2 Nodes (N2 = 3)', color: 'var(--cyan)' },
            { label: 'Leaf Nodes (N0 = 4)', color: 'var(--green)' }
          ],
          note: 'Notice: N0 (4) = N2 (3) + 1. The formula holds true for every binary tree in computer science!'
        }
      }
    ]
  },

  {
    id: 'tree-representations',
    name: { en: 'Tree Memory Representations', bn: 'ট্রির মেমোরি রিপ্রেজেন্টেশন' },
    description: {
      en: 'Sequential array representation, index math, linked pointers and NULL pointer theorem',
      bn: 'সিকোয়েনশিয়াল অ্যারে, ইনডেক্স সূত্র, লিঙ্কড পয়েন্টার এবং নাল পয়েন্টার উপপাদ্য'
    },
    categoryKey: 'trees',
    subgroupKey: 'foundations',
    level: 'intermediate',
    order: 40,
    icon: '💾',
    complexity: {
      time: 'O(1) access',
      space: 'O(n) linked, O(2^h) array worst',
      note: {
        en: 'In complete binary trees, array representation achieves 100% space utilization. In a linked tree with N nodes, there are exactly N + 1 NULL pointers.',
        bn: 'কমপ্লিট ট্রিতে অ্যারে ১০০% মেমোরি ব্যবহার করে। N নোডের লিঙ্কড ট্রিতে ঠিক N + 1 টি NULL পয়েন্টার থাকে।'
      }
    },
    code: {
      pseudo: {
        en: [
          '// 1-Based Sequential Array Formulas:',
          '// For any node at index i:',
          'leftChild(i)  = 2 * i',
          'rightChild(i) = 2 * i + 1',
          'parent(i)     = floor(i / 2)',
          '',
          '// Linked Node Structure:',
          'class Node:',
          '  data',
          '  lchild = null',
          '  rchild = null',
          '',
          '// NULL Pointer Theorem: N nodes have N + 1 NULL pointers',
          'nullPointers = nodeCount + 1'
        ],
        bn: [
          '// ১-ভিত্তিক সিকোয়েনশিয়াল অ্যারের সূত্র:',
          '// i ইনডেক্সে থাকা যেকোনো নোডের জন্য:',
          'leftChild(i)  = 2 * i',
          'rightChild(i) = 2 * i + 1',
          'parent(i)     = floor(i / 2)',
          '',
          '// লিঙ্কড নোড স্ট্রাকচার:',
          'class Node:',
          '  data',
          '  lchild = null',
          '  rchild = null',
          '',
          '// নাল পয়েন্টার উপপাদ্য: N নোডে ঠিক N + 1 টি NULL থাকে',
          'nullPointers = nodeCount + 1'
        ]
      },
      js: {
        en: [
          '// 1-Based Sequential Array Formulas:',
          '// For any node at index i:',
          'const leftChild = (i) => 2 * i;',
          'const rightChild = (i) => 2 * i + 1;',
          'const parent = (i) => Math.floor(i / 2);',
          '',
          '// Linked Node Structure:',
          'class Node {',
          '  data;',
          '  lchild = null;',
          '  rchild = null;',
          '  constructor(val) { this.data = val; }',
          '}',
          'const nullCount = nodeCount + 1;'
        ],
        bn: [
          '// ১-ভিত্তিক সিকোয়েনশিয়াল অ্যারের সূত্র:',
          '// i ইনডেক্সে থাকা যেকোনো নোডের জন্য:',
          'const leftChild = (i) => 2 * i;',
          'const rightChild = (i) => 2 * i + 1;',
          'const parent = (i) => Math.floor(i / 2);',
          '',
          '// লিঙ্কড নোড স্ট্রাকচার:',
          'class Node {',
          '  data;',
          '  lchild = null;',
          '  rchild = null;',
          '  constructor(val) { this.data = val; }',
          '}',
          'const nullCount = nodeCount + 1;'
        ]
      },
      java: {
        en: [
          '// 1-Based Sequential Array Formulas:',
          '// For any node at index i:',
          'int leftChild(int i)  { return 2 * i; }',
          'int rightChild(int i) { return 2 * i + 1; }',
          'int parent(int i)     { return i / 2; }',
          '',
          '// Linked Node Structure:',
          'class Node {',
          '  int data;',
          '  Node lchild;',
          '  Node rchild;',
          '  Node(int val) { this.data = val; }',
          '}',
          'int nullCount = nodeCount + 1;'
        ],
        bn: [
          '// ১-ভিত্তিক সিকোয়েনশিয়াল অ্যারের সূত্র:',
          '// i ইনডেক্সে থাকা যেকোনো নোডের জন্য:',
          'int leftChild(int i)  { return 2 * i; }',
          'int rightChild(int i) { return 2 * i + 1; }',
          'int parent(int i)     { return i / 2; }',
          '',
          '// লিঙ্কড নোড স্ট্রাকচার:',
          'class Node {',
          '  int data;',
          '  Node lchild;',
          '  Node rchild;',
          '  Node(int val) { this.data = val; }',
          '}',
          'int nullCount = nodeCount + 1;'
        ]
      },
      python: {
        en: [
          '# 1-Based Sequential Array Formulas:',
          '# For any node at index i:',
          'def left_child(i):  return 2 * i',
          'def right_child(i): return 2 * i + 1',
          'def parent(i):      return i // 2',
          '',
          '# Linked Node Structure:',
          'class Node:',
          '  data = 0',
          '  lchild = None',
          '  rchild = None',
          '  def __init__(self, val): self.data = val',
          '',
          'null_count = node_count + 1'
        ],
        bn: [
          '# ১-ভিত্তিক সিকোয়েনশিয়াল অ্যারের সূত্র:',
          '# i ইনডেক্সে থাকা যেকোনো নোডের জন্য:',
          'def left_child(i):  return 2 * i',
          'def right_child(i): return 2 * i + 1',
          'def parent(i):      return i // 2',
          '',
          '# লিঙ্কড নোড স্ট্রাকচার:',
          'class Node:',
          '  data = 0',
          '  lchild = None',
          '  rchild = None',
          '  def __init__(self, val): self.data = val',
          '',
          'null_count = node_count + 1'
        ]
      },
      cpp: {
        en: [
          '// 1-Based Sequential Array Formulas:',
          '// For any node at index i:',
          'inline int leftChild(int i)  { return 2 * i; }',
          'inline int rightChild(int i) { return 2 * i + 1; }',
          'inline int parent(int i)     { return i / 2; }',
          '',
          '// Linked Node Structure:',
          'struct Node {',
          '  int data;',
          '  Node *lchild;',
          '  Node *rchild;',
          '  Node(int val) : data(val), lchild(nullptr), rchild(nullptr) {}',
          '};',
          'int nullCount = nodeCount + 1;'
        ],
        bn: [
          '// ১-ভিত্তিক সিকোয়েনশিয়াল অ্যারের সূত্র:',
          '// i ইনডেক্সে থাকা যেকোনো নোডের জন্য:',
          'inline int leftChild(int i)  { return 2 * i; }',
          'inline int rightChild(int i) { return 2 * i + 1; }',
          'inline int parent(int i)     { return i / 2; }',
          '',
          '// লিঙ্কড নোড স্ট্রাকচার:',
          'struct Node {',
          '  int data;',
          '  Node *lchild;',
          '  Node *rchild;',
          '  Node(int val) : data(val), lchild(nullptr), rchild(nullptr) {}',
          '};',
          'int nullCount = nodeCount + 1;'
        ]
      }
    },
    steps: [
      {
        title: { en: 'Sequential Array Representation (1-Based)', bn: 'সিকোয়েনশিয়াল অ্যারে রিপ্রেজেন্টেশন (১-ভিত্তিক)' },
        explanation: {
          en: 'Nodes are stored in an array indexed from 1 level-by-level.\nFor any node at index **$i$**:\n- **Left Child Index**: $2 \\times i$\n- **Right Child Index**: $2 \\times i + 1$\n- **Parent Index**: $\\lfloor i / 2 \\rfloor$\n\nExample: Root `A` is at index 1. Its left child `B` is at $2 \\times 1 = 2$, and right child `C` is at $2 \\times 1 + 1 = 3$. Click any node or array slot to inspect live index formulas!',
          bn: 'নোডগুলোকে লেভেল অনুযায়ী উপর থেকে নিচে ১ থেকে শুরু হওয়া অ্যারেতে রাখা হয়।\nযেকোনো **$i$** তম ইনডেক্সের জন্য:\n- **বাম সন্তানের ইনডেক্স**: $2 \\times i$\n- **ডান সন্তানের ইনডেক্স**: $2 \\times i + 1$\n- **প্যারেন্ট ইনডেক্স**: $\\lfloor i / 2 \\rfloor$\n\nউদাহরণ: রুট `A` আছে ইনডেক্স ১-এ। তার বাম সন্তান `B` যাবে $2 \\times 1 = 2$-এ এবং ডান সন্তান `C` যাবে $2 \\times 1 + 1 = 3$-এ। যেকোনো নোডে ক্লিক করে সরাসরি সূত্রগুলো দেখুন!'
        },
        line: 2,
        iteration: { i: 1, of: 4, label: { en: 'Array Indexing', bn: 'অ্যারে ইনডেক্স' } },
        state: { i: 1, leftChild: 2, rightChild: 3, parent: 0, mode: '1-Based Sequential Array' },
        scene: {
          kind: 'tree-memory',
          memoryMode: 'array-mapping',
          label: 'Sequential Array Memory Mapping: Tree Nodes Project Directly into RAM Array Slots',
          note: '1-Based array math links nodes directly in RAM: leftChild = 2i, rightChild = 2i + 1, parent = ⌊i / 2⌋'
        }
      },
      {
        title: { en: 'Array Suitability: Complete Trees vs Skewed Waste', bn: 'অ্যারের উপযোগিতা: কমপ্লিট বনাম স্কিউড অপচয়' },
        explanation: {
          en: '- **Complete Binary Trees**: Pack the array with **zero wasted cells**. It is extremely cache-friendly and compact.\n- **Skewed Binary Trees**: Cause massive memory wastage! A right-skewed tree of height $h = 4$ needs an array of size $2^{h+1} - 1 = 31$, but holds only 5 nodes! $84\\%$ of the array is empty garbage holes ($O(2^h)$ space).',
          bn: '- **কমপ্লিট বাইনারি ট্রি**: অ্যারের কোনো ঘর নষ্ট না করে শতভাগ পূরণ করে। এটি ক্যাশ-ফ্রেন্ডলি এবং নিরেট।\n- **স্কিউড বাইনারি ট্রি**: ভয়াবহ মেমোরি অপচয় ঘটায়! $h = 4$ উচ্চতার একটি স্কিউড ট্রির জন্য অ্যারে লাগে $2^{h+1} - 1 = 31$ আকারের, অথচ নোড থাকে মাত্র ৫টি! অ্যারের ৮৪% জায়গা ফাঁকা অপচয় হয় ($O(2^h)$ মেমোরি নষ্ট)।'
        },
        line: 4,
        iteration: { i: 2, of: 4, label: { en: 'Storage Waste', bn: 'মেমোরি অপচয়' } },
        state: { completeTreeWaste: '0% (Compact)', skewedTreeWaste: '62.5% to 84% empty holes', arrayWorstCase: 'O(2^h)' },
        scene: {
          kind: 'tree-memory',
          memoryMode: 'skewed-waste',
          label: 'Right-Skewed Tree Array Layout: Massive Wasted Empty Gaps (∅)',
          note: 'Grey hatched cells (∅) are unallocated memory slots forced by array index arithmetic.'
        }
      },
      {
        title: { en: 'Linked Pointer Representation (3-Field Heap Struct)', bn: 'লিঙ্কড পয়েন্টার রিপ্রেজেন্টেশন (৩-ফিল্ড হিপ স্ট্রাক্ট)' },
        explanation: {
          en: 'In dynamic memory (heap), each node is represented as an independent structure containing:\n1. `*lchild`: 64-bit pointer storing the RAM address of left child\n2. `data`: The payload value\n3. `*rchild`: 64-bit pointer storing the RAM address of right child\n\nUnlike arrays, nodes can live anywhere in RAM and are connected dynamically by pointers without wasting a single byte on gaps.',
          bn: 'ডাইনামিক মেমোরিতে (হিপ) প্রতিটি নোড একটি স্বাধীন স্ট্রাকচার হিসেবে সংরক্ষিত থাকে যাতে থাকে:\n১. `*lchild`: বাম সন্তানের মেমোরি অ্যাড্রেস ধারণকারী পয়েন্টার\n২. `data`: নোডের আসল মান বা ডেটা\n৩. `*rchild`: ডান সন্তানের মেমোরি অ্যাড্রেস ধারণকারী পয়েন্টার\n\nঅ্যারের মতো নোডগুলোকে পাশাপাশি থাকতে হয় না; মেমোরির যেকোনো স্থান থেকে পয়েন্টার দিয়ে এগুলো চমৎকারভাবে সংযুক্ত থাকে।'
        },
        line: 7,
        iteration: { i: 3, of: 4, label: { en: 'Linked Node', bn: 'লিঙ্কড নোড' } },
        state: { struct: 'Node { Node* lchild; int data; Node* rchild; }', rootAddress: '0x1000' },
        scene: {
          kind: 'tree-memory',
          memoryMode: 'linked-struct',
          label: 'Dynamic Heap Memory: 3-Compartment Struct Blocks with Pointers & Memory Addresses',
          note: 'Pointers store actual 64-bit heap memory addresses (0x1040, 0x1080) linking independent memory blocks.'
        }
      },
      {
        title: { en: 'The NULL Pointer Theorem: Exactly N + 1 NULLs', bn: 'নাল পয়েন্টার উপপাদ্য: ঠিক N + 1 টি NULL' },
        explanation: {
          en: '### Famous NULL Pointer Theorem:\nIn any binary tree with **$N$ nodes**, there are exactly **$N + 1$ NULL pointers**!\n\n*Rigorous Mathematical Proof*:\n- Each node has 2 child pointers $\\implies$ Total pointer slots $= 2N$.\n- Every node except the root has exactly 1 incoming pointer from its parent $\\implies$ Assigned pointers $= N - 1$.\n- Remaining unassigned (NULL) pointers:\n$$\\text{NULL Pointers} = 2N - (N - 1) = \\mathbf{N + 1}$$\n\nNotice the 6 explicit red grounded terminals below: for $N = 5$, exactly $5 + 1 = 6$ NULL pointers exist!',
          bn: '### বিখ্যাত নাল পয়েন্টার উপপাদ্য:\nযেকোনো **$N$ টি নোড** বিশিষ্ট বাইনারি ট্রিতে ঠিক **$N + 1$ টি NULL পয়েন্টার** থাকে!\n\n*সহজ ও নির্ভুল গাণিতিক প্রমাণ*:\n- প্রতিটি নোডের ২টি চাইল্ড পয়েন্টার স্লট থাকে $\\implies$ মোট পয়েন্টার $= 2N$ টি।\n- রুট বাদে অন্য সব নোডে প্যারেন্ট থেকে ১টি পয়েন্টার এসে যুক্ত হয় $\\implies$ ব্যবহৃত পয়েন্টার $= N - 1$ টি।\n- অবশিষ্ট অব্যবহৃত (NULL) পয়েন্টারের সংখ্যা:\n$$\\text{NULL পয়েন্টার} = 2N - (N - 1) = \\mathbf{N + 1}$$\n\nনিচের ৬টি লাল গ্রাউন্ডেড টার্মিনাল লক্ষ্য করুন: $N = 5$ হলে ঠিক $5 + 1 = 6$ টি NULL পয়েন্টার বিদ্যমান!'
        },
        line: 13,
        iteration: { i: 4, of: 4, label: { en: 'NULL Proof', bn: 'নাল প্রমাণ' } },
        state: { N: 5, totalSlots: '2N = 10', assignedPointers: 'N - 1 = 4', nullPointers: 'N + 1 = 6', verified: true },
        scene: {
          kind: 'tree-memory',
          memoryMode: 'null-theorem',
          label: 'The NULL Pointer Theorem: N = 5 Nodes → Exactly N + 1 = 6 Grounded NULL Terminals (Numbered 1..6)',
          note: 'Count the 6 numbered crimson NULL terminals: 10 has 2, 35 has 2, 75 has 1, 90 has 1. Exactly N + 1 = 6.'
        }
      }
    ]
  }
];
