/* ------------------------------------------------------------------ *
 * Graphs chapter — one shared example graph for every lesson:
 *   A–B, A–C, B–D, C–D, D–E, E–F     (weights in km: 9, 2, 9, 3, 2, 5)
 *
 * Node ids are NUMBERS (0 = A, 1 = B, 2 = C, 3 = D, 4 = E, 5 = F) so that
 * highlight arrays stay numeric and the scene still draws A..F labels.
 * ------------------------------------------------------------------ */
const ID = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5 };
const ids = (...names) => names.map((n) => ID[n]);
const pair = (a, b) => [ID[a], ID[b]];

const NODES = ['A', 'B', 'C', 'D', 'E', 'F'].map((label, i) => ({ id: i, label }));

const distNodes = (dist) =>
  ['A', 'B', 'C', 'D', 'E', 'F'].map((label, i) => ({ id: i, label, sub: dist[i] }));

const POS = {
  0: { x: 90, y: 160 },   // A
  1: { x: 220, y: 70 },   // B
  2: { x: 220, y: 250 },  // C
  3: { x: 350, y: 160 },  // D
  4: { x: 480, y: 160 },  // E
  5: { x: 610, y: 160 }   // F
};

const EDGES = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'D'], ['D', 'E'], ['E', 'F']]
  .map(([a, b]) => ({ from: { id: ID[a] }, to: { id: ID[b] } }));

const W_EDGES = [['A', 'B', 9], ['A', 'C', 2], ['B', 'D', 9], ['C', 'D', 3], ['D', 'E', 2], ['E', 'F', 5]]
  .map(([a, b, w]) => ({ from: { id: ID[a] }, to: { id: ID[b] }, w }));

export const graphTopics = [
  {
    id: 'graph-basics',
    name: { en: 'Graph Basics', bn: 'গ্রাফের ভিত্তি' },
    description: {
      en: 'Vertices and edges — maps, roads, friends',
      bn: 'ভার্টেক্স ও এজ — ম্যাপ, রাস্তা, বন্ধু'
    },
    categoryKey: 'graphs',
    level: 'intermediate',
    order: 10,
    icon: '🕸️',
    complexity: {
      time: 'O(V + E)',
      space: 'O(V + E)',
      note: {
        en: 'Building an adjacency list touches every edge once. An adjacency matrix swaps that speed for O(V²) memory.',
        bn: 'অ্যাডজাসেন্সি লিস্ট বানাতে গেলে প্রতিটা এজ একবার ছুঁতে হয়। ম্যাট্রিক্স গতির বদলে O(V²) মেমরি খায়।'
      }
    },
    code: {
      en: [
        'buildGraph(vertices, edges):',
        '  adj = { v: [] for each vertex v }',
        '  for each edge (u, v, w):',
        '    adj[u].push(v, w)          // weight stored with the edge',
        '    if not directed:',
        '      adj[v].push(u, w)        // a two-way road',
        '  return adj'
      ],
      bn: [
        'buildGraph(vertices, edges):',
        '  adj = { v: [] for each vertex v }',
        '  for each edge (u, v, w):',
        '    adj[u].push(v, w)          // এজের সঙ্গে ওজন রাখি',
        '    if not directed:',
        '      adj[v].push(u, w)        // দুই দিকের রাস্তা',
        '  return adj'
      ]
    },
    steps: [
      {
        title: { en: 'Maps and friends are graphs', bn: 'ম্যাপ আর বন্ধুতো গ্রাফ' },
        explanation: {
          en: 'Open a city map. Every place is a **dot**. Every road joins two dots.\n\nNow open your contact list. Every person is a dot. Every friendship is a line.\n\nPut dots and lines together and you get a **graph**. Nothing more, nothing less.',
          bn: 'শহরের ম্যাপ খোলো। প্রতিটা জায়গা একটা **বিন্দু**। প্রতিটা রাস্তা দুই বিন্দু জোড়া দেয়।\n\nএবার তোমার কন্টাক্ট লিস্ট খোলো। প্রতিটা মানুষ একটা বিন্দু, প্রতিটা বন্ধুত্ব একটা লাইন।\n\nবিন্দু আর লাইন মিলেই হলো **গ্রাফ (graph)**। বেশি কিছু নয়, কমও নয়।'
        },
        line: 0,
        scene: {
          kind: 'graph',
          label: { en: 'a small city: places are dots, roads are lines', bn: 'ছোট একটা শহর: জায়গাগুলো বিন্দু, রাস্তাগুলো রেখা' },
          nodes: [
            { id: 0, label: 'A', sub: 'home' }, { id: 1, label: 'B', sub: 'school' }, { id: 2, label: 'C', sub: 'shop' },
            { id: 3, label: 'D', sub: 'park' }, { id: 4, label: 'E', sub: 'bank' }, { id: 5, label: 'F', sub: 'station' }
          ],
          edges: W_EDGES,
          pos: POS,
          showWeights: true,
          highlights: { current: ids('A') },
          caption: { en: 'dot = <b>vertex</b> · line = <b>edge</b> · number = km', bn: 'বিন্দু = <b>ভার্টেক্স</b> · রেখা = <b>এজ</b> · সংখ্যা = কিমি' }
        }
      },
      {
        title: { en: 'Every dot is a vertex', bn: 'প্রতিটা বিন্দুই ভার্টেক্স' },
        explanation: {
          en: 'The dots have a proper name: **vertex** (plural *vertices*). Programmers often say **node** — same thing.\n\nHere are 6 vertices: A, B, C, D, E and F. We write **V = 6**.\n\nA vertex can be anything: a city, a person, a web page, a bus stop.',
          bn: 'বিন্দুগুলোর নাম আছে: **ভার্টেক্স (vertex)**, বহুবচন *vertices*। প্রোগ্রামাররা বলে **নোড (node)** — একই জিনিস।\n\nএখানে ৬টা ভার্টেক্স: A, B, C, D, E আর F। আমরা লিখি **V = 6**।\n\nভার্টেক্স যেকোনো কিছু হতে পারে: শহর, মানুষ, ওয়েব পেজ, বাস স্টপ।'
        },
        line: 1,
        scene: {
          kind: 'graph',
          nodes: NODES,
          edges: EDGES,
          pos: POS,
          highlights: { active: ids('A', 'B', 'C', 'D', 'E', 'F') },
          note: 'Six dots on the canvas → <b>V = 6</b>.',
          legend: [{ label: 'vertex (node)', color: 'var(--cyan)' }]
        }
      },
      {
        title: { en: 'The lines are edges', bn: 'লাইনগুলোই এজ' },
        explanation: {
          en: 'A line that joins two vertices is an **edge**.\n\nThis graph has **6 edges**: A–B, A–C, B–D, C–D, D–E and E–F. We write **E = 6**.\n\nEdge (A, B) means "A and B are connected". No line means no direct road.',
          bn: 'দুই ভার্টেক্স জোড়া লাইনটার নাম **এজ (edge)**।\n\nএই গ্রাফে **৬টা এজ** আছে: A–B, A–C, B–D, C–D, D–E আর E–F। আমরা লিখি **E = 6**।\n\nএজ (A, B) মানে "A আর B জড়িত"। লাইন নেই মানে সোজা রাস্তা নেই।'
        },
        line: 2,
        scene: {
          kind: 'graph',
          nodes: NODES,
          edges: EDGES,
          pos: POS,
          activeEdges: [pair('A', 'B'), pair('A', 'C'), pair('B', 'D'), pair('C', 'D'), pair('D', 'E'), pair('E', 'F')],
          note: 'Six lines → <b>E = 6</b>. Nothing joins D to F directly.',
          legend: [{ label: 'edge (connection)', color: 'var(--cyan)' }],
          caption: 'A–B, A–C, B–D, C–D, D–E, E–F'
        }
      },
      {
        title: { en: 'One-way or two-way roads', bn: 'একমুখী না দুইমুখী রাস্তা' },
        explanation: {
          en: 'Most graphs are **undirected**: if A–B exists you can travel both ways. That is a normal street, or a friendship.\n\nA **directed** graph has arrows. A→B means "you may go from A to B, but not back". That is a one-way street — or a follower on social media: I can follow you even when you do not follow me.\n\n> Set `directed: true` and every edge turns into an arrow.',
          bn: 'বেশিরভাগ গ্রাফ **অ্যানডিরেক্টেড (undirected)** — A–B থাকলে দুই দিকেই যাওয়া যায়। এটাই সাধারণ রাস্তা, বা বন্ধুত্ব।\n\n**ডাইরেক্টেড (directed)** গ্রাফে তীর থাকে। A→B মানে "A থেকে B যাওয়া যায়, কিন্তু উল্টো নয়"। এটাই একমুখী রাস্তা — কিংবা সোশ্যাল মিডিয়ার ফলো: তুমি আমাকে ফলো না করলেও আমি তোমাকে ফলো করতে পারি।\n\n> `directed: true` ধরলে সব এজই তীর হয়ে যায়।'
        },
        line: 4,
        scene: {
          kind: 'graph',
          directed: true,
          nodes: NODES,
          edges: EDGES,
          pos: POS,
          note: 'Every arrow points one way: A can reach B, B cannot come back.',
          legend: [{ label: 'one-way (directed)', color: 'var(--border-bright)' }],
          caption: 'undirected = no arrows · directed = arrows'
        }
      },
      {
        title: { en: 'Numbers on the edges: weights', bn: 'এজের উপর সংখ্যা: ওজন' },
        explanation: {
          en: 'Now give every edge a number. That number is its **weight** — here the distance in km.\n\nA–B is **9 km**, but A–C is only **2 km**. Same graph, very different roads.\n\nGPS only cares about the weights. Counting roads would say both ways are equal — and that would be wrong.',
          bn: 'এবার প্রতিটা এজের উপর একটা সংখ্যা লিখো। সেটাই এজের **ওজন (weight)** — এখানে দূরত্ব কিলোমিটারে।\n\nA–B হলো **৯ কিমি**, কিন্তু A–C মাত্র **২ কিমি**। একই গ্রাফ, রাস্তার চেহারা অনেক আলাদা।\n\nজিপিএস শুধু ওজন দেখে। রাস্তার সংখ্যা গুনলে দুই পথ সমান মনে হতো — আর সেটা ভুল হতো।'
        },
        line: 3,
        scene: {
          kind: 'graph',
          nodes: NODES,
          edges: W_EDGES,
          pos: POS,
          showWeights: true,
          note: 'The number on a line is the <b>weight</b> (km).',
          legend: [{ label: 'weight (km)', color: 'var(--yellow)' }],
          caption: 'A–B = 9 km · A–C = 2 km'
        }
      },
      {
        title: { en: 'Two ways to store a graph', bn: 'গ্রাফ রাখার দুইটা উপায়' },
        explanation: {
          en: 'The computer has two common ways to remember a graph.\n\n**Adjacency list** — for every vertex, a small list of its neighbours. Our 6 vertices store 12 names (each edge counted from both sides).\n\n**Adjacency matrix** — a 6 × 6 grid of 0 and 1. Row A, column C is `1` because A–C exists, and column D is `0` because A and D are not directly joined.\n\n> List: memory `O(V + E)`, and finding a neighbour takes time proportional to how many neighbours you have. Matrix: memory `O(V²)` = 36 cells here, but every lookup is instant `O(1)`. Real graphs are **sparse**, so the list almost always wins.',
          bn: 'কম্পিউটার গ্রাফ মনে রাখার দুইটা সাধারণ উপায় জানে।\n\n**অ্যাডজাসেন্সি লিস্ট (adjacency list)** — প্রতিটা ভার্টেক্সের পাশে তার পাড়িদের ছোট তালিকা। আমাদের ৬টা ভার্টেক্সে ১২টা নাম বসে (প্রতিটা এজ দুই দিক থেকে গোনা)।\n\n**অ্যাডজাসেন্সি ম্যাট্রিক্স (adjacency matrix)** — ৬ × ৬ গ্রিড, ভেতরে ০ আর ১। A-র সারিতে C-র ঘরে `1` কারণ A–C আছে, আর D-র ঘরে `0` কারণ A আর D সোজা জোড়া নয়।\n\n> লিস্ট: মেমরি `O(V + E)`, আর পাড়ি খোঁজতে নিজের পাড়ি সংখ্যা মতো সময় লাগে। ম্যাট্রিক্স: মেমরি `O(V²)` = এখানে ৩৬ ঘর, কিন্তু খোঁজা একদম ঝটপট `O(1)`। আসল গ্রাফ **স্পার্স (sparse)** বেশি, তাই লিস্টই প্রায় সবসময় জেতে।'
        },
        line: 6,
        scene: {
          kind: 'array',
          label: 'V = 6, E = 6 — two ways to store the same graph',
          cells: ['A', 'B', 'C', 'D', 'E', 'F'],
          showIndex: true,
          aux: [
            { label: 'adjacency list → 12 names (2E)', cells: ['B C', 'A D', 'A D', 'B E C', 'D F', 'E'], w: 64, showIndex: false },
            { label: 'adjacency matrix → row for A (A B C D E F)', cells: [0, 1, 1, 0, 0, 0], w: 44, showIndex: true, highlights: { active: [1, 2] } }
          ],
          note: 'List memory: <b>O(V + E)</b> = 12 names · Matrix memory: <b>O(V²)</b> = 36 cells',
          legend: [{ label: 'neighbour', color: 'var(--cyan)' }]
        }
      },
      {
        title: { en: 'Where you meet graphs every day', bn: 'প্রতিদিন গ্রাফের সঙ্গে দেখা' },
        explanation: {
          en: 'Graphs hide everywhere:\n\n- **GPS** — roads are edges with km weights. Dijkstra answers "fastest route".\n- **Recommendations** — "people like you" is a walk through the friend graph.\n- **Dependency order** — a build tool must install A before B. That is a directed graph.\n\nKeep these words: **vertex** (a dot), **edge** (a line), **adjacency** (who is next to whom), and the counts **V** and **E**.',
          bn: 'গ্রাফ সব জায়গায় লুকিয়ে থাকে:\n\n- **জিপিএস** — রাস্তাই কিমি ওজনসহ এজ। ডাইজক্সট্রা বলে "সবচেয়ে দ্রুত পথ"।\n- **রেকমেন্ডেশন** — "তোমার মতো মানুষ" মানে বন্ধুর গ্রাফে হাঁটা।\n- **ডিপেন্ডেন্সি অর্ডার** — বিল্ড টুল আগে A ইনস্টল করবে, তারপর B। ওটাই ডাইরেক্টেড গ্রাফ।\n\nএই শব্দগুলো মনে রেখো: **ভার্টেক্স (vertex)** = বিন্দু, **এজ (edge)** = লাইন, **অ্যাডজাসেন্সি (adjacency)** = কে কার পাশে, আর গোনতি **V** আর **E**।'
        },
        scene: {
          kind: 'graph',
          label: { en: 'glossary on one picture', bn: 'এক ছবিতে শব্দকোষ' },
          nodes: NODES,
          edges: EDGES,
          pos: POS,
          highlights: { current: ids('A'), frontier: ids('B', 'C') },
          activeEdges: [pair('A', 'B')],
          note: { en: '<b>vertex</b> A (yellow) · <b>edge</b> A–B (blue) · <b>adjacency</b> of A = {B, C} (dashed) · V = 6, E = 6', bn: '<b>ভার্টেক্স</b> A (হলুদ) · <b>এজ</b> A–B (নীল) · A-এর <b>প্রতিবেশী</b> = {B, C} (ড্যাশ) · V = 6, E = 6' }
        }
      }
    ]
  },
  {
    id: 'bfs',
    name: { en: 'Breadth-First Search (BFS)', bn: 'ব্রেডথ-ফার্স্ট সার্চ (BFS)' },
    description: {
      en: 'Spread out level by level, like ripples',
      bn: 'লেয়ার ধরে ছড়ানো, ঢেউয়ের মতো'
    },
    categoryKey: 'graphs',
    level: 'intermediate',
    order: 20,
    icon: '🌊',
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)',
      note: {
        en: 'Every vertex is processed once and every edge is looked at once. The queue holds at most one whole level.',
        bn: 'প্রতিটা ভার্টেক্স একবার প্রসেস হয়, প্রতিটা এজ একবার দেখা হয়। কিউ-তে সর্বোচ্চ একটা পুরো লেয়ার বসে।'
      }
    },
    code: {
      en: [
        'bfs(graph, start):',
        '  queue = [start];  seen = { start }',
        '  while queue not empty:',
        '    u = queue.popFront()          // oldest first (FIFO)',
        '    for each neighbour v of u:',
        '      if v not in seen:',
        '        seen.add(v);  queue.push(v)',
        '  return the pop order           // the level order'
      ],
      bn: [
        'bfs(graph, start):',
        '  queue = [start];  seen = { start }',
        '  while queue not empty:',
        '    u = queue.popFront()          // আগে ঢোকা আগে বের',
        '    for each neighbour v of u:',
        '      if v not in seen:',
        '        seen.add(v);  queue.push(v)',
        '  return the pop order           // লেয়ার ধরের ক্রম'
      ]
    },
    steps: [
      {
        title: { en: 'Ripples: level by level', bn: 'ঢেউয়ের মতো: লেয়ার ধরে' },
        explanation: {
          en: 'Drop a stone in a pond. The ripple goes out in **rings**: ring 1, then ring 2, then ring 3.\n\nNothing jumps from ring 1 straight to ring 3. Everything at the same distance is reached **at the same time**.\n\nBFS does exactly that on a graph: first everyone **1 hop** from A, then everyone **2 hops** away, and so on.',
          bn: 'পুকুরে একটা পাথর ফেলো। ঢেউ বের হয় **বৃত্তধরে**: আগে ১ নম্বর বৃত্ত, তারপর ২ নম্বর, তারপর ৩ নম্বর।\n\n১ নম্বর থেকে সরাসরি ৩ নম্বরে কিছুই ঝাঁপ দেয় না। একই দূরত্বের সব জায়গায় ঢেউ **একসঙ্গে** পৌঁছায়।\n\nবিএফএস (BFS) গ্রাফে ঠিক এভাবেই কাজ করে: আগে A থেকে **১ হপ** দূরের সবাই, তারপর **২ হপ** দূরের সবাই — এভাবেই চলতে থাকে।'
        },
        line: 0,
        scene: {
          kind: 'graph',
          label: { en: 'BFS from A spreads out in rings', bn: 'A থেকে BFS ঢেউয়ের মতো ছড়ায়' },
          nodes: [
            { id: 0, label: 'A', sub: 'ring 0' }, { id: 1, label: 'B', sub: 'ring 1' }, { id: 2, label: 'C', sub: 'ring 1' },
            { id: 3, label: 'D', sub: 'ring 2' }, { id: 4, label: 'E', sub: 'ring 3' }, { id: 5, label: 'F', sub: 'ring 4' }
          ],
          edges: EDGES,
          pos: POS,
          highlights: { current: ids('A'), frontier: ids('B', 'C') },
          frontierEdges: [pair('A', 'B'), pair('A', 'C')],
          caption: { en: 'same distance = reached at the same time', bn: 'একই দূরত্ব = একই সময়ে পৌঁছানো' }
        }
      },
      {
        title: { en: 'The tool: a FIFO queue', bn: 'টুল: একটা কিউ (FIFO)' },
        explanation: {
          en: 'BFS needs one tool: a **queue** — a line of people.\n\n**First In, First Out (FIFO).** Nadia joined first, so she is served first. New people join at the **rear**, and we always take from the **front**.\n\nThat is what keeps BFS level-by-level: the oldest discovery is always explored first.',
          bn: 'বিএফএস-এর একটাই টুল দরকার: একটা **কিউ (queue)** — মানুষের সারি।\n\n**ফার্স্ট ইন, ফার্স্ট আউট (FIFO)** — যে সবচেয়ে আগে ঢুকেছে, সে সবচেয়ে আগে বের হবে। নতুনরা **পেছনে (rear)** ঢোকে, আমরা সবসময় **সামনে (front)** থেকে তুলি।\n\nএই কারণেই বিএফএস লেয়ার ধরে চলে: সবচেয়ে আগে পাওয়া নোডটাই সবচেয়ে আগে ঘাটা হয়।'
        },
        line: 3,
        scene: {
          kind: 'queue',
          label: 'queue — front (left) → rear (right)',
          items: ['Nadia', 'Rafiq', 'Sara'],
          pointers: [
            { i: 0, label: 'front', tone: 'cyan' },
            { i: 2, label: 'rear', tone: 'yellow' }
          ],
          highlights: { active: [0] },
          note: 'First In, First Out — the person at the <b>front</b> leaves first.',
          legend: [{ label: 'served next', color: 'var(--cyan)' }]
        }
      },
      {
        title: { en: 'Start: put A in the queue', bn: 'শুরু: কিউ-তে A বসাও' },
        explanation: {
          en: 'Take the start node **A** and drop it into the empty queue.\n\n`queue = [A]`\n\nMark A as *seen* right away, so it never gets added twice. Nothing else is touched yet.',
          bn: 'শুরুর নোড **A** নিয়ে খালি কিউ-তে বসিয়ে দাও।\n\n`queue = [A]`\n\nA-কে সঙ্গে সঙ্গে *দেখা হয়েছে* চিহ্ন দিয়ে দাও, যাতে দুইবার না ঢোকে। বাকি কিছুতে এখনো হাত নেই।'
        },
        line: 1,
        scene: {
          kind: 'queue',
          label: 'queue after enqueue(A)',
          items: ['A'],
          pointers: [{ i: 0, label: 'front = rear', tone: 'cyan' }],
          highlights: { active: [0] },
          note: 'One node in the queue, and A is already marked <b>seen</b>.',
          caption: 'queue: [A]'
        }
      },
      {
        title: { en: 'Pop A, enqueue B and C', bn: 'A বের করো, B আর C ঢোকাও' },
        explanation: {
          en: 'Take the node at the front: **A**. Process it — now A is **done** (green).\n\nA has two neighbours: **B** and **C**. Neither has been seen, so both go to the rear of the queue:\n\n`queue = [B, C]`\n\nB goes in first because we read the neighbours in order.',
          bn: 'সামনের নোডটা তুলে নাও: **A**। এটা কাজ শেষ করো — এখন A **শেষ** (সবুজ)।\n\nA-র দুইটা পাড়ি: **B** আর **C**। কাউকে আগে দেখা হয়নি, তাই দুটোই কিউ-র পেছনে গেল:\n\n`queue = [B, C]`\n\nতালিকার ক্রম মেনে আগে B ঢুকেছে।'
        },
        line: [3, 6],
        scene: {
          kind: 'graph',
          nodes: NODES,
          edges: EDGES,
          pos: POS,
          highlights: { visited: ids('A'), frontier: ids('B', 'C') },
          activeEdges: [pair('A', 'B'), pair('A', 'C')],
          caption: 'queue: [B, C]',
          note: 'A is processed. B and C are waiting in the queue.',
          legend: [
            { label: 'processed', color: 'var(--green)' },
            { label: 'in the queue', color: 'var(--cyan)' }
          ]
        }
      },
      {
        title: { en: 'Now B is at the front', bn: 'এখন সামনে B' },
        explanation: {
          en: 'The node at the front is now **B** (yellow = we are working on it right now).\n\nB has two neighbours: **A** is already seen, **D** is new → push D at the rear.\n\n`queue = [C, D]`\n\nC did not move forward by itself — it just slid up the line as B left.',
          bn: 'সামনে এখন **B** (হলুদ = এখন এটাই কাজ করা হচ্ছে)।\n\nB-র দুইটা পাড়ি: **A** আগেই দেখা হয়ে গেছে, **D** নতুন → পেছনে D বসাও।\n\n`queue = [C, D]`\n\nC নিজে এগোয়নি — B বের হওয়ায় সারিতে সামনে সরে এসেছে মাত্র।'
        },
        line: 6,
        scene: {
          kind: 'graph',
          nodes: NODES,
          edges: EDGES,
          pos: POS,
          highlights: { visited: ids('A'), current: ID.B, frontier: ids('C', 'D') },
          activeEdges: [pair('B', 'D')],
          caption: 'queue: [C, D]',
          note: 'B is being processed. Its new neighbour D joined the queue.',
          legend: [
            { label: 'processed', color: 'var(--green)' },
            { label: 'working on it', color: 'var(--yellow)' },
            { label: 'in the queue', color: 'var(--cyan)' }
          ]
        }
      },
      {
        title: { en: 'Keep going, level by level', bn: 'লেয়ার ধরে চলতে থাকো' },
        explanation: {
          en: 'Next comes **C**. Its neighbours are A (seen) and D (**already in the queue**) → nothing new to add. C is done.\n\nThen **D** is at the front. Its neighbours: B and C are seen, **E** is new → push E.\n\n`queue = [E]`\n\n> When a neighbour is already in the queue we skip it. That is exactly why a node is never added twice.',
          bn: 'পরেরটা **C**। এর পাড়ি A (দেখা হয়েছে) আর D (**আগ থেকেই কিউ-তে আছে**) → নতুন কিছু যোগ হলো না। C শেষ।\n\nতারপর সামনে **D**। এর পাড়ি: B আর C দেখা হয়ে গেছে, **E** নতুন → E বসাও।\n\n`queue = [E]`\n\n> পাড়ি যদি আগ থেকেই কিউ-তে থাকে, আমরা বাদ দিই। একদম এই কারণেই একটা নোড দুইবার ঢোকে না।'
        },
        line: 5,
        scene: {
          kind: 'graph',
          nodes: NODES,
          edges: EDGES,
          pos: POS,
          highlights: { visited: ids('A', 'B', 'C'), current: ID.D, frontier: ids('E') },
          activeEdges: [pair('D', 'E')],
          caption: 'queue: [E]',
          note: 'C found D already queued → skipped it. Then D added E.',
          legend: [
            { label: 'processed', color: 'var(--green)' },
            { label: 'working on it', color: 'var(--yellow)' },
            { label: 'in the queue', color: 'var(--cyan)' }
          ]
        }
      },
      {
        title: { en: 'Finish: the order and the shortest path', bn: 'শেষ: ক্রম আর সবচেয়ে ছোট পথ' },
        explanation: {
          en: '**E** is popped → F is new → push F. Then **F** is popped → its only neighbour E is already seen → nothing new. The queue is empty. Done.\n\nVisit order: **A → B → C → D → E → F**.\n\nBecause we always took the oldest node first, the **first time** we reached every node was in the fewest possible hops. Follow the parents back and you get the green path **A → B → D → E → F** — 4 hops, and no route with fewer hops exists.\n\n> This is the BFS superpower: the shortest path in a graph where every edge counts as 1.',
          bn: '**E** বের হলো → F নতুন → F বসাও। তারপর **F** বের হলো → এর একমাত্র পাড়ি E আগেই দেখা হয়ে গেছে → নতুন কিছু নেই। কিউ খালি। শেষ।\n\nভিজিট (visit) ক্রম: **A → B → C → D → E → F**।\n\nসবসময় সবচেয়ে পুরোনো নোডটা তুলে নেওয়ায়, প্রতিটা নোডে **প্রথমবার** পৌঁছানো হয়েছে সবচেয়ে কম হপে। পেছনে ফিরে গেলে পাওয়া যায় সবুজ পথ **A → B → D → E → F** — ৪ হপ, এর চেয়ে কম হপের কোনো পথ নেই।\n\n> এটাই বিএফএস-এর জাদু: প্রতিটা এজ সমান ১ ধরলে সবচেয়ে **ছোট পথ (shortest path)** খুঁজে বের করা।'
        },
        line: 7,
        scene: {
          kind: 'graph',
          nodes: NODES,
          edges: EDGES,
          pos: POS,
          highlights: { path: ids('A', 'B', 'D', 'E', 'F'), visited: ids('C') },
          pathEdges: [pair('A', 'B'), pair('B', 'D'), pair('D', 'E'), pair('E', 'F')],
          caption: 'queue empty · visit order: A B C D E F',
          note: 'Green = the first way BFS reached F: <b>4 hops</b>.',
          legend: [{ label: 'shortest path from A', color: 'var(--green)' }]
        }
      },
      {
        title: { en: 'Cost and when to use BFS', bn: 'খরচ আর কখন বিএফএস ব্যবহার বাহ' },
        explanation: {
          en: '**Time `O(V + E)`** — every vertex is processed once and every edge is looked at once.\n\n**Space `O(V)`** — the queue may hold a whole level, and in the worst case that is everyone.\n\nUse BFS when:\n\n- you need the **shortest path** in an unweighted graph,\n- you want **level order** (row by row in a tree),\n- you are **crawling** the web breadth-first.\n\nIf the edges have weights, BFS goes blind — that is Dijkstra’s job, lesson 4.',
          bn: '**সময় `O(V + E)`** — প্রতিটা ভার্টেক্স একবার প্রসেস হয়, প্রতিটা এজ একবার দেখা হয়।\n\n**স্পেস `O(V)`** — কিউ-তে পুরো একটা লেয়ার বসতে পারে, সবচেয়ে খারাপ কেসে সেটা হলো সবাই।\n\nবিএফএস ব্যবহার করো যখন:\n\n- **অনওয়েটেড গ্রাফে** সবচেয়ে **ছোট পথ** দরকার,\n- **লেভেল অর্ডার** দরকার (ট্রিতে এক সারি করে),\n- ওয়েবসাইট **ব্রেডথ-ফার্স্ট** করে ক্রল করতে হয়।\n\nএজে ওজন থাকলে বিএফএস অন্ধ — ওটার কাজ ডাইজক্সট্রা, ৪ নম্বর পাঠ।'
        },
        scene: {
          kind: 'graph',
          label: { en: 'BFS finished: every vertex once (#order), every edge looked at once', bn: 'BFS শেষ: প্রতিটা ভার্টেক্স একবার (#ক্রম), প্রতিটা এজ একবার' },
          nodes: [
            { id: 0, label: 'A', sub: '#1' }, { id: 1, label: 'B', sub: '#2' }, { id: 2, label: 'C', sub: '#3' },
            { id: 3, label: 'D', sub: '#4' }, { id: 4, label: 'E', sub: '#5' }, { id: 5, label: 'F', sub: '#6' }
          ],
          edges: EDGES,
          pos: POS,
          highlights: { visited: ids('A', 'B', 'C', 'D', 'E', 'F') },
          pathEdges: [pair('A', 'B'), pair('A', 'C'), pair('B', 'D'), pair('D', 'E'), pair('E', 'F')],
          note: { en: 'Time O(V + E) · space O(V) for the queue · weighted edges? use Dijkstra.', bn: 'সময় O(V + E) · কিউর জন্য স্পেস O(V) · এজে ওজন থাকলে? Dijkstra।' }
        }
      }
    ]
  },
  {
    id: 'dfs',
    name: { en: 'Depth-First Search (DFS)', bn: 'ডেপথ-ফার্স্ট সার্চ (DFS)' },
    description: {
      en: 'Go as deep as possible, then backtrack',
      bn: 'যতটা গভীর যাওয়া যায় যাও, তারপর পেছনে ফিরে আয়'
    },
    categoryKey: 'graphs',
    level: 'intermediate',
    order: 30,
    icon: '🧗',
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)',
      note: {
        en: 'Space is the depth of the stack. One long tunnel can use V frames, so deep recursion may need an explicit stack.',
        bn: 'স্পেস মানে স্ট্যাকের গভীরতা। একটা লামা সুড়ঙ্গে V ফ্রেম পর্যন্ত লাগতে পারে, তাই গভীর রিকারশনে আলাদা স্ট্যাক লাগে।'
      }
    },
    code: {
      en: [
        'dfs(u):',
        '  visited.add(u)                 // mark before we dive',
        '  for each neighbour v of u:',
        '    if v not in visited:',
        '      dfs(v)                     // go deeper',
        '  return                         // dead end → backtrack'
      ],
      bn: [
        'dfs(u):',
        '  visited.add(u)                 // ডুব দেওয়ার আগে চিহ্ন দাও',
        '  for each neighbour v of u:',
        '    if v not in visited:',
        '      dfs(v)                     // আরও গভীরে যাও',
        '  return                         // মৃতসংধি → পেছনে ফেরা'
      ]
    },
    steps: [
      {
        title: { en: 'The maze: go deep first', bn: 'গোলকধাঁধা: আগে গভীরে যাও' },
        explanation: {
          en: 'Imagine a maze. Put your **left hand on the wall** and walk. You never turn back — you keep following the corridor deeper and deeper.\n\nOnly when you hit a **dead end** do you walk back to the last junction and try the other corridor.\n\nThat is **Depth-First Search (DFS)**: deep first, sideways later.',
          bn: 'ধরো একটা গোলকধাঁধা। **বাম হাত দেয়ালে রেখো** আর হাঁটো। পেছনে ফিরবে না — গলি ধরে গভীরেই গভীরে চলে যাবে।\n\n**মৃতসংধি (dead end)** এলেই তখন আগের মোড়ে ফিরে আসবে, আর অন্য গলিটা দেখবে।\n\nএটাই **ডেপথ-ফার্স্ট সার্চ (DFS)**: আগে গভীরে, পরে পাশে।'
        },
        line: 0,
        scene: {
          kind: 'graph',
          label: { en: 'DFS runs down one corridor as deep as it can', bn: 'DFS একটা পথ ধরে যতদূর পারে গভীরে যায়' },
          nodes: NODES,
          edges: EDGES,
          pos: POS,
          highlights: { path: ids('A', 'B', 'D', 'E'), current: ids('F'), frontier: ids('C') },
          pathEdges: [pair('A', 'B'), pair('B', 'D'), pair('D', 'E'), pair('E', 'F')],
          caption: { en: 'dead end at F → walk back and try the unexplored door C', bn: 'F-এ কানাগলি → পেছনে ফিরে না-দেখা দরজা C চেষ্টা করো' }
        }
      },
      {
        title: { en: 'The tool: a stack (LIFO)', bn: 'টুল: একটা স্ট্যাক (LIFO)' },
        explanation: {
          en: 'DFS remembers where it is using a **stack**. Think of a pile of plates.\n\n**Last In, First Out (LIFO).** Push a node when you go deeper. Pop it when you come back.\n\nRecursion does this for you: every `dfs(X)` call sits on the computer’s call stack. Here we pushed A, then B, then D — so `dfs(D)` is the call running right now.',
          bn: 'ডিএফএস কোথায় আছে সেটা মনে রাখে একটা **স্ট্যাক (stack)**-এ। প্লেটের গোছা ভাবো।\n\n**লাস্ট ইন, ফার্স্ট আউট (LIFO)** — গভীরে গেলে উপরে বসাও, পেছনে ফিরলে উপরেরটা নামাও।\n\nরিকারশন এটা নিজেই করে দেয়: প্রতিটা `dfs(X)` কল কম্পিউটারের কল স্ট্যাকে বসে। এখানে আগে A, তারপর B, তারপর D বসানো হলো — তাই এখন `dfs(D)`-ই চলছে।'
        },
        line: 4,
        scene: {
          kind: 'stack',
          label: 'call stack (bottom → top)',
          items: ['dfs(A)', 'dfs(B)', 'dfs(D)'],
          pointers: [{ i: 2, label: 'top', tone: 'yellow' }],
          highlights: { active: [2] },
          aux: [{ label: 'nodes on the path', items: ['A', 'B', 'D'] }],
          note: 'Last In, First Out — the top call is running, and pop = return.',
          legend: [{ label: 'running now', color: 'var(--yellow)' }]
        }
      },
      {
        title: { en: 'Dive: A → B → D → E → F', bn: 'ডুব: A → B → D → E → F' },
        explanation: {
          en: 'Start at **A**. Take the first neighbour **B** — dive. From B, the first unvisited neighbour is **D** — dive. At D we try B first (already on the path), then **E** — dive. At E we try D (on the path), then **F** — dive.\n\nWe stored the neighbour lists in this order: `A: B, C` · `B: A, D` · `D: B, E, C` · `E: D, F`.\n\nWe never looked sideways. The stack now holds **A, B, D, E, F**, and only **C** is still waiting (dashed cyan).',
          bn: '**A** থেকে শুরু। প্রথম পাড়ি **B** — ডুব। B থেকে প্রথম না-দেখা পাড়ি **D** — ডুব। D-তে আগে B দেখলাম (পথে আছে), তারপর **E** — ডুব। E-তে D দেখলাম (পথে আছে), তারপর **F** — ডুব।\n\nপাড়ির তালিকা এই ক্রমে রাখা: `A: B, C` · `B: A, D` · `D: B, E, C` · `E: D, F`।\n\nপাশের দিকে তাকাইনি একদম। স্ট্যাকে এখন **A, B, D, E, F**, আর শুধু **C** এখনো অপেক্ষা করছে (ড্যাশড সায়ান)।'
        },
        line: 4,
        scene: {
          kind: 'graph',
          nodes: NODES,
          edges: EDGES,
          pos: POS,
          highlights: { current: ID.F, path: ids('A', 'B', 'D', 'E', 'F'), frontier: ids('C') },
          pathEdges: [pair('A', 'B'), pair('B', 'D'), pair('D', 'E'), pair('E', 'F')],
          caption: 'stack: A → B → D → E → F',
          note: 'Glowing green = the deep path. Dashed cyan = still waiting.',
          legend: [
            { label: 'current path', color: 'var(--green)' },
            { label: 'waiting', color: 'var(--cyan)' }
          ]
        }
      },
      {
        title: { en: 'Dead end → backtrack', bn: 'মৃতসংধি → পেছনে ফেরা' },
        explanation: {
          en: 'At **F** we check the only neighbour: E. E is already on the path → dead end. **Pop F.**\n\nWe are back at E. E’s remaining neighbour is D, and D is on the path too → **pop E** as well.\n\nThe stack is now **A, B, D** and we are standing on **D** again. D still has one door left to open: **C**.',
          bn: '**F**-এ একমাত্র পাড়ি দেখলাম: E। E তো পথেই আছে → মৃতসংধি। **F নামাও।**\n\nE-এ ফিরে পৌঁছালাম। E-র বাকি পাড়ি D, আর D-ও তো পথেই আছে → **E-ও নামাও।**\n\nস্ট্যাক এখন **A, B, D** আর আমরা আবার **D**-তে দাঁড়িয়ে আছি। D-র এখনো একটা দরজা খোলা বাকি: **C**।'
        },
        line: 5,
        scene: {
          kind: 'graph',
          nodes: NODES,
          edges: EDGES,
          pos: POS,
          highlights: { current: ID.D, path: ids('A', 'B', 'D'), frontier: ids('C'), dim: ids('E', 'F') },
          caption: 'stack: A → B → D',
          note: 'F and E were popped, so they are faded out. We are back at D.',
          legend: [
            { label: 'on the stack', color: 'var(--green)' },
            { label: 'finished (popped)', color: 'var(--border-bright)' },
            { label: 'waiting', color: 'var(--cyan)' }
          ]
        }
      },
      {
        title: { en: 'Explore the branch we skipped', bn: 'যে ডাল বাদ পড়েছিল, সেটা ঘাঁটো' },
        explanation: {
          en: 'Back at D, the next stored neighbour is **C**. Push C and dive.\n\nC’s neighbours are A and D — both already on the path → dead end. Pop C, pop D, pop B, pop A. The stack is empty.\n\n**Visit order: A → B → D → E → F → C.** C came last because we only met it after the long tunnel.',
          bn: 'D-এ ফিরে পরের পাড়ি **C**। C বসাও আর ডুব দাও।\n\nC-র পাড়ি A আর D — দুটোই পথে আছে → মৃতসংধি। C নামাও, D নামাও, B নামাও, A নামাও। স্ট্যাক খালি।\n\n**ভিজিট ক্রম: A → B → D → E → F → C।** C সবার শেষে এলো, কারণ লামা সুড়ঙ্গ পেরোনোর পরেই তার কথা মনে পড়েছে।'
        },
        line: 3,
        state: { stack: 'A, B, D, C → empty', order: 'A B D E F C' },
        scene: {
          kind: 'graph',
          nodes: NODES,
          edges: EDGES,
          pos: POS,
          highlights: { current: ID.C, path: ids('A', 'B', 'D', 'C'), dim: ids('E', 'F') },
          caption: 'pop C, D, B, A → stack empty · <b>order: A → B → D → E → F → C</b>',
          note: 'C’s neighbours A and D are already on the path → dead end.',
          legend: [
            { label: 'on the stack', color: 'var(--green)' },
            { label: 'finished', color: 'var(--border-bright)' }
          ]
        }
      },
      {
        title: { en: 'DFS vs BFS: deep vs wide', bn: 'ডিএফএস বনাম বিএফএস: গভীর বনাম চওড়া' },
        explanation: {
          en: 'Same graph, two different walks:\n\n- **DFS** (stack) → `A, B, D, E, F, C` — it ran down one long tunnel first.\n- **BFS** (queue) → `A, B, C, D, E, F` — it spread out one ring at a time.\n\nPick **BFS** when the hop count matters (shortest unweighted path). Pick **DFS** when you only need *a* path, or when the structure is deep and narrow.',
          bn: 'একই গ্রাফ, দুই রকম হাঁটা:\n\n- **ডিএফএস** (স্ট্যাক) → `A, B, D, E, F, C` — আগে একটা লামা সুড়ঙ্গ ধরে গেছে।\n- **বিএফএস** (কিউ) → `A, B, C, D, E, F` — এক বৃত্ত করে ছড়িয়েছে।\n\nহপের সংখ্যা জরুরি হলে **বিএফএস** (অনওয়েটেড পথ)। শুধু *একটা* পথ চাইলে, বা গঠনটা গভীর ও সরু হলে **ডিএফএস**।'
        },
        line: 2,
        scene: {
          kind: 'graph',
          label: { en: 'same graph, two walks: DFS order vs BFS order', bn: 'একই গ্রাফ, দুই রকম হাঁটা: DFS ক্রম বনাম BFS ক্রম' },
          nodes: [
            { id: 0, label: 'A', sub: 'DFS 1 · BFS 1' }, { id: 1, label: 'B', sub: 'DFS 2 · BFS 2' }, { id: 2, label: 'C', sub: 'DFS 6 · BFS 3' },
            { id: 3, label: 'D', sub: 'DFS 3 · BFS 4' }, { id: 4, label: 'E', sub: 'DFS 4 · BFS 5' }, { id: 5, label: 'F', sub: 'DFS 5 · BFS 6' }
          ],
          edges: EDGES,
          pos: POS,
          highlights: { visited: ids('A', 'B', 'D', 'E', 'F', 'C') },
          pathEdges: [pair('A', 'B'), pair('B', 'D'), pair('D', 'E'), pair('E', 'F')],
          caption: { en: 'DFS (stack): A B D E F C · BFS (queue): A B C D E F', bn: 'DFS (স্ট্যাক): A B D E F C · BFS (কিউ): A B C D E F' }
        }
      },
      {
        title: { en: 'Cycles: a neighbour still on the stack', bn: 'সাইকেল: পাড়ি এখনো স্ট্যাকে আছে' },
        explanation: {
          en: 'While DFS runs we care about two states: **still on the stack** (textbooks call it grey) and **finished** (they call it black).\n\nWe are standing on **C**, and C has an edge to A. Look — **A is still on the stack**, we never popped it!\n\nThat closes a cycle: **A → B → D → C → A**. If A had already been finished, the edge would be harmless: just a link to an older, finished part of the graph.\n\n> DFS detects cycles because a neighbour that is *still on the stack* means "I can reach myself".',
          bn: 'ডিএফএস চলার সময় দুটো অবস্থা মনে রাখি: **এখনো স্ট্যাকে আছে** (বইয়ে বলে ধূসর / grey) আর **কাজ শেষ** (বলে কালো / black)।\n\nআমরা **C**-তে দাঁড়িয়ে আছি, আর C-র A-র সঙ্গে এজ আছে। তাকাও — **A এখনো স্ট্যাকেই আছে**, ওটা কেউ নামায়নি!\n\nএতে একটা সাইকেল (cycle) বন্ধ হয়ে গেল: **A → B → D → C → A**। A যদি আগেই শেষ হয়ে থাকত, এজটা ক্ষতিহীন — শুধু পুরোনো, শেষ হয়ে যাওয়া অংশের একটা লিংক।\n\n> ডিএফএস সাইকেল ধরতে পারে কারণ *স্ট্যাকে থাকা* পাড়ি মানে "নিজের কাছেই ফিরে এলাম"।'
        },
        line: 3,
        scene: {
          kind: 'graph',
          nodes: NODES,
          edges: EDGES,
          pos: POS,
          highlights: { current: ID.C, path: ids('A', 'B', 'D', 'C'), dim: ids('E', 'F') },
          activeEdges: [pair('A', 'C')],
          caption: 'cycle found: A → B → D → C → A',
          note: 'A is still on the stack when C looks at it → <b>cycle</b>.',
          legend: [
            { label: 'on the stack (grey)', color: 'var(--green)' },
            { label: 'finished (black)', color: 'var(--border-bright)' },
            { label: 'edge that closes the cycle', color: 'var(--cyan)' }
          ]
        }
      },
      {
        title: { en: 'Cost and when to use DFS', bn: 'খরচ আর কখন ডিএফএস ব্যবহার বাহ' },
        explanation: {
          en: '**Time `O(V + E)`** — each vertex once, each edge once, exactly like BFS.\n\n**Space `O(V)`** — the stack can hold the whole path. On a very deep graph the recursion may overflow, so a real program often uses an explicit stack instead.\n\nUse DFS for:\n\n- **cycle detection** (a neighbour still on the stack),\n- **topological sort** (dependency order),\n- **connected components** (how many islands are there?),\n- **mazes** — any way out is enough.',
          bn: '**সময় `O(V + E)`** — প্রতিটা ভার্টেক্স একবার, প্রতিটা এজ একবার, ঠিক বিএফএস-এর মতোই।\n\n**স্পেস `O(V)`** — স্ট্যাকে পুরো পথটা বসতে পারে। খুব গভীর গ্রাফে রিকারশন ওভারফ্লো করে, তাই আসল প্রোগ্রামে প্রায়ই আলাদা স্ট্যাক ব্যবহার করা হয়।\n\nডিএফএস ব্যবহার করো:\n\n- **সাইকেল ডিটেকশনে** (পাড়ি এখনো স্ট্যাকে থাকলে),\n- **টোপোলজিক্যাল সর্টে** (ডিপেন্ডেন্সি অর্ডার),\n- **কানেক্টেড কম্পোনেন্টে** (কয়টা দ্বীপ আছে?), আর\n- **গোলকধাঁধায়** — বের হওয়ার একটা পথই যথেষ্ট।'
        },
        scene: {
          kind: 'graph',
          label: { en: 'DFS path A → B → D → C: C touches A, which is still on the stack → a cycle', bn: 'DFS পথ A → B → D → C: C ছুঁয়েছে A-কে, যে এখনো স্ট্যাকে → সাইকেল' },
          nodes: NODES,
          edges: EDGES,
          pos: POS,
          highlights: { path: ids('A', 'B', 'D'), current: ids('C'), dim: ids('E', 'F') },
          pathEdges: [pair('A', 'B'), pair('B', 'D'), pair('C', 'D')],
          frontierEdges: [pair('A', 'C')],
          note: { en: 'Time O(V + E) · space O(V): the stack holds the current path.', bn: 'সময় O(V + E) · স্পেস O(V): স্ট্যাকে থাকে বর্তমান পথ।' }
        }
      }
    ]
  },
  {
    id: 'dijkstra',
    name: { en: "Dijkstra's Algorithm", bn: 'ডাইজক্সট্রা অ্যালগরিদম' },
    description: {
      en: 'Cheapest path first, using edge weights',
      bn: 'ওজন মিলিয়ে সবচেয়ে সস্তা পথ আগে'
    },
    categoryKey: 'graphs',
    level: 'advanced',
    order: 40,
    icon: '🧭',
    complexity: {
      time: 'O((V + E) log V)',
      space: 'O(V)',
      note: {
        en: 'Binary heap version: each edge is relaxed once and each fix costs log V. With a plain distance array it becomes O(V²) instead.',
        bn: 'বাইনারি হিপ সংস্করণ: প্রতিটা এজ একবার রিল্যাক্স হয়, প্রতিবার ঠিক করতে log V লাগে। সরল দূরত্ব অ্যারে ব্যবহার করলে O(V²) হয়ে যায়।'
      }
    },
    code: {
      en: [
        'dijkstra(graph, start):',
        '  dist[v] = ∞ for every v;  dist[start] = 0',
        '  unsettled = all vertices',
        '  while unsettled not empty:',
        '    u = unsettled node with the smallest dist',
        '    for each neighbour v of u:',
        '      newDist = dist[u] + w(u, v)',
        '      if newDist < dist[v]: dist[v] = newDist   // relax',
        '  return dist'
      ],
      bn: [
        'dijkstra(graph, start):',
        '  dist[v] = ∞ for every v;  dist[start] = 0',
        '  unsettled = all vertices',
        '  while unsettled not empty:',
        '    u = unsettled node with the smallest dist',
        '    for each neighbour v of u:',
        '      newDist = dist[u] + w(u, v)',
        '      if newDist < dist[v]: dist[v] = newDist   // রিল্যাক্স করি',
        '  return dist'
      ]
    },
    steps: [
      {
        title: { en: 'BFS cannot count kilometres', bn: 'বিএফএস কিলোমিটার গুনতে পারে না' },
        explanation: {
          en: 'Same graph, but now every road has a length in km.\n\nBFS only counts hops. From A to D it takes the first route it finds: **A → B → D** — two hops, **9 + 9 = 18 km**.\n\nBut **A → C → D** is also two hops, and it costs only **2 + 3 = 5 km**.\n\n> Same number of hops, very different roads. We need an algorithm that respects the numbers: **Dijkstra**.',
          bn: 'একই গ্রাফ, কিন্তু এবার প্রতিটা রাস্তার দৈর্ঘ্য আছে (কিমি)।\n\nবিএফএস শুধু হপ গুনে। A থেকে D-তে এটা প্রথমেই পেয়ে যায়: **A → B → D** — দুই হপ, **৯ + ৯ = ১৮ কিমি**।\n\nকিন্তু **A → C → D**-ও দুই হপ, আর খরচ মাত্র **২ + ৩ = ৫ কিমি**।\n\n> হপ সমান, রাস্তা অনেক আলাদা। সংখ্যাটাকে মানতে হবে তাই: **ডাইজক্সট্রা**।'
        },
        line: 0,
        scene: {
          kind: 'graph',
          nodes: NODES,
          edges: W_EDGES,
          pos: POS,
          showWeights: true,
          pathEdges: [pair('A', 'B'), pair('B', 'D')],
          frontierEdges: [pair('A', 'C'), pair('C', 'D')],
          caption: 'A-B-D = 9+9 = <b>18 km</b> · A-C-D = 2+3 = <b>5 km</b>',
          note: 'BFS sees two hops either way. The numbers disagree.',
          legend: [
            { label: 'what BFS picks', color: 'var(--green)' },
            { label: 'the cheaper road', color: 'var(--yellow)' }
          ]
        }
      },
      {
        title: { en: 'The idea: smallest first', bn: 'ভাবনা: সবচেয়ে ছোটটা আগে' },
        explanation: {
          en: 'Dijkstra keeps a **tentative distance** for every node — the best route we know *so far*.\n\nThe whole rule is one line:\n\n> **Pick the unsettled node with the smallest tentative distance, look at its roads, then repeat.**\n\nWhy can we trust it? As long as every weight is 0 or more, no later route can beat a distance that is already the smallest among all unfinished nodes.',
          bn: 'ডাইজক্সট্রা প্রতিটা নোডের জন্য একটা **অস্থায়ী দূরত্ব (tentative distance)** রাখে — এ মুহূর্ত পর্যন্ত যেটা সেরা পথ, সেটা জানা আছে।\n\nপুরো নিয়ম এক লাইন:\n\n> **যে নোড এখনো সেট হয়নি, তার অস্থায়ী দূরত্ব সবচেয়ে ছোট — ওটাকে আগে বেছে নাও, তার রাস্তা দেখো, তারপর আবার শুরু করো।**\n\nএটা কেন বিশ্বাসযোগ্য? সব ওজন **০ বা তার বেশি** হলে, অসমাপ্ত নোডগুলোর মধ্যে সবচেয়ে ছোট দূরত্বের পরে আর কোনো পুরোনো রাস্তা তাকে ছাড়াতে পারে না।'
        },
        line: 4,
        scene: {
          kind: 'graph',
          label: { en: 'A is settled (0). Smallest unsettled distance is C = 2 → settle C next', bn: 'A ঠিক হয়েছে (0)। না-ঠিক হওয়াদের মধ্যে সবচেয়ে ছোট C = 2 → এরপর C' },
          nodes: distNodes(['0 ✓', '9', '2', '∞', '∞', '∞']),
          edges: W_EDGES,
          pos: POS,
          showWeights: true,
          highlights: { visited: ids('A'), current: ids('C'), frontier: ids('B') },
          activeEdges: [pair('A', 'C')],
          caption: { en: 'track distance → pick the smallest → relax its edges → repeat', bn: 'দূরত্ব রাখো → সবচেয়ে ছোটটা নাও → এজ রিল্যাক্স করো → আবার' }
        }
      },
      {
        title: { en: 'Start: A = 0, everything else ∞', bn: 'শুরু: A = 0, বাকি সব ∞' },
        explanation: {
          en: '`dist[A] = 0` — we are standing at A, so reaching A costs nothing.\n\nEvery other node is **∞**, meaning "no idea yet". We do not know how far C is.\n\nWe also keep an **unsettled** set: A, B, C, D, E, F. The moment a node is settled, its number is final.',
          bn: '`dist[A] = 0` — আমরা A-তেই দাঁড়িয়ে আছি, তাই A-তে পৌঁছাতে খরচ শূন্য।\n\nবাকি সব নোড **∞**, মানে "এখনো কিছু জানি না"। C কত দূর সেটা জানি না।\n\nসঙ্গে একটা **সেটেল হয়নি (unsettled)** তালিকা রাখি: A, B, C, D, E, F। একটা নোড সেটেল হওয়ার সঙ্গে সঙ্গে তার সংখ্যা চূড়ান্ত হয়ে যায়।'
        },
        line: 1,
        state: { 'dist[A]': 0, 'dist[B..F]': '∞', unsettled: 'A B C D E F' },
        scene: {
          kind: 'array',
          label: 'dist = { A: 0, B: ∞, C: ∞, D: ∞, E: ∞, F: ∞ }',
          cells: [0, '∞', '∞', '∞', '∞', '∞'],
          showIndex: false,
          sub: ['A', 'B', 'C', 'D', 'E', 'F'],
          highlights: { active: [0], dim: [1, 2, 3, 4, 5] },
          note: 'Only A is known. Everything else is still unknown.',
          legend: [
            { label: 'known distance', color: 'var(--yellow)' },
            { label: '∞ — unknown', color: 'var(--border-bright)' }
          ]
        }
      },
      {
        title: { en: 'Relax the roads out of A', bn: 'A থেকে বের হওয়া রাস্তা ঢিল করো' },
        explanation: {
          en: 'A is the only node we know, so we start there and look at its two roads:\n\n- `A → B`: 0 + 9 = 9 → better than ∞ → **dist[B] = 9**\n- `A → C`: 0 + 2 = 2 → better than ∞ → **dist[C] = 2**\n\nThis is called **relaxing** an edge: "I found a cheaper way to reach you". D, E and F are still ∞.',
          bn: 'যেটা একমাত্র জানা নোড, ওখান থেকেই শুরু। এর দুটো রাস্তা দেখো:\n\n- `A → B`: 0 + 9 = 9 → ∞ চেয়ে ভালো → **dist[B] = 9**\n- `A → C`: 0 + 2 = 2 → ∞ চেয়ে ভালো → **dist[C] = 2**\n\nএটাকে বলে এজ **রিল্যাক্স (relax)** করা: "তোমার পথ পেয়ে গেছি আরও সস্তা"। D, E আর F এখনো ∞।'
        },
        line: 7,
        state: { 'dist[A]': 0, 'dist[B]': 9, 'dist[C]': 2, 'dist[D..F]': '∞', relaxed: 'A → B, A → C' },
        scene: {
          kind: 'graph',
          nodes: distNodes(['0', '9', '2', '∞', '∞', '∞']),
          edges: W_EDGES,
          pos: POS,
          showWeights: true,
          highlights: { current: ID.A, frontier: ids('B', 'C'), dim: ids('D', 'E', 'F') },
          activeEdges: [pair('A', 'B'), pair('A', 'C')],
          caption: 'dist: A = 0 · B = 9 · C = 2 · D = E = F = ∞',
          note: 'Both roads out of A are relaxed. The number under a node is its dist.',
          legend: [
            { label: 'relaxing from here', color: 'var(--yellow)' },
            { label: 'distance found', color: 'var(--cyan)' },
            { label: 'still ∞', color: 'var(--border-bright)' }
          ]
        }
      },
      {
        title: { en: 'Pick the smallest tentative', bn: 'সবচেয়ে ছোটটা বেছে নাও' },
        explanation: {
          en: 'The unsettled nodes and what they cost right now:\n\n- B = 9\n- **C = 2** ← smallest\n- D, E, F = ∞\n\nSo **C** goes next. We do not pick B just because we discovered it first — C is simply cheaper right now.',
          bn: 'সেটেল হয়নি এমন নোড আর এখন তাদের খরচ:\n\n- B = 9\n- **C = 2** ← সবচেয়ে ছোট\n- D, E, F = ∞\n\nতাই পরেরটা **C**। B আগে পেয়েছিলাম বলেই ওটা আগে নেব না — এখন সস্তা তো C।'
        },
        line: 4,
        state: { pick: 'C', 'dist[C]': 2, 'dist[B]': 9, unsettled: 'B C D E F' },
        scene: {
          kind: 'array',
          label: 'unsettled distances — the smallest one wins',
          cells: [0, 9, 2, '∞', '∞', '∞'],
          showIndex: false,
          sub: ['A', 'B', 'C', 'D', 'E', 'F'],
          highlights: { sorted: [0], active: [2], mark: [1], dim: [3, 4, 5] },
          note: 'A is settled (green). C = 2 is the smallest → settle C next.',
          legend: [
            { label: 'settled', color: 'var(--green)' },
            { label: 'smallest → next', color: 'var(--yellow)' },
            { label: 'still ∞', color: 'var(--border-bright)' }
          ]
        }
      },
      {
        title: { en: 'Relax again: D drops to 5', bn: 'আবার রিল্যাক্স: D নেমে ৫' },
        explanation: {
          en: 'Settle **C** (dist 2) and look at its roads:\n\n- `C → A`: A is already settled → ignore it.\n- `C → D`: 2 + 3 = 5 → better than ∞ → **dist[D] = 5**\n\nA better route showed up, so the number **drops**.\n\nLater, when B is settled, it will offer `9 + 9 = 18` for D — worse than 5, so nothing changes.\n\n> "Only replace when the new number is smaller" is the whole heart of Dijkstra.',
          bn: '**C** সেটেল (দূরত্ব 2), এর রাস্তাগুলো দেখো:\n\n- `C → A`: A আগেই সেটেল → বাদ।\n- `C → D`: 2 + 3 = 5 → ∞ চেয়ে ভালো → **dist[D] = 5**\n\nআরও সস্তা পথ পেয়ে গেল, তাই সংখ্যাটা **নেমে গেল**।\n\nপরে যখন B সেটেল হবে, সে D-র জন্য `9 + 9 = 18` দেখাবে — ৫ চেয়ে বেশি, তাই কিছুই বদলাবে না।\n\n> "নতুন সংখ্যা ছোট হলেই বদলাও" — এই একটা চেকই ডাইজক্সট্রার পুরো হৃদয়।'
        },
        line: [6, 7],
        state: { settled: 'A, C', 'dist[C]': 2, 'dist[D]': '∞ → 5', 'dist[B]': 9 },
        scene: {
          kind: 'graph',
          nodes: distNodes(['0', '9', '2', '5', '∞', '∞']),
          edges: W_EDGES,
          pos: POS,
          showWeights: true,
          highlights: { visited: ids('A'), current: ID.C, frontier: ids('B', 'D'), dim: ids('E', 'F') },
          activeEdges: [pair('C', 'D')],
          caption: 'dist: A = 0 · C = 2 · D = 5 · B = 9 · E = ∞ · F = ∞',
          note: 'C → D relaxes: ∞ becomes 5. E and F are still unknown.',
          legend: [
            { label: 'settled', color: 'var(--green)' },
            { label: 'relaxing from here', color: 'var(--yellow)' },
            { label: 'unsettled with a distance', color: 'var(--cyan)' },
            { label: 'still ∞', color: 'var(--border-bright)' }
          ]
        }
      },
      {
        title: { en: 'Repeat until settled: the answers', bn: 'সেট না হওয়া পর্যন্ত: শেষ উত্তর' },
        explanation: {
          en: 'The `while` loop keeps taking the smallest unsettled node: **A → C → D → E → B → F**.\n\nFinal distances, shown under each node:\n\n- A = 0, C = 2, D = 5, E = 7, B = 9, F = 12\n\nNow walk backwards from F: F ← E ← D ← C ← A. That is the green path **A → C → D → E → F** = **2 + 3 + 2 + 5 = 12 km**.\n\nThe route BFS liked (A–B–D–E–F) would have cost 9 + 9 + 2 + 5 = **25 km**.',
          bn: '`while` লুপটা সবসময় সবচেয়ে ছোট অসেটেল নোড বেছে নেয়: **A → C → D → E → B → F**।\n\nশেষ দূরত্ব, প্রতিটা নোডের নিচে লেখা:\n\n- A = 0, C = 2, D = 5, E = 7, B = 9, F = 12\n\nএবার F থেকে উল্টো হাঁটো: F ← E ← D ← C ← A। এটাই সবুজ পথ **A → C → D → E → F** = **2 + 3 + 2 + 5 = ১২ কিমি**।\n\nবিএফএস যে পথটা ভালো পেত (A–B–D–E–F) সেটার খরচ হতো 9 + 9 + 2 + 5 = **25 কিমি**।'
        },
        line: [3, 8],
        state: { settleOrder: 'A C D E B F', 'dist[F]': 12, path: 'A-C-D-E-F', km: 12 },
        scene: {
          kind: 'graph',
          nodes: distNodes(['0', '9', '2', '5', '7', '12']),
          edges: W_EDGES,
          pos: POS,
          showWeights: true,
          highlights: { path: ids('A', 'C', 'D', 'E', 'F'), visited: ids('B') },
          pathEdges: [pair('A', 'C'), pair('C', 'D'), pair('D', 'E'), pair('E', 'F')],
          caption: 'shortest A → F: A-C-D-E-F = 2+3+2+5 = <b>12 km</b>',
          note: 'The number under each node is its final distance.',
          legend: [{ label: 'shortest path A → F', color: 'var(--green)' }]
        }
      },
      {
        title: { en: 'Cost, uses, and the one broken rule', bn: 'খরচ, ব্যবহার, আর যে নিয়ম ভাঙা যায় না' },
        explanation: {
          en: '**Cost.** With a binary heap: time **`O((V + E) log V)`**, space `O(V)`. Every edge is relaxed once, and each fix inside the heap costs `log V`.\n\n**Use it for** GPS routes, network routing and ticket prices — any weighted graph whose numbers are 0 or more.\n\n**The rule you cannot break: no negative weights.** Suppose A→B = 2, A→C = 5 and C→B = −10. Dijkstra settles B at 2 first. Only afterwards C offers −5, but B is already locked. It answers 2 while the truth is −5.\n\n> Negative weights? Use **Bellman-Ford**. Every edge weighs 1? Plain **BFS** is cheaper.',
          bn: '**খরচ।** বাইনারি হিপ দিয়ে: সময় **`O((V + E) log V)`**, স্পেস `O(V)`। প্রতিটা এজ একবার রিল্যাক্স হয়, হিপের ভেতরে প্রতিবার ঠিক করতে `log V` লাগে।\n\n**ব্যবহার করো** জিপিএস রুট, নেটওয়ার্ক রাউটিং, টিকেটের দামে — ০ বা তার বেশি সংখ্যার যেকোনো ওজনসহ গ্রাফে।\n\n**যে নিয়ম ভাঙা যায় না: ঋণাত্মক ওজন নয়।** ধরো A→B = 2, A→C = 5, C→B = −10। ডাইজক্সট্রা আগে B-কে 2 দিয়ে সেটেল করে। পরে তখন C দেখায় −5, কিন্তু B তো বন্ধ হয়ে গেছে। সে 2 বলে, আসল উত্তর −5।\n\n> ঋণাত্মক ওজন থাকলে **বেলম্যান-ফোর্ড** চালাও। সব এজের ওজন ১ হলে সাধারণ **বিএফএস**-ই সস্তা।'
        },
        scene: {
          kind: 'graph',
          directed: true,
          label: { en: 'Negative weight breaks Dijkstra', bn: 'নেগেটিভ ওজনে Dijkstra ভুল করে' },
          nodes: [{ id: 'A', label: 'A', sub: '0' }, { id: 'B', label: 'B', sub: '2 ✗ (truth −5)' }, { id: 'C', label: 'C', sub: '5' }],
          edges: [{ from: 'A', to: 'B', w: 2 }, { from: 'A', to: 'C', w: 5 }, { from: 'C', to: 'B', w: -10 }],
          pos: { A: { x: 90, y: 150 }, B: { x: 330, y: 60 }, C: { x: 330, y: 240 } },
          showWeights: true,
          highlights: { visited: ['A'], reject: ['B'] },
          frontierEdges: [['C', 'B']],
          caption: { en: 'B was locked at 2 before C offered −5 · negative weights → Bellman-Ford', bn: 'C −5 দেওয়ার আগেই B 2-তে লক · নেগেটিভ ওজন → Bellman-Ford' }
        }
      }
    ]
  }
];
