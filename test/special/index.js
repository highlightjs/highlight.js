'use strict';
const util = require('util');
const _ = require('lodash');
const hljs = require('../../build');
const {JSDOM} = require('jsdom');
const readFile = util.promisify(require('fs').readFile);
const utility = require('../utility');

describe('special cases tests', function () {
  before(async () => {
    const filename = utility.buildPath('fixtures', 'index.html');
    const page = await readFile(filename, 'utf-8');
    const { window } = new JSDOM(page);
    let blocks;

    // Allows hljs to use document
    global.document = window.document;

    // Special language to test endsWithParentVariants
    hljs.registerLanguage('nested', require('../fixtures/nested.js'));

    // Setup hljs environment
    hljs.configure({ tabReplace: '    ' });
    hljs.initHighlighting();

    // Setup hljs for non-`<pre><code>` tests
    hljs.configure({ useBR: true });

    blocks = document.querySelectorAll('.code');
    _.each(blocks, hljs.highlightBlock);
  });

  require('./explicitLanguage');
  require('./customMarkup');
  require('./languageAlias');
  require('./noHighlight');
  require('./subLanguages');
  require('./buildClassName');
  require('./useBr');
  require('./endsWithParentVariants')
});
