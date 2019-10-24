export default class TokenTree {
  constructor() {
    this.rootNode = { children: [] };
    this.stack = [ this.rootNode ];
  }

  get top() {
    return this.stack[this.stack.length - 1];
  }

  add(node) {
    this.top.children.push(node);
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

  addSublanguage({rootNode}, name) {
    let node = rootNode;
    node.kind = name;
    node.sublanguage = true;
    this.add(node);
  }

  openNode(kind) {
    var node = { kind, children: [] };
    this.add(node);
    this.stack.push(node);
  }

  closeNode() {
    if (this.stack.length > 1)
      return this.stack.pop();
  }

  closeAllNodes() {
    while (this.closeNode());
  }

  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }

  finalize() {
    return;
  }

  walk(builder) {
    return TokenTree._walk(builder, this.rootNode);
  }

  static _walk(builder, node) {
    if (typeof node === "string") {
      builder.addText(node);
    } else if (node.children) {
      builder.openNode(node);
      node.children.forEach((child) => this._walk(builder, child))
      builder.closeNode(node);
    }
    return builder;
  }

  static _collapse(node) {
    if (!node.children) {
      return
    }
    if (node.children.every(el => typeof el === "string")) {
      node.text = node.children.join("")
      delete node["children"]
    } else {
      node.children.forEach((child) => {
        if (typeof child === "string") return;
        TokenTree._collapse(child)
      })
    }
  }
}
