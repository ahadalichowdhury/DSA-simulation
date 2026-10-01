export const linearTopics = [
  {
    id: 'stack',
    name: { en: 'Stack (LIFO)', bn: 'স্ট্যাক (LIFO)' },
    description: {
      en: 'A pile of plates — last in, first out',
      bn: 'প্লেটের স্তূক — শেষে ঢোকা আগে বের'
    },
    categoryKey: 'linear',
    level: 'beginner',
    order: 10,
    icon: '🥞',
    complexity: {
      time: 'O(1)',
      best: 'O(1)',
      worst: 'O(1)',
      space: 'O(n)',
      note: {
        en: 'push, pop and peek only touch the top item, so each takes one step no matter how big the stack is. The items themselves need O(n) space.',
        bn: 'push, pop, peek শুধু উপরের আইটেম ছুঁয়, তাই স্ট্যাক যত বড়ই হোক প্রতিটি কাজে এক ধাপই লাগে। আইটেমগুলো রাখতে O(n) স্পেস লাগে।'
      }
    },
    code: {
      en: [
        'stack = []',
        'push(item):',
        '  stack.push(item)     // put it on top',
        'pop():',
        '  return stack.pop()   // take from the top',
        'peek():',
        '  return stack.top()   // look only, remove nothing'
      ],
      bn: [
        'stack = []',
        'push(item):',
        '  stack.push(item)     // উপরে বসাও',
        'pop():',
        '  return stack.pop()   // উপর থেকে তুলে নাও',
        'peek():',
        '  return stack.top()   // শুধু দেখো, সরাবে না'
      ]
    },
    steps: [
      {
        title: { en: 'A pile of plates at lunch', bn: 'দুপুরের প্লেটের স্তূক' },
        explanation: {
          en: 'Look at the canteen table. Clean plates are **stacked one on top of another**.\n\nYou never pull a plate from the middle or from the bottom. You take the **top** plate — the one that was put there last.\n\n> **Last In, First Out (LIFO)** — whatever went in last is the first thing to come out.\n\nThat pile is a **stack**.',
          bn: 'ক্যান্টিনের টেবিলটায় তাকাও। পরিষ্কার প্লেটগুলো **একের উপরে এক** স্তূক করে রাখা।\n\nকেউ মাঝখান বা নিচ থেকে প্লেট তোলে না। তুমি তোলো **উপরের** প্লেটটাই — যেটা সবচেয়ে শেষে রাখা হয়েছিল।\n\n> **Last In, First Out (LIFO)** — যেটা সবচেয়ে শেষে ঢুকেছে, বের হবে সেটাই আগে।\n\nএই স্তূকটাই হলো **স্ট্যাক (stack)**।'
        },
        line: 0,
        scene: {
          kind: 'cards',
          label: 'Real life = a pile',
          cards: [
            { icon: '🥞', title: 'Pile of plates', desc: 'The plate put on top is the plate taken next.', state: 'active', tag: 'LIFO', accent: 'var(--yellow)' },
            { icon: '📚', title: 'Stack of books', desc: 'Only the top book is easy to grab.', state: 'ok', tag: 'top only', accent: 'var(--cyan)' },
            { icon: '📥', title: 'Stack of trays', desc: 'The newest tray always comes off first.', state: 'ok', tag: 'newest first', accent: 'var(--green)' }
          ],
          caption: 'Same rule everywhere: <b>last in, first out</b>'
        }
      },
      {
        title: { en: 'Bottom, top, and one door', bn: 'নিচ, উপর, আর একটাই দরজা' },
        explanation: {
          en: 'A stack keeps its items in one column.\n\n- The item you put in first sits at the **bottom** — here `items[0]` is **Plate 1**.\n- The newest item sits on **top**.\n- A pointer called `top` always marks the top. Here `top = 2`, which is **Plate 3**.\n\nYou can only touch `top`. Everything below waits its turn.',
          bn: 'স্ট্যাক সব আইটেম একটাই কলামে রাখে।\n\n- সবচেয়ে আগে যেটা ঢোকাও সেটা থাকে **নিচে (bottom)** — এখানে `items[0]` হলো **Plate 1**।\n- সবচেয়ে নতুনটা থাকে **উপরে**।\n- `top` নামের একটা পয়েন্টার সবসময় উপরেরটাকে দেখায়। এখানে `top = 2`, অর্থাৎ **Plate 3**।\n\nতুমি শুধু `top` ছুঁতে পারো। নিচের সবগুলো নিজের পালার অপেক্ষায়।'
        },
        line: 0,
        state: { bottom: 'index 0', top: 2, size: 3 },
        scene: {
          kind: 'stack',
          label: 'plate stack · items[0] = bottom',
          items: ['Plate 1', 'Plate 2', 'Plate 3'],
          pointers: [{ i: 2, label: 'top', tone: 'yellow' }],
          highlights: { active: [2] },
          note: 'Plate 1 is the bottom. Only the top plate, Plate 3, can be touched.',
          legend: [{ label: 'top — the only door', color: 'var(--yellow)' }]
        }
      },
      {
        title: { en: 'push — a new item on top', bn: 'push — উপরে নতুন আইটেম' },
        explanation: {
          en: '`push(item)` puts one item **on top** of the pile.\n\n- The new **Plate 4** lands at index 3.\n- `top` moves up from 2 to 3.\n- The three plates below do not move at all.\n\nOne put, one pointer update — that is the whole job.',
          bn: '`push(item)` মানে স্তূকের **উপরে** একটা আইটেম বসানো।\n\n- নতুন **Plate 4** এলে ৩ নম্বর ইনডেক্সে।\n- `top` ২ থেকে উঠে ৩-এ গেল।\n- নিচের তিনটা প্লেট এক আঙুলও সরেনি।\n\nএকটা বসানো, একটা পয়েন্টার আপডেট — এতটুকুই পুরো কাজ।'
        },
        line: 2,
        state: { op: 'push', item: 'Plate 4', top: 3, size: 4 },
        scene: {
          kind: 'stack',
          label: 'push(Plate 4)',
          items: ['Plate 1', 'Plate 2', 'Plate 3', 'Plate 4'],
          pointers: [{ i: 3, label: 'top', tone: 'yellow' }],
          highlights: { insert: [3] },
          note: 'Plate 4 popped in on top — nothing below it moved.',
          caption: 'top = 3 · size = 4'
        }
      },
      {
        title: { en: 'pop — take the top item off', bn: 'pop — উপরেরটা তুলে নাও' },
        explanation: {
          en: '`pop()` removes the item at `top` and returns it to you.\n\nHere **Plate 4** leaves the stack — the red cross shows it going. The stack is back to three plates, and `top` drops to index 2, which is **Plate 3**.\n\n> A stack never opens from the bottom. The top is the only exit.',
          bn: '`pop()` `top`-এ থাকা আইটেমটা সরিয়ে তোমাকে ফিরিয়ে দেয়।\n\nএখানে **Plate 4** স্ট্যাক থেকে বেরিয়ে যাচ্ছে — লাল কাটা দাগটাই তার ইঙ্গিত। স্ট্যাক ফিরে গেল তিন প্লেটে, আর `top` নেমে এল ২ নম্বর ইনডেক্সে, অর্থাৎ **Plate 3**।\n\n> স্ট্যাক নিচ দিয়ে কখনো খোলে না। একমাত্র বেরোনোর পথ উপর।'
        },
        line: 4,
        state: { op: 'pop', popped: 'Plate 4', top: 2, size: 3 },
        scene: {
          kind: 'stack',
          label: 'pop() → Plate 4',
          items: ['Plate 1', 'Plate 2', 'Plate 3', 'Plate 4'],
          pointers: [{ i: 2, label: 'top', tone: 'yellow' }],
          highlights: { remove: [3] },
          note: 'Plate 4 is leaving. top already points at Plate 3.'
        }
      },
      {
        title: { en: 'peek — look, do not remove', bn: 'peek — শুধু দেখো, সরাবে না' },
        explanation: {
          en: '`peek()` answers one question: **what is on top right now?**\n\nIt returns **Plate 3** and puts it straight back. The stack still holds 3 plates, and `top` is still index 2.\n\n> Nothing is removed. Use `peek()` when you need the value but must not lose it.',
          bn: '`peek()` একটাই প্রশ্নের উত্তর দেয়: **এইমুহূর্তে উপরে কী আছে?**\n\nএটা **Plate 3** দেখিয়ে আবার ফিরিয়ে রাখে। স্ট্যাকে এখনো ৩টা প্লেট আছে, `top`-ও এখনো ২ নম্বর ইনডেক্সেই।\n\n> কিছুই সরে না। মানটা দরকার, কিন্তু হারাতে চাও না — তখনই `peek()` কাজে লাগে।'
        },
        line: 6,
        state: { peek: 'Plate 3', top: 2, size: 3 },
        scene: {
          kind: 'stack',
          label: 'peek() → Plate 3',
          items: ['Plate 1', 'Plate 2', 'Plate 3'],
          pointers: [{ i: 2, label: 'top', tone: 'yellow' }],
          highlights: { active: [2] },
          note: 'peek() returns Plate 3 and changes nothing.',
          legend: [{ label: 'read only', color: 'var(--green)' }]
        }
      },
      {
        title: { en: 'Example run — push A, push B, push C', bn: 'উদাহরণ — A, B, C push' },
        explanation: {
          en: 'Start from an empty stack, then push three letters:\n\n1. `push(A)` → A sits at the bottom.\n2. `push(B)` → B lands on A.\n3. `push(C)` → C lands on B. **`top` is now index 2.**\n\nRead it from the bottom up: **A, B, C**. C went in last.',
          bn: 'খালি স্ট্যাক দিয়ে শুরু, তারপর তিনটা অক্ষর push:\n\n1. `push(A)` → A বসল নিচে।\n2. `push(B)` → B এল A-এর উপরে।\n3. `push(C)` → C এল B-এর উপরে। **`top` এখন ২ নম্বর ইনডেক্স।**\n\nনিচ থেকে উপরে পড়লে পাই: **A, B, C**। C সবচেয়ে শেষে ঢুকেছে।'
        },
        line: 2,
        state: { top: 2, size: 3 },
        scene: {
          kind: 'stack',
          label: 'push(A), push(B), push(C)',
          items: ['A', 'B', 'C'],
          pointers: [{ i: 2, label: 'top', tone: 'yellow' }],
          highlights: { insert: [2] },
          aux: [
            { label: 'pushed so far', items: ['A', 'B', 'C'], highlights: { active: [2] } }
          ],
          note: 'A is at the bottom, C is on top.'
        }
      },
      {
        title: { en: 'pop → C comes back out', bn: 'pop → C বেরিয়ে এল' },
        explanation: {
          en: 'Now `pop()` runs.\n\n- **C** went in last, so **C comes out first**.\n- The stack keeps **A and B**, and `top` moves back to index 1 → **B**.\n- Pop once more and you get **B**. A stays at the bottom until the end.\n\n> That is LIFO in one line: **the newest item always leaves first**.',
          bn: 'এখন `pop()` চলল।\n\n- **C** সবচেয়ে শেষে ঢুকেছিল, তাই বের হলোও **C আগেই**।\n- স্ট্যাকে রইল **A আর B**, আর `top` ফিরে গেল ১ নম্বর ইনডেক্সে → **B**।\n- আরেকবার pop করলে পাবে **B**। A নিচে থাকবে শেষ পর্যন্ত।\n\n> LIFO এক লাইনে: **সবচেয়ে নতুন আইটেমই সবসময় আগে বের হয়**।'
        },
        line: 4,
        state: { popped: 'C', top: 1, size: 2 },
        scene: {
          kind: 'stack',
          label: 'pop() → C',
          items: ['A', 'B', 'C'],
          pointers: [{ i: 1, label: 'top', tone: 'yellow' }],
          highlights: { remove: [2] },
          aux: [
            { label: 'pop() returns', items: ['C'], highlights: { active: [0] } }
          ],
          note: 'C is leaving. top already points at B.'
        }
      },
      {
        title: { en: 'Uses, cost, and when to use it', bn: 'ব্যবহার, খরচ, আর কখন ব্যবহার করবে' },
        explanation: {
          en: '**Where you see a stack**\n\n- **Undo / redo** — Ctrl+Z pops your last action back out.\n- **Browser back button** — the page you just opened is the first one you return to.\n- **Function call stack** — every call sits on top and must return before the one below it can continue.\n- **Closing tabs** — many apps close the newest tab first.\n\n**Cost** — `push`, `pop` and `peek` are all **O(1)**: the top is always right there, so nothing is scanned. Storing n items takes **O(n)** space.\n\n> **Use a stack when you need "latest first" order.**',
          bn: '**স্ট্যাক কোথায় কোথায় পাওয়া যায়**\n\n- **Undo / redo** — Ctrl+Z চাপলে শেষ কাজটা ফিরে আসে।\n- **ব্রাউজারের ব্যাক বাটন** — এইমাত্র খোলা পেজেই সবচেয়ে আগে ফিরতে হয়।\n- **ফাংশন কল স্ট্যাক (call stack)** — প্রতিটা কল উপরে বসে, return না দিলে নিচেরটা চলে না।\n- **ট্যাব বন্ধ করা** — অনেক অ্যাপে সবচেয়ে নতুন ট্যাবই আগে বন্ধ হয়।\n\n**খরচ** — `push`, `pop`, `peek` তিনটাই **O(1)**: উপরেরটা এমনিতেই হাতের কাছে, কিছু খুঁজতে হয় না। n আইটেম রাখতে **O(n)** স্পেস লাগে।\n\n> **সবচেয়ে নতুনটা আগে দরকার হলেই স্ট্যাক (stack) ব্যবহার করো।**'
        },
        line: [2, 4, 6],
        scene: {
          kind: 'cards',
          label: 'Stack in the real world',
          cards: [
            { icon: '🔙', title: 'Undo / redo', desc: 'Ctrl+Z pops your last action back.', state: 'active', tag: 'LIFO', accent: 'var(--yellow)' },
            { icon: '🌐', title: 'Browser back', desc: 'The last page visited returns first.', state: 'ok', tag: 'history', accent: 'var(--cyan)' },
            { icon: '⌨️', title: 'Function call stack', desc: 'Each call sits on top until it returns.', state: 'ok', tag: 'calls', accent: 'var(--purple)' },
            { icon: '🗂', title: 'Closing tabs', desc: 'The newest tab closes first.', state: 'ok', tag: 'newest first', accent: 'var(--green)' }
          ],
          caption: 'push · pop · peek = <b>O(1)</b> · space = O(n)'
        }
      }
    ]
  },

  {
    id: 'queue',
    name: { en: 'Queue (FIFO)', bn: 'কিউ (FIFO)' },
    description: {
      en: 'A line at the shop — first in, first served',
      bn: 'দোকানের সারি — প্রথমে ঢোকা আগে সেবা'
    },
    categoryKey: 'linear',
    level: 'beginner',
    order: 20,
    icon: '🚶',
    complexity: {
      time: 'O(1)',
      best: 'O(1)',
      worst: 'O(1)',
      space: 'O(n)',
      note: {
        en: 'enqueue, dequeue and peek only touch the two ends, so each is one step with a linked list or a circular buffer. The n items themselves need O(n) space.',
        bn: 'enqueue, dequeue, peek শুধু দু প্রান্ত ছুঁয়, তাই লিংকড লিস্ট বা সার্কুলার বাফারে প্রতিটি কাজে এক ধাপই লাগে। n আইটেম রাখতে O(n) স্পেস লাগে।'
      }
    },
    code: {
      en: [
        'queue = []             // front is index 0',
        'enqueue(item):',
        '  queue.push(item)     // join at the rear',
        'dequeue():',
        '  return queue.shift() // leave from the front',
        'peek():',
        '  return queue.front() // look only, remove nothing'
      ],
      bn: [
        'queue = []             // front মানে ০ নম্বর ইনডেক্স',
        'enqueue(item):',
        '  queue.push(item)     // শেষে যোগ হওয়া',
        'dequeue():',
        '  return queue.shift() // সামনে থেকে বের হওয়া',
        'peek():',
        '  return queue.front() // শুধু দেখো, সরাবে না'
      ]
    },
    steps: [
      {
        title: { en: 'A line at the counter', bn: 'কাউন্টারের সারি' },
        explanation: {
          en: 'At the bank counter people stand in a **line**.\n\nThe person who arrived **first** is served first. Whoever just arrived walks to the **back** and waits.\n\n> **First In, First Out (FIFO)** — nobody overtakes anybody.\n\nThat line is a **queue (queue)**.',
          bn: 'ব্যাংকের কাউন্টারে মানুষ একটা **সারি** ধরে দাঁড়ায়।\n\n**সবচেয়ে আগে** এল যে, সে-ই আগে সেবা পায়। এইমাত্র এল সে সারির **শেষে** গিয়ে দাঁড়ায়।\n\n> **First In, First Out (FIFO)** — কেউ কাউকে ছাড়িয়ে যায় না।\n\nএই সারিটাই হলো **কিউ (queue)**।'
        },
        line: 0,
        scene: {
          kind: 'cards',
          label: 'Real life = a line',
          cards: [
            { icon: '🚶', title: 'Line at the counter', desc: 'First in line is served first.', state: 'active', tag: 'FIFO', accent: 'var(--green)' },
            { icon: '🎫', title: 'Ticket window', desc: 'Your token number decides your turn.', state: 'ok', tag: 'fair', accent: 'var(--cyan)' },
            { icon: '🚌', title: 'Bus stop', desc: 'People board in the order they arrived.', state: 'ok', tag: 'order', accent: 'var(--purple)' }
          ],
          caption: 'Same rule everywhere: <b>first in, first served</b>'
        }
      },
      {
        title: { en: 'Front and rear — the two ends', bn: 'ফ্রন্ট ও রিয়ার — দু প্রান্ত' },
        explanation: {
          en: 'A queue marks two ends:\n\n- **front** = index 0. People **leave** from here.\n- **rear** = the last index. New people **join** here.\n\nSo `front` points at **A** and `rear` points at **C**. A arrived first, C arrived last.',
          bn: 'কিউর দু প্রান্তে দুটো দাগ থাকে:\n\n- **front (ফ্রন্ট)** = ০ নম্বর ইনডেক্স। এখান থেকেই মানুষ **বের হয়**।\n- **rear (রিয়ার)** = শেষ ইনডেক্স। নতুন মানুষ এখানেই **যোগ হয়**।\n\nতাই `front` দাগাচ্ছে **A**-কে, আর `rear` দাগাচ্ছে **C**-কে। A সবচেয়ে আগে এসেছিল, C সবচেয়ে শেষে।'
        },
        line: 0,
        state: { front: 0, rear: 2, size: 3 },
        scene: {
          kind: 'queue',
          label: 'line at the counter',
          items: ['A', 'B', 'C'],
          pointers: [
            { i: 0, label: 'front', tone: 'cyan' },
            { i: 2, label: 'rear', tone: 'yellow' }
          ],
          highlights: { mark: [0, 2] },
          emptyText: 'queue is empty',
          note: 'A waits at the front. C joined at the rear.',
          legend: [
            { label: 'front — leaves here', color: 'var(--cyan)' },
            { label: 'rear — joins here', color: 'var(--yellow)' }
          ]
        }
      },
      {
        title: { en: 'enqueue — join at the rear', bn: 'enqueue — শেষে যোগ হওয়া' },
        explanation: {
          en: '`enqueue(item)` lets a new person **join at the back** of the line.\n\n- **D** is added at index 3.\n- `rear` moves from 2 to 3.\n- `front` stays at 0 — A still waits at the head of the line.\n\nThe line only ever grows at the back.',
          bn: '`enqueue(item)` মানে নতুন কাউকে সারির **শেষে যোগ হওয়া**।\n\n- **D** যোগ হলো ৩ নম্বর ইনডেক্সে।\n- `rear` ২ থেকে সরে ৩-এ গেল।\n- `front` থাকল ০-এই — A এখনো সারির শুরুতে অপেক্ষা করছে।\n\nসারি বাড়ে শুধু পেছনদিকে।'
        },
        line: 2,
        state: { op: 'enqueue', item: 'D', front: 0, rear: 3, size: 4 },
        scene: {
          kind: 'queue',
          label: 'enqueue(D)',
          items: ['A', 'B', 'C', 'D'],
          pointers: [
            { i: 0, label: 'front', tone: 'cyan' },
            { i: 3, label: 'rear', tone: 'yellow' }
          ],
          highlights: { insert: [3] },
          emptyText: 'queue is empty',
          note: 'D joined at the rear. front did not move.'
        }
      },
      {
        title: { en: 'dequeue — leave from the front', bn: 'dequeue — সামনে থেকে বের হওয়া' },
        explanation: {
          en: '`dequeue()` serves the person at **front** and takes them out of the line.\n\n**A** leaves now — the red cross marks the exit. After that the line starts at index 1, so `front` moves to **B**, while `rear` stays at **D**.\n\n> A queue never takes from the back. Front out, rear in.',
          bn: '`dequeue()` সারির **front**-এ থাকা মানুষটাকে সেবা দিয়ে সারি থেকে সরিয়ে দেয়।\n\n**A** এখন বের হচ্ছে — লাল কাটা দাগটাই বেরোনোর চিহ্ন। তারপর সারি শুরু হয় ১ নম্বর ইনডেক্স থেকে, তাই `front` চলল **B**-তে, আর `rear` থাকলই **D**-তে।\n\n> কিউ কখনো পেছন থেকে তোলে না। সামনে থেকে বের, পেছন থেকে ঢোকা।'
        },
        line: 4,
        state: { op: 'dequeue', out: 'A', front: 1, rear: 3, size: 3 },
        scene: {
          kind: 'queue',
          label: 'dequeue() → A',
          items: ['A', 'B', 'C', 'D'],
          pointers: [
            { i: 1, label: 'front', tone: 'cyan' },
            { i: 3, label: 'rear', tone: 'yellow' }
          ],
          highlights: { remove: [0] },
          emptyText: 'queue is empty',
          note: 'A is leaving. front now points at B, rear still points at D.'
        }
      },
      {
        title: { en: 'peek — who is served next?', bn: 'peek — পরে কে সেবা পাবে?' },
        explanation: {
          en: 'The line is now **B, C, D**.\n\n`peek()` returns **B**, the person at the front, and puts them straight back. Nothing leaves: still 3 people, `front` is still 0, `rear` is still 2.\n\n> Use `peek()` to check the next turn without disturbing the line.',
          bn: 'সারি এখন **B, C, D**।\n\n`peek()` সামনের মানুষটার নাম বলে, অর্থাৎ **B**, আর তাকে ফিরিয়ে রাখে। কেউ বের হয়নি: এখনো ৩জন, `front` এখনো ০, `rear` এখনো ২।\n\n> পরের নম্বর জানতে চাও, কিন্তু সারিতে গোলযোগ করতে চাও না — তখনই `peek()`।'
        },
        line: 6,
        state: { peek: 'B', front: 0, rear: 2, size: 3 },
        scene: {
          kind: 'queue',
          label: 'peek() → B',
          items: ['B', 'C', 'D'],
          pointers: [
            { i: 0, label: 'front', tone: 'cyan' },
            { i: 2, label: 'rear', tone: 'yellow' }
          ],
          highlights: { active: [0] },
          emptyText: 'queue is empty',
          note: 'peek() returns B and the line stays exactly the same.'
        }
      },
      {
        title: { en: 'Example run — A, B, C, then dequeue', bn: 'উদাহরণ — A, B, C, তারপর dequeue' },
        explanation: {
          en: 'Start with an empty line, then:\n\n1. `enqueue(A)` → A stands at the front.\n2. `enqueue(B)` → B joins behind A.\n3. `enqueue(C)` → C joins behind B. The line reads **A, B, C**.\n4. `dequeue()` → **A leaves first**, because A was the first one in.\n\nWhat remains is **B, C** — `front` now points at B and `rear` at C.',
          bn: 'খালি সারি দিয়ে শুরু, তারপর:\n\n1. `enqueue(A)` → A দাঁড়াল সামনে।\n2. `enqueue(B)` → B এল A-এর পেছনে।\n3. `enqueue(C)` → C এল B-এর পেছনে। সারি হলো **A, B, C**।\n4. `dequeue()` → **A আগেই বের হলো**, কারণ A সবচেয়ে আগে ঢুকেছিল।\n\nবাকি রইল **B, C** — `front` এখন B-তে, আর `rear` C-তে।'
        },
        line: [2, 4],
        state: { left: 'A', front: 1, rear: 2, size: 2 },
        scene: {
          kind: 'queue',
          label: 'enqueue A, B, C → dequeue',
          items: ['A', 'B', 'C'],
          pointers: [
            { i: 1, label: 'front', tone: 'cyan' },
            { i: 2, label: 'rear', tone: 'yellow' }
          ],
          highlights: { remove: [0] },
          emptyText: 'queue is empty',
          note: 'A leaves first — front moves to B, rear stays at C.'
        }
      },
      {
        title: { en: 'Fair order — and where queues work', bn: 'ন্যায্য ক্রম — আর কিউ কোথায় লাগে' },
        explanation: {
          en: 'FIFO is **fair** because nobody overtakes anybody. You get served in the order you arrived — no jumping the line.\n\n**Queues work behind the scenes**\n\n- **Printer jobs** — each finished job is taken with `dequeue()`, so the file sent first is printed first.\n- **Message queues** — chats and tasks arrive and leave in the same order.\n- **BFS preview** — the graph search in a later chapter visits neighbours level by level, and for that it uses a queue.',
          bn: 'FIFO **ন্যায্য**, কারণ কেউ কাউকে ছাড়িয়ে যায় না। ঢোকার ক্রমেই সেবা পাওয়ার ক্রম — সারি কাটা যায় না।\n\n**পর্দার আড়ালে কিউ যেভাবে চলে**\n\n- **প্রিন্টার জব (printer jobs)** — প্রতিটা কাজ শেষ হলে `dequeue()` দিয়ে তোলা হয়, তাই যে ফাইলটা আগে পাঠানো হয়েছে সেটাই আগে ছাপা হয়।\n- **মেসেজ কিউ (message queues)** — চ্যাট আর টাস্ট যে ক্রমে আসে, সেই ক্রমেই বের হয়।\n- **BFS-এর ঝলক** — পরের অধ্যায়ে গ্রাফ সার্চ পাড়ার পাড়া প্রতিবেশী ঘুরবে, আর ওর জন্য লাগবে একটা কিউ (queue)।'
        },
        line: 4,
        scene: {
          kind: 'cards',
          label: 'Queue at work',
          cards: [
            { icon: '🖨️', title: 'Printer jobs', desc: 'The file sent first is printed first.', state: 'ok', tag: 'FIFO', accent: 'var(--cyan)' },
            { icon: '💬', title: 'Message queues', desc: 'Tasks arrive and leave in order.', state: 'ok', tag: 'ordered', accent: 'var(--purple)' },
            { icon: '🧭', title: 'BFS preview', desc: 'Level-by-level graph search runs on a queue.', state: 'active', tag: 'graphs →', accent: 'var(--yellow)' },
            { icon: '⚖️', title: 'Fair by design', desc: 'Nobody jumps — order equals arrival time.', state: 'ok', tag: 'fair', accent: 'var(--green)' }
          ],
          caption: 'First in, first out — fair to everyone in line'
        }
      },
      {
        title: { en: 'Circular queue, cost, and when to use it', bn: 'সার্কুলার কিউ, খরচ, আর কখন ব্যবহার করবে' },
        explanation: {
          en: '**Circular queue** — when the line lives in a fixed-size box, `rear` eventually hits the end. Instead of wasting the empty slots in front, it **wraps around to index 0**. The box becomes a ring and every slot is reused.\n\n**Cost** — `enqueue`, `dequeue` and `peek` are all **O(1)**: you only touch the two ends, never the middle. n items take **O(n)** space.\n\n> **Use a queue when you need "oldest first" order.**',
          bn: '**সার্কুলার কিউ (circular queue)** — লাইনটা যদি নির্দিষ্ট আকারের বাক্সে থাকে, তবে একসময় `rear` শেষে পৌঁছে যায়। সামনের খালি ঘরগুলো নষ্ট না করে সে **০ নম্বর ইনডেক্সে গিয়ে ঘুরে আসে**। বাক্সটা হয়ে যায় একটা রিং — প্রতিটা ঘর বারবার ব্যবহৃত হয়।\n\n**খরচ** — `enqueue`, `dequeue`, `peek` তিনটাই **O(1)**: শুধু দু প্রান্ত ছুঁয়ে যাওয়া হয়, মাঝখানে কখনো যাওয়া হয় না। n আইটেমে **O(n)** স্পেস লাগে।\n\n> **সবচেয়ে পুরনোটা আগে দরকার হলেই কিউ (queue) ব্যবহার করো।**'
        },
        line: [2, 4, 6],
        scene: {
          kind: 'cards',
          label: 'Queue in one screen',
          cards: [
            { icon: '♻️', title: 'Circular buffer', desc: 'rear hits the end, wraps to index 0.', state: 'active', tag: 'wrap', accent: 'var(--purple)' },
            { icon: '⚡', title: 'All O(1)', desc: 'enqueue, dequeue, peek — ends only.', state: 'ok', tag: 'cost', accent: 'var(--green)' },
            { icon: '🧠', title: 'Use when…', desc: 'you need the OLDEST item first.', state: 'ok', tag: 'FIFO', accent: 'var(--cyan)' }
          ],
          caption: 'front out · rear in · <b>O(1)</b> · space = O(n)'
        }
      }
    ]
  }
];
