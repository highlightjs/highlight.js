'use strict';

import hljs from "../../build/es/index.js";
hljs.debugMode(); // tests run in debug mode so errors are raised

import { JSDOM } from "jsdom";
import { readFile } from "fs/promises";
import * as utility from '../utility.js';

import explicitLanguage from "./explicitLanguage.mjs";
import languageAlias from "./languageAlias.mjs";
import buildClassName from "./buildClassName.mjs";
import noHighlight from "./noHighlight.mjs";
import subLanguages from "./subLanguages.mjs";
import endsWithParentVariants from "./endsWithParentVariants.mjs";

import nested from "../fixtures/nested.mjs";

describe('special cases tests', function() {
  before(async () => {
    const filename = utility.buildPath('fixtures', 'index.html');
    const page = await readFile(filename, 'utf-8');
    const { window } = await new JSDOM(page);

    // Allows hljs to use document
    global.document = window.document;

    // Special language to test endsWithParentVariants
    hljs.registerLanguage('nested', nested);

    // Setup hljs environment
    hljs.configure({ tabReplace: '    ' });
    let blocks = document.querySelectorAll('pre code');
    blocks.forEach(hljs.highlightElement);

    // Setup hljs for non-`<pre><code>` tests
    hljs.configure();

    blocks = document.querySelectorAll('.code');
    blocks.forEach(hljs.highlightElement);
  });

  describe('explicit language class', explicitLanguage.bind(this));
  describe('language alias', languageAlias.bind(this));
  describe('block class names', buildClassName.bind(this));
  describe('no highlighting', noHighlight.bind(this));
  describe('sublanguages', subLanguages.bind(this));
  describe('ends with parent variants', endsWithParentVariants.bind(this));
});
