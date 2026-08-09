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

  // RFC 1035: \DDD or \X
  const ESCAPE = {
    scope: 'char.escape',
    match: /\\(?:\d{3}|.)/
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
      STRING,
      {
        match: [
          /\bTXT\b/,
          /\s+/,
          // one unquoted token (stopgap; multi-string / full RDATA mode later)
          /(?!")(?:\\(?:\d{3}|.)|[^\s;"()\\])+/
        ],
        scope: {
          1: "keyword",
          3: "string"
        }
      },
      {
        className: 'meta',
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
        begin: /(?:(?:[0-9A-Fa-f]{1,4}:){7}(?:[0-9A-Fa-f]{1,4}|:)|(?:[0-9A-Fa-f]{1,4}:){6}(?::[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:)|(?:[0-9A-Fa-f]{1,4}:){5}(?:(?::[0-9A-Fa-f]{1,4}){1,2}|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:)|(?:[0-9A-Fa-f]{1,4}:){4}(?:(?::[0-9A-Fa-f]{1,4}){1,3}|(?::[0-9A-Fa-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:)|(?:[0-9A-Fa-f]{1,4}:){3}(?:(?::[0-9A-Fa-f]{1,4}){1,4}|(?::[0-9A-Fa-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:)|(?:[0-9A-Fa-f]{1,4}:){2}(?:(?::[0-9A-Fa-f]{1,4}){1,5}|(?::[0-9A-Fa-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:)|(?:[0-9A-Fa-f]{1,4}:)(?:(?::[0-9A-Fa-f]{1,4}){1,6}|(?::[0-9A-Fa-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:)|(?::(?:(?::[0-9A-Fa-f]{1,4}){1,7}|(?::[0-9A-Fa-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:)))(?![0-9A-Fa-f:])/
      },
      // IPv4
      {
        className: 'number',
        begin: /(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\b/
      },
      hljs.inherit(hljs.NUMBER_MODE, { begin: /\b\d+[dhwm]?/ })
    ]
  };
}
