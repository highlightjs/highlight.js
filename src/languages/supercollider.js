/*
 * Language: SuperCollider
 * Author: Greg Weisbrod <greg.weisbrod@gmail.com>
 * Category: music
 * Description: Audio programming language, see http://supercollider.github.io/
 */

function(hljs) {

	var SC_SYMBOL = {
		className: "symbol",
		relevance: 0,
		variants: [
			{
				begin: /\\\w+/,
				relevance: 2
			},
			{
				begin: /'/,
				end: /'/,
				contains: [
					{
						begin: /\\'/,
					}
				]
			}
		]
	};

	var SC_STRING = {
		className: "string",
		relevance: 0,
		variants: [
			{
				begin: /"/,
				end: /"/,
				contains: [
					{
						begin: /\\"/
					},
					{
						// multiline strings in SC are allowed, but boost their relevance
						begin: /\n/,
						relevance: 2
					}
				]
			},
			{
				// char
				begin: /\$\\?[^$]/,
				relevance: 2
			}
		]
	};

	var SC_GLOBAL = {
		className: "variable", 
		begin: /(\s|^)~\w+/,
		relevance: 2
	};

	var SC_FLOAT_RE = "(-|\\b)\\d+(\\.\\d+)?([eE][-+]?\\d+)?";

	var SC_NUMBER = {
		className: "number",
		relevance: 0,
		variants: [
			{
				// float
				begin: new RegExp(SC_FLOAT_RE + "\\b")
			},
			{
				// float with "pi" constant - high relevance
				begin: new RegExp("(" + SC_FLOAT_RE + "pi|(-|\\b)pi\\b)"),
				relevance: 8,
			},
			{
				// radix float
				begin: /(-|\b)\d+r[0-9a-zA-Z]*(\.[0-9A-Z]*)?/,
				relevance: 2
			},
			{
				// hex int
				begin: /\b0[xX][\da-fA-F]+/
			}
		]
	};

	var SC_PARAM = {
		className: "params",
		variants: [
			{
				begin: /\{\s*\|/,
				end: /\|/,
				excludeBegin: true,
				excludeEnd: true,
				relevance: 3,
			},
			{
				beginKeywords: "arg",
				end: /;/,
				excludeEnd: true,
				relevance: 5,
			}
		]
	};

	var SC_TYPE = {
		className: "type",
		begin: /\b[A-Z]\w*\b/,
		relevance: 0
	};

	var SC_RELEVANCE_BOOSTER = {
		begin: /\.(play|scope|ar|kr)\b/,
		relevance: 5
	};

	var SC_LANG_CONSTRUCTS = [
		hljs.C_LINE_COMMENT_MODE,
		hljs.C_BLOCK_COMMENT_MODE,
		SC_SYMBOL,
		SC_STRING,
		SC_GLOBAL,
		SC_NUMBER,
		SC_TYPE,
		SC_PARAM,
		SC_RELEVANCE_BOOSTER
	];

	return {
		aliases: ["sclang", "scd"],
		keywords: {
			keyword: "var this super const classvar arg",
			literal: "nil true false inf thisFunction thisFunctionDef thisMethod thisProcess thisThread currentEnvironment topEnvironment"
		},
		contains: SC_LANG_CONSTRUCTS
	};

}

