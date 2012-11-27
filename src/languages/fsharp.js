/*
Language: F#
Author: Jonas Follesø <jonas@follesoe.no>
Description: F# language definition.
*/
function(hljs) {
  return {
    keywords: 
      'abstract and as assert base begin class default delegate do done ' +
      'downcast downto elif else end exception extern false finally for ' +
      'fun function global if in inherit inline interface internal lazy let ' +
      'match member module mutable namespace new null of open or ' + 
      'override private public rec return sig static struct then to ' +
      'true try type upcast use val void when while with yield',  
    contains: [
    
      {
        className: 'string',
        begin: '"', end: '"',
        contains: [
          {begin: '@"', end: ""}
        ]
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
        begin: '\\[<', end: '>\\]'
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE      
    ]
  }
}