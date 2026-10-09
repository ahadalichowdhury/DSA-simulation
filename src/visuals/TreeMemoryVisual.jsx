import React, { useState } from 'react';
import { rich } from './utils.js';

/**
 * TreeMemoryVisual: High-fidelity visual simulation of Tree Memory Representations.
 * Supports:
 * 1. Array Mapping: Top binary tree + projection beams + 1-based sequential RAM array + formula calculator.
 * 2. Skewed Waste: Skewed tree + sparse array with highlighted unallocated holes + memory utilization meter.
 * 3. Linked Struct: 3-compartment heap memory blocks [ *lchild | DATA | *rchild ] with hex memory addresses and pointer links.
 * 4. NULL Theorem: Explicit crimson [ ⟂ NULL ] terminal blocks with numbered badges proving N + 1 NULL pointers.
 */

export default function TreeMemoryVisual({ scene, lang = 'en' }) {
  const mode = scene.memoryMode || 'array-mapping';
  const [selectedIdx, setSelectedIdx] = useState(1); // default index 1 (root)

  if (mode === 'array-mapping') {
    return <ArrayMappingView scene={scene} selectedIdx={selectedIdx} onSelect={setSelectedIdx} lang={lang} />;
  }

  if (mode === 'skewed-waste') {
    return <SkewedWasteView scene={scene} lang={lang} />;
  }

  if (mode === 'linked-struct') {
    return <LinkedStructView scene={scene} lang={lang} />;
  }

  if (mode === 'null-theorem') {
    return <NullTheoremView scene={scene} lang={lang} />;
  }

  return <ArrayMappingView scene={scene} selectedIdx={selectedIdx} onSelect={setSelectedIdx} lang={lang} />;
}

/* =========================================================================
   1. Array Mapping View (Dual Tree + RAM Array + Formula Calculator)
   ========================================================================= */
function ArrayMappingView({ scene, selectedIdx, onSelect, lang }) {
  // 1-based complete binary tree: 7 nodes
  const treeNodes = [
    { i: 1, val: 'A', x: 260, y: 40,  l: 2, r: 3, p: null },
    { i: 2, val: 'B', x: 140, y: 110, l: 4, r: 5, p: 1 },
    { i: 3, val: 'C', x: 380, y: 110, l: 6, r: 7, p: 1 },
    { i: 4, val: 'D', x: 80,  y: 180, l: null, r: null, p: 2 },
    { i: 5, val: 'E', x: 200, y: 180, l: null, r: null, p: 2 },
    { i: 6, val: 'F', x: 320, y: 180, l: null, r: null, p: 3 },
    { i: 7, val: 'G', x: 440, y: 180, l: null, r: null, p: 3 }
  ];

  const curr = treeNodes.find((n) => n.i === selectedIdx) || treeNodes[0];
  const leftChildIdx = curr.i * 2 <= 7 ? curr.i * 2 : null;
  const rightChildIdx = curr.i * 2 + 1 <= 7 ? curr.i * 2 + 1 : null;
  const parentIdx = curr.p;

  // Array slots: 0 to 7
  const arrayCells = [
    { i: 0, val: '—', label: 'Unused', isUnused: true, addr: '0x1000' },
    { i: 1, val: 'A', label: 'Root (i=1)', addr: '0x1004' },
    { i: 2, val: 'B', label: '2i = 2', addr: '0x1008' },
    { i: 3, val: 'C', label: '2i+1 = 3', addr: '0x100C' },
    { i: 4, val: 'D', label: '2i = 4', addr: '0x1010' },
    { i: 5, val: 'E', label: '2i+1 = 5', addr: '0x1014' },
    { i: 6, val: 'F', label: '2i = 6', addr: '0x1018' },
    { i: 7, val: 'G', label: '2i+1 = 7', addr: '0x101C' }
  ];

  // Map each array slot to x coordinate for connection beams
  const cellWidth = 58;
  const startX = 30;
  const getCellX = (idx) => startX + idx * (cellWidth + 6) + cellWidth / 2;
  const arrayY = 270;

  return (
    <div className="tm-wrap">
      {scene.label && <div className="tm-title" dangerouslySetInnerHTML={{ __html: rich(scene.label, lang) }} />}

      {/* SVG Canvas for Tree + Connectors */}
      <svg className="tm-svg" width="520" height="340" viewBox="0 0 520 340">
        <defs>
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--yellow)" stopOpacity="0.2" />
          </linearGradient>
          <filter id="tmGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Tree Edges */}
        {treeNodes.map((n) => {
          if (n.p == null) return null;
          const parent = treeNodes.find((p) => p.i === n.p);
          if (!parent) return null;
          const isHighlight =
            (n.i === curr.i && parent.i === parentIdx) ||
            (parent.i === curr.i && (n.i === leftChildIdx || n.i === rightChildIdx));

          return (
            <line
              key={`edge-${parent.i}-${n.i}`}
              x1={parent.x}
              y1={parent.y}
              x2={n.x}
              y2={n.y}
              stroke={isHighlight ? 'var(--cyan)' : 'var(--border-bright)'}
              strokeWidth={isHighlight ? 2.5 : 1.5}
              strokeDasharray={isHighlight ? 'none' : '4 3'}
            />
          );
        })}

        {/* Projection Beams connecting Tree Nodes to Array Slots */}
        {treeNodes.map((n) => {
          const targetX = getCellX(n.i);
          const isSel = n.i === curr.i;
          const isChild = n.i === leftChildIdx || n.i === rightChildIdx;
          const stroke = isSel ? 'var(--yellow)' : isChild ? 'var(--cyan)' : 'var(--border)';
          const opacity = isSel ? 0.9 : isChild ? 0.75 : 0.2;

          return (
            <path
              key={`beam-${n.i}`}
              d={`M ${n.x} ${n.y + 20} C ${n.x} ${n.y + 60}, ${targetX} ${arrayY - 40}, ${targetX} ${arrayY - 6}`}
              fill="none"
              stroke={stroke}
              strokeWidth={isSel || isChild ? 2 : 1}
              strokeDasharray={isSel ? 'none' : '4 3'}
              opacity={opacity}
            />
          );
        })}

        {/* Tree Nodes */}
        {treeNodes.map((n) => {
          const isCurr = n.i === curr.i;
          const isLeft = n.i === leftChildIdx;
          const isRight = n.i === rightChildIdx;
          const isParent = n.i === parentIdx;

          let ringColor = 'var(--border-bright)';
          let fillColor = 'var(--bg-secondary)';
          let textColor = 'var(--text-primary)';

          if (isCurr) {
            ringColor = 'var(--yellow)';
            fillColor = 'var(--yellow-bg)';
            textColor = 'var(--yellow)';
          } else if (isLeft || isRight) {
            ringColor = 'var(--cyan)';
            fillColor = 'rgba(0,102,204,0.12)';
            textColor = 'var(--cyan)';
          } else if (isParent) {
            ringColor = 'var(--purple)';
            textColor = 'var(--purple)';
          }

          return (
            <g
              key={`node-${n.i}`}
              className="tm-node-group"
              onClick={() => onSelect(n.i)}
              style={{ cursor: 'pointer' }}
            >
              {isCurr && <circle cx={n.x} cy={n.y} r={22} fill="none" stroke="var(--yellow)" strokeWidth="2" opacity="0.4" className="tm-pulse" />}
              <circle
                cx={n.x}
                cy={n.y}
                r={18}
                fill={fillColor}
                stroke={ringColor}
                strokeWidth={isCurr ? 2.5 : 1.8}
              />
              <text x={n.x} y={n.y - 1} textAnchor="middle" dominantBaseline="central" fill={textColor} fontWeight="700" fontSize="14" fontFamily="var(--font-sans)">
                {n.val}
              </text>
              <rect x={n.x - 14} y={n.y + 11} width={28} height={13} rx={4} fill="var(--bg-card)" stroke="var(--border)" strokeWidth="0.8" />
              <text x={n.x} y={n.y + 18} textAnchor="middle" dominantBaseline="central" fill="var(--text-muted)" fontSize="9" fontWeight="700" fontFamily="var(--font-mono)">
                i={n.i}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Sequential Memory Array Tape */}
      <div className="tm-array-container">
        <div className="tm-array-label">
          <span>{lang === 'bn' ? '১-ভিত্তিক সিকোয়েনশিয়াল মেমোরি অ্যারে (RAM Layout):' : '1-Based Sequential Memory Array (RAM Layout):'}</span>
          <span className="tm-hint">{lang === 'bn' ? 'যেকোনো ঘরে ক্লিক করে সূত্র দেখুন' : 'Click any slot to inspect index formulas'}</span>
        </div>

        <div className="tm-cells-strip">
          {arrayCells.map((c) => {
            const isCurr = c.i === curr.i;
            const isLeft = c.i === leftChildIdx;
            const isRight = c.i === rightChildIdx;
            const isParent = c.i === parentIdx;

            let cls = 'tm-cell';
            if (c.isUnused) cls += ' unused';
            else if (isCurr) cls += ' active';
            else if (isLeft || isRight) cls += ' child';
            else if (isParent) cls += ' parent';

            return (
              <div
                key={`cell-${c.i}`}
                className={cls}
                onClick={() => !c.isUnused && onSelect(c.i)}
                style={{ cursor: c.isUnused ? 'default' : 'pointer' }}
              >
                <div className="tm-cell-idx">[{c.i}]</div>
                <div className="tm-cell-val">{c.val}</div>
                <div className="tm-cell-addr">{c.addr}</div>
                {isCurr && <span className="tm-badge curr">{lang === 'bn' ? 'টার্গেট i' : 'Target i'}</span>}
                {isLeft && <span className="tm-badge child">{lang === 'bn' ? 'বাম ২i' : 'Left 2i'}</span>}
                {isRight && <span className="tm-badge child">{lang === 'bn' ? 'ডান ২i+১' : 'Right 2i+1'}</span>}
                {isParent && <span className="tm-badge parent">{lang === 'bn' ? 'প্যারেন্ট' : 'Parent'}</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Arithmetic Formula Inspector */}
      <div className="tm-formula-card">
        <div className="tm-formula-item active">
          <span className="tm-f-label">{lang === 'bn' ? 'নির্বাচিত নোড i:' : 'Selected Node i:'}</span>
          <b>[{curr.i}] {curr.val}</b>
        </div>
        <div className="tm-formula-item">
          <span className="tm-f-label">{lang === 'bn' ? 'বাম সন্তান (২ × i):' : 'Left Child (2 × i):'}</span>
          <b>{leftChildIdx ? `2 × ${curr.i} = [${leftChildIdx}] (${treeNodes.find((n) => n.i === leftChildIdx)?.val})` : (lang === 'bn' ? 'নেই (NULL)' : 'None (NULL)')}</b>
        </div>
        <div className="tm-formula-item">
          <span className="tm-f-label">{lang === 'bn' ? 'ডান সন্তান (২ × i + ১):' : 'Right Child (2 × i + 1):'}</span>
          <b>{rightChildIdx ? `2 × ${curr.i} + 1 = [${rightChildIdx}] (${treeNodes.find((n) => n.i === rightChildIdx)?.val})` : (lang === 'bn' ? 'নেই (NULL)' : 'None (NULL)')}</b>
        </div>
        <div className="tm-formula-item">
          <span className="tm-f-label">{lang === 'bn' ? 'প্যারেন্ট ⌊i / ২⌋:' : 'Parent ⌊i / 2⌋:'}</span>
          <b>{parentIdx ? `⌊${curr.i} / 2⌋ = [${parentIdx}] (${treeNodes.find((n) => n.i === parentIdx)?.val})` : (lang === 'bn' ? 'রুট (প্যারেন্ট নেই)' : 'Root (No Parent)')}</b>
        </div>
      </div>

      {scene.note && <div className="arr-note" style={{ textAlign: 'center', marginTop: 10 }} dangerouslySetInnerHTML={{ __html: rich(scene.note, lang) }} />}
    </div>
  );
}

/* =========================================================================
   2. Skewed Waste View (Memory Fragmentation & Empty Slots)
   ========================================================================= */
function SkewedWasteView({ scene, lang }) {
  // A right-skewed tree: 10 (i=1) -> 20 (i=3) -> 30 (i=7)
  const slots = [
    { i: 0, val: '—', status: 'unused', label: 'Unused' },
    { i: 1, val: '10', status: 'filled', label: 'Root (i=1)' },
    { i: 2, val: '∅', status: 'waste', label: 'Wasted Gap' },
    { i: 3, val: '20', status: 'filled', label: 'Right (2i+1=3)' },
    { i: 4, val: '∅', status: 'waste', label: 'Wasted Gap' },
    { i: 5, val: '∅', status: 'waste', label: 'Wasted Gap' },
    { i: 6, val: '∅', status: 'waste', label: 'Wasted Gap' },
    { i: 7, val: '30', status: 'filled', label: 'Right (2i+1=7)' }
  ];

  return (
    <div className="tm-wrap">
      {scene.label && <div className="tm-title" dangerouslySetInnerHTML={{ __html: rich(scene.label, lang) }} />}

      {/* Skewed Tree + Connector Lines */}
      <svg className="tm-svg" width="460" height="230" viewBox="0 0 460 230">
        <line x1="160" y1="35" x2="250" y2="95" stroke="var(--cyan)" strokeWidth="2.5" />
        <line x1="250" y1="95" x2="340" y2="155" stroke="var(--cyan)" strokeWidth="2.5" />

        {/* Projection lines to array */}
        <line x1="160" y1="45" x2="95" y2="210" stroke="var(--yellow)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
        <line x1="250" y1="105" x2="215" y2="210" stroke="var(--cyan)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
        <line x1="340" y1="165" x2="455" y2="210" stroke="var(--cyan)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

        {/* Nodes */}
        <g>
          <circle cx="160" cy="35" r="18" fill="var(--yellow-bg)" stroke="var(--yellow)" strokeWidth="2.2" />
          <text x="160" y="35" textAnchor="middle" dominantBaseline="central" fill="var(--yellow)" fontWeight="800" fontSize="13">10</text>
          <text x="160" y="11" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontWeight="700">i=1 (Root)</text>
        </g>
        <g>
          <circle cx="250" cy="95" r="18" fill="rgba(0,102,204,0.12)" stroke="var(--cyan)" strokeWidth="2.2" />
          <text x="250" y="95" textAnchor="middle" dominantBaseline="central" fill="var(--cyan)" fontWeight="800" fontSize="13">20</text>
          <text x="290" y="95" textAnchor="start" fill="var(--cyan)" fontSize="9" fontWeight="700">i=3 (Right)</text>
        </g>
        <g>
          <circle cx="340" cy="155" r="18" fill="rgba(0,102,204,0.12)" stroke="var(--cyan)" strokeWidth="2.2" />
          <text x="340" y="155" textAnchor="middle" dominantBaseline="central" fill="var(--cyan)" fontWeight="800" fontSize="13">30</text>
          <text x="380" y="155" textAnchor="start" fill="var(--cyan)" fontSize="9" fontWeight="700">i=7 (Right)</text>
        </g>
      </svg>

      {/* Array with Wasted Holes */}
      <div className="tm-array-container">
        <div className="tm-array-label">
          <span>{lang === 'bn' ? 'স্কিউড ট্রির জন্য মেমোরি অ্যারে (প্রচুর ফাঁকা অপচয়):' : 'Sequential Array Memory for Skewed Tree (Severe Wastage):'}</span>
          <span className="tm-tag danger">{lang === 'bn' ? '৬২.৫% অপচয়' : '62.5% Wasted Space'}</span>
        </div>

        <div className="tm-cells-strip">
          {slots.map((s) => {
            let cls = 'tm-cell';
            if (s.status === 'unused') cls += ' unused';
            else if (s.status === 'filled') cls += ' active';
            else if (s.status === 'waste') cls += ' wasted';

            return (
              <div key={s.i} className={cls}>
                <div className="tm-cell-idx">[{s.i}]</div>
                <div className="tm-cell-val">{s.val}</div>
                <div className="tm-cell-desc">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Memory Utilization Gauge */}
      <div className="tm-meter-card">
        <div className="tm-meter-header">
          <span>{lang === 'bn' ? 'মেমোরি ব্যবহারের দক্ষতা (Memory Utilization):' : 'Memory Space Efficiency:'}</span>
          <b>3 / 8 {lang === 'bn' ? 'ঘর ব্যবহৃত (৩৭.৫%)' : 'Slots Used (37.5%)'}</b>
        </div>
        <div className="tm-meter-track">
          <div className="tm-meter-bar filled" style={{ width: '37.5%' }} title="Used: 3 slots" />
          <div className="tm-meter-bar wasted" style={{ width: '62.5%' }} title="Wasted: 5 slots" />
        </div>
        <div className="tm-meter-legend">
          <span className="tm-m-chip filled"><i /> {lang === 'bn' ? 'প্রকৃত ডেটা (৩৭.৫%)' : 'Allocated Nodes (37.5%)'}</span>
          <span className="tm-m-chip wasted"><i /> {lang === 'bn' ? 'ফাঁকা অপচয়কৃত গ্যাপ (৬২.৫%)' : 'Wasted Empty Holes (62.5%)'}</span>
        </div>
        <div className="tm-callout warning">
          {lang === 'bn'
            ? '⚠️ উচ্চতা h=4 হলে একটি স্কিউড ট্রির জন্য অ্যারে সাইজ লাগে ৩১টি, অথচ নোড থাকে মাত্র ৫টি (৮৪% মেমোরি নষ্ট)! তাই স্কিউড ট্রিতে অ্যারে রিপ্রেজেন্টেশন সম্পূর্ণ অকার্যকর।'
            : '⚠️ For height h=4, a skewed binary tree requires array size 2^(h+1)-1 = 31 slots to hold only 5 nodes (84% wasted memory)! This is why Linked Representation is required.'}
        </div>
      </div>

      {scene.note && <div className="arr-note" style={{ textAlign: 'center', marginTop: 10 }} dangerouslySetInnerHTML={{ __html: rich(scene.note, lang) }} />}
    </div>
  );
}

/* =========================================================================
   3. Linked Struct View (3-Compartment Dynamic Heap Blocks)
   ========================================================================= */
function LinkedStructView({ scene, lang }) {
  // Dynamic Heap Nodes: [ *lchild | DATA | *rchild ]
  const heapNodes = [
    {
      id: 'root',
      val: 50,
      addr: '0x1000',
      laddr: '0x1040',
      raddr: '0x1080',
      x: 230,
      y: 40
    },
    {
      id: 'left',
      val: 25,
      addr: '0x1040',
      laddr: '0x10C0',
      raddr: '0x1100',
      x: 100,
      y: 150
    },
    {
      id: 'right',
      val: 75,
      addr: '0x1080',
      laddr: 'NULL',
      raddr: '0x1140',
      x: 360,
      y: 150
    }
  ];

  return (
    <div className="tm-wrap">
      {scene.label && <div className="tm-title" dangerouslySetInnerHTML={{ __html: rich(scene.label, lang) }} />}

      <div className="tm-badge-row">
        <span className="tm-tag cyan">struct Node {'{ Node* lchild; int data; Node* rchild; }'}</span>
        <span className="tm-tag yellow">{lang === 'bn' ? 'ডাইনামিক হিপ মেমোরি' : 'Dynamic Heap Memory Layout'}</span>
      </div>

      {/* SVG Canvas for Heap Blocks & Pointers */}
      <svg className="tm-svg" width="520" height="260" viewBox="0 0 520 260">
        <defs>
          <marker id="heapArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0,0 L8,4.5 L0,9 z" fill="var(--cyan)" />
          </marker>
        </defs>

        {/* Pointers connecting blocks */}
        {/* Root Left pointer (x=245, y=70) -> Left Node (x=160, y=145) */}
        <path d="M 250 78 C 250 115, 160 110, 160 145" fill="none" stroke="var(--cyan)" strokeWidth="2.4" markerEnd="url(#heapArrow)" />
        {/* Root Right pointer (x=335, y=78) -> Right Node (x=420, y=145) */}
        <path d="M 330 78 C 330 115, 420 110, 420 145" fill="none" stroke="var(--cyan)" strokeWidth="2.4" markerEnd="url(#heapArrow)" />

        {/* Heap Blocks */}
        {heapNodes.map((n) => {
          const w = 140;
          const h = 54;
          const leftX = n.x - w / 2;
          const topY = n.y;

          return (
            <g key={n.id} className="tm-heap-node">
              {/* Node Address Badge */}
              <rect x={leftX} y={topY - 18} width={w} height={16} rx={4} fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="1" />
              <text x={n.x} y={topY - 10} textAnchor="middle" dominantBaseline="central" fill="var(--yellow)" fontSize="10" fontWeight="700" fontFamily="var(--font-mono)">
                Heap Address: {n.addr}
              </text>

              {/* 3-Compartment Struct Box */}
              <rect x={leftX} y={topY} width={w} height={h} rx={6} fill="var(--bg-card)" stroke="var(--border-bright)" strokeWidth="2" />

              {/* Vertical dividers */}
              <line x1={leftX + 42} y1={topY} x2={leftX + 42} y2={topY + h} stroke="var(--border)" strokeWidth="1.5" />
              <line x1={leftX + 98} y1={topY} x2={leftX + 98} y2={topY + h} stroke="var(--border)" strokeWidth="1.5" />

              {/* Labels: *lchild, data, *rchild */}
              <text x={leftX + 21} y={topY + 14} textAnchor="middle" fill="var(--text-muted)" fontSize="8.5" fontWeight="700" fontFamily="var(--font-mono)">*lchild</text>
              <text x={leftX + 70} y={topY + 14} textAnchor="middle" fill="var(--text-muted)" fontSize="8.5" fontWeight="700" fontFamily="var(--font-mono)">data</text>
              <text x={leftX + 119} y={topY + 14} textAnchor="middle" fill="var(--text-muted)" fontSize="8.5" fontWeight="700" fontFamily="var(--font-mono)">*rchild</text>

              {/* Values */}
              <text x={leftX + 21} y={topY + 34} textAnchor="middle" fill="var(--cyan)" fontSize="9" fontWeight="800" fontFamily="var(--font-mono)">
                {n.laddr === 'NULL' ? 'NULL' : n.laddr}
              </text>
              <text x={leftX + 70} y={topY + 34} textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="800" fontFamily="var(--font-sans)">
                {n.val}
              </text>
              <text x={leftX + 119} y={topY + 34} textAnchor="middle" fill={n.raddr === 'NULL' ? 'var(--red)' : 'var(--cyan)'} fontSize="9" fontWeight="800" fontFamily="var(--font-mono)">
                {n.raddr}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="tm-legend-strip">
        <span className="tm-leg-item"><i style={{ background: 'var(--yellow)' }} /> {lang === 'bn' ? 'হিপ মেমোরি অ্যাড্রেস' : 'Node Heap Address (RAM Location)'}</span>
        <span className="tm-leg-item"><i style={{ background: 'var(--cyan)' }} /> {lang === 'bn' ? 'পয়েন্টার রেফারেন্স (*lchild, *rchild)' : 'Pointer Reference (Next Node Address)'}</span>
        <span className="tm-leg-item"><i style={{ background: 'var(--text-primary)' }} /> {lang === 'bn' ? 'নোডের আসল মান (data)' : 'Payload (Data Value)'}</span>
      </div>

      {scene.note && <div className="arr-note" style={{ textAlign: 'center', marginTop: 10 }} dangerouslySetInnerHTML={{ __html: rich(scene.note, lang) }} />}
    </div>
  );
}

/* =========================================================================
   4. NULL Theorem View (Explicit Numbered Red NULL Terminals)
   ========================================================================= */
function NullTheoremView({ scene, lang }) {
  // Tree with 5 nodes and 6 explicit red NULL terminals
  // Root 50, Left 25 (Leaves 10, 35), Right 75 (Right 90)
  const nullTerminals = [
    { id: 1, parentVal: 10, x: 45,  y: 200, label: 'NULL #1' },
    { id: 2, parentVal: 10, x: 95,  y: 200, label: 'NULL #2' },
    { id: 3, parentVal: 35, x: 155, y: 200, label: 'NULL #3' },
    { id: 4, parentVal: 35, x: 205, y: 200, label: 'NULL #4' },
    { id: 5, parentVal: 75, x: 295, y: 150, label: 'NULL #5' },
    { id: 6, parentVal: 90, x: 415, y: 200, label: 'NULL #6' }
  ];

  return (
    <div className="tm-wrap">
      {scene.label && <div className="tm-title" dangerouslySetInnerHTML={{ __html: rich(scene.label, lang) }} />}

      {/* SVG Canvas for Tree + Explicit Red Terminals */}
      <svg className="tm-svg" width="500" height="250" viewBox="0 0 500 250">
        {/* Child edges */}
        <line x1="250" y1="35" x2="150" y2="95" stroke="var(--border-bright)" strokeWidth="2" />
        <line x1="250" y1="35" x2="350" y2="95" stroke="var(--border-bright)" strokeWidth="2" />
        <line x1="150" y1="95" x2="70"  y2="150" stroke="var(--border-bright)" strokeWidth="2" />
        <line x1="150" y1="95" x2="180" y2="150" stroke="var(--border-bright)" strokeWidth="2" />
        <line x1="350" y1="95" x2="390" y2="150" stroke="var(--border-bright)" strokeWidth="2" />

        {/* Lines to NULL terminals */}
        <line x1="70"  y1="150" x2="45"  y2="195" stroke="var(--red)" strokeWidth="1.8" strokeDasharray="3 2" />
        <line x1="70"  y1="150" x2="95"  y2="195" stroke="var(--red)" strokeWidth="1.8" strokeDasharray="3 2" />
        <line x1="180" y1="150" x2="155" y2="195" stroke="var(--red)" strokeWidth="1.8" strokeDasharray="3 2" />
        <line x1="180" y1="150" x2="205" y2="195" stroke="var(--red)" strokeWidth="1.8" strokeDasharray="3 2" />
        <line x1="350" y1="95"  x2="295" y2="145" stroke="var(--red)" strokeWidth="1.8" strokeDasharray="3 2" />
        <line x1="390" y1="150" x2="415" y2="195" stroke="var(--red)" strokeWidth="1.8" strokeDasharray="3 2" />

        {/* Internal Tree Nodes */}
        {[
          { v: 50, x: 250, y: 35, sub: 'Root' },
          { v: 25, x: 150, y: 95, sub: 'deg=2' },
          { v: 75, x: 350, y: 95, sub: 'deg=1' },
          { v: 10, x: 70,  y: 150, sub: 'leaf' },
          { v: 35, x: 180, y: 150, sub: 'leaf' },
          { v: 90, x: 390, y: 150, sub: 'leaf' }
        ].map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={17} fill="var(--bg-secondary)" stroke="var(--cyan)" strokeWidth="2" />
            <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central" fill="var(--text-primary)" fontWeight="800" fontSize="13">
              {n.v}
            </text>
            <text x={n.x} y={n.y - 12} textAnchor="middle" fill="var(--text-muted)" fontSize="8.5" fontWeight="700">
              {n.sub}
            </text>
          </g>
        ))}

        {/* Explicit Crimson Grounded NULL Terminals */}
        {nullTerminals.map((t) => (
          <g key={t.id} className="tm-null-term">
            <rect x={t.x - 20} y={t.y} width={40} height={20} rx={4} fill="rgba(220,38,38,0.12)" stroke="var(--red)" strokeWidth="1.5" />
            <text x={t.x} y={t.y + 10} textAnchor="middle" dominantBaseline="central" fill="var(--red)" fontSize="9" fontWeight="800" fontFamily="var(--font-mono)">
              ⟂ NULL
            </text>
            <circle cx={t.x + 18} cy={t.y + 2} r={7} fill="var(--red)" />
            <text x={t.x + 18} y={t.y + 3} textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="8" fontWeight="800">
              {t.id}
            </text>
          </g>
        ))}
      </svg>

      {/* Theorem Mathematical Proof Card */}
      <div className="tm-proof-card">
        <div className="tm-proof-header">
          <span>{lang === 'bn' ? 'নাল পয়েন্টার উপপাদ্যের গাণিতিক প্রমাণ:' : 'NULL Pointer Theorem Mathematical Proof:'}</span>
          <span className="tm-tag green">{lang === 'bn' ? 'প্রমাণিত: N + ১' : 'Verified: N + 1'}</span>
        </div>

        <div className="tm-proof-grid">
          <div className="tm-proof-cell">
            <span className="tm-p-label">{lang === 'bn' ? 'মোট নোড (N):' : 'Total Nodes (N):'}</span>
            <b>5</b>
          </div>
          <div className="tm-proof-cell">
            <span className="tm-p-label">{lang === 'bn' ? 'মোট পয়েন্টার (২N):' : 'Total Pointers (2N):'}</span>
            <b>2 × 5 = 10</b>
          </div>
          <div className="tm-proof-cell">
            <span className="tm-p-label">{lang === 'bn' ? 'ব্যবহৃত পয়েন্টার (N - ১):' : 'Assigned Pointers (N - 1):'}</span>
            <b>5 - 1 = 4</b>
          </div>
          <div className="tm-proof-cell highlight">
            <span className="tm-p-label">{lang === 'bn' ? 'NULL পয়েন্টার (N + ১):' : 'NULL Pointers (N + 1):'}</span>
            <b>10 - 4 = 6 NULLs!</b>
          </div>
        </div>
      </div>

      {scene.note && <div className="arr-note" style={{ textAlign: 'center', marginTop: 10 }} dangerouslySetInnerHTML={{ __html: rich(scene.note, lang) }} />}
    </div>
  );
}
