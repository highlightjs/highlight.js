/*
Language: Java Property Files
Author: Michael Gerbig <>
Description: language definition for Java Property files
Category: common, config
*/

function(hljs) {
	return {
		contains: [
			hljs.COMMENT(
				'^\\s*[\\!#]',
				'$'
			),
			{
				className: 'variable',
				begin: /^[^:=]+/m
			},
			{
				className: 'string',
				begin: /[=:]\s*/,
				end: /[^\\]$/,
				excludeBegin: true,
				contains: [
					{
						className: 'symbol',
						begin: /\\(t|n|r|u[0-9A-Fa-f]{4})/
					},
					{
						className: 'meta',
						begin: /\\$/
					},
					"self"
				]
			}
		]
	};
}
