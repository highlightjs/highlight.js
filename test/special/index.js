'use strict';

let _        = require('lodash');
let bluebird = require('bluebird');
let hljs     = require('../../build');
let jsdomEnv = bluebird.promisify(require('jsdom').env);
let readFile = bluebird.promisify(require('fs').readFile);
let utility  = require('../utility');

describe('special cases tests', function() {
  before(function() {
    const filename = utility.buildPath('fixtures', 'index.html');

    return readFile(filename, 'utf-8')
      .then(page => jsdomEnv(page))
      .then(window => {
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
