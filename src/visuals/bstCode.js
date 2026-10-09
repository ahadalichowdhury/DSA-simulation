/**
 * Code shown in the BST playground: plain-language pseudocode plus real,
 * normally formatted JavaScript, Java, Python and C++.
 *
 * Every executable line carries a tag (`@ifNull`, `@goLeft` …). The animation
 * traces the code line by line — each step names the line that runs — and the
 * code panel turns that name into this language's line numbers, so languages
 * may differ in length. A comment directly above a tagged line uses the same
 * tag, so the comment lights up with its line.
 *
 * `codeFor(op, info)` assembles the program for one operation: the Node type,
 * the function(s) it needs, and a main() that makes the user's actual call.
 */

const LANGS = ['pseudo', 'js', 'java', 'python', 'cpp'];

/* ------------------------------------------------------------ text (en / bn) */
const TEXT = {
  // insert
  ip0: ['INSERT(root, value)', 'INSERT(root, value)'],
  ip1: ['1. If root is empty:', '১. root খালি হলে:'],
  ip1b: ['       return a new node with value', '       value দিয়ে নতুন নোড ফেরত দাও'],
  ip2: ['2. If value < root.data:', '২. value < root.data হলে:'],
  ip2b: ['       root.left = INSERT(root.left, value)', '       root.left = INSERT(root.left, value)'],
  ip3: ['3. Else if value > root.data:', '৩. নইলে value > root.data হলে:'],
  ip3b: ['       root.right = INSERT(root.right, value)', '       root.right = INSERT(root.right, value)'],
  ip4: ['4. Else (equal): already there, change nothing', '৪. নইলে (সমান): আগেই আছে, কিছু বদলাবে না'],
  ip5: ['5. Return root', '৫. root ফেরত দাও'],
  ic1: ['1. Empty position found → the new node goes here', '১. খালি জায়গা পাওয়া গেছে → নতুন নোড এখানে'],
  ic2: ['2. Smaller value → go to the left subtree', '২. ছোট মান → বাম সাব-ট্রিতে যাও'],
  ic3: ['3. Bigger value → go to the right subtree', '৩. বড় মান → ডান সাব-ট্রিতে যাও'],
  ic4: ['4. Equal value → already in the tree, nothing changes', '৪. সমান মান → আগেই আছে, কিছু বদলায় না'],
  ic5: ['5. Return the current root', '৫. বর্তমান root ফেরত দাও'],
  // search
  sp0: ['SEARCH(root, value)', 'SEARCH(root, value)'],
  sp1: ['1. While root is not empty:', '১. যতক্ষণ root খালি নয়:'],
  sp2: ['2.   If value == root.data: return root (found)', '২.   value == root.data হলে: root ফেরত দাও (পাওয়া গেছে)'],
  sp3: ['3.   If value < root.data: root = root.left', '৩.   value < root.data হলে: root = root.left'],
  sp4: ['4.   Else: root = root.right', '৪.   নইলে: root = root.right'],
  sp5: ['5. Return empty (not found)', '৫. খালি ফেরত দাও (পাওয়া যায়নি)'],
  sc1: ['1. Keep walking down while there is a node', '১. নোড থাকা পর্যন্ত নিচে নামতে থাকো'],
  sc2: ['2. Same value → found it', '২. একই মান → পেয়ে গেছি'],
  sc3: ['3. Smaller value → move to the left child', '৩. ছোট মান → বাম চাইল্ডে যাও'],
  sc4: ['4. Bigger value → move to the right child', '৪. বড় মান → ডান চাইল্ডে যাও'],
  sc5: ['5. Fell off the tree → the value is not here', '৫. ট্রি থেকে বেরিয়ে গেছি → মানটা নেই'],
  // delete
  dp0: ['DELETE(root, value)', 'DELETE(root, value)'],
  dp1: ['1. If root is empty: return empty (nothing to delete)', '১. root খালি হলে: খালি ফেরত দাও (মোছার কিছু নেই)'],
  dp2: ['2. If value < root.data: root.left = DELETE(root.left, value)', '২. value < root.data হলে: root.left = DELETE(root.left, value)'],
  dp3: ['3. Else if value > root.data: root.right = DELETE(root.right, value)', '৩. নইলে value > root.data হলে: root.right = DELETE(root.right, value)'],
  dp4: ['4. Else — this is the node to delete:', '৪. নইলে — এটাই মোছার নোড:'],
  dp5: ['     a. If it has no left child: return root.right', '     ক. বাম চাইল্ড না থাকলে: root.right ফেরত দাও'],
  dp6: ['     b. If it has no right child: return root.left', '     খ. ডান চাইল্ড না থাকলে: root.left ফেরত দাও'],
  dp7: ['     c. successor = root.right', '     গ. successor = root.right'],
  dp8: ['        while successor.left is not empty:', '        যতক্ষণ successor.left খালি নয়:'],
  dp8b: ['            successor = successor.left', '            successor = successor.left'],
  dp9: ['        root.data = successor.data', '        root.data = successor.data'],
  dp10: ['        root.right = DELETE(root.right, successor.data)', '        root.right = DELETE(root.right, successor.data)'],
  dp11: ['5. Return root', '৫. root ফেরত দাও'],
  dc1: ['1. Empty position → the value was never in the tree', '১. খালি জায়গা → মানটা ট্রিতে ছিলই না'],
  dc2: ['2. Smaller value → delete from the left subtree', '২. ছোট মান → বাম সাব-ট্রি থেকে মোছো'],
  dc3: ['3. Bigger value → delete from the right subtree', '৩. বড় মান → ডান সাব-ট্রি থেকে মোছো'],
  dc4: ['4. Found the node to delete', '৪. মোছার নোড পাওয়া গেছে'],
  dc4a: ['4a. No left child → the right child takes its place (leaf: nothing)', '৪ক. বাম চাইল্ড নেই → ডান চাইল্ড জায়গা নেয় (লিফ: কিছুই না)'],
  dc4b: ['4b. No right child → the left child takes its place', '৪খ. ডান চাইল্ড নেই → বাম চাইল্ড জায়গা নেয়'],
  dc4c: ['4c. Two children → find the inorder successor (smallest on the right)', '৪গ. দুই চাইল্ড → ইন-অর্ডার সাকসেসর খোঁজো (ডানে সবচেয়ে ছোট)'],
  dc4d: ['Copy its value here, then delete the old successor', 'ওর মান এখানে কপি করো, তারপর পুরোনো সাকসেসর মুছে দাও'],
  dc5: ['5. Return the current root', '৫. বর্তমান root ফেরত দাও'],
  // update
  up0: ['UPDATE(root, oldValue, newValue)', 'UPDATE(root, oldValue, newValue)'],
  up1: ['1. If SEARCH(root, oldValue) is empty: stop', '১. SEARCH(root, oldValue) খালি হলে: থামো'],
  up2: ['2. If SEARCH(root, newValue) is not empty: stop', '২. SEARCH(root, newValue) খালি না হলে: থামো'],
  up3: ['3. root = DELETE(root, oldValue)', '৩. root = DELETE(root, oldValue)'],
  up4: ['4. root = INSERT(root, newValue)', '৪. root = INSERT(root, newValue)'],
  up5: ['5. Return root', '৫. root ফেরত দাও'],
  uc1: ['1. The old value must exist', '১. পুরোনো মানটা থাকতে হবে'],
  uc2: ['2. The new value must not exist yet (no duplicates)', '২. নতুন মানটা আগে থেকে থাকা চলবে না (ডুপ্লিকেট নয়)'],
  uc3: ['3. Never overwrite in place — delete the old value first…', '৩. সরাসরি বদলাবে না — আগে পুরোনো মান মোছো…'],
  uc4: ['4. …then insert the new one, so it lands in its correct spot', '৪. …তারপর নতুনটা ইনসার্ট করো, যাতে সঠিক জায়গায় বসে'],
  uc5: ['5. Return the updated tree', '৫. আপডেট হওয়া ট্রি ফেরত দাও'],
  // traversals
  tin: ['Inorder: Left → Root → Right (sorted in a BST)', 'ইন-অর্ডার: বাম → রুট → ডান (BST-তে সাজানো)'],
  tpre: ['Preorder: Root → Left → Right', 'প্রি-অর্ডার: রুট → বাম → ডান'],
  tpost: ['Postorder: Left → Right → Root', 'পোস্ট-অর্ডার: বাম → ডান → রুট'],
  tnull: ['if root is empty: stop', 'root খালি হলে: থামো'],
  // main
  mTree: ['root is the tree you created', 'root হলো তোমার বানানো ট্রি'],
  mCreate: ['CREATE: start with an empty tree, then INSERT each value', 'CREATE: খালি ট্রি দিয়ে শুরু, তারপর প্রতিটা মান INSERT'],
  mMain: ['MAIN:', 'MAIN:'],
  mEmpty: ['root = empty', 'root = খালি'],
  mDone: ['done', 'শেষ'],
  mode_preorder: ['Preorder list: insert the values in the same order', 'প্রি-অর্ডার লিস্ট: একই ক্রমে ইনসার্ট করো'],
  mode_postorder: ['Postorder list: the root is last, so insert from the end', 'পোস্ট-অর্ডার লিস্ট: রুট শেষে, তাই শেষ থেকে ইনসার্ট করো'],
  mode_inorder: ['Inorder (sorted) list: insert the middle values first so the tree stays balanced', 'ইন-অর্ডার (সাজানো) লিস্ট: আগে মাঝের মানগুলো ইনসার্ট করো, যাতে ট্রি ব্যালান্সড থাকে'],
  mode_insert: ['Insert the values one by one', 'মানগুলো একে একে ইনসার্ট করো']
};

/* ------------------------------------------------------------ Node type */
const NODE = {
  js: `class Node {
    constructor(value) {
        this.data = value;
        this.left = null;
        this.right = null;
    }
}`,
  java: `class Node {
    int data;
    Node left, right;

    Node(int value) {
        data = value;
        left = right = null;
    }
}`,
  python: `class Node:
    def __init__(self, value):
        self.data = value
        self.left = None
        self.right = None`,
  cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;

    Node(int value) {
        data = value;
        left = nullptr;
        right = nullptr;
    }
};`
};

/* ------------------------------------------------------------ functions */
const FN = {
  insert: {
    pseudo: `{{ip0}}  @header
    {{ip1}}  @ifNull
    {{ip1b}}  @newNode
    {{ip2}}  @ifLess
    {{ip2b}}  @goLeft
    {{ip3}}  @ifGreater
    {{ip3b}}  @goRight
    {{ip4}}  @equal
    {{ip5}}  @ret`,
    js: `function insert(root, value) {  @header

    // {{ic1}}  @ifNull
    if (root === null) {  @ifNull
        return new Node(value);  @newNode
    }

    // {{ic2}}  @ifLess
    if (value < root.data) {  @ifLess
        root.left = insert(root.left, value);  @goLeft
    }

    // {{ic3}}  @ifGreater
    else if (value > root.data) {  @ifGreater
        root.right = insert(root.right, value);  @goRight
    }

    // {{ic4}}  @equal

    // {{ic5}}  @ret
    return root;  @ret
}`,
    java: `    static Node insert(Node root, int value) {  @header

        // {{ic1}}  @ifNull
        if (root == null) {  @ifNull
            return new Node(value);  @newNode
        }

        // {{ic2}}  @ifLess
        if (value < root.data) {  @ifLess
            root.left = insert(root.left, value);  @goLeft
        }

        // {{ic3}}  @ifGreater
        else if (value > root.data) {  @ifGreater
            root.right = insert(root.right, value);  @goRight
        }

        // {{ic4}}  @equal

        // {{ic5}}  @ret
        return root;  @ret
    }`,
    python: `def insert(root, value):  @header

    # {{ic1}}  @ifNull
    if root is None:  @ifNull
        return Node(value)  @newNode

    # {{ic2}}  @ifLess
    if value < root.data:  @ifLess
        root.left = insert(root.left, value)  @goLeft

    # {{ic3}}  @ifGreater
    elif value > root.data:  @ifGreater
        root.right = insert(root.right, value)  @goRight

    # {{ic4}}  @equal

    # {{ic5}}  @ret
    return root  @ret`,
    cpp: `Node* insert(Node* root, int value) {  @header

    // {{ic1}}  @ifNull
    if (root == nullptr) {  @ifNull
        return new Node(value);  @newNode
    }

    // {{ic2}}  @ifLess
    if (value < root->data) {  @ifLess
        root->left = insert(root->left, value);  @goLeft
    }

    // {{ic3}}  @ifGreater
    else if (value > root->data) {  @ifGreater
        root->right = insert(root->right, value);  @goRight
    }

    // {{ic4}}  @equal

    // {{ic5}}  @ret
    return root;  @ret
}`
  },

  search: {
    pseudo: `{{sp0}}  @header
    {{sp1}}  @whileCheck
    {{sp2}}  @ifEq,retFound
    {{sp3}}  @ifLess,moveLeft
    {{sp4}}  @moveRight
    {{sp5}}  @notFound`,
    js: `function search(root, value) {  @header

    // {{sc1}}  @whileCheck
    while (root !== null) {  @whileCheck

        // {{sc2}}  @ifEq
        if (value === root.data) {  @ifEq
            return root;  @retFound
        }

        // {{sc3}}  @ifLess
        if (value < root.data) {  @ifLess
            root = root.left;  @moveLeft
        }

        // {{sc4}}  @moveRight
        else {  @moveRight
            root = root.right;  @moveRight
        }
    }

    // {{sc5}}  @notFound
    return null;  @notFound
}`,
    java: `    static Node search(Node root, int value) {  @header

        // {{sc1}}  @whileCheck
        while (root != null) {  @whileCheck

            // {{sc2}}  @ifEq
            if (value == root.data) {  @ifEq
                return root;  @retFound
            }

            // {{sc3}}  @ifLess
            if (value < root.data) {  @ifLess
                root = root.left;  @moveLeft
            }

            // {{sc4}}  @moveRight
            else {  @moveRight
                root = root.right;  @moveRight
            }
        }

        // {{sc5}}  @notFound
        return null;  @notFound
    }`,
    python: `def search(root, value):  @header

    # {{sc1}}  @whileCheck
    while root is not None:  @whileCheck

        # {{sc2}}  @ifEq
        if value == root.data:  @ifEq
            return root  @retFound

        # {{sc3}}  @ifLess
        if value < root.data:  @ifLess
            root = root.left  @moveLeft

        # {{sc4}}  @moveRight
        else:  @moveRight
            root = root.right  @moveRight

    # {{sc5}}  @notFound
    return None  @notFound`,
    cpp: `Node* search(Node* root, int value) {  @header

    // {{sc1}}  @whileCheck
    while (root != nullptr) {  @whileCheck

        // {{sc2}}  @ifEq
        if (value == root->data) {  @ifEq
            return root;  @retFound
        }

        // {{sc3}}  @ifLess
        if (value < root->data) {  @ifLess
            root = root->left;  @moveLeft
        }

        // {{sc4}}  @moveRight
        else {  @moveRight
            root = root->right;  @moveRight
        }
    }

    // {{sc5}}  @notFound
    return nullptr;  @notFound
}`
  },

  delete: {
    pseudo: `{{dp0}}  @header
    {{dp1}}  @ifNull,retNull
    {{dp2}}  @ifLess,goLeft
    {{dp3}}  @ifGreater,goRight
    {{dp4}}  @found
    {{dp5}}  @ifNoLeft,retRight
    {{dp6}}  @ifNoRight,retLeft
    {{dp7}}  @succStart
    {{dp8}}  @succCheck
    {{dp8b}}  @succMove
    {{dp9}}  @copy
    {{dp10}}  @deleteSucc
    {{dp11}}  @ret`,
    js: `function deleteNode(root, value) {  @header

    // {{dc1}}  @ifNull
    if (root === null) {  @ifNull
        return null;  @retNull
    }

    // {{dc2}}  @ifLess
    if (value < root.data) {  @ifLess
        root.left = deleteNode(root.left, value);  @goLeft
    }

    // {{dc3}}  @ifGreater
    else if (value > root.data) {  @ifGreater
        root.right = deleteNode(root.right, value);  @goRight
    }

    // {{dc4}}  @found
    else {  @found

        // {{dc4a}}  @ifNoLeft
        if (root.left === null) {  @ifNoLeft
            return root.right;  @retRight
        }

        // {{dc4b}}  @ifNoRight
        if (root.right === null) {  @ifNoRight
            return root.left;  @retLeft
        }

        // {{dc4c}}  @succStart
        let successor = root.right;  @succStart
        while (successor.left !== null) {  @succCheck
            successor = successor.left;  @succMove
        }

        // {{dc4d}}  @copy
        root.data = successor.data;  @copy
        root.right = deleteNode(root.right, successor.data);  @deleteSucc
    }

    // {{dc5}}  @ret
    return root;  @ret
}`,
    java: `    static Node deleteNode(Node root, int value) {  @header

        // {{dc1}}  @ifNull
        if (root == null) {  @ifNull
            return null;  @retNull
        }

        // {{dc2}}  @ifLess
        if (value < root.data) {  @ifLess
            root.left = deleteNode(root.left, value);  @goLeft
        }

        // {{dc3}}  @ifGreater
        else if (value > root.data) {  @ifGreater
            root.right = deleteNode(root.right, value);  @goRight
        }

        // {{dc4}}  @found
        else {  @found

            // {{dc4a}}  @ifNoLeft
            if (root.left == null) {  @ifNoLeft
                return root.right;  @retRight
            }

            // {{dc4b}}  @ifNoRight
            if (root.right == null) {  @ifNoRight
                return root.left;  @retLeft
            }

            // {{dc4c}}  @succStart
            Node successor = root.right;  @succStart
            while (successor.left != null) {  @succCheck
                successor = successor.left;  @succMove
            }

            // {{dc4d}}  @copy
            root.data = successor.data;  @copy
            root.right = deleteNode(root.right, successor.data);  @deleteSucc
        }

        // {{dc5}}  @ret
        return root;  @ret
    }`,
    python: `def delete_node(root, value):  @header

    # {{dc1}}  @ifNull
    if root is None:  @ifNull
        return None  @retNull

    # {{dc2}}  @ifLess
    if value < root.data:  @ifLess
        root.left = delete_node(root.left, value)  @goLeft

    # {{dc3}}  @ifGreater
    elif value > root.data:  @ifGreater
        root.right = delete_node(root.right, value)  @goRight

    # {{dc4}}  @found
    else:  @found

        # {{dc4a}}  @ifNoLeft
        if root.left is None:  @ifNoLeft
            return root.right  @retRight

        # {{dc4b}}  @ifNoRight
        if root.right is None:  @ifNoRight
            return root.left  @retLeft

        # {{dc4c}}  @succStart
        successor = root.right  @succStart
        while successor.left is not None:  @succCheck
            successor = successor.left  @succMove

        # {{dc4d}}  @copy
        root.data = successor.data  @copy
        root.right = delete_node(root.right, successor.data)  @deleteSucc

    # {{dc5}}  @ret
    return root  @ret`,
    cpp: `Node* deleteNode(Node* root, int value) {  @header

    // {{dc1}}  @ifNull
    if (root == nullptr) {  @ifNull
        return nullptr;  @retNull
    }

    // {{dc2}}  @ifLess
    if (value < root->data) {  @ifLess
        root->left = deleteNode(root->left, value);  @goLeft
    }

    // {{dc3}}  @ifGreater
    else if (value > root->data) {  @ifGreater
        root->right = deleteNode(root->right, value);  @goRight
    }

    // {{dc4}}  @found
    else {  @found

        // {{dc4a}}  @ifNoLeft
        if (root->left == nullptr) {  @ifNoLeft
            Node* child = root->right;  @retRight
            delete root;  @retRight
            return child;  @retRight
        }

        // {{dc4b}}  @ifNoRight
        if (root->right == nullptr) {  @ifNoRight
            Node* child = root->left;  @retLeft
            delete root;  @retLeft
            return child;  @retLeft
        }

        // {{dc4c}}  @succStart
        Node* successor = root->right;  @succStart
        while (successor->left != nullptr) {  @succCheck
            successor = successor->left;  @succMove
        }

        // {{dc4d}}  @copy
        root->data = successor->data;  @copy
        root->right = deleteNode(root->right, successor->data);  @deleteSucc
    }

    // {{dc5}}  @ret
    return root;  @ret
}`
  },

  update: {
    pseudo: `{{up0}}  @header
    {{up1}}  @checkOld
    {{up2}}  @checkNew
    {{up3}}  @callDelete
    {{up4}}  @callInsert
    {{up5}}  @ret`,
    js: `function update(root, oldValue, newValue) {  @header

    // {{uc1}}  @checkOld
    if (search(root, oldValue) === null) return root;  @checkOld

    // {{uc2}}  @checkNew
    if (search(root, newValue) !== null) return root;  @checkNew

    // {{uc3}}  @callDelete
    root = deleteNode(root, oldValue);  @callDelete

    // {{uc4}}  @callInsert
    root = insert(root, newValue);  @callInsert

    // {{uc5}}  @ret
    return root;  @ret
}`,
    java: `    static Node update(Node root, int oldValue, int newValue) {  @header

        // {{uc1}}  @checkOld
        if (search(root, oldValue) == null) return root;  @checkOld

        // {{uc2}}  @checkNew
        if (search(root, newValue) != null) return root;  @checkNew

        // {{uc3}}  @callDelete
        root = deleteNode(root, oldValue);  @callDelete

        // {{uc4}}  @callInsert
        root = insert(root, newValue);  @callInsert

        // {{uc5}}  @ret
        return root;  @ret
    }`,
    python: `def update(root, old_value, new_value):  @header

    # {{uc1}}  @checkOld
    if search(root, old_value) is None:  @checkOld
        return root  @checkOld

    # {{uc2}}  @checkNew
    if search(root, new_value) is not None:  @checkNew
        return root  @checkNew

    # {{uc3}}  @callDelete
    root = delete_node(root, old_value)  @callDelete

    # {{uc4}}  @callInsert
    root = insert(root, new_value)  @callInsert

    # {{uc5}}  @ret
    return root  @ret`,
    cpp: `Node* update(Node* root, int oldValue, int newValue) {  @header

    // {{uc1}}  @checkOld
    if (search(root, oldValue) == nullptr) return root;  @checkOld

    // {{uc2}}  @checkNew
    if (search(root, newValue) != nullptr) return root;  @checkNew

    // {{uc3}}  @callDelete
    root = deleteNode(root, oldValue);  @callDelete

    // {{uc4}}  @callInsert
    root = insert(root, newValue);  @callInsert

    // {{uc5}}  @ret
    return root;  @ret
}`
  }
};

/** One traversal function; the order decides where "visit" sits. */
function traversalFn(order, lang) {
  const title = { inorder: 'tin', preorder: 'tpre', postorder: 'tpost' }[order];
  const seq = { inorder: ['left', 'visit', 'right'], preorder: ['visit', 'left', 'right'], postorder: ['left', 'right', 'visit'] }[order];
  const P = order.toUpperCase();
  const pieces = {
    pseudo: {
      head: `${P}(root):   {{${title}}}  @header`,
      ifNull: '    {{tnull}}  @ifNull',
      left: `    ${P}(root.left)  @left`,
      right: `    ${P}(root.right)  @right`,
      visit: '    visit root  @visit'
    },
    js: {
      head: `// {{${title}}}\nfunction ${order}(root) {  @header`,
      ifNull: '    if (root === null) return;  @ifNull',
      left: `    ${order}(root.left);  @left`,
      right: `    ${order}(root.right);  @right`,
      visit: '    console.log(root.data);  @visit',
      end: '}'
    },
    java: {
      head: `    // {{${title}}}\n    static void ${order}(Node root) {  @header`,
      ifNull: '        if (root == null) return;  @ifNull',
      left: `        ${order}(root.left);  @left`,
      right: `        ${order}(root.right);  @right`,
      visit: '        System.out.print(root.data + " ");  @visit',
      end: '    }'
    },
    python: {
      head: `# {{${title}}}\ndef ${order}(root):  @header`,
      ifNull: '    if root is None:  @ifNull\n        return  @ifNull',
      left: `    ${order}(root.left)  @left`,
      right: `    ${order}(root.right)  @right`,
      visit: '    print(root.data, end=" ")  @visit'
    },
    cpp: {
      head: `// {{${title}}}\nvoid ${order}(Node* root) {  @header`,
      ifNull: '    if (root == nullptr) return;  @ifNull',
      left: `    ${order}(root->left);  @left`,
      right: `    ${order}(root->right);  @right`,
      visit: '    cout << root->data << " ";  @visit',
      end: '}'
    }
  }[lang];
  return [pieces.head, pieces.ifNull, ...seq.map((s) => pieces[s]), pieces.end].filter(Boolean).join('\n');
}

/** Prefix every tag in a function (`@ifNull` → `@d_ifNull`) so several functions can share one program. */
function retag(src, prefix) {
  return src.replace(/(\s+@)([\w,]+)[ \t]*$/gm, (_, at, names) => at + names.split(',').map((n) => prefix + n).join(','));
}

/* ------------------------------------------------------------ main() per op */
const CALLS = {
  insert: (o) => ({ pseudo: `root = INSERT(root, ${o.key})`, js: `root = insert(root, ${o.key});`, java: `root = insert(root, ${o.key});`, python: `root = insert(root, ${o.key})`, cpp: `root = insert(root, ${o.key});` }),
  search: (o) => ({ pseudo: `result = SEARCH(root, ${o.key})`, js: `const result = search(root, ${o.key});`, java: `Node result = search(root, ${o.key});`, python: `result = search(root, ${o.key})`, cpp: `Node* result = search(root, ${o.key});` }),
  delete: (o) => ({ pseudo: `root = DELETE(root, ${o.key})`, js: `root = deleteNode(root, ${o.key});`, java: `root = deleteNode(root, ${o.key});`, python: `root = delete_node(root, ${o.key})`, cpp: `root = deleteNode(root, ${o.key});` }),
  update: (o) => ({ pseudo: `root = UPDATE(root, ${o.key}, ${o.newKey})`, js: `root = update(root, ${o.key}, ${o.newKey});`, java: `root = update(root, ${o.key}, ${o.newKey});`, python: `root = update(root, ${o.key}, ${o.newKey})`, cpp: `root = update(root, ${o.key}, ${o.newKey});` }),
  traverse: (o) => {
    const n = o.order || 'inorder';
    return { pseudo: `${n.toUpperCase()}(root)`, js: `${n}(root);`, java: `${n}(root);`, python: `${n}(root)`, cpp: `${n}(root);` };
  }
};

function mainLines(lang, op, info) {
  const cm = { pseudo: '— ', js: '// ', java: '// ', python: '# ', cpp: '// ' }[lang];
  if (op.type === 'build') {
    const empty = { pseudo: '{{mEmpty}}', js: 'let root = null;', java: 'Node root = null;', python: 'root = None', cpp: 'Node* root = nullptr;' }[lang];
    return [
      `${cm}{{mode_${info.mode || 'insert'}}}`,
      `${empty}  @rootNull`,
      ...(info.queue || []).map((v, i) => `${CALLS.insert({ key: v })[lang]}  @put${i}`)
    ];
  }
  return [`${cm}{{mTree}}`, `${CALLS[op.type](op)[lang]}  @call`];
}

/* ------------------------------------------------------------ assemble */
function functionsFor(op, lang) {
  const f = (name, prefix = '') => (prefix ? retag(FN[name][lang], prefix) : FN[name][lang]);
  switch (op.type) {
    case 'build':
    case 'insert': return [f('insert')];
    case 'search': return [f('search')];
    case 'delete': return [f('delete')];
    // update really calls search, deleteNode and insert, so the program contains all of them
    case 'update': return [f('search', 's_'), f('delete', 'd_'), f('insert', 'i_'), f('update')];
    case 'traverse': return [traversalFn(op.order || 'inorder', lang)];
    default: return [];
  }
}

function assemble(lang, op, info) {
  const fns = functionsFor(op, lang);
  const main = [...mainLines(lang, op, info)];
  const done = { pseudo: '{{mDone}}', js: 'console.log("done");', java: 'System.out.println("done");', python: 'print("done")', cpp: 'cout << "done" << endl;' }[lang];
  main.push(`${done}  @done`);
  if (lang === 'pseudo') {
    const head = op.type === 'build' ? '{{mCreate}}' : '{{mMain}}';
    return `${fns.join('\n\n')}\n\n${head}\n${main.map((l) => `    ${l}`).join('\n')}`;
  }
  if (lang === 'java') {
    return `${NODE.java}\n\npublic class BST {\n\n${fns.join('\n\n')}\n\n    public static void main(String[] args) {\n${main.map((l) => `        ${l}`).join('\n')}\n    }\n}`;
  }
  if (lang === 'cpp') {
    return `${NODE.cpp}\n\n${fns.join('\n\n')}\n\nint main() {\n${[...main, 'return 0;'].map((l) => `    ${l}`).join('\n')}\n}`;
  }
  if (lang === 'python') return `${NODE.python}\n\n\n${fns.join('\n\n\n')}\n\n\n${main.join('\n')}`;
  return `${NODE.js}\n\n${fns.join('\n\n')}\n\n${main.join('\n')}`;
}

const TAG = /\s+@([\w,]+)\s*$/;

/** Template → { en: [lines], bn: [lines], marks: {name: [indexes]} }. */
function expand(src) {
  const out = { en: [], bn: [], marks: {} };
  src.split('\n').forEach((line, i) => {
    const m = line.match(TAG);
    const body = m ? line.slice(0, m.index) : line;
    if (m) for (const name of m[1].split(',')) (out.marks[name] = out.marks[name] || []).push(i);
    out.en.push(body.replace(/\{\{(\w+)\}\}/g, (_, k) => (TEXT[k] ? TEXT[k][0] : k)));
    out.bn.push(body.replace(/\{\{(\w+)\}\}/g, (_, k) => (TEXT[k] ? TEXT[k][1] : k)));
  });
  return out;
}

/**
 * The program for one operation.
 * op: the playground op ({ type, key, newKey, order, … }); info: { queue, mode } for Create.
 * Returns { code: {lang: {en, bn}}, lineMap: {lang: {name: [lines]}} }.
 */
export function codeFor(op, info = {}) {
  const code = {};
  const lineMap = {};
  for (const lang of LANGS) {
    const e = expand(assemble(lang, op, info));
    code[lang] = { en: e.en, bn: e.bn };
    lineMap[lang] = e.marks;
  }
  return { code, lineMap };
}
