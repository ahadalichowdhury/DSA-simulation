export const basicsTopics = [
  {
    id: 'what-is-dsa',
    name: { en: 'What is DSA?', bn: 'ডেটা স্ট্রাকচার ও অ্যালগরিদম কী?' },
    description: {
      en: 'The big picture: storing things + step-by-step recipes',
      bn: 'বড় ছবিটা: জিনিসপত্র রাখার নিয়ম + ধাপে ধাপে রেসিপি'
    },
    categoryKey: 'basics',
    level: 'beginner',
    order: 10,
    icon: '🧠',
    complexity: {
      time: '—',
      space: '—',
      note: {
        en: 'Every lesson in this app shows the time and space cost at the end.',
        bn: 'এই অ্যাপের প্রতিটি পাঠের শেষে সময় ও মেমরি খরচ দেখানো থাকে।'
      }
    },
    steps: [
      {
        title: { en: 'You already use DSA every day', bn: 'তুমি প্রতিদিনই DSA ব্যবহার করো' },
        explanation: {
          en: '**Data Structure** = how you store things.\n**Algorithm** = the steps you follow to get an answer.\n\nWhen you open a dictionary, you do **not** read page by page. You jump to the middle, then left or right. That jump-by-jump trick is an algorithm.\n\n> Nothing here is new. We only give names to things you already do.',
          bn: '**ডেটা স্ট্রাকচার** = জিনিসগুলো কীভাবে রাখো।\n**অ্যালগরিদম** = উত্তর পেতে যে ধাপগুলো অনুসরণ করো।\n\nতুমি যখন অভিধান খোলো, তখন পাতা ধরে পড়ো না — মাঝখানে যাও, তারপর বামে বা ডানে যাও। এই "মাঝ থেকে যাওয়ার" কৌশলটাই একটা অ্যালগরিদম।\n\n> এখানে নতুন কিছু নেই। যা তুমি আগে থেকেই করো, তারের নাম দেওয়া হলো মাত্র।'
        },
        scene: {
          kind: 'array',
          label: { en: 'Find "S" in a dictionary: open the middle, drop half', bn: 'ডিকশনারিতে "S" খোঁজা: মাঝখানে খোলো, অর্ধেক বাদ' },
          cells: ['A', 'D', 'G', 'K', 'M', 'P', 'S', 'W'],
          highlights: { active: [3], target: [6], dim: [0, 1, 2] },
          pointers: [{ i: 3, label: 'open here', tone: 'yellow' }],
          note: { en: '<b>Data structure</b> = the sorted pages · <b>algorithm</b> = the jump-to-the-middle rule.', bn: '<b>ডেটা স্ট্রাকচার</b> = সাজানো পাতা · <b>অ্যালগরিদম</b> = মাঝখানে লাফ দেওয়ার নিয়ম।' }
        }
      },
      {
        title: { en: 'Two words, two jobs', bn: 'দুই শব্দ, দুই কাজ' },
        explanation: {
          en: 'Think of a kitchen.\n\nThe **containers** (fridge, boxes, jars) are data structures. The **recipe** you cook is the algorithm.\n\nA good cook picks the right container *and* the right recipe. In programming you do the same: pick where the data lives, then pick the steps to process it.',
          bn: 'একটা রান্নাঘর ভাবো।\n\nযে **পাত্রগুলোতে** খাবার রাখো (ফ্রিজ, বাক্স, শিশি) — ওগুলোই ডেটা স্ট্রাকচার। যে **রেসিপি** ধরে রান্না করো — সেটাই অ্যালগরিদম।\n\nভালো রান্নাও ঠিক পাত্র *এবং* ঠিক রেসিপি দুটোই বেছে নেয়। প্রোগ্রামিংতেও একই কাজ: ডেটা কোথায় রাখবে ঠিক করো, তারপর প্রসেস করার ধাপগুলো ঠিক করো।'
        },
        scene: {
          kind: 'array',
          label: { en: 'the data structure: where the numbers live', bn: 'ডেটা স্ট্রাকচার: সংখ্যাগুলো যেখানে থাকে' },
          cells: [5, 2, 8, 1],
          aux: [{ label: 'after the algorithm “sort” ran on it', cells: [1, 2, 5, 8], highlights: { sorted: [0, 1, 2, 3] } }],
          note: { en: 'Container = the row · recipe = the steps that sorted it.', bn: 'কন্টেইনার = সারি · রেসিপি = যে ধাপগুলো সাজাল।' }
        }
      },
      {
        title: { en: 'Same data, different shape', bn: 'একই ডেটা, আলাদা আকৃতি' },
        explanation: {
          en: 'The same numbers can be stored in many shapes. Each shape is **fast at one job and slow at another**.\n\n- **Array** → super fast to jump to index 5, but inserting in the middle means shifting everything.\n- **Linked list** → inserting is cheap, but to reach item 5 you must walk from the start.\n- **Stack / Queue** → only the ends matter: last-in-first-out, or first-in-first-out.\n\nThere is no "best" shape. There is only the shape that fits the job.',
          bn: 'একই সংখ্যাগুলো অনেক আকৃতিতে রাখা যায়। প্রতিটি আকৃতি **একটা কাজে দ্রুত, আরেকটাতে ধীর**।\n\n- **অ্যারে (array)** → ৫ নম্বর ঘরে তুরন্ত পৌঁছায়, কিন্তু মাঝখানে ঢুকাতে গেলে সবকিছু সরাতে হয়।\n- **লিংকড লিস্ট** → ঢোকানো সস্তা, কিন্তু ৫ নম্বর আইটেমে পৌঁছাতে শুরু থেকে হেঁটে যেতে হয়।\n- **স্ট্যাক / কিউ** → শুধু প্রান্ত গুরুত্বপূর্ণ: শেষে ঢোকা আগে বের, বা প্রথমে ঢোকা আগে বের।\n\nকোনো "সেরা" আকৃতি নেই — কাজে যেটা মানে, সেটাই সেরা।'
        },
        scene: {
          kind: 'array',
          label: { en: 'the same 4 numbers, used in different shapes', bn: 'একই ৪টা সংখ্যা, ভিন্ন ভিন্ন আকারে' },
          cells: [12, 7, 9, 4],
          highlights: { active: [2] },
          pointers: [{ i: 2, label: 'jump to any index', tone: 'cyan' }],
          aux: [
            { label: 'stack — only the top (right end) can be touched', cells: [12, 7, 9, 4], highlights: { active: [3], dim: [0, 1, 2] } },
            { label: 'queue — leave at the front (left), join at the back (right)', cells: [12, 7, 9, 4], highlights: { active: [0], mark: [3], dim: [1, 2] } }
          ],
          note: { en: 'No shape is best — each is fast at one job.', bn: 'কোনো আকারই সেরা নয় — প্রতিটা একটা কাজে দ্রুত।' }
        }
      },
      {
        title: { en: 'Algorithms are just recipes', bn: 'অ্যালগরিদম মানে রেসিপি' },
        explanation: {
          en: 'A recipe is an algorithm when it has three things:\n\n1. **A clear input** — the ingredients (your data).\n2. **Finite steps** — boil, stir, wait. No step repeats forever.\n3. **A result** — the dish (your answer).\n\nComputer algorithms add one more rule: **every step must be so simple that a machine can do it**. No "add a pinch of salt". Just `compare`, `move`, `write`.',
          bn: 'কোনো রেসিপি যদি তিনটা জিনিস রাখে, তাহলে সেটা অ্যালগরিদম:\n\n1. **স্পষ্ট ইনপুট** — উপকরণ (তোমার ডেটা)।\n2. **সীমিত ধাপ** — ফোটাও, নাড়ো, অপেক্ষা করো। কোনো ধাপ চিরকাল ঘুরবে না।\n3. **ফলাফল** — রান্না শেষ ডিশ (তোমার উত্তর)।\n\nকম্পিউটার অ্যালগরিদমে আরেকটা নিয়ম: **প্রতিটি ধাপ এত সহজ হবে যে মেশিন ওটা করতে পারে**। \"এক চিমটে লবণ\" নয় — শুধু `compare`, `move`, `write`।'
        },
        scene: {
          kind: 'array',
          label: { en: 'algorithm “find the biggest”: input → simple steps → output', bn: 'অ্যালগরিদম “সবচেয়ে বড় খোঁজো”: ইনপুট → সহজ ধাপ → আউটপুট' },
          cells: [4, 9, 2, 7],
          highlights: { active: [1], compare: [2] },
          pointers: [{ i: 1, label: 'max', tone: 'yellow' }, { i: 2, label: 'i', tone: 'cyan' }],
          aux: [{ label: 'output', cells: [9], highlights: { sorted: [0] } }],
          note: { en: 'Each step is machine-simple: <b>compare</b>, <b>move</b>, <b>write</b> — and it stops at the end.', bn: 'প্রতিটা ধাপ মেশিনের জন্য সহজ: <b>তুলনা</b>, <b>সরানো</b>, <b>লেখা</b> — আর শেষে থামে।' }
        }
      },
      {
        title: { en: 'Why the "fast" part matters', bn: 'কেন "দ্রুত" হওয়া এত জরুরি' },
        explanation: {
          en: 'On 10 items, a slow algorithm and a fast one feel the same. On **1,000,000 items** they are worlds apart.\n\nA linear search checks all 1,000,000 rows. A binary search needs about **20 checks** — because it throws away half the list every time.\n\nSame machine, same data, **50,000× less work**. That is why we study DSA.',
          bn: '১০টা আইটেমে ধীর অ্যালগরিদম আর দ্রুত অ্যালগরিদম একই মনে হয়। **১০ লাখ (১,০০০,০০০)** আইটেমে পার্থক্যটা আকাশ-পাতাল।\n\nলিনিয়ার সার্চ ১০ লাখ লাইন পর্যন্ত দেখে। বাইনারি সার্চ মাত্র **২০ বার** দেখে — কারণ এটি প্রতিবার তালিকার অর্ধেক ফেলে দেয়।\n\nএকই মেশিন, একই ডেটা, কাজ **৫০,০০০ গুণ কম**। তাই তো DSA শেখা।'
        },
        scene: {
          kind: 'chart',
          label: { en: 'Checks to find one name among 1,000,000', bn: '১০,০০,০০০ নামের মধ্যে একটা খুঁজতে কতবার দেখতে হয়' },
          max: 1000000,
          items: [
            { label: { en: 'Linear search', bn: 'লিনিয়ার সার্চ' }, v: 1000000, color: 'var(--red)', note: { en: 'one by one', bn: 'একে একে' } },
            { label: { en: 'Binary search', bn: 'বাইনারি সার্চ' }, v: 20, color: 'var(--green)', note: { en: 'drops half each time', bn: 'প্রতিবার অর্ধেক বাদ' } }
          ],
          caption: { en: 'same machine, same data — <b>50,000×</b> less work', bn: 'একই মেশিন, একই ডেটা — <b>50,000 গুণ</b> কম কাজ' }
        }
      },
      {
        title: { en: 'Your path: noob → pro', bn: 'তোমার পথ: নবী থেকে প্রো' },
        explanation: {
          en: 'This app follows one order, chapter by chapter:\n\n1. **Arrays & searching** — the basics, loops, indices.\n2. **Sorting** — bubbles, merging, dividing.\n3. **Linked lists, stacks, queues** — pointers and order.\n4. **Hashing** — instant lookups with a clever trick.\n5. **Trees & graphs** — real interview favourites.\n6. **Recursion & DP** — teach the computer to think in smaller pieces.\n\nDo the lessons in order, press **Play**, and watch the animation. That is the whole trick.',
          bn: 'এই অ্যাপটা একটাই ক্রম অনুসরণ করে, অধ্যায় ধরে:\n\n1. **অ্যারে ও সার্চিং** — ভিত্তি, লুপ, ইনডেক্স।\n2. **সর্টিং** — বাবল, মার্জ, ভাগ করে কাজ।\n3. **লিংকড লিস্ট, স্ট্যাক, কিউ** — পয়েন্টার আর ক্রম।\n4. **হ্যাশিং** — চতুর কৌশলে তাৎক্ষণিক খোঁজ।\n5. **ট্রি ও গ্রাফ** — ইন্টারভিউয়ের প্রিয়।\n6. **রিকারশন ও DP** — মেশিনকে ছোট ছোট অংশে ভাবতে শেখানো।\n\nধারাবাহিকভাবে পড়ো, **প্লে** চাপো, অ্যানিমেশন দেখো। ব্যস, এটুকুই কৌশল।'
        },
        scene: {
          kind: 'none',
          title: { en: 'Your path: noob → pro', bn: 'তোমার পথ: নবিশ → প্রো' },
          desc: { en: 'Arrays → sorting → lists, stacks & queues → hashing → trees & graphs → recursion & DP.', bn: 'অ্যারে → সর্টিং → লিস্ট, স্ট্যাক ও কিউ → হ্যাশিং → ট্রি ও গ্রাফ → রিকার্শন ও DP।' }
        }
      }
    ]
  },

  {
    id: 'big-o',
    name: { en: 'Big-O Notation', bn: 'বিগ-ও নোটেশন' },
    description: {
      en: 'How fast does it get as the input grows?',
      bn: 'ইনপুট বাড়লে কাজটা কত দ্রুত বাড়ে?'
    },
    categoryKey: 'basics',
    level: 'beginner',
    order: 20,
    icon: '⏱',
    complexity: {
      time: 'O(f(n))',
      space: 'O(f(n))',
      note: {
        en: 'Big-O describes the WORST-case growth, ignoring machine speed and constants.',
        bn: 'বিগ-ও সবচেয়ে খারাপ অবস্থার (worst case) বৃদ্ধি বোঝায় — মেশিনের গতি আর ধ্রুবক বাদ দিয়ে।'
      }
    },
    code: {
      en: [
        '// how many steps as n grows?',
        'O(1)        constant  → 1 step',
        'O(log n)    logarithm → halves each time',
        'O(n)        linear    → n steps',
        'O(n log n)  log-linear → good sorts',
        'O(n²)       quadratic → every pair'
      ],
      bn: [
        '// n বাড়লে কত ধাপ লাগে?',
        'O(1)        ধ্রুব      → ১ ধাপ',
        'O(log n)    লগারিদম   → প্রতিবার অর্ধেক',
        'O(n)        লিনিয়ার   → n ধাপ',
        'O(n log n)  লগ-লিনিয়ার → ভালো সর্ট',
        'O(n²)       বর্গাকার  → প্রতিটি জোড়া'
      ]
    },
    steps: [
      {
        title: { en: 'What Big-O answers', bn: 'বিগ-ও কী প্রশ্নের উত্তর দেয়' },
        explanation: {
          en: 'Big-O answers one question:\n\n> **"If the input becomes 10× bigger, how much more work do I do?"**\n\nIt does **not** tell you seconds. Your laptop is fast, mine is slow — that is not the point. It tells you how the work **grows**. Growth is what kills programs when data gets real.',
          bn: 'বিগ-ও একটাই প্রশ্নের উত্তর দেয়:\n\n> **"ইনপুট ১০ গুণ বড় হলে, কাজটা কত গুণ বাড়বে?"**\n\nএটা সেকেন্ড বলে না। তোমার ল্যাপটপ দ্রুত, আমার ধীর — সেটা বিষয় নয়। বিগ-ও বলে কাজটা **কীভাবে বাড়ে**। ডেটা বড় হলে ঠিক সেই বৃদ্ধিই প্রোগ্রামকে মেরে দেয়।'
        },
        line: 0,
        scene: {
          kind: 'chart',
          label: { en: 'Input grows 10× (1,000 → 10,000): how much more work?', bn: 'ইনপুট ১০ গুণ বাড়ল (১,০০০ → ১০,০০০): কাজ কত গুণ বাড়ে?' },
          max: 100,
          unit: '×',
          items: [
            { label: 'O(1)', v: 1, color: 'var(--green)', note: { en: 'same', bn: 'একই' } },
            { label: 'O(log n)', v: 1.3, color: 'var(--green)', note: { en: 'barely', bn: 'প্রায় একই' } },
            { label: 'O(n)', v: 10, color: 'var(--amber)', note: { en: '10× more', bn: '১০ গুণ' } },
            { label: 'O(n²)', v: 100, color: 'var(--red)', note: { en: '100× more', bn: '১০০ গুণ' } }
          ]
        }
      },
      {
        title: { en: 'O(1) — constant time', bn: 'O(1) — ধ্রুব সময়' },
        explanation: {
          en: 'No matter if you have 10 rows or 10,000,000 rows, the work is **the same**.\n\n`arr[7]` → the computer knows the exact address, one jump. Done.\n\nStack push, hash lookup, reading a variable — all O(1). This is the dream case.',
          bn: '১০টা লাইন হোক বা ১ কোটি লাইন — কাজটা **একই** থাকে।\n\n`arr[7]` → কম্পিউটার ঠিক ঠিকানাটা জানে, এক ঝাঁপ। ব্যস।\n\nস্ট্যাকে ঢোকানো, হ্যাশ লুকআপ, ভেরিয়েবল পড়া — সবই O(1)। এটাই স্বপ্নের কেস।'
        },
        line: 1,
        state: { rows: '10 or 10,000,000', steps: 1 },
        scene: {
          kind: 'array',
          label: { en: 'arr[7] — one jump, however long the array is', bn: 'arr[7] — অ্যারে যত লম্বাই হোক, এক লাফ' },
          cells: [3, 8, 1, 6, 2, 9, 4, 7, 5, 0],
          highlights: { active: [7] },
          pointers: [{ i: 7, label: 'arr[7]', tone: 'yellow' }],
          note: { en: 'address = start + 7 × box size → no searching needed.', bn: 'ঠিকানা = শুরু + 7 × বক্সের মাপ → খুঁজতে হয় না।' }
        }
      },
      {
        title: { en: 'O(log n) — halving every time', bn: 'O(log n) — প্রতিবার অর্ধেক' },
        explanation: {
          en: 'Open a 1,000-page phone book. You do **not** start at page 1.\n\n1. Jump to the middle → throw away half.\n2. Jump to the middle of what is left → throw away half again.\n3. Repeat.\n\n1,000,000 names → about **20 jumps**. 2,000,000 names → only **21**. That is the magic of halving.',
          bn: '১০০০ পৃষ্ঠার ফোনবুক খেলে তুমি ১ নম্বর পাতা থেকে শুরু করো না।\n\n1. মাঝখানে খুলো → অর্ধেক ফেলে দাও।\n2. বাকি অংশের মাঝামাঝি খুলো → আবার অর্ধেক ফেলে দাও।\n3. এভাবেই চালাও।\n\n১০ লাখ নাম → মাত্র **২০ বার**। ২০ লাখ নাম → **২১ বার**। এখানেই অর্ধেক করে কাজের জাদু।'
        },
        line: 2,
        scene: {
          kind: 'chart',
          label: { en: 'Names left after each jump (phone book of 1,000,000)', bn: 'প্রতি লাফের পর কতগুলো নাম বাকি (১০,০০,০০০ নামের ফোনবুক)' },
          max: 1000000,
          items: [
            { label: 'start', v: 1000000 },
            { label: 'jump 1', v: 500000 },
            { label: 'jump 2', v: 250000 },
            { label: 'jump 3', v: 125000 },
            { label: 'jump 4', v: 62500 },
            { label: 'jump 20', v: 1, color: 'var(--green)', note: { en: 'found', bn: 'পাওয়া গেছে' } }
          ]
        }
      },
      {
        title: { en: 'O(n) — touch every item once', bn: 'O(n) — প্রতিটি আইটেম একবার' },
        explanation: {
          en: 'Double the input, double the work. Linear.\n\nWalking a list, finding a max value, printing everything — each item is visited **once**.\n\nAt one million rows, one million steps. It is honest and predictable, but not magic.',
          bn: 'ইনপুট দ্বিগুণ হলে কাজও দ্বিগুণ। সোজা সম্পর্ক (linear)।\n\nলিস্ট ঘাটা, সর্বোচ্চ মান খোঁজা, সব প্রিন্ট করা — প্রতিটি আইটেম **একবার** দেখা হয়।\n\n১০ লাখ সারি হলে ১০ লাখ ধাপ। এটা সৎ ও অনুমানযোগ্য, কিন্তু জাদু নয়।'
        },
        line: 3,
        scene: {
          kind: 'array',
          label: 'visit each cell once → i = 0 … n-1',
          cells: [42, 17, 8, 93, 5, 31, 64, 22],
          showIndex: true,
          highlights: { active: [4], dim: [0, 1, 2, 3, 5, 6, 7] },
          pointers: [{ i: 4, label: 'i', tone: 'cyan' }],
          note: 'One loop, one pass — **n** steps total.'
        }
      },
      {
        title: { en: 'O(n log n) — the "good enough" sorts', bn: 'O(n log n) — "ভালো-ই" সর্টিং' },
        explanation: {
          en: 'Real sorting algorithms live here: **merge sort**, **quick sort**, **heap sort**.\n\nThey split the list, sort the halves, then merge. Splitting is `log n` rounds, and each round touches `n` items.\n\n1,000,000 items ≈ 20,000,000 steps. Slow to a human, instant to a computer.',
          bn: 'বাস্তব সর্টিং অ্যালগরিদমগুলো এখানে থাকে: **মার্জ সর্ট**, **কুইক সর্ট**, **হিপ সর্ট**।\n\nতারা লিস্টকে ভাগ করে ছোট অংশ সাজায়, তারপর যোগ করে। ভাগ করা `log n` চক্র, প্রতি চক্রে `n` আইটেম ছুঁয়ে যায়।\n\n১০ লাখ আইটেম ≈ ২ কোটি ধাপ। মানুষের কাছে ধীর, কম্পিউটারের কাছে তাৎক্ষণিক।'
        },
        line: 4,
        scene: {
          kind: 'array',
          label: { en: '8 items: log₂8 = 3 rounds, each round touches all 8', bn: '৮টা আইটেম: log₂8 = ৩ রাউন্ড, প্রতি রাউন্ডে ৮টাই ছোঁয়া হয়' },
          cells: [5, 2, 8, 1, 9, 3, 7, 4],
          aux: [
            { label: 'round 1 — sorted pairs', cells: [2, 5, 1, 8, 3, 9, 4, 7] },
            { label: 'round 2 — sorted fours', cells: [1, 2, 5, 8, 3, 4, 7, 9] },
            { label: 'round 3 — all sorted', cells: [1, 2, 3, 4, 5, 7, 8, 9], highlights: { sorted: [0, 1, 2, 3, 4, 5, 6, 7] } }
          ],
          note: { en: '3 rounds × 8 items = 24 steps → n log n.', bn: '৩ রাউন্ড × ৮ আইটেম = ২৪ ধাপ → n log n।' }
        }
      },
      {
        title: { en: 'O(n²) — every pair', bn: 'O(n²) — প্রতিটি জোড়া' },
        explanation: {
          en: 'A loop inside a loop: for every item you look at **every other item**.\n\n10 items → 100 checks. 1,000 items → 1,000,000 checks. 10,000 items → 100,000,000 checks.\n\nBubble sort is O(n²). It is fine for 20 items, painful for 20,000.',
          bn: 'এক লুপের ভেতরে আরেক লুপ: প্রতিটি আইটেমের জন্য **বাকি সব আইটেম** দেখা।\n\n১০টা আইটেম → ১০০ বার চেক। ১০০০টা → ১০ লাখ বার। ১০,০০০টা → ১০ কোটি বার।\n\nবাবল সর্ট O(n²)। ২০টা আইটেমে চলে, ২০,০০০-এ যন্ত্রণা।'
        },
        line: 5,
        scene: {
          kind: 'array',
          label: 'for i … for j … compare every pair',
          cells: [5, 3, 8, 1, 9, 2],
          showIndex: true,
          highlights: { compare: [0, 1], dim: [2, 3, 4, 5] },
          pointers: [
            { i: 0, label: 'i', tone: 'cyan' },
            { i: 1, label: 'j', tone: 'amber' }
          ],
          note: 'With 6 cells this costs 15 checks. With 6,000 cells → 18,000,000.',
          legend: [
            { label: 'i (outer loop)', color: 'var(--cyan)' },
            { label: 'j (inner loop)', color: 'var(--amber)' }
          ]
        }
      },
      {
        title: { en: 'Comparing the growth', bn: 'বৃদ্ধির তুলনা' },
        explanation: {
          en: 'Here is the same n = 64 passed through five complexities:\n\n- O(1) → 1 step\n- O(log n) → 6 steps\n- O(n) → 64 steps\n- O(n log n) → 384 steps\n- O(n²) → 4,096 steps\n\nThe bar chart is the whole lesson: **the shape of growth beats everything**.',
          bn: 'n = ৬৪ ধরে পাঁচটা জটিলতার ফল:\n\n- O(1) → ১ ধাপ\n- O(log n) → ৬ ধাপ\n- O(n) → ৬৪ ধাপ\n- O(n log n) → ৩৮৪ ধাপ\n- O(n²) → ৪,০৯৬ ধাপ\n\nএই বার চার্টটাই পুরো পাঠ: **বৃদ্ধির আকারই সবচেয়ে বড় বিষয়**।'
        },
        scene: {
          kind: 'chart',
          label: 'steps when n = 64',
          unit: '',
          max: 4096,
          items: [
            { label: 'O(1)', v: 1, color: 'linear-gradient(180deg,#34d399,#059669)' },
            { label: 'O(log n)', v: 6, color: 'linear-gradient(180deg,#34d399,#059669)' },
            { label: 'O(n)', v: 64, color: 'linear-gradient(180deg,#22d3ee,#0891b2)' },
            { label: 'O(n log n)', v: 384, color: 'linear-gradient(180deg,#fbbf24,#d97706)' },
            { label: 'O(n²)', v: 4096, color: 'linear-gradient(180deg,#f87171,#dc2626)' }
          ],
          note: 'Green = great · cyan = fine · orange = careful · red = avoid on big data',
          legend: [
            { label: 'great', color: 'var(--green)' },
            { label: 'fine', color: 'var(--cyan)' },
            { label: 'avoid on big data', color: 'var(--red)' }
          ]
        }
      },
      {
        title: { en: 'How to read it in an interview', bn: 'ইন্টারভিউতে কীভাবে বলবে' },
        explanation: {
          en: 'When someone asks "what is the time complexity?", say three things:\n\n1. **Best case** — the luckiest input (already sorted).\n2. **Average case** — typical input.\n3. **Worst case** — the input that hurts most. Big-O usually means this one.\n\nAnd say the space too: extra arrays, recursion depth, hash tables all cost memory.',
          bn: "কেউ যদি জিজ্ঞেস করে \"সময় জটিলতা কত?\" — তিনটা কথা বলো:\n\n1. **সেরা কেস (best)** — সবচেয়ে ভাগ্যবান ইনপুট (আগে থেকেই সাজানো)।\n2. **গড় কেস (average)** — সাধারণ ইনপুট।\n3. **সবচেয়ে খারাপ কেস (worst)** — সবচেয়ে কষ্টকর ইনপুট। বিগ-ও সাধারণত এটাকেই বোঝায়।\n\nস্পেসও বলো: অতিরিক্ত অ্যারে, রিকারশনের গভীরতা, হ্যাশ টেবিল — সবই মেমরি খায়।"
        },
        scene: {
          kind: 'chart',
          label: { en: 'Linear search on 1,000 items — checks needed', bn: '১,০০০ আইটেমে লিনিয়ার সার্চ — কতবার দেখতে হয়' },
          max: 1000,
          items: [
            { label: { en: 'Best', bn: 'সেরা' }, v: 1, color: 'var(--green)', note: { en: 'first item', bn: 'প্রথম আইটেম' } },
            { label: { en: 'Average', bn: 'গড়' }, v: 500, color: 'var(--amber)', note: { en: 'somewhere in the middle', bn: 'মাঝামাঝি কোথাও' } },
            { label: { en: 'Worst', bn: 'সবচেয়ে খারাপ' }, v: 1000, color: 'var(--red)', note: { en: 'last or missing → O(n)', bn: 'শেষে বা নেই → O(n)' } }
          ]
        }
      }
    ]
  }
];
