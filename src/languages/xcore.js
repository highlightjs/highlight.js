/*
Language: Xcore
Author: Gerson Sunyé <sunye@protonmail.com>
Description: Xcore is an extended concrete syntax for Ecore
Category: mde
*/

function(hljs) {
  return {
    keywords: {
      keyword: 'package import abstract class extends enum interface type wraps op ' +
        'annotation as ' +
        'contains container opposite refers val ' +
        'derived get set unsettable ' +
        'for try catch if else throw return ' +
        'create convert new ' +
        '@Ecore @Import @GenModel ',
      literal: 'true false null ',
      built_in: 'BigDecimal BigInteger Boolean Byte Character Class Date Double Float Integer Long Object Short ' +
        'String boolean int '
    },
    contains: [{
        className: 'string',
        begin: '\'',
        end: '\'',
        contains: [hljs.BACKSLASH_ESCAPE, {
          begin: '""'
        }]
      },
      hljs.NUMBER_MODE,
      hljs.COMMENT('--', '$'),
      {
        className: 'class',
        beginKeywords: 'class interface',
        end: /[{;=]/,
        excludeEnd: true,
        keywords: 'class extends interface',
        illegal: /[:"\[\]]/,
        contains: [{
            beginKeywords: 'extends'
          },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      }
    ]
  }
}
