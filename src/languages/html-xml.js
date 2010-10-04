/*
Language: HTML, XML
*/

(function(){

  var XML_IDENT_RE = '[A-Za-z0-9\\._:-]+';

  var COMMENT = {
    className: 'comment',
    begin: '<!--', end: '-->'
  };
  var TAG = {
    className: 'tag',
    begin: '</?', end: '/?>',
    contains: ['title', 'tag_internal']
  };
  var TITLE = {
    className: 'title',
    begin: XML_IDENT_RE, end: hljs.IMMEDIATE_RE,
    relevance: 0
  };
  var TAG_INTERNAL = {
    className: 'tag_internal',
    begin: hljs.IMMEDIATE_RE, endsWithParent: true, noMarkup: true,
    contains: ['attribute', 'value_container'],
    relevance: 0,
    illegal: '[^\\s]'
  };
  var ATTR = {
    className: 'attribute',
    begin: XML_IDENT_RE, end: hljs.IMMEDIATE_RE,
  };
  var VALUE_CONTAINER_QUOT = {
    className: 'value_container',
    begin: '="', returnBegin: true, end: '"', noMarkup: true,
    contains: [{
        className: 'value',
        begin: '"', endsWithParent: true
    }]
  };
  var VALUE_CONTAINER_APOS = {
    className: 'value_container',
    begin: '=\'', returnBegin: true, end: '\'', noMarkup: true,
    contains: [{
      className: 'value',
      begin: '\'', endsWithParent: true
    }]
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
      {
        className: 'cdata',
        begin: '<\\!\\[CDATA\\[', end: '\\]\\]>'
      },
      COMMENT,
      TAG,
      TITLE,
      TAG_INTERNAL,
      ATTR,
      VALUE_CONTAINER_QUOT,
      VALUE_CONTAINER_APOS,
    ]
  };

  var HTML_TAGS = {
    'code': 1, 'kbd': 1, 'font': 1, 'noscript': 1, 'style': 1, 'img': 1,
    'title': 1, 'menu': 1, 'tt': 1, 'tr': 1, 'param': 1, 'li': 1, 'tfoot': 1,
    'th': 1, 'input': 1, 'td': 1, 'dl': 1, 'blockquote': 1, 'fieldset': 1,
    'big': 1, 'dd': 1, 'abbr': 1, 'optgroup': 1, 'dt': 1, 'button': 1,
    'isindex': 1, 'p': 1, 'small': 1, 'div': 1, 'dir': 1, 'em': 1, 'frame': 1,
    'meta': 1, 'sub': 1, 'bdo': 1, 'label': 1, 'acronym': 1, 'sup': 1, 'body': 1,
    'basefont': 1, 'base': 1, 'br': 1, 'address': 1, 'strong': 1, 'legend': 1,
    'ol': 1, 'script': 1, 'caption': 1, 's': 1, 'col': 1, 'h2': 1, 'h3': 1,
    'h1': 1, 'h6': 1, 'h4': 1, 'h5': 1, 'table': 1, 'select': 1, 'noframes': 1,
    'span': 1, 'area': 1, 'dfn': 1, 'strike': 1, 'cite': 1, 'thead': 1,
    'head': 1, 'option': 1, 'form': 1, 'hr': 1, 'var': 1, 'link': 1, 'b': 1,
    'colgroup': 1, 'ul': 1, 'applet': 1, 'del': 1, 'iframe': 1, 'pre': 1,
    'frameset': 1, 'ins': 1, 'tbody': 1, 'html': 1, 'samp': 1, 'map': 1,
    'object': 1, 'a': 1, 'xmlns': 1, 'center': 1, 'textarea': 1, 'i': 1, 'q': 1,
    'u': 1, 'section': 1, 'nav': 1, 'article': 1, 'aside': 1, 'hgroup': 1,
    'header': 1, 'footer': 1, 'figure': 1, 'figurecaption': 1, 'time': 1,
    'mark': 1, 'wbr': 1, 'embed': 1, 'video': 1, 'audio': 1, 'source': 1,
    'canvas': 1, 'datalist': 1, 'keygen': 1, 'output': 1, 'progress': 1,
    'meter': 1, 'details': 1, 'summary': 1, 'command': 1
  };

  hljs.LANGUAGES.html = {
    defaultMode: {
      contains: ['comment', 'doctype', 'vbscript', 'tag']
    },
    case_insensitive: true,
    modes: [
      {
        className: 'doctype',
        begin: '<!DOCTYPE', end: '>',
        relevance: 10
      },
      {
        className: 'tag',
        begin: '<style', end: '>',
        lexems: [hljs.IDENT_RE],  keywords: {'style': 1},
        contains: ['tag_internal'],
        starts: 'css'
      },
      {
        className: 'tag',
        begin: '<script', end: '>',
        lexems: [hljs.IDENT_RE],  keywords: {'script': 1},
        contains: ['tag_internal'],
        starts: 'javascript'
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
      {
        className: 'vbscript',
        begin: '<%', end: '%>',
        subLanguage: 'vbscript'
      },
      COMMENT,
      hljs.inherit(TAG),
      hljs.inherit(TITLE, {
        lexems: [hljs.IDENT_RE], keywords: HTML_TAGS,
      }),
      hljs.inherit(TAG_INTERNAL),
      ATTR,
      VALUE_CONTAINER_QUOT,
      VALUE_CONTAINER_APOS,
      {
        className: 'value_container',
        begin: '=', end: hljs.IMMEDIATE_RE,
        contains: [
          {
            className: 'unquoted_value', displayClassName: 'value',
            begin: '[^\\s/>]+', end: hljs.IMMEDIATE_RE
          }
        ]
      }
    ]
  };

})()
