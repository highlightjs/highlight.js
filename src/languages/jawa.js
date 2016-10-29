/*
 Language: Jawa
 Author: Fengguo (Hugo) Wei <fgwei521@gmail.com>
 Description: Highlight support for Jawa Language.
 */

function(hljs) {
  var ANNOTATION = { className: 'meta', begin: '@owner|@type|@classDescriptor|@signature|@kind|@AccessFlag', relevance: 10 };

  var KEYWORDS =
    'record extends global procedure call throw if then goto switch else return monitorenter monitorexit new Exception constclass ' +
    'length instanceof null catch fcmpl fcmpg dcmpl dcmpg lcmp ';

  var JAWA_NUMBER_RE = '\\b\\d+(\\.\\d+)?' + '[iIlLfFdD]?';
  var JAWA_NUMBER_MODE = {
    className: 'number',
    begin: JAWA_NUMBER_RE,
    relevance: 0
  };

  var STRING = {
    className: 'string',
    variants: [
      {
        begin: '"', end: '"',
        illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
  };

  var SYMBOL = {
    className: 'symbol',
    begin: ':='
  };

  var LOC_NAME = {
    className: 'comment',
    begin: '\#L[0-9]*\.',
    relevance: 10
  };

  var TYPE = {
    className: 'type',
    begin: '`[^`@]+`',
    relevance: 0
  }

  var RECORD = {
    className: 'class',
    beginKeywords: 'record',
    end: '}',
    excludeEnd: true,
    contains: [
      {
        beginKeywords: 'extends',
        relevance: 10
      },
      TYPE,
      ANNOTATION
    ]
  };

  var GLOBAL = {
    className: 'function',
    beginKeywords: 'global',
    relevance: 10,
    end: ';',
    excludeEnd: true,
    contains: [
      TYPE,
      ANNOTATION
    ]
  };

  var PROCEDURE = {
    className: 'function',
    beginKeywords: 'procedure',
    end: '{',
    excludeEnd: true,
    contains: [
      TYPE,
      ANNOTATION
    ]
  };

  return {
    keywords: KEYWORDS,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      STRING,
      LOC_NAME,
      TYPE,
      SYMBOL,
      PROCEDURE,
      GLOBAL,
      RECORD,
      JAWA_NUMBER_MODE,
      ANNOTATION
    ]
  };
}
