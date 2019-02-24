/*
Language: Bro
Author: Foster McLane <fkmclane@gmail.com>
Description: Bro is a programming language designed specifically to be able to represent network-related abstractions (e.g. addresses and ports) and as such offers a great deal of functionality and flexibility in terms of helping you accomplish your network-monitoring goals.
Category: misc
*/

function(hljs) {
  var HEX = '[0-9a-fA-F_]';
  var FLOAT = '((\\d*\\.?\\d+)|(\\d+\\.?\\d*))([eE][-+]?\\d+)?';
  var H = '[A-Za-z0-9][-A-Za-z0-9]*';

  var KEYWORDS = {
    keyword:
      'const|0 event|10 export|0 function|0 global|0 hook|10 module|0 option redef type ' +

      'addr|10 any|10 bool|0 count counter double|0 enum|0 file int|0 interval ' +
      'opaque|10 pattern|10 port|10 record set string|0 subnet|10 table|0 time ' +
      'timer vector|0 ' +

      'local|0 add delete print|0 for|0 while|0 next|10 break|0 if|0 else|0 switch|0 break|0 ' +
      'fallthrough|10 when|10 schedule return|0 ' +

      'in is as',

    literal:
       'T F'
  };

  var PREPROC = {
    className: 'meta',
    begin:
      '^\\s*@(deprecated|load|load-plugin|load-sigs|unload|prefixes|if|' +
      'ifdef|ifndef|else|endif)\\b', end: '$',
    contains: [
      {
        className: 'meta-string',
        begin: '"', end: '"',
        illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ],
    relevance: 0
  };

  var META = {
    className: 'meta',
    begin: '@(DEBUG|DIR|FILENAME)\\b'
  };

  var ATTRIBUTE = {
    className: 'attribute',
    begin:
      '&(redef|priority|log|optional|default|add_func|' +
      'delete_func|expire_func|read_expire|write_expire|' +
      'create_expire|synchronized|persistent|rotate_interval|' +
      'rotate_size|encrypt|raw_output|mergeable|error_handler|' +
      'type_column|deprecated)\\b',
    relevance: 10
  };

  var PORT = {
    className: 'number',
    begin: '\\d+/(tcp|udp|icmp|unknown)\\b',
    relevance: 10
  };

  var ADDRESS = {
    className: 'number',
    variants: [
      {begin: '(\\d+\\.){3}\\d+(/\\d+)?'},
      {begin: '\\[(' + HEX + '{0,4}:)+' + HEX + '{0,4}\\](/\\d+)?'}
    ],
  };

  var HOST = {
    className: 'string',
    begin: H + '(\\.' + H + ')+',
    relevance: 0
  };

  var TIME = {
    className: 'number',
    begin: FLOAT + '\\s+(day|hr|min|sec|msec|usec)s?\\b',
  };

  var DECL = {
    beginKeywords:
      'const global module option redef type', end: ';', excludeEnd: true,
    keywords: KEYWORDS,
    contains: [
      PREPROC,
      hljs.HASH_COMMENT_MODE,
      META,
      ATTRIBUTE,
      PORT,
      ADDRESS,
      HOST,
      TIME,
      hljs.C_NUMBER_MODE,
      hljs.REGEXP_MODE,
      hljs.QUOTE_STRING_MODE,
    ],
    relevance: 0
  };

  var CALL = {
    beginKeywords: 'event hook', end: ';', excludeEnd: true,
    keywords: KEYWORDS,
    contains: [
      PREPROC,
      hljs.HASH_COMMENT_MODE,
      META,
      ATTRIBUTE,
      PORT,
      ADDRESS,
      HOST,
      TIME,
      hljs.C_NUMBER_MODE,
      hljs.REGEXP_MODE,
      hljs.QUOTE_STRING_MODE,
    ],
    relevance: 10
  };

  var BODY = {
    begin: '\\{',
    end: '\\}',
    keywords: KEYWORDS,
    contains: [
      PREPROC,
      hljs.HASH_COMMENT_MODE,
      META,
      ATTRIBUTE,
      PORT,
      ADDRESS,
      HOST,
      TIME,
      hljs.C_NUMBER_MODE,
      hljs.REGEXP_MODE,
      hljs.QUOTE_STRING_MODE,
      CALL,
      'self'
    ],
    relevance: 0
  };

  var FUNC = {
    className: 'function',
    beginKeywords: 'event function hook', end: '\\s*\\{', excludeEnd: true,
    keywords: KEYWORDS,
    contains: [
      PREPROC,
      hljs.HASH_COMMENT_MODE,
      {
        className: 'params',
        begin: '\\(', end: '\\)',
        illegal: '["\']',
        keywords: KEYWORDS
      },
      META,
      ATTRIBUTE,
      PORT,
      ADDRESS,
      HOST,
      TIME,
      hljs.C_NUMBER_MODE,
      hljs.REGEXP_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.TITLE_MODE
    ],
    starts: BODY,
    relevance: 0
  };

  return {
    aliases: ['zeek'],
    illegal: '</',
    keywords: KEYWORDS,
    contains: [
      PREPROC,
      hljs.HASH_COMMENT_MODE,
      META,
      ATTRIBUTE,
      PORT,
      ADDRESS,
      HOST,
      TIME,
      hljs.C_NUMBER_MODE,
      hljs.REGEXP_MODE,
      hljs.QUOTE_STRING_MODE,
      DECL,
      FUNC
    ]
  };
}
