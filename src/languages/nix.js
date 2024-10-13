/*
Language: Nix
Author: Domen Kožar <domen@dev.si>
Description: Nix functional language
Website: http://nixos.org/nix
Category: system
*/

/** @type LanguageFn */
export default function(hljs) {
  const regex = hljs.regex;
  const KEYWORDS = {
    keyword: [
      "assert",
      "else",
      "if",
      "in",
      "inherit",
      "let",
      "or",
      "rec",
      "then",
      "with",
    ],
    literal: [
      "true",
      "false",
      "null",
    ],
    built_in: [
      // toplevel builtins
      "abort",
      "baseNameOf",
      "builtins",
      "derivation",
      "derivationStrict",
      "dirOf",
      "fetchGit",
      "fetchMercurial",
      "fetchTarball",
      "fetchTree",
      "fromTOML",
      "import",
      "isNull",
      "map",
      "placeholder",
      "removeAttrs",
      "scopedImport",
      "throw",
      "toString",
    ],
  };

  const BUILTINS = {
    scope: 'built_in',
    match: regex.either(...[
      "abort",
      "add",
      "addDrvOutputDependencies",
      "addErrorContext",
      "all",
      "any",
      "appendContext",
      "attrNames",
      "attrValues",
      "baseNameOf",
      "bitAnd",
      "bitOr",
      "bitXor",
      "break",
      "builtins",
      "catAttrs",
      "ceil",
      "compareVersions",
      "concatLists",
      "concatMap",
      "concatStringsSep",
      "convertHash",
      "currentSystem",
      "currentTime",
      "deepSeq",
      "derivation",
      "derivationStrict",
      "dirOf",
      "div",
      "elem",
      "elemAt",
      "false",
      "fetchGit",
      "fetchMercurial",
      "fetchTarball",
      "fetchTree",
      "fetchurl",
      "filter",
      "filterSource",
      "findFile",
      "flakeRefToString",
      "floor",
      "foldl'",
      "fromJSON",
      "fromTOML",
      "functionArgs",
      "genList",
      "genericClosure",
      "getAttr",
      "getContext",
      "getEnv",
      "getFlake",
      "groupBy",
      "hasAttr",
      "hasContext",
      "hashFile",
      "hashString",
      "head",
      "import",
      "intersectAttrs",
      "isAttrs",
      "isBool",
      "isFloat",
      "isFunction",
      "isInt",
      "isList",
      "isNull",
      "isPath",
      "isString",
      "langVersion",
      "length",
      "lessThan",
      "listToAttrs",
      "map",
      "mapAttrs",
      "match",
      "mul",
      "nixPath",
      "nixVersion",
      "null",
      "parseDrvName",
      "parseFlakeRef",
      "partition",
      "path",
      "pathExists",
      "placeholder",
      "readDir",
      "readFile",
      "readFileType",
      "removeAttrs",
      "replaceStrings",
      "scopedImport",
      "seq",
      "sort",
      "split",
      "splitVersion",
      "storeDir",
      "storePath",
      "stringLength",
      "sub",
      "substring",
      "tail",
      "throw",
      "toFile",
      "toJSON",
      "toPath",
      "toString",
      "toXML",
      "trace",
      "traceVerbose",
      "true",
      "tryEval",
      "typeOf",
      "unsafeDiscardOutputDependency",
      "unsafeDiscardStringContext",
      "unsafeGetAttrPos",
      "warn",
      "zipAttrsWith",
    ].map(b => `builtins\\.${b}`)),
    relevance: 10,
  };

  const ATTRS = {
    begin: /[a-zA-Z0-9-_]+(\s*=)/,
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        className: 'attr',
        begin: /\S+/,
        relevance: 0.2
      },
    ],
  };

  const NORMAL_ESCAPED_DOLLAR = {
    scope: 'char.escape',
    match: /\\\$/,
  };
  const INDENTED_ESCAPED_DOLLAR = {
    scope: 'char.escape',
    match: /''\$/,
  };
  const ANTIQUOTE = {
    scope: 'subst',
    begin: /\$\{/,
    end: /\}/,
    keywords: KEYWORDS,
  };
  const ESCAPED_DOUBLEQUOTE = {
    scope: 'char.escape',
    match: /'''/,
  };
  const ESCAPED_LITERAL = {
    scope: 'char.escape',
    match: /\\(?!\$)./,
  };
  const STRING = {
    scope: 'string',
    variants: [
      {
        begin: "''",
        end: "''",
        contains: [
          INDENTED_ESCAPED_DOLLAR,
          ANTIQUOTE,
          ESCAPED_DOUBLEQUOTE,
          ESCAPED_LITERAL,
        ],
      },
      {
        begin: '"',
        end: '"',
        contains: [
          NORMAL_ESCAPED_DOLLAR,
          ANTIQUOTE,
          ESCAPED_LITERAL,
        ],
      },
    ],
  };

  const EXPRESSIONS = [
    hljs.NUMBER_MODE,
    hljs.HASH_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    BUILTINS,
    STRING,
    ATTRS
  ];
  ANTIQUOTE.contains = EXPRESSIONS;
  return {
    name: 'Nix',
    aliases: [ "nixos" ],
    keywords: KEYWORDS,
    contains: EXPRESSIONS
  };
}
