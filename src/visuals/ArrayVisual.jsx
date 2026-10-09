import React from 'react';
import { hlClass, tone, rich, t, HL_MEANING } from './utils.js';

const CELL_W = 54;
const GAP = 6;

function cellValue(cell) {
  return cell && typeof cell === 'object' ? cell.v ?? cell.val ?? cell.value ?? '' : cell;
}

/** First highlight key that applies to index i (for the hover tooltip). */
function meaningOf(highlights, i, lang) {
  if (!highlights) return '';
  for (const k of Object.keys(HL_MEANING)) {
    const v = highlights[k];
    if (v == null) continue;
    const list = Array.isArray(v) ? v : [v];
    if (list.some((x) => (typeof x === 'object' && x !== null ? x.i : Number(x)) === i)) return t(HL_MEANING[k], lang);
  }
  return '';
}

function tooltip(i, val, meaning, lang) {
  const idx = lang === 'bn' ? 'ইনডেক্স' : 'index';
  const value = lang === 'bn' ? 'মান' : 'value';
  return `${idx} ${i} · ${value} ${val}${meaning ? ` · ${meaning}` : ''}`;
}

/** Pointer tags stacked under one cell: ▲ then the label. */
function PointerTags({ list }) {
  if (!list.length) return null;
  return (
    <div className="av-ptrs">
      {list.map((p, k) => (
        <div key={`${p.label}-${k}`} className={`av-ptr ${tone(p.tone)}`}>
          <span className="av-ptr-tip">▲</span>
          <span className="av-ptr-label">{p.label}</span>
        </div>
      ))}
    </div>
  );
}

/** One row of boxes. Used for the main array and every `aux` row. */
function BoxRow({ cells, highlights, pointers = [], sub, showIndex = true, brackets = [], lang, small }) {
  const w = small ? 44 : CELL_W;
  const hasPtrs = pointers.length > 0;
  return (
    <div className="av-row-wrap">
      <div className="av-row" style={{ gap: GAP }}>
        {cells.map((cell, i) => {
          const val = cellValue(cell);
          const subText = (sub && sub[i]) ?? (cell && typeof cell === 'object' ? cell.sub : null);
          const cls = hlClass(highlights, i);
          const meaning = meaningOf(highlights, i, lang);
          return (
            <div key={i} className="av-col" style={{ width: w }}>
              <div
                className={`arr-cell av-cell ${cls}`}
                style={{ width: w, height: small ? 42 : 54, fontSize: small ? 14 : 17 }}
                title={tooltip(i, val, meaning, lang)}
              >
                {val === '' || val == null ? <span className="av-empty">·</span> : String(val)}
              </div>
              {showIndex && <div className="av-idx">{i}</div>}
              {subText != null && subText !== '' && <div className="av-sub">{subText}</div>}
              {hasPtrs && <PointerTags list={pointers.filter((p) => Number(p.i) === i)} />}
            </div>
          );
        })}
      </div>
      {brackets.map((b, k) => {
        const from = Math.max(0, b.from);
        const to = Math.min(cells.length - 1, b.to);
        if (to < from) return null;
        return (
          <div
            key={k}
            className={`av-bracket ${tone(b.tone, 'v-green')}`}
            style={{ marginLeft: from * (w + GAP), width: (to - from) * (w + GAP) + w }}
          >
            <span className="av-bracket-line" />
            {b.label && <span className="av-bracket-label">{t(b.label, lang)}</span>}
          </div>
        );
      })}
    </div>
  );
}

function BarsRow({ cells, highlights, pointers = [], lang }) {
  const values = cells.map((c) => Number(cellValue(c)) || 0);
  const max = Math.max(1, ...values);
  const MAX_H = 190;
  return (
    <div className="av-row" style={{ gap: GAP, alignItems: 'flex-end' }}>
      {values.map((v, i) => {
        const cls = hlClass(highlights, i);
        const meaning = meaningOf(highlights, i, lang);
        return (
          <div key={i} className={`bar-col av-col ${cls}`} style={{ width: 44 }} title={tooltip(i, v, meaning, lang)}>
            <div className="bar" style={{ height: Math.max(8, (v / max) * MAX_H) }}>
              <span className="bar-val">{v}</span>
            </div>
            <div className="av-idx">{i}</div>
            <PointerTags list={pointers.filter((p) => Number(p.i) === i)} />
          </div>
        );
      })}
    </div>
  );
}

export default function ArrayVisual({ scene, lang }) {
  const cells = scene.cells || [];
  const isBars = scene.kind === 'bars';
  const aux = Array.isArray(scene.aux) ? scene.aux : [];
  const auxText = typeof scene.aux === 'string' || (scene.aux && !Array.isArray(scene.aux) && typeof scene.aux === 'object') ? scene.aux : null;
  // Index numbers help every beginner, so they are on unless a lesson turns them off.
  const showIndex = scene.showIndex !== false;

  return (
    <div className="av-wrap">
      {scene.label && <div className="arr-label" dangerouslySetInnerHTML={{ __html: rich(scene.label, lang) }} />}

      {cells.length === 0 ? (
        <div className="queue-empty">{lang === 'bn' ? 'খালি অ্যারে []' : 'empty array []'}</div>
      ) : isBars ? (
        <BarsRow cells={cells} highlights={scene.highlights} pointers={scene.pointers} lang={lang} />
      ) : (
        <div className="av-main">
          {showIndex && <div className="av-axis-hint">{lang === 'bn' ? 'ইনডেক্স →' : 'index →'}</div>}
          <BoxRow
            cells={cells}
            highlights={scene.highlights}
            pointers={scene.pointers}
            sub={scene.sub}
            showIndex={showIndex}
            brackets={scene.brackets}
            lang={lang}
          />
        </div>
      )}

      {aux.length > 0 && (
        <div className="arr-aux">
          {aux.map((a, k) => (
            <div key={k} className="arr-aux-block">
              {a.label && <div className="arr-aux-title" dangerouslySetInnerHTML={{ __html: rich(a.label, lang) }} />}
              <BoxRow
                cells={a.cells || a.items || []}
                highlights={a.highlights}
                pointers={a.pointers}
                sub={a.sub}
                showIndex={a.showIndex}
                lang={lang}
                small
              />
            </div>
          ))}
        </div>
      )}
      {auxText && <div className="ll-caption" dangerouslySetInnerHTML={{ __html: rich(auxText, lang) }} />}

      {scene.output && scene.output.length > 0 && (
        <div className="tree-output-wrap">
          <div className="tree-output-head">
            <span>{t(scene.outputLabel, lang) || (lang === 'bn' ? 'আউটপুট:' : 'Output:')}</span>
          </div>
          <div className="tree-output-tape">
            {scene.output.map((val, idx) => (
              <div key={idx} className={`tree-output-cell ${idx === scene.output.length - 1 ? 'just-added' : ''}`}>
                <span>{val}</span>
                <span className="tree-output-sub">{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {scene.note && <div className="arr-note" dangerouslySetInnerHTML={{ __html: rich(scene.note, lang) }} />}
    </div>
  );
}
