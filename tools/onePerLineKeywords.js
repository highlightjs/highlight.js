#!/usr/bin/env node
/**
 * Expand space-separated `keywords: { keyword: 'a b' + 'c' }` strings
 * into one-keyword-per-line arrays. Usage:
 *   node tools/onePerLineKeywords.js src/languages/cpp.js
 */
const fs = require("fs");

const file = process.argv[2];
if (!file) {
  console.error("usage: node tools/onePerLineKeywords.js <grammar.js>");
  process.exit(1);
}

const src = fs.readFileSync(file, "utf8");
const re = /keywords:\s*\{\s*keyword:\s*((?:'[^']*'\s*\+\s*)*'[^']*')\s*\}/g;

let count = 0;
const out = src.replace(re, (_m, strings) => {
  count += 1;
  const words = [...strings.matchAll(/'([^']*)'/g)]
    .map((x) => x[1])
    .join(" ")
    .trim()
    .split(/\s+/);
  const items = words.map((w) => `        '${w}'`).join(",\n");
  return `keywords: {\n      keyword: [\n${items}\n      ]\n    }`;
});

if (count === 0) {
  console.error(`no concatenated keyword strings found in ${file}`);
  process.exit(1);
}

fs.writeFileSync(file, out);
console.error(`expanded ${count} keyword list(s) in ${file}`);
