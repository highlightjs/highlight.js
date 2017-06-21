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
    keyword: 'ask construct|10 delete describe distinct drop filter from graph|10 insert limit named|10 offset optional order reduced select union where add all as bind by clear copymove create data data default define exists group having in load minus not service silent to using values with',
    built_in: 'a',
    function: 'abs asc avg bound ceil coalesce concat containsstrbefore count dayhours desc encode_for_uri floor group_concat if iri isblank isiri isliteral isnumeric isuri langdatatype langmatches lcase max md5 min minutes month now rand regex replace round sameterm sample seconds separator sha1 sha256 sha384 sha512 str strafter strdt strends strlang strlen strstarts struuid substr sum then timezone tz ucase uribnode uuid year',
    literal: 'true false',
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
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.C_NUMBER_MODE,
      hljs.HASH_COMMENT_MODE,
    ]
  };
}

