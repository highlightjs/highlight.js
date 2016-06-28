/*
Language: Test Anything Protocol
Requires: yaml.js
Author: Sergey Bronnikov <sergeyb@bronevichok.ru>
Website: https://bronevichok.ru/
Category: common, testing
*/

function(hljs) {
  return {
    aliases: ['tap', 'TAP'],
    case_insensitive: true,
    contains: [
      hljs.COMMENT('#.*', '$'),
      // version of format and total amount of testcases
      {
        className: 'meta',
        variants: [
          { begin: '^TAP version (\\d+)$' },
          { begin: '^1\\.\\.(\\d+)$' }
        ],
      },
      // YAML block
      {
        begin: '(\s+)?---$', end: '\\.\\.\\.$',
        subLanguage: 'yaml',
        relevance: 0
      },
	  // testcase number
      {
        className: 'number',
        begin: ' (\\d+) '
      },
	  // testcase status and description
      {
        className: 'variable',
        variants: [
          { begin: '^ok' },
          { begin: '^not ok' }
        ],
      },
    ]
  };
}
