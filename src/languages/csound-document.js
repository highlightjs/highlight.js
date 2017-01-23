/*
Language: Csound Document
Requires: csound.js, csound-score.js
Author: Nathan Whetsell <nathan.whetsell@gmail.com>
Category: miscellaneous
*/

function(hljs) {
  var Csound = hljs.getLanguage('csound');

  return {
    contains: Csound.COMMENT_MODES.concat([
      {
        className: 'tag',
        // The lookahead pattern after CsInstruments is doing the same thing as
        // the one in
        // https://github.com/isagalaev/highlight.js/blob/master/src/languages/xml.js
        begin: /<CsInstruments(?=\s|>|$)/, end: '>',
        keywords: {name: 'CsInstruments'},
        starts: {
          end: '</CsInstruments>', returnEnd: true,
          subLanguage: 'csound'
        }
      },
      {
        className: 'tag',
        begin: /<CsScore(?=\s|>|$)/, end: '>',
        keywords: {name: 'CsScore'},
        starts: {
          end: '</CsScore>', returnEnd: true,
          subLanguage: 'csound-score'
        }
      },
      {
        className: 'tag',
        begin: '</?', end: '/?>',
        contains: [
          {
            className: 'name',
            relevance: 0,
            begin: /[^\/><\s]+/
          }
        ]
      }
    ])
  };
}
