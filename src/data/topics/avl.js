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
      en: 'Height-balanced property BF ∈ {-1, 0, +1} and the strict 1.44 log2 N mathematical proof',
      bn: 'ব্যালান্স ফ্যাক্টর BF ∈ {-১, ০, +১} এবং ১.৪৪ log2 N উচ্চতা সীমার গাণিতিক প্রমাণ'
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
        title: { en: 'What is an AVL Tree? Height-Balanced Invariant', bn: 'AVL ট্রি কী? হাইট-ব্যালান্সড শর্ত' },
        explanation: {
          en: 'Invented in 1962 by Georgy Adelson-Velsky and Evgenii Landis, the **AVL Tree** was the first self-balancing BST in history.\n\n### The AVL Invariant:\nFor **every single node** in the tree, the difference between the height of its left subtree and the height of its right subtree (the **Balance Factor**) must be strictly **-1, 0, or +1**:\n$$\\mathbf{BF(N) = \\text{Height}(N.\\text{left}) - \\text{Height}(N.\\text{right}) \\in \\{-1, 0, +1\\}}$$\n\nIf $BF(N)$ becomes $+2$ or $-2$, the node is **imbalanced** and triggers immediate programmatic rebalancing (rotations)!',
          bn: '১৯৬২ সালে বিজ্ঞানী জর্জ আডেলসন-ভেলস্কি এবং ইভজেনি ল্যান্ডিস কর্তৃক উদ্ভাবিত **AVL ট্রি** ছিল কম্পিউটার বিজ্ঞানের ইতিহাসের প্রথম সেলফ-ব্যালান্সিং বাইনারি সার্চ ট্রি।\n\n### AVL-এর মূল শর্ত:\nট্রির **প্রতিটি নোডের** ক্ষেত্রে তার বাম সাব-ট্রির উচ্চতা এবং ডান সাব-ট্রির উচ্চতার ব্যবধান (যাকে **ব্যালান্স ফ্যাক্টর** বলা হয়) অবশ্যই **-১, ০, অথবা +১** হতে হবে:\n$$\\mathbf{BF(N) = \\text{Height}(N.\\text{বাম}) - \\text{Height}(N.\\text{ডান}) \\in \\{-1, 0, +1\\}}$$\n\nযদি কখনো কোনো নোডের $BF(N)$ এর মান $+2$ বা $-2$ হয়, তবে নোডটি ভারসাম্য হারায় এবং সাথে সাথে রোটেশনের মাধ্যমে তা ব্যালান্স করা হয়!',
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
        title: { en: 'Calculating the Balance Factor BF = HL - HR', bn: 'ব্যালান্স ফ্যাক্টর নির্ণয়: BF = HL - HR' },
        explanation: {
          en: 'Let\'s compute the Balance Factor for root `50`:\n- Height of Left Subtree (`30`): $H_L = 2$.\n- Height of Right Subtree (`70`): $H_R = 2$.\n- $BF(50) = H_L - H_R = 2 - 2 = \\mathbf{0}$.\n\nIf a child has no subtree (NULL), its height is `0`:\n- Node `80` has no children: $H_L = 0, H_R = 0 \\implies BF(80) = \\mathbf{0}$.',
          bn: 'রুট `50`-এর ব্যালান্স ফ্যাক্টর হিসাব করি:\n- বাম সাব-ট্রির উচ্চতা (`30`): $H_L = 2$।\n- ডান সাব-ট্রির উচ্চতা (`70`): $H_R = 2$।\n- $BF(50) = H_L - H_R = 2 - 2 = \\mathbf{0}$।\n\nযদি কোনো নোডের সন্তান না থাকে (NULL), তবে তার উচ্চতা ধরা হয় `0`:\n- নোড `80`-এর কোনো সন্তান নেই: $H_L = 0, H_R = 0 \\implies BF(80) = \\mathbf{0}$।',
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
        title: { en: 'Mathematical Proof: Maximum Height ≤ 1.44 log2 N', bn: 'গাণিতিক প্রমাণ: সর্বোচ্চ উচ্চতা ≤ ১.৪৪ log2 N' },
        explanation: {
          en: '### How tall can an AVL tree grow in the worst case?\nTo build the tallest (most sparse) AVL tree of height $h$, one subtree must have height $h-1$ and the other must have height $h-2$:\n$$N(h) = N(h - 1) + N(h - 2) + 1$$\n\nNotice this is identical to the **Fibonacci recurrence**! Solving this recurrence yields:\n$$N(h) \\approx \\frac{1}{\\sqrt{5}} \\left(\\frac{1 + \\sqrt{5}}{2}\\right)^{h+3} - 1$$\nTaking logarithms on both sides gives the celebrated theorem:\n$$\\mathbf{h < 1.4404 \\log_2(N + 2) - 0.328 \\approx 1.44 \\log_2 N}$$\nAn AVL tree is at most only **$44\\%$ taller** than a theoretically perfect tree!',
          bn: '### সবচেয়ে খারাপ পরিস্থিতিতেও AVL ট্রি কতটা উঁচু হতে পারে?\nউচ্চতা $h$-এর সবচেয়ে পাতলা (ন্যূনতম নোড বিশিষ্ট) AVL ট্রি বানাতে হলে, একটি সাব-ট্রির উচ্চতা হতে হবে $h-1$ এবং অন্যটির $h-2$:\n$$N(h) = N(h - 1) + N(h - 2) + 1$$\n\nলক্ষ করো, এটি অবিকল **ফিবোনাচ্চি ধারার (Fibonacci)** মতো! এই সমীকরণটি সমাধান করে পাওয়া যায়:\n$$N(h) \\approx \\frac{1}{\\sqrt{5}} \\left(\\frac{1 + \\sqrt{5}}{2}\\right)^{h+3} - 1$$\nউভয় পাশে লগারিদম নিলে কালজয়ী উপপাদ্যটি প্রমাণিত হয়:\n$$\\mathbf{h < 1.4404 \\log_2(N + 2) - 0.328 \\approx 1.44 \\log_2 N}$$\nঅর্থাৎ, একটি AVL ট্রি নিখুঁত পারফেক্ট ট্রির চেয়ে সর্বোচ্চ মাত্র **৪৪% বেশি উঁচু** হতে পারে!',
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
          note: 'Because nodes grow exponentially according to the Golden Ratio (1.618), height is strictly logarithmic.'
        }
      },
      {
        title: { en: 'When Imbalance Occurs: |BF| > 1 Triggers Rebalance', bn: 'ভারসাম্যহীনতা: |BF| > ১ হলে রোটেশন' },
        explanation: {
          en: 'When a new key is inserted, heights change backtracking up the tree. If any node gets **$BF = +2$ (Left Heavy)** or **$BF = -2$ (Right Heavy)**, the AVL invariant is broken!\n\nThis imbalance falls into one of **4 distinct patterns**:\n1. **LL Imbalance**: New key inserted into Left subtree of Left child.\n2. **RR Imbalance**: New key inserted into Right subtree of Right child.\n3. **LR Imbalance**: New key inserted into Right subtree of Left child.\n4. **RL Imbalance**: New key inserted into Left subtree of Right child.\n\nEach case is cured by a specific **Single or Double Rotation**.',
          bn: 'যখন একটি নতুন সংখ্যা ইনসার্ট করা হয়, তখন নিচ থেকে উপরে উচ্চতা পরিবর্তিত হয়। যদি কোনো নোডের **$BF = +2$ (বামে ভারী)** বা **$BF = -2$ (ডানে ভারী)** হয়ে যায়, তবে AVL শর্ত ভঙ্গ হয়!\n\nএই ভারসাম্যহীনতাটি **৪টি সুনির্দিষ্ট প্যাটার্নের** যেকোনো একটিতে পড়ে:\n১. **LL ইমব্যালান্স**: বাম সন্তানের বাম সাব-ট্রিতে মান ঢোকানো হয়েছে।\n২. **RR ইমব্যালান্স**: ডান সন্তানের ডান সাব-ট্রিতে মান ঢোকানো হয়েছে।\n৩. **LR ইমব্যালান্স**: বাম সন্তানের ডান সাব-ট্রিতে মান ঢোকানো হয়েছে।\n৪. **RL ইমব্যালান্স**: ডান সন্তানের বাম সাব-ট্রিতে মান ঢোকানো হয়েছে।\n\nপ্রতিটি কেস নির্দিষ্ট **সিঙ্গেল অথবা ডাবল রোটেশনের** মাধ্যমে সমাধান করা হয়।',
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
      en: 'Single Right (LL), Single Left (RR), Double Left-Right (LR), and Double Right-Left (RL) rotations',
      bn: 'সিঙ্গেল রাইট (LL), সিঙ্গেল লেফট (RR), ডাবল লেফট-রাইট (LR) এবং ডাবল রাইট-লেফট (RL) রোটেশন'
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
        title: { en: 'LL Imbalance & Single Right Rotation', bn: 'LL ইমব্যালান্স ও সিঙ্গেল রাইট রোটেশন' },
        explanation: {
          en: '### LL Case (Left of Left):\nInserting `10` under `20` under `30` makes node `30` have $BF = +2$, and node `20` have $BF = +1$.\n\n### The Right Rotation (`rightRotate`):\n- Grab node `20` (middle node) and pull it UP to become the new root!\n- Old root `30` swings DOWN to become the **right child** of `20`.\n- Any middle subtree $T_2$ of 20 would become the left child of 30.\n\nResult: `[20]` is root with left child `10` and right child `30`. Tree height decreases from 2 to 1!',
          bn: '### LL কেস (বামের বামে):\n`30`-এর বামে `20`, তার বামে `10` ইনসার্ট করায় নোড `30`-এর $BF = +2$ এবং `20`-এর $BF = +1$ হয়ে যায়।\n\n### রাইট রোটেশন (`rightRotate`):\n- মাঝের নোড `20`-কে টেনে উপরে তুলে নতুন রুট বানাও!\n- পুরনো রুট `30` নিচে নেমে `20`-এর **ডান সন্তান** হয়ে যায়।\n- ২০-এর যদি কোনো ডান সাব-ট্রি $T_2$ থাকত, তা ৩০-এর বাম সন্তান হতো।\n\nফলাফল: রুট হলো `20`, বামে `10`, ডানে `30`। ট্রির উচ্চতা ২ থেকে কমে ১-এ নেমে এল!',
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
        title: { en: 'RR Imbalance & Single Left Rotation', bn: 'RR ইমব্যালান্স ও সিঙ্গেল লেফট রোটেশন' },
        explanation: {
          en: '### RR Case (Right of Right):\nInserting sorted values `[10, 20, 30]` makes node `10` have $BF = -2$ and node `20` have $BF = -1$.\n\n### The Left Rotation (`leftRotate`):\n- Middle node `20` pivots UP to become the new root.\n- Old root `10` rotates DOWN to become the **left child** of `20`.\n- Node `30` remains the right child of `20`.\n\nResult: `[20]` is root with left child `10` and right child `30`. Symmetry at its finest!',
          bn: '### RR কেস (ডানের ডানে):\nসাজানো সংখ্যা `[10, 20, 30]` ঢুকানোর ফলে নোড `10`-এর $BF = -2$ এবং নোড `20`-এর $BF = -1$ হয়ে যায়।\n\n### লেফট রোটেশন (`leftRotate`):\n- মাঝের নোড `20` উপরে উঠে নতুন রুট হয়।\n- পুরনো রুট `10` নিচে নেমে `20`-এর **বাম সন্তান** হয়ে যায়।\n- নোড `30` অপরিবর্তিতভাবে ২০-এর ডান সন্তান থাকে।\n\nফলাফল: রুট `20`, বামে `10`, ডানে `30`। শতভাগ প্রতিসম সমাধান!',
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
        title: { en: 'LR Imbalance & Double Left-Right Rotation', bn: 'LR ইমব্যালান্স ও ডাবল লেফট-রাইট রোটেশন' },
        explanation: {
          en: '### LR Case (Zig-Zag: Right child of Left child):\nInsert keys `[30, 10, 20]`. Root `30` has $BF = +2$, but left child `10` has $BF = -1$!\nA single rotation cannot fix this because of the zig-zag bend.\n\n### Solution: Two Rotations:\n1. **Step 1 (Left Rotate on Left Child 10)**: Converts the zig-zag into a straight LL line `[30 -> 20 -> 10]`!\n2. **Step 2 (Right Rotate on Root 30)**: Normal right rotation brings `20` to root with children `10` and `30`!\n\n`root.left = leftRotate(root.left); return rightRotate(root);`',
          bn: '### LR কেস (জিগ-জ্যাগ: বাম সন্তানের ডান সন্তান):\n`[30, 10, 20]` ইনসার্ট করা হলো। রুট `30`-এর $BF = +2$, কিন্তু তার বাম সন্তান `10`-এর $BF = -1$!\nজিগ-জ্যাগ বাঁকা থাকার কারণে কোনো একটি সিঙ্গেল রোটেশন একে সোজা করতে পারে না।\n\n### সমাধান: জোড়া রোটেশন (Double Rotation):\n১. **ধাপ ১ (বাম সন্তানের ওপর লেফট রোটেশন)**: বাঁকা অংশটিকে সোজা করে সাধারণ LL লাইনে রূপান্তর করে `[30 -> 20 -> 10]`!\n২. **ধাপ ২ (রুটের ওপর রাইট রোটেশন)**: সাধারণ রাইট রোটেশন `20`-কে রুটে তুলে আনে যার সন্তান হয় `10` ও `30`!\n\nকোড: `root.left = leftRotate(root.left); return rightRotate(root);`',
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
        title: { en: 'RL Imbalance & Double Right-Left Rotation', bn: 'RL ইমব্যালান্স ও ডাবল রাইট-লেফট রোটেশন' },
        explanation: {
          en: '### RL Case (Zig-Zag: Left child of Right child):\nInsert keys `[10, 30, 20]`. Root `10` has $BF = -2$, and right child `30` has $BF = +1$!\n\n### Solution: Two Rotations:\n1. **Step 1 (Right Rotate on Right Child 30)**: Converts zig-zag into a straight RR line `[10 -> 20 -> 30]`.\n2. **Step 2 (Left Rotate on Root 10)**: Normal left rotation brings `20` to root with children `10` and `30`!\n\n`root.right = rightRotate(root.right); return leftRotate(root);`',
          bn: '### RL কেস (জিগ-জ্যাগ: ডান সন্তানের বাম সন্তান):\n`[10, 30, 20]` ইনসার্ট করা হলো। রুট `10`-এর $BF = -2$, এবং ডান সন্তান `30`-এর $BF = +1$!\n\n### সমাধান: জোড়া রোটেশন (Double Rotation):\n১. **ধাপ ১ (ডান সন্তানের ওপর রাইট রোটেশন)**: জিগ-জ্যাগ অংশটিকে সোজা RR লাইনে রূপান্তর করে `[10 -> 20 -> 30]`।\n২. **ধাপ ২ (রুটের ওপর লেফট রোটেশন)**: সাধারণ লেফট রোটেশন `20`-কে রুটে নিয়ে আসে যার সন্তান হয় `10` ও `30`!\n\nকোড: `root.right = rightRotate(root.right); return leftRotate(root);`',
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
      en: 'Recursive insertion with single-rotation balance guarantee and deletion with rebalancing cascade',
      bn: 'ইনসার্টে একক রোটেশন গ্যারান্টি এবং ডিলিশনে ক্যাসকেডিং রোটেশন মেকানিক্স'
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
        title: { en: 'Step 1: Standard BST Insertion Downward', bn: 'ধাপ ১: সাধারণ BST ইনসার্ট' },
        explanation: {
          en: 'AVL insertion begins exactly like normal BST insertion:\n1. Recursively search down the tree to locate the open leaf spot.\n2. In this example, we insert key **`25`** into a tree with root `30`.\n3. $25 < 30 \\implies$ go left to `20`.\n4. $25 > 20 \\implies$ attach `25` as right child of `20`!',
          bn: 'AVL ইনসার্ট সাধারণ BST ইনসার্টের মতোই শুরু হয়:\n১. রিকারসিভভাবে নিচে নেমে সঠিক ফাঁকা লিফ অবস্থান খুঁজে বের করো।\n২. এই উদাহরণে আমরা রুট `30` বিশিষ্ট ট্রিতে **`25`** ইনসার্ট করছি।\n৩. $25 < 30 \\implies$ বামে নেমে ২০-এ যাও।\n৪. $25 > 20 \\implies$ ২০-এর ডান সন্তান হিসেবে `25` যুক্ত করো!',
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
        title: { en: 'Step 2: Backtracking & Updating Heights', bn: 'ধাপ ২: ব্যাকট্র্যাকিং ও উচ্চতা আপডেট' },
        explanation: {
          en: 'Now execution unwinds **back up the recursive call stack**:\n1. Update height of `25` $\\implies 1$.\n2. Update height of `20` $\\implies 1 + \\max(1, 1) = 2$. $BF(20) = 1 - 1 = 0$ (Balanced).\n3. Update height of `30` $\\implies 1 + \\max(2, 1) = 3$. $BF(30) = 2 - 1 = +1$ (Balanced).\n\nIf all ancestor BFs remain $\\in \\{-1, 0, +1\\}$, no rotation is needed and insertion finishes!',
          bn: 'এবার রিকারসিভ কল স্ট্যাক বরাবর **নিচ থেকে উপরে ফিরে আসা** শুরু হয়:\n১. নোড ২৫-এর উচ্চতা আপডেট $\\implies 1$।\n২. নোড ২০-এর উচ্চতা আপডেট $\\implies 1 + \\max(1, 1) = 2$। $BF(20) = 1 - 1 = 0$ (ব্যালান্সড)।\n৩. রুট ৩০-এর উচ্চতা আপডেট $\\implies 1 + \\max(2, 1) = 3$। $BF(30) = 2 - 1 = +1$ (ব্যালান্সড)।\n\nযদি সব পূর্বপুরুষের BF $\\in \\{-1, 0, +1\\}$ থাকে, তবে কোনো রোটেশন ছাড়াই ইনসার্ট সমাপ্ত হয়!',
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
        title: { en: 'Step 3: Detecting Imbalance and Rotating', bn: 'ধাপ ৩: ভারসাম্যহীনতা শনাক্ত ও রোটেশন' },
        explanation: {
          en: 'Now suppose we insert **`5`**:\n- Backtracking to `20`: Left child `10` grows, making $BF(20) = +2$!\n- Key `5 < 10` $\\implies$ this is an **LL Imbalance** at node `20`.\n- Code triggers: `return rightRotate(20)`.\n\n### Single Rotation Guarantee:\n**Theorem**: In an AVL tree, insertion requires **at most ONE single or double rotation** to restore balance across the ENTIRE tree! Once that rotation is done, no higher ancestor will ever be imbalanced.',
          bn: 'এখন ধরো আমরা নতুন মান **`5`** ইনসার্ট করলাম:\n- ২০-এ ফিরে এলে দেখা গেল তার বাম দিক বড় হওয়ায় $BF(20) = +2$ হয়ে গেছে!\n- নতুন মান $5 < 10$ $\\implies$ এটি নোড ২০-এর ক্ষেত্রে একটি **LL ইমব্যালান্স**।\n- কোড অবিলম্বে এক্সিকিউট করে: `return rightRotate(20)`।\n\n### একক রোটেশন গ্যারান্টি:\n**উপপাদ্য**: একটি AVL ট্রিতে ইনসার্ট করার পর পুরো ট্রির ভারসাম্য ফেরাতে **সর্বোচ্চ ঠিক একটি সিঙ্গেল বা ডাবল রোটেশনই** যথেষ্ট! ওই একটি রোটেশন শেষ হলেই ওপরের আর কোনো নোড কখনোই ভারসাম্য হারায় না।',
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
        title: { en: 'AVL Deletion: The Cascading Rebalance', bn: 'AVL ডিলিট: ক্যাসকেডিং রিব্যালান্স' },
        explanation: {
          en: 'While insertion requires at most 1 rotation, **deletion can decrease tree height**, which may cause an imbalance at the parent, which after rotation may decrease height further and cause an imbalance at the grandparent!\n\nTherefore, AVL deletion rebalancing can **cascade up to $O(\\log N)$ times** all the way to the root node.\n\nEven with cascades, total deletion time remains strictly bounded by **$O(\\log N)$**.',
          bn: 'ইনসার্টে সর্বোচ্চ ১টি রোটেশন লাগলেও, **ডিলিট করার ফলে সাব-ট্রির উচ্চতা কমে যেতে পারে**। এর ফলে প্যারেন্ট নোড ভারসাম্যহীন হতে পারে, যা রোটেশনের পর গ্র্যান্ডপ্যারেন্টকেও ভারসাম্যহীন করতে পারে!\n\nকাজেই AVL ডিলিশনে রুট পর্যন্ত সর্বোচ্চ **$O(\\log N)$ বার ক্যাসকেড রোটেশন** ঘটতে পারে।\n\nক্যাসকেড ঘটলেও মোট ডিলিশন টাইম কঠোরভাবে **$O(\\log N)$** লোগারিদমিক সীমার মধ্যেই থাকে।',
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
      en: 'The 5 Red-Black invariants, Black-Height bound, and structural isomorphism to 2-3-4 trees',
      bn: '৫টি রেড-ব্ল্যাক শর্ত, ব্ল্যাক-হাইট সীমা এবং ২-৩-৪ ট্রির সাথে কাঠামোগত সমতুল্যতা'
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
        title: { en: 'The 5 Red-Black Tree Invariants', bn: 'রেড-ব্ল্যাক ট্রির ৫টি অলঙ্ঘনীয় শর্ত' },
        explanation: {
          en: 'A **Red-Black Tree** is a binary search tree where each node carries an extra bit of color (**RED** or **BLACK**) satisfying 5 invariants:\n\n1. **Every node is either RED or BLACK**.\n2. **The Root is always BLACK**.\n3. **Every Leaf (NIL sentinel) is BLACK**.\n4. **If a node is RED, both of its children must be BLACK** (No two consecutive RED nodes on any path!).\n5. **Equal Black-Height**: For every node, all paths to descendant leaves contain the **exact same number of BLACK nodes**.',
          bn: '**রেড-ব্ল্যাক ট্রি (Red-Black Tree)** হলো এমন একটি বাইনারি সার্চ ট্রি যার প্রতিটি নোডে একটি অতিরিক্ত রঙের বিট থাকে (**RED** বা **BLACK**) যা ৫টি কঠোর শর্ত পূরণ করে:\n\n১. **প্রতিটি নোড হয় RED নয়তো BLACK**।\n২. **রুট নোডটি সর্বদা BLACK হবে**।\n৩. **সমস্ত লিফ (NIL sentinel) নোড BLACK হবে**।\n৪. **যদি কোনো নোড RED হয়, তবে তার উভয় সন্তানই BLACK হবে** (কোনো পথেই পরপর দুটি RED নোড থাকতে পারবে না!)।\n৫. **সমান ব্ল্যাক-হাইট**: যেকোনো নোড থেকে তার নিচের যেকোনো লিফে যাওয়ার পথে **সমান সংখ্যক BLACK নোড** থাকতে হবে।',
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
          note: 'Notice Black-Height from root to any leaf is exactly 2 (Root 30 + Leaf). Invariant 5 satisfied!'
        }
      },
      {
        title: { en: 'Height Bound Theorem: Height ≤ 2 log2(N + 1)', bn: 'উচ্চতার উপপাদ্য: উচ্চতা ≤ ২ log2(N + ১)' },
        explanation: {
          en: 'Why do these 5 invariants prevent the tree from becoming skewed?\n- Because **no two RED nodes can be consecutive**, at most half of the nodes on any path can be red.\n- Because **every path has the same number of BLACK nodes ($bh$)**, the shortest path has length $bh$ and the longest path has length at most $2 \\cdot bh$.\n\n> **Theorem**: The maximum height of a Red-Black tree with $N$ nodes is strictly bounded by:\n$$\\mathbf{h \\le 2 \\log_2(N + 1)}$$\nGuaranteed $O(\\log N)$ worst-case time without exception!',
          bn: 'এই ৫টি শর্ত কেন ট্রিকে স্কিউড হতে দেয় না?\n- কারণ **কোনো পথেই পরপর দুটি RED থাকতে পারে না**, তাই যেকোনো পথের সর্বোচ্চ অর্ধেক নোড লাল হতে পারে।\n- কারণ **প্রতিটি পথের ব্ল্যাক নোডের সংখ্যা সমান ($bh$)**, তাই ক্ষুদ্রতম পথটির দৈর্ঘ্য $bh$ এবং দীর্ঘতম পথটির দৈর্ঘ্য সর্বোচ্চ $2 \\cdot bh$।\n\n> **বিখ্যাত উপপাদ্য**: $N$ নোডের রেড-ব্ল্যাক ট্রির সর্বোচ্চ উচ্চতা সর্বদা সীমাবদ্ধ থাকে:\n$$\\mathbf{h \\le 2 \\log_2(N + 1)}$$\nকোনো ব্যতিক্রম ছাড়াই নিশ্চিত $O(\\log N)$ সময়!',
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
        title: { en: 'Isomorphism: Red-Black Equivalence to 2-3-4 Trees', bn: 'আইসোমরফিজম: ২-৩-৪ ট্রির সাথে সমতুল্যতা' },
        explanation: {
          en: 'Here is the most profound theoretical insight in tree architecture:\n\n> **Every Red-Black Tree is structurally isometric to a 2-3-4 Multiway Tree!**\n\n- If a BLACK node has **one RED child**, they merge horizontally to represent a **3-node** (2 keys, 3 children).\n- If a BLACK node has **two RED children**, they merge horizontally to represent a **4-node** (3 keys, 4 children).\n- Black nodes alone represent **2-nodes** (1 key, 2 children).\n\nRed-Black rotations and color flips are simply the binary implementation of 2-3-4 node splits!',
          bn: 'ট্রি আর্কিটেকচারের সবচেয়ে গভীর তাত্ত্বিক সত্যটি হলো:\n\n> **প্রতিটি রেড-ব্ল্যাক ট্রি কাঠামোগতভাবে একটি ২-৩-৪ মাল্টিওয়ে ট্রির হুবহু সমতুল্য (Isometric)!**\n\n- একটি BLACK নোডের সাথে **একটি RED সন্তান** থাকলে তারা পাশাপাশি মিলে একটি **৩-নোড** তৈরি করে (২টি কি, ৩টি সন্তান)।\n- একটি BLACK নোডের সাথে **দুটি RED সন্তান** থাকলে তারা মিলে একটি **৪-নোড** তৈরি করে (৩টি কি, ৪টি সন্তান)।\n- কেবল BLACK নোডটি নির্দেশ করে সাধারণ **২-নোড** (১টি কি, ২টি সন্তান)।\n\nরেড-ব্ল্যাক ট্রির কালার ফ্লিপ এবং রোটেশন মূলত ২-৩-৪ ট্রির নোড স্প্লিটের বাইনারি রূপ!',
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
        title: { en: 'Real-World Production Uses of Red-Black Trees', bn: 'বাস্তব জগতে রেড-ব্ল্যাক ট্রির প্রয়োগ' },
        explanation: {
          en: 'Why is Red-Black tree preferred over AVL tree in standard libraries?\n- **AVL Trees** are more rigidly balanced (faster for pure lookup / read-heavy tasks).\n- **Red-Black Trees** require fewer rotations during frequent insertions and deletions, making them faster for dynamic write-heavy workloads.\n\n### Where Red-Black Trees Run the World:\n1. **C++ STL**: `std::map`, `std::set`, `std::multimap`\n2. **Java Collections**: `java.util.TreeMap`, `java.util.TreeSet`\n3. **Linux Kernel**: Completely Fair Scheduler (CFS) prioritizes running processes using a Red-Black tree!\n4. **epoll / Virtual Memory**: Linux kernel tracks memory regions (vm_area_struct) using Red-Black trees.',
          bn: 'প্রোগ্রামিং ভাষার স্ট্যান্ডার্ড লাইব্রেরিতে AVL ট্রির চেয়ে রেড-ব্ল্যাক ট্রি কেন বেশি ব্যবহৃত হয়?\n- **AVL ট্রি** অত্যন্ত কঠোরভাবে ব্যালান্সড (যা রিড বা সার্চ-প্রধান কাজের জন্য কিছুটা দ্রুত)।\n- **রেড-ব্ল্যাক ট্রিতে** ইনসার্ট ও ডিলিটে রোটেশন অনেক কম লাগে, ফলে ঘনঘন পরিবর্তনশীল ডেটায় এটি অনেক দ্রুত কাজ করে।\n\n### বাস্তব প্রযুক্তিতে প্রয়োগ:\n১. **C++ STL**: `std::map`, `std::set`, `std::multiset` এর পেছনে রেড-ব্ল্যাক ট্রি চলে।\n২. **Java**: `java.util.TreeMap` এবং `TreeSet` রেড-ব্ল্যাক ট্রি দিয়ে তৈরি।\n৩. **লিনাক্স কার্নেল**: লিনাক্সের প্রসেস শিডিউলার (CFS) সব প্রক্রিয়া রেড-ব্ল্যাক ট্রির মাধ্যমে নিয়ন্ত্রণ করে!\n৪. **ভার্চুয়াল মেমোরি**: মেমোরি পেজ ও ম্যাপ ব্যবস্থাপনায় লিনাক্স রেড-ব্ল্যাক ট্রি ব্যবহার করে।',
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
