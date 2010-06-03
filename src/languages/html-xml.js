/*
Language: HTML, XML
*/

hljs.XML_COMMENT = {
  className: 'comment',
  begin: '<!--', end: '-->'
};
hljs.XML_ATTR = {
  className: 'attribute',
  begin: '\\s[A-Za-z0-9\\._:-]+=', end: '^',
  contains: ['value']
};
hljs.XML_VALUE_QUOT = {
  className: 'value',
  begin: '"', end: '"'
};
hljs.XML_VALUE_APOS = {
  className: 'value',
  begin: '\'', end: '\''
};


hljs.LANGUAGES.xml = {
  defaultMode: {
    contains: ['pi', 'comment', 'cdata', 'tag']
  },
  case_insensitive: true,
  modes: [
    {
      className: 'pi',
      begin: '<\\?', end: '\\?>',
      relevance: 10
    },
    hljs.XML_COMMENT,
    {
      className: 'cdata',
      begin: '<\\!\\[CDATA\\[', end: '\\]\\]>'
    },
    {
      className: 'tag',
      begin: '</?', end: '>',
      contains: ['title', 'tag_internal'],
      relevance: 1.5
    },
    {
      className: 'title',
      begin: '[A-Za-z0-9\\._:-]+', end: '^',
      relevance: 0
    },
    {
      className: 'tag_internal',
      begin: '^', endsWithParent: true, noMarkup: true,
      contains: ['attribute'],
      relevance: 0,
      illegal: '[\\+\\.]'
    },
    hljs.XML_ATTR,
    hljs.XML_VALUE_QUOT,
    hljs.XML_VALUE_APOS
  ]
};

hljs.HTML_TAGS = {'code': 1, 'kbd': 1, 'font': 1, 'noscript': 1, 'style': 1, 'img': 1, 'title': 1, 'menu': 1, 'tt': 1, 'tr': 1, 'param': 1, 'li': 1, 'tfoot': 1, 'th': 1, 'input': 1, 'td': 1, 'dl': 1, 'blockquote': 1, 'fieldset': 1, 'big': 1, 'dd': 1, 'abbr': 1, 'optgroup': 1, 'dt': 1, 'button': 1, 'isindex': 1, 'p': 1, 'small': 1, 'div': 1, 'dir': 1, 'em': 1, 'frame': 1, 'meta': 1, 'sub': 1, 'bdo': 1, 'label': 1, 'acronym': 1, 'sup': 1, 'body': 1, 'xml': 1, 'basefont': 1, 'base': 1, 'br': 1, 'address': 1, 'strong': 1, 'legend': 1, 'ol': 1, 'script': 1, 'caption': 1, 's': 1, 'col': 1, 'h2': 1, 'h3': 1, 'h1': 1, 'h6': 1, 'h4': 1, 'h5': 1, 'table': 1, 'select': 1, 'noframes': 1, 'span': 1, 'area': 1, 'dfn': 1, 'strike': 1, 'cite': 1, 'thead': 1, 'head': 1, 'option': 1, 'form': 1, 'hr': 1, 'var': 1, 'link': 1, 'b': 1, 'colgroup': 1, 'ul': 1, 'applet': 1, 'del': 1, 'iframe': 1, 'pre': 1, 'frameset': 1, 'ins': 1, 'tbody': 1, 'html': 1, 'samp': 1, 'map': 1, 'object': 1, 'a': 1, 'xmlns': 1, 'center': 1, 'textarea': 1, 'i': 1, 'q': 1, 'u': 1};
hljs.HTML_DOCTYPE = {
  className: 'doctype',
  begin: '<!DOCTYPE', end: '>',
  relevance: 10
};
hljs.HTML_ATTR = {
  className: 'attribute',
  begin: '\\s[a-zA-Z\\:_-]+=', end: '^',
  contains: ['value']
};
hljs.HTML_SHORT_ATTR = {
  className: 'attribute',
  begin: ' [a-zA-Z]+', end: '^'
};
hljs.HTML_VALUE = {
  className: 'value',
  begin: '[a-zA-Z0-9]+', end: '^'
};

hljs.LANGUAGES.html = {
  defaultMode: {
    contains: ['tag', 'comment', 'doctype', 'vbscript']
  },
  case_insensitive: true,
  modes: [
    hljs.XML_COMMENT,
    hljs.HTML_DOCTYPE,
    {
      className: 'tag',
      lexems: [hljs.IDENT_RE],
      keywords: hljs.HTML_TAGS,
      begin: '<style', end: '>',
      contains: ['attribute'],
      illegal: '[\\+\\.]',
      starts: 'css'
    },
    {
      className: 'tag',
      lexems: [hljs.IDENT_RE],
      keywords: hljs.HTML_TAGS,
      begin: '<script', end: '>',
      contains: ['attribute'],
      illegal: '[\\+\\.]',
      starts: 'javascript'
    },
    {
      className: 'tag',
      lexems: [hljs.IDENT_RE],
      keywords: hljs.HTML_TAGS,
      begin: '<[A-Za-z/]', end: '>',
      contains: ['attribute'],
      illegal: '[\\+\\.]'
    },
    {
      className: 'css',
      end: '</style>', returnEnd: true,
      subLanguage: 'css'
    },
    {
      className: 'javascript',
      end: '</script>', returnEnd: true,
      subLanguage: 'javascript'
    },
    hljs.HTML_ATTR,
    hljs.HTML_SHORT_ATTR,
    hljs.XML_VALUE_QUOT,
    hljs.XML_VALUE_APOS,
    hljs.HTML_VALUE,
    {
      className: 'vbscript',
      begin: '<%', end: '%>',
      subLanguage: 'vbscript'
    }
  ]
};

