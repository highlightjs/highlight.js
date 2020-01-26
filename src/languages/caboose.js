/*
Language: Caboose
Author: Landon Gravat <railinator4903@gmail.com>
Description: Provides highlighting for Caboose code files
Website: https://github.com/CabooseLang
*/

function(hljs) {
  const keywords_raw = [
    'fun', 'var', 'class', 'static', // Declarations
    'if', 'else', // Conditions
    'for', 'while', // Loops
    'import', // Self-explanatory
    'and', 'or', // Comparison
  ];
  
  const builtins_raw = [
    // Void Builtins
    'print',

    // Regular Builtins
    'clock', 'input', 'len', 'number', 'bool', 'str', 
  ];

  const CABOOSE_KEYWORDS = {
    keyword: keywords_raw.join(' '),
    built_in: builtins_raw.join(' '),
    literal: 'true false nil'
  };

  return {
    aliases: ['caboose'],
    keywords: CABOOSE_KEYWORDS,
    contains: [
      {
        // Shebang
        className: 'meta',
        begin: /^#!/, end: /$/,
      },
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'function',
        beginKeywords: 'function', end: /\{/, excludeEnd: true,
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          {
            className: 'params',
            begin: '\\(', end: '\\)',
            contains: [
              'self',
              hljs.C_BLOCK_COMMENT_MODE,
              hljs.QUOTE_STRING_MODE,
              hljs.C_NUMBER_MODE
            ]
          }
        ]
      },
    ],
    illegal: /#/,
  }
}