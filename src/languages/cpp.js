/*
Language: C++
Category: common, system
Website: https://isocpp.org
Requires: c-like.js
*/

/** @type LanguageFn */
export default function(hljs) {
  var lang = hljs.requireLanguage('c-like').rawDefinition();
  // return auto-detection back on
  lang.disableAutodetect = false;
  lang.name = 'C++';
  lang.aliases = ['cc', 'c++', 'h++', 'hpp', 'hh', 'hxx', 'cxx'];
  return lang;
}
