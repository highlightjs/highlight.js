'use strict';

var utility = require('../utility');

describe('explicit language class', function() {
  before(function(done) {
    var filename = utility.buildPath('expect', 'explicit1.txt'),
        testHTML = document.querySelectorAll('#explicit-language .hljs');

    utility.setupFile(filename, 'utf-8', this, testHTML, done);
  });

  it('should highlight block with language in code tag', function() {
    var actual = this.blocks[0];

    actual.should.equal(this.expected);
  });

  it('should highlight block with language in pre tag', function() {
    var actual = this.blocks[1];

    actual.should.equal(this.expected);
  });

  it('should highlight using html 5 style (language-*)', function() {
    var actual = this.blocks[2];

    actual.should.equal(this.expected);
  });

  it('should highlight with shortened prefix (lang-)', function(done) {
    var filename = utility.buildPath('expect', 'explicit2.txt'),
        actual   = this.blocks[3];

    utility.expectedFile(filename, 'utf-8', actual, done);
  });

  it('should highlight if classname contains uppercase symbols', function(done) {
    var filename = utility.buildPath('expect', 'explicit2.txt'),
      actual     = this.blocks[4];

    utility.expectedFile(filename, 'utf-8', actual, done);
  });
});
