export const linkedTopics = [
  {
    id: 'linked-list',
    name: { en: 'Linked List', bn: 'লিংকড লিস্ট' },
    description: {
      en: 'Nodes holding a value and a pointer to the next one',
      bn: 'মান আর পরেরটার পয়েন্টার রাখা নোড'
    },
    categoryKey: 'linked',
    level: 'beginner',
    order: 10,
    icon: '🔗',
    complexity: {
      time: 'O(n) to walk',
      best: 'O(1) insert at head',
      worst: 'O(n) reach the tail',
      space: 'O(1) extra',
      note: {
        en: 'Head insert and head read are O(1). Reaching the last node costs O(n) — you must walk the chain.',
        bn: 'হেডে (head) ঢোকানো আর হেড পড়া O(1)। শেষ নোডে (node) পৌঁছাতে O(n) লাগে — শিকুলটা হেঁটে যেতে হয়।'
      }
    },
    code: {
      en: [
        'pushFront(head, value):        // O(1)',
        '  node = new Node(value)',
        '  node.next = head',
        '  return node                  // node is the new head',
        '',
        'append(head, value):           // O(n)',
        '  node = new Node(value)',
        '  if head == null: return node',
        '  cur = head',
        '  while cur.next != null:      // walk to the end',
        '    cur = cur.next',
        '  cur.next = node              // link the new node',
        '  return head',
        '',
        'removeAfter(prev):             // O(1) once you have prev',
        '  prev.next = prev.next.next   // link around it',
        '  return head'
      ],
      bn: [
        'pushFront(head, value):        // O(1)',
        '  node = new Node(value)',
        '  node.next = head',
        '  return node                  // এটাই নতুন head',
        '',
        'append(head, value):           // O(n)',
        '  node = new Node(value)',
        '  if head == null: return node',
        '  cur = head',
        '  while cur.next != null:      // শেষ নোড পর্যন্ত হাঁটা',
        '    cur = cur.next',
        '  cur.next = node              // নতুন নোডটাকে জোড়া লাগাও',
        '  return head',
        '',
        'removeAfter(prev):             // পেয়ে গেলে O(1)',
        '  prev.next = prev.next.next   // ওটাকে ঘিরে লিংক টানো',
        '  return head'
      ]
    },
    steps: [
      {
        title: { en: 'A treasure hunt chain of clues', bn: 'ধন উৎসবের সূত্রের শিকুল' },
        explanation: {
          en: 'Clue 1 says: "The next paper is under the bench." The bench clue says: "Look in the fountain." The fountain clue says: "Dig by the big tree."\n\nEach clue stores **one message and the way to the next clue**. You never have all clues in your hand — you only hold the one you are reading.\n\nThat is exactly a **linked list**: pieces connected one to the next, and a single starting point called **head**.',
          bn: 'সূত্র ১ বলছে: "পরের কাগজটা বেঞ্চের নিচে।" বেঞ্চের সূত্র বলছে: "ফোয়ারায় খোঁজো।" ফোয়ারার সূত্র বলছে: "বড় গাছের পাশে খুঁড়ো।"\n\nপ্রতিটা সূত্রে **একটা বার্তা আর পরের সূত্রের পথ** লেখা থাকে। তুমি কোনোদিন সব সূত্র একসাথে হাতে রাখো না — যেটা পড়ছো, শুধু ওটাই ধরে থাকো।\n\nএটাই হোয়া **লিংকড লিস্ট (linked list)**: একটা পরে আরেকটা জোড়া লাগানো, আর শুরুর বিন্দুটার নাম **হেড (head)**।'
        },
        line: 1,
        scene: {
          kind: 'cards',
          label: 'Treasure hunt = a chain of clues',
          cards: [
            { icon: '📜', title: 'Clue 1', desc: '"Next paper is under the bench."', state: 'active', tag: 'data + next', accent: 'var(--yellow)' },
            { icon: '🪑', title: 'Clue 2', desc: '"Look in the fountain."', state: 'ok', tag: 'data + next', accent: 'var(--cyan)' },
            { icon: '⛲', title: 'Clue 3', desc: '"Dig by the big tree."', state: 'ok', tag: 'data + next', accent: 'var(--purple)' },
            { icon: '🏁', title: 'You hold one at a time', desc: 'start at head, follow next, stop at the end.', state: 'ok', tag: 'the idea', accent: 'var(--green)' }
          ],
          caption: 'Each clue = <b>data</b> + <b>a way to the next one</b> · that is a node'
        }
      },
      {
        title: { en: 'A node is data plus next', bn: 'নোড মানে ডেটা আর next' },
        explanation: {
          en: 'Every clue card has two fields:\n\n- **data** — the message written on it.\n- **next** — the address of the next card.\n\nIn code a node is a tiny record: `{ data: 12, next: … }`. When there is no next card, `next` holds **null** — the chain simply ends there.\n\n> `null` is the period at the end of the sentence.',
          bn: 'প্রতিটা সূত্রের কাগজে দুটো জিনিস থাকে:\n\n- **ডেটা (data)** — কাগজে যা লেখা।\n- **নেক্সট (next)** — পরের কাগজের ঠিকানা।\n\nকোডে নোড (node) মানে ছোট্ট একটা রেকর্ড: `{ data: 12, next: … }`। পরের কাগজ না থাকলে `next`-এ থাকে **null** — সেখানেই শিকুলটা শেষ।\n\n> null মানে বাক্যের শেষে দাঁড়ি।'
        },
        line: 1,
        scene: {
          kind: 'linkedlist',
          label: '{ data: 12, next: 7 } → { data: 7, next: 9 } → { data: 9, next: null }',
          nodes: [12, 7, 9],
          head: 0,
          showIndex: true,
          showNull: true,
          aux: 'node = { <b>data</b>: 7, <b>next</b>: index of 9 }',
          note: 'The arrow leaving a box is its **next** field. The ∅ box is **null**.',
          legend: [
            { label: 'data (the value)', color: 'var(--cyan)' },
            { label: 'next (the arrow)', color: 'var(--purple)' }
          ]
        }
      },
      {
        title: { en: 'The head is the only way in', bn: 'হেড একমাত্র প্রবেশপথ' },
        explanation: {
          en: 'The list itself remembers only one thing: **head** — the index of the first node. From there, every other node is reachable by following arrows.\n\nIf you lose `head`, you lose the whole list. The nodes still exist in memory, but nothing can find them any more.\n\n`head == null` means the list is **empty**.',
          bn: 'লিস্টটা নিজে শুধু একটা জিনিস মনে রাখে: **হেড (head)** — প্রথম নোডটার ঠিকানা। ওখান থেকে তীর ধরে বাকি সব নোডে পৌঁছানো যায়।\n\n`head` হারালে পুরো লিস্টই হারালেন। নোডগুলো (node) মেমরিতে আছে, কিন্তু আর কেউ ওদের খুঁজে পাবে না।\n\n`head == null` মানে লিস্টটা **খালি**।'
        },
        line: 3,
        scene: {
          kind: 'linkedlist',
          label: 'head → 12 → 7 → 9 → null',
          nodes: [12, 7, 9],
          head: 0,
          showIndex: true,
          showNull: true,
          pointers: [{ i: 0, label: 'head', tone: 'yellow' }],
          highlights: { active: [0] },
          aux: 'head = 0  ·  head is the ONLY thing the list stores',
          note: 'Start at **head**, follow **next**, stop at **null**.'
        }
      },
      {
        title: { en: 'Walking the list — traverse', bn: 'লিস্ট ঘাটা — ট্রাভার্স' },
        explanation: {
          en: 'To see every value you need **one slow pointer** and one rule:\n\n1. start at `head`,\n2. read the node,\n3. move to `cur.next`,\n4. stop when `cur == null`.\n\nHere `cur` walks **12 → 7 → 9**, then hits null and stops. For `n` nodes that is `n` visits → **O(n)**.\n\n> Walking is cheap. **Jumping** to node number 5 by index is impossible — you must walk 5 steps. Arrays can jump, linked lists cannot. Extra memory stays `O(1)`: one pointer, zero arrays.',
          bn: 'সব মান দেখতে **একটা ধীর পয়েন্টার** আর একটা নিয়ম লাগে:\n\n1. `head` থেকে শুরু,\n2. নোডটা পড়ো,\n3. `cur.next`-এ চলে যাও,\n4. `cur == null` হলে থামো।\n\nএখানে `cur` চলছে **12 → 7 → 9**, তারপর null ধরে থেমে গেল। `n` নোডে `n` বার দেখা → **O(n)**।\n\n> হাঁটা সস্তা। **৫ নম্বর নোডে ঝাঁপ দিয়ে** যাওয়া এখানে সম্ভব নয় — ৫ ধাপ হেঁটে যেতে হবে। অ্যারে (array) ঝাঁপ দেয়, লিংকড লিস্ট দেয় না। বাড়তি মেমরি থাকে `O(1)`: একটা পয়েন্টার, কোনো অ্যারে নেই।'
        },
        line: [9, 10],
        state: { cur: 2, visited: 3, steps: 3, extraSpace: 'O(1)' },
        scene: {
          kind: 'linkedlist',
          label: 'cur walks 12 → 7 → 9, then cur.next is null → stop',
          nodes: [12, 7, 9],
          head: 0,
          showIndex: true,
          showNull: true,
          pointers: [
            { i: 0, label: 'head', tone: 'yellow' },
            { i: 2, label: 'cur', tone: 'cyan' }
          ],
          highlights: { active: [2], sorted: [0, 1] },
          aux: 'visited 3 of 3 · end of list = null',
          note: 'Green boxes are already read. **null** ends the walk.',
          caption: 'traverse = head → next → next → null'
        }
      },
      {
        title: { en: 'Insert at the head — O(1)', bn: 'হেডে ঢোকানো — O(1)' },
        explanation: {
          en: 'A new clue arrives and it must go **first**. Three moves, all instant:\n\n1. `node.next = head` → the new card points at the old first card.\n2. `head = node` → the list now starts at the new card.\n3. done.\n\nNo walking, no shifting. `n` does not matter → **O(1)**. This is the linked list\'s superpower.',
          bn: 'নতুন সূত্র এসেছে, ওটাকে **সবার আগে** যেতে হবে। তিনটা কাজ, সবই তাৎক্ষণিক:\n\n1. `node.next = head` → নতুন কাগজটা পুরোনো প্রথমটার দিকে তীর তোলে।\n2. `head = node` → লিস্টটা এখন নতুন কাগজ থেকে শুরু।\n3. শেষ।\n\nকোনো হাঁটা নেই, কোনো সরানো নেই। `n` কোনো মায়ের নয় → **O(1)**। এটাই লিংকড লিস্টের মূল শক্তি।'
        },
        line: [2, 3],
        state: { oldValue: 12, newValue: 99, cost: 'O(1)' },
        scene: {
          kind: 'linkedlist',
          label: 'pushFront(99) — new node jumps to the front',
          nodes: [99, 12, 7, 9],
          head: 0,
          showIndex: true,
          showNull: true,
          pointers: [{ i: 0, label: 'head', tone: 'yellow' }],
          highlights: { insert: [0] },
          aux: '99.next → <b>12</b>  ·  head → <b>99</b>',
          note: 'The green box is the brand new node. Old head (12) never moved.',
          legend: [{ label: 'new node', color: 'var(--green)' }],
          caption: 'two assignments, no walking — O(1)'
        }
      },
      {
        title: { en: 'Append at the tail — walk first', bn: 'শেষে জোড়া — আগে হেঁটে যেতে হয়' },
        explanation: {
          en: 'To add at the **end** there is no shortcut: start at `head` and walk until `cur.next == null`.\n\nHere the walk costs 3 hops (12 → 7 → 9). Then one assignment: `cur.next = node`.\n\n> Keep **prev** = the node before `cur`. When `cur` becomes null, `prev` is the tail — that is exactly how the code does it in one pass.',
          bn: '**শেষে** যোগ করতে কোনো ছোট পথ নেই: `head` থেকে হাঁটো, `cur.next == null` না হওয়া পর্যন্ত।\n\nএখানে হাঁটা লাগল ৩ ধাপ (12 → 7 → 9)। তারপর একটা অ্যাসাইনমেন্ট: `cur.next = node`।\n\n> **prev** = `cur`-এর আগের নোডটা ধরে রাখো। `cur` যখন null হয়, `prev`-টাই শেষ নোড (tail) — কোডও এক পাসে ঠিক এভাবেই করে।'
        },
        line: 11,
        state: { prev: 2, cur: null, hops: 3, appended: 55 },
        scene: {
          kind: 'linkedlist',
          label: 'append(55) — walk to the tail, then link',
          nodes: [12, 7, 9, 55],
          head: 0,
          showIndex: true,
          showNull: true,
          pointers: [
            { i: 2, label: 'prev', tone: 'amber' },
            { i: 3, label: 'new', tone: 'green' }
          ],
          highlights: { insert: [3], active: [2] },
          aux: 'visited 3 nodes · prev = <b>9</b> · prev.next → <b>55</b>',
          note: 'The old tail (9) now points at the new node. Everything before it stayed still.',
          caption: 'append costs the walk: O(n)'
        }
      },
      {
        title: { en: 'Delete — link around the node', bn: 'মুছে ফেলা — চারপাশে লিংক টানা' },
        explanation: {
          en: 'The clue at index 1 (value **7**) is wrong. We do not erase it — we **skip** it.\n\nOne line does the job: `prev.next = cur.next`. The arrow from 12 now lands on 9, and node 7 falls out of the chain.\n\nTo find `prev` you walk from `head`, so finding the spot costs `O(n)`. But the moment you have `prev`, the un-link itself is `O(1)`.',
          bn: '১ নম্বর সূত্রটা (মান **7**) ভুল। ওটাকে মুছি না — **বাদ দিয়ে** যাই।\n\nএক লাইনেই কাজ হয়: `prev.next = cur.next`। ১২ থেকে তীরটা এখন সরাসরি ৯-এ গেল, আর ৭ নোডটা শিকুল থেকে বাদ পড়ল।\n\n`prev` খুঁজতে `head` থেকে হেঁটে যেতে হয়, তাই জায়গাটা বের করাটা `O(n)`। কিন্তু `prev` পেয়ে গেলে তীর বদলাটা নিজেই `O(1)`।'
        },
        line: 15,
        state: { prev: 0, cur: 1, removed: 7 },
        scene: {
          kind: 'linkedlist',
          label: 'remove node 7 → 12 now points straight to 9',
          nodes: [12, 7, 9],
          head: 0,
          showIndex: true,
          showNull: true,
          next: [2, null, null],
          pointers: [
            { i: 0, label: 'prev', tone: 'amber' },
            { i: 1, label: 'cur', tone: 'red' }
          ],
          highlights: { remove: [1], active: [0] },
          aux: 'prev.next → <b>9</b>  ·  node 7 is out of the chain',
          note: 'Find `prev` first (O(n)), then **one link change** removes the node.',
          legend: [
            { label: 'prev (kept)', color: 'var(--amber)' },
            { label: 'removed', color: 'var(--red)' }
          ]
        }
      },
      {
        title: { en: 'Array vs list — and when to use it', bn: 'অ্যারে বনাম লিস্ট — কখন কোনটা' },
        explanation: {
          en: 'Same data, different trade-offs:\n\n- **Jump** — array `O(1)` with `arr[i]`; the list must walk, `O(n)`.\n- **Front insert** — array shifts everything `O(n)`; the list just moves `head`, `O(1)`.\n- **Middle delete** — array shifts `O(n)`; the list changes two arrows, `O(1)` once you have the spot.\n- **Memory** — array reserves space up front; the list pays per node and wastes no empty slots.\n\n**Use a linked list when** you add or remove mostly at the **front**, the size changes often, or you walk the list anyway (undo history, a stream of events).\n\n> **Avoid it when** you need item 5000 right now — arrays win. Costs to remember: walk `O(n)` · head insert `O(1)` · append `O(n)` · delete after `prev` `O(1)` · extra space `O(1)`.',
          bn: 'একই ডেটা, আলাদা আদান-প্রদান:\n\n- **ঝাঁপ** — অ্যারেতে `arr[i]` দিয়ে `O(1)`; লিস্টে হেঁটে যেতে হয়, `O(n)`।\n- **সামনে ঢোকানো** — অ্যারে সব সরায় `O(n)`; লিস্ট শুধু `head` বদলায়, `O(1)`।\n- **মাঝখানে মুছা** — অ্যারে সব সরায় `O(n)`; লিস্ট দুটো তীর বদলায়, জায়গা পেয়ে গেলে `O(1)`।\n- **মেমরি** — অ্যারে আগে থেকেই জায়গা রেখে দেয়; লিস্ট প্রতি নোডে খরচ করে, কোনো খালি ঘর নষ্ট করে না।\n\n**লিংকড লিস্ট ব্যবহার করো যখন** বেশিরভাগ সময় **সামনে** ঢোকাও বা মুছো, সাইজ বদলায়, বা লিস্ট ওভারই ঘাটছো (আনডু হিস্ট্রি, ইভেন্টের স্ট্রিম)।\n\n> **এড়িয়ে চলো যখন** ৫০০০ নম্বর আইটেম এখনই লাগবে — ওখানে অ্যারে জিতে। মনে রাখার খরচ: হাঁটা `O(n)` · হেডে ঢোকানো `O(1)` · শেষে জোড়া `O(n)` · `prev` পেয়ে মুছা `O(1)` · বাড়তি স্পেস `O(1)`।'
        },
        scene: {
          kind: 'cards',
          label: 'Which one wins where?',
          cards: [
            { icon: '🪜', title: 'Jump to index i', desc: 'Array O(1) · list must walk O(n)', state: 'ok', tag: 'array wins', accent: 'var(--green)' },
            { icon: '➕', title: 'Insert at front', desc: 'Array shifts O(n) · list O(1)', state: 'active', tag: 'list wins', accent: 'var(--yellow)' },
            { icon: '✂️', title: 'Delete in middle', desc: 'Array shifts O(n) · list two links', state: 'active', tag: 'list wins', accent: 'var(--yellow)' },
            { icon: '🧠', title: 'Memory', desc: 'Array reserves ahead · list grows per node', state: 'ok', tag: 'list wins', accent: 'var(--cyan)' },
            { icon: '🪄', title: 'Use it for streams', desc: 'undo history, queues of events, front-heavy data', state: 'ok', tag: 'good fit', accent: 'var(--green)' },
            { icon: '🪜', title: 'Skip it for lookups', desc: 'need item 5000 now? use an array', state: 'bad', tag: 'weakness', accent: 'var(--red)' }
          ],
          caption: 'There is no best structure — only the one that fits · next: <b>Reverse a Linked List</b>'
        }
      }
    ]
  },

  {
    id: 'reverse-list',
    name: { en: 'Reverse a Linked List', bn: 'লিংকড লিস্ট উল্টানো' },
    description: {
      en: 'Turn the chain around with three pointers',
      bn: 'তিনটা পয়েন্টার দিয়ে শিকুলটা উল্টে দেওয়া'
    },
    categoryKey: 'linked',
    level: 'intermediate',
    order: 20,
    icon: '🔄',
    complexity: {
      time: 'O(n)',
      best: 'O(n)',
      worst: 'O(n)',
      space: 'O(1)',
      note: {
        en: 'One pass over the list, and only three pointer variables — no matter how long the list is.',
        bn: 'লিস্টের উপর এক পাস, আর শুধু তিনটা পয়েন্টার ভেরিয়েবল — লিস্ট যত দীর্ঘ হোক তার পরও।'
      }
    },
    code: {
      en: [
        'reverse(head):',
        '  prev = null',
        '  curr = head',
        '  while curr != null:',
        '    next = curr.next     // save the next node',
        '    curr.next = prev      // flip the arrow back',
        '    prev = curr           // slide forward',
        '    curr = next',
        '  return prev             // prev is the new head'
      ],
      bn: [
        'reverse(head):',
        '  prev = null',
        '  curr = head',
        '  while curr != null:',
        '    next = curr.next     // পরের নোডটা আগে রাখো',
        '    curr.next = prev      // তীরটা উল্টো দিকে ঘোরাও',
        '    prev = curr           // সামনে সরো',
        '    curr = next',
        '  return prev             // prev-টাই নতুন head'
      ]
    },
    steps: [
      {
        title: { en: 'The question: flip the chain', bn: 'প্রশ্নটা: শিকুলটা উল্টে দাও' },
        explanation: {
          en: 'Right now the list reads **1 → 2 → 3 → null**. We want **3 → 2 → 1 → null**.\n\nIt sounds easy, but there is one trap: as soon as you flip an arrow, you may **lose the way to the rest of the list**.\n\nSo the job is: turn every arrow around, without dropping anyone on the road.',
          bn: 'এখন লিস্টটা পড়া যাচ্ছে **1 → 2 → 3 → null**। আমরা চাই **3 → 2 → 1 → null**।\n\nশোনাতে সহজ, কিন্তু একটা ফাঁদ আছে: একটা তীর উল্টে দেওয়ার সঙ্গে সঙ্গে **বাকি লিস্টের পথ হারিয়ে যেতে পারে**।\n\nতাই কাজটা: প্রতিটা তীর উল্টো করা, রাস্তায় কাউকে ফেলে না দিয়ে।'
        },
        line: 0,
        scene: {
          kind: 'linkedlist',
          label: 'before: 1 → 2 → 3 → null   ·   after: 3 → 2 → 1 → null',
          nodes: [1, 2, 3],
          head: 0,
          showIndex: true,
          showNull: true,
          pointers: [{ i: 0, label: 'head', tone: 'yellow' }],
          aux: 'goal: every arrow points the other way',
          note: 'Same three nodes. Only the **arrows** change direction.',
          caption: 'One pass · three pointers · O(1) extra memory'
        }
      },
      {
        title: { en: 'The three players', bn: 'তিনটা খেলোয়াড়' },
        explanation: {
          en: 'We keep exactly three pointers:\n\n- **prev = null** — the already-reversed part behind us.\n- **curr = head** — the node we are fixing right now.\n- **next** — we grab it fresh each round, so we never lose the road ahead.\n\nThe trick is always the same order: **save next → flip curr → slide forward**.',
          bn: 'আমরা ঠিক তিনটা পয়েন্টার রাখি:\n\n- **prev = null** — পেছনে যে অংশটা আগেই উল্টে ফেলা হয়েছে।\n- **curr = head** — যে নোডটা এখন ঠিক করছি।\n- **next** — প্রতিটা চক্রে নতুন করে ধরি, তাই সামনের পথ কখনো হারায় না।\n\nনিয়মটা সবসময় একই ক্রমে: **next রাখো → curr উল্টাও → সামনে সরো**।'
        },
        line: 2,
        state: { prev: 'null', curr: 0, 'curr.value': 1 },
        scene: {
          kind: 'linkedlist',
          label: 'start — prev = null, curr = head (1)',
          nodes: [1, 2, 3],
          head: 0,
          showIndex: true,
          showNull: true,
          pointers: [
            { i: 0, label: 'curr', tone: 'cyan' }
          ],
          highlights: { active: [0], dim: [1, 2] },
          aux: 'prev → <b>null</b>  ·  curr → <b>1</b>',
          note: 'Nothing is reversed yet, so `prev` points at **null** — it sits before node 1.',
          legend: [
            { label: 'prev (reversed part)', color: 'var(--amber)' },
            { label: 'curr (fixing now)', color: 'var(--cyan)' }
          ]
        }
      },
      {
        title: { en: 'Round 1 — save next, flip 1', bn: 'চক্র ১ — next রাখো, ১ উল্টাও' },
        explanation: {
          en: 'Round 1 at node **1**:\n\n1. `next = 2` — we save where the road goes next.\n2. `1.next = prev` → node 1 now points at **null** instead of 2.\n\nThe link `1 → 2` is gone on purpose — that is the flip. We can afford to lose it **because we already saved 2 in `next`**.',
          bn: 'চক্র ১, নোড **১**-এ:\n\n1. `next = 2` — পরের পথটা আগে রাখলাম।\n2. `1.next = prev` → ১ নোডটা এখন ২-এর বদলে **null**-এর দিকে তীর তোলে।\n\n`1 → 2` লিংকটা ইচ্ছে করেই গেল — এটাই তো উল্টানো। হারানো যায়, কারণ **`next`-এ ২ টা আগেই রেখেছি**।'
        },
        line: [4, 5],
        state: { prev: 'null', curr: 0, next: 1, flipped: '1.next = null' },
        scene: {
          kind: 'linkedlist',
          label: 'round 1 — next saved as 2, then 1.next flipped to null',
          nodes: [1, 2, 3],
          head: 0,
          showIndex: true,
          showNull: true,
          next: [null, 2, null],
          pointers: [
            { i: 0, label: 'curr', tone: 'cyan' },
            { i: 1, label: 'next', tone: 'purple' }
          ],
          highlights: { active: [0], swap: [0, 1] },
          aux: 'prev → <b>null</b>  ·  next → <b>2</b> (saved) · 1.next → <b>null</b> (flipped)',
          note: 'The arrow between 1 and 2 is being turned around.',
          legend: [
            { label: 'arrow flipping', color: 'var(--amber)' },
            { label: 'saved in next', color: 'var(--purple)' }
          ],
          caption: 'step order: <b>save next</b> → <b>flip curr</b> → <b>slide</b>'
        }
      },
      {
        title: { en: 'Slide all three forward', bn: 'তিনটাই সামনে সরো' },
        explanation: {
          en: 'Now the slide, always in this order:\n\n- `prev = curr` → prev becomes **1**.\n- `curr = next` → curr becomes **2**.\n\nBoth pointers moved one step. `next` is dropped — we will grab a fresh one at the top of the next round.\n\n**State now:** `prev → 1`, `curr → 2`, and node 1 already points at null.',
          bn: 'এখন সরানো, সবসময় এই ক্রমে:\n\n- `prev = curr` → prev হলো **১**।\n- `curr = next` → curr হলো **২**।\n\nদুটোই এক ধাপ সরল। `next` ফেলে দিলাম — পরের চক্রের শুরুতে নতুন করে ধরব।\n\n**এখনকার অবস্থা:** `prev → 1`, `curr → 2`, আর ১ নোডটা আগে থেকেই null-এর দিকে তীর তুলে আছে।'
        },
        line: [6, 7],
        state: { prev: 0, curr: 1, 'prev.value': 1, 'curr.value': 2 },
        scene: {
          kind: 'linkedlist',
          label: 'after the slide — prev = 1, curr = 2',
          nodes: [1, 2, 3],
          head: 0,
          showIndex: true,
          showNull: true,
          next: [null, 2, null],
          pointers: [
            { i: 0, label: 'prev', tone: 'amber' },
            { i: 1, label: 'curr', tone: 'cyan' }
          ],
          highlights: { active: [1], sorted: [0] },
          aux: 'prev → <b>1</b>  ·  curr → <b>2</b>',
          note: 'Node 1 is done: it points at **null**. Round 2 starts at 2.',
          legend: [
            { label: 'finished (reversed)', color: 'var(--green)' },
            { label: 'curr now', color: 'var(--cyan)' }
          ]
        }
      },
      {
        title: { en: 'Round 2 — flip node 2', bn: 'চক্র ২ — ২ নম্বর উল্টাও' },
        explanation: {
          en: 'Same three moves at node **2**:\n\n1. `next = 3` — save the rest of the road.\n2. `2.next = prev` → node 2 points back at **1**.\n3. slide: `prev = 2`, `curr = 3`.\n\nNow the tail reads **2 → 1 → null**. The reversed part grows by one node every round.',
          bn: '২ নম্বর নোডে একই তিন কাজ:\n\n1. `next = 3` — বাকি পথটা রেখে দিলাম।\n2. `2.next = prev` → ২ নোডটা এখন **১**-এর দিকে ফিরে তীর তোলে।\n3. সরানো: `prev = 2`, `curr = 3`।\n\nএখন লেজটা পড়া যাচ্ছে **2 → 1 → null**। প্রতি চক্রে উল্টো অংশটা এক নোড বড় হয়।'
        },
        line: [4, 5, 6, 7],
        state: { prev: 1, curr: 2, next: 2, reversed: '2 → 1 → null' },
        scene: {
          kind: 'linkedlist',
          label: 'round 2 — 2.next flips back to 1',
          nodes: [1, 2, 3],
          head: 0,
          showIndex: true,
          showNull: true,
          next: [null, 0, null],
          pointers: [
            { i: 1, label: 'prev', tone: 'amber' },
            { i: 2, label: 'curr', tone: 'cyan' }
          ],
          highlights: { active: [1], swap: [1, 0] },
          aux: '2.next → <b>1</b>  ·  after the slide: prev = 2, curr = 3',
          note: 'The arrow now runs **2 → 1**. After the slide, `curr` sits on node 3.',
          legend: [
            { label: 'just flipped', color: 'var(--amber)' },
            { label: 'waiting in next', color: 'var(--purple)' }
          ]
        }
      },
      {
        title: { en: 'Round 3 — flip node 3', bn: 'চক্র ৩ — ৩ নম্বর উল্টাও' },
        explanation: {
          en: 'At node **3**: `next = null` (it was the last node), then `3.next = prev` → **3 → 2**.\n\nSlide again: `prev = 3`, `curr = null`.\n\nLook at `next: [null, 0, 1]` in the drawing — every arrow now points backwards. The chain is fully reversed.',
          bn: '৩ নম্বর নোডে: `next = null` (এটাই ছিল শেষ নোড), তারপর `3.next = prev` → **3 → 2**।\n\nআবার সরলাম: `prev = 3`, `curr = null`।\n\nছবিটার `next: [null, 0, 1]` লাইনটা দেখো — সব তীর এখন উল্টো দিকে। শিকুল পুরোপুরি উল্টে গেছে।'
        },
        line: [5, 6, 7],
        state: { prev: 2, curr: 'null', next: 'null', reversed: '3 → 2 → 1 → null' },
        scene: {
          kind: 'linkedlist',
          label: 'round 3 — 3.next flips back to 2, curr becomes null',
          nodes: [1, 2, 3],
          head: 0,
          showIndex: true,
          showNull: true,
          next: [null, 0, 1],
          pointers: [
            { i: 2, label: 'prev', tone: 'cyan' }
          ],
          highlights: { active: [2], swap: [2, 1] },
          aux: '3.next → <b>2</b>  ·  prev → <b>3</b>  ·  curr → <b>null</b>',
          note: 'After the slide `curr` fell off the end, so `while curr != null` stops.',
          legend: [{ label: 'last arrow flipped', color: 'var(--green)' }]
        }
      },
      {
        title: { en: 'Result — prev is the new head', bn: 'ফল — prev-টাই নতুন head' },
        explanation: {
          en: 'The loop ends because `curr == null`. But **prev** sits on the last node we touched — node **3**.\n\nSo we `return prev`, and `head` becomes 3. Walking forward now gives **3 → 2 → 1 → null**.\n\n> Old head (1) is now the **tail**. The list never grew or shrank — only the arrows changed direction.',
          bn: '`curr == null` হয়ে গেলে লুপ থেমে যায়। কিন্তু **prev** শেষ যে নোডটা ধরল, ওখানেই আছে — নোড **৩**।\n\nতাই `return prev` করি, আর `head` হয়ে যায় ৩। এখন সামনে থেকে পড়লে পাওয়া যায় **3 → 2 → 1 → null**।\n\n> আগের হেড (১) এখন **লেজ (tail)**। লিস্ট বড় বা ছোট হয়নি — শুধু তীরগুলোর দিক বদলেছে।'
        },
        line: 8,
        state: { newHead: 2, oldHead: 0, '3.next': 1, '2.next': 0, '1.next': 'null' },
        scene: {
          kind: 'linkedlist',
          label: 'return prev → head = 3  ·  3 → 2 → 1 → null',
          nodes: [3, 2, 1],
          head: 0,
          showIndex: true,
          showNull: true,
          pointers: [{ i: 0, label: 'head', tone: 'yellow' }],
          highlights: { active: [0], sorted: [0, 1, 2] },
          aux: 'prev → <b>3</b> = the new head',
          note: 'Drawn left → right as it is now read: **3, 2, 1**.',
          caption: '✓ list reversed in one pass'
        }
      },
      {
        title: { en: 'Cost — and why interviews love it', bn: 'খরচ — আর ইন্টারভিউতে কেন এত পছন্দ' },
        explanation: {
          en: '- **Time `O(n)`** — every node is touched exactly once, in one pass.\n- **Space `O(1)`** — only `prev`, `curr`, `next`. Recursion would cost `O(n)` space, because the call stack grows `n` levels deep.\n\n> Iteration wins here: same time, far less memory. Say the three moves out loud: **save → flip → slide**.\n\nIt is a small question with a big signal: do you understand **pointers** well enough not to lose the list? Can you keep the **order** straight? Do you state the **complexity** without being asked?\n\nOnce you can flip a list, the harder versions (reverse in groups of k, palindrome check) are the same three moves again.',
          bn: '- **সময় `O(n)`** — প্রতিটা নোড এক পাসে ঠিক একবার ছুঁয়ে যাওয়া হয়।\n- **স্পেস `O(1)`** — শুধু `prev`, `curr`, `next`। রিকারশনে করলে স্পেসও `O(n)` লাগত — কল স্ট্যাক `n` ধাপ গভীর হয়ে যেত।\n\n> এখানে ইটারেশনই জিতে: একই সময়, অনেক কম মেমরি। তিন ধাপটা মুখে মুখে বলো: **save → flip → slide**।\n\nছোট প্রশ্ন, বড় ইঙ্গিত: **পয়েন্টার (pointer)** এমনভাবে বোঝো যে লিস্ট হারায় না? ধাপগুলোর **ক্রম** ঠিক রাখতে পারো? জিজ্ঞেস না করেই **কমপ্লেক্সিটি** বলতে পারো?\n\nএকবার লিস্ট উল্টাতে পেলে, কঠিন ভ্যারিয়েশনগুলো (k করে করে উল্টানো, প্যালিনড্রোম চেক) — একই তিন ধাপের ছোট বদল মাত্র।'
        },
        line: [6, 8],
        scene: {
          kind: 'cards',
          label: 'Reverse a list at a glance',
          cards: [
            { icon: '⏱', title: 'Time O(n)', desc: 'one pass, every node once', state: 'ok', tag: 'linear', accent: 'var(--green)' },
            { icon: '🧠', title: 'Space O(1)', desc: 'prev, curr, next — that is all', state: 'ok', tag: 'constant', accent: 'var(--cyan)' },
            { icon: '♻️', title: 'Recursion = O(n) space', desc: 'call stack grows n levels', state: 'bad', tag: 'costlier', accent: 'var(--red)' },
            { icon: '🎯', title: 'Order of moves matters', desc: 'save next BEFORE flipping', state: 'active', tag: 'the trap', accent: 'var(--yellow)' },
            { icon: '📊', title: 'Interview signal', desc: 'pointers + order + complexity, said out loud', state: 'active', tag: 'core skill', accent: 'var(--purple)' },
            { icon: '🧩', title: 'Variants', desc: 'reverse in groups of k, palindromes', state: 'ok', tag: 'next up', accent: 'var(--cyan)' }
          ],
          caption: 'Next lesson: <b>Cycle Detection</b> — a slow and a fast runner'
        }
      }
    ]
  },

  {
    id: 'cycle-detection',
    name: { en: 'Cycle Detection', bn: 'সাইকেল খোঁজা' },
    description: {
      en: "Floyd's tortoise and hare — a slow and a fast runner",
      bn: 'কাছি ও খরগোশ — ধীর আর দ্রুত দৌড়বাজ'
    },
    categoryKey: 'linked',
    level: 'intermediate',
    order: 30,
    icon: '🔁',
    complexity: {
      time: 'O(n)',
      best: 'O(1)',
      worst: 'O(n)',
      space: 'O(1)',
      note: {
        en: 'The fast pointer moves at most 2 steps per node, so the whole list is still scanned only once.',
        bn: 'দ্রুত পয়েন্টার প্রতি নোডে সর্বোচ্চ ২ ধাপ চলে, তাই পুরো লিস্টটা তবু একবারই ঘাটা হয়।'
      }
    },
    code: {
      en: [
        'hasCycle(head):',
        '  slow = head, fast = head',
        '  while fast != null and fast.next != null:',
        '    slow = slow.next          // 1 step',
        '    fast = fast.next.next     // 2 steps',
        '    if slow == fast: return true   // they met',
        '  return false                // fast fell off the end'
      ],
      bn: [
        'hasCycle(head):',
        '  slow = head, fast = head',
        '  while fast != null and fast.next != null:',
        '    slow = slow.next          // ১ ধাপ',
        '    fast = fast.next.next     // ২ ধাপ',
        '    if slow == fast: return true   // দুজনে মিলে গেল',
        '  return false                // fast শেষে পড়ে গেল'
      ]
    },
    steps: [
      {
        title: { en: 'What a cycle is', bn: 'সাইকেল বা গোলচক্র কী' },
        explanation: {
          en: 'A normal list ends: `3 → 4 → null`. A list with a **cycle** loops back: the last node points at an earlier node, so the walk never ends.\n\nHow does it happen? Usually a forgotten `null`. You insert a node and forget to cut the old tail, and suddenly node 4 points back at node 2.\n\nThe walk `while cur != null` now spins forever — a classic infinite loop.',
          bn: 'সাধারণ লিস্টের শেষ আছে: `3 → 4 → null`। **সাইকেল (cycle)** থাকলে ওটা ঘুরে আসে: শেষ নোডটা আগের কোনো নোডকেই তীর তোলে, তাই হাঁটাটা কখনো শেষ হয় না।\n\nএটা হয় কীভাবে? সাধারণত `null` ভুলে যাওয়ায়। নোড ঢোকালে পুরোনো লেজটা কেটে দেওয়া ভুলে যাও, আর হঠাৎ ৪ নম্বর নোডটা ফিরে ২ নম্বর নোডকে তীর তোলে।\n\n`while cur != null` লুপটা এখন চিরকাল ঘুরতে থাকে — চিরপরিচিত ইনফিনিট লুপ (infinite loop)।'
        },
        line: 2,
        scene: {
          kind: 'linkedlist',
          label: 'forgotten null → next[3] = 1 instead of null',
          nodes: [1, 2, 3, 4],
          head: 0,
          showIndex: true,
          next: [1, 2, 3, 1],
          showNull: false,
          pointers: [{ i: 0, label: 'head', tone: 'yellow' }],
          highlights: { target: [3] },
          aux: 'next = [1, 2, 3, <b>1</b>]  ·  node 4 should have said null',
          note: 'The red arrow from **4 back to 2** is the bug — the list now circles.',
          legend: [{ label: 'wrong link (the cycle)', color: 'var(--red)' }],
          caption: 'walk from head → you circle 2 → 3 → 4 forever'
        }
      },
      {
        title: { en: 'The story — a circular track', bn: 'গল্পটা — গোল আকারের মাঠ' },
        explanation: {
          en: 'Imagine two runners on a track.\n\nIf the track is a **straight road**, the fast runner simply sprints past and reaches the end.\n\nBut if the track is a **circle**, the fast runner comes up from behind and taps the slow one on the shoulder. Meeting is unavoidable.\n\n> That is the whole idea: **if there is a cycle they meet; if not, the fast one hits the end.**',
          bn: 'ভাবো দুই দৌড়বাজ একটা মাঠে দৌড়াচ্ছে।\n\nমাঠটা যদি **সোজা সড়ক** হয়, দ্রুতটা পিছনে পড়ে শেষ পর্যন্ত পৌঁছে যায়।\n\nকিন্তু মাঠটা যদি **গোল** হয়, দ্রুতটা পেছন থেকে এসে ধীরটার কাঁধে হাত রাখে। দেখা হওয়া এড়ানোই যায় না।\n\n> এটাই পুরো আইডিয়া: **সাইকেল (cycle) থাকলে দুজনে মিলবে; না থাকলে দ্রুতটা শেষে গিয়ে পড়বে।**'
        },
        line: 2,
        scene: {
          kind: 'cards',
          label: 'Two runners, two possible endings',
          cards: [
            { icon: '🛣️', title: 'Straight road', desc: 'fast runner reaches null → no cycle', state: 'ok', tag: 'case A', accent: 'var(--green)' },
            { icon: '🏟️', title: 'Circular track', desc: 'fast runner laps the slow one → they meet', state: 'active', tag: 'case B', accent: 'var(--yellow)' },
            { icon: '🐇', title: 'Hare (fast)', desc: 'moves 2 nodes each round', state: 'active', tag: 'fast', accent: 'var(--cyan)' },
            { icon: '🐢', title: 'Tortoise (slow)', desc: 'moves 1 node each round', state: 'ok', tag: 'slow', accent: 'var(--purple)' }
          ],
          caption: 'Floyd\'s algorithm — also called <b>tortoise and hare</b>'
        }
      },
      {
        title: { en: 'Set up slow and fast', bn: 'slow আর fast বসাও' },
        explanation: {
          en: 'Both runners start at `head`:\n\n- **slow = 0** → moves **1 step** per round.\n- **fast = 0** → moves **2 steps** per round.\n\nThat is the only difference between them. Everything else in the loop is identical.',
          bn: 'দুজনেই `head` থেকে শুরু করে:\n\n- **slow = ০** → প্রতি চক্রে **১ ধাপ** চলে।\n- **fast = ০** → প্রতি চক্রে **২ ধাপ** চলে।\n\nএটাই দুজনের মধ্যে একমাত্র পার্থক্য। লুপের বাকি সবকিছু হুবহু একই।'
        },
        line: 1,
        state: { slow: 0, fast: 0, 'slow.step': 1, 'fast.step': 2 },
        scene: {
          kind: 'linkedlist',
          label: 'start — both runners stand at head',
          nodes: [1, 2, 3, 4],
          head: 0,
          showIndex: true,
          next: [1, 2, 3, 1],
          showNull: false,
          pointers: [
            { i: 0, label: 'slow', tone: 'cyan' },
            { i: 0, label: 'fast', tone: 'amber' }
          ],
          highlights: { active: [0] },
          aux: 'slow = 0  ·  fast = 0  ·  round 1 is about to run',
          note: 'Round 1 has not run yet — they simply stand at the start.',
          legend: [
            { label: 'slow (1 step)', color: 'var(--cyan)' },
            { label: 'fast (2 steps)', color: 'var(--amber)' }
          ]
        }
      },
      {
        title: { en: 'Rounds 1 and 2 — they step together', bn: 'চক্র ১ ও ২ — দুজনে একসাথে চলল' },
        explanation: {
          en: 'They step together:\n\n**Round 1**\n- `slow` moves 1 → **node 2** (index 1).\n- `fast` moves 2 → **node 3** (index 2).\n\nDifferent nodes, so the loop runs again.\n\n**Round 2**\n- `slow` moves 1 → **node 3** (index 2).\n- `fast` moves 2 → node 4, then jumps along the cycle link back to **node 2** (index 1).\n\nThe cycle link is doing real work now — the hare is being pulled backwards relative to the track. They have swapped sides, but they are still not on the same node.',
          bn: 'দুজনে একসাথে চলল:\n\n**চক্র ১**\n- `slow` ১ ধাপ → **২ নম্বর নোড** (ইনডেক্স ১)।\n- `fast` ২ ধাপ → **৩ নম্বর নোড** (ইনডেক্স ২)।\n\nআলাদা নোড, তাই লুপ আবার চলল।\n\n**চক্র ২**\n- `slow` ১ ধাপ → **৩ নম্বর নোড** (ইনডেক্স ২)।\n- `fast` ২ ধাপ → ৪ নম্বর, তারপর সাইকেলের তীর ধরে ফিরে **২ নম্বর নোডে** (ইনডেক্স ১)।\n\nসাইকেলের তীরটা এখন আসল কাজ করছে — খরগোশ ট্র্যাকের হিসাবে পিছনে টেনে আসা হচ্ছে। দুজনে জায়গা বদলেছে, কিন্তু এখনো একই নোডে নয়।'
        },
        line: [3, 4],
        state: { round: 2, slow: 2, fast: 1, met: false },
        scene: {
          kind: 'linkedlist',
          label: 'after round 2 — slow = 2, fast = 1 (wrapped by the cycle)',
          nodes: [1, 2, 3, 4],
          head: 0,
          showIndex: true,
          next: [1, 2, 3, 1],
          showNull: false,
          pointers: [
            { i: 2, label: 'slow', tone: 'cyan' },
            { i: 1, label: 'fast', tone: 'amber' }
          ],
          highlights: { active: [2], compare: [1] },
          aux: 'round 1: slow → <b>2</b>, fast → <b>3</b> · round 2: slow → <b>3</b>, fast → <b>2</b>',
          note: 'Round 1 put them at index 1 and 2. Round 2 swapped them — still different nodes.',
          legend: [{ label: 'fast wrapped through node 4', color: 'var(--amber)' }]
        }
      },
      {
        title: { en: 'Round 3 — they meet', bn: 'চক্র ৩ — দুজনে মিলে গেল' },
        explanation: {
          en: 'Round 3:\n\n- `slow` moves 1 → **node 4** (index 3).\n- `fast` moves 2 → node 3 (index 2), then **node 4** (index 3).\n\nBoth sit on **node 4**. `slow == fast` → the loop returns **true**.\n\n> They met, so a **cycle exists**. That is the proof.',
          bn: 'চক্র ৩:\n\n- `slow` ১ ধাপ → **৪ নম্বর নোড** (ইনডেক্স ৩)।\n- `fast` ২ ধাপ → ইনডেক্স ১ থেকে `next.next` মানে ইনডেক্স ৩ → **৪ নম্বর নোড**।\n\nদুজনেই **৪ নম্বর নোডে** বসে আছে। `slow == fast` → লুপ **true** রিটার্ন করে।\n\n> দেখা হয়েছে, তাই **সাইকেল (cycle) আছে**। এটাই প্রমাণ।'
        },
        line: 5,
        state: { round: 3, slow: 3, fast: 3, met: true, result: true },
        scene: {
          kind: 'linkedlist',
          label: 'slow = fast = index 3 → return true',
          nodes: [1, 2, 3, 4],
          head: 0,
          showIndex: true,
          next: [1, 2, 3, 1],
          showNull: false,
          pointers: [
            { i: 3, label: 'slow', tone: 'cyan' },
            { i: 3, label: 'fast', tone: 'amber' }
          ],
          highlights: { active: [3], mark: [3] },
          aux: 'round 3 · slow → <b>4</b>  ·  fast → <b>4</b>  ·  slow == fast ✓',
          note: 'Same node, same time → **cycle detected**.',
          caption: '3 rounds, 3 nodes touched — and the answer is yes'
        }
      },
      {
        title: { en: 'No cycle? The hare falls off', bn: 'সাইকেল না থাকলে? খরগোশ পড়ে যায়' },
        explanation: {
          en: 'Now the same list with a proper ending: `next = [1, 2, 3, null]`.\n\n- Round 1: `slow` → index 1, `fast` → index 2.\n- Round 2: `slow` → index 2, `fast` → **null**.\n\nThe `while fast != null and fast.next != null` condition fails, the loop exits, and we return **false**.\n\n> The hare simply ran off the end. No meeting, no cycle.',
          bn: 'এখন একই লিস্ট, কিন্তু শেষটা ঠিকমতো: `next = [1, 2, 3, null]`।\n\n- চক্র ১: `slow` → ইনডেক্স ১, `fast` → ইনডেক্স ২।\n- চক্র ২: `slow` → ইনডেক্স ২, `fast` → **null**।\n\n`while fast != null and fast.next != null` শর্তটা মিথ্যা হয়, লুপ বের হয়, আমরা **false** রিটার্ন করি।\n\n> খরগোশটা শেষ থেকে পড়ে গেল। মিললাম না, সাইকেলও নেই।'
        },
        line: 6,
        state: { slow: 2, fast: 'null', cycle: false, result: false },
        scene: {
          kind: 'linkedlist',
          label: 'same list, real null at the end → fast hits null',
          nodes: [1, 2, 3, 4],
          head: 0,
          showIndex: true,
          next: [1, 2, 3, null],
          showNull: true,
          pointers: [
            { i: 2, label: 'slow', tone: 'cyan' }
          ],
          highlights: { active: [2], dim: [0, 1] },
          aux: 'fast → <b>null</b>  ·  slow → <b>3</b>  ·  cycle: <b>false</b>',
          note: 'The ∅ box caught the hare. Loop ends, return **false**.',
          legend: [{ label: 'fast fell off here', color: 'var(--red)' }]
        }
      },
      {
        title: { en: 'Cost and real-life use', bn: 'খরচ আর বাস্তবে ব্যবহার' },
        explanation: {
          en: '**Cost**\n- Time `O(n)` — the fast pointer walks at most twice the list length, still one pass.\n- Space `O(1)` — only two pointers, no set, no extra array.\n\n**Why it matters**\n- Bad data from a broken import can loop forever — this catches it instantly.\n- Any `while` loop that hangs is often a pointer circle like this one.\n- It is a favourite interview question: tiny code, deep understanding of pointers.',
          bn: '**খরচ**\n- সময় `O(n)` — দ্রুত পয়েন্টার সর্বোচ্চ দ্বিগুণ দূরত্ব চলে, তবু পাস একটাই।\n- স্পেস `O(1)` — শুধু দুটো পয়েন্টার, কোনো সেট বা অতিরিক্ত অ্যারে নেই।\n\n**কেন দরকার**\n- নষ্ট ইমপোর্ট থেকে আসা খারাপ ডেটা চিরকাল ঘুরতে পারে — এটা সঙ্গে সঙ্গে ধরে ফেলে।\n- যেকোনো `while` লুপ আটকে গেলে পেছনে সাধারণত এরকম পয়েন্টারের গোলচক্রই থাকে।\n- ইন্টারভিউয়ের প্রিয় প্রশ্ন: কোডটা ছোট, কিন্তু পয়েন্টার বোঝার গভীর পরীক্ষা।'
        },
        scene: {
          kind: 'cards',
          label: "Floyd's algorithm at a glance",
          cards: [
            { icon: '⏱', title: 'Time O(n)', desc: 'one pass, fast pointer does 2× the work', state: 'ok', tag: 'fast', accent: 'var(--green)' },
            { icon: '🧠', title: 'Space O(1)', desc: 'just slow and fast pointers', state: 'ok', tag: 'tiny', accent: 'var(--cyan)' },
            { icon: '🪤', title: 'Forgotten null', desc: 'the usual cause of a cycle', state: 'bad', tag: 'bug', accent: 'var(--red)' },
            { icon: '🛡️', title: 'Real use', desc: 'validate data, kill infinite loops, impress interviewers', state: 'active', tag: 'why', accent: 'var(--yellow)' }
          ],
          caption: 'You finished <b>Linked Lists</b> · next chapter: Stacks & Queues'
        }
      }
    ]
  }
];
