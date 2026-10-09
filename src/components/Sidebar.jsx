import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen, Layers, Search, ChevronDown, ChevronRight,
  PanelLeftClose, PanelLeftOpen, CheckCircle2, Binary, Network
} from 'lucide-react';
import { t } from '../visuals/utils.js';

const categoryIcons = {
  trees: Binary,
  graphs: Network
};

const Sidebar = ({
  topics,
  activeId,
  onSelect,
  stepIndex,
  totalSteps,
  collapsed,
  onToggle,
  lang,
  completed,
  categoryOrder
}) => {
  const listRef = useRef(null);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(() => {
    try {
      const saved = localStorage.getItem('algosim-sidebar-expanded');
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  useEffect(() => {
    if (expanded) localStorage.setItem('algosim-sidebar-expanded', JSON.stringify(expanded));
  }, [expanded]);

  // Sub-topics (Tree Basics, Traversals, BST …): only the one you are studying starts open.
  const activeGroup = topics.find((tp) => tp.id === activeId)?.subgroup?.key;
  const [openGroups, setOpenGroups] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('algosim-sidebar-groups') || 'null');
      if (Array.isArray(saved)) return saved;
    } catch {}
    return [];
  });
  useEffect(() => {
    if (activeGroup) setOpenGroups((g) => (g.includes(activeGroup) ? g : [...g, activeGroup]));
  }, [activeGroup]);
  useEffect(() => {
    try { localStorage.setItem('algosim-sidebar-groups', JSON.stringify(openGroups)); } catch {}
  }, [openGroups]);
  const toggleGroup = (key) => setOpenGroups((g) => (g.includes(key) ? g.filter((k) => k !== key) : [...g, key]));

  // Group topics by category (flat list per category, no nested subtopics)
  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const map = new Map();
    for (const topic of topics) {
      if (q) {
        const hay = `${t(topic.name, 'en')} ${t(topic.name, lang)} ${t(topic.description, lang)} ${topic.id}`.toLowerCase();
        if (!hay.includes(q)) continue;
      }
      const key = topic.categoryKey || 'trees';
      if (!map.has(key)) map.set(key, { key, label: topic.category, icon: topic.categoryIcon, level: topic.level, items: [] });
      map.get(key).items.push(topic);
    }
    const order = categoryOrder || [];
    return [...map.values()].sort((a, b) => {
      const ia = order.indexOf(a.key);
      const ib = order.indexOf(b.key);
      return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
    });
  }, [topics, query, lang, categoryOrder]);

  const isOpen = (key) => (expanded && expanded[key] !== undefined ? expanded[key] : true);
  const toggle = (key) => setExpanded((prev) => ({ ...(prev || {}), [key]: !isOpen(key) }));

  useEffect(() => {
    if (!listRef.current) return;
    const timer = setTimeout(() => {
      const el = listRef.current.querySelector('.sidebar-item.active');
      if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 120);
    return () => clearTimeout(timer);
  }, [activeId]);

  /** Split a category's lessons into its sub-topics, numbered 1, 2, 3 … within that chapter. */
  const subgroupsOf = (items) => {
    const out = [];
    for (const s of items) {
      const key = s.subgroup?.key ?? null;
      let g = out.find((x) => (x.info?.key ?? null) === key);
      if (!g) {
        g = { info: s.subgroup || null, number: (s.subgroupIndex ?? -1) + 1, items: [] };
        out.push(g);
      }
      g.items.push(s);
    }
    return out;
  };

  const total = topics.length;
  const done = completed.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const renderItem = (s, num) => {
    const isActive = activeId === s.id;
    const isDone = completed.includes(s.id);
    return (
      <button key={s.id} className={`sidebar-item ${isActive ? 'active' : ''}`} onClick={() => onSelect(s.id)}>
        <div className="sidebar-item-num">{num ?? String(s.order).padStart(2, '0')}</div>
        <div className="sidebar-item-content">
          <div className="sidebar-item-name">
            {t(s.name, lang)}
            {isDone && <CheckCircle2 size={13} className="sidebar-item-done" />}
          </div>
        </div>
      </button>
    );
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <>
            <BookOpen size={16} style={{ color: 'var(--cyan)' }} />
            <span>Lessons</span>
          </>
        )}
        <button className="sidebar-toggle" onClick={onToggle} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      {!collapsed && (
        <>
          <div className="sidebar-search">
            <Search size={14} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'টপিক খুঁজুন…' : 'Search topics…'}
            />
          </div>
          <div className="sidebar-progress" title={`${done}/${total}`}>
            <div className="sidebar-progress-top">
              <span>{lang === 'bn' ? 'অগ্রগতি' : 'Progress'}</span>
              <b>{done}/{total}</b>
            </div>
            <div className="sidebar-progress-track">
              <div className="sidebar-progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </>
      )}

      <div className="sidebar-list" ref={listRef}>
        {grouped.length === 0 && <div className="sidebar-empty">No lesson matches “{query}”.</div>}
        {grouped.map((group) => {
          const CatIcon = categoryIcons[group.key] || Layers;
          const open = isOpen(group.key);
          return (
            <div key={group.key} className="sidebar-category">
              <button className="sidebar-category-header" onClick={() => toggle(group.key)} title={collapsed ? t(group.label, lang) : undefined}>
                {!collapsed ? (
                  <>
                    <span className="sidebar-category-icon">{open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
                    <CatIcon size={14} style={{ color: 'var(--cyan)', flexShrink: 0 }} />
                    <span className="sidebar-category-name">{t(group.label, lang)}</span>
                    <span className="sidebar-category-count">{group.items.length}</span>
                  </>
                ) : (
                  <CatIcon size={16} style={{ color: 'var(--cyan)' }} />
                )}
              </button>

              {open && !collapsed && (
                <div className="sidebar-category-items">
                  {subgroupsOf(group.items).map((sg, gi) => {
                    if (!sg.info) return sg.items.map((s) => renderItem(s));
                    const searching = query.trim().length > 0;
                    const gOpen = searching || openGroups.includes(sg.info.key);
                    const gDone = sg.items.filter((s) => completed.includes(s.id)).length;
                    const hasActive = sg.items.some((s) => s.id === activeId);
                    const allDone = gDone === sg.items.length;
                    return (
                      <div key={sg.info.key} className={`sidebar-subgroup${hasActive ? ' has-active' : ''}${allDone ? ' all-done' : ''}`}>
                        <button className="sidebar-subgroup-header" onClick={() => toggleGroup(sg.info.key)} aria-expanded={gOpen}>
                          <span className="sidebar-subgroup-badge">{allDone ? '✓' : sg.number}</span>
                          <span className="sidebar-subgroup-text">
                            <span className="sidebar-subgroup-name">{t(sg.info.label, lang)}</span>
                            {sg.info.desc && <span className="sidebar-subgroup-desc">{t(sg.info.desc, lang)}</span>}
                            <span className="sidebar-subgroup-meta">
                              <span className="sidebar-subgroup-bar"><i style={{ width: `${(gDone / sg.items.length) * 100}%` }} /></span>
                              <span className="sidebar-subgroup-count">{gDone}/{sg.items.length}</span>
                            </span>
                          </span>
                          <span className="sidebar-subgroup-caret">{gOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
                        </button>
                        {gOpen && (
                          <div className="sidebar-subgroup-items">
                            {sg.items.map((s, i) => renderItem(s, `${sg.number}.${i + 1}`))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
