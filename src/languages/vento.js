/*
Language: Vento
Requires: xml.js, yaml.js, javascript.js
Author: Óscar Otero <oom@oscarotero.com>
Description: Syntax for Vento templates with front matter.
Website: https://vento.js.org
Category: template
*/

/** @type LanguageFn */
export default function(hljs) {
  return {
    name: 'Vento',
    aliases: ['vto'],
    subLanguage: 'xml',
    keywords: {
      keyword: "for of if else include set layout echo function async function import from export await continue break slot"
    },
    contains: [
      hljs.COMMENT("{{#", "#}}"),
      {
        begin: "{{[-]?",
        end: "[-]?}}",
        subLanguage: "javascript",
        excludeBegin: true,
        excludeEnd: true,
      },
      {
        begin: "^---\n",
        end: "\n---\n",
        subLanguage: "yaml",
        excludeBegin: true,
        excludeEnd: true,
      },
    ]
  };
}
