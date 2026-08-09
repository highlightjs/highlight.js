/**
 * Given raw keywords from a language definition, compile them.
 *
 * @param {string | Record<string,string|string[]> | Array<string>} rawKeywords
 * @param {boolean} caseInsensitive
 */
export function compileKeywords(rawKeywords: string | Record<string, string | string[]> | Array<string>, caseInsensitive: boolean, scopeName?: string): import("./hljs_types.js").KeywordDict;
