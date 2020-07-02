/*
Language: TOML, also INI
Description: TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics.
Contributors: Guillaume Gomez <guillaume1.gomez@gmail.com>
Category: common, config
Website: https://github.com/toml-lang/toml
*/

import * as regex from '../lib/regex.js';

export default function(hljs) {
  var NUMBERS = {
    className: 'number',
    relevance: 0,
    variants: [
      { begin: /([\+\-]+)?[\d]+_[\d_]+/ },
      { begin: hljs.NUMBER_RE }
    ]
  };
  var COMMENTS = hljs.COMMENT();
  COMMENTS.variants = [
    {begin: /;/, end: /$/},
    {begin: /#/, end: /$/},
  ];
  var VARIABLES = {
    className: 'variable',
    variants: [
      { begin: /\$[\w\d"][\w\d_]*/ },
      { begin: /\$\{(.*?)}/ }
    ]
  };
  var LITERALS = {
    className: 'literal',
    begin: /\bon|off|true|false|yes|no\b/
  };
  var STRINGS = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      { begin: "'''", end: "'''", relevance: 10 },
      { begin: '"""', end: '"""', relevance: 10 },
      { begin: '"', end: '"' },
      { begin: "'", end: "'" }
    ]
  };
  var ARRAY = {
    begin: /\[/, end: /\]/,
    contains: [
      COMMENTS,
      LITERALS,
      VARIABLES,
      STRINGS,
      NUMBERS,
      'self'
    ],
    relevance:0
  };

  var BARE_KEY = /[A-Za-z0-9_-]+/;
  var QUOTED_KEY_DOUBLE_QUOTE = /"(\\"|[^"])*"/;
  var QUOTED_KEY_SINGLE_QUOTE = /'[^']*'/;
  var ANY_KEY = regex.either(
    BARE_KEY, QUOTED_KEY_DOUBLE_QUOTE, QUOTED_KEY_SINGLE_QUOTE
  );
  var DOTTED_KEY = regex.concat(
    ANY_KEY, '(\\s*\\.\\s*', ANY_KEY, ')*',
    regex.lookahead(/\s*=\s*[^#\s]/)
  );

  return {
    name: 'TOML, also INI',
    aliases: ['toml'],
    case_insensitive: true,
    illegal: /\S/,
    contains: [
      COMMENTS,
      {
        className: 'section',
        begin: /\[+/, end: /\]+/
      },
      {
        begin: DOTTED_KEY,
        className: 'attr',
        starts: {
          end: /$/,
          contains: [
            COMMENTS,
            ARRAY,
            LITERALS,
            VARIABLES,
            STRINGS,
            NUMBERS
          ]
        }
      }
    ]
  };
}
