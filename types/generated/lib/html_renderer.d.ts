/** @type {Renderer} */
export default class HTMLRenderer {
    /**
     * Creates a new HTMLRenderer
     *
     * @param {Tree} parseTree - the parse tree (must support `walk` API)
     * @param {{classPrefix: string}} options
     */
    constructor(parseTree: Tree, options: {
        classPrefix: string;
    });
    buffer: string;
    classPrefix: string;
    /**
     * Adds texts to the output stream
     *
     * @param {string} text */
    addText(text: string): void;
    /**
     * Adds a node open to the output stream (if needed)
     *
     * @param {Node} node */
    openNode(node: Node): void;
    /**
     * Adds a node close to the output stream (if needed)
     *
     * @param {Node} node */
    closeNode(node: Node): void;
    /**
     * returns the accumulated buffer
    */
    value(): string;
    /**
     * Builds a span element
     *
     * @param {string} className */
    span(className: string): void;
}
export type Renderer = {
    addText: (text: string) => void;
    openNode: (node: Node) => void;
    closeNode: (node: Node) => void;
    value: () => string;
};
export type Node = {
    scope?: string;
    language?: string;
    sublanguage?: boolean;
};
export type Tree = {
    walk: (r: Renderer) => void;
};
