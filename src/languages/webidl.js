/*
Language: WebIDL
Author: Brahim Djoudi <br.djoudi@gmail.com>
Category: protocols web
Description: Visit https://heycam.github.io/webidl
*/

function(hljs) {

  var KEYWORDS = {
    keyword: 'any attribute boolean callback const deleter dictionary double enum float getter ' +
      'implements inherit interface iterable legacycaller long maplike namespace object octet optional or partial ' +
      'readonly record required serializer sequence setlike setter short static string stringifier typedef unrestricted ' +
      'unsigned void ',
    built_in: 'ByteString DOMString USVString Promise FrozenArray Infinity NaN',
    literal: 'true false null'
  };

  var ANNOTATION = {
    className: 'meta', begin: '\\[', end: '\\]',
    contains: [
        hljs.inherit(hljs.QUOTE_STRING_MODE, {className: 'meta-string'})
    ]
  };

  var EXPRESSION = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.C_NUMBER_MODE,
    hljs.QUOTE_STRING_MODE,
    {
      beginKeywords: 'serializer', end: '\\['
    },
    ANNOTATION,
    {
        className: 'class',
        beginKeywords: 'namespace interface enum dictionary callback', end: /[{(;]/,
        contains: [ hljs.TITLE_MODE ]
    }
  ];

  return {
    aliases: ['webidl'],
    case_insensitive: false,
    keywords: KEYWORDS,
    contains: EXPRESSION
  };
}
