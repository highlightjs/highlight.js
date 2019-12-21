'use strict';

let regex       = {};

const REPLACES = {
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
  'terminator_end': 'tE'
};

regex.replaces = new RegExp(
  `(?:([\\w\\d]+)\\.(${Object.keys(REPLACES).filter(r => r.toUpperCase() === r).join('|')})\\s*=(?!=)|\\b(${Object.keys(REPLACES).join('|')})\\b)`, 'g');

regex.apiReplacesFrom = /\bvar\s*API_REPLACES\b/;
regex.apiReplacesTo = `var API_REPLACES = ${JSON.stringify(REPLACES)}`;

function replaceClassNames(match, gDeclObj, gDeclKey) {
  if(gDeclObj)
    return replaceAndSaveClassNames(gDeclObj, gDeclKey);
  else
    return REPLACES[match];
}

function replaceAndSaveClassNames(obj, key) {
  return `${obj}.${REPLACES[key]} = ${obj}.${key} =`;
}

module.exports = {
  regex: regex,
  replaceClassNames: replaceClassNames,
  REPLACES: REPLACES
};
