/**
@typedef {import('./hljs_types.js').Mode} Mode
@typedef {import('./hljs_types.js').CompiledMode} CompiledMode
@typedef {import('./hljs_types.js').Language} Language
@typedef {import('./hljs_types.js').HLJSPlugin} HLJSPlugin
@typedef {import('./hljs_types.js').CompiledLanguage} CompiledLanguage
*/
/**
 * Compiles a language definition result
 *
 * Given the raw result of a language definition (Language), compiles this so
 * that it is ready for highlighting code.
 * @param {Language} language
 * @returns {CompiledLanguage}
 */
export function compileLanguage(language: Language): CompiledLanguage;
export type Mode = import("./hljs_types.js").Mode;
export type CompiledMode = import("./hljs_types.js").CompiledMode;
export type Language = import("./hljs_types.js").Language;
export type HLJSPlugin = import("./hljs_types.js").HLJSPlugin;
export type CompiledLanguage = import("./hljs_types.js").CompiledLanguage;
