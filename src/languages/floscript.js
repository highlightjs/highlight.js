/*
Language: FloScript
Author: Rostyslav Golda <tx_hv@ukr.net>
Category: configuration
Contributors: Rostyslav Golda <tx_hv@ukr.net>
Description: Floscript is the the configuration language for the ioflo runtime engine. 
*/

function(hljs) {
  var STRING = hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: ''});
  var COMMENTS = [
    hljs.HASH_COMMENT_MODE
  ];

  return {
    case_insensitive: false,
    keywords: {
      keyword:
	'load init server logger loggee first over under next' + 
	'done timeout repeat native benter enter recur exit precur renter rexit print' +
	' put inc copy set aux rear raze go let do bid ready start stop run abort use flo give take',
      literal:
        'false true',
      built_in:
	'to by with from per for cum qua via as at in of on re is if be into and not +-', 
    },
    contains: [
      STRING,
      hljs.C_NUMBER_MODE,
      {
        className: 'class',
        beginKeywords: 'house|10 framer|10'
      },
      {
        className: 'function',
        beginKeywords: 'frame|10 log|10',
      },
      {
        className: 'title',
        begin: '\\b(house|framer|frame)\\s+',
        end: '(\\s+|$)',
        excludeBegin: true,
        excludeEnd: true,

      }

      ,
    ].concat(COMMENTS),
  };
}
