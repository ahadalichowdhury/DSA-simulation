/**
 * "The plan" for each algorithm: its key steps in plain words, shown as the
 * second step of the lesson (a numbered board on the canvas plus the same
 * list in the explanation) — before the step-by-step run starts.
 */
const T = (en, bn) => ({ en, bn });

export const PLANS = {
  bfs: {
    name: T('BFS', 'BFS'),
    steps: [
      T('Pick a **start** vertex. Mark it visited and put it in a **queue**.', 'একটা **শুরুর** ভার্টেক্স বাছো। visited করে একটা **queue**-তে রাখো।'),
      T('Take the vertex at the **front** of the queue and print it.', 'queue-এর **সামনের** ভার্টেক্সটা নাও আর প্রিন্ট করো।'),
      T('Look at each of its neighbours: if it is **not visited**, mark it and add it to the **back** of the queue.', 'তার প্রতিটা প্রতিবেশী দেখো: **visited না** হলে চিহ্ন দাও আর queue-এর **পেছনে** রাখো।'),
      T('Repeat steps 2–3 until the queue is **empty**.', 'queue **খালি** না হওয়া পর্যন্ত ধাপ ২–৩ চালাও।')
    ],
    rule: T('Never add a visited vertex again — that is what stops BFS from going round a cycle forever.', 'visited ভার্টেক্স আর কখনো যোগ করবে না — এটাই BFS-কে সাইকেলে অনন্তকাল ঘোরা থেকে থামায়।')
  },
  dfs: {
    name: T('DFS', 'DFS'),
    steps: [
      T('Start at a vertex: mark it **visited** and print it.', 'একটা ভার্টেক্স থেকে শুরু: **visited** করো আর প্রিন্ট করো।'),
      T('Go to its first neighbour that is **not visited** and do the same there — **go deeper**.', 'তার প্রথম **visited-না** প্রতিবেশীতে যাও আর সেখানে একই কাজ করো — **আরও গভীরে যাও**।'),
      T('When a vertex has no unvisited neighbours left, **go back** to the vertex you came from (backtrack).', 'কোনো ভার্টেক্সের আর visited-না প্রতিবেশী না থাকলে, যেখান থেকে এসেছিলে সেখানে **ফিরে যাও** (ব্যাকট্র্যাক)।'),
      T('Continue until you are back at the start with nothing new left.', 'শুরুতে ফিরে আর নতুন কিছু না থাকা পর্যন্ত চালিয়ে যাও।')
    ],
    rule: T('A visited vertex is never entered again, so cycles cannot trap DFS.', 'visited ভার্টেক্সে আর কখনো ঢোকা হয় না, তাই সাইকেল DFS-কে আটকাতে পারে না।')
  },
  prim: {
    name: T("Prim's algorithm", 'প্রিমের অ্যালগরিদম'),
    steps: [
      T('**Prepare:** remove every **self-loop** (an edge from a vertex to itself is never useful).', '**প্রস্তুতি:** সব **সেলফ-লুপ** মুছে দাও (নিজের কাছে ফেরা এজ কখনো কাজে লাগে না)।'),
      T('**Prepare:** if two vertices have **parallel edges**, keep only the **cheapest** one.', '**প্রস্তুতি:** দুই ভার্টেক্সের মধ্যে **প্যারালাল এজ** থাকলে শুধু **সবচেয়ে সস্তাটা** রাখো।'),
      T('Start from **any one vertex** — for now it is the whole tree.', '**যেকোনো একটা ভার্টেক্স** থেকে শুরু করো — আপাতত এটাই পুরো ট্রি।'),
      T('Look at every edge that joins the tree to a **new** vertex; add the **cheapest** one.', 'ট্রি থেকে **নতুন** ভার্টেক্সে যাওয়া প্রতিটা এজ দেখো; **সবচেয়ে সস্তাটা** যোগ করো।'),
      T('Never add an edge whose both ends are already in the tree — that would make a **cycle**.', 'যে এজের দুই মাথাই আগে থেকে ট্রিতে, সেটা কখনো যোগ করবে না — তাতে **সাইকেল** হবে।'),
      T('Stop when every vertex is in the tree (**V − 1** edges).', 'সব ভার্টেক্স ট্রিতে এলে থামো (**V − 1**টা এজ)।')
    ],
    rule: T('Our example has no self-loops or parallel edges, so the preparation changes nothing here.', 'আমাদের উদাহরণে সেলফ-লুপ বা প্যারালাল এজ নেই, তাই এখানে প্রস্তুতিতে কিছু বদলায় না।')
  },
  kruskal: {
    name: T("Kruskal's algorithm", 'ক্রুসকালের অ্যালগরিদম'),
    steps: [
      T('**Prepare:** remove **self-loops**, and of **parallel edges** keep only the **cheapest**.', '**প্রস্তুতি:** **সেলফ-লুপ** মুছে দাও, আর **প্যারালাল এজের** মধ্যে শুধু **সবচেয়ে সস্তাটা** রাখো।'),
      T('**Sort** all edges from cheapest to most expensive.', 'সব এজ সস্তা থেকে দামি ক্রমে **সাজাও**।'),
      T('Take the next edge. If its two ends are in **different groups**, keep it and join the groups.', 'পরের এজটা নাও। দুই মাথা **আলাদা দলে** থাকলে রাখো আর দল দুটো জোড়ো।'),
      T('If both ends are **already connected**, skip it — it would make a **cycle**.', 'দুই মাথা **আগেই যুক্ত** থাকলে বাদ দাও — এটা **সাইকেল** বানাবে।'),
      T('Stop when you have **V − 1** edges.', '**V − 1**টা এজ হয়ে গেলে থামো।')
    ],
    rule: T('Cheapest first, never a cycle — that always gives the cheapest way to connect everything.', 'সস্তা আগে, সাইকেল কখনো নয় — এতে সবসময় সবকিছু জোড়ার সবচেয়ে সস্তা উপায় পাওয়া যায়।')
  },
  dijkstra: {
    name: T("Dijkstra's algorithm", 'ডাইকস্ট্রার অ্যালগরিদম'),
    steps: [
      T('Set the distance of the **start** to **0**, and of every other vertex to **∞** (unknown).', '**শুরুর** দূরত্ব **0**, বাকি সব ভার্টেক্সের **∞** (অজানা) ধরো।'),
      T('Pick the unfinished vertex with the **smallest** distance — its distance is now **final**.', 'শেষ-না-হওয়াদের মধ্যে **সবচেয়ে ছোট** দূরত্বের ভার্টেক্স বাছো — এর দূরত্ব এখন **চূড়ান্ত**।'),
      T('For each of its neighbours: if going **through it** is shorter, update the neighbour\'s distance (**relax**).', 'তার প্রতিটা প্রতিবেশীর জন্য: **এর মধ্য দিয়ে** গেলে ছোট হলে প্রতিবেশীর দূরত্ব আপডেট করো (**রিল্যাক্স**)।'),
      T('Repeat steps 2–3 until every vertex is finished.', 'সব ভার্টেক্স শেষ না হওয়া পর্যন্ত ধাপ ২–৩ চালাও।')
    ],
    rule: T('Works only when **no edge weight is negative**. With negative weights, use Bellman-Ford.', 'কাজ করে শুধু তখন, যখন **কোনো এজের ওজন নেগেটিভ নয়**। নেগেটিভ ওজনে Bellman-Ford ব্যবহার করো।')
  },
  bellman: {
    name: T('Bellman-Ford', 'বেলম্যান-ফোর্ড'),
    steps: [
      T('Set the distance of the **start** to **0**, every other to **∞**.', '**শুরুর** দূরত্ব **0**, বাকি সব **∞** ধরো।'),
      T('Go through **every edge** u → v: if dist[u] + w < dist[v], update dist[v].', '**প্রতিটা এজ** u → v দেখো: dist[u] + w < dist[v] হলে dist[v] আপডেট করো।'),
      T('Repeat step 2 up to **V − 1** times (stop early if nothing changes).', 'ধাপ ২ সর্বোচ্চ **V − 1** বার করো (কিছু না বদলালে আগেই থামো)।'),
      T('Check every edge **once more**: if anything still gets shorter, there is a **negative cycle**.', 'প্রতিটা এজ **আরেকবার** দেখো: এখনো কিছু কমলে **নেগেটিভ সাইকেল** আছে।')
    ],
    rule: T('Slower than Dijkstra, but it works with negative weights.', 'Dijkstra-র চেয়ে ধীর, কিন্তু নেগেটিভ ওজনেও কাজ করে।')
  },
  floyd: {
    name: T('Floyd-Warshall', 'ফ্লয়েড-ওয়ার্শাল'),
    steps: [
      T('Make a table **D**: D[i][j] = weight of the edge i → j, **0** on the diagonal, **∞** if there is no edge.', 'একটা টেবিল **D** বানাও: D[i][j] = এজ i → j-এর ওজন, কোণাকুণিতে **0**, এজ না থাকলে **∞**।'),
      T('Take each vertex **k** in turn and allow trips to **stop at k** in the middle.', 'প্রতিটা ভার্টেক্স **k** পালা করে নাও আর যাত্রাকে মাঝপথে **k-তে থামার** অনুমতি দাও।'),
      T('For every pair (i, j): if **D[i][k] + D[k][j] < D[i][j]**, update D[i][j].', 'প্রতিটা জোড়া (i, j)-এর জন্য: **D[i][k] + D[k][j] < D[i][j]** হলে D[i][j] আপডেট করো।'),
      T('After every k is done, D holds the shortest distance between **every** pair.', 'সব k শেষ হলে D-তে **প্রতিটা** জোড়ার সবচেয়ে ছোট দূরত্ব।')
    ],
    rule: T('Three loops inside each other: O(V³). Best for small graphs.', 'একটার ভেতরে আরেকটা তিনটা লুপ: O(V³)। ছোট গ্রাফের জন্য সবচেয়ে ভালো।')
  },
  kahn: {
    name: T("Kahn's algorithm", 'কান-এর অ্যালগরিদম'),
    steps: [
      T('For every task, count how many arrows point **into** it (its **in-degree**).', 'প্রতিটা কাজে কয়টা তীর **ঢোকে** গোনো (তার **ইন-ডিগ্রি**)।'),
      T('Put every task with in-degree **0** (waits for nothing) into a **queue**.', 'ইন-ডিগ্রি **0** (কিছুর অপেক্ষা নেই) এমন সব কাজ একটা **queue**-তে রাখো।'),
      T('Take a task from the queue and add it to the **order**. Each task it points to now waits for one less — lower its in-degree.', 'queue থেকে একটা কাজ নিয়ে **ক্রমে** যোগ করো। এটা যেসব কাজের দিকে তীর দেয়, তাদের অপেক্ষা একটা কমে — ইন-ডিগ্রি কমাও।'),
      T('Any task whose in-degree reaches **0** joins the queue. Repeat until the queue is empty.', 'কোনো কাজের ইন-ডিগ্রি **0** হলে queue-তে যোগ দেয়। queue খালি না হওয়া পর্যন্ত চালাও।')
    ],
    rule: T('If some tasks are never added to the order, the graph has a **cycle** — no valid order exists.', 'কিছু কাজ কখনো ক্রমে না এলে গ্রাফে **সাইকেল** আছে — কোনো সঠিক ক্রম নেই।')
  },
  topo: {
    name: T('Topological sort with DFS', 'DFS দিয়ে টপোলজিক্যাল সর্ট'),
    steps: [
      T('Run **DFS** from every vertex that is not visited yet.', 'যে ভার্টেক্স এখনো visited না, তার থেকে **DFS** চালাও।'),
      T('When a vertex is **finished** (everything it points to is done), **push** it on a stack.', 'একটা ভার্টেক্স **শেষ** হলে (যেগুলোর দিকে তীর দেয় সব শেষ), তাকে স্ট্যাকে **push** করো।'),
      T('At the end, **pop** everything from the stack — that is the order.', 'শেষে স্ট্যাক থেকে সব **pop** করো — এটাই ক্রম।')
    ],
    rule: T('Works only on a graph with **no cycle** (a DAG).', 'কাজ করে শুধু **সাইকেল ছাড়া** গ্রাফে (DAG)।')
  },
  preorder: {
    name: T('Preorder', 'প্রি-অর্ডার'),
    steps: [
      T('**Visit** (print) the node.', 'নোডটা **ভিজিট** (প্রিন্ট) করো।'),
      T('Do the whole preorder of its **left** subtree.', 'তার **বাম** সাব-ট্রির পুরো প্রি-অর্ডার করো।'),
      T('Do the whole preorder of its **right** subtree.', 'তার **ডান** সাব-ট্রির পুরো প্রি-অর্ডার করো।'),
      T('An empty spot (`null`) does nothing — just go back.', 'খালি জায়গা (`null`) কিছুই করে না — শুধু ফিরে যাও।')
    ],
    rule: T('Root first: a parent is always printed before its children.', 'রুট আগে: প্যারেন্ট সবসময় তার চাইল্ডদের আগে প্রিন্ট হয়।')
  },
  inorder: {
    name: T('Inorder', 'ইন-অর্ডার'),
    steps: [
      T('Do the whole inorder of the **left** subtree.', '**বাম** সাব-ট্রির পুরো ইন-অর্ডার করো।'),
      T('**Visit** (print) the node.', 'নোডটা **ভিজিট** (প্রিন্ট) করো।'),
      T('Do the whole inorder of the **right** subtree.', '**ডান** সাব-ট্রির পুরো ইন-অর্ডার করো।'),
      T('An empty spot (`null`) does nothing — just go back.', 'খালি জায়গা (`null`) কিছুই করে না — শুধু ফিরে যাও।')
    ],
    rule: T('On a BST this prints the values in sorted order.', 'BST-তে এটা মানগুলো সাজানো ক্রমে প্রিন্ট করে।')
  },
  postorder: {
    name: T('Postorder', 'পোস্ট-অর্ডার'),
    steps: [
      T('Do the whole postorder of the **left** subtree.', '**বাম** সাব-ট্রির পুরো পোস্ট-অর্ডার করো।'),
      T('Do the whole postorder of the **right** subtree.', '**ডান** সাব-ট্রির পুরো পোস্ট-অর্ডার করো।'),
      T('**Visit** (print) the node.', 'নোডটা **ভিজিট** (প্রিন্ট) করো।'),
      T('An empty spot (`null`) does nothing — just go back.', 'খালি জায়গা (`null`) কিছুই করে না — শুধু ফিরে যাও।')
    ],
    rule: T('Children first: a parent is always printed after its children.', 'চাইল্ড আগে: প্যারেন্ট সবসময় তার চাইল্ডদের পরে প্রিন্ট হয়।')
  },
  levelorder: {
    name: T('Level order', 'লেভেল অর্ডার'),
    steps: [
      T('Put the **root** in a queue.', '**রুটকে** একটা queue-তে রাখো।'),
      T('Take the node at the **front** and print it.', '**সামনের** নোডটা নাও আর প্রিন্ট করো।'),
      T('Add its **left** child, then its **right** child (if they exist) to the **back** of the queue.', 'তার **বাম**, তারপর **ডান** চাইল্ড (থাকলে) queue-এর **পেছনে** যোগ করো।'),
      T('Repeat until the queue is empty.', 'queue খালি না হওয়া পর্যন্ত চালাও।')
    ],
    rule: T('The queue keeps the nodes in row order, so the tree is printed row by row.', 'queue নোডগুলোকে সারির ক্রমে রাখে, তাই ট্রি সারি ধরে প্রিন্ট হয়।')
  },
  avl: {
    name: T('AVL insert', 'AVL ইনসার্ট'),
    steps: [
      T('Insert the value like a normal **BST**: smaller → left, bigger → right.', 'সাধারণ **BST**-র মতো মান ইনসার্ট করো: ছোট → বামে, বড় → ডানে।'),
      T('Walk **back up** the path; at each node update its **height**.', 'পথ ধরে **ওপরে ফেরো**; প্রতিটা নোডে **উচ্চতা** আপডেট করো।'),
      T('Compute the **balance factor** = height(left) − height(right).', '**ব্যালান্স ফ্যাক্টর** = height(left) − height(right) বের করো।'),
      T('If it is **+2 or −2**, **rotate**: LL or RR → one rotation; LR or RL → two rotations.', '**+2 বা −2** হলে **রোটেট** করো: LL বা RR → একটা রোটেশন; LR বা RL → দুটো রোটেশন।')
    ],
    rule: T('After every insert, every node\'s balance factor is −1, 0 or +1 again.', 'প্রতিটা ইনসার্টের পর প্রতিটা নোডের ব্যালান্স ফ্যাক্টর আবার −1, 0 বা +1।')
  },
  heapBuild: {
    name: T('Building a min-heap', 'মিন-হিপ বানানো'),
    steps: [
      T('Add the new value at the **end** of the array (the next free spot in the last row).', 'নতুন মানটা অ্যারের **শেষে** যোগ করো (শেষ সারির পরের খালি জায়গা)।'),
      T('Compare it with its **parent**.', 'তার **প্যারেন্টের** সঙ্গে তুলনা করো।'),
      T('If the parent is **bigger**, **swap** them and keep going up (bubble up).', 'প্যারেন্ট **বড়** হলে **অদলবদল** করো আর ওপরে উঠতে থাকো (bubble up)।'),
      T('Stop when the parent is smaller or you reach the root.', 'প্যারেন্ট ছোট হলে বা রুটে পৌঁছালে থামো।')
    ],
    rule: T('Every parent stays ≤ its children, so the smallest value is always at the root.', 'প্রতিটা প্যারেন্ট তার চাইল্ডের ≤ থাকে, তাই সবচেয়ে ছোট মান সবসময় রুটে।')
  },
  heapExtract: {
    name: T('Extract min', 'মিন বের করা'),
    steps: [
      T('The **root** is the smallest value — save it as the answer.', '**রুট** সবচেয়ে ছোট মান — উত্তর হিসেবে রেখে দাও।'),
      T('Move the **last** value of the array to the root and shrink the array.', 'অ্যারের **শেষ** মানটা রুটে আনো আর অ্যারে ছোট করো।'),
      T('Compare it with its two children; **swap** with the **smaller** child if that child is smaller (sink down).', 'দুই চাইল্ডের সঙ্গে তুলনা করো; **ছোট** চাইল্ডটা ছোট হলে তার সঙ্গে **অদলবদল** (নিচে নামা)।'),
      T('Stop when both children are bigger, or it reaches the bottom.', 'দুই চাইল্ডই বড় হলে বা নিচে পৌঁছালে থামো।')
    ],
    rule: T('Doing this again and again gives the values in sorted order — heap sort.', 'বারবার করলে মানগুলো সাজানো ক্রমে আসে — হিপ সর্ট।')
  }
};

/**
 * The plan step for an algorithm: a numbered board on the canvas plus the same
 * list in the text. `scene` is the picture to show it on (the graph or tree).
 */
export function planStep(key, scene, line) {
  const P = PLANS[key];
  const list = (lang) => P.steps.map((s, i) => `${i + 1}. ${s[lang]}`).join('\n');
  return {
    title: { en: `The plan: key steps of ${P.name.en}`, bn: `পরিকল্পনা: ${P.name.bn} — মূল ধাপ` },
    explanation: {
      en: `Before we run it, here is the whole idea in a few steps:\n\n${list('en')}\n\n> **Key rule:** ${P.rule.en}\n\nThe next steps do exactly this, one line of code at a time.`,
      bn: `চালানোর আগে, পুরো ধারণাটা কয়েকটা ধাপে:\n\n${list('bn')}\n\n> **মূল নিয়ম:** ${P.rule.bn}\n\nপরের ধাপগুলো ঠিক এটাই করে, একবারে কোডের এক লাইন।`
    },
    scene: { ...scene, panels: [{ type: 'list', label: { en: `Key steps — ${P.name.en}`, bn: `মূল ধাপ — ${P.name.bn}` }, items: P.steps }], status: { en: 'the plan', bn: 'পরিকল্পনা' } },
    line
  };
}
