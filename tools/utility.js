'use strict';

var _    = require('lodash');
var glob = require('glob');
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
  'COMMENT': 'C',

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

function parseHeader(content) {
  var headers,
      match = content.match(headerRegex);

  if (!match) {
    return null;
  }

  headers = _.compact(match[1].split('\n'));

  return _.foldl(headers, function(result, header) {
    var keyVal = header.trim().split(': '),
        key    = keyVal[0],
        value  = keyVal[1] || '';

    if(key !== 'Description' && key !== 'Language') {
      value = value.split(/\s*,\s*/);
    }

    result[key] = value;

    return result;
  }, {});
}

function filterByQualifiers(blob, languages, categories) {
  if(_.isEmpty(languages) && _.isEmpty(categories)) return true;

  var language         = path.basename(blob.name, '.js'),
      fileInfo         = parseHeader(blob.result),
      fileCategories   = fileInfo.Category || [],
      containsCategory = _.curry(_.contains)(categories);

  if(!fileInfo) return false;

  return _.contains(languages, language) ||
         _.any(fileCategories, containsCategory);
}

function buildFilterCallback(qualifiers) {
  var isCategory = _.matchesProperty(0, ':'),
      languages  = _.reject(qualifiers, isCategory),
      categories = _(qualifiers).filter(isCategory)
                                .map(function(c) {return c.slice(1);})
                                .value();

  return function(blob) {
    return filterByQualifiers(blob, languages, categories);
  };
}

function glob(pattern, encoding) {
  encoding = encoding || 'utf8';

  return { pattern: pattern, limit: 50, encoding: encoding };
}

function getStyleNames() {
  var stylesDir = 'src/styles/',
      options   = { ignore: stylesDir + 'default.css' },
      styles    = glob.sync(stylesDir + '*.css', options);

  return _.map(styles, function(style) {
    var basename = path.basename(style, '.css'),
        name     = _.startCase(basename),
        pathName = path.relative('src', style);

    return { path: pathName, name: name };
  });
}

module.exports = {
  buildFilterCallback: buildFilterCallback,
  getStyleNames: getStyleNames,
  glob: glob,
  parseHeader: parseHeader,
  regex: regex,
  replace: replace,
  replaceClassNames: replaceClassNames
};
