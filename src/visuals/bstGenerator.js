/**
 * BST Playground engine.
 *
 * Pure functions: given the current tree and an operation, return the
 * animation steps (same shape as hand-written lesson steps) plus the tree that
 * results. Trees are plain nested objects { v, l, r }; keys are unique numbers.
 *
 * Operations: build (from preorder / inorder / postorder / insert order),
 * search, insert, delete, update (= delete + insert) and traverse.
 */

const B = (en, bn) => ({ en, bn });

/* ======================= tree helpers ======================= */

export function clone(n) {
  if (!n) return null;
  const c = { v: n.v, l: clone(n.l), r: clone(n.r) };
  if (n.sub != null) c.sub = n.sub;
  return c;
}

function insertKey(root, v) {
  if (!root) return { v };
  if (v < root.v) root.l = insertKey(root.l, v);
  else if (v > root.v) root.r = insertKey(root.r, v);
  return root;
}

function deleteKey(root, v) {
  if (!root) return null;
  if (v < root.v) root.l = deleteKey(root.l, v);
  else if (v > root.v) root.r = deleteKey(root.r, v);
  else {
    if (!root.l) return root.r;
    if (!root.r) return root.l;
    let s = root.r;
    while (s.l) s = s.l;
    root.v = s.v;
    root.r = deleteKey(root.r, s.v);
  }
  return root;
}

export function inorder(n, out = []) {
  if (n) { inorder(n.l, out); out.push(n.v); inorder(n.r, out); }
  return out;
}
export function preorder(n, out = []) {
  if (n) { out.push(n.v); preorder(n.l, out); preorder(n.r, out); }
  return out;
}
export function postorder(n, out = []) {
  if (n) { postorder(n.l, out); postorder(n.r, out); out.push(n.v); }
  return out;
}
function height(n) {
  return n ? 1 + Math.max(height(n.l), height(n.r)) : 0;
}
function values(n) {
  return inorder(n);
}
function has(root, v) {
  let n = root;
  while (n) {
    if (v === n.v) return true;
    n = v < n.v ? n.l : n.r;
  }
  return false;
}

function subtreeVals(n) {
  return n ? values(n) : [];
}

/* ======================= input parsing / validation ======================= */

/** Parse "50, 30 70" into numbers. Returns { values, error }. */
export function parseValues(str) {
  const parts = String(str || '').split(/[\s,]+/).map((s) => s.trim()).filter(Boolean);
  if (!parts.length) return { values: [], error: B('Type at least one number.', 'অন্তত একটা সংখ্যা লেখো।') };
  const bad = parts.find((p) => !/^-?\d+(\.\d+)?$/.test(p));
  if (bad) return { values: [], error: B(`"${bad}" is not a number. Use numbers like 50, 30, 70.`, `"${bad}" সংখ্যা নয়। 50, 30, 70 এর মতো সংখ্যা দাও।`) };
  const vals = parts.map(Number);
  if (vals.length > 31) return { values: [], error: B('Please use 31 values or fewer so the tree fits on screen.', 'ট্রি স্ক্রিনে আঁটাতে ৩১টা বা কম মান দাও।') };
  const seen = new Set();
  for (const v of vals) {
    if (seen.has(v)) return { values: [], error: B(`${v} appears twice. A BST keeps every key unique.`, `${v} দুবার আছে। BST-তে প্রতিটা কী একবারই থাকে।`) };
    seen.add(v);
  }
  return { values: vals, error: null };
}

/** Order in which keys get inserted for each build mode, or an error. */
export function planBuild(vals, mode) {
  if (mode === 'inorder') {
    for (let i = 1; i < vals.length; i++) {
      if (vals[i] <= vals[i - 1]) {
        return {
          error: B(
            `An inorder list of a BST is always sorted (small → big), but ${vals[i - 1]} comes before ${vals[i]}. Sort it, or pick "Insert order".`,
            `BST-র ইন-অর্ডার লিস্ট সবসময় ছোট → বড় সাজানো থাকে, কিন্তু এখানে ${vals[i - 1]} এর পরে ${vals[i]}। সাজিয়ে দাও, অথবা "ইনসার্ট ক্রম" বেছে নাও।`
          )
        };
      }
    }
    return { order: vals, error: null };
  }
  const order = mode === 'postorder' ? [...vals].reverse() : vals;
  if (mode === 'preorder' || mode === 'postorder') {
    let root = null;
    order.forEach((v) => { root = insertKey(root, v); });
    const got = mode === 'preorder' ? preorder(root) : postorder(root);
    if (got.join(',') !== vals.join(',')) {
      const rule = mode === 'preorder'
        ? B('In a BST preorder the root comes first, then ALL smaller keys, then ALL bigger keys.', 'BST প্রি-অর্ডারে আগে রুট, তারপর সব ছোট কী, তারপর সব বড় কী।')
        : B('In a BST postorder ALL smaller keys come first, then ALL bigger keys, and the root comes last.', 'BST পোস্ট-অর্ডারে আগে সব ছোট কী, তারপর সব বড় কী, আর রুট সবার শেষে।');
      return {
        error: B(
          `This list is not the ${mode} of any BST. ${rule.en} (Closest valid ${mode}: ${got.join(', ')}.) Or pick "Insert order".`,
          `এই লিস্ট কোনো BST-র ${mode === 'preorder' ? 'প্রি-অর্ডার' : 'পোস্ট-অর্ডার'} নয়। ${rule.bn} (কাছাকাছি সঠিক: ${got.join(', ')}।) অথবা "ইনসার্ট ক্রম" বেছে নাও।`
        )
      };
    }
  }
  return { order, error: null };
}

/** Quick check used by the toolbar before running an operation. */
export function checkOp(root, op) {
  const num = (x) => (x === '' || x == null || !/^-?\d+(\.\d+)?$/.test(String(x).trim()) ? null : Number(x));
  if (op.type === 'build') {
    const { values: vals, error } = parseValues(op.input);
    if (error) return error;
    return planBuild(vals, op.mode).error;
  }
  if (op.type === 'traverse') return root ? null : B('The tree is empty. Insert or build first.', 'ট্রি খালি। আগে ইনসার্ট বা বিল্ড করো।');
  const k = num(op.key);
  if (k == null) return B('Type a number first.', 'আগে একটা সংখ্যা লেখো।');
  if (op.type === 'update') {
    const nv = num(op.newKey);
    if (nv == null) return B('Type the new number too.', 'নতুন সংখ্যাটাও লেখো।');
    if (!has(root, k)) return B(`${k} is not in the tree, so there is nothing to update.`, `${k} ট্রিতে নেই, তাই আপডেট করার কিছু নেই।`);
    if (k === nv) return B('The new value is the same as the old one.', 'নতুন মান আর পুরোনো মান একই।');
    if (has(root, nv)) return B(`${nv} is already in the tree. A BST keeps keys unique.`, `${nv} আগেই ট্রিতে আছে। BST-তে কী একবারই থাকে।`);
  }
  if (op.type === 'insert' && height(root) >= 9 && !has(root, k)) {
    return B('The tree is very tall already — reset or rebuild it to keep it readable.', 'ট্রি অনেক উঁচু হয়ে গেছে — পড়ার সুবিধার জন্য রিসেট বা নতুন করে বানাও।');
  }
  return null;
}

/* ======================= frame helpers ======================= */
/*
 * Every step is one animation frame of kind 'bst' (drawn by BstAnimVisual)
 * AND one executed line of code: `line` names the tagged line that runs
 * (see bstCode.js), so the code panel steps through the program like a
 * debugger while the cursor moves through the tree.
 */

function frame(root, o = {}) {
  return { kind: 'bst', root: clone(root), ...o };
}

/** Edges [parent, child] along a root-to-node path of values. */
function litEdges(path) {
  const out = [];
  for (let i = 1; i < path.length; i++) out.push([path[i - 1], path[i]]);
  return out;
}

function statesOf(map) {
  const st = {};
  for (const [state, vals] of Object.entries(map)) for (const v of [].concat(vals ?? [])) if (v != null) st[v] = state;
  return st;
}

function summaryState(root) {
  return { size: values(root).length, height: height(root), inorder: inorder(root) };
}

const fmt = (arr) => (arr.length ? arr.join(', ') : '—');
const yes = (b) => B(b ? 'true' : 'false', b ? 'সত্য' : 'মিথ্যা');
const sideName = (s) => (s === 'l' ? B('left', 'বাম') : B('right', 'ডান'));

function finish(steps, label) {
  steps.forEach((s, i) => {
    s.iteration = { i: i + 1, of: steps.length, label };
  });
  return steps;
}

/** Glue an optional "Part 1 · delete" prefix onto a title. */
const titled = (prefix, b) => (prefix ? B(`${prefix.en} · ${b.en}`, `${prefix.bn} · ${b.bn}`) : b);

function summaryStep(root, title, extraText, line = ['done']) {
  const io = inorder(root);
  return {
    title,
    explanation: B(
      `${extraText ? `${extraText.en}\n\n` : ''}**Check the BST rule:** the inorder list must be sorted.\n\n- inorder: \`${fmt(io)}\` ✓ sorted\n- preorder: \`${fmt(preorder(root))}\`\n- postorder: \`${fmt(postorder(root))}\`\n\nSize **${io.length}**, height **${height(root)}**.`,
      `${extraText ? `${extraText.bn}\n\n` : ''}**BST নিয়ম যাচাই:** ইন-অর্ডার লিস্ট সাজানো থাকতে হবে।\n\n- ইন-অর্ডার: \`${fmt(io)}\` ✓ সাজানো\n- প্রি-অর্ডার: \`${fmt(preorder(root))}\`\n- পোস্ট-অর্ডার: \`${fmt(postorder(root))}\`\n\nনোড **${io.length}**টি, উচ্চতা **${height(root)}**।`
    ),
    line,
    state: summaryState(root),
    scene: frame(root, {
      states: {},
      output: io,
      outputLabel: B('Inorder (always sorted in a BST):', 'ইন-অর্ডার (BST-তে সবসময় সাজানো):'),
      status: B('Done ✓ — every left child is smaller, every right child is bigger.', 'শেষ ✓ — প্রতিটা বাম চাইল্ড ছোট, প্রতিটা ডান চাইল্ড বড়।')
    })
  };
}

/* ======================= traced INSERT ======================= */
/*
 * insert(root, value) runs:  ifNull → ifLess → [goLeft] → ifGreater → [goRight]
 * → … at an empty spot: ifNull (true) → newNode → back up: ret.
 * opts: { tag: line-name prefix ('i_' inside update), prefix: title prefix,
 *         extra: extra scene fields (Create's pending queue), keep: extra node states,
 *         showReturn: add the final "return root" step }
 */
function traceInsert(root, key, opts = {}) {
  const tag = opts.tag || '';
  const T = (b) => titled(opts.prefix, b);
  const extra = opts.extra || {};
  const keep = opts.keep || {};
  const steps = [];
  const path = [];
  const L = (n) => [`${tag}${n}`];
  let n = root;
  let side = null;
  const scene = (o) => frame(root, { ...extra, keyBadge: key, ...o });
  const states = (more) => statesOf({ path: path.slice(0, -1), ...keep, ...more });

  while (n) {
    path.push(n.v);
    const lit = litEdges(path);
    steps.push({
      title: T(B(`root = ${n.v}: is it empty? No`, `root = ${n.v}: খালি? না`)),
      explanation: B(
        `The call is at node **${n.v}**. \`root == null\` is **false**, so this is not an empty spot yet — next we check which side **${key}** belongs to.`,
        `কলটা এখন নোড **${n.v}**-এ। \`root == null\` **মিথ্যা**, তাই এটা এখনো খালি জায়গা নয় — এরপর দেখি **${key}** কোন দিকে যাবে।`
      ),
      line: L('ifNull'),
      state: { value: key, 'root.data': n.v, 'root == null': false },
      scene: scene({ cursor: n.v, lit, states: states({ cmp: n.v }), status: B(`root is <b>${n.v}</b> → not empty`, `root হলো <b>${n.v}</b> → খালি নয়`) })
    });
    const less = key < n.v;
    steps.push({
      title: T(B(`Is ${key} < ${n.v}? ${less ? 'Yes' : 'No'}`, `${key} < ${n.v}? ${less ? 'হ্যাঁ' : 'না'}`)),
      explanation: less
        ? B(`\`value < root.data\` → **${key} < ${n.v}** is **true**, so ${key} belongs in the **left** subtree of ${n.v}.`, `\`value < root.data\` → **${key} < ${n.v}** **সত্য**, তাই ${key} যাবে ${n.v}-এর **বাম** সাব-ট্রিতে।`)
        : B(`\`value < root.data\` → **${key} < ${n.v}** is **false**, so ${key} does not go left. The next condition is checked.`, `\`value < root.data\` → **${key} < ${n.v}** **মিথ্যা**, তাই ${key} বামে যাবে না। পরের শর্ত দেখা হয়।`),
      line: L('ifLess'),
      state: { value: key, 'root.data': n.v, 'value < root.data': less },
      scene: scene({ cursor: n.v, lit, states: states({ cmp: n.v }), status: B(`${key} &lt; ${n.v} → <b>${yes(less).en}</b>`, `${key} &lt; ${n.v} → <b>${yes(less).bn}</b>`) })
    });
    let dir = less ? 'l' : null;
    if (!less) {
      const greater = key > n.v;
      steps.push({
        title: T(B(`Is ${key} > ${n.v}? ${greater ? 'Yes' : 'No'}`, `${key} > ${n.v}? ${greater ? 'হ্যাঁ' : 'না'}`)),
        explanation: greater
          ? B(`\`value > root.data\` → **${key} > ${n.v}** is **true**, so ${key} belongs in the **right** subtree of ${n.v}.`, `\`value > root.data\` → **${key} > ${n.v}** **সত্য**, তাই ${key} যাবে ${n.v}-এর **ডান** সাব-ট্রিতে।`)
          : B(`\`value > root.data\` is **false** too, so **${key} equals ${n.v}**: the value is already in the tree. Nothing is inserted.`, `\`value > root.data\`-ও **মিথ্যা**, তাই **${key} = ${n.v}**: মানটা আগেই আছে। কিছু ইনসার্ট হয় না।`),
        line: L('ifGreater'),
        state: { value: key, 'root.data': n.v, 'value > root.data': greater },
        scene: scene({ cursor: n.v, lit, states: states({ cmp: n.v }), status: B(`${key} &gt; ${n.v} → <b>${yes(greater).en}</b>`, `${key} &gt; ${n.v} → <b>${yes(greater).bn}</b>`) })
      });
      if (!greater) {
        steps.push({
          title: T(B(`${key} already exists → return root`, `${key} আগেই আছে → root ফেরত`)),
          explanation: B(`Equal values are not stored twice. The function skips both branches and just **returns root**, so the tree does not change.`, `সমান মান দুবার রাখা হয় না। ফাংশন দুটো শাখাই বাদ দিয়ে শুধু **root ফেরত দেয়**, তাই ট্রি বদলায় না।`),
          line: [...L('equal'), ...L('ret')],
          state: { value: key, inserted: false },
          scene: scene({ cursor: n.v, lit, states: states({ found: n.v }), status: B(`<b>${key}</b> already in the tree → nothing to insert`, `<b>${key}</b> আগেই ট্রিতে → ইনসার্ট করার কিছু নেই`) })
        });
        return { steps, result: root, path, found: true };
      }
      dir = 'r';
    }
    const child = n[dir];
    const childName = sideName(dir);
    steps.push({
      title: T(B(`Call insert(root.${dir === 'l' ? 'left' : 'right'}, ${key})`, `insert(root.${dir === 'l' ? 'left' : 'right'}, ${key}) কল`)),
      explanation: child
        ? B(`The function calls itself on the **${childName.en}** child of ${n.v}, which is **${child.v}**. The cursor moves down the edge.`, `ফাংশন নিজেকে ${n.v}-এর **${childName.bn}** চাইল্ড **${child.v}**-এর ওপর কল করে। কার্সর এজ ধরে নিচে নামে।`)
        : B(`The function calls itself on the **${childName.en}** child of ${n.v} — but that child is **null** (an empty spot).`, `ফাংশন নিজেকে ${n.v}-এর **${childName.bn}** চাইল্ডের ওপর কল করে — কিন্তু সেটা **null** (খালি জায়গা)।`),
      line: L(dir === 'l' ? 'goLeft' : 'goRight'),
      state: { value: key, 'root.data': n.v, next: child ? child.v : 'null' },
      scene: scene({
        cursor: child ? child.v : n.v,
        lit: child ? litEdges([...path, child.v]) : lit,
        states: states({ path: n.v }),
        subs: child ? {} : { [n.v]: dir === 'l' ? '↙ null' : '↘ null' },
        status: B(`go ${childName.en} → insert(${child ? child.v : 'null'}, ${key})`, `${childName.bn}ে যাও → insert(${child ? child.v : 'null'}, ${key})`)
      })
    });
    side = dir;
    n = child;
  }

  // reached an empty spot
  const parent = path[path.length - 1];
  steps.push({
    title: T(B('root is null → empty spot!', 'root null → খালি জায়গা!')),
    explanation: parent == null
      ? B(`The tree is empty, so \`root == null\` is **true** right away. This is where **${key}** goes.`, `ট্রি খালি, তাই \`root == null\` সাথে সাথেই **সত্য**। **${key}** এখানেই বসবে।`)
      : B(`Inside this call \`root == null\` is **true**: the ${sideName(side).en} spot of **${parent}** is empty. This is where **${key}** goes.`, `এই কলের ভেতরে \`root == null\` **সত্য**: **${parent}**-এর ${sideName(side).bn} জায়গা খালি। **${key}** এখানেই বসবে।`),
    line: L('ifNull'),
    state: { value: key, 'root == null': true },
    scene: scene({
      cursor: parent,
      lit: litEdges(path),
      states: states({ path: parent }),
      subs: parent != null ? { [parent]: side === 'l' ? '↙ null' : '↘ null' } : {},
      status: B('<b>root == null</b> → empty spot found', '<b>root == null</b> → খালি জায়গা পাওয়া গেছে')
    })
  });
  const result = insertKey(clone(root), key);
  steps.push({
    title: T(B(`return new Node(${key})`, `new Node(${key}) ফেরত`)),
    explanation: parent == null
      ? B(`A new node **${key}** is created and returned — it becomes the **root** of the tree.`, `নতুন নোড **${key}** তৈরি হয়ে ফেরত যায় — এটা ট্রির **রুট** হয়।`)
      : B(`A new node **${key}** is created and returned. Back in the caller, \`root.${side === 'l' ? 'left' : 'right'} = …\` stores it as the ${sideName(side).en} child of **${parent}**.`, `নতুন নোড **${key}** তৈরি হয়ে ফেরত যায়। কলারে \`root.${side === 'l' ? 'left' : 'right'} = …\` এটাকে **${parent}**-এর ${sideName(side).bn} চাইল্ড হিসেবে রাখে।`),
    line: L('newNode'),
    state: { value: key, created: key },
    scene: frame(result, { ...extra, cursor: key, lit: litEdges([...path, key]), states: statesOf({ path, ...keep, new: key }), status: B(`new node <b>${key}</b> created`, `নতুন নোড <b>${key}</b> তৈরি`) })
  });
  if (opts.showReturn && path.length) {
    steps.push({
      title: T(B('Every call returns root', 'প্রতিটা কল root ফেরত দেয়')),
      explanation: B(`Each waiting call runs \`return root;\` on the way back up (${[...path].reverse().join(' → ')}). No other link changed — only the one pointing to **${key}**.`, `অপেক্ষায় থাকা প্রতিটা কল ফেরার পথে \`return root;\` চালায় (${[...path].reverse().join(' → ')})। শুধু **${key}**-এর দিকের লিংকটা নতুন, আর কিছু বদলায়নি।`),
      line: L('ret'),
      state: { value: key, returnsTo: path[0] },
      scene: frame(result, { ...extra, cursor: path[0], lit: litEdges([...path, key]), states: statesOf({ path, ...keep, new: key }), status: B('calls return back up to the root', 'কলগুলো ফিরে রুট পর্যন্ত যায়') })
    });
  }
  return { steps, result, path, side, found: false };
}

/* ======================= BUILD (Create) ======================= */

const MODE_NAME = {
  preorder: B('preorder', 'প্রি-অর্ডার'),
  inorder: B('inorder', 'ইন-অর্ডার'),
  postorder: B('postorder', 'পোস্ট-অর্ডার'),
  insert: B('insert order', 'ইনসার্ট ক্রম')
};

function midOrder(sorted) {
  const out = [];
  (function rec(lo, hi) {
    if (lo > hi) return;
    const mid = Math.floor((lo + hi) / 2);
    out.push(sorted[mid]);
    rec(lo, mid - 1);
    rec(mid + 1, hi);
  })(0, sorted.length - 1);
  return out;
}

function genBuild(input, mode) {
  const { values: vals } = parseValues(input);
  const { order } = planBuild(vals, mode);
  const queue = mode === 'inorder' ? midOrder(vals) : order;
  const mName = MODE_NAME[mode] || MODE_NAME.insert;
  const pend = (i, now = true) => ({ pending: queue, pendingIndex: now ? i : queue.length + 1 });
  const steps = [];

  const why = {
    preorder: B(`It is a **preorder** list, so the first value (**${vals[0]}**) is the root. Inserting the values in this same order rebuilds exactly that tree.`, `এটা **প্রি-অর্ডার** লিস্ট, তাই প্রথম মান (**${vals[0]}**) রুট। এই ক্রমেই ইনসার্ট করলে ঠিক সেই ট্রিটা তৈরি হয়।`),
    postorder: B(`It is a **postorder** list, so the root (**${vals[vals.length - 1]}**) is last. We insert from the end: \`${fmt(queue)}\`.`, `এটা **পোস্ট-অর্ডার** লিস্ট, তাই রুট (**${vals[vals.length - 1]}**) সবার শেষে। আমরা শেষ থেকে ইনসার্ট করি: \`${fmt(queue)}\`।`),
    inorder: B(`It is a sorted (**inorder**) list. To get a balanced tree we insert the middle values first: \`${fmt(queue)}\`.`, `এটা সাজানো (**ইন-অর্ডার**) লিস্ট। ব্যালান্সড ট্রি পেতে আগে মাঝের মানগুলো ইনসার্ট করি: \`${fmt(queue)}\`।`),
    insert: B(`We insert the values **one by one, in this order**: \`${fmt(queue)}\`.`, `আমরা মানগুলো **এই ক্রমে একে একে** ইনসার্ট করি: \`${fmt(queue)}\`।`)
  }[mode] || B('', '');

  steps.push({
    title: B('Start: root = null', 'শুরু: root = null'),
    explanation: B(`Creating a BST is just calling **insert()** once per value.\n\n${why.en}\n\nFirst \`main()\` starts with an **empty tree**.`, `BST তৈরি মানে প্রতিটা মানের জন্য একবার **insert()** কল করা।\n\n${why.bn}\n\nপ্রথমে \`main()\` একটা **খালি ট্রি** দিয়ে শুরু করে।`),
    line: ['rootNull'],
    state: { order: mName.en, values: queue.length },
    scene: frame(null, { ...pend(0), keyBadge: queue[0], status: B('root = <b>null</b> — the tree is empty', 'root = <b>null</b> — ট্রি খালি') })
  });

  let root = null;
  queue.forEach((v, i) => {
    steps.push({
      title: B(`main(): root = insert(root, ${v})`, `main() কল করে: root = insert(root, ${v})`),
      explanation: B(`\`main()\` calls **insert(root, ${v})** — value ${i + 1} of ${queue.length}. The call starts at the ${root ? `root (**${root.v}**)` : 'empty root'} and walks down.`, `\`main()\` কল করে **insert(root, ${v})** — ${queue.length}টির মধ্যে ${i + 1} নম্বর মান। কলটা ${root ? `রুট (**${root.v}**)` : 'খালি রুট'} থেকে শুরু হয়ে নিচে নামে।`),
      line: [`put${i}`],
      state: { value: v, inserted: i },
      scene: frame(root, { ...pend(i), keyBadge: v, cursor: root ? root.v : null, states: {}, status: B(`insert(root, <b>${v}</b>)`, `insert(root, <b>${v}</b>) কল`) })
    });
    const t = traceInsert(root, v, { extra: pend(i), prefix: B(`insert ${v}`, `${v} ইনসার্ট`) });
    steps.push(...t.steps);
    root = t.result;
  });

  const check = mode === 'preorder' ? preorder(root) : mode === 'postorder' ? postorder(root) : inorder(root);
  const sum = summaryStep(
    root,
    B('Tree created ✓', 'ট্রি তৈরি ✓'),
    mode === 'insert' ? null : B(`Read the finished tree in **${mName.en}** and you get \`${fmt(check)}\` — exactly your list ✓`, `বানানো ট্রিটা **${mName.bn}** ক্রমে পড়লে পাই \`${fmt(check)}\` — হুবহু তোমার লিস্ট ✓`)
  );
  sum.scene = { ...sum.scene, ...pend(queue.length, false) };
  steps.push(sum);
  return { steps: finish(steps, B('Create', 'তৈরি')), result: root, queue, mode };
}

/* ======================= traced SEARCH ======================= */

function traceSearch(root, key) {
  const steps = [];
  const path = [];
  const skipped = [];
  let n = root;
  const scene = (o) => frame(root, { keyBadge: key, ...o });
  const st = (more) => statesOf({ path: path.slice(0, -1), dim: [...skipped], ...more });
  for (;;) {
    if (!n) {
      const last = path[path.length - 1];
      steps.push({
        title: B('while (root != null) → false', 'while (root != null) → মিথ্যা'),
        explanation: B(`\`root\` is now **null** — we walked off the tree${last != null ? ` below **${last}**` : ''}. The loop condition is **false**, so the loop ends.`, `\`root\` এখন **null** — আমরা ট্রি থেকে বেরিয়ে গেছি${last != null ? ` (**${last}**-এর নিচে)` : ''}। লুপের শর্ত **মিথ্যা**, তাই লুপ শেষ।`),
        line: ['whileCheck'],
        state: { value: key, 'root != null': false },
        scene: scene({ cursor: last, lit: litEdges(path), states: st({ bad: last }), status: B('root is <b>null</b> → loop ends', 'root <b>null</b> → লুপ শেষ') })
      });
      steps.push({
        title: B(`return null → ${key} not found`, `null ফেরত → ${key} নেই`),
        explanation: B(`If **${key}** were in the tree it would have been on this path. So the function returns **null**: not found. We checked only ${path.length} node${path.length === 1 ? '' : 's'}.`, `**${key}** থাকলে এই পথেই থাকত। তাই ফাংশন **null** ফেরত দেয়: পাওয়া যায়নি। দেখা হয়েছে মাত্র ${path.length}টি নোড।`),
        line: ['notFound'],
        state: { value: key, found: false, checked: path.length },
        scene: scene({ cursor: last, lit: litEdges(path), states: st({ bad: last }), status: B(`<b>${key}</b> not found`, `<b>${key}</b> পাওয়া যায়নি`) })
      });
      return { steps, found: false, path };
    }
    path.push(n.v);
    const lit = litEdges(path);
    steps.push({
      title: B(`while (root != null) → true (root = ${n.v})`, `while (root != null) → সত্য (root = ${n.v})`),
      explanation: B(`\`root\` points to **${n.v}**, which is not null, so the loop body runs.`, `\`root\` দেখাচ্ছে **${n.v}**-কে, যেটা null নয়, তাই লুপের ভেতরটা চলে।`),
      line: ['whileCheck'],
      state: { value: key, 'root.data': n.v, 'root != null': true },
      scene: scene({ cursor: n.v, lit, states: st({ cmp: n.v }), status: B(`root = <b>${n.v}</b> → keep looking`, `root = <b>${n.v}</b> → খোঁজা চলবে`) })
    });
    const eq = key === n.v;
    steps.push({
      title: B(`Is ${key} == ${n.v}? ${eq ? 'Yes' : 'No'}`, `${key} == ${n.v}? ${eq ? 'হ্যাঁ' : 'না'}`),
      explanation: eq ? B(`\`value == root.data\` → **${key} == ${n.v}** is **true**. Found it!`, `\`value == root.data\` → **${key} == ${n.v}** **সত্য**। পেয়ে গেছি!`) : B(`\`value == root.data\` → **${key} == ${n.v}** is **false**. Not this node — decide which way to go.`, `\`value == root.data\` → **${key} == ${n.v}** **মিথ্যা**। এই নোড নয় — কোন দিকে যাবে ঠিক করো।`),
      line: ['ifEq'],
      state: { value: key, 'root.data': n.v, 'value == root.data': eq },
      scene: scene({ cursor: n.v, lit, states: st({ [eq ? 'found' : 'cmp']: n.v }), status: B(`${key} == ${n.v} → <b>${yes(eq).en}</b>`, `${key} == ${n.v} → <b>${yes(eq).bn}</b>`) })
    });
    if (eq) {
      steps.push({
        title: B(`return root → found ${key} ✓`, `root ফেরত → ${key} পাওয়া গেছে ✓`),
        explanation: B(`The function returns this node. It took **${path.length}** comparison${path.length === 1 ? '' : 's'} — the work depends on the tree's height, **O(h)**, not on how many nodes it has.`, `ফাংশন এই নোডটা ফেরত দেয়। তুলনা লেগেছে **${path.length}** বার — কাজ নির্ভর করে ট্রির উচ্চতার ওপর, **O(h)**, নোডের সংখ্যার ওপর নয়।`),
        line: ['retFound'],
        state: { value: key, found: true, compares: path.length },
        scene: scene({ cursor: n.v, lit, states: st({ found: n.v }), status: B(`found <b>${key}</b> · path ${path.join(' → ')}`, `<b>${key}</b> পাওয়া গেছে · পথ ${path.join(' → ')}`) })
      });
      return { steps, found: true, path };
    }
    const less = key < n.v;
    const dir = less ? 'l' : 'r';
    const child = n[dir];
    steps.push({
      title: B(`Is ${key} < ${n.v}? ${less ? 'Yes' : 'No'}`, `${key} < ${n.v}? ${less ? 'হ্যাঁ' : 'না'}`),
      explanation: less ? B(`**${key} < ${n.v}** is **true**: ${key} can only be in the left subtree. The whole right side is ignored.`, `**${key} < ${n.v}** **সত্য**: ${key} শুধু বাম সাব-ট্রিতে থাকতে পারে। পুরো ডান দিক বাদ।`) : B(`**${key} < ${n.v}** is **false**: so it must be bigger, and can only be in the right subtree. The whole left side is ignored.`, `**${key} < ${n.v}** **মিথ্যা**: তাই এটা বড়, শুধু ডান সাব-ট্রিতে থাকতে পারে। পুরো বাম দিক বাদ।`),
      line: ['ifLess'],
      state: { value: key, 'root.data': n.v, 'value < root.data': less },
      scene: scene({ cursor: n.v, lit, states: st({ cmp: n.v }), status: B(`${key} &lt; ${n.v} → <b>${yes(less).en}</b>`, `${key} &lt; ${n.v} → <b>${yes(less).bn}</b>`) })
    });
    skipped.push(...subtreeVals(less ? n.r : n.l));
    steps.push({
      title: B(`root = root.${less ? 'left' : 'right'} (${child ? child.v : 'null'})`, `root = root.${less ? 'left' : 'right'} (${child ? child.v : 'null'})`),
      explanation: child ? B(`\`root\` moves to the ${sideName(dir).en} child, **${child.v}**.`, `\`root\` ${sideName(dir).bn} চাইল্ড **${child.v}**-এ যায়।`) : B(`The ${sideName(dir).en} child of ${n.v} is **null**, so \`root\` becomes null.`, `${n.v}-এর ${sideName(dir).bn} চাইল্ড **null**, তাই \`root\` null হয়ে যায়।`),
      line: [less ? 'moveLeft' : 'moveRight'],
      state: { value: key, root: child ? child.v : 'null' },
      scene: scene({
        cursor: child ? child.v : n.v,
        lit: child ? litEdges([...path, child.v]) : lit,
        states: statesOf({ path: [...path], dim: [...skipped] }),
        subs: child ? {} : { [n.v]: less ? '↙ null' : '↘ null' },
        status: B(`move ${sideName(dir).en} → <b>${child ? child.v : 'null'}</b>`, `${sideName(dir).bn}ে যাও → <b>${child ? child.v : 'null'}</b>`)
      })
    });
    n = child;
  }
}

function genSearch(root, key) {
  const steps = [
    {
      title: B(`main(): search(root, ${key})`, `main() কল করে: search(root, ${key})`),
      explanation: B(`We want to know: **is ${key} in the tree?** \`search\` starts at the root and walks down one node at a time — at every node one comparison tells it which way to go.`, `জানতে চাই: **${key} কি ট্রিতে আছে?** \`search\` রুট থেকে শুরু করে এক এক নোড করে নামে — প্রতিটা নোডে একটা তুলনাই বলে দেয় কোন দিকে যাবে।`),
      line: ['call'],
      state: { value: key },
      scene: frame(root, { keyBadge: key, cursor: root ? root.v : null, states: {}, status: B(`search(root, <b>${key}</b>)`, `search(root, <b>${key}</b>) কল`) })
    }
  ];
  steps.push(...traceSearch(root, key).steps);
  return { steps: finish(steps, B('Search', 'খোঁজা')), result: root };
}

/* ======================= INSERT ======================= */

function genInsert(root, key) {
  const steps = [
    {
      title: B(`main(): root = insert(root, ${key})`, `main() কল করে: root = insert(root, ${key})`),
      explanation: B(`\`insert\` walks down from the root like a search, checking each condition, until it reaches an **empty spot** — the new node is created there. Existing nodes never move.`, `\`insert\` সার্চের মতো রুট থেকে নামে, প্রতিটা শর্ত দেখে, যতক্ষণ না একটা **খালি জায়গা** পায় — নতুন নোড সেখানে তৈরি হয়। আগের কোনো নোড সরে না।`),
      line: ['call'],
      state: { value: key },
      scene: frame(root, { keyBadge: key, cursor: root ? root.v : null, states: {}, status: B(`insert(root, <b>${key}</b>)`, `insert(root, <b>${key}</b>) কল`) })
    }
  ];
  const t = traceInsert(root, key, { showReturn: true });
  steps.push(...t.steps);
  if (!t.found) steps.push(summaryStep(t.result, B(`${key} inserted ✓`, `${key} ইনসার্ট হলো ✓`)));
  return { steps: finish(steps, B('Insert', 'ইনসার্ট')), result: t.result };
}

/* ======================= traced DELETE ======================= */
/*
 * The walk down (ifNull, ifLess/goLeft, ifGreater/goRight, found) is traced on
 * the tree as it is. The structural change happens once, so the final frame is
 * the tree after deleteKey(); nodes glide there in the animation.
 * view: the whole tree to draw; start: where this (possibly nested) call starts.
 */
function deleteWalk(view, start, key, ctx) {
  const { tag = '', prefix, keep = {}, subs = {}, litBefore = [] } = ctx;
  const T = (b) => titled(prefix, b);
  const L = (n) => [`${tag}${n}`];
  const steps = [];
  const path = [];
  let n = start;
  let side = null;
  let parent = null;
  const scene = (o) => frame(view, { keyBadge: key, subs, ...o });
  const st = (more) => statesOf({ path: path.slice(0, -1), ...keep, ...more });
  const lit = () => [...litBefore, ...litEdges(path)];
  while (n) {
    path.push(n.v);
    steps.push({
      title: T(B(`root = ${n.v}: is it null? No`, `root = ${n.v}: null? না`)),
      explanation: B(`The call is at **${n.v}**. \`root == null\` is **false**, so there is something here to look at.`, `কলটা **${n.v}**-এ। \`root == null\` **মিথ্যা**, তাই এখানে দেখার মতো কিছু আছে।`),
      line: L('ifNull'),
      state: { value: key, 'root.data': n.v, 'root == null': false },
      scene: scene({ cursor: n.v, lit: lit(), states: st({ cmp: n.v }), status: B(`root is <b>${n.v}</b>`, `root হলো <b>${n.v}</b>`) })
    });
    const less = key < n.v;
    steps.push({
      title: T(B(`Is ${key} < ${n.v}? ${less ? 'Yes' : 'No'}`, `${key} < ${n.v}? ${less ? 'হ্যাঁ' : 'না'}`)),
      explanation: less ? B(`**${key} < ${n.v}** is **true** → the value must be in the left subtree.`, `**${key} < ${n.v}** **সত্য** → মানটা বাম সাব-ট্রিতে আছে।`) : B(`**${key} < ${n.v}** is **false** → not on the left.`, `**${key} < ${n.v}** **মিথ্যা** → বামে নেই।`),
      line: L('ifLess'),
      state: { value: key, 'root.data': n.v, 'value < root.data': less },
      scene: scene({ cursor: n.v, lit: lit(), states: st({ cmp: n.v }), status: B(`${key} &lt; ${n.v} → <b>${yes(less).en}</b>`, `${key} &lt; ${n.v} → <b>${yes(less).bn}</b>`) })
    });
    let dir = less ? 'l' : null;
    if (!less) {
      const greater = key > n.v;
      steps.push({
        title: T(B(`Is ${key} > ${n.v}? ${greater ? 'Yes' : 'No'}`, `${key} > ${n.v}? ${greater ? 'হ্যাঁ' : 'না'}`)),
        explanation: greater ? B(`**${key} > ${n.v}** is **true** → the value must be in the right subtree.`, `**${key} > ${n.v}** **সত্য** → মানটা ডান সাব-ট্রিতে আছে।`) : B(`**${key} > ${n.v}** is **false** too → so **${key} == ${n.v}**. This is the node to delete!`, `**${key} > ${n.v}**-ও **মিথ্যা** → তাই **${key} == ${n.v}**। এটাই মোছার নোড!`),
        line: L('ifGreater'),
        state: { value: key, 'root.data': n.v, 'value > root.data': greater },
        scene: scene({ cursor: n.v, lit: lit(), states: st({ cmp: n.v }), status: B(`${key} &gt; ${n.v} → <b>${yes(greater).en}</b>`, `${key} &gt; ${n.v} → <b>${yes(greater).bn}</b>`) })
      });
      if (!greater) {
        steps.push({
          title: T(B(`else → found ${key}`, `else → ${key} পাওয়া গেছে`)),
          explanation: B(`Both comparisons failed, so the \`else\` block runs: **${n.v}** is the node to remove. What happens next depends on its children.`, `দুটো তুলনাই মিথ্যা, তাই \`else\` অংশ চলে: **${n.v}**-ই মোছার নোড। এরপর কী হবে তা নির্ভর করে এর চাইল্ডদের ওপর।`),
          line: L('found'),
          state: { value: key, found: n.v, children: (n.l ? 1 : 0) + (n.r ? 1 : 0) },
          scene: scene({ cursor: n.v, lit: lit(), states: st({ target: n.v }), status: B(`found <b>${n.v}</b> → remove it`, `<b>${n.v}</b> পাওয়া গেছে → মুছতে হবে`) })
        });
        return { steps, node: n, parent, side, path };
      }
      dir = 'r';
    }
    const child = n[dir];
    steps.push({
      title: T(B(`Call deleteNode(root.${dir === 'l' ? 'left' : 'right'}, ${key})`, `deleteNode(root.${dir === 'l' ? 'left' : 'right'}, ${key}) কল`)),
      explanation: child ? B(`The function calls itself on the ${sideName(dir).en} child, **${child.v}**.`, `ফাংশন নিজেকে ${sideName(dir).bn} চাইল্ড **${child.v}**-এর ওপর কল করে।`) : B(`The function calls itself on the ${sideName(dir).en} child — which is **null**.`, `ফাংশন নিজেকে ${sideName(dir).bn} চাইল্ডের ওপর কল করে — যেটা **null**।`),
      line: L(dir === 'l' ? 'goLeft' : 'goRight'),
      state: { value: key, next: child ? child.v : 'null' },
      scene: scene({ cursor: child ? child.v : n.v, lit: child ? [...litBefore, ...litEdges([...path, child.v])] : lit(), states: st({ path: n.v }), subs: child ? subs : { ...subs, [n.v]: dir === 'l' ? '↙ null' : '↘ null' }, status: B(`go ${sideName(dir).en}`, `${sideName(dir).bn}ে যাও`) })
    });
    parent = n;
    side = dir;
    n = child;
  }
  const last = path[path.length - 1];
  steps.push({
    title: T(B('root is null → nothing to delete', 'root null → মোছার কিছু নেই')),
    explanation: B(`Inside this call \`root == null\` is **true**. **${key}** was never in the tree, so the function returns **null** and every caller just returns its node unchanged.`, `এই কলের ভেতরে \`root == null\` **সত্য**। **${key}** কখনো ট্রিতে ছিল না, তাই ফাংশন **null** ফেরত দেয় আর প্রতিটা কলার নিজের নোড অপরিবর্তিত ফেরত দেয়।`),
    line: [...L('ifNull'), ...L('retNull')],
    state: { value: key, deleted: false },
    scene: scene({ cursor: last, lit: lit(), states: st({ bad: last }), status: B(`<b>${key}</b> not found → nothing deleted`, `<b>${key}</b> নেই → কিছু মোছা হয়নি`) })
  });
  return { steps, node: null, path };
}

function traceDelete(root, key, ctx = {}) {
  const { tag = '', prefix } = ctx;
  const T = (b) => titled(prefix, b);
  const L = (n) => [`${tag}${n}`];
  const w = deleteWalk(root, root, key, { tag, prefix });
  const steps = [...w.steps];
  if (!w.node) return { steps, result: root };

  const node = w.node;
  const result = deleteKey(clone(root), key);
  const pathLit = litEdges(w.path);
  const removedFrame = (title, expl, line, extraStates) => ({
    title: T(title),
    explanation: expl,
    line,
    state: { value: key, deleted: true },
    scene: frame(result, { states: extraStates || {}, status: B(`<b>${key}</b> deleted`, `<b>${key}</b> ডিলিট হলো`) })
  });

  // a) no left child?
  const noLeft = !node.l;
  steps.push({
    title: T(B(`root.left == null? ${noLeft ? 'Yes' : 'No'}`, `root.left == null? ${noLeft ? 'হ্যাঁ' : 'না'}`)),
    explanation: noLeft
      ? B(`**${key}** has **no left child**${node.r ? `, only a right child (**${node.r.v}**)` : ' and no right child either — it is a **leaf**'}. So the function returns \`root.right\`${node.r ? ` — **${node.r.v}** takes its place` : ' (null) — the node simply disappears'}.`, `**${key}**-এর **বাম চাইল্ড নেই**${node.r ? `, শুধু ডান চাইল্ড (**${node.r.v}**) আছে` : ', ডান চাইল্ডও নেই — এটা **লিফ**'}। তাই ফাংশন \`root.right\` ফেরত দেয়${node.r ? ` — **${node.r.v}** ওর জায়গা নেয়` : ' (null) — নোডটা শুধু মুছে যায়'}।`)
      : B(`**${key}** has a left child (**${node.l.v}**), so this case does not apply. Check the right side next.`, `**${key}**-এর বাম চাইল্ড (**${node.l.v}**) আছে, তাই এই কেস খাটে না। এরপর ডান দিক দেখো।`),
    line: L('ifNoLeft'),
    state: { value: key, 'root.left': node.l ? node.l.v : 'null' },
    scene: frame(root, { cursor: key, lit: pathLit, states: statesOf({ path: w.path.slice(0, -1), target: key, cmp: node.l ? node.l.v : null }), status: B(`left child of ${key} → <b>${node.l ? node.l.v : 'null'}</b>`, `${key}-এর বাম চাইল্ড → <b>${node.l ? node.l.v : 'null'}</b>`) })
  });
  if (noLeft) {
    steps.push({
      title: T(B(`return root.right (${node.r ? node.r.v : 'null'})`, `root.right ফেরত (${node.r ? node.r.v : 'null'})`)),
      explanation: B(`The function returns ${node.r ? `**${node.r.v}**` : '**null**'} to its caller, which stores it in place of **${key}**. Watch ${key} fade out${node.r ? ` and ${node.r.v} slide up` : ''}.`, `ফাংশন কলারকে ${node.r ? `**${node.r.v}**` : '**null**'} ফেরত দেয়, কলার সেটা **${key}**-এর জায়গায় রাখে। দেখো ${key} মিলিয়ে যাচ্ছে${node.r ? ` আর ${node.r.v} উপরে উঠছে` : ''}।`),
      line: L('retRight'),
      state: { value: key, returns: node.r ? node.r.v : 'null' },
      scene: frame(root, { cursor: key, lit: pathLit, states: statesOf({ path: w.path.slice(0, -1), remove: key, succ: node.r ? node.r.v : null }), status: B(`return <b>${node.r ? node.r.v : 'null'}</b>`, `<b>${node.r ? node.r.v : 'null'}</b> ফেরত`) })
    });
    steps.push(removedFrame(B(`${key} removed`, `${key} মুছে গেল`), B(`The parent now points to ${node.r ? `**${node.r.v}**` : 'nothing'}. **${key}** is gone and every other node stayed on its correct side.`, `প্যারেন্ট এখন ${node.r ? `**${node.r.v}**-কে` : 'কিছুই না'} দেখায়। **${key}** নেই, বাকি সব নোড সঠিক দিকে আছে।`), L('ret'), node.r ? { [node.r.v]: 'found' } : {}));
    return { steps, result };
  }

  // b) no right child?
  const noRight = !node.r;
  steps.push({
    title: T(B(`root.right == null? ${noRight ? 'Yes' : 'No'}`, `root.right == null? ${noRight ? 'হ্যাঁ' : 'না'}`)),
    explanation: noRight
      ? B(`**${key}** has only a left child (**${node.l.v}**), so the function returns \`root.left\` — **${node.l.v}** and its subtree move up.`, `**${key}**-এর শুধু বাম চাইল্ড (**${node.l.v}**) আছে, তাই ফাংশন \`root.left\` ফেরত দেয় — **${node.l.v}** আর এর সাব-ট্রি উপরে ওঠে।`)
      : B(`**${key}** has a right child (**${node.r.v}**) too — it has **two children**. Neither child can simply take its place.`, `**${key}**-এর ডান চাইল্ডও (**${node.r.v}**) আছে — এর **দুটো চাইল্ড**। কোনো চাইল্ড সরাসরি জায়গা নিতে পারে না।`),
    line: L('ifNoRight'),
    state: { value: key, 'root.right': node.r ? node.r.v : 'null' },
    scene: frame(root, { cursor: key, lit: pathLit, states: statesOf({ path: w.path.slice(0, -1), target: key, cmp: node.r ? node.r.v : null }), status: B(`right child of ${key} → <b>${node.r ? node.r.v : 'null'}</b>`, `${key}-এর ডান চাইল্ড → <b>${node.r ? node.r.v : 'null'}</b>`) })
  });
  if (noRight) {
    steps.push({
      title: T(B(`return root.left (${node.l.v})`, `root.left ফেরত (${node.l.v})`)),
      explanation: B(`**${node.l.v}** is returned to the caller, which stores it in place of **${key}**. Watch the subtree slide up.`, `**${node.l.v}** কলারকে ফেরত যায়, কলার সেটা **${key}**-এর জায়গায় রাখে। দেখো সাব-ট্রিটা উপরে উঠছে।`),
      line: L('retLeft'),
      state: { value: key, returns: node.l.v },
      scene: frame(root, { cursor: key, lit: pathLit, states: statesOf({ path: w.path.slice(0, -1), remove: key, succ: node.l.v }), status: B(`return <b>${node.l.v}</b>`, `<b>${node.l.v}</b> ফেরত`) })
    });
    steps.push(removedFrame(B(`${key} removed`, `${key} মুছে গেল`), B(`The parent now points straight to **${node.l.v}**. **${key}** is gone and the BST rule still holds.`, `প্যারেন্ট এখন সরাসরি **${node.l.v}**-কে দেখায়। **${key}** নেই, BST নিয়ম ঠিক আছে।`), L('ret'), { [node.l.v]: 'found' }));
    return { steps, result };
  }

  // c) two children: find the successor
  const dimLeft = subtreeVals(node.l);
  let s = node.r;
  const succPath = [key, s.v];
  const succScene = (o) => frame(root, { lit: [...pathLit, ...litEdges(succPath)], ...o });
  steps.push({
    title: T(B(`successor = root.right (${s.v})`, `successor = root.right (${s.v})`)),
    explanation: B(`We look for the **inorder successor**: the smallest value bigger than ${key}. Start with the right child, **${s.v}**.`, `আমরা **ইন-অর্ডার সাকসেসর** খুঁজি: ${key}-এর চেয়ে বড়দের মধ্যে সবচেয়ে ছোট। শুরু ডান চাইল্ড **${s.v}** থেকে।`),
    line: L('succStart'),
    state: { value: key, successor: s.v },
    scene: succScene({ cursor: s.v, states: statesOf({ target: key, succ: s.v, dim: dimLeft }), status: B(`successor = <b>${s.v}</b>`, `successor = <b>${s.v}</b>`) })
  });
  for (;;) {
    const hasLeft = !!s.l;
    steps.push({
      title: T(B(`successor.left != null? ${hasLeft ? 'Yes' : 'No'}`, `successor.left != null? ${hasLeft ? 'হ্যাঁ' : 'না'}`)),
      explanation: hasLeft
        ? B(`**${s.v}** has a left child (**${s.l.v}**), so a smaller candidate exists — the loop continues.`, `**${s.v}**-এর বাম চাইল্ড (**${s.l.v}**) আছে, মানে আরও ছোট আছে — লুপ চলবে।`)
        : B(`**${s.v}** has no left child, so the loop stops: **${s.v} is the successor**.`, `**${s.v}**-এর বাম চাইল্ড নেই, তাই লুপ থামে: **${s.v} হলো সাকসেসর**।`),
      line: L('succCheck'),
      state: { value: key, successor: s.v, 'successor.left != null': hasLeft },
      scene: succScene({ cursor: s.v, states: statesOf({ target: key, succ: s.v, dim: dimLeft, path: succPath.slice(1, -1) }), status: B(`left of ${s.v} → <b>${hasLeft ? s.l.v : 'null'}</b>`, `${s.v}-এর বামে → <b>${hasLeft ? s.l.v : 'null'}</b>`) })
    });
    if (!hasLeft) break;
    s = s.l;
    succPath.push(s.v);
    steps.push({
      title: T(B(`successor = successor.left (${s.v})`, `successor = successor.left (${s.v})`)),
      explanation: B(`Move left to **${s.v}** — smaller values are always on the left.`, `বামে **${s.v}**-এ যাও — ছোট মান সবসময় বামে থাকে।`),
      line: L('succMove'),
      state: { value: key, successor: s.v },
      scene: succScene({ cursor: s.v, states: statesOf({ target: key, succ: s.v, dim: dimLeft, path: succPath.slice(1, -1) }), status: B(`successor = <b>${s.v}</b>`, `successor = <b>${s.v}</b>`) })
    });
  }
  const succ = s.v;
  steps.push({
    title: T(B(`root.data = ${succ}`, `root.data = ${succ}`)),
    explanation: B(`Copy the successor's value into the node of **${key}**: \`root.data = successor.data\`. Watch **${succ}** fly up. It fits there perfectly: bigger than everything on the left, smaller than everything else on the right.`, `সাকসেসরের মান **${key}**-এর নোডে কপি করো: \`root.data = successor.data\`। দেখো **${succ}** উড়ে উপরে যাচ্ছে। ওখানে একদম মানায়: বামের সবার চেয়ে বড়, ডানের বাকি সবার চেয়ে ছোট।`),
    line: L('copy'),
    state: { value: key, 'root.data': `${key} → ${succ}` },
    scene: frame(root, { ghost: { value: succ, from: succ, to: key }, lit: [...pathLit, ...litEdges(succPath)], states: statesOf({ target: key, succ, dim: dimLeft }), subs: { [key]: `${key} → ${succ}` }, status: B(`copy <b>${succ}</b> into the node of <b>${key}</b>`, `<b>${succ}</b> কপি হয়ে <b>${key}</b>-এর নোডে`) })
  });
  steps.push({
    title: T(B(`Call deleteNode(root.right, ${succ})`, `deleteNode(root.right, ${succ}) কল`)),
    explanation: B(`Now **${succ}** appears twice, so the old copy is removed: the function calls itself on the right subtree to delete **${succ}**. The same code runs again from the top.`, `এখন **${succ}** দুবার আছে, তাই পুরোনো কপিটা মুছতে হবে: ফাংশন ডান সাব-ট্রিতে **${succ}** মুছতে নিজেকে কল করে। একই কোড আবার ওপর থেকে চলে।`),
    line: L('deleteSucc'),
    state: { value: succ },
    scene: frame(root, { cursor: node.r.v, keyBadge: succ, lit: [...pathLit, [key, node.r.v]], states: statesOf({ target: key, dim: dimLeft }), subs: { [key]: `→ ${succ}` }, status: B(`deleteNode(root.right, <b>${succ}</b>)`, `deleteNode(root.right, <b>${succ}</b>) কল`) })
  });
  // the nested call, traced on the same tree
  const inner = deleteWalk(root, node.r, succ, { tag, prefix: prefix ? B(`${prefix.en} › successor`, `${prefix.bn} › সাকসেসর`) : B('successor', 'সাকসেসর'), keep: { target: key, dim: dimLeft }, subs: { [key]: `→ ${succ}` }, litBefore: [...pathLit, [key, node.r.v]] });
  steps.push(...inner.steps);
  steps.push({
    title: T(B(`${succ}: root.left == null? Yes → return root.right`, `${succ}: root.left == null? হ্যাঁ → root.right ফেরত`)),
    explanation: B(`The old **${succ}** has no left child (that is why it was the smallest), so this call returns its right child${s.r ? ` **${s.r.v}**` : ' (null)'}. The old ${succ} node is removed.`, `পুরোনো **${succ}**-এর বাম চাইল্ড নেই (তাই এটাই সবচেয়ে ছোট ছিল), তাই এই কল এর ডান চাইল্ড${s.r ? ` **${s.r.v}**` : ' (null)'} ফেরত দেয়। পুরোনো ${succ} নোড মুছে যায়।`),
    line: [...L('ifNoLeft'), ...L('retRight')],
    state: { value: succ, returns: s.r ? s.r.v : 'null' },
    scene: frame(root, { cursor: succ, lit: [...pathLit, ...litEdges(succPath)], states: statesOf({ target: key, remove: succ, dim: dimLeft }), subs: { [key]: `→ ${succ}` }, status: B(`remove the old <b>${succ}</b>`, `পুরোনো <b>${succ}</b> মুছে ফেলো`) })
  });
  steps.push(removedFrame(B(`${succ} took ${key}'s place`, `${succ} নিল ${key}-এর জায়গা`), B(`**${succ}** now sits where **${key}** was${s.r ? `, and **${s.r.v}** moved up into the old spot of ${succ}` : ''}. **${key}** is gone.`, `**${succ}** এখন **${key}**-এর জায়গায়${s.r ? `, আর **${s.r.v}** উঠে ${succ}-এর আগের জায়গায় গেছে` : ''}। **${key}** নেই।`), L('ret'), { [succ]: 'found' }));
  return { steps, result };
}

function genDelete(root, key) {
  const steps = [
    {
      title: B(`main(): root = deleteNode(root, ${key})`, `main() কল করে: root = deleteNode(root, ${key})`),
      explanation: B(`\`deleteNode\` first walks down to find **${key}**, checking one condition at a time. Then it handles one of three cases: no children, one child, or two children.`, `\`deleteNode\` আগে এক এক শর্ত দেখে নেমে **${key}** খোঁজে। তারপর তিনটার একটা কেস সামলায়: কোনো চাইল্ড নেই, এক চাইল্ড, বা দুই চাইল্ড।`),
      line: ['call'],
      state: { value: key },
      scene: frame(root, { keyBadge: key, cursor: root ? root.v : null, states: {}, status: B(`deleteNode(root, <b>${key}</b>)`, `deleteNode(root, <b>${key}</b>) কল`) })
    }
  ];
  const t = traceDelete(root, key);
  steps.push(...t.steps);
  if (t.result !== root) steps.push(summaryStep(t.result, B(`${key} deleted ✓`, `${key} ডিলিট হলো ✓`)));
  return { steps: finish(steps, B('Delete', 'ডিলিট')), result: t.result };
}

/* ======================= UPDATE ======================= */

function genUpdate(root, oldKey, newKey) {
  const steps = [
    {
      title: B(`main(): root = update(root, ${oldKey}, ${newKey})`, `main() কল করে: root = update(root, ${oldKey}, ${newKey})`),
      explanation: B(`\`update\` never overwrites a value in place — the new value might belong somewhere else. It checks both values, then **deletes ${oldKey}** and **inserts ${newKey}**, using the real functions above.`, `\`update\` কখনো সরাসরি মান বদলায় না — নতুন মানের জায়গা অন্য কোথাও হতে পারে। দুটো মান যাচাই করে, তারপর **${oldKey} ডিলিট** আর **${newKey} ইনসার্ট** করে, ওপরের আসল ফাংশনগুলো দিয়ে।`),
      line: ['call'],
      state: { oldValue: oldKey, newValue: newKey },
      scene: frame(root, { states: {}, status: B(`update(root, <b>${oldKey}</b>, <b>${newKey}</b>)`, `update(root, <b>${oldKey}</b>, <b>${newKey}</b>) কল`) })
    },
    {
      title: B(`search(root, ${oldKey}) → found`, `search(root, ${oldKey}) → পাওয়া গেছে`),
      explanation: B(`The old value **${oldKey}** is in the tree, so \`search\` does not return null and the update continues.`, `পুরোনো মান **${oldKey}** ট্রিতে আছে, তাই \`search\` null দেয় না আর আপডেট চলতে থাকে।`),
      line: ['checkOld'],
      state: { oldValue: oldKey, exists: true },
      scene: frame(root, { cursor: oldKey, states: { [oldKey]: 'found' }, status: B(`<b>${oldKey}</b> exists ✓`, `<b>${oldKey}</b> আছে ✓`) })
    },
    {
      title: B(`search(root, ${newKey}) → null`, `search(root, ${newKey}) → null`),
      explanation: B(`The new value **${newKey}** is not in the tree yet, so there will be no duplicate. Safe to continue.`, `নতুন মান **${newKey}** এখনো ট্রিতে নেই, তাই ডুপ্লিকেট হবে না। এগোনো নিরাপদ।`),
      line: ['checkNew'],
      state: { newValue: newKey, exists: false },
      scene: frame(root, { states: {}, status: B(`<b>${newKey}</b> is new ✓`, `<b>${newKey}</b> নতুন ✓`) })
    },
    {
      title: B(`root = deleteNode(root, ${oldKey})`, `root = deleteNode(root, ${oldKey})`),
      explanation: B(`First remove the old value. The code jumps into \`deleteNode\` and runs it line by line.`, `আগে পুরোনো মান মোছো। কোড \`deleteNode\`-এ ঢুকে লাইন ধরে চলে।`),
      line: ['callDelete'],
      state: { value: oldKey },
      scene: frame(root, { keyBadge: oldKey, cursor: root.v, states: {}, status: B(`deleteNode(root, <b>${oldKey}</b>)`, `deleteNode(root, <b>${oldKey}</b>) কল`) })
    }
  ];
  const del = traceDelete(root, oldKey, { tag: 'd_', prefix: B('delete', 'ডিলিট') });
  steps.push(...del.steps);
  steps.push({
    title: B(`root = insert(root, ${newKey})`, `root = insert(root, ${newKey})`),
    explanation: B(`Now add the new value. The code jumps into \`insert\` — **${newKey}** finds its own correct spot.`, `এবার নতুন মান যোগ করো। কোড \`insert\`-এ ঢোকে — **${newKey}** নিজের সঠিক জায়গা খুঁজে নেয়।`),
    line: ['callInsert'],
    state: { value: newKey },
    scene: frame(del.result, { keyBadge: newKey, cursor: del.result ? del.result.v : null, states: {}, status: B(`insert(root, <b>${newKey}</b>)`, `insert(root, <b>${newKey}</b>) কল`) })
  });
  const ins = traceInsert(del.result, newKey, { tag: 'i_', prefix: B('insert', 'ইনসার্ট') });
  steps.push(...ins.steps);
  steps.push(summaryStep(ins.result, B(`${oldKey} updated to ${newKey} ✓`, `${oldKey} থেকে ${newKey} আপডেট ✓`), null, ['ret']));
  return { steps: finish(steps, B('Update', 'আপডেট')), result: ins.result };
}

/* ======================= traced TRAVERSE ======================= */

const ORDER_INFO = {
  inorder: { name: B('Inorder', 'ইন-অর্ডার'), rule: B('Left → Root → Right', 'বাম → রুট → ডান'), seq: ['left', 'visit', 'right'], why: B('In a BST inorder always comes out **sorted**.', 'BST-তে ইন-অর্ডার সবসময় **সাজানো** আসে।') },
  preorder: { name: B('Preorder', 'প্রি-অর্ডার'), rule: B('Root → Left → Right', 'রুট → বাম → ডান'), seq: ['visit', 'left', 'right'], why: B('Inserting this list again rebuilds the **exact same tree**.', 'এই লিস্ট আবার ইনসার্ট করলে **হুবহু একই ট্রি** হয়।') },
  postorder: { name: B('Postorder', 'পোস্ট-অর্ডার'), rule: B('Left → Right → Root', 'বাম → ডান → রুট'), seq: ['left', 'right', 'visit'], why: B('Children always come before their parent.', 'চাইল্ড সবসময় প্যারেন্টের আগে আসে।') }
};

export function genTraverse(root, order = 'inorder') {
  const info = ORDER_INFO[order] || ORDER_INFO.inorder;
  const steps = [];
  const out = [];
  const subsNow = () => Object.fromEntries(out.map((v, i) => [v, `#${i + 1}`]));
  const scene = (o) => frame(root, { output: [...out], outputLabel: B(`${info.name.en} output:`, `${info.name.bn} আউটপুট:`), subs: subsNow(), ...o });
  const visitedStates = (cur) => statesOf({ visited: out.filter((v) => v !== cur), cmp: cur });

  steps.push({
    title: B(`main(): ${order}(root)`, `main() কল করে: ${order}(root)`),
    explanation: B(`**${info.name.en}** visits every node with the rule **${info.rule.en}**. The function calls itself for each child; watch the cursor and the output strip.`, `**${info.name.bn}** প্রতিটা নোড দেখে **${info.rule.bn}** নিয়মে। ফাংশন প্রতিটা চাইল্ডের জন্য নিজেকে কল করে; কার্সর আর আউটপুট দেখো।`),
    line: ['call'],
    state: { order: info.name.en },
    scene: scene({ cursor: root.v, states: {}, status: B(`${order}(<b>${root.v}</b>)`, `${order}(<b>${root.v}</b>)`) })
  });

  (function visit(n) {
    steps.push({
      title: B(`${order}(${n.v}): root == null? No`, `${order}(${n.v}): root == null? না`),
      explanation: B(`The call is at **${n.v}**. It is not null, so the function body runs: ${info.rule.en}.`, `কলটা **${n.v}**-এ। null নয়, তাই ফাংশনের ভেতরটা চলে: ${info.rule.bn}।`),
      line: ['ifNull'],
      state: { root: n.v, 'root == null': false },
      scene: scene({ cursor: n.v, states: visitedStates(n.v), status: B(`at <b>${n.v}</b>`, `<b>${n.v}</b>-এ`) })
    });
    for (const act of info.seq) {
      if (act === 'visit') {
        out.push(n.v);
        steps.push({
          title: B(`visit ${n.v} → output #${out.length}`, `${n.v} দেখা → আউটপুট #${out.length}`),
          explanation: B(`Now it is ${n.v}'s turn in the rule (${info.rule.en}), so print **${n.v}** — node #${out.length} to be visited. Output so far: \`${fmt(out)}\`.${out.length === values(root).length ? `\n\nAll nodes visited.\n\n> ${info.why.en}` : ''}`, `নিয়ম (${info.rule.bn}) অনুযায়ী এখন ${n.v}-এর পালা, তাই **${n.v}** প্রিন্ট করো — #${out.length} নম্বর ভিজিট। এখন পর্যন্ত আউটপুট: \`${fmt(out)}\`।${out.length === values(root).length ? `\n\nসব নোড দেখা হয়েছে।\n\n> ${info.why.bn}` : ''}`),
          line: ['visit'],
          state: { root: n.v, printed: out.length },
          scene: scene({ cursor: n.v, states: statesOf({ visited: out.slice(0, -1), found: n.v }), status: B(`print <b>${n.v}</b>`, `<b>${n.v}</b> প্রিন্ট`) })
        });
      } else {
        const child = act === 'left' ? n.l : n.r;
        const word = act === 'left' ? B('left', 'বাম') : B('right', 'ডান');
        steps.push({
          title: B(`${order}(root.${act}) → ${child ? child.v : 'null'}`, `${word.bn}ে কল: ${order}(root.${act}) → ${child ? child.v : 'null'}`),
          explanation: child
            ? B(`Call ${order} on the ${word.en} child, **${child.v}**. This call has to finish before we come back to ${n.v}.`, `${word.bn} চাইল্ড **${child.v}**-এর ওপর ${order} কল। এটা শেষ হলে তবেই ${n.v}-এ ফিরব।`)
            : B(`The ${word.en} child of ${n.v} is **null**, so that call returns immediately (\`if root == null: return\`).`, `${n.v}-এর ${word.bn} চাইল্ড **null**, তাই সেই কল সাথে সাথে ফিরে আসে (\`if root == null: return\`)।`),
          line: [act],
          state: { root: n.v, call: child ? child.v : 'null' },
          scene: scene({ cursor: child ? child.v : n.v, states: visitedStates(child ? child.v : n.v), subs: child ? subsNow() : { ...subsNow(), [n.v]: `${out.includes(n.v) ? subsNow()[n.v] + ' ' : ''}${act === 'left' ? '↙' : '↘'} null` }, status: B(child ? `go ${word.en} → <b>${child.v}</b>` : `${word.en} is null → return`, child ? `${word.bn}ে যাও → <b>${child.v}</b>` : `${word.bn} null → ফেরত`) })
        });
        if (child) visit(child);
      }
    }
  })(root);

  steps.push({
    title: B(`${info.name.en} done ✓`, `${info.name.bn} শেষ ✓`),
    explanation: B(`Every call has returned. Result: \`${fmt(out)}\`.\n\n> ${info.why.en}`, `সব কল ফিরে এসেছে। ফলাফল: \`${fmt(out)}\`।\n\n> ${info.why.bn}`),
    line: ['done'],
    state: { order: info.name.en, visited: out.length },
    scene: scene({ states: statesOf({ visited: out }), status: B(`${info.name.en}: <b>${out.join(' ')}</b>`, `${info.name.bn}: <b>${out.join(' ')}</b>`) })
  });
  return { steps: finish(steps, B(info.name.en, info.name.bn)), result: root };
}

/* ======================= entry point ======================= */

/**
 * Run one operation on `root`.
 * op: { type: 'build', input, mode } | { type: 'search'|'insert'|'delete', key }
 *   | { type: 'update', key, newKey } | { type: 'traverse', order }
 */
export function runBstOp(root, op) {
  const k = op.key != null ? Number(op.key) : null;
  switch (op.type) {
    case 'build': return genBuild(op.input, op.mode);
    case 'search': return genSearch(root, k);
    case 'insert': return genInsert(root, k);
    case 'delete': return genDelete(root, k);
    case 'update': return genUpdate(root, k, Number(op.newKey));
    case 'traverse': return genTraverse(root, op.order || 'inorder');
    default: return { steps: [], result: root };
  }
}

export const BST_DEFAULT = { input: '50, 30, 20, 40, 70, 60, 80', mode: 'preorder' };

/** Rebuild a tree from its preorder (used to restore a saved tree). */
export function fromPreorder(list) {
  let root = null;
  (list || []).forEach((v) => { root = insertKey(root, Number(v)); });
  return root;
}
