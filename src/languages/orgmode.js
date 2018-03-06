/*
Language: emacs org-mode
Requires: lisp.js
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
        begin: /^\*{1,6} /,
        end: /$/,
        relevance:0
      },
      // inline html
      {
        begin: '<', end: '>',
        subLanguage: 'xml',
        relevance: 0
      },
      // lists (indicators only)
      {
        className: 'bullet',
        begin: /^\s*([+-]|(\d+\.)|[a-zA-Z]\.)\s+/,
        relevance:0
      },
      // strong segments
      {
        className: 'strong',
        begin: /\s\*((\S.*?\S)|(\S))\*\s/,
        relevance:0
      },
      // deleted segments
      {
        className: 'deletion',
        begin: /\s\+((\S.*?\S)|(\S))\+\s/,
        relevance:0
      },
      // underline segments
      {
        className: 'underline',
        begin: /\s_((\S.*?\S)|(\S))_\s/,
        relevance:0
      },
      // emphasis segments
      {
        className: 'emphasis',
        relevance:0,
        variants: [
          { begin: /\s\/((\S.*?\S)|(\S))\/\s/ },
        ]
      },
      // table rows
      {
        className: 'table',
        begin: /\|-*\+-*/, end: /\|/ ,
        relevance:10
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
        begin: /^#\+BEGIN_QUOTE.*$/, end: /^#\+END_QUOTE.*$/,
        relevance: 10
      },
      // code snippets
      {
        className: 'code',
        keywords: 'BEGIN_SRC END_SRC BEGIN_EXAMPLE END_EXAMPLE',
        variants: [
          {
            begin: /^#\+BEGIN_SRC/, end: /^#\+END_SRC$/,
            relevance: 10
          },
          {
            begin: /^#\+BEGIN_EXAMPLE.*$/, end: /^#\+END_EXAMPLE.*$/,
            relevance: 10
          },
          {
            begin: /~((\S.*?\S)|(\S))~/,
            relevance: 10
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
                begin: /^\s*#\+NAME.*$/,
                relevance: 10
            },
            {
                begin: /^\s*#\+STARTUP.*$/,
                relevance: 10
            },
            {
                begin: /^\s*#\+ATTR_ORG.*$/,
                relevance: 10
            },
            {
                begin: /^\s*#\+RESULTS.*$/,
                relevance: 10
            },
            {
                begin: /^\s*#\+TBLFM.*$/,
                relevance: 10
            },
     // conflicts with code environment
     //   {
     //    begin: /^\s*#\+.*$/,
     //    relevance: 10
     //   }
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
        relevance:10,
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
        ]
      },
      {
        begin: /\[\[[^\n]+\]\]/,
        relevance:0,
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
