/*
 Language: RQL
 Description: RQL (Raven Query Language) is the SQL-like query language used by RavenDB,
              a document database. Queries written with RavenDB's high-level client APIs
              are translated into RQL under the hood, and RQL can also be written directly
              in the RavenDB Studio and via the low-level client API.
 Author: RavenDB <support@ravendb.net>
 Website: https://docs.ravendb.net/7.2/querying/rql/what-is-rql
 Category: database

 Goals:

 This grammar aims to cover the language surface documented at
 https://docs.ravendb.net/7.2/querying/rql/what-is-rql, plus the newer
 vector-search / AI functions documented at
 https://docs.ravendb.net/7.2/ai-integration/vector-search/start.

 The keyword, function and operator lists are derived from RavenDB's own production
 RQL tokenizer (the RavenDB Studio's query editor) and its ANTLR4 grammar (used by the
 Studio's autocomplete/syntax-check service), both in https://github.com/ravendb/ravendb.

 Not covered by this first version: the embedded JavaScript patch-script blocks that
 `select { ... }` and `update { ... }` open (see
 https://docs.ravendb.net/7.2/documents/patching-documents/overview) - those are highlighted
 as plain RQL text here rather than switching into a JavaScript sub-grammar.
 */

export default function(hljs) {
  const regex = hljs.regex;

  const CLAUSES = [
    "declare",
    "from",
    "group",
    "where",
    "order",
    "load",
    "select",
    "update",
    "match",
    "with",
    "limit",
    "filter",
    "filter_limit",
    "offset",
    "include",
    "facet",
    "timeseries",
    "function",
    "index",
    "by"
  ];

  const LOGICAL_OPS = [ "and", "or", "not", "in", "between", "all" ];

  const WHERE_FUNCTIONS = [
    "search",
    "boost",
    "startsWith",
    "endsWith",
    "lucene",
    "exact",
    "within",
    "exists",
    "contains",
    "disjoint",
    "intersects",
    "moreLikeThis",
    "fuzzy",
    "circle"
  ];

  // Vector search / AI functions, added in recent RQL versions.
  // See https://docs.ravendb.net/7.2/ai-integration/vector-search/start
  const AI_FUNCTIONS = [
    "vector.search",
    "embedding.i1",
    "embedding.i8",
    "embedding.f32_i8",
    "embedding.f32_i1",
    "embedding.text",
    "embedding.text_i8",
    "embedding.text_i1",
    "embedding.for",
    "ai.task"
  ];

  const ORDER_BY_FUNCTIONS = [ "random", "score" ];
  const ORDER_BY_OPTIONS = [ "asc", "ascending", "desc", "descending" ];
  const TYPE_CAST = [ "string", "long", "double", "alphaNumeric" ];
  const LITERALS = [ "null", "true", "false" ];

  const NULLS_ORDER = {
    scope: "keyword",
    match: /\bnulls\s+(?:first|last)\b/
  };

  const STRING = {
    scope: "string",
    variants: [
      { begin: '"', end: '"' },
      { begin: "'", end: "'" },
      // apache-drill style string, also used by RQL
      { begin: "`", end: "`" }
    ]
  };

  const SPECIAL_TOKEN = {
    scope: "symbol",
    match: /@(?:metadata|all_docs)\b/
  };

  const FUNCTION_CALL = {
    scope: "built_in",
    match: regex.concat(/\b/, regex.either(...WHERE_FUNCTIONS, ...AI_FUNCTIONS, ...ORDER_BY_FUNCTIONS), /\s*(?=\()/),
    relevance: 0
  };

  return {
    name: "RQL",
    aliases: [ "rql" ],
    case_insensitive: true,
    keywords: {
      $pattern: /[a-zA-Z_][a-zA-Z0-9_.]*/,
      keyword: CLAUSES.concat(LOGICAL_OPS),
      type: ORDER_BY_OPTIONS.concat(TYPE_CAST),
      literal: LITERALS
    },
    contains: [
      hljs.COMMENT("//", "$"),
      hljs.COMMENT(/\/\*/, /\*\//),
      NULLS_ORDER,
      FUNCTION_CALL,
      STRING,
      hljs.C_NUMBER_MODE,
      SPECIAL_TOKEN
    ]
  };
}
