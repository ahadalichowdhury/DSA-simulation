# AlgoSim — Topic module schema

Each file in `src/data/topics/*.js` exports ONE array of topic objects.
Everything user-facing is bilingual: every human string is `{ en: '...', bn: '...' }`.

```js
export const sortingTopics = [
  {
    id: 'bubble-sort',                    // unique kebab-case (used in URLs/localStorage)
    name: { en: 'Bubble Sort', bn: 'বাবল সর্ট' },
    description: { en: 'Swap neighbours until the list is sorted', bn: 'পাশাপাশি অপেক্ষা করে সাজানো' },
    categoryKey: 'sorting',               // basics|arrays|linked|linear|hashing|trees|graphs|sorting|searching|recursion
    category: { en: 'Sorting', bn: 'সর্টিং' },   // display label for that categoryKey (same for every topic of the key)
    level: 'beginner',                    // beginner | intermediate | advanced
    order: 40,                            // sort order inside the category: 10, 20, 30 …
    icon: '🫧',                           // one emoji
    complexity: { time: 'O(n²)', best: 'O(n)', worst: 'O(n²)', space: 'O(1)', note: { en: '...', bn: '...' } },
    subgroupKey: 'basics',                // trees chapter only: which sidebar sub-topic this lesson belongs to
    code: {                               // FIVE variants — the reader picks one in the right panel.
      // EVERY variant must have EXACTLY the same number of lines as `pseudo.en`
      // (the active-line highlight points at the same line in any language).
      // Keywords stay English; comments are English in `en` and Bangla in `bn`.
      pseudo: {                           // plain pseudocode (default choice)
        en: ['linearSearch(arr, key):', '  for i = 0 to n-1:', '    if arr[i] == key: return i'],
        bn: ['linearSearch(arr, key):', '  for i = 0 to n-1:', '    if arr[i] == key: return i  // পেয়ে গেছি']
      },
      js:     { en: ['…'], bn: ['…'] },   // JavaScript
      java:   { en: ['…'], bn: ['…'] },   // Java
      python: { en: ['…'], bn: ['…'] },   // Python
      cpp:    { en: ['…'], bn: ['…'] }    // C++
    },
    steps: [ /* see below */ ]
  }
];
```

Code style for `js` / `java` / `python` / `cpp`: real, runnable-looking snippets at **teaching**
length — no class boilerplate in Java (just the method), no `#include` in C++. Keep one statement
per line so the line count matches `pseudo` exactly. The active line (`step.line`) must point at
the same statement in all five variants.

### Step object

```js
{
  title:       { en: '...', bn: '...' },       // 3–8 words
  explanation: { en: '...', bn: '...' },       // markdown: **bold**, `code`, - lists, > callouts, ## small heading
  scene:       { kind: 'array', ... },         // see SCENE KINDS — one scene per step
  line:        2,                              // optional, 0-based index into `code` (or array [2,3])
  state:       { i: 3, min: 7, found: false }  // optional variables table shown in the panel
}
```

Typical lesson = **6–10 steps**.
Step 1 = the problem / real-life story. Middle steps = the algorithm doing its work.
Last step = result + what we learned.

---

## SCENE KINDS (exact fields the renderer understands)

### 1. `array` — boxes in a row (the most common one)
```js
{
  kind: 'array',
  label: 'nums = [5, 3, 8, 1]',       // small caption above the row (HTML ok, use <b>)
  cells: [5, 3, 8, 1],                // values (numbers or short strings)
  showIndex: true,                    // show the index under each cell (optional)
  sub: ['k', null, null, null],       // optional custom text under cells (same length as cells)
  highlights: {                       // ALL optional, arrays of indexes
    compare: [0, 1],   // cyan  — "we are looking at these two"
    swap:    [0, 1],   // amber + jump animation
    active:  [2],      // yellow glow — the main cell right now
    sorted:  [3],      // green — already in final place
    pivot:   [2],      // purple
    target:  [3],      // red dashed — the value we hunt
    insert:  [1],      // green pop-in (new item)
    remove:  [1],      // red crossed-out (leaving)
    dim:     [0, 1],   // faded out
    mark:    [0]       // yellow outline
  },
  pointers: [                        // labels UNDER the cells (move with animation)
    { i: 0, label: 'i', tone: 'cyan' },        // tone: cyan|amber|green|purple|red|yellow
    { i: 3, label: 'hi', tone: 'amber' }
  ],
  brackets: [ { from: 0, to: 2, label: 'sorted part', tone: 'green' } ],  // optional underline
  aux: [                              // optional extra rows below (temp arrays, output, memo table)
    { label: 'temp', cells: [3, 5], highlights: { active: [1] }, pointers: [{ i: 1, label: 'k', tone: 'green' }], showIndex: true }
  ],
  note: 'We only compare **inside the window**.'   // italic caption under the drawing
}
```

### 2. `bars` — same idea, drawn as growing bars (sorting / growth)
```js
{ kind: 'bars', cells: [5, 3, 8, 1], label: 'heights', highlights: { compare: [0,1] }, pointers: [{ i: 0, label: 'i', tone: 'cyan' }], note: '...' }
```

### 3. `linkedlist` — nodes with arrows
```js
{
  kind: 'linkedlist',
  label: 'head → 12 → 7 → 9',
  nodes: [12, 7, 9],                  // values, drawn left → right
  next:  [1, 2, null],                // optional next index of each node (default i+1, last null).
                                      // Put an EARLIER index to draw a cycle, e.g. [1,2,0]
  head: 0,                            // marks the head (adds head pointer tag)
  showIndex: false,
  showNull: true,                     // draw the ∅ null box at the end (default true)
  pointers: [ { i: 0, label: 'head', tone: 'yellow' }, { i: 2, label: 'slow', tone: 'cyan' } ],
  highlights: { active: [1], compare: [0,1], insert: [2], remove: [1], dim: [0] },
  aux: 'prev → <b>null</b>',          // small caption under the list (HTML)
  note: '...'
}
```
**Pointers always use the field `i`** (index/position), in every scene kind.

### 4. `stack` — vertical, bottom → top
```js
{ kind: 'stack', label: 'call stack', items: ['main()', 'foo()', 'bar()'],   // items[0] = bottom
  pointers: [ { i: 2, label: 'top', tone: 'yellow' } ],
  highlights: { active: [2], insert: [3], remove: [2], dim: [0] },
  aux: [ { label: 'output', items: ['a','b'], highlights: { active: [1] } } ],
  note: 'Last In, First Out.' }
```

### 5. `queue` — horizontal, front (left) → rear (right)
```js
{ kind: 'queue', label: 'queue', items: ['A','B','C'],
  pointers: [ { i: 0, label: 'front', tone: 'cyan' }, { i: 2, label: 'rear', tone: 'yellow' } ],
  highlights: { active: [1], insert: [3], remove: [0], dim: [] },
  emptyText: 'queue is empty',
  note: '...' }
```

### 6. `tree` — binary tree / BST
```js
{
  kind: 'tree',
  label: 'BST',
  root: { v: 8, l: { v: 3, r: { v: 6 } }, r: { v: 10, r: { v: 14 } } },   // nested: v / l / r (or value / left / right)
  highlights: {                    // values OR auto ids ("root", "rootL", "rootLR" …)
    current: 3,                    // yellow + ring pulse (one node)
    path: [8, 3],                  // green — the path from the root
    visited: [8, 10],              // green outline — already processed
    frontier: [6],                 // dashed cyan — waiting in the queue/stack
    active: [6],                   // cyan filled
    insert: 6,                     // green pop-in (new node)
    remove: 6,                     // dashed red
    reject: 14,                    // red dashed — rule said no
    dim: [10]                      // faded
  },
  showWeights: false,
  note: 'BST rule: smaller values go **left**.'
}
```

### 7. `graph`
```js
{
  kind: 'graph',
  directed: false,                  // default false; per-edge: { from:'A', to:'B', w: 4, directed: true }
  nodes: ['A', 'B', 'C'],           // or [{ id:'A', label:'A' }, …]
  edges: [ { from: 'A', to: 'B', w: 4 }, { from: 'A', to: 'C' } ],
  pos: { A: { x: 80, y: 60 } },     // optional custom positions (default: circle)
  highlights: {
    current: 'B',                   // yellow + pulse
    visited: ['A'],                 // green
    frontier: ['C'],                // dashed cyan — about to be processed
    path: ['A', 'B'],               // green filled
    active: ['C'],                  // cyan filled
    reject: 'D', dim: ['E']
  },
  activeEdges: [['A','B']],         // edges drawn thick cyan
  pathEdges:   [['B','C']],         // thick green
  frontierEdges: [['A','C']],       // dashed yellow
  dimEdges:    [['C','D']],         // faded
  edgeState: { 'A-B': 'path' },     // fine control: tree|active|path|frontier|dim|done
  showWeights: true,
  note: '...'
}
```

### 8. `hash` — hash table with chaining
```js
{
  kind: 'hash',
  formula: 'len("cat") % 7',        // shown as: h(key) = [box] → [result]
  formulaResult: '3',
  indexLabel: 'Bucket',
  valueLabel: 'Key → Value (chain)',
  buckets: [
    { i: 0, state: '',   entries: [ { k: 'sun', v: 1 } ] },          // state: active|hit|miss
    { i: 3, state: 'active', entries: [ { k: 'cat', v: 7, state: 'new' }, { k: 'dog', v: 3, state: 'col' } ] },
    // entry state: new (yellow) | col (orange collision) | probe (cyan) | remove (red struck) | none (green)
    { i: 4, probe: 'cat?' }          // optional probing box
  ],
  note: '...'
}
```

### 9. `cards` — real-life story cards (great for step 1 and analogies)
```js
{
  kind: 'cards',
  label: 'Real life',
  cards: [
    { icon: '📖', title: 'Book pages', desc: 'Page 120 is exactly 120 steps from the start.', state: 'active', tag: 'array', accent: 'var(--cyan)' },
    // state: active (lifted yellow) | ok (green) | bad (red) | dim (faded)
    { icon: '🎫', title: 'Queue', desc: 'First in line is served first.', state: 'ok' }
  ],
  note: '...'
}
```

### 10. `chart` — bar chart (Big-O growth, counters)
```js
{ kind: 'chart', label: 'Time vs size', unit: '', max: 16,
  items: [ { label: 'O(1)', v: 1, color: 'var(--green)', note: 'flat' }, { label: 'O(n)', v: 8 }, { label: 'O(n²)', v: 16 } ],
  note: '...' }
```

### 11. `none` — no drawing (concept-only step)
```js
{ kind: 'none', title: 'Read along', desc: 'This lesson is about ideas, not code.', note: '...' }
```

**Extra scene fields available on every kind:** `caption` (text pill at the bottom of the canvas, HTML ok) and `legend` (array of `{ label, color }` chips shown top-left, e.g. `[{ label:'compare', color:'var(--cyan)' }]`).

---

## Writing rules

1. **English = simple words.** Explain like to a smart friend who never coded. Short sentences. One idea per paragraph. Max 4 paragraphs per step.
2. **Bangla = natural Bangla**, not translation-ese. Keep English technical words in parentheses when Bangla speakers use them (`অ্যারে (array)`, `পয়েন্টার (pointer)`). Bengali script for the rest.
3. Use `**bold**` for the key term of the step and `` `code` `` for anything that looks like code.
4. Start with a real-life story (queue at a shop, stack of plates, phone book).
5. Every step's `scene` must show **exactly** what the text says (matching indexes/values!).
6. Use `line` so the pseudocode highlights the right line.
7. Never use `innerHTML`-breaking characters unescaped inside HTML attributes; plain text in `title`/`desc` is fine.
8. No lorem ipsum, no placeholders, no "TODO".
