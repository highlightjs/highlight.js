/*
Language: Batch file (DOS)
Author: Alexander Makarov <sam@rmcreative.ru>
Contributors: Anton Kochkov <anton.kochkov@gmail.com>
Website: https://en.wikipedia.org/wiki/Batch_file
Category: scripting
*/

/** @type LanguageFn */
export default function(hljs) {
  const COMMENTS = [
    hljs.COMMENT(/^\s*@?rem\b/, /$/ ),
    hljs.COMMENT(/^::/, /$/)
  ];
  const LABEL_RE = /:[A-Z._?][A-Z0-9_$#@~.?]*/;
  const LABEL_FUNCTION = {
    className: 'title.function',
    match: hljs.regex.concat(/^/,LABEL_RE),
    starts: {
      contains: [
        {
          scope: "comment",
          match: /.+(?=$)/,
        }
      ]
    }
  };
  const KEYWORDS = [
    "if",
    "else",
    "goto",
    "for",
    "in",
    "do",
    "call",
    "exit",
    "not",
    "exist",
    "errorlevel",
    "defined",
    "equ",
    "neq",
    "lss",
    "leq",
    "gtr",
    "geq"
  ];
  const BUILT_INS = [
    "prn",
    "nul",
    "lpt3",
    "lpt2",
    "lpt1",
    "con",
    "com4",
    "com3",
    "com2",
    "com1",
    "aux",
    "shift",
    "cd",
    "dir",
    "echo",
    "setlocal",
    "endlocal",
    "set",
    "pause",
    "copy",
    "append",
    "assoc",
    "at",
    "attrib",
    "break",
    "cacls",
    "cd",
    "chcp",
    "chdir",
    "chkdsk",
    "chkntfs",
    "cls",
    "cmd",
    "color",
    "comp",
    "compact",
    "convert",
    "date",
    "dir",
    "diskcomp",
    "diskcopy",
    "doskey",
    "erase",
    "fs",
    "find",
    "findstr",
    "format",
    "ftype",
    "graftabl",
    "help",
    "keyb",
    "label",
    "md",
    "mkdir",
    "mode",
    "more",
    "move",
    "path",
    "pause",
    "print",
    "popd",
    "pushd",
    "promt",
    "rd",
    "recover",
    "rem",
    "rename",
    "replace",
    "restore",
    "rmdir",
    "shift",
    "sort",
    "start",
    "subst",
    "time",
    "title",
    "tree",
    "type",
    "ver",
    "verify",
    "vol",
    // winutils
    "ping",
    "net",
    "ipconfig",
    "taskkill",
    "xcopy",
    "ren",
    "del"
  ];

  const DISPATCH = {
    match: [
      /call|goto/,
      /\s*/,
      LABEL_RE
    ],
    scope: {
      1: "keyword",
      3: "title.function"
    }
  }

  const VARIABLE = {
    scope: 'variable',
    begin: /%%[^ ]|%[^ ]+?%|![^ ]+?!/
  }

  const STRINGS = [
    {
      scope: 'string',
      begin: /"/,
      end: /"/,
      contains: [
        VARIABLE
      ]
    },
    {
      scope: 'string',
      begin: /'/,
      end: /'/,
      contains: [
        VARIABLE
      ]
    }
  ]

  return {
    name: 'Batch file (DOS)',
    aliases: [
      'bat',
      'cmd'
    ],
    case_insensitive: true,
    illegal: /\/\*/,
    keywords: {
      keyword: KEYWORDS,
      built_in: BUILT_INS
    },
    contains: [
      ...STRINGS,
      VARIABLE,
      LABEL_FUNCTION,
      DISPATCH,
      {
        className: 'number',
        begin: /\b\d+/
      },
      ...COMMENTS
    ]
  };
}
