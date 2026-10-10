import React, { useEffect, useState } from 'react';
import { t } from '../visuals/utils.js';

/**
 * One floating tooltip for the whole app. Any element with
 * `data-term="u"` (or "u = k" for two names on one vertex) shows the
 * meaning of that name in the current lesson when hovered, focused or
 * tapped. It is fixed to the viewport, so scroll boxes cannot clip it.
 */
export default function TermTooltip({ terms, lang }) {
  const [tip, setTip] = useState(null);

  useEffect(() => {
    const find = (e) => (e.target && e.target.closest ? e.target.closest('[data-term]') : null);
    const show = (el) => {
      const names = el.getAttribute('data-term').split(/\s*=\s*/).filter((n) => terms[n]);
      if (!names.length) return setTip(null);
      const r = el.getBoundingClientRect();
      setTip({ x: r.left + r.width / 2, top: r.top, bottom: r.bottom, names });
    };
    const over = (e) => { const el = find(e); if (el) show(el); };
    const out = (e) => { const el = find(e); if (el && !el.contains(e.relatedTarget)) setTip(null); };
    // a tap on a phone shows it; a tap anywhere else hides it
    const click = (e) => { const el = find(e); if (el) show(el); else setTip(null); };
    const hide = () => setTip(null);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    document.addEventListener('focusin', over);
    document.addEventListener('focusout', hide);
    document.addEventListener('click', click, true);
    window.addEventListener('scroll', hide, true);
    return () => {
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      document.removeEventListener('focusin', over);
      document.removeEventListener('focusout', hide);
      document.removeEventListener('click', click, true);
      window.removeEventListener('scroll', hide, true);
    };
  }, [terms]);

  if (!tip) return null;
  const below = tip.top < 110; // no room above → show it under the word
  const x = Math.min(Math.max(tip.x, 140), window.innerWidth - 140);
  return (
    <div
      className={`term-tip${below ? ' below' : ''}`}
      role="tooltip"
      style={{ left: x, top: below ? tip.bottom + 8 : tip.top - 8 }}
    >
      {tip.names.map((n) => (
        <div key={n} className="term-tip-row">
          <b>{n}</b>
          <span>{t(terms[n], lang)}</span>
        </div>
      ))}
    </div>
  );
}
