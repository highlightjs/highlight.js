/*
Language: Bash
Author: vah <vahtenberg@gmail.com>
Contributrors: Benjamin Pannell <contact@sierrasoftworks.com>
*/

function(hljs) {
  var BASH_LITERAL = 'true false';
  var BASH_KEYWORD = 'if then else elif fi for break continue while in do done exit return set declare case esac export exec';
  var BASH_BUILTIN = 'printf echo read cd pwd pushd popd dirs let eval unset typeset readonly getopts source shopt caller type hash bind help sudo';
  var BASH_OPERATOR = '-ne -eq -lt -gt -f -d -e -s -l -a'; // relevance booster
  var VAR1 = {
    className: 'variable', begin: /\$[\w\d#@][\w\d_]*/
  };
  var VAR2 = {
    className: 'variable', begin: /\$\{(.*?)\}/
  };
  var QUOTE_STRING = {
    className: 'string',
    begin: /"/, end: /"/,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      VAR1,
      VAR2,
      {
        className: 'title',
        begin: /\$\(/, end: /\)/,
        contains: hljs.BACKSLASH_ESCAPE
      }
    ],
    relevance: 0
  };
  var APOS_STRING = {
    className: 'string',
    begin: /'/, end: /'/,
    relevance: 0
  };

  return {
    lexems: /-?[a-z]+/,
    keywords: {
      keyword: BASH_KEYWORD,
      literal: BASH_LITERAL,
      built_in: BASH_BUILTIN,
      operator: BASH_OPERATOR
    },
    contains: [
      {
        className: 'shebang',
        begin: /^#![^\n]+sh\s*$/,
        relevance: 10
      },
      {
        className: 'function',
        begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
        returnBegin: true,
        contains: [{className: 'title', begin: /\w[\w\d_]*/}],
        relevance: 0
      },
      hljs.HASH_COMMENT_MODE,
      hljs.NUMBER_MODE,
      QUOTE_STRING,
      APOS_STRING,
      VAR1,
      VAR2
    ]
  };
}
