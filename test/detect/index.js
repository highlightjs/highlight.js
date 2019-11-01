'use strict';

delete require.cache[require.resolve('../../build')]
delete require.cache[require.resolve('../../build/lib/highlight')]

const fs       = require('fs').promises;
const hljs     = require('../../build');
const path     = require('path');
const utility  = require('../utility');

function testAutoDetection(language) {
  const languagePath = utility.buildPath('detect', language);

  it(`should have test for ${language}`, async () => {
    const path = await fs.stat(languagePath);
    return path.isDirectory().should.be.true;
  });

  it(`should be detected as ${language}`, async () => {
    const dirs = await fs.readdir(languagePath)
    const files = await Promise.all(dirs
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

describe('hljs.highlightAuto()', () => {
  const languages = hljs.listLanguages();

  languages.filter(hljs.autoDetection).forEach(testAutoDetection);
});
