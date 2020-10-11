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

  const MULTI_WORD_BUILT_INS = [
    "double precision"
  ];
  const BUILT_INS = [
    'array',
    'bigint',
    'binary',
    // 'bit',  // MS SQL
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
    // 'int8', // postgres
    'integer',
    'interval',
    'number',
    'numeric',
    'real',
    // 'record', Dunno?
    // 'serial', Oracle?
    // 'serial8', Oracle?
    'smallint',
    'text',
    'time',
    'timestamp',
    // 'tinyint', // MySQL specific
    'varchar',
    'varying', // modifier (character varying)
    'void'
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

  const SCALAR_FUNCTIONS = [
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

  const FUNCTIONS = [].concat(AGG_FUNCTIONS, SCALAR_FUNCTIONS, DATE_FUNCTIONS);

  const KEYWORDS = [
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
    "begin",
    "between",
    "by", // good (group by)
    "cascade",
    "case",
    "cast",
    "check",
    "collate",
    "column",
    "commit", // good
    "conflict",
    "constraint", // good
    "create", // good (create table)
    "cross",
    "current",
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
    "following",
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
    "preceding",
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
    "rollback",
    "row",
    "rows",
    "savepoint",
    "select", // good
    "set",
    "table", // good
    "temp",
    "temporary",
    "then",
    "ties",
    "to|0",
    "transaction",
    "trigger",
    "unbounded",
    "union", // good
    "unique", // good
    "update", // good
    "using",
    "vacuum",
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
      OPERATOR
    ]
  };
}
