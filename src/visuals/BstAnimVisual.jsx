import React, { useEffect, useMemo, useRef, useState } from 'react';
import { rich, t } from './utils.js';

/**
 * Animated BST canvas (VisuAlgo-style) for the BST playground.
 *
 * Every frame (scene) is a full picture of the tree. Between frames this
 * component tweens node positions, the moving search cursor and the flying
 * "ghost" value with requestAnimationFrame, so edges and nodes move together
 * instead of jumping. Removed nodes fade out; new nodes pop in.
 *
 * scene = {
 *   kind: 'bst', root: {v,l,r}, cursor, keyBadge, states: {v: state}, lit: [[p, c]],
 *   pending: [values], pendingIndex, ghost: { value, from, to }, subs: {v: text},
 *   output: [values], outputLabel, status, label
 * }
 */

const HG = 62; // horizontal gap between in-order neighbours
const VG = 78; // vertical gap between levels
const R = 21; // node radius
const PAD = 40;

function layout(root) {
  const pos = new Map();
  const edges = [];
  let order = 0;
  let maxD = 0;
  (function walk(n, d, parent) {
    if (!n) return;
    walk(n.l, d + 1, n.v);
    pos.set(n.v, { x: PAD + order++ * HG, y: PAD + 20 + d * VG, d });
    maxD = Math.max(maxD, d);
    if (parent != null) edges.push([parent, n.v]);
    walk(n.r, d + 1, n.v);
  })(root, 0, null);
  return { pos, edges, w: Math.max(320, PAD * 2 + Math.max(0, order - 1) * HG), h: PAD * 2 + 40 + maxD * VG };
}

const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

/**
 * Tween a map of id -> {x, y}. New ids appear at `spawn[id]` (or in place),
 * missing ids are kept for one fade-out (o goes 1 -> 0).
 */
function useTween(targets, duration, spawn) {
  const [cur, setCur] = useState(() => {
    const m = {};
    for (const [id, p] of Object.entries(targets)) m[id] = { ...p, o: 1 };
    return m;
  });
  const curRef = useRef(cur);
  curRef.current = cur;
  const key = JSON.stringify(targets) + JSON.stringify(spawn || {});

  useEffect(() => {
    const from = {};
    const prev = curRef.current;
    const all = new Set([...Object.keys(prev), ...Object.keys(targets)]);
    for (const id of all) {
      const tg = targets[id];
      const pv = prev[id] && prev[id].o > 0.01 ? prev[id] : null;
      if (tg) from[id] = pv ? { x: pv.x, y: pv.y, o: pv.o } : spawn && spawn[id] ? { ...spawn[id], o: 1 } : { ...tg, o: 0.0001 };
      else if (pv) from[id] = { ...pv };
    }
    if (duration <= 0 || typeof requestAnimationFrame === 'undefined') {
      const m = {};
      for (const [id, p] of Object.entries(targets)) m[id] = { ...p, o: 1 };
      setCur(m);
      return undefined;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const e = ease(p);
      const m = {};
      for (const [id, f] of Object.entries(from)) {
        const tg = targets[id];
        if (tg) m[id] = { x: f.x + (tg.x - f.x) * e, y: f.y + (tg.y - f.y) * e, o: f.o + (1 - f.o) * Math.min(1, p * 2) };
        else if (p < 1) m[id] = { x: f.x, y: f.y, o: (f.o ?? 1) * (1 - e) };
      }
      setCur(m);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, duration]);

  return cur;
}

const STATE_CLASS = {
  cmp: 'b-cmp', path: 'b-path', found: 'b-found', new: 'b-new', remove: 'b-remove',
  succ: 'b-succ', target: 'b-target', dim: 'b-dim', visited: 'b-visited', bad: 'b-bad', active: 'b-active'
};

export default function BstAnimVisual({ scene, lang, speed = 1 }) {
  const root = scene.root || null;
  const { pos, edges, w, h } = useMemo(() => layout(root), [root]);
  const dur = Math.round(650 / Math.max(0.25, speed));

  // Remember every node's value/state so a removed node can fade out where it stood.
  const lastNodes = useRef(new Map());
  const states = scene.states || {};

  const targets = {};
  for (const [v, p] of pos) targets[`n${v}`] = { x: p.x, y: p.y };
  const cursorPos = scene.cursor != null ? pos.get(scene.cursor) : null;
  if (cursorPos) targets.cursor = { x: cursorPos.x, y: cursorPos.y };
  const ghost = scene.ghost;
  const ghostFrom = ghost ? pos.get(ghost.from) : null;
  const ghostTo = ghost ? pos.get(ghost.to) : null;
  if (ghost && ghostTo) targets.ghost = { x: ghostTo.x, y: ghostTo.y };
  const spawn = {};
  if (ghost && ghostFrom) spawn.ghost = { x: ghostFrom.x, y: ghostFrom.y };
  // the cursor enters from above the root
  if (cursorPos && root) {
    const rp = pos.get(root.v);
    spawn.cursor = { x: rp.x, y: rp.y - 46 };
  }

  const cur = useTween(targets, dur, spawn);

  for (const [v] of pos) lastNodes.current.set(`n${v}`, { v, state: states[v] });
  const P = (id) => cur[id] || targets[id];

  const lit = new Set((scene.lit || []).map(([a, b]) => `${a}-${b}`));
  const subs = scene.subs || {};
  const bn = lang === 'bn';

  // nodes that are fading out (present in tween, gone from the tree)
  const exiting = Object.keys(cur).filter((id) => id.startsWith('n') && !targets[id] && lastNodes.current.has(id));

  const width = Math.max(w, 360);
  const height = h + (scene.keyBadge != null ? 10 : 0);

  return (
    <div className="bst-anim" style={{ '--bst-dur': `${dur}ms` }}>
      {scene.label && <div className="arr-label" dangerouslySetInnerHTML={{ __html: rich(scene.label, lang) }} />}

      {scene.pending && scene.pending.length > 0 && (
        <div className="bst-pending">
          <span className="bst-pending-title">{bn ? 'ইনসার্টের অপেক্ষায়:' : 'waiting to insert:'}</span>
          {scene.pending.map((v, i) => (
            <span
              key={`${v}-${i}`}
              className={`bst-pend${i < scene.pendingIndex ? ' done' : i === scene.pendingIndex ? ' now' : ''}`}
            >
              {v}
            </span>
          ))}
        </div>
      )}

      {!root ? (
        <div className="bst-empty">
          <div className="bst-empty-ring">null</div>
          <div>{bn ? 'ট্রি খালি — root = null' : 'empty tree — root = null'}</div>
          {scene.keyBadge != null && <div className="bst-key-float">{bn ? 'নতুন কী' : 'new key'} <b>{scene.keyBadge}</b></div>}
        </div>
      ) : (
        <svg className="bst-svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <filter id="bstGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* edges follow the tweened node positions */}
          {edges.map(([a, b]) => {
            const pa = P(`n${a}`);
            const pb = P(`n${b}`);
            if (!pa || !pb) return null;
            const isLit = lit.has(`${a}-${b}`);
            const dim = states[b] === 'dim' || states[a] === 'dim';
            return (
              <g key={`${a}-${b}`}>
                <line className={`bst-edge${dim ? ' dim' : ''}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} />
                {isLit && (
                  <line
                    key={`lit-${a}-${b}`}
                    className="bst-edge-lit"
                    x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                    pathLength="1"
                  />
                )}
              </g>
            );
          })}

          {/* fading-out nodes */}
          {exiting.map((id) => {
            const p = cur[id];
            const info = lastNodes.current.get(id);
            return (
              <g key={id} className="bst-node b-remove" style={{ opacity: p.o }} transform={`translate(${p.x},${p.y}) scale(${0.5 + p.o * 0.5})`}>
                <circle r={R} />
                <text className="bst-val">{info.v}</text>
              </g>
            );
          })}

          {[...pos.keys()].map((v) => {
            const id = `n${v}`;
            const p = P(id);
            const st = states[v];
            return (
              <g key={id} className={`bst-node ${STATE_CLASS[st] || ''}`} transform={`translate(${p.x},${p.y})`} style={{ opacity: Math.max(0.15, p.o ?? 1) }}>
                <title>{`${bn ? 'নোড' : 'node'} ${v}`}</title>
                <circle r={R} />
                <text className="bst-val">{v}</text>
                {subs[v] != null && <text className="bst-sub" y={R + 14}>{subs[v]}</text>}
                {root && v === root.v && <text className="bst-root-tag" y={-R - 8}>root</text>}
              </g>
            );
          })}

          {/* the flying successor value */}
          {ghost && cur.ghost && (
            <g className="bst-ghost" transform={`translate(${cur.ghost.x},${cur.ghost.y})`}>
              <circle r={R - 3} />
              <text className="bst-val">{ghost.value}</text>
            </g>
          )}

          {/* the moving search cursor, carrying the key */}
          {cursorPos && cur.cursor && (
            <g className="bst-cursor" transform={`translate(${cur.cursor.x},${cur.cursor.y})`}>
              <circle r={R + 6} filter="url(#bstGlow)" />
              {scene.keyBadge != null && (
                <g transform={`translate(${R + 12},${-R - 6})`}>
                  <rect x="-4" y="-12" width={String(scene.keyBadge).length * 8 + 14} height="20" rx="10" />
                  <text x={String(scene.keyBadge).length * 4 + 3} y="-1">{scene.keyBadge}</text>
                </g>
              )}
            </g>
          )}
        </svg>
      )}

      {scene.output && (
        <div className="tree-output-wrap">
          <div className="tree-output-head"><span>{t(scene.outputLabel, lang) || (bn ? 'আউটপুট:' : 'Output:')}</span></div>
          <div className="tree-output-tape">
            {scene.output.length === 0 && <div className="bst-out-empty">…</div>}
            {scene.output.map((val, idx) => (
              <div key={`${val}-${idx}`} className={`tree-output-cell ${idx === scene.output.length - 1 ? 'just-added' : ''}`}>
                <span>{val}</span>
                <span className="tree-output-sub">{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {scene.status && <div className="bst-status" dangerouslySetInnerHTML={{ __html: rich(scene.status, lang) }} />}
    </div>
  );
}
