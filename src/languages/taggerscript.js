/*
Language: Tagger Script
Author: Philipp Wolfer <ph.wolfer@gmail.com>
Description: Syntax Highlighting for the Tagger Script as used by MusicBrainz Picard.
 */
function(hljs) {

  return {
    contains: [{
      className: 'comment',
      begin: /\$noop\(/,
      end: /\)/,
      contains: [{
        begin: /\(/,
        end: /\)/,
        contains: ['self', {
          begin: /\\./
        }]
      }]
    }, {
      className: 'title',
      begin: /\$(?!noop)[a-zA-Z][_a-zA-Z0-9]*/,
      end: /\(/,
      excludeEnd: true
    }, {
      className: 'keyword',
      begin: /%[_a-zA-Z0-9:]*/,
      end: '%'
    }, {
      className: 'symbol',
      begin: /\\./
    }]
  }
}
