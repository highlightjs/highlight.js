import { escapeHTML } from './utils';

/**
 * @typedef {object} Renderer
 * @property {(text: string) => void} addText
 * @property {(node: Node) => void} openNode
 * @property {(node: Node) => void} closeNode
 * @property {() => string} value
 */

/** @typedef {{kind?: string, sublanguage?: boolean}} Node */
/** @typedef {{walk: (r: Renderer) => void}} Tree */
/** */

const SPAN_CLOSE = '</span>';
/** @param {Node} node */
const emitsWrappingTags = (node) => {
  return !!node.kind;
};

/** @type {Renderer} */
export default class HTMLRenderer {
  /**
   *
   * @param {Tree} tree
   * @param {{classPrefix: string}} options
   */
  constructor(tree, options) {
    this.buffer = "";
    this.classPrefix = options.classPrefix;
    tree.walk(this);
  }

  // renderer API

  /** @param {string} text */
  addText(text) {
    this.buffer += escapeHTML(text);
  }

  /** @param {Node} node */
  openNode(node) {
    if (!emitsWrappingTags(node)) return;

    let className = node.kind;
    if (!node.sublanguage) {
      className = `${this.classPrefix}${className}`;
    }
    this.span(className);
  }

  /** @param {Node} node */
  closeNode(node) {
    if (!emitsWrappingTags(node)) return;

    this.buffer += SPAN_CLOSE;
  }

  // helpers

  /** @param {string} className */
  span(className) {
    this.buffer += `<span class="${className}">`;
  }

  value() {
    return this.buffer;
  }
}
