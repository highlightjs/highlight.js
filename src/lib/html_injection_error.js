export default class HTMLInjectionError extends Error {
  /**
   * @param {string} reason
   * @param {string} html
   */
  constructor(reason, html) {
    super(reason);
    this.name = "HTMLInjectionError";
    this.html = html;
  }
}
