/*
Language: GraphQL
Author: David Peek <mail@dpeek.com>
Description: GraphQL schema, query, mutation and subscription
*/

function(hljs) {
  return {
    aliases: ['gql'],
    keywords: {
      keyword: 'query mutation subscription|10 type interface union scalar fragment|10 enum on ...',
      literal: 'true false null'
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      { className: 'type',
        begin: '[^\\w][A-Z][a-z]', end: '\\W',
        excludeEnd: true
      },
      { className: 'literal',
        begin: '[^\\w][A-Z][A-Z]', end: '\\W',
        excludeEnd: true
      },
      { className: 'variable',
        begin: '\\$', end: '\\W',
        excludeEnd: true
      },
      {
        className: 'keyword',
        begin: '[.]{2}', end: '\\.',
      },
      {
        className: 'meta',
        begin: '@', end: '\\W',
        excludeEnd: true
      }
    ],
    illegal: /([;<']|BEGIN)/
  }
}
