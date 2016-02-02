/*
Language: PHP in HTML
Requires: php.js, xml.js
Category: common
*/

function(hljs) {
  return {
    subLanguage: 'xml',
    contains: [
      {
        begin: /<\?(php)?/, end: /\?>/,
        subLanguage: 'php',
        contains: [{begin: '/\\*', end: '\\*/', skip: true}]
      }
    ]
  }
}
