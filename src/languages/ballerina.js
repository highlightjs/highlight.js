/*
Language: Ballerina
Author: Shan Mahanama <gambit1024@gmail.com>
Category: integration
Description: Ballerina language (ballerinalang). For more info about language see https://ballerinalang.org/
*/

function(hljs) {
  var BALLERINA_KEYWORDS = {
    keyword:
      'package import as public native service resource function connector action struct ' +
      'annotation enum parameter const typemapper worker xmlns returns version int float ' +
      'boolean string blob map json xml datatable any type var create attach transform if ' +
      'else iterate while next break fork join some all timeout try catch finally throw ' +
      'return reply transaction abort aborted committed failed retry lengthof typeof with',
    literal:
       'true false null',
    built_in:
      'Description Param Return Field NullReferenceException IllegalStateException equalsIgnoreCase' +
      'toUpperCase subString lastIndexOf replaceFirst length contains indexOf trim hasSuffix unescape' +
      'toLowerCase hasPrefix replaceAll replace split toBlob print println sleep getEnv isSingleton' +
      'isEmpty elements select getItemType getElementName getTextValue children selectChildren' +
      'setChildren copy strip slice setAttributes toJSON selectDescendants removeAttribute'
  };
  return {
    aliases: ['ballerinalang'],
    keywords: BALLERINA_KEYWORDS,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      {
        className: 'string',
        variants: [
          hljs.QUOTE_STRING_MODE,
          {begin: '`', end: '`'},
        ]
      },
      {
        className: 'number',
        variants: [
          {begin: hljs.C_NUMBER_RE + '[dflsi]', relevance: 1},
          hljs.C_NUMBER_MODE
        ]
      },
      {
        className: 'function',
        beginKeywords: 'function', end: /\s*\{/, excludeEnd: true,
        contains: [
          hljs.TITLE_MODE,
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            keywords: BALLERINA_KEYWORDS,
            illegal: /["']/
          }
        ]
      },
      {
        className: 'meta', begin: '@[A-Za-z]+(:[A-Za-z]+)?'
      }
    ]
  };
}
