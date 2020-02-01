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
  HORIZONTAL_RULE = {
    begin: '^[-\\*]{3,}', end: '$'
  };
  CODE = {
    className: 'code',
    variants: [
      // TODO: fix to allow these to work with sublanguage also
      { begin: '(`{3,})(.|\\n)*?\\1`*[ ]*', },
      { begin: '(~{3,})(.|\\n)*?\\1~*[ ]*', },
      // needed to allow markdown as a sublanguage to work
      { begin: '```', end: '```+[ ]*$' },
      { begin: '~~~', end: '~~~+[ ]*$' },
      { begin: '`.+?`' },
      {
        begin: '(?=^( {4}|\\t))',
        // use contains to gobble up multiple lines to allow the block to be whatever size
        // but only have a single open/close tag vs one per line
        contains: [
          { begin: '^( {4}|\\t)', end: '(\\n)$' }
        ],
        relevance: 0
      }
    ]
  };
  LIST = {
    className: 'bullet',
    begin: '^[ \t]*([*+-]|(\\d+\\.))\\s+'
  };
  LINK_REFERENCE = {
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

  CONTAINABLE = CONTAINABLE.concat(BOLD,ITALIC);

  HEADER = {
    className: 'section',
    variants: [
      {
        begin: '^#{1,6}',
        end: '$',
        contains: CONTAINABLE
       },
      {
        begin: '(?=^.+?\\n[=-]{2,}$)',
        contains: [
          { begin: '^[=-]*$' },
          { begin: '^', end: "\\n", contains: CONTAINABLE },
        ]
       }
    ]
  };

  BLOCKQUOTE = {
    className: 'quote',
    begin: '^>\\s+',
    contains: CONTAINABLE,
    end: '$',
  };

  return {
    aliases: ['md', 'mkdown', 'mkd'],
    contains: [
      HEADER,
      INLINE_HTML,
      LIST,
      BOLD,
      ITALIC,
      BLOCKQUOTE,
      CODE,
      HORIZONTAL_RULE,
      LINK,
      LINK_REFERENCE
    ]
  };
}
