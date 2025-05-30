#!/usr/bin/env node
'use strict';

const fs = require('fs');
const hljs = require('../build/lib/index.js');
const path = require('path');
const utility = require('../test/utility.js');
const Table = require('cli-table');
const { red, grey, green, yellow } = require('ansis');

const resultTable = new Table({
  head: ['expected', 'actual', 'score', '2nd best', 'score', 'info'],
  colWidths: [20, 20, 10, 20, 10, 20],
  style: {
    head: ['grey']
  }
});

function testAutoDetection(language, index, languages) {
  const languagePath = utility.buildPath('detect', language);
  return fs.readdirSync(languagePath)
    .map(function(example) {
      const filename = path.join(languagePath, example);
      return fs.readFileSync(filename, 'utf-8');
    })
    .forEach(function(content) {
      const expected = language;
      const actual = hljs.highlightAuto(content);
      if (actual.language !== expected && actual.secondBest.language !== expected) {
        return resultTable.push([
          expected,
          red(actual.language),
          actual.relevance ? actual.relevance : grey('None'),
          red(actual.secondBest.language),
          actual.secondBest.relevance ? actual.secondBest.relevance : grey('None')
        ]);
      }
      if (actual.language !== expected) {
        return resultTable.push([
          expected,
          yellow(actual.language),
          actual.relevance ? actual.relevance : grey('None'),
          yellow(actual.secondBest.language),
          actual.secondBest.relevance ? actual.secondBest.relevance : grey('None')
        ]);
      }
      // equal relevance is flagged
      if (actual.relevance === actual.secondBest.relevance) {
        return resultTable.push([
          expected,
          actual.language,
          actual.relevance ? yellow(actual.relevance) : grey('None'),
          actual.secondBest.language,
          actual.secondBest.relevance ? yellow(actual.secondBest.relevance) : grey('None'),
          "Relevance match."
        ]);
      }
    });
}

let languages = null;
if (process.env.ONLY_LANGUAGES) {
  languages = process.env.ONLY_LANGUAGES.split(" ");
} else {
  languages = hljs.listLanguages().filter(hljs.autoDetection);
}

console.log('Checking auto-highlighting for ' + grey(languages.length) + ' languages...');
languages.forEach((lang, index) => {
  if (index % 60 === 0) { console.log(""); }
  testAutoDetection(lang);
  process.stdout.write(".");
});
console.log("\n");

if (resultTable.length === 0) {
  console.log(green('SUCCESS') + ' - ' + green(languages.length) + ' of ' + grey(languages.length) + ' languages passed auto-highlight check!');
} else {
  console.log(
    red('ISSUES') + ' - ' + red(resultTable.length) + ' of ' + grey(languages.length) + ' languages have potential issues.'
    + '\n'
    + resultTable.toString());
}
