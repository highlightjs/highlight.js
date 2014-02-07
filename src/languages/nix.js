/*
Language: Nix
Author: Domen Kožar <domen@dev.si>
Description: Nix functional language. See http://nixos.org/nix
*/


function(hljs) {
  var NIX_KEYWORDS = {
    keyword: 'rec with let in inherit assert if else then',
    constant: 'true false or and null',
    built_in:
      'import abort baseNameOf dirOf isNull builtins map removeAttrs throw toString derivation'
  };
  var ANTIQUOTE = {
    className: 'subst',
    begin: /\$\{/,
    end: /\}/,
    keywords: NIX_KEYWORDS
  };
  var SINGLE_QUOTE = {
    className: 'string',
    begin: "''",
    end: "''",
    contains: [
      ANTIQUOTE,
    ]
  };
  var DOUBLE_QUOTE = {
    className: 'string',
    begin: '"',
    end: '"',
    contains: [
      ANTIQUOTE,
    ]
  };
  EXPRESSIONS = [
    hljs.NUMBER_MODE,
    hljs.HASH_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    SINGLE_QUOTE,
    DOUBLE_QUOTE,
  ];  
  ANTIQUOTE.contains = EXPRESSIONS;
  return {
    aliases: ["nixos"],
    keywords: NIX_KEYWORDS,
    contains: EXPRESSIONS
  };
}
