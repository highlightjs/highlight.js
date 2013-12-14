/*
Language: LESS
Author: Calvin Juárez
*/

function(hljs) {
  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  
  var css = {} // things LESS should inherit from CSS
  css.HEX_COLOR = {
    className: 'hexcolor', begin: /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/, relevance: 2
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
      keyword: 'charset font-face import|10 keyframes media|10 namespace page region supports viewport',
      operator: 'and not'
    },
    contains: [
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      { // this is an "everything after the first space" rule
        begin: /\s/, endsWithParent: true, excludeEnd: true,
        //keywords: 'reference inline',
        contains: [
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.NUMBER_MODE,
          css.FUNCTION
        ]
      }
    ]
  }
  css.selector = {
    ID: {
      className: 'id', begin: '\\b\\#[A-Za-z0-9_-]+\\b', end: '[,{]',
      excludeEnd: true,
      relevance: 2,
    },
    CLASS: {
      className: 'class', begin: '\\b\\.[A-Za-z0-9_-]+\\b', end: '[,{]',
      excludeEnd: true,
      relevance: 2,
    },
    ATTRIBUTE: {
      className: 'attr_selector',
      begin: '\\[', end: '\\]',
      illegal: '$',
      relevance: 2,
    },
    PSEUDO: {
      className: 'pseudo',
      begin: '(&)?:(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\"\\\']+',
      relevance: 2,
      
    },
    TAG: {
      className: 'tag', begin: '\\b' + IDENT_RE + '\\b', end: '[,{]',
      excludeEnd: true,
      relevance: 2,
    }
  }
  
  var less = {} // LESS things
  less.VARIABLE = {
    className: 'variable',
    begin: '@({)?[a-zA-Z0-9_-]*(})?',
    relevance: 10
  }
  less.EXTEND = {
    className: 'pseudo',
    begin: /(&)?:extend\(/, end: /\)/,
    relevance: 10,
    contains: [
      css.selector.ID,
      css.selector.CLASS,
      css.selector.ATTRIBUTE,
      css.selector.PSEUDO,
      //css.selector.TAG
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
      'mix|10 tint shade greyscale contrast multiply ' +
      'iscolor|10 isnumber isstring iskeyword isurl ispixel ispercentage isem isunit', // type
    },
    relevance: 2,
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
  
  css.FUNCTION.contains.push(less.VARIABLE)
  
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
        begin: '(when|and|not)',
        relevance: 0
      },
      
      { // less string escape syntax
        className: 'string',
        begin: '~(\'|")', end: '(\'|")',
        relevance: 5
      },
      
      css.selector.ID,
      css.selector.CLASS,
      css.selector.ATTRIBUTE,
      css.selector.PSEUDO,
      //css.selector.TAG, // causes some trouble at the moment
    ]
  };
}
