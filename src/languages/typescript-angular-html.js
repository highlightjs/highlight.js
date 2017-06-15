/*
Language: HTML inline templates in Typescript Angular component definition
Requires: xml.js, typescript.js
Author: Carlo Bonamico <carlo.bonamico@gmail.com>
Description: "Bridge" language defining fragments of HTML in Typescript definitions of Angular components with template: ``
Category: scripting
*/

function(hljs) {
  return {
    subLanguage: 'typescript',
    contains: [
      {
        begin: /template\s{0,8}:\s{0,8}['"`]/ ,
        end: /['"`]$/,
        subLanguage: "xml"
      }, /*
      {
        begin: /template\s{0,8}:\s{0,8}[`]|$/ , 
        excludeBegin: true,
        excludeEnd: true,
        starts: {
          begin: /template\s{0,8}:\s{0,8}[`]|$/,
          end: /`/, 
          returnEnd: true,
          subLanguage: ['xml']
        }
      }
*/
    ]
  };
}
