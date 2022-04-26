/*
Language: DNS Zone
Author: Tim Schumacher <tim@datenknoten.me>
Category: config
Website: https://en.wikipedia.org/wiki/Zone_file
*/

/** @type LanguageFn */
export default function(hljs) {
  const KEYWORDS = [
    "A",
    "AAAA",
    "AFSDB",
    "APL",
    "CAA",
    "CDNSKEY",
    "CDS",
    "CERT",
    "CNAME",
    "DHCID",
    "DLV",
    "DNAME",
    "DNSKEY",
    "DS",
    "HIP",
    "IPSECKEY",
    "KEY",
    "KX",
    "LOC",
    "MX",
    "NAPTR",
    "NS",
    "NSEC",
    "NSEC3",
    "NSEC3PARAM",
    "PTR",
    "RRSIG",
    "RP",
    "SIG",
    "SOA",
    "SRV",
    "SSHFP",
    "TA",
    "TKEY",
    "TLSA",
    "TSIG",
    "TXT"
  ];

  // RFC 1035: \DDD, or \X where X is not a digit (disjoint → safe under +)
  const ESCAPE_RE = /\\(?:\d{3}|[^\d\n])/;
  const ESCAPE = {
    scope: 'char.escape',
    match: ESCAPE_RE
  };

  const PUNCTUATION = {
    scope: 'punctuation',
    match: /[()]/
  };

  const STRING = {
    scope: 'string',
    begin: /"/,
    end: /"/,
    illegal: /\n/,
    contains: [ ESCAPE ]
  };

  const CAA_PROPERTY_TAG = /\b(?:issuewild|issue|iodef|contactemail|contactphone|issuevmc|issuemail)\b/;

  return {
    name: 'DNS Zone',
    aliases: [
      'bind',
      'zone'
    ],
    case_insensitive: true,
    keywords: KEYWORDS,
    contains: [
      hljs.COMMENT(';', '$', { relevance: 0 }),
      {
        match: [
          /\bCAA\b/,
          /[ \t]+/,
          /\d+/,
          /[ \t]+/,
          CAA_PROPERTY_TAG
        ],
        scope: {
          1: 'keyword',
          3: 'number',
          5: 'attr'
        }
      },
      STRING,
      {
        match: [
          /\bTXT\b/,
          /\s+/,
          // one unquoted token (stopgap; multi-string / full RDATA mode later)
          /(?!")(?:\\(?:\d{3}|[^\d\n])|[^\s;"()\\])+/
        ],
        scope: {
          1: "keyword",
          3: "string"
        }
      },
      {
        className: 'meta',
        relevance: "keyword",
        begin: /^\$(TTL|GENERATE|INCLUDE|ORIGIN)\b/
      },
      PUNCTUATION,
      {
        scope: 'type',
        match: /\b(?:IN|CH|HS)\b/
      },
      // IPv6 (lookahead: no word-boundary after trailing :)
      {
        className: 'number',
        relevance: "keyword",
      },
      // IPv4
      {
        className: 'number',
        relevance: "minor",
begin: /(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\b/
      },
      hljs.inherit(hljs.NUMBER_MODE, { begin: /\b\d+[dhwm]?/ })
    ]
  };
}
