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
    ]
  }
  less.MIX_IN = {
    begin: /[.#]{1}[a-zA-Z-][a-zA-Z0-9_-]*\s*\(/, end: /\)/,
    returnBegin: true,
    relevance: 10,
    contains: [
      {
        className: 'mixin',
        begin: /[.#]{1}[a-zA-Z-][a-zA-Z0-9_-]*/,
        contains: [
          less.VARIABLE,
          less.FUNCTION,
          css.FUNCTION,
        ]
      },
      less.VARIABLE,
      less.FUNCTION,
      css.FUNCTION
    ]
  }
  return {
    case_insensitive: true,
    keywords: {
      keyword:
        'when and not',
      literal:
        'true false null undefined NaN Infinity'
    },
    illegal: '[=/|\']',
    contains: [
      hljs.NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE,
      
      less.FUNCTION,
      
      css.HEX_COLOR,
      css.FUNCTION,
      css.AT_RULE,
      
      less.VARIABLE,
      less.EXTEND,
      less.MIX_IN,
      
      {
        className: 'operator',
        begin: '(when|and|not)'
      },
      
      { // less string escape syntax
        className: 'string',
        begin: '~(\'|")', end: '(\'|")'
      },
      
      {
        className: 'property',
        begin: /[A-Za-z0-9-_]+/, end: ':',
        excludeEnd: true,
        starts: {
          className: 'value',
          begin: /./, end: ';',
          excludeEnd: true,
          contains: [
            hljs.NUMBER_MODE,
            hljs.QUOTE_STRING_MODE,
            hljs.APOS_STRING_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            less.FUNCTION,
            css.FUNCTION,
          ]
        }
      },
      
      {
        className: 'id', begin: '\\#[A-Za-z0-9_-]+', end: '[,{]',
        excludeEnd: true,
        relevance: 0,
        contains: [less.VARIABLE]
      },
      {
        className: 'class', begin: '\\.[A-Za-z0-9_-]+', end: '[,{]',
        excludeEnd: true,
        relevance: 0,
        contains: [less.VARIABLE]
      },
      {
        className: 'attr_selector',
        begin: '\\[', end: '\\]',
        illegal: '$',
        contains: [less.VARIABLE]
      },
      {
        className: 'pseudo',
        begin: '(&)?:(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\"\\\']+'
      },
      {
        className: 'tag', begin: IDENT_RE, end: '[,{]',
        excludeEnd: true,
        relevance: 0,
        contains: [less.VARIABLE]
      }
    ]
  };
}
