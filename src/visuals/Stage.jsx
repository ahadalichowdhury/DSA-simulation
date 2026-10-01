import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { Plus, Minus, Maximize2, RotateCcw, Calculator } from 'lucide-react';
import ArrayVisual from './ArrayVisual.jsx';
import TreeGraphVisual from './TreeGraphVisual.jsx';
import TreeMemoryVisual from './TreeMemoryVisual.jsx';
import MultiwayVisual from './MultiwayVisual.jsx';
import ForestVisual from './ForestVisual.jsx';
import CatalanCalculator from './CatalanCalculator.jsx';
import { HashVisual, CardsVisual, ChartVisual, IdleVisual } from './MiscVisuals.jsx';

/**
 * Interactive Zoomable & Pannable Stage for Tree and Algorithm Visualizations.
 * Supports:
 * - Mouse wheel zooming (0.3x to 3.5x)
 * - Click and drag panning (mouse & touch)
 * - Floating on-screen zoom toolbar (+, -, %, Fit/Reset)
 * - Auto-fit scaling to viewport
 * - Iteration HUD and variable chips
 */
export default function Stage({ scene, stageKey, step, lang }) {
  const wrapRef = useRef(null);
  const measureRef = useRef(null);

  // Auto-fit base scale
  const [baseScale, setBaseScale] = useState(1);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // User interactive zoom & pan
  const [userZoom, setUserZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showCatalanCalc, setShowCatalanCalc] = useState(false);
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

  // Compute base fit scale
  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const availW = size.w - 48;
    const availH = size.h - 56;
    if (availW <= 60 || availH <= 60) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (!w || !h) return;
    const s = Math.max(0.2, Math.min(1.15, availW / w, availH / h));
    setBaseScale((prev) => (Math.abs(prev - s) > 0.01 ? s : prev));
  }, [scene, stageKey, size]);

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
    if (e.target.closest('button, input, select, .stage-hud, .stage-legend, .stage-zoom-bar, .tree-output-wrap')) {
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
    if (e.target.closest('button, input, select, .stage-hud, .stage-legend, .stage-zoom-bar, .tree-output-wrap')) {
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
        body = <TreeGraphVisual scene={s} />;
        break;
      case 'multiway':
        body = <MultiwayVisual scene={s} />;
        break;
      case 'forest':
        body = <ForestVisual scene={s} />;
        break;
      case 'array':
      case 'bars':
        body = <ArrayVisual scene={s} />;
        break;
      case 'cards':
        body = <CardsVisual scene={s} />;
        break;
      case 'chart':
        body = <ChartVisual scene={s} />;
        break;
      case 'hash':
        body = <HashVisual scene={s} />;
        break;
      default:
        body = <IdleVisual scene={s} />;
    }
  }

  const legend = s.legend || [];
  const iteration = step?.iteration;
  const stateVars = step?.state && Object.keys(step.state).length ? Object.entries(step.state) : [];
  const iterLabel = iteration
    ? (typeof iteration.label === 'string'
        ? iteration.label
        : (iteration.label && iteration.label[lang]) || (lang === 'bn' ? 'ইটারেশন' : 'Iteration'))
    : null;

  const fmtVal = (v) => {
    if (v == null) return '';
    if (Array.isArray(v)) return `[${v.join(', ')}]`;
    if (typeof v === 'object') return String(v.val ?? v.value ?? '');
    if (typeof v === 'boolean') return v ? (lang === 'bn' ? 'হ্যাঁ' : 'yes') : (lang === 'bn' ? 'না' : 'no');
    return String(v);
  };

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
      {/* Legend */}
      {legend.length > 0 && (
        <div className="stage-legend">
          {legend.map((l, i) => (
            <span className="legend-chip" key={i}>
              <span className="legend-dot" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
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

      {/* Per-step iteration HUD and live state variable chips */}
      {(iteration || stateVars.length > 0) && (
        <div className="stage-hud">
          {iteration && (
            <div className="iter-badge" key={`i-${iteration.i}-${stageKey}`}>
              <span className="iter-spin" />
              <b>{iterLabel} {iteration.i}</b>
              {iteration.of != null && iteration.of > 0 && <span className="iter-of">/ {iteration.of}</span>}
            </div>
          )}
          {stateVars.length > 0 && (
            <div className="state-chips" key={`s-${stageKey}`}>
              {stateVars.slice(0, 7).map(([k, v]) => (
                <span
                  className={`state-chip${v && typeof v === 'object' && v.changed ? ' changed' : ''}`}
                  key={k}
                >
                  <i>{k}</i>=<b>{fmtVal(v)}</b>
                </span>
              ))}
            </div>
          )}
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
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${currentScale})`,
          transition: isDragging ? 'none' : 'transform 0.18s cubic-bezier(0.2, 0, 0, 1)'
        }}
      >
        <div className="stage-fade" key={stageKey}>
          {body}
        </div>
      </div>

      {s.caption && <div className="stage-caption" dangerouslySetInnerHTML={{ __html: s.caption }} />}
    </div>
  );
}
