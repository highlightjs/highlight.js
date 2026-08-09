/**
 * @param {string} value
 * @returns {RegExp}
 * */
export function escape(value: string): RegExp;
/**
 * @param {RegExp | string } re
 * @returns {string | null}
 */
export function source(re: RegExp | string): string | null;
/**
 * @param {RegExp | string } re
 * @returns {string}
 */
export function lookahead(re: RegExp | string): string;
/**
 * @param {RegExp | string } re
 * @returns {string}
 */
export function anyNumberOfTimes(re: RegExp | string): string;
/**
 * @param {RegExp | string } re
 * @returns {string}
 */
export function optional(re: RegExp | string): string;
/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */
export function concat(...args: (RegExp | string)[]): string;
/** @typedef { {capture?: boolean} } RegexEitherOptions */
/**
 * Any of the passed expresssions may match
 *
 * Creates a huge this | this | that | that match
 * @param {(RegExp | string)[] | [...(RegExp | string)[], RegexEitherOptions]} args
 * @returns {string}
 */
export function either(...args: (RegExp | string)[] | [...(RegExp | string)[], RegexEitherOptions]): string;
/**
 * @param {RegExp | string} re
 * @returns {number}
 */
export function countMatchGroups(re: RegExp | string): number;
/**
 * Does lexeme start with a regular expression match at the beginning
 * @param {RegExp} re
 * @param {string} lexeme
 * @returns {boolean | null}
 */
export function startsWith(re: RegExp, lexeme: string): boolean | null;
/**
 * @param {(string | RegExp)[]} regexps
 * @param {{joinWith: string}} opts
 * @returns {string}
 */
export function _rewriteBackreferences(regexps: (string | RegExp)[], { joinWith }: {
    joinWith: string;
}): string;
export type RegexEitherOptions = {
    capture?: boolean;
};
