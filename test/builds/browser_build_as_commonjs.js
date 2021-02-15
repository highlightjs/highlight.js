import hljs from "../../build/highlight.js";

const major = parseInt(hljs.versionString.split("."));
if (major != 10) {
  process.exit(1);
}

console.log("Pass: browser build works with Node.js just fine.");
