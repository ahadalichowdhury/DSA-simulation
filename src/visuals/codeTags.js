/**
 * Tagged code templates → code panel data.
 *
 * A template is plain source text. A line that ends in `  @name` (or
 * `  @a,b`) is a named line: lesson steps say which NAME runs, and the code
 * panel finds that name's line numbers in whichever language is shown, so the
 * five languages may have different lengths. `{{key}}` is replaced by the
 * English or Bangla text of `text[key] = [en, bn]` (used for comments and
 * pseudocode).
 */

export const LANGS = ['pseudo', 'js', 'java', 'python', 'cpp'];

const TAG = /\s+@([\w,]+)\s*$/;

function expand(src, text) {
  const out = { en: [], bn: [], marks: {} };
  src.split('\n').forEach((line, i) => {
    const m = line.match(TAG);
    const body = m ? line.slice(0, m.index) : line;
    if (m) for (const name of m[1].split(',')) (out.marks[name] = out.marks[name] || []).push(i);
    out.en.push(body.replace(/\{\{(\w+)\}\}/g, (_, k) => (text[k] ? text[k][0] : k)));
    out.bn.push(body.replace(/\{\{(\w+)\}\}/g, (_, k) => (text[k] ? text[k][1] : k)));
  });
  return out;
}

/** sources: { pseudo, js, java, python, cpp } template strings → { code, lineMap }. */
export function program(sources, text = {}) {
  const code = {};
  const lineMap = {};
  for (const lang of LANGS) {
    const e = expand(sources[lang], text);
    code[lang] = { en: e.en, bn: e.bn };
    lineMap[lang] = e.marks;
  }
  return { code, lineMap };
}
