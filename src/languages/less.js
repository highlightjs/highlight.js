/*
Language: LESS
Author: Calvin Juárez
*/

function(hljs) {
  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  
  var css = {} // things LESS should inherit from CSS
  css.HEX_COLOR = {
    className: 'hexcolor', begin: /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/ 
  }
  css.FUNCTION = {
    className: 'function',
    begin: IDENT_RE + '\\(', end: '\\)',
    contains: [
      'self',
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  }
  css.AT_RULE = {
    className: 'at_rule',
    begin: /@(charset|font-face|import|keyframes|media|namespace|page|region|supports|viewport)/, end: '[{;]',
    lexemes: '[a-z-()]+',
    keywords: {
      keyword: 'charset font-face import keyframes media namespace page region supports viewport',
      operator: 'and not'
    },
    contains: [
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      { // this is an "everything after the first space" rule
        begin: /\s/, endsWithParent: true, excludeEnd: true,
        contains: [
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.NUMBER_MODE,
          css.FUNCTION
        ]
      }
    ]
  }
  
  var less = {} // LESS things
  less.VARIABLE = {
    className: 'variable',
    begin: '@({)?[a-zA-Z0-9_-]*(})?'
  }
  less.EXTEND = {
    className: 'pseudo',
    begin: '(&)?:extend\\(', end: '\\)',
    contains: [
      {
        className: 'id', begin: '\\#[A-Za-z0-9_-]+',
        relevance: 0
      },
      {
        className: 'class', begin: '\\.[A-Za-z0-9_-]+',
        relevance: 0
      },
      {
        className: 'tag', begin: IDENT_RE,
        relevance: 0
      }
    ]
  }
  less.MIX_IN = {
    className: 'mixin',
    begin: /[.#]{1}[a-zA-Z-][a-zA-Z0-9_-]*/, end: /\(/,
    excludeEnd: true,
    contains: [
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      less.VARIABLE,
      {
        begin: /\s/, endsWithParent: true, excludeEnd: true,
        excludeEnd: true
      }
    ],
    starts: {
      className: 'params',
      begin: /\(/, end: /\)/,
      endsWithParent: true,  excludeEnd: true,
      contains: [
        hljs.NUMBER_MODE,
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        less.VARIABLE
      ]
    }
  }
  less.FUNCTION = {
    begin: '(escape|e|%|unit|color|data-uri|' +
      'ceil|floor|percentage|round|sqrt|abs|sin|asin|cos|acos|tan|atan|pi|pow|mod|convert|unit|' + // math
      'rgb|rgba|argb|hsl|hsla|hsv|hsva|hue|saturation|lightness|hsvhue|hsvsaturation|hsvvalue|' + // color
      'red|green|blue|alpha|luma|saturate|desaturate|lighten|darken|fadein|fadeout|fade|spin|' +
      'mix|tint|shade|greyscale|contrast|multiply|' +
      'iscolor|isnumber|isstring|iskeyword|isurl|ispixel|ispercentage|isem|isunit)\\(', end: '\\)', // type
    lexemes: '[a-z-\\%]+',
    keywords: {
      built_in: 'escape e % unit color data-uri ' + // math
      'ceil floor percentage round sqrt abs sin asin cos acos tan atan pi pow mod convert unit ' + // color
      'rgb rgba argb hsl hsla hsv hsva hue saturation lightness hsvhue hsvsaturation hsvvalue ' +
      'red green blue alpha luma saturate desaturate lighten darken fadein fadeout fade spin ' +
      'mix tint shade greyscale contrast multiply ' +
      'iscolor isnumber isstring iskeyword isurl ispixel ispercentage isem isunit', // type
    },
    contains: [
      'self',
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      less.VARIABLE,
      {
        className: 'params',
        begin: /\(/, end: /\)/,
        endsWithParent: true, /* excludeEnd: true, */
        contains: [
          hljs.NUMBER_MODE,
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          less.VARIABLE
        ]
      }
    ],
/*
    starts: {
      className: 'params',
      begin: /./, end: /\)/,
      endsWithParent: true, excludeEnd: true,
      contains: [
        hljs.NUMBER_MODE,
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        less.VARIABLE
      ]
    }
*/
  }
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
