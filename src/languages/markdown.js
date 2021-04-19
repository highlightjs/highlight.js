/*
Language: Markdown
Requires: xml.js
Author: John Crepezzi <john.crepezzi@gmail.com>
Website: https://daringfireball.net/projects/markdown/
Category: common, markup
*/

import * as regex from '../lib/regex.js';

export default function(hljs) {
  const INLINE_HTML = {
    begin: /<\/?[A-Za-z_]/,
    end: '>',
    subLanguage: 'xml',
    relevance: 0
  };
  const HORIZONTAL_RULE = {
    begin: '^[-\\*]{3,}',
    end: '$'
  };
  const CODE = {
    className: 'code',
    variants: [
      // TODO: fix to allow these to work with sublanguage also
      {
        begin: '(`{3,})[^`](.|\\n)*?\\1`*[ ]*'
      },
      {
        begin: '(~{3,})[^~](.|\\n)*?\\1~*[ ]*'
      },
      // needed to allow markdown as a sublanguage to work
      {
        begin: '```',
        end: '```+[ ]*$'
      },
      {
        begin: '~~~',
        end: '~~~+[ ]*$'
      },
      {
        begin: '`.+?`'
      },
      {
        begin: '(?=^( {4}|\\t))',
        // use contains to gobble up multiple lines to allow the block to be whatever size
        // but only have a single open/close tag vs one per line
        contains: [
          {
            begin: '^( {4}|\\t)',
            end: '(\\n)$'
          }
        ],
        relevance: 0
      }
    ]
  };
  const LIST = {
    className: 'bullet',
    begin: '^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)',
    end: '\\s+',
    excludeEnd: true
  };
  const LINK_REFERENCE = {
    begin: /^\[[^\n]+\]:/,
    returnBegin: true,
    contains: [
      {
        className: 'symbol',
        begin: /\[/,
        end: /\]/,
        excludeBegin: true,
        excludeEnd: true
      },
      {
        className: 'link',
        begin: /:\s*/,
        end: /$/,
        excludeBegin: true
      }
    ]
  };
  const URL_SCHEME = /[A-Za-z][A-Za-z0-9+.-]*/;
  const LINK = {
    variants: [
      // too much like nested array access in so many languages
      // to have any real relevance
      {
        begin: /\[.+?\]\[.*?\]/,
        relevance: 0
      },
      // popular internet URLs
      {
        begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
        relevance: 2
      },
      {
        begin: regex.concat(/\[.+?\]\(/, URL_SCHEME, /:\/\/.*?\)/),
        relevance: 2
      },
      // relative urls
      {
        begin: /\[.+?\]\([./?&#].*?\)/,
        relevance: 1
      },
      // whatever else, lower relevance (might not be a link at all)
      {
        begin: /\[.+?\]\(.*?\)/,
        relevance: 0
      }
    ],
    returnBegin: true,
    contains: [
      {
        className: 'string',
        relevance: 0,
        begin: '\\[',
        end: '\\]',
        excludeBegin: true,
        returnEnd: true
      },
      {
        className: 'link',
        relevance: 0,
        begin: '\\]\\(',
        end: '\\)',
        excludeBegin: true,
        excludeEnd: true
      },
      {
        className: 'symbol',
        relevance: 0,
        begin: '\\]\\[',
        end: '\\]',
        excludeBegin: true,
        excludeEnd: true
      }
    ]
  };
  function boldChild() {
    return {
      relevance: 0,
      variants: [
        {
          contains: [INLINE_HTML, LINK],
          className: 'strong',
          begin: /\*\*/,
          end: /\*\*/
        },
        {
          begin: /(^|[\s\*])__/,
          end: /__(?=[\s\*])/,
          returnBegin: true,
          contains: [
            {
              contains: [INLINE_HTML, LINK],
              className: 'strong',
              endsWithParent: true,
              begin: '__'
            },
          ]
        },
      ]
    };
  }
  function italicChild() {
    return {
      relevance: 0,
      variants: [
        {
          contains: [INLINE_HTML, LINK],
          className: 'emphasis',
          begin: /\*(?!\*)/,
          end: /\*/,
        },
        {
          begin: /(^|[\s\*])_(?!_)/,
          end: /_(?=[\s\*])/,
          returnBegin: true,
          contains: [
            {
              contains: [INLINE_HTML, LINK],
              className: 'emphasis',
              endsWithParent: true,
              begin: /_/
            }
          ]
        },
      ]
    };
  }
  function bold() {
    let v = boldChild()
    v.variants[0].contains.push(italicChild());
    v.variants[1].contains[0].contains.push(italicChild());
    return v;
  };
  function italic() {
    let v = italicChild();
    v.variants[0].contains.push(boldChild());
    v.variants[1].contains[0].contains.push(boldChild());
    return v;
  }
  function inline() {
    return [INLINE_HTML, LINK, bold(), italic()]
  }

  const HEADER = {
    className: 'section',
    variants: [
      {
        begin: '^#{1,6}',
        end: '$',
        contains: inline()
      },
      {
        begin: '(?=^.+?\\n[=-]{2,}$)',
        contains: [
          {
            begin: '^[=-]*$'
          },
          {
            begin: '^',
            end: "\\n",
            contains: inline()
          }
        ]
      }
    ]
  };

  const BLOCKQUOTE = {
    className: 'quote',
    begin: '^>\\s+',
    contains: inline(),
    end: '$'
  };

  return {
    name: 'Markdown',
    aliases: [
      'md',
      'mkdown',
      'mkd'
    ],
    contains: [
      HEADER,
      INLINE_HTML,
      LIST,
      bold(),
      italic(),
      BLOCKQUOTE,
      CODE,
      HORIZONTAL_RULE,
      LINK,
      LINK_REFERENCE
    ]
  };
}
