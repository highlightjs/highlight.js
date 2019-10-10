/*
Language: Handlebars
Requires: xml.js
Author: Robin Ward <robin.ward@gmail.com>
Description: Matcher for Handlebars as well as EmberJS additions.
Category: template
*/
function(hljs) {
  var BUILT_INS = {'builtin-name': 'each in with if else unless bindattr action collection debugger log outlet template unbound view yield'};
  function MUSTACHE_CONTENTS() {
    return  {
      className: 'name',
      begin: /[a-zA-Z\.-]+/,
      keywords: BUILT_INS,
      starts: {
        endsWithParent: true, relevance: 0,
        contains: [
          hljs.QUOTE_STRING_MODE
        ]
      }
    };
  }

  return {
    aliases: ['hbs', 'html.hbs', 'html.handlebars'],
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT(/\{\{!--/, /--\}\}/),
      hljs.COMMENT(/\{\{!/, /\}\}/),
      // raw block {{{{raw}}}} verbatim xml {{{{/raw}} {{handlebars}}
      {
        className: 'template-tag',
        begin: /\{\{\{\{\//, end: /\}\}\}\}/,
        contains: [MUSTACHE_CONTENTS()]
      },
      {
        className: 'template-tag',
        begin: /\{\{\{\{/, end: /\}\}\}\}/,
        contains: [MUSTACHE_CONTENTS()],
        starts: {
          end: /\{\{\{\{\//,
          returnEnd: true,
          subLanguage: 'xml'
        }
      },
      // standard blocks {{#block}} ... {{/block}}
      {
        className: 'template-tag',
        begin: /\{\{[#\/]/, end: /\}\}/,
        contains: [MUSTACHE_CONTENTS()],
      },
      // triple mustaches {{{unescapedOutput}}}
      {
        className: 'template-variable',
        begin: /\{\{\{/, end: /\}\}\}/,
        keywords: BUILT_INS
      },
      // standard mustaches {{{htmlEscapedOutput}}}
      {
        className: 'template-variable',
        begin: /\{\{/, end: /\}\}/,
        keywords: BUILT_INS
      }
    ]
  };
}
