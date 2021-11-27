const hljs = require("../../build/highlight");

const API = [
  "getLanguage",
  "registerLanguage",
  "highlight",
  "highlightAuto",
  "highlightAll",
  "highlightElement"
];

const assert = (f,msg) => {
  if (!f()) {
    console.error(msg);
    process.exit(1);
  }
};
const keys = Object.keys(hljs);

API.forEach(n => {
  assert(_ => keys.includes(n), `API should include ${n}`);
});

// See e.g. highlightjs/highlight.js#3263
const langs = ["python", "python-repl"]
langs.forEach(n => {
  assert(_ => {
    res = hljs.getLanguage(n);
    return typeof res === 'object' && res !== null
  })
})

console.log("Pass: browser build works with Node.js just fine.")
