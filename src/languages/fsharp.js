/*
Language: F#
Author: Jonas Follesø <jonas@follesoe.no>, Henrik Feldt <henrik@haf.se>
Description: F# language definition.
*/
function(hljs) {
  var TYPEPARAM_NAME_RE = '\'[a-zA-Z0-9_]+';

  return {
    keywords:
      // monad builder keywords (at top, matches before non-bang kws)
      'yield! return! let! do!' +
      // regular keywords
      'abstract and as assert base begin class default delegate do done ' +
      'downcast downto elif else end exception extern false finally for ' +
      'fun|10 function global if in inherit inline interface internal lazy let ' +
      'match member module mutable|10 namespace new null of open or ' +
      'override private public rec|10 return sig static struct then to ' +
      'true try type upcast use val void when while with yield',
    contains: [
      {
        className: 'string',
        begin: '@"', end: '"',
        contains: [{begin: '""'}]
      },
      {
        className: 'string',
        begin: '"""', end: '"""'
      },
      {
        className: 'comment',
        begin: '//', end: '$', returnBegin: true
      },
      {
        className: 'comment',
        begin: '\\(\\*', end: '\\*\\)'
      },
      {
        className: 'class',
        beginWithKeyword: true, end: '\\(|=|$',
        keywords: 'type',
        contains: [
          {
            className: 'title',
            begin: hljs.UNDERSCORE_IDENT_RE
          }
        ]
      },
      {
        className: 'annotation',
        begin: '\\[<', end: '>\\]',
        relevance: 10
      },
      {
        className: 'typeparam',
        begin: '<', end: '>',
        contains: [
          { className: 'title'
          , begin: TYPEPARAM_NAME_RE }
        ]
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),
      hljs.C_NUMBER_MODE
    ]
  }
}
