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
        match: [
          /[^\u2401\u0001]+/,
          /=(?!=)/,
          /[^\u2401\u0001]+/,
          /([\u2401\u0001])/
        ],
        // this is weird, string signal
        scope: {
          1: "attr",
          3: "string"
        }
      },
    ],
    case_insensitive: true
  };
}
