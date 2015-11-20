'use strict';

var bluebird = require('bluebird');
var fs       = bluebird.promisifyAll(require('fs'));
var hljs     = require('../../build');
var path     = require('path');
var utility  = require('../utility');

function testAutoDetection(language) {
  var languagePath = utility.buildPath('detect', language);

  it(`should have test for ${language}`, function() {
    return fs.statAsync(languagePath)
      .then(path => path.isDirectory().should.be.true);
  });

  it(`should be detected as ${language}`, function() {
    return fs.readdirAsync(languagePath)
      .map(function(example) {
        var filename = path.join(languagePath, example);

        return fs.readFileAsync(filename, 'utf-8');
      })
      .each(function(content) {
        var expected = language,
            actual   = hljs.highlightAuto(content).language;

        actual.should.equal(expected);
      });
  });
}

describe('hljs.highlightAuto()', function() {
  var languages = hljs.listLanguages();

  languages.forEach(testAutoDetection);
});
