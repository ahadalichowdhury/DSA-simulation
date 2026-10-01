import { writeFileSync } from 'node:fs';

// Helper to make code object with matching line counts
function makeCode(lines) {
  const pseudoEn = lines.map(l => l.pseudo || l.en || '');
  const pseudoBn = lines.map(l => l.pseudoBn || l.bn || l.pseudo || '');
  const jsEn = lines.map(l => l.js || l.en || '');
  const jsBn = lines.map(l => l.jsBn || l.bn || l.js || '');
  const javaEn = lines.map(l => l.java || l.en || '');
  const javaBn = lines.map(l => l.javaBn || l.bn || l.java || '');
  const pythonEn = lines.map(l => l.python || l.en || '');
  const pythonBn = lines.map(l => l.pythonBn || l.bn || l.python || '');
  const cppEn = lines.map(l => l.cpp || l.en || '');
  const cppBn = lines.map(l => l.cppBn || l.bn || l.cpp || '');

  return {
    pseudo: { en: pseudoEn, bn: pseudoBn },
    js: { en: jsEn, bn: jsBn },
    java: { en: javaEn, bn: javaBn },
    python: { en: pythonEn, bn: pythonBn },
    cpp: { en: cppEn, bn: cppBn }
  };
}

console.log('Script template ready');
