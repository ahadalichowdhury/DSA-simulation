import React, { useEffect, useState } from 'react';
import { Shuffle, AlertCircle, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { ALGOS, ALGO_GROUPS, PRESETS, presetOp, randomOp, checkGraphOp, GRAPH_DEFAULT } from '../visuals/graphPlayground.js';
import { t } from '../visuals/utils.js';

/**
 * Sets up a graph-playground run as one short sentence:
 * "Run [BFS] on edges [0-1, 0-2 …] as [two-way] from vertex [0]".
 * It never runs anything itself: the draft goes up to App, and ▶ Play runs it.
 */
export default function GraphToolbar({ lastOp, lang, isMobile, onDraftChange, onPlay, error }) {
  const L = (en, bn) => (lang === 'bn' ? bn : en);
  const init = lastOp || GRAPH_DEFAULT;
  const [algo, setAlgo] = useState(init.algo);
  const [edges, setEdges] = useState(init.edges);
  const [directed, setDirected] = useState(!!init.directed);
  const [start, setStart] = useState(String(init.start ?? 0));

  const A = ALGOS[algo];
  const effDirected = A.dir === 'either' ? directed : A.dir === 'directed';
  const presets = PRESETS[A.presets];

  const [open, setOpen] = useState(() => {
    try {
      const saved = localStorage.getItem('algosim-graph-toolbar');
      return saved ? saved !== 'hidden' : !isMobile;
    } catch { return !isMobile; }
  });
  const toggleOpen = () => setOpen((o) => {
    try { localStorage.setItem('algosim-graph-toolbar', o ? 'hidden' : 'open'); } catch { /* storage blocked */ }
    return !o;
  });
  useEffect(() => { if (error) setOpen(true); }, [error]);

  const draft = { algo, edges, directed: effDirected, start: A.start ? start : 0 };
  const draftKey = JSON.stringify(draft);
  useEffect(() => {
    onDraftChange(draft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftKey]);

  const load = (op) => { setEdges(op.edges); setDirected(!!op.directed); setStart(String(op.start ?? 0)); };

  // Switching algorithm keeps your graph when it suits the new one; otherwise it loads that algorithm's example.
  const chooseAlgo = (key) => {
    setAlgo(key);
    const keep = { algo: key, edges, directed: ALGOS[key].dir === 'either' ? directed : ALGOS[key].dir === 'directed', start: ALGOS[key].start ? start : 0 };
    if (checkGraphOp(keep)) load(presetOp(key, PRESETS[ALGOS[key].presets][0]));
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
          <span>{L('Show graph settings', 'গ্রাফের সেটিং দেখাও')}</span>
          <span className="bst-collapse-current">{L(A.en, A.bn)}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bst-bar">
      <div className="bst-bar-top">
        <div className="gp-algos" role="tablist" aria-label={L('Algorithm', 'অ্যালগরিদম')}>
          {ALGO_GROUPS.map((grp) => (
            <div key={grp.label.en} className="gp-group">
              {!isMobile && <span className="gp-group-label">{t(grp.label, lang)}</span>}
              <div className="bst-seg">
                {grp.keys.map((k) => {
                  const on = algo === k;
                  return (
                    <button key={k} type="button" role="tab" aria-selected={on} className={`bst-seg-btn${on ? ' on' : ''}`} onClick={() => chooseAlgo(k)} title={t(ALGOS[k].full, lang)}>
                      <span>{L(ALGOS[k].en, ALGOS[k].bn)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="bst-tree-info">
          <button type="button" className="bst-link-btn" onClick={() => load(presetOp(algo, presets[0]))}>
            <RotateCcw size={12} /> {L('Example', 'উদাহরণ')}
          </button>
          <button type="button" className="bst-hide-btn" onClick={toggleOpen} aria-expanded title={L('Hide to see the graph bigger', 'গ্রাফ বড় করে দেখতে লুকাও')}>
            <ChevronDown size={14} />
            {!isMobile && <span>{L('Hide', 'লুকাও')}</span>}
          </button>
        </div>
      </div>

      <form className="bst-sentence-wrap" onSubmit={submit}>
        <div className="bst-sentence">
          <span>{L('Edges', 'এজ')}</span>
          <span className="bst-values">
            <input
              className="bst-inline-input bst-wide gp-edges"
              value={edges}
              onChange={(e) => setEdges(e.target.value)}
              placeholder={A.weighted ? '0-1:4, 0-2:3, 1-2:1' : '0-1, 0-2, 1-3'}
              aria-label={L('Edges, separated by commas', 'এজগুলো, কমা দিয়ে আলাদা')}
              spellCheck={false}
            />
            <button type="button" className="bst-icon-btn" title={L('Random graph', 'এলোমেলো গ্রাফ')} onClick={() => load(randomOp(algo, effDirected))}>
              <Shuffle size={14} />
            </button>
          </span>
          {A.dir === 'either' ? (
            <span className="bst-modes" role="radiogroup" aria-label={L('Edge direction', 'এজের দিক')}>
              <button type="button" role="radio" aria-checked={!directed} className={`bst-mode${!directed ? ' on' : ''}`} onClick={() => setDirected(false)}>
                {L('Two-way', 'দুই-মুখী')}
              </button>
              <button type="button" role="radio" aria-checked={directed} className={`bst-mode${directed ? ' on' : ''}`} onClick={() => setDirected(true)}>
                {L('One-way →', 'একমুখী →')}
              </button>
            </span>
          ) : (
            <span className="bst-hint">{effDirected ? L('one-way arrows', 'একমুখী তীর') : L('two-way edges', 'দুই-মুখী এজ')}</span>
          )}
          {A.start && (
            <>
              <span>{L('start at', 'শুরু')}</span>
              <input
                className="bst-inline-input"
                inputMode="numeric"
                value={start}
                onChange={(e) => setStart(e.target.value.replace(/[^\d]/g, ''))}
                aria-label={L('Start vertex', 'শুরুর ভার্টেক্স')}
                size={2}
              />
            </>
          )}
        </div>
        <div className="bst-sub-row">
          <span className="bst-hint">
            {t(A.hint, lang)} {A.weighted ? L('Write each edge as from-to:weight.', 'প্রতিটা এজ লেখো থেকে-পর্যন্ত:ওজন।') : L('Write each edge as from-to.', 'প্রতিটা এজ লেখো থেকে-পর্যন্ত।')}
          </span>
          <span className="bst-examples">
            {L('Try', 'চেষ্টা করো')}
            {presets.map((p) => (
              <button key={p.key} type="button" className="bst-example" onClick={() => load(presetOp(algo, p))}>
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
