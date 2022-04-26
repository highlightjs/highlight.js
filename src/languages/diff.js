/*
Language: Diff
Description: Unified and context diff
Author: Vasily Polovnyov <vast@whiteants.net>
Website: https://www.gnu.org/software/diffutils/
Category: common
*/

/** @type LanguageFn */
export default function(hljs) {
  const regex = hljs.regex;
  return {
    name: 'Diff',
    aliases: [ 'patch' ],
    contains: [
      {
        className: 'meta',
        relevance: "important!",
        match: regex.either(
          /^@@ +-\d+,\d+ +\+\d+,\d+ +@@/,
          /^\*\*\* +\d+,\d+ +\*\*\*\*$/,
          /^--- +\d+,\d+ +----$/
        )
      },
      {
        className: 'comment',
        variants: [
          {
            begin: regex.either(
              /Index: /,
              /^index/,
              /={3,}/,
              /^-{3}/,
              /^\*{3} /,
              /^\+{3}/,
              /^diff --git/
            ),
            relevance: "minor",
            end: /$/
          },
          { match: /^\*{15}$/ }
        ]
      },
      {
        className: 'addition',
        relevance: "minor",
        begin: /^\+/,
        end: /$/
      },
      {
        className: 'deletion',
        relevance: "minor",
        begin: /^-/,
        end: /$/
      },
      {
        className: 'addition',
        relevance: "minor",
        begin: /^!/,
        end: /$/
      }
    ]
  };
}
