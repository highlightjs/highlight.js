/*
Language: Stylus
Author: Bryant Williams <b.n.williams@gmail.com>
Description: Stylus is an expressive, robust, feature-rich CSS language built for nodejs.
Website: https://github.com/stylus/stylus
Category: css
*/

import * as css from "./lib/css-shared.js";

/** @type LanguageFn */
export default function(hljs) {
  const modes = css.MODES(hljs);

  const AT_MODIFIERS = "and or not only";
  const VARIABLE = {
    className: 'variable',
    begin: '\\$' + hljs.IDENT_RE
  };

  const AT_KEYWORDS = [
    'charset',
    'css',
    'debug',
    'extend',
    'font-face',
    'for',
    'import',
    'include',
    'keyframes',
    'media',
    'mixin',
    'page',
    'warn',
    'while'
  ];

  const LOOKAHEAD_TAG_END = '(?=[.\\s\\n[:,(])';

  // illegals
  const ILLEGAL = [
    '\\?',
    '(\\bReturn\\b)', // monkey
    '(\\bEnd\\b)', // monkey
    '(\\bend\\b)', // vbscript
    '(\\bdef\\b)', // gradle
    ';', // a whole lot of languages
    '#\\s', // markdown
    '\\*\\s', // markdown
    '===\\s', // markdown
    '\\|',
    '%' // prolog
  ];

  return {
    name: 'Stylus',
    aliases: [ 'styl' ],
    case_insensitive: false,
    keywords: 'if else for in',
    illegal: '(' + ILLEGAL.join('|') + ')',
    contains: [

      // strings
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,

      // comments
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,

      // hex colors
      modes.HEXCOLOR,

      // class tag
      {
        begin: '\\.[a-zA-Z][a-zA-Z0-9_-]*' + LOOKAHEAD_TAG_END,
        className: 'selector-class'
      },

      // id tag
      {
        begin: '#[a-zA-Z][a-zA-Z0-9_-]*' + LOOKAHEAD_TAG_END,
        className: 'selector-id'
      },

      // tags
      {
        begin: '\\b(' + css.TAGS.join('|') + ')' + LOOKAHEAD_TAG_END,
        className: 'selector-tag'
      },

      // psuedo selectors
      {
        className: 'selector-pseudo',
        begin: '&?:(' + css.PSEUDO_CLASSES.join('|') + ')' + LOOKAHEAD_TAG_END
      },
      {
        className: 'selector-pseudo',
        begin: '&?::(' + css.PSEUDO_ELEMENTS.join('|') + ')' + LOOKAHEAD_TAG_END
      },

      modes.ATTRIBUTE_SELECTOR_MODE,

      {
        className: "keyword",
        begin: /@media/,
        starts: {
          end: /[{;}]/,
          keywords: {
            $pattern: /[a-z-]+/,
            keyword: AT_MODIFIERS,
            attribute: css.MEDIA_FEATURES.join(" ")
          },
          contains: [ hljs.CSS_NUMBER_MODE ]
        }
      },

      // @ keywords
      {
        className: 'keyword',
        begin: '\@((-(o|moz|ms|webkit)-)?(' + AT_KEYWORDS.join('|') + '))\\b'
      },

      // variables
      VARIABLE,

      // dimension
      hljs.CSS_NUMBER_MODE,

      // functions
      //  - only from beginning of line + whitespace
      {
        className: 'function',
        begin: '^[a-zA-Z][a-zA-Z0-9_\-]*\\(.*\\)',
        illegal: '[\\n]',
        returnBegin: true,
        contains: [
          {
            className: 'title',
            begin: '\\b[a-zA-Z][a-zA-Z0-9_\-]*'
          },
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            contains: [
              modes.HEXCOLOR,
              VARIABLE,
              hljs.APOS_STRING_MODE,
              hljs.CSS_NUMBER_MODE,
              hljs.QUOTE_STRING_MODE
            ]
          }
        ]
      },

      // attributes
      //  - only from beginning of line + whitespace
      //  - must have whitespace after it
      {
        className: 'attribute',
        begin: '\\b(' + css.ATTRIBUTES.join('|') + ')\\b',
        starts: {
          // value container
          end: /;|$/,
          contains: [
            modes.HEXCOLOR,
            VARIABLE,
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE,
            hljs.CSS_NUMBER_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            modes.IMPORTANT
          ],
          illegal: /\./,
          relevance: 0
        }
      }
    ]
  };
}
