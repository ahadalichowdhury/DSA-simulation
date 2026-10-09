export const arrayTopics = [
  {
    id: 'array-basics',
    name: { en: 'Array Basics', bn: 'অ্যারের ভিত্তি' },
    description: {
      en: 'A fixed row of boxes with numbers — index 0, 1, 2…',
      bn: 'নম্বরওয়ালা সারি ঘর — ইনডেক্স 0, 1, 2…'
    },
    categoryKey: 'arrays',
    level: 'beginner',
    order: 10,
    icon: '📏',
    complexity: {
      time: 'O(1) read · O(n) insert/delete',
      best: 'O(1) — read by index',
      worst: 'O(n) — insert or delete at the front',
      space: 'O(n)',
      note: {
        en: 'Reading computes an address directly. Insert and delete must shift the rest of the row, so they cost O(n).',
        bn: 'পড়ার সময় ঠিকানা সরাসরি হিসাব করা হয়। ইনসার্ট ও ডিলিটে সারির বাকি অংশ সরাতে হয়, তাই খরচ O(n)।'
      }
    },
    code: {
      en: [
        'arr = [4, 9, 2, 7, 5, 3]       // a fixed row of boxes',
        'n = length(arr)                 // n = 6',
        'x = arr[5]                      // read → 3, one jump, O(1)',
        '// append at the end — nothing else moves',
        'arr[n] = 8;  n = n + 1          // n = 7',
        '// insert 6 at index 1 → shift the rest right',
        'for i = n down to 2:  arr[i] = arr[i-1]',
        'arr[1] = 6;  n = n + 1',
        '// delete index 1 → shift the rest left',
        'for i = 1 to n-2:  arr[i] = arr[i+1]',
        'n = n - 1'
      ],
      bn: [
        'arr = [4, 9, 2, 7, 5, 3]       // নির্দিষ্ট আকারের এক সারি ঘর',
        'n = length(arr)                 // n = 6',
        'x = arr[5]                      // পড়া → 3, এক ঝাঁপ, O(1)',
        '// শেষে যোগ করো — বাকি কিছু নড়ে না',
        'arr[n] = 8;  n = n + 1          // n = 7',
        '// ১ নম্বর ইনডেক্সে 6 ঢোকাও → বাকিগুলো ডানে সরে',
        'for i = n down to 2:  arr[i] = arr[i-1]',
        'arr[1] = 6;  n = n + 1',
        '// ১ নম্বর ইনডেক্স মুছো → বাকিগুলো বামে সরে',
        'for i = 1 to n-2:  arr[i] = arr[i+1]',
        'n = n - 1'
      ]
    },
    steps: [
      {
        title: { en: 'What an array really is', bn: 'অ্যারে আসলে কী' },
        explanation: {
          en: 'An **array** is a row of boxes sitting side by side in memory. Every box holds one value and has a number under it.\n\nThink of cinema seats: **seat 0, seat 1, seat 2…** Or an egg carton — every egg has its own fixed slot and the slots never swap places.\n\n> One row. Fixed positions. That is the whole idea.',
          bn: '**অ্যারে (array)** মানে মেমরিতে পাশাপাশি সাজানো এক সারি ঘর। প্রতিটি ঘরে একটা করে ভ্যালু থাকে, আর নিচে একটা নম্বর লেখা।\n\nসিনেমার আসন ভাবো: **আসন ০, আসন ১, আসন ২…** কিংবা ডিমের ট্রে — প্রতিটা ডিমের নিজের নির্দিষ্ট ঘর, ঘরগুলো কখনো বদলায় না।\n\n> এক সারি। নির্দিষ্ট জায়গা। এটুকুই পুরো কথা।'
        },
        line: 0,
        scene: {
          kind: 'array',
          label: { en: 'an array = one row of boxes, each with a fixed position', bn: 'অ্যারে = এক সারি বক্স, প্রতিটার নির্দিষ্ট অবস্থান' },
          cells: [10, 20, 30, 40, 50, 60],
          highlights: { active: [2] },
          pointers: [{ i: 2, label: 'box 2', tone: 'yellow' }],
          note: { en: 'Like cinema seats: box 2 is always the third one from the left.', bn: 'সিনেমার সিটের মতো: বক্স ২ সবসময় বাম থেকে তৃতীয়টা।' }
        }
      },
      {
        title: { en: 'Index and length', bn: 'ইনডেক্স ও লেংথ' },
        explanation: {
          en: 'Every box has an **index** — its position number, counting from **0**.\n\n`arr[0]` is 4, `arr[3]` is 7, and the **length** is 6 because there are 6 boxes.\n\n> Counting starts at 0, not 1. So the last index is always `length - 1` = 5.',
          bn: 'প্রতিটা ঘরের নিচে **ইনডেক্স (index)** থাকে — অর্থাৎ অবস্থানের নম্বর, **০** থেকে গোনা।\n\n`arr[0]` মান 4, `arr[3]` মান 7, আর **লেংথ (length)** ৬ — কারণ ঘর ৬টা।\n\n> গোনা ০ থেকে শুরু, ১ থেকে নয়। তাই শেষ ইনডেক্স সবসময় `length - 1` = ৫।'
        },
        line: 1,
        state: { 'arr[0]': 4, 'arr[3]': 7, 'length(arr)': 6, 'last index': 5 },
        scene: {
          kind: 'array',
          label: 'arr = [4, 9, 2, 7, 5, 3] · length = 6',
          cells: [4, 9, 2, 7, 5, 3],
          showIndex: true,
          highlights: { active: [3] },
          note: 'Index 3 holds the value 7 · the last index is 5.',
          legend: [{ label: 'arr[3] = 7', color: 'var(--yellow)' }]
        }
      },
      {
        title: { en: 'Why arr[5] is instant', bn: 'arr[5] এত দ্রুত কেন' },
        explanation: {
          en: 'To read `arr[5]` the computer does **no walking**. It computes the address:\n\n`address = base + index × 4`\n\nWith base 1000, `arr[5]` lives at 1000 + 5 × 4 = **1020**. One jump, one read → **O(1)**.\n\nThis only works because the boxes are packed into one row with no gaps.',
          bn: '`arr[5]` পড়তে কম্পিউটার **হেঁটে যায় না**। ঠিকানাটা হিসেব করে ফেলে:\n\n`address = base + index × 4`\n\nbase 1000 ধরলে `arr[5]` বসে আছে 1000 + 5 × 4 = **1020**। এক ঝাঁপ, একবার পড়া → **O(1)**।\n\nএটা কাজ করে কারণ ঘরগুলো কোনো ফাঁক ছাড়াই এক সারিতে ভরা।'
        },
        line: 2,
        state: { base: 1000, index: 5, address: 1020, cost: 'O(1)' },
        scene: {
          kind: 'array',
          label: 'base = 1000 · 4 bytes per number',
          cells: [4, 9, 2, 7, 5, 3],
          showIndex: true,
          highlights: { active: [5] },
          pointers: [{ i: 5, label: 'arr[5]', tone: 'cyan' }],
          aux: [
            { label: 'address of each box', cells: [1000, 1004, 1008, 1012, 1016, 1020], highlights: { active: [5] } }
          ],
          note: '1000 + 5 × 4 = <b>1020</b> — computed, not searched for.',
          caption: 'no loop, no walking → O(1)'
        }
      },
      {
        title: { en: 'Appending at the end', bn: 'শেষে যোগ করা' },
        explanation: {
          en: 'There is usually a little free space after the last box. We write **8** at index 6 and `n` becomes 7.\n\nNothing else moves — that is why **appending at the end is nearly free**, close to O(1).\n\n> If the free space runs out, the array copies itself into a bigger block and tries again.',
          bn: 'শেষ ঘরের পরে সাধারণত একটু খালি জায়গা থাকে। আমরা ৬ নম্বর ইনডেক্সে **8** লিখে দিলাম, `n` হয়ে গেল ৭।\n\nবাকি কিছুই সরে না — তাই **অ্যারের শেষে যোগ করা প্রায় ফ্রি**, মাত্র O(1)-এর কাছাকাছি।\n\n> খালি জায়গা শেষ হলে অ্যারেটা নিজেকে একটা বড় ব্লকে কপি করে আবার চেষ্টা করে।'
        },
        line: 4,
        state: { 'arr[6]': 8, n: '6 → 7', cellsMoved: 0 },
        scene: {
          kind: 'array',
          label: 'append 8 → arr = [4, 9, 2, 7, 5, 3, 8]',
          cells: [4, 9, 2, 7, 5, 3, 8],
          showIndex: true,
          highlights: { insert: [6] },
          pointers: [{ i: 6, label: 'append', tone: 'green' }],
          note: 'Index 6 is brand new — cells 0…5 stay exactly where they were.',
          caption: 'n: 6 → 7 · 0 cells shifted',
          legend: [{ label: 'new value', color: 'var(--green)' }]
        }
      },
      {
        title: { en: 'Inserting in the middle', bn: 'মাঝখানে ইনসার্ট' },
        explanation: {
          en: 'Now insert **6** at index 1. There is no free slot there, so everything on the right must step aside.\n\nThe loop walks **backwards**, so nothing gets overwritten:\n\n- `arr[7] = arr[6]` → 8 moves to index 7\n- `arr[6] = arr[5]` → 3 moves to index 6\n- … all the way down to `arr[2] = arr[1]` → 9 moves to index 2\n\nThen `arr[1] = 6`. **Six shifts later** `n` becomes 8, and the row is `[4, 6, 9, 2, 7, 5, 3, 8]`.',
          bn: 'এখন ১ নম্বর ইনডেক্সে **6** ঢোকাও। ওই জায়গায় খালি ঘর নেই, তাই ডানের সবাইকে এক ধাপ পাশ সরতে হবে।\n\nলুপটা **উল্টো দিকে** চলে, না হলে পুরনো ডেটা মুছে যায়:\n\n- `arr[7] = arr[6]` → 8 সরে যায় ৭ নম্বরে\n- `arr[6] = arr[5]` → 3 সরে যায় ৬ নম্বরে\n- … নিচে `arr[2] = arr[1]` পর্যন্ত → 9 সরে যায় ২ নম্বরে\n\nতারপর `arr[1] = 6`। **ছয় বার সরানোর** পর `n` হলো ৮, আর সারি হলো `[4, 6, 9, 2, 7, 5, 3, 8]`।'
        },
        line: [6, 7],
        state: { 'insert at': 1, value: 6, shifts: 6, n: '7 → 8' },
        scene: {
          kind: 'array',
          label: 'insert 6 at index 1 → everything right moves +1',
          cells: [4, 6, 9, 2, 7, 5, 3, 8],
          showIndex: true,
          sub: [null, 'new', null, null, null, null, null, null],
          highlights: { insert: [1], mark: [2, 3, 4, 5, 6, 7] },
          brackets: [{ from: 2, to: 7, label: 'shifted right by 1', tone: 'yellow' }],
          note: 'Old cells 9, 2, 7, 5, 3, 8 each moved one step to the right.',
          legend: [
            { label: 'new value', color: 'var(--green)' },
            { label: 'moved right', color: 'var(--yellow)' }
          ]
        }
      },
      {
        title: { en: 'Deleting shifts everything left', bn: 'ডিলিট করলে বামে সরে' },
        explanation: {
          en: 'Delete index 1 — the 6 we just added. Now there is a hole, so the cells on the right slide **left**.\n\nThe loop runs forwards: `arr[1] = arr[2]`, `arr[2] = arr[3]`, … down to `arr[6] = arr[7]`.\n\nSix moves again, and `n` drops back to 7. The row becomes `[4, 9, 2, 7, 5, 3, 8]`.\n\n> Insert shifts right, delete shifts left. Both cost **O(n)** in the worst case.',
          bn: '১ নম্বর ইনডেক্স মুছে দাও (যে 6 এইমাত্র ঢোকালাম)। এখন ওখানে ফাঁক হলো, তাই ডানের ঘরগুলো **বামে** সরে আসে।\n\nলুপটা সামনের দিকে চলে: `arr[1] = arr[2]`, `arr[2] = arr[3]`, … `arr[6] = arr[7]` পর্যন্ত।\n\nআবারও ছয় বার সরে, `n` ফিরে গেল ৭। সারি হলো `[4, 9, 2, 7, 5, 3, 8]`।\n\n> ইনসার্টে ডানে সরে, ডিলিটে বামে সরে। দুটোই খারাপ কেসে **O(n)** খরচ দেয়।'
        },
        line: [9, 10],
        state: { 'delete at': 1, removed: 6, shifts: 6, n: '8 → 7' },
        scene: {
          kind: 'array',
          label: 'delete index 1 → the hole closes from the right',
          cells: [4, 6, 9, 2, 7, 5, 3, 8],
          showIndex: true,
          highlights: { remove: [1], mark: [2, 3, 4, 5, 6, 7] },
          brackets: [{ from: 1, to: 7, label: 'slide left by 1', tone: 'red' }],
          note: 'The 6 at index 1 is crossed out — cells 2…7 each move one step left.',
          legend: [
            { label: 'deleted', color: 'var(--red)' },
            { label: 'slides left', color: 'var(--yellow)' }
          ]
        }
      },
      {
        title: { en: 'One block of memory', bn: 'একটাই মেমরি ব্লক' },
        explanation: {
          en: 'Right now the row holds 7 boxes, and they live in **one continuous block**.\n\nLook at the addresses: 1000, 1004, 1008, 1012, 1016, 1020, 1024 — each is exactly 4 more than the one before. No gaps, no holes. 7 × 4 = **28 bytes** in one piece.\n\nThat is what **contiguous** means, and it has two consequences:\n\n- index math works, so reads are `O(1)`\n- inserting in the middle is expensive, because the row must stay unbroken',
          bn: 'এই মুহূর্তে সারিতে ৭টা ঘর আছে, আর সবগুলো বসে আছে **একটাই ধারাবাহিক ব্লকে**।\n\nঠিকানাগুলো দেখো: 1000, 1004, 1008, 1012, 1016, 1020, 1024 — প্রতিটা আগের চেয়ে হুবহু ৪ বেশি। কোথাও ফাঁক নেই। ৭ × ৪ = **২৮ বাইট**, এক টুকরো।\n\nএটাই **contiguous (একসাথে সাজানো)** মানে, আর এর দুটো ফল:\n\n- ইনডেক্সের হিসাব বেঁচে থাকে, তাই পড়া `O(1)`\n- মাঝখানে ঢোকানো দামি, কারণ সারিটাকে ভাঙা চলে না'
        },
        line: 0,
        state: { boxes: 7, 'bytes each': 4, total: '28 bytes', 'last address': 1024 },
        scene: {
          kind: 'array',
          label: 'the whole row sits in RAM as ONE piece',
          cells: [4, 9, 2, 7, 5, 3, 8],
          showIndex: false,
          sub: ['1000', '1004', '1008', '1012', '1016', '1020', '1024'],
          highlights: { mark: [0, 1, 2, 3, 4, 5, 6] },
          brackets: [{ from: 0, to: 6, label: '7 boxes × 4 bytes = 28 bytes', tone: 'green' }],
          note: 'The addresses climb by 4 every cell — the row has no holes.',
          caption: 'contiguous = side by side, one unbroken piece'
        }
      },
      {
        title: { en: 'When to use an array (and when not)', bn: 'কখন অ্যারে ব্যবহার, কখন এড়াবে' },
        explanation: {
          en: '**Use an array when:**\n\n- you read by index a lot, or loop from start to end,\n- the size is known, or it only grows at the end,\n- items rarely move.\n\n**Avoid it when:**\n\n- you insert or delete often **in the middle** — every change shifts the rest of the row,\n- the data keeps growing and copying feels wasteful — use a dynamic list (`ArrayList`, Python `list`),\n- you need fast inserts anywhere — a **linked list** does that in O(1).',
          bn: '**অ্যারে ব্যবহার করো যখন:**\n\n- ইনডেক্স ধরে পড়া বেশি, বা শুরু থেকে শেষ পর্যন্ত ঘোরা,\n- আকারটা আগে থেকেই জানা, বা শুধু শেষে বাড়ে,\n- আইটেম খুব কম নড়ে।\n\n**এড়িয়ে চলো যখন:**\n\n- বারবার **মাঝখানে** ইনসার্ট বা ডিলিট করতে হয় — প্রতিবার বাকি সারিটাই সরতে হয়,\n- ডেটা বারবার বাড়ে আর কপি করলে ঝামেলা — তখন dynamic list (`ArrayList`, Python-এর `list`) নাও,\n- যেকোনো জায়গায় দ্রুত ইনসার্ট দরকার — **লিংকড লিস্ট** সেটা O(1)-এ করে।'
        },
        scene: {
          kind: 'array',
          label: { en: 'insert 99 at index 2 → everything after it must shift right', bn: 'ইনডেক্স ২-এ 99 ঢোকাও → এর পরের সবাইকে ডানে সরতে হয়' },
          cells: [3, 7, 99, 9, 12, 15],
          highlights: { insert: [2], swap: [3, 4, 5] },
          brackets: [{ from: 3, to: 5, label: 'shifted right — slow', tone: 'amber' }],
          aux: [{ label: 'reading arr[4] — one jump, fast', cells: [3, 7, 99, 9, 12, 15], highlights: { active: [4] } }],
          note: { en: 'Arrays are <b>fast to read</b>, <b>slow to change in the middle</b>.', bn: 'অ্যারে <b>পড়তে দ্রুত</b>, কিন্তু <b>মাঝখানে বদলাতে ধীর</b>।' }
        }
      }
    ]
  },

  {
    id: 'two-pointers',
    name: { en: 'Two Pointers', bn: 'টু পয়েন্টার' },
    description: {
      en: 'Two fingers walking towards each other',
      bn: 'দুটো আঙুল পরস্পরের দিকে হাঁটে'
    },
    categoryKey: 'arrays',
    level: 'beginner',
    order: 20,
    icon: '🤝',
    complexity: {
      time: 'O(n)',
      best: 'O(1)',
      worst: 'O(n)',
      space: 'O(1)',
      note: {
        en: 'Hard rule: the array must already be sorted. Sorting first costs O(n log n), so sort once and search many times.',
        bn: 'কঠোর নিয়ম: অ্যারেটা আগে থেকেই সাজানো থাকতে হবে। আগে সাজাতে O(n log n) লাগে, তাই একবার সাজিয়ে বারবার খোঁজো।'
      }
    },
    code: {
      en: [
        'twoSumSorted(nums, target):      // nums must be sorted',
        '  left = 0, right = length(nums) - 1',
        '  while left < right:',
        '    sum = nums[left] + nums[right]',
        '    if sum == target:  return (left, right)',
        '    if sum < target:   left = left + 1      // too small',
        '    else:              right = right - 1    // too big',
        '  return none'
      ],
      bn: [
        'twoSumSorted(nums, target):      // nums আগে থেকেই সাজানো',
        '  left = 0, right = length(nums) - 1',
        '  while left < right:',
        '    sum = nums[left] + nums[right]',
        '    if sum == target:  return (left, right)',
        '    if sum < target:   left = left + 1      // খুব ছোট',
        '    else:              right = right - 1    // খুব বড়',
        '  return none'
      ]
    },
    steps: [
      {
        title: { en: 'Find two numbers that add to 23', bn: 'দুটো সংখ্যার যোগ ২৩' },
        explanation: {
          en: 'You get **sorted** numbers and a **target**. Find two different cells whose values add up to the target.\n\nThe lazy way tests every pair. For 7 numbers that is 21 pairs — for 1,000 numbers it is 499,500 pairs. Too slow.\n\nThe smart way: put a finger on each end and walk them towards each other.',
          bn: '**সাজানো (sorted)** সংখ্যা আর একটা **টার্গেট (target)** দেওয়া আছে। দুটো আলাদা ঘরের ভ্যালু যোগ করলে টার্গেট হওয়া দরকার।\n\nভোলার পথ হলো প্রতিটা জোড়া মিলিয়ে দেখা। ৭টা সংখ্যায় ২১টা জোড়া — ১০০০টা সংখ্যায় ৪,৯৯,৫০০টা জোড়া। খুব ধীর।\n\nচতুর পথ: দুই প্রান্তে একটা করে আঙুল রেখে ভেতরের দিকে হাঁটানো।'
        },
        line: 0,
        scene: {
          kind: 'chart',
          label: { en: 'Checks needed to find the pair (1,000 sorted numbers)', bn: 'জোড়া খুঁজতে কতবার দেখতে হয় (১,০০০টা সাজানো সংখ্যা)' },
          max: 499500,
          items: [
            { label: { en: 'Every pair', bn: 'প্রতিটা জোড়া' }, v: 499500, color: 'var(--red)', note: 'O(n²)' },
            { label: { en: 'Two pointers', bn: 'দুই পয়েন্টার' }, v: 999, color: 'var(--green)', note: 'O(n)' }
          ],
          caption: { en: 'two fingers walk inwards and never go back', bn: 'দুটো আঙুল ভেতরের দিকে হাঁটে, কখনো পেছনে যায় না' }
        }
      },
      {
        title: { en: 'A finger at each end', bn: 'প্রান্তে দুই আঙুল' },
        explanation: {
          en: 'Start `left = 0` on the smallest number and `right = 6` on the largest.\n\nEverything between them is still a possible partner. Right now that is the whole array.\n\n> This works only because the array is **sorted** — that is what tells us which finger to move next.',
          bn: '`left = 0` ছোট সংখ্যায়, `right = 6` বড় সংখ্যায় শুরু করলাম।\n\nদুই আঙুলের মাঝের সবকিছু এখনো সম্ভাব্য পার্টনার। এই মুহূর্তে পুরো অ্যারেই।\n\n> এটা কাজ করে কারণ অ্যারেটা **সাজানো (sorted)** — তাই বোঝা যায় কোন আঙুলটা আগে সরবে।'
        },
        line: 1,
        state: { target: 23, left: 0, right: 6, n: 7 },
        scene: {
          kind: 'array',
          label: 'nums (sorted) = [2, 4, 7, 11, 13, 16, 20] · target = 23',
          cells: [2, 4, 7, 11, 13, 16, 20],
          showIndex: true,
          highlights: { mark: [0, 6] },
          pointers: [
            { i: 0, label: 'left', tone: 'cyan' },
            { i: 6, label: 'right', tone: 'amber' }
          ],
          note: 'left points at <b>2</b>, right points at <b>20</b> — both ends are covered.',
          legend: [
            { label: 'left finger', color: 'var(--cyan)' },
            { label: 'right finger', color: 'var(--amber)' }
          ]
        }
      },
      {
        title: { en: 'Round 1 — sum is too small', bn: 'চক্র ১ — যোগফল খুব ছোট' },
        explanation: {
          en: '`sum = nums[0] + nums[6] = 2 + 20 = 22`. The target is 23.\n\n22 is **too small**. To make the sum bigger we must raise the smaller number, so `left` moves up to 1. The right finger stays where it is.\n\n> `sum < target` → `left = left + 1`',
          bn: '`sum = nums[0] + nums[6] = 2 + 20 = 22`। টার্গেট 23।\n\n22 **খুব ছোট**। যোগফল বড় করতে হলে ছোট সংখ্যাটাকে বড় করতে হবে — তাই `left` এগিয়ে ১ হলো। ডান আঙুল যেখানে ছিল, সেখানেই।\n\n> `sum < target` → `left = left + 1`'
        },
        line: 5,
        state: { left: '0 → 1', right: 6, sum: 22, target: 23, verdict: 'too small' },
        scene: {
          kind: 'array',
          label: '2 + 20 = 22  vs  target 23',
          cells: [2, 4, 7, 11, 13, 16, 20],
          showIndex: true,
          highlights: { compare: [0, 6] },
          pointers: [
            { i: 0, label: 'left', tone: 'cyan' },
            { i: 6, label: 'right', tone: 'amber' }
          ],
          note: '22 < 23 → <b>left moves to 1</b>, right stays.',
          legend: [{ label: 'the pair we are testing', color: 'var(--cyan)' }]
        }
      },
      {
        title: { en: 'Round 2 — sum is too big', bn: 'চক্র ২ — যোগফল খুব বড়' },
        explanation: {
          en: 'Now `left = 1`, `right = 6`: `4 + 20 = 24`. The sum is **too big**.\n\nLower the bigger number: `right` drops to 5. Because the array is sorted, the only way down from 20 is to walk leftwards from the end.\n\n> `sum > target` → `right = right - 1`',
          bn: 'এখন `left = 1`, `right = 6`: `4 + 20 = 24`। যোগফল **খুব বড়**।\n\nবড় সংখ্যাটা কমাও: `right` নেমে ৫ হলো। অ্যারে সাজানো, তাই ২০ থেকে নামার একমাত্র পথ শেষ দিক থেকে বামে হাঁটা।\n\n> `sum > target` → `right = right - 1`'
        },
        line: 6,
        state: { left: 1, right: '6 → 5', sum: 24, target: 23, verdict: 'too big' },
        scene: {
          kind: 'array',
          label: '4 + 20 = 24  vs  target 23',
          cells: [2, 4, 7, 11, 13, 16, 20],
          showIndex: true,
          highlights: { compare: [1, 6] },
          pointers: [
            { i: 1, label: 'left', tone: 'cyan' },
            { i: 6, label: 'right', tone: 'amber' }
          ],
          note: '24 > 23 → <b>right moves to 5</b>, left stays.',
          legend: [{ label: 'the pair we are testing', color: 'var(--amber)' }]
        }
      },
      {
        title: { en: 'Round 3 — still too small', bn: 'চক্র ৩ — এখনো ছোট' },
        explanation: {
          en: '`left = 1`, `right = 5`: `4 + 16 = 20`. Too small again → `left` moves to 2.\n\nNotice the pattern: **every round either `left` goes up or `right` goes down**. Nobody ever moves back.\n\nThree rounds, three pointer moves, and the search space has shrunk from 7 cells down to 4.',
          bn: '`left = 1`, `right = 5`: `4 + 16 = 20`। আবারও ছোট → `left` এগিয়ে ২।\n\nধরণটা লক্ষ করো: **প্রতিটা চক্রে `left` ওপরে যায়, নয়তো `right` নিচে নামে**। কেউ কখনো পিছনে যায় না।\n\nতিন চক্র, তিনটা পয়েন্টার মুভ, আর খোঁজার জায়গা কমে ৭ ঘর থেকে ৪ ঘরে।'
        },
        line: 5,
        state: { left: '1 → 2', right: 5, sum: 20, target: 23, verdict: 'too small', rounds: 3 },
        scene: {
          kind: 'array',
          label: '4 + 16 = 20  vs  target 23',
          cells: [2, 4, 7, 11, 13, 16, 20],
          showIndex: true,
          highlights: { compare: [1, 5] },
          pointers: [
            { i: 1, label: 'left', tone: 'cyan' },
            { i: 5, label: 'right', tone: 'amber' }
          ],
          brackets: [{ from: 1, to: 5, label: 'still possible', tone: 'green' }],
          note: '20 < 23 → <b>left moves to 2</b>. Only cells 1…5 can still hold the partner.'
        }
      },
      {
        title: { en: 'Found — the pair (2, 5)', bn: 'পেয়ে গেল — জোড়া (২, ৫)' },
        explanation: {
          en: '`left = 2`, `right = 5`: `7 + 16 = 23` — exactly the target.\n\n**Stop.** Return the indexes `(2, 5)`. `nums[2]` is 7 and `nums[5]` is 16, and 7 + 16 = 23. ✓\n\nOnly four checks were needed instead of 21 pairs.',
          bn: '`left = 2`, `right = 5`: `7 + 16 = 23` — ঠিক টার্গেট।\n\n**থামো।** ইনডেক্স `(2, 5)` রিটার্ন করো। `nums[2]` মান 7, `nums[5]` মান 16, আর 7 + 16 = 23। ✓\n\n২১টা জোড়ার বদলে মাত্র চারটা চেক লাগল।'
        },
        line: 4,
        state: { left: 2, right: 5, sum: 23, target: 23, found: true, result: '(2, 5)', checks: 4 },
        scene: {
          kind: 'array',
          label: '7 + 16 = 23 = target → return (2, 5)',
          cells: [2, 4, 7, 11, 13, 16, 20],
          showIndex: true,
          highlights: { active: [2, 5], dim: [0, 1, 3, 4, 6] },
          pointers: [
            { i: 2, label: 'left', tone: 'green' },
            { i: 5, label: 'right', tone: 'green' }
          ],
          note: 'The answer is indexes <b>2 and 5</b> — 7 and 16 make 23.',
          caption: 'left = 2 · right = 5 ✓ · only 4 checks',
          legend: [{ label: 'the pair', color: 'var(--green)' }]
        }
      },
      {
        title: { en: 'O(n) instead of O(n²)', bn: 'O(n²)-এর বদলে O(n)' },
        explanation: {
          en: '**Cost**\n\n- Brute force checks every pair: `n × (n - 1) / 2`.\n- Two pointers only walks inwards: at most `n - 1` moves.\n- For **n = 100**: 4,950 pair checks versus about **100** checks.\n- Time `O(n)`, extra space `O(1)`.\n\n**Use it when:**\n\n- the data is **sorted** (sort once in `O(n log n)`, then search many times),\n- you must **remove duplicates** from a sorted list,\n- you check a **palindrome** — one finger at each end, meeting in the middle.',
          bn: '**খরচ**\n\n- ব্রুট ফোর্স প্রতিটা জোড়া দেখে: `n × (n - 1) / 2`।\n- টু পয়েন্টার শুধু ভেতরের দিকে হাঁটে: সর্বোচ্চ `n - 1` ধাপ।\n- **n = ১০০** হলে: ৪,৯৫০টা জোড়া চেক বনাম প্রায় **১০০** চেক।\n- সময় `O(n)`, অতিরিক্ত স্পেস `O(1)`।\n\n**কখন ব্যবহার করবে:**\n\n- ডেটা যদি **সাজানো** থাকে (একবার `O(n log n)`-এ সাজিয়ে বারবার খোঁজো),\n- সাজানো তালিকা থেকে **ডুপ্লিকেট বাদ** দিতে হয়,\n- **প্যালিনড্রোম** চেক করতে — দুই প্রান্তে আঙুল, মাঝখানে গিয়ে মিলে যায়।'
        },
        line: 2,
        scene: {
          kind: 'chart',
          label: 'work when n = 100 numbers',
          unit: '',
          max: 4950,
          items: [
            { label: 'O(n²) every pair', v: 4950, color: 'linear-gradient(180deg,#f87171,#dc2626)', note: '100 × 99 / 2' },
            { label: 'O(n) two pointers', v: 100, color: 'linear-gradient(180deg,#34d399,#059669)', note: 'at most n − 1 moves' }
          ],
          note: '4,950 pair checks vs 100 pointer steps — about 50× less work for only 100 numbers.',
          legend: [
            { label: 'brute force', color: 'var(--red)' },
            { label: 'two pointers', color: 'var(--green)' }
          ]
        }
      }
    ]
  },

  {
    id: 'sliding-window',
    name: { en: 'Sliding Window', bn: 'স্লাইডিং উইন্ডো' },
    description: {
      en: 'Keep a small window and slide it forward',
      bn: 'ছোট একটা জানলা রেখে সামনে সরানো'
    },
    categoryKey: 'arrays',
    level: 'intermediate',
    order: 30,
    icon: '🪟',
    complexity: {
      time: 'O(n)',
      best: 'O(n)',
      worst: 'O(n)',
      space: 'O(1)',
      note: {
        en: 'The naive version is O(n × k). The window version touches each cell once: one subtract and one add per slide.',
        bn: 'ভোলা পথ O(n × k)। উইন্ডো পদ্ধতিতে প্রতিটি ঘর একবারই ছুঁয়ে যায়: প্রতি স্লাইডে একটা বিয়োগ, একটা যোগ।'
      }
    },
    code: {
      en: [
        'bestWindow(nums, k, target):   // k = window size, target = goal',
        '  n = length(nums)',
        '  // OPTION 1 — add up every window from zero (slow)',
        '  best = -infinity',
        '  for start = 0 to n - k:',
        '    sum = 0',
        '    for i = start to start + k - 1:  sum = sum + nums[i]',
        '    if sum > best: best = sum',
        '  // OPTION 2 — slide the window, reuse the sum (fast)',
        '  sum = nums[0] + … + nums[k-1]        // k adds, once only',
        '  best = sum',
        '  for start = 1 to n - k:',
        '    sum = sum - nums[start-1] + nums[start+k-1]   // -old +new',
        '    if sum > best: best = sum',
        '  return best',
        '',
        '// VARIABLE size — grow while too small, shrink when too big',
        'start = 0, sum = 0, bestLen = n + 1',
        'for end = 0 to n - 1:',
        '  sum = sum + nums[end]',
        '  while sum >= target:',
        '    bestLen = min(bestLen, end - start + 1)',
        '    sum = sum - nums[start];  start = start + 1',
        'return bestLen'
      ],
      bn: [
        'bestWindow(nums, k, target):   // k = উইন্ডোর আকার, target = লক্ষ্য',
        '  n = length(nums)',
        '  // অপশন ১ — প্রতিটি উইন্ডো শূন্য থেকে যোগ (ধীর)',
        '  best = -infinity',
        '  for start = 0 to n - k:',
        '    sum = 0',
        '    for i = start to start + k - 1:  sum = sum + nums[i]',
        '    if sum > best: best = sum',
        '  // অপশন ২ — উইন্ডো সরিয়ে পুরনো যোগফল ব্যবহার (দ্রুত)',
        '  sum = nums[0] + … + nums[k-1]        // k টা যোগ, একবারই',
        '  best = sum',
        '  for start = 1 to n - k:',
        '    sum = sum - nums[start-1] + nums[start+k-1]   // -পুরনো +নতুন',
        '    if sum > best: best = sum',
        '  return best',
        '',
        '// ভেরিয়েবল সাইজ — ছোট হলে বাড়াও, বেশি হলে ছোট করো',
        'start = 0, sum = 0, bestLen = n + 1',
        'for end = 0 to n - 1:',
        '  sum = sum + nums[end]',
        '  while sum >= target:',
        '    bestLen = min(bestLen, end - start + 1)',
        '    sum = sum - nums[start];  start = start + 1',
        'return bestLen'
      ]
    },
    steps: [
      {
        title: { en: 'Which 3 days got the most rain?', bn: 'কোন ৩ দিনে সবচেয়ে বৃষ্টি?' },
        explanation: {
          en: 'Here is one week of rainfall: **4, 2, 9, 5, 1, 7, 3** mm.\n\nWe want the biggest total for **k = 3** *consecutive* days. The three days must sit side by side — days 0, 1, 2 is one candidate, days 1, 2, 3 is the next.\n\nWith `n = 7` and `k = 3` there are `n - k + 1` = **5 windows**.',
          bn: 'এক সপ্তাহের বৃষ্টির হিসাব: **4, 2, 9, 5, 1, 7, 3** মিমি।\n\nআমরা চাই **k = ৩** দিনের *পরপর* সবচেয়ে বড় যোগফল। তিন দিন হতে হবে পাশাপাশি — ০, ১, ২ নম্বর দিন একটা প্রার্থী, ১, ২, ৩ নম্বর দিন পরেরটা।\n\n`n = ৭` আর `k = ৩` হলে উইন্ডো হয় `n - k + 1` = **৫টা**।'
        },
        line: 0,
        state: { n: 7, k: 3, windows: 5, target: 'biggest sum' },
        scene: {
          kind: 'array',
          label: 'rain[7] = [4, 2, 9, 5, 1, 7, 3] · k = 3',
          cells: [4, 2, 9, 5, 1, 7, 3],
          showIndex: true,
          highlights: { mark: [0, 1, 2] },
          brackets: [{ from: 0, to: 2, label: 'window 1 of 5', tone: 'yellow' }],
          note: 'A window is just a stretch of <b>k</b> cells that slides along the row.',
          caption: '5 windows: 0…2 · 1…3 · 2…4 · 3…5 · 4…6',
          legend: [{ label: 'window (k = 3)', color: 'var(--yellow)' }]
        }
      },
      {
        title: { en: 'The slow way: recompute everything', bn: 'ধীর পথ: সব আবার থেকে যোগ' },
        explanation: {
          en: 'The naive plan adds each window from zero:\n\n- window 0 → 4 + 2 + 9 = **15**\n- window 1 → 2 + 9 + 5 = **16**\n- window 2 → 9 + 5 + 1 = **15**\n- window 3 → 5 + 1 + 7 = **13**\n- window 4 → 1 + 7 + 3 = **11**\n\nThat is 5 windows × 3 adds = **15 adds**. For `n = 1,000` and `k = 100` the rule of thumb `n × k` gives about **100,000** adds — that is `O(n × k)`.',
          bn: 'সোজা পরিকল্পনা — প্রতিটা উইন্ডো শূন্য থেকে যোগ করা:\n\n- উইন্ডো ০ → 4 + 2 + 9 = **15**\n- উইন্ডো ১ → 2 + 9 + 5 = **16**\n- উইন্ডো ২ → 9 + 5 + 1 = **15**\n- উইন্ডো ৩ → 5 + 1 + 7 = **13**\n- উইন্ডো ৪ → 1 + 7 + 3 = **11**\n\n৫ উইন্ডো × ৩টা যোগ = **১৫টা যোগ**। `n = ১০০০` আর `k = ১০০` হলে `n × k` হিসেবে প্রায় **১,০০,০০০** বার যোগ — এটাই `O(n × k)`।'
        },
        line: 6,
        state: { n: 7, k: 3, windows: 5, adds: 15, cost: 'O(n × k)' },
        scene: {
          kind: 'array',
          label: 'every window is added again from 0',
          cells: [4, 2, 9, 5, 1, 7, 3],
          showIndex: true,
          highlights: { mark: [0, 1, 2] },
          brackets: [{ from: 0, to: 2, label: 'window 1 · 4+2+9 = 15', tone: 'yellow' }],
          aux: [
            { label: 'sum of the window starting at index', cells: [15, 16, 15, 13, 11], showIndex: true, highlights: { active: [1] } }
          ],
          note: 'The same three numbers are added over and over — that is the waste.',
          legend: [{ label: 'biggest sum so far = 16', color: 'var(--green)' }]
        }
      },
      {
        title: { en: 'Compute the first window once', bn: 'প্রথম উইন্ডো একবারই যোগ করো' },
        explanation: {
          en: 'Start with the first window: `4 + 2 + 9 = 15`. Keep it in `sum` and copy it into `best`.\n\nThat is `k` = 3 adds, done **once**.\n\n> The whole trick of this lesson: never add those three numbers from scratch again.',
          bn: 'প্রথম উইন্ডোটা নাও: `4 + 2 + 9 = 15`। এটা `sum`-এ রেখে `best`-এ কপি করে দাও।\n\nমাত্র `k` = ৩টা যোগ, একবারই।\n\n> এই পাঠের পুরো কৌশল: ওই তিনটা সংখ্যা আর কখনো শূন্য থেকে যোগ করা যাবে না।'
        },
        line: [9, 10],
        state: { start: 0, end: 2, sum: 15, best: 15 },
        scene: {
          kind: 'array',
          label: 'sum = 4 + 2 + 9 = 15  →  best = 15',
          cells: [4, 2, 9, 5, 1, 7, 3],
          showIndex: true,
          highlights: { active: [0, 1, 2] },
          brackets: [{ from: 0, to: 2, label: 'sum = 15', tone: 'green' }],
          pointers: [
            { i: 0, label: 'start', tone: 'cyan' },
            { i: 2, label: 'end', tone: 'amber' }
          ],
          note: 'Three adds — once. From here on we only adjust the number.',
          legend: [{ label: 'inside the window', color: 'var(--yellow)' }]
        }
      },
      {
        title: { en: 'The trick: − old, + new', bn: 'কৌশল: গেলে বাদ, এলে জমা' },
        explanation: {
          en: 'Slide the window one cell to the right. It now covers indexes **1 … 3**.\n\nOnly two cells changed:\n\n- **4 leaves** — it is no longer inside the window\n- **5 enters** — the new cell on the right\n\nSo the new sum is `15 − 4 + 5 = 16`. **Two arithmetic steps instead of three adds.**',
          bn: 'উইন্ডোটাকে এক ঘর ডানে সরাও। এখন এটা **১ … ৩** নম্বর ইনডেক্স জুড়ে আছে।\n\nবদলেছে শুধু দুটো ঘর:\n\n- **৪ বেরিয়ে গেল** — ভেতরে আর নেই\n- **৫ ঢুকেছে** — ডান পাশের নতুন ঘর\n\nতাই নতুন যোগফল `15 − 4 + 5 = 16`। **তিনটা যোগের বদলে মাত্র দুটো অপারেশন।**'
        },
        line: 12,
        state: { 'left out': 4, 'right in': 5, sum: '15 → 16', ops: 2 },
        scene: {
          kind: 'array',
          label: 'window slides from 0…2 to 1…3',
          cells: [4, 2, 9, 5, 1, 7, 3],
          showIndex: true,
          highlights: { remove: [0], insert: [3], mark: [1, 2] },
          brackets: [{ from: 1, to: 3, label: 'new window', tone: 'green' }],
          pointers: [
            { i: 1, label: 'start', tone: 'cyan' },
            { i: 3, label: 'end', tone: 'amber' }
          ],
          note: '4 slides out, 5 slides in → <b>15 − 4 + 5 = 16</b>.',
          legend: [
            { label: 'leaves', color: 'var(--red)' },
            { label: 'enters', color: 'var(--green)' }
          ]
        }
      },
      {
        title: { en: 'Compare with the best', bn: 'সেরার সঙ্গে তুলনা' },
        explanation: {
          en: '`sum = 16` is bigger than `best = 15`, so `best` becomes **16**.\n\nThe window now covers indexes 1 … 3, and `2 + 9 + 5 = 16`. Nothing had to be recomputed — we reused the old sum.\n\n> Every slide costs exactly **one subtract and one add**, no matter how big `k` is.',
          bn: '`sum = 16`, `best = 15` চেয়ে বড়, তাই `best` হলো **16**।\n\nউইন্ডো এখন ইনডেক্স ১ … ৩, আর `2 + 9 + 5 = 16`। কিছুই নতুন করে যোগ করতে হয়নি — পুরনো যোগফলটাই ব্যবহার করলাম।\n\n> প্রতিটা স্লাইডে লাগে হুবহু **একটা বিয়োগ, একটা যোগ**, `k` যত বড়ই হোক।'
        },
        line: 13,
        state: { start: 1, end: 3, sum: 16, best: 16 },
        scene: {
          kind: 'array',
          label: 'sum = 16  >  best = 15  →  best = 16',
          cells: [4, 2, 9, 5, 1, 7, 3],
          showIndex: true,
          highlights: { active: [1, 2, 3], dim: [0, 4, 5, 6] },
          brackets: [{ from: 1, to: 3, label: 'sum = 16 → new best', tone: 'green' }],
          pointers: [
            { i: 1, label: 'start', tone: 'cyan' },
            { i: 3, label: 'end', tone: 'amber' }
          ],
          note: '2 + 9 + 5 = 16 — the biggest sum so far.',
          legend: [{ label: 'inside the window', color: 'var(--yellow)' }]
        }
      },
      {
        title: { en: 'Finish the run', bn: 'শেষ পর্যন্ত চালাও' },
        explanation: {
          en: 'Three more slides, all using the same two-step trick:\n\n- → indexes 2 … 4: `16 − 2 + 1 = 15` (not better)\n- → indexes 3 … 5: `15 − 9 + 7 = 13`\n- → indexes 4 … 6: `13 − 5 + 3 = 11`\n\nNothing beats 16, so the answer is **best = 16** from indexes **1 … 3**.\n\nTotal work: 3 adds for the first window + 4 slides × 2 = **11 steps** for the whole array.',
          bn: 'আরও তিন স্লাইড, একই দুই-ধাপের কৌশলে:\n\n- → ইনডেক্স ২ … ৪: `16 − 2 + 1 = 15` (বেশি নয়)\n- → ইনডেক্স ৩ … ৫: `15 − 9 + 7 = 13`\n- → ইনডেক্স ৪ … ৬: `13 − 5 + 3 = 11`\n\n১৬-কে কেউ হারাতে পারেনি, তাই উত্তর **best = 16**, ইনডেক্স **১ … ৩** থেকে।\n\nমোট কাজ: প্রথম উইন্ডোর ৩টা যোগ + ৪ স্লাইড × ২ = পুরো অ্যারে জুড়ে **১১ ধাপ**।'
        },
        line: 14,
        state: { best: 16, at: '1 … 3', windows: 5, steps: 11 },
        scene: {
          kind: 'array',
          label: 'all 5 windows checked in one pass',
          cells: [4, 2, 9, 5, 1, 7, 3],
          showIndex: true,
          highlights: { active: [1, 2, 3], dim: [0, 4, 5, 6] },
          brackets: [{ from: 1, to: 3, label: 'winner · sum = 16', tone: 'green' }],
          aux: [
            { label: 'sum of each window', cells: [15, 16, 15, 13, 11], showIndex: true, highlights: { active: [1] } }
          ],
          note: 'Window sums: 15, <b>16</b>, 15, 13, 11 — 16 is the biggest.',
          caption: 'answer: indexes 1 … 3 · best = 16'
        }
      },
      {
        title: { en: 'When the window can change size', bn: 'উইন্ডোর আকার বদলালে' },
        explanation: {
          en: 'Sometimes `k` is not fixed. Example: find the **shortest** run of neighbours whose sum reaches `target = 8`.\n\nOnly two moves:\n\n- **grow** `end` while `sum` < target\n- **shrink** `start` while `sum` ≥ target — maybe a shorter answer exists\n\nWith `nums = [3, 1, 2, 5]`: grow to indexes 0 … 3 → `sum = 11` (record length 4). Shrink: `11 − 3 = 8` ≥ 8 → record length **3**. Shrink again: `8 − 1 = 7` < 8 → stop.\n\nAnswer: indexes **1 … 3** (`1 + 2 + 5 = 8`), length 3.',
          bn: 'কখনো কখনো `k` নির্দিষ্ট থাকে না। উদাহরণ: *পরপর* কয়েকটা সংখ্যার যোগ যদি `target = ৮` ছুঁয়ে যায়, তবে **সবচেয়ে ছোট** অংশটা খুঁজে বের করো।\n\nদুটোই ধাপ:\n\n- `sum` < target হলে `end` **বাড়াও**\n- `sum` ≥ target হলে `start` **ছোট করো** — হয়তো আরও ছোট উত্তর আছে\n\n`nums = [3, 1, 2, 5]` নিয়ে: বাড়াও ০ … ৩ পর্যন্ত → `sum = 11` (দৈর্ঘ্য ৪ লেখা হলো)। ছোট করো: `11 − 3 = 8` ≥ ৮ → দৈর্ঘ্য **৩** লেখা হলো। আবার ছোট করো: `8 − 1 = 7` < ৮ → থামো।\n\nউত্তর: ইনডেক্স **১ … ৩** (`1 + 2 + 5 = 8`), দৈর্ঘ্য ৩।'
        },
        line: [18, 20],
        state: { nums: '[3, 1, 2, 5]', target: 8, 'best window': '1 … 3', sum: 8, bestLen: 3 },
        scene: {
          kind: 'array',
          label: 'variable window · nums = [3, 1, 2, 5] · target = 8',
          cells: [3, 1, 2, 5],
          showIndex: true,
          highlights: { active: [1, 2, 3], dim: [0] },
          brackets: [{ from: 1, to: 3, label: 'sum = 8 ✓ · length 3', tone: 'green' }],
          pointers: [
            { i: 1, label: 'start', tone: 'cyan' },
            { i: 3, label: 'end', tone: 'amber' }
          ],
          note: 'Snapshot at sum = 8: the window is 1 … 3 → record length 3. One more shrink gives 7 < 8, so this stays the answer.',
          legend: [
            { label: 'inside the window', color: 'var(--yellow)' },
            { label: 'already dropped', color: 'var(--border-bright)' }
          ]
        }
      },
      {
        title: { en: 'O(n) instead of O(n × k)', bn: 'O(n × k)-এর বদলে O(n)' },
        explanation: {
          en: '**Cost of the fixed-size window**\n\n- Naive: every window adds `k` numbers → `O(n × k)`.\n- Sliding: one pass, one subtract and one add per slide → **`O(n)`**, extra space `O(1)`.\n- For `n = 1,000` and `k = 100`: about 100,000 adds versus about **1,000** steps.\n\n**Use it when:**\n\n- the answer is a **contiguous stretch** of the array,\n- k is fixed: biggest or average of k neighbours, longest substring with at most k distinct letters,\n- the size varies: shortest subarray with sum ≥ target, longest window without a repeated character.',
          bn: '**ফিক্সড সাইজ উইন্ডোর খরচ**\n\n- ভোলা পথ: প্রতিটা উইন্ডোতে `k` সংখ্যা যোগ → `O(n × k)`।\n- স্লাইডিং: এক পাস, প্রতি স্লাইডে একটা বিয়োগ আর একটা যোগ → **`O(n)`**, অতিরিক্ত স্পেস `O(1)`।\n- `n = ১০০০` আর `k = ১০০` হলে: প্রায় ১,০০,০০০ বার যোগ বনাম প্রায় **১,০০০** ধাপ।\n\n**কখন ব্যবহার করবে:**\n\n- উত্তরটা অ্যারের **একটানা একটা অংশ** হয়,\n- k নির্দিষ্ট থাকে: k পাশের সংখ্যার সেরা বা গড়, k অক্ষরের বেশি নয় এমন সবচেয়ে লম্বা সাবস্ট্রিং,\n- আকার বদলায়: যোগ ≥ টার্গেট এমন সবচেয়ে ছোট সাবঅ্যারে, বা ডুপ্লিকেট ছাড়া সবচেয়ে লম্বা উইন্ডো।'
        },
        scene: {
          kind: 'chart',
          label: 'work when n = 1,000 and k = 100',
          unit: '',
          max: 100000,
          items: [
            { label: 'O(n × k) naive', v: 100000, color: 'linear-gradient(180deg,#f87171,#dc2626)', note: 'every window from zero' },
            { label: 'O(n) sliding', v: 1000, color: 'linear-gradient(180deg,#34d399,#059669)', note: 'each cell enters and leaves once' }
          ],
          note: 'Adds or steps needed: 100,000 vs about 1,000 — a 100× cut in work.',
          legend: [
            { label: 'naive', color: 'var(--red)' },
            { label: 'sliding window', color: 'var(--green)' }
          ],
          caption: 'same answer · one pass · O(1) extra memory'
        }
      }
    ]
  }
];
