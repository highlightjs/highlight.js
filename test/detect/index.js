'use strict';

let bluebird = require('bluebird');
let fs       = bluebird.promisifyAll(require('fs'));
let hljs     = require('../../build');
let path     = require('path');
let utility  = require('../utility');

function testAutoDetection(language) {
  const languagePath = utility.buildPath('detect', language);

  it(`should have test for ${language}`, function() {
    return fs.statAsync(languagePath)
      .then(path => path.isDirectory().should.be.true);
  });

  it(`should be detected as ${language}`, function() {
    return fs.readdirAsync(languagePath)
      .map(function(example) {
        const filename = path.join(languagePath, example);

        return fs.readFileAsync(filename, 'utf-8');
      })
      .each(function(content) {
        const expected = language,
              actual   = hljs.highlightAuto(content).language;

        actual.should.equal(expected);
      });
  });
}

describe('hljs.highlightAuto()', function() {
  const languages = hljs.listLanguages();

  languages.forEach(testAutoDetection);
});
