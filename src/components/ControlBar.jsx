import React, { useState, useEffect } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, RotateCcw,
  Binary, SlidersHorizontal, Sparkles, ChevronUp, X
} from 'lucide-react';

const PRESETS = [
  { label: 'Balanced BST', val: '50, 30, 70, 20, 40, 60, 80', mode: 'bst' },
  { label: 'Abdul Bari Tree', val: 'A, B, C, D, E, F', mode: 'level' },
  { label: 'Alphabet (A-G)', val: 'A, B, C, D, E, F, G', mode: 'level' },
  { label: 'Skewed Tree', val: '10, 20, 30, 40, 50', mode: 'bst' }
];

export default function ControlBar({
  currentStep,
  totalSteps,
  isPlaying,
  speed,
  lang = 'en',
  onPrev,
  onNext,
  onPlay,
  onPause,
  onReset,
  onSpeedChange,
  isMobile,
  isTraversal,
  activeTraversal = 'inorder',
  onSelectTraversal,
  treeInput = '50, 30, 70, 20, 40, 60, 80',
  treeMode = 'bst',
  onApplyTree
}) {
  const atStart = currentStep === 0;
  const atEnd = currentStep >= totalSteps - 1;
  const L = (en, bn) => (lang === 'bn' ? bn : en);

  const [showCustomTree, setShowCustomTree] = useState(false);
  const [inputVal, setInputVal] = useState(treeInput);
  const [modeVal, setModeVal] = useState(treeMode);

  useEffect(() => {
    setInputVal(treeInput);
  }, [treeInput]);

  useEffect(() => {
    setModeVal(treeMode);
  }, [treeMode]);

  return (
    <div className={`control-bar-container ${isTraversal ? 'has-traversal' : ''}`}>
      {/* Traversal Selector Tier (Bottom Action Row) */}
      {isTraversal && (
        <div className="trav-bar-tier">
          <div className="trav-tabs">
            <div className="trav-tabs-label">
              <Binary size={14} style={{ color: 'var(--yellow)' }} />
              {!isMobile && <span>{L('Simulate Traversal:', 'ট্রাভার্সাল সিমুলেশন:')}</span>}
            </div>
            <button
              className={`trav-tab-btn ${activeTraversal === 'inorder' ? 'active' : ''}`}
              onClick={() => onSelectTraversal && onSelectTraversal('inorder')}
              title={L('In-Order: Left → Root → Right (Sorted output in BST)', 'ইন-অর্ডার: বাম → রুট → ডান (BST-তে সর্টেড)')}
            >
              In-Order (L-Root-R)
            </button>
            <button
              className={`trav-tab-btn ${activeTraversal === 'preorder' ? 'active' : ''}`}
              onClick={() => onSelectTraversal && onSelectTraversal('preorder')}
              title={L('Pre-Order: Root → Left → Right (Tree cloning)', 'প্রি-অর্ডার: রুট → বাম → ডান (ট্রি ক্লোনিং)')}
            >
              Pre-Order (Root-L-R)
            </button>
            <button
              className={`trav-tab-btn ${activeTraversal === 'postorder' ? 'active' : ''}`}
              onClick={() => onSelectTraversal && onSelectTraversal('postorder')}
              title={L('Post-Order: Left → Right → Root (Deletion & bottom-up)', 'পোস্ট-অর্ডার: বাম → ডান → রুট (ডিলিশন ও বটম-আপ)')}
            >
              Post-Order (L-R-Root)
            </button>
            <button
              className={`trav-tab-btn ${activeTraversal === 'bfs' ? 'active' : ''}`}
              onClick={() => onSelectTraversal && onSelectTraversal('bfs')}
              title={L('BFS Level-Order: FIFO Queue level-by-level', 'BFS লেভেল-অর্ডার: FIFO কিউ')}
            >
              BFS Level-Order
            </button>
          </div>

          <div className="trav-custom-container">
            <button
              className={`trav-custom-btn ${showCustomTree ? 'open' : ''}`}
              onClick={() => setShowCustomTree((o) => !o)}
              title={L('Configure custom tree nodes', 'কাস্টম ট্রি নোড কনফিগার করুন')}
            >
              <SlidersHorizontal size={13} />
              <span>{L('Custom Tree', 'কাস্টম ট্রি')}</span>
              <ChevronUp size={13} style={{ transform: showCustomTree ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
            </button>

            {showCustomTree && (
              <div className="trav-custom-popover">
                <div className="trav-popover-head">
                  <div className="trav-popover-title">
                    <SlidersHorizontal size={13} style={{ color: 'var(--yellow)' }} />
                    <span>{L('Custom Tree Nodes', 'কাস্টম ট্রি নোড')}</span>
                  </div>
                  <button className="trav-popover-close" onClick={() => setShowCustomTree(false)}>
                    <X size={14} />
                  </button>
                </div>
                <div className="trav-popover-body">
                  <div className="trav-popover-field">
                    <label>{L('Nodes (comma or space separated):', 'নোডসমূহ (কমা বা স্পেস দিয়ে আলাদা):')}</label>
                    <input
                      type="text"
                      className="trav-popover-input"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      placeholder="e.g. 50, 30, 70, 20, 40, 60, 80"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && onApplyTree) {
                          onApplyTree({ input: inputVal, mode: modeVal });
                          setShowCustomTree(false);
                        }
                      }}
                    />
                  </div>

                  <div className="trav-popover-field">
                    <label>{L('Tree Type:', 'ট্রির ধরন:')}</label>
                    <div className="trav-mode-switch">
                      <button
                        type="button"
                        className={`trav-mode-opt ${modeVal === 'bst' ? 'active' : ''}`}
                        onClick={() => setModeVal('bst')}
                      >
                        BST (Sorted)
                      </button>
                      <button
                        type="button"
                        className={`trav-mode-opt ${modeVal === 'level' ? 'active' : ''}`}
                        onClick={() => setModeVal('level')}
                      >
                        Level-Order
                      </button>
                    </div>
                  </div>

                  <div className="trav-popover-presets">
                    <span className="trav-preset-label">{L('Presets:', 'প্রিসেট:')}</span>
                    <div className="trav-preset-pills">
                      {PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="trav-preset-pill"
                          onClick={() => {
                            setInputVal(p.val);
                            setModeVal(p.mode);
                          }}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="trav-apply-btn"
                    onClick={() => {
                      if (onApplyTree) onApplyTree({ input: inputVal, mode: modeVal });
                      setShowCustomTree(false);
                    }}
                  >
                    <Sparkles size={14} />
                    <span>{L('Apply Tree', 'ট্রি প্রয়োগ করুন')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Playback Bar */}
      <div className="control-bar">
        <button className="ctrl-btn" onClick={onReset} title={L('Reset to beginning', 'শুরুতে ফিরুন')}>
          <RotateCcw size={16} />
          {!isMobile && L('Reset', 'রিসেট')}
        </button>

        {!isMobile && <div className="control-separator" />}

        <button className="ctrl-btn" onClick={onPrev} disabled={atStart} title={L('Previous step', 'আগের ধাপ')}>
          <SkipBack size={16} />
          {!isMobile && L('Prev', 'আগে')}
        </button>

        <div className="step-indicator">
          <strong>{currentStep + 1}</strong> / {totalSteps}
        </div>

        <button className="ctrl-btn" onClick={onNext} disabled={atEnd} title={L('Next step', 'পরের ধাপ')}>
          {!isMobile && L('Next', 'পরে')}
          <SkipForward size={16} />
        </button>

        {!isPlaying ? (
          <button className="ctrl-btn primary" onClick={onPlay} disabled={atEnd} title={L('Auto play', 'অটো প্লে')}>
            <Play size={16} />
            {!isMobile && L('Play', 'প্লে')}
          </button>
        ) : (
          <button className="ctrl-btn" onClick={onPause} title={L('Pause', 'থামুন')}>
            <Pause size={16} />
            {!isMobile && L('Pause', 'পজ')}
          </button>
        )}

        {!isMobile && (
          <>
            <div className="control-separator" />
            <div className="speed-control">
              <span className="speed-label">{L('Speed', 'স্পিড')}</span>
              <input
                type="range"
                className="speed-slider"
                min="0.5"
                max="3"
                step="0.5"
                value={speed}
                onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
              />
              <span className="speed-value">{speed}x</span>
            </div>
            <div className="kbd-hint" style={{ marginLeft: 14 }}>
              <kbd>←</kbd><kbd>→</kbd> {L('steps', 'ধাপ')} · <kbd>Space</kbd> {L('play', 'প্লে')}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
