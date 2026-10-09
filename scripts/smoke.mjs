#!/usr/bin/env node
/**
 * Smoke test: renders EVERY lesson scene and info panel through React
 * (server-side) so a bad scene field cannot crash the browser app.
 *
 * Usage: node scripts/smoke.mjs
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

// minimal localStorage so client-only components can render on the server
const store = new Map();
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
  clear: () => store.clear()
};

// silence the harmless useLayoutEffect SSR notice
const realError = console.error.bind(console);
console.error = (...args) => {
  if (String(args[0]).includes('useLayoutEffect does nothing')) return;
  realError(...args);
};

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error'
});

let failures = 0;
const warn = (msg) => { failures++; console.log(`  ✗ ${msg}`); };

try {
  const { topics } = await server.ssrLoadModule('/src/data/topics/index.js');
  const Stage = (await server.ssrLoadModule('/src/visuals/Stage.jsx')).default;
  const InfoPanel = (await server.ssrLoadModule('/src/components/InfoPanel.jsx')).default;
  const Sidebar = (await server.ssrLoadModule('/src/components/Sidebar.jsx')).default;
  const ControlBar = (await server.ssrLoadModule('/src/components/ControlBar.jsx')).default;

  console.log(`topics: ${topics.length}`);

  const SCENE_KINDS = ['array', 'bars', 'linkedlist', 'stack', 'queue', 'tree', 'graph', 'hash', 'chart', 'none'];
  const kindsSeen = new Set();
  let scenes = 0;
  for (const topic of topics) {
    if (!topic.steps || topic.steps.length === 0) {
      warn(`${topic.id}: no steps`);
      continue;
    }
    topic.steps.forEach((step, i) => {
      const where = `${topic.id}.steps[${i}]`;
      if (step.scene?.kind) kindsSeen.add(step.scene.kind);
      // scene render (both languages are irrelevant for layout, but do both)
      for (const lang of ['en', 'bn']) {
        try {
          const html = renderToString(React.createElement(Stage, { scene: step.scene, stageKey: `${topic.id}-${i}-${lang}` }));
          scenes++;
          if (html.includes('undefined') || html.includes('[object Object]')) {
            warn(`${where} (${lang}): suspicious output ("undefined" / "[object Object]")`);
          }
        } catch (e) {
          warn(`${where} (${lang}) scene crashed: ${e.message}`);
        }
      }
      // info panel render
      for (const lang of ['en', 'bn']) {
        try {
          renderToString(
            React.createElement(InfoPanel, {
              topic, step, stepIndex: i, totalSteps: topic.steps.length,
              lang, width: 380, onWidthChange: () => {}, isMobile: false,
              isDone: false, onToggleDone: () => {}
            })
          );
        } catch (e) {
          warn(`${where} (${lang}) InfoPanel crashed: ${e.message}`);
        }
      }
      // bilingual completeness
      if (!step.title?.en || !step.title?.bn) warn(`${where}: title missing en/bn`);
      if (!step.explanation?.en || !step.explanation?.bn) warn(`${where}: explanation missing en/bn`);
      if (step.explanation?.en && step.explanation.en.length < 60) warn(`${where}: English explanation looks too short`);
      if (step.explanation?.bn && step.explanation.bn.length < 60) warn(`${where}: Bangla explanation looks too short`);
    });
  }

  // sidebar + control bar in both languages
  for (const lang of ['en', 'bn']) {
    try {
      renderToString(React.createElement(Sidebar, {
        topics, categoryOrder: topics.map((t) => t.categoryKey), activeId: topics[0].id,
        onSelect: () => {}, stepIndex: 0, totalSteps: 1, collapsed: false,
        onToggle: () => {}, lang, completed: []
      }));
      renderToString(React.createElement(ControlBar, {
        currentStep: 0, totalSteps: 5, isPlaying: false, speed: 1, lang,
        onPrev() {}, onNext() {}, onPlay() {}, onPause() {}, onReset() {}, onSpeedChange() {}, isMobile: false
      }));
    } catch (e) {
      warn(`chrome (${lang}) crashed: ${e.message}`);
    }
  }

  console.log(`rendered ${scenes} scene instances`);
  const missingKinds = SCENE_KINDS.filter((k) => !kindsSeen.has(k));
  if (missingKinds.length) console.log(`  (scene kinds never exercised: ${missingKinds.join(', ')})`);
  console.log(failures ? `\n${failures} problem(s) found` : '\nall scenes render OK');
} finally {
  await server.close();
}

process.exit(failures ? 1 : 0);
