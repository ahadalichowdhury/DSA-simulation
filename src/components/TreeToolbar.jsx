import React, { useEffect, useState } from 'react';
import { Shuffle, AlertCircle, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { TREE_ALGOS, TREE_GROUPS, TREE_DEFAULT, presetsOf, randomTreeOp } from '../visuals/treePlayground.js';
import { t } from '../visuals/utils.js';

/**
 * Sets up a tree-playground run as one short sentence:
 * "Values [50, 30, 70 …] built as [a BST | level by level]".
 * It never runs anything itself: the draft goes up to App, and ▶ Play runs it.
 */
export default function TreeToolbar({ lastOp, lang, isMobile, onDraftChange, onPlay, error }) {
  const L = (en, bn) => (lang === 'bn' ? bn : en);
  const init = lastOp || TREE_DEFAULT;
  const [algo, setAlgo] = useState(init.algo);
  const [values, setValues] = useState(init.values);
  const [shape, setShape] = useState(init.shape || 'bst');

  const A = TREE_ALGOS[algo];
  const presets = presetsOf(algo);

  const [open, setOpen] = useState(() => {
    try {
      const saved = localStorage.getItem('algosim-tree-toolbar');
      return saved ? saved !== 'hidden' : !isMobile;
    } catch { return !isMobile; }
  });
  const toggleOpen = () => setOpen((o) => {
    try { localStorage.setItem('algosim-tree-toolbar', o ? 'hidden' : 'open'); } catch { /* storage blocked */ }
    return !o;
  });
  useEffect(() => { if (error) setOpen(true); }, [error]);

  const draft = { algo, values, shape: A.shape ? shape : 'bst' };
  const draftKey = JSON.stringify(draft);
  useEffect(() => {
    onDraftChange(draft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftKey]);

  const load = (p) => { setValues(p.values); if (p.shape) setShape(p.shape); };
  // Switching to another family (traverse / AVL / heap) loads that family's first example.
  const chooseAlgo = (key) => {
    if (TREE_ALGOS[key].group !== A.group) load(presetsOf(key)[0]);
    setAlgo(key);
  };

  const submit = (e) => {
    e.preventDefault();
    onPlay();
  };

  if (!open) {
    return (
      <div className="bst-bar bst-bar-collapsed">
        <button type="button" className="bst-collapse-btn" onClick={toggleOpen} aria-expanded={false}>
          <ChevronUp size={14} />
          <span>{L('Show tree settings', 'ট্রির সেটিং দেখাও')}</span>
          <span className="bst-collapse-current">{L(A.en, A.bn)}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bst-bar">
      <div className="bst-bar-top">
        <div className="gp-algos" role="tablist" aria-label={L('Algorithm', 'অ্যালগরিদম')}>
          {TREE_GROUPS.map((grp) => (
            <div key={t(grp.label, 'en')} className="gp-group">
              {!isMobile && <span className="gp-group-label">{t(grp.label, lang)}</span>}
              <div className="bst-seg">
                {grp.keys.map((k) => {
                  const on = algo === k;
                  return (
                    <button key={k} type="button" role="tab" aria-selected={on} className={`bst-seg-btn${on ? ' on' : ''}`} onClick={() => chooseAlgo(k)}>
                      <span>{L(TREE_ALGOS[k].en, TREE_ALGOS[k].bn)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="bst-tree-info">
          <button type="button" className="bst-link-btn" onClick={() => load(presets[0])}>
            <RotateCcw size={12} /> {L('Example', 'উদাহরণ')}
          </button>
          <button type="button" className="bst-hide-btn" onClick={toggleOpen} aria-expanded title={L('Hide to see the tree bigger', 'ট্রি বড় করে দেখতে লুকাও')}>
            <ChevronDown size={14} />
            {!isMobile && <span>{L('Hide', 'লুকাও')}</span>}
          </button>
        </div>
      </div>

      <form className="bst-sentence-wrap" onSubmit={submit}>
        <div className="bst-sentence">
          <span>{L('Values', 'মান')}</span>
          <span className="bst-values">
            <input
              className="bst-inline-input bst-wide gp-edges"
              value={values}
              onChange={(e) => setValues(e.target.value)}
              placeholder="50, 30, 70, 20, 40"
              aria-label={L('Values, separated by commas', 'মানগুলো, কমা দিয়ে আলাদা')}
              spellCheck={false}
            />
            <button type="button" className="bst-icon-btn" title={L('Random values', 'এলোমেলো মান')} onClick={() => load(randomTreeOp(algo, shape))}>
              <Shuffle size={14} />
            </button>
          </span>
          {A.shape && (
            <>
              <span>{L('built as', 'বানাও')}</span>
              <span className="bst-modes" role="radiogroup" aria-label={L('Tree shape', 'ট্রির আকার')}>
                <button type="button" role="radio" aria-checked={shape === 'bst'} className={`bst-mode${shape === 'bst' ? ' on' : ''}`} onClick={() => setShape('bst')} title={L('Insert one by one: smaller left, bigger right', 'একে একে ইনসার্ট: ছোট বামে, বড় ডানে')}>
                  {L('a BST', 'BST হিসেবে')}
                </button>
                <button type="button" role="radio" aria-checked={shape === 'level'} className={`bst-mode${shape === 'level' ? ' on' : ''}`} onClick={() => setShape('level')} title={L('Fill row by row, left to right', 'সারি ধরে, বাম থেকে ডানে ভরো')}>
                  {L('level by level', 'লেভেল ধরে')}
                </button>
              </span>
            </>
          )}
        </div>
        <div className="bst-sub-row">
          <span className="bst-hint">{t(A.hint, lang)}</span>
          <span className="bst-examples">
            {L('Try', 'চেষ্টা করো')}
            {presets.map((p) => (
              <button key={t(p.label, 'en')} type="button" className="bst-example" onClick={() => load(p)}>
                {t(p.label, lang)}
              </button>
            ))}
          </span>
        </div>

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
