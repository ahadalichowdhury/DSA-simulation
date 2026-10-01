import React from 'react';

export function IdleVisual({ scene }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
      <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>
        {scene?.label || 'Select a step to view simulation'}
      </div>
      {scene?.note && <div style={{ fontSize: '13px' }} dangerouslySetInnerHTML={{ __html: scene.note }} />}
    </div>
  );
}

export function CardsVisual({ scene }) {
  const cards = scene.cards || [];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      {scene.label && <div className="arr-label" dangerouslySetInnerHTML={{ __html: scene.label }} />}
      <div className="cards-row">
        {cards.map((c, i) => (
          <div key={i} className={`big-card ${c.tone ? `h-${c.tone}` : ''}`}>
            <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>
              {c.title}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {c.desc}
            </div>
          </div>
        ))}
      </div>
      {scene.note && <div className="arr-note" dangerouslySetInnerHTML={{ __html: scene.note }} />}
    </div>
  );
}

export function ChartVisual({ scene }) {
  const items = scene.items || [];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      {scene.label && <div className="arr-label" dangerouslySetInnerHTML={{ __html: scene.label }} />}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              padding: '12px 18px',
              borderRadius: 'var(--radius)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{it.label}</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--cyan)', marginTop: 4 }}>{it.value}</div>
          </div>
        ))}
      </div>
      {scene.note && <div className="arr-note" dangerouslySetInnerHTML={{ __html: scene.note }} />}
    </div>
  );
}

export function HashVisual({ scene }) {
  const buckets = scene.buckets || [];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      {scene.label && <div className="arr-label" dangerouslySetInnerHTML={{ __html: scene.label }} />}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {buckets.map((b, i) => (
          <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: 8, background: 'var(--bg-secondary)', minWidth: 60, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>[{i}]</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--cyan)' }}>{b.val ?? b.value ?? '—'}</div>
          </div>
        ))}
      </div>
      {scene.note && <div className="arr-note" dangerouslySetInnerHTML={{ __html: scene.note }} />}
    </div>
  );
}
