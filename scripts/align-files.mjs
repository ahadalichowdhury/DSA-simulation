import fs from 'node:fs';

const files = [
  'src/data/topics/bst-ops.js',
  'src/data/topics/avl.js',
  'src/data/topics/tree-traversals.js',
  'src/data/topics/multiway.js',
  'src/data/topics/trees.js'
];

function formatCodeObj(c) {
  const lines = ['{\n'];
  const langs = ['pseudo', 'js', 'java', 'python', 'cpp'];
  for (const l of langs) {
    lines.push(`      ${l}: {\n`);
    for (const k of ['en', 'bn']) {
      lines.push(`        ${k}: [\n`);
      const arr = c[l][k];
      arr.forEach((line, i) => {
        const comma = i === arr.length - 1 ? '' : ',';
        lines.push(`          ${JSON.stringify(line)}${comma}\n`);
      });
      const kComma = k === 'bn' ? '' : ',';
      lines.push(`        ]${kComma}\n`);
    }
    const lComma = l === 'cpp' ? '' : ',';
    lines.push(`      }${lComma}\n`);
  }
  lines.push('    }');
  return lines.join('');
}

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  const mod = await import('../' + filePath);
  const topics = Object.values(mod)[0];

  for (const topic of topics) {
    const c = topic.code;
    const maxStepLine = Math.max(...topic.steps.map(s => s.line ?? -1));
    const langs = ['pseudo', 'js', 'java', 'python', 'cpp'];
    const allLengths = langs.flatMap(l => [c[l]?.en?.length || 0, c[l]?.bn?.length || 0]);
    const targetLen = Math.max(maxStepLine + 1, ...allLengths);

    // Pad each language array if needed
    for (const l of langs) {
      for (const k of ['en', 'bn']) {
        const arr = c[l][k];
        while (arr.length < targetLen) {
          arr.push('');
        }
      }
    }

    const formatted = formatCodeObj(c);
    const idNeedle = `id: '${topic.id}'`;
    const idIdx = content.indexOf(idNeedle);
    const codeIdx = content.indexOf('code: {', idIdx);
    const stepsIdx = content.indexOf('steps: [', codeIdx);

    const beforeCode = content.slice(0, codeIdx);
    const afterSteps = content.slice(stepsIdx);

    content = beforeCode + 'code: ' + formatted + ',\n    ' + afterSteps;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Aligned ${filePath}`);
}
