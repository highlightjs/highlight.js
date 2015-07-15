/*
Language: Perl (Mojolicious Templates)
Requires: xml.js, perl.js
Author: Dotan Dimet <dotan@corky.net>
Description: Mojolicious .ep (Embedded Perl) templates
Category: template
*/
function(hljs) {
  return {
    subLanguage: 'xml',
    subLanguageMode: 'continuous',
    contains: [
    // mojolicious line
      {
          begin: "^\\s*%{1,2}={0,2}",
          starts: {
            end: "$",
            subLanguage: 'perl'
          }
      },
    // mojolicious block
      {
          begin: "<%{1,2}={0,2}",
          end: "={0,1}%>",
          subLanguage: 'perl',
          excludeBegin: true,
          excludeEnd: true
       }
    ]
  };
}
