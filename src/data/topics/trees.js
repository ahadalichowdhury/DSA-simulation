/**
 * Binary Heap & Priority Queue
 * Covers: Min-Heap and Max-Heap Invariants, Array Mapping (2i+1, 2i+2, (i-1)/2),
 * Bubble-Up Insertion, Sink-Down Extraction, Build-Heap, and Heap Sort.
 */
import { treeProgram } from '../../visuals/treePlayground.js';

// The heap lesson shows the same tested min-heap program as the Tree Playground.
const HEAP_PROGRAM = treeProgram({ algo: 'heapExtract' }, [40, 20, 50, 10, 30, 5]);

export const treeTopics = [
  {
    id: 'heap',
    name: { en: 'Heap & Priority Queue', bn: 'হিপ ও প্রায়োরিটি কিউ' },
    description: {
      en: 'Always get the smallest value first: min-heap and heap sort',
      bn: 'সবসময় সবচেয়ে ছোট মান আগে: মিন-হিপ আর হিপ সর্ট'
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
    code: HEAP_PROGRAM.code,
    lineMap: HEAP_PROGRAM.lineMap,
    steps: [
      {
        title: {
          en: 'Why heaps? Serving the most urgent first',
          bn: 'হিপ কেন? সবচেয়ে জরুরিটা আগে'
        },
        explanation: {
          en: 'A normal **queue** is fair: first come, first served. But sometimes the **most important** item must go first:\n\n- in a hospital emergency room, the most critical patient is treated first;\n- in a computer, an urgent task jumps ahead of a slow background job.\n\nA **priority queue** always hands out the **smallest** (or largest) item next. A **heap** is the usual way to build one: adding an item and taking the smallest are both fast — about **log N** steps.',
          bn: 'সাধারণ **queue** ন্যায্য: আগে এলে আগে পাবে। কিন্তু কখনো কখনো **সবচেয়ে গুরুত্বপূর্ণটা** আগে যেতে হয়:\n\n- হাসপাতালের জরুরি বিভাগে সবচেয়ে গুরুতর রোগী আগে চিকিৎসা পায়;\n- কম্পিউটারে জরুরি কাজ ধীর ব্যাকগ্রাউন্ড কাজের আগে চলে যায়।\n\n**প্রায়োরিটি queue** সবসময় পরের বার **সবচেয়ে ছোট** (বা বড়) জিনিসটা দেয়। এটা বানানোর সাধারণ উপায় **হিপ**: জিনিস যোগ করা আর সবচেয়ে ছোটটা নেওয়া — দুটোই দ্রুত, প্রায় **log N** ধাপে।'
        },
        line: ['eTake'],
        iteration: { i: 1, of: 6, label: { en: 'Priority', bn: 'অগ্রাধিকার' } },
        state: { queueType: 'Priority Queue', backingStructure: 'Binary Heap in Array' },
        scene: {
          kind: 'tree',
          label: { en: 'Min-heap of patients: smaller number = more urgent', bn: 'রোগীদের মিন-হিপ: ছোট সংখ্যা = বেশি জরুরি' },
          root: { v: 1, sub: 'critical', l: { v: 3, l: { v: 7 }, r: { v: 5 } }, r: { v: 2, l: { v: 9 } } },
          highlights: { current: 1 },
          pointers: [{ i: 1, label: 'served first', tone: 'yellow' }],
          note: { en: 'Every parent is smaller than its children, so the most urgent patient is always at the top.', bn: 'প্রতিটা প্যারেন্ট তার চাইল্ডদের চেয়ে ছোট, তাই সবচেয়ে জরুরি রোগী সবসময় ওপরে।' }
        }
      },
      {
        title: {
          en: 'The min-heap rule',
          bn: 'মিন-হিপের নিয়ম'
        },
        explanation: {
          en: 'A **min-heap** is a complete binary tree with one rule at every node:\n\n> **A parent is never bigger than its children.**\n\nSo the smallest value of all is always at the **root** — you can read it instantly.\n\nNotice what the rule does **not** say: there is no order between **siblings**. Here the left child 40 is bigger than the right child 25 — that is perfectly fine. (A heap is not a BST.)',
          bn: '**মিন-হিপ** হলো একটা কমপ্লিট বাইনারি ট্রি, যার প্রতিটা নোডে একটাই নিয়ম:\n\n> **প্যারেন্ট কখনো তার চাইল্ডের চেয়ে বড় নয়।**\n\nতাই সবার মধ্যে সবচেয়ে ছোট মান সবসময় **রুটে** — সঙ্গে সঙ্গে পড়া যায়।\n\nখেয়াল করো, নিয়মটা কী **বলে না**: **সিবলিংদের** মধ্যে কোনো ক্রম নেই। এখানে বাম চাইল্ড 40 ডান চাইল্ড 25-এর চেয়ে বড় — এটা একদম ঠিক আছে। (হিপ কিন্তু BST নয়।)'
        },
        line: ['hLoop'],
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
        title: {
          en: 'A heap is really an array',
          bn: 'হিপ আসলে একটা অ্যারে'
        },
        explanation: {
          en: 'A heap is always **complete** (filled row by row, no gaps), so we store it as a plain **array**, row by row:\n\n`[10, 20, 30, 40, 25, 35, 50]`\n\nNo arrows are needed — simple math finds the family of index **i** (counting from 0):\n- left child at **2i + 1**\n- right child at **2i + 2**\n- parent at **(i − 1) ÷ 2** (round down)\n\nExample: `20` is at index 1 → its children are at 3 (`40`) and 4 (`25`).',
          bn: 'হিপ সবসময় **কমপ্লিট** (সারি ধরে ভরা, কোনো ফাঁক নেই), তাই একে একটা সাধারণ **অ্যারেতে** সারি ধরে রাখি:\n\n`[10, 20, 30, 40, 25, 35, 50]`\n\nকোনো তীর লাগে না — সহজ অঙ্কে ইনডেক্স **i**-এর পরিবার পাওয়া যায় (0 থেকে গুনে):\n- বাম চাইল্ড **2i + 1**-এ\n- ডান চাইল্ড **2i + 2**-এ\n- প্যারেন্ট **(i − 1) ÷ 2**-এ (নিচের দিকে রাউন্ড)\n\nউদাহরণ: `20` আছে ইনডেক্স 1-এ → তার চাইল্ড 3 (`40`) আর 4 (`25`)-এ।'
        },
        line: ['formula'],
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
        title: {
          en: 'Insert: add at the end, bubble up',
          bn: 'ইনসার্ট: শেষে যোগ, ওপরে ওঠা'
        },
        explanation: {
          en: 'Insert **15**:\n\n1. Put it at the **end** of the array (index 7). The tree stays complete.\n2. Its parent is at (7 − 1) ÷ 2 = 3 → `40`. 15 < 40 → **swap**.\n3. Now at index 3; parent at 1 → `20`. 15 < 20 → **swap**.\n4. Now at index 1; parent at 0 → `10`. 15 > 10 → **stop**.\n\n15 "bubbled up" until its parent was smaller. At most one swap per level → about **log N** swaps.',
          bn: '**15** ইনসার্ট করো:\n\n১. অ্যারের **শেষে** রাখো (ইনডেক্স 7)। ট্রি কমপ্লিট থাকে।\n২. প্যারেন্ট (7 − 1) ÷ 2 = 3-এ → `40`। 15 < 40 → **অদলবদল**।\n৩. এখন ইনডেক্স 3-এ; প্যারেন্ট 1-এ → `20`। 15 < 20 → **অদলবদল**।\n৪. এখন ইনডেক্স 1-এ; প্যারেন্ট 0-তে → `10`। 15 > 10 → **থামো**।\n\n15 ততক্ষণ "ওপরে উঠল" যতক্ষণ না প্যারেন্ট ছোট হলো। প্রতি লেভেলে বড়জোর একটা অদলবদল → প্রায় **log N**টা।'
        },
        line: ['hLoop', 'hSwap'],
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
        title: {
          en: 'Remove the minimum: sink down',
          bn: 'মিনিমাম সরাও: নিচে নামাও'
        },
        explanation: {
          en: 'Take out the smallest value, `10`, and keep the array without holes:\n\n1. Save the root `10` — that is our answer.\n2. Move the **last** value (`40`) to the root, and shrink the array by one.\n3. `40` is too big for the top. Compare it with its children `15` and `30`, and swap with the **smaller** one (`15`).\n4. At its new place, its children are `20` and `25`. Swap with the smaller (`20`).\n5. Now `40` has no smaller child → stop.\n\n> **Why the smaller child?** It becomes the new parent, so it must be ≤ the other child too.',
          bn: 'সবচেয়ে ছোট মান `10` বের করো, আর অ্যারেতে কোনো ফাঁক রেখো না:\n\n১. রুট `10` রেখে দাও — এটাই উত্তর।\n২. **শেষ** মানটা (`40`) রুটে আনো, আর অ্যারে এক ঘর ছোট করো।\n৩. `40` ওপরের জন্য বেশি বড়। তার চাইল্ড `15` আর `30`-এর সঙ্গে তুলনা করে **ছোটটার** (`15`) সঙ্গে অদলবদল করো।\n৪. নতুন জায়গায় তার চাইল্ড `20` আর `25`। ছোটটার (`20`) সঙ্গে অদলবদল।\n৫. এখন `40`-এর কোনো ছোট চাইল্ড নেই → থামো।\n\n> **ছোট চাইল্ড কেন?** সেটাই নতুন প্যারেন্ট হয়, তাই তাকে অন্য চাইল্ডের চেয়েও ≤ হতে হবে।'
        },
        line: ['eLast', 'sPick', 'sSwap'],
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
        title: {
          en: 'Heap sort',
          bn: 'হিপ সর্ট'
        },
        explanation: {
          en: 'If you take out the minimum again and again, the values come out in **sorted order**. That is **heap sort**:\n\n1. turn the array into a heap;\n2. repeatedly move the top to the end of the array and sink the new top down.\n\n- **Time:** always **O(N log N)** — no bad case (quicksort can hit O(N²)).\n- **Memory:** sorts inside the same array, no extra space.\n\n> **Try it:** Tree Playground → "Extract min" on your own numbers.',
          bn: 'বারবার মিনিমাম বের করলে মানগুলো **সাজানো ক্রমে** বের হয়। এটাই **হিপ সর্ট**:\n\n১. অ্যারেটাকে হিপ বানাও;\n২. বারবার ওপরেরটা অ্যারের শেষে সরাও আর নতুন ওপরেরটাকে নিচে নামাও।\n\n- **সময়:** সবসময় **O(N log N)** — কোনো খারাপ অবস্থা নেই (কুইকসর্ট O(N²)-এ পড়তে পারে)।\n- **মেমরি:** একই অ্যারের ভেতরে সাজায়, বাড়তি জায়গা লাগে না।\n\n> **চেষ্টা করো:** ট্রি প্লেগ্রাউন্ড → নিজের সংখ্যা দিয়ে "মিন বের করো"।'
        },
        line: ['eRet'],
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
