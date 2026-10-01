export const searchingTopics = [
  {
    id: 'linear-search',
    name: { en: 'Linear Search', bn: 'লিনিয়ার সার্চ' },
    description: {
      en: 'Check every item one by one — simple and honest',
      bn: 'এক এক করে সব আইটেম দেখা — সহজ ও সৎ'
    },
    categoryKey: 'searching',
    level: 'beginner',
    order: 10,
    icon: '🔦',
    complexity: {
      time: 'O(n)',
      best: 'O(1)',
      worst: 'O(n)',
      space: 'O(1)',
      note: {
        en: 'Best case: the key is the very first item. Worst case: it is last, or missing.',
        bn: 'সেরা কেস: কী প্রথম আইটেমেই আছে। সবচেয়ে খারাপ কেস: শেষে আছে, বা একেও নেই।'
      }
    },
    code: {
      en: [
        'linearSearch(arr, key):',
        '  for i = 0 to length(arr) - 1:',
        '    if arr[i] == key:',
        '      return i          // found it',
        '  return -1              // not found'
      ],
      bn: [
        'linearSearch(arr, key):',
        '  for i = 0 to length(arr) - 1:',
        '    if arr[i] == key:',
        '      return i          // পেয়ে গেছি',
        '  return -1              // পাওয়া যায়নি'
      ]
    },
    steps: [
      {
        title: { en: 'Find 93 in an unsorted list', bn: 'অসাজানো তালিকায় 93 খুঁজে বের করো' },
        explanation: {
          en: 'Here are 8 numbers in random order. We want the value **93**.\n\nThere is no rule in this list, so there is only one honest method: **start at index 0 and walk to the end**, asking "is this it?" each time.\n\nThat method has a name: **linear search**.',
          bn: '৮টা সংখ্যা এলোমেলো ভাবে আছে। আমরা **93** খুঁজছি।\n\nতালিকাটায় কোনো নিয়ম নেই, তাই একটাই সৎ উপায়: **০ নম্বর ইনডেক্স থেকে শুরু করে শেষ পর্যন্ত হাঁটা**, প্রতিবার জিজ্ঞেস করা "এটা কি?"।\n\nএই পদ্ধতির নাম **লিনিয়ার সার্চ (linear search)**।'
        },
        line: 1,
        scene: {
          kind: 'array',
          label: 'arr = [42, 17, 8, 93, 5, 31, 64, 22] · find <b>93</b>',
          cells: [42, 17, 8, 93, 5, 31, 64, 22],
          showIndex: true,
          highlights: { target: [3], dim: [0, 1, 2, 4, 5, 6, 7] },
          note: 'The red box is our <b>key</b> — but the computer does not know where it is yet.',
          legend: [
            { label: 'key we want', color: 'var(--red)' },
            { label: 'not checked yet', color: 'var(--border-bright)' }
          ]
        }
      },
      {
        title: { en: 'Step 1 — check index 0', bn: 'ধাপ ১ — ০ নম্বর ইনডেক্স দেখো' },
        explanation: {
          en: 'We point at `i = 0` and compare: `arr[0]` is **42**, the key is **93**. Not equal.\n\nOne check done, 7 more to go. Keep the pointer moving right.',
          bn: '`i = 0` নিয়ে তুলনা করলাম: `arr[0]` মানে **42**, কী মানে **93**। সমান নয়।\n\nএকটা চেক শেষ, ৭টা বাকি। পয়েন্টারটা ডানে সরাও।'
        },
        line: 2,
        state: { i: 0, 'arr[i]': 42, key: 93, found: false },
        scene: {
          kind: 'array',
          label: 'compare arr[0] with key',
          cells: [42, 17, 8, 93, 5, 31, 64, 22],
          showIndex: true,
          highlights: { compare: [0], target: [3], dim: [1, 2, 4, 5, 6, 7] },
          pointers: [{ i: 0, label: 'i', tone: 'cyan' }],
          note: '42 ≠ 93 → move on.'
        }
      },
      {
        title: { en: 'Step 2 — index 1', bn: 'ধাপ ২ — ১ নম্বর ইনডেক্স' },
        explanation: {
          en: '`i = 1`, value **17**. Still not 93.\n\nLinear search never jumps. It is like reading a list of names from the top — steady, predictable, and sometimes boring.',
          bn: '`i = 1`, মান **17**। এখনো 93 নয়।\n\nলিনিয়ার সার্চ কখনো ঝাঁপ দেয় না — নামের তালিকা উপর থেকে পড়ার মতো: ধীর, অনুমানযোগ্য, কখনো কখনো একঘেয়ে।'
        },
        line: 2,
        state: { i: 1, 'arr[i]': 17, key: 93, found: false },
        scene: {
          kind: 'array',
          label: 'compare arr[1] with key',
          cells: [42, 17, 8, 93, 5, 31, 64, 22],
          showIndex: true,
          highlights: { compare: [1], target: [3], dim: [0, 2, 4, 5, 6, 7] },
          pointers: [{ i: 1, label: 'i', tone: 'cyan' }],
          note: '17 ≠ 93 → move on.'
        }
      },
      {
        title: { en: 'Step 3 — index 2', bn: 'ধাপ ৩ — ২ নম্বর ইনডেক্স' },
        explanation: {
          en: '`i = 2`, value **8**. Nope.\n\nThree checks done. The array is small so this feels instant — but imagine 1,000,000 items and the key at the very end.',
          bn: '`i = 2`, মান **8**। না।\n\nতিনটা চেক শেষ। অ্যারেটা ছোট হয়ে যাওয়ায় সব তাৎক্ষণিক মনে হচ্ছে — কিন্তু ১০ লাখ আইটেম আর শেষের দিকে কী থাকলে?'
        },
        line: 2,
        state: { i: 2, 'arr[i]': 8, key: 93, checks: 3 },
        scene: {
          kind: 'array',
          label: 'compare arr[2] with key',
          cells: [42, 17, 8, 93, 5, 31, 64, 22],
          showIndex: true,
          highlights: { compare: [2], target: [3], dim: [0, 1, 4, 5, 6, 7] },
          pointers: [{ i: 2, label: 'i', tone: 'cyan' }],
          note: '8 ≠ 93 → one more step and…'
        }
      },
      {
        title: { en: 'Step 4 — found at index 3', bn: 'ধাপ ৪ — ৩ নম্বর ইনডেক্সে পেয়ে গেছি' },
        explanation: {
          en: '`i = 3`, value **93**. Equal!\n\nWe **return 3** immediately — the loop stops. No need to check the rest. This is why the best case is `O(1)`.\n\nThe caller now knows exactly where 93 lives.',
          bn: '`i = 3`, মান **93**। সমান!\n\nআমরা সঙ্গে সঙ্গে **৩ রিটার্ন** করলাম — লুপ থেমে গেল। বাকিগুলো দেখার দরকার নেই। তাই সেরা কেসটা `O(1)`।\n\nকল করা কোড এখন জানে 93 কোথায় আছে।'
        },
        line: 3,
        state: { i: 3, 'arr[i]': 93, key: 93, found: true, result: 3 },
        scene: {
          kind: 'array',
          label: 'arr[3] == key → return 3',
          cells: [42, 17, 8, 93, 5, 31, 64, 22],
          showIndex: true,
          highlights: { active: [3], target: [3], dim: [0, 1, 2, 4, 5, 6, 7] },
          pointers: [{ i: 3, label: 'i', tone: 'green' }],
          note: 'Match! Index <b>3</b> is the answer.',
          caption: '4 comparisons to find it — not bad'
        }
      },
      {
        title: { en: 'What if the key is missing?', bn: 'কী-টা না থাকলে?' },
        explanation: {
          en: 'If the loop reaches the end without a match, we return **-1**, the universal "not found" signal.\n\nWorst case: every single item was checked. That is `n` checks for `n` items → **O(n)**.\n\n> Linear search never lies to you: it checks everything, so it never misses an item that exists.',
          bn: "লুপ শেষ পর্যন্ত গেলেও মিল না পেলে আমরা **-1** রিটার্ন করি — \"পাওয়া যায়নি\"-র সর্বজনীন চিহ্ন।\n\nসবচেয়ে খারাপ অবস্থায়: সব আইটেম দেখা হয়ে গেল। `n` আইটেমে `n` বার চেক → **O(n)**।\n\n> লিনিয়ার সার্চ কখনো মিথ্যা বলে না: সব দেখে, তাই থাকা আইটেম কোনোদিন বাদ যায় না।"
        },
        line: 4,
        state: { i: 8, key: 100, result: -1, checks: 8 },
        scene: {
          kind: 'array',
          label: 'searching for <b>100</b> → not in the list',
          cells: [42, 17, 8, 93, 5, 31, 64, 22],
          showIndex: true,
          highlights: { dim: [0, 1, 2, 3, 4, 5, 6, 7] },
          note: 'All 8 checked, no match → <b>return -1</b>.',
          legend: [{ label: 'checked, no match', color: 'var(--border-bright)' }]
        }
      },
      {
        title: { en: 'The cost', bn: 'খরচটা কত' },
        explanation: {
          en: '- **Best case** `O(1)` — the key is the first cell.\n- **Worst case** `O(n)` — last cell, or absent.\n- **Space** `O(1)` — we only keep one pointer `i`.\n\nSo linear search is perfect for **small or unsorted** data, and for linked lists where you cannot jump anyway.',
          bn: '- **সেরা কেস** `O(1)` — কী প্রথম ঘরেই আছে।\n- **সবচেয়ে খারাপ কেস** `O(n)` — শেষ ঘরে, বা নেইই।\n- **স্পেস** `O(1)` — শুধু একটা পয়েন্টার `i` ধরে রাখি।\n\nতাই **ছোট বা অসাজানো** ডেটায় লিনিয়ার সার্চ দারুণ কাজ করে; লিংকড লিস্টে যেখানে ঝাঁপ দেওয়াই যায় না, সেখানে তো একমাত্র পথ।'
        },
        scene: {
          kind: 'cards',
          label: 'Linear search at a glance',
          cards: [
            { icon: '🍀', title: 'Best O(1)', desc: 'key is the first item', state: 'ok', tag: 'lucky', accent: 'var(--green)' },
            { icon: '🌪️', title: 'Worst O(n)', desc: 'key is last or missing', state: 'bad', tag: 'full scan', accent: 'var(--red)' },
            { icon: '🧠', title: 'Space O(1)', desc: 'only one pointer variable', state: 'ok', tag: 'tiny memory', accent: 'var(--cyan)' }
          ]
        }
      },
      {
        title: { en: 'When should you use it?', bn: 'কখন ব্যবহার করবে?' },
        explanation: {
          en: 'Use linear search when:\n\n- the list is **small** (a few dozen items),\n- the list is **unsorted** and sorting it would cost more,\n- you are walking a **linked list**.\n\nIf the list is sorted and big, jump to the next lesson: **binary search** — the halving trick.',
          bn: "লিনিয়ার সার্চ ব্যবহার করো যখন:\n\n- তালিকাটা **ছোট** (কয়েক ডজন আইটেম),\n- তালিকাটা **অসাজানো** এবং সাজানোর খরচই বেশি,\n- তুমি **লিংকড লিস্ট** ঘাটছো।\n\nতালিকা সাজানো আর বড় হলে পরের পাঠে যাও: **বাইনারি সার্চ** — অর্ধেক করে ফেলে দেওয়ার কৌশল।"
        },
        scene: {
          kind: 'cards',
          label: 'Pick the right tool',
          cards: [
            { icon: '📦', title: 'Small list', desc: 'just walk it — don’t overthink', state: 'ok', tag: 'use linear', accent: 'var(--green)' },
            { icon: '🎲', title: 'Unsorted data', desc: 'no structure to exploit', state: 'ok', tag: 'use linear', accent: 'var(--cyan)' },
            { icon: '📇', title: 'Linked list', desc: 'jumping is impossible', state: 'ok', tag: 'use linear', accent: 'var(--purple)' },
            { icon: '🔢', title: 'Big + sorted', desc: 'then go halving instead', state: 'active', tag: 'binary →', accent: 'var(--yellow)' }
          ],
          caption: 'Next lesson in the sidebar: Binary Search'
        }
      }
    ]
  },

  {
    id: 'binary-search',
    name: { en: 'Binary Search', bn: 'বাইনারি সার্চ' },
    description: {
      en: 'Throw away half the list, again and again',
      bn: 'তালিকার অর্ধেক ফেলে দাও, বারবার'
    },
    categoryKey: 'searching',
    level: 'beginner',
    order: 20,
    icon: '⚡',
    complexity: {
      time: 'O(log n)',
      best: 'O(1)',
      worst: 'O(log n)',
      space: 'O(1)',
      note: {
        en: 'Hard rule: the array MUST already be sorted. Otherwise the halves mean nothing.',
        bn: 'কঠোর নিয়ম: অ্যারেটা আগে থেকেই সাজানো থাকতে হবে। না থাকলে অর্ধেক ফেলে দেওয়ার কোনো মানে নেই।'
      }
    },
    code: {
      en: [
        'binarySearch(arr, key):',
        '  lo = 0, hi = length(arr) - 1',
        '  while lo <= hi:',
        '    mid = (lo + hi) / 2',
        '    if arr[mid] == key: return mid',
        '    if arr[mid] < key:  lo = mid + 1',
        '    else:               hi = mid - 1',
        '  return -1'
      ],
      bn: [
        'binarySearch(arr, key):',
        '  lo = 0, hi = length(arr) - 1',
        '  while lo <= hi:',
        '    mid = (lo + hi) / 2',
        '    if arr[mid] == key: return mid',
        '    if arr[mid] < key:  lo = mid + 1',
        '    else:               hi = mid - 1',
        '  return -1'
      ]
    },
    steps: [
      {
        title: { en: 'A sorted list changes everything', bn: 'সাজানো তালিকা সব বদলে দেয়' },
        explanation: {
          en: 'Here the numbers are **sorted low → high**. Now we can be lazy in a smart way.\n\nLook at the middle. If the middle number is **too small**, then the whole left half is too small — we can delete it from our search.\n\nHalve. Look. Halve. Look. That is **binary search**.',
          bn: "এখানে সংখ্যাগুলো **ছোট থেকে বড়** সাজানো। এখন চতুরভাবে অলস হওয়া যায়।\n\nমাঝখানটা দেখো। মাঝের সংখ্যাটা **খুব ছোট** হলে — তাহলে পুরো বাম দিকটাই ছোট। ওটাকে খোঁজ থেকে বাদ দেওয়া যায়।\n\nঅর্ধেক করো। দেখো। অর্ধেক করো। দেখো। এটাই **বাইনারি সার্চ**।"
        },
        line: 0,
        scene: {
          kind: 'array',
          label: 'arr (sorted) = [3, 8, 12, 17, 24, 31, 42, 56] · find <b>31</b>',
          cells: [3, 8, 12, 17, 24, 31, 42, 56],
          showIndex: true,
          highlights: { target: [5], dim: [0, 1, 2, 3, 4, 6, 7] },
          note: 'Sorted order is the **price of entry** — without it this algorithm does not work.',
          legend: [{ label: 'key we want', color: 'var(--red)' }]
        }
      },
      {
        title: { en: 'Set the two boundaries', bn: 'দুটো সীমা ঠিক করো' },
        explanation: {
          en: 'We keep two pointers:\n\n- **lo = 0** → the leftmost index we still trust.\n- **hi = 7** → the rightmost index we still trust.\n\nEverything outside `[lo … hi]` is already thrown away. Right now nothing is thrown away yet.',
          bn: "দুটো পয়েন্টার রাখি:\n\n- **lo = 0** → বাম দিকের শেষ ইনডেক্স যেখানে এখনো আশা করা যায়।\n- **hi = 7** → ডান দিকের শেষ ইনডেক্স যেখানে এখনো আশা করা যায়।\n\n`[lo … hi]`-এর বাইরের সবকিছু আগেই ফেলে দেওয়া হয়েছে। এখন এখনো কিছুই ফেলা হয়নি।"
        },
        line: 1,
        state: { lo: 0, hi: 7, key: 31 },
        scene: {
          kind: 'array',
          label: 'search space = whole array',
          cells: [3, 8, 12, 17, 24, 31, 42, 56],
          showIndex: true,
          highlights: { mark: [0, 1, 2, 3, 4, 5, 6, 7], target: [5] },
          pointers: [
            { i: 0, label: 'lo', tone: 'cyan' },
            { i: 7, label: 'hi', tone: 'amber' }
          ],
          note: 'Everything between the two pointers is still possible.'
        }
      },
      {
        title: { en: 'Look at the middle — mid = 3', bn: 'মাঝখানটা দেখো — mid = 3' },
        explanation: {
          en: '`mid = (0 + 7) / 2 = 3` (rounded down).\n\n`arr[3]` is **17**. Our key is **31**.\n\n17 < 31 → the key must be to the **right**. Everything at index 3 and left of it can be deleted. We just threw away **half the array in one step**.',
          bn: '`mid = (0 + 7) / 2 = 3` (নিচের দিকে গোল করা)।\n\n`arr[3]` মানে **17**। আমাদের কী **31**।\n\n17 < 31 → কী-টা **ডানে** থাকতে হবে। ৩ নম্বর ও তার বামের সব মুছে যায়। **এক ধাপেই অ্যারের অর্ধেক ফেলে দিলাম।**'
        },
        line: 3,
        state: { lo: 0, hi: 7, mid: 3, 'arr[mid]': 17, key: 31 },
        scene: {
          kind: 'array',
          label: 'mid = (0+7)/2 = 3 → arr[3] = 17',
          cells: [3, 8, 12, 17, 24, 31, 42, 56],
          showIndex: true,
          highlights: { compare: [3], target: [5], dim: [0, 1, 2] },
          pointers: [
            { i: 0, label: 'lo', tone: 'cyan' },
            { i: 3, label: 'mid', tone: 'green' },
            { i: 7, label: 'hi', tone: 'amber' }
          ],
          brackets: [{ from: 0, to: 3, label: 'discard →', tone: 'red' }],
          note: '17 < 31 → search the right half only.'
        }
      },
      {
        title: { en: 'Move lo past the dead half', bn: 'মৃত অর্ধেকের পরে lo সরাও' },
        explanation: {
          en: 'The left half is gone, so we set `lo = mid + 1 = 4`.\n\nNew space: **`[4 … 7]`** — only 4 cells left instead of 8. The pointers animate inwards, which is exactly how the search shrinks.\n\nNext we repeat the same one rule.',
          bn: "বাম অর্ধেক গেছে, তাই `lo = mid + 1 = 4` ধরলাম।\n\nনতুন জায়গা: **`[4 … 7]`** — ৮টার বদলে মাত্র ৪টা ঘর। পয়েন্টার দুটো ভেতরের দিকে টেনে আসছে, ঠিক এভাবেই সার্চটা ছোট হতে থাকে।\n\nএখন একই নিয়ম আবার চালাও।"
        },
        line: 5,
        state: { lo: 4, hi: 7, mid: 3, 'arr[mid]': 17, key: 31, discarded: 4 },
        scene: {
          kind: 'array',
          label: 'lo = mid + 1 → search space [4 … 7]',
          cells: [3, 8, 12, 17, 24, 31, 42, 56],
          showIndex: true,
          highlights: { dim: [0, 1, 2, 3], mark: [4, 5, 6, 7], target: [5] },
          pointers: [
            { i: 4, label: 'lo', tone: 'cyan' },
            { i: 7, label: 'hi', tone: 'amber' }
          ],
          brackets: [{ from: 4, to: 7, label: 'still possible', tone: 'green' }],
          note: 'Half the work is already gone — step 1 of 3.'
        }
      },
      {
        title: { en: 'Round 2 — mid = 5, exact match', bn: 'চক্র ২ — mid = 5, ঠিক মিল' },
        explanation: {
          en: '`mid = (4 + 7) / 2 = 5` (rounded down).\n\n`arr[5]` is **31**. Our key is **31**. **Equal!**\n\nWe return `mid = 5` and stop. Two comparisons found one item out of eight — and it would still be only ~20 comparisons for 1,000,000 items.',
          bn: '`mid = (4 + 7) / 2 = 5` (নিচের দিকে গোল)।\n\n`arr[5]` মানে **31**। আমাদের কী-ও **31**। **সমান!**\n\n`mid = 5` রিটার্ন করে থামলাম। মাত্র দুই চেকে ৮টার মধ্যে একটা পেয়ে গেলাম — ১০ লাখ আইটেমেও মাত্র ~২০ চেক লাগবে।'
        },
        line: 4,
        state: { lo: 4, hi: 7, mid: 5, 'arr[mid]': 31, key: 31, found: true, result: 5, checks: 2 },
        scene: {
          kind: 'array',
          label: 'arr[5] == key → return 5',
          cells: [3, 8, 12, 17, 24, 31, 42, 56],
          showIndex: true,
          highlights: { active: [5], target: [5], dim: [0, 1, 2, 3, 4, 6, 7] },
          pointers: [
            { i: 4, label: 'lo', tone: 'cyan' },
            { i: 5, label: 'mid', tone: 'green' },
            { i: 7, label: 'hi', tone: 'amber' }
          ],
          note: 'Found in <b>2 comparisons</b> — linear search needed 6.',
          caption: 'index 5 · value 31 ✓'
        }
      },
      {
        title: { en: 'The loop keeps halving', bn: 'লুপটা বারবার অর্ধেক করে' },
        explanation: {
          en: 'The `while lo <= hi` loop does the same thing over and over:\n\n1. compute `mid`\n2. compare\n3. throw away half\n\nFor 1,000,000 items you get roughly `log₂(1,000,000) ≈ 20` rounds. For 1,000,000,000 items — only 30.',
          bn: "`while lo <= hi` লুপটা একই কাজ বারবার করে:\n\n1. `mid` বের করা\n2. তুলনা করা\n3. অর্ধেক ফেলে দেওয়া\n\n১০ লাখ আইটেমে প্রায় `log₂(১০,০০,০০০) ≈ ২০` চক্র। ১০০ কোটি আইটেমে — মাত্র ৩০ চক্র।"
        },
        line: 2,
        scene: {
          kind: 'chart',
          label: 'comparisons needed as the list grows',
          unit: '',
          max: 32,
          items: [
            { label: 'n=16', v: 4, color: 'linear-gradient(180deg,#34d399,#059669)' },
            { label: 'n=256', v: 8, color: 'linear-gradient(180deg,#34d399,#059669)' },
            { label: 'n=1k', v: 10, color: 'linear-gradient(180deg,#22d3ee,#0891b2)' },
            { label: 'n=1M', v: 20, color: 'linear-gradient(180deg,#22d3ee,#0891b2)' },
            { label: 'n=1B', v: 30, color: 'linear-gradient(180deg,#fbbf24,#d97706)' }
          ],
          note: 'The list grows a BILLION times — the steps only grow from 4 to 30.',
          legend: [{ label: 'comparisons', color: 'var(--green)' }]
        }
      },
      {
        title: { en: 'When the key is not there', bn: 'কী-টা না থাকলে কী হয়' },
        explanation: {
          en: 'Say the key is **99** (not in the array).\n\n- Round 1: `mid` = 17 → go right → `lo = 4`\n- Round 2: `mid` = 31 → go right → `lo = 6`\n- Round 3: `mid` = 42 → go right → `lo = 7`\n- Round 4: `mid` = 56 → go right → `lo = 8`\n\nNow `lo = 8 > hi = 7`. The loop condition `lo <= hi` is false, we exit, and return **-1**.\n\n> The pointers crossing each other is the signal that the search space is empty.',
          bn: "ধরো কী **99** (অ্যারেতে নেই)।\n\n- চক্র ১: `mid` = 17 → ডানে → `lo = 4`\n- চক্র ২: `mid` = 31 → ডানে → `lo = 6`\n- চক্র ৩: `mid` = 42 → ডানে → `lo = 7`\n- চক্র ৪: `mid` = 56 → ডানে → `lo = 8`\n\nএখন `lo = 8 > hi = 7`। লুপের শর্ত `lo <= hi` মিথ্যা, লুপ বন্ধ, রিটার্ন **-1**।\n\n> দুই পয়েন্টার পরস্পরকে ছাড়িয়ে যাওয়াই বোঝায় খোঁজার জায়গা শেষ।"
        },
        line: 7,
        state: { lo: 8, hi: 7, key: 99, result: -1, rounds: 4 },
        scene: {
          kind: 'array',
          label: 'key = 99 → lo crossed hi → return -1',
          cells: [3, 8, 12, 17, 24, 31, 42, 56],
          showIndex: true,
          highlights: { dim: [0, 1, 2, 3, 4, 5, 6, 7] },
          pointers: [
            { i: 7, label: 'hi', tone: 'amber' },
            { i: 7, label: 'lo →', tone: 'cyan' }
          ],
          note: 'Nothing left between lo and hi → <b>not found</b>.',
          legend: [{ label: 'search space is empty', color: 'var(--text-muted)' }]
        }
      },
      {
        title: { en: 'Rules, cost, and when to use it', bn: 'নিয়ম, খরচ, আর কখন ব্যবহার করবে' },
        explanation: {
          en: '**Rules**\n- The array must be **sorted**.\n- Only index access works — so it suits arrays, not linked lists.\n\n**Cost**\n- Time `O(log n)`, space `O(1)`.\n- Sorting first costs `O(n log n)`, so only sort once and search many times.\n\n**Use it** for databases, phone books, debuggers, and any "is this ID in the list?" question over big sorted data.',
          bn: "**নিয়ম**\n- অ্যারেটা **সাজানো** থাকতে হবে।\n- শুধু ইনডেক্স দিয়ে পড়া যায় — তাই অ্যারের জন্য উপযুক্ত, লিংকড লিস্টের জন্য নয়।\n\n**খরচ**\n- সময় `O(log n)`, স্পেস `O(1)`।\n- আগে সাজাতে `O(n log n)` লাগে, তাই একবার সাজিয়ে বারবার খোঁজো।\n\n**ব্যবহার** করো ডাটাবেস, ফোনবুক, ডিবাগারে — যেখানে বড় সাজানো তালিকায় \"এই আইডি আছে কি?\" জানতে হয়।"
        },
        scene: {
          kind: 'cards',
          label: 'Binary search in one screen',
          cards: [
            { icon: '📇', title: 'Sorted only', desc: 'unsorted data breaks it', state: 'active', tag: 'rule 1', accent: 'var(--yellow)' },
            { icon: '✂️', title: 'Halve every round', desc: 'lo/hi shrink towards each other', state: 'active', tag: 'trick', accent: 'var(--cyan)' },
            { icon: '⚡', title: 'O(log n)', desc: '1,000,000 items → ~20 checks', state: 'ok', tag: 'cost', accent: 'var(--green)' },
            { icon: '🧠', title: 'O(1) space', desc: 'only lo, hi, mid variables', state: 'ok', tag: 'memory', accent: 'var(--purple)' }
          ],
          caption: 'You just finished Searching · next chapter: Sorting'
        }
      }
    ]
  }
];
