#!/usr/bin/env node
/**
 * Expand `keywords: { keyword: ... }` into a bare one-per-line array
 * when that is the only scope (default `keyword`). Usage:
 *   node tools/onePerLineKeywords.js src/languages/cpp.js
 */
const fs = require("fs");
const path = require("path");

const file = process.argv[2];
if (!file) {
  console.error("usage: node tools/onePerLineKeywords.js <grammar.js>");
  process.exit(1);
}

const resolvedFile = path.resolve(file);
const cwd = process.cwd();
if (!resolvedFile.startsWith(cwd + path.sep) && resolvedFile !== cwd) {
  console.error("error: file path must be within the current working directory");
  process.exit(1);
}

const src = fs.readFileSync(resolvedFile, "utf8");
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

fs.writeFileSync(resolvedFile, out);
console.error(`expanded ${count} keyword list(s) in ${file}`);
