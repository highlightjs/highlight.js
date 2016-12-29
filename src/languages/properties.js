/*
Language: Property file
Contributors: Raffaele Sgarro <raffaeleSgarro@gmail.com>
Category: config
Description: Property files used in Java. A simple key value pair separated by '='
*/
function(hljs) {
  return {
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        className: 'variable',
        begin: /^[^=]+/,
      },
      {
        className: 'literal',
        begin: '=', excludeBegin: true,
        end: /$/, endsWithParent: true
      }
    ]
  };
}
