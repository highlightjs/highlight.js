module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "standard"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
      "array-callback-return": "error",
      "block-scoped-var": "error",
      // we like our semi-colons
      "semi": ["error","always"],
      // our codebase doesn't do this at all, so disabled for now
      "space-before-function-paren": ["error","never"],
      // for now ignore diff between types of quoting
      "quotes": "off",
      // "no-multi-spaces": "off",
      "one-var": "off",
      // this is the style we are already using
      "operator-linebreak": ["error","after", { "overrides": { "?": "after", ":": "after" } }],
      // sometimes we declare variables with extra spacing
      "indent": ["error", 2, {"VariableDeclarator":2}],
      // seems like a good idea not to use explicit undefined
      "no-undefined": "error",

      // TODO maybe
      "camelcase": "off", // TODO: turn on later
      // "init-declarations": ["error","always"]
    }
};
