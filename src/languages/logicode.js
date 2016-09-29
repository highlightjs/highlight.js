function(hljs) {
  var KEYWORDS = {
    keyword: "cond circ var out",
    built_in: "! | & < > @"
  },
  var NUMBER = {
    className: "number",
    begin: "[01]+"
  };
  var TITLE = hljs.inherit(hljs.TITLE_MODE, {begin: JS_IDENT_RE});
  var PARAMS = {
    className: 'params',
    begin: '\\([^\\(]', returnBegin: true,
    contains: [{
      begin: /\(/, end: /\)/,
      keywords: KEYWORDS
    }]
  };
  var FUNCTION = {
    className: "function",
    begin: "circ",
    end: "->",
    contains: [TITLE, PARAMS],
    relevance: 10
  };
  return {
    aliases: ["lgc"],
    keywords: KEYWORDS,
    contains: [
      hljs.HASH_COMMENT_MODE,
      NUMBER,
      FUNCTION
    ]
  }
}
