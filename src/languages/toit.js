/*
* Language: Toit
* Category: common
* Contributors: snxx <snxx.lppxx@gmail.com>
* Website: https://toitlang.org
*/

function toit(hljs) {
	const STRING = [
		className = 'string',
		illegal: /\n/,
		variants: [
			{begin: /'/, end: /'/},
			{begin: /"/, end: /"/}
		]
	];

	const NUMBERS = {
		className: 'number',
		variants: [
			{
				begin: '\\b(0b[01\']+'
			},
			{
				begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)'
			},
			{
				begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)'
			}
		],
		relevance: 0
	};

	const COMMENT_SINGLE_LINE = [
		className: 'comment',
		begin: '//.*',
		illegal: '\\n'
	];

	const COMMENT_MULTI_LINE = [
		className: 'comment',
		begin: '/*', end: '*/'
	];

	const COMMENT_ERROR = [
		className: 'dogtag',
		begin: /^[\*]{2}[\*]*\s/, end: /\n/
	];

	const RESERVED_KEYWORDS = [
		'if',
		'else',
		'while',
		'do'
		'for',
		'class',
		'constructor'
		'import',
		'show',
		'as',
		'it'
		'abstract',
		'operator',
		'extends',
		'interface',
		'implements',
		'continue'
	];

	const RESERVED_TYPES = [
		'string',
		'bool',
		'int',
		'float',
		'static'
	];

	const LITERALS = [
		'null',
		'none',
		'true',
		'false'
	];

	const KEYWORD = {
		type: RESERVED_TYPES,
		keyword: RESERVED_KEYWORDS,
		literal: LITERALS
	}

	return {
		name: 'Toit'
		aliases: ['toit'],
		keyword: KEYWORD
		illegal: /(\/\*|\/\/)/,
		contains: [
			STRING,
			COMMENT_SINGLE_LINE, COMMENT_MULTI_LINE, COMMENT_ERROR,
			OPERATOR, RESERVED_KEYWORDS,
			RESERVED_TYPES, LITERALS,
		]
		exports: {
			strings: STRING,
			keywords: KEYWORD
		}
	};
}
