import React from 'react';
import { rich, t } from './utils.js';

/**
 * Graph canvas used by every lesson in the Graphs chapter.
 *
 * Top: the graph itself (fixed positions, so nothing jumps between steps).
 * Below: the algorithm's memory — queue, stack, arrays, matrix, adjacency
 * list, edge table, output — so a beginner sees the picture AND the data
 * the code is working with, side by side.
 *
 * scene = {
 *   kind: 'graphx', directed, weighted,
 *   nodes: [{ id, label, x, y }], edges: [{ u, v, w }],
 *   nodeState: { id: state }, edgeState: { 'u-v': state }, edgeFrom: { 'u-v': id },
 *   subs: { id: text }, tags: { id: text }, cursor: id,
 *   panels: [{ type: 'queue'|'stack'|'array'|'matrix'|'adjlist'|'edges'|'output'|'text', … }],
 *   label, status
 * }
 * Node states: current, visited, frontier, compare, source, done, reject, dim, relax, setA, setB.
 * Edge states: tree, compare, reject, dim, relax, frontier.
 */

const R = 20;
const PAD = 44;

const edgeKey = (u, v) => `${u}-${v}`;

function edgeStateOf(scene, e) {
  const st = scene.edgeState || {};
  return st[edgeKey(e.u, e.v)] || (!scene.directed ? st[edgeKey(e.v, e.u)] : undefined) || '';
}

function edgeFromOf(scene, e) {
  const f = scene.edgeFrom || {};
  const v = f[edgeKey(e.u, e.v)] ?? (!scene.directed ? f[edgeKey(e.v, e.u)] : undefined);
  return v === undefined ? e.u : v;
}

/** Geometry of one edge: a straight line, or a gentle curve when a reverse edge exists. */
function edgeGeom(a, b, curved, shortenEnd, bendBy) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  if (!curved) {
    const x1 = a.x + ux * R;
    const y1 = a.y + uy * R;
    const x2 = b.x - ux * (R + shortenEnd);
    const y2 = b.y - uy * (R + shortenEnd);
    return { d: `M${x1},${y1} L${x2},${y2}`, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
  }
  // bend to the right of the direction of travel
  const nx = -uy;
  const ny = ux;
  const bend = bendBy ?? 26;
  const cx = (a.x + b.x) / 2 + nx * bend;
  const cy = (a.y + b.y) / 2 + ny * bend;
  const s1 = Math.hypot(cx - a.x, cy - a.y) || 1;
  const s2 = Math.hypot(b.x - cx, b.y - cy) || 1;
  const x1 = a.x + ((cx - a.x) / s1) * R;
  const y1 = a.y + ((cy - a.y) / s1) * R;
  const x2 = b.x - ((b.x - cx) / s2) * (R + shortenEnd);
  const y2 = b.y - ((b.y - cy) / s2) * (R + shortenEnd);
  return { d: `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`, mx: (a.x + 2 * cx + b.x) / 4, my: (a.y + 2 * cy + b.y) / 4 };
}

const ARROW_STATES = ['', 'tree', 'compare', 'reject', 'dim', 'relax', 'frontier'];

function cellClass(hl, k) {
  const s = hl && hl[k];
  return s ? ` ga-${s}` : '';
}

/* ------------------------------------------------------------------ panels */

function Label({ text, lang }) {
  if (!text) return null;
  return <div className="ga-panel-label" dangerouslySetInnerHTML={{ __html: rich(text, lang) }} />;
}

function QueuePanel({ p, lang }) {
  const bn = lang === 'bn';
  const items = p.items || [];
  return (
    <div className="ga-panel">
      <Label text={p.label} lang={lang} />
      <div className="ga-row ga-queue">
        {items.length === 0 && <span className="ga-empty">{t(p.empty, lang) || (bn ? 'খালি' : 'empty')}</span>}
        {items.map((v, i) => (
          <span key={`${v}-${i}`} className={`ga-box${cellClass(p.hl, i)}`}>
            {v}
            {i === 0 && <i className="ga-ptr">{bn ? 'সামনে' : 'front'}</i>}
            {i === items.length - 1 && i !== 0 && <i className="ga-ptr">{bn ? 'পেছনে' : 'rear'}</i>}
          </span>
        ))}
      </div>
    </div>
  );
}

function StackPanel({ p, lang }) {
  const bn = lang === 'bn';
  const items = p.items || [];
  return (
    <div className="ga-panel">
      <Label text={p.label} lang={lang} />
      <div className="ga-stack">
        {items.length === 0 && <span className="ga-empty">{t(p.empty, lang) || (bn ? 'খালি' : 'empty')}</span>}
        {items.map((v, i) => ({ v, i })).reverse().map(({ v, i }) => (
          <span key={`${v}-${i}`} className={`ga-box ga-wide${cellClass(p.hl, i)}`}>
            {v}
            {i === items.length - 1 && <i className="ga-ptr ga-ptr-side">top</i>}
          </span>
        ))}
      </div>
    </div>
  );
}

function ArrayPanel({ p, lang }) {
  const cells = p.cells || [];
  const index = p.index || cells.map((_, i) => i);
  return (
    <div className="ga-panel">
      <Label text={p.label} lang={lang} />
      <div className="ga-array">
        {cells.map((v, i) => (
          <div key={i} className="ga-col">
            <span className={`ga-box${cellClass(p.hl, i)}`}>{v}</span>
            <span className="ga-idx">{index[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatrixPanel({ p, lang }) {
  const rows = p.rows || [];
  const cols = p.cols || rows;
  const cells = p.cells || [];
  return (
    <div className="ga-panel">
      <Label text={p.label} lang={lang} />
      <table className={`ga-matrix${p.wide ? ' ga-matrix-wide' : ''}`}>
        <thead>
          <tr>
            <th className="ga-corner">{p.corner || ''}</th>
            {cols.map((c, j) => <th key={j} className={p.colHl === j ? 'ga-hd-on' : ''}>{t(c, lang)}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <th className={p.rowHl === i ? 'ga-hd-on' : ''}>{t(r, lang)}</th>
              {cols.map((_, j) => {
                const cross = p.rowHl === i || p.colHl === j;
                return (
                  <td key={j} className={`${cross ? 'ga-cross' : ''}${cellClass(p.hl, `${i},${j}`)}`}>
                    {cells[i] ? t(cells[i][j], lang) : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdjListPanel({ p, lang }) {
  return (
    <div className="ga-panel">
      <Label text={p.label} lang={lang} />
      <div className="ga-adj">
        {(p.rows || []).map((r, i) => (
          <div key={i} className={`ga-adj-row${r.state ? ` ga-${r.state}` : ''}`}>
            <span className="ga-box ga-head">{r.head}</span>
            {(r.items || []).length === 0 && <span className="ga-adj-null">∅</span>}
            {(r.items || []).map((it, k) => (
              <React.Fragment key={k}>
                <span className="ga-arrow">→</span>
                <span className={`ga-box ga-chain${it.state ? ` ga-${it.state}` : ''}`}>
                  {it.v}
                  {it.w != null && <small>{it.w}</small>}
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function EdgesPanel({ p, lang }) {
  const bn = lang === 'bn';
  const head = p.head || [bn ? 'এজ' : 'edge', bn ? 'ওজন' : 'weight'];
  return (
    <div className="ga-panel">
      <Label text={p.label} lang={lang} />
      <table className="ga-edges">
        <thead>
          <tr>{head.map((h, i) => <th key={i}>{t(h, lang)}</th>)}{p.notes && <th />}</tr>
        </thead>
        <tbody>
          {(p.rows || []).map((r, i) => (
            <tr key={i} className={r.state ? `ga-${r.state}` : ''}>
              <td>{r.e}</td>
              {r.w != null && <td>{r.w}</td>}
              {p.notes && <td className="ga-edge-note">{t(r.note, lang) || ''}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OutputPanel({ p, lang }) {
  const items = p.items || [];
  return (
    <div className="ga-panel">
      <Label text={p.label} lang={lang} />
      <div className="ga-row">
        {items.length === 0 && <span className="ga-empty">…</span>}
        {items.map((v, i) => (
          <span key={`${v}-${i}`} className={`ga-box ga-out${i === items.length - 1 && p.fresh ? ' ga-relax' : ''}`}>{v}</span>
        ))}
      </div>
    </div>
  );
}

function TextPanel({ p, lang }) {
  return (
    <div className="ga-panel">
      <Label text={p.label} lang={lang} />
      <div className="ga-text" dangerouslySetInnerHTML={{ __html: rich(p.text, lang) }} />
    </div>
  );
}

/** Memory panels (queue, stack, array …), also used under the tree canvas. */
export const PANELS = { queue: QueuePanel, stack: StackPanel, array: ArrayPanel, matrix: MatrixPanel, adjlist: AdjListPanel, edges: EdgesPanel, output: OutputPanel, text: TextPanel };

/* ------------------------------------------------------------------ main */

export default function GraphAlgoVisual({ scene, lang, speed = 1 }) {
  const nodes = scene.nodes || [];
  const edges = scene.edges || [];
  const pos = new Map(nodes.map((n) => [n.id, n]));
  const nodeState = scene.nodeState || {};
  const subs = scene.subs || {};
  const tags = scene.tags || {};
  const dur = Math.round(550 / Math.max(0.25, speed));

  const xs = nodes.map((n) => n.x);
  const ys = nodes.map((n) => n.y);
  const minX = Math.min(...xs) - PAD;
  const minY = Math.min(...ys) - PAD - (Object.keys(tags).length ? 14 : 0);
  const w = Math.max(...xs) - minX + PAD;
  const h = Math.max(...ys) - minY + PAD + (Object.keys(subs).length ? 12 : 0);

  const has = new Set(edges.map((e) => edgeKey(e.u, e.v)));
  const cur = scene.cursor != null ? pos.get(scene.cursor) : null;

  return (
    <div className="ga" style={{ '--ga-dur': `${dur}ms` }}>
      {scene.label && <div className="arr-label" dangerouslySetInnerHTML={{ __html: rich(scene.label, lang) }} />}

      {nodes.length > 0 && (
        <svg className="ga-svg" width={w} height={h} viewBox={`${minX} ${minY} ${w} ${h}`}>
          <defs>
            {ARROW_STATES.map((s) => (
              <marker key={s || 'base'} id={`ga-arrow-${s || 'base'}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" className={`ga-arrowhead ga-ah-${s || 'base'}`} />
              </marker>
            ))}
          </defs>

          {edges.map((e) => {
            const a = pos.get(e.u);
            const b = pos.get(e.v);
            if (!a || !b) return null;
            const st = edgeStateOf(scene, e);
            const arrow = scene.directed ? 6 : 0;
            if (e.u === e.v) {
              // self-loop: a small loop above the vertex
              const d = `M${a.x - 9},${a.y - R + 3} C${a.x - 34},${a.y - 66} ${a.x + 34},${a.y - 66} ${a.x + 9},${a.y - R + 3}`;
              return (
                <g key={`loop-${e.u}-${e.i ?? 0}`} className={`ga-edge${st ? ` ga-e-${st}` : ''}`}>
                  <path d={d} className="ga-edge-line" />
                  {scene.weighted && e.w != null && <g className="ga-weight" transform={`translate(${a.x},${a.y - 58})`}><rect x="-11" y="-10" width="22" height="20" rx="10" /><text>{e.w}</text></g>}
                </g>
              );
            }
            const curved = e.bend != null || (scene.directed && has.has(edgeKey(e.v, e.u)));
            const g = edgeGeom(a, b, curved, arrow, e.bend);
            // the drawing animation starts from the node we came from
            const from = edgeFromOf(scene, e);
            const rev = !scene.directed && from === e.v;
            const gd = rev ? edgeGeom(b, a, curved, 0, e.bend != null ? -e.bend : undefined) : g;
            const lit = st === 'compare' || st === 'tree' || st === 'relax';
            return (
              <g key={`${edgeKey(e.u, e.v)}-${e.bend ?? ''}`} className={`ga-edge${st ? ` ga-e-${st}` : ''}`}>
                <path d={g.d} className="ga-edge-line" markerEnd={scene.directed ? `url(#ga-arrow-${st || 'base'})` : undefined} />
                {lit && <path key={`${st}-${from}`} d={gd.d} className="ga-edge-draw" pathLength="1" />}
                {scene.weighted && e.w != null && (
                  <g className="ga-weight" transform={`translate(${g.mx},${g.my})`}>
                    <rect x={-(String(e.w).length * 4 + 7)} y="-10" width={String(e.w).length * 8 + 14} height="20" rx="10" />
                    <text>{e.w}</text>
                  </g>
                )}
              </g>
            );
          })}

          {nodes.map((n) => {
            const st = nodeState[n.id] || '';
            return (
              <g key={n.id} className={`ga-node${st ? ` ga-n-${st}` : ''}`} transform={`translate(${n.x},${n.y})`}>
                <title>{n.label}</title>
                <circle r={R} />
                <text className="ga-node-label">{n.label}</text>
                {subs[n.id] != null && subs[n.id] !== '' && (
                  <g transform={`translate(0,${R + 13})`} className="ga-sub">
                    <rect x={-(String(subs[n.id]).length * 3.6 + 7)} y="-9" width={String(subs[n.id]).length * 7.2 + 14} height="18" rx="9" />
                    <text>{subs[n.id]}</text>
                  </g>
                )}
                {tags[n.id] && <text className="ga-tag" y={-R - 9}>{tags[n.id]}</text>}
              </g>
            );
          })}

          {cur && (
            <g className="ga-cursor" style={{ transform: `translate(${cur.x}px, ${cur.y}px)` }}>
              <circle r={R + 6} />
            </g>
          )}
        </svg>
      )}

      {(scene.panels || []).length > 0 && (
        <div className="ga-panels">
          {scene.panels.map((p, i) => {
            const P = PANELS[p.type];
            return P ? <P key={`${p.type}-${i}`} p={p} lang={lang} /> : null;
          })}
        </div>
      )}

      {scene.status && <div className="bst-status" dangerouslySetInnerHTML={{ __html: rich(scene.status, lang) }} />}
    </div>
  );
}
