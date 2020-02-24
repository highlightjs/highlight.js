/*
Language: Cypher
Author: Johannes Wienke <languitar@semipol.de>
Contributors: Gustavo Reis <gusbemacbe@gmail.com>, Oliver B. Fischer <o.b.fischer@swe-blog.net>
Description: Cypher is a declarative graph query language
Website: https://www.opencypher.org/
*/

export default function(hljs) {
  return {
    case_insensitive: true,
    keywords: {
      keyword:
        'all as asc ascending assert ' +
        'by ' +
        'call case commit contains create csv' +
        'delete desc descending distinct detach' +
        'else ends exists' +
        'foreach ' +
        'has ' +
        'in index ' +
        'join ' +
        'key ' +
        'limit load ' +
        'match merge ' +
        'node not ' +
        'on optional or order ' +
        'periodic ' +
        'remove return ' +
        'scan set skip start starts ' +
        'then ' +
        'union unique unwind using ' +
        'when where with ' +
        'xor ' +
        'yield',
      literal: 'false null true'
    },
    contains: [
      hljs.APOS_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,

      {
        className: 'type',
        begin: /(([->])?\s?\(|-\[)\w*:/,
        excludeBegin: true,
        end: '\\W',
        excludeEnd: true,
      },
      {
        className: 'functionCall',
        begin: /(\s+|,)\w+\(/,
        end: /\)/,
        keywords: {
          built_in: 
            'abs acos any asin atan atan2 avg ' +
            'ceil coalesce collect cos cot count ' +
            'degrees distance ' +
            'endNode exists exp extract ' +
            'filter floor ' +
            'haversin head ' +
            'id ' +
            'keys ' +
            'labels last left length log log10 ltrim ' +
            'max min ' +
            'nodes none ' +
            'percentileCont percentileDisc pi properties ' +
            'radians rand range reduce relationships replace reverse ' +
            'right round rtrim ' +
            'sign sin single size split sqrt stDev stDevP ' +
            'startNode substring sum ' +
            'tail tan timestamp toBoolean toFloat toInteger toLower ' +
            'toString toUpper trim type'
        }
      }
    ]
  }
}

