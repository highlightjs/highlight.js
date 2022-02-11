import hljs from "../../build/es/highlight.js";

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

console.log("Pass: browser build works with Node.js just fine.")
