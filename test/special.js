'use strict';

var fs      = require('fs');
var hljs    = require('../build');
var jsdom   = require('jsdom').jsdom;
var utility = require('./utility');

var filename = utility.buildPath('index.html'),
    page     = fs.readFileSync(filename, 'utf-8');

// Allows hljs to use document
global.document = jsdom(page);

// Setup hljs environment
var blocks = document.querySelectorAll('pre code');

hljs.configure({ tabReplace: '    ' });
[].forEach.call(blocks, hljs.highlightBlock);

describe('special cases test', function() {
  require('./special/explicitLanguage');
  require('./special/customMarkup');
  require('./special/languageAlias');
  require('./special/noHighlight');
});
