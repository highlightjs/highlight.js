/*
Language: regex
Description: Regular expressions 
Author: Konrad Rudolph <konrad.rudolph@gmail.com>
*/

export default function (hljs) {
  const ESCAPE_SEQUENCE = {
    className: 'built_in',
    begin: [
      // Unicode script/block/category
      /\\[pP](?:[^{]|\{\^?[^}]+\})/,
      // Unicode character
      /\\[ux](?:[0-9a-fA-F]{1,4}|\{[0-9a-fA-F]{1,4}\})/,
      // Backreferences
      /\\k(?:'-?\d+'|<-?\d+>|{-?\d+})/,
      /\\g(?:'-?\d+'|<-?\d+>|{-?\d+}|-?\d+)/,
      // Everything else
      /\\./
    ].map(r => r.source).join('|')
  };

  const CHARACTER_CLASS = {
    className: 'string',
    begin: /\[\^?]?/,
    end: /]/,
    contains: [
      {
        className: 'literal',
        variants: [
          // POSIX named character class.
          { begin: /\[:\^?/, end: /:]/ },
          // POSIX collation sequences.
          { begin: /\[\./, end: /\.]/ },
          // POSIX character equivalence.
          { begin: /\[=/, end: /=]/ }
        ]
      },
      ESCAPE_SEQUENCE
    ]
  };

  const META = {
    className: 'keyword',
    begin: /[.+*?|^$]|\{[^}]+\}/,
  };

  const COMMENT = hljs.COMMENT(/\(#/, /\)/);

  const MODIFIERS = '-?(?:[ictsmnpdJUbqX^]|xx?)';

  const GROUP_SPECIALS = [
    // Named group
    'P?<[^>]+>',
    "'[^']+'",
    // Zero-length assertions, branch reset & atomic
    '[|>=!]|<=|<!',
    // Modifiers applied inside group
    `(?:${MODIFIERS}):`,
    ':'
  ];

  const MODIFIER = {
    className: 'meta',
    begin: `\\(\\?(?:${MODIFIERS})\\)`
  };

  const GROUP_BEGIN = {
    className: 'keyword',
    begin: `\\((?:\\?(?:${GROUP_SPECIALS.join('|')}))?`
  };

  const GROUP_END = {
    className: 'keyword',
    begin: /\)/
  };

  return {
    name: 'regex',
    aliases: ['re', 'regexp'],

    contains: [
      ESCAPE_SEQUENCE,
      CHARACTER_CLASS,
      META,
      COMMENT,
      MODIFIER,
      GROUP_BEGIN,
      GROUP_END
    ]
  };
};
