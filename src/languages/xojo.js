/*
Language: Xojo
Description: Xojo is a statically typed, cross-platform object-oriented programming language.
Author: Dr Garry Pettet <contact@garrypettet.com>
Website: https://xojo.com
*/

export default function(hljs) {
  return {
    aliases: ['xojo'],
    case_insensitive: true,
    keywords: {
      keyword:
        'AddHandler AddressOf Aggregates And Array As Assigns Async Attributes Await Break ByRef ByVal ' +
        'Call Case Catch Class Const Continue CType Declare Dim Do DownTo ' +
        'Each Else ElseIf End Enum Event Exception Exit Extends Finally For Function ' +
        'Global GoTo Handles If Implements In Inherits Interface Is IsA ' +
        'Lib Loop Me Mod Module ' +
        'Namespace New Next Nil Not ' +
        'Of Optional Or ' +
        'ParamArray Private Property Protected Public ' +
        'Raise RaiseEvent Redim RemoveHandler Return ' +
        'Select Self Shared Soft Static Step Structure Sub Super ' +
        'Then To Try Until Using Var WeakAddressOf Wend While With Xor',
      data_type:
        'Auto Boolean CFStringRef CGFloat Color CString Currency ' +
        'Delegate Double Enumeration Int8 Int16 Int32 Int64 Integer Object ' +
        'OSType PString Prt Short Single String Structure Text ' +
        'UInt8 UInt16 UInt32 UInt64 UInteger Variant WindowPtr WString',
      literal:
        'True False Nil'
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.COMMENT('REM\\b', '$'),
      hljs.COMMENT('\'', '$'),
      hljs.COMMENT('\/\/', '$'),
      {
        className: 'double',
        variants: [
          { begin: '\\b\\d+\\.\\d+[eE]-?\\d+' },
          { begin: '\\b\\d+\\.\\d+' }
        ]
      },
      {
        className: 'integer',
        variants: [
          { begin: '\\b\\d+[eE]-?\\d+' },
          { begin: '\\b\\d+' },
          { begin: '\\&h[a-fA-F0-9]+' },
          { begin: '\\&o[0-7]+' },
          { begin: '\\&b[0-1]+' }
        ]
      },
      {
        className: 'color',
        begin: '\\&c',
        contains: [
          {
            className: 'rgb_component',
            begin: '[a-fA-F0-9]{2}'
          }
        ]
      },
      {
        className: 'meta',
        begin: '#Bad|#Else|#ElseIf|#EndIf|#If|#Pragma|#Tag'
      }
    ]
  };
}
