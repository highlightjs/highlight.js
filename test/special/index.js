'use strict';

const hljs     = require('../../build');
hljs.debugMode(); // tests run in debug mode so errors are raised

const { JSDOM } = require('jsdom');
const { readFile } = require('fs').promises;
const utility  = require('../utility');

describe('special cases tests', () => {
  before(async () => {
    const filename = utility.buildPath('fixtures', 'index.html');
    const page = await readFile(filename, 'utf-8');
    const { window } = await new JSDOM(page);

    // Allows hljs to use document
    global.document = window.document;

    // Special language to test endsWithParentVariants
    hljs.registerLanguage('nested', require('../fixtures/nested.js'));

    // Setup hljs environment
    hljs.configure({ tabReplace: '    ' });
    let blocks = document.querySelectorAll('pre code');
    blocks.forEach(hljs.highlightElement);

    // Setup hljs for non-`<pre><code>` tests
    hljs.configure();

    blocks = document.querySelectorAll('.code');
    blocks.forEach(hljs.highlightElement);
  });

  require('./explicitLanguage');
  require('./languageAlias');
  require('./noHighlight');
  require('./subLanguages');
  require('./buildClassName');
  require('./endsWithParentVariants')
});
