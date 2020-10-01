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
  var IDENT_RE = ECMAScript.IDENT_RE;
  var NAMESPACE = {
    beginKeywords: 'namespace', end: /\{/, excludeEnd: true
  };
  var INTERFACE = {
    beginKeywords: 'interface', end: /\{/, excludeEnd: true,
    keywords: 'interface extends'
  };
  var TYPES = [
    "any",
    "void",
    "number",
    "boolean",
    "string",
    "object",
    "never",
    "enum"
  ];
  var TS_SPECIFIC_KEYWORDS = [
    "type",
    "namespace",
    "typedef",
    "interface",
    "public",
    "private",
    "protected",
    "implements",
    "declare",
    "abstract",
    "readonly"
  ];
  var KEYWORDS = {
    $pattern: ECMAScript.IDENT_RE,
    keyword: ECMAScript.KEYWORDS.concat(TS_SPECIFIC_KEYWORDS).join(" "),
    literal: ECMAScript.LITERALS.join(" "),
    built_in: ECMAScript.BUILT_INS.concat(TYPES).join(" ")
  };
  var DECORATOR = {
    className: 'meta',
    begin: '@' + IDENT_RE,
  };

  const tsLanguage = javascript(hljs);

  // this should update anywhere keywords is used since
  // it will be the same actual JS object
  Object.assign(tsLanguage.keywords, KEYWORDS);

  Object.assign(tsLanguage, {
    name: 'TypeScript',
    aliases: ['ts']
  });

  tsLanguage.exports.PARAMS_CONTAINS.push(DECORATOR);
  tsLanguage.contains = tsLanguage.contains.concat([
    DECORATOR,
    NAMESPACE,
    INTERFACE,
  ]);

  return tsLanguage;
  }
