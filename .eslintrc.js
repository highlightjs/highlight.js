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
      "semi": ["error","always"],
      "space-before-function-paren": ["error","never"],
      // "padded-blocks": "off",
      "quotes": "off",
      // "no-multi-spaces": "off",
      "one-var": "off",
      "operator-linebreak": ["error","after", { "overrides": { "?": "after", ":": "after" } }],
      "indent": ["error", 2, {"VariableDeclarator":2}],
      "no-undefined": "error",

      // TODO
      "camelcase": "off", // TODO: turn on later
      // "init-declarations": ["error","always"]
    }
};
