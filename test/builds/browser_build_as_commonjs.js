const hljs = require("../../build/highlight");

let major = parseInt(majorVersion=hljs.versionString.split("."))
if (major != 10) {
  process.exit(1)
}
