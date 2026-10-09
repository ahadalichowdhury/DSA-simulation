/**
 * Standardized Code and Metadata for all 4 Tree Traversals
 * (In-Order, Pre-Order, Post-Order, BFS Level-Order)
 * Synchronized across 5 languages: pseudo, js, java, python, cpp.
 */

function code5(lines) {
  return {
    pseudo: {
      en: lines.map((l) => l.pseudo ?? l.en ?? ''),
      bn: lines.map((l) => l.pseudoBn ?? l.bn ?? l.pseudo ?? '')
    },
    js: {
      en: lines.map((l) => l.js ?? l.en ?? ''),
      bn: lines.map((l) => l.jsBn ?? l.bn ?? l.js ?? '')
    },
    java: {
      en: lines.map((l) => l.java ?? l.en ?? ''),
      bn: lines.map((l) => l.javaBn ?? l.bn ?? l.java ?? '')
    },
    python: {
      en: lines.map((l) => l.python ?? l.en ?? ''),
      bn: lines.map((l) => l.pythonBn ?? l.bn ?? l.python ?? '')
    },
    cpp: {
      en: lines.map((l) => l.cpp ?? l.en ?? ''),
      bn: lines.map((l) => l.cppBn ?? l.bn ?? l.cpp ?? '')
    }
  };
}

export const TRAVERSAL_CONFIGS = {
  inorder: {
    id: 'inorder',
    name: {
      en: 'In-Order Traversal (Left → Root → Right)',
      bn: 'ইন-অর্ডার ট্রাভার্সাল (বাম → রুট → ডান)'
    },
    description: {
      en: 'Left subtree first, then visit Root, then Right subtree. In a BST, produces strictly sorted keys!',
      bn: 'প্রথমে বাম সাব-ট্রি, তারপর রুট ভিজিট, সবশেষে ডান সাব-ট্রি। BST-তে এটি সর্বদা সর্টেড আউটপুট দেয়!'
    },
    complexity: {
      time: 'O(N)',
      space: 'O(h)',
      note: {
        en: 'Visits every node once. Recursive call stack depth equals tree height h.',
        bn: 'প্রতিটি নোড একবার স্পর্শ করে। রিকারসিভ কল স্ট্যাকের গভীরতা ট্রির উচ্চতা h-এর সমান।'
      }
    },
    code: code5([
      {
        pseudo: '// In-Order Traversal: Left -> Root -> Right',
        pseudoBn: '// ইন-অর্ডার ট্রাভার্সাল: বাম -> রুট -> ডান',
        js: '// JavaScript In-Order Traversal',
        jsBn: '// জাভাস্ক্রিপ্ট ইন-অর্ডার ট্রাভার্সাল',
        java: '// Java In-Order Traversal',
        javaBn: '// জাভা ইন-অর্ডার ট্রাভার্সাল',
        python: '# Python In-Order Traversal',
        pythonBn: '# পাইথন ইন-অর্ডার ট্রাভার্সাল',
        cpp: '// C++ In-Order Traversal',
        cppBn: '// সি++ ইন-অর্ডার ট্রাভার্সাল'
      },
      {
        pseudo: 'function inOrder(root):',
        pseudoBn: 'function inOrder(root):',
        js: 'function inOrder(root) {',
        jsBn: 'function inOrder(root) {',
        java: 'void inOrder(TreeNode root) {',
        javaBn: 'void inOrder(TreeNode root) {',
        python: 'def in_order(root):',
        pythonBn: 'def in_order(root):',
        cpp: 'void inOrder(TreeNode* root) {',
        cppBn: 'void inOrder(TreeNode* root) {'
      },
      {
        pseudo: '  if root == null: return',
        pseudoBn: '  if root == null: return',
        js: '  if (!root) return;',
        jsBn: '  if (!root) return;',
        java: '  if (root == null) return;',
        javaBn: '  if (root == null) return;',
        python: '  if not root: return',
        pythonBn: '  if not root: return',
        cpp: '  if (!root) return;',
        cppBn: '  if (!root) return;'
      },
      {
        pseudo: '  inOrder(root.left)     // 1. Traverse left',
        pseudoBn: '  inOrder(root.left)     // ১. বাম সাব-ট্রি',
        js: '  inOrder(root.left);    // 1. Traverse left',
        jsBn: '  inOrder(root.left);    // ১. বাম সাব-ট্রি',
        java: '  inOrder(root.left);    // 1. Traverse left',
        javaBn: '  inOrder(root.left);    // ১. বাম সাব-ট্রি',
        python: '  in_order(root.left)    # 1. Traverse left',
        pythonBn: '  in_order(root.left)    # ১. বাম সাব-ট্রি',
        cpp: '  inOrder(root->left);   // 1. Traverse left',
        cppBn: '  inOrder(root->left);   // ১. বাম সাব-ট্রি'
      },
      {
        pseudo: '  visit(root.val)        // 2. Visit root',
        pseudoBn: '  visit(root.val)        // ২. রুট ভিজিট',
        js: '  console.log(root.val); // 2. Visit root',
        jsBn: '  console.log(root.val); // ২. রুট ভিজিট',
        java: '  System.out.print(root.val + " ");',
        javaBn: '  System.out.print(root.val + " ");',
        python: '  print(root.val, end=" ")',
        pythonBn: '  print(root.val, end=" ")',
        cpp: '  cout << root->val << " ";',
        cppBn: '  cout << root->val << " ";'
      },
      {
        pseudo: '  inOrder(root.right)    // 3. Traverse right',
        pseudoBn: '  inOrder(root.right)    // ৩. ডান সাব-ট্রি',
        js: '  inOrder(root.right);   // 3. Traverse right',
        jsBn: '  inOrder(root.right);   // ৩. ডান সাব-ট্রি',
        java: '  inOrder(root.right);   // 3. Traverse right',
        javaBn: '  inOrder(root.right);   // ৩. ডান সাব-ট্রি',
        python: '  in_order(root.right)   # 3. Traverse right',
        pythonBn: '  in_order(root.right)   # ৩. ডান সাব-ট্রি',
        cpp: '  inOrder(root->right);  // 3. Traverse right',
        cppBn: '  inOrder(root->right);  // ৩. ডান সাব-ট্রি'
      },
      {
        pseudo: '  // this node is done → go back to the caller',
        pseudoBn: '  // এই নোড শেষ → যে ডেকেছিল তার কাছে ফেরো',
        js: '}',
        jsBn: '}',
        java: '}',
        javaBn: '}',
        python: '  # this node is done → go back to the caller',
        pythonBn: '  # এই নোড শেষ → যে ডেকেছিল তার কাছে ফেরো',
        cpp: '}',
        cppBn: '}'
      }
    ])
  },

  preorder: {
    id: 'preorder',
    name: {
      en: 'Pre-Order Traversal (Root → Left → Right)',
      bn: 'প্রি-অর্ডার ট্রাভার্সাল (রুট → বাম → ডান)'
    },
    description: {
      en: 'Visit Root first, then explore Left subtree, then Right subtree. Used for tree cloning and serialization.',
      bn: 'সবার আগে রুট ভিজিট, তারপর বাম সাব-ট্রি, সবশেষে ডান সাব-ট্রি। ট্রি ক্লোনিং ও সিরিয়ালাইজেশনে ব্যবহৃত হয়।'
    },
    complexity: {
      time: 'O(N)',
      space: 'O(h)',
      note: {
        en: 'Visits every node once. Call stack maximum height is tree height h.',
        bn: 'প্রতিটি নোড একবার স্পর্শ করে। স্ট্যাক মেমোরি O(h)।'
      }
    },
    code: code5([
      {
        pseudo: '// Pre-Order Traversal: Root -> Left -> Right',
        pseudoBn: '// প্রি-অর্ডার ট্রাভার্সাল: রুট -> বাম -> ডান',
        js: '// JavaScript Pre-Order Traversal',
        jsBn: '// জাভাস্ক্রিপ্ট প্রি-অর্ডার ট্রাভার্সাল',
        java: '// Java Pre-Order Traversal',
        javaBn: '// Java প্রি-অর্ডার ট্রাভার্সাল',
        python: '# Python Pre-Order Traversal',
        pythonBn: '# পাইথন প্রি-অর্ডার ট্রাভার্সাল',
        cpp: '// C++ Pre-Order Traversal',
        cppBn: '// সি++ প্রি-অর্ডার ট্রাভার্সাল'
      },
      {
        pseudo: 'function preOrder(root):',
        pseudoBn: 'function preOrder(root):',
        js: 'function preOrder(root) {',
        jsBn: 'function preOrder(root) {',
        java: 'void preOrder(TreeNode root) {',
        javaBn: 'void preOrder(TreeNode root) {',
        python: 'def pre_order(root):',
        pythonBn: 'def pre_order(root):',
        cpp: 'void preOrder(TreeNode* root) {',
        cppBn: 'void preOrder(TreeNode* root) {'
      },
      {
        pseudo: '  if root == null: return',
        pseudoBn: '  if root == null: return',
        js: '  if (!root) return;',
        jsBn: '  if (!root) return;',
        java: '  if (root == null) return;',
        javaBn: '  if (root == null) return;',
        python: '  if not root: return',
        pythonBn: '  if not root: return',
        cpp: '  if (!root) return;',
        cppBn: '  if (!root) return;'
      },
      {
        pseudo: '  visit(root.val)        // 1. Visit root',
        pseudoBn: '  visit(root.val)        // ১. রুট ভিজিট',
        js: '  console.log(root.val); // 1. Visit root',
        jsBn: '  console.log(root.val); // ১. রুট ভিজিট',
        java: '  System.out.print(root.val + " ");',
        javaBn: '  System.out.print(root.val + " ");',
        python: '  print(root.val, end=" ")',
        pythonBn: '  print(root.val, end=" ")',
        cpp: '  cout << root->val << " ";',
        cppBn: '  cout << root->val << " ";'
      },
      {
        pseudo: '  preOrder(root.left)    // 2. Traverse left',
        pseudoBn: '  preOrder(root.left)    // ২. বাম সাব-ট্রি',
        js: '  preOrder(root.left);   // 2. Traverse left',
        jsBn: '  preOrder(root.left);   // ২. বাম সাব-ট্রি',
        java: '  preOrder(root.left);   // 2. Traverse left',
        javaBn: '  preOrder(root.left);   // ২. বাম সাব-ট্রি',
        python: '  pre_order(root.left)   # 2. Traverse left',
        pythonBn: '  pre_order(root.left)   # ২. বাম সাব-ট্রি',
        cpp: '  preOrder(root->left);  // 2. Traverse left',
        cppBn: '  preOrder(root->left);  // ২. বাম সাব-ট্রি'
      },
      {
        pseudo: '  preOrder(root.right)   // 3. Traverse right',
        pseudoBn: '  preOrder(root.right)   // ৩. ডান সাব-ট্রি',
        js: '  preOrder(root.right);  // 3. Traverse right',
        jsBn: '  preOrder(root.right);  // ৩. ডান সাব-ট্রি',
        java: '  preOrder(root.right);  // 3. Traverse right',
        javaBn: '  preOrder(root.right);  // ৩. ডান সাব-ট্রি',
        python: '  pre_order(root.right)  # 3. Traverse right',
        pythonBn: '  pre_order(root.right)  # ৩. ডান সাব-ট্রি',
        cpp: '  preOrder(root->right); // 3. Traverse right',
        cppBn: '  preOrder(root->right); // ৩. ডান সাব-ট্রি'
      },
      {
        pseudo: '  // this node is done → go back to the caller',
        pseudoBn: '  // এই নোড শেষ → যে ডেকেছিল তার কাছে ফেরো',
        js: '}',
        jsBn: '}',
        java: '}',
        javaBn: '}',
        python: '  # this node is done → go back to the caller',
        pythonBn: '  # এই নোড শেষ → যে ডেকেছিল তার কাছে ফেরো',
        cpp: '}',
        cppBn: '}'
      }
    ])
  },

  postorder: {
    id: 'postorder',
    name: {
      en: 'Post-Order Traversal (Left → Right → Root)',
      bn: 'পোস্ট-অর্ডার ট্রাভার্সাল (বাম → ডান → রুট)'
    },
    description: {
      en: 'Explore Left and Right subtrees first, then visit Root last. Used for node deletion and bottom-up evaluation.',
      bn: 'প্রথমে বাম ও ডান সাব-ট্রি শেষ করে সবার শেষে রুট ভিজিট। ট্রি ডিলিট করা ও বটম-আপ মূল্যায়নে ব্যবহৃত হয়।'
    },
    complexity: {
      time: 'O(N)',
      space: 'O(h)',
      note: {
        en: 'Visits every node once in O(N). Stack depth bounded by tree height h.',
        bn: 'O(N) সময়ে প্রতিটি নোড একবার স্পর্শ করে।'
      }
    },
    code: code5([
      {
        pseudo: '// Post-Order Traversal: Left -> Right -> Root',
        pseudoBn: '// পোস্ট-অর্ডার ট্রাভার্সাল: বাম -> ডান -> রুট',
        js: '// JavaScript Post-Order Traversal',
        jsBn: '// জাভাস্ক্রিপ্ট পোস্ট-অর্ডার ট্রাভার্সাল',
        java: '// Java Post-Order Traversal',
        javaBn: '// জাভা পোস্ট-অর্ডার ট্রাভার্সাল',
        python: '# Python Post-Order Traversal',
        pythonBn: '# পাইথন পোস্ট-অর্ডার ট্রাভার্সাল',
        cpp: '// C++ Post-Order Traversal',
        cppBn: '// সি++ পোস্ট-অর্ডার ট্রাভার্সাল'
      },
      {
        pseudo: 'function postOrder(root):',
        pseudoBn: 'function postOrder(root):',
        js: 'function postOrder(root) {',
        jsBn: 'function postOrder(root) {',
        java: 'void postOrder(TreeNode root) {',
        javaBn: 'void postOrder(TreeNode root) {',
        python: 'def post_order(root):',
        pythonBn: 'def post_order(root):',
        cpp: 'void postOrder(TreeNode* root) {',
        cppBn: 'void postOrder(TreeNode* root) {'
      },
      {
        pseudo: '  if root == null: return',
        pseudoBn: '  if root == null: return',
        js: '  if (!root) return;',
        jsBn: '  if (!root) return;',
        java: '  if (root == null) return;',
        javaBn: '  if (root == null) return;',
        python: '  if not root: return',
        pythonBn: '  if not root: return',
        cpp: '  if (!root) return;',
        cppBn: '  if (!root) return;'
      },
      {
        pseudo: '  postOrder(root.left)   // 1. Traverse left',
        pseudoBn: '  postOrder(root.left)   // ১. বাম সাব-ট্রি',
        js: '  postOrder(root.left);  // 1. Traverse left',
        jsBn: '  postOrder(root.left);  // ১. বাম সাব-ট্রি',
        java: '  postOrder(root.left);  // 1. Traverse left',
        javaBn: '  postOrder(root.left);  // ১. বাম সাব-ট্রি',
        python: '  post_order(root.left)  # 1. Traverse left',
        pythonBn: '  post_order(root.left)  # ১. বাম সাব-ট্রি',
        cpp: '  postOrder(root->left); // 1. Traverse left',
        cppBn: '  postOrder(root->left); // ১. বাম সাব-ট্রি'
      },
      {
        pseudo: '  postOrder(root.right)  // 2. Traverse right',
        pseudoBn: '  postOrder(root.right)  // ২. ডান সাব-ট্রি',
        js: '  postOrder(root.right); // 2. Traverse right',
        jsBn: '  postOrder(root.right); // ২. ডান সাব-ট্রি',
        java: '  postOrder(root.right); // 2. Traverse right',
        javaBn: '  postOrder(root.right); // ২. ডান সাব-ট্রি',
        python: '  post_order(root.right) # 2. Traverse right',
        pythonBn: '  post_order(root.right) # ২. ডান সাব-ট্রি',
        cpp: '  postOrder(root->right);// 2. Traverse right',
        cppBn: '  postOrder(root->right);// ২. ডান সাব-ট্রি'
      },
      {
        pseudo: '  visit(root.val)        // 3. Visit root',
        pseudoBn: '  visit(root.val)        // ৩. রুট ভিজিট',
        js: '  console.log(root.val); // 3. Visit root',
        jsBn: '  console.log(root.val); // ৩. রুট ভিজিট',
        java: '  System.out.print(root.val + " ");',
        javaBn: '  System.out.print(root.val + " ");',
        python: '  print(root.val, end=" ")',
        pythonBn: '  print(root.val, end=" ")',
        cpp: '  cout << root->val << " ";',
        cppBn: '  cout << root->val << " ";'
      },
      {
        pseudo: '  // this node is done → go back to the caller',
        pseudoBn: '  // এই নোড শেষ → যে ডেকেছিল তার কাছে ফেরো',
        js: '}',
        jsBn: '}',
        java: '}',
        javaBn: '}',
        python: '  # this node is done → go back to the caller',
        pythonBn: '  # এই নোড শেষ → যে ডেকেছিল তার কাছে ফেরো',
        cpp: '}',
        cppBn: '}'
      }
    ])
  },

  bfs: {
    id: 'bfs',
    name: {
      en: 'Level-Order Traversal (Breadth-First Search)',
      bn: 'লেভেল-অর্ডার ট্রাভার্সাল (ব্রেডথ-ফার্স্ট সার্চ)'
    },
    description: {
      en: 'Level by level from top to bottom, left to right, powered by a FIFO Queue.',
      bn: 'উপর থেকে নিচে লেভেল ধরে বাম থেকে ডানে, FIFO কিউ ব্যবহার করে পরিভ্রমণ।'
    },
    complexity: {
      time: 'O(N)',
      space: 'O(W)',
      note: {
        en: 'Visits all N nodes. Queue space bounded by the maximum tree width W (up to N/2 nodes).',
        bn: 'মোট N নোড ভিজিট। কিউ মেমোরি ট্রির সর্বোচ্চ প্রস্থ W (সর্বোচ্চ N/2 নোড)।'
      }
    },
    code: code5([
      {
        pseudo: '// BFS Level-Order Traversal using Queue',
        pseudoBn: '// কিউ ব্যবহার করে BFS লেভেল-অর্ডার ট্রাভার্সাল',
        js: '// JavaScript BFS Level-Order Traversal',
        jsBn: '// জাভাস্ক্রিপ্ট BFS লেভেল-অর্ডার ট্রাভার্সাল',
        java: '// Java BFS Level-Order Traversal',
        javaBn: '// জাভা BFS লেভেল-অর্ডার ট্রাভার্সাল',
        python: '# Python BFS Level-Order Traversal',
        pythonBn: '# পাইথন BFS লেভেল-অর্ডার ট্রাভার্সাল',
        cpp: '// C++ BFS Level-Order Traversal',
        cppBn: '// সি++ BFS লেভেল-অর্ডার ট্রাভার্সাল'
      },
      {
        pseudo: 'function levelOrder(root):',
        pseudoBn: 'function levelOrder(root):',
        js: 'function levelOrder(root) {',
        jsBn: 'function levelOrder(root) {',
        java: 'void levelOrder(TreeNode root) {',
        javaBn: 'void levelOrder(TreeNode root) {',
        python: 'def level_order(root):',
        pythonBn: 'def level_order(root):',
        cpp: 'void levelOrder(TreeNode* root) {',
        cppBn: 'void levelOrder(TreeNode* root) {'
      },
      {
        pseudo: '  if root == null: return',
        pseudoBn: '  if root == null: return',
        js: '  if (!root) return;',
        jsBn: '  if (!root) return;',
        java: '  if (root == null) return;',
        javaBn: '  if (root == null) return;',
        python: '  if not root: return',
        pythonBn: '  if not root: return',
        cpp: '  if (!root) return;',
        cppBn: '  if (!root) return;'
      },
      {
        pseudo: '  queue = [root]',
        pseudoBn: '  queue = [root]',
        js: '  const queue = [root];',
        jsBn: '  const queue = [root];',
        java: '  Queue<TreeNode> queue = new LinkedList<>(List.of(root));',
        javaBn: '  Queue<TreeNode> queue = new LinkedList<>(List.of(root));',
        python: '  queue = deque([root])',
        pythonBn: '  queue = deque([root])',
        cpp: '  queue<TreeNode*> q; q.push(root);',
        cppBn: '  queue<TreeNode*> q; q.push(root);'
      },
      {
        pseudo: '  while queue not empty:',
        pseudoBn: '  while queue not empty:',
        js: '  while (queue.length > 0) {',
        jsBn: '  while (queue.length > 0) {',
        java: '  while (!queue.isEmpty()) {',
        javaBn: '  while (!queue.isEmpty()) {',
        python: '  while queue:',
        pythonBn: '  while queue:',
        cpp: '  while (!q.empty()) {',
        cppBn: '  while (!q.empty()) {'
      },
      {
        pseudo: '    curr = queue.pop(0)       // Dequeue front',
        pseudoBn: '    curr = queue.pop(0)       // কিউ থেকে পপ',
        js: '    const curr = queue.shift();  // Dequeue front',
        jsBn: '    const curr = queue.shift();  // কিউ থেকে পপ',
        java: '    TreeNode curr = queue.poll(); // Dequeue front',
        javaBn: '    TreeNode curr = queue.poll(); // কিউ থেকে পপ',
        python: '    curr = queue.popleft()    # Dequeue front',
        pythonBn: '    curr = queue.popleft()    # কিউ থেকে পপ',
        cpp: '    TreeNode* curr = q.front(); q.pop();',
        cppBn: '    TreeNode* curr = q.front(); q.pop();'
      },
      {
        pseudo: '    visit(curr.val)           // Visit node',
        pseudoBn: '    visit(curr.val)           // নোড ভিজিট',
        js: '    console.log(curr.val);       // Visit node',
        jsBn: '    console.log(curr.val);       // নোড ভিজিট',
        java: '    System.out.print(curr.val + " ");',
        javaBn: '    System.out.print(curr.val + " ");',
        python: '    print(curr.val, end=" ")  # Visit node',
        pythonBn: '    print(curr.val, end=" ")  # নোড ভিজিট',
        cpp: '    cout << curr->val << " ";   // Visit node',
        cppBn: '    cout << curr->val << " ";   // নোড ভিজিট'
      },
      {
        pseudo: '    if curr.left: queue.push(curr.left)',
        pseudoBn: '    if curr.left: queue.push(curr.left)',
        js: '    if (curr.left) queue.push(curr.left);',
        jsBn: '    if (curr.left) queue.push(curr.left);',
        java: '    if (curr.left != null) queue.add(curr.left);',
        javaBn: '    if (curr.left != null) queue.add(curr.left);',
        python: '    if curr.left: queue.append(curr.left)',
        pythonBn: '    if curr.left: queue.append(curr.left)',
        cpp: '    if (curr->left) q.push(curr->left);',
        cppBn: '    if (curr->left) q.push(curr->left);'
      },
      {
        pseudo: '    if curr.right: queue.push(curr.right)',
        pseudoBn: '    if curr.right: queue.push(curr.right)',
        js: '    if (curr.right) queue.push(curr.right);',
        jsBn: '    if (curr.right) queue.push(curr.right);',
        java: '    if (curr.right != null) queue.add(curr.right);',
        javaBn: '    if (curr.right != null) queue.add(curr.right);',
        python: '    if curr.right: queue.append(curr.right)',
        pythonBn: '    if curr.right: queue.append(curr.right)',
        cpp: '    if (curr->right) q.push(curr->right);',
        cppBn: '    if (curr->right) q.push(curr->right);'
      },
      {
        pseudo: '  // the queue is empty → every node was visited',
        pseudoBn: '  // queue খালি → সব নোড ভিজিট হয়ে গেছে',
        js: '  }',
        jsBn: '  }',
        java: '  }',
        javaBn: '  }',
        python: '  # the queue is empty → every node was visited',
        pythonBn: '  # queue খালি → সব নোড ভিজিট হয়ে গেছে',
        cpp: '  }',
        cppBn: '  }'
      },
      {
        pseudo: '',
        js: '}',
        java: '}',
        python: '',
        cpp: '}'
      }
    ])
  }
};
