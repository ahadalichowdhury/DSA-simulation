/**
 * Step generators for the Graphs chapter.
 *
 * Each generator RUNS the algorithm on the lesson's graph and records one
 * step per executed code line (or small group of lines), with a picture of
 * the graph and the algorithm's memory at that moment. Because the steps come
 * from a real run, the picture, the numbers in the text and the highlighted
 * code line always agree.
 */
import { adjOf } from './graphData.js';

// identical text is code (e.g. `dist[3]: ∞ → 6`), so it is stored once as a plain string
const T = (en, bn) => (en === bn ? en : { en, bn });
const fmt = (x) => (x === Infinity ? '∞' : String(x));
const list = (a) => (a.length ? a.join(', ') : '—');

function base(g) {
  return { kind: 'graphx', directed: g.directed, weighted: g.weighted, nodes: g.nodes, edges: g.edges };
}

const ek = (u, v) => `${u}-${v}`;

/** BFS visiting order, used to compare BFS with DFS in the text. */
function bfsOrderOf(g, start) {
  const adj = adjOf(g);
  const seen = new Set([start]);
  const q = [start];
  const out = [];
  while (q.length) {
    const u = q.shift();
    out.push(u);
    for (const { v } of adj[u]) if (!seen.has(v)) { seen.add(v); q.push(v); }
  }
  return out;
}

/** Adjacency-list panel; `row` highlights one vertex's list, `item` one entry in it. */
export function adjPanel(g, { row = null, item = null, label } = {}) {
  const adj = adjOf(g);
  return {
    type: 'adjlist',
    label: label || T('adjacency list (adj)', 'অ্যাডজাসেন্সি লিস্ট (adj)'),
    rows: adj.map((items, u) => ({
      head: u,
      state: row === u ? 'current' : '',
      items: items.map((it, k) => ({ v: it.v, w: g.weighted ? it.w : undefined, state: row === u && item === k ? 'compare' : '' }))
    }))
  };
}

/* ======================================================================== BFS */

export function genBFS(g, start) {
  const adj = adjOf(g);
  const V = g.V;
  const steps = [];
  const visited = Array(V).fill(false);
  const done = new Set();
  const level = Array(V).fill(null);
  const order = [];
  const tree = [];
  let queue = [];

  const frame = ({ cur = null, chk = null, chkKind = '', qHl = {}, vHl = {}, status, fresh = false, panelsFirst = [] }) => {
    const nodeState = {};
    for (let i = 0; i < V; i++) {
      if (done.has(i)) nodeState[i] = 'done';
      else if (visited[i]) nodeState[i] = 'frontier';
    }
    if (cur != null) nodeState[cur] = 'current';
    const edgeState = {};
    const edgeFrom = {};
    for (const [a, b] of tree) edgeState[ek(a, b)] = 'tree';
    if (chk) {
      edgeState[ek(chk.u, chk.v)] = chkKind === 'new' ? 'relax' : 'reject';
      edgeFrom[ek(chk.u, chk.v)] = chk.u;
      if (chkKind === 'new') nodeState[chk.v] = 'relax';
    }
    const subs = {};
    for (let i = 0; i < V; i++) if (level[i] != null) subs[i] = `L${level[i]}`;
    return {
      ...base(g),
      nodeState,
      edgeState,
      edgeFrom,
      subs,
      panels: [
        ...panelsFirst,
        { type: 'queue', label: T('queue — the waiting line', 'queue — অপেক্ষার লাইন'), items: [...queue], hl: qHl, empty: T('empty', 'খালি') },
        { type: 'array', label: T('visited[ ]  (T = true, F = false)', 'visited[ ] — দেখা হয়েছে কি (T = হ্যাঁ, F = না)'), cells: visited.map((b) => (b ? 'T' : 'F')), hl: vHl },
        { type: 'output', label: T('printed so far', 'এ পর্যন্ত প্রিন্ট'), items: [...order], fresh }
      ],
      status
    };
  };
  const push = (title, explanation, scene, line, state) => steps.push({ title, explanation, scene, line, ...(state ? { state } : {}) });

  push(
    T('Step 0: build the graph', 'ধাপ ০: গ্রাফ বানানো'),
    T(
      `\`main()\` first stores the graph as an **adjacency list**: every vertex gets a list of its neighbours.\n\nRead row ${start}: \`adj[${start}] = [${adj[start].map((x) => x.v).join(', ')}]\` — from vertex ${start} you can walk straight to ${list(adj[start].map((x) => x.v))}.\n\nBFS reads these lists **from left to right**, so this order decides who joins the queue first.`,
      `\`main()\` প্রথমে গ্রাফটা **অ্যাডজাসেন্সি লিস্ট (adjacency list)** হিসেবে রাখে: প্রতিটা ভার্টেক্সের পাশে তার প্রতিবেশীদের তালিকা।\n\nসারি ${start} পড়ো: \`adj[${start}] = [${adj[start].map((x) => x.v).join(', ')}]\` — ভার্টেক্স ${start} থেকে সরাসরি ${list(adj[start].map((x) => x.v))}-এ যাওয়া যায়।\n\nBFS এই তালিকাগুলো **বাম থেকে ডানে** পড়ে, তাই কে আগে queue-তে ঢুকবে সেটা এই ক্রমই ঠিক করে।`
    ),
    { ...frame({ status: T(`${V} vertices, ${g.edges.length} edges`, `${V}টা ভার্টেক্স, ${g.edges.length}টা এজ`) }), panels: [adjPanel(g)] },
    'build'
  );

  push(
    T(`main() calls bfs(adj, ${start})`, `main() কল করে bfs(adj, ${start})`),
    T(
      `We ask BFS to start at vertex **${start}**.\n\n**BFS (Breadth-First Search)** explores like a ripple in water: first the start, then everything **1 edge** away, then everything **2 edges** away, and so on.\n\nThe tool that makes this happen is a **queue** — a fair waiting line: whoever joins first is served first.`,
      `আমরা BFS-কে ভার্টেক্স **${start}** থেকে শুরু করতে বলছি।\n\n**BFS (Breadth-First Search)** পানিতে ঢেউয়ের মতো ছড়ায়: আগে শুরুর ভার্টেক্স, তারপর **১টা এজ** দূরের সবাই, তারপর **২টা এজ** দূরের সবাই — এভাবে।\n\nএটা সম্ভব করে একটা **queue** — একটা ন্যায্য লাইন: যে আগে আসে, সে আগে সুযোগ পায়।`
    ),
    frame({ cur: start, status: T(`bfs(adj, ${start})`, `bfs(adj, ${start})`) }),
    'call'
  );

  visited[start] = true;
  level[start] = 0;
  queue.push(start);
  push(
    T('Mark the start and queue it', 'শুরুরটা চিহ্নিত করে queue-তে রাখো'),
    T(
      `\`visited[${start}] = true\` and **${start}** joins the queue.\n\nWhy mark it **now**, before it is printed? So that no one can add ${start} to the queue a second time.\n\nThe small tag **L0** under the vertex is its **level** — how many edges away from the start it is.`,
      `\`visited[${start}] = true\` আর **${start}** queue-তে ঢুকল।\n\nপ্রিন্টের আগেই **এখনই** চিহ্ন কেন? যাতে কেউ ${start}-কে দ্বিতীয়বার queue-তে ঢোকাতে না পারে।\n\nভার্টেক্সের নিচের ছোট **L0** ট্যাগটা তার **লেভেল (level)** — শুরু থেকে কতগুলো এজ দূরে।`
    ),
    frame({ qHl: { 0: 'relax' }, vHl: { [start]: 'relax' }, status: T(`queue = [${start}]`, `queue = [${start}]`) }),
    'init'
  );

  while (queue.length) {
    const u = queue.shift();
    order.push(u);
    push(
      T(`Take ${u} from the front`, `সামনে থেকে ${u} নাও`),
      T(
        `The queue is not empty, so the loop runs again. Take the vertex at the **front**: **u = ${u}**, and print it.\n\n${u} is vertex number **${order.length}** that BFS visits.${queue.length ? ` Still waiting in line: ${list(queue)}.` : ' The line is now empty — but u may add new vertices.'}`,
        `queue খালি নয়, তাই লুপ আবার চলে। **সামনে**র ভার্টেক্সটা নাও: **u = ${u}**, আর প্রিন্ট করো।\n\nBFS-এর ভিজিট করা **${order.length} নম্বর** ভার্টেক্স হলো ${u}।${queue.length ? ` লাইনে এখনো অপেক্ষায়: ${list(queue)}।` : ' লাইন এখন খালি — তবে u নতুন ভার্টেক্স যোগ করতে পারে।'}`
      ),
      frame({ cur: u, fresh: true, status: T(`u = ${u}  →  print ${u}`, `u = ${u}  →  প্রিন্ট ${u}`) }),
      ['whileCheck', 'pop', 'visit'],
      { u }
    );
    for (const { v } of adj[u]) {
      if (!visited[v]) {
        visited[v] = true;
        level[v] = level[u] + 1;
        queue.push(v);
        tree.push([u, v]);
        push(
          T(`Neighbour ${v}: new → queue it`, `প্রতিবেশী ${v}: নতুন → queue-তে রাখো`),
          T(
            `Check neighbour **v = ${v}**: \`visited[${v}]\` is **false**, so ${v} is new.\n\nMark it and put it at the **back** of the queue. It is one edge further than ${u}, so its level is **L${level[v]}**.\n\nThe green edge ${u}–${v} is how BFS first reached ${v}.`,
            `প্রতিবেশী **v = ${v}** দেখো: \`visited[${v}]\` **false**, তাই ${v} নতুন।\n\nচিহ্ন দাও আর queue-এর **পেছনে** রাখো। এটা ${u}-এর চেয়ে এক এজ দূরে, তাই লেভেল **L${level[v]}**।\n\nসবুজ এজ ${u}–${v} দিয়েই BFS প্রথম ${v}-তে পৌঁছাল।`
          ),
          frame({ cur: u, chk: { u, v }, chkKind: 'new', qHl: { [queue.length - 1]: 'relax' }, vHl: { [v]: 'relax' }, status: T(`visited[${v}] = false → mark ${v}, queue.push(${v})`, `visited[${v}] = false → ${v} চিহ্নিত, queue.push(${v})`) }),
          ['forNbr', 'ifNot', 'mark', 'push'],
          { u, v }
        );
      } else {
        const where = done.has(v) || v === u ? T('already printed', 'আগেই প্রিন্ট হয়েছে') : T('already waiting in the queue', 'আগে থেকেই queue-তে অপেক্ষায়');
        push(
          T(`Neighbour ${v}: seen → skip`, `প্রতিবেশী ${v}: দেখা হয়েছে → বাদ`),
          T(
            `Check neighbour **v = ${v}**: \`visited[${v}]\` is already **true** — ${v} is ${where.en}.\n\nSkip it. This one check is what stops BFS from walking around a **cycle** forever and from printing a vertex twice.`,
            `প্রতিবেশী **v = ${v}** দেখো: \`visited[${v}]\` আগেই **true** — ${v} ${where.bn}।\n\nবাদ দাও। এই একটা যাচাই-ই BFS-কে **সাইকেলে** অনন্তকাল ঘোরা আর একই ভার্টেক্স দুবার প্রিন্ট করা থেকে বাঁচায়।`
          ),
          frame({ cur: u, chk: { u, v }, chkKind: 'skip', vHl: { [v]: 'compare' }, status: T(`visited[${v}] = true → skip`, `visited[${v}] = true → বাদ`) }),
          ['forNbr', 'ifNot'],
          { u, v }
        );
      }
    }
    done.add(u);
  }

  const byLevel = [];
  level.forEach((l, v) => { if (l != null) (byLevel[l] = byLevel[l] || []).push(v); });
  push(
    T('Queue empty → BFS is finished', 'queue খালি → BFS শেষ'),
    T(
      `The queue is empty, so \`while\` stops. Every vertex reachable from ${start} was visited **exactly once**.\n\nBFS order: **${order.join(' → ')}**`,
      `queue খালি, তাই \`while\` থামে। ${start} থেকে যাওয়া যায় এমন প্রতিটা ভার্টেক্স **ঠিক একবার** ভিজিট হলো।\n\nBFS ক্রম: **${order.join(' → ')}**`
    ),
    frame({ status: T(`BFS order: ${order.join(' ')}`, `BFS ক্রম: ${order.join(' ')}`) }),
    'whileCheck'
  );

  push(
    T('What BFS gave us', 'BFS থেকে কী পেলাম'),
    T(
      `## Level by level\n${byLevel.map((vs, l) => `- **L${l}:** ${vs.join(', ')}`).join('\n')}\n\nThe **green edges** form the **BFS tree**. In it, the path from ${start} to any vertex uses the **fewest possible edges** — so BFS finds shortest paths when every edge counts the same.\n\n> **Cost:** every vertex enters the queue once and every edge is checked from both ends, so time is **O(V + E)**; the queue and \`visited\` need **O(V)** memory.`,
      `## লেভেল ধরে ধরে\n${byLevel.map((vs, l) => `- **L${l}:** ${vs.join(', ')}`).join('\n')}\n\n**সবুজ এজগুলো** মিলে **BFS ট্রি**। এই ট্রিতে ${start} থেকে যেকোনো ভার্টেক্সের পথে **সবচেয়ে কম এজ** লাগে — তাই সব এজ সমান হলে BFS সবচেয়ে ছোট পথ খুঁজে দেয়।\n\n> **খরচ:** প্রতিটা ভার্টেক্স একবার queue-তে ঢোকে আর প্রতিটা এজ দুই দিক থেকে একবার করে দেখা হয়, তাই সময় **O(V + E)**; queue আর \`visited\`-এর জন্য **O(V)** মেমরি।`
    ),
    frame({ status: T('green = BFS tree (fewest edges from the start)', 'সবুজ = BFS ট্রি (শুরু থেকে সবচেয়ে কম এজ)') }),
    'call'
  );
  return steps;
}

/* ======================================================================== DFS */

export function genDFS(g, start) {
  const adj = adjOf(g);
  const V = g.V;
  const steps = [];
  const visited = Array(V).fill(false);
  const finished = new Set();
  const order = [];
  const tree = [];
  const stack = [];

  const frame = ({ chk = null, chkKind = '', vHl = {}, sHl = {}, status, fresh = false, back = null }) => {
    const nodeState = {};
    for (let i = 0; i < V; i++) if (finished.has(i)) nodeState[i] = 'done';
    stack.forEach((x) => { nodeState[x] = 'frontier'; });
    if (stack.length) nodeState[stack[stack.length - 1]] = 'current';
    const edgeState = {};
    const edgeFrom = {};
    for (const [a, b] of tree) edgeState[ek(a, b)] = 'tree';
    if (chk) {
      edgeState[ek(chk.u, chk.v)] = chkKind === 'new' ? 'relax' : 'reject';
      edgeFrom[ek(chk.u, chk.v)] = chk.u;
    }
    if (back) { edgeState[ek(back.u, back.v)] = 'compare'; edgeFrom[ek(back.u, back.v)] = back.u; }
    return {
      ...base(g),
      nodeState,
      edgeState,
      edgeFrom,
      panels: [
        { type: 'stack', label: T('call stack (who is waiting for whom)', 'কল স্ট্যাক (কে কার অপেক্ষায়)'), items: stack.map((x) => `dfs(${x})`), hl: sHl, empty: T('empty', 'খালি') },
        { type: 'array', label: T('visited[ ]  (T = true, F = false)', 'visited[ ] — দেখা হয়েছে কি (T = হ্যাঁ, F = না)'), cells: visited.map((b) => (b ? 'T' : 'F')), hl: vHl },
        { type: 'output', label: T('printed so far', 'এ পর্যন্ত প্রিন্ট'), items: [...order], fresh }
      ],
      status
    };
  };
  const push = (title, explanation, scene, line, state) => steps.push({ title, explanation, scene, line, ...(state ? { state } : {}) });

  push(
    T('Step 0: build the graph', 'ধাপ ০: গ্রাফ বানানো'),
    T(
      `The graph is stored as an **adjacency list**: every vertex keeps a list of its neighbours.\n\nDFS reads each list **from left to right**. For example from ${start} it will try ${list(adj[start].map((x) => x.v))} in that order — but it dives into the first new one **before** looking at the rest.\n\nOn this graph BFS would visit ${bfsOrderOf(g, start).join(' → ')}. Watch how differently DFS moves.`,
      `গ্রাফটা **অ্যাডজাসেন্সি লিস্ট** হিসেবে রাখা: প্রতিটা ভার্টেক্স তার প্রতিবেশীদের তালিকা রাখে।\n\nDFS প্রতিটা তালিকা **বাম থেকে ডানে** পড়ে। যেমন ${start} থেকে এটা ${list(adj[start].map((x) => x.v))} এই ক্রমে চেষ্টা করবে — কিন্তু বাকিগুলো দেখার **আগেই** প্রথম নতুনটার ভেতরে ডুব দেয়।\n\nএই গ্রাফে BFS যেত ${bfsOrderOf(g, start).join(' → ')} ক্রমে। DFS কত আলাদাভাবে চলে, খেয়াল করো।`
    ),
    { ...frame({ status: T(`${V} vertices, ${g.edges.length} edges`, `${V}টা ভার্টেক্স, ${g.edges.length}টা এজ`) }), panels: [adjPanel(g)] },
    'build'
  );

  push(
    T(`main() calls dfs(adj, ${start}, visited)`, `main() কল করে dfs(adj, ${start}, visited)`),
    T(
      `\`visited\` starts all **false**, then we call \`dfs\` on vertex **${start}**.\n\n**DFS (Depth-First Search)** explores like walking in a maze with one hand on the wall: keep going **deeper** along one path; only when you hit a dead end do you **go back** (backtrack) and try another way.\n\nThe "go back" memory is the **call stack**: every \`dfs(x)\` waits there until its own work is done.`,
      `\`visited\` শুরুতে সব **false**, তারপর ভার্টেক্স **${start}**-এ \`dfs\` কল করি।\n\n**DFS (Depth-First Search)** গোলকধাঁধায় দেয়ালে হাত রেখে হাঁটার মতো: একটা পথ ধরে **আরও গভীরে** যাও; শুধু রাস্তা শেষ হলে **ফিরে আসো** (ব্যাকট্র্যাক) আর অন্য পথ চেষ্টা করো।\n\n"ফিরে আসা"-র মেমরি হলো **কল স্ট্যাক (call stack)**: প্রতিটা \`dfs(x)\` নিজের কাজ শেষ না হওয়া পর্যন্ত সেখানে অপেক্ষা করে।`
    ),
    frame({ status: T(`dfs(adj, ${start}, visited)`, `dfs(adj, ${start}, visited)`) }),
    ['init', 'call']
  );

  const firstDive = [];
  let backtracked = false;
  const enter = (u, from) => {
    if (!backtracked) firstDive.push(u);
    visited[u] = true;
    stack.push(u);
    order.push(u);
    push(
      T(`Enter dfs(${u})`, `dfs(${u})-এ ঢোকা`),
      T(
        `Now inside **dfs(${u})**. Mark \`visited[${u}] = true\` and print ${u}.${from != null ? `\n\ndfs(${from}) is **paused** on the stack below — it will continue right after dfs(${u}) finishes.` : '\n\nThis is the first call, at the bottom of the stack.'}\n\nCall stack now: ${stack.map((x) => `dfs(${x})`).join(' → ')}`,
        `এখন **dfs(${u})**-এর ভেতরে। \`visited[${u}] = true\` করো আর ${u} প্রিন্ট করো।${from != null ? `\n\ndfs(${from}) নিচে স্ট্যাকে **থেমে আছে** — dfs(${u}) শেষ হলেই সেটা আবার চলবে।` : '\n\nএটা প্রথম কল, স্ট্যাকের একদম নিচে।'}\n\nকল স্ট্যাক এখন: ${stack.map((x) => `dfs(${x})`).join(' → ')}`
      ),
      frame({ vHl: { [u]: 'relax' }, sHl: { [stack.length - 1]: 'relax' }, fresh: true, status: T(`dfs(${u}): visited[${u}] = true, print ${u}`, `dfs(${u}): visited[${u}] = true, প্রিন্ট ${u}`) }),
      ['header', 'mark', 'visit'],
      { u }
    );
    for (const { v } of adj[u]) {
      if (!visited[v]) {
        tree.push([u, v]);
        push(
          T(`Neighbour ${v}: new → go deeper`, `প্রতিবেশী ${v}: নতুন → আরও গভীরে`),
          T(
            `In dfs(${u}), check neighbour **v = ${v}**: \`visited[${v}]\` is **false**.\n\nDFS does not wait — it **immediately** calls \`dfs(${v})\` and goes deeper. The rest of ${u}'s neighbours will be checked later, when we come back.`,
            `dfs(${u})-এ প্রতিবেশী **v = ${v}** দেখো: \`visited[${v}]\` **false**।\n\nDFS অপেক্ষা করে না — **সঙ্গে সঙ্গে** \`dfs(${v})\` কল করে আরও গভীরে যায়। ${u}-এর বাকি প্রতিবেশীদের পরে দেখা হবে, যখন আমরা ফিরে আসব।`
          ),
          frame({ chk: { u, v }, chkKind: 'new', status: T(`visited[${v}] = false → call dfs(${v})`, `visited[${v}] = false → dfs(${v}) কল`) }),
          ['forNbr', 'ifNot', 'recurse'],
          { u, v }
        );
        enter(v, u);
        push(
          T(`Back in dfs(${u})`, `আবার dfs(${u})-এ`),
          T(
            `dfs(${v}) has finished and was removed from the stack, so we are **back in dfs(${u})** — exactly where it paused.\n\nIt continues with its **next** neighbour.`,
            `dfs(${v}) শেষ হয়ে স্ট্যাক থেকে সরে গেছে, তাই আমরা **আবার dfs(${u})-এ** — ঠিক যেখানে থেমেছিল সেখানে।\n\nএবার এটা তার **পরের** প্রতিবেশী দেখবে।`
          ),
          frame({ back: { u: v, v: u }, sHl: { [stack.length - 1]: 'current' }, status: T(`back to dfs(${u})`, `ফিরে dfs(${u})-এ`) }),
          'recurse',
          { u }
        );
      } else {
        push(
          T(`Neighbour ${v}: seen → skip`, `প্রতিবেশী ${v}: দেখা হয়েছে → বাদ`),
          T(
            `In dfs(${u}), check neighbour **v = ${v}**: \`visited[${v}]\` is already **true**.\n\nSkip it — ${stack.includes(v) ? `${v} is still on the call stack (we came from there)` : `${v} was fully explored already`}. Without this check DFS would loop forever around a cycle.`,
            `dfs(${u})-এ প্রতিবেশী **v = ${v}** দেখো: \`visited[${v}]\` আগেই **true**।\n\nবাদ দাও — ${stack.includes(v) ? `${v} এখনো কল স্ট্যাকে আছে (আমরা ওখান থেকেই এসেছি)` : `${v} আগেই পুরো দেখা হয়ে গেছে`}। এই যাচাই না থাকলে DFS সাইকেলে চিরকাল ঘুরত।`
          ),
          frame({ chk: { u, v }, chkKind: 'skip', vHl: { [v]: 'compare' }, status: T(`visited[${v}] = true → skip`, `visited[${v}] = true → বাদ`) }),
          ['forNbr', 'ifNot'],
          { u, v }
        );
      }
    }
    const parent = stack.length > 1 ? stack[stack.length - 2] : null;
    push(
      T(`dfs(${u}) is done → backtrack`, `dfs(${u}) শেষ → ব্যাকট্র্যাক`),
      T(
        `Every neighbour of ${u} has been checked — nothing new is left here (a **dead end**).\n\n\`dfs(${u})\` returns and leaves the stack.${parent != null ? ` Control goes **back** to dfs(${parent}).` : ' The stack is now empty, so the whole search is over.'}`,
        `${u}-এর সব প্রতিবেশী দেখা শেষ — এখানে নতুন কিছু নেই (**রাস্তা শেষ**)।\n\n\`dfs(${u})\` রিটার্ন করে স্ট্যাক থেকে সরে যায়।${parent != null ? ` নিয়ন্ত্রণ **ফিরে যায়** dfs(${parent})-এ।` : ' স্ট্যাক এখন খালি, তাই পুরো খোঁজ শেষ।'}`
      ),
      frame({ sHl: { [stack.length - 1]: 'remove' }, status: T(`return from dfs(${u})`, `dfs(${u}) থেকে রিটার্ন`) }),
      'ret',
      { u }
    );
    stack.pop();
    finished.add(u);
    backtracked = true;
  };
  enter(start, null);

  push(
    T('What DFS gave us', 'DFS থেকে কী পেলাম'),
    T(
      `DFS order: **${order.join(' → ')}**\n\nCompare with BFS on the same graph: **${bfsOrderOf(g, start).join(' → ')}**. DFS first dived **${firstDive.join(' → ')}** in one straight line before it ever came back.\n\nThe **green edges** are the **DFS tree** — the roads DFS used to reach each vertex for the first time.\n\n> **Cost:** each vertex is entered once and each edge checked from both ends: **O(V + E)** time, **O(V)** for \`visited\` and the call stack. DFS is the base of cycle detection, topological sort and maze solving.`,
      `DFS ক্রম: **${order.join(' → ')}**\n\nএকই গ্রাফে BFS-এর সঙ্গে তুলনা করো: **${bfsOrderOf(g, start).join(' → ')}**। DFS ফিরে আসার আগেই এক টানা **${firstDive.join(' → ')}** পর্যন্ত ডুব দিয়েছে।\n\n**সবুজ এজগুলো** হলো **DFS ট্রি** — প্রতিটা ভার্টেক্সে প্রথমবার পৌঁছাতে DFS যে রাস্তা ব্যবহার করেছে।\n\n> **খরচ:** প্রতিটা ভার্টেক্সে একবার ঢোকা আর প্রতিটা এজ দুই দিক থেকে একবার দেখা: সময় **O(V + E)**, \`visited\` আর কল স্ট্যাকের জন্য **O(V)**। সাইকেল খোঁজা, টপোলজিক্যাল সর্ট আর গোলকধাঁধা সমাধানের ভিত্তি হলো DFS।`
    ),
    frame({ status: T(`DFS order: ${order.join(' ')}`, `DFS ক্রম: ${order.join(' ')}`) }),
    'call'
  );
  return steps;
}

/* ============================================================ Dijkstra / Prim */

function genGreedy(g, kind, src) {
  const D = kind === 'dijkstra';
  const adj = adjOf(g);
  const V = g.V;
  const steps = [];
  const val = Array(V).fill(Infinity);
  const parent = Array(V).fill(-1);
  const fin = Array(V).fill(false);
  val[src] = 0;
  const NAME = D ? 'dist' : 'key';
  const FIN = D ? 'done' : 'inTree';

  const frame = ({ cur = null, chk = null, chkKind = '', aHl = {}, status, cand = [] }) => {
    const nodeState = {};
    for (let i = 0; i < V; i++) if (fin[i]) nodeState[i] = 'done';
    cand.forEach((i) => { if (!fin[i] && i !== cur) nodeState[i] = 'compare'; });
    if (!D && src != null && !fin[src]) nodeState[src] = nodeState[src] || 'source';
    if (D && !fin[src]) nodeState[src] = 'source';
    if (cur != null) nodeState[cur] = 'current';
    const edgeState = {};
    const edgeFrom = {};
    for (let v = 0; v < V; v++) {
      if (parent[v] < 0) continue;
      // finished vertices: the edge is final (green); others: best offer so far (dashed)
      edgeState[ek(parent[v], v)] = fin[v] ? 'tree' : 'frontier';
    }
    if (chk) {
      edgeState[ek(chk.u, chk.v)] = chkKind === 'better' ? 'relax' : chkKind === 'skip' ? 'dim' : 'compare';
      edgeFrom[ek(chk.u, chk.v)] = chk.u;
      if (chkKind === 'better') nodeState[chk.v] = 'relax';
    }
    const subs = {};
    for (let i = 0; i < V; i++) subs[i] = fmt(val[i]);
    return {
      ...base(g),
      nodeState,
      edgeState,
      edgeFrom,
      subs,
      panels: [
        { type: 'array', label: D ? T('dist[ ] — best distance found so far', 'dist[ ] — এ পর্যন্ত পাওয়া সেরা দূরত্ব') : T('key[ ] — cheapest edge that can connect it', 'key[ ] — যুক্ত করার সবচেয়ে সস্তা এজ'), cells: val.map(fmt), hl: aHl },
        { type: 'array', label: D ? T('done[ ]', 'done[ ]') : T('inTree[ ]', 'inTree[ ]'), cells: fin.map((b) => (b ? 'T' : 'F')), hl: cur != null ? { [cur]: 'current' } : {} },
        ...(D ? [] : [{ type: 'array', label: T('parent[ ] (− = none)', 'parent[ ] (− = নেই)'), cells: parent.map((p) => (p < 0 ? '−' : p)) }])
      ],
      status
    };
  };
  const push = (title, explanation, scene, line, state) => steps.push({ title, explanation, scene, line, ...(state ? { state } : {}) });

  push(
    T('Step 0: build the weighted graph', 'ধাপ ০: ওজনসহ গ্রাফ বানানো'),
    D
      ? T(
        `Every edge now has a **weight** — think of it as kilometres of road. The adjacency list stores each neighbour **with** its weight: \`adj[${src}] = [${adj[src].map((x) => `(${x.v}, ${x.w})`).join(', ')}]\`${adj[src].length ? ` means road ${src}–${adj[src][0].v} is ${adj[src][0].w} km` : ''}.\n\nGoal: the **shortest distance** from vertex ${src} to every other vertex.`,
        `এখন প্রতিটা এজের একটা **ওজন (weight)** আছে — রাস্তার কিলোমিটার ভাবো। অ্যাডজাসেন্সি লিস্ট প্রতিটা প্রতিবেশীকে তার ওজন **সহ** রাখে: \`adj[${src}] = [${adj[src].map((x) => `(${x.v}, ${x.w})`).join(', ')}]\`${adj[src].length ? ` মানে ${src}–${adj[src][0].v} রাস্তা ${adj[src][0].w} কিমি` : ''}।\n\nলক্ষ্য: ভার্টেক্স ${src} থেকে বাকি প্রতিটা ভার্টেক্সের **সবচেয়ে ছোট দূরত্ব**।`
      )
      : T(
        `Every edge has a **cost** — imagine the price of laying a cable between two buildings. The adjacency list keeps each neighbour **with** its cost.\n\nGoal: connect **all** vertices using the **cheapest** set of edges — a **Minimum Spanning Tree (MST)**.`,
        `প্রতিটা এজের একটা **খরচ** আছে — দুই বিল্ডিংয়ের মধ্যে কেবল টানার দাম ভাবো। অ্যাডজাসেন্সি লিস্ট প্রতিটা প্রতিবেশীকে তার খরচ **সহ** রাখে।\n\nলক্ষ্য: **সবচেয়ে সস্তা** এজের সেট দিয়ে **সব** ভার্টেক্স যুক্ত করা — একটা **মিনিমাম স্প্যানিং ট্রি (MST)**।`
      ),
    { ...frame({ status: T(`${V} vertices, ${g.edges.length} weighted edges`, `${V}টা ভার্টেক্স, ${g.edges.length}টা ওজনসহ এজ`) }), subs: {}, nodeState: {}, edgeState: {}, panels: [adjPanel(g)] },
    'build'
  );

  push(
    D ? T(`main() calls dijkstra(adj, ${src})`, `main() কল করে dijkstra(adj, ${src})`) : T('main() calls prim(adj)', 'main() কল করে prim(adj)'),
    D
      ? T(
        `\`dist[v]\` is our **best guess so far** for the distance ${src} → v. At the start we know nothing, so every guess is **∞** (infinity) — except \`dist[${src}] = 0\`, because the start is 0 km from itself.\n\n\`done[v]\` turns true when v's distance is **final** and will never change again.\n\nThe yellow tag under each vertex shows its current \`dist\`.`,
        `\`dist[v]\` হলো ${src} → v দূরত্বের **এ পর্যন্ত সেরা অনুমান**। শুরুতে কিছুই জানি না, তাই সব অনুমান **∞** (অসীম) — শুধু \`dist[${src}] = 0\`, কারণ শুরু থেকে শুরুর দূরত্ব 0 কিমি।\n\n\`done[v]\` true হয় যখন v-এর দূরত্ব **চূড়ান্ত** — আর কখনো বদলাবে না।\n\nপ্রতিটা ভার্টেক্সের নিচের হলুদ ট্যাগে তার বর্তমান \`dist\` দেখানো।`
      )
      : T(
        `Prim grows **one tree**, starting from vertex ${src}, adding one vertex at a time.\n\n\`key[v]\` = the **cheapest edge** that could connect v to the tree right now (∞ = no edge yet). \`key[${src}] = 0\` because ${src} is where the tree starts. \`parent[v]\` remembers **which tree vertex** offers that cheapest edge.\n\nThe yellow tag under each vertex shows its current \`key\`.`,
        `প্রিম (Prim) ভার্টেক্স ${src} থেকে শুরু করে **একটা ট্রি** বড় করে, একবারে একটা ভার্টেক্স যোগ করে।\n\n\`key[v]\` = এই মুহূর্তে v-কে ট্রির সঙ্গে জোড়ার **সবচেয়ে সস্তা এজ** (∞ = এখনো কোনো এজ নেই)। \`key[${src}] = 0\` কারণ ট্রি ${src} থেকে শুরু। \`parent[v]\` মনে রাখে **ট্রির কোন ভার্টেক্স** সেই সস্তা এজটা দিচ্ছে।\n\nপ্রতিটা ভার্টেক্সের নিচের হলুদ ট্যাগে তার বর্তমান \`key\` দেখানো।`
      ),
    frame({ aHl: { [src]: 'relax' }, status: T(`${NAME}[${src}] = 0, all others ∞`, `${NAME}[${src}] = 0, বাকি সব ∞`) }),
    ['call', 'init']
  );

  for (let round = 0; round < V; round++) {
    let u = -1;
    for (let i = 0; i < V; i++) if (!fin[i] && (u === -1 || val[i] < val[u])) u = i;
    const cand = [];
    for (let i = 0; i < V; i++) if (!fin[i]) cand.push(i);
    fin[u] = true;
    const candTxt = cand.map((i) => `${NAME}[${i}] = ${fmt(val[i])}`).join(', ');
    const why = D && val[u] === Infinity
      ? T(
        `Its dist is still **∞**: no road from ${src} leads to ${u} at all. It can never be reached, so its neighbours cannot be improved through it.`,
        `এর dist এখনো **∞**: ${src} থেকে ${u}-এ যাওয়ার কোনো রাস্তাই নেই। কখনো পৌঁছানো যাবে না, তাই এর মাধ্যমে প্রতিবেশীদের উন্নত করা যায় না।`
      )
      : D
      ? T(
        `No other route can beat it: any other way to ${u} must pass through a vertex that is already **farther** than ${fmt(val[u])}, and weights are never negative.`,
        `অন্য কোনো পথ এটাকে হারাতে পারবে না: ${u}-এ যাওয়ার অন্য যেকোনো পথকে এমন ভার্টেক্স দিয়ে যেতে হবে যেটা ইতিমধ্যেই ${fmt(val[u])}-এর চেয়ে **দূরে**, আর ওজন কখনো নেগেটিভ নয়।`
      )
      : T(
        parent[u] >= 0 ? `Edge **${parent[u]}–${u}** (cost ${val[u]}) joins the MST. It is the cheapest edge leaving the tree, so it is always safe to take.` : 'The tree starts here, with no edge yet.',
        parent[u] >= 0 ? `এজ **${parent[u]}–${u}** (খরচ ${val[u]}) MST-তে ঢুকল। ট্রি থেকে বের হওয়া এটাই সবচেয়ে সস্তা এজ, তাই এটা নেওয়া সবসময় নিরাপদ।` : 'ট্রি এখান থেকে শুরু, এখনো কোনো এজ নেই।'
      );
    push(
      D ? T(`Round ${round + 1}: pick ${u} (dist ${fmt(val[u])})`, `রাউন্ড ${round + 1}: ${u} বাছো (dist ${fmt(val[u])})`) : T(`Round ${round + 1}: add ${u} to the tree`, `রাউন্ড ${round + 1}: ${u}-কে ট্রিতে নাও`),
      T(
        `Look only at vertices that are **not ${D ? 'done' : 'in the tree'}**: ${candTxt}.\n\nThe smallest is **${u}** (${fmt(val[u])}), so mark \`${FIN}[${u}] = true\`.\n\n${why.en}`,
        `শুধু **${D ? 'done নয়' : 'ট্রিতে নেই'}** এমন ভার্টেক্স দেখো: ${candTxt}।\n\nসবচেয়ে ছোট **${u}** (${fmt(val[u])}), তাই \`${FIN}[${u}] = true\`।\n\n${why.bn}`
      ),
      frame({ cur: u, cand, aHl: Object.fromEntries(cand.map((i) => [i, i === u ? 'current' : 'compare'])), status: T(`smallest ${NAME} among unfinished → u = ${u}`, `শেষ-না-হওয়াদের মধ্যে সবচেয়ে ছোট ${NAME} → u = ${u}`) }),
      ['loop', 'pick', 'mark'],
      { u, [`${NAME}[u]`]: fmt(val[u]) }
    );

    for (const { v, w } of adj[u]) {
      if (fin[v]) {
        push(
          T(`${u} → ${v}: already final, skip`, `${u} → ${v}: আগেই চূড়ান্ত, বাদ`),
          T(
            `Neighbour **${v}** is already ${D ? '**done** — its distance is final' : '**in the tree**'}, so the condition \`${D ? '!done[v]' : '!inTree[v]'}\` is false.\n\nNothing to do; move to the next neighbour.`,
            `প্রতিবেশী **${v}** আগেই ${D ? '**done** — তার দূরত্ব চূড়ান্ত' : '**ট্রিতে আছে**'}, তাই শর্ত \`${D ? '!done[v]' : '!inTree[v]'}\` মিথ্যা।\n\nকিছু করার নেই; পরের প্রতিবেশীতে যাও।`
          ),
          frame({ cur: u, chk: { u, v }, chkKind: 'skip', status: T(`${v} is final → skip`, `${v} চূড়ান্ত → বাদ`) }),
          ['forNbr', D ? 'ifRelax' : 'ifBetter'],
          { u, v, w }
        );
        continue;
      }
      const offer = D ? val[u] + w : w;
      const old = val[v];
      const better = offer < old;
      const offerTxt = D ? `dist[${u}] + w = ${fmt(val[u])} + ${w} = **${fmt(offer)}**` : `w = **${w}**`;
      if (better) {
        val[v] = offer;
        parent[v] = u;
      }
      push(
        better ? T(`${u} → ${v}: ${offer} < ${fmt(old)}, update!`, `${u} → ${v}: ${offer} < ${fmt(old)}, আপডেট!`) : T(`${u} → ${v}: ${fmt(offer)} is not better`, `${u} → ${v}: ${fmt(offer)} ভালো নয়`),
        better
          ? T(
            `Edge ${u}–${v} has weight ${w}. ${D ? `Going **through ${u}** costs ${offerTxt}.` : `Connecting ${v} through ${u} costs ${offerTxt}.`}\n\nIs ${offer} < \`${NAME}[${v}]\` (${fmt(old)})? **Yes** → set \`${NAME}[${v}] = ${offer}\`${D ? '' : ` and \`parent[${v}] = ${u}\``}.${D ? ' This is called **relaxing** the edge: we found a shorter road.' : ''}`,
            `এজ ${u}–${v}-এর ওজন ${w}। ${D ? `**${u} হয়ে** গেলে খরচ ${offerTxt}।` : `${u} দিয়ে ${v}-কে জুড়লে খরচ ${offerTxt}।`}\n\n${offer} < \`${NAME}[${v}]\` (${fmt(old)})? **হ্যাঁ** → \`${NAME}[${v}] = ${offer}\`${D ? '' : ` আর \`parent[${v}] = ${u}\``}।${D ? ' একে বলে এজ **রিল্যাক্স (relax)** করা: আরও ছোট রাস্তা পাওয়া গেল।' : ''}`
          )
          : T(
            `Edge ${u}–${v} has weight ${w}. ${D ? `Going through ${u} would cost ${offerTxt}` : `Connecting ${v} through ${u} would cost ${offerTxt}`}.\n\nIs ${fmt(offer)} < \`${NAME}[${v}]\` (${fmt(old)})? **No** — the old offer is ${offer === old ? 'just as good' : 'better'}, so keep it.`,
            `এজ ${u}–${v}-এর ওজন ${w}। ${D ? `${u} হয়ে গেলে খরচ হতো ${offerTxt}` : `${u} দিয়ে ${v}-কে জুড়লে খরচ হতো ${offerTxt}`}।\n\n${fmt(offer)} < \`${NAME}[${v}]\` (${fmt(old)})? **না** — পুরনোটা ${offer === old ? 'সমান ভালো' : 'আরও ভালো'}, তাই সেটাই থাকুক।`
          ),
        frame({ cur: u, chk: { u, v }, chkKind: better ? 'better' : 'worse', aHl: { [v]: better ? 'relax' : 'compare' }, status: better ? T(`${NAME}[${v}]: ${fmt(old)} → ${offer}`, `${NAME}[${v}]: ${fmt(old)} → ${offer}`) : T(`${fmt(offer)} ≥ ${fmt(old)} → keep ${fmt(old)}`, `${fmt(offer)} ≥ ${fmt(old)} → ${fmt(old)}-ই থাকুক`) }),
        better ? ['forNbr', D ? 'ifRelax' : 'ifBetter', D ? 'relax' : 'update'] : ['forNbr', D ? 'ifRelax' : 'ifBetter'],
        { u, v, w, [D ? 'dist[u] + w' : 'w']: fmt(offer), [`${NAME}[v]`]: fmt(old) }
      );
    }
  }

  const total = val.reduce((a, b) => a + b, 0);
  if (D) {
    const pathTo = (v) => { if (val[v] === Infinity) return null; const p = []; for (let x = v; x !== -1; x = parent[x]) p.unshift(x); return p.join(' → '); };
    push(
      T('All distances are final', 'সব দূরত্ব চূড়ান্ত'),
      T(
        `Every vertex is done. Shortest distances from ${src}:\n\n${val.map((d, v) => (pathTo(v) ? `- to **${v}**: ${d}  (${pathTo(v)})` : `- to **${v}**: ∞ — cannot be reached`)).join('\n')}\n\nThe **green edges** form the **shortest-path tree**: follow them from ${src} to get each route.`,
        `সব ভার্টেক্স done। ${src} থেকে সবচেয়ে ছোট দূরত্ব:\n\n${val.map((d, v) => (pathTo(v) ? `- **${v}** পর্যন্ত: ${d}  (${pathTo(v)})` : `- **${v}** পর্যন্ত: ∞ — পৌঁছানো যায় না`)).join('\n')}\n\n**সবুজ এজগুলো** মিলে **শর্টেস্ট-পাথ ট্রি**: ${src} থেকে এগুলো ধরে গেলে প্রতিটা রাস্তা পাবে।`
      ),
      frame({ status: T(`dist = [${val.map(fmt).join(', ')}]`, `dist = [${val.map(fmt).join(', ')}]`) }),
      'print'
    );
    push(
      T('What we learned', 'কী শিখলাম'),
      T(
        `- **Greedy idea:** always finish the closest unfinished vertex next.\n- **Relax:** if \`dist[u] + w < dist[v]\`, the road through u is shorter — update \`dist[v]\`.\n- **Cost:** this simple version scans for the minimum each round: **O(V²)**. With a **min-heap (priority queue)** it becomes **O((V + E) log V)** — better for big, sparse graphs.\n\n> **Warning:** Dijkstra fails if an edge weight is **negative** — a "done" vertex might later get cheaper. For that, use **Bellman-Ford**.`,
        `- **লোভী (greedy) ধারণা:** সবসময় সবচেয়ে কাছের শেষ-না-হওয়া ভার্টেক্সটা আগে শেষ করো।\n- **রিল্যাক্স:** \`dist[u] + w < dist[v]\` হলে u হয়ে যাওয়া রাস্তা ছোট — \`dist[v]\` আপডেট করো।\n- **খরচ:** এই সহজ সংস্করণ প্রতি রাউন্ডে সবচেয়ে ছোটটা খোঁজে: **O(V²)**। **মিন-হিপ (priority queue)** দিয়ে এটা হয় **O((V + E) log V)** — বড়, পাতলা গ্রাফে ভালো।\n\n> **সতর্কতা:** কোনো এজের ওজন **নেগেটিভ** হলে Dijkstra ভুল করে — একটা "done" ভার্টেক্স পরে আরও সস্তা হয়ে যেতে পারে। তখন **Bellman-Ford** ব্যবহার করো।`
      ),
      frame({ status: T('green = shortest-path tree', 'সবুজ = শর্টেস্ট-পাথ ট্রি') }),
      'call'
    );
  } else {
    const mst = [];
    for (let v = 0; v < V; v++) if (parent[v] >= 0) mst.push(`${parent[v]}–${v} (${val[v]})`);
    push(
      T(`MST finished: total cost ${total}`, `MST শেষ: মোট খরচ ${total}`),
      T(
        `All ${V} vertices are in the tree. The MST uses **${V - 1} edges** (always V − 1):\n\n${mst.map((m) => `- ${m}`).join('\n')}\n\nTotal cost = **${total}**. No other set of edges connecting everything is cheaper.`,
        `${V}টা ভার্টেক্সই ট্রিতে। MST-তে **${V - 1}টা এজ** (সবসময় V − 1):\n\n${mst.map((m) => `- ${m}`).join('\n')}\n\nমোট খরচ = **${total}**। সব জোড়া লাগায় এমন অন্য কোনো এজের সেট এর চেয়ে সস্তা নয়।`
      ),
      frame({ status: T(`MST cost = ${total}`, `MST খরচ = ${total}`) }),
      'print'
    );
    push(
      T('What we learned', 'কী শিখলাম'),
      T(
        `- **Prim grows one tree.** Each round it adds the vertex with the **cheapest connecting edge**.\n- It looks almost exactly like Dijkstra! The only difference is the question: Dijkstra asks \`dist[u] + w < dist[v]\` (total distance from the start), Prim asks \`w < key[v]\` (just this one edge).\n- **Cost:** O(V²) with arrays, **O(E log V)** with a min-heap. Prim is great for **dense** graphs.`,
        `- **প্রিম একটা ট্রি বড় করে।** প্রতি রাউন্ডে **সবচেয়ে সস্তা সংযোগ-এজ** যার, সেই ভার্টেক্স যোগ করে।\n- দেখতে প্রায় হুবহু Dijkstra! পার্থক্য শুধু প্রশ্নে: Dijkstra জিজ্ঞেস করে \`dist[u] + w < dist[v]\` (শুরু থেকে মোট দূরত্ব), প্রিম জিজ্ঞেস করে \`w < key[v]\` (শুধু এই একটা এজ)।\n- **খরচ:** অ্যারে দিয়ে O(V²), মিন-হিপ দিয়ে **O(E log V)**। **ঘন (dense)** গ্রাফে প্রিম দারুণ।`
      ),
      frame({ status: T('green = minimum spanning tree', 'সবুজ = মিনিমাম স্প্যানিং ট্রি') }),
      'call'
    );
  }
  return steps;
}

export const genDijkstra = (g, src) => genGreedy(g, 'dijkstra', src);
export const genPrim = (g) => genGreedy(g, 'prim', 0);

/* ======================================================================== Kruskal */

export function genKruskal(g) {
  const V = g.V;
  const steps = [];
  const sorted = g.edges.map((e, i) => ({ ...e, i })).sort((a, b) => a.w - b.w || a.i - b.i);
  const parent = Array.from({ length: V }, (_, i) => i);
  const status = new Map(); // edge index in sorted → 'tree' | 'reject'
  let total = 0;
  const find = (x) => { const path = [x]; while (parent[x] !== x) { x = parent[x]; path.push(x); } return { root: x, path }; };

  const frame = ({ curIdx = null, nodeHl = {}, pHl = {}, showSorted = true, statusText }) => {
    const edgeState = {};
    const nodeState = {};
    sorted.forEach((e, k) => {
      const s = status.get(k);
      if (s) edgeState[ek(e.u, e.v)] = s === 'tree' ? 'tree' : 'reject';
    });
    for (const [k, s] of status) if (s === 'tree') { nodeState[sorted[k].u] = 'done'; nodeState[sorted[k].v] = 'done'; }
    if (curIdx != null) edgeState[ek(sorted[curIdx].u, sorted[curIdx].v)] = 'compare';
    Object.assign(nodeState, nodeHl);
    const rows = (showSorted ? sorted : g.edges).map((e, k) => {
      const s = showSorted ? status.get(k) : null;
      return {
        e: `${e.u}–${e.v}`,
        w: e.w,
        state: showSorted && curIdx === k ? 'current' : s === 'tree' ? 'tree' : s === 'reject' ? 'reject' : '',
        note: s === 'tree' ? T('✓ taken', '✓ নেওয়া হলো') : s === 'reject' ? T('✗ cycle', '✗ সাইকেল') : ''
      };
    });
    return {
      ...base(g),
      nodeState,
      edgeState,
      panels: [
        { type: 'edges', label: showSorted ? T('edges, sorted by weight', 'এজ, ওজন অনুযায়ী সাজানো') : T('edges (input order)', 'এজ (ইনপুটের ক্রমে)'), rows, notes: showSorted },
        { type: 'array', label: T('parent[ ] — a vertex that points to itself is a group leader', 'parent[ ] — নিজের দিকে নির্দেশ করা ভার্টেক্সই দলের লিডার'), cells: [...parent], hl: pHl },
        { type: 'text', label: T('MST total', 'MST মোট'), text: `**${total}**` }
      ],
      status: statusText
    };
  };
  const push = (title, explanation, scene, line, state) => steps.push({ title, explanation, scene, line, ...(state ? { state } : {}) });

  push(
    T('Step 0: the graph as a list of edges', 'ধাপ ০: এজের তালিকা হিসেবে গ্রাফ'),
    T(
      `Kruskal does not need neighbours — it only needs a plain **list of edges** \`(u, v, weight)\`.\n\nSame goal as Prim: connect **all** vertices as **cheaply** as possible → a **Minimum Spanning Tree (MST)**.\n\nBut the strategy is different: Kruskal looks at the **whole map** and keeps picking the cheapest edge anywhere.`,
      `ক্রুসকালের (Kruskal) প্রতিবেশী লাগে না — শুধু একটা সাধারণ **এজের তালিকা** \`(u, v, weight)\` লাগে।\n\nপ্রিমের মতোই লক্ষ্য: **সব** ভার্টেক্স **সবচেয়ে সস্তায়** জোড়া → একটা **মিনিমাম স্প্যানিং ট্রি (MST)**।\n\nকিন্তু কৌশল আলাদা: ক্রুসকাল **পুরো ম্যাপ** দেখে আর যেখানেই হোক সবচেয়ে সস্তা এজটা বাছতে থাকে।`
    ),
    frame({ showSorted: false, statusText: T(`${g.edges.length} edges`, `${g.edges.length}টা এজ`) }),
    'build'
  );
  push(
    T('Sort the edges by weight', 'এজগুলো ওজন অনুযায়ী সাজাও'),
    T(
      `\`kruskal(edges, ${V})\` starts by **sorting** the edges from cheapest to most expensive: ${sorted.map((e) => `${e.u}–${e.v} (${e.w})`).join(', ')}.\n\nWe will walk down this list **once**, from the top.`,
      `\`kruskal(edges, ${V})\` শুরুতেই এজগুলো সবচেয়ে সস্তা থেকে দামি ক্রমে **সাজায়**: ${sorted.map((e) => `${e.u}–${e.v} (${e.w})`).join(', ')}।\n\nআমরা এই তালিকা ওপর থেকে **একবার** নিচে নামব।`
    ),
    frame({ statusText: T('sorted: cheapest first', 'সাজানো: সস্তা আগে') }),
    ['call', 'header', 'sort']
  );
  push(
    T('Everyone starts in their own group', 'সবাই নিজের দলে শুরু করে'),
    T(
      `\`parent[i] = i\` for every vertex: each vertex is a **group of one** and is its own **leader**.\n\nThe trick of Kruskal: an edge whose two ends are **already in the same group** would close a **cycle** — so we skip it. To check that fast we use **Union-Find (Disjoint Set Union, DSU)**: \`find(x)\` follows \`parent\` links up to x's leader.`,
      `প্রতিটা ভার্টেক্সে \`parent[i] = i\`: প্রতিটা ভার্টেক্স **একজনের একটা দল** আর নিজেই নিজের **লিডার**।\n\nক্রুসকালের কৌশল: যে এজের দুই মাথা **আগেই একই দলে**, সেটা নিলে **সাইকেল** তৈরি হবে — তাই বাদ দিই। দ্রুত এটা যাচাই করতে লাগে **ইউনিয়ন-ফাইন্ড (Disjoint Set Union, DSU)**: \`find(x)\` \`parent\` লিংক ধরে x-এর লিডার পর্যন্ত যায়।`
    ),
    frame({ pHl: Object.fromEntries(parent.map((_, i) => [i, 'relax'])), statusText: T('parent = [0, 1, 2, …]', 'parent = [0, 1, 2, …]') }),
    'init'
  );

  sorted.forEach((e, k) => {
    const fu = find(e.u);
    const fv = find(e.v);
    const pathTxt = (f) => (f.path.length > 1 ? f.path.join(' → ') : `${f.path[0]} (its own leader)`);
    const pathTxtBn = (f) => (f.path.length > 1 ? f.path.join(' → ') : `${f.path[0]} (নিজেই লিডার)`);
    push(
      T(`Edge ${e.u}–${e.v} (${e.w}): find the leaders`, `এজ ${e.u}–${e.v} (${e.w}): লিডার খোঁজো`),
      T(
        `Next cheapest edge: **${e.u}–${e.v}** with weight ${e.w}.\n\n- \`find(${e.u})\`: ${pathTxt(fu)} → leader **${fu.root}**\n- \`find(${e.v})\`: ${pathTxt(fv)} → leader **${fv.root}**`,
        `পরের সবচেয়ে সস্তা এজ: **${e.u}–${e.v}**, ওজন ${e.w}।\n\n- \`find(${e.u})\`: ${pathTxtBn(fu)} → লিডার **${fu.root}**\n- \`find(${e.v})\`: ${pathTxtBn(fv)} → লিডার **${fv.root}**`
      ),
      frame({ curIdx: k, nodeHl: { [e.u]: 'compare', [e.v]: 'compare' }, pHl: Object.fromEntries([...fu.path, ...fv.path].map((x) => [x, 'compare'])), statusText: T(`find(${e.u}) = ${fu.root},  find(${e.v}) = ${fv.root}`, `find(${e.u}) = ${fu.root},  find(${e.v}) = ${fv.root}`) }),
      ['forEdge', 'find'],
      { u: e.u, v: e.v, w: e.w, ru: fu.root, rv: fv.root }
    );
    if (fu.root !== fv.root) {
      parent[fu.root] = fv.root;
      total += e.w;
      status.set(k, 'tree');
      push(
        T(`Different groups → take ${e.u}–${e.v}`, `আলাদা দল → ${e.u}–${e.v} নাও`),
        T(
          `Leaders ${fu.root} ≠ ${fv.root}: the two ends are in **different groups**, so this edge cannot make a cycle.\n\n**Take it**: total += ${e.w} → **${total}**. Then join the groups: \`parent[${fu.root}] = ${fv.root}\` — now ${fv.root} leads them both.`,
          `লিডার ${fu.root} ≠ ${fv.root}: দুই মাথা **আলাদা দলে**, তাই এই এজ সাইকেল বানাতে পারে না।\n\n**নিয়ে নাও**: total += ${e.w} → **${total}**। তারপর দল দুটো জোড়ো: \`parent[${fu.root}] = ${fv.root}\` — এখন ${fv.root} দুই দলেরই লিডার।`
        ),
        frame({ pHl: { [fu.root]: 'relax' }, statusText: T(`take ${e.u}–${e.v}, total = ${total}`, `${e.u}–${e.v} নেওয়া হলো, total = ${total}`) }),
        ['ifDiff', 'take', 'union'],
        { ru: fu.root, rv: fv.root, total }
      );
    } else {
      status.set(k, 'reject');
      push(
        T(`Same group → skip ${e.u}–${e.v}`, `একই দল → ${e.u}–${e.v} বাদ`),
        T(
          `Both leaders are **${fu.root}**: ${e.u} and ${e.v} are **already connected** through edges we took.\n\nAdding ${e.u}–${e.v} would close a **cycle** (a loop) — a tree never has one. **Skip it.**`,
          `দুই লিডারই **${fu.root}**: নেওয়া এজগুলো দিয়ে ${e.u} আর ${e.v} **আগেই যুক্ত**।\n\n${e.u}–${e.v} যোগ করলে একটা **সাইকেল** (লুপ) বন্ধ হবে — ট্রিতে কখনো সাইকেল থাকে না। **বাদ দাও।**`
        ),
        frame({ nodeHl: { [e.u]: 'reject', [e.v]: 'reject' }, statusText: T(`${fu.root} = ${fv.root} → cycle → skip`, `${fu.root} = ${fv.root} → সাইকেল → বাদ`) }),
        ['ifDiff', 'skip'],
        { ru: fu.root, rv: fv.root }
      );
    }
  });

  const taken = [...status.values()].filter((x) => x === 'tree').length;
  push(
    T(`MST finished: total cost ${total}`, `MST শেষ: মোট খরচ ${total}`),
    T(
      `${taken === V - 1 ? `Kruskal kept **${V - 1}** edges (V − 1, as every spanning tree has) and skipped the rest. Total cost = **${total}**.` : `Kruskal kept only **${taken}** edges, fewer than V − 1 = ${V - 1}: the graph is **not connected**, so the result is a **minimum spanning forest** — one cheapest tree per island. Total cost = **${total}**.`}\n\n- **Idea:** cheapest edges first, skip anything that makes a cycle.\n- **Cost:** sorting dominates: **O(E log E)** = O(E log V). Great for **sparse** graphs.\n- **Faster find:** real code adds **path compression** and **union by rank**, so each find is almost O(1).`,
      `${taken === V - 1 ? `ক্রুসকাল **${V - 1}টা** এজ রাখল (V − 1, যেমন প্রতিটা স্প্যানিং ট্রিতে থাকে) আর বাকিগুলো বাদ দিল। মোট খরচ = **${total}**।` : `ক্রুসকাল মাত্র **${taken}টা** এজ রাখল, V − 1 = ${V - 1}-এর কম: গ্রাফটা **যুক্ত নয়**, তাই ফল একটা **মিনিমাম স্প্যানিং ফরেস্ট** — প্রতিটা দ্বীপে একটা করে সবচেয়ে সস্তা ট্রি। মোট খরচ = **${total}**।`}\n\n- **ধারণা:** সস্তা এজ আগে, সাইকেল বানালে বাদ।\n- **খরচ:** সাজানোটাই বেশি সময় নেয়: **O(E log E)** = O(E log V)। **পাতলা (sparse)** গ্রাফে দারুণ।\n- **দ্রুত find:** আসল কোডে **পাথ কম্প্রেশন** আর **ইউনিয়ন বাই র‍্যাঙ্ক** যোগ করা হয়, তাতে প্রতিটা find প্রায় O(1)।`
    ),
    frame({ statusText: T(`MST cost = ${total}`, `MST খরচ = ${total}`) }),
    'print'
  );
  return steps;
}

/* ======================================================================== Bellman-Ford */

export function genBellmanFord(g, src, negDemo) {
  const V = g.V;
  const neg = g.edges.find((e) => e.w < 0);
  const steps = [];
  const dist = Array(V).fill(Infinity);
  const parent = Array(V).fill(-1);
  dist[src] = 0;
  const frame = ({ cur = null, kind = '', dHl = {}, statusText, pass = null }) => {
    const nodeState = { [src]: 'source' };
    const edgeState = {};
    for (let v = 0; v < V; v++) if (parent[v] >= 0) edgeState[ek(parent[v], v)] = 'tree';
    if (cur) {
      edgeState[ek(cur.u, cur.v)] = kind === 'better' ? 'relax' : kind === 'skip' ? 'dim' : 'compare';
      nodeState[cur.u] = nodeState[cur.u] === 'source' ? 'source' : 'current';
      if (kind === 'better') nodeState[cur.v] = 'relax';
      else nodeState[cur.v] = 'compare';
    }
    const subs = {};
    for (let i = 0; i < V; i++) subs[i] = fmt(dist[i]);
    return {
      ...base(g),
      nodeState,
      edgeState,
      subs,
      panels: [
        { type: 'edges', label: pass ? T(`pass ${pass} of at most ${V - 1}: check every edge in order`, `পাস ${pass} (সর্বোচ্চ ${V - 1}টা): ক্রমে প্রতিটা এজ দেখো`) : T('edges (u → v, weight)', 'এজ (u → v, ওজন)'), rows: g.edges.map((e) => ({ e: `${e.u}→${e.v}`, w: e.w, state: cur && cur.u === e.u && cur.v === e.v ? 'current' : '' })) },
        { type: 'array', label: T('dist[ ]', 'dist[ ]'), cells: dist.map(fmt), hl: dHl }
      ],
      status: statusText
    };
  };
  const push = (title, explanation, scene, line, state) => steps.push({ title, explanation, scene, line, ...(state ? { state } : {}) });

  push(
    neg ? T('Step 0: a graph with negative edges', 'ধাপ ০: নেগেটিভ এজসহ একটা গ্রাফ') : T('Step 0: a directed weighted graph', 'ধাপ ০: একটা ডিরেক্টেড ওয়েটেড গ্রাফ'),
    T(
      `This graph is **directed** (one-way arrows)${neg ? ` and some weights are **negative**, like \`${neg.u} → ${neg.v}\` with ${neg.w}. Think of a road that pays **you** a toll back` : '. It has no negative weights, but Bellman-Ford would handle them'}.\n\nDijkstra can give wrong answers here. **Bellman-Ford** is slower but safe: it simply relaxes **every edge**, again and again, until nothing improves.`,
      `এই গ্রাফটা **ডিরেক্টেড** (একমুখী তীর)${neg ? ` আর কিছু ওজন **নেগেটিভ**, যেমন \`${neg.u} → ${neg.v}\`-এর ${neg.w}। এমন রাস্তা ভাবো যেটা উল্টো **তোমাকে** টোল ফেরত দেয়` : '। এতে নেগেটিভ ওজন নেই, তবে থাকলেও Bellman-Ford সামলাতে পারত'}।\n\nএখানে Dijkstra ভুল উত্তর দিতে পারে। **Bellman-Ford** ধীর কিন্তু নিরাপদ: এটা শুধু **প্রতিটা এজ** বারবার রিল্যাক্স করে, যতক্ষণ না আর কিছু উন্নত হয়।`
    ),
    frame({ statusText: T(`${V} vertices, ${g.edges.length} one-way edges`, `${V}টা ভার্টেক্স, ${g.edges.length}টা একমুখী এজ`) }),
    'build'
  );
  push(
    T(`main() calls bellmanFord(edges, ${V}, ${src})`, `main() কল করে bellmanFord(edges, ${V}, ${src})`),
    T(
      `\`dist[${src}] = 0\`, every other \`dist\` = ∞.\n\nWhy **V − 1 = ${V - 1}** passes? A shortest path visits each vertex at most once, so it has at most V − 1 edges. Each pass fixes **at least one more edge** of every shortest path, so after V − 1 passes all of them are right.`,
      `\`dist[${src}] = 0\`, বাকি সব \`dist\` = ∞।\n\n**V − 1 = ${V - 1}** পাস কেন? সবচেয়ে ছোট পথ প্রতিটা ভার্টেক্সে বড়জোর একবার যায়, তাই তাতে বড়জোর V − 1টা এজ। প্রতিটা পাস প্রতিটা ছোট পথের **অন্তত আরও একটা এজ** ঠিক করে, তাই V − 1 পাস পরে সবগুলো ঠিক।`
    ),
    frame({ dHl: { [src]: 'relax' }, statusText: T(`dist[${src}] = 0, others ∞`, `dist[${src}] = 0, বাকি ∞`) }),
    ['call', 'header', 'init']
  );

  let pass = 0;
  for (pass = 1; pass <= V - 1; pass++) {
    let changed = false;
    push(
      T(`Pass ${pass} begins`, `পাস ${pass} শুরু`),
      T(
        `Pass ${pass}: set \`changed = false\` and go through **all ${g.edges.length} edges** in the list order.\n\nCurrent distances: ${dist.map((d, i) => `${i}:${fmt(d)}`).join('  ')}`,
        `পাস ${pass}: \`changed = false\` করো আর তালিকার ক্রমে **সব ${g.edges.length}টা এজ** দেখো।\n\nবর্তমান দূরত্ব: ${dist.map((d, i) => `${i}:${fmt(d)}`).join('  ')}`
      ),
      frame({ pass, statusText: T(`pass ${pass}`, `পাস ${pass}`) }),
      'pass',
      { pass }
    );
    for (const e of g.edges) {
      const { u, v, w } = e;
      if (dist[u] === Infinity) {
        push(
          T(`${u}→${v}: dist[${u}] is ∞, skip`, `${u}→${v}: dist[${u}] = ∞, বাদ`),
          T(
            `Edge **${u} → ${v}** (weight ${w}). We have **not reached ${u} yet** (\`dist[${u}] = ∞\`), so we cannot use this road. Skip.`,
            `এজ **${u} → ${v}** (ওজন ${w})। আমরা **এখনো ${u}-এ পৌঁছাইনি** (\`dist[${u}] = ∞\`), তাই এই রাস্তা ব্যবহার করা যায় না। বাদ।`
          ),
          frame({ cur: e, kind: 'skip', pass, statusText: T(`dist[${u}] = ∞ → skip`, `dist[${u}] = ∞ → বাদ`) }),
          ['forEdge', 'ifRelax'],
          { pass, u, v, w }
        );
        continue;
      }
      const offer = dist[u] + w;
      const old = dist[v];
      if (offer < old) {
        dist[v] = offer;
        parent[v] = u;
        changed = true;
        push(
          T(`${u}→${v}: ${offer} < ${fmt(old)} → update`, `${u}→${v}: ${offer} < ${fmt(old)} → আপডেট`),
          T(
            `Edge **${u} → ${v}** (weight ${w}): \`dist[${u}] + w\` = ${dist[u]} + (${w}) = **${offer}**.\n\n${offer} < \`dist[${v}]\` (${fmt(old)}) → **relax**: \`dist[${v}] = ${offer}\`, and \`changed = true\`.${w < 0 ? `\n\nNotice the **negative** weight made the road through ${u} cheaper.` : ''}`,
            `এজ **${u} → ${v}** (ওজন ${w}): \`dist[${u}] + w\` = ${dist[u]} + (${w}) = **${offer}**।\n\n${offer} < \`dist[${v}]\` (${fmt(old)}) → **রিল্যাক্স**: \`dist[${v}] = ${offer}\`, আর \`changed = true\`।${w < 0 ? `\n\nখেয়াল করো, **নেগেটিভ** ওজনের জন্য ${u} হয়ে রাস্তাটা সস্তা হলো।` : ''}`
          ),
          frame({ cur: e, kind: 'better', pass, dHl: { [v]: 'relax' }, statusText: T(`dist[${v}]: ${fmt(old)} → ${offer}`, `dist[${v}]: ${fmt(old)} → ${offer}`) }),
          ['forEdge', 'ifRelax', 'relax'],
          { pass, u, v, w, 'dist[u] + w': offer, 'dist[v]': fmt(old) }
        );
      } else {
        push(
          T(`${u}→${v}: ${offer} is not better`, `${u}→${v}: ${offer} ভালো নয়`),
          T(
            `Edge **${u} → ${v}** (weight ${w}): ${dist[u]} + (${w}) = **${offer}**, but \`dist[${v}]\` is already ${fmt(old)}.\n\nNot smaller → no change.`,
            `এজ **${u} → ${v}** (ওজন ${w}): ${dist[u]} + (${w}) = **${offer}**, কিন্তু \`dist[${v}]\` আগেই ${fmt(old)}।\n\nছোট নয় → কোনো বদল নেই।`
          ),
          frame({ cur: e, kind: 'worse', pass, dHl: { [v]: 'compare' }, statusText: T(`${offer} ≥ ${fmt(old)} → keep`, `${offer} ≥ ${fmt(old)} → যেমন আছে`) }),
          ['forEdge', 'ifRelax'],
          { pass, u, v, w, 'dist[u] + w': offer, 'dist[v]': fmt(old) }
        );
      }
    }
    push(
      changed ? T(`End of pass ${pass}: something changed`, `পাস ${pass} শেষ: কিছু বদলেছে`) : T(`End of pass ${pass}: nothing changed → stop`, `পাস ${pass} শেষ: কিছুই বদলায়নি → থামো`),
      changed
        ? T(
          `\`changed\` is true, so distances are still improving — run **another pass**.\n\nNow: ${dist.map((d, i) => `${i}:${fmt(d)}`).join('  ')}`,
          `\`changed\` true, মানে দূরত্ব এখনো কমছে — **আরেকটা পাস** চালাও।\n\nএখন: ${dist.map((d, i) => `${i}:${fmt(d)}`).join('  ')}`
        )
        : T(
          `A whole pass changed **nothing**, so no future pass can change anything either. We can **stop early** (pass ${pass} of up to ${V - 1}).`,
          `একটা পুরো পাসে **কিছুই** বদলায়নি, তাই পরের কোনো পাসেও কিছু বদলাবে না। আমরা **আগেই থামতে** পারি (সর্বোচ্চ ${V - 1}-এর মধ্যে পাস ${pass})।`
        ),
      frame({ pass, statusText: changed ? T('changed = true → next pass', 'changed = true → পরের পাস') : T('changed = false → break', 'changed = false → break') }),
      'early',
      { pass, changed: String(changed) }
    );
    if (!changed) break;
  }

  const bad = g.edges.find((e) => dist[e.u] !== Infinity && dist[e.u] + e.w < dist[e.v]);
  if (!bad) {
    push(
      T('Final check: any negative cycle?', 'শেষ যাচাই: নেগেটিভ সাইকেল আছে?'),
      T(
        `One more look at every edge: can anything **still** be relaxed? **No** — so there is no negative cycle, and the answer is final:\n\n${dist.map((d, i) => `- dist[${i}] = **${fmt(d)}**${d === Infinity ? ' (cannot be reached)' : ''}`).join('\n')}`,
        `আরেকবার প্রতিটা এজ দেখো: এখনো কি কিছু রিল্যাক্স করা যায়? **না** — তাই কোনো নেগেটিভ সাইকেল নেই, উত্তর চূড়ান্ত:\n\n${dist.map((d, i) => `- dist[${i}] = **${fmt(d)}**${d === Infinity ? ' (পৌঁছানো যায় না)' : ''}`).join('\n')}`
      ),
      frame({ statusText: T(`dist = [${dist.map(fmt).join(', ')}]`, `dist = [${dist.map(fmt).join(', ')}]`) }),
      ['checkLoop', 'checkNeg']
    );
  } else {
    push(
      T('Final check: NEGATIVE CYCLE found!', 'শেষ যাচাই: নেগেটিভ সাইকেল পাওয়া গেছে!'),
      T(
        `After all ${V - 1} passes, edge **${bad.u} → ${bad.v}** can **still** be relaxed: ${dist[bad.u]} + (${bad.w}) = ${dist[bad.u] + bad.w} < ${dist[bad.v]}.\n\nThat is only possible if the graph has a **negative cycle** — a loop whose weights add up below zero, so every lap makes the trip cheaper. There is **no** shortest path, and Bellman-Ford reports the problem instead of a wrong answer.`,
        `সব ${V - 1}টা পাসের পরও এজ **${bad.u} → ${bad.v}** **এখনো** রিল্যাক্স করা যায়: ${dist[bad.u]} + (${bad.w}) = ${dist[bad.u] + bad.w} < ${dist[bad.v]}।\n\nএটা সম্ভব শুধু তখনই, যখন গ্রাফে একটা **নেগেটিভ সাইকেল** আছে — এমন লুপ যার ওজনের যোগফল শূন্যের নিচে, তাই প্রতিটা চক্করে যাত্রা আরও সস্তা হয়। কোনো সবচেয়ে ছোট পথ **নেই**, আর Bellman-Ford ভুল উত্তর না দিয়ে সমস্যাটা জানায়।`
      ),
      frame({ cur: bad, kind: 'worse', statusText: T(`${bad.u} → ${bad.v} still improves → negative cycle`, `${bad.u} → ${bad.v} এখনো কমে → নেগেটিভ সাইকেল`) }),
      ['checkLoop', 'checkNeg']
    );
  }

  // A tiny graph with a negative cycle: distances keep dropping forever.
  if (negDemo) {
    const ng = negDemo;
    const nd = [0, Infinity, Infinity];
    const runPass = () => { for (const e of ng.edges) if (nd[e.u] !== Infinity && nd[e.u] + e.w < nd[e.v]) nd[e.v] = nd[e.u] + e.w; };
    const snaps = [];
    for (let p = 0; p < 3; p++) { runPass(); snaps.push([...nd]); }
    const nframe = (d, hl, statusText) => ({
      ...base(ng),
      nodeState: { 0: 'source', 1: 'reject', 2: 'reject' },
      edgeState: { '1-2': 'reject', '2-1': 'reject' },
      subs: Object.fromEntries(d.map((x, i) => [i, fmt(x)])),
      panels: [{ type: 'array', label: T('dist[ ] after each pass', 'প্রতি পাসের পর dist[ ]'), cells: d.map(fmt), hl }],
      status: statusText
    });
    push(
      T('Warning: a negative cycle', 'সতর্কতা: নেগেটিভ সাইকেল'),
      T(
        `A different tiny graph: going **1 → 2 → 1** costs −3 + 2 = **−1**. Every lap around this loop makes the trip **cheaper**!\n\nAfter passes 1, 2, 3 the distances to 1 and 2 are ${snaps.map((s) => `(${fmt(s[1])}, ${fmt(s[2])})`).join(', ')} — they **never stop dropping**. There is no "shortest" path at all.`,
        `অন্য একটা ছোট গ্রাফ: **1 → 2 → 1** ঘুরতে খরচ −3 + 2 = **−1**। এই লুপে প্রতিটা চক্কর যাত্রাকে আরও **সস্তা** করে!\n\nপাস 1, 2, 3-এর পর 1 আর 2-এর দূরত্ব ${snaps.map((s) => `(${fmt(s[1])}, ${fmt(s[2])})`).join(', ')} — এগুলো **কখনো কমা থামায় না**। কোনো "সবচেয়ে ছোট" পথই নেই।`
      ),
      nframe(snaps[2], { 1: 'reject', 2: 'reject' }, T('1 → 2 → 1 costs −1 per lap', '1 → 2 → 1 প্রতি চক্করে −1')),
      ['checkLoop', 'checkNeg']
    );
  }
  {
    push(
      T('What we learned', 'কী শিখলাম'),
      T(
        `- **Bellman-Ford** relaxes **every edge**, up to **V − 1** times. It works with **negative** weights.\n- If an edge can **still** be relaxed after V − 1 passes, the graph has a **negative cycle** — Bellman-Ford **detects** it instead of giving a wrong answer.\n- **Cost:** **O(V · E)** — slower than Dijkstra's O((V + E) log V), so use it only when weights can be negative.`,
        `- **Bellman-Ford** **প্রতিটা এজ** রিল্যাক্স করে, সর্বোচ্চ **V − 1** বার। **নেগেটিভ** ওজনেও কাজ করে।\n- V − 1 পাসের পরও কোনো এজ রিল্যাক্স করা গেলে গ্রাফে **নেগেটিভ সাইকেল** আছে — ভুল উত্তর না দিয়ে Bellman-Ford সেটা **ধরে ফেলে**।\n- **খরচ:** **O(V · E)** — Dijkstra-র O((V + E) log V)-এর চেয়ে ধীর, তাই শুধু ওজন নেগেটিভ হতে পারলে ব্যবহার করো।`
      ),
      frame({ statusText: T('green = shortest-path tree', 'সবুজ = শর্টেস্ট-পাথ ট্রি') }),
      'call'
    );
  }
  return steps;
}

/* ======================================================================== Floyd-Warshall */

export function weightMatrix(g) {
  const D = Array.from({ length: g.V }, (_, i) => Array.from({ length: g.V }, (_, j) => (i === j ? 0 : Infinity)));
  for (const e of g.edges) {
    D[e.u][e.v] = e.w;
    if (!g.directed) D[e.v][e.u] = e.w;
  }
  return D;
}

export function genFloyd(g) {
  const V = g.V;
  const steps = [];
  const D = weightMatrix(g);
  const lbl = Array.from({ length: V }, (_, i) => i);
  const frame = ({ k = null, i = null, j = null, hl = {}, statusText, label }) => {
    const nodeState = {};
    if (k != null) nodeState[k] = 'source';
    if (i != null) nodeState[i] = 'current';
    if (j != null) nodeState[j] = 'compare';
    const edgeState = {};
    if (i != null && k != null) {
      if (g.edges.some((e) => e.u === i && e.v === k)) edgeState[ek(i, k)] = 'compare';
      if (g.edges.some((e) => e.u === k && e.v === j)) edgeState[ek(k, j)] = 'compare';
    }
    return {
      ...base(g),
      nodeState,
      edgeState,
      panels: [{ type: 'matrix', label: label || T('D[i][j] — shortest known distance from i (row) to j (column)', 'D[i][j] — i (সারি) থেকে j (কলাম)-এর জানা সবচেয়ে ছোট দূরত্ব'), rows: lbl, cols: lbl, corner: 'i \\ j', cells: D.map((r) => r.map(fmt)), rowHl: k, colHl: k, hl }],
      status: statusText
    };
  };
  const push = (title, explanation, scene, line, state) => steps.push({ title, explanation, scene, line, ...(state ? { state } : {}) });

  push(
    T('Step 0: start with the weight matrix', 'ধাপ ০: ওজনের ম্যাট্রিক্স দিয়ে শুরু'),
    T(
      `Floyd-Warshall finds the shortest distance between **every pair** of vertices at once.\n\nIt starts with a table \`D\`: \`D[i][j]\` = weight of the direct arrow i → j, **0** on the diagonal (i to itself) and **∞** where there is no direct arrow. For example \`D[0][1] = ${fmt(D[0][1])}\` and \`D[0][2] = ${fmt(D[0][2])}\` (no arrow 0 → 2).`,
      `ফ্লয়েড-ওয়ার্শাল (Floyd-Warshall) একসঙ্গে **প্রতিটা জোড়া** ভার্টেক্সের সবচেয়ে ছোট দূরত্ব বের করে।\n\nশুরু একটা টেবিল \`D\` দিয়ে: \`D[i][j]\` = সরাসরি তীর i → j-এর ওজন, কোণাকুণি ঘরে **0** (নিজের কাছে নিজে) আর সরাসরি তীর না থাকলে **∞**। যেমন \`D[0][1] = ${fmt(D[0][1])}\` আর \`D[0][2] = ${fmt(D[0][2])}\` (0 → 2 কোনো তীর নেই)।`
    ),
    frame({ statusText: T('D = direct arrows only', 'D = শুধু সরাসরি তীর') }),
    ['build', 'call']
  );

  for (let k = 0; k < V; k++) {
    const changes = [];
    const before = D.map((r) => [...r]);
    for (let i = 0; i < V; i++) for (let j = 0; j < V; j++) if (before[i][k] + before[k][j] < D[i][j]) changes.push([i, j]);
    push(
      T(`k = ${k}: allow stops at vertex ${k}`, `k = ${k}: ভার্টেক্স ${k}-এ থামার অনুমতি`),
      T(
        `Now every route may **pass through vertex ${k}** on the way. For each cell we ask: is **i → ${k} → j** shorter than the best i → j we know?\n\nThe purple **row ${k}** and **column ${k}** never change in this round (going through ${k} to reach ${k} adds nothing). ${changes.length ? `This round improves **${changes.length}** cell${changes.length > 1 ? 's' : ''}.` : 'This round improves nothing.'}`,
        `এখন প্রতিটা রাস্তা পথে **ভার্টেক্স ${k} হয়ে** যেতে পারে। প্রতিটা ঘরে প্রশ্ন: **i → ${k} → j** কি জানা সেরা i → j-এর চেয়ে ছোট?\n\nবেগুনি **সারি ${k}** আর **কলাম ${k}** এই রাউন্ডে বদলায় না (${k}-এ যেতে ${k} হয়ে গেলে কিছু যোগ হয় না)। ${changes.length ? `এই রাউন্ডে **${changes.length}টা** ঘর উন্নত হয়।` : 'এই রাউন্ডে কিছুই উন্নত হয় না।'}`
      ),
      frame({ k, statusText: T(`k = ${k}`, `k = ${k}`) }),
      'kLoop',
      { k }
    );
    for (const [i, j] of changes) {
      const a = D[i][k];
      const b = D[k][j];
      const old = D[i][j];
      D[i][j] = a + b;
      push(
        T(`D[${i}][${j}]: ${fmt(old)} → ${a + b} via ${k}`, `D[${i}][${j}]: ${fmt(old)} → ${a + b}, ${k} হয়ে`),
        T(
          `Cell **i = ${i}, j = ${j}**: go ${i} → ${k} (\`D[${i}][${k}] = ${a}\`) then ${k} → ${j} (\`D[${k}][${j}] = ${b}\`): ${a} + ${b} = **${a + b}**.\n\n${a + b} < ${fmt(old)} → update \`D[${i}][${j}] = ${a + b}\`.${old === Infinity ? ` Before this we had **no way at all** from ${i} to ${j}!` : ''}`,
          `ঘর **i = ${i}, j = ${j}**: ${i} → ${k} (\`D[${i}][${k}] = ${a}\`), তারপর ${k} → ${j} (\`D[${k}][${j}] = ${b}\`): ${a} + ${b} = **${a + b}**।\n\n${a + b} < ${fmt(old)} → \`D[${i}][${j}] = ${a + b}\` আপডেট।${old === Infinity ? ` এর আগে ${i} থেকে ${j}-এ **কোনো পথই ছিল না**!` : ''}`
        ),
        frame({ k, i, j, hl: { [`${i},${k}`]: 'compare', [`${k},${j}`]: 'compare', [`${i},${j}`]: 'relax' }, statusText: T(`${a} + ${b} = ${a + b} < ${fmt(old)}`, `${a} + ${b} = ${a + b} < ${fmt(old)}`) }),
        ['iLoop', 'jLoop', 'ifShorter', 'update'],
        { k, i, j, 'D[i][k] + D[k][j]': a + b, 'D[i][j]': fmt(old) }
      );
    }
  }

  push(
    T('All-pairs shortest distances', 'সব জোড়ার সবচেয়ে ছোট দূরত্ব'),
    T(
      `After k = ${V - 1} the table holds the shortest distance for **every** pair. Read row 0: from vertex 0 you reach ${D[0].map((d, j) => `${j} in **${fmt(d)}**`).filter((_, j) => j !== 0).join(', ')}.${D.some((r, i) => r[i] < 0) ? '\n\n> **Careful:** a cell on the diagonal became **negative** — the graph has a **negative cycle**, so these numbers are not real shortest paths.' : ''}\n\n- **Idea (dynamic programming):** grow the set of allowed middle stops one vertex at a time.\n- **Cost:** three nested loops → **O(V³)** time, **O(V²)** memory. Works with negative edges (but not negative cycles).`,
      `k = ${V - 1}-এর পর টেবিলে **প্রতিটা** জোড়ার সবচেয়ে ছোট দূরত্ব। সারি 0 পড়ো: ভার্টেক্স 0 থেকে ${D[0].map((d, j) => `${j}-এ **${fmt(d)}**`).filter((_, j) => j !== 0).join(', ')}।${D.some((r, i) => r[i] < 0) ? '\n\n> **সাবধান:** কোণাকুণির একটা ঘর **নেগেটিভ** হয়ে গেছে — গ্রাফে **নেগেটিভ সাইকেল** আছে, তাই এই সংখ্যাগুলো আসল সবচেয়ে ছোট পথ নয়।' : ''}\n\n- **ধারণা (ডায়নামিক প্রোগ্রামিং):** মাঝপথে থামার অনুমোদিত ভার্টেক্স একটা একটা করে বাড়াও।\n- **খরচ:** তিনটা নেস্টেড লুপ → **O(V³)** সময়, **O(V²)** মেমরি। নেগেটিভ এজেও কাজ করে (নেগেটিভ সাইকেলে নয়)।`
    ),
    frame({ hl: Object.fromEntries(D.flatMap((r, i) => r.map((_, j) => [`${i},${j}`, 'done']))), statusText: T('final table', 'চূড়ান্ত টেবিল') }),
    'print'
  );
  return steps;
}

/* ======================================================================== Kahn */

export function genKahn(g, cycleDemo) {
  const adj = adjOf(g);
  const V = g.V;
  const steps = [];
  const indeg = Array(V).fill(0);
  for (const e of g.edges) indeg[e.v]++;
  const queue = [];
  const order = [];
  const removed = new Set(); // edges already "used"
  const frame = ({ cur = null, chk = null, iHl = {}, qHl = {}, statusText, showIn = true, fresh = false }) => {
    const nodeState = {};
    order.forEach((x) => { nodeState[x] = 'done'; });
    queue.forEach((x) => { nodeState[x] = 'frontier'; });
    if (cur != null) nodeState[cur] = 'current';
    if (chk) nodeState[chk.v] = indeg[chk.v] === 0 ? 'relax' : 'compare';
    const edgeState = {};
    const edgeFrom = {};
    for (const k of removed) edgeState[k] = 'dim';
    if (chk) { edgeState[ek(chk.u, chk.v)] = 'compare'; edgeFrom[ek(chk.u, chk.v)] = chk.u; }
    const subs = {};
    if (showIn) for (let i = 0; i < V; i++) subs[i] = `in ${indeg[i]}`;
    return {
      ...base(g),
      nodeState,
      edgeState,
      edgeFrom,
      subs,
      panels: [
        { type: 'array', label: T('indeg[ ] — arrows still pointing in', 'indeg[ ] — এখনো ঢোকা তীর'), cells: [...indeg], hl: iHl },
        { type: 'queue', label: T('queue — tasks free to do now', 'queue — এখনই করা যায় এমন কাজ'), items: [...queue], hl: qHl, empty: T('empty', 'খালি') },
        { type: 'output', label: T('order', 'ক্রম (order)'), items: [...order], fresh }
      ],
      status: statusText
    };
  };
  const push = (title, explanation, scene, line, state) => steps.push({ title, explanation, scene, line, ...(state ? { state } : {}) });

  push(
    T('Step 0: tasks with "before" arrows', 'ধাপ ০: "আগে" তীরসহ কাজ'),
    T(
      `Each vertex is a **task**. An arrow **u → v** means "**u must be done before v**" — like "buy rice → cook rice".\n\nA graph with arrows and **no cycle** is called a **DAG** (Directed Acyclic Graph). A **topological order** lists every task so that all arrows point **forward**.`,
      `প্রতিটা ভার্টেক্স একটা **কাজ**। তীর **u → v** মানে "**v-এর আগে u করতে হবে**" — যেমন "চাল কেনো → ভাত রান্না করো"।\n\nতীরওয়ালা আর **সাইকেল ছাড়া** গ্রাফকে বলে **DAG** (Directed Acyclic Graph)। **টপোলজিক্যাল অর্ডার** সব কাজ এমনভাবে সাজায় যাতে প্রতিটা তীর **সামনের দিকে** যায়।`
    ),
    { ...frame({ showIn: false, statusText: T(`${V} tasks, ${g.edges.length} arrows`, `${V}টা কাজ, ${g.edges.length}টা তীর`) }), panels: [adjPanel(g, { label: T('adjacency list: u → tasks that wait for u', 'অ্যাডজাসেন্সি লিস্ট: u → যেসব কাজ u-এর অপেক্ষায়') })] },
    'build'
  );
  push(
    T('Count incoming arrows (in-degree)', 'ঢোকা তীর গোনো (ইন-ডিগ্রি)'),
    T(
      `\`indeg[v]\` = how many arrows point **into** v = how many tasks v is **still waiting for**.\n\n${indeg.map((d, v) => `${v}: ${d}`).join(', ')}.\n\nA task with **in 0** waits for nothing — it can be done right now.`,
      `\`indeg[v]\` = v-এর **দিকে** কতগুলো তীর আসে = v **এখনো কতগুলো কাজের অপেক্ষায়**।\n\n${indeg.map((d, v) => `${v}: ${d}`).join(', ')}।\n\n**in 0** মানে কোনো কিছুর অপেক্ষা নেই — এখনই করা যায়।`
    ),
    frame({ iHl: Object.fromEntries(indeg.map((d, i) => [i, d === 0 ? 'relax' : ''])), statusText: T(`indeg = [${indeg.join(', ')}]`, `indeg = [${indeg.join(', ')}]`) }),
    ['call', 'header', 'indeg']
  );
  for (let v = 0; v < V; v++) if (indeg[v] === 0) queue.push(v);
  push(
    T(`Free tasks go in the queue: ${list(queue)}`, `মুক্ত কাজ queue-তে: ${list(queue)}`),
    T(
      `Every vertex with in-degree 0 joins the queue: **${list(queue)}**. These are the tasks we can start with.`,
      `ইন-ডিগ্রি 0 এমন প্রতিটা ভার্টেক্স queue-তে ঢুকল: **${list(queue)}**। এই কাজগুলো দিয়েই শুরু করা যায়।`
    ),
    frame({ qHl: Object.fromEntries(queue.map((_, i) => [i, 'relax'])), statusText: T(`queue = [${queue.join(', ')}]`, `queue = [${queue.join(', ')}]`) }),
    'initQ'
  );

  while (queue.length) {
    const u = queue.shift();
    order.push(u);
    push(
      T(`Do task ${u}`, `কাজ ${u} করো`),
      T(
        `Take **${u}** from the front of the queue and add it to the order: **${order.join(', ')}**.\n\n${u} is finished, so every task waiting for ${u} now waits for **one less** thing.${adj[u].length ? '' : ` (Nothing waits for ${u}.)`}`,
        `queue-এর সামনে থেকে **${u}** নাও আর ক্রমে যোগ করো: **${order.join(', ')}**।\n\n${u} শেষ, তাই ${u}-এর অপেক্ষায় থাকা প্রতিটা কাজের অপেক্ষা এখন **একটা কম**।${adj[u].length ? '' : ` (${u}-এর অপেক্ষায় কেউ নেই।)`}`
      ),
      frame({ cur: u, fresh: true, statusText: T(`order = [${order.join(', ')}]`, `order = [${order.join(', ')}]`) }),
      ['whileCheck', 'pop'],
      { u }
    );
    for (const { v } of adj[u]) {
      indeg[v]--;
      removed.add(ek(u, v));
      const zero = indeg[v] === 0;
      if (zero) queue.push(v);
      push(
        zero ? T(`Arrow ${u} → ${v}: ${v} is now free`, `তীর ${u} → ${v}: ${v} এখন মুক্ত`) : T(`Arrow ${u} → ${v}: ${v} still waits`, `তীর ${u} → ${v}: ${v} এখনো অপেক্ষায়`),
        zero
          ? T(
            `\`indeg[${v}]\` goes down to **0** — ${v} is not waiting for anything any more.\n\nPut **${v}** at the back of the queue.`,
            `\`indeg[${v}]\` কমে **0** — ${v} আর কোনো কিছুর অপেক্ষায় নেই।\n\n**${v}**-কে queue-এর পেছনে রাখো।`
          )
          : T(
            `\`indeg[${v}]\` goes down to **${indeg[v]}** — ${v} still waits for ${indeg[v]} more task${indeg[v] > 1 ? 's' : ''}, so it cannot join the queue yet.`,
            `\`indeg[${v}]\` কমে **${indeg[v]}** — ${v} এখনো আরও ${indeg[v]}টা কাজের অপেক্ষায়, তাই এখনো queue-তে ঢুকতে পারে না।`
          ),
        frame({ cur: u, chk: { u, v }, iHl: { [v]: zero ? 'relax' : 'compare' }, qHl: zero ? { [queue.length - 1]: 'relax' } : {}, statusText: T(`indeg[${v}] = ${indeg[v]}${zero ? ` → queue.push(${v})` : ''}`, `indeg[${v}] = ${indeg[v]}${zero ? ` → queue.push(${v})` : ''}`) }),
        zero ? ['forNbr', 'dec', 'ifZero', 'push'] : ['forNbr', 'dec', 'ifZero'],
        { u, v, 'indeg[v]': indeg[v] }
      );
    }
  }
  if (order.length === V) {
    push(
      T('Done: a valid order', 'শেষ: একটা সঠিক ক্রম'),
      T(
        `The queue is empty and the order has all **${order.length} = V** tasks, so there is **no cycle**.\n\nTopological order: **${order.join(' → ')}**. Check any arrow in the picture — it always points from an earlier task to a later one.`,
        `queue খালি আর ক্রমে **${order.length} = V**টা কাজই আছে, তাই **কোনো সাইকেল নেই**।\n\nটপোলজিক্যাল অর্ডার: **${order.join(' → ')}**। ছবির যেকোনো তীর দেখো — সবসময় আগের কাজ থেকে পরের কাজে যায়।`
      ),
      frame({ statusText: T(`order = ${order.join(' → ')}`, `order = ${order.join(' → ')}`) }),
      ['whileCheck', 'cycleCheck']
    );
  } else {
    const stuck = [];
    for (let v = 0; v < V; v++) if (!order.includes(v)) stuck.push(v);
    push(
      T('Stuck: the graph has a cycle', 'আটকে গেছি: গ্রাফে সাইকেল আছে'),
      T(
        `The queue is empty, but only **${order.length} of ${V}** tasks are in the order. Tasks **${stuck.join(', ')}** still wait for each other — each one has an arrow coming in from another stuck task.\n\nThat means they form a **cycle**, so **no** topological order exists. This is exactly how Kahn's algorithm detects a cycle.`,
        `queue খালি, কিন্তু ক্রমে **${V}টার মধ্যে মাত্র ${order.length}টা** কাজ। কাজ **${stuck.join(', ')}** এখনো একে অপরের অপেক্ষায় — প্রত্যেকটার দিকে আরেকটা আটকে থাকা কাজ থেকে তীর আসে।\n\nমানে এরা একটা **সাইকেল** বানায়, তাই **কোনো** টপোলজিক্যাল অর্ডার নেই। কান-এর অ্যালগরিদম ঠিক এভাবেই সাইকেল ধরে।`
      ),
      { ...frame({ statusText: T(`order.length = ${order.length} < V = ${V} → cycle!`, `order.length = ${order.length} < V = ${V} → সাইকেল!`) }), nodeState: Object.fromEntries([...order.map((x) => [x, 'done']), ...stuck.map((x) => [x, 'reject'])]) },
      ['whileCheck', 'cycleCheck']
    );
  }

  if (cycleDemo) {
    const cg = cycleDemo;
    push(
      T('What if there is a cycle?', 'সাইকেল থাকলে কী হয়?'),
      T(
        `Here 0 → 1 → 2 → 0 forms a **cycle**: each task waits for the next one, forever. Every vertex has in-degree **1**, so **no task is free** — the queue starts empty and the order stays empty.\n\nThat is exactly how Kahn's algorithm **detects a cycle**: \`order\` has fewer than V vertices. A topological order is **impossible**.`,
        `এখানে 0 → 1 → 2 → 0 একটা **সাইকেল**: প্রতিটা কাজ পরেরটার অপেক্ষায়, চিরকাল। প্রতিটা ভার্টেক্সের ইন-ডিগ্রি **1**, তাই **কোনো কাজই মুক্ত নয়** — queue শুরুতেই খালি, ক্রমও খালি।\n\nকান-এর অ্যালগরিদম ঠিক এভাবেই **সাইকেল ধরে**: \`order\`-এ V-এর কম ভার্টেক্স। টপোলজিক্যাল অর্ডার **অসম্ভব**।`
      ),
      {
        ...base(cg),
        nodeState: { 0: 'reject', 1: 'reject', 2: 'reject' },
        edgeState: { '0-1': 'reject', '1-2': 'reject', '2-0': 'reject' },
        subs: { 0: 'in 1', 1: 'in 1', 2: 'in 1' },
        panels: [
          { type: 'queue', label: T('queue', 'queue'), items: [], empty: T('empty — nobody is free', 'খালি — কেউ মুক্ত নয়') },
          { type: 'output', label: T('order', 'ক্রম (order)'), items: [] }
        ],
        status: T('order.length = 0 < V = 3 → cycle!', 'order.length = 0 < V = 3 → সাইকেল!')
      },
      'cycleCheck'
    );
  }
  push(
    T('What we learned', 'কী শিখলাম'),
    T(
      `- **Kahn's algorithm** = BFS on in-degrees: keep doing tasks that wait for nothing.\n- A task enters the queue the moment its last prerequisite is done.\n- If some tasks never become free, the graph has a **cycle**.\n- **Cost:** every vertex and every arrow is handled once → **O(V + E)** time, **O(V)** memory.\n\nUsed for course schedules, build systems (compile files in the right order) and spreadsheets.`,
      `- **কান-এর অ্যালগরিদম** = ইন-ডিগ্রির ওপর BFS: যে কাজ কিছুর অপেক্ষায় নেই, সেটা করতে থাকো।\n- শেষ পূর্বশর্তটা শেষ হলেই একটা কাজ queue-তে ঢোকে।\n- কিছু কাজ কখনো মুক্ত না হলে গ্রাফে **সাইকেল** আছে।\n- **খরচ:** প্রতিটা ভার্টেক্স আর প্রতিটা তীর একবার → **O(V + E)** সময়, **O(V)** মেমরি।\n\nকোর্সের সময়সূচি, বিল্ড সিস্টেম (ফাইল সঠিক ক্রমে কম্পাইল) আর স্প্রেডশিটে ব্যবহার হয়।`
    ),
    frame({ statusText: T(`order = ${order.join(' → ')}`, `order = ${order.join(' → ')}`) }),
    'call'
  );
  return steps;
}

/* ======================================================================== Topological sort (DFS) */

function kahnOrder(g) {
  const adj = adjOf(g);
  const indeg = Array(g.V).fill(0);
  for (const e of g.edges) indeg[e.v]++;
  const q = [];
  for (let v = 0; v < g.V; v++) if (indeg[v] === 0) q.push(v);
  const out = [];
  while (q.length) {
    const u = q.shift();
    out.push(u);
    for (const { v } of adj[u]) if (--indeg[v] === 0) q.push(v);
  }
  return out;
}

export function genTopoDFS(g) {
  const adj = adjOf(g);
  const V = g.V;
  const steps = [];
  const visited = Array(V).fill(false);
  const finished = [];
  const call = [];
  const frame = ({ chk = null, chkKind = '', sHl = {}, rHl = {}, statusText, top = null }) => {
    const nodeState = {};
    finished.forEach((x) => { nodeState[x] = 'done'; });
    call.forEach((x) => { nodeState[x] = 'frontier'; });
    if (call.length) nodeState[call[call.length - 1]] = 'current';
    if (top != null) nodeState[top] = nodeState[top] || 'compare';
    const edgeState = {};
    const edgeFrom = {};
    if (chk) { edgeState[ek(chk.u, chk.v)] = chkKind === 'new' ? 'relax' : 'reject'; edgeFrom[ek(chk.u, chk.v)] = chk.u; }
    return {
      ...base(g),
      nodeState,
      edgeState,
      edgeFrom,
      panels: [
        { type: 'stack', label: T('call stack', 'কল স্ট্যাক'), items: call.map((x) => `dfs(${x})`), hl: sHl, empty: T('empty', 'খালি') },
        { type: 'stack', label: T('result stack (finished vertices)', 'রেজাল্ট স্ট্যাক (শেষ হওয়া ভার্টেক্স)'), items: [...finished], hl: rHl, empty: T('empty', 'খালি') },
        { type: 'array', label: T('visited[ ]', 'visited[ ]'), cells: visited.map((b) => (b ? 'T' : 'F')) }
      ],
      status: statusText
    };
  };
  const push = (title, explanation, scene, line, state) => steps.push({ title, explanation, scene, line, ...(state ? { state } : {}) });

  push(
    T('Step 0: the same tasks, another method', 'ধাপ ০: একই কাজ, অন্য পদ্ধতি'),
    T(
      `Each arrow u → v means "u before v". This time we find an order with **DFS**.\n\nThe key idea: a vertex is **finished** only after **everything it points to** is finished. So if we push each vertex onto a stack the moment it finishes, the stack read **from the top** is a valid order — every task comes before the tasks that wait for it.`,
      `প্রতিটা তীর u → v মানে "v-এর আগে u"। এবার **DFS** দিয়ে ক্রম বের করব।\n\nমূল ধারণা: একটা ভার্টেক্স **শেষ** হয় কেবল তখন, যখন সে **যেগুলোর দিকে তীর দেয়** সেগুলো সব শেষ। তাই শেষ হওয়ার সঙ্গে সঙ্গে প্রতিটা ভার্টেক্স একটা স্ট্যাকে রাখলে, স্ট্যাকটা **ওপর থেকে** পড়লেই সঠিক ক্রম — প্রতিটা কাজ তার অপেক্ষায় থাকা কাজগুলোর আগে আসে।`
    ),
    { ...frame({ statusText: T(`${V} tasks, ${g.edges.length} arrows`, `${V}টা কাজ, ${g.edges.length}টা তীর`) }), panels: [adjPanel(g)] },
    'build'
  );
  push(
    T('main() calls topoSort(adj)', 'main() কল করে topoSort(adj)'),
    T(
      `\`visited\` starts all false, both stacks are empty. We will try every vertex **0, 1, 2 …** as a starting point, because a DAG can have several separate parts.`,
      `\`visited\` শুরুতে সব false, দুটো স্ট্যাকই খালি। আমরা প্রতিটা ভার্টেক্স **0, 1, 2 …** শুরু হিসেবে চেষ্টা করব, কারণ একটা DAG-এর কয়েকটা আলাদা অংশ থাকতে পারে।`
    ),
    frame({ statusText: T('topoSort(adj)', 'topoSort(adj)') }),
    ['call', 'topoHeader']
  );

  const dfs = (u, from) => {
    visited[u] = true;
    call.push(u);
    push(
      T(`Enter dfs(${u})`, `dfs(${u})-এ ঢোকা`),
      T(
        `Mark ${u} visited. ${from != null ? `dfs(${from}) waits below on the call stack.` : 'This is a new starting point.'}\n\nNow check every task that waits for ${u}: ${adj[u].length ? list(adj[u].map((x) => x.v)) : 'none'}.`,
        `${u}-কে visited করো। ${from != null ? `dfs(${from}) নিচে কল স্ট্যাকে অপেক্ষায়।` : 'এটা নতুন একটা শুরু।'}\n\nএবার ${u}-এর অপেক্ষায় থাকা প্রতিটা কাজ দেখো: ${adj[u].length ? list(adj[u].map((x) => x.v)) : 'কেউ নেই'}।`
      ),
      frame({ sHl: { [call.length - 1]: 'relax' }, statusText: T(`dfs(${u})`, `dfs(${u})`) }),
      ['header', 'mark'],
      { u }
    );
    for (const { v } of adj[u]) {
      if (!visited[v]) {
        push(
          T(`${u} → ${v}: not visited → go deeper`, `${u} → ${v}: visited না → আরও গভীরে`),
          T(
            `Arrow **${u} → ${v}**: ${v} is not visited yet. Before ${u} can finish, ${v} must finish — call \`dfs(${v})\`.`,
            `তীর **${u} → ${v}**: ${v} এখনো visited না। ${u} শেষ হওয়ার আগে ${v}-কে শেষ হতে হবে — \`dfs(${v})\` কল করো।`
          ),
          frame({ chk: { u, v }, chkKind: 'new', statusText: T(`call dfs(${v})`, `dfs(${v}) কল`) }),
          ['forNbr', 'ifNot', 'recurse'],
          { u, v }
        );
        dfs(v, u);
      } else {
        push(
          T(`${u} → ${v}: already visited`, `${u} → ${v}: আগেই visited`),
          T(
            `Arrow **${u} → ${v}**: ${v} is already visited${finished.includes(v) ? ' and **finished** — it is already in the result stack, below where ' + u + ' will go' : ''}. Nothing to do.`,
            `তীর **${u} → ${v}**: ${v} আগেই visited${finished.includes(v) ? ` আর **শেষ** — এটা আগেই রেজাল্ট স্ট্যাকে, ${u} যেখানে যাবে তার নিচে` : ''}। কিছু করার নেই।`
          ),
          frame({ chk: { u, v }, chkKind: 'skip', statusText: T(`${v} visited → skip`, `${v} visited → বাদ`) }),
          ['forNbr', 'ifNot'],
          { u, v }
        );
      }
    }
    call.pop();
    finished.push(u);
    push(
      T(`${u} is finished → push ${u}`, `${u} শেষ → ${u} push`),
      T(
        `Everything that waits for ${u} is already in the result stack, so ${u} is **finished**. Push **${u}** on top.\n\nResult stack (top first): **${[...finished].reverse().join(', ')}**`,
        `${u}-এর অপেক্ষায় থাকা সবকিছু আগেই রেজাল্ট স্ট্যাকে, তাই ${u} **শেষ**। **${u}**-কে ওপরে push করো।\n\nরেজাল্ট স্ট্যাক (ওপর থেকে): **${[...finished].reverse().join(', ')}**`
      ),
      frame({ rHl: { [finished.length - 1]: 'relax' }, statusText: T(`stack.push(${u})`, `stack.push(${u})`) }),
      'pushStack',
      { u }
    );
  };

  for (let u = 0; u < V; u++) {
    if (visited[u]) {
      push(
        T(`Vertex ${u}: already visited`, `ভার্টেক্স ${u}: আগেই visited`),
        T(
          `The main loop reaches **${u}**, but it was already visited during an earlier DFS. Skip it.`,
          `মূল লুপ **${u}**-এ পৌঁছাল, কিন্তু আগের একটা DFS-এর সময় এটা আগেই visited। বাদ দাও।`
        ),
        frame({ top: u, statusText: T(`visited[${u}] = T → skip`, `visited[${u}] = T → বাদ`) }),
        ['forAll', 'ifStart'],
        { u }
      );
    } else {
      push(
        T(`Vertex ${u}: start a DFS`, `ভার্টেক্স ${u}: DFS শুরু`),
        T(
          `The main loop reaches **${u}**. It is not visited yet, so start \`dfs(${u})\`.`,
          `মূল লুপ **${u}**-এ পৌঁছাল। এটা এখনো visited না, তাই \`dfs(${u})\` শুরু করো।`
        ),
        frame({ top: u, statusText: T(`visited[${u}] = F → dfs(${u})`, `visited[${u}] = F → dfs(${u})`) }),
        ['forAll', 'ifStart', 'start'],
        { u }
      );
      dfs(u, null);
    }
  }
  const order = [...finished].reverse();
  const kahn = kahnOrder(g).join(' → ');
  push(
    T(`Pop the stack: ${order.join(' → ')}`, `স্ট্যাক pop: ${order.join(' → ')}`),
    T(
      `Pop everything from the result stack (top first): **${order.join(' → ')}**.\n\nThis is a valid topological order. It differs from Kahn's (${kahn}) — a DAG often has **many** correct orders.\n\n> **Cost:** plain DFS → **O(V + E)**.`,
      `রেজাল্ট স্ট্যাক থেকে সব pop করো (ওপর থেকে): **${order.join(' → ')}**।\n\nএটা একটা সঠিক টপোলজিক্যাল অর্ডার। কান-এরটা (${kahn}) থেকে আলাদা — একটা DAG-এর প্রায়ই **অনেকগুলো** সঠিক ক্রম থাকে।\n\n> **খরচ:** সাধারণ DFS → **O(V + E)**।`
    ),
    frame({ rHl: Object.fromEntries(finished.map((_, i) => [i, 'done'])), statusText: T(`order = ${order.join(' → ')}`, `order = ${order.join(' → ')}`) }),
    'popAll'
  );
  return steps;
}

