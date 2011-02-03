/*
Language: CSS
Requires:  html-xml.js
*/

hljs.LANGUAGES.css = {
  defaultMode: {
    contains: ['at_rule', 'id', 'class', 'attr_selector', 'pseudo', 'rules', 'comment'],
    keywords: hljs.HTML_TAGS,
    lexems: hljs.IDENT_RE,
    illegal: '='
  },
  case_insensitive: true,
  modes: [
    {
      className: 'at_rule',
      begin: '@', end: '[{;]',
      excludeEnd: true,
      lexems: hljs.IDENT_RE,
      keywords: {'import': 1, 'page': 1, 'media': 1, 'charset': 1, 'font-face': 1},
      contains: ['function', 'string', 'number', 'pseudo']
    },
    {
      className: 'id',
      begin: '\\#[A-Za-z0-9_-]+'
    },
    {
      className: 'class',
      begin: '\\.[A-Za-z0-9_-]+',
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
      className: 'rules',
      begin: '{', end: '}',
      contains: [
        {
          className: 'rule',
          begin: '[A-Z\\_\\.\\-]+\\s*:', end: ';', endsWithParent: true,
          lexems: '[A-Za-z-]+',
          keywords: {'play-during': 1, 'counter-reset': 1, 'counter-increment': 1, 'min-height': 1, 'quotes': 1, 'border-top': 1, 'pitch': 1, 'font': 1, 'pause': 1, 'list-style-image': 1, 'border-width': 1, 'cue': 1, 'outline-width': 1, 'border-left': 1, 'elevation': 1, 'richness': 1, 'speech-rate': 1, 'border-bottom': 1, 'border-spacing': 1, 'background': 1, 'list-style-type': 1, 'text-align': 1, 'page-break-inside': 1, 'orphans': 1, 'page-break-before': 1, 'text-transform': 1, 'line-height': 1, 'padding-left': 1, 'font-size': 1, 'right': 1, 'word-spacing': 1, 'padding-top': 1, 'outline-style': 1, 'bottom': 1, 'content': 1, 'border-right-style': 1, 'padding-right': 1, 'border-left-style': 1, 'voice-family': 1, 'background-color': 1, 'border-bottom-color': 1, 'outline-color': 1, 'unicode-bidi': 1, 'max-width': 1, 'font-family': 1, 'caption-side': 1, 'border-right-width': 1, 'pause-before': 1, 'border-top-style': 1, 'color': 1, 'border-collapse': 1, 'border-bottom-width': 1, 'float': 1, 'height': 1, 'max-height': 1, 'margin-right': 1, 'border-top-width': 1, 'speak': 1, 'speak-header': 1, 'top': 1, 'cue-before': 1, 'min-width': 1, 'width': 1, 'font-variant': 1, 'border-top-color': 1, 'background-position': 1, 'empty-cells': 1, 'direction': 1, 'border-right': 1, 'visibility': 1, 'padding': 1, 'border-style': 1, 'background-attachment': 1, 'overflow': 1, 'border-bottom-style': 1, 'cursor': 1, 'margin': 1, 'display': 1, 'border-left-width': 1, 'letter-spacing': 1, 'vertical-align': 1, 'clip': 1, 'border-color': 1, 'list-style': 1, 'padding-bottom': 1, 'pause-after': 1, 'speak-numeral': 1, 'margin-left': 1, 'widows': 1, 'border': 1, 'font-style': 1, 'border-left-color': 1, 'pitch-range': 1, 'background-repeat': 1, 'table-layout': 1, 'margin-bottom': 1, 'speak-punctuation': 1, 'font-weight': 1, 'border-right-color': 1, 'page-break-after': 1, 'position': 1, 'white-space': 1, 'text-indent': 1, 'background-image': 1, 'volume': 1, 'stress': 1, 'outline': 1, 'clear': 1, 'z-index': 1, 'text-decoration': 1, 'margin-top': 1, 'azimuth': 1, 'cue-after': 1, 'left': 1, 'list-style-position': 1},
          contains: [
            {
              className: 'value',
              endsWithParent: true, excludeEnd: true,
              contains: ['function', 'number', 'hexcolor', 'string', 'important', 'comment']
            }
          ]
        },
        'comment'
      ],
      illegal: '[^\\s]'
    },
    hljs.C_BLOCK_COMMENT_MODE,
    {
      className: 'number',
      begin: hljs.NUMBER_RE
    },
    {
      className: 'hexcolor',
      begin: '\\#[0-9A-F]+'
    },
    {
      className: 'function',
      begin: hljs.IDENT_RE + '\\(', end: '\\)',
      contains: [
        {
          className: 'params',
          endsWithParent: true, excludeEnd: true,
          contains: ['number', 'string']
        }
      ]
    },
    {
      className: 'important',
      begin: '!important'
    },
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE
  ]
};
