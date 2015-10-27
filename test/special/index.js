'use strict';

var _       = require('lodash');
var fs      = require('fs');
var hljs    = require('../../build');
var jsdom   = require('jsdom').jsdom;
var utility = require('../utility');

describe('special cases tests', function() {
  before(function(done) {
    var filename = utility.buildPath('fixtures', 'index.html');

    fs.readFile(filename, 'utf-8', function(err, page) {
      var blocks;

      // Allows hljs to use document
      global.document = jsdom(page);

      // Setup hljs environment
      hljs.configure({ tabReplace: '    ' });
      hljs.initHighlighting();

      // Setup hljs for non-`<pre><code>` tests
      hljs.configure({ useBR: true });

      blocks = document.querySelectorAll('.code');
      _.each(blocks, hljs.highlightBlock);

      done(err);
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
