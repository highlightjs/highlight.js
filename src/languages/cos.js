/*
Language: Caché Object Script
Author: Nikita Savchenko <zitros.lab@gmail.com>
Category: common
*/
function cos (hljs) {

  var STRINGS = {
    className: 'string',
    variants: [
      {
        begin: '"',
        end: '"',
        contains: [{ // escaped
          begin: "\"\"",
          relevance: 0
        }]
      }
    ]
  };

  var NUMBERS = {
    className: "number",
    begin: "\\b(\\d+(\\.\\d*)?|\\.\\d+)",
    relevance: 0
  };

  var METHOD_TITLE = hljs.IDENT_RE + "\\s*\\(";

  var COS_KEYWORDS = {
    keyword: [

      "break", "catch", "close", "continue", "do", "d", "else",
      "elseif", "for", "goto", "halt", "hang", "h", "if", "job",
      "j", "kill", "k", "lock", "l", "merge", "new", "open", "quit",
      "q", "read", "r", "return", "set", "s", "tcommit", "throw",
      "trollback", "try", "tstart", "use", "view", "while", "write",
      "w", "xecute", "x", "zkill", "znspace", "zn", "ztrap", "zwrite",
      "zw", "zzdump", "zzwrite", "print", "zbreak", "zinsert", "zload",
      "zprint", "zremove", "zsave", "zzprint", "mv", "mvcall", "mvcrt",
      "mvdim", "mvprint", "zquit", "zsync", "ascii"

      // registered function - no need in them due to all functions are highlighted,
      // but I'll just leave this here.

      //"$bit", "$bitcount",
      //"$bitfind", "$bitlogic", "$case", "$char", "$classmethod", "$classname",
      //"$compile", "$data", "$decimal", "$double", "$extract", "$factor",
      //"$find", "$fnumber", "$get", "$increment", "$inumber", "$isobject",
      //"$isvaliddouble", "$isvalidnum", "$justify", "$length", "$list",
      //"$listbuild", "$listdata", "$listfind", "$listfromstring", "$listget",
      //"$listlength", "$listnext", "$listsame", "$listtostring", "$listvalid",
      //"$locate", "$match", "$method", "$name", "$nconvert", "$next",
      //"$normalize", "$now", "$number", "$order", "$parameter", "$piece",
      //"$prefetchoff", "$prefetchon", "$property", "$qlength", "$qsubscript",
      //"$query", "$random", "$replace", "$reverse", "$sconvert", "$select",
      //"$sortbegin", "$sortend", "$stack", "$text", "$translate", "$view",
      //"$wascii", "$wchar", "$wextract", "$wfind", "$wiswide", "$wlength",
      //"$wreverse", "$xecute", "$zabs", "$zarccos", "$zarcsin", "$zarctan",
      //"$zcos", "$zcot", "$zcsc", "$zdate", "$zdateh", "$zdatetime",
      //"$zdatetimeh", "$zexp", "$zhex", "$zln", "$zlog", "$zpower", "$zsec",
      //"$zsin", "$zsqr", "$ztan", "$ztime", "$ztimeh", "$zboolean",
      //"$zconvert", "$zcrc", "$zcyc", "$zdascii", "$zdchar", "$zf",
      //"$ziswide", "$zlascii", "$zlchar", "$zname", "$zposition", "$zqascii",
      //"$zqchar", "$zsearch", "$zseek", "$zstrip", "$zwascii", "$zwchar",
      //"$zwidth", "$zwpack", "$zwbpack", "$zwunpack", "$zwbunpack", "$zzenkaku",
      //"$change", "$mv", "$mvat", "$mvfmt", "$mvfmts", "$mviconv",
      //"$mviconvs", "$mvinmat", "$mvlover", "$mvoconv", "$mvoconvs", "$mvraise",
      //"$mvtrans", "$mvv", "$mvname", "$zbitand", "$zbitcount", "$zbitfind",
      //"$zbitget", "$zbitlen", "$zbitnot", "$zbitor", "$zbitset", "$zbitstr",
      //"$zbitxor", "$zincrement", "$znext", "$zorder", "$zprevious", "$zsort",
      //"device", "$ecode", "$estack", "$etrap", "$halt", "$horolog",
      //"$io", "$job", "$key", "$namespace", "$principal", "$quit", "$roles",
      //"$storage", "$system", "$test", "$this", "$tlevel", "$username",
      //"$x", "$y", "$za", "$zb", "$zchild", "$zeof", "$zeos", "$zerror",
      //"$zhorolog", "$zio", "$zjob", "$zmode", "$znspace", "$zparent", "$zpi",
      //"$zpos", "$zreference", "$zstorage", "$ztimestamp", "$ztimezone",
      //"$ztrap", "$zversion"

    ].join(" ")
  };

  return {
    case_insensitive: true,
    aliases: ["cos", "cls"],
    keywords: COS_KEYWORDS,
    contains: [
      NUMBERS,
      STRINGS,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      { // functions
        className: "built_in",
        begin: /\$\$?[a-zA-Z]+/
      },
      { // macro
        className: "keyword",
        begin: /\$\$\$[a-zA-Z]+/
      },
      { // globals
        className: "symbol",
        begin: /\^%?[a-zA-Z][\w]*/
      },
      { // static class reference constructions
        className: 'keyword',
        begin: /##class/
      },

      // sub-languages: are not fully supported by hljs by 11/15/2015
      // left for the future implementation.
      {
        begin: /&sql\(/,    end: /\)/,
        excludeBegin: true, excludeEnd: true,
        subLanguage: "sql"
      },
      {
        begin: /&(js|jscript|javascript)</, end: />/,
        excludeBegin: true, excludeEnd: true,
        subLanguage: "javascript"
      },
      {
        begin: /&html<\s*</, end: />\s*>/, // brakes first tag, but the only way to embed valid html
        subLanguage: "xml" // no html?
      }
    ]
  };
}
