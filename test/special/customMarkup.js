'use strict';

var fs      = require('fs');
var utility = require('../utility');

var blocks;

describe('custom markup', function() {
  before(function() {
    blocks = document.querySelectorAll('.hljs');
  });

  it('should replace tabs', function() {
    var filename  = utility.buildPath('expect', 'tabreplace.txt'),

        expected = fs.readFileSync(filename, 'utf-8'),
        actual   = blocks[4].innerHTML;

    actual.should.equal(expected);
  });

  it('should keep custim markup', function() {
    var filename  = utility.buildPath('expect', 'custommarkup.txt'),

        expected = fs.readFileSync(filename, 'utf-8'),
        actual   = blocks[5].innerHTML;

    actual.should.equal(expected);
  });

  it('should keep custom markup and replace tabs', function() {
    var filename  = utility.buildPath('expect', 'customtabreplace.txt'),

        expected = fs.readFileSync(filename, 'utf-8'),
        actual   = blocks[6].innerHTML;

    actual.should.equal(expected);
  });
});
