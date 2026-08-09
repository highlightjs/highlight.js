import globals from "globals";
import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import plugin_import from "eslint-plugin-import";
import typescript_parser from "@typescript-eslint/parser";

const browserAndNodeGlobals = {
  ...globals.browser,
  ...globals.node,
  ...globals.es6,
  should: "readonly",
  hljs: "readonly"
};

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
    // Grammars: parse + basic sanity only (legacy .eslintrc.lang.js intent).
    // Do not enforce style here — avoids mass grammar reformats.
    // ecmaVersion 2018 allows unicode property escapes used by some grammars.
    files: ["src/languages/**/*.js"],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es6
      }
    },
    rules: {
      "no-unused-vars": "off",
      "no-unused-expressions": "off",
      "no-control-regex": "off",
      "no-useless-escape": "off",
      "no-empty": "off",
      "no-cond-assign": "off",
      "no-misleading-character-class": "off"
    }
  },
  {
    files: ["demo/**/*.js"],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      globals: browserAndNodeGlobals
    }
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
      ecmaVersion: 2020,
      sourceType: "commonjs",
      globals: {
        ...globals.node
      }
    },
    rules: {
      camelcase: "off"
    }
  }
]

let my_config = {
  files: ["src/*.js", "src/lib/**/*.js"],
  languageOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    globals: browserAndNodeGlobals
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
  my_config,
  ...overrides
]
