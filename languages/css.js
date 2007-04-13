var HTML_TAGS = {'code': 1, 'kbd': 1, 'font': 1, 'noscript': 1, 'style': 1, 'img': 1, 'title': 1, 'menu': 1, 'tt': 1, 'tr': 1, 'param': 1, 'li': 1, 'tfoot': 1, 'th': 1, 'input': 1, 'td': 1, 'dl': 1, 'blockquote': 1, 'fieldset': 1, 'big': 1, 'dd': 1, 'abbr': 1, 'optgroup': 1, 'dt': 1, 'button': 1, 'isindex': 1, 'p': 1, 'small': 1, 'div': 1, 'dir': 1, 'em': 1, 'frame': 1, 'meta': 1, 'sub': 1, 'bdo': 1, 'label': 1, 'acronym': 1, 'sup': 1, 'body': 1, 'xml': 1, 'basefont': 1, 'base': 1, 'br': 1, 'address': 1, 'strong': 1, 'legend': 1, 'ol': 1, 'script': 1, 'caption': 1, 's': 1, 'col': 1, 'h2': 1, 'h3': 1, 'h1': 1, 'h6': 1, 'h4': 1, 'h5': 1, 'table': 1, 'select': 1, 'noframes': 1, 'span': 1, 'area': 1, 'dfn': 1, 'strike': 1, 'cite': 1, 'thead': 1, 'head': 1, 'option': 1, 'form': 1, 'hr': 1, 'var': 1, 'link': 1, 'b': 1, 'colgroup': 1, 'ul': 1, 'applet': 1, 'del': 1, 'iframe': 1, 'pre': 1, 'frameset': 1, 'ins': 1, 'tbody': 1, 'html': 1, 'samp': 1, 'map': 1, 'object': 1, 'a': 1, 'xmlns': 1, 'center': 1, 'textarea': 1, 'i': 1, 'q': 1, 'u': 1};

LANGUAGES.css = {
  defaultMode: {
    contains: ['id', 'class', 'attr_selector', 'rules', 'comment'],
    keywords: HTML_TAGS,
    lexems: [IDENT_RE],
    illegal: '='
  },
  case_insensitive: true,
  modes: [
    {
      className: 'id',
      begin: '\\#[A-Za-z0-9_-]+', end: '^'
    },
    {
      className: 'class',
      begin: '\\.[A-Za-z0-9_-]+', end: '^',
      relevance: 0
    },
    {
      className: 'attr_selector',
      begin: '\\[', end: '\\]',
      illegal: '$'
    },
    {
      className: 'rules',
      begin: '{', end: '}',
      lexems: ['[A-Za-z-]+'],
      keywords: {'play-during': 1, 'counter-reset': 1, 'counter-increment': 1, 'min-height': 1, 'quotes': 1, 'border-top': 1, 'pitch': 1, 'font': 1, 'pause': 1, 'list-style-image': 1, 'border-width': 1, 'cue': 1, 'outline-width': 1, 'border-left': 1, 'elevation': 1, 'richness': 1, 'speech-rate': 1, 'border-bottom': 1, 'border-spacing': 1, 'background': 1, 'list-style-type': 1, 'text-align': 1, 'page-break-inside': 1, 'orphans': 1, 'page-break-before': 1, 'text-transform': 1, 'line-height': 1, 'padding-left': 1, 'font-size': 1, 'right': 1, 'word-spacing': 1, 'padding-top': 1, 'outline-style': 1, 'bottom': 1, 'content': 1, 'border-right-style': 1, 'padding-right': 1, 'border-left-style': 1, 'voice-family': 1, 'background-color': 1, 'border-bottom-color': 1, 'outline-color': 1, 'unicode-bidi': 1, 'max-width': 1, 'font-family': 1, 'caption-side': 1, 'border-right-width': 1, 'pause-before': 1, 'border-top-style': 1, 'color': 1, 'border-collapse': 1, 'border-bottom-width': 1, 'float': 1, 'height': 1, 'max-height': 1, 'margin-right': 1, 'border-top-width': 1, 'speak': 1, 'speak-header': 1, 'top': 1, 'cue-before': 1, 'min-width': 1, 'width': 1, 'font-variant': 1, 'border-top-color': 1, 'background-position': 1, 'empty-cells': 1, 'direction': 1, 'border-right': 1, 'visibility': 1, 'padding': 1, 'border-style': 1, 'background-attachment': 1, 'overflow': 1, 'border-bottom-style': 1, 'cursor': 1, 'margin': 1, 'display': 1, 'border-left-width': 1, 'letter-spacing': 1, 'vertical-align': 1, 'clip': 1, 'border-color': 1, 'list-style': 1, 'padding-bottom': 1, 'pause-after': 1, 'speak-numeral': 1, 'margin-left': 1, 'widows': 1, 'border': 1, 'font-style': 1, 'border-left-color': 1, 'pitch-range': 1, 'background-repeat': 1, 'table-layout': 1, 'margin-bottom': 1, 'speak-punctuation': 1, 'font-weight': 1, 'border-right-color': 1, 'page-break-after': 1, 'position': 1, 'white-space': 1, 'text-indent': 1, 'background-image': 1, 'volume': 1, 'stress': 1, 'outline': 1, 'clear': 1, 'z-index': 1, 'text-decoration': 1, 'margin-top': 1, 'azimuth': 1, 'cue-after': 1, 'left': 1, 'list-style-position': 1},
      contains: ['comment', 'value']
    },
    C_BLOCK_COMMENT_MODE,
    {
      className: 'value',
      begin: ':', end: ';', endsWithParent: true, 
      excludeBegin: true, excludeEnd: true
    }
  ]
};//css
