export const recursionTopics = [
  {
    id: 'recursion',
    name: { en: 'Recursion', bn: 'রিকারশন' },
    description: {
      en: 'A function that calls itself, with a stop rule',
      bn: 'নিজেকে নিজে কল করা ফাংশন, থামার নিয়েও সহ'
    },
    categoryKey: 'recursion',
    level: 'advanced',
    order: 10,
    icon: '🔁',
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      note: {
        en: 'n = how deep you go down. Every level that is still waiting costs one stack frame. A loop does the same job in O(1) extra space.',
        bn: 'n = কত ধাপে নিচে নেমে যাওয়া যায়। যে প্রতিটি ধাপ এখনো অপেক্ষা করছে, তার জন্য একটা করে স্ট্যাক ফ্রেম লাগে। লুপ একই কাজ O(1) অতিরিক্ত স্পেসে করে।'
      }
    },
    code: {
      en: [
        'factorial(n):',
        '  if n == 0:                   // base case — the stop rule',
        '    return 1',
        '  return n * factorial(n - 1)  // recursive case — smaller problem',
        'prod = 1; for i = 1 to n: prod = prod * i   // same answer, with a loop'
      ],
      bn: [
        'factorial(n):',
        '  if n == 0:                   // বেস কেস (base case) — থামার নিয়ম',
        '    return 1',
        '  return n * factorial(n - 1)  // রিকারসিভ কেস — ছোট সমস্যা',
        'prod = 1; for i = 1 to n: prod = prod * i   // একই উত্তর, লুপ দিয়ে'
      ]
    },
    steps: [
      {
        title: { en: 'A doll inside a doll inside a doll', bn: 'একটার ভেতরে আরেকটা, তার ভেতরে আরেকটা' },
        explanation: {
          en: 'Take a **Matryoshka doll**. Open it and there is a smaller copy inside. Open that one and there is a smaller copy again. Same shape every time — only the size shrinks.\n\nAt the very end you find one tiny doll that **does not open**. That is where it stops.\n\n> **Recursion** is exactly this: the same task, done on a smaller copy of itself, with one clear stopping point.',
          bn: '**ম্যাট্রিয়োশকা (Matryoshka)** পুতুল ভাবো। খুললে ভেতরে একটা ছোট কপি। ওটাও খুললে আবার আরেকটা ছোট কপি। প্রতিবার আকৃতি একই — শুধু সাইজ ছোট হতে থাকে।\n\nশেষে এমন একটা ক্ষুদ্র পুতুল পাওয়া যায় যেটা **আর খোলে না**। ওখানেই থেমে যায়।\n\n> **রিকারশন (recursion)** মানে ঠিক এটাই: একই কাজ, নিজেরই ছোট করা অংশে — আর একটা স্পষ্ট থামার নিয়ম।'
        },
        scene: {
          kind: 'stack',
          label: { en: 'each call opens a smaller copy of the same task', bn: 'প্রতিটা কল একই কাজের একটা ছোট কপি খোলে' },
          items: ['open(doll 1)', 'open(doll 2)', 'open(doll 3)', 'open(doll 4) ✋'],
          highlights: { active: [3] },
          pointers: [{ i: 3, label: 'does not open → stop', tone: 'green' }],
          note: { en: 'Same task · smaller every time · one clear stop.', bn: 'একই কাজ · প্রতিবার ছোট · একটা নির্দিষ্ট থামা।' }
        }
      },
      {
        title: { en: 'Two parts: base case + recursive case', bn: 'দুটো অংশ: বেস কেস ও রিকারসিভ কেস' },
        explanation: {
          en: 'Every recursive function has two parts.\n\n1. **Base case** — the stop rule. The smallest input, answered directly, with no further call.\n2. **Recursive case** — the function calls **itself** with a smaller input, trusting that the smaller call will answer.\n\n> Miss the base case and the function calls itself forever.',
          bn: 'প্রতিটা রিকারসিভ ফাংশনে দুটো অংশ থাকে।\n\n1. **বেস কেস (base case)** — থামার নিয়ম। সবচেয়ে ছোট ইনপুটটা সরাসরি উত্তর দেওয়া হয়, আর কোনো নতুন কল হয় না।\n2. **রিকারসিভ কেস (recursive case)** — ফাংশনটা **নিজেকেই** আরও ছোট ইনপুট দিয়ে কল করে, আশা করে ছোট কলটা উত্তর দেবে।\n\n> বেস কেস বাদপড়লে ফাংশনটা চিরকাল নিজেকেই কল করতে থাকে।'
        },
        line: [1, 3],
        state: { 'base case': 'if n == 0 → return 1', 'recursive case': 'n * factorial(n-1)' },
        scene: {
          kind: 'stack',
          label: { en: 'fact(3): recursive cases pile up until the base case answers', bn: 'fact(3): বেস কেস উত্তর না দেওয়া পর্যন্ত রিকার্সিভ কেস জমে' },
          items: ['fact(3) = 3 × fact(2)', 'fact(2) = 2 × fact(1)', 'fact(1) = 1 × fact(0)', 'fact(0) = 1'],
          highlights: { sorted: [3], active: [0, 1, 2] },
          pointers: [{ i: 3, label: 'base case', tone: 'green' }, { i: 1, label: 'recursive case', tone: 'yellow' }],
          note: { en: 'Without the green base case the pile would never stop growing.', bn: 'সবুজ বেস কেস না থাকলে স্তূপ বাড়তেই থাকত।' }
        }
      },
      {
        title: { en: 'Worked out: 5! = 120', bn: 'হিসাব করে দেখো: 5! = 120' },
        explanation: {
          en: '`5!` (read "5 factorial") means: multiply 5 down to 1.\n\n- 5\n- 5 × 4 = 20\n- 20 × 3 = 60\n- 60 × 2 = 120\n- 120 × 1 = **120**\n\nRecursion asks the same question in the other order: `5! = 5 × 4!`, and `4! = 24`, so `5 × 24 = 120`. The **running product** row under the numbers shows 5, 20, 60, 120, 120 — the glowing cell is the final **120**.',
          bn: '`5!` (এটাকে "ফ্যাক্টোরিয়াল" বলে) মানে: 5 থেকে 1 পর্যন্ত সব সংখ্যা গুণ করা।\n\n- 5\n- 5 × 4 = 20\n- 20 × 3 = 60\n- 60 × 2 = 120\n- 120 × 1 = **120**\n\nরিকারশন একই প্রশ্ন উল্টো ক্রমে করে: `5! = 5 × 4!`, আর `4! = 24`, তাই `5 × 24 = 120`। সংখ্যাগুলোর নিচের **রানিং প্রোডাক্ট** সারিটা দেখায় 5, 20, 60, 120, 120 — কাঁপানো ঘরটাই শেষ উত্তর **120**।'
        },
        line: 3,
        state: { '5!': 120, '4!': 24, '1!': 1, '0!': 1 },
        scene: {
          kind: 'array',
          label: '5! = 5 × 4 × 3 × 2 × 1',
          cells: [5, 4, 3, 2, 1],
          brackets: [{ from: 0, to: 4, label: 'multiply them all', tone: 'green' }],
          aux: [
            { label: 'running product', cells: [5, 20, 60, 120, 120], highlights: { active: [4] } }
          ],
          note: '5! = **120** · and 0! = 1 by definition — that is the base case.',
          legend: [{ label: 'the factors', color: 'var(--cyan)' }]
        }
      },
      {
        title: { en: 'The call stack grows: push, push, push', bn: 'কল স্ট্যাকে push, একের পর এক' },
        explanation: {
          en: 'Computing `fact(5)` does not finish in one go. It waits for `fact(4)`, which waits for `fact(3)`, and so on.\n\nEvery new call is **pushed** on top of the call stack:\n\n- `main()` was already there\n- push `fact(5)`, then `fact(4)`, `fact(3)`, `fact(2)`, `fact(1)`, `fact(0)`\n\nNow the stack is **7 frames** tall. `fact(0)` sits on top and it is the only one that can act — every frame below is frozen, waiting for the answer from above.',
          bn: '`fact(5)` একবারেই শেষ হয় না। ওটা `fact(4)`-এর উত্তরের অপেক্ষা করে, ওটা `fact(3)`-এর — এভাবেই চলতে থাকে।\n\nপ্রতিটা নতুন কল **push** হয়ে কল স্ট্যাকের সবার ওপরে চড়ে:\n\n- `main()` আগে থেকেই ছিল\n- তারপর `fact(5)`, `fact(4)`, `fact(3)`, `fact(2)`, `fact(1)`, `fact(0)` — সবই push\n\nএখন স্ট্যাক **৭টা ফ্রেম** উঁচু। সবার ওপরে `fact(0)` — সেটাই একমাত্রটা যেটা এখন কাজ করতে পারে; নিচের সব ফ্রেম জমে আছে, ওপরের উত্তরের জন্য অপেক্ষা করে।'
        },
        line: 3,
        state: { n: 0, frames: 7, 'base case hit': true },
        scene: {
          kind: 'stack',
          label: 'call stack · bottom = oldest frame',
          items: ['main()', 'fact(5)', 'fact(4)', 'fact(3)', 'fact(2)', 'fact(1)', 'fact(0)'],
          highlights: { active: [6] },
          pointers: [{ i: 6, label: 'top', tone: 'yellow' }],
          note: 'Seven frames, and not one of them has returned yet.'
        }
      },
      {
        title: { en: 'Answers travel back up the stack', bn: 'উত্তরগুলো স্ট্যাকে ওপরে ফেরে' },
        explanation: {
          en: '`fact(0)` hits `n == 0` and returns **1** right away. Now every frame can finish, one by one, **popping** off the top:\n\n- `fact(1)` = 1 × 1 = **1** → pop\n- `fact(2)` = 2 × 1 = **2** → the red frame leaving right now\n- then `fact(3)` = 6, `fact(4)` = 24, `fact(5)` = 120\n\nThe picture catches the moment after three answers came back: **1, 1, 2**. Five frames are left, and `fact(2)` is handing its value up as we watch.',
          bn: '`fact(0)` `n == 0` দেখেই **1** ফেরত দেয়। এবার এক এক করে সব ফ্রেম শেষ হয়, ওপরের দিকে **pop** করে বের হয়:\n\n- `fact(1)` = 1 × 1 = **1** → pop\n- `fact(2)` = 2 × 1 = **2** → লাল ফ্রেমটাই এখন বের হচ্ছে\n- এরপর `fact(3)` = 6, `fact(4)` = 24, `fact(5)` = 120\n\nছবিটা ঠিক সেই মুহূর্তে ধরা: তিনটা উত্তর ফেরত এসেছে — **1, 1, 2**। পাঁচটা ফ্রেম বাকি, আর `fact(2)` তার মানটা ওপরে তুলে দিচ্ছে।'
        },
        line: 3,
        state: { n: 2, returned: '1, 1, 2', frames: 5 },
        scene: {
          kind: 'stack',
          label: 'call stack · unwinding',
          items: ['main()', 'fact(5)', 'fact(4)', 'fact(3)', 'fact(2)'],
          highlights: { remove: [4] },
          pointers: [{ i: 4, label: 'popping', tone: 'red' }],
          aux: [
            { label: 'answers returned so far', items: [1, 1, 2], highlights: { active: [2] } }
          ],
          note: 'Five frames left · three answers already back.'
        }
      },
      {
        title: { en: 'Delete the base case: stack overflow', bn: 'বেস কেস বাদ দিলে: স্ট্যাক ওভারফ্লো' },
        explanation: {
          en: 'Take away `if n == 0: return 1` and nothing stops.\n\n`fact(5)` calls `fact(4)`, which calls `fact(3)`… but now it keeps going past zero: `-1`, `-2`, `-3`… The stack grows and **nothing ever pops**.\n\nSoon the memory is full and the program dies with **stack overflow** (Python says `RecursionError`).\n\n> A recursive function with no base case is a `while(true)` that eats memory.',
          bn: '`if n == 0: return 1` সরিয়ে ফেলো — তাহলে থামার কেউ নেই।\n\n`fact(5)` → `fact(4)` → `fact(3)`… কিন্তু এবার শূন্যের পরেও চলতে থাকে: `-1`, `-2`, `-3`… স্ট্যাক বাড়তেই থাকে আর **কিছুই pop হয় না**।\n\nকিছুক্ষণে মেমরি শেষ, প্রোগ্রাম **স্ট্যাক ওভারফ্লো (stack overflow)** দিয়ে মরে — পাইথনে বলে `RecursionError`।\n\n> বেস কেস ছাড়া রিকারশন মানে মেমরি খেয়ে যাওয়া একটা `while(true)`।'
        },
        line: [1, 2],
        state: { n: -3, 'base case': 'missing', result: 'crash' },
        scene: {
          kind: 'stack',
          label: { en: 'no base case: fact(n) keeps calling past zero', bn: 'বেস কেস নেই: fact(n) শূন্য পেরিয়েও ডাকতে থাকে' },
          items: ['fact(3)', 'fact(2)', 'fact(1)', 'fact(0)', 'fact(-1)', 'fact(-2)', 'fact(-3) …'],
          highlights: { target: [4, 5, 6] },
          pointers: [{ i: 6, label: 'stack overflow 💥', tone: 'red' }],
          note: { en: 'Nothing ever pops, so memory fills up and the program crashes.', bn: 'কিছুই pop হয় না, তাই মেমরি ভরে প্রোগ্রাম ক্র্যাশ করে।' }
        }
      },
      {
        title: { en: 'Recursion vs loop — same power, new shape', bn: 'রিকারশন বনাম লুপ — শক্তি এক, আকৃতি আলাদা' },
        explanation: {
          en: 'Here is the very same job done twice.\n\n- **Loop**: the single variable `prod` after each multiply — 5, 20, 60, 120, 120. Nothing is pushed, nothing waits.\n- **Recursion**: six `fact` frames pushed, then six answers travel back — 1, 1, 2, 6, 24, 120.\n\nBoth end at **120**. A loop keeps its state in variables, recursion keeps it in the stack. Any loop can be rewritten as recursion, and the other way round.\n\n> Loops are simpler for flat, repeating work. Recursion shines when the problem itself branches.',
          bn: 'একই কাজ দুইভাবে করে দেখা।\n\n- **লুপ**: প্রতিটি গুণের পর একটাই ভেরিয়েবল `prod` — 5, 20, 60, 120, 120। কিছু ওপরে চড়ে না, কিছু অপেক্ষা করে না।\n- **রিকারশন**: ছয়টা `fact` ফ্রেম push হয়, তারপর ছয়টা উত্তর ওপরে ফেরে — 1, 1, 2, 6, 24, 120।\n\nদুটোরই শেষপ্রান্ত **120**। লুপ অবস্থাটা ভেরিয়েবলে রাখে, রিকারশন স্ট্যাকে। যেকোনো লুপকে রিকারশনে আর রিকারশনকে লুপে বদলানো যায়।\n\n> সোজা, পুনরাবৃত্ত কাজে লুপই সহজ। রিকারশন তখন জমে যায় যখন সমস্যাটাই নিজে থেকেই ডাবল হয়ে শাখা দেয়।'
        },
        line: 4,
        scene: {
          kind: 'array',
          label: 'factors to multiply: 5, 4, 3, 2, 1',
          cells: [5, 4, 3, 2, 1],
          aux: [
            { label: 'loop · prod after each multiply', cells: [5, 20, 60, 120, 120], highlights: { active: [4] } },
            { label: 'recursion · answers coming back', cells: [1, 1, 2, 6, 24, 120], highlights: { active: [5] } }
          ],
          note: 'Same factors on top, same final answer **120** in both rows.',
          legend: [
            { label: 'one variable', color: 'var(--cyan)' },
            { label: 'stack answers', color: 'var(--yellow)' }
          ]
        }
      },
      {
        title: { en: 'Tree recursion: one call becomes many', bn: 'ট্রি রিকারশন: এক কল থেকে অনেক কল' },
        explanation: {
          en: 'Not every recursion walks in a straight line. **Fibonacci** splits into two calls:\n\n`fib(n) = fib(n-1) + fib(n-2)`, with `fib(0) = 0` and `fib(1) = 1`.\n\nSo `fib(5)` asks for `fib(4)` and `fib(3)`, each of them asks for two smaller ones, and the tree keeps spreading. Count the bubbles: **15 calls** for one answer.\n\nThe pulsing bubble on top is the call we made. The little 1s and 0s with nothing under them are base cases — they return immediately.',
          bn: 'সব রিকারশনই সোজা লাইনে চলে না। **ফিবোনাচি (Fibonacci)** দুই ভাগে ভাগ হয়:\n\n`fib(n) = fib(n-1) + fib(n-2)`, যেখানে `fib(0) = 0`, `fib(1) = 1`।\n\nতাই `fib(5)` চায় `fib(4)` আর `fib(3)`, প্রতিটা আবার দুটো ছোট কল চায়, গাছটা এভাবেই ছড়িয়ে পড়ে। বুদবুদ গুনে দেখো: একটা উত্তরে **১৫টা কল**।\n\nওপরের কাঁপাবুদবুদটাই আমাদের কল। নিচে কিছু না থাকা ছোট 1 আর 0 গুলো বেস কেস — ওরা সঙ্গে সঙ্গে উত্তর ফেরত দেয়।'
        },
        scene: {
          kind: 'tree',
          label: 'call tree of <b>fib(5)</b> · 15 calls for one answer',
          root: {
            v: 5,
            l: {
              v: 4,
              l: { v: 3, l: { v: 2, l: { v: 1 }, r: { v: 0 } }, r: { v: 1 } },
              r: { v: 2, l: { v: 1 }, r: { v: 0 } }
            },
            r: {
              v: 3,
              l: { v: 2, l: { v: 1 }, r: { v: 0 } },
              r: { v: 1 }
            }
          },
          highlights: { current: 5 },
          note: 'Every node that is not a leaf spawns two smaller calls.',
          legend: [{ label: 'the call we made', color: 'var(--yellow)' }]
        }
      },
      {
        title: { en: 'The cost — and when recursion wins', bn: 'খরচ কত — আর কখন রিকারশন জিতে' },
        explanation: {
          en: '**Cost**\n- Time `O(n)` — one call per level, so `fact(5)` makes 6 calls.\n- Space `O(n)` — every waiting frame sits in the stack. That is the price of recursion.\n- The loop version does the same job in `O(1)` extra space.\n\n**Recursion wins when**\n- the data is a **tree or a graph** — the shape is already recursive,\n- the problem **divides and conquer**s (merge sort, quick sort),\n- you must **explore and undo** choices (backtracking, mazes, sudoku).\n\n> If a simple loop can write it, write the loop. Reach for recursion when the problem looks like a tree.',
          bn: '**খরচ**\n- সময় `O(n)` — প্রতিটা লেভেলে একটা কল, তাই `fact(5)` করে ৬টা কল।\n- স্পেস `O(n)` — অপেক্ষারত প্রতিটা ফ্রেম স্ট্যাকে বসে আছে। এটাই রিকারশনের দাম।\n- লুপের ভার্সন একই কাজ `O(1)` অতিরিক্ত স্পেসে করে।\n\n**রিকারশন জেতে যখন**\n- ডেটার আকারটাই **ট্রি বা গ্রাফ** — গোড়া থেকেই ওটা রিকারসিভ,\n- সমস্যাকে **ভাগ করে জয়** করতে হয় (মার্জ সর্ট, কুইক সর্ট),\n- পছন্দ করে আবার পিছু হটতে হয় (**backtracking**, ল্যাবিরিন্থ, সুডোকু)।\n\n> সহজ লুপে লেখা যায় লিখে ফেলো। রিকারশন তখনই ধরো, যখন সমস্যাটার আকারটাই গাছের মতো।'
        },
        scene: {
          kind: 'chart',
          label: { en: 'Extra memory for fact(1000)', bn: 'fact(1000)-এর জন্য বাড়তি মেমরি' },
          max: 1000,
          items: [
            { label: { en: 'Loop', bn: 'লুপ' }, v: 1, color: 'var(--green)', note: { en: '1 variable · O(1)', bn: '১টা ভেরিয়েবল · O(1)' } },
            { label: { en: 'Recursion', bn: 'রিকার্শন' }, v: 1000, color: 'var(--amber)', note: { en: '1,000 frames · O(n)', bn: '১,০০০ ফ্রেম · O(n)' } }
          ],
          caption: { en: 'loops for lists · recursion for trees, divide & conquer, backtracking', bn: 'লিস্টে লুপ · ট্রি, ভাগ করে জয় আর ব্যাকট্র্যাকিং-এ রিকার্শন' }
        }
      }
    ]
  },

  {
    id: 'fib-memo',
    name: { en: 'Memoization & Dynamic Programming', bn: 'মেমোয়াইজেশন ও ডাইনামিক প্রোগ্রামিং' },
    description: {
      en: 'Never solve the same sub-problem twice',
      bn: 'একই ছোট প্রশ্ন দুইবার কখনো সমাধান করো না'
    },
    categoryKey: 'recursion',
    level: 'advanced',
    order: 20,
    icon: '🐇',
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      note: {
        en: 'Memoized fib(n) does about 2n-1 calls (99 for n = 50) instead of 40,730,022,147. Keep only two variables and the space drops to O(1).',
        bn: 'মেমো লাগানো fib(n) প্রায় 2n-1 বার কল হয় (n = 50 হলে ৯৯ বার), আর বিনা মেমোতে 40,730,022,147 বার। শুধু দুটো ভেরিয়েবল রাখলে স্পেস হয়ে যায় O(1)।'
      }
    },
    code: {
      en: [
        'fib(n, memo):',
        '  if n <= 1: return n                        // base case',
        '  if memo[n] is set: return memo[n]          // cache hit',
        '  memo[n] = fib(n-1, memo) + fib(n-2, memo)  // store the answer',
        '  return memo[n]',
        'for i = 2 to n: memo[i] = memo[i-1] + memo[i-2]   // bottom-up'
      ],
      bn: [
        'fib(n, memo):',
        '  if n <= 1: return n                        // বেস কেস',
        '  if memo[n] is set: return memo[n]          // মেমো হিট — নতুন কাজ নেই',
        '  memo[n] = fib(n-1, memo) + fib(n-2, memo)  // উত্তরটা মেমোতে রাখো',
        '  return memo[n]',
        'for i = 2 to n: memo[i] = memo[i-1] + memo[i-2]   // নিচ থেকে ভরা'
      ]
    },
    steps: [
      {
        title: { en: 'The naive version repeats itself', bn: 'সাধারণ ভার্সনটা নিজেকেই বারবার করে' },
        explanation: {
          en: '`fib(n) = fib(n-1) + fib(n-2)`, with `fib(0) = 0` and `fib(1) = 1`.\n\nWritten naively, `fib(5)` builds this tree of calls: **15 bubbles** — but only **6 different problems**, `fib(5)` down to `fib(0)`.\n\nLook at the colours. `fib(2)` is computed **3 times** (cyan) and `fib(3)` **twice** (green). We keep solving the same small question again and again.',
          bn: '`fib(n) = fib(n-1) + fib(n-2)`, যেখানে `fib(0) = 0`, `fib(1) = 1`।\n\nযেভাবে সাধারণভাবে লেখা, `fib(5)` এই কলের গাছটা বানায়: **১৫টা বুদবুদ** — অথচ **মাত্র ৬টা আলাদা সমস্যা**, `fib(5)` থেকে `fib(0)`।\n\nরঙগুলো দেখো। `fib(2)` **৩ বার** হিসাব হচ্ছে (সায়ান), `fib(3)` **দুইবার** (সবুজ)। এক ছোট প্রশ্নই বারবার করা হচ্ছে।'
        },
        line: 0,
        state: { calls: 15, 'distinct problems': 6 },
        scene: {
          kind: 'tree',
          label: 'naive <b>fib(5)</b> — 15 calls, 6 distinct sub-problems',
          root: {
            v: 5,
            l: {
              v: 4,
              l: { v: 3, l: { v: 2, l: { v: 1 }, r: { v: 0 } }, r: { v: 1 } },
              r: { v: 2, l: { v: 1 }, r: { v: 0 } }
            },
            r: {
              v: 3,
              l: { v: 2, l: { v: 1 }, r: { v: 0 } },
              r: { v: 1 }
            }
          },
          highlights: { active: [2], visited: [3] },
          note: 'Same sub-problems, solved again and again from scratch.',
          legend: [
            { label: 'fib(2) — computed 3×', color: 'var(--cyan)' },
            { label: 'fib(3) — computed 2×', color: 'var(--green)' }
          ]
        }
      },
      {
        title: { en: 'Count the wasted work: fib(50)', bn: 'অপচয়ের হিসাব: fib(50)' },
        explanation: {
          en: 'The tree grows fast. For `fib(50)` the naive code makes **40,730,022,147 calls** — more than 40 billion. Even at 100,000,000 calls per second that is about **7 minutes** of pure repeating.\n\nThe memoized version makes **99 calls**, and only 51 of them are real work (one computation for each value from 0 to 50).\n\n> Same answer, about **400 million times** less work.',
          bn: 'গাছটা দ্রুত বড় হয়। `fib(50)`-এ সাধারণ কোড **40,730,022,147 বার** কল করে — ৪০ বিলিয়নের বেশি। সেকেন্ডে ১০ কোটি কল ধরলেও ওটা প্রায় **৭ মিনিট** শুধু একই কাজ করে।\n\nমেমো লাগানো ভার্সন **৯৯ বার** কল করে, তার মধ্যে আসল হিসাব মাত্র ৫১টা (০ থেকে ৫০, এক একটা মান)।\n\n> একই উত্তর, কাজ প্রায় **৪০ কোটি গুণ কম**।'
        },
        line: 0,
        state: { 'naive calls': 40730022147, 'memo calls': 99, 'real computations': 51 },
        scene: {
          kind: 'chart',
          label: 'calls made for <b>fib(50)</b>',
          unit: '',
          max: 40730022147,
          items: [
            { label: 'naive', v: 40730022147, color: 'linear-gradient(180deg,#f87171,#dc2626)', note: 'fib(50) with no memo' },
            { label: 'memo', v: 99, color: 'linear-gradient(180deg,#34d399,#059669)', note: 'fib(50) with a memo table' }
          ],
          note: 'The green bar exists — it is only about 0.0000002% of the red one.',
          legend: [
            { label: 'naive (no memo)', color: 'var(--red)' },
            { label: 'memoized', color: 'var(--green)' }
          ]
        }
      },
      {
        title: { en: 'The idea: write the answer down', bn: 'আইডিয়াটা: উত্তরটা লিখে রাখো' },
        explanation: {
          en: 'Every time a small problem finishes, we **remember** its answer in a table called **memo**.\n\nNext time the same question comes up, we read the table instead of recomputing. That read is a **cache hit** — instant, and it stops the whole tree from growing.\n\n> **Dynamic Programming** = break a big problem into small pieces **and** never solve the same piece twice.',
          bn: 'ছোট সমস্যাটা যখনই শেষ হয়, উত্তরটা **মনে রেখে** দাও — একটা টেবিলে, যার নাম **মেমো (memo)**।\n\nএকই প্রশ্ন আবার এলে টেবিল থেকে পড়ে নাও, আবার হিসাব করো না। এই পড়াটাই **ক্যাশ হিট (cache hit)** — সঙ্গে সঙ্গে, আর পুরো গাছটা বাড়ানোই বন্ধ হয়ে যায়।\n\n> **ডাইনামিক প্রোগ্রামিং (DP)** = বড় সমস্যাকে ছোট ছোট অংশে ভাগ করা **এবং** একই অংশ দুইবার কখনো সমাধান না করা।'
        },
        line: [2, 3],
        scene: {
          kind: 'array',
          label: { en: 'memo table: memo[n] = fib(n), written once', bn: 'মেমো টেবিল: memo[n] = fib(n), একবারই লেখা' },
          cells: [0, 1, 1, 2, 3, 5, 8],
          highlights: { sorted: [0, 1, 2, 3, 4, 6], compare: [5] },
          pointers: [{ i: 5, label: 'cache hit', tone: 'cyan' }],
          note: { en: 'fib(5) asked again? Read memo[5] = 5 — zero new work.', bn: 'আবার fib(5) চাইলে? memo[5] = 5 পড়ো — নতুন কোনো কাজ নেই।' }
        }
      },
      {
        title: { en: 'Fill the memo from the bottom', bn: 'নিচ থেকে মেমো ভরা' },
        explanation: {
          en: 'Now `fib(5)` runs with an empty memo. It dives to the bottom first:\n\n- `fib(0)` → **0**, stored at index 0\n- `fib(1)` → **1**, stored at index 1\n- `fib(2)` = 1 + 0 = **1**, stored at index 2\n- `fib(3)` = 1 + 1 = **2**, stored at index 3\n\nThe table so far reads `0, 1, 1, 2` — and the last two cells are still `?`.',
          bn: 'এখন `fib(5)` চলে খালি মেমো নিয়ে। আগে সবাই নিচে নেমে যায়:\n\n- `fib(0)` → **0**, ০ নম্বর ঘরে\n- `fib(1)` → **1**, ১ নম্বর ঘরে\n- `fib(2)` = 1 + 0 = **1**, ২ নম্বর ঘরে\n- `fib(3)` = 1 + 1 = **2**, ৩ নম্বর ঘরে\n\nটেবিল এপর্যন্ত `0, 1, 1, 2` — আর শেষ দুটো ঘরে এখনো `?` আছে।'
        },
        line: 3,
        state: { n: 3, memo: '[0, 1, 1, 2, ?, ?]', stored: 4 },
        scene: {
          kind: 'array',
          label: 'memo table for <b>fib(0) … fib(5)</b>',
          cells: [0, 1, 1, 2, '?', '?'],
          showIndex: true,
          highlights: { insert: [3], active: [3], dim: [4, 5] },
          aux: [
            { label: 'stored just now', cells: ['fib(3) = 2'], w: 120, highlights: { active: [0] } }
          ],
          note: 'The two dim cells are not computed yet — that is `fib(4)` and `fib(5)`.',
          legend: [
            { label: 'just written', color: 'var(--green)' },
            { label: 'still unknown', color: 'var(--border-bright)' }
          ]
        }
      },
      {
        title: { en: 'Hits: the answers are already there', bn: 'হিট: উত্তর আগে থেকেই আছে' },
        explanation: {
          en: 'Back up the tree, `fib(4)` needs `fib(3)` and `fib(2)`. **Both are in the memo** — read `2` and `1`, add them, store **3** at index 4. No new recursion happens.\n\nThen `fib(5)` needs `fib(4)` and `fib(3)`: read `3` (index 4) and `2` (index 3), store **5** at index 5.\n\nThe table is full: `0, 1, 1, 2, 3, 5`. The two cyan cells are what `fib(5)` just read. The yellow cell is what it wrote.',
          bn: 'গাছের ওপরে ফিরে `fib(4)`-এর দরকার `fib(3)` আর `fib(2)`। **দুটোই মেমোতে আছে** — `2` আর `1` পড়ে যোগ করল, ঘর ৪-এ **3** লিখল। নতুন কোনো রিকারশন হলো না।\n\nতারপর `fib(5)`-এর দরকার `fib(4)` আর `fib(3)`: ঘর ৪ থেকে `3`, ঘর ৩ থেকে `2` পড়ল, ঘর ৫-এ **5** লিখল।\n\nটেবিল পূর্ণ: `0, 1, 1, 2, 3, 5`। সায়ান দুটো ঘর যেগুলো `fib(5)` এইমাত্র পড়েছে, হলুদ ঘরটা যা সে লিখেছে।'
        },
        line: 2,
        state: { n: 5, 'memo[4]': 3, 'memo[5]': 5, 'new calls': 0 },
        scene: {
          kind: 'array',
          label: 'memo table after <b>fib(5)</b>',
          cells: [0, 1, 1, 2, 3, 5],
          showIndex: true,
          highlights: { compare: [3, 4], active: [5] },
          note: 'Only **6 calls** in total — the naive version needed 15.',
          legend: [
            { label: 'read (cache hit)', color: 'var(--cyan)' },
            { label: 'written now', color: 'var(--yellow)' }
          ]
        }
      },
      {
        title: { en: 'Bottom-up: fill it without recursion', bn: 'নিচ থেকে উপরে: রিকারশন ছাড়াই ভরা' },
        explanation: {
          en: 'You can fill the same table **without any call stack**. Start at the bottom and walk up:\n\n- `memo[0] = 0`, `memo[1] = 1`\n- `memo[2] = memo[1] + memo[0] = 1`\n- `memo[3] = memo[2] + memo[1] = 2`\n- `memo[4] = memo[3] + memo[2] = 3`\n- `memo[5] = memo[4] + memo[3] = 5`\n\nEach cell only reads the **two cells behind it** (green). This way of filling is called **tabulation**. The stack stays empty, so a stack overflow can never happen.',
          bn: 'একই টেবিল **কোনো কল স্ট্যাক ছাড়াই** ভরা যায়। নিচ থেকে শুরু করে ওপরে উঠো:\n\n- `memo[0] = 0`, `memo[1] = 1`\n- `memo[2] = memo[1] + memo[0] = 1`\n- `memo[3] = memo[2] + memo[1] = 2`\n- `memo[4] = memo[3] + memo[2] = 3`\n- `memo[5] = memo[4] + memo[3] = 5`\n\nপ্রতিটা ঘর শুধু **পিছনের দুটো ঘর** পড়ে (সবুজ)। এভাবে ভরাকে **ট্যাবুলেশন (tabulation)** বলে। স্ট্যাক খালি থাকে, তাই স্ট্যাক ওভারফ্লো অসম্ভব।'
        },
        line: 5,
        state: { i: 5, 'memo[4]': 3, 'memo[3]': 2, 'memo[5]': 5 },
        scene: {
          kind: 'array',
          label: 'tabulation: walk <b>i = 2 … 5</b> and fill',
          cells: [0, 1, 1, 2, 3, 5],
          showIndex: true,
          highlights: { sorted: [0, 1, 2, 3, 4], active: [5] },
          pointers: [{ i: 5, label: 'i', tone: 'cyan' }],
          brackets: [{ from: 3, to: 4, label: 'read only these two', tone: 'green' }],
          note: '`memo[i] = memo[i-1] + memo[i-2]` — one line, no recursion at all.',
          legend: [
            { label: 'already filled', color: 'var(--green)' },
            { label: 'just filled', color: 'var(--yellow)' }
          ]
        }
      },
      {
        title: { en: 'Squeeze the table into two variables', bn: 'টেবিলটা দুটো ভেরিয়েবলে সরানো' },
        explanation: {
          en: 'If you only ever read the **last two** cells, you do not need the table at all.\n\nKeep two variables: start `a = 0, b = 1`, then repeat `next = a + b; a = b; b = next`. After n steps, `b` holds `fib(n)`.\n\nIn the picture only indices 4 and 5 still matter — `a = 3`, `b = 5`. Everything else is faded and forgotten.\n\n> Time stays `O(n)`, space drops to `O(1)`.',
          bn: 'শুধু **শেষ দুটো** ঘর পড়তে হলে টেবিলটাই লাগবে না।\n\nদুটো ভেরিয়েবল ধরে রাখো: শুরু `a = 0, b = 1`, তারপর বারবার `next = a + b; a = b; b = next`। n ধাপের পর `b`-তেই `fib(n)` থাকে।\n\nছবিতে শুধু ঘর ৪ আর ৫ এখনো দরকার — `a = 3`, `b = 5`। বাকি সব ম্লান, আর লাগছে না।\n\n> সময় একই থাকে `O(n)`, স্পেস নেমে আসে `O(1)`-এ।'
        },
        line: 5,
        state: { a: 3, b: 5, space: 'O(1)' },
        scene: {
          kind: 'array',
          label: 'only two values are still alive',
          cells: [0, 1, 1, 2, 3, 5],
          showIndex: true,
          highlights: { dim: [0, 1, 2, 3], active: [4, 5] },
          pointers: [
            { i: 4, label: 'a', tone: 'cyan' },
            { i: 5, label: 'b', tone: 'amber' }
          ],
          note: 'Everything before the last two cells can be dropped.',
          legend: [
            { label: 'keep (a, b)', color: 'var(--yellow)' },
            { label: 'forget', color: 'var(--border-bright)' }
          ]
        }
      },
      {
        title: { en: 'The classic DP family', bn: 'ক্লাসিক DP পরিবার' },
        explanation: {
          en: 'Once you can spot the pattern, the same trick covers a whole family of problems:\n\n- **Climbing stairs** — 1 or 2 steps at a time: exactly Fibonacci in disguise.\n- **Coin change** — fewest coins for an amount: best answer = best answer of a smaller amount + 1.\n- **Longest common subsequence** — compare two strings cell by cell and reuse the previous row.\n- **Knapsack** — for every item decide take or skip, using the table you already filled.\n\nAll four build a table out of smaller answers. Without the table, all four repeat work.',
          bn: 'প্যাটার্নটা চিনতে পেরে গেলে একই কৌশল পুরো পরিবারের সমস্যায় কাজ করে:\n\n- **সিঁড়ি ওঠা (climbing stairs)** — একবারে ১ বা ২ ধাপ: আসলে ছদ্মবেশী ফিবোনাচিই।\n- **কয়েন চেঞ্জ (coin change)** — টাকার জন্য সবচেয়ে কম কয়েন: সেরা উত্তর = ছোট টাকার সেরা উত্তর + ১।\n- **লংগেস্ট কমনসাবসিকোয়েন্স (LCS)** — দুটো স্ট্রিং ঘরে ঘরে মিলিয়ে, আগের সারি ব্যবহার করে।\n- **ন্যাপস্যাক (knapsack)** — প্রতিটা আইটেমে নেবো নাকি বাদ দেবো, আগে থেকে ভরা টেবিল দেখে।\n\nচারটেই ছোট অংশ থেকে টেবিল বানায়। টেবিল না থাকলে চারটেই একই কাজ বারবার করত।'
        },
        scene: {
          kind: 'array',
          label: { en: 'climbing stairs: ways(n) = ways(n−1) + ways(n−2)', bn: 'সিঁড়ি ওঠা: ways(n) = ways(n−1) + ways(n−2)' },
          cells: [1, 1, 2, 3, 5, 8, 13],
          highlights: { compare: [4, 5], active: [6] },
          pointers: [{ i: 6, label: '5 + 8', tone: 'yellow' }],
          note: { en: 'Every DP problem fills a table like this from smaller answers.', bn: 'প্রতিটা DP সমস্যা এভাবে ছোট উত্তর দিয়ে টেবিল ভরে।' }
        }
      },
      {
        title: { en: 'How to recognise a DP problem', bn: 'DP সমস্যা চেনার উপায়' },
        explanation: {
          en: 'Ask two questions:\n\n1. **Optimal substructure** — can the big answer be built from the answers of smaller inputs?\n2. **Overlapping sub-problems** — does the naive recursion ask the same question more than once?\n\nIf both answers are yes → **DP**. If every piece is brand new (binary search, for example), memoization will not help.\n\n**Cost after memoization**\n- Time `O(n)` for fib — one real computation per value.\n- Space `O(n)` for the memo table, or `O(1)` with two variables.\n\n> Memoization turns exponential work into linear work. That is the whole magic.',
          bn: 'দুটো প্রশ্ন করো:\n\n1. **অপটিমাল সাবস্ট্রাকচার (optimal substructure)** — বড় ইনপুটের উত্তর কি ছোট ছোট ইনপুটের উত্তর দিয়ে বানানো যায়?\n2. **ওভারল্যাপিং সাব-প্রবলেম (overlapping sub-problems)** — সাধারণ রিকারশন কি একই প্রশ্ন একাধিকবার করে?\n\nদুটোই হ্যাঁ হলে → **DP**। প্রতিবার নতুন অংশ এলে (যেমন বাইনারি সার্চ), মেমোয়াইজেশন কোনো কাজে লাগবে না।\n\n**মেমো লাগানোর পর খরচ**\n- সময় `O(n)` — প্রতিটি মানের জন্য একটাই আসল হিসাব।\n- স্পেস `O(n)` মেমো টেবিল, আর দুটো ভেরিয়েবল ধরলে `O(1)`।\n\n> মেমোয়াইজেশন ঘনীভূত (exponential) কাজকে লিনিয়ার করে দেয় — এটাই পুরো জাদুটা।'
        },
        scene: {
          kind: 'chart',
          label: { en: 'Function calls to compute fib(30)', bn: 'fib(30) বের করতে কতবার ফাংশন কল' },
          max: 2692537,
          items: [
            { label: { en: 'Plain recursion', bn: 'সাধারণ রিকার্শন' }, v: 2692537, color: 'var(--red)', note: { en: 'same questions again and again', bn: 'একই প্রশ্ন বারবার' } },
            { label: { en: 'With memo', bn: 'মেমোসহ' }, v: 59, color: 'var(--green)', note: 'O(n)' }
          ],
          caption: { en: 'optimal substructure + overlapping sub-problems = use DP', bn: 'অপটিমাল সাবস্ট্রাকচার + বারবার একই সাব-প্রবলেম = DP' }
        }
      }
    ]
  }
];
