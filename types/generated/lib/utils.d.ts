/**
 * @param {string} value
 * @returns {string}
 */
export function escapeHTML(value: string): string;
/**
 * performs a shallow merge of multiple objects into one
 *
 * @template T
 * @param {T} original
 * @param {Record<string,any>[]} objects
 * @returns {T} a single new object
 */
export function inherit<T>(original: T, ...objects: Record<string, any>[]): T;
