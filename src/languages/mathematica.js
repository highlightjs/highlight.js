/*
Language: Wolfram Language
Description: The Wolfram Language is the programming language used in Wolfram Mathematica, a modern technical computing system spanning most areas of technical computing.
Authors: Patrick Scheibe <patrick@halirutan.de>, Robert Jacobson <robertjacobson@acm.org>
Website: https://www.wolfram.com/mathematica/
Category: scientific
*/

/*
  The ./lib/mathematica.js file was created with Wolfram Mathematica 12.1.1 under Linux
  with the following code:
  $outputFile="/path/to/highlight.js/src/languages/lib/mathematica.js";
  getStrippedContextNames[context_String]:=Block[
    {
      $ContextPath={context}
    },
    Union[Names@RegularExpression@StringJoin[context,"\\$?[A-Z]\\w*"]]
  ];
  $symbols=getStrippedContextNames["System`"];
  Export[$outputFile,
    With[
      {
        quoted="\""<>#<>"\""&/@$symbols
      },
      StringTemplate["export const SYSTEM_SYMBOLS = [\n`syms`\n];\n"][
        <|"syms"->StringRiffle[Map["  " <> #&,quoted],",\n"]|>
      ]
    ],"String"]
*/
import * as Mathematica from './lib/mathematica.js';

/** @type LanguageFn */
export default function(hljs) {
  const regex = hljs.regex;
  /*
  This rather scary looking matching of Mathematica numbers is carefully explained by Robert Jacobson here:
  https://wltools.github.io/LanguageSpec/Specification/Syntax/Number-representations/
   */
  const BASE_RE = /([2-9]|[1-2]\d|[3][0-5])\^\^/;
  const BASE_DIGITS_RE = /(\w*\.\w+|\w+\.\w*|\w+)/;
  const NUMBER_RE = /(\d*\.\d+|\d+\.\d*|\d+)/;
  const BASE_NUMBER_RE = regex.either(regex.concat(BASE_RE, BASE_DIGITS_RE), NUMBER_RE);

  const ACCURACY_RE = /``[+-]?(\d*\.\d+|\d+\.\d*|\d+)/;
  const PRECISION_RE = /`([+-]?(\d*\.\d+|\d+\.\d*|\d+))?/;
  const APPROXIMATE_NUMBER_RE = regex.either(ACCURACY_RE, PRECISION_RE);

  const SCIENTIFIC_NOTATION_RE = /\*\^[+-]?\d+/;

  const MATHEMATICA_NUMBER_RE = regex.concat(
    BASE_NUMBER_RE,
    regex.optional(APPROXIMATE_NUMBER_RE),
    regex.optional(SCIENTIFIC_NOTATION_RE)
  );

  const NUMBERS = {
    className: 'number',
    relevance: 0,
    begin: MATHEMATICA_NUMBER_RE
  };

  const SYMBOL_RE = /[a-zA-Z$][a-zA-Z0-9$]*/;
  const SYSTEM_SYMBOLS_SET = new Set(Mathematica.SYSTEM_SYMBOLS);
  /** @type {Mode} */
  const SYMBOLS = {
    variants: [
      {
        className: 'builtin-symbol',
        begin: SYMBOL_RE,
        // for performance out of fear of regex.either(...Mathematica.SYSTEM_SYMBOLS)
        "on:begin": (match, response) => {
          if (!SYSTEM_SYMBOLS_SET.has(match[0])) response.ignoreMatch();
        }
      },
      {
        className: 'symbol',
        relevance: 0,
        begin: SYMBOL_RE
      }
    ]
  };

  const NAMED_CHARACTER = {
    className: 'named-character',
    begin: /\\\[[$a-zA-Z][$a-zA-Z0-9]+\]/
  };

  const OPERATORS = {
    className: 'operator',
    relevance: 0,
    begin: /[+\-*/,;.:@~=><&|_`'^?!%]+/
  };
  const PATTERNS = {
    className: 'pattern',
    relevance: 0,
    begin: /([a-zA-Z$][a-zA-Z0-9$]*)?_+([a-zA-Z$][a-zA-Z0-9$]*)?/
  };

  const SLOTS = {
    className: 'slot',
    relevance: 0,
    begin: /#[a-zA-Z$][a-zA-Z0-9$]*|#+[0-9]?/
  };

  const BRACES = {
    className: 'brace',
    relevance: 0,
    begin: /[[\](){}]/
  };

  const MESSAGES = {
    className: 'message-name',
    relevance: 0,
    begin: regex.concat("::", SYMBOL_RE)
  };

  return {
    name: 'Mathematica',
    aliases: [
      'mma',
      'wl'
    ],
    classNameAliases: {
      brace: 'punctuation',
      pattern: 'type',
      slot: 'type',
      symbol: 'variable',
      'named-character': 'variable',
      'builtin-symbol': 'built_in',
      'message-name': 'string'
    },
    contains: [
      hljs.COMMENT(/\(\*/, /\*\)/, {
        contains: [ 'self' ]
      }),
      PATTERNS,
      SLOTS,
      MESSAGES,
      SYMBOLS,
      NAMED_CHARACTER,
      hljs.QUOTE_STRING_MODE,
      NUMBERS,
      OPERATORS,
      BRACES
    ]
  };
}
