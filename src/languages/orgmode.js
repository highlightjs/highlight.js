/*
Language: emacs org-mode
Requires: xml.js
Author: Jörn Reimerdes <joern.reimerdes@gmail.com>
Category: common, markup
*/

function(hljs) {
  return {
    aliases: ['org', 'org-mode'],
    contains: [
      // highlight headers
      {
        className: 'section',
        begin: /^\*{0,6} /,
        end: /$/
      },
      // inline html - TODO
      {
        begin: '<', end: '>',
        subLanguage: 'xml',
        relevance: 0
      },
      // lists (indicators only)
      {
        className: 'bullet',
        begin: /^([+-]|(\d+\.))\s+/
      },
      // strong segments
      {
        className: 'strong',
        begin: /\*((\S.*?\S)|(\S))\*/
      },
      // deleted segments
      {
        className: 'deletion',
        begin: /\+((\S.*?\S)|(\S))\+/,
        relevance: 0
      },
      // underline segments
      {
        className: 'underline',
        begin: /_((\S.*?\S)|(\S))_/
      },
      // emphasis segments
      {
        className: 'emphasis',
        variants: [
          { begin: /\/((\S.*?\S)|(\S))\// },
        ]
      },
      // table rows
      {
        className: 'table',
        begin: /\|-*\+-*/, end: /\|/ ,
        relevance:1
        },
      {
        className: 'table',
        begin: /\|/, end: /\|/ ,
        relevance:0,
        excludeBegin:false,
        excludeEnd:false,
        returnEnd: false,
        returnBegin: true,
        contians: [
          {
             //className: 'link',
             begin: /\|/, end: /\|/,
             excludeBegin: true, excludeEnd: true,
             subLanguage: 'orgmode'
           }
         ]
      },
      // blockquotes
      {
        className: 'quote',
        keywords: 'BEGIN_QUOTE END_QUOTE ',
        begin: /^#\+BEGIN_QUOTE.*$/, end: /^#\+END_QUOTE.*$/
      },
      // code snippets
      {
        className: 'code',
        keywords: 'BEGIN_SRC END_SRC BEGIN_EXAMPLE END_EXAMPLE',
        variants: [
          {
            begin: /^#\+BEGIN_SRC.*$/, end: /^#\+END_SRC.*$/
          },
          {
            begin: /^#\+BEGIN_EXAMPLE.*$/, end: /^#\+END_EXAMPLE.*$/
          },
          {
            begin: /~((\S.*?\S)|(\S))~/
          },
          {
            begin: /=((\S.*?\S)|(\S))=/
          }
        ]
      },
      // attributes
      {
        className: 'attribute',
        variants: [
        {
          begin: /^\s*#\+.*$/
        }
      ]
      },
      // Tags
      {
        className: 'tags',
        variants: [
          {
            begin: /TODO/
          },
          {
            begin: /DONE/
          }
        ]
      },
      // horizontal rules
      {
        className: 'meta',
        begin: /^-{5,}/, end: /$/
      },

      // using links - title and link
      {
        begin: /\[\[.+?\][\[\[].*?[\]\]]\]/,
        returnBegin: true,
        contains: [
          {
            className: 'link',
            begin: /\[\[/, end: /\]/,
            excludeBegin: true, excludeEnd: true
          },
          {
            className: 'symbol',
            begin: /\[/, end: /\]\]/,
            excludeBegin: true, excludeEnd: true
          }
        ],
        relevance: 10
      },
      {
        begin: /\[\[[^\n]+\]\]/,
        returnBegin: true,
        contains: [
          {
            className: 'link',
            begin: /\[\[/, end: /\]\]/,
            excludeBegin: true, excludeEnd: true
          }
        ]
      }
    ]
  };
}
