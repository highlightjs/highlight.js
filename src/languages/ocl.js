/*
Language: OCL
Author: Gerson Sunyé <sunye@protonmail.com>
Description: Object Constraint Language
Category: mde
*/

function(hljs) {
  return {
    keywords: {
      keyword:
      'context pre post inv init body def derive '+
      'select collect reject forAll exists collectNested closure iterate flatten one '+
      'includes excludes excludesAll includesAll including excluding union intersection ' +
      'size avg isEmpty notEmpty count sum average '+
      'abs div mod max min floor round '+
      'substring concat toInteger toReal toUpper toLower '+
      'result    let in '+
      'self each'+
      'or xor and not implies '+
      'oclIsUndefined oclIsInvalid hasReturned '+
      'if then else endif '  +
      'package, endpackage ' +
      'asBag  asSequence asOrderedSet asSet ' +
      'oclIsTypeOf oclIsKindOf oclInState oclIsNew oclIsUndefined oclIsInvalid oclAsType allInstances ' +
      '@pre ',
      literal:
        'true false null unknown ',
      built_in:
        'Boolean Integer UnlimitedNatural Real String OrderedSet Tuple OrderedSet Bag Set Sequence OclInvalid OclVoid TupleType OclState Collection OclMessage ' 
    },
    contains: [ 
      {
        className: 'string',
        begin: '"', end: '"',
        contains: [hljs.BACKSLASH_ESCAPE, {begin: '\'\''}]
      },
      hljs.NUMBER_MODE, 
      hljs.COMMENT('--', '$') ]
  }
}

