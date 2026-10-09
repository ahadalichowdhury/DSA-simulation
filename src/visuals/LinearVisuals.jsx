import React from 'react';
import { hlClass, tone, rich, t } from './utils.js';

/* ======================= Linked list ======================= */

const NW = 84; // node width (data part + next part)
const NH = 54; // node height
const NEXT_W = 24; // width of the "next" slot on the right of each node
const GAP = 48; // room for an arrow between two nodes
const PAD_X = 14;
const TOP = 64; // room above for pointer tags

/** Index of the edge that closes a cycle (walking from head), or -1. */
function cycleEdge(next, head) {
  const seen = new Set();
  let cur = head ?? 0;
  while (cur != null && cur >= 0 && cur < next.length) {
    if (seen.has(cur)) return -1;
    seen.add(cur);
    const nx = next[cur];
    if (nx != null && seen.has(nx)) return cur;
    cur = nx;
  }
  return -1;
}

export function LinkedListVisual({ scene, lang }) {
  const nodes = scene.nodes || [];
  const n = nodes.length;
  const next = scene.next || nodes.map((_, i) => (i + 1 < n ? i + 1 : null));
  const hl = scene.highlights || {};
  const pointers = scene.pointers || [];
  const showNull = scene.showNull !== false;
  const showIndex = scene.showIndex !== false;
  const swapSet = new Set((hl.swap || []).map(Number));
  const closer = cycleEdge(next, scene.head);

  const x = (i) => PAD_X + i * (NW + GAP);
  const cy = TOP + NH / 2;
  const endsInNull = n > 0 && next[n - 1] == null;
  const nullX = x(n); // where the end-of-list null box sits
  const arcs = [];
  for (let i = 0; i < n; i++) {
    const to = next[i];
    if (to == null || to === i + 1) continue;
    arcs.push({ from: i, to });
  }
  const maxSpan = arcs.reduce((m, a) => Math.max(m, Math.abs(a.to - a.from)), 0);
  const arcDepth = (span) => 26 + span * 14;
  const W = x(n) + (showNull && endsInNull ? 70 : 0) + PAD_X;
  const H = TOP + NH + (showIndex ? 20 : 0) + (arcs.length ? arcDepth(maxSpan) + 10 : 12);

  const edgeCls = (i) => (i === closer ? 'll-edge cyc' : swapSet.has(i) ? 'll-edge flip' : hlClass(hl, i).includes('h-active') ? 'll-edge on' : 'll-edge');
  const dotX = (i) => x(i) + NW - NEXT_W / 2;

  return (
    <div className="ll-wrap2">
      {scene.label && <div className="arr-label" dangerouslySetInnerHTML={{ __html: rich(scene.label, lang) }} />}
      {n === 0 ? (
        <div className="queue-empty">{lang === 'bn' ? 'খালি লিস্ট: head → null' : 'empty list: head → null'}</div>
      ) : (
        <div className="ll-canvas" style={{ width: W, height: H }}>
          <svg className="ll-svg" width={W} height={H}>
            <defs>
              {['m', 'on', 'flip', 'cyc'].map((k) => (
                <marker key={k} id={`llArrow-${k}`} markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                  <path d="M0,0 L9,4.5 L0,9 z" className={`ll-head-${k}`} />
                </marker>
              ))}
            </defs>
            {nodes.map((_, i) => {
              const to = next[i];
              const cls = edgeCls(i);
              const mk = `url(#llArrow-${cls.split(' ')[1] || 'm'})`;
              if (to === i + 1) {
                return <line key={i} className={cls} x1={dotX(i)} y1={cy} x2={x(i + 1) - 3} y2={cy} markerEnd={mk} />;
              }
              if (to == null) {
                if (i === n - 1 && showNull) {
                  return <line key={i} className={cls} x1={dotX(i)} y1={cy} x2={nullX - 3} y2={cy} markerEnd={mk} />;
                }
                // a node in the middle that points to nothing: short stub + "null"
                return (
                  <g key={i} className="ll-stub">
                    <line className={cls} x1={dotX(i)} y1={cy} x2={dotX(i) + 26} y2={cy} />
                    <line className={cls} x1={dotX(i) + 26} y1={cy - 8} x2={dotX(i) + 26} y2={cy + 8} />
                    <text x={dotX(i) + 30} y={cy - 12} className="ll-stub-txt">null</text>
                  </g>
                );
              }
              // any other jump (skip, backwards link, cycle): curve underneath the row
              const sx = dotX(i);
              const tx = x(to) + NW / 2 - NEXT_W / 2;
              const y0 = TOP + NH;
              const d = arcDepth(Math.abs(to - i));
              return (
                <path
                  key={i}
                  className={cls}
                  d={`M ${sx} ${y0} C ${sx} ${y0 + d}, ${tx} ${y0 + d}, ${tx} ${y0 + 3}`}
                  markerEnd={mk}
                />
              );
            })}
          </svg>

          {nodes.map((v, i) => {
            const cls = hlClass(hl, i);
            const ptrs = pointers.filter((p) => Number(p.i) === i);
            return (
              <div
                key={i}
                className={`ll-node ${cls}`}
                style={{ position: 'absolute', left: x(i), top: TOP }}
                title={`${lang === 'bn' ? 'নোড' : 'node'} ${i}: ${lang === 'bn' ? 'মান' : 'value'} ${v} · next → ${next[i] == null ? 'null' : `${lang === 'bn' ? 'নোড' : 'node'} ${next[i]}`}`}
              >
                {ptrs.map((p, k) => (
                  <div key={k} className={`ll-pointer ${tone(p.tone, 'v-yellow')}`} style={{ top: -30 - k * 24 }}>
                    {p.label}
                  </div>
                ))}
                <div className="ll-box ll-box2" style={{ width: NW, height: NH }}>
                  <span className="ll-data">{v}</span>
                  <span className="ll-next"><i /></span>
                </div>
                {showIndex && <div className="av-idx">{i}</div>}
              </div>
            );
          })}

          {showNull && endsInNull && (
            <div className="ll-null ll-null2" style={{ position: 'absolute', left: nullX, top: TOP + 10 }}>
              ∅ null
            </div>
          )}
        </div>
      )}
      <div className="ll-key">
        <span className="ll-key-box"><b>data</b><i>next</i></span>
        <span>{lang === 'bn' ? '= একটা নোড: মান + পরের নোডের ঠিকানা' : '= one node: its value + the address of the next node'}</span>
      </div>
      {scene.aux && <div className="ll-caption" dangerouslySetInnerHTML={{ __html: rich(scene.aux, lang) }} />}
      {scene.note && <div className="arr-note" dangerouslySetInnerHTML={{ __html: rich(scene.note, lang) }} />}
    </div>
  );
}

/* ======================= Stack ======================= */

function StackColumn({ label, items, highlights, pointers = [], lang, main }) {
  const top = items.length - 1;
  return (
    <div className="stack-side">
      {label && <div className="stack-label" dangerouslySetInnerHTML={{ __html: rich(label, lang) }} />}
      {main && (
        <div className="stk-ops">
          <span className="stk-op in">↓ push</span>
          <span className="stk-op out">↑ pop</span>
        </div>
      )}
      <div className="stk-box">
        {items.length === 0 && <div className="stk-empty">{lang === 'bn' ? 'খালি' : 'empty'}</div>}
        <div className="stack-col">
          {items.map((it, i) => {
            const ptrs = pointers.filter((p) => Number(p.i) === i);
            return (
              <div key={`${i}-${it}`} className="stk-row">
                <div className={`stack-item ${hlClass(highlights, i)}`} title={`${lang === 'bn' ? 'অবস্থান' : 'position'} ${i}${i === top ? ' (top)' : ''}`}>
                  {String(it)}
                </div>
                <div className="stk-tags">
                  {ptrs.map((p, k) => (
                    <span key={k} className={`stk-tag ${tone(p.tone, 'v-yellow')}`}>◀ {p.label}</span>
                  ))}
                  {main && i === top && ptrs.length === 0 && <span className="stk-tag v-yellow">◀ top</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {main && <div className="stk-bottom">{lang === 'bn' ? 'তলা (সবার আগে ঢুকেছে)' : 'bottom (went in first)'}</div>}
    </div>
  );
}

export function StackVisual({ scene, lang }) {
  const aux = Array.isArray(scene.aux) ? scene.aux : [];
  return (
    <div className="av-wrap">
      <div className="sq-wrap">
        <StackColumn label={scene.label} items={scene.items || []} highlights={scene.highlights} pointers={scene.pointers} lang={lang} main />
        {aux.map((a, k) =>
          a.cells ? null : (
            <StackColumn key={k} label={a.label} items={a.items || []} highlights={a.highlights} pointers={a.pointers} lang={lang} />
          )
        )}
      </div>
      {aux.some((a) => a.cells) && (
        <ArrayLikeRows rows={aux.filter((a) => a.cells)} lang={lang} />
      )}
      {typeof scene.aux === 'string' && <div className="ll-caption" dangerouslySetInnerHTML={{ __html: rich(scene.aux, lang) }} />}
      {scene.note && <div className="arr-note" dangerouslySetInnerHTML={{ __html: rich(scene.note, lang) }} />}
    </div>
  );
}

function ArrayLikeRows({ rows, lang }) {
  return (
    <div className="arr-aux">
      {rows.map((a, k) => (
        <div key={k} className="arr-aux-block">
          {a.label && <div className="arr-aux-title" dangerouslySetInnerHTML={{ __html: rich(a.label, lang) }} />}
          <div className="queue-row" style={{ paddingTop: 0 }}>
            {a.cells.map((c, i) => (
              <div key={i} className={`queue-item ${hlClass(a.highlights, i)}`} style={{ width: 48, height: 42 }}>{String(c)}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ======================= Queue ======================= */

export function QueueVisual({ scene, lang }) {
  const items = scene.items || [];
  const pointers = scene.pointers || [];
  const hl = scene.highlights || {};
  const bn = lang === 'bn';
  const aux = Array.isArray(scene.aux) ? scene.aux : [];

  return (
    <div className="av-wrap">
      {scene.label && <div className="arr-label" dangerouslySetInnerHTML={{ __html: rich(scene.label, lang) }} />}
      <div className="q-lane">
        <div className="q-end q-front">
          <span className="q-end-arrow">⬅</span>
          <b>{bn ? 'সামনে' : 'FRONT'}</b>
          <small>{bn ? 'এখান থেকে বের হয়' : 'leaves here'}</small>
        </div>
        <div className="q-track">
          {items.length === 0 ? (
            <div className="queue-empty">{t(scene.emptyText, lang) || (bn ? 'কিউ খালি' : 'queue is empty')}</div>
          ) : (
            <div className="queue-row q-row">
              {items.map((it, i) => {
                const ptrs = pointers.filter((p) => Number(p.i) === i);
                return (
                  <div key={`${i}-${it}`} className="q-slot">
                    <div className="q-tags">
                      {ptrs.map((p, k) => (
                        <span key={k} className={`stk-tag ${tone(p.tone)}`}>{p.label} ▼</span>
                      ))}
                    </div>
                    <div className={`queue-item ${hlClass(hl, i)}`} title={`${bn ? 'লাইনে' : 'place in line'} #${i + 1}`}>
                      {String(it)}
                    </div>
                    <div className="av-idx">#{i + 1}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="q-end q-rear">
          <span className="q-end-arrow">⬅</span>
          <b>{bn ? 'পেছনে' : 'REAR'}</b>
          <small>{bn ? 'এখানে যোগ দেয়' : 'joins here'}</small>
        </div>
      </div>
      {aux.length > 0 && <ArrayLikeRows rows={aux.map((a) => ({ ...a, cells: a.cells || a.items || [] }))} lang={lang} />}
      {typeof scene.aux === 'string' && <div className="ll-caption" dangerouslySetInnerHTML={{ __html: rich(scene.aux, lang) }} />}
      {scene.note && <div className="arr-note" dangerouslySetInnerHTML={{ __html: rich(scene.note, lang) }} />}
    </div>
  );
}
