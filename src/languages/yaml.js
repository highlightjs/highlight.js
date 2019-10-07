/*
Language: YAML
Author: Stefan Wienert <stwienert@gmail.com>
Requires: ruby.js
Description: YAML (Yet Another Markdown Language)
Category: common, config
*/
function(hljs) {
  var LITERALS = 'true false yes no null';

  // Define keys as starting with a word character 
  // ...containing word chars, spaces, colons, forward-slashes, hyphens and periods
  // ...and ending with a colon followed immediately by a space, tab or newline.
  // The YAML spec allows for much more than this, but this covers most use-cases.
  var KEY = {
    className: 'attr',
    variants: [
      // TODO: remove |$ hack when we have proper look-ahead support
      { begin: '\\w[\\w :\\/.-]*:(?=[ \t]|$)' },
      { begin: '"\\w[\\w :\\/.-]*":(?=[ \t]|$)' }, //double quoted keys
      { begin: '\'\\w[\\w :\\/.-]*\':(?=[ \t]|$)' } //single quoted keys
    ]
  };

  var TEMPLATE_VARIABLES = {
    className: 'template-variable',
    variants: [
      { begin: '\{\{', end: '\}\}' }, // jinja templates Ansible
      { begin: '%\{', end: '\}' } // Ruby i18n
    ]
  };
  var STRING = {
    className: 'string',
    relevance: 0,
    variants: [
      {begin: /'/, end: /'/},
      {begin: /"/, end: /"/},
      {begin: /\S+/}
    ],
    contains: [
      hljs.BACKSLASH_ESCAPE,
      TEMPLATE_VARIABLES
    ]
  };

  return {
    case_insensitive: true,
    aliases: ['yml', 'YAML', 'yaml'],
    contains: [
      KEY,
      {
        className: 'meta',
        begin: '^---\s*$',
        relevance: 10
      },
      { // multi line string
        className: 'string',
        begin: '[\\|>] *$',
        returnEnd: true,
        contains: STRING.contains,
        // very simple termination: next hash key
        end: KEY.variants[0].begin
      },
      { // Ruby/Rails erb
        begin: '<%[%=-]?', end: '[%-]?%>',
        subLanguage: 'ruby',
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0
      },
      { // local tags
        className: 'type',
        begin: '!' + hljs.UNDERSCORE_IDENT_RE,
      },
      { // data type
        className: 'type',
        begin: '!!' + hljs.UNDERSCORE_IDENT_RE,
      },
      { // fragment id &ref
        className: 'meta',
        begin: '&' + hljs.UNDERSCORE_IDENT_RE + '$',
      },
      { // fragment reference *ref
        className: 'meta',
        begin: '\\*' + hljs.UNDERSCORE_IDENT_RE + '$'
      },
      { // array listing
        className: 'bullet',
        begin: '^ *-',
        relevance: 0
      },
      hljs.HASH_COMMENT_MODE,
      {
        beginKeywords: LITERALS,
        keywords: {literal: LITERALS}
      },
      hljs.C_NUMBER_MODE,
      STRING
    ]
  };
}
