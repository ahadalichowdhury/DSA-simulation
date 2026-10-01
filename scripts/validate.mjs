#!/usr/bin/env node
/**
 * Validates AlgoSim topic modules against src/data/SCHEMA.md.
 * Usage:  node scripts/validate.mjs src/data/topics/arrays.js [more.js ...]
 *         node scripts/validate.mjs            (validates every file in topics/)
 */
import { readdirSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { pathToFileURL } from 'node:url';

const TOPICS_DIR = resolve('src/data/topics');
const CATEGORY_KEYS = ['basics', 'arrays', 'searching', 'sorting', 'linked', 'linear', 'hashing', 'trees', 'graphs', 'recursion'];
const LEVELS = ['beginner', 'intermediate', 'advanced'];
const KINDS = ['array', 'bars', 'linkedlist', 'stack', 'queue', 'tree', 'graph', 'hash', 'cards', 'chart', 'multiway', 'forest', 'catalan-calc', 'tree-memory', 'none'];
const HL_KEYS = ['compare', 'swap', 'active', 'sorted', 'pivot', 'target', 'insert', 'remove', 'dim', 'mark', 'visited', 'frontier', 'ok', 'reject', 'current', 'path', 'overflow', 'promote', 'split'];
const TONES = ['cyan', 'amber', 'green', 'purple', 'red', 'yellow', ''];
const CODE_LANGS = ['pseudo', 'js', 'java', 'python', 'cpp'];
const SUBGROUP_KEYS = {
  trees: ['foundations', 'traversals', 'bst', 'avl', 'multiway', 'heaps', 'basics', 'advanced']
};

let errors = 0;
let warnings = 0;
const err = (file, msg) => { errors++; console.log(`  ✗ ${msg}`); };
const warn = (file, msg) => { warnings++; console.log(`  ! ${msg}`); };

const bi = (file, where, v) => {
  if (v == null) return err(file, `${where} is missing`);
  if (typeof v === 'string') return warn(file, `${where} should be {en,bn} (plain string found)`);
  if (typeof v !== 'object' || !v.en || !v.bn) err(file, `${where} needs both "en" and "bn"`);
};

function checkScene(file, where, scene) {
  if (!scene || typeof scene !== 'object') return err(file, `${where}: scene missing`);
  if (!KINDS.includes(scene.kind)) return err(file, `${where}: unknown scene.kind "${scene.kind}"`);
  const k = scene.kind;

  if ((k === 'array' || k === 'bars') && !Array.isArray(scene.cells)) err(file, `${where}: ${k} needs cells[]`);
  if (k === 'linkedlist' && !Array.isArray(scene.nodes)) err(file, `${where}: linkedlist needs nodes[]`);
  if (k === 'stack' && !Array.isArray(scene.items)) err(file, `${where}: stack needs items[]`);
  if (k === 'queue' && !Array.isArray(scene.items)) err(file, `${where}: queue needs items[]`);
  if (k === 'tree' && !scene.root && !scene.memoryMode) err(file, `${where}: tree needs root{v,l,r}`);
  if (k === 'tree-memory' && !scene.memoryMode) err(file, `${where}: tree-memory needs memoryMode`);
  if (k === 'graph' && !Array.isArray(scene.nodes)) err(file, `${where}: graph needs nodes[]`);
  if (k === 'hash' && !Array.isArray(scene.buckets)) err(file, `${where}: hash needs buckets[]`);
  if (k === 'cards' && !Array.isArray(scene.cards)) err(file, `${where}: cards needs cards[]`);
  if (k === 'chart' && !Array.isArray(scene.items)) err(file, `${where}: chart needs items[]`);
  if (k === 'multiway') {
    if (!Array.isArray(scene.nodes) || scene.nodes.length === 0) err(file, `${where}: multiway needs nodes[]`);
    else {
      const ids = new Set();
      scene.nodes.forEach((n, i) => {
        if (!n || typeof n !== 'object') return err(file, `${where}: nodes[${i}] must be an object`);
        if (!n.id) err(file, `${where}: nodes[${i}].id missing`);
        else if (ids.has(n.id)) err(file, `${where}: duplicate node id "${n.id}"`);
        else ids.add(n.id);
        if (!Array.isArray(n.keys) || n.keys.length === 0) err(file, `${where}: nodes[${i}].keys must be a non-empty array`);
        else if (scene.order && n.keys.length > scene.order - 1) warn(file, `${where}: nodes[${i}] has ${n.keys.length} keys > order-1`);
        if (n.children && !Array.isArray(n.children)) err(file, `${where}: nodes[${i}].children must be an array`);
      });
      if (scene.root && !ids.has(scene.root)) err(file, `${where}: root "${scene.root}" not in nodes[]`);
      scene.nodes.forEach((n, i) => {
        (n.children || []).forEach((c) => {
          if (!ids.has(c)) err(file, `${where}: nodes[${i}] child "${c}" not in nodes[]`);
        });
      });
    }
  }
  if (k === 'forest' && !Array.isArray(scene.trees)) err(file, `${where}: forest needs trees[]`);
  if (k === 'tree' && scene.rotations && !Array.isArray(scene.rotations)) err(file, `${where}: rotations must be an array`);

  const n = scene.cells?.length ?? scene.nodes?.length ?? scene.items?.length ?? 0;
  if (scene.pointers) {
    if (!Array.isArray(scene.pointers)) err(file, `${where}: pointers must be an array`);
    else scene.pointers.forEach((p, i) => {
      if (typeof p.i !== 'number') err(file, `${where}: pointers[${i}].i must be a number (index)`);
      if (!p.label) err(file, `${where}: pointers[${i}].label missing`);
      if (p.tone && !TONES.includes(p.tone)) err(file, `${where}: pointers[${i}].tone "${p.tone}" invalid`);
      if (n && (p.i < 0 || p.i >= n)) warn(file, `${where}: pointer "${p.label}" i=${p.i} outside 0..${n - 1}`);
    });
  }
  if (scene.highlights) {
    const isNodeBased = ['tree', 'graph', 'multiway', 'forest'].includes(k);
    for (const key of Object.keys(scene.highlights)) {
      if (!HL_KEYS.includes(key)) warn(file, `${where}: highlight key "${key}" not in known list`);
      const v = scene.highlights[key];
      if (Array.isArray(v)) {
        v.forEach((x) => {
          const idx = typeof x === 'object' ? (x.id ?? x.i) : x;
          if (!isNodeBased) {
            if (typeof idx !== 'number') err(file, `${where}: highlights.${key} entries must be numbers`);
            else if (n && (idx < 0 || idx >= n)) warn(file, `${where}: highlights.${key} index ${idx} outside 0..${n - 1}`);
          } else {
            if (typeof idx !== 'number' && typeof idx !== 'string') err(file, `${where}: highlights.${key} entries must be number or string node ref`);
          }
        });
      }
    }
  }
  if (scene.aux && !Array.isArray(scene.aux) && typeof scene.aux !== 'string') err(file, `${where}: aux must be array or string`);
}

function checkStep(file, topicId, step, i) {
  const where = `${topicId}.steps[${i}]`;
  if (!step || typeof step !== 'object') return err(file, `${where}: not an object`);
  bi(file, `${where}.title`, step.title);
  bi(file, `${where}.explanation`, step.explanation);
  checkScene(file, where, step.scene);
  if (step.line != null) {
    const lines = Array.isArray(step.line) ? step.line : [step.line];
    lines.forEach((l) => { if (!Number.isInteger(l) || l < 0) err(file, `${where}.line must be a >=0 integer (0-based)`); });
  }
  if (step.iteration != null) {
    const it = step.iteration;
    if (typeof it !== 'object') err(file, `${where}.iteration must be { i, of, label? }`);
    else {
      if (!Number.isInteger(it.i) || it.i < 1) err(file, `${where}.iteration.i must be an integer >= 1`);
      if (!Number.isInteger(it.of) || it.of < 1) err(file, `${where}.iteration.of must be an integer >= 1`);
      if (Number.isInteger(it.i) && Number.isInteger(it.of) && it.i > it.of) err(file, `${where}.iteration.i (${it.i}) > of (${it.of})`);
      if (it.label != null) bi(file, `${where}.iteration.label`, it.label);
    }
  }
}

/** Old shape: { en: [...], bn: [...] }. New shape: { pseudo: {en,bn}, js: {en,bn}, … }. */
function isLegacyCode(code) {
  return Array.isArray(code?.en);
}

function checkCode(file, topic) {
  const code = topic.code;
  if (!code) { warn(file, `${topic.id}: no pseudocode`); return 0; }
  if (isLegacyCode(code)) {
    warn(file, `${topic.id}: legacy code shape (plain en/bn) — migrate to { pseudo, js, java, python, cpp }`);
    if (!code.bn || code.bn.length !== code.en.length) err(file, `${topic.id}: code.bn must mirror code.en length`);
    return code.en.length;
  }
  const pseudo = code.pseudo;
  if (!pseudo || !Array.isArray(pseudo.en)) {
    err(file, `${topic.id}: code needs a "pseudo" variant with en[] lines`);
    return 0;
  }
  if (!Array.isArray(pseudo.bn) || pseudo.bn.length !== pseudo.en.length) err(file, `${topic.id}: code.pseudo.bn must mirror pseudo.en length`);
  const n = pseudo.en.length;
  for (const lang of CODE_LANGS) {
    const v = code[lang];
    if (!v) { warn(file, `${topic.id}: code.${lang} missing`); continue; }
    if (!Array.isArray(v.en) || v.en.length !== n) err(file, `${topic.id}: code.${lang}.en must have exactly ${n} lines (same as pseudo)`);
    if (!Array.isArray(v.bn) || v.bn.length !== n) err(file, `${topic.id}: code.${lang}.bn must have exactly ${n} lines`);
    [...(v.en || []), ...(v.bn || [])].forEach((l, i) => {
      if (typeof l !== 'string') err(file, `${topic.id}: code.${lang} line ${i} is not a string`);
    });
  }
  return n;
}

function checkTopic(file, topic) {
  if (!topic.id || typeof topic.id !== 'string') err(file, 'topic.id missing');
  bi(file, `${topic.id}.name`, topic.name);
  bi(file, `${topic.id}.description`, topic.description);
  if (topic.categoryKey && !CATEGORY_KEYS.includes(topic.categoryKey)) err(file, `${topic.id}: bad categoryKey "${topic.categoryKey}"`);
  if (topic.level && !LEVELS.includes(topic.level)) err(file, `${topic.id}: bad level "${topic.level}"`);
  if (typeof topic.order !== 'number') warn(file, `${topic.id}: order should be a number`);
  if (typeof topic.icon !== 'string') err(file, `${topic.id}: icon (emoji) missing`);
  if (topic.subgroupKey != null) {
    const allowed = SUBGROUP_KEYS[topic.categoryKey];
    if (!allowed) err(file, `${topic.id}: subgroupKey is only valid for the trees chapter`);
    else if (!allowed.includes(topic.subgroupKey)) err(file, `${topic.id}: bad subgroupKey "${topic.subgroupKey}" (allowed: ${allowed.join(', ')})`);
  }
  if (!Array.isArray(topic.steps) || topic.steps.length < 3) err(file, `${topic.id}: needs at least 3 steps`);
  else {
    topic.steps.forEach((s, i) => checkStep(file, topic.id, s, i));
    const lines = checkCode(file, topic);
    topic.steps.forEach((s, i) => {
      if (s.line == null) return warn(file, `${topic.id}.steps[${i}]: no code line`);
      const ls = Array.isArray(s.line) ? s.line : [s.line];
      if (lines && ls.some((l) => l >= lines)) err(file, `${topic.id}.steps[${i}].line ${ls} beyond code length ${lines}`);
    });
  }
  if (topic.complexity) {
    for (const k of ['time', 'space', 'best', 'worst']) if (topic.complexity[k] != null && typeof topic.complexity[k] !== 'string') err(file, `${topic.id}: complexity.${k} must be a string`);
    if (topic.complexity.note) bi(file, `${topic.id}.complexity.note`, topic.complexity.note);
  }
}

async function main() {
  let files = process.argv.slice(2);
  if (files.length === 0) {
    files = readdirSync(TOPICS_DIR).filter((f) => f.endsWith('.js') && f !== 'index.js' && f !== 'traversalData.js').map((f) => resolve(TOPICS_DIR, f));
  }
  const seenIds = new Map();

  for (const file of files) {
    const label = basename(file);
    let mod;
    try {
      mod = await import(pathToFileURL(file).href);
    } catch (e) {
      errors++;
      console.log(`✗ ${label}: import failed — ${e.message}`);
      continue;
    }
    const list = Object.values(mod).find((v) => Array.isArray(v));
    if (!list) {
      errors++;
      console.log(`✗ ${label}: no exported array`);
      continue;
    }
    console.log(`${label}: ${list.length} topic(s)`);
    for (const topic of list) {
      checkTopic(label, topic);
      if (seenIds.has(topic.id)) err(label, `duplicate topic id "${topic.id}" (also in ${seenIds.get(topic.id)})`);
      seenIds.set(topic.id, label);
      const steps = topic.steps?.length || 0;
      const scenes = (topic.steps || []).filter((s) => s.scene && s.scene.kind !== 'none').length;
      console.log(`   • ${topic.id} — ${steps} steps, ${scenes} with drawings`);
    }
  }

  console.log(`\n${errors} error(s), ${warnings} warning(s)`);
  process.exit(errors ? 1 : 0);
}

main();
