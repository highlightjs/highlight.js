/*
Language: Less
Description: It's CSS, with just a little more.
Author:   Max Mikhailov <seven.phases.max@gmail.com>
Website: http://lesscss.org
Category: css, web
*/

import * as css from "./lib/css-shared.js";

/** @type LanguageFn */
export default function(hljs) {
  const modes = css.MODES(hljs);
  const PSEUDO_SELECTORS = css.PSEUDO_SELECTORS;

  const AT_MODIFIERS = "and or not only";
  const IDENT_RE = '[\\w-]+'; // yes, Less identifiers may begin with a digit
  const INTERP_IDENT_RE = '(' + IDENT_RE + '|@\\{' + IDENT_RE + '\\})';

  /* Generic Modes */

  const RULES = []; const VALUE_MODES = []; // forward def. for recursive modes

  const STRING_MODE = function(c) {
    return {
    // Less strings are not multiline (also include '~' for more consistent coloring of "escaped" strings)
      className: 'string',
      begin: '~?' + c + '.*?' + c
    };
  };

  const IDENT_MODE = function(name, begin) {
    return {
      className: name,
      begin: begin
    };
  };

  const AT_KEYWORDS = {
    $pattern: /[a-z-]+/,
    keyword: AT_MODIFIERS,
    attribute: css.MEDIA_FEATURES.join(" ")
  };

  const PARENS_MODE = {
    // used only to properly balance nested parens inside mixin call, def. arg list
    begin: '\\(',
    end: '\\)',
    contains: VALUE_MODES,
    keywords: AT_KEYWORDS
  };

  // generic Less highlighter (used almost everywhere except selectors):
  VALUE_MODES.push(
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    STRING_MODE("'"),
    STRING_MODE('"'),
    modes.CSS_NUMBER_MODE, // fixme: it does not include dot for numbers like .5em :(
    {
      begin: '(url|data-uri)\\(',
      starts: {
        className: 'string',
        end: '[\\)\\n]',
        excludeEnd: true
      }
    },
    modes.HEXCOLOR,
    PARENS_MODE,
    IDENT_MODE('variable', '@@?' + IDENT_RE),
    IDENT_MODE('variable', '@\\{' + IDENT_RE + '\\}'),
    IDENT_MODE('built_in', '~?`[^`]*?`'), // inline javascript (or whatever host language) *multiline* string
    { // @media features (it’s here to not duplicate things in AT_RULE_MODE with extra PARENS_MODE overriding):
      className: 'attribute',
      begin: IDENT_RE + '\\s*:',
      end: ':',
      returnBegin: true,
      excludeEnd: true
    },
    modes.IMPORTANT,
    { beginKeywords: 'and not' },
    modes.FUNCTION_DISPATCH
  );

  const VALUE_WITH_RULESETS = VALUE_MODES.concat({
    begin: /\{/,
    end: /\}/,
    contains: RULES
  });

  const MIXIN_GUARD_MODE = {
    beginKeywords: 'when',
    endsWithParent: true,
    contains: [ { beginKeywords: 'and not' } ].concat(VALUE_MODES) // using this form to override VALUE’s 'function' match
  };

  /* Rule-Level Modes */

  const RULE_MODE = {
    begin: INTERP_IDENT_RE + '\\s*:',
    returnBegin: true,
    end: /[;}]/,
    contains: [
      { begin: /-(webkit|moz|ms|o)-/ },
      modes.CSS_VARIABLE,
      {
        className: 'attribute',
        begin: '\\b(' + css.ATTRIBUTES.join('|') + ')\\b',
        end: /(?=:)/,
        starts: {
          endsWithParent: true,
          illegal: '[<=$]',
          contains: VALUE_MODES
        }
      }
    ]
  };

  const AT_RULE_MODE = {
    className: 'keyword',
    begin: '@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b',
    starts: {
      end: '[;{}]',
      keywords: AT_KEYWORDS,
      returnEnd: true,
      contains: VALUE_MODES
    }
  };

  // variable definitions and calls
  const VAR_RULE_MODE = {
    className: 'variable',
    variants: [
      // using more strict pattern for higher relevance to increase chances of Less detection.
      // this is *the only* Less specific statement used in most of the sources, so...
      // (we’ll still often loose to the css-parser unless there's '//' comment,
      // simply because 1 variable just can't beat 99 properties :)
      {
        begin: '@' + IDENT_RE + '\\s*:'
      },
      { begin: '@' + IDENT_RE }
    ],
    starts: {
      end: '[;}]',
      returnEnd: true,
      contains: VALUE_WITH_RULESETS
    }
  };

  const SELECTOR_MODE = {
    // first parse unambiguous selectors (i.e. those not starting with tag)
    // then fall into the scary lookahead-discriminator variant.
    // this mode also handles mixin definitions and calls
    variants: [
      {
        begin: '[\\.#:&\\[>]',
        end: '[;{}]' // mixin calls end with ';'
      },
      {
        begin: INTERP_IDENT_RE,
        end: /\{/
      }
    ],
    returnBegin: true,
    returnEnd: true,
    illegal: '[<=\'$"]',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      MIXIN_GUARD_MODE,
      IDENT_MODE('keyword', 'all\\b'),
      IDENT_MODE('variable', '@\\{' + IDENT_RE + '\\}'), // otherwise it’s identified as tag

      {
        begin: '\\b(' + css.TAGS.join('|') + ')\\b',
        className: 'selector-tag'
      },
      modes.CSS_NUMBER_MODE,
      IDENT_MODE('selector-tag', INTERP_IDENT_RE),
      IDENT_MODE('selector-id', '#' + INTERP_IDENT_RE),
      IDENT_MODE('selector-class', '\\.' + INTERP_IDENT_RE),
      IDENT_MODE('selector-tag', '&'),
      modes.ATTRIBUTE_SELECTOR_MODE,
      {
        className: 'selector-pseudo',
        begin: ':(' + css.PSEUDO_CLASSES.join('|') + ')'
      },
      {
        className: 'selector-pseudo',
        begin: ':(:)?(' + css.PSEUDO_ELEMENTS.join('|') + ')'
      },
      {
        begin: /\(/,
        end: /\)/,
        contains: VALUE_WITH_RULESETS
      }, // argument list of parametric mixins
      { begin: '!important' }, // eat !important after mixin call or it will be colored as tag
      modes.FUNCTION_DISPATCH
    ]
  };

  const PSEUDO_SELECTOR_MODE = {
    begin: IDENT_RE + ':(:)?' + `(${PSEUDO_SELECTORS.join('|')})`,
    returnBegin: true,
    contains: [ SELECTOR_MODE ]
  };

  RULES.push(
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    AT_RULE_MODE,
    VAR_RULE_MODE,
    PSEUDO_SELECTOR_MODE,
    RULE_MODE,
    SELECTOR_MODE,
    MIXIN_GUARD_MODE,
    modes.FUNCTION_DISPATCH
  );

  return {
    name: 'Less',
    case_insensitive: true,
    illegal: '[=>\'/<($"]',
    contains: RULES
  };
}
