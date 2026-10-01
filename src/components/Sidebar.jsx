import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen, Layers, Search, ChevronDown, ChevronRight,
  PanelLeftClose, PanelLeftOpen, CheckCircle2, Binary
} from 'lucide-react';
import { t } from '../visuals/utils.js';

const categoryIcons = {
  trees: Binary
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

  const total = topics.length;
  const done = completed.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const renderItem = (s) => {
    const isActive = activeId === s.id;
    const isDone = completed.includes(s.id);
    return (
      <button key={s.id} className={`sidebar-item ${isActive ? 'active' : ''}`} onClick={() => onSelect(s.id)}>
        <div className="sidebar-item-num">{String(s.order).padStart(2, '0')}</div>
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
                  {group.items.map((s) => renderItem(s))}
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
