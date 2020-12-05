/*
Language: Swift
Description: Swift is a general-purpose programming language built using a modern approach to safety, performance, and software design patterns.
Author: Chris Eidhof <chris@eidhof.nl>
Contributors: Nate Cook <natecook@gmail.com>, Alexander Lichter <manniL@gmx.net>
Website: https://swift.org
Category: common, system
*/

import { either } from "../lib/regex";

export default function(hljs) {
  // https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#ID413
  // https://docs.swift.org/swift-book/ReferenceManual/zzSummaryOfTheGrammar.html
  const SWIFT_KEYWORDS = {
    // Override the pattern since the default of /\w+/ is not sufficient to capture
    // the keywords that start with a number sign (#) or that have parentheses.
    $pattern: /#?\w+(\(\w+\))?/,
    keyword:
      // Reserved keywords. These require backticks to use as an identifier:
      '_ Any as associatedtype break case catch class continue default defer deinit do else enum extension ' +
      'fallthrough fileprivate fileprivate(set) for func guard if import in init inout internal internal(set) is ' +
      'let operator precedencegroup private private(set) protocol public public(set) repeat rethrows return ' +
      'self Self static struct subscript super switch throw throws try typealias var where while ' +
      // This list includes as, is, and try, even though they're technically operators.
      // The remaining operators as?, as!, try?, and try! are declared in the OPERATOR mode. 

      // Keywords that begin with a number sign:
      '#available #colorLiteral #column #dsohandle #else #elseif #endif #error #file #fileID #fileLiteral #filePath ' +
      '#function #if #imageLiteral #keyPath #line #selector #sourceLocation #warning ' +

      // Keywords reserved in particular contexts. These can be used as identifiers:
      'convenience didSet dynamic final get infix indirect lazy mutating nonmutating open open(set) ' +
      'optional override postfix prefix Protocol required set some Type unowned unowned(safe) unowned(unsafe) weak willSet ',
      // Ideally, these keywords should only be matched in specific modes, as they can result in false positives.
      // For example, the following keywords are commented out because they're only used in
      // precedencegroup declarations, so they will likely result in mostly false positives:
      // 'assignment associativity higherThan left lowerThan none right '
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
  var SUBST = {
    className: 'subst',
    begin: /\\\(/, end: '\\)',
    keywords: SWIFT_KEYWORDS,
    contains: [] // assigned later
  };
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST],
    variants: [
      {begin: /"""/, end: /"""/},
      {begin: /"/, end: /"/},
    ]
  };

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
  SUBST.contains = [NUMBER];

  // https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#ID418
  const operatorHead = either(
    /[/=\-+!*%<>&|^~?]/,
    /[\u00A1–\u00A7]/,
    /[\u00A9\u00AB]/,
    /[\u00AC\u00AE]/,
    /[\u00B0\u00B1]/,
    /[\u00B6\u00BB\u00BF\u00D7\u00F7]/,
    /[\u2016–\u2017]/,
    /[\u2020–\u2027]/,
    /[\u2030–\u203E]/,
    /[\u2041–\u2053]/,
    /[\u2055–\u205E]/,
    /[\u2190–\u23FF]/,
    /[\u2500–\u2775]/,
    /[\u2794–\u2BFF]/,
    /[\u2E00–\u2E7F]/,
    /[\u3001–\u3003]/,
    /[\u3008–\u3020]/,
    /[\u3030]/
  );
  const operatorCharacter = either(
    operatorHead,
    /[\u0300–\u036F]/,
    /[\u1DC0–\u1DFF]/,
    /[\u20D0–\u20FF]/,
    /[\uFE00–\uFE0F]/,
    /[\uFE20–\uFE2F]/,
    // TODO: The following characters are also allowed, but the regex doesn't work as intended.
    // For example, it also matches -10 as an operator.
    // /[\u{E0100}–\u{E01EF}]/u
  );
  const OPERATOR = {
    className: 'operator',
    variants: [
      { // TODO: Replace with negative look-behind when available.
        className: 'keyword',
        begin: /\s(?=as[?!]?\s)/,
        excludeBegin: true,
        end: /as[?!]?(?=\s)/
      },
      { // TODO: Replace with negative look-behind when available.
        className: 'keyword',
        begin: /\s(?=is\s)/,
        excludeBegin: true,
        end: /is(?=\s)/
      },
      { // TODO: Replace with negative look-behind when available.
        className: 'keyword',
        begin: /[^.](?=\btry[?!]?\s)/,
        begin: /(^|[^.])(?=\btry[?!]?\s)/,
        excludeBegin: true,
        end: /try[?!]?(?=\s)/
      },
      { begin: `${operatorHead}${operatorCharacter}*` },
      { begin: `\\.(\\.|${operatorCharacter})+` }
    ]
  };

  return {
    name: 'Swift',
    keywords: SWIFT_KEYWORDS,
    contains: [
      STRING,
      hljs.C_LINE_COMMENT_MODE,
      BLOCK_COMMENT,
      OPERATOR,
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
