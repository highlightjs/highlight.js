/*
Language: Oberon
Description: Syntax highlighting for the final version of Oberon (also known as Oberon-07)
Author: Karl Landstrom <karl@miasap.se>
Website: https://miasap.se/obnc/oberon-report.html
Category: system
*/

export default function(hljs)
{
	const COMMENT = hljs.COMMENT(/\(\*/, /\*\)/, {contains: ["self"]});

	const STRING = {
		scope: "string",
		variants: [
			{begin: '"', end: '"'},
			{begin: /\b\d[A-Z0-9]*X/}
		]
	};

	const NUMBER = {
		scope: "number",
		variants: [
			{begin: /\b\d+\.\d*(E[+-]?\d+)?/},
			{begin: /\b\d[A-Z0-9]*H/},
			{begin: /\b\d+/}
		]
	};

	const PUNCTUATION = {
		scope: "punctuation",
		begin: /[][(){}.,:;]/
	};

	const MODULE_OR_PROCEDURE_DECLARATION = {
		match: [
			/\b(?:MODULE|PROCEDURE)/,
			/\s+/,
			/\b\w+/],
		scope: {1: "keyword", 3: "title"}
	};

	const RESERVED_WORDS = ["ARRAY", "BEGIN", "BY", "CASE", "CONST", "DIV", "DO", "ELSE", "ELSIF", "END", "FALSE", "FOR", "IF", "IMPORT", "IN", "IS", "MOD", "MODULE", "NIL", "OF", "OR", "POINTER", "PROCEDURE", "RECORD", "REPEAT", "RETURN", "THEN", "TO", "TRUE", "TYPE", "UNTIL", "VAR", "WHILE"];

	const PREDEFINED_TYPES = ["BOOLEAN", "BYTE", "CHAR", "INTEGER", "REAL", "SET"];

	const PREDEFINED_PROCEDURES = ["ABS", "ASR", "ASSERT", "CHR", "DEC", "EXCL", "FLOOR", "FLT", "INC", "INCL", "LEN", "LSL", "NEW", "ODD", "ORD", "PACK", "ROR", "UNPK"];

	return {
		name: "Oberon",
		keywords: {
			keyword: RESERVED_WORDS,
			built_in: PREDEFINED_PROCEDURES,
			type: PREDEFINED_TYPES
		},
		contains: [
			COMMENT,
			STRING,
			NUMBER,
			PUNCTUATION,
			MODULE_OR_PROCEDURE_DECLARATION
		]
	};
}
