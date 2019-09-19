/*
Language: ATL
Author: Gerson Sunyé <sunye@protonmail.com>
Description: Atlas Transformation Language
Category: mde
*/

function(hljs) {
  return {
    case_insensitive: false,
    beginKeywords: 'module rule ',
    keywords: {
      keyword: 'module rule to from thisModule abstract query IN OUT extends helper def uses ' +
        'create refining ' +
        'select collect reject forAll exists collectNested closure iterate flatten one first ' +
        'includes excludes excludesAll includesAll including excluding union intersection ' +
        'size avg isEmpty notEmpty count sum average ' +
        'abs div mod max min floor round ' +
        'substring concat toInteger toReal toUpper toLower ' +
        'result    let in ' +
        'self each' +
        'or xor and not implies ' +
        'oclIsUndefined oclIsInvalid hasReturned ' +
        'if then else endif ' +
        'package, endpackage ' +
        'asBag  asSequence asOrderedSet asSet ' +
        'oclIsTypeOf oclIsKindOf oclInState oclIsNew oclIsUndefined oclIsInvalid oclAsType allInstances ' +
        '@pre ',
      literal: 'true false null unknown ',
      built_in: 'Boolean Integer UnlimitedNatural Real String OrderedSet Tuple OrderedSet Bag Set Sequence OclInvalid OclVoid TupleType OclState Collection OclMessage '
    },
    contains: [{
        className: 'string',
        begin: '\'',
        end: '\'',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      hljs.NUMBER_MODE,
      hljs.COMMENT('--', '$'),
      {
        className: 'rule',
        beginKeywords: 'rule abstract',
        end: /[{;=]/,
        excludeEnd: true,
        keywords: 'rule abstract',
        illegal: /[:"\[\]]/,
        contains: [{
            beginKeywords: 'extends'
          },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        className: 'class',
        beginKeywords: 'module',
        end: '$',
        keywords: 'module',
        illegal: /[{}$]/,
        contains: [{
          beginKeywords: 'module'
        },
        hljs.UNDERSCORE_TITLE_MODE
        ]
      }
    ]
  }
}
