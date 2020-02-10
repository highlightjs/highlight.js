const cjsPlugin = require('rollup-plugin-commonjs');

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
      browser: {
        input: {
          plugins: [
            cjsPlugin()
          ]
        },
        output: {
          format: "iife",
          outro: "return module.exports.definer || module.exports;",
          strict: false,
          compact: false,
          interop: false,
          extend: false,
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
