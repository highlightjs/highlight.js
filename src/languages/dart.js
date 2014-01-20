/*
Language: Dart
Author: PhiLho (Philippe Lhoste) <PhiLho(a)GMX.net>
Description: Dart is a new platform for scalable web app engineering. https://www.dartlang.org/
*/

function(hljs)
{

	var IDENTIFIER = '[a-zA-Z_$][a-zA-Z0-9_$]*';
	var DART_DOC_REF = '(^|\\s)\\[\\w+\\]';
	var OPENING_BLOCK_COMMENT = '/\\*';
	var CLOSING_BLOCK_COMMENT = '\\*/';
	var BLOCK_COMMENT =
	{
		className: 'comment',
		begin: OPENING_BLOCK_COMMENT, end: CLOSING_BLOCK_COMMENT,
		contains: ['self']
	};
	var INTERPOLATION =
	{
		className: 'interpolation',
		relevance: 10,
		variants:
		[
			{ begin: '\\$\\{', end: '\\}' },
			{ begin: '\\$(?!=\\w)', end: '\\w\\b' }
		]
	};
	var TITLE =
	{
		className: 'title',
		begin: IDENTIFIER,
		relevance: 0
	};
	return {
		lexemes: IDENTIFIER,
		keywords:
		{
			keyword:
				'assert break case catch class const continue default do else enum extends ' +
				'false final finally for if in is new null rethrow return super switch ' +
				'this throw true try var void while with',
			built_in:
				'abstract as dynamic export external factory get implements import library ' +
				'operator part set static typedef',
			type:
				'bool double int num String List Map Function'
		},
		contains:
		[
			{
				className: 'javadoc', //  was dartdoc, but better use a relatively standard name
				begin: '/\\*\\*', end: '\\*/',
				contains:
				[{
					className: 'javadoctag', // was dartdocref, see above...
					begin: DART_DOC_REF
				}],
				relevance: 7
			},
			{
				className: 'javadoc',
				begin: '///', end: '$',
				contains:
				[{
					className: 'javadoctag',
					begin: DART_DOC_REF
				}],
				relevance: 10
			},
			{
				className: 'string',
				relevance: 10,
				variants:
				[
					{ begin: 'r"', end: '"' },
					{ begin: "r'", end: "'" }
				]
			},
			{
				className: 'string',
				contains: [hljs.BACKSLASH_ESCAPE, INTERPOLATION],
				illegal: '\\n',
				relevance: 5,
				variants:
				[
					{ begin: '"', end: '"' },
					{ begin: "'", end: "'" }
				]
			},
			{
				className: 'string',
				contains: [hljs.BACKSLASH_ESCAPE, INTERPOLATION],
				relevance: 10,
				variants:
				[
					{ begin: '"""', end: '"""' },
					{ begin: "'''", end: "'''" }
				]
			},
			{
				className: 'class',
				beginKeywords: 'class interface',
				end: '{',
				excludeEnd: true,
				illegal: ':',
				contains:
				[
					{
						beginKeywords: 'extends implements with|10',
						relevance: 7
					},
					TITLE,
					hljs.C_LINE_COMMENT_MODE,
					BLOCK_COMMENT
				]
			},
			{
				begin: IDENTIFIER + '\\s*\\(',
				returnBegin: true,
				contains: [ TITLE ]
			},
			{
				className: 'annotation',
				begin: '@[A-Za-z]+',
				relevance: 7
			},
			BLOCK_COMMENT,
			hljs.C_LINE_COMMENT_MODE,
			hljs.C_NUMBER_MODE
		]
	};
}


