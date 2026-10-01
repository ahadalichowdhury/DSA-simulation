import React, { useState } from 'react';
import { Calculator, Sparkles, Binary, Layers, ArrowRight } from 'lucide-react';

function factorial(n) {
  let res = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    res *= i;
  }
  return res;
}

function catalan(n) {
  if (n < 0) return 0n;
  if (n === 0 || n === 1) return 1n;
  const num = factorial(2 * n);
  const den = factorial(n + 1) * factorial(n);
  return num / den;
}

export default function CatalanCalculator({ lang = 'en' }) {
  const [n, setN] = useState(3);

  const safeN = Math.max(1, Math.min(12, Number(n) || 1));
  const tVal = catalan(safeN);
  const factN = factorial(safeN);
  const fact2N = factorial(2 * safeN);
  const factN1 = factorial(safeN + 1);
  const labeledVal = factN * tVal;
  const minHeight = Math.floor(Math.log2(safeN));
  const maxHeight = safeN - 1;

  const presets = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="catalan-calc-wrap">
      {/* Header */}
      <div className="catalan-head">
        <div className="catalan-title">
          <Calculator size={18} style={{ color: 'var(--yellow)' }} />
          <span>{lang === 'bn' ? 'ক্যাটালান সংখ্যা ও ট্রি কাউন্টিং ক্যালকুলেটর' : 'Catalan Formula & Tree Counting Calculator'}</span>
        </div>
        <div className="catalan-badge">
          T(N) = <span className="mono">1/(N+1) × (2N! / (N! × N!))</span>
        </div>
      </div>

      {/* Input Row */}
      <div className="catalan-input-row">
        <label className="catalan-label">
          {lang === 'bn' ? 'নোড সংখ্যা (N):' : 'Number of Nodes (N):'}
        </label>
        <div className="catalan-input-group">
          <button
            className="catalan-btn"
            onClick={() => setN((prev) => Math.max(1, prev - 1))}
            disabled={safeN <= 1}
          >
            −
          </button>
          <input
            type="number"
            min="1"
            max="12"
            value={safeN}
            onChange={(e) => setN(Math.max(1, Math.min(12, parseInt(e.target.value, 10) || 1)))}
            className="catalan-input"
          />
          <button
            className="catalan-btn"
            onClick={() => setN((prev) => Math.min(12, prev + 1))}
            disabled={safeN >= 12}
          >
            +
          </button>
        </div>

        {/* Quick Presets */}
        <div className="catalan-presets">
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{lang === 'bn' ? 'প্রিসেট:' : 'Presets:'}</span>
          {presets.map((val) => (
            <button
              key={val}
              className={`catalan-chip ${safeN === val ? 'active' : ''}`}
              onClick={() => setN(val)}
            >
              N = {val}
            </button>
          ))}
        </div>
      </div>

      {/* Mathematical Breakdown Card */}
      <div className="catalan-math-box">
        <div className="catalan-formula-line">
          <span className="formula-part">
            T({safeN}) = <span className="formula-frac">
              <span className="frac-top">(2 × {safeN})!</span>
              <span className="frac-bot">({safeN} + 1)! × {safeN}!</span>
            </span>
          </span>
          <span className="formula-eq">=</span>
          <span className="formula-part">
            <span className="formula-frac">
              <span className="frac-top">{2 * safeN}! ({fact2N.toLocaleString()})</span>
              <span className="frac-bot">{safeN + 1}! ({factN1.toLocaleString()}) × {safeN}! ({factN.toLocaleString()})</span>
            </span>
          </span>
          <span className="formula-eq">=</span>
          <span className="formula-result">
            {tVal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="catalan-grid">
        <div className="catalan-card highlight">
          <div className="card-top">
            <Layers size={16} style={{ color: 'var(--cyan)' }} />
            <span>{lang === 'bn' ? 'আলাদা আলাদা আকার (Unlabeled)' : 'Distinct Tree Shapes (Unlabeled)'}</span>
          </div>
          <div className="card-val">{tVal.toLocaleString()}</div>
          <div className="card-desc">
            {lang === 'bn'
              ? `N = ${safeN} এর জন্য ঠিক ${tVal.toLocaleString()} টি ভিন্ন কাঠামোর বাইনারি ট্রি তৈরি সম্ভব।`
              : `Exactly ${tVal.toLocaleString()} unique topological binary tree structures for N = ${safeN}.`}
          </div>
        </div>

        <div className="catalan-card">
          <div className="card-top">
            <Binary size={16} style={{ color: 'var(--yellow)' }} />
            <span>{lang === 'bn' ? 'চিহ্নিত ট্রি (Labeled Trees)' : 'Labeled Binary Trees (N! × T(N))'}</span>
          </div>
          <div className="card-val">{labeledVal.toLocaleString()}</div>
          <div className="card-desc">
            {lang === 'bn'
              ? `${safeN}! × ${tVal.toLocaleString()} = ${labeledVal.toLocaleString()} টি চিহ্নিত ট্রি।`
              : `${safeN}! × ${tVal.toLocaleString()} = ${labeledVal.toLocaleString()} total permutations with unique node labels.`}
          </div>
        </div>

        <div className="catalan-card">
          <div className="card-top">
            <Sparkles size={16} style={{ color: 'var(--green)' }} />
            <span>{lang === 'bn' ? 'বাইনারি সার্চ ট্রি (BSTs)' : 'Binary Search Trees (BST)'}</span>
          </div>
          <div className="card-val">{tVal.toLocaleString()}</div>
          <div className="card-desc">
            {lang === 'bn'
              ? `প্রতিটি কাঠামোর জন্য কি-গুলোর অবস্থান নির্দিষ্ট (Left < Root < Right), তাই মোট BST সংখ্যাও ঠিক T(N)!`
              : `In a BST, sorted keys have only 1 valid placement per shape, so total BSTs = T(N)!`}
          </div>
        </div>

        <div className="catalan-card">
          <div className="card-top">
            <ArrowRight size={16} style={{ color: 'var(--purple)' }} />
            <span>{lang === 'bn' ? 'উচ্চতার সীমা (Height Range)' : 'Height Bounds (Min / Max)'}</span>
          </div>
          <div className="card-val">
            <span style={{ color: 'var(--green)' }}>{minHeight}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '16px', margin: '0 6px' }}>to</span>
            <span style={{ color: 'var(--red)' }}>{maxHeight}</span>
          </div>
          <div className="card-desc">
            {lang === 'bn'
              ? `নূন্যতম উচ্চতা ⌊log₂(N)⌋ = ${minHeight} (ব্যালান্সড), সর্বোচ্চ উচ্চতা N - 1 = ${maxHeight} (স্কিউড চেইন)।`
              : `Min height ⌊log₂(N)⌋ = ${minHeight} (balanced), Max height N - 1 = ${maxHeight} (skewed chain).`}
          </div>
        </div>
      </div>

      {/* Special Visual Showcase for N = 3 */}
      {safeN === 3 && (
        <div className="catalan-shapes-banner">
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--yellow)', marginBottom: '8px' }}>
            {lang === 'bn' ? 'N = 3 এর ৫টি বিখ্যাত ট্রি কাঠামো (5 Classic Shapes):' : 'The 5 Classic Binary Tree Shapes for N = 3:'}
          </div>
          <div className="shapes-list">
            <div className="shape-item">1. Straight Left Skewed (A ← B ← C)</div>
            <div className="shape-item">2. Left-Right Zigzag (A ← B → C)</div>
            <div className="shape-item">3. Balanced (B with children A & C)</div>
            <div className="shape-item">4. Right-Left Zigzag (A → B ← C)</div>
            <div className="shape-item">5. Straight Right Skewed (A → B → C)</div>
          </div>
        </div>
      )}
    </div>
  );
}
