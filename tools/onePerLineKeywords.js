#!/usr/bin/env node
/**
 * Expand `keywords: { keyword: ... }` into a bare one-per-line array
 * when that is the only scope (default `keyword`). Usage:
 *   node tools/onePerLineKeywords.js src/languages/cpp.js
 */
const fs = require("fs");

const file = process.argv[2];
if (!file) {
  console.error("usage: node tools/onePerLineKeywords.js <grammar.js>");
  process.exit(1);
}

const src = fs.readFileSync(file, "utf8");
const re = /keywords:\s*\{\s*keyword:\s*(?:((?:'[^']*'\s*\+\s*)*'[^']*')|\[([^\]]*)\])\s*\}/g;

let count = 0;
const out = src.replace(re, (_m, strings, listBody) => {
  count += 1;
  const raw = strings || listBody;
  const words = [...raw.matchAll(/'([^']*)'/g)]
    .map((x) => x[1])
    .join(" ")
    .trim()
    .split(/\s+/);
  const items = words.map((w) => `      '${w}'`).join(",\n");
  return `keywords: [\n${items}\n    ]`;
});

if (count === 0) {
  console.error(`no single-scope keyword lists found in ${file}`);
  process.exit(1);
}

fs.writeFileSync(file, out);
console.error(`expanded ${count} keyword list(s) in ${file}`);
