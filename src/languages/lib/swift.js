import {
  concat,
  either
} from '../../lib/regex.js';

// Keywords that require a leading dot.
export const dotKeywords = [
  /Protocol\b/, // contextual
  /Type\b/ // contextual
];

// Keywords that may have a leading dot.
export const optionalDotKeywords = [
  /init\b/,
  /self\b/
];

// Regular keywords and literals.
export const keywords = [
  /\bAny\b/,
  /\bSelf\b/,
  /\b_\b/, // pattern
  /\bassociatedtype\b/,
  /\bas\?\B/, // operator
  /\bas!\B/, // operator
  /\bas\b/, // operator
  /\bbreak\b/,
  /\bcase\b/,
  /\bcatch\b/,
  /\bclass\b/,
  /\bcontinue\b/,
  /\bconvenience\b/, // contextual
  /\bdefault\b/,
  /\bdefer\b/,
  /\bdeinit\b/,
  /\bdidSet\b/, // contextual
  /\bdo\b/,
  /\bdynamic\b/, // contextual
  /\belse\b/,
  /\benum\b/,
  /\bextension\b/,
  /\bfallthrough\b/,
  /\bfileprivate\(set\)\B/,
  /\bfileprivate\b/,
  /\bfinal\b/, // contextual
  /\bfor\b/,
  /\bfunc\b/,
  /\bget\b/, // contextual
  /\bguard\b/,
  /\bif\b/,
  /\bimport\b/,
  /\bindirect\b/, // contextual
  /\binfix\b/, // contextual
  /\binit\?\B/,
  /\binit!\B/,
  /\binout\b/,
  /\binternal\(set\)\B/,
  /\binternal\b/,
  /\bin\b/,
  /\bis\b/, // operator
  /\blazy\b/, // contextual
  /\blet\b/,
  /\bmutating\b/, // contextual
  /\bnonmutating\b/, // contextual
  /\bopen\(set\)\B/, // contextual
  /\bopen\b/, // contextual
  /\boperator\b/,
  /\boptional\b/, // contextual
  /\boverride\b/, // contextual
  /\bpostfix\b/, // contextual
  /\bprecedencegroup\b/,
  /\bprefix\b/, // contextual
  /\bprivate\(set\)\B/,
  /\bprivate\b/,
  /\bprotocol\b/,
  /\bpublic\(set\)\B/,
  /\bpublic\b/,
  /\brepeat\b/,
  /\brequired\b/, // contextual
  /\brethrows\b/,
  /\breturn\b/,
  /\bset\b/, // contextual
  /\bsome\b/, // contextual
  /\bstatic\b/,
  /\bstruct\b/,
  /\bsubscript\b/,
  /\bsuper\b/,
  /\bswitch\b/,
  /\bthrows\b/,
  /\bthrow\b/,
  /\btry\?\B/, // operator
  /\btry!\B/, // operator
  /\btry\b/, // operator
  /\btypealias\b/,
  /\bunowned\(safe\)\B/, // contextual
  /\bunowned\(unsafe\)\B/, // contextual
  /\bunowned\b/, // contextual
  /\bvar\b/,
  /\bweak\b/, // contextual
  /\bwhere\b/,
  /\bwhile\b/,
  /\bwillSet\b/ // contextual
];

// NOTE: Contextual keywords are reserved only in specific contexts.
// Ideally, these should be matched using modes to avoid false positives.

// TODO: Create a PRECEDENCE_GROUP mode to match the remaining contextual keywords:
// assignment associativity higherThan left lowerThan none right
// These aren't included in the list because they result in mostly false positives.

// Literals.
export const literals = [
  /\bfalse\b/,
  /\bnil\b/,
  /\btrue\b/
];

// Keywords that start with a number sign (#).
// #available is handled separately.
export const numberSignKeywords = [
  'colorLiteral',
  'column',
  'dsohandle',
  'else',
  'elseif',
  'endif',
  'error',
  'file',
  'fileID',
  'fileLiteral',
  'filePath',
  'function',
  'if',
  'imageLiteral',
  'keyPath',
  'line',
  'selector',
  'sourceLocation',
  'warn_unqualified_access',
  'warning'
];

// Global functions in the Standard Library.
export const builtIns = [
  'abs',
  'all',
  'any',
  'assert',
  'assertionFailure',
  'debugPrint',
  'dump',
  'fatalError',
  'getVaList',
  'isKnownUniquelyReferenced',
  'max',
  'min',
  'numericCast',
  'pointwiseMax',
  'pointwiseMin',
  'precondition',
  'preconditionFailure',
  'print',
  'readLine',
  'repeatElement',
  'sequence',
  'stride',
  'swap',
  'swift_unboxFromSwiftValueWithType',
  'transcode',
  'type',
  'unsafeBitCast',
  'unsafeDowncast',
  'withExtendedLifetime',
  'withUnsafeMutablePointer',
  'withUnsafePointer',
  'withVaList',
  'withoutActuallyEscaping',
  'zip'
];

// Valid first characters for operators.
export const operatorHead = either(
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

// Valid characters for operators.
export const operatorCharacter = either(
  operatorHead,
  /[\u0300–\u036F]/,
  /[\u1DC0–\u1DFF]/,
  /[\u20D0–\u20FF]/,
  /[\uFE00–\uFE0F]/,
  /[\uFE20–\uFE2F]/
  // TODO: The following characters are also allowed, but the regex isn't supported yet.
  // /[\u{E0100}–\u{E01EF}]/u
);

// Valid first characters for identifiers.
export const identifierHead = either(
  /[a-zA-Z_]/,
  /[\u00A8\u00AA\u00AD\u00AF\u00B2–\u00B5\u00B7–\u00BA]/,
  /[\u00BC–\u00BE\u00C0–\u00D6\u00D8–\u00F6\u00F8–\u00FF]/,
  /[\u0100–\u02FF\u0370–\u167F\u1681–\u180D\u180F–\u1DBF]/,
  /[\u1E00–\u1FFF]/,
  /[\u200B–\u200D\u202A–\u202E\u203F–\u2040\u2054\u2060–\u206F]/,
  /[\u2070–\u20CF\u2100–\u218F\u2460–\u24FF\u2776–\u2793]/,
  /[\u2C00–\u2DFF\u2E80–\u2FFF]/,
  /[\u3004–\u3007\u3021–\u302F\u3031–\u303F\u3040–\uD7FF]/,
  /[\uF900–\uFD3D\uFD40–\uFDCF\uFDF0–\uFE1F\uFE30–\uFE44]/,
  /[\uFE47–\uFFFD]/
  // The following characters are also allowed, but the regexes aren't supported yet.
  // /[\u{10000}–\u{1FFFD}\u{20000–\u{2FFFD}\u{30000}–\u{3FFFD}\u{40000}–\u{4FFFD}]/u,
  // /[\u{50000}–\u{5FFFD}\u{60000–\u{6FFFD}\u{70000}–\u{7FFFD}\u{80000}–\u{8FFFD}]/u,
  // /[\u{90000}–\u{9FFFD}\u{A0000–\u{AFFFD}\u{B0000}–\u{BFFFD}\u{C0000}–\u{CFFFD}]/u,
  // /[\u{D0000}–\u{DFFFD}\u{E0000–\u{EFFFD}]/u
);

// Valid characters for identifiers.
export const identifierCharacter = either(
  identifierHead,
  /\d/,
  /[\u0300–\u036F\u1DC0–\u1DFF\u20D0–\u20FF\uFE20–\uFE2F]/
);

// Valid identifier.
export const identifier = concat(identifierHead, identifierCharacter, '*');

// Built-in attributes, which are highlighted as keywords.
// @available is handled separately.
export const keywordAttributes = [
  /autoclosure/,
  concat(/convention\(/, either('swift', 'block', 'c'), /\)/),
  /discardableResult/,
  /dynamicCallable/,
  /dynamicMemberLookup/,
  /escaping/,
  /frozen/,
  /GKInspectable/,
  /IBAction/,
  /IBDesignable/,
  /IBInspectable/,
  /IBOutlet/,
  /IBSegueAction/,
  /inlinable/,
  /main/,
  /nonobjc/,
  /NSApplicationMain/,
  /NSCopying/,
  /NSManaged/,
  concat(/objc\(/, identifier, /\)/),
  /objc/,
  /objcMembers/,
  /propertyWrapper/,
  /requires_stored_property_inits/,
  /testable/,
  /UIApplicationMain/,
  /unknown/,
  /usableFromInline/
];

// Contextual keywords used in @available and #available.
export const availabilityKeywords = [
  'iOS',
  'iOSApplicationExtension',
  'macOS',
  'macOSApplicationExtension',
  'macCatalyst',
  'macCatalystApplicationExtension',
  'watchOS',
  'watchOSApplicationExtension',
  'tvOS',
  'tvOSApplicationExtension',
  'swift'
];
