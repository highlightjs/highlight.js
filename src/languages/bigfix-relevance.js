/*
Language: BigFix Relevance
Author: Brian Green <briangreenery@gmail.com>
Category: enterprise
*/

function(hljs) {
  function longestFirst(a, b) {
    return b.length - a.length;
  }

  var keywords = [
    'and',
    'as',
    'contains',
    'does not contain',
    'does not end with',
    'does not equal',
    'does not start with',
    'else',
    'ends with',
    'equals',
    'exist',
    'exist no',
    'exists',
    'exists no',
    'false',
    'if',
    'is',
    'is contained by',
    'is equal to',
    'is greater than',
    'is greater than or equal to',
    'is less than',
    'is less than or equal to',
    'is not',
    'is not contained by',
    'is not equal to',
    'is not greater than',
    'is not greater than or equal to',
    'is not less than',
    'is not less than or equal to',
    'it',
    'mod',
    'nil',
    'not',
    'nothing',
    'nothings',
    'null',
    'of',
    'or',
    'starts with',
    'then',
    'there do not exist',
    'there does not exist',
    'there exist',
    'there exist no',
    'there exists',
    'there exists no',
    'true',
    'whose'
  ];

  var keywordsRe = keywords
    .sort(longestFirst)
    .join('|')
    .replace(/\s+/g, '\\s+((a|an|the)\\s+)*');

  return {
    case_insensitive: true,
    contains: [
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'number',
        begin: '\\b[0-9]+',
        relevance: 0
      },
      {
        className: 'string',
        begin: '"', end: '"',
        relevance: 0
      },
      {
        className: 'keyword',
        begin: '\\b(' + keywordsRe + ')\\b',
        relevance: 2
      }
    ]
  };
};
