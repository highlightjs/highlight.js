/*
Language: Turtle
Author: Mark Ellis <mark.ellis@stardog.com>
Category: common
*/

function(hljs) {
  var KEYWORDS = {
    meta: 'base|10 prefix|10 @base|10 @prefix|10',
    literal: 'true|0 false|0',
    built_in: 'a|0'
  };

  var VARIABLE = {
    className: 'type',
    begin: '\\?' + hljs.IDENT_RE + '|\\$' + hljs.IDENT_RE,
    relevance: 0,
  };

  var IRI_LITERAL = {
    className: 'literal',
    relevance: 0,
    begin: /</,
    end: />/,
  }

  var TRIPLE_APOS_STRING = {
    begin: /\'\'\'|"""/,
    end: /\'\'\'|"""/,
    className: 'string',
    relevance: 0,
  }

  var PNAME = {
    begin: '\\s*\\w*?:',
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        className: 'symbol',
        begin: '\\s*?|\\S',
        end: /:/,
        relevance: 0,
        starts: {
          endsWithParent: true,
          contains: [
            IRI_LITERAL,
            TRIPLE_APOS_STRING,
          ]
        }
      }
    ]
  };

  var APOS_STRING_LITERAL = JSON.parse(JSON.stringify(hljs.APOS_STRING_MODE));
  APOS_STRING_LITERAL.relevance = 0;

  var QUOTE_STRING_LITERAL = JSON.parse(JSON.stringify(hljs.QUOTE_STRING_MODE));
  QUOTE_STRING_LITERAL.relevance = 0;

  var NUMBER = JSON.parse(JSON.stringify(hljs.C_NUMBER_MODE));
  NUMBER.relevance = 0;

  return {
    case_insensitive: true,
    keywords: KEYWORDS,
    aliases: ['turtle'],
    contains: [
      PNAME,
      VARIABLE,
      IRI_LITERAL,
      TRIPLE_APOS_STRING, // order matters
      QUOTE_STRING_LITERAL,
      APOS_STRING_LITERAL,
      NUMBER,
      hljs.HASH_COMMENT_MODE,
    ],
    exports: {
      KEYWORDS: KEYWORDS,
      PNAME: PNAME,
      VARIABLE: VARIABLE,
      IRI_LITERAL: IRI_LITERAL,
      TRIPLE_APOS_STRING: TRIPLE_APOS_STRING,
      APOS_STRING_LITERAL: APOS_STRING_LITERAL,
      QUOTE_STRING_LITERAL: QUOTE_STRING_LITERAL,
      NUMBER: NUMBER,
    }
  };
}