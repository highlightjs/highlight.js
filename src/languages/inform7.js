/*
Language: Inform 7
Author: Bruno Dias <bruno.r.dias@gmail.com>
Description: Language definition for Inform 7, a DSL for writing parser interactive fiction.
*/

function(hljs) {
  var START_BRACKET = '\\[';
  var END_BRACKET = '\\]';
  return {
    aliases: ['i7'],
    case_insensitive: true,
    keywords: {
      // Some keywords more or less unique to I7, for relevance.
      keyword:
        // kind:
        'thing|10 room|10 person|10 man|10 woman|10 animal|10 container ' +
        'supporter|10 backdrop|10 door|10 ' +
        // characteristic:
        'scenery|10 open closed|10 locked|10 inside|10 gender|10 ' +
        // verb:
        'is are say|10 understand|10 ' +
        // misc keyword:
        'kind|10 of rule|10'
    },
    contains: [
      {
        className: 'string',
        begin: '"', end: '"',
        relevance: 0,
        contains: [
          {
            className: 'subst',
            begin: START_BRACKET, end: END_BRACKET
          }
        ]
      },
      {
        className: 'title',
        beginKeywords: '^Volume ^Book ^Part ^Chapter ^Section',
        end: '$',
        relevance: 10
      },
      {
        // Table
        className: 'title',
        beginKeywords: '^Table',
        end: '$',
        relevance: 10
      },
      {
        // Rule definition
        // This is here for relevance.
        begin: '^\\b(Check|Carry out|Report|Instead of|To|Rule|When|Before|After)',
        end: ':',
        contains: [
          {
            //Rule name
            begin: '\\b\\(This',
            end: '\\)',
            relevance: 10
          }
        ],
        relevance: 10
      },
      {
        className: 'comment',
        begin: START_BRACKET, end: END_BRACKET,
        contains: ['self']
      }
    ]
  };
}
