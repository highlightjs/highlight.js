/*
Language: ERB (Embedded Ruby)
Requires: xml.js, ruby.js
Author: Lucas Mazza <lucastmazza@gmail.com>
*/
function(hljs) {
  return {
    aliases: ['erb'],
    case_insensitive: true,
    subLanguage: 'xml', subLanguageMode: 'continuous',
    contains: [
      {
        begin: '<%[%=-]?', end: '[%-]?%>',
        subLanguage: 'ruby', subLanguageMode: 'continuous'
      },
    ]
  };
}
