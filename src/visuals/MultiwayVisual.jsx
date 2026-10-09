import React from 'react';
import { rich } from './utils.js';

/**
 * Computes simple hierarchical layout for multiway search trees (2-3 Trees, B-Trees, B+ Trees).
 */
function layoutMultiway(nodes, rootId) {
  const nodeMap = new Map();
  nodes.forEach((n) => nodeMap.set(n.id, { ...n, children: n.children || [] }));

  const levels = [];
  const visited = new Set();

  function buildLevels(id, depth) {
    if (!id || visited.has(id)) return;
    visited.add(id);
    const n = nodeMap.get(id);
    if (!n) return;
    if (!levels[depth]) levels[depth] = [];
    levels[depth].push(n);
    n.depth = depth;
    n.children.forEach((cId) => buildLevels(cId, depth + 1));
  }

  const root = rootId || (nodes[0] ? nodes[0].id : null);
  buildLevels(root, 0);

  // Remaining unreached nodes (if any) placed in last level
  nodes.forEach((n) => {
    if (!visited.has(n.id)) {
      const d = levels.length;
      if (!levels[d]) levels[d] = [];
      levels[d].push(nodeMap.get(n.id));
    }
  });

  const NODE_MIN_W = 120;
  const KEY_W = 44;
  const H_GAP = 32;
  const V_GAP = 90;

  // Compute node widths
  nodes.forEach((n) => {
    const item = nodeMap.get(n.id);
    item.w = Math.max(NODE_MIN_W, (item.keys.length) * KEY_W + 24);
    item.h = 42;
  });

  // Assign x, y coordinates per level
  let maxW = 400;
  levels.forEach((lvl, d) => {
    const totalLevelW = lvl.reduce((sum, n) => sum + n.w + H_GAP, -H_GAP);
    maxW = Math.max(maxW, totalLevelW + 80);
  });

  levels.forEach((lvl, d) => {
    const totalLevelW = lvl.reduce((sum, n) => sum + n.w + H_GAP, -H_GAP);
    let curX = (maxW - totalLevelW) / 2;
    lvl.forEach((n) => {
      n.x = curX + n.w / 2;
      n.y = d * V_GAP + 40;
      curX += n.w + H_GAP;
    });
  });

  const totalH = levels.length * V_GAP + 60;
  return { layoutNodes: [...nodeMap.values()], w: maxW, h: totalH };
}

export default function MultiwayVisual({ scene, lang }) {
  const nodes = scene.nodes || [];
  const rootId = scene.root;
  const { layoutNodes, w, h } = layoutMultiway(nodes, rootId);

  const hl = scene.highlights || {};
  const activeIds = new Set(hl.active || []);
  const overflowIds = new Set(hl.overflow || []);
  const splitIds = new Set(hl.split || []);
  const promoteIds = new Set(hl.promote || []);
  const insertIds = new Set(hl.insert || []);

  const KEY_W = 44;
  const NODE_H = 42;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      {scene.label && <div className="arr-label" dangerouslySetInnerHTML={{ __html: rich(scene.label, lang) }} />}

      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="viz-svg">
        <defs>
          <marker id="mwArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="var(--cyan)" />
          </marker>
        </defs>

        {/* Tree Edges */}
        {layoutNodes.map((parent) => {
          return (parent.children || []).map((cId, cIdx) => {
            const child = layoutNodes.find((n) => n.id === cId);
            if (!child) return null;
            const x1 = parent.x - parent.w / 2 + (parent.w / (parent.children.length + 1)) * (cIdx + 1);
            const y1 = parent.y + NODE_H / 2;
            const x2 = child.x;
            const y2 = child.y - NODE_H / 2;
            return (
              <line
                key={`${parent.id}->${cId}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className="gedge v-tree"
                strokeWidth="2"
              />
            );
          });
        })}

        {/* B+ Tree Sequential Leaf Pointers (if isBPlus) */}
        {scene.isBPlus && (() => {
          const leaves = layoutNodes.filter((n) => !n.children || n.children.length === 0);
          leaves.sort((a, b) => a.x - b.x);
          return leaves.slice(0, -1).map((lf, i) => {
            const nxt = leaves[i + 1];
            return (
              <line
                key={`bplus-link-${i}`}
                x1={lf.x + lf.w / 2}
                y1={lf.y}
                x2={nxt.x - nxt.w / 2}
                y2={nxt.y}
                stroke="var(--green)"
                strokeWidth="2.5"
                strokeDasharray="4 3"
                markerEnd="url(#mwArrow)"
              />
            );
          });
        })()}

        {/* Multiway Nodes */}
        {layoutNodes.map((node) => {
          // per-node `state` from the lesson data works the same as the highlight lists
          const st = node.state;
          const isAct = activeIds.has(node.id) || st === 'active';
          const isOver = overflowIds.has(node.id) || st === 'overflow';
          const isSplit = splitIds.has(node.id) || st === 'split';
          const isPromote = promoteIds.has(node.id) || st === 'promote';
          const isIns = insertIds.has(node.id) || st === 'new' || st === 'ok';

          const borderColor = isOver ? 'var(--red)' : isPromote ? 'var(--yellow)' : isAct ? 'var(--cyan)' : isSplit ? 'var(--amber)' : isIns ? 'var(--green)' : 'var(--border-bright)';
          const bgColor = isOver ? 'var(--red-bg)' : isAct ? 'var(--cyan-bg)' : 'var(--bg-secondary)';

          return (
            <g
              key={node.id}
              className="gnode"
              style={{
                transform: `translate(${node.x}px, ${node.y}px)`,
                transition: 'transform 0.4s ease'
              }}
            >
              {/* Node container box */}
              <rect
                x={-node.w / 2}
                y={-NODE_H / 2}
                width={node.w}
                height={NODE_H}
                rx="8"
                fill={bgColor}
                stroke={borderColor}
                strokeWidth={isAct || isOver || isPromote ? '2.5' : '1.5'}
                filter="var(--shadow-sm)"
              />

              {/* Keys partition and values */}
              {node.keys.map((k, kIdx) => {
                const totalKeys = node.keys.length;
                const cellW = (node.w - 16) / totalKeys;
                const cellX = -node.w / 2 + 8 + kIdx * cellW;

                return (
                  <g key={kIdx}>
                    {kIdx > 0 && (
                      <line
                        x1={cellX}
                        y1={-NODE_H / 2 + 4}
                        x2={cellX}
                        y2={NODE_H / 2 - 4}
                        stroke="var(--border-bright)"
                        strokeWidth="1.5"
                      />
                    )}
                    <text
                      x={cellX + cellW / 2}
                      y="1"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="var(--text-primary)"
                      fontSize="14"
                      fontWeight="700"
                      fontFamily="var(--font-mono)"
                    >
                      {k}
                    </text>
                  </g>
                );
              })}

              {/* Node label / ID badge */}
              {node.sub && (
                <text
                  x="0"
                  y={NODE_H / 2 + 13}
                  textAnchor="middle"
                  fill="var(--text-muted)"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="var(--font-mono)"
                >
                  {node.sub}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {scene.note && <div className="arr-note" dangerouslySetInnerHTML={{ __html: rich(scene.note, lang) }} />}
    </div>
  );
}
