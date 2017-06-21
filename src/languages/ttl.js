/*
Language: Turtle
Author: Mark Ellis <mark.ellis@stardog.com>
Category: common
*/

function(hljs) {
  var KEYWORDS = {
    meta: 'base|10 prefix|10 @base|10 @prefix|10',
    built_in: 'a',
    literal: 'true false',
  };

  var VARIABLE = {
    className: 'type',
    begin: '\\?' + hljs.IDENT_RE + '|\\$' + hljs.IDENT_RE, 
  };

  var IRI_LITERAL = {
    className: 'literal',
    begin: /</,
    end: />/,
  }

  var TRIPLE_APOS_STRING = {
    begin: /\'\'\'|"""/,
    end: /\'\'\'|"""/,
    className: 'string',
  }

  var PNAME = {
    begin: '\\s*\\w*?:',
    returnBegin: true,
    contains: [
      {
        className: 'symbol',
        begin: '\\s*?|\\S',
        end: /:/,
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

  return {
    case_insensitive: true,
    keywords: KEYWORDS,
    aliases: ['turtle'],
    contains: [
      PNAME,
      VARIABLE,
      IRI_LITERAL,
      TRIPLE_APOS_STRING, // order matters
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.C_NUMBER_MODE,
      hljs.HASH_COMMENT_MODE,
    ],
    exports: {
      KEYWORDS: KEYWORDS,
      PNAME: PNAME,
      VARIABLE: VARIABLE,
      IRI_LITERAL: IRI_LITERAL,
      TRIPLE_APOS_STRING: TRIPLE_APOS_STRING,
    }
  };
}