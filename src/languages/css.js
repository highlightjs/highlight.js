/*
Language: CSS
*/

hljs.LANGUAGES.css = function() {
  var FUNCTION = {
    className: 'function',
    begin: hljs.IDENT_RE + '\\(', end: '\\)',
    contains: [{
        endsWithParent: true, excludeEnd: true,
        contains: [hljs.NUMBER_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
    }]
  };
  var PSEUDO = {
    className: 'pseudo',
    begin: ':(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\"\\\']+'
  };
  var AT_RULE = {
    className: 'at_rule',
    begin: '@', end: '[{;]',
    returnEnd: true,
    lexems: '[a-z-]+',
    keywords: {'import': 1, 'page': 1, 'media': 1, 'charset': 1, 'font-face': 1},
    contains: [
      FUNCTION,
      hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      PSEUDO
    ]
  };
  var RULE = {
    className: 'rule',
    begin: '[^\\s{]', returnBegin: true, end: ';', endsWithParent: true,
    contains: [
      {
        className: 'attribute',
        begin: '[A-Z\\_\\.\\-]+', end: ':',
        excludeEnd: true,
        illegal: '[^\\s]',
        starts: {
          className: 'value',
          endsWithParent: true, excludeEnd: true,
          contains: [
            FUNCTION,
            hljs.NUMBER_MODE,
            hljs.QUOTE_STRING_MODE,
            hljs.APOS_STRING_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            {
              className: 'hexcolor', begin: '\\#[0-9A-F]+'
            },
            {
              className: 'important', begin: '!important'
            }
          ]
        }
      }
    ]
  };
  var RULES = {
    className: 'rules',
    begin: '{', end: '}',
    illegal: '[^\\s]',
    relevance: 0
  };
  RULES.contains = [hljs.C_BLOCK_COMMENT_MODE, AT_RULE, RULES, RULE];

  return {
    case_insensitive: true,
    defaultMode: {
      illegal: '[=/|\']',
      contains: [
        hljs.C_BLOCK_COMMENT_MODE,
        AT_RULE,
        {
          className: 'id', begin: '\\#[A-Za-z0-9_-]+'
        },
        {
          className: 'class', begin: '\\.[A-Za-z0-9_-]+',
          relevance: 0
        },
        {
          className: 'attr_selector',
          begin: '\\[', end: '\\]',
          illegal: '$'
        },
        PSEUDO,
        {
          className: 'tag', begin: hljs.IDENT_RE,
          relevance: 0
        },
        RULES
      ]
    }
  };
}();
