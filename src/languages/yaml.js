/*
Language: YAML
Description: Yet Another Markdown Language
Author: Stefan Wienert <stwienert@gmail.com>
Contributors: Carl Baxter <carl@cbax.tech>
Requires: ruby.js
Website: https://yaml.org
Category: common, config
*/
export default function(hljs) {
  const LITERALS = 'true false yes no null';

  const URI_CHARACTERS = '[\\w#;/?:@&=+$,.~*\'()[\\]]+';

  const KEY = {
    className: 'attr',
    variants: [
      { begin: /\w[\w :()\./-]*:(?=\s|$)/ },
      { begin: /"\w[\w :()\./-]*":(?=\s|$)/ },
      { begin: /'\w[\w :()\./-]*':(?=\s|$)/ },
    ]
  };

  const TEMPLATE_VARIABLES = {
    className: 'template-variable',
    variants: [
      { begin: /\{\{/, end: /\}\}/ },
      { begin: /%\{/, end: /\}/ }
    ]
  };

  const STRING = {
    className: 'string',
    relevance: 0,
    variants: [
      { begin: /'/, end: /'/ },
      { begin: /"/, end: /"/ },
      { begin: /\S+/ }
    ],
    contains: [
      hljs.BACKSLASH_ESCAPE,
      TEMPLATE_VARIABLES
    ]
  };

  const CONTAINER_STRING = hljs.inherit(STRING, {
    variants: [
      { begin: /'/, end: /'/ },
      { begin: /"/, end: /"/ },
      { begin: /[^\s,{}[\]]+/ }
    ]
  });

  const DATE_RE = '[0-9]{4}(-[0-9][0-9]){0,2}';
  const TIME_RE = '([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?';
  const FRACTION_RE = '(\\.[0-9]*)?';
  const ZONE_RE = '([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?';
  const TIMESTAMP = {
    className: 'number',
    begin: '\\b' + DATE_RE + TIME_RE + FRACTION_RE + ZONE_RE + '\\b'
  };

  const VALUE_CONTAINER = {
    end: ',',
    endsWithParent: true,
    excludeEnd: true,
    keywords: LITERALS,
    relevance: 0
  };

  const OBJECT = {
    begin: /\{/,
    end: /\}/,
    contains: [VALUE_CONTAINER],
    illegal: '\\n',
    relevance: 0
  };

  const ARRAY = {
    begin: '\\[',
    end: '\\]',
    contains: [VALUE_CONTAINER],
    illegal: '\\n',
    relevance: 0
  };

  // Optimized block scalar handling to avoid polynomial backtracking
  const BLOCK_SCALAR = {
    className: 'string',
    begin: /[|>][-+\d]*\s*$/, // Block scalar indicator with modifiers
    contains: [
      {
        begin: /^\s+/,  // Indented block content
        relevance: 0
      }
    ]
  };

  const MODES = [
    KEY,
    {
      className: 'meta',
      begin: '^---\\s*$',
      relevance: 10
    },
    BLOCK_SCALAR, // Handle block scalars (| or >)
    {
      className: 'string',
      begin: '[\\|>]([-+]?[0-9]*)?[ ]*\\n', // Support for block string indicators
      relevance: 0
    },
    {
      begin: '<%[%=-]?',
      end: '[%-]?%>',
      subLanguage: 'ruby',
      excludeBegin: true,
      excludeEnd: true,
      relevance: 0
    },
    {
      className: 'type',
      begin: '!\\w+!' + URI_CHARACTERS
    },
    {
      className: 'type',
      begin: '!<' + URI_CHARACTERS + '>'
    },
    {
      className: 'type',
      begin: '!' + URI_CHARACTERS
    },
    {
      className: 'type',
      begin: '!!' + URI_CHARACTERS
    },
    {
      className: 'meta',
      begin: '&' + hljs.UNDERSCORE_IDENT_RE + '$'
    },
    {
      className: 'meta',
      begin: '\\*' + hljs.UNDERSCORE_IDENT_RE + '$'
    },
    {
      className: 'bullet',
      begin: '-(?=[ ]|$)',
      relevance: 0
    },
    hljs.HASH_COMMENT_MODE,
    {
      beginKeywords: LITERALS,
      keywords: { literal: LITERALS }
    },
    TIMESTAMP,
    {
      className: 'number',
      begin: hljs.C_NUMBER_RE + '\\b',
      relevance: 0
    },
    OBJECT,
    ARRAY,
    STRING
  ];

  const VALUE_MODES = [...MODES];
  VALUE_MODES.pop();
  VALUE_MODES.push(CONTAINER_STRING);
  VALUE_CONTAINER.contains = VALUE_MODES;

  return {
    name: 'YAML',
    case_insensitive: true,
    aliases: ['yml'],
    contains: MODES
  };
}
