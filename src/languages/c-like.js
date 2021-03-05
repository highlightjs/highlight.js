/*
Language: C-like (deprecated, use C and C++ instead)
Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
Contributors: Evgeny Stepanischev <imbolk@gmail.com>, Zaven Muradyan <megalivoithos@gmail.com>, Roel Deckers <admin@codingcat.nl>, Sam Wu <samsam2310@gmail.com>, Jordi Petit <jordi.petit@gmail.com>, Pieter Vantorre <pietervantorre@gmail.com>, Google Inc. (David Benjamin) <davidben@google.com>
*/

/*
C and C++ have now been fully split into `c.js` and `cpp.js`.
This file only exists for legacy purposes to support v10.
TODO: Remove this in v11.

See: https://github.com/highlightjs/highlight.js/issues/2146
*/

import cPlusPlus from './cpp.js';

/** @type LanguageFn */
export default function(hljs) {
  const lang = cPlusPlus(hljs);

  const C_ALIASES = [
    "c",
    "h"
  ];

  const CPP_ALIASES = [
    'cc',
    'c++',
    'h++',
    'hpp',
    'hh',
    'hxx',
    'cxx'
  ];

  lang.disableAutodetect = true;
  lang.aliases = [];
  // support users only loading c-like (legacy)
  if (!hljs.getLanguage("c")) lang.aliases.push(...C_ALIASES);
  if (!hljs.getLanguage("cpp")) lang.aliases.push(...CPP_ALIASES);

  // if c and cpp are loaded after then they will reclaim these
  // aliases for themselves

  return lang;
}
