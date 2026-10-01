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
      en: 'Interactive In-Order, Pre-Order, Post-Order, and BFS Level-Order with live code',
      bn: 'লাইভ কোডসহ ইন্টারঅ্যাক্টিভ ইন-অর্ডার, প্রি-অর্ডার, পোস্ট-অর্ডার ও BFS'
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
          en: 'In **In-Order Traversal**, you recursively visit the entire left subtree, then process the current node, then visit the right subtree.\n\nOrder: `[D, B, E, A, F, C, G]`\n- **Golden BST Property**: When performed on a Binary Search Tree (BST), In-Order traversal visits keys in **strictly monotonically increasing sorted order**!',
          bn: '**ইন-অর্ডার ট্রাভার্সালে (In-Order)** প্রথমে সম্পূর্ণ বাম সাব-ট্রি শেষ করা হয়, তারপর রুট প্রসেস করা হয়, এবং সবশেষে ডান সাব-ট্রিতে যাওয়া হয়।\n\nক্রম: `[D, B, E, A, F, C, G]`\n- **মহাসত্য উপপাদ্য**: যেকোনো বাইনারি সার্চ ট্রিতে (BST) ইন-অর্ডার চালালে উপাদানগুলো সর্বদা **ছোট থেকে বড় নিখুঁত সাজানো ক্রমে (sorted order)** প্রিন্ট হয়!'
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
          en: '### Genius Pen-and-Paper Trick:\nImagine tracing a continuous outline around the outside of the tree from the left of the root:\n1. **Touch point on LEFT side** of node $\\implies$ **Pre-Order** visit.\n2. **Touch point on BOTTOM / MIDDLE** of node $\\implies$ **In-Order** visit.\n3. **Touch point on RIGHT side** of node $\\implies$ **Post-Order** visit.\n\nTrace the perimeter once with your pen — you can read off all 3 traversals effortlessly!',
          bn: '### জাদুকরী খাতা-কলম ট্রিক:\nরুটের বাম পাশ থেকে শুরু করে ট্রির বাইরের সীমানা বরাবর একটি অবিচ্ছিন্ন রেখা কল্পনা করো:\n১. রেখাটি যখন নোডের **বাম পাশে** ছোঁয় $\\implies$ **প্রি-অর্ডার** ভিজিট।\n২. রেখাটি যখন নোডের **নিচে বা মাঝে** ছোঁয় $\\implies$ **ইন-অর্ডার** ভিজিট।\n৩. রেখাটি যখন নোডের **ডান পাশে** ছোঁয় $\\implies$ **পোস্ট-অর্ডার** ভিজিট।\n\nএকবার চারপাশ দিয়ে দাগ টেনে নিলেই কোনো কোড বা রিকারশন ছাড়াই ৩টি ট্রাভার্সাল নির্ভুলভাবে লিখে ফেলা যায়!'
        },
        line: 0,
        iteration: { i: 4, of: 5, label: { en: 'Flag Trick', bn: 'ফ্ল্যাগ ট্রিক' } },
        state: { leftFlag: 'Pre-Order', bottomFlag: 'In-Order', rightFlag: 'Post-Order' },
        scene: {
          kind: 'cards',
          label: 'The 3-Point Boundary Flag Classification',
          cards: [
            { icon: '🚩', title: 'Left Flag (Pre-Order)', desc: 'Touched as the trace first descends down the node.', state: 'active', tag: 'Root-first', accent: 'var(--yellow)' },
            { icon: '📍', title: 'Bottom Flag (In-Order)', desc: 'Touched between left and right subtree ascents.', state: 'ok', tag: 'Sorted-BST', accent: 'var(--cyan)' },
            { icon: '🏁', title: 'Right Flag (Post-Order)', desc: 'Touched as the trace leaves the node permanently.', state: 'ok', tag: 'Bottom-up', accent: 'var(--green)' }
          ],
          caption: '1 trace around perimeter = 3 flag points per node!'
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
      en: 'Why In-Order is compulsory, and step-by-step reconstruction from Pre-Order + In-Order',
      bn: 'কেন ইন-অর্ডার বাধ্যতামূলক, এবং প্রি ও ইন-অর্ডার দিয়ে ট্রি রিকনস্ট্রাকশন'
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
          "",
          ""
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
          "",
          ""
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
          "  root->lchild = buildTree(leftPre, leftIn);",
          "  root->rchild = buildTree(rightPre, rightIn);",
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
          "  root->lchild = buildTree(leftPre, leftIn);",
          "  root->rchild = buildTree(rightPre, rightIn);",
          "  return root;",
          "}"
        ]
      }
    },
    steps: [
      {
        title: { en: 'Why In-Order is Compulsory for Unique Reconstruction', bn: 'কেন ইন-অর্ডার ট্রাভার্সাল বাধ্যতামূলক' },
        explanation: {
          en: 'Can we build a unique binary tree given only traversal arrays?\n- **Pre-Order alone**: Yields $T(N)$ Catalan ambiguous shapes.\n- **Pre-Order + Post-Order**: FAILS! A parent with one child looks identical whether it is a left or right child.\n\n> **Universal Law**: **In-Order traversal is COMPULSORY**! Because In-Order splits keys cleanly into left side vs right side.',
          bn: 'শুধুমাত্র ট্রাভার্সাল লিস্ট দেখে কি একটি নির্দিষ্ট ট্রি ফিরিয়ে আনা সম্ভব?\n- **শুধু প্রি-অর্ডার**: কাতালান $T(N)$ সংখ্যক ভিন্ন আকৃতি তৈরি করতে পারে।\n- **প্রি-অর্ডার + পোস্ট-অর্ডার**: ব্যর্থ হয়! সন্তানটি বামে নাকি ডানে আছে তা বোঝা যায় না।\n\n> **বাধ্যতামূলক নিয়ম**: **ইন-অর্ডার থাকা বাধ্যতামূলক**! কারণ ইন-অর্ডার যেকোনো রুটের বাম ও ডান পাশকে দ্ব্যর্থহীনভাবে ভাগ করে দেয়।'
        },
        line: 0,
        iteration: { i: 1, of: 4, label: { en: 'Compulsory Rule', bn: 'মূল নিয়ম' } },
        state: { preorderAlone: 'Ambiguous', prePlusPost: 'Ambiguous', inOrderRequired: true },
        scene: {
          kind: 'cards',
          label: 'Traversal Combinations & Uniqueness',
          cards: [
            { icon: '❌', title: 'Pre + Post', desc: 'Cannot determine if child is left or right.', state: 'bad', tag: 'Ambiguous', accent: 'var(--red)' },
            { icon: '✅', title: 'Pre + In', desc: 'Pre gives the root; In splits left/right subtrees.', state: 'active', tag: 'Unique', accent: 'var(--green)' },
            { icon: '✅', title: 'Post + In', desc: 'Post gives root (at end); In splits subtrees.', state: 'ok', tag: 'Unique', accent: 'var(--cyan)' }
          ],
          caption: 'In-Order is strictly mandatory to reconstruct any unique binary tree.'
        }
      },
      {
        title: { en: 'Step 1: Identifying the Root from Pre-Order', bn: 'ধাপ ১: প্রি-অর্ডার থেকে রুট শনাক্তকরণ' },
        explanation: {
          en: 'Given:\n- `Pre-Order = [A, B, D, E, C, F]`\n- `In-Order  = [D, B, E, A, F, C]`\n\nBecause Pre-Order is `[Root, Left, Right]`, the **very first element is ALWAYS the root** of the current tree: **`A`**!',
          bn: 'ধরি দেওয়া আছে:\n- `Pre-Order = [A, B, D, E, C, F]`\n- `In-Order  = [D, B, E, A, F, C]`\n\nযেহেতু প্রি-অর্ডারের নিয়ম `[রুট, বাম, ডান]`, তাই **সবার প্রথম উপাদানটিই সর্বদা ট্রির মূল রুট**: **`A`**!'
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
        title: { en: 'Step 2: Partitioning Left and Right Subtrees in In-Order', bn: 'ধাপ ২: ইন-অর্ডারে বাম ও ডান সাব-ট্রি পৃথকীকরণ' },
        explanation: {
          en: 'Now locate root **`A`** inside `In-Order = [D, B, E, A, F, C]`:\n- Everything to the **left** of `A` belongs to the **Left Subtree**: `[D, B, E]` (3 nodes).\n- Everything to the **right** of `A` belongs to the **Right Subtree**: `[F, C]` (2 nodes).\n\nNow we take 3 nodes from Pre-Order for the left (`[B, D, E]`) and 2 nodes for the right (`[C, F]`). Recurse!',
          bn: 'এবার `In-Order = [D, B, E, A, F, C]`-এর মধ্যে রুট **`A`**-কে খুঁজে বের করো:\n- `A`-এর **বাম পাশের** সব নোড বাম সাব-ট্রির অংশ: `[D, B, E]` (৩টি নোড)।\n- `A`-এর **ডান পাশের** সব নোড ডান সাব-ট্রির অংশ: `[F, C]` (২টি নোড)।\n\nএখন প্রি-অর্ডারের পরবর্তী ৩টি নোড বাম সাব-ট্রিতে (`[B, D, E]`) এবং শেষ ২টি নোড ডান সাব-ট্রিতে (`[C, F]`) চলে যাবে। এবার রিকারশন চালাও!'
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
        title: { en: 'Step 3: The Complete Reconstructed Unique Tree', bn: 'ধাপ ৩: সম্পূর্ণ পুনর্গঠিত একক বাইনারি ট্রি' },
        explanation: {
          en: 'By repeating this process recursively on each partition, the entire tree is reconstructed unambiguously:\n- Root `A` with Left child `B` and Right child `C`.\n- `B` has Left child `D` and Right child `E`.\n- `C` has Left child `F`.\n\nEvery node is placed in its exact unique position in $O(N)$ time!',
          bn: 'প্রতিটি অংশে একই প্রক্রিয়া রিকারসিভভাবে চালিয়ে পুরো ট্রিটি নির্ভুলভাবে পুনর্গঠিত হয়:\n- রুট `A`-এর বাম সন্তান `B` এবং ডান সন্তান `C`।\n- `B`-এর বাম সন্তান `D` এবং ডান সন্তান `E`।\n- `C`-এর বাম সন্তান `F`।\n\nপ্রতিটি নোড তার নিজস্ব সঠিক জায়গায় বসে ঠিক $O(N)$ সময়ে!'
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
      en: 'Iterative In-Order using explicit user stack and Level-Order BFS using FIFO queue',
      bn: 'ইউজার স্ট্যাক দিয়ে ইটারেটিভ ইন-অর্ডার এবং ফিফো কিউ দিয়ে লেভেল-অর্ডার BFS'
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
        title: { en: 'Why Iterative Traversals? Eliminating Call Stack Overflow', bn: 'কেন ইটারেটিভ ট্রাভার্সাল? কল স্ট্যাক ওভারফ্লো প্রতিরোধ' },
        explanation: {
          en: 'Recursive functions use the OS function call stack implicitly. If a tree is skewed and has $100,000$ nodes, recursion causes **Stack Overflow crash**!\n\nBy managing our own explicit `Stack` data structure in heap memory, our code can process trees of arbitrary depth with zero risk of stack overflow.',
          bn: 'রিকারসিভ ফাংশন অপারেটিং সিস্টেমের কল স্ট্যাকের উপর নির্ভরশীল। একটি স্কিউড ট্রিতে $১,০০,০০০$ নোড থাকলে রিকারশন **স্ট্যাক ওভারফ্লো ক্র্যাশ** ঘটাবে!\n\nহিপ মেমোরিতে নিজস্ব এক্সপ্লিসিট `Stack` ব্যবহার করলে মেমোরি ক্র্যাশের কোনো ভয় ছাড়াই যেকোনো আকারের ট্রি প্রসেস করা সম্ভব।'
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
        title: { en: 'Pushing Left Nodes into Stack', bn: 'বাম দিকের নোডগুলো স্ট্যাকে পুশ করা' },
        explanation: {
          en: 'Execution starts with `curr = 50` (root):\n1. `curr != null` $\\implies$ `stack.push(50)`, move to `curr = curr.lchild` (25).\n2. `curr != null` $\\implies$ `stack.push(25)`, move to `curr = curr.lchild` (10).\n3. `curr != null` $\\implies$ `stack.push(10)`, move to `curr = curr.lchild` (null).\n\nNow `curr == null`, and the stack holds `[50, 25, 10]` waiting to be visited in reverse!',
          bn: 'শুরুতে `curr = 50` (রুট):\n১. `curr != null` $\\implies$ `stack.push(50)`, বামে যাও `curr = 25`।\n২. `curr != null` $\\implies$ `stack.push(25)`, বামে যাও `curr = 10`।\n৩. `curr != null` $\\implies$ `stack.push(10)`, বামে যাও `curr = null`।\n\nএখন `curr == null`, আর স্ট্যাকে উল্টো ক্রমে প্রিন্ট হওয়ার অপেক্ষায় আছে `[50, 25, 10]`!'
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
        title: { en: 'Popping, Printing, and Moving Right', bn: 'পপ, প্রিন্ট এবং ডানে গমন' },
        explanation: {
          en: 'Because `curr == null`:\n1. Pop `curr = stack.pop()` $\\implies$ pops **`10`**.\n2. **Visit/Print `10`**! (Smallest element).\n3. Move `curr = curr.rchild` $\\implies$ 10 has no right child (`null`).\n4. Next loop: pop **`25`**, print `25`, move to its right child **`30`**.\n\nOutput so far: `10, 25`! In-order sorted property in action.',
          bn: 'যেহেতু `curr == null`:\n১. পপ করো `curr = stack.pop()` $\\implies$ বের হলো **`10`**।\n২. **প্রিন্ট করো `10`**! (সবচেয়ে ছোট উপাদান)।\n৩. ডানে যাও `curr = curr.rchild` $\\implies$ ১০-এর ডান চাইল্ড নেই (`null`)।\n৪. পরের লুপে: পপ করো **`25`**, প্রিন্ট করো `25`, তারপর তার ডান সন্তান **`30`**-এ যাও।\n\nআউটপুট: `10, 25`! ইন-অর্ডার সর্টেড ক্রম বজায় থাকছে।'
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
        title: { en: 'Level-Order Traversal with FIFO Queue', bn: 'FIFO কিউ দিয়ে লেভেল-অর্ডার ট্রাভার্সাল' },
        explanation: {
          en: '### Level-Order Traversal (Breadth-First Search):\nVisits nodes **level by level from top to bottom** and left to right within each level.\n\nBecause we must process nodes in First-In, First-Out order, we use a **`Queue`**:\n1. Enqueue root.\n2. While queue is not empty:\n   - Dequeue node `p`, print its value.\n   - If `p.lchild` exists, enqueue it.\n   - If `p.rchild` exists, enqueue it.\n\nOrder: `[50, 25, 75, 10, 30, 60, 90]`.',
          bn: '### লেভেল-অর্ডার ট্রাভার্সাল (BFS):\nনোডগুলোকে **উপর থেকে নিচে লেভেল অনুযায়ী** এবং প্রতিটি লেভেলের ভেতর বাম থেকে ডানে ভিজিট করে।\n\nফার্স্ট-ইন ফার্স্ট-আউট (FIFO) নিয়ম নিশ্চিত করতে আমরা একটি **`Queue`** ব্যবহার করি:\n১. রুটের অ্যাড্রেস কিউতে এনকিউ (enqueue) করো।\n২. যতক্ষণ কিউ খালি না হয়:\n   - সামনের নোড `p` ডিকিউ (dequeue) করো ও প্রিন্ট করো।\n   - `p.lchild` থাকলে কিউতে ঢোকাও।\n   - `p.rchild` থাকলে কিউতে ঢোকাও।\n\nক্রম: `[50, 25, 75, 10, 30, 60, 90]`।'
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
        title: { en: 'Complete Level-Order Visualization', bn: 'লেভেল-অর্ডার ট্রাভার্সালের পূর্ণ চিত্র' },
        explanation: {
          en: 'Visualizing the horizontal slice execution across all 3 levels:\n- **Level 1**: `50`\n- **Level 2**: `25, 75`\n- **Level 3**: `10, 30, 60, 90`\n\nEvery level is cleanly drained before moving to the next level down. $O(N)$ time, $O(W)$ max queue width space.',
          bn: '৩টি লেভেলের অনুভূমিক ট্রাভার্সালের পূর্ণ দৃশ্য:\n- **লেভেল ১**: `50`\n- **লেভেল ২**: `25, 75`\n- **লেভেল ৩**: `10, 30, 60, 90`\n\nনিচের লেভেলে নামার আগে ওপরের লেভেলটি সম্পূর্ণ শেষ করা হয়। সময় $O(N)$, মেমোরি $O(W)$ (সর্বোচ্চ লেভেল প্রস্থ)।'
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
      en: 'Interactive level-order tree construction protocol using queue and sentinel -1 values',
      bn: 'কিউ এবং সেন্টিনেল -১ মান ব্যবহার করে লেভেল-অর্ডারে যেকোনো ট্রি গঠনের অ্যালগরিদম'
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
          "    int l = input.poll();",
          "    if (l != -1) { p.lchild = new Node(l); q.offer(p.lchild); }",
          "    int r = input.poll();",
          "    if (r != -1) { p.rchild = new Node(r); q.offer(p.rchild); }",
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
          "    int l = input.poll();",
          "    if (l != -1) { p.lchild = new Node(l); q.offer(p.lchild); }",
          "    int r = input.poll();",
          "    if (r != -1) { p.rchild = new Node(r); q.offer(p.rchild); }",
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
          "  for p in q:",
          "    l = next(it, -1)",
          "    if l != -1: p.lchild = Node(l); q.append(p.lchild)",
          "    r = next(it, -1)",
          "    if r != -1: p.rchild = Node(r); q.append(p.rchild)",
          "  return root",
          "",
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
          "  for p in q:",
          "    l = next(it, -1)",
          "    if l != -1: p.lchild = Node(l); q.append(p.lchild)",
          "    r = next(it, -1)",
          "    if r != -1: p.rchild = Node(r); q.append(p.rchild)",
          "  return root",
          "",
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
        title: { en: 'The Dynamic Tree Creation Protocol', bn: 'ডাইনামিক ট্রি তৈরির মূল প্রোটোকল' },
        explanation: {
          en: 'How can a program build an arbitrary binary tree from user input?\n\nUsing a **Queue**!\n1. User enters root value (e.g., `10`). Root is allocated in heap memory, and its address is pushed into the queue.\n2. In each iteration, dequeue front node `p` and ask for its **left child** and **right child**.\n3. `-1` serves as the sentinel indicator for `NULL` (no child). Non-negative values create a new child node, link it to `p`, and enqueue it.',
          bn: 'ব্যবহারকারীর ইনপুট থেকে কীভাবে যেকোনো আকারের বাইনারি ট্রি স্বয়ংক্রিয়ভাবে তৈরি করা যায়?\n\nএকটি **Queue** ব্যবহার করে!\n১. ব্যবহারকারী রুটের মান দেন (যেমন `10`)। রুট নোডটি হিপ মেমোরিতে তৈরি করে তার অ্যাড্রেস কিউতে রাখা হয়।\n২. প্রতিটি ধাপে কিউ থেকে একটি নোড `p` বের করা হয় এবং তার **বাম সন্তান** ও **ডান সন্তানের** মান চাওয়া হয়।\n৩. `-1` দিলে তা `NULL` নির্দেশ করে। অন্য যেকোনো সংখ্যার জন্য নতুন নোড তৈরি করে `p`-এর সাথে লিঙ্ক করা হয় এবং কিউতে এনকিউ করা হয়।'
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
        title: { en: 'Dequeuing p=10 and Attaching Children', bn: 'p=10 ডিকিউ করা এবং সন্তান যুক্ত করা' },
        explanation: {
          en: '1. Dequeue `p = Node(10)`.\n2. Prompt: *Left child of 10?* User enters **`20`** $\\implies$ `p.lchild = new Node(20)`, enqueue `20`.\n3. Prompt: *Right child of 10?* User enters **`30`** $\\implies$ `p.rchild = new Node(30)`, enqueue `30`.\n\nQueue now holds `[20, 30]`. Level 1 is completely built!',
          bn: '১. কিউ থেকে বের হলো `p = Node(10)`।\n২. ইনপুট: *১০-এর বাম সন্তান?* ইউজার দিলেন **`20`** $\\implies$ `p.lchild = new Node(20)`, কিউতে ঢোকাও `20`।\n৩. ইনপুট: *১০-এর ডান সন্তান?* ইউজার দিলেন **`30`** $\\implies$ `p.rchild = new Node(30)`, কিউতে ঢোকাও `30`।\n\nকিউতে এখন আছে `[20, 30]`। লেভেল ১ সম্পূর্ণ গঠিত!'
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
        title: { en: 'Handling Sentinel -1 (NULL Child)', bn: 'সেন্টিনেল -১ (NULL) হ্যান্ডলিং' },
        explanation: {
          en: '1. Dequeue `p = Node(20)`.\n2. *Left child of 20?* User enters **`40`** $\\implies$ `p.lchild = new Node(40)`, enqueue `40`.\n3. *Right child of 20?* User enters **`-1`** $\\implies$ sentinel detected! `p.rchild` remains `NULL`, nothing enqueued.\n\nThis gives complete freedom to shape any asymmetric or skewed tree!',
          bn: '১. কিউ থেকে বের হলো `p = Node(20)`।\n২. *২০-এর বাম সন্তান?* ইউজার দিলেন **`40`** $\\implies$ `p.lchild = new Node(40)`, কিউতে ঢোকাও `40`।\n৩. *২০-এর ডান সন্তান?* ইউজার দিলেন **`-1`** $\\implies$ সেন্টিনেল পাওয়া গেছে! `p.rchild` থাকবে `NULL`, কিউতে কিছু ঢুকবে না।\n\nএর মাধ্যমে ব্যবহারকারী যেকোনো প্রকার অপ্রতিসম বা স্কিউড ট্রি বানাতে পারেন!'
        },
        line: 11,
        iteration: { i: 3, of: 4, label: { en: 'Sentinel -1', bn: 'সেন্টিনেল -১' } },
        state: { p: 20, left: 40, right: -1, rightChild: 'null' },
        scene: {
          kind: 'tree',
          label: 'Node 20 gets left child 40, but right child is NULL (-1 sentinel)',
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
        title: { en: 'Construction Complete: O(N) Linear Time', bn: 'ট্রি গঠন সমাপ্ত: O(N) লিনিয়ার সময়' },
        explanation: {
          en: 'The queue drains when all leaf nodes receive `-1` for both of their children.\n\nComplexity Analysis:\n- **Time**: Exactly $O(N)$, because every node is enqueued once and dequeued once.\n- **Space**: $O(N)$ queue memory at the widest level.\n\nThis is the verified C++ queue creation algorithm taught in university DSA courses.',
          bn: 'যখন নিচের সব লিফ নোডের জন্য ইউজার `-1` দেন, তখন কিউটি শূন্য হয়ে লুপ সমাপ্ত হয়।\n\nজটিলতা বিশ্লেষণ:\n- **সময়**: ঠিক $O(N)$, কারণ প্রতিটি নোড ঠিক একবার কিউতে ঢোকে এবং একবার বের হয়।\n- **মেমোরি**: $O(N)$ কিউ স্পেস।\n\nএটি বিশ্বমানের বিশ্ববিদ্যালয়গুলোতে শেখানো পরীক্ষিত ও নির্ভুল C++ কিউ ট্রি কনস্ট্রাকশন অ্যালগরিদম।'
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
