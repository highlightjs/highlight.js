import globals from "globals";
import js from "@eslint/js";
import standard from "eslint-config-standard";
import typescript from "@typescript-eslint/eslint-plugin";
import plugin_import from "eslint-plugin-import";
import typescript_parser from "@typescript-eslint/parser";

let overrides = [
  {
    files: ["types/*.ts", "src/*.ts"],
    languageOptions: {
      parser: typescript_parser,
    },
    plugins: {
      import: plugin_import
    },
    rules: {
      "import/no-duplicates": "off",
      "import/extensions": "off"
    }
  },
  {
    files: ["src/**/*.js"],
    plugins: {
      import: plugin_import
    },
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
      "comma-dangle": "off",
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
        minProperties: 2
      }],
      "object-property-newline": [2,
        { allowAllPropertiesOnSameLine: false }
      ]
    }
  },
  {
    files: ["demo/**/*.js"],
  },
  {
    files: ["test/**/*.js"],
    languageOptions: {
      ecmaVersion: 2018,
      globals: {
        ...globals.mocha
      }
    },
  },
  {
    files: ["tools/**/*.js"],
    ignores: ["tools/vendor/*.js"],
    languageOptions: {
      ecmaVersion: 2020
    },
    rules: {
      camelcase: "off"
    }
  }
]

let my_config =  {
  files: ["src/*.js"],
  languageOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.es6,
      should: "readonly",
      hljs: "readonly"
    }
  },
  plugins: {
    typescript: typescript
  },
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
    "operator-linebreak": ["error", "before", {
      overrides: {
        "=": "after"
      }
    }],
    // sometimes we declare variables with extra spacing
    indent: ["error", 2, { VariableDeclarator: 2 }],
    // seems like a good idea not to use explicit undefined
    "no-undefined": "error",
    // ensure import specifier contains file extension
    "import/extensions": ["error", "always"]
  },
};


export default [
  js.configs.recommended,
  // standard,
  my_config,
  ...overrides
]
