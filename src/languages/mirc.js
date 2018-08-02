/*
Language: mIRC
Category: scripting
*/
function(hljs) {
	var ALIAS = {
		className: 'subst',
		variants: [
			{
				begin: /^alias (-l )?.+ \{/,
				end: /\}/
			},
			{
				begin: /^alias (-l )?.+/,
				end: /\n/
			}
		]
	};
	var MENU = {
		className: 'subst',
		variants: [
			{
				begin: /^menu .+ \{/,
				end: /\}/
			}
		]
	};
	var MENU_SUBST1 = {
		className: 'subst',
		begin: /\./,
		end: /:/,
		returnEnd: true
	};
	var MENU_SUBST2 = {
		className: 'subst',
		begin: /:/,
		end: /\n/,
		returnBegin: true
	};
	var DIALOG = {
		className: 'subst',
		variants: [
			{
				begin: /^dialog .+ \{/,
				end: /\}/
			}
		]
	};
	var ON = {
		className: 'subst',
		variants: [
			{
				begin: /^(on|ctcp|raw).+\{/,
				end: /\}/
			},
			{
				begin: /^(on|ctcp|raw).+:/,
				end: /\n/
			}
		]
	};
	var CODE_BLOCK = {
		className: 'subst',
		begin: /\{/,
		end: /\}/
	};
	var PAREN_BLOCK = {
		className: 'subst',
		begin: /\(/,
		end: /\)/
	};
	var LITERAL = {
		className: 'literal',
		begin: /\$(null|false|true)/
	};
	var VARIABLES = {
		className: 'variable',
		begin: /\%:?[\w\.\-<>=]*/
	};
	var IDENTIFIERS = {
		className: 'built_in',
		begin: /\$+(\d+-?|\+|yes|xor|wrap|window|wildtokcs|wildtok|wildsite|width|wid|wavedir|vol|vnick|version|vcmdver|vcmdstat|vcmd|vc|var|v2|v1|utfencode|utfdecode|usermode|url|uptime|upper|unsafe|ulist|ulevel|trust|true|treebar|totp|topic|toolbar|token|titlebar|tips|tip|timezone|timestampfmt|timestamp|timer|timeout|time|ticks|tempfn|target|tanh|tan|sysdir|switchbar|submenu|style|stripped|strip|str|status|starting|sslversion|sslready|ssllibdll|ssldll|sslcertsha256|sslcertsha1|ssl|sreq|sqrt|speak|sound|sorttokcs|sorttok|sockname|sockerr|sockbr|sock|snotify|snicks|snick|sline|site|sinh|sin|signal|show|shortfn|sha512|sha384|sha256|sha1|sfile|servertarget|serverip|server|send|sdir|scriptline|scriptdir|script|scon|scid|samepath|round|rnick|right|rgb|result|reptokcs|reptok|replacexcs|replacex|replacecs|replace|remtokcs|remtok|removecs|remove|remote|regsubex|regsub|regmlex|regml|regex|regerrstr|regbr|readn|readini|read|rawmsg|rawbytes|rand|raddress|r|query|qt|puttok|protect|prop|prefix|poscs|pos|portfree|portable|pnick|play|pic|pi|passivedcc|parseutf|parsetype|parseline|parms|os|ord|or|opnick|onpoly|onlinetotal|onlineserver|online|ok|nvnick|numtok|numeric|null|notify|notags|not|noqt|nopnick|nopath|nofile|no|nickmode|nick|nhnick|newnick|network|naddress|msgtags|msgstamp|msfile|mp3dir|mp3|mouse|modespl|modelast|modefirst|mode|mnick|mknickfn|mklogfn|mkfn|mircini|mircexe|mircdir|mididir|mid|menutype|menucontext|menubar|menu|me|md5|matchtokcs|matchtok|matchkey|mask|maddress|ltimer|lower|longip|longfn|logstampfmt|logstamp|logdir|log10|log|lof|locked|lock|link|lines|line|lf|level|len|leftwinwid|leftwincid|leftwin|left|lactivewid|lactivecid|lactive|knick|keyval|keyrpt|keychar|isutf|isupper|istok|islower|isid|isfile|isdir|isdde|isbit|isalias|iql|iptype|ip|inwho|inwave|intersect|int|instok|insong|inroundrect|inrect|input|inpoly|inpaste|inmp3|inmode|inmidi|initopic|ini|inellipse|iil|ignore|ifmatch2|ifmatch|iif|iel|idle|ibl|ialchan|ial|iaddress|hypot|hregex|hotp|hotlink|hotlinepos|hotline|host|hnick|hmatch|hmac|highlight|hget|hfind|hfile|height|hash|halted|group|gmt|gettok|getdot|getdir|get|fullscreen|fullname|fulldate|fulladdress|fserve|fserv|fromeditbox|fread|fopen|font|floor|fline|findtokcs|findtok|findfilen|findfile|finddirn|finddir|filtered|filename|file|fgetc|ferr|feof|false|exiting|exists|eventid|event|evalnext|eval|error|envvar|encode|emailaddr|email|editbox|ebeeps|duration|dqwindow|dname|dllcall|dll|dlevel|disk|dir|didwm|didtok|didreg|did|dialog|devent|deltok|decompress|decode|debug|ddename|dde|dccport|dccignore|dbuw|dbuh|daylight|day|date|ctrlenter|ctimer|ctime|crlf|creq|crc|cr|count|cosh|cos|comval|compress|compact|comerr|comchar|comchan|comcall|com|colour|color|cnick|cmdline|cmdbox|click|clevel|cid|chr|chat|chantypes|chanmodes|chan|ceil|cd|cb|cancel|caller|calc|bytes|bvar|bnick|bits|biton|bitoff|bindip|bfind|beta|base|banmask|banlist|awaytime|awaymsg|away|avoice|auto|atan2|atan|asin|asctime|asc|appstate|appactive|aop|ansi2mirc|anick|and|alias|agentver|agentstat|agentname|agent|addtokcs|addtok|address|adate|activewid|activecid|active|acos|abs|abook)/,
	};
	var KEYWORDS = {
		className: 'keyword',
		begin: /( (!?\.?!?\/?)|:)(xyzzy|writeini|write|winhelp|window|whois|while|wavplay|wallchops|vol|vcrem|vcmd|vcadd|var|uwho|username|url|updatenl|unsetall|unset|unload|ulist|treebar|tray|toolbar|tokenize|tnick|titlebar|tips|tip|timestamp|timer[\w\-\.]*|switchbar|strip|sreq|splay|speak|sound|sockwrite|sockudp|sockrename|sockread|sockpause|sockopen|sockmark|socklisten|socklist|sockclose|sockaccept|sline|signal|showmirc|setlayer|set|server|scon|scid|say|saveini|savebuf|save|ruser|run|rmdir|rline|rlevel|returnex|return|resetidle|reseterror|renwin|rename|remove|remote|remini|reload|registration|raw|quote|quit|queryrn|query|qmsg|qme|pvoice|proxy|protect|pop|playctrl|play|perform|pdcc|partall|part|parseline|onotice|omsg|notify|noop|msg|mode|mnick|mkdir|menubar|me|mdi|maxdepth|logview|log|localinfo|loadbuf|load|list|links|linesep|leave|join|iuser|inc|iline|ignore|if|identd|ialmark|ialclear|ial|hsave|hotlink|hop|hmake|hload|hinc|hfree|help|hdel|hdec|haltdef|halt|hadd|guser|gunload|gtalk|gstop|gsize|gshow|groups|gqreq|gpoint|gplay|goto|gopts|gmove|gload|ghide|fwrite|fupdate|fullname|fserve|fsend|fseek|fopen|font|fnord|flushini|flush|flood|flist|flash|firewall|finger|findtext|filter|fclose|exit|events|enable|emailaddr|elseif|else|editbox|echo|ebeeps|drawtext|drawsize|drawscroll|drawsave|drawrot|drawreplace|drawrect|drawpic|drawline|drawfill|drawdot|drawcopy|dqwindow|dns|dll|dline|dlevel|disconnect|disable|didtok|did|dialog|describe|dec|debug|ddeserver|dde|dccserver|dcc|ctcps|ctcpreply|ctcp|creq|copy|continue|comreg|comopen|commands|comlist|comclose|colour|color|cnick|closemsg|closefserves|closedccs|closechats|close|clipboard|cline|clearial|clearall|clear|channel|bwrite|bunset|btrunc|bset|breplace|break|bread|bindip|beep|bcopy|ban|background|away|avoice|autojoin|auto|auser|aop|anick|amsg|ame|aline|ajinvite|add|action|abook|nick)( |\n)/, 
	};
	var KEYWORDS2 = {
		className: 'keyword',
		begin: / !?(iswmcs|iswm|isvoice|isupper|isreg|isprotect|isop|ison|isnum|isnotify|islower|isletter|isinvite|isincs|isin|isignore|ishop|isexcept|ischan|isban|isavoice|isaop|isalpha|isalnum) /,
	};
	var M_COMMENT = hljs.inherit(
    	hljs.COMMENT(null, null),
    	{
      		variants: [
      		  /* single-line comment */
      		  { begin: /^\s*\;/, end: /\n/ },
      		  /* multi-line comment */
      		  { begin: /^\s*\/\*/, end: /\*\// }
     		],
   		}
  	);
	PAREN_BLOCK.contains = [LITERAL, IDENTIFIERS, VARIABLES, KEYWORDS2, hljs.NUMBER_MODE, 'self'];
	CODE_BLOCK.contains = [PAREN_BLOCK, M_COMMENT, IDENTIFIERS, VARIABLES, LITERAL, KEYWORDS, KEYWORDS2, hljs.NUMBER_MODE, 'self'];
  	ALIAS.contains = [M_COMMENT, IDENTIFIERS, LITERAL, VARIABLES, KEYWORDS, KEYWORDS2, hljs.NUMBER_MODE, PAREN_BLOCK, CODE_BLOCK];
  	DIALOG.contains = [hljs.NUMBER_MODE];
  	MENU.contains = [MENU_SUBST2, MENU_SUBST1, IDENTIFIERS, VARIABLES, hljs.NUMBER_MODE, PAREN_BLOCK];
  	MENU_SUBST1.contains = [IDENTIFIERS, VARIABLES, hljs.NUMBER_MODE, PAREN_BLOCK];
  	MENU_SUBST2.contains = [IDENTIFIERS, VARIABLES, KEYWORDS, hljs.NUMBER_MODE, PAREN_BLOCK, CODE_BLOCK];
  	ON.contains = [M_COMMENT, IDENTIFIERS, LITERAL, VARIABLES, KEYWORDS, KEYWORDS2, hljs.NUMBER_MODE, CODE_BLOCK];
  	return {
  		aliases: ['mrc'],
  		case_insensitive: true,
  		contains: [
			ALIAS,
			DIALOG,
			MENU,
			ON,
			M_COMMENT,
  		]
  	};
}
