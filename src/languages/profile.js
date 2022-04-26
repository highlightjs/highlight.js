/*
Language: Python profiler
Description: Python profiler results
Author: Brian Beck <exogen@gmail.com>
*/

export default function(hljs) {
  return {
    name: 'Python profiler',
    contains: [
      hljs.C_NUMBER_MODE,
      {
        begin: /[a-zA-Z_][\da-zA-Z_]+\.[\da-zA-Z_]{1,3}/,
        end: ':',
        excludeEnd: true
      },
      {
        begin: /^\s*(ncalls|tottime|cumtime)/,
        end: '$',
        keywords: 'ncalls tottime cumtime filename percall lineno function',
        contains: [
          { match: /[:()]/, scope: "punctuation" }
        ]
      },
      {
        match: /function calls(?=\s)/,
        relevance: 2
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        match: [
          /\(/,
          /.*?/,
          /\)$/
        ],
        scope: {
          2: "string"
        },
        relevance: 0
      }
    ]
  };
}
