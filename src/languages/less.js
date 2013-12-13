/*
Language: LESS
Author: Calvin Juárez
*/

function(hljs) {
  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  var VARIABLE = {
    className: 'variable',
    begin: '@({)?[a-zA-Z0-9_-]*(})?'
  };
  var DEFAULT = {
    className: 'function',
    begin: '(escape|e|%|unit|color|data-uri|ceil|floor|percentage|round|sqrt|abs|sin|asin|cos|acos|tan|atan|pi|pow|mod|convert|unit|' +
      'rgb|rgba|argb|hsl|hsla|hsv|hsva|hue|saturation|lightness|hsvhue|hsvsaturation|hsvvalue|red|green|blue|alpha|luma|' +
      'saturate|desaturate|lighten|darken|fadein|fadeout|fade|spin|mix|tint|shade|greyscale|contrast|multiply|' +
      'iscolor|isnumber|isstring|iskeyword|isurl|ispixel|ispercentage|isem|isunit)\\(', end: '\\)',
    lexemes: '[a-z-\\%]+',
    keywords: 'escape e % unit color data-uri ceil floor percentage round sqrt abs sin asin cos acos tan atan pi pow mod convert unit ' +
      'rgb rgba argb hsl hsla hsv hsva hue saturation lightness hsvhue hsvsaturation hsvvalue red green blue alpha luma ' +
      'saturate desaturate lighten darken fadein fadeout fade spin mix tint shade greyscale contrast multiply ' +
      'iscolor isnumber isstring iskeyword isurl ispixel ispercentage isem isunit',
    contains: ['self', VARIABLE, hljs.NUMBER_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
  };
  var FUNCTION = {
    className: 'function',
    begin: IDENT_RE + '\\(', end: '\\)',
    contains: ['self', VARIABLE, hljs.NUMBER_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
  };
  var MIXIN = {
    className: 'mixin',
    begin: '(\\.|\\#)' + IDENT_RE + '\\.*\\(', end: '\\)',
    relevance: 0,
    contains: [
      'self',
      VARIABLE,
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };
  return {
    case_insensitive: true,
    keywords: 'when and not',
    illegal: '[=/|\']',
    contains: [
      hljs.NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      {
        className: 'string',
        begin: '~(\'|")', end: '(\'|")'
      },
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE,
      DEFAULT,
      FUNCTION,
      VARIABLE,
      MIXIN,
      {
        className: 'id', begin: '\\#[A-Za-z0-9_-]+',
        relevance: 0
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
        className: 'pseudo',
        begin: ':(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\"\\\']+'
      },
      {
        className: 'at_rule',
        begin: '@(font-face|page)',
        lexemes: '[a-z-]+',
        keywords: 'font-face page'
      },
/*
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
*/
      {
        className: 'tag', begin: IDENT_RE,
        relevance: 0
      },
/*
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
