/**
  Currently this is all private API, but this is the minimal API necessary
  that an Emitter must implement to fully support the parser.

  Minimal interface:

  - addText(text)
  - __addSublanguage(emitter, subLanguageName)
  - startScope(scope)
  - endScope()
  - finalize()
  - toHTML()

*/
/**
 * @implements {Emitter}
 */
export default class TokenTreeEmitter extends TokenTree implements Emitter {
    /**
     * @param {*} options
     */
    constructor(options: any);
    options: any;
    /**
     * @param {string} text
     */
    addText(text: string): void;
    /** @param {string} scope */
    startScope(scope: string): void;
    endScope(): void;
    /**
     * @param {Emitter & {root: DataNode}} emitter
     * @param {string} name
     */
    __addSublanguage(emitter: Emitter & {
        root: DataNode;
    }, name: string): void;
    toHTML(): string;
    finalize(): boolean;
}
export type Node = {
    scope?: string;
    language?: string;
    children: Node[];
} | string;
export type DataNode = {
    scope?: string;
    language?: string;
    children: Node[];
};
export type Emitter = import("./hljs_types.js").Emitter;
declare class TokenTree {
    /**
     * @param {Renderer} builder
     * @param {Node} node
     */
    static _walk(builder: import("./html_renderer.js").Renderer, node: Node): import("./html_renderer.js").Renderer;
    /**
     * @param {Node} node
     */
    static _collapse(node: Node): void;
    /** @type DataNode */
    rootNode: DataNode;
    stack: DataNode[];
    get top(): DataNode;
    get root(): DataNode;
    /** @param {Node} node */
    add(node: Node): void;
    /** @param {string} scope */
    openNode(scope: string): void;
    closeNode(): DataNode;
    closeAllNodes(): void;
    toJSON(): string;
    /**
     * @typedef { import("./html_renderer").Renderer } Renderer
     * @param {Renderer} builder
     */
    walk(builder: import("./html_renderer.js").Renderer): import("./html_renderer.js").Renderer;
}
export {};
