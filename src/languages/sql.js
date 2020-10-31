/*
 Language: SQL
 Website: https://en.wikipedia.org/wiki/SQL
 Category: common, database
 */

/*

Goals:

SQL is intended to highlight basic/common SQL keywords and expressions

- If pretty much every single SQL server includes supports, then it's a canidate.
- It is NOT intended to include tons of vendor specific keywords (Oracle, MySQL,
  PostgreSQL) although the list of data types is purposely a bit more expansive.
- For more specific SQL grammars please see:
  - PostgreSQL and PL/pgSQL - core
  - T-SQL - https://github.com/highlightjs/highlightjs-tsql
  - sql_more (core)

 */

import * as regex from '../lib/regex.js';

export default function(hljs) {
  const COMMENT_MODE = hljs.COMMENT('--', '$');
  const STRING = {
    className: 'string',
    variants: [
    {
      begin: '\'', end: '\'',
      contains: [{begin: '\'\''}]
    },
    {
      begin: '"', end: '"',
      contains: [{begin: '""'}]
    },
    {
      begin: '`', end: '`'
    }
  ]};
  const LITERALS = [
    "true",
    "false",
    "null",
    "unknown"
  ];

  const MULTI_WORD_TYPES = [
    "double precision",
    "large object",
    "with timezone",
    "without timezone"
  ];
  const TYPES = [
    // 'array', // used in procedural languages
    'bigint',
    'binary',
    // 'bit',  // MS SQL
    'blob',
    // 'bool', // ???
    'boolean',
    'char',
    'character',
    'clob',
    'date',
    'dec',
    'decfloat',
    'decimal',
    'float',
    'int',
    // 'int8', // postgres
    'integer',
    'interval',
    // 'number',  // oracle
    // 'multiset', // used in procedural languages
    'nchar',
    'nclob',
    'national',
    'numeric',
    'real',
    // 'ref', // used in procedural languages
    // 'record', Dunno?
    'row',
    // 'serial', Oracle?
    // 'serial8', Oracle?
    //'scope', // used in procedural languages
    'smallint',
    // 'text', // PostgreSQL
    'time',
    'timestamp',
    // 'tinyint', // MySQL specific
    'varchar',
    'varying', // modifier (character varying)
    'varbinary'
    // 'void' // postgres
  ];

  const AGG_FUNCTIONS = [
    "avg",
    "count",
    // "group_concat", // STRING_AGG() in T-SQL, etc...
    "max",
    "min",
    "sum",
    // "total" // doesn't seem to be mentioned in SQL 2011
  ];

  const NON_RESERVED_WORDS = [
    "add",
    "collation",
    "final",
    "first",
    "last"
  ];

  // https://jakewheat.github.io/sql-overview/sql-2016-foundation-grammar.html#reserved-word
  const RESERVED_WORDS = [
    "abs",
    "acos",
    "all",
    "allocate",
    "alter",
    "and",
    "any",
    "are",
    "array",
    "array_agg",
    "array_max_cardinality",
    "as",
    "asensitive",
    "asin",
    "asymmetric",
    "at",
    "atan",
    "atomic",
    "authorization",
    "avg",
    "begin",
    "begin_frame",
    "begin_partition",
    "between",
    "bigint",
    "binary",
    "blob",
    "boolean",
    "both",
    "by",
    "call",
    "called",
    "cardinality",
    "cascaded",
    "case",
    "cast",
    "ceil",
    "ceiling",
    "char",
    "char_length",
    "character",
    "character_length",
    "check",
    "classifier",
    "clob",
    "close",
    "coalesce",
    "collate",
    "collect",
    "column",
    "commit",
    "condition",
    "connect",
    "constraint",
    "contains",
    "convert",
    "copy",
    "corr",
    "corresponding",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "create",
    "cross",
    "cube",
    "cume_dist",
    "current",
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_row",
    "current_schema",
    "current_time",
    "current_timestamp",
    "current_path",
    "current_role",
    "current_transform_group_for_type",
    "current_user",
    "cursor",
    "cycle",
    "date",
    "day",
    "deallocate",
    "dec",
    "decimal",
    "decfloat",
    "declare",
    "default",
    "define",
    "delete",
    "dense_rank",
    "deref",
    "describe",
    "deterministic",
    "disconnect",
    "distinct",
    "double",
    "drop",
    "dynamic",
    "each",
    "element",
    "else",
    "empty",
    "end",
    "end_frame",
    "end_partition",
    "end-exec",
    "equals",
    "escape",
    "every",
    "except",
    "exec",
    "execute",
    "exists",
    "exp",
    "external",
    "extract",
    "false",
    "fetch",
    "filter",
    "first_value",
    "float",
    "floor",
    "for",
    "foreign",
    "frame_row",
    "free",
    "from",
    "full",
    "function",
    "fusion",
    "get",
    "global",
    "grant",
    "group",
    "grouping",
    "groups",
    "having",
    "hold",
    "hour",
    "identity",
    "in",
    "indicator",
    "initial",
    "inner",
    "inout",
    "insensitive",
    "insert",
    "int",
    "integer",
    "intersect",
    "intersection",
    "interval",
    "into",
    "is",
    "join",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "language",
    "large",
    "last_value",
    "lateral",
    "lead",
    "leading",
    "left",
    "like",
    "like_regex",
    "listagg",
    "ln",
    "local",
    "localtime",
    "localtimestamp",
    "log",
    "log10",
    "lower",
    "match",
    "match_number",
    "match_recognize",
    "matches",
    "max",
    "member",
    "merge",
    "method",
    "min",
    "minute",
    "mod",
    "modifies",
    "module",
    "month",
    "multiset",
    "national",
    "natural",
    "nchar",
    "nclob",
    "new",
    "no",
    "none",
    "normalize",
    "not",
    "nth_value",
    "ntile",
    "null",
    "nullif",
    "numeric",
    "octet_length",
    "occurrences_regex",
    "of",
    "offset",
    "old",
    "omit",
    "on",
    "one",
    "only",
    "open",
    "or",
    "order",
    "out",
    "outer",
    "over",
    "overlaps",
    "overlay",
    "parameter",
    "partition",
    "pattern",
    "per",
    "percent",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "period",
    "portion",
    "position",
    "position_regex",
    "power",
    "precedes",
    "precision",
    "prepare",
    "primary",
    "procedure",
    "ptf",
    "range",
    "rank",
    "reads",
    "real",
    "recursive",
    "ref",
    "references",
    "referencing",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "release",
    "result",
    "return",
    "returns",
    "revoke",
    "right",
    "rollback",
    "rollup",
    "row",
    "row_number",
    "rows",
    "running",
    "savepoint",
    "scope",
    "scroll",
    "search",
    "second",
    "seek",
    "select",
    "sensitive",
    "session_user",
    "set",
    "show",
    "similar",
    "sin",
    "sinh",
    "skip",
    "smallint",
    "some",
    "specific",
    "specifictype",
    "sql",
    "sqlexception",
    "sqlstate",
    "sqlwarning",
    "sqrt",
    "start",
    "static",
    "stddev_pop",
    "stddev_samp",
    "submultiset",
    "subset",
    "substring",
    "substring_regex",
    "succeeds",
    "sum",
    "symmetric",
    "system",
    "system_time",
    "system_user",
    "table",
    "tablesample",
    "tan",
    "tanh",
    "then",
    "time",
    "timestamp",
    "timezone_hour",
    "timezone_minute",
    "to",
    "trailing",
    "translate",
    "translate_regex",
    "translation",
    "treat",
    "trigger",
    "trim",
    "trim_array",
    "true",
    "truncate",
    "uescape",
    "union",
    "unique",
    "unknown",
    "unnest",
    "update   ",
    "upper",
    "user",
    "using",
    "value",
    "values",
    "value_of",
    "var_pop",
    "var_samp",
    "varbinary",
    "varchar",
    "varying",
    "versioning",
    "when",
    "whenever",
    "where",
    "width_bucket",
    "window",
    "with",
    "within",
    "without",
    "year",
  ];

  // these are reserved words we have identified to be functions
  // and should only be highlighted in a dispatch-like context
  // ie, array_agg(...), etc.
  const RESERVED_FUNCTIONS = [
    "abs",
    "acos",
    "array_agg",
    "asin",
    "atan",
    "avg",
    "cast",
    "ceil",
    "ceiling",
    "coalesce",
    "corr",
    "cos",
    "cosh",
    "covar_pop",
    "covar_samp",
    "cume_dist",
    "dense_rank",
    "deref",
    "element",
    "exp",
    "first_value",
    "floor",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "last_value",
    "listagg",
    "ln",
    "log",
    "log10",
    "lower",
    "max",
    "min",
    "mod",
    "nth_value",
    "ntile",
    "nullif",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "position",
    "position_regex",
    "power",
    "rank",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "row_number",
    "sin",
    "sinh",
    "sqrt",
    "stddev_pop",
    "stddev_samp",
    "substring",
    "substring_regex",
    "sum",
    "tan",
    "tanh",
    "translate",
    "translate_regex",
    "treat",
    "trim",
    "trim_array",
    "unnest",
    "upper",
    "value_of",
    "var_pop",
    "var_samp",
    "width_bucket",
  ];

  const OLD_SCALAR_FUNCTIONS = [
    "abs",
    // "changes", // sqlite
    "char",
    "coalesce",
    "glob",
    // "hex", // postgres does not include
    // "ifnull",  // postgres does not include
    "iif",
    "instr",
    // "last_insert_rowid", //sqlite only
    "length",
    "like",
    // "likelihood", // sqlite
    // "likely", // sqlite
    "lower",
    "ltrim",
    "nullif",
    "printf",
    "quote",
    "random",
    // "randomblob", // sqlite
    "replace",
    "round",
    "rtrim",
    "soundex",
    "substr",
    // "total_changes", // sqlite
    "trim",
    // "typeof", // sqlite
    "unicode",
    // "unlikely", // sqlite
    "upper",
    // "zeroblob" // sqlite
  ];

  const DATE_FUNCTIONS = [
    "date",
    "time",
    "datetime",
    "julianday",
    "strftime"
  ];

  const FUNCTIONS = [].concat(AGG_FUNCTIONS, RESERVED_FUNCTIONS);

  const OLD_KEYWORDS = [
    "abort",
    "action",
    "add", // good (add constraint)
    "after",
    "all",
    "alter", // good
    "always",
    "analyze",
    "and", // good
    "as", // good (aliasing field names)
    "asc", // good
    "attach",
    "autoincrement",
    "before",
    "begin", // good
    "between", // ORDER BY t ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    "by", // good (group by)
    "cascade",
    "case",
    "cast",
    "check",
    "collate",
    "column",
    "commit", // good
    // "conflict", // The ON CONFLICT clause is a non-standard extension specific to SQLite
    "constraint", // good
    "create", // good (create table)
    "cross",
    "current", // current row
    "current_date",
    "current_time",
    "current_timestamp",
    "database", // good
    "default",
    "deferrable",
    "deferred",
    "delete", // good
    "desc", // good
    "detach",
    "distinct", // good
    "do|0",
    "drop", // good
    "each",
    "else",
    "end",
    "escape",
    "except",
    "exclude",
    "exclusive",
    "exists",
    "explain",
    "fail",
    "filter",
    "first",
    "following", // ORDER BY t ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    "for",
    "foreign", // good
    "from", // good
    "full",
    "generated",
    "glob",
    "group", // good
    "groups",
    "having", // good
    "if|0",
    "ignore",
    "immediate",
    "in|0",
    "index", // good
    "indexed",
    "initially",
    "inner", // good
    "insert", // good
    "instead",
    "intersect",
    "into", // good
    "in|0", // good - value in (a, b, c)
    "is|0", // good (is null)
    "isnull",
    "join", // good
    "key", // good
    "last",
    "left", // good
    "like", // good
    "limit", // good
    "match",
    "natural", // seems supported by all
    // "no", // seems to be reserved but not used yet?
    "not", // good
    // "nothing", // looks like Sqlite only
    "notnull",
    // "null", // NULL is a literal
    "nulls",
    "of",
    "offset", // good
    "on|0", // good (JOIN ON)
    "or", // good
    "order", // good (ORDER BY)
    "others",
    "outer", // good (OUTER JOIN)
    "over",
    "partition",
    "plan",
    // "pragma", // sqlite only
    "preceding", // ORDER BY t ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    "primary", // good (PRIMARY KEY)
    "query",
    "raise",
    "range",
    "recursive",
    "references",
    "regexp",
    // "reindex", // not in 2011 spec, oracle uses `ALTER INDEX REBUILD`
    "release",
    "rename", // good
    // "replace", // this is already in SCALAR_FUNCTIONS
    "restrict",
    "right", // good
    "rollback", // good
    "row", // ORDER BY t ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    "rows", // ORDER BY t ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    "savepoint", // good
    "select", // good
    "set", // UPDATE ... SET
    "table", // good
    "temp",
    "temporary",
    "then",
    "ties",
    "to|0",
    "transaction", // good
    "trigger",
    "unbounded", // ORDER BY t ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    "union", // good
    "unique", // good
    "update", // good
    "using",
    // "vacuum",
    "values", // good
    "view",
    "virtual",
    "when",
    "where", // good
    "window",
    "with",
    "without"
  ];

  const COMBOS = [
    "create table", // no need, both are keywords
    "insert into", // no need, both are keywords
    "primary key",
    "foreign key",
    "not null",
    "alter table", // no need, both are keywords
    "add constraint", // add -> keywords?
    "grouping sets",
    "on overflow",
    "character set",
    "respect nulls",
    "ignore nulls",
    "nulls first",
    "nulls last",
    "depth first",
    "breadth first"
  ];

  const KEYWORDS = [...RESERVED_WORDS, ...NON_RESERVED_WORDS].filter((keyword) => {
    return !RESERVED_FUNCTIONS.includes(keyword);
  });

  const VARIABLE = {
    className: "variable",
    begin: /@[a-z0-9]+/,
  };

  const OPERATOR = {
    className: "operator",
    begin: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
    relevance: 0,
  };

  const FUNCTION_CALL = {
    begin: regex.concat(/\b/,regex.either(...FUNCTIONS),/\s*\(/),
    keywords: {
      built_in: FUNCTIONS.join(" ")
    }
  };

  // keywords with less than 3 letters are reduced in relevancy
  function reduceRelevancy(list, {exceptions, when} = {}) {
    const qualifyFn = when;
    exceptions = exceptions || [];
    return list.map((item) => {
      if (item.match(/\|\d+$/) || exceptions.includes(item)) {
        return item;
      } else if (qualifyFn(item)) {
        return `${item}|0`;
      } else {
        return item;
      }
    });
  }

  return {
    name: 'SQL',
    case_insensitive: true,
    // does not include {} or HTML tags `</`
    illegal: /[{}]|<\//,
    keywords: {
      $pattern: /\b[\w\.]+/,
      keyword:
        // STATEMENT_KEYWORDS.concat(
          // defaultScoreZero(REGULAR_KEYWORDS, {exceptions: RELEVANT_KEYWORDS}))
        reduceRelevancy(KEYWORDS, {when: (x) => x.length < 3 }).join(" "),
      literal: LITERALS.join(" "),
      type: TYPES.join(" ")
    },
    contains: [
      {
        begin: regex.either(...COMBOS),
        keywords: {
          $pattern: /[\w\.]+/,
          keyword: KEYWORDS.join(" "),
          // STATEMENT_KEYWORDS.concat(REGULAR_KEYWORDS).join(" "),
          literal: LITERALS.join(" "),
          type: TYPES.join(" ")
        },
      },
      {
        className: "types",
        begin: regex.either(...MULTI_WORD_TYPES)
      },
      FUNCTION_CALL,
      VARIABLE,
      STRING,
      hljs.C_NUMBER_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      COMMENT_MODE,
      OPERATOR
    ]
  };
}
