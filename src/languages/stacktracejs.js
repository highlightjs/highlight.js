/*
Language: StacktraceJS
Author: Brian Lagerman <lagerman@netpoint.de>
Contributors: Irakli Abetschkhrischwili <irakli@netpoint.de>
Description: Browser stacktraces formatted via stacktrace.js (https://www.stacktracejs.com/)
*/

function (hljs) {
  var KEYWORDS = {
    keyword: 'async prototype anonymous function',
  };
  var ERROR = {
    className: 'type',
    begin: '^\\w{0,}Error:',
    relevance: 40 // We're really not less
  }
  var LINE_NUMBER = {
    className: 'number', 
    begin: ':[0-9]{1,}'
  };
  var FUNCTION = {
    className: 'function',
    begin: '^',
    end: '\\(.*.?\\)',
    keywords: KEYWORDS,
    excludeEnd:true
  };
  return {
    case_insensitive: true,

    contains: [
      ERROR,
      LINE_NUMBER,
      {
        className: 'link',
        contains: [LINE_NUMBER],
        variants: [
          {
            begin: '@\\s{0,}',
            excludeBegin:true,
            end: '$'
          },
          {
            begin: 'https?://',
            end: '.(\\.m?js)',
          }
        ],
      },
      FUNCTION
    ]
  };
}