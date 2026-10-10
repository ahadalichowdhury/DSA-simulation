import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Sun, Moon, Menu, X, ChevronUp, ChevronDown, Globe } from 'lucide-react';
import Sidebar from './components/Sidebar';
import InfoPanel from './components/InfoPanel';
import ControlBar from './components/ControlBar';
import Stage from './visuals/Stage';
import BstToolbar from './components/BstToolbar';
import { runBstOp, fromPreorder, preorder, checkOp, BST_DEFAULT } from './visuals/bstGenerator.js';
import { BST_OP_META } from './data/topics/bst-playground.js';
import { codeFor } from './visuals/bstCode.js';
import GraphToolbar from './components/GraphToolbar';
import { runGraphOp, checkGraphOp, GRAPH_DEFAULT } from './visuals/graphPlayground.js';
import { GRAPH_ALGO_META } from './data/topics/graph-playground.js';
import TreeToolbar from './components/TreeToolbar';
import { runTreeOp, checkTreeOp, TREE_DEFAULT, lessonTraversalSteps } from './visuals/treePlayground.js';
import { TREE_ALGO_META } from './data/topics/tree-playground.js';
import { topics, categoryOrder } from './data/topics/index.js';
import { TRAVERSAL_CONFIGS } from './data/topics/traversalData.js';
import { buildTree } from './visuals/traversalGenerator.js';
import { t } from './visuals/utils.js';
import './App.css';

const LS = {
  topic: 'algosim-active-topic',
  step: 'algosim-step-index',
  width: 'algosim-panel-width',
  theme: 'theme',
  lang: 'algosim-lang',
  codeLang: 'algosim-code-lang',
  collapsed: 'algosim-collapsed',
  completed: 'algosim-completed',
  bstRun: 'algosim-bst-run',
  graphRun: 'algosim-graph-run',
  treeRun: 'algosim-tree-run'
};

function readLS(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v == null ? fallback : v;
  } catch {
    return fallback;
  }
}

function App() {
  const [activeId, setActiveId] = useState(() => {
    const saved = readLS(LS.topic, null);
    return saved && topics.some((tp) => tp.id === saved) ? saved : topics[0].id;
  });
  const [stepIndex, setStepIndex] = useState(() => parseInt(readLS(LS.step, '0'), 10) || 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [theme, setTheme] = useState(() => readLS(LS.theme, 'light'));
  const [lang, setLang] = useState(() => readLS(LS.lang, 'en'));
  const [codeLang, setCodeLang] = useState(() => readLS(LS.codeLang, 'pseudo'));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => readLS(LS.collapsed, 'false') === 'true');
  const [panelWidth, setPanelWidth] = useState(() => parseInt(readLS(LS.width, '390'), 10) || 390);
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(readLS(LS.completed, '[]')) || [];
    } catch {
      return [];
    }
  });
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 900);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const playTimerRef = useRef(null);

  // Interactive traversal state
  const [activeTraversal, setActiveTraversal] = useState('inorder');
  const [treeInput, setTreeInput] = useState('50, 30, 70, 20, 40, 60, 80');
  const [treeMode, setTreeMode] = useState('bst');

  // BST playground: the tree the last operation started from + that operation.
  // The tree it produces becomes the starting point of the next operation.
  const [bstRun, setBstRun] = useState(() => {
    try {
      const saved = JSON.parse(readLS(LS.bstRun, 'null'));
      if (saved && saved.op && Array.isArray(saved.base)) return { ...saved, id: 0 };
    } catch {
      /* fall through to the default tree */
    }
    return { base: [], op: { type: 'build', ...BST_DEFAULT }, id: 0 };
  });

  const standardTopic = useMemo(() => topics.find((tp) => tp.id === activeId) || topics[0], [activeId]);
  const isInteractiveTraversal = activeId === 'tree-traversal-mechanics';

  const traversalTopic = useMemo(() => {
    if (!isInteractiveTraversal) return null;
    const config = TRAVERSAL_CONFIGS[activeTraversal] || TRAVERSAL_CONFIGS.inorder;
    return {
      ...standardTopic,
      name: config.name,
      description: config.description,
      complexity: config.complexity,
      code: config.code,
    };
  }, [isInteractiveTraversal, activeTraversal, standardTopic]);

  // the traversal lesson uses the same traced engine as the Tree Playground
  const traversalSteps = useMemo(() => {
    if (!isInteractiveTraversal) return null;
    return lessonTraversalSteps(buildTree(treeInput, treeMode), activeTraversal);
  }, [isInteractiveTraversal, activeTraversal, treeInput, treeMode]);

  const isBstPlayground = activeId === 'bst-crud-playground';
  const bstOutcome = useMemo(() => {
    if (!isBstPlayground) return null;
    return runBstOp(fromPreorder(bstRun.base), bstRun.op);
  }, [isBstPlayground, bstRun]);
  const bstTopic = useMemo(() => {
    if (!isBstPlayground) return null;
    const meta = BST_OP_META[bstRun.op.type];
    // the real program for this operation, with main() making the user's own call
    const program = codeFor(bstRun.op, { queue: bstOutcome?.queue, mode: bstOutcome?.mode });
    return {
      ...standardTopic,
      description: { en: `Now running: ${meta.en}. ${standardTopic.description.en}`, bn: `এখন চলছে: ${meta.bn}। ${standardTopic.description.bn}` },
      complexity: { ...standardTopic.complexity, time: meta.time },
      code: program.code,
      lineMap: program.lineMap
    };
  }, [isBstPlayground, bstRun, standardTopic, bstOutcome]);

  // What the toolbar is set up to do next. ▶ Play runs it when it differs from what is showing.
  const [bstDraft, setBstDraft] = useState(null);
  const [bstError, setBstError] = useState(null);
  const sameOp = (a, b) => {
    if (!a || !b || a.type !== b.type) return false;
    const n = (x) => String(x ?? '').trim();
    if (a.type === 'build') return n(a.input) === n(b.input) && a.mode === b.mode;
    if (a.type === 'traverse') return (a.order || 'inorder') === (b.order || 'inorder');
    return n(a.key) === n(b.key) && n(a.newKey) === n(b.newKey);
  };
  const bstPending = isBstPlayground && bstDraft != null && !sameOp(bstDraft, bstRun.op);
  const onBstDraft = useCallback((d) => { setBstDraft(d); setBstError(null); }, []);

  const runBst = useCallback((op) => {
    const current = bstOutcome?.result ?? null;
    setBstRun((prev) => {
      const next = { base: op.type === 'build' ? [] : preorder(current), op, id: prev.id + 1 };
      try { localStorage.setItem(LS.bstRun, JSON.stringify({ base: next.base, op })); } catch {}
      return next;
    });
    setStepIndex(0);
    setIsPlaying(true);
  }, [bstOutcome]);

  // Graph playground: the learner's own graph + algorithm. ▶ Play runs a changed setup.
  const isGraphPlayground = activeId === 'graph-playground';
  const [graphRun, setGraphRun] = useState(() => {
    try {
      const saved = JSON.parse(readLS(LS.graphRun, 'null'));
      if (saved && saved.algo && !checkGraphOp(saved)) return { op: saved, id: 0 };
    } catch {
      /* fall through to the default graph */
    }
    return { op: GRAPH_DEFAULT, id: 0 };
  });
  const graphOutcome = useMemo(() => (isGraphPlayground ? runGraphOp(graphRun.op) : null), [isGraphPlayground, graphRun]);
  const graphTopic = useMemo(() => {
    if (!isGraphPlayground || !graphOutcome) return null;
    const meta = GRAPH_ALGO_META[graphRun.op.algo];
    return {
      ...standardTopic,
      description: { en: `Now running: ${meta.en}. ${standardTopic.description.en}`, bn: `এখন চলছে: ${meta.bn}। ${standardTopic.description.bn}` },
      complexity: { ...standardTopic.complexity, time: meta.time },
      code: graphOutcome.code,
      lineMap: graphOutcome.lineMap
    };
  }, [isGraphPlayground, graphOutcome, graphRun, standardTopic]);
  const [graphDraft, setGraphDraft] = useState(null);
  const [graphError, setGraphError] = useState(null);
  const sameGraphOp = (a, b) => !!a && !!b && a.algo === b.algo && String(a.edges).replace(/\s+/g, '') === String(b.edges).replace(/\s+/g, '') && !!a.directed === !!b.directed && String(a.start ?? 0) === String(b.start ?? 0);
  const graphPending = isGraphPlayground && graphDraft != null && !sameGraphOp(graphDraft, graphRun.op);
  const onGraphDraft = useCallback((d) => { setGraphDraft(d); setGraphError(null); }, []);
  const runGraph = useCallback((op) => {
    setGraphRun((prev) => ({ op, id: prev.id + 1 }));
    try { localStorage.setItem(LS.graphRun, JSON.stringify(op)); } catch {}
    setStepIndex(0);
    setIsPlaying(true);
  }, []);
  // Tree playground: the learner's own values + tree algorithm. Same flow as the graph playground.
  const isTreePlayground = activeId === 'tree-playground';
  const [treeRun, setTreeRun] = useState(() => {
    try {
      const saved = JSON.parse(readLS(LS.treeRun, 'null'));
      if (saved && saved.algo && !checkTreeOp(saved)) return { op: saved, id: 0 };
    } catch {
      /* fall through to the default values */
    }
    return { op: TREE_DEFAULT, id: 0 };
  });
  const treeOutcome = useMemo(() => (isTreePlayground ? runTreeOp(treeRun.op) : null), [isTreePlayground, treeRun]);
  const treeTopic = useMemo(() => {
    if (!isTreePlayground || !treeOutcome) return null;
    const meta = TREE_ALGO_META[treeRun.op.algo];
    return {
      ...standardTopic,
      description: { en: `Now running: ${meta.en}. ${standardTopic.description.en}`, bn: `এখন চলছে: ${meta.bn}। ${standardTopic.description.bn}` },
      complexity: { ...standardTopic.complexity, time: meta.time },
      code: treeOutcome.code,
      lineMap: treeOutcome.lineMap
    };
  }, [isTreePlayground, treeOutcome, treeRun, standardTopic]);
  const [treeDraft, setTreeDraft] = useState(null);
  const [treeError, setTreeError] = useState(null);
  const sameTreeOp = (a, b) => !!a && !!b && a.algo === b.algo && String(a.values).replace(/\s+/g, '') === String(b.values).replace(/\s+/g, '') && (a.shape || 'bst') === (b.shape || 'bst');
  const treePending = isTreePlayground && treeDraft != null && !sameTreeOp(treeDraft, treeRun.op);
  const onTreeDraft = useCallback((d) => { setTreeDraft(d); setTreeError(null); }, []);
  const runTree = useCallback((op) => {
    setTreeRun((prev) => ({ op, id: prev.id + 1 }));
    try { localStorage.setItem(LS.treeRun, JSON.stringify(op)); } catch {}
    setStepIndex(0);
    setIsPlaying(true);
  }, []);

  const isPlayground = isBstPlayground || isGraphPlayground || isTreePlayground;
  const playPending = bstPending || graphPending || treePending;

  const activeTopic = isInteractiveTraversal && traversalTopic ? traversalTopic : isBstPlayground && bstTopic ? bstTopic : isGraphPlayground && graphTopic ? graphTopic : isTreePlayground && treeTopic ? treeTopic : standardTopic;
  const steps = isInteractiveTraversal && traversalSteps
    ? traversalSteps
    : isBstPlayground && bstOutcome ? bstOutcome.steps
      : isGraphPlayground && graphOutcome ? graphOutcome.steps
        : isTreePlayground && treeOutcome ? treeOutcome.steps : (standardTopic?.steps || []);
  const safeStep = Math.min(stepIndex, Math.max(0, steps.length - 1));
  const step = steps[safeStep];

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileSidebarOpen(false);
        setMobilePanelOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(LS.theme, theme); } catch {}
  }, [theme]);

  useEffect(() => { try { localStorage.setItem(LS.topic, activeId); } catch {} }, [activeId]);
  useEffect(() => { try { localStorage.setItem(LS.step, String(stepIndex)); } catch {} }, [stepIndex]);
  useEffect(() => { try { localStorage.setItem(LS.width, String(panelWidth)); } catch {} }, [panelWidth]);
  useEffect(() => { try { localStorage.setItem(LS.lang, lang); } catch {} }, [lang]);
  useEffect(() => { try { localStorage.setItem(LS.codeLang, codeLang); } catch {} }, [codeLang]);
  useEffect(() => { try { localStorage.setItem(LS.collapsed, String(sidebarCollapsed)); } catch {} }, [sidebarCollapsed]);
  useEffect(() => { try { localStorage.setItem(LS.completed, JSON.stringify(completed)); } catch {} }, [completed]);

  useEffect(() => {
    if (stepIndex !== safeStep) setStepIndex(safeStep);
  }, [stepIndex, safeStep]);

  // reaching the end marks the lesson complete
  useEffect(() => {
    if (steps.length && safeStep === steps.length - 1) {
      setCompleted((prev) => (prev.includes(activeId) ? prev : [...prev, activeId]));
    }
  }, [safeStep, activeId, steps.length]);

  const toggleTheme = () => setTheme((th) => (th === 'light' ? 'dark' : 'light'));
  const toggleLang = () => setLang((l) => (l === 'en' ? 'bn' : 'en'));

  const stopPlay = useCallback(() => {
    setIsPlaying(false);
    if (playTimerRef.current) clearInterval(playTimerRef.current);
  }, []);

  const handleSelect = useCallback((id) => {
    setActiveId(id);
    setStepIndex(0);
    stopPlay();
    setMobileSidebarOpen(false);
  }, [stopPlay]);

  const handleNext = useCallback(() => setStepIndex((i) => Math.min(i + 1, Math.max(0, steps.length - 1))), [steps.length]);
  const handlePrev = useCallback(() => setStepIndex((i) => Math.max(i - 1, 0)), []);
  const handleReset = useCallback(() => { setStepIndex(0); stopPlay(); }, [stopPlay]);

  // auto play
  useEffect(() => {
    if (!isPlaying) return;
    // the playgrounds play many small moves, so they step faster
    const interval = (isBstPlayground || isTreePlayground ? 1300 : isGraphPlayground ? 1800 : 2800) / speed;
    playTimerRef.current = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(playTimerRef.current);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, interval);
    return () => { if (playTimerRef.current) clearInterval(playTimerRef.current); };
  }, [isPlaying, speed, steps.length, isBstPlayground, isGraphPlayground, isTreePlayground]);

  // ▶ Play: in the BST playground it first runs a newly prepared operation,
  // and replays from the start when the animation already finished.
  const handlePlay = useCallback(() => {
    if (isBstPlayground && bstPending) {
      const err = checkOp(bstOutcome?.result ?? null, bstDraft);
      if (err) { setBstError(err); return; }
      runBst(bstDraft);
      return;
    }
    if (isGraphPlayground && graphPending) {
      const err = checkGraphOp(graphDraft);
      if (err) { setGraphError(err); return; }
      runGraph({ ...graphDraft, start: Number(graphDraft.start) || 0 });
      return;
    }
    if (isTreePlayground && treePending) {
      const err = checkTreeOp(treeDraft);
      if (err) { setTreeError(err); return; }
      runTree(treeDraft);
      return;
    }
    if (safeStep >= steps.length - 1) {
      if (!isPlayground) return;
      setStepIndex(0);
    }
    setIsPlaying(true);
  }, [isBstPlayground, bstPending, bstOutcome, bstDraft, runBst, isGraphPlayground, graphPending, graphDraft, runGraph, isTreePlayground, treePending, treeDraft, runTree, isPlayground, safeStep, steps.length]);

  // Setting up a new operation pauses the old animation, so ▶ Play is right there to run it.
  useEffect(() => {
    if (playPending) stopPlay();
  }, [playPending, stopPlay]);

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') { e.preventDefault(); stopPlay(); handleNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); stopPlay(); handlePrev(); }
      else if (e.key === ' ') { e.preventDefault(); isPlaying ? stopPlay() : handlePlay(); }
      else if (e.key === 'r' || e.key === 'R') { handleReset(); }
      else if (e.key === 't' || e.key === 'T') { toggleTheme(); }
      else if (e.key === 'l' || e.key === 'L') { toggleLang(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPlaying, handleNext, handlePrev, handleReset, stopPlay, handlePlay]);

  const toggleDone = useCallback(() => {
    setCompleted((prev) => (prev.includes(activeId) ? prev.filter((x) => x !== activeId) : [...prev, activeId]));
  }, [activeId]);

  const subtitleText = lang === 'bn'
    ? 'ডেটা স্ট্রাকচার ও অ্যালগরিদম — নবী থেকে প্রো'
    : 'Data Structures &amp; Algorithms — Noob to Pro';

  return (
    <div className={`app ${isMobile ? 'is-mobile' : ''}${isMobile && mobilePanelOpen ? ' sheet-open' : ''}`}>
      <header className="header">
        <div className="header-left">
          {isMobile && (
            <button className="mobile-menu-btn" onClick={() => setMobileSidebarOpen((o) => !o)} aria-label="Menu">
              {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          <div className="header-logo">
            <span>Algo</span>Sim
          </div>
          {!isMobile && <div className="header-badge">{lang === 'bn' ? 'ইন্টারঅ্যাক্টিভ' : 'Interactive'}</div>}
        </div>
        <div className="header-right">
          {!isMobile && <div className="header-subtitle" dangerouslySetInnerHTML={{ __html: subtitleText }} />}
          <button className="lang-toggle" onClick={toggleLang} title={lang === 'en' ? 'বাংলায় দেখুন' : 'Switch to English'}>
            <Globe size={15} />
            <span className={lang === 'en' ? 'lang-en' : ''}>EN</span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span className={lang === 'bn' ? 'lang-en' : ''}>BN</span>
          </button>
          <button className="theme-toggle" onClick={toggleTheme} title={theme === 'light' ? 'Dark mode' : 'Light mode'}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </header>

      <div className="main">
        {isMobile && mobileSidebarOpen && <div className="mobile-overlay" onClick={() => setMobileSidebarOpen(false)} />}

        <div className={`sidebar-drawer${mobileSidebarOpen ? ' open' : ''}`}>
          <Sidebar
            topics={topics}
            categoryOrder={categoryOrder}
            activeId={activeId}
            onSelect={handleSelect}
            stepIndex={safeStep}
            totalSteps={steps.length}
            collapsed={!isMobile && sidebarCollapsed}
            onToggle={() => (isMobile ? setMobileSidebarOpen(false) : setSidebarCollapsed((c) => !c))}
            lang={lang}
            completed={completed}
          />
        </div>

        <div className="canvas-area">
          <Stage
            scene={step?.scene}
            stageKey={isInteractiveTraversal ? `${activeId}-${activeTraversal}-${treeInput}-${treeMode}` : isBstPlayground ? `${activeId}-run${bstRun.id}` : isGraphPlayground ? `${activeId}-run${graphRun.id}` : isTreePlayground ? `${activeId}-run${treeRun.id}` : activeId}
            step={step}
            lang={lang}
            speed={speed}
          />

        </div>

        {isMobile ? (
          <div className={`bottom-sheet ${mobilePanelOpen ? 'open' : ''}`} aria-hidden={!mobilePanelOpen}>
            <button className="sheet-handle" onClick={() => setMobilePanelOpen(false)}>
              <span className="sheet-grip" />
              <ChevronDown size={16} />
              {lang === 'bn' ? 'বিবরণ লুকাও' : 'Hide details'}
            </button>
            <InfoPanel
              topic={activeTopic}
              step={step}
              stepIndex={safeStep}
              totalSteps={steps.length}
              lang={lang}
              width={panelWidth}
              onWidthChange={setPanelWidth}
              isMobile={isMobile}
              isDone={completed.includes(activeId)}
              onToggleDone={toggleDone}
              codeLang={codeLang}
              onCodeLangChange={setCodeLang}
            />
          </div>
        ) : (
          <InfoPanel
            topic={activeTopic}
            step={step}
            stepIndex={safeStep}
            totalSteps={steps.length}
            lang={lang}
            width={panelWidth}
            onWidthChange={setPanelWidth}
            isMobile={isMobile}
            isDone={completed.includes(activeId)}
            onToggleDone={toggleDone}
            codeLang={codeLang}
            onCodeLangChange={setCodeLang}
          />
        )}
      </div>

      {isMobile && (
        <button className="mobile-panel-toggle" onClick={() => setMobilePanelOpen(true)}>
          <ChevronUp size={16} />
          <span className="mobile-panel-label">{lang === 'bn' ? 'বিবরণ ও কোড' : 'Details & code'}</span>
          <span className="mobile-panel-title">{t(step?.title, lang)}</span>
        </button>
      )}

      <ControlBar
        currentStep={safeStep}
        totalSteps={steps.length}
        isPlaying={isPlaying}
        speed={speed}
        lang={lang}
        onPrev={() => { stopPlay(); handlePrev(); }}
        onNext={() => { stopPlay(); handleNext(); }}
        onPlay={handlePlay}
        playReady={playPending}
        replayable={isPlayground}
        onPause={stopPlay}
        onReset={handleReset}
        onSpeedChange={setSpeed}
        isMobile={isMobile}
        isTraversal={isInteractiveTraversal}
        topTier={isBstPlayground ? (
          <BstToolbar
            tree={bstOutcome?.result ?? null}
            lastOp={bstRun.op}
            lang={lang}
            isMobile={isMobile}
            onDraftChange={onBstDraft}
            onPlay={handlePlay}
            error={bstError}
          />
        ) : isGraphPlayground ? (
          <GraphToolbar
            lastOp={graphRun.op}
            lang={lang}
            isMobile={isMobile}
            onDraftChange={onGraphDraft}
            onPlay={handlePlay}
            error={graphError}
          />
        ) : isTreePlayground ? (
          <TreeToolbar
            lastOp={treeRun.op}
            lang={lang}
            isMobile={isMobile}
            onDraftChange={onTreeDraft}
            onPlay={handlePlay}
            error={treeError}
          />
        ) : null}
        activeTraversal={activeTraversal}
        onSelectTraversal={(trav) => {
          stopPlay();
          setActiveTraversal(trav);
          setStepIndex(0);
        }}
        treeInput={treeInput}
        treeMode={treeMode}
        onApplyTree={({ input, mode }) => {
          stopPlay();
          setTreeInput(input);
          setTreeMode(mode);
          setStepIndex(0);
        }}
      />
    </div>
  );
}

export default App;
