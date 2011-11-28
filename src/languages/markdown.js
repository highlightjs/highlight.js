/*
Language: Markdown
Author: John Crepezzi <john.crepezzi@gmail.com>
Website: http://seejohncode.com/
Description: Syntax Highlighting for markdown files
*/

hljs.LANGUAGES.markdown = function() {
  return {
    case_insensitive: true,
    defaultMode: {
      contains: [
        // highlight headers
        {
          className: 'header',
          begin: '^\#{1,3}',
          end: '$'
        },
        {
          className: 'header',
          begin: '^.+?\\n[=-]{2,}$',
          end: hljs.IMMEDIATE_RE
        },
        // inline html
        {
          begin: '<',
          end: '>',
          subLanguage: 'xml'
        },
        // lists (indicators only)
        {
          className: 'bullet',
          begin: '^([*+-]|(\\d+\.))\\s+',
          end: hljs.IMMEDIATE_RE
        },
        // strong segments
        {
          className: 'strong',
          begin: '[*_]{2}.+?[*_]{2}',
          end: hljs.IMMEDIATE_RE
        },
        // emphasis segments
        {
          className: 'emphasis',
          begin: '[*_].+?[*_]',
          end: hljs.IMMEDIATE_RE
        },
        // blockquotes
        {
          className: 'blockquote',        
          begin: '^>\\s+',
          end: '$'
        },
        // code snippets
        {
          className: 'code',
          begin: '`.+?`',
          end: hljs.IMMEDIATE_RE
        },
        {
          className: 'code',
          begin: '^    ',
          end: '$',
          relevance: 0
        },
        // horizontal rules
        {
          className: 'horizontal_rule',
          begin: '^-{3,}',
          end: '$'
        },
        // using links - title and link
        {
          begin: '\\[.+?\\]\\(.+?\\)',
          end: hljs.IMMEDIATE_RE,
          returnBegin: true,
          contains: [
            {
              className: 'link_label',
              begin: '\\[.+\\]'
            },
            {
              className: 'link_url',
              begin: '\\(',
              end: '\\)'
            }
          ]
        }
      ]
    }  
  };
}();
