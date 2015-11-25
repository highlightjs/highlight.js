/*
Language: Handlebars
Requires: xml.js
Author: Michael Johnston <lastobelus@gmail.com>
Description: Matcher for HTMLBars
Category: template
*/

function(hljs) {
  var BUILT_INS = 'action collection component concat debugger each each-in else get hash if input link-to loc log mut outlet partial query-params render textarea unbound unless with yield view';
  var EXPRESSION_KEYWORDS = 'as';
  var BUILT_IN_HELPERS = {
    beginKeywords: BUILT_INS,
    keywords: {built_in: BUILT_INS}
  };
  var ATTR_ASSIGNMENT = {
    illegal: /\}\}/,
    begin: /[a-zA-Z0-9_]+=/,
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        className: 'attr', begin: /[a-zA-Z0-9_]+/
      }
    ]
  };
  var SUB_EXPR = {
    illegal: /\}\}/,
    begin: /\)/, end: /\)/,
    contains: [
      {
        begin: /[a-zA-Z\.\-]+/,
        keywords: {built_in: BUILT_INS},
        starts: {
          endsWithParent: true, relevance: 0,
          contains: [
            hljs.QUOTE_STRING_MODE,
            VARIABLE
          ]
        }
      }
    ]
  };

  var VARIABLE = {
    className: 'variable', begin: /[a-zA-Z_][a-zA-Z_0-9\.]+/,
    illegal: /\}\}/,
    keywords: {keyword: EXPRESSION_KEYWORDS, built_in: BUILT_INS}
  };

  var TAG_INNARDS = {
    endsWithParent: true, relevance: 0,
    contains: [
      hljs.QUOTE_STRING_MODE,
      BUILT_IN_HELPERS,
      ATTR_ASSIGNMENT,
      hljs.NUMBER_MODE,
      VARIABLE,
    ]
  };

  return {
    aliases: ['hbs', 'html.hbs', 'html.handlebars'],
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT('{{!(--)?', '(--)?}}'),
      {
        className: 'template-tag',
        begin: /\{\{[#\/]/, end: /\}\}/,
        contains: [
          {
            className: 'name',
            begin: /[a-zA-Z\.\-]+/,
            keywords: {built_in: BUILT_INS},
            starts: TAG_INNARDS
          }
        ]
      },
      {
        className: 'template-yield',
        begin: /\{\{yield/, end: /\}\}/,
        returnBegin: true,
        contains: [
          {
            beginKeywords: 'yield',
            keywords: {built_in: 'yield'},
            starts: {
              endsWithParent: true, relevance: 0,
              contains: [
                hljs.QUOTE_STRING_MODE,
                VARIABLE
              ]
            }
          }
        ]
      },
      {
        className: 'template-tag',
        begin: /\{\{[a-zA-Z][a-zA-Z\-]+/, end: /\}\}/,
        returnBegin: true,
        contains: [
          {
            className: 'name',
            begin: /[a-zA-Z]+[\-][a-zA-Z.\-]+/,
            starts: TAG_INNARDS
          },
          {
            beginKeywords: BUILT_INS,
            keywords: {built_in: BUILT_INS},
            starts: TAG_INNARDS
          },
          VARIABLE
        ]
      }
    ]
  };
}