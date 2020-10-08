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
  const BUILT_INS = [
    'array',
    'bigint',
    'binary',
    'bit',
    'blob',
    'bool',
    'boolean',
    'char',
    'character',
    'date',
    'dec',
    'decimal',
    'float',
    'int',
    'int8',
    'integer',
    'interval',
    'number',
    'numeric',
    'real',
    'record',
    'serial',
    'serial8',
    'smallint',
    'text',
    'time',
    'timestamp',
    'tinyint',
    'varchar',
    'varchar2',
    'varying',
    'void'
  ];

  const AGG_FUNCTIONS = [
    "avg",
    "count",
    "group_concat",
    "max",
    "min",
    "sum",
    "total"
  ];

  const SCALAR_FUNCTIONS = [
    "abs",
    "changes",
    "char",
    "coalesce",
    "glob",
    "hex",
    "ifnull",
    "iif",
    "instr",
    "last_insert_rowid",
    "length",
    "like",
    "likelihood",
    "likely",
    "lower",
    "ltrim",
    "nullif",
    "printf",
    "quote",
    "random",
    "randomblob",
    "replace",
    "round",
    "rtrim",
    "soundex",
    "substr",
    "total_changes",
    "trim",
    "typeof",
    "unicode",
    "unlikely",
    "upper",
    "zeroblob"
  ];

  const DATE_FUNCTIONS = [
    "date",
    "time",
    "datetime",
    "julianday",
    "strftime"
  ];

  const FUNCTIONS = [].concat(AGG_FUNCTIONS, SCALAR_FUNCTIONS, DATE_FUNCTIONS);

  const KEYWORDS = [
    "abort",
    "action",
    "add",
    "after",
    "all",
    "alter",
    "always",
    "analyze",
    "and",
    "as",
    "asc",
    "attach",
    "autoincrement",
    "before",
    "begin",
    "between",
    "by",
    "cascade",
    "case",
    "cast",
    "check",
    "collate",
    "column",
    "commit",
    "conflict",
    "constraint",
    "create",
    "cross",
    "current",
    "current_date",
    "current_time",
    "current_timestamp",
    "database",
    "default",
    "deferrable",
    "deferred",
    "delete",
    "desc",
    "detach",
    "distinct",
    "do|0",
    "drop",
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
    "following",
    "for",
    "foreign",
    "from",
    "full",
    "generated",
    "glob",
    "group",
    "groups",
    "having",
    "if|0",
    "ignore",
    "immediate",
    "in|0",
    "index",
    "indexed",
    "initially",
    "inner",
    "insert",
    "instead",
    "intersect",
    "into",
    "is",
    "isnull",
    "join",
    "key",
    "last",
    "left",
    "like",
    "limit",
    "match",
    "natural",
    "no",
    "not",
    "nothing",
    "notnull",
    "null",
    "nulls",
    "of",
    "offset",
    "on",
    "or",
    "order",
    "others",
    "outer",
    "over",
    "partition",
    "plan",
    "pragma",
    "preceding",
    "primary",
    "query",
    "raise",
    "range",
    "recursive",
    "references",
    "regexp",
    "reindex",
    "release",
    "rename",
    "replace",
    "restrict",
    "right",
    "rollback",
    "row",
    "rows",
    "savepoint",
    "select",
    "set",
    "table",
    "temp",
    "temporary",
    "then",
    "ties",
    "to|0",
    "transaction",
    "trigger",
    "unbounded",
    "union",
    "unique",
    "update",
    "using",
    "vacuum",
    "values",
    "view",
    "virtual",
    "when",
    "where",
    "window",
    "with",
    "without"
  ];

  const COMBOS = [
    "create table",
    "insert into",
    "primary key",
    "foreign key",
    "not null",
    "alter table",
    "add constraint",
  ];

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
      built_in: BUILT_INS.join(" ")
    },
    contains: [
      {
        begin: regex.either(...COMBOS),
        keywords: {
          $pattern: /[\w\.]+/,
          keyword: KEYWORDS.join(" "),
          // STATEMENT_KEYWORDS.concat(REGULAR_KEYWORDS).join(" "),
          literal: LITERALS.join(" "),
          built_in: BUILT_INS.join(" ")
        },
      },
      FUNCTION_CALL,
      VARIABLE,
      STRING,
      hljs.C_NUMBER_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      COMMENT_MODE,
      hljs.HASH_COMMENT_MODE,
      OPERATOR
    ]
  };
}
