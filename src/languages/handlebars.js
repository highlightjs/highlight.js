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

  var ESCAPE_MUSTACHE_WITH_PRECEEDING_BACKSLASH = {begin: /\\{{/, skip: true};
  var PREVENT_ESCAPE_WITH_ANOTHER_PRECEEDING_BACKSLASH = {begin: /\\\\(?={{)/, skip: true};

  var OPEN_RAW_BLOCK = {
    className: 'template-tag',
    begin: /\{\{\{\{(?!\/)/, end: /\}\}\}\}/,
    contains: [BLOCK_MUSTACHE_CONTENTS()],
    starts: {end: /\{\{\{\{\//, returnEnd: true, subLanguage: 'xml'}
  };
  var CLOSE_RAW_BLOCK = {
    className: 'template-tag',
    begin: /\{\{\{\{\//, end: /\}\}\}\}/,
    contains: [BLOCK_MUSTACHE_CONTENTS()]
  };
  var STANDARD_BLOCK = {
    className: 'template-tag',
    begin: /\{\{[#\/]/, end: /\}\}/,
    contains: [BLOCK_MUSTACHE_CONTENTS()],
  };
  var UNESCAPED_OUTPUT = {
    className: 'template-variable',
    begin: /\{\{\{/, end: /\}\}\}/,
    keywords: BUILT_INS,
    contains: [BASIC_MUSTACHE_CONTENTS()]
  };
  var HTML_ESCAPED_OUTPUT = {
    className: 'template-variable',
    begin: /\{\{/, end: /\}\}/,
    keywords: BUILT_INS,
    contains: [
      BASIC_MUSTACHE_CONTENTS()
    ]
  };
  return {
    aliases: ['hbs', 'html.hbs', 'html.handlebars'],
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
      ESCAPE_MUSTACHE_WITH_PRECEEDING_BACKSLASH,
      PREVENT_ESCAPE_WITH_ANOTHER_PRECEEDING_BACKSLASH,
      hljs.COMMENT(/\{\{!--/, /--\}\}/),
      hljs.COMMENT(/\{\{!/, /\}\}/),
      OPEN_RAW_BLOCK,
      CLOSE_RAW_BLOCK,
      STANDARD_BLOCK,
      UNESCAPED_OUTPUT,
      HTML_ESCAPED_OUTPUT
    ]
  };
}
