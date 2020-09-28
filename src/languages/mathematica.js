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
import * as regex from '../lib/regex.js';

// @ts-ignore
export default function(highlightJS) {
  /*
  This rather scary looking matching of Mathematica numbers is carefully explained by Robert Jacobson here:
  https://wltools.github.io/LanguageSpec/Specification/Syntax/Number-representations/
   */
  const base_re = /([2-9]|[1-2]\d|[3][0-5])\^\^/;
  const base_digits_re = /(\w*\.\w+|\w+\.\w*|\w+)/;
  const number_re = /(\d*\.\d+|\d+\.\d*|\d+)/;
  const base_number_re = regex.either(regex.concat(base_re, base_digits_re), number_re);

  const accuracy_re = /``[+-]?(\d*\.\d+|\d+\.\d*|\d+)/;
  const precision_re = /`([+-]?(\d*\.\d+|\d+\.\d*|\d+))?/;
  const approximate_number_re = regex.either(accuracy_re, precision_re);

  const scientific_notation_re = /\*\^[+-]?\d+/;

  const mathematica_number_re = regex.concat(
    base_number_re,
    regex.optional(approximate_number_re),
    regex.optional(scientific_notation_re)
  );

  const NUMBERS = {
    className: 'number',
    begin: mathematica_number_re,
  };

  const symbol_re = /[a-zA-Z$][a-zA-Z0-9$]*/;
  const SYMBOLS = {
    className: 'symbol',
    begin: /[a-zA-Z$]/,
    keywords: {
      $pattern: symbol_re,
      keyword: Mathematica.SYSTEM_SYMBOLS.join(" ")
    },
    end: /[a-zA-Z0-9$]*/
  };

  const NAMED_CHARACTER = {
    className: 'symbol',
    begin: /\\\[/,
    end: /[$a-zA-Z][$a-zA-Z0-9]+]/
  };

  const OPERATORS = {
    className: 'operator',
    begin: /[+\-*/,;.:@~=><&|_`'^?!%]+/
  };

  const PATTERNS_AND_SLOTS = {
    className: 'pattern',
    variants: [
      {
        begin: /([a-zA-Z$][a-zA-Z0-9$]*)?_+([a-zA-Z$][a-zA-Z0-9$]*)?/,
        keywords: {
          $pattern: symbol_re,
          strong: Mathematica.SYSTEM_SYMBOLS.join(" ")
        }
      },
      {begin: /#[a-zA-Z$][a-zA-Z0-9$]*|#+[0-9]?/}
    ]
  };

  const BRACES = {
    className: 'brace',
    begin: /[[\](){}]/
  };

  const MESSAGES = {
    className: 'keyword',
    begin: /::/,
    end: symbol_re
  };

  return {
    name: 'Mathematica',
    aliases: ['mma', 'wl'],
    disableAutodetect: true,
    contains: [
      PATTERNS_AND_SLOTS,
      MESSAGES,
      SYMBOLS,
      NAMED_CHARACTER,
      highlightJS.QUOTE_STRING_MODE,
      highlightJS.COMMENT(/\(\*/, /\*\)/, {contains: ['self']}),
      NUMBERS,
      OPERATORS,
      BRACES
    ]
  };
}
