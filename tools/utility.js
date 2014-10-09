'use strict';

var _    = require('lodash');
var path = require('path');

var REPLACES,
    regex       = {},
    headerRegex = /^\s*\/\*((.|\r?\n)*?)\*/;

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

function parseHeader(header) {
  var object  = {},
      headers = header.split('\n');

  _(headers)
    .compact()
    .each(function(h) {
      var keyVal = h.trim().split(': '),
          key    = keyVal[0],
          value  = (keyVal[1] || "").split(/\s*,\s*/);

      object[key] = value;
    });

  return object;
}

function filterByQualifiers(blob, languages, categories) {
  if(_.isEmpty(languages) && _.isEmpty(categories)) return true;

  var language = path.basename(blob.name, '.js'),
      fileInfo,
      fileCategories,
      match = blob.result.match(headerRegex);

  if(!match) return false;
  fileInfo       = parseHeader(match[1]);
  fileCategories = fileInfo.Category ? fileInfo.Category : [];

  return _.contains(languages, language) ||
         _.any(fileCategories, function(fc) {return _.contains(categories, fc)});
}

function buildFilterCallback(qualifiers) {

  function isCategory(qualifier) {return qualifier[0] === ':'}

  var languages  = _.reject(qualifiers, isCategory),
      categories = _(qualifiers).filter(isCategory)
                                .map(function(c) {return c.slice(1);})
                                .value();

  return function(blob) {
    var basename = path.basename(blob.name);
    return filterByQualifiers(blob, languages, categories) ||
           basename === 'highlight.js';
  };
}

module.exports = {
  buildFilterCallback: buildFilterCallback,
  parseHeader: parseHeader,
  regex: regex,
  replace: replace,
  replaceClassNames: replaceClassNames
};
