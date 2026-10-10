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
      en: 'The words for trees: root, parent, child, leaf, height',
      bn: 'ট্রির শব্দগুলো: রুট, প্যারেন্ট, চাইল্ড, লিফ, উচ্চতা'
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
          '    return this.children.length;',
          '  }',
          '  isLeaf() {',
          '    return this.children.length === 0;',
          '  }',
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
          '    return this.children.length;',
          '  }',
          '  isLeaf() {',
          '    return this.children.length === 0;',
          '  }',
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
          '    return children.size();',
          '  }',
          '  boolean isLeaf() {',
          '    return children.isEmpty();',
          '  }',
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
          '    return children.size();',
          '  }',
          '  boolean isLeaf() {',
          '    return children.isEmpty();',
          '  }',
          '  // N নোডে N - 1 এজ',
          '}'
        ]
      },
      python: {
        en: [
          '# Python Tree Node Definition',
          'class TreeNode:',
          '  # every node keeps its value and its own list of children',
          '',
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
          '  # প্রতিটা নোড নিজের মান আর নিজের চাইল্ডের তালিকা রাখে',
          '',
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
          '    return children.size();',
          '  }',
          '  bool isLeaf() const {',
          '    return children.empty();',
          '  }',
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
          '    return children.size();',
          '  }',
          '  bool isLeaf() const {',
          '    return children.empty();',
          '  }',
          '  // N নোডে N - 1 এজ',
          '};'
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'What is a tree?',
          bn: 'ট্রি কী?'
        },
        explanation: {
          en: 'Think of a **family tree** or the **folders on your computer**: one thing at the top, and everything else branches out below it.\n\nA **tree** stores data the same way. Each circle is a **node** (it holds one value) and each line is an **edge** (a link from a parent down to a child).\n\nTwo rules make something a tree:\n- every node except the top one has **exactly one parent**;\n- there are **no loops** — you can never walk down and come back to where you started.\n\n> **Quick fact:** a tree with **N nodes** always has **N − 1 edges** (every node except the top has one line coming down into it). This tree has 7 nodes and 6 edges.',
          bn: '**ফ্যামিলি ট্রি** বা **কম্পিউটারের ফোল্ডারগুলো** ভাবো: ওপরে একটা জিনিস, বাকি সব তার নিচে ডালপালার মতো ছড়ানো।\n\n**ট্রি (tree)** ডেটাকে ঠিক এভাবে রাখে। প্রতিটা বৃত্ত একটা **নোড (node)** — এতে একটা মান থাকে; আর প্রতিটা রেখা একটা **এজ (edge)** — প্যারেন্ট থেকে নিচে চাইল্ডের দিকে একটা সংযোগ।\n\nদুটো নিয়ম মানলে তবেই সেটা ট্রি:\n- ওপরেরটা ছাড়া প্রতিটা নোডের **ঠিক একজন প্যারেন্ট**;\n- কোনো **লুপ নেই** — নিচে নেমে কখনো শুরুর জায়গায় ফেরা যায় না।\n\n> **ছোট তথ্য:** **N টা নোডের** ট্রিতে সবসময় **N − 1 টা এজ** থাকে (ওপরেরটা ছাড়া প্রতিটা নোডে একটা করে রেখা নামে)। এই ট্রিতে ৭টা নোড, ৬টা এজ।'
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
        title: {
          en: 'Root, parent, child, siblings',
          bn: 'রুট, প্যারেন্ট, চাইল্ড, সিবলিং'
        },
        explanation: {
          en: 'These words come straight from a family:\n\n- **Root** — the node at the very top, with no parent. Here it is `A`. A tree has only one root.\n- **Parent** — a node directly above another. `A` is the parent of `B` and `C`.\n- **Child** — a node directly below another. `B` and `C` are children of `A`.\n- **Siblings** — children of the same parent, like brothers and sisters. `D` and `E` are siblings (both children of `B`).\n\n> **Tip:** "parent" and "child" always mean **one step** up or down — `A` is not the parent of `D`.',
          bn: 'এই শব্দগুলো সরাসরি পরিবার থেকে এসেছে:\n\n- **রুট (root)** — একদম ওপরের নোড, যার কোনো প্যারেন্ট নেই। এখানে `A`। একটা ট্রিতে রুট একটাই।\n- **প্যারেন্ট (parent)** — অন্য একটা নোডের ঠিক ওপরের নোড। `A` হলো `B` আর `C`-এর প্যারেন্ট।\n- **চাইল্ড (child)** — অন্য নোডের ঠিক নিচের নোড। `B` আর `C` হলো `A`-এর চাইল্ড।\n- **সিবলিং (siblings)** — একই প্যারেন্টের চাইল্ড, ভাইবোনের মতো। `D` আর `E` সিবলিং (দুজনেই `B`-এর চাইল্ড)।\n\n> **টিপ:** "প্যারেন্ট" আর "চাইল্ড" মানে সবসময় **এক ধাপ** ওপরে বা নিচে — `A` কিন্তু `D`-এর প্যারেন্ট নয়।'
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
        title: {
          en: 'Ancestors, descendants, subtree',
          bn: 'অ্যানসেস্টর, ডিসেন্ড্যান্ট, সাব-ট্রি'
        },
        explanation: {
          en: 'Now look further than one step:\n\n- **Ancestors** of a node — everyone on the way **up** to the root (parent, grandparent, …). For `D` that is `B` and `A`.\n- **Descendants** of a node — everyone you can reach going **down** (children, grandchildren, …). For `A` that is every other node.\n- **Subtree** — pick any node; that node **plus all its descendants** is a smaller tree of its own. `B` with `D` and `E` is the subtree of `B`.\n\n> **Why it matters:** most tree code works on subtrees — "solve the left subtree, solve the right subtree, combine". You will see this again and again.',
          bn: 'এবার এক ধাপের চেয়ে দূরে দেখো:\n\n- কোনো নোডের **অ্যানসেস্টর (ancestors)** — রুট পর্যন্ত **ওপরের** পথে সবাই (প্যারেন্ট, দাদা/নানা …)। `D`-এর জন্য `B` আর `A`।\n- কোনো নোডের **ডিসেন্ড্যান্ট (descendants)** — **নিচে** নেমে যাদের কাছে পৌঁছানো যায় (চাইল্ড, নাতি-নাতনি …)। `A`-এর জন্য বাকি সব নোড।\n- **সাব-ট্রি (subtree)** — যেকোনো একটা নোড নাও; সেই নোড **আর তার সব ডিসেন্ড্যান্ট** মিলে নিজেই একটা ছোট ট্রি। `D` আর `E` সহ `B` হলো `B`-এর সাব-ট্রি।\n\n> **কেন গুরুত্বপূর্ণ:** ট্রির বেশিরভাগ কোড সাব-ট্রি নিয়ে কাজ করে — "বাম সাব-ট্রি সমাধান করো, ডান সাব-ট্রি সমাধান করো, মিলিয়ে নাও"। এটা বারবার দেখবে।'
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
        title: {
          en: 'Degree, leaf and internal node',
          bn: 'ডিগ্রি, লিফ আর ইন্টারনাল নোড'
        },
        explanation: {
          en: '- **Degree of a node** = how many **children** it has. `A` has 2, `B` has 2, `D` has 0.\n- **Leaf** = a node with **no children** (degree 0) — the ends of the branches. Here: `D, E, F, G`.\n- **Internal node** = a node with **at least one child**. Here: `A, B, C`.\n- **Degree of the tree** = the biggest degree of any node. Here it is 2.\n\n> **Tip:** in graphs, "degree" counts all lines touching a vertex; in trees it usually counts only the children. Do not mix them up.',
          bn: '- **নোডের ডিগ্রি (degree)** = তার কয়টা **চাইল্ড** আছে। `A`-এর 2, `B`-এর 2, `D`-এর 0।\n- **লিফ (leaf)** = যে নোডের **কোনো চাইল্ড নেই** (ডিগ্রি 0) — ডালের শেষ মাথা। এখানে `D, E, F, G`।\n- **ইন্টারনাল নোড (internal)** = যার **অন্তত একটা চাইল্ড** আছে। এখানে `A, B, C`।\n- **ট্রির ডিগ্রি** = কোনো নোডের সবচেয়ে বড় ডিগ্রি। এখানে 2।\n\n> **টিপ:** গ্রাফে "ডিগ্রি" মানে একটা ভার্টেক্সকে ছোঁয়া সব রেখা; ট্রিতে সাধারণত শুধু চাইল্ড গোনা হয়। গুলিয়ে ফেলো না।'
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
        title: {
          en: 'Level, depth and height',
          bn: 'লেভেল, ডেপথ আর হাইট'
        },
        explanation: {
          en: 'Three ways to say "how high or low" something is:\n\n- **Level** — which "floor" a node is on. The root is on the first floor; `B, C` on the next; `D, E, F, G` on the last. (Some books start counting at 0, some at 1.)\n- **Depth of a node** — how many edges you walk **down from the root** to reach it. Root = 0, `B` = 1, `D` = 2.\n- **Height of a node** — how many edges on the **longest way down** from it to a leaf. Leaves have height 0.\n- **Height of the tree** — the height of the root. Here it is **2**.\n\n> **Memory trick:** depth is measured **from the top**, height is measured **from the bottom**.',
          bn: 'কোনো কিছু কতটা "ওপরে বা নিচে" — বলার তিনটা উপায়:\n\n- **লেভেল (level)** — নোডটা কোন "তলায়"। রুট প্রথম তলায়; `B, C` পরের তলায়; `D, E, F, G` শেষ তলায়। (কিছু বই 0 থেকে গোনে, কিছু 1 থেকে।)\n- **নোডের ডেপথ (depth)** — **রুট থেকে নিচে** নামতে কয়টা এজ লাগে। রুট = 0, `B` = 1, `D` = 2।\n- **নোডের হাইট (height)** — তার থেকে কোনো লিফ পর্যন্ত **সবচেয়ে লম্বা পথে** কয়টা এজ। লিফের হাইট 0।\n- **ট্রির হাইট** — রুটের হাইট। এখানে **2**।\n\n> **মনে রাখার কৌশল:** ডেপথ মাপা হয় **ওপর থেকে**, হাইট মাপা হয় **নিচ থেকে**।'
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
        title: {
          en: 'Forest: several trees together',
          bn: 'ফরেস্ট: কয়েকটা ট্রি একসাথে'
        },
        explanation: {
          en: 'A **forest** is simply a group of separate trees — like many trees standing in a real forest, not connected to each other.\n\nEasy way to make one: **remove the root** of a tree. Its children become the tops of their own trees, and together they form a forest.\n\nIt works the other way too: put one new node **above** all the trees of a forest, connect it to each top, and you get one big tree again.',
          bn: '**ফরেস্ট (forest)** মানে আলাদা আলাদা কয়েকটা ট্রির একটা দল — আসল বনের অনেক গাছের মতো, যেগুলো একে অপরের সঙ্গে যুক্ত নয়।\n\nবানানোর সহজ উপায়: একটা ট্রির **রুট সরিয়ে দাও**। তার চাইল্ডরা নিজ নিজ ট্রির মাথা হয়ে যায়, আর সবাই মিলে একটা ফরেস্ট।\n\nউল্টোটাও হয়: ফরেস্টের সব ট্রির **ওপরে** একটা নতুন নোড বসাও, প্রতিটা মাথার সঙ্গে জুড়ে দাও — আবার একটা বড় ট্রি পেয়ে যাবে।'
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
      en: 'Full, complete, perfect and skewed binary trees',
      bn: 'ফুল, কমপ্লিট, পারফেক্ট আর স্কিউড বাইনারি ট্রি'
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
          '}',
          '// Complete: sequential levels without gap',
          '// Perfect: 2^(h+1) - 1 nodes strictly'
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
          '}',
          '// কমপ্লিট: কোনো ফাঁক ছাড়া বাম থেকে ডানে পূর্ণ',
          '// পারফেক্ট: পুরোপুরি 2^(h+1) - 1 নোড'
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
          '}',
          '// Complete: array index i maps to 2i and 2i+1',
          '// Perfect: all leaves at same maximum height'
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
          '}',
          '// কমপ্লিট: অ্যারে ইনডেক্স i থেকে 2i ও 2i+1',
          '// পারফেক্ট: সব লিফ একই সর্বোচ্চ হাইটে'
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
          '  if (!node->left && !node->right) return true;',
          '  if (node->left && node->right) {',
          '    return isFullBinaryTree(node->left) && isFullBinaryTree(node->right);',
          '  }',
          '  return false; // Degree 1 found',
          '}',
          '// Complete: heap array representation valid',
          '// Perfect: all leaf heights equal'
        ],
        bn: [
          '// সি++ বাইনারি ট্রি টাইপ চেকার',
          'bool isFullBinaryTree(Node* node) {',
          '  if (!node) return true;',
          '  if (!node->left && !node->right) return true;',
          '  if (node->left && node->right) {',
          '    return isFullBinaryTree(node->left) && isFullBinaryTree(node->right);',
          '  }',
          '  return false; // ১ ডিগ্রি পাওয়া গেছে',
          '}',
          '// কমপ্লিট: হিপ অ্যারে মডেল শতভাগ প্রযোজ্য',
          '// পারফেক্ট: সব লিফের উচ্চতা সমান'
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'What is a binary tree?',
          bn: 'বাইনারি ট্রি কী?'
        },
        explanation: {
          en: 'A **binary tree** is a tree where every node has **at most two children** — a **left** child and a **right** child. ("Bi" means two.)\n\nSo a node can have 0, 1 or 2 children. And **left and right are different places**: a node with only a left child is a different tree from one with only a right child.\n\n> **Why it matters:** almost every famous tree — BST, AVL, heap — is a binary tree with an extra rule added on top.',
          bn: '**বাইনারি ট্রি (binary tree)** হলো এমন ট্রি যেখানে প্রতিটা নোডের **সর্বোচ্চ দুটো চাইল্ড** — একটা **বাম (left)** আর একটা **ডান (right)**। ("বাই" মানে দুই।)\n\nতাই একটা নোডের 0, 1 বা 2টা চাইল্ড থাকতে পারে। আর **বাম আর ডান আলাদা জায়গা**: শুধু বাম চাইল্ডওয়ালা নোড আর শুধু ডান চাইল্ডওয়ালা নোড দুটো আলাদা ট্রি।\n\n> **কেন গুরুত্বপূর্ণ:** প্রায় সব বিখ্যাত ট্রি — BST, AVL, হিপ — আসলে বাইনারি ট্রি, ওপরে একটা বাড়তি নিয়ম যোগ করা।'
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
        title: {
          en: 'Full (strict) binary tree',
          bn: 'ফুল (স্ট্রিক্ট) বাইনারি ট্রি'
        },
        explanation: {
          en: 'In a **full** binary tree (also called **strict** or **proper**), every node has **either 0 or 2 children** — never just one.\n\nLook at the picture: each node either has both a left and a right child, or it is a leaf.\n\n> **Easy check:** find any node with exactly **one** child. If there is one, the tree is **not** full.',
          bn: '**ফুল (full)** বাইনারি ট্রিতে (একে **স্ট্রিক্ট** বা **প্রপার**-ও বলে) প্রতিটা নোডের **হয় 0টা, নয় 2টা চাইল্ড** — কখনো শুধু একটা নয়।\n\nছবিটা দেখো: প্রতিটা নোডের হয় বাম আর ডান দুটোই আছে, নয়তো সেটা লিফ।\n\n> **সহজ যাচাই:** ঠিক **একটা** চাইল্ডওয়ালা কোনো নোড খোঁজো। পেলে ট্রিটা ফুল **নয়**।'
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
        title: {
          en: 'Complete binary tree',
          bn: 'কমপ্লিট বাইনারি ট্রি'
        },
        explanation: {
          en: 'A **complete** binary tree is filled **row by row, left to right**, like seats in a cinema:\n\n1. every row is completely full, except maybe the last one;\n2. the last row is filled **from the left with no gaps**.\n\n> **Why it matters:** because there are no gaps, a complete tree fits perfectly into a plain **array** — that is exactly how a **heap** is stored.',
          bn: '**কমপ্লিট (complete)** বাইনারি ট্রি ভরা হয় **সারি ধরে, বাম থেকে ডানে** — সিনেমা হলের সিটের মতো:\n\n১. শেষ সারি ছাড়া বাকি সব সারি পুরো ভরা;\n২. শেষ সারি **বাম থেকে, কোনো ফাঁক ছাড়া** ভরা।\n\n> **কেন গুরুত্বপূর্ণ:** কোনো ফাঁক নেই বলে কমপ্লিট ট্রি একটা সাধারণ **অ্যারেতে** নিখুঁতভাবে আঁটে — **হিপ** ঠিক এভাবেই রাখা হয়।'
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
        title: {
          en: 'Perfect binary tree',
          bn: 'পারফেক্ট বাইনারি ট্রি'
        },
        explanation: {
          en: 'A **perfect** binary tree is completely full: every internal node has **2 children** and **all leaves are on the same bottom row**. It looks like a perfect triangle.\n\nCount the nodes row by row: 1, then 2, then 4, then 8 … (each row doubles). A perfect tree of height **h** therefore has **2ʰ⁺¹ − 1** nodes.\n\nExample: height 2 → 1 + 2 + 4 = **7** nodes (and 2³ − 1 = 7 ✓).',
          bn: '**পারফেক্ট (perfect)** বাইনারি ট্রি পুরোপুরি ভরা: প্রতিটা ইন্টারনাল নোডের **2টা চাইল্ড**, আর **সব লিফ একই নিচের সারিতে**। দেখতে একদম নিখুঁত ত্রিভুজ।\n\nসারি ধরে নোড গোনো: 1, তারপর 2, তারপর 4, তারপর 8 … (প্রতি সারিতে দ্বিগুণ)। তাই **h** উচ্চতার পারফেক্ট ট্রিতে **2ʰ⁺¹ − 1**টা নোড।\n\nউদাহরণ: উচ্চতা 2 → 1 + 2 + 4 = **7**টা নোড (আর 2³ − 1 = 7 ✓)।'
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
        title: {
          en: 'Skewed tree: the bad case',
          bn: 'স্কিউড ট্রি: খারাপ অবস্থা'
        },
        explanation: {
          en: 'In a **skewed** tree every node has only **one child**, so the whole tree leans to one side — it is really just a **line** of nodes.\n\n- **Left-skewed**: every node has only a left child.\n- **Right-skewed**: every node has only a right child.\n\nWhy is this bad? A tree is fast because each step down skips a big part of it. A line skips nothing: with N nodes the height is **N − 1**, so searching can take **N** steps — as slow as a linked list.\n\n> **This is the problem** that self-balancing trees (AVL, Red-Black) were invented to solve.',
          bn: '**স্কিউড (skewed)** ট্রিতে প্রতিটা নোডের শুধু **একটা চাইল্ড**, তাই পুরো ট্রি এক দিকে হেলে থাকে — আসলে এটা নোডের একটা **লাইন** মাত্র।\n\n- **লেফট-স্কিউড**: প্রতিটা নোডের শুধু বাম চাইল্ড।\n- **রাইট-স্কিউড**: প্রতিটা নোডের শুধু ডান চাইল্ড।\n\nএটা খারাপ কেন? ট্রি দ্রুত কারণ প্রতিটা ধাপে নিচে নামলে একটা বড় অংশ বাদ যায়। লাইনে কিছুই বাদ যায় না: N টা নোডে উচ্চতা **N − 1**, তাই খুঁজতে **N** ধাপ লাগতে পারে — লিংকড লিস্টের মতোই ধীর।\n\n> **এই সমস্যাটা** সমাধান করতেই নিজে-ব্যালান্স-হওয়া ট্রি (AVL, Red-Black) আবিষ্কার হয়েছে।'
        },
        line: 10,
        iteration: { i: 5, of: 5, label: { en: 'Skewed Tree', bn: 'স্কিউড ট্রি' } },
        state: { height: 3, nodes: 4, complexity: 'O(N) search' },
        scene: {
          kind: 'tree',
          label: 'Right-Skewed Binary Tree: Height = N - 1 = 3 (just a line, like a linked list)',
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
      en: 'How many tree shapes exist, and how tall a tree can be',
      bn: 'কয়টা ট্রির আকার হয়, আর একটা ট্রি কত লম্বা হতে পারে'
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
        en: 'The Catalan number T(N) (see the formula in the steps) counts the different binary tree shapes with N nodes. If the nodes have labels, multiply by N!.',
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
          en: 'How many different **shapes** can a binary tree with **N nodes** have?\n\nThe answer is the **Catalan number**:\n$$T(N) = \\frac{(2N)!}{(N + 1)! \\cdot N!}$$\nExample with **N = 3**:\n$$T(3) = \\frac{6!}{4! \\cdot 3!} = \\frac{720}{24 \\cdot 6} = \\mathbf{5}$$\nFirst values: T(0) = 1, T(1) = 1, T(2) = 2, **T(3) = 5**, T(4) = 14, T(5) = 42.',
          bn: '**N টা নোড** দিয়ে একটা বাইনারি ট্রি কয়টা ভিন্ন **আকারের** হতে পারে?\n\nউত্তর দেয় **কাতালান সংখ্যা (Catalan number)**:\n$$T(N) = \\frac{(2N)!}{(N + 1)! \\cdot N!}$$\nউদাহরণ, **N = 3**:\n$$T(3) = \\frac{6!}{4! \\cdot 3!} = \\frac{720}{24 \\cdot 6} = \\mathbf{5}$$\nপ্রথম কয়েকটা মান: T(0) = 1, T(1) = 1, T(2) = 2, **T(3) = 5**, T(4) = 14, T(5) = 42।'
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
        title: {
          en: 'All 5 shapes with 3 nodes',
          bn: '৩ নোডের সব ৫টা আকার'
        },
        explanation: {
          en: 'The formula said **5** shapes for 3 nodes. Here they all are — try to draw a sixth one, you will not find it:\n\n1. a straight line going **left, left**;\n2. go **left**, then **right** (a zig-zag);\n3. the **balanced** one — root with a left and a right child;\n4. go **right**, then **left** (the other zig-zag);\n5. a straight line going **right, right**.\n\n> We only care about the **shape** here, not which value sits where.',
          bn: 'সূত্র বলেছিল ৩ নোডে **৫টা** আকার। এই হলো সবগুলো — ষষ্ঠটা আঁকার চেষ্টা করো, পাবে না:\n\n১. **বামে, বামে** যাওয়া একটা সোজা লাইন;\n২. **বামে**, তারপর **ডানে** (আঁকাবাঁকা);\n৩. **ব্যালান্সড**টা — রুটের একটা বাম আর একটা ডান চাইল্ড;\n৪. **ডানে**, তারপর **বামে** (অন্য আঁকাবাঁকা);\n৫. **ডানে, ডানে** যাওয়া একটা সোজা লাইন।\n\n> এখানে শুধু **আকার** গুরুত্বপূর্ণ, কোন মান কোথায় বসেছে তা নয়।'
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
        title: {
          en: 'Labeled trees and the tallest trees',
          bn: 'লেবেলড ট্রি আর সবচেয়ে লম্বা ট্রি'
        },
        explanation: {
          en: '**Labeled trees.** Now give the 3 nodes names, A, B, C. Each of the 5 shapes can be filled in **3! = 6** ways (ABC, ACB, BAC, …). So:\n\n$$\\text{labeled trees} = T(N) \\times N! = 5 \\times 6 = \\mathbf{30}$$\n\n**Tallest trees.** How many of the 5 shapes are as tall as possible (a straight or zig-zag line, height N − 1)? Every node except the last can send its child **left or right** — 2 choices, N − 1 times — so **2ᴺ⁻¹** shapes. For N = 3: 2² = **4** (shapes 1, 2, 4 and 5; only the balanced one is shorter).',
          bn: '**লেবেলড ট্রি।** এবার ৩টা নোডের নাম দাও A, B, C। ৫টা আকারের প্রতিটা **3! = 6** ভাবে ভরা যায় (ABC, ACB, BAC, …)। তাই:\n\n$$\\text{লেবেলড ট্রি} = T(N) \\times N! = 5 \\times 6 = \\mathbf{30}$$\n\n**সবচেয়ে লম্বা ট্রি।** ৫টা আকারের কয়টা যতটা সম্ভব লম্বা (সোজা বা আঁকাবাঁকা লাইন, উচ্চতা N − 1)? শেষটা ছাড়া প্রতিটা নোড চাইল্ডকে **বামে বা ডানে** পাঠাতে পারে — ২টা পছন্দ, N − 1 বার — তাই **2ᴺ⁻¹**টা আকার। N = 3 হলে 2² = **4**টা (আকার ১, ২, ৪ আর ৫; শুধু ব্যালান্সডটা খাটো)।'
        },
        line: 6,
        iteration: { i: 3, of: 5, label: { en: 'Permutations', bn: 'পারমিউটেশন' } },
        state: { N: 3, structuralShapes: 5, permutations: 6, totalLabeledTrees: 30, maxHeightTrees: 4 },
        scene: {
          kind: 'chart',
          label: { en: 'Counting binary trees with N = 3 nodes', bn: 'N = 3 নোডের বাইনারি ট্রি গোনা' },
          max: 30,
          items: [
            { label: { en: 'Shapes', bn: 'আকার' }, v: 5, color: 'var(--cyan)', note: 'T(3) = 5' },
            { label: { en: 'Orders of A, B, C', bn: 'A, B, C-র ক্রম' }, v: 6, color: 'var(--purple)', note: '3! = 6' },
            { label: { en: 'Labeled trees', bn: 'লেবেলসহ ট্রি' }, v: 30, color: 'var(--green)', note: '5 × 6 = 30' },
            { label: { en: 'Tallest trees', bn: 'সবচেয়ে উঁচু ট্রি' }, v: 4, color: 'var(--amber)', note: '2^(N−1) = 4' }
          ],
          caption: { en: 'labeled trees = shapes × N!', bn: 'লেবেলসহ ট্রি = আকার × N!' }
        }
      },
      {
        title: {
          en: 'Height ↔ number of nodes',
          bn: 'উচ্চতা ↔ নোডের সংখ্যা'
        },
        explanation: {
          en: 'If you know the **height h**, how many nodes can the tree have?\n\n- **Fewest:** a straight line → **h + 1** nodes.\n- **Most:** a perfect triangle → 1 + 2 + 4 + … + 2ʰ = **2ʰ⁺¹ − 1** nodes.\n\nTurn it around — if you have **N nodes**, how tall can the tree be?\n\n- **Tallest:** a straight line → height **N − 1**.\n- **Shortest:** as full as possible → height **⌊log₂ N⌋** (about how many times you can halve N).\n\n> **Why it matters:** search time follows the height. A good tree stays near **log₂ N**; a bad one drifts toward **N**.',
          bn: '**উচ্চতা h** জানলে ট্রিতে কয়টা নোড থাকতে পারে?\n\n- **সবচেয়ে কম:** একটা সোজা লাইন → **h + 1**টা নোড।\n- **সবচেয়ে বেশি:** একটা নিখুঁত ত্রিভুজ → 1 + 2 + 4 + … + 2ʰ = **2ʰ⁺¹ − 1**টা নোড।\n\nউল্টো করে — **N টা নোড** থাকলে ট্রি কত উঁচু হতে পারে?\n\n- **সবচেয়ে উঁচু:** সোজা লাইন → উচ্চতা **N − 1**।\n- **সবচেয়ে খাটো:** যতটা সম্ভব ভরা → উচ্চতা **⌊log₂ N⌋** (N-কে মোটামুটি কতবার অর্ধেক করা যায়)।\n\n> **কেন গুরুত্বপূর্ণ:** খোঁজার সময় উচ্চতার সঙ্গে চলে। ভালো ট্রি **log₂ N**-এর কাছে থাকে; খারাপটা **N**-এর দিকে চলে যায়।'
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
        title: {
          en: 'Leaves = two-child nodes + 1',
          bn: 'লিফ = দুই-চাইল্ডের নোড + 1'
        },
        explanation: {
          en: 'A surprising rule that works for **every** binary tree:\n\n$$\\textbf{number of leaves} = \\textbf{number of nodes with 2 children} + 1$$\n\nCheck it on any picture: a perfect tree of 7 nodes has 3 nodes with two children and 4 leaves — 4 = 3 + 1 ✓.\n\n> **Why (for the curious):** count edges two ways. There are N − 1 edges (one above every node but the root). Also, each 1-child node gives 1 edge and each 2-child node gives 2. Setting the two counts equal leaves exactly: leaves = two-child nodes + 1.',
          bn: 'একটা অবাক করা নিয়ম, যা **প্রতিটা** বাইনারি ট্রিতে খাটে:\n\n$$\\textbf{লিফের সংখ্যা} = \\textbf{২-চাইল্ডওয়ালা নোডের সংখ্যা} + 1$$\n\nযেকোনো ছবিতে মিলিয়ে দেখো: ৭ নোডের পারফেক্ট ট্রিতে ২-চাইল্ডওয়ালা নোড ৩টা আর লিফ ৪টা — 4 = 3 + 1 ✓।\n\n> **কেন (আগ্রহীদের জন্য):** এজ দুইভাবে গোনো। এজ আছে N − 1টা (রুট ছাড়া প্রতিটা নোডের ওপরে একটা)। আবার, প্রতিটা ১-চাইল্ডের নোড ১টা আর প্রতিটা ২-চাইল্ডের নোড ২টা এজ দেয়। দুটো গোনা সমান ধরলে ঠিক এটাই বাকি থাকে: লিফ = ২-চাইল্ডের নোড + 1।'
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
      en: 'Two ways to store a tree: an array, or linked nodes',
      bn: 'ট্রি রাখার দুটো উপায়: অ্যারে, বা লিংকড নোড'
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
          'nullPointers(n) = n + 1'
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
          'nullPointers(n) = n + 1'
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
          'const nullPointers = (n) => n + 1;'
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
          'const nullPointers = (n) => n + 1;'
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
          'int nullPointers(int n) { return n + 1; }'
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
          'int nullPointers(int n) { return n + 1; }'
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
          'def null_pointers(n): return n + 1'
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
          'def null_pointers(n): return n + 1'
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
          'int nullPointers(int n) { return n + 1; }'
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
          'int nullPointers(int n) { return n + 1; }'
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'Storing a tree in an array',
          bn: 'অ্যারেতে ট্রি রাখা'
        },
        explanation: {
          en: 'The simplest way to store a tree is a plain **array**: write the nodes **row by row, left to right**, starting at index **1**.\n\nThen you never need arrows — simple math finds the family of the node at index **i**:\n- **left child** at **2 × i**\n- **right child** at **2 × i + 1**\n- **parent** at **i ÷ 2** (round down)\n\nExample: root `A` is at 1, so its left child `B` is at 2 and its right child `C` is at 3. For `B` (index 2): children at 4 and 5.\n\n> **Try it:** click any node or array slot — the formulas update for that position.',
          bn: 'ট্রি রাখার সবচেয়ে সহজ উপায় একটা সাধারণ **অ্যারে**: নোডগুলো **সারি ধরে, বাম থেকে ডানে** লেখো, ইনডেক্স **1** থেকে শুরু করে।\n\nতখন কোনো তীর লাগে না — সহজ অঙ্কেই ইনডেক্স **i**-এর নোডের পরিবার পাওয়া যায়:\n- **বাম চাইল্ড** **2 × i**-এ\n- **ডান চাইল্ড** **2 × i + 1**-এ\n- **প্যারেন্ট** **i ÷ 2**-এ (নিচের দিকে রাউন্ড)\n\nউদাহরণ: রুট `A` আছে 1-এ, তাই বাম চাইল্ড `B` 2-এ আর ডান চাইল্ড `C` 3-এ। `B`-এর (ইনডেক্স 2) চাইল্ড 4 আর 5-এ।\n\n> **চেষ্টা করো:** যেকোনো নোড বা অ্যারের ঘরে ক্লিক করো — সেই জায়গার সূত্রগুলো দেখাবে।'
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
        title: {
          en: 'When the array wastes space',
          bn: 'কখন অ্যারে জায়গা নষ্ট করে'
        },
        explanation: {
          en: 'The array trick works beautifully when the tree is **complete** (no gaps): every cell is used.\n\nBut a **skewed** tree leaves huge holes. Each missing child still gets its own empty cell. A right-leaning line of just **5 nodes** (height 4) needs **31 cells** — 26 of them stay empty (about 84% wasted).\n\n> **Rule of thumb:** use an array for complete trees (like heaps); use linked nodes for everything else.',
          bn: 'ট্রি **কমপ্লিট** (কোনো ফাঁক নেই) হলে অ্যারের কৌশল দারুণ কাজ করে: প্রতিটা ঘর ব্যবহার হয়।\n\nকিন্তু **স্কিউড** ট্রি বিশাল ফাঁক রেখে যায়। প্রতিটা না-থাকা চাইল্ডের জন্যও একটা খালি ঘর লাগে। মাত্র **৫টা নোডের** ডানে-হেলানো লাইনের (উচ্চতা 4) জন্য **৩১টা ঘর** লাগে — তার ২৬টাই খালি (প্রায় ৮৪% অপচয়)।\n\n> **মোটা দাগের নিয়ম:** কমপ্লিট ট্রির (যেমন হিপ) জন্য অ্যারে; বাকি সবকিছুর জন্য লিংকড নোড।'
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
        title: {
          en: 'Storing a tree with linked nodes',
          bn: 'লিংকড নোড দিয়ে ট্রি রাখা'
        },
        explanation: {
          en: 'The usual way: every node is a small box in memory with **three parts**:\n\n1. `left` (or `lchild`) — the **address** of the left child, or `null` if there is none;\n2. `data` — the value itself;\n3. `right` (or `rchild`) — the address of the right child, or `null`.\n\nAn address is just "where in memory the other box lives". Following it is like following an arrow in the picture.\n\n> **Why it is popular:** boxes can live anywhere in memory and nothing is wasted on gaps — a skewed tree costs no more than a balanced one.',
          bn: 'সাধারণ উপায়: প্রতিটা নোড মেমরিতে একটা ছোট বক্স, যার **তিনটা অংশ**:\n\n১. `left` (বা `lchild`) — বাম চাইল্ডের **ঠিকানা**, না থাকলে `null`;\n২. `data` — মানটা নিজে;\n৩. `right` (বা `rchild`) — ডান চাইল্ডের ঠিকানা, বা `null`।\n\nঠিকানা মানে শুধু "অন্য বক্সটা মেমরির কোথায় আছে"। ঠিকানা ধরে যাওয়া মানে ছবির তীর ধরে যাওয়া।\n\n> **কেন জনপ্রিয়:** বক্সগুলো মেমরির যেকোনো জায়গায় থাকতে পারে আর ফাঁকে কিছু নষ্ট হয় না — স্কিউড ট্রিতেও ব্যালান্সডের চেয়ে বেশি খরচ নেই।'
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
        title: {
          en: 'N nodes always have N + 1 null links',
          bn: 'N নোডে সবসময় N + 1টা null লিংক'
        },
        explanation: {
          en: 'Every node has **2 child links** (left and right), so N nodes have **2N** links in total.\n\nHow many of them actually point at a node? Every node except the root has exactly one parent pointing at it → **N − 1** links are used.\n\nThe rest point to nothing (`null`):\n\n$$2N - (N - 1) = \\mathbf{N + 1}$$\n\nIn the picture: **5** nodes and exactly **6** red "null" ends. ✓\n\n> **Why it matters:** this is why a traversal makes exactly 2N + 1 calls — N calls on real nodes plus N + 1 calls that hit `null` and return.',
          bn: 'প্রতিটা নোডের **২টা চাইল্ড লিংক** (বাম আর ডান), তাই N টা নোডে মোট **2N**টা লিংক।\n\nএর কয়টা আসলে কোনো নোডকে নির্দেশ করে? রুট ছাড়া প্রতিটা নোডের দিকে ঠিক একজন প্যারেন্ট নির্দেশ করে → **N − 1**টা লিংক ব্যবহার হয়।\n\nবাকিগুলো কিছুই নির্দেশ করে না (`null`):\n\n$$2N - (N - 1) = \\mathbf{N + 1}$$\n\nছবিতে: **৫**টা নোড আর ঠিক **৬**টা লাল "null" মাথা। ✓\n\n> **কেন গুরুত্বপূর্ণ:** এই কারণেই একটা ট্রাভার্সাল ঠিক 2N + 1 বার কল করে — আসল নোডে N বার, আর `null`-এ পৌঁছে ফিরে আসা N + 1 বার।'
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
