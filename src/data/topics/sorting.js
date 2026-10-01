/**
 * AlgoSim — Sorting chapter.
 * 5 topics · every human string is { en, bn } · every step carries a scene.
 * Small builders below keep the step objects plain and fully populated.
 */

const bi = (en, bn) => ({ en, bn });

const SCENE_KEYS = [
  'kind', 'label', 'cells', 'showIndex', 'sub', 'highlights', 'pointers',
  'brackets', 'aux', 'items', 'unit', 'max', 'cards', 'nodes', 'note',
  'caption', 'legend', 'desc'
];

/** Copy only real scene fields so no `undefined` key ever reaches the renderer. */
const scene = (o) =>
  Object.fromEntries(Object.entries(o).filter(([k, v]) => SCENE_KEYS.includes(k) && v !== undefined));

/** step(title, explanation, scene, line?, state?) — `line` is 0-based into `code`. */
const step = (title, explanation, sc, line, state) => {
  const s = { title, explanation, scene: sc };
  if (line !== undefined) s.line = line;
  if (state !== undefined) s.state = state;
  return s;
};

export const sortingTopics = [
  /* ─────────────────────────────  1 · SELECTION SORT  ───────────────────────────── */
  {
    id: 'selection-sort',
    name: bi('Selection Sort', 'সিলেকশন সর্ট'),
    description: bi('Find the smallest value and move it to the front', 'সবচেয়ে ছোট মানটা খুঁজে সামনে সরাও'),
    categoryKey: 'sorting',
    level: 'beginner',
    order: 10,
    icon: '🎯',
    complexity: {
      time: 'O(n²)',
      best: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      note: bi(
        'Always about n²/2 comparisons, but never more than n-1 swaps — cheap when writing data is expensive.',
        'প্রতিবারই প্রায় n²/2 বার তুলনা লাগে, কিন্তু সোয়াপ (swap) n-1 বারের বেশি নয় — লেখা খরচি হলে এটাই দারুণ।'
      )
    },
    code: {
      en: [
        'selectionSort(arr):',
        '  n = length(arr)',
        '  for i = 0 to n - 1:',
        '    min = i                     // assume the start is smallest',
        '    for j = i + 1 to n - 1:',
        '      if arr[j] < arr[min]:',
        '        min = j                 // found a smaller value',
        '    swap(arr, i, min)           // drop the smallest into place'
      ],
      bn: [
        'selectionSort(arr):',
        '  n = length(arr)',
        '  for i = 0 to n - 1:',
        '    min = i                     // শুরুতে i-কেই সবচেয়ে ছোট ধরি',
        '    for j = i + 1 to n - 1:',
        '      if arr[j] < arr[min]:',
        '        min = j                 // আরও ছোট মান পেয়ে গেছি',
        '    swap(arr, i, min)           // ছোটটাকে i-তে বসাও'
      ]
    },
    steps: [
      step(
        bi('Six cards in a mess', 'ছয়টা কার্ড এলোমেলো'),
        bi(
          'We have six numbers: `5, 3, 8, 1, 9, 2`. We want them small to big: `1, 2, 3, 5, 8, 9`.\n\n**Selection sort** repeats one simple move: look at the unsorted part, find the smallest value, and move it to the front.\n\n> Like picking the shortest kid out of a line and sending them to the front — again and again.',
          'ছয়টা সংখ্যা আছে: `5, 3, 8, 1, 9, 2`। ছোট থেকে বড় চাই: `1, 2, 3, 5, 8, 9`।\n\n**সিলেকশন সর্ট (selection sort)** একটাই সহজ কাজ বারবার করে: অসাজানো অংশে সবচেয়ে ছোট মানটা খুঁজে বের করা, তারপর সামনে বসানো।\n\n> লাইন থেকে সবচেয়ে ছোট মেয়েকে বের করে সামনে পাঠানোর মতো — বারবার বারবার।'
        ),
        scene({
          kind: 'array',
          label: 'nums = [5, 3, 8, 1, 9, 2] · we want [1, 2, 3, 5, 8, 9]',
          cells: [5, 3, 8, 1, 9, 2],
          showIndex: true,
          note: 'Nothing is sorted yet — every cell is fair game.',
          caption: 'selection sort will fix this in 5 rounds',
          legend: [{ label: 'unsorted value', color: 'var(--border-bright)' }]
        }),
        0,
        { n: 6, sorted: 0, 'target': '1, 2, 3, 5, 8, 9' }
      ),
      step(
        bi('The one rule of the algorithm', 'অ্যালগরিদমের একটাই নিয়ম'),
        bi(
          'Round `i` does two things:\n\n- scan cells `i+1 … n-1` and remember the index of the smallest value in `min`.\n- **swap** `arr[i]` with `arr[min]`.\n\nAfter round `i`, cell `i` holds its final value. The green part grows by one cell each round.\n\n> The left side is **sorted**. The right side is still a mess.',
          'চক্র `i` দুটাই কাজ করে:\n\n- `i+1 … n-1` ঘরগুলো ঘুরে সবচেয়ে ছোট মানের ইনডেক্সটা `min`-এ মনে রাখা।\n- `arr[i]` আর `arr[min]`-এর মধ্যে **সোয়াপ (swap)**।\n\n`i` চক্র শেষ হলে `i` নম্বর ঘরে তার চূড়ান্ত মান বসে যায়। সবুজ অংশ প্রতি চক্রে এক ঘর বাড়ে।\n\n> বাম পাশ **সাজানো**, ডান পাশ এখনো এলোমেলো।'
        ),
        scene({
          kind: 'array',
          label: 'round i = 0 starts here',
          cells: [5, 3, 8, 1, 9, 2],
          showIndex: true,
          highlights: { active: [0] },
          pointers: [{ i: 0, label: 'i', tone: 'cyan' }],
          brackets: [
            { from: 1, to: 5, label: 'scan this for the min', tone: 'amber' }
          ],
          note: 'The sorted side is empty right now — round 0 is about to fill it.'
        }),
        2,
        { i: 0, min: 0, 'sorted cells': 0 }
      ),
      step(
        bi('Round 1 — hunt for the minimum', 'চক্র ১ — সর্বনিম্ন খোঁজা'),
        bi(
          '`i = 0`, so `min = 0` at first (value **5**).\n\nThen `j` walks to the right:\n\n- `arr[1]` = **3** < 5 → `min = 1`\n- `arr[2]` = 8 → no\n- `arr[3]` = **1** < 3 → `min = 3`\n- `arr[4]` = 9, `arr[5]` = 2 → no\n\nThe smallest value of the whole array is **1**, sitting at index 3.',
          '`i = 0`, তাই শুরুতে `min = 0` (মান **5**)।\n\nএরপর `j` ডানে ডানে যায়:\n\n- `arr[1]` = **3** < 5 → `min = 1`\n- `arr[2]` = 8 → না\n- `arr[3]` = **1** < 3 → `min = 3`\n- `arr[4]` = 9, `arr[5]` = 2 → না\n\nপুরো অ্যারের সবচেয়ে ছোট মান **1**, ইনডেক্স ৩-এ বসে আছে।'
        ),
        scene({
          kind: 'array',
          label: 'scan finished → min = 3 (value 1)',
          cells: [5, 3, 8, 1, 9, 2],
          showIndex: true,
          highlights: { active: [3], dim: [1, 2, 4, 5] },
          pointers: [
            { i: 0, label: 'i', tone: 'cyan' },
            { i: 3, label: 'min', tone: 'green' }
          ],
          note: 'The whole scan looked at 5 cells — and 1 won.',
          caption: 'min = 3 · value = 1'
        }),
        5,
        { i: 0, j: 5, min: 3, 'arr[min]': 1 }
      ),
      step(
        bi('Round 1 — swap the minimum home', 'চক্র ১ — সর্বনিম্নটাকে বাড়ি পাঠাও'),
        bi(
          'Now the swap: `arr[0]` = 5 and `arr[3]` = 1 change places.\n\nArray becomes **`[1, 3, 8, 5, 9, 2]`**.\n\nIndex 0 now holds its final value **1**, and the green bracket has length 1.\n\n> Only **one** swap per round — that is the signature of selection sort.',
          'এখন সোয়াপ: `arr[0]` = 5 আর `arr[3]` = 1 জায়গা বদলাল।\n\nঅ্যারে হলো **`[1, 3, 8, 5, 9, 2]`**।\n\n০ নম্বর ঘরে এখন তার চূড়ান্ত মান **1** বসেছে, আর সবুজ ব্র্যাকেট এক ঘর।\n\n> প্রতি চক্রে মাত্র **একটা** সোয়াপ — এটাই সিলেকশন সর্টের চিহ্ন।'
        ),
        scene({
          kind: 'array',
          label: 'swap(0, 3) → [1, 3, 8, 5, 9, 2]',
          cells: [1, 3, 8, 5, 9, 2],
          showIndex: true,
          highlights: { swap: [0, 3] },
          pointers: [{ i: 0, label: 'i', tone: 'cyan' }],
          brackets: [{ from: 0, to: 0, label: 'sorted', tone: 'green' }],
          note: 'Index 0 is finished. 5 moved to index 3 and is still unsorted.'
        }),
        7,
        { i: 0, min: 3, swap: '0 <-> 3', 'sorted cells': 1 }
      ),
      step(
        bi('Round 2 — smallest of the rest', 'চক্র ২ — বাকিদের মধ্যে সর্বনিম্ন'),
        bi(
          '`i = 1` now. Scan `arr[2 … 5]` = `8, 5, 9, 2`:\n\n- 8 → `min = 2`\n- 5 < 8 → `min = 3`\n- 9 → no\n- 2 < 5 → `min = 5`\n\nSo `min = 5` (value **2**). Swap index 1 with index 5 → **`[1, 2, 8, 5, 9, 3]`**. Two cells are settled.',
          'এখন `i = 1`। `arr[2 … 5]` মানে `8, 5, 9, 2` ঘাটা হলো:\n\n- 8 → `min = 2`\n- 5 < 8 → `min = 3`\n- 9 → না\n- 2 < 5 → `min = 5`\n\nমানে `min = 5` (মান **2**)। ইনডেক্স ১ আর ৫ সোয়াপ → **`[1, 2, 8, 5, 9, 3]`**। দুই ঘর শেষ।'
        ),
        scene({
          kind: 'array',
          label: 'swap(1, 5) → [1, 2, 8, 5, 9, 3]',
          cells: [1, 2, 8, 5, 9, 3],
          showIndex: true,
          highlights: { swap: [1, 5], sorted: [0] },
          pointers: [{ i: 1, label: 'i', tone: 'cyan' }],
          brackets: [{ from: 0, to: 1, label: 'sorted', tone: 'green' }],
          note: 'The smallest of the rest (2) travelled from index 5 to index 1.'
        }),
        5,
        { i: 1, min: 5, 'sorted cells': 2 }
      ),
      step(
        bi('Round 3 — swap again', 'চক্র ৩ — আবার সোয়াপ'),
        bi(
          '`i = 2`. The rest is `5, 9, 3`, and the smallest is **3** at index 5.\n\nSwap index 2 with index 5 → **`[1, 2, 3, 5, 9, 8]`**.\n\nThree cells sorted: `1, 2, 3`. The green bracket keeps growing to the right.',
          '`i = 2`। বাকি অংশ `5, 9, 3`, আর সবচেয়ে ছোট **3**, ইনডেক্স ৫-এ।\n\nইনডেক্স ২ আর ৫ সোয়াপ → **`[1, 2, 3, 5, 9, 8]`**।\n\nতিন ঘর সাজানো: `1, 2, 3`। সবুজ ব্র্যাকেট ডানে দিকে বাড়তেই থাকে।'
        ),
        scene({
          kind: 'array',
          label: 'swap(2, 5) → [1, 2, 3, 5, 9, 8]',
          cells: [1, 2, 3, 5, 9, 8],
          showIndex: true,
          highlights: { swap: [2, 5], sorted: [0, 1] },
          pointers: [{ i: 2, label: 'i', tone: 'cyan' }],
          brackets: [
            { from: 0, to: 2, label: 'sorted', tone: 'green' },
            { from: 3, to: 5, label: 'still unsorted', tone: 'amber' }
          ],
          note: '3 came from the far right and locked index 2.'
        }),
        7,
        { i: 2, min: 5, 'sorted cells': 3 }
      ),
      step(
        bi('Round 4 — nothing to swap', 'চক্র ৪ — কিছু করারই নেই'),
        bi(
          '`i = 3`. The cells from here on are `5, 9, 8`.\n\nThe smallest of them is **5**, and it already sits at index 3. So `min = i`, and the swap becomes `arr[3] <-> arr[3]` — nothing moves.\n\n> The array stays **`[1, 2, 3, 5, 9, 8]`**. Selection sort still scans the whole tail; it does not get lazy.',
          '`i = 3`। এখান থেকে শুরু হলো `5, 9, 8`।\n\nসবচেয়ে ছোটটা **5**, আর ওটা আগে থেকেই ইনডেক্স ৩-এ বসে আছে। তাই `min = i`, আর সোয়াপ হয়ে গেল `arr[3] <-> arr[3]` — কিছুই নড়ে না।\n\n> অ্যারে থাকল **`[1, 2, 3, 5, 9, 8]`**। সিলেকশন সর্ট তবুও পুরো লেজ ঘাটে — এ কোনোদিন আলসেমি করে না।'
        ),
        scene({
          kind: 'array',
          label: 'min = i → the swap does nothing',
          cells: [1, 2, 3, 5, 9, 8],
          showIndex: true,
          highlights: { sorted: [0, 1, 2, 3], compare: [4, 5] },
          pointers: [{ i: 3, label: 'i = min', tone: 'green' }],
          brackets: [
            { from: 0, to: 3, label: 'sorted', tone: 'green' },
            { from: 4, to: 5, label: 'scan', tone: 'amber' }
          ],
          note: '5 beats 9 and 8, so index 4 is already correct.'
        }),
        7,
        { i: 3, min: 3, swapped: false, 'sorted cells': 4 }
      ),
      step(
        bi('Round 5 — the last swap', 'চক্র ৫ — শেষ সোয়াপ'),
        bi(
          '`i = 4`. Only `9` and `8` are left to compare, and **8** is smaller (index 5).\n\nSwap index 4 with index 5 → **`[1, 2, 3, 5, 8, 9]`**.\n\nThe very last cell is now correct too — it never needs a round of its own.',
          '`i = 4`। শুধু `9` আর `8` বাকি, আর **8** ছোট (ইনডেক্স ৫)।\n\nইনডেক্স ৪ আর ৫ সোয়াপ → **`[1, 2, 3, 5, 8, 9]`**।\n\nশেষ ঘরটাও এখন ঠিক জায়গায় — এর আলাদা কোনো চক্র লাগে না।'
        ),
        scene({
          kind: 'array',
          label: 'swap(4, 5) → [1, 2, 3, 5, 8, 9]',
          cells: [1, 2, 3, 5, 8, 9],
          showIndex: true,
          highlights: { swap: [4, 5], sorted: [0, 1, 2, 3] },
          pointers: [{ i: 4, label: 'i', tone: 'cyan' }],
          brackets: [{ from: 0, to: 5, label: 'all sorted', tone: 'green' }],
          note: 'Round 5 finishes the job.',
          caption: '[1, 2, 3, 5, 8, 9] ✓'
        }),
        7,
        { i: 4, min: 5, 'sorted cells': 6 }
      ),
      step(
        bi('Watch the shape', 'আকৃতিটা দেখো'),
        bi(
          'Drawn as bars, the values climb like a staircase.\n\nFor six numbers this run used **4 swaps** (round 4 needed none) and `5 + 4 + 3 + 2 + 1 = 15` comparisons.\n\n> Very few swaps, quite a few comparisons. That is the trade of selection sort.',
          'বার হিসেবে দিলে মানগুলো ধাপের মতো ওঠে।\n\n৬টা সংখ্যায় এই রানে **৪টা সোয়াপ** হলো (চক্র ৪-তে লাগেনি) আর `5 + 4 + 3 + 2 + 1 = ১৫` বার তুলনা।\n\n> সোয়াপ খুব কম, তুলনা অনেক বেশি। এটাই সিলেকশন সর্টের লেনদেন।'
        ),
        scene({
          kind: 'bars',
          label: 'final shape — sorted low to high',
          cells: [1, 2, 3, 5, 8, 9],
          highlights: { sorted: [0, 1, 2, 3, 4, 5] },
          note: 'The bars climb evenly: 1 → 2 → 3 → 5 → 8 → 9.',
          caption: 'at most n - 1 = 5 swaps',
          legend: [{ label: 'locked in place', color: 'var(--green)' }]
        }),
        2,
        { swaps: 4, comparisons: 15, n: 6 }
      ),
      step(
        bi('Why it is O(n²)', 'কেন O(n²)'),
        bi(
          'The inner loop scans a little less each round:\n\n- round 0 → 5 comparisons\n- round 1 → 4 comparisons\n- … round 4 → 1 comparison\n\nTotal = `5 + 4 + 3 + 2 + 1 = 15`. In general that is about `n² / 2`.\n\nFor `n = 1000` that is roughly **500,000** comparisons. The work grows with the **square** of `n` → `O(n²)`.',
          'ভেতরের লুপ প্রতি চক্রে একটু কম ঘাটে:\n\n- চক্র ০ → ৫ বার তুলনা\n- চক্র ১ → ৪ বার\n- … চক্র ৪ → ১ বার\n\nমোট = `5 + 4 + 3 + 2 + 1 = ১৫`। সাধারণ ভাবে এটা প্রায় `n² / 2`।\n\n`n = 1000` হলে প্রায় **৫ লাখ** বার তুলনা। খরচ `n`-এর **বর্গের** সঙ্গে বাড়ে → `O(n²)`।'
        ),
        scene({
          kind: 'chart',
          label: 'comparisons ≈ n(n-1)/2',
          unit: '',
          max: 4950,
          items: [
            { label: 'n=6', v: 15, color: 'linear-gradient(180deg,#34d399,#059669)' },
            { label: 'n=20', v: 190, color: 'linear-gradient(180deg,#22d3ee,#0891b2)' },
            { label: 'n=50', v: 1225, color: 'linear-gradient(180deg,#fbbf24,#d97706)' },
            { label: 'n=100', v: 4950, color: 'linear-gradient(180deg,#f87171,#dc2626)' }
          ],
          note: 'Double the input and the work becomes about four times bigger.',
          legend: [{ label: 'comparisons', color: 'var(--cyan)' }]
        }),
        4,
        { comparisons: '≈ n²/2', 'n=1000': 499500 }
      ),
      step(
        bi('When selection sort is still fine', 'কখন সিলেকশন সর্ট চলে'),
        bi(
          '**Good for**\n- tiny lists of a handful of items,\n- tight memory — space is `O(1)`,\n- expensive writes (flash memory): never more than `n - 1` swaps.\n\n**Bad for** big data. 10,000 items → about 50,000,000 comparisons.\n\n> Time `O(n²)` in every case, space `O(1)`. Simple, predictable, slow on large input.',
          '**ভালো লাগে**\n- কয়েকটা আইটেমের খুব ছোট তালিকায়,\n- কম মেমরিতে — স্পেস `O(1)`,\n- যখন লেখা-পড়া খরচি (ফ্ল্যাশ মেমরি): সোয়াপ (swap) সবসময় `n - 1` বারের বেশি নয়।\n\n**খারাপ** বড় ডেটায়। ১০,০০০ আইটেম → প্রায় ৫ কোটি বার তুলনা।\n\n> সময় সবক্ষেত্রে `O(n²)`, স্পেস `O(1)`। সহজ, অনুমানযোগ্য, কিন্তু বড় ডেটায় ধীর।'
        ),
        scene({
          kind: 'cards',
          label: 'Selection sort at a glance',
          cards: [
            { icon: '🐢', title: 'Always O(n²)', desc: 'it scans the whole tail every round', state: 'bad', tag: 'time', accent: 'var(--red)' },
            { icon: '🔁', title: 'Only n-1 swaps', desc: 'great when writing data costs a lot', state: 'ok', tag: 'writes', accent: 'var(--green)' },
            { icon: '🧠', title: 'Space O(1)', desc: 'just i, j and min variables', state: 'ok', tag: 'memory', accent: 'var(--cyan)' },
            { icon: '🐣', title: 'Tiny lists', desc: 'handy for a handful of items', state: 'active', tag: 'use it', accent: 'var(--yellow)' }
          ],
          caption: 'Next lesson in the sidebar: Bubble Sort'
        }),
        0,
        { time: 'O(n²)', space: 'O(1)' }
      )
    ]
  },

  /* ─────────────────────────────  2 · BUBBLE SORT  ───────────────────────────── */
  {
    id: 'bubble-sort',
    name: bi('Bubble Sort', 'বাবল সর্ট'),
    description: bi('Swap neighbours until the whole row is sorted', 'পুরো সারি সাজানো না পর্যন্ত পাশাপাশি সোয়াপ'),
    categoryKey: 'sorting',
    level: 'beginner',
    order: 20,
    icon: '🫧',
    complexity: {
      time: 'O(n²)',
      best: 'O(n)',
      worst: 'O(n²)',
      space: 'O(1)',
      note: bi(
        'A pass with no swap means "already sorted" — that early exit makes it O(n) on sorted data.',
        'একটাও সোয়াপ না হলেই বোঝা যায় আগে থেকেই সাজানো — এই আগে থেকে থামাই সাজানো ডেটায় O(n) করে দেয়।'
      )
    },
    code: {
      en: [
        'bubbleSort(arr):',
        '  n = length(arr)',
        '  for pass = 0 to n - 2:',
        '    swapped = false',
        '    for j = 0 to n - pass - 2:',
        '      if arr[j] > arr[j + 1]:',
        '        swap(arr, j, j + 1)      // the bigger one floats right',
        '        swapped = true',
        '    if not swapped: break        // already sorted — stop early'
      ],
      bn: [
        'bubbleSort(arr):',
        '  n = length(arr)',
        '  for pass = 0 to n - 2:',
        '    swapped = false',
        '    for j = 0 to n - pass - 2:',
        '      if arr[j] > arr[j + 1]:',
        '        swap(arr, j, j + 1)      // বড়টা ডানে ভেসে যায়',
        '        swapped = true',
        '    if not swapped: break        // আগে থেকেই সাজানো — থেমে যাও'
      ]
    },
    steps: [
      step(
        bi('Line up by height, two at a time', 'উচ্চতা ধরে সাজানো, একসাথে দুটো'),
        bi(
          'Picture six kids standing in a random line. You only ever compare **two neighbours**.\n\nIf the left one is taller, they **swap**. Then you step one place right and check again.\n\nAfter one full walk the tallest kid has floated to the right end — like a bubble rising. That is **bubble sort**.',
          'ধরো ছয়টা ছেলেমেয়ে এলোমেলো লাইনে দাঁড়িয়ে আছে। তুমি শুধু **দুইজন পাশের** লোককে তুলনা করো।\n\nবামেরটা বড় হলে তারা **সোয়াপ** করে। তারপর এক ধাপ ডানে সরে আবার দেখো।\n\nএক রাউন্ড হাঁটলেই সবচেয়ে লম্বাটা ডানে ভেসে ওঠে — বুদবুদ উপরে ওঠার মতো। এটাই **বাবল সর্ট**।'
        ),
        scene({
          kind: 'cards',
          label: 'Two neighbours at a time',
          cards: [
            { icon: '🧍', title: 'Compare neighbours', desc: 'only arr[j] and arr[j+1]', state: 'active', tag: 'compare', accent: 'var(--cyan)' },
            { icon: '🔁', title: 'Swap if out of order', desc: 'the bigger value moves right', state: 'active', tag: 'swap', accent: 'var(--amber)' },
            { icon: '🫧', title: 'Biggest bubbles to the end', desc: 'after one full pass', state: 'ok', tag: 'one pass', accent: 'var(--green)' }
          ],
          caption: 'nums = [5, 3, 8, 1, 9, 2]'
        }),
        0,
        { n: 6, pass: 0 }
      ),
      step(
        bi('The rule of one pass', 'এক পাসের নিয়ম'),
        bi(
          'One **pass** walks `j = 0 … 4` and compares each pair:\n\n`(5,3) (3,8) (8,1) (1,9) (9,2)`\n\nThe whole algorithm is one line: **if `arr[j] > arr[j+1]`, swap them**.\n\n> When the pass ends, the largest value **must** sit at index 5. It cannot float any further right.',
          'এক **পাস (pass)**-এ `j = 0 … 4` পর্যন্ত হাঁটে আর প্রতিটি জোড়া দেখে:\n\n`(5,3) (3,8) (8,1) (1,9) (9,2)`\n\nপুরো অ্যালগরিদম এক লাইন: **যদি `arr[j] > arr[j+1]` হয়, ওদের সোয়াপ করো**।\n\n> পাস শেষ হলে সবচেয়ে বড় মানটা অবশ্যই ইনডেক্স ৫-এ থাকবে। আর ডানে যাওয়ার জায়গা থাকবে না।'
        ),
        scene({
          kind: 'array',
          label: 'pass 0 — compare (arr[j], arr[j+1])',
          cells: [5, 3, 8, 1, 9, 2],
          showIndex: true,
          highlights: { compare: [0, 1] },
          pointers: [
            { i: 0, label: 'j', tone: 'cyan' },
            { i: 1, label: 'j+1', tone: 'amber' }
          ],
          brackets: [
            { from: 0, to: 4, label: 'compare neighbours here', tone: 'amber' },
            { from: 5, to: 5, label: '9 will land here', tone: 'green' }
          ],
          note: 'One pair at a time — never three cells at once.',
          legend: [
            { label: 'arr[j]', color: 'var(--cyan)' },
            { label: 'arr[j+1]', color: 'var(--amber)' }
          ]
        }),
        5,
        { pass: 0, j: 0 }
      ),
      step(
        bi('Pass 1 — the first swap', 'পাস ১ — প্রথম সোয়াপ'),
        bi(
          '`5 > 3`, so they swap → **`[3, 5, 8, 1, 9, 2]`**.\n\n`j` steps right. The next pair is `(5, 8)` — already in order, so nothing happens.\n\nBubble sort is patient: it only swaps when it must.',
          '`5 > 3`, তাই সোয়াপ → **`[3, 5, 8, 1, 9, 2]`**।\n\n`j` ডানে সরে। পরের জোড়া `(5, 8)` — আগে থেকেই ঠিক, তাই কিছুই হয় না।\n\nবাবল সর্ট ধৈর্যশীল: দরকার হলেই সোয়াপ করে।'
        ),
        scene({
          kind: 'array',
          label: 'swap(0, 1) → [3, 5, 8, 1, 9, 2]',
          cells: [3, 5, 8, 1, 9, 2],
          showIndex: true,
          highlights: { swap: [0, 1] },
          pointers: [
            { i: 0, label: 'j', tone: 'cyan' },
            { i: 1, label: 'j+1', tone: 'amber' }
          ],
          note: '5 floated one step to the right.',
          caption: '1 swap done · j moves on'
        }),
        6,
        { pass: 0, j: 0, swapped: true }
      ),
      step(
        bi('Pass 1 keeps walking', 'পাস ১ চলতেই থাকে'),
        bi(
          '`j = 2` gives the pair `(8, 1)` and **8 > 1**, so they swap → **`[3, 5, 1, 8, 9, 2]`**.\n\nThen `(8, 9)` is already correct — no swap. The pass continues with the pair `(9, 2)`.',
          '`j = 2` মিলল জোড়া `(8, 1)`, আর **8 > 1**, তাই সোয়াপ → **`[3, 5, 1, 8, 9, 2]`**।\n\nএরপর `(8, 9)` আগে থেকেই ঠিক — সোয়াপ নেই। পাস এগিয়ে যায় জোড়া `(9, 2)`-তে।'
        ),
        scene({
          kind: 'array',
          label: 'swap(2, 3) → [3, 5, 1, 8, 9, 2]',
          cells: [3, 5, 1, 8, 9, 2],
          showIndex: true,
          highlights: { swap: [2, 3] },
          pointers: [
            { i: 2, label: 'j', tone: 'cyan' },
            { i: 3, label: 'j+1', tone: 'amber' }
          ],
          note: '8 sank one place right. Two swaps have happened in this pass.'
        }),
        6,
        { pass: 0, j: 2, swapped: true }
      ),
      step(
        bi('End of pass 1 — 9 is home', 'পাস ১ শেষ — ৯ বাড়ি ফেরল'),
        bi(
          'The last pair of the pass is `(9, 2)` and **9 > 2** → swap → **`[3, 5, 1, 8, 2, 9]`**.\n\nThe pass is over. **9**, the largest value, is locked at index 5 and will never be compared again.\n\n> One pass = one more cell in its final place.',
          'পাসের শেষ জোড়া `(9, 2)`, আর **9 > 2** → সোয়াপ → **`[3, 5, 1, 8, 2, 9]`**।\n\nপাস শেষ। সবচেয়ে বড় মান **9** ইনডেক্স ৫-এ লক হয়ে গেল, আর একে আর তুলনা করা হবে না।\n\n> এক পাস = আরেক ঘর চূড়ান্ত জায়গায়।'
        ),
        scene({
          kind: 'bars',
          label: 'pass 1 finished — the tallest bar reached the end',
          cells: [3, 5, 1, 8, 2, 9],
          showIndex: true,
          highlights: { swap: [4, 5], sorted: [5] },
          pointers: [{ i: 4, label: 'j', tone: 'cyan' }],
          note: '9 floated all the way right, like a bubble.',
          caption: '[3, 5, 1, 8, 2, 9] · 3 swaps in pass 1',
          legend: [{ label: 'locked', color: 'var(--green)' }]
        }),
        6,
        { pass: 0, j: 4, swapped: true, 'sorted cells': 1 }
      ),
      step(
        bi('Pass 2 — two more swaps', 'পাস ২ — আর দুটা সোয়াপ'),
        bi(
          'Now only indexes 0 … 4 are live.\n\n- `(3, 5)` → ok\n- `(5, 1)` → swap\n- `(5, 8)` → ok\n- `(8, 2)` → swap\n\nArray: **`[3, 1, 5, 2, 8, 9]`**. The value **8** is now locked at index 4.',
          'এখন শুধু ইনডেক্স ০ … ৪ জীবন্ত।\n\n- `(3, 5)` → ঠিক আছে\n- `(5, 1)` → সোয়াপ\n- `(5, 8)` → ঠিক আছে\n- `(8, 2)` → সোয়াপ\n\nঅ্যারে: **`[3, 1, 5, 2, 8, 9]`**। মান **8** এখন ইনডেক্স ৪-এ লক।'
        ),
        scene({
          kind: 'array',
          label: 'pass 2 finished → [3, 1, 5, 2, 8, 9]',
          cells: [3, 1, 5, 2, 8, 9],
          showIndex: true,
          highlights: { swap: [3, 4], sorted: [4, 5] },
          pointers: [
            { i: 3, label: 'j', tone: 'cyan' },
            { i: 4, label: 'j+1', tone: 'amber' }
          ],
          brackets: [{ from: 4, to: 5, label: 'locked', tone: 'green' }],
          note: '8 joined 9 on the right — two cells are safe now.'
        }),
        6,
        { pass: 1, j: 3, swapped: true, 'sorted cells': 2 }
      ),
      step(
        bi('Pass 3 — the row calms down', 'পাস ৩ — সারিটা শান্ত হচ্ছে'),
        bi(
          'Live range is now indexes 0 … 3.\n\n- `(3, 1)` → swap\n- `(3, 5)` → ok\n- `(5, 2)` → swap\n\nArray: **`[1, 3, 2, 5, 8, 9]`**. The value **5** is locked at index 3, and the right half already looks sorted.',
          'এখন জীবন্ত অংশ ইনডেক্স ০ … ৩।\n\n- `(3, 1)` → সোয়াপ\n- `(3, 5)` → ঠিক আছে\n- `(5, 2)` → সোয়াপ\n\nঅ্যারে: **`[1, 3, 2, 5, 8, 9]`**। মান **5** ইনডেক্স ৩-এ লক, আর ডান দিকটা দেখলেই সাজানো মনে হচ্ছে।'
        ),
        scene({
          kind: 'array',
          label: 'pass 3 finished → [1, 3, 2, 5, 8, 9]',
          cells: [1, 3, 2, 5, 8, 9],
          showIndex: true,
          highlights: { swap: [2, 3], sorted: [3, 4, 5] },
          pointers: [{ i: 2, label: 'j', tone: 'cyan' }],
          brackets: [{ from: 3, to: 5, label: 'locked', tone: 'green' }],
          note: '5 landed next to 8 and 9. Only indexes 0…3 can still move.'
        }),
        6,
        { pass: 2, j: 2, swapped: true, 'sorted cells': 3 }
      ),
      step(
        bi('Pass 4 — almost there', 'পাস ৪ — প্রায় শেষ'),
        bi(
          'Pass 4 compares only two pairs:\n\n- `(1, 3)` → ok\n- `(3, 2)` → swap\n\nArray: **`[1, 2, 3, 5, 8, 9]`**. The values 1 and 2 switched places, and now the whole row looks sorted.',
          'পাস ৪-এ মাত্র দুটো জোড়া দেখা হয়:\n\n- `(1, 3)` → ঠিক আছে\n- `(3, 2)` → সোয়াপ\n\nঅ্যারে: **`[1, 2, 3, 5, 8, 9]`**। মান ১ আর ২ জায়গা বদলাল, আর এখন পুরো সারিটা সাজানো মনে হচ্ছে।'
        ),
        scene({
          kind: 'array',
          label: 'pass 4 finished → [1, 2, 3, 5, 8, 9]',
          cells: [1, 2, 3, 5, 8, 9],
          showIndex: true,
          highlights: { swap: [1, 2], sorted: [2, 3, 4, 5] },
          pointers: [
            { i: 1, label: 'j', tone: 'cyan' },
            { i: 2, label: 'j+1', tone: 'amber' }
          ],
          brackets: [{ from: 2, to: 5, label: 'locked', tone: 'green' }],
          note: 'Three cells plus the swap = the row looks finished.'
        }),
        6,
        { pass: 3, j: 1, swapped: true, 'sorted cells': 4 }
      ),
      step(
        bi('Pass 5 — zero swaps, so stop', 'পাস ৫ — একটাও সোয়াপ নেই, তাই থামো'),
        bi(
          'The last pass checks the only open pair `(1, 2)` — already in order, so `swapped` stays `false`.\n\nThe check `if not swapped: break` fires and the loops end early.\n\n> A full pass with **no swap** proves the row is sorted. That is why bubble sort finishes fast on data that is already sorted.',
          'শেষ পাসে একমাত্র খোলা জোড়া `(1, 2)` দেখা হয় — আগে থেকেই ঠিক, তাই `swapped` থাকে `false`।\n\n`if not swapped: break` চেকটা কাজ করে, আর লুপ আগেই বন্ধ হয়ে যায়।\n\n> **কোনো সোয়াপ না** হওয়া এক পাস মানে সারি সাজানো। তাই আগে থেকেই সাজানো ডেটায় বাবল সর্ট দ্রুত শেষ করে।'
        ),
        scene({
          kind: 'bars',
          label: 'no swap in the whole pass → break',
          cells: [1, 2, 3, 5, 8, 9],
          showIndex: true,
          highlights: { sorted: [0, 1, 2, 3, 4, 5] },
          note: 'Every bar sits in order, so the early exit kicks in.',
          caption: 'swapped = false → break',
          legend: [{ label: 'sorted', color: 'var(--green)' }]
        }),
        8,
        { pass: 4, swapped: false, 'sorted cells': 6 }
      ),
      step(
        bi('Why it is O(n²)', 'কেন O(n²)'),
        bi(
          'Without the early exit, the pairs add up:\n\n`5 + 4 + 3 + 2 + 1 = 15` for `n = 6`, and about `n² / 2` in general.\n\nFor `n = 100` that is **4,950** comparisons. But on sorted data the first pass finds no swap and stops after **99** comparisons.\n\n> Same algorithm, two very different costs: `O(n²)` and `O(n)`.',
          'আগে থাকে বন্ধ না করলে জোড়াগুলো যোগ হয়ে যায়:\n\n`n = 6` হলে `5 + 4 + 3 + 2 + 1 = ১৫`, আর সাধারণে প্রায় `n² / 2`।\n\n`n = 100` হলে **৪,৯৫০** বার তুলনা। কিন্তু সাজানো ডেটায় প্রথম পাসেই কোনো সোয়াপ না পেয়ে থেমে যায় — মাত্র **৯৯** বার তুলনা।\n\n> একই অ্যালগরিদম, দুই রকম খরচ: `O(n²)` আর `O(n)`।'
        ),
        scene({
          kind: 'chart',
          label: 'comparisons for n = 100',
          unit: '',
          max: 4950,
          items: [
            { label: 'already sorted', v: 99, color: 'linear-gradient(180deg,#34d399,#059669)' },
            { label: 'random order', v: 4950, color: 'linear-gradient(180deg,#f87171,#dc2626)' }
          ],
          note: 'The early exit turns O(n²) into O(n) when the data is nearly sorted.',
          legend: [{ label: 'comparisons', color: 'var(--cyan)' }]
        }),
        5,
        { comparisons: '≈ n²/2', 'best O(n)': 'early exit' }
      ),
      step(
        bi('When bubble sort is fine', 'কখন বাবল সর্ট চলে'),
        bi(
          '**Good for**\n- teaching — the rule fits in one line,\n- tiny lists,\n- data that is **almost sorted**, thanks to the early exit,\n- it never changes the order of equal values (**stable**).\n\n**Bad for** big random data: 10,000 items → about 50,000,000 comparisons.\n\n> Time `O(n²)` worst, `O(n)` best, space `O(1)`. Reach for merge or quick sort on large input.',
          '**ভালো লাগে**\n- শেখার জন্য — নিয়মটা এক লাইনে বলা যায়,\n- ছোট তালিকায়,\n- **প্রায় সাজানো** ডেটায়, আগে থেকে থামার কারণে,\n- সমান মানগুলোর অবস্থান বদলায় না (**stable**)।\n\n**খারাপ** বড় এলোমেলো ডেটায়: ১০,০০০ আইটেম → প্রায় ৫ কোটি বার তুলনা।\n\n> সময় খারাপ কেসে `O(n²)`, ভালো কেসে `O(n)`, স্পেস `O(1)`। বড় ডেটায় মার্জ বা কুইক সর্ট নাও।'
        ),
        scene({
          kind: 'cards',
          label: 'Bubble sort in one screen',
          cards: [
            { icon: '🫧', title: 'Swap neighbours', desc: 'if arr[j] > arr[j+1], swap them', state: 'active', tag: 'rule', accent: 'var(--cyan)' },
            { icon: '🍀', title: 'Best O(n)', desc: 'early exit on sorted data', state: 'ok', tag: 'lucky case', accent: 'var(--green)' },
            { icon: '🌪️', title: 'Worst O(n²)', desc: 'big random lists crawl', state: 'bad', tag: 'slow', accent: 'var(--red)' },
            { icon: '⚖️', title: 'Stable + O(1)', desc: 'equal values keep order, no extra array', state: 'ok', tag: 'memory', accent: 'var(--purple)' }
          ],
          caption: 'Next lesson in the sidebar: Insertion Sort'
        }),
        0,
        { time: 'O(n²)', best: 'O(n)', space: 'O(1)' }
      )
    ]
  },

  /* ─────────────────────────────  3 · INSERTION SORT  ───────────────────────────── */
  {
    id: 'insertion-sort',
    name: bi('Insertion Sort', 'ইনসারশন সর্ট'),
    description: bi('Build the sorted part one card at a time', 'এক এক কার্ড করে সাজানো অংশ বানাও'),
    categoryKey: 'sorting',
    level: 'beginner',
    order: 30,
    icon: '🃏',
    complexity: {
      time: 'O(n²)',
      best: 'O(n)',
      worst: 'O(n²)',
      space: 'O(1)',
      note: bi(
        'Nearly sorted data costs only about n comparisons — that is the O(n) best case. It is stable and in place.',
        'প্রায় সাজানো ডেটায় মাত্র n বার তুলনা লাগে — এটাই O(n) সেরা কেস। stable এবং নিজের জায়গাতেই (in place) কাজ করে।'
      )
    },
    code: {
      en: [
        'insertionSort(arr):',
        '  for i = 1 to n - 1:',
        '    key = arr[i]                // the card we are holding',
        '    j = i - 1',
        '    while j >= 0 and arr[j] > key:',
        '      arr[j + 1] = arr[j]       // shift the bigger value right',
        '      j = j - 1',
        '    arr[j + 1] = key            // drop it into the gap'
      ],
      bn: [
        'insertionSort(arr):',
        '  for i = 1 to n - 1:',
        '    key = arr[i]                // হাতে যে কার্ডটা আছে',
        '    j = i - 1',
        '    while j >= 0 and arr[j] > key:',
        '      arr[j + 1] = arr[j]       // বড় মানটাকে ডানে সরাও',
        '      j = j - 1',
        '    arr[j + 1] = key            // খালি ঘরে বসাও'
      ]
    },
    steps: [
      step(
        bi('Sorting a hand of cards', 'হাতের কার্ড সাজানো'),
        bi(
          'You hold a hand of playing cards in random order.\n\nYou take **one card at a time** and slide it into the cards on your left. The bigger cards shift right to make room.\n\nThat is **insertion sort**: grow the sorted part from the left, one card per round.',
          'তুমি এলোমেলো ক্রমে কিছু কার্ড হাতে ধরে আছো।\n\n**এক এক কার্ড** করে বের করে বাম পাশের সাজানো কার্ডগুলোর মধ্যে ঢোকাও। বড় কার্ডগুলো জায়গা দিতে ডানে সরে যায়।\n\nএটাই **ইনসারশন সর্ট (insertion sort)**: বাম দিক থেকে সাজানো অংশ বাড়ে, প্রতি চক্রে একটা কার্ড।'
        ),
        scene({
          kind: 'cards',
          label: 'Hold one card, slide it in',
          cards: [
            { icon: '🃏', title: 'Pick the next card', desc: 'key = arr[i], taken out of the row', state: 'active', tag: 'key', accent: 'var(--yellow)' },
            { icon: '➡️', title: 'Shift bigger cards right', desc: 'they move to open the gap', state: 'active', tag: 'shift', accent: 'var(--cyan)' },
            { icon: '📥', title: 'Drop it into the gap', desc: 'the sorted part grows by one', state: 'ok', tag: 'insert', accent: 'var(--green)' }
          ],
          caption: 'nums = [5, 3, 8, 1, 9, 2]'
        }),
        0,
        { i: 1, n: 6 }
      ),
      step(
        bi('The rule of the algorithm', 'অ্যালগরিদমের নিয়ম'),
        bi(
          'Start with just the first cell — one item is always sorted.\n\nThen for each `i` from 1 to 5:\n\n- save `key = arr[i]`\n- walk left while `arr[j] > key`, shifting each value one step right\n- drop `key` into the free gap\n\n> The green zone is **sorted**. It grows by one cell every round.',
          'শুরু শুধু প্রথম ঘর দিয়ে — একটা আইটেম সবসময়ই সাজানো।\n\nএরপর ১ থেকে ৫ পর্যন্ত প্রতিটি `i`-এর জন্য:\n\n- `key = arr[i]` রেখে দাও\n- `arr[j] > key` হওয়া পর্যন্ত বামে হাঁটো, প্রতিটি মান ডানে এক ধাপ সরান\n- `key` খালি ঘরে বসাও\n\n> সবুজ অংশটাই **সাজানো**। প্রতি চক্রে এক ঘর বাড়ে।'
        ),
        scene({
          kind: 'array',
          label: 'start: only arr[0] is sorted',
          cells: [5, 3, 8, 1, 9, 2],
          showIndex: true,
          highlights: { active: [1] },
          pointers: [{ i: 1, label: 'i', tone: 'cyan' }],
          brackets: [
            { from: 0, to: 0, label: 'sorted', tone: 'green' },
            { from: 1, to: 5, label: 'to insert', tone: 'amber' }
          ],
          note: 'First card to handle: key = arr[1] = 3.'
        }),
        1,
        { i: 1, key: 3, j: 0 }
      ),
      step(
        bi('Insert 3 — one shift', '৩ ঢোকাও — একটা সরানো'),
        bi(
          '`key = 3`. Look left: **3 < 5**, so 5 slides one step right.\n\nThe gap opens at index 0, and **3** drops in → **`[3, 5, 8, 1, 9, 2]`**.\n\nTwo cells are sorted now: `3, 5`.',
          '`key = 3`। বামে দেখো: **3 < 5**, তাই ৫ এক ধাপ ডানে সরল।\n\nইনডেক্স ০-এ ঘর খুলল, আর **3** ঢুকে পড়ল → **`[3, 5, 8, 1, 9, 2]`**।\n\nএখন দুই ঘর সাজানো: `3, 5`।'
        ),
        scene({
          kind: 'array',
          label: 'key 3 inserted at index 0',
          cells: [3, 5, 8, 1, 9, 2],
          showIndex: true,
          highlights: { insert: [0], dim: [2, 3, 4, 5] },
          pointers: [{ i: 0, label: 'key', tone: 'green' }],
          brackets: [{ from: 0, to: 1, label: 'sorted', tone: 'green' }],
          note: '5 had to step aside so 3 could sit at the front.',
          caption: '[3, 5, 8, 1, 9, 2]'
        }),
        7,
        { i: 1, key: 3, shifted: 1, 'sorted cells': 2 }
      ),
      step(
        bi('Insert 8 — no shift needed', '৮ ঢোকাও — কিছু সরানো লাগে না'),
        bi(
          '`key = 8`. Look left: **8 > 5**.\n\nThe sorted cards are all smaller, so nothing moves. Array stays **`[3, 5, 8, 1, 9, 2]`** with three sorted cells.\n\n> When the new card is the biggest so far, insertion sort does **no work at all**.',
          '`key = 8`। বামে দেখো: **8 > 5**।\n\nসাজানো কার্ডগুলো সবই ছোট, তাই কিছু নড়ে না। অ্যারে থাকল **`[3, 5, 8, 1, 9, 2]`**, তিন ঘর সাজানো।\n\n> নতুন কার্ডটা এখন পর্যন্ত সবচেয়ে বড় হলে ইনসারশন সর্ট **একদমই কাজ করে না**।'
        ),
        scene({
          kind: 'array',
          label: 'key = 8 ≥ 5 → nothing to shift',
          cells: [3, 5, 8, 1, 9, 2],
          showIndex: true,
          highlights: { compare: [1, 2] },
          pointers: [{ i: 2, label: 'i', tone: 'cyan' }],
          brackets: [{ from: 0, to: 1, label: 'sorted', tone: 'green' }],
          note: 'The compare fails immediately, so 8 stays where it is.',
          caption: '0 shifts this round'
        }),
        4,
        { i: 2, key: 8, shifted: 0 }
      ),
      step(
        bi('Insert 1 — walk all the way left', '১ ঢোকাও — একেবারে বামের দিকে'),
        bi(
          '`key = 1` at index 3. Compare it with the cells on its left, one by one:\n\n- `1 < 8` → shift 8 right\n- `1 < 5` → shift 5 right\n- `1 < 3` → shift 3 right\n- `j` becomes -1 → stop\n\n> The gap keeps moving left until it finds a value **smaller than 1**, or the start of the array.',
          'ইনডেক্স ৩-এ `key = 1`। একে একে বামের ঘরগুলোর সঙ্গে তুলনা করো:\n\n- `1 < 8` → ৮ ডানে সরাও\n- `1 < 5` → ৫ ডানে সরাও\n- `1 < 3` → ৩ ডানে সরাও\n- `j` হয়ে গেল -1 → থামো\n\n> ঘরটা বামে বামে সরতে থাকে যতক্ষণ না **১-এর ছোট** কোনো মান বা অ্যারের শুরু পাওয়া যায়।'
        ),
        scene({
          kind: 'array',
          label: 'key = 1 · three shifts are coming',
          cells: [5, 3, 8, 1, 9, 2],
          showIndex: true,
          highlights: { target: [3], dim: [4, 5] },
          pointers: [
            { i: 3, label: 'key', tone: 'green' },
            { i: 0, label: 'j stops here', tone: 'cyan' }
          ],
          brackets: [{ from: 0, to: 2, label: 'these all shift right', tone: 'amber' }],
          note: '1 is smaller than every card on its left — it belongs at index 0.',
          caption: 'key = 1 · 3 shifts'
        }),
        4,
        { i: 3, key: 1, j: 2 }
      ),
      step(
        bi('1 lands at index 0', '১ এসে বসলো ইনডেক্স ০-এ'),
        bi(
          'The three bigger values each moved one step right, and **1** dropped into index 0.\n\nArray: **`[1, 3, 5, 8, 9, 2]`** — the first four cells are sorted.\n\n> Four values were shifted, but not a single value was swapped. Insertion sort only slides.',
          'তিনটা বড় মান এক ধাপ করে ডানে সরল, আর **1** ইনডেক্স ০-এ এসে পড়ল।\n\nঅ্যারে: **`[1, 3, 5, 8, 9, 2]`** — প্রথম চার ঘর সাজানো।\n\n> চারটা মান সরেছে, কিন্তু একটাও সোয়াপ হয়নি। ইনসারশন সর্ট শুধু সরিয়ে বসায়।'
        ),
        scene({
          kind: 'array',
          label: 'after the shifts → [1, 3, 5, 8, 9, 2]',
          cells: [1, 3, 5, 8, 9, 2],
          showIndex: true,
          highlights: { insert: [0], sorted: [0, 1, 2, 3] },
          pointers: [{ i: 0, label: 'key', tone: 'green' }],
          brackets: [
            { from: 0, to: 3, label: 'sorted', tone: 'green' },
            { from: 4, to: 5, label: 'to insert', tone: 'amber' }
          ],
          note: 'The sorted zone now covers four cells.'
        }),
        7,
        { i: 3, key: 1, shifted: 3, 'sorted cells': 4 }
      ),
      step(
        bi('Insert 9 — it stays put', '৯ ঢোকাও — এটা নড়ে না'),
        bi(
          '`key = 9` at index 4. Compare left: **9 > 8**.\n\nNo shift at all, so the sorted zone grows to index 4. The array is still **`[1, 3, 5, 8, 9, 2]`**.\n\n> Only one card is left to place: the 2.',
          'ইনডেক্স ৪-এ `key = 9`। বামে তুলনা: **9 > 8**।\n\nকোনো সরানোই লাগল না, তাই সাজানো অংশ ইনডেক্স ৪ পর্যন্ত গেল। অ্যারে এখনো **`[1, 3, 5, 8, 9, 2]`**।\n\n> আর মাত্র একটা কার্ড বসানো বাকি: ২।'
        ),
        scene({
          kind: 'array',
          label: 'key = 9 ≥ 8 → no shift',
          cells: [1, 3, 5, 8, 9, 2],
          showIndex: true,
          highlights: { compare: [3, 4] },
          pointers: [{ i: 4, label: 'i', tone: 'cyan' }],
          brackets: [
            { from: 0, to: 3, label: 'sorted', tone: 'green' },
            { from: 4, to: 5, label: 'to insert', tone: 'amber' }
          ],
          note: '9 is already bigger than everything to its left.'
        }),
        4,
        { i: 4, key: 9, shifted: 0, 'sorted cells': 5 }
      ),
      step(
        bi('Insert 2 — four shifts', '২ ঢোকাও — চারটা সরানো'),
        bi(
          '`key = 2` at index 5. Walk left:\n\n- `2 < 9` → shift\n- `2 < 8` → shift\n- `2 < 5` → shift\n- `2 < 3` → shift\n- `2 > 1` → stop\n\n> The gap opens between 1 and 3, and 2 drops in. The comparisons stop the moment we meet a smaller value.',
          'ইনডেক্স ৫-এ `key = 2`। বামে হাঁটো:\n\n- `2 < 9` → সরান\n- `2 < 8` → সরান\n- `2 < 5` → সরান\n- `2 < 3` → সরান\n- `2 > 1` → থামো\n\n> ১ আর ৩-এর মাঝে ঘর খুলবে, আর ২ ঢুকে পড়বে। ছোট মান পাওয়া মাত্রই তুলনা থেমে যায়।'
        ),
        scene({
          kind: 'array',
          label: 'key = 2 · walking left through 9, 8, 5, 3',
          cells: [1, 3, 5, 8, 9, 2],
          showIndex: true,
          highlights: { compare: [4, 5] },
          pointers: [
            { i: 5, label: 'key', tone: 'green' },
            { i: 0, label: 'stop', tone: 'cyan' }
          ],
          brackets: [{ from: 0, to: 4, label: 'all bigger than 2', tone: 'amber' }],
          note: 'The card slides left until it meets the 1.',
          caption: 'key = 2 · 4 shifts'
        }),
        4,
        { i: 5, key: 2, j: 4 }
      ),
      step(
        bi('Fully sorted', 'একেবারে সাজানো'),
        bi(
          'The 2 landed at index 1 and the array is **`[1, 2, 3, 5, 8, 9]`**.\n\nEvery card was inserted exactly once, and the sorted zone grew from 1 cell to 6.\n\n> No swaps, no extra array — just sliding values into gaps.',
          '২ ইনডেক্স ১-এ গিয়ে বসল, আর অ্যারে হলো **`[1, 2, 3, 5, 8, 9]`**।\n\nপ্রতিটি কার্ড ঠিক একবার ঢোকানো হয়েছে, আর সাজানো অংশ ১ ঘর থেকে ৬ ঘর হয়েছে।\n\n> সোয়াপ নেই, অতিরিক্ত অ্যারে নেই — শুধু ঘরে ঘরে মান সরিয়ে বসানো।'
        ),
        scene({
          kind: 'bars',
          label: 'sorted — every card inserted',
          cells: [1, 2, 3, 5, 8, 9],
          showIndex: true,
          highlights: { sorted: [0, 1, 2, 3, 4, 5] },
          note: 'The bars rise steadily: 1 → 2 → 3 → 5 → 8 → 9.',
          caption: '[1, 2, 3, 5, 8, 9] ✓ · 0 swaps',
          legend: [{ label: 'inserted & sorted', color: 'var(--green)' }]
        }),
        7,
        { i: 5, key: 2, shifted: 4, 'sorted cells': 6 }
      ),
      step(
        bi('Best case O(n), worst case O(n²)', 'সেরা কেস O(n), খারাপ কেস O(n²)'),
        bi(
          'Count the comparisons for `n = 100`:\n\n- **already sorted** → each card is compared once with its left neighbour → **99** comparisons → `O(n)`.\n- **random order** → about `n² / 4` → **~2,500**.\n- **reversed order** → every card slides to the front → `n² / 2` → **4,950** → `O(n²)`.\n\n> This is why insertion sort is the favourite for data that is *nearly* sorted.',
          '`n = 100` ধরে তুলনার সংখ্যা দেখো:\n\n- **আগে থেকেই সাজানো** → প্রতিটি কার্ড বামেরটির সঙ্গে একবার মিলে → **৯৯** বার → `O(n)`।\n- **এলোমেলো** → প্রায় `n² / 4` → **~২,৫০০**।\n- **উল্টো ক্রম** → প্রতিটি কার্ড সামনের দিকে গড়িয়ে যায় → `n² / 2` → **৪,৯৫০** → `O(n²)`।\n\n> তাই *প্রায়* সাজানো ডেটায় ইনসারশন সর্ট সবার প্রিয়।'
        ),
        scene({
          kind: 'chart',
          label: 'comparisons for n = 100',
          unit: '',
          max: 4950,
          items: [
            { label: 'sorted', v: 99, color: 'linear-gradient(180deg,#34d399,#059669)' },
            { label: 'random', v: 2500, color: 'linear-gradient(180deg,#fbbf24,#d97706)' },
            { label: 'reversed', v: 4950, color: 'linear-gradient(180deg,#f87171,#dc2626)' }
          ],
          note: 'Same data size, 50× the work — the input order decides everything.',
          legend: [{ label: 'comparisons', color: 'var(--cyan)' }]
        }),
        1,
        { n: 100, 'best': 99, 'worst': 4950 }
      ),
      step(
        bi('Complexity and when to use it', 'জটিলতা আর কখন ব্যবহার করবে'),
        bi(
          '**Time**\n- best `O(n)` — nearly sorted data\n- average & worst `O(n²)` — random or reversed\n\n**Space** `O(1)` — it works inside the array.\n\n**Nice bonus**: it is **stable**, and big real-world sorts switch to it for small slices (that is why merge sort libraries use it under the hood).\n\n> Use it for tiny arrays, almost-sorted data, and as the final clean-up inside faster sorts.',
          '**সময়**\n- সেরা `O(n)` — প্রায় সাজানো ডেটা\n- গড় ও খারাপ `O(n²)` — এলোমেলো বা উল্টো ক্রম\n\n**স্পেস** `O(1)` — কাজ করে অ্যারের ভেতরেই।\n\n**আরও ভালো খবর**: এটা **stable**, আর বড় বাস্তব সর্ট ছোট অংশে এটাকেই ব্যবহার করে (এজন্যই মার্জ সর্ট লাইব্রেরির ভেতরে এটা চলে)।\n\n> ছোট অ্যারেতে, প্রায় সাজানো ডেটায়, আর দ্রুত সর্টের শেষ পরিষ্কার-পরিচ্ছন্নতায় এটাই ব্যবহার করো।'
        ),
        scene({
          kind: 'cards',
          label: 'Insertion sort at a glance',
          cards: [
            { icon: '🍀', title: 'Best O(n)', desc: 'already sorted → one compare per card', state: 'ok', tag: 'lucky', accent: 'var(--green)' },
            { icon: '🌪️', title: 'Worst O(n²)', desc: 'reversed data → everything slides', state: 'bad', tag: 'slow', accent: 'var(--red)' },
            { icon: '🧠', title: 'Space O(1) + stable', desc: 'in place, equal values keep order', state: 'ok', tag: 'memory', accent: 'var(--cyan)' },
            { icon: '🐣', title: 'Best for small data', desc: 'tiny or nearly sorted slices', state: 'active', tag: 'use it', accent: 'var(--yellow)' }
          ],
          caption: 'Next lesson in the sidebar: Merge Sort'
        }),
        0,
        { time: 'O(n²)', best: 'O(n)', space: 'O(1)' }
      )
    ]
  },

  /* ─────────────────────────────  4 · MERGE SORT  ───────────────────────────── */
  {
    id: 'merge-sort',
    name: bi('Merge Sort', 'মার্জ সর্ট'),
    description: bi('Split in half, sort the halves, merge them back', 'অর্ধেক করে ভাগ, অর্ধেক সাজিয়ে আবার জোড়া'),
    categoryKey: 'sorting',
    level: 'intermediate',
    order: 40,
    icon: '🧬',
    complexity: {
      time: 'O(n log n)',
      best: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)',
      note: bi(
        'Stable, and always O(n log n) — but merging needs an extra O(n) row of memory.',
        'stable, আর সবসময়ই O(n log n) — তবে মার্জ (merge) করতে O(n) বাড়তি মেমরি লাগে।'
      )
    },
    code: {
      en: [
        'mergeSort(arr, lo, hi):',
        '  if lo >= hi: return            // one cell is already sorted',
        '  mid = (lo + hi) / 2',
        '  mergeSort(arr, lo, mid)        // sort the left half',
        '  mergeSort(arr, mid + 1, hi)    // sort the right half',
        '  merge(arr, lo, mid, hi)        // join the two sorted halves',
        'merge(arr, lo, mid, hi):',
        '  copy left half into L, right half into R',
        '  i = 0, j = 0, k = lo',
        '  while i < len(L) and j < len(R):',
        '    if L[i] <= R[j]: arr[k] = L[i]; i = i + 1   // left wins → stable',
        '    else:            arr[k] = R[j]; j = j + 1',
        '    k = k + 1',
        '  copy any leftovers into arr'
      ],
      bn: [
        'mergeSort(arr, lo, hi):',
        '  if lo >= hi: return            // একটাই ঘর হলে আগে থেকেই সাজানো',
        '  mid = (lo + hi) / 2',
        '  mergeSort(arr, lo, mid)        // বাম অর্ধেক সাজাও',
        '  mergeSort(arr, mid + 1, hi)    // ডান অর্ধেক সাজাও',
        '  merge(arr, lo, mid, hi)        // দুই সাজানো অর্ধেক জোড়া দাও',
        'merge(arr, lo, mid, hi):',
        '  বাম অর্ধেক L-এ, ডান অর্ধেক R-এ কপি করো',
        '  i = 0, j = 0, k = lo',
        '  while i < len(L) and j < len(R):',
        '    if L[i] <= R[j]: arr[k] = L[i]; i = i + 1   // বামটা আগে নিলে stable থাকে',
        '    else:            arr[k] = R[j]; j = j + 1',
        '    k = k + 1',
        '  বাকি থাকা মানগুলো arr-তে কপি করো'
      ]
    },
    steps: [
      step(
        bi('Two sorted piles, one trick', 'দুটো সাজানো গাদা, একটা কৌশল'),
        bi(
          'Imagine two piles of exam papers, each pile already sorted.\n\nTo build one sorted pile you do only one thing: **look at both tops, take the smaller one, put it on the new pile.**\n\nRepeat until both piles are empty. Nothing ever needs re-checking.\n\n**Merge sort** first cuts the mess down to single papers, then joins them back with this exact trick.',
          'ধরো দুটো গাদা পরীক্ষার কাগজ, প্রতিটা গাদাই আগে থেকেই সাজানো।\n\nএকটাই সাজানো গাদা বানাতে হবে একটা কাজ: **দুই গাদার উপরেরটা দেখো, ছোটটা নাও, নতুন গাদায় বসাও।**\n\nদুটো গাদাই ফাঁকা না হওয়া পর্যন্ত এভাবেই চালাও। আর কিছুই আবার দেখতে হয় না।\n\n**মার্জ সর্ট (merge sort)** আগে এলোমেলো গাদাটাকে এক এক কাগজে ভাগ করে, তারপর ঠিক এই কৌশলে আবার জোড়া দেয়।'
        ),
        scene({
          kind: 'cards',
          label: 'Merging is the heart of it',
          cards: [
            { icon: '✂️', title: 'Split first', desc: 'cut the mess into single items', state: 'active', tag: 'divide', accent: 'var(--purple)' },
            { icon: '👉', title: 'Two fingers', desc: 'one on each sorted half', state: 'active', tag: 'compare', accent: 'var(--cyan)' },
            { icon: '📥', title: 'Take the smaller', desc: 'write it, move that finger', state: 'ok', tag: 'merge', accent: 'var(--green)' }
          ],
          caption: 'nums = [5, 3, 8, 1, 9, 2]'
        }),
        6,
        { lo: 0, hi: 5 }
      ),
      step(
        bi('Split the array in half', 'অ্যারেকে অর্ধেক করো'),
        bi(
          'Take `5, 3, 8, 1, 9, 2` and cut it down the middle:\n\n- left: `5, 3, 8`\n- right: `1, 9, 2`\n\nNothing is compared yet — splitting is free. We only compute `mid = (0 + 5) / 2 = 2`.\n\n> **Divide first, sort later.**',
          '`5, 3, 8, 1, 9, 2` নিয়ে মাঝ থেকে কেটে দাও:\n\n- বাম দিক: `5, 3, 8`\n- ডান দিক: `1, 9, 2`\n\nএখনো কোনো তুলনা হয়নি — ভাগ করা তো ফ্রি। শুধু `mid = (0 + 5) / 2 = 2` বের করলাম।\n\n> **আগে ভাগ, পরে সাজানো।**'
        ),
        scene({
          kind: 'array',
          label: 'first cut → mid = 2',
          cells: [5, 3, 8, 1, 9, 2],
          showIndex: true,
          highlights: { mark: [0, 1, 2] },
          pointers: [{ i: 2, label: 'mid', tone: 'green' }],
          brackets: [
            { from: 0, to: 2, label: 'left half', tone: 'cyan' },
            { from: 3, to: 5, label: 'right half', tone: 'purple' }
          ],
          note: 'Two pieces of three cells each. Still the same values, only cut apart.'
        }),
        2,
        { lo: 0, hi: 5, mid: 2 }
      ),
      step(
        bi('Split each half again', 'প্রতিটি অর্ধেক আবার ভাগ করো'),
        bi(
          'Each half is cut one more time:\n\n- `5, 3, 8` → `5` and `3, 8` (mid = 1)\n- `1, 9, 2` → `1` and `9, 2` (mid = 4)\n\nFour pieces now, still zero comparisons. Recursion keeps calling `mergeSort` on smaller and smaller ranges.',
          'প্রতিটি অর্ধেক আবার কাটা হলো:\n\n- `5, 3, 8` → `5` আর `3, 8` (mid = ১)\n- `1, 9, 2` → `1` আর `9, 2` (mid = ৪)\n\nচারটা অংশ, তবুও তুলনা শূন্য। রিকারশন ছোট ছোট রেঞ্জে `mergeSort` চালিয়ে যাচ্ছে।'
        ),
        scene({
          kind: 'array',
          label: 'second cut → four pieces',
          cells: [5, 3, 8, 1, 9, 2],
          showIndex: true,
          highlights: { mark: [1, 2, 4, 5] },
          pointers: [
            { i: 1, label: 'mid', tone: 'cyan' },
            { i: 4, label: 'mid', tone: 'purple' }
          ],
          brackets: [
            { from: 0, to: 0, label: '5', tone: 'cyan' },
            { from: 1, to: 2, label: '3, 8', tone: 'cyan' },
            { from: 3, to: 3, label: '1', tone: 'purple' },
            { from: 4, to: 5, label: '9, 2', tone: 'purple' }
          ],
          note: 'Left side is cut at mid = 1, right side at mid = 4.'
        }),
        2,
        { 'left mid': 1, 'right mid': 4, pieces: 4 }
      ),
      step(
        bi('Down to single cells', 'এক এক ঘরে নেমে এলো'),
        bi(
          'Keep splitting until every piece holds **one** value:\n\n`[5] [3] [8] [1] [9] [2]`\n\nA list of one item is always sorted — that is the **base case**: `if lo >= hi: return`.\n\n> The splitting cost is done. Everything from here is merging.',
          'প্রতিটি অংশে **একটা** করে মান না থাকা পর্যন্ত ভাগ করতে থাকো:\n\n`[5] [3] [8] [1] [9] [2]`\n\nএকটা আইটেমের তালিকা সবসময়ই সাজানো — এটাই **বেস কেস**: `if lo >= hi: return`।\n\n> ভাগ করার কাজ শেষ। এখান থেকে শুধু জোড়া দেওয়াই বাকি।'
        ),
        scene({
          kind: 'array',
          label: 'base case reached — every piece has size 1',
          cells: [5, 3, 8, 1, 9, 2],
          showIndex: true,
          highlights: { sorted: [0, 1, 2, 3, 4, 5] },
          note: 'One cell is always sorted, so recursion stops here and returns.',
          caption: '[5] [3] [8] [1] [9] [2] — now merge upwards',
          legend: [{ label: 'size 1 → sorted', color: 'var(--green)' }]
        }),
        1,
        { lo: 0, hi: 5, 'piece size': 1 }
      ),
      step(
        bi('Two fingers: 3 against 8', 'দুই আঙুল: ৩ বনাম ৮'),
        bi(
          'First merge: `[3]` and `[8]`. Put one finger on each value and compare.\n\n- **3 ≤ 8** → write **3** to the output, move the left finger right.\n- The left pile is now empty, so **8** is copied as it is.\n\nResult: **`[3, 8]`**. Every merge in this lesson is just this loop, repeated.',
          'প্রথম মার্জ: `[3]` আর `[8]`। দুই মানের উপরে এক এক আঙুল রেখে তুলনা করো।\n\n- **3 ≤ 8** → **3** আউটপুটে লেখো, বাম আঙুল ডানে সরে।\n- বাম গাদা এখন ফাঁকা, তাই **8** যা আছে তাই কপি হলো।\n\nফল: **`[3, 8]`**। এই পাঠের প্রতিটি মার্জ একই লুপ, বারবার।'
        ),
        scene({
          kind: 'array',
          label: 'merge [3] + [8] → compare the two fingers',
          cells: [5, 3, 8, 1, 9, 2],
          showIndex: true,
          highlights: { compare: [1, 2], dim: [0, 3, 4, 5] },
          pointers: [
            { i: 1, label: 'i', tone: 'cyan' },
            { i: 2, label: 'j', tone: 'amber' }
          ],
          aux: [
            {
              label: 'merged',
              cells: [3],
              showIndex: true,
              highlights: { insert: [0] },
              pointers: [{ i: 0, label: 'k', tone: 'green' }]
            }
          ],
          note: '3 ≤ 8 → 3 is written first, then 8 is copied → [3, 8].',
          caption: 'merged output → [3, 8]',
          legend: [
            { label: 'left finger i', color: 'var(--cyan)' },
            { label: 'right finger j', color: 'var(--amber)' }
          ]
        }),
        10,
        { i: 1, j: 2, 'L[i]': 3, 'R[j]': 8, out: '[3]' }
      ),
      step(
        bi('Merge 5 with 3, 8', '৫-এর সঙ্গে ৩, ৮ মিলাও'),
        bi(
          'Now the left finger sits on **5**, the right finger on **3**:\n\n- compare 5 and 3 → write **3**\n- compare 5 and 8 → write **5**\n- left pile is empty → copy **8**\n\nOutput: **`[3, 5, 8]`**. The whole left half is sorted.\n\n> One side was a single value, the other was already sorted — that is always true here.',
          'এখন বাম আঙুল **5**-এ, ডান আঙুল **3**-এ:\n\n- ৫ আর ৩ তুলনা → **3** লেখা\n- ৫ আর ৮ তুলনা → **5** লেখা\n- বাম গাদা খালি → **8** কপি\n\nআউটপুট: **`[3, 5, 8]`**। বাম অর্ধেক পুরোটাই সাজানো।\n\n> এক পাশ ছিল একটা মান, অন্য পাশ আগে থেকেই সাজানো — এখানে এভাবেই সবসময়।'
        ),
        scene({
          kind: 'array',
          label: 'left half merged → [3, 5, 8]',
          cells: [3, 5, 8, 1, 9, 2],
          showIndex: true,
          highlights: { sorted: [0, 1, 2] },
          pointers: [{ i: 2, label: 'j', tone: 'amber' }],
          brackets: [{ from: 0, to: 2, label: 'left half sorted', tone: 'green' }],
          aux: [
            {
              label: 'merged',
              cells: [3, 5, 8],
              showIndex: true,
              highlights: { insert: [2] },
              pointers: [{ i: 2, label: 'k', tone: 'green' }]
            }
          ],
          note: '3 written, then 5, then 8 copied → [3, 5, 8].'
        }),
        10,
        { i: 'done', j: 2, out: '[3, 5, 8]' }
      ),
      step(
        bi('Merge 9 with 2', '৯-এর সঙ্গে ২ মিলাও'),
        bi(
          'Same trick on the right side: compare **9** with **2**.\n\n**2 < 9** → write **2** first, then copy **9**.\n\nResult: **`[2, 9]`**. The finger order does not matter — only the smaller value is written.\n\n> The right half now holds `[1]` and the sorted run `[2, 9]` — they will merge next.',
          'ডান পাশে একই কৌশল: **9** আর **2** তুলনা।\n\n**2 < 9** → আগে **2** লেখো, তারপর **9** কপি।\n\nফল: **`[2, 9]`**। আঙুলের ক্রম যে তা গুরুত্বের নয় — শুধু ছোট মানটাই লেখা হয়।\n\n> ডান অর্ধেকে এখন `[1]` আর সাজানো লাইন `[2, 9]` — একটু পরে দুটো মিলবে।'
        ),
        scene({
          kind: 'array',
          label: 'merge [9] + [2] → [2, 9]',
          cells: [3, 5, 8, 1, 2, 9],
          showIndex: true,
          highlights: { sorted: [4, 5], dim: [0, 1, 2] },
          pointers: [
            { i: 4, label: 'i', tone: 'cyan' },
            { i: 5, label: 'j', tone: 'amber' }
          ],
          brackets: [{ from: 4, to: 5, label: 'merged', tone: 'purple' }],
          aux: [
            {
              label: 'merged',
              cells: [2, 9],
              showIndex: true,
              highlights: { insert: [1] },
              pointers: [{ i: 1, label: 'k', tone: 'green' }]
            }
          ],
          note: '2 ≤ 9 → 2 goes first, then 9 is copied → [2, 9].',
          caption: 'merged output → [2, 9]'
        }),
        10,
        { i: 4, j: 5, 'L[i]': 9, 'R[j]': 2, out: '[2]' }
      ),
      step(
        bi('Merge 1 with 2, 9', '১-এর সঙ্গে ২, ৯ মিলাও'),
        bi(
          'Left finger: **1**. Right finger: **2**, then **9**.\n\n- compare 1 and 2 → write **1**, and the left pile is empty\n- copy the rest: **2**, **9**\n\nResult: **`[1, 2, 9]`**. The whole right half is sorted now.\n\n> Both halves of the array are sorted runs: `[3, 5, 8]` and `[1, 2, 9]`.',
          'বাম আঙুল: **1**। ডান আঙুল: **2**, তারপর **9**।\n\n- ১ আর ২ তুলনা → **1** লেখা, বাম গাদা খালি\n- বাকিগুলো কপি: **2**, **9**\n\nফল: **`[1, 2, 9]`**। ডান অর্ধেক এখন সাজানো।\n\n> অ্যারের দুই অর্ধেকই এখন সাজানো লাইন: `[3, 5, 8]` আর `[1, 2, 9]`।'
        ),
        scene({
          kind: 'array',
          label: 'right half merged → [1, 2, 9]',
          cells: [3, 5, 8, 1, 2, 9],
          showIndex: true,
          highlights: { sorted: [3, 4, 5] },
          brackets: [
            { from: 0, to: 2, label: 'sorted run', tone: 'green' },
            { from: 3, to: 5, label: 'sorted run', tone: 'green' }
          ],
          aux: [
            {
              label: 'merged',
              cells: [1, 2, 9],
              showIndex: true,
              highlights: { insert: [2] },
              pointers: [{ i: 2, label: 'k', tone: 'green' }]
            }
          ],
          note: 'After writing 1, the right pile is copied as it is → [1, 2, 9].'
        }),
        13,
        { out: '[1, 2, 9]', 'left run': '[3, 5, 8]', 'right run': '[1, 2, 9]' }
      ),
      step(
        bi('The final merge begins', 'চূড়ান্ত মার্জ শুরু'),
        bi(
          'Left run `[3, 5, 8]`, right run `[1, 2, 9]`. Fingers start on **3** and **1**.\n\n- 3 vs 1 → write **1**\n- 3 vs 2 → write **2**\n\nOutput so far: **`[1, 2]`**. Now the fingers sit on **3** and **9**, and 3 will win this time.',
          'বাম লাইন `[3, 5, 8]`, ডান লাইন `[1, 2, 9]`। আঙুল শুরু **3** আর **1**-এ।\n\n- ৩ বনাম ১ → **1** লেখা\n- ৩ বনাম ২ → **2** লেখা\n\nএ পর্যন্ত আউটপুট: **`[1, 2]`**। এখন আঙুল দুটো **3** আর **9**-এ, আর এবার জিতবে ৩।'
        ),
        scene({
          kind: 'array',
          label: 'final merge — output [1, 2] so far',
          cells: [3, 5, 8, 1, 2, 9],
          showIndex: true,
          highlights: { compare: [0, 3], dim: [1, 2, 4, 5] },
          pointers: [
            { i: 0, label: 'i', tone: 'cyan' },
            { i: 3, label: 'j', tone: 'amber' }
          ],
          brackets: [
            { from: 0, to: 2, label: 'left run', tone: 'green' },
            { from: 3, to: 5, label: 'right run', tone: 'purple' }
          ],
          aux: [
            {
              label: 'merged',
              cells: [1, 2],
              showIndex: true,
              highlights: { active: [1] },
              pointers: [{ i: 1, label: 'k', tone: 'green' }]
            }
          ],
          note: 'The right finger won twice; now compare 3 with 9.',
          legend: [
            { label: 'compare now', color: 'var(--cyan)' },
            { label: 'already written', color: 'var(--green)' }
          ]
        }),
        10,
        { i: 0, j: 3, out: '[1, 2]' }
      ),
      step(
        bi('One array, fully sorted', 'একটাই অ্যারে, পুরোপুরি সাজানো'),
        bi(
          'The merge continues: 5 vs 9 → write **5**, 8 vs 9 → write **8**, and finally **9** has no partner so it is copied.\n\nArray: **`[1, 2, 3, 5, 8, 9]`** — sorted, in place.\n\n> Merge sort never swaps neighbours. It only **writes** the smaller value, round after round.',
          'মার্জ চলতেই থাকে: ৫ বনাম ৯ → **5** লেখা, ৮ বনাম ৯ → **8** লেখা, আর শেষে **9**-এর কোনো পার্টনার নেই তাই কপি।\n\nঅ্যারে: **`[1, 2, 3, 5, 8, 9]`** — সাজানো, নিজের জায়গাতেই।\n\n> মার্জ সর্ট কখনো পাশাপাশি সোয়াপ করে না। শুধু ছোট মানটা **লেখে**, চক্র পর চক্র।'
        ),
        scene({
          kind: 'bars',
          label: 'merge finished → [1, 2, 3, 5, 8, 9]',
          cells: [1, 2, 3, 5, 8, 9],
          showIndex: true,
          highlights: { sorted: [0, 1, 2, 3, 4, 5] },
          note: 'Both runs were joined in a single pass over six cells.',
          caption: '[1, 2, 3, 5, 8, 9] ✓ · 0 swaps',
          legend: [{ label: 'sorted', color: 'var(--green)' }]
        }),
        5,
        { out: '[1, 2, 3, 5, 8, 9]', merges: 5 }
      ),
      step(
        bi('Why O(n log n)', 'কেন O(n log n)'),
        bi(
          'Two costs multiply together:\n\n- **splitting** halves the range each round → about `log n` rounds (6 cells → 3 rounds).\n- in every round each value is written **once** while merging → `n` writes.\n\nSo the total is about `n × log n` → **`O(n log n)`**.\n\nFor `n = 1000`: merge sort does about **10,000** steps while an `O(n²)` sort needs **1,000,000**.',
          'দুটো খরচ গুণ হয়:\n\n- **ভাগ করা** প্রতি চক্রে অর্ধেক → প্রায় `log n` চক্র (৬টা ঘর → ৩ চক্র)।\n- প্রতিটি চক্রে মান গুলো মার্জ (merge) করার সময় **একবার** করে লেখা হয় → `n` বার লেখা।\n\nতাই মোট প্রায় `n × log n` → **`O(n log n)`**।\n\n`n = 1000` ধরে: মার্জ সর্ট প্রায় **১০,০০০** ধাপ করে, আর `O(n²)` সর্ট করে **১০ লাখ** ধাপ।'
        ),
        scene({
          kind: 'chart',
          label: 'n = 1000: O(n²) vs O(n log n)',
          unit: '',
          max: 1000000,
          items: [
            { label: 'O(n²) bubble', v: 1000000, color: 'linear-gradient(180deg,#f87171,#dc2626)' },
            { label: 'O(n log n) merge', v: 10000, color: 'linear-gradient(180deg,#34d399,#059669)' }
          ],
          note: 'log n rounds × n writes per round = n log n — the gap grows as data grows.',
          legend: [{ label: 'steps (about)', color: 'var(--cyan)' }]
        }),
        0,
        { rounds: 'log n', 'writes per round': 'n' }
      ),
      step(
        bi('Stable, but it needs extra space', 'স্থিতিশীল, তবে বাড়তি জায়গা লাগে'),
        bi(
          '**Stable** — equal values keep their original order, because `L[i] <= R[j]` takes from the left run first.\n\n**Space `O(n)`** — the merge writes into a temporary row before copying back. That is the price of the speed.\n\n**Always `O(n log n)`** — no lucky input, no unlucky input.\n\n> Choose merge sort when you need predictable speed or a stable order.',
          '**স্থিতিশীল (stable)** — সমান মান আগের অবস্থানেই থাকে, কারণ `L[i] <= R[j]` হলে আগে বাম লাইন থেকে নেওয়া হয়।\n\n**স্পেস `O(n)`** — মার্জ আগে একটা সাময়িক সারিতে লেখে, তারপর কপি করে আনে। এটাই গতির দাম।\n\n**সবসময় `O(n log n)`** — ভাগ্যবান ইনপুট নেই, দুর্ভাগ্যবান ইনপুটও নেই।\n\n> অনুমানযোগ্য গতি বা স্থিতিশীল ক্রম দরকার হলে মার্জ সর্ট বেছে নাও।'
        ),
        scene({
          kind: 'cards',
          label: 'Merge sort in one screen',
          cards: [
            { icon: '⚡', title: 'Always O(n log n)', desc: 'best, average and worst are the same', state: 'ok', tag: 'time', accent: 'var(--green)' },
            { icon: '⚖️', title: 'Stable', desc: 'equal values keep their order', state: 'ok', tag: 'stable', accent: 'var(--cyan)' },
            { icon: '🧺', title: 'Space O(n)', desc: 'needs a temp row for merging', state: 'active', tag: 'memory', accent: 'var(--yellow)' },
            { icon: '📺', title: 'Great for big data', desc: 'linked lists and external files too', state: 'ok', tag: 'use it', accent: 'var(--purple)' }
          ],
          caption: 'Next lesson in the sidebar: Quick Sort'
        }),
        10,
        { time: 'O(n log n)', space: 'O(n)', stable: true }
      )
    ]
  },

  /* ─────────────────────────────  5 · QUICK SORT  ───────────────────────────── */
  {
    id: 'quick-sort',
    name: bi('Quick Sort', 'কুইক সর্ট'),
    description: bi('Pick a pivot and split the data around it', 'পিভট বেছে নাও, তার চারপাশে ডেটা ভাগ করো'),
    categoryKey: 'sorting',
    level: 'intermediate',
    order: 50,
    icon: '⚡',
    complexity: {
      time: 'O(n log n) average',
      best: 'O(n log n)',
      worst: 'O(n²)',
      space: 'O(log n)',
      note: bi(
        'Partitioning happens in place — only the call stack is extra. Bad pivots (e.g. sorted data with a fixed last pivot) push it to O(n²).',
        'পার্টিশন হয় অ্যারের ভেতরেই — শুধু কল স্ট্যাক বাড়তি খরচ। খারাপ পিভট (যেমন সাজানো ডেটায় শেষ ঘরের পিভট) O(n²)-এ নিয়ে যায়।'
      )
    },
    code: {
      en: [
        'quickSort(arr, lo, hi):',
        '  if lo >= hi: return            // 0 or 1 cell → nothing to do',
        '  p = partition(arr, lo, hi)',
        '  quickSort(arr, lo, p - 1)      // sort the left side',
        '  quickSort(arr, p + 1, hi)      // sort the right side',
        'partition(arr, lo, hi):',
        '  pivot = arr[hi]                // the last cell is the pivot',
        '  i = lo - 1                     // end of the smaller-than-pivot region',
        '  for j = lo to hi - 1:',
        '    if arr[j] <= pivot:',
        '      i = i + 1',
        '      swap(arr, i, j)            // a smaller value goes left',
        '  swap(arr, i + 1, hi)           // pivot goes to its final place',
        '  return i + 1'
      ],
      bn: [
        'quickSort(arr, lo, hi):',
        '  if lo >= hi: return            // ০ বা ১টা ঘর → কাজ নেই',
        '  p = partition(arr, lo, hi)',
        '  quickSort(arr, lo, p - 1)      // বাম দিক সাজাও',
        '  quickSort(arr, p + 1, hi)      // ডান দিক সাজাও',
        'partition(arr, lo, hi):',
        '  pivot = arr[hi]                // শেষ ঘরটাই পিভট (pivot)',
        '  i = lo - 1                     // পিভটের চেয়ে ছোট অংশের শেষ ইনডেক্স',
        '  for j = lo to hi - 1:',
        '    if arr[j] <= pivot:',
        '      i = i + 1',
        '      swap(arr, i, j)            // ছোট মান বামে চলে যায়',
        '  swap(arr, i + 1, hi)           // পিভট চূড়ান্ত জায়গায় বসল',
        '  return i + 1'
      ]
    },
    steps: [
      step(
        bi('Judge every value against one', 'একটার সঙ্গে সবকিছুর তুলনা'),
        bi(
          '**Quick sort** picks one value — the **pivot (পিভট)** — and asks every other value one question:\n\n> Are you smaller than the pivot, or bigger?\n\nSmaller goes **left**, bigger goes **right**. After one round the pivot sits in its final place.\n\nThen we repeat on the left piece and on the right piece.',
          '**কুইক সর্ট** একটা মান বেছে নেয় — **পিভট (pivot)** — আর বাকি প্রতিটি মানকে একটা প্রশ্ন করে:\n\n> তুমি কি পিভটের চেয়ে ছোট, নাকি বড়?\n\nছোট হলে **বামে**, বড় হলে **ডানে**। এক চক্রের পরে পিভট নিজের চূড়ান্ত জায়গায় বসে যায়।\n\nএরপর বাম অংশে আবার, আর ডান অংশে আবার একই কাজ।'
        ),
        scene({
          kind: 'cards',
          label: 'One pivot, two sides',
          cards: [
            { icon: '⚖️', title: 'Pick a pivot', desc: 'one value to judge everything against', state: 'active', tag: 'pivot', accent: 'var(--purple)' },
            { icon: '👈', title: 'Smaller → left', desc: 'all values ≤ pivot', state: 'ok', tag: 'left side', accent: 'var(--green)' },
            { icon: '👉', title: 'Bigger → right', desc: 'all values > pivot', state: 'ok', tag: 'right side', accent: 'var(--amber)' }
          ],
          caption: 'nums = [5, 3, 8, 1, 9, 2] · pivot = 2'
        }),
        0,
        { lo: 0, hi: 5 }
      ),
      step(
        bi('Pick the pivot — the last cell', 'পিভট বাছো — শেষ ঘরটা'),
        bi(
          'The rule for this lesson: **the last cell is the pivot**.\n\nArray `5, 3, 8, 1, 9, 2` → **pivot = 2** at index 5. Everything else will be judged against it.\n\nWe also keep `i = lo - 1` = **-1**. It marks the end of the "smaller than pivot" region — which is empty at the start.',
          'এই পাঠের নিয়ম: **শেষ ঘরটাই পিভট**।\n\nঅ্যারে `5, 3, 8, 1, 9, 2` → **pivot = 2**, ইনডেক্স ৫। বাকি সবকিছুরই এর সঙ্গে তুলনা হবে।\n\nসঙ্গে `i = lo - 1` = **-1** রাখি। এটা "পিভটের চেয়ে ছোট" অংশের শেষ দেখায় — শুরুতে ওটা ফাঁকা।'
        ),
        scene({
          kind: 'array',
          label: 'pivot = arr[5] = 2',
          cells: [5, 3, 8, 1, 9, 2],
          showIndex: true,
          highlights: { pivot: [5] },
          pointers: [{ i: 5, label: 'pivot', tone: 'purple' }],
          brackets: [{ from: 0, to: 4, label: 'j will scan these', tone: 'amber' }],
          note: 'i = -1 → nothing is on the left side yet.',
          caption: 'pivot = 2 · lo = 0 · hi = 5'
        }),
        6,
        { lo: 0, hi: 5, pivot: 2, i: -1 }
      ),
      step(
        bi('Scan — bigger values stay put', 'স্ক্যান — বড় মান নড়ে না'),
        bi(
          '`j` walks from index 0 to 4 and asks each value:\n\n- `5 > 2` → belongs right → leave it\n- `3 > 2` → belongs right → leave it\n- `8 > 2` → belongs right → leave it\n\nNothing has moved so far, because `i` only advances when a value **smaller than the pivot** shows up.',
          '`j` ইনডেক্স ০ থেকে ৪ পর্যন্ত হাঁটে আর প্রতিটি মানকে জিজ্ঞেস করে:\n\n- `5 > 2` → ডানের পক্ষে → নড়াই না\n- `3 > 2` → ডানের পক্ষে → নড়াই না\n- `8 > 2` → ডানের পক্ষে → নড়াই না\n\nএ পর্যন্ত কিছুই নড়েনি, কারণ `i` তখনই এগে যায় যখন **পিভটের চেয়ে ছোট** মান পাওয়া যায়।'
        ),
        scene({
          kind: 'array',
          label: 'j = 2 · 5, 3, 8 are all bigger than 2',
          cells: [5, 3, 8, 1, 9, 2],
          showIndex: true,
          highlights: { compare: [2], pivot: [5] },
          pointers: [
            { i: 2, label: 'j', tone: 'cyan' },
            { i: 5, label: 'pivot', tone: 'purple' }
          ],
          brackets: [{ from: 0, to: 4, label: 'still being scanned', tone: 'amber' }],
          note: 'No smaller value yet → i stays at -1, left side still empty.',
          caption: 'j = 2 · i = -1'
        }),
        9,
        { j: 2, i: -1, pivot: 2 }
      ),
      step(
        bi('A smaller value → swap', 'ছোট মান পেলাম → সোয়াপ'),
        bi(
          'At index 3 we find **1 ≤ 2**, so it belongs on the left.\n\n`i` advances to 0, and we **swap index 0 with index 3**:\n\n`5, 3, 8, 1, 9, 2` → **`1, 3, 8, 5, 9, 2`**\n\nNow index 0 holds a value smaller than the pivot. The left region has exactly **1 cell**.',
          'ইনডেক্স ৩-এ পেলাম **1 ≤ 2**, তাই এটা বাম পাশে যাবে।\n\n`i` ০ হয়ে গেল, আর **ইনডেক্স ০ আর ইনডেক্স ৩ সোয়াপ** করলাম:\n\n`5, 3, 8, 1, 9, 2` → **`[1, 3, 8, 5, 9, 2]`**\n\nএখন ইনডেক্স ০-এ পিভটের চেয়ে ছোট মান বসে আছে। বাম অংশে ঠিক **১টা** ঘর।'
        ),
        scene({
          kind: 'array',
          label: 'swap(0, 3) → [1, 3, 8, 5, 9, 2]',
          cells: [1, 3, 8, 5, 9, 2],
          showIndex: true,
          highlights: { swap: [0, 3], pivot: [5] },
          pointers: [
            { i: 0, label: 'i', tone: 'amber' },
            { i: 3, label: 'j', tone: 'cyan' },
            { i: 5, label: 'pivot', tone: 'purple' }
          ],
          brackets: [{ from: 0, to: 0, label: '≤ pivot', tone: 'green' }],
          note: '1 jumped to the front — the left region now has one cell.',
          caption: 'i = 0 · j = 3'
        }),
        11,
        { i: 0, j: 3, pivot: 2 }
      ),
      step(
        bi('Finish the scan, then seat the pivot', 'স্ক্যান শেষ, তারপর পিভট বসাও'),
        bi(
          'At index 4 we find **9 > 2** → it stays on the right. The scan is over.\n\nFinal move: **swap `i + 1 = 1` with the pivot at index 5**.\n\n`1, 3, 8, 5, 9, 2` → **`1, 2, 8, 5, 9, 3`**\n\nThe pivot **2** now sits at index 1 — its **final** place.',
          'ইনডেক্স ৪-এ পেলাম **9 > 2** → ডানেই থাকল। স্ক্যান শেষ।\n\nশেষ কাজ: **`i + 1 = 1` আর ইনডেক্স ৫-এর পিভট সোয়াপ**।\n\n`1, 3, 8, 5, 9, 2` → **`1, 2, 8, 5, 9, 3`**\n\nপিভট **2** এখন ইনডেক্স ১-এ — এটাই এর **চূড়ান্ত** জায়গা।'
        ),
        scene({
          kind: 'array',
          label: 'swap(1, 5) → pivot 2 locked at index 1',
          cells: [1, 2, 8, 5, 9, 3],
          showIndex: true,
          highlights: { swap: [1, 5] },
          pointers: [{ i: 1, label: 'pivot', tone: 'purple' }],
          brackets: [
            { from: 0, to: 1, label: '≤ 2', tone: 'green' },
            { from: 2, to: 5, label: '> 2', tone: 'amber' }
          ],
          note: 'Left of the pivot: 1. Right of the pivot: 8, 5, 9, 3 — all bigger than 2.',
          caption: 'p = 1'
        }),
        12,
        { i: 0, p: 1, pivot: 2 }
      ),
      step(
        bi('What one partition gave us', 'এক পার্টিশনে যা পেলাম'),
        bi(
          'One round is done:\n\n- **left**: `1` (smaller than 2)\n- **pivot**: `2` at index 1 — locked forever\n- **right**: `8, 5, 9, 3` (all bigger than 2)\n\n> Nothing is sorted yet except the pivot. But the problem is now **two smaller problems**.',
          'এক চক্র শেষ:\n\n- **বামে**: `1` (২-এর ছোট)\n- **পিভট**: `2`, ইনডেক্স ১-এ — চিরতরে লক\n- **ডানে**: `8, 5, 9, 3` (সবই ২-এর বড়)\n\n> পিভট ছাড়া কিছুই সাজানো হয়নি। কিন্তু সমস্যাটা এখন **দুটো ছোট সমস্যা**।'
        ),
        scene({
          kind: 'array',
          label: 'partition done → p = 1',
          cells: [1, 2, 8, 5, 9, 3],
          showIndex: true,
          highlights: { pivot: [1], sorted: [1] },
          brackets: [
            { from: 0, to: 0, label: 'left: ≤ 2', tone: 'green' },
            { from: 1, to: 1, label: 'pivot', tone: 'purple' },
            { from: 2, to: 5, label: 'right: > 2', tone: 'amber' }
          ],
          note: 'Now sort the two sides separately.',
          caption: 'p = 1 · next: quickSort(0, 0) and quickSort(2, 5)'
        }),
        13,
        { p: 1, lo: 0, hi: 5 }
      ),
      step(
        bi('Recurse into both sides', 'দুই পাশে রিকারশন'),
        bi(
          'Call `quickSort(arr, 0, 0)` on the left piece.\n\n`lo >= hi` → it has **one** cell → return at once. Index 0 and 1 are finished.\n\nThen call `quickSort(arr, 2, 5)` on the right piece `8, 5, 9, 3`.\n\n> **Divide and conquer**: any piece of size 1 is already sorted.',
          '`quickSort(arr, 0, 0)` বাম অংশে কল হলো।\n\n`lo >= hi` → ওখানে **একটাই** ঘর → সঙ্গে সঙ্গে ফেরত। ইনডেক্স ০ আর ১ শেষ।\n\nএরপর ডান অংশ `8, 5, 9, 3`-এ `quickSort(arr, 2, 5)` কল হয়।\n\n> **ভাগ করে জয় (divide and conquer)**: এক ঘরের অংশ আগে থেকেই সাজানো।'
        ),
        scene({
          kind: 'array',
          label: 'left side done → now quickSort(2, 5)',
          cells: [1, 2, 8, 5, 9, 3],
          showIndex: true,
          highlights: { sorted: [0, 1], mark: [2, 3, 4, 5] },
          pointers: [
            { i: 2, label: 'lo', tone: 'cyan' },
            { i: 5, label: 'hi', tone: 'amber' }
          ],
          brackets: [{ from: 2, to: 5, label: 'next subarray', tone: 'purple' }],
          note: 'The right piece [8, 5, 9, 3] gets its own pivot now.'
        }),
        4,
        { lo: 2, hi: 5, 'left size': 1 }
      ),
      step(
        bi('Partition the right piece', 'ডান অংশের পার্টিশন'),
        bi(
          'Subarray `8, 5, 9, 3` with `lo = 2`, `hi = 5` → **pivot = 3**.\n\nScan: `8 > 3`, `5 > 3`, `9 > 3` → all stay, so `i` remains at `lo - 1 = 1`.\n\nFinal move: swap `i + 1 = 2` with the pivot at index 5 → **`1, 2, 3, 5, 9, 8`**.\n\nPivot **3** is now locked at index 2.',
          'সাবঅ্যারে `8, 5, 9, 3`, `lo = 2`, `hi = 5` → **pivot = 3**।\n\nস্ক্যান: `8 > 3`, `5 > 3`, `9 > 3` → সবই থাকল, তাই `i` থাকল `lo - 1 = 1`-এ।\n\nশেষ কাজ: `i + 1 = 2` আর ইনডেক্স ৫-এর পিভট সোয়াপ → **`1, 2, 3, 5, 9, 8`**।\n\nপিভট **3** এখন ইনডেক্স ২-এ লক।'
        ),
        scene({
          kind: 'array',
          label: 'swap(2, 5) → pivot 3 locked at index 2',
          cells: [1, 2, 3, 5, 9, 8],
          showIndex: true,
          highlights: { pivot: [2] },
          pointers: [
            { i: 2, label: 'pivot', tone: 'purple' },
            { i: 3, label: 'lo', tone: 'cyan' },
            { i: 5, label: 'hi', tone: 'amber' }
          ],
          brackets: [
            { from: 0, to: 2, label: 'locked: 1, 2, 3', tone: 'green' },
            { from: 3, to: 5, label: '> 3 — next', tone: 'amber' }
          ],
          note: 'Nothing was smaller than 3 in this piece, so 3 slid straight to the front of it.',
          caption: 'p = 2 · next: quickSort(3, 5)'
        }),
        12,
        { lo: 2, hi: 5, pivot: 3, p: 2 }
      ),
      step(
        bi('Keep going — 5, 9, 8', 'চালিয়ে যাও — ৫, ৯, ৮'),
        bi(
          'Next piece: `5, 9, 8` at indexes 3 … 5 → **pivot = 8**.\n\n- `5 ≤ 8` → `i` advances, swap index 3 with index 3 → no change\n- `9 > 8` → stays on the right\n- swap `i + 1 = 4` with the pivot at index 5\n\n`1, 2, 3, 5, 9, 8` → **`1, 2, 3, 5, 8, 9`**.\n\nOnly `9` is left, and it already sits in the last cell.',
          'পরের অংশ: ইনডেক্স ৩ … ৫-এ `5, 9, 8` → **pivot = 8**।\n\n- `5 ≤ 8` → `i` এগিয়ে যায়, ইনডেক্স ৩ আর ৩ সোয়াপ → কিছু নড়ে না\n- `9 > 8` → ডানেই থাকল\n- `i + 1 = 4` আর ইনডেক্স ৫-এর পিভট সোয়াপ\n\n`1, 2, 3, 5, 9, 8` → **`1, 2, 3, 5, 8, 9`**।\n\nশুধু `9` বাকি, আর ওটা আগে থেকেই শেষ ঘরে আছে।'
        ),
        scene({
          kind: 'array',
          label: 'pivot 8 locked at index 4',
          cells: [1, 2, 3, 5, 8, 9],
          showIndex: true,
          highlights: { pivot: [4], sorted: [0, 1, 2] },
          pointers: [
            { i: 4, label: 'pivot', tone: 'purple' },
            { i: 3, label: 'lo', tone: 'cyan' }
          ],
          brackets: [
            { from: 0, to: 4, label: 'locked: 1, 2, 3, 5, 8', tone: 'green' },
            { from: 5, to: 5, label: '9 — last cell', tone: 'amber' }
          ],
          note: 'swap(4, 5) put the pivot 8 into its final place.',
          caption: 'subarray [5, 9, 8] → p = 4'
        }),
        12,
        { lo: 3, hi: 5, pivot: 8, p: 4 }
      ),
      step(
        bi('Done — every piece is size 1', 'শেষ — সব অংশ এক ঘরের'),
        bi(
          'The last calls are `quickSort(arr, 3, 3)` and `quickSort(arr, 5, 5)`.\n\nBoth hit `lo >= hi` and return at once — a single cell is always sorted.\n\nArray: **`[1, 2, 3, 5, 8, 9]`**.\n\n> Every pivot landed in its **final** place, so nothing ever needs to move again.',
          'শেষ দুটো কল `quickSort(arr, 3, 3)` আর `quickSort(arr, 5, 5)`।\n\nদুটোই `lo >= hi` পেয়ে সঙ্গে ফেরত আসে — এক ঘর তো সবসময়ই সাজানো।\n\nঅ্যারে: **`[1, 2, 3, 5, 8, 9]`**।\n\n> প্রতিটি পিভট **চূড়ান্ত** জায়গায় বসেছে, তাই আর কিছুকে নড়তে হবে না।'
        ),
        scene({
          kind: 'bars',
          label: 'quick sort finished → [1, 2, 3, 5, 8, 9]',
          cells: [1, 2, 3, 5, 8, 9],
          showIndex: true,
          highlights: { sorted: [0, 1, 2, 3, 4, 5] },
          note: 'Every recursive piece shrank to one cell, so the whole array is sorted.',
          caption: '[1, 2, 3, 5, 8, 9] ✓ · in place',
          legend: [{ label: 'locked by its pivot', color: 'var(--green)' }]
        }),
        1,
        { 'subcalls left': 0, result: '[1, 2, 3, 5, 8, 9]' }
      ),
      step(
        bi('Average O(n log n), worst O(n²)', 'গড় O(n log n), খারাপ O(n²)'),
        bi(
          'Each partition splits the data roughly **in half** → about `log n` rounds, and each round scans `n` values → **`O(n log n)`** on average.\n\nBut if the pivot is always the smallest value, one side keeps everything → `n` rounds of `n` work → **`O(n²)`**.\n\nThat happens with sorted data when you always pick the last cell. Real libraries pick a random pivot or the median of three to avoid it.',
          'প্রতিটি পার্টিশন ডেটাকে প্রায় **অর্ধেক** করে → প্রায় `log n` চক্র, আর প্রতি চক্রে `n` মান ঘোঁটা হয় → গড়ে **`O(n log n)`**।\n\nকিন্তু পিভট যদি সবসময় সবচেয়ে ছোট মান হয়, এক পাশেই সব চলে যায় → `n` চক্রে `n` করে কাজ → **`O(n²)`**।\n\nশেষ ঘর বেছে নিলে সাজানো ডেটায় ঠিক এটাই হয়। বাস্তব লাইব্রেরি এড়াতে এলোমেলো পিভট বা তিনটার মধ্যমান নেয়।'
        ),
        scene({
          kind: 'chart',
          label: 'n = 1000: average vs worst case',
          unit: '',
          max: 499500,
          items: [
            { label: 'average O(n log n)', v: 10000, color: 'linear-gradient(180deg,#34d399,#059669)' },
            { label: 'worst O(n²)', v: 499500, color: 'linear-gradient(180deg,#f87171,#dc2626)' }
          ],
          note: 'One unlucky pivot choice turns 10,000 steps into 499,500.',
          legend: [{ label: 'comparisons (about)', color: 'var(--cyan)' }]
        }),
        2,
        { 'avg rounds': 'log n', 'worst rounds': 'n' }
      ),
      step(
        bi('In place and usually fastest', 'জায়গা নষ্ট করে না, আর সাধারণত সবচেয়ে দ্রুত'),
        bi(
          '**Space `O(log n)`** — partitioning happens inside the array, only the recursion stack is extra. Merge sort needs `O(n)`.\n\n**In place** — no big temporary array, so it is friendly to caches.\n\n**In practice** — often the fastest general sort (C++ `std::sort`, older Java `Arrays.sort` for primitives).\n\n> One weakness: it is **not stable** — equal values can change order.',
          '**স্পেস `O(log n)`** — পার্টিশন হয় অ্যারের ভেতরেই, শুধু রিকারশন স্ট্যাক বাড়তি। মার্জ সর্টে লাগে `O(n)`।\n\n**জায়গা নষ্ট করে না (in place)** — কোনো বড় সাময়িক অ্যারে নেই, তাই ক্যাশের সঙ্গে ভালো মানায়।\n\n**বাস্তবে** — সাধারণত এটাই সবচেয়ে দ্রুত (C++ `std::sort`, আগের জাভা `Arrays.sort`)।\n\n> একটা দুর্বলতা: এটা **stable নয়** — সমান মানের ক্রম বদলে যেতে পারে।'
        ),
        scene({
          kind: 'cards',
          label: 'Quick sort in one screen',
          cards: [
            { icon: '⚡', title: 'Avg O(n log n)', desc: 'balanced pivots split the data in half', state: 'ok', tag: 'time', accent: 'var(--green)' },
            { icon: '🌪️', title: 'Worst O(n²)', desc: 'bad pivots: sorted data, fixed last cell', state: 'bad', tag: 'risk', accent: 'var(--red)' },
            { icon: '🧠', title: 'Space O(log n)', desc: 'in place — only the call stack', state: 'ok', tag: 'memory', accent: 'var(--cyan)' },
            { icon: '🏁', title: 'Usually fastest', desc: 'the default general sort in libraries', state: 'active', tag: 'in practice', accent: 'var(--yellow)' }
          ],
          caption: 'You finished Sorting · next chapter: Linked Lists'
        }),
        0,
        { time: 'O(n log n) avg', space: 'O(log n)', stable: false }
      )
    ]
  }
];
