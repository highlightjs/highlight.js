/*
Language: Perl (Mojolicious)
Requires: perl.js, xml.js, mojo-ep.js
Author: Dotan Dimet <dotan@corky.net>
Description: Perl code with Mojolicious .ep templates embedded in __DATA__ section
Category: common
*/

function(hljs) {
  return {
  subLanguage: 'perl',
  contains: [
      {
        begin: "^__DATA__$",
        end: "^__END__$",
        endsWithParent: true,
        subLanguage: 'mojo-ep',
        contains: [
          {
              begin: "^@@.*",
              end: "$",
              className: "comment"
          }
        ]
      }
   ]
  };
}
