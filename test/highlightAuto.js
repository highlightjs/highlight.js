'use strict';

var fs      = require('fs');
var hljs    = require('../build');
var path    = require('path');
var utility = require('./utility');

function testAutoDetection(language) {
  var languagePath = utility.buildPath('detect', language);

  it('should have test for ' + language, function() {
    var testExistence = fs.existsSync(languagePath);

    testExistence.should.be.true;
  });

  it('should be detected as ' + language, function() {
    var examples = fs.readdirSync(languagePath);

    examples.forEach(function(example) {
      var filename = path.join(languagePath, example),
          content  = fs.readFileSync(filename, 'utf-8'),

          expected = language,
          actual   = hljs.highlightAuto(content).language;

      actual.should.equal(expected);
    });
  });
}

describe('hljs', function() {
  describe('.highlightAuto', function() {
    var languages = hljs.listLanguages();

    languages.forEach(testAutoDetection);
  });
});
