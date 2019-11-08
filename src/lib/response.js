export default class Response {
  constructor(mode) {
    if (mode.data === undefined)
      mode.data = {};
    this.data = mode.data;
  }

  ignoreMatch() {
    this.ignore = true;
  }
}
