import React from 'react';
import { resolveRefs } from './utils.js';

/* ---------------- tree layout ---------------- */
const HG = 74; // horizontal gap
const VG = 88; // vertical gap

function layoutTree(root) {
  const nodes = [];
  const edges = [];
  let order = 0;

  function walk(node, id, depth) {
    if (node == null) return;
    const nd = typeof node === 'object' ? node : { v: node };
    const left = nd.l ?? nd.left;
    const right = nd.r ?? nd.right;
    walk(left, `${id}L`, depth + 1);
    const me = {
      id,
      value: nd.v ?? nd.value ?? '',
      sub: nd.sub,
      depth,
      x: order++ * HG + HG / 2 + 14,
      y: depth * VG + 44
    };
    nodes.push(me);
    if (depth > 0) edges.push({ from: id.slice(0, -1), to: id });
    walk(right, `${id}R`, depth + 1);
  }

  walk(root, 'root', 0);

  const w = Math.max(340, (nodes.length - 1) * HG + 76);
  const maxD = nodes.reduce((m, n) => Math.max(m, n.depth), 0);
  const h = maxD * VG + 96;
  return { nodes, edges, w, h };
}

/* ---------------- graph layout ---------------- */
function normaliseGraph(scene) {
  const raw = scene.nodes || [];
  const nodes = raw.map((x, i) =>
    typeof x === 'object' ? { id: x.id ?? String(i), value: x.label ?? x.id ?? x.v ?? '', sub: x.sub } : { id: String(x), value: String(x) }
  );
  const pos = scene.pos || {};
  const hasPos = Object.keys(pos).length > 0;

  if (!hasPos) {
    const R = Math.max(120, nodes.length * 26);
    const cx = R + 90;
    const cy = R + 50;
    nodes.forEach((n, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / Math.max(1, nodes.length);
      n.x = cx + R * Math.cos(a);
      n.y = cy + R * Math.sin(a);
    });
  } else {
    nodes.forEach((n) => {
      const p = pos[n.id];
      n.x = p ? p.x : 80;
      n.y = p ? p.y : 80;
    });
  }

  const edges = (scene.edges || []).map((e) => {
    const from = typeof e.from === 'object' ? e.from.id : String(e.from);
    const to = typeof e.to === 'object' ? e.to.id : String(e.to);
    const directed = e.directed ?? scene.directed ?? false;
    const key = directed ? `${from}>${to}` : [from, to].sort().join('-');
    return { from, to, w: e.w ?? e.weight, directed, key };
  });

  const maxX = Math.max(...nodes.map((n) => n.x), 200);
  const maxY = Math.max(...nodes.map((n) => n.y), 140);
  return { nodes, edges, w: maxX + 80, h: maxY + 70 };
}

function edgeKeyOf(x) {
  if (Array.isArray(x)) return x.length === 3 && x[2] === '>' ? `${x[0]}>${x[1]}` : [x[0], x[1]].sort().join('-');
  return String(x);
}

function edgeClass(e, scene) {
  const state = scene.edgeState || {};
  const st = state[e.key] ?? state[`${e.from}-${e.to}`] ?? state[`${e.to}-${e.from}`];
  if (st) return `v-${st}`;
  const lists = [
    ['activeEdges', 'v-active'],
    ['pathEdges', 'v-path'],
    ['frontierEdges', 'v-frontier'],
    ['dimEdges', 'v-dim']
  ];
  for (const [prop, cls] of lists) {
    const arr = scene[prop];
    if (arr && arr.some((x) => edgeKeyOf(x) === e.key)) return cls;
  }
  return scene.kind === 'tree' ? 'v-tree' : '';
}

/* ---------------- visual ---------------- */
export default function TreeGraphVisual({ scene }) {
  const isTree = scene.kind === 'tree';
  const { nodes, edges, w, h } = isTree ? layoutTree(scene.root ?? scene) : normaliseGraph(scene);

  // Rotation / insertion animation: when the scene carries a `before` tree, the
  // nodes first appear at their old positions and then morph to the final ones
  // (CSS transition on <g class="gnode">), so an AVL rotation really spins.
  const beforePos = React.useMemo(() => {
    if (!isTree || !scene.before) return null;
    const b = layoutTree(scene.before);
    const map = new Map();
    for (const n of b.nodes) if (!map.has(String(n.value))) map.set(String(n.value), { x: n.x, y: n.y });
    return map;
  }, [isTree, scene.before]);

  const [morphed, setMorphed] = React.useState(false);
  React.useEffect(() => {
    if (!beforePos) return;
    setMorphed(false);
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setMorphed(true)));
    return () => cancelAnimationFrame(raf);
  }, [beforePos, scene]);

  const hl = scene.highlights || {};
  const current = resolveRefs(nodes, hl.current);
  const visited = resolveRefs(nodes, hl.visited);
  const frontier = resolveRefs(nodes, hl.frontier);
  const path = resolveRefs(nodes, hl.path);
  const active = resolveRefs(nodes, hl.active);
  const insert = resolveRefs(nodes, hl.insert);
  const remove = resolveRefs(nodes, hl.remove);
  const reject = resolveRefs(nodes, hl.reject);
  const dim = resolveRefs(nodes, hl.dim);

  const nodeCls = (n) => {
    if (current.has(n.id)) return 'h-current';
    if (path.has(n.id)) return 'h-path';
    if (active.has(n.id)) return 'h-active';
    if (insert.has(n.id)) return 'h-insert';
    if (remove.has(n.id)) return 'h-remove';
    if (frontier.has(n.id)) return 'h-frontier';
    if (visited.has(n.id)) return 'h-visited';
    if (reject.has(n.id)) return 'h-reject';
    if (dim.has(n.id)) return 'h-dim';
    return '';
  };

  const showWeights = scene.showWeights ?? edges.some((e) => e.w != null);
  const R = 24;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      {scene.label && <div className="arr-label" dangerouslySetInnerHTML={{ __html: scene.label }} />}
      <svg className="viz-svg" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <defs>
          <marker id="gArrow" markerWidth="10" markerHeight="10" refX="19" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 z" fill="var(--border-bright)" />
          </marker>
          <marker id="gArrowOn" markerWidth="10" markerHeight="10" refX="19" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 z" fill="var(--cyan)" />
          </marker>
        </defs>

        {edges.map((e, i) => {
          const a = nodes.find((n) => n.id === e.from);
          const b = nodes.find((n) => n.id === e.to);
          if (!a || !b) return null;
          const cls = edgeClass(e, scene);
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.hypot(dx, dy) || 1;
          const ux = dx / len;
          const uy = dy / len;
          const x1 = a.x + ux * R;
          const y1 = a.y + uy * R;
          const x2 = b.x - ux * (R + (e.directed ? 3 : 0));
          const y2 = b.y - uy * (R + (e.directed ? 3 : 0));
          return (
            <g key={`${e.key}-${i}`} className={`gedge-wrap${beforePos ? (morphed ? ' morphed' : ' pre') : ''}`}>
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                className={`gedge ${cls}`}
                markerEnd={e.directed ? (cls === 'v-active' || cls === 'v-path' ? 'url(#gArrowOn)' : 'url(#gArrow)') : undefined}
              />
              {showWeights && e.w != null && (
                <text x={(x1 + x2) / 2 + uy * 14} y={(y1 + y2) / 2 - ux * 14} className={`edge-w ${cls === 'v-active' || cls === 'v-path' ? 'on' : ''}`} textAnchor="middle">
                  {e.w}
                </text>
              )}
            </g>
          );
        })}

        {nodes.map((n) => {
          const cls = nodeCls(n);
          const pulsing = current.has(n.id) || active.has(n.id);
          const from = beforePos && !morphed ? beforePos.get(String(n.value)) : null;
          const x = from ? from.x : n.x;
          const y = from ? from.y : n.y;
          return (
            <g key={String(n.value) || n.id} className={`gnode ${cls}`} style={{ transform: `translate(${x}px, ${y}px)` }}>
              {pulsing && <circle className="gnode-pulse" r={R} />}
              {pulsing && <circle className="gnode-ring2" r={R} />}
              <circle className="gnode-circle" r={R} />
              <text className="gnode-text" y="1">{n.value}</text>
              {n.sub && (
                <text className={`gnode-sub ${cls.includes('current') || cls.includes('active') ? 'on' : ''}`} y={R + 13}>{n.sub}</text>
              )}
            </g>
          );
        })}

        {/* Animated Pointers for Tree/Graph Nodes */}
        {(scene.pointers || []).map((p, idx) => {
          const target = p.target ?? p.id ?? p.i;
          const nd = nodes.find((n) => String(n.value) === String(target) || n.id === String(target));
          if (!nd) return null;
          const toneColor = p.tone === 'yellow' ? 'var(--yellow)' : p.tone === 'cyan' ? 'var(--cyan)' : p.tone === 'green' ? 'var(--green)' : 'var(--cyan)';
          return (
            <g
              key={`ptr-${p.label}-${idx}`}
              className="gnode-ptr"
              style={{
                transform: `translate(${nd.x}px, ${nd.y - R - 6}px)`,
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <polygon points="-4,-4 4,-4 0,2" fill={toneColor} />
              <rect x="-24" y="-22" width="48" height="18" rx="9" fill="var(--bg-card)" stroke={toneColor} strokeWidth="1.5" />
              <text x="0" y="-10" fill={toneColor} fontSize="11" fontWeight="700" fontFamily="var(--font-mono)" textAnchor="middle" dominantBaseline="central">
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Output Stream / Tape */}
      {scene.output && scene.output.length > 0 && (
        <div className="tree-output-wrap">
          <div className="tree-output-head">
            <span>{scene.outputLabel || 'Output Stream:'}</span>
          </div>
          <div className="tree-output-tape">
            {scene.output.map((val, idx) => (
              <div
                key={idx}
                className={`tree-output-cell ${idx === scene.output.length - 1 ? 'just-added' : ''}`}
              >
                <span>{val}</span>
                <span className="tree-output-sub">{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {scene.note && <div className="arr-note" style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: scene.note }} />}
    </div>
  );
}
