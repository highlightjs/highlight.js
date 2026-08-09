/** @typedef {import('./hljs_types.js').Mode} Mode */
/** @typedef {import('./hljs_types.js').ModeCallback} ModeCallback */
/** @type {RegExp} */
export const MATCH_NOTHING_RE: RegExp;
/** @type {string} */
export const IDENT_RE: string;
/** @type {string} */
export const UNDERSCORE_IDENT_RE: string;
/** @type {string} */
export const NUMBER_RE: string;
/** @type {string} */
export const C_NUMBER_RE: string;
/** @type {string} */
export const BINARY_NUMBER_RE: string;
/** @type {string} */
export const RE_STARTERS_RE: string;
export function SHEBANG(opts?: Partial<Mode> & {
    binary?: string | RegExp;
}): Mode;
/** @type {Mode} */
export const BACKSLASH_ESCAPE: Mode;
/** @type {Mode} */
export const APOS_STRING_MODE: Mode;
/** @type {Mode} */
export const QUOTE_STRING_MODE: Mode;
/** @type {Mode} */
export const PHRASAL_WORDS_MODE: Mode;
export function COMMENT(begin: string | RegExp, end: string | RegExp, modeOptions?: Mode | {}): Mode;
/** @type {Mode} */
export const C_LINE_COMMENT_MODE: Mode;
/** @type {Mode} */
export const C_BLOCK_COMMENT_MODE: Mode;
/** @type {Mode} */
export const HASH_COMMENT_MODE: Mode;
/** @type {Mode} */
export const NUMBER_MODE: Mode;
/** @type {Mode} */
export const C_NUMBER_MODE: Mode;
/** @type {Mode} */
export const BINARY_NUMBER_MODE: Mode;
/** @type {Mode} */
export const REGEXP_MODE: Mode;
/** @type {Mode} */
export const TITLE_MODE: Mode;
/** @type {Mode} */
export const UNDERSCORE_TITLE_MODE: Mode;
/** @type {Mode} */
export const METHOD_GUARD: Mode;
export function END_SAME_AS_BEGIN(mode: Mode): Mode;
export type Mode = import("./hljs_types.js").Mode;
export type ModeCallback = import("./hljs_types.js").ModeCallback;
