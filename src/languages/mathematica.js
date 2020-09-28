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
export default function(hljs) {
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
    begin: MATHEMATICA_NUMBER_RE,
  };

  const SYMBOL_RE = /[a-zA-Z$][a-zA-Z0-9$]*/;
  const SYMBOLS = {
    className: 'symbol',
    begin: SYMBOL_RE,
      keywords: {
        $pattern: SYMBOL_RE,
        keyword: Mathematica.SYSTEM_SYMBOLS.join(" ")
      },
  };

  const NAMED_CHARACTER = {
    className: 'symbol',
    begin: /\\\[[$a-zA-Z][$a-zA-Z0-9]+]/,
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
          $pattern: SYMBOL_RE,
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
    end: SYMBOL_RE
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
      hljs.QUOTE_STRING_MODE,
      hljs.COMMENT(/\(\*/, /\*\)/, {contains: ['self']}),
      NUMBERS,
      OPERATORS,
      BRACES
    ]
  };
}
