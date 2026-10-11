import React, { useState } from 'react';
import { Repeat, ChevronDown } from 'lucide-react';
import { t } from '../visuals/utils.js';

const NTH = { en: (i, n, u) => `${u} ${i} of ${n}`, bn: (i, n, u) => `${n}টার মধ্যে ${i} নম্বর ${u}` };

/** `x` in a label becomes inline code. */
const inline = (text) => String(text).split('`').map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part));

/** Where a loop stands: "round 3 of 6", "pass 4", "finished", "not started". */
function progress(loop, lang) {
  const unit = t(loop.unit, lang) || (lang === 'bn' ? 'পাস' : 'pass');
  if (loop.pass != null) return lang === 'bn' ? `${loop.pass} নম্বর ${unit}` : `${unit} ${loop.pass}`;
  const items = loop.items || [];
  const cur = items.findIndex((it) => it.s === 'current');
  if (cur >= 0) return NTH[lang === 'bn' ? 'bn' : 'en'](cur + 1, items.length, unit);
  if (!items.length) return lang === 'bn' ? 'কিছুই নেই' : 'nothing to loop over';
  if (items.every((it) => it.s === 'todo')) return lang === 'bn' ? `এখনো শুরু হয়নি · ${items.length}টা` : `not started · ${items.length} to go`;
  if (items.some((it) => it.s === 'todo')) return lang === 'bn' ? 'চলছে' : 'running';
  return lang === 'bn' ? 'শেষ ✓' : 'finished ✓';
}

/**
 * The loops running at this step, outer first, drawn as rows of chips
 * (a loop's `depth` says how far it is indented; it defaults to its place):
 * ✓ = passes already done, yellow = the pass running now (the same yellow as
 * the highlighted code line), outlined = passes still to come.
 *
 * It starts folded to one line (each loop's current value) so it does not push
 * the code down; the reader can open it, and the choice is remembered.
 */
const OPEN_KEY = 'algosim-loops-open';
const readOpen = () => { try { return localStorage.getItem(OPEN_KEY) === '1'; } catch { return false; } };
export default function LoopTracker({ loops, lang }) {
  const [open, setOpen] = useState(readOpen);
  if (!loops || !loops.length) return null;
  const toggle = () => setOpen((o) => {
    try { localStorage.setItem(OPEN_KEY, o ? '0' : '1'); } catch {}
    return !o;
  });
  // folded view: one short pill per loop — its variable right now, or how far it is
  const summary = loops.map((loop) => t(loop.now, lang) || progress(loop, lang));
  return (
    <div className={`loop-tracker${open ? '' : ' folded'}`} aria-label={lang === 'bn' ? 'লুপ ট্র্যাকার' : 'Loop tracker'}>
      <button type="button" className="loop-tracker-head" onClick={toggle} aria-expanded={open}>
        <Repeat size={13} />
        <span>{lang === 'bn' ? 'লুপ এখন কোথায়' : 'Where the loops are now'}</span>
        {!open && (
          <span className="loop-summary">
            {summary.map((x, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="loop-summary-sep">›</span>}
                <code>{x}</code>
              </React.Fragment>
            ))}
          </span>
        )}
        {open && (
          <span className="loop-legend" aria-hidden="true">
            <span className="loop-chip done"><b>{lang === 'bn' ? 'শেষ' : 'done'}</b></span>
            <span className="loop-chip current"><b>{lang === 'bn' ? 'এখন' : 'now'}</b></span>
            <span className="loop-chip todo"><b>{lang === 'bn' ? 'বাকি' : 'next'}</b></span>
          </span>
        )}
        <ChevronDown size={15} className="loop-caret" />
      </button>
      {open && loops.map((loop, depth) => (
        <div key={depth} className={`loop-row${loop.paused ? ' paused' : ''}`} style={{ '--depth': loop.depth ?? depth }}>
          <div className="loop-line1">
            <code className="loop-code">{t(loop.code, lang)}</code>
            <span className="loop-progress">{progress(loop, lang)}</span>
          </div>
          {loop.label && <div className="loop-label">{inline(t(loop.label, lang))}</div>}
          {loop.items && loop.items.length > 0 && (
            <div className="loop-chips">
              {loop.items.map((it, i) => (
                <span key={i} className={`loop-chip ${it.s}`} title={it.note ? `${it.t}: ${t(it.note, lang)}` : undefined}>
                  <b>{it.t}</b>
                  {it.note != null && <small>{t(it.note, lang)}</small>}
                </span>
              ))}
            </div>
          )}
          {(loop.now || loop.check) && (
            <div className="loop-now">
              {loop.now && <code>{t(loop.now, lang)}</code>}
              {loop.check && <span>{t(loop.check, lang)}</span>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
