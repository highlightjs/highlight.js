/*
Language: Clojure REPL
Description: Clojure REPL sessions
Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
Requires: clojure.js
Website: https://clojure.org
Category: lisp
*/

/** @type LanguageFn */
export default function(hljs) {
  return {
    name: 'Clojure REPL',
    contains: [
      {
        className: 'meta.prompt',
        begin: /^([\w.-]+|\s*#_)?=>/,
        starts: {
          end: /$/,
          subLanguage: 'clojure'
        }
      }
    ]
  };
}
