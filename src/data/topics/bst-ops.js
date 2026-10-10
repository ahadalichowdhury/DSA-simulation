/**
 * Binary Search Trees (BST): Properties, Operations & Recursive Metrics
 * Covers: BST Definition & Invariant, In-Order Monotonic Sort,
 * BST Search & Trailing-Pointer Insertion, All 3 Deletion Cases
 * (Degree 0, Degree 1, Degree 2 with In-Order Predecessor / Successor),
 * and Post-Order Recursive Tree Metrics (Count, Leaves, Degree-2, Height, Sum).
 * Grounded in: binary-search-trees-traversals-guide.pdf & data-structures-binary-trees-guide.pdf
 */

export const bstOpsTopics = [
  {
    id: 'bst-fundamentals',
    name: { en: 'BST Definition & Invariants', bn: 'BST সংজ্ঞা ও মৌলিক ধর্ম' },
    description: {
      en: 'The BST rule (smaller left, bigger right) and why it is fast',
      bn: 'BST-র নিয়ম (ছোট বামে, বড় ডানে) আর এটা কেন দ্রুত'
    },
    categoryKey: 'trees',
    subgroupKey: 'bst',
    level: 'intermediate',
    order: 10,
    icon: '🔍',
    complexity: {
      time: 'O(log n) balanced, O(n) skewed',
      space: 'O(h)',
      note: {
        en: 'A balanced BST delivers O(log n) search, insert, and delete. If skewed, operations degrade to O(n). In-Order traversal strictly produces sorted keys.',
        bn: 'ব্যালান্সড BST O(log n) সময়ে সার্চ ও ইনসার্ট করে। স্কিউড হলে তা O(n) হয়। ইন-অর্ডারে উপাদানগুলো ছোট থেকে বড় সর্টেড আসে।'
      }
    },
    code: {
      pseudo: {
        en: [
          "// Validate Binary Search Tree Property",
          "function isValidBST(root, minVal, maxVal):",
          "  if root == null: return true",
          "  if root.data <= minVal or root.data >= maxVal:",
          "    return false // BST Invariant Violated!",
          "  return isValidBST(root.left, minVal, root.data) and \\",
          "         isValidBST(root.right, root.data, maxVal)",
          "",
          "// Golden Theorem: In-Order of BST is strictly monotonic sorted:",
          "// inOrder(root) -> 10, 15, 20, 30, 40, 50, 60"
        ],
        bn: [
          "// বাইনারি সার্চ ট্রির শর্ত যাচাই",
          "function isValidBST(root, minVal, maxVal):",
          "  if root == null: return true",
          "  if root.data <= minVal or root.data >= maxVal:",
          "    return false // BST শর্ত ভঙ্গ হয়েছে!",
          "  return isValidBST(root.left, minVal, root.data) and \\",
          "         isValidBST(root.right, root.data, maxVal)",
          "",
          "// মহাসত্য উপপাদ্য: BST-এর ইন-অর্ডার সর্বদা ছোট থেকে বড় সর্টেড:",
          "// inOrder(root) -> 10, 15, 20, 30, 40, 50, 60"
        ]
      },
      js: {
        en: [
          "// JavaScript Validate BST",
          "function isValidBST(root, min = -Infinity, max = Infinity) {",
          "  if (!root) return true;",
          "  if (root.data <= min || root.data >= max) {",
          "    return false;",
          "  }",
          "  return isValidBST(root.left, min, root.data) &&",
          "         isValidBST(root.right, root.data, max);",
          "}",
          "// In-order traversal visits keys in strictly increasing order"
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট ভ্যালিডেট BST",
          "function isValidBST(root, min = -Infinity, max = Infinity) {",
          "  if (!root) return true;",
          "  if (root.data <= min || root.data >= max) {",
          "    return false;",
          "  }",
          "  return isValidBST(root.left, min, root.data) &&",
          "         isValidBST(root.right, root.data, max);",
          "}",
          "// ইন-অর্ডার ট্রাভার্সাল নোডগুলোকে ছোট থেকে বড় ক্রমে আনে"
        ]
      },
      java: {
        en: [
          "// Java Validate BST",
          "boolean isValidBST(Node root, long min, long max) {",
          "  if (root == null) return true;",
          "  if (root.data <= min || root.data >= max) {",
          "    return false;",
          "  }",
          "  return isValidBST(root.left, min, root.data) &&",
          "         isValidBST(root.right, root.data, max);",
          "}",
          "// Sorted output guaranteed by In-Order"
        ],
        bn: [
          "// জাভা ভ্যালিডেট BST",
          "boolean isValidBST(Node root, long min, long max) {",
          "  if (root == null) return true;",
          "  if (root.data <= min || root.data >= max) {",
          "    return false;",
          "  }",
          "  return isValidBST(root.left, min, root.data) &&",
          "         isValidBST(root.right, root.data, max);",
          "}",
          "// ইন-অর্ডার সর্বদা সর্টেড ক্রম প্রদান করে"
        ]
      },
      python: {
        en: [
          "# Python Validate BST",
          "def is_valid_bst(root, min_val=float(\"-inf\"), max_val=float(\"inf\")):",
          "  if not root: return True",
          "  if root.data <= min_val or root.data >= max_val:",
          "    return False",
          "  return is_valid_bst(root.left, min_val, root.data) and \\",
          "         is_valid_bst(root.right, root.data, max_val)",
          "",
          "# In-order yields sorted stream",
          ""
        ],
        bn: [
          "# পাইথন ভ্যালিডেট BST",
          "def is_valid_bst(root, min_val=float(\"-inf\"), max_val=float(\"inf\")):",
          "  if not root: return True",
          "  if root.data <= min_val or root.data >= max_val:",
          "    return False",
          "  return is_valid_bst(root.left, min_val, root.data) and \\",
          "         is_valid_bst(root.right, root.data, max_val)",
          "",
          "# ইন-অর্ডার সর্বদা সর্টেড ধারা দেয়",
          ""
        ]
      },
      cpp: {
        en: [
          "// C++ Validate BST",
          "bool isValidBST(Node* root, long long minVal = LLONG_MIN, long long maxVal = LLONG_MAX) {",
          "  if (!root) return true;",
          "  if (root->data <= minVal || root->data >= maxVal) {",
          "    return false;",
          "  }",
          "  return isValidBST(root->left, minVal, root->data) &&",
          "         isValidBST(root->right, root->data, maxVal);",
          "}",
          "// In-order traversal strictly sorts keys"
        ],
        bn: [
          "// সি++ ভ্যালিডেট BST",
          "bool isValidBST(Node* root, long long minVal = LLONG_MIN, long long maxVal = LLONG_MAX) {",
          "  if (!root) return true;",
          "  if (root->data <= minVal || root->data >= maxVal) {",
          "    return false;",
          "  }",
          "  return isValidBST(root->left, minVal, root->data) &&",
          "         isValidBST(root->right, root->data, maxVal);",
          "}",
          "// ইন-অর্ডার ট্রাভার্সাল কি-গুলোকে সর্ট করে"
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'The BST rule: smaller left, bigger right',
          bn: 'BST-র নিয়ম: ছোট বামে, বড় ডানে'
        },
        explanation: {
          en: 'A **Binary Search Tree (BST)** is a binary tree that keeps its values **in order** using one simple rule at every node:\n\n- everything in the **left** subtree is **smaller** than the node;\n- everything in the **right** subtree is **bigger** than the node.\n\nPick any node in the picture and check: all values to its lower-left are smaller, all to its lower-right are bigger.\n\n> **Common mistake:** it is not enough that the *children* are in order — **every** value in the whole left (or right) subtree must follow the rule.',
          bn: '**বাইনারি সার্চ ট্রি (BST)** হলো এমন বাইনারি ট্রি, যা প্রতিটা নোডে একটা সহজ নিয়ম মেনে মানগুলোকে **সাজিয়ে** রাখে:\n\n- **বাম** সাব-ট্রির সবকিছু নোডের চেয়ে **ছোট**;\n- **ডান** সাব-ট্রির সবকিছু নোডের চেয়ে **বড়**।\n\nছবির যেকোনো নোড বেছে মিলিয়ে দেখো: তার নিচে-বামের সব মান ছোট, নিচে-ডানের সব মান বড়।\n\n> **সাধারণ ভুল:** শুধু *চাইল্ড* ঠিক ক্রমে থাকলেই হয় না — পুরো বাম (বা ডান) সাব-ট্রির **প্রতিটা** মানকে নিয়ম মানতে হবে।'
        },
        line: 0,
        iteration: { i: 1, of: 4, label: { en: 'Invariant', bn: 'শর্ত' } },
        state: { leftRule: 'keys < root', rightRule: 'keys > root', duplicates: 'forbidden' },
        scene: {
          kind: 'tree',
          label: 'Valid BST: Left Subtree (< 30) ← Root 30 → Right Subtree (> 30)',
          root: {
            v: 30,
            sub: 'Root',
            l: { v: 15, sub: '< 30', l: { v: 10, sub: '< 15' }, r: { v: 20, sub: '> 15' } },
            r: { v: 50, sub: '> 30', l: { v: 40, sub: '< 50' }, r: { v: 60, sub: '> 50' } }
          },
          highlights: { current: 30, active: [15, 10, 20], visited: [50, 40, 60] },
          legend: [
            { label: 'Root 30', color: 'var(--yellow)' },
            { label: 'Left Subtree (< 30)', color: 'var(--cyan)' },
            { label: 'Right Subtree (> 30)', color: 'var(--green)' }
          ],
          note: 'Every single node in the left subtree is strictly less than 30; right subtree is strictly greater.'
        }
      },
      {
        title: {
          en: 'Inorder of a BST is sorted',
          bn: 'BST-র ইন-অর্ডার সাজানো'
        },
        explanation: {
          en: 'Because smaller values sit on the left and bigger on the right, an **inorder** walk (left → node → right) prints a BST in **sorted order**:\n\n`10, 15, 20, 30, 40, 50, 60`\n\n> **Why it matters:** this is the easiest way to **check** a BST (is the inorder sorted?) and to print its values in order for free.',
          bn: 'ছোট মান বামে আর বড় মান ডানে থাকে বলে, **ইন-অর্ডারে** (বাম → নোড → ডান) হাঁটলে BST **সাজানো ক্রমে** প্রিন্ট হয়:\n\n`10, 15, 20, 30, 40, 50, 60`\n\n> **কেন গুরুত্বপূর্ণ:** BST ঠিক আছে কিনা **যাচাইয়ের** এটাই সবচেয়ে সহজ উপায় (ইন-অর্ডার কি সাজানো?), আর বিনা খরচে মানগুলো ক্রমে প্রিন্ট করা যায়।'
        },
        line: 9,
        iteration: { i: 2, of: 4, label: { en: 'Sorted Order', bn: 'সর্টেড ক্রম' } },
        state: { inOrderOutput: '[10, 15, 20, 30, 40, 50, 60]', sorted: true },
        scene: {
          kind: 'array',
          label: 'In-Order Traversal Result: Sorted Order',
          cells: [10, 15, 20, 30, 40, 50, 60],
          showIndex: true,
          highlights: { sorted: [0, 1, 2, 3, 4, 5, 6] },
          note: 'In-Order guarantees strictly ascending sorted values without extra sorting passes.'
        }
      },
      {
        title: {
          en: 'Why a BST is fast',
          bn: 'BST কেন দ্রুত'
        },
        explanation: {
          en: 'In an ordinary binary tree you may have to look at **every** node to find a value. In a BST each comparison tells you which side to go, so you **throw away half** of what is left at each step.\n\n| | Ordinary binary tree | Balanced BST | BST shaped like a line |\n|---|---|---|---|\n| Search | look at all N | about **log₂ N** steps | N steps |\n| Insert | N | **log₂ N** | N |\n| Delete | N | **log₂ N** | N |\n\nFor 1,000,000 values: about **20** steps in a balanced BST instead of a million.',
          bn: 'সাধারণ বাইনারি ট্রিতে একটা মান খুঁজতে **প্রতিটা** নোড দেখতে হতে পারে। BST-তে প্রতিটা তুলনা বলে দেয় কোন দিকে যেতে হবে, তাই প্রতি ধাপে বাকি অংশের **অর্ধেক বাদ** পড়ে।\n\n| | সাধারণ বাইনারি ট্রি | ব্যালান্সড BST | লাইনের মতো BST |\n|---|---|---|---|\n| সার্চ | সব N টা দেখো | প্রায় **log₂ N** ধাপ | N ধাপ |\n| ইনসার্ট | N | **log₂ N** | N |\n| ডিলিট | N | **log₂ N** | N |\n\n১০,০০,০০০টা মানে: ব্যালান্সড BST-তে প্রায় **২০** ধাপ, দশ লাখ নয়।'
        },
        line: 0,
        iteration: { i: 3, of: 4, label: { en: 'Complexity', bn: 'জটিলতা' } },
        state: { balancedSearch: 'O(log N)', skewedSearch: 'O(N)', standardTree: 'O(N)' },
        scene: {
          kind: 'chart',
          label: { en: 'Nodes checked to find one key among N = 1,000,000', bn: 'N = 1,000,000 কী-র মধ্যে একটা খুঁজতে কতগুলো নোড দেখতে হয়' },
          max: 1000000,
          items: [
            { label: { en: 'Binary tree', bn: 'বাইনারি ট্রি' }, v: 1000000, color: 'var(--red)', note: { en: 'no order → check all', bn: 'ক্রম নেই → সব দেখো' } },
            { label: { en: 'Balanced BST', bn: 'ব্যালান্সড BST' }, v: 20, color: 'var(--green)', note: { en: 'halves every step', bn: 'প্রতি ধাপে অর্ধেক' } },
            { label: { en: 'Skewed BST', bn: 'হেলানো BST' }, v: 1000000, color: 'var(--red)', note: { en: 'a long chain', bn: 'লম্বা একটা চেইন' } }
          ],
          caption: { en: 'balanced BST: <b>20</b> checks instead of <b>1,000,000</b>', bn: 'ব্যালান্সড BST: <b>1,000,000</b>-এর বদলে মাত্র <b>20</b> বার' }
        }
      },
      {
        title: {
          en: 'Danger: sorted input makes a line',
          bn: 'বিপদ: সাজানো ইনপুট লাইন বানায়'
        },
        explanation: {
          en: 'Insert `10, 20, 30, 40, 50` in that order. Each new value is bigger than everything before it, so it always goes **right** — the tree becomes a straight line.\n\nNow searching is no better than checking a list one by one: **N** steps instead of log₂ N.\n\n> **The fix:** trees that rebalance themselves after every insert — **AVL** and **Red-Black** trees (next chapter).',
          bn: '`10, 20, 30, 40, 50` এই ক্রমে ইনসার্ট করো। প্রতিটা নতুন মান আগের সবার চেয়ে বড়, তাই সবসময় **ডানে** যায় — ট্রিটা একটা সোজা লাইন হয়ে যায়।\n\nএখন খোঁজা একটা লিস্ট একে একে দেখার চেয়ে ভালো নয়: log₂ N-এর বদলে **N** ধাপ।\n\n> **সমাধান:** এমন ট্রি যা প্রতিটা ইনসার্টের পর নিজেকে আবার ব্যালান্স করে — **AVL** আর **Red-Black** ট্রি (পরের অধ্যায়)।'
        },
        line: 4,
        iteration: { i: 4, of: 4, label: { en: 'Skewed Degeneration', bn: 'অবনতি' } },
        state: { inserted: '[10, 20, 30, 40, 50]', height: 4, shape: 'Linked List' },
        scene: {
          kind: 'tree',
          label: 'BST shaped like a line: Height = 4, behaves as a Linked List with O(N) search',
          root: {
            v: 10,
            r: {
              v: 20,
              r: {
                v: 30,
                r: {
                  v: 40,
                  r: { v: 50 }
                }
              }
            }
          },
          highlights: { current: 10, path: [10, 20, 30, 40, 50] },
          legend: [{ label: 'Degenerate Linear Chain', color: 'var(--red)' }],
          note: 'Sequential insertions completely ruin tree balance, leading to the necessity of AVL trees.'
        }
      }
    ]
  },

  {
    id: 'bst-search-insert',
    name: { en: 'BST Search & Insertion', bn: 'BST সার্চ ও ইনসার্ট' },
    description: {
      en: 'Find a value or add a new one by going left or right',
      bn: 'বামে-ডানে গিয়ে একটা মান খোঁজা বা নতুন মান যোগ করা'
    },
    categoryKey: 'trees',
    subgroupKey: 'bst',
    level: 'intermediate',
    order: 20,
    icon: '➕',
    complexity: {
      time: 'O(h) where h is height',
      space: 'O(1) iterative / O(h) recursive',
      note: {
        en: 'Trailing pointer r trails walking pointer t. When t falls off to null, r points to the exact parent node where the new child must be attached.',
        bn: 'পয়েন্টার t নিচে নামে এবং ট্রেইলিং পয়েন্টার r তার পেছনে থাকে। t যখন নাল-এ পড়ে, r তখন ঠিক সেই প্যারেন্টকে নির্দেশ করে যেখানে নতুন নোড জুড়তে হবে।'
      }
    },
    code: {
      pseudo: {
        en: [
          "// Iterative BST Insertion using Trailing Pointer r",
          "function insert(root, key):",
          "  t = root",
          "  r = null // Trailing parent pointer",
          "  if root == null: return new Node(key)",
          "  while t != null:",
          "    r = t",
          "    if key == t.data: return root // Duplicate key ignored",
          "    else if key < t.data: t = t.lchild",
          "    else: t = t.rchild",
          "  p = new Node(key)",
          "  if key < r.data: r.lchild = p",
          "  else: r.rchild = p",
          "  return root",
          "",
          ""
        ],
        bn: [
          "// ট্রেইলিং পয়েন্টার r দিয়ে ইটারেটিভ BST ইনসার্ট",
          "function insert(root, key):",
          "  t = root",
          "  r = null // ট্রেইলিং প্যারেন্ট পয়েন্টার",
          "  if root == null: return new Node(key)",
          "  while t != null:",
          "    r = t",
          "    if key == t.data: return root // ডুপ্লিকেট মান অগ্রাহ্য",
          "    else if key < t.data: t = t.lchild",
          "    else: t = t.rchild",
          "  p = new Node(key)",
          "  if key < r.data: r.lchild = p",
          "  else: r.rchild = p",
          "  return root",
          "",
          ""
        ]
      },
      js: {
        en: [
          "// JavaScript Iterative BST Insertion",
          "function insert(root, key) {",
          "  let t = root;",
          "  let r = null;",
          "  if (!root) return new Node(key);",
          "  while (t) {",
          "    r = t;",
          "    if (key === t.data) return root;",
          "    else if (key < t.data) t = t.lchild;",
          "    else t = t.rchild;",
          "  }",
          "  const p = new Node(key);",
          "  if (key < r.data) r.lchild = p;",
          "  else r.rchild = p;",
          "  return root;",
          "}"
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট ইটারেটিভ BST ইনসার্ট",
          "function insert(root, key) {",
          "  let t = root;",
          "  let r = null;",
          "  if (!root) return new Node(key);",
          "  while (t) {",
          "    r = t;",
          "    if (key === t.data) return root;",
          "    else if (key < t.data) t = t.lchild;",
          "    else t = t.rchild;",
          "  }",
          "  const p = new Node(key);",
          "  if (key < r.data) r.lchild = p;",
          "  else r.rchild = p;",
          "  return root;",
          "}"
        ]
      },
      java: {
        en: [
          "// Java Iterative BST Insertion",
          "Node insert(Node root, int key) {",
          "  Node t = root;",
          "  Node r = null;",
          "  if (root == null) return new Node(key);",
          "  while (t != null) {",
          "    r = t;",
          "    if (key == t.data) return root;",
          "    else if (key < t.data) t = t.lchild;",
          "    else t = t.rchild;",
          "  }",
          "  Node p = new Node(key);",
          "  if (key < r.data) r.lchild = p;",
          "  else r.rchild = p;",
          "  return root;",
          "}"
        ],
        bn: [
          "// জাভা ইটারেটিভ BST ইনসার্ট",
          "Node insert(Node root, int key) {",
          "  Node t = root;",
          "  Node r = null;",
          "  if (root == null) return new Node(key);",
          "  while (t != null) {",
          "    r = t;",
          "    if (key == t.data) return root;",
          "    else if (key < t.data) t = t.lchild;",
          "    else t = t.rchild;",
          "  }",
          "  Node p = new Node(key);",
          "  if (key < r.data) r.lchild = p;",
          "  else r.rchild = p;",
          "  return root;",
          "}"
        ]
      },
      python: {
        en: [
          "# Python Iterative BST Insertion",
          "def insert(root, key):",
          "  t = root",
          "  r = None",
          "  if not root: return Node(key)",
          "  while t:",
          "    r = t",
          "    if key == t.data: return root",
          "    elif key < t.data: t = t.lchild",
          "    else: t = t.rchild",
          "  p = Node(key)",
          "  if key < r.data: r.lchild = p",
          "  else: r.rchild = p",
          "  return root",
          "",
          ""
        ],
        bn: [
          "# পাইথন ইটারেটিভ BST ইনসার্ট",
          "def insert(root, key):",
          "  t = root",
          "  r = None",
          "  if not root: return Node(key)",
          "  while t:",
          "    r = t",
          "    if key == t.data: return root",
          "    elif key < t.data: t = t.lchild",
          "    else: t = t.rchild",
          "  p = Node(key)",
          "  if key < r.data: r.lchild = p",
          "  else: r.rchild = p",
          "  return root",
          "",
          ""
        ]
      },
      cpp: {
        en: [
          "// C++ Iterative BST Insertion",
          "Node* insert(Node* root, int key) {",
          "  Node* t = root;",
          "  Node* r = nullptr;",
          "  if (!root) return new Node(key);",
          "  while (t != nullptr) {",
          "    r = t;",
          "    if (key == t->data) return root;",
          "    else if (key < t->data) t = t->lchild;",
          "    else t = t->rchild;",
          "  }",
          "  Node* p = new Node(key);",
          "  if (key < r->data) r->lchild = p;",
          "  else r->rchild = p;",
          "  return root;",
          "}"
        ],
        bn: [
          "// সি++ ইটারেটিভ BST ইনসার্ট",
          "Node* insert(Node* root, int key) {",
          "  Node* t = root;",
          "  Node* r = nullptr;",
          "  if (!root) return new Node(key);",
          "  while (t != nullptr) {",
          "    r = t;",
          "    if (key == t->data) return root;",
          "    else if (key < t->data) t = t->lchild;",
          "    else t = t->rchild;",
          "  }",
          "  Node* p = new Node(key);",
          "  if (key < r->data) r->lchild = p;",
          "  else r->rchild = p;",
          "  return root;",
          "}"
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'Searching: go left or right',
          bn: 'সার্চ: বামে বা ডানে যাও'
        },
        explanation: {
          en: 'Search for **25**. At every node ask one question: *is 25 smaller or bigger than this?*\n\n1. At `30`: 25 < 30 → go **left** (everything on the right is bigger than 30, so it cannot be there).\n2. At `15`: 25 > 15 → go **right**.\n3. At `20`: 25 > 20 → go **right**.\n4. At `25`: **found!**\n\nOnly 4 nodes looked at, instead of all 7.',
          bn: '**25** খোঁজো। প্রতিটা নোডে একটাই প্রশ্ন: *25 কি এটার চেয়ে ছোট না বড়?*\n\n১. `30`-এ: 25 < 30 → **বামে** যাও (ডান দিকের সব 30-এর চেয়ে বড়, তাই সেখানে থাকতে পারে না)।\n২. `15`-এ: 25 > 15 → **ডানে** যাও।\n৩. `20`-এ: 25 > 20 → **ডানে** যাও।\n৪. `25`-এ: **পাওয়া গেছে!**\n\n৭টার বদলে মাত্র ৪টা নোড দেখা হলো।'
        },
        line: 5,
        iteration: { i: 1, of: 4, label: { en: 'Search 25', bn: 'সার্চ ২৫' } },
        state: { key: 25, current: 30, comparisons: 1, action: 'go left' },
        scene: {
          kind: 'tree',
          label: 'Searching for Key 25: 30 (left) → 15 (right) → 20 (right) → Found 25!',
          root: {
            v: 30,
            l: { v: 15, l: { v: 10 }, r: { v: 20, r: { v: 25 } } },
            r: { v: 50, l: { v: 40 }, r: { v: 60 } }
          },
          highlights: { path: [30, 15, 20], current: 25, dim: [50, 40, 60, 10] },
          legend: [
            { label: 'Search Path taken', color: 'var(--green)' },
            { label: 'Target key found (25)', color: 'var(--yellow)' },
            { label: 'Pruned branches', color: 'var(--text-muted)' }
          ],
          note: 'Binary Search property cuts the search space in half with every single branch.'
        }
      },
      {
        title: {
          en: 'Inserting: walk down with two pointers',
          bn: 'ইনসার্ট: দুটো পয়েন্টার নিয়ে নিচে নামো'
        },
        explanation: {
          en: 'Insert **35**. We walk down exactly like a search, using two names:\n\n- `t` — where we are **now**;\n- `r` — the node we were at **one step before** (the future parent).\n\n1. Start: `t = 30`, `r = null`.\n2. 35 > 30 → `r = 30`, `t` moves right to `50`.\n3. 35 < 50 → `r = 50`, `t` moves left to `40`.\n4. 35 < 40 → `r = 40`, `t` moves left to **`null`** — an empty spot!\n\n> **Why keep `r`?** When `t` becomes `null` we have lost track of the node above. `r` remembers it, so we can attach the new node there.',
          bn: '**35** ইনসার্ট করো। আমরা ঠিক সার্চের মতো নিচে নামি, দুটো নাম ব্যবহার করে:\n\n- `t` — আমরা **এখন** কোথায়;\n- `r` — **এক ধাপ আগে** যে নোডে ছিলাম (ভবিষ্যৎ প্যারেন্ট)।\n\n১. শুরু: `t = 30`, `r = null`।\n২. 35 > 30 → `r = 30`, `t` ডানে `50`-এ যায়।\n৩. 35 < 50 → `r = 50`, `t` বামে `40`-এ যায়।\n৪. 35 < 40 → `r = 40`, `t` বামে **`null`**-এ যায় — একটা খালি জায়গা!\n\n> **`r` কেন রাখি?** `t` যখন `null` হয়, ওপরের নোডটার খোঁজ হারিয়ে যায়। `r` সেটা মনে রাখে, তাই নতুন নোডটা সেখানে জোড়া যায়।'
        },
        line: 6,
        iteration: { i: 2, of: 4, label: { en: 'Trailing Pointer', bn: 'ট্রেইলিং পয়েন্টার' } },
        state: { key: 35, t: null, r: 40, decision: 'Attach to r (40)' },
        scene: {
          kind: 'tree',
          label: 'Pointer t reached NULL. Trailing pointer r holds the parent node 40!',
          root: {
            v: 30,
            l: { v: 15, l: { v: 10 }, r: { v: 20 } },
            r: { v: 50, l: { v: 40 }, r: { v: 60 } }
          },
          highlights: { current: 40, path: [30, 50, 40] },
          legend: [
            { label: 'Parent pointer r (40)', color: 'var(--yellow)' },
            { label: 'Traversal path taken', color: 'var(--cyan)' }
          ],
          note: 'Because t reached NULL, trailing pointer r is positioned at parent 40.'
        }
      },
      {
        title: {
          en: 'Attach the new node',
          bn: 'নতুন নোড জুড়ে দাও'
        },
        explanation: {
          en: 'Create the new node `35` and attach it below `r` (which is `40`):\n\n- 35 < 40 → it becomes the **left** child: `r.left = p`.\n- (If it were bigger, it would become the right child.)\n\nNothing else moves. Inserting costs only as many steps as the tree is tall.',
          bn: 'নতুন নোড `35` বানাও আর `r`-এর (মানে `40`-এর) নিচে জুড়ে দাও:\n\n- 35 < 40 → এটা **বাম** চাইল্ড হয়: `r.left = p`।\n- (বড় হলে ডান চাইল্ড হতো।)\n\nআর কিছুই নড়ে না। ইনসার্টে শুধু ট্রির উচ্চতার সমান ধাপ লাগে।'
        },
        line: 11,
        iteration: { i: 3, of: 4, label: { en: 'Link Node', bn: 'নোড লিঙ্ক' } },
        state: { newKey: 35, parent: 40, linkedAs: 'r.lchild = p' },
        scene: {
          kind: 'tree',
          label: 'New Node 35 inserted as Left Child of Parent 40',
          root: {
            v: 30,
            l: { v: 15, l: { v: 10 }, r: { v: 20 } },
            r: { v: 50, l: { v: 40, l: { v: 35 } }, r: { v: 60 } }
          },
          highlights: { insert: 35, current: 40 },
          legend: [
            { label: 'Parent r (40)', color: 'var(--yellow)' },
            { label: 'New Child Node (35)', color: 'var(--green)' }
          ],
          note: 'Node 35 is now a valid empty spot that keeps the BST rule.'
        }
      },
      {
        title: {
          en: 'Check: still sorted',
          bn: 'যাচাই: এখনো সাজানো'
        },
        explanation: {
          en: 'Print the tree in inorder after the insert:\n\n`10, 15, 20, 30, 35, 40, 50, 60`\n\n**35** landed exactly between 30 and 40 — without shifting any other value, unlike inserting into a sorted array.',
          bn: 'ইনসার্টের পর ট্রিটা ইন-অর্ডারে প্রিন্ট করো:\n\n`10, 15, 20, 30, 35, 40, 50, 60`\n\n**35** ঠিক 30 আর 40-এর মাঝে বসেছে — অন্য কোনো মান সরাতে হয়নি, সাজানো অ্যারেতে ইনসার্টের মতো নয়।'
        },
        line: 13,
        iteration: { i: 4, of: 4, label: { en: 'Verification', bn: 'যাচাই' } },
        state: { inOrder: '[10, 15, 20, 30, 35, 40, 50, 60]', sorted: true },
        scene: {
          kind: 'array',
          label: 'Updated In-Order: 35 naturally sorted between 30 and 40',
          cells: [10, 15, 20, 30, 35, 40, 50, 60],
          showIndex: true,
          highlights: { active: [4], sorted: [0, 1, 2, 3, 5, 6, 7] },
          pointers: [{ i: 4, label: 'new (35)', tone: 'yellow' }],
          note: 'BST preserves sorted order automatically without requiring full array re-sorting.'
        }
      }
    ]
  },

  {
    id: 'bst-successor-predecessor',
    name: { en: 'BST In-Order Successor & Predecessor', bn: 'BST ইন-অর্ডার উত্তরসূরি ও পূর্বসূরি' },
    description: {
      en: 'The next and previous value in sorted order',
      bn: 'সাজানো ক্রমে পরের আর আগের মান'
    },
    categoryKey: 'trees',
    subgroupKey: 'bst',
    level: 'intermediate',
    order: 25,
    icon: '↔️',
    complexity: {
      time: 'O(h)',
      space: 'O(1) iterative / O(h) recursive',
      note: {
        en: 'In a BST, in-order traversal yields sorted keys. The successor is the smallest key strictly greater than target; predecessor is greatest key strictly smaller than target.',
        bn: 'BST-তে ইন-অর্ডার ট্রাভার্সাল মানগুলোকে ছোট থেকে বড় সর্ট করে। উত্তরসূরি হলো টার্গেটের ঠিক পরের বড় মান এবং পূর্বসূরি হলো ঠিক আগের ছোট মান।'
      }
    },
    code: {
      pseudo: {
        en: [
          "// BST In-Order Successor and Predecessor",
          "function inSucc(p):",
          "  while p != null and p.lchild != null: p = p.lchild",
          "  return p // Minimum element in right subtree",
          "",
          "function inPre(p):",
          "  while p != null and p.rchild != null: p = p.rchild",
          "  return p // Maximum element in left subtree",
          "",
          "function getSuccessor(root, target):",
          "  if target.rchild != null: return inSucc(target.rchild)",
          "  succ = null; curr = root",
          "  while curr != target:",
          "    if target.data < curr.data:",
          "      succ = curr // Deepest ancestor turning left",
          "      curr = curr.lchild",
          "    else: curr = curr.rchild",
          "",
          "  return succ",
          ""
        ],
        bn: [
          "// BST ইন-অর্ডার উত্তরসূরি ও পূর্বসূরি",
          "function inSucc(p):",
          "  while p != null and p.lchild != null: p = p.lchild",
          "  return p // ডান সাবট্রির ক্ষুদ্রতম উপাদান",
          "",
          "function inPre(p):",
          "  while p != null and p.rchild != null: p = p.rchild",
          "  return p // বাম সাবট্রির বৃহত্তম উপাদান",
          "",
          "function getSuccessor(root, target):",
          "  if target.rchild != null: return inSucc(target.rchild)",
          "  succ = null; curr = root",
          "  while curr != target:",
          "    if target.data < curr.data:",
          "      succ = curr // বামে মোড় নেওয়া গভীরতম পূর্বপুরুষ",
          "      curr = curr.lchild",
          "    else: curr = curr.rchild",
          "",
          "  return succ",
          ""
        ]
      },
      js: {
        en: [
          "// JavaScript BST In-Order Successor & Predecessor",
          "function inSucc(p) {",
          "  while (p && p.lchild) p = p.lchild;",
          "  return p; // Minimum element in right subtree",
          "}",
          "function inPre(p) {",
          "  while (p && p.rchild) p = p.rchild;",
          "  return p; // Maximum element in left subtree",
          "}",
          "function getSuccessor(root, target) {",
          "  if (target && target.rchild) return inSucc(target.rchild);",
          "  let succ = null, curr = root;",
          "  while (curr && curr !== target) {",
          "    if (target.data < curr.data) {",
          "      succ = curr; // Deepest ancestor turning left",
          "      curr = curr.lchild;",
          "    } else curr = curr.rchild;",
          "  }",
          "  return succ;",
          "}"
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট BST ইন-অর্ডার উত্তরসূরি ও পূর্বসূরি",
          "function inSucc(p) {",
          "  while (p && p.lchild) p = p.lchild;",
          "  return p; // ডান সাবট্রির ক্ষুদ্রতম উপাদান",
          "}",
          "function inPre(p) {",
          "  while (p && p.rchild) p = p.rchild;",
          "  return p; // বাম সাবট্রির বৃহত্তম উপাদান",
          "}",
          "function getSuccessor(root, target) {",
          "  if (target && target.rchild) return inSucc(target.rchild);",
          "  let succ = null, curr = root;",
          "  while (curr && curr !== target) {",
          "    if (target.data < curr.data) {",
          "      succ = curr; // বামে মোড় নেওয়া গভীরতম পূর্বপুরুষ",
          "      curr = curr.lchild;",
          "    } else curr = curr.rchild;",
          "  }",
          "  return succ;",
          "}"
        ]
      },
      java: {
        en: [
          "// Java BST In-Order Successor & Predecessor",
          "public Node inSucc(Node p) {",
          "    while (p != null && p.lchild != null) p = p.lchild;",
          "    return p; // Minimum element in right subtree",
          "}",
          "public Node inPre(Node p) {",
          "    while (p != null && p.rchild != null) p = p.rchild;",
          "    return p; // Maximum element in left subtree",
          "}",
          "public Node getSuccessor(Node root, Node target) {",
          "    if (target != null && target.rchild != null) return inSucc(target.rchild);",
          "    Node succ = null; Node curr = root;",
          "    while (curr != null && curr != target) {",
          "        if (target.data < curr.data) {",
          "            succ = curr; // Deepest ancestor turning left",
          "            curr = curr.lchild;",
          "        } else curr = curr.rchild;",
          "    }",
          "    return succ;",
          "}"
        ],
        bn: [
          "// জাভা BST ইন-অর্ডার উত্তরসূরি ও পূর্বসূরি",
          "public Node inSucc(Node p) {",
          "    while (p != null && p.lchild != null) p = p.lchild;",
          "    return p; // ডান সাবট্রির ক্ষুদ্রতম উপাদান",
          "}",
          "public Node inPre(Node p) {",
          "    while (p != null && p.rchild != null) p = p.rchild;",
          "    return p; // বাম সাবট্রির বৃহত্তম উপাদান",
          "}",
          "public Node getSuccessor(Node root, Node target) {",
          "    if (target != null && target.rchild != null) return inSucc(target.rchild);",
          "    Node succ = null; Node curr = root;",
          "    while (curr != null && curr != target) {",
          "        if (target.data < curr.data) {",
          "            succ = curr; // বামে মোড় নেওয়া গভীরতম পূর্বপুরুষ",
          "            curr = curr.lchild;",
          "        } else curr = curr.rchild;",
          "    }",
          "    return succ;",
          "}"
        ]
      },
      python: {
        en: [
          "# Python BST In-Order Successor & Predecessor",
          "def in_succ(p):",
          "    while p and p.lchild: p = p.lchild",
          "    return p # Minimum element in right subtree",
          "    ",
          "def in_pre(p):",
          "    while p and p.rchild: p = p.rchild",
          "    return p # Maximum element in left subtree",
          "    ",
          "def get_successor(root, target):",
          "    if target and target.rchild: return in_succ(target.rchild)",
          "    succ = None; curr = root",
          "    while curr and curr != target:",
          "        if target.data < curr.data:",
          "            succ = curr # Deepest ancestor turning left",
          "            curr = curr.lchild",
          "        else: curr = curr.rchild",
          "    return succ",
          "    ",
          "    # O(h) Time Complexity, O(1) Auxiliary Space"
        ],
        bn: [
          "# পাইথন BST ইন-অর্ডার উত্তরসূরি ও পূর্বসূরি",
          "def in_succ(p):",
          "    while p and p.lchild: p = p.lchild",
          "    return p # ডান সাবট্রির ক্ষুদ্রতম উপাদান",
          "    ",
          "def in_pre(p):",
          "    while p and p.rchild: p = p.rchild",
          "    return p # বাম সাবট্রির বৃহত্তম উপাদান",
          "    ",
          "def get_successor(root, target):",
          "    if target and target.rchild: return in_succ(target.rchild)",
          "    succ = None; curr = root",
          "    while curr and curr != target:",
          "        if target.data < curr.data:",
          "            succ = curr # বামে মোড় নেওয়া গভীরতম পূর্বপুরুষ",
          "            curr = curr.lchild",
          "        else: curr = curr.rchild",
          "    return succ",
          "    ",
          "    # O(h) সময় জটিলতা, O(1) অতিরিক্ত স্পেস"
        ]
      },
      cpp: {
        en: [
          "// C++ BST In-Order Successor & Predecessor (Abdul Bari Textbook)",
          "Node* inSucc(Node* p) {",
          "    while (p && p->lchild) p = p->lchild;",
          "    return p; // Minimum element in right subtree",
          "}",
          "Node* inPre(Node* p) {",
          "    while (p && p->rchild) p = p->rchild;",
          "    return p; // Maximum element in left subtree",
          "}",
          "Node* getSuccessor(Node* root, Node* target) {",
          "    if (target && target->rchild) return inSucc(target->rchild);",
          "    Node* succ = nullptr; Node* curr = root;",
          "    while (curr && curr != target) {",
          "        if (target->data < curr->data) {",
          "            succ = curr; // Deepest ancestor turning left",
          "            curr = curr->lchild;",
          "        } else curr = curr->rchild;",
          "    }",
          "    return succ;",
          "}"
        ],
        bn: [
          "// সি++ BST ইন-অর্ডার উত্তরসূরি ও পূর্বসূরি (আব্দুল বারী পাঠ্যবই)",
          "Node* inSucc(Node* p) {",
          "    while (p && p->lchild) p = p->lchild;",
          "    return p; // ডান সাবট্রির ক্ষুদ্রতম উপাদান",
          "}",
          "Node* inPre(Node* p) {",
          "    while (p && p->rchild) p = p->rchild;",
          "    return p; // বাম সাবট্রির বৃহত্তম উপাদান",
          "}",
          "Node* getSuccessor(Node* root, Node* target) {",
          "    if (target && target->rchild) return inSucc(target->rchild);",
          "    Node* succ = nullptr; Node* curr = root;",
          "    while (curr && curr != target) {",
          "        if (target->data < curr->data) {",
          "            succ = curr; // বামে মোড় নেওয়া গভীরতম পূর্বপুরুষ",
          "            curr = curr->lchild;",
          "        } else curr = curr->rchild;",
          "    }",
          "    return succ;",
          "}"
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'Successor and predecessor',
          bn: 'সাকসেসর আর প্রিডেসেসর'
        },
        explanation: {
          en: 'Write the BST values in sorted order (its inorder): `20, 30, 40, 50, 60, 70, 80`.\n\n- The **successor** of a value is the **next** one in this list.\n- The **predecessor** is the **previous** one.\n\nFor **50**: predecessor = **40**, successor = **60**.\n\n> **Why it matters:** deleting a node with two children needs exactly one of these (next lessons).',
          bn: 'BST-র মানগুলো সাজানো ক্রমে লেখো (মানে তার ইন-অর্ডার): `20, 30, 40, 50, 60, 70, 80`।\n\n- কোনো মানের **সাকসেসর (successor)** হলো এই লিস্টে তার **পরের** মান।\n- **প্রিডেসেসর (predecessor)** হলো **আগের** মান।\n\n**50**-এর জন্য: প্রিডেসেসর = **40**, সাকসেসর = **60**।\n\n> **কেন গুরুত্বপূর্ণ:** দুই চাইল্ডওয়ালা নোড ডিলিট করতে ঠিক এদের একটা লাগে (পরের লেসনে)।'
        },
        line: 1,
        iteration: { i: 1, of: 5, label: { en: 'In-Order Property', bn: 'ইন-অর্ডার ধর্ম' } },
        state: { target: 50, inPre: 40, inSucc: 60, sortedOrder: '20, 30, 40, 50, 60, 70, 80' },
        scene: {
          kind: 'tree',
          label: 'In-Order Sorted Sequence: [20, 30, 40, 50, 60, 70, 80] — Predecessor (40) < Target (50) < Successor (60)',
          root: {
            v: 50,
            l: { v: 30, l: { v: 20 }, r: { v: 40 } },
            r: { v: 70, l: { v: 60 }, r: { v: 80 } }
          },
          highlights: { active: [50], target: [40, 60] },
          legend: [
            { label: 'Target Node (50)', color: 'var(--yellow)' },
            { label: 'Predecessor (40) & Successor (60)', color: 'var(--cyan)' }
          ],
          note: 'In-Order sequence: 20 → 30 → 40 → [50] → 60 → 70 → 80'
        }
      },
      {
        title: {
          en: 'Successor when there is a right subtree',
          bn: 'ডান সাব-ট্রি থাকলে সাকসেসর'
        },
        explanation: {
          en: 'If the node has a **right** child, its successor is the **smallest value on its right side**.\n\nFor `50`:\n1. step **once right** → `70`;\n2. then keep going **left** as long as you can → `60`.\n\nThe successor of 50 is **60**.\n\n> **Remember it as:** "one step right, then all the way left".',
          bn: 'নোডের **ডান** চাইল্ড থাকলে, তার সাকসেসর হলো **ডান দিকের সবচেয়ে ছোট মান**।\n\n`50`-এর জন্য:\n১. **একবার ডানে** → `70`;\n২. তারপর যতক্ষণ পারো **বামে** যাও → `60`।\n\n50-এর সাকসেসর **60**।\n\n> **এভাবে মনে রাখো:** "একবার ডানে, তারপর একদম বামে"।'
        },
        line: 3,
        iteration: { i: 2, of: 5, label: { en: 'Case 1: inSucc', bn: 'কেস ১: inSucc' } },
        state: { target: 50, rightChild: 70, leftmostLeaf: 60, successor: 60 },
        scene: {
          kind: 'tree',
          label: 'Case 1 (Right Subtree Exists): Target 50 → Right Child 70 → Leftmost Leaf 60 is Successor',
          root: {
            v: 50,
            sub: 'target',
            l: { v: 30, l: { v: 20 }, r: { v: 40 } },
            r: { v: 70, sub: 'rchild', l: { v: 60, sub: 'inSucc' }, r: { v: 80 } }
          },
          highlights: { active: [50], target: [70], ok: [60] },
          legend: [
            { label: 'Target (50)', color: 'var(--yellow)' },
            { label: 'Right Subtree Root (70)', color: 'var(--purple)' },
            { label: 'In-Order Successor (60)', color: 'var(--green)' }
          ],
          note: 'Walk right to 70, then follow lchild pointers to leftmost leaf: 60.'
        }
      },
      {
        title: {
          en: 'Predecessor when there is a left subtree',
          bn: 'বাম সাব-ট্রি থাকলে প্রিডেসেসর'
        },
        explanation: {
          en: 'The mirror image: if the node has a **left** child, its predecessor is the **biggest value on its left side**.\n\nFor `50`:\n1. step **once left** → `30`;\n2. then keep going **right** as long as you can → `40`.\n\nThe predecessor of 50 is **40**. ("One step left, then all the way right.")',
          bn: 'আয়নার উল্টো: নোডের **বাম** চাইল্ড থাকলে, তার প্রিডেসেসর হলো **বাম দিকের সবচেয়ে বড় মান**।\n\n`50`-এর জন্য:\n১. **একবার বামে** → `30`;\n২. তারপর যতক্ষণ পারো **ডানে** যাও → `40`।\n\n50-এর প্রিডেসেসর **40**। ("একবার বামে, তারপর একদম ডানে।")'
        },
        line: 7,
        iteration: { i: 3, of: 5, label: { en: 'Case 1: inPre', bn: 'কেস ১: inPre' } },
        state: { target: 50, leftChild: 30, rightmostLeaf: 40, predecessor: 40 },
        scene: {
          kind: 'tree',
          label: 'Case 1 for Predecessor: Target 50 → Left Child 30 → Rightmost Leaf 40 is Predecessor',
          root: {
            v: 50,
            sub: 'target',
            l: { v: 30, sub: 'lchild', l: { v: 20 }, r: { v: 40, sub: 'inPre' } },
            r: { v: 70, l: { v: 60 }, r: { v: 80 } }
          },
          highlights: { active: [50], target: [30], ok: [40] },
          legend: [
            { label: 'Target (50)', color: 'var(--yellow)' },
            { label: 'Left Subtree Root (30)', color: 'var(--purple)' },
            { label: 'In-Order Predecessor (40)', color: 'var(--green)' }
          ],
          note: 'Walk left to 30, then follow rchild pointers to rightmost leaf: 40.'
        }
      },
      {
        title: {
          en: 'Successor with no right subtree',
          bn: 'ডান সাব-ট্রি না থাকলে সাকসেসর'
        },
        explanation: {
          en: 'Now find the successor of **40**. It has **no right child**, so the trick above does not work. The answer is **above** it.\n\nWalk down from the root towards 40 and remember the last place you **turned left**:\n\n1. At `50`: 40 < 50 → turn **left**. Remember `50`.\n2. At `30`: 40 > 30 → turn right (do not update).\n3. Reached `40`. The last left turn was at **`50`**.\n\nSo the successor of 40 is **50** — matching the sorted list `… 40, 50 …`.',
          bn: 'এবার **40**-এর সাকসেসর খোঁজো। এর **কোনো ডান চাইল্ড নেই**, তাই ওপরের কৌশল কাজ করে না। উত্তরটা এর **ওপরে**।\n\nরুট থেকে 40-এর দিকে নামো আর শেষবার কোথায় **বামে মোড় নিয়েছ** মনে রাখো:\n\n১. `50`-এ: 40 < 50 → **বামে** মোড়। `50` মনে রাখো।\n২. `30`-এ: 40 > 30 → ডানে মোড় (আপডেট নয়)।\n৩. `40`-এ পৌঁছালাম। শেষ বামের মোড় ছিল **`50`**-এ।\n\nতাই 40-এর সাকসেসর **50** — সাজানো লিস্ট `… 40, 50 …`-এর সঙ্গে মিলে যায়।'
        },
        line: 14,
        iteration: { i: 4, of: 5, label: { en: 'Case 2: Ancestor Search', bn: 'কেস ২: পূর্বপুরুষ সার্চ' } },
        state: { target: 40, root: 50, candidateSucc: 50, result: 50 },
        scene: {
          kind: 'tree',
          label: 'Case 2 (No Right Subtree): Target 40 → Deepest Ancestor Turning Left is 50',
          root: {
            v: 50,
            sub: 'succ (50)',
            l: { v: 30, l: { v: 20 }, r: { v: 40, sub: 'target' } },
            r: { v: 70, l: { v: 60 }, r: { v: 80 } }
          },
          highlights: { active: [40], target: [30], ok: [50] },
          legend: [
            { label: 'Target Without Right Child (40)', color: 'var(--yellow)' },
            { label: 'Deepest Left-Turn Ancestor / Successor (50)', color: 'var(--green)' },
            { label: 'Right-Turn Ancestor (30)', color: 'var(--border)' }
          ],
          note: 'From root 50: 40 < 50 (turned LEFT -> candidate=50). From 30: 40 > 30 (turned RIGHT). Successor = 50.'
        }
      },
      {
        title: {
          en: 'Where this is used: deleting a node',
          bn: 'কোথায় লাগে: নোড ডিলিট'
        },
        explanation: {
          en: 'To delete a node with **two children** (like the root `50`), we replace its value with a neighbour in sorted order — either the **predecessor** (from the left) or the **successor** (from the right) — and then delete that neighbour instead, which is much easier.\n\nA small trick from Abdul Bari\'s lectures: take the replacement from the **taller** side.\n- left side taller → use the predecessor;\n- otherwise → use the successor.\n\nTaking from the taller side shortens it, which helps keep the tree from leaning.',
          bn: '**দুই চাইল্ডওয়ালা** নোড (যেমন রুট `50`) ডিলিট করতে, তার মান সাজানো ক্রমের একজন প্রতিবেশী দিয়ে বদলে দিই — **প্রিডেসেসর** (বাম থেকে) বা **সাকসেসর** (ডান থেকে) — তারপর সেই প্রতিবেশীকে ডিলিট করি, যেটা অনেক সহজ।\n\nআব্দুল বারির লেকচারের একটা ছোট কৌশল: বদলিটা নাও **লম্বা** দিক থেকে।\n- বাম দিক লম্বা → প্রিডেসেসর ব্যবহার করো;\n- নইলে → সাকসেসর।\n\nলম্বা দিক থেকে নিলে সেটা খাটো হয়, তাতে ট্রি এক দিকে হেলে পড়া কমে।'
        },
        line: 11,
        iteration: { i: 5, of: 5, label: { en: 'BST Deletion Application', bn: 'BST ডিলিট প্রয়োগ' } },
        state: { target: 50, leftHeight: 2, rightHeight: 2, chosen: 'inSucc(60)' },
        scene: {
          kind: 'tree',
          label: 'Application in BST Deletion: Compare height(left) vs height(right) to pick inPre (40) or inSucc (60)',
          root: {
            v: 50,
            sub: 'delete (50)',
            l: { v: 30, sub: 'h=2', l: { v: 20 }, r: { v: 40, sub: 'inPre' } },
            r: { v: 70, sub: 'h=2', l: { v: 60, sub: 'inSucc' }, r: { v: 80 } }
          },
          highlights: { current: 50, active: [40, 60] },
          legend: [
            { label: 'Node to Delete (50)', color: 'var(--yellow)' },
            { label: 'Candidate inPre (40) & inSucc (60)', color: 'var(--cyan)' }
          ],
          note: 'Height comparison: height(left) vs height(right) dynamically chooses between inPre and inSucc.'
        }
      }
    ]
  },

  {
    id: 'bst-deletion',
    name: { en: 'BST Deletion (All 3 Cases)', bn: 'BST ডিলিট (৩টি কেস)' },
    description: {
      en: 'Removing a value: leaf, one child, or two children',
      bn: 'মান সরানো: লিফ, এক চাইল্ড, বা দুই চাইল্ড'
    },
    categoryKey: 'trees',
    subgroupKey: 'bst',
    level: 'intermediate',
    order: 30,
    icon: '✂️',
    complexity: {
      time: 'O(h)',
      space: 'O(h) recursion call stack',
      note: {
        en: 'Case 3 replaces target value with its In-Order Predecessor (max in left subtree) or Successor (min in right subtree), reducing problem to deleting a degree 0 or 1 node.',
        bn: 'কেস ৩-তে টার্গেট নোডকে তার ইন-অর্ডার পূর্বসূরি বা উত্তরসূরি দিয়ে প্রতিস্থাপন করা হয়, যা সমস্যাটিকে সহজ ০ বা ১ ডিগ্রি ডিলিশনে পরিণত করে।'
      }
    },
    code: {
      pseudo: {
        en: [
          "// Recursive BST Deletion Handling All 3 Cases",
          "function deleteNode(p, key):",
          "  if p == null: return null",
          "  if key < p.data: p.lchild = deleteNode(p.lchild, key)",
          "  else if key > p.data: p.rchild = deleteNode(p.rchild, key)",
          "  else: // Node found!",
          "    if p.lchild == null and p.rchild == null: // Case 1: Leaf",
          "      free(p); return null",
          "    if p.lchild == null: // Case 2: One child (Right)",
          "      temp = p.rchild; free(p); return temp",
          "    if p.rchild == null: // Case 2: One child (Left)",
          "      temp = p.lchild; free(p); return temp",
          "    // Case 3: Two children -> Replace with In-order Successor",
          "    q = inSucc(p.rchild) // Min in right subtree",
          "    p.data = q.data",
          "    p.rchild = deleteNode(p.rchild, q.data)",
          "  return p"
        ],
        bn: [
          "// ৩টি কেস সহ রিকারসিভ BST ডিলিট অ্যালগরিদম",
          "function deleteNode(p, key):",
          "  if p == null: return null",
          "  if key < p.data: p.lchild = deleteNode(p.lchild, key)",
          "  else if key > p.data: p.rchild = deleteNode(p.rchild, key)",
          "  else: // নোডটি পাওয়া গেছে!",
          "    if p.lchild == null and p.rchild == null: // কেস ১: লিফ নোড",
          "      free(p); return null",
          "    if p.lchild == null: // কেস ২: এক সন্তান (ডান)",
          "      temp = p.rchild; free(p); return temp",
          "    if p.rchild == null: // কেস ২: এক সন্তান (বাম)",
          "      temp = p.lchild; free(p); return temp",
          "    // কেস ৩: দুই সন্তান -> ইন-অর্ডার উত্তরসূরি দিয়ে প্রতিস্থাপন",
          "    q = inSucc(p.rchild) // ডান পাশের সর্বনিম্ন নোড",
          "    p.data = q.data",
          "    p.rchild = deleteNode(p.rchild, q.data)",
          "  return p"
        ]
      },
      js: {
        en: [
          "// JavaScript Recursive BST Deletion",
          "function deleteNode(p, key) {",
          "  if (!p) return null;",
          "  if (key < p.data) p.lchild = deleteNode(p.lchild, key);",
          "  else if (key > p.data) p.rchild = deleteNode(p.rchild, key);",
          "  else {",
          "    if (!p.lchild && !p.rchild) return null;",
          "    if (!p.lchild) return p.rchild;",
          "    if (!p.rchild) return p.lchild;",
          "    const q = inSucc(p.rchild);",
          "    p.data = q.data;",
          "    p.rchild = deleteNode(p.rchild, q.data);",
          "  }",
          "  return p;",
          "}",
          "",
          ""
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট রিকারসিভ BST ডিলিট",
          "function deleteNode(p, key) {",
          "  if (!p) return null;",
          "  if (key < p.data) p.lchild = deleteNode(p.lchild, key);",
          "  else if (key > p.data) p.rchild = deleteNode(p.rchild, key);",
          "  else {",
          "    if (!p.lchild && !p.rchild) return null;",
          "    if (!p.lchild) return p.rchild;",
          "    if (!p.rchild) return p.lchild;",
          "    const q = inSucc(p.rchild);",
          "    p.data = q.data;",
          "    p.rchild = deleteNode(p.rchild, q.data);",
          "  }",
          "  return p;",
          "}",
          "",
          ""
        ]
      },
      java: {
        en: [
          "// Java Recursive BST Deletion",
          "Node deleteNode(Node p, int key) {",
          "  if (p == null) return null;",
          "  if (key < p.data) p.lchild = deleteNode(p.lchild, key);",
          "  else if (key > p.data) p.rchild = deleteNode(p.rchild, key);",
          "  else {",
          "    if (p.lchild == null && p.rchild == null) return null;",
          "    if (p.lchild == null) return p.rchild;",
          "    if (p.rchild == null) return p.lchild;",
          "    Node q = inSucc(p.rchild);",
          "    p.data = q.data;",
          "    p.rchild = deleteNode(p.rchild, q.data);",
          "  }",
          "  return p;",
          "}",
          "",
          ""
        ],
        bn: [
          "// জাভা রিকারসিভ BST ডিলিট",
          "Node deleteNode(Node p, int key) {",
          "  if (p == null) return null;",
          "  if (key < p.data) p.lchild = deleteNode(p.lchild, key);",
          "  else if (key > p.data) p.rchild = deleteNode(p.rchild, key);",
          "  else {",
          "    if (p.lchild == null && p.rchild == null) return null;",
          "    if (p.lchild == null) return p.rchild;",
          "    if (p.rchild == null) return p.lchild;",
          "    Node q = inSucc(p.rchild);",
          "    p.data = q.data;",
          "    p.rchild = deleteNode(p.rchild, q.data);",
          "  }",
          "  return p;",
          "}",
          "",
          ""
        ]
      },
      python: {
        en: [
          "# Python Recursive BST Deletion",
          "def delete_node(p, key):",
          "  if not p: return None",
          "  if key < p.data: p.lchild = delete_node(p.lchild, key)",
          "  elif key > p.data: p.rchild = delete_node(p.rchild, key)",
          "  else:",
          "    if not p.lchild and not p.rchild: return None",
          "    if not p.lchild: return p.rchild",
          "    if not p.rchild: return p.lchild",
          "    q = in_succ(p.rchild)",
          "    p.data = q.data",
          "    p.rchild = delete_node(p.rchild, q.data)",
          "  return p",
          "",
          "",
          "",
          ""
        ],
        bn: [
          "# পাইথন রিকারসিভ BST ডিলিট",
          "def delete_node(p, key):",
          "  if not p: return None",
          "  if key < p.data: p.lchild = delete_node(p.lchild, key)",
          "  elif key > p.data: p.rchild = delete_node(p.rchild, key)",
          "  else:",
          "    if not p.lchild and not p.rchild: return None",
          "    if not p.lchild: return p.rchild",
          "    if not p.rchild: return p.lchild",
          "    q = in_succ(p.rchild)",
          "    p.data = q.data",
          "    p.rchild = delete_node(p.rchild, q.data)",
          "  return p",
          "",
          "",
          "",
          ""
        ]
      },
      cpp: {
        en: [
          "// C++ Recursive BST Deletion",
          "Node* deleteNode(Node* p, int key) {",
          "  if (!p) return nullptr;",
          "  if (key < p->data) p->lchild = deleteNode(p->lchild, key);",
          "  else if (key > p->data) p->rchild = deleteNode(p->rchild, key);",
          "  else {",
          "    if (!p->lchild && !p->rchild) { delete p; return nullptr; }",
          "    if (!p->lchild) { Node* temp = p->rchild; delete p; return temp; }",
          "    if (!p->rchild) { Node* temp = p->lchild; delete p; return temp; }",
          "    Node* q = inSucc(p->rchild);",
          "    p->data = q->data;",
          "    p->rchild = deleteNode(p->rchild, q->data);",
          "  }",
          "  return p;",
          "}",
          "",
          ""
        ],
        bn: [
          "// সি++ রিকারসিভ BST ডিলিট",
          "Node* deleteNode(Node* p, int key) {",
          "  if (!p) return nullptr;",
          "  if (key < p->data) p->lchild = deleteNode(p->lchild, key);",
          "  else if (key > p->data) p->rchild = deleteNode(p->rchild, key);",
          "  else {",
          "    if (!p->lchild && !p->rchild) { delete p; return nullptr; }",
          "    if (!p->lchild) { Node* temp = p->rchild; delete p; return temp; }",
          "    if (!p->rchild) { Node* temp = p->lchild; delete p; return temp; }",
          "    Node* q = inSucc(p->rchild);",
          "    p->data = q->data;",
          "    p->rchild = deleteNode(p->rchild, q->data);",
          "  }",
          "  return p;",
          "}",
          "",
          ""
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'Case 1: delete a leaf',
          bn: 'কেস ১: লিফ ডিলিট'
        },
        explanation: {
          en: 'There are 3 cases, depending on how many children the node has. The easiest: **no children** (a leaf).\n\nDelete **10**: just tell its parent `15` "you no longer have that child" (set the link to `null`). Nothing else changes.',
          bn: 'নোডের কয়টা চাইল্ড আছে তার ওপর নির্ভর করে ৩টা কেস। সবচেয়ে সহজ: **কোনো চাইল্ড নেই** (লিফ)।\n\n**10** ডিলিট করো: শুধু তার প্যারেন্ট `15`-কে বলো "ওই চাইল্ড আর নেই" (লিংকটা `null` করো)। আর কিছুই বদলায় না।'
        },
        line: 6,
        iteration: { i: 1, of: 4, label: { en: 'Case 1 (Leaf)', bn: 'কেস ১ (লিফ)' } },
        state: { target: 10, degree: 0, action: 'Free node and return NULL' },
        scene: {
          kind: 'tree',
          label: 'Case 1: Deleting Leaf Node 10 (Degree 0) → Parent 15 sets left child to NULL',
          root: {
            v: 30,
            l: { v: 15, l: { v: 10, sub: 'delete' }, r: { v: 20 } },
            r: { v: 50, l: { v: 40 }, r: { v: 60 } }
          },
          highlights: { remove: 10, current: 15 },
          legend: [
            { label: 'Parent (15)', color: 'var(--yellow)' },
            { label: 'Leaf Node Being Deleted (10)', color: 'var(--red)' }
          ],
          note: 'Leaf node 10 has no children; parent 15 simply discards the link.'
        }
      },
      {
        title: {
          en: 'Case 2: delete a node with one child',
          bn: 'কেস ২: এক চাইল্ডওয়ালা নোড ডিলিট'
        },
        explanation: {
          en: 'If the node has **one child**, let the child take its place.\n\nExample: if `20` had only a right child `25`, then deleting `20` means: connect `15` directly to `25` (`15.right = 25`) and remove `20`.\n\nIt is like removing a link from a chain and joining the two ends. The BST rule still holds, because 25 was already on the correct side of 15.',
          bn: 'নোডের **একটা চাইল্ড** থাকলে, চাইল্ডটাকে তার জায়গায় বসাও।\n\nউদাহরণ: `20`-এর শুধু ডান চাইল্ড `25` থাকলে, `20` ডিলিট মানে: `15`-কে সরাসরি `25`-এর সঙ্গে জোড়ো (`15.right = 25`) আর `20` সরিয়ে দাও।\n\nচেইন থেকে একটা কড়া খুলে দুই মাথা জুড়ে দেওয়ার মতো। BST নিয়ম ঠিক থাকে, কারণ 25 আগে থেকেই 15-এর সঠিক দিকে ছিল।'
        },
        line: 8,
        iteration: { i: 2, of: 4, label: { en: 'Case 2 (Degree 1)', bn: 'কেস ২ (১ সন্তান)' } },
        state: { target: 20, degree: 1, bypassChild: 25, newParentLink: '15 → 25' },
        scene: {
          kind: 'tree',
          label: 'Case 2: Deleting Node 20 with 1 Child → Parent 15 bypasses directly to Child 25',
          root: {
            v: 30,
            l: { v: 15, r: { v: 20, sub: 'bypass', r: { v: 25 } } },
            r: { v: 50 }
          },
          highlights: { remove: 20, active: [25], current: 15 },
          legend: [
            { label: 'Parent 15', color: 'var(--yellow)' },
            { label: 'Node 20 (Removed)', color: 'var(--red)' },
            { label: 'Bypassed Child 25', color: 'var(--cyan)' }
          ],
          note: 'Grandchild 25 replaces parent 20 directly under node 15.'
        }
      },
      {
        title: {
          en: 'Case 3: delete a node with two children',
          bn: 'কেস ৩: দুই চাইল্ডওয়ালা নোড ডিলিট'
        },
        explanation: {
          en: 'Delete the root **30**, which has two subtrees. We cannot just remove it — the tree would fall into two pieces.\n\nTrick: **swap in a neighbour value**.\n1. Find its **successor** — the smallest value on the right side: `40` (or the predecessor `20` from the left side).\n2. **Copy 40** into the root\'s place.\n3. Now delete the old `40` down below. It has **at most one child** (it was the smallest on its side), so that is Case 1 or 2 — easy.',
          bn: 'রুট **30** ডিলিট করো, যার দুটো সাব-ট্রি। শুধু সরিয়ে দিলে চলবে না — ট্রিটা দুই টুকরো হয়ে যাবে।\n\nকৌশল: **একটা প্রতিবেশী মান বসিয়ে দাও**।\n১. তার **সাকসেসর** খোঁজো — ডান দিকের সবচেয়ে ছোট মান: `40` (বা বাম দিকের প্রিডেসেসর `20`)।\n২. রুটের জায়গায় **40 কপি** করো।\n৩. এবার নিচের পুরোনো `40` ডিলিট করো। এর **বড়জোর একটা চাইল্ড** (নিজের দিকে এটাই সবচেয়ে ছোট ছিল), তাই এটা কেস ১ বা ২ — সহজ।'
        },
        line: 13,
        iteration: { i: 3, of: 4, label: { en: 'Case 3 (Degree 2)', bn: 'কেস ৩ (২ সন্তান)' } },
        state: { target: 30, inOrderSuccessor: 40, strategy: 'Copy successor and delete original' },
        scene: {
          kind: 'tree',
          label: 'Case 3: Deleting 30 → Replaced by In-Order Successor 40 (Min of Right Subtree)',
          root: {
            v: 30,
            sub: 'replace w/ 40',
            l: { v: 15, l: { v: 10 }, r: { v: 20 } },
            r: { v: 50, l: { v: 40, sub: 'In-Succ' }, r: { v: 60 } }
          },
          highlights: { current: 30, active: [40], path: [50, 40] },
          legend: [
            { label: 'Target node (30)', color: 'var(--yellow)' },
            { label: 'In-Order Successor (40)', color: 'var(--cyan)' }
          ],
          note: 'Successor 40 is promoted into root position, preserving BST sorting order.'
        }
      },
      {
        title: {
          en: 'Case 3 result: still a valid BST',
          bn: 'কেস ৩-এর ফল: এখনো সঠিক BST'
        },
        explanation: {
          en: 'After the swap, the root is **40**:\n\n- everything on the left (`10, 15, 20`) is smaller than 40;\n- everything on the right (`50, 60`) is bigger than 40.\n\nInorder: `10, 15, 20, 40, 50, 60` — still sorted. Delete takes as many steps as the tree is tall.',
          bn: 'অদলবদলের পর রুট **40**:\n\n- বাম দিকের সব (`10, 15, 20`) 40-এর চেয়ে ছোট;\n- ডান দিকের সব (`50, 60`) 40-এর চেয়ে বড়।\n\nইন-অর্ডার: `10, 15, 20, 40, 50, 60` — এখনো সাজানো। ডিলিটে ট্রির উচ্চতার সমান ধাপ লাগে।'
        },
        line: 16,
        iteration: { i: 4, of: 4, label: { en: 'Tree Repaired', bn: 'ট্রি অক্ষত' } },
        state: { newRoot: 40, inOrder: '[10, 15, 20, 40, 50, 60]', validBST: true },
        scene: {
          kind: 'tree',
          label: 'Completed Deletion: Root is now 40. The BST rule still holds everywhere!',
          root: {
            v: 40,
            l: { v: 15, l: { v: 10 }, r: { v: 20 } },
            r: { v: 50, r: { v: 60 } }
          },
          highlights: { current: 40, active: [15, 50], visited: [10, 20, 60] },
          legend: [
            { label: 'New Root (40)', color: 'var(--yellow)' },
            { label: 'Subtree Nodes', color: 'var(--green)' }
          ],
          note: 'Tree remains a valid balanced Binary Search Tree.'
        }
      }
    ]
  },

  {
    id: 'recursive-tree-metrics',
    name: { en: 'Recursive Tree Analysis Metrics', bn: 'রিকারসিভ ট্রি মেট্রিক্স ও গণনা' },
    description: {
      en: 'Count nodes and leaves, find the height and sum with recursion',
      bn: 'রিকার্শন দিয়ে নোড আর লিফ গোনা, উচ্চতা আর যোগফল বের করা'
    },
    categoryKey: 'trees',
    subgroupKey: 'bst',
    level: 'intermediate',
    order: 40,
    icon: '📊',
    complexity: {
      time: 'O(n) touches all nodes',
      space: 'O(h) call stack',
      note: {
        en: 'All recursive tree metrics leverage Post-Order mechanics: solve subproblems on left and right subtrees first, then combine the answers at root.',
        bn: 'সব রিকারসিভ মেট্রিক্স পোস্ট-অর্ডার পদ্ধতিতে কাজ করে: প্রথমে বাম ও ডান সাব-ট্রি সমাধান হয়, তারপর রুটে যোগ করা হয়।'
      }
    },
    code: {
      pseudo: {
        en: [
          "// Recursive Tree Analysis Metrics (Post-Order Mechanics)",
          "function count(p):",
          "  if p == null: return 0",
          "  return count(p.lchild) + count(p.rchild) + 1",
          "",
          "function countLeaves(p):",
          "  if p == null: return 0",
          "  if p.lchild == null and p.rchild == null: return 1",
          "  return countLeaves(p.lchild) + countLeaves(p.rchild)",
          "",
          "function height(p):",
          "  if p == null: return -1 // or 0 for level count",
          "  return 1 + max(height(p.lchild), height(p.rchild))",
          "",
          "function sumTree(p):",
          "  if p == null: return 0",
          "  return sumTree(p.lchild) + sumTree(p.rchild) + p.data",
          ""
        ],
        bn: [
          "// রিকারসিভ ট্রি মেট্রিক্স (পোস্ট-অর্ডার মেকানিক্স)",
          "function count(p):",
          "  if p == null: return 0",
          "  return count(p.lchild) + count(p.rchild) + 1",
          "",
          "function countLeaves(p):",
          "  if p == null: return 0",
          "  if p.lchild == null and p.rchild == null: return 1",
          "  return countLeaves(p.lchild) + countLeaves(p.rchild)",
          "",
          "function height(p):",
          "  if p == null: return -1 // লেভেল গণনায় 0",
          "  return 1 + max(height(p.lchild), height(p.rchild))",
          "",
          "function sumTree(p):",
          "  if p == null: return 0",
          "  return sumTree(p.lchild) + sumTree(p.rchild) + p.data",
          ""
        ]
      },
      js: {
        en: [
          "// JavaScript Recursive Metrics",
          "function count(p) {",
          "  if (!p) return 0;",
          "  return count(p.lchild) + count(p.rchild) + 1;",
          "}",
          "function countLeaves(p) {",
          "  if (!p) return 0;",
          "  if (!p.lchild && !p.rchild) return 1;",
          "  return countLeaves(p.lchild) + countLeaves(p.rchild);",
          "}",
          "function height(p) {",
          "  if (!p) return -1;",
          "  return 1 + Math.max(height(p.lchild), height(p.rchild));",
          "}",
          "function sumTree(p) {",
          "  if (!p) return 0;",
          "  return sumTree(p.lchild) + sumTree(p.rchild) + p.data;",
          "}"
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট রিকারসিভ মেট্রিক্স",
          "function count(p) {",
          "  if (!p) return 0;",
          "  return count(p.lchild) + count(p.rchild) + 1;",
          "}",
          "function countLeaves(p) {",
          "  if (!p) return 0;",
          "  if (!p.lchild && !p.rchild) return 1;",
          "  return countLeaves(p.lchild) + countLeaves(p.rchild);",
          "}",
          "function height(p) {",
          "  if (!p) return -1;",
          "  return 1 + Math.max(height(p.lchild), height(p.rchild));",
          "}",
          "function sumTree(p) {",
          "  if (!p) return 0;",
          "  return sumTree(p.lchild) + sumTree(p.rchild) + p.data;",
          "}"
        ]
      },
      java: {
        en: [
          "// Java Recursive Metrics",
          "int count(Node p) {",
          "  if (p == null) return 0;",
          "  return count(p.lchild) + count(p.rchild) + 1;",
          "}",
          "int countLeaves(Node p) {",
          "  if (p == null) return 0;",
          "  if (p.lchild == null && p.rchild == null) return 1;",
          "  return countLeaves(p.lchild) + countLeaves(p.rchild);",
          "}",
          "int height(Node p) {",
          "  if (p == null) return -1;",
          "  return 1 + Math.max(height(p.lchild), height(p.rchild));",
          "}",
          "int sumTree(Node p) {",
          "  if (p == null) return 0;",
          "  return sumTree(p.lchild) + sumTree(p.rchild) + p.data;",
          "}"
        ],
        bn: [
          "// জাভা রিকারসিভ মেট্রিক্স",
          "int count(Node p) {",
          "  if (p == null) return 0;",
          "  return count(p.lchild) + count(p.rchild) + 1;",
          "}",
          "int countLeaves(Node p) {",
          "  if (p == null) return 0;",
          "  if (p.lchild == null && p.rchild == null) return 1;",
          "  return countLeaves(p.lchild) + countLeaves(p.rchild);",
          "}",
          "int height(Node p) {",
          "  if (p == null) return -1;",
          "  return 1 + Math.max(height(p.lchild), height(p.rchild));",
          "}",
          "int sumTree(Node p) {",
          "  if (p == null) return 0;",
          "  return sumTree(p.lchild) + sumTree(p.rchild) + p.data;",
          "}"
        ]
      },
      python: {
        en: [
          "# Python Recursive Metrics",
          "def count(p):",
          "  if not p: return 0",
          "  return count(p.lchild) + count(p.rchild) + 1",
          "",
          "def count_leaves(p):",
          "  if not p: return 0",
          "  if not p.lchild and not p.rchild: return 1",
          "  return count_leaves(p.lchild) + count_leaves(p.rchild)",
          "",
          "def height(p):",
          "  if not p: return -1",
          "  return 1 + max(height(p.lchild), height(p.rchild))",
          "",
          "def sum_tree(p):",
          "  if not p: return 0",
          "  return sum_tree(p.lchild) + sum_tree(p.rchild) + p.data",
          ""
        ],
        bn: [
          "# পাইথন রিকারসিভ মেট্রিক্স",
          "def count(p):",
          "  if not p: return 0",
          "  return count(p.lchild) + count(p.rchild) + 1",
          "",
          "def count_leaves(p):",
          "  if not p: return 0",
          "  if not p.lchild and not p.rchild: return 1",
          "  return count_leaves(p.lchild) + count_leaves(p.rchild)",
          "",
          "def height(p):",
          "  if not p: return -1",
          "  return 1 + max(height(p.lchild), height(p.rchild))",
          "",
          "def sum_tree(p):",
          "  if not p: return 0",
          "  return sum_tree(p.lchild) + sum_tree(p.rchild) + p.data",
          ""
        ]
      },
      cpp: {
        en: [
          "// C++ Recursive Metrics",
          "int count(Node* p) {",
          "  if (!p) return 0;",
          "  return count(p->lchild) + count(p->rchild) + 1;",
          "}",
          "int countLeaves(Node* p) {",
          "  if (!p) return 0;",
          "  if (!p->lchild && !p->rchild) return 1;",
          "  return countLeaves(p->lchild) + countLeaves(p->rchild);",
          "}",
          "int height(Node* p) {",
          "  if (!p) return -1;",
          "  return 1 + max(height(p->lchild), height(p->rchild));",
          "}",
          "int sumTree(Node* p) {",
          "  if (!p) return 0;",
          "  return sumTree(p->lchild) + sumTree(p->rchild) + p->data;",
          "}"
        ],
        bn: [
          "// সি++ রিকারসিভ মেট্রিক্স",
          "int count(Node* p) {",
          "  if (!p) return 0;",
          "  return count(p->lchild) + count(p->rchild) + 1;",
          "}",
          "int countLeaves(Node* p) {",
          "  if (!p) return 0;",
          "  if (!p->lchild && !p->rchild) return 1;",
          "  return countLeaves(p->lchild) + countLeaves(p->rchild);",
          "}",
          "int height(Node* p) {",
          "  if (!p) return -1;",
          "  return 1 + max(height(p->lchild), height(p->rchild));",
          "}",
          "int sumTree(Node* p) {",
          "  if (!p) return 0;",
          "  return sumTree(p->lchild) + sumTree(p->rchild) + p->data;",
          "}"
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'Measuring a tree with recursion',
          bn: 'রিকার্শন দিয়ে ট্রি মাপা'
        },
        explanation: {
          en: 'How do you count nodes, leaves, height or the total of a tree? One idea solves all of them:\n\n1. get the answer for the **left** subtree;\n2. get the answer for the **right** subtree;\n3. **combine** the two answers at the current node.\n\nAnd if the node is `null` (an empty tree), return a simple starting value, like 0.\n\n> This "children first, then the parent" order is exactly **postorder**.',
          bn: 'একটা ট্রির নোড, লিফ, উচ্চতা বা মোট যোগফল কীভাবে গুনবে? একটাই ধারণা সবগুলোর সমাধান করে:\n\n১. **বাম** সাব-ট্রির উত্তর বের করো;\n২. **ডান** সাব-ট্রির উত্তর বের করো;\n৩. বর্তমান নোডে দুটো উত্তর **মিলিয়ে** নাও।\n\nআর নোডটা `null` (খালি ট্রি) হলে একটা সহজ শুরুর মান ফেরত দাও, যেমন 0।\n\n> "আগে চাইল্ড, তারপর প্যারেন্ট" — এই ক্রমটাই হলো **পোস্ট-অর্ডার**।'
        },
        line: 1,
        iteration: { i: 1, of: 5, label: { en: 'Divide & Conquer', bn: 'ভাগ ও সমাধান' } },
        state: { formula: 'Combine(Left, Right) + Root', paradigm: 'Post-Order' },
        scene: {
          kind: 'tree',
          label: { en: 'count(node) = count(left) + count(right) + 1 — solved bottom-up', bn: 'count(node) = count(left) + count(right) + 1 — নিচ থেকে ওপরে' },
          root: { v: 50, sub: '3 + 3 + 1 = 7', l: { v: 30, sub: '1 + 1 + 1 = 3', l: { v: 20, sub: '0 + 0 + 1 = 1' }, r: { v: 40, sub: '0 + 0 + 1 = 1' } }, r: { v: 70, sub: '1 + 1 + 1 = 3', l: { v: 60, sub: '0 + 0 + 1 = 1' }, r: { v: 80, sub: '0 + 0 + 1 = 1' } } },
          highlights: { current: 50, visited: [20, 40, 30, 60, 80, 70] },
          output: [20, 40, 30, 60, 80, 70, 50],
          outputLabel: { en: 'Post-order (children are solved before their parent):', bn: 'পোস্ট-অর্ডার (প্যারেন্টের আগে চাইল্ডের হিসাব):' }
        }
      },
      {
        title: {
          en: 'Count all nodes',
          bn: 'সব নোড গোনো'
        },
        explanation: {
          en: '`count(node) = count(left) + count(right) + 1` (the **+1** is the node itself). An empty tree has 0 nodes.\n\nAt root `50`: the left side has 3 nodes, the right side has 3 nodes, so 3 + 3 + 1 = **7**.',
          bn: '`count(node) = count(left) + count(right) + 1` (**+1** হলো নোডটা নিজে)। খালি ট্রিতে 0টা নোড।\n\nরুট `50`-এ: বাম দিকে ৩টা, ডান দিকে ৩টা, তাই 3 + 3 + 1 = **7**।'
        },
        line: 3,
        iteration: { i: 2, of: 5, label: { en: 'Count Nodes', bn: 'নোড সংখ্যা' } },
        state: { leftCount: 3, rightCount: 3, totalNodes: 7 },
        scene: {
          kind: 'tree',
          label: 'Total Nodes: Left (3) + Right (3) + Root (1) = 7 Nodes',
          root: {
            v: 50,
            sub: 'sum: 7',
            l: { v: 20, sub: 'sum: 3', l: { v: 10, sub: '1' }, r: { v: 30, sub: '1' } },
            r: { v: 70, sub: 'sum: 3', l: { v: 60, sub: '1' }, r: { v: 80, sub: '1' } }
          },
          highlights: { current: 50, active: [20, 70], visited: [10, 30, 60, 80] },
          legend: [
            { label: 'Root (1)', color: 'var(--yellow)' },
            { label: 'Subtree roots', color: 'var(--cyan)' },
            { label: 'Base case leaves (1 each)', color: 'var(--green)' }
          ],
          note: 'Values bubble up from leaves to root: 1 + 1 + 1 = 3 on each side.'
        }
      },
      {
        title: {
          en: 'Count the leaves',
          bn: 'লিফ গোনো'
        },
        explanation: {
          en: 'A leaf is a node with no children. So:\n- empty → 0;\n- a node with **no children** → 1 (it is a leaf);\n- otherwise → leaves on the left + leaves on the right.\n\nLeaves here: `10, 30, 60, 80` → **4**.\n\n> Check with the rule from Tree Math: leaves = nodes with two children + 1 → 4 = 3 + 1 ✓.',
          bn: 'লিফ মানে যে নোডের কোনো চাইল্ড নেই। তাই:\n- খালি → 0;\n- **কোনো চাইল্ড নেই** এমন নোড → 1 (এটাই লিফ);\n- নইলে → বাম দিকের লিফ + ডান দিকের লিফ।\n\nএখানে লিফ: `10, 30, 60, 80` → **4**টা।\n\n> ট্রি গণিতের নিয়ম দিয়ে যাচাই: লিফ = দুই চাইল্ডওয়ালা নোড + 1 → 4 = 3 + 1 ✓।'
        },
        line: 7,
        iteration: { i: 3, of: 5, label: { en: 'Count Leaves', bn: 'লিফ গণনা' } },
        state: { leavesCount: 4, degree2Count: 3, theoremVerified: '4 = 3 + 1' },
        scene: {
          kind: 'tree',
          label: 'Leaf Count = 4 (Green Nodes: 10, 30, 60, 80)',
          root: {
            v: 50,
            sub: 'N2',
            l: { v: 20, sub: 'N2', l: { v: 10, sub: 'Leaf' }, r: { v: 30, sub: 'Leaf' } },
            r: { v: 70, sub: 'N2', l: { v: 60, sub: 'Leaf' }, r: { v: 80, sub: 'Leaf' } }
          },
          highlights: { visited: [10, 30, 60, 80], active: [20, 70], current: 50 },
          legend: [
            { label: 'Leaf Nodes (N0 = 4)', color: 'var(--green)' },
            { label: 'Internal Nodes (N2 = 3)', color: 'var(--cyan)' }
          ],
          note: 'Only leaves return 1; internal nodes simply pass up the sum of their children.'
        }
      },
      {
        title: {
          en: 'Find the height',
          bn: 'উচ্চতা বের করো'
        },
        explanation: {
          en: '`height(node) = 1 + max(height(left), height(right))` — take the **taller** side and add the one edge down to it. An empty tree has height **−1**, so a single leaf gets 1 + (−1) = 0.\n\n- leaves → 0;\n- `20` and `70` → 1 + max(0, 0) = 1;\n- root `50` → 1 + max(1, 1) = **2**.\n\nThe longest path from the root down has **2 edges**.',
          bn: '`height(node) = 1 + max(height(left), height(right))` — **লম্বা** দিকটা নাও আর সেখানে নামার একটা এজ যোগ করো। খালি ট্রির উচ্চতা **−1**, তাই একটা লিফ পায় 1 + (−1) = 0।\n\n- লিফ → 0;\n- `20` আর `70` → 1 + max(0, 0) = 1;\n- রুট `50` → 1 + max(1, 1) = **2**।\n\nরুট থেকে নিচের সবচেয়ে লম্বা পথে **২টা এজ**।'
        },
        line: 11,
        iteration: { i: 4, of: 5, label: { en: 'Tree Height', bn: 'ট্রির উচ্চতা' } },
        state: { leafHeight: 0, internalHeight: 1, rootHeight: 2 },
        scene: {
          kind: 'tree',
          label: 'Tree Height = 2: Maximum of left and right child heights + 1',
          root: {
            v: 50,
            sub: 'h = 2',
            l: { v: 20, sub: 'h = 1', l: { v: 10, sub: 'h = 0' }, r: { v: 30, sub: 'h = 0' } },
            r: { v: 70, sub: 'h = 1', l: { v: 60, sub: 'h = 0' }, r: { v: 80, sub: 'h = 0' } }
          },
          highlights: { current: 50, active: [20, 70], visited: [10, 30, 60, 80] },
          legend: [
            { label: 'Height 2 (Root)', color: 'var(--yellow)' },
            { label: 'Height 1', color: 'var(--cyan)' },
            { label: 'Height 0 (Leaves)', color: 'var(--green)' }
          ],
          note: 'Height measures longest downward path to any leaf.'
        }
      },
      {
        title: {
          en: 'Add up all values',
          bn: 'সব মান যোগ করো'
        },
        explanation: {
          en: '`sum(node) = sum(left) + sum(right) + node.value`. An empty tree adds 0.\n\n- left side: 10 + 20 + 30 = 60;\n- right side: 60 + 70 + 80 = 210;\n- total: 60 + 210 + 50 = **320**.\n\n> Every one of these visits each node once: **O(N)** time.',
          bn: '`sum(node) = sum(left) + sum(right) + node.value`। খালি ট্রি 0 যোগ করে।\n\n- বাম দিক: 10 + 20 + 30 = 60;\n- ডান দিক: 60 + 70 + 80 = 210;\n- মোট: 60 + 210 + 50 = **320**।\n\n> এগুলোর প্রতিটা প্রতিটা নোড একবার দেখে: **O(N)** সময়।'
        },
        line: 14,
        iteration: { i: 5, of: 5, label: { en: 'Sum Values', bn: 'যোগফল' } },
        state: { leftSum: 60, rightSum: 210, rootValue: 50, totalSum: 320 },
        scene: {
          kind: 'tree',
          label: 'Sum of Elements: Left (60) + Right (210) + Root (50) = 320',
          root: {
            v: 50,
            sub: 'total: 320',
            l: { v: 20, sub: 'sum: 60', l: { v: 10 }, r: { v: 30 } },
            r: { v: 70, sub: 'sum: 210', l: { v: 60 }, r: { v: 80 } }
          },
          highlights: { current: 50, active: [20, 70], visited: [10, 30, 60, 80] },
          legend: [
            { label: 'Root 50', color: 'var(--yellow)' },
            { label: 'Left Subtree (Sum 60)', color: 'var(--cyan)' },
            { label: 'Right Subtree (Sum 210)', color: 'var(--green)' }
          ],
          note: 'Values accumulate smoothly up the call stack to produce the grand total 320.'
        }
      }
    ]
  }
];
