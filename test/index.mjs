'use strict';

import { hljs } from "../build/lib/all.js";
hljs.debugMode(); // tests run in debug mode so errors are raised

// Tests specific to the API exposed inside the hljs object.
// Right now, that only includes tests for several common regular expressions.
import './api/index.mjs';

// Test weird bugs we've fixed over time
import "./parser/index.mjs";

// Tests for auto detection of languages via `highlightAuto`.
// import './detect/index.mjs';

// HTML markup tests for particular languages. Usually when there is an
// incorrect highlighting of one language, once the bug get fixed, the
// expected markup will be added into the `test/markup` folder to keep
// theses highlighting errors from cropping up again.
import './markup/index.mjs';

// check regex for fatal issues like exponential backtracking, etc
import './regex/index.mjs';

// Tests meant for the browser only. Using the `test/fixtures/index.html` file
// along with `jsdom` these tests check for things like: custom markup already
// existing in the code being highlighted, blocks that disable highlighting,
// and several other cases. Do note that the `test/fixtures/index.html` file
// isn't actually used to test inside a browser but `jsdom` acts as a virtual
// browser inside of node.js and runs together with all the other tests.
import './special/index.mjs';
