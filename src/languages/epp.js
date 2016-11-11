/*
Language: EPP (Embedded Puppet templating language)
Requires: xml.js, puppet.js
Author: Ben Ford <ben.ford@puppet.com>
Description: "Bridge" language defining fragments of Puppet in plain text within <% .. %>
Category: template
*/

function(hljs) {
  return {
    subLanguage: 'xml',
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
