/*
 Language: RQL
 Description: RavenDB's Query Language, used to query and patch documents in RavenDB.
 Author: RavenDB <support@ravendb.net>
 Website: https://ravendb.net/docs/article-page/latest/csharp/client-api/session/querying/what-is-rql
 Category: database
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

  // vector search / AI functions, added in recent RQL versions
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
