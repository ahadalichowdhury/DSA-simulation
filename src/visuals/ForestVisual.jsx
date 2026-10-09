import React from 'react';
import TreeGraphVisual from './TreeGraphVisual.jsx';
import { rich, t } from './utils.js';

export default function ForestVisual({ scene, lang }) {
  const trees = scene.trees || [];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {scene.label && <div className="arr-label" dangerouslySetInnerHTML={{ __html: rich(scene.label, lang) }} />}
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
        {trees.map((tr, idx) => (
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
            {tr.caption && (
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--yellow)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
                {t(tr.caption, lang)}
              </div>
            )}
            <TreeGraphVisual scene={{ kind: 'tree', root: tr.root, highlights: scene.highlights }} lang={lang} />
          </div>
        ))}
      </div>
      {scene.note && <div className="arr-note" dangerouslySetInnerHTML={{ __html: rich(scene.note, lang) }} />}
    </div>
  );
}
