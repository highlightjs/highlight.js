/*
Language: Robot Framework
Author: Harri Paavola <harri.paavola@gmail.com>
*/

function(hljs) {
  var VAR = {
    className: 'variable',
    begin: /\$\{/,
    end: /\}/
  };
  var DICT = {
    className: 'variable',
    begin: /\&\{/,
    end: /\}/
  };
  var LIST = {
    className: 'variable',
    begin: /\@\{/,
    end: /\}/
  };
  var NUMBER = {
    className: 'number',
    begin: /\$\{([0-9])/,
    end: /\}/
  };
  var SECTION = {
    className: 'section',
    begin: /^(\*{1,3})/,
    end: /$/
  };
  var DOC = {
    className: 'comment',
    begin: /^\s*\[?Documentation\]?\s+/,
    end: /$/
  };
  var DOC_CONT = {
    className: 'comment',
    begin: /^\.\.\./,
    end: /$/
  };
  var COMMENT = {
    className: 'comment',
    begin: /(^| {2,}|\t|\| {1,})#/,
    end: /$/
  };
  var TEST = {
    className: 'name',
    begin: /(^([^*| |\t|\n)]))\w/,
    end: /($|\s{2,})/,
    contains: [VAR]
  };
  var SETTING = {
    className: 'built_in',
    begin: /^\s+\[(Tags|Setup|Teardown|Template|Timeout|Arguments|Return)\]/,
    end: /$| {2,}|\t/,
    contains: [VAR],
    relevance: 10
  };
  var CONST = {
    className: 'attribute',
    begin: /^(Library|Resource|Test Timeout|Test Template|Test Teardown|Test Setup|Default Tags|Force Tags|Variables|Suite Setup|Suite Teardown)(?:( )|( \| ))/,
    end: /$| {2,}|\t/,
    contains: [VAR],
    relevance: 10
  };
  var GHERKIN = {
    className: 'comment',
    variants: [
      {begin: /^\s{2,}given/, end: /\s/},
      {begin: /^\s{2,}when/, end: /\s/},
      {begin: /^\s{2,}then/, end: /\s/},
      {begin: /^\s{2,}and/, end: /\s/}
    ]
  };
  return {
    case_insensitive: true,
    aliases: ['robot', 'rf'],
    keywords: 'Settings Keywords [Return] [Teardown] [Timeout] [Setup] [Tags] [Arguments] [Documentation]',
    contains: [
      NUMBER,
      VAR,
      DICT,
      LIST,
      SECTION,
      CONST,
      DOC,
      DOC_CONT,
      TEST,
      COMMENT,
      SETTING,
      GHERKIN
    ]
  };
}