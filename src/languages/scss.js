/*
Language: SCSS
Author: Kurt Emch <kurt@kurtemch.com>
Description: SCSS syntax highlighting
*/
function(hljs) {
  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  var FUNCTION = {
    className: 'function',
    begin: IDENT_RE + '\\(', end: '\\)',
    contains: ['self', hljs.NUMBER_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
  };
  return {
    case_insensitive: true,
    keywords:
      'mixin include for from else if function',   
    contains: [ {
      className: 'id', begin: '\\#[A-Za-z0-9_-]+'
    },
    {
      className: 'class', begin: '\\.[A-Za-z0-9_-]+',
      relevance: 0
    },    
    {
      className: 'attr_selector',
      begin: '\\[', end: '\\]',
      illegal: '$'
    },    
    {
      className: 'at_rule',
      begin: '@(mixin|include)',
      keywords: 'mixin include',
      relevance: 10
    },
    {
      className: 'at_rule',
      begin: '@(font-face|page)',
      lexems: '[a-z-]+',
      keywords: 'font-face page'
    },
    {
      className: 'at_rule',
      begin: '@', end: '[{;]',
      excludeEnd: true,
      keywords: 'import page media charset',
      contains: [
        FUNCTION,
        hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.NUMBER_MODE
      ]
    },
    {
      className: 'variable', begin: '\\$[A-Za-z0-9_-]+',
      relevance: 10
    },
    {
      className: 'tag', begin: IDENT_RE,
      relevance: 0
    },
    {
      className: 'a', begin: '{', end: '}',
      relevance: 0,
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        {
          className: 'rule',
          begin: '[^\\s]', returnBegin: true, end: ';', endsWithParent: true,
          contains: [
            {
              className: 'attribute',
              begin: '[A-Z\\_\\.\\-]+', end: ':',
              excludeEnd: true,
              starts: {
                className: 'value',
                endsWithParent: true, excludeEnd: true,
                contains: [
                  FUNCTION,
                  hljs.NUMBER_MODE,
                  hljs.QUOTE_STRING_MODE,
                  hljs.APOS_STRING_MODE,
                  hljs.C_BLOCK_COMMENT_MODE,
                  {
                    className: 'hexcolor', begin: '\\#[0-9A-F]+'
                  },
                  {
                    className: 'important', begin: '!important'
                  }
                ]
              }
            }
          ]
        },
        { // E4X
            begin: '[\\.\\@\\#\\$]', end: '}',
            subLanguage: 'css'
          }
      ]
    },
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE
    ]
  };
}