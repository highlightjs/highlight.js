Reset = "\x1b[0m"
FgRed = "\x1b[31m"
FgWhite = "\x1b[37m"
FgWhite = "\x1b[37m"
Bright = "\x1b[1m"
FgBlue = "\x1b[34m"
BgRed = "\x1b[41m"

DEPRECATION = `
Version 9 of Highlight.js is ${FgRed}no longer supported.${Reset} Please upgrade
or ask whatever dependency you are using to upgrade. More info:
- https://github.com/highlightjs/highlight.js/issues/2877
- https://github.com/highlightjs/highlight.js/blob/master/VERSION_10_UPGRADE.md`.trim()

console.log(DEPRECATION)
