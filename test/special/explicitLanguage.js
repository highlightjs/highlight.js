'use strict';

var fs      = require('fs');
var utility = require('../utility');

var blocks, expected;

describe('explicit language class', function() {
  before(function() {
    var filename = utility.buildPath('expect', 'explicit.txt');

    expected = fs.readFileSync(filename, 'utf-8');
    blocks   = document.querySelectorAll('.hljs');
  });

  it('should highlight block with language in code tag', function() {
    var actual = blocks[0].innerHTML;

    actual.should.equal(expected);
  });

  it('should highlight block with language in pre tag', function() {
    var actual = blocks[1].innerHTML;

    actual.should.equal(expected);
  });

  it('should highlight using html 5 style (language-*)', function() {
    var actual = blocks[2].innerHTML;

    actual.should.equal(expected);
  });

  it('should highlight with shortened prefix (lang-)', function() {
    var filename  = utility.buildPath('expect', 'shortenedexplicit.txt'),

        expected = fs.readFileSync(filename, 'utf-8'),
        actual   = blocks[3].innerHTML;

    actual.should.equal(expected);
  });
});
