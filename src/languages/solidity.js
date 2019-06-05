/*
Language: Solidity
Author: Sam Pospischil <sam@changegiving.com>
Contributor: Andrew B Coathup
Category: common
*/

function(hljs) {
    var SOL_KEYWORDS = {
        keyword:
            'var bool string ' +
            'int uint int8 uint8 int16 uint16 int24 uint24 int32 uint32 ' +
            'int40 uint40 int48 uint48 int56 uint56 int64 uint64 ' +
            'int72 uint72 int80 uint80 int88 uint88 int96 uint96 ' +
            'int104 uint104 int112 uint112 int120 uint120 int128 uint128 ' +
            'int136 uint136 int144 uint144 int152 uint152 int160 uint160 ' +
            'int168 uint168 int176 uint176 int184 uint184 int192 uint192 ' +
            'int200 uint200 int208 uint208 int216 uint216 int224 uint224 ' +
            'int232 uint232 int240 uint240 int248 uint248 int256 uint256 ' +
            'byte bytes bytes1 bytes2 bytes3 bytes4 bytes5 bytes6 bytes7 bytes8 ' +
            'bytes9 bytes10 bytes11 bytes12 bytes13 bytes14 bytes15 bytes16 ' +
            'bytes17 bytes18 bytes19 bytes20 bytes21 bytes22 bytes23 bytes24 ' +
            'bytes25 bytes26 bytes27 bytes28 bytes29 bytes30 bytes31 bytes32 ' +
            'enum struct mapping address ' +

            'new delete ' +
            'if else for while continue break return throw assert require revert ' +

            'function modifier event ' +
            'constant anonymous indexed ' +
            'storage memory ' +
            'external public internal pure view private returns ' +

            'import using ' +
            'contract interface library ' +
            'assembly',
        literal:
            'true false ' +
            'wei szabo finney ether ' +
            'second seconds minute minutes hour hours day days week weeks year years',
        built_in:
            'self ' +   // :NOTE: not a real keyword, but a convention used in storage manipulation libraries
            'this super selfdestruct ' +
            'now ' +
            'msg ' +
            'block ' +
            'tx ' +
            'sha3 sha256 ripemd160 erecover addmod mulmod ' +
            // :NOTE: not really toplevel, but advantageous to have highlighted as if reserved to
            //        avoid newcomers making mistakes due to accidental name collisions.
            'send call callcode delegatecall',
    };

    var SOL_NUMBER = {
        className: 'number',
        variants: [
            { begin: '\\b(0[bB][01]+)' },
            { begin: '\\b(0[oO][0-7]+)' },
            { begin: hljs.C_NUMBER_RE },
        ],
        relevance: 0,
    };

    var SOL_FUNC_PARAMS = {
        className: 'params',
        begin: /\(/, end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: SOL_KEYWORDS,
        contains: [
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE,
            SOL_NUMBER,
        ],
    };

    var SOL_RESERVED_MEMBERS = {
        begin: /\.\s*/,  // match any property access up to start of prop
        end: /[^A-Za-z0-9$_\.]/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: {
            built_in: 'gas value send call callcode delegatecall balance length push',
        },
        relevance: 2,
    };

    function makeBuiltinProps(obj, props) {
        return {
            begin: obj + '\\.\\s*',
            end: /[^A-Za-z0-9$_\.]/,
            excludeBegin: false,
            excludeEnd: true,
            keywords: {
                built_in: obj + ' ' + props,
            },
            contains: [
                SOL_RESERVED_MEMBERS,
            ],
            relevance: 10,
        };
    }

    return {
        aliases: ['sol'],
        keywords: SOL_KEYWORDS,
        contains: [
            // basic literal definitions
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE,
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            SOL_NUMBER,
            { // functions
                className: 'function',
                beginKeywords: 'function modifier event', end: /[{;]/, excludeEnd: true,
                contains: [
                    hljs.inherit(hljs.TITLE_MODE, {
                        begin: /[A-Za-z$_][0-9A-Za-z$_]*/,
                        keywords: SOL_KEYWORDS,
                    }),
                    SOL_FUNC_PARAMS,
                ],
                illegal: /\[|%/,
            },
            // built-in members
            makeBuiltinProps('msg', 'data sender sig'),
            makeBuiltinProps('block', 'blockhash coinbase difficulty gaslimit number timestamp '),
            makeBuiltinProps('tx', 'gasprice origin'),
            SOL_RESERVED_MEMBERS,
            { // contracts & libraries & interfaces
                className: 'class',
                beginKeywords: 'contract interface library', end: /[{]/, excludeEnd: true,
                illegal: /[:"\[\]]/,
                contains: [
                    { beginKeywords: 'is' },
                    hljs.UNDERSCORE_TITLE_MODE,
                    SOL_FUNC_PARAMS,
                ],
            },
            { // imports
                beginKeywords: 'import', end: '[;$]',
                keywords: 'import * from as',
                contains: [
                    hljs.APOS_STRING_MODE,
                    hljs.QUOTE_STRING_MODE,
                ],
            },
        ],
        illegal: /#/,
    };
}