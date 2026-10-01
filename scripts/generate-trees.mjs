import { writeFileSync } from 'node:fs';

// Helper to ensure identical line counts across all 5 code variants
function code5(lines) {
  return {
    pseudo: {
      en: lines.map(l => l.pseudo || l.en || ''),
      bn: lines.map(l => l.pseudoBn || l.bn || l.pseudo || '')
    },
    js: {
      en: lines.map(l => l.js || l.en || ''),
      bn: lines.map(l => l.jsBn || l.bn || l.js || '')
    },
    java: {
      en: lines.map(l => l.java || l.en || ''),
      bn: lines.map(l => l.javaBn || l.bn || l.java || '')
    },
    python: {
      en: lines.map(l => l.python || l.en || ''),
      bn: lines.map(l => l.pythonBn || l.bn || l.python || '')
    },
    cpp: {
      en: lines.map(l => l.cpp || l.en || ''),
      bn: lines.map(l => l.cppBn || l.bn || l.cpp || '')
    }
  };
}

console.log('Script initialized');
