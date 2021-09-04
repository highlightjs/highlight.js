/*
Language: YARA
Description: YARA is a tool aimed at (but not limited to) helping malware researchers to identify and classify malware samples. With YARA you can create descriptions of malware families (or whatever you want to describe) based on textual or binary patterns. Each description, a.k.a. rule, consists of a set of strings and a boolean expression which determine its logic.
Author: Victor Alvarez
Website: https://github.com/Yara-Rules/rules
Category: common, protocols, web, malware, security
*/
// ref : https://github.com/infosec-intern/vscode-yara/blob/main/yara/syntaxes/yara.tmLanguage.json
// ref : https://github.com/blacktop/language-yara/blob/master/grammars/yara.cson

import * as regex from '../lib/regex.js';

/** @type LanguageFn */
export default function(hljs) {
  const ATTRIBUTE = {
    className: 'attr',
    begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
    relevance: 1.01
  };
  const VARIABLE = {
    className: 'variable',
    match: '(\\$|#|@)[a-zA-Z0-9_*]*',
    relevance: 1.01
  };
  const PUNCTUATION_YARA = regex.either(
    /[()]/,
    /[{}]/,
    /\[\[/,
    /[[\]]/,
    /\\/,
    /,/
  );
  const PUNCTUATION = {
    match: PUNCTUATION_YARA,
    className: "punctuation",
    relevance: 0
  };
  // borrowed and adopted from r.js
  const NUMBER_TYPES_YARA = regex.either(
    // Special case: only hexadecimal binary powers can contain fractions
    /0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/,
    // Hexadecimal numbers without fraction and optional binary power
    /0[xX][0-9a-fA-F]+(?:[pP][+-]?\d+)?/,
    // Matches the character with the code hh (two hexadecimal digits).
    /\b[0-9A-Fa-f]{2}\b/g
  );

  const NUMBER_YARA = {
    match: NUMBER_TYPES_YARA,
    className: "number",
    relevance: 0
  }
  const OPERATOR = {
    className: 'operator',
    relevance: 0,
    begin: /=/
  };

  const KEYWORDS = {
    beginKeywords: [
      "true","false","private","global","rule","strings","meta","condition","and","or","none","not","filesize","in","at","of","for","all","any","nocase","fullword","wide","ascii","base64","base64wide","xor","entrypoint","them","int8","int16","int32","int8be","int16be","int32be","uint8","uint16","uint32","uint8be","uint16be","uint32be","include","import","matches","contains","icontains","endswith","iendswith","startswith","istartswith","iequals",
    ].join(" ")
  };

  return {
    name: 'YARA',
    contains: [
      ATTRIBUTE,
      VARIABLE,
      PUNCTUATION,
      NUMBER_YARA,
      hljs.QUOTE_STRING_MODE,
      KEYWORDS,
      OPERATOR,
      hljs.C_NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      
    ],
    illegal: '\\S'
  };
}
