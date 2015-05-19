'use strict';

var fs      = require('fs');
var utility = require('../utility');

var blocks;

describe('custom markup', function() {
  before(function() {
    var testHTML = document.querySelector('#custom-markup');

    blocks = testHTML.querySelectorAll('.hljs');
  });

  it('should replace tabs', function() {
    var filename = utility.buildPath('expect', 'tabreplace.txt'),

        expected = fs.readFileSync(filename, 'utf-8'),
        actual   = blocks[0].innerHTML;

    actual.should.equal(expected);
  });

  it('should keep custom markup', function() {
    var filename = utility.buildPath('expect', 'custommarkup.txt'),

        expected = fs.readFileSync(filename, 'utf-8'),
        actual   = blocks[1].innerHTML;

    actual.should.equal(expected);
  });

  it('should keep custom markup and replace tabs', function() {
    var filename = utility.buildPath('expect', 'customtabreplace.txt'),

        expected = fs.readFileSync(filename, 'utf-8'),
        actual   = blocks[2].innerHTML;

    actual.should.equal(expected);
  });

  it('should keep the same amount of void elements (<br>, <hr>, ...)', function() {
    var filename = utility.buildPath('expect', 'brInPre.txt'),

        expected = fs.readFileSync(filename, 'utf-8'),
        actual   = blocks[3].innerHTML;

    actual.should.equal(expected);
  });
});
