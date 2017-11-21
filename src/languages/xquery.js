/*
Language: XQuery
Author: Dirk Kirsten <dk@basex.org>
Contributor: Duncan Paterson
Description: Supports XQuery 3.1 including XQuery Update 3, so also XPath (as it is a superset)
Refactored to process xml constructor syntax, and function-bodies, added missing data-types, xpath operands, inbuilt functions, and query prologs
Category: functional
*/

function(hljs) {
  // var KEYWORDS = {
  //   keyword: 'for let if while then else return where group by xquery encoding version' +
  //   'module namespace boundary-space preserve strip default collation base-uri ordering' +
  //   'copy-namespaces order declare import schema namespace option in allowing empty' +
  //   'at tumbling window sliding window start when only end when previous next stable ascending' +
  //   'descending empty greatest least some every satisfies switch case typeswitch try catch and' +
  //   'or to union intersect instance of treat as castable cast delete insert into' +
  //   'replace value rename copy modify update',
  //   literal: 'item node attribute document element comment namespace processing-instruction text' +
  //   // atomic types (sorted by inheritance)
  //   'xs:anyAtomicType xs:untypedAtomic xs:duration xs:time xs:decimal xs:float xs:double xs:gYearMonth xs:gYear xs:gMonthDay xs:gMonth xs:gDay xs:boolean xs:base64Binary xs:hexBinary xs:anyURI xs:QName xs:NOTATION' +
  //   'xs:dateTime xs:dateTimeStamp xs:date xs:string xs:normalizedString xs:token xs:language xs:NMTOKEN xs:Name xs:NCName xs:ID xs:IDREF xs:ENTITY' +
  //   'xs:integer xs:nonPositiveInteger xs:negativeInteger xs:long xs:int xs:short  xs:byte xs:nonNegativeInteger xs:unisignedLong xs:unsignedInt xs:unsignedShort xs:unsignedByte xs:positiveInteger' +
  //   'xs:yearMonthDuration xs:dayTimeDuration',
  //   built_in:'acos'
  // };

  var KEYWORDS = 'for let if while then else return where group by xquery encoding version' +
  'module namespace boundary-space preserve strip default collation base-uri ordering' +
  'copy-namespaces order declare import schema namespace option in allowing empty' +
  'at tumbling window sliding window start when only end when previous next stable ascending' +
  'descending empty greatest least some every satisfies switch case typeswitch try catch and' +
  'or to union intersect instance of treat as castable cast delete insert into' +
  'replace value rename copy modify update';

  // Node Types (sorted by inheritance)
  var LITERAL = 'item node attribute document element comment namespace processing-instruction text' +
  // atomic types (sorted by inheritance)
  'xs:anyAtomicType xs:untypedAtomic xs:duration xs:time xs:decimal xs:float xs:double xs:gYearMonth xs:gYear xs:gMonthDay xs:gMonth xs:gDay xs:boolean xs:base64Binary xs:hexBinary xs:anyURI xs:QName xs:NOTATION' +
  'xs:dateTime xs:dateTimeStamp xs:date xs:string xs:normalizedString xs:token xs:language xs:NMTOKEN xs:Name xs:NCName xs:ID xs:IDREF xs:ENTITY' +
  'xs:integer xs:nonPositiveInteger xs:negativeInteger xs:long xs:int xs:short  xs:byte xs:nonNegativeInteger xs:unisignedLong xs:unsignedInt xs:unsignedShort xs:unsignedByte xs:positiveInteger' +
  'xs:yearMonthDuration xs:dayTimeDuration';

  // functions
  var BUILT_IN =  /array\:(?:append|filter|flatten|fold\-left|fold\-right|for-each|for\-each\-pair|get|head|insert\-before|join|put|remove|reverse|size|sort|subarray|tail)/g;

  var VAR = {
    begin: /\$[A-Za-z0-9_\-]+/
  };

  var SYMBOL = 'le gt eq =>';

  var NUMBER = {
    className: 'number',
    begin: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
    relevance: 0
  };

  var STRING = {
    className: 'string',
    variants: [{
        begin: /"/,
        end: /"/,
        contains: [{
          begin: /""/,
          relevance: 0
        }]
      },
      {
        begin: /'/,
        end: /'/,
        contains: [{
          begin: /''/,
          relevance: 0
        }]
      }
    ]
  };

  var ANNOTATION = {
    className: 'meta',
    begin: '%\\w+'
  };

  var COMMENT = {
    className: 'comment',
    begin: '\\(:',
    end: ':\\)',
    relevance: 10,
    contains: [{
      className: 'doctag',
      begin: '@\\w+'
    }]
  };

  // var METHOD = {
  //   begin: 'x{', end: '}x',
  // };

  var CONTAINS = [
    // VAR,
    STRING,
    NUMBER,
    COMMENT,
    ANNOTATION
  ];
  // METHOD.contains = CONTAINS;


  return {
    aliases: ['xpath', 'xq'],
    case_insensitive: false,
    lexemes: /[a-zA-Z\$][a-zA-Z0-9_:\-]*/,
    illegal: /(proc)|(abstract)|(extends)|(until)|(#)/,
    keywords: {
      keyword: KEYWORDS,
      literal: LITERAL,
      built_in: BUILT_IN,
      variable: VAR
    },
    contains: CONTAINS
  };
}
