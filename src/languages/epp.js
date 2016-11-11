/*
Language: EPP (Embedded Puppet templating language)
Requires: xml.js, puppet.js
Author: Ben Ford <ben.ford@puppet.com>
Contributors: Antoine Musso <hashar@free.fr>
Description: "Bridge" language defining fragments of Puppet in plain text within <% .. %>
Website: https://www.puppet.com/docs/puppet/8/lang_template_epp.html
Category: template
*/

/** @type LanguageFn */
export default function(hljs) {
  return {
    name: 'EPP',

    // The actual content can be any type
    subLanguage: [],

    // Test sample is recognized as `mel`, disable auto-detection since it is
    // "hard": https://github.com/highlightjs/highlight.js/issues/1213
    disableAutodetect: true,
    contains: [
      hljs.COMMENT('<%#', '%>'),
      {
        begin: '<%[%=-]?', end: '[%-]?%>',
        subLanguage: 'puppet',
        excludeBegin: true,
        excludeEnd: true
      }
    ]
  };
}
