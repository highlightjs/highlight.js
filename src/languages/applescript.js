/*
Language: AppleScript
Authors: Nathan Grigg <nathan@nathanamy.org>
         Dr. Drang <drdrang@gmail.com>
*/

function(hljs) {
  var STRING = hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: ''});
  var TITLE = {
    className: 'title', begin: hljs.UNDERSCORE_IDENT_RE
  };
  var PARAMS = {
    className: 'params',
    begin: '\\(', end: '\\)',
    contains: ['self', hljs.C_NUMBER_MODE, STRING]
  };
  var COMMENTS = [
    {
      className: 'comment',
      begin: '--', end: '$',
    },
    {
      className: 'comment',
      begin: '\\(\\*', end: '\\*\\)',
      contains: ['self', {begin: '--', end: '$'}] //allow nesting
    },
    hljs.HASH_COMMENT_MODE
  ];

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
        STRING,
        hljs.C_NUMBER_MODE,
        {
          className: 'function_start',
          beginWithKeyword: true,
          keywords: 'on',
          illegal: '[${=;\\n]',
          contains: [TITLE, PARAMS]
        },
        {
          className: 'unix',
          begin: 'do shell script|quoted form|POSIX path',
        },
        {
          className: 'ui',
          begin: 'display dialog|display alert|choose from list|' +
                 'choose file|choose folder|choose color',
        }
      ].concat(COMMENTS)
    }
  };
}
