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
    'copy-namespaces order declare import schema namespace option function in allowing empty' +
    'at tumbling window sliding window start when only end when previous next stable ascending' +
    'descending empty greatest least some every satisfies switch case typeswitch try catch and' +
    'or to union intersect instance of treat as castable cast map array delete insert into' +
    'replace value rename copy modify update';

  // Node Types (sorted by inheritance)
  // atomic types (sorted by inheritance)
  var TYPE = 'item document-node node attribute document element comment namespace processing-instruction text' +
    'xs:anyAtomicType xs:untypedAtomic xs:duration xs:time xs:decimal xs:float xs:double xs:gYearMonth xs:gYear xs:gMonthDay xs:gMonth xs:gDay xs:boolean xs:base64Binary xs:hexBinary xs:anyURI xs:QName xs:NOTATION' +
    'xs:dateTime xs:dateTimeStamp xs:date xs:string xs:normalizedString xs:token xs:language xs:NMTOKEN xs:Name xs:NCName xs:ID xs:IDREF xs:ENTITY' +
    'xs:integer xs:nonPositiveInteger xs:negativeInteger xs:long xs:int xs:short  xs:byte xs:nonNegativeInteger xs:unisignedLong xs:unsignedInt xs:unsignedShort xs:unsignedByte xs:positiveInteger' +
    'xs:yearMonthDuration xs:dayTimeDuration';

  // TODO: Fix Xpath path-expressions
  var LITERAL = 'eq ne lt le gt ge is' +
  'self:: child:: descendant:: descendant-or-self:: attribute:: following:: following-sibling:: parent:: ancestor:: ancestor-or-self:: preceding:: preceding-sibling::';

  // functions (TODO: find regex for op: that doesn't break on build)
  var BUILT_IN = {
    className: 'built_in',
    variants: [{
      begin: /\barray\:/,
      end: /(?:append|filter|flatten|fold\-(?:left|right)|for-each(?:\-pair)?|get|head|insert\-before|join|put|remove|reverse|size|sort|subarray|tail)\b/
    }, {
      begin: /\bmap\:/,
      end: /(?:contains|entry|find|for\-each|get|keys|merge|put|remove|size)\b/
    }, {
      begin: /\bmath\:/,
      end: /(?:a(?:cos|sin|tan[2]?)|cos|exp(?:10)?|log(?:10)?|pi|pow|sin|sqrt|tan)\b/
    }, {
      begin: /\bop\:/,
      end: /\(/,
      excludeEnd: true
    }, {
      begin: /\bfn\:/,
      end: /\(/,
      excludeEnd: true
    }, {
      begin: /[^</\$]\b(?:abs|accumulator\-(?:after|before)|adjust\-(?:date(?:Time)*|time)\-to\-timezone|analyze\-string|apply|available\-(?:environment\-variables|system\-properties)|avg|base\-uri|boolean|ceiling|codepoint[s]*\-(?:equal|to\-string)|collation\-key|collection|compare|concat|contains(?:\-token)*|copy\-of|count|current(?:\-date(?:Time)*|\-time|\-grou(?:ping\-key)*|\-output\-uri|\-merge\-(?:group|key))*|data|dateTime|day[s]*\-from\-(?:date(?:Time)*|duration)|deep\-equal|default\-(?:collation|language)|distinct\-values|document(?:\-uri)*|doc(?:\-available)*|element\-(?:available|with\-id)|empty|encode\-for\-uri|ends\-with|environment\-variable|error|escape\-html\-uri|exactly\-one|exists|false|filter|floor|fold\-(?:left|right)|for\-each(?:\-pair)*|format\-(?:date(?:Time)*|time|integer|number)|function\-(?:arity|available|lookup|name)|generate\-id|has\-children|head|hours\-from\-(?:dateTime|duration|time)|id(?:ref)*|implicit\-timezone|in\-scope\-prefixes|inde[x]\-of|innermost|insert\-before|iri\-to\-uri|json\-(?:doc|to\-xml)|key|lang|last|load\-xquery\-module|local\-name(?:\-from\-QName)*|(?:lower|upper)\-case|matches|max|minutes\-from\-(?:dateTime|duration|time)|min|month[s]*\-from\-(?:date(?:Time)*|duration)|name(?:space\-uri(?:\-for\-prefix|\-from\-QName)*)*|nilled|node\-name|normalize\-(?:space|unicode)|not|number|one\-or\-more|outermost|parse\-(?:ietf\-date|json)|path|position|(?:prefix\-from\-)*QName|random\-number\-generator|regex\-group|remove|replace|resolve\-(?:QName|uri)|reverse|root|round(?:\-half\-to\-even)*|seconds\-from\-(?:dateTime|duration|time)|snapshot|sort|starts\-with|static\-base\-uri|stream\-available|string(?:\-join|\-length|\-to\-codepoints)*|subsequence|substring(?:\-after|\-before)*|sum|system\-property|tail|timezone\-from\-(?:date(?:Time)*|time)|tokenize|trace|transform|translate|true|type\-available|unordered|unparsed\-(?:entity|text)*(?:\-(?:public\-id|uri|available|lines))*|uri\-collection|xml\-to\-json|year[s]*\-from\-(?:date(?:Time)*|duration)|zero\-or\-one)\b/,
      // end: /\(/,
      // excludeEnd: true
    }, {
      begin: /\blocal\:/,
      end: /\(/,
      excludeEnd: true
    }]
  };
  var TITLE = {
    className: 'title',
    variants: [{
      begin: /\bxquery version "[13]\.[01]"\s?(?:encoding ".+")?/,
      end: /;/
    }, {
      begin: /\bdeclare\s+(?!function)(?:default)?\s*(?:ordering|copy\-namespaces|construction|decimal\-format|variable|boundary-space|base-uri|collation|namespace|option|context)?/,
      end: /;/
    }, {
      begin: /\b(?:import)?\s?(module|schema)? namespace/,
      end: /;/
    }]
  };

// TODO: Get variable highlighting to work
  var VAR = {
    className: 'params',
    begin: /\b\$[A-Za-z0-9_\-]+/
  };
  // TODO: add comparison, string, and function symbols
  // var SYMBOL = {
  //   className: 'symbol',
  //   variants: [{
  //     begin: ':= = != < <= > >= << >> => ||',
  //     end: /\b/
  //   }, {
  //     begin: 'self:: child:: descendant:: descendant-or-self:: attribute:: following:: following-sibling:: parent:: ancestor:: ancestor-or-self:: preceding:: preceding-sibling:: @',
  //     end: /\b/
  //   }]
  // };

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

  var CONTAINS = [
    VAR,
    BUILT_IN,
    STRING,
    NUMBER,
    COMMENT,
    ANNOTATION,
    TITLE
  ];

  var METHOD = {
    begin: '{',
    end: '}',
    contains: CONTAINS
  };


  return {
    aliases: ['xpath', 'xq'],
    case_insensitive: false,
    lexemes: /[a-zA-Z\$][a-zA-Z0-9_:\-]*/,
    illegal: /(proc)|(abstract)|(extends)|(until)|(#)/,
    keywords: {
      keyword: KEYWORDS,
      type: TYPE,
      literal: LITERAL
    },
    contains: CONTAINS
  };
}
