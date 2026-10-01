export const hashingTopics = [
  {
    id: 'hash-table',
    name: { en: 'Hash Table', bn: 'হ্যাশ টেবিল' },
    description: {
      en: 'Turn a key into a bucket number — instant lookups',
      bn: 'কী থেকে বাক্স নম্বর বানানো — তাৎক্ষণিক খোঁজ'
    },
    categoryKey: 'hashing',
    level: 'intermediate',
    order: 10,
    icon: '🔑',
    complexity: {
      time: 'O(1) average',
      best: 'O(1)',
      worst: 'O(n)',
      space: 'O(n)',
      note: {
        en: 'Average O(1) needs a good hash function and short chains. When chains grow, resize the table.',
        bn: 'গড় O(1) পেতে ভালো হ্যাশ ফাংশন আর ছোট চেইন (chain) লাগে। চেইন লম্বা হলে টেবিল বড় করতে হয়।'
      }
    },
    code: {
      en: [
        'hashTableInsert(table, key, value):',
        '  i = hash(key) % length(table)    // which bucket',
        '  for each entry in table[i]:      // walk the chain',
        '    if entry.key == key:',
        '      entry.value = value          // update old value',
        '      return',
        '  table[i].push(key, value)        // add to the chain',
        '',
        'hashTableSearch(table, key):',
        '  i = hash(key) % length(table)',
        '  for each entry in table[i]:',
        '    if entry.key == key: return entry.value',
        '  return null                      // not found'
      ],
      bn: [
        'hashTableInsert(table, key, value):',
        '  i = hash(key) % length(table)    // কোন বাক্স (bucket)',
        '  for each entry in table[i]:      // চেইন ঘাটা',
        '    if entry.key == key:',
        '      entry.value = value          // আগের মান আপডেট',
        '      return',
        '  table[i].push(key, value)        // চেইনে যোগ',
        '',
        'hashTableSearch(table, key):',
        '  i = hash(key) % length(table)',
        '  for each entry in table[i]:',
        '    if entry.key == key: return entry.value',
        '  return null                      // পাওয়া যায়নি'
      ]
    },
    steps: [
      {
        title: { en: 'The dream: find by name', bn: 'স্বপ্ন: নাম ধরে খোঁজা' },
        explanation: {
          en: 'Imagine a word counter. In a big article the word **cat** appeared **7** times, and you want that number.\n\nWith an array you must scan row by row: is this row `cat`? The next one? For 1,000,000 rows that is painfully slow.\n\n> The dream: say the **key** `cat` and land on the answer in **one jump**. No scanning.\n\nThat dream is called a **hash table**.',
          bn: 'একটা শব্দ-গণক ভাবো। বড় একটা লেখায় শব্দ **cat** এসেছে **৭** বার, আর তোমার ওই ৭-টাই লাগবে।\n\nঅ্যারে (array) হলে সারি ধরে ধরে দেখতে হবে: এই সারিটা কি `cat`? পরেরটা? ১০ লাখ সারিতে এটা ভয়ংকর ধীর।\n\n> স্বপ্ন হলো: **কী (key)** বললেই উত্তরে **এক ঝাঁপে** পৌঁছে যাওয়া। কোনো স্ক্যান নেই।\n\nএই স্বপ্নের নাম **হ্যাশ টেবিল (hash table)**।'
        },
        line: 8,
        scene: {
          kind: 'cards',
          label: 'Find the value of key <b>cat</b>',
          cards: [
            { icon: '🐌', title: 'Array way', desc: 'check 1,000,000 rows one by one', state: 'bad', tag: 'O(n)', accent: 'var(--red)' },
            { icon: '⚡', title: 'Hash way', desc: 'compute the bucket, jump there once', state: 'active', tag: 'O(1)', accent: 'var(--yellow)' },
            { icon: '🪣', title: 'Buckets', desc: 'every key gets its own bucket number', state: 'ok', tag: 'key → i', accent: 'var(--cyan)' }
          ],
          caption: 'key = the name you look up · value = the data you get back'
        }
      },
      {
        title: { en: 'A hash function picks the bucket', bn: 'হ্যাশ ফাংশন বাক্স বেছে দেয়' },
        explanation: {
          en: 'Two words are already stored: `ant` → 3 and `sun` → 5 (how many times each appeared).\n\nThe **hash function** is just a math trick. Give it a key, it gives back a bucket number. Our toy rule: take the **alphabet position of the first letter**, then `% 7` (the table has 7 buckets).\n\n- `ant` → a is 1 → `1 % 7 = 1` → bucket **1** ✓ it sits there\n- `sun` → s is 19 → `19 % 7 = 5` → bucket **5** ✓ it sits there\n- `cat` → c is 3 → `3 % 7 = 3` → bucket **3** ← empty, waiting\n\n> `%` is the remainder, so the answer always stays between 0 and 6 and always fits the table.\n\nSame key → same bucket, every single time.',
          bn: 'আগে থেকেই দুটো শব্দ আছে: `ant` → 3 আর `sun` → 5 (কতবার এসেছে)।\n\n**হ্যাশ ফাংশন (hash function)** মানে একটা সাধারণ গণিত। কী দিলে বাক্স (bucket) নম্বর ফেরত পাওয়া যায়। আমাদের কাল্পনিক নিয়ম: প্রথম অক্ষরের **বর্ণমালায় অবস্থান** নাও, তারপর `% 7` করো (টেবিলে ৭টা বাক্স)।\n\n- `ant` → a = 1 → `1 % 7 = 1` → বাক্স **১** ✓ ওখানেই আছে\n- `sun` → s = 19 → `19 % 7 = 5` → বাক্স **৫** ✓ ওখানেই আছে\n- `cat` → c = 3 → `3 % 7 = 3` → বাক্স **৩** ← খালি, অপেক্ষায়\n\n> `%` মানে ভাগশেষ (remainder), তাই উত্তর সবসময় ০ থেকে ৬-এর মধ্যে থাকে, টেবিলের বাইরে যায় না।\n\nএকই কী → সবসময় একই বাক্স। প্রতিবারই।'
        },
        line: 1,
        state: { key: 'cat', firstLetter: 'c', pos: 3, buckets: 7, bucket: 3 },
        scene: {
          kind: 'hash',
          formula: 'pos("cat"[0]) % 7',
          formulaResult: '3',
          indexLabel: 'Bucket',
          valueLabel: 'Key → Value (chain)',
          buckets: [
            { i: 0 },
            { i: 1, entries: [{ k: 'ant', v: 3 }] },
            { i: 2 },
            { i: 3, state: 'active' },
            { i: 4 },
            { i: 5, entries: [{ k: 'sun', v: 5 }] },
            { i: 6 }
          ],
          note: 'h(cat) = <b>3</b> → bucket 3 is empty and waiting. ant and sun already sit in buckets 1 and 5.'
        }
      },
      {
        title: { en: 'Insert cat into bucket 3', bn: 'বাক্স ৩-এ cat ঢোকাও' },
        explanation: {
          en: 'Now we add `cat` → **7**.\n\n1. Run the hash: `3 % 7 = 3`.\n2. Bucket 3 is empty → drop the pair straight in: `cat → 7`.\n\nThat is a whole insert. No comparing with `ant` or `sun`, no walking across the table — **one hash, one jump, done**.',
          bn: 'এখন যোগ করি `cat` → **7**।\n\n1. হ্যাশ চালাও: `3 % 7 = 3`।\n2. বাক্স ৩ খালি → জোড়াটা সোজা বসিয়ে দাও: `cat → 7`।\n\nব্যস, পুরোটাই একটা insert। `ant` বা `sun`-এর সঙ্গে তুলনা নেই, টেবিল জুড়ে হাঁটা নেই — **এক হ্যাশ, এক ঝাঁপ, শেষ**।'
        },
        line: [1, 6],
        state: { key: 'cat', value: 7, bucket: 3, pairs: 3 },
        scene: {
          kind: 'hash',
          formula: 'pos("cat"[0]) % 7',
          formulaResult: '3',
          indexLabel: 'Bucket',
          valueLabel: 'Key → Value (chain)',
          buckets: [
            { i: 0 },
            { i: 1, entries: [{ k: 'ant', v: 3 }] },
            { i: 2 },
            { i: 3, state: 'active', entries: [{ k: 'cat', v: 7, state: 'new' }] },
            { i: 4 },
            { i: 5, entries: [{ k: 'sun', v: 5 }] },
            { i: 6 }
          ],
          note: 'Bucket 3 was empty, so the new pair <b>cat → 7</b> drops straight in (yellow = brand new).'
        }
      },
      {
        title: { en: 'Collision: cow hits the same bucket', bn: 'কোলিশন (collision): cow একই বাক্সে' },
        explanation: {
          en: 'Next we insert `cow` → **2**.\n\n`c` is still letter 3, so `3 % 7 = 3` — **the exact same bucket as cat**. Two keys, one bucket. This is called a **collision**.\n\n> A collision is not an error. Different keys are allowed to share a bucket. We only need a plan for keeping both.\n\nSo bucket 3 now holds `cat → 7` **and** `cow → 2`. Nothing is lost.',
          bn: 'এবার যোগ করি `cow` → **2**।\n\n`c` তখনও ৩ নম্বর অক্ষর, তাই `3 % 7 = 3` — **cat-এর ঠিক একই বাক্স**। দুটো কী, একটা বাক্স। এটার নাম **কোলিশন (collision)**।\n\n> কোলিশন কোনো ভুল না। আলাদা আলাদা কী-ও একসঙ্গে এক বাক্সে থাকতে পারে। শুধু দুটোকে রাখার একটা পরিকল্পনা লাগবে।\n\nতাই বাক্স ৩-এ এখন `cat → 7` **আর** `cow → 2` — দুটোই আছে, কিছুই হারায়নি।'
        },
        line: 6,
        state: { key: 'cow', value: 2, bucket: 3, collidesWith: 'cat' },
        scene: {
          kind: 'hash',
          formula: 'pos("cow"[0]) % 7',
          formulaResult: '3',
          indexLabel: 'Bucket',
          valueLabel: 'Key → Value (chain)',
          buckets: [
            { i: 0 },
            { i: 1, entries: [{ k: 'ant', v: 3 }] },
            { i: 2 },
            { i: 3, state: 'active', entries: [{ k: 'cat', v: 7 }, { k: 'cow', v: 2, state: 'col' }] },
            { i: 4 },
            { i: 5, entries: [{ k: 'sun', v: 5 }] },
            { i: 6 }
          ],
          note: 'cow hashed to <b>3</b> too — orange marks the <b>collision</b>. Both pairs stay in bucket 3.'
        }
      },
      {
        title: { en: 'Chaining: the bucket is a tiny list', bn: 'চেইনিং: বাক্সটা ছোট্ট লিস্ট' },
        explanation: {
          en: 'The plan is simple: **every bucket is a tiny linked list**. New keys join at the end of that chain.\n\nBucket 3 now looks like this:\n\n`cat → 7`  →  `cow → 2`  →  `car → 4`\n\n`car` hashed to 3 as well, so it joined the same chain. Empty buckets still show `∅`.\n\n> Nothing is thrown away and nothing is moved somewhere else. One bucket, one chain — the table stays flat and simple.',
          bn: 'পরিকল্পনাটা খুব সহজ: **প্রতিটি বাক্স একটা ছোট্ট লিংকড লিস্ট (linked list)**। নতুন কী চেইনের শেষে বসে।\n\nবাক্স ৩-এর দশা এখন এইভাবে:\n\n`cat → 7`  →  `cow → 2`  →  `car → 4`\n\n`car`-ও হ্যাশ করে ৩-ই পেয়েছে, তাই একই চেইনে এসে বসেছে। খালি বাক্সে `∅` দেখায়।\n\n> কিছুই ফেলা যায় নি, কিছু অন্য জায়গায় যায় নি। এক বাক্স, এক চেইন — টেবিল সোজা ও সহজই থাকে।'
        },
        line: 2,
        state: { bucket: 3, chainLength: 3, pairs: 5 },
        scene: {
          kind: 'hash',
          formula: 'pos("car"[0]) % 7',
          formulaResult: '3',
          indexLabel: 'Bucket',
          valueLabel: 'Key → Value (chain)',
          buckets: [
            { i: 0 },
            { i: 1, entries: [{ k: 'ant', v: 3 }] },
            { i: 2 },
            { i: 3, state: 'active', entries: [{ k: 'cat', v: 7 }, { k: 'cow', v: 2 }, { k: 'car', v: 4, state: 'new' }] },
            { i: 4 },
            { i: 5, entries: [{ k: 'sun', v: 5 }] },
            { i: 6 }
          ],
          note: 'Bucket 3 = a small chain: <b>cat → cow → car</b>. The arrows are the linked-list links.'
        }
      },
      {
        title: { en: 'Search walks one chain only', bn: 'সার্চ শুধু একটা চেইন ঘাটে' },
        explanation: {
          en: 'Find `cow`.\n\n1. Hash it: `3 % 7 = 3` → go to bucket 3. Buckets 0, 1, 2, 4, 5, 6 are **never even touched**.\n2. Walk that one chain: `cat` ≠ `cow` → next. `cow` == `cow` → **found**, return 2.\n\nTwo checks instead of five keys. On a healthy table a chain holds about **one or two** entries, so lookup costs **average O(1)** — no matter how many keys the table holds.\n\n> That is the whole promise of hashing: the work does not grow with the size of the table.',
          bn: '`cow` খুঁজি।\n\n1. হ্যাশ: `3 % 7 = 3` → বাক্স ৩-এ যাও। বাক্স ০, ১, ২, ৪, ৫, ৬ **ছোঁয়াই হয় না**।\n2. ওই এক চেইনটাই ঘাটা: `cat` ≠ `cow` → পরেরটা। `cow` == `cow` → **পেয়ে গেছি**, ২ রিটার্ন।\n\nপাঁচটা কী-এর বদলে দুই চেক। ভালো টেবিলে চেইনে গড়ে **এক-দুটো** এন্ট্রি থাকে, তাই খোঁজ হয় **গড়ে O(1)** — টেবিলে কতকী কী থাকলেও।\n\n> এটাই হ্যাশিংয়ের পুরো প্রতিশ্রুতি: টেবিলের আকার বাড়লেও কাজের পরিমাণ বাড়ে না।'
        },
        line: [10, 11],
        state: { key: 'cow', bucket: 3, checks: 2, result: 2, found: true },
        scene: {
          kind: 'hash',
          formula: 'pos("cow"[0]) % 7',
          formulaResult: '3',
          indexLabel: 'Bucket',
          valueLabel: 'Key → Value (chain)',
          buckets: [
            { i: 0 },
            { i: 1, entries: [{ k: 'ant', v: 3 }] },
            { i: 2 },
            { i: 3, state: 'hit', entries: [{ k: 'cat', v: 7, state: 'probe' }, { k: 'cow', v: 2 }] },
            { i: 4 },
            { i: 5, entries: [{ k: 'sun', v: 5 }] },
            { i: 6 }
          ],
          note: 'Only bucket 3 was opened (green row). <b>cat</b> was checked (cyan) → not a match → next → <b>cow</b> found.'
        }
      },
      {
        title: { en: 'Load factor: when to grow', bn: 'লোড ফ্যাক্টর: কখন টেবিল বড়াবে' },
        explanation: {
          en: 'Count now: **5 keys** (`ant`, `sun`, `cat`, `cow`, `car`) inside **7 buckets**.\n\n**Load factor** = entries ÷ buckets = `5 / 7 ≈ 0.71`. That is healthy — chains stay short.\n\nWhen the load factor climbs above **1**, chains stretch out and every search walks a longer list. So the table **resizes**: grow the buckets (7 → 14) and re-hash every key into its new bucket, because `length(table)` changed.\n\n> A resize costs work once, but it makes every chain short again — so O(1) stays O(1).',
          bn: 'গুনে দেখি: **৭টা বাক্সে ৫টা কী** (`ant`, `sun`, `cat`, `cow`, `car`)।\n\n**লোড ফ্যাক্টর (load factor)** = এন্ট্রি ÷ বাক্স = `5 / 7 ≈ ০.৭১`। এটা ভালো অবস্থা — চেইন ছোট থাকে।\n\nলোড ফ্যাক্টর **১**-এর উপরে উঠলে চেইন লম্বা হতে থাকে, আর প্রতিটি সার্চ বেশি লিস্ট ঘাটে। তখন টেবিল **রিসাইজ (resize)** হয়: বাক্স বাড়াও (৭ → ১৪), আর `length(table)` বদলে যাওয়ায় সব কী নতুন বাক্সে আবার হ্যাশ করো।\n\n> রিসাইজে একবার খরচ লাগে, কিন্তু চেইন আবার ছোট হয়ে যায় — তাই O(1) আবার O(1)ই থাকে।'
        },
        line: 1,
        state: { keys: 5, buckets: 7, load: 0.71, nextBuckets: 14 },
        scene: {
          kind: 'cards',
          label: 'Keeping the chains short',
          cards: [
            { icon: '⚖️', title: 'Load factor', desc: '5 keys ÷ 7 buckets ≈ 0.71 — healthy', state: 'ok', tag: 'α = 0.71', accent: 'var(--green)' },
            { icon: '⛓️', title: 'Chains get long', desc: 'α above 1 → lookup turns into a scan', state: 'bad', tag: 'slow → O(n)', accent: 'var(--red)' },
            { icon: '📐', title: 'Resize', desc: 'grow 7 → 14 buckets, re-hash every key', state: 'active', tag: '2×', accent: 'var(--yellow)' }
          ],
          caption: 'short chains are exactly what keeps lookups at O(1)'
        }
      },
      {
        title: { en: 'Where you already use hashing', bn: 'হ্যাশিং তুমি আগে থেকেই ব্যবহার করো' },
        explanation: {
          en: 'You meet hash tables every day:\n\n- **Objects / dictionaries** — `user["age"]` jumps straight to the value.\n- **Sets** — remember what you have seen, with no duplicates.\n- **Caches and memoization** — the answer is stored under its input, so the second call is free.\n\nSame idea every time: **turn the key into a bucket, then jump**.',
          bn: 'তুমি প্রতিদিনই হ্যাশ টেবিল ছুঁয়ে যাও:\n\n- **অবজেক্ট / ডিকশনারি** — `user["age"]` লিখলেই সরাসরি মানে পৌঁছে যায়।\n- **সেট (set)** — কী দেখেছি সেটা মনে রাখে, ডুপ্লিকেট ছাড়াই।\n- **ক্যাশ ও মেমোআইজেশন** — উত্তর ইনপুটের নামে রাখা থাকে, তাই দ্বিতীয়বার খরচ শূন্য।\n\nপ্রতিবার একই কথা: **কী থেকে বাক্স বানাও, তারপর ঝাঁপ দাও**।'
        },
        scene: {
          kind: 'cards',
          label: 'Three everyday uses',
          cards: [
            { icon: '📖', title: 'Object / dict', desc: 'user["age"] → the value in one jump', state: 'active', tag: 'key → value', accent: 'var(--cyan)' },
            { icon: '🎯', title: 'Set', desc: 'seen IDs — duplicates not allowed', state: 'ok', tag: 'keys only', accent: 'var(--green)' },
            { icon: '🧲', title: 'Cache', desc: 'store the answer, reuse it for free', state: 'ok', tag: 'memo', accent: 'var(--purple)' }
          ],
          caption: 'JavaScript objects, Python dicts, Java HashMap — one shared trick'
        }
      },
      {
        title: { en: 'Worst case: everything collides', bn: 'সবচেয়ে খারাপ কেস: সব এক বাক্সে' },
        explanation: {
          en: 'Now imagine a different table, one that is full of words starting with `c`: `cat`, `cow`, `car`, `cap`, `cup`.\n\nTheir counts: `cat → 7`, `cow → 2`, `car → 4`, `cap → 1`, `cup → 6`. Our toy hash sends **all five to bucket 3**.\n\nA lookup for `cup` must walk `cat → cow → car → cap → cup` — five checks, because the chain is one long list.\n\nThat is the **worst case: O(n)**. With n keys stuck in one chain, every operation scans the whole chain.\n\n> Real hash functions spread keys out, and the resize step keeps chains short — so this stays rare. But Big-O always reports the worst story.',
          bn: 'এবার ভাবো আরেকটা টেবিল, যেটা পুরোটাই `c` দিয়ে শুরু হওয়া শব্দ: `cat`, `cow`, `car`, `cap`, `cup`।\n\nএদের গুনতি: `cat → 7`, `cow → 2`, `car → 4`, `cap → 1`, `cup → 6`। আমাদের কাল্পনিক হ্যাশ **পাঁচটাকেই বাক্স ৩-এ** পাঠায়।\n\n`cup` খুঁজলে পুরো চেইন ঘাটতে হয়: `cat → cow → car → cap → cup` — পাঁচ চেক, কারণ চেইনটা একটা লম্বা লিস্ট।\n\nএটাই **সবচেয়ে খারাপ কেস: O(n)**। এক চেইনে n কী আটকে থাকলে প্রতিটি কাজেই পুরো চেইন ঘাটতে হয়।\n\n> আসল হ্যাশ ফাংশন কী-গুলোকে ছড়িয়ে দেয়, আর রিসাইজ ধাপটা চেইন ছোট রাখে — তাই এই অবস্থা কমই আসে। তবু বিগ-ও সবসময় সবচেয়ে খারাপ গল্পটাই বলে।'
        },
        line: 10,
        state: { keys: 5, bucket: 3, checks: 5, complexity: 'O(n)' },
        scene: {
          kind: 'hash',
          formula: 'pos(key[0]) % 7',
          formulaResult: '3',
          indexLabel: 'Bucket',
          valueLabel: 'Key → Value (chain)',
          buckets: [
            { i: 0 },
            { i: 1 },
            { i: 2 },
            {
              i: 3,
              state: 'active',
              entries: [
                { k: 'cat', v: 7, state: 'probe' },
                { k: 'cow', v: 2 },
                { k: 'car', v: 4 },
                { k: 'cap', v: 1 },
                { k: 'cup', v: 6 }
              ]
            },
            { i: 4 },
            { i: 5 },
            { i: 6 }
          ],
          note: 'One chain of <b>5</b> → a lookup can need 5 checks → <b>O(n)</b>, not O(1).'
        }
      }
    ]
  },

  {
    id: 'set-and-map',
    name: { en: 'Sets and Maps', bn: 'সেট ও ম্যাপ' },
    description: {
      en: 'Two everyday tools built on hashing',
      bn: 'হ্যাশিং থেকে তৈরি দুটো রোজকার যন্ত্র'
    },
    categoryKey: 'hashing',
    level: 'intermediate',
    order: 20,
    icon: '🗂️',
    complexity: {
      time: 'O(1) per operation',
      best: 'O(1)',
      worst: 'O(n)',
      space: 'O(n)',
      note: {
        en: 'add / has / get are average O(1). Counting or deduping n items costs O(n) in total.',
        bn: 'add / has / get গড়ে O(1)। n আইটেম গুনতে বা ডুপ্লিকেট ফেলতে পুরোটাই O(n) খরচ হয়।'
      }
    },
    code: {
      en: [
        '// count words with a map',
        'countWords(words):',
        '  freq = new Map()',
        '  for w in words:',
        '    if w in freq: freq[w] = freq[w] + 1',
        '    else:         freq[w] = 1',
        '  return freq',
        '',
        '// drop duplicates with a set',
        'unique(words):',
        '  seen = new Set()',
        '  out = []',
        '  for w in words:',
        '    if w not in seen:',
        '      seen.add(w)',
        '      out.push(w)',
        '  return out'
      ],
      bn: [
        '// ম্যাপ দিয়ে শব্দ গুনো',
        'countWords(words):',
        '  freq = new Map()',
        '  for w in words:',
        '    if w in freq: freq[w] = freq[w] + 1',
        '    else:         freq[w] = 1',
        '  return freq',
        '',
        '// সেট দিয়ে ডুপ্লিকেট ফেলো',
        'unique(words):',
        '  seen = new Set()',
        '  out = []',
        '  for w in words:',
        '    if w not in seen:',
        '      seen.add(w)',
        '      out.push(w)',
        '  return out'
      ]
    },
    steps: [
      {
        title: { en: 'Set: keys only, no duplicates', bn: 'সেট: শুধু কী, ডুপ্লিকেট নেই' },
        explanation: {
          en: 'A **set** is a box that refuses doubles. Add a word once — adding it again changes nothing.\n\nHere is the raw list: `cat, dog, cat, sun, dog`. We are standing at the 3rd word right now:\n\n- `cat` (index 0) → new → added\n- `dog` (index 1) → new → added\n- `cat` (index 2) → already there → **skip**\n\nThe set so far holds only `cat, dog`. Keep walking and you end up with `cat, dog, sun` — first appearances only, **no duplicates**.',
          bn: '**সেট (set)** মানে ডাবল ঢোকাতে দেওয়া নয় পাত্র। একবার যোগ করো — আবার যোগ করলে কিছু বদলায় না।\n\nকাঁচা তালিকা: `cat, dog, cat, sun, dog`. এখন আমরা ৩ নম্বর শব্দে দাঁড়িয়ে আছি:\n\n- `cat` (ইনডেক্স 0) → নতুন → যোগ হলো\n- `dog` (ইনডেক্স 1) → নতুন → যোগ হলো\n- `cat` (ইনডেক্স 2) → আগেই আছে → **বাদ**\n\nসেটে এখন শুধু `cat, dog` আছে। এভাবে শেষ পর্যন্ত যাও — হবে `cat, dog, sun` — শুধু প্রথমবার আসা কী, **ডুপ্লিকেট নেই**।'
        },
        line: 10,
        state: { w: 'cat', i: 2, seen: '{cat, dog}', duplicates: 1 },
        scene: {
          kind: 'array',
          label: 'words = ["cat", "dog", "cat", "sun", "dog"]',
          cells: ['cat', 'dog', 'cat', 'sun', 'dog'],
          showIndex: true,
          highlights: { compare: [2], dim: [3, 4] },
          pointers: [{ i: 2, label: 'w', tone: 'cyan' }],
          aux: [
            { label: 'set — no duplicates', cells: ['cat', 'dog'], highlights: { active: [0, 1] } },
            { label: 'out', cells: ['cat', 'dog'] }
          ],
          note: 'The 2nd <b>cat</b> is a duplicate → skip it. Nothing already in the set gets added twice.',
          legend: [
            { label: 'current word', color: 'var(--cyan)' },
            { label: 'not read yet', color: 'var(--border-bright)' }
          ]
        }
      },
      {
        title: { en: 'Map: a key points to a value', bn: 'ম্যাপ: কী থেকে মান' },
        explanation: {
          en: 'A **map** stores pairs: a **key**, and a **value** hiding behind it. Ask with the key, get the value.\n\nHere the key is a word and the value is how many times it appeared. Two pairs are stored so far: `cat` → 1 and `dog` → 1.\n\nThe keys go into buckets with the same hash trick from the last lesson — `cat` into bucket 3, `dog` into bucket 4 — so finding a word is still **one jump**.',
          bn: '**ম্যাপ (map)** জোড়া জোড়া করে রাখে: একটা **কী (key)**, আর তার পেছনে লুকানো একটা **মান (value)**। কী দিয়ে ডাকো, মান পাও।\n\nএখানে কী হলো শব্দ, মান হলো ওটা কতবার এসেছে। এখন পর্যন্ত দুটো জোড়া আছে: `cat` → 1 আর `dog` → 1।\n\nকী-গুলো আগের পাঠের হ্যাশ কৌশলেই বাক্সে যায় — `cat` বাক্স ৩-এ, `dog` বাক্স ৪-এ — তাই শব্দ খোঁজাও **এক ঝাঁপেই**।'
        },
        line: 2,
        state: { pairs: 2, 'freq[cat]': 1, 'freq[dog]': 1 },
        scene: {
          kind: 'hash',
          formula: 'pos("cat"[0]) % 7',
          formulaResult: '3',
          indexLabel: 'Bucket',
          valueLabel: 'Key → Count',
          buckets: [
            { i: 0 },
            { i: 1 },
            { i: 2 },
            { i: 3, state: 'active', entries: [{ k: 'cat', v: 1, state: 'new' }] },
            { i: 4, entries: [{ k: 'dog', v: 1 }] },
            { i: 5 },
            { i: 6 }
          ],
          note: 'A map = key → value, stored in hash buckets. <b>cat</b> sits in bucket 3, <b>dog</b> in bucket 4.'
        }
      },
      {
        title: { en: 'Run: build a frequency map', bn: 'চালাও: ফ্রিকুয়েন্সি ম্যাপ বানাও' },
        explanation: {
          en: 'Now count four words: `cat, dog, cat, sun`.\n\n1. `cat` → not in the map → `freq[cat] = 1`\n2. `dog` → not in the map → `freq[dog] = 1`\n3. `cat` → **already a key** → just add 1 → `freq[cat] = 2`\n4. `sun` → not in the map → `freq[sun] = 1`\n\nThe result: `cat → 2`, `dog → 1`, `sun → 1`. Four words in, **three keys** out. No array shifting and no scanning — each word is hashed straight to its own bucket.',
          bn: 'এবার চারটা শব্দ গুনি: `cat, dog, cat, sun`।\n\n1. `cat` → ম্যাপে নেই → `freq[cat] = 1`\n2. `dog` → ম্যাপে নেই → `freq[dog] = 1`\n3. `cat` → **আগে থেকেই কী** → শুধু ১ যোগ → `freq[cat] = 2`\n4. `sun` → ম্যাপে নেই → `freq[sun] = 1`\n\nফল: `cat → 2`, `dog → 1`, `sun → 1`। চারটা শব্দ ঢুকল, বেরল **তিনটা কী**। অ্যারে সরানো নেই, স্ক্যানও নেই — প্রতিটি শব্দ সরাসরি নিজের বাক্সে চলে যায়।'
        },
        line: [4, 5],
        state: { words: 4, keys: 3, 'freq[cat]': 2, 'freq[dog]': 1, 'freq[sun]': 1 },
        scene: {
          kind: 'hash',
          formula: 'pos("cat"[0]) % 7',
          formulaResult: '3',
          indexLabel: 'Bucket',
          valueLabel: 'Word → Count',
          buckets: [
            { i: 0 },
            { i: 1 },
            { i: 2 },
            { i: 3, state: 'active', entries: [{ k: 'cat', v: 2, state: 'new' }] },
            { i: 4, entries: [{ k: 'dog', v: 1 }] },
            { i: 5, entries: [{ k: 'sun', v: 1 }] },
            { i: 6 }
          ],
          note: 'The 2nd <b>cat</b> found its old key and only bumped the count: <b>1 → 2</b> (yellow = just written).'
        }
      },
      {
        title: { en: 'Membership test is O(1)', bn: 'সদস্যতা পরীক্ষা O(1)' },
        explanation: {
          en: 'Sets shine when you only ask one question: **have I seen this before?**\n\n- **Sliding window** — keep a `seen` set; if the new item is already in it, shrink the window.\n- **BFS on a graph** — a `visited` set stops you from pushing the same node twice.\n\nHere `visited = {A, C, D}`. Asking **"seen C?"** hashes `C` to bucket 3, where it sits alone → answer **yes, O(1)**. A set stores the key only — the tick is just the display.\n\n> These checks live inside loops that may run millions of times, so O(1) instead of O(n) decides whether the program feels fast.',
          bn: 'শুধু একটাই প্রশ্ন করতে গেলে সেট সেরা: **আগে কি দেখেছি?**\n\n- **স্লাইডিং উইন্ডো (sliding window)** — `seen` সেট রাখো; নতুন আইটেম আগে থেকেই থাকলে উইন্ডো টেনে নাও।\n- **গ্রাফে BFS** — `visited` সেট একই নোডকে দুইবার লাইনে ঢোকাতে দেয় না।\n\nএখানে `visited = {A, C, D}`। **"C দেখেছি?"** জিজ্ঞেস করলে `C` হ্যাশ করে বাক্স ৩, ওখানে একা-ই আছে → উত্তর **হ্যাঁ, O(1)**। সেট শুধু কী রাখে — টিকটিকাটা শুধু দেখানোর জন্য।\n\n> এই চেকগুলো এমন লুপে চলে যা লাখ লাখবার ঘুরে, তাই ওনে হয় O(n) নয়তো O(1) — প্রোগ্রাম দ্রুত কি না ঠিক করে এখানেই।'
        },
        line: 13,
        state: { visited: '{A, C, D}', ask: 'C', bucket: 3, found: true },
        scene: {
          kind: 'hash',
          formula: 'pos("C"[0]) % 7',
          formulaResult: '3',
          indexLabel: 'Bucket',
          valueLabel: 'Key (set = keys only)',
          buckets: [
            { i: 0 },
            { i: 1, entries: [{ k: 'A', v: '✓' }] },
            { i: 2 },
            { i: 3, state: 'hit', entries: [{ k: 'C', v: '✓' }] },
            { i: 4, entries: [{ k: 'D', v: '✓' }] },
            { i: 5 },
            { i: 6 }
          ],
          note: 'A set is just a hash table with keys. <b>C</b> hashed to bucket 3 and was found immediately → O(1).'
        }
      },
      {
        title: { en: 'Array, set, or map?', bn: 'অ্যারে, নাকি সেট, নাকি ম্যাপ?' },
        explanation: {
          en: 'Pick by the question you need to ask:\n\n- **Array** — you care about **order and position**: give me item #5, keep a sequence, walk left to right.\n- **Set** — you only care **is it there, or not?** No duplicates, no order.\n- **Map** — you have a **name and a number behind it**: word → count, id → user.\n\n> If you keep writing `for x in list: if x == key`, a set or a map can replace that whole loop.',
          bn: 'যে প্রশ্ন করছো, সেটা ধরে বেছে নাও:\n\n- **অ্যারে (array)** — **ক্রম ও অবস্থান** দরকার: ৫ নম্বর আইটেমটা দাও, ধারাবাহিক তালিকা, বাম থেকে ডানে হাঁটা।\n- **সেট (set)** — শুধু **আছে, নাকি নেই?** ডুপ্লিকেট নেই, ক্রমও নেই।\n- **ম্যাপ (map)** — পেছনে **নাম আর সংখ্যা** আছে: শব্দ → গুনতি, id → ইউজার।\n\n> কোডে বারবার লিখতে হয় `for x in list: if x == key` — এমন হলে সেট বা ম্যাপ ওই পুরো লুপটাই বাদ দিয়ে দেবে।'
        },
        scene: {
          kind: 'cards',
          label: 'Same data, three questions',
          cards: [
            { icon: '📏', title: 'Array', desc: 'order matters — index 0, 1, 2…', state: 'ok', tag: 'position', accent: 'var(--cyan)' },
            { icon: '🎯', title: 'Set', desc: 'membership only — no duplicates', state: 'ok', tag: 'present?', accent: 'var(--green)' },
            { icon: '🗂️', title: 'Map', desc: 'key → value — count, look up, replace', state: 'active', tag: 'name → number', accent: 'var(--yellow)' }
          ],
          caption: 'same data, three different questions'
        }
      },
      {
        title: { en: 'The real code shapes', bn: 'আসল কোডের আকার' },
        explanation: {
          en: 'The idea turns into a few short lines:\n\n- **Set** — `const seen = new Set()`, then `seen.add("cat")`, `seen.has("cat")` → `true` (O(1)).\n- **Map** — `const freq = new Map()`, then `freq.set("cat", 1)`, `freq.get("cat")` → `1`.\n- **Python** — `seen = set()`, `freq["cat"] = 1`, and `freq["cat"]` reads it back.\n- **Delete** — `seen.delete("cat")` or `delete freq["cat"]`.\n\nAdd, read, delete — every path goes through the same route from the last lesson: **hash → bucket → chain**.',
          bn: 'এই আইডিয়াটা কয়েক লাইনের কোড হয়ে যায়:\n\n- **সেট** — `const seen = new Set()`, তারপর `seen.add("cat")`, `seen.has("cat")` → `true` (O(1))।\n- **ম্যাপ** — `const freq = new Map()`, তারপর `freq.set("cat", 1)`, `freq.get("cat")` → `1`।\n- **Python** — `seen = set()`, `freq["cat"] = 1`, আর `freq["cat"]` দিয়ে পড়ে নাও।\n- **মুছে ফেলা** — `seen.delete("cat")` বা `delete freq["cat"]`।\n\nযোগ, পড়া, মুছা — সব পথই যায় আগের পাঠের এক রাস্তা দিয়ে: **হ্যাশ → বাক্স → চেইন**।'
        },
        line: [1, 9],
        state: { setOps: 'add / has / delete', mapOps: 'set / get / delete', all: 'O(1) average' },
        scene: {
          kind: 'cards',
          label: 'Copy-paste shapes',
          cards: [
            { icon: '➕', title: 'Add', desc: 'seen.add("cat") · freq.set("cat", 1)', state: 'active', tag: 'insert', accent: 'var(--cyan)' },
            { icon: '🔍', title: 'Read', desc: 'seen.has("cat") · freq.get("cat")', state: 'active', tag: 'lookup', accent: 'var(--yellow)' },
            { icon: '❌', title: 'Delete', desc: 'seen.delete("cat") · delete freq["cat"]', state: 'ok', tag: 'remove', accent: 'var(--red)' }
          ],
          caption: 'JavaScript shown — Python uses set() and dict[key]'
        }
      },
      {
        title: { en: 'Complexity in one glance', bn: 'জটিলতা এক নজরে' },
        explanation: {
          en: '- **add / has / get / delete** — average **O(1)**, worst **O(n)** when every key lands in one chain.\n- **Space** — **O(n)**: the keys plus the bucket slots around them.\n- **Dedupe a list of n items with a set** — **O(n)** total (n hashes), instead of **O(n²)** with nested checks.\n- **Count n words with a map** — also **O(n)**, one bucket jump per word.\n\n> Hashing is the rare trick that makes the common case instant: one hash, one bucket, answer.',
          bn: '- **add / has / get / delete** — গড়ে **O(1)**, সব কী এক চেইনে পড়লে সবচেয়ে খারাপ কেস **O(n)**।\n- **স্পেস** — **O(n)**: কী-গুলো আর তার চারপাশের খালি বাক্সগুলো।\n- **n আইটেমের তালিকা সেট দিয়ে ডুপ্লিকেট ছাড়া করা** — পুরোটাই **O(n)** (n বার হ্যাশ), নেস্টেড চেকের **O(n²)** নয়।\n- **n টা শব্দ ম্যাপে গুনা** — তাও **O(n)**, প্রতি শব্দে এক ঝাঁপ।\n\n> হ্যাশিং সেই দুর্লভ কৌশল, যা সাধারণ কাজটাকে তাৎক্ষণিক করে তোলে: এক হ্যাশ, এক বাক্স, উত্তর।'
        },
        scene: {
          kind: 'cards',
          label: 'Sets and maps at a glance',
          cards: [
            { icon: '⚡', title: 'add / has / get', desc: 'one hash, one jump — average O(1)', state: 'ok', tag: 'O(1)', accent: 'var(--green)' },
            { icon: '🌪️', title: 'Worst case', desc: 'all keys in one chain → walk it', state: 'bad', tag: 'O(n)', accent: 'var(--red)' },
            { icon: '🧠', title: 'Space', desc: 'keys + bucket slots → O(n)', state: 'active', tag: 'O(n)', accent: 'var(--purple)' },
            { icon: '🧹', title: 'Dedupe n items', desc: 'one pass with a set → O(n), not O(n²)', state: 'ok', tag: 'O(n)', accent: 'var(--cyan)' }
          ],
          caption: 'next lesson in the sidebar: Trees & BST'
        }
      }
    ]
  }
];
