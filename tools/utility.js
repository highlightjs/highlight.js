'use strict';

var _    = require('lodash');
var path = require('path');
var util = require('util');

var CATEGORIES, REPLACES,
    regex = {};

REPLACES = {
  'case_insensitive': 'cI',
  'lexemes': 'l',
  'contains': 'c',
  'keywords': 'k',
  'subLanguage': 'sL',
  'className': 'cN',
  'begin': 'b',
  'beginKeywords': 'bK',
  'end': 'e',
  'endsWithParent': 'eW',
  'illegal': 'i',
  'excludeBegin': 'eB',
  'excludeEnd': 'eE',
  'returnBegin': 'rB',
  'returnEnd': 'rE',
  'relevance': 'r',
  'variants': 'v',

  'IDENT_RE': 'IR',
  'UNDERSCORE_IDENT_RE': 'UIR',
  'NUMBER_RE': 'NR',
  'C_NUMBER_RE': 'CNR',
  'BINARY_NUMBER_RE': 'BNR',
  'RE_STARTERS_RE': 'RSR',
  'BACKSLASH_ESCAPE': 'BE',
  'APOS_STRING_MODE': 'ASM',
  'QUOTE_STRING_MODE': 'QSM',
  'PHRASAL_WORDS_MODE': 'PWM',
  'C_LINE_COMMENT_MODE': 'CLCM',
  'C_BLOCK_COMMENT_MODE': 'CBCM',
  'HASH_COMMENT_MODE': 'HCM',
  'NUMBER_MODE': 'NM',
  'C_NUMBER_MODE': 'CNM',
  'BINARY_NUMBER_MODE': 'BNM',
  'CSS_NUMBER_MODE': 'CSSNM',
  'REGEXP_MODE': 'RM',
  'TITLE_MODE': 'TM',
  'UNDERSCORE_TITLE_MODE': 'UTM',

  'beginRe': 'bR',
  'endRe': 'eR',
  'illegalRe': 'iR',
  'lexemesRe': 'lR',
  'terminators': 't',
  'terminator_end': 'tE',
};

CATEGORIES = {
  common: [
    'apache', 'nginx',
    'java', 'cs', 'cpp', 'objectivec',
    'ini', 'diff', 'bash', 'makefile',
    'sql', 'php', 'ruby', 'python', 'perl',
    'css', 'xml', 'javascript', 'coffeescript', 'http', 'json',
    'markdown',
  ],
};

function languagesGlob(languages, isNode) {
  if(languages[0] && _.head(languages)[0] === ':') {
    languages = _.head(languages);
    languages = CATEGORIES[languages.slice(1)];
  }

  var coreFile = path.join(dir.root, 'src', 'highlight.js'),
      template = isNode ? '%s' : '{' + coreFile + ',%s}',
      langGlob = '*';

  if(languages.length === 1) {
    langGlob = languages[0];
  } else if(languages.length > 1) {
    langGlob = '{' + languages.join(',') +'}';
  }

  langGlob = path.join(dir.root, 'src', 'languages', langGlob + '.js');

  return { pattern: util.format(template, langGlob) };
}

regex.replaces = new RegExp(
  '\\b(' + Object.keys(REPLACES).join('|') + ')\\b', 'g');

regex.classname = /(block|parentNode)\.cN/g;

regex.header = /^\s*(\/\*((.|\r?\n)*?)\*\/)?\s*/;

function replace(from, to) {
  return { regex: from, replace: to };
}

function replaceClassNames(match) {
  return REPLACES[match];
}

function copyDocs() {
  var input  = path.join(dir.root, 'docs', '*.rst'),
      output = path.join(dir.build, 'docs');

  return {
    logDocs: { task: ['log', 'Copying documentation.'] },
    readDocs: {
      requires: 'logDocs',
      task: ['glob', { pattern: input }]
    },
    writeDocsLog: {
      requires: 'readDocs',
      task: ['log', 'Writing documentation.']
    },
    writeDocs: { requires: 'writeDocsLog', task: ['dest', output] }
  };
}

module.exports = {
  copyDocs: copyDocs,
  languagesGlob: languagesGlob,
  regex: regex,
  replace: replace,
  replaceClassNames: replaceClassNames
};
