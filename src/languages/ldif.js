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
        relevance: "important!"
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
