import HTMLRenderer from './html_renderer';

class TokenTree {
  constructor() {
    this.rootNode = { children: [] };
    this.stack = [this.rootNode];
  }

  get top() {
    return this.stack[this.stack.length - 1];
  }

  get root() { return this.rootNode; }

  add(node) {
    this.top.children.push(node);
  }

  openNode(kind) {
    const node = { kind, children: [] };
    this.add(node);
    this.stack.push(node);
  }

  closeNode() {
    if (this.stack.length > 1) {
      return this.stack.pop();
    }
  }

  closeAllNodes() {
    while (this.closeNode());
  }

  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }

  walk(builder) {
    return this.constructor._walk(builder, this.rootNode);
  }

  static _walk(builder, node) {
    if (typeof node === "string") {
      builder.addText(node);
    } else if (node.children) {
      builder.openNode(node);
      node.children.forEach((child) => this._walk(builder, child));
      builder.closeNode(node);
    }
    return builder;
  }

  static _collapse(node) {
    if (!node.children) {
      return;
    }
    if (node.children.every(el => typeof el === "string")) {
      node.text = node.children.join("");
      delete node.children;
    } else {
      node.children.forEach((child) => {
        if (typeof child === "string") return;
        TokenTree._collapse(child);
      });
    }
  }
}

/**
  Currently this is all private API, but this is the minimal API necessary
  that an Emitter must implement to fully support the parser.

  Minimal interface:

  - addKeyword(text, kind)
  - addText(text)
  - addSublanguage(emitter, subLanguageName)
  - finalize()
  - openNode(kind)
  - closeNode()
  - closeAllNodes()
  - toHTML()

*/
export default class TokenTreeEmitter extends TokenTree {
  constructor(options) {
    super();
    this.options = options;
  }

  addKeyword(text, kind) {
    if (text === "") { return; }

    this.openNode(kind);
    this.addText(text);
    this.closeNode();
  }

  addText(text) {
    if (text === "") { return; }

    this.add(text);
  }

  addSublanguage(emitter, name) {
    const node = emitter.root;
    node.kind = name;
    node.sublanguage = true;
    this.add(node);
  }

  toHTML() {
    const renderer = new HTMLRenderer(this, this.options);
    return renderer.value();
  }

  finalize() {
    return true;
  }
}
