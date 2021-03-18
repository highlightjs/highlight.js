const hljs = require("../../build/highlight");

let major = parseInt(majorVersion=hljs.versionString.split("."))
if (major != 10) {
  process.exit(1)
}

console.log("Pass: browser build works with Node.js just fine.")
