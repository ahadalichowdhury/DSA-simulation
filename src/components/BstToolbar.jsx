import React, { useEffect, useState } from 'react';
import { Hammer, Search, PlusCircle, Trash2, PencilLine, ListOrdered, RotateCcw, Shuffle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { inorder, BST_DEFAULT } from '../visuals/bstGenerator.js';
import { t } from '../visuals/utils.js';

const TABS = [
  { key: 'build', icon: Hammer, en: 'Create', bn: 'তৈরি' },
  { key: 'search', icon: Search, en: 'Search', bn: 'খোঁজা' },
  { key: 'insert', icon: PlusCircle, en: 'Insert', bn: 'ইনসার্ট' },
  { key: 'delete', icon: Trash2, en: 'Delete', bn: 'ডিলিট' },
  { key: 'update', icon: PencilLine, en: 'Update', bn: 'আপডেট' },
  { key: 'traverse', icon: ListOrdered, en: 'Traverse', bn: 'ট্রাভার্স' }
];

const MODES = [
  { key: 'preorder', en: 'Preorder', bn: 'প্রি-অর্ডার', hint: { en: 'The first value is the root', bn: 'প্রথম মানটা রুট' } },
  { key: 'inorder', en: 'Inorder', bn: 'ইন-অর্ডার', hint: { en: 'A sorted list, built as a balanced tree', bn: 'সাজানো লিস্ট, ব্যালান্সড ট্রি হিসেবে' } },
  { key: 'postorder', en: 'Postorder', bn: 'পোস্ট-অর্ডার', hint: { en: 'The last value is the root', bn: 'শেষ মানটা রুট' } },
  { key: 'insert', en: 'One by one', bn: 'একে একে', hint: { en: 'Insert the values in this order', bn: 'এই ক্রমে ইনসার্ট' } }
];

const PRESETS = [
  { en: 'Balanced', bn: 'ব্যালান্সড', input: BST_DEFAULT.input, mode: BST_DEFAULT.mode },
  { en: 'Bigger', bn: 'বড়', input: '50, 25, 12, 6, 18, 37, 31, 43, 75, 62, 56, 68, 87, 81, 93', mode: 'preorder' },
  { en: 'Sorted 1 to 7', bn: 'সাজানো ১ থেকে ৭', input: '1, 2, 3, 4, 5, 6, 7', mode: 'inorder' },
  { en: 'Leaning to one side', bn: 'একদিকে হেলানো', input: '10, 20, 30, 40, 50', mode: 'insert' }
];

function randomValues(n) {
  const set = new Set();
  while (set.size < n) set.add(1 + Math.floor(Math.random() * 99));
  return [...set];
}

/**
 * Sets up the next BST operation as one short sentence with the inputs inside it.
 * It never runs anything itself: the draft goes up to App, and ▶ Play runs it.
 */
export default function BstToolbar({ tree, lastOp, lang, isMobile, onDraftChange, onPlay, error }) {
  const L = (en, bn) => (lang === 'bn' ? bn : en);
  const [tab, setTab] = useState(lastOp?.type || 'build');
  const [buildInput, setBuildInput] = useState(lastOp?.type === 'build' ? lastOp.input : BST_DEFAULT.input);
  const [mode, setMode] = useState(lastOp?.type === 'build' ? lastOp.mode : BST_DEFAULT.mode);
  const [key, setKey] = useState(lastOp?.key != null ? String(lastOp.key) : '');
  const [newKey, setNewKey] = useState(lastOp?.newKey != null ? String(lastOp.newKey) : '');
  const [walkOrder, setWalkOrder] = useState(lastOp?.order || 'inorder');

  const keys = tree ? inorder(tree) : [];

  // Hide the section to give the tree the whole canvas. Remembered between visits.
  const [open, setOpen] = useState(() => {
    // On a phone it starts hidden so the tree gets the screen; your choice is remembered.
    try {
      const saved = localStorage.getItem('algosim-bst-toolbar');
      return saved ? saved !== 'hidden' : !isMobile;
    } catch { return !isMobile; }
  });
  const toggleOpen = () => setOpen((o) => {
    try { localStorage.setItem('algosim-bst-toolbar', o ? 'hidden' : 'open'); } catch { /* storage blocked */ }
    return !o;
  });
  // An error must be visible, so it reopens the section.
  useEffect(() => { if (error) setOpen(true); }, [error]);

  const draft =
    tab === 'build' ? { type: 'build', input: buildInput, mode }
      : tab === 'traverse' ? { type: 'traverse', order: walkOrder }
        : tab === 'update' ? { type: 'update', key, newKey }
          : { type: tab, key };
  const draftKey = JSON.stringify(draft);
  useEffect(() => {
    onDraftChange(draft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftKey]);

  const submit = (e) => {
    e.preventDefault();
    onPlay();
  };

  const numInput = (id, value, set, placeholder, label) => (
    <input
      id={id}
      className="bst-inline-input"
      inputMode="decimal"
      value={value}
      onChange={(e) => set(e.target.value)}
      placeholder={placeholder}
      aria-label={label}
      size={Math.max(3, String(value || placeholder).length + 1)}
    />
  );

  // The values already in the tree, drawn as tiny nodes. Tapping one fills the box.
  const nodePicker = keys.length > 0 && (
    <div className="bst-picker">
      <span className="bst-picker-label">{L('or tap a node:', 'অথবা একটা নোডে ট্যাপ করো:')}</span>
      <div className="bst-picker-nodes">
        {keys.map((v) => (
          <button
            type="button"
            key={v}
            className={`bst-mini-node${String(key) === String(v) ? ' on' : ''}`}
            onClick={() => setKey(String(v))}
            aria-pressed={String(key) === String(v)}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );

  if (!open) {
    const current = TABS.find((tb) => tb.key === tab);
    const Icon = current.icon;
    return (
      <div className="bst-bar bst-bar-collapsed">
        <button type="button" className="bst-collapse-btn" onClick={toggleOpen} aria-expanded={false}>
          <ChevronUp size={14} />
          <span>{L('Show operations', 'অপারেশন দেখাও')}</span>
          <span className="bst-collapse-current"><Icon size={12} /> {L(current.en, current.bn)}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bst-bar">
      <div className="bst-bar-top">
        <div className="bst-seg" role="tablist" aria-label={L('Operation', 'অপারেশন')}>
          {TABS.map((tb) => {
            const Icon = tb.icon;
            const on = tab === tb.key;
            return (
              <button
                key={tb.key}
                type="button"
                role="tab"
                aria-selected={on}
                className={`bst-seg-btn${on ? ' on' : ''}`}
                onClick={() => setTab(tb.key)}
                title={L(tb.en, tb.bn)}
              >
                <Icon size={14} />
                {(!isMobile || on) && <span>{L(tb.en, tb.bn)}</span>}
              </button>
            );
          })}
        </div>
        <div className="bst-tree-info">
          <span>{tree ? L(`Your tree has ${keys.length} nodes`, `তোমার ট্রিতে ${keys.length}টি নোড`) : L('Your tree is empty', 'তোমার ট্রি খালি')}</span>
          <button
            type="button"
            className="bst-link-btn"
            onClick={() => { setTab('build'); setBuildInput(BST_DEFAULT.input); setMode(BST_DEFAULT.mode); }}
          >
            <RotateCcw size={12} /> {L('Start over', 'আবার শুরু')}
          </button>
          <button type="button" className="bst-hide-btn" onClick={toggleOpen} aria-expanded title={L('Hide to see the tree bigger', 'ট্রি বড় করে দেখতে লুকাও')}>
            <ChevronDown size={14} />
            {!isMobile && <span>{L('Hide', 'লুকাও')}</span>}
          </button>
        </div>
      </div>

      <form className="bst-sentence-wrap" onSubmit={submit}>
        {tab === 'build' && (
          <>
            <div className="bst-sentence">
              <span>{L('Build a tree from', 'ট্রি বানাও এই মানগুলো দিয়ে')}</span>
              <span className="bst-values">
                <input
                  className="bst-inline-input bst-wide"
                  value={buildInput}
                  onChange={(e) => setBuildInput(e.target.value)}
                  placeholder="50, 30, 20, 40, 70, 60, 80"
                  aria-label={L('Values, separated by commas', 'মানগুলো, কমা দিয়ে আলাদা')}
                />
                <button type="button" className="bst-icon-btn" title={L('Random values', 'এলোমেলো মান')} onClick={() => { setBuildInput(randomValues(7).join(', ')); setMode('insert'); }}>
                  <Shuffle size={14} />
                </button>
              </span>
              <span>{L('read as', 'যেগুলো')}</span>
              <span className="bst-modes" role="radiogroup" aria-label={L('How to read the values', 'মানগুলো কীভাবে পড়বে')}>
                {MODES.map((m) => (
                  <button key={m.key} type="button" role="radio" aria-checked={mode === m.key} className={`bst-mode${mode === m.key ? ' on' : ''}`} title={t(m.hint, lang)} onClick={() => setMode(m.key)}>
                    {L(m.en, m.bn)}
                  </button>
                ))}
              </span>
            </div>
            <div className="bst-sub-row">
              <span className="bst-hint">{t(MODES.find((m) => m.key === mode)?.hint, lang)}.</span>
              <span className="bst-examples">
                {L('Try', 'চেষ্টা করো')}
                {PRESETS.map((p) => (
                  <button key={p.en} type="button" className="bst-example" onClick={() => { setBuildInput(p.input); setMode(p.mode); }}>
                    {L(p.en, p.bn)}
                  </button>
                ))}
              </span>
            </div>
          </>
        )}

        {tab === 'search' && (
          <>
            <div className="bst-sentence">
              <span>{L('Search for', 'খোঁজো')}</span>
              {numInput('bst-key', key, setKey, '60', L('Value to search for', 'যে মান খুঁজবে'))}
            </div>
            {nodePicker}
          </>
        )}

        {tab === 'insert' && (
          <div className="bst-sentence">
            <span>{L('Insert', 'ইনসার্ট করো')}</span>
            <span className="bst-values">
              {numInput('bst-key', key, setKey, '65', L('New value', 'নতুন মান'))}
              <button type="button" className="bst-icon-btn" title={L('Random new value', 'এলোমেলো নতুন মান')} onClick={() => { let v; do { v = 1 + Math.floor(Math.random() * 99); } while (keys.includes(v)); setKey(String(v)); }}>
                <Shuffle size={14} />
              </button>
            </span>
            <span className="bst-hint">{L('It will find its own empty spot.', 'এটা নিজের খালি জায়গা খুঁজে নেবে।')}</span>
          </div>
        )}

        {tab === 'delete' && (
          <>
            <div className="bst-sentence">
              <span>{L('Delete', 'ডিলিট করো')}</span>
              {numInput('bst-key', key, setKey, '30', L('Value to delete', 'যে মান মুছবে'))}
              <span className="bst-hint">{L('Try a leaf, a node with one child, and one with two.', 'একটা লিফ, এক চাইল্ডের আর দুই চাইল্ডের নোড চেষ্টা করো।')}</span>
            </div>
            {nodePicker}
          </>
        )}

        {tab === 'update' && (
          <>
            <div className="bst-sentence">
              <span>{L('Change', 'বদলাও')}</span>
              {numInput('bst-key', key, setKey, '40', L('Old value', 'পুরোনো মান'))}
              <span>{L('to', 'থেকে')}</span>
              {numInput('bst-new', newKey, setNewKey, '75', L('New value', 'নতুন মান'))}
            </div>
            {nodePicker}
          </>
        )}

        {tab === 'traverse' && (
          <div className="bst-sentence">
            <span>{L('Visit every node in', 'সব নোড দেখো')}</span>
            <span className="bst-modes" role="radiogroup" aria-label={L('Traversal order', 'ট্রাভার্সালের ক্রম')}>
              {[
                ['inorder', 'Inorder', 'ইন-অর্ডার', 'Left → Root → Right', 'বাম → রুট → ডান'],
                ['preorder', 'Preorder', 'প্রি-অর্ডার', 'Root → Left → Right', 'রুট → বাম → ডান'],
                ['postorder', 'Postorder', 'পোস্ট-অর্ডার', 'Left → Right → Root', 'বাম → ডান → রুট']
              ].map(([k, en, bn, ten, tbn]) => (
                <button key={k} type="button" role="radio" aria-checked={walkOrder === k} className={`bst-mode${walkOrder === k ? ' on' : ''}`} title={L(ten, tbn)} onClick={() => setWalkOrder(k)}>
                  {L(en, bn)}
                </button>
              ))}
            </span>
          </div>
        )}

        {/* Enter in any box works like ▶ Play */}
        <button type="submit" hidden aria-hidden="true" tabIndex={-1} />

        {error && (
          <div className="bst-error" role="alert">
            <AlertCircle size={14} />
            <span>{t(error, lang)}</span>
          </div>
        )}
      </form>
    </div>
  );
}
