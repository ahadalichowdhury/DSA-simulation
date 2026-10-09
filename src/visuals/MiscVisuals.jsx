import React from 'react';
import { rich, t } from './utils.js';

export function IdleVisual({ scene, lang }) {
  const title = t(scene?.title, lang) || t(scene?.label, lang);
  return (
    <div className="idle-card">
      <div className="idle-icon">💡</div>
      <div className="idle-title">
        {title || (lang === 'bn' ? 'এই ধাপে শুধু ধারণা — ডানের লেখাটা পড়ো' : 'Idea step — read the explanation on the right')}
      </div>
      {scene?.desc && <div className="idle-desc" dangerouslySetInnerHTML={{ __html: rich(scene.desc, lang) }} />}
      {scene?.note && <div className="arr-note" dangerouslySetInnerHTML={{ __html: rich(scene.note, lang) }} />}
    </div>
  );
}

export function ChartVisual({ scene, lang }) {
  const items = scene.items || [];
  const values = items.map((it) => Number(it.v ?? it.value) || 0);
  const max = Number(scene.max) || Math.max(1, ...values);
  const unit = t(scene.unit, lang);
  const H = 240;
  return (
    <div className="av-wrap">
      {scene.label && <div className="arr-label" dangerouslySetInnerHTML={{ __html: rich(scene.label, lang) }} />}
      <div className="chart2">
        <div className="chart2-axis">
          <span>{lang === 'bn' ? 'বেশি কাজ ↑' : 'more work ↑'}</span>
          <span>{lang === 'bn' ? 'কম' : 'less'}</span>
        </div>
        <div className="chart2-plot" style={{ height: H }}>
          {items.map((it, i) => {
            const v = values[i];
            const h = Math.max(4, Math.min(1, v / max) * (H - 30));
            return (
              <div key={i} className="chart2-col" title={`${t(it.label, lang)}: ${v}${unit ? ` ${unit}` : ''}`}>
                <div className="chart2-val">{v}{unit ? ` ${unit}` : ''}</div>
                <div className="chart2-bar" style={{ height: h, background: it.color || undefined }} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="chart2-labels">
        {items.map((it, i) => (
          <div key={i} className="chart2-label">
            <b>{t(it.label, lang)}</b>
            {it.note && <small>{t(it.note, lang)}</small>}
          </div>
        ))}
      </div>
      {scene.note && <div className="arr-note" dangerouslySetInnerHTML={{ __html: rich(scene.note, lang) }} />}
    </div>
  );
}

const ENTRY_CLS = { new: 'h-new', col: 'h-col', probe: 'h-probe', remove: 'h-remove' };
const ROW_CLS = { active: 'h-active', hit: 'h-hit', miss: 'h-miss' };

export function HashVisual({ scene, lang }) {
  const buckets = scene.buckets || [];
  const bn = lang === 'bn';
  return (
    <div className="av-wrap">
      {scene.label && <div className="arr-label" dangerouslySetInnerHTML={{ __html: rich(scene.label, lang) }} />}
      {scene.formula && (
        <div className="hash-fn">
          <span>h(key) =</span>
          <span className="fn-box">{scene.formula}</span>
          {scene.formulaResult != null && (
            <>
              <span className="fn-arrow">→</span>
              <span className="fn-res">{bn ? 'বাকেট' : 'bucket'} {scene.formulaResult}</span>
            </>
          )}
        </div>
      )}
      <div className="hash-wrap">
        <div className="hash-head">
          <div style={{ width: 74 }}>{t(scene.indexLabel, lang) || (bn ? 'বাকেট' : 'Bucket')}</div>
          <div>{t(scene.valueLabel, lang) || (bn ? 'কী → মান' : 'Key → Value')}</div>
        </div>
        {buckets.map((b, k) => {
          const idx = b.i ?? k;
          const entries = b.entries || (b.val != null || b.value != null ? [{ k: b.val ?? b.value }] : []);
          return (
            <div key={k} className={`hash-row ${ROW_CLS[b.state] || ''}`}>
              <div className="hash-idx">[{idx}]</div>
              <div className="hash-cells">
                {entries.length === 0 && !b.probe && <span className="hash-empty">{bn ? 'খালি' : 'empty'}</span>}
                {entries.map((e, j) => (
                  <React.Fragment key={j}>
                    {j > 0 && <span className="hash-arrow" title={bn ? 'একই বাকেটে পরের জন' : 'next in the same bucket'}>→</span>}
                    <span className={`hash-entry ${ENTRY_CLS[e.state] || ''}`}>
                      <span className="hk">{e.k}</span>
                      {e.v != null && (
                        <>
                          <span className="hash-arrow">→</span>
                          <span>{e.v}</span>
                        </>
                      )}
                    </span>
                  </React.Fragment>
                ))}
                {b.probe && <span className="hash-entry h-probe">{b.probe}</span>}
              </div>
            </div>
          );
        })}
      </div>
      {scene.note && <div className="arr-note" dangerouslySetInnerHTML={{ __html: rich(scene.note, lang) }} />}
    </div>
  );
}
