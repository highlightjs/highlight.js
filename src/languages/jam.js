/*
Language: Jam
Author: Rene Rivera <grafikrobot@gmail.com>
*/


function(hljs) {
	var KEYWORD_MODE = {
		className: 'keyword',
		beginKeywords: 'local include return break continue for in switch ' +
			'if else module class while rule on actions case bind ' +
			'updated together ignore quietly piecemeal existing'
	};
	var BUILTIN_MODE = {
		className: 'built_in',
		beginKeywords:
			'Always ALWAYS Depends DEPENDS echo Echo ECHO exit Exit EXIT ' +
			'Glob GLOB GLOB-RECURSIVELY Includes INCLUDES REBUILDS ' +
			'SPLIT_BY_CHARACTERS NoCare NOCARE NOTIME NotFile NOTFILE ' +
			'NoUpdate NOUPDATE Temporary TEMPORARY ISFILE HdrMacro HDRMACRO ' +
			'FAIL_EXPECTED RMOLD UPDATE subst SUBST RULENAMES VARNAMES ' +
			'DELETE_MODULE IMPORT EXPORT CALLER_MODULE BACKTRACE PWD '+
			'IMPORT_MODULE IMPORTED_MODULES INSTANCE SORT NORMALIZE_PATH ' +
			'CALC NATIVE_RULE HAS_NATIVE_RULE USER_MODULE NEAREST_USER_LOCATION ' +
			'PYTHON_IMPORT_RULE W32_GETREG W32_GETREGNAMES SHELL COMMAND ' +
			'MD5 FILE_OPEN PAD PRECIOUS SELF_PATH MAKEDIR READLINK GLOB_ARCHIVE ' +
			'import using peek poke record-binding ' +
			'project use-project build-project ' +
			'exe lib alias obj explicit install make notfile ' +
			'unit-test compile compile-fail link link-fail run run-fail ' +
			'check-target-builds glob glob-tree always ' +
			'constant path-constant',
		lexemes: '[a-zA-Z0-9_\\-]+'
	};
	var SIMPLE_VALUE_MODE = {
		begin: '\\S+',
		end: '\\s',
		excludeEnd: true,
		relevance: 0
	};
	var QUOTED_VALUE_MODE = {
		className: 'string',
		begin: '"', end: '"',
		contains: [hljs.BACKSLASH_ESCAPE],
		relevance: 0
	};
	var VARIABLE_MODE = {
		className: 'variable',
		variants: [
			{
				begin: '\\S*[$][(]',
				end: '[)]\\S*',
				contains: [hljs.QUOTE_STRING_MODE]
			}
		]
	};
	var TITLE_MODE = {
		className: 'title',
		begin: '\\S+',
		end: '\\s+',
		excludeEnd: true,
		relevance: 0
	};
	var RULE_MODE = {
		className: 'function',
		beginKeywords: 'rule',
		end: '\\s+[{]',
		illegal: '[{]',
		excludeEnd: true,
		contains: [
			{
				className: 'params',
				begin: '[(]', end: '[)]'
			},
			{
				begin: '[{]',
				endsParent: true,
				relevance: 0
			},
			TITLE_MODE
		]
	};
	var ACTIONS_MODIFIERS_MODE = {
		className: 'meta-keyword',
		beginKeywords: 'updated together ignore quietly piecemeal existing'
	};
	var ACTIONS_BODY_MODE = {
		className: 'string',
		begin: '[{]',
		end: '[}]',
		endsParent: true,
		excludeBegin: true,
		excludeEnd: true,
		contains: [VARIABLE_MODE],
		relevance: 0
	};
	var ACTIONS_MODE = {
		className: 'function',
		beginKeywords: 'actions',
		end: '[}]',
		contains: [
			ACTIONS_BODY_MODE,
			ACTIONS_MODIFIERS_MODE,
			TITLE_MODE
		]
	};
	var CLASS_MODE = {
		className: 'class',
		beginKeywords: 'class',
		end: '[:{]',
		illegal: '[:{]',
		excludeEnd: true,
		contains: [
			{ begin: '[:{]', endsParent: true, returnBegin: true, relevance: 0 },
			TITLE_MODE
		]
	};
	var MODULE_MODE = {
		className: 'class',
		beginKeywords: 'module',
		end: '[:{]',
		illegal: '[:{]',
		excludeEnd: true,
		contains: [
			{ begin: '[{]', endsParent: true, returnBegin: true, relevance: 0 },
			TITLE_MODE
		]
	};
	return {
		contains: [
			hljs.COMMENT('[#][|]', '[|][#]'),
			hljs.COMMENT('#', '$'),
			RULE_MODE,
			ACTIONS_MODE,
			MODULE_MODE,
			CLASS_MODE,
			VARIABLE_MODE,
			BUILTIN_MODE,
			KEYWORD_MODE,
			QUOTED_VALUE_MODE,
			SIMPLE_VALUE_MODE
		]
	};
}
