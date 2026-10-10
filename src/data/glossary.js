/**
 * What the short names in lessons and code mean (u, v, w, dist, p, t …).
 * Hovering (or tapping) such a name anywhere in a lesson shows its meaning.
 *
 * Lookup order: the lesson's own meaning → the chapter's meaning → common.
 */
const T = (en, bn) => ({ en, bn });

const COMMON = {
  i: T('a position (index) — a loop counter that walks 0, 1, 2 …', 'একটা অবস্থান (ইনডেক্স) — 0, 1, 2 … করে চলা লুপ কাউন্টার'),
  j: T('a second position (index) — another loop counter', 'দ্বিতীয় একটা অবস্থান (ইনডেক্স) — আরেকটা লুপ কাউন্টার'),
  N: T('the number of items (nodes, values) in total', 'মোট জিনিসের (নোড, মান) সংখ্যা'),
  n: T('the number of items (nodes, values) in total', 'মোট জিনিসের (নোড, মান) সংখ্যা'),
  null: T('"nothing here" — an empty spot, no node', '"এখানে কিছু নেই" — খালি জায়গা, কোনো নোড নেই'),
  None: T('Python\'s word for null: nothing here', 'পাইথনে null-এর নাম: এখানে কিছু নেই'),
  nullptr: T('C++\'s word for null: nothing here', 'C++-এ null-এর নাম: এখানে কিছু নেই'),
  queue: T('a waiting line: items join at the back and leave from the front (first in, first out)', 'একটা লাইন: পেছনে যোগ হয়, সামনে থেকে বের হয় (আগে এলে আগে যায়)'),
  stack: T('a pile: the last item put on is the first one taken off', 'একটা স্তূপ: সবার শেষে রাখা জিনিসটা সবার আগে তোলা হয়'),
  visited: T('visited[x] becomes true once x has been seen, so it is never handled twice', 'x একবার দেখা হলেই visited[x] true হয়, যাতে দুবার কাজ না হয়'),
  order: T('the answer list, built up one item at a time', 'উত্তরের তালিকা, একটা একটা করে তৈরি হয়'),
  INF: T('infinity — "not reached yet", bigger than any real distance', 'অসীম — "এখনো পৌঁছানো যায়নি", যেকোনো আসল দূরত্বের চেয়ে বড়'),
  h: T('the height of the tree', 'ট্রির উচ্চতা')
};

const GRAPHS = {
  u: T('a vertex — usually the one the algorithm is working on right now', 'একটা ভার্টেক্স — সাধারণত অ্যালগরিদম এখন যেটা নিয়ে কাজ করছে'),
  v: T('another vertex — usually a neighbour of u (the other end of edge u–v)', 'আরেকটা ভার্টেক্স — সাধারণত u-এর প্রতিবেশী (এজ u–v-এর অন্য মাথা)'),
  w: T('the weight of edge u–v: its length, time or cost', 'এজ u–v-এর ওজন: তার দৈর্ঘ্য, সময় বা খরচ'),
  V: T('the number of vertices in the graph', 'গ্রাফে ভার্টেক্সের সংখ্যা'),
  E: T('the number of edges in the graph', 'গ্রাফে এজের সংখ্যা'),
  e: T('one edge from the list, written (u, v) or (u, v, w)', 'তালিকার একটা এজ, লেখা হয় (u, v) বা (u, v, w)'),
  edges: T('the list of all edges, each one (u, v) or (u, v, w)', 'সব এজের তালিকা, প্রতিটা (u, v) বা (u, v, w)'),
  adj: T('the adjacency list: adj[u] is the list of u\'s neighbours', 'অ্যাডজাসেন্সি লিস্ট: adj[u] হলো u-এর প্রতিবেশীদের তালিকা'),
  M: T('the adjacency matrix: M[u][v] is 1 when edge u–v exists, else 0', 'অ্যাডজাসেন্সি ম্যাট্রিক্স: এজ u–v থাকলে M[u][v] = 1, নইলে 0'),
  dist: T('dist[v] = the shortest distance from the start to v found so far (∞ = not reached yet)', 'dist[v] = শুরু থেকে v পর্যন্ত এ পর্যন্ত পাওয়া সবচেয়ে ছোট দূরত্ব (∞ = এখনো পৌঁছানো যায়নি)'),
  src: T('the start vertex', 'শুরুর ভার্টেক্স'),
  start: T('the start vertex', 'শুরুর ভার্টেক্স'),
  degree: T('degree[x] = how many edges touch vertex x', 'degree[x] = ভার্টেক্স x-কে কতগুলো এজ ছোঁয়'),
  indeg: T('indeg[v] = how many arrows point into v — tasks v is still waiting for', 'indeg[v] = v-এর দিকে কতগুলো তীর আসে — v এখনো কয়টা কাজের অপেক্ষায়'),
  parent: T('parent[v] = the vertex that v is connected through', 'parent[v] = যে ভার্টেক্সের মাধ্যমে v যুক্ত'),
  key: T('key[v] = the cheapest edge that could connect v to the tree right now', 'key[v] = এই মুহূর্তে v-কে ট্রির সঙ্গে জোড়ার সবচেয়ে সস্তা এজ'),
  done: T('done[v] becomes true when v\'s distance is final', 'v-এর দূরত্ব চূড়ান্ত হলে done[v] true হয়'),
  inTree: T('inTree[v] becomes true once v has joined the tree', 'v ট্রিতে যোগ দিলে inTree[v] true হয়')
};

const TREES = {
  root: T('the top node of the tree — the one with no parent', 'ট্রির একদম ওপরের নোড — যার কোনো প্যারেন্ট নেই'),
  node: T('the node this function call is working on', 'এই ফাংশন কল যে নোড নিয়ে কাজ করছে'),
  p: T('the node the code is looking at right now', 'কোড এই মুহূর্তে যে নোড দেখছে'),
  q: T('a helper node — e.g. the successor (or predecessor) found during a delete', 'একটা সহায়ক নোড — যেমন ডিলিটের সময় খুঁজে পাওয়া সাকসেসর (বা প্রিডেসেসর)'),
  t: T('the node we are at now while walking down the tree', 'ট্রিতে নামার সময় এখন যে নোডে আছি'),
  r: T('the node one step behind t — it becomes the parent of the new node', 't-এর এক ধাপ পেছনের নোড — নতুন নোডের প্যারেন্ট হয়'),
  key: T('the value we are searching for, inserting or deleting', 'যে মান খুঁজছি, ইনসার্ট বা ডিলিট করছি'),
  value: T('the value we are searching for, inserting or deleting', 'যে মান খুঁজছি, ইনসার্ট বা ডিলিট করছি'),
  data: T('the value stored inside a node', 'নোডের ভেতরে রাখা মান'),
  val: T('the value stored inside a node', 'নোডের ভেতরে রাখা মান'),
  left: T('the link to the left child (smaller values in a BST), or null', 'বাম চাইল্ডের লিংক (BST-তে ছোট মান), বা null'),
  right: T('the link to the right child (bigger values in a BST), or null', 'ডান চাইল্ডের লিংক (BST-তে বড় মান), বা null'),
  lchild: T('the link to the left child (smaller values in a BST), or null', 'বাম চাইল্ডের লিংক (BST-তে ছোট মান), বা null'),
  rchild: T('the link to the right child (bigger values in a BST), or null', 'ডান চাইল্ডের লিংক (BST-তে বড় মান), বা null'),
  curr: T('the node we are at right now', 'এই মুহূর্তে যে নোডে আছি'),
  height: T('the number of levels below a node — how tall it is', 'একটা নোডের নিচে কয়টা লেভেল — সেটা কত লম্বা'),
  bf: T('balance factor = height(left) − height(right); an AVL tree needs −1, 0 or +1', 'ব্যালান্স ফ্যাক্টর = height(left) − height(right); AVL-এ লাগবে −1, 0 বা +1'),
  heap: T('the array that holds the heap, row by row', 'যে অ্যারেতে হিপটা সারি ধরে রাখা'),
  smallest: T('the position (index) of the smallest of a node and its two children', 'একটা নোড আর তার দুই চাইল্ডের মধ্যে সবচেয়ে ছোটটার অবস্থান (ইনডেক্স)')
};

/** Lesson-specific meanings, where a letter means something particular. */
const BY_TOPIC = {
  'graph-bfs': {
    u: T('the vertex just taken from the front of the queue', 'queue-এর সামনে থেকে এইমাত্র নেওয়া ভার্টেক্স'),
    v: T('one of u\'s neighbours, being checked now', 'u-এর একজন প্রতিবেশী, এখন যাকে দেখা হচ্ছে')
  },
  'graph-dfs': {
    u: T('the vertex dfs is visiting now (top of the call stack)', 'dfs এখন যে ভার্টেক্সে আছে (কল স্ট্যাকের ওপরেরটা)'),
    v: T('one of u\'s neighbours, being checked now', 'u-এর একজন প্রতিবেশী, এখন যাকে দেখা হচ্ছে')
  },
  'graph-dijkstra': {
    u: T('the vertex picked this round: the closest one not done yet', 'এই রাউন্ডে বাছা ভার্টেক্স: done হয়নি এমনদের মধ্যে সবচেয়ে কাছের'),
    v: T('a neighbour of u — can we reach it more cheaply through u?', 'u-এর একজন প্রতিবেশী — u হয়ে কি আরও কম খরচে যাওয়া যায়?'),
    w: T('the length of the road u–v', 'রাস্তা u–v-এর দৈর্ঘ্য')
  },
  'graph-prim': {
    u: T('the vertex just added to the tree this round', 'এই রাউন্ডে ট্রিতে যোগ হওয়া ভার্টেক্স'),
    v: T('a neighbour of u that is not in the tree yet', 'u-এর একজন প্রতিবেশী, যে এখনো ট্রিতে নেই'),
    w: T('the cost of the edge u–v', 'এজ u–v-এর খরচ'),
    parent: T('parent[v] = the tree vertex offering v its cheapest edge', 'parent[v] = ট্রির যে ভার্টেক্স v-কে সবচেয়ে সস্তা এজ দিচ্ছে')
  },
  'graph-kruskal': {
    u: T('one end of the edge being checked', 'যাচাই হওয়া এজের এক মাথা'),
    v: T('the other end of the edge being checked', 'যাচাই হওয়া এজের অন্য মাথা'),
    w: T('the cost of the edge u–v', 'এজ u–v-এর খরচ'),
    ru: T('the group leader of u (found by find)', 'u-এর দলের লিডার (find দিয়ে পাওয়া)'),
    rv: T('the group leader of v (found by find)', 'v-এর দলের লিডার (find দিয়ে পাওয়া)'),
    parent: T('parent[x] = the next step from x towards its group leader (a leader points to itself)', 'parent[x] = দলের লিডারের দিকে x থেকে পরের ধাপ (লিডার নিজেকেই নির্দেশ করে)'),
    x: T('the vertex whose group leader we are looking for', 'যে ভার্টেক্সের দলের লিডার খুঁজছি'),
    total: T('the total cost of the edges taken so far', 'এ পর্যন্ত নেওয়া এজগুলোর মোট খরচ')
  },
  'graph-bellman-ford': {
    u: T('where the arrow being checked starts', 'যাচাই হওয়া তীর যেখান থেকে শুরু'),
    v: T('where the arrow being checked ends', 'যাচাই হওয়া তীর যেখানে শেষ'),
    w: T('the weight of the arrow u → v (may be negative)', 'তীর u → v-এর ওজন (নেগেটিভও হতে পারে)'),
    pass: T('one trip through all the edges; at most V − 1 are needed', 'সব এজের ওপর দিয়ে একবার যাওয়া; বড়জোর V − 1টা লাগে'),
    changed: T('did any distance get shorter during this pass?', 'এই পাসে কোনো দূরত্ব কি কমেছে?')
  },
  'graph-floyd-warshall': {
    i: T('where a trip starts (the row of the table)', 'যাত্রা যেখানে শুরু (টেবিলের সারি)'),
    j: T('where a trip ends (the column of the table)', 'যাত্রা যেখানে শেষ (টেবিলের কলাম)'),
    k: T('the vertex we are allowed to stop at in the middle', 'মাঝপথে যে ভার্টেক্সে থামার অনুমতি'),
    D: T('D[i][j] = the shortest known distance from i to j', 'D[i][j] = i থেকে j-এর জানা সবচেয়ে ছোট দূরত্ব')
  },
  'graph-kahn': {
    u: T('the task just taken from the queue — it is done now', 'queue থেকে এইমাত্র নেওয়া কাজ — এটা এখন শেষ'),
    v: T('a task that waits for u (an arrow u → v)', 'যে কাজ u-এর অপেক্ষায় (তীর u → v)')
  },
  'graph-topo-dfs': {
    u: T('the vertex dfs is exploring now', 'dfs এখন যে ভার্টেক্স ঘুরে দেখছে'),
    v: T('a vertex that u points to (an arrow u → v)', 'যে ভার্টেক্সের দিকে u তীর দেয় (তীর u → v)')
  },
  'avl-rotations': {
    x: T('the child that moves UP in the rotation', 'রোটেশনে যে চাইল্ড ওপরে ওঠে'),
    y: T('the node that is too tall — it moves DOWN in the rotation', 'যে নোড বেশি লম্বা — রোটেশনে নিচে নামে'),
    T2: T('the middle subtree that changes parent during the rotation', 'মাঝের সাব-ট্রি, রোটেশনে যার প্যারেন্ট বদলায়')
  },
  heap: {
    i: T('the position (index) of the value being moved', 'যে মান সরানো হচ্ছে তার অবস্থান (ইনডেক্স)'),
    l: T('the index of the left child: 2i + 1', 'বাম চাইল্ডের ইনডেক্স: 2i + 1'),
    r: T('the index of the right child: 2i + 2', 'ডান চাইল্ডের ইনডেক্স: 2i + 2'),
    p: T('the index of the parent: (i − 1) / 2', 'প্যারেন্টের ইনডেক্স: (i − 1) / 2')
  },
  'tree-playground': {
    l: T('the index of the left child: 2i + 1', 'বাম চাইল্ডের ইনডেক্স: 2i + 1'),
    r: T('the index of the right child: 2i + 2', 'ডান চাইল্ডের ইনডেক্স: 2i + 2'),
    p: T('the index of the parent: (i − 1) / 2', 'প্যারেন্টের ইনডেক্স: (i − 1) / 2'),
    x: T('the child that moves up in a rotation', 'রোটেশনে যে চাইল্ড ওপরে ওঠে'),
    y: T('the node that moves down in a rotation', 'রোটেশনে যে নোড নিচে নামে')
  }
};
BY_TOPIC['graph-playground'] = {};
BY_TOPIC['avl-operations'] = BY_TOPIC['avl-rotations'];

/** All names with a meaning in this lesson: { name: {en, bn} }. */
export function termsFor(topic) {
  if (!topic) return COMMON;
  const chapter = topic.categoryKey === 'graphs' ? GRAPHS : TREES;
  return { ...COMMON, ...chapter, ...(BY_TOPIC[topic.id] || {}) };
}
