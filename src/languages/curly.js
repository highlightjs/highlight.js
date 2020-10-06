/*
Language: Curly
Author: jenra <jenra.uwu@gmail.com>
Github: https://github.com/jenra-uwu/curly-lang
*/

// @ts-nocheck
export default function (hljs)
{
	return {
		name: 'curly',
		keywords: {
			keyword: 'for some all in pass stop if then else where with match to and or xor type enum class',
			literal: 'true false'
		},
		contains: [
			hljs.QUOTE_STRING_MODE,
			hljs.COMMENT(
				'#', '\n'
			),
			{
				className: 'number',
				begin: /\b[0-9]+(\.[0-9]+)?/
			},
			{
				className: 'unused-uwu-owo-uwu-owo',
				begin: /\./,
				contains: [
					{
						className: 'symbol',
						begin: /[0-9A-Za-z_@\$][a-zA-Z0-9'_]*/
					}
				],
				end: /\s/
			},
			{
				className: 'class',
				beginKeywords: 'type',
				contains: [
					{
						className: 'symbol',
						begin: /\b[A-Za-z_@\$][a-zA-Z0-9'_]*(?=\s*\:)/,
					},
					{
						className: 'type',
						begin: /\b[A-Z][a-z0-9_A-Z']*/
					}
				],
				end: /\n(?!\s*[&\|\*\(\)])/
			},
			{
				className: 'type',
				begin: /\b[A-Z][a-z0-9_A-Z']*/
			}
		]
	}
}
