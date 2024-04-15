/*
 Language: G-code (ISO 6983)
 Contributors: Adam Joseph Cook <adam.joseph.cook@gmail.com>
 Description: G-code syntax highlighter for Fanuc and other common CNC machine tool controls.
 Website: https://www.sis.se/api/document/preview/911952/
 Category: hardware
 */

export default function(hljs) {
  const regex = hljs.regex;
  const GCODE_KEYWORDS = {
    $pattern: /[A-Z]+|%/,
    keywords: [
      // conditions
      'THEN',
      'ELSE',
      'ENDIF',
      'IF',

      // controls
      'GOTO',
      'DO',
      'WHILE',
      'WH',
      'END',
      'CALL',

      // scoping
      'SUB',
      'ENDSUB',

      // comparisons
      'EQ',
      'NE',
      'LT',
      'GT',
      'LE',
      'GE',
      'AND',
      'OR',
      'XOR',

      // start/end of program
      '%'
    ],
    built_in: [
      'ATAN',
      'ABS',
      'ACOS',
      'ASIN',
      'COS',
      'EXP',
      'FIX',
      'FUP',
      'ROUND',
      'LN',
      'SIN',
      'SQRT',
      'TAN',
      'EXISTS'
    ]
  };


  const LETTER_BOUNDARY_RE = /(?<![A-Z])/;
  const NUMBER_RE = /[+-]?((\.\d+)|(\d+)(\.\d*)?)/;

  const GCODE_CODE = [
    // comments
    hljs.COMMENT(/\(/, /\)/),
    hljs.COMMENT(/;/, /$/),
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.C_NUMBER_MODE,

    // gcodes
    {
      scope: 'title.function',
      variants: [
        // G General functions: G0, G5.1, G5.2, …
        // M Misc functions: M0, M55.6, M199, …
        { match: regex.concat(LETTER_BOUNDARY_RE, /[GM]\s*\d+(\.\d+)?/) },
        // T Tools
        { match: regex.concat(LETTER_BOUNDARY_RE, /T\s*\d+/) }
      ]
    },

    {
      scope: 'symbol',
      variants: [
        // O Subroutine ID: O100, O110, …
        { match: regex.concat(LETTER_BOUNDARY_RE, /O\s*\d+/) },
        // O Subroutine name: O<some>, …
        { match: regex.concat(LETTER_BOUNDARY_RE, /O<.+>/) },
        // Checksum at end of line: *71, *199, …
        { match: /\*\s*\d+\s*$/ }
      ]
    },

    {
      scope: 'operator', // N Line number: N1, N2, N1020, …
      match: /^N\s*\d+/
    },

    {
      scope: 'variable',
      match: /-?#\s*\d+/
    },

    {
      scope: 'property', // Physical axes
      match: regex.concat(LETTER_BOUNDARY_RE, /[ABCUVWXYZ]\s*/, NUMBER_RE)
    },

    {
      scope: 'params', // Different types of parameters
      match: regex.concat(LETTER_BOUNDARY_RE, /[FHIJKPQRS]\s*/, NUMBER_RE)
    },
  ];

  return {
    name: 'G-code (ISO 6983)',
    aliases: [ 'nc' ],
    // Some implementations (CNC controls) of G-code are interoperable with uppercase and lowercase letters seamlessly.
    // However, most prefer all uppercase and uppercase is customary.
    case_insensitive: true,
    keywords: GCODE_KEYWORDS,
    contains: GCODE_CODE
  };
}
