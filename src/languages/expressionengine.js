/*
Language: ExpressionEngine
Requires: xml.js
Author: Jordan Ellis <jordan.ellis@ellislab.com>
Description: ExpressionEngine CMS template language
Category: template
*/

function(hljs) {

  var ATTR_ASSIGNMENT = {
    illegal: /\}/,
    begin: /[a-zA-Z0-9_]+=/,
    returnBegin: true,
    relevance: 0,
    contains: [{
      className: 'attr',
      begin: /[a-zA-Z0-9_]+/
    }]
  }

  return {
    aliases: ['eecms', 'ee'],
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT('{!--', '--}'),
      {
        className: 'template-tag',
        begin: /{\/?/,
        end: /}/,
        contains: [
          {
            className: 'name',
            begin: /[a-zA-Z][a-zA-Z:\.\-_0-9]+/,
            lexemes: '[a-zA-Z][a-zA-Z0-9_:]*',
            relevance: 0,
            keywords: {
              keyword: 'if if:else if:elseif',
            },
            starts: {
              endsWithParent: true,
              relevance: 0,
              keywords: {
                keyword: 'and or xor',
                literal: 'false true null'
              },
              contains: [
                hljs.QUOTE_STRING_MODE,
                hljs.APOS_STRING_MODE,
                ATTR_ASSIGNMENT,
                hljs.NUMBER_MODE
              ]
            }
          }
        ]
      },
    ]
  }
}
