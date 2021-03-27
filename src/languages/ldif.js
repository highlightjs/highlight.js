/*
Language: LDIF
Contributors: Jacob Childress <jacobc@gmail.com>
Category: enterprise, config
Website: https://en.wikipedia.org/wiki/LDAP_Data_Interchange_Format
*/

/** @type LanguageFn */
export default function(hljs) {
  return {
    name: 'LDIF',
    contains: [
      {
        className: 'attribute',
        match: '^dn(?=:)',
        relevance: 10
      },
      {
        className: 'attribute',
        match: '^\\w+(?=:)'
      },
      {
        className: 'literal',
        match: '^-'
      },
      hljs.HASH_COMMENT_MODE
    ]
  };
}
