/*
Language: HTML, XML
Category: common
*/

hljs.LANGUAGES.xml = function(){
  var XML_IDENT_RE = '[A-Za-z0-9\\._:-]+';
  var TAG_INTERNALS = {
    endsWithParent: true,
    contains: [
      {
        className: 'attribute',
        begin: XML_IDENT_RE,
        relevance: 0
      },
      {
        begin: '="', returnBegin: true, end: '"',
        contains: [{
            className: 'value',
            begin: '"', endsWithParent: true
        }]
      },
      {
        begin: '=\'', returnBegin: true, end: '\'',
        contains: [{
          className: 'value',
          begin: '\'', endsWithParent: true
        }]
      },
      {
        begin: '=',
        contains: [{
          className: 'value',
          begin: '[^\\s/>]+'
        }]
      }
    ]
  };
  return {
    case_insensitive: true,
    defaultMode: {
      contains: [
        {
          className: 'pi',
          begin: '<\\?', end: '\\?>',
          relevance: 10
        },
        {
          className: 'doctype',
          begin: '<!DOCTYPE', end: '>',
          relevance: 10
        },
        {
          className: 'comment',
          begin: '<!--', end: '-->',
          relevance: 10
        },
        {
          className: 'cdata',
          begin: '<\\!\\[CDATA\\[', end: '\\]\\]>',
          relevance: 10
        },
        {
          className: 'tag',
          begin: '<style', end: '>',
          keywords: {'title': {'style': 1}},
          contains: [TAG_INTERNALS],
          starts: {
            className: 'css',
            end: '</style>', returnEnd: true,
            subLanguage: 'css'
          }
        },
        {
          className: 'tag',
          begin: '<script', end: '>',
          keywords: {'title': {'script': 1}},
          contains: [TAG_INTERNALS],
          starts: {
            className: 'javascript',
            end: '</script>', returnEnd: true,
            subLanguage: 'javascript'
          }
        },
        {
          className: 'vbscript',
          begin: '<%', end: '%>',
          subLanguage: 'vbscript'
        },
        {
          className: 'tag',
          begin: '</?', end: '/?>',
          contains: [
            {
              className: 'title', begin: '[^ />]+'
            },
            TAG_INTERNALS
          ]
        }
      ]
    }
  };
}();
