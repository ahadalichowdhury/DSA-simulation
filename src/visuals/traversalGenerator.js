/**
 * Traversal Generator for Interactive Tree Traversals
 * Constructs binary trees from user node input (BST or Level-Order / Array)
 * and generates step-by-step simulations for Pre-Order, In-Order, Post-Order, and BFS.
 */

export function buildTree(inputStr, mode = 'bst') {
  if (!inputStr || !inputStr.trim()) return null;
  const rawParts = inputStr.split(/[\s,]+/).map((s) => s.trim()).filter(Boolean);
  if (!rawParts.length) return null;

  if (mode === 'level') {
    const nodes = rawParts.map((v) => ({ v: isNaN(Number(v)) ? v : Number(v) }));
    for (let i = 0; i < nodes.length; i++) {
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      if (l < nodes.length) nodes[i].l = nodes[l];
      if (r < nodes.length) nodes[i].r = nodes[r];
    }
    return nodes[0];
  }

  // Default: BST
  let root = null;
  function insert(node, val) {
    if (!node) return { v: val };
    const numVal = Number(val);
    const nodeVal = Number(node.v);
    const isNum = !isNaN(numVal) && !isNaN(nodeVal);
    const cmp = isNum ? numVal < nodeVal : String(val).localeCompare(String(node.v)) < 0;
    if (cmp) {
      node.l = insert(node.l, val);
    } else if (isNum ? numVal > nodeVal : String(val).localeCompare(String(node.v)) > 0) {
      node.r = insert(node.r, val);
    }
    return node;
  }

  rawParts.forEach((v) => {
    const val = isNaN(Number(v)) ? v : Number(v);
    root = insert(root, val);
  });
  return root;
}

export function generateTraversalSteps(root, traversalType = 'inorder', treeLabel = '') {
  if (!root) return [];

  const cloneTree = (nd) => {
    if (!nd) return null;
    return { v: nd.v, l: cloneTree(nd.l), r: cloneTree(nd.r) };
  };

  const staticTree = cloneTree(root);

  if (traversalType === 'preorder') {
    const steps = [];
    const output = [];

    // Step 0: Start step
    steps.push({
      title: {
        en: 'Start Pre-Order Traversal (Root → Left → Right)',
        bn: 'প্রি-অর্ডার ট্রাভার্সাল শুরু (রুট → বাম → ডান)'
      },
      explanation: {
        en: `**Pre-Order Rule**: For every node: **1. Visit Root** → **2. Traverse Left Subtree** → **3. Traverse Right Subtree**.\n\nReady to begin at the root node **\`${staticTree.v}\`**. Watch the moving cyan pointer and the output stream below.`,
        bn: `**প্রি-অর্ডার নিয়ম**: প্রতিটি নোডের জন্য: **১. রুট ভিজিট** → **২. বাম সাব-ট্রি** → **৩. ডান সাব-ট্রি**।\n\nরুট নোড **\`${staticTree.v}\`** থেকে শুরু করতে প্রস্তুত। নিচে সায়ান পয়েন্টার ও আউটপুট টেপ লক্ষ্য করুন।`
      },
      line: 1, // function preOrder(p):
      iteration: { i: 0, of: null, label: { en: 'Pre-Order', bn: 'প্রি-অর্ডার' } },
      state: { currentNode: staticTree.v, outputCount: 0, rule: 'Root → Left → Right' },
      scene: {
        kind: 'tree',
        label: treeLabel || 'Pre-Order Traversal: Ready to Visit Root First',
        root: staticTree,
        pointers: [{ target: staticTree.v, label: 'root', tone: 'cyan' }],
        highlights: { current: staticTree.v },
        output: [],
        outputLabel: 'Pre-Order Output Stream:'
      }
    });

    function walk(node) {
      if (!node) return;
      output.push(node.v);
      const currOutput = [...output];
      steps.push({
        title: {
          en: `Visit Node ${node.v} (Pre-Order: Root)`,
          bn: `নোড ${node.v} ভিজিট করুন (প্রি-অর্ডার: রুট)`
        },
        explanation: {
          en: `**Pre-Order Rule**: Visit **Root** first, then explore Left and Right subtrees.\n\nNow at node **\`${node.v}\`**. Executing \`visit(p.val)\`:\n- Added **\`${node.v}\`** to output tape.\n- Next recursive call will dive into left child of \`${node.v}\`.`,
          bn: `**প্রি-অর্ডার নিয়ম**: প্রথমে **রুট** ভিজিট করো, তারপর বাম ও ডান সাব-ট্রি।\n\nএখন নোড **\`${node.v}\`**-এ আছি। \`visit(p.val)\` এক্সিকিউট হলো:\n- আউটপুট টেপে **\`${node.v}\`** যুক্ত হলো।\n- পরবর্তী রিকারসিভ কল \`${node.v}\`-এর বাম সাব-ট্রিতে নামবে।`
        },
        line: 3, // visit(p.val)
        iteration: { i: currOutput.length, of: null, label: { en: 'Pre-Order', bn: 'প্রি-অর্ডার' } },
        state: { currentNode: node.v, outputCount: currOutput.length, rule: 'Root → Left → Right' },
        scene: {
          kind: 'tree',
          label: treeLabel || `Pre-Order: Visit Root [${node.v}] → Traverse Left → Traverse Right`,
          root: staticTree,
          pointers: [{ target: node.v, label: 'curr', tone: 'cyan' }],
          highlights: {
            current: node.v,
            visited: currOutput
          },
          output: currOutput,
          outputLabel: 'Pre-Order Output Stream:'
        }
      });
      walk(node.l);
      walk(node.r);
    }

    walk(staticTree);

    // Final Completion Step
    steps.push({
      title: {
        en: 'Pre-Order Traversal Complete!',
        bn: 'প্রি-অর্ডার ট্রাভার্সাল সম্পন্ন!'
      },
      explanation: {
        en: `**Pre-Order Traversal Finished!**\n\nAll nodes were visited in Root-First sequence:\n\`[ ${output.join(', ')} ]\`\n\n**Key Use-Cases**:\n- Serializing and cloning binary trees\n- Prefix Polish notation evaluation\n- Printing directory structures hierarchically`,
        bn: `**প্রি-অর্ডার ট্রাভার্সাল সমাপ্ত!**\n\nপ্রতিটি নোড রুট-আগে ক্রমে স্পর্শ করা হয়েছে:\n\`[ ${output.join(', ')} ]\`\n\n**প্রধান ব্যবহার**:\n- বাইনারি ট্রি ক্লোনিং ও সিরিয়ালাইজেশন\n- প্রিফিক্স নোটেশন ইভ্যালুয়েশন\n- ডিরেক্টরি ট্রি প্রিন্ট করা`
      },
      line: 6,
      iteration: { i: output.length, of: null, label: { en: 'Pre-Order', bn: 'প্রি-অর্ডার' } },
      state: { status: 'Complete', totalVisited: output.length, sequence: output.join(', ') },
      scene: {
        kind: 'tree',
        label: treeLabel || 'Pre-Order Traversal Complete: All Nodes Visited',
        root: staticTree,
        highlights: { visited: output },
        output: [...output],
        outputLabel: 'Final Pre-Order Output:'
      }
    });

    const total = steps.length;
    steps.forEach((s) => (s.iteration.of = total));
    return steps;
  }

  if (traversalType === 'inorder') {
    const steps = [];
    const output = [];

    // Step 0: Start step
    steps.push({
      title: {
        en: 'Start In-Order Traversal (Left → Root → Right)',
        bn: 'ইন-অর্ডার ট্রাভার্সাল শুরু (বাম → রুট → ডান)'
      },
      explanation: {
        en: `**In-Order Rule**: For every node: **1. Traverse Left Subtree** → **2. Visit Root** → **3. Traverse Right Subtree**.\n\n✨ **Crucial BST Property**: When executed on a Binary Search Tree, In-Order traversal visits keys in **strictly ascending sorted order**!\n\nReady to begin from root **\`${staticTree.v}\`**.`,
        bn: `**ইন-অর্ডার নিয়ম**: প্রতিটি নোডের জন্য: **১. বাম সাব-ট্রি** → **২. রুট ভিজিট** → **৩. ডান সাব-ট্রি**।\n\n✨ **BST-এর প্রধান বৈশিষ্ট্য**: বাইনারি সার্চ ট্রিতে ইন-অর্ডার ট্রাভার্সাল করলে আউটপুট সর্বদা **ছোট থেকে বড় সর্টেড অর্ডারে** পাওয়া যায়!\n\nরুট **\`${staticTree.v}\`** থেকে শুরু করতে প্রস্তুত।`
      },
      line: 1, // function inOrder(p):
      iteration: { i: 0, of: null, label: { en: 'In-Order', bn: 'ইন-অর্ডার' } },
      state: { currentNode: staticTree.v, outputCount: 0, rule: 'Left → Root → Right' },
      scene: {
        kind: 'tree',
        label: treeLabel || 'In-Order Traversal: Ready to Begin (Left → Root → Right)',
        root: staticTree,
        pointers: [{ target: staticTree.v, label: 'root', tone: 'cyan' }],
        highlights: { current: staticTree.v },
        output: [],
        outputLabel: 'In-Order Output Stream:'
      }
    });

    function walk(node) {
      if (!node) return;
      walk(node.l);
      output.push(node.v);
      const currOutput = [...output];
      steps.push({
        title: {
          en: `Visit Node ${node.v} (In-Order: Root)`,
          bn: `নোড ${node.v} ভিজিট করুন (ইন-অর্ডার: রুট)`
        },
        explanation: {
          en: `**In-Order Rule**: Left Subtree finished → Visit **Node \`${node.v}\`** → Then Right Subtree.\n\nExecuting \`visit(p.val)\`:\n- Added **\`${node.v}\`** to output tape.\n- If this is a BST, note that all left-side smaller values are already visited, keeping the output sorted!`,
          bn: `**ইন-অর্ডার নিয়ম**: বাম সাব-ট্রি শেষ → **নোড \`${node.v}\`** ভিজিট করো → তারপর ডান সাব-ট্রি।\n\n\`visit(p.val)\` এক্সিকিউট হলো:\n- আউটপুটে **\`${node.v}\`** যুক্ত হলো।\n- এটি BST হলে এর চেয়ে ছোট সব বাম নোড আগে ভিজিট হয়ে সর্টেড ক্রম বজায় রেখেছে!`
        },
        line: 4, // visit(p.val)
        iteration: { i: currOutput.length, of: null, label: { en: 'In-Order', bn: 'ইন-অর্ডার' } },
        state: { currentNode: node.v, outputCount: currOutput.length, rule: 'Left → Root → Right' },
        scene: {
          kind: 'tree',
          label: treeLabel || `In-Order: Left Finished → Visit [${node.v}] → Move Right`,
          root: staticTree,
          pointers: [{ target: node.v, label: 'curr', tone: 'cyan' }],
          highlights: {
            current: node.v,
            visited: currOutput
          },
          output: currOutput,
          outputLabel: 'In-Order Output Stream:'
        }
      });
      walk(node.r);
    }

    walk(staticTree);

    // Final Completion Step
    steps.push({
      title: {
        en: 'In-Order Traversal Complete! (Sorted Order)',
        bn: 'ইন-অর্ডার ট্রাভার্সাল সম্পন্ন! (সর্টেড ক্রম)'
      },
      explanation: {
        en: `**In-Order Traversal Complete!**\n\nFinal Output Stream:\n\`[ ${output.join(', ')} ]\`\n\nNotice that in a BST, every key appears in perfectly sorted non-decreasing order: **${output.join(' ≤ ')}**!\n\n**Time**: $O(N)$ · **Space**: $O(h)$ (stack recursion depth).`,
        bn: `**ইন-অর্ডার ট্রাভার্সাল সমাপ্ত!**\n\nচূড়ান্ত আউটপুট:\n\`[ ${output.join(', ')} ]\`\n\nলক্ষ্য করুন, BST-তে প্রতিটি কি নিখুঁত ছোট থেকে বড় ক্রমে এসেছে: **${output.join(' ≤ ')}**!\n\n**টাইম**: $O(N)$ · **স্পেস**: $O(h)$ (কল স্ট্যাক গভীরতা)।`
      },
      line: 6,
      iteration: { i: output.length, of: null, label: { en: 'In-Order', bn: 'ইন-অর্ডার' } },
      state: { status: 'Complete', totalVisited: output.length, sequence: output.join(', ') },
      scene: {
        kind: 'tree',
        label: treeLabel || 'In-Order Traversal Complete: Ascending Sequence Produced',
        root: staticTree,
        highlights: { visited: output },
        output: [...output],
        outputLabel: 'Final In-Order Output:'
      }
    });

    const total = steps.length;
    steps.forEach((s) => (s.iteration.of = total));
    return steps;
  }

  if (traversalType === 'postorder') {
    const steps = [];
    const output = [];

    // Step 0: Start step
    steps.push({
      title: {
        en: 'Start Post-Order Traversal (Left → Right → Root)',
        bn: 'পোস্ট-অর্ডার ট্রাভার্সাল শুরু (বাম → ডান → রুট)'
      },
      explanation: {
        en: `**Post-Order Rule**: For every node: **1. Traverse Left Subtree** → **2. Traverse Right Subtree** → **3. Finally Visit Root**.\n\nThis is a **bottom-up** evaluation: leaves are processed first, and the root is always visited last!`,
        bn: `**পোস্ট-অর্ডার নিয়ম**: প্রতিটি নোডের জন্য: **১. বাম সাব-ট্রি** → **২. ডান সাব-ট্রি** → **৩. সবার শেষে রুট ভিজিট**।\n\nএটি নিচ থেকে উপরে বটম-আপ পদ্ধতি: আগে পাতাগুলো শেষ হবে, রুট নোড সবার শেষে ভিজিট হবে!`
      },
      line: 1, // function postOrder(p):
      iteration: { i: 0, of: null, label: { en: 'Post-Order', bn: 'পোস্ট-অর্ডার' } },
      state: { currentNode: staticTree.v, outputCount: 0, rule: 'Left → Right → Root' },
      scene: {
        kind: 'tree',
        label: treeLabel || 'Post-Order Traversal: Ready to Begin (Leaves First, Root Last)',
        root: staticTree,
        pointers: [{ target: staticTree.v, label: 'root', tone: 'cyan' }],
        highlights: { current: staticTree.v },
        output: [],
        outputLabel: 'Post-Order Output Stream:'
      }
    });

    function walk(node) {
      if (!node) return;
      walk(node.l);
      walk(node.r);
      output.push(node.v);
      const currOutput = [...output];
      steps.push({
        title: {
          en: `Visit Node ${node.v} (Post-Order: Root)`,
          bn: `নোড ${node.v} ভিজিট করুন (পোস্ট-অর্ডার: রুট)`
        },
        explanation: {
          en: `**Post-Order Rule**: Both Left and Right subtrees completed → Finally visit **Root \`${node.v}\`**.\n\nExecuting \`visit(p.val)\`:\n- Added **\`${node.v}\`** to output tape.\n- Safe for memory deallocation / deletion because children have already been processed!`,
          bn: `**পোস্ট-অর্ডার নিয়ম**: বাম ও ডান উভয় সাব-ট্রি শেষ → অবশেষে **রুট \`${node.v}\`** ভিজিট করো।\n\n\`visit(p.val)\` এক্সিকিউট হলো:\n- আউটপুট টেপে **\`${node.v}\`** যুক্ত হলো।\n- মেমোরি রিলিজ বা নোড ডিলিট করার জন্য আদর্শ কারণ এর সব সন্তান আগেই প্রসেস করা হয়েছে!`
        },
        line: 5, // visit(p.val)
        iteration: { i: currOutput.length, of: null, label: { en: 'Post-Order', bn: 'পোস্ট-অর্ডার' } },
        state: { currentNode: node.v, outputCount: currOutput.length, rule: 'Left → Right → Root' },
        scene: {
          kind: 'tree',
          label: treeLabel || `Post-Order: Subtrees Completed → Visit [${node.v}]`,
          root: staticTree,
          pointers: [{ target: node.v, label: 'curr', tone: 'cyan' }],
          highlights: {
            current: node.v,
            visited: currOutput
          },
          output: currOutput,
          outputLabel: 'Post-Order Output Stream:'
        }
      });
    }

    walk(staticTree);

    // Final Completion Step
    steps.push({
      title: {
        en: 'Post-Order Traversal Complete! (Root Visited Last)',
        bn: 'পোস্ট-অর্ডার ট্রাভার্সাল সম্পন্ন! (রুট সবার শেষে)'
      },
      explanation: {
        en: `**Post-Order Traversal Complete!**\n\nFinal Output Stream:\n\`[ ${output.join(', ')} ]\`\n\nNotice that the root node **\`${staticTree.v}\`** is the very last element visited in the sequence!\n\n**Primary Use-Cases**:\n- Deleting an entire tree / freeing pointers\n- Postfix (Reverse Polish) expression evaluation\n- Bottom-up tree metrics (height, subtree sizing)`,
        bn: `**পোস্ট-অর্ডার ট্রাভার্সাল সমাপ্ত!**\n\nচূড়ান্ত আউটপুট:\n\`[ ${output.join(', ')} ]\`\n\nদেখুন মূল রুট নোড **\`${staticTree.v}\`** সবার শেষে ভিজিট হয়েছে!\n\n**প্রধান ব্যবহার**:\n- পুরো ট্রি ডিলিট করা ও মেমোরি ফ্রি করা\n- পোস্টফিক্স এক্সপ্রেশন ইভ্যালুয়েশন\n- ট্রির উচ্চতা ও সাইজ গণনা`
      },
      line: 6,
      iteration: { i: output.length, of: null, label: { en: 'Post-Order', bn: 'পোস্ট-অর্ডার' } },
      state: { status: 'Complete', totalVisited: output.length, sequence: output.join(', ') },
      scene: {
        kind: 'tree',
        label: treeLabel || 'Post-Order Traversal Complete: Bottom-Up Finished',
        root: staticTree,
        highlights: { visited: output },
        output: [...output],
        outputLabel: 'Final Post-Order Output:'
      }
    });

    const total = steps.length;
    steps.forEach((s) => (s.iteration.of = total));
    return steps;
  }

  if (traversalType === 'bfs') {
    const steps = [];
    const output = [];
    const queue = [staticTree];

    // Step 0: Start step
    steps.push({
      title: {
        en: 'Initialize FIFO Queue with Root Node',
        bn: 'রুট নোড দিয়ে FIFO কিউ ইনিশিয়ালাইজ করুন'
      },
      explanation: {
        en: `**BFS / Level-Order Traversal** explores the tree level by level from top to bottom, left to right, powered by a **FIFO Queue**.\n\n1. Enqueued root node: **\`${staticTree.v}\`**\n2. Active Queue: \`[ ${staticTree.v} ]\`\n\nReady to dequeue front elements in loop.`,
        bn: `**BFS / লেভেল-অর্ডার ট্রাভার্সাল** একটি **FIFO কিউ** ব্যবহার করে উপর থেকে নিচে এবং বাম থেকে ডানে লেভেল বাই লেভেল নোড ভিজিট করে।\n\n১. রুট নোড কিউ-তে পুশ করা হলো: **\`${staticTree.v}\`**\n২. বর্তমান কিউ: \`[ ${staticTree.v} ]\`\n\nলুপের মাধ্যমে প্রথম নোডটি ডিকিউ করতে প্রস্তুত।`
      },
      line: 3, // queue = [root]
      iteration: { i: 0, of: null, label: { en: 'BFS / Level-Order', bn: 'BFS / লেভেল-অর্ডার' } },
      state: { queue: [staticTree.v], outputCount: 0, rule: 'FIFO Queue' },
      scene: {
        kind: 'tree',
        label: treeLabel || `BFS Level-Order: Initialized Queue [${staticTree.v}]`,
        root: staticTree,
        pointers: [{ target: staticTree.v, label: 'front', tone: 'cyan' }],
        highlights: { frontier: [staticTree.v] },
        output: [],
        outputLabel: 'BFS Level-Order Output Stream:'
      }
    });

    while (queue.length > 0) {
      const node = queue.shift();
      output.push(node.v);
      const currOutput = [...output];
      if (node.l) queue.push(node.l);
      if (node.r) queue.push(node.r);

      const queueVals = queue.map((n) => n.v);

      steps.push({
        title: {
          en: `Dequeue & Visit Node ${node.v} (BFS Level-Order)`,
          bn: `কিউ থেকে বের করে নোড ${node.v} ভিজিট করুন (BFS লেভেল-অর্ডার)`
        },
        explanation: {
          en: `**BFS / Level-Order Step**:\n1. Dequeue front: **\`${node.v}\`**\n2. Add **\`${node.v}\`** to output stream tape\n3. Enqueue children: ${node.l ? `Left \`${node.l.v}\`` : 'None'}, ${node.r ? `Right \`${node.r.v}\`` : 'None'}\n\n**Active Queue State**: \`[ ${queueVals.join(', ') || 'empty'} ]\``,
          bn: `**BFS / লেভেল-অর্ডার ধাপ**:\n১. কিউ-এর সামনের নোড **\`${node.v}\`** বের করা হলো\n২. আউটপুট টেপে **\`${node.v}\`** যোগ করা হলো\n৩. সন্তানদের কিউ-তে পুশ করা হলো: ${node.l ? `বাম \`${node.l.v}\`` : 'নেই'}, ${node.r ? `ডান \`${node.r.v}\`` : 'নেই'}\n\n**বর্তমান কিউ**: \`[ ${queueVals.join(', ') || 'খালি'} ]\``
        },
        line: 6, // visit(curr.val)
        iteration: { i: currOutput.length, of: null, label: { en: 'BFS / Level-Order', bn: 'BFS / লেভেল-অর্ডার' } },
        state: { currentNode: node.v, queue: queueVals, outputCount: currOutput.length, rule: 'Queue FIFO' },
        scene: {
          kind: 'tree',
          label: treeLabel || `BFS: Dequeued [${node.v}] · Active Queue: [${queueVals.join(', ')}]`,
          root: staticTree,
          pointers: [{ target: node.v, label: 'pop', tone: 'cyan' }],
          highlights: {
            current: node.v,
            visited: currOutput,
            frontier: queueVals
          },
          output: currOutput,
          outputLabel: 'BFS Level-Order Output Stream:'
        }
      });
    }

    // Final Completion Step
    steps.push({
      title: {
        en: 'BFS Level-Order Traversal Complete! Queue Empty',
        bn: 'BFS লেভেল-অর্ডার ট্রাভার্সাল সম্পন্ন! কিউ খালি'
      },
      explanation: {
        en: `**BFS Level-Order Traversal Finished!**\n\nFinal Output Stream:\n\`[ ${output.join(', ')} ]\`\n\nAll levels from depth $0$ to tree height were traversed strictly in horizontal order.\n\n**Queue space**: Bounded by maximum tree width $W \\le \\lceil N/2 \\rceil$.`,
        bn: `**BFS লেভেল-অর্ডার ট্রাভার্সাল সমাপ্ত!**\n\nচূড়ান্ত আউটপুট:\n\`[ ${output.join(', ')} ]\`\n\nডেপথ $০$ থেকে ট্রির পুরো উচ্চতা পর্যন্ত প্রতিটি লেভেল অনুভূমিকভাবে পরিদর্শন করা হয়েছে।\n\n**কিউ মেমোরি**: ট্রির সর্বোচ্চ প্রস্থ $W \\le \\lceil N/২ \\rceil$ দ্বারা সীমাবদ্ধ।`
      },
      line: 9,
      iteration: { i: output.length, of: null, label: { en: 'BFS / Level-Order', bn: 'BFS / লেভেল-অর্ডার' } },
      state: { status: 'Complete', queue: [], totalVisited: output.length, sequence: output.join(', ') },
      scene: {
        kind: 'tree',
        label: treeLabel || 'BFS Complete: All Levels Explored',
        root: staticTree,
        highlights: { visited: output },
        output: [...output],
        outputLabel: 'Final BFS Output:'
      }
    });

    const total = steps.length;
    steps.forEach((s) => (s.iteration.of = total));
    return steps;
  }

  return [];
}
