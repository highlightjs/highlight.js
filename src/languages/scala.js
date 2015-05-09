/*
Language: Scala
Category: functional
Author: Jan Berkel <jan.berkel@gmail.com>
Contributors: Erik Osheim <d_m@plastic-idolatry.com>
*/

function(hljs) {

  var ANNOTATION = { className: 'meta', begin: '@[A-Za-z]+' };

  // used in strings for escaping/interpolation/substitution
  var ESCAPES = { className: 'subst', begin: '\\\\.', relevance: 0 };
  var INTERP = { className: 'subst', begin: '\\$[A-Za-z0-9_]+' };
  var SUBST = { className: 'subst', begin: '\\${', end: '}' };

  // STRING 1 and 3 support only traditional escapes

  var STRING1 = {
    className: 'string',
    begin: '"', end: '"',
    illegal: '\\n',
    contains: [ESCAPES]
  };

  var STRING3 = {
    className: 'string',
    begin: '"""', end: '"""',
    relevance: 10
  };

  // ISTRING 1 and 3 support interpolation/substitution
  // most commonly seen in s"balance: $amt"

  var ISTRING1 = {
    className: 'string',
    begin: '[a-z]+"', end: '"',
    illegal: '\\n',
    contains: [ESCAPES, INTERP, SUBST]
  };

  var ISTRING3 = {
    className: 'string',
    begin: '[a-z]+"""', end: '"""',
    contains: [INTERP, SUBST],
    relevance: 10
  };

  var SYMBOL = {
    className: 'name',
    begin: '\'\\w[\\w\\d_]*(?!\')'
  };

  var TYPE = {
    className: 'type',
    begin: '\\b[A-Z][A-Za-z0-9_]*',
    relevance: 0
  };

  var NAME = {
    className: 'title',
    begin: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
    relevance: 0
  };

  var CLASS = {
    className: 'class',
    beginKeywords: 'class object trait type',
    end: /[:={\[(\n;]/,
    contains: [{className: 'keyword', beginKeywords: 'extends with', relevance: 10}, NAME]
  };

  var METHOD = {
    className: 'function',
    beginKeywords: 'def val',
    end: /[:={\[(\n;]/,
    contains: [NAME]
  };

  return {
    keywords: {
      literal: 'true false null',
      keyword: 'type yield lazy override def with val var sealed abstract private trait object if forSome for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      ISTRING3,
      ISTRING1,
      STRING3,
      STRING1,
      SYMBOL,
      TYPE,
      METHOD,
      CLASS,
      hljs.C_NUMBER_MODE,
      ANNOTATION
    ]
  };
}
