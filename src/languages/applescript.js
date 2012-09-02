/*
Language: AppleScript
*/

function(hljs) {
  return {
    defaultMode: {
      keywords: {
        keyword:
          'about above after against and around as at back before beginning ' +
          'behind below beneath beside between but by considering contain ' +
          'contain contains continue copy div does eighth else end equal ' +
          'equals error every exit fifth first for fourth from front ' +
          'get given global if ignoring in into is it its last local ' +
          'middle mod ninth not of on onto or over prop property put ref ' +
          'reference repeat return returning script second set seventh since ' +
          'since sixth some tell tenth that the then third through thru ' +
          'timeout times to transaction try until where while whose with ' +
          'without',
        built_in:
          'true false me my'
      },
      contains: [
        hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: ''}),
        hljs.HASH_COMMENT_MODE,
        {
          className: 'comment',
          begin: '--', end: '$'
        },
        {
          className: 'comment',
          begin: '\\(\\*', end: '\\*\\)'
        },
        hljs.C_NUMBER_MODE,
      ]
    }
  };
}
