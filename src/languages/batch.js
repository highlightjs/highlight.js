/*
Language: Batch
Author: Kenez Megyeri <m.kenz99@gmail.com>
Website: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands
Description: Syntax highlighting for Windows batch files and scripts eg.(.bat, .batch, .cmd)
Category: common, scripting
*/

/** @type LanguageFn */
export default function(hljs) {
  return {
    name: "Batch file",
    aliases: [
      "bat",
      "batch",
      "cmd"
    ],
    case_insensitive: true,
    keywords: {
      built_in:
        "append assoc at attrib break cacls cd chcp chdir chkdsk chkntfs cls cmd color comp compact convert copy date del dir diskcomp diskcopy doskey echo endlocal erase fc find findstr format ftype graftabl help keyb label md mkdir mode more move path pause popd print prompt pushd rd recover ren rename replace restore rmdir set setlocal shift sort start subst time title tree type ver verify vol xcopy rem ping netsh taskkill tasklist reg regedit sc net ipconfig systeminfo wmic powershell curl wget timeout robocopy icacls takeown cipher schtasks gpupdate whoami hostname goto call exit if else for do while in defined errorlevel cmdextversion not",
      operator: "EQU NEQ LSS LEQ GTR GEQ",
    },
    contains: [
      {
        className: "comment",
        begin: /^\s*rem\s/i,
        end: /$/,
        relevance: 10,
      },
      {
        className: "comment",
        begin: /::/,
        end: /$/,
      },
      {
        className: "string",
        begin: /"/,
        end: /"/,
        contains: [
          {
            className: "variable",
            begin: /%\w+%/,
          },
        ],
      },
      {
        className: "number",
        begin: /\b\d+\b/,
      },
      {
        className: "operator",
        begin: /[|&><]/,
      },
      {
        className: "operator",
        begin: /\d*(?:>>|>|<|2>&1|2>nul)/,
      },
    ],
  };
}
