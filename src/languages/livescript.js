/*
Language: LiveScript
Author: Taneli Vatanen <taneli.vatanen@gmail.com>
Contributors: Jen Evers-Corvina <jen@sevvie.net>
Origin: coffeescript.js
Description: LiveScript is a programming language that transcompiles to JavaScript. For info about language see http://livescript.net/
Website: https://livescript.net
Category: scripting
*/

import * as ECMAScript from './lib/ecmascript.js';

export default function(hljs) {
  const LIVESCRIPT_BUILT_INS = [
    'npm',
    'print'
  ];
  const LIVESCRIPT_LITERALS = [
    'yes',
    'no',
    'on',
    'off',
    'it',
    'that',
    'void'
  ];
  const LIVESCRIPT_KEYWORDS = [
    'then',
    'unless',
    'until',
    'loop',
    'of',
    'by',
    'when',
    'and',
    'or',
    'is',
    'isnt',
    'not',
    'it',
    'that',
    'otherwise',
    'from',
    'to',
    'til',
    'fallthrough',
    'case',
    'enum',
    'native',
    'list',
    'map',
    '__hasProp',
    '__extends',
    '__slice',
    '__bind',
    '__indexOf'
  ];
  const KEYWORDS = {
    keyword: ECMAScript.KEYWORDS.concat(LIVESCRIPT_KEYWORDS),
    literal: ECMAScript.LITERALS.concat(LIVESCRIPT_LITERALS),
    built_in: ECMAScript.BUILT_INS.concat(LIVESCRIPT_BUILT_INS)
  };
  const JS_IDENT_RE = '[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*';
  // The function and label patterns below are not anchored, so an unbounded
  // identifier or `(.*)` run is retried from every character of a long word
  // or every `(` of a long line, taking quadratic time (ReDoS), see issue
  // #4529. Bounding the runs keeps them linear; real identifiers and one-line
  // parameter lists are far shorter than these limits.
  const MAX_IDENT_LENGTH = 64;
  const MAX_PARAMS_LENGTH = 200;
  const BOUNDED_IDENT_RE = '[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_]){0,' + (MAX_IDENT_LENGTH - 1) + '}';
  const BOUNDED_PARAMS_RE = '\\(.{0,' + MAX_PARAMS_LENGTH + '}\\)';
  const TITLE = hljs.inherit(hljs.TITLE_MODE, { begin: JS_IDENT_RE });
  const SUBST = {
    className: 'subst',
    begin: /#\{/,
    end: /\}/,
    keywords: KEYWORDS
  };
  const SUBST_SIMPLE = {
    className: 'subst',
    begin: /#[A-Za-z$_]/,
    end: /(?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*/,
    keywords: KEYWORDS
  };
  const EXPRESSIONS = [
    hljs.BINARY_NUMBER_MODE,
    {
      className: 'number',
      begin: '(\\b0[xX][a-fA-F0-9_]+)|(\\b\\d(\\d|_\\d)*(\\.(\\d(\\d|_\\d)*)?)?(_*[eE]([-+]\\d(_\\d|\\d)*)?)?[_a-z]*)',
      relevance: 0,
      starts: {
        end: '(\\s*/)?',
        relevance: 0
      } // a number tries to eat the following slash to prevent treating it as a regexp
    },
    {
      className: 'string',
      variants: [
        {
          begin: /'''/,
          end: /'''/,
          contains: [ hljs.BACKSLASH_ESCAPE ]
        },
        {
          begin: /'/,
          end: /'/,
          contains: [ hljs.BACKSLASH_ESCAPE ]
        },
        {
          begin: /"""/,
          end: /"""/,
          contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST,
            SUBST_SIMPLE
          ]
        },
        {
          begin: /"/,
          end: /"/,
          contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST,
            SUBST_SIMPLE
          ]
        },
        {
          begin: /\\/,
          end: /(\s|$)/,
          excludeEnd: true
        }
      ]
    },
    {
      className: 'regexp',
      variants: [
        {
          begin: '//',
          end: '//[gim]*',
          contains: [
            SUBST,
            hljs.HASH_COMMENT_MODE
          ]
        },
        {
          // regex can't start with space to parse x / 2 / 3 as two divisions
          // regex can't start with *, and it supports an "illegal" in the main mode
          begin: /\/(?![ *])(\\.|[^\\\n])*?\/[gim]*(?=\W)/ }
      ]
    },
    { begin: '@' + JS_IDENT_RE },
    {
      begin: '``',
      end: '``',
      excludeBegin: true,
      excludeEnd: true,
      subLanguage: 'javascript'
    }
  ];
  SUBST.contains = EXPRESSIONS;

  const PARAMS = {
    className: 'params',
    begin: '\\(',
    returnBegin: true,
    /* We need another contained nameless mode to not have every nested
    pair of parens to be called "params" */
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS,
        contains: [ 'self' ].concat(EXPRESSIONS)
      }
    ]
  };

  const SYMBOLS = { begin: '(#=>|=>|\\|>>|-?->|!->)' };

  const CLASS_DEFINITION = {
    variants: [
      { match: [
        /class\s+/,
        JS_IDENT_RE,
        /\s+extends\s+/,
        JS_IDENT_RE
      ] },
      { match: [
        /class\s+/,
        JS_IDENT_RE
      ] }
    ],
    scope: {
      2: "title.class",
      4: "title.class.inherited"
    },
    keywords: KEYWORDS
  };

  return {
    name: 'LiveScript',
    aliases: [ 'ls' ],
    keywords: KEYWORDS,
    illegal: /\/\*/,
    contains: EXPRESSIONS.concat([
      hljs.COMMENT('\\/\\*', '\\*\\/'),
      hljs.HASH_COMMENT_MODE,
      SYMBOLS, // relevance booster
      {
        className: 'function',
        contains: [
          TITLE,
          PARAMS
        ],
        returnBegin: true,
        variants: [
          {
            begin: '(' + BOUNDED_IDENT_RE + '\\s*(?:=|:=)\\s*)?(' + BOUNDED_PARAMS_RE + '\\s*)?\\B->\\*?',
            end: '->\\*?'
          },
          {
            begin: '(' + BOUNDED_IDENT_RE + '\\s*(?:=|:=)\\s*)?!?(' + BOUNDED_PARAMS_RE + '\\s*)?\\B[-~]{1,2}>\\*?',
            end: '[-~]{1,2}>\\*?'
          },
          {
            begin: '(' + BOUNDED_IDENT_RE + '\\s*(?:=|:=)\\s*)?(' + BOUNDED_PARAMS_RE + '\\s*)?\\B!?[-~]{1,2}>\\*?',
            end: '!?[-~]{1,2}>\\*?'
          }
        ]
      },
      CLASS_DEFINITION,
      {
        begin: BOUNDED_IDENT_RE + ':',
        end: ':',
        returnBegin: true,
        returnEnd: true,
        relevance: 0
      }
    ])
  };
}
