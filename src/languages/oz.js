/*
Language: Oz
Author: Guillaume Maudoux <layus.on@gmail.com>
Category: misc
Home page: http://mozart.github.io/
Description: Oz is a multi-paradigm language that is designed for advanced,
  concurrent, networked, soft real-time, and reactive applications. It combines
  ongoing research in programming language design and implementation,
  constraint logic programming, distributed computing, and human-computer
  interfaces.
*/

function(hljs) {
  var COMMENT = {
    variants: [
      hljs.COMMENT('%', '$'),
      hljs.COMMENT( '/\\*', '\\*/', {relevance: 0})
    ]
  };

  var IDENTIFIER = {
    className: 'title',
    variants: [
      { begin: '[A-Z][A-Za-z]*' },
      { begin: '\\$' },
    ]
  }

  var OPERATOR = {
    className: 'symbol',
    variants: [
      { begin: '\\$|\\+|-|==|<=|>=|#|\\|', relevance: 0},
      { begin: '\\\\=|=<', relevance: 10 }
    ]
  }

  var FUNCTION = {
    begin: '(fun|proc)( *lazy)?( *)?\\{',
    returnBegin: true,
    end: '}',
    className: 'function',
    relevance: 0,
    keywords: {
      keyword: 'fun proc',
      meta: 'lazy'
    },
    contains: [
      { begin: '{ *', end: ' *', contains: [ IDENTIFIER ], relevance: 10 },
      { begin: '!|\\?', className: 'comment', relevance: 10},
      OPERATOR,
    ]
  };

  return {
    aliases: ['oz'],
    keywords: {
      keyword: 'andthen at attr case catch choice ' +
      'class cond declare define dis do ' +
      'div else elsecase elseif elseof end ' +
      'export fail feat finally from for ' +
      'functor if import in local ' +
      'lock meth mod not of or orelse ' +
      'prepare prop raise require ' +
      'self skip suchthat then thread try',
      literal: 'true false unit',
    },
    contains: [
      COMMENT,
      FUNCTION,
      OPERATOR,
      hljs.QUOTE_STRING_MODE,
      { className: 'keyword', begin: '\\[\\]' },
      { className: 'literal', begin: "'", end: "'", relevance: 0},
      { className: 'symbol', begin: '`', end: '`' },

      // No markup, relevance booster
      { begin: '\\bnil\\b' },
    ]
  };
}
