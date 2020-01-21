/*
Language: Xojo
Description: Xojo is a statically typed, cross-platform object-oriented programming language.
Author: Dr Garry Pettet <contact@garrypettet.com>
Website: https://xojo.com
*/

function(hljs) {
  return {
    aliases: ['xojo'],
    case_insensitive: true,
    keywords: {
      keyword:
        'AddHandler AddressOf Aggregates And Array As Assigns Async Attributes Await Break ByRef ByVal' + /* a-b */
        'Call Case Catch Class Const Continue CType Declare Dim Do DownTo ' + /* c-d */
        'Each Else ElseIf End Enum Event Exception Exit Extends Finally For Function ' + /* e-f */
        'Global GoTo Handles If Implements In Inherits Interface Is IsA ' + /* g-i */
        'Lib Loop Me Mod Module ' + /* j-m */
        'Namespace New Next Nil Not ' + /* n */
        'Of Optional Or ' + /* o */
        'ParamArray Private Property Protected Public ' + /* p */
        'Raise RaiseEvent Redim RemoveHandler Return ' + /* r */
        'Select Self Shared Soft Static Step Structure Sub Super ' + /* s */
        'Then To Try Until Using Var WeakAddressOf Wend While With Xor', /* t-y */
      data_type:
        'Auto Boolean CFStringRef CGFloat Color CString Currency ' +  /* a-c */
        'Delegate Double Enumeration Int8 Int16 Int32 Int64 Integer Object ' + /* d-o */
        'OSType PString Prt Short Single String Structure Text ' + /* o - t */
        'UInt8 UInt16 UInt32 UInt64 UInteger Variant WindowPtr WString', /* u-w */
      literal:
        'True False Nil'
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.COMMENT('REM', '$'),
      hljs.COMMENT('\'', '$'),
      hljs.COMMENT('\/\/', '$'),
      {
        className: 'double',
        variants: [
          {begin: '\\b\\d+\\.\\d+[eE]-?\\d+'},
          {begin: '\\b\\d+\\.\\d+'}
        ]
      },
      {
        className: 'integer',
        variants: [
          {begin: '\\b\\d+[eE]-?\\d+'},
          {begin: '\\b\\d+'}
        ]
      }, 
      {
        className: 'color',
        begin: '\&c[a-fA-F0-9]{2}[a-fA-F0-9]{2}[a-fA-F0-9]{2}([a-fA-F0-9]{2})?'
      },      
      {
        className: 'meta',
        variants: [
          {begin: 'Bad|Else|ElseIf|EndIf|If|Pragma|Tag'}
        ],

      }  
    ]
  };
}