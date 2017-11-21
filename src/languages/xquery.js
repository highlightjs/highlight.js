/*
Language: XQuery
Author: Dirk Kirsten <dk@basex.org>
Contributor: Duncan Paterson
Description: Supports XQuery 3.1 including XQuery Update 3, so also XPath (as it is a superset)
Refactored to process xml constructor syntax, and function-bodies, added missing data-types, xpath operands, inbuilt functions, and query prologs
Category: functional
*/

function(hljs) {
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
  var BUILT_IN = /array\:(?:append|filter|flatten|fold\-left|fold\-right|for-each|for\-each\-pair|get|head|insert\-before|join|put|remove|reverse|size|sort|subarray|tail)/g +

  /map\:(?:contains|entry|find|for\-each|get|keys|merge|put|remove|size)/g +

  /math\:(?:acos|asin|atan|atan2|cos|exp|exp10|log|log10|pi|pow|sin|sqrt|tan)/g +

  /(?:fn\:)|(?!^$)(?:abs|accumulator\-(?:after|before)|adjust\-(?:dateTime|date|time)\-to\-timezone|analyze\-string|apply|available\-(?:environment\-variables|system\-properties)|avg|base\-uri|boolean|ceiling|codepoint\-equal|codepoints\-to\-string|collation\-key|collection|compare|concat|contain\w(?:\-token|.)|copy\-of|count|current(?:\-dateTime|\-date|\-time|\-grouping\-key|\-group|\-output\-uri|\-merge\-(?:group|key)|.)|data|dateTime|day\-from\-(?:dateTime|date)|days\-from\-duration|deep\-equal|default\-(?:collation|language)|distinct\-values|document\-uri|document|doc\-available|doc|element\-(?:available|with\-id)|empty|encode\-for\-uri|ends\-with|environment\-variable|error|escape\-html\-uri|exactly\-one|exists|false|filter|floor|fold\-(?:left|right)|for\-each(?:\-pair|.)|format\-(?:date|dateTime|time|integer|number)|function\-(?:arity|available|lookup|name)|generate\-id|has\-children|head|hours\-from\-(?:dateTime|duration|time)|idref|id|implicit\-timezone|in\-scope\-prefixes|inde\w\-of|innermost|insert\-before|iri\-to\-uri|json\-doc|json\-to\-xml|key|lang|last|load\-xquery\-module|local\-name(?:\-from\-QName|.)|lower\-case|matches|max|minutes\-from\-(?:dateTime|duration|time)|min|month\-from\-(?:dateTime|date)|namespace\-uri(?:\-for\-prefix|\-from\-QName|.)|name|nilled|node\-name|normalize\-(?:space|unicode)|not|number|one\-or\-more|outermost|parse\-(?:ietf\-date|json)|path|position|prefix\-from\-QName|QName|random\-number\-generator|regex\-group|remove|replace|resolve\-(?:QName|uri)|reverse|root|round\-half\-to\-even|round|seconds\-from\-(?:dateTime|duration|time)|snapshot|sort|starts\-with|static\-base\-uri|stream\-available|string(?:\-join|\-length|\-to\-codepoints|.)|subsequence|substring(?:\-after|\-before|.)|sum|system\-property|tail|timezone\-from\-(?:dateTime|date|time)|tokenize|trace|transform|translate|true|type\-available|unordered|unparsed\-entity\-(?:public\-id|uri)|unparsed\-text(?:\-available|\-lines|.)|upper\-case|uri\-collection|xml\-to\-json|year\-from\-(?:dateTime|date)|zero\-or\-one|(?:years|months)\-from\-duration)/g;

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
    VAR,
    BUILT_IN,
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
      built_in: BUILT_IN
    },
    contains: CONTAINS
  };
}
