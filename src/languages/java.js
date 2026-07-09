/*
Language: Java
Author: Vsevolod Solovyov <vsevolod.solovyov@gmail.com>
Category: common, enterprise
Website: https://www.java.com/
*/

import { NUMERIC as NUMBER } from "./lib/java.js";

/**
 * Allows recursive regex expressions to a given depth
 *
 * ie: recurRegex("(abc~~~)", /~~~/g, 2) becomes:
 * (abc(abc(abc)))
 *
 * @param {string} re
 * @param {RegExp} substitution (should be a g mode regex)
 * @param {number} depth
 * @returns {string}``
 */
function recurRegex(re, substitution, depth) {
  if (depth === -1) return "";

  return re.replace(substitution, _ => {
    return recurRegex(re, substitution, depth - 1);
  });
}

/** @type LanguageFn */
export default function(hljs) {
  const regex = hljs.regex;

  // A Java identifier consisting of letters, digits, underscore or dollar sign, not beginning with a digit
  const JAVA_IDENT_RE = '[\u00C0-\u02B8a-zA-Z_$][\u00C0-\u02B8a-zA-Z_$0-9]*';

  // Optional 1..n pairs of square brackets identifying an array type
  const ARRAY_BRACKETS_OPTIONAL_RE = '(?:(?:\\s*\\[\\s*])+)?';

  // A simple Java type: a type name, optionally followed by type arguments and/or array brackets
  // '<@@@>' is replaced with the pattern for optional type arguments by recurRegex below.
  const SIMPLE_TYPE_RE = JAVA_IDENT_RE + '<@@@>' + ARRAY_BRACKETS_OPTIONAL_RE;

  // A bounded (? extends Number) or unbounded (?) wildcard type
  const WILDCARD_TYPE_RE = '\\?(?:\\s+(?:extends|super)\\s+' + SIMPLE_TYPE_RE + ')?';

  // A Java type argument, consisting of a wildcard type or type
  const TYPE_ARG_RE = '(?:' + WILDCARD_TYPE_RE + '|' + SIMPLE_TYPE_RE + ')';

  // Pattern for optional generic type arguments in angle brackets with up to 2 levels of nested type arguments
  const TYPE_ARGS_OPTIONAL_RE = recurRegex('(?:\\s*<\\s*' + TYPE_ARG_RE + '(?:\\s*,\\s*' + TYPE_ARG_RE + ')*\\s*>)?',
                                           /<@@@>/g, 2);

  const MAIN_KEYWORDS = [
    'synchronized',
    'abstract',
    'private',
    'var',
    'static',
    'if',
    'const ',
    'for',
    'while',
    'strictfp',
    'finally',
    'protected',
    'import',
    'native',
    'final',
    'void',
    'enum',
    'else',
    'break',
    'transient',
    'catch',
    'instanceof',
    'volatile',
    'case',
    'assert',
    'package',
    'default',
    'public',
    'try',
    'switch',
    'continue',
    'throws',
    'protected',
    'public',
    'private',
    'module',
    'requires',
    'exports',
    'do',
    'sealed',
    'yield',
    'permits',
    'goto',
    'when'
  ];

  const BUILT_INS = [
    'super',
    'this'
  ];

  const LITERALS = [
    'false',
    'true',
    'null'
  ];

  const TYPES = [
    'char',
    'boolean',
    'long',
    'float',
    'int',
    'byte',
    'short',
    'double'
  ];

  const KEYWORDS = {
    keyword: MAIN_KEYWORDS,
    literal: LITERALS,
    type: TYPES,
    built_in: BUILT_INS
  };

  const ANNOTATION = {
    className: 'meta',
    begin: '@' + JAVA_IDENT_RE,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        contains: [ "self" ] // allow nested () inside our annotation
      }
    ]
  };
  const PARAMS = {
    className: 'params',
    begin: /\(/,
    end: /\)/,
    keywords: KEYWORDS,
    relevance: 0,
    contains: [ hljs.C_BLOCK_COMMENT_MODE ],
    endsParent: true
  };

  return {
    name: 'Java',
    aliases: [ 'jsp' ],
    keywords: KEYWORDS,
    illegal: /<\/|#/,
    contains: [
      hljs.COMMENT(
        '/\\*\\*',
        '\\*/',
        {
          relevance: 0,
          contains: [
            {
              // eat up @'s in emails to prevent them to be recognized as doctags
              begin: /\w+@/,
              relevance: 0
            },
            {
              className: 'doctag',
              begin: '@[A-Za-z]+'
            }
          ]
        }
      ),
      // relevance boost
      {
        begin: /import java\.[a-z]+\./,
        keywords: "import",
        relevance: 2
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        begin: /"""/,
        end: /"""/,
        className: "string",
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        match: [
          /\b(?:class|interface|enum|extends|implements|new)/,
          /\s+/,
          JAVA_IDENT_RE
        ],
        className: {
          1: "keyword",
          3: "title.class"
        }
      },
      {
        // Exceptions for hyphenated keywords
        match: /non-sealed/,
        scope: "keyword"
      },
      {
        // Expression keywords prevent keyword-led expressions from being
        // recognized as variable or method declarations.
        beginKeywords: 'new throw return else yield assert',
        relevance: 0
      },
      {
        begin: [
          JAVA_IDENT_RE,
          regex.concat(TYPE_ARGS_OPTIONAL_RE, ARRAY_BRACKETS_OPTIONAL_RE, /\s+/),
          JAVA_IDENT_RE,
          ARRAY_BRACKETS_OPTIONAL_RE,
          /\s*/,
          /=(?!=)/
        ],
        className: {
          1: "type",
          3: "variable",
          6: "operator"
        }
      },
      {
        begin: [
          /record/,
          /\s+/,
          JAVA_IDENT_RE
        ],
        className: {
          1: "keyword",
          3: "title.class"
        },
        contains: [
          PARAMS,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        begin: [
          JAVA_IDENT_RE,
          regex.concat(TYPE_ARGS_OPTIONAL_RE, ARRAY_BRACKETS_OPTIONAL_RE, /\s+/),
          JAVA_IDENT_RE,
          /\s*(?=\()/
        ],
        className: {
          1: "type",
          3: "title.function"
        },
        keywords: KEYWORDS,
        contains: [
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              ANNOTATION,
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              NUMBER,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      NUMBER,
      ANNOTATION
    ]
  };
}
