'use strict';

var _       = require('lodash');
var fs      = require('fs');
var utility = require('../utility');

var handleFile = utility.handleExpectedFile;

describe('custom markup', function() {
  before(function() {
    var testHTML = document.querySelectorAll('#custom-markup .hljs');

    this.blocks = _.map(testHTML, 'innerHTML');
  });

  it('should replace tabs', function(done) {
    var filename = utility.buildPath('expect', 'tabreplace.txt'),
        actual   = this.blocks[0];

    fs.readFile(filename, 'utf-8', handleFile(actual, done));
  });

  it('should keep custom markup', function(done) {
    var filename = utility.buildPath('expect', 'custommarkup.txt'),
        actual   = this.blocks[1];

    fs.readFile(filename, 'utf-8', handleFile(actual, done));
  });

  it('should keep custom markup and replace tabs', function(done) {
    var filename = utility.buildPath('expect', 'customtabreplace.txt'),
        actual   = this.blocks[2];

    fs.readFile(filename, 'utf-8', handleFile(actual, done));
  });

  it('should keep the same amount of void elements (<br>, <hr>, ...)', function(done) {
    var filename = utility.buildPath('expect', 'brInPre.txt'),
        actual   = this.blocks[3];

    fs.readFile(filename, 'utf-8', handleFile(actual, done));
  });
});
