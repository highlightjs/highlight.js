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
				begin: /\\[a-z]/,
				end: /\s/,
				excludeEnd: true,
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
						// multiline strings in SC are allowed
						begin: /\n/,
						relevance: 2
					}
				]
			},
			{
				begin: /\$[^$]/,
				relevance: 2
			}
		]
	};

	var SC_GLOBAL = {
		className: "variable", 
		begin: /(\s|^)~[a-z]\w*/,
		relevance: 2
	};

	var SC_NUMBER = {
		className: "number",
		relevance: 0,
		variants: [
			{
				begin: /\b-?\d+[eE]-?\d+\b/
			},
			{
				begin: /\b-?\d+(\.\d+)?\b/
			},
			{
				begin: /\b-?(\d+[eE]-?\d+|\d+(\.\d+)?)?pi\b/,
				relevance: 8,
			},
			{
				begin: /\b\d+r[a-zA-Z0-9]*\b/,
				relevance: 2
			}
		]
	};

	var SC_BUILT_IN = {
		className: "built_in",
		begin: /\b[A-Z]\w+\b/,
		relevance: 0
	};

	var SC_KEYWORD = {
		className: "keyword",
		relevance: 0,
		variants: [
			{
				begin: /\b(var|if|while|for|do|switch|case|this)\b/
			},
			{
				begin: /\b(classvar|arg|forBy|repeat)\b/,
				relevance: 4
			}
		]
	};

	var SC_LITERAL = {
		className: "literal",
		relevance: 0,
		variants: [
			{
				begin: /\b(nil|true|false)\b/
			},
			{
				begin: /\binf\b/,
				relevance: 3
			}
		]
	};

	var SC_RELEVANCE_BOOSTER = {
		begin: /\.(play|scope|ar|kr)\b/,
		relevance: 5
	};

	var SC_NESTED_LANG_CONSTRUCTS = [
		hljs.C_LINE_COMMENT_MODE,
		hljs.C_BLOCK_COMMENT_MODE,
		SC_SYMBOL,
		SC_STRING,
		SC_GLOBAL,
		SC_NUMBER,
		SC_BUILT_IN,
		SC_KEYWORD,
		SC_LITERAL,
		SC_RELEVANCE_BOOSTER
	];

	return {
		aliases: ["sclang", "scd"],
		contains: [
			{
				className: "function",
				begin: /\{/,
				end: /\}/,
				relevance: 0,
				contains: [
					"self",
					{
						className: "params",
						variants: [
							{
								begin: /\|/,
								end: /\|/,
								relevance: 3
							},
							{
								beginKeywords: "arg",
								end: /;/,
								excludeEnd: true,
								relevance: 3
							}
						]
					}
				].concat(SC_NESTED_LANG_CONSTRUCTS)
			},
			hljs.METHOD_GUARD
		].concat(SC_NESTED_LANG_CONSTRUCTS)
	};

}

