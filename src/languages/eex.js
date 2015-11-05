/*
Language: EEx (Embedded Elixir)
Requires: xml.js, elixir.js
Author: Jeff Kreeftmeijer <jeff@kreeftmeijer.nl>
Description: "Bridge" language defining fragments of Elixir in HTML within <% .. %>
Category: template
*/

function(hljs) {
  return {
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT('<%#', '%>'),
      {
        begin: '<%[%=]?', end: '%>',
        subLanguage: 'elixir',
        excludeBegin: true,
        excludeEnd: true
      }
    ]
  };
}
