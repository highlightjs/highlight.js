module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "mocha": true
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
    "parser": '@typescript-eslint/parser',
    "plugins": [
      "@typescript-eslint"
    ],
    "rules": {
      "array-callback-return": "error",
      "block-scoped-var": "error",
      // we like our semi-colons
      "semi": ["error","always"],
      // our codebase doesn't do this at all, so disabled for now
      "space-before-function-paren": ["error","never"],
      // for now ignore diff between types of quoting
      "quotes": "off",
      // this is the style we are already using
      "operator-linebreak": ["error","before", { "overrides": { "?": "after", ":": "after", "+": "after" } }],
      // sometimes we declare variables with extra spacing
      "indent": ["error", 2, {"VariableDeclarator":2}],
      // seems like a good idea not to use explicit undefined
      "no-undefined": "error",
      // ensure import specifier contains file extension
      "import/extensions": ["error", "always"],

      // TODO maybe
      "camelcase": "off", // TODO: turn on later
      "init-declarations": ["error","always"]
    },
    "overrides": [
      {
        "files": ["src/**/*.js"],
        "rules": {
          // make sure there is no Node.js specific API slipping into the source files
          "import/no-nodejs-modules": "error",
          "import/no-commonjs": "error",
        }
      },
      {
        "files": ["src/languages/*.js"],
        "rules": {
          "no-unused-expressions": "off",
          // languages are all over the map and we don't want to
          // do a mass edit so turn off the most egregious rule violations
          "indent": "off",
          "comma-dangle": "off",
          "array-bracket-spacing": "off",
          "object-curly-spacing": "off",
          "key-spacing": "off",
          "object-curly-newline": "off",
          "object-property-newline": "off"
        }
      }
    ]
};
