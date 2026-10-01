import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Sun, Moon, Menu, X, ChevronUp, Globe } from 'lucide-react';
import Sidebar from './components/Sidebar';
import InfoPanel from './components/InfoPanel';
import ControlBar from './components/ControlBar';
import Stage from './visuals/Stage';
import { topics, categoryOrder } from './data/topics/index.js';
import { TRAVERSAL_CONFIGS } from './data/topics/traversalData.js';
import { buildTree, generateTraversalSteps } from './visuals/traversalGenerator.js';
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
  completed: 'algosim-completed'
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
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const playTimerRef = useRef(null);

  // Interactive traversal state
  const [activeTraversal, setActiveTraversal] = useState('inorder');
  const [treeInput, setTreeInput] = useState('50, 30, 70, 20, 40, 60, 80');
  const [treeMode, setTreeMode] = useState('bst');

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

  const traversalSteps = useMemo(() => {
    if (!isInteractiveTraversal) return null;
    const root = buildTree(treeInput, treeMode);
    const travName = activeTraversal === 'inorder' ? 'In-Order' : activeTraversal === 'preorder' ? 'Pre-Order' : activeTraversal === 'postorder' ? 'Post-Order' : 'BFS Level-Order';
    const label = `${travName} Traversal (${treeMode.toUpperCase()})`;
    return generateTraversalSteps(root, activeTraversal, label);
  }, [isInteractiveTraversal, activeTraversal, treeInput, treeMode]);

  const activeTopic = isInteractiveTraversal && traversalTopic ? traversalTopic : standardTopic;
  const steps = isInteractiveTraversal && traversalSteps ? traversalSteps : (standardTopic?.steps || []);
  const safeStep = Math.min(stepIndex, Math.max(0, steps.length - 1));
  const step = steps[safeStep];

  /* ---------- effects ---------- */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
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
    const interval = 2800 / speed;
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
  }, [isPlaying, speed, steps.length]);

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') { e.preventDefault(); stopPlay(); handleNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); stopPlay(); handlePrev(); }
      else if (e.key === ' ') { e.preventDefault(); isPlaying ? stopPlay() : setIsPlaying(true); }
      else if (e.key === 'r' || e.key === 'R') { handleReset(); }
      else if (e.key === 't' || e.key === 'T') { toggleTheme(); }
      else if (e.key === 'l' || e.key === 'L') { toggleLang(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPlaying, handleNext, handlePrev, handleReset, stopPlay]);

  const toggleDone = useCallback(() => {
    setCompleted((prev) => (prev.includes(activeId) ? prev.filter((x) => x !== activeId) : [...prev, activeId]));
  }, [activeId]);

  const subtitleText = lang === 'bn'
    ? 'ডেটা স্ট্রাকচার ও অ্যালগরিদম — নবী থেকে প্রো'
    : 'Data Structures &amp; Algorithms — Noob to Pro';

  return (
    <div className={`app ${isMobile ? 'is-mobile' : ''}`}>
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
            stageKey={isInteractiveTraversal ? `${activeId}-${activeTraversal}-${treeInput}-${treeMode}` : activeId}
            step={step}
            lang={lang}
          />

          {isMobile && (
            <button className="mobile-panel-toggle" onClick={() => setMobilePanelOpen((o) => !o)}>
              {mobilePanelOpen ? <X size={16} /> : <ChevronUp size={16} />}
              <span>{t(step?.title, lang) || 'Details'}</span>
            </button>
          )}
        </div>

        {isMobile ? (
          <div className={`bottom-sheet ${mobilePanelOpen ? 'open' : ''}`}>
            <InfoPanel
              topic={activeTopic}
              step={step}
              stepIndex={safeStep}
              totalSteps={steps.length}
              lang={lang}
              width={panelWidth}
              onWidthChange={setPanelWidth}
              isMobile
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
            isMobile={false}
            isDone={completed.includes(activeId)}
            onToggleDone={toggleDone}
            codeLang={codeLang}
            onCodeLangChange={setCodeLang}
          />
        )}
      </div>

      <ControlBar
        currentStep={safeStep}
        totalSteps={steps.length}
        isPlaying={isPlaying}
        speed={speed}
        lang={lang}
        onPrev={() => { stopPlay(); handlePrev(); }}
        onNext={() => { stopPlay(); handleNext(); }}
        onPlay={() => setIsPlaying(true)}
        onPause={stopPlay}
        onReset={handleReset}
        onSpeedChange={setSpeed}
        isMobile={isMobile}
        isTraversal={isInteractiveTraversal}
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
