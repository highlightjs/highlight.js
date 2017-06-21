/*
Language: SPARQL
Requires: ttl.js
Author: Mark Ellis <mark.ellis@stardog.com>
Category: common
*/

function(hljs) {
  var ttl = hljs.getLanguage('ttl').exports;
  var KEYWORDS = {
    meta: 'base|10 prefix|10 @base|10 @prefix|10',
    keyword: 'add all as|0 ask bind by|0 clear construct|10 copymove create data default define delete describe distinct drop exists filter from|0 graph|10 group having in|0 insert limit load minus named|10 not offset optional order reduced select|0 service silent to union using values where with|0',
    function: 'abs asc avg bound ceil coalesce concat containsstrbefore count dayhours desc encode_for_uri floor group_concat if|0 iri isblank isiri isliteral isnumeric isuri langdatatype langmatches lcase max md5 min|0 minutes month now rand regex replace round sameterm sample seconds separator sha1 sha256 sha384 sha512 str strafter strdt strends strlang strlen strstarts struuid substr sum then timezone tz ucase uribnode uuid year',
    literal: 'true|0 false|0',
    built_in: 'a|0'
  };

  return {
    case_insensitive: true,
    keywords: KEYWORDS,
    aliases: ['rql'],
    contains: [
      ttl.PNAME,
      ttl.VARIABLE,
      ttl.IRI_LITERAL,
      ttl.TRIPLE_APOS_STRING,
      ttl.QUOTE_STRING_LITERAL,
      ttl.APOS_STRING_LITERAL,
      ttl.NUMBER,
      hljs.HASH_COMMENT_MODE,
    ]
  };
}

