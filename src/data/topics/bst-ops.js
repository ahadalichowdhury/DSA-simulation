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
      en: 'Left < Root < Right invariant, monotonic sorted order, and BST vs Binary Tree complexity',
      bn: 'বাম < রুট < ডান নিয়ম, মোনোটনিক সাজানো ক্রম এবং বাইনারি ট্রির সাথে তুলনা'
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
          "  return isValidBST(root.lchild, min, root.data) &&",
          "         isValidBST(root.rchild, root.data, max);",
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
          "  return isValidBST(root.lchild, min, root.data) &&",
          "         isValidBST(root.rchild, root.data, max);",
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
          "  return isValidBST(root->lchild, minVal, root->data) &&",
          "         isValidBST(root->rchild, root->data, maxVal);",
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
          "  return isValidBST(root->lchild, minVal, root->data) &&",
          "         isValidBST(root->rchild, root->data, maxVal);",
          "}",
          "// ইন-অর্ডার ট্রাভার্সাল কি-গুলোকে সর্ট করে"
        ]
      }
    },
    steps: [
      {
        title: { en: 'The BST Invariant: Left < Root < Right', bn: 'BST-এর মূল শর্ত: বাম < রুট < ডান' },
        explanation: {
          en: 'A **Binary Search Tree (BST)** is a binary tree where every node satisfies the following ordering rule:\n1. All keys in the **left subtree** must be strictly **smaller** than the node\'s key.\n2. All keys in the **right subtree** must be strictly **greater** than the node\'s key.\n3. Both subtrees must also be valid BSTs.\n4. **No duplicate keys** are allowed.',
          bn: '**বাইনারি সার্চ ট্রি (BST)** হলো এমন একটি বাইনারি ট্রি যার প্রতিটি নোড নিচের শর্ত পালন করে:\n১. নোডের **বাম সাব-ট্রির** সমস্ত মান নোডের চেয়ে কঠোরভাবে **ছোট** হতে হবে।\n২. নোডের **ডান সাব-ট্রির** সমস্ত মান নোডের চেয়ে কঠোরভাবে **বড়** হতে হবে।\n৩. বাম ও ডান উভয় সাব-ট্রিকেও পৃথকভাবে ভ্যালিড BST হতে হবে।\n৪. কোনো **ডুপ্লিকেট মান** অনুমোদিত নয়।'
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
        title: { en: 'Monotonic In-Order Traversal Theorem', bn: 'ইন-অর্ডারের মোনোটনিক সর্টেড উপপাদ্য' },
        explanation: {
          en: '### The Golden Theorem of BSTs:\nPerforming an **In-Order traversal** (Left → Root → Right) on a BST always visits nodes in **strictly monotonically increasing sorted order**!\n\nTrace for this tree:\n`In-Order = [10, 15, 20, 30, 40, 50, 60]`\n\nThis makes BST the ideal in-memory structure for dynamic datasets that need fast sorting and range searches.',
          bn: '### BST-এর স্বর্ণ উপপাদ্য:\nযেকোনো বাইনারি সার্চ ট্রিতে **ইন-অর্ডার ট্রাভার্সাল** (বাম → রুট → ডান) চালালে উপাদানগুলো সর্বদা **ছোট থেকে বড় নিখুঁত সর্টেড ক্রমে** আসে!\n\nএই ট্রির ইন-অর্ডার ফল:\n`ইন-অর্ডার = [10, 15, 20, 30, 40, 50, 60]`\n\nএ কারণেই ডাইনামিক ডেটা সর্ট রাখা এবং রেঞ্জ কোয়েরি করার জন্য BST একটি অতুলনীয় ডেটা স্ট্রাকচার।'
        },
        line: 9,
        iteration: { i: 2, of: 4, label: { en: 'Sorted Order', bn: 'সর্টেড ক্রম' } },
        state: { inOrderOutput: '[10, 15, 20, 30, 40, 50, 60]', sorted: true },
        scene: {
          kind: 'array',
          label: 'In-Order Traversal Result: Monotonically Sorted Sequence',
          cells: [10, 15, 20, 30, 40, 50, 60],
          showIndex: true,
          highlights: { sorted: [0, 1, 2, 3, 4, 5, 6] },
          note: 'In-Order guarantees strictly ascending sorted values without extra sorting passes.'
        }
      },
      {
        title: { en: 'BST vs Standard Binary Tree Complexity', bn: 'BST বনাম সাধারণ বাইনারি ট্রির তুলনা' },
        explanation: {
          en: 'Why convert an unordered binary tree into a BST?\n\n| Operation | Standard Binary Tree | Balanced BST ($h = \\log N$) | Skewed BST ($h = N-1$) |\n|---|---|---|---|\n| **Search** | $O(N)$ (Unordered scan) | **$O(\\log N)$** | $O(N)$ |\n| **Insert** | $O(1)$ (Any open leaf) | **$O(\\log N)$** | $O(N)$ |\n| **Delete** | $O(N)$ | **$O(\\log N)$** | $O(N)$ |\n| **Find Min/Max** | $O(N)$ | **$O(\\log N)$** | $O(N)$ |\n\nWhen balanced, BST slashes search times from seconds to microseconds!',
          bn: 'সাধারণ আনঅর্ডার্ড ট্রির চেয়ে BST কেন শতগুণ শ্রেয়?\n\n| অপারেশন | সাধারণ বাইনারি ট্রি | ব্যালান্সড BST ($h = \\log N$) | স্কিউড BST ($h = N-1$) |\n|---|---|---|---|\n| **সার্চ** | $O(N)$ (পুরো ট্রি খোঁজা) | **$O(\\log N)$** | $O(N)$ |\n| **ইনসার্ট** | $O(1)$ (যেকোনো লিফে) | **$O(\\log N)$** | $O(N)$ |\n| **ডিলিট** | $O(N)$ | **$O(\\log N)$** | $O(N)$ |\n| **Min / Max** | $O(N)$ | **$O(\\log N)$** | $O(N)$ |\n\nব্যালান্সড অবস্থায় BST সার্চের গতি মিলিসেকেন্ড থেকে মাইক্রোসেকেন্ডে নামিয়ে আনে!'
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
        title: { en: 'The Danger of Skewing: Why Self-Balancing is Needed', bn: 'স্কিউড হওয়ার ঝুঁকি: সেলফ-ব্যালান্সিং কেন জরুরি' },
        explanation: {
          en: 'What happens if we insert sorted keys `[10, 20, 30, 40, 50]` into a standard BST?\n\nEvery new node is greater than its parent, so it branches strictly to the right! The tree degenerates into a **linear linked list** with height $h = N - 1$.\n\nSearch time collapses from $O(\\log N)$ to $O(N)$. To prevent this catastrophic failure, computer scientists invented **AVL Trees and Red-Black Trees**!',
          bn: 'যদি একটি সাধারণ BST-তে আগে থেকেই সাজানো সংখ্যা `[10, 20, 30, 40, 50]` ঢোকানো হয়, তবে কী ঘটবে?\n\nপ্রতিটি নতুন সংখ্যা প্যারেন্টের চেয়ে বড় হওয়ায় তা কেবল ডান দিকেই যুক্ত হবে! ট্রিটি একপাশে হেলে **লিনিয়ার লিঙ্কড লিস্টে** পরিণত হয় যার উচ্চতা $h = N - 1$।\n\nসার্চ টাইম $O(\\log N)$ থেকে ভেঙে পড়ে $O(N)$ হয়ে যায়। এই বিপর্যয় রোধ করতেই বিজ্ঞানীরা আবিষ্কার করেছিলেন **AVL ট্রি ও রেড-ব্ল্যাক ট্রি**!'
        },
        line: 4,
        iteration: { i: 4, of: 4, label: { en: 'Skewed Degeneration', bn: 'অবনতি' } },
        state: { inserted: '[10, 20, 30, 40, 50]', height: 4, shape: 'Linked List' },
        scene: {
          kind: 'tree',
          label: 'Degenerated BST: Height = 4, behaves as a Linked List with O(N) search',
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
      en: 'Search mechanics and iterative insertion using the classic trailing-pointer technique',
      bn: 'সার্চ পদ্ধতি এবং ক্লাসিক ট্রেইলিং-পয়েন্টার কৌশল দিয়ে ইটারেটিভ ইনসার্ট'
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
          "function insert(key):",
          "  t = root",
          "  r = null // Trailing parent pointer",
          "  if root == null: root = new Node(key); return",
          "  while t != null:",
          "    r = t",
          "    if key == t.data: return // Duplicate key ignored",
          "    else if key < t.data: t = t.lchild",
          "    else: t = t.rchild",
          "  p = new Node(key)",
          "  if key < r.data: r.lchild = p",
          "  else: r.rchild = p",
          "",
          "",
          ""
        ],
        bn: [
          "// ট্রেইলিং পয়েন্টার r দিয়ে ইটারেটিভ BST ইনসার্ট",
          "function insert(key):",
          "  t = root",
          "  r = null // ট্রেইলিং প্যারেন্ট পয়েন্টার",
          "  if root == null: root = new Node(key); return",
          "  while t != null:",
          "    r = t",
          "    if key == t.data: return // ডুপ্লিকেট মান অগ্রাহ্য",
          "    else if key < t.data: t = t.lchild",
          "    else: t = t.rchild",
          "  p = new Node(key)",
          "  if key < r.data: r.lchild = p",
          "  else: r.rchild = p",
          "",
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
        title: { en: 'BST Search Mechanics: Halving Search Space', bn: 'BST সার্চ: প্রতি ধাপে অর্ধেক অংশ বাদ' },
        explanation: {
          en: 'To search for a `key = 25`:\n1. Start at root `30`. Compare: $25 < 30$ $\\implies$ the entire right subtree ($> 30$) is instantly discarded! Branch left to `15`.\n2. Compare at `15`: $25 > 15$ $\\implies$ branch right to `20`.\n3. Compare at `20`: $25 > 20$ $\\implies$ branch right to `25`.\n4. **Found!** Only 3 comparisons instead of scanning all 7 nodes.',
          bn: 'ধরি আমরা `key = 25` খুঁজতে চাই:\n১. রুটে আছি `30`। তুলনা: $25 < 30$ $\\implies$ ট্রির পুরো ডান পাশটা তাৎক্ষণিক বাতিল! বাম সন্তান `15`-এ নামো।\n২. `15`-এ তুলনা: $25 > 15$ $\\implies$ ডান সন্তান `20`-এ যাও।\n৩. `20`-এ তুলনা: $25 > 20$ $\\implies$ ডান সন্তান `25`-এ যাও।\n৪. **পাওয়া গেছে!** ৭টি নোড খোঁজার বদলে মাত্র ৩টি তুলনায় মানটি মিলে গেল।',
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
        title: { en: 'Trailing Pointer r Follows t Downward', bn: 'ট্রেইলিং পয়েন্টার r অনুসরণ করে t-এর পথ' },
        explanation: {
          en: 'Now let\'s **Insert `key = 35`** into the BST:\n- Pointer `t` navigates down searching for 35.\n- **Pointer `r` trails right behind `t`** to remember the parent node!\n1. Initially `t = 30`, `r = null`.\n2. $35 > 30$: `r = 30`, `t` moves right to `50`.\n3. $35 < 50$: `r = 50`, `t` moves left to `40`.\n4. $35 < 40$: `r = 40`, `t` moves left to `null`!',
          bn: 'এবার আমরা ট্রিতে **`key = 35` ইনসার্ট** করতে চাই:\n- পয়েন্টার `t` ৩৫-এর জায়গা খুঁজতে নিচে নামতে থাকে।\n- **পয়েন্টার `r` ঠিক `t`-এর এক ধাপ পেছনে থাকে** যাতে প্যারেন্ট নোডটি মনে রাখা যায়!\n১. শুরুতে `t = 30`, `r = null`।\n২. $35 > 30$: `r = 30`, `t` ডানে নেমে গেল `50`-এ।\n৩. $35 < 50$: `r = 50`, `t` বামে নেমে গেল `40`-এ।\n৪. $35 < 40$: `r = 40`, `t` বামে নেমে হলো `null`!'
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
        title: { en: 'Allocating and Linking the New Node', bn: 'নতুন নোড তৈরি এবং লিঙ্ক করা' },
        explanation: {
          en: 'Now allocate the new node: `p = new Node(35)`.\nCompare `key (35)` with parent `r.data (40)`:\n- $35 < 40$ $\\implies$ attach as left child: **`r.lchild = p`**!\n- If it had been greater, it would attach as `r.rchild = p`.\n\nThe new node is permanently wired into dynamic heap memory in $O(h)$ time with zero recursion overhead!',
          bn: 'এবার মেমোরিতে নতুন নোড তৈরি করো: `p = new Node(35)`।\nনতুন মান ৩৫-কে প্যারেন্ট `r.data (40)`-এর সাথে তুলনা করো:\n- $35 < 40$ $\\implies$ বাম সন্তান হিসেবে লিঙ্ক করো: **`r.lchild = p`**!\n- যদি বড় হতো, তবে ডান সন্তান `r.rchild = p` হিসেবে লিঙ্ক হতো।\n\nকোনো রিকারশন মেমোরি খরচ না করে $O(h)$ সময়ে নতুন নোডটি ট্রির সাথে স্থায়ীভাবে যুক্ত হয়ে গেল!'
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
          note: 'Node 35 is now a valid leaf satisfying all BST invariants.'
        }
      },
      {
        title: { en: 'In-Order Verification: Monotonicity Preserved', bn: 'ইন-অর্ডার যাচাই: সর্টেড ক্রম অক্ষুণ্ণ' },
        explanation: {
          en: 'Let\'s run In-Order traversal after inserting 35:\n`Output = [10, 15, 20, 30, 35, 40, 50, 60]`\n\nNotice that **35** automatically slips into its exact numerical position between 30 and 40 without any array shifts or element re-indexing! That is the superpower of Binary Search Trees.',
          bn: '৩৫ ইনসার্ট করার পর পুনরায় ইন-অর্ডার চালিয়ে দেখি:\n`আউটপুট = [10, 15, 20, 30, 35, 40, 50, 60]`\n\nলক্ষ করো, **35** কোনো উপাদান সরানো বা শিফট করা ছাড়াই ঠিক ৩০ এবং ৪০-এর মাঝখানে নিখুঁত স্থানে বসে গেছে! এটাই বাইনারি সার্চ ট্রির আসল শক্তি।'
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
      en: 'Finding successor (next key in sorted order) and predecessor (previous key) with and without right/left subtrees',
      bn: 'ডান/বাম সাবট্রি থাকা ও না থাকা উভয় অবস্থায় উত্তরসূরি ও পূর্বসূরি নির্ণয়'
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
          "end function",
          "function inPre(p):",
          "  while p != null and p.rchild != null: p = p.rchild",
          "  return p // Maximum element in left subtree",
          "end function",
          "function getSuccessor(root, target):",
          "  if target.rchild != null: return inSucc(target.rchild)",
          "  succ = null; curr = root",
          "  while curr != target:",
          "    if target.data < curr.data:",
          "      succ = curr // Deepest ancestor turning left",
          "      curr = curr.lchild",
          "    else: curr = curr.rchild",
          "  end while",
          "  return succ",
          "end function"
        ],
        bn: [
          "// BST ইন-অর্ডার উত্তরসূরি ও পূর্বসূরি",
          "function inSucc(p):",
          "  while p != null and p.lchild != null: p = p.lchild",
          "  return p // ডান সাবট্রির ক্ষুদ্রতম উপাদান",
          "end function",
          "function inPre(p):",
          "  while p != null and p.rchild != null: p = p.rchild",
          "  return p // বাম সাবট্রির বৃহত্তম উপাদান",
          "end function",
          "function getSuccessor(root, target):",
          "  if target.rchild != null: return inSucc(target.rchild)",
          "  succ = null; curr = root",
          "  while curr != target:",
          "    if target.data < curr.data:",
          "      succ = curr // বামে মোড় নেওয়া গভীরতম পূর্বপুরুষ",
          "      curr = curr.lchild",
          "    else: curr = curr.rchild",
          "  end while",
          "  return succ",
          "end function"
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
        title: { en: '1. In-Order Sorted Property & Definitions', bn: '১. ইন-অর্ডার সর্টেড ধর্ম ও সংজ্ঞা' },
        explanation: {
          en: 'In a Binary Search Tree, an **In-Order Traversal** ($Left \\to Root \\to Right$) strictly visits elements in **monotonically increasing order**:\n\n$$\\text{In-Order Sequence: } 20 \\to 30 \\to 40 \\to 50 \\to 60 \\to 70 \\to 80$$\n\n- **In-Order Successor:** The smallest key strictly greater than target $X$ (the immediate next element in sorted order).\n- **In-Order Predecessor:** The greatest key strictly smaller than target $X$ (the immediate previous element in sorted order).\n\nFor node **50**, its predecessor is **40** and its successor is **60**.',
          bn: 'একটি বাইনারি সার্চ ট্রিতে **ইন-অর্ডার ট্রাভার্সাল** ($Left \\to Root \\to Right$) উপাদানগুলোকে কঠোরভাবে **ছোট থেকে বড় ক্রমে** উপস্থাপন করে:\n\n$$\\text{ইন-অর্ডার ক্রম: } ২০ \\to ৩০ \\to ৪০ \\to ৫০ \\to ৬০ \\to ৭০ \\to ৮০$$\n\n- **ইন-অর্ডার উত্তরসূরি (Successor):** টার্গেট $X$-এর চেয়ে ঠিক পরের ক্ষুদ্রতম বড় উপাদান।\n- **ইন-অর্ডার পূর্বসূরি (Predecessor):** টার্গেট $X$-এর চেয়ে ঠিক আগের বৃহত্তম ছোট উপাদান।\n\nনোড **৫০**-এর পূর্বসূরি হলো **৪০** এবং উত্তরসূরি হলো **৬০**।'
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
        title: { en: '2. Case 1: Target Has Right Subtree → inSucc(p.rchild)', bn: '২. কেস ১: টার্গেটের ডান সাবট্রি আছে → inSucc(p.rchild)' },
        explanation: {
          en: 'When the target node has a **right child** (`target.rchild != null`), its In-Order Successor is guaranteed to lie in that right subtree.\n\n**Algorithm:**\n1. Move one step to the right child: `p = target.rchild` (node `70`).\n2. Walk left as far as possible: `while (p.lchild) p = p.lchild`.\n3. The leftmost node reached is the minimum of the right subtree: node **`60`**!\n\nThis runs in $O(h)$ time and requires $O(1)$ space.',
          bn: 'যখন টার্গেট নোডের **ডান সন্তান থাকে** (`target.rchild != null`), তখন তার উত্তরসূরি নিশ্চিতভাবে সেই ডান সাবট্রির ভেতরেই থাকে।\n\n**অ্যালগরিদম:**\n১. এক ধাপ ডানে যাও: `p = target.rchild` (নোড `৭০`)।\n২. এরপর যতদূর সম্ভব বামে যেতে থাকো: `while (p.lchild) p = p.lchild`।\n৩. সর্ববামের শেষ নোডটিই হলো ডান সাবট্রির ক্ষুদ্রতম মান: নোড **`৬০`**!\n\nএটি $O(h)$ সময়ে সম্পন্ন হয় এবং অতিরিক্ত কোনো মেমোরি লাগে না।'
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
        title: { en: '3. Case 1 for Predecessor: inPre(p.lchild)', bn: '৩. পূর্বসূরির জন্য কেস ১: inPre(p.lchild)' },
        explanation: {
          en: 'Symmetrically, when the target node has a **left child** (`target.lchild != null`), its In-Order Predecessor lies in that left subtree.\n\n**Algorithm:**\n1. Move one step to the left child: `p = target.lchild` (node `30`).\n2. Walk right as far as possible: `while (p.rchild) p = p.rchild`.\n3. The rightmost node reached is the maximum of the left subtree: node **`40`**!\n\nTherefore, `inPre(50.lchild)` immediately returns **`40`**.',
          bn: 'একইভাবে প্রতিসম নিয়মে, যখন টার্গেটের **বাম সন্তান থাকে** (`target.lchild != null`), তখন তার পূর্বসূরি সেই বাম সাবট্রিতেই থাকে।\n\n**অ্যালগরিদম:**\n১. এক ধাপ বামে যাও: `p = target.lchild` (নোড `৩০`)।\n২. এরপর যতদূর সম্ভব ডানে যেতে থাকো: `while (p.rchild) p = p.rchild`।\n৩. সর্বডানের শেষ নোডটিই হলো বাম সাবট্রির বৃহত্তম মান: নোড **`৪০`**!\n\nসুতরাং `inPre(50.lchild)` সাথে সাথে রিটার্ন করে **`৪০`**।'
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
        title: { en: '4. Case 2: Target Has NO Right Child (Ancestor Search)', bn: '৪. কেস ২: টার্গেটের ডান সাবট্রি নেই (পূর্বপুরুষ অনুসন্ধান)' },
        explanation: {
          en: 'What if we need the successor of a node that has **no right child**? Example: Find successor of node **`40`**.\n\nIn the sorted sequence `[20, 30, 40, 50, 60, 70, 80]`, the successor of `40` is **`50`**, but node `40` has no right subtree!\n\n**Ancestor Search Algorithm:**\n1. Start at `root = 50`. Since `target (40) < 50`, we branch **LEFT** and record `50` as candidate successor!\n2. At node `30`, since `target (40) > 30`, we branch **RIGHT** (candidate `50` is retained).\n3. We reach node `40` (target). The search ends.\n4. Result: The deepest ancestor from which we took a **left turn** is node **`50`**!',
          bn: 'যদি এমন কোনো নোডের উত্তরসূরি দরকার হয় যার **ডান সন্তান নেই**? যেমন: নোড **`৪০`**-এর উত্তরসূরি নির্ণয়।\n\nসর্টেড সিকোয়েন্স `[২০, ৩০, ৪০, ৫০, ৬০, ৭০, ৮০]` অনুসারে ৪০-এর উত্তরসূরি হলো **৫০**, কিন্তু ৪০-এর কোনো ডান সাবট্রি নেই!\n\n**পূর্বপুরুষ অনুসন্ধান অ্যালগরিদম:**\n১. রুট `৫০` থেকে শুরু করি। যেহেতু `৪০ < ৫০`, আমরা **বামে** যাই এবং `৫০`-কে সম্ভাব্য উত্তরসূরি হিসেবে চিহ্নিত করি!\n২. নোড `৩০`-এ যাই। যেহেতু `৪০ > ৩০`, আমরা **ডানে** যাই (৫০ অক্ষত থাকে)।\n৩. আমরা টার্গেট নোড `৪০`-এ পৌঁছে যাই। লুপ শেষ।\n৪. ফলাফল: যে গভীরতম পূর্বপুরুষ থেকে আমরা **বামে মোড় নিয়েছিলাম**, সেই নোড **`৫০`**-ই হলো ইন-অর্ডার উত্তরসূরি!'
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
        title: { en: '5. Application: Abdul Bari Balanced BST Deletion', bn: '৫. প্রয়োগ: আব্দুল বারী ব্যালান্সড BST ডিলিট' },
        explanation: {
          en: 'Why are `inPre` and `inSucc` essential in computer science?\n\nIn **BST Deletion Case 3** (deleting a node with two children, like root `50`):\n- In the Abdul Bari masterclass textbook (Page 6), we compare subtree heights:\n\n$$\\begin{cases} \\text{If } \\text{height}(p.\\text{lchild}) > \\text{height}(p.\\text{rchild}): & q = \\text{inPre}(p.\\text{lchild}) \\\\ \\text{Else}: & q = \\text{inSucc}(p.\\text{rchild}) \\end{cases}$$\n\n- We copy $q.\\text{data}$ into $p$, then recursively delete $q$ from that subtree.\n- **Significance:** Picking from the taller subtree dynamically keeps the BST balanced and prevents degeneration into a skewed tree!',
          bn: 'কম্পিউটার বিজ্ঞানে `inPre` এবং `inSucc` কেন এত তাৎপর্যপূর্ণ?\n\n**BST ডিলিট কেস ৩**-এ (দুটি সন্তান বিশিষ্ট নোড, যেমন রুট `৫০` ডিলিট করার সময়):\n- আব্দুল বারীর পাঠ্যবই অনুসারে (পৃষ্ঠা ৬), আমরা দুই পাশের উচ্চতা তুলনা করি:\n\n$$\\begin{cases} \\text{যদি } \\text{উচ্চতা}(\\text{বাম}) > \\text{উচ্চতা}(\\text{ডান}): & q = \\text{inPre}(p.\\text{lchild}) \\\\ \\text{অন্যথায়}: & q = \\text{inSucc}(p.\\text{rchild}) \\end{cases}$$\n\n- আমরা $q$-এর ডেটা $p$-তে বসিয়ে দিই এবং সেই সাবট্রি থেকে $q$-কে ডিলিট করি।\n- **তাৎপর্য:** উঁচু সাবট্রি থেকে নোড সরানোর ফলে BST স্বয়ংক্রিয়ভাবে ব্যালান্সড থাকে এবং স্কিউড হওয়া রোধ হয়!'
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
      en: 'Case 1 (Leaf), Case 2 (Single Child), and Case 3 (Two Children using Predecessor/Successor)',
      bn: 'কেস ১ (লিফ), কেস ২ (এক সন্তান), এবং কেস ৩ (ইন-অর্ডার পূর্বসূরি/উত্তরসূরি)'
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
        title: { en: 'Case 1: Deleting a Leaf Node (Degree 0)', bn: 'কেস ১: লিফ নোড ডিলিট (ডিগ্রি ০)' },
        explanation: {
          en: 'In **Case 1**, the node to be deleted has **zero children** (`p.lchild == null && p.rchild == null`).\n\nExample: Delete leaf **`10`**.\n- The parent node (`15`) simply sets its child pointer to `NULL`.\n- Memory for node `10` is safely deallocated.\n- Easiest operation: $O(1)$ pointer reset.',
          bn: '**কেস ১-এ** টার্গেট নোডের **কোনো সন্তান থাকে না** (`ডিগ্রি ০`)।\n\nউদাহরণ: লিফ নোড **`10`** ডিলিট করো।\n- প্যারেন্ট নোড (`15`) সরাসরি তার চাইল্ড পয়েন্টারকে `NULL` করে দেয়।\n- নোড `10`-এর মেমোরি মুক্ত (free) করে দেওয়া হয়।\n- সবচেয়ে সহজ কেস: $O(1)$ সময়ে সমাধান হয়।',
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
        title: { en: 'Case 2: Deleting a Node with One Child (Degree 1)', bn: 'কেস ২: এক সন্তান বিশিষ্ট নোড ডিলিট (ডিগ্রি ১)' },
        explanation: {
          en: 'In **Case 2**, the node to be deleted has **exactly one child**.\n\nExample: If node `20` only had right child `25`:\n- We **bypass** node `20` completely!\n- Parent `15` directly links its pointer to grandchild `25` (`15.rchild = 25`).\n- Node `20` is deleted. The tree structure remains intact without changing height.',
          bn: '**কেস ২-এ** টার্গেট নোডের **ঠিক একটি সন্তান** থাকে (`ডিগ্রি ১`)।\n\nউদাহরণ: ধরি নোড `20`-এর কেবল একটি সন্তান `25` আছে:\n- আমরা মাঝের নোড `20`-কে সরাসরি **বাইপাস** করে দিই!\n- প্যারেন্ট `15` সরাসরি নাতি নোড `25`-এর সাথে যুক্ত হয় (`15.rchild = 25`)।\n- নোড `20` মেমোরি থেকে ডিলিট হয়ে যায়। ট্রির বাকি কাঠামো অক্ষত থাকে।',
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
        title: { en: 'Case 3: Deleting a Node with Two Children (Degree 2)', bn: 'কেস ৩: দুই সন্তান বিশিষ্ট নোড ডিলিট (ডিগ্রি ২)' },
        explanation: {
          en: 'What if we want to delete **Root 30** (which has two full subtrees)?\n\nWe CANNOT just remove it, because it would split the tree into pieces! Instead:\n1. Find its **In-Order Successor** (smallest element in right subtree = `40`) OR **In-Order Predecessor** (largest element in left subtree = `20`).\n2. **Copy `40` into node 30\'s position**.\n3. Recursively delete `40` from the right subtree (which is guaranteed to have degree $\\le 1$!).',
          bn: 'যদি আমরা **রুট নোড 30** ডিলিট করতে চাই (যার দুই পাশেই সন্তান আছে)?\n\nসরাসরি ফেলে দেওয়া সম্ভব নয়, কারণ ট্রি দুই টুকরো হয়ে যাবে! কৌশলটি হলো:\n১. তার **ইন-অর্ডার উত্তরসূরি** (ডান পাশের ক্ষুদ্রতম নোড = `40`) অথবা **ইন-অর্ডার পূর্বসূরি** (বাম পাশের বৃহত্তম নোড = `20`) খুঁজে বের করো।\n২. ৩০-এর ঘরে **৪০-এর মানটি কপি করে বসিয়ে দাও**।\n৩. এবার ডান পাশ থেকে ৪০-কে ডিলিট করো (যার সন্তান সর্বোচ্চ ১টি হতে পারে, ফলে এটি কেস ১ বা ২-এ নেমে আসে!)।',
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
        title: { en: 'Case 3 Result: BST Invariants Preserved', bn: 'কেস ৩-এর ফলাফল: BST শর্ত সম্পূর্ণ অক্ষুণ্ণ' },
        explanation: {
          en: 'After promoting `40` and deleting the original duplicate `40`:\n- The new root is **`40`**.\n- Every node in the left subtree (`10, 15, 20`) is $< 40$.\n- Every node in the right subtree (`50, 60`) is $> 40$.\n\nIn-Order result: `[10, 15, 20, 40, 50, 60]`. Clean, perfectly sorted, and $O(h)$ optimal.',
          bn: '৪০-কে রুটে এনে নিচের নকল ৪০ ডিলিট করার পর:\n- নতুন রুট হলো **`40`**।\n- বাম সাব-ট্রির সব নোড (`10, 15, 20`) $< 40$।\n- ডান সাব-ট্রির সব নোড (`50, 60`) $> 40$।\n\nইন-অর্ডারের ফল: `[10, 15, 20, 40, 50, 60]`। নিখুঁতভাবে সর্টেড এবং $O(h)$ অপটিমাল।',
        },
        line: 16,
        iteration: { i: 4, of: 4, label: { en: 'Tree Repaired', bn: 'ট্রি অক্ষত' } },
        state: { newRoot: 40, inOrder: '[10, 15, 20, 40, 50, 60]', validBST: true },
        scene: {
          kind: 'tree',
          label: 'Completed Deletion: Root is now 40. All BST ordering invariants preserved!',
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
      en: 'Post-order recurrence relations for total nodes, leaf nodes, degree-2 nodes, height, and element sum',
      bn: 'পোস্ট-অর্ডার রিকারশন দিয়ে মোট নোড, লিফ, ২-ডিগ্রি নোড, উচ্চতা ও উপাদানের যোগফল নির্ণয়'
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
        title: { en: 'Post-Order Recurrence Logic', bn: 'পোস্ট-অর্ডার রিকারশন লজিক' },
        explanation: {
          en: 'How can we measure any property of a binary tree?\n\nBy using the **Divide and Conquer** paradigm:\n1. Solve the metric recursively on the **left subtree**.\n2. Solve the metric recursively on the **right subtree**.\n3. **Combine the answers** at the current parent node!\n\nThis is identical to Post-Order traversal (Left, Right, Root).',
          bn: 'একটি বাইনারি ট্রির যেকোনো বৈশিষ্ট্য কীভাবে পরিমাপ করা যায়?\n\n**ডিভাইড অ্যান্ড কনকার** নিয়মের মাধ্যমে:\n১. বাম সাব-ট্রির মান রিকারসিভভাবে বের করো।\n২. ডান সাব-ট্রির মান রিকারসিভভাবে বের করো।\n৩. বর্তমান প্যারেন্টে দুটি মানকে **যুক্ত করো**!\n\nএটি হুবহু পোস্ট-অর্ডার ট্রাভার্সাল (বাম, ডান, রুট)-এর কাঠামোর ওপর কাজ করে।',
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
        title: { en: 'Metric 1: Total Node Count', bn: 'মেট্রিক ১: মোট নোড সংখ্যা গণনা' },
        explanation: {
          en: 'Formula:\n`Count(p) = Count(p.lchild) + Count(p.rchild) + 1`\nBase case: `if p == null: return 0`\n\nTracing on root 50:\n- Left subtree has 3 nodes (`10, 20, 30`).\n- Right subtree has 3 nodes (`60, 70, 80`).\n- Total nodes = $3 + 3 + 1 = \\mathbf{7}$.',
          bn: 'সূত্র:\n`Count(p) = Count(p.lchild) + Count(p.rchild) + 1`\nবেস কেস: `if p == null: return 0`\n\nরুট ৫০-এর ক্ষেত্রে হিসাব:\n- বাম সাব-ট্রিতে নোড আছে ৩টি (`10, 20, 30`)।\n- ডান সাব-ট্রিতে নোড আছে ৩টি (`60, 70, 80`)।\n- মোট নোড = $3 + 3 + 1 = \\mathbf{7}$ টি।',
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
        title: { en: 'Metric 2: Leaf Node Count (N0)', bn: 'মেট্রিক ২: লিফ নোড সংখ্যা গণনা' },
        explanation: {
          en: 'Formula:\n`if p == null: return 0`\n`if p.lchild == null && p.rchild == null: return 1`\n`return Leaf(p.lchild) + Leaf(p.rchild)`\n\nLeaves found: `10, 30, 60, 80` $\\implies$ **Total Leaves = 4**.\nRemember the theorem: $N_0 = N_2 + 1 \\implies 4 = 3 + 1$. Perfectly verified!',
          bn: 'সূত্র:\n`if p == null: return 0`\n`if p.lchild == null && p.rchild == null: return 1`\n`return Leaf(p.lchild) + Leaf(p.rchild)`\n\nখুঁজে পাওয়া লিফ: `10, 30, 60, 80` $\\implies$ **মোট লিফ = ৪টি**।\nআগের সেই উপপাদ্য মনে করো: $N_0 = N_2 + 1 \\implies 4 = 3 + 1$। নিখুঁতভাবে প্রমাণিত!',
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
        title: { en: 'Metric 3: Tree Height Calculation', bn: 'মেট্রিক ৩: ট্রির উচ্চতা নির্ণয়' },
        explanation: {
          en: 'Formula:\n`Height(p) = 1 + max(Height(p.lchild), Height(p.rchild))`\nBase case: `if p == null: return -1`\n\nTracing:\n- Leaves return height `0`.\n- Node 20: $1 + \\max(0, 0) = 1$.\n- Node 70: $1 + \\max(0, 0) = 1$.\n- Root 50: $1 + \\max(1, 1) = \\mathbf{2}$.\n\nTree height is **2** (longest path has 2 edges).',
          bn: 'সূত্র:\n`Height(p) = 1 + max(Height(p.lchild), Height(p.rchild))`\nবেস কেস: `if p == null: return -1`\n\nহিসাবের ধাপ:\n- লিফ নোডগুলোর হাইট `0`।\n- নোড ২০-এর হাইট: $1 + \\max(0, 0) = 1$।\n- নোড ৭০-এর হাইট: $1 + \\max(0, 0) = 1$।\n- রুট ৫০-এর হাইট: $1 + \\max(1, 1) = \\mathbf{2}$।\n\nট্রির মোট উচ্চতা **২** (সর্বোচ্চ পাথটিতে ২টি এজ আছে)।',
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
        title: { en: 'Metric 4: Sum of All Node Elements', bn: 'মেট্রিক ৪: সমস্ত উপাদানের সমষ্টি' },
        explanation: {
          en: 'Formula:\n`Sum(p) = Sum(p.lchild) + Sum(p.rchild) + p.data`\n\nSum of Left subtree $= 10 + 20 + 30 = 60$.\nSum of Right subtree $= 60 + 70 + 80 = 210$.\nTotal Sum $= 60 + 210 + 50 = \\mathbf{320}$.\n\nAll metrics execute in $O(N)$ linear time and $O(h)$ auxiliary stack space.',
          bn: 'সূত্র:\n`Sum(p) = Sum(p.lchild) + Sum(p.rchild) + p.data`\n\nবাম পাশের যোগফল $= 10 + 20 + 30 = 60$।\nডান পাশের যোগফল $= 60 + 70 + 80 = 210$।\nট্রির মোট যোগফল $= 60 + 210 + 50 = \\mathbf{320}$।\n\nসমস্ত মেট্রিক মাত্র $O(N)$ লিনিয়ার সময় ও $O(h)$ স্ট্যাক স্পেসে সম্পন্ন হয়।',
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
