import React from 'react';
import TreeGraphVisual from './TreeGraphVisual.jsx';

export default function ForestVisual({ scene }) {
  const trees = scene.trees || [];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {scene.label && <div className="arr-label" dangerouslySetInnerHTML={{ __html: scene.label }} />}
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
        {trees.map((t, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px 20px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-bright)',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            {t.caption && (
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--yellow)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
                {t.caption}
              </div>
            )}
            <TreeGraphVisual scene={{ kind: 'tree', root: t.root, highlights: scene.highlights }} />
          </div>
        ))}
      </div>
      {scene.note && <div className="arr-note" dangerouslySetInnerHTML={{ __html: scene.note }} />}
    </div>
  );
}
