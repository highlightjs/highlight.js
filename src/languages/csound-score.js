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
        // This avoids detecting ABNF as Csound scores.
        relevance: 0,
        begin: /[nNpP][pP]|[abCefimnqstvxyz]/
        // There is also a w statement that is generated internally and should
        // not be used; see https://github.com/csound/csound/issues/750.
      },
      {
        // z is a constant equal to 800,000,000,000. 800 billion seconds is
        // about 25,367.8 years. See also
        // https://csound.github.io/docs/manual/ScoreTop.html and
        // https://github.com/csound/csound/search?q=stof+path%3AEngine+filename%3Asread.c.
        className: 'built_in',
        begin: /z/
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
