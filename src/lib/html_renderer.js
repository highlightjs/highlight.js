import { escapeHTML } from './utils';

const SPAN_CLOSE = '</span>';
const emitsWrappingTags = (node) => {
  return !!node.kind;
};

export default class HTMLRenderer {
  constructor(tree, options) {
    this.buffer = "";
    this.classPrefix = options.classPrefix;
    tree.walk(this);
  }

  // renderer API

  addText(text) {
    this.buffer += escapeHTML(text);
  }

  openNode(node) {
    if (!emitsWrappingTags(node)) return;

    let className = node.kind;
    if (!node.sublanguage) {
      className = `${this.classPrefix}${className}`;
    }
    this.span(className);
  }

  closeNode(node) {
    if (!emitsWrappingTags(node)) return;

    this.buffer += SPAN_CLOSE;
  }

  // helpers

  span(className) {
    this.buffer += `<span class="${className}">`;
  }

  value() {
    return this.buffer;
  }
}
