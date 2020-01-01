/*
Language: C++
Category: common, system
Website: https://isocpp.org
Requires: c-like.js
*/

function(hljs) {

  var lang = hljs.getLanguage('c-like').rawDefinition();
  // return auto-detection back on
  lang.disableAutodetect = false;
  return lang;

}
