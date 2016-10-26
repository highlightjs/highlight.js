/*
Language: Haxe
Author: Christopher Kaster <ikasoki@gmail.com> (Based on the actionscript.js language file by Alexander Myadzel)
*/

function(hljs) {
  var IDENT_RE = '[a-zA-Z_$][a-zA-Z0-9_$]*';
  var IDENT_FUNC_RETURN_TYPE_RE = '([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)';

  var HAXE_BASIC_TYPES = 'Int Float String Bool Dynamic Void Array ';

  return {
    aliases: ['hx'],
    keywords: {
      keyword:
        'package import using extern',
      built_in:
        'trace',
      literal:
        'true false null',
    },
    contains: [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      { className: 'meta', // compiler meta
        begin: '@:', end: '$'
      },
      { className: 'meta', // compiler conditionals
        begin: '#', end: '$',
        keywords: {'meta-keyword': 'if else elseif end error'}
      },
      { className: 'type', // types
        begin: ':[ \t]*', end: '\\W',
        excludeBegin: true, excludeEnd: true,
      },
      { className: 'class', // enums
        beginKeywords: 'enum', end: '{'
      },
      { className: 'class', // abstracts
        beginKeywords: 'abstract', end: '{',
        keywords: {
          keyword: 'abstract from to'
        }
      },
      { className: 'class',
        beginKeywords: 'class interface', end: '{', excludeEnd: true,
        keywords: {
          keyword: 'extends implements'
        }
      }
    ]
  };
}
