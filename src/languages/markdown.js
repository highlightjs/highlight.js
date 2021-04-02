/*
Language: Markdown
Requires: xml.js
Author: John Crepezzi <john.crepezzi@gmail.com>
Website: https://daringfireball.net/projects/markdown/
Category: common, markup
*/

import * as regex from '../lib/regex.js';

export default function(hljs) {
  let deepCopy = function(x) {
    return JSON.parse(JSON.stringify(x));
  };
  const INLINE_HTML = {
    begin: '<\\/?[A-Za-z_]',
    end: '>',
    subLanguage: 'xml',
    endsWithParent: true,
    relevance: 0
  };
  const HORIZONTAL_RULE = {
    className: 'section',
    match: '^[ \\t]*([\\*-_])[ \\t]*\\1[ \\t]*\\1( |\\t|\\1)*$',
    relevance: 0
  };
  const INDENTED_CODE = {
    className: 'code',
    begin: '^( {4}|\\t)',
    end: '^(?!( {4}|\\t))',
    relevance: 0
  };
  const FENCED_CODE = {
    variants: [
      {
        begin: '^[ \t]*`{3,}',
        end: '`{3,}[_\\t]*$',
        returnBegin: true,
        contains: [
          {
            className: 'code',
            begin: '`{3,}',
            endsWithParent: true
          }
        ]
      },
      {
        begin: '^[ \t]*~{3,}',
        end: '~{3,}[_\\t]*$',
        returnBegin: true,
        contains: [
          {
            className: 'code',
            begin: '~{3,}',
            endsWithParent: true
          }
        ]
      },
    ]
  };
  const LINK_REFERENCE = {
    begin: /^\[[^\n]+\]:/,
    end: '$',
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
  const URL_SCHEME = '[A-Za-z][A-Za-z0-9+.-]*';
  const LINK = {
    variants: [
      // too much like nested array access in so many languages
      // to have any real relevance
      {
        begin: '\\[.+?\\]\\[.*?\\]',
        relevance: 0
      },
      // popular internet URLs
      {
        begin: '\\[.+?\\]\\(((data|javascript|mailto):|(?:http|ftp)s?:\\/\\/).*?\\)',
        relevance: 2
      },
      {
        begin: '\\[.+?\\]\\(' + URL_SCHEME + ':\\/\\/.*?\\)',
        relevance: 2
      },
      // relative urls
      {
        begin: '\\[.+?\\]\\([.\\/?&#].*?\\)',
        relevance: 1
      },
      // whatever else, lower relevance (might not be a link at all)
      {
        begin: '\\[.+?\\]\\(.*?\\)',
        relevance: 0
      }
    ],
    returnBegin: true,
    endsWithParent: true,
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
  const CODE_SPAN = {
    className: 'code',
    endsWithParent: true,
    begin: '`+',
    end: '`+',
  }
  const BOLD_CHILD = {
    endsWithParent: true,
    variants: [
      {
        begin: '[^*]\\*\\*',
        end: '\\*\\*',
        returnBegin: true,
        contains: [
          {
            contains: deepCopy([INLINE_HTML, LINK, CODE_SPAN]),
            className: 'strong',
            endsWithParent: true,
            begin: '\\*\\*'
          }
        ]
      },
      {
        begin: '(^|[^a-zA-Z_])__',
        end: '__(?=[^a-zA-Z])',
        returnBegin: true,
        contains: [
          {
            contains: deepCopy([INLINE_HTML, LINK, CODE_SPAN]),
            className: 'strong',
            endsWithParent: true,
            begin: '__'
          },
        ]
      },
    ]
  };
  const ITALIC_CHILD = {
    endsWithParent: true,
    variants: [
      {
        begin: '[^*]\\*(?!\\*)',
        end: '\\*',
        returnBegin: true,
        contains: [
          {
            contains: deepCopy([INLINE_HTML, LINK, CODE_SPAN]),
            className: 'emphasis',
            endsWithParent: true,
            begin: '\\*'
          }
        ]
      },
      {
        begin: '(^|[^a-zA-Z_])_(?!_)',
        end: '_(?=[^a-zA-Z])',
        returnBegin: true,
        contains: [
          {
            contains: deepCopy([INLINE_HTML, LINK, CODE_SPAN]),
            className: 'emphasis',
            endsWithParent: true,
            begin: '_'
          }
        ]
      },
    ]
  };
  const BOLD = {
    endsWithParent: true,
    variants: [
      {
        contains: deepCopy([INLINE_HTML, LINK, CODE_SPAN, ITALIC_CHILD]),
        className: 'strong',
        begin: '\\*\\*',
        end: '\\*\\*'
      },
      {
        begin: '(^|[^a-zA-Z])__',
        end: '__(?=[^a-zA-Z])',
        returnBegin: true,
        contains: [
          {
            contains: deepCopy([INLINE_HTML, LINK, CODE_SPAN, ITALIC_CHILD]),
            className: 'strong',
            endsWithParent: true,
            begin: '__'
          },
        ]
      },
    ]
  };
  const ITALIC = {
    endsWithParent: true,
    variants: [
      {
        contains: deepCopy([INLINE_HTML, LINK, CODE_SPAN, BOLD_CHILD]),
        className: 'emphasis',
        begin: '\\*(?!\\*)',
        end: '\\*',
      },
      {
        begin: '(^|[^a-zA-Z])_(?!_)',
        end: '_(?=[^a-zA-Z])',
        returnBegin: true,
        contains: [
          {
            contains: deepCopy([INLINE_HTML, LINK, CODE_SPAN, BOLD_CHILD]),
            className: 'emphasis',
            endsWithParent: true,
            begin: '_'
          }
        ]
      },
    ]
  };
  let CONTAINABLE = [
    INLINE_HTML,
    LINK, 
    CODE_SPAN, 
    BOLD,
    ITALIC,
  ];
  const HEADER = {
    className: 'section',
    variants: [
      {
        begin: '^[ \\t]*#{1,6}',
        end: '$',
        contains: deepCopy(CONTAINABLE)
      },
      {
        begin: '^.*?\\n^[ \\t]*[=-]+[ \\t]*$',
        returnBegin: true,
        contains: [
          {
            begin: '^[ \\t]*[=-]+[ \\t]*$',
            endsParent: true,
          },
          {
            begin: '^',
            end: '\\n',
            contains: deepCopy(CONTAINABLE),
          }
        ]
      }
    ]
  };
  const BLOCKQUOTE = {
    className: 'quote',
    begin: '^[ \\t]*>+',
    end: '$',
    contains: deepCopy(CONTAINABLE),
  };
  const BLANK_LINE = {
    begin: '^[ \\t]*\\n',
    relevance: 0
  };
  const LIST = {
    returnBegin: true,
    begin: '^[ \\t]*([*+-]|(\\d+\\.))[ \\t]',
    end: '',
    contains: [
      {
        className: 'bullet',
        begin: '^[ \\t]*([*+-]|(\\d+\\.))',
      },
      ...deepCopy(CONTAINABLE)
    ],
  };
  const PARAGRAPH = {
    begin: '^',
    end: '',
    contains: deepCopy(CONTAINABLE),
    relevance: 0
  };
  let BLOCK_END = '(' +
    '(?=\\n' + BLANK_LINE.begin + ')|' +
    '(?=\\n' + BLOCKQUOTE.begin + ')|' +
    '(?=\\n' + HEADER.variants[0].begin + ')|' +
    '(?=\\n' + HEADER.variants[1].begin + ')|' +
    '(?=\\n' + HORIZONTAL_RULE.begin + ')|' +
    '(?=\\n' + FENCED_CODE.variants[0].begin + ')|' +
    '(?=\\n' + FENCED_CODE.variants[1].begin + ')|' +
    '(?=\\n' + LINK_REFERENCE.begin + ')|' +
    '(?=\\n' + LIST.begin + ')' +
    ')';
  LIST.end = BLOCK_END;
  PARAGRAPH.end = BLOCK_END;

  return {
    name: 'Markdown',
    aliases: [
      'md',
      'mkdown',
      'mkd'
    ],
    contains: [
      BLANK_LINE,
      BLOCKQUOTE,
      HEADER,
      HORIZONTAL_RULE,
      FENCED_CODE,
      LINK_REFERENCE,
      LIST,
      INDENTED_CODE,
      PARAGRAPH,
    ]
  };
}
