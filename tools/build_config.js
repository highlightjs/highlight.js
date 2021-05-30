const cjsPlugin = require('@rollup/plugin-commonjs');
const jsonPlugin = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

module.exports = {
  build_dir: "build",
  copyrightYears: `2006-${new Date().getFullYear()}`,
  clean_css: {
    level: 2
  },
  rollup: {
    node: {
      output: { format: "cjs", strict: false, exports: "auto" },
      input: {
        plugins: [
          cjsPlugin(),
          jsonPlugin(),
          nodeResolve(),
          {
            transform: (x) => {
              if (/var module/.exec(x)) {
                // remove shim that only breaks things for rollup
                return x.replace(/var module\s*=.*$/m, "");
              }
            }
          }
        ]
      }
    },
    browser_core: {
      input: {
        plugins: [
          jsonPlugin(),
          cjsPlugin(),
          nodeResolve()
        ]
      },
      output: {
        name: "hljs",
        format: "iife",
        footer: "if (typeof exports === 'object' && typeof module !== 'undefined') { module.exports = hljs; }",
        interop: false
      }
    },
    browser: {
      input: {
        plugins: []
      },
      output: {
        format: "es",
        interop: false
      }
    }
  },
  terser: {
    format: {
      max_line_len: 80,
      ascii_only: true
    },
    compress: {
      ecma: 2015,
      unsafe_arrows: true,
      passes: 2,
      unsafe: true,
      warnings: true,
      dead_code: true,
      toplevel: "funcs"
    }
  }
};
