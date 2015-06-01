'use strict';

var _       = require('lodash');
var fs      = require('fs');
var utility = require('../utility');

describe('custom markup', function() {
  before(function() {
    var testHTML = document.querySelectorAll('#custom-markup .hljs'),
        getHTML  = _.property('innerHTML');

    this.blocks = _.map(testHTML, getHTML);
  });

  it('should replace tabs', function() {
    var filename = utility.buildPath('expect', 'tabreplace.txt'),

        expected = fs.readFileSync(filename, 'utf-8'),
        actual   = this.blocks[0];

    actual.should.equal(expected);
  });

  it('should keep custom markup', function() {
    var filename = utility.buildPath('expect', 'custommarkup.txt'),

        expected = fs.readFileSync(filename, 'utf-8'),
        actual   = this.blocks[1];

    actual.should.equal(expected);
  });

  it('should keep custom markup and replace tabs', function() {
    var filename = utility.buildPath('expect', 'customtabreplace.txt'),

        expected = fs.readFileSync(filename, 'utf-8'),
        actual   = this.blocks[2];

    actual.should.equal(expected);
  });

  it('should keep the same amount of void elements (<br>, <hr>, ...)', function() {
    var filename = utility.buildPath('expect', 'brInPre.txt'),

        expected = fs.readFileSync(filename, 'utf-8'),
        actual   = this.blocks[3];

    actual.should.equal(expected);
  });
});
