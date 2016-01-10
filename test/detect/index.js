'use strict';

let bluebird = require('bluebird');
let fs       = bluebird.promisifyAll(require('fs'));
let hljs     = require('../../build');
let path     = require('path');
let utility  = require('../utility');

function testAutoDetection(language) {
  let languagePath = utility.buildPath('detect', language);

  it(`should have test for ${language}`, function() {
    return fs.statAsync(languagePath)
      .then(path => path.isDirectory().should.be.true);
  });

  it(`should be detected as ${language}`, function() {
    return fs.readdirAsync(languagePath)
      .map(function(example) {
        let filename = path.join(languagePath, example);

        return fs.readFileAsync(filename, 'utf-8');
      })
      .each(function(content) {
        let expected = language,
            actual   = hljs.highlightAuto(content).language;

        actual.should.equal(expected);
      });
  });
}

describe('hljs.highlightAuto()', function() {
  let languages = hljs.listLanguages();

  languages.forEach(testAutoDetection);
});
