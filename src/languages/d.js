/*
Language: D
Author: Aleksandar Ruzicic <aleksandar@ruzicic.info>
Description: D is a language with C-like syntax and static typing. It pragmatically combines efficiency, control, and modeling power, with safety and programmer productivity.
Version: 1.0a
Date: 2012-04-08
*/

/**
 * Known issues:
 *
 * - invalid hex string literals will be recognized as a double quoted strings
 *   but 'x' at the beginning of string will not be matched
 *
 * - delimited string literals are not checked for matching end delimiter
 *   (not possible to do with js regexp)
 *
 * - content of token string is colored as a string (i.e. no keyword coloring inside a token string)
 *   also, content of token string is not validated to contain only valid D tokens
 *
 * - special token sequence rule is not strictly following D grammar (anything following #line
 *   up to the end of line is matched as special token sequence)
 */

hljs.LANGUAGES.d = function() {

	/**
	 * Language keywords
	 *
	 * @type {Object}
	 */
	var D_KEYWORDS = {
		keyword: {
			'abstract': 1, 'alias': 1, 'align': 1, 'asm': 1, 'assert': 1, 'auto': 1,
			'body': 1, 'break': 1, 'byte': 1,
			'case': 1, 'cast': 1, 'catch': 1, 'class': 1, 'const': 1, 'continue': 1,
			'debug': 1, 'default': 1, 'delete': 1, 'deprecated': 1, 'do': 1,
			'else': 1, 'enum': 1, 'export': 1, 'extern': 1,
			'final': 1, 'finally': 1, 'for': 1, 'foreach': 1, 'foreach_reverse': 10,
			'goto': 1,
			'if': 1, 'immutable': 1, 'import': 1, 'in': 1, 'inout': 1, 'int': 1, 'interface': 1, 'invariant': 1, 'is': 1,
			'lazy': 1,
			'macro': 1, 'mixin': 1, 'module': 1,
			'new': 1, 'nothrow': 1,
			'out': 1, 'override': 1,
			'package': 1, 'pragma': 1, 'private': 1, 'protected': 1, 'public': 1, 'pure': 1,
			'ref': 1, 'return': 1,
			'scope': 1, 'shared': 1, 'static': 1, 'struct': 1, 'super': 1, 'switch': 1, 'synchronized': 1,
			'template': 1, 'this': 1, 'throw': 1, 'try': 1, 'typedef': 1, 'typeid': 1, 'typeof': 1,
			'union': 1, 'unittest': 1,
			'version': 1, 'void': 1, 'volatile': 1,
			'while': 1, 'with': 1,
			'__FILE__': 1, '__LINE__': 1, '__gshared': 10, '__thread': 10, '__traits': 10,
			'__DATE__': 1, '__EOF__': 1, '__TIME__': 1, '__TIMESTAMP__': 1, '__VENDOR__': 1, '__VERSION__': 1
		},
		built_in: {
			'bool': 1,
			'cdouble': 1, 'cent': 1, 'cfloat': 1, 'char': 1, 'creal': 1,
			'dchar': 1, 'delegate': 1, 'double': 1, 'dstring': 1,
			'float': 1, 'function': 1,
			'idouble': 1, 'ifloat': 1, 'ireal': 1,
			'long': 1,
			'real': 1,
			'short': 1, 'string': 1,
			'ubyte': 1, 'ucent': 1, 'uint': 1, 'ulong': 1, 'ushort': 1,
			'wchar': 1, 'wstring': 1
		},
		literal: {
			'false': 1,
			'null': 1,
			'true': 1
		}
	};

	/**
	 * Number literal regexps
	 *
	 * @type {String}
	 */
	var decimal_integer_re = '(0|[1-9][\\d_]*)',
		decimal_integer_nosus_re = '(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)',
		binary_integer_re = '0[bB][01_]+',
		hexadecimal_digits_re = '([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)',
		hexadecimal_integer_re = '0[xX]' + hexadecimal_digits_re,

		decimal_exponent_re = '([eE][+-]?' + decimal_integer_nosus_re + ')',
		decimal_float_re = '(' + decimal_integer_nosus_re + '(\\.\\d*|' + decimal_exponent_re + ')|' +
								'\\d+\\.' + decimal_integer_nosus_re + decimal_integer_nosus_re + '|' +
								'\\.' + decimal_integer_re + decimal_exponent_re + '?' +
							')',
		hexadecimal_float_re = '(0[xX](' +
									hexadecimal_digits_re + '\\.' + hexadecimal_digits_re + '|'+
									'\\.?' + hexadecimal_digits_re +
							   ')[pP][+-]?' + decimal_integer_nosus_re + ')';

		integer_re = '(' +
			decimal_integer_re + '|' +
			binary_integer_re  + '|' +
		 	hexadecimal_integer_re   +
		')',

		float_re = '(' +
			hexadecimal_float_re + '|' +
			decimal_float_re  +
		')';

	/**
	 * Escape sequence supported in D string and character literals
	 *
	 * @type {String}
	 */
	var escape_sequence_re = '\\\\(' +
							'[\'"\\?\\\\abfnrtv]|' +	// common escapes
							'u[\\dA-Fa-f]{4}|' + 		// four hex digit unicode codepoint
							'[0-7]{1,3}|' + 			// one to three octal digit ascii char code
							'x[\\dA-Fa-f]{2}|' +		// two hex digit ascii char code
							'U[\\dA-Fa-f]{8}' +			// eight hex digit unicode codepoint
						  ')|' +
						  '&[a-zA-Z\\d]{2,};';			// named character entity


	/**
	 * D integer number literals
	 *
	 * @type {Object}
	 */
	var D_INTEGER_MODE = {
		className: 'number',
    	begin: '\\b' + integer_re + '(L|u|U|Lu|LU|uL|UL)?',
    	relevance: 0
	};

	/**
	 * [D_FLOAT_MODE description]
	 * @type {Object}
	 */
	var D_FLOAT_MODE = {
		className: 'number',
		begin: '\\b(' +
				float_re + '([fF]|L|i|[fF]i|Li)?|' +
				integer_re + '(i|[fF]i|Li)' +
			')',
		relevance: 0
	};

	/**
	 * D character literal
	 *
	 * @type {Object}
	 */
	var D_CHARACTER_MODE = {
		className: 'string',
		begin: '\'(' + escape_sequence_re + '|.)', end: '\'',
		illegal: '.'
	};

	/**
	 * D string escape sequence
	 *
	 * @type {Object}
	 */
	var D_ESCAPE_SEQUENCE = {
		begin: escape_sequence_re,
		relevance: 0
	}

	/**
	 * D double quoted string literal
	 *
	 * @type {Object}
	 */
	var D_STRING_MODE = {
		className: 'string',
		begin: '"',
		contains: [D_ESCAPE_SEQUENCE],
		end: '"[cwd]?',
		relevance: 0
	};

	/**
	 * D wysiwyg and delimited string literals
	 *
	 * @type {Object}
	 */
	var D_WYSIWYG_DELIMITED_STRING_MODE = {
		className: 'string',
		begin: '[rq]"',
		end: '"[cwd]?',
		relevance: 5
	};

	/**
	 * D alternate wysiwyg string literal
	 *
	 * @type {Object}
	 */
	var D_ALTERNATE_WYSIWYG_STRING_MODE = {
		className: 'string',
		begin: '`',
		end: '`[cwd]?'
	};

	/**
	 * D hexadecimal string literal
	 *
	 * @type {Object}
	 */
	var D_HEX_STRING_MODE = {
		className: 'string',
		begin: 'x"[\\da-fA-F\\s\\n\\r]*"[cwd]?',
		relevance: 10
	};

	/**
	 * D delimited string literal
	 *
	 * @type {Object}
	 */
	var D_TOKEN_STRING_MODE = {
		className: 'string',
		begin: 'q"\\{',
		end: '\\}"'
	};

	/**
	 * Hashbang support
	 *
	 * @type {Object}
	 */
	var D_HASHBANG_MODE = {
		className: 'shebang',
		begin: '^#!',
		end: '$',
		relevance: 5
	};

	/**
	 * D special token sequence
	 *
	 * @type {Object}
	 */
	var D_SPECIAL_TOKEN_SEQUENCE_MODE = {
		className: 'preprocessor',
		begin: '#(line)',
		end: '$',
		relevance: 5
	};

	/**
	 * D attributes
	 *
	 * @type {Object}
	 */
	var D_ATTRIBUTE_MODE = {
		className: 'keyword',
		begin: '@[a-zA-Z_][a-zA-Z_\\d]*'
	};

	/**
	 * D nesting comment
	 *
	 * @type {Object}
	 */
	var D_NESTING_COMMENT_MODE = {
		className: 'comment',
		begin: '\\/\\+',
		contains: ['self'],
		end: '\\+\\/',
		relevance: 10
	}

	return {
		defaultMode: {
			lexems: hljs.UNDERSCORE_IDENT_RE,
			keywords: D_KEYWORDS,
			contains: [
				hljs.C_LINE_COMMENT_MODE,
      			hljs.C_BLOCK_COMMENT_MODE,
      			D_NESTING_COMMENT_MODE,
      			D_HEX_STRING_MODE,
      			D_STRING_MODE,
      			D_WYSIWYG_DELIMITED_STRING_MODE,
      			D_ALTERNATE_WYSIWYG_STRING_MODE,
      			D_TOKEN_STRING_MODE,
      			D_FLOAT_MODE,
      			D_INTEGER_MODE,
      			D_CHARACTER_MODE,
      			D_HASHBANG_MODE,
      			D_SPECIAL_TOKEN_SEQUENCE_MODE,
      			D_ATTRIBUTE_MODE
			]
		}
	};
}();
