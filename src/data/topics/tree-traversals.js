/**
 * Tree Traversals, Iteration & Dynamic Tree Construction
 * Covers: Depth-First Traversals (Pre/In/Post), 3-Point Boundary Flag Trick,
 * 2N+1 Function Calls, Tree Reconstruction, Iterative Stack Traversal,
 * Level-Order Queue Traversal, and Queue-Based Dynamic Tree Creation Protocol.
 * Grounded in: binary-search-trees-traversals-guide.pdf & data-structures-binary-trees-guide.pdf
 */

export const traversalTopics = [
  {
    id: 'tree-traversal-mechanics',
    name: { en: 'Tree Traversals (In, Pre, Post, BFS)', bn: 'ট্রি ট্রাভার্সাল (ইন, প্রি, পোস্ট, বিএফএস)' },
    description: {
      en: 'Visit every node: preorder, inorder, postorder, level order',
      bn: 'সব নোড ভিজিট: প্রি-অর্ডার, ইন-অর্ডার, পোস্ট-অর্ডার, লেভেল অর্ডার'
    },
    categoryKey: 'trees',
    subgroupKey: 'traversals',
    level: 'intermediate',
    order: 10,
    icon: '🚶',
    complexity: {
      time: 'O(n)',
      space: 'O(h)',
      note: {
        en: 'Every DFS traversal visits each node once in O(n) time. Total function calls on N nodes is exactly 2N + 1 (N node visits + N + 1 NULL calls).',
        bn: 'প্রতিটি DFS ট্রাভার্সাল প্রতিটি নোড একবার স্পর্শ করে O(n) সময়ে। N নোডের জন্য মোট ফাংশন কল হয় ঠিক ২N + ১ টি।'
      }
    },
    code: {
      pseudo: {
        en: [
          "// Tree DFS Traversals & 2N + 1 Calls",
          "function preOrder(p):",
          "  if p == null: return",
          "  visit(p.data)       // 1. Visit root",
          "  preOrder(p.lchild)  // 2. Left subtree",
          "  preOrder(p.rchild)  // 3. Right subtree",
          "",
          "function inOrder(p):",
          "  if p == null: return",
          "  inOrder(p.lchild)   // 1. Left subtree",
          "  visit(p.data)       // 2. Visit root",
          "  inOrder(p.rchild)   // 3. Right subtree",
          "",
          "function postOrder(p):",
          "  if p == null: return",
          "  postOrder(p.lchild) // 1. Left subtree",
          "  postOrder(p.rchild) // 2. Right subtree",
          "  visit(p.data)       // 3. Visit root",
          ""
        ],
        bn: [
          "// ট্রি DFS ট্রাভার্সাল ও ২N + ১ কল",
          "function preOrder(p):",
          "  if p == null: return",
          "  visit(p.data)       // ১. রুট ভিজিট",
          "  preOrder(p.lchild)  // ২. বাম সাব-ট্রি",
          "  preOrder(p.rchild)  // ৩. ডান সাব-ট্রি",
          "",
          "function inOrder(p):",
          "  if p == null: return",
          "  inOrder(p.lchild)   // ১. বাম সাব-ট্রি",
          "  visit(p.data)       // ২. রুট ভিজিট",
          "  inOrder(p.rchild)   // ৩. ডান সাব-ট্রি",
          "",
          "function postOrder(p):",
          "  if p == null: return",
          "  postOrder(p.lchild) // ১. বাম সাব-ট্রি",
          "  postOrder(p.rchild) // ২. ডান সাব-ট্রি",
          "  visit(p.data)       // ৩. রুট ভিজিট",
          ""
        ]
      },
      js: {
        en: [
          "// JavaScript DFS Traversals",
          "function preOrder(p) {",
          "  if (!p) return;",
          "  console.log(p.data);",
          "  preOrder(p.lchild);",
          "  preOrder(p.rchild);",
          "}",
          "function inOrder(p) {",
          "  if (!p) return;",
          "  inOrder(p.lchild);",
          "  console.log(p.data);",
          "  inOrder(p.rchild);",
          "}",
          "function postOrder(p) {",
          "  if (!p) return;",
          "  postOrder(p.lchild);",
          "  postOrder(p.rchild);",
          "  console.log(p.data);",
          "}"
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট DFS ট্রাভার্সাল",
          "function preOrder(p) {",
          "  if (!p) return;",
          "  console.log(p.data);",
          "  preOrder(p.lchild);",
          "  preOrder(p.rchild);",
          "}",
          "function inOrder(p) {",
          "  if (!p) return;",
          "  inOrder(p.lchild);",
          "  console.log(p.data);",
          "  inOrder(p.rchild);",
          "}",
          "function postOrder(p) {",
          "  if (!p) return;",
          "  postOrder(p.lchild);",
          "  postOrder(p.rchild);",
          "  console.log(p.data);",
          "}"
        ]
      },
      java: {
        en: [
          "// Java DFS Traversals",
          "void preOrder(Node p) {",
          "  if (p == null) return;",
          "  System.out.print(p.data + \" \");",
          "  preOrder(p.lchild);",
          "  preOrder(p.rchild);",
          "}",
          "void inOrder(Node p) {",
          "  if (p == null) return;",
          "  inOrder(p.lchild);",
          "  System.out.print(p.data + \" \");",
          "  inOrder(p.rchild);",
          "}",
          "void postOrder(Node p) {",
          "  if (p == null) return;",
          "  postOrder(p.lchild);",
          "  postOrder(p.rchild);",
          "  System.out.print(p.data + \" \");",
          "}"
        ],
        bn: [
          "// জাভা DFS ট্রাভার্সাল",
          "void preOrder(Node p) {",
          "  if (p == null) return;",
          "  System.out.print(p.data + \" \");",
          "  preOrder(p.lchild);",
          "  preOrder(p.rchild);",
          "}",
          "void inOrder(Node p) {",
          "  if (p == null) return;",
          "  inOrder(p.lchild);",
          "  System.out.print(p.data + \" \");",
          "  inOrder(p.rchild);",
          "}",
          "void postOrder(Node p) {",
          "  if (p == null) return;",
          "  postOrder(p.lchild);",
          "  postOrder(p.rchild);",
          "  System.out.print(p.data + \" \");",
          "}"
        ]
      },
      python: {
        en: [
          "# Python DFS Traversals",
          "def pre_order(p):",
          "  if not p: return",
          "  print(p.data, end=\" \")",
          "  pre_order(p.lchild)",
          "  pre_order(p.rchild)",
          "",
          "def in_order(p):",
          "  if not p: return",
          "  in_order(p.lchild)",
          "  print(p.data, end=\" \")",
          "  in_order(p.rchild)",
          "",
          "def post_order(p):",
          "  if not p: return",
          "  post_order(p.lchild)",
          "  post_order(p.rchild)",
          "  print(p.data, end=\" \")",
          ""
        ],
        bn: [
          "# পাইথন DFS ট্রাভার্সাল",
          "def pre_order(p):",
          "  if not p: return",
          "  print(p.data, end=\" \")",
          "  pre_order(p.lchild)",
          "  pre_order(p.rchild)",
          "",
          "def in_order(p):",
          "  if not p: return",
          "  in_order(p.lchild)",
          "  print(p.data, end=\" \")",
          "  in_order(p.rchild)",
          "",
          "def post_order(p):",
          "  if not p: return",
          "  post_order(p.lchild)",
          "  post_order(p.rchild)",
          "  print(p.data, end=\" \")",
          ""
        ]
      },
      cpp: {
        en: [
          "// C++ DFS Traversals",
          "void preOrder(Node* p) {",
          "  if (!p) return;",
          "  cout << p->data << \" \";",
          "  preOrder(p->lchild);",
          "  preOrder(p->rchild);",
          "}",
          "void inOrder(Node* p) {",
          "  if (!p) return;",
          "  inOrder(p->lchild);",
          "  cout << p->data << \" \";",
          "  inOrder(p->rchild);",
          "}",
          "void postOrder(Node* p) {",
          "  if (!p) return;",
          "  postOrder(p->lchild);",
          "  postOrder(p->rchild);",
          "  cout << p->data << \" \";",
          "}"
        ],
        bn: [
          "// সি++ DFS ট্রাভার্সাল",
          "void preOrder(Node* p) {",
          "  if (!p) return;",
          "  cout << p->data << \" \";",
          "  preOrder(p->lchild);",
          "  preOrder(p->rchild);",
          "}",
          "void inOrder(Node* p) {",
          "  if (!p) return;",
          "  inOrder(p->lchild);",
          "  cout << p->data << \" \";",
          "  inOrder(p->rchild);",
          "}",
          "void postOrder(Node* p) {",
          "  if (!p) return;",
          "  postOrder(p->lchild);",
          "  postOrder(p->rchild);",
          "  cout << p->data << \" \";",
          "}"
        ]
      }
    },
    steps: [
      {
        title: { en: 'Pre-Order Traversal: Root → Left → Right', bn: 'প্রি-অর্ডার ট্রাভার্সাল: রুট → বাম → ডান' },
        explanation: {
          en: 'In **Pre-Order Traversal**, you visit the current node **first**, then recursively traverse its left subtree, then its right subtree.\n\nOrder: `[A, B, D, E, C, F, G]`\n- Used for: Making exact copies of trees, prefix expression evaluation, tree serialization.',
          bn: '**প্রি-অর্ডার ট্রাভার্সালে (Pre-Order)** বর্তমান নোডকে সবার **প্রথমে** ভিজিট করা হয়, তারপর রিকারসিভভাবে তার বাম সাব-ট্রি এবং সবশেষে ডান সাব-ট্রি ঘোরা হয়।\n\nক্রম: `[A, B, D, E, C, F, G]`\n- ব্যবহার: ট্রির হুবহু কপি তৈরি করা, প্রিফিক্স এক্সপ্রেশন মূল্যায়ন, ট্রি সিরিয়ালাইজেশন।'
        },
        line: 3,
        iteration: { i: 1, of: 5, label: { en: 'Pre-Order', bn: 'প্রি-অর্ডার' } },
        state: { current: 'A', visited: '[A]', pendingSubtrees: 'Left(B), Right(C)' },
        scene: {
          kind: 'tree',
          label: 'Pre-Order: Root visited first → [A, B, D, E, C, F, G]',
          root: {
            v: 'A',
            sub: '1st',
            l: { v: 'B', sub: '2nd', l: { v: 'D', sub: '3rd' }, r: { v: 'E', sub: '4th' } },
            r: { v: 'C', sub: '5th', l: { v: 'F', sub: '6th' }, r: { v: 'G', sub: '7th' } }
          },
          highlights: { current: 'A', visited: ['A'], frontier: ['B', 'C'] },
          legend: [
            { label: 'Current Root (Processed)', color: 'var(--yellow)' },
            { label: 'Upcoming Children', color: 'var(--cyan)' }
          ],
          note: 'Notice the top root node A is printed before any of its children are explored.'
        }
      },
      {
        title: { en: 'In-Order Traversal: Left → Root → Right', bn: 'ইন-অর্ডার ট্রাভার্সাল: বাম → রুট → ডান' },
        explanation: {
          en: '**Inorder**: first the whole left side, then the node, then the right side.\n\nOrder: `[D, B, E, A, F, C, G]`\n\n> On a **BST**, inorder prints the values in **sorted order**.',
          bn: '**ইন-অর্ডার**: আগে পুরো বাম দিক, তারপর নোড, তারপর ডান দিক।\n\nক্রম: `[D, B, E, A, F, C, G]`\n\n> **BST**-তে ইন-অর্ডার মানগুলো **সাজানো ক্রমে** প্রিন্ট করে।'
        },
        line: 10,
        iteration: { i: 2, of: 5, label: { en: 'In-Order', bn: 'ইন-অর্ডার' } },
        state: { current: 'A', leftDone: 'D, B, E', rootVisited: 'A', rightPending: 'F, C, G' },
        scene: {
          kind: 'tree',
          label: 'In-Order: Left subtree finished before Root A is visited → [D, B, E, A, F, C, G]',
          root: {
            v: 'A',
            sub: '4th',
            l: { v: 'B', sub: '2nd', l: { v: 'D', sub: '1st' }, r: { v: 'E', sub: '3rd' } },
            r: { v: 'C', sub: '6th', l: { v: 'F', sub: '5th' }, r: { v: 'G', sub: '7th' } }
          },
          highlights: { visited: ['D', 'B', 'E'], current: 'A', frontier: ['F', 'C', 'G'] },
          legend: [
            { label: 'Already printed (Left)', color: 'var(--green)' },
            { label: 'Visiting Root now', color: 'var(--yellow)' },
            { label: 'Waiting (Right)', color: 'var(--cyan)' }
          ],
          note: 'Left subtree (D, B, E) completed first, then Root A, then Right subtree.'
        }
      },
      {
        title: { en: 'Post-Order Traversal: Left → Right → Root', bn: 'পোস্ট-অর্ডার ট্রাভার্সাল: বাম → ডান → রুট' },
        explanation: {
          en: 'In **Post-Order Traversal**, you visit both left and right subtrees completely before visiting the node itself.\n\nOrder: `[D, E, B, F, G, C, A]`\n- Used for: Bottom-up operations (deleting a tree, calculating height, computing subtree sizes). You cannot delete a parent before deleting its children!',
          bn: '**পোস্ট-অর্ডার ট্রাভার্সালে (Post-Order)** বাম এবং ডান উভয় সাব-ট্রি সম্পূর্ণ ঘোরা শেষ করে সবার শেষে মূল নোডকে প্রসেস করা হয়।\n\nক্রম: `[D, E, B, F, G, C, A]`\n- ব্যবহার: নিচ থেকে উপরের কাজ (ট্রি মেমোরি থেকে ডিলিট করা, উচ্চতা মাপা, সাইজ বের করা)। সন্তানদের ডিলিট না করে প্যারেন্ট ডিলিট করা যায় না!'
        },
        line: 17,
        iteration: { i: 3, of: 5, label: { en: 'Post-Order', bn: 'পোস্ট-অর্ডার' } },
        state: { current: 'A', leavesProcessed: 'D, E, F, G', rootLast: 'A' },
        scene: {
          kind: 'tree',
          label: 'Post-Order: Bottom leaves processed first, Root A visited last of all!',
          root: {
            v: 'A',
            sub: '7th (last)',
            l: { v: 'B', sub: '3rd', l: { v: 'D', sub: '1st' }, r: { v: 'E', sub: '2nd' } },
            r: { v: 'C', sub: '6th', l: { v: 'F', sub: '4th' }, r: { v: 'G', sub: '5th' } }
          },
          highlights: { visited: ['D', 'E', 'B', 'F', 'G', 'C'], current: 'A' },
          legend: [
            { label: 'Completed Subtrees', color: 'var(--green)' },
            { label: 'Root A (Visited Last)', color: 'var(--yellow)' }
          ],
          note: 'Bottom-up: every child is finished before its parent is visited.'
        }
      },
      {
        title: { en: 'The 3-Point Boundary Flag Method', bn: '৩-পয়েন্ট বাউন্ডারি ফ্ল্যাগ ট্রিক' },
        explanation: {
          en: '**A pen-and-paper trick:** draw one line around the outside of the tree, starting left of the root. Each node is passed three times:\n\n1. on its **left** side → that is its **preorder** moment;\n2. **underneath** it → its **inorder** moment;\n3. on its **right** side → its **postorder** moment.\n\nGo around once and you can read all three orders.',
          bn: '**কাগজ-কলমের একটা কৌশল:** রুটের বাম পাশ থেকে শুরু করে ট্রির বাইরে দিয়ে একটা রেখা টানো। প্রতিটা নোড তিনবার পার হয়:\n\n১. তার **বাম** পাশে → এটা তার **প্রি-অর্ডার** মুহূর্ত;\n২. তার **নিচে** → **ইন-অর্ডার** মুহূর্ত;\n৩. তার **ডান** পাশে → **পোস্ট-অর্ডার** মুহূর্ত।\n\nএকবার ঘুরলেই তিনটা ক্রমই পড়া যায়।'
        },
        line: 0,
        iteration: { i: 4, of: 5, label: { en: 'Flag Trick', bn: 'ফ্ল্যাগ ট্রিক' } },
        state: { leftFlag: 'Pre-Order', bottomFlag: 'In-Order', rightFlag: 'Post-Order' },
        scene: {
          kind: 'forest',
          label: { en: 'Trace around the tree once — the #number is when each node gets its flag', bn: 'ট্রির চারপাশে একবার ঘোরো — #সংখ্যা মানে কখন নোডটা ফ্ল্যাগ পায়' },
          trees: [
            { root: { v: 'A', sub: '#1', l: { v: 'B', sub: '#2', l: { v: 'D', sub: '#3' }, r: { v: 'E', sub: '#4' } }, r: { v: 'C', sub: '#5' } }, caption: 'Left flag → Pre-order' },
            { root: { v: 'A', sub: '#4', l: { v: 'B', sub: '#2', l: { v: 'D', sub: '#1' }, r: { v: 'E', sub: '#3' } }, r: { v: 'C', sub: '#5' } }, caption: 'Bottom flag → In-order' },
            { root: { v: 'A', sub: '#5', l: { v: 'B', sub: '#3', l: { v: 'D', sub: '#1' }, r: { v: 'E', sub: '#2' } }, r: { v: 'C', sub: '#4' } }, caption: 'Right flag → Post-order' }
          ],
          caption: { en: 'pre: A B D E C · in: D B E A C · post: D E B C A', bn: 'প্রি: A B D E C · ইন: D B E A C · পোস্ট: D E B C A' }
        }
      },
      {
        title: { en: 'Total Function Calls: Exactly 2N + 1 Theorem', bn: 'মোট ফাংশন কল: ঠিক ২N + ১ উপপাদ্য' },
        explanation: {
          en: '### Exact Function Call Analysis:\nFor any binary tree with **$N$ nodes**, every standard recursive traversal makes **exactly $2N + 1$ function calls**!\n\n*Proof*:\n- $N$ calls are made on valid existing nodes.\n- $N + 1$ calls are made when branching into `null` pointers (from the NULL Pointer Theorem!).\n- Total calls $= N + (N + 1) = \\mathbf{2N + 1}$.\n\nExample: A tree with 7 nodes triggers exactly $2(7) + 1 = 15$ recursive function calls!',
          bn: '### ফাংশন কলের নিখুঁত হিসাব:\n**$N$ টি নোড** বিশিষ্ট যেকোনো বাইনারি ট্রিতে প্রতিটি রিকারসিভ ট্রাভার্সালে **ঠিক $2N + 1$ টি ফাংশন কল** ঘটে!\n\n*সহজ প্রমাণ*:\n- $N$ টি কল ঘটে আসল নোডগুলোর জন্য।\n- $N + 1$ টি কল ঘটে যখন পয়েন্টারগুলো `null`-এ পৌঁছায় (নাল পয়েন্টার উপপাদ্য থেকে!)।\n- মোট রিকারসিভ কল $= N + (N + 1) = \\mathbf{2N + 1}$ টি।\n\nউদাহরণ: ৭টি নোডের ট্রিতে ঠিক $2(7) + 1 = 15$ টি ফাংশন কল হবে!'
        },
        line: 2,
        iteration: { i: 5, of: 5, label: { en: '2N + 1 Calls', bn: '২N+১ কল' } },
        state: { N: 7, validNodeCalls: 7, nullPointerCalls: 8, totalRecursiveCalls: 15 },
        scene: {
          kind: 'chart',
          label: 'Function Call Breakdown for N = 7 Nodes: 7 + 8 = 15 Calls',
          unit: ' calls',
          max: 18,
          items: [
            { label: 'Valid Nodes', v: 7, color: 'var(--cyan)', note: 'N = 7' },
            { label: 'NULL Calls', v: 8, color: 'var(--yellow)', note: 'N + 1 = 8' },
            { label: 'Total Calls', v: 15, color: 'var(--green)', note: '2N + 1 = 15' }
          ],
          note: 'Time Complexity is strictly O(N) because 2N + 1 is a linear constant factor of N.'
        }
      }
    ]
  },

  {
    id: 'tree-reconstruction',
    name: { en: 'Unique Tree Reconstruction', bn: 'ট্রাভার্সাল থেকে ট্রি পুনর্গঠন' },
    description: {
      en: 'Rebuild a tree from its preorder and inorder lists',
      bn: 'প্রি-অর্ডার আর ইন-অর্ডার লিস্ট থেকে ট্রি আবার বানানো'
    },
    categoryKey: 'trees',
    subgroupKey: 'traversals',
    level: 'intermediate',
    order: 20,
    icon: '🧩',
    complexity: {
      time: 'O(n) with hash map',
      space: 'O(n)',
      note: {
        en: 'In-Order is strictly compulsory to distinguish left subtrees from right subtrees. Combined with Pre-Order or Post-Order, unique reconstruction is guaranteed.',
        bn: 'বাম ও ডান সাব-ট্রি আলাদা করতে ইন-অর্ডার অপরিহার্য। এর সাথে প্রি-অর্ডার বা পোস্ট-অর্ডার যোগ করলে একটি অনন্য ট্রি তৈরি হয়।'
      }
    },
    code: {
      pseudo: {
        en: [
          "// Reconstruct Unique Binary Tree from PreOrder & InOrder",
          "function buildTree(preorder, inorder):",
          "  if preorder is empty or inorder is empty: return null",
          "  rootVal = preorder[0] // Root is always 1st in preorder",
          "  root = new Node(rootVal)",
          "  mid = inorder.indexOf(rootVal) // Pivot split",
          "",
          "  // Left subtree items in inorder: [0 .. mid - 1]",
          "  root.left = buildTree(preorder[1 .. mid], inorder[0 .. mid - 1])",
          "  // Right subtree items in inorder: [mid + 1 .. end]",
          "  root.right = buildTree(preorder[mid + 1 .. end], inorder[mid + 1 .. end])",
          "  return root",
          ""
        ],
        bn: [
          "// প্রি-অর্ডার ও ইন-অর্ডার দিয়ে অনন্য ট্রি তৈরি",
          "function buildTree(preorder, inorder):",
          "  if preorder is empty or inorder is empty: return null",
          "  rootVal = preorder[0] // প্রি-অর্ডারের ১ম উপাদানই রুট",
          "  root = new Node(rootVal)",
          "  mid = inorder.indexOf(rootVal) // ইন-অর্ডারে রুট খোঁজা",
          "",
          "  // বাম সাব-ট্রির উপাদান: ইন-অর্ডারের [0 .. mid - 1]",
          "  root.left = buildTree(preorder[1 .. mid], inorder[0 .. mid - 1])",
          "  // ডান সাব-ট্রির উপাদান: ইন-অর্ডারের [mid + 1 .. end]",
          "  root.right = buildTree(preorder[mid + 1 .. end], inorder[mid + 1 .. end])",
          "  return root",
          ""
        ]
      },
      js: {
        en: [
          "// JavaScript Tree Reconstruction",
          "function buildTree(preorder, inorder) {",
          "  if (!preorder.length || !inorder.length) return null;",
          "  const rootVal = preorder[0];",
          "  const root = new Node(rootVal);",
          "  const mid = inorder.indexOf(rootVal);",
          "",
          "  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));",
          "  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));",
          "  return root;",
          "}",
          "",
          ""
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট ট্রি রিকনস্ট্রাকশন",
          "function buildTree(preorder, inorder) {",
          "  if (!preorder.length || !inorder.length) return null;",
          "  const rootVal = preorder[0];",
          "  const root = new Node(rootVal);",
          "  const mid = inorder.indexOf(rootVal);",
          "",
          "  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));",
          "  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));",
          "  return root;",
          "}",
          "",
          ""
        ]
      },
      java: {
        en: [
          "// Java Tree Reconstruction",
          "Node buildTree(int[] preorder, int[] inorder) {",
          "  if (preorder.length == 0 || inorder.length == 0) return null;",
          "  int rootVal = preorder[0];",
          "  Node root = new Node(rootVal);",
          "  int mid = findIndex(inorder, rootVal);",
          "",
          "  root.left = buildTree(Arrays.copyOfRange(preorder, 1, mid + 1), Arrays.copyOfRange(inorder, 0, mid));",
          "  root.right = buildTree(Arrays.copyOfRange(preorder, mid + 1, preorder.length), Arrays.copyOfRange(inorder, mid + 1, inorder.length));",
          "  return root;",
          "}",
          "static int findIndex(int[] a, int x) {  // position of x in a",
          "  for (int i = 0; i < a.length; i++) if (a[i] == x) return i; return -1; }"
        ],
        bn: [
          "// জাভা ট্রি রিকনস্ট্রাকশন",
          "Node buildTree(int[] preorder, int[] inorder) {",
          "  if (preorder.length == 0 || inorder.length == 0) return null;",
          "  int rootVal = preorder[0];",
          "  Node root = new Node(rootVal);",
          "  int mid = findIndex(inorder, rootVal);",
          "",
          "  root.left = buildTree(Arrays.copyOfRange(preorder, 1, mid + 1), Arrays.copyOfRange(inorder, 0, mid));",
          "  root.right = buildTree(Arrays.copyOfRange(preorder, mid + 1, preorder.length), Arrays.copyOfRange(inorder, mid + 1, inorder.length));",
          "  return root;",
          "}",
          "static int findIndex(int[] a, int x) {  // a-তে x কোথায়",
          "  for (int i = 0; i < a.length; i++) if (a[i] == x) return i; return -1; }"
        ]
      },
      python: {
        en: [
          "# Python Tree Reconstruction",
          "def build_tree(preorder, inorder):",
          "  if not preorder or not inorder: return None",
          "  root_val = preorder[0]",
          "  root = Node(root_val)",
          "  mid = inorder.index(root_val)",
          "",
          "  root.left = build_tree(preorder[1:mid + 1], inorder[:mid])",
          "  root.right = build_tree(preorder[mid + 1:], inorder[mid + 1:])",
          "  return root",
          "",
          "",
          ""
        ],
        bn: [
          "# পাইথন ট্রি রিকনস্ট্রাকশন",
          "def build_tree(preorder, inorder):",
          "  if not preorder or not inorder: return None",
          "  root_val = preorder[0]",
          "  root = Node(root_val)",
          "  mid = inorder.index(root_val)",
          "",
          "  root.left = build_tree(preorder[1:mid + 1], inorder[:mid])",
          "  root.right = build_tree(preorder[mid + 1:], inorder[mid + 1:])",
          "  return root",
          "",
          "",
          ""
        ]
      },
      cpp: {
        en: [
          "// C++ Tree Reconstruction",
          "Node* buildTree(vector<int>& pre, vector<int>& in) {",
          "  if (pre.empty() || in.empty()) return nullptr;",
          "  int rootVal = pre[0];",
          "  Node* root = new Node(rootVal);",
          "  int mid = find(in.begin(), in.end(), rootVal) - in.begin();",
          "",
          "  vector<int> leftPre(pre.begin() + 1, pre.begin() + 1 + mid), leftIn(in.begin(), in.begin() + mid);",
          "  vector<int> rightPre(pre.begin() + 1 + mid, pre.end()), rightIn(in.begin() + mid + 1, in.end());",
          "  root->left = buildTree(leftPre, leftIn);",
          "  root->right = buildTree(rightPre, rightIn);",
          "  return root;",
          "}"
        ],
        bn: [
          "// সি++ ট্রি রিকনস্ট্রাকশন",
          "Node* buildTree(vector<int>& pre, vector<int>& in) {",
          "  if (pre.empty() || in.empty()) return nullptr;",
          "  int rootVal = pre[0];",
          "  Node* root = new Node(rootVal);",
          "  int mid = find(in.begin(), in.end(), rootVal) - in.begin();",
          "",
          "  vector<int> leftPre(pre.begin() + 1, pre.begin() + 1 + mid), leftIn(in.begin(), in.begin() + mid);",
          "  vector<int> rightPre(pre.begin() + 1 + mid, pre.end()), rightIn(in.begin() + mid + 1, in.end());",
          "  root->left = buildTree(leftPre, leftIn);",
          "  root->right = buildTree(rightPre, rightIn);",
          "  return root;",
          "}"
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'Can we rebuild a tree from its traversals?',
          bn: 'ট্রাভার্সাল থেকে কি ট্রি আবার বানানো যায়?'
        },
        explanation: {
          en: 'Suppose someone gives you only the **printed output** of a traversal. Can you draw the exact tree back?\n\n- **Only preorder?** No. Many different shapes print the same list (for 3 nodes there are 5 shapes!).\n- **Preorder + postorder?** Still no. If a node has one child, neither list tells you whether it is a **left** or a **right** child.\n- **Preorder (or postorder) + inorder?** **Yes**, always exactly one tree.\n\n> **Why inorder is the key:** inorder prints the left side, then the node, then the right side. So once you know the root, inorder tells you exactly **who is on the left and who is on the right**.',
          bn: 'ধরো কেউ তোমাকে শুধু একটা ট্রাভার্সালের **প্রিন্ট করা আউটপুট** দিল। তুমি কি হুবহু ট্রিটা আবার আঁকতে পারবে?\n\n- **শুধু প্রি-অর্ডার?** না। অনেক আলাদা আকার একই লিস্ট প্রিন্ট করে (৩টা নোডেই ৫টা আকার!)।\n- **প্রি-অর্ডার + পোস্ট-অর্ডার?** তাও না। কোনো নোডের একটা চাইল্ড থাকলে কোনো লিস্টই বলে না সেটা **বাম** না **ডান** চাইল্ড।\n- **প্রি-অর্ডার (বা পোস্ট-অর্ডার) + ইন-অর্ডার?** **হ্যাঁ**, সবসময় ঠিক একটাই ট্রি।\n\n> **ইন-অর্ডার কেন চাবিকাঠি:** ইন-অর্ডার আগে বাম দিক, তারপর নোড, তারপর ডান দিক প্রিন্ট করে। তাই রুট জানা থাকলে ইন-অর্ডার একদম বলে দেয় **কে বামে আর কে ডানে**।'
        },
        line: 0,
        iteration: { i: 1, of: 4, label: { en: 'Compulsory Rule', bn: 'মূল নিয়ম' } },
        state: { preorderAlone: 'Ambiguous', prePlusPost: 'Ambiguous', inOrderRequired: true },
        scene: {
          kind: 'forest',
          label: { en: 'Two different trees, same preorder AND same postorder', bn: 'দুটো আলাদা ট্রি, প্রি-অর্ডার আর পোস্ট-অর্ডার দুটোই এক' },
          trees: [
            { root: { v: 'A', l: { v: 'B' } }, caption: 'B on the left' },
            { root: { v: 'A', r: { v: 'B' } }, caption: 'B on the right' }
          ],
          highlights: { active: ['B'] },
          caption: { en: 'pre = A B and post = B A for both · inorder tells them apart: B A vs A B', bn: 'দুটোরই প্রি = A B, পোস্ট = B A · ইন-অর্ডারে আলাদা: B A বনাম A B' }
        }
      },
      {
        title: {
          en: 'Step 1: the first value of preorder is the root',
          bn: 'ধাপ ১: প্রি-অর্ডারের প্রথম মানই রুট'
        },
        explanation: {
          en: 'We are given:\n- `Preorder = [A, B, D, E, C, F]`\n- `Inorder  = [D, B, E, A, F, C]`\n\nPreorder always prints the **root first** (root → left → right). So the root of the whole tree is the first value: **`A`**.',
          bn: 'আমাদের দেওয়া আছে:\n- `Preorder = [A, B, D, E, C, F]`\n- `Inorder  = [D, B, E, A, F, C]`\n\nপ্রি-অর্ডার সবসময় **রুট আগে** প্রিন্ট করে (রুট → বাম → ডান)। তাই পুরো ট্রির রুট হলো প্রথম মান: **`A`**।'
        },
        line: 3,
        iteration: { i: 2, of: 4, label: { en: 'Find Root', bn: 'রুট নির্বাচন' } },
        state: { preorder: '[A, B, D, E, C, F]', root: 'A' },
        scene: {
          kind: 'array',
          label: 'Pre-Order: The first element A is always the Root',
          cells: ['A', 'B', 'D', 'E', 'C', 'F'],
          showIndex: true,
          highlights: { active: [0], dim: [1, 2, 3, 4, 5] },
          pointers: [{ i: 0, label: 'Root (A)', tone: 'yellow' }],
          note: 'First element of Pre-Order guarantees the root of the tree/subtree.'
        }
      },
      {
        title: {
          en: 'Step 2: split inorder around the root',
          bn: 'ধাপ ২: রুটের চারপাশে ইন-অর্ডার ভাগ করো'
        },
        explanation: {
          en: 'Find `A` inside inorder `[D, B, E, A, F, C]`:\n\n- everything **before** `A` → the **left** subtree: `D, B, E` (3 nodes);\n- everything **after** `A` → the **right** subtree: `F, C` (2 nodes).\n\nNow cut preorder the same way: after the root, the next **3** values belong to the left side (`B, D, E`) and the last **2** to the right side (`C, F`).\n\nThen **do the same thing again** for each side — it is the same small problem, just smaller (recursion).',
          bn: 'ইন-অর্ডার `[D, B, E, A, F, C]`-এর ভেতরে `A` খোঁজো:\n\n- `A`-এর **আগে** সব → **বাম** সাব-ট্রি: `D, B, E` (৩টা নোড);\n- `A`-এর **পরে** সব → **ডান** সাব-ট্রি: `F, C` (২টা নোড)।\n\nএবার প্রি-অর্ডারও একইভাবে কাটো: রুটের পরের **৩টা** মান বাম দিকের (`B, D, E`), আর শেষ **২টা** ডান দিকের (`C, F`)।\n\nতারপর প্রতিটা দিকের জন্য **আবার একই কাজ** করো — একই ছোট সমস্যা, শুধু আরও ছোট (রিকার্শন)।'
        },
        line: 5,
        iteration: { i: 3, of: 4, label: { en: 'Partition', bn: 'বিভাজন' } },
        state: { inOrder: '[D, B, E, A, F, C]', root: 'A', leftInorder: '[D, B, E]', rightInorder: '[F, C]' },
        scene: {
          kind: 'array',
          label: 'In-Order Split: [D, B, E] (Left) ← Root A → [F, C] (Right)',
          cells: ['D', 'B', 'E', 'A', 'F', 'C'],
          showIndex: true,
          highlights: { active: [3], compare: [0, 1, 2], sorted: [4, 5] },
          pointers: [
            { i: 3, label: 'Root A', tone: 'yellow' }
          ],
          brackets: [
            { from: 0, to: 2, label: 'Left Subtree', tone: 'cyan' },
            { from: 4, to: 5, label: 'Right Subtree', tone: 'green' }
          ],
          note: 'Root A splits the In-Order array cleanly into left and right subtrees.'
        }
      },
      {
        title: {
          en: 'Step 3: the rebuilt tree',
          bn: 'ধাপ ৩: আবার বানানো ট্রি'
        },
        explanation: {
          en: 'Repeating the two steps on every part gives exactly one tree:\n\n- `A` is the root, with left child `B` and right child `C`;\n- `B` has left child `D` and right child `E`;\n- `C` has left child `F`.\n\nCheck it: print this tree in preorder and inorder — you get back exactly the two lists we started with.\n\n> **For pros:** with a hash map from value → inorder index, each node is placed in O(1), so the whole rebuild is **O(N)**.',
          bn: 'প্রতিটা অংশে দুটো ধাপ বারবার করলে ঠিক একটাই ট্রি পাওয়া যায়:\n\n- `A` রুট, বাম চাইল্ড `B` আর ডান চাইল্ড `C`;\n- `B`-এর বাম চাইল্ড `D` আর ডান চাইল্ড `E`;\n- `C`-এর বাম চাইল্ড `F`।\n\nমিলিয়ে দেখো: এই ট্রিটা প্রি-অর্ডার আর ইন-অর্ডারে প্রিন্ট করলে শুরুর দুটো লিস্টই হুবহু ফেরত আসে।\n\n> **অভিজ্ঞদের জন্য:** মান → ইন-অর্ডার ইনডেক্সের একটা হ্যাশ ম্যাপ রাখলে প্রতিটা নোড O(1)-এ বসে, তাই পুরো কাজটা **O(N)**।'
        },
        line: 8,
        iteration: { i: 4, of: 4, label: { en: 'Reconstructed', bn: 'সম্পূর্ণ ট্রি' } },
        state: { status: 'Unique Tree Constructed', totalNodes: 6 },
        scene: {
          kind: 'tree',
          label: 'Final Unique Binary Tree reconstructed from Pre-Order & In-Order',
          root: {
            v: 'A',
            l: { v: 'B', l: { v: 'D' }, r: { v: 'E' } },
            r: { v: 'C', l: { v: 'F' } }
          },
          highlights: { current: 'A', active: ['B', 'C'], visited: ['D', 'E', 'F'] },
          legend: [
            { label: 'Root', color: 'var(--yellow)' },
            { label: 'Internal Nodes', color: 'var(--cyan)' },
            { label: 'Leaf Nodes', color: 'var(--green)' }
          ],
          note: 'Verify: Pre-Order = [A, B, D, E, C, F] and In-Order = [D, B, E, A, F, C]. Perfect match!'
        }
      }
    ]
  },

  {
    id: 'iterative-traversals',
    name: { en: 'Iterative Traversals (Explicit Stack & Queue)', bn: 'ইটারেটিভ ট্রাভার্সাল (স্ট্যাক ও কিউ)' },
    description: {
      en: 'Traversals without recursion, using a stack or a queue',
      bn: 'রিকার্শন ছাড়া ট্রাভার্সাল, স্ট্যাক বা queue দিয়ে'
    },
    categoryKey: 'trees',
    subgroupKey: 'traversals',
    level: 'intermediate',
    order: 30,
    icon: '🥞',
    complexity: {
      time: 'O(n)',
      space: 'O(h) stack / O(w) queue',
      note: {
        en: 'Iterative In-Order avoids stack overflow on deep trees. Level-Order processes nodes level by level (FIFO Queue).',
        bn: 'ইটারেটিভ ট্রাভার্সাল গভীর ট্রিতে স্ট্যাক ওভারফ্লো প্রতিরোধ করে। লেভেল-অর্ডার কিউ ব্যবহার করে ধাপে ধাপে প্রসেস করে।'
      }
    },
    code: {
      pseudo: {
        en: [
          "// Iterative In-Order using Explicit Stack",
          "function iterativeInOrder(root):",
          "  stack = new Stack()",
          "  curr = root",
          "  while curr != null or not stack.isEmpty():",
          "    if curr != null:",
          "      stack.push(curr)       // Push parent before left subtree",
          "      curr = curr.lchild",
          "    else:",
          "      curr = stack.pop()     // Backtrack to parent",
          "      visit(curr.data)",
          "      curr = curr.rchild     // Move to right subtree",
          "",
          "",
          ""
        ],
        bn: [
          "// এক্সপ্লিসিট স্ট্যাক দিয়ে ইটারেটিভ ইন-অর্ডার",
          "function iterativeInOrder(root):",
          "  stack = new Stack()",
          "  curr = root",
          "  while curr != null or not stack.isEmpty():",
          "    if curr != null:",
          "      stack.push(curr)       // বামে যাওয়ার আগে প্যারেন্ট পুশ",
          "      curr = curr.lchild",
          "    else:",
          "      curr = stack.pop()     // প্যারেন্টে ফিরে আসা",
          "      visit(curr.data)",
          "      curr = curr.rchild     // ডান সাব-ট্রিতে যাওয়া",
          "",
          "",
          ""
        ]
      },
      js: {
        en: [
          "// JavaScript Iterative In-Order",
          "function iterativeInOrder(root) {",
          "  const stack = [];",
          "  let curr = root;",
          "  while (curr || stack.length) {",
          "    if (curr) {",
          "      stack.push(curr);",
          "      curr = curr.lchild;",
          "    } else {",
          "      curr = stack.pop();",
          "      console.log(curr.data);",
          "      curr = curr.rchild;",
          "    }",
          "  }",
          "}"
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট ইটারেটিভ ইন-অর্ডার",
          "function iterativeInOrder(root) {",
          "  const stack = [];",
          "  let curr = root;",
          "  while (curr || stack.length) {",
          "    if (curr) {",
          "      stack.push(curr);",
          "      curr = curr.lchild;",
          "    } else {",
          "      curr = stack.pop();",
          "      console.log(curr.data);",
          "      curr = curr.rchild;",
          "    }",
          "  }",
          "}"
        ]
      },
      java: {
        en: [
          "// Java Iterative In-Order",
          "void iterativeInOrder(Node root) {",
          "  Stack<Node> stack = new Stack<>();",
          "  Node curr = root;",
          "  while (curr != null || !stack.isEmpty()) {",
          "    if (curr != null) {",
          "      stack.push(curr);",
          "      curr = curr.lchild;",
          "    } else {",
          "      curr = stack.pop();",
          "      System.out.print(curr.data + \" \");",
          "      curr = curr.rchild;",
          "    }",
          "  }",
          "}"
        ],
        bn: [
          "// জাভা ইটারেটিভ ইন-অর্ডার",
          "void iterativeInOrder(Node root) {",
          "  Stack<Node> stack = new Stack<>();",
          "  Node curr = root;",
          "  while (curr != null || !stack.isEmpty()) {",
          "    if (curr != null) {",
          "      stack.push(curr);",
          "      curr = curr.lchild;",
          "    } else {",
          "      curr = stack.pop();",
          "      System.out.print(curr.data + \" \");",
          "      curr = curr.rchild;",
          "    }",
          "  }",
          "}"
        ]
      },
      python: {
        en: [
          "# Python Iterative In-Order",
          "def iterative_in_order(root):",
          "  stack = []",
          "  curr = root",
          "  while curr or stack:",
          "    if curr:",
          "      stack.append(curr)",
          "      curr = curr.lchild",
          "    else:",
          "      curr = stack.pop()",
          "      print(curr.data, end=\" \")",
          "      curr = curr.rchild",
          "",
          "",
          ""
        ],
        bn: [
          "# পাইথন ইটারেটিভ ইন-অর্ডার",
          "def iterative_in_order(root):",
          "  stack = []",
          "  curr = root",
          "  while curr or stack:",
          "    if curr:",
          "      stack.append(curr)",
          "      curr = curr.lchild",
          "    else:",
          "      curr = stack.pop()",
          "      print(curr.data, end=\" \")",
          "      curr = curr.rchild",
          "",
          "",
          ""
        ]
      },
      cpp: {
        en: [
          "// C++ Iterative In-Order",
          "void iterativeInOrder(Node* root) {",
          "  stack<Node*> st;",
          "  Node* curr = root;",
          "  while (curr != nullptr || !st.empty()) {",
          "    if (curr != nullptr) {",
          "      st.push(curr);",
          "      curr = curr->lchild;",
          "    } else {",
          "      curr = st.top(); st.pop();",
          "      cout << curr->data << \" \";",
          "      curr = curr->rchild;",
          "    }",
          "  }",
          "}"
        ],
        bn: [
          "// সি++ ইটারেটিভ ইন-অর্ডার",
          "void iterativeInOrder(Node* root) {",
          "  stack<Node*> st;",
          "  Node* curr = root;",
          "  while (curr != nullptr || !st.empty()) {",
          "    if (curr != nullptr) {",
          "      st.push(curr);",
          "      curr = curr->lchild;",
          "    } else {",
          "      curr = st.top(); st.pop();",
          "      cout << curr->data << \" \";",
          "      curr = curr->rchild;",
          "    }",
          "  }",
          "}"
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'Why traverse without recursion?',
          bn: 'রিকার্শন ছাড়া ট্রাভার্স কেন?'
        },
        explanation: {
          en: 'A recursive function quietly uses the computer\'s **call stack**: every call waits on a pile until its children are done.\n\nThat pile has a limited size. A very deep tree (say, a line of 100,000 nodes) can make it overflow and the program **crashes** ("stack overflow").\n\nThe fix: keep the pile **ourselves**, in a normal `Stack` object. It does the same job, but it can grow as big as memory allows.',
          bn: 'একটা রিকার্সিভ ফাংশন চুপচাপ কম্পিউটারের **কল স্ট্যাক** ব্যবহার করে: প্রতিটা কল একটা স্তূপে অপেক্ষা করে, যতক্ষণ না তার চাইল্ডদের কাজ শেষ হয়।\n\nসেই স্তূপের আকার সীমিত। খুব গভীর একটা ট্রি (ধরো ১,০০,০০০ নোডের একটা লাইন) এটা উপচে দিতে পারে, আর প্রোগ্রাম **ক্র্যাশ** করে ("stack overflow")।\n\nসমাধান: স্তূপটা **নিজেরাই** রাখো, একটা সাধারণ `Stack` অবজেক্টে। একই কাজ করে, কিন্তু মেমরি যতটা দেয় ততটা বড় হতে পারে।'
        },
        line: 2,
        iteration: { i: 1, of: 5, label: { en: 'Concept', bn: 'ধারণা' } },
        state: { stackMemory: 'Heap (Safe)', recursionRisk: 'Stack Overflow' },
        scene: {
          kind: 'stack',
          label: 'User Explicit Stack in Heap Memory',
          items: ['Node(10)', 'Node(20)', 'Node(50)'],
          pointers: [{ i: 0, label: 'top', tone: 'yellow' }],
          highlights: { active: [0] },
          note: 'Explicit user stack controls traversal state safely without hitting OS recursion limits.'
        }
      },
      {
        title: {
          en: 'Go left and remember the way back',
          bn: 'বামে যাও আর ফেরার পথ মনে রাখো'
        },
        explanation: {
          en: 'Inorder means "left side first". So we keep going **left**, and push every node we pass onto the stack — to come back to it later.\n\nStarting at the root `50`:\n1. push `50`, go left to `25`;\n2. push `25`, go left to `10`;\n3. push `10`, go left → nothing there (`null`).\n\nNow the stack holds `[50, 25, 10]` — the way back up, with the **most recent** node on top.',
          bn: 'ইন-অর্ডার মানে "বাম দিক আগে"। তাই আমরা **বামে** যেতে থাকি, আর পথে প্রতিটা নোড স্ট্যাকে push করি — পরে সেখানে ফিরে আসার জন্য।\n\nরুট `50` থেকে শুরু:\n১. `50` push, বামে `25`-এ যাও;\n২. `25` push, বামে `10`-এ যাও;\n৩. `10` push, বামে যাও → সেখানে কিছু নেই (`null`)।\n\nএখন স্ট্যাকে `[50, 25, 10]` — ওপরে ফেরার পথ, **সবশেষেরটা** একদম ওপরে।'
        },
        line: 6,
        iteration: { i: 2, of: 5, label: { en: 'Push Left', bn: 'বামে পুশ' } },
        state: { curr: null, stack: '[50, 25, 10]', top: 10 },
        scene: {
          kind: 'stack',
          label: 'Stack after pushing all leftmost nodes: [50, 25, 10 (top)]',
          items: ['10', '25', '50'],
          pointers: [{ i: 0, label: 'top (10)', tone: 'yellow' }],
          highlights: { active: [0], insert: [0] },
          note: '10 is on top of the stack, ready to be popped and processed.'
        }
      },
      {
        title: {
          en: 'Pop, print, then go right',
          bn: 'পপ, প্রিন্ট, তারপর ডানে'
        },
        explanation: {
          en: 'We hit `null`, so there is nothing more on the left. Time to come back:\n\n1. **pop** the top → `10`, and **print** it (it is the smallest);\n2. go to its **right** child → `null`, nothing there;\n3. pop again → `25`, print it, go to its right child `30` — and start "go left" from `30`.\n\nOutput so far: `10, 25` — already sorted, just like recursive inorder.\n\n> **The whole loop in one sentence:** go left as far as you can (pushing), then pop, print, and step right.',
          bn: '`null`-এ পৌঁছেছি, তাই বাম দিকে আর কিছু নেই। এবার ফেরার পালা:\n\n১. ওপর থেকে **pop** → `10`, আর **প্রিন্ট** করো (এটাই সবচেয়ে ছোট);\n২. তার **ডান** চাইল্ডে যাও → `null`, কিছু নেই;\n৩. আবার pop → `25`, প্রিন্ট করো, তার ডান চাইল্ড `30`-এ যাও — আর `30` থেকে আবার "বামে যাও" শুরু।\n\nএ পর্যন্ত আউটপুট: `10, 25` — রিকার্সিভ ইন-অর্ডারের মতোই সাজানো।\n\n> **পুরো লুপ এক বাক্যে:** যতদূর পারো বামে যাও (push করতে করতে), তারপর pop, প্রিন্ট, আর ডানে এক ধাপ।'
        },
        line: 10,
        iteration: { i: 3, of: 5, label: { en: 'Pop & Print', bn: 'পপ ও প্রিন্ট' } },
        state: { popped: 10, printed: '[10]', nextPop: 25 },
        scene: {
          kind: 'stack',
          label: 'Popped 10. Stack now holds: [50, 25 (top)]',
          items: ['25', '50'],
          pointers: [{ i: 0, label: 'top (25)', tone: 'yellow' }],
          highlights: { active: [0] },
          aux: [{ label: 'Output stream', items: ['10'], highlights: { active: [0] } }],
          note: '10 has been processed; 25 is next in line.'
        }
      },
      {
        title: {
          en: 'Level order uses a queue',
          bn: 'লেভেল অর্ডারে লাগে queue'
        },
        explanation: {
          en: '**Level order** prints the tree **row by row**, left to right. For that we need a **queue** (a fair waiting line: first in, first out):\n\n1. put the root in the queue;\n2. while the queue is not empty:\n   - take the node at the **front** and print it;\n   - put its left child (if any) at the **back**;\n   - put its right child (if any) at the **back**.\n\nOrder for this tree: `50, 25, 75, 10, 30, 60, 90`.\n\n> **Stack vs queue:** a stack (last in, first out) dives deep; a queue (first in, first out) spreads wide.',
          bn: '**লেভেল অর্ডার** ট্রিটা **সারি ধরে**, বাম থেকে ডানে প্রিন্ট করে। এর জন্য লাগে একটা **queue** (ন্যায্য লাইন: যে আগে ঢোকে, সে আগে বের হয়):\n\n১. রুটকে queue-তে রাখো;\n২. যতক্ষণ queue খালি না:\n   - **সামনের** নোডটা নাও আর প্রিন্ট করো;\n   - তার বাম চাইল্ড (থাকলে) **পেছনে** রাখো;\n   - তার ডান চাইল্ড (থাকলে) **পেছনে** রাখো।\n\nএই ট্রির ক্রম: `50, 25, 75, 10, 30, 60, 90`।\n\n> **স্ট্যাক বনাম queue:** স্ট্যাক (শেষে ঢুকলে আগে বের) গভীরে ডুব দেয়; queue (আগে ঢুকলে আগে বের) চওড়ায় ছড়ায়।'
        },
        line: 4,
        iteration: { i: 4, of: 5, label: { en: 'Level-Order', bn: 'লেভেল-অর্ডার' } },
        state: { dequeued: 50, queue: '[25, 75]', printed: '[50]' },
        scene: {
          kind: 'queue',
          label: 'Queue processing root 50 → Children [25, 75] enqueued',
          items: ['25', '75'],
          pointers: [
            { i: 0, label: 'front (25)', tone: 'cyan' },
            { i: 1, label: 'rear (75)', tone: 'yellow' }
          ],
          highlights: { active: [0], insert: [1] },
          note: 'Queue guarantees nodes are visited in exact level sequence.'
        }
      },
      {
        title: {
          en: 'Level order, row by row',
          bn: 'লেভেল অর্ডার, সারি ধরে ধরে'
        },
        explanation: {
          en: 'Look at how the queue empties one row before the next one starts:\n\n- **Row 1:** `50`\n- **Row 2:** `25, 75`\n- **Row 3:** `10, 30, 60, 90`\n\nWhen we print a node, its children join the **back** of the line — behind everyone from its own row. That is what keeps the rows in order.\n\n> **For pros:** O(N) time; the queue holds at most one row, so memory is O(width of the widest row).',
          bn: 'দেখো, পরের সারি শুরুর আগে queue কীভাবে একটা সারি খালি করে:\n\n- **সারি ১:** `50`\n- **সারি ২:** `25, 75`\n- **সারি ৩:** `10, 30, 60, 90`\n\nএকটা নোড প্রিন্ট করলে তার চাইল্ডরা লাইনের **পেছনে** যোগ দেয় — তার নিজের সারির সবার পেছনে। এভাবেই সারির ক্রম ঠিক থাকে।\n\n> **অভিজ্ঞদের জন্য:** সময় O(N); queue-তে বড়জোর একটা সারি থাকে, তাই মেমরি O(সবচেয়ে চওড়া সারির প্রস্থ)।'
        },
        line: 11,
        iteration: { i: 5, of: 5, label: { en: 'BFS Result', bn: 'BFS ফলাফল' } },
        state: { level1: '[50]', level2: '[25, 75]', level3: '[10, 30, 60, 90]' },
        scene: {
          kind: 'tree',
          label: 'Level-Order Traversal sequence: 50 → 25 → 75 → 10 → 30 → 60 → 90',
          root: {
            v: 50,
            sub: 'L1: #1',
            l: { v: 25, sub: 'L2: #2', l: { v: 10, sub: 'L3: #4' }, r: { v: 30, sub: 'L3: #5' } },
            r: { v: 75, sub: 'L2: #3', l: { v: 60, sub: 'L3: #6' }, r: { v: 90, sub: 'L3: #7' } }
          },
          highlights: { current: 50, active: [25, 75], visited: [10, 30, 60, 90] },
          legend: [
            { label: 'Level 1 (#1)', color: 'var(--yellow)' },
            { label: 'Level 2 (#2, #3)', color: 'var(--cyan)' },
            { label: 'Level 3 (#4-#7)', color: 'var(--green)' }
          ],
          note: 'BFS visits every node in order of depth from the root.'
        }
      }
    ]
  },

  {
    id: 'queue-tree-creation',
    name: { en: 'Queue-Based Dynamic Tree Creation', bn: 'কিউ ভিত্তিক ডাইনামিক ট্রি গঠন' },
    description: {
      en: 'Build any tree from user input, one node at a time',
      bn: 'ব্যবহারকারীর ইনপুট থেকে যেকোনো ট্রি বানানো, একবারে একটা নোড'
    },
    categoryKey: 'trees',
    subgroupKey: 'traversals',
    level: 'intermediate',
    order: 40,
    icon: '🏗️',
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      note: {
        en: 'Creates any arbitrary binary tree in linear O(n) time by enqueuing dynamically allocated node addresses and linking children interactively.',
        bn: 'ডাইনামিক নোড তৈরি করে কিউতে অ্যাড্রেস রেখে যেকোনো বাইনারি ট্রি O(n) লিনিয়ার সময়ে তৈরি করার ক্লাসিক্যাল পদ্ধতি।'
      }
    },
    code: {
      pseudo: {
        en: [
          "// Queue-Based Dynamic Binary Tree Construction",
          "function createTree():",
          "  read rootVal; if rootVal == -1: return null",
          "  root = new Node(rootVal)",
          "  queue.enqueue(root)",
          "  while not queue.isEmpty():",
          "    p = queue.dequeue()",
          "    read leftVal",
          "    if leftVal != -1:",
          "      p.lchild = new Node(leftVal); queue.enqueue(p.lchild)",
          "    read rightVal",
          "    if rightVal != -1:",
          "      p.rchild = new Node(rightVal); queue.enqueue(p.rchild)",
          "  return root",
          "",
          "",
          ""
        ],
        bn: [
          "// কিউ ভিত্তিক ডাইনামিক বাইনারি ট্রি গঠন",
          "function createTree():",
          "  read rootVal; if rootVal == -1: return null",
          "  root = new Node(rootVal)",
          "  queue.enqueue(root)",
          "  while not queue.isEmpty():",
          "    p = queue.dequeue()",
          "    read leftVal",
          "    if leftVal != -1:",
          "      p.lchild = new Node(leftVal); queue.enqueue(p.lchild)",
          "    read rightVal",
          "    if rightVal != -1:",
          "      p.rchild = new Node(rightVal); queue.enqueue(p.rchild)",
          "  return root",
          "",
          "",
          ""
        ]
      },
      js: {
        en: [
          "// JavaScript Queue Tree Creation",
          "function createTree(values) {",
          "  let i = 0;",
          "  if (!values.length || values[0] === -1) return null;",
          "  const root = new Node(values[i++]);",
          "  const queue = [root];",
          "  while (queue.length && i < values.length) {",
          "    const p = queue.shift();",
          "    const leftVal = values[i++];",
          "    if (leftVal !== -1) { p.lchild = new Node(leftVal); queue.push(p.lchild); }",
          "    const rightVal = values[i++];",
          "    if (rightVal !== -1) { p.rchild = new Node(rightVal); queue.push(p.rchild); }",
          "  }",
          "  return root;",
          "}",
          "",
          ""
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট কিউ ট্রি ক্রিয়েশন",
          "function createTree(values) {",
          "  let i = 0;",
          "  if (!values.length || values[0] === -1) return null;",
          "  const root = new Node(values[i++]);",
          "  const queue = [root];",
          "  while (queue.length && i < values.length) {",
          "    const p = queue.shift();",
          "    const leftVal = values[i++];",
          "    if (leftVal !== -1) { p.lchild = new Node(leftVal); queue.push(p.lchild); }",
          "    const rightVal = values[i++];",
          "    if (rightVal !== -1) { p.rchild = new Node(rightVal); queue.push(p.rchild); }",
          "  }",
          "  return root;",
          "}",
          "",
          ""
        ]
      },
      java: {
        en: [
          "// Java Queue Tree Creation",
          "Node createTree(Queue<Integer> input) {",
          "  if (input.isEmpty()) return null;",
          "  int rootVal = input.poll();",
          "  if (rootVal == -1) return null;",
          "  Node root = new Node(rootVal);",
          "  Queue<Node> q = new LinkedList<>();",
          "  q.offer(root);",
          "  while (!q.isEmpty()) {",
          "    Node p = q.poll();",
          "    Integer l = input.poll();",
          "    if (l != null && l != -1) { p.lchild = new Node(l); q.offer(p.lchild); }",
          "    Integer r = input.poll();",
          "    if (r != null && r != -1) { p.rchild = new Node(r); q.offer(p.rchild); }",
          "  }",
          "  return root;",
          "}"
        ],
        bn: [
          "// জাভা কিউ ট্রি ক্রিয়েশন",
          "Node createTree(Queue<Integer> input) {",
          "  if (input.isEmpty()) return null;",
          "  int rootVal = input.poll();",
          "  if (rootVal == -1) return null;",
          "  Node root = new Node(rootVal);",
          "  Queue<Node> q = new LinkedList<>();",
          "  q.offer(root);",
          "  while (!q.isEmpty()) {",
          "    Node p = q.poll();",
          "    Integer l = input.poll();",
          "    if (l != null && l != -1) { p.lchild = new Node(l); q.offer(p.lchild); }",
          "    Integer r = input.poll();",
          "    if (r != null && r != -1) { p.rchild = new Node(r); q.offer(p.rchild); }",
          "  }",
          "  return root;",
          "}"
        ]
      },
      python: {
        en: [
          "# Python Queue Tree Creation",
          "from collections import deque",
          "def create_tree(values):",
          "  if not values or values[0] == -1: return None",
          "  it = iter(values)",
          "  root = Node(next(it))",
          "  q = deque([root])",
          "  while q:",
          "    p = q.popleft()",
          "    l = next(it, -1)",
          "    if l != -1: p.lchild = Node(l); q.append(p.lchild)",
          "    r = next(it, -1)",
          "    if r != -1: p.rchild = Node(r); q.append(p.rchild)",
          "  return root",
          "",
          "",
          ""
        ],
        bn: [
          "# পাইথন কিউ ট্রি ক্রিয়েশন",
          "from collections import deque",
          "def create_tree(values):",
          "  if not values or values[0] == -1: return None",
          "  it = iter(values)",
          "  root = Node(next(it))",
          "  q = deque([root])",
          "  while q:",
          "    p = q.popleft()",
          "    l = next(it, -1)",
          "    if l != -1: p.lchild = Node(l); q.append(p.lchild)",
          "    r = next(it, -1)",
          "    if r != -1: p.rchild = Node(r); q.append(p.rchild)",
          "  return root",
          "",
          "",
          ""
        ]
      },
      cpp: {
        en: [
          "// C++ Queue Tree Creation",
          "Node* createTree() {",
          "  int x; cin >> x;",
          "  if (x == -1) return nullptr;",
          "  Node* root = new Node(x);",
          "  queue<Node*> q; q.push(root);",
          "  while (!q.empty()) {",
          "    Node* p = q.front(); q.pop();",
          "    cin >> x;",
          "    if (x != -1) { p->lchild = new Node(x); q.push(p->lchild); }",
          "    cin >> x;",
          "    if (x != -1) { p->rchild = new Node(x); q.push(p->rchild); }",
          "  }",
          "  return root;",
          "}",
          "",
          ""
        ],
        bn: [
          "// সি++ কিউ ট্রি ক্রিয়েশন",
          "Node* createTree() {",
          "  int x; cin >> x;",
          "  if (x == -1) return nullptr;",
          "  Node* root = new Node(x);",
          "  queue<Node*> q; q.push(root);",
          "  while (!q.empty()) {",
          "    Node* p = q.front(); q.pop();",
          "    cin >> x;",
          "    if (x != -1) { p->lchild = new Node(x); q.push(p->lchild); }",
          "    cin >> x;",
          "    if (x != -1) { p->rchild = new Node(x); q.push(p->rchild); }",
          "  }",
          "  return root;",
          "}",
          "",
          ""
        ]
      }
    },
    steps: [
      {
        title: {
          en: 'Building a tree from the user\'s answers',
          bn: 'ব্যবহারকারীর উত্তর থেকে ট্রি বানানো'
        },
        explanation: {
          en: 'How can a program build **any** tree the user wants? It asks questions, one node at a time, and uses a **queue** to remember whose children it still has to ask about.\n\n1. Ask for the root (say `10`). Create it and put it in the queue.\n2. Take the node at the **front** of the queue and ask: "**left** child?" and "**right** child?"\n3. The answer **`-1` means "no child"**. Any other number creates a new node, links it, and puts it at the **back** of the queue.\n4. Repeat until the queue is empty.',
          bn: 'একটা প্রোগ্রাম ব্যবহারকারীর ইচ্ছামতো **যেকোনো** ট্রি কীভাবে বানাবে? এটা প্রশ্ন করে, একবারে একটা নোড নিয়ে, আর একটা **queue** দিয়ে মনে রাখে এখনো কার চাইল্ডের কথা জিজ্ঞেস করা বাকি।\n\n১. রুট জিজ্ঞেস করো (ধরো `10`)। বানাও আর queue-তে রাখো।\n২. queue-এর **সামনের** নোডটা নাও আর জিজ্ঞেস করো: "**বাম** চাইল্ড?" আর "**ডান** চাইল্ড?"\n৩. উত্তর **`-1` মানে "চাইল্ড নেই"**। অন্য যেকোনো সংখ্যা নতুন নোড বানায়, জুড়ে দেয়, আর queue-এর **পেছনে** রাখে।\n৪. queue খালি না হওয়া পর্যন্ত চালিয়ে যাও।'
        },
        line: 4,
        iteration: { i: 1, of: 4, label: { en: 'Protocol', bn: 'প্রোটোকল' } },
        state: { rootAllocated: 10, queue: '[Node(10)]', sentinel: -1 },
        scene: {
          kind: 'queue',
          label: 'Queue holds pointer to newly allocated Root Node(10)',
          items: ['Node(10)'],
          pointers: [{ i: 0, label: 'front & rear', tone: 'yellow' }],
          highlights: { active: [0] },
          note: 'Queue holds memory pointers of nodes that are waiting to receive their children.'
        }
      },
      {
        title: {
          en: 'Ask about 10\'s children',
          bn: '10-এর চাইল্ড জিজ্ঞেস করো'
        },
        explanation: {
          en: 'Take `10` from the front of the queue:\n\n- "Left child of 10?" → user types **`20`** → create node 20, set it as the left child, add it to the queue.\n- "Right child of 10?" → user types **`30`** → create node 30, set it as the right child, add it to the queue.\n\nQueue now: `[20, 30]` — the next nodes to ask about, in row order.',
          bn: 'queue-এর সামনে থেকে `10` নাও:\n\n- "10-এর বাম চাইল্ড?" → ব্যবহারকারী লেখে **`20`** → নোড 20 বানাও, বাম চাইল্ড করো, queue-তে যোগ করো।\n- "10-এর ডান চাইল্ড?" → ব্যবহারকারী লেখে **`30`** → নোড 30 বানাও, ডান চাইল্ড করো, queue-তে যোগ করো।\n\nএখন queue: `[20, 30]` — এরপর যাদের কথা জিজ্ঞেস করা হবে, সারির ক্রমে।'
        },
        line: 9,
        iteration: { i: 2, of: 4, label: { en: 'Add Children', bn: 'সন্তান সংযোগ' } },
        state: { p: 10, left: 20, right: 30, queue: '[20, 30]' },
        scene: {
          kind: 'tree',
          label: 'Node 10 dequeued → Linked left child 20 and right child 30',
          root: {
            v: 10,
            l: { v: 20 },
            r: { v: 30 }
          },
          highlights: { current: 10, insert: 20, frontier: [30] },
          legend: [
            { label: 'Current parent p', color: 'var(--yellow)' },
            { label: 'Newly linked child', color: 'var(--green)' }
          ],
          note: 'Pointers p.lchild and p.rchild link heap nodes dynamically.'
        }
      },
      {
        title: {
          en: '-1 means "no child here"',
          bn: '-1 মানে "এখানে চাইল্ড নেই"'
        },
        explanation: {
          en: 'Take `20` from the front:\n\n- "Left child of 20?" → **`40`** → create it, link it, add it to the queue.\n- "Right child of 20?" → **`-1`** → no node is created; 20 simply has no right child.\n\nUsing `-1` (or any value that cannot be real data) as a "no" answer lets the user build **any** shape — even lopsided ones.',
          bn: 'সামনে থেকে `20` নাও:\n\n- "20-এর বাম চাইল্ড?" → **`40`** → বানাও, জুড়ে দাও, queue-তে যোগ করো।\n- "20-এর ডান চাইল্ড?" → **`-1`** → কোনো নোড বানানো হয় না; 20-এর শুধু ডান চাইল্ড নেই।\n\n`-1` (বা এমন কোনো মান যা আসল ডেটা হতে পারে না) "না" উত্তর হিসেবে ব্যবহার করলে ব্যবহারকারী **যেকোনো** আকার বানাতে পারে — একদিকে হেলানোও।'
        },
        line: 11,
        iteration: { i: 3, of: 4, label: { en: 'Sentinel -1', bn: 'সেন্টিনেল -১' } },
        state: { p: 20, left: 40, right: -1, rightChild: 'null' },
        scene: {
          kind: 'tree',
          label: 'Node 20 gets left child 40, but right child is NULL (-1 means "no child")',
          root: {
            v: 10,
            l: { v: 20, l: { v: 40 } },
            r: { v: 30 }
          },
          highlights: { current: 20, insert: 40, active: [30] },
          legend: [
            { label: 'Parent 20', color: 'var(--yellow)' },
            { label: 'New Child 40', color: 'var(--green)' },
            { label: 'Waiting in Queue', color: 'var(--cyan)' }
          ],
          note: 'Right branch of 20 is left empty because input was -1.'
        }
      },
      {
        title: {
          en: 'Done when the queue is empty',
          bn: 'queue খালি হলেই শেষ'
        },
        explanation: {
          en: 'The program stops when the queue is empty — that happens once every leaf has answered `-1` for both children.\n\nEach node enters the queue once and leaves once, so building a tree of N nodes takes **O(N)** steps.',
          bn: 'queue খালি হলে প্রোগ্রাম থামে — এটা হয় যখন প্রতিটা লিফ দুই চাইল্ডের জন্যই `-1` উত্তর দেয়।\n\nপ্রতিটা নোড একবার queue-তে ঢোকে আর একবার বের হয়, তাই N নোডের ট্রি বানাতে **O(N)** ধাপ লাগে।'
        },
        line: 13,
        iteration: { i: 4, of: 4, label: { en: 'Complete', bn: 'সমাপ্ত' } },
        state: { queueEmpty: true, status: 'Tree Constructed in Heap', time: 'O(N)' },
        scene: {
          kind: 'tree',
          label: 'Completed Binary Tree dynamically constructed via Queue in O(N) time',
          root: {
            v: 10,
            l: { v: 20, l: { v: 40 } },
            r: { v: 30, l: { v: 50 }, r: { v: 60 } }
          },
          highlights: { current: 10, active: [20, 30], visited: [40, 50, 60] },
          legend: [
            { label: 'Root (10)', color: 'var(--yellow)' },
            { label: 'Internal Nodes', color: 'var(--cyan)' },
            { label: 'Leaf Nodes', color: 'var(--green)' }
          ],
          note: 'Queue is now empty. The binary tree is fully linked in dynamic Heap memory.'
        }
      }
    ]
  }
];
