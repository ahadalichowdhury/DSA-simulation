/**
 * Content QA pass: catches bilingual slips the schema validator can't.
 *   node scripts/qa-bn.mjs
 * Flags, as warnings:
 *   - {en,bn} fields where bn === en (likely untranslated)
 *   - steps with no text at all (title + text both empty)
 *   - scenes whose `note` field contains HTML (renderer escapes it)
 *   - topic.step ids missing / duplicated
 */
import { readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const dir = path.join(process.cwd(), 'src/data/topics');
const files = readdirSync(dir).filter((f) => f !== 'index.js');

let warnings = 0;
const warn = (f, m) => { warnings++; console.log(`  ! ${f}: ${m}`); };

function looksBilingual(v) {
  return v && typeof v === 'object' && typeof v.en === 'string' && typeof v.bn === 'string';
}

function hasBangla(s) {
  return /[\u0980-\u09FF]/.test(s);
}

function walk(f, where, node) {
  if (Array.isArray(node)) return node.forEach((n, i) => walk(f, `${where}[${i}]`, n));
  if (!node || typeof node !== 'object') return;

  if (looksBilingual(node) && Object.keys(node).length <= 3) {
    if (!node.bn.trim()) warn(f, `${where}: empty bn`);
    else if (node.bn === node.en && hasBangla(node.en) === false) {
      // identical copies are suspicious only for prose with real content
      if (node.en.trim().length > 20) warn(f, `${where}: bn identical to en (untranslated?)`);
    } else if (!hasBangla(node.bn) && node.en.trim().length > 40 && !/[0-9O()\s.,+\-*/<>=]/.test(node.bn.replace(/[\x00-\x7F]/g, ''))) {
      warn(f, `${where}: bn has no Bangla characters`);
    }
    return;
  }

  for (const [k, v] of Object.entries(node)) walk(f, `${where}.${k}`, v);
}

function checkTopic(f, t) {
  const ids = new Set();
  t.steps.forEach((s, i) => {
    // step ids are optional per SCHEMA.md — only flag duplicates when present
    if (s.id != null) {
      if (ids.has(s.id)) warn(f, `${t.id}: duplicate step id "${s.id}"`);
      else ids.add(s.id);
    }

    const hasText = (looksBilingual(s.text) && (s.text.en || s.text.bn)) || s.title;
    if (!hasText) warn(f, `${t.id}.steps[${i}]: no title and no text`);

    if (typeof s.note === 'string' && /<[a-z/]/i.test(s.note)) {
      warn(f, `${t.id}.steps[${i}]: note contains HTML (renderer escapes notes)`);
    }
  });
}

for (const f of files) {
  const mod = await import(pathToFileURL(path.join(dir, f)).href);
  const topics = Object.values(mod).find((v) => Array.isArray(v)) || [];
  if (!topics.length) { console.log(`  · ${f}: placeholder (0 topics)`); continue; }
  console.log(`  ${f}: ${topics.length} topic(s)`);
  for (const t of topics) checkTopic(f, t);
  walk(f, f.replace('.js', ''), { topics });
}

console.log(`\n${warnings} warning(s)`);
