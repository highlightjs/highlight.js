module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true
  },
  extends: [],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module"
  },
  // no rules, this file exists only to lint the grammars and check
  // that no ES2018 or newer syntax has crept in by accident
  rules: {}
};
