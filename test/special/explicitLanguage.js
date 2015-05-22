'use strict';

var fs      = require('fs');
var utility = require('../utility');

describe('explicit language class', function() {
  before(function() {
    var filename = utility.buildPath('expect', 'explicit.txt'),
        testHTML = document.querySelector('#explicit-language');

    this.expected = fs.readFileSync(filename, 'utf-8');
    this.blocks   = testHTML.querySelectorAll('.hljs');
  });

  it('should highlight block with language in code tag', function() {
    var actual = this.blocks[0].innerHTML;

    actual.should.equal(this.expected);
  });

  it('should highlight block with language in pre tag', function() {
    var actual = this.blocks[1].innerHTML;

    actual.should.equal(this.expected);
  });

  it('should highlight using html 5 style (language-*)', function() {
    var actual = this.blocks[2].innerHTML;

    actual.should.equal(this.expected);
  });

  it('should highlight with shortened prefix (lang-)', function() {
    var filename = utility.buildPath('expect', 'shortenedexplicit.txt'),

        expected = fs.readFileSync(filename, 'utf-8'),
        actual   = this.blocks[3].innerHTML;

    actual.should.equal(expected);
  });
});
