/*
Language: Swift
Description: Swift is a general-purpose programming language built using a modern approach to safety, performance, and software design patterns.
Author: Chris Eidhof <chris@eidhof.nl>
Contributors: Nate Cook <natecook@gmail.com>, Alexander Lichter <manniL@gmx.net>, Steven Van Impe <steven.vanimpe@icloud.com>
Website: https://swift.org
Category: common, system
*/

import { concat } from "../lib/regex";

export default function(hljs) {
  var SWIFT_KEYWORDS = {
      // override the pattern since the default of of /\w+/ is not sufficient to
      // capture the keywords that start with the character "#"
      $pattern: /[\w#]+/,
      keyword: '#available #colorLiteral #column #else #elseif #endif #file ' +
        '#fileLiteral #function #if #imageLiteral #line #selector #sourceLocation ' +
        '_ __COLUMN__ __FILE__ __FUNCTION__ __LINE__ Any as as! as? associatedtype ' +
        'associativity break case catch class continue convenience default defer deinit didSet do ' +
        'dynamic dynamicType else enum extension fallthrough false fileprivate final for func ' +
        'get guard if import in indirect infix init inout internal is lazy left let ' +
        'mutating nil none nonmutating open operator optional override postfix precedence ' +
        'prefix private protocol Protocol public repeat required rethrows return ' +
        'right self Self set some static struct subscript super switch throw throws true ' +
        'try try! try? Type typealias unowned var weak where while willSet',
      literal: 'true false nil',
      built_in: 'abs advance alignof alignofValue anyGenerator assert assertionFailure ' +
        'bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC ' +
        'bridgeToObjectiveCUnconditional c compactMap contains count countElements countLeadingZeros ' +
        'debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords ' +
        'enumerate equal fatalError filter find getBridgedObjectiveCType getVaList ' +
        'indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC ' +
        'isUniquelyReferenced isUniquelyReferencedNonObjC join lazy lexicographicalCompare ' +
        'map max maxElement min minElement numericCast overlaps partition posix ' +
        'precondition preconditionFailure print println quickSort readLine reduce reflect ' +
        'reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split ' +
        'startsWith stride strideof strideofValue swap toString transcode ' +
        'underestimateCount unsafeAddressOf unsafeBitCast unsafeDowncast unsafeUnwrap ' +
        'unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer ' +
        'withUnsafePointerToObject withUnsafeMutablePointer withUnsafeMutablePointers ' +
        'withUnsafePointer withUnsafePointers withVaList zip'
    };

  var TYPE = {
    className: 'type',
    begin: '\\b[A-Z][\\w\u00C0-\u02B8\']*',
    relevance: 0
  };
  // slightly more special to swift
  var OPTIONAL_USING_TYPE = {
    className: 'type',
    begin: '\\b[A-Z][\\w\u00C0-\u02B8\']*[!?]'
  };
  var BLOCK_COMMENT = hljs.COMMENT(
    '/\\*',
    '\\*/',
    {
      contains: ['self']
    }
  );

  // https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#grammar_numeric-literal
  // TODO: Update for leading `-` after lookbehind is supported everywhere
  var decimalDigits = '([0-9]_*)+';
  var hexDigits = '([0-9a-fA-F]_*)+';
  var NUMBER = {
      className: 'number',
      relevance: 0,
      variants: [
        // decimal floating-point-literal (subsumes decimal-literal)
        { begin: `\\b(${decimalDigits})(\\.(${decimalDigits}))?` +
          `([eE][+-]?(${decimalDigits}))?\\b` },

        // hexadecimal floating-point-literal (subsumes hexadecimal-literal)
        { begin: `\\b0x(${hexDigits})(\\.(${hexDigits}))?` +
          `([pP][+-]?(${decimalDigits}))?\\b` },

        // octal-literal
        { begin: /\b0o([0-7]_*)+\b/ },

        // binary-literal
        { begin: /\b0b([01]_*)+\b/ },
      ]
  };

  // https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#grammar_string-literal
  var ESCAPED_CHARACTER = (rawDelimiter = "") => ({
    className: 'subst',
    variants: [
      { begin: concat(/\\/, rawDelimiter, /[0\\tnr"']/) },
      { begin: concat(/\\/, rawDelimiter, /u\{[0-9a-fA-F]{1,8}\}/) }
    ]
  });
  var ESCAPED_NEWLINE = (rawDelimiter = "") => ({
    className: 'subst',
    begin: concat(/\\/, rawDelimiter, /[\t ]*(?:[\r\n]|\r\n)/)
  });
  var INTERPOLATION = (rawDelimiter = "") => ({
    className: 'subst',
    begin: concat(/\\/, rawDelimiter, /\(/),
    end: /\)/
  });
  var MULTILINE_STRING = (rawDelimiter = "") => ({
    begin: concat(rawDelimiter, /"""/),
    end: concat(/"""/, rawDelimiter),
    contains: [ESCAPED_CHARACTER(rawDelimiter), ESCAPED_NEWLINE(rawDelimiter), INTERPOLATION(rawDelimiter)]
  });
  var SINGLE_LINE_STRING = (rawDelimiter = "") => ({
    begin: concat(rawDelimiter, /"/),
    end: concat(/"/, rawDelimiter),
    contains: [ESCAPED_CHARACTER(rawDelimiter), INTERPOLATION(rawDelimiter)]
  });
  var STRING = {
    className: 'string',
    variants: [
      MULTILINE_STRING(),
      MULTILINE_STRING("#"),
      MULTILINE_STRING("##"),
      MULTILINE_STRING("###"),
      SINGLE_LINE_STRING(),
      SINGLE_LINE_STRING("#"),
      SINGLE_LINE_STRING("##"),
      SINGLE_LINE_STRING("###"),
    ]
  };
  // TODO: Interpolation can contain any expression, so there's room for improvement here.
  for (const variant of STRING.variants) {
    const interpolation = variant.contains[variant.contains.length - 1]
    interpolation.contains = [STRING, NUMBER];
  }

  return {
    name: 'Swift',
    keywords: SWIFT_KEYWORDS,
    contains: [
      STRING,
      hljs.C_LINE_COMMENT_MODE,
      BLOCK_COMMENT,
      OPTIONAL_USING_TYPE,
      TYPE,
      NUMBER,
      {
        className: 'function',
        beginKeywords: 'func', end: /\{/, excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: /[A-Za-z$_][0-9A-Za-z$_]*/
          }),
          {
            begin: /</, end: />/
          },
          {
            className: 'params',
            begin: /\(/, end: /\)/, endsParent: true,
            keywords: SWIFT_KEYWORDS,
            contains: [
              'self',
              NUMBER,
              STRING,
              hljs.C_BLOCK_COMMENT_MODE,
              {begin: ':'} // relevance booster
            ],
            illegal: /["']/
          }
        ],
        illegal: /\[|%/
      },
      {
        className: 'class',
        beginKeywords: 'struct protocol class extension enum',
        keywords: SWIFT_KEYWORDS,
        end: '\\{',
        excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/})
        ]
      },
      {
        className: 'meta', // @attributes
        begin: '(@discardableResult|@warn_unused_result|@exported|@lazy|@noescape|' +
                  '@NSCopying|@NSManaged|@objc|@objcMembers|@convention|@required|' +
                  '@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|' +
                  '@infix|@prefix|@postfix|@autoclosure|@testable|@available|' +
                  '@nonobjc|@NSApplicationMain|@UIApplicationMain|@dynamicMemberLookup|' +
                  '@propertyWrapper|@main)\\b'

      },
      {
        beginKeywords: 'import', end: /$/,
        contains: [hljs.C_LINE_COMMENT_MODE, BLOCK_COMMENT],
        relevance: 0
      }
    ]
  };
}
