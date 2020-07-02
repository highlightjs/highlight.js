const cjsPlugin = require('rollup-plugin-commonjs');
const jsonPlugin = require('rollup-plugin-json');

module.exports = {
    build_dir: "build",
    copyrightYears: "2006-2020",
    clean_css: {},
    rollup: {
      node: {
        output: { format: "cjs", strict: false },
        input : {
          plugins: [
            cjsPlugin(),
            jsonPlugin(),
            {
              transform: (x) => {
                if (/var module/.exec(x)) {
                  // remove shim that only breaks things for rollup
                  return x.replace(/var module\s*=.*$/m,"")
                }
              }
            }
          ],
        },
      },
      browser_core: {
        input: {
          plugins: [jsonPlugin()]
        },
        output: {
          name: "hljs",
          format: "iife",
          footer: "if (typeof exports === 'object' && typeof module !== 'undefined') { module.exports = hljs; }",
          interop: false,
        }
      },
      browser: {
        input: {
          plugins: [
            cjsPlugin(),
            jsonPlugin()
          ]
        },
        output: {
          format: "iife",
          outro: "return module.exports.definer || module.exports;",
          interop: false,
        }
      }
    },
    terser: {
        "compress": {
          passes: 2,
          unsafe: true,
          warnings: true,
          dead_code: true,
          toplevel: "funcs"
        }
    }
}
