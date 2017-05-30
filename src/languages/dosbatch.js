/*
Language: Windows command/bat
Author: Anton Kochkov <xvilka@gmail.com>
*/

function(hljs) {
  var COMMENTS = {
      className: 'comment',
      begin: 'rem', end: '$',
	  relevance: 10
  };
  var LABEL = {
	  className: 'label',
      begin: '^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)',
      relevance: 0
  };

  return {
	case_insensitive: true,
    lexemes: hljs.UNDERSCORE_IDENT_RE,
    keywords: {
      keyword:
		'and or not if else for goto call exit nul set setlocal|10 endlocal|10',
      built_in:
		'append assoc at attrib break cacls cd chcp chdir chkdsk|10 chkntfs cls cmd color ' +
		'comp compact convert copy date del dir diskcomp diskcopy|10 doskey echo erase fs ' +
		'find findstr|10 format ftype graftabl help keyb label md mkdir mode more move path ' +
		'pause print popd pushd promt rd recover rem ren rename replace restore rmdir shift' +
		'sort start subst time title tree type ver verify vol xcopy',
	  operator:
		'equ neq lss leq gtr geq',
    },
    contains: [
	  COMMENTS,
      {
        className: 'function',
        begin: LABEL.begin, end: 'goto:eof',
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {begin: '([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*'}),
		  COMMENTS
        ].concat(COMMENTS),
		relevance: 10
      },
      hljs.C_NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
    ])
  };
}
