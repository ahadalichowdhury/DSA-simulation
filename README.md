# AlgoSim — Data Structures & Algorithms, Visualized

A noob → pro learning app for **Data Structures & Algorithms**, built in the same
design language as [NetSim](https://netsim-six.vercel.app/):
dark & light mode, **English ↔ Bangla** toggle, a **left sidebar** of lessons,
a **right info panel**, and a bottom playback control bar.

Every lesson is a **step-by-step animation**: press ▶ Play and watch arrays,
linked lists, trees, graphs, hash tables and sorting algorithms move on the canvas
while the panel explains what just happened in plain words.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Learn

Open the app and use:

| Control | What it does |
|---|---|
| **Left sidebar** | 29 lessons in 10 chapters, with search and a progress bar |
| **▶ Play / ⏸** | auto-advance through the steps (speed slider 0.5×–3×) |
| **‹ ›** | step backwards / forwards |
| **Reset** | back to step 1 of the current lesson |
| **Right panel** | plain-language explanation, pseudocode with the active line, complexity badges, live variables |
| **EN / BN** | switch the whole interface and every lesson between English and Bangla |
| **☾ / ☀** | dark or light theme (remembered) |
| **Mark complete** | tick a lesson as finished (also happens automatically at the last step) |

Keyboard: `←` `→` step · `Space` play/pause · `R` reset · `T` theme · `L` language.

## Chapters (noob → pro)

1. **Start Here** — what DSA is, Big-O in plain words
2. **Arrays & Strings** — indexing, two pointers, sliding window
3. **Searching** — linear search, binary search
4. **Sorting** — selection, bubble, insertion, merge, quick
5. **Linked Lists** — the chain, reversing, Floyd's cycle detection
6. **Stacks & Queues** — LIFO and FIFO with real-life stories
7. **Hashing** — hash tables, sets and maps
8. **Trees & BST** — traversals, search trees, heaps
9. **Graphs** — basics, BFS, DFS, Dijkstra
10. **Recursion & DP** — call stacks, memoization

## How the content works

- `src/data/SCHEMA.md` — the contract for a lesson (fields + every scene kind)
- `src/data/topics/*.js` — the lessons themselves: bilingual title, explanation,
  pseudocode, complexity and a **scene** per step
- `src/visuals/` — the renderer: `array`, `bars`, `linkedlist`, `stack`, `queue`,
  `tree`, `graph`, `hash`, `cards`, `chart`
- `scripts/validate.mjs` — schema validator (errors + warnings)
- `scripts/smoke.mjs` — SSR-renders every scene in EN and BN, so a broken
  scene crashes the script instead of the browser
- `scripts/qa-bn.mjs` — content QA: untranslated `bn` strings, empty steps,
  HTML in notes, duplicate step ids

```bash
npm run validate                      # schema check for every lesson file
node scripts/validate.mjs src/data/topics/sorting.js   # one file
npm run smoke                         # render every scene in both languages
npm run qa                            # all three gates, in order
```

### Adding a lesson

1. Create or edit a file in `src/data/topics/` exporting an array of topics
   (follow `SCHEMA.md`; copy `searching.js` as a template).
2. Register the export in `src/data/topics/index.js`.
3. Run `npm run qa`.

## Stack

Vite · React 18 · marked · lucide-react. No CSS framework — one stylesheet
(`src/App.css`) with CSS variables for the two themes.
