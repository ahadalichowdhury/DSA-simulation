/**
 * AVL Trees, Rotations & Red-Black Tree Architecture
 * Covers: AVL Height-Balanced Property, Balance Factor BF ∈ {-1, 0, +1},
 * Strict 1.44 log2 N Height Proof, All 4 Rotations (LL, RR, LR, RL)
 * with Animated Morphing, Insertion & Deletion Rebalancing Cascades,
 * and 5 Red-Black Invariants & 2-3-4 Equivalence.
 * Grounded in: advanced-search-trees-avl-btree-guide.pdf
 */

export const avlTopics = [
  {
    id: 'avl-fundamentals',
    name: { en: 'AVL Balance Factor & Height Bound', bn: 'AVL ব্যালান্স ফ্যাক্টর ও উচ্চতার সীমা' },
    description: {
      en: 'A BST that never leans too much: the balance factor',
      bn: 'যে BST কখনো বেশি হেলে না: ব্যালান্স ফ্যাক্টর'
    },
    categoryKey: 'trees',
    subgroupKey: 'avl',
    level: 'intermediate',
    order: 10,
    icon: '⚖️',
    complexity: {
      time: 'O(log n) guaranteed',
      space: 'O(log n)',
      note: {
        en: 'AVL trees strictly enforce |BF| <= 1 on every node. Maximum height is mathematically bounded by 1.44 log2 N, guaranteeing logarithmic search time even on sorted inputs.',
        bn: 'AVL ট্রি প্রতিটি নোডে |BF| <= ১ বজায় রাখে। এর সর্বোচ্চ উচ্চতা ১.৪৪ log2 N দ্বারা সীমাবদ্ধ, যা সর্বদা O(log n) গতি নিশ্চিত করে।'
      }
    },
    code: {
      pseudo: {
        en: [
          "// AVL Tree Node & Balance Factor Calculation",
          "class AVLNode:",
          "  key = 0; height = 1",
          "  left = null; right = null",
          "",
          "function getHeight(n):",
          "  return n == null ? 0 : n.height",
          "",
          "function getBalanceFactor(n):",
          "  if n == null: return 0",
          "  return getHeight(n.left) - getHeight(n.right)",
          "",
          "function updateHeight(n):",
          "  n.height = 1 + max(getHeight(n.left), getHeight(n.right))"
        ],
        bn: [
          "// AVL ট্রি নোড ও ব্যালান্স ফ্যাক্টর নির্ণয়",
          "class AVLNode:",
          "  key = 0; height = 1",
          "  left = null; right = null",
          "",
          "function getHeight(n):",
          "  return n == null ? 0 : n.height",
          "",
          "function getBalanceFactor(n):",
          "  if n == null: return 0",
          "  return getHeight(n.left) - getHeight(n.right)",
          "",
          "function updateHeight(n):",
          "  n.height = 1 + max(getHeight(n.left), getHeight(n.right))"
        ]
      },
      js: {
        en: [
          "// JavaScript AVL Node & Balance Factor",
          "class AVLNode {",
          "  constructor(key) {",
          "    this.key = key; this.height = 1;",
          "    this.left = null; this.right = null;",
          "  }",
          "}",
          "function getHeight(n) { return n ? n.height : 0; }",
          "function getBalanceFactor(n) {",
          "  return n ? getHeight(n.left) - getHeight(n.right) : 0;",
          "}",
          "function updateHeight(n) {",
          "  n.height = 1 + Math.max(getHeight(n.left), getHeight(n.right));",
          "}"
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট AVL নোড ও ব্যালান্স ফ্যাক্টর",
          "class AVLNode {",
          "  constructor(key) {",
          "    this.key = key; this.height = 1;",
          "    this.left = null; this.right = null;",
          "  }",
          "}",
          "function getHeight(n) { return n ? n.height : 0; }",
          "function getBalanceFactor(n) {",
          "  return n ? getHeight(n.left) - getHeight(n.right) : 0;",
          "}",
          "function updateHeight(n) {",
          "  n.height = 1 + Math.max(getHeight(n.left), getHeight(n.right));",
          "}"
        ]
      },
      java: {
        en: [
          "// Java AVL Node & Balance Factor",
          "class AVLNode {",
          "  int key, height = 1;",
          "  AVLNode left, right;",
          "  AVLNode(int k) { this.key = k; }",
          "}",
          "int getHeight(AVLNode n) { return n == null ? 0 : n.height; }",
          "int getBalanceFactor(AVLNode n) {",
          "  return n == null ? 0 : getHeight(n.left) - getHeight(n.right);",
          "}",
          "void updateHeight(AVLNode n) {",
          "  n.height = 1 + Math.max(getHeight(n.left), getHeight(n.right));",
          "}",
          ""
        ],
        bn: [
          "// জাভা AVL নোড ও ব্যালান্স ফ্যাক্টর",
          "class AVLNode {",
          "  int key, height = 1;",
          "  AVLNode left, right;",
          "  AVLNode(int k) { this.key = k; }",
          "}",
          "int getHeight(AVLNode n) { return n == null ? 0 : n.height; }",
          "int getBalanceFactor(AVLNode n) {",
          "  return n == null ? 0 : getHeight(n.left) - getHeight(n.right);",
          "}",
          "void updateHeight(AVLNode n) {",
          "  n.height = 1 + Math.max(getHeight(n.left), getHeight(n.right));",
          "}",
          ""
        ]
      },
      python: {
        en: [
          "# Python AVL Node & Balance Factor",
          "class AVLNode:",
          "  def __init__(self, key):",
          "    self.key = key; self.height = 1",
          "    self.left = None; self.right = None",
          "",
          "def get_height(n):",
          "  return n.height if n else 0",
          "",
          "def get_balance_factor(n):",
          "  return get_height(n.left) - get_height(n.right) if n else 0",
          "",
          "def update_height(n):",
          "  n.height = 1 + max(get_height(n.left), get_height(n.right))"
        ],
        bn: [
          "# পাইথন AVL নোড ও ব্যালান্স ফ্যাক্টর",
          "class AVLNode:",
          "  def __init__(self, key):",
          "    self.key = key; self.height = 1",
          "    self.left = None; self.right = None",
          "",
          "def get_height(n):",
          "  return n.height if n else 0",
          "",
          "def get_balance_factor(n):",
          "  return get_height(n.left) - get_height(n.right) if n else 0",
          "",
          "def update_height(n):",
          "  n.height = 1 + max(get_height(n.left), get_height(n.right))"
        ]
      },
      cpp: {
        en: [
          "// C++ AVL Node & Balance Factor",
          "struct AVLNode {",
          "  int key, height;",
          "  AVLNode *left, *right;",
          "  AVLNode(int k) : key(k), height(1), left(nullptr), right(nullptr) {}",
          "};",
          "int getHeight(AVLNode* n) { return n ? n->height : 0; }",
          "int getBalanceFactor(AVLNode* n) {",
          "  return n ? getHeight(n->left) - getHeight(n->right) : 0;",
          "}",
          "void updateHeight(AVLNode* n) {",
          "  if (n) n->height = 1 + max(getHeight(n->left), getHeight(n->right));",
          "}",
          ""
        ],
        bn: [
          "// সি++ AVL নোড ও ব্যালান্স ফ্যাক্টর",
          "struct AVLNode {",
          "  int key, height;",
          "  AVLNode *left, *right;",
          "  AVLNode(int k) : key(k), height(1), left(nullptr), right(nullptr) {}",
          "};",
          "int getHeight(AVLNode* n) { return n ? n->height : 0; }",
          "int getBalanceFactor(AVLNode* n) {",
          "  return n ? getHeight(n->left) - getHeight(n->right) : 0;",
          "}",
          "void updateHeight(AVLNode* n) {",
          "  if (n) n->height = 1 + max(getHeight(n->left), getHeight(n->right));",
          "}",
          ""
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'What is an AVL tree?',
          bn: 'AVL ট্রি কী?'
        },
        explanation: {
          en: 'An **AVL tree** is a BST that **refuses to lean**. After every insert or delete it checks itself and fixes any side that has grown too tall. (Named after its inventors, Adelson-Velsky and Landis, 1962.)\n\nThe rule, at **every** node: the left side and the right side may differ in height by **at most 1**.\n\nThat difference is called the **balance factor**:\n\n**balance factor = height(left) − height(right)**\n\nIt must be **−1, 0 or +1**. If it ever becomes **+2 or −2**, the tree **rotates** to fix it.',
          bn: '**AVL ট্রি** হলো এমন BST যা **হেলে পড়তে দেয় না**। প্রতিটা ইনসার্ট বা ডিলিটের পর এটা নিজেকে যাচাই করে আর বেশি লম্বা হয়ে যাওয়া দিকটা ঠিক করে। (আবিষ্কারকদের নামে: অ্যাডেলসন-ভেলস্কি আর ল্যান্ডিস, ১৯৬২।)\n\nনিয়ম, **প্রতিটা** নোডে: বাম আর ডান দিকের উচ্চতার পার্থক্য **বড়জোর 1**।\n\nএই পার্থক্যকে বলে **ব্যালান্স ফ্যাক্টর (balance factor)**:\n\n**ব্যালান্স ফ্যাক্টর = height(left) − height(right)**\n\nএটা হতে হবে **−1, 0 বা +1**। কখনো **+2 বা −2** হলে ট্রি ঠিক করতে **রোটেট** করে।'
        },
        line: 0,
        iteration: { i: 1, of: 4, label: { en: 'AVL Invariant', bn: 'AVL শর্ত' } },
        state: { allowedBF: '{-1, 0, +1}', imbalancedBF: '>= +2 or <= -2' },
        scene: {
          kind: 'tree',
          label: 'Balanced AVL Tree: Every node shows its Balance Factor BF ∈ {-1, 0, +1}',
          root: {
            v: 50,
            sub: 'BF: 0',
            l: { v: 30, sub: 'BF: 0', l: { v: 20, sub: 'BF: 0' }, r: { v: 40, sub: 'BF: 0' } },
            r: { v: 70, sub: 'BF: -1', r: { v: 80, sub: 'BF: 0' } }
          },
          highlights: { current: 50, active: [30, 70], visited: [20, 40, 80] },
          legend: [
            { label: 'Root (BF: 0)', color: 'var(--yellow)' },
            { label: 'Left balanced (BF: 0)', color: 'var(--cyan)' },
            { label: 'Right lean (BF: -1)', color: 'var(--green)' }
          ],
          note: 'Notice every single node has BF of either -1, 0, or +1. Perfectly balanced!'
        }
      },
      {
        title: {
          en: 'Computing the balance factor',
          bn: 'ব্যালান্স ফ্যাক্টর হিসাব'
        },
        explanation: {
          en: 'For the root `50`:\n- the left side (rooted at `30`) has height **2**;\n- the right side (rooted at `70`) has height **2**;\n- balance factor = 2 − 2 = **0** → perfectly balanced.\n\nFor a leaf like `80`: both sides are empty (height 0), so its balance factor is 0 − 0 = **0**.\n\n> **Note:** this lesson counts the height of an empty side as **0** and of a single node as **1** — that is the usual way in AVL code.',
          bn: 'রুট `50`-এর জন্য:\n- বাম দিকের (`30`-এ শুরু) উচ্চতা **2**;\n- ডান দিকের (`70`-এ শুরু) উচ্চতা **2**;\n- ব্যালান্স ফ্যাক্টর = 2 − 2 = **0** → একদম ব্যালান্সড।\n\n`80`-এর মতো লিফের জন্য: দুই দিকই খালি (উচ্চতা 0), তাই ব্যালান্স ফ্যাক্টর 0 − 0 = **0**।\n\n> **নোট:** এই লেসনে খালি দিকের উচ্চতা **0** আর একটা নোডের উচ্চতা **1** ধরা হয় — AVL কোডে সাধারণত এভাবেই হয়।'
        },
        line: 8,
        iteration: { i: 2, of: 4, label: { en: 'Calculate BF', bn: 'BF হিসাব' } },
        state: { HL: 2, HR: 2, BF: 0, status: 'Balanced' },
        scene: {
          kind: 'tree',
          label: 'HL = 2 and HR = 2 → BF(50) = 2 - 2 = 0',
          root: {
            v: 50,
            sub: 'HL=2, HR=2 → BF=0',
            l: { v: 30, sub: 'HL=1, HR=1 → BF=0', l: { v: 20 }, r: { v: 40 } },
            r: { v: 70, sub: 'HL=1, HR=1 → BF=0', l: { v: 60 }, r: { v: 80 } }
          },
          highlights: { current: 50, active: [30, 70] },
          legend: [
            { label: 'Root being evaluated', color: 'var(--yellow)' },
            { label: 'Subtrees providing heights', color: 'var(--cyan)' }
          ],
          note: 'Height is updated bottom-up; balance factor is derived directly from child heights.'
        }
      },
      {
        title: {
          en: 'How tall can an AVL tree get?',
          bn: 'AVL ট্রি কত লম্বা হতে পারে?'
        },
        explanation: {
          en: 'Short answer: **never much taller than a perfect tree** — at most about **1.44 × log₂ N**.\n\nFor 1,000,000 values a perfect tree has height about 20, and an AVL tree at most about **29**. A plain BST could be **999,999** tall!\n\n> **For pros — where 1.44 comes from:** the thinnest AVL tree of height h has one side of height h − 1 and the other h − 2, so its node count grows like the Fibonacci numbers: N(h) = N(h − 1) + N(h − 2) + 1. Fibonacci numbers grow by a factor of about 1.618 per step, which gives h < 1.44 · log₂(N + 2).',
          bn: 'ছোট উত্তর: **পারফেক্ট ট্রির চেয়ে কখনো খুব বেশি লম্বা নয়** — বড়জোর প্রায় **1.44 × log₂ N**।\n\n১০,০০,০০০টা মানে পারফেক্ট ট্রির উচ্চতা প্রায় ২০, আর AVL ট্রির বড়জোর প্রায় **২৯**। সাধারণ BST হতে পারত **৯,৯৯,৯৯৯** লম্বা!\n\n> **অভিজ্ঞদের জন্য — 1.44 কোথা থেকে:** h উচ্চতার সবচেয়ে পাতলা AVL ট্রির এক দিকের উচ্চতা h − 1 আর অন্য দিকের h − 2, তাই নোডের সংখ্যা ফিবোনাচির মতো বাড়ে: N(h) = N(h − 1) + N(h − 2) + 1। ফিবোনাচি প্রতি ধাপে প্রায় 1.618 গুণ বাড়ে, তা থেকে আসে h < 1.44 · log₂(N + 2)।'
        },
        line: 12,
        iteration: { i: 3, of: 4, label: { en: 'Height Proof', bn: 'উচ্চতার প্রমাণ' } },
        state: { recurrence: 'N(h) = N(h-1) + N(h-2) + 1', goldenRatio: 1.618, maxBound: '1.44 log2 N' },
        scene: {
          kind: 'chart',
          label: 'Worst-Case Minimum Nodes for Height h (Fibonacci Tree Growth)',
          unit: ' nodes',
          max: 35,
          items: [
            { label: 'h = 0', v: 1, color: 'var(--text-muted)' },
            { label: 'h = 1', v: 2, color: 'var(--cyan)' },
            { label: 'h = 2', v: 4, color: 'var(--cyan)' },
            { label: 'h = 3', v: 7, color: 'var(--yellow)', note: 'N(3) = 4 + 2 + 1 = 7' },
            { label: 'h = 4', v: 12, color: 'var(--cyan)' },
            { label: 'h = 5', v: 20, color: 'var(--green)' },
            { label: 'h = 6', v: 33, color: 'var(--green)' }
          ],
          note: 'Because nodes grow exponentially by about 1.618× per level, height is strictly logarithmic.'
        }
      },
      {
        title: {
          en: 'When it breaks: four shapes',
          bn: 'কখন ভাঙে: চারটা আকার'
        },
        explanation: {
          en: 'After an insert, heights change on the way back up. If some node reaches balance factor **+2** (left too tall) or **−2** (right too tall), we name the problem by **where the new value went** below that node:\n\n- **LL** — went **L**eft, then **L**eft again (a straight line leaning left);\n- **RR** — went **R**ight, then **R**ight again;\n- **LR** — went **L**eft, then **R**ight (a zig-zag);\n- **RL** — went **R**ight, then **L**eft (the other zig-zag).\n\nStraight lines (LL, RR) need **one** rotation; zig-zags (LR, RL) need **two**. The next lesson shows each one.',
          bn: 'ইনসার্টের পর ফেরার পথে উচ্চতা বদলায়। কোনো নোডের ব্যালান্স ফ্যাক্টর **+2** (বাম বেশি লম্বা) বা **−2** (ডান বেশি লম্বা) হলে, সমস্যার নাম দিই সেই নোডের নিচে **নতুন মানটা কোথায় গেছে** তা দেখে:\n\n- **LL** — **বামে**, তারপর আবার **বামে** (বামে হেলানো সোজা লাইন);\n- **RR** — **ডানে**, তারপর আবার **ডানে**;\n- **LR** — **বামে**, তারপর **ডানে** (আঁকাবাঁকা);\n- **RL** — **ডানে**, তারপর **বামে** (অন্য আঁকাবাঁকা)।\n\nসোজা লাইনে (LL, RR) লাগে **একটা** রোটেশন; আঁকাবাঁকায় (LR, RL) লাগে **দুটো**। পরের লেসনে প্রতিটা দেখানো হয়েছে।'
        },
        line: 9,
        iteration: { i: 4, of: 4, label: { en: '4 Patterns', bn: '৪টি প্যাটার্ন' } },
        state: { LL: 'BF = +2, left child BF >= 0', RR: 'BF = -2, right child BF <= 0', LR: 'BF = +2, left child BF < 0', RL: 'BF = -2, right child BF > 0' },
        scene: {
          kind: 'forest',
          label: { en: 'The 4 imbalance patterns (red ring = the node with |BF| = 2)', bn: '৪টি ভারসাম্যহীনতার প্যাটার্ন (লাল = যে নোডের |BF| = 2)' },
          trees: [
            { root: { v: 30, sub: 'BF +2', l: { v: 20, l: { v: 10 } } }, caption: 'LL → 1 right rotation' },
            { root: { v: 10, sub: 'BF −2', r: { v: 20, r: { v: 30 } } }, caption: 'RR → 1 left rotation' },
            { root: { v: 30, sub: 'BF +2', l: { v: 10, r: { v: 20 } } }, caption: 'LR → left, then right' },
            { root: { v: 10, sub: 'BF −2', r: { v: 30, l: { v: 20 } } }, caption: 'RL → right, then left' }
          ],
          highlights: { reject: ['root'] },
          caption: { en: 'straight line → single rotation · zig-zag → double rotation', bn: 'সোজা লাইন → একবার রোটেশন · আঁকাবাঁকা → দুবার রোটেশন' }
        }
      }
    ]
  },

  {
    id: 'avl-rotations',
    name: { en: 'The 4 AVL Rotations (LL, RR, LR, RL)', bn: '৪টি AVL রোটেশন (LL, RR, LR, RL)' },
    description: {
      en: 'The 4 rotations that fix an unbalanced AVL tree',
      bn: 'অসমান AVL ট্রি ঠিক করার ৪টা রোটেশন'
    },
    categoryKey: 'trees',
    subgroupKey: 'avl',
    level: 'intermediate',
    order: 20,
    icon: '🔄',
    complexity: {
      time: 'O(1) per rotation',
      space: 'O(1) pointer updates',
      note: {
        en: 'A rotation performs exactly 3 pointer reassignments in constant O(1) time. The visual engine animates the nodes smoothly into their new balanced coordinates.',
        bn: 'প্রতিটি রোটেশন ঠিক ৩টি পয়েন্টার পরিবর্তনের মাধ্যমে ধ্রুবক O(1) সময়ে সম্পন্ন হয়। অ্যানিমেশনটি নোডগুলোকে মসৃণভাবে নতুন অবস্থানে ঘোরায়।'
      }
    },
    code: {
      pseudo: {
        en: [
          "// Single Right Rotation (Fixes LL Imbalance)",
          "function rightRotate(y):",
          "  x = y.left;  T2 = x.right",
          "  x.right = y; y.left = T2 // Pointer swaps",
          "  updateHeight(y); updateHeight(x)",
          "  return x // x is the new root!",
          "",
          "// Single Left Rotation (Fixes RR Imbalance)",
          "function leftRotate(x):",
          "  y = x.right; T2 = y.left",
          "  y.left = x;  x.right = T2 // Pointer swaps",
          "  updateHeight(x); updateHeight(y)",
          "  return y // y is the new root!",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        bn: [
          "// সিঙ্গেল রাইট রোটেশন (LL ইমব্যালান্স দূর করে)",
          "function rightRotate(y):",
          "  x = y.left;  T2 = x.right",
          "  x.right = y; y.left = T2 // পয়েন্টার সোয়াপ",
          "  updateHeight(y); updateHeight(x)",
          "  return x // x এখন নতুন রুট!",
          "",
          "// সিঙ্গেল লেফট রোটেশন (RR ইমব্যালান্স দূর করে)",
          "function leftRotate(x):",
          "  y = x.right; T2 = y.left",
          "  y.left = x;  x.right = T2 // পয়েন্টার সোয়াপ",
          "  updateHeight(x); updateHeight(y)",
          "  return y // y এখন নতুন রুট!",
          "",
          "",
          "",
          "",
          "",
          ""
        ]
      },
      js: {
        en: [
          "// JavaScript AVL Single Rotations",
          "function rightRotate(y) {",
          "  const x = y.left;",
          "  const T2 = x.right;",
          "  x.right = y;",
          "  y.left = T2;",
          "  updateHeight(y);",
          "  updateHeight(x);",
          "  return x;",
          "}",
          "function leftRotate(x) {",
          "  const y = x.right;",
          "  const T2 = y.left;",
          "  y.left = x;",
          "  x.right = T2;",
          "  updateHeight(x);",
          "  updateHeight(y);",
          "  return y;",
          "}"
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট AVL সিঙ্গেল রোটেশন",
          "function rightRotate(y) {",
          "  const x = y.left;",
          "  const T2 = x.right;",
          "  x.right = y;",
          "  y.left = T2;",
          "  updateHeight(y);",
          "  updateHeight(x);",
          "  return x;",
          "}",
          "function leftRotate(x) {",
          "  const y = x.right;",
          "  const T2 = y.left;",
          "  y.left = x;",
          "  x.right = T2;",
          "  updateHeight(x);",
          "  updateHeight(y);",
          "  return y;",
          "}"
        ]
      },
      java: {
        en: [
          "// Java AVL Single Rotations",
          "AVLNode rightRotate(AVLNode y) {",
          "  AVLNode x = y.left;",
          "  AVLNode T2 = x.right;",
          "  x.right = y;",
          "  y.left = T2;",
          "  updateHeight(y);",
          "  updateHeight(x);",
          "  return x;",
          "}",
          "AVLNode leftRotate(AVLNode x) {",
          "  AVLNode y = x.right;",
          "  AVLNode T2 = y.left;",
          "  y.left = x;",
          "  x.right = T2;",
          "  updateHeight(x);",
          "  updateHeight(y);",
          "  return y;",
          "}"
        ],
        bn: [
          "// জাভা AVL সিঙ্গেল রোটেশন",
          "AVLNode rightRotate(AVLNode y) {",
          "  AVLNode x = y.left;",
          "  AVLNode T2 = x.right;",
          "  x.right = y;",
          "  y.left = T2;",
          "  updateHeight(y);",
          "  updateHeight(x);",
          "  return x;",
          "}",
          "AVLNode leftRotate(AVLNode x) {",
          "  AVLNode y = x.right;",
          "  AVLNode T2 = y.left;",
          "  y.left = x;",
          "  x.right = T2;",
          "  updateHeight(x);",
          "  updateHeight(y);",
          "  return y;",
          "}"
        ]
      },
      python: {
        en: [
          "# Python AVL Single Rotations",
          "def right_rotate(y):",
          "  x = y.left",
          "  T2 = x.right",
          "  x.right = y",
          "  y.left = T2",
          "  update_height(y)",
          "  update_height(x)",
          "  return x",
          "",
          "def left_rotate(x):",
          "  y = x.right",
          "  T2 = y.left",
          "  y.left = x",
          "  x.right = T2",
          "  update_height(x)",
          "  update_height(y)",
          "  return y",
          ""
        ],
        bn: [
          "# পাইথন AVL সিঙ্গেল রোটেশন",
          "def right_rotate(y):",
          "  x = y.left",
          "  T2 = x.right",
          "  x.right = y",
          "  y.left = T2",
          "  update_height(y)",
          "  update_height(x)",
          "  return x",
          "",
          "def left_rotate(x):",
          "  y = x.right",
          "  T2 = y.left",
          "  y.left = x",
          "  x.right = T2",
          "  update_height(x)",
          "  update_height(y)",
          "  return y",
          ""
        ]
      },
      cpp: {
        en: [
          "// C++ AVL Single Rotations",
          "AVLNode* rightRotate(AVLNode* y) {",
          "  AVLNode* x = y->left;",
          "  AVLNode* T2 = x->right;",
          "  x->right = y;",
          "  y->left = T2;",
          "  updateHeight(y);",
          "  updateHeight(x);",
          "  return x;",
          "}",
          "AVLNode* leftRotate(AVLNode* x) {",
          "  AVLNode* y = x->right;",
          "  AVLNode* T2 = y->left;",
          "  y->left = x;",
          "  x->right = T2;",
          "  updateHeight(x);",
          "  updateHeight(y);",
          "  return y;",
          "}"
        ],
        bn: [
          "// সি++ AVL সিঙ্গেল রোটেশন",
          "AVLNode* rightRotate(AVLNode* y) {",
          "  AVLNode* x = y->left;",
          "  AVLNode* T2 = x->right;",
          "  x->right = y;",
          "  y->left = T2;",
          "  updateHeight(y);",
          "  updateHeight(x);",
          "  return x;",
          "}",
          "AVLNode* leftRotate(AVLNode* x) {",
          "  AVLNode* y = x->right;",
          "  AVLNode* T2 = y->left;",
          "  y->left = x;",
          "  x->right = T2;",
          "  updateHeight(x);",
          "  updateHeight(y);",
          "  return y;",
          "}"
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'LL: one right rotation',
          bn: 'LL: একটা ডান রোটেশন'
        },
        explanation: {
          en: 'Insert `30`, `20`, `10`. Everything goes left: `30` now has balance factor **+2** — a straight line leaning left (**LL**).\n\n**Right rotation** — imagine lifting the middle node by hand:\n- `20` (the middle one) moves **up** and becomes the new top;\n- `30` swings **down to the right** of `20`;\n- if `20` had a right child, it moves over to become `30`\'s left child (it is between 20 and 30, so the order stays correct).\n\nResult: `20` on top, `10` on its left, `30` on its right. The height dropped from 2 to 1.',
          bn: '`30`, `20`, `10` ইনসার্ট করো। সব বামে যায়: এখন `30`-এর ব্যালান্স ফ্যাক্টর **+2** — বামে হেলানো একটা সোজা লাইন (**LL**)।\n\n**ডান রোটেশন** — মাঝের নোডটা হাত দিয়ে তুলে ধরার কথা ভাবো:\n- `20` (মাঝেরটা) **ওপরে** ওঠে আর নতুন মাথা হয়;\n- `30` `20`-এর **ডানে নিচে** নেমে আসে;\n- `20`-এর ডান চাইল্ড থাকলে সেটা `30`-এর বাম চাইল্ড হয়ে যায় (সেটা 20 আর 30-এর মাঝে, তাই ক্রম ঠিক থাকে)।\n\nফল: ওপরে `20`, বামে `10`, ডানে `30`। উচ্চতা 2 থেকে কমে 1।'
        },
        line: 1,
        iteration: { i: 1, of: 4, label: { en: 'LL Rotation', bn: 'LL রোটেশন' } },
        state: { oldRoot: 30, newRoot: 20, rotation: 'Single Right', beforeBF: '+2', afterBF: '0' },
        scene: {
          kind: 'tree',
          label: 'LL Rotation: Node 20 pivots up, Node 30 rotates right and down',
          before: {
            v: 30,
            sub: 'BF: +2',
            l: { v: 20, sub: 'BF: +1', l: { v: 10, sub: 'BF: 0' } }
          },
          root: {
            v: 20,
            sub: 'BF: 0',
            l: { v: 10, sub: 'BF: 0' },
            r: { v: 30, sub: 'BF: 0' }
          },
          highlights: { current: 20, active: [10, 30] },
          legend: [
            { label: 'New Root (20)', color: 'var(--yellow)' },
            { label: 'Balanced Children (10, 30)', color: 'var(--cyan)' }
          ],
          note: 'Notice the smooth animation: node 20 rises while node 30 rotates into the right subtree.'
        }
      },
      {
        title: {
          en: 'RR: one left rotation',
          bn: 'RR: একটা বাম রোটেশন'
        },
        explanation: {
          en: 'The mirror case. Insert `10`, `20`, `30`: everything goes right, and `10` gets balance factor **−2** (**RR**).\n\n**Left rotation**:\n- the middle node `20` moves **up**;\n- `10` swings **down to the left** of `20`;\n- `30` stays as `20`\'s right child.\n\nResult: `20` on top with `10` and `30` — the same balanced shape as before.',
          bn: 'আয়নার উল্টো কেস। `10`, `20`, `30` ইনসার্ট করো: সব ডানে যায়, আর `10`-এর ব্যালান্স ফ্যাক্টর হয় **−2** (**RR**)।\n\n**বাম রোটেশন**:\n- মাঝের নোড `20` **ওপরে** ওঠে;\n- `10` `20`-এর **বামে নিচে** নেমে আসে;\n- `30` `20`-এর ডান চাইল্ডই থাকে।\n\nফল: ওপরে `20`, সঙ্গে `10` আর `30` — আগের মতোই ব্যালান্সড আকার।'
        },
        line: 9,
        iteration: { i: 2, of: 4, label: { en: 'RR Rotation', bn: 'RR রোটেশন' } },
        state: { oldRoot: 10, newRoot: 20, rotation: 'Single Left', beforeBF: '-2', afterBF: '0' },
        scene: {
          kind: 'tree',
          label: 'RR Rotation: Node 20 pivots up, Node 10 rotates left and down',
          before: {
            v: 10,
            sub: 'BF: -2',
            r: { v: 20, sub: 'BF: -1', r: { v: 30, sub: 'BF: 0' } }
          },
          root: {
            v: 20,
            sub: 'BF: 0',
            l: { v: 10, sub: 'BF: 0' },
            r: { v: 30, sub: 'BF: 0' }
          },
          highlights: { current: 20, active: [10, 30] },
          legend: [
            { label: 'New Root (20)', color: 'var(--yellow)' },
            { label: 'Balanced Children', color: 'var(--cyan)' }
          ],
          note: 'Left rotation mirrors right rotation, balancing a right-heavy subtree in O(1) time.'
        }
      },
      {
        title: {
          en: 'LR: a zig-zag needs two rotations',
          bn: 'LR: আঁকাবাঁকায় দুটো রোটেশন'
        },
        explanation: {
          en: 'Insert `30`, `10`, `20`. `30` is +2 (left too tall), but the path bends: left to `10`, then **right** to `20`. One rotation would just bend it the other way.\n\nSo do it in two moves:\n1. **Left-rotate at `10`** → `20` moves up above `10`. Now it is a straight line `30 → 20 → 10` (an LL case).\n2. **Right-rotate at `30`** → `20` goes to the top, with `10` and `30` below.\n\nIn code: `node.left = rotateLeft(node.left); return rotateRight(node);`',
          bn: '`30`, `10`, `20` ইনসার্ট করো। `30` হলো +2 (বাম বেশি লম্বা), কিন্তু পথ বেঁকে গেছে: বামে `10`, তারপর **ডানে** `20`। একটা রোটেশন শুধু উল্টো দিকে বাঁকিয়ে দেবে।\n\nতাই দুই চালে করো:\n১. **`10`-এ বাম রোটেট** → `20` `10`-এর ওপরে ওঠে। এখন এটা একটা সোজা লাইন `30 → 20 → 10` (LL কেস)।\n২. **`30`-এ ডান রোটেট** → `20` ওপরে যায়, নিচে `10` আর `30`।\n\nকোডে: `node.left = rotateLeft(node.left); return rotateRight(node);`'
        },
        line: 4,
        iteration: { i: 3, of: 4, label: { en: 'LR Double', bn: 'LR ডাবল' } },
        state: { pattern: 'Left-Right Zigzag', step1: 'leftRotate(left)', step2: 'rightRotate(root)', finalRoot: 20 },
        scene: {
          kind: 'tree',
          label: 'LR Double Rotation: First convert zig-zag to straight line, then rotate right',
          before: {
            v: 30,
            sub: 'BF: +2',
            l: { v: 10, sub: 'BF: -1', r: { v: 20, sub: 'BF: 0' } }
          },
          root: {
            v: 20,
            sub: 'BF: 0',
            l: { v: 10, sub: 'BF: 0' },
            r: { v: 30, sub: 'BF: 0' }
          },
          highlights: { current: 20, active: [10, 30] },
          legend: [
            { label: 'Deepest node 20 becomes Root', color: 'var(--yellow)' },
            { label: 'Balanced Leaves', color: 'var(--cyan)' }
          ],
          note: 'Double rotation straightens the zig-zag and restores height balance completely.'
        }
      },
      {
        title: {
          en: 'RL: the mirror zig-zag',
          bn: 'RL: আয়নার আঁকাবাঁকা'
        },
        explanation: {
          en: 'Insert `10`, `30`, `20`. `10` is −2 (right too tall) and the path bends right, then **left**.\n\n1. **Right-rotate at `30`** → straight line `10 → 20 → 30` (an RR case).\n2. **Left-rotate at `10`** → `20` on top, `10` and `30` below.\n\nIn code: `node.right = rotateRight(node.right); return rotateLeft(node);`\n\n> **Try it yourself** in the Tree Playground → "AVL insert", with the "Zig-zag" example.',
          bn: '`10`, `30`, `20` ইনসার্ট করো। `10` হলো −2 (ডান বেশি লম্বা) আর পথটা ডানে, তারপর **বামে** বেঁকেছে।\n\n১. **`30`-এ ডান রোটেট** → সোজা লাইন `10 → 20 → 30` (RR কেস)।\n২. **`10`-এ বাম রোটেট** → ওপরে `20`, নিচে `10` আর `30`।\n\nকোডে: `node.right = rotateRight(node.right); return rotateLeft(node);`\n\n> **নিজে চেষ্টা করো:** ট্রি প্লেগ্রাউন্ড → "AVL ইনসার্ট", "আঁকাবাঁকা" উদাহরণ দিয়ে।'
        },
        line: 12,
        iteration: { i: 4, of: 4, label: { en: 'RL Double', bn: 'RL ডাবল' } },
        state: { pattern: 'Right-Left Zigzag', step1: 'rightRotate(right)', step2: 'leftRotate(root)', finalRoot: 20 },
        scene: {
          kind: 'tree',
          label: 'RL Double Rotation: Right rotate on 30, then Left rotate on 10 → Root 20',
          before: {
            v: 10,
            sub: 'BF: -2',
            r: { v: 30, sub: 'BF: +1', l: { v: 20, sub: 'BF: 0' } }
          },
          root: {
            v: 20,
            sub: 'BF: 0',
            l: { v: 10, sub: 'BF: 0' },
            r: { v: 30, sub: 'BF: 0' }
          },
          highlights: { current: 20, active: [10, 30] },
          legend: [
            { label: 'Promoted Root 20', color: 'var(--yellow)' },
            { label: 'Balanced Leaves', color: 'var(--green)' }
          ],
          note: 'RL rotation mirrors LR, transforming right-left zig-zag into a perfectly balanced tree.'
        }
      }
    ]
  },

  {
    id: 'avl-operations',
    name: { en: 'AVL Insertion & Deletion Mechanics', bn: 'AVL ইনসার্ট ও ডিলিট মেকানিক্স' },
    description: {
      en: 'Inserting and deleting in an AVL tree, step by step',
      bn: 'AVL ট্রিতে ইনসার্ট আর ডিলিট, ধাপে ধাপে'
    },
    categoryKey: 'trees',
    subgroupKey: 'avl',
    level: 'intermediate',
    order: 30,
    icon: '⚡',
    complexity: {
      time: 'O(log n)',
      space: 'O(log n) call stack',
      note: {
        en: 'AVL Insertion requires at most ONE rotation to restore balance across the entire tree. AVL Deletion may trigger up to O(log n) cascading rotations up to the root.',
        bn: 'ইনসার্ট করার পর পুরো ট্রির ভারসাম্য ফেরাতে সর্বোচ্চ একটি রোটেশনই যথেষ্ট। ডিলিটের ক্ষেত্রে রুট পর্যন্ত ক্যাসকেড রোটেশন লাগতে পারে।'
      }
    },
    code: {
      pseudo: {
        en: [
          "// Complete AVL Insertion with Auto-Rebalancing",
          "function insert(node, key):",
          "  if node == null: return new AVLNode(key)",
          "  if key < node.key: node.left = insert(node.left, key)",
          "  else if key > node.key: node.right = insert(node.right, key)",
          "  else: return node // No duplicates",
          "  updateHeight(node)",
          "  bf = getBalanceFactor(node)",
          "  if bf > 1 and key < node.left.key: return rightRotate(node) // LL",
          "  if bf < -1 and key > node.right.key: return leftRotate(node) // RR",
          "  if bf > 1 and key > node.left.key:",
          "    node.left = leftRotate(node.left); return rightRotate(node) // LR",
          "  if bf < -1 and key < node.right.key:",
          "    node.right = rightRotate(node.right); return leftRotate(node) // RL",
          "  return node",
          "",
          "",
          ""
        ],
        bn: [
          "// অটো-রিব্যালান্সিং সহ পূর্ণাঙ্গ AVL ইনসার্ট",
          "function insert(node, key):",
          "  if node == null: return new AVLNode(key)",
          "  if key < node.key: node.left = insert(node.left, key)",
          "  else if key > node.key: node.right = insert(node.right, key)",
          "  else: return node // ডুপ্লিকেট মান নিষিদ্ধ",
          "  updateHeight(node)",
          "  bf = getBalanceFactor(node)",
          "  if bf > 1 and key < node.left.key: return rightRotate(node) // LL",
          "  if bf < -1 and key > node.right.key: return leftRotate(node) // RR",
          "  if bf > 1 and key > node.left.key:",
          "    node.left = leftRotate(node.left); return rightRotate(node) // LR",
          "  if bf < -1 and key < node.right.key:",
          "    node.right = rightRotate(node.right); return leftRotate(node) // RL",
          "  return node",
          "",
          "",
          ""
        ]
      },
      js: {
        en: [
          "// JavaScript Full AVL Insertion",
          "function insert(node, key) {",
          "  if (!node) return new AVLNode(key);",
          "  if (key < node.key) node.left = insert(node.left, key);",
          "  else if (key > node.key) node.right = insert(node.right, key);",
          "  else return node;",
          "  updateHeight(node);",
          "  const bf = getBalanceFactor(node);",
          "  if (bf > 1 && key < node.left.key) return rightRotate(node);",
          "  if (bf < -1 && key > node.right.key) return leftRotate(node);",
          "  if (bf > 1 && key > node.left.key) {",
          "    node.left = leftRotate(node.left); return rightRotate(node);",
          "  }",
          "  if (bf < -1 && key < node.right.key) {",
          "    node.right = rightRotate(node.right); return leftRotate(node);",
          "  }",
          "  return node;",
          "}"
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট পূর্ণাঙ্গ AVL ইনসার্ট",
          "function insert(node, key) {",
          "  if (!node) return new AVLNode(key);",
          "  if (key < node.key) node.left = insert(node.left, key);",
          "  else if (key > node.key) node.right = insert(node.right, key);",
          "  else return node;",
          "  updateHeight(node);",
          "  const bf = getBalanceFactor(node);",
          "  if (bf > 1 && key < node.left.key) return rightRotate(node);",
          "  if (bf < -1 && key > node.right.key) return leftRotate(node);",
          "  if (bf > 1 && key > node.left.key) {",
          "    node.left = leftRotate(node.left); return rightRotate(node);",
          "  }",
          "  if (bf < -1 && key < node.right.key) {",
          "    node.right = rightRotate(node.right); return leftRotate(node);",
          "  }",
          "  return node;",
          "}"
        ]
      },
      java: {
        en: [
          "// Java Full AVL Insertion",
          "AVLNode insert(AVLNode node, int key) {",
          "  if (node == null) return new AVLNode(key);",
          "  if (key < node.key) node.left = insert(node.left, key);",
          "  else if (key > node.key) node.right = insert(node.right, key);",
          "  else return node;",
          "  updateHeight(node);",
          "  int bf = getBalanceFactor(node);",
          "  if (bf > 1 && key < node.left.key) return rightRotate(node);",
          "  if (bf < -1 && key > node.right.key) return leftRotate(node);",
          "  if (bf > 1 && key > node.left.key) {",
          "    node.left = leftRotate(node.left); return rightRotate(node);",
          "  }",
          "  if (bf < -1 && key < node.right.key) {",
          "    node.right = rightRotate(node.right); return leftRotate(node);",
          "  }",
          "  return node;",
          "}"
        ],
        bn: [
          "// জাভা পূর্ণাঙ্গ AVL ইনসার্ট",
          "AVLNode insert(AVLNode node, int key) {",
          "  if (node == null) return new AVLNode(key);",
          "  if (key < node.key) node.left = insert(node.left, key);",
          "  else if (key > node.key) node.right = insert(node.right, key);",
          "  else return node;",
          "  updateHeight(node);",
          "  int bf = getBalanceFactor(node);",
          "  if (bf > 1 && key < node.left.key) return rightRotate(node);",
          "  if (bf < -1 && key > node.right.key) return leftRotate(node);",
          "  if (bf > 1 && key > node.left.key) {",
          "    node.left = leftRotate(node.left); return rightRotate(node);",
          "  }",
          "  if (bf < -1 && key < node.right.key) {",
          "    node.right = rightRotate(node.right); return leftRotate(node);",
          "  }",
          "  return node;",
          "}"
        ]
      },
      python: {
        en: [
          "# Python Full AVL Insertion",
          "def insert(node, key):",
          "  if not node: return AVLNode(key)",
          "  if key < node.key: node.left = insert(node.left, key)",
          "  elif key > node.key: node.right = insert(node.right, key)",
          "  else: return node",
          "  update_height(node)",
          "  bf = get_balance_factor(node)",
          "  if bf > 1 and key < node.left.key: return right_rotate(node)",
          "  if bf < -1 and key > node.right.key: return left_rotate(node)",
          "  if bf > 1 and key > node.left.key:",
          "    node.left = left_rotate(node.left); return right_rotate(node)",
          "  if bf < -1 and key < node.right.key:",
          "    node.right = right_rotate(node.right); return left_rotate(node)",
          "  return node",
          "",
          "",
          ""
        ],
        bn: [
          "# পাইথন পূর্ণাঙ্গ AVL ইনসার্ট",
          "def insert(node, key):",
          "  if not node: return AVLNode(key)",
          "  if key < node.key: node.left = insert(node.left, key)",
          "  elif key > node.key: node.right = insert(node.right, key)",
          "  else: return node",
          "  update_height(node)",
          "  bf = get_balance_factor(node)",
          "  if bf > 1 and key < node.left.key: return right_rotate(node)",
          "  if bf < -1 and key > node.right.key: return left_rotate(node)",
          "  if bf > 1 and key > node.left.key:",
          "    node.left = left_rotate(node.left); return right_rotate(node)",
          "  if bf < -1 and key < node.right.key:",
          "    node.right = right_rotate(node.right); return left_rotate(node)",
          "  return node",
          "",
          "",
          ""
        ]
      },
      cpp: {
        en: [
          "// C++ Full AVL Insertion",
          "AVLNode* insert(AVLNode* node, int key) {",
          "  if (!node) return new AVLNode(key);",
          "  if (key < node->key) node->left = insert(node->left, key);",
          "  else if (key > node->key) node->right = insert(node->right, key);",
          "  else return node;",
          "  updateHeight(node);",
          "  int bf = getBalanceFactor(node);",
          "  if (bf > 1 && key < node->left->key) return rightRotate(node);",
          "  if (bf < -1 && key > node->right->key) return leftRotate(node);",
          "  if (bf > 1 && key > node->left->key) {",
          "    node->left = leftRotate(node->left); return rightRotate(node);",
          "  }",
          "  if (bf < -1 && key < node->right->key) {",
          "    node->right = rightRotate(node->right); return leftRotate(node);",
          "  }",
          "  return node;",
          "}"
        ],
        bn: [
          "// সি++ পূর্ণাঙ্গ AVL ইনসার্ট",
          "AVLNode* insert(AVLNode* node, int key) {",
          "  if (!node) return new AVLNode(key);",
          "  if (key < node->key) node->left = insert(node->left, key);",
          "  else if (key > node->key) node->right = insert(node->right, key);",
          "  else return node;",
          "  updateHeight(node);",
          "  int bf = getBalanceFactor(node);",
          "  if (bf > 1 && key < node->left->key) return rightRotate(node);",
          "  if (bf < -1 && key > node->right->key) return leftRotate(node);",
          "  if (bf > 1 && key > node->left->key) {",
          "    node->left = leftRotate(node->left); return rightRotate(node);",
          "  }",
          "  if (bf < -1 && key < node->right->key) {",
          "    node->right = rightRotate(node->right); return leftRotate(node);",
          "  }",
          "  return node;",
          "}"
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'Step 1: insert like a normal BST',
          bn: 'ধাপ ১: সাধারণ BST-র মতো ইনসার্ট'
        },
        explanation: {
          en: 'An AVL insert starts exactly like a BST insert: walk down and put the new value in the empty spot.\n\nInsert **25** into the tree with root `30`:\n- 25 < 30 → go left to `20`;\n- 25 > 20 → `25` becomes the right child of `20`.',
          bn: 'AVL ইনসার্ট ঠিক BST ইনসার্টের মতো শুরু হয়: নিচে নামো আর খালি জায়গায় নতুন মান বসাও।\n\nরুট `30`-ওয়ালা ট্রিতে **25** ইনসার্ট করো:\n- 25 < 30 → বামে `20`-এ;\n- 25 > 20 → `25` হয় `20`-এর ডান চাইল্ড।'
        },
        line: 2,
        iteration: { i: 1, of: 4, label: { en: 'Insert 25', bn: 'ইনসার্ট ২৫' } },
        state: { key: 25, parent: 20, position: 'right child' },
        scene: {
          kind: 'tree',
          label: 'Inserting Key 25 as right child of Node 20',
          root: {
            v: 30,
            sub: 'BF: ?',
            l: { v: 20, sub: 'BF: ?', l: { v: 10 }, r: { v: 25, sub: 'new leaf' } },
            r: { v: 40 }
          },
          highlights: { insert: 25, current: 20 },
          legend: [
            { label: 'Parent 20', color: 'var(--yellow)' },
            { label: 'Newly Inserted Key (25)', color: 'var(--green)' }
          ],
          note: 'Key 25 is dynamically allocated and linked into the tree.'
        }
      },
      {
        title: {
          en: 'Step 2: walk back up and check',
          bn: 'ধাপ ২: ফেরার পথে যাচাই'
        },
        explanation: {
          en: 'Now go back **up** the path you came down (the recursion returns), and at each node update its height and check its balance factor:\n\n1. `25`: a new leaf → height 1.\n2. `20`: height = 1 + max(1, 1) = 2; balance factor = 1 − 1 = **0** ✓.\n3. `30`: height = 1 + max(2, 1) = 3; balance factor = 2 − 1 = **+1** ✓.\n\nEvery balance factor is −1, 0 or +1, so **no rotation** is needed. Done.',
          bn: 'এবার যে পথে নেমেছিলে সেই পথে **ওপরে** ফেরো (রিকার্শন ফেরত আসে), আর প্রতিটা নোডে উচ্চতা আপডেট করে ব্যালান্স ফ্যাক্টর দেখো:\n\n১. `25`: নতুন লিফ → উচ্চতা 1।\n২. `20`: উচ্চতা = 1 + max(1, 1) = 2; ব্যালান্স ফ্যাক্টর = 1 − 1 = **0** ✓।\n৩. `30`: উচ্চতা = 1 + max(2, 1) = 3; ব্যালান্স ফ্যাক্টর = 2 − 1 = **+1** ✓।\n\nপ্রতিটা ব্যালান্স ফ্যাক্টর −1, 0 বা +1, তাই **কোনো রোটেশন** লাগে না। শেষ।'
        },
        line: 6,
        iteration: { i: 2, of: 4, label: { en: 'Update Heights', bn: 'উচ্চতা আপডেট' } },
        state: { node25_h: 1, node20_h: 2, node20_bf: 0, node30_h: 3, node30_bf: 1 },
        scene: {
          kind: 'tree',
          label: 'Heights updated bottom-up: Node 20 has BF=0, Root 30 has BF=+1',
          root: {
            v: 30,
            sub: 'h=3 · BF=+1',
            l: { v: 20, sub: 'h=2 · BF=0', l: { v: 10, sub: 'h=1 · BF=0' }, r: { v: 25, sub: 'h=1 · BF=0' } },
            r: { v: 40, sub: 'h=1 · BF=0' }
          },
          highlights: { current: 30, active: [20, 25] },
          legend: [
            { label: 'Root (BF: +1)', color: 'var(--yellow)' },
            { label: 'Balanced Subtree (BF: 0)', color: 'var(--green)' }
          ],
          note: 'All ancestors are within {-1, 0, +1}. Tree remains valid.'
        }
      },
      {
        title: {
          en: 'Step 3: an imbalance → rotate',
          bn: 'ধাপ ৩: অসমান → রোটেট'
        },
        explanation: {
          en: 'Now insert **5**. It goes left of `10`, under `20`.\n\nWalking back up, `20` gets balance factor **+2**, and 5 went left, then left again → **LL** case → `rotateRight(20)`.\n\nGood news: for an **insert**, one fix (one single or one double rotation) at the **lowest** unbalanced node is always enough. After it, that part of the tree is exactly as tall as before, so nothing higher can be unbalanced.',
          bn: 'এবার **5** ইনসার্ট করো। এটা `20`-এর নিচে `10`-এর বামে যায়।\n\nফেরার পথে `20`-এর ব্যালান্স ফ্যাক্টর হয় **+2**, আর 5 গেছে বামে, তারপর আবার বামে → **LL** কেস → `rotateRight(20)`।\n\nসুখবর: **ইনসার্টে** **সবচেয়ে নিচের** অসমান নোডে একবার ঠিক করাই (একটা সিঙ্গেল বা একটা ডাবল রোটেশন) সবসময় যথেষ্ট। এরপর ট্রির ওই অংশ আগের মতোই লম্বা, তাই ওপরের কিছু অসমান হতে পারে না।'
        },
        line: 8,
        iteration: { i: 3, of: 4, label: { en: 'Rebalance', bn: 'রিব্যালান্স' } },
        state: { imbalancedNode: 20, bf: 2, case: 'LL', action: 'rightRotate(20)' },
        scene: {
          kind: 'tree',
          label: 'Imbalance detected at 20 (BF = +2) → Repaired by rightRotate(20)',
          before: {
            v: 30,
            l: { v: 20, sub: 'BF: +2', l: { v: 10, sub: 'BF: +1', l: { v: 5 } }, r: { v: 25 } },
            r: { v: 40 }
          },
          root: {
            v: 30,
            l: { v: 10, sub: 'BF: 0', l: { v: 5 }, r: { v: 20, l: { v: 25 } } },
            r: { v: 40 }
          },
          highlights: { current: 10, active: [5, 20] },
          legend: [
            { label: 'Rotated sub-root (10)', color: 'var(--yellow)' },
            { label: 'Rebalanced Subtree', color: 'var(--green)' }
          ],
          note: 'Node 10 pivots up. Balance restored in O(1) rotation time.'
        }
      },
      {
        title: {
          en: 'Deleting can need more rotations',
          bn: 'ডিলিটে বেশি রোটেশন লাগতে পারে'
        },
        explanation: {
          en: 'Delete is less lucky. Removing a node can make a side **shorter**. A rotation fixes that node, but it may make the whole part shorter again — and then the parent above can become unbalanced, and so on up to the root.\n\nSo a delete may need **several** rotations — at most one per level, so at most about **log N** of them.\n\nEven then, a delete stays fast: **O(log N)** in total.',
          bn: 'ডিলিটের ভাগ্য অত ভালো নয়। একটা নোড সরালে একটা দিক **খাটো** হয়ে যেতে পারে। রোটেশন সেই নোডটা ঠিক করে, কিন্তু পুরো অংশটা আবার খাটো করে দিতে পারে — তখন ওপরের প্যারেন্ট অসমান হতে পারে, এভাবে রুট পর্যন্ত।\n\nতাই একটা ডিলিটে **কয়েকটা** রোটেশন লাগতে পারে — প্রতি লেভেলে বড়জোর একটা, মানে বড়জোর প্রায় **log N**টা।\n\nতবুও ডিলিট দ্রুতই থাকে: মোট **O(log N)**।'
        },
        line: 14,
        iteration: { i: 4, of: 4, label: { en: 'Deletion Cascade', bn: 'ডিলিট ক্যাসকেড' } },
        state: { maxInsertRotations: 1, maxDeleteRotations: 'O(log N) cascades', overallTime: 'O(log N)' },
        scene: {
          kind: 'chart',
          label: { en: 'Most rotations one operation can need (N = 1,000,000 keys)', bn: 'একটা অপারেশনে সর্বোচ্চ কতগুলো রোটেশন লাগতে পারে (N = 1,000,000)' },
          max: 20,
          items: [
            { label: 'Insert', v: 1, color: 'var(--green)', note: { en: 'one fix is enough', bn: 'একবার ঠিক করলেই হয়' } },
            { label: 'Delete', v: 20, color: 'var(--amber)', note: { en: 'can repeat up to the root (≈ log₂ N)', bn: 'রুট পর্যন্ত বারবার হতে পারে (≈ log₂ N)' } }
          ],
          caption: { en: 'both still finish in O(log N) time', bn: 'দুটোই O(log N) সময়ে শেষ হয়' }
        }
      }
    ]
  },

  {
    id: 'red-black-trees',
    name: { en: 'Red-Black Tree Invariants & 2-3-4 Equivalence', bn: 'রেড-ব্ল্যাক ট্রি শর্ত ও ২-৩-৪ সমতুল্যতা' },
    description: {
      en: 'Balancing with red and black colours, and where it is used',
      bn: 'লাল আর কালো রং দিয়ে ব্যালান্স, আর কোথায় ব্যবহার হয়'
    },
    categoryKey: 'trees',
    subgroupKey: 'avl',
    level: 'intermediate',
    order: 40,
    icon: '🔴',
    complexity: {
      time: 'O(log n)',
      space: 'O(log n)',
      note: {
        en: 'Red-Black trees guarantee height <= 2 log2(n + 1). Used in C++ std::map, Java TreeMap, and Linux kernel process scheduler.',
        bn: 'রেড-ব্ল্যাক ট্রির উচ্চতা সর্বদা <= ২ log2(n + ১)। এটি C++ std::map, Java TreeMap এবং লিনাক্স কার্নেলে ব্যবহৃত হয়।'
      }
    },
    code: {
      pseudo: {
        en: [
          "// Red-Black Tree 5 Invariants Check",
          "// 1. Every node is RED or BLACK",
          "// 2. The root is always BLACK",
          "// 3. Every leaf (NIL) is BLACK",
          "// 4. If node is RED, both children are BLACK (No consecutive REDs)",
          "// 5. Equal Black Height: All simple paths to leaves have same BLACK count",
          "",
          "function getBlackHeight(node):",
          "  if node == null: return 1 // NIL is black",
          "  leftBH = getBlackHeight(node.left)",
          "  rightBH = getBlackHeight(node.right)",
          "  if leftBH != rightBH: throw \"Black Height Invariant Violated!\"",
          "  return leftBH + (node.color == BLACK ? 1 : 0)",
          ""
        ],
        bn: [
          "// রেড-ব্ল্যাক ট্রির ৫টি মৌলিক শর্ত যাচাই",
          "// ১. প্রতিটি নোড RED অথবা BLACK",
          "// ২. রুট নোডটি সর্বদা BLACK",
          "// ৩. সমস্ত লিফ (NIL) নোড BLACK",
          "// ৪. কোনো নোড RED হলে তার উভয় সন্তানই BLACK (পরপর ২টি RED নিষিদ্ধ)",
          "// ৫. সমান ব্ল্যাক-হাইট: রুট থেকে সব লিফের পথে সমান সংখ্যক BLACK নোড থাকে",
          "",
          "function getBlackHeight(node):",
          "  if node == null: return 1 // NIL হলো ব্ল্যাক",
          "  leftBH = getBlackHeight(node.left)",
          "  rightBH = getBlackHeight(node.right)",
          "  if leftBH != rightBH: throw \"ব্ল্যাক হাইট শর্ত ভঙ্গ!\"",
          "  return leftBH + (node.color == BLACK ? 1 : 0)",
          ""
        ]
      },
      js: {
        en: [
          "// JavaScript Red-Black Invariants Check",
          "const RED = true, BLACK = false;",
          "function getBlackHeight(node) {",
          "  if (!node) return 1;",
          "  if (node.color === RED) {",
          "    if ((node.left && node.left.color === RED) || (node.right && node.right.color === RED)) {",
          "      throw new Error(\"Consecutive REDs!\");",
          "    }",
          "  }",
          "  const leftBH = getBlackHeight(node.left);",
          "  const rightBH = getBlackHeight(node.right);",
          "  if (leftBH !== rightBH) throw new Error(\"Unmatched Black Height!\");",
          "  return leftBH + (node.color === BLACK ? 1 : 0);",
          "}"
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট রেড-ব্ল্যাক শর্ত যাচাই",
          "const RED = true, BLACK = false;",
          "function getBlackHeight(node) {",
          "  if (!node) return 1;",
          "  if (node.color === RED) {",
          "    if ((node.left && node.left.color === RED) || (node.right && node.right.color === RED)) {",
          "      throw new Error(\"পরপর দুটি RED নোড!\");",
          "    }",
          "  }",
          "  const leftBH = getBlackHeight(node.left);",
          "  const rightBH = getBlackHeight(node.right);",
          "  if (leftBH !== rightBH) throw new Error(\"ব্ল্যাক হাইট অসমান!\");",
          "  return leftBH + (node.color === BLACK ? 1 : 0);",
          "}"
        ]
      },
      java: {
        en: [
          "// Java Red-Black Invariants Check",
          "int getBlackHeight(RBNode node) {",
          "  if (node == null) return 1;",
          "  if (node.color == RED) {",
          "    if ((node.left != null && node.left.color == RED) || (node.right != null && node.right.color == RED)) {",
          "      throw new IllegalStateException(\"Consecutive RED nodes!\");",
          "    }",
          "  }",
          "  int leftBH = getBlackHeight(node.left);",
          "  int rightBH = getBlackHeight(node.right);",
          "  if (leftBH != rightBH) throw new IllegalStateException(\"Black height mismatch!\");",
          "  return leftBH + (node.color == BLACK ? 1 : 0);",
          "}",
          ""
        ],
        bn: [
          "// জাভা রেড-ব্ল্যাক শর্ত যাচাই",
          "int getBlackHeight(RBNode node) {",
          "  if (node == null) return 1;",
          "  if (node.color == RED) {",
          "    if ((node.left != null && node.left.color == RED) || (node.right != null && node.right.color == RED)) {",
          "      throw new IllegalStateException(\"পরপর RED নোড পাওয়া গেছে!\");",
          "    }",
          "  }",
          "  int leftBH = getBlackHeight(node.left);",
          "  int rightBH = getBlackHeight(node.right);",
          "  if (leftBH != rightBH) throw new IllegalStateException(\"ব্ল্যাক হাইট অসমান!\");",
          "  return leftBH + (node.color == BLACK ? 1 : 0);",
          "}",
          ""
        ]
      },
      python: {
        en: [
          "# Python Red-Black Invariants Check",
          "RED, BLACK = True, False",
          "def get_black_height(node):",
          "  if not node: return 1",
          "  if node.color == RED:",
          "    if (node.left and node.left.color == RED) or (node.right and node.right.color == RED):",
          "      raise ValueError(\"Consecutive RED nodes!\")",
          "  left_bh = get_black_height(node.left)",
          "  right_bh = get_black_height(node.right)",
          "  if left_bh != right_bh: raise ValueError(\"Black height mismatch!\")",
          "  return left_bh + (1 if node.color == BLACK else 0)",
          "",
          "",
          ""
        ],
        bn: [
          "# পাইথন রেড-ব্ল্যাক শর্ত যাচাই",
          "RED, BLACK = True, False",
          "def get_black_height(node):",
          "  if not node: return 1",
          "  if node.color == RED:",
          "    if (node.left and node.left.color == RED) or (node.right and node.right.color == RED):",
          "      raise ValueError(\"পরপর দুটি RED নোড!\")",
          "  left_bh = get_black_height(node.left)",
          "  right_bh = get_black_height(node.right)",
          "  if left_bh != right_bh: raise ValueError(\"ব্ল্যাক হাইট অসমান!\")",
          "  return left_bh + (1 if node.color == BLACK else 0)",
          "",
          "",
          ""
        ]
      },
      cpp: {
        en: [
          "// C++ Red-Black Invariants Check",
          "int getBlackHeight(RBNode* node) {",
          "  if (!node) return 1;",
          "  if (node->color == RED) {",
          "    if ((node->left && node->left->color == RED) || (node->right && node->right->color == RED)) {",
          "      throw runtime_error(\"Consecutive RED nodes!\");",
          "    }",
          "  }",
          "  int leftBH = getBlackHeight(node->left);",
          "  int rightBH = getBlackHeight(node->right);",
          "  if (leftBH != rightBH) throw runtime_error(\"Black height mismatch!\");",
          "  return leftBH + (node->color == BLACK ? 1 : 0);",
          "}",
          ""
        ],
        bn: [
          "// সি++ রেড-ব্ল্যাক শর্ত যাচাই",
          "int getBlackHeight(RBNode* node) {",
          "  if (!node) return 1;",
          "  if (node->color == RED) {",
          "    if ((node->left && node->left->color == RED) || (node->right && node->right->color == RED)) {",
          "      throw runtime_error(\"পরপর দুটি RED নোড!\");",
          "    }",
          "  }",
          "  int leftBH = getBlackHeight(node->left);",
          "  int rightBH = getBlackHeight(node->right);",
          "  if (leftBH != rightBH) throw runtime_error(\"ব্ল্যাক হাইট অসমান!\");",
          "  return leftBH + (node->color == BLACK ? 1 : 0);",
          "}",
          ""
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'Red-Black tree: 5 simple rules',
          bn: 'রেড-ব্ল্যাক ট্রি: ৫টা সহজ নিয়ম'
        },
        explanation: {
          en: 'A **Red-Black tree** is another self-balancing BST. Instead of heights, every node gets a **colour**, red or black, and the tree keeps 5 rules:\n\n1. every node is **red or black**;\n2. the **root is black**;\n3. the empty spots at the bottom (called **NIL**) count as **black**;\n4. a red node **cannot have a red child** (no two reds in a row);\n5. every path from a node down to the bottom has the **same number of black nodes**.\n\nWhenever an insert or delete breaks a rule, the tree **recolours** some nodes and does a few **rotations** to fix it.',
          bn: '**রেড-ব্ল্যাক ট্রি** আরেকটা নিজে-ব্যালান্স-হওয়া BST। উচ্চতার বদলে প্রতিটা নোড একটা **রং** পায়, লাল বা কালো, আর ট্রি ৫টা নিয়ম মানে:\n\n১. প্রতিটা নোড **লাল বা কালো**;\n২. **রুট কালো**;\n৩. নিচের খালি জায়গাগুলো (নাম **NIL**) **কালো** ধরা হয়;\n৪. লাল নোডের **লাল চাইল্ড থাকতে পারবে না** (পরপর দুটো লাল নয়);\n৫. একটা নোড থেকে নিচ পর্যন্ত প্রতিটা পথে **কালো নোডের সংখ্যা সমান**।\n\nকোনো ইনসার্ট বা ডিলিট নিয়ম ভাঙলে ট্রি কিছু নোডের **রং বদলায়** আর কয়েকটা **রোটেশন** করে ঠিক করে।'
        },
        line: 0,
        iteration: { i: 1, of: 4, label: { en: '5 Invariants', bn: '৫টি শর্ত' } },
        state: { invariant1: 'Color is RED or BLACK', invariant2: 'Root is BLACK', invariant4: 'No consecutive REDs', invariant5: 'Equal Black Height' },
        scene: {
          kind: 'tree',
          label: 'Valid Red-Black Tree: Black Root (30), Red Children (15, 70), Black Leaves (10, 20, 60, 85)',
          root: {
            v: '30 [B]',
            l: { v: '15 [R]', l: { v: '10 [B]' }, r: { v: '20 [B]' } },
            r: { v: '70 [R]', l: { v: '60 [B]' }, r: { v: '85 [B]' } }
          },
          highlights: { current: '30 [B]', active: ['15 [R]', '70 [R]'], visited: ['10 [B]', '20 [B]', '60 [B]', '85 [B]'] },
          legend: [
            { label: 'Black Nodes (Root & Leaves)', color: 'var(--cyan)' },
            { label: 'Red Nodes', color: 'var(--red)' }
          ],
          note: 'Notice Black-Height from root to any leaf is exactly 2 (Root 30 + Leaf). Rule 5 holds!'
        }
      },
      {
        title: {
          en: 'Why the rules keep it short',
          bn: 'নিয়মগুলো কেন একে খাটো রাখে'
        },
        explanation: {
          en: 'Look at rules 4 and 5 together:\n\n- every path has the **same number of black** nodes (say b);\n- reds can never be next to each other, so a path can have **at most one red between blacks**.\n\nSo the shortest possible path is all black (b nodes) and the longest alternates red-black (about 2b). **No path is more than twice as long as another.**\n\nThat keeps the height at most **2 × log₂(N + 1)** — always **O(log N)**.',
          bn: 'নিয়ম ৪ আর ৫ একসাথে দেখো:\n\n- প্রতিটা পথে **কালো নোড সমান** (ধরো b টা);\n- লাল কখনো পাশাপাশি থাকতে পারে না, তাই একটা পথে **দুই কালোর মাঝে বড়জোর একটা লাল**।\n\nতাই সবচেয়ে ছোট পথ সব কালো (b টা নোড), আর সবচেয়ে লম্বা পথ লাল-কালো পালাক্রমে (প্রায় 2b)। **কোনো পথ অন্যটার দ্বিগুণের বেশি লম্বা নয়।**\n\nএতে উচ্চতা থাকে বড়জোর **2 × log₂(N + 1)** — সবসময় **O(log N)**।'
        },
        line: 6,
        iteration: { i: 2, of: 4, label: { en: 'Height Bound', bn: 'উচ্চতার সীমা' } },
        state: { maxLongestPath: '2 * shortest path', boundFormula: '2 log2(N + 1)', searchGuarantee: 'O(log N)' },
        scene: {
          kind: 'chart',
          label: { en: 'Tallest possible tree with N = 1,000 keys', bn: 'N = 1,000 কী দিয়ে সবচেয়ে উঁচু সম্ভাব্য ট্রি' },
          max: 40,
          items: [
            { label: 'Perfect', v: 10, color: 'var(--green)', note: { en: 'log₂(N+1)', bn: 'log₂(N+1)' } },
            { label: 'Red-Black', v: 20, color: 'var(--red)', note: { en: '≤ 2·log₂(N+1)', bn: '≤ 2·log₂(N+1)' } },
            { label: 'Plain BST', v: 40, color: 'var(--text-muted)', note: { en: 'up to 999 (bar cut off)', bn: '999 পর্যন্ত (বার কাটা)' } }
          ],
          caption: { en: 'a Red-Black tree is at most twice as tall as a perfect tree', bn: 'রেড-ব্ল্যাক ট্রি পারফেক্ট ট্রির সর্বোচ্চ দ্বিগুণ উঁচু' }
        }
      },
      {
        title: {
          en: 'Red-Black trees are 2-3-4 trees in disguise',
          bn: 'রেড-ব্ল্যাক ট্রি আসলে ছদ্মবেশী ২-৩-৪ ট্রি'
        },
        explanation: {
          en: 'A helpful way to picture it: **glue every red node to its black parent**. Each glued group becomes one wide node:\n\n- a black node alone → a node with **1 key**;\n- black + one red child → a node with **2 keys**;\n- black + two red children → a node with **3 keys**.\n\nWhat you get is a **2-3-4 tree** (a multiway tree, see the next chapter) — and all its leaves are at the same depth. Red-Black recolouring and rotations are just that tree\'s node splits, done with binary nodes.',
          bn: 'ছবি করে বোঝার একটা ভালো উপায়: **প্রতিটা লাল নোডকে তার কালো প্যারেন্টের সঙ্গে আঠা দিয়ে জুড়ে দাও**। প্রতিটা জোড়া দল একটা চওড়া নোড হয়ে যায়:\n\n- একা একটা কালো নোড → **১টা কী**-ওয়ালা নোড;\n- কালো + একটা লাল চাইল্ড → **২টা কী**-ওয়ালা নোড;\n- কালো + দুটো লাল চাইল্ড → **৩টা কী**-ওয়ালা নোড।\n\nযা পাওয়া যায় তা একটা **২-৩-৪ ট্রি** (মাল্টিওয়ে ট্রি, পরের অধ্যায়ে) — আর এর সব লিফ একই গভীরতায়। রেড-ব্ল্যাকের রং বদল আর রোটেশন আসলে সেই ট্রির নোড ভাগ করা, বাইনারি নোড দিয়ে করা।'
        },
        line: 8,
        iteration: { i: 3, of: 4, label: { en: 'Isomorphism', bn: 'সমতুল্যতা' } },
        state: { blackNodeAlone: '2-Node (1 key)', blackWithOneRed: '3-Node (2 keys)', blackWithTwoReds: '4-Node (3 keys)' },
        scene: {
          kind: 'multiway',
          order: 4,
          label: 'Equivalent 2-3-4 Tree: Black root 30 merges Red children 15 & 70 into a 4-Node [15, 30, 70]',
          nodes: [
            { id: 'root', keys: [15, 30, 70], children: ['l1', 'l2', 'l3', 'l4'], state: 'active', hlKeys: { 1: 'ok' } },
            { id: 'l1', keys: [10], state: 'ok' },
            { id: 'l2', keys: [20], state: 'ok' },
            { id: 'l3', keys: [60], state: 'ok' },
            { id: 'l4', keys: [85], state: 'ok' }
          ],
          note: 'Red nodes represent horizontal glue binding multiple keys into a single multiway node!'
        }
      },
      {
        title: {
          en: 'AVL or Red-Black? Where they are used',
          bn: 'AVL না রেড-ব্ল্যাক? কোথায় ব্যবহার হয়'
        },
        explanation: {
          en: '- **AVL** is balanced more strictly → slightly **faster searches**, but more rotations on insert/delete.\n- **Red-Black** is a little looser → slightly slower searches, but **fewer rotations** when data changes a lot.\n\nBecause real programs change data often, most standard libraries use **Red-Black trees**:\n- C++ `std::map` and `std::set`;\n- Java `TreeMap` and `TreeSet`;\n- the Linux kernel (for example its process scheduler).',
          bn: '- **AVL** বেশি কড়াভাবে ব্যালান্সড → **খোঁজা** একটু দ্রুত, কিন্তু ইনসার্ট/ডিলিটে বেশি রোটেশন।\n- **রেড-ব্ল্যাক** একটু ঢিলা → খোঁজা একটু ধীর, কিন্তু ডেটা অনেক বদলালে **কম রোটেশন**।\n\nআসল প্রোগ্রামে ডেটা প্রায়ই বদলায় বলে বেশিরভাগ স্ট্যান্ডার্ড লাইব্রেরি **রেড-ব্ল্যাক ট্রি** ব্যবহার করে:\n- C++ `std::map` আর `std::set`;\n- Java `TreeMap` আর `TreeSet`;\n- লিনাক্স কার্নেল (যেমন এর প্রসেস শিডিউলার)।'
        },
        line: 11,
        iteration: { i: 4, of: 4, label: { en: 'Applications', bn: 'প্রয়োগ' } },
        state: { cppSTL: 'std::map', java: 'java.util.TreeMap', linuxKernel: 'CFS Process Scheduler' },
        scene: {
          kind: 'none',
          title: { en: 'Where Red-Black trees are used', bn: 'রেড-ব্ল্যাক ট্রি কোথায় ব্যবহার হয়' },
          desc: { en: '`std::map` / `std::set` in C++, `TreeMap` / `TreeSet` in Java, and the Linux CPU scheduler.', bn: 'C++-এর `std::map` / `std::set`, Java-র `TreeMap` / `TreeSet`, আর Linux-এর CPU শিডিউলার।' }
        }
      }
    ]
  }
];
