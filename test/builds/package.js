/*
This file is used by import_via_commonjs.js to build a single "package"
and acts as a sanity check that all our code is "use strict" safe

See .travis.yml
*/

import hljs from '../../build/lib/index.js';

hljs.highlight("cpp","/* test */")
console.log("Rollup built package works.")
