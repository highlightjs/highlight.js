/*
 Language: SQL
 Website: https://en.wikipedia.org/wiki/SQL
 Category: common
 */

/*

Goals:

SQL is intended to highlight basic/common SQL keywords and expressions

- It is not intended to include tons of vendor specific keywords
  such as Oracle, MySQL, PostgreSQL, etc...
- For more specific SQL grammars please see:
  - PostgreSQL and PL/pgSQL - core
  - T-SQL - https://github.com/highlightjs/highlightjs-tsql

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
    "ABORT",
    "ACTION",
    "ADD",
    "AFTER",
    "ALL",
    "ALTER",
    "ALWAYS",
    "ANALYZE",
    "AND",
    "AS",
    "ASC",
    "ATTACH",
    "AUTOINCREMENT",
    "BEFORE",
    "BEGIN",
    "BETWEEN",
    "BY",
    "CASCADE",
    "CASE",
    "CAST",
    "CHECK",
    "COLLATE",
    "COLUMN",
    "COMMIT",
    "CONFLICT",
    "CONSTRAINT",
    "CREATE",
    "CROSS",
    "CURRENT",
    "CURRENT_DATE",
    "CURRENT_TIME",
    "CURRENT_TIMESTAMP",
    "DATABASE",
    "DEFAULT",
    "DEFERRABLE",
    "DEFERRED",
    "DELETE",
    "DESC",
    "DETACH",
    "DISTINCT",
    "DO",
    "DROP",
    "EACH",
    "ELSE",
    "END",
    "ESCAPE",
    "EXCEPT",
    "EXCLUDE",
    "EXCLUSIVE",
    "EXISTS",
    "EXPLAIN",
    "FAIL",
    "FILTER",
    "FIRST",
    "FOLLOWING",
    "FOR",
    "FOREIGN",
    "FROM",
    "FULL",
    "GENERATED",
    "GLOB",
    "GROUP",
    "GROUPS",
    "HAVING",
    "IF",
    "IGNORE",
    "IMMEDIATE",
    "IN",
    "INDEX",
    "INDEXED",
    "INITIALLY",
    "INNER",
    "INSERT",
    "INSTEAD",
    "INTERSECT",
    "INTO",
    "IS",
    "ISNULL",
    "JOIN",
    "KEY",
    "LAST",
    "LEFT",
    "LIKE",
    "LIMIT",
    "MATCH",
    "NATURAL",
    "NO",
    "NOT",
    "NOTHING",
    "NOTNULL",
    "NULL",
    "NULLS",
    "OF",
    "OFFSET",
    "ON",
    "OR",
    "ORDER",
    "OTHERS",
    "OUTER",
    "OVER",
    "PARTITION",
    "PLAN",
    "PRAGMA",
    "PRECEDING",
    "PRIMARY",
    "QUERY",
    "RAISE",
    "RANGE",
    "RECURSIVE",
    "REFERENCES",
    "REGEXP",
    "REINDEX",
    "RELEASE",
    "RENAME",
    "REPLACE",
    "RESTRICT",
    "RIGHT",
    "ROLLBACK",
    "ROW",
    "ROWS",
    "SAVEPOINT",
    "SELECT",
    "SET",
    "TABLE",
    "TEMP",
    "TEMPORARY",
    "THEN",
    "TIES",
    "TO",
    "TRANSACTION",
    "TRIGGER",
    "UNBOUNDED",
    "UNION",
    "UNIQUE",
    "UPDATE",
    "USING",
    "VACUUM",
    "VALUES",
    "VIEW",
    "VIRTUAL",
    "WHEN",
    "WHERE",
    "WINDOW",
    "WITH",
    "WITHOUT"
  ];

  const RELEVANT_KEYWORDS = [
    "where",
    "constraint",
    "table",
    "values",
    "primary"
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

  const FUNCTION_CALL = {
    begin: regex.concat(regex.either(...FUNCTIONS),/\s*\(/),
    keywords: {
      built_in: FUNCTIONS.join(" ")
    }
  };

  // makes all keywords worth 0 by default
  // SQL simply has too many keywords to match them top-level
  // without any other context
  function defaultScoreZero(list, {exceptions}) {
    return list.map((item) => {
      if (item.match(/\|\d+$/) || exceptions.includes(item)) {
        return item;
      } else {
        return `${item}|0`;
      }
    });
  }

  return {
    name: 'SQL',
    case_insensitive: true,
    // does not include {} or HTML tags `</`
    illegal: /[{}]|<\//,
    keywords: {
      $pattern: /[\w\.]+/,
      keyword:
        // STATEMENT_KEYWORDS.concat(
          // defaultScoreZero(REGULAR_KEYWORDS, {exceptions: RELEVANT_KEYWORDS}))
        KEYWORDS.join(" "),
      literal: LITERALS.join(" "),
      built_in: BUILT_INS.join(" ")
    },
    contains: [
      {
        begin: regex.either(...COMBOS),
        relevance: 0,
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
      hljs.HASH_COMMENT_MODE
    ]
  };
}
