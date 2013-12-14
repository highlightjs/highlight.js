/*
Language: LESS
Author: Calvin Juárez
*/

function(hljs) {
  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  
  var css = {} // things LESS should inherit from CSS
  
  var less = {} // LESS things
    className: 'variable',
    begin: '@({)?[a-zA-Z0-9_-]*(})?'
    lexemes: '[a-z-\\%]+',
  var FUNCTION = {
    className: 'function',
    contains: ['self', VARIABLE, hljs.NUMBER_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
  };
  var MIXIN = {
    className: 'mixin',
    begin: '(\\.|\\#)' + IDENT_RE + '\\.*\\(', end: '\\)',
    relevance: 0,
    contains: [
      'self',
      LESS,
      FUNCTION,
      VARIABLE,
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };
  var AT_RULE = {
    className: 'at_rule',
    begins: '@(charset|font-face|import|keyframes|media|namespace|page|region|supports|viewport)',
    lexemes: '[a-z-]+',
    keywords: 'charset font-face import keyframes media namespace page region supports viewport'
  }
  return {
    case_insensitive: true,
    illegal: '[=/|\']',
    contains: [
      hljs.NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      {
        className: 'string',
        begin: '~(\'|")', end: '(\'|")'
      },
      
      {
      },
      {
      },
      {
      },
      {
      },
      {
        className: 'pseudo',
        begin: '(&)?:(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\"\\\']+'
      },
/*
      {
        className: 'at_rule',
        begin: '@(font-face|page)',
        lexemes: '[a-z-]+',
        keywords: 'font-face page'
      },
      {
        className: 'at_rule',
        begin: '@', end: '[{;]', // at_rule eating first "{" is a good thing
                                 // because it doesn’t let it to be parsed as
                                 // a rule set but instead drops parser into
                                 // the default mode which is how it should be.
        contains: [
          {
            className: 'keyword',
            begin: /\S+/
          },
          {
            begin: /\s/, endsWithParent: true, excludeEnd: true,
            relevance: 0,
            contains: [
              FUNCTION,
              hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE,
              hljs.NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: 'rules',
        begin: '{', end: '}',
        illegal: '[^\\s]',
        relevance: 0,
        contains: [
          hljs.C_BLOCK_COMMENT_MODE,
          {
            className: 'rule',
            begin: '[^\\s]', returnBegin: true, end: ';', endsWithParent: true,
            contains: [
              {
                className: 'attribute',
                begin: '[A-Z\\_\\.\\-]+', end: ':',
                excludeEnd: true,
                illegal: '[^\\s]',
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
                      className: 'hexcolor', begin: '#[0-9A-Fa-f]+'
                    },
                    {
                      className: 'important', begin: '!important'
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
*/
    ]
  };
}
