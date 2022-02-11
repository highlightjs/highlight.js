/*
Language: JSON
Description: JSON (JavaScript Object Notation) is a lightweight data-interchange format.
Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
Website: http://www.json.org
Category: common, protocols, web
*/

export default function(hljs) {
  const ATTRIBUTE = {
    className: 'attr',
    begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
    relevance: 1.01
  };
  const PUNCTUATION = {
    match: /[{}[\],:]/,
    className: "punctuation",
    relevance: 0
  };
  // normally we would rely on `keywords` for this but using a mode here allows us
  // to use the very tight `illegal: \S` rule later to flag any other character
  // as illegal indicating that despite looking like JSON we do not truly have
  // JSON and thus improve false-positively greatly since JSON will try and claim
  // all sorts of JSON looking stuff
  const LITERALS = {
    beginKeywords: [
      "true",
      "false",
      "null"
    ].join(" ")
  };

  return {
    name: 'JSON',
    contains: [
      ATTRIBUTE,
      PUNCTUATION,
      hljs.QUOTE_STRING_MODE,
      LITERALS,
      hljs.C_NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ],
    illegal: '\\S'
  };
}
