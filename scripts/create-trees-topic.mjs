import { writeFileSync } from 'node:fs';

function code5(lines) {
  return {
    pseudo: {
      en: lines.map(l => l.pseudo ?? l.en ?? ''),
      bn: lines.map(l => l.pseudoBn ?? l.bn ?? l.pseudo ?? '')
    },
    js: {
      en: lines.map(l => l.js ?? l.en ?? ''),
      bn: lines.map(l => l.jsBn ?? l.bn ?? l.js ?? '')
    },
    java: {
      en: lines.map(l => l.java ?? l.en ?? ''),
      bn: lines.map(l => l.javaBn ?? l.bn ?? l.java ?? '')
    },
    python: {
      en: lines.map(l => l.python ?? l.en ?? ''),
      bn: lines.map(l => l.pythonBn ?? l.bn ?? l.python ?? '')
    },
    cpp: {
      en: lines.map(l => l.cpp ?? l.en ?? ''),
      bn: lines.map(l => l.cppBn ?? l.bn ?? l.cpp ?? '')
    }
  };
}

const topics = [
  // -------------------------------------------------------------
  // TOPIC 1: Tree Fundamentals & Terminology
  // -------------------------------------------------------------
  {
    id: 'tree-fundamentals',
    name: { en: 'Tree Fundamentals & Terminology', bn: 'ট্রি ফাউন্ডেশন ও পরিভাষা' },
    description: {
      en: 'Hierarchical structure, root, parent, children, siblings, degree, leaves, height and depth',
      bn: 'হায়ারার্কিকাল গঠন, রুট, প্যারেন্ট, সন্তান, সিবলিং, ডিগ্রি, লিফ নোড, উচ্চতা ও গভীরতা'
    },
    categoryKey: 'trees',
    order: 1,
    icon: 'tree',
    complexity: {
      time: 'O(N)',
      space: 'O(h)',
      note: {
        en: 'A tree with N nodes always contains exactly N - 1 directed edges. Any direct pointer access is O(1).',
        bn: 'N সংখ্যক নোডের একটি ট্রিতে ঠিক N - 1 টি এজ থাকে। সরাসরি পয়েন্টার অ্যাক্সেস O(1)।'
      }
    },
    code: code5([
      {
        pseudo: '// Tree Node Structure and Invariants',
        pseudoBn: '// ট্রি নোড স্ট্রাকচার ও বৈশিষ্ট্য',
        js: '// JavaScript Tree Node Definition',
        jsBn: '// জাভাস্ক্রিপ্ট ট্রি নোড ডেফিনিশন',
        java: '// Java Tree Node Definition',
        javaBn: '// জাভা ট্রি নোড ডেফিনিশন',
        python: '# Python Tree Node Definition',
        pythonBn: '# পাইথন ট্রি নোড ডেফিনিশন',
        cpp: '// C++ Tree Node Definition',
        cppBn: '// সি++ ট্রি নোড ডেফিনিশন'
      },
      {
        pseudo: 'class TreeNode:',
        pseudoBn: 'class TreeNode:',
        js: 'class TreeNode {',
        jsBn: 'class TreeNode {',
        java: 'class TreeNode {',
        javaBn: 'class TreeNode {',
        python: 'class TreeNode:',
        pythonBn: 'class TreeNode:',
        cpp: 'struct TreeNode {',
        cppBn: 'struct TreeNode {'
      },
      {
        pseudo: '  val = 0',
        pseudoBn: '  val = 0',
        js: '  val = 0;',
        jsBn: '  val = 0;',
        java: '  int val = 0;',
        javaBn: '  int val = 0;',
        python: '  val = 0',
        pythonBn: '  val = 0',
        cpp: '  int val = 0;',
        cppBn: '  int val = 0;'
      },
      {
        pseudo: '  children = []',
        pseudoBn: '  children = []',
        js: '  children = [];',
        jsBn: '  children = [];',
        java: '  List<TreeNode> children = new ArrayList<>();',
        javaBn: '  List<TreeNode> children = new ArrayList<>();',
        python: '  children = []',
        pythonBn: '  children = []',
        cpp: '  vector<TreeNode*> children;',
        cppBn: '  vector<TreeNode*> children;'
      },
      {
        pseudo: '  constructor(val): this.val = val',
        pseudoBn: '  constructor(val): this.val = val',
        js: '  constructor(val) { this.val = val; }',
        jsBn: '  constructor(val) { this.val = val; }',
        java: '  TreeNode(int val) { this.val = val; }',
        javaBn: '  TreeNode(int val) { this.val = val; }',
        python: '  def __init__(self, val): self.val = val; self.children = []',
        pythonBn: '  def __init__(self, val): self.val = val; self.children = []',
        cpp: '  TreeNode(int v) : val(v) {}',
        cppBn: '  TreeNode(int v) : val(v) {}'
      },
      {
        pseudo: '',
        pseudoBn: '',
        js: '',
        jsBn: '',
        java: '',
        javaBn: '',
        python: '',
        pythonBn: '',
        cpp: '',
        cppBn: ''
      },
      {
        pseudo: 'function getDegree(node):',
        pseudoBn: 'function getDegree(node):',
        js: '  getDegree() {',
        jsBn: '  getDegree() {',
        java: '  int getDegree() {',
        javaBn: '  int getDegree() {',
        python: '  def get_degree(self):',
        pythonBn: '  def get_degree(self):',
        cpp: '  int getDegree() const {',
        cppBn: '  int getDegree() const {'
      },
      {
        pseudo: '  return node.children.length',
        pseudoBn: '  return node.children.length',
        js: '    return this.children.length; }',
        jsBn: '    return this.children.length; }',
        java: '    return children.size(); }',
        javaBn: '    return children.size(); }',
        python: '    return len(self.children)',
        pythonBn: '    return len(self.children)',
        cpp: '    return children.size(); }',
        cppBn: '    return children.size(); }'
      },
      {
        pseudo: 'function isLeaf(node):',
        pseudoBn: 'function isLeaf(node):',
        js: '  isLeaf() {',
        jsBn: '  isLeaf() {',
        java: '  boolean isLeaf() {',
        javaBn: '  boolean isLeaf() {',
        python: '  def is_leaf(self):',
        pythonBn: '  def is_leaf(self):',
        cpp: '  bool isLeaf() const {',
        cppBn: '  bool isLeaf() const {'
      },
      {
        pseudo: '  return node.children.length == 0',
        pseudoBn: '  return node.children.length == 0',
        js: '    return this.children.length === 0; }',
        jsBn: '    return this.children.length === 0; }',
        java: '    return children.isEmpty(); }',
        javaBn: '    return children.isEmpty(); }',
        python: '    return len(self.children) == 0',
        pythonBn: '    return len(self.children) == 0',
        cpp: '    return children.empty(); }',
        cppBn: '    return children.empty(); }'
      },
      {
        pseudo: '// Invariant: N nodes always have N - 1 edges',
        pseudoBn: '// নিয়ম: N নোডে ঠিক N - 1 টি এজ থাকে',
        js: '  // Invariant: N nodes always have N - 1 edges',
        jsBn: '  // নিয়ম: N নোডে ঠিক N - 1 টি এজ থাকে',
        java: '  // Invariant: N nodes always have N - 1 edges',
        javaBn: '  // নিয়ম: N নোডে ঠিক N - 1 টি এজ থাকে',
        python: '  # Invariant: N nodes always have N - 1 edges',
        pythonBn: '  # নিয়ম: N নোডে ঠিক N - 1 টি এজ থাকে',
        cpp: '  // Invariant: N nodes always have N - 1 edges',
        cppBn: '  // নিয়ম: N নোডে ঠিক N - 1 টি এজ থাকে'
      },
      {
        pseudo: 'edgeCount = nodeCount - 1',
        pseudoBn: 'edgeCount = nodeCount - 1',
        js: '}',
        jsBn: '}',
        java: '}',
        javaBn: '}',
        python: '  # edge_count = node_count - 1',
        pythonBn: '  # edge_count = node_count - 1',
        cpp: '};',
        cppBn: '};'
      }
    ]),
    steps: [
      {
        title: { en: 'What is a Tree Data Structure?', bn: 'ট্রি ডেটা স্ট্রাকচার কী?' },
        explanation: {
          en: 'A **Tree** is a hierarchical, non-linear collection of **nodes** connected by directed **edges** without any cycles.\n\n- **Fundamental Invariant**: Any connected tree with **$N$ nodes** always contains **exactly $N - 1$ edges**.\n- Every node except the root has **exactly one parent**.',
          bn: 'একটি **ট্রি (Tree)** হলো একটি নন-লিনিয়ার হায়ারার্কিকাল ডেটা স্ট্রাকচার যা **নোড** ও দিকনির্দেশক **এজ** দিয়ে গঠিত, যেখানে কোনো সাইকেল বা লুপ থাকে না।\n\n- **মৌলিক নিয়ম**: **$N$ সংখ্যক নোড** থাকলে ট্রিতে ঠিক **$N - 1$ টি এজ** থাকবে।\n- রুট বাদে প্রতিটি নোডের ঠিক **একটি প্যারেন্ট** থাকে।'
        },
        line: 0,
        iteration: { i: 1, of: 6, label: { en: 'Definition', bn: 'সংজ্ঞা' } },
        state: { nodes: 6, edges: 5, cycles: false, root: 'A' },
        scene: {
          kind: 'tree',
          label: 'General Binary Tree: N = 6 nodes, N - 1 = 5 edges',
          root: {
            v: 'A',
            sub: 'Root',
            l: { v: 'B', l: { v: 'D' }, r: { v: 'E' } },
            r: { v: 'C', l: { v: 'F' } }
          },
          pointers: [{ target: 'A', label: 'Root (A)', tone: 'yellow' }],
          highlights: { current: 'A', path: ['A', 'B', 'C'] },
          legend: [
            { label: 'Root Node', color: 'var(--yellow)' },
            { label: 'Branches (Edges)', color: 'var(--cyan)' }
          ],
          note: 'A tree grows from one top node (Root) downward with <b>zero cycles</b>.'
        }
      },
      {
        title: { en: 'Root, Parent, Child & Siblings', bn: 'রুট, প্যারেন্ট, চাইল্ড ও সিবলিং' },
        explanation: {
          en: '- **Root**: The topmost origin node with no incoming parent edge (`A`).\n- **Parent**: A node directly connected to lower nodes. `A` is parent of `B` and `C`.\n- **Child**: A descendant node directly below a parent. `B` and `C` are children of `A`.\n- **Siblings**: Nodes that share the **exact same parent**. `D` and `E` are siblings because both have parent `B`!',
          bn: '- **রুট (Root)**: সবার উপরের নোড যার কোনো প্যারেন্ট নেই (`A`)।\n- **প্যারেন্ট (Parent)**: যে নোড থেকে নিচের নোডে এজ যায়। `A` হলো `B` ও `C`-এর প্যারেন্ট।\n- **চাইল্ড (Child)**: প্যারেন্টের সরাসরি নিচের নোড। `B` ও `C` হলো `A`-এর সন্তান।\n- **সিবলিং (Siblings)**: যাদের **একই প্যারেন্ট** থাকে। `D` এবং `E` হলো সিবলিং কারণ তাদের পিতা `B`!'
        },
        line: 2,
        iteration: { i: 2, of: 6, label: { en: 'Relations', bn: 'সম্পর্ক' } },
        state: { parent: 'B', children: 'D, E', siblings: 'D & E' },
        scene: {
          kind: 'tree',
          label: 'Parent B and its Children D and E (Siblings)',
          root: {
            v: 'A',
            l: { v: 'B', l: { v: 'D' }, r: { v: 'E' } },
            r: { v: 'C', l: { v: 'F' } }
          },
          pointers: [{ target: 'B', label: 'Parent B', tone: 'yellow' }],
          highlights: { current: 'B', active: ['D', 'E'], path: ['A', 'B'] },
          legend: [
            { label: 'Parent Node B', color: 'var(--yellow)' },
            { label: 'Siblings (D, E)', color: 'var(--cyan)' }
          ],
          note: 'Nodes D and E are siblings because they share the exact same parent B.'
        }
      },
      {
        title: { en: 'Ancestors vs Descendants', bn: 'পূর্বপুরুষ (Ancestors) বনাম বংশধর (Descendants)' },
        explanation: {
          en: '- **Ancestors**: All nodes encountered along the direct path upward from a node to the root. For `D`, its ancestors are `B` and `A`.\n- **Descendants**: All nodes reachable by following directed edges downward from a node. Descendants of `B` are `D` and `E`.\n- **Subtree**: Any node and all of its descendants form a complete independent subtree.',
          bn: '- **পূর্বপুরুষ (Ancestors)**: কোনো নোড থেকে উপরের দিকে রুটে যাওয়ার পথের সব নোড। `D`-এর পূর্বপুরুষ হলো `B` ও `A`।\n- **বংশধর (Descendants)**: কোনো নোড থেকে নিচের দিকে যত নোডে যাওয়া যায়। `B`-এর বংশধর হলো `D` ও `E`।\n- **সাব-ট্রি (Subtree)**: একটি নোড এবং তার নিচের সমস্ত বংশধর মিলে একটি পূর্ণ সাব-ট্রি গঠন করে।'
        },
        line: 4,
        iteration: { i: 3, of: 6, label: { en: 'Paths', bn: 'পথ' } },
        state: { target: 'D', ancestors: '[B, A]', descendantsOfB: '[D, E]' },
        scene: {
          kind: 'tree',
          label: 'Tracing Path of Ancestors from Leaf D up to Root A: [D → B → A]',
          root: {
            v: 'A',
            l: { v: 'B', l: { v: 'D' }, r: { v: 'E' } },
            r: { v: 'C', l: { v: 'F' } }
          },
          pointers: [{ target: 'D', label: 'target D', tone: 'yellow' }],
          highlights: { current: 'D', path: ['A', 'B', 'D'], dim: ['C', 'F'] },
          legend: [
            { label: 'Target Node D', color: 'var(--yellow)' },
            { label: 'Ancestors Path (B, A)', color: 'var(--green)' }
          ],
          note: 'The green path traces ancestors from node D straight back to root A.'
        }
      },
      {
        title: { en: 'Degree of Node & Leaf vs Internal Nodes', bn: 'নোডের ডিগ্রি ও লিফ বনাম ইন্টারনাল নোড' },
        explanation: {
          en: '- **Degree of a Node**: Number of direct children. `A` has degree 2, `C` has degree 1, `D` has degree 0.\n- **Leaf (External) Node**: Any node with **degree 0** (no children). `D, E, F` are leaves.\n- **Internal Node**: Any node with **degree > 0** (at least one child). `A, B, C` are internal nodes.',
          bn: '- **ডিগ্রি (Degree)**: একটি নোডের সরাসরি সন্তানের সংখ্যা। `A`-এর ডিগ্রি ২, `C`-এর ডিগ্রি ১, `D`-এর ডিগ্রি ০।\n- **লিফ / এক্সটারনাল নোড (Leaf)**: যে নোডের কোনো সন্তান নেই (**ডিগ্রি ০**)। `D, E, F` হলো লিফ।\n- **ইন্টারনাল নোড (Internal)**: যে নোডের অন্তত একটি সন্তান আছে (**ডিগ্রি > ০**)। `A, B, C` হলো ইন্টারনাল নোড।'
        },
        line: 6,
        iteration: { i: 4, of: 6, label: { en: 'Degrees', bn: 'ডিগ্রি' } },
        state: { leaves: 'D, E, F (deg 0)', internal: 'A, B, C (deg > 0)' },
        scene: {
          kind: 'tree',
          label: 'Leaf Nodes (green degree 0) vs Internal Nodes (cyan degree > 0)',
          root: {
            v: 'A',
            sub: 'deg: 2',
            l: { v: 'B', sub: 'deg: 2', l: { v: 'D', sub: 'leaf' }, r: { v: 'E', sub: 'leaf' } },
            r: { v: 'C', sub: 'deg: 1', l: { v: 'F', sub: 'leaf' } }
          },
          highlights: { visited: ['D', 'E', 'F'], active: ['A', 'B', 'C'] },
          legend: [
            { label: 'Internal Nodes (deg > 0)', color: 'var(--cyan)' },
            { label: 'Leaf Nodes (deg = 0)', color: 'var(--green)' }
          ],
          note: 'Leaves terminate branch paths; internal nodes continue branching downward.'
        }
      },
      {
        title: { en: 'Levels, Depth, and Tree Height', bn: 'লেভেল, ডেপথ ও ট্রির হাইট' },
        explanation: {
          en: '- **Level**: Measured top-down starting from root. Root `A` is Level 1; `B, C` at Level 2; `D, E, F` at Level 3.\n- **Depth of a Node**: Number of edges on the path from root to the node. Depth of Root = 0; Depth of `D` = 2.\n- **Height of a Node**: Longest downward path from node to a leaf.\n- **Height of Tree**: Height of root node ($h = 2$).',
          bn: '- **লেভেল (Level)**: উপর থেকে নিচে গোনা হয়। রুট `A` হলো লেভেল ১; `B, C` লেভেল ২; `D, E, F` লেভেল ৩।\n- **ডেপথ (Depth)**: রুট থেকে ওই নোড পর্যন্ত এজের সংখ্যা। রুটের ডেপথ = ০; `D`-এর ডেপথ = ২।\n- **হাইট (Height)**: নোড থেকে সবচেয়ে দূরের লিফ পর্যন্ত এজের সংখ্যা।\n- **ট্রির হাইট**: রুট নোডের উচ্চতা ($h = 2$)।'
        },
        line: 8,
        iteration: { i: 5, of: 6, label: { en: 'Metrics', bn: 'পরিমাপ' } },
        state: { treeHeight: 2, totalLevels: 3, maxDepth: 2 },
        scene: {
          kind: 'tree',
          label: 'Level 1: [A] · Level 2: [B, C] · Level 3: [D, E, F]',
          root: {
            v: 'A',
            sub: 'L1 · h=2',
            l: { v: 'B', sub: 'L2 · h=1', l: { v: 'D', sub: 'L3 · h=0' }, r: { v: 'E', sub: 'L3 · h=0' } },
            r: { v: 'C', sub: 'L2 · h=1', l: { v: 'F', sub: 'L3 · h=0' } }
          },
          pointers: [{ target: 'A', label: 'h = 2', tone: 'yellow' }],
          highlights: { current: 'A', active: ['B', 'C'], visited: ['D', 'E', 'F'] },
          legend: [
            { label: 'Level 1 (Root, h=2)', color: 'var(--yellow)' },
            { label: 'Level 2 (h=1)', color: 'var(--cyan)' },
            { label: 'Level 3 Leaves (h=0)', color: 'var(--green)' }
          ],
          note: 'Height is measured bottom-up; Depth and Level are measured top-down.'
        }
      },
      {
        title: { en: 'Forest: Collection of Disjoint Trees', bn: 'ফরেস্ট: একাধিক বিচ্ছিন্ন ট্রির সংগ্রহ' },
        explanation: {
          en: 'A **Forest** is a set of zero or more disjoint trees.\n\n- **Golden Rule**: If you **delete the root node** of any tree, the remaining disjoint subtrees instantly form a **Forest**!\n- Conversely, connecting all trees of a forest under a single new root creates a unified tree.',
          bn: '**ফরেস্ট (Forest)** হলো একাধিক বিচ্ছিন্ন (disjoint) ট্রির সংগ্রহ।\n\n- **মূল নিয়ম**: যেকোনো ট্রির **রুট নোড কেটে ফেললে**, তার নিচের প্রতিটি সাব-ট্রি আলাদা হয়ে একটি **ফরেস্ট** গঠন করে!\n- আবার, একটি ফরেস্টের সব ট্রির উপরে একটি সাধারণ রুট নোড যুক্ত করলে একটি একক ট্রি গঠিত হয়।'
        },
        line: 11,
        iteration: { i: 6, of: 6, label: { en: 'Forest', bn: 'ফরেস্ট' } },
        state: { originalRoot: 'Deleted', remainingTrees: 2 },
        scene: {
          kind: 'forest',
          label: 'Removing Root A leaves a Forest of 2 Disjoint Subtrees: T1 (root B) & T2 (root C)',
          trees: [
            { root: { v: 'B', l: { v: 'D' }, r: { v: 'E' } }, caption: 'Subtree T1' },
            { root: { v: 'C', l: { v: 'F' } }, caption: 'Subtree T2' }
          ],
          highlights: { active: [0, 1] },
          legend: [
            { label: 'Tree 1 in Forest', color: 'var(--cyan)' },
            { label: 'Tree 2 in Forest', color: 'var(--green)' }
          ],
          note: 'A forest is simply multiple independent trees existing side-by-side.'
        }
      }
    ]
  }
];

console.log('Topic 1 ready');
