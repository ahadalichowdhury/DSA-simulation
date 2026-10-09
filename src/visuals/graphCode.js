/**
 * Code shown in the Graphs chapter: plain pseudocode plus real JavaScript,
 * Java, Python and C++ programs built for the lesson's own example graph.
 *
 * Every line the animation can point at carries a tag (`@pop`, `@ifNot` …);
 * see codeTags.js. A comment directly above a tagged line uses the same tag,
 * so it lights up together with its line.
 */
import { program } from './codeTags.js';
import { edgeRows } from './graphData.js';

const TEXT = {
  m_main: ['MAIN', 'MAIN (মূল অংশ)'],
  m_build: ['Build the example graph as an adjacency list', 'উদাহরণের গ্রাফটা অ্যাডজাসেন্সি লিস্ট হিসেবে বানাও'],
  m_buildE: ['The example graph as a list of edges', 'উদাহরণের গ্রাফ — এজের তালিকা হিসেবে'],
  m_V: ['vertices:', 'ভার্টেক্স:'],
  m_E: ['edges:', 'এজ:'],

  // BFS
  b_p0: ['BFS(graph, start)', 'BFS(graph, start)'],
  b_p1: ['visited = all false, queue = empty', 'visited = সব false, queue = খালি'],
  b_p2: ['mark start as visited, put start in the queue', 'start-কে visited করো, queue-তে রাখো'],
  b_p3: ['while the queue is not empty:', 'যতক্ষণ queue খালি না:'],
  b_p4: ['    u = take the vertex at the FRONT of the queue', '    u = queue-এর সামনে থেকে একটা ভার্টেক্স বের করো'],
  b_p5: ['    print u', '    u প্রিন্ট করো'],
  b_p6: ['    for each neighbour v of u:', '    u-এর প্রতিটা প্রতিবেশী v-এর জন্য:'],
  b_p7: ['        if v is not visited yet:', '        v এখনো visited না হলে:'],
  b_p8: ['            mark v as visited', '            v-কে visited করো'],
  b_p9: ['            put v at the BACK of the queue', '            v-কে queue-এর পেছনে রাখো'],
  b_c1: ['1. Start: mark the start vertex and put it in the queue', '১. শুরু: শুরুর ভার্টেক্স চিহ্নিত করে queue-তে রাখো'],
  b_c2: ['2. Take the vertex at the front of the line', '২. লাইনের সামনের ভার্টেক্সটা নাও'],
  b_c3: ['3. Look at every neighbour; new ones join the back of the line', '৩. প্রতিটা প্রতিবেশী দেখো; নতুনগুলো লাইনের পেছনে যোগ দেয়'],

  // DFS
  d_p0: ['DFS(u)', 'DFS(u)'],
  d_p1: ['mark u as visited', 'u-কে visited করো'],
  d_p2: ['print u', 'u প্রিন্ট করো'],
  d_p3: ['for each neighbour v of u:', 'u-এর প্রতিটা প্রতিবেশী v-এর জন্য:'],
  d_p4: ['    if v is not visited yet:', '    v এখনো visited না হলে:'],
  d_p5: ['        DFS(v)      ← go deeper first', '        DFS(v)      ← আগে আরও গভীরে যাও'],
  d_p6: ['all neighbours done → go back (backtrack)', 'সব প্রতিবেশী শেষ → ফিরে যাও (ব্যাকট্র্যাক)'],
  d_c1: ['1. Arrive at u: mark it so we never come here again', '১. u-তে পৌঁছালাম: চিহ্ন দাও যাতে আর না আসি'],
  d_c2: ['2. Go into the first unvisited neighbour right away', '২. প্রথম না-দেখা প্রতিবেশীর ভেতরে সঙ্গে সঙ্গে ঢুকে যাও'],
  d_c3: ['3. Nothing new left here → return to the caller', '৩. এখানে নতুন কিছু নেই → যে ডেকেছিল তার কাছে ফেরো'],

  // Dijkstra
  j_p0: ['DIJKSTRA(graph, src)', 'DIJKSTRA(graph, src)'],
  j_p1: ['dist = all ∞, dist[src] = 0, done = all false', 'dist = সব ∞, dist[src] = 0, done = সব false'],
  j_p2: ['repeat V times:', 'V বার করো:'],
  j_p3: ['    u = the NOT-done vertex with the smallest dist', '    u = done-না এমন ভার্টেক্সের মধ্যে সবচেয়ে ছোট dist'],
  j_p4: ['    mark u as done (its distance is now final)', '    u-কে done করো (এর দূরত্ব এখন চূড়ান্ত)'],
  j_p5: ['    for each neighbour v of u, with edge weight w:', '    u-এর প্রতিটা প্রতিবেশী v, এজের ওজন w:'],
  j_p6: ['        if v not done and dist[u] + w < dist[v]:', '        v done না এবং dist[u] + w < dist[v] হলে:'],
  j_p7: ['            dist[v] = dist[u] + w      ← relax', '            dist[v] = dist[u] + w      ← রিল্যাক্স'],
  j_p8: ['print dist', 'dist প্রিন্ট করো'],
  j_c1: ['1. Pick the closest vertex we have not finished', '১. যেটা শেষ হয়নি তার মধ্যে সবচেয়ে কাছেরটা বাছো'],
  j_c2: ['2. Relax: is going through u a shorter way to v?', '২. রিল্যাক্স: u হয়ে গেলে কি v-তে যাওয়া ছোট হয়?'],

  // Prim
  p_p0: ['PRIM(graph)', 'PRIM(graph)'],
  p_p1: ['key = all ∞, key[0] = 0, parent[0] = none, inTree = all false', 'key = সব ∞, key[0] = 0, parent[0] = নেই, inTree = সব false'],
  p_p2: ['repeat V times:', 'V বার করো:'],
  p_p3: ['    u = the vertex NOT in the tree with the smallest key', '    u = ট্রিতে নেই এমন ভার্টেক্সের মধ্যে সবচেয়ে ছোট key'],
  p_p4: ['    put u in the tree (edge parent[u] – u joins the MST)', '    u-কে ট্রিতে নাও (এজ parent[u] – u MST-তে ঢোকে)'],
  p_p5: ['    for each neighbour v of u, with edge weight w:', '    u-এর প্রতিটা প্রতিবেশী v, এজের ওজন w:'],
  p_p6: ['        if v not in tree and w < key[v]:', '        v ট্রিতে নেই এবং w < key[v] হলে:'],
  p_p7: ['            key[v] = w, parent[v] = u', '            key[v] = w, parent[v] = u'],
  p_p8: ['print the edges parent[v] – v', 'এজগুলো parent[v] – v প্রিন্ট করো'],
  p_c1: ['1. Pick the cheapest vertex that can join the tree', '১. ট্রিতে যোগ দিতে পারে এমন সবচেয়ে সস্তা ভার্টেক্স বাছো'],
  p_c2: ['2. Can v join more cheaply through u?', '২. v কি u হয়ে আরও সস্তায় যোগ দিতে পারে?'],

  // Kruskal
  k_p0: ['FIND(x)      ← who is the leader of x\'s group?', 'FIND(x)      ← x-এর দলের লিডার কে?'],
  k_p1: ['while parent[x] != x: x = parent[x]', 'যতক্ষণ parent[x] != x: x = parent[x]'],
  k_p2: ['return x', 'x ফেরত দাও'],
  k_p3: ['KRUSKAL(edges, V)', 'KRUSKAL(edges, V)'],
  k_p4: ['sort the edges by weight, smallest first', 'এজগুলো ওজন অনুযায়ী সাজাও, ছোট আগে'],
  k_p5: ['parent[i] = i for every vertex (everyone is alone)', 'প্রতিটা ভার্টেক্সে parent[i] = i (সবাই একা)'],
  k_p6: ['for each edge (u, v, w) in sorted order:', 'সাজানো ক্রমে প্রতিটা এজ (u, v, w)-এর জন্য:'],
  k_p7: ['    ru = FIND(u), rv = FIND(v)', '    ru = FIND(u), rv = FIND(v)'],
  k_p8: ['    if ru != rv:            ← different groups?', '    ru != rv হলে:           ← আলাদা দল?'],
  k_p9: ['        take the edge, total += w', '        এজটা নাও, total += w'],
  k_p10: ['        parent[ru] = rv     ← join the two groups', '        parent[ru] = rv     ← দুই দল এক করো'],
  k_p11: ['    else: skip it — it would close a cycle', '    নইলে: বাদ দাও — এটা সাইকেল বানাবে'],
  k_p12: ['print total', 'total প্রিন্ট করো'],
  k_c1: ['Follow parent links up to the group leader', 'parent লিংক ধরে দলের লিডার পর্যন্ত যাও'],
  k_c2: ['1. Cheapest edges first', '১. সবচেয়ে সস্তা এজ আগে'],
  k_c3: ['2. Different leaders = different groups = no cycle', '২. আলাদা লিডার = আলাদা দল = সাইকেল নেই'],

  // Bellman-Ford
  f_p0: ['BELLMAN-FORD(edges, V, src)', 'BELLMAN-FORD(edges, V, src)'],
  f_p1: ['dist = all ∞, dist[src] = 0', 'dist = সব ∞, dist[src] = 0'],
  f_p2: ['repeat V − 1 times (one "pass" each time):', 'V − 1 বার করো (প্রতিবার একটা "পাস"):'],
  f_p3: ['    for each edge (u, v, w):', '    প্রতিটা এজ (u, v, w)-এর জন্য:'],
  f_p4: ['        if dist[u] != ∞ and dist[u] + w < dist[v]:', '        dist[u] != ∞ এবং dist[u] + w < dist[v] হলে:'],
  f_p5: ['            dist[v] = dist[u] + w      ← relax', '            dist[v] = dist[u] + w      ← রিল্যাক্স'],
  f_p6: ['    if nothing changed in this pass: stop early', '    এই পাসে কিছু না বদলালে: আগেই থামো'],
  f_p7: ['one more check over every edge (u, v, w):', 'সব এজ (u, v, w) আরেকবার যাচাই:'],
  f_p8: ['    if dist[u] + w < dist[v]: NEGATIVE CYCLE!', '    dist[u] + w < dist[v] হলে: নেগেটিভ সাইকেল!'],
  f_c1: ['1. Relax EVERY edge, again and again', '১. প্রতিটা এজ রিল্যাক্স করো, বারবার'],
  f_c2: ['2. Still improving after V − 1 passes? → negative cycle', '২. V − 1 পাসের পরও কমছে? → নেগেটিভ সাইকেল'],

  // Floyd-Warshall
  w_p0: ['FLOYD-WARSHALL(D)      ← D starts as the weight matrix', 'FLOYD-WARSHALL(D)      ← D শুরুতে ওজনের ম্যাট্রিক্স'],
  w_p1: ['for k = 0 to V − 1:          ← allow k as a stop on the way', 'k = 0 থেকে V − 1:          ← পথে k-তে থামার অনুমতি'],
  w_p2: ['    for i = 0 to V − 1:', '    i = 0 থেকে V − 1:'],
  w_p3: ['        for j = 0 to V − 1:', '        j = 0 থেকে V − 1:'],
  w_p4: ['            if D[i][k] + D[k][j] < D[i][j]:', '            D[i][k] + D[k][j] < D[i][j] হলে:'],
  w_p5: ['                D[i][j] = D[i][k] + D[k][j]', '                D[i][j] = D[i][k] + D[k][j]'],
  w_p6: ['print D', 'D প্রিন্ট করো'],
  w_c1: ['Is "i → k → j" shorter than the best i → j so far?', '"i → k → j" কি এখন পর্যন্ত সেরা i → j-এর চেয়ে ছোট?'],

  // Kahn
  n_p0: ['KAHN(graph)', 'KAHN(graph)'],
  n_p1: ['indeg[v] = how many arrows point INTO v', 'indeg[v] = v-এর দিকে কতগুলো তীর আসে'],
  n_p2: ['queue = every vertex with indeg 0', 'queue = indeg 0 এমন সব ভার্টেক্স'],
  n_p3: ['while the queue is not empty:', 'যতক্ষণ queue খালি না:'],
  n_p4: ['    u = take the front of the queue, add u to the order', '    u = queue-এর সামনে থেকে নাও, order-এ যোগ করো'],
  n_p5: ['    for each arrow u → v:', '    প্রতিটা তীর u → v-এর জন্য:'],
  n_p6: ['        indeg[v] = indeg[v] − 1      ← u is done, one less to wait for', '        indeg[v] = indeg[v] − 1      ← u শেষ, অপেক্ষা একটা কমল'],
  n_p7: ['        if indeg[v] == 0:', '        indeg[v] == 0 হলে:'],
  n_p8: ['            put v in the queue', '            v-কে queue-তে রাখো'],
  n_p9: ['if order has fewer than V vertices: the graph has a cycle', 'order-এ V-এর কম ভার্টেক্স থাকলে: গ্রাফে সাইকেল আছে'],
  n_c1: ['1. Count incoming arrows', '১. ঢোকা তীর গোনো'],
  n_c2: ['2. Free tasks (nothing to wait for) go first', '২. মুক্ত কাজ (কিছুর অপেক্ষা নেই) আগে যায়'],

  // Topological sort with DFS
  t_p0: ['DFS(u)', 'DFS(u)'],
  t_p1: ['mark u as visited', 'u-কে visited করো'],
  t_p2: ['for each arrow u → v:', 'প্রতিটা তীর u → v-এর জন্য:'],
  t_p3: ['    if v is not visited:', '    v visited না হলে:'],
  t_p4: ['        DFS(v)', '        DFS(v)'],
  t_p5: ['push u on the stack      ← u is finished', 'u-কে stack-এ push করো      ← u শেষ'],
  t_p6: ['TOPO-SORT(graph)', 'TOPO-SORT(graph)'],
  t_p7: ['for each vertex u = 0, 1, 2 …:', 'প্রতিটা ভার্টেক্স u = 0, 1, 2 …:'],
  t_p8: ['    if u is not visited:', '    u visited না হলে:'],
  t_p9: ['        DFS(u)', '        DFS(u)'],
  t_p10: ['pop everything from the stack → that is the order', 'stack থেকে সব pop করো → এটাই ক্রম'],
  t_c1: ['A vertex is pushed only after everything it points to', 'একটা ভার্টেক্স push হয় তার সব গন্তব্যের পরে']
};

/* ---------------------------------------------------------------- main() */

/** Lines that build the example graph. store: 'adj' | 'edges'. */
function buildLines(lang, g, store) {
  const rows = edgeRows(g, lang);
  const W = g.weighted;
  const both = !g.directed;
  const tag = '  @build';
  const L = [];
  const push = (s) => L.push(`${s}${tag}`);
  if (lang === 'pseudo') {
    push(`{{m_V}} 0 … ${g.V - 1}`);
    const list = g.edges.map((e) => `${e.u}${g.directed ? '→' : '–'}${e.v}${W ? `(${e.w})` : ''}`);
    for (let i = 0; i < list.length; i += 5) push(`${i === 0 ? '{{m_E}} ' : '       '}${list.slice(i, i + 5).join(', ')}`);
    return L;
  }
  if (lang === 'js') {
    L.push(`// {{${store === 'adj' ? 'm_build' : 'm_buildE'}}}${tag}`);
    push(`const V = ${g.V};`);
    push('const edges = [');
    rows.forEach((r, i) => push(`    ${r}${i < rows.length - 1 ? ',' : ''}`));
    push('];');
    if (store === 'adj') {
      push('const adj = Array.from({ length: V }, () => []);');
      push(`for (const [u, v${W ? ', w' : ''}] of edges) {`);
      push(`    adj[u].push(${W ? '[v, w]' : 'v'});`);
      if (both) push(`    adj[v].push(${W ? '[u, w]' : 'u'});`);
      push('}');
    }
    return L;
  }
  if (lang === 'python') {
    L.push(`# {{${store === 'adj' ? 'm_build' : 'm_buildE'}}}${tag}`);
    push(`V = ${g.V}`);
    push('edges = [');
    rows.forEach((r, i) => push(`    ${r}${i < rows.length - 1 ? ',' : ''}`));
    push(']');
    if (store === 'adj') {
      push('adj = [[] for _ in range(V)]');
      push(`for u, v${W ? ', w' : ''} in edges:`);
      push(`    adj[u].append(${W ? '(v, w)' : 'v'})`);
      if (both) push(`    adj[v].append(${W ? '(u, w)' : 'u'})`);
    }
    return L;
  }
  if (lang === 'java') {
    L.push(`// {{${store === 'adj' ? 'm_build' : 'm_buildE'}}}${tag}`);
    push(`int V = ${g.V};`);
    push('int[][] edges = {');
    rows.forEach((r, i) => push(`    ${r}${i < rows.length - 1 ? ',' : ''}`));
    push('};');
    if (store === 'adj') {
      const T = W ? 'int[]' : 'Integer';
      push(`List<List<${T}>> adj = new ArrayList<>();`);
      push('for (int i = 0; i < V; i++) adj.add(new ArrayList<>());');
      push('for (int[] e : edges) {');
      push(`    adj.get(e[0]).add(${W ? 'new int[]{e[1], e[2]}' : 'e[1]'});`);
      if (both) push(`    adj.get(e[1]).add(${W ? 'new int[]{e[0], e[2]}' : 'e[0]'});`);
      push('}');
    }
    return L;
  }
  // cpp
  L.push(`// {{${store === 'adj' ? 'm_build' : 'm_buildE'}}}${tag}`);
  push(`int V = ${g.V};`);
  push('vector<vector<int>> edges = {');
  rows.forEach((r, i) => push(`    ${r}${i < rows.length - 1 ? ',' : ''}`));
  push('};');
  if (store === 'adj') {
    push(`vector<vector<${W ? 'pair<int, int>' : 'int'}>> adj(V);`);
    push('for (auto& e : edges) {');
    push(`    adj[e[0]].push_back(${W ? '{e[1], e[2]}' : 'e[1]'});`);
    if (both) push(`    adj[e[1]].push_back(${W ? '{e[0], e[2]}' : 'e[0]'});`);
    push('}');
  }
  return L;
}

/** Glue functions + main() into a whole program for one language. */
function assemble(lang, { fns, main, imports }) {
  const ind = (s, n) => s.split('\n').map((l) => (l.trim() ? ' '.repeat(n) + l : l)).join('\n');
  const mainBody = main.join('\n');
  if (lang === 'pseudo') return `${fns.join('\n\n')}\n\n{{m_main}}\n${ind(mainBody, 4)}`;
  if (lang === 'js') return `${fns.join('\n\n')}\n\n${mainBody}`;
  if (lang === 'python') return `${imports ? `${imports}\n\n\n` : ''}${fns.join('\n\n\n')}\n\n\n${mainBody}`;
  if (lang === 'java') {
    return `import java.util.*;\n\npublic class Main {\n\n${fns.map((f) => ind(f, 4)).join('\n\n')}\n\n    public static void main(String[] args) {\n${ind(mainBody, 8)}\n    }\n}`;
  }
  return `${imports}\nusing namespace std;\n\n${fns.join('\n\n')}\n\nint main() {\n${ind(`${mainBody}\nreturn 0;`, 4)}\n}`;
}

function build(g, store, parts) {
  const sources = {};
  for (const lang of ['pseudo', 'js', 'java', 'python', 'cpp']) {
    const p = parts[lang];
    sources[lang] = assemble(lang, { fns: p.fns, imports: p.imports, main: [...buildLines(lang, g, store), ...p.main] });
  }
  return program(sources, TEXT);
}

/* ---------------------------------------------------------------- BFS */

export function bfsProgram(g, start) {
  return build(g, 'adj', {
    pseudo: {
      fns: [`{{b_p0}}  @header
    {{b_p1}}  @init
    {{b_p2}}  @init
    {{b_p3}}  @whileCheck
    {{b_p4}}  @pop
    {{b_p5}}  @visit
    {{b_p6}}  @forNbr
    {{b_p7}}  @ifNot
    {{b_p8}}  @mark
    {{b_p9}}  @push`],
      main: [`BFS(graph, ${start})  @call`]
    },
    js: {
      fns: [`function bfs(adj, start) {  @header
    // {{b_c1}}  @init
    const visited = new Array(adj.length).fill(false);  @init
    const queue = [start];  @init
    visited[start] = true;  @init

    while (queue.length > 0) {  @whileCheck
        // {{b_c2}}  @pop
        const u = queue.shift();  @pop
        console.log(u);  @visit

        // {{b_c3}}  @forNbr
        for (const v of adj[u]) {  @forNbr
            if (!visited[v]) {  @ifNot
                visited[v] = true;  @mark
                queue.push(v);  @push
            }
        }
    }
}`],
      main: [`bfs(adj, ${start});  @call`]
    },
    java: {
      fns: [`static void bfs(List<List<Integer>> adj, int start) {  @header
    // {{b_c1}}  @init
    boolean[] visited = new boolean[adj.size()];  @init
    Queue<Integer> queue = new LinkedList<>();  @init
    visited[start] = true;  @init
    queue.add(start);  @init

    while (!queue.isEmpty()) {  @whileCheck
        // {{b_c2}}  @pop
        int u = queue.poll();  @pop
        System.out.print(u + " ");  @visit

        // {{b_c3}}  @forNbr
        for (int v : adj.get(u)) {  @forNbr
            if (!visited[v]) {  @ifNot
                visited[v] = true;  @mark
                queue.add(v);  @push
            }
        }
    }
}`],
      main: [`bfs(adj, ${start});  @call`]
    },
    python: {
      imports: 'from collections import deque',
      fns: [`def bfs(adj, start):  @header
    # {{b_c1}}  @init
    visited = [False] * len(adj)  @init
    queue = deque([start])  @init
    visited[start] = True  @init

    while queue:  @whileCheck
        # {{b_c2}}  @pop
        u = queue.popleft()  @pop
        print(u, end=" ")  @visit

        # {{b_c3}}  @forNbr
        for v in adj[u]:  @forNbr
            if not visited[v]:  @ifNot
                visited[v] = True  @mark
                queue.append(v)  @push`],
      main: [`bfs(adj, ${start})  @call`]
    },
    cpp: {
      imports: '#include <iostream>\n#include <vector>\n#include <queue>',
      fns: [`void bfs(vector<vector<int>>& adj, int start) {  @header
    // {{b_c1}}  @init
    vector<bool> visited(adj.size(), false);  @init
    queue<int> q;  @init
    visited[start] = true;  @init
    q.push(start);  @init

    while (!q.empty()) {  @whileCheck
        // {{b_c2}}  @pop
        int u = q.front();  @pop
        q.pop();  @pop
        cout << u << " ";  @visit

        // {{b_c3}}  @forNbr
        for (int v : adj[u]) {  @forNbr
            if (!visited[v]) {  @ifNot
                visited[v] = true;  @mark
                q.push(v);  @push
            }
        }
    }
}`],
      main: [`bfs(adj, ${start});  @call`]
    }
  });
}

/* ---------------------------------------------------------------- DFS */

export function dfsProgram(g, start) {
  return build(g, 'adj', {
    pseudo: {
      fns: [`{{d_p0}}  @header
    {{d_p1}}  @mark
    {{d_p2}}  @visit
    {{d_p3}}  @forNbr
    {{d_p4}}  @ifNot
    {{d_p5}}  @recurse
    {{d_p6}}  @ret`],
      main: ['visited = all false  @init', `DFS(${start})  @call`]
    },
    js: {
      fns: [`function dfs(adj, u, visited) {  @header
    // {{d_c1}}  @mark
    visited[u] = true;  @mark
    console.log(u);  @visit

    for (const v of adj[u]) {  @forNbr
        if (!visited[v]) {  @ifNot
            // {{d_c2}}  @recurse
            dfs(adj, v, visited);  @recurse
        }
    }
    // {{d_c3}}  @ret
}  @ret`],
      main: ['const visited = new Array(V).fill(false);  @init', `dfs(adj, ${start}, visited);  @call`]
    },
    java: {
      fns: [`static void dfs(List<List<Integer>> adj, int u, boolean[] visited) {  @header
    // {{d_c1}}  @mark
    visited[u] = true;  @mark
    System.out.print(u + " ");  @visit

    for (int v : adj.get(u)) {  @forNbr
        if (!visited[v]) {  @ifNot
            // {{d_c2}}  @recurse
            dfs(adj, v, visited);  @recurse
        }
    }
    // {{d_c3}}  @ret
}  @ret`],
      main: ['boolean[] visited = new boolean[V];  @init', `dfs(adj, ${start}, visited);  @call`]
    },
    python: {
      fns: [`def dfs(adj, u, visited):  @header
    # {{d_c1}}  @mark
    visited[u] = True  @mark
    print(u, end=" ")  @visit

    for v in adj[u]:  @forNbr
        if not visited[v]:  @ifNot
            # {{d_c2}}  @recurse
            dfs(adj, v, visited)  @recurse
    # {{d_c3}}  @ret`],
      main: ['visited = [False] * V  @init', `dfs(adj, ${start}, visited)  @call`]
    },
    cpp: {
      imports: '#include <iostream>\n#include <vector>',
      fns: [`void dfs(vector<vector<int>>& adj, int u, vector<bool>& visited) {  @header
    // {{d_c1}}  @mark
    visited[u] = true;  @mark
    cout << u << " ";  @visit

    for (int v : adj[u]) {  @forNbr
        if (!visited[v]) {  @ifNot
            // {{d_c2}}  @recurse
            dfs(adj, v, visited);  @recurse
        }
    }
    // {{d_c3}}  @ret
}  @ret`],
      main: ['vector<bool> visited(V, false);  @init', `dfs(adj, ${start}, visited);  @call`]
    }
  });
}

/* ---------------------------------------------------- Dijkstra and Prim */

/**
 * Dijkstra and Prim are the same loop with a different question, so they
 * share one template. kind: 'dijkstra' | 'prim'.
 */
function greedyProgram(g, kind, src) {
  const D = kind === 'dijkstra';
  const P = D ? 'j' : 'p';
  const arr = D ? 'dist' : 'key';
  const fin = D ? 'done' : 'inTree';
  const finPy = D ? 'done' : 'in_tree';
  const cond = (lang) => {
    const notFin = { js: `!${fin}[v]`, java: `!${fin}[v]`, cpp: `!${fin}[v]`, python: `not ${finPy}[v]` }[lang];
    const and = lang === 'python' ? 'and' : '&&';
    return D ? `${notFin} ${and} dist[u] + w < dist[v]` : `${notFin} ${and} w < key[v]`;
  };
  const upd = (lang) => {
    const end = lang === 'python' ? '' : ';';
    return D ? [`dist[v] = dist[u] + w${end}  @relax`] : [`key[v] = w${end}  @update`, `parent[v] = u${end}  @update`];
  };
  const ifTag = D ? 'ifRelax' : 'ifBetter';
  const fnName = D ? 'dijkstra' : 'prim';
  const call = (lang) => {
    const end = lang === 'python' ? '' : ';';
    return D ? `${fnName}(adj, ${src})${end}  @call` : `${fnName}(adj)${end}  @call`;
  };
  const sig = { js: D ? 'adj, src' : 'adj', python: D ? 'adj, src' : 'adj' };
  const startV = D ? 'src' : '0';
  const printJs = D ? 'console.log(dist);  @print' : 'for (let v = 1; v < V; v++) console.log(parent[v] + " - " + v + "  (" + key[v] + ")");  @print';
  const printJava = D ? 'System.out.println(Arrays.toString(dist));  @print' : 'for (int v = 1; v < V; v++) System.out.println(parent[v] + " - " + v + "  (" + key[v] + ")");  @print';
  const printPy = D ? 'print(dist)  @print' : 'for v in range(1, V):  @print\n        print(parent[v], "-", v, f"({key[v]})")  @print';
  const printCpp = D ? 'for (int i = 0; i < V; i++) cout << i << ": " << dist[i] << endl;  @print' : 'for (int v = 1; v < V; v++) cout << parent[v] << " - " << v << "  (" << key[v] << ")" << endl;  @print';
  const parentInit = (lang) => (D ? [] : [{ js: 'const parent = new Array(V).fill(-1);  @init', java: 'int[] parent = new int[V];  @init', python: 'parent = [-1] * V  @init', cpp: 'vector<int> parent(V, -1);  @init' }[lang]]);
  const javaParentFill = D ? '' : '\n    Arrays.fill(parent, -1);  @init';

  return build(g, 'adj', {
    pseudo: {
      fns: [`{{${P}_p0}}  @header
    {{${P}_p1}}  @init
    {{${P}_p2}}  @loop
    {{${P}_p3}}  @pick
    {{${P}_p4}}  @mark
    {{${P}_p5}}  @forNbr
    {{${P}_p6}}  @${ifTag}
    {{${P}_p7}}  @${D ? 'relax' : 'update'}
{{${P}_p8}}  @print`],
      main: [D ? `DIJKSTRA(graph, ${src})  @call` : 'PRIM(graph)  @call']
    },
    js: {
      fns: [`function ${fnName}(${sig.js}) {  @header
    const V = adj.length;  @init
    const ${arr} = new Array(V).fill(Infinity);  @init
    ${parentInit('js').join('\n    ')}${D ? '' : '\n    '}const ${fin} = new Array(V).fill(false);  @init
    ${arr}[${startV}] = 0;  @init

    for (let round = 0; round < V; round++) {  @loop
        // {{${P}_c1}}  @pick
        let u = -1;  @pick
        for (let i = 0; i < V; i++)  @pick
            if (!${fin}[i] && (u === -1 || ${arr}[i] < ${arr}[u])) u = i;  @pick
        ${fin}[u] = true;  @mark

        // {{${P}_c2}}  @forNbr
        for (const [v, w] of adj[u]) {  @forNbr
            if (${cond('js')}) {  @${ifTag}
                ${upd('js').join('\n                ')}
            }
        }
    }
    ${printJs}
}`],
      main: [call('js')]
    },
    java: {
      fns: [`static void ${fnName}(List<List<int[]>> adj${D ? ', int src' : ''}) {  @header
    int V = adj.size();  @init
    final int INF = 1_000_000_000;  @init
    int[] ${arr} = new int[V];  @init
    Arrays.fill(${arr}, INF);  @init
    ${parentInit('java').join('\n    ')}${javaParentFill}${D ? '' : '\n    '}boolean[] ${fin} = new boolean[V];  @init
    ${arr}[${startV}] = 0;  @init

    for (int round = 0; round < V; round++) {  @loop
        // {{${P}_c1}}  @pick
        int u = -1;  @pick
        for (int i = 0; i < V; i++)  @pick
            if (!${fin}[i] && (u == -1 || ${arr}[i] < ${arr}[u])) u = i;  @pick
        ${fin}[u] = true;  @mark

        // {{${P}_c2}}  @forNbr
        for (int[] e : adj.get(u)) {  @forNbr
            int v = e[0], w = e[1];  @forNbr
            if (${cond('java')}) {  @${ifTag}
                ${upd('java').join('\n                ')}
            }
        }
    }
    ${printJava}
}`],
      main: [call('java')]
    },
    python: {
      fns: [`def ${fnName}(${sig.python}):  @header
    V = len(adj)  @init
    ${arr} = [float("inf")] * V  @init
    ${parentInit('python').join('\n    ')}${D ? '' : '\n    '}${finPy} = [False] * V  @init
    ${arr}[${startV}] = 0  @init

    for _ in range(V):  @loop
        # {{${P}_c1}}  @pick
        u = -1  @pick
        for i in range(V):  @pick
            if not ${finPy}[i] and (u == -1 or ${arr}[i] < ${arr}[u]):  @pick
                u = i  @pick
        ${finPy}[u] = True  @mark

        # {{${P}_c2}}  @forNbr
        for v, w in adj[u]:  @forNbr
            if ${cond('python')}:  @${ifTag}
                ${upd('python').join('\n                ')}
    ${printPy}`],
      main: [call('python')]
    },
    cpp: {
      imports: '#include <iostream>\n#include <vector>',
      fns: [`void ${fnName}(vector<vector<pair<int, int>>>& adj${D ? ', int src' : ''}) {  @header
    int V = adj.size();  @init
    const int INF = 1e9;  @init
    vector<int> ${arr}(V, INF);  @init
    ${parentInit('cpp').join('\n    ')}${D ? '' : '\n    '}vector<bool> ${fin}(V, false);  @init
    ${arr}[${startV}] = 0;  @init

    for (int round = 0; round < V; round++) {  @loop
        // {{${P}_c1}}  @pick
        int u = -1;  @pick
        for (int i = 0; i < V; i++)  @pick
            if (!${fin}[i] && (u == -1 || ${arr}[i] < ${arr}[u])) u = i;  @pick
        ${fin}[u] = true;  @mark

        // {{${P}_c2}}  @forNbr
        for (auto [v, w] : adj[u]) {  @forNbr
            if (${cond('cpp')}) {  @${ifTag}
                ${upd('cpp').join('\n                ')}
            }
        }
    }
    ${printCpp}
}`],
      main: [call('cpp')]
    }
  });
}

export const dijkstraProgram = (g, src) => greedyProgram(g, 'dijkstra', src);
export const primProgram = (g) => greedyProgram(g, 'prim', 0);

/* ---------------------------------------------------------------- Kruskal */

export function kruskalProgram(g) {
  return build(g, 'edges', {
    pseudo: {
      fns: [`{{k_p0}}  @findHeader
    {{k_p1}}  @findLoop
    {{k_p2}}  @findRet`, `{{k_p3}}  @header
    {{k_p4}}  @sort
    {{k_p5}}  @init
    {{k_p6}}  @forEdge
    {{k_p7}}  @find
    {{k_p8}}  @ifDiff
    {{k_p9}}  @take
    {{k_p10}}  @union
    {{k_p11}}  @skip
{{k_p12}}  @print`],
      main: ['KRUSKAL(edges, V)  @call']
    },
    js: {
      fns: [`// {{k_c1}}  @findHeader
function find(parent, x) {  @findHeader
    while (parent[x] !== x) x = parent[x];  @findLoop
    return x;  @findRet
}`, `function kruskal(edges, V) {  @header
    // {{k_c2}}  @sort
    const sorted = [...edges].sort((a, b) => a[2] - b[2]);  @sort
    const parent = Array.from({ length: V }, (_, i) => i);  @init
    let total = 0;  @init

    for (const [u, v, w] of sorted) {  @forEdge
        const ru = find(parent, u);  @find
        const rv = find(parent, v);  @find
        // {{k_c3}}  @ifDiff
        if (ru !== rv) {  @ifDiff
            total += w;  @take
            console.log(u + " - " + v + "  (" + w + ")");  @take
            parent[ru] = rv;  @union
        }  @skip
    }
    console.log("total =", total);  @print
}`],
      main: ['kruskal(edges, V);  @call']
    },
    java: {
      fns: [`// {{k_c1}}  @findHeader
static int find(int[] parent, int x) {  @findHeader
    while (parent[x] != x) x = parent[x];  @findLoop
    return x;  @findRet
}`, `static void kruskal(int[][] edges, int V) {  @header
    // {{k_c2}}  @sort
    int[][] sorted = edges.clone();  @sort
    Arrays.sort(sorted, (a, b) -> a[2] - b[2]);  @sort
    int[] parent = new int[V];  @init
    for (int i = 0; i < V; i++) parent[i] = i;  @init
    int total = 0;  @init

    for (int[] e : sorted) {  @forEdge
        int u = e[0], v = e[1], w = e[2];  @forEdge
        int ru = find(parent, u);  @find
        int rv = find(parent, v);  @find
        // {{k_c3}}  @ifDiff
        if (ru != rv) {  @ifDiff
            total += w;  @take
            System.out.println(u + " - " + v + "  (" + w + ")");  @take
            parent[ru] = rv;  @union
        }  @skip
    }
    System.out.println("total = " + total);  @print
}`],
      main: ['kruskal(edges, V);  @call']
    },
    python: {
      fns: [`# {{k_c1}}  @findHeader
def find(parent, x):  @findHeader
    while parent[x] != x:  @findLoop
        x = parent[x]  @findLoop
    return x  @findRet`, `def kruskal(edges, V):  @header
    # {{k_c2}}  @sort
    sorted_edges = sorted(edges, key=lambda e: e[2])  @sort
    parent = list(range(V))  @init
    total = 0  @init

    for u, v, w in sorted_edges:  @forEdge
        ru = find(parent, u)  @find
        rv = find(parent, v)  @find
        # {{k_c3}}  @ifDiff
        if ru != rv:  @ifDiff
            total += w  @take
            print(u, "-", v, f"({w})")  @take
            parent[ru] = rv  @union
        # else: skip (cycle)  @skip
    print("total =", total)  @print`],
      main: ['kruskal(edges, V)  @call']
    },
    cpp: {
      imports: '#include <iostream>\n#include <vector>\n#include <algorithm>',
      fns: [`// {{k_c1}}  @findHeader
int find(vector<int>& parent, int x) {  @findHeader
    while (parent[x] != x) x = parent[x];  @findLoop
    return x;  @findRet
}`, `void kruskal(vector<vector<int>> edges, int V) {  @header
    // {{k_c2}}  @sort
    stable_sort(edges.begin(), edges.end(),  @sort
                [](auto& a, auto& b) { return a[2] < b[2]; });  @sort
    vector<int> parent(V);  @init
    for (int i = 0; i < V; i++) parent[i] = i;  @init
    int total = 0;  @init

    for (auto& e : edges) {  @forEdge
        int u = e[0], v = e[1], w = e[2];  @forEdge
        int ru = find(parent, u);  @find
        int rv = find(parent, v);  @find
        // {{k_c3}}  @ifDiff
        if (ru != rv) {  @ifDiff
            total += w;  @take
            cout << u << " - " << v << "  (" << w << ")" << endl;  @take
            parent[ru] = rv;  @union
        }  @skip
    }
    cout << "total = " << total << endl;  @print
}`],
      main: ['kruskal(edges, V);  @call']
    }
  });
}

/* ---------------------------------------------------------------- Bellman-Ford */

export function bellmanProgram(g, src) {
  return build(g, 'edges', {
    pseudo: {
      fns: [`{{f_p0}}  @header
    {{f_p1}}  @init
    {{f_p2}}  @pass
    {{f_p3}}  @forEdge
    {{f_p4}}  @ifRelax
    {{f_p5}}  @relax
    {{f_p6}}  @early
    {{f_p7}}  @checkLoop
    {{f_p8}}  @checkNeg`],
      main: [`BELLMAN-FORD(edges, V, ${src})  @call`]
    },
    js: {
      fns: [`function bellmanFord(edges, V, src) {  @header
    const dist = new Array(V).fill(Infinity);  @init
    dist[src] = 0;  @init

    // {{f_c1}}  @pass
    for (let pass = 1; pass <= V - 1; pass++) {  @pass
        let changed = false;  @pass
        for (const [u, v, w] of edges) {  @forEdge
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {  @ifRelax
                dist[v] = dist[u] + w;  @relax
                changed = true;  @relax
            }
        }
        if (!changed) break;  @early
    }

    // {{f_c2}}  @checkLoop
    for (const [u, v, w] of edges)  @checkLoop
        if (dist[u] + w < dist[v]) return "negative cycle!";  @checkNeg
    return dist;  @checkNeg
}`],
      main: [`console.log(bellmanFord(edges, V, ${src}));  @call`]
    },
    java: {
      fns: [`static int[] bellmanFord(int[][] edges, int V, int src) {  @header
    final int INF = 1_000_000_000;  @init
    int[] dist = new int[V];  @init
    Arrays.fill(dist, INF);  @init
    dist[src] = 0;  @init

    // {{f_c1}}  @pass
    for (int pass = 1; pass <= V - 1; pass++) {  @pass
        boolean changed = false;  @pass
        for (int[] e : edges) {  @forEdge
            int u = e[0], v = e[1], w = e[2];  @forEdge
            if (dist[u] != INF && dist[u] + w < dist[v]) {  @ifRelax
                dist[v] = dist[u] + w;  @relax
                changed = true;  @relax
            }
        }
        if (!changed) break;  @early
    }

    // {{f_c2}}  @checkLoop
    for (int[] e : edges)  @checkLoop
        if (dist[e[0]] != INF && dist[e[0]] + e[2] < dist[e[1]]) return null;  @checkNeg
    return dist;  @checkNeg
}`],
      main: [`System.out.println(Arrays.toString(bellmanFord(edges, V, ${src})));  @call`]
    },
    python: {
      fns: [`def bellman_ford(edges, V, src):  @header
    dist = [float("inf")] * V  @init
    dist[src] = 0  @init

    # {{f_c1}}  @pass
    for _ in range(V - 1):  @pass
        changed = False  @pass
        for u, v, w in edges:  @forEdge
            if dist[u] != float("inf") and dist[u] + w < dist[v]:  @ifRelax
                dist[v] = dist[u] + w  @relax
                changed = True  @relax
        if not changed:  @early
            break  @early

    # {{f_c2}}  @checkLoop
    for u, v, w in edges:  @checkLoop
        if dist[u] + w < dist[v]:  @checkNeg
            return "negative cycle!"  @checkNeg
    return dist  @checkNeg`],
      main: [`print(bellman_ford(edges, V, ${src}))  @call`]
    },
    cpp: {
      imports: '#include <iostream>\n#include <vector>',
      fns: [`vector<int> bellmanFord(vector<vector<int>>& edges, int V, int src) {  @header
    const int INF = 1e9;  @init
    vector<int> dist(V, INF);  @init
    dist[src] = 0;  @init

    // {{f_c1}}  @pass
    for (int pass = 1; pass <= V - 1; pass++) {  @pass
        bool changed = false;  @pass
        for (auto& e : edges) {  @forEdge
            int u = e[0], v = e[1], w = e[2];  @forEdge
            if (dist[u] != INF && dist[u] + w < dist[v]) {  @ifRelax
                dist[v] = dist[u] + w;  @relax
                changed = true;  @relax
            }
        }
        if (!changed) break;  @early
    }

    // {{f_c2}}  @checkLoop
    for (auto& e : edges)  @checkLoop
        if (dist[e[0]] != INF && dist[e[0]] + e[2] < dist[e[1]]) return {};  @checkNeg
    return dist;  @checkNeg
}`],
      main: [`vector<int> dist = bellmanFord(edges, V, ${src});  @call`, 'for (int d : dist) cout << d << " ";  @call']
    }
  });
}

/* ---------------------------------------------------------------- Floyd-Warshall */

export function floydProgram(g, D0) {
  const n = D0.length;
  const lit = (lang) => D0.map((row) => row.map((x) => (x === Infinity ? 'INF' : String(x))));
  const rows = (lang, open, close) => lit(lang).map((r, i) => `    ${open}${r.join(', ')}${close}${i < n - 1 ? ',' : ''}  @build`);
  return program({
    pseudo: `{{w_p0}}  @header
    {{w_p1}}  @kLoop
    {{w_p2}}  @iLoop
    {{w_p3}}  @jLoop
    {{w_p4}}  @ifShorter
    {{w_p5}}  @update

{{m_main}}
    D = ${D0.map((r) => `[${r.map((x) => (x === Infinity ? '∞' : x)).join(' ')}]`).join(' ')}  @build
    FLOYD-WARSHALL(D)  @call
    {{w_p6}}  @print`,
    js: `function floydWarshall(D) {  @header
    const V = D.length;  @header
    for (let k = 0; k < V; k++)  @kLoop
        for (let i = 0; i < V; i++)  @iLoop
            for (let j = 0; j < V; j++)  @jLoop
                // {{w_c1}}  @ifShorter
                if (D[i][k] + D[k][j] < D[i][j])  @ifShorter
                    D[i][j] = D[i][k] + D[k][j];  @update
    return D;  @print
}

const INF = Infinity;  @build
const D = [  @build
${rows('js', '[', ']').join('\n')}
];  @build
console.log(floydWarshall(D));  @call`,
    java: `import java.util.*;

public class Main {

    static final int INF = 1_000_000_000;

    static void floydWarshall(int[][] D) {  @header
        int V = D.length;  @header
        for (int k = 0; k < V; k++)  @kLoop
            for (int i = 0; i < V; i++)  @iLoop
                for (int j = 0; j < V; j++)  @jLoop
                    // {{w_c1}}  @ifShorter
                    if (D[i][k] + D[k][j] < D[i][j])  @ifShorter
                        D[i][j] = D[i][k] + D[k][j];  @update
    }

    public static void main(String[] args) {
        int[][] D = {  @build
    ${rows('java', '{', '}').join('\n    ')}
        };  @build
        floydWarshall(D);  @call
        for (int[] row : D) System.out.println(Arrays.toString(row));  @print
    }
}`,
    python: `def floyd_warshall(D):  @header
    V = len(D)  @header
    for k in range(V):  @kLoop
        for i in range(V):  @iLoop
            for j in range(V):  @jLoop
                # {{w_c1}}  @ifShorter
                if D[i][k] + D[k][j] < D[i][j]:  @ifShorter
                    D[i][j] = D[i][k] + D[k][j]  @update
    return D  @print


INF = float("inf")  @build
D = [  @build
${rows('python', '[', ']').join('\n')}
]  @build
print(floyd_warshall(D))  @call`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;

const int INF = 1e9;

void floydWarshall(vector<vector<int>>& D) {  @header
    int V = D.size();  @header
    for (int k = 0; k < V; k++)  @kLoop
        for (int i = 0; i < V; i++)  @iLoop
            for (int j = 0; j < V; j++)  @jLoop
                // {{w_c1}}  @ifShorter
                if (D[i][k] + D[k][j] < D[i][j])  @ifShorter
                    D[i][j] = D[i][k] + D[k][j];  @update
}

int main() {
    vector<vector<int>> D = {  @build
${rows('cpp', '{', '}').join('\n')}
    };  @build
    floydWarshall(D);  @call
    for (auto& row : D) {  @print
        for (int x : row) cout << x << " ";  @print
        cout << endl;  @print
    }
    return 0;
}`
  }, TEXT);
}

/* ---------------------------------------------------------------- Kahn */

export function kahnProgram(g) {
  return build(g, 'adj', {
    pseudo: {
      fns: [`{{n_p0}}  @header
    {{n_p1}}  @indeg
    {{n_p2}}  @initQ
    {{n_p3}}  @whileCheck
    {{n_p4}}  @pop
    {{n_p5}}  @forNbr
    {{n_p6}}  @dec
    {{n_p7}}  @ifZero
    {{n_p8}}  @push
    {{n_p9}}  @cycleCheck`],
      main: ['KAHN(graph)  @call']
    },
    js: {
      fns: [`function kahn(adj) {  @header
    const V = adj.length;  @header
    // {{n_c1}}  @indeg
    const indeg = new Array(V).fill(0);  @indeg
    for (let u = 0; u < V; u++)  @indeg
        for (const v of adj[u]) indeg[v]++;  @indeg

    // {{n_c2}}  @initQ
    const queue = [];  @initQ
    for (let v = 0; v < V; v++) if (indeg[v] === 0) queue.push(v);  @initQ

    const order = [];  @initQ
    while (queue.length > 0) {  @whileCheck
        const u = queue.shift();  @pop
        order.push(u);  @pop
        for (const v of adj[u]) {  @forNbr
            indeg[v]--;  @dec
            if (indeg[v] === 0) {  @ifZero
                queue.push(v);  @push
            }
        }
    }
    if (order.length < V) return "cycle!";  @cycleCheck
    return order;  @cycleCheck
}`],
      main: ['console.log(kahn(adj));  @call']
    },
    java: {
      fns: [`static List<Integer> kahn(List<List<Integer>> adj) {  @header
    int V = adj.size();  @header
    // {{n_c1}}  @indeg
    int[] indeg = new int[V];  @indeg
    for (int u = 0; u < V; u++)  @indeg
        for (int v : adj.get(u)) indeg[v]++;  @indeg

    // {{n_c2}}  @initQ
    Queue<Integer> queue = new LinkedList<>();  @initQ
    for (int v = 0; v < V; v++) if (indeg[v] == 0) queue.add(v);  @initQ

    List<Integer> order = new ArrayList<>();  @initQ
    while (!queue.isEmpty()) {  @whileCheck
        int u = queue.poll();  @pop
        order.add(u);  @pop
        for (int v : adj.get(u)) {  @forNbr
            indeg[v]--;  @dec
            if (indeg[v] == 0) {  @ifZero
                queue.add(v);  @push
            }
        }
    }
    if (order.size() < V) return null;  @cycleCheck
    return order;  @cycleCheck
}`],
      main: ['System.out.println(kahn(adj));  @call']
    },
    python: {
      imports: 'from collections import deque',
      fns: [`def kahn(adj):  @header
    V = len(adj)  @header
    # {{n_c1}}  @indeg
    indeg = [0] * V  @indeg
    for u in range(V):  @indeg
        for v in adj[u]:  @indeg
            indeg[v] += 1  @indeg

    # {{n_c2}}  @initQ
    queue = deque(v for v in range(V) if indeg[v] == 0)  @initQ

    order = []  @initQ
    while queue:  @whileCheck
        u = queue.popleft()  @pop
        order.append(u)  @pop
        for v in adj[u]:  @forNbr
            indeg[v] -= 1  @dec
            if indeg[v] == 0:  @ifZero
                queue.append(v)  @push
    if len(order) < V:  @cycleCheck
        return "cycle!"  @cycleCheck
    return order  @cycleCheck`],
      main: ['print(kahn(adj))  @call']
    },
    cpp: {
      imports: '#include <iostream>\n#include <vector>\n#include <queue>',
      fns: [`vector<int> kahn(vector<vector<int>>& adj) {  @header
    int V = adj.size();  @header
    // {{n_c1}}  @indeg
    vector<int> indeg(V, 0);  @indeg
    for (int u = 0; u < V; u++)  @indeg
        for (int v : adj[u]) indeg[v]++;  @indeg

    // {{n_c2}}  @initQ
    queue<int> q;  @initQ
    for (int v = 0; v < V; v++) if (indeg[v] == 0) q.push(v);  @initQ

    vector<int> order;  @initQ
    while (!q.empty()) {  @whileCheck
        int u = q.front();  @pop
        q.pop();  @pop
        order.push_back(u);  @pop
        for (int v : adj[u]) {  @forNbr
            indeg[v]--;  @dec
            if (indeg[v] == 0) {  @ifZero
                q.push(v);  @push
            }
        }
    }
    if ((int)order.size() < V) return {};  @cycleCheck
    return order;  @cycleCheck
}`],
      main: ['for (int v : kahn(adj)) cout << v << " ";  @call']
    }
  });
}

/* ---------------------------------------------------------------- Topological sort (DFS) */

export function topoDfsProgram(g) {
  return build(g, 'adj', {
    pseudo: {
      fns: [`{{t_p0}}  @header
    {{t_p1}}  @mark
    {{t_p2}}  @forNbr
    {{t_p3}}  @ifNot
    {{t_p4}}  @recurse
    {{t_p5}}  @pushStack`, `{{t_p6}}  @topoHeader
    {{t_p7}}  @forAll
    {{t_p8}}  @ifStart
    {{t_p9}}  @start
    {{t_p10}}  @popAll`],
      main: ['TOPO-SORT(graph)  @call']
    },
    js: {
      fns: [`function dfs(adj, u, visited, stack) {  @header
    visited[u] = true;  @mark
    for (const v of adj[u]) {  @forNbr
        if (!visited[v]) {  @ifNot
            dfs(adj, v, visited, stack);  @recurse
        }
    }
    // {{t_c1}}  @pushStack
    stack.push(u);  @pushStack
}`, `function topoSort(adj) {  @topoHeader
    const visited = new Array(adj.length).fill(false);  @topoHeader
    const stack = [];  @topoHeader
    for (let u = 0; u < adj.length; u++) {  @forAll
        if (!visited[u]) {  @ifStart
            dfs(adj, u, visited, stack);  @start
        }
    }
    return stack.reverse();  @popAll
}`],
      main: ['console.log(topoSort(adj));  @call']
    },
    java: {
      fns: [`static void dfs(List<List<Integer>> adj, int u, boolean[] visited, Deque<Integer> stack) {  @header
    visited[u] = true;  @mark
    for (int v : adj.get(u)) {  @forNbr
        if (!visited[v]) {  @ifNot
            dfs(adj, v, visited, stack);  @recurse
        }
    }
    // {{t_c1}}  @pushStack
    stack.push(u);  @pushStack
}`, `static List<Integer> topoSort(List<List<Integer>> adj) {  @topoHeader
    boolean[] visited = new boolean[adj.size()];  @topoHeader
    Deque<Integer> stack = new ArrayDeque<>();  @topoHeader
    for (int u = 0; u < adj.size(); u++) {  @forAll
        if (!visited[u]) {  @ifStart
            dfs(adj, u, visited, stack);  @start
        }
    }
    return new ArrayList<>(stack);  @popAll
}`],
      main: ['System.out.println(topoSort(adj));  @call']
    },
    python: {
      fns: [`def dfs(adj, u, visited, stack):  @header
    visited[u] = True  @mark
    for v in adj[u]:  @forNbr
        if not visited[v]:  @ifNot
            dfs(adj, v, visited, stack)  @recurse
    # {{t_c1}}  @pushStack
    stack.append(u)  @pushStack`, `def topo_sort(adj):  @topoHeader
    visited = [False] * len(adj)  @topoHeader
    stack = []  @topoHeader
    for u in range(len(adj)):  @forAll
        if not visited[u]:  @ifStart
            dfs(adj, u, visited, stack)  @start
    return stack[::-1]  @popAll`],
      main: ['print(topo_sort(adj))  @call']
    },
    cpp: {
      imports: '#include <iostream>\n#include <vector>\n#include <stack>',
      fns: [`void dfs(vector<vector<int>>& adj, int u, vector<bool>& visited, stack<int>& st) {  @header
    visited[u] = true;  @mark
    for (int v : adj[u]) {  @forNbr
        if (!visited[v]) {  @ifNot
            dfs(adj, v, visited, st);  @recurse
        }
    }
    // {{t_c1}}  @pushStack
    st.push(u);  @pushStack
}`, `void topoSort(vector<vector<int>>& adj) {  @topoHeader
    vector<bool> visited(adj.size(), false);  @topoHeader
    stack<int> st;  @topoHeader
    for (int u = 0; u < (int)adj.size(); u++) {  @forAll
        if (!visited[u]) {  @ifStart
            dfs(adj, u, visited, st);  @start
        }
    }
    while (!st.empty()) { cout << st.top() << " "; st.pop(); }  @popAll
}`],
      main: ['topoSort(adj);  @call']
    }
  });
}
