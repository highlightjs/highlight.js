/*
Language: Augmented Backus-Naur Form
Author: Alex McKibben <alex@nullscope.net>
Website: https://tools.ietf.org/html/rfc5234
Audit: 2020
*/

import * as regex from '../lib/regex.js';

/** @type LanguageFn */
export default function(hljs) {
  const regexes = {
    ruleDeclaration: /^[a-zA-Z][a-zA-Z0-9-]*/,
    unexpectedChars: /[!@#$^&',?+~`|:]/
  };

  const keywords = [
    "ALPHA",
    "BIT",
    "CHAR",
    "CR",
    "CRLF",
    "CTL",
    "DIGIT",
    "DQUOTE",
    "HEXDIG",
    "HTAB",
    "LF",
    "LWSP",
    "OCTET",
    "SP",
    "VCHAR",
    "WSP"
  ];

  const commentMode = hljs.COMMENT(/;/, /$/);

  const terminalBinaryMode = {
    className: "symbol",
    begin: /%b[0-1]+(-[0-1]+|(\.[0-1]+)+){0,1}/
  };

  const terminalDecimalMode = {
    className: "symbol",
    begin: /%d[0-9]+(-[0-9]+|(\.[0-9]+)+){0,1}/
  };

  const terminalHexadecimalMode = {
    className: "symbol",
    begin: /%x[0-9A-F]+(-[0-9A-F]+|(\.[0-9A-F]+)+){0,1}/
  };

  const caseSensitivityIndicatorMode = {
    className: "symbol",
    begin: /%[si]/
  };

  const ruleDeclarationMode = {
    className: "attribute",
    begin: regex.concat(regexes.ruleDeclaration, /(?=\s*=)/)
  };

  return {
    name: 'Augmented Backus-Naur Form',
    illegal: regexes.unexpectedChars,
    keywords: keywords,
    contains: [
      ruleDeclarationMode,
      commentMode,
      terminalBinaryMode,
      terminalDecimalMode,
      terminalHexadecimalMode,
      caseSensitivityIndicatorMode,
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE
    ]
  };
}
