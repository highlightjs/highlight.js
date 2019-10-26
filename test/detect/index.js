'use strict';

let fs       = require('fs').promises

delete require.cache[require.resolve('../../build')]
delete require.cache[require.resolve('../../build/lib/highlight')]


let hljs     = require('../../build');
let path     = require('path');
let utility  = require('../utility');

function testAutoDetection(language) {
  const languagePath = utility.buildPath('detect', language);

  it(`should have test for ${language}`, function() {
    return fs.stat(languagePath)
      .then(path => path.isDirectory().should.be.true);
  });

  it(`should be detected as ${language}`, async function() {
    let dirs = await fs.readdir(languagePath)
    let files = await Promise.all(dirs
      .map(function(example) {
        const filename = path.join(languagePath, example);

        return fs.readFile(filename, 'utf-8');
      }))
    files.forEach(function(content) {
        const expected = language,
              actual   = hljs.highlightAuto(content).language;

        actual.should.equal(expected);
      });
  });
}

describe('hljs.highlightAuto()', function() {
  const languages = hljs.listLanguages();

  languages.filter(hljs.autoDetection).forEach(testAutoDetection);
});
