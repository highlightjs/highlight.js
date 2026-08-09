export default highlight;
export type Mode = import("./lib/hljs_types.js").Mode;
export type CompiledMode = import("./lib/hljs_types.js").CompiledMode;
export type CompiledScope = import("./lib/hljs_types.js").CompiledScope;
export type Language = import("./lib/hljs_types.js").Language;
export type HLJSApi = import("./lib/hljs_types.js").HLJSApi;
export type HLJSPlugin = import("./lib/hljs_types.js").HLJSPlugin;
export type PluginEvent = import("./lib/hljs_types.js").PluginEvent;
export type HLJSOptions = import("./lib/hljs_types.js").HLJSOptions;
export type LanguageFn = import("./lib/hljs_types.js").LanguageFn;
export type HighlightedHTMLElement = import("./lib/hljs_types.js").HighlightedHTMLElement;
export type BeforeHighlightContext = import("./lib/hljs_types.js").BeforeHighlightContext;
export type AutoHighlightResult = import("./lib/hljs_types.js").AutoHighlightResult;
export type HighlightOptions = import("./lib/hljs_types.js").HighlightOptions;
export type HighlightResult = import("./lib/hljs_types.js").HighlightResult;
/** @type {HLJSApi} */
declare const highlight: HLJSApi;
