'use strict';

let fs       = require('fs')
let hljs     = require('../build');
let path     = require('path');
let utility  = require('../test/utility');
let Table    = require('cli-table');
let colors   = require('colors/safe');

let resultTable = new Table({
  head: ['expected', 'actual', 'score', '2nd best', 'score','info'],
  colWidths: [20,20,10,20,10,20],
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
      const expected = language,
            actual   = hljs.highlightAuto(content);
      if (actual.language !== expected && actual.second_best.language !== expected) {
        return resultTable.push([
          expected,
          colors.red(actual.language),
          actual.relevance ? actual.relevance : colors.grey('None'),
          colors.red(actual.second_best.language),
          actual.second_best.relevance ? actual.second_best.relevance : colors.grey('None')
        ]);
      }
      if (actual.language !== expected) {
        return resultTable.push([
          expected,
          colors.yellow(actual.language),
          actual.relevance ? actual.relevance : colors.grey('None'),
          colors.yellow(actual.second_best.language),
          actual.second_best.relevance ? actual.second_best.relevance : colors.grey('None')
        ]);
      }
      // equal relevance is flagged
      if (actual.relevance == actual.second_best.relevance) {
        return resultTable.push([
          expected,
          actual.language,
          actual.relevance ? colors.yellow(actual.relevance) : colors.grey('None'),
          actual.second_best.language,
          actual.second_best.relevance ? colors.yellow(actual.second_best.relevance) : colors.grey('None'),
          "Relevance match."
        ]);
      }
    });
}

const languages = hljs.listLanguages()
  .filter(hljs.autoDetection);

console.log('Checking auto-highlighting for ' + colors.grey(languages.length) + ' languages...');
languages.forEach((lang, index) => {
  if (index%60===0) { console.log("") }
  testAutoDetection(lang)
  process.stdout.write(".");
});
console.log("\n")

if (resultTable.length === 0) {
  console.log(colors.green('SUCCESS') + ' - ' + colors.green(languages.length) + ' of ' + colors.gray(languages.length) + ' languages passed auto-highlight check!')
} else {
  console.log(
    colors.red('ISSUES') + ' - ' + colors.red(resultTable.length) + ' of ' + colors.gray(languages.length) + ' languages have potential issues.' +
    '\n' +
    resultTable.toString());
}


