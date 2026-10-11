import React from 'react';
import { Repeat } from 'lucide-react';
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
 */
export default function LoopTracker({ loops, lang }) {
  if (!loops || !loops.length) return null;
  return (
    <div className="loop-tracker" aria-label={lang === 'bn' ? 'লুপ ট্র্যাকার' : 'Loop tracker'}>
      <div className="loop-tracker-head">
        <Repeat size={13} />
        <span>{lang === 'bn' ? 'লুপ এখন কোথায়' : 'Where the loops are now'}</span>
        <span className="loop-legend" aria-hidden="true">
          <span className="loop-chip done"><b>{lang === 'bn' ? 'শেষ' : 'done'}</b></span>
          <span className="loop-chip current"><b>{lang === 'bn' ? 'এখন' : 'now'}</b></span>
          <span className="loop-chip todo"><b>{lang === 'bn' ? 'বাকি' : 'next'}</b></span>
        </span>
      </div>
      {loops.map((loop, depth) => (
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
