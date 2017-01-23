/*
Language: Csound Score
Requires: csound.js
Author: Nathan Whetsell <nathan.whetsell@gmail.com>
Category: miscellaneous
*/

function(hljs) {
  var Csound = hljs.getLanguage('csound');

  return {
    illegal: /`/,
    contains: Csound.COMMENT_MODES.concat([
      Csound.MACRO_USE_MODE
    ]).concat(
      Csound.PREPROCESSOR_MODES
    ).concat([
      {
        className: 'keyword',
        // This avoids ABNF as Csound scores.
        relevance: 0,
        begin: /(?:[nN]|[pP])[pP]|[abCefimnqstvwxyz]/
      },
      Csound.NUMBER_MODE,
      {
        // This helps language detection.
        relevance: 10,
        begin: /\^[+-]/
      },
      {
        className: 'string',
        begin: '"', end: '"',
        illegal: /\n/,
        contains: [
          Csound.MACRO_USE_MODE
        ]
      }
    ])
  };
}
