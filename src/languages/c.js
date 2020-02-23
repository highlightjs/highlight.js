/*
Language: C
Category: common, system
Website: https://en.wikipedia.org/wiki/C_(programming_language)
Requires: c-like.js
*/

export default function(hljs) {

  var lang = hljs.getLanguage('c-like').rawDefinition();
  // Until C is actually different than C++ there is no reason to auto-detect C
  // as it's own language since it would just fail auto-detect testing or
  // simply match with C++.
  //
  // See further comments in c-like.js.

  // lang.disableAutodetect = false;
  lang.name = 'C';
  lang.aliases = ['c', 'h'];
  return lang;

}
