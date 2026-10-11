/**
 * Loop tracker data.
 *
 * A step may carry `loops`: the loops that are running at that moment, outer
 * first. The code panel draws them as rows of chips (one chip per pass), so a
 * learner can see which pass of which loop the highlighted line belongs to,
 * what the loop variable holds right now and whether the loop goes on.
 *
 *   { label, code, unit, now, check, items: [{ t, note, s }], pass }
 *
 * label  what the loop is for, in plain words ({ en, bn })
 * code   the loop head in short form, e.g. "for i = 0 … 5"
 * unit   the word for one pass ("round", "neighbour") used in "round 3 of 6"
 * now    the loop variable(s) right now, e.g. "v = 3, w = 2"
 * check  the loop test for this pass, e.g. "2 < 6 → run the body"
 * items  one chip per pass: s = done | current | todo | skip | best
 * depth  indent level (default: its place in the list); two loops one after
 *        the other inside the same outer loop share a depth
 * pass   for `while` loops whose passes are not known in advance: pass number
 */

const T = (en, bn) => (en === bn ? en : { en, bn });

/**
 * A `for` loop over known values. `at` is the index of the running pass
 * (−1 = not started yet, values.length = finished). `skip` marks finished
 * passes whose body did nothing; `best` marks a pass the loop picked.
 */
export function forLoop({ label, code, unit, values, at, now, check, notes = {}, skip = [], best = null, depth }) {
  const items = values.map((v, i) => ({
    t: String(v),
    note: notes[i],
    s: i === best ? 'best' : i < at ? (skip.includes(i) ? 'skip' : 'done') : i === at ? 'current' : 'todo'
  }));
  return { label, code, unit, items, now, check, ...(depth != null ? { depth } : {}) };
}

/** A `while` loop: `pass` counts how many times the body has started. */
export function whileLoop({ label, code, unit, pass, now, check, items, depth }) {
  return { label, code, unit, pass, now, check, ...(items ? { items } : {}), ...(depth != null ? { depth } : {}) };
}

/** The test of a counting loop, e.g. `round < V` → "2 < 6 ✓ run the body" / "6 < 6 ✗ stop". */
export function countCheck(name, value, limit, limitName = 'V') {
  return value < limit
    ? T(`${name} < ${limitName} → ${value} < ${limit} ✓ run the body`, `${name} < ${limitName} → ${value} < ${limit} ✓ ভেতরের কাজ চলবে`)
    : T(`${name} < ${limitName} → ${value} < ${limit} ✗ the loop stops`, `${name} < ${limitName} → ${value} < ${limit} ✗ লুপ থামবে`);
}

/** "for each item" loops have no visible test, only "is there a next item?". */
export function eachCheck(left) {
  return left > 0
    ? T(`${left} more after this one`, `এরপর আরও ${left}টা`)
    : T('this is the last one', 'এটাই শেষটা');
}

export const ENDED = T('no more items ✗ the loop ends', 'আর কিছু নেই ✗ লুপ শেষ');
