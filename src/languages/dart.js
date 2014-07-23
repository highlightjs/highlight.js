/*
Language: Dart
Requires: markdown.js
Author: Maxim Dikun <dikmax@gmail.com>
Description: Dart is a JavaScript replacement language developed by Google. For more information see http://dartlang.org/
*/

function (hljs) {
  var SUBST = {
    className: 'subst',
    begin: '\\$\\{', end: '}',
    keywords: 'true false null this is new super'
  };

  var STRING = {
    className: 'string',
    variants: [
      {
        begin: 'r\'\'\'', end: '\'\'\'',
        relevance: 10
      },
      {
        begin: 'r"""', end: '"""',
        relevance: 10
      },
      {
        begin: 'r\'', end: '\'',
        illegal: '\\n',
        relevance: 10
      },
      {
        begin: 'r"', end: '"',
        illegal: '\\n',
        relevance: 10
      },
      {
        begin: '\'\'\'', end: '\'\'\'',
        contains: [hljs.BACKSLASH_ESCAPE, SUBST],
        relevance: 10
      },
      {
        begin: '"""', end: '"""',
        contains: [hljs.BACKSLASH_ESCAPE, SUBST],
        relevance: 10
      },
      {
        begin: '\'', end: '\'',
        illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE, SUBST]
      },
      {
        begin: '"', end: '"',
        illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE, SUBST]
      }
    ]
  };
  SUBST.contains = [
    hljs.C_NUMBER_MODE, STRING
  ];

  var KEYWORDS = {
    keyword: 'assert break case catch class const continue default do else enum extends false final finally for if ' +
      'in is new null rethrow return super switch this throw true try var void while with',
    literal: 'abstract as dynamic export external factory get implements import library operator part set static typedef',
    built_in:
      // dart:core
      'print Comparable DateTime Duration Function Iterable Iterator List Map Match Null Object Pattern RegExp Set ' +
      'Stopwatch String StringBuffer StringSink Symbol Type Uri bool double int num ' +
      // dart:html
      'document window querySelector querySelectorAll Element ElementList'
  };

  return {
    keywords: KEYWORDS,
    contains: [
      STRING,
      {
        className: 'dartdoc',
        begin: '/\\*\\*', end: '\\*/',
        subLanguage: 'markdown',
        subLanguageMode: 'continuous',
        relevance: 5
      },
      {
        className: 'dartdoc',
        begin: '///', end: '$',
        subLanguage: 'markdown',
        subLanguageMode: 'continuous',
        relevance: 5
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'class',
        beginKeywords: 'class interface', end: '{', excludeEnd: true,
        contains: [
          {
            beginKeywords: 'extends implements',
            relevance: 10
          },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      hljs.C_NUMBER_MODE,
      {
        className: 'annotation', begin: '@[A-Za-z]+'
      },
      {
        begin: '=>' // No markup, just a relevance booster
      }
    ]
  }
}

