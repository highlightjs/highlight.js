/*
Language: Red language
Author: Oldes <oldes.huhuman@gmail.com>
Category: functional, scripting
Description: Red is both an imperative and functional programming language, which syntax and general usage directly overlaps with that of the interpreted Rebol language.
*/

function(hljs) {
  var CHAR_INLINE = {
    className: 'string',
    begin: '\\^(\\(([0-9a-fA-F]+|del)\\)|.)',
  };
  var STRING = {
    className: 'string',
    illegal: '\\n',
    variants: [
      {begin: '"', end: '"'},
      {begin: '%"', end: '"'} //file with spaces
    ],
    contains: [
      CHAR_INLINE
    ]
  };
  var STRING_MULTILINE = {
    className: 'string',
    begin: '{', end: '}',
    contains: [CHAR_INLINE, 'self']
  }
  var CHAR = {
    className: 'string',
    begin: '#\"(\\^(\\(([0-9a-fA-F]+|del|null|page|back|line|tab|esc)\\)|.)|[^\\^\\\"@/-])\"'
  };
  var TAG = {
    className: 'string',
    begin: '<[^\\s\\n\\t<=>]+', end: '>', //TODO: must be improved!
    illegal: '\\n',
  };
  var FILE = {
    className: 'string',
    begin: '%[^\\s\\n\\[\\]\\(\\)]+'
  };
  var EMAIL = {
    className: 'string',
    begin: '[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
  };
  var URL = {
    className: 'string',
    begin: '[A-Za-z][\\w]{1,9}:(/{0,3}[^\\s\\n\\[\\]\\(\\)]+|//)'
  }
  var COMMENT1 = {
    className: 'doctag',
    begin: ';(-|@@).*',
    illegal: '\\n'
  };
  var COMMENT2 = {
    className: 'comment',
    begin: ';.*',
    illegal: '\\n'
  };
  var COMMENT_SPECIAL = {
    className: 'comment',
    begin: '\\s: ', end: '\\n',
    //contains: [hljs.C_NUMBER_MODE]
  };
  var COMMENT_SPECIAL2 = {
    className: 'doctag',
    begin: /^(>>|red>>)/,
    relevance: 10
    //contains: [hljs.C_NUMBER_MODE]
  };
  var COMMENT_ERROR = {
    className: 'doctag',
    begin: /^[\*]{2}[\*]*\s/, end: /\n/,
    //contains: [hljs.C_NUMBER_MODE]
  };
  var BINARY64 = {
    className: 'string',
    begin: '64#\\{[0-9a-zA-Z+/=\\s]*\\}',
    relevance: 10
  };
  var BINARY16 = {
    className: 'string',
    begin: '(16)?#\\{\\s*([0-9a-fA-F]{2,2}\\s*)*\\}',
    relevance: 10
  };
  var BINARY2 = {
    className: 'string',
    begin: '2#\\{(([01]\\s*){8})*\\}',
    relevance: 10
  };
  var PAIR = {
    className: 'number',
    begin: /[-+]?\d+x[-+]?\d+/
  };
  var DATE = {
    className: 'number',
    begin: '\\d{1,2}\\-(\\d{1,2}|[A-Za-z]{3}|January|Febuary|March|April|May|June|July|August|September|October|November|December)\\-\\d{4}(/\\d{1,2}[:]\\d{1,2}([:]\\d{1,2}(\\.\\d{1,5})?)?([+-]\\d{1,2}[:]\\d{1,2})?)?'
  }
  var TIME = {
    className: 'number',
    begin: /([-+]?[:]\d{1,2}([aApP][mM])?)|([-+]?[:]\d{1,2}[.]\d{0,9})|([-+]?\d{1,2}[:]\\d{1,2}([aApP][mM])?)|([-+]?\d{1,2}[:]\d{1,2}[.]\d{0,9})|([-+]?\d{1,2}[:]\d{1,2}[:]\d{1,2}([.]\d{0,9})?([aApP][mM])?)(?!\w)/
  };
  var TUPLE = {
    className: 'number',
    begin: '(\\d{0,3}[.]\\d{0,3}[.]\\d{0,3}([.]\\d{0,3}){0,7})'
  };
  var NUMBER_HEX = {
    className: 'number',
    begin: '([0-9A-F]+)h(?=\\s|\\)|\\]|/|;|\\\"|{\\[|\\(|$)'
  };
  var NUMBER_MONEY = {
    className: 'number',
    begin: '-?[a-zA-Z]*\\$\\d+(\\.\\d*)?'
  };
  var NUMBER = {
    className: 'number',
    begin: /\b[-+]?(?:[.,]\d+|\d+['\d]*(?:[.,]\d*)?)(?:e[-+]?\d+)?%?/
  };
  var SET_WORD = {
    className: 'section',
    begin: /(([+-]+(\.\'?)?)|[a-zA-Z\u00A1-\uFFFF?!.*&|=_~])+[a-zA-Z\u00A1-\uFFFF0-9?!.*&|=_~+\-\\']*:(?=\s|\(|\[|\)|\]|\/|;|\"|{|$)/,
    relevance: 1
  };
  var GET_WORD = {
    className: 'section',
    begin: /:(([+-]+(\.\'?)?)|[a-zA-Z\u00A1-\uFFFF?!.*&|=_~])+[a-zA-Z\u00A1-\uFFFF0-9?!.*&|=_~+\-\\']*(?=\s|\(|\[|\)|\]|\/|;|\"|{|$)/,
    relevance: 2
  };
  var REFINEMENT = {
    className: 'variable',
    begin: '/[^\\s\\n\\[\\]\\(\\)]*'
  }
  var LIT_WORD = {
    className: 'literal',
    begin: /\'(([+-]+(\.\'?)?)|[a-zA-Z\u00A1-\uFFFF?!.*&|=_~])+[a-zA-Z\u00A1-\uFFFF0-9?!.*&|=_~+\-\\']*(?=\s|\(|\[|\)|\]|\/|;|\"|{|$)/,
    relevance: 2
  };
  var ISSUE = {
    className: 'string',
    begin: /#[^\s\n\[\]\(\)\/]+/
  };
  var DATATYPE = {
    className: 'literal',
    begin: /[a-zA-Z\u00A1-\uFFFF_\-\!\?\`\*&\|\=\~\^]+[a-zA-Z\u00A1-\uFFFF0-9_\-\!\?\`\*&\|\=\~\^\+\-\.\']*\!(?=\s|\(|\[|\)|\]|\/|;|\"|{|$)/ //cases like: any-integer! float! etc..
  };
  var OPERATOR = {
    className: 'built_in',
    begin: /(==|!=|<=|>=|<>|<|>|>>|>>>|<<|\+|-|=|\*|%|\/|\b(and|or|xor))(?=\s|\(|\[|\)|\]|\/|;|\"|{|$)/
  };
  var BRACKET = {
    className: 'regexp',
    begin: /(\[|\]|\(|\))+|#\(|#\[/   //colors also start of serialized values and maps
  };
  var WORD_KEY = {
     className: 'keyword',
     begin: '(make|set|print|probe|func|function|does|has|do|while|until|unless|if|either|else|'+
            'foreach|forall|forskip|for|remove-each|until|while|case|loop|repeat|switch|'+
            'at|insert|append|tail|head|back|repend|next|to|thru|collect|keep|return|throw|catch|continue|break|'+
            'open|close|load|reduce|rejoin|insert|bind|parse|union|intersect|unique|charset|extend|object|context|view)'+
            '(?=\\s|\\(|\\[|\\)|\\]|\\/|;|\\"|{|$)'
  };
  var WORD_LITERAR = {
     className: 'literal',
     begin: /(off|on|yes|no|true|false|null|none|not|all|any|opt|end)(?=\s|\(|\[|\)|\]|\/|;|\"|{|$)/
  };
  var WORD_BUILT_IN = {
     className: 'built_in',
     begin: /(random|absolute|add|divide|multiply|negate|remainder|subtract|pick|poke|reverse|select|find)(?=\s|\(|\[|\)|\]|\/|;|\"|{|$)/
  };
  var WORD = {
    begin: /[a-zA-Z\u00A1-\uFFFF_\-\!\?\`\*&\|\=\~\^]+[a-zA-Z\u00A1-\uFFFF0-9_\-\!\?\`\*&\|\=\~\^\+\-\.\']*(?=\s|\(|\[|\)|\]|\/|;|\"|{|$)/,
    relevance: 0
  };
  return {
    aliases: ['red', 'red/system', 'rebol'],
    case_insensitive: true,
    lexemes: /[a-zA-Z][a-zA-Z0-9_\-']*/,
      
    illegal: /,|:|\/\*|\/\/|\/\\|%{|[a-zA-Z\&],|\$[a-zA-Z_\(]|[\'#]\s|@\d|\^[:{|:']|@.+/,
    contains: [
      STRING, STRING_MULTILINE, CHAR, FILE, URL, EMAIL, TAG, REFINEMENT, DATATYPE, LIT_WORD,
      BINARY2, BINARY16, BINARY64, 
      COMMENT1, COMMENT2, COMMENT_SPECIAL, COMMENT_SPECIAL2, COMMENT_ERROR,
      PAIR, DATE, TIME, TUPLE,
      OPERATOR,
      SET_WORD, GET_WORD, BRACKET, ISSUE,
      NUMBER_HEX, NUMBER_MONEY, 
      NUMBER,
      WORD_KEY, WORD_LITERAR, WORD_BUILT_IN, WORD
    ]
  };
}
