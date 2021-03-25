module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "standard"
  ],
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module"
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    "no-var": "warn",
    "init-declarations": ["error", "always"],
    "array-callback-return": "error",
    "block-scoped-var": "error",
    "no-multiple-empty-lines": ["error", { max: 2 }],
    // we like our semi-colons
    semi: ["error", "always"],
    // our codebase doesn't do this at all, so disabled for now
    "space-before-function-paren": ["error", "never"],
    // for now ignore diff between types of quoting
    quotes: "off",
    // this is the style we are already using
    "operator-linebreak": ["error", "before", { overrides: {
      "=": "after",
      "+": "after"
    }
    }],
    // sometimes we declare variables with extra spacing
    indent: ["error", 2, { VariableDeclarator: 2 }],
    // seems like a good idea not to use explicit undefined
    "no-undefined": "error",
    // ensure import specifier contains file extension
    "import/extensions": ["error", "always"]
  },
  overrides: [
    {
      files: ["src/**/*.js"],
      rules: {
        // make sure there is no Node.js specific API slipping into the source files
        "import/no-nodejs-modules": "error",
        "import/no-commonjs": "error"
      }
    },
    {
      files: ["src/languages/*.js"],
      rules: {
        "no-unused-expressions": "off",
        // languages are all over the map and we don't want to
        // do a mass edit so turn off the most egregious rule violations
        // indent: "off",
        camelcase: "off",
        "no-control-regex": "off",
        "no-useless-escape": "off",
        "comma-dangle": "warn",
        "array-bracket-spacing": ["error", "always"
          // {
          //   objectsInArrays: true
          // }
        ],
        // "object-curly-spacing": "warn",
        // "key-spacing": "off",
        // "array-bracket-spacing": ["warn"],
        "array-bracket-newline": ["warn", {
          multiline: true,
          minItems: 2
        }],
        "array-element-newline": "warn",
        "object-curly-newline": [1, {
          minProperties: 1
        }],
        "object-property-newline": [2,
          { allowAllPropertiesOnSameLine: false }
        ]
      }
    },
    {
      files: ["demo/**/*.js"],
      globals: {
        hljs: "readonly"
      }
    },
    {
      files: ["test/**/*.js"],
      globals: {
        should: "readonly"
      },
      env: {
        mocha: true
      },
      parserOptions: {
        ecmaVersion: 2018
      }
    },
    {
      files: ["tools/**/*.js"],
      parserOptions: {
        ecmaVersion: 2018
      },
      rules: {
        camelcase: "off"
      }
    }
  ]
};
