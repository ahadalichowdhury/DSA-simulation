/**
 * Binary Heap & Priority Queue
 * Covers: Min-Heap and Max-Heap Invariants, Array Mapping (2i+1, 2i+2, (i-1)/2),
 * Bubble-Up Insertion, Sink-Down Extraction, Build-Heap, and Heap Sort.
 */

export const treeTopics = [
  {
    id: 'heap',
    name: { en: 'Heap & Priority Queue', bn: 'হিপ ও প্রায়োরিটি কিউ' },
    description: {
      en: 'Complete binary tree array mapping, bubble-up insert, and sink-down extractMin',
      bn: 'কমপ্লিট বাইনারি ট্রি অ্যারে ম্যাপিং, বাবল-আপ ইনসার্ট এবং সিঙ্ক-ডাউন এক্সট্র্যাক্ট-মিন'
    },
    categoryKey: 'trees',
    subgroupKey: 'heaps',
    level: 'advanced',
    order: 10,
    icon: '⛰️',
    complexity: {
      time: 'O(log n)',
      best: 'O(1)',
      worst: 'O(log n)',
      space: 'O(n)',
      note: {
        en: 'insert and extractMin are O(log n) because you only climb or sink along one tree height. peek is O(1) at root. Stored compactly in a single contiguous array.',
        bn: 'ইনসার্ট আর এক্সট্র্যাক্ট O(log n), কারণ ট্রির উচ্চতা বরাবর উপরে বা নিচে যেতে হয়। পিক O(1)। সম্পূর্ণ ট্রি একটি নিরেট অ্যারেতে সংরক্ষিত থাকে।'
      }
    },
    code: {
      pseudo: {
        en: [
          "// Min-Heap Array Formula & Operations",
          "parent(i)     = floor((i - 1) / 2)",
          "leftChild(i)  = 2 * i + 1",
          "rightChild(i) = 2 * i + 2",
          "",
          "function insert(heap, x):",
          "  heap.append(x) // Insert at end of array",
          "  i = heap.length - 1",
          "  while i > 0 and heap[parent(i)] > heap[i]:",
          "    swap(heap, i, parent(i)) // Bubble up",
          "    i = parent(i)",
          "",
          "function extractMin(heap):",
          "  minVal = heap[0]",
          "  heap[0] = heap.pop() // Move last element to root",
          "  sinkDown(heap, 0)    // Restore min-heap property",
          "  return minVal",
          "",
          ""
        ],
        bn: [
          "// মিন-হিপ অ্যারে সূত্র ও অপারেশন",
          "parent(i)     = floor((i - 1) / 2)",
          "leftChild(i)  = 2 * i + 1",
          "rightChild(i) = 2 * i + 2",
          "",
          "function insert(heap, x):",
          "  heap.append(x) // অ্যারের শেষে যোগ করো",
          "  i = heap.length - 1",
          "  while i > 0 and heap[parent(i)] > heap[i]:",
          "    swap(heap, i, parent(i)) // বাবল আপ",
          "    i = parent(i)",
          "",
          "function extractMin(heap):",
          "  minVal = heap[0]",
          "  heap[0] = heap.pop() // শেষ উপাদানটি রুটে তোলো",
          "  sinkDown(heap, 0)    // মিন-হিপ নিয়ম পুনঃপ্রতিষ্ঠা",
          "  return minVal",
          "",
          ""
        ]
      },
      js: {
        en: [
          "// JavaScript Min-Heap Implementation",
          "const parent = (i) => Math.floor((i - 1) / 2);",
          "const leftChild = (i) => 2 * i + 1;",
          "const rightChild = (i) => 2 * i + 2;",
          "",
          "function insert(heap, x) {",
          "  heap.push(x);",
          "  let i = heap.length - 1;",
          "  while (i > 0 && heap[parent(i)] > heap[i]) {",
          "    [heap[i], heap[parent(i)]] = [heap[parent(i)], heap[i]];",
          "    i = parent(i);",
          "  }",
          "}",
          "function extractMin(heap) {",
          "  const minVal = heap[0];",
          "  heap[0] = heap.pop();",
          "  sinkDown(heap, 0);",
          "  return minVal;",
          "}"
        ],
        bn: [
          "// জাভাস্ক্রিপ্ট মিন-হিপ ইমপ্লিমেন্টেশন",
          "const parent = (i) => Math.floor((i - 1) / 2);",
          "const leftChild = (i) => 2 * i + 1;",
          "const rightChild = (i) => 2 * i + 2;",
          "",
          "function insert(heap, x) {",
          "  heap.push(x);",
          "  let i = heap.length - 1;",
          "  while (i > 0 && heap[parent(i)] > heap[i]) {",
          "    [heap[i], heap[parent(i)]] = [heap[parent(i)], heap[i]];",
          "    i = parent(i);",
          "  }",
          "}",
          "function extractMin(heap) {",
          "  const minVal = heap[0];",
          "  heap[0] = heap.pop();",
          "  sinkDown(heap, 0);",
          "  return minVal;",
          "}"
        ]
      },
      java: {
        en: [
          "// Java Min-Heap Implementation",
          "int parent(int i)     { return (i - 1) / 2; }",
          "int leftChild(int i)  { return 2 * i + 1; }",
          "int rightChild(int i) { return 2 * i + 2; }",
          "",
          "void insert(List<Integer> heap, int x) {",
          "  heap.add(x);",
          "  int i = heap.size() - 1;",
          "  while (i > 0 && heap.get(parent(i)) > heap.get(i)) {",
          "    Collections.swap(heap, i, parent(i));",
          "    i = parent(i);",
          "  }",
          "}",
          "int extractMin(List<Integer> heap) {",
          "  int minVal = heap.get(0);",
          "  heap.set(0, heap.remove(heap.size() - 1));",
          "  sinkDown(heap, 0);",
          "  return minVal;",
          "}"
        ],
        bn: [
          "// জাভা মিন-হিপ ইমপ্লিমেন্টেশন",
          "int parent(int i)     { return (i - 1) / 2; }",
          "int leftChild(int i)  { return 2 * i + 1; }",
          "int rightChild(int i) { return 2 * i + 2; }",
          "",
          "void insert(List<Integer> heap, int x) {",
          "  heap.add(x);",
          "  int i = heap.size() - 1;",
          "  while (i > 0 && heap.get(parent(i)) > heap.get(i)) {",
          "    Collections.swap(heap, i, parent(i));",
          "    i = parent(i);",
          "  }",
          "}",
          "int extractMin(List<Integer> heap) {",
          "  int minVal = heap.get(0);",
          "  heap.set(0, heap.remove(heap.size() - 1));",
          "  sinkDown(heap, 0);",
          "  return minVal;",
          "}"
        ]
      },
      python: {
        en: [
          "# Python Min-Heap Implementation",
          "def parent(i):      return (i - 1) // 2",
          "def left_child(i):  return 2 * i + 1",
          "def right_child(i): return 2 * i + 2",
          "",
          "def insert(heap, x):",
          "  heap.append(x)",
          "  i = len(heap) - 1",
          "  while i > 0 and heap[parent(i)] > heap[i]:",
          "    heap[i], heap[parent(i)] = heap[parent(i)], heap[i]",
          "    i = parent(i)",
          "",
          "def extract_min(heap):",
          "  min_val = heap[0]",
          "  heap[0] = heap.pop()",
          "  sink_down(heap, 0)",
          "  return min_val",
          "",
          ""
        ],
        bn: [
          "# পাইথন মিন-হিপ ইমপ্লিমেন্টেশন",
          "def parent(i):      return (i - 1) // 2",
          "def left_child(i):  return 2 * i + 1",
          "def right_child(i): return 2 * i + 2",
          "",
          "def insert(heap, x):",
          "  heap.append(x)",
          "  i = len(heap) - 1",
          "  while i > 0 and heap[parent(i)] > heap[i]:",
          "    heap[i], heap[parent(i)] = heap[parent(i)], heap[i]",
          "    i = parent(i)",
          "",
          "def extract_min(heap):",
          "  min_val = heap[0]",
          "  heap[0] = heap.pop()",
          "  sink_down(heap, 0)",
          "  return min_val",
          "",
          ""
        ]
      },
      cpp: {
        en: [
          "// C++ Min-Heap Implementation",
          "inline int parent(int i)     { return (i - 1) / 2; }",
          "inline int leftChild(int i)  { return 2 * i + 1; }",
          "inline int rightChild(int i) { return 2 * i + 2; }",
          "",
          "void insert(vector<int>& heap, int x) {",
          "  heap.push_back(x);",
          "  int i = heap.size() - 1;",
          "  while (i > 0 && heap[parent(i)] > heap[i]) {",
          "    swap(heap[i], heap[parent(i)]);",
          "    i = parent(i);",
          "  }",
          "}",
          "int extractMin(vector<int>& heap) {",
          "  int minVal = heap[0];",
          "  heap[0] = heap.back(); heap.pop_back();",
          "  sinkDown(heap, 0);",
          "  return minVal;",
          "}"
        ],
        bn: [
          "// সি++ মিন-হিপ ইমপ্লিমেন্টেশন",
          "inline int parent(int i)     { return (i - 1) / 2; }",
          "inline int leftChild(int i)  { return 2 * i + 1; }",
          "inline int rightChild(int i) { return 2 * i + 2; }",
          "",
          "void insert(vector<int>& heap, int x) {",
          "  heap.push_back(x);",
          "  int i = heap.size() - 1;",
          "  while (i > 0 && heap[parent(i)] > heap[i]) {",
          "    swap(heap[i], heap[parent(i)]);",
          "    i = parent(i);",
          "  }",
          "}",
          "int extractMin(vector<int>& heap) {",
          "  int minVal = heap[0];",
          "  heap[0] = heap.back(); heap.pop_back();",
          "  sinkDown(heap, 0);",
          "  return minVal;",
          "}"
        ]
      }
    },
    steps: [
      {
        title: { en: 'Why Heaps? The Priority Queue Concept', bn: 'হিপ কেন? প্রায়োরিটি কিউ ধারণা' },
        explanation: {
          en: 'A standard **Queue** is strictly FIFO (First-In, First-Out). Everyone waits equally.\n\nReal-world systems require **Priority**:\n- In hospital emergency rooms, the most critical patient goes first.\n- In an OS kernel, a hardware interrupt preempts a video player.\n\nA **Priority Queue** always dispenses the highest-priority (smallest or largest) element first, and a **Binary Heap** is the most efficient way to build one.',
          bn: 'সাধারণ **Queue** ফার্স্ট-ইন ফার্স্ট-আউট (FIFO) নিয়মে চলে। সবাই সমান অপেক্ষা করে।\n\nকিন্তু বাস্তব জীবনে **অগ্রাধিকার (Priority)** প্রয়োজন:\n- হাসপাতালের জরুরি বিভাগে সবচেয়ে গুরুতর রোগী আগে সেবা পায়।\n- অপারেটিং সিস্টেমে হার্ডওয়্যার ইন্টারাপ্ট সাধারণ অ্যাপের চেয়ে আগে সিপিইউ পায়।\n\nএকটি **প্রায়োরিটি কিউ** সর্বদা সর্বোচ্চ অগ্রাধিকারপ্রাপ্ত উপাদানটিকে সবার আগে বের করে দেয়, আর তা তৈরির সবচেয়ে দ্রুত উপায় হলো **বাইনারি হিপ**।',
        },
        line: 0,
        iteration: { i: 1, of: 6, label: { en: 'Priority', bn: 'অগ্রাধিকার' } },
        state: { queueType: 'Priority Queue', backingStructure: 'Binary Heap in Array' },
        scene: {
          kind: 'cards',
          label: 'Real-Life Need for Priority Queues',
          cards: [
            { icon: '🚑', title: 'Emergency Room', desc: 'Critical patients jump the queue regardless of arrival time.', state: 'active', tag: 'High Priority', accent: 'var(--red)' },
            { icon: '💻', title: 'OS CPU Scheduler', desc: 'Real-time tasks preempt background processes.', state: 'ok', tag: 'Scheduler', accent: 'var(--cyan)' },
            { icon: '⛰️', title: 'Heap Solution', desc: 'Guarantees O(1) peek and O(log n) insert/extract.', state: 'ok', tag: 'O(log n)', accent: 'var(--green)' }
          ],
          caption: 'Priority queues always dispense the most important item first.'
        }
      },
      {
        title: { en: 'The Min-Heap Invariant', bn: 'মিন-হিপের মূল শর্ত' },
        explanation: {
          en: 'A **Min-Heap** enforces one simple rule at every node:\n\n> **Every parent is smaller than or equal to both of its children!**\n$$\\mathbf{\\text{parent}(i) \\le \\text{leftChild}(i) \\quad \\text{and} \\quad \\text{parent}(i) \\le \\text{rightChild}(i)}$$\n\nNotice: Siblings have NO ordering rule between them! Left child 40 is larger than right child 25 — this is completely valid.\nBecause the root is smaller than all descendants, **peek is O(1) instantaneous**!',
          bn: '**মিন-হিপ (Min-Heap)** প্রতিটি নোডে একটি নিয়ম নিশ্চিত করে:\n\n> **প্রতিটি প্যারেন্ট তার উভয় সন্তানের চেয়ে ছোট বা সমান!**\n$$\\mathbf{\\text{parent}(i) \\le \\text{leftChild}(i) \\quad \\text{এবং} \\quad \\text{parent}(i) \\le \\text{rightChild}(i)}$$\n\nলক্ষ করো: দুই ভাইয়ের (siblings) মধ্যে কোনো ছোট-বড় নিয়ম নেই! বাম সন্তান ৪০ ডান সন্তান ২৫-এর চেয়ে বড় — এটি সম্পূর্ণ অনুমোদিত।\nযেহেতু রুটটি সবার চেয়ে ছোট, তাই **পিক (peek) সর্বদা O(1) তাত্ক্ষণিক**!',
        },
        line: 1,
        iteration: { i: 2, of: 6, label: { en: 'Invariant', bn: 'শর্ত' } },
        state: { root: 10, rule: 'parent <= children', peekTime: 'O(1)' },
        scene: {
          kind: 'tree',
          label: 'Min-Heap: Parent <= Children at every node. Root holds the minimum 10.',
          root: {
            v: 10,
            sub: 'Min Root',
            l: { v: 20, l: { v: 40 }, r: { v: 25 } },
            r: { v: 30, l: { v: 35 }, r: { v: 50 } }
          },
          highlights: { current: 10, active: [20, 30], visited: [40, 25, 35, 50] },
          legend: [
            { label: 'Minimum Element (Root 10)', color: 'var(--yellow)' },
            { label: 'Children (>= 10)', color: 'var(--cyan)' },
            { label: 'Grandchildren', color: 'var(--green)' }
          ],
          note: 'Root 10 is guaranteed to be the smallest element in the entire dataset.'
        }
      },
      {
        title: { en: 'Array Representation: Zero Pointers Stored', bn: 'অ্যারে রিপ্রেজেন্টেশন: শূন্য পয়েন্টার' },
        explanation: {
          en: 'Because a heap is a **Complete Binary Tree**, it is stored in a **contiguous array** level-by-level:\n`[10, 20, 30, 40, 25, 35, 50]`\n\nChild and parent indices are computed via arithmetic:\n- `leftChild(i)  = 2 * i + 1`\n- `rightChild(i) = 2 * i + 2`\n- `parent(i)     = floor((i - 1) / 2)`\n\nFor `i = 1` (value `20`), its children are at index $2(1)+1 = 3$ (`40`) and $2(1)+2 = 4$ (`25`)! Zero pointer memory overhead.',
          bn: 'যেহেতু হিপ একটি **কমপ্লিট বাইনারি ট্রি**, তাই একে কোনো পয়েন্টার ছাড়া সরাসরি একটি **অ্যারেতে** রাখা যায়:\n`[10, 20, 30, 40, 25, 35, 50]`\n\nইনডেক্স বের করার সহজ পাটিগণিত:\n- `leftChild(i)  = 2 * i + 1`\n- `rightChild(i) = 2 * i + 2`\n- `parent(i)     = floor((i - 1) / 2)`\n\nইনডেক্স ১ (`20`)-এর সন্তানরা আছে ইনডেক্স $2(1)+1 = 3$ (`40`) এবং $2(1)+2 = 4$ (`25`)-এ! কোনো মেমোরি অপচয় নেই।',
        },
        line: 2,
        iteration: { i: 3, of: 6, label: { en: 'Array Mapping', bn: 'অ্যারে ম্যাপিং' } },
        state: { i: 1, val: 20, leftIndex: 3, rightIndex: 4, parentIndex: 0 },
        scene: {
          kind: 'array',
          label: 'Heap stored in a single array: Parent at i=1 links to children at 2i+1 and 2i+2',
          cells: [10, 20, 30, 40, 25, 35, 50],
          showIndex: true,
          highlights: { active: [1], compare: [3, 4] },
          pointers: [
            { i: 1, label: 'i=1 (20)', tone: 'yellow' },
            { i: 3, label: '2i+1 (40)', tone: 'cyan' },
            { i: 4, label: '2i+2 (25)', tone: 'cyan' }
          ],
          brackets: [{ from: 3, to: 4, label: 'children of index 1', tone: 'green' }],
          note: 'Child locations are calculated via instant arithmetic without dereferencing pointers.'
        }
      },
      {
        title: { en: 'Insertion: Bubble-Up Mechanics', bn: 'ইনসার্ট: বাবল-আপ মেকানিক্স' },
        explanation: {
          en: 'Let\'s insert **`15`** into the heap:\n1. Append `15` at the **very end** of the array (index 7). The complete tree shape is preserved!\n2. Compare with parent: `(7 - 1) / 2 = 3` (value `40`).\n3. $15 < 40 \\implies$ **Swap**! 15 moves to index 3.\n4. Compare with new parent: `(3 - 1) / 2 = 1` (value `20`).\n5. $15 < 20 \\implies$ **Swap**! 15 moves to index 1.\n6. Compare with root `(0)`: $15 > 10 \\implies$ **Stop**!\n\n15 bubbles up along one branch in at most $O(\\log N)$ swaps.',
          bn: 'হিপে নতুন মান **`15`** ইনসার্ট করি:\n১. অ্যারের **সবার শেষে** ১৫ বসাও (ইনডেক্স ৭)। ট্রির গঠন কমপ্লিট থাকে!\n২. প্যারেন্টের সাথে তুলনা: `(7 - 1) / 2 = 3` (মান `40`)।\n৩. $15 < 40 \\implies$ **সোয়াপ**! ১৫ চলে গেল ইনডেক্স ৩-এ।\n৪. নতুন প্যারেন্টের সাথে তুলনা: `(3 - 1) / 2 = 1` (মান `20`)।\n৫. $15 < 20 \\implies$ **সোয়াপ**! ১৫ চলে গেল ইনডেক্স ১-এ।\n৬. রুটের সাথে তুলনা: $15 > 10 \\implies$ **থামো**!\n\n১৫ এক উচ্চতা বরাবর উপরে উঠে থেমে যায়। সর্বোচ্চ সোয়াপ সংখ্যা মাত্র $O(\\log N)$।',
        },
        line: 9,
        iteration: { i: 4, of: 6, label: { en: 'Bubble-Up', bn: 'বাবল-আপ' } },
        state: { inserted: 15, startIndex: 7, finalIndex: 1, swaps: 2, time: 'O(log N)' },
        scene: {
          kind: 'array',
          label: 'After Bubble-Up: 15 climbed to index 1 between root 10 and child 20',
          cells: [10, 15, 30, 20, 25, 35, 50, 40],
          showIndex: true,
          highlights: { active: [1], sorted: [0], compare: [3, 4] },
          pointers: [
            { i: 0, label: 'root (10)', tone: 'yellow' },
            { i: 1, label: 'newly bubbled (15)', tone: 'green' }
          ],
          note: 'Key 15 bubbled up from index 7 to index 1 in logarithmic time.'
        }
      },
      {
        title: { en: 'Extract-Min: Sink-Down Mechanics', bn: 'এক্সট্র্যাক্ট-মিন: সিঙ্ক-ডাউন মেকানিক্স' },
        explanation: {
          en: 'How to remove the minimum value (`10`) while keeping the heap array contiguous?\n\n1. Take root `10` as return value.\n2. **Move the last element (`40`) into the root spot**! (Array shrinks by 1).\n3. **Sink-Down**: `40` is too large for the root. Compare its children `15` and `30`.\n4. Swap with the **smaller child** (`15`)! `40` sinks to index 1.\n5. Next children of index 1 are `20` and `25`. Swap with smaller child (`20`)!\n\nHeap property restored in $O(\\log N)$ time.',
          bn: 'হিপকে নিরেট রেখে কীভাবে সর্বনিম্ন মান (`10`) তুলে নেওয়া হয়?\n\n১. রুট `10`-কে আউটপুট হিসেবে সংরক্ষণ করো।\n২. **অ্যারের শেষ উপাদান (`40`)-কে তুলে রুটের খালি ঘরে বসাও**! (অ্যারের আকার ১ কমল)।\n৩. **সিঙ্ক-ডাউন (Sink-Down)**: ৪০ রুটের জন্য অনেক বড়। তার দুই সন্তান ১৫ ও ৩০-কে দেখো।\n৪. **ছোট সন্তানের (`15`)** সাথে সোয়াপ করো! ৪০ নেমে গেল ইনডেক্স ১-এ।\n৫. ইনডেক্স ১-এর সন্তান ২০ ও ২৫। ছোট সন্তান (`20`)-এর সাথে সোয়াপ করো!\n\nহিপের নিয়ম পুনরায় প্রতিষ্ঠিত হলো মাত্র $O(\\log N)$ সময়ে।',
        },
        line: 15,
        iteration: { i: 5, of: 6, label: { en: 'Sink-Down', bn: 'সিঙ্ক-ডাউন' } },
        state: { extracted: 10, promotedToRoot: 40, finalPosition: 3, currentMin: 15 },
        scene: {
          kind: 'tree',
          label: 'Sink-Down complete: 15 is the new root, 40 sank down to leaf',
          root: {
            v: 15,
            sub: 'New Min Root',
            l: { v: 20, l: { v: 40 }, r: { v: 25 } },
            r: { v: 30, l: { v: 35 }, r: { v: 50 } }
          },
          highlights: { current: 15, active: [20, 30], visited: [40, 25, 35, 50] },
          legend: [
            { label: 'New Minimum Root (15)', color: 'var(--yellow)' },
            { label: 'Sunk Node (40)', color: 'var(--green)' }
          ],
          note: 'Root 10 was popped; 40 sank down, leaving second-smallest 15 at the root.'
        }
      },
      {
        title: { en: 'Heap Sort: In-Place O(N log N) Sorting', bn: 'হিপ সর্ট: ইন-প্লেস O(N log N) সর্টিং' },
        explanation: {
          en: '### The Heap Sort Algorithm:\n1. **Build Heap**: Run `sinkDown` on all internal nodes from $\\lfloor N/2 \\rfloor - 1$ down to 0 in $O(N)$ linear time.\n2. **Extract Repeatedly**: Repeatedly swap root with last unsorted element and sink down.\n\n### Complexity:\n- **Time**: $O(N \\log N)$ guaranteed in best, average, and worst cases (unlike Quicksort which has $O(N^2)$ trap!).\n- **Space**: **$O(1)$ auxiliary space** (in-place in the same array)!\n\nHeap Sort provides reliable, high-performance in-place sorting without extra memory allocation.',
          bn: '### হিপ সর্ট অ্যালগরিদম:\n১. **হিপ তৈরি (Build Heap)**: শেষ প্যারেন্ট $\\lfloor N/2 \\rfloor - 1$ থেকে ০ পর্যন্ত প্রতিটি নোডে `sinkDown` চালাও মাত্র $O(N)$ লিনিয়ার সময়ে।\n২. **পুনঃপুন এক্সট্র্যাক্ট**: রুটকে শেষ উপাদানের সাথে সোয়াপ করে প্রতিবার `sinkDown` করো।\n\n### জটিলতা:\n- **সময়**: নিশ্চিত $O(N \\log N)$ সব ক্ষেত্রে (কুইকসর্টের মতো খারাপ পরিস্থিতিতে $O(N^2)$ হয় না!)।\n- **মেমোরি**: **$O(1)$ অতিরিক্ত মেমোরি** (একই অ্যারের ভেতর ইন-প্লেস সর্ট হয়)!\n\nহিপ সর্ট কোনো অতিরিক্ত মেমোরি নষ্ট না করে অত্যন্ত নির্ভরযোগ্য সর্টিং সমাধান প্রদান করে।',
        },
        line: 16,
        iteration: { i: 6, of: 6, label: { en: 'Heap Sort', bn: 'হিপ সর্ট' } },
        state: { buildHeapTime: 'O(N)', sortTime: 'O(N log N)', extraMemory: 'O(1) in-place' },
        scene: {
          kind: 'array',
          label: 'Heap Sort Output: Elements extracted in ascending sorted order',
          cells: [10, 15, 20, 25, 30, 35, 40, 50],
          showIndex: true,
          highlights: { sorted: [0, 1, 2, 3, 4, 5, 6, 7] },
          note: 'Repeatedly extracting the minimum yields a perfectly sorted array.'
        }
      }
    ]
  }
];
