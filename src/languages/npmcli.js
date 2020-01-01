/*
Language: NPM CLI
*/
  function npmcli(hljs) {
    var VAR = {
        className: 'variable',
        variants: [
        {begin: /\$[\w\d#@][\w\d_]*/},
        {begin: /\$\{(.*?)}/}
        ]
    };
    var PARAMETER =
    {
      // Match command line parameters (-p, -u)
      className: 'parameter',
      variants: [ //single dash, double dash, double dash in square brackets
        {begin: ' -{1,2}[a-zA-Z\-]*'},
        {begin: '--[a-zA-Z\-]*'},
        {begin: '\[--[a-zA-Z\-]*\]'},
      ],
      relevance: 0
    };

    var QUOTE_STRING = {
        className: 'string',
        begin: /"/, end: /"/,
        contains: [
        hljs.BACKSLASH_ESCAPE,
        VAR,
        {
            className: 'variable',
            begin: /\$\(/, end: /\)/,
            contains: [hljs.BACKSLASH_ESCAPE]
        }
        ]
    };
    var APOS_STRING = {
        className: 'string',
        begin: /'/, end: /'/
    };
    var AngleBracket_STRING = {
        className: 'string',
        begin: /</, end: />/
    };

  return {
    aliases: ['npmcli', 'npm'],
    lexemes: /\b[a-zA-Z][a-zA-Z0-9_-]*\b/,
    keywords: {
        keyword:
        'npm|10 ' +
        'access adduser audit bin bugs build bundle cache ci completion config ' +
        'dedupe deprecate dist-tag docs doctor edit explore help-search help hook ' +
        'init install-ci-test install-test install link logout ls org outdated owner ' +
        'pack ping prefix profile prune publish rebuild repo restart root run-script ' +
        'search shrinkwrap star stars start stop team test token ' +
        'uninstall unpublish update version view whoami',
      literal:
        'true false',
      built_in:
        'ls cd'
    },
    contains: [
      {
        // Match typed numeric constants (1000, 12.34!, 1.2e5, 1.5#, 1.2D2)
        className: 'number',
        begin: '\\b([0-9]+[0-9edED\.]*[#\!]?)',
        relevance: 0
      },
      PARAMETER,
      AngleBracket_STRING,
      hljs.HASH_COMMENT_MODE,
      QUOTE_STRING,
      APOS_STRING,
      VAR
    ]
  };
}
