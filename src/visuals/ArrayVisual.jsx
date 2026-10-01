import React from 'react';

export default function ArrayVisual({ scene }) {
  const cells = scene.cells || [];
  const pointers = scene.pointers || [];
  const hl = scene.highlights || {};

  const activeSet = new Set(hl.active || []);
  const currentSet = new Set(hl.current != null ? [hl.current] : []);
  const visitedSet = new Set(hl.visited || []);
  const sortedSet = new Set(hl.sorted || []);
  const swapSet = new Set(hl.swap || []);

  const getCellClass = (i) => {
    if (swapSet.has(i)) return 'swap';
    if (currentSet.has(i)) return 'current';
    if (activeSet.has(i)) return 'active';
    if (sortedSet.has(i)) return 'sorted';
    if (visitedSet.has(i)) return 'visited';
    return '';
  };

  return (
    <div className="arr-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      {scene.label && <div className="arr-label" dangerouslySetInnerHTML={{ __html: scene.label }} />}

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', position: 'relative', padding: '16px 0' }}>
        {cells.map((cell, i) => {
          const val = typeof cell === 'object' ? cell.v ?? cell.val ?? cell.value : cell;
          const sub = typeof cell === 'object' ? cell.sub : null;
          const cls = getCellClass(i);
          const cellPointers = pointers.filter((p) => p.i === i);

          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              {/* Pointer above cell */}
              {cellPointers.map((p, pIdx) => (
                <div
                  key={pIdx}
                  style={{
                    position: 'absolute',
                    top: -24,
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: p.tone === 'yellow' ? 'var(--yellow)' : 'var(--cyan)',
                    background: 'var(--bg-secondary)',
                    padding: '1px 6px',
                    borderRadius: 10,
                    border: `1px solid ${p.tone === 'yellow' ? 'var(--yellow-border)' : 'var(--cyan-border, var(--border))'}`
                  }}
                >
                  {p.label}
                </div>
              ))}

              <div
                className={`arr-cell ${cls}`}
                style={{
                  width: 52,
                  height: 52,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius)',
                  border: '2px solid var(--border-bright)',
                  background: 'var(--bg-secondary)',
                  fontSize: '16px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.25s ease'
                }}
              >
                {val}
              </div>

              {/* Index label below cell */}
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: 4 }}>
                {i}
              </div>
              {sub && (
                <div style={{ fontSize: '10px', color: 'var(--cyan)', fontWeight: 600 }}>
                  {sub}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {scene.output && scene.output.length > 0 && (
        <div className="tree-output-wrap">
          <div className="tree-output-head">
            <span>{scene.outputLabel || 'Output Stream:'}</span>
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

      {scene.note && <div className="arr-note" dangerouslySetInnerHTML={{ __html: scene.note }} />}
    </div>
  );
}
