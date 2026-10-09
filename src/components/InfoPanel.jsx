import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { marked } from 'marked';
import {
  CheckCircle2, BadgeCheck, Timer, MemoryStick, ListChecks, Code2,
  Sparkles, TrendingUp, Copy, Check
} from 'lucide-react';
import { t } from '../visuals/utils.js';

marked.setOptions({ breaks: true, gfm: true });

const FONT_SIZES = [12, 13, 14, 15, 16, 18, 20, 22];
const FONT_SIZE_LABELS = { 12: 'XS', 13: 'S', 14: 'M', 15: 'ML', 16: 'L', 18: 'XL', 20: '2XL', 22: '3XL' };
const MIN_WIDTH = 300;
const MAX_WIDTH = 720;

// Code language choices — the reader's preference, saved in localStorage.
export const CODE_LANGS = [
  { key: 'pseudo', short: 'PS', label: 'Pseudocode', bn: 'প্সিউডোকোড' },
  { key: 'js', short: 'JS', label: 'JavaScript', bn: 'জাভাস্ক্রিপ্ট' },
  { key: 'java', short: 'Java', label: 'Java', bn: 'জাভা' },
  { key: 'python', short: 'Py', label: 'Python', bn: 'পাইথন' },
  { key: 'cpp', short: 'C++', label: 'C++', bn: 'সি++' }
];

const LEVEL_STYLE = {
  beginner: 'level-beginner',
  intermediate: 'level-intermediate',
  advanced: 'level-advanced'
};
const LEVEL_TEXT = {
  beginner: { en: 'Beginner', bn: 'শুরু' },
  intermediate: { en: 'Intermediate', bn: 'মাঝারি' },
  advanced: { en: 'Advanced', bn: 'উন্নত' }
};

/**
 * Tokenize and syntax-highlight code lines cleanly.
 */
function highlightCode(line) {
  if (!line || !line.trim()) {
    return <span className="code-empty">&nbsp;</span>;
  }

  const leadingMatch = line.match(/^\s*/);
  const leadingSpaces = leadingMatch ? leadingMatch[0] : '';
  const trimmed = line.slice(leadingSpaces.length);

  // Full-line comment
  if (trimmed.startsWith('//') || trimmed.startsWith('#')) {
    return (
      <>
        <span>{leadingSpaces}</span>
        <span className="tok-comment">{trimmed}</span>
      </>
    );
  }

  // Split code and trailing comment
  let codePart = trimmed;
  let commentPart = null;
  const commentIdx = trimmed.search(/(\/\/|#)/);
  if (commentIdx !== -1) {
    codePart = trimmed.slice(0, commentIdx);
    commentPart = trimmed.slice(commentIdx);
  }

  const tokenRegex = /(".*?"|'.*?'|\b(?:function|def|class|return|if|else|while|for|in|void|const|let|var|new|null|None|true|false|True|False|end|not|and|or)\b|\b(?:TreeNode|Node|Queue|LinkedList|ArrayDeque|List|int|boolean|bool|deque)\b|\b(?:visit|print|console|log|System|out|cout|push|pop|shift|poll|add|append|popleft|inOrder|preOrder|postOrder|levelOrder)\b|\b\d+\b|[a-zA-Z_$][a-zA-Z0-9_$]*|[^\s\w]+|\s+)/g;

  const tokens = [];
  let match;
  let key = 0;

  while ((match = tokenRegex.exec(codePart)) !== null) {
    const tok = match[0];
    if (/^(".*?"|'.*?')$/.test(tok)) {
      tokens.push(<span key={key++} className="tok-string">{tok}</span>);
    } else if (/^\b(?:function|def|class|return|if|else|while|for|in|void|const|let|var|new|null|None|true|false|True|False|end|not|and|or)\b$/.test(tok)) {
      tokens.push(<span key={key++} className="tok-keyword">{tok}</span>);
    } else if (/^\b(?:TreeNode|Node|Queue|LinkedList|ArrayDeque|List|int|boolean|bool|deque)\b$/.test(tok)) {
      tokens.push(<span key={key++} className="tok-type">{tok}</span>);
    } else if (/^\b(?:visit|print|console|log|System|out|cout|push|pop|shift|poll|add|append|popleft|inOrder|preOrder|postOrder|levelOrder)\b$/.test(tok)) {
      tokens.push(<span key={key++} className="tok-fn">{tok}</span>);
    } else if (/^\d+$/.test(tok)) {
      tokens.push(<span key={key++} className="tok-num">{tok}</span>);
    } else {
      tokens.push(tok);
    }
  }

  return (
    <>
      <span>{leadingSpaces}</span>
      {tokens}
      {commentPart && <span className="tok-comment">{commentPart}</span>}
    </>
  );
}

const InfoPanel = ({
  topic,
  step,
  stepIndex,
  totalSteps,
  lang,
  width,
  onWidthChange,
  isMobile,
  isDone,
  onToggleDone,
  codeLang = 'pseudo',
  onCodeLangChange
}) => {
  const [fontSizeIdx, setFontSizeIdx] = useState(() => {
    try {
      const saved = localStorage.getItem('algosim-font-size');
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });
  const [isResizing, setIsResizing] = useState(false);
  const [copied, setCopied] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  useEffect(() => {
    try { localStorage.setItem('algosim-font-size', fontSizeIdx); } catch {}
  }, [fontSizeIdx]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
  }, [width]);

  useEffect(() => {
    if (!isResizing) return;
    const move = (e) => {
      const delta = startXRef.current - e.clientX;
      onWidthChange(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidthRef.current + delta)));
    };
    const up = () => setIsResizing(false);
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, onWidthChange]);

  const html = useMemo(() => {
    const raw = t(step?.explanation, lang);
    if (!raw) return '';
    try {
      return marked.parse(raw);
    } catch {
      return raw;
    }
  }, [step, lang]);

  // code can be the legacy {en,bn} pseudocode or the 5-variant {pseudo,js,java,python,cpp}
  const codeVariant =
    topic?.code && (topic.code.pseudo || topic.code.js || topic.code.java || topic.code.python || topic.code.cpp)
      ? (topic.code[codeLang] || topic.code.pseudo)
      : topic?.code;
  const code = codeVariant ? (codeVariant[lang] || codeVariant.en) : null;
  // A step's line can be a number, or a name (e.g. 'copy') that the topic's
  // lineMap turns into this language's line numbers — used when languages differ in length.
  const shownLang = topic?.code?.[codeLang] ? codeLang : 'pseudo';
  const activeLines = (step?.line == null ? [] : Array.isArray(step.line) ? step.line : [step.line]).flatMap((l) =>
    typeof l === 'string' ? (topic?.lineMap?.[shownLang]?.[l] ?? []) : [l]
  );
  // keep the running line in view inside the code box (traced code jumps around)
  const codeBlockRef = useRef(null);
  const activeKey = activeLines.join(',');
  useEffect(() => {
    const box = codeBlockRef.current;
    if (!box || !activeKey) return;
    const el = box.querySelector('.code-line.active');
    if (!el) return;
    const top = el.offsetTop; // .code-block.traced is position:relative
    if (top < box.scrollTop + 20 || top > box.scrollTop + box.clientHeight - 40) {
      const target = Math.max(0, top - box.clientHeight / 3);
      // small moves glide; a jump into another function lands at once
      box.scrollTo({ top: target, behavior: Math.abs(target - box.scrollTop) > box.clientHeight ? 'auto' : 'smooth' });
    }
  }, [activeKey, codeLang, lang, topic, step]);
  const cx = topic?.complexity;
  const state = step?.state && Object.keys(step.state).length ? step.state : null;

  const handleCopyCode = useCallback(() => {
    if (!code || !code.length) return;
    const fullText = code.join('\n');
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  if (!topic || !step) return null;

  const fontSize = FONT_SIZES[fontSizeIdx];
  const label = FONT_SIZE_LABELS[fontSize] || fontSize;

  return (
    <div className="info-panel" style={{ width: isMobile ? '100%' : `${width}px` }}>
      {!isMobile && (
        <div className="resize-handle" onMouseDown={handleMouseDown} title="Drag to resize">
          <div className="resize-handle-dots" />
        </div>
      )}

      <div className="info-header">
        <h3>
          <span style={{ fontSize: 18 }}>{topic.icon}</span>
          {t(topic.name, lang)}
        </h3>
        <p>
          {topic.level && (
            <span className={`info-level ${LEVEL_STYLE[topic.level]}`}>
              {t(LEVEL_TEXT[topic.level], lang)}
            </span>
          )}{' '}
          {t(topic.description, lang)}
        </p>
      </div>

      <div className="info-controls">
        <label>{lang === 'bn' ? 'লেখার আকার' : 'Text Size'}</label>
        <button className="font-size-btn" onClick={() => setFontSizeIdx((i) => Math.max(0, i - 1))} disabled={fontSizeIdx === 0} title="Smaller text">A−</button>
        <span className="font-size-value">{label}</span>
        <button className="font-size-btn" onClick={() => setFontSizeIdx((i) => Math.min(FONT_SIZES.length - 1, i + 1))} disabled={fontSizeIdx === FONT_SIZES.length - 1} title="Bigger text">A+</button>

        <button className={`complete-btn ${isDone ? 'done' : ''}`} onClick={onToggleDone}>
          {isDone ? <BadgeCheck size={14} /> : <CheckCircle2 size={14} />}
          {isDone
            ? (lang === 'bn' ? 'শেষ হয়েছে' : 'Completed')
            : (lang === 'bn' ? 'শেষ করা হয়েছে মার্ক করুন' : 'Mark complete')}
        </button>
      </div>

      <div className="info-body">
        <div className="info-step-title">
          <span className="info-step-num">{stepIndex + 1}/{totalSteps}</span>
          <span>{t(step.title, lang) || (lang === 'bn' ? 'ধাপ' : 'Step')}</span>
        </div>

        <div className="info-explanation" style={{ fontSize: `${fontSize}px` }} dangerouslySetInnerHTML={{ __html: html }} />

        {code && code.length > 0 && (
          <div className="info-section">
            <div className="code-head">
              <div className="code-head-left">
                <h4><Code2 size={13} /> {lang === 'bn' ? 'কোড' : 'Code'}</h4>
                <button
                  className={`code-copy-btn ${copied ? 'copied' : ''}`}
                  onClick={handleCopyCode}
                  title={lang === 'bn' ? 'কোড কপি করুন' : 'Copy code to clipboard'}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied!') : (lang === 'bn' ? 'কপি' : 'Copy')}</span>
                </button>
              </div>

              <div className="code-lang-picker" role="tablist" aria-label={lang === 'bn' ? 'কোডের ভাষা' : 'Code language'}>
                {CODE_LANGS.map((cl) => (
                  <button
                    key={cl.key}
                    role="tab"
                    aria-selected={codeLang === cl.key}
                    className={`code-lang-btn${codeLang === cl.key ? ' active' : ''}`}
                    onClick={() => onCodeLangChange && onCodeLangChange(cl.key)}
                    title={lang === 'bn' ? cl.bn : cl.label}
                  >
                    {cl.short}
                  </button>
                ))}
              </div>
            </div>

            <div className={`code-block${topic?.lineMap ? ' traced' : ''}`} ref={codeBlockRef}>
              <div className="code-container">
                {code.map((line, i) => (
                  <div
                    key={i}
                    className={`code-line ${activeLines.includes(i) ? 'active' : !topic?.lineMap && activeLines.length && i < Math.min(...activeLines) ? 'done' : ''}`}
                  >
                    <span className="ln">{i + 1}</span>
                    <span className="code-text">{highlightCode(line)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {cx && (
          <div className="info-section">
            <h4><Sparkles size={13} /> {lang === 'bn' ? 'জটিলতা (Complexity)' : 'Complexity'}</h4>
            <div className="cx-badges">
              {cx.time && (
                <span className="cx-badge"><span className="cx-ico"><Timer size={14} /></span>
                  {lang === 'bn' ? 'সময়' : 'Time'} <b>{cx.time}</b>
                </span>
              )}
              {cx.best && (
                <span className="cx-badge"><span className="cx-ico"><TrendingUp size={14} /></span>
                  {lang === 'bn' ? 'সেরা' : 'Best'} <b>{cx.best}</b>
                </span>
              )}
              {cx.worst && (
                <span className="cx-badge"><span className="cx-ico"><TrendingUp size={14} /></span>
                  {lang === 'bn' ? 'সবচেয়ে খারাপ' : 'Worst'} <b>{cx.worst}</b>
                </span>
              )}
              {cx.space && (
                <span className="cx-badge"><span className="cx-ico"><MemoryStick size={14} /></span>
                  {lang === 'bn' ? 'স্পেস' : 'Space'} <b>{cx.space}</b>
                </span>
              )}
            </div>
            {cx.note && <div className="arr-note" style={{ marginTop: 9 }} dangerouslySetInnerHTML={{ __html: t(cx.note, lang) }} />}
          </div>
        )}

        {state && (
          <div className="info-section">
            <h4><ListChecks size={13} /> {lang === 'bn' ? 'ভেরিয়েবল অবস্থা' : 'Variables'}</h4>
            <table className="state-table">
              <tbody>
                {Object.entries(state).map(([k, v]) => (
                  <tr key={k}>
                    <td>{k}</td>
                    <td className={`v ${v && v.changed ? 'changed' : ''}`}>
                      {typeof v === 'object' && v !== null ? (Array.isArray(v) ? `[${v.join(', ')}]` : String(v.val ?? v.value ?? '')) : String(v)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;
