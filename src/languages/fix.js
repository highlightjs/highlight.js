/*
Language: FIX
Author: Brent Bradbury <brent@brentium.com>
*/

/** @type LanguageFn */
export default function(hljs) {
  return {
    name: 'FIX',
    contains: [
      {
        begin: /[^\u2401\u0001]+/,
        end: /[\u2401\u0001]/,
        excludeEnd: true,
        returnBegin: true,
        returnEnd: false,
        contains: [
          {
            className: 'attr',
            relevance: 0.5,
            begin: /([^\u2401\u0001=]+)/,
            end: /=([^\u2401\u0001=]+)/,
            returnEnd: true,
            returnBegin: false
          },
          {
            className: 'string',
            relevance: 0.5,
            begin: /=/,
            end: /([\u2401\u0001])/,
            excludeEnd: true,
            excludeBegin: true
          }
        ]
      }
    ],
    case_insensitive: true
  };
}
