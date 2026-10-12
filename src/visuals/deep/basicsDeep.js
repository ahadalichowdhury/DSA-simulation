/* ------------------------------------------------------------------ *
 * Extra steps for the first Graphs lessons, in the spirit of the
 * graph-theory primer on shafaetsplanet.com: where graphs came from
 * (Königsberg), "almost anything is a graph", the Königsberg answer
 * through degrees, reading a graph from contest input, the real memory
 * cost of a matrix, and small exercises.
 * ------------------------------------------------------------------ */
import { T, scene, step, N, allEdges, practiceStep } from './common.js';

// the four land masses of Königsberg and its seven bridges (parallel bridges are bent)
export const G_KONIG = {
  V: 4,
  directed: false,
  weighted: false,
  nodes: N([[0, 300, 40, 'A'], [1, 120, 200, 'B'], [2, 300, 360, 'C'], [3, 520, 200, 'D']]),
  edges: [
    { u: 0, v: 1, bend: 30 }, { u: 0, v: 1, bend: -30 },
    { u: 2, v: 1, bend: 30 }, { u: 2, v: 1, bend: -30 },
    { u: 0, v: 3 }, { u: 1, v: 3 }, { u: 2, v: 3 }
  ]
};

export function konigsbergStory() {
  return step(
    T('Where graphs came from: seven bridges', 'গ্রাফের জন্ম: সাতটা সেতু'),
    T(
      `In the 1700s the city of **Königsberg** had four pieces of land (A, B, C, D) joined by **seven bridges**. People asked: can you take a walk that crosses **every bridge exactly once**?\n\nEveryone tried and failed, but nobody could prove it was impossible — until **Leonhard Euler** threw away everything that did not matter. The shape of the land, the length of the bridges: gone. What is left is **dots** (land) and **lines** (bridges). That drawing was the first **graph**.\n\nThis is the big lesson of graph theory: turn an unfamiliar problem into dots and lines, and it often becomes a problem somebody has already solved. (We answer the bridge question in the next lesson.)`,
      `১৭০০ সালের দিকে **কোনিগসবার্গ (Königsberg)** শহরে চারটা ভূখণ্ড (A, B, C, D) ছিল, **সাতটা সেতু** দিয়ে জোড়া। মানুষ জিজ্ঞেস করত: এমনভাবে কি হাঁটা যায় যাতে **প্রতিটা সেতু ঠিক একবার** পার হও?\n\nসবাই চেষ্টা করে ব্যর্থ হতো, কিন্তু কেউ প্রমাণ করতে পারত না যে এটা অসম্ভব — যতক্ষণ না **লিওনার্ড অয়লার (Euler)** অদরকারি সব ফেলে দিলেন। জমির আকার, সেতুর দৈর্ঘ্য: বাদ। বাকি থাকে শুধু **বিন্দু** (ভূখণ্ড) আর **রেখা** (সেতু)। সেই আঁকাটাই ছিল প্রথম **গ্রাফ**।\n\nগ্রাফ থিওরির বড় শিক্ষা এটাই: অচেনা একটা সমস্যাকে বিন্দু আর রেখায় বদলে ফেলো, প্রায়ই দেখবে সেটা এমন সমস্যা যার সমাধান কেউ আগেই করে রেখেছে। (সেতুর প্রশ্নের উত্তর পরের লেসনে।)`
    ),
    scene(G_KONIG, { status: T('4 pieces of land, 7 bridges', '৪টা ভূখণ্ড, ৭টা সেতু') })
  );
}

// a 4 × 4 chessboard: which squares can a knight on (1, 1) jump to?
const KN = (() => {
  const nodes = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) nodes.push({ id: r * 4 + c, label: `${r},${c}`, x: 60 + c * 110, y: 50 + r * 95 });
  const from = 1 * 4 + 1;
  const moves = [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]];
  const edges = moves.map(([dr, dc]) => [1 + dr, 1 + dc]).filter(([r, c]) => r >= 0 && r < 4 && c >= 0 && c < 4).map(([r, c]) => ({ u: from, v: r * 4 + c }));
  return { V: 16, directed: false, weighted: false, nodes, edges, from };
})();

export function anythingIsAGraph() {
  return step(
    T('Almost anything can be a graph', 'প্রায় সবকিছুই গ্রাফ হতে পারে'),
    T(
      `A vertex does not have to be a city. It is **whatever the problem is about**, and an edge is **whatever connects two of them**:\n\n- **chessboard**: every square is a vertex; an edge joins two squares if a knight can jump between them. In the picture, the knight on square (1, 1) has ${KN.edges.length} edges. "Fewest knight moves from here to there" is now a shortest-path question.\n- **internet**: routers and cables; "send this web page by the fastest route".\n- **roads**: "which single road, if blocked, cuts the capital off?" (bridges, a later topic).\n- **people**: friendships; "are these two in the same friend circle?".\n- **tasks**: "A must be done before B"; "in which order can I do them all?".\n\nAn edge can also carry a number — distance, time, cost, capacity. That is a **weighted** graph.`,
      `ভার্টেক্স মানেই শহর না। প্রবলেম **যা নিয়ে**, সেটাই ভার্টেক্স, আর **যা দুটোকে জোড়ে** সেটাই এজ:\n\n- **দাবার বোর্ড**: প্রতিটা ঘর একটা ভার্টেক্স; ঘোড়া দুই ঘরের মধ্যে লাফ দিতে পারলে তাদের মধ্যে এজ। ছবিতে (1, 1) ঘরের ঘোড়ার ${KN.edges.length}টা এজ। "এখান থেকে ওখানে সবচেয়ে কম কয় চালে যাবে" — এখন এটা শর্টেস্ট পাথের প্রশ্ন।\n- **ইন্টারনেট**: রাউটার আর তার; "ওয়েব পেজটা সবচেয়ে দ্রুত পথে পাঠাও"।\n- **রাস্তা**: "কোন একটা রাস্তা বন্ধ হলে রাজধানী বিচ্ছিন্ন হয়ে যাবে?" (ব্রিজ, পরের একটা টপিক)।\n- **মানুষ**: বন্ধুত্ব; "এই দুজন কি একই বন্ধু-বৃত্তে?"।\n- **কাজ**: "A-এর পরে B"; "কোন ক্রমে সব কাজ করা যায়?"।\n\nএজের সাথে একটা সংখ্যাও থাকতে পারে — দূরত্ব, সময়, খরচ, ধারণক্ষমতা। সেটাই **ওয়েটেড (weighted)** গ্রাফ।`
    ),
    scene(KN, { nodeState: { [KN.from]: 'current', ...Object.fromEntries(KN.edges.map((e) => [e.v, 'relax'])) }, edgeState: allEdges(KN, 'relax'), tags: { [KN.from]: 'knight' }, status: T(`knight on (1, 1) → ${KN.edges.length} moves = ${KN.edges.length} edges`, `(1, 1)-এ ঘোড়া → ${KN.edges.length}টা চাল = ${KN.edges.length}টা এজ`) })
  );
}

/** Graph Words lesson: the Königsberg answer through odd degrees. */
export function konigsbergAnswer() {
  const deg = [0, 0, 0, 0];
  for (const e of G_KONIG.edges) { deg[e.u]++; deg[e.v]++; }
  const odd = deg.filter((d) => d % 2).length;
  return step(
    T('Back to Königsberg: count the degrees', 'আবার কোনিগসবার্গ: ডিগ্রি গোনো'),
    T(
      `Now we can answer Euler's question. Walk through the city and look at any land **in the middle** of the walk: every time you arrive on a bridge you leave on another one. So the bridges at that land come in **pairs** — its degree must be **even**. Only the **start** and the **end** of the walk may have an odd degree.\n\nSo a walk using every bridge exactly once needs **0 or 2** odd-degree vertices. Königsberg: ${['A', 'B', 'C', 'D'].map((x, i) => `deg(${x}) = ${deg[i]}`).join(', ')} → **${odd} odd** vertices. Impossible!\n\nSuch a walk is called an **Euler path**. (Notice that the number of odd vertices, ${odd}, is even — the handshaking lemma again.)`,
      `এবার অয়লারের প্রশ্নের উত্তর দেওয়া যায়। শহরে হাঁটার সময় হাঁটার **মাঝখানের** যেকোনো ভূখণ্ড দেখো: প্রতিবার একটা সেতু দিয়ে এলে আরেকটা দিয়ে বেরিয়ে যাও। তাই সেই ভূখণ্ডের সেতুগুলো **জোড়ায় জোড়ায়** — তার ডিগ্রি **জোড়** হতেই হবে। শুধু হাঁটার **শুরু** আর **শেষের** জায়গার ডিগ্রি বিজোড় হতে পারে।\n\nতাই প্রতিটা সেতু ঠিক একবার পার হওয়া হাঁটার জন্য **0 বা 2**টা বিজোড়-ডিগ্রির ভার্টেক্স লাগে। কোনিগসবার্গ: ${['A', 'B', 'C', 'D'].map((x, i) => `deg(${x}) = ${deg[i]}`).join(', ')} → **${odd}টা বিজোড়** ভার্টেক্স। অসম্ভব!\n\nএমন হাঁটার নাম **অয়লার পাথ (Euler path)**। (খেয়াল করো, বিজোড় ভার্টেক্সের সংখ্যা ${odd}, জোড় — আবার সেই হ্যান্ডশেকিং লেমা।)`
    ),
    scene(G_KONIG, { nodeState: Object.fromEntries(deg.map((d, i) => [i, d % 2 ? 'reject' : 'done'])), subs: Object.fromEntries(deg.map((d, i) => [i, `deg ${d}`])), status: T(`${odd} odd vertices → no walk over every bridge once`, `${odd}টা বিজোড় ভার্টেক্স → প্রতিটা সেতু একবার করে হাঁটা যায় না`) })
  );
}

/** Adjacency matrix lesson: reading input, and how much memory V² really is. */
export function matrixInput(g) {
  const E = g.edges.length;
  return [
    step(
      T('Reading the graph from input', 'ইনপুট থেকে গ্রাফ পড়া'),
      T(
        `Problems give a graph in one of two shapes.\n\n**1. The whole matrix:** first V, then V lines of V numbers.\n\`\`\`\ncin >> V;\nfor (int i = 0; i < V; i++)\n    for (int j = 0; j < V; j++)\n        cin >> M[i][j];\n\`\`\`\n\n**2. A list of edges** (much more common): first V and E, then E lines "u v" (or "u v w").\n\`\`\`\ncin >> V >> E;\nfor (int k = 0; k < E; k++) {\n    cin >> u >> v;\n    M[u][v] = 1;\n    M[v][u] = 1;     // only if undirected\n}\n\`\`\`\n\nThis graph would arrive as \`${g.V} ${E}\` followed by ${E} lines: ${g.edges.map((e) => `"${e.u} ${e.v}"`).join(', ')}.\n\n> Watch the numbering: if the input counts vertices from **1**, either make the array one bigger or subtract 1 while reading.`,
        `প্রবলেমে গ্রাফ দুই রকম চেহারায় আসে।\n\n**১. পুরো ম্যাট্রিক্স:** প্রথমে V, তারপর Vটা লাইনে Vটা করে সংখ্যা।\n\`\`\`\ncin >> V;\nfor (int i = 0; i < V; i++)\n    for (int j = 0; j < V; j++)\n        cin >> M[i][j];\n\`\`\`\n\n**২. এজের তালিকা** (অনেক বেশি দেখা যায়): প্রথমে V আর E, তারপর Eটা লাইনে "u v" (বা "u v w")।\n\`\`\`\ncin >> V >> E;\nfor (int k = 0; k < E; k++) {\n    cin >> u >> v;\n    M[u][v] = 1;\n    M[v][u] = 1;     // শুধু আনডিরেক্টেড হলে\n}\n\`\`\`\n\nএই গ্রাফটা আসত \`${g.V} ${E}\` দিয়ে, তারপর ${E}টা লাইন: ${g.edges.map((e) => `"${e.u} ${e.v}"`).join(', ')}।\n\n> নম্বর খেয়াল করো: ইনপুটে ভার্টেক্স **1** থেকে গোনা হলে, হয় অ্যারে একটা বড় বানাও, নয়তো পড়ার সময় 1 বিয়োগ করো।`
      ),
      scene(g, { panels: [{ type: 'text', label: T('input', 'ইনপুট'), text: `\`${g.V} ${E}\`<br>${g.edges.map((e) => `\`${e.u} ${e.v}\``).join('<br>')}` }], status: T('V E, then one line per edge', 'V E, তারপর প্রতি এজে এক লাইন') })
    ),
    step(
      T('How much memory is V²?', 'V² আসলে কতটা মেমরি?'),
      T(
        `An \`int\` takes 4 bytes. A V × V matrix of ints:\n\n- V = 1 000 → 10⁶ cells → **4 MB** — no problem;\n- V = 10 000 → 10⁸ cells → **400 MB** (about 381 MiB) — over most judges' limit (often 256 MB);\n- V = 100 000 → 10¹⁰ cells → **40 GB** — impossible.\n\nAnd it does not matter how many edges there are: 10 000 cities with only 20 000 roads still need the full 400 MB, almost all zeros.\n\nSo: matrix when **V is small** (up to a few thousand) or the graph is **dense**; otherwise the adjacency list of the next lesson.`,
        `একটা \`int\` নেয় 4 বাইট। ints-এর একটা V × V ম্যাট্রিক্স:\n\n- V = 1 000 → 10⁶টা ঘর → **4 MB** — কোনো সমস্যা নেই;\n- V = 10 000 → 10⁸টা ঘর → **400 MB** (প্রায় 381 MiB) — বেশিরভাগ জাজের সীমার বাইরে (প্রায়ই 256 MB);\n- V = 100 000 → 10¹⁰টা ঘর → **40 GB** — অসম্ভব।\n\nআর এজ কয়টা তাতে কিছু যায় আসে না: মাত্র 20 000 রাস্তার 10 000টা শহরেও পুরো 400 MB লাগে, প্রায় সবই শূন্য।\n\nতাই: **V ছোট** (কয়েক হাজার পর্যন্ত) বা গ্রাফ **ঘন** হলে ম্যাট্রিক্স; নইলে পরের লেসনের অ্যাডজাসেন্সি লিস্ট।`
      ),
      { kind: 'chart', label: T('memory of an int matrix (MB, log-like scale)', 'int ম্যাট্রিক্সের মেমরি (MB)'), max: 400, items: [{ label: 'V = 10³', v: 4, color: 'var(--green)', note: '4 MB' }, { label: 'V = 10⁴', v: 400, color: 'var(--red)', note: '400 MB' }, { label: 'V = 10⁵', v: 400, color: 'var(--red)', note: '40 GB!' }], caption: T('a typical memory limit is 256 MB', 'সাধারণ মেমরি সীমা 256 MB') }
    )
  ];
}

/** Adjacency list lesson: contest-style building, and exercises. */
export function listInput(g) {
  return step(
    T('Contest style: vector<int> adj[N]', 'কনটেস্টের ধাঁচে: vector<int> adj[N]'),
    T(
      `In C++ the usual way is an **array of vectors**. You only need the maximum number of vertices; each vector grows by itself, so you never have to know a degree in advance:\n\n\`\`\`\nvector<int> adj[100005];\nint V, E;\ncin >> V >> E;\nfor (int k = 0; k < E; k++) {\n    int u, v;\n    cin >> u >> v;\n    adj[u].push_back(v);\n    adj[v].push_back(u);     // undirected\n}\nfor (int x : adj[1]) cout << x << ' ';   // neighbours of 1\n\`\`\`\n\nFor weights, either store pairs (\`vector<pair<int,int>> adj[N]\`, push \`{v, w}\`) or keep a second array \`cost[u]\` that grows **in step** with \`adj[u]\`: \`cost[u][i]\` is the weight of the edge to \`adj[u][i]\`.\n\nMemory: V vectors + 2E numbers. For V = 10⁵ and E = 2·10⁵ that is a few MB instead of 40 GB.`,
      `C++-এ সাধারণ উপায় হলো **ভেক্টরের অ্যারে**। শুধু সর্বোচ্চ কয়টা ভার্টেক্স সেটা জানলেই হয়; প্রতিটা ভেক্টর নিজে নিজে বড় হয়, তাই আগে থেকে কারো ডিগ্রি জানতে হয় না:\n\n\`\`\`\nvector<int> adj[100005];\nint V, E;\ncin >> V >> E;\nfor (int k = 0; k < E; k++) {\n    int u, v;\n    cin >> u >> v;\n    adj[u].push_back(v);\n    adj[v].push_back(u);     // আনডিরেক্টেড\n}\nfor (int x : adj[1]) cout << x << ' ';   // 1-এর প্রতিবেশী\n\`\`\`\n\nওজনের জন্য হয় জোড়া রাখো (\`vector<pair<int,int>> adj[N]\`, push \`{v, w}\`), নয়তো আরেকটা অ্যারে \`cost[u]\` রাখো যেটা \`adj[u]\`-এর সাথে **তাল মিলিয়ে** বাড়ে: \`cost[u][i]\` হলো \`adj[u][i]\`-এর দিকের এজের ওজন।\n\nমেমরি: Vটা ভেক্টর + 2Eটা সংখ্যা। V = 10⁵ আর E = 2·10⁵ হলে 40 GB-এর বদলে মাত্র কয়েক MB।`
    ),
    scene(g, { nodeState: { 1: 'current' }, status: T('array of growing lists', 'বাড়তে-পারা তালিকার অ্যারে') })
  );
}

export function storagePractice(g) {
  return practiceStep(
    g,
    T('Exercises and practice', 'অনুশীলন আর প্র্যাকটিস'),
    T(
      'Do these yourself before moving on — they are short, and they make the next lessons much easier:\n\n1. Read a **directed** graph into an adjacency list (one push per edge).\n2. For every vertex print its neighbours and how many there are.\n3. Print the **in-degree** and **out-degree** of every vertex (out-degree = size of its list; in-degree needs one extra array).\n\nThen try the two judge problems below.',
      'পরের লেসনে যাওয়ার আগে এগুলো নিজে করো — ছোট, আর পরের লেসনগুলো অনেক সহজ করে দেবে:\n\n১. একটা **ডিরেক্টেড** গ্রাফ অ্যাডজাসেন্সি লিস্টে পড়ো (প্রতি এজে একটা push)।\n২. প্রতিটা ভার্টেক্সের প্রতিবেশী আর তারা কয়জন প্রিন্ট করো।\n৩. প্রতিটা ভার্টেক্সের **ইন-ডিগ্রি** আর **আউট-ডিগ্রি** প্রিন্ট করো (আউট-ডিগ্রি = তালিকার আকার; ইন-ডিগ্রির জন্য একটা বাড়তি অ্যারে লাগে)।\n\nতারপর নিচের দুটো জাজ প্রবলেম চেষ্টা করো।'
    ),
    [
      ['UVa 11991 — Easy Problem from Rujia Liu?', 'one list per value, answer by index', 'প্রতি মানের জন্য একটা তালিকা, ইনডেক্স দিয়ে উত্তর'],
      ['UVa 10895 — Matrix Transpose', 'turn rows into columns with lists', 'তালিকা দিয়ে সারিকে কলাম বানানো']
    ]
  );
}
