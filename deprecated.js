Reset = "\x1b[0m"
FgRed = "\x1b[31m"
FgWhite = "\x1b[37m"
FgWhite = "\x1b[37m"
Bright = "\x1b[1m"
FgBlue = "\x1b[34m"
BgRed = "\x1b[41m"

DEPRECATION = `
${BgRed + FgWhite}
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
${Reset}${Bright}${FgWhite}
  Verion 9 of Highlight.js has reached EOL.  It will no longer
  be supported or receive security updates in the future.
  Please upgrade to version 10.

  For more info:
  ${FgBlue}
  https://github.com/highlightjs/highlight.js/issues/2877
  https://github.com/highlightjs/highlight.js/blob/master/VERSION_10_UPGRADE.md
 ${BgRed + FgWhite}
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*${Reset}
.`.trim()

console.log(DEPRECATION)
