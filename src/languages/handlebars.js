/*
Language: Handlebars
Requires: xml.js
Author: Robin Ward <robin.ward@gmail.com>
Description: Matcher for Handlebars as well as EmberJS additions.
Website: https://handlebarsjs.com
Category: template
*/
function (hljs) {
  var BUILT_INS = {'builtin-name': 'each in with if else unless bindattr action collection debugger log outlet template unbound view lookup'};

  var IDENTIFIER_PLAIN_OR_QUOTED = {
    begin: /".*?"|'.*?'|\[.*?\]|\w+/
  };

  function BLOCK_MUSTACHE_CONTENTS() {
    return hljs.inherit(EXPRESSION_OR_HELPER_CALL(), {
      className: 'name'
    });
  }

  function BASIC_MUSTACHE_CONTENTS() {
    return hljs.inherit(EXPRESSION_OR_HELPER_CALL(), {
      // relevance 0 for backward compatibility concerning auto-detection
      relevance: 0
    });
  }

  function EXPRESSION_OR_HELPER_CALL() {
    return hljs.inherit(IDENTIFIER_PLAIN_OR_QUOTED, {
      keywords: BUILT_INS,
      starts: HELPER_PARAMETERS()
    });
  }

  function HELPER_PARAMETERS() {
    return {
      endsWithParent: true,
      relevance: 0,
      contains: [
        hljs.inherit(IDENTIFIER_PLAIN_OR_QUOTED, {
          relevance: 0
        })
      ]
    };
  }

  return {
    aliases: ['hbs', 'html.hbs', 'html.handlebars'],
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT(/\{\{!--/, /--\}\}/),
      hljs.COMMENT(/\{\{!/, /\}\}/),
      {
        begin: /\\{{/,
        skip: true
      },
      // raw block (open) {{{{raw}}}} verbatim xml {{{{/raw}} {{handlebars}}
      {
        className: 'template-tag',
        begin: /\{\{\{\{(?!\/)/, end: /\}\}\}\}/,
        contains: [
          BLOCK_MUSTACHE_CONTENTS()
        ],
        starts: {
          end: /\{\{\{\{\//,
          returnEnd: true,
          subLanguage: 'xml'
        }
      },
      // raw block (close)
      {
        className: 'template-tag',
        begin: /\{\{\{\{\//, end: /\}\}\}\}/,
        contains: [
          BLOCK_MUSTACHE_CONTENTS()
        ]
      },
      // standard blocks {{#block}} ... {{/block}}
      {
        className: 'template-tag',
        begin: /\{\{[#\/]/, end: /\}\}/,
        contains: [
          BLOCK_MUSTACHE_CONTENTS()
        ],
      },
      // triple mustaches {{{unescapedOutput}}}
      {
        className: 'template-variable',
        begin: /\{\{\{/, end: /\}\}\}/,
        keywords: BUILT_INS,
        contains: [
          BASIC_MUSTACHE_CONTENTS()
        ]
      },
      // standard mustaches {{{htmlEscapedOutput}}}
      {
        className: 'template-variable',
        begin: /\{\{/, end: /\}\}/,
        keywords: BUILT_INS,
        contains: [
          BASIC_MUSTACHE_CONTENTS()
        ]
      }
    ]
  };
}
