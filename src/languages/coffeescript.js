/*
Language: CoffeeScript
Author: Dmytrii Nagirniak <dnagir@gmail.com>
Contributors: Oleg Efimov <efimovov@gmail.com>, Cédric Néhémie <cedric.nehemie@gmail.com>
Description: CoffeeScript is a programming language that transcompiles to JavaScript. For info about language see http://coffeescript.org/
Category: scripting
Website: https://coffeescript.org
*/

import * as ECMAScript from './lib/ecmascript.js';

/** @type LanguageFn */
export default function(hljs) {
  const COFFEE_BUILT_INS = [
    'npm',
    'print'
  ];
  const COFFEE_LITERALS = [
    'yes',
    'no',
    'on',
    'off'
  ];
  const COFFEE_KEYWORDS = [
    'then',
    'unless',
    'until',
    'loop',
    'by',
    'when',
    'and',
    'or',
    'is',
    'isnt',
    'not'
  ];
  const NOT_VALID_KEYWORDS = [
    "var",
    "const",
    "let",
    "function",
    "static"
  ];
  const excluding = (list) =>
    (kw) => !list.includes(kw);
  const KEYWORDS = {
    keyword: ECMAScript.KEYWORDS.concat(COFFEE_KEYWORDS).filter(excluding(NOT_VALID_KEYWORDS)),
    literal: ECMAScript.LITERALS.concat(COFFEE_LITERALS),
    built_in: ECMAScript.BUILT_INS.concat(COFFEE_BUILT_INS)
  };
  const JS_IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
  const SUBST = {
    className: 'subst',
    begin: /#\{/,
    end: /\}/,
    keywords: KEYWORDS
  };
  const EXPRESSIONS = [
    hljs.BINARY_NUMBER_MODE,
    hljs.inherit(hljs.C_NUMBER_MODE, { starts: {
      end: '(\\s*/)?'
    } }), // a number tries to eat the following slash to prevent treating it as a regexp
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
            SUBST
          ]
        },
        {
          begin: /"/,
          end: /"/,
          contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST
          ]
        }
      ]
    },
    {
      className: 'regexp',
      variants: [
        {
          begin: '///',
          end: '///',
          contains: [
            SUBST,
            hljs.HASH_COMMENT_MODE
          ]
        },
        {
          begin: '//[gim]{0,3}(?=\\W)'
        },
        {
          // regex can't start with space to parse x / 2 / 3 as two divisions
          // regex can't start with *, and it supports an "illegal" in the main mode
          begin: /\/(?![ *]).*?(?![\\]).\/[gim]{0,3}(?=\W)/ }
      ]
    },
    { begin: '@' + JS_IDENT_RE // relevance booster
    },
    {
      subLanguage: 'javascript',
      excludeBegin: true,
      excludeEnd: true,
      variants: [
        {
          begin: '```',
          end: '```'
        },
        {
          begin: '`',
          end: '`'
        }
      ]
    }
  ];
  SUBST.contains = EXPRESSIONS;

  const TITLE_FUNCTION = hljs.inherit(hljs.TITLE_MODE, { begin: JS_IDENT_RE, scope: "title.function" });
  const POSSIBLE_PARAMS_RE = '(\\(.*\\)\\s*)?\\B[-=]>';
  const PARAMS = {
    className: 'params',
    begin: '\\([^\\(]',
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
    name: 'CoffeeScript',
    aliases: [
      'coffee',
      'cson',
      'iced'
    ],
    keywords: KEYWORDS,
    illegal: /\/\*/,
    contains: [
      ...EXPRESSIONS,
      hljs.COMMENT('###', '###'),
      hljs.HASH_COMMENT_MODE,
      {
        begin: '^\\s*' + JS_IDENT_RE + '\\s*=\\s*' + POSSIBLE_PARAMS_RE,
        end: '[-=]>',
        returnBegin: true,
        contains: [
          TITLE_FUNCTION,
          PARAMS
        ]
      },
      {
        // anonymous function start
        begin: /[:\(,=]\s*/,
        contains: [
          {
            begin: POSSIBLE_PARAMS_RE,
            end: '[-=]>',
            returnBegin: true,
            contains: [ PARAMS ]
          }
        ]
      },
      CLASS_DEFINITION,
      {
        relevance: 1,
        match: /constructor(?=:)/
      },
      {
        match: JS_IDENT_RE + '(?=:)',
      }
    ]
  };
}
