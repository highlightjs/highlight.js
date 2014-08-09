'use strict';

var fs      = require('fs');
var hljs    = require('../build');
var utility = require('./utility');

function testAutoDetection(language) {
  it('should be detected as ' + language, function() {
    var filename     = language + '.txt',
        languagePath = utility.buildPath('language', filename),
        content      = fs.readFileSync(languagePath, 'utf-8'),

        expected = language,
        actual   = hljs.highlightAuto(content).language;

    actual.should.equal(expected);
  });
}

describe('hljs', function() {
  describe('.highlightAuto', function() {
    var languages = utility.languagesList();

    languages.forEach(testAutoDetection);
  });
});
