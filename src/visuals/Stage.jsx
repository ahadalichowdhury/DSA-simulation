import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { Plus, Minus, Maximize2, Calculator, HelpCircle, X } from 'lucide-react';
import ArrayVisual from './ArrayVisual.jsx';
import TreeGraphVisual from './TreeGraphVisual.jsx';
import TreeMemoryVisual from './TreeMemoryVisual.jsx';
import MultiwayVisual from './MultiwayVisual.jsx';
import ForestVisual from './ForestVisual.jsx';
import BstAnimVisual from './BstAnimVisual.jsx';
import CatalanCalculator from './CatalanCalculator.jsx';
import { HashVisual, ChartVisual, IdleVisual } from './MiscVisuals.jsx';
import { LinkedListVisual, StackVisual, QueueVisual } from './LinearVisuals.jsx';
import { t, rich, HL_MEANING, usedHighlightKeys, READ_GUIDE } from './utils.js';

const SWATCH_COLOR = {
  'k-yellow': 'yellow', 'k-yellow-o': 'yellow', 'k-cyan': 'cyan', 'k-cyan-d': 'cyan', 'k-amber': 'amber',
  'k-purple': 'purple', 'k-red': 'red', 'k-red-x': 'red', 'k-red-d': 'red', 'k-green': 'green', 'k-green-o': 'green', 'k-dim': 'dim', 'k-orange-ring': 'orange'
};

/** Lesson-authored legend first, then the automatic meaning of every other colour on screen. */
function buildKey(scene, lang) {
  const authored = (scene.legend || []).map((l) => ({ label: t(l.label, lang), color: l.color }));
  const covered = new Set(authored.map((l) => (String(l.color).match(/--([a-z]+)/) || [])[1]).filter(Boolean));
  const seen = new Set();
  const auto = [];
  for (const k of usedHighlightKeys(scene)) {
    const m = HL_MEANING[k];
    const label = t(m, lang);
    if (covered.has(SWATCH_COLOR[m.swatch]) || seen.has(label)) continue;
    seen.add(label);
    auto.push({ label, swatch: m.swatch });
  }
  return [...authored, ...auto];
}

function readGuideOpen() {
  try {
    return localStorage.getItem('algosim-read-guide') === 'open';
  } catch {
    return false;
  }
}

/**
 * Interactive Zoomable & Pannable Stage for Tree and Algorithm Visualizations.
 * Supports:
 * - Mouse wheel zooming (0.3x to 3.5x)
 * - Click and drag panning (mouse & touch)
 * - Floating on-screen zoom toolbar (+, -, %, Fit/Reset)
 * - Auto-fit scaling to viewport
 * - Iteration HUD and variable chips
 */
export default function Stage({ scene, stageKey, step, lang, speed = 1 }) {
  const wrapRef = useRef(null);
  const measureRef = useRef(null);
  const legendRef = useRef(null);
  // Height taken by the overlays at the top, so the drawing is pushed below them instead of hidden.
  const [topInset, setTopInset] = useState(0);

  // Auto-fit base scale
  const [baseScale, setBaseScale] = useState(1);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // User interactive zoom & pan
  const [userZoom, setUserZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showCatalanCalc, setShowCatalanCalc] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  useEffect(() => setGuideOpen(readGuideOpen()), []);
  const toggleGuide = () => {
    setGuideOpen((o) => {
      try {
        localStorage.setItem('algosim-read-guide', o ? 'closed' : 'open');
      } catch {
        /* storage blocked: the toggle still works for this visit */
      }
      return !o;
    });
  };
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  // Reset pan and user zoom when changing topics
  useEffect(() => {
    setUserZoom(1);
    setPan({ x: 0, y: 0 });
    setShowCatalanCalc(false);
  }, [stageKey]);

  // Monitor container size
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Track how tall the top overlays (colour key, reading guide, HUD) are
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return;
    const measure = () => {
      const lh = legendRef.current ? legendRef.current.offsetHeight + 14 : 0;
      setTopInset(lh);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (legendRef.current) ro.observe(legendRef.current);
    return () => ro.disconnect();
  }, [scene, step, guideOpen, lang]);

  // Compute base fit scale
  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const availW = size.w - 48;
    const availH = size.h - 56 - topInset;
    if (availW <= 60 || availH <= 60) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (!w || !h) return;
    const s = Math.max(0.2, Math.min(1.15, availW / w, availH / h));
    setBaseScale((prev) => (Math.abs(prev - s) > 0.01 ? s : prev));
  }, [scene, stageKey, size, topInset]);

  // Mouse wheel zoom handler (non-passive to prevent outer scrolling)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      setUserZoom((prev) => {
        const next = Math.max(0.3, Math.min(3.5, prev * zoomFactor));
        return Math.round(next * 100) / 100;
      });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  // Drag-to-pan handlers (Mouse)
  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    // Don't drag if user clicked an interactive control or button
    if (e.target.closest('button, input, select, .stage-legend, .stage-zoom-bar, .tree-output-wrap')) {
      return;
    }
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y
    };
  }, [pan]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPan({
      x: dragStart.current.panX + dx,
      y: dragStart.current.panY + dy
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Drag-to-pan handlers (Touch for Mobile)
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length !== 1) return;
    if (e.target.closest('button, input, select, .stage-legend, .stage-zoom-bar, .tree-output-wrap')) {
      return;
    }
    const touch = e.touches[0];
    setIsDragging(true);
    dragStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      panX: pan.x,
      panY: pan.y
    };
  }, [pan]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.current.x;
    const dy = touch.clientY - dragStart.current.y;
    setPan({
      x: dragStart.current.panX + dx,
      y: dragStart.current.panY + dy
    });
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Zoom toolbar buttons
  const zoomIn = () => setUserZoom((z) => Math.min(3.5, Math.round((z + 0.18) * 100) / 100));
  const zoomOut = () => setUserZoom((z) => Math.max(0.3, Math.round((z - 0.18) * 100) / 100));
  const resetZoom = () => {
    setUserZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const s = scene || { kind: 'none' };
  let body;
  if (showCatalanCalc || s.kind === 'catalan-calc') {
    body = <CatalanCalculator lang={lang} />;
  } else if (s.kind === 'tree-memory' || s.memoryMode) {
    body = <TreeMemoryVisual scene={s} lang={lang} />;
  } else {
    switch (s.kind) {
      case 'tree':
      case 'graph':
        body = <TreeGraphVisual scene={s} lang={lang} />;
        break;
      case 'bst':
        body = <BstAnimVisual scene={s} lang={lang} speed={speed} />;
        break;
      case 'multiway':
        body = <MultiwayVisual scene={s} lang={lang} />;
        break;
      case 'forest':
        body = <ForestVisual scene={s} lang={lang} />;
        break;
      case 'array':
      case 'bars':
        body = <ArrayVisual scene={s} lang={lang} />;
        break;
      case 'linkedlist':
        body = <LinkedListVisual scene={s} lang={lang} />;
        break;
      case 'stack':
        body = <StackVisual scene={s} lang={lang} />;
        break;
      case 'queue':
        body = <QueueVisual scene={s} lang={lang} />;
        break;
      case 'chart':
        body = <ChartVisual scene={s} lang={lang} />;
        break;
      case 'hash':
        body = <HashVisual scene={s} lang={lang} />;
        break;
      default:
        body = <IdleVisual scene={s} lang={lang} />;
    }
  }

  const colorKey = buildKey(s, lang);
  const guide = READ_GUIDE[s.memoryMode ? 'tree-memory' : s.kind];
  const bn = lang === 'bn';
  const currentScale = baseScale * userZoom;

  return (
    <div
      className="stage"
      ref={wrapRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: isDragging ? 'none' : 'auto'
      }}
    >
      {/* One quiet Guide button: the colour key and reading tips open only on demand */}
      {(colorKey.length > 0 || guide) && (
        <div className="stage-legend" ref={legendRef}>
          <button className={`canvas-guide-btn${guideOpen ? ' on' : ''}`} onClick={toggleGuide} aria-expanded={guideOpen}>
            {guideOpen ? <X size={13} /> : <HelpCircle size={13} />}
            <span>{bn ? 'গাইড' : 'Guide'}</span>
          </button>
          {guideOpen && (
            <div className="canvas-guide">
              {guide && (
                <ul className="canvas-guide-tips">
                  {t(guide, lang).map((line, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: rich(line, lang) }} />
                  ))}
                </ul>
              )}
              {colorKey.length > 0 && (
                <ul className="canvas-guide-key" aria-label={bn ? 'রঙের মানে' : 'What the colours mean'}>
                  {colorKey.map((l, i) => (
                    <li key={i}>
                      {l.swatch ? <span className={`key-swatch ${l.swatch}`} /> : <span className="legend-dot" style={{ background: l.color }} />}
                      {l.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}

      {/* Floating Catalan Calculator Quick Toggle */}
      {stageKey === 'catalan-and-tree-math' && (
        <div className="stage-tools">
          <button
            className={`stage-tool ${showCatalanCalc ? 'active' : ''}`}
            onClick={() => setShowCatalanCalc((c) => !c)}
            title={lang === 'bn' ? 'ক্যাটালান ক্যালকুলেটর টগল' : 'Toggle Catalan Calculator'}
            style={{
              width: 'auto',
              padding: '0 12px',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 700,
              color: showCatalanCalc ? 'var(--yellow)' : 'var(--text-secondary)',
              background: showCatalanCalc ? 'var(--yellow-bg)' : 'var(--bg-secondary)',
              borderColor: showCatalanCalc ? 'var(--yellow)' : 'var(--border)'
            }}
          >
            <Calculator size={15} />
            <span>{lang === 'bn' ? 'ক্যাটালান ক্যালকুলেটর' : 'Catalan Calculator'}</span>
          </button>
        </div>
      )}

      {/* Floating Zoom & Pan Control Bar */}
      <div className="stage-zoom-bar">
        <button
          className="stage-zoom-btn"
          onClick={zoomOut}
          title={lang === 'bn' ? 'জুম আউট' : 'Zoom Out'}
        >
          <Minus size={14} />
        </button>
        <button
          className="stage-zoom-label"
          onClick={resetZoom}
          title={lang === 'bn' ? 'জুম রিসেট (১০০%)' : 'Reset Zoom (100%)'}
        >
          {Math.round(userZoom * 100)}%
        </button>
        <button
          className="stage-zoom-btn"
          onClick={zoomIn}
          title={lang === 'bn' ? 'জুম ইন' : 'Zoom In'}
        >
          <Plus size={14} />
        </button>
        <button
          className="stage-zoom-btn"
          onClick={resetZoom}
          title={lang === 'bn' ? 'স্ক্রিনে ফিট করুন' : 'Fit to Canvas'}
        >
          <Maximize2 size={13} />
        </button>
      </div>

      {/* Main Canvas with Transform */}
      <div
        className="stage-measure"
        ref={measureRef}
        style={{
          transform: `translate(${pan.x}px, ${pan.y + topInset / 2}px) scale(${currentScale})`,
          transition: isDragging ? 'none' : 'transform 0.18s cubic-bezier(0.2, 0, 0, 1)'
        }}
      >
        <div className="stage-fade" key={stageKey}>
          {body}
        </div>
      </div>

      {s.caption && <div className="stage-caption" dangerouslySetInnerHTML={{ __html: rich(s.caption, lang) }} />}
    </div>
  );
}
