/*
Language: OMG IDL
Author: Brahim Djoudi <br.djoudi@gmail.com>
Category: protocols
*/

function(hljs) {

  var PREPROCESSOR =       {
    className: 'meta',
    begin: /#\s*[a-z]+\b/, end: /$/,
    keywords: {
      'meta-keyword':
        'if else elif endif define undef warning error line pragma ifdef ifndef include'
    },
    contains: [
      {
        begin: /\\\n/, relevance: 0
      },
      hljs.inherit(hljs.QUOTE_STRING_MODE, {className: 'meta-string'}),
      {
        className: 'meta-string',
        begin: /<[^\n>]*>/, end: /$/,
        illegal: '\\n',
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  var IDL_KEYWORDS = {
    keyword: 'any attribute boolean case char const context default double enum exception float in ' +
      'inout interface long module octet oneway out raises readonly sequence short string struct ' +
      'switch typedef unsigned union void ',
    built_in: 'Object',
    literal: 'TRUE FALSE'
  };

  var IDL_EXPRESSION = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.C_NUMBER_MODE,
    hljs.QUOTE_STRING_MODE,
    PREPROCESSOR,
    {
        className: 'class',
        beginKeywords: 'module interface struct union exception enum', end: /[{;:]/,
        contains: [ hljs.TITLE_MODE ]
    }
  ];

  return {
    aliases: ['idl'],
    case_insensitive: false,
    keywords: IDL_KEYWORDS,
    contains: IDL_EXPRESSION
  };
}
