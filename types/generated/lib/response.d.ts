/** @typedef {import('./hljs_types.js').CallbackResponse} CallbackResponse */
/** @typedef {import('./hljs_types.js').CompiledMode} CompiledMode */
/** @implements CallbackResponse */
export default class Response implements CallbackResponse {
    /**
     * @param {CompiledMode} mode
     */
    constructor(mode: CompiledMode);
    data: Record<string, any>;
    isMatchIgnored: boolean;
    ignoreMatch(): void;
}
export type CallbackResponse = import("./hljs_types.js").CallbackResponse;
export type CompiledMode = import("./hljs_types.js").CompiledMode;
