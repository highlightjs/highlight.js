/*
This file is used by import_via_commonjs.js to build a single "package"
and acts as a sanity check that all our code is "use strict" safe

See .travis.yml
*/

import hljs from '../../build/lib/index.js';
import { HighlightJS } from '../../build/lib/index.js'

const language = "cpp";
hljs.highlight("/* test */", {language});
HighlightJS.highlight("/* test */", {language});
console.log("Rollup built package works.");
