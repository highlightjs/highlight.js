/*
Language: TypeScript
Author: Panu Horsmalahti <panu.horsmalahti@iki.fi>
Contributors: Ike Ku <dempfi@yahoo.com>
Description: TypeScript is a strict superset of JavaScript
Website: https://www.typescriptlang.org
Category: common, scripting
*/

import * as ECMAScript from "./lib/ecmascript.js";
import javascript from "./javascript.js";

/** @type LanguageFn */
export default function(hljs) {
  const tsLanguage = javascript(hljs);

  const IDENT_RE = ECMAScript.IDENT_RE;
  const TYPES = [
    "any",
    "void",
    "number",
    "boolean",
    "string",
    "object",
    "never",
    "symbol",
    "bigint",
    "unknown"
  ];
  const NAMESPACE = {
    beginKeywords: 'namespace',
    end: /\{/,
    excludeEnd: true,
    contains: [ tsLanguage.exports.CLASS_REFERENCE ]
  };
  const INTERFACE = {
    beginKeywords: 'interface',
    end: /\{/,
    excludeEnd: true,
    keywords: {
      keyword: 'interface extends',
      built_in: TYPES
    },
    contains: [ tsLanguage.exports.CLASS_REFERENCE ]
  };
  const USE_STRICT = {
    className: 'meta',
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  };
  const TS_SPECIFIC_KEYWORDS = [
    "type",
    "namespace",
    "interface",
    "public",
    "private",
    "protected",
    "implements",
    "declare",
    "abstract",
    "readonly",
    "enum",
    "override"
  ];
  const KEYWORDS = {
    $pattern: ECMAScript.IDENT_RE,
    keyword: ECMAScript.KEYWORDS.concat(TS_SPECIFIC_KEYWORDS),
    literal: ECMAScript.LITERALS,
    built_in: ECMAScript.BUILT_INS.concat(TYPES),
    "variable.language": ECMAScript.BUILT_IN_VARIABLES
  };
  const DECORATOR = {
    className: 'meta',
    begin: '@' + IDENT_RE,
  };

  const swapMode = (mode, label, replacement) => {
    const indx = mode.contains.findIndex(m => m.label === label);
    if (indx === -1) { throw new Error("can not find mode to replace"); }

    mode.contains.splice(indx, 1, replacement);
  };


  // this should update anywhere keywords is used since
  // it will be the same actual JS object
  Object.assign(tsLanguage.keywords, KEYWORDS);

  tsLanguage.exports.PARAMS_CONTAINS.push(DECORATOR);
  tsLanguage.contains = tsLanguage.contains.concat([
    DECORATOR,
    NAMESPACE,
    INTERFACE,
  ]);

  // TS gets a simpler shebang rule than JS
  swapMode(tsLanguage, "shebang", hljs.SHEBANG());
  // JS use strict rule purposely excludes `asm` which makes no sense
  swapMode(tsLanguage, "use_strict", USE_STRICT);

  const functionDeclaration = tsLanguage.contains.find(m => m.label === "func.def");
  functionDeclaration.relevance = 0; // () => {} is more typical in TypeScript

  const CLASS_REFERENCE = tsLanguage.contains.find(c => c.className === "title.class");
  const ATTRIBUTE_HIGHLIGHT = tsLanguage.contains.find(c => c.className === "attr");

  Object.assign(tsLanguage, {
    name: 'TypeScript',
    aliases: [
      'ts',
      'tsx',
      'mts',
      'cts'
    ],
    contains: tsLanguage.contains.map(c => {
      const { contains } = c;
      if (
        contains
      ) {
        const params = contains.find(cc => cc.scope === 'params' || cc.className === 'params');

        const PROPERTY_TYPE = [
          CLASS_REFERENCE,
          ATTRIBUTE_HIGHLIGHT
        ];

        if (params) {
          params.contains = params.contains.concat(PROPERTY_TYPE)
        }

        const returnedFuncParams = contains.find(cc => cc.scope === 'function' || cc.className === 'function')?.contains?.find(cc => cc.scope === 'params' || cc.className === 'params').variants[2];
        if (returnedFuncParams) {
          returnedFuncParams.contains = returnedFuncParams.contains.concat(PROPERTY_TYPE);
        }
      }

      return c;
    }),
  });

  return tsLanguage;
}
