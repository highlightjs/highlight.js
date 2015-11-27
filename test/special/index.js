'use strict';

var _        = require('lodash');
var bluebird = require('bluebird');
var hljs     = require('../../build');
var jsdomEnv = bluebird.promisify(require('jsdom').env);
var readFile = bluebird.promisify(require('fs').readFile);
var utility  = require('../utility');

describe('special cases tests', function() {
  before(function() {
    var filename = utility.buildPath('fixtures', 'index.html');

    return readFile(filename, 'utf-8')
      .then(page => jsdomEnv(page))
      .then(window => {
        var blocks;

        // Allows hljs to use document
        global.document = window.document;

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
});
