/*
Language: Markdown
Requires: xml.js
Author: John Crepezzi <john.crepezzi@gmail.com>
Website: https://daringfireball.net/projects/markdown/
Category: common, markup
*/

function(hljs) {
  INLINE_HTML = {
    begin: '<', end: '>',
    subLanguage: 'xml',
    relevance: 0
  };
  LINK = {
    begin: '\\[.+?\\][\\(\\[].*?[\\)\\]]',
    returnBegin: true,
    contains: [
      {
        className: 'string',
        begin: '\\[', end: '\\]',
        excludeBegin: true,
        returnEnd: true,
        relevance: 0
      },
      {
        className: 'link',
        begin: '\\]\\(', end: '\\)',
        excludeBegin: true, excludeEnd: true
      },
      {
        className: 'symbol',
        begin: '\\]\\[', end: '\\]',
        excludeBegin: true, excludeEnd: true
      }
    ],
    relevance: 10
  };
  BOLD = {
    className: 'strong',
    contains: [],
    variants: [
      {begin: /_{2}/, end: /_{2}/ },
      {begin: /\*{2}/, end: /\*{2}/ }
    ]
  };
  ITALIC = {
    className: 'emphasis',
    contains: [],
    variants: [
      { begin: /\*(?!\*)/, end: /\*/ },
      { begin: /_(?!_)/, end: /_/, relevance: 0},
    ]
  };
  BOLD.contains.push(ITALIC);
  ITALIC.contains.push(BOLD);

  CONTAINABLE = [
    INLINE_HTML,
    LINK
  ];

  BOLD.contains = BOLD.contains.concat(CONTAINABLE);
  ITALIC.contains = ITALIC.contains.concat(CONTAINABLE);

  BLOCKQUOTE = {
    className: 'quote',
    begin: '^>\\s+',
    contains: [],
    end: '$',
  };

  BLOCKQUOTE.contains = BLOCKQUOTE.contains.concat(
    CONTAINABLE,
    BOLD,
    ITALIC
  )

  return {
    aliases: ['md', 'mkdown', 'mkd'],
    contains: [
      // highlight headers
      {
        className: 'section',
        variants: [
          { begin: '^#{1,6}', end: '$' },
          { begin: '^.+?\\n[=-]{2,}$' }
        ]
      },
      INLINE_HTML,
      // lists (indicators only)
      {
        className: 'bullet',
        begin: '^\\s*([*+-]|(\\d+\\.))\\s+'
      },
      BOLD,
      ITALIC,
      BLOCKQUOTE,
      // code snippets
      {
        className: 'code',
        variants: [
          {
            begin: '^```\\w*\\s*$', end: '^```[ ]*$'
          },
          {
            begin: '`.+?`'
          },
          {
            begin: '^( {4}|\\t)', end: '$',
            relevance: 0
          }
        ]
      },
      // horizontal rules
      {
        begin: '^[-\\*]{3,}', end: '$'
      },
      LINK,
      {
        begin: /^\[[^\n]+\]:/,
        returnBegin: true,
        contains: [
          {
            className: 'symbol',
            begin: /\[/, end: /\]/,
            excludeBegin: true, excludeEnd: true
          },
          {
            className: 'link',
            begin: /:\s*/, end: /$/,
            excludeBegin: true
          }
        ]
      }
    ]
  };
}
