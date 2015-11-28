'use strict';

var utility = require('../utility');

describe('explicit language class', function() {
  before(function() {
    var filename = utility.buildPath('fixtures', 'expect', 'explicit1.txt'),
        testHTML = document.querySelectorAll('#explicit-language .hljs');

    return utility.setupFile(filename, 'utf-8', this, testHTML);
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

  it('should highlight with shortened prefix (lang-)', function() {
    var filename = utility.buildPath('fixtures', 'expect', 'explicit2.txt'),
        actual   = this.blocks[3];

    return utility.expectedFile(filename, 'utf-8', actual);
  });

  it('should highlight if classname contains uppercase symbols', function() {
    var filename = utility.buildPath('fixtures', 'expect', 'explicit2.txt'),
      actual     = this.blocks[4];

    return utility.expectedFile(filename, 'utf-8', actual);
  });
});
