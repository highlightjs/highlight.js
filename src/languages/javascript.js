/*
Language: JavaScript
Description: JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.
Category: common, scripting, web
Website: https://developer.mozilla.org/en-US/docs/Web/JavaScript
*/

import * as ECMAScript from './lib/ecmascript.js';

/** @type LanguageFn */
export default function(hljs) {
  const regex = hljs.regex;
  /**
   * Takes a string like "<Booger" and checks to see
   * if we can find a matching "</Booger" later in the
   * content.
   * @param {RegExpMatchArray} match
   * @param {{after:number}} param1
   */
  const hasClosingTag = (match, { after }) => {
    const tag = "</" + match[0].slice(1);
    const pos = match.input.indexOf(tag, after);
    return pos !== -1;
  };

  const IDENT_RE = ECMAScript.IDENT_RE;
  // JSX tag names: Component, div, ns:tag, member.tag, dashes
  const JSX_TAG_NAME_RE = /[A-Za-z_$][\w$.:-]*/;
  /**
   * Scan forward from `<` to find this tag's terminator (`>` or `/>`),
   * skipping strings, comments, and `{...}` expressions so `=>` etc. do not
   * false-trigger.
   * @param {string} input
   * @param {number} from index of `<`
   * @returns {{end: number, selfClosing: boolean} | null}
   */
  const scanJsxTagEnd = (input, from) => {
    let i = from + 1; // after <
    // skip / of closing tag
    if (input[i] === '/') i++;
    let depth = 0;
    let quote = /** @type {string | null} */ (null);
    while (i < input.length) {
      const c = input[i];
      if (quote) {
        if (c === '\\') {
          i += 2;
          continue;
        }
        if (c === quote) quote = null;
        i++;
        continue;
      }
      if (c === '"' || c === "'") {
        quote = c;
        i++;
        continue;
      }
      if (c === '{') {
        depth++;
        i++;
        continue;
      }
      if (c === '}') {
        if (depth > 0) depth--;
        i++;
        continue;
      }
      if (depth > 0) {
        i++;
        continue;
      }
      // line comment inside tag
      if (c === '/' && input[i + 1] === '/') {
        const nl = input.indexOf('\n', i);
        i = nl === -1 ? input.length : nl;
        continue;
      }
      // block comment inside tag
      if (c === '/' && input[i + 1] === '*') {
        const end = input.indexOf('*/', i + 2);
        i = end === -1 ? input.length : end + 2;
        continue;
      }
      if (c === '<' ) {
        // nested `<` is not valid here for our purposes
        return null;
      }
      if (c === '>') {
        return { end: i, selfClosing: false };
      }
      if (c === '/' && input[i + 1] === '>') {
        return { end: i + 1, selfClosing: true };
      }
      i++;
    }
    return null;
  };

  /**
   * Discriminate JSX tags from TypeScript generics / comparisons.
   * `match` is the leading `<` only (name is a child mode).
   * @param {RegExpMatchArray} match
   * @param {CallbackResponse} response
   */
  const isTrulyOpeningTag = (match, response) => {
    const afterLt = match.input.slice(match.index + match[0].length);
    const nameMatch = afterLt.match(/^[A-Za-z_$][\w$.:-]*/);
    if (!nameMatch) {
      response.ignoreMatch();
      return;
    }
    const afterNameIndex = match.index + match[0].length + nameMatch[0].length;
    const nextChar = match.input[afterNameIndex];
    if (
      // nested type: `<Array<Array<number>>`
      nextChar === "<" ||
      // type params: `<T, A extends keyof T, V>`
      nextChar === ","
    ) {
      response.ignoreMatch();
      return;
    }

    // `<something>` — need a matching close tag later
    if (nextChar === ">") {
      // hasClosingTag expects match[0] like `<Name`
      const fakeMatch = {
        0: match.input.slice(match.index, afterNameIndex),
        input: match.input,
        index: match.index
      };
      if (!hasClosingTag(/** @type {any} */ (fakeMatch), { after: afterNameIndex })) {
        response.ignoreMatch();
      }
      return;
    }

    const afterName = match.input.substring(afterNameIndex);

    // `<T = any>(key?: string) => ...`
    if (afterName.match(/^\s*=/)) {
      response.ignoreMatch();
      return;
    }

    // `<From extends string>` (https://github.com/highlightjs/highlight.js/issues/3276)
    const extendsMatch = afterName.match(/^\s+extends\s+/);
    if (extendsMatch && extendsMatch.index === 0) {
      response.ignoreMatch();
    }
  };
  const KEYWORDS = {
    $pattern: ECMAScript.IDENT_RE,
    keyword: ECMAScript.KEYWORDS,
    literal: ECMAScript.LITERALS,
    built_in: ECMAScript.BUILT_INS,
    "variable.language": ECMAScript.BUILT_IN_VARIABLES
  };

  // https://tc39.es/ecma262/#sec-literals-numeric-literals
  const decimalDigits = '[0-9](_?[0-9])*';
  const frac = `\\.(${decimalDigits})`;
  // DecimalIntegerLiteral, including Annex B NonOctalDecimalIntegerLiteral
  // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
  const NUMBER = {
    className: 'number',
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))` +
        `[eE][+-]?(${decimalDigits})\\b` },
      { begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b` },

      // DecimalBigIntegerLiteral
      { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },

      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },

      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" },
    ],
    relevance: 0
  };

  const SUBST = {
    className: 'subst',
    begin: '\\$\\{',
    end: '\\}',
    keywords: KEYWORDS,
    contains: [] // defined later
  };
  const HTML_TEMPLATE = {
    begin: '\.?html`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: 'xml'
    }
  };
  const CSS_TEMPLATE = {
    begin: '\.?css`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: 'css'
    }
  };
  const GRAPHQL_TEMPLATE = {
    begin: '\.?gql`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: 'graphql'
    }
  };
  const TEMPLATE_STRING = {
    className: 'string',
    begin: '`',
    end: '`',
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  const JSDOC_COMMENT = hljs.COMMENT(
    /\/\*\*(?!\/)/,
    '\\*/',
    {
      relevance: 0,
      contains: [
        {
          begin: '(?=@[A-Za-z]+)',
          relevance: 0,
          contains: [
            {
              className: 'doctag',
              begin: '@[A-Za-z]+'
            },
            {
              className: 'type',
              begin: '\\{',
              end: '\\}',
              excludeEnd: true,
              excludeBegin: true,
              relevance: 0
            },
            {
              className: 'variable',
              begin: IDENT_RE + '(?=\\s*(-)|$)',
              endsParent: true,
              relevance: 0
            },
            // eat spaces (not newlines) so we can find
            // types or variables
            {
              begin: /(?=[^\n])\s/,
              relevance: 0
            }
          ]
        }
      ]
    }
  );
  const COMMENT = {
    className: "comment",
    variants: [
      JSDOC_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE
    ]
  };
  const SUBST_INTERNALS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    GRAPHQL_TEMPLATE,
    TEMPLATE_STRING,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    NUMBER,
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  SUBST.contains = SUBST_INTERNALS
    .concat({
      // we need to pair up {} inside our subst to prevent
      // it from ending too early by matching another }
      begin: /\{/,
      end: /\}/,
      keywords: KEYWORDS,
      contains: [
        "self"
      ].concat(SUBST_INTERNALS)
    });
  const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: KEYWORDS,
      contains: ["self"].concat(SUBST_AND_COMMENTS)
    }
  ]);
  const PARAMS = {
    className: 'params',
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/, // to match the parms with
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS,
    contains: PARAMS_CONTAINS
  };

  // ES6 classes
  const CLASS_OR_EXTENDS = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE,
          /\s+/,
          /extends/,
          /\s+/,
          regex.concat(IDENT_RE, "(", regex.concat(/\./, IDENT_RE), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      },

    ]
  };

  const CLASS_REFERENCE = {
    relevance: 0,
    match:
    regex.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/,
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...ECMAScript.TYPES,
        ...ECMAScript.ERROR_TYPES
      ]
    }
  };

  const USE_STRICT = {
    label: "use_strict",
    className: 'meta',
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  };

  const FUNCTION_DEFINITION = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          IDENT_RE,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [ PARAMS ],
    illegal: /%/
  };

  const UPPER_CASE_CONSTANT = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };

  function noneOf(list) {
    return regex.concat("(?!", list.join("|"), ")");
  }

  const FUNCTION_CALL = {
    match: regex.concat(
      /\b/,
      noneOf([
        ...ECMAScript.BUILT_IN_GLOBALS,
        "super",
        "import",
        "await",
      ].map(x => `${x}\\s*\\(`)),
      IDENT_RE, regex.lookahead(/\s*\(/)),
    className: "title.function",
    relevance: 0
  };

  const PROPERTY_ACCESS = {
    begin: regex.concat(/\./, regex.lookahead(
      regex.concat(IDENT_RE, /(?![0-9A-Za-z$_(])/)
    )),
    end: IDENT_RE,
    excludeBegin: true,
    keywords: "prototype",
    className: "property",
    relevance: 0
  };

  const GETTER_OR_SETTER = {
    match: [
      /get|set/,
      /\s+/,
      IDENT_RE,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      { // eat to avoid empty params
        begin: /\(\)/
      },
      PARAMS
    ]
  };

  const FUNC_LEAD_IN_RE = '(\\(' +
    '[^()]*(\\(' +
    '[^()]*(\\(' +
    '[^()]*' +
    '\\)[^()]*)*' +
    '\\)[^()]*)*' +
    '\\)|' + hljs.UNDERSCORE_IDENT_RE + ')\\s*=>';

  const FUNCTION_VARIABLE = {
    match: [
      /const|var|let/, /\s+/,
      IDENT_RE, /\s*/,
      /=\s*/,
      /(async\s*)?/, // async is optional
      regex.lookahead(FUNC_LEAD_IN_RE)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      PARAMS
    ]
  };

  // Native JSX (not xml sublanguage): tags, attrs, // and /* */ inside open
  // tags, and {...} expressions that re-enter JS (including nested JSX).
  //
  // Pairing model: open tag mode `starts` a children mode; the children mode
  // ends via endsParent on the matching close tag. Nested elements are full
  // child modes (not bare open/close), so </child> cannot terminate <parent>.
  const JSX_ELEMENT = { variants: [] };

  const JSX_EXPRESSION = {
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS,
    contains: [
      COMMENT,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      TEMPLATE_STRING,
      { match: /\$\d+/ },
      NUMBER,
      {
        className: 'function',
        begin: FUNC_LEAD_IN_RE,
        returnBegin: true,
        end: '\\s*=>',
        contains: [
          {
            className: 'params',
            variants: [
              {
                begin: hljs.UNDERSCORE_IDENT_RE,
                relevance: 0
              },
              {
                className: null,
                begin: /\(\s*\)/,
                skip: true
              },
              {
                begin: /(\s*)\(/,
                end: /\)/,
                excludeBegin: true,
                excludeEnd: true,
                keywords: KEYWORDS,
                contains: PARAMS_CONTAINS
              }
            ]
          }
        ]
      },
      PROPERTY_ACCESS,
      FUNCTION_CALL,
      CLASS_REFERENCE,
      UPPER_CASE_CONSTANT,
      JSX_ELEMENT,
      // nested braces (objects, blocks)
      "self"
    ]
  };

  const JSX_TAG_INTERNALS = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [
      COMMENT,
      {
        className: 'attr',
        begin: JSX_TAG_NAME_RE,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        endsWithParent: true,
        contains: [
          {
            className: 'string',
            endsParent: true,
            variants: [
              { begin: /"/, end: /"/ },
              { begin: /'/, end: /'/ }
            ]
          },
          JSX_EXPRESSION
        ]
      }
    ]
  };

  const JSX_CLOSE_TAG = {
    className: 'tag',
    begin: regex.concat(
      /<\//,
      regex.lookahead(regex.concat(JSX_TAG_NAME_RE, />/))
    ),
    end: />/,
    endsParent: true,
    contains: [
      {
        className: 'name',
        begin: JSX_TAG_NAME_RE,
        relevance: 0
      }
    ]
  };

  /**
   * @param {boolean} selfClosing
   * @param {boolean} paired after `>` continue into children until close tag
   */
  const jsxOpenTag = (selfClosing, paired) => {
    /** @type {Mode} */
    const mode = {
      className: 'tag',
      begin: regex.concat(
        /</,
        regex.lookahead(JSX_TAG_NAME_RE)
      ),
      end: selfClosing ? /\/>/ : />/,
      contains: [
        {
          className: 'name',
          begin: JSX_TAG_NAME_RE,
          relevance: 0,
          starts: JSX_TAG_INTERNALS
        }
      ],
      'on:begin': (match, response) => {
        isTrulyOpeningTag(match, response);
        if (response.isMatchIgnored) return;
        const scanned = scanJsxTagEnd(match.input, match.index);
        if (!scanned) {
          response.ignoreMatch();
          return;
        }
        if (selfClosing && !scanned.selfClosing) response.ignoreMatch();
        if (paired && scanned.selfClosing) response.ignoreMatch();
      }
    };
    if (paired) {
      mode.starts = {
        end: hljs.MATCH_NOTHING_RE,
        contains: [
          JSX_EXPRESSION,
          JSX_ELEMENT,
          JSX_CLOSE_TAG
        ]
      };
    }
    return mode;
  };

  const JSX_SELF_CLOSING_TAG = jsxOpenTag(true, false);
  const JSX_PAIRED_TAG = jsxOpenTag(false, true);

  JSX_ELEMENT.variants = [
    {
      // <> children </>
      className: 'tag',
      begin: /<>/,
      starts: {
        end: hljs.MATCH_NOTHING_RE,
        contains: [
          JSX_EXPRESSION,
          JSX_ELEMENT,
          {
            className: 'tag',
            begin: /<\/>/,
            endsParent: true
          }
        ]
      }
    },
    JSX_SELF_CLOSING_TAG,
    JSX_PAIRED_TAG
  ];

  const JSX = JSX_ELEMENT;

  return {
    name: 'JavaScript',
    aliases: ['js', 'jsx', 'mjs', 'cjs'],
    keywords: KEYWORDS,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS, CLASS_REFERENCE },
    illegal: /#(?![$_A-Za-z])/,
    contains: [
      hljs.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      USE_STRICT,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      GRAPHQL_TEMPLATE,
      TEMPLATE_STRING,
      COMMENT,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      NUMBER,
      CLASS_REFERENCE,
      {
        scope: 'attr',
        match: IDENT_RE + regex.lookahead(':'),
        relevance: 0
      },
      FUNCTION_VARIABLE,
      { // "value" container
        begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
        keywords: 'return throw case',
        relevance: 0,
        contains: [
          COMMENT,
          hljs.REGEXP_MODE,
          {
            className: 'function',
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: FUNC_LEAD_IN_RE,
            returnBegin: true,
            end: '\\s*=>',
            contains: [
              {
                className: 'params',
                variants: [
                  {
                    begin: hljs.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: true
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: KEYWORDS,
                    contains: PARAMS_CONTAINS
                  }
                ]
              }
            ]
          },
          { // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          JSX
        ],
      },
      FUNCTION_DEFINITION,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: '\\b(?!function)' + hljs.UNDERSCORE_IDENT_RE +
          '\\(' + // first parens
          '[^()]*(\\(' +
            '[^()]*(\\(' +
              '[^()]*' +
            '\\)[^()]*)*' +
          '\\)[^()]*)*' +
          '\\)\\s*\\{', // end parens
        returnBegin:true,
        label: "func.def",
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      PROPERTY_ACCESS,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: '\\$' + IDENT_RE,
        relevance: 0
      },
      {
        match: [ /\bconstructor(?=\s*\()/ ],
        className: { 1: "title.function" },
        contains: [ PARAMS ]
      },
      FUNCTION_CALL,
      UPPER_CASE_CONSTANT,
      CLASS_OR_EXTENDS,
      GETTER_OR_SETTER,
      {
        match: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
