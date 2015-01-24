/*
Language: Golo
Author: Philippe Charriere <ph.charriere@gmail.com>
Description: a lightweight dynamic language for the JVM, see http://golo-lang.org/
Category: dynamic language for Java
*/

function(hljs) {
  var GOLO_KEYWORDS = {
    keyword:
      'function module import local return ' + 
      'while for foreach times in case when match with break continue ' + 
      'let var println print readln if then else otherwise ' +
      'try catch finally raise throw orIfNull',
    literal:
       'true false null',
    typename:
      'DynamicObject DynamicVariable struct Observable augment augmentation',
  };
  return {
    aliases: ["gololang"],
    keywords: GOLO_KEYWORDS,
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'annotation', begin: '@[A-Za-z]+'
      }
    ]
  };
}
